(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user-location"],{2125:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-main",{staticClass:"container-fluid",attrs:{id:"user-location"}},[a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-row",[a("v-col",[a("div",{staticClass:"card mt-3"},[a("form",{staticClass:"card-body",on:{submit:function(e){e.preventDefault()}}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.error,expression:"error"}],staticClass:"alert alert-danger"},[e._v(e._s(e.error))]),a("div",{staticClass:"input-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.address,expression:"address"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Enter your address",id:"autocomplete"},domProps:{value:e.address},on:{input:function(t){t.target.composing||(e.address=t.target.value)}}}),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"btn btn-primary",class:{loading:e.spinner},attrs:{type:"button"},on:{click:e.locatorButtonPressed}},[a("i",{staticClass:"fas fa-map-marker-alt"})])])])])])])],1),a("v-row",[a("v-col",[a("div",{attrs:{id:"map"}})])],1)],1)],1)},s=[],r=a("bc3a"),n=a.n(r),i={data:function(){return{address:"",error:"",spinner:!1}},mounted:function(){var e=this,t=new google.maps.places.Autocomplete(document.getElementById("autocomplete"));t.addListener("place_changed",(function(){var a=t.getPlace();e.showUserLocationOnTheMap(a.geometry.location.lat(),a.geometry.location.lng())}))},methods:{locatorButtonPressed:function(){var e=this;this.spinner=!0,navigator.geolocation?navigator.geolocation.getCurrentPosition((function(t){e.getAddressFrom(t.coords.latitude,t.coords.longitude),e.showUserLocationOnTheMap(t.coords.latitude,t.coords.longitude)}),(function(t){e.error="Can't find your address. Please enter it manually.",e.spinner=!1,console.log(t.message)})):(this.error="Your browser does not support Geolocation API",this.spinner=!1)},getAddressFrom:function(e,t){var a=this;n.a.get("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng="+e+","+t+"&key=AIzaSyCHzVbXJqB_-tUwT2AeUGZ_-HRkvJOHjqI").then((function(e){e.data.error_message?a.error=e.data.error_message:(a.address=e.data.results[0].formatted_address,console.log(e.data.results[0].formatted_address)),a.spinner=!1})).catch((function(e){a.error=e.message,a.spinner=!1}))},showUserLocationOnTheMap:function(e,t){var a=new google.maps.Map(document.getElementById("map"),{zoom:15,center:new google.maps.LatLng(e,t),mapTypeId:google.maps.MapTypeId.ROADMAP});new google.maps.Marker({position:new google.maps.LatLng(e,t),map:a})}}},c=i,d=(a("6ae4"),a("2877")),l=a("6544"),p=a.n(l),u=a("62ad"),m=a("a523"),g=a("f6c4"),v=a("0fd9"),f=Object(d["a"])(c,o,s,!1,null,"0298d1e5",null);t["default"]=f.exports;p()(f,{VCol:u["a"],VContainer:m["a"],VMain:g["a"],VRow:v["a"]})},"6ae4":function(e,t,a){"use strict";var o=a("cdb8"),s=a.n(o);s.a},cdb8:function(e,t,a){}}]);
//# sourceMappingURL=user-location.b7303eb9.js.map