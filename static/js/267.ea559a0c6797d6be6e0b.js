(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[267],{65548:function(v,n,e){"use strict";var o=e(24994),d=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=o(e(43693)),r=m(e(96540)),a=e(74848);function g(u){if(typeof WeakMap!="function")return null;var l=new WeakMap,t=new WeakMap;return(g=function(O){return O?t:l})(u)}function m(u,l){if(!l&&u&&u.__esModule)return u;if(u===null||d(u)!="object"&&typeof u!="function")return{default:u};var t=g(l);if(t&&t.has(u))return t.get(u);var E={__proto__:null},O=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var B in u)if(B!=="default"&&{}.hasOwnProperty.call(u,B)){var h=O?Object.getOwnPropertyDescriptor(u,B):null;h&&(h.get||h.set)?Object.defineProperty(E,B,h):E[B]=u[B]}return E.default=u,t&&t.set(u,E),E}function C(u,l){var t=Object.keys(u);if(Object.getOwnPropertySymbols){var E=Object.getOwnPropertySymbols(u);l&&(E=E.filter(function(O){return Object.getOwnPropertyDescriptor(u,O).enumerable})),t.push.apply(t,E)}return t}function i(u){for(var l=1;l<arguments.length;l++){var t=arguments[l]!=null?arguments[l]:{};l%2?C(Object(t),!0).forEach(function(E){(0,A.default)(u,E,t[E])}):Object.getOwnPropertyDescriptors?Object.defineProperties(u,Object.getOwnPropertyDescriptors(t)):C(Object(t)).forEach(function(E){Object.defineProperty(u,E,Object.getOwnPropertyDescriptor(t,E))})}return u}var c=function(l){return(0,a.jsxs)("svg",i(i({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"#fff",viewBox:"0 0 120 30"},l),{},{children:[(0,a.jsxs)("circle",{cx:15,cy:15,r:15,children:[(0,a.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,a.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]}),(0,a.jsxs)("circle",{cx:60,cy:15,r:9,fillOpacity:.3,children:[(0,a.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:9,repeatCount:"indefinite",to:9,values:"9;15;9"}),(0,a.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:.5,repeatCount:"indefinite",to:.5,values:".5;1;.5"})]}),(0,a.jsxs)("circle",{cx:105,cy:15,r:15,children:[(0,a.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,a.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]})]}))},_=n.default=c},47122:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=r()(d());a.push([v.id,`.alternating--mj1_d {
  animation-name: alternating-text--p6lWH;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  background: linear-gradient(to right, #000, #0f9b0f);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
          background-clip: text;
  font-size: 20px;
  font-weight: 700;
}

@keyframes alternating-text--p6lWH {
  90% {
    display: none;
  }
}
`,"",{version:3,sources:["webpack://./src/components/stateless/AlternatingText/index.module.less"],names:[],mappings:"AAAA;EACE,uCAAgC;EAChC,sBAAsB;EACtB,mCAAmC;EACnC,+BAA+B;EAC/B,oDAAoD;EACpD,oCAAoC;EACpC,6BAAqB;UAArB,qBAAqB;EACrB,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE;IACE,aAAa;EACf;AACF",sourcesContent:[`.alternating {
  animation-name: alternating-text;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  background: linear-gradient(to right, #000, #0f9b0f);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 20px;
  font-weight: 700;
}

@keyframes alternating-text {
  90% {
    display: none;
  }
}
`],sourceRoot:""}]),a.locals={alternating:"alternating--mj1_d","alternating-text":"alternating-text--p6lWH",alternatingText:"alternating-text--p6lWH"},n.A=a},61543:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=r()(d());a.push([v.id,`.btn--Vmubv {
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: #3857e3;
  font-weight: medium;
  color: #fff;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 10%),
    0 1px 2px 0 rgb(0 0 0 / 6%);
  overflow: hidden;
  position: relative;
  padding: 4px 16px;
  font-size: 0.875rem;
}

.content--jujDv {
  z-index: 2;
}

.btn--Vmubv:hover {
  filter: brightness(115%);
  cursor: pointer;
}

.btn-ripple--w2aOn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgb(255 255 255 / 20%);
  animation: ripple--oIc_l 0.4s ease-in;
}

.btn-ripple-container--II62b {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
}

@keyframes ripple--oIc_l {
  0% {
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  100% {
    width: 200%;
    padding-bottom: 200%;
    opacity: 0;
  }
}
`,"",{version:3,sources:["webpack://./src/components/stateless/AnimateRipple/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,oBAAoB;EACpB,mBAAmB;EACnB,uBAAuB;EACvB,6BAA6B;EAC7B,yBAAyB;EACzB,mBAAmB;EACnB,WAAW;EACX;;+BAE6B;EAC7B,gBAAgB;EAChB,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,wBAAwB;EACxB,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,UAAU;EACV,QAAQ;EACR,SAAS;EACT,kBAAkB;EAClB,kCAAkC;EAClC,qCAA8B;AAChC;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,uBAAuB;AACzB;;AAEA;EACE;IACE,UAAU;EACZ;;EAEA;IACE,UAAU;EACZ;;EAEA;IACE,WAAW;IACX,oBAAoB;IACpB,UAAU;EACZ;AACF",sourcesContent:[`.btn {
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: #3857e3;
  font-weight: medium;
  color: #fff;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 10%),
    0 1px 2px 0 rgb(0 0 0 / 6%);
  overflow: hidden;
  position: relative;
  padding: 4px 16px;
  font-size: 0.875rem;
}

.content {
  z-index: 2;
}

.btn:hover {
  filter: brightness(115%);
  cursor: pointer;
}

.btn-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgb(255 255 255 / 20%);
  animation: ripple 0.4s ease-in;
}

.btn-ripple-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
}

@keyframes ripple {
  0% {
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  100% {
    width: 200%;
    padding-bottom: 200%;
    opacity: 0;
  }
}
`],sourceRoot:""}]),a.locals={btn:"btn--Vmubv",content:"content--jujDv","btn-ripple":"btn-ripple--w2aOn",btnRipple:"btn-ripple--w2aOn",ripple:"ripple--oIc_l","btn-ripple-container":"btn-ripple-container--II62b",btnRippleContainer:"btn-ripple-container--II62b"},n.A=a},9666:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=r()(d());a.push([v.id,`.hIBkFg--xUSDY {
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
`,"",{version:3,sources:["webpack://./src/components/stateless/AnimateWave/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,SAAS;EACT,YAAY;EACZ,uEAAuE;EACvE,oCAAoC;AACtC;;AAEA;EACE,4EAA4E;EAC5E,oCAAoC;AACtC;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,4BAAqB;EACrB,sBAAsB;EACtB,8DAA8D;EAC9D,6BAA6B;EAC7B,mCAAmC;AACrC;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE;IACE,UAAU;IACV,uEAAuE;IACvE,eAAe;EACjB;;EAEA;IACE,UAAU;IACV,8EAA8E;IAC9E,kBAAkB;EACpB;;EAEA;IACE,UAAU;IACV,+EAA+E;IAC/E,kBAAkB;EACpB;;EAEA;IACE,UAAU;IACV,uEAAuE;IACvE,eAAe;EACjB;AACF",sourcesContent:[`.hIBkFg {
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
`],sourceRoot:""}]),a.locals={hIBkFg:"hIBkFg--xUSDY",kqOLaE:"kqOLaE--z4koa","bz-an":"bz-an--moL5G",bzAn:"bz-an--moL5G"},n.A=a},97669:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=e(4417),g=e.n(a),m=new URL(e(82547),e.b),C=r()(d()),i=g()(m);C.push([v.id,`a.squiggle--JQRWj {
  background-image: linear-gradient(to bottom, #0087ca 0%, #0087ca 100%);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 1px 1px;
  color: inherit;
  text-decoration: none;
}

a.squiggle--JQRWj:hover {
  background-image: url(`+i+`);
  background-size: auto 2px;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/AutoLink/index.module.less"],names:[],mappings:"AAAA;EACE,sEAAsE;EACtE,2BAA2B;EAC3B,2BAA2B;EAC3B,wBAAwB;EACxB,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,yDAA0b;EAC1b,yBAAyB;AAC3B",sourcesContent:[`a.squiggle {
  background-image: linear-gradient(to bottom, #0087ca 0%, #0087ca 100%);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 1px 1px;
  color: inherit;
  text-decoration: none;
}

a.squiggle:hover {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-15px);}}%3C/style%3E%3Cpath fill='none' stroke='%230087ca' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
  background-size: auto 2px;
}
`],sourceRoot:""}]),C.locals={squiggle:"squiggle--JQRWj"},n.A=C},27825:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=r()(d());a.push([v.id,`.avatarCard--kIii3 {
  .card--W_bZq {
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f3f1fe;
    border-radius: 10px;
    margin: 8px;
    margin-top: 100px;
  }

  .card--W_bZq figure {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-top: -60px;
    position: relative;
  }

  .card--W_bZq figure::before {
    content: '';
    border-radius: inherit;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    border: 1rem solid #fff;
    box-shadow: 0 1px #fff;
  }

  .card--W_bZq figure img {
    border-radius: inherit;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card--W_bZq .content--yiHmV {
    text-align: center;
    margin: 2rem;
    line-height: 1.5;
    color: #101010;
  }
}
`,"",{version:3,sources:["webpack://./src/components/stateless/AvatarCard/index.module.less"],names:[],mappings:"AAAA;EACE;IACE,YAAY;IACZ,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,mBAAmB;IACnB,mBAAmB;IACnB,WAAW;IACX,iBAAiB;EACnB;;EAEA;IACE,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,iBAAiB;IACjB,kBAAkB;EACpB;;EAEA;IACE,WAAW;IACX,sBAAsB;IACtB,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,WAAW;IACX,YAAY;IACZ,gCAAgC;IAChC,uBAAuB;IACvB,sBAAsB;EACxB;;EAEA;IACE,sBAAsB;IACtB,WAAW;IACX,YAAY;IACZ,iBAAiB;EACnB;;EAEA;IACE,kBAAkB;IAClB,YAAY;IACZ,gBAAgB;IAChB,cAAc;EAChB;AACF",sourcesContent:[`.avatarCard {
  .card {
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f3f1fe;
    border-radius: 10px;
    margin: 8px;
    margin-top: 100px;
  }

  .card figure {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-top: -60px;
    position: relative;
  }

  .card figure::before {
    content: '';
    border-radius: inherit;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    border: 1rem solid #fff;
    box-shadow: 0 1px #fff;
  }

  .card figure img {
    border-radius: inherit;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card .content {
    text-align: center;
    margin: 2rem;
    line-height: 1.5;
    color: #101010;
  }
}
`],sourceRoot:""}]),a.locals={avatarCard:"avatarCard--kIii3",card:"card--W_bZq",content:"content--yiHmV"},n.A=a},90958:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=r()(d());a.push([v.id,`.breatheItem--VaM9v {
  width: 40px;
  height: 40px;
  background-color: #27c2a3;
  border-radius: 50%;
  text-align: center;
  margin-bottom: 80px;
}

.breatheItem--VaM9v::before {
  content: '';
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  opacity: 0.7;
  background-color: #27c2a3;
  animation: breathe--wA3l6 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
}

@keyframes breathe--wA3l6 {
  0% {
    transform: scale(1);
  }

  50%,
  75% {
    transform: scale(3);
  }

  78%,
  100% {
    opacity: 0;
  }
}

.loopRotate--GRmod {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  .outside--NZwXf {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    border: 1px dashed #44ec79;
    border-radius: 50%;
    position: relative;

    .inner--ZClIQ {
      width: 100px;
      height: 100px;
      border: 3px dashed #44ec79;
      border-radius: 50%;
      text-align: center;
      line-height: 100px;
      animation: loop--Q7Ru6 10s linear infinite;
    }

    .text--FGKfx {
      position: absolute;
      padding: 0;
      color: #44ec79;
      font-size: 20px;
      font-weight: bolder;
    }
  }
}

@keyframes loop--Q7Ru6 {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes trans--jcajC {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

.play-button--Wg3em {
  z-index: 1;
  width: 100px;
  height: 100px;
  background-color: #2761ff;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  box-shadow:
    1px 1px 94px #000,
    1px 1px 164px rgb(39 97 255 / 90%);
  animation: zoom-in-zoom-out--alaL8 2s ease infinite;
}

.div-block--OwsxA {
  width: 86px;
  height: 86px;
  background-color: rgb(39 97 255 / 10%);
  border-radius: 100%;
  position: absolute;
}

@keyframes zoom-in-zoom-out--alaL8 {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.div-block-1019--iYyTM {
  width: 1px;
  height: 100px;
  background-image: linear-gradient(#1d1d1c, #462f19 28%, #ff800d);
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  top: -98px;
  left: 0;
  right: 0;
}

.div-block-1021--EWkRm.code--Wc_Yz {
  background-image: radial-gradient(circle, #006b6b, rgb(158 75 0 / 0%));
  border-color: #1cc7c7;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/BreatheText/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,cAAc;EACd,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,yBAAyB;EACzB,oEAA6D;AAC/D;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;;IAEE,mBAAmB;EACrB;;EAEA;;IAEE,UAAU;EACZ;AACF;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,kBAAkB;;EAElB;IACE,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;IACZ,aAAa;IACb,0BAA0B;IAC1B,kBAAkB;IAClB,kBAAkB;;IAElB;MACE,YAAY;MACZ,aAAa;MACb,0BAA0B;MAC1B,kBAAkB;MAClB,kBAAkB;MAClB,kBAAkB;MAClB,0CAAmC;IACrC;;IAEA;MACE,kBAAkB;MAClB,UAAU;MACV,cAAc;MACd,eAAe;MACf,mBAAmB;IACrB;EACF;AACF;;AAEA;EACE;IACE,uBAAuB;EACzB;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE;IACE,uBAAuB;EACzB;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,uBAAuB;EACzB;AACF;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,aAAa;EACb,yBAAyB;EACzB,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;EACb,kBAAkB;EAClB;;sCAEoC;EACpC,mDAA4C;AAC9C;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,sCAAsC;EACtC,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,qBAAqB;EACvB;;EAEA;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE,UAAU;EACV,aAAa;EACb,gEAAgE;EAChE,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;EAClB,UAAU;EACV,OAAO;EACP,QAAQ;AACV;;AAEA;EACE,sEAAsE;EACtE,qBAAqB;AACvB",sourcesContent:[`.breatheItem {
  width: 40px;
  height: 40px;
  background-color: #27c2a3;
  border-radius: 50%;
  text-align: center;
  margin-bottom: 80px;
}

.breatheItem::before {
  content: '';
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  opacity: 0.7;
  background-color: #27c2a3;
  animation: breathe 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
}

@keyframes breathe {
  0% {
    transform: scale(1);
  }

  50%,
  75% {
    transform: scale(3);
  }

  78%,
  100% {
    opacity: 0;
  }
}

.loopRotate {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  .outside {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    border: 1px dashed #44ec79;
    border-radius: 50%;
    position: relative;

    .inner {
      width: 100px;
      height: 100px;
      border: 3px dashed #44ec79;
      border-radius: 50%;
      text-align: center;
      line-height: 100px;
      animation: loop 10s linear infinite;
    }

    .text {
      position: absolute;
      padding: 0;
      color: #44ec79;
      font-size: 20px;
      font-weight: bolder;
    }
  }
}

@keyframes loop {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes trans {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

.play-button {
  z-index: 1;
  width: 100px;
  height: 100px;
  background-color: #2761ff;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  box-shadow:
    1px 1px 94px #000,
    1px 1px 164px rgb(39 97 255 / 90%);
  animation: zoom-in-zoom-out 2s ease infinite;
}

.div-block {
  width: 86px;
  height: 86px;
  background-color: rgb(39 97 255 / 10%);
  border-radius: 100%;
  position: absolute;
}

@keyframes zoom-in-zoom-out {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.div-block-1019 {
  width: 1px;
  height: 100px;
  background-image: linear-gradient(#1d1d1c, #462f19 28%, #ff800d);
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  top: -98px;
  left: 0;
  right: 0;
}

.div-block-1021.code {
  background-image: radial-gradient(circle, #006b6b, rgb(158 75 0 / 0%));
  border-color: #1cc7c7;
}
`],sourceRoot:""}]),a.locals={breatheItem:"breatheItem--VaM9v",breathe:"breathe--wA3l6",loopRotate:"loopRotate--GRmod",loop:"loop--Q7Ru6",outside:"outside--NZwXf",inner:"inner--ZClIQ",text:"text--FGKfx","play-button":"play-button--Wg3em",playButton:"play-button--Wg3em","zoom-in-zoom-out":"zoom-in-zoom-out--alaL8",zoomInZoomOut:"zoom-in-zoom-out--alaL8","div-block":"div-block--OwsxA",divBlock:"div-block--OwsxA","div-block-1019":"div-block-1019--iYyTM",divBlock1019:"div-block-1019--iYyTM","div-block-1021":"div-block-1021--EWkRm",divBlock1021:"div-block-1021--EWkRm",code:"code--Wc_Yz",trans:"trans--jcajC"},n.A=a},80711:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=r()(d());a.push([v.id,`.gradientTracking--FyamC {
  position: relative;
  margin: 10px 0;
  background: #7983ff;
  padding: 5px 10px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  outline: none;
  overflow: hidden;
}

.gradientTracking--FyamC span {
  position: relative;
  pointer-events: none;
}

.gradientTracking--FyamC::before {
  --size: 0;

  content: '';
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: 0;
  width: var(--size);
  height: 0;
  height: var(--size);
  background: radial-gradient(circle closest-side, pink, transparent);
  transform: translate(-50%, -50%);
  transition:
    width 0.2s ease,
    height 0.2s ease;
}

.gradientTracking--FyamC:hover::before {
  --size: 200px;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/GradientTracking/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,cAAc;EACd,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;EACf,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,eAAe;EACf,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,SAAS;;EAET,WAAW;EACX,kBAAkB;EAClB,cAAc;EACd,aAAa;EACb,QAAkB;EAAlB,kBAAkB;EAClB,SAAmB;EAAnB,mBAAmB;EACnB,mEAAmE;EACnE,gCAAgC;EAChC;;oBAEkB;AACpB;;AAEA;EACE,aAAa;AACf",sourcesContent:[`.gradientTracking {
  position: relative;
  margin: 10px 0;
  background: #7983ff;
  padding: 5px 10px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  outline: none;
  overflow: hidden;
}

.gradientTracking span {
  position: relative;
  pointer-events: none;
}

.gradientTracking::before {
  --size: 0;

  content: '';
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle closest-side, pink, transparent);
  transform: translate(-50%, -50%);
  transition:
    width 0.2s ease,
    height 0.2s ease;
}

.gradientTracking:hover::before {
  --size: 200px;
}
`],sourceRoot:""}]),a.locals={gradientTracking:"gradientTracking--FyamC"},n.A=a},45789:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=r()(d());a.push([v.id,`.isometricCard--mEKMm {
  margin: 0 100px;
  transform: rotateX(51deg) rotateZ(43deg);
  transform-style: preserve-3d;
  will-change: transform;
  display: flex;
  align-items: center;
  width: 240px;
  height: 320px;
  background: #070221;
  border-radius: 2rem;
  box-shadow:
    1px 1px 0 1px #f9f9fb,
    -1px 0 28px 0 rgb(34 33 81 / 1%),
    28px 28px 28px 0 rgb(34 33 81 / 25%);
  transition:
    0.4s ease-in-out transform,
    0.3s ease-in-out box-shadow;
  color: #fff;
}

.isometricCard--mEKMm:hover {
  transform: translate3d(0, -16px, 0) rotateX(51deg) rotateZ(43deg);
  box-shadow:
    1px 1px 0 1px #f9f9fb,
    -1px 0 28px 0 rgb(34 33 81 / 1%),
    54px 54px 28px -10px rgb(34 33 81 / 15%);
}

.isometricCard--mEKMm p {
  margin: 0 36px;
  text-align: center;
  font-size: 20px;
  line-height: 1.4;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/IsometricCard/index.module.less"],names:[],mappings:"AAAA;EACE,eAAe;EACf,wCAAwC;EACxC,4BAA4B;EAC5B,sBAAsB;EACtB,aAAa;EACb,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB;;;wCAGsC;EACtC;;+BAE6B;EAC7B,WAAW;AACb;;AAEA;EACE,iEAAiE;EACjE;;;4CAG0C;AAC5C;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,eAAe;EACf,gBAAgB;AAClB",sourcesContent:[`.isometricCard {
  margin: 0 100px;
  transform: rotateX(51deg) rotateZ(43deg);
  transform-style: preserve-3d;
  will-change: transform;
  display: flex;
  align-items: center;
  width: 240px;
  height: 320px;
  background: #070221;
  border-radius: 2rem;
  box-shadow:
    1px 1px 0 1px #f9f9fb,
    -1px 0 28px 0 rgb(34 33 81 / 1%),
    28px 28px 28px 0 rgb(34 33 81 / 25%);
  transition:
    0.4s ease-in-out transform,
    0.3s ease-in-out box-shadow;
  color: #fff;
}

.isometricCard:hover {
  transform: translate3d(0, -16px, 0) rotateX(51deg) rotateZ(43deg);
  box-shadow:
    1px 1px 0 1px #f9f9fb,
    -1px 0 28px 0 rgb(34 33 81 / 1%),
    54px 54px 28px -10px rgb(34 33 81 / 15%);
}

.isometricCard p {
  margin: 0 36px;
  text-align: center;
  font-size: 20px;
  line-height: 1.4;
}
`],sourceRoot:""}]),a.locals={isometricCard:"isometricCard--mEKMm"},n.A=a},91869:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=r()(d());a.push([v.id,`.hoverRotate--ew29g {
  overflow: hidden;
  background-color: #000;
  color: #fff;
  display: inline-block;
  max-width: 300px;
  min-width: 160px;
  position: relative;
  width: 100%;
}

.hoverRotate--ew29g * {
  box-sizing: border-box;
  transition: all 0.45s ease;
}

.hoverRotate--ew29g::before,
.hoverRotate--ew29g::after {
  background-color: rgb(0 0 0 / 50%);
  border-top: 32px solid rgb(0 0 0 / 50%);
  border-bottom: 32px solid rgb(0 0 0 / 50%);
  position: absolute;
  inset: 0;
  content: '';
  transition: all 0.3s ease;
  z-index: 1;
  opacity: 0;
  transform: scaleY(2);
}

.hoverRotate--ew29g img {
  vertical-align: top;
  backface-visibility: hidden;
  transition: all 0.3s;
  box-sizing: border-box;
  max-width: 100%;
}

.hoverRotate--ew29g img::before {
  content: 'Sorry, this image is unavailable.';
  display: block;
  margin-bottom: 8px;
}

.hoverRotate--ew29g img::after {
  content: '(url: ' attr(src) ')';
  display: block;
  font-size: 12px;
}

.hoverRotate--ew29g:hover img {
  transform: scale(1.3) rotate(5deg);
}

.hoverRotate--ew29g figcaption {
  position: absolute;
  inset: 0;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.1em;
  opacity: 0;
  z-index: 2;
  transition-delay: 0.1s;
  font-size: 24px;
  font-family: sans-serif;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.hoverRotate--ew29g:hover::before,
.hoverRotate--ew29g:hover::after {
  transform: scale(1);
  opacity: 1;
}

.hoverRotate--ew29g:hover > img {
  opacity: 0.7;
}

.hoverRotate--ew29g:hover figcaption {
  opacity: 1;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/LazyLoadImage/index.module.less"],names:[],mappings:"AAAA;EACE,gBAAgB;EAChB,sBAAsB;EACtB,WAAW;EACX,qBAAqB;EACrB,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,sBAAsB;EACtB,0BAA0B;AAC5B;;AAEA;;EAEE,kCAAkC;EAClC,uCAAuC;EACvC,0CAA0C;EAC1C,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,yBAAyB;EACzB,UAAU;EACV,UAAU;EACV,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;EACnB,2BAA2B;EAC3B,oBAAoB;EACpB,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,4CAA4C;EAC5C,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,+BAA+B;EAC/B,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,kBAAkB;EAClB,UAAU;EACV,UAAU;EACV,sBAAsB;EACtB,eAAe;EACf,uBAAuB;EACvB,gBAAgB;EAChB,mBAAmB;EACnB,yBAAyB;AAC3B;;AAEA;;EAEE,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,UAAU;AACZ",sourcesContent:[`.hoverRotate {
  overflow: hidden;
  background-color: #000;
  color: #fff;
  display: inline-block;
  max-width: 300px;
  min-width: 160px;
  position: relative;
  width: 100%;
}

.hoverRotate * {
  box-sizing: border-box;
  transition: all 0.45s ease;
}

.hoverRotate::before,
.hoverRotate::after {
  background-color: rgb(0 0 0 / 50%);
  border-top: 32px solid rgb(0 0 0 / 50%);
  border-bottom: 32px solid rgb(0 0 0 / 50%);
  position: absolute;
  inset: 0;
  content: '';
  transition: all 0.3s ease;
  z-index: 1;
  opacity: 0;
  transform: scaleY(2);
}

.hoverRotate img {
  vertical-align: top;
  backface-visibility: hidden;
  transition: all 0.3s;
  box-sizing: border-box;
  max-width: 100%;
}

.hoverRotate img::before {
  content: 'Sorry, this image is unavailable.';
  display: block;
  margin-bottom: 8px;
}

.hoverRotate img::after {
  content: '(url: ' attr(src) ')';
  display: block;
  font-size: 12px;
}

.hoverRotate:hover img {
  transform: scale(1.3) rotate(5deg);
}

.hoverRotate figcaption {
  position: absolute;
  inset: 0;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.1em;
  opacity: 0;
  z-index: 2;
  transition-delay: 0.1s;
  font-size: 24px;
  font-family: sans-serif;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.hoverRotate:hover::before,
.hoverRotate:hover::after {
  transform: scale(1);
  opacity: 1;
}

.hoverRotate:hover > img {
  opacity: 0.7;
}

.hoverRotate:hover figcaption {
  opacity: 1;
}
`],sourceRoot:""}]),a.locals={hoverRotate:"hoverRotate--ew29g"},n.A=a},22211:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=r()(d());a.push([v.id,`.lineBordered--bh05r {
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

p:first-child::first-letter {
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

p:first-child::first-letter {
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
`],sourceRoot:""}]),a.locals={lineBordered:"lineBordered--bh05r","hover-underline-animation":"hover-underline-animation--TSfGP",hoverUnderlineAnimation:"hover-underline-animation--TSfGP",left:"left--ErwKf",center:"center--BFLFI",right:"right--DRVwU","dynamic-shadow":"dynamic-shadow--Us2nj",dynamicShadow:"dynamic-shadow--Us2nj","image-contain":"image-contain--Z_yfM",imageContain:"image-contain--Z_yfM","image-cover":"image-cover--ZVSiS",imageCover:"image-cover--ZVSiS",container:"container--lADY1",top:"top--XQMfF",bottom:"bottom--P1bZI","no-scrollbars":"no-scrollbars--AUOMQ",noScrollbars:"no-scrollbars--AUOMQ","engraved-text":"engraved-text--dMPwS",engravedText:"engraved-text--dMPwS","embossed-text":"embossed-text--eQZ0_",embossedText:"embossed-text--eQZ0_"},n.A=a},38791:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=r()(d());a.push([v.id,`.background--V0AeH {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ff99df;
  background-image: radial-gradient(circle at 52% 73%, hsl(310deg 85% 67% / 100%) 0, transparent 50%),
    radial-gradient(circle at 0% 30%, hsl(197deg 90% 76% / 100%) 0, transparent 50%),
    radial-gradient(circle at 41% 26%, hsl(234deg 79% 69% / 100%) 0, transparent 50%),
    radial-gradient(circle at 41% 51%, hsl(41deg 70% 63% / 100%) 0, transparent 50%),
    radial-gradient(circle at 41% 88%, hsl(36deg 83% 61% / 100%) 0, transparent 50%),
    radial-gradient(circle at 76% 73%, hsl(346deg 69% 70% / 100%) 0, transparent 50%),
    radial-gradient(circle at 29% 37%, hsl(272deg 96% 64% / 100%) 0, transparent 50%);
  background-size: 150% 150%;
  filter: blur(10px);
  animation: move-background--h74DC 10s linear infinite;
}

@keyframes move-background--h74DC {
  0% {
    background-size: 100% 100%;
  }

  10% {
    background-size: 120% 80%;
  }

  20% {
    background-size: 190% 140%;
  }

  30% {
    background-size: 130% 110%;
  }

  40% {
    background-size: 150% 120%;
  }

  50% {
    background-size: 180% 100%;
  }

  60% {
    background-size: 220% 80%;
  }

  70% {
    background-size: 100% 50%;
  }

  80% {
    background-size: 120% 70%;
  }

  90% {
    background-size: 110% 90%;
  }

  100% {
    background-size: 100% 100%;
  }
}
`,"",{version:3,sources:["webpack://./src/components/stateless/MeshGradientBackground/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB;;;;;;qFAMmF;EACnF,0BAA0B;EAC1B,kBAAkB;EAClB,qDAA8C;AAChD;;AAEA;EACE;IACE,0BAA0B;EAC5B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,0BAA0B;EAC5B;AACF",sourcesContent:[`.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ff99df;
  background-image: radial-gradient(circle at 52% 73%, hsl(310deg 85% 67% / 100%) 0, transparent 50%),
    radial-gradient(circle at 0% 30%, hsl(197deg 90% 76% / 100%) 0, transparent 50%),
    radial-gradient(circle at 41% 26%, hsl(234deg 79% 69% / 100%) 0, transparent 50%),
    radial-gradient(circle at 41% 51%, hsl(41deg 70% 63% / 100%) 0, transparent 50%),
    radial-gradient(circle at 41% 88%, hsl(36deg 83% 61% / 100%) 0, transparent 50%),
    radial-gradient(circle at 76% 73%, hsl(346deg 69% 70% / 100%) 0, transparent 50%),
    radial-gradient(circle at 29% 37%, hsl(272deg 96% 64% / 100%) 0, transparent 50%);
  background-size: 150% 150%;
  filter: blur(10px);
  animation: move-background 10s linear infinite;
}

@keyframes move-background {
  0% {
    background-size: 100% 100%;
  }

  10% {
    background-size: 120% 80%;
  }

  20% {
    background-size: 190% 140%;
  }

  30% {
    background-size: 130% 110%;
  }

  40% {
    background-size: 150% 120%;
  }

  50% {
    background-size: 180% 100%;
  }

  60% {
    background-size: 220% 80%;
  }

  70% {
    background-size: 100% 50%;
  }

  80% {
    background-size: 120% 70%;
  }

  90% {
    background-size: 110% 90%;
  }

  100% {
    background-size: 100% 100%;
  }
}
`],sourceRoot:""}]),a.locals={background:"background--V0AeH","move-background":"move-background--h74DC",moveBackground:"move-background--h74DC"},n.A=a},6988:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=r()(d());a.push([v.id,`.markdownBody--xUrgB {\r
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
`],sourceRoot:""}]),a.locals={markdownBody:"markdownBody--xUrgB",loadingIcon:"loadingIcon--VpAmv",copySection:"copySection--aJHtb",lang:"lang--SO0lS",copySpan:"copySpan--u4qzC",preCode:"preCode--s6faO"},n.A=a},41742:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=r()(d());a.push([v.id,`/* Perspective card */
.perspective-card--fRasE {
  transform: perspective(1500px) rotateY(15deg);
  transition: transform 1s ease 0s;
}

.perspective-card--fRasE:hover {
  transform: perspective(3000px) rotateY(5deg);
}

/* Base card styles */
.shiftingCard--ejZ4B {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 360px;
  width: 240px;
  padding: 8px;
  border-radius: 1rem;
  box-shadow: rgb(0 0 0 / 25%) 0 25px 50px -12px;
  background-size: cover;
  transform: rotateX(calc(10deg * 0)) rotateY(calc(10deg * 0));
  transform: rotateX(calc(10deg * var(--dx, 0))) rotateY(calc(10deg * var(--dy, 0)));
  transition: transform 0.2s ease-out;
  background-image: url('https://picsum.photos/id/1018/480/720');

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 10%);
    opacity: 0;
    transition: opacity 0.1s ease;
  }

  h3 {
    width: 100px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    text-align: center;
    margin-top: 95%;
    margin-left: 25%;
    color: #000;
    background: #fff;
  }
}

.cardAnimation--uMV0q {
  &:hover::before {
    opacity: 1;
  }

  &:not(:hover)::before {
    opacity: 0;
  }

  &:hover {
    transform: translate(calc(var(--dx) * 10px), calc(var(--dy) * 10px));
  }
}
`,"",{version:3,sources:["webpack://./src/components/stateless/ShiftingCard/index.module.less"],names:[],mappings:"AAAA,qBAAqB;AACrB;EACE,6CAA6C;EAC7C,gCAAgC;AAClC;;AAEA;EACE,4CAA4C;AAC9C;;AAEA,qBAAqB;AACrB;EACE,kBAAkB;EAClB,qBAAqB;EACrB,sBAAsB;EACtB,aAAa;EACb,YAAY;EACZ,YAAY;EACZ,mBAAmB;EACnB,8CAA8C;EAC9C,sBAAsB;EACtB,4DAAkF;EAAlF,kFAAkF;EAClF,mCAAmC;EACnC,8DAA8D;;EAE9D;IACE,WAAW;IACX,kBAAkB;IAClB,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;IACZ,4BAA4B;IAC5B,UAAU;IACV,6BAA6B;EAC/B;;EAEA;IACE,YAAY;IACZ,YAAY;IACZ,iBAAiB;IACjB,mBAAmB;IACnB,kBAAkB;IAClB,eAAe;IACf,gBAAgB;IAChB,WAAW;IACX,gBAAgB;EAClB;AACF;;AAEA;EACE;IACE,UAAU;EACZ;;EAEA;IACE,UAAU;EACZ;;EAEA;IACE,oEAAoE;EACtE;AACF",sourcesContent:[`/* Perspective card */
.perspective-card {
  transform: perspective(1500px) rotateY(15deg);
  transition: transform 1s ease 0s;
}

.perspective-card:hover {
  transform: perspective(3000px) rotateY(5deg);
}

/* Base card styles */
.shiftingCard {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 360px;
  width: 240px;
  padding: 8px;
  border-radius: 1rem;
  box-shadow: rgb(0 0 0 / 25%) 0 25px 50px -12px;
  background-size: cover;
  transform: rotateX(calc(10deg * var(--dx, 0))) rotateY(calc(10deg * var(--dy, 0)));
  transition: transform 0.2s ease-out;
  background-image: url('https://picsum.photos/id/1018/480/720');

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 10%);
    opacity: 0;
    transition: opacity 0.1s ease;
  }

  h3 {
    width: 100px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    text-align: center;
    margin-top: 95%;
    margin-left: 25%;
    color: #000;
    background: #fff;
  }
}

.cardAnimation {
  &:hover::before {
    opacity: 1;
  }

  &:not(:hover)::before {
    opacity: 0;
  }

  &:hover {
    transform: translate(calc(var(--dx) * 10px), calc(var(--dy) * 10px));
  }
}
`],sourceRoot:""}]),a.locals={"perspective-card":"perspective-card--fRasE",perspectiveCard:"perspective-card--fRasE",shiftingCard:"shiftingCard--ejZ4B",cardAnimation:"cardAnimation--uMV0q"},n.A=a},20335:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=r()(d());a.push([v.id,`.star--H6zRP {
  color: #f93;
  cursor: pointer;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/StarRating/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,eAAe;AACjB",sourcesContent:[`.star {
  color: #f93;
  cursor: pointer;
}
`],sourceRoot:""}]),a.locals={star:"star--H6zRP"},n.A=a},37318:function(v,n,e){"use strict";var o=e(71354),d=e.n(o),A=e(76314),r=e.n(A),a=r()(d());a.push([v.id,`.avatar--tAk6h {
  animation: levitate--RZCwS 10s ease 1s infinite reverse;
}

@keyframes levitate--RZCwS {
  0% {
    transform: translateY(0);
  }

  30% {
    transform: translateY(-10px);
  }

  50% {
    transform: translateY(4px);
  }

  70% {
    transform: translateY(-15px);
  }

  100% {
    transform: translateY(0);
  }
}

.maskBox--uAYjJ {
  width: 100px;
  height: 40px;
  background: darkcyan;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 18px;
  position: relative;
  -webkit-mask: radial-gradient(8px at 10px 10px, transparent 98%, black) -10px -10px;
          mask: radial-gradient(8px at 10px 10px, transparent 98%, black) -10px -10px;
}

.watermark--YUolT {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: rgb(0 0 0 / 20%);
  white-space: nowrap;
  pointer-events: none;
}

.blend-me--f5L11 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  mix-blend-mode: overlay;
  transition: 0.3s cubic-bezier(0.25, 0.25, 0.33, 1.33);
  animation: move-me--FUPwc 8s ease-out infinite alternate;
}

@keyframes move-me--FUPwc {
  to {
    transform: translateY(50px);
  }
}

.button--GgsIa {
  background: transparent;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(90deg, white, white),
    linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));
  background-clip: padding-box, border-box;
  background-origin: border-box;
  border: 5px solid transparent;
  border-radius: 1.75rem;
}

.button-label--d_jxl {
  background-image: linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));
  -webkit-background-clip: text;
          background-clip: text;
  color: transparent;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
}

.circle-1--kJj6k {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: calc(-10px);
  left: calc(-10px);
  animation: expand--kmoUS 6s ease-out infinite both;
  animation-play-state: running;
  animation-delay: 1s;
  border: 1.5px solid rgb(121 40 202 / 40%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 40%) 40%, #000 100%);
}

.circle-2--YMeVl {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: calc(-20px);
  left: calc(-20px);
  animation: expand-opacity--XzitQ 6s linear infinite both;
  animation-play-state: running;
  animation-delay: 0.5s;
  border: 1px solid rgb(121 40 202 / 40%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 30%) 20%, #000 100%);
}

.circle-3--DvCUJ {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  top: calc(-30px);
  left: calc(-30px);
  animation: expand-opacity--XzitQ 6s linear infinite both;
  animation-play-state: running;
  animation-delay: 1s;
  border: 1px solid rgb(121 40 202 / 30%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 20%) 20%, #000 100%);
}

.circle-4--UkUyn {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  top: calc(-40px);
  left: calc(-40px);
  animation: expand-opacity--XzitQ 6s linear infinite both;
  animation-play-state: running;
  animation-delay: 1.5s;
  border: 1px solid rgb(121 40 202 / 20%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 10%) 20%, #000 100%);
}

@keyframes expand--kmoUS {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes expand-opacity--XzitQ {
  0% {
    opacity: 0;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.3);
  }

  100% {
    opacity: 0;
    transform: scale(1.295);
  }
}
`,"",{version:3,sources:["webpack://./src/pages/home/index.module.less"],names:[],mappings:"AAAA;EACE,uDAAgD;AAClD;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,wBAAwB;EAC1B;AACF;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,oBAAoB;EACpB,kBAAkB;EAClB,iBAAiB;EACjB,WAAW;EACX,eAAe;EACf,kBAAkB;EAClB,mFAA2E;UAA3E,2EAA2E;AAC7E;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,WAAW;EACX,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,qDAAqD;EACrD,wDAAiD;AACnD;;AAEA;EACE;IACE,2BAA2B;EAC7B;AACF;;AAEA;EACE,uBAAuB;EACvB,oBAAoB;EACpB;oEACkE;EAClE,wCAAwC;EACxC,6BAA6B;EAC7B,6BAA6B;EAC7B,sBAAsB;AACxB;;AAEA;EACE,kFAAkF;EAClF,6BAAqB;UAArB,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,kDAA2C;EAC3C,6BAA6B;EAC7B,mBAAmB;EACnB,yCAAyC;EACzC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,qBAAqB;EACrB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,mBAAmB;EACnB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,qBAAqB;EACrB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,qBAAqB;EACvB;;EAEA;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE;IACE,UAAU;IACV,mBAAmB;EACrB;;EAEA;IACE,UAAU;IACV,qBAAqB;EACvB;;EAEA;IACE,UAAU;IACV,uBAAuB;EACzB;AACF",sourcesContent:[`.avatar {
  animation: levitate 10s ease 1s infinite reverse;
}

@keyframes levitate {
  0% {
    transform: translateY(0);
  }

  30% {
    transform: translateY(-10px);
  }

  50% {
    transform: translateY(4px);
  }

  70% {
    transform: translateY(-15px);
  }

  100% {
    transform: translateY(0);
  }
}

.maskBox {
  width: 100px;
  height: 40px;
  background: darkcyan;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 18px;
  position: relative;
  mask: radial-gradient(8px at 10px 10px, transparent 98%, black) -10px -10px;
}

.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: rgb(0 0 0 / 20%);
  white-space: nowrap;
  pointer-events: none;
}

.blend-me {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  mix-blend-mode: overlay;
  transition: 0.3s cubic-bezier(0.25, 0.25, 0.33, 1.33);
  animation: move-me 8s ease-out infinite alternate;
}

@keyframes move-me {
  to {
    transform: translateY(50px);
  }
}

.button {
  background: transparent;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(90deg, white, white),
    linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));
  background-clip: padding-box, border-box;
  background-origin: border-box;
  border: 5px solid transparent;
  border-radius: 1.75rem;
}

.button-label {
  background-image: linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));
  background-clip: text;
  color: transparent;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
}

.circle-1 {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: calc(-10px);
  left: calc(-10px);
  animation: expand 6s ease-out infinite both;
  animation-play-state: running;
  animation-delay: 1s;
  border: 1.5px solid rgb(121 40 202 / 40%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 40%) 40%, #000 100%);
}

.circle-2 {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: calc(-20px);
  left: calc(-20px);
  animation: expand-opacity 6s linear infinite both;
  animation-play-state: running;
  animation-delay: 0.5s;
  border: 1px solid rgb(121 40 202 / 40%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 30%) 20%, #000 100%);
}

.circle-3 {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  top: calc(-30px);
  left: calc(-30px);
  animation: expand-opacity 6s linear infinite both;
  animation-play-state: running;
  animation-delay: 1s;
  border: 1px solid rgb(121 40 202 / 30%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 20%) 20%, #000 100%);
}

.circle-4 {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  top: calc(-40px);
  left: calc(-40px);
  animation: expand-opacity 6s linear infinite both;
  animation-play-state: running;
  animation-delay: 1.5s;
  border: 1px solid rgb(121 40 202 / 20%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 10%) 20%, #000 100%);
}

@keyframes expand {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes expand-opacity {
  0% {
    opacity: 0;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.3);
  }

  100% {
    opacity: 0;
    transform: scale(1.295);
  }
}
`],sourceRoot:""}]),a.locals={avatar:"avatar--tAk6h",levitate:"levitate--RZCwS",maskBox:"maskBox--uAYjJ",watermark:"watermark--YUolT","blend-me":"blend-me--f5L11",blendMe:"blend-me--f5L11","move-me":"move-me--FUPwc",moveMe:"move-me--FUPwc",button:"button--GgsIa","button-label":"button-label--d_jxl",buttonLabel:"button-label--d_jxl","circle-1":"circle-1--kJj6k",circle1:"circle-1--kJj6k",expand:"expand--kmoUS","circle-2":"circle-2--YMeVl",circle2:"circle-2--YMeVl","expand-opacity":"expand-opacity--XzitQ",expandOpacity:"expand-opacity--XzitQ","circle-3":"circle-3--DvCUJ",circle3:"circle-3--DvCUJ","circle-4":"circle-4--UkUyn",circle4:"circle-4--UkUyn"},n.A=a},81286:function(v,n,e){"use strict";var o=e(24994),d=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=g(e(96540)),r=o(e(25039));function a(i){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(a=function(l){return l?_:c})(i)}function g(i,c){if(!c&&i&&i.__esModule)return i;if(i===null||d(i)!="object"&&typeof i!="function")return{default:i};var _=a(c);if(_&&_.has(i))return _.get(i);var u={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var t in i)if(t!=="default"&&{}.hasOwnProperty.call(i,t)){var E=l?Object.getOwnPropertyDescriptor(i,t):null;E&&(E.get||E.set)?Object.defineProperty(u,t,E):u[t]=i[t]}return u.default=i,_&&_.set(i,u),u}var m=function(c){var _=c.alternateText,u=_===void 0?[]:_;return(0,A.useEffect)(function(){var l=document.getElementById("alternating-text"),t=0,E=function(B){t=t<u.length-1?t+1:0,l.innerHTML=u[t]};return l.innerHTML=u[0],l.addEventListener("animationiteration",E,!1),function(){l.removeEventListener("animationiteration",E,!1)}},[]),A.default.createElement("span",{className:r.default.alternating,id:"alternating-text"},u[0]||"Text goes here")},C=n.default=m},44322:function(v,n,e){"use strict";var o=e(24994),d=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=o(e(43693)),r=o(e(85715)),a=m(e(96540));function g(B){if(typeof WeakMap!="function")return null;var h=new WeakMap,p=new WeakMap;return(g=function(M){return M?p:h})(B)}function m(B,h){if(!h&&B&&B.__esModule)return B;if(B===null||d(B)!="object"&&typeof B!="function")return{default:B};var p=g(h);if(p&&p.has(B))return p.get(B);var D={__proto__:null},M=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var W in B)if(W!=="default"&&{}.hasOwnProperty.call(B,W)){var L=M?Object.getOwnPropertyDescriptor(B,W):null;L&&(L.get||L.set)?Object.defineProperty(D,W,L):D[W]=B[W]}return D.default=B,p&&p.set(B,D),D}function C(B,h){var p=Object.keys(B);if(Object.getOwnPropertySymbols){var D=Object.getOwnPropertySymbols(B);h&&(D=D.filter(function(M){return Object.getOwnPropertyDescriptor(B,M).enumerable})),p.push.apply(p,D)}return p}function i(B){for(var h=1;h<arguments.length;h++){var p=arguments[h]!=null?arguments[h]:{};h%2?C(Object(p),!0).forEach(function(D){(0,A.default)(B,D,p[D])}):Object.getOwnPropertyDescriptors?Object.defineProperties(B,Object.getOwnPropertyDescriptors(p)):C(Object(p)).forEach(function(D){Object.defineProperty(B,D,Object.getOwnPropertyDescriptor(p,D))})}return B}var c=function(h){var p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"0px",D=(0,a.useState)(!0),M=(0,r.default)(D,2),W=M[0],L=M[1];return(0,a.useEffect)(function(){var K=new IntersectionObserver(function(Q){var I=(0,r.default)(Q,1),U=I[0];L(U.isIntersecting)},{rootMargin:p});return h.current&&K.observe(h.current),function(){h.current&&K.unobserve(h.current)}},[]),W},_=function(h){var p=h.from,D=h.to,M=h.children,W=(0,a.useRef)(null),L=c(W),K={transition:"1000ms ease-in-out"};return a.default.createElement("div",{ref:W,style:L?i(i({},K),D):i(i({},K),p)},M)},u=function(h){var p=h.children;return a.default.createElement(_,{from:{opacity:0},to:{opacity:1}},p)},l=function(h){var p=h.children;return a.default.createElement(_,{from:{opacity:0,translate:"0 2rem"},to:{opacity:1,translate:"none"}},p)},t=function(h){var p=h.children;return a.default.createElement(_,{from:{scale:"0"},to:{scale:"1"}},p)},E={FadeIn:u,FadeUp:l,ScaleIn:t},O=n.default=E},53795:function(v,n,e){"use strict";var o=e(24994),d=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=o(e(94634)),r=o(e(91847)),a=o(e(85715)),g=c(e(96540)),m=o(e(48122)),C=["children","onClick"];function i(t){if(typeof WeakMap!="function")return null;var E=new WeakMap,O=new WeakMap;return(i=function(h){return h?O:E})(t)}function c(t,E){if(!E&&t&&t.__esModule)return t;if(t===null||d(t)!="object"&&typeof t!="function")return{default:t};var O=i(E);if(O&&O.has(t))return O.get(t);var B={__proto__:null},h=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var p in t)if(p!=="default"&&{}.hasOwnProperty.call(t,p)){var D=h?Object.getOwnPropertyDescriptor(t,p):null;D&&(D.get||D.set)?Object.defineProperty(B,p,D):B[p]=t[p]}return B.default=t,O&&O.set(t,B),B}var _=function(){var E=g.default.useState({x:-1,y:-1}),O=(0,a.default)(E,2),B=O[0],h=B.x,p=B.y,D=O[1],M=h!==-1&&p!==-1,W=function(K){var Q=K.currentTarget.getBoundingClientRect(),I=Q.left,U=Q.top;D({x:K.clientX-I,y:K.clientY-U}),setTimeout(function(){D({x:-1,y:-1})},300)};return{x:h,y:p,handleRippleOnClick:W,isRippling:M}},u=function(E){var O=E.children,B=E.onClick,h=(0,r.default)(E,C),p=_(),D=p.x,M=p.y,W=p.handleRippleOnClick,L=p.isRippling,K=function(I){W(I),B&&B(I)};return g.default.createElement("button",(0,A.default)({type:"button",onClick:K,className:m.default.btn},h),g.default.createElement("span",{className:m.default.content},O),L&&g.default.createElement("div",{className:m.default["btn-ripple-container"]},g.default.createElement("span",{className:m.default["btn-ripple"],style:{left:D,top:M}})))},l=n.default=u},85666:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=o(e(96540)),A=o(e(57903)),r=function(m){var C=m.children;return d.default.createElement(d.default.Fragment,null,d.default.createElement("section",{className:A.default.hIBkFg},d.default.createElement("h2",null,"Design and code"," ",d.default.createElement("span",{className:A.default.kqOLaE},d.default.createElement("span",null,"R"),d.default.createElement("span",null,"e"),d.default.createElement("span",null,"a"),d.default.createElement("span",null,"c"),d.default.createElement("span",null,"t"))," ","apps")))},a=n.default=r},59409:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=o(e(96540)),A=o(e(21958)),r=function(m){var C=m.text,i=/((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;return d.default.createElement(d.default.Fragment,null,C.split(i).map(function(c,_){var u=c.match(i);if(u){var l=u[0];return d.default.createElement("a",{key:_,className:A.default.squiggle,target:"_blank",href:l.startsWith("http")?l:"http://".concat(l)},l)}return c}))},a=n.default=r},76017:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=o(e(96540)),A=o(e(39726)),r=function(m){var C=m.avatar,i=m.text;return d.default.createElement("div",{className:A.default.avatarCard},d.default.createElement("div",{className:A.default.card},d.default.createElement("figure",null,d.default.createElement("img",{alt:"",src:C,className:A.default.avatar})),d.default.createElement("p",{className:A.default.content},i)))},a=n.default=r},12770:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=o(e(96540)),A=o(e(49511)),r=function(){return d.default.createElement(d.default.Fragment,null,d.default.createElement("section",{className:A.default.breatheItem},d.default.createElement("span",null,"Breathe")))},a=n.default=r},42916:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=o(e(43693)),A=o(e(96540));function r(C,i){var c=Object.keys(C);if(Object.getOwnPropertySymbols){var _=Object.getOwnPropertySymbols(C);i&&(_=_.filter(function(u){return Object.getOwnPropertyDescriptor(C,u).enumerable})),c.push.apply(c,_)}return c}function a(C){for(var i=1;i<arguments.length;i++){var c=arguments[i]!=null?arguments[i]:{};i%2?r(Object(c),!0).forEach(function(_){(0,d.default)(C,_,c[_])}):Object.getOwnPropertyDescriptors?Object.defineProperties(C,Object.getOwnPropertyDescriptors(c)):r(Object(c)).forEach(function(_){Object.defineProperty(C,_,Object.getOwnPropertyDescriptor(c,_))})}return C}var g=function(i){var c=i.style,_=i.children;return A.default.createElement("div",{style:a({width:"100%",minHeight:"calc(100vh - 232px)"},c)},_)},m=n.default=g},18903:function(v,n,e){"use strict";var o=e(24994),d=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=g(e(96540)),r=o(e(84576));function a(i){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(a=function(l){return l?_:c})(i)}function g(i,c){if(!c&&i&&i.__esModule)return i;if(i===null||d(i)!="object"&&typeof i!="function")return{default:i};var _=a(c);if(_&&_.has(i))return _.get(i);var u={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var t in i)if(t!=="default"&&{}.hasOwnProperty.call(i,t)){var E=l?Object.getOwnPropertyDescriptor(i,t):null;E&&(E.get||E.set)?Object.defineProperty(u,t,E):u[t]=i[t]}return u.default=i,_&&_.set(i,u),u}var m=function(){var c=(0,A.useRef)(null);return(0,A.useLayoutEffect)(function(){var _=c.current,u=function(t){var E=t.target.getBoundingClientRect(),O=t.clientX-E.left,B=t.clientY-E.top;_.style.setProperty("--x",O+"px"),_.style.setProperty("--y",B+"px")};return _.addEventListener("mousemove",u),function(){_.removeEventListener("mousemove",u)}},[]),A.default.createElement("button",{className:r.default.gradientTracking,ref:c},A.default.createElement("span",null,"Hover me"))},C=n.default=m},52537:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=o(e(96540)),A=o(e(85120)),r=function(m){var C=m.text;return d.default.createElement("div",{className:A.default.isometricCard},d.default.createElement("p",null,C))},a=n.default=r},35317:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=o(e(94634)),A=o(e(85715)),r=o(e(91847)),a=o(e(96540)),g=o(e(61352)),m=["alt","src","className","loadInitially","observerOptions"],C=function(_){var u=_.alt,l=_.src,t=_.className,E=_.loadInitially,O=E===void 0?!1:E,B=_.observerOptions,h=B===void 0?{root:null,rootMargin:"200px 0px"}:B,p=(0,r.default)(_,m),D=a.default.useRef(null),M=a.default.useRef(null),W=a.default.useState(O),L=(0,A.default)(W,2),K=L[0],Q=L[1],I=a.default.useCallback(function(U){U[0].isIntersecting&&(D.current.disconnect(),Q(!0))},[D]);return a.default.useEffect(function(){if(!O){if("loading"in HTMLImageElement.prototype){Q(!0);return}return D.current=new IntersectionObserver(I,h),D.current.observe(M.current),function(){D.current.disconnect()}}},[]),a.default.createElement("figure",{className:g.default.hoverRotate},a.default.createElement("img",(0,d.default)({alt:u,src:K?l:"",ref:M,className:t,loading:O?void 0:"lazy"},p)),a.default.createElement("figcaption",null,a.default.createElement("h3",null,"Lorem ",a.default.createElement("br",null),"Ipsum")))},i=n.default=C},22807:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=o(e(96540)),A=o(e(89696)),r=function(m){var C=m.text;return d.default.createElement("span",{className:A.default.lineBordered},C)},a=n.default=r},75747:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=o(e(96540)),A=o(e(89200)),r=function(m){return d.default.createElement("div",{style:{position:"relative",height:"100%"}},d.default.createElement("div",{className:A.default.background},"Mesh Gradient Background"))},a=n.default=r},81740:function(v,n,e){"use strict";var o=e(24994),d=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=o(e(54756)),r=o(e(94634)),a=o(e(85715)),g=o(e(29293)),m=M(e(96540)),C=e(8768),i=o(e(43160)),c=o(e(41512)),_=o(e(54152)),u=o(e(63940)),l=o(e(37948)),t=o(e(73410)),E=o(e(51687)),O=o(e(22802)),B=e(81591),h=o(e(65548));e(35819);var p=o(e(49887));function D(I){if(typeof WeakMap!="function")return null;var U=new WeakMap,j=new WeakMap;return(D=function(w){return w?j:U})(I)}function M(I,U){if(!U&&I&&I.__esModule)return I;if(I===null||d(I)!="object"&&typeof I!="function")return{default:I};var j=D(U);if(j&&j.has(I))return j.get(I);var S={__proto__:null},w=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var Z in I)if(Z!=="default"&&{}.hasOwnProperty.call(I,Z)){var z=w?Object.getOwnPropertyDescriptor(I,Z):null;z&&(z.get||z.set)?Object.defineProperty(S,Z,z):S[Z]=I[Z]}return S.default=I,j&&j.set(I,S),S}var W=function(){var I=(0,g.default)(A.default.mark(function U(j){var S,w;return A.default.wrap(function(z){for(;;)switch(z.prev=z.next){case 0:if(z.prev=0,!((S=navigator)!==null&&S!==void 0&&(S=S.clipboard)!==null&&S!==void 0&&S.writeText)){z.next=5;break}return z.next=4,navigator.clipboard.writeText(j);case 4:C.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F");case 5:z.next=16;break;case 7:z.prev=7,z.t0=z.catch(0),w=document.createElement("textarea"),w.value=j,document.body.appendChild(w),w.focus(),w.select();try{document.execCommand("copy"),C.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F")}catch(R){C.message.success("\u590D\u5236\u5230\u526A\u8D34\u677F\u5931\u8D25")}document.body.removeChild(w);case 16:case"end":return z.stop()}},U,null,[[0,7]])}));return function(j){return I.apply(this,arguments)}}(),L=function(U){var j,S=(0,m.useRef)(null),w=(j=S.current)===null||j===void 0?void 0:j.innerText,Z=(0,m.useRef)(""),z=(0,B.useDebouncedCallback)(function(){if(S.current){var R=S.current.querySelector("code"),N=R.className,X=/language-(\w+)/.exec(N||"");if(X){var G=(0,a.default)(X,2),V=G[1];Z.current=V}}},800);return(0,m.useEffect)(function(){setTimeout(z,1)},[w]),m.default.createElement("section",null,m.default.createElement("section",{className:p.default.copySection},m.default.createElement("span",{className:p.default.lang},Z.current),m.default.createElement("span",{className:p.default.copySpan,onClick:function(){if(S.current){var N=S.current.innerText;W(N)}}},"\u590D\u5236\u4EE3\u7801")),m.default.createElement("pre",{className:p.default.preCode,ref:S},U.children))},K=function(U){var j=U.markdownText,S=j===void 0?"":j,w=U.isLoading,Z=w===void 0?!1:w;return m.default.createElement("section",{className:p.default.markdownBody},Z&&!S&&m.default.createElement(i.default,{component:h.default,style:{color:"#fff"},className:p.default.loadingIcon}),S&&m.default.createElement(c.default,{remarkPlugins:[_.default,t.default,u.default],rehypePlugins:[l.default,O.default,[E.default,{detect:!1,ignoreMissing:!0}]],components:{pre:L,p:function(R){return m.default.createElement("p",(0,r.default)({},R,{dir:"auto"}))},a:function(R){var N,X=R.href||"",G=/^\/#/i.test(X),V=G?"_self":(N=R.target)!==null&&N!==void 0?N:"_blank";return m.default.createElement("a",(0,r.default)({},R,{target:V}))}}},S))},Q=n.default=K},63023:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=o(e(96540)),A=e(23947),r=function(m){var C=m.children;return d.default.createElement(A.motion.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{ease:"linear",duration:1,y:{duration:.5}}},C)},a=n.default=r},3102:function(v,n,e){"use strict";var o=e(24994),d=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=g(e(96540)),r=o(e(91193));function a(i){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(a=function(l){return l?_:c})(i)}function g(i,c){if(!c&&i&&i.__esModule)return i;if(i===null||d(i)!="object"&&typeof i!="function")return{default:i};var _=a(c);if(_&&_.has(i))return _.get(i);var u={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var t in i)if(t!=="default"&&{}.hasOwnProperty.call(i,t)){var E=l?Object.getOwnPropertyDescriptor(i,t):null;E&&(E.get||E.set)?Object.defineProperty(u,t,E):u[t]=i[t]}return u.default=i,_&&_.set(i,u),u}var m=function(){var c=(0,A.useRef)(null);return(0,A.useLayoutEffect)(function(){var _=c.current,u=_.getBoundingClientRect(),l=u.x,t=u.y,E=u.width,O=E===void 0?240:E,B=u.height,h=B===void 0?360:B,p=l+(O||240)/2,D=t+(h||360)/2,M=function(K){var Q=K.pageX,I=K.pageY,U=(p-Q)/((O||240)/2),j=(D-I)/((h||360)/2);_.style.setProperty("--dx",U),_.style.setProperty("--dy",j)},W=function(){_.style.setProperty("--dx",0),_.style.setProperty("--dy",0)};return _.addEventListener("mousemove",M),_.addEventListener("mouseleave",W),function(){_.removeEventListener("mousemove",M),_.removeEventListener("mouseleave",W)}},[]),A.default.createElement("div",{ref:c,className:r.default.shiftingCard},A.default.createElement("h3",null,"Shifting Card"))},C=n.default=m},58843:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=o(e(85715)),A=o(e(96540)),r=o(e(57812)),a=function(i){var c=i.marked,_=i.starId;return A.default.createElement("span",{"data-star-id":_,className:r.default.star,role:"button"},c?"\u2605":"\u2606")},g=function(i){var c=i.value,_=A.default.useState(parseInt(c)||0),u=(0,d.default)(_,2),l=u[0],t=u[1],E=A.default.useState(0),O=(0,d.default)(E,2),B=O[0],h=O[1],p=function(M){var W=0;M&&M.target&&M.target.getAttribute("data-star-id")&&(W=M.target.getAttribute("data-star-id")),h(W)};return A.default.createElement("div",{onMouseOut:function(){return p(null)},onClick:function(M){return t(M.target.getAttribute("data-star-id")||l)},onMouseOver:p},Array.from({length:5},function(D,M){return A.default.createElement(a,{starId:M+1,key:"star_".concat(M+1),marked:B?B>=M+1:l>=M+1})}),A.default.createElement("span",null,l))},m=n.default=g},59593:function(v,n,e){"use strict";var o=e(24994),d=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=o(e(85715)),r=g(e(96540));function a(i){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(a=function(l){return l?_:c})(i)}function g(i,c){if(!c&&i&&i.__esModule)return i;if(i===null||d(i)!="object"&&typeof i!="function")return{default:i};var _=a(c);if(_&&_.has(i))return _.get(i);var u={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var t in i)if(t!=="default"&&{}.hasOwnProperty.call(i,t)){var E=l?Object.getOwnPropertyDescriptor(i,t):null;E&&(E.get||E.set)?Object.defineProperty(u,t,E):u[t]=i[t]}return u.default=i,_&&_.set(i,u),u}var m=function(c){var _=c.children,u=c.delay,l=u===void 0?110:u,t=(0,r.useState)(0),E=(0,A.default)(t,2),O=E[0],B=E[1],h=setInterval(function(){return B(function(p){return p+1})},l);return(0,r.useEffect)(function(){O===_.length&&clearInterval(h)},[_,h,O]),(0,r.useEffect)(function(){return function(){return clearInterval(h)}},[h]),r.default.createElement(r.default.Fragment,null,_.substring(0,O))},C=n.default=(0,r.memo)(m)},76526:function(v,n,e){"use strict";var o=e(24994),d=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=o(e(85715)),r=w(e(96540)),a=e(8768),g=e(43160),m=e(69739),C=e(69893),i=o(e(42916)),c=o(e(59593)),_=o(e(81740)),u=o(e(81286)),l=o(e(59409)),t=o(e(35317)),E=o(e(58843)),O=o(e(52537)),B=o(e(76017)),h=o(e(22807)),p=o(e(18903)),D=o(e(3102)),M=o(e(12770)),W=o(e(63023)),L=o(e(44322)),K=o(e(53795)),Q=o(e(85666)),I=o(e(75747)),U=e(31819),j=o(e(47443));function S(R){if(typeof WeakMap!="function")return null;var N=new WeakMap,X=new WeakMap;return(S=function(V){return V?X:N})(R)}function w(R,N){if(!N&&R&&R.__esModule)return R;if(R===null||d(R)!="object"&&typeof R!="function")return{default:R};var X=S(N);if(X&&X.has(R))return X.get(R);var G={__proto__:null},V=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var H in R)if(H!=="default"&&{}.hasOwnProperty.call(R,H)){var q=V?Object.getOwnPropertyDescriptor(R,H):null;q&&(q.get||q.set)?Object.defineProperty(G,H,q):G[H]=R[H]}return G.default=R,X&&X.set(R,G),G}var Z=function(){var N=(0,r.useState)(""),X=(0,A.default)(N,2),G=X[0],V=X[1],H=(0,r.useRef)(null),q=(0,r.useState)(!1),se=(0,A.default)(q,2),re=se[0],ee=se[1],ve=(0,r.useState)(""),le=(0,A.default)(ve,2),pe=le[0],ye=le[1],de=(0,r.useRef)(null),he=(0,r.useState)(function(){return""}),Ae=(0,A.default)(he,2),_e=Ae[0],be=Ae[1],De=(0,r.useState)(""),ue=(0,A.default)(De,2),ae=ue[0],Oe=ue[1],Pe=(0,r.useRef)(null),Me=function(P){be(P.target.value)},xe=function(P){Oe(P.target.value)},Ie=function(P){P.metaKey&&P.key==="Enter"&&(f(),P.preventDefault())},ce=(0,r.useState)(["","","","","","",""]),me=(0,A.default)(ce,2),y=me[0],s=me[1],f=function(){if(ae.trim()!==""){var P=new AbortController;de.current=P,T(ae,_e,P)}},b=function(){de.current.abort(),ee(!1)},T=function(P,Y,F){H.current="",V(H.current);var $=F.signal;ee(!0),(0,U.oneApiChat)([{content:P,role:"user"}],Y,$).then(function(k){var J=k.headers.get("content-type");if(!k.ok||!(J!=null&&J.startsWith("text/event-stream"))||k.status!==200){if(J!=null&&J.startsWith("text/html")||J!=null&&J.startsWith("text/plain")){var We=k.clone().text();We.then(function(oe){V(oe)})}else if(J!=null&&J.startsWith("application/json")){var Se=k.clone().json();Se.then(function(oe){V((0,U.prettyObject)(oe))})}else V(k.statusText);ee(!1)}else{var Ee,Ue=k==null||(Ee=k.body)===null||Ee===void 0?void 0:Ee.getReader(),fe=`

`,ne="",Te="",je=function(){Ue.read().then(function(Ce){var Le=Ce.done,ke=Ce.value;if(Le){ee(!1);return}for(ne+=new TextDecoder().decode(ke);ne.includes(fe);){var Re=ne.indexOf(fe),Ke=ne.slice(0,Re),ie=Ke.split("data: ");for(var ge in ie)if(ie[ge]!==""&&ie[ge]!=="[DONE]")try{var Be,te,ze=JSON.parse(ie[ge]),Ye=(Be=(te=ze.choices[0])===null||te===void 0||(te=te.delta)===null||te===void 0?void 0:te.content)!==null&&Be!==void 0?Be:"";Te+=Ye,ye(new Date().toLocaleString()),H.current=Te,V(H.current)}catch(Fe){}ne=ne.slice(Re+fe.length)}je()}).catch(function(Ce){})};je()}}).catch(function(k){ee(!1),V(k.message)})};return r.default.createElement(i.default,null,r.default.createElement("h2",{style:{marginBottom:15}},r.default.createElement(c.default,null,"Cool! Hi, React & Ant Design!")),r.default.createElement("h2",{className:j.default.avatar},"React version: ",r.version),r.default.createElement("section",null,"I love coding in ",r.default.createElement(u.default,{alternateText:["javascript","typescript","rect","vue"]}),"."),r.default.createElement("section",{style:{marginBottom:40}},r.default.createElement(l.default,{text:"foo bar baz http://example.org bar https://github.com/wkylin/pro-react-admin"})),r.default.createElement("section",null,r.default.createElement(B.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."})),r.default.createElement("section",null,r.default.createElement(O.default,{text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?"})),r.default.createElement(E.default,{value:2}),r.default.createElement(h.default,{text:"A line bordered text."}),r.default.createElement("section",{style:{display:"flex",alignItems:"center",marginTop:10,marginBottom:40}},r.default.createElement(m.Atom,null)," ",r.default.createElement(m.Merge,null)," ",r.default.createElement(m.GitMerge,null)," ",r.default.createElement(m.GitPullRequestArrow,null)),r.default.createElement("section",{style:{marginBottom:40}},r.default.createElement(W.default,null,r.default.createElement(t.default,{src:"https://picsum.photos/seed/picsum/300/160",alt:"Strawberries"}))),r.default.createElement("section",null,r.default.createElement(p.default,null)),r.default.createElement("section",{style:{margin:40}},r.default.createElement(M.default,null)),r.default.createElement("section",{style:{marginBottom:40}},r.default.createElement(D.default,null)),r.default.createElement("section",{style:{marginBottom:40}},r.default.createElement(C.PinInput,{onChange:function(P,Y,F){return s(F)},values:y})),r.default.createElement("section",{style:{marginBottom:40}},r.default.createElement(L.default.FadeIn,null,r.default.createElement(B.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."}))),r.default.createElement("section",{style:{marginBottom:40}},r.default.createElement(L.default.FadeUp,null,r.default.createElement("img",{src:"https://picsum.photos/360/200.jpg",alt:""}))),r.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},r.default.createElement(L.default.ScaleIn,null,r.default.createElement(r.default.Fragment,null,r.default.createElement("img",{src:"https://picsum.photos/360/200/?blur=2",alt:""}),r.default.createElement("section",{className:j.default["blend-me"]},"Mix Blend Mode")))),r.default.createElement("section",{style:{marginBottom:40,height:200,width:360,overflow:"hidden"}},r.default.createElement(I.default,null)),r.default.createElement("section",{style:{marginBottom:40}},r.default.createElement(K.default,null,"Click Me")),r.default.createElement("section",{style:{marginBottom:40},className:j.default.maskBox},r.default.createElement("section",{className:j.default.watermark},"water mark"),"mask"),r.default.createElement("section",{style:{marginBottom:40}},r.default.createElement("button",{className:j.default.button},r.default.createElement("span",{className:j.default["button-label"]},"Click Me"))),r.default.createElement("section",{style:{position:"relative",margin:"80px 0 160px 50px"}},r.default.createElement("div",{className:j.default["circle-1"]}),r.default.createElement("div",{className:j.default["circle-2"]}),r.default.createElement("div",{className:j.default["circle-3"]}),r.default.createElement("div",{className:j.default["circle-4"]})),r.default.createElement("section",{style:{width:600,margin:"30px 0"}},r.default.createElement(a.Input,{defaultValue:_e,placeholder:"api key",onChange:Me,style:{marginBottom:20}}),r.default.createElement(a.Flex,{align:"center"},r.default.createElement(a.Input.TextArea,{ref:Pe,defaultValue:ae,placeholder:"\u6765\uFF0C\u8BF4\u70B9\u4EC0\u4E48\u5457...Meta + Enter\u53D1\u9001",onChange:xe,onKeyDown:Ie,autoSize:!0,style:{width:300,height:30,caretColor:"#ff0000"}}),r.default.createElement(a.Button,{style:{margin:"0 10px"},icon:r.default.createElement(g.SendOutlined,{rotate:-60}),type:"primary",disabled:re,onClick:f},"\u53D1\u9001"),r.default.createElement(a.Button,{icon:r.default.createElement(g.SendOutlined,{rotate:-60}),type:"primary",disabled:!re,onClick:b},"\u505C\u6B62"))),r.default.createElement("section",null,re&&r.default.createElement("div",null,"\u6B63\u5728\u8F93\u5165..."),r.default.createElement("section",{style:{textAlign:"right",color:"#666"}},pe),r.default.createElement(_.default,{markdownText:G,isLoading:re})),r.default.createElement("section",{style:{position:"relative",height:300}},r.default.createElement(Q.default,null,r.default.createElement("p",null," wave "))))},z=n.default=Z},31819:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.trimTopic=n.toFixedBug=n.toFixed=n.toCamelCase=n.sleep=n.shuffleArr=n.saveHtmlToPng=n.reqStringify=n.readFromFile=n.randomString=n.randomNum=n.randomItem=n.randomHex=n.randomColor=n.random=n.promiseWithTimeout=n.prettyObject=n.pause=n.passwordStrength=n.oneApiChat=n.limitDecimal=n.isURLSearchParams=n.isObject=n.isNotEmpty=n.isEqual=n.isEmptyArray=n.isDecimal=n.isDate=n.isDarkMode=n.isArray=n.hidePhone=n.hasFocus=n.getType=n.getRandomId=n.getParamObject=n.getImgsUrl=n.getFileType=n.getEnv=n.getCurrentDate=n.fetchSomething=n.exportJsonData=n.exportFile=n.dayDif=n.customizeTimer=n.copyTextToClipboard=n.clearCookies=n.checkIsLocalPage=n.capitalize=n.camelizeCamelCase=n.asyncTo=n.asyncAction=n.ThousandNum=n.RoundNum=n.RandomId=void 0;var d=o(e(54756)),A=o(e(29293)),r=o(e(41132)),a=o(e(73738)),g=e(55373),m=o(e(20354)),C=n.getEnv=function(){var s;return typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]"&&(s="NODE"),typeof XMLHttpRequest!="undefined"&&(s="BROWSER"),s},i=n.isArray=function(s){return(0,a.default)(s)==="object"&&Object.prototype.toString.call(s)==="[object Array]"},c=n.isURLSearchParams=function(s){return typeof URLSearchParams!="undefined"&&s instanceof URLSearchParams},_=n.isDate=function(s){return(0,a.default)(s)==="object"&&Object.prototype.toString.call(s)==="[object Date]"},u=n.isObject=function(s){return s!==null&&(0,a.default)(s)==="object"},l=n.getParamObject=function(s){return c(s)?(0,g.parse)(s.toString(),{strictNullHandling:!0}):typeof s=="string"?[s]:s},t=n.reqStringify=function(s){return(0,g.stringify)(s,{arrayFormat:"repeat",strictNullHandling:!0})},E=n.getType=function(s){var f=(0,a.default)(s);return f!=="object"?f:Object.prototype.toString.call(s).replace(/^$/,"$1")},O=n.hidePhone=function(s){return s==null?void 0:s.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")},B=n.asyncAction=function(s){var f=Promise.resolve(s);return function(b){f.then(function(){return setTimeout(function(){return b()})})}},h=n.getImgsUrl=function(s){var f=/<img.*?(?:>|\/>)/gi,b=/src=['"]?([^'"]*)['"]?/i,T=s.match(f);if(!T)return null;var x=T.reduce(function(P,Y){var F=Y.match(b);return F[1]?[].concat((0,r.default)(P),[F[1]]):P},[]);return x},p=n.customizeTimer={intervalTimer:null,timeoutTimer:null,setTimeout:function(s,f){var b=this,T=Date.now,x=T(),P=x,Y=function(){b.timeoutTimer=requestAnimationFrame(Y),P=T(),P-x>=f&&(s(),cancelAnimationFrame(b.timeoutTimer))};return this.timeoutTimer=requestAnimationFrame(Y),this.timeoutTimer},clearTimeout:function(){cancelAnimationFrame(this.timeoutTimer)},setInterval:function(s,f){var b=this,T=Date.now,x=T(),P=x,Y=function(){b.intervalTimer=requestAnimationFrame(Y),P=T(),P-x>=f&&(x=T(),P=x,s())};return this.intervalTimer=requestAnimationFrame(Y),this.intervalTimer},clearInterval:function(){cancelAnimationFrame(this.intervalTimer)}},D=n.isDecimal=function(s){var f=/(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/;return f.test(s)},M=n.limitDecimal=function(s){return s.replace(/^(-)*(\d+)\.(\d\d).*$/,"$1$2.$3")},W=n.passwordStrength=function(s){var f=/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;return f.test(s)},L=n.checkIsLocalPage=function(){document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")return!1;if(document.visibilityState==="visible")return!0;window.addEventListener("pagehide",function(s){s.persisted},!1)})},K=n.randomHex=function(){return"#".concat(Math.floor(Math.random()*16777215).toString(16).padEnd(6,"0"))},Q=n.clearCookies=document.cookie.split(";").forEach(function(y){return document.cookie=y.replace(/^ +/,"").replace(/[=].*/,"=;expires=".concat(new Date(0).toUTCString(),";path=/"))}),I=n.dayDif=function(s,f){return Math.ceil(Math.abs(s.getTime()-f.getTime())/864e5)},U=n.capitalize=function(s){return s.charAt(0).toUpperCase()+s.slice(1)},j=n.isNotEmpty=function(s){return Array.isArray(s)&&s.length>0},S=n.isDarkMode=window.matchMedia("(prefers-color-scheme: dark)").matches,w=n.fetchSomething=function(){return new Promise(function(s){setTimeout(function(){s("")},1e3)})},Z=n.toFixed=function(s,f){if(typeof s!="number")throw new Error("number\u4E0D\u662F\u6570\u5B57");var b=Math.round(Math.pow(10,f)*s)/Math.pow(10,f);if(b=String(b),b.indexOf(".")===-1)f!==0&&(b+=".",b+=new Array(f+1).join("0"));else{var T=b.split(".");T[1].length<f&&(T[1]+=new Array(f-T[1].length+1).join("0")),b=T.join(".")}return b},z=n.toFixedBug=function(s,f){return~~(Math.pow(10,f)*s)/Math.pow(10,f)},R=n.promiseWithTimeout=function(s,f){var b=new Promise(function(T){return setTimeout(function(){return T("Time Out!")},f)});return Promise.race([b,s])},N=n.shuffleArr=function(s){return s.sort(function(){return .5-Math.random()})},X=n.sleep=function(s){return new Promise(function(f){return setTimeout(function(){return f()},s)})},G=n.ThousandNum=function(s){return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},V=n.RandomId=function(s){return Math.random().toString(36).substring(3,s)},H=n.RoundNum=function(s,f){return Math.round(s*Math.pow(10,f))/Math.pow(10,f)},q=n.randomNum=function(s,f){return Math.floor(Math.random()*(f-s+1))+s},se=n.isEmptyArray=function(s){return Array.isArray(s)&&!s.length},re=n.randomItem=function(s){return s[Math.floor(Math.random()*s.length)]},ee=n.asyncTo=function(s){return s.then(function(f){return[null,f]}).catch(function(f){return[f]})},ve=n.hasFocus=function(s){return s===document.activeElement},le=n.isEqual=function(s,f){return JSON.stringify(s)===JSON.stringify(f)},pe=n.randomString=function(){return Math.random().toString(36).slice(2)},ye=n.toCamelCase=function(s){return s.trim().replace(/[-_\s]+(.)?/g,function(f,b){return b?b.toUpperCase():""})},de=n.random=function(s,f){return Math.floor(Math.random()*(f-s+1)+s)},he=n.randomColor=function(){return"#".concat(Math.random().toString(16).slice(2,8).padEnd(6,"0"))},Ae=n.pause=function(s){return new Promise(function(f){return setTimeout(f,s)})},_e=n.camelizeCamelCase=function(s){return s.replace(/(?:^\w|[A-Z]|\b\w)/g,function(f,b){return b===0?f.toLowerCase():f.toUpperCase()}).replace(/\s+/g,"")},be=n.copyTextToClipboard=function(){var y=(0,A.default)(d.default.mark(function s(f){var b;return d.default.wrap(function(x){for(;;)switch(x.prev=x.next){case 0:if(x.prev=0,!((b=navigator)!==null&&b!==void 0&&(b=b.clipboard)!==null&&b!==void 0&&b.writeText)){x.next=4;break}return x.next=4,navigator.clipboard.writeText(f);case 4:x.next=8;break;case 6:x.prev=6,x.t0=x.catch(0);case 8:case"end":return x.stop()}},s,null,[[0,6]])}));return function(f){return y.apply(this,arguments)}}(),De=n.getRandomId=function(){for(var s="",f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",b=0;b<32;b++)s+=f.charAt(Math.floor(Math.random()*f.length));return s},ue=n.oneApiChat=function(s,f,b){return fetch("https://api.openai.com/v1/chat/completions",{method:"POST",signal:b,headers:{Authorization:f,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:s,stream:!0})})},ae=n.getCurrentDate=function(){var s=new Date,f=s.getDate(),b=s.getMonth()+1,T=s.getFullYear();return"".concat(T,"-").concat(b,"-").concat(f)},Oe=n.exportJsonData=function(s){var f=ae(),b=JSON.stringify(JSON.parse(s),null,2),T=new Blob([b],{type:"application/json"}),x=URL.createObjectURL(T),P=document.createElement("a");P.href=x,P.download="chat-store_".concat(f,".json"),document.body.appendChild(P),P.click(),document.body.removeChild(P)},Pe=n.saveHtmlToPng=function(){var y=(0,A.default)(d.default.mark(function s(f,b,T){var x,P,Y,F;return d.default.wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.prev=0,x=f!=null?f:document.getElementById("image-wrapper"),k.next=4,(0,m.default)(x,{useCORS:!0});case 4:P=k.sent,Y=P.toDataURL("image/png"),F=document.createElement("a"),F.style.display="none",F.href=Y,F.setAttribute("download","chat-shot.png"),typeof F.download=="undefined"&&F.setAttribute("target","_blank"),document.body.appendChild(F),F.click(),document.body.removeChild(F),window.URL.revokeObjectURL(Y),b&&b(),Promise.resolve(),k.next=22;break;case 19:k.prev=19,k.t0=k.catch(0),T&&T(k.t0.message);case 22:case"end":return k.stop()}},s,null,[[0,19]])}));return function(f,b,T){return y.apply(this,arguments)}}(),Me=n.trimTopic=function(s){return s.replace(/[，。！？”“"、,.!?]*$/,"")},xe=n.readFromFile=function(){return new Promise(function(s,f){var b=document.createElement("input");b.type="file",b.accept="application/json",b.onchange=function(T){var x=T.target.files[0],P=new FileReader;P.onload=function(Y){s(Y.target.result)},P.onerror=function(Y){return f(Y)},P.readAsText(x)},b.click()})},Ie=n.prettyObject=function(s){var f="";return typeof s!="string"&&(f=JSON.stringify(s,null,"  ")),f==="{}"?f.toString():f.startsWith("```json")?f:["```json",f,"```"].join(`
`)},ce=n.getFileType=function(s,f){var b=f.split(".").pop().toLowerCase();switch(b){case"txt":return"text/plain";case"json":return"application/json";case"doc":return"application/msword";case"docx":return"application/vnd.openxmlformats-officedocument.wordprocessingml.document";case"xls":return"application/vnd.ms-excel";case"xlsx":return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";case"ppt":return"application/vnd.ms-powerpoint";case"pptx":return"application/vnd.openxmlformats-officedocument.presentationml.presentation";case"pdf":return"application/pdf";case"jpg":case"jpeg":return"image/jpeg";case"png":return"image/png";case"gif":return"image/gif";case"zip":return"application/zip";case"rar":return"application/x-rar-compressed";default:if(typeof s=="string")try{return JSON.parse(s),"application/json"}catch(T){return"text/plain"}else return s instanceof Uint8Array||s instanceof ArrayBuffer,"application/octet-stream"}},me=n.exportFile=function(s,f){var b;if((s==null||(b=s.headers["content-type"])===null||b===void 0?void 0:b.indexOf("application/json"))===-1){var T=s.headers&&s.headers["content-disposition"]||"attachment;filename=".concat(f||"file",".xlsx"),x=decodeURI(T==null?void 0:T.split("=")[1].replace(/'/g,"")).replace(/"/g,"").replace("utf-8''","")||"",P=ce(s.data,f||x),Y=new Blob([s.data],{type:P}),F=URL.createObjectURL(Y),$=document.createElement("a");document.body.appendChild($),$.style="display: none",$.href=F,$.download=x,$.click(),document.body.removeChild($)}}},25039:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(47122),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},48122:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(61543),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},57903:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(9666),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},21958:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(97669),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},39726:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(27825),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},49511:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(90958),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},84576:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(80711),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},85120:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(45789),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},61352:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(91869),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},89696:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(22211),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},89200:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(38791),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},49887:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(6988),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},91193:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(41742),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},57812:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(20335),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},47443:function(v,n,e){"use strict";e.r(n);var o=e(85072),d=e.n(o),A=e(97825),r=e.n(A),a=e(77659),g=e.n(a),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),l=e(37318),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=r(),t.insertStyleElement=c();var E=d()(l.A,t);n.default=l.A&&l.A.locals?l.A.locals:void 0},82547:function(v){"use strict";v.exports="data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 4%27%3E%3Cstyle type=%27text/css%27%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX%280%29;}to {transform:translateX%28-15px%29;}}%3C/style%3E%3Cpath fill=%27none%27 stroke=%27%230087ca%27 stroke-width=%272%27 class=%27squiggle%27 d=%27M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3%27/%3E%3C/svg%3E"},42634:function(){}}]);

//# sourceMappingURL=267.ea559a0c6797d6be6e0b.js.map