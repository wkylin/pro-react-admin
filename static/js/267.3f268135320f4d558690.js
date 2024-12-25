(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[267],{65548:function(B,n,e){"use strict";var o=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(43693)),t=E(e(96540)),i=e(74848);function p(d){if(typeof WeakMap!="function")return null;var a=new WeakMap,r=new WeakMap;return(p=function(y){return y?r:a})(d)}function E(d,a){if(!a&&d&&d.__esModule)return d;if(d===null||s(d)!="object"&&typeof d!="function")return{default:d};var r=p(a);if(r&&r.has(d))return r.get(d);var m={__proto__:null},y=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var O in d)if(O!=="default"&&{}.hasOwnProperty.call(d,O)){var g=y?Object.getOwnPropertyDescriptor(d,O):null;g&&(g.get||g.set)?Object.defineProperty(m,O,g):m[O]=d[O]}return m.default=d,r&&r.set(d,m),m}function f(d,a){var r=Object.keys(d);if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(d);a&&(m=m.filter(function(y){return Object.getOwnPropertyDescriptor(d,y).enumerable})),r.push.apply(r,m)}return r}function l(d){for(var a=1;a<arguments.length;a++){var r=arguments[a]!=null?arguments[a]:{};a%2?f(Object(r),!0).forEach(function(m){(0,u.default)(d,m,r[m])}):Object.getOwnPropertyDescriptors?Object.defineProperties(d,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach(function(m){Object.defineProperty(d,m,Object.getOwnPropertyDescriptor(r,m))})}return d}var _=function(a){return(0,i.jsxs)("svg",l(l({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"#fff",viewBox:"0 0 120 30"},a),{},{children:[(0,i.jsxs)("circle",{cx:15,cy:15,r:15,children:[(0,i.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,i.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]}),(0,i.jsxs)("circle",{cx:60,cy:15,r:9,fillOpacity:.3,children:[(0,i.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:9,repeatCount:"indefinite",to:9,values:"9;15;9"}),(0,i.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:.5,repeatCount:"indefinite",to:.5,values:".5;1;.5"})]}),(0,i.jsxs)("circle",{cx:105,cy:15,r:15,children:[(0,i.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,i.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]})]}))},A=n.default=_},47122:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.alternating--mj1_d {\r
  animation-name: alternating-text--p6lWH;\r
  animation-duration: 1s;\r
  animation-iteration-count: infinite;\r
  animation-timing-function: ease;\r
  background: linear-gradient(to right, #000, #0f9b0f);\r
  -webkit-text-fill-color: transparent;\r
  -webkit-background-clip: text;\r
          background-clip: text;\r
  font-size: 20px;\r
  font-weight: 700;\r
}\r
\r
@keyframes alternating-text--p6lWH {\r
  90% {\r
    display: none;\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/AlternatingText/index.module.less"],names:[],mappings:"AAAA;EACE,uCAAgC;EAChC,sBAAsB;EACtB,mCAAmC;EACnC,+BAA+B;EAC/B,oDAAoD;EACpD,oCAAoC;EACpC,6BAAqB;UAArB,qBAAqB;EACrB,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE;IACE,aAAa;EACf;AACF",sourcesContent:[`.alternating {\r
  animation-name: alternating-text;\r
  animation-duration: 1s;\r
  animation-iteration-count: infinite;\r
  animation-timing-function: ease;\r
  background: linear-gradient(to right, #000, #0f9b0f);\r
  -webkit-text-fill-color: transparent;\r
  background-clip: text;\r
  font-size: 20px;\r
  font-weight: 700;\r
}\r
\r
@keyframes alternating-text {\r
  90% {\r
    display: none;\r
  }\r
}\r
`],sourceRoot:""}]),i.locals={alternating:"alternating--mj1_d","alternating-text":"alternating-text--p6lWH",alternatingText:"alternating-text--p6lWH"},n.A=i},61543:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.btn--Vmubv {\r
  border-radius: 4px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  border: 1px solid transparent;\r
  background-color: #3857e3;\r
  font-weight: medium;\r
  color: #fff;\r
  box-shadow:\r
    0 1px 3px 0 rgb(0 0 0 / 10%),\r
    0 1px 2px 0 rgb(0 0 0 / 6%);\r
  overflow: hidden;\r
  position: relative;\r
  padding: 4px 16px;\r
  font-size: 0.875rem;\r
}\r
\r
.content--jujDv {\r
  z-index: 2;\r
}\r
\r
.btn--Vmubv:hover {\r
  filter: brightness(115%);\r
  cursor: pointer;\r
}\r
\r
.btn-ripple--w2aOn {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
  opacity: 0;\r
  width: 0;\r
  height: 0;\r
  border-radius: 50%;\r
  background: rgb(255 255 255 / 20%);\r
  animation: ripple--oIc_l 0.4s ease-in;\r
}\r
\r
.btn-ripple-container--II62b {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
  background: transparent;\r
}\r
\r
@keyframes ripple--oIc_l {\r
  0% {\r
    opacity: 0;\r
  }\r
\r
  25% {\r
    opacity: 1;\r
  }\r
\r
  100% {\r
    width: 200%;\r
    padding-bottom: 200%;\r
    opacity: 0;\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/AnimateRipple/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,oBAAoB;EACpB,mBAAmB;EACnB,uBAAuB;EACvB,6BAA6B;EAC7B,yBAAyB;EACzB,mBAAmB;EACnB,WAAW;EACX;;+BAE6B;EAC7B,gBAAgB;EAChB,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,wBAAwB;EACxB,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,UAAU;EACV,QAAQ;EACR,SAAS;EACT,kBAAkB;EAClB,kCAAkC;EAClC,qCAA8B;AAChC;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,uBAAuB;AACzB;;AAEA;EACE;IACE,UAAU;EACZ;;EAEA;IACE,UAAU;EACZ;;EAEA;IACE,WAAW;IACX,oBAAoB;IACpB,UAAU;EACZ;AACF",sourcesContent:[`.btn {\r
  border-radius: 4px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  border: 1px solid transparent;\r
  background-color: #3857e3;\r
  font-weight: medium;\r
  color: #fff;\r
  box-shadow:\r
    0 1px 3px 0 rgb(0 0 0 / 10%),\r
    0 1px 2px 0 rgb(0 0 0 / 6%);\r
  overflow: hidden;\r
  position: relative;\r
  padding: 4px 16px;\r
  font-size: 0.875rem;\r
}\r
\r
.content {\r
  z-index: 2;\r
}\r
\r
.btn:hover {\r
  filter: brightness(115%);\r
  cursor: pointer;\r
}\r
\r
.btn-ripple {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
  opacity: 0;\r
  width: 0;\r
  height: 0;\r
  border-radius: 50%;\r
  background: rgb(255 255 255 / 20%);\r
  animation: ripple 0.4s ease-in;\r
}\r
\r
.btn-ripple-container {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
  background: transparent;\r
}\r
\r
@keyframes ripple {\r
  0% {\r
    opacity: 0;\r
  }\r
\r
  25% {\r
    opacity: 1;\r
  }\r
\r
  100% {\r
    width: 200%;\r
    padding-bottom: 200%;\r
    opacity: 0;\r
  }\r
}\r
`],sourceRoot:""}]),i.locals={btn:"btn--Vmubv",content:"content--jujDv","btn-ripple":"btn-ripple--w2aOn",btnRipple:"btn-ripple--w2aOn",ripple:"ripple--oIc_l","btn-ripple-container":"btn-ripple-container--II62b",btnRippleContainer:"btn-ripple-container--II62b"},n.A=i},9666:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.hIBkFg--xUSDY {
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  margin: 0;
  color: white;
  background: linear-gradient(rgb(115 0 64) 0%, rgb(48 28 190) 100%) text;
  -webkit-text-fill-color: transparent;
}

.hIBkFg--xUSDY span {
  background: linear-gradient(rgb(255 215 255) 0%, rgb(255 182 255) 100%) text;
  -webkit-text-fill-color: transparent;
}

.kqOLaE--z4koa {
  display: inline-flex;
  flex-direction: row;
  font-weight: bold;
  padding-right: 5px;
}

.kqOLaE--z4koa span {
  animation-name: bz-an--moL5G;
  animation-duration: 6s;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
}

.kqOLaE--z4koa span:nth-child(1) {
  animation-delay: 0.1s;
}

.kqOLaE--z4koa span:nth-child(2) {
  animation-delay: 0.2s;
}

.kqOLaE--z4koa span:nth-child(3) {
  animation-delay: 0.3s;
}

.kqOLaE--z4koa span:nth-child(4) {
  animation-delay: 0.4s;
}

.kqOLaE--z4koa span:nth-child(5) {
  animation-delay: 0.5s;
}

@keyframes bz-an--moL5G {
  50% {
    opacity: 1;
    transform: scale(1) translateY(0) skewX(0deg) skewY(0deg) rotateZ(0deg);
    filter: blur(0);
  }

  60% {
    opacity: 0;
    transform: scale(2) translateX(100px) skewX(10deg) skewY(10deg) rotateZ(30deg);
    filter: blur(10px);
  }

  70% {
    opacity: 0;
    transform: scale(2) translateY(-100px) skewX(10deg) skewY(10deg) rotateZ(30deg);
    filter: blur(10px);
  }

  80% {
    opacity: 1;
    transform: scale(1) translateY(0) skewX(0deg) skewY(0deg) rotateZ(0deg);
    filter: blur(0);
  }
}

.droppingTexts--MP1gn {
  display: inline-block;
  text-align: left;
  font-size: 30px;
}

.droppingTexts--MP1gn > div {
  font-size: 0;
  opacity: 0;
  position: absolute;
  top: 2px;
  box-shadow: 0 60px 25px -20px rgb(0 0 0 / 50%);
}

.droppingTexts--MP1gn > div:nth-child(1) {
  animation: roll--YAHK5 5s linear infinite 0s;
}

.droppingTexts--MP1gn > div:nth-child(2) {
  animation: roll--YAHK5 5s linear infinite 1s;
}

.droppingTexts--MP1gn > div:nth-child(3) {
  animation: roll--YAHK5 5s linear infinite 2s;
}

.droppingTexts--MP1gn > div:nth-child(4) {
  animation: roll--YAHK5 5s linear infinite 3s;
}

@keyframes roll--YAHK5 {
  0% {
    font-size: 0;
    opacity: 0;
    margin-left: -30px;
    margin-top: 0;
    transform: rotate(-25deg);
  }

  3% {
    opacity: 1;
    transform: rotate(0deg);
  }

  5% {
    font-size: inherit;
    opacity: 1;
    margin-left: 0;
    margin-top: 0;
  }

  20% {
    font-size: inherit;
    opacity: 1;
    margin-left: 0;
    margin-top: 0;
    transform: rotate(0deg);
  }

  27% {
    font-size: 0;
    opacity: 0.5;
    margin-left: 20px;
    margin-top: 100px;
  }

  100% {
    font-size: 0;
    opacity: 0;
    margin-left: -30px;
    margin-top: 0;
    transform: rotate(15deg);
  }
}
`,"",{version:3,sources:["webpack://./src/components/stateless/AnimateWave/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,SAAS;EACT,YAAY;EACZ,uEAAuE;EACvE,oCAAoC;AACtC;;AAEA;EACE,4EAA4E;EAC5E,oCAAoC;AACtC;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,4BAAqB;EACrB,sBAAsB;EACtB,8DAA8D;EAC9D,6BAA6B;EAC7B,mCAAmC;AACrC;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE;IACE,UAAU;IACV,uEAAuE;IACvE,eAAe;EACjB;;EAEA;IACE,UAAU;IACV,8EAA8E;IAC9E,kBAAkB;EACpB;;EAEA;IACE,UAAU;IACV,+EAA+E;IAC/E,kBAAkB;EACpB;;EAEA;IACE,UAAU;IACV,uEAAuE;IACvE,eAAe;EACjB;AACF;;AAEA;EACE,qBAAqB;EACrB,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,UAAU;EACV,kBAAkB;EAClB,QAAQ;EACR,8CAA8C;AAChD;;AAEA;EACE,4CAAqC;AACvC;;AAEA;EACE,4CAAqC;AACvC;;AAEA;EACE,4CAAqC;AACvC;;AAEA;EACE,4CAAqC;AACvC;;AAEA;EACE;IACE,YAAY;IACZ,UAAU;IACV,kBAAkB;IAClB,aAAa;IACb,yBAAyB;EAC3B;;EAEA;IACE,UAAU;IACV,uBAAuB;EACzB;;EAEA;IACE,kBAAkB;IAClB,UAAU;IACV,cAAc;IACd,aAAa;EACf;;EAEA;IACE,kBAAkB;IAClB,UAAU;IACV,cAAc;IACd,aAAa;IACb,uBAAuB;EACzB;;EAEA;IACE,YAAY;IACZ,YAAY;IACZ,iBAAiB;IACjB,iBAAiB;EACnB;;EAEA;IACE,YAAY;IACZ,UAAU;IACV,kBAAkB;IAClB,aAAa;IACb,wBAAwB;EAC1B;AACF",sourcesContent:[`.hIBkFg {
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  margin: 0;
  color: white;
  background: linear-gradient(rgb(115 0 64) 0%, rgb(48 28 190) 100%) text;
  -webkit-text-fill-color: transparent;
}

.hIBkFg span {
  background: linear-gradient(rgb(255 215 255) 0%, rgb(255 182 255) 100%) text;
  -webkit-text-fill-color: transparent;
}

.kqOLaE {
  display: inline-flex;
  flex-direction: row;
  font-weight: bold;
  padding-right: 5px;
}

.kqOLaE span {
  animation-name: bz-an;
  animation-duration: 6s;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
}

.kqOLaE span:nth-child(1) {
  animation-delay: 0.1s;
}

.kqOLaE span:nth-child(2) {
  animation-delay: 0.2s;
}

.kqOLaE span:nth-child(3) {
  animation-delay: 0.3s;
}

.kqOLaE span:nth-child(4) {
  animation-delay: 0.4s;
}

.kqOLaE span:nth-child(5) {
  animation-delay: 0.5s;
}

@keyframes bz-an {
  50% {
    opacity: 1;
    transform: scale(1) translateY(0) skewX(0deg) skewY(0deg) rotateZ(0deg);
    filter: blur(0);
  }

  60% {
    opacity: 0;
    transform: scale(2) translateX(100px) skewX(10deg) skewY(10deg) rotateZ(30deg);
    filter: blur(10px);
  }

  70% {
    opacity: 0;
    transform: scale(2) translateY(-100px) skewX(10deg) skewY(10deg) rotateZ(30deg);
    filter: blur(10px);
  }

  80% {
    opacity: 1;
    transform: scale(1) translateY(0) skewX(0deg) skewY(0deg) rotateZ(0deg);
    filter: blur(0);
  }
}

.droppingTexts {
  display: inline-block;
  text-align: left;
  font-size: 30px;
}

.droppingTexts > div {
  font-size: 0;
  opacity: 0;
  position: absolute;
  top: 2px;
  box-shadow: 0 60px 25px -20px rgb(0 0 0 / 50%);
}

.droppingTexts > div:nth-child(1) {
  animation: roll 5s linear infinite 0s;
}

.droppingTexts > div:nth-child(2) {
  animation: roll 5s linear infinite 1s;
}

.droppingTexts > div:nth-child(3) {
  animation: roll 5s linear infinite 2s;
}

.droppingTexts > div:nth-child(4) {
  animation: roll 5s linear infinite 3s;
}

@keyframes roll {
  0% {
    font-size: 0;
    opacity: 0;
    margin-left: -30px;
    margin-top: 0;
    transform: rotate(-25deg);
  }

  3% {
    opacity: 1;
    transform: rotate(0deg);
  }

  5% {
    font-size: inherit;
    opacity: 1;
    margin-left: 0;
    margin-top: 0;
  }

  20% {
    font-size: inherit;
    opacity: 1;
    margin-left: 0;
    margin-top: 0;
    transform: rotate(0deg);
  }

  27% {
    font-size: 0;
    opacity: 0.5;
    margin-left: 20px;
    margin-top: 100px;
  }

  100% {
    font-size: 0;
    opacity: 0;
    margin-left: -30px;
    margin-top: 0;
    transform: rotate(15deg);
  }
}
`],sourceRoot:""}]),i.locals={hIBkFg:"hIBkFg--xUSDY",kqOLaE:"kqOLaE--z4koa","bz-an":"bz-an--moL5G",bzAn:"bz-an--moL5G",droppingTexts:"droppingTexts--MP1gn",roll:"roll--YAHK5"},n.A=i},97669:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=e(4417),p=e.n(i),E=new URL(e(82547),e.b),f=t()(s()),l=p()(E);f.push([B.id,`a.squiggle--JQRWj {\r
  background-image: linear-gradient(to bottom, #0087ca 0%, #0087ca 100%);\r
  background-position: 0 100%;\r
  background-repeat: repeat-x;\r
  background-size: 1px 1px;\r
  color: inherit;\r
  text-decoration: none;\r
}\r
\r
a.squiggle--JQRWj:hover {\r
  background-image: url(`+l+`);\r
  background-size: auto 2px;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/AutoLink/index.module.less"],names:[],mappings:"AAAA;EACE,sEAAsE;EACtE,2BAA2B;EAC3B,2BAA2B;EAC3B,wBAAwB;EACxB,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,yDAA0b;EAC1b,yBAAyB;AAC3B",sourcesContent:[`a.squiggle {\r
  background-image: linear-gradient(to bottom, #0087ca 0%, #0087ca 100%);\r
  background-position: 0 100%;\r
  background-repeat: repeat-x;\r
  background-size: 1px 1px;\r
  color: inherit;\r
  text-decoration: none;\r
}\r
\r
a.squiggle:hover {\r
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-15px);}}%3C/style%3E%3Cpath fill='none' stroke='%230087ca' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");\r
  background-size: auto 2px;\r
}\r
`],sourceRoot:""}]),f.locals={squiggle:"squiggle--JQRWj"},n.A=f},27825:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.avatarCard--kIii3 {\r
  .card--W_bZq {\r
    width: 350px;\r
    display: flex;\r
    flex-direction: column;\r
    align-items: center;\r
    background: #f3f1fe;\r
    border-radius: 10px;\r
    margin: 8px;\r
    margin-top: 100px;\r
  }\r
\r
  .card--W_bZq figure {\r
    width: 120px;\r
    height: 120px;\r
    border-radius: 50%;\r
    margin-top: -60px;\r
    position: relative;\r
  }\r
\r
  .card--W_bZq figure::before {\r
    content: '';\r
    border-radius: inherit;\r
    position: absolute;\r
    top: 50%;\r
    left: 50%;\r
    width: 100%;\r
    height: 100%;\r
    transform: translate(-50%, -50%);\r
    border: 1rem solid #fff;\r
    box-shadow: 0 1px #fff;\r
  }\r
\r
  .card--W_bZq figure img {\r
    border-radius: inherit;\r
    width: 100%;\r
    height: 100%;\r
    object-fit: cover;\r
  }\r
\r
  .card--W_bZq .content--yiHmV {\r
    text-align: center;\r
    margin: 2rem;\r
    line-height: 1.5;\r
    color: #101010;\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/AvatarCard/index.module.less"],names:[],mappings:"AAAA;EACE;IACE,YAAY;IACZ,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,mBAAmB;IACnB,mBAAmB;IACnB,WAAW;IACX,iBAAiB;EACnB;;EAEA;IACE,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,iBAAiB;IACjB,kBAAkB;EACpB;;EAEA;IACE,WAAW;IACX,sBAAsB;IACtB,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,WAAW;IACX,YAAY;IACZ,gCAAgC;IAChC,uBAAuB;IACvB,sBAAsB;EACxB;;EAEA;IACE,sBAAsB;IACtB,WAAW;IACX,YAAY;IACZ,iBAAiB;EACnB;;EAEA;IACE,kBAAkB;IAClB,YAAY;IACZ,gBAAgB;IAChB,cAAc;EAChB;AACF",sourcesContent:[`.avatarCard {\r
  .card {\r
    width: 350px;\r
    display: flex;\r
    flex-direction: column;\r
    align-items: center;\r
    background: #f3f1fe;\r
    border-radius: 10px;\r
    margin: 8px;\r
    margin-top: 100px;\r
  }\r
\r
  .card figure {\r
    width: 120px;\r
    height: 120px;\r
    border-radius: 50%;\r
    margin-top: -60px;\r
    position: relative;\r
  }\r
\r
  .card figure::before {\r
    content: '';\r
    border-radius: inherit;\r
    position: absolute;\r
    top: 50%;\r
    left: 50%;\r
    width: 100%;\r
    height: 100%;\r
    transform: translate(-50%, -50%);\r
    border: 1rem solid #fff;\r
    box-shadow: 0 1px #fff;\r
  }\r
\r
  .card figure img {\r
    border-radius: inherit;\r
    width: 100%;\r
    height: 100%;\r
    object-fit: cover;\r
  }\r
\r
  .card .content {\r
    text-align: center;\r
    margin: 2rem;\r
    line-height: 1.5;\r
    color: #101010;\r
  }\r
}\r
`],sourceRoot:""}]),i.locals={avatarCard:"avatarCard--kIii3",card:"card--W_bZq",content:"content--yiHmV"},n.A=i},90958:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.breatheItem--VaM9v {\r
  width: 40px;\r
  height: 40px;\r
  background-color: #27c2a3;\r
  border-radius: 50%;\r
  text-align: center;\r
  margin-bottom: 80px;\r
}\r
\r
.breatheItem--VaM9v::before {\r
  content: '';\r
  display: block;\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 50%;\r
  opacity: 0.7;\r
  background-color: #27c2a3;\r
  animation: breathe--wA3l6 2s infinite cubic-bezier(0, 0, 0.49, 1.02);\r
}\r
\r
@keyframes breathe--wA3l6 {\r
  0% {\r
    transform: scale(1);\r
  }\r
\r
  50%,\r
  75% {\r
    transform: scale(3);\r
  }\r
\r
  78%,\r
  100% {\r
    opacity: 0;\r
  }\r
}\r
\r
.loopRotate--GRmod {\r
  position: relative;\r
  display: flex;\r
  flex-direction: column;\r
  justify-content: center;\r
  align-items: start;\r
\r
  .outside--NZwXf {\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    width: 120px;\r
    height: 120px;\r
    border: 1px dashed #44ec79;\r
    border-radius: 50%;\r
    position: relative;\r
\r
    .inner--ZClIQ {\r
      width: 100px;\r
      height: 100px;\r
      border: 3px dashed #44ec79;\r
      border-radius: 50%;\r
      text-align: center;\r
      line-height: 100px;\r
      animation: loop--Q7Ru6 10s linear infinite;\r
    }\r
\r
    .text--FGKfx {\r
      position: absolute;\r
      padding: 0;\r
      color: #44ec79;\r
      font-size: 20px;\r
      font-weight: bolder;\r
    }\r
  }\r
}\r
\r
@keyframes loop--Q7Ru6 {\r
  0% {\r
    transform: rotate(0deg);\r
  }\r
\r
  50% {\r
    transform: rotate(180deg);\r
  }\r
\r
  100% {\r
    transform: rotate(360deg);\r
  }\r
}\r
\r
@keyframes trans--jcajC {\r
  0% {\r
    transform: rotate(0deg);\r
  }\r
\r
  50% {\r
    transform: rotate(180deg);\r
  }\r
\r
  100% {\r
    transform: rotate(0deg);\r
  }\r
}\r
\r
.play-button--Wg3em {\r
  z-index: 1;\r
  width: 100px;\r
  height: 100px;\r
  background-color: #2761ff;\r
  border-radius: 100%;\r
  justify-content: center;\r
  align-items: center;\r
  display: flex;\r
  position: absolute;\r
  box-shadow:\r
    1px 1px 94px #000,\r
    1px 1px 164px rgb(39 97 255 / 90%);\r
  animation: zoom-in-zoom-out--alaL8 2s ease infinite;\r
}\r
\r
.div-block--OwsxA {\r
  width: 86px;\r
  height: 86px;\r
  background-color: rgb(39 97 255 / 10%);\r
  border-radius: 100%;\r
  position: absolute;\r
}\r
\r
@keyframes zoom-in-zoom-out--alaL8 {\r
  0% {\r
    transform: scale(1);\r
  }\r
\r
  50% {\r
    transform: scale(1.2);\r
  }\r
\r
  100% {\r
    transform: scale(1);\r
  }\r
}\r
\r
.div-block-1019--iYyTM {\r
  width: 1px;\r
  height: 100px;\r
  background-image: linear-gradient(#1d1d1c, #462f19 28%, #ff800d);\r
  margin-left: auto;\r
  margin-right: auto;\r
  position: absolute;\r
  top: -98px;\r
  left: 0;\r
  right: 0;\r
}\r
\r
.div-block-1021--EWkRm.code--Wc_Yz {\r
  background-image: radial-gradient(circle, #006b6b, rgb(158 75 0 / 0%));\r
  border-color: #1cc7c7;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/BreatheText/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,cAAc;EACd,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,yBAAyB;EACzB,oEAA6D;AAC/D;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;;IAEE,mBAAmB;EACrB;;EAEA;;IAEE,UAAU;EACZ;AACF;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,kBAAkB;;EAElB;IACE,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;IACZ,aAAa;IACb,0BAA0B;IAC1B,kBAAkB;IAClB,kBAAkB;;IAElB;MACE,YAAY;MACZ,aAAa;MACb,0BAA0B;MAC1B,kBAAkB;MAClB,kBAAkB;MAClB,kBAAkB;MAClB,0CAAmC;IACrC;;IAEA;MACE,kBAAkB;MAClB,UAAU;MACV,cAAc;MACd,eAAe;MACf,mBAAmB;IACrB;EACF;AACF;;AAEA;EACE;IACE,uBAAuB;EACzB;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE;IACE,uBAAuB;EACzB;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,uBAAuB;EACzB;AACF;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,aAAa;EACb,yBAAyB;EACzB,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;EACb,kBAAkB;EAClB;;sCAEoC;EACpC,mDAA4C;AAC9C;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,sCAAsC;EACtC,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,qBAAqB;EACvB;;EAEA;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE,UAAU;EACV,aAAa;EACb,gEAAgE;EAChE,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;EAClB,UAAU;EACV,OAAO;EACP,QAAQ;AACV;;AAEA;EACE,sEAAsE;EACtE,qBAAqB;AACvB",sourcesContent:[`.breatheItem {\r
  width: 40px;\r
  height: 40px;\r
  background-color: #27c2a3;\r
  border-radius: 50%;\r
  text-align: center;\r
  margin-bottom: 80px;\r
}\r
\r
.breatheItem::before {\r
  content: '';\r
  display: block;\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 50%;\r
  opacity: 0.7;\r
  background-color: #27c2a3;\r
  animation: breathe 2s infinite cubic-bezier(0, 0, 0.49, 1.02);\r
}\r
\r
@keyframes breathe {\r
  0% {\r
    transform: scale(1);\r
  }\r
\r
  50%,\r
  75% {\r
    transform: scale(3);\r
  }\r
\r
  78%,\r
  100% {\r
    opacity: 0;\r
  }\r
}\r
\r
.loopRotate {\r
  position: relative;\r
  display: flex;\r
  flex-direction: column;\r
  justify-content: center;\r
  align-items: start;\r
\r
  .outside {\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    width: 120px;\r
    height: 120px;\r
    border: 1px dashed #44ec79;\r
    border-radius: 50%;\r
    position: relative;\r
\r
    .inner {\r
      width: 100px;\r
      height: 100px;\r
      border: 3px dashed #44ec79;\r
      border-radius: 50%;\r
      text-align: center;\r
      line-height: 100px;\r
      animation: loop 10s linear infinite;\r
    }\r
\r
    .text {\r
      position: absolute;\r
      padding: 0;\r
      color: #44ec79;\r
      font-size: 20px;\r
      font-weight: bolder;\r
    }\r
  }\r
}\r
\r
@keyframes loop {\r
  0% {\r
    transform: rotate(0deg);\r
  }\r
\r
  50% {\r
    transform: rotate(180deg);\r
  }\r
\r
  100% {\r
    transform: rotate(360deg);\r
  }\r
}\r
\r
@keyframes trans {\r
  0% {\r
    transform: rotate(0deg);\r
  }\r
\r
  50% {\r
    transform: rotate(180deg);\r
  }\r
\r
  100% {\r
    transform: rotate(0deg);\r
  }\r
}\r
\r
.play-button {\r
  z-index: 1;\r
  width: 100px;\r
  height: 100px;\r
  background-color: #2761ff;\r
  border-radius: 100%;\r
  justify-content: center;\r
  align-items: center;\r
  display: flex;\r
  position: absolute;\r
  box-shadow:\r
    1px 1px 94px #000,\r
    1px 1px 164px rgb(39 97 255 / 90%);\r
  animation: zoom-in-zoom-out 2s ease infinite;\r
}\r
\r
.div-block {\r
  width: 86px;\r
  height: 86px;\r
  background-color: rgb(39 97 255 / 10%);\r
  border-radius: 100%;\r
  position: absolute;\r
}\r
\r
@keyframes zoom-in-zoom-out {\r
  0% {\r
    transform: scale(1);\r
  }\r
\r
  50% {\r
    transform: scale(1.2);\r
  }\r
\r
  100% {\r
    transform: scale(1);\r
  }\r
}\r
\r
.div-block-1019 {\r
  width: 1px;\r
  height: 100px;\r
  background-image: linear-gradient(#1d1d1c, #462f19 28%, #ff800d);\r
  margin-left: auto;\r
  margin-right: auto;\r
  position: absolute;\r
  top: -98px;\r
  left: 0;\r
  right: 0;\r
}\r
\r
.div-block-1021.code {\r
  background-image: radial-gradient(circle, #006b6b, rgb(158 75 0 / 0%));\r
  border-color: #1cc7c7;\r
}\r
`],sourceRoot:""}]),i.locals={breatheItem:"breatheItem--VaM9v",breathe:"breathe--wA3l6",loopRotate:"loopRotate--GRmod",loop:"loop--Q7Ru6",outside:"outside--NZwXf",inner:"inner--ZClIQ",text:"text--FGKfx","play-button":"play-button--Wg3em",playButton:"play-button--Wg3em","zoom-in-zoom-out":"zoom-in-zoom-out--alaL8",zoomInZoomOut:"zoom-in-zoom-out--alaL8","div-block":"div-block--OwsxA",divBlock:"div-block--OwsxA","div-block-1019":"div-block-1019--iYyTM",divBlock1019:"div-block-1019--iYyTM","div-block-1021":"div-block-1021--EWkRm",divBlock1021:"div-block-1021--EWkRm",code:"code--Wc_Yz",trans:"trans--jcajC"},n.A=i},80711:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.gradientTracking--FyamC {\r
  position: relative;\r
  margin: 10px 0;\r
  background: #7983ff;\r
  padding: 5px 10px;\r
  font-size: 18px;\r
  border: none;\r
  border-radius: 8px;\r
  color: white;\r
  cursor: pointer;\r
  outline: none;\r
  overflow: hidden;\r
}\r
\r
.gradientTracking--FyamC span {\r
  position: relative;\r
  pointer-events: none;\r
}\r
\r
.gradientTracking--FyamC::before {\r
  --size: 0;\r
\r
  content: '';\r
  position: absolute;\r
  left: var(--x);\r
  top: var(--y);\r
  width: 0;\r
  width: var(--size);\r
  height: 0;\r
  height: var(--size);\r
  background: radial-gradient(circle closest-side, pink, transparent);\r
  transform: translate(-50%, -50%);\r
  transition:\r
    width 0.2s ease,\r
    height 0.2s ease;\r
}\r
\r
.gradientTracking--FyamC:hover::before {\r
  --size: 200px;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/GradientTracking/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,cAAc;EACd,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;EACf,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,eAAe;EACf,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,SAAS;;EAET,WAAW;EACX,kBAAkB;EAClB,cAAc;EACd,aAAa;EACb,QAAkB;EAAlB,kBAAkB;EAClB,SAAmB;EAAnB,mBAAmB;EACnB,mEAAmE;EACnE,gCAAgC;EAChC;;oBAEkB;AACpB;;AAEA;EACE,aAAa;AACf",sourcesContent:[`.gradientTracking {\r
  position: relative;\r
  margin: 10px 0;\r
  background: #7983ff;\r
  padding: 5px 10px;\r
  font-size: 18px;\r
  border: none;\r
  border-radius: 8px;\r
  color: white;\r
  cursor: pointer;\r
  outline: none;\r
  overflow: hidden;\r
}\r
\r
.gradientTracking span {\r
  position: relative;\r
  pointer-events: none;\r
}\r
\r
.gradientTracking::before {\r
  --size: 0;\r
\r
  content: '';\r
  position: absolute;\r
  left: var(--x);\r
  top: var(--y);\r
  width: var(--size);\r
  height: var(--size);\r
  background: radial-gradient(circle closest-side, pink, transparent);\r
  transform: translate(-50%, -50%);\r
  transition:\r
    width 0.2s ease,\r
    height 0.2s ease;\r
}\r
\r
.gradientTracking:hover::before {\r
  --size: 200px;\r
}\r
`],sourceRoot:""}]),i.locals={gradientTracking:"gradientTracking--FyamC"},n.A=i},45789:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.isometricCard--mEKMm {\r
  margin: 0 100px;\r
  transform: rotateX(51deg) rotateZ(43deg);\r
  transform-style: preserve-3d;\r
  will-change: transform;\r
  display: flex;\r
  align-items: center;\r
  width: 240px;\r
  height: 320px;\r
  background: #070221;\r
  border-radius: 2rem;\r
  box-shadow:\r
    1px 1px 0 1px #f9f9fb,\r
    -1px 0 28px 0 rgb(34 33 81 / 1%),\r
    28px 28px 28px 0 rgb(34 33 81 / 25%);\r
  transition:\r
    0.4s ease-in-out transform,\r
    0.3s ease-in-out box-shadow;\r
  color: #fff;\r
}\r
\r
.isometricCard--mEKMm:hover {\r
  transform: translate3d(0, -16px, 0) rotateX(51deg) rotateZ(43deg);\r
  box-shadow:\r
    1px 1px 0 1px #f9f9fb,\r
    -1px 0 28px 0 rgb(34 33 81 / 1%),\r
    54px 54px 28px -10px rgb(34 33 81 / 15%);\r
}\r
\r
.isometricCard--mEKMm p {\r
  margin: 0 36px;\r
  text-align: center;\r
  font-size: 20px;\r
  line-height: 1.4;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/IsometricCard/index.module.less"],names:[],mappings:"AAAA;EACE,eAAe;EACf,wCAAwC;EACxC,4BAA4B;EAC5B,sBAAsB;EACtB,aAAa;EACb,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB;;;wCAGsC;EACtC;;+BAE6B;EAC7B,WAAW;AACb;;AAEA;EACE,iEAAiE;EACjE;;;4CAG0C;AAC5C;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,eAAe;EACf,gBAAgB;AAClB",sourcesContent:[`.isometricCard {\r
  margin: 0 100px;\r
  transform: rotateX(51deg) rotateZ(43deg);\r
  transform-style: preserve-3d;\r
  will-change: transform;\r
  display: flex;\r
  align-items: center;\r
  width: 240px;\r
  height: 320px;\r
  background: #070221;\r
  border-radius: 2rem;\r
  box-shadow:\r
    1px 1px 0 1px #f9f9fb,\r
    -1px 0 28px 0 rgb(34 33 81 / 1%),\r
    28px 28px 28px 0 rgb(34 33 81 / 25%);\r
  transition:\r
    0.4s ease-in-out transform,\r
    0.3s ease-in-out box-shadow;\r
  color: #fff;\r
}\r
\r
.isometricCard:hover {\r
  transform: translate3d(0, -16px, 0) rotateX(51deg) rotateZ(43deg);\r
  box-shadow:\r
    1px 1px 0 1px #f9f9fb,\r
    -1px 0 28px 0 rgb(34 33 81 / 1%),\r
    54px 54px 28px -10px rgb(34 33 81 / 15%);\r
}\r
\r
.isometricCard p {\r
  margin: 0 36px;\r
  text-align: center;\r
  font-size: 20px;\r
  line-height: 1.4;\r
}\r
`],sourceRoot:""}]),i.locals={isometricCard:"isometricCard--mEKMm"},n.A=i},91869:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.hoverRotate--ew29g {\r
  overflow: hidden;\r
  background-color: #000;\r
  color: #fff;\r
  display: inline-block;\r
  max-width: 300px;\r
  min-width: 160px;\r
  position: relative;\r
  width: 100%;\r
}\r
\r
.hoverRotate--ew29g * {\r
  box-sizing: border-box;\r
  transition: all 0.45s ease;\r
}\r
\r
.hoverRotate--ew29g::before,\r
.hoverRotate--ew29g::after {\r
  background-color: rgb(0 0 0 / 50%);\r
  border-top: 32px solid rgb(0 0 0 / 50%);\r
  border-bottom: 32px solid rgb(0 0 0 / 50%);\r
  position: absolute;\r
  inset: 0;\r
  content: '';\r
  transition: all 0.3s ease;\r
  z-index: 1;\r
  opacity: 0;\r
  transform: scaleY(2);\r
}\r
\r
.hoverRotate--ew29g img {\r
  vertical-align: top;\r
  -webkit-backface-visibility: hidden;\r
          backface-visibility: hidden;\r
  transition: all 0.3s;\r
  box-sizing: border-box;\r
  max-width: 100%;\r
}\r
\r
.hoverRotate--ew29g img::before {\r
  content: 'Sorry, this image is unavailable.';\r
  display: block;\r
  margin-bottom: 8px;\r
}\r
\r
.hoverRotate--ew29g img::after {\r
  content: '(url: ' attr(src) ')';\r
  display: block;\r
  font-size: 12px;\r
}\r
\r
.hoverRotate--ew29g:hover img {\r
  transform: scale(1.3) rotate(5deg);\r
}\r
\r
.hoverRotate--ew29g figcaption {\r
  position: absolute;\r
  inset: 0;\r
  align-items: center;\r
  display: flex;\r
  flex-direction: column;\r
  justify-content: center;\r
  line-height: 1.1em;\r
  opacity: 0;\r
  z-index: 2;\r
  transition-delay: 0.1s;\r
  font-size: 24px;\r
  font-family: sans-serif;\r
  font-weight: 400;\r
  letter-spacing: 1px;\r
  text-transform: uppercase;\r
}\r
\r
.hoverRotate--ew29g:hover::before,\r
.hoverRotate--ew29g:hover::after {\r
  transform: scale(1);\r
  opacity: 1;\r
}\r
\r
.hoverRotate--ew29g:hover > img {\r
  opacity: 0.7;\r
}\r
\r
.hoverRotate--ew29g:hover figcaption {\r
  opacity: 1;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/LazyLoadImage/index.module.less"],names:[],mappings:"AAAA;EACE,gBAAgB;EAChB,sBAAsB;EACtB,WAAW;EACX,qBAAqB;EACrB,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,sBAAsB;EACtB,0BAA0B;AAC5B;;AAEA;;EAEE,kCAAkC;EAClC,uCAAuC;EACvC,0CAA0C;EAC1C,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,yBAAyB;EACzB,UAAU;EACV,UAAU;EACV,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;EACnB,mCAA2B;UAA3B,2BAA2B;EAC3B,oBAAoB;EACpB,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,4CAA4C;EAC5C,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,+BAA+B;EAC/B,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,kBAAkB;EAClB,UAAU;EACV,UAAU;EACV,sBAAsB;EACtB,eAAe;EACf,uBAAuB;EACvB,gBAAgB;EAChB,mBAAmB;EACnB,yBAAyB;AAC3B;;AAEA;;EAEE,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,UAAU;AACZ",sourcesContent:[`.hoverRotate {\r
  overflow: hidden;\r
  background-color: #000;\r
  color: #fff;\r
  display: inline-block;\r
  max-width: 300px;\r
  min-width: 160px;\r
  position: relative;\r
  width: 100%;\r
}\r
\r
.hoverRotate * {\r
  box-sizing: border-box;\r
  transition: all 0.45s ease;\r
}\r
\r
.hoverRotate::before,\r
.hoverRotate::after {\r
  background-color: rgb(0 0 0 / 50%);\r
  border-top: 32px solid rgb(0 0 0 / 50%);\r
  border-bottom: 32px solid rgb(0 0 0 / 50%);\r
  position: absolute;\r
  inset: 0;\r
  content: '';\r
  transition: all 0.3s ease;\r
  z-index: 1;\r
  opacity: 0;\r
  transform: scaleY(2);\r
}\r
\r
.hoverRotate img {\r
  vertical-align: top;\r
  backface-visibility: hidden;\r
  transition: all 0.3s;\r
  box-sizing: border-box;\r
  max-width: 100%;\r
}\r
\r
.hoverRotate img::before {\r
  content: 'Sorry, this image is unavailable.';\r
  display: block;\r
  margin-bottom: 8px;\r
}\r
\r
.hoverRotate img::after {\r
  content: '(url: ' attr(src) ')';\r
  display: block;\r
  font-size: 12px;\r
}\r
\r
.hoverRotate:hover img {\r
  transform: scale(1.3) rotate(5deg);\r
}\r
\r
.hoverRotate figcaption {\r
  position: absolute;\r
  inset: 0;\r
  align-items: center;\r
  display: flex;\r
  flex-direction: column;\r
  justify-content: center;\r
  line-height: 1.1em;\r
  opacity: 0;\r
  z-index: 2;\r
  transition-delay: 0.1s;\r
  font-size: 24px;\r
  font-family: sans-serif;\r
  font-weight: 400;\r
  letter-spacing: 1px;\r
  text-transform: uppercase;\r
}\r
\r
.hoverRotate:hover::before,\r
.hoverRotate:hover::after {\r
  transform: scale(1);\r
  opacity: 1;\r
}\r
\r
.hoverRotate:hover > img {\r
  opacity: 0.7;\r
}\r
\r
.hoverRotate:hover figcaption {\r
  opacity: 1;\r
}\r
`],sourceRoot:""}]),i.locals={hoverRotate:"hoverRotate--ew29g"},n.A=i},22211:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.lineBordered--bh05r {
  border: none;
  outline: none;
  position: relative;
}

.lineBordered--bh05r::before,
.lineBordered--bh05r::after {
  border: 0 solid transparent;
  transition: all 0.3s;
  content: '';
  height: 0;
  position: absolute;
  width: 24px;
}

.lineBordered--bh05r::before {
  border-top: 2px solid #4f7df3;
  right: 0;
  top: -4px;
}

.lineBordered--bh05r::after {
  border-bottom: 2px solid #4f7df3;
  bottom: -4px;
  left: 0;
}

.lineBordered--bh05r:hover::before,
.lineBordered--bh05r:hover::after {
  width: 100%;
}

.hover-underline-animation--TSfGP {
  display: inline-block;
  position: relative;
}

.hover-underline-animation--TSfGP::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation--TSfGP:hover::after {
  transform: scaleX(1);
}

.hover-underline-animation--TSfGP.left--ErwKf::after {
  transform-origin: bottom right;
}

.hover-underline-animation--TSfGP.left--ErwKf:hover::after {
  transform-origin: bottom left;
}

.hover-underline-animation--TSfGP.center--BFLFI::after {
  transform-origin: bottom center;
}

.hover-underline-animation--TSfGP.center--BFLFI:hover::after {
  transform-origin: bottom center;
}

.hover-underline-animation--TSfGP.right--DRVwU::after {
  transform-origin: bottom left;
}

.hover-underline-animation--TSfGP.right--DRVwU:hover::after {
  transform-origin: bottom right;
}

.dynamic-shadow--Us2nj {
  position: relative;
  width: 10rem;
  height: 10rem;
  background: linear-gradient(75deg, #f953c6, #b91d73);
}

.dynamic-shadow--Us2nj::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: inherit;
  top: 0.5rem;
  filter: blur(0.4rem);
  opacity: 0.7;
  z-index: -1;
}

.image-contain--Z_yfM {
  object-fit: contain;
  object-position: center;
}

.image-cover--ZVSiS {
  object-fit: cover;
  object-position: right top;
}

.image-cover--ZVSiS p:first-child::first-letter {
  color: #5f79ff;
  float: left;
  margin: 0 8px 0 4px;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
}

.container--lADY1 {
  position: relative;
  background: #fff;
  padding: 15px;
  border: 1px solid #ccc;
  margin-top: 20px;
  border-radius: 8px;
  text-align: center;
}

.container--lADY1::before,
.container--lADY1::after {
  content: '';
  position: absolute;
  border: 11px solid transparent;
}

.container--lADY1::after {
  border: 10px solid transparent;
}

.container--lADY1.top--XQMfF::before,
.container--lADY1.top--XQMfF::after {
  bottom: 100%;
  left: 19px;
  border-bottom-color: #ccc;
}

.container--lADY1.top--XQMfF::after {
  left: 20px;
  border-bottom-color: #fff;
}

.container--lADY1.bottom--P1bZI::before,
.container--lADY1.bottom--P1bZI::after {
  top: 100%;
  right: 19px;
  border-top-color: #ccc;
}

.container--lADY1.bottom--P1bZI::after {
  right: 20px;
  border-top-color: #fff;
}

.no-scrollbars--AUOMQ {
  overflow: auto;
  scrollbar-width: none;
}

.no-scrollbars--AUOMQ::-webkit-scrollbar {
  display: none;
}

.engraved-text--dMPwS {
  background-color: #666;
  -webkit-background-clip: text;
          background-clip: text;
  color: transparent;
  text-shadow: 3px 5px 1px rgb(245 245 245 / 50%);
}

.embossed-text--eQZ0_ {
  color: #f0f0f0;
  background-color: #666;
  text-shadow: 1px 4px 4px #555;
  -webkit-background-clip: text;
          background-clip: text;
}

:root {
  /* ease-in corresponds to cubic-bezier(0.42, 0, 1.0, 1.0) */
  --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  --ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  --ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);

  /* ease-out corresponds to cubic-bezier(0, 0, 0.58, 1.0) */
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);

  /* ease-in-out corresponds to cubic-bezier(0.42, 0, 0.58, 1.0) */
  --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
  --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
  --ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
`,"",{version:3,sources:["webpack://./src/components/stateless/LineBordered/index.module.less"],names:[],mappings:"AAAA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB;;AAEA;;EAEE,2BAA2B;EAC3B,oBAAoB;EACpB,WAAW;EACX,SAAS;EACT,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,6BAA6B;EAC7B,QAAQ;EACR,SAAS;AACX;;AAEA;EACE,gCAAgC;EAChC,YAAY;EACZ,OAAO;AACT;;AAEA;;EAEE,WAAW;AACb;;AAEA;EACE,qBAAqB;EACrB,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,WAAW;EACX,oBAAoB;EACpB,WAAW;EACX,SAAS;EACT,OAAO;EACP,yBAAyB;EACzB,oCAAoC;AACtC;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,oDAAoD;AACtD;;AAEA;EACE,WAAW;EACX,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,WAAW;EACX,oBAAoB;EACpB,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,iBAAiB;EACjB,0BAA0B;AAC5B;;AAEA;EACE,cAAc;EACd,WAAW;EACX,mBAAmB;EACnB,eAAe;EACf,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;;EAEE,WAAW;EACX,kBAAkB;EAClB,8BAA8B;AAChC;;AAEA;EACE,8BAA8B;AAChC;;AAEA;;EAEE,YAAY;EACZ,UAAU;EACV,yBAAyB;AAC3B;;AAEA;EACE,UAAU;EACV,yBAAyB;AAC3B;;AAEA;;EAEE,SAAS;EACT,WAAW;EACX,sBAAsB;AACxB;;AAEA;EACE,WAAW;EACX,sBAAsB;AACxB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,sBAAsB;EACtB,6BAAqB;UAArB,qBAAqB;EACrB,kBAAkB;EAClB,+CAA+C;AACjD;;AAEA;EACE,cAAc;EACd,sBAAsB;EACtB,6BAA6B;EAC7B,6BAAqB;UAArB,qBAAqB;AACvB;;AAEA;EACE,2DAA2D;EAC3D,qDAAqD;EACrD,uDAAuD;EACvD,uDAAuD;EACvD,uDAAuD;EACvD,sDAAsD;EACtD,oDAAoD;;EAEpD,0DAA0D;EAC1D,qDAAqD;EACrD,qDAAqD;EACrD,oDAAoD;EACpD,gDAAgD;EAChD,+CAA+C;EAC/C,oDAAoD;;EAEpD,gEAAgE;EAChE,2DAA2D;EAC3D,yDAAyD;EACzD,oDAAoD;EACpD,mDAAmD;EACnD,4CAA4C;EAC5C,0DAA0D;AAC5D",sourcesContent:[`.lineBordered {
  border: none;
  outline: none;
  position: relative;
}

.lineBordered::before,
.lineBordered::after {
  border: 0 solid transparent;
  transition: all 0.3s;
  content: '';
  height: 0;
  position: absolute;
  width: 24px;
}

.lineBordered::before {
  border-top: 2px solid #4f7df3;
  right: 0;
  top: -4px;
}

.lineBordered::after {
  border-bottom: 2px solid #4f7df3;
  bottom: -4px;
  left: 0;
}

.lineBordered:hover::before,
.lineBordered:hover::after {
  width: 100%;
}

.hover-underline-animation {
  display: inline-block;
  position: relative;
}

.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
}

.hover-underline-animation.left::after {
  transform-origin: bottom right;
}

.hover-underline-animation.left:hover::after {
  transform-origin: bottom left;
}

.hover-underline-animation.center::after {
  transform-origin: bottom center;
}

.hover-underline-animation.center:hover::after {
  transform-origin: bottom center;
}

.hover-underline-animation.right::after {
  transform-origin: bottom left;
}

.hover-underline-animation.right:hover::after {
  transform-origin: bottom right;
}

.dynamic-shadow {
  position: relative;
  width: 10rem;
  height: 10rem;
  background: linear-gradient(75deg, #f953c6, #b91d73);
}

.dynamic-shadow::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: inherit;
  top: 0.5rem;
  filter: blur(0.4rem);
  opacity: 0.7;
  z-index: -1;
}

.image-contain {
  object-fit: contain;
  object-position: center;
}

.image-cover {
  object-fit: cover;
  object-position: right top;
}

.image-cover p:first-child::first-letter {
  color: #5f79ff;
  float: left;
  margin: 0 8px 0 4px;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
}

.container {
  position: relative;
  background: #fff;
  padding: 15px;
  border: 1px solid #ccc;
  margin-top: 20px;
  border-radius: 8px;
  text-align: center;
}

.container::before,
.container::after {
  content: '';
  position: absolute;
  border: 11px solid transparent;
}

.container::after {
  border: 10px solid transparent;
}

.container.top::before,
.container.top::after {
  bottom: 100%;
  left: 19px;
  border-bottom-color: #ccc;
}

.container.top::after {
  left: 20px;
  border-bottom-color: #fff;
}

.container.bottom::before,
.container.bottom::after {
  top: 100%;
  right: 19px;
  border-top-color: #ccc;
}

.container.bottom::after {
  right: 20px;
  border-top-color: #fff;
}

.no-scrollbars {
  overflow: auto;
  scrollbar-width: none;
}

.no-scrollbars::-webkit-scrollbar {
  display: none;
}

.engraved-text {
  background-color: #666;
  background-clip: text;
  color: transparent;
  text-shadow: 3px 5px 1px rgb(245 245 245 / 50%);
}

.embossed-text {
  color: #f0f0f0;
  background-color: #666;
  text-shadow: 1px 4px 4px #555;
  background-clip: text;
}

:root {
  /* ease-in corresponds to cubic-bezier(0.42, 0, 1.0, 1.0) */
  --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  --ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  --ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);

  /* ease-out corresponds to cubic-bezier(0, 0, 0.58, 1.0) */
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);

  /* ease-in-out corresponds to cubic-bezier(0.42, 0, 0.58, 1.0) */
  --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
  --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
  --ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
`],sourceRoot:""}]),i.locals={lineBordered:"lineBordered--bh05r","hover-underline-animation":"hover-underline-animation--TSfGP",hoverUnderlineAnimation:"hover-underline-animation--TSfGP",left:"left--ErwKf",center:"center--BFLFI",right:"right--DRVwU","dynamic-shadow":"dynamic-shadow--Us2nj",dynamicShadow:"dynamic-shadow--Us2nj","image-contain":"image-contain--Z_yfM",imageContain:"image-contain--Z_yfM","image-cover":"image-cover--ZVSiS",imageCover:"image-cover--ZVSiS",container:"container--lADY1",top:"top--XQMfF",bottom:"bottom--P1bZI","no-scrollbars":"no-scrollbars--AUOMQ",noScrollbars:"no-scrollbars--AUOMQ","engraved-text":"engraved-text--dMPwS",engravedText:"engraved-text--dMPwS","embossed-text":"embossed-text--eQZ0_",embossedText:"embossed-text--eQZ0_"},n.A=i},38791:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.background--V0AeH {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  background-color: #ff99df;\r
  background-image: radial-gradient(circle at 52% 73%, hsl(310deg 85% 67% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 0% 30%, hsl(197deg 90% 76% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 41% 26%, hsl(234deg 79% 69% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 41% 51%, hsl(41deg 70% 63% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 41% 88%, hsl(36deg 83% 61% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 76% 73%, hsl(346deg 69% 70% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 29% 37%, hsl(272deg 96% 64% / 100%) 0, transparent 50%);\r
  background-size: 150% 150%;\r
  filter: blur(10px);\r
  animation: move-background--h74DC 10s linear infinite;\r
}\r
\r
@keyframes move-background--h74DC {\r
  0% {\r
    background-size: 100% 100%;\r
  }\r
\r
  10% {\r
    background-size: 120% 80%;\r
  }\r
\r
  20% {\r
    background-size: 190% 140%;\r
  }\r
\r
  30% {\r
    background-size: 130% 110%;\r
  }\r
\r
  40% {\r
    background-size: 150% 120%;\r
  }\r
\r
  50% {\r
    background-size: 180% 100%;\r
  }\r
\r
  60% {\r
    background-size: 220% 80%;\r
  }\r
\r
  70% {\r
    background-size: 100% 50%;\r
  }\r
\r
  80% {\r
    background-size: 120% 70%;\r
  }\r
\r
  90% {\r
    background-size: 110% 90%;\r
  }\r
\r
  100% {\r
    background-size: 100% 100%;\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/MeshGradientBackground/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB;;;;;;qFAMmF;EACnF,0BAA0B;EAC1B,kBAAkB;EAClB,qDAA8C;AAChD;;AAEA;EACE;IACE,0BAA0B;EAC5B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,0BAA0B;EAC5B;AACF",sourcesContent:[`.background {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  background-color: #ff99df;\r
  background-image: radial-gradient(circle at 52% 73%, hsl(310deg 85% 67% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 0% 30%, hsl(197deg 90% 76% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 41% 26%, hsl(234deg 79% 69% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 41% 51%, hsl(41deg 70% 63% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 41% 88%, hsl(36deg 83% 61% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 76% 73%, hsl(346deg 69% 70% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 29% 37%, hsl(272deg 96% 64% / 100%) 0, transparent 50%);\r
  background-size: 150% 150%;\r
  filter: blur(10px);\r
  animation: move-background 10s linear infinite;\r
}\r
\r
@keyframes move-background {\r
  0% {\r
    background-size: 100% 100%;\r
  }\r
\r
  10% {\r
    background-size: 120% 80%;\r
  }\r
\r
  20% {\r
    background-size: 190% 140%;\r
  }\r
\r
  30% {\r
    background-size: 130% 110%;\r
  }\r
\r
  40% {\r
    background-size: 150% 120%;\r
  }\r
\r
  50% {\r
    background-size: 180% 100%;\r
  }\r
\r
  60% {\r
    background-size: 220% 80%;\r
  }\r
\r
  70% {\r
    background-size: 100% 50%;\r
  }\r
\r
  80% {\r
    background-size: 120% 70%;\r
  }\r
\r
  90% {\r
    background-size: 110% 90%;\r
  }\r
\r
  100% {\r
    background-size: 100% 100%;\r
  }\r
}\r
`],sourceRoot:""}]),i.locals={background:"background--V0AeH","move-background":"move-background--h74DC",moveBackground:"move-background--h74DC"},n.A=i},6988:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.markdownBody--xUrgB {\r
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
`],sourceRoot:""}]),i.locals={markdownBody:"markdownBody--xUrgB",loadingIcon:"loadingIcon--VpAmv",copySection:"copySection--aJHtb",lang:"lang--SO0lS",copySpan:"copySpan--u4qzC",preCode:"preCode--s6faO"},n.A=i},96657:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.warpper--lLZe7 {\r
  font-family: sans-serif;\r
  text-align: center;\r
}\r
\r
.pre--MB0A4 {\r
  text-align: left;\r
  padding: 0.5em;\r
  overflow: auto;\r
\r
  & .token-line--ZnLJw {\r
    line-height: 1.3em;\r
    height: 1.3em;\r
  }\r
}\r
\r
.line--aPWRo {\r
  padding-right: 0.5em;\r
}\r
\r
.line-no--Rk8t7 {\r
  text-align: right;\r
  padding-right: 1em;\r
  -webkit-user-select: none;\r
      -ms-user-select: none;\r
          user-select: none;\r
  opacity: 0.5;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/ShiCode/index.module.less"],names:[],mappings:"AAAA;EACE,uBAAuB;EACvB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,cAAc;EACd,cAAc;;EAEd;IACE,kBAAkB;IAClB,aAAa;EACf;AACF;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,yBAAiB;MAAjB,qBAAiB;UAAjB,iBAAiB;EACjB,YAAY;AACd",sourcesContent:[`.warpper {\r
  font-family: sans-serif;\r
  text-align: center;\r
}\r
\r
.pre {\r
  text-align: left;\r
  padding: 0.5em;\r
  overflow: auto;\r
\r
  & .token-line {\r
    line-height: 1.3em;\r
    height: 1.3em;\r
  }\r
}\r
\r
.line {\r
  padding-right: 0.5em;\r
}\r
\r
.line-no {\r
  text-align: right;\r
  padding-right: 1em;\r
  user-select: none;\r
  opacity: 0.5;\r
}\r
`],sourceRoot:""}]),i.locals={warpper:"warpper--lLZe7",pre:"pre--MB0A4","token-line":"token-line--ZnLJw",tokenLine:"token-line--ZnLJw",line:"line--aPWRo","line-no":"line-no--Rk8t7",lineNo:"line-no--Rk8t7"},n.A=i},41742:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`/* Perspective card */\r
.perspective-card--fRasE {\r
  transform: perspective(1500px) rotateY(15deg);\r
  transition: transform 1s ease 0s;\r
}\r
\r
.perspective-card--fRasE:hover {\r
  transform: perspective(3000px) rotateY(5deg);\r
}\r
\r
/* Base card styles */\r
.shiftingCard--ejZ4B {\r
  position: relative;\r
  display: inline-block;\r
  box-sizing: border-box;\r
  height: 360px;\r
  width: 240px;\r
  padding: 8px;\r
  border-radius: 1rem;\r
  box-shadow: rgb(0 0 0 / 25%) 0 25px 50px -12px;\r
  background-size: cover;\r
  transform: rotateX(calc(10deg * 0)) rotateY(calc(10deg * 0));\r
  transform: rotateX(calc(10deg * var(--dx, 0))) rotateY(calc(10deg * var(--dy, 0)));\r
  transition: transform 0.2s ease-out;\r
  background-image: url('https://picsum.photos/id/1018/480/720');\r
\r
  &::before {\r
    content: '';\r
    position: absolute;\r
    top: 0;\r
    left: 0;\r
    width: 100%;\r
    height: 100%;\r
    background: rgb(0 0 0 / 10%);\r
    opacity: 0;\r
    transition: opacity 0.1s ease;\r
  }\r
\r
  h3 {\r
    width: 100px;\r
    height: 30px;\r
    line-height: 30px;\r
    border-radius: 10px;\r
    text-align: center;\r
    margin-top: 95%;\r
    margin-left: 25%;\r
    color: #000;\r
    background: #fff;\r
  }\r
}\r
\r
.cardAnimation--uMV0q {\r
  &:hover::before {\r
    opacity: 1;\r
  }\r
\r
  &:not(:hover)::before {\r
    opacity: 0;\r
  }\r
\r
  &:hover {\r
    transform: translate(calc(var(--dx) * 10px), calc(var(--dy) * 10px));\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/ShiftingCard/index.module.less"],names:[],mappings:"AAAA,qBAAqB;AACrB;EACE,6CAA6C;EAC7C,gCAAgC;AAClC;;AAEA;EACE,4CAA4C;AAC9C;;AAEA,qBAAqB;AACrB;EACE,kBAAkB;EAClB,qBAAqB;EACrB,sBAAsB;EACtB,aAAa;EACb,YAAY;EACZ,YAAY;EACZ,mBAAmB;EACnB,8CAA8C;EAC9C,sBAAsB;EACtB,4DAAkF;EAAlF,kFAAkF;EAClF,mCAAmC;EACnC,8DAA8D;;EAE9D;IACE,WAAW;IACX,kBAAkB;IAClB,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;IACZ,4BAA4B;IAC5B,UAAU;IACV,6BAA6B;EAC/B;;EAEA;IACE,YAAY;IACZ,YAAY;IACZ,iBAAiB;IACjB,mBAAmB;IACnB,kBAAkB;IAClB,eAAe;IACf,gBAAgB;IAChB,WAAW;IACX,gBAAgB;EAClB;AACF;;AAEA;EACE;IACE,UAAU;EACZ;;EAEA;IACE,UAAU;EACZ;;EAEA;IACE,oEAAoE;EACtE;AACF",sourcesContent:[`/* Perspective card */\r
.perspective-card {\r
  transform: perspective(1500px) rotateY(15deg);\r
  transition: transform 1s ease 0s;\r
}\r
\r
.perspective-card:hover {\r
  transform: perspective(3000px) rotateY(5deg);\r
}\r
\r
/* Base card styles */\r
.shiftingCard {\r
  position: relative;\r
  display: inline-block;\r
  box-sizing: border-box;\r
  height: 360px;\r
  width: 240px;\r
  padding: 8px;\r
  border-radius: 1rem;\r
  box-shadow: rgb(0 0 0 / 25%) 0 25px 50px -12px;\r
  background-size: cover;\r
  transform: rotateX(calc(10deg * var(--dx, 0))) rotateY(calc(10deg * var(--dy, 0)));\r
  transition: transform 0.2s ease-out;\r
  background-image: url('https://picsum.photos/id/1018/480/720');\r
\r
  &::before {\r
    content: '';\r
    position: absolute;\r
    top: 0;\r
    left: 0;\r
    width: 100%;\r
    height: 100%;\r
    background: rgb(0 0 0 / 10%);\r
    opacity: 0;\r
    transition: opacity 0.1s ease;\r
  }\r
\r
  h3 {\r
    width: 100px;\r
    height: 30px;\r
    line-height: 30px;\r
    border-radius: 10px;\r
    text-align: center;\r
    margin-top: 95%;\r
    margin-left: 25%;\r
    color: #000;\r
    background: #fff;\r
  }\r
}\r
\r
.cardAnimation {\r
  &:hover::before {\r
    opacity: 1;\r
  }\r
\r
  &:not(:hover)::before {\r
    opacity: 0;\r
  }\r
\r
  &:hover {\r
    transform: translate(calc(var(--dx) * 10px), calc(var(--dy) * 10px));\r
  }\r
}\r
`],sourceRoot:""}]),i.locals={"perspective-card":"perspective-card--fRasE",perspectiveCard:"perspective-card--fRasE",shiftingCard:"shiftingCard--ejZ4B",cardAnimation:"cardAnimation--uMV0q"},n.A=i},62264:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.cardEffect--cZUTZ {\r
  position: relative;\r
  overflow: hidden;\r
  border-radius: 8px;\r
  border: 1px solid #1e293b;\r
  background-image: linear-gradient(to right, #1e293b, #06171b);\r
  padding: 1px;\r
}\r
\r
.spotlight--GQ6XV {\r
  pointer-events: none;\r
  position: absolute;\r
  inset: 0;\r
  opacity: 0;\r
  transition: opacity 300ms;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/Spotlight/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,6DAA6D;EAC7D,YAAY;AACd;;AAEA;EACE,oBAAoB;EACpB,kBAAkB;EAClB,QAAQ;EACR,UAAU;EACV,yBAAyB;AAC3B",sourcesContent:[`.cardEffect {\r
  position: relative;\r
  overflow: hidden;\r
  border-radius: 8px;\r
  border: 1px solid #1e293b;\r
  background-image: linear-gradient(to right, #1e293b, #06171b);\r
  padding: 1px;\r
}\r
\r
.spotlight {\r
  pointer-events: none;\r
  position: absolute;\r
  inset: 0;\r
  opacity: 0;\r
  transition: opacity 300ms;\r
}\r
`],sourceRoot:""}]),i.locals={cardEffect:"cardEffect--cZUTZ",spotlight:"spotlight--GQ6XV"},n.A=i},97331:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.mask--LIqkO {\r
  width: 100%;\r
  height: 100%;\r
  position: absolute;\r
  left: 0;\r
  top: 0;\r
  z-index: 10;\r
  background-image: linear-gradient(\r
    270deg,\r
    hsl(0deg 0% 100%) 0,\r
    hsl(0deg 0% 100%) 5%,\r
    rgb(17 23 41 / 0%) 49.8%,\r
    hsl(0deg 0% 100%) 95%,\r
    hsl(0deg 0% 100%) 100%\r
  );\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/TagCloud/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,OAAO;EACP,MAAM;EACN,WAAW;EACX;;;;;;;GAOC;AACH",sourcesContent:[`.mask {\r
  width: 100%;\r
  height: 100%;\r
  position: absolute;\r
  left: 0;\r
  top: 0;\r
  z-index: 10;\r
  background-image: linear-gradient(\r
    270deg,\r
    hsl(0deg 0% 100%) 0,\r
    hsl(0deg 0% 100%) 5%,\r
    rgb(17 23 41 / 0%) 49.8%,\r
    hsl(0deg 0% 100%) 95%,\r
    hsl(0deg 0% 100%) 100%\r
  );\r
}\r
`],sourceRoot:""}]),i.locals={mask:"mask--LIqkO"},n.A=i},38413:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.typedCursorBlink--bnrB1 {\r
  opacity: 1;\r
  animation: typed-blink--GZUvL 0.7s infinite;\r
}\r
\r
@keyframes typed-blink--GZUvL {\r
  50% {\r
    opacity: 0;\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/TypedText/index.module.less"],names:[],mappings:"AAAA;EACE,UAAU;EACV,2CAAoC;AACtC;;AAEA;EACE;IACE,UAAU;EACZ;AACF",sourcesContent:[`.typedCursorBlink {\r
  opacity: 1;\r
  animation: typed-blink 0.7s infinite;\r
}\r
\r
@keyframes typed-blink {\r
  50% {\r
    opacity: 0;\r
  }\r
}\r
`],sourceRoot:""}]),i.locals={typedCursorBlink:"typedCursorBlink--bnrB1","typed-blink":"typed-blink--GZUvL",typedBlink:"typed-blink--GZUvL"},n.A=i},37318:function(B,n,e){"use strict";var o=e(71354),s=e.n(o),u=e(76314),t=e.n(u),i=t()(s());i.push([B.id,`.avatar--tAk6h {\r
  animation: levitate--RZCwS 10s ease 1s infinite reverse;\r
}\r
\r
@keyframes levitate--RZCwS {\r
  0% {\r
    transform: translateY(0);\r
  }\r
\r
  30% {\r
    transform: translateY(-10px);\r
  }\r
\r
  50% {\r
    transform: translateY(4px);\r
  }\r
\r
  70% {\r
    transform: translateY(-15px);\r
  }\r
\r
  100% {\r
    transform: translateY(0);\r
  }\r
}\r
\r
.maskBox--uAYjJ {\r
  width: 100px;\r
  height: 40px;\r
  background: darkcyan;\r
  text-align: center;\r
  line-height: 40px;\r
  color: #fff;\r
  font-size: 18px;\r
  position: relative;\r
  -webkit-mask: radial-gradient(8px at 10px 10px, transparent 98%, black) -10px -10px;\r
          mask: radial-gradient(8px at 10px 10px, transparent 98%, black) -10px -10px;\r
}\r
\r
.watermark--YUolT {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
  font-size: 18px;\r
  color: rgb(0 0 0 / 20%);\r
  white-space: nowrap;\r
  pointer-events: none;\r
}\r
\r
.blend-me--f5L11 {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
  color: #fff;\r
  text-align: center;\r
  font-size: 18px;\r
  font-weight: bold;\r
  mix-blend-mode: overlay;\r
  transition: 0.3s cubic-bezier(0.25, 0.25, 0.33, 1.33);\r
  animation: move-me--FUPwc 8s ease-out infinite alternate;\r
}\r
\r
@keyframes move-me--FUPwc {\r
  to {\r
    transform: translateY(50px);\r
  }\r
}\r
\r
.button--GgsIa {\r
  background: transparent;\r
  padding: 0.5rem 1rem;\r
  background-image: linear-gradient(90deg, white, white),\r
    linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));\r
  background-clip: padding-box, border-box;\r
  background-origin: border-box;\r
  border: 5px solid transparent;\r
  border-radius: 1.75rem;\r
}\r
\r
.button-label--d_jxl {\r
  background-image: linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));\r
  -webkit-background-clip: text;\r
          background-clip: text;\r
  color: transparent;\r
  font-weight: 600;\r
  font-size: 1.25rem;\r
  line-height: 1.5rem;\r
}\r
\r
.circle-1--kJj6k {\r
  position: absolute;\r
  width: 20px;\r
  height: 20px;\r
  border-radius: 50%;\r
  top: calc(-10px);\r
  left: calc(-10px);\r
  animation: expand--kmoUS 6s ease-out infinite both;\r
  animation-play-state: running;\r
  animation-delay: 1s;\r
  border: 1.5px solid rgb(121 40 202 / 40%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 40%) 40%, #000 100%);\r
}\r
\r
.circle-2--YMeVl {\r
  position: absolute;\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 50%;\r
  top: calc(-20px);\r
  left: calc(-20px);\r
  animation: expand-opacity--XzitQ 6s linear infinite both;\r
  animation-play-state: running;\r
  animation-delay: 0.5s;\r
  border: 1px solid rgb(121 40 202 / 40%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 30%) 20%, #000 100%);\r
}\r
\r
.circle-3--DvCUJ {\r
  position: absolute;\r
  width: 60px;\r
  height: 60px;\r
  border-radius: 50%;\r
  top: calc(-30px);\r
  left: calc(-30px);\r
  animation: expand-opacity--XzitQ 6s linear infinite both;\r
  animation-play-state: running;\r
  animation-delay: 1s;\r
  border: 1px solid rgb(121 40 202 / 30%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 20%) 20%, #000 100%);\r
}\r
\r
.circle-4--UkUyn {\r
  position: absolute;\r
  width: 80px;\r
  height: 80px;\r
  border-radius: 50%;\r
  top: calc(-40px);\r
  left: calc(-40px);\r
  animation: expand-opacity--XzitQ 6s linear infinite both;\r
  animation-play-state: running;\r
  animation-delay: 1.5s;\r
  border: 1px solid rgb(121 40 202 / 20%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 10%) 20%, #000 100%);\r
}\r
\r
@keyframes expand--kmoUS {\r
  0% {\r
    transform: scale(1);\r
  }\r
\r
  50% {\r
    transform: scale(1.2);\r
  }\r
\r
  100% {\r
    transform: scale(1);\r
  }\r
}\r
\r
@keyframes expand-opacity--XzitQ {\r
  0% {\r
    opacity: 0;\r
    transform: scale(1);\r
  }\r
\r
  50% {\r
    opacity: 1;\r
    transform: scale(1.3);\r
  }\r
\r
  100% {\r
    opacity: 0;\r
    transform: scale(1.295);\r
  }\r
}\r
\r
.line--Lp5NS {\r
  height: 2px;\r
  width: 360px;\r
  background-image: linear-gradient(97deg, #0096ff, #bb64ff 42%, #f2416b 74%, #eb7500);\r
}\r
\r
.eHElAY--ul0hZ {\r
  cursor: pointer;\r
  display: inline-block;\r
  margin-bottom: 1rem;\r
  font-size: 1.1rem;\r
  height: 2.8rem;\r
  letter-spacing: 0.1rem;\r
  line-height: 2.8rem;\r
  padding: 0 1.8rem;\r
  text-align: center;\r
  text-decoration: none;\r
  white-space: nowrap;\r
  position: relative;\r
  z-index: 0;\r
  color: rgb(255 255 255);\r
  border-color: transparent;\r
\r
  &::before {\r
    content: '';\r
    position: absolute;\r
    top: -2px;\r
    left: -2px;\r
    z-index: -1;\r
    filter: blur(5px);\r
    width: calc(100% + 4px);\r
    height: calc(100% + 4px);\r
    animation-timeline: auto;\r
    animation-range-start: normal;\r
    animation-range-end: normal;\r
    opacity: 1;\r
    background: linear-gradient(\r
        45deg,\r
        rgb(255 0 0),\r
        rgb(255 115 0),\r
        rgb(255 251 0),\r
        rgb(72 255 0),\r
        rgb(0 255 213),\r
        rgb(0 43 255),\r
        rgb(122 0 255),\r
        rgb(255 0 200),\r
        rgb(255 0 0)\r
      )\r
      0% 0% / 400%;\r
    animation: 20s linear 0s infinite normal none running dv-wu--sf_Ta;\r
    transition: opacity 0.3s ease-in-out;\r
  }\r
\r
  &::after {\r
    z-index: -1;\r
    content: '';\r
    position: absolute;\r
    width: 100%;\r
    height: 100%;\r
    background: rgb(17 17 17);\r
    left: 0;\r
    top: 0;\r
  }\r
}\r
\r
@keyframes dv-wu--sf_Ta {\r
  0% {\r
    background-position: 0 0;\r
  }\r
\r
  50% {\r
    background-position: 400% 0;\r
  }\r
\r
  100% {\r
    background-position: 0 0;\r
  }\r
}\r
\r
.stages--wh47k {\r
  position: relative;\r
  height: 74px;\r
\r
  .cubeSpinner--eOJc0 {\r
    color: #42745a;\r
    animation-name: spin-cube--eXtsy;\r
    animation-timing-function: ease-in-out;\r
    animation-iteration-count: infinite;\r
    animation-duration: 8s;\r
    transform-style: preserve-3d;\r
    transform-origin: 40px 40px 0;\r
    line-height: 1.3em;\r
    font-size: 64px;\r
\r
    span {\r
      position: absolute;\r
      width: 100%;\r
      -webkit-backface-visibility: hidden;\r
              backface-visibility: hidden;\r
    }\r
\r
    .face1--KIPp1 {\r
      transform: translateZ(40px);\r
    }\r
\r
    .face2--aYKpi {\r
      transform: rotateX(240deg) translateZ(40px);\r
    }\r
\r
    .face3--M7CTV {\r
      transform: rotateX(120deg) translateZ(40px);\r
    }\r
  }\r
}\r
\r
@keyframes spin-cube--eXtsy {\r
  0% {\r
    transform: rotateX(0deg);\r
  }\r
\r
  15% {\r
    transform: rotateX(0deg);\r
  }\r
\r
  25% {\r
    transform: rotateX(120deg);\r
  }\r
\r
  40% {\r
    transform: rotateX(120deg);\r
  }\r
\r
  50% {\r
    transform: rotateX(240deg);\r
  }\r
\r
  65% {\r
    transform: rotateX(240deg);\r
  }\r
\r
  75% {\r
    transform: rotateX(240deg);\r
  }\r
\r
  90% {\r
    transform: rotateX(1turn);\r
  }\r
\r
  100% {\r
    transform: rotateX(1turn);\r
  }\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz {\r
  box-shadow: 0 6px 10px rgb(0 0 0 / 20%);\r
  position: relative;\r
  display: inline-block;\r
  transform: translateY(-50%);\r
  width: 40px;\r
  height: 40px;\r
  line-height: 40px;\r
  text-align: center;\r
  background-color: #1d5fca;\r
  border-radius: 50%;\r
  color: #fff;\r
  font-size: 20px;\r
  z-index: 1;\r
  margin-left: auto;\r
  margin-right: auto;\r
  cursor: pointer;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz::after,\r
.video-box--RWlhc .video-btn--PPzlz::before {\r
  content: '';\r
  display: block;\r
  position: absolute;\r
  inset: 0;\r
  z-index: -1;\r
  border-radius: 50%;\r
  border: 1px solid #1d5fca;\r
  transition: 0.5s;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz i {\r
  z-index: 1;\r
  margin-left: auto;\r
  margin-right: auto;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz::before {\r
  animation: ripple--Ojifa 2s linear infinite;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz::after {\r
  animation: ripple--Ojifa 2s linear 1s infinite;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz:focus,\r
.video-box--RWlhc .video-btn--PPzlz:hover {\r
  background-color: #2d995d;\r
  color: #fff;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz:focus::after,\r
.video-box--RWlhc .video-btn--PPzlz:focus::before,\r
.video-box--RWlhc .video-btn--PPzlz:hover::after,\r
.video-box--RWlhc .video-btn--PPzlz:hover::before {\r
  border-color: #2d995d;\r
}\r
\r
@keyframes ripple--Ojifa {\r
  0% {\r
    transform: scale(1);\r
  }\r
\r
  75% {\r
    transform: scale(1.75);\r
    opacity: 1;\r
  }\r
\r
  100% {\r
    transform: scale(2);\r
    opacity: 0;\r
  }\r
}\r
\r
@keyframes effect-1--LXEum {\r
  0% {\r
    text-shadow: 0 0 #32a8a2;\r
  }\r
\r
  40% {\r
    text-shadow: 2px 2px 5px #32a8a2;\r
  }\r
\r
  100% {\r
    text-shadow: 0 0 #32a8a2;\r
  }\r
}\r
\r
.effect--mKRM4 {\r
  animation: effect-1--LXEum 1s linear infinite;\r
  color: white;\r
  font-size: 48px;\r
}\r
\r
.dotMask--sy6CL {\r
  position: absolute;\r
  inset: 0;\r
  height: 100%;\r
  width: 100%;\r
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);\r
  background-size: 16px 16px;\r
  -webkit-mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%);\r
          mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%);\r
}\r
\r
.dot--jqRVx {\r
  position: absolute;\r
  inset: 0;\r
  height: 100%;\r
  width: 100%;\r
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);\r
  background-size: 16px 16px;\r
}\r
\r
.grid--UCn5k {\r
  position: absolute;\r
  inset: 0;\r
  height: 100%;\r
  width: 100%;\r
  background-image: linear-gradient(to right, #80808012 1px, transparent 1px),\r
    linear-gradient(#80808012 1px, transparent 1px);\r
  background-size: 24px 24px;\r
}\r
\r
.box--kP2q7 {\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  padding: 12px;\r
  border: 3px solid #0000;\r
  border-radius: 12px;\r
  background:\r
    linear-gradient(#131219, #131219) padding-box,\r
    linear-gradient(var(--angle), #070707, #687aff) border-box;\r
  animation: 4s rotate--r6Mu6 linear infinite;\r
}\r
\r
@keyframes rotate--r6Mu6 {\r
  to {\r
    --angle: 360deg;\r
  }\r
}\r
\r
@property --angle {\r
  syntax: '<angle>';\r
  initial-value: 0deg;\r
  inherits: false;\r
}\r
`,"",{version:3,sources:["webpack://./src/pages/home/index.module.less"],names:[],mappings:"AAAA;EACE,uDAAgD;AAClD;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,wBAAwB;EAC1B;AACF;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,oBAAoB;EACpB,kBAAkB;EAClB,iBAAiB;EACjB,WAAW;EACX,eAAe;EACf,kBAAkB;EAClB,mFAA2E;UAA3E,2EAA2E;AAC7E;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,WAAW;EACX,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,qDAAqD;EACrD,wDAAiD;AACnD;;AAEA;EACE;IACE,2BAA2B;EAC7B;AACF;;AAEA;EACE,uBAAuB;EACvB,oBAAoB;EACpB;oEACkE;EAClE,wCAAwC;EACxC,6BAA6B;EAC7B,6BAA6B;EAC7B,sBAAsB;AACxB;;AAEA;EACE,kFAAkF;EAClF,6BAAqB;UAArB,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,kDAA2C;EAC3C,6BAA6B;EAC7B,mBAAmB;EACnB,yCAAyC;EACzC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,qBAAqB;EACrB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,mBAAmB;EACnB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,qBAAqB;EACrB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,qBAAqB;EACvB;;EAEA;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE;IACE,UAAU;IACV,mBAAmB;EACrB;;EAEA;IACE,UAAU;IACV,qBAAqB;EACvB;;EAEA;IACE,UAAU;IACV,uBAAuB;EACzB;AACF;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,oFAAoF;AACtF;;AAEA;EACE,eAAe;EACf,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,mBAAmB;EACnB,kBAAkB;EAClB,UAAU;EACV,uBAAuB;EACvB,yBAAyB;;EAEzB;IACE,WAAW;IACX,kBAAkB;IAClB,SAAS;IACT,UAAU;IACV,WAAW;IACX,iBAAiB;IACjB,uBAAuB;IACvB,wBAAwB;IACxB,wBAAwB;IACxB,6BAA6B;IAC7B,2BAA2B;IAC3B,UAAU;IACV;;;;;;;;;;;;kBAYc;IACd,kEAA2D;IAC3D,oCAAoC;EACtC;;EAEA;IACE,WAAW;IACX,WAAW;IACX,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,yBAAyB;IACzB,OAAO;IACP,MAAM;EACR;AACF;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,2BAA2B;EAC7B;;EAEA;IACE,wBAAwB;EAC1B;AACF;;AAEA;EACE,kBAAkB;EAClB,YAAY;;EAEZ;IACE,cAAc;IACd,gCAAyB;IACzB,sCAAsC;IACtC,mCAAmC;IACnC,sBAAsB;IACtB,4BAA4B;IAC5B,6BAA6B;IAC7B,kBAAkB;IAClB,eAAe;;IAEf;MACE,kBAAkB;MAClB,WAAW;MACX,mCAA2B;cAA3B,2BAA2B;IAC7B;;IAEA;MACE,2BAA2B;IAC7B;;IAEA;MACE,2CAA2C;IAC7C;;IAEA;MACE,2CAA2C;IAC7C;EACF;AACF;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,wBAAwB;EAC1B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,uCAAuC;EACvC,kBAAkB;EAClB,qBAAqB;EACrB,2BAA2B;EAC3B,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,yBAAyB;EACzB,kBAAkB;EAClB,WAAW;EACX,eAAe;EACf,UAAU;EACV,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;;EAEE,WAAW;EACX,cAAc;EACd,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,kBAAkB;EAClB,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,UAAU;EACV,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,2CAAoC;AACtC;;AAEA;EACE,8CAAuC;AACzC;;AAEA;;EAEE,yBAAyB;EACzB,WAAW;AACb;;AAEA;;;;EAIE,qBAAqB;AACvB;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,sBAAsB;IACtB,UAAU;EACZ;;EAEA;IACE,mBAAmB;IACnB,UAAU;EACZ;AACF;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,gCAAgC;EAClC;;EAEA;IACE,wBAAwB;EAC1B;AACF;;AAEA;EACE,6CAAsC;EACtC,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,YAAY;EACZ,WAAW;EACX,+DAA+D;EAC/D,0BAA0B;EAC1B,2FAAmF;UAAnF,mFAAmF;AACrF;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,YAAY;EACZ,WAAW;EACX,+DAA+D;EAC/D,0BAA0B;AAC5B;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,YAAY;EACZ,WAAW;EACX;mDACiD;EACjD,0BAA0B;AAC5B;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB;;8DAE4D;EAC5D,2CAAoC;AACtC;;AAEA;EACE;IACE,eAAe;EACjB;AACF;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,eAAe;AACjB",sourcesContent:[`.avatar {\r
  animation: levitate 10s ease 1s infinite reverse;\r
}\r
\r
@keyframes levitate {\r
  0% {\r
    transform: translateY(0);\r
  }\r
\r
  30% {\r
    transform: translateY(-10px);\r
  }\r
\r
  50% {\r
    transform: translateY(4px);\r
  }\r
\r
  70% {\r
    transform: translateY(-15px);\r
  }\r
\r
  100% {\r
    transform: translateY(0);\r
  }\r
}\r
\r
.maskBox {\r
  width: 100px;\r
  height: 40px;\r
  background: darkcyan;\r
  text-align: center;\r
  line-height: 40px;\r
  color: #fff;\r
  font-size: 18px;\r
  position: relative;\r
  mask: radial-gradient(8px at 10px 10px, transparent 98%, black) -10px -10px;\r
}\r
\r
.watermark {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
  font-size: 18px;\r
  color: rgb(0 0 0 / 20%);\r
  white-space: nowrap;\r
  pointer-events: none;\r
}\r
\r
.blend-me {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
  color: #fff;\r
  text-align: center;\r
  font-size: 18px;\r
  font-weight: bold;\r
  mix-blend-mode: overlay;\r
  transition: 0.3s cubic-bezier(0.25, 0.25, 0.33, 1.33);\r
  animation: move-me 8s ease-out infinite alternate;\r
}\r
\r
@keyframes move-me {\r
  to {\r
    transform: translateY(50px);\r
  }\r
}\r
\r
.button {\r
  background: transparent;\r
  padding: 0.5rem 1rem;\r
  background-image: linear-gradient(90deg, white, white),\r
    linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));\r
  background-clip: padding-box, border-box;\r
  background-origin: border-box;\r
  border: 5px solid transparent;\r
  border-radius: 1.75rem;\r
}\r
\r
.button-label {\r
  background-image: linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));\r
  background-clip: text;\r
  color: transparent;\r
  font-weight: 600;\r
  font-size: 1.25rem;\r
  line-height: 1.5rem;\r
}\r
\r
.circle-1 {\r
  position: absolute;\r
  width: 20px;\r
  height: 20px;\r
  border-radius: 50%;\r
  top: calc(-10px);\r
  left: calc(-10px);\r
  animation: expand 6s ease-out infinite both;\r
  animation-play-state: running;\r
  animation-delay: 1s;\r
  border: 1.5px solid rgb(121 40 202 / 40%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 40%) 40%, #000 100%);\r
}\r
\r
.circle-2 {\r
  position: absolute;\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 50%;\r
  top: calc(-20px);\r
  left: calc(-20px);\r
  animation: expand-opacity 6s linear infinite both;\r
  animation-play-state: running;\r
  animation-delay: 0.5s;\r
  border: 1px solid rgb(121 40 202 / 40%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 30%) 20%, #000 100%);\r
}\r
\r
.circle-3 {\r
  position: absolute;\r
  width: 60px;\r
  height: 60px;\r
  border-radius: 50%;\r
  top: calc(-30px);\r
  left: calc(-30px);\r
  animation: expand-opacity 6s linear infinite both;\r
  animation-play-state: running;\r
  animation-delay: 1s;\r
  border: 1px solid rgb(121 40 202 / 30%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 20%) 20%, #000 100%);\r
}\r
\r
.circle-4 {\r
  position: absolute;\r
  width: 80px;\r
  height: 80px;\r
  border-radius: 50%;\r
  top: calc(-40px);\r
  left: calc(-40px);\r
  animation: expand-opacity 6s linear infinite both;\r
  animation-play-state: running;\r
  animation-delay: 1.5s;\r
  border: 1px solid rgb(121 40 202 / 20%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 10%) 20%, #000 100%);\r
}\r
\r
@keyframes expand {\r
  0% {\r
    transform: scale(1);\r
  }\r
\r
  50% {\r
    transform: scale(1.2);\r
  }\r
\r
  100% {\r
    transform: scale(1);\r
  }\r
}\r
\r
@keyframes expand-opacity {\r
  0% {\r
    opacity: 0;\r
    transform: scale(1);\r
  }\r
\r
  50% {\r
    opacity: 1;\r
    transform: scale(1.3);\r
  }\r
\r
  100% {\r
    opacity: 0;\r
    transform: scale(1.295);\r
  }\r
}\r
\r
.line {\r
  height: 2px;\r
  width: 360px;\r
  background-image: linear-gradient(97deg, #0096ff, #bb64ff 42%, #f2416b 74%, #eb7500);\r
}\r
\r
.eHElAY {\r
  cursor: pointer;\r
  display: inline-block;\r
  margin-bottom: 1rem;\r
  font-size: 1.1rem;\r
  height: 2.8rem;\r
  letter-spacing: 0.1rem;\r
  line-height: 2.8rem;\r
  padding: 0 1.8rem;\r
  text-align: center;\r
  text-decoration: none;\r
  white-space: nowrap;\r
  position: relative;\r
  z-index: 0;\r
  color: rgb(255 255 255);\r
  border-color: transparent;\r
\r
  &::before {\r
    content: '';\r
    position: absolute;\r
    top: -2px;\r
    left: -2px;\r
    z-index: -1;\r
    filter: blur(5px);\r
    width: calc(100% + 4px);\r
    height: calc(100% + 4px);\r
    animation-timeline: auto;\r
    animation-range-start: normal;\r
    animation-range-end: normal;\r
    opacity: 1;\r
    background: linear-gradient(\r
        45deg,\r
        rgb(255 0 0),\r
        rgb(255 115 0),\r
        rgb(255 251 0),\r
        rgb(72 255 0),\r
        rgb(0 255 213),\r
        rgb(0 43 255),\r
        rgb(122 0 255),\r
        rgb(255 0 200),\r
        rgb(255 0 0)\r
      )\r
      0% 0% / 400%;\r
    animation: 20s linear 0s infinite normal none running dv-wu;\r
    transition: opacity 0.3s ease-in-out;\r
  }\r
\r
  &::after {\r
    z-index: -1;\r
    content: '';\r
    position: absolute;\r
    width: 100%;\r
    height: 100%;\r
    background: rgb(17 17 17);\r
    left: 0;\r
    top: 0;\r
  }\r
}\r
\r
@keyframes dv-wu {\r
  0% {\r
    background-position: 0 0;\r
  }\r
\r
  50% {\r
    background-position: 400% 0;\r
  }\r
\r
  100% {\r
    background-position: 0 0;\r
  }\r
}\r
\r
.stages {\r
  position: relative;\r
  height: 74px;\r
\r
  .cubeSpinner {\r
    color: #42745a;\r
    animation-name: spin-cube;\r
    animation-timing-function: ease-in-out;\r
    animation-iteration-count: infinite;\r
    animation-duration: 8s;\r
    transform-style: preserve-3d;\r
    transform-origin: 40px 40px 0;\r
    line-height: 1.3em;\r
    font-size: 64px;\r
\r
    span {\r
      position: absolute;\r
      width: 100%;\r
      backface-visibility: hidden;\r
    }\r
\r
    .face1 {\r
      transform: translateZ(40px);\r
    }\r
\r
    .face2 {\r
      transform: rotateX(240deg) translateZ(40px);\r
    }\r
\r
    .face3 {\r
      transform: rotateX(120deg) translateZ(40px);\r
    }\r
  }\r
}\r
\r
@keyframes spin-cube {\r
  0% {\r
    transform: rotateX(0deg);\r
  }\r
\r
  15% {\r
    transform: rotateX(0deg);\r
  }\r
\r
  25% {\r
    transform: rotateX(120deg);\r
  }\r
\r
  40% {\r
    transform: rotateX(120deg);\r
  }\r
\r
  50% {\r
    transform: rotateX(240deg);\r
  }\r
\r
  65% {\r
    transform: rotateX(240deg);\r
  }\r
\r
  75% {\r
    transform: rotateX(240deg);\r
  }\r
\r
  90% {\r
    transform: rotateX(1turn);\r
  }\r
\r
  100% {\r
    transform: rotateX(1turn);\r
  }\r
}\r
\r
.video-box .video-btn {\r
  box-shadow: 0 6px 10px rgb(0 0 0 / 20%);\r
  position: relative;\r
  display: inline-block;\r
  transform: translateY(-50%);\r
  width: 40px;\r
  height: 40px;\r
  line-height: 40px;\r
  text-align: center;\r
  background-color: #1d5fca;\r
  border-radius: 50%;\r
  color: #fff;\r
  font-size: 20px;\r
  z-index: 1;\r
  margin-left: auto;\r
  margin-right: auto;\r
  cursor: pointer;\r
}\r
\r
.video-box .video-btn::after,\r
.video-box .video-btn::before {\r
  content: '';\r
  display: block;\r
  position: absolute;\r
  inset: 0;\r
  z-index: -1;\r
  border-radius: 50%;\r
  border: 1px solid #1d5fca;\r
  transition: 0.5s;\r
}\r
\r
.video-box .video-btn i {\r
  z-index: 1;\r
  margin-left: auto;\r
  margin-right: auto;\r
}\r
\r
.video-box .video-btn::before {\r
  animation: ripple 2s linear infinite;\r
}\r
\r
.video-box .video-btn::after {\r
  animation: ripple 2s linear 1s infinite;\r
}\r
\r
.video-box .video-btn:focus,\r
.video-box .video-btn:hover {\r
  background-color: #2d995d;\r
  color: #fff;\r
}\r
\r
.video-box .video-btn:focus::after,\r
.video-box .video-btn:focus::before,\r
.video-box .video-btn:hover::after,\r
.video-box .video-btn:hover::before {\r
  border-color: #2d995d;\r
}\r
\r
@keyframes ripple {\r
  0% {\r
    transform: scale(1);\r
  }\r
\r
  75% {\r
    transform: scale(1.75);\r
    opacity: 1;\r
  }\r
\r
  100% {\r
    transform: scale(2);\r
    opacity: 0;\r
  }\r
}\r
\r
@keyframes effect-1 {\r
  0% {\r
    text-shadow: 0 0 #32a8a2;\r
  }\r
\r
  40% {\r
    text-shadow: 2px 2px 5px #32a8a2;\r
  }\r
\r
  100% {\r
    text-shadow: 0 0 #32a8a2;\r
  }\r
}\r
\r
.effect {\r
  animation: effect-1 1s linear infinite;\r
  color: white;\r
  font-size: 48px;\r
}\r
\r
.dotMask {\r
  position: absolute;\r
  inset: 0;\r
  height: 100%;\r
  width: 100%;\r
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);\r
  background-size: 16px 16px;\r
  mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%);\r
}\r
\r
.dot {\r
  position: absolute;\r
  inset: 0;\r
  height: 100%;\r
  width: 100%;\r
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);\r
  background-size: 16px 16px;\r
}\r
\r
.grid {\r
  position: absolute;\r
  inset: 0;\r
  height: 100%;\r
  width: 100%;\r
  background-image: linear-gradient(to right, #80808012 1px, transparent 1px),\r
    linear-gradient(#80808012 1px, transparent 1px);\r
  background-size: 24px 24px;\r
}\r
\r
.box {\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  padding: 12px;\r
  border: 3px solid #0000;\r
  border-radius: 12px;\r
  background:\r
    linear-gradient(#131219, #131219) padding-box,\r
    linear-gradient(var(--angle), #070707, #687aff) border-box;\r
  animation: 4s rotate linear infinite;\r
}\r
\r
@keyframes rotate {\r
  to {\r
    --angle: 360deg;\r
  }\r
}\r
\r
@property --angle {\r
  syntax: '<angle>';\r
  initial-value: 0deg;\r
  inherits: false;\r
}\r
`],sourceRoot:""}]),i.locals={avatar:"avatar--tAk6h",levitate:"levitate--RZCwS",maskBox:"maskBox--uAYjJ",watermark:"watermark--YUolT","blend-me":"blend-me--f5L11",blendMe:"blend-me--f5L11","move-me":"move-me--FUPwc",moveMe:"move-me--FUPwc",button:"button--GgsIa","button-label":"button-label--d_jxl",buttonLabel:"button-label--d_jxl","circle-1":"circle-1--kJj6k",circle1:"circle-1--kJj6k",expand:"expand--kmoUS","circle-2":"circle-2--YMeVl",circle2:"circle-2--YMeVl","expand-opacity":"expand-opacity--XzitQ",expandOpacity:"expand-opacity--XzitQ","circle-3":"circle-3--DvCUJ",circle3:"circle-3--DvCUJ","circle-4":"circle-4--UkUyn",circle4:"circle-4--UkUyn",line:"line--Lp5NS",eHElAY:"eHElAY--ul0hZ",eHElAy:"eHElAY--ul0hZ","dv-wu":"dv-wu--sf_Ta",dvWu:"dv-wu--sf_Ta",stages:"stages--wh47k","spin-cube":"spin-cube--eXtsy",spinCube:"spin-cube--eXtsy",cubeSpinner:"cubeSpinner--eOJc0",face1:"face1--KIPp1",face2:"face2--aYKpi",face3:"face3--M7CTV","video-box":"video-box--RWlhc",videoBox:"video-box--RWlhc","video-btn":"video-btn--PPzlz",videoBtn:"video-btn--PPzlz",ripple:"ripple--Ojifa",effect:"effect--mKRM4","effect-1":"effect-1--LXEum",effect1:"effect-1--LXEum",dotMask:"dotMask--sy6CL",dot:"dot--jqRVx",grid:"grid--UCn5k",box:"box--kP2q7",rotate:"rotate--r6Mu6"},n.A=i},43825:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(54756)),u=o(e(29293)),t=o(e(85715)),i=e(96540),p=function(){var l=(0,i.useState)(null),_=(0,t.default)(l,2),A=_[0],d=_[1],a=function(){var r=(0,u.default)(s.default.mark(function m(y){return s.default.wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.prev=0,g.next=3,navigator.clipboard.writeText(y);case 3:d({state:"success"}),g.next=10;break;case 6:throw g.prev=6,g.t0=g.catch(0),d({state:"error",message:g.t0.message}),g.t0;case 10:return g.prev=10,setTimeout(function(){d(null)},2e3),g.finish(10);case 13:case"end":return g.stop()}},m,null,[[0,6,10,13]])}));return function(y){return r.apply(this,arguments)}}();return[a,A]},E=n.default=p},34573:function(B,n,e){"use strict";var o=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(85715)),t=p(e(96540));function i(l){if(typeof WeakMap!="function")return null;var _=new WeakMap,A=new WeakMap;return(i=function(a){return a?A:_})(l)}function p(l,_){if(!_&&l&&l.__esModule)return l;if(l===null||s(l)!="object"&&typeof l!="function")return{default:l};var A=i(_);if(A&&A.has(l))return A.get(l);var d={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in l)if(r!=="default"&&{}.hasOwnProperty.call(l,r)){var m=a?Object.getOwnPropertyDescriptor(l,r):null;m&&(m.get||m.set)?Object.defineProperty(d,r,m):d[r]=l[r]}return d.default=l,A&&A.set(l,d),d}var E=function(){var _=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",d=(0,t.useState)(A?void 0:0),a=(0,u.default)(d,2),r=a[0],m=a[1],y=function(){return m(function(g){return((g!=null?g:-1)+1)%_.length})};return[r==null&&A?A:_[r!=null?r:0],y]},f=n.default=E},87333:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(85715)),u=e(96540),t=o(e(43591)),i=function(l){return l?l.getBoundingClientRect():null},p=function(){var l=(0,u.useRef)(null),_=l.current||null,A=(0,u.useState)(i(_)),d=(0,s.default)(A,2),a=d[0],r=d[1],m=(0,u.useCallback)(function(){l.current&&r(i(l.current))},[l]);return(0,u.useLayoutEffect)(function(){var y=l.current;if(y){if(m(),typeof t.default=="function"){var O=new t.default(function(){return m()});return O.observe(y),function(){O&&(O.disconnect(),O=null)}}return window.addEventListener("resize",m),function(){return window.removeEventListener("resize",m)}}},[m]),[a,l]},E=n.default=p},2307:function(B,n,e){"use strict";var o=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=t(e(96540));function u(E){if(typeof WeakMap!="function")return null;var f=new WeakMap,l=new WeakMap;return(u=function(A){return A?l:f})(E)}function t(E,f){if(!f&&E&&E.__esModule)return E;if(E===null||o(E)!="object"&&typeof E!="function")return{default:E};var l=u(f);if(l&&l.has(E))return l.get(E);var _={__proto__:null},A=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var d in E)if(d!=="default"&&{}.hasOwnProperty.call(E,d)){var a=A?Object.getOwnPropertyDescriptor(E,d):null;a&&(a.get||a.set)?Object.defineProperty(_,d,a):_[d]=E[d]}return _.default=E,l&&l.set(E,_),_}var i=function(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(){};(0,s.useEffect)(function(){var l=new AbortController;return document.documentElement.addEventListener("click",function(){f()},{signal:l.signal}),document.documentElement.addEventListener("mousedown",function(_){_.detail>1&&_.preventDefault()},{signal:l.signal}),function(){l.abort()}},[])},p=n.default=i},81286:function(B,n,e){"use strict";var o=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=p(e(96540)),t=o(e(25039));function i(l){if(typeof WeakMap!="function")return null;var _=new WeakMap,A=new WeakMap;return(i=function(a){return a?A:_})(l)}function p(l,_){if(!_&&l&&l.__esModule)return l;if(l===null||s(l)!="object"&&typeof l!="function")return{default:l};var A=i(_);if(A&&A.has(l))return A.get(l);var d={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in l)if(r!=="default"&&{}.hasOwnProperty.call(l,r)){var m=a?Object.getOwnPropertyDescriptor(l,r):null;m&&(m.get||m.set)?Object.defineProperty(d,r,m):d[r]=l[r]}return d.default=l,A&&A.set(l,d),d}var E=function(_){var A=_.alternateText,d=A===void 0?[]:A;return(0,u.useEffect)(function(){var a=document.getElementById("alternating-text"),r=0,m=function(O){r=r<d.length-1?r+1:0,a.innerHTML=d[r]};return a.innerHTML=d[0],a.addEventListener("animationiteration",m,!1),function(){a.removeEventListener("animationiteration",m,!1)}},[]),u.default.createElement("span",{className:t.default.alternating,id:"alternating-text"},d[0]||"Text goes here")},f=n.default=E},44322:function(B,n,e){"use strict";var o=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(43693)),t=o(e(85715)),i=E(e(96540));function p(g){if(typeof WeakMap!="function")return null;var C=new WeakMap,h=new WeakMap;return(p=function(I){return I?h:C})(g)}function E(g,C){if(!C&&g&&g.__esModule)return g;if(g===null||s(g)!="object"&&typeof g!="function")return{default:g};var h=p(C);if(h&&h.has(g))return h.get(g);var P={__proto__:null},I=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var j in g)if(j!=="default"&&{}.hasOwnProperty.call(g,j)){var M=I?Object.getOwnPropertyDescriptor(g,j):null;M&&(M.get||M.set)?Object.defineProperty(P,j,M):P[j]=g[j]}return P.default=g,h&&h.set(g,P),P}function f(g,C){var h=Object.keys(g);if(Object.getOwnPropertySymbols){var P=Object.getOwnPropertySymbols(g);C&&(P=P.filter(function(I){return Object.getOwnPropertyDescriptor(g,I).enumerable})),h.push.apply(h,P)}return h}function l(g){for(var C=1;C<arguments.length;C++){var h=arguments[C]!=null?arguments[C]:{};C%2?f(Object(h),!0).forEach(function(P){(0,u.default)(g,P,h[P])}):Object.getOwnPropertyDescriptors?Object.defineProperties(g,Object.getOwnPropertyDescriptors(h)):f(Object(h)).forEach(function(P){Object.defineProperty(g,P,Object.getOwnPropertyDescriptor(h,P))})}return g}var _=function(C){var h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"0px",P=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,I=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1,j=(0,i.useState)(!0),M=(0,t.default)(j,2),S=M[0],x=M[1],T=(0,i.useRef)(null);return(0,i.useEffect)(function(){return T.current=new IntersectionObserver(function(W){var k=(0,t.default)(W,1),z=k[0];z.isIntersecting&&z.intersectionRatio>=P?(x(!0),I&&T.current.disconnect()):x(!1)},{rootMargin:h,threshold:P}),C.current&&T.current.observe(C.current),function(){C.current&&T.current.unobserve(C.current)}},[C,h,P,I]),S},A=function(C){var h=C.from,P=C.to,I=C.rootMargin,j=C.threshold,M=C.triggerOnce,S=C.children,x=(0,i.useRef)(null),T=_(x,I,j,M),W={transition:"1000ms ease-in-out"};return i.default.createElement("div",{ref:x,style:T?l(l({},W),P):l(l({},W),h)},S)},d=function(C){var h=C.rootMargin,P=h===void 0?"0px":h,I=C.threshold,j=I===void 0?0:I,M=C.triggerOnce,S=M===void 0?!1:M,x=C.children;return i.default.createElement(A,{from:{opacity:0},to:{opacity:1},rootMargin:P,threshold:j,triggerOnce:S},x)},a=function(C){var h=C.rootMargin,P=h===void 0?"0px":h,I=C.threshold,j=I===void 0?0:I,M=C.triggerOnce,S=M===void 0?!1:M,x=C.children;return i.default.createElement(A,{from:{opacity:0,translate:"0 2rem"},to:{opacity:1,translate:"none"},rootMargin:P,threshold:j,triggerOnce:S},x)},r=function(C){var h=C.rootMargin,P=h===void 0?"0px":h,I=C.threshold,j=I===void 0?0:I,M=C.triggerOnce,S=M===void 0?!1:M,x=C.children;return i.default.createElement(A,{from:{scale:"0"},to:{scale:"1"},rootMargin:P,threshold:j,triggerOnce:S},x)},m=function(C){var h=C.from,P=C.to,I=C.rootMargin,j=I===void 0?"0px":I,M=C.threshold,S=M===void 0?0:M,x=C.triggerOnce,T=x===void 0?!1:x,W=C.children;return i.default.createElement(A,{from:h,to:P,rootMargin:j,threshold:S,triggerOnce:T},W)},y={FadeIn:d,FadeUp:a,ScaleIn:r,DiyAnimation:m},O=n.default=y},53795:function(B,n,e){"use strict";var o=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(94634)),t=o(e(91847)),i=o(e(85715)),p=_(e(96540)),E=o(e(48122)),f=["children","onClick"];function l(r){if(typeof WeakMap!="function")return null;var m=new WeakMap,y=new WeakMap;return(l=function(g){return g?y:m})(r)}function _(r,m){if(!m&&r&&r.__esModule)return r;if(r===null||s(r)!="object"&&typeof r!="function")return{default:r};var y=l(m);if(y&&y.has(r))return y.get(r);var O={__proto__:null},g=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var C in r)if(C!=="default"&&{}.hasOwnProperty.call(r,C)){var h=g?Object.getOwnPropertyDescriptor(r,C):null;h&&(h.get||h.set)?Object.defineProperty(O,C,h):O[C]=r[C]}return O.default=r,y&&y.set(r,O),O}var A=function(){var m=p.default.useState({x:-1,y:-1}),y=(0,i.default)(m,2),O=y[0],g=O.x,C=O.y,h=y[1],P=g!==-1&&C!==-1,I=function(M){var S=M.currentTarget.getBoundingClientRect(),x=S.left,T=S.top;h({x:M.clientX-x,y:M.clientY-T}),setTimeout(function(){h({x:-1,y:-1})},300)};return{x:g,y:C,handleRippleOnClick:I,isRippling:P}},d=function(m){var y=m.children,O=m.onClick,g=(0,t.default)(m,f),C=A(),h=C.x,P=C.y,I=C.handleRippleOnClick,j=C.isRippling,M=function(x){I(x),O&&O(x)};return p.default.createElement("button",(0,u.default)({type:"button",onClick:M,className:E.default.btn},g),p.default.createElement("span",{className:E.default.content},y),j&&p.default.createElement("div",{className:E.default["btn-ripple-container"]},p.default.createElement("span",{className:E.default["btn-ripple"],style:{left:h,top:P}})))},a=n.default=d},85666:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(96540)),u=o(e(57903)),t=function(E){var f=E.children;return s.default.createElement(s.default.Fragment,null,s.default.createElement("section",{className:u.default.hIBkFg},s.default.createElement("h2",null,"Design and code"," ",s.default.createElement("span",{className:u.default.kqOLaE},s.default.createElement("span",null,"R"),s.default.createElement("span",null,"e"),s.default.createElement("span",null,"a"),s.default.createElement("span",null,"c"),s.default.createElement("span",null,"t"))," ","apps")),s.default.createElement("section",{style:{fontSize:30,position:"relative"}},"Dropping Texts:",s.default.createElement("div",{className:u.default.droppingTexts},s.default.createElement("div",null,"React"),s.default.createElement("div",null,"Vue"),s.default.createElement("div",null,"Angular"),s.default.createElement("div",null,"Remix!"))))},i=n.default=t},59409:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(96540)),u=o(e(21958)),t=function(E){var f=E.text,l=/((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;return s.default.createElement(s.default.Fragment,null,f.split(l).map(function(_,A){var d=_.match(l);if(d){var a=d[0];return s.default.createElement("a",{key:A,className:u.default.squiggle,target:"_blank",href:a.startsWith("http")?a:"http://".concat(a)},a)}return _}))},i=n.default=t},76017:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(96540)),u=o(e(39726)),t=function(E){var f=E.avatar,l=E.text;return s.default.createElement("div",{className:u.default.avatarCard},s.default.createElement("div",{className:u.default.card},s.default.createElement("figure",null,s.default.createElement("img",{alt:"",src:f,className:u.default.avatar})),s.default.createElement("p",{className:u.default.content},l)))},i=n.default=t},12770:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(96540)),u=o(e(49511)),t=function(){return s.default.createElement(s.default.Fragment,null,s.default.createElement("section",{className:u.default.breatheItem},s.default.createElement("span",null,"Breathe")))},i=n.default=t},42916:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(43693)),u=o(e(96540));function t(f,l){var _=Object.keys(f);if(Object.getOwnPropertySymbols){var A=Object.getOwnPropertySymbols(f);l&&(A=A.filter(function(d){return Object.getOwnPropertyDescriptor(f,d).enumerable})),_.push.apply(_,A)}return _}function i(f){for(var l=1;l<arguments.length;l++){var _=arguments[l]!=null?arguments[l]:{};l%2?t(Object(_),!0).forEach(function(A){(0,s.default)(f,A,_[A])}):Object.getOwnPropertyDescriptors?Object.defineProperties(f,Object.getOwnPropertyDescriptors(_)):t(Object(_)).forEach(function(A){Object.defineProperty(f,A,Object.getOwnPropertyDescriptor(_,A))})}return f}var p=u.default.forwardRef(function(f,l){var _=f.style,A=f.children;return u.default.createElement("div",{ref:l,style:i({width:"100%",height:"calc(100vh - 204px)",position:"relative",overflowX:"hidden",overflowY:"auto"},_)},A)}),E=n.default=p},18903:function(B,n,e){"use strict";var o=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=p(e(96540)),t=o(e(84576));function i(l){if(typeof WeakMap!="function")return null;var _=new WeakMap,A=new WeakMap;return(i=function(a){return a?A:_})(l)}function p(l,_){if(!_&&l&&l.__esModule)return l;if(l===null||s(l)!="object"&&typeof l!="function")return{default:l};var A=i(_);if(A&&A.has(l))return A.get(l);var d={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in l)if(r!=="default"&&{}.hasOwnProperty.call(l,r)){var m=a?Object.getOwnPropertyDescriptor(l,r):null;m&&(m.get||m.set)?Object.defineProperty(d,r,m):d[r]=l[r]}return d.default=l,A&&A.set(l,d),d}var E=function(){var _=(0,u.useRef)(null);return(0,u.useLayoutEffect)(function(){var A=_.current,d=function(r){var m=r.target.getBoundingClientRect(),y=r.clientX-m.left,O=r.clientY-m.top;A.style.setProperty("--x",y+"px"),A.style.setProperty("--y",O+"px")};return A.addEventListener("mousemove",d),function(){A.removeEventListener("mousemove",d)}},[]),u.default.createElement("button",{className:t.default.gradientTracking,ref:_},u.default.createElement("span",null,"Hover me"))},f=n.default=E},52537:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(96540)),u=o(e(85120)),t=function(E){var f=E.text;return s.default.createElement("div",{className:u.default.isometricCard},s.default.createElement("p",null,f))},i=n.default=t},35317:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(94634)),u=o(e(85715)),t=o(e(91847)),i=o(e(96540)),p=o(e(61352)),E=["alt","src","className","loadInitially","observerOptions"],f=function(A){var d=A.alt,a=A.src,r=A.className,m=A.loadInitially,y=m===void 0?!1:m,O=A.observerOptions,g=O===void 0?{root:null,rootMargin:"200px 0px"}:O,C=(0,t.default)(A,E),h=i.default.useRef(null),P=i.default.useRef(null),I=i.default.useState(y),j=(0,u.default)(I,2),M=j[0],S=j[1],x=i.default.useCallback(function(T){T[0].isIntersecting&&(h.current.disconnect(),S(!0))},[h]);return i.default.useEffect(function(){if(!y){if("loading"in HTMLImageElement.prototype){S(!0);return}return h.current=new IntersectionObserver(x,g),h.current.observe(P.current),function(){h.current.disconnect()}}},[]),i.default.createElement("figure",{className:p.default.hoverRotate},i.default.createElement("img",(0,s.default)({alt:d,src:M?a:"",ref:P,className:r,loading:y?void 0:"lazy"},C)),i.default.createElement("figcaption",null,i.default.createElement("h3",null,"Lorem ",i.default.createElement("br",null),"Ipsum")))},l=n.default=f},22807:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(96540)),u=o(e(89696)),t=function(E){var f=E.text;return s.default.createElement("span",{className:u.default.lineBordered},f)},i=n.default=t},75747:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(96540)),u=o(e(89200)),t=function(E){return s.default.createElement("div",{style:{position:"relative",height:"100%"}},s.default.createElement("div",{className:u.default.background},"Mesh Gradient Background"))},i=n.default=t},67896:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(85715)),u=o(e(96540)),t=o(e(44782)),i=o(e(34573)),p=o(e(2307)),E=[398.43,-3243.5,1435237],f=function(){var A=(0,i.default)(E),d=(0,s.default)(A,2),a=d[0],r=d[1];return(0,p.default)(r),u.default.createElement(t.default,{value:a,trend:0})},l=n.default=f},81740:function(B,n,e){"use strict";var o=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(54756)),t=o(e(94634)),i=o(e(85715)),p=o(e(29293)),E=P(e(96540)),f=e(58087),l=o(e(43160)),_=o(e(41512)),A=o(e(54152)),d=o(e(63940)),a=o(e(37948)),r=o(e(73410)),m=o(e(51498)),y=o(e(7230)),O=e(81591),g=o(e(65548));e(35819);var C=o(e(49887));function h(x){if(typeof WeakMap!="function")return null;var T=new WeakMap,W=new WeakMap;return(h=function(z){return z?W:T})(x)}function P(x,T){if(!T&&x&&x.__esModule)return x;if(x===null||s(x)!="object"&&typeof x!="function")return{default:x};var W=h(T);if(W&&W.has(x))return W.get(x);var k={__proto__:null},z=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var Z in x)if(Z!=="default"&&{}.hasOwnProperty.call(x,Z)){var w=z?Object.getOwnPropertyDescriptor(x,Z):null;w&&(w.get||w.set)?Object.defineProperty(k,Z,w):k[Z]=x[Z]}return k.default=x,W&&W.set(x,k),k}var I=function(){var x=(0,p.default)(u.default.mark(function T(W){var k,z;return u.default.wrap(function(w){for(;;)switch(w.prev=w.next){case 0:if(w.prev=0,!((k=navigator)!==null&&k!==void 0&&(k=k.clipboard)!==null&&k!==void 0&&k.writeText)){w.next=5;break}return w.next=4,navigator.clipboard.writeText(W);case 4:f.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F");case 5:w.next=16;break;case 7:w.prev=7,w.t0=w.catch(0),z=document.createElement("textarea"),z.value=W,document.body.appendChild(z),z.focus(),z.select();try{document.execCommand("copy"),f.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F")}catch(V){f.message.success("\u590D\u5236\u5230\u526A\u8D34\u677F\u5931\u8D25")}document.body.removeChild(z);case 16:case"end":return w.stop()}},T,null,[[0,7]])}));return function(W){return x.apply(this,arguments)}}(),j=function(T){var W,k=(0,E.useRef)(null),z=(W=k.current)===null||W===void 0?void 0:W.innerText,Z=(0,E.useRef)(""),w=(0,O.useDebouncedCallback)(function(){if(k.current){var V=k.current.querySelector("code"),H=V.className,re=/language-(\w+)/.exec(H||"");if(re){var U=(0,i.default)(re,2),te=U[1];Z.current=te}}},800);return(0,E.useEffect)(function(){setTimeout(w,1)},[z]),E.default.createElement("section",null,E.default.createElement("section",{className:C.default.copySection},E.default.createElement("span",{className:C.default.lang},Z.current),E.default.createElement("span",{className:C.default.copySpan,role:"button",onClick:function(){if(k.current){var H=k.current.innerText;I(H)}}},"\u590D\u5236\u4EE3\u7801")),E.default.createElement("pre",{className:C.default.preCode,ref:k},T.children))},M=function(T){var W=T.markdownText,k=W===void 0?"":W,z=T.isLoading,Z=z===void 0?!1:z;return E.default.createElement("section",{className:C.default.markdownBody},Z&&!k&&E.default.createElement(l.default,{component:g.default,style:{color:"#fff"},className:C.default.loadingIcon}),k&&E.default.createElement(_.default,{remarkPlugins:[A.default,r.default,d.default],rehypePlugins:[a.default,y.default,[m.default,{detect:!1,ignoreMissing:!0}]],components:{pre:j,p:function(V){return E.default.createElement("p",(0,t.default)({},V,{dir:"auto"}))},a:function(V){var H,re=V.href||"",U=/^\/#/i.test(re),te=U?"_self":(H=V.target)!==null&&H!==void 0?H:"_blank";return E.default.createElement("a",(0,t.default)({},V,{target:te}))}}},k))},S=n.default=M},63023:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(96540)),u=e(23947),t=function(E){var f=E.children;return s.default.createElement(u.motion.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{ease:"linear",duration:1,y:{duration:.5}}},f)},i=n.default=t},80201:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(94634)),u=o(e(85715)),t=o(e(96540)),i=e(77450),p=o(e(43825)),E=e(43160),f=o(e(71352)),l=function(d){var a=d.preCode,r=(0,p.default)(),m=(0,u.default)(r,2),y=m[0],O=m[1],g=function(){y(a)};return t.default.createElement("div",{className:"rounded-md bg-cyan-800 text-zinc-50"},t.default.createElement("header",{className:"grid grid-cols-6 gap-3 items-center px-4 py-3"},t.default.createElement("div",{className:"flex gap-1.5"},t.default.createElement("div",{className:"rounded-full h-3 w-3 bg-red-500"}),t.default.createElement("div",{className:"rounded-full h-3 w-3 bg-yellow-500"}),t.default.createElement("div",{className:"rounded-full h-3 w-3 bg-green-500"})),t.default.createElement("div",{className:"col-span-4 flex justify-center"},t.default.createElement("div",{className:"bg-transparent text-center text-gray-400 text-sm font-medium focus:outline-none"},"Untitled"))),t.default.createElement("div",{className:"relative px-4 pb-4"},t.default.createElement("div",{className:"absolute top-2 right-5 size-4 text-gray-400"},(O==null?void 0:O.state)==="success"?t.default.createElement(E.CheckCircleTwoTone,{className:"size-4 text-base",twoToneColor:"#52c41a"}):t.default.createElement(E.CopyOutlined,{className:"size-4 text-base",onClick:g})),t.default.createElement(i.Highlight,{theme:i.themes.dracula,className:f.default.wrapper,code:a==null?void 0:a.trim(),language:"jsx"},function(C){var h=C.style,P=C.tokens,I=C.getLineProps,j=C.getTokenProps;return t.default.createElement("pre",{className:f.default.pre,style:h},P.map(function(M,S){return t.default.createElement("div",(0,s.default)({className:f.default.line,key:S},I({line:M})),t.default.createElement("span",{className:f.default["line-no"]},S+1),M.map(function(x,T){return t.default.createElement("span",(0,s.default)({key:T},j({token:x})))}))}))})))},_=n.default=l},3102:function(B,n,e){"use strict";var o=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=p(e(96540)),t=o(e(91193));function i(l){if(typeof WeakMap!="function")return null;var _=new WeakMap,A=new WeakMap;return(i=function(a){return a?A:_})(l)}function p(l,_){if(!_&&l&&l.__esModule)return l;if(l===null||s(l)!="object"&&typeof l!="function")return{default:l};var A=i(_);if(A&&A.has(l))return A.get(l);var d={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in l)if(r!=="default"&&{}.hasOwnProperty.call(l,r)){var m=a?Object.getOwnPropertyDescriptor(l,r):null;m&&(m.get||m.set)?Object.defineProperty(d,r,m):d[r]=l[r]}return d.default=l,A&&A.set(l,d),d}var E=function(){var _=(0,u.useRef)(null);return(0,u.useLayoutEffect)(function(){var A=_.current,d=A.getBoundingClientRect(),a=d.x,r=d.y,m=d.width,y=m===void 0?240:m,O=d.height,g=O===void 0?360:O,C=a+(y||240)/2,h=r+(g||360)/2,P=function(M){var S=M.pageX,x=M.pageY,T=(C-S)/((y||240)/2),W=(h-x)/((g||360)/2);A.style.setProperty("--dx",T),A.style.setProperty("--dy",W)},I=function(){A.style.setProperty("--dx",0),A.style.setProperty("--dy",0)};return A.addEventListener("mousemove",P),A.addEventListener("mouseleave",I),function(){A.removeEventListener("mousemove",P),A.removeEventListener("mouseleave",I)}},[]),u.default.createElement("div",{ref:_,className:t.default.shiftingCard},u.default.createElement("h3",null,"Shifting Card"))},f=n.default=E},31456:function(B,n,e){"use strict";var o=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(43693)),t=o(e(85715)),i=f(e(96540)),p=o(e(81709));function E(a){if(typeof WeakMap!="function")return null;var r=new WeakMap,m=new WeakMap;return(E=function(O){return O?m:r})(a)}function f(a,r){if(!r&&a&&a.__esModule)return a;if(a===null||s(a)!="object"&&typeof a!="function")return{default:a};var m=E(r);if(m&&m.has(a))return m.get(a);var y={__proto__:null},O=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if(g!=="default"&&{}.hasOwnProperty.call(a,g)){var C=O?Object.getOwnPropertyDescriptor(a,g):null;C&&(C.get||C.set)?Object.defineProperty(y,g,C):y[g]=a[g]}return y.default=a,m&&m.set(a,y),y}function l(a,r){var m=Object.keys(a);if(Object.getOwnPropertySymbols){var y=Object.getOwnPropertySymbols(a);r&&(y=y.filter(function(O){return Object.getOwnPropertyDescriptor(a,O).enumerable})),m.push.apply(m,y)}return m}function _(a){for(var r=1;r<arguments.length;r++){var m=arguments[r]!=null?arguments[r]:{};r%2?l(Object(m),!0).forEach(function(y){(0,u.default)(a,y,m[y])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(m)):l(Object(m)).forEach(function(y){Object.defineProperty(a,y,Object.getOwnPropertyDescriptor(m,y))})}return a}var A=function(r){var m=r.className,y=r.style,O=r.children,g=(0,i.useRef)(null),C=(0,i.useState)(!1),h=(0,t.default)(C,2),P=h[0],I=h[1],j=(0,i.useState)({x:0,y:0}),M=(0,t.default)(j,2),S=M[0],x=M[1],T=(0,i.useState)(0),W=(0,t.default)(T,2),k=W[0],z=W[1],Z=function(te){if(!(!g.current||P)){var ue=g.current,_e=ue.getBoundingClientRect();x({x:te.clientX-_e.left,y:te.clientY-_e.top})}},w=function(){I(!0),z(1)},V=function(){I(!1),z(0)},H=function(){z(1)},re=function(){z(0)};return i.default.createElement("section",{ref:g,onMouseMove:Z,onFocus:w,onBlur:V,onMouseEnter:H,onMouseLeave:re,className:"".concat(p.default.cardEffect," ").concat(m),style:_({},y)},i.default.createElement("section",{className:p.default.spotlight,style:{opacity:k,background:"radial-gradient(1000px circle at ".concat(S.x,"px ").concat(S.y,"px, rgba(190,255,255,.2), transparent 40%)")}}),i.default.createElement("section",{className:p.default.spotlight,style:{opacity:k,border:"2px solid rgb(255, 255, 255)",borderRadius:"8px",WebkitMaskImage:"radial-gradient(40% 40% at ".concat(S.x,"px ").concat(S.y,"px, black 45%, transparent)")}}),O)},d=n.default=A},3783:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=o(e(96540)),u=o(e(95280)),t=function(){return s.default.createElement("div",{className:"relative flex flex-col items-center justify-center overflow-hidden"},s.default.createElement("div",{className:"not-prose my-5 w-full"},s.default.createElement("ul",{className:"flex w-full flex-wrap items-center justify-center gap-3"},s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"'use server'"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useOptimistic"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"React Server Components"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Concurrent Rendering"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useActionState"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Improved Hydration"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Form Actions"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Server Actions"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Suspense"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"'use client'"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useTransition"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"React Compiler"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Streaming"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useFormStatus"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"New React Hooks"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"use()"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Automatic Memoization"))),s.default.createElement("div",{className:u.default.mask}))},i=n.default=t},59593:function(B,n,e){"use strict";var o=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(85715)),t=E(e(96540)),i=o(e(1052));function p(_){if(typeof WeakMap!="function")return null;var A=new WeakMap,d=new WeakMap;return(p=function(r){return r?d:A})(_)}function E(_,A){if(!A&&_&&_.__esModule)return _;if(_===null||s(_)!="object"&&typeof _!="function")return{default:_};var d=p(A);if(d&&d.has(_))return d.get(_);var a={__proto__:null},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var m in _)if(m!=="default"&&{}.hasOwnProperty.call(_,m)){var y=r?Object.getOwnPropertyDescriptor(_,m):null;y&&(y.get||y.set)?Object.defineProperty(a,m,y):a[m]=_[m]}return a.default=_,d&&d.set(_,a),a}var f=function(A){var d=A.children,a=A.delay,r=a===void 0?110:a,m=(0,t.useState)(0),y=(0,u.default)(m,2),O=y[0],g=y[1],C=setInterval(function(){return g(function(h){return h+1})},r);return(0,t.useEffect)(function(){O===d.length&&clearInterval(C)},[d,C,O]),(0,t.useEffect)(function(){return function(){return clearInterval(C)}},[C]),t.default.createElement(t.default.Fragment,null,d.substring(0,O),t.default.createElement("span",{className:i.default.typedCursorBlink},"|"))},l=n.default=(0,t.memo)(f)},76526:function(B,n,e){"use strict";var o=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(85715)),t=ue(e(96540)),i=e(58087),p=e(43160),E=e(43125),f=o(e(64856)),l=o(e(31456)),_=o(e(8242)),A=o(e(51521)),d=ue(e(47159)),a=o(e(42916)),r=o(e(59593)),m=o(e(81740)),y=o(e(81286)),O=o(e(59409)),g=o(e(35317)),C=o(e(52537)),h=o(e(76017)),P=o(e(22807)),I=o(e(18903)),j=o(e(3102)),M=o(e(12770)),S=o(e(63023)),x=o(e(44322)),T=o(e(53795)),W=o(e(85666)),k=o(e(67896)),z=o(e(75747)),Z=o(e(87333)),w=o(e(3783)),V=o(e(80201)),H=e(31819),re=e(21378),U=o(e(47443));function te(F){if(typeof WeakMap!="function")return null;var ie=new WeakMap,q=new WeakMap;return(te=function(ee){return ee?q:ie})(F)}function ue(F,ie){if(!ie&&F&&F.__esModule)return F;if(F===null||s(F)!="object"&&typeof F!="function")return{default:F};var q=te(ie);if(q&&q.has(F))return q.get(F);var ae={__proto__:null},ee=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var G in F)if(G!=="default"&&{}.hasOwnProperty.call(F,G)){var se=ee?Object.getOwnPropertyDescriptor(F,G):null;se&&(se.get||se.set)?Object.defineProperty(ae,G,se):ae[G]=F[G]}return ae.default=F,q&&q.set(F,ae),ae}var _e=function(){var ie=(0,t.useState)(""),q=(0,u.default)(ie,2),ae=q[0],ee=q[1],G=(0,t.useRef)(null),se=(0,t.useState)(!1),ge=(0,u.default)(se,2),ce=ge[0],le=ge[1],Ie=(0,t.useState)(""),pe=(0,u.default)(Ie,2),je=pe[0],Ce=pe[1],Be=(0,t.useRef)(null),Te=(0,t.useState)(function(){return""}),ve=(0,u.default)(Te,2),ye=ve[0],Re=ve[1],he=(0,t.useState)(""),be=(0,u.default)(he,2),b=be[0],c=be[1],v=(0,t.useRef)(null),D=function($){Re($.target.value)},R=function($){c($.target.value)},L=function($){$.metaKey&&$.key==="Enter"&&(K(),$.preventDefault())},K=function(){if(b.trim()!==""){var $=new AbortController;Be.current=$,X(b,ye,$)}},Y=function(){Be.current.abort(),le(!1)},X=function($,Ke,ze){G.current="",ee(G.current);var we=ze.signal;le(!0),(0,H.oneApiChat)([{content:$,role:"user"}],Ke,we).then(function(ne){var J=ne.headers.get("content-type");if(!ne.ok||!(J!=null&&J.startsWith("text/event-stream"))||ne.status!==200){if(J!=null&&J.startsWith("text/html")||J!=null&&J.startsWith("text/plain")){var Fe=ne.clone().text();Fe.then(function(Ee){ee(Ee)})}else if(J!=null&&J.startsWith("application/json")){var Ye=ne.clone().json();Ye.then(function(Ee){ee((0,H.prettyObject)(Ee))})}else ee(ne.statusText);le(!1)}else{var De,Xe=ne==null||(De=ne.body)===null||De===void 0?void 0:De.getReader(),Oe=`

`,de="",We="",Se=function(){Xe.read().then(function(xe){var Ne=xe.done,Ze=xe.value;if(Ne){le(!1);return}for(de+=new TextDecoder().decode(Ze);de.includes(Oe);){var ke=de.indexOf(Oe),Ve=de.slice(0,ke),fe=Ve.split("data: ");for(var Pe in fe)if(fe[Pe]!==""&&fe[Pe]!=="[DONE]")try{var Me,Ae,Qe=JSON.parse(fe[Pe]),He=(Me=(Ae=Qe.choices[0])===null||Ae===void 0||(Ae=Ae.delta)===null||Ae===void 0?void 0:Ae.content)!==null&&Me!==void 0?Me:"";We+=He,Ce(new Date().toLocaleString()),G.current=We,ee(G.current)}catch(Ge){}de=de.slice(ke+Oe.length)}Se()}).catch(function(xe){})};Se()}}).catch(function(ne){le(!1),ee(ne.message)})},oe=(0,Z.default)(),Q=(0,u.default)(oe,2),N=Q[0],Le=Q[1];return t.default.createElement(a.default,null,t.default.createElement("section",{style:{marginBottom:15}},t.default.createElement(r.default,null,"Cool! Hi, React & Ant Design!")),t.default.createElement("section",{className:U.default.avatar},"React version: ",t.version),t.default.createElement("section",null,"I love coding in ",t.default.createElement(y.default,{alternateText:["javascript","typescript","rect","vue"]}),"."),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(O.default,{text:"foo bar baz http://example.org bar https://github.com/wkylin/pro-react-admin"})),t.default.createElement("section",{className:U.default.line}),t.default.createElement("section",null,t.default.createElement(h.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."})),t.default.createElement("section",null,t.default.createElement(C.default,{text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?"})),t.default.createElement(P.default,{text:"A line bordered text."}),t.default.createElement("section",{style:{display:"flex",alignItems:"center",marginTop:10,marginBottom:40}},t.default.createElement(E.Atom,null)," ",t.default.createElement(E.Merge,null)," ",t.default.createElement(E.GitMerge,null)," ",t.default.createElement(E.GitPullRequestArrow,null)),t.default.createElement("section",{style:{marginBottom:40,fontSize:16}},t.default.createElement("h3",null,"React Animate On Scroll."),t.default.createElement("h3",null,t.default.createElement(O.default,{text:"https://motion.dev/ https://gsap.com/ https://www.react-spring.dev/ https://use-gesture.netlify.app/"})),t.default.createElement("h3",{style:{marginBottom:40}},t.default.createElement(O.default,{text:"https://www.npmjs.com/package/react-animate-on-scroll https://www.npmjs.com/package/react-scroll https://github.com/wellyshen/react-cool-inview"})),t.default.createElement(S.default,null,t.default.createElement(g.default,{src:"https://picsum.photos/seed/picsum/300/160",alt:"Strawberries"}))),t.default.createElement("section",{style:{marginBottom:40,fontSize:36}},t.default.createElement(_.default,{options:{strings:["Software Developer.","Full Stack Developer.","Open Source Contributor."],autoStart:!0,loop:!0,deleteSpeed:50}})),t.default.createElement("section",null,t.default.createElement(I.default,null)),t.default.createElement("section",{style:{margin:40}},t.default.createElement(M.default,null)),t.default.createElement("section",{style:{margin:"60px 0 40px 40px"}},t.default.createElement("div",{className:U.default["video-box"]},t.default.createElement("div",{className:U.default["video-btn"]},"b"))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(j.default,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(x.default.FadeIn,null,t.default.createElement(h.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."}))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(x.default.FadeUp,null,t.default.createElement("img",{src:"https://picsum.photos/360/200.jpg",alt:""}))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},t.default.createElement(x.default.ScaleIn,{triggerOnce:!1},t.default.createElement(t.default.Fragment,null,t.default.createElement("img",{src:"https://picsum.photos/360/200/?blur=2",alt:""}),t.default.createElement("section",{className:U.default["blend-me"]},"Mix Blend Mode")))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},t.default.createElement(x.default.DiyAnimation,{from:{opacity:0,transform:"translate(-100%, 0)"},to:{opacity:1,transform:"translate(0, 0)"},triggerOnce:!0},t.default.createElement("img",{src:"https://picsum.photos/360/200.jpg",alt:""}))),t.default.createElement("section",{style:{marginBottom:40,display:"flex"}},t.default.createElement(l.default,{className:"my-spot",style:{width:360,height:200,color:"#fff"}},t.default.createElement("section",null))),t.default.createElement("section",{className:U.default.box,style:{marginBottom:10,width:360,height:200,position:"relative",backgroundColor:"rgba(0, 0,0, 0.9)",borderRadius:8}},t.default.createElement("section",{className:U.default.dotMask,ref:Le},"dot mask")),t.default.createElement("section",{style:{marginBottom:40,fontSize:18}},t.default.createElement("section",null,"RectResult."),"width: ",parseInt(N==null?void 0:N.width)," height: ",parseInt(N==null?void 0:N.height)," top: ",parseInt(N==null?void 0:N.top)," bottom:"," ",parseInt(N==null?void 0:N.bottom)," right: ",parseInt(N==null?void 0:N.right)," left: ",parseInt(N==null?void 0:N.left)),t.default.createElement("section",{style:{marginBottom:40,height:200,width:360,overflow:"hidden"}},t.default.createElement(z.default,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(T.default,null,"Click Me")),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement("section",{className:U.default.effect}," Hello CSS")),t.default.createElement("section",{style:{marginBottom:40},className:U.default.maskBox},t.default.createElement("section",{className:U.default.watermark},"water mark"),"mask"),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement("button",{className:U.default.button,onClick:re.fireConfetti},t.default.createElement("span",{className:U.default["button-label"]},"Click Me"))),t.default.createElement("section",{style:{position:"relative",margin:"80px 0 160px 100px"}},t.default.createElement("div",{className:U.default["circle-1"]}),t.default.createElement("div",{className:U.default["circle-2"]}),t.default.createElement("div",{className:U.default["circle-3"]}),t.default.createElement("div",{className:U.default["circle-4"]})),t.default.createElement("section",{style:{margin:20},className:U.default.eHElAY},"Hi, React!"),t.default.createElement("section",null,t.default.createElement("div",{className:U.default.stages},t.default.createElement("div",{className:U.default.cubeSpinner},t.default.createElement("span",{className:U.default.face1},"Web Services"),t.default.createElement("span",{className:U.default.face2},"Blockchain"),t.default.createElement("span",{className:U.default.face3},"Mobile Apps")))),t.default.createElement("section",{style:{margin:"20px 0",fontSize:40}},t.default.createElement(f.default,{start:20,end:1e4,duration:10,enableScrollSpy:!0})),t.default.createElement("section",{style:{margin:"20px 0",fontSize:40}},t.default.createElement(k.default,null)),t.default.createElement("section",{style:{width:600,margin:"30px 0"}},t.default.createElement(i.Input,{defaultValue:ye,placeholder:"api key",onChange:D,style:{marginBottom:20}}),t.default.createElement(i.Flex,{align:"center"},t.default.createElement(i.Input.TextArea,{ref:v,defaultValue:b,placeholder:"\u6765\uFF0C\u8BF4\u70B9\u4EC0\u4E48\u5457...Meta + Enter\u53D1\u9001",onChange:R,onKeyDown:L,autoSize:!0,style:{width:300,height:30,caretColor:"#ff0000"}}),t.default.createElement(i.Button,{style:{margin:"0 10px"},icon:t.default.createElement(p.SendOutlined,{rotate:-60}),type:"primary",disabled:ce,onClick:K},"\u53D1\u9001"),t.default.createElement(i.Button,{icon:t.default.createElement(p.SendOutlined,{rotate:-60}),type:"primary",disabled:!ce,onClick:Y},"\u505C\u6B62"))),t.default.createElement("section",null,ce&&t.default.createElement("div",null,"\u6B63\u5728\u8F93\u5165..."),t.default.createElement("section",{style:{textAlign:"right",color:"#666"}},je),t.default.createElement(m.default,{markdownText:ae,isLoading:ce})),t.default.createElement("section",{style:{position:"relative"}},t.default.createElement(W.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(d.ResponsiveMasonry,{columnsCountBreakPoints:{350:1,750:2,900:6}},t.default.createElement(d.default,{gutter:"10px"},t.default.createElement(g.default,{src:"https://picsum.photos/id/1/300/100",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/2/300/200",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/3/300/150",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/4/300/150",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/5/300/200",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/6/300/100",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/7/300/150",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/8/300/200",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/1/300/100",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/2/300/200",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/3/300/150",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/4/300/150",alt:"Strawberries"})))),t.default.createElement("section",{style:{margin:20}},t.default.createElement(w.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(A.default,{autoFill:!0,direction:"left",gradient:!0,gradientColor:"rgba(255, 255, 255, 0.8)"},t.default.createElement("div",{style:{width:200,height:40,lineHeight:"40px",textAlign:"center",background:"#aaa",margin:"0 10px",borderRadius:4}},"React"))),t.default.createElement("section",{style:{margin:20}},t.default.createElement(A.default,{autoFill:!0,direction:"right",gradient:!0,gradientColor:"rgba(255, 255, 255, 0.8)"},t.default.createElement("div",{style:{width:200,height:40,lineHeight:"40px",textAlign:"center",background:"#aaa",margin:"0 10px",borderRadius:4}},"Vue"))),t.default.createElement("section",{style:{margin:"20px 0"}},t.default.createElement(V.default,{preCode:`
const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}
          `})))},Ue=n.default=_e},31819:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.trimTopic=n.toFixedBug=n.toFixed=n.toCamelCase=n.sleep=n.shuffleArr=n.saveHtmlToPng=n.reqStringify=n.readFromFile=n.randomString=n.randomNum=n.randomItem=n.randomHex=n.randomColor=n.random=n.promiseWithTimeout=n.prettyObject=n.pause=n.passwordStrength=n.oneApiChat=n.limitDecimal=n.isURLSearchParams=n.isObject=n.isNotEmpty=n.isEqual=n.isEmptyArray=n.isDecimal=n.isDate=n.isDarkMode=n.isArray=n.hidePhone=n.hasFocus=n.getType=n.getRandomId=n.getParamObject=n.getImgsUrl=n.getFileType=n.getEnv=n.getCurrentDate=n.fetchSomething=n.exportJsonData=n.exportFile=n.dayDif=n.customizeTimer=n.copyTextToClipboard=n.clearCookies=n.checkIsLocalPage=n.capitalize=n.camelizeCamelCase=n.asyncTo=n.asyncAction=n.ThousandNum=n.RoundNum=n.RandomId=void 0;var s=o(e(54756)),u=o(e(29293)),t=o(e(41132)),i=o(e(73738)),p=e(55373),E=o(e(20354)),f=n.getEnv=function(){var c;return typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]"&&(c="NODE"),typeof XMLHttpRequest!="undefined"&&(c="BROWSER"),c},l=n.isArray=function(c){return(0,i.default)(c)==="object"&&Object.prototype.toString.call(c)==="[object Array]"},_=n.isURLSearchParams=function(c){return typeof URLSearchParams!="undefined"&&c instanceof URLSearchParams},A=n.isDate=function(c){return(0,i.default)(c)==="object"&&Object.prototype.toString.call(c)==="[object Date]"},d=n.isObject=function(c){return c!==null&&(0,i.default)(c)==="object"},a=n.getParamObject=function(c){return _(c)?(0,p.parse)(c.toString(),{strictNullHandling:!0}):typeof c=="string"?[c]:c},r=n.reqStringify=function(c){return(0,p.stringify)(c,{arrayFormat:"repeat",strictNullHandling:!0})},m=n.getType=function(c){var v=Object.prototype.toString.call(c),D=/\[object (.*?)\]/.exec(v);return D?D[1]:null},y=n.hidePhone=function(c){return c==null?void 0:c.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")},O=n.asyncAction=function(c){var v=Promise.resolve(c);return function(D){v.then(function(){return setTimeout(function(){return D()})})}},g=n.getImgsUrl=function(c){var v=/<img.*?(?:>|\/>)/gi,D=/src=['"]?([^'"]*)['"]?/i,R=c.match(v);if(!R)return null;var L=R.reduce(function(K,Y){var X=Y.match(D);return X[1]?[].concat((0,t.default)(K),[X[1]]):K},[]);return L},C=n.customizeTimer={intervalTimer:null,timeoutTimer:null,setTimeout:function(c,v){var D=this,R=Date.now,L=R(),K=L,Y=function(){D.timeoutTimer=requestAnimationFrame(Y),K=R(),K-L>=v&&(c(),cancelAnimationFrame(D.timeoutTimer))};return this.timeoutTimer=requestAnimationFrame(Y),this.timeoutTimer},clearTimeout:function(){cancelAnimationFrame(this.timeoutTimer)},setInterval:function(c,v){var D=this,R=Date.now,L=R(),K=L,Y=function(){D.intervalTimer=requestAnimationFrame(Y),K=R(),K-L>=v&&(L=R(),K=L,c())};return this.intervalTimer=requestAnimationFrame(Y),this.intervalTimer},clearInterval:function(){cancelAnimationFrame(this.intervalTimer)}},h=n.isDecimal=function(c){var v=/(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/;return v.test(c)},P=n.limitDecimal=function(c){return c.replace(/^(-)*(\d+)\.(\d\d).*$/,"$1$2.$3")},I=n.passwordStrength=function(c){var v=/^(?=.*[A-Z])(?=.*[\d])(?=.*[a-z]).{8,}$/;return v.test(c)},j=n.checkIsLocalPage=function(){document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")return!1;if(document.visibilityState==="visible")return!0;window.addEventListener("pagehide",function(c){c.persisted},!1)})},M=n.randomHex=function(){return"#".concat(Math.floor(Math.random()*16777215).toString(16).padEnd(6,"0"))},S=n.clearCookies=document.cookie.split(";").forEach(function(b){return document.cookie=b.replace(/^ +/,"").replace(/[=].*/,"=;expires=".concat(new Date(0).toUTCString(),";path=/"))}),x=n.dayDif=function(c,v){return Math.ceil(Math.abs(c.getTime()-v.getTime())/864e5)},T=n.capitalize=function(c){return c.charAt(0).toUpperCase()+c.slice(1)},W=n.isNotEmpty=function(c){return Array.isArray(c)&&c.length>0},k=n.isDarkMode=window.matchMedia("(prefers-color-scheme: dark)").matches,z=n.fetchSomething=function(){return new Promise(function(c){setTimeout(function(){c("")},1e3)})},Z=n.toFixed=function(c,v){if(typeof c!="number")throw new Error("number\u4E0D\u662F\u6570\u5B57");var D=Math.round(Math.pow(10,v)*c)/Math.pow(10,v);if(D=String(D),D.indexOf(".")===-1)v!==0&&(D+=".",D+=new Array(v+1).join("0"));else{var R=D.split(".");R[1].length<v&&(R[1]+=new Array(v-R[1].length+1).join("0")),D=R.join(".")}return D},w=n.toFixedBug=function(c,v){return~~(Math.pow(10,v)*c)/Math.pow(10,v)},V=n.promiseWithTimeout=function(c,v){var D=new Promise(function(R){return setTimeout(function(){return R("Time Out!")},v)});return Promise.race([D,c])},H=n.shuffleArr=function(c){return c.sort(function(){return .5-Math.random()})},re=n.sleep=function(c){return new Promise(function(v){return setTimeout(function(){return v()},c)})},U=n.ThousandNum=function(c){return c.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},te=n.RandomId=function(c){return Math.random().toString(36).substring(3,c)},ue=n.RoundNum=function(c,v){return Math.round(c*Math.pow(10,v))/Math.pow(10,v)},_e=n.randomNum=function(c,v){return Math.floor(Math.random()*(v-c+1))+c},Ue=n.isEmptyArray=function(c){return Array.isArray(c)&&!c.length},F=n.randomItem=function(c){return c[Math.floor(Math.random()*c.length)]},ie=n.asyncTo=function(c){return c.then(function(v){return[null,v]}).catch(function(v){return[v]})},q=n.hasFocus=function(c){return c===document.activeElement},ae=n.isEqual=function(c,v){return JSON.stringify(c)===JSON.stringify(v)},ee=n.randomString=function(){return Math.random().toString(36).slice(2)},G=n.toCamelCase=function(c){return c.trim().replace(/[-_\s]+(.)?/g,function(v,D){return D?D.toUpperCase():""})},se=n.random=function(c,v){return Math.floor(Math.random()*(v-c+1)+c)},ge=n.randomColor=function(){return"#".concat(Math.random().toString(16).slice(2,8).padEnd(6,"0"))},ce=n.pause=function(c){return new Promise(function(v){return setTimeout(v,c)})},le=n.camelizeCamelCase=function(c){return c.replace(/(?:^\w|[A-Z]|\b\w)/g,function(v,D){return D===0?v.toLowerCase():v.toUpperCase()}).replace(/\s+/g,"")},Ie=n.copyTextToClipboard=function(){var b=(0,u.default)(s.default.mark(function c(v){var D;return s.default.wrap(function(L){for(;;)switch(L.prev=L.next){case 0:if(L.prev=0,!((D=navigator)!==null&&D!==void 0&&(D=D.clipboard)!==null&&D!==void 0&&D.writeText)){L.next=4;break}return L.next=4,navigator.clipboard.writeText(v);case 4:L.next=8;break;case 6:L.prev=6,L.t0=L.catch(0);case 8:case"end":return L.stop()}},c,null,[[0,6]])}));return function(v){return b.apply(this,arguments)}}(),pe=n.getRandomId=function(){for(var c="",v="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",D=0;D<32;D++)c+=v.charAt(Math.floor(Math.random()*v.length));return c},je=n.oneApiChat=function(c,v,D){return fetch("https://api.openai.com/v1/chat/completions",{method:"POST",signal:D,headers:{Authorization:v,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:c,stream:!0})})},Ce=n.getCurrentDate=function(){var c=new Date,v=c.getDate(),D=c.getMonth()+1,R=c.getFullYear();return"".concat(R,"-").concat(D,"-").concat(v)},Be=n.exportJsonData=function(c){var v=Ce(),D=JSON.stringify(JSON.parse(c),null,2),R=new Blob([D],{type:"application/json"}),L=URL.createObjectURL(R),K=document.createElement("a");K.href=L,K.download="chat-store_".concat(v,".json"),document.body.appendChild(K),K.click(),document.body.removeChild(K)},Te=n.saveHtmlToPng=function(){var b=(0,u.default)(s.default.mark(function c(v,D,R){var L,K,Y,X;return s.default.wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.prev=0,L=v!=null?v:document.getElementById("image-wrapper"),Q.next=4,(0,E.default)(L,{useCORS:!0});case 4:K=Q.sent,Y=K.toDataURL("image/png"),X=document.createElement("a"),X.style.display="none",X.href=Y,X.setAttribute("download","chat-shot.png"),typeof X.download=="undefined"&&X.setAttribute("target","_blank"),document.body.appendChild(X),X.click(),document.body.removeChild(X),window.URL.revokeObjectURL(Y),D&&D(),Promise.resolve(),Q.next=22;break;case 19:Q.prev=19,Q.t0=Q.catch(0),R&&R(Q.t0.message);case 22:case"end":return Q.stop()}},c,null,[[0,19]])}));return function(v,D,R){return b.apply(this,arguments)}}(),ve=n.trimTopic=function(c){return c.replace(/[，。！？”“"、,.!?]*$/,"")},ye=n.readFromFile=function(){return new Promise(function(c,v){var D=document.createElement("input");D.type="file",D.accept="application/json",D.onchange=function(R){var L=R.target.files[0],K=new FileReader;K.onload=function(Y){c(Y.target.result)},K.onerror=function(Y){return v(new Error(Y))},K.readAsText(L)},D.click()})},Re=n.prettyObject=function(c){var v="";return typeof c!="string"&&(v=JSON.stringify(c,null,"  ")),v==="{}"?v.toString():v.startsWith("```json")?v:["```json",v,"```"].join(`
`)},he=n.getFileType=function(c,v){var D=v.split(".").pop().toLowerCase();switch(D){case"txt":return"text/plain";case"json":return"application/json";case"doc":return"application/msword";case"docx":return"application/vnd.openxmlformats-officedocument.wordprocessingml.document";case"xls":return"application/vnd.ms-excel";case"xlsx":return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";case"ppt":return"application/vnd.ms-powerpoint";case"pptx":return"application/vnd.openxmlformats-officedocument.presentationml.presentation";case"pdf":return"application/pdf";case"jpg":case"jpeg":return"image/jpeg";case"png":return"image/png";case"gif":return"image/gif";case"zip":return"application/zip";case"rar":return"application/x-rar-compressed";default:if(typeof c=="string")try{return JSON.parse(c),"application/json"}catch(R){return"text/plain"}else return c instanceof Uint8Array||c instanceof ArrayBuffer,"application/octet-stream"}},be=n.exportFile=function(c,v){var D;if((c==null||(D=c.headers["content-type"])===null||D===void 0?void 0:D.indexOf("application/json"))===-1){var R=c.headers&&c.headers["content-disposition"]||"attachment;filename=".concat(v||"file",".xlsx"),L=decodeURI(R==null?void 0:R.split("=")[1].replace(/'/g,"")).replace(/"/g,"").replace("utf-8''","")||"",K=he(c.data,v||L),Y=new Blob([c.data],{type:K}),X=URL.createObjectURL(Y),oe=document.createElement("a");document.body.appendChild(oe),oe.style="display: none",oe.href=X,oe.download=L,oe.click(),document.body.removeChild(oe)}}},21378:function(B,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.fireConfetti=void 0;var s=o(e(43693)),u=o(e(14685));function t(_,A){var d=Object.keys(_);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(_);A&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(_,r).enumerable})),d.push.apply(d,a)}return d}function i(_){for(var A=1;A<arguments.length;A++){var d=arguments[A]!=null?arguments[A]:{};A%2?t(Object(d),!0).forEach(function(a){(0,s.default)(_,a,d[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(_,Object.getOwnPropertyDescriptors(d)):t(Object(d)).forEach(function(a){Object.defineProperty(_,a,Object.getOwnPropertyDescriptor(d,a))})}return _}var p=200,E={origin:{y:.7},zIndex:1500};function f(_,A){(0,u.default)(i(i(i({},E),A),{},{particleCount:Math.floor(p*_)}))}var l=n.fireConfetti=function(){f(.25,{spread:26,startVelocity:55}),f(.2,{spread:60}),f(.35,{spread:100,decay:.91,scalar:.8}),f(.1,{spread:120,startVelocity:25,decay:.92,scalar:1.2}),f(.1,{spread:120,startVelocity:45})}},25039:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(47122),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},48122:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(61543),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},57903:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(9666),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},21958:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(97669),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},39726:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(27825),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},49511:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(90958),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},84576:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(80711),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},85120:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(45789),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},61352:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(91869),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},89696:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(22211),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},89200:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(38791),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},49887:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(6988),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},71352:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(96657),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},91193:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(41742),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},81709:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(62264),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},95280:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(97331),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},1052:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(38413),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},47443:function(B,n,e){"use strict";e.r(n);var o=e(85072),s=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),l=e(10540),_=e.n(l),A=e(41113),d=e.n(A),a=e(37318),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},82547:function(B){"use strict";B.exports="data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 4%27%3E%3Cstyle type=%27text/css%27%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX%280%29;}to {transform:translateX%28-15px%29;}}%3C/style%3E%3Cpath fill=%27none%27 stroke=%27%230087ca%27 stroke-width=%272%27 class=%27squiggle%27 d=%27M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3%27/%3E%3C/svg%3E"},42634:function(){}}]);
