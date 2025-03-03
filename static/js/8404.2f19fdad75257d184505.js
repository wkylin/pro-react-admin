"use strict";(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[8404],{46456:function(O,d,e){var c=e(71354),i=e.n(c),h=e(76314),t=e.n(h),f=t()(i());f.push([O.id,`.stars--xQGmL {\r
  --box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
\r
  width: 1px;\r
  height: 1px;\r
  border-radius: 100%;\r
  background: transparent;\r
  box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
  box-shadow: var(--box-shadow);\r
  animation: anim-star--rqp4H 50s linear infinite;\r
\r
  &::after {\r
    content: ' ';\r
    position: absolute;\r
    top: 2000px;\r
    width: 1px;\r
    height: 1px;\r
    border-radius: 100%;\r
    box-shadow: var(--box-shadow);\r
    background: transparent;\r
  }\r
}\r
\r
.medium--djEFj {\r
  --box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
\r
  width: 2px;\r
  height: 2px;\r
  border-radius: 100%;\r
  background: transparent;\r
  box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
  box-shadow: var(--box-shadow);\r
  animation: anim-star--rqp4H 150s linear infinite;\r
\r
  &::after {\r
    content: ' ';\r
    position: absolute;\r
    top: 2000px;\r
    width: 2px;\r
    height: 2px;\r
    border-radius: 100%;\r
    box-shadow: var(--box-shadow);\r
    background: transparent;\r
  }\r
}\r
\r
.big--sf21I {\r
  --box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
\r
  width: 3px;\r
  height: 3px;\r
  border-radius: 100%;\r
  background: transparent;\r
  box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
  box-shadow: var(--box-shadow);\r
  animation: anim-star--rqp4H 30s linear infinite;\r
\r
  &::after {\r
    content: '*';\r
    position: absolute;\r
    top: 2000px;\r
    width: 3px;\r
    height: 3px;\r
    border-radius: 100%;\r
    box-shadow: var(--box-shadow);\r
    background: transparent;\r
  }\r
}\r
\r
@keyframes anim-star--rqp4H {\r
  from {\r
    transform: translateY(-2000px);\r
  }\r
\r
  to {\r
    transform: translateY(0);\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/StarBackground/index.module.less"],names:[],mappings:"AAAA;EACE,iDAAiD;;EAEjD,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,uBAAuB;EACvB,+CAA6B;EAA7B,6BAA6B;EAC7B,+CAAwC;;EAExC;IACE,YAAY;IACZ,kBAAkB;IAClB,WAAW;IACX,UAAU;IACV,WAAW;IACX,mBAAmB;IACnB,6BAA6B;IAC7B,uBAAuB;EACzB;AACF;;AAEA;EACE,iDAAiD;;EAEjD,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,uBAAuB;EACvB,+CAA6B;EAA7B,6BAA6B;EAC7B,gDAAyC;;EAEzC;IACE,YAAY;IACZ,kBAAkB;IAClB,WAAW;IACX,UAAU;IACV,WAAW;IACX,mBAAmB;IACnB,6BAA6B;IAC7B,uBAAuB;EACzB;AACF;;AAEA;EACE,iDAAiD;;EAEjD,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,uBAAuB;EACvB,+CAA6B;EAA7B,6BAA6B;EAC7B,+CAAwC;;EAExC;IACE,YAAY;IACZ,kBAAkB;IAClB,WAAW;IACX,UAAU;IACV,WAAW;IACX,mBAAmB;IACnB,6BAA6B;IAC7B,uBAAuB;EACzB;AACF;;AAEA;EACE;IACE,8BAA8B;EAChC;;EAEA;IACE,wBAAwB;EAC1B;AACF",sourcesContent:[`.stars {\r
  --box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
\r
  width: 1px;\r
  height: 1px;\r
  border-radius: 100%;\r
  background: transparent;\r
  box-shadow: var(--box-shadow);\r
  animation: anim-star 50s linear infinite;\r
\r
  &::after {\r
    content: ' ';\r
    position: absolute;\r
    top: 2000px;\r
    width: 1px;\r
    height: 1px;\r
    border-radius: 100%;\r
    box-shadow: var(--box-shadow);\r
    background: transparent;\r
  }\r
}\r
\r
.medium {\r
  --box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
\r
  width: 2px;\r
  height: 2px;\r
  border-radius: 100%;\r
  background: transparent;\r
  box-shadow: var(--box-shadow);\r
  animation: anim-star 150s linear infinite;\r
\r
  &::after {\r
    content: ' ';\r
    position: absolute;\r
    top: 2000px;\r
    width: 2px;\r
    height: 2px;\r
    border-radius: 100%;\r
    box-shadow: var(--box-shadow);\r
    background: transparent;\r
  }\r
}\r
\r
.big {\r
  --box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
\r
  width: 3px;\r
  height: 3px;\r
  border-radius: 100%;\r
  background: transparent;\r
  box-shadow: var(--box-shadow);\r
  animation: anim-star 30s linear infinite;\r
\r
  &::after {\r
    content: '*';\r
    position: absolute;\r
    top: 2000px;\r
    width: 3px;\r
    height: 3px;\r
    border-radius: 100%;\r
    box-shadow: var(--box-shadow);\r
    background: transparent;\r
  }\r
}\r
\r
@keyframes anim-star {\r
  from {\r
    transform: translateY(-2000px);\r
  }\r
\r
  to {\r
    transform: translateY(0);\r
  }\r
}\r
`],sourceRoot:""}]),f.locals={stars:"stars--xQGmL","anim-star":"anim-star--rqp4H",animStar:"anim-star--rqp4H",medium:"medium--djEFj",big:"big--sf21I"},d.A=f},81988:function(O,d,e){"use client";var c=e(24994),i=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=d.FadeInDiv=void 0;var h=c(e(41132)),t=c(e(85715)),f=u(e(96540)),w=e(21126),g=c(e(71508));function P(a){if(typeof WeakMap!="function")return null;var r=new WeakMap,n=new WeakMap;return(P=function(v){return v?n:r})(a)}function u(a,r){if(!r&&a&&a.__esModule)return a;if(a===null||i(a)!="object"&&typeof a!="function")return{default:a};var n=P(r);if(n&&n.has(a))return n.get(a);var s={__proto__:null},v=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var p in a)if(p!=="default"&&{}.hasOwnProperty.call(a,p)){var E=v?Object.getOwnPropertyDescriptor(a,p):null;E&&(E.get||E.set)?Object.defineProperty(s,p,E):s[p]=a[p]}return s.default=a,n&&n.set(a,s),s}var m=function(r){var n=r.tabs,s=r.containerClassName,v=r.activeTabClassName,p=r.tabClassName,E=r.contentClassName,x=(0,f.useState)(n[0]),B=(0,t.default)(x,2),I=B[0],N=B[1],D=(0,f.useState)(n),b=(0,t.default)(D,2),M=b[0],y=b[1],A=function(T){var S=(0,h.default)(n),U=S.splice(T,1);S.unshift(U[0]),y(S),N(S[0])},_=(0,f.useState)(!1),C=(0,t.default)(_,2),j=C[0],R=C[1];return f.default.createElement(f.default.Fragment,null,f.default.createElement("div",{className:(0,g.default)("no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-start overflow-auto [perspective:1000px] sm:overflow-visible",s)},n.map(function(W,T){return f.default.createElement("button",{key:W.title,onClick:function(){A(T)},onMouseEnter:function(){return R(!0)},onMouseLeave:function(){return R(!1)},className:(0,g.default)("relative rounded-full px-4 py-2",p),style:{transformStyle:"preserve-3d"}},I.value===W.value&&f.default.createElement(w.motion.div,{layoutId:"clickedButton",transition:{type:"spring",bounce:.3,duration:.6},className:(0,g.default)("absolute inset-0 rounded-full bg-gray-200 dark:bg-zinc-800",v)}),f.default.createElement("span",{className:"relative block text-black dark:text-white"},W.title))})),f.default.createElement(l,{tabs:M,active:I,key:I.value,hovering:j,className:(0,g.default)("mt-32",E)}))},l=d.FadeInDiv=function(r){var n=r.className,s=r.tabs,v=r.hovering,p=function(x){return x.value===s[0].value};return f.default.createElement("div",{className:"relative h-full w-full"},s.map(function(E,x){return f.default.createElement(w.motion.div,{key:E.value,layoutId:E.value,style:{scale:1-x*.1,top:v?x*-50:0,zIndex:-x,opacity:x<3?1-x*.1:0},animate:{y:p(E)?[0,40,0]:0},className:(0,g.default)("absolute top-0 left-0 h-full w-full",n)},E.content)}))},o=d.default=m},59378:function(O,d,e){var c=e(24994);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var i=c(e(94634)),h=c(e(43693)),t=c(e(91847)),f=c(e(96540)),w=["style","children"];function g(l,o){var a=Object.keys(l);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(l);o&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(l,n).enumerable})),a.push.apply(a,r)}return a}function P(l){for(var o=1;o<arguments.length;o++){var a=arguments[o]!=null?arguments[o]:{};o%2?g(Object(a),!0).forEach(function(r){(0,h.default)(l,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(a)):g(Object(a)).forEach(function(r){Object.defineProperty(l,r,Object.getOwnPropertyDescriptor(a,r))})}return l}var u=f.default.forwardRef(function(l,o){var a=l.style,r=l.children,n=(0,t.default)(l,w);return f.default.createElement("div",(0,i.default)({ref:o},n,{id:"scrollContainer",style:P({width:"100%",height:"calc(100vh - 204px)",position:"relative",overflowX:"hidden",overflowY:"auto"},a)}),r)}),m=d.default=u},71635:function(O,d,e){var c=e(24994),i=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=d.SocialIcon=void 0;var h=c(e(91847)),t=c(e(54756)),f=c(e(29293)),w=c(e(85715)),g=l(e(96540)),P=e(21126),u=["icon","color"];function m(n){if(typeof WeakMap!="function")return null;var s=new WeakMap,v=new WeakMap;return(m=function(E){return E?v:s})(n)}function l(n,s){if(!s&&n&&n.__esModule)return n;if(n===null||i(n)!="object"&&typeof n!="function")return{default:n};var v=m(s);if(v&&v.has(n))return v.get(n);var p={__proto__:null},E=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var x in n)if(x!=="default"&&{}.hasOwnProperty.call(n,x)){var B=E?Object.getOwnPropertyDescriptor(n,x):null;B&&(B.get||B.set)?Object.defineProperty(p,x,B):p[x]=n[x]}return p.default=n,v&&v.set(n,p),p}var o=function(s){var v=s.children,p=s.initialX,E=(0,g.useState)(!1),x=(0,w.default)(E,2),B=x[0],I=x[1],N=(0,P.useAnimation)(),D=function(){var b=(0,f.default)(t.default.mark(function M(){return t.default.wrap(function(A){for(;;)switch(A.prev=A.next){case 0:if(!B){A.next=6;break}case 1:return A.next=4,N.start({x:p+Math.random()*30-15,y:Math.random()*30-15,transition:{duration:3,ease:"easeInOut"}});case 4:A.next=1;break;case 6:case"end":return A.stop()}},M)}));return function(){return b.apply(this,arguments)}}();return(0,g.useEffect)(function(){I(!0)},[]),(0,g.useEffect)(function(){D()},[B]),g.default.createElement(P.motion.div,{drag:!0,dragMomentum:!1,dragElastic:0,dragTransition:{bounceStiffness:600,bounceDamping:20},dragConstraints:{top:-200,left:-200,right:200,bottom:0},whileDrag:{scale:1.1},initial:{x:p,y:0},animate:N,className:"cursor-move"},v)},a=d.SocialIcon=function(s){var v=s.icon,p=s.color,E=(0,h.default)(s,u);return g.default.createElement("div",{className:"rounded-full p-3 ".concat(p," shadow-lg transition-shadow hover:shadow-xl")},g.default.createElement(v,{className:"h-6 w-6 text-white"}))},r=d.default=o},59367:function(O,d,e){var c=e(24994);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var i=c(e(96540)),h=e(21126),t=e(41149),f=c(e(48632)),w=function(){return i.default.createElement("footer",{className:"bg-[#0a192f] py-16 text-white"},i.default.createElement("div",{className:"container mx-auto px-4"},i.default.createElement("div",{className:"grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4"},i.default.createElement("div",{className:"space-y-6"},i.default.createElement(h.motion.h2,{className:"bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5}},i.default.createElement("img",{src:f.default,width:"40",height:"40",alt:"Logo"})),i.default.createElement("p",{className:""},"Shaping the future of web development"),i.default.createElement("div",{className:"relative"},i.default.createElement("input",{type:"email",placeholder:"Your email",className:"w-full rounded-full border-2 px-4 py-2 transition-all duration-300 outline-none"}),i.default.createElement("button",{className:"absolute top-2 right-1 rounded-full p-1 transition-colors duration-300"},i.default.createElement(t.ArrowUpRight,{className:"size-4"})))),i.default.createElement("div",null,i.default.createElement("h3",{className:"mb-4 text-xl font-semibold"},"Navigation"),i.default.createElement("ul",{className:"space-y-2"},["Home","About","Services","Projects","Blog","Contact"].map(function(u){return i.default.createElement(h.motion.li,{key:u,whileHover:{x:5},transition:{type:"spring",stiffness:300}},i.default.createElement("a",{href:"#".concat(u.toLowerCase()),className:"text-black transition-colors duration-300 dark:text-white"},u))}))),i.default.createElement("div",null,i.default.createElement("h3",{className:"mb-4 text-xl font-semibold"},"Connect"),i.default.createElement("ul",{className:"space-y-2"},[{name:"LinkedIn",url:"https://www.linkedin.com"},{name:"Twitter",url:"https://www.twitter.com"},{name:"Instagram",url:"https://www.instagram.com"},{name:"GitHub",url:"https://www.github.com"}].map(function(u){return i.default.createElement(h.motion.li,{key:u.name,whileHover:{x:5},transition:{type:"spring",stiffness:300}},i.default.createElement("a",{href:u.url,target:"_blank",rel:"noopener noreferrer",className:"flex items-center text-black transition-colors duration-300 dark:text-white"},u.name,i.default.createElement(t.ArrowUpRight,{className:"ml-1 h-4 w-4"})))}))),i.default.createElement("div",{className:"space-y-4"},i.default.createElement("h3",{className:"text-xl font-semibold"},"Our Vision"),i.default.createElement("p",{className:""},"Pioneering the next generation of web experiences through innovative code and cutting-edge design."),i.default.createElement("div",{className:"flex space-x-4"},i.default.createElement(h.motion.div,{className:"h-2 w-2 rounded-full bg-blue-500",animate:{scale:[1,1.5,1]},transition:{repeat:1/0,duration:2}}),i.default.createElement(h.motion.div,{className:"h-2 w-2 rounded-full bg-purple-500",animate:{scale:[1,1.5,1]},transition:{repeat:1/0,duration:2,delay:.5}}),i.default.createElement(h.motion.div,{className:"h-2 w-2 rounded-full bg-pink-500",animate:{scale:[1,1.5,1]},transition:{repeat:1/0,duration:2,delay:1}})))),i.default.createElement("div",{className:"mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row"},i.default.createElement("p",{className:"text-sm"},"\xA9 ",new Date().getFullYear(),". All rights reserved."),i.default.createElement("div",{className:"mt-4 flex space-x-4 md:mt-0"},i.default.createElement("a",{className:"text-sm transition-colors duration-300 hover:text-white"},"Privacy Policy"),i.default.createElement("a",{className:"text-sm transition-colors duration-300 hover:text-white"},"Terms of Service")))))},g=d.default=w},62540:function(O,d,e){var c=e(24994),i=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var h=c(e(85715)),t=g(e(96540)),f=e(21126);function w(m){if(typeof WeakMap!="function")return null;var l=new WeakMap,o=new WeakMap;return(w=function(r){return r?o:l})(m)}function g(m,l){if(!l&&m&&m.__esModule)return m;if(m===null||i(m)!="object"&&typeof m!="function")return{default:m};var o=w(l);if(o&&o.has(m))return o.get(m);var a={__proto__:null},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in m)if(n!=="default"&&{}.hasOwnProperty.call(m,n)){var s=r?Object.getOwnPropertyDescriptor(m,n):null;s&&(s.get||s.set)?Object.defineProperty(a,n,s):a[n]=m[n]}return a.default=m,o&&o.set(m,a),a}var P=function(l){var o=l.companies,a=l.autorotateTiming,r=a===void 0?3e3:a,n=l.direction,s=n===void 0?"right":n,v=l.radius,p=v===void 0?180:v,E=(0,t.useState)(0),x=(0,h.default)(E,2),B=x[0],I=x[1];(0,t.useEffect)(function(){if(!(!o||o.length===0)){var y=setInterval(function(){N(s)},r);return function(){return clearInterval(y)}}},[o,r,s]);var N=function(A){var _=A==="right"?1:-1;I(function(C){return(C+_+o.length)%o.length})},D=function(A){var _=A*(Math.PI/3);return{x:Math.sin(_)*p,y:-Math.cos(_)*p+p/2}},b=(0,t.useMemo)(function(){return{enter:function(A){var _=D(s==="right"?-2:2),C=_.x,j=_.y;return{x:C,y:j,opacity:0,scale:.5}},center:function(A){var _=D(A),C=_.x,j=_.y;return{x:C,y:j,opacity:1,scale:A===0?1:.8,transition:{duration:.6,ease:[.6,.05,.01,.9]}}},exit:function(A){var _=D(s==="right"?2:-2),C=_.x,j=_.y;return{x:C,y:j,opacity:0,scale:.5,transition:{duration:.6,ease:[.6,.05,.01,.9]}}}}},[s,p]),M=(0,t.useMemo)(function(){return!o||o.length===0?[]:[-1,0,1].map(function(y){var A=(B+y+o.length)%o.length;return{offset:y,logo:o[A],index:A}})},[B,o]);return t.default.createElement("div",null,t.default.createElement("div",{className:"mx-auto w-full text-center"},t.default.createElement("div",{className:"relative h-[260px] overflow-hidden"},t.default.createElement("div",{className:"absolute inset-0 flex items-center justify-center"},t.default.createElement("div",{className:"relative min-h-[500px] min-w-[500px]"},t.default.createElement(f.AnimatePresence,{initial:!1},M.map(function(y){var A=y.offset,_=y.logo,C=y.index;return t.default.createElement(f.motion.div,{key:C,custom:A,variants:b,initial:"enter",animate:"center",exit:"exit",className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3"},t.default.createElement("img",{src:_,width:80,height:80,alt:"Company logo ".concat(C+1),className:"dark:brightness-200"}))})))))))},u=d.default=P},61714:function(O,d,e){var c=e(24994),i=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var h=c(e(85715)),t=g(e(96540)),f=c(e(31583));function w(l){if(typeof WeakMap!="function")return null;var o=new WeakMap,a=new WeakMap;return(w=function(n){return n?a:o})(l)}function g(l,o){if(!o&&l&&l.__esModule)return l;if(l===null||i(l)!="object"&&typeof l!="function")return{default:l};var a=w(o);if(a&&a.has(l))return a.get(l);var r={__proto__:null},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in l)if(s!=="default"&&{}.hasOwnProperty.call(l,s)){var v=n?Object.getOwnPropertyDescriptor(l,s):null;v&&(v.get||v.set)?Object.defineProperty(r,s,v):r[s]=l[s]}return r.default=l,a&&a.set(l,r),r}var P=function(o){for(var a=[],r=0;r<o;r++){var n=Math.floor(Math.random()*2e3),s=Math.floor(Math.random()*2e3);a.push("".concat(n,"px ").concat(s,"px #333"))}return a.join(", ")},u=function(){var o=(0,t.useState)(P(1400)),a=(0,h.default)(o,1),r=a[0],n=(0,t.useState)(P(400)),s=(0,h.default)(n,1),v=s[0],p=(0,t.useState)(P(200)),E=(0,h.default)(p,1),x=E[0];return t.default.createElement("section",{className:"absolute top-0 left-0"},t.default.createElement("section",{className:f.default.stars,style:{"--box-shadow":r}}),t.default.createElement("section",{className:f.default.medium,style:{"--box-shadow":v}}),t.default.createElement("section",{className:f.default.big,style:{"--box-shadow":x}}))},m=d.default=u},22549:function(O,d,e){var c=e(24994),i=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var h=w(e(96540)),t=c(e(71508));function f(u){if(typeof WeakMap!="function")return null;var m=new WeakMap,l=new WeakMap;return(f=function(a){return a?l:m})(u)}function w(u,m){if(!m&&u&&u.__esModule)return u;if(u===null||i(u)!="object"&&typeof u!="function")return{default:u};var l=f(m);if(l&&l.has(u))return l.get(u);var o={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in u)if(r!=="default"&&{}.hasOwnProperty.call(u,r)){var n=a?Object.getOwnPropertyDescriptor(u,r):null;n&&(n.get||n.set)?Object.defineProperty(o,r,n):o[r]=u[r]}return o.default=u,l&&l.set(u,o),o}var g=function(m){var l=m.cards,o=m.children;return h.default.createElement(h.default.Fragment,null,h.default.createElement("section",{className:"flex flex-col gap-4 pt-30 pb-20"},l.map(function(a,r){var n=r%2===0?"animate-slide-in-left":"animate-slide-in-right";return h.default.createElement("div",{key:a==null?void 0:a.id,style:{top:"calc(50px + ".concat((r+1)*30,"px)")},className:(0,t.default)("sticky z-0 m-auto flex w-[50vw] justify-center overflow-hidden rounded-2xl bg-[#0a192f] px-8 pt-4 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-2xl after:outline after:-outline-offset-2 after:outline-white/20",n)},h.default.createElement("div",{className:"animate-wiggle sticky top-9 h-[30vh]"},h.default.createElement("p",{className:"animate-hue-rotate hue-clip text-gradient text-2xl"},"Card Item")))})))},P=d.default=g},18404:function(O,d,e){var c=e(24994),i=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var h=c(e(41132)),t=c(e(96540)),f=e(44780),w=c(e(59378)),g=c(e(81988)),P=c(e(62540)),u=E(e(71635)),m=c(e(59367)),l=c(e(61714)),o=c(e(22549)),a=c(e(29492)),r=c(e(26718)),n=c(e(48632)),s=c(e(17329)),v=e(41149);function p(b){if(typeof WeakMap!="function")return null;var M=new WeakMap,y=new WeakMap;return(p=function(_){return _?y:M})(b)}function E(b,M){if(!M&&b&&b.__esModule)return b;if(b===null||i(b)!="object"&&typeof b!="function")return{default:b};var y=p(M);if(y&&y.has(b))return y.get(b);var A={__proto__:null},_=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var C in b)if(C!=="default"&&{}.hasOwnProperty.call(b,C)){var j=_?Object.getOwnPropertyDescriptor(b,C):null;j&&(j.get||j.set)?Object.defineProperty(A,C,j):A[C]=b[C]}return A.default=b,y&&y.set(b,A),A}var x=[a.default,r.default,n.default,s.default],B=[{title:"Name",align:"center",dataIndex:"name",width:150},{title:"Age",align:"center",dataIndex:"age",width:150},{title:"Address",align:"center",dataIndex:"address"}],I=[{title:"Product",value:"product",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Product Tab"))},{title:"Services",value:"services",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Services tab"))},{title:"Playground",value:"playground",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Playground tab"))},{title:"Content",value:"content",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Content tab"))},{title:"Random",value:"random",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Random tab"))}],N=function(){return t.default.createElement(w.default,null,t.default.createElement(l.default,null),t.default.createElement(o.default,{cards:(0,h.default)(Array.from({length:4},function(){return{id:Math.random()}}))}),t.default.createElement("div",{className:"relative w-full overflow-hidden bg-[#0a192f]"},t.default.createElement("div",{className:"absolute top-0 right-0 h-full w-1/2"},t.default.createElement("div",{className:"absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20",style:{clipPath:"polygon(100% 0, 100% 100%, 0 100%, 100% 0)"}})),t.default.createElement("div",{className:"absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-white/20"}),t.default.createElement("div",{className:"absolute right-0 bottom-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full border-8 border-white/20"}),t.default.createElement("div",{className:"relative mx-auto max-w-7xl px-4 py-16"},t.default.createElement("div",{className:"mb-16 text-center"},t.default.createElement("h1",{className:"mb-6 text-4xl font-bold text-white md:text-5xl"},"Influencer And Affiliate Marketing Plans and Pricing"),t.default.createElement("p",{className:"mx-auto max-w-3xl text-lg text-gray-300"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, in? Nemo, quas esse a id at quae sunt! Temporibus, consectetur optio. Beatae, culpa nam quas eaque ipsa blanditiis adipisci rem."))),t.default.createElement("div",{className:"relative mt-8 flex h-16 justify-center gap-8"},t.default.createElement(u.default,{initialX:-150},t.default.createElement(u.SocialIcon,{icon:v.Command,color:"bg-blue-500"})),t.default.createElement(u.default,{initialX:-50},t.default.createElement(u.SocialIcon,{icon:v.Cannabis,color:"bg-blue-400"})),t.default.createElement(u.default,{initialX:50},t.default.createElement(u.SocialIcon,{icon:v.Beer,color:"bg-pink-500"})),t.default.createElement(u.default,{initialX:150},t.default.createElement(u.SocialIcon,{icon:v.Mail,color:"bg-red-500"})))),t.default.createElement(P.default,{companies:x}),t.default.createElement("div",{className:"b relative mx-auto flex h-[20rem] w-full max-w-5xl flex-col items-start justify-start [perspective:1000px]"},t.default.createElement(g.default,{tabs:I})),t.default.createElement(f.Table,{columns:B,dataSource:[],pagination:{pageSize:50},scroll:{y:240}}),t.default.createElement(m.default,null))},D=d.default=N},31583:function(O,d,e){e.r(d);var c=e(85072),i=e.n(c),h=e(97825),t=e.n(h),f=e(77659),w=e.n(f),g=e(55056),P=e.n(g),u=e(10540),m=e.n(u),l=e(41113),o=e.n(l),a=e(46456),r={};r.styleTagTransform=o(),r.setAttributes=P(),r.insert=w().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=m();var n=i()(a.A,r);d.default=a.A&&a.A.locals?a.A.locals:void 0},26718:function(O,d,e){O.exports=e.p+"images/916ddb5adf113a8dd7a3.png"},48632:function(O,d,e){O.exports=e.p+"images/695c6a7e4d55286b3565.png"},29492:function(O,d,e){O.exports=e.p+"images/f5fb3175e80af3f631cc.png"},17329:function(O,d,e){O.exports=e.p+"images/9ce539741014a14d8c0c.png"}}]);
