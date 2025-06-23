(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[8404],{887:function(u,c,t){var r=t(16993),n=t(11791);function i(e,l,b,g,h){return new n(r().w(e,l,b,g),h||Promise)}u.exports=i,u.exports.__esModule=!0,u.exports.default=u.exports},4373:function(u){function c(t){var r=Object(t),n=[];for(var i in r)n.unshift(i);return function e(){for(;n.length;)if((i=n.pop())in r)return e.value=i,e.done=!1,e;return e.done=!0,e}}u.exports=c,u.exports.__esModule=!0,u.exports.default=u.exports},4633:function(u,c,t){var r=t(25172),n=t(16993),i=t(55869),e=t(887),l=t(11791),b=t(4373),g=t(30579);function h(){"use strict";var v=n(),x=v.m(h),A=(Object.getPrototypeOf?Object.getPrototypeOf(x):x.__proto__).constructor;function E(d){var m=typeof d=="function"&&d.constructor;return!!m&&(m===A||(m.displayName||m.name)==="GeneratorFunction")}var a={throw:1,return:2,break:3,continue:3};function o(d){var m,s;return function(p){m||(m={stop:function(){return s(p.a,2)},catch:function(){return p.v},abrupt:function(y,C){return s(p.a,a[y],C)},delegateYield:function(y,C,B){return m.resultName=C,s(p.d,g(y),B)},finish:function(y){return s(p.f,y)}},s=function(y,C,B){p.p=m.prev,p.n=m.next;try{return y(C,B)}finally{m.next=p.n}}),m.resultName&&(m[m.resultName]=p.v,m.resultName=void 0),m.sent=p.v,m.next=p.n;try{return d.call(this,m)}finally{p.p=m.prev,p.n=m.next}}}return(u.exports=h=function(){return{wrap:function(s,p,f,y){return v.w(o(s),p,f,y&&y.reverse())},isGeneratorFunction:E,mark:v.m,awrap:function(s,p){return new r(s,p)},AsyncIterator:l,async:function(s,p,f,y,C){return(E(p)?e:i)(o(s),p,f,y,C)},keys:b,values:g}},u.exports.__esModule=!0,u.exports.default=u.exports)()}u.exports=h,u.exports.__esModule=!0,u.exports.default=u.exports},11791:function(u,c,t){var r=t(25172),n=t(75546);function i(e,l){function b(h,v,x,A){try{var E=e[h](v),a=E.value;return a instanceof r?l.resolve(a.v).then(function(o){b("next",o,x,A)},function(o){b("throw",o,x,A)}):l.resolve(a).then(function(o){E.value=o,x(E)},function(o){return b("throw",o,x,A)})}catch(o){A(o)}}var g;this.next||(n(i.prototype),n(i.prototype,typeof Symbol=="function"&&Symbol.asyncIterator||"@asyncIterator",function(){return this})),n(this,"_invoke",function(h,v,x){function A(){return new l(function(E,a){b(h,x,E,a)})}return g=g?g.then(A,A):A()},!0)}u.exports=i,u.exports.__esModule=!0,u.exports.default=u.exports},16993:function(u,c,t){var r=t(75546);function n(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var i,e,l=typeof Symbol=="function"?Symbol:{},b=l.iterator||"@@iterator",g=l.toStringTag||"@@toStringTag";function h(m,s,p,f){var y=s&&s.prototype instanceof x?s:x,C=Object.create(y.prototype);return r(C,"_invoke",function(B,T,F){var S,_,w,P=0,W=F||[],O=!1,I={p:0,n:0,v:i,a:R,f:R.bind(i,4),d:function(D,M){return S=D,_=0,w=i,I.n=M,v}};function R(j,D){for(_=j,w=D,e=0;!O&&P&&!M&&e<W.length;e++){var M,N=W[e],k=I.p,U=N[2];j>3?(M=U===D)&&(_=N[4]||3,w=N[5]===i?N[3]:N[5],N[4]=3,N[5]=i):N[0]<=k&&((M=j<2&&k<N[1])?(_=0,I.v=D,I.n=N[1]):k<U&&(M=j<3||N[0]>D||D>U)&&(N[4]=j,N[5]=D,I.n=U,_=0))}if(M||j>1)return v;throw O=!0,D}return function(j,D,M){if(P>1)throw TypeError("Generator is already running");for(O&&D===1&&R(D,M),_=D,w=M;(e=_<2?i:w)||!O;){S||(_?_<3?(_>1&&(I.n=-1),R(_,w)):I.n=w:I.v=w);try{if(P=2,S){if(_||(j="next"),e=S[j]){if(!(e=e.call(S,w)))throw TypeError("iterator result is not an object");if(!e.done)return e;w=e.value,_<2&&(_=0)}else _===1&&(e=S.return)&&e.call(S),_<2&&(w=TypeError("The iterator does not provide a '"+j+"' method"),_=1);S=i}else if((e=(O=I.n<0)?w:B.call(T,I))!==v)break}catch(N){S=i,_=1,w=N}finally{P=1}}return{value:e,done:O}}}(m,p,f),!0),C}var v={};function x(){}function A(){}function E(){}e=Object.getPrototypeOf;var a=[][b]?e(e([][b]())):(r(e={},b,function(){return this}),e),o=E.prototype=x.prototype=Object.create(a);function d(m){return Object.setPrototypeOf?Object.setPrototypeOf(m,E):(m.__proto__=E,r(m,g,"GeneratorFunction")),m.prototype=Object.create(o),m}return A.prototype=E,r(o,"constructor",E),r(E,"constructor",A),A.displayName="GeneratorFunction",r(E,g,"GeneratorFunction"),r(o),r(o,g,"Generator"),r(o,b,function(){return this}),r(o,"toString",function(){return"[object Generator]"}),(u.exports=n=function(){return{w:h,m:d}},u.exports.__esModule=!0,u.exports.default=u.exports)()}u.exports=n,u.exports.__esModule=!0,u.exports.default=u.exports},17329:function(u,c,t){"use strict";u.exports=t.p+"images/9ce539741014a14d8c0c.png"},18404:function(u,c,t){"use strict";var r=t(24994),n=t(73738);Object.defineProperty(c,"__esModule",{value:!0}),c.default=void 0;var i=r(t(41132)),e=B(t(96540)),l=t(51409),b=r(t(59378)),g=r(t(81988)),h=r(t(62540)),v=B(t(71635)),x=r(t(51502)),A=r(t(59367)),E=r(t(61714)),a=r(t(70575)),o=r(t(22549)),d=r(t(29492)),m=r(t(26718)),s=r(t(48632)),p=r(t(17329)),f=t(91794),y=r(t(54887)),C=r(t(60295));function B(O,I){if(typeof WeakMap=="function")var R=new WeakMap,j=new WeakMap;return(B=function(M,N){if(!N&&M&&M.__esModule)return M;var k,U,Y={__proto__:null,default:M};if(M===null||n(M)!="object"&&typeof M!="function")return Y;if(k=N?j:R){if(k.has(M))return k.get(M);k.set(M,Y)}for(var K in M)K!=="default"&&{}.hasOwnProperty.call(M,K)&&((U=(k=Object.defineProperty)&&Object.getOwnPropertyDescriptor(M,K))&&(U.get||U.set)?k(Y,K,U):Y[K]=M[K]);return Y})(O,I)}var T=[d.default,m.default,s.default,p.default],F=[{title:"Name",align:"center",dataIndex:"name",width:150},{title:"Age",align:"center",dataIndex:"age",width:150},{title:"Address",align:"center",dataIndex:"address"}],S=[{title:"Product",value:"product",content:e.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},e.default.createElement("p",null,"Product Tab"))},{title:"Services",value:"services",content:e.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},e.default.createElement("p",null,"Services tab"))},{title:"Playground",value:"playground",content:e.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},e.default.createElement("p",null,"Playground tab"))},{title:"Content",value:"content",content:e.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},e.default.createElement("p",null,"Content tab"))},{title:"Random",value:"random",content:e.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},e.default.createElement("p",null,"Random tab"))}],_={npm:"npm run shadcn add button",yarn:"yarn shadcn add button",pnpm:"pnpm dlx shadcn@latest add button",bun:"bun x shadcn@latest add button"},w=function(I,R){var j=new Date(I),D=new Date(R),M=Math.abs(D-j),N=Math.ceil(M/(1e3*60*60*24));return N},P=function(){return e.default.createElement(b.default,null,e.default.createElement("section",{style:{position:"relative",zIndex:1,backgroundColor:"#fff",transform:"translate3d(0, 0, 0)"}},e.default.createElement(a.default,null),e.default.createElement(y.default,null),e.default.createElement(E.default,null),e.default.createElement(o.default,{cards:(0,i.default)(Array.from({length:4},function(){return{id:Math.random()}}))}),e.default.createElement("div",{className:"relative w-full overflow-hidden bg-[#0a192f]"},e.default.createElement("div",{className:"absolute top-0 right-0 h-full w-1/2"},e.default.createElement("div",{className:"absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20",style:{clipPath:"polygon(100% 0, 100% 100%, 0 100%, 100% 0)"}})),e.default.createElement("div",{className:"absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-white/20"}),e.default.createElement("div",{className:"absolute right-0 bottom-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full border-8 border-white/20"}),e.default.createElement("div",{className:"relative mx-auto max-w-7xl px-4 py-16"},e.default.createElement("div",{className:"mb-16 text-center"},e.default.createElement("h1",{className:"mb-6 text-4xl font-bold text-white md:text-5xl"},"Influencer And Affiliate Marketing Plans and Pricing"),e.default.createElement("p",{className:"mx-auto max-w-3xl text-lg text-gray-300"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, in? Nemo, quas esse a id at quae sunt! Temporibus, consectetur optio. Beatae, culpa nam quas eaque ipsa blanditiis adipisci rem."))),e.default.createElement("div",{className:"relative mt-8 flex h-16 justify-center gap-8"},e.default.createElement(v.default,{initialX:-150},e.default.createElement(v.SocialIcon,{icon:f.Command,color:"bg-blue-500"})),e.default.createElement(v.default,{initialX:-50},e.default.createElement(v.SocialIcon,{icon:f.Cannabis,color:"bg-blue-400"})),e.default.createElement(v.default,{initialX:50},e.default.createElement(v.SocialIcon,{icon:f.Beer,color:"bg-pink-500"})),e.default.createElement(v.default,{initialX:150},e.default.createElement(v.SocialIcon,{icon:f.Mail,color:"bg-red-500"})))),e.default.createElement(h.default,{companies:T}),e.default.createElement("section",{className:"flex flex-row items-center justify-center gap-5"},e.default.createElement(x.default,{width:300,height:100,path:"M0,50 Q150,0 300,50"}),e.default.createElement(x.default,{width:200,height:200,path:"M100,0 L75,75 L125,75 L50,200 L100,100 L50,100 L100,0",gradientColors:["#F1C40F","#F1C40F","#E67E22"]}),e.default.createElement(x.default,{width:200,height:200,path:"M100,100 m0,-75 a75,75 0 1,1 -0.1,0 z",gradientColors:["#7B68EE","#7B68EE","#3498DB"]}),e.default.createElement(x.default,{width:300,height:100,path:"M0,50 L75,25 L150,75 L225,25 L300,50"})),e.default.createElement("section",{className:"flex flex-row items-center justify-center gap-5"},e.default.createElement(x.default,{width:200,height:50,path:"M 20,25 L 180,25",gradientColors:["#FF5733","#FF5733","#C70039"]}),e.default.createElement(x.default,{width:250,height:200,path:"M 50,20 L 50,60 L 80,80 L 200,60",gradientColors:["#FFA07A","#FFA07A","#FF6347"]}),e.default.createElement(x.default,{width:200,height:200,path:"M 20,20 L 180,180",gradientColors:["#5733FF","#5733FF","#C700C7"]})),e.default.createElement("section",{className:"flex flex-row items-center justify-center gap-5"},e.default.createElement(x.default,{width:200,height:200,path:"M 50,20 L 100,20 L 60, 25 L 180, 25",gradientColors:["#FF69B4","#FF69B4","#8A2BE2"]}),e.default.createElement(x.default,{width:200,height:200,path:"M 50,20 L 100,20 L 100,30 L 150, 30",gradientColors:["#FF1493","#FF1493","#9400D3"]}),e.default.createElement(x.default,{width:200,height:200,path:"M 20,30 L 40,30 L 40,10 L 180, 10",gradientColors:["#FFA500","#FFA500","#FF4500"]}),e.default.createElement(x.default,{width:200,height:200,path:"M 10 10 L 90 10 Q 100 50 90 90 C 50 100 10 50 10 10 Z",gradientColors:["#FFA500","#FFA500","#FF4500"]})),e.default.createElement("div",{className:"b relative mx-auto flex h-[20rem] w-full max-w-5xl flex-col items-start justify-start [perspective:1000px]"},e.default.createElement(g.default,{tabs:S})),e.default.createElement(l.Table,{columns:F,dataSource:[],pagination:{pageSize:50},scroll:{y:240}}),e.default.createElement("section",{className:"m-10 flex items-center justify-center gap-5"},e.default.createElement("div",{className:"mb-5 inline-block rounded-xl bg-gradient-to-tl from-blue-600 via-transparent to-purple-400 p-px"},e.default.createElement("div",{className:"min-w-20 rounded-xl bg-white px-3 py-1.5 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:bg-neutral-900"},e.default.createElement("span",{className:"bg-gradient-to-tl from-blue-600 to-purple-400 bg-clip-text text-transparent"},"200+"))),e.default.createElement("div",{className:"mb-5 inline-block rounded-xl bg-gradient-to-tl from-blue-600 via-transparent to-purple-400 p-px"},e.default.createElement("div",{className:"min-w-20 rounded-xl bg-white px-3 py-1.5 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:bg-neutral-900"},e.default.createElement("span",{className:"bg-gradient-to-tl from-blue-600 to-purple-400 bg-clip-text text-transparent"},"400+"))),e.default.createElement("div",{className:"mb-5 inline-block rounded-xl bg-gradient-to-tl from-blue-600 via-transparent to-purple-400 p-px"},e.default.createElement("div",{className:"min-w-20 rounded-xl bg-white px-3 py-1.5 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:bg-neutral-900"},e.default.createElement("span",{className:"bg-gradient-to-tl from-blue-600 to-purple-400 bg-clip-text text-transparent"},"1200+"))),e.default.createElement("div",{className:"mb-5 inline-block rounded-xl bg-gradient-to-tl from-blue-600 via-transparent to-purple-400 p-px"},e.default.createElement("div",{className:"min-w-20 rounded-xl bg-white px-3 py-1.5 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:bg-neutral-900"},e.default.createElement("span",{className:"bg-gradient-to-tl from-blue-600 to-purple-400 bg-clip-text text-transparent"},"2000+")))),e.default.createElement("section",{className:C.default["section-gradient"]},e.default.createElement("div",{className:C.default.wave}),e.default.createElement("div",{className:C.default.wave}),e.default.createElement("div",{className:C.default.wave}))),e.default.createElement(A.default,null))},W=c.default=P},21634:function(u,c,t){"use strict";var r=t(71354),n=t.n(r),i=t(76314),e=t.n(i),l=e()(n());l.push([u.id,`@font: 'Karla', sans-serif;\r
\r
@primary-color: #3e6f9e;\r
\r
body {\r
  font-family: @font;\r
  color: @primary-color;\r
  font-size: 14px;\r
}\r
\r
.flex--_gwXM {\r
  display: flex;\r
  align-items: center;\r
\r
  .flexItem--U6z9X {\r
    flex: 1 1;\r
    color: #3e6f9e;\r
  }\r
}\r
\r
.button--RU103 {\r
  background: transparent;\r
  color: #33333360;\r
  text-transform: uppercase;\r
  border: 4px solid #33333360;\r
  border-radius: 1000px;\r
  font-size: 18px;\r
  font-weight: 700;\r
  letter-spacing: 5px;\r
  padding: 10px 20px;\r
  position: relative;\r
  transition:\r
    border-color 0.5s,\r
    color 0.5s;\r
  cursor: pointer;\r
  z-index: 1;\r
  overflow: hidden;\r
}\r
\r
.button--RU103:hover {\r
  border-color: #33333380;\r
  color: #33333380;\r
}\r
\r
.button--RU103::before,\r
.button--RU103::after {\r
  content: '';\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  background: #00000060;\r
  transition: transform 0.5s;\r
  transform: rotate(-90deg);\r
  transform-origin: bottom left;\r
  z-index: -1;\r
}\r
\r
.button--RU103::after {\r
  transform-origin: top right;\r
}\r
\r
.button--RU103:hover::before,\r
.button--RU103:hover::after {\r
  transform: rotate(0deg);\r
}\r
\r
.section-gradient--xN4VI {\r
  background: linear-gradient(\r
    315deg,\r
    rgb(252 208 158) 3%,\r
    rgb(144 200 255) 38%,\r
    rgb(104 245 250) 68%,\r
    rgb(45 151 250) 98%\r
  );\r
  animation: gradient--zruvo 25s ease infinite;\r
  background-size: 400% 400%;\r
  position: relative;\r
  overflow: hidden;\r
  height: 300px;\r
}\r
\r
@keyframes gradient--zruvo {\r
  0% {\r
    background-position: 0 0;\r
  }\r
\r
  50% {\r
    background-position: 100% 100%;\r
  }\r
\r
  100% {\r
    background-position: 0 0;\r
  }\r
}\r
\r
.wave--QYXbB {\r
  background: rgb(255 255 255 / 25%);\r
  border-radius: 1000% 1000% 0 0;\r
  position: absolute;\r
  bottom: 0;\r
  left: 0;\r
  width: 200%;\r
  height: 200px;\r
  animation: wave--QYXbB 10s -3s linear infinite;\r
  transform: translate3d(0, 0, 0);\r
  opacity: 0.8;\r
  z-index: 1;\r
}\r
\r
.wave--QYXbB:nth-of-type(2) {\r
  bottom: -30px;\r
  animation: wave--QYXbB 8s linear reverse infinite;\r
  opacity: 0.8;\r
}\r
\r
.wave--QYXbB:nth-of-type(3) {\r
  bottom: -60px;\r
  animation: wave--QYXbB 10s -1s reverse infinite;\r
  opacity: 0.9;\r
}\r
\r
@keyframes wave--QYXbB {\r
  2% {\r
    transform: translateX(1);\r
  }\r
\r
  25% {\r
    transform: translateX(-25%);\r
  }\r
\r
  50% {\r
    transform: translateX(-50%);\r
  }\r
\r
  75% {\r
    transform: translateX(-25%);\r
  }\r
\r
  100% {\r
    transform: translateX(1);\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/pages/demo/index.module.less"],names:[],mappings:"AAAA,0BAA0B;;AAE1B,uBAAuB;;AAEvB;EACE,kBAAkB;EAClB,qBAAqB;EACrB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;;EAEnB;IACE,SAAO;IACP,cAAc;EAChB;AACF;;AAEA;EACE,uBAAuB;EACvB,gBAAgB;EAChB,yBAAyB;EACzB,2BAA2B;EAC3B,qBAAqB;EACrB,eAAe;EACf,gBAAgB;EAChB,mBAAmB;EACnB,kBAAkB;EAClB,kBAAkB;EAClB;;cAEY;EACZ,eAAe;EACf,UAAU;EACV,gBAAgB;AAClB;;AAEA;EACE,uBAAuB;EACvB,gBAAgB;AAClB;;AAEA;;EAEE,WAAW;EACX,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,qBAAqB;EACrB,0BAA0B;EAC1B,yBAAyB;EACzB,6BAA6B;EAC7B,WAAW;AACb;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;;EAEE,uBAAuB;AACzB;;AAEA;EACE;;;;;;GAMC;EACD,4CAAqC;EACrC,0BAA0B;EAC1B,kBAAkB;EAClB,gBAAgB;EAChB,aAAa;AACf;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,8BAA8B;EAChC;;EAEA;IACE,wBAAwB;EAC1B;AACF;;AAEA;EACE,kCAAkC;EAClC,8BAA8B;EAC9B,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,WAAW;EACX,aAAa;EACb,8CAAuC;EACvC,+BAA+B;EAC/B,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,iDAA0C;EAC1C,YAAY;AACd;;AAEA;EACE,aAAa;EACb,+CAAwC;EACxC,YAAY;AACd;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,2BAA2B;EAC7B;;EAEA;IACE,2BAA2B;EAC7B;;EAEA;IACE,2BAA2B;EAC7B;;EAEA;IACE,wBAAwB;EAC1B;AACF",sourcesContent:[`@font: 'Karla', sans-serif;\r
\r
@primary-color: #3e6f9e;\r
\r
body {\r
  font-family: @font;\r
  color: @primary-color;\r
  font-size: 14px;\r
}\r
\r
.flex {\r
  display: flex;\r
  align-items: center;\r
\r
  .flexItem {\r
    flex: 1;\r
    color: #3e6f9e;\r
  }\r
}\r
\r
.button {\r
  background: transparent;\r
  color: #33333360;\r
  text-transform: uppercase;\r
  border: 4px solid #33333360;\r
  border-radius: 1000px;\r
  font-size: 18px;\r
  font-weight: 700;\r
  letter-spacing: 5px;\r
  padding: 10px 20px;\r
  position: relative;\r
  transition:\r
    border-color 0.5s,\r
    color 0.5s;\r
  cursor: pointer;\r
  z-index: 1;\r
  overflow: hidden;\r
}\r
\r
.button:hover {\r
  border-color: #33333380;\r
  color: #33333380;\r
}\r
\r
.button::before,\r
.button::after {\r
  content: '';\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  background: #00000060;\r
  transition: transform 0.5s;\r
  transform: rotate(-90deg);\r
  transform-origin: bottom left;\r
  z-index: -1;\r
}\r
\r
.button::after {\r
  transform-origin: top right;\r
}\r
\r
.button:hover::before,\r
.button:hover::after {\r
  transform: rotate(0deg);\r
}\r
\r
.section-gradient {\r
  background: linear-gradient(\r
    315deg,\r
    rgb(252 208 158) 3%,\r
    rgb(144 200 255) 38%,\r
    rgb(104 245 250) 68%,\r
    rgb(45 151 250) 98%\r
  );\r
  animation: gradient 25s ease infinite;\r
  background-size: 400% 400%;\r
  position: relative;\r
  overflow: hidden;\r
  height: 300px;\r
}\r
\r
@keyframes gradient {\r
  0% {\r
    background-position: 0 0;\r
  }\r
\r
  50% {\r
    background-position: 100% 100%;\r
  }\r
\r
  100% {\r
    background-position: 0 0;\r
  }\r
}\r
\r
.wave {\r
  background: rgb(255 255 255 / 25%);\r
  border-radius: 1000% 1000% 0 0;\r
  position: absolute;\r
  bottom: 0;\r
  left: 0;\r
  width: 200%;\r
  height: 200px;\r
  animation: wave 10s -3s linear infinite;\r
  transform: translate3d(0, 0, 0);\r
  opacity: 0.8;\r
  z-index: 1;\r
}\r
\r
.wave:nth-of-type(2) {\r
  bottom: -30px;\r
  animation: wave 8s linear reverse infinite;\r
  opacity: 0.8;\r
}\r
\r
.wave:nth-of-type(3) {\r
  bottom: -60px;\r
  animation: wave 10s -1s reverse infinite;\r
  opacity: 0.9;\r
}\r
\r
@keyframes wave {\r
  2% {\r
    transform: translateX(1);\r
  }\r
\r
  25% {\r
    transform: translateX(-25%);\r
  }\r
\r
  50% {\r
    transform: translateX(-50%);\r
  }\r
\r
  75% {\r
    transform: translateX(-25%);\r
  }\r
\r
  100% {\r
    transform: translateX(1);\r
  }\r
}\r
`],sourceRoot:""}]),l.locals={flex:"flex--_gwXM",flexItem:"flexItem--U6z9X",button:"button--RU103","section-gradient":"section-gradient--xN4VI",sectionGradient:"section-gradient--xN4VI",gradient:"gradient--zruvo",wave:"wave--QYXbB"},c.A=l},22549:function(u,c,t){"use strict";var r=t(24994),n=t(73738);Object.defineProperty(c,"__esModule",{value:!0}),c.default=void 0;var i=l(t(96540)),e=r(t(71508));function l(h,v){if(typeof WeakMap=="function")var x=new WeakMap,A=new WeakMap;return(l=function(a,o){if(!o&&a&&a.__esModule)return a;var d,m,s={__proto__:null,default:a};if(a===null||n(a)!="object"&&typeof a!="function")return s;if(d=o?A:x){if(d.has(a))return d.get(a);d.set(a,s)}for(var p in a)p!=="default"&&{}.hasOwnProperty.call(a,p)&&((m=(d=Object.defineProperty)&&Object.getOwnPropertyDescriptor(a,p))&&(m.get||m.set)?d(s,p,m):s[p]=a[p]);return s})(h,v)}var b=function(v){var x=v.cards,A=v.children;return i.default.createElement(i.default.Fragment,null,i.default.createElement("section",{className:"flex flex-col gap-4 pt-30 pb-20"},x.map(function(E,a){var o=a%2===0?"animate-slide-in-left":"animate-slide-in-right";return i.default.createElement("div",{key:E==null?void 0:E.id,style:{top:"calc(50px + ".concat((a+1)*30,"px)")},className:(0,e.default)("sticky z-0 m-auto flex w-[50vw] justify-center overflow-hidden rounded-2xl bg-[#0a192f] px-8 pt-4 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-2xl after:outline after:-outline-offset-2 after:outline-white/20",o)},i.default.createElement("div",{className:"animate-wiggle sticky top-9 h-[30vh]"},i.default.createElement("p",{className:"animate-hue-rotate hue-clip text-gradient text-2xl"},"Card Item")))})))},g=c.default=b},25172:function(u){function c(t,r){this.v=t,this.k=r}u.exports=c,u.exports.__esModule=!0,u.exports.default=u.exports},26718:function(u,c,t){"use strict";u.exports=t.p+"images/916ddb5adf113a8dd7a3.png"},29293:function(u){function c(r,n,i,e,l,b,g){try{var h=r[b](g),v=h.value}catch(x){return void i(x)}h.done?n(v):Promise.resolve(v).then(e,l)}function t(r){return function(){var n=this,i=arguments;return new Promise(function(e,l){var b=r.apply(n,i);function g(v){c(b,e,l,g,h,"next",v)}function h(v){c(b,e,l,g,h,"throw",v)}g(void 0)})}}u.exports=t,u.exports.__esModule=!0,u.exports.default=u.exports},29492:function(u,c,t){"use strict";u.exports=t.p+"images/f5fb3175e80af3f631cc.png"},30579:function(u,c,t){var r=t(73738).default;function n(i){if(i!=null){var e=i[typeof Symbol=="function"&&Symbol.iterator||"@@iterator"],l=0;if(e)return e.call(i);if(typeof i.next=="function")return i;if(!isNaN(i.length))return{next:function(){return i&&l>=i.length&&(i=void 0),{value:i&&i[l++],done:!i}}}}throw new TypeError(r(i)+" is not iterable")}u.exports=n,u.exports.__esModule=!0,u.exports.default=u.exports},31583:function(u,c,t){"use strict";t.r(c);var r=t(85072),n=t.n(r),i=t(97825),e=t.n(i),l=t(77659),b=t.n(l),g=t(55056),h=t.n(g),v=t(10540),x=t.n(v),A=t(41113),E=t.n(A),a=t(46456),o={};o.styleTagTransform=E(),o.setAttributes=h(),o.insert=b().bind(null,"head"),o.domAPI=e(),o.insertStyleElement=x();var d=n()(a.A,o);c.default=a.A&&a.A.locals?a.A.locals:void 0},46456:function(u,c,t){"use strict";var r=t(71354),n=t.n(r),i=t(76314),e=t.n(i),l=e()(n());l.push([u.id,`.stars--xQGmL {\r
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
`],sourceRoot:""}]),l.locals={stars:"stars--xQGmL","anim-star":"anim-star--rqp4H",animStar:"anim-star--rqp4H",medium:"medium--djEFj",big:"big--sf21I"},c.A=l},48632:function(u,c,t){"use strict";u.exports=t.p+"images/695c6a7e4d55286b3565.png"},51502:function(u,c,t){"use strict";var r=t(24994);Object.defineProperty(c,"__esModule",{value:!0}),c.default=void 0;var n=r(t(96540)),i=t(21126),e=function(g){var h=g.width,v=g.height,x=g.baseColor,A=x===void 0?"black":x,E=g.gradientColors,a=E===void 0?["#2EB9DF","#2EB9DF","#9E00FF"]:E,o=g.animationDuration,d=o===void 0?2:o,m=g.strokeWidth,s=m===void 0?2:m,p=g.path,f="pulse-".concat(Math.random().toString(36).substring(2,9));return n.default.createElement("div",{className:"relative",style:{width:h,height:v}},n.default.createElement("svg",{width:h,height:v,viewBox:"0 0 ".concat(h," ").concat(v),fill:"none"},n.default.createElement("path",{d:p,stroke:A,strokeOpacity:"0.2"}),n.default.createElement("path",{d:p,stroke:"url(#".concat(f,")"),strokeLinecap:"round",strokeWidth:s}),n.default.createElement("defs",null,n.default.createElement(i.motion.linearGradient,{animate:{x1:[0,h*2],x2:[0,h]},transition:{duration:d,repeat:1/0,ease:"linear"},id:f,gradientUnits:"userSpaceOnUse"},n.default.createElement("stop",{stopColor:a[0],stopOpacity:"0"}),n.default.createElement("stop",{stopColor:a[1]}),n.default.createElement("stop",{offset:"1",stopColor:a[2],stopOpacity:"0"})))))},l=c.default=e},54756:function(u,c,t){var r=t(4633)();u.exports=r;try{regeneratorRuntime=r}catch(n){typeof globalThis=="object"?globalThis.regeneratorRuntime=r:Function("r","regeneratorRuntime = r")(r)}},54887:function(u,c,t){"use strict";var r=t(24994),n=t(73738);Object.defineProperty(c,"__esModule",{value:!0}),c.default=void 0;var i=r(t(41132)),e=r(t(85715)),l=h(t(96540)),b=t(51409),g=t(91794);function h(E,a){if(typeof WeakMap=="function")var o=new WeakMap,d=new WeakMap;return(h=function(s,p){if(!p&&s&&s.__esModule)return s;var f,y,C={__proto__:null,default:s};if(s===null||n(s)!="object"&&typeof s!="function")return C;if(f=p?d:o){if(f.has(s))return f.get(s);f.set(s,C)}for(var B in s)B!=="default"&&{}.hasOwnProperty.call(s,B)&&((y=(f=Object.defineProperty)&&Object.getOwnPropertyDescriptor(s,B))&&(y.get||y.set)?f(C,B,y):C[B]=s[B]);return C})(E,a)}var v=Array.from({length:30},function(E,a){return{name:"Item ".concat(a+1),category:["A","B","C"][a%3]}}),x=function(a){var o=a.tradeList,d=o===void 0?[]:o,m=(0,l.useState)([].concat((0,i.default)(d),v)),s=(0,e.default)(m,2),p=s[0],f=s[1],y=(0,l.useState)("all"),C=(0,e.default)(y,2),B=C[0],T=C[1],F=(0,l.useState)([].concat((0,i.default)(d),v)),S=(0,e.default)(F,2),_=S[0],w=S[1],P=(0,l.useState)(0),W=(0,e.default)(P,2),O=W[0],I=W[1],R=[{label:"\u5168\u90E8",value:"all"},{label:"\u5206\u7C7B A",value:"A"},{label:"\u5206\u7C7B B",value:"B"},{label:"\u5206\u7C7B C",value:"C"}],j=function(){w(B==="all"?(0,i.default)(p):p.filter(function(L){return B.includes(L.category)})),I(0)},D=function(){T("all"),j()},M=6,N=l.default.useMemo(function(){for(var X=[],L=0;L<_.length;L+=M)X.push(_.slice(L,L+M));return X},[_]),k=Math.ceil(_.length/M),U=function(){return I(Math.max(0,O-1))},Y=function(){return I(Math.min(k-1,O+1))},K=function(L){return I(L)};return(0,l.useEffect)(function(){j()},[B,p]),l.default.createElement("div",{className:"relative mx-auto w-full max-w-6xl"},l.default.createElement("div",{className:"mb-4 flex justify-end"},l.default.createElement(b.Select,{value:B,onChange:T,className:"w-[240px]",placeholder:"\u8BF7\u9009\u62E9\u5206\u7C7B",options:R})),l.default.createElement("div",{className:"relative flex items-center justify-between"},l.default.createElement(b.Button,{className:"cursor-pointer rounded-full",onClick:U,disabled:O===0,shape:"circle"},l.default.createElement(g.ChevronLeft,null)),l.default.createElement("div",{className:"relative mx-4 flex-grow overflow-hidden"},l.default.createElement("div",{className:"flex transition-transform duration-300 ease-in-out",style:{transform:"translateX(-".concat(O*100,"%)")}},N.length===0?l.default.createElement("div",{className:"w-full text-center text-gray-500"},"\u6682\u65E0\u6570\u636E"):l.default.createElement(l.default.Fragment,null,N.map(function(X,L){return l.default.createElement("div",{key:L,className:"flex min-w-full flex-wrap justify-center"},X.map(function(z,G){return l.default.createElement("div",{key:G,className:"w-1/3 p-2"},l.default.createElement("div",{className:"cus-bg mx-auto rounded-md border border-sky-500 p-4 text-center shadow-md"},l.default.createElement("div",{className:"mb-2 text-xl text-sky-500"},z.name),l.default.createElement("div",{className:"text-gray-500"},z.category)))}))})))),l.default.createElement(b.Button,{className:"cursor-pointer rounded-full",onClick:Y,disabled:O===k-1||p.length===0,shape:"circle"},l.default.createElement(g.ChevronRight,null))),l.default.createElement("div",{className:"mt-4 flex justify-center gap-4 space-x-4"},Array.from({length:k}).map(function(X,L){return l.default.createElement("button",{key:L,className:"h-2 w-2 rounded-full ring ring-blue-600/80 transition-colors duration-300 hover:bg-blue-600/80 ".concat(O===L?"bg-blue-600/80":"bg-white"),onClick:function(){return K(L)}})})))},A=c.default=x},55869:function(u,c,t){var r=t(887);function n(i,e,l,b,g){var h=r(i,e,l,b,g);return h.next().then(function(v){return v.done?v.value:h.next()})}u.exports=n,u.exports.__esModule=!0,u.exports.default=u.exports},59367:function(u,c,t){"use strict";var r=t(24994);Object.defineProperty(c,"__esModule",{value:!0}),c.default=void 0;var n=r(t(96540)),i=t(21126),e=t(91794),l=r(t(48632)),b=function(){return n.default.createElement("footer",{className:"sticky bottom-0 left-0 z-0 w-full bg-[#0a192f] py-16 text-white"},n.default.createElement("div",{className:"container mx-auto px-4"},n.default.createElement("div",{className:"grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4"},n.default.createElement("div",{className:"space-y-6"},n.default.createElement(i.motion.h2,{className:"bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5}},n.default.createElement("img",{src:l.default,width:"40",height:"40",alt:"Logo"})),n.default.createElement("p",{className:""},"Shaping the future of web development"),n.default.createElement("div",{className:"relative"},n.default.createElement("input",{type:"email",placeholder:"Your email",className:"w-full rounded-full border-2 px-4 py-2 transition-all duration-300 outline-none"}),n.default.createElement("button",{className:"absolute top-2 right-1 rounded-full p-1 transition-colors duration-300"},n.default.createElement(e.ArrowUpRight,{className:"size-4"})))),n.default.createElement("div",null,n.default.createElement("h3",{className:"mb-4 text-xl font-semibold"},"Navigation"),n.default.createElement("ul",{className:"space-y-2"},["Home","About","Services","Projects","Blog","Contact"].map(function(v){return n.default.createElement(i.motion.li,{key:v,whileHover:{x:5},transition:{type:"spring",stiffness:300}},n.default.createElement("a",{href:"#".concat(v.toLowerCase()),className:"text-black transition-colors duration-300 dark:text-white"},v))}))),n.default.createElement("div",null,n.default.createElement("h3",{className:"mb-4 text-xl font-semibold"},"Connect"),n.default.createElement("ul",{className:"space-y-2"},[{name:"LinkedIn",url:"https://www.linkedin.com"},{name:"Twitter",url:"https://www.twitter.com"},{name:"Instagram",url:"https://www.instagram.com"},{name:"GitHub",url:"https://www.github.com"}].map(function(v){return n.default.createElement(i.motion.li,{key:v.name,whileHover:{x:5},transition:{type:"spring",stiffness:300}},n.default.createElement("a",{href:v.url,target:"_blank",rel:"noopener noreferrer",className:"flex items-center text-black transition-colors duration-300 dark:text-white"},v.name,n.default.createElement(e.ArrowUpRight,{className:"ml-1 h-4 w-4"})))}))),n.default.createElement("div",{className:"space-y-4"},n.default.createElement("h3",{className:"text-xl font-semibold"},"Our Vision"),n.default.createElement("p",{className:""},"Pioneering the next generation of web experiences through innovative code and cutting-edge design."),n.default.createElement("div",{className:"flex space-x-4"},n.default.createElement(i.motion.div,{className:"h-2 w-2 rounded-full bg-blue-500",animate:{scale:[1,1.5,1]},transition:{repeat:1/0,duration:2}}),n.default.createElement(i.motion.div,{className:"h-2 w-2 rounded-full bg-purple-500",animate:{scale:[1,1.5,1]},transition:{repeat:1/0,duration:2,delay:.5}}),n.default.createElement(i.motion.div,{className:"h-2 w-2 rounded-full bg-pink-500",animate:{scale:[1,1.5,1]},transition:{repeat:1/0,duration:2,delay:1}})))),n.default.createElement("div",{className:"mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row"},n.default.createElement("p",{className:"text-sm"},"\xA9 ",new Date().getFullYear(),". All rights reserved."),n.default.createElement("div",{className:"mt-4 flex space-x-4 md:mt-0"},n.default.createElement("a",{className:"text-sm transition-colors duration-300 hover:text-white"},"Privacy Policy"),n.default.createElement("a",{className:"text-sm transition-colors duration-300 hover:text-white"},"Terms of Service")))))},g=c.default=b},59378:function(u,c,t){"use strict";var r=t(24994);Object.defineProperty(c,"__esModule",{value:!0}),c.default=void 0;var n=r(t(94634)),i=r(t(43693)),e=r(t(91847)),l=r(t(96540)),b=["style","children"];function g(A,E){var a=Object.keys(A);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(A);E&&(o=o.filter(function(d){return Object.getOwnPropertyDescriptor(A,d).enumerable})),a.push.apply(a,o)}return a}function h(A){for(var E=1;E<arguments.length;E++){var a=arguments[E]!=null?arguments[E]:{};E%2?g(Object(a),!0).forEach(function(o){(0,i.default)(A,o,a[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(a)):g(Object(a)).forEach(function(o){Object.defineProperty(A,o,Object.getOwnPropertyDescriptor(a,o))})}return A}var v=l.default.forwardRef(function(A,E){var a=A.style,o=A.children,d=(0,e.default)(A,b);return l.default.createElement("div",(0,n.default)({ref:E},d,{id:"scrollContainer",style:h({width:"100%",height:"calc(100vh - 204px)",position:"relative",overflowX:"hidden",overflowY:"auto"},a)}),o)}),x=c.default=v},60295:function(u,c,t){"use strict";t.r(c);var r=t(85072),n=t.n(r),i=t(97825),e=t.n(i),l=t(77659),b=t.n(l),g=t(55056),h=t.n(g),v=t(10540),x=t.n(v),A=t(41113),E=t.n(A),a=t(21634),o={};o.styleTagTransform=E(),o.setAttributes=h(),o.insert=b().bind(null,"head"),o.domAPI=e(),o.insertStyleElement=x();var d=n()(a.A,o);c.default=a.A&&a.A.locals?a.A.locals:void 0},61714:function(u,c,t){"use strict";var r=t(24994),n=t(73738);Object.defineProperty(c,"__esModule",{value:!0}),c.default=void 0;var i=r(t(85715)),e=b(t(96540)),l=r(t(31583));function b(x,A){if(typeof WeakMap=="function")var E=new WeakMap,a=new WeakMap;return(b=function(d,m){if(!m&&d&&d.__esModule)return d;var s,p,f={__proto__:null,default:d};if(d===null||n(d)!="object"&&typeof d!="function")return f;if(s=m?a:E){if(s.has(d))return s.get(d);s.set(d,f)}for(var y in d)y!=="default"&&{}.hasOwnProperty.call(d,y)&&((p=(s=Object.defineProperty)&&Object.getOwnPropertyDescriptor(d,y))&&(p.get||p.set)?s(f,y,p):f[y]=d[y]);return f})(x,A)}var g=function(A){for(var E=[],a=0;a<A;a++){var o=Math.floor(Math.random()*2e3),d=Math.floor(Math.random()*2e3);E.push("".concat(o,"px ").concat(d,"px #333"))}return E.join(", ")},h=function(){var A=(0,e.useState)(g(1400)),E=(0,i.default)(A,1),a=E[0],o=(0,e.useState)(g(400)),d=(0,i.default)(o,1),m=d[0],s=(0,e.useState)(g(200)),p=(0,i.default)(s,1),f=p[0];return e.default.createElement("section",{className:"absolute top-0 left-0"},e.default.createElement("section",{className:l.default.stars,style:{"--box-shadow":a}}),e.default.createElement("section",{className:l.default.medium,style:{"--box-shadow":m}}),e.default.createElement("section",{className:l.default.big,style:{"--box-shadow":f}}))},v=c.default=h},62540:function(u,c,t){"use strict";var r=t(24994),n=t(73738);Object.defineProperty(c,"__esModule",{value:!0}),c.default=void 0;var i=r(t(85715)),e=b(t(96540)),l=t(21126);function b(v,x){if(typeof WeakMap=="function")var A=new WeakMap,E=new WeakMap;return(b=function(o,d){if(!d&&o&&o.__esModule)return o;var m,s,p={__proto__:null,default:o};if(o===null||n(o)!="object"&&typeof o!="function")return p;if(m=d?E:A){if(m.has(o))return m.get(o);m.set(o,p)}for(var f in o)f!=="default"&&{}.hasOwnProperty.call(o,f)&&((s=(m=Object.defineProperty)&&Object.getOwnPropertyDescriptor(o,f))&&(s.get||s.set)?m(p,f,s):p[f]=o[f]);return p})(v,x)}var g=function(x){var A=x.companies,E=x.autorotateTiming,a=E===void 0?3e3:E,o=x.direction,d=o===void 0?"right":o,m=x.radius,s=m===void 0?180:m,p=(0,e.useState)(0),f=(0,i.default)(p,2),y=f[0],C=f[1];(0,e.useEffect)(function(){if(!(!A||A.length===0)){var _=setInterval(function(){B(d)},a);return function(){return clearInterval(_)}}},[A,a,d]);var B=function(w){var P=w==="right"?1:-1;C(function(W){return(W+P+A.length)%A.length})},T=function(w){var P=w*(Math.PI/3);return{x:Math.sin(P)*s,y:-Math.cos(P)*s+s/2}},F=(0,e.useMemo)(function(){return{enter:function(w){var P=T(d==="right"?-2:2),W=P.x,O=P.y;return{x:W,y:O,opacity:0,scale:.5}},center:function(w){var P=T(w),W=P.x,O=P.y;return{x:W,y:O,opacity:1,scale:w===0?1:.8,transition:{duration:.6,ease:[.6,.05,.01,.9]}}},exit:function(w){var P=T(d==="right"?2:-2),W=P.x,O=P.y;return{x:W,y:O,opacity:0,scale:.5,transition:{duration:.6,ease:[.6,.05,.01,.9]}}}}},[d,s]),S=(0,e.useMemo)(function(){return!A||A.length===0?[]:[-1,0,1].map(function(_){var w=(y+_+A.length)%A.length;return{offset:_,logo:A[w],index:w}})},[y,A]);return e.default.createElement("div",null,e.default.createElement("div",{className:"mx-auto w-full text-center"},e.default.createElement("div",{className:"relative h-[260px] overflow-hidden"},e.default.createElement("div",{className:"absolute inset-0 flex items-center justify-center"},e.default.createElement("div",{className:"relative min-h-[500px] min-w-[500px]"},e.default.createElement(l.AnimatePresence,{initial:!1},S.map(function(_){var w=_.offset,P=_.logo,W=_.index;return e.default.createElement(l.motion.div,{key:W,custom:w,variants:F,initial:"enter",animate:"center",exit:"exit",className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3"},e.default.createElement("img",{src:P,width:80,height:80,alt:"Company logo ".concat(W+1),className:"dark:brightness-200"}))})))))))},h=c.default=g},70575:function(u,c,t){"use strict";var r=t(24994),n=t(73738);Object.defineProperty(c,"__esModule",{value:!0}),c.default=void 0;var i=r(t(85715)),e=l(t(96540));function l(h,v){if(typeof WeakMap=="function")var x=new WeakMap,A=new WeakMap;return(l=function(a,o){if(!o&&a&&a.__esModule)return a;var d,m,s={__proto__:null,default:a};if(a===null||n(a)!="object"&&typeof a!="function")return s;if(d=o?A:x){if(d.has(a))return d.get(a);d.set(a,s)}for(var p in a)p!=="default"&&{}.hasOwnProperty.call(a,p)&&((m=(d=Object.defineProperty)&&Object.getOwnPropertyDescriptor(a,p))&&(m.get||m.set)?d(s,p,m):s[p]=a[p]);return s})(h,v)}var b=function(){var v=[{id:1,label:"\u9996\u9875"},{id:2,label:"\u4EA7\u54C1"},{id:3,label:"\u670D\u52A1"},{id:4,label:"\u5173\u4E8E\u6211\u4EEC"},{id:5,label:"\u8054\u7CFB\u6211\u4EEC"}],x=(0,e.useState)(1),A=(0,i.default)(x,2),E=A[0],a=A[1],o=function(m){a(m)};return e.default.createElement("div",{className:"mx-auto mt-8 w-full max-w-3xl"},e.default.createElement("div",{className:"flex flex-wrap border-b border-gray-200"},v.map(function(d){return e.default.createElement("button",{key:d.id,className:"relative cursor-pointer px-2 ".concat(E===d.id?"rounded-tab text-blue-600":"text-gray-500 hover:text-gray-700"),onClick:function(){return o(d.id)}},e.default.createElement("div",{className:"flex items-center px-4 py-1"},d.label))})),e.default.createElement("div",{className:"py-6"},v.map(function(d){return e.default.createElement("div",{key:d.id,className:E===d.id?"block":"hidden"},e.default.createElement("h2",{className:"mb-4 text-xl font-bold"},d.label),e.default.createElement("p",null,"\u8FD9\u662F",d.label,"\u7684\u5185\u5BB9\u533A\u57DF\u3002\u60A8\u53EF\u4EE5\u5728\u8FD9\u91CC\u6DFB\u52A0\u4EFB\u4F55\u76F8\u5173\u5185\u5BB9\u3002"))})))},g=c.default=b},71354:function(u){"use strict";u.exports=function(c){var t=c[1],r=c[3];if(!r)return t;if(typeof btoa=="function"){var n=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(n),e="/*# ".concat(i," */");return[t].concat([e]).join(`
`)}return[t].join(`
`)}},71508:function(u){function c(r){var n,i,e="";if(typeof r=="string"||typeof r=="number")e+=r;else if(typeof r=="object")if(Array.isArray(r)){var l=r.length;for(n=0;n<l;n++)r[n]&&(i=c(r[n]))&&(e&&(e+=" "),e+=i)}else for(i in r)r[i]&&(e&&(e+=" "),e+=i);return e}function t(){for(var r,n,i=0,e="",l=arguments.length;i<l;i++)(r=arguments[i])&&(n=c(r))&&(e&&(e+=" "),e+=n);return e}u.exports=t,u.exports.clsx=t},71635:function(u,c,t){"use strict";var r=t(24994),n=t(73738);Object.defineProperty(c,"__esModule",{value:!0}),c.default=c.SocialIcon=void 0;var i=r(t(91847)),e=r(t(54756)),l=r(t(29293)),b=r(t(85715)),g=x(t(96540)),h=t(21126),v=["icon","color"];function x(o,d){if(typeof WeakMap=="function")var m=new WeakMap,s=new WeakMap;return(x=function(f,y){if(!y&&f&&f.__esModule)return f;var C,B,T={__proto__:null,default:f};if(f===null||n(f)!="object"&&typeof f!="function")return T;if(C=y?s:m){if(C.has(f))return C.get(f);C.set(f,T)}for(var F in f)F!=="default"&&{}.hasOwnProperty.call(f,F)&&((B=(C=Object.defineProperty)&&Object.getOwnPropertyDescriptor(f,F))&&(B.get||B.set)?C(T,F,B):T[F]=f[F]);return T})(o,d)}var A=function(d){var m=d.children,s=d.initialX,p=(0,g.useState)(!1),f=(0,b.default)(p,2),y=f[0],C=f[1],B=(0,h.useAnimation)(),T=function(){var F=(0,l.default)(e.default.mark(function S(){return e.default.wrap(function(_){for(;;)switch(_.prev=_.next){case 0:if(!y){_.next=3;break}case 1:return _.next=2,B.start({x:s+Math.random()*30-15,y:Math.random()*30-15,transition:{duration:3,ease:"easeInOut"}});case 2:_.next=1;break;case 3:case"end":return _.stop()}},S)}));return function(){return F.apply(this,arguments)}}();return(0,g.useEffect)(function(){C(!0)},[]),(0,g.useEffect)(function(){T()},[y]),g.default.createElement(h.motion.div,{drag:!0,dragMomentum:!1,dragElastic:0,dragTransition:{bounceStiffness:600,bounceDamping:20},dragConstraints:{top:-200,left:-200,right:200,bottom:0},whileDrag:{scale:1.1},initial:{x:s,y:0},animate:B,className:"cursor-move"},m)},E=c.SocialIcon=function(d){var m=d.icon,s=d.color,p=(0,i.default)(d,v);return g.default.createElement("div",{className:"rounded-full p-3 ".concat(s," shadow-lg transition-shadow hover:shadow-xl")},g.default.createElement(m,{className:"h-6 w-6 text-white"}))},a=c.default=A},75546:function(u){function c(t,r,n,i){var e=Object.defineProperty;try{e({},"",{})}catch(l){e=0}u.exports=c=function(b,g,h,v){if(g)e?e(b,g,{value:h,enumerable:!v,configurable:!v,writable:!v}):b[g]=h;else{var x=function(E,a){c(b,E,function(o){return this._invoke(E,a,o)})};x("next",0),x("throw",1),x("return",2)}},u.exports.__esModule=!0,u.exports.default=u.exports,c(t,r,n,i)}u.exports=c,u.exports.__esModule=!0,u.exports.default=u.exports},81988:function(u,c,t){"use strict";"use client";var r=t(24994),n=t(73738);Object.defineProperty(c,"__esModule",{value:!0}),c.default=c.FadeInDiv=void 0;var i=r(t(41132)),e=r(t(85715)),l=h(t(96540)),b=t(21126),g=r(t(71508));function h(E,a){if(typeof WeakMap=="function")var o=new WeakMap,d=new WeakMap;return(h=function(s,p){if(!p&&s&&s.__esModule)return s;var f,y,C={__proto__:null,default:s};if(s===null||n(s)!="object"&&typeof s!="function")return C;if(f=p?d:o){if(f.has(s))return f.get(s);f.set(s,C)}for(var B in s)B!=="default"&&{}.hasOwnProperty.call(s,B)&&((y=(f=Object.defineProperty)&&Object.getOwnPropertyDescriptor(s,B))&&(y.get||y.set)?f(C,B,y):C[B]=s[B]);return C})(E,a)}var v=function(a){var o=a.tabs,d=a.containerClassName,m=a.activeTabClassName,s=a.tabClassName,p=a.contentClassName,f=(0,l.useState)(o[0]),y=(0,e.default)(f,2),C=y[0],B=y[1],T=(0,l.useState)(o),F=(0,e.default)(T,2),S=F[0],_=F[1],w=function(j){var D=(0,i.default)(o),M=D.splice(j,1);D.unshift(M[0]),_(D),B(D[0])},P=(0,l.useState)(!1),W=(0,e.default)(P,2),O=W[0],I=W[1];return l.default.createElement(l.default.Fragment,null,l.default.createElement("div",{className:(0,g.default)("no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-start overflow-auto [perspective:1000px] sm:overflow-visible",d)},o.map(function(R,j){return l.default.createElement("button",{key:R.title,onClick:function(){w(j)},onMouseEnter:function(){return I(!0)},onMouseLeave:function(){return I(!1)},className:(0,g.default)("relative rounded-full px-4 py-2",s),style:{transformStyle:"preserve-3d"}},C.value===R.value&&l.default.createElement(b.motion.div,{layoutId:"clickedButton",transition:{type:"spring",bounce:.3,duration:.6},className:(0,g.default)("absolute inset-0 rounded-full bg-gray-200 dark:bg-zinc-800",m)}),l.default.createElement("span",{className:"relative block text-black dark:text-white"},R.title))})),l.default.createElement(x,{tabs:S,active:C,key:C.value,hovering:O,className:(0,g.default)("mt-32",p)}))},x=c.FadeInDiv=function(a){var o=a.className,d=a.tabs,m=a.hovering,s=function(f){return f.value===d[0].value};return l.default.createElement("div",{className:"relative h-full w-full"},d.map(function(p,f){return l.default.createElement(b.motion.div,{key:p.value,layoutId:p.value,style:{scale:1-f*.1,top:m?f*-50:0,zIndex:-f,opacity:f<3?1-f*.1:0},animate:{y:s(p)?[0,40,0]:0},className:(0,g.default)("absolute top-0 left-0 h-full w-full",o)},p.content)}))},A=c.default=v}}]);
