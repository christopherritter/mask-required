(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["settings"],{"26d3":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-main",{attrs:{id:"settings"}},[a("v-container",[a("v-row",{staticClass:"justify-content-md-center"},[a("v-col",{attrs:{md:"3",lg:"4"}}),a("v-col",{attrs:{cols:"12",md:"6",lg:"4"}},[a("v-card",{staticClass:"mt-4"},[a("v-card-title",[t._v("Settings")]),a("v-card-text",[a("h6",{staticClass:"mb-2"},[t._v("Update your profile")]),a("transition",{attrs:{name:"fade"}},[t.showSuccess?a("p",{staticClass:"alert alert-success"},[t._v(" Profile updated. ")]):t._e()]),a("form",{on:{submit:function(t){t.preventDefault()}}},[a("v-text-field",{attrs:{label:"Name",type:"text",placeholder:t.userProfile.name,id:"name",outlined:""},model:{value:t.name,callback:function(e){t.name="string"===typeof e?e.trim():e},expression:"name"}}),a("v-text-field",{attrs:{label:"Job Title",type:"text",placeholder:t.userProfile.title,id:"title",outlined:""},model:{value:t.title,callback:function(e){t.title="string"===typeof e?e.trim():e},expression:"title"}}),a("v-btn",{attrs:{color:"primary"},on:{click:function(e){return t.updateProfile()}}},[t._v(" Update Profile ")])],1)],1)],1)],1),a("v-col",{attrs:{md:"3",lg:"4"}})],1)],1)],1)},n=[],s=(a("b0c0"),a("5530")),r=a("2f62"),l={data:function(){return{name:"",title:"",showSuccess:!1}},computed:Object(s["a"])({},Object(r["b"])(["userProfile"])),methods:{updateProfile:function(){var t=this;this.$store.dispatch("updateProfile",{name:""!==this.name?this.name:this.userProfile.name,title:""!==this.title?this.title:this.userProfile.title}),this.name="",this.title="",this.showSuccess=!0,setTimeout((function(){t.showSuccess=!1}),2e3)}}},c=l,o=a("2877"),d=a("6544"),u=a.n(d),f=a("8336"),m=a("b0af"),v=a("99d9"),h=a("62ad"),p=a("a523"),b=a("f6c4"),_=a("0fd9"),w=a("8654"),x=Object(o["a"])(c,i,n,!1,null,null,null);e["default"]=x.exports;u()(x,{VBtn:f["a"],VCard:m["a"],VCardText:v["c"],VCardTitle:v["d"],VCol:h["a"],VContainer:p["a"],VMain:b["a"],VRow:_["a"],VTextField:w["a"]})},"99d9":function(t,e,a){"use strict";a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return l})),a.d(e,"d",(function(){return c}));var i=a("b0af"),n=a("80d2"),s=Object(n["h"])("v-card__actions"),r=Object(n["h"])("v-card__subtitle"),l=Object(n["h"])("v-card__text"),c=Object(n["h"])("v-card__title");i["a"]}}]);
//# sourceMappingURL=settings.1461e6c7.js.map