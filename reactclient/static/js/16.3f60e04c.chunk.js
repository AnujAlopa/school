(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{353:function(e,t,a){"use strict";var l=a(49),n=a.n(l),r=a(68),s=a(13),c=a(10),i=a(22),u=a(14),o=a(23),m=a(0),d=a.n(m),h=a(149),p=(a(357),a(6034)),b=a(53),f=a.n(b),g=a(368),E=a(150),N=a.n(E);t.a=function(){return function(e){return Object(h.a)(Object(g.a)(function(e){return function(t){function a(){var e,t;Object(s.a)(this,a);for(var l=arguments.length,c=new Array(l),o=0;o<l;o++)c[o]=arguments[o];return(t=Object(i.a)(this,(e=Object(u.a)(a)).call.apply(e,[this].concat(c)))).state={isError:!1},t.makeAuthenticatedAPICall=function(){var e=Object(r.a)(n.a.mark(function e(a,l,r){var s,c;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.prev=1,e.next=4,f()({method:a,url:l,headers:{"x-access-token":localStorage.getItem("accessToken")},data:r});case 4:if(200!==(s=e.sent).status){e.next=9;break}return e.abrupt("return",s);case 9:t.setState({isError:!0});case 10:e.next=26;break;case 12:if(e.prev=12,e.t0=e.catch(1),!(e.t0.response.status=401)){e.next=25;break}return e.next=17,t.props.currentUser.refreshTokens();case 17:return e.next=19,f()({method:a,url:l,headers:{"x-access-token":localStorage.getItem("accessToken")},data:r});case 19:if(200!==(c=e.sent).status){e.next=24;break}return e.abrupt("return",c);case 24:t.setState({isError:!0});case 25:throw e.t0;case 26:e.next=32;break;case 28:e.prev=28,e.t1=e.catch(0),console.log("ERROR:",e.t1),t.setState({isError:!0});case 32:case"end":return e.stop()}},e,null,[[0,28],[1,12]])}));return function(t,a,l){return e.apply(this,arguments)}}(),t.getRedirectQueryString=function(e){var t={redirectTo:e};return"?".concat(N.a.stringify(t))},t}return Object(o.a)(a,t),Object(c.a)(a,[{key:"render",value:function(){var t=this.props.currentUser;return this.state.isError?d.a.createElement(p.a,{to:"/guest/login".concat(this.getRedirectQueryString(this.props.location.pathname))}):d.a.createElement(e,Object.assign({loggedInUserObj:t,authenticatedApiCall:this.makeAuthenticatedAPICall},this.props))}}]),a}(d.a.Component)}(e)))}}},6024:function(e,t,a){"use strict";a.r(t);var l=a(49),n=a.n(l),r=a(68),s=a(13),c=a(10),i=a(22),u=a(14),o=a(23),m=a(11),d=a(0),h=a.n(d),p=a(353),b=a(252),f=a(372),g=a(373),E=a(15),N=a(304),v=a(320),x=a(5774),S=a(5775),C=a(5776),k=a(5988),y=a.n(k),O=a(146),j=[{value:1,label:"6th"},{value:2,label:"7th"},{value:3,label:"8th"},{value:4,label:"9th"},{value:5,label:"10th"},{value:6,label:"11th"},{value:7,label:"12th"}],w=[{value:1,label:"Nursery"},{value:2,label:"LKG"},{value:3,label:"UKG"},{value:4,label:"1st"},{value:5,label:"2nd"},{value:6,label:"3rd"},{value:7,label:"4th"},{value:8,label:"5th"}],A=[{value:1,label:"A"},{value:2,label:"B"},{value:3,label:"C"},{value:4,label:"D"},{value:5,label:"E"}],D=function(e){function t(){var e,a;Object(s.a)(this,t);for(var l=arguments.length,n=new Array(l),r=0;r<l;r++)n[r]=arguments[r];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(n)))).state={totalFee:"",monthName:"",schoolName:"",schoolNumber:"",schoolAddress:"",studentName:"",adharNumber:"",motherName:"",fatherName:"",className:"",cellNumber:"",dob:""},a.setStudentClass=function(e){var t="";return 1==a.props.currentUser.userDetails.accouttype?w.map(function(a){e===a.value&&(t=a.label)}):j.map(function(a){e===a.value&&(t=a.label)}),t},a.setStudentSection=function(e){var t="";return A.map(function(a){e===a.value&&(t=a.label)}),t},a}return Object(o.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=Object(r.a)(n.a.mark(function e(){var t,a,l,r,s,c,i,u,o,m,d,h,p;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.match.params.studentid,e.next=3,this.props.authenticatedApiCall("get","/api/studentfeeservice/"+t+"/getfeeprintdetails",null);case 3:return 1===(a=e.sent).data.status&&(l=a.data.statusDescription,this.setState({schoolName:l.schoolName,schoolNumber:l.schoolNumber,schoolAddress:l.schoolAddress,studentName:l.studentName,adharNumber:l.adharNumber,motherName:l.motherName,fatherName:l.fatherName,className:this.setStudentClass(l.class)+" "+this.setStudentSection(l.section),cellNumber:l.cellNumber,dob:l.dob})),r="/api/studentfeeservice/"+t+"/feedetails",e.next=8,this.props.authenticatedApiCall("get",r,null);case 8:if(1===(s=e.sent).data.status){if(c=s.data.studentFeeDetails,i=s.data.studentFeeStructure,this.setState({startSpinner:!1}),s.data.studentFeeDetails){for(u=Object.values(c),o=[],m=0;m<u.length;m++)null!==u[m]&&o.push(u[m]);this.setState({totalFee:o[o.length-1]})}if(s.data.studentFeeStructure){for(d=Object.keys(i),h=[],p=0;p<d.length;p++)null!==d[p]&&h.push(d[p]);this.setState({monthName:h[o.length-1]})}this.setState({submited:!1})}else 2===s.data.status?this.setState({startSpinner:!1,isError:!0,errorMessage:s.data.statusDescription}):this.setState({startSpinner:!1,isError:!0,errorMessage:"Something went wrong. Try again some time."});case 10:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"todayDate",value:function(){var e=new Date;return h.a.createElement(y.a,{format:"MMMM D, YYYY",withTitle:!0},h.a.createElement("b",null,e))}},{key:"render",value:function(){var e=this.state,t=this.props.classes;return h.a.createElement("div",{className:t.root},h.a.createElement(O.Helmet,null,h.a.createElement("title",null,"Student Fee Details")),h.a.createElement(N.a,{container:!0,id:"section-to-print",className:"graphTable"},h.a.createElement(N.a,{item:!0,lg:4,md:4},h.a.createElement(b.a,{variant:"h6"},"Registration No. ",e.schoolNumber)),h.a.createElement(N.a,{item:!0,lg:5,md:5,style:{marginLeft:"20px"}},h.a.createElement(b.a,{variant:"h4"},e.schoolName)),h.a.createElement(N.a,{item:!0,lg:12,md:12,sm:12,xs:12},h.a.createElement(f.a,null,h.a.createElement(g.a,null,h.a.createElement(v.a,null,h.a.createElement(x.a,null,h.a.createElement(C.a,null,h.a.createElement(S.a,{colSpan:"2",className:t.tableHeading}," ",h.a.createElement("h3",null,"Student Details")," ")),h.a.createElement(C.a,null,h.a.createElement(S.a,{className:t.tableCell}," Student Name  "),h.a.createElement(S.a,{className:t.tableCell}," ",e.studentName," ")),h.a.createElement(C.a,null,h.a.createElement(S.a,{className:t.tableCell}," Mother Name  "),h.a.createElement(S.a,{className:t.tableCell}," ",e.motherName," ")),h.a.createElement(C.a,null,h.a.createElement(S.a,{className:t.tableCell}," Father Name  "),h.a.createElement(S.a,{className:t.tableCell}," ",e.fatherName," ")),h.a.createElement(C.a,null,h.a.createElement(S.a,{className:t.tableCell}," AAdhar Number  "),h.a.createElement(S.a,{className:t.tableCell}," ",e.adharNumber," ")),h.a.createElement(C.a,null,h.a.createElement(S.a,{className:t.tableCell}," Cell Number  "),h.a.createElement(S.a,{className:t.tableCell}," ",e.cellNumber," ")),h.a.createElement(C.a,null,h.a.createElement(S.a,{className:t.tableCell}," Date of Birth"),h.a.createElement(S.a,{className:t.tableCell}," ",e.dob," ")),h.a.createElement(C.a,null,h.a.createElement(S.a,{className:t.tableCell}," Class "),h.a.createElement(S.a,{className:t.tableCell}," ",e.className," "))))))),h.a.createElement(N.a,{item:!0,lg:12,md:12,sm:12,xs:12,style:{marginTop:"20px"}},h.a.createElement(f.a,null,h.a.createElement(g.a,null,h.a.createElement(v.a,null,h.a.createElement(x.a,null,h.a.createElement(C.a,null,h.a.createElement(S.a,{colSpan:"2",className:t.tableHeading}," ",h.a.createElement("h3",null,"Student Fee Details")," ")),h.a.createElement(C.a,null,h.a.createElement(S.a,{className:t.tableCell},this.state.monthName),h.a.createElement(S.a,{className:t.tableCell},this.state.totalFee)))))))))}}]),t}(h.a.Component);t.default=Object(E.a)(function(e){return{root:Object(m.a)({marginTop:12*e.spacing.unit,maxWidth:"900px",margin:"0 auto"},e.breakpoints.down("md"),{margin:0,paddingLeft:0,paddingRight:0,paddingTop:0}),tableHeading:{border:"1px solid #000",height:"30px",textAlign:"center"},tableCell:{border:"1px solid #000",height:"30px",textAlign:"left"},table:{maxWidth:860},tableBorder:{paddingLeft:0,maxWidth:150,minWidth:400},tableBorder1:{},tableBorder2:{maxWidth:150,paddingLeft:4},alternateRow:{"&:nth-of-type(odd)":{backgroundColor:"#fff"}},header:{padding:"0 0 0 55px",background:"rgb(224, 225, 226)",maxWidth:"750px",margin:"0 auto"},prescriptionbody:{padding:"15px 0 0 35px",maxWidth:"700px",margin:"0 auto"},underline:{textDecoration:"underline",fontSize:"20px",marginRight:"5px"},texts:{fontSize:"20px"},qrCode:{position:"absolute",left:0,top:-35},text2:{fontSize:"12px !important",paddingRight:35},text3:{fontSize:"16px !important"},text4:{fontSize:"10px !important",marginLeft:20},text5:{fontSize:"12px !important"},text6:{fontSize:"9px !important"}}})(Object(p.a)(["Teacher","FeeAccount"])(D))}}]);
//# sourceMappingURL=16.3f60e04c.chunk.js.map