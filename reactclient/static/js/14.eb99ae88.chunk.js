(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{353:function(e,t,a){"use strict";var r=a(49),n=a.n(r),o=a(68),s=a(13),i=a(10),c=a(22),l=a(14),d=a(23),p=a(0),u=a.n(p),m=a(149),h=(a(358),a(6034)),g=a(53),f=a.n(g),w=a(368),b=a(150),x=a.n(b);t.a=function(){return function(e){return Object(m.a)(Object(w.a)(function(e){return function(t){function a(){var e,t;Object(s.a)(this,a);for(var r=arguments.length,i=new Array(r),d=0;d<r;d++)i[d]=arguments[d];return(t=Object(c.a)(this,(e=Object(l.a)(a)).call.apply(e,[this].concat(i)))).state={isError:!1},t.makeAuthenticatedAPICall=function(){var e=Object(o.a)(n.a.mark(function e(a,r,o){var s,i;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.prev=1,e.next=4,f()({method:a,url:r,headers:{"x-access-token":localStorage.getItem("accessToken")},data:o});case 4:if(200!==(s=e.sent).status){e.next=9;break}return e.abrupt("return",s);case 9:t.setState({isError:!0});case 10:e.next=26;break;case 12:if(e.prev=12,e.t0=e.catch(1),!(e.t0.response.status=401)){e.next=25;break}return e.next=17,t.props.currentUser.refreshTokens();case 17:return e.next=19,f()({method:a,url:r,headers:{"x-access-token":localStorage.getItem("accessToken")},data:o});case 19:if(200!==(i=e.sent).status){e.next=24;break}return e.abrupt("return",i);case 24:t.setState({isError:!0});case 25:throw e.t0;case 26:e.next=32;break;case 28:e.prev=28,e.t1=e.catch(0),console.log("ERROR:",e.t1),t.setState({isError:!0});case 32:case"end":return e.stop()}},e,null,[[0,28],[1,12]])}));return function(t,a,r){return e.apply(this,arguments)}}(),t.getRedirectQueryString=function(e){var t={redirectTo:e};return"?".concat(x.a.stringify(t))},t}return Object(d.a)(a,t),Object(i.a)(a,[{key:"render",value:function(){var t=this.props.currentUser;return this.state.isError?u.a.createElement(h.a,{to:"/guest/login".concat(this.getRedirectQueryString(this.props.location.pathname))}):u.a.createElement(e,Object.assign({loggedInUserObj:t,authenticatedApiCall:this.makeAuthenticatedAPICall},this.props))}}]),a}(u.a.Component)}(e)))}}},6023:function(e,t,a){"use strict";a.r(t);var r=a(49),n=a.n(r),o=a(68),s=a(13),i=a(10),c=a(22),l=a(14),d=a(23),p=a(11),u=a(0),m=a.n(u),h=a(353),g=a(5787),f=a(252),w=a(5796),b=a(15),x=a(76),S=a.n(x),v=a(82),E=a.n(v),C=a(242),y=a(263),P=a(264),k=a(21),T=a(38),j=a(60),O=a(5968),A=a(144),I=a(145),z=a(146),B=a(106),N=function(e){function t(e){var a;Object(s.a)(this,t),(a=Object(c.a)(this,Object(l.a)(t).call(this,e))).handleSubmit=function(){var e=Object(o.a)(n.a.mark(function e(t,r){var o;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=r.setSubmitting,e.next=3,a.props.authenticatedApiCall("post","/api/providerauthservice/changePassword",{password:t.password,cnfpassword:t.cnfpassword}).then(function(e){console.log("response",e),o(!1),1===e.data.status?(localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),a.setState({resetPassworSuccess:!1})):0===e.data.status&&a.setState({unauthenticated:!0})}).catch(function(e){a.setState({unauthenticated:!0}),o(!1),console.log(e)});case 3:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.dismissDialog=function(){a.setState({resetPassworSuccess:!0}),a.props.history.replace("../login")},a.logout=Object(o.a)(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return localStorage.removeItem("__warningPopShownForSession"),localStorage.removeItem("getAccountId"),localStorage.removeItem("UserAuth"),localStorage.removeItem("UserObject"),e.next=6,a.props.authenticatedApiCall("get","/api/providerauthservice/signout",null).then(function(e){200==e.status&&a.props.history.push("/public")});case 6:case"end":return e.stop()}},e)})),a.handleFirstTimeLogin=function(){a.setState({unauthenticated:!1}),a.props.history.push("./guest")},a.handleShowPassword=function(){a.setState({password:"text",showPassword:!1})},a.handleHidePassword=function(){a.setState({password:"password",showPassword:!0})},a.handleShowConfPassword=function(){a.setState({confPassword:"text",showCnfPassword:!1})},a.handleHideConfPassword=function(){a.setState({confPassword:"password",showCnfPassword:!0})};a.props.t;return a.formikValidation=Object(T.object)().shape({password:Object(T.string)().required("This fiels is required.").min(8,"Password must be 8 character log.").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#_?&^+=-])[A-Za-z\d$@$!%*#_?&^+=-]{8,}$/,"Passqord condition."),cnfpassword:Object(T.string)().required("This fiels is required.").oneOf([Object(T.ref)("password")],"Confirm password is not matching.")}),a.state={resetPassworSuccess:!0,language:a.props.i18n.language,unauthenticated:!1,handleTermCondition:!1,password:"password",showPassword:!0,confPassword:"password",showCnfPassword:!0},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){null!=localStorage.getItem("accessToken")&&null!=localStorage.getItem("refreshToken")||this.props.history.push("../login")}},{key:"render",value:function(){var e=this,t=this.props,a=t.classes,r=(t.t,[m.a.createElement(g.a,{className:a.errorBtn,onClick:this.handleFirstTimeLogin},"ok")]);return m.a.createElement("div",null,m.a.createElement(z.Helmet,null,m.a.createElement("title",null,"FirstTimeLogin")),m.a.createElement("div",{key:this.props.i18n.language},m.a.createElement(A.a,{style:{backgroundColor:"#fff",marginBottom:"25px"}},m.a.createElement(I.a,{lg:5,md:5,sm:12,xs:12,style:{marginTop:"15px",padding:"10px"}},m.a.createElement(f.a,{variant:"h5"},"First Time Reset Password.")),m.a.createElement(I.a,{lg:7,md:7,sm:12,xs:12},m.a.createElement("div",{className:a.login},this.state.resetPassworSuccess?m.a.createElement(k.c,{initialValues:{password:"",cnfpassword:"",acceptTerms:!1,termCondition:!1},onSubmit:this.handleSubmit,validationSchema:this.formikValidation},function(t){return m.a.createElement(k.b,null,m.a.createElement(k.a,{component:j.a,label:"Enter your New Password.",onChange:e.handleChange,name:"password",fullWidth:!0,variant:"filled",InputProps:{type:e.state.password,endAdornment:m.a.createElement(w.a,{position:"end"},e.state.showPassword?m.a.createElement(S.a,{onClick:e.handleShowPassword,className:a.icnColor}):m.a.createElement(E.a,{onClick:e.handleHidePassword,className:a.icnColor}))}}),m.a.createElement("p",null,"Password rules ",m.a.createElement("span",{style:{color:"rgba(65, 117, 5, 1)"}},"Password must be 8 character long.")," | ",m.a.createElement("span",{style:{color:"rgba(65, 117, 5, 1)"}})," | ",m.a.createElement("span",{style:{color:"rgba(65, 117, 5, 1)"}},"123")," | ",m.a.createElement("span",{style:{color:"rgba(65, 117, 5, 1)"}},"@!$%^*()")," | ",m.a.createElement("span",{style:{color:"rgba(65, 117, 5, 1)"}},"\u2260 email")),m.a.createElement(k.a,{component:j.a,label:"Confirm your password.",fullWidth:!0,name:"cnfpassword",variant:"filled",InputProps:{type:e.state.confPassword,endAdornment:m.a.createElement(w.a,{position:"end"},e.state.showCnfPassword?m.a.createElement(S.a,{onClick:e.handleShowConfPassword,className:a.icnColor}):m.a.createElement(E.a,{onClick:e.handleHideConfPassword,className:a.icnColor}))}}),m.a.createElement("div",null),m.a.createElement("div",null,m.a.createElement("div",{style:{textAlign:"right"}},m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement(g.a,{type:"submit",className:a.primaryBtn,size:"small"}," Confirm "))))}):m.a.createElement(C.a,{style:{boxShadow:"none"}},m.a.createElement(y.a,null,m.a.createElement(f.a,{className:a.LoginHeading},"Successfull."),m.a.createElement("br",null),m.a.createElement(f.a,{variant:"h4",color:"inherit",className:a.loginSuccess},"Your password has been updated successfully.")),m.a.createElement("br",null),m.a.createElement(P.a,{className:a.cardFooter},m.a.createElement(g.a,{className:a.primaryBtn,size:"small",onClick:this.dismissDialog},"Login"))))))),this.state.unauthenticated?m.a.createElement(B.a,{successButton:r,HeaderText:"Unauthentication",dismiss:this.handleFirstTimeLogin}):"")}}]),t}(m.a.Component);t.default=Object(O.a)()(Object(h.a)()(Object(b.a)(function(e){return{primaryBtn:{color:e.palette.text.textPrimaryColor,backgroundColor:e.palette.primary.main,border:"1px solid "+e.palette.border.primaryBorder,width:"50%",borderRadius:"25px",padding:"10px",marginTop:"-35px","&:hover":{backgroundColor:e.palette.hoverPrimaryColor.main,color:e.palette.text.hoverTextPrimaryColor,border:"1px solid "+e.palette.border.hoverPrimaryBorder}},errorBtn:{color:e.palette.text.textPrimaryColor,backgroundColor:e.palette.primary.main,border:"1px solid "+e.palette.border.primaryBorder,borderRadius:"50px",margin:"8px 0",textAlign:"right",padding:"6px 17px",fontWeight:"400",lineHeight:"1.42857143","&:hover":{backgroundColor:e.palette.hoverPrimaryColor.main,color:e.palette.text.hoverTextPrimaryColor,border:"1px solid "+e.palette.border.hoverPrimaryBorder}},TermsCondition:{color:"#1a8eeb",textDecoration:"underline",backgroundColor:"transparent",border:"none",textAlign:"left",cursor:"pointer",fontSize:"16px",padding:"1px 10px"},fntSz_16:{fontSize:"16px"},firstTimeLoginTitle:{color:"#515974",fontSize:"18px !important",fontWeight:"800"},loginSuccess:{fontSize:"18px",fontWeight:"500",marginBottom:"15px"},login:Object(p.a)({width:"400px",paddingTop:"25%"},e.breakpoints.down("md"),{width:"330px",paddingTop:"5%"}),padTop:{padding:"0 40px",paddingTop:"40%",color:"#fff"},clrWhite:{color:"#fff !important"},fntSze20:{fontSize:"18px !important"},LoginHeading:{fontSize:"30px !important",fontWeight:"900 !important",color:"rgba(0, 0, 102, 1) !important"},LoginSubHeading:{fontSize:"18px !important",color:"rgba(109, 111, 123, 1)  !important",textAlign:"left",lineHeight:"24px  !important"},cardFooter:{justifyContent:"flex-end",padding:0,margin:"30px 0 20px"},icnColor:{cursor:"pointer"}}},{withTheme:!0})(N)))}}]);
//# sourceMappingURL=14.eb99ae88.chunk.js.map