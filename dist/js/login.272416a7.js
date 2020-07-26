(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"8ee4":function(t,e,s){"use strict";var i=s("b758"),o=s.n(i);o.a},a55b:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-main",{attrs:{id:"login"}},[t.showPasswordReset?s("PasswordReset",{on:{close:function(e){return t.togglePasswordReset()}}}):t._e(),s("v-container",{staticClass:"fill-height py-0",staticStyle:{"max-width":"none"}},[s("v-row",{staticClass:"fill-height text-center"},[s("v-col",{staticClass:"grey darken-4 d-flex align-center",attrs:{cols:"12",md:"6"}},[s("div",{staticClass:"px-5"},[s("svg-img",{staticClass:"logo pr-4",attrs:{icon:"logo2"}}),s("h1",{staticClass:"white--text"},[t._v("Mask Required")]),s("p",{staticClass:"white--text"},[t._v(" MaskRequired.US helps customers find and rate local businesses that enforce mask requirements and other CDC guidelines in their stores. ")])],1)]),s("v-col",{class:{"signup-form":!t.showLoginForm,"d-flex align-center text-center justify-center":!0},attrs:{cols:"12",md:"6"}},[s("div",[t.showLoginForm?s("form",{on:{submit:function(t){t.preventDefault()}}},[s("v-text-field",{attrs:{label:"Email",rules:[t.rules.required,t.rules.email],type:"text",placeholder:"you@email.com",id:"email1",outlined:""},model:{value:t.loginForm.email,callback:function(e){t.$set(t.loginForm,"email","string"===typeof e?e.trim():e)},expression:"loginForm.email"}}),s("v-text-field",{attrs:{label:"Password",rules:[t.rules.required],type:"password",placeholder:"******",id:"password1",outlined:""},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password","string"===typeof e?e.trim():e)},expression:"loginForm.password"}}),s("v-btn",{attrs:{color:"teal",large:"",block:"",dark:""},on:{click:function(e){return t.login()}}},[t._v("Log In")]),s("div",{staticClass:"pt-3"},[s("v-btn",{attrs:{large:"",text:""},on:{click:function(e){return t.togglePasswordReset()}}},[t._v("Forgot Password")]),s("v-btn",{attrs:{large:"",text:""},on:{click:function(e){return t.toggleForm()}}},[t._v("Create an Account")])],1)],1):s("form",{on:{submit:function(t){t.preventDefault()}}},[s("h1",[t._v("Get Started")]),s("v-text-field",{attrs:{label:"Name",type:"text",placeholder:"Savvy Apps",id:"name"},model:{value:t.signupForm.name,callback:function(e){t.$set(t.signupForm,"name","string"===typeof e?e.trim():e)},expression:"signupForm.name"}}),s("v-text-field",{attrs:{label:"Title",type:"text",placeholder:"Company",id:"title"},model:{value:t.signupForm.title,callback:function(e){t.$set(t.signupForm,"title","string"===typeof e?e.trim():e)},expression:"signupForm.title"}}),s("v-text-field",{attrs:{label:"Email",type:"text",placeholder:"you@email.com",id:"email2"},model:{value:t.signupForm.email,callback:function(e){t.$set(t.signupForm,"email","string"===typeof e?e.trim():e)},expression:"signupForm.email"}}),s("v-text-field",{attrs:{label:"Password",type:"password",placeholder:"min 6 characters",id:"password2"},model:{value:t.signupForm.password,callback:function(e){t.$set(t.signupForm,"password","string"===typeof e?e.trim():e)},expression:"signupForm.password"}}),s("v-btn",{staticClass:"button",on:{click:function(e){return t.signup()}}},[t._v("Sign Up")]),s("div",{staticClass:"extras"},[s("v-btn",{attrs:{text:""},on:{click:function(e){return t.toggleForm()}}},[t._v("Back to Log In")])],1)],1)])])],1)],1),s("v-snackbar",{attrs:{"multi-line":t.multiLine},scopedSlots:t._u([{key:"action",fn:function(e){var i=e.attrs;return[s("v-btn",t._b({attrs:{color:"red",text:""},on:{click:function(e){t.errorMessage=!1}}},"v-btn",i,!1),[t._v(" Close ")])]}}]),model:{value:t.errorMessage,callback:function(e){t.errorMessage=e},expression:"errorMessage"}},[t._v(" "+t._s(t.errorMessage)+" ")])],1)},o=[],n=(s("b0c0"),s("5530")),a=s("2f62"),r=s("cf15"),c=s("1a52"),l={data:function(){return{loginForm:{email:"",password:""},signupForm:{name:"",title:"",email:"",password:""},showLoginForm:!0,showPasswordReset:!1}},components:{PasswordReset:r["a"],"svg-img":c["a"]},methods:{googleLogin:function(){this.$store.dispatch("googleLogin")},facebookLogin:function(){this.$store.dispatch("facebookLogin")},login:function(){this.$store.dispatch("login",{email:this.loginForm.email,password:this.loginForm.password})},signup:function(){this.$store.dispatch("signup",{email:this.signupForm.email,password:this.signupForm.password,name:this.signupForm.name,title:this.signupForm.title})},toggleForm:function(){this.showLoginForm=!this.showLoginForm},togglePasswordReset:function(){this.showPasswordReset=!this.showPasswordReset}},computed:Object(n["a"])({},Object(a["b"])(["rules","errorMessage"]))},u=l,d=(s("8ee4"),s("2877")),m=s("6544"),p=s.n(m),h=s("8336"),g=s("62ad"),v=s("a523"),f=s("f6c4"),b=s("0fd9"),w=(s("caad"),s("a9e3"),s("ade3")),k=(s("ca71"),s("8dd9")),x=s("a9ad"),F=s("7560"),y=s("f2e7"),_=s("fe6c"),C=s("58df"),$=s("80d2"),P=s("d9bd"),R=Object(C["a"])(k["a"],x["a"],y["a"],Object(_["b"])(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:function(t){return"string"===typeof t||!1===t}},vertical:Boolean},data:function(){return{activeTimeout:-1}},computed:{classes:function(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground:function(){return!this.text&&!this.outlined},isDark:function(){return this.hasBackground?!this.light:F["a"].options.computed.isDark.call(this)},styles:function(){if(this.absolute)return{};var t=this.$vuetify.application,e=t.bar,s=t.bottom,i=t.footer,o=t.insetFooter,n=t.left,a=t.right,r=t.top;return{paddingBottom:Object($["f"])(s+i+o),paddingLeft:this.app?Object($["f"])(n):void 0,paddingRight:this.app?Object($["f"])(a):void 0,paddingTop:Object($["f"])(e+r)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted:function(){this.isActive&&this.setTimeout()},created:function(){this.$attrs.hasOwnProperty("auto-height")&&Object(P["e"])("auto-height",this),0==this.timeout&&Object(P["d"])('timeout="0"',"-1",this)},methods:{genActions:function(){return this.$createElement("div",{staticClass:"v-snack__action "},[Object($["o"])(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent:function(){return this.$createElement("div",{staticClass:"v-snack__content",class:Object(w["a"])({},this.contentClass,!0),attrs:{role:"status","aria-live":"polite"}},[Object($["o"])(this)])},genWrapper:function(){var t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:k["a"].options.computed.classes.call(this),directives:[{name:"show",value:this.isActive}]});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition:function(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout:function(){var t=this;window.clearTimeout(this.activeTimeout);var e=Number(this.timeout);this.isActive&&![0,-1].includes(e)&&(this.activeTimeout=window.setTimeout((function(){t.isActive=!1}),e))}},render:function(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}}),j=s("8654"),O=Object(d["a"])(u,i,o,!1,null,"43ff8cdc",null);e["default"]=O.exports;p()(O,{VBtn:h["a"],VCol:g["a"],VContainer:v["a"],VMain:f["a"],VRow:b["a"],VSnackbar:R,VTextField:j["a"]})},b758:function(t,e,s){},ca71:function(t,e,s){},cf15:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"modal"},[s("div",{staticClass:"modal-content"},[s("div",{staticClass:"close",on:{click:function(e){return t.$emit("close")}}},[t._v("close")]),s("h3",[t._v("Reset Password")]),t.showSuccess?s("p",[t._v("Success! Check your email for a reset link.")]):s("div",[s("p",[t._v("Enter your email to reset your password")]),s("form",{on:{submit:function(t){t.preventDefault()}}},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.email,expression:"email",modifiers:{trim:!0}}],attrs:{type:"email",placeholder:"you@email.com"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),""!==t.errorMsg?s("p",{staticClass:"error"},[t._v(t._s(t.errorMsg))]):t._e(),s("button",{staticClass:"button",on:{click:function(e){return t.resetPassword()}}},[t._v("Reset")])])])])},o=[],n=(s("96cf"),s("1da1")),a=s("dc59"),r={data:function(){return{email:"",showSuccess:!1,errorMsg:""}},methods:{resetPassword:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.errorMsg="",e.prev=1,e.next=4,a["a"].sendPasswordResetEmail(t.email);case 4:t.showSuccess=!0,e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](1),t.errorMsg=e.t0.message;case 10:case"end":return e.stop()}}),e,null,[[1,7]])})))()}}},c=r,l=s("2877"),u=Object(l["a"])(c,i,o,!1,null,null,null);e["a"]=u.exports}}]);
//# sourceMappingURL=login.272416a7.js.map