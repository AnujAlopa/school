const app = require('express').Router();
const envVariable = require("../config/envValues.js");
const util = require('util');
const passwordHash = require('password-hash');
const passport = require('passport');
const ProviderDB = require("../database/ProviderDB");
const crypto = require('crypto');
const UserEnum = require('../lookup/UserEnum');
const jwt = require('jsonwebtoken');
const uuidV4 = require('uuid/v4');
const AdminDB = require("../database/SuperAdminDB.js");
const adminDB = require('../database/AdminDB');
const publisher = require('../pubsub/publisher');
const encrypt = require("../utils/encrypt.js");
const joiSchema = require('../apiJoi/authservice.js');
const middleWare = require('../apiJoi/middleWare.js');

var opts = {};
opts.secretOrKey = envVariable.sessionSecretForMobile;

app.get('/getconfig', async function (req, res) {
    try {
        res.status(200).json({
            title: "svm",
            okButtonBackground: "#f57a4c",
            okButtonHover: "#a62e02",
            printDetail: "en_PrintDetails",
            primaryColor: "#ff6c00",
            secondaryColor: "#449d44",
            hoverPrimaryColor: "#f78028",
            loginBGImage: "bg-login.jpg",
            navbarImage: "logo-admin.png",
            loginLogo: "logo-login.png",
            favicon: "favicon.ico",
            thirdColor: "#ffffff",
            default: "#000",
            hoverPrimaryColor: "#f78028",
            hoverSecondaryColor: "#79d47a",
            hoverThirdColor: "#fff",
            textPrimaryColor: "#fff",
            textSecondaryColor: "#fff",
            textThirdColor: "#000",
            hoverTextPrimaryColor: "#fff",
            hoverTextSecondaryColor: "#fff",
            hoverTextThirdColor: "#000",
            primaryBorder: "#ff6c00",
            secondaryBorder: "#449d44",
            thirdBorder: "#000",
            hoverPrimaryBorder: "#f78028",
            hoverSecondaryBorder: "#79d47a",
            hoverThirdBorder: "#000",
            logbookFasting: "#FF6B28",
            logbookNonFasting: "#9B9B9B",
            logbookInsulin: "#00ACBE",
            bgcolor: "#FC5608",
            med1GraphStartColor: "#01F3B9",
            med1Color: "#04E1F9",
            med1GraphEndColor: "#04E1F9",
            profilePic: "doctor.png",
            viewcoworker: "#777777"
        })
    }
    catch (ex) {
        console.log(ex)
    }
})

app.post("/login", function (req, res, next) {
    try {
        req.assert('username', "Invalid UserName").notEmpty().withMessage("Please enter correct username");
        req.assert('password', "Invalid Password").notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            res.json({ status: 0, error: util.inspect(errors) });
            return;
        }
        passport.authenticate('login', async function (err, user) {
            if (err) {
                return res.json({ status: 0, error: util.inspect(err) });
            }
            if (!user) {
                return res.json({ status: 0, warningmessage: "Usename or Password is wrong." });
            }
            else if (user == 2) {
                return res.json({ status: 2, warningmessage: "Your Account is BLOCKED. Please  Contact SuperAdmin, Cellnumber: 9648340892 or email: superadmin@gmail.com" });
            } else if (user.status == 3) {
                return res.json({ status: 3, warningmessage: "Your Account is BLOCKED. Please  Contact Principal, Cellnumber: " + user.cellnumber + "or email: " + user.email });
            }
            req.logIn(user, async function (err) {
                if (err) {
                    return next(err);
                }
                let userDetails = {
                    userid: req.user.userid, role: req.user.role, firstname: req.user.firstname, lastname: req.user.lastname,
                    accountid: req.user.accountid, configdata: req.user.configdata, accountname: req.user.accountname
                }
                let accessToken = jwt.sign({ user: userDetails }, opts.secretOrKey, { expiresIn: '20m' });
                let refreshTokenObj = {
                    userid: user.userid,
                    refreshToken: uuidV4(),
                    accessToken: accessToken
                };
                await ProviderDB.saveRefreshTokenForPortl(refreshTokenObj);
                if (req.user.role === UserEnum.UserRoles.FirstTime) {

                    return res.json({ status: 1, redirecturl: '/Private/change-password.html', userrole: getKeyByValue(UserEnum.UserRoles, req.user.role), firstname: req.user.firstname, lastname: req.user.lastname, accessToken: accessToken, refreshToken: refreshTokenObj.refreshToken });
                }
                else if (req.user.status == 1) {
                    // console.log("dfghj",req.user)
                    return res.json({ status: 1, redirecturl: '/User/index.html', accountid: req.user.accountid, userrole: getKeyByValue(UserEnum.UserRoles, req.user.role), configdata: req.user.configdata, firstname: req.user.firstname, lastname: req.user.lastname, userid: req.user.userid, adharnumber: req.user.adharnumber, image: req.user.image, studentname: req.user.studentname, accessToken: accessToken, refreshToken: refreshTokenObj.refreshToken, accountname: req.user.accountname });
                }
            });
        })(req, res, next);
    } catch (ex) {
        console.log(ex)
        return res.json({ status: 0, statusDescription: "Something went wrong" })
    }
});

