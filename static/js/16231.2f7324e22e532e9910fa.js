"use strict";var _e=Object.defineProperty,ce=Object.defineProperties;var fe=Object.getOwnPropertyDescriptors;var ae=Object.getOwnPropertySymbols;var me=Object.prototype.hasOwnProperty,Ee=Object.prototype.propertyIsEnumerable;var le=(M,r,e)=>r in M?_e(M,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):M[r]=e,oe=(M,r)=>{for(var e in r||(r={}))me.call(r,e)&&le(M,e,r[e]);if(ae)for(var e of ae(r))Ee.call(r,e)&&le(M,e,r[e]);return M},se=(M,r)=>ce(M,fe(r));(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[16231],{2899:function(M,r,e){e.r(r);var i=e(85072),s=e.n(i),d=e(97825),t=e.n(d),l=e(77659),c=e.n(l),h=e(55056),A=e.n(h),m=e(10540),E=e.n(m),_=e(41113),o=e.n(_),u=e(60968),n={};n.styleTagTransform=o(),n.setAttributes=A(),n.insert=c().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=E();var a=s()(u.A,n);r.default=u.A&&u.A.locals?u.A.locals:void 0},4692:function(M,r,e){var i=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var s=i(e(96540)),d=i(e(64995)),t=function(h){var A=h.text;return s.default.createElement("span",{className:d.default["package-name"]},A)},l=r.default=t},7742:function(M,r,e){var i=e(24994),s=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var d=i(e(85715)),t=A(e(96540)),l=i(e(32111)),c=i(e(41292));function h(_){if(typeof WeakMap!="function")return null;var o=new WeakMap,u=new WeakMap;return(h=function(a){return a?u:o})(_)}function A(_,o){if(!o&&_&&_.__esModule)return _;if(_===null||s(_)!="object"&&typeof _!="function")return{default:_};var u=h(o);if(u&&u.has(_))return u.get(_);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var f in _)if(f!=="default"&&{}.hasOwnProperty.call(_,f)){var y=a?Object.getOwnPropertyDescriptor(_,f):null;y&&(y.get||y.set)?Object.defineProperty(n,f,y):n[f]=_[f]}return n.default=_,u&&u.set(_,n),n}var m=function(){var o=(0,t.useState)(!1),u=(0,d.default)(o,2),n=u[0],a=u[1],f=(0,t.useRef)(null),y=function(){n?f.current.pause():f.current.play(),a(!n)};return t.default.createElement(t.default.Fragment,null,t.default.createElement("span",{className:l.default.audio,onClick:y},Array.from({length:5},function(){return{id:Math.random()}}).map(function(v,O){return t.default.createElement("span",{key:v.id,style:{"--i":O,"--state":n?"running":"paused"},className:l.default.line})})),t.default.createElement("audio",{src:c.default,ref:f,loop:!0},t.default.createElement("track",{kind:"captions",default:!0})))},E=r.default=m},9503:function(M,r,e){var i=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var s=i(e(57408)),d=r.default=s.default},12041:function(M,r,e){var i=e(24994),s=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var d=c(e(96540)),t=i(e(71508));function l(m){if(typeof WeakMap!="function")return null;var E=new WeakMap,_=new WeakMap;return(l=function(u){return u?_:E})(m)}function c(m,E){if(!E&&m&&m.__esModule)return m;if(m===null||s(m)!="object"&&typeof m!="function")return{default:m};var _=l(E);if(_&&_.has(m))return _.get(m);var o={__proto__:null},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in m)if(n!=="default"&&{}.hasOwnProperty.call(m,n)){var a=u?Object.getOwnPropertyDescriptor(m,n):null;a&&(a.get||a.set)?Object.defineProperty(o,n,a):o[n]=m[n]}return o.default=m,_&&_.set(m,o),o}var h=function(E){var _=E.className,o=E.colors,u=o===void 0?["#8b5cf6","#ec4899","#3b82f6","#10b981"]:o,n=E.particleCount,a=n===void 0?50:n,f=E.trailLength,y=f===void 0?35:f,v=E.decay,O=v===void 0?.03:v,g=E.smoothing,P=g===void 0?.65:g,p=E.containerRef,D=(0,d.useRef)(null),C=(0,d.useRef)([]),S=(0,d.useRef)([]),T=(0,d.useRef)({x:0,y:0}),I=(0,d.useRef)({x:0,y:0}),L=(0,d.useRef)(null),R=(0,d.useRef)(0),K=(0,d.useRef)(0),z=(0,d.useRef)(!0),V=function(H,j,Q){var X=Math.random()*Math.PI*2,B=Math.random()*2+1;return{x:H,y:j,vx:Math.cos(X)*B,vy:Math.sin(X)*B,life:1,color:Q,size:Math.random()*3+1}};return(0,d.useEffect)(function(){var k=D.current,H=(p==null?void 0:p.current)||(k==null?void 0:k.parentElement);if(!(!k||!H)){var j=k.getContext("2d",{alpha:!0});if(j){var Q=function(){var b=window.devicePixelRatio||1,W=H.getBoundingClientRect();k.width=W.width*b,k.height=W.height*b,j.scale(b,b)},X=function(b){var W=H.getBoundingClientRect(),F=b.clientX-W.left,Z=b.clientY-W.top;z.current=F>=0&&F<=W.width&&Z>=0&&Z<=W.height,z.current&&(I.current={x:F,y:Z})},B=function(){z.current=!1},G=function(){if(z.current){var b=performance.now(),W=b-K.current;T.current.x+=(I.current.x-T.current.x)*P,T.current.y+=(I.current.y-T.current.y)*P;var F=C.current[C.current.length-1],Z=F?Math.hypot(T.current.x-F.x,T.current.y-F.y):1/0;if(Z>2||W>16){var ee=u[R.current];C.current.push({x:T.current.x,y:T.current.y,age:0,color:ee});for(var w=0;w<3;w++)S.current.push(V(T.current.x,T.current.y,ee));Z>10&&(R.current=(R.current+1)%u.length),K.current=b,C.current.length>y&&C.current.shift(),S.current.length>a&&(S.current=S.current.slice(-a))}}},U=function(b,W,F,Z){var ee=Math.random()*.5+.5;j.strokeStyle="".concat(Z).concat(Math.floor(ee*255).toString(16).padStart(2,"0")),j.lineWidth=F*.5;for(var w=0;w<4;w++){var te=Math.PI/2*w;j.beginPath(),j.moveTo(b-Math.cos(te)*F,W-Math.sin(te)*F),j.lineTo(b+Math.cos(te)*F,W+Math.sin(te)*F),j.stroke()}},N=function(){j.clearRect(0,0,k.width,k.height),j.globalCompositeOperation="lighter",G(),j.lineCap="round",j.lineJoin="round",j.shadowBlur=15;for(var b=1;b<C.current.length;b++){var W=C.current[b],F=C.current[b-1],Z=Math.max(1-W.age,0),ee=Math.max(4*(1-W.age),0);j.shadowColor=W.color;var w=j.createLinearGradient(F.x,F.y,W.x,W.y),te=Math.max(1-F.age,0);w.addColorStop(0,"".concat(F.color).concat(Math.floor(te*255).toString(16).padStart(2,"0"))),w.addColorStop(1,"".concat(W.color).concat(Math.floor(Z*255).toString(16).padStart(2,"0"))),j.beginPath(),j.strokeStyle=w,j.lineWidth=ee,j.moveTo(F.x,F.y),j.lineTo(W.x,W.y),j.stroke()}j.shadowBlur=0,S.current.forEach(function(J){J.x+=J.vx,J.y+=J.vy,J.vy+=.05,J.life-=.02}),S.current=S.current.filter(function(J){return J.life>0}),C.current.forEach(function(J){J.age+=O}),C.current=C.current.filter(function(J){return J.age<1}),L.current=requestAnimationFrame(N)};return Q(),window.addEventListener("resize",Q),H.addEventListener("mousemove",X),H.addEventListener("mouseleave",B),N(),function(){window.removeEventListener("resize",Q),H.removeEventListener("mousemove",X),H.removeEventListener("mouseleave",B),L.current&&cancelAnimationFrame(L.current)}}}},[u,y,O,P,a,p]),d.default.createElement("div",{className:(0,t.default)("pointer-events-none absolute inset-0",_),style:{width:"100%",height:"100%",zIndex:100}},d.default.createElement("canvas",{ref:D,className:"pointer-events-none absolute inset-0 h-full w-full"}))},A=r.default=h},16231:function(M,r,e){var i=e(24994),s=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var d=a(e(96540)),t=e(33742),l=e(96768),c=i(e(83450)),h=i(e(12041)),A=i(e(90824)),m=i(e(50108)),E=i(e(94378)),_=i(e(80373)),o=i(e(57284)),u=e(2543);function n(v){if(typeof WeakMap!="function")return null;var O=new WeakMap,g=new WeakMap;return(n=function(p){return p?g:O})(v)}function a(v,O){if(!O&&v&&v.__esModule)return v;if(v===null||s(v)!="object"&&typeof v!="function")return{default:v};var g=n(O);if(g&&g.has(v))return g.get(v);var P={__proto__:null},p=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var D in v)if(D!=="default"&&{}.hasOwnProperty.call(v,D)){var C=p?Object.getOwnPropertyDescriptor(v,D):null;C&&(C.get||C.set)?Object.defineProperty(P,D,C):P[D]=v[D]}return P.default=v,g&&g.set(v,P),P}var f=function(){var O=(0,d.useRef)(null);return d.default.createElement(t.Layout,{className:o.default.layout,ref:O},d.default.createElement(c.default,null),d.default.createElement(h.default,{containerRef:O,colors:["#f59e0b","#ec4899","#8b5cf6","#38bdf8","#4ade80"],trailLength:35,particleCount:75,decay:.03,smoothing:.65}),d.default.createElement(l.ProTabProvider,null,d.default.createElement(A.default,null),d.default.createElement(t.Layout,{className:o.default.layout},d.default.createElement(m.default,null,d.default.createElement(_.default,null)),d.default.createElement(E.default,null))))},y=r.default=f},22958:function(M,r,e){var i=e(71354),s=e.n(i),d=e(76314),t=e.n(d),l=t()(s());l.push([M.id,`.pre--hklCp {\r
  white-space: pre-wrap;\r
  word-wrap: break-word;\r
  color: #f00;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateful/ErrorBoundary/index.module.less"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,qBAAqB;EACrB,WAAW;AACb",sourcesContent:[`.pre {\r
  white-space: pre-wrap;\r
  word-wrap: break-word;\r
  color: #f00;\r
}\r
`],sourceRoot:""}]),l.locals={pre:"pre--hklCp"},r.A=l},25194:function(M,r,e){var i=e(71354),s=e.n(i),d=e(76314),t=e.n(d),l=t()(s());l.push([M.id,`.package-name--g_GLz {\r
  color: transparent;\r
  background: linear-gradient(45deg, #ff6347, #ffd700, #32cd32, #1e90ff, #8a2be2);\r
  background-size: 400% 400%;\r
  -webkit-background-clip: text;\r
          background-clip: text;\r
  font-size: 16px;\r
  font-weight: 700;\r
  line-height: 1.1;\r
  animation: gradient-animation--GGfTn 5s ease infinite;\r
  filter: drop-shadow(1px 2px 0 #fff);\r
}\r
\r
@keyframes gradient-animation--GGfTn {\r
  0% {\r
    background-position: 0% 0%;\r
  }\r
\r
  50% {\r
    background-position: 100% 100%;\r
  }\r
\r
  100% {\r
    background-position: 0% 0%;\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/GradientAnimation/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,+EAA+E;EAC/E,0BAA0B;EAC1B,6BAAqB;UAArB,qBAAqB;EACrB,eAAe;EACf,gBAAgB;EAChB,gBAAgB;EAChB,qDAA8C;EAC9C,mCAAmC;AACrC;;AAEA;EACE;IACE,0BAA0B;EAC5B;;EAEA;IACE,8BAA8B;EAChC;;EAEA;IACE,0BAA0B;EAC5B;AACF",sourcesContent:[`.package-name {\r
  color: transparent;\r
  background: linear-gradient(45deg, #ff6347, #ffd700, #32cd32, #1e90ff, #8a2be2);\r
  background-size: 400% 400%;\r
  background-clip: text;\r
  font-size: 16px;\r
  font-weight: 700;\r
  line-height: 1.1;\r
  animation: gradient-animation 5s ease infinite;\r
  filter: drop-shadow(1px 2px 0 #fff);\r
}\r
\r
@keyframes gradient-animation {\r
  0% {\r
    background-position: 0% 0%;\r
  }\r
\r
  50% {\r
    background-position: 100% 100%;\r
  }\r
\r
  100% {\r
    background-position: 0% 0%;\r
  }\r
}\r
`],sourceRoot:""}]),l.locals={"package-name":"package-name--g_GLz",packageName:"package-name--g_GLz","gradient-animation":"gradient-animation--GGfTn",gradientAnimation:"gradient-animation--GGfTn"},r.A=l},32111:function(M,r,e){e.r(r);var i=e(85072),s=e.n(i),d=e(97825),t=e.n(d),l=e(77659),c=e.n(l),h=e(55056),A=e.n(h),m=e(10540),E=e.n(m),_=e(41113),o=e.n(_),u=e(61292),n={};n.styleTagTransform=o(),n.setAttributes=A(),n.insert=c().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=E();var a=s()(u.A,n);r.default=u.A&&u.A.locals?u.A.locals:void 0},37631:function(M,r,e){var i=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=r.RevealLinks=void 0;var s=i(e(96540)),d=e(21126),t=r.RevealLinks=function(){return s.default.createElement("section",{className:"grid place-content-center gap-2"},s.default.createElement(h,{href:"https://github.com/wkylin/pro-react-admin"},"Github"),s.default.createElement(h,{href:"https://medium.com/@wkylin.w"}))},l=.25,c=.025,h=function(E){var _=E.children,o=E.href;return s.default.createElement(d.motion.a,{initial:"initial",whileHover:"hovered",href:o,target:"_blank",className:"relative block overflow-hidden",style:{lineHeight:1.5}},s.default.createElement("div",null,_.split("").map(function(u,n){return s.default.createElement(d.motion.span,{variants:{initial:{y:0},hovered:{y:"-100%"}},transition:{duration:l,ease:"easeInOut",delay:c*n},className:"inline-block",key:n},u)})),s.default.createElement("div",{className:"absolute inset-0"},_.split("").map(function(u,n){return s.default.createElement(d.motion.span,{variants:{initial:{y:"100%"},hovered:{y:0}},transition:{duration:l,ease:"easeInOut",delay:c*n},className:"inline-block",key:n},u)})))},A=r.default=h},39890:function(M,r,e){var i=e(24994),s=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var d=i(e(41132)),t=i(e(85715)),l=u(e(96540)),c=e(84976),h=e(33742),A=e(32389),m=i(e(28652)),E=e(56352),_=i(e(43261));function o(f){if(typeof WeakMap!="function")return null;var y=new WeakMap,v=new WeakMap;return(o=function(g){return g?v:y})(f)}function u(f,y){if(!y&&f&&f.__esModule)return f;if(f===null||s(f)!="object"&&typeof f!="function")return{default:f};var v=o(y);if(v&&v.has(f))return v.get(f);var O={__proto__:null},g=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var P in f)if(P!=="default"&&{}.hasOwnProperty.call(f,P)){var p=g?Object.getOwnPropertyDescriptor(f,P):null;p&&(p.get||p.set)?Object.defineProperty(O,P,p):O[P]=f[P]}return O.default=f,v&&v.set(f,O),O}var n=function(){var y=(0,c.useLocation)(),v=y.pathname,O=(0,c.useNavigate)(),g=(0,l.useState)([]),P=(0,t.default)(g,2),p=P[0],D=P[1],C=(0,A.useTranslation)(),S=C.t;(0,l.useEffect)(function(){var L=(0,E.getRouteList)([],(0,E.getRouteItem)(m.default,v)?[(0,E.getRouteItem)(m.default,v)]:[],v);L.length===0?D([{path:"/",name:"\u9996\u9875",key:"/",i18nKey:"home",isSubMenu:!1},{path:"404",name:"Not Found",key:"/404",i18nKey:"Not Found",isSubMenu:!1}]):D((0,d.default)(L))},[v]);var T=function(R){O(R)},I=function(){return p.map(function(R,K){return{title:K!==p.length-1?l.default.createElement("span",{className:_.default.breadcrumb,key:R.key},R.isSubMenu?l.default.createElement(h.Button,{disabled:!0,type:"link",style:{padding:0}},R.i18nKey?S(R.i18nKey):R.name):l.default.createElement(h.Button,{type:"link",style:{padding:0},onClick:function(){return T(R.key)}},R.i18nKey?S(R.i18nKey):R.name)):l.default.createElement("span",{className:_.default.breadcrumb,key:R.key},R.i18nKey?S(R.i18nKey):R.name),key:R.key}})};return l.default.createElement(h.Breadcrumb,{separator:">",items:I()})},a=r.default=n},40189:function(M,r,e){var i=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var s=i(e(96540)),d=e(33742),t=e(32389),l=function(){var A=(0,t.useTranslation)(),m=A.i18n,E=function(o){m.changeLanguage(o)};return s.default.createElement(d.Space,null,(m.language==="zh-CN"||m.language==="zh")&&s.default.createElement(d.Button,{onClick:function(){return E("en")}},"\u82F1\u6587"),m.language==="en"&&s.default.createElement(d.Button,{onClick:function(){return E("zh")}},"\u4E2D\u6587"))},c=r.default=l},41027:function(M,r,e){e.r(r);var i=e(85072),s=e.n(i),d=e(97825),t=e.n(d),l=e(77659),c=e.n(l),h=e(55056),A=e.n(h),m=e(10540),E=e.n(m),_=e(41113),o=e.n(_),u=e(56262),n={};n.styleTagTransform=o(),n.setAttributes=A(),n.insert=c().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=E();var a=s()(u.A,n);r.default=u.A&&u.A.locals?u.A.locals:void 0},41292:function(M,r,e){M.exports=e.p+"images/2152655c1d61800e86a3.mp3"},41465:function(M,r,e){e.r(r);var i=e(85072),s=e.n(i),d=e(97825),t=e.n(d),l=e(77659),c=e.n(l),h=e(55056),A=e.n(h),m=e(10540),E=e.n(m),_=e(41113),o=e.n(_),u=e(22958),n={};n.styleTagTransform=o(),n.setAttributes=A(),n.insert=c().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=E();var a=s()(u.A,n);r.default=u.A&&u.A.locals?u.A.locals:void 0},41680:function(M,r,e){var i=e(71354),s=e.n(i),d=e(76314),t=e.n(d),l=t()(s());l.push([M.id,`.breadcrumb--f4EjY {\r
  cursor: pointer;\r
  line-height: 56px !important;\r
}\r
`,"",{version:3,sources:["webpack://./src/pages/layout/proContent/breadcrumb/index.module.less"],names:[],mappings:"AAAA;EACE,eAAe;EACf,4BAA4B;AAC9B",sourcesContent:[`.breadcrumb {\r
  cursor: pointer;\r
  line-height: 56px !important;\r
}\r
`],sourceRoot:""}]),l.locals={breadcrumb:"breadcrumb--f4EjY"},r.A=l},43261:function(M,r,e){e.r(r);var i=e(85072),s=e.n(i),d=e(97825),t=e.n(d),l=e(77659),c=e.n(l),h=e(55056),A=e.n(h),m=e(10540),E=e.n(m),_=e(41113),o=e.n(_),u=e(41680),n={};n.styleTagTransform=o(),n.setAttributes=A(),n.insert=c().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=E();var a=s()(u.A,n);r.default=u.A&&u.A.locals?u.A.locals:void 0},43561:function(M,r,e){e.r(r),e.d(r,{customAlphabet:function(){return t},customRandom:function(){return d},nanoid:function(){return l},random:function(){return s},urlAlphabet:function(){return i}});const i="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let s=c=>crypto.getRandomValues(new Uint8Array(c)),d=(c,h,A)=>{let m=(2<<Math.log2(c.length-1))-1,E=-~(1.6*m*h/c.length);return(_=h)=>{let o="";for(;;){let u=A(E),n=E|0;for(;n--;)if(o+=c[u[n]&m]||"",o.length>=_)return o}}},t=(c,h=21)=>d(c,h|0,s),l=(c=21)=>{let h="",A=crypto.getRandomValues(new Uint8Array(c|=0));for(;c--;)h+=i[A[c]&63];return h}},43813:function(M,r,e){var i=e(71354),s=e.n(i),d=e(76314),t=e.n(d),l=t()(s());l.push([M.id,`.layout--keqwg {\r
  height: 100%;\r
  overflow: hidden;\r
}\r
`,"",{version:3,sources:["webpack://./src/pages/layout/index.module.less"],names:[],mappings:"AAAA;EACE,YAAY;EACZ,gBAAgB;AAClB",sourcesContent:[`.layout {\r
  height: 100%;\r
  overflow: hidden;\r
}\r
`],sourceRoot:""}]),l.locals={layout:"layout--keqwg"},r.A=l},44026:function(M,r,e){e.r(r),e.d(r,{default:function(){return n},useStickyBox:function(){return o}});var i=e(96540),s=e(74848),d=a=>{let f=a;for(;f=f.parentElement;){const y=getComputedStyle(f,null).getPropertyValue("overflow-y");if(f===document.body)return window;if(y==="auto"||y==="scroll"||y==="overlay")return f}return window},t=a=>a.firstChild?a.firstChild.offsetParent===a:!0,l=(a,f)=>{let y=a,v=0;t(f)||(v+=a.offsetTop-f.offsetTop,f=a.offsetParent,v+=-a.offsetTop);do v+=y.offsetTop,y=y.offsetParent;while(y&&y!==f);return v},c=a=>{let f=a.parentElement;for(;f&&getComputedStyle(f,null).getPropertyValue("display")==="contents";)f=f.parentElement;return f||window},h=null;typeof CSS!="undefined"&&CSS.supports&&(CSS.supports("position","sticky")?h="sticky":CSS.supports("position","-webkit-sticky")&&(h="-webkit-sticky"));var A=!1;try{const a=Object.defineProperty({},"passive",{get(){A={passive:!0}}}),f=()=>{};window.addEventListener("testPassive",f,a),window.removeEventListener("testPassive",f,a)}catch(a){}var m=a=>{const{el:f,onChange:y,unsubs:v,measure:O}=a;if(f===window){const g=()=>({top:0,left:0,height:window.innerHeight,width:window.innerWidth}),P=O(g()),p=()=>{Object.assign(P,O(g())),y()};return window.addEventListener("resize",p,A),v.push(()=>window.removeEventListener("resize",p)),P}else{const g=O(f.getBoundingClientRect()),P=()=>{Object.assign(g,O(f.getBoundingClientRect())),y()},p=new ResizeObserver(P);return p.observe(f),v.push(()=>p.disconnect()),g}},E=a=>{const f=getComputedStyle(a,null),y=parseInt(f.getPropertyValue("padding-top"),10),v=parseInt(f.getPropertyValue("padding-bottom"),10);return{top:y,bottom:v}},_=(a,f,y)=>{const{bottom:v,offsetBottom:O,offsetTop:g}=y,P=d(a);let p=!1;const D=()=>{p||requestAnimationFrame(()=>{const B=T();if(B!==H)j(B);else if(B===1&&!v){const{height:G}=L,{height:U}=V;a.style.top=`${G-U-O}px`}else if(B===2){const{height:G,offsetTop:U}=L,{height:N,naturalTop:x}=z,{height:b}=V,W=Math.max(0,U+C+G-(x+b+O));if(v){const F=Math.max(0,N-b-W);a.style.bottom=`${F}px`}else a.style.top=`${W}px`}p=!1}),p=!0};let C=P===window?window.scrollY:P.scrollTop;const S=B=>{const{offsetTop:G,height:U}=L,{naturalTop:N}=z,{height:x}=V;return B+G+U>=N+x+k+O},T=()=>{const{height:B}=L,{height:G}=V;return G+g+O<=B?3:S(C)?1:2},I=P!==window&&t(P),L=m({el:P,onChange:D,unsubs:f,measure:({height:B,top:G})=>({height:B,offsetTop:I?G:0})}),R=c(a),K=R===window?{top:0,bottom:0}:E(R),z=m({el:R,onChange:D,unsubs:f,measure:({height:B})=>({height:B-K.top-K.bottom,naturalTop:R===window?0:l(R,P)+K.top+L.offsetTop})}),V=m({el:a,onChange:D,unsubs:f,measure:({height:B})=>({height:B})});let k=0,H=T();const j=B=>{const G=H;if(H=B,G===2&&(k=-1),B===3){a.style.position=h,v?a.style.bottom=`${O}px`:a.style.top=`${g}px`;return}const{height:U,offsetTop:N}=L,{height:x,naturalTop:b}=z,{height:W}=V;if(B===2)if(a.style.position="relative",k=G===0?Math.max(0,N+C-b+g):Math.max(0,N+C+U-(b+W+O)),v){const F=Math.max(0,x-W-k);a.style.bottom=`${F}px`}else a.style.top=`${k}px`;else a.style.position=h,B===1?v?a.style.bottom=`${O}px`:a.style.top=`${U-W-O}px`:v?a.style.bottom=`${U-W-O}px`:a.style.top=`${g}px`};j(H);const Q=B=>{if(B===C)return;const G=B-C;if(C=B,H===3)return;const{offsetTop:U,height:N}=L,{naturalTop:x,height:b}=z,{height:W}=V;if(G>0)if(H===0){if(B+U+g>x){const F=Math.max(0,U+C-x+g);B+U+N<=x+W+F+O?j(2):j(1)}}else H===2&&S(B)&&j(1);else if(H===1){if(U+B+N<x+b+O){const F=Math.max(0,U+C+N-(x+W+O));U+B+g>=x+F?j(2):j(0)}}else H===2&&U+B+g<x+k&&j(0)},X=P===window?()=>Q(window.scrollY):()=>Q(P.scrollTop);P.addEventListener("scroll",X,A),P.addEventListener("mousewheel",X,A),f.push(()=>P.removeEventListener("scroll",X),()=>P.removeEventListener("mousewheel",X))},o=({offsetTop:a=0,offsetBottom:f=0,bottom:y=!1}={})=>{const[v,O]=(0,i.useState)(null);return(0,i.useEffect)(()=>{if(!v||!h)return;const g=[];return _(v,g,{offsetBottom:f,offsetTop:a,bottom:y}),()=>{g.forEach(P=>P())}},[v,f,a,y]),O},u=a=>{const{offsetTop:f,offsetBottom:y,bottom:v,children:O,className:g,style:P}=a,p=o({offsetTop:f,offsetBottom:y,bottom:v});return(0,s.jsx)("div",{className:g,style:P,ref:p,children:O})},n=u},45041:function(M,r,e){e.r(r);const i=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],s=(()=>{if(typeof document=="undefined")return!1;const l=i[0],c={};for(const h of i)if((h==null?void 0:h[1])in document){for(const[m,E]of h.entries())c[l[m]]=E;return c}return!1})(),d={change:s.fullscreenchange,error:s.fullscreenerror};let t={request(l=document.documentElement,c){return new Promise((h,A)=>{const m=()=>{t.off("change",m),h()};t.on("change",m);const E=l[s.requestFullscreen](c);E instanceof Promise&&E.then(m).catch(A)})},exit(){return new Promise((l,c)=>{if(!t.isFullscreen){l();return}const h=()=>{t.off("change",h),l()};t.on("change",h);const A=document[s.exitFullscreen]();A instanceof Promise&&A.then(h).catch(c)})},toggle(l,c){return t.isFullscreen?t.exit():t.request(l,c)},onchange(l){t.on("change",l)},onerror(l){t.on("error",l)},on(l,c){const h=d[l];h&&document.addEventListener(h,c,!1)},off(l,c){const h=d[l];h&&document.removeEventListener(h,c,!1)},raw:s};Object.defineProperties(t,{isFullscreen:{get:()=>!!document[s.fullscreenElement]},element:{enumerable:!0,get:()=>{var l;return(l=document[s.fullscreenElement])!=null?l:void 0}},isEnabled:{enumerable:!0,get:()=>!!document[s.fullscreenEnabled]}}),s||(t={isEnabled:!1}),r.default=t},47007:function(M,r,e){var i=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var s=i(e(96540)),d=e(33742),t=e(43160),l=e(84976),c=i(e(37631)),h=function(){var E=(0,l.useNavigate)(),_=function(n){E(n)},o=function(){window.open("https://skyline.github.com/wkylin/".concat(new Date().getFullYear()-1),"_blank")};return s.default.createElement(s.default.Fragment,null,s.default.createElement(d.Space,null,s.default.createElement(d.Button,{type:"link",icon:s.default.createElement(t.CodeOutlined,null),onClick:function(){return _("dashboard")}},"\u591A\u8DEF\u7531\u8BBE\u7F6E"),s.default.createElement(c.default,{href:"https://skyline.github.com/wkylin/".concat(new Date().getFullYear()-1)},"SkyLine")))},A=r.default=h},47665:function(M,r,e){e.r(r),e.d(r,{ErrorBoundary:function(){return t},ErrorBoundaryContext:function(){return s},useErrorBoundary:function(){return h},withErrorBoundary:function(){return A}});var i=e(96540);const s=(0,i.createContext)(null),d={didCatch:!1,error:null};class t extends i.Component{constructor(E){super(E),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=d}static getDerivedStateFromError(E){return{didCatch:!0,error:E}}resetErrorBoundary(){const{error:E}=this.state;if(E!==null){for(var _,o,u=arguments.length,n=new Array(u),a=0;a<u;a++)n[a]=arguments[a];(_=(o=this.props).onReset)===null||_===void 0||_.call(o,{args:n,reason:"imperative-api"}),this.setState(d)}}componentDidCatch(E,_){var o,u;(o=(u=this.props).onError)===null||o===void 0||o.call(u,E,_)}componentDidUpdate(E,_){const{didCatch:o}=this.state,{resetKeys:u}=this.props;if(o&&_.error!==null&&l(E.resetKeys,u)){var n,a;(n=(a=this.props).onReset)===null||n===void 0||n.call(a,{next:u,prev:E.resetKeys,reason:"keys"}),this.setState(d)}}render(){const{children:E,fallbackRender:_,FallbackComponent:o,fallback:u}=this.props,{didCatch:n,error:a}=this.state;let f=E;if(n){const y={error:a,resetErrorBoundary:this.resetErrorBoundary};if(typeof _=="function")f=_(y);else if(o)f=(0,i.createElement)(o,y);else if(u!==void 0)f=u;else throw a}return(0,i.createElement)(s.Provider,{value:{didCatch:n,error:a,resetErrorBoundary:this.resetErrorBoundary}},f)}}function l(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return m.length!==E.length||m.some((_,o)=>!Object.is(_,E[o]))}function c(m){if(m==null||typeof m.didCatch!="boolean"||typeof m.resetErrorBoundary!="function")throw new Error("ErrorBoundaryContext not found")}function h(){const m=(0,i.useContext)(s);c(m);const[E,_]=(0,i.useState)({error:null,hasError:!1}),o=(0,i.useMemo)(()=>({resetBoundary:()=>{m.resetErrorBoundary(),_({error:null,hasError:!1})},showBoundary:u=>_({error:u,hasError:!0})}),[m.resetErrorBoundary]);if(E.hasError)throw E.error;return o}function A(m,E){const _=(0,i.forwardRef)((u,n)=>(0,i.createElement)(t,E,(0,i.createElement)(m,se(oe({},u),{ref:n})))),o=m.displayName||m.name||"Unknown";return _.displayName="withErrorBoundary(".concat(o,")"),_}},50108:function(M,r,e){var i=e(24994),s=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var d=i(e(85715)),t=m(e(96540)),l=e(33742),c=e(43160),h=i(e(63342));function A(o){if(typeof WeakMap!="function")return null;var u=new WeakMap,n=new WeakMap;return(A=function(f){return f?n:u})(o)}function m(o,u){if(!u&&o&&o.__esModule)return o;if(o===null||s(o)!="object"&&typeof o!="function")return{default:o};var n=A(u);if(n&&n.has(o))return n.get(o);var a={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var y in o)if(y!=="default"&&{}.hasOwnProperty.call(o,y)){var v=f?Object.getOwnPropertyDescriptor(o,y):null;v&&(v.get||v.set)?Object.defineProperty(a,y,v):a[y]=o[y]}return a.default=o,n&&n.set(o,a),a}var E=function(u){var n=u.children,a=(0,t.useState)(!1),f=(0,d.default)(a,2),y=f[0],v=f[1],O=function(){v(!y)};return t.default.createElement(l.Layout.Sider,{width:208,collapsedWidth:80,theme:"light",collapsible:!0,collapsed:y,trigger:null,className:h.default.sider},n,t.default.createElement("div",{className:h.default.proLink,onClick:O,role:"button"},y?t.default.createElement(c.MenuUnfoldOutlined,{style:{fontSize:"16px",color:"#08c",cursor:"pointer"}}):t.default.createElement(c.MenuFoldOutlined,{style:{fontSize:"18px",color:"#08c",cursor:"pointer"}})))},_=r.default=E},51e3:function(M,r,e){var i=e(71354),s=e.n(i),d=e(76314),t=e.n(d),l=t()(s());l.push([M.id,`.star--i42Qk {
  width: 20px;
  position: absolute;
  z-index: 99;
  aspect-ratio: 1;
  background: #f8ca00;
  clip-path: polygon(
    50% 0,
    calc(50% * (1 + sin(0.4turn))) calc(50% * (1 - cos(0.4turn))),
    calc(50% * (1 - sin(0.2turn))) calc(50% * (1 - cos(0.2turn))),
    calc(50% * (1 + sin(0.2turn))) calc(50% * (1 - cos(0.2turn))),
    calc(50% * (1 - sin(0.4turn))) calc(50% * (1 - cos(0.4turn)))
  );
}
`,"",{version:3,sources:["webpack://./src/components/stateless/PointerMove/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,kBAAkB;EAClB,WAAW;EACX,eAAe;EACf,mBAAmB;EACnB;;;;;;GAMC;AACH",sourcesContent:[`.star {
  width: 20px;
  position: absolute;
  z-index: 99;
  aspect-ratio: 1;
  background: #f8ca00;
  clip-path: polygon(
    50% 0,
    calc(50% * (1 + sin(0.4turn))) calc(50% * (1 - cos(0.4turn))),
    calc(50% * (1 - sin(0.2turn))) calc(50% * (1 - cos(0.2turn))),
    calc(50% * (1 + sin(0.2turn))) calc(50% * (1 - cos(0.2turn))),
    calc(50% * (1 - sin(0.4turn))) calc(50% * (1 - cos(0.4turn)))
  );
}
`],sourceRoot:""}]),l.locals={star:"star--i42Qk"},r.A=l},51004:function(M,r,e){var i=e(24994),s=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var d=i(e(85715)),t=c(e(96540));function l(m){if(typeof WeakMap!="function")return null;var E=new WeakMap,_=new WeakMap;return(l=function(u){return u?_:E})(m)}function c(m,E){if(!E&&m&&m.__esModule)return m;if(m===null||s(m)!="object"&&typeof m!="function")return{default:m};var _=l(E);if(_&&_.has(m))return _.get(m);var o={__proto__:null},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in m)if(n!=="default"&&{}.hasOwnProperty.call(m,n)){var a=u?Object.getOwnPropertyDescriptor(m,n):null;a&&(a.get||a.set)?Object.defineProperty(o,n,a):o[n]=m[n]}return o.default=m,_&&_.set(m,o),o}var h=function(){var E=(0,t.useState)("00"),_=(0,d.default)(E,2),o=_[0],u=_[1],n=(0,t.useState)("00"),a=(0,d.default)(n,2),f=a[0],y=a[1],v=(0,t.useState)("00"),O=(0,d.default)(v,2),g=O[0],P=O[1],p=(0,t.useState)("AM"),D=(0,d.default)(p,2),C=D[0],S=D[1];return(0,t.useEffect)(function(){var T=function(){var R=new Date,K=R.getHours(),z=R.getMinutes(),V=R.getSeconds();u("".concat(K<10?"0":"").concat(K>12?K-12:K)),y("".concat(z<10?"0":"").concat(z)),P("".concat(V<10?"0":"").concat(V)),S(K<12?"AM":"PM")};T();var I=setInterval(T,1e3);return function(){return clearInterval(I)}},[]),t.default.createElement("div",{className:"flex items-center justify-center"},t.default.createElement("div",{className:"flex items-center justify-center pr-[10px]"},t.default.createElement("span",{className:"text-center text-4xl font-bold"},o,t.default.createElement("span",{className:"font-mono text-4xl font-bold"},":")),t.default.createElement("span",{className:"text-center text-4xl font-bold"},f,t.default.createElement("span",{className:"font-mono text-4xl font-bold"},":")),t.default.createElement("span",{className:"text-center text-4xl font-bold"},g),t.default.createElement("span",{className:"mt-5 ml-3 font-sans text-xl font-bold"},C)))},A=r.default=h},56262:function(M,r,e){var i=e(71354),s=e.n(i),d=e(76314),t=e.n(d),l=t()(s());l.push([M.id,`.header--dEE7d {\r
  padding: 0;\r
  display: flex;\r
  align-items: center;\r
}\r
\r
.logo--YMxnJ {\r
  flex: 0 1 208px;\r
  text-align: center;\r
  cursor: pointer;\r
}\r
\r
.headerMeta--COVbx {\r
  flex: 1 1;\r
  display: flex;\r
}\r
\r
.headerRight--Egiwc {\r
  flex: 1 1;\r
  text-align: right;\r
  padding-right: 10px;\r
}\r
`,"",{version:3,sources:["webpack://./src/pages/layout/proHeader/index.module.less"],names:[],mappings:"AAAA;EACE,UAAU;EACV,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,SAAO;EACP,aAAa;AACf;;AAEA;EACE,SAAO;EACP,iBAAiB;EACjB,mBAAmB;AACrB",sourcesContent:[`.header {\r
  padding: 0;\r
  display: flex;\r
  align-items: center;\r
}\r
\r
.logo {\r
  flex: 0 1 208px;\r
  text-align: center;\r
  cursor: pointer;\r
}\r
\r
.headerMeta {\r
  flex: 1;\r
  display: flex;\r
}\r
\r
.headerRight {\r
  flex: 1;\r
  text-align: right;\r
  padding-right: 10px;\r
}\r
`],sourceRoot:""}]),l.locals={header:"header--dEE7d",logo:"logo--YMxnJ",headerMeta:"headerMeta--COVbx",headerRight:"headerRight--Egiwc"},r.A=l},56352:function(M,r){Object.defineProperty(r,"__esModule",{value:!0}),r.getRouteList=r.getRouteItem=void 0;var e=r.getRouteItem=function(d,t){var l;return Array.isArray(d)&&(l=d.find(function(c){return c.key===t||e(c.children,t)})),l},i=r.getRouteList=function(d,t,l){return Array.isArray(t)&&t.forEach(function(c){c.key===l?d.push({path:c.path,key:c.key,name:c.name,isSubMenu:c.isSubMenu,i18nKey:c.i18nKey}):(d.push({path:c.path,key:c.key,name:c.name,isSubMenu:c.isSubMenu,i18nKey:c.i18nKey}),i(d,e(c.children,l)?[e(c.children,l)]:[],l))}),d}},57284:function(M,r,e){e.r(r);var i=e(85072),s=e.n(i),d=e(97825),t=e.n(d),l=e(77659),c=e.n(l),h=e(55056),A=e.n(h),m=e(10540),E=e.n(m),_=e(41113),o=e.n(_),u=e(43813),n={};n.styleTagTransform=o(),n.setAttributes=A(),n.insert=c().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=E();var a=s()(u.A,n);r.default=u.A&&u.A.locals?u.A.locals:void 0},57408:function(M,r,e){var i=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var s=i(e(96540)),d=e(33742),t=e(47665),l=i(e(41465)),c=function(E){var _=E.error,o=E.resetErrorBoundary;return s.default.createElement("div",{role:"alert"},s.default.createElement("h3",null,"Something went wrong:"),s.default.createElement("pre",{className:l.default.pre},_.message),s.default.createElement(d.Button,{type:"primary",onClick:o},"Try again"))},h=function(E){return s.default.createElement(t.ErrorBoundary,{FallbackComponent:c,onReset:function(){E.fixError&&E.fixError()}},E.children)},A=r.default=h},60968:function(M,r,e){var i=e(71354),s=e.n(i),d=e(76314),t=e.n(d),l=t()(s());l.push([M.id,`.layout--rgXIe {\r
  height: 100%;\r
  overflow: hidden;\r
}\r
\r
.flexContent--FQmm2 {\r
  height: 100%;\r
  width: 100%;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
`,"",{version:3,sources:["webpack://./src/pages/layout/proContent/index.module.less"],names:[],mappings:"AAAA;EACE,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB",sourcesContent:[`.layout {\r
  height: 100%;\r
  overflow: hidden;\r
}\r
\r
.flexContent {\r
  height: 100%;\r
  width: 100%;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
`],sourceRoot:""}]),l.locals={layout:"layout--rgXIe",flexContent:"flexContent--FQmm2"},r.A=l},61292:function(M,r,e){var i=e(71354),s=e.n(i),d=e(76314),t=e.n(d),l=t()(s());l.push([M.id,`.audio--nznS4 {\r
  --i: 0;\r
  --state: paused;\r
\r
  display: flex;\r
  flex-direction: row;\r
  justify-content: center;\r
  align-items: center;\r
  width: 100%;\r
  cursor: pointer;\r
  z-index: 3;\r
  position: relative;\r
\r
  .line--UfMmJ {\r
    background: #00ff7f;\r
    animation: play--h49hu 1s ease infinite;\r
    animation-delay: calc(var(--i) * 0.1s);\r
    animation-play-state: var(--state);\r
    height: 10px;\r
    width: 2px;\r
    margin: 0 1px;\r
  }\r
}\r
\r
@keyframes play--h49hu {\r
  0% {\r
    transform: scaleY(1);\r
  }\r
\r
  50% {\r
    transform: scaleY(1.5);\r
  }\r
\r
  100% {\r
    transform: scaleY(1);\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/SoundBar/index.module.less"],names:[],mappings:"AAAA;EACE,MAAM;EACN,eAAe;;EAEf,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,UAAU;EACV,kBAAkB;;EAElB;IACE,mBAAmB;IACnB,uCAAgC;IAChC,sCAAsC;IACtC,kCAAkC;IAClC,YAAY;IACZ,UAAU;IACV,aAAa;EACf;AACF;;AAEA;EACE;IACE,oBAAoB;EACtB;;EAEA;IACE,sBAAsB;EACxB;;EAEA;IACE,oBAAoB;EACtB;AACF",sourcesContent:[`.audio {\r
  --i: 0;\r
  --state: paused;\r
\r
  display: flex;\r
  flex-direction: row;\r
  justify-content: center;\r
  align-items: center;\r
  width: 100%;\r
  cursor: pointer;\r
  z-index: 3;\r
  position: relative;\r
\r
  .line {\r
    background: #00ff7f;\r
    animation: play 1s ease infinite;\r
    animation-delay: calc(var(--i) * 0.1s);\r
    animation-play-state: var(--state);\r
    height: 10px;\r
    width: 2px;\r
    margin: 0 1px;\r
  }\r
}\r
\r
@keyframes play {\r
  0% {\r
    transform: scaleY(1);\r
  }\r
\r
  50% {\r
    transform: scaleY(1.5);\r
  }\r
\r
  100% {\r
    transform: scaleY(1);\r
  }\r
}\r
`],sourceRoot:""}]),l.locals={audio:"audio--nznS4",play:"play--h49hu",line:"line--UfMmJ"},r.A=l},63342:function(M,r,e){e.r(r);var i=e(85072),s=e.n(i),d=e(97825),t=e.n(d),l=e(77659),c=e.n(l),h=e(55056),A=e.n(h),m=e(10540),E=e.n(m),_=e(41113),o=e.n(_),u=e(79074),n={};n.styleTagTransform=o(),n.setAttributes=A(),n.insert=c().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=E();var a=s()(u.A,n);r.default=u.A&&u.A.locals?u.A.locals:void 0},63770:function(M,r,e){e.r(r);var i=e(85072),s=e.n(i),d=e(97825),t=e.n(d),l=e(77659),c=e.n(l),h=e(55056),A=e.n(h),m=e(10540),E=e.n(m),_=e(41113),o=e.n(_),u=e(85283),n={};n.styleTagTransform=o(),n.setAttributes=A(),n.insert=c().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=E();var a=s()(u.A,n);r.default=u.A&&u.A.locals?u.A.locals:void 0},64995:function(M,r,e){e.r(r);var i=e(85072),s=e.n(i),d=e(97825),t=e.n(d),l=e(77659),c=e.n(l),h=e(55056),A=e.n(h),m=e(10540),E=e.n(m),_=e(41113),o=e.n(_),u=e(25194),n={};n.styleTagTransform=o(),n.setAttributes=A(),n.insert=c().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=E();var a=s()(u.A,n);r.default=u.A&&u.A.locals?u.A.locals:void 0},75745:function(M,r,e){e.r(r);var i=e(85072),s=e.n(i),d=e(97825),t=e.n(d),l=e(77659),c=e.n(l),h=e(55056),A=e.n(h),m=e(10540),E=e.n(m),_=e(41113),o=e.n(_),u=e(51e3),n={};n.styleTagTransform=o(),n.setAttributes=A(),n.insert=c().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=E();var a=s()(u.A,n);r.default=u.A&&u.A.locals?u.A.locals:void 0},76623:function(M,r,e){var i=e(24994),s=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var d=i(e(85715)),t=m(e(96540)),l=i(e(45041)),c=e(33742),h=e(43160);function A(o){if(typeof WeakMap!="function")return null;var u=new WeakMap,n=new WeakMap;return(A=function(f){return f?n:u})(o)}function m(o,u){if(!u&&o&&o.__esModule)return o;if(o===null||s(o)!="object"&&typeof o!="function")return{default:o};var n=A(u);if(n&&n.has(o))return n.get(o);var a={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var y in o)if(y!=="default"&&{}.hasOwnProperty.call(o,y)){var v=f?Object.getOwnPropertyDescriptor(o,y):null;v&&(v.get||v.set)?Object.defineProperty(a,y,v):a[y]=o[y]}return a.default=o,n&&n.set(o,a),a}var E=function(u){var n=u.ele,a=u.tips,f=a===void 0?"\u5168\u5C4F":a,y=u.placement,v=y===void 0?"bottom":y,O=(0,t.useState)(!1),g=(0,d.default)(O,2),P=g[0],p=g[1];(0,t.useEffect)(function(){l.default.on("change",function(){l.default.isFullscreen?p(!0):p(!1)})},[]);var D=function(){l.default.isEnabled||c.message.warning("\u5F53\u524D\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u5168\u5C4F");var S=document.querySelector(n)||void 0;l.default.toggle(S)};return t.default.createElement(c.Tooltip,{placement:v,title:f},t.default.createElement(c.Space,{style:{cursor:"pointer"},onClick:D},P?t.default.createElement(h.FullscreenExitOutlined,{style:{fontSize:16}}):t.default.createElement(h.FullscreenOutlined,{style:{fontSize:16}})))},_=r.default=E},77847:function(M,r,e){var i=e(24994),s=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var d=i(e(41132)),t=i(e(94634)),l=i(e(85715)),c=v(e(96540)),h=e(84976),A=e(33742),m=i(e(44026)),E=e(43160),_=i(e(9503)),o=e(43561),u=e(32389),n=e(96768),a=i(e(40830)),f=i(e(76623));function y(P){if(typeof WeakMap!="function")return null;var p=new WeakMap,D=new WeakMap;return(y=function(S){return S?D:p})(P)}function v(P,p){if(!p&&P&&P.__esModule)return P;if(P===null||s(P)!="object"&&typeof P!="function")return{default:P};var D=y(p);if(D&&D.has(P))return D.get(P);var C={__proto__:null},S=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var T in P)if(T!=="default"&&{}.hasOwnProperty.call(P,T)){var I=S?Object.getOwnPropertyDescriptor(P,T):null;I&&(I.get||I.set)?Object.defineProperty(C,T,I):C[T]=P[T]}return C.default=P,D&&D.set(P,C),C}var O=function(p){var D=(0,n.useProTabContext)(),C=D.activeKey,S=D.setActiveKey,T=D.panes,I=D.setPanes,L=D.removeTab,R=(0,c.useState)(!1),K=(0,l.default)(R,2),z=K[0],V=K[1],k=(0,c.useRef)(""),H=(0,h.useNavigate)(),j=(0,u.useTranslation)(),Q=j.t,X=p.panesItem,B=p.tabActiveKey,G=(0,h.useLocation)(),U=G.pathname,N=G.search,x=U+N,b=A.theme.useToken(),W=b.token.colorBgContainer,F=function($,q){return c.default.createElement(m.default,{offsetTop:0,style:{zIndex:10}},c.default.createElement(q,(0,t.default)({key:(0,o.nanoid)()},$,{className:"pro-tabs",style:{background:W}})))};(0,c.useEffect)(function(){document.querySelector("#container").scrollTo({top:0,left:0,behavior:"smooth"})},[U]),(0,c.useEffect)(function(){var Y=U+N;if(!(!X.path||X.path===k.current)){k.current=Y;var $=T.findIndex(function(q){return q.key===X.key});if(S(B),!(!X.key||$>-1&&Y===T[$].path)){if($>-1){T[$].path=Y,I(T);return}I([].concat((0,d.default)(T),[X]))}}},[U,B]);var Z=function($){S($)},ee=function($){var q=T.filter(function(re){return re.key===$})[0].path;H(q)},w=function($){var q=$.direction},te=function($,q){q==="remove"&&L($)},J=function(){V(!0),setTimeout(function(){V(!1)},1e3)},ue=function($){if($==="all"){var q=T.filter(function(ne){return ne.key==="/"});I(q),H("/"),S("/")}if($==="other"){var re=T.filter(function(ne){return ne.key==="/"||ne.key===C});I(re)}},de=[{label:"\u5173\u95ED\u5176\u4ED6",key:"other"},{label:"\u5168\u90E8\u5173\u95ED",key:"all"}],ie=function(){J()};return c.default.createElement(A.Tabs,{hideAdd:!0,type:"editable-card",onChange:Z,onTabClick:ee,onTabScroll:w,onEdit:te,renderTabBar:F,className:"layout-container",id:"container",tabBarStyle:{zIndex:2,marginBottom:0},activeKey:C,destroyInactiveTabPane:!1,tabBarExtraContent:{left:c.default.createElement(A.Space,{align:"center",size:30,style:{margin:"0 25px"}},c.default.createElement(E.FireOutlined,{style:{color:"#eb2f96",fontSize:16}})),right:c.default.createElement(c.default.Fragment,null,c.default.createElement(A.Space,{style:{padding:"0 5px"}},c.default.createElement(f.default,{ele:"#fullScreenContent",placement:"left",tips:"\u4E3B\u5185\u5BB9\u5168\u5C4F"})),T.length>2?c.default.createElement(A.Dropdown,{menu:{items:de,onClick:function($){var q=$.key;ue(q)}},trigger:["hover"]},c.default.createElement(A.Button,{type:"link"},"More ",c.default.createElement(E.DownOutlined,null))):null)},items:T.map(function(Y){return{label:c.default.createElement(c.default.Fragment,null,Y.key===x&&Y.key!=="/404"&&c.default.createElement(E.SyncOutlined,{style:{padding:"0 5px"},onClick:J,title:"\u5237\u65B0",spin:z}),Y.i18nKey?Q(Y.i18nKey):Y.title),key:Y.key,closable:Y.closable,forceRender:!0,children:c.default.createElement(_.default,{fixError:ie},c.default.createElement("div",{className:"layout-tabpanel"},z&&Y.key===x&&Y.key!=="/404"?c.default.createElement(a.default,{tip:"\u5237\u65B0\u4E2D..."}):c.default.createElement(c.default.Fragment,null,Y.content)))}})})},g=r.default=O},79074:function(M,r,e){var i=e(71354),s=e.n(i),d=e(76314),t=e.n(d),l=t()(s());l.push([M.id,`.sider--zXPQj {\r
  height: 100%;\r
}\r
\r
.proLink--gTkg9 {\r
  height: 40px;\r
  line-height: 40px;\r
  padding: 0 15px;\r
  margin-bottom: 5px;\r
  cursor: pointer;\r
}\r
`,"",{version:3,sources:["webpack://./src/pages/layout/proSider/index.module.less"],names:[],mappings:"AAAA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;EACf,kBAAkB;EAClB,eAAe;AACjB",sourcesContent:[`.sider {\r
  height: 100%;\r
}\r
\r
.proLink {\r
  height: 40px;\r
  line-height: 40px;\r
  padding: 0 15px;\r
  margin-bottom: 5px;\r
  cursor: pointer;\r
}\r
`],sourceRoot:""}]),l.locals={sider:"sider--zXPQj",proLink:"proLink--gTkg9"},r.A=l},80373:function(M,r,e){var i=e(24994),s=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var d=i(e(85715)),t=_(e(96540)),l=e(33742),c=e(84976),h=e(32389),A=e(43160),m=i(e(63770));function E(a){if(typeof WeakMap!="function")return null;var f=new WeakMap,y=new WeakMap;return(E=function(O){return O?y:f})(a)}function _(a,f){if(!f&&a&&a.__esModule)return a;if(a===null||s(a)!="object"&&typeof a!="function")return{default:a};var y=E(f);if(y&&y.has(a))return y.get(a);var v={__proto__:null},O=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if(g!=="default"&&{}.hasOwnProperty.call(a,g)){var P=O?Object.getOwnPropertyDescriptor(a,g):null;P&&(P.get||P.set)?Object.defineProperty(v,g,P):v[g]=a[g]}return v.default=a,y&&y.set(a,v),v}var o={"/home":["home"],"/coupons/add":["/sub-act","/sub-coupons"],"/coupons/edit":["/sub-act","/sub-coupons"],"/product":["/sub-act","/sub-coupons"]},u=function(){var f=(0,c.useNavigate)(),y=(0,c.useLocation)(),v=y.pathname,O=function(N){f(N)},g=(0,h.useTranslation)(),P=g.t,p=(0,t.useState)(["home"]),D=(0,d.default)(p,2),C=D[0],S=D[1],T=(0,t.useState)(["home"]),I=(0,d.default)(T,2),L=I[0],R=I[1],K=(0,t.useState)(!1),z=(0,d.default)(K,2),V=z[0],k=z[1],H=(0,t.useState)(["/sub-act","/sub-list","/sub-error"]),j=(0,d.default)(H,1),Q=j[0];(0,t.useEffect)(function(){var U,N=v;S([N]),R(V?L:(U=o[v])!==null&&U!==void 0?U:L)},[v,L,V]);var X=function(N){var x=N.find(function(b){return L.indexOf(b)===-1});k(!0),Q.indexOf(x)===-1?R(N):R(x?[x]:[])},B=function(N){var x=N.key;O(x),k(!1)},G=[{label:P("home"),key:"/",icon:t.default.createElement(A.HomeOutlined,null)},{label:P("demo"),key:"/demo",icon:t.default.createElement(A.GlobalOutlined,null)},{label:"Motion",key:"/motion",icon:t.default.createElement(A.QrcodeOutlined,null)},{label:"Business",key:"/business",icon:t.default.createElement(A.FireOutlined,null)},{label:"Sand Box",key:"/sandbox",icon:t.default.createElement(A.GlobalOutlined,null)},{label:"Big Screen",key:"/big-screen",icon:t.default.createElement(A.FireOutlined,null)},{label:"Qr Generate",key:"/qrcode",icon:t.default.createElement(A.QrcodeOutlined,null)},{label:"Prism Render",key:"/prism",icon:t.default.createElement(A.FireOutlined,null)},{label:"React Tilt",key:"/tilt",icon:t.default.createElement(A.QrcodeOutlined,null)},{label:"Music",key:"/music",icon:t.default.createElement(A.FireOutlined,null)},{label:"Crypto",key:"/crypto",icon:t.default.createElement(A.QrcodeOutlined,null)},{label:"Video",key:"/video",icon:t.default.createElement(A.FireOutlined,null)},{label:"Echarts",key:"/echarts",icon:t.default.createElement(A.FireOutlined,null)},{label:"Barcode",key:"/barcode",icon:t.default.createElement(A.FireOutlined,null)},{label:"Parallax",key:"/parallax",icon:t.default.createElement(A.FireOutlined,null)},{label:"Post Message",key:"/postmessage",icon:t.default.createElement(A.FireOutlined,null)},{label:"Geo Chart",key:"/geo",icon:t.default.createElement(A.QrcodeOutlined,null)},{label:"D3 Chart",key:"/d3-chart",icon:t.default.createElement(A.QrcodeOutlined,null)},{label:"PdfView",key:"/pdf-view",icon:t.default.createElement(A.QrcodeOutlined,null)},{label:"Print",key:"/print",icon:t.default.createElement(A.QrcodeOutlined,null)},{label:"\u6280\u672F\u6808",key:"/sub-act",icon:t.default.createElement(A.HeatMapOutlined,null),children:[{label:"\u524D\u7AEF\u6280\u672F\u6808",key:"/sub-coupons",icon:t.default.createElement(A.FireOutlined,null),children:[{label:"Vue",key:"/coupons/add"},{label:"Angular",key:"/coupons/edit"}]},{label:"\u540E\u7AEF\u6280\u672F\u6808",key:"/product",icon:t.default.createElement(A.DeploymentUnitOutlined,null)}]},{label:"\u6784\u5EFA\u5DE5\u5177",key:"/sub-list",icon:t.default.createElement(A.ApartmentOutlined,null),children:[{label:"Webpack",key:"/coupons/list"},{label:"Vite",key:"/order/list"}]},{label:"Error",key:"/sub-error",icon:t.default.createElement(A.QuestionCircleOutlined,null),children:[{label:"ErrorBoundary",key:"/error"}]}];return t.default.createElement(l.Menu,{mode:"inline",defaultSelectedKeys:C,defaultOpenKeys:L,selectedKeys:C,openKeys:L,theme:"light",className:m.default.menu,onOpenChange:X,onSelect:B,items:G})},n=r.default=u},83450:function(M,r,e){var i=e(24994),s=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var d=i(e(85715)),t=A(e(96540)),l=e(21126),c=i(e(75745));function h(_){if(typeof WeakMap!="function")return null;var o=new WeakMap,u=new WeakMap;return(h=function(a){return a?u:o})(_)}function A(_,o){if(!o&&_&&_.__esModule)return _;if(_===null||s(_)!="object"&&typeof _!="function")return{default:_};var u=h(o);if(u&&u.has(_))return u.get(_);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var f in _)if(f!=="default"&&{}.hasOwnProperty.call(_,f)){var y=a?Object.getOwnPropertyDescriptor(_,f):null;y&&(y.get||y.set)?Object.defineProperty(n,f,y):n[f]=_[f]}return n.default=_,u&&u.set(_,n),n}var m=function(){var o=(0,t.useRef)(null),u=(0,t.useState)({x:158,y:18}),n=(0,d.default)(u,2),a=n[0],f=n[1];return(0,t.useEffect)(function(){if(o.current){var y=function(O){var g=O.clientX,P=O.clientY,p=o.current,D=g+(p.offsetLeft+p.offsetWidth),C=P+(p.offsetTop+p.offsetHeight);f({x:D,y:C})};return window.addEventListener("pointermove",y),function(){return window.removeEventListener("pointermove",y)}}},[]),t.default.createElement(l.motion.div,{ref:o,className:c.default.star,animate:{x:a.x,y:a.y,opacity:1},transition:{type:"spring"}})},E=r.default=m},85283:function(M,r,e){var i=e(71354),s=e.n(i),d=e(76314),t=e.n(d),l=t()(s());l.push([M.id,`.menu--PZvWo {\r
  border-right: 0;\r
  height: calc(100% - 40px);\r
  overflow: hidden auto;\r
}\r
`,"",{version:3,sources:["webpack://./src/pages/layout/proSecNav/index.module.less"],names:[],mappings:"AAAA;EACE,eAAe;EACf,yBAAyB;EACzB,qBAAqB;AACvB",sourcesContent:[`.menu {\r
  border-right: 0;\r
  height: calc(100% - 40px);\r
  overflow: hidden auto;\r
}\r
`],sourceRoot:""}]),l.locals={menu:"menu--PZvWo"},r.A=l},90824:function(M,r,e){var i=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var s=i(e(96540)),d=e(33742),t=e(43160),l=e(84976),c=e(23311),h=i(e(40189)),A=i(e(4692)),m=i(e(7742)),E=e(22867),_=i(e(47007)),o=i(e(41027)),u=i(e(76623)),n=function(){var y=(0,l.useNavigate)(),v=function(z){y(z)},O=function(){window.open("https://github.com/wkylin/pro-react-admin","_blank")},g=function(){window.open("https://www.githubwrapped.io/wkylin","_blank")},P=[{key:"1",label:s.default.createElement(d.Space,null,"\u4E2A\u4EBA\u4E2D\u5FC3"),icon:s.default.createElement(t.UserOutlined,null),onClick:function(){v("/profile")}},{key:"2",label:s.default.createElement(d.Space,null,"\u4E2A\u4EBA\u8BBE\u7F6E"),icon:s.default.createElement(t.SmileOutlined,null),onClick:function(){v("/setting")}},{key:"3",label:s.default.createElement(d.Space,null,"\u8054 \u7CFB \u6211"),icon:s.default.createElement(t.SmileOutlined,null),onClick:function(){v("/contact")}},{key:"4",label:s.default.createElement(d.Space,null,"\u9000\u51FA\u767B\u5F55"),icon:s.default.createElement(t.LogoutOutlined,null),onClick:function(){(0,c.removeLocalStorage)("token"),v("/signin")}}],p=(0,E.useProThemeContext)(),D=p.myTheme,C=p.setMyTheme,S=function(){C(D==="light"?"dark":"light")},T=d.theme.useToken(),I=T.token,L=I.colorBgContainer,R=I.colorBorder;return s.default.createElement(d.Layout.Header,{className:o.default.header,style:{background:L,borderBottom:"1px solid ".concat(R)}},s.default.createElement("div",{"aria-hidden":"true",className:o.default.logo,onClick:function(){return v("/")}},s.default.createElement(A.default,{text:"Pro React Admin"})),s.default.createElement("div",{className:o.default.headerMeta},s.default.createElement("div",{className:o.default.headerMenu},s.default.createElement(_.default,null)),s.default.createElement("div",{className:o.default.headerRight},s.default.createElement(d.Space,{direction:"horizontal",style:{cursor:"pointer",paddingRight:8}},s.default.createElement(m.default,null),s.default.createElement(d.Switch,{onClick:S}),s.default.createElement(t.GithubOutlined,{style:{fontSize:16},onClick:O}),s.default.createElement(u.default,null),s.default.createElement(t.GithubOutlined,{style:{fontSize:16},onClick:g}),s.default.createElement(h.default,null)),s.default.createElement(d.Dropdown,{arrow:!0,menu:{items:P}},s.default.createElement(d.Space,null,s.default.createElement("span",{style:{fontSize:18}},"wkylin.w"),s.default.createElement(t.DownOutlined,null))))))},a=r.default=n},94378:function(M,r,e){var i=e(24994),s=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var d=i(e(85715)),t=a(e(96540)),l=e(33742),c=e(84976),h=e(43160),A=e(23311),m=e(96768),E=i(e(51004)),_=i(e(39890)),o=i(e(77847)),u=i(e(2899));function n(P){if(typeof WeakMap!="function")return null;var p=new WeakMap,D=new WeakMap;return(n=function(S){return S?D:p})(P)}function a(P,p){if(!p&&P&&P.__esModule)return P;if(P===null||s(P)!="object"&&typeof P!="function")return{default:P};var D=n(p);if(D&&D.has(P))return D.get(P);var C={__proto__:null},S=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var T in P)if(T!=="default"&&{}.hasOwnProperty.call(P,T)){var I=S?Object.getOwnPropertyDescriptor(P,T):null;I&&(I.get||I.set)?Object.defineProperty(C,T,I):C[T]=P[T]}return C.default=P,D&&D.set(P,C),C}var f=l.Layout.Content,y=l.Layout.Header,v=l.Layout.Footer,O=function(){var p=(0,t.useState)("home"),D=(0,d.default)(p,2),C=D[0],S=D[1],T=(0,m.useProTabContext)(),I=T.activeKey,L=T.panes,R=(0,t.useState)({title:"",content:null,key:"",closable:!1,path:"",i18nKey:""}),K=(0,d.default)(R,2),z=K[0],V=K[1],k=(0,t.useRef)(""),H=(0,c.useLocation)(),j=H.pathname,Q=H.search,X=l.theme.useToken(),B=X.token,G=B.colorBgContainer,U=B.colorBgLayout;return(0,t.useEffect)(function(){var N=(0,A.getKeyName)(j),x=N.tabKey,b=N.title,W=N.element,F=N.i18nKey,Z=Q?j+Q:j;k.current=Z,V({title:b,content:W,key:x,closable:x!=="/",path:Z,i18nKey:F}),S(x)},[j,Q,L,I]),t.default.createElement(l.Layout,{className:u.default.layout,id:"fullScreen"},t.default.createElement(y,{className:"layout-header",style:{background:U}},t.default.createElement("section",{className:"flex items-center justify-between"},t.default.createElement(_.default,null),t.default.createElement(E.default,null))),t.default.createElement(f,{className:"layout-content",id:"fullScreenContent",style:{background:G}},t.default.createElement(o.default,{panesItem:z,tabActiveKey:C})),t.default.createElement(v,{className:"layout-footer"},t.default.createElement(l.FloatButton.BackTop,{target:function(){return document.querySelector("#scrollContainer")}},t.default.createElement(h.VerticalAlignTopOutlined,{style:{fontSize:20}})),t.default.createElement(l.Space,null,"\xA9 ",new Date().getFullYear()," Pro React Admin")))},g=r.default=O},96768:function(M,r,e){var i=e(24994),s=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.useProTabContext=r.ProTabProvider=void 0;var d=i(e(85715)),t=A(e(96540)),l=e(84976),c=i(e(57596));function h(n){if(typeof WeakMap!="function")return null;var a=new WeakMap,f=new WeakMap;return(h=function(v){return v?f:a})(n)}function A(n,a){if(!a&&n&&n.__esModule)return n;if(n===null||s(n)!="object"&&typeof n!="function")return{default:n};var f=h(a);if(f&&f.has(n))return f.get(n);var y={__proto__:null},v=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var O in n)if(O!=="default"&&{}.hasOwnProperty.call(n,O)){var g=v?Object.getOwnPropertyDescriptor(n,O):null;g&&(g.get||g.set)?Object.defineProperty(y,O,g):y[O]=n[O]}return y.default=n,f&&f.set(n,y),y}var m={activeKey:"",setActiveKey:function(){},panes:[],setPanes:function(){},removeTab:function(){}},E=[{title:"\u9996\u9875",i18nKey:"home",key:"/",content:t.default.createElement(c.default,null),closable:!1,path:"/"}],_=(0,t.createContext)(m),o=r.useProTabContext=function(){var a=(0,t.useContext)(_);if(a==null)throw new Error("useValue must be used within a ValueProvider");return a},u=r.ProTabProvider=function(a){var f=a.children,y=(0,t.useState)(""),v=(0,d.default)(y,2),O=v[0],g=v[1],P=(0,t.useState)(E),p=(0,d.default)(P,2),D=p[0],C=p[1],S=(0,l.useNavigate)(),T=(0,t.useCallback)(function(L){var R=arguments.length>1&&arguments[1]!==void 0?arguments[1]:function(){},K=D.findIndex(function(k){return k.key===L}),z=D.filter(function(k){return k.key!==L});if(L!==O)C(z);else{var V=z[K-1].key;S(V),g(V),C(z)}R()},[O,D]),I=(0,t.useMemo)(function(){return{activeKey:O,setActiveKey:g,panes:D,setPanes:C,removeTab:T}},[O,g,D,C,T]);return t.default.createElement(_.Provider,{value:I},f)}}}]);
