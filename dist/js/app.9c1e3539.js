(function(e){function t(t){for(var r,a,i=t[0],s=t[1],u=t[2],l=0,d=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);p&&p(t);while(d.length)d.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(c.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},o={app:0},c=[];function i(e){return s.p+"js/"+({"close-buy~user-location":"close-buy~user-location","close-buy":"close-buy","user-location":"user-location",login:"login",nearby:"nearby","place~review":"place~review",place:"place",review:"review",search:"search",settings:"settings"}[e]||e)+"."+{"close-buy~user-location":"83aeb01b","close-buy":"6694cd91","user-location":"b7303eb9",login:"c409ff8a",nearby:"33cbcc30","place~review":"3263948f",place:"965631db",review:"1260334e",search:"65f9dabc",settings:"c642a617"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"close-buy":1,"user-location":1,"place~review":1,review:1,settings:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({"close-buy~user-location":"close-buy~user-location","close-buy":"close-buy","user-location":"user-location",login:"login",nearby:"nearby","place~review":"place~review",place:"place",review:"review",search:"search",settings:"settings"}[e]||e)+"."+{"close-buy~user-location":"31d6cfe0","close-buy":"45ad387c","user-location":"2eab16cd",login:"31d6cfe0",nearby:"31d6cfe0","place~review":"fba5bb1e",place:"31d6cfe0",review:"fff08497",search:"31d6cfe0",settings:"b04e80d3"}[e]+".css",o=s.p+r,c=document.getElementsByTagName("link"),i=0;i<c.length;i++){var u=c[i],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===o))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){u=d[i],l=u.getAttribute("data-href");if(l===r||l===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||o,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete a[e],p.parentNode.removeChild(p),n(c)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=c);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=i(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(p);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}o[e]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var p=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{id:"app"}},[e.showNav?n("SiteNav"):e._e(),n("router-view")],1)},o=[],c=(n("b64b"),n("5530")),i=n("2f62"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"siteNav"}},[n("v-app-bar",{attrs:{color:"gray darken-3","clipped-left":e.$vuetify.breakpoint.lgAndUp,dark:"",app:""}},[n("v-toolbar-title",{staticClass:"ml-0 p-3",style:e.showPointer,on:{click:e.goHome}},[e._v(" Mask Required ")]),n("v-text-field",{directives:[{name:"show",rawName:"v-show",value:e.showSearch,expression:"showSearch"}],staticClass:"pl-4 hidden hidden-sm-and-down",attrs:{id:"navbar-autocomplete",flat:"","solo-inverted":"","hide-details":"","prepend-inner-icon":"mdi-magnify",label:"Search",placeholder:""},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}}),n("v-spacer"),n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.$router.push("search")}}},[n("v-icon",[e._v("mdi-plus-circle-outline")])],1),n("v-menu",{scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,a=t.attrs;return[n("v-btn",e._g(e._b({attrs:{icon:""}},"v-btn",a,!1),r),[n("v-icon",[e._v("mdi-dots-vertical")])],1)]}}])},[n("v-list",[n("v-list-item",[n("v-list-item-title",{on:{click:function(t){return e.$router.push("settings")}}},[e._v(" Settings ")])],1),n("v-list-item",[n("v-list-item-title",{on:{click:function(t){return e.logout()}}},[e._v(" Logout ")])],1)],1)],1)],1)],1)},u=[],l=(n("b0c0"),{data:function(){return{address:null,drawer:!1,group:null}},mounted:function(){var e=this,t=new google.maps.places.Autocomplete(document.getElementById("navbar-autocomplete"));t.addListener("place_changed",(function(){var n=t.getPlace();e.selectPlace(n),"place"!=e.$router.currentRoute.name&&e.$router.push("place")}))},methods:{selectPlace:function(e){this.$store.dispatch("selectPlace",e)},goHome:function(){"home"!=this.$router.currentRoute.name&&this.$router.push({name:"home"})},logout:function(){this.$store.dispatch("logout")}},computed:{showSearch:function(){return this.$store.state.showSearch},showPointer:function(){return"home"==this.$router.currentRoute.name?{pointer:"none"}:{cursor:"pointer"}}},watch:{group:function(){this.drawer=!1}}}),d=l,p=n("2877"),f=n("6544"),m=n.n(f),h=n("40dc"),v=n("8336"),b=n("132d"),g=n("8860"),w=n("da13"),y=n("5d23"),P=n("e449"),k=n("2fa4"),x=n("8654"),_=n("2a7f"),O=Object(p["a"])(d,s,u,!1,null,null,null),R=O.exports;m()(O,{VAppBar:h["a"],VBtn:v["a"],VIcon:b["a"],VList:g["a"],VListItem:w["a"],VListItemTitle:y["b"],VMenu:P["a"],VSpacer:k["a"],VTextField:x["a"],VToolbarTitle:_["a"]});var j={components:{SiteNav:R},computed:Object(c["a"])(Object(c["a"])({},Object(i["b"])(["userProfile"])),{},{showNav:function(){return Object.keys(this.userProfile).length>1}})},A=j,S=n("7496"),E=Object(p["a"])(A,a,o,!1,null,null,null),C=E.exports;m()(E,{VApp:S["a"]});n("45fc"),n("d3b7");var U=n("8c4f"),$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-main",{staticClass:"mt-10"},[n("v-container",[n("v-card",{staticClass:"p-4"},[n("v-row",[n("v-col",{staticClass:"text-center"},[n("h3",[e._v("Find a safe place to shop.")])])],1),n("v-row",[n("v-col",[n("v-text-field",{staticClass:"px-4 pb-2",attrs:{id:"home-autocomplete",outlined:"","hide-details":"","prepend-inner-icon":"mdi-magnify",placeholder:"Enter business name or category"},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}})],1)],1)],1)],1)],1)},q=[],V={data:function(){return{address:null}},methods:{selectPlace:function(e){this.$store.dispatch("selectPlace",e)}},mounted:function(){var e=this;this.$store.state.showSearch=!1;var t=new google.maps.places.Autocomplete(document.getElementById("home-autocomplete"));t.addListener("place_changed",(function(){var n=t.getPlace();e.selectPlace(n),"place"!=e.$router.currentRoute.name&&e.$router.push("place")}))}},I=V,N=n("b0af"),T=n("62ad"),L=n("a523"),B=n("f6c4"),M=n("0fd9"),H=Object(p["a"])(I,$,q,!1,null,null,null),D=H.exports;m()(H,{VCard:N["a"],VCol:T["a"],VContainer:L["a"],VMain:B["a"],VRow:M["a"],VTextField:x["a"]});var F=n("dc59"),J=(n("99af"),n("4160"),n("159b"),n("96cf"),n("1da1"));r["a"].use(i["a"]),F["c"].orderBy("createdOn","desc").onSnapshot((function(e){var t=[];e.forEach((function(e){var n=e.data();n.id=e.id,t.push(n)})),z.commit("setPosts",t)}));var z=new i["a"].Store({state:{userProfile:{},place:{name:null,formatted_address:null,types:[],url:null,place_id:null},reviews:[],posts:[],showSearch:!0},mutations:{setUserProfile:function(e,t){e.userProfile=t},setReviews:function(e,t){e.reviews=t},setPosts:function(e,t){e.posts=t}},actions:{login:function(e,t){return Object(J["a"])(regeneratorRuntime.mark((function n(){var r,a,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.dispatch,n.next=3,F["a"].signInWithEmailAndPassword(t.email,t.password);case 3:a=n.sent,o=a.user,r("fetchUserProfile",o);case 6:case"end":return n.stop()}}),n)})))()},fetchUserProfile:function(e,t){return Object(J["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F["e"].doc(t.uid).get();case 3:a=n.sent,r("setUserProfile",a.data()),"/login"===X.currentRoute.path&&X.push("/");case 6:case"end":return n.stop()}}),n)})))()},signup:function(e,t){return Object(J["a"])(regeneratorRuntime.mark((function n(){var r,a,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.dispatch,n.next=3,F["a"].createUserWithEmailAndPassword(t.email,t.password);case 3:return a=n.sent,o=a.user,n.next=7,F["e"].doc(o.uid).set({name:t.name,title:t.title});case 7:r("fetchUserProfile",o);case 8:case"end":return n.stop()}}),n)})))()},logout:function(e){return Object(J["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.next=3,F["a"].signOut();case 3:n("setUserProfile",{}),X.push("/login");case 5:case"end":return t.stop()}}),t)})))()},selectPlace:function(e,t){return Object(J["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r=e.state,a=e.dispatch,r.place.name=t.name,r.place.formatted_address=t.formatted_address,r.place.place_id=t.place_id,r.place.types=t.types,r.place.url=t.url,a("fetchReviews");case 7:case"end":return n.stop()}}),n)})))()},createReview:function(e,t){return Object(J["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.state,e.commit,n.next=3,F["d"].add({createdOn:new Date,place:r.place,rating:t.rating,title:t.title,content:t.content,userId:F["a"].currentUser.uid,userName:r.userProfile.name,comments:0,likes:0});case 3:case"end":return n.stop()}}),n)})))()},fetchReviews:function(e){return Object(J["a"])(regeneratorRuntime.mark((function t(){var n,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.state,t.next=3,F["d"].where("place","==",n.place).get();case 3:if(r=t.sent,a=[],!r.empty){t.next=9;break}return console.log("No matching documents."),n.reviews=[],t.abrupt("return");case 9:r.forEach((function(e){var t=e.data();t.id=e.id,a.push(t)})),z.commit("setReviews",a);case 11:case"end":return t.stop()}}),t)})))()},createPost:function(e,t){return Object(J["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.state,e.commit,n.next=3,F["c"].add({createdOn:new Date,content:t.content,userId:F["a"].currentUser.uid,userName:r.userProfile.name,comments:0,likes:0});case 3:case"end":return n.stop()}}),n)})))()},likePost:function(e,t){return Object(J["a"])(regeneratorRuntime.mark((function n(){var r,a,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.commit,r=F["a"].currentUser.uid,a="".concat(r,"_").concat(t.id),n.next=5,F["b"].doc(a).get();case 5:if(o=n.sent,!o.exists){n.next=8;break}return n.abrupt("return");case 8:return n.next=10,F["b"].doc(a).set({postId:t.id,userId:r});case 10:F["c"].doc(t.id).update({likes:t.likesCount+1});case 11:case"end":return n.stop()}}),n)})))()},updateProfile:function(e,t){return Object(J["a"])(regeneratorRuntime.mark((function n(){var r,a,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.dispatch,a=F["a"].currentUser.uid,n.next=4,F["e"].doc(a).update({name:t.name,title:t.title});case 4:return n.sent,r("fetchUserProfile",{uid:a}),n.next=8,F["c"].where("userId","==",a).get();case 8:o=n.sent,o.forEach((function(e){F["c"].doc(e.id).update({userName:t.name})}));case 10:case"end":return n.stop()}}),n)})))()}}}),K=z;r["a"].use(U["a"]);var W=[{path:"/",name:"home",component:D,meta:{requiresAuth:!0}},{path:"/login",name:"login",component:function(){return n.e("login").then(n.bind(null,"a55b"))}},{path:"/settings",name:"settings",component:function(){return n.e("settings").then(n.bind(null,"26d3"))},meta:{requiresAuth:!0}},{path:"/user-location",name:"user-location",component:function(){return Promise.all([n.e("close-buy~user-location"),n.e("user-location")]).then(n.bind(null,"2125"))},meta:{requiresAuth:!0}},{path:"/close-buy",name:"close-buy",component:function(){return Promise.all([n.e("close-buy~user-location"),n.e("close-buy")]).then(n.bind(null,"8899"))},meta:{requiresAuth:!0}},{path:"/nearby",name:"nearby",component:function(){return n.e("nearby").then(n.bind(null,"6384"))},meta:{requiresAuth:!0},beforeEnter:function(e,t,n){K.state.place.name?n():n({name:"home"})}},{path:"/search",name:"search",component:function(){return n.e("search").then(n.bind(null,"2d3b"))},meta:{requiresAuth:!0}},{path:"/place",name:"place",component:function(){return Promise.all([n.e("place~review"),n.e("place")]).then(n.bind(null,"e756"))},meta:{requiresAuth:!0},beforeEnter:function(e,t,n){K.state.place.name?n():n({name:"home"})}},{path:"/review",name:"review",component:function(){return Promise.all([n.e("place~review"),n.e("review")]).then(n.bind(null,"bb44"))},meta:{requiresAuth:!0},beforeEnter:function(e,t,n){K.state.place.name?n():n({name:"home"})}}],G=new U["a"]({mode:"history",base:"/",routes:W});G.beforeEach((function(e,t,n){var r=e.matched.some((function(e){return e.meta.requiresAuth}));r&&!F["a"].currentUser?n("/login"):n()}));var X=G,Z=(n("7e7d"),n("f309"));r["a"].use(Z["a"]);var Q,Y=new Z["a"]({});r["a"].config.productionTip=!1,F["a"].onAuthStateChanged((function(e){Q||(Q=new r["a"]({router:X,store:K,vuetify:Y,render:function(e){return e(C)}}).$mount("#app")),e&&K.dispatch("fetchUserProfile",e)}))},"7e7d":function(e,t,n){},dc59:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"e",(function(){return i})),n.d(t,"d",(function(){return s})),n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return l}));var r=n("59ca"),a=(n("ea7b"),n("e71f"),{apiKey:"AIzaSyCHzVbXJqB_-tUwT2AeUGZ_-HRkvJOHjqI",authDomain:"mask-required.firebaseapp.com",databaseURL:"https://mask-required.firebaseio.com",projectId:"mask-required",storageBucket:"mask-required.appspot.com",messagingSenderId:"783326866906",appId:"1:783326866906:web:80587a7cde78e644f924e3"});r["initializeApp"](a);var o=r["firestore"](),c=r["auth"](),i=o.collection("users"),s=o.collection("reviews"),u=o.collection("posts"),l=o.collection("likes")}});
//# sourceMappingURL=app.9c1e3539.js.map