resetPassword = async (req, res, next) => {
    let result = await adminDB.checkPassword(req.user.userid)
    if (!passwordHash.verify(req.body.oldPassword, result.password)) {
        res.status(200).json({ status: 2, statusDescription: "Old password is not matching with entered password." })
    } else if (passwordHash.verify(req.body.newPassword, result.password)) {
        res.status(200).json({ status: 3, statusDescription: "New password can not be old password." })
    } else {
        next()
    }
}
const changePassword = middleWare(joiSchema.changePassword, "body",true);
app.post("/changePasswordByUser", changePassword, async function (req, res) {
    let hashedpassword = encrypt.getHashedPassword(req.body.newPassword)
    let changepassword = await adminDB.changePassword(hashedpassword, req.user.userid)
    if (changepassword.changedRows) {
        res.status(200).json({ status: 1, statusDescription: "Password has been changes successfully." })
    } else {
        res.status(200).json({ status: 0, statusDescription: "NOt able to change the password." })
    }
});

const validateEmail = middleWare(joiSchema.emailid,"body", true);
app.post("/forgotPassword", validateEmail, async function (req, res) {
    let lowerCaseEmailID = req.body.emailid.toLowerCase();
    let hashedEmailId = encrypt.computeHash(lowerCaseEmailID.trim());
    let r = await adminDB.getUserDetailsByEmailId(hashedEmailId)
    if (r.length > 0) {
        if (r[0].status == 1 || r[0].status == 4) {
            let token = await getRandomToken();
            let date = new Date();
            date.setHours(date.getHours() + 1);
            let passwordchangeReqObj = {
                token: token,
                userid: r[0].userid,
                initiatedby: r[0].userid,
                expiredatetime: date
            }
            await adminDB.createPasswordChangeRequest(passwordchangeReqObj)
            let resetpasswordurl = envVariable.resetpasswordurl;
            // send restlink password email
            let publishEvent = {
                emailId: encrypt.decrypt(r[0].emailid),
                userName: r[0].lastname + " " + r[0].lastname,
                resetlink: resetpasswordurl + token,
                userid: r[0].userid,
            }
            console.log('publishEvent',publishEvent)
            publisher.pubishEmailEventForResetPassword(publishEvent);
            return res.status(200).json({ status: 1, statusDescription: "Reset link ha been send to your registered EmailId." });
        }
    } else {
        return res.status(200).json({ status: 0, statusDescription: "Email Id is not registered in this system." });
    }
});

