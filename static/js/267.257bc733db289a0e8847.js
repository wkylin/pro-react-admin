(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[267],{65548:function(J,e,n){"use strict";var s=n(24994),h=n(73738);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var g=s(n(43693)),o=C(n(96540)),c=n(74848);function R(l){if(typeof WeakMap!="function")return null;var f=new WeakMap,d=new WeakMap;return(R=function(_){return _?d:f})(l)}function C(l,f){if(!f&&l&&l.__esModule)return l;if(l===null||h(l)!="object"&&typeof l!="function")return{default:l};var d=R(f);if(d&&d.has(l))return d.get(l);var y={__proto__:null},_=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var I in l)if(I!=="default"&&{}.hasOwnProperty.call(l,I)){var T=_?Object.getOwnPropertyDescriptor(l,I):null;T&&(T.get||T.set)?Object.defineProperty(y,I,T):y[I]=l[I]}return y.default=l,d&&d.set(l,y),y}function D(l,f){var d=Object.keys(l);if(Object.getOwnPropertySymbols){var y=Object.getOwnPropertySymbols(l);f&&(y=y.filter(function(_){return Object.getOwnPropertyDescriptor(l,_).enumerable})),d.push.apply(d,y)}return d}function u(l){for(var f=1;f<arguments.length;f++){var d=arguments[f]!=null?arguments[f]:{};f%2?D(Object(d),!0).forEach(function(y){(0,g.default)(l,y,d[y])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(d)):D(Object(d)).forEach(function(y){Object.defineProperty(l,y,Object.getOwnPropertyDescriptor(d,y))})}return l}var A=function(f){return(0,c.jsxs)("svg",u(u({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"#fff",viewBox:"0 0 120 30"},f),{},{children:[(0,c.jsxs)("circle",{cx:15,cy:15,r:15,children:[(0,c.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,c.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]}),(0,c.jsxs)("circle",{cx:60,cy:15,r:9,fillOpacity:.3,children:[(0,c.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:9,repeatCount:"indefinite",to:9,values:"9;15;9"}),(0,c.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:.5,repeatCount:"indefinite",to:.5,values:".5;1;.5"})]}),(0,c.jsxs)("circle",{cx:105,cy:15,r:15,children:[(0,c.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,c.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]})]}))},v=e.default=A},34671:function(J,e,n){"use strict";var s=n(71354),h=n.n(s),g=n(76314),o=n.n(g),c=o()(h());c.push([J.id,`.linearWrap--EI336 {
  position: relative;
  overflow: hidden;
  padding: 3px;
}
.line--LijIE {
  position: absolute;
}
.line--LijIE:nth-child(1) {
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, orange);
  animation: animate1--rw6dI 8s linear infinite;
}
@keyframes animate1--rw6dI {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}
.line--LijIE:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, red);
  animation: animate2--uMKrU 8s linear infinite;
  animation-delay: 2s;
}
@keyframes animate2--uMKrU {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}
.line--LijIE:nth-child(3) {
  bottom: 0;
  right: 0;
  width: 100%;
  background: linear-gradient(270deg, transparent, green);
  animation: animate3--dW9XO 8s linear infinite;
  animation-delay: 4s;
}
@keyframes animate3--dW9XO {
  0% {
    right: -100%;
    height: 2px;
  }
  50%,
  100% {
    height: 2px;
    right: 100%;
  }
}
.line--LijIE:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #3a86ff);
  animation: animate4--KPFuY 8s linear infinite;
  animation-delay: 6s;
}
@keyframes animate4--KPFuY {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
`,"",{version:3,sources:["webpack://./src/components/stateless/LinearWrap/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,YAAY;AACd;AACA;EACE,kBAAkB;AACpB;AACA;EACE,MAAM;EACN,OAAO;EACP,WAAW;EACX,WAAW;EACX,uDAAuD;EACvD,6CAAsC;AACxC;AACA;EACE;IACE,WAAW;EACb;EACA;;IAEE,UAAU;EACZ;AACF;AACA;EACE,UAAU;EACV,QAAQ;EACR,UAAU;EACV,YAAY;EACZ,qDAAqD;EACrD,6CAAsC;EACtC,mBAAmB;AACrB;AACA;EACE;IACE,UAAU;EACZ;EACA;;IAEE,SAAS;EACX;AACF;AACA;EACE,SAAS;EACT,QAAQ;EACR,WAAW;EACX,uDAAuD;EACvD,6CAAsC;EACtC,mBAAmB;AACrB;AACA;EACE;IACE,YAAY;IACZ,WAAW;EACb;EACA;;IAEE,WAAW;IACX,WAAW;EACb;AACF;AACA;EACE,aAAa;EACb,OAAO;EACP,UAAU;EACV,YAAY;EACZ,yDAAyD;EACzD,6CAAsC;EACtC,mBAAmB;AACrB;AACA;EACE;IACE,aAAa;EACf;EACA;;IAEE,YAAY;EACd;AACF",sourcesContent:[`.linearWrap {
  position: relative;
  overflow: hidden;
  padding: 3px;
}
.line {
  position: absolute;
}
.line:nth-child(1) {
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, orange);
  animation: animate1 8s linear infinite;
}
@keyframes animate1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}
.line:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, red);
  animation: animate2 8s linear infinite;
  animation-delay: 2s;
}
@keyframes animate2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}
.line:nth-child(3) {
  bottom: 0;
  right: 0;
  width: 100%;
  background: linear-gradient(270deg, transparent, green);
  animation: animate3 8s linear infinite;
  animation-delay: 4s;
}
@keyframes animate3 {
  0% {
    right: -100%;
    height: 2px;
  }
  50%,
  100% {
    height: 2px;
    right: 100%;
  }
}
.line:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #3a86ff);
  animation: animate4 8s linear infinite;
  animation-delay: 6s;
}
@keyframes animate4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
`],sourceRoot:""}]),c.locals={linearWrap:"linearWrap--EI336",line:"line--LijIE",animate1:"animate1--rw6dI",animate2:"animate2--uMKrU",animate3:"animate3--dW9XO",animate4:"animate4--KPFuY"},e.A=c},6988:function(J,e,n){"use strict";var s=n(71354),h=n.n(s),g=n(76314),o=n.n(g),c=o()(h());c.push([J.id,`.markdownBody--xUrgB {\r
  background: #282c34;\r
  border-radius: 4px;\r
  color: #fff;\r
}\r
\r
.loadingIcon--VpAmv {\r
  padding: 10px;\r
}\r
\r
.copySection--aJHtb {\r
  padding: 5px 10px;\r
  text-align: right;\r
  font-size: 14px;\r
}\r
\r
.markdownBody--xUrgB ol,\r
.markdownBody--xUrgB ul {\r
  padding: 5px 10px;\r
}\r
\r
.markdownBody--xUrgB p {\r
  padding: 5px 10px;\r
  font-size: 14px;\r
}\r
\r
.lang--SO0lS {\r
  padding-right: 20px;\r
}\r
\r
.copySpan--u4qzC {\r
  cursor: pointer;\r
}\r
\r
.preCode--s6faO {\r
  margin: 0 10px 10px;\r
  border-radius: 4px;\r
  padding-bottom: 10px;\r
\r
  code {\r
    margin-bottom: 5px;\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/ReMarkdown/index.module.less"],names:[],mappings:"AAAA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,iBAAiB;EACjB,iBAAiB;EACjB,eAAe;AACjB;;AAEA;;EAEE,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,oBAAoB;;EAEpB;IACE,kBAAkB;EACpB;AACF",sourcesContent:[`.markdownBody {\r
  background: #282c34;\r
  border-radius: 4px;\r
  color: #fff;\r
}\r
\r
.loadingIcon {\r
  padding: 10px;\r
}\r
\r
.copySection {\r
  padding: 5px 10px;\r
  text-align: right;\r
  font-size: 14px;\r
}\r
\r
.markdownBody ol,\r
.markdownBody ul {\r
  padding: 5px 10px;\r
}\r
\r
.markdownBody p {\r
  padding: 5px 10px;\r
  font-size: 14px;\r
}\r
\r
.lang {\r
  padding-right: 20px;\r
}\r
\r
.copySpan {\r
  cursor: pointer;\r
}\r
\r
.preCode {\r
  margin: 0 10px 10px;\r
  border-radius: 4px;\r
  padding-bottom: 10px;\r
\r
  code {\r
    margin-bottom: 5px;\r
  }\r
}\r
`],sourceRoot:""}]),c.locals={markdownBody:"markdownBody--xUrgB",loadingIcon:"loadingIcon--VpAmv",copySection:"copySection--aJHtb",lang:"lang--SO0lS",copySpan:"copySpan--u4qzC",preCode:"preCode--s6faO"},e.A=c},42916:function(J,e,n){"use strict";var s=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var h=s(n(43693)),g=s(n(96540));function o(D,u){var A=Object.keys(D);if(Object.getOwnPropertySymbols){var v=Object.getOwnPropertySymbols(D);u&&(v=v.filter(function(l){return Object.getOwnPropertyDescriptor(D,l).enumerable})),A.push.apply(A,v)}return A}function c(D){for(var u=1;u<arguments.length;u++){var A=arguments[u]!=null?arguments[u]:{};u%2?o(Object(A),!0).forEach(function(v){(0,h.default)(D,v,A[v])}):Object.getOwnPropertyDescriptors?Object.defineProperties(D,Object.getOwnPropertyDescriptors(A)):o(Object(A)).forEach(function(v){Object.defineProperty(D,v,Object.getOwnPropertyDescriptor(A,v))})}return D}var R=function(u){var A=u.style,v=u.children;return g.default.createElement("div",{style:c({width:"100%",minHeight:"calc(100vh - 232px)"},A)},v)},C=e.default=R},84871:function(J,e,n){"use strict";var s=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var h=s(n(96540)),g=s(n(30152)),o=function(C){var D=C.children;return h.default.createElement("section",{className:g.default.linearWrap},h.default.createElement("span",{className:g.default.line}),h.default.createElement("span",{className:g.default.line}),h.default.createElement("span",{className:g.default.line}),h.default.createElement("span",{className:g.default.line}),h.default.createElement("section",null,D))},c=e.default=o},81740:function(J,e,n){"use strict";var s=n(24994),h=n(73738);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var g=s(n(54756)),o=s(n(94634)),c=s(n(85715)),R=s(n(29293)),C=F(n(96540)),D=n(62135),u=s(n(43160)),A=s(n(58050)),v=s(n(69724)),l=s(n(63940)),f=s(n(37948)),d=s(n(75086)),y=s(n(51687)),_=s(n(22802)),I=n(81591),T=s(n(65548));n(35819);var W=s(n(49887));function U(P){if(typeof WeakMap!="function")return null;var w=new WeakMap,M=new WeakMap;return(U=function(B){return B?M:w})(P)}function F(P,w){if(!w&&P&&P.__esModule)return P;if(P===null||h(P)!="object"&&typeof P!="function")return{default:P};var M=U(w);if(M&&M.has(P))return M.get(P);var O={__proto__:null},B=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var L in P)if(L!=="default"&&{}.hasOwnProperty.call(P,L)){var j=B?Object.getOwnPropertyDescriptor(P,L):null;j&&(j.get||j.set)?Object.defineProperty(O,L,j):O[L]=P[L]}return O.default=P,M&&M.set(P,O),O}var X=function(){var P=(0,R.default)(g.default.mark(function w(M){var O,B;return g.default.wrap(function(j){for(;;)switch(j.prev=j.next){case 0:if(j.prev=0,!((O=navigator)!==null&&O!==void 0&&(O=O.clipboard)!==null&&O!==void 0&&O.writeText)){j.next=5;break}return j.next=4,navigator.clipboard.writeText(M);case 4:D.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F");case 5:j.next=16;break;case 7:j.prev=7,j.t0=j.catch(0),B=document.createElement("textarea"),B.value=M,document.body.appendChild(B),B.focus(),B.select();try{document.execCommand("copy"),D.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F")}catch(N){D.message.success("\u590D\u5236\u5230\u526A\u8D34\u677F\u5931\u8D25")}document.body.removeChild(B);case 16:case"end":return j.stop()}},w,null,[[0,7]])}));return function(M){return P.apply(this,arguments)}}(),te=function(w){var M,O=(0,C.useRef)(null),B=(M=O.current)===null||M===void 0?void 0:M.innerText,L=(0,C.useRef)(""),j=(0,I.useDebouncedCallback)(function(){if(O.current){var N=O.current.querySelector("code"),Y=N.className,Q=/language-(\w+)/.exec(Y||"");if(Q){var G=(0,c.default)(Q,2),V=G[1];L.current=V}}},800);return(0,C.useEffect)(function(){setTimeout(j,1)},[B]),C.default.createElement("section",null,C.default.createElement("section",{className:W.default.copySection},C.default.createElement("span",{className:W.default.lang},L.current),C.default.createElement("span",{className:W.default.copySpan,onClick:function(){if(O.current){var Y=O.current.innerText;X(Y)}}},"\u590D\u5236\u4EE3\u7801")),C.default.createElement("pre",{className:W.default.preCode,ref:O},w.children))},Z=function(w){var M=w.markdownText,O=M===void 0?"":M,B=w.isLoading,L=B===void 0?!1:B;return C.default.createElement("section",{className:W.default.markdownBody},L&&!O&&C.default.createElement(u.default,{component:T.default,style:{color:"#fff"},className:W.default.loadingIcon}),O&&C.default.createElement(A.default,{remarkPlugins:[v.default,d.default,l.default],rehypePlugins:[f.default,_.default,[y.default,{detect:!1,ignoreMissing:!0}]],components:{pre:te,p:function(N){return C.default.createElement("p",(0,o.default)({},N,{dir:"auto"}))},a:function(N){var Y,Q=N.href||"",G=/^\/#/i.test(Q),V=G?"_self":(Y=N.target)!==null&&Y!==void 0?Y:"_blank";return C.default.createElement("a",(0,o.default)({},N,{target:V}))}}},O))},$=e.default=Z},59593:function(J,e,n){"use strict";var s=n(24994),h=n(73738);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var g=s(n(85715)),o=R(n(96540));function c(u){if(typeof WeakMap!="function")return null;var A=new WeakMap,v=new WeakMap;return(c=function(f){return f?v:A})(u)}function R(u,A){if(!A&&u&&u.__esModule)return u;if(u===null||h(u)!="object"&&typeof u!="function")return{default:u};var v=c(A);if(v&&v.has(u))return v.get(u);var l={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var d in u)if(d!=="default"&&{}.hasOwnProperty.call(u,d)){var y=f?Object.getOwnPropertyDescriptor(u,d):null;y&&(y.get||y.set)?Object.defineProperty(l,d,y):l[d]=u[d]}return l.default=u,v&&v.set(u,l),l}var C=function(A){var v=A.children,l=A.delay,f=l===void 0?110:l,d=(0,o.useState)(0),y=(0,g.default)(d,2),_=y[0],I=y[1],T=setInterval(function(){return I(function(W){return W+1})},f);return(0,o.useEffect)(function(){_===v.length&&clearInterval(T)},[v,T,_]),(0,o.useEffect)(function(){return function(){return clearInterval(T)}},[T]),o.default.createElement(o.default.Fragment,null,v.substring(0,_))},D=e.default=(0,o.memo)(C)},76526:function(J,e,n){"use strict";var s=n(24994),h=n(73738);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var g=s(n(85715)),o=f(n(96540)),c=s(n(42916)),R=s(n(59593)),C=s(n(81740)),D=s(n(84871)),u=n(62135),A=n(43160),v=n(31819);function l(_){if(typeof WeakMap!="function")return null;var I=new WeakMap,T=new WeakMap;return(l=function(U){return U?T:I})(_)}function f(_,I){if(!I&&_&&_.__esModule)return _;if(_===null||h(_)!="object"&&typeof _!="function")return{default:_};var T=l(I);if(T&&T.has(_))return T.get(_);var W={__proto__:null},U=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var F in _)if(F!=="default"&&{}.hasOwnProperty.call(_,F)){var X=U?Object.getOwnPropertyDescriptor(_,F):null;X&&(X.get||X.set)?Object.defineProperty(W,F,X):W[F]=_[F]}return W.default=_,T&&T.set(_,W),W}var d=function(){var I=(0,o.useState)(""),T=(0,g.default)(I,2),W=T[0],U=T[1],F=(0,o.useRef)(null),X=(0,o.useState)(!1),te=(0,g.default)(X,2),Z=te[0],$=te[1],P=(0,o.useState)(""),w=(0,g.default)(P,2),M=w[0],O=w[1],B=(0,o.useRef)(null),L=(0,o.useState)(function(){return""}),j=(0,g.default)(L,2),N=j[0],Y=j[1],Q=(0,o.useState)(""),G=(0,g.default)(Q,2),V=G[0],ue=G[1],de=(0,o.useRef)(null),se=function(k){Y(k.target.value)},ce=function(k){ue(k.target.value)},fe=function(k){k.metaKey&&k.key==="Enter"&&(ie(),k.preventDefault())},ie=function(){if(V.trim()!==""){var k=new AbortController;B.current=k,ve(V,N,k)}},me=function(){B.current.abort(),$(!1)},ve=function(k,Ae,pe){F.current="",U(F.current);var ge=pe.signal;$(!0),(0,v.oneApiChat)([{content:k,role:"user"}],Ae,ge).then(function(x){var z=x.headers.get("content-type");if(!x.ok||!(z!=null&&z.startsWith("text/event-stream"))||x.status!==200){if(z!=null&&z.startsWith("text/html")){var _e=x.clone().text();_e.then(function(r){U(r)})}else if(z!=null&&z.startsWith("text/plain")){var oe=x.clone().text();oe.then(function(r){U(r)})}else if(z!=null&&z.startsWith("application/json")){var ye=x.clone().json();ye.then(function(r){U((0,v.prettyObject)(r))})}else U(x.statusText);$(!1)}else{var ne,he=x==null||(ne=x.body)===null||ne===void 0?void 0:ne.getReader(),ae=`

`,q="",re="",le=function(){he.read().then(function(t){var a=t.done,i=t.value;if(a){$(!1);return}for(q+=new TextDecoder().decode(i);q.includes(ae);){var m=q.indexOf(ae),p=q.slice(0,m),E=p.split("data: ");for(var S in E)if(E[S]!==""&&E[S]!=="[DONE]")try{var b,K,H=JSON.parse(E[S]),Ee=(b=(K=H.choices[0])===null||K===void 0||(K=K.delta)===null||K===void 0?void 0:K.content)!==null&&b!==void 0?b:"";re+=Ee,O(new Date().toLocaleString()),F.current=re,U(F.current)}catch(Ce){}q=q.slice(m+ae.length)}le()}).catch(function(t){})};le()}}).catch(function(x){$(!1),U(x.message)})};return o.default.createElement(c.default,null,o.default.createElement("h2",null,o.default.createElement(R.default,null,"Cool! Hi, React & Ant Design!")),o.default.createElement("h2",null,"React version: ",o.version),o.default.createElement("section",{style:{width:600,margin:"30px 0"}},o.default.createElement(u.Input,{defaultValue:N,placeholder:"api key",onChange:se,style:{marginBottom:20}}),o.default.createElement(u.Flex,{align:"center"},o.default.createElement(D.default,null,o.default.createElement(u.Input.TextArea,{ref:de,defaultValue:V,placeholder:"\u6765\uFF0C\u8BF4\u70B9\u4EC0\u4E48\u5457...Meta + Enter\u53D1\u9001",onChange:ce,onKeyDown:fe,autoSize:!0,style:{width:300,height:30}})),o.default.createElement(u.Button,{style:{margin:"0 10px"},icon:o.default.createElement(A.SendOutlined,{rotate:-60}),type:"primary",disabled:Z,onClick:ie},"\u53D1\u9001"),o.default.createElement(u.Button,{icon:o.default.createElement(A.SendOutlined,{rotate:-60}),type:"primary",disabled:!Z,onClick:me},"\u505C\u6B62"))),o.default.createElement("section",null,Z&&o.default.createElement("div",null,"\u6B63\u5728\u8F93\u5165..."),o.default.createElement("section",{style:{textAlign:"right",color:"#666"}},M),o.default.createElement(C.default,{markdownText:W,isLoading:Z})))},y=e.default=d},31819:function(J,e,n){"use strict";var s=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.trimTopic=e.toFixedBug=e.toFixed=e.toCamelCase=e.sleep=e.shuffleArr=e.saveHtmlToPng=e.reqStringify=e.readFromFile=e.randomString=e.randomNum=e.randomItem=e.randomHex=e.randomColor=e.random=e.promiseWithTimeout=e.prettyObject=e.pause=e.passwordStrength=e.oneApiChat=e.limitDecimal=e.isURLSearchParams=e.isObject=e.isNotEmpty=e.isEqual=e.isEmptyArray=e.isDecimal=e.isDate=e.isDarkMode=e.isArray=e.hidePhone=e.hasFocus=e.getType=e.getRandomId=e.getParamObject=e.getImgsUrl=e.getFileType=e.getEnv=e.getCurrentDate=e.fetchSomething=e.exportJsonData=e.exportFile=e.dayDif=e.customizeTimer=e.copyTextToClipboard=e.clearCookies=e.checkIsLocalPage=e.capitalize=e.camelizeCamelCase=e.asyncTo=e.asyncAction=e.ThousandNum=e.RoundNum=e.RandomId=void 0;var h=s(n(54756)),g=s(n(29293)),o=s(n(41132)),c=s(n(73738)),R=n(55373),C=s(n(20354)),D=e.getEnv=function(){var t;return typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]"&&(t="NODE"),typeof XMLHttpRequest!="undefined"&&(t="BROWSER"),t},u=e.isArray=function(t){return(0,c.default)(t)==="object"&&Object.prototype.toString.call(t)==="[object Array]"},A=e.isURLSearchParams=function(t){return typeof URLSearchParams!="undefined"&&t instanceof URLSearchParams},v=e.isDate=function(t){return(0,c.default)(t)==="object"&&Object.prototype.toString.call(t)==="[object Date]"},l=e.isObject=function(t){return t!==null&&(0,c.default)(t)==="object"},f=e.getParamObject=function(t){return A(t)?(0,R.parse)(t.toString(),{strictNullHandling:!0}):typeof t=="string"?[t]:t},d=e.reqStringify=function(t){return(0,R.stringify)(t,{arrayFormat:"repeat",strictNullHandling:!0})},y=e.getType=function(t){var a=(0,c.default)(t);return a!=="object"?a:Object.prototype.toString.call(t).replace(/^$/,"$1")},_=e.hidePhone=function(t){return t==null?void 0:t.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")},I=e.asyncAction=function(t){var a=Promise.resolve(t);return function(i){a.then(function(){return setTimeout(function(){return i()})})}},T=e.getImgsUrl=function(t){var a=/<img.*?(?:>|\/>)/gi,i=/src=['"]?([^'"]*)['"]?/i,m=t.match(a);if(!m)return null;var p=m.reduce(function(E,S){var b=S.match(i);return b[1]?[].concat((0,o.default)(E),[b[1]]):E},[]);return p},W=e.customizeTimer={intervalTimer:null,timeoutTimer:null,setTimeout:function(t,a){var i=this,m=Date.now,p=m(),E=p,S=function(){i.timeoutTimer=requestAnimationFrame(S),E=m(),E-p>=a&&(t(),cancelAnimationFrame(i.timeoutTimer))};return this.timeoutTimer=requestAnimationFrame(S),this.timeoutTimer},clearTimeout:function(){cancelAnimationFrame(this.timeoutTimer)},setInterval:function(t,a){var i=this,m=Date.now,p=m(),E=p,S=function(){i.intervalTimer=requestAnimationFrame(S),E=m(),E-p>=a&&(p=m(),E=p,t())};return this.intervalTimer=requestAnimationFrame(S),this.intervalTimer},clearInterval:function(){cancelAnimationFrame(this.intervalTimer)}},U=e.isDecimal=function(t){var a=/(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/;return a.test(t)},F=e.limitDecimal=function(t){return t.replace(/^(-)*(\d+)\.(\d\d).*$/,"$1$2.$3")},X=e.passwordStrength=function(t){var a=/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;return a.test(t)},te=e.checkIsLocalPage=function(){document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")return!1;if(document.visibilityState==="visible")return!0;window.addEventListener("pagehide",function(t){t.persisted},!1)})},Z=e.randomHex=function(){return"#".concat(Math.floor(Math.random()*16777215).toString(16).padEnd(6,"0"))},$=e.clearCookies=document.cookie.split(";").forEach(function(r){return document.cookie=r.replace(/^ +/,"").replace(/[=].*/,"=;expires=".concat(new Date(0).toUTCString(),";path=/"))}),P=e.dayDif=function(t,a){return Math.ceil(Math.abs(t.getTime()-a.getTime())/864e5)},w=e.capitalize=function(t){return t.charAt(0).toUpperCase()+t.slice(1)},M=e.isNotEmpty=function(t){return Array.isArray(t)&&t.length>0},O=e.isDarkMode=window.matchMedia("(prefers-color-scheme: dark)").matches,B=e.fetchSomething=function(){return new Promise(function(t){setTimeout(function(){t("")},1e3)})},L=e.toFixed=function(t,a){if(typeof t!="number")throw new Error("number\u4E0D\u662F\u6570\u5B57");var i=Math.round(Math.pow(10,a)*t)/Math.pow(10,a);if(i=String(i),i.indexOf(".")===-1)a!==0&&(i+=".",i+=new Array(a+1).join("0"));else{var m=i.split(".");m[1].length<a&&(m[1]+=new Array(a-m[1].length+1).join("0")),i=m.join(".")}return i},j=e.toFixedBug=function(t,a){return~~(Math.pow(10,a)*t)/Math.pow(10,a)},N=e.promiseWithTimeout=function(t,a){var i=new Promise(function(m){return setTimeout(function(){return m("Time Out!")},a)});return Promise.race([i,t])},Y=e.shuffleArr=function(t){return t.sort(function(){return .5-Math.random()})},Q=e.sleep=function(t){return new Promise(function(a){return setTimeout(function(){return a()},t)})},G=e.ThousandNum=function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},V=e.RandomId=function(t){return Math.random().toString(36).substring(3,t)},ue=e.RoundNum=function(t,a){return Math.round(t*Math.pow(10,a))/Math.pow(10,a)},de=e.randomNum=function(t,a){return Math.floor(Math.random()*(a-t+1))+t},se=e.isEmptyArray=function(t){return Array.isArray(t)&&!t.length},ce=e.randomItem=function(t){return t[Math.floor(Math.random()*t.length)]},fe=e.asyncTo=function(t){return t.then(function(a){return[null,a]}).catch(function(a){return[a]})},ie=e.hasFocus=function(t){return t===document.activeElement},me=e.isEqual=function(t,a){return JSON.stringify(t)===JSON.stringify(a)},ve=e.randomString=function(){return Math.random().toString(36).slice(2)},ee=e.toCamelCase=function(t){return t.trim().replace(/[-_\s]+(.)?/g,function(a,i){return i?i.toUpperCase():""})},k=e.random=function(t,a){return Math.floor(Math.random()*(a-t+1)+t)},Ae=e.randomColor=function(){return"#".concat(Math.random().toString(16).slice(2,8).padEnd(6,"0"))},pe=e.pause=function(t){return new Promise(function(a){return setTimeout(a,t)})},ge=e.camelizeCamelCase=function(t){return t.replace(/(?:^\w|[A-Z]|\b\w)/g,function(a,i){return i===0?a.toLowerCase():a.toUpperCase()}).replace(/\s+/g,"")},x=e.copyTextToClipboard=function(){var r=(0,g.default)(h.default.mark(function t(a){var i;return h.default.wrap(function(p){for(;;)switch(p.prev=p.next){case 0:if(p.prev=0,!((i=navigator)!==null&&i!==void 0&&(i=i.clipboard)!==null&&i!==void 0&&i.writeText)){p.next=4;break}return p.next=4,navigator.clipboard.writeText(a);case 4:p.next=8;break;case 6:p.prev=6,p.t0=p.catch(0);case 8:case"end":return p.stop()}},t,null,[[0,6]])}));return function(a){return r.apply(this,arguments)}}(),z=e.getRandomId=function(){for(var t="",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=0;i<32;i++)t+=a.charAt(Math.floor(Math.random()*a.length));return t},_e=e.oneApiChat=function(t,a,i){return fetch("https://api.openai.com/v1/chat/completions",{method:"POST",signal:i,headers:{Authorization:a,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:t,stream:!0})})},oe=e.getCurrentDate=function(){var t=new Date,a=t.getDate(),i=t.getMonth()+1,m=t.getFullYear();return"".concat(m,"-").concat(i,"-").concat(a)},ye=e.exportJsonData=function(t){var a=oe(),i=JSON.stringify(JSON.parse(t),null,2),m=new Blob([i],{type:"application/json"}),p=URL.createObjectURL(m),E=document.createElement("a");E.href=p,E.download="chat-store_".concat(a,".json"),document.body.appendChild(E),E.click(),document.body.removeChild(E)},ne=e.saveHtmlToPng=function(){var r=(0,g.default)(h.default.mark(function t(a,i,m){var p,E,S,b;return h.default.wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return H.prev=0,p=a!=null?a:document.getElementById("image-wrapper"),H.next=4,(0,C.default)(p,{useCORS:!0});case 4:E=H.sent,S=E.toDataURL("image/png"),b=document.createElement("a"),b.style.display="none",b.href=S,b.setAttribute("download","chat-shot.png"),typeof b.download=="undefined"&&b.setAttribute("target","_blank"),document.body.appendChild(b),b.click(),document.body.removeChild(b),window.URL.revokeObjectURL(S),i&&i(),Promise.resolve(),H.next=22;break;case 19:H.prev=19,H.t0=H.catch(0),m&&m(H.t0.message);case 22:case"end":return H.stop()}},t,null,[[0,19]])}));return function(a,i,m){return r.apply(this,arguments)}}(),he=e.trimTopic=function(t){return t.replace(/[，。！？”“"、,.!?]*$/,"")},ae=e.readFromFile=function(){return new Promise(function(t,a){var i=document.createElement("input");i.type="file",i.accept="application/json",i.onchange=function(m){var p=m.target.files[0],E=new FileReader;E.onload=function(S){t(S.target.result)},E.onerror=function(S){return a(S)},E.readAsText(p)},i.click()})},q=e.prettyObject=function(t){var a="";return typeof t!="string"&&(a=JSON.stringify(t,null,"  ")),a==="{}"?a.toString():a.startsWith("```json")?a:["```json",a,"```"].join(`
`)},re=e.getFileType=function(t,a){var i=a.split(".").pop().toLowerCase();switch(i){case"txt":return"text/plain";case"json":return"application/json";case"doc":return"application/msword";case"docx":return"application/vnd.openxmlformats-officedocument.wordprocessingml.document";case"xls":return"application/vnd.ms-excel";case"xlsx":return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";case"ppt":return"application/vnd.ms-powerpoint";case"pptx":return"application/vnd.openxmlformats-officedocument.presentationml.presentation";case"pdf":return"application/pdf";case"jpg":case"jpeg":return"image/jpeg";case"png":return"image/png";case"gif":return"image/gif";case"zip":return"application/zip";case"rar":return"application/x-rar-compressed";default:if(typeof t=="string")try{return JSON.parse(t),"application/json"}catch(m){return"text/plain"}else return t instanceof Uint8Array||t instanceof ArrayBuffer,"application/octet-stream"}},le=e.exportFile=function(t,a){var i;if((t==null||(i=t.headers["content-type"])===null||i===void 0?void 0:i.indexOf("application/json"))===-1){var m=t.headers&&t.headers["content-disposition"]||"attachment;filename=".concat(a||"file",".xlsx"),p=decodeURI(m==null?void 0:m.split("=")[1].replace(/'/g,"")).replace(/"/g,"").replace("utf-8''","")||"",E=re(t.data,a||p),S=new Blob([t.data],{type:E}),b=URL.createObjectURL(S),K=document.createElement("a");document.body.appendChild(K),K.style="display: none",K.href=b,K.download=p,K.click(),document.body.removeChild(K)}}},30152:function(J,e,n){"use strict";n.r(e);var s=n(85072),h=n.n(s),g=n(97825),o=n.n(g),c=n(77659),R=n.n(c),C=n(55056),D=n.n(C),u=n(10540),A=n.n(u),v=n(41113),l=n.n(v),f=n(34671),d={};d.styleTagTransform=l(),d.setAttributes=D(),d.insert=R().bind(null,"head"),d.domAPI=o(),d.insertStyleElement=A();var y=h()(f.A,d);e.default=f.A&&f.A.locals?f.A.locals:void 0},49887:function(J,e,n){"use strict";n.r(e);var s=n(85072),h=n.n(s),g=n(97825),o=n.n(g),c=n(77659),R=n.n(c),C=n(55056),D=n.n(C),u=n(10540),A=n.n(u),v=n(41113),l=n.n(v),f=n(6988),d={};d.styleTagTransform=l(),d.setAttributes=D(),d.insert=R().bind(null,"head"),d.domAPI=o(),d.insertStyleElement=A();var y=h()(f.A,d);e.default=f.A&&f.A.locals?f.A.locals:void 0},42634:function(){}}]);

//# sourceMappingURL=267.257bc733db289a0e8847.js.map