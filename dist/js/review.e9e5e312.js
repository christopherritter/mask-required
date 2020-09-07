(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["review"],{bb44:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-main",[i("v-container",{attrs:{id:"place"}},[i("v-row",[i("v-col",{attrs:{cols:"12",md:"8"}},[i("div",{staticClass:"create-review"},[i("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[i("div",{staticClass:"place-header"},[i("h3",[e._v(e._s(e.place.name))]),i("p",[e._v(e._s(e.place.formatted_address))])]),i("h4",{staticClass:"mt-10 mb-4"},[e._v("Review your shopping experience.")]),i("v-select",{attrs:{outlined:"",items:e.value,rules:[e.rules.required,e.rules.rating],label:"How would you rate this place?",required:""},model:{value:e.review.rating,callback:function(t){e.$set(e.review,"rating",t)},expression:"review.rating"}}),i("v-text-field",{attrs:{rules:[e.rules.required,e.rules.counter],outlined:"",counter:"",maxlength:"80",name:"review-title",label:"How would you summarize your visit?",required:""},model:{value:e.review.title,callback:function(t){e.$set(e.review,"title",t)},expression:"review.title"}}),i("v-textarea",{attrs:{rules:[e.rules.required,e.rules.minLength],outlined:"",name:"review-text",label:"Tell us more about your experience.",required:""},model:{value:e.review.content,callback:function(t){e.$set(e.review,"content",t)},expression:"review.content"}}),i("h4",{staticClass:"mb-4"},[e._v("Who was wearing masks?")]),i("v-select",{attrs:{items:e.masks.employees,label:"Were employees wearing masks?",outlined:""},model:{value:e.review.masks.employees,callback:function(t){e.$set(e.review.masks,"employees",t)},expression:"review.masks.employees"}}),i("v-select",{attrs:{items:e.masks.customers,label:"Were customers wearing masks?",outlined:""},model:{value:e.review.masks.customers,callback:function(t){e.$set(e.review.masks,"customers",t)},expression:"review.masks.customers"}}),i("h4",{staticClass:"mb-2"},[e._v(" Could you say a little more about it? ")]),e._l(e.questions,(function(t){return i("v-row",{key:"question-"+t.id},[i("v-col",{attrs:{sm:"12",md:"6"}},[e._v(" "+e._s(t.text)+" ")]),i("v-col",{staticClass:"d-flex justify-end",attrs:{sm:"12",md:"6"}},[i("v-radio-group",{attrs:{row:""},model:{value:e.review.questions[t.id].value,callback:function(i){e.$set(e.review.questions[t.id],"value",i)},expression:"review.questions[question.id].value"}},e._l(t.answers,(function(e){return i("v-radio",{key:"answer-"+e.id,attrs:{label:e.label,value:e.value}})})),1)],1)],1)})),i("h4",{staticClass:"mb-2"},[e._v("Click to leave a rating")]),e._l(e.ratings,(function(t){return i("v-row",{key:"rating-"+t.id,staticStyle:{"flex-wrap":"nowrap"}},[i("v-col",{staticClass:"d-flex align-stretch flex-grow-0 flex-shrink-1",attrs:{sm:"12",md:"6"}},[e._v(" "+e._s(t.label)+" ")]),i("v-col",{staticClass:"flex-grow-1 flex-shrink-0",attrs:{sm:"12",md:"6"}},[i("v-rating",{attrs:{rules:[e.rules.required],dark:"",size:"30"},model:{value:e.review.ratings[t.id].value,callback:function(i){e.$set(e.review.ratings[t.id],"value",i)},expression:"review.ratings[rating.id].value"}})],1),i("v-col",{staticClass:"flex-grow-0 flex-shrink-1"},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-tooltip",{attrs:{right:""},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on,r=t.attrs;return[i("v-icon",e._g(e._b({attrs:{small:""}},"v-icon",r,!1),a),[e._v("mdi-information")])]}}],null,!0)},[i("span",[e._v(e._s(t.description))])])],1)],1)],1)})),i("h4",{staticClass:"mb-4"},[e._v("Certify your review")]),i("p",{staticClass:"text-subtitle-2"},[e._v(" This review is based on my own experience and is my genuine opinion of this restaurant. I have no personal or business relationship with this establishment, and have not been offered any incentive or payment originating from the establishment to write this review. ")]),i("v-checkbox",{attrs:{label:"I certify the above statement is true."},model:{value:e.review.agreement,callback:function(t){e.$set(e.review,"agreement",t)},expression:"review.agreement"}}),i("div",{staticClass:"d-flex justify-start"},[i("v-btn",{staticClass:"mt-4",attrs:{disabled:!e.review.agreement,color:"primary"},on:{click:function(t){return e.createReview(e.place)}}},[e._v(" Submit your review ")]),i("v-spacer"),i("v-btn",{staticClass:"mt-4",attrs:{color:"blue-grey lighten-5"},on:{click:function(t){return e.cancelReview(e.place)}}},[e._v(" Cancel review ")])],1)],2)],1)]),i("v-col",{attrs:{cols:"12",md:"4"}},[e.currentPlace.reviews.length?i("v-card",e._l(e.currentPlace.reviews,(function(t){return i("div",{key:"review-"+t.id,staticClass:"review"},[i("v-card-title",{staticClass:"text-body-1"},[e._v(e._s(t.title))]),i("v-card-subtitle",[e._v(e._s(e._f("formatDate")(t.createdOn)))]),i("v-card-text",{staticClass:"text-caption"},[e._v(e._s(e._f("trimLength")(t.content)))]),i("v-divider")],1)})),0):i("v-card",[i("v-card-text",{staticClass:"text-caption no-results"},[e._v("There are currently no reviews.")])],1)],1)],1)],1)],1)},r=[],s=i("5530"),n=(i("96cf"),i("1da1")),l=i("2f62"),o=i("c1df"),u=i.n(o),c={name:"review",data:function(){return{currentPlace:{},review:{rating:null,title:"",content:"",masks:{employees:"",customers:""},questions:[{id:0,value:""},{id:1,value:""},{id:2,value:""},{id:3,value:""},{id:4,value:""},{id:5,value:""},{id:6,value:""},{id:7,value:""},{id:8,value:""},{id:9,value:""},{id:10,value:""},{id:11,value:""}],ratings:[{id:0,value:0},{id:1,value:0},{id:2,value:0}],agreement:!1},agreement:!1,value:[{text:"5 - Perfect example of a safe business.",value:5},{text:"4 - Not perfect but a good place to shop.",value:4},{text:"3 - Could definitely use some improvement.",value:3},{text:"2 - Not exactly my favorite place to shop.",value:2},{text:"1 - I would rather do business elsewhere.",value:1}],valid:!0}},created:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$store.dispatch("showSearchBar",!0),t.next=3,e.$store.dispatch("fetchPlace",{place_id:e.place.place_id});case 3:return t.next=5,e.$store.dispatch("fetchReviews",e.place.place_id);case 5:i=e.$store.getters.getPlace,e.currentPlace=i;case 7:case"end":return t.stop()}}),t)})))()},computed:Object(s["a"])({},Object(l["b"])(["userProfile","place",["reviews"],"masks",["questions"],["ratings"],"rules"])),methods:{fetchPlace:function(e){this.$store.dispatch("fetchPlace",e)},createReview:function(e){this.$refs.form.validate()?(this.$store.dispatch("createReview",{rating:this.review.rating,title:this.review.title,content:this.review.content,masks:{employees:this.review.masks.employees,customers:this.review.masks.customers},questions:this.review.questions,ratings:this.review.ratings,agreement:this.review.agreement}),this.$refs.form.reset(),this.$router.push({name:"place",params:{id:e.place_id}})):this.$vuetify.goTo("form")},likeReview:function(e,t){this.$store.dispatch("likeReview",{id:e,likesCount:t})},cancelReview:function(e){this.$refs.form.reset(),this.$router.push({name:"place",params:{id:e.place_id}})}},filters:{formatDate:function(e){if(!e)return"-";var t=e.toDate();return u()(t).fromNow()},trimLength:function(e){return e.length<200?e:"".concat(e.substring(0,200),"...")}}},v=c,d=i("2877"),m=i("6544"),f=i.n(m),h=i("8336"),w=i("b0af"),p=i("99d9"),b=i("ac7c"),g=i("62ad"),_=i("a523"),x=i("ce7e"),k=(i("4de4"),i("7db0"),i("4160"),i("caad"),i("07ac"),i("2532"),i("159b"),i("58df")),y=i("7e2b"),C=i("3206"),V=Object(k["a"])(y["a"],Object(C["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(e){var t=this,i=function(e){return e.$watch("hasError",(function(i){t.$set(t.errorBag,e._uid,i)}),{immediate:!0})},a={_uid:e._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?a.shouldValidate=e.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(e._uid)||(a.valid=i(e)))})):a.valid=i(e),a},validate:function(){return 0===this.inputs.filter((function(e){return!e.validate(!0)})).length},reset:function(){this.inputs.forEach((function(e){return e.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(e){return e.resetValidation()})),this.resetErrorBag()},register:function(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister:function(e){var t=this.inputs.find((function(t){return t._uid===e._uid}));if(t){var i=this.watchers.find((function(e){return e._uid===t._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(e){return e._uid!==t._uid})),this.inputs=this.inputs.filter((function(e){return e._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:Object(s["a"])({novalidate:!0},this.attrs$),on:{submit:function(e){return t.$emit("submit",e)}}},this.$slots.default)}}),$=i("132d"),q=i("34c3"),B=i("f6c4"),R=i("67b6"),P=i("43a6"),j=i("1d4d"),O=i("0fd9"),T=i("b974"),I=i("2fa4"),E=i("8654"),S=i("a844"),z=i("3a2f"),D=Object(d["a"])(v,a,r,!1,null,null,null);t["default"]=D.exports;f()(D,{VBtn:h["a"],VCard:w["a"],VCardSubtitle:p["b"],VCardText:p["c"],VCardTitle:p["d"],VCheckbox:b["a"],VCol:g["a"],VContainer:_["a"],VDivider:x["a"],VForm:V,VIcon:$["a"],VListItemIcon:q["a"],VMain:B["a"],VRadio:R["a"],VRadioGroup:P["a"],VRating:j["a"],VRow:O["a"],VSelect:T["a"],VSpacer:I["a"],VTextField:E["a"],VTextarea:S["a"],VTooltip:z["a"]})}}]);
//# sourceMappingURL=review.e9e5e312.js.map