const validateResetObject = middleWare(joiSchema.resetObject,"body", true);
app.post("/resetpassword", validateResetObject, async function (req, res) {
    let token = req.body.token;
    let hashedPassword = passwordHash.generate(req.body.password);
    let currentDateTime = new Date();
    let publishEvent = {}
    let result = await adminDB.getPasswordChangeRequestByToken(token, currentDateTime)
    
    if (result.length > 0) {
        let r = await adminDB.checkfirsttimelogin(result[0].userid)
        if (r[0].passwordchangecount == 0) {
            publishEvent.userid = r[0].userid;
            publishEvent.userName = r[0].firstname + " " + r[0].lastname;
            publishEvent.emailid = encrypt.decrypt(r[0].emailid);
            publisher.publishEmailEventForProvider(publishEvent);
        }
        await adminDB.setUserPasswordByUserId(r[0].userid, hashedPassword)
        await adminDB.deletePasswordChangeRequest(token, r[0].userid)
        await adminDB.removeAccessTokenFromDB(r[0].userid);
        return res.status(200).json({ status: 1, statusDescription: "Yous password has been updated sccessfully." });
    } else {
        res.status(200).json({ status: 0, statusDescription: "Not able to update password."})
    }
});
/**
* @swagger
* paths:
*     /providerauthservice/login:
*         post:
*             description: Login
*             tags: [Provider Auth Service]
*             summary: "User Login"
*             requestBody:
*                 required: true
*                 content:
*                     application/x-www-form-urlencoded:
*                         schema:
*                             type: object
*                             properties:
*                                 username:
*                                     type: string
*                                 password:
*                                     type: string
*                                     format: password
*             responses:
*                 '200':
*                     description: Login
*                     content:
*                         application/json:
*                             schema:
*                                 type: object
*     /admin/signout:
*       get:
*          description: sign out
*          tags: [Provider Auth Service]
*          summary: sign out
*          responses:
*                   '200':
*                     description: Redirects to Login Page
*                     content:
*                         application/json:
*                             schema:
*                                 type: object
*     /admin/forgotPassword:
*         post:
*             description: Forgot password
*             tags: [Provider Auth Service]
*             summary: Forgot password
*             requestBody:
*                 required: true
*                 content:
*                     application/x-www-form-urlencoded:
*                         schema:
*                             type: object
*                             properties:
*                                 emailid:
*                                     type: string
*             responses:
*                 '200':
*                     description: Login
*                     content:
*                         application/json:
*                             schema:
*                                 type: object
*                                 example:
*                                    status: ''
*                                    statusDescription: ''
*     /admin/resetpassword:
*         post:
*             description: Reset password
*             tags: [Provider Auth Service]
*             summary: Reset password
*             requestBody:
*                 required: true
*                 content:
*                     application/x-www-form-urlencoded:
*                         schema:
*                             type: object
*                             properties:
*                                 token:
*                                     type: string
*                                 password:
*                                     type: string
*                                 cnfpassword:
*                                     type: string
*             responses:
*                 '200':
*                     description: Login
*                     content:
*                         application/json:
*                             schema:
*                                 type: object
*                                 example:
*                                    status: ''
*                                    statusDescription: ''
*/

app.post("/accessTokenByRefershToken", async function (req, res) {
    try {
        let refreshToken = req.body.refreshToken;
        if (refreshToken !== null) {
            let userDetails = await AdminDB.getUserIdByRefershToken(refreshToken);
            let userid = userDetails.userid;
            if (userid !== undefined || userid !== null) {
                userid = JSON.parse(JSON.stringify(userid));
                let result = await ProviderDB.getUserDetails(userid);
                if (result.length === 0) {
                    res.status(400).send("Went wrong1");
                }
                else {
                    var obj = result[0];
                    var user = {
                        'email': encrypt.decrypt(obj.emailid),
                        'hashedPassword': obj.password,
                        'userid': obj.userid,
                        'firstname': obj.firstname,
                        'lastname': obj.lastname,
                        'cellnumber': encrypt.decrypt(obj.cellnumber),
                        'passwordchangecount': obj.passwordchangecount,
                        'userrole': obj.userrole,
                        'status': obj.status,
                        'adharnumber': obj.adharnumber,
                        'image': obj.images,
                        'configdata': obj.configdata.configdata,
                        'accountid': obj.configdata.accountid
                    };
                    if (obj.passwordchangecount === 0) {
                        user.role = UserEnum.UserRoles.FirstTime; // user without password changed
                    }
                }
                let accessToken = jwt.sign({ user: user }, opts.secretOrKey, { expiresIn: '20m' });
                let refreshTokenObj = {
                    userid: user.userid,
                    refreshToken: uuidV4(),
                    accessToken: accessToken
                };
                result = await AdminDB.updateRefreshTokenForPortl(refreshTokenObj, refreshToken);
                // let userTableId = await sequlizeQueriesDb.getUserIdForDoctor(user.userid)
                // let LoginDetailsResult = await sequlizeQueriesDb.insertUserLoginDetails(userTableId,offset)
                return res.status(200).send({ redirecturl: '/User/index.html', accountid: user.accountid, userrole: getKeyByValue(UserEnum.UserRoles, user.userrole), configdata: user.configdata, firstname: user.firstname, lastname: user.lastname, userid: user.userid, adharnumber: user.adharnumber, image: user.image, studentname: user.studentname, accessToken: accessToken, refreshToken: refreshTokenObj.refreshToken });
            }
            else {
                return res.status(400).send("Went wrong2");
            }
        }
        else {
            return res.status(400).send("Went wrong3");
        }
    }
    catch (ex) {
        return res.status(400).send("Went wrong4");
    }
});

