(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["social-login"],{"10a4":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-main",{attrs:{id:"login"}},[t.showPasswordReset?s("PasswordReset",{on:{close:function(e){return t.togglePasswordReset()}}}):t._e(),s("v-container",{staticClass:"fill-height py-0",staticStyle:{"max-width":"none"}},[s("v-row",{staticClass:"fill-height text-center"},[s("v-col",{staticClass:"grey darken-4 d-flex align-center",attrs:{cols:"12",md:"6"}},[s("div",{staticClass:"px-5"},[s("svg-img",{staticClass:"logo pr-4",attrs:{icon:"logo2"}}),s("h1",{staticClass:"white--text"},[t._v("Mask Required")]),s("p",{staticClass:"white--text"},[t._v(" MaskRequired.US helps customers find and rate local businesses that enforce mask requirements and other CDC guidelines in their stores. ")])],1)]),s("v-col",{class:{"signup-form":!t.showLoginForm,"d-flex align-center text-center justify-center":!0},attrs:{cols:"12",md:"6"}},[s("section",{attrs:{id:"firebaseui-auth-container"}})])],1)],1),s("v-snackbar",{attrs:{"multi-line":""},scopedSlots:t._u([{key:"action",fn:function(e){var i=e.attrs;return[s("v-btn",t._b({attrs:{color:"red",text:""},on:{click:function(e){t.errorMessage=!1}}},"v-btn",i,!1),[t._v(" Close ")])]}}]),model:{value:t.showError,callback:function(e){t.showError=e},expression:"showError"}},[t._v(" "+t._s(t.errorMessage)+" ")])],1)},a=[],n=s("5530"),o=s("2f62"),r=s("cf15"),c=s("1a52"),l={data:function(){return{showLoginForm:!0,showPasswordReset:!1,showError:!1}},mounted:function(){this.$store.dispatch("socialLogin",{})},components:{PasswordReset:r["a"],"svg-img":c["a"]},methods:{toggleForm:function(){this.showLoginForm=!this.showLoginForm},togglePasswordReset:function(){this.showPasswordReset=!this.showPasswordReset}},watch:{errorMessage:function(){this.errorMessage.length&&(this.showError=!0)}},computed:Object(n["a"])({},Object(o["b"])(["rules","errorMessage"]))},u=l,h=(s("5de2"),s("2877")),d=s("6544"),m=s.n(d),v=s("8336"),f=s("62ad"),p=s("a523"),g=s("f6c4"),w=s("0fd9"),b=s("2db4"),k=Object(h["a"])(u,i,a,!1,null,"02a8acf4",null);e["default"]=k.exports;m()(k,{VBtn:v["a"],VCol:f["a"],VContainer:p["a"],VMain:g["a"],VRow:w["a"],VSnackbar:b["a"]})},"2db4":function(t,e,s){"use strict";s("caad"),s("a9e3");var i=s("ade3"),a=(s("ca71"),s("8dd9")),n=s("a9ad"),o=s("7560"),r=s("f2e7"),c=s("fe6c"),l=s("58df"),u=s("80d2"),h=s("d9bd");e["a"]=Object(l["a"])(a["a"],n["a"],r["a"],Object(c["b"])(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:function(t){return"string"===typeof t||!1===t}},vertical:Boolean},data:function(){return{activeTimeout:-1}},computed:{classes:function(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground:function(){return!this.text&&!this.outlined},isDark:function(){return this.hasBackground?!this.light:o["a"].options.computed.isDark.call(this)},styles:function(){if(this.absolute)return{};var t=this.$vuetify.application,e=t.bar,s=t.bottom,i=t.footer,a=t.insetFooter,n=t.left,o=t.right,r=t.top;return{paddingBottom:Object(u["f"])(s+i+a),paddingLeft:this.app?Object(u["f"])(n):void 0,paddingRight:this.app?Object(u["f"])(o):void 0,paddingTop:Object(u["f"])(e+r)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted:function(){this.isActive&&this.setTimeout()},created:function(){this.$attrs.hasOwnProperty("auto-height")&&Object(h["e"])("auto-height",this),0==this.timeout&&Object(h["d"])('timeout="0"',"-1",this)},methods:{genActions:function(){return this.$createElement("div",{staticClass:"v-snack__action "},[Object(u["o"])(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent:function(){return this.$createElement("div",{staticClass:"v-snack__content",class:Object(i["a"])({},this.contentClass,!0),attrs:{role:"status","aria-live":"polite"}},[Object(u["o"])(this)])},genWrapper:function(){var t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:a["a"].options.computed.classes.call(this),directives:[{name:"show",value:this.isActive}]});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition:function(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout:function(){var t=this;window.clearTimeout(this.activeTimeout);var e=Number(this.timeout);this.isActive&&![0,-1].includes(e)&&(this.activeTimeout=window.setTimeout((function(){t.isActive=!1}),e))}},render:function(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})},"5de2":function(t,e,s){"use strict";var i=s("755c"),a=s.n(i);a.a},"755c":function(t,e,s){},ca71:function(t,e,s){},cf15:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"modal"},[s("div",{staticClass:"modal-content"},[s("div",{staticClass:"close",on:{click:function(e){return t.$emit("close")}}},[t._v("close")]),s("h3",[t._v("Reset Password")]),t.showSuccess?s("p",[t._v("Success! Check your email for a reset link.")]):s("div",[s("p",[t._v("Enter your email to reset your password")]),s("form",{on:{submit:function(t){t.preventDefault()}}},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.email,expression:"email",modifiers:{trim:!0}}],attrs:{type:"email",placeholder:"you@email.com"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),""!==t.errorMsg?s("p",{staticClass:"error"},[t._v(t._s(t.errorMsg))]):t._e(),s("button",{staticClass:"button",on:{click:function(e){return t.resetPassword()}}},[t._v("Reset")])])])])},a=[],n=(s("96cf"),s("1da1")),o=s("dc59"),r={data:function(){return{email:"",showSuccess:!1,errorMsg:""}},methods:{resetPassword:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.errorMsg="",e.prev=1,e.next=4,o["a"].sendPasswordResetEmail(t.email);case 4:t.showSuccess=!0,e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](1),t.errorMsg=e.t0.message;case 10:case"end":return e.stop()}}),e,null,[[1,7]])})))()}}},c=r,l=s("2877"),u=Object(l["a"])(c,i,a,!1,null,null,null);e["a"]=u.exports}}]);
//# sourceMappingURL=social-login.e5c303c2.js.map