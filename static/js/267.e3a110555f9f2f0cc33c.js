(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[267],{65548:function(p,n,e){"use strict";var r=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=r(e(43693)),a=m(e(96540)),o=e(74848);function g(u){if(typeof WeakMap!="function")return null;var s=new WeakMap,t=new WeakMap;return(g=function(O){return O?t:s})(u)}function m(u,s){if(!s&&u&&u.__esModule)return u;if(u===null||l(u)!="object"&&typeof u!="function")return{default:u};var t=g(s);if(t&&t.has(u))return t.get(u);var E={__proto__:null},O=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var B in u)if(B!=="default"&&{}.hasOwnProperty.call(u,B)){var h=O?Object.getOwnPropertyDescriptor(u,B):null;h&&(h.get||h.set)?Object.defineProperty(E,B,h):E[B]=u[B]}return E.default=u,t&&t.set(u,E),E}function C(u,s){var t=Object.keys(u);if(Object.getOwnPropertySymbols){var E=Object.getOwnPropertySymbols(u);s&&(E=E.filter(function(O){return Object.getOwnPropertyDescriptor(u,O).enumerable})),t.push.apply(t,E)}return t}function i(u){for(var s=1;s<arguments.length;s++){var t=arguments[s]!=null?arguments[s]:{};s%2?C(Object(t),!0).forEach(function(E){(0,A.default)(u,E,t[E])}):Object.getOwnPropertyDescriptors?Object.defineProperties(u,Object.getOwnPropertyDescriptors(t)):C(Object(t)).forEach(function(E){Object.defineProperty(u,E,Object.getOwnPropertyDescriptor(t,E))})}return u}var c=function(s){return(0,o.jsxs)("svg",i(i({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"#fff",viewBox:"0 0 120 30"},s),{},{children:[(0,o.jsxs)("circle",{cx:15,cy:15,r:15,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]}),(0,o.jsxs)("circle",{cx:60,cy:15,r:9,fillOpacity:.3,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:9,repeatCount:"indefinite",to:9,values:"9;15;9"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:.5,repeatCount:"indefinite",to:.5,values:".5;1;.5"})]}),(0,o.jsxs)("circle",{cx:105,cy:15,r:15,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]})]}))},_=n.default=c},47122:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`.alternating--mj1_d {
  animation-name: alternating-text--p6lWH;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  background: linear-gradient(to right, #000000, #0f9b0f);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  font-size: 20px;
  font-weight: 700;
}

@keyframes alternating-text--p6lWH {
  90% {
    display: none;
  }
}
`,"",{version:3,sources:["webpack://./src/components/stateless/AlternatingText/index.module.less"],names:[],mappings:"AAAA;EACE,uCAAgC;EAChC,sBAAsB;EACtB,mCAAmC;EACnC,+BAA+B;EAC/B,uDAAuD;EACvD,oCAAoC;EACpC,6BAA6B;EAC7B,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE;IACE,aAAa;EACf;AACF",sourcesContent:[`.alternating {
  animation-name: alternating-text;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  background: linear-gradient(to right, #000000, #0f9b0f);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  font-size: 20px;
  font-weight: 700;
}

@keyframes alternating-text {
  90% {
    display: none;
  }
}
`],sourceRoot:""}]),o.locals={alternating:"alternating--mj1_d","alternating-text":"alternating-text--p6lWH",alternatingText:"alternating-text--p6lWH"},n.A=o},61543:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`.btn--Vmubv {
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: #3857e3;
  font-weight: medium;
  color: #fff;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
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
  background: rgba(255, 255, 255, 0.2);
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
`,"",{version:3,sources:["webpack://./src/components/stateless/AnimateRipple/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,oBAAoB;EACpB,mBAAmB;EACnB,uBAAuB;EACvB,6BAA6B;EAC7B,yBAAyB;EACzB,mBAAmB;EACnB,WAAW;EACX;;mCAEiC;EACjC,gBAAgB;EAChB,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,wBAAwB;EACxB,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,UAAU;EACV,QAAQ;EACR,SAAS;EACT,kBAAkB;EAClB,oCAAoC;EACpC,qCAA8B;AAChC;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,uBAAuB;AACzB;;AAEA;EACE;IACE,UAAU;EACZ;EACA;IACE,UAAU;EACZ;EACA;IACE,WAAW;IACX,oBAAoB;IACpB,UAAU;EACZ;AACF",sourcesContent:[`.btn {
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: #3857e3;
  font-weight: medium;
  color: #fff;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
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
  background: rgba(255, 255, 255, 0.2);
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
`],sourceRoot:""}]),o.locals={btn:"btn--Vmubv",content:"content--jujDv","btn-ripple":"btn-ripple--w2aOn",btnRipple:"btn-ripple--w2aOn",ripple:"ripple--oIc_l","btn-ripple-container":"btn-ripple-container--II62b",btnRippleContainer:"btn-ripple-container--II62b"},n.A=o},9666:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`.hIBkFg--xUSDY {
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  margin: 0px;
  color: white;
  background: linear-gradient(rgb(115, 0, 64) 0%, rgb(48, 28, 190) 100%) text;
  -webkit-text-fill-color: transparent;
}
.hIBkFg--xUSDY span {
  background: linear-gradient(rgb(255, 215, 255) 0%, rgb(255, 182, 255) 100%) text;
  -webkit-text-fill-color: transparent;
}
.kqOLaE--z4koa {
  display: inline-flex;
  flex-direction: row;
  font-weight: bold;
  padding-right: 5px;
}

.kqOLaE--z4koa span {
  animation-name: bzAnHH--RpTzg;
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

@keyframes bzAnHH--RpTzg {
  50% {
    opacity: 1;
    transform: scale(1) translateY(0px) skewX(0deg) skewY(0deg) rotateZ(0deg);
    filter: blur(0px);
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
    transform: scale(1) translateY(0px) skewX(0deg) skewY(0deg) rotateZ(0deg);
    filter: blur(0px);
  }
}
`,"",{version:3,sources:["webpack://./src/components/stateless/AnimateWave/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,WAAW;EACX,YAAY;EACZ,2EAA2E;EAC3E,oCAAoC;AACtC;AACA;EACE,gFAAgF;EAChF,oCAAoC;AACtC;AACA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,6BAAsB;EACtB,sBAAsB;EACtB,8DAA8D;EAC9D,6BAA6B;EAC7B,mCAAmC;AACrC;;AAEA;EACE,qBAAqB;AACvB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE;IACE,UAAU;IACV,yEAAyE;IACzE,iBAAiB;EACnB;;EAEA;IACE,UAAU;IACV,8EAA8E;IAC9E,kBAAkB;EACpB;EACA;IACE,UAAU;IACV,+EAA+E;IAC/E,kBAAkB;EACpB;EACA;IACE,UAAU;IACV,yEAAyE;IACzE,iBAAiB;EACnB;AACF",sourcesContent:[`.hIBkFg {
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  margin: 0px;
  color: white;
  background: linear-gradient(rgb(115, 0, 64) 0%, rgb(48, 28, 190) 100%) text;
  -webkit-text-fill-color: transparent;
}
.hIBkFg span {
  background: linear-gradient(rgb(255, 215, 255) 0%, rgb(255, 182, 255) 100%) text;
  -webkit-text-fill-color: transparent;
}
.kqOLaE {
  display: inline-flex;
  flex-direction: row;
  font-weight: bold;
  padding-right: 5px;
}

.kqOLaE span {
  animation-name: bzAnHH;
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

@keyframes bzAnHH {
  50% {
    opacity: 1;
    transform: scale(1) translateY(0px) skewX(0deg) skewY(0deg) rotateZ(0deg);
    filter: blur(0px);
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
    transform: scale(1) translateY(0px) skewX(0deg) skewY(0deg) rotateZ(0deg);
    filter: blur(0px);
  }
}
`],sourceRoot:""}]),o.locals={hIBkFg:"hIBkFg--xUSDY",kqOLaE:"kqOLaE--z4koa",bzAnHH:"bzAnHH--RpTzg",bzAnHh:"bzAnHH--RpTzg"},n.A=o},97669:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=e(4417),g=e.n(o),m=new URL(e(82547),e.b),C=a()(l()),i=g()(m);C.push([p.id,`a.squiggle--JQRWj {
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
`],sourceRoot:""}]),C.locals={squiggle:"squiggle--JQRWj"},n.A=C},27825:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`.avatarCard--kIii3 {
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
`],sourceRoot:""}]),o.locals={avatarCard:"avatarCard--kIii3",card:"card--W_bZq",content:"content--yiHmV"},n.A=o},90958:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`.breatheItem--VaM9v {
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
  to {
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

  to {
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
    1px 1px 164px rgba(39, 97, 255, 0.9);
  animation: zoom-in-zoom-out--alaL8 2s ease infinite;
}

.div-block--OwsxA {
  width: 86px;
  height: 86px;
  background-color: rgba(39, 97, 255, 0.1);
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

  to {
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
  background-image: radial-gradient(circle, #006b6b, rgba(158, 75, 0, 0));
  border-color: #1cc7c7;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/BreatheText/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,cAAc;EACd,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,yBAAyB;EACzB,oEAA6D;AAC/D;;AAEA;EACE;IAEE,mBAAmB;EACrB;;EAEA;;IAGE,mBAAmB;EACrB;;EAEA;;IAEE,UAAU;EACZ;AACF;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,kBAAkB;EAClB;IACE,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;IACZ,aAAa;IACb,0BAA0B;IAC1B,kBAAkB;IAClB,kBAAkB;IAClB;MACE,YAAY;MACZ,aAAa;MACb,0BAA0B;MAC1B,kBAAkB;MAClB,kBAAkB;MAClB,kBAAkB;MAClB,0CAAmC;IACrC;IACA;MACE,kBAAkB;MAClB,UAAU;MACV,cAAc;MACd,eAAe;MACf,mBAAmB;IACrB;EACF;AACF;;AAEA;EACE;IACE,uBAAuB;EACzB;EACA;IACE,yBAAyB;EAC3B;EACA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE;IACE,uBAAuB;EACzB;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,uBAAuB;EACzB;AACF;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,aAAa;EACb,yBAAyB;EACzB,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;EACb,kBAAkB;EAClB;;wCAEsC;EACtC,mDAA4C;AAC9C;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,wCAAwC;EACxC,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,qBAAqB;EACvB;;EAEA;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE,UAAU;EACV,aAAa;EACb,gEAAgE;EAChE,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;EAClB,UAAU;EACV,OAAO;EACP,QAAQ;AACV;;AAEA;EACE,uEAAuE;EACvE,qBAAqB;AACvB",sourcesContent:[`.breatheItem {
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
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50%,
  75% {
    -webkit-transform: scale(3);
    transform: scale(3);
  }

  78%,
  to {
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

  to {
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
    1px 1px 164px rgba(39, 97, 255, 0.9);
  animation: zoom-in-zoom-out 2s ease infinite;
}

.div-block {
  width: 86px;
  height: 86px;
  background-color: rgba(39, 97, 255, 0.1);
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

  to {
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
  background-image: radial-gradient(circle, #006b6b, rgba(158, 75, 0, 0));
  border-color: #1cc7c7;
}
`],sourceRoot:""}]),o.locals={breatheItem:"breatheItem--VaM9v",breathe:"breathe--wA3l6",loopRotate:"loopRotate--GRmod",loop:"loop--Q7Ru6",outside:"outside--NZwXf",inner:"inner--ZClIQ",text:"text--FGKfx","play-button":"play-button--Wg3em",playButton:"play-button--Wg3em","zoom-in-zoom-out":"zoom-in-zoom-out--alaL8",zoomInZoomOut:"zoom-in-zoom-out--alaL8","div-block":"div-block--OwsxA",divBlock:"div-block--OwsxA","div-block-1019":"div-block-1019--iYyTM",divBlock1019:"div-block-1019--iYyTM","div-block-1021":"div-block-1021--EWkRm",divBlock1021:"div-block-1021--EWkRm",code:"code--Wc_Yz",trans:"trans--jcajC"},n.A=o},80711:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`.gradientTracking--FyamC {
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
`,"",{version:3,sources:["webpack://./src/components/stateless/GradientTracking/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,cAAc;EACd,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;EACf,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,eAAe;EACf,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,SAAS;EACT,WAAW;EACX,kBAAkB;EAClB,cAAc;EACd,aAAa;EACb,QAAkB;EAAlB,kBAAkB;EAClB,SAAmB;EAAnB,mBAAmB;EACnB,mEAAmE;EACnE,gCAAgC;EAChC;;oBAEkB;AACpB;;AAEA;EACE,aAAa;AACf",sourcesContent:[`.gradientTracking {
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
`],sourceRoot:""}]),o.locals={gradientTracking:"gradientTracking--FyamC"},n.A=o},45789:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`.isometricCard--mEKMm {
  margin: 0 100px;
  transform: rotateX(51deg) rotateZ(43deg);
  transform-style: preserve-3d;
  will-change: transform;
  width: 240px;
  height: 320px;
  background: #070221;
  border-radius: 2rem;
  box-shadow:
    1px 1px 0 1px #f9f9fb,
    -1px 0 28px 0 rgba(34, 33, 81, 0.01),
    28px 28px 28px 0 rgba(34, 33, 81, 0.25);
  transition:
    0.4s ease-in-out transform,
    0.3s ease-in-out box-shadow;
  color: #fff;
}

.isometricCard--mEKMm:hover {
  transform: translate3d(0px, -16px, 0px) rotateX(51deg) rotateZ(43deg);
  box-shadow:
    1px 1px 0 1px #f9f9fb,
    -1px 0 28px 0 rgba(34, 33, 81, 0.01),
    54px 54px 28px -10px rgba(34, 33, 81, 0.15);
}

.isometricCard--mEKMm {
  display: flex;
  align-items: center;
}

.isometricCard--mEKMm p {
  margin: 0 36px;
  text-align: center;
  font-size: 20px;
  line-height: 1.4;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/IsometricCard/index.module.less"],names:[],mappings:"AAAA;EACE,eAAe;EACf,wCAAwC;EACxC,4BAA4B;EAC5B,sBAAsB;EACtB,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB;;;2CAGyC;EACzC;;+BAE6B;EAC7B,WAAW;AACb;;AAEA;EACE,qEAAqE;EACrE;;;+CAG6C;AAC/C;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,eAAe;EACf,gBAAgB;AAClB",sourcesContent:[`.isometricCard {
  margin: 0 100px;
  transform: rotateX(51deg) rotateZ(43deg);
  transform-style: preserve-3d;
  will-change: transform;
  width: 240px;
  height: 320px;
  background: #070221;
  border-radius: 2rem;
  box-shadow:
    1px 1px 0 1px #f9f9fb,
    -1px 0 28px 0 rgba(34, 33, 81, 0.01),
    28px 28px 28px 0 rgba(34, 33, 81, 0.25);
  transition:
    0.4s ease-in-out transform,
    0.3s ease-in-out box-shadow;
  color: #fff;
}

.isometricCard:hover {
  transform: translate3d(0px, -16px, 0px) rotateX(51deg) rotateZ(43deg);
  box-shadow:
    1px 1px 0 1px #f9f9fb,
    -1px 0 28px 0 rgba(34, 33, 81, 0.01),
    54px 54px 28px -10px rgba(34, 33, 81, 0.15);
}

.isometricCard {
  display: flex;
  align-items: center;
}

.isometricCard p {
  margin: 0 36px;
  text-align: center;
  font-size: 20px;
  line-height: 1.4;
}
`],sourceRoot:""}]),o.locals={isometricCard:"isometricCard--mEKMm"},n.A=o},91869:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`.hoverRotate--ew29g {
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
  background-color: rgba(0, 0, 0, 0.5);
  border-top: 32px solid rgba(0, 0, 0, 0.5);
  border-bottom: 32px solid rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  content: '';
  transition: all 0.3s ease;
  z-index: 1;
  opacity: 0;
  transform: scaleY(2);
}

.hoverRotate--ew29g img {
  vertical-align: top;
  max-width: 100%;
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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 1;
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
`,"",{version:3,sources:["webpack://./src/components/stateless/LazyLoadImage/index.module.less"],names:[],mappings:"AAAA;EACE,gBAAgB;EAChB,sBAAsB;EACtB,WAAW;EACX,qBAAqB;EACrB,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,sBAAsB;EACtB,0BAA0B;AAC5B;;AAEA;;EAEE,oCAAoC;EACpC,yCAAyC;EACzC,4CAA4C;EAC5C,kBAAkB;EAClB,MAAM;EACN,SAAS;EACT,OAAO;EACP,QAAQ;EACR,WAAW;EACX,yBAAyB;EACzB,UAAU;EACV,UAAU;EACV,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;EACnB,eAAe;EACf,2BAA2B;EAC3B,oBAAoB;EACpB,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,4CAA4C;EAC5C,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,+BAA+B;EAC/B,cAAc;EACd,eAAe;AACjB;AACA;EACE,kCAAkC;AACpC;AACA;EACE,kBAAkB;EAClB,MAAM;EACN,SAAS;EACT,OAAO;EACP,QAAQ;EACR,mBAAmB;EACnB,UAAU;EACV,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,kBAAkB;EAClB,UAAU;EACV,UAAU;EACV,sBAAsB;EACtB,eAAe;EACf,uBAAuB;EACvB,gBAAgB;EAChB,mBAAmB;EACnB,yBAAyB;AAC3B;;AAEA;;EAEE,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,UAAU;AACZ",sourcesContent:[`.hoverRotate {
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
  background-color: rgba(0, 0, 0, 0.5);
  border-top: 32px solid rgba(0, 0, 0, 0.5);
  border-bottom: 32px solid rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  content: '';
  transition: all 0.3s ease;
  z-index: 1;
  opacity: 0;
  transform: scaleY(2);
}

.hoverRotate img {
  vertical-align: top;
  max-width: 100%;
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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 1;
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
`],sourceRoot:""}]),o.locals={hoverRotate:"hoverRotate--ew29g"},n.A=o},22211:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`.lineBordered--bh05r {
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
  background: #ffffff;
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
  border-bottom-color: #ffffff;
}

.container--lADY1.bottom--P1bZI::before,
.container--lADY1.bottom--P1bZI::after {
  top: 100%;
  right: 19px;
  border-top-color: #ccc;
}

.container--lADY1.bottom--P1bZI::after {
  right: 20px;
  border-top-color: #ffffff;
}

.no-scrollbars--AUOMQ {
  overflow: auto;
  scrollbar-width: none;
}

.no-scrollbars--AUOMQ::-webkit-scrollbar {
  display: none;
}

.engraved-text--dMPwS {
  background-color: #666666;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 3px 5px 1px rgba(245, 245, 245, 0.5);
}

.embossed-text--eQZ0_ {
  color: #f0f0f0;
  background-color: #666666;
  text-shadow: 1px 4px 4px #555;
  -webkit-background-clip: text;
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
`,"",{version:3,sources:["webpack://./src/components/stateless/LineBordered/index.module.less"],names:[],mappings:"AAAA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB;;AAEA;;EAEE,2BAA2B;EAC3B,oBAAoB;EACpB,WAAW;EACX,SAAS;EACT,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,6BAA6B;EAC7B,QAAQ;EACR,SAAS;AACX;;AAEA;EACE,gCAAgC;EAChC,YAAY;EACZ,OAAO;AACT;;AAEA;;EAEE,WAAW;AACb;;AAEA;EACE,qBAAqB;EACrB,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,WAAW;EACX,oBAAoB;EACpB,WAAW;EACX,SAAS;EACT,OAAO;EACP,yBAAyB;EACzB,oCAAoC;AACtC;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,oDAAoD;AACtD;;AAEA;EACE,WAAW;EACX,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,WAAW;EACX,oBAAoB;EACpB,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,iBAAiB;EACjB,0BAA0B;AAC5B;;AAEA;EACE,cAAc;EACd,WAAW;EACX,mBAAmB;EACnB,eAAe;EACf,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;;EAEE,WAAW;EACX,kBAAkB;EAClB,8BAA8B;AAChC;;AAEA;EACE,8BAA8B;AAChC;;AAEA;;EAEE,YAAY;EACZ,UAAU;EACV,yBAAyB;AAC3B;;AAEA;EACE,UAAU;EACV,4BAA4B;AAC9B;;AAEA;;EAEE,SAAS;EACT,WAAW;EACX,sBAAsB;AACxB;;AAEA;EACE,WAAW;EACX,yBAAyB;AAC3B;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,yBAAyB;EACzB,6BAA6B;EAC7B,kBAAkB;EAClB,iDAAiD;AACnD;;AAEA;EACE,cAAc;EACd,yBAAyB;EACzB,6BAA6B;EAC7B,6BAA6B;AAC/B;;AAEA;EACE,2DAA2D;EAC3D,qDAAqD;EACrD,uDAAuD;EACvD,uDAAuD;EACvD,uDAAuD;EACvD,sDAAsD;EACtD,oDAAoD;;EAEpD,0DAA0D;EAC1D,qDAAqD;EACrD,qDAAqD;EACrD,oDAAoD;EACpD,gDAAgD;EAChD,+CAA+C;EAC/C,oDAAoD;;EAEpD,gEAAgE;EAChE,2DAA2D;EAC3D,yDAAyD;EACzD,oDAAoD;EACpD,mDAAmD;EACnD,4CAA4C;EAC5C,0DAA0D;AAC5D",sourcesContent:[`.lineBordered {
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
  background: #ffffff;
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
  border-bottom-color: #ffffff;
}

.container.bottom::before,
.container.bottom::after {
  top: 100%;
  right: 19px;
  border-top-color: #ccc;
}

.container.bottom::after {
  right: 20px;
  border-top-color: #ffffff;
}

.no-scrollbars {
  overflow: auto;
  scrollbar-width: none;
}

.no-scrollbars::-webkit-scrollbar {
  display: none;
}

.engraved-text {
  background-color: #666666;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 3px 5px 1px rgba(245, 245, 245, 0.5);
}

.embossed-text {
  color: #f0f0f0;
  background-color: #666666;
  text-shadow: 1px 4px 4px #555;
  -webkit-background-clip: text;
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
`],sourceRoot:""}]),o.locals={lineBordered:"lineBordered--bh05r","hover-underline-animation":"hover-underline-animation--TSfGP",hoverUnderlineAnimation:"hover-underline-animation--TSfGP",left:"left--ErwKf",center:"center--BFLFI",right:"right--DRVwU","dynamic-shadow":"dynamic-shadow--Us2nj",dynamicShadow:"dynamic-shadow--Us2nj","image-contain":"image-contain--Z_yfM",imageContain:"image-contain--Z_yfM","image-cover":"image-cover--ZVSiS",imageCover:"image-cover--ZVSiS",container:"container--lADY1",top:"top--XQMfF",bottom:"bottom--P1bZI","no-scrollbars":"no-scrollbars--AUOMQ",noScrollbars:"no-scrollbars--AUOMQ","engraved-text":"engraved-text--dMPwS",engravedText:"engraved-text--dMPwS","embossed-text":"embossed-text--eQZ0_",embossedText:"embossed-text--eQZ0_"},n.A=o},34671:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`.linearWrap--EI336 {
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
`],sourceRoot:""}]),o.locals={linearWrap:"linearWrap--EI336",line:"line--LijIE",animate1:"animate1--rw6dI",animate2:"animate2--uMKrU",animate3:"animate3--dW9XO",animate4:"animate4--KPFuY"},n.A=o},38791:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`.background--V0AeH {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ff99df;
  background-image: radial-gradient(circle at 52% 73%, hsla(310, 85%, 67%, 1) 0px, transparent 50%),
    radial-gradient(circle at 0% 30%, hsla(197, 90%, 76%, 1) 0px, transparent 50%),
    radial-gradient(circle at 41% 26%, hsla(234, 79%, 69%, 1) 0px, transparent 50%),
    radial-gradient(circle at 41% 51%, hsla(41, 70%, 63%, 1) 0px, transparent 50%),
    radial-gradient(circle at 41% 88%, hsla(36, 83%, 61%, 1) 0px, transparent 50%),
    radial-gradient(circle at 76% 73%, hsla(346, 69%, 70%, 1) 0px, transparent 50%),
    radial-gradient(circle at 29% 37%, hsla(272, 96%, 64%, 1) 0px, transparent 50%);

  background-size: 150% 150%;
  filter: blur(10px);
  animation: moveBackground--eTrtA 10s linear infinite;
}

@keyframes moveBackground--eTrtA {
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
`,"",{version:3,sources:["webpack://./src/components/stateless/MeshGradientBackground/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB;;;;;;mFAMiF;;EAEjF,0BAA0B;EAC1B,kBAAkB;EAClB,oDAA6C;AAC/C;;AAEA;EACE;IACE,0BAA0B;EAC5B;EACA;IACE,yBAAyB;EAC3B;EACA;IACE,0BAA0B;EAC5B;EACA;IACE,0BAA0B;EAC5B;EACA;IACE,0BAA0B;EAC5B;EACA;IACE,0BAA0B;EAC5B;EACA;IACE,yBAAyB;EAC3B;EACA;IACE,yBAAyB;EAC3B;EACA;IACE,yBAAyB;EAC3B;EACA;IACE,yBAAyB;EAC3B;EACA;IACE,0BAA0B;EAC5B;AACF",sourcesContent:[`.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ff99df;
  background-image: radial-gradient(circle at 52% 73%, hsla(310, 85%, 67%, 1) 0px, transparent 50%),
    radial-gradient(circle at 0% 30%, hsla(197, 90%, 76%, 1) 0px, transparent 50%),
    radial-gradient(circle at 41% 26%, hsla(234, 79%, 69%, 1) 0px, transparent 50%),
    radial-gradient(circle at 41% 51%, hsla(41, 70%, 63%, 1) 0px, transparent 50%),
    radial-gradient(circle at 41% 88%, hsla(36, 83%, 61%, 1) 0px, transparent 50%),
    radial-gradient(circle at 76% 73%, hsla(346, 69%, 70%, 1) 0px, transparent 50%),
    radial-gradient(circle at 29% 37%, hsla(272, 96%, 64%, 1) 0px, transparent 50%);

  background-size: 150% 150%;
  filter: blur(10px);
  animation: moveBackground 10s linear infinite;
}

@keyframes moveBackground {
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
`],sourceRoot:""}]),o.locals={background:"background--V0AeH",moveBackground:"moveBackground--eTrtA"},n.A=o},6988:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`.markdownBody--xUrgB {\r
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
`],sourceRoot:""}]),o.locals={markdownBody:"markdownBody--xUrgB",loadingIcon:"loadingIcon--VpAmv",copySection:"copySection--aJHtb",lang:"lang--SO0lS",copySpan:"copySpan--u4qzC",preCode:"preCode--s6faO"},n.A=o},41742:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`/* Perspective card */
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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
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
    background: rgba(0, 0, 0, 0.1);
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
`,"",{version:3,sources:["webpack://./src/components/stateless/ShiftingCard/index.module.less"],names:[],mappings:"AAAA,qBAAqB;AACrB;EACE,6CAA6C;EAC7C,gCAAgC;AAClC;;AAEA;EACE,4CAA4C;AAC9C;;AAEA,qBAAqB;AACrB;EACE,kBAAkB;EAClB,qBAAqB;EACrB,sBAAsB;EACtB,aAAa;EACb,YAAY;EACZ,YAAY;EACZ,mBAAmB;EACnB,mDAAmD;EACnD,sBAAsB;EACtB,4DAAkF;EAAlF,kFAAkF;EAClF,mCAAmC;EACnC,8DAA8D;;EAE9D;IACE,WAAW;IACX,kBAAkB;IAClB,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;IACZ,8BAA8B;IAC9B,UAAU;IACV,6BAA6B;EAC/B;;EAEA;IACE,YAAY;IACZ,YAAY;IACZ,iBAAiB;IACjB,mBAAmB;IACnB,kBAAkB;IAClB,eAAe;IACf,gBAAgB;IAChB,WAAW;IACX,gBAAgB;EAClB;AACF;;AAEA;EACE;IACE,UAAU;EACZ;;EAEA;IACE,UAAU;EACZ;;EAEA;IACE,oEAAoE;EACtE;AACF",sourcesContent:[`/* Perspective card */
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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
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
    background: rgba(0, 0, 0, 0.1);
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
`],sourceRoot:""}]),o.locals={"perspective-card":"perspective-card--fRasE",perspectiveCard:"perspective-card--fRasE",shiftingCard:"shiftingCard--ejZ4B",cardAnimation:"cardAnimation--uMV0q"},n.A=o},20335:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`.star--H6zRP {
  color: #ff9933;
  cursor: pointer;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/StarRating/index.module.less"],names:[],mappings:"AAAA;EACE,cAAc;EACd,eAAe;AACjB",sourcesContent:[`.star {
  color: #ff9933;
  cursor: pointer;
}
`],sourceRoot:""}]),o.locals={star:"star--H6zRP"},n.A=o},37318:function(p,n,e){"use strict";var r=e(71354),l=e.n(r),A=e(76314),a=e.n(A),o=a()(l());o.push([p.id,`.avatar--tAk6h {
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

  to {
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
  color: rgba(0, 0, 0, 0.2);
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
  animation: moveMe--FOkqf 8s ease-out infinite alternate;
}

@keyframes moveMe--FOkqf {
  to {
    transform: translateY(50px);
  }
}

.button--GgsIa {
  background: transparent;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(90deg, white, white), linear-gradient(90deg, hsl(289, 65%, 64%), hsl(226, 78%, 67%));
  background-clip: padding-box, border-box;
  background-origin: border-box;
  border: 5px solid transparent;
  border-radius: 1.75rem;
}

.button-label--d_jxl {
  background-image: linear-gradient(90deg, hsl(289, 65%, 64%), hsl(226, 78%, 67%));
  background-clip: text;
  -webkit-background-clip: text;
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
  animation-play-state: running;
  animation-delay: 1s;
  border: 1.5px solid rgba(121, 40, 202, 0.4);
  background: linear-gradient(-180deg, rgba(121, 40, 202, 0.4) 40%, #000000 100%);
  animation: expand--kmoUS 6s ease-out infinite both;
}

.circle-2--YMeVl {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: calc(-20px);
  left: calc(-20px);
  animation-play-state: running;
  animation-delay: 0.5s;
  border: 1px solid rgba(121, 40, 202, 0.4);
  background: linear-gradient(-180deg, rgba(121, 40, 202, 0.30000000000000004) 20%, #000000 100%);
  animation: expand-opacity--XzitQ 6s linear infinite both;
}
.circle-3--DvCUJ {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  top: calc(-30px);
  left: calc(-30px);
  animation-play-state: running;
  animation-delay: 1s;
  border: 1px solid rgba(121, 40, 202, 0.3);
  background: linear-gradient(-180deg, rgba(121, 40, 202, 0.2) 20%, #000000 100%);
  animation: expand-opacity--XzitQ 6s linear infinite both;
}
.circle-4--UkUyn {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  top: calc(-40px);
  left: calc(-40px);
  animation-play-state: running;
  animation-delay: 1.5s;
  border: 1px solid rgba(121, 40, 202, 0.2);
  background: linear-gradient(-180deg, rgba(121, 40, 202, 0.09999999999999998) 20%, #000000 100%);
  animation: expand-opacity--XzitQ 6s linear infinite both;
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
`,"",{version:3,sources:["webpack://./src/pages/home/index.module.less"],names:[],mappings:"AAAA;EACE,uDAAgD;AAClD;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,wBAAwB;EAC1B;AACF;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,oBAAoB;EACpB,kBAAkB;EAClB,iBAAiB;EACjB,WAAW;EACX,eAAe;EACf,kBAAkB;EAClB,mFAA2E;UAA3E,2EAA2E;AAC7E;AACA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,eAAe;EACf,yBAAyB;EACzB,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,WAAW;EACX,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,qDAAqD;EACrD,uDAAgD;AAClD;;AAEA;EACE;IACE,2BAA2B;EAC7B;AACF;;AAEA;EACE,uBAAuB;EACvB,oBAAoB;EACpB,sHAAsH;EACtH,wCAAwC;EACxC,6BAA6B;EAC7B,6BAA6B;EAC7B,sBAAsB;AACxB;;AAEA;EACE,gFAAgF;EAChF,qBAAqB;EACrB,6BAA6B;EAC7B,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,6BAA6B;EAC7B,mBAAmB;EACnB,2CAA2C;EAC3C,+EAA+E;EAC/E,kDAA2C;AAC7C;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,6BAA6B;EAC7B,qBAAqB;EACrB,yCAAyC;EACzC,+FAA+F;EAC/F,wDAAiD;AACnD;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,6BAA6B;EAC7B,mBAAmB;EACnB,yCAAyC;EACzC,+EAA+E;EAC/E,wDAAiD;AACnD;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,6BAA6B;EAC7B,qBAAqB;EACrB,yCAAyC;EACzC,+FAA+F;EAC/F,wDAAiD;AACnD;;AAEA;EACE;IACE,mBAAmB;EACrB;EACA;IACE,qBAAqB;EACvB;EACA;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE;IACE,UAAU;IACV,mBAAmB;EACrB;EACA;IACE,UAAU;IACV,qBAAqB;EACvB;EACA;IACE,UAAU;IACV,uBAAuB;EACzB;AACF",sourcesContent:[`.avatar {
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

  to {
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
  color: rgba(0, 0, 0, 0.2);
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
  animation: moveMe 8s ease-out infinite alternate;
}

@keyframes moveMe {
  to {
    transform: translateY(50px);
  }
}

.button {
  background: transparent;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(90deg, white, white), linear-gradient(90deg, hsl(289, 65%, 64%), hsl(226, 78%, 67%));
  background-clip: padding-box, border-box;
  background-origin: border-box;
  border: 5px solid transparent;
  border-radius: 1.75rem;
}

.button-label {
  background-image: linear-gradient(90deg, hsl(289, 65%, 64%), hsl(226, 78%, 67%));
  background-clip: text;
  -webkit-background-clip: text;
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
  animation-play-state: running;
  animation-delay: 1s;
  border: 1.5px solid rgba(121, 40, 202, 0.4);
  background: linear-gradient(-180deg, rgba(121, 40, 202, 0.4) 40%, #000000 100%);
  animation: expand 6s ease-out infinite both;
}

.circle-2 {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: calc(-20px);
  left: calc(-20px);
  animation-play-state: running;
  animation-delay: 0.5s;
  border: 1px solid rgba(121, 40, 202, 0.4);
  background: linear-gradient(-180deg, rgba(121, 40, 202, 0.30000000000000004) 20%, #000000 100%);
  animation: expand-opacity 6s linear infinite both;
}
.circle-3 {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  top: calc(-30px);
  left: calc(-30px);
  animation-play-state: running;
  animation-delay: 1s;
  border: 1px solid rgba(121, 40, 202, 0.3);
  background: linear-gradient(-180deg, rgba(121, 40, 202, 0.2) 20%, #000000 100%);
  animation: expand-opacity 6s linear infinite both;
}
.circle-4 {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  top: calc(-40px);
  left: calc(-40px);
  animation-play-state: running;
  animation-delay: 1.5s;
  border: 1px solid rgba(121, 40, 202, 0.2);
  background: linear-gradient(-180deg, rgba(121, 40, 202, 0.09999999999999998) 20%, #000000 100%);
  animation: expand-opacity 6s linear infinite both;
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
`],sourceRoot:""}]),o.locals={avatar:"avatar--tAk6h",levitate:"levitate--RZCwS",maskBox:"maskBox--uAYjJ",watermark:"watermark--YUolT","blend-me":"blend-me--f5L11",blendMe:"blend-me--f5L11",moveMe:"moveMe--FOkqf",button:"button--GgsIa","button-label":"button-label--d_jxl",buttonLabel:"button-label--d_jxl","circle-1":"circle-1--kJj6k",circle1:"circle-1--kJj6k",expand:"expand--kmoUS","circle-2":"circle-2--YMeVl",circle2:"circle-2--YMeVl","expand-opacity":"expand-opacity--XzitQ",expandOpacity:"expand-opacity--XzitQ","circle-3":"circle-3--DvCUJ",circle3:"circle-3--DvCUJ","circle-4":"circle-4--UkUyn",circle4:"circle-4--UkUyn"},n.A=o},81286:function(p,n,e){"use strict";var r=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=g(e(96540)),a=r(e(25039));function o(i){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(o=function(s){return s?_:c})(i)}function g(i,c){if(!c&&i&&i.__esModule)return i;if(i===null||l(i)!="object"&&typeof i!="function")return{default:i};var _=o(c);if(_&&_.has(i))return _.get(i);var u={__proto__:null},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var t in i)if(t!=="default"&&{}.hasOwnProperty.call(i,t)){var E=s?Object.getOwnPropertyDescriptor(i,t):null;E&&(E.get||E.set)?Object.defineProperty(u,t,E):u[t]=i[t]}return u.default=i,_&&_.set(i,u),u}var m=function(c){var _=c.alternateText,u=_===void 0?[]:_;return(0,A.useEffect)(function(){var s=document.getElementById("alternating-text"),t=0,E=function(B){t=t<u.length-1?t+1:0,s.innerHTML=u[t]};return s.innerHTML=u[0],s.addEventListener("animationiteration",E,!1),function(){s.removeEventListener("animationiteration",E,!1)}},[]),A.default.createElement("span",{className:a.default.alternating,id:"alternating-text"},u[0]||"Text goes here")},C=n.default=m},44322:function(p,n,e){"use strict";var r=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=r(e(43693)),a=r(e(85715)),o=m(e(96540));function g(B){if(typeof WeakMap!="function")return null;var h=new WeakMap,v=new WeakMap;return(g=function(M){return M?v:h})(B)}function m(B,h){if(!h&&B&&B.__esModule)return B;if(B===null||l(B)!="object"&&typeof B!="function")return{default:B};var v=g(h);if(v&&v.has(B))return v.get(B);var b={__proto__:null},M=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var W in B)if(W!=="default"&&{}.hasOwnProperty.call(B,W)){var z=M?Object.getOwnPropertyDescriptor(B,W):null;z&&(z.get||z.set)?Object.defineProperty(b,W,z):b[W]=B[W]}return b.default=B,v&&v.set(B,b),b}function C(B,h){var v=Object.keys(B);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(B);h&&(b=b.filter(function(M){return Object.getOwnPropertyDescriptor(B,M).enumerable})),v.push.apply(v,b)}return v}function i(B){for(var h=1;h<arguments.length;h++){var v=arguments[h]!=null?arguments[h]:{};h%2?C(Object(v),!0).forEach(function(b){(0,A.default)(B,b,v[b])}):Object.getOwnPropertyDescriptors?Object.defineProperties(B,Object.getOwnPropertyDescriptors(v)):C(Object(v)).forEach(function(b){Object.defineProperty(B,b,Object.getOwnPropertyDescriptor(v,b))})}return B}var c=function(h){var v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"0px",b=(0,o.useState)(!0),M=(0,a.default)(b,2),W=M[0],z=M[1];return(0,o.useEffect)(function(){var L=new IntersectionObserver(function(Z){var x=(0,a.default)(Z,1),K=x[0];z(K.isIntersecting)},{rootMargin:v});return h.current&&L.observe(h.current),function(){h.current&&L.unobserve(h.current)}},[]),W},_=function(h){var v=h.from,b=h.to,M=h.children,W=(0,o.useRef)(null),z=c(W),L={transition:"1000ms ease-in-out"};return o.default.createElement("div",{ref:W,style:z?i(i({},L),b):i(i({},L),v)},M)},u=function(h){var v=h.children;return o.default.createElement(_,{from:{opacity:0},to:{opacity:1}},v)},s=function(h){var v=h.children;return o.default.createElement(_,{from:{opacity:0,translate:"0 2rem"},to:{opacity:1,translate:"none"}},v)},t=function(h){var v=h.children;return o.default.createElement(_,{from:{scale:"0"},to:{scale:"1"}},v)},E={FadeIn:u,FadeUp:s,ScaleIn:t},O=n.default=E},53795:function(p,n,e){"use strict";var r=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=r(e(94634)),a=r(e(91847)),o=r(e(85715)),g=c(e(96540)),m=r(e(48122)),C=["children","onClick"];function i(t){if(typeof WeakMap!="function")return null;var E=new WeakMap,O=new WeakMap;return(i=function(h){return h?O:E})(t)}function c(t,E){if(!E&&t&&t.__esModule)return t;if(t===null||l(t)!="object"&&typeof t!="function")return{default:t};var O=i(E);if(O&&O.has(t))return O.get(t);var B={__proto__:null},h=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in t)if(v!=="default"&&{}.hasOwnProperty.call(t,v)){var b=h?Object.getOwnPropertyDescriptor(t,v):null;b&&(b.get||b.set)?Object.defineProperty(B,v,b):B[v]=t[v]}return B.default=t,O&&O.set(t,B),B}var _=function(){var E=g.default.useState({x:-1,y:-1}),O=(0,o.default)(E,2),B=O[0],h=B.x,v=B.y,b=O[1],M=h!==-1&&v!==-1,W=function(L){var Z=L.currentTarget.getBoundingClientRect(),x=Z.left,K=Z.top;b({x:L.clientX-x,y:L.clientY-K}),setTimeout(function(){b({x:-1,y:-1})},300)};return{x:h,y:v,handleRippleOnClick:W,isRippling:M}},u=function(E){var O=E.children,B=E.onClick,h=(0,a.default)(E,C),v=_(),b=v.x,M=v.y,W=v.handleRippleOnClick,z=v.isRippling,L=function(x){W(x),B&&B(x)};return g.default.createElement("button",(0,A.default)({type:"button",onClick:L,className:m.default.btn},h),g.default.createElement("span",{className:m.default.content},O),z&&g.default.createElement("div",{className:m.default["btn-ripple-container"]},g.default.createElement("span",{className:m.default["btn-ripple"],style:{left:b,top:M}})))},s=n.default=u},85666:function(p,n,e){"use strict";var r=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=r(e(96540)),A=r(e(57903)),a=function(m){var C=m.children;return l.default.createElement(l.default.Fragment,null,l.default.createElement("section",{className:A.default.hIBkFg},l.default.createElement("h2",null,"Design and code"," ",l.default.createElement("span",{className:A.default.kqOLaE},l.default.createElement("span",null,"R"),l.default.createElement("span",null,"e"),l.default.createElement("span",null,"a"),l.default.createElement("span",null,"c"),l.default.createElement("span",null,"t"))," ","apps")))},o=n.default=a},59409:function(p,n,e){"use strict";var r=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=r(e(96540)),A=r(e(21958)),a=function(m){var C=m.text,i=/((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;return l.default.createElement(l.default.Fragment,null,C.split(i).map(function(c,_){var u=c.match(i);if(u){var s=u[0];return l.default.createElement("a",{key:_,className:A.default.squiggle,target:"_blank",href:s.startsWith("http")?s:"http://".concat(s)},s)}return c}))},o=n.default=a},76017:function(p,n,e){"use strict";var r=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=r(e(96540)),A=r(e(39726)),a=function(m){var C=m.avatar,i=m.text;return l.default.createElement("div",{className:A.default.avatarCard},l.default.createElement("div",{className:A.default.card},l.default.createElement("figure",null,l.default.createElement("img",{alt:"",src:C,className:A.default.avatar})),l.default.createElement("p",{className:A.default.content},i)))},o=n.default=a},12770:function(p,n,e){"use strict";var r=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=r(e(96540)),A=r(e(49511)),a=function(){return l.default.createElement(l.default.Fragment,null,l.default.createElement("section",{className:A.default.breatheItem},l.default.createElement("span",null,"Breathe")))},o=n.default=a},42916:function(p,n,e){"use strict";var r=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=r(e(43693)),A=r(e(96540));function a(C,i){var c=Object.keys(C);if(Object.getOwnPropertySymbols){var _=Object.getOwnPropertySymbols(C);i&&(_=_.filter(function(u){return Object.getOwnPropertyDescriptor(C,u).enumerable})),c.push.apply(c,_)}return c}function o(C){for(var i=1;i<arguments.length;i++){var c=arguments[i]!=null?arguments[i]:{};i%2?a(Object(c),!0).forEach(function(_){(0,l.default)(C,_,c[_])}):Object.getOwnPropertyDescriptors?Object.defineProperties(C,Object.getOwnPropertyDescriptors(c)):a(Object(c)).forEach(function(_){Object.defineProperty(C,_,Object.getOwnPropertyDescriptor(c,_))})}return C}var g=function(i){var c=i.style,_=i.children;return A.default.createElement("div",{style:o({width:"100%",minHeight:"calc(100vh - 232px)"},c)},_)},m=n.default=g},18903:function(p,n,e){"use strict";var r=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=g(e(96540)),a=r(e(84576));function o(i){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(o=function(s){return s?_:c})(i)}function g(i,c){if(!c&&i&&i.__esModule)return i;if(i===null||l(i)!="object"&&typeof i!="function")return{default:i};var _=o(c);if(_&&_.has(i))return _.get(i);var u={__proto__:null},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var t in i)if(t!=="default"&&{}.hasOwnProperty.call(i,t)){var E=s?Object.getOwnPropertyDescriptor(i,t):null;E&&(E.get||E.set)?Object.defineProperty(u,t,E):u[t]=i[t]}return u.default=i,_&&_.set(i,u),u}var m=function(){var c=(0,A.useRef)(null);return(0,A.useLayoutEffect)(function(){var _=c.current,u=function(t){var E=t.target.getBoundingClientRect(),O=t.clientX-E.left,B=t.clientY-E.top;_.style.setProperty("--x",O+"px"),_.style.setProperty("--y",B+"px")};return _.addEventListener("mousemove",u),function(){_.removeEventListener("mousemove",u)}},[]),A.default.createElement("button",{className:a.default.gradientTracking,ref:c},A.default.createElement("span",null,"Hover me"))},C=n.default=m},52537:function(p,n,e){"use strict";var r=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=r(e(96540)),A=r(e(85120)),a=function(m){var C=m.text;return l.default.createElement("div",{className:A.default.isometricCard},l.default.createElement("p",null,C))},o=n.default=a},35317:function(p,n,e){"use strict";var r=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=r(e(94634)),A=r(e(85715)),a=r(e(91847)),o=r(e(96540)),g=r(e(61352)),m=["alt","src","className","loadInitially","observerOptions"],C=function(_){var u=_.alt,s=_.src,t=_.className,E=_.loadInitially,O=E===void 0?!1:E,B=_.observerOptions,h=B===void 0?{root:null,rootMargin:"200px 0px"}:B,v=(0,a.default)(_,m),b=o.default.useRef(null),M=o.default.useRef(null),W=o.default.useState(O),z=(0,A.default)(W,2),L=z[0],Z=z[1],x=o.default.useCallback(function(K){K[0].isIntersecting&&(b.current.disconnect(),Z(!0))},[b]);return o.default.useEffect(function(){if(!O){if("loading"in HTMLImageElement.prototype){Z(!0);return}return b.current=new IntersectionObserver(x,h),b.current.observe(M.current),function(){b.current.disconnect()}}},[]),o.default.createElement("figure",{className:g.default.hoverRotate},o.default.createElement("img",(0,l.default)({alt:u,src:L?s:"",ref:M,className:t,loading:O?void 0:"lazy"},v)),o.default.createElement("figcaption",null,o.default.createElement("h3",null,"Lorem ",o.default.createElement("br",null),"Ipsum")))},i=n.default=C},22807:function(p,n,e){"use strict";var r=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=r(e(96540)),A=r(e(89696)),a=function(m){var C=m.text;return l.default.createElement("span",{className:A.default.lineBordered},C)},o=n.default=a},84871:function(p,n,e){"use strict";var r=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=r(e(96540)),A=r(e(30152)),a=function(m){var C=m.children;return l.default.createElement("section",{className:A.default.linearWrap},l.default.createElement("span",{className:A.default.line}),l.default.createElement("span",{className:A.default.line}),l.default.createElement("span",{className:A.default.line}),l.default.createElement("span",{className:A.default.line}),l.default.createElement("section",null,C))},o=n.default=a},75747:function(p,n,e){"use strict";var r=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=r(e(96540)),A=r(e(89200)),a=function(m){return l.default.createElement("div",{style:{position:"relative",height:"100%"}},l.default.createElement("div",{className:A.default.background},"Mesh Gradient Background"))},o=n.default=a},81740:function(p,n,e){"use strict";var r=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=r(e(54756)),a=r(e(94634)),o=r(e(85715)),g=r(e(29293)),m=M(e(96540)),C=e(8768),i=r(e(43160)),c=r(e(41512)),_=r(e(54152)),u=r(e(63940)),s=r(e(37948)),t=r(e(73410)),E=r(e(51687)),O=r(e(22802)),B=e(81591),h=r(e(65548));e(35819);var v=r(e(49887));function b(x){if(typeof WeakMap!="function")return null;var K=new WeakMap,U=new WeakMap;return(b=function(Y){return Y?U:K})(x)}function M(x,K){if(!K&&x&&x.__esModule)return x;if(x===null||l(x)!="object"&&typeof x!="function")return{default:x};var U=b(K);if(U&&U.has(x))return U.get(x);var P={__proto__:null},Y=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var w in x)if(w!=="default"&&{}.hasOwnProperty.call(x,w)){var k=Y?Object.getOwnPropertyDescriptor(x,w):null;k&&(k.get||k.set)?Object.defineProperty(P,w,k):P[w]=x[w]}return P.default=x,U&&U.set(x,P),P}var W=function(){var x=(0,g.default)(A.default.mark(function K(U){var P,Y;return A.default.wrap(function(k){for(;;)switch(k.prev=k.next){case 0:if(k.prev=0,!((P=navigator)!==null&&P!==void 0&&(P=P.clipboard)!==null&&P!==void 0&&P.writeText)){k.next=5;break}return k.next=4,navigator.clipboard.writeText(U);case 4:C.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F");case 5:k.next=16;break;case 7:k.prev=7,k.t0=k.catch(0),Y=document.createElement("textarea"),Y.value=U,document.body.appendChild(Y),Y.focus(),Y.select();try{document.execCommand("copy"),C.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F")}catch(J){C.message.success("\u590D\u5236\u5230\u526A\u8D34\u677F\u5931\u8D25")}document.body.removeChild(Y);case 16:case"end":return k.stop()}},K,null,[[0,7]])}));return function(U){return x.apply(this,arguments)}}(),z=function(K){var U,P=(0,m.useRef)(null),Y=(U=P.current)===null||U===void 0?void 0:U.innerText,w=(0,m.useRef)(""),k=(0,B.useDebouncedCallback)(function(){if(P.current){var J=P.current.querySelector("code"),S=J.className,H=/language-(\w+)/.exec(S||"");if(H){var X=(0,o.default)(H,2),N=X[1];w.current=N}}},800);return(0,m.useEffect)(function(){setTimeout(k,1)},[Y]),m.default.createElement("section",null,m.default.createElement("section",{className:v.default.copySection},m.default.createElement("span",{className:v.default.lang},w.current),m.default.createElement("span",{className:v.default.copySpan,onClick:function(){if(P.current){var S=P.current.innerText;W(S)}}},"\u590D\u5236\u4EE3\u7801")),m.default.createElement("pre",{className:v.default.preCode,ref:P},K.children))},L=function(K){var U=K.markdownText,P=U===void 0?"":U,Y=K.isLoading,w=Y===void 0?!1:Y;return m.default.createElement("section",{className:v.default.markdownBody},w&&!P&&m.default.createElement(i.default,{component:h.default,style:{color:"#fff"},className:v.default.loadingIcon}),P&&m.default.createElement(c.default,{remarkPlugins:[_.default,t.default,u.default],rehypePlugins:[s.default,O.default,[E.default,{detect:!1,ignoreMissing:!0}]],components:{pre:z,p:function(J){return m.default.createElement("p",(0,a.default)({},J,{dir:"auto"}))},a:function(J){var S,H=J.href||"",X=/^\/#/i.test(H),N=X?"_self":(S=J.target)!==null&&S!==void 0?S:"_blank";return m.default.createElement("a",(0,a.default)({},J,{target:N}))}}},P))},Z=n.default=L},63023:function(p,n,e){"use strict";var r=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=r(e(96540)),A=e(23947),a=function(m){var C=m.children;return l.default.createElement(A.motion.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{ease:"linear",duration:1,y:{duration:.5}}},C)},o=n.default=a},3102:function(p,n,e){"use strict";var r=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=g(e(96540)),a=r(e(91193));function o(i){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(o=function(s){return s?_:c})(i)}function g(i,c){if(!c&&i&&i.__esModule)return i;if(i===null||l(i)!="object"&&typeof i!="function")return{default:i};var _=o(c);if(_&&_.has(i))return _.get(i);var u={__proto__:null},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var t in i)if(t!=="default"&&{}.hasOwnProperty.call(i,t)){var E=s?Object.getOwnPropertyDescriptor(i,t):null;E&&(E.get||E.set)?Object.defineProperty(u,t,E):u[t]=i[t]}return u.default=i,_&&_.set(i,u),u}var m=function(){var c=(0,A.useRef)(null);return(0,A.useLayoutEffect)(function(){var _=c.current,u=_.getBoundingClientRect(),s=u.x,t=u.y,E=u.width,O=E===void 0?240:E,B=u.height,h=B===void 0?360:B,v=s+(O||240)/2,b=t+(h||360)/2,M=function(L){var Z=L.pageX,x=L.pageY,K=(v-Z)/((O||240)/2),U=(b-x)/((h||360)/2);_.style.setProperty("--dx",K),_.style.setProperty("--dy",U)},W=function(){_.style.setProperty("--dx",0),_.style.setProperty("--dy",0)};return _.addEventListener("mousemove",M),_.addEventListener("mouseleave",W),function(){_.removeEventListener("mousemove",M),_.removeEventListener("mouseleave",W)}},[]),A.default.createElement("div",{ref:c,className:a.default.shiftingCard},A.default.createElement("h3",null,"Shifting Card"))},C=n.default=m},58843:function(p,n,e){"use strict";var r=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=r(e(85715)),A=r(e(96540)),a=r(e(57812)),o=function(i){var c=i.marked,_=i.starId;return A.default.createElement("span",{"data-star-id":_,className:a.default.star,role:"button"},c?"\u2605":"\u2606")},g=function(i){var c=i.value,_=A.default.useState(parseInt(c)||0),u=(0,l.default)(_,2),s=u[0],t=u[1],E=A.default.useState(0),O=(0,l.default)(E,2),B=O[0],h=O[1],v=function(M){var W=0;M&&M.target&&M.target.getAttribute("data-star-id")&&(W=M.target.getAttribute("data-star-id")),h(W)};return A.default.createElement("div",{onMouseOut:function(){return v(null)},onClick:function(M){return t(M.target.getAttribute("data-star-id")||s)},onMouseOver:v},Array.from({length:5},function(b,M){return A.default.createElement(o,{starId:M+1,key:"star_".concat(M+1),marked:B?B>=M+1:s>=M+1})}),A.default.createElement("span",null,s))},m=n.default=g},59593:function(p,n,e){"use strict";var r=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=r(e(85715)),a=g(e(96540));function o(i){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(o=function(s){return s?_:c})(i)}function g(i,c){if(!c&&i&&i.__esModule)return i;if(i===null||l(i)!="object"&&typeof i!="function")return{default:i};var _=o(c);if(_&&_.has(i))return _.get(i);var u={__proto__:null},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var t in i)if(t!=="default"&&{}.hasOwnProperty.call(i,t)){var E=s?Object.getOwnPropertyDescriptor(i,t):null;E&&(E.get||E.set)?Object.defineProperty(u,t,E):u[t]=i[t]}return u.default=i,_&&_.set(i,u),u}var m=function(c){var _=c.children,u=c.delay,s=u===void 0?110:u,t=(0,a.useState)(0),E=(0,A.default)(t,2),O=E[0],B=E[1],h=setInterval(function(){return B(function(v){return v+1})},s);return(0,a.useEffect)(function(){O===_.length&&clearInterval(h)},[_,h,O]),(0,a.useEffect)(function(){return function(){return clearInterval(h)}},[h]),a.default.createElement(a.default.Fragment,null,_.substring(0,O))},C=n.default=(0,a.memo)(m)},76526:function(p,n,e){"use strict";var r=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=r(e(85715)),a=w(e(96540)),o=e(8768),g=e(43160),m=e(69739),C=e(69893),i=r(e(42916)),c=r(e(59593)),_=r(e(81740)),u=r(e(84871)),s=r(e(81286)),t=r(e(59409)),E=r(e(35317)),O=r(e(58843)),B=r(e(52537)),h=r(e(76017)),v=r(e(22807)),b=r(e(18903)),M=r(e(3102)),W=r(e(12770)),z=r(e(63023)),L=r(e(44322)),Z=r(e(53795)),x=r(e(85666)),K=r(e(75747)),U=e(31819),P=r(e(47443));function Y(S){if(typeof WeakMap!="function")return null;var H=new WeakMap,X=new WeakMap;return(Y=function($){return $?X:H})(S)}function w(S,H){if(!H&&S&&S.__esModule)return S;if(S===null||l(S)!="object"&&typeof S!="function")return{default:S};var X=Y(H);if(X&&X.has(S))return X.get(S);var N={__proto__:null},$=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var Q in S)if(Q!=="default"&&{}.hasOwnProperty.call(S,Q)){var ne=$?Object.getOwnPropertyDescriptor(S,Q):null;ne&&(ne.get||ne.set)?Object.defineProperty(N,Q,ne):N[Q]=S[Q]}return N.default=S,X&&X.set(S,N),N}var k=function(){var H=(0,a.useState)(""),X=(0,A.default)(H,2),N=X[0],$=X[1],Q=(0,a.useRef)(null),ne=(0,a.useState)(!1),Ae=(0,A.default)(ne,2),oe=Ae[0],te=Ae[1],ve=(0,a.useState)(""),_e=(0,A.default)(ve,2),ye=_e[0],he=_e[1],ue=(0,a.useRef)(null),De=(0,a.useState)(function(){return""}),ce=(0,A.default)(De,2),me=ce[0],be=ce[1],Oe=(0,a.useState)(""),ie=(0,A.default)(Oe,2),se=ie[0],Me=ie[1],Pe=(0,a.useRef)(null),xe=function(R){be(R.target.value)},Ie=function(R){Me(R.target.value)},Ee=function(R){R.metaKey&&R.key==="Enter"&&(D(),R.preventDefault())},Te=(0,a.useState)(["","","","","","",""]),y=(0,A.default)(Te,2),d=y[0],f=y[1],D=function(){if(se.trim()!==""){var R=new AbortController;ue.current=R,T(se,me,R)}},I=function(){ue.current.abort(),te(!1)},T=function(R,F,q){Q.current="",$(Q.current);var V=q.signal;te(!0),(0,U.oneApiChat)([{content:R,role:"user"}],F,V).then(function(ee){var G=ee.headers.get("content-type");if(!ee.ok||!(G!=null&&G.startsWith("text/event-stream"))||ee.status!==200){if(G!=null&&G.startsWith("text/html")||G!=null&&G.startsWith("text/plain")){var Se=ee.clone().text();Se.then(function(le){$(le)})}else if(G!=null&&G.startsWith("application/json")){var Ue=ee.clone().json();Ue.then(function(le){$((0,U.prettyObject)(le))})}else $(ee.statusText);te(!1)}else{var fe,Le=ee==null||(fe=ee.body)===null||fe===void 0?void 0:fe.getReader(),Ce=`

`,ae="",je="",Re=function(){Le.read().then(function(ge){var Ke=ge.done,ke=ge.value;if(Ke){te(!1);return}for(ae+=new TextDecoder().decode(ke);ae.includes(Ce);){var We=ae.indexOf(Ce),ze=ae.slice(0,We),de=ze.split("data: ");for(var pe in de)if(de[pe]!==""&&de[pe]!=="[DONE]")try{var Be,re,Ye=JSON.parse(de[pe]),Fe=(Be=(re=Ye.choices[0])===null||re===void 0||(re=re.delta)===null||re===void 0?void 0:re.content)!==null&&Be!==void 0?Be:"";je+=Fe,he(new Date().toLocaleString()),Q.current=je,$(Q.current)}catch(we){}ae=ae.slice(We+Ce.length)}Re()}).catch(function(ge){})};Re()}}).catch(function(ee){te(!1),$(ee.message)})};return a.default.createElement(i.default,null,a.default.createElement("h2",{style:{marginBottom:15}},a.default.createElement(c.default,null,"Cool! Hi, React & Ant Design!")),a.default.createElement("h2",{className:P.default.avatar},"React version: ",a.version),a.default.createElement("section",null,"I love coding in ",a.default.createElement(s.default,{alternateText:["javascript","typescript","rect","vue"]}),"."),a.default.createElement("section",{style:{marginBottom:40}},a.default.createElement(t.default,{text:"foo bar baz http://example.org bar https://github.com/wkylin/pro-react-admin"})),a.default.createElement("section",null,a.default.createElement(h.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."})),a.default.createElement("section",null,a.default.createElement(B.default,{text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?"})),a.default.createElement(O.default,{value:2}),a.default.createElement(v.default,{text:"A line bordered text."}),a.default.createElement("section",{style:{display:"flex",alignItems:"center",marginTop:10,marginBottom:40}},a.default.createElement(m.Atom,null)," ",a.default.createElement(m.Merge,null)," ",a.default.createElement(m.GitMerge,null)," ",a.default.createElement(m.GitPullRequestArrow,null)),a.default.createElement("section",{style:{marginBottom:40}},a.default.createElement(z.default,null,a.default.createElement(E.default,{src:"https://picsum.photos/seed/picsum/300/160",alt:"Strawberries"}))),a.default.createElement("section",null,a.default.createElement(b.default,null)),a.default.createElement("section",{style:{margin:40}},a.default.createElement(W.default,null)),a.default.createElement("section",{style:{marginBottom:40}},a.default.createElement(M.default,null)),a.default.createElement("section",{style:{marginBottom:40}},a.default.createElement(C.PinInput,{onChange:function(R,F,q){return f(q)},values:d})),a.default.createElement("section",{style:{marginBottom:40}},a.default.createElement(L.default.FadeIn,null,a.default.createElement(h.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."}))),a.default.createElement("section",{style:{marginBottom:40}},a.default.createElement(L.default.FadeUp,null,a.default.createElement("img",{src:"https://picsum.photos/360/200.jpg",alt:""}))),a.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},a.default.createElement(L.default.ScaleIn,null,a.default.createElement(a.default.Fragment,null,a.default.createElement("img",{src:"https://picsum.photos/360/200/?blur=2",alt:""}),a.default.createElement("section",{className:P.default["blend-me"]},"Mix Blend Mode")))),a.default.createElement("section",{style:{marginBottom:40,height:200,width:360,overflow:"hidden"}},a.default.createElement(K.default,null)),a.default.createElement("section",{style:{marginBottom:40}},a.default.createElement(Z.default,null,"Click Me")),a.default.createElement("section",{style:{marginBottom:40},className:P.default.maskBox},a.default.createElement("section",{className:P.default.watermark},"water mark"),"mask"),a.default.createElement("section",{style:{marginBottom:40}},a.default.createElement("button",{className:P.default.button},a.default.createElement("span",{className:P.default["button-label"]},"Click Me"))),a.default.createElement("section",{style:{position:"relative",margin:"80px 0 160px 50px"}},a.default.createElement("div",{className:P.default["circle-1"]}),a.default.createElement("div",{className:P.default["circle-2"]}),a.default.createElement("div",{className:P.default["circle-3"]}),a.default.createElement("div",{className:P.default["circle-4"]})),a.default.createElement("section",{style:{width:600,margin:"30px 0"}},a.default.createElement(o.Input,{defaultValue:me,placeholder:"api key",onChange:xe,style:{marginBottom:20}}),a.default.createElement(o.Flex,{align:"center"},a.default.createElement(u.default,null,a.default.createElement(o.Input.TextArea,{ref:Pe,defaultValue:se,placeholder:"\u6765\uFF0C\u8BF4\u70B9\u4EC0\u4E48\u5457...Meta + Enter\u53D1\u9001",onChange:Ie,onKeyDown:Ee,autoSize:!0,style:{width:300,height:30,caretColor:"#ff0000"}})),a.default.createElement(o.Button,{style:{margin:"0 10px"},icon:a.default.createElement(g.SendOutlined,{rotate:-60}),type:"primary",disabled:oe,onClick:D},"\u53D1\u9001"),a.default.createElement(o.Button,{icon:a.default.createElement(g.SendOutlined,{rotate:-60}),type:"primary",disabled:!oe,onClick:I},"\u505C\u6B62"))),a.default.createElement("section",null,oe&&a.default.createElement("div",null,"\u6B63\u5728\u8F93\u5165..."),a.default.createElement("section",{style:{textAlign:"right",color:"#666"}},ye),a.default.createElement(_.default,{markdownText:N,isLoading:oe})),a.default.createElement("section",{style:{position:"relative",height:300}},a.default.createElement(x.default,null,a.default.createElement("p",null," wave "))))},J=n.default=k},31819:function(p,n,e){"use strict";var r=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.trimTopic=n.toFixedBug=n.toFixed=n.toCamelCase=n.sleep=n.shuffleArr=n.saveHtmlToPng=n.reqStringify=n.readFromFile=n.randomString=n.randomNum=n.randomItem=n.randomHex=n.randomColor=n.random=n.promiseWithTimeout=n.prettyObject=n.pause=n.passwordStrength=n.oneApiChat=n.limitDecimal=n.isURLSearchParams=n.isObject=n.isNotEmpty=n.isEqual=n.isEmptyArray=n.isDecimal=n.isDate=n.isDarkMode=n.isArray=n.hidePhone=n.hasFocus=n.getType=n.getRandomId=n.getParamObject=n.getImgsUrl=n.getFileType=n.getEnv=n.getCurrentDate=n.fetchSomething=n.exportJsonData=n.exportFile=n.dayDif=n.customizeTimer=n.copyTextToClipboard=n.clearCookies=n.checkIsLocalPage=n.capitalize=n.camelizeCamelCase=n.asyncTo=n.asyncAction=n.ThousandNum=n.RoundNum=n.RandomId=void 0;var l=r(e(54756)),A=r(e(29293)),a=r(e(41132)),o=r(e(73738)),g=e(55373),m=r(e(20354)),C=n.getEnv=function(){var d;return typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]"&&(d="NODE"),typeof XMLHttpRequest!="undefined"&&(d="BROWSER"),d},i=n.isArray=function(d){return(0,o.default)(d)==="object"&&Object.prototype.toString.call(d)==="[object Array]"},c=n.isURLSearchParams=function(d){return typeof URLSearchParams!="undefined"&&d instanceof URLSearchParams},_=n.isDate=function(d){return(0,o.default)(d)==="object"&&Object.prototype.toString.call(d)==="[object Date]"},u=n.isObject=function(d){return d!==null&&(0,o.default)(d)==="object"},s=n.getParamObject=function(d){return c(d)?(0,g.parse)(d.toString(),{strictNullHandling:!0}):typeof d=="string"?[d]:d},t=n.reqStringify=function(d){return(0,g.stringify)(d,{arrayFormat:"repeat",strictNullHandling:!0})},E=n.getType=function(d){var f=(0,o.default)(d);return f!=="object"?f:Object.prototype.toString.call(d).replace(/^$/,"$1")},O=n.hidePhone=function(d){return d==null?void 0:d.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")},B=n.asyncAction=function(d){var f=Promise.resolve(d);return function(D){f.then(function(){return setTimeout(function(){return D()})})}},h=n.getImgsUrl=function(d){var f=/<img.*?(?:>|\/>)/gi,D=/src=['"]?([^'"]*)['"]?/i,I=d.match(f);if(!I)return null;var T=I.reduce(function(j,R){var F=R.match(D);return F[1]?[].concat((0,a.default)(j),[F[1]]):j},[]);return T},v=n.customizeTimer={intervalTimer:null,timeoutTimer:null,setTimeout:function(d,f){var D=this,I=Date.now,T=I(),j=T,R=function(){D.timeoutTimer=requestAnimationFrame(R),j=I(),j-T>=f&&(d(),cancelAnimationFrame(D.timeoutTimer))};return this.timeoutTimer=requestAnimationFrame(R),this.timeoutTimer},clearTimeout:function(){cancelAnimationFrame(this.timeoutTimer)},setInterval:function(d,f){var D=this,I=Date.now,T=I(),j=T,R=function(){D.intervalTimer=requestAnimationFrame(R),j=I(),j-T>=f&&(T=I(),j=T,d())};return this.intervalTimer=requestAnimationFrame(R),this.intervalTimer},clearInterval:function(){cancelAnimationFrame(this.intervalTimer)}},b=n.isDecimal=function(d){var f=/(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/;return f.test(d)},M=n.limitDecimal=function(d){return d.replace(/^(-)*(\d+)\.(\d\d).*$/,"$1$2.$3")},W=n.passwordStrength=function(d){var f=/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;return f.test(d)},z=n.checkIsLocalPage=function(){document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")return!1;if(document.visibilityState==="visible")return!0;window.addEventListener("pagehide",function(d){d.persisted},!1)})},L=n.randomHex=function(){return"#".concat(Math.floor(Math.random()*16777215).toString(16).padEnd(6,"0"))},Z=n.clearCookies=document.cookie.split(";").forEach(function(y){return document.cookie=y.replace(/^ +/,"").replace(/[=].*/,"=;expires=".concat(new Date(0).toUTCString(),";path=/"))}),x=n.dayDif=function(d,f){return Math.ceil(Math.abs(d.getTime()-f.getTime())/864e5)},K=n.capitalize=function(d){return d.charAt(0).toUpperCase()+d.slice(1)},U=n.isNotEmpty=function(d){return Array.isArray(d)&&d.length>0},P=n.isDarkMode=window.matchMedia("(prefers-color-scheme: dark)").matches,Y=n.fetchSomething=function(){return new Promise(function(d){setTimeout(function(){d("")},1e3)})},w=n.toFixed=function(d,f){if(typeof d!="number")throw new Error("number\u4E0D\u662F\u6570\u5B57");var D=Math.round(Math.pow(10,f)*d)/Math.pow(10,f);if(D=String(D),D.indexOf(".")===-1)f!==0&&(D+=".",D+=new Array(f+1).join("0"));else{var I=D.split(".");I[1].length<f&&(I[1]+=new Array(f-I[1].length+1).join("0")),D=I.join(".")}return D},k=n.toFixedBug=function(d,f){return~~(Math.pow(10,f)*d)/Math.pow(10,f)},J=n.promiseWithTimeout=function(d,f){var D=new Promise(function(I){return setTimeout(function(){return I("Time Out!")},f)});return Promise.race([D,d])},S=n.shuffleArr=function(d){return d.sort(function(){return .5-Math.random()})},H=n.sleep=function(d){return new Promise(function(f){return setTimeout(function(){return f()},d)})},X=n.ThousandNum=function(d){return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},N=n.RandomId=function(d){return Math.random().toString(36).substring(3,d)},$=n.RoundNum=function(d,f){return Math.round(d*Math.pow(10,f))/Math.pow(10,f)},Q=n.randomNum=function(d,f){return Math.floor(Math.random()*(f-d+1))+d},ne=n.isEmptyArray=function(d){return Array.isArray(d)&&!d.length},Ae=n.randomItem=function(d){return d[Math.floor(Math.random()*d.length)]},oe=n.asyncTo=function(d){return d.then(function(f){return[null,f]}).catch(function(f){return[f]})},te=n.hasFocus=function(d){return d===document.activeElement},ve=n.isEqual=function(d,f){return JSON.stringify(d)===JSON.stringify(f)},_e=n.randomString=function(){return Math.random().toString(36).slice(2)},ye=n.toCamelCase=function(d){return d.trim().replace(/[-_\s]+(.)?/g,function(f,D){return D?D.toUpperCase():""})},he=n.random=function(d,f){return Math.floor(Math.random()*(f-d+1)+d)},ue=n.randomColor=function(){return"#".concat(Math.random().toString(16).slice(2,8).padEnd(6,"0"))},De=n.pause=function(d){return new Promise(function(f){return setTimeout(f,d)})},ce=n.camelizeCamelCase=function(d){return d.replace(/(?:^\w|[A-Z]|\b\w)/g,function(f,D){return D===0?f.toLowerCase():f.toUpperCase()}).replace(/\s+/g,"")},me=n.copyTextToClipboard=function(){var y=(0,A.default)(l.default.mark(function d(f){var D;return l.default.wrap(function(T){for(;;)switch(T.prev=T.next){case 0:if(T.prev=0,!((D=navigator)!==null&&D!==void 0&&(D=D.clipboard)!==null&&D!==void 0&&D.writeText)){T.next=4;break}return T.next=4,navigator.clipboard.writeText(f);case 4:T.next=8;break;case 6:T.prev=6,T.t0=T.catch(0);case 8:case"end":return T.stop()}},d,null,[[0,6]])}));return function(f){return y.apply(this,arguments)}}(),be=n.getRandomId=function(){for(var d="",f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",D=0;D<32;D++)d+=f.charAt(Math.floor(Math.random()*f.length));return d},Oe=n.oneApiChat=function(d,f,D){return fetch("https://api.openai.com/v1/chat/completions",{method:"POST",signal:D,headers:{Authorization:f,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:d,stream:!0})})},ie=n.getCurrentDate=function(){var d=new Date,f=d.getDate(),D=d.getMonth()+1,I=d.getFullYear();return"".concat(I,"-").concat(D,"-").concat(f)},se=n.exportJsonData=function(d){var f=ie(),D=JSON.stringify(JSON.parse(d),null,2),I=new Blob([D],{type:"application/json"}),T=URL.createObjectURL(I),j=document.createElement("a");j.href=T,j.download="chat-store_".concat(f,".json"),document.body.appendChild(j),j.click(),document.body.removeChild(j)},Me=n.saveHtmlToPng=function(){var y=(0,A.default)(l.default.mark(function d(f,D,I){var T,j,R,F;return l.default.wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return V.prev=0,T=f!=null?f:document.getElementById("image-wrapper"),V.next=4,(0,m.default)(T,{useCORS:!0});case 4:j=V.sent,R=j.toDataURL("image/png"),F=document.createElement("a"),F.style.display="none",F.href=R,F.setAttribute("download","chat-shot.png"),typeof F.download=="undefined"&&F.setAttribute("target","_blank"),document.body.appendChild(F),F.click(),document.body.removeChild(F),window.URL.revokeObjectURL(R),D&&D(),Promise.resolve(),V.next=22;break;case 19:V.prev=19,V.t0=V.catch(0),I&&I(V.t0.message);case 22:case"end":return V.stop()}},d,null,[[0,19]])}));return function(f,D,I){return y.apply(this,arguments)}}(),Pe=n.trimTopic=function(d){return d.replace(/[，。！？”“"、,.!?]*$/,"")},xe=n.readFromFile=function(){return new Promise(function(d,f){var D=document.createElement("input");D.type="file",D.accept="application/json",D.onchange=function(I){var T=I.target.files[0],j=new FileReader;j.onload=function(R){d(R.target.result)},j.onerror=function(R){return f(R)},j.readAsText(T)},D.click()})},Ie=n.prettyObject=function(d){var f="";return typeof d!="string"&&(f=JSON.stringify(d,null,"  ")),f==="{}"?f.toString():f.startsWith("```json")?f:["```json",f,"```"].join(`
`)},Ee=n.getFileType=function(d,f){var D=f.split(".").pop().toLowerCase();switch(D){case"txt":return"text/plain";case"json":return"application/json";case"doc":return"application/msword";case"docx":return"application/vnd.openxmlformats-officedocument.wordprocessingml.document";case"xls":return"application/vnd.ms-excel";case"xlsx":return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";case"ppt":return"application/vnd.ms-powerpoint";case"pptx":return"application/vnd.openxmlformats-officedocument.presentationml.presentation";case"pdf":return"application/pdf";case"jpg":case"jpeg":return"image/jpeg";case"png":return"image/png";case"gif":return"image/gif";case"zip":return"application/zip";case"rar":return"application/x-rar-compressed";default:if(typeof d=="string")try{return JSON.parse(d),"application/json"}catch(I){return"text/plain"}else return d instanceof Uint8Array||d instanceof ArrayBuffer,"application/octet-stream"}},Te=n.exportFile=function(d,f){var D;if((d==null||(D=d.headers["content-type"])===null||D===void 0?void 0:D.indexOf("application/json"))===-1){var I=d.headers&&d.headers["content-disposition"]||"attachment;filename=".concat(f||"file",".xlsx"),T=decodeURI(I==null?void 0:I.split("=")[1].replace(/'/g,"")).replace(/"/g,"").replace("utf-8''","")||"",j=Ee(d.data,f||T),R=new Blob([d.data],{type:j}),F=URL.createObjectURL(R),q=document.createElement("a");document.body.appendChild(q),q.style="display: none",q.href=F,q.download=T,q.click(),document.body.removeChild(q)}}},25039:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(47122),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},48122:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(61543),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},57903:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(9666),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},21958:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(97669),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},39726:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(27825),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},49511:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(90958),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},84576:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(80711),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},85120:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(45789),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},61352:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(91869),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},89696:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(22211),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},30152:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(34671),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},89200:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(38791),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},49887:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(6988),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},91193:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(41742),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},57812:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(20335),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},47443:function(p,n,e){"use strict";e.r(n);var r=e(85072),l=e.n(r),A=e(97825),a=e.n(A),o=e(77659),g=e.n(o),m=e(55056),C=e.n(m),i=e(10540),c=e.n(i),_=e(41113),u=e.n(_),s=e(37318),t={};t.styleTagTransform=u(),t.setAttributes=C(),t.insert=g().bind(null,"head"),t.domAPI=a(),t.insertStyleElement=c();var E=l()(s.A,t);n.default=s.A&&s.A.locals?s.A.locals:void 0},82547:function(p){"use strict";p.exports="data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 4%27%3E%3Cstyle type=%27text/css%27%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX%280%29;}to {transform:translateX%28-15px%29;}}%3C/style%3E%3Cpath fill=%27none%27 stroke=%27%230087ca%27 stroke-width=%272%27 class=%27squiggle%27 d=%27M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3%27/%3E%3C/svg%3E"},42634:function(){}}]);

//# sourceMappingURL=267.e3a110555f9f2f0cc33c.js.map