app.get("/signout", function (req, res) {
    req.logout();
    res.redirect('/Guest/login.html');
    return;
});

app.get("/isreachable", function (req, res) {
    res.status(200).end();
    return;
});


app.post("/forgetPassword", async function (req, res) {
    let passwordObj = {
        adharnumber: parseInt(req.body.adharnumber),
        cellnumber: encrypt.encrypt(req.body.cellnumber),
        dob: encrypt.encrypt(req.body.dob),
        userrole: req.body.userrole,
        password: encrypt.getHashedPassword(req.body.password)
    }
    let result = await adminDB.updateYourPassword(passwordObj);
    if (result.affectedRows === 1) {
        res.status(200).json({ status: 1, statusDescription: "Your Password has been updated successfully." });
    } else {
        res.status(200).json({ status: 0, statusDescription: "Sorry! Not bale to update your password. Your details is not matching." });
    }
});
app.post("/changePassword", async function (req, res) {
    var passwordObj = {
        password: passwordHash.generate(req.body.password),
        userid: req.user.userid
    };
    let result = await AdminDB.changeDoctorPassword(passwordObj);
    if (result == 1) {
        await AdminDB.removeAccessTokenFromDB(req.user.userid)
        req.logout();
        return res.status(200).json(
            { status: 1, statusDescription: "Password updated successfully." }
        );
    } else {
        return res.status(200).json({ status: 0, statusDescription: "Sorry! Password not updated." });
    }

});
app.post("/resetpassword", function (req, res) {
    req.assert('token', res.__("Err_Token_Is_Required")).notEmpty();
    req.assert('password', res.__('Err_Password_Is_Required')).notEmpty();
    req.assert('cnfpassword', res.__('Err_Confirm_Password_Is_Required')).notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.json({ status: 0, error: util.inspect(errors) });
        return;
    }
    var token = req.body.token,
        password = req.body.password,
        hashedPassword = passwordHash.generate(password);
    var currentDateTime = new Date();
    ProviderDB.getPasswordChangeRequestByToken(token, currentDateTime).
        then((r) => {
            if (r.length > 0) {
                return ProviderDB.setUserPasswordByUserId(r[0].userid, hashedPassword).
                    then(() => {
                        return ProviderDB.deletePasswordChangeRequest(token).
                            then(() => {
                                return res.status(200).json({ status: 1, statusDescription: "Msg_Password_Updated_Sccessfully" });
                            })
                    })

            } else {
                res.status(200).json({
                    status: 0,
                    statusDescription: res.__("Err_Reset_Token_Invalid")
                })
            }
        }).catch((ex) => {
            console.log(ex)
            return res.status(500).json({ status: 0, statusDescription: res.__("Err_Something_Went_Wrong") });

        })

});

app.post("/log", function (req, res) {
    var providerid = req.user ? req.user.userid : 0,
        platform = req.body.platform || "WEB",
        errmsg = req.body.errmsg;
    errmsg.providerid = providerid;
    res.end();
});


function getRandomToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(20, function (err, buf) {
            var token = buf.toString('hex');
            if (err) {
                reject(err);
            } else {
                resolve(token)
            }
        })
    });
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
module.exports = app;