(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[267],{65548:function(v,n,e){"use strict";var a=e(24994),i=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=a(e(43693)),t=E(e(96540)),o=e(74848);function C(A){if(typeof WeakMap!="function")return null;var s=new WeakMap,r=new WeakMap;return(C=function(O){return O?r:s})(A)}function E(A,s){if(!s&&A&&A.__esModule)return A;if(A===null||i(A)!="object"&&typeof A!="function")return{default:A};var r=C(s);if(r&&r.has(A))return r.get(A);var m={__proto__:null},O=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var x in A)if(x!=="default"&&{}.hasOwnProperty.call(A,x)){var B=O?Object.getOwnPropertyDescriptor(A,x):null;B&&(B.get||B.set)?Object.defineProperty(m,x,B):m[x]=A[x]}return m.default=A,r&&r.set(A,m),m}function g(A,s){var r=Object.keys(A);if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(A);s&&(m=m.filter(function(O){return Object.getOwnPropertyDescriptor(A,O).enumerable})),r.push.apply(r,m)}return r}function l(A){for(var s=1;s<arguments.length;s++){var r=arguments[s]!=null?arguments[s]:{};s%2?g(Object(r),!0).forEach(function(m){(0,d.default)(A,m,r[m])}):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach(function(m){Object.defineProperty(A,m,Object.getOwnPropertyDescriptor(r,m))})}return A}var c=function(s){return(0,o.jsxs)("svg",l(l({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"#fff",viewBox:"0 0 120 30"},s),{},{children:[(0,o.jsxs)("circle",{cx:15,cy:15,r:15,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]}),(0,o.jsxs)("circle",{cx:60,cy:15,r:9,fillOpacity:.3,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:9,repeatCount:"indefinite",to:9,values:"9;15;9"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:.5,repeatCount:"indefinite",to:.5,values:".5;1;.5"})]}),(0,o.jsxs)("circle",{cx:105,cy:15,r:15,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]})]}))},_=n.default=c},47122:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.alternating--mj1_d {
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
`],sourceRoot:""}]),o.locals={alternating:"alternating--mj1_d","alternating-text":"alternating-text--p6lWH",alternatingText:"alternating-text--p6lWH"},n.A=o},61543:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.btn--Vmubv {
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
`],sourceRoot:""}]),o.locals={btn:"btn--Vmubv",content:"content--jujDv","btn-ripple":"btn-ripple--w2aOn",btnRipple:"btn-ripple--w2aOn",ripple:"ripple--oIc_l","btn-ripple-container":"btn-ripple-container--II62b",btnRippleContainer:"btn-ripple-container--II62b"},n.A=o},9666:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.hIBkFg--xUSDY {
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
`],sourceRoot:""}]),o.locals={hIBkFg:"hIBkFg--xUSDY",kqOLaE:"kqOLaE--z4koa","bz-an":"bz-an--moL5G",bzAn:"bz-an--moL5G"},n.A=o},97669:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=e(4417),C=e.n(o),E=new URL(e(82547),e.b),g=t()(i()),l=C()(E);g.push([v.id,`a.squiggle--JQRWj {
  background-image: linear-gradient(to bottom, #0087ca 0%, #0087ca 100%);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 1px 1px;
  color: inherit;
  text-decoration: none;
}

a.squiggle--JQRWj:hover {
  background-image: url(`+l+`);
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
`],sourceRoot:""}]),g.locals={squiggle:"squiggle--JQRWj"},n.A=g},27825:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.avatarCard--kIii3 {
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
`],sourceRoot:""}]),o.locals={avatarCard:"avatarCard--kIii3",card:"card--W_bZq",content:"content--yiHmV"},n.A=o},90958:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.breatheItem--VaM9v {
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
`],sourceRoot:""}]),o.locals={breatheItem:"breatheItem--VaM9v",breathe:"breathe--wA3l6",loopRotate:"loopRotate--GRmod",loop:"loop--Q7Ru6",outside:"outside--NZwXf",inner:"inner--ZClIQ",text:"text--FGKfx","play-button":"play-button--Wg3em",playButton:"play-button--Wg3em","zoom-in-zoom-out":"zoom-in-zoom-out--alaL8",zoomInZoomOut:"zoom-in-zoom-out--alaL8","div-block":"div-block--OwsxA",divBlock:"div-block--OwsxA","div-block-1019":"div-block-1019--iYyTM",divBlock1019:"div-block-1019--iYyTM","div-block-1021":"div-block-1021--EWkRm",divBlock1021:"div-block-1021--EWkRm",code:"code--Wc_Yz",trans:"trans--jcajC"},n.A=o},80711:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.gradientTracking--FyamC {
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
`],sourceRoot:""}]),o.locals={gradientTracking:"gradientTracking--FyamC"},n.A=o},45789:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.isometricCard--mEKMm {
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
`],sourceRoot:""}]),o.locals={isometricCard:"isometricCard--mEKMm"},n.A=o},91869:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.hoverRotate--ew29g {
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
`],sourceRoot:""}]),o.locals={hoverRotate:"hoverRotate--ew29g"},n.A=o},22211:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.lineBordered--bh05r {
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
`],sourceRoot:""}]),o.locals={lineBordered:"lineBordered--bh05r","hover-underline-animation":"hover-underline-animation--TSfGP",hoverUnderlineAnimation:"hover-underline-animation--TSfGP",left:"left--ErwKf",center:"center--BFLFI",right:"right--DRVwU","dynamic-shadow":"dynamic-shadow--Us2nj",dynamicShadow:"dynamic-shadow--Us2nj","image-contain":"image-contain--Z_yfM",imageContain:"image-contain--Z_yfM","image-cover":"image-cover--ZVSiS",imageCover:"image-cover--ZVSiS",container:"container--lADY1",top:"top--XQMfF",bottom:"bottom--P1bZI","no-scrollbars":"no-scrollbars--AUOMQ",noScrollbars:"no-scrollbars--AUOMQ","engraved-text":"engraved-text--dMPwS",engravedText:"engraved-text--dMPwS","embossed-text":"embossed-text--eQZ0_",embossedText:"embossed-text--eQZ0_"},n.A=o},38791:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.background--V0AeH {
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
`],sourceRoot:""}]),o.locals={background:"background--V0AeH","move-background":"move-background--h74DC",moveBackground:"move-background--h74DC"},n.A=o},6988:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.markdownBody--xUrgB {\r
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
`],sourceRoot:""}]),o.locals={markdownBody:"markdownBody--xUrgB",loadingIcon:"loadingIcon--VpAmv",copySection:"copySection--aJHtb",lang:"lang--SO0lS",copySpan:"copySpan--u4qzC",preCode:"preCode--s6faO"},n.A=o},41742:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`/* Perspective card */
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
`],sourceRoot:""}]),o.locals={"perspective-card":"perspective-card--fRasE",perspectiveCard:"perspective-card--fRasE",shiftingCard:"shiftingCard--ejZ4B",cardAnimation:"cardAnimation--uMV0q"},n.A=o},10332:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.slider--ajYIu {\r
  overflow: hidden;\r
  width: 100%;\r
  position: relative;\r
}\r
\r
.content--N5Qp6 {\r
  display: flex;\r
  white-space: nowrap;\r
  animation: 90s linear 0s infinite normal none running slide-right--r20ZV;\r
}\r
\r
@keyframes slide-left--kCbHU {\r
  0% {\r
    transform: translate(0);\r
  }\r
\r
  50% {\r
    transform: translate(-100%);\r
  }\r
  100% {\r
    transform: translate(0);\r
  }\r
}\r
@keyframes slide-right--r20ZV {\r
  0% {\r
    transform: translate(0);\r
  }\r
\r
  50% {\r
    transform: translate(100%);\r
  }\r
  100% {\r
    transform: translate(0);\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/SlideLinear/index.module.less"],names:[],mappings:"AAAA;EACE,gBAAgB;EAChB,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,wEAAiE;AACnE;;AAEA;EACE;IACE,uBAAuB;EACzB;;EAEA;IACE,2BAA2B;EAC7B;EACA;IACE,uBAAuB;EACzB;AACF;AACA;EACE;IACE,uBAAuB;EACzB;;EAEA;IACE,0BAA0B;EAC5B;EACA;IACE,uBAAuB;EACzB;AACF",sourcesContent:[`.slider {\r
  overflow: hidden;\r
  width: 100%;\r
  position: relative;\r
}\r
\r
.content {\r
  display: flex;\r
  white-space: nowrap;\r
  animation: 90s linear 0s infinite normal none running slide-right;\r
}\r
\r
@keyframes slide-left {\r
  0% {\r
    transform: translate(0);\r
  }\r
\r
  50% {\r
    transform: translate(-100%);\r
  }\r
  100% {\r
    transform: translate(0);\r
  }\r
}\r
@keyframes slide-right {\r
  0% {\r
    transform: translate(0);\r
  }\r
\r
  50% {\r
    transform: translate(100%);\r
  }\r
  100% {\r
    transform: translate(0);\r
  }\r
}\r
`],sourceRoot:""}]),o.locals={slider:"slider--ajYIu",content:"content--N5Qp6","slide-right":"slide-right--r20ZV",slideRight:"slide-right--r20ZV","slide-left":"slide-left--kCbHU",slideLeft:"slide-left--kCbHU"},n.A=o},20335:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.star--H6zRP {
  color: #f93;
  cursor: pointer;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/StarRating/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,eAAe;AACjB",sourcesContent:[`.star {
  color: #f93;
  cursor: pointer;
}
`],sourceRoot:""}]),o.locals={star:"star--H6zRP"},n.A=o},97331:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.mask--LIqkO{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top:0;
  z-index: 10;
  background-image: linear-gradient(270deg, hsl(0, 0%, 100%) 0, hsl(0, 0%, 100%) 5%, rgba(17, 23, 41, 0) 49.8%, hsl(0, 0%, 100%) 95%, hsl(0, 0%, 100%) 100%)
}
`,"",{version:3,sources:["webpack://./src/components/stateless/TagCloud/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,OAAO;EACP,KAAK;EACL,WAAW;EACX;AACF",sourcesContent:[`.mask{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top:0;
  z-index: 10;
  background-image: linear-gradient(270deg, hsl(0, 0%, 100%) 0, hsl(0, 0%, 100%) 5%, rgba(17, 23, 41, 0) 49.8%, hsl(0, 0%, 100%) 95%, hsl(0, 0%, 100%) 100%)
}
`],sourceRoot:""}]),o.locals={mask:"mask--LIqkO"},n.A=o},38413:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.typedCursorBlink--bnrB1 {
  opacity: 1;
  animation: typed-blink--GZUvL 0.7s infinite;
}

@keyframes typed-blink--GZUvL {
  50% {
    opacity: 0;
  }
}
`,"",{version:3,sources:["webpack://./src/components/stateless/TypedText/index.module.less"],names:[],mappings:"AAAA;EACE,UAAU;EACV,2CAAoC;AACtC;;AAEA;EACE;IACE,UAAU;EACZ;AACF",sourcesContent:[`.typedCursorBlink {
  opacity: 1;
  animation: typed-blink 0.7s infinite;
}

@keyframes typed-blink {
  50% {
    opacity: 0;
  }
}
`],sourceRoot:""}]),o.locals={typedCursorBlink:"typedCursorBlink--bnrB1","typed-blink":"typed-blink--GZUvL",typedBlink:"typed-blink--GZUvL"},n.A=o},37318:function(v,n,e){"use strict";var a=e(71354),i=e.n(a),d=e(76314),t=e.n(d),o=t()(i());o.push([v.id,`.avatar--tAk6h {\r
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
  padding: 0px 1.8rem;\r
  text-align: center;\r
  text-decoration: none;\r
  white-space: nowrap;\r
  position: relative;\r
  z-index: 0;\r
  color: rgb(255, 255, 255);\r
  border-color: transparent;\r
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
        rgb(255, 0, 0),\r
        rgb(255, 115, 0),\r
        rgb(255, 251, 0),\r
        rgb(72, 255, 0),\r
        rgb(0, 255, 213),\r
        rgb(0, 43, 255),\r
        rgb(122, 0, 255),\r
        rgb(255, 0, 200),\r
        rgb(255, 0, 0)\r
      )\r
      0% 0% / 400%;\r
    animation: 20s linear 0s infinite normal none running dv-wu--sf_Ta;\r
    transition: opacity 0.3s ease-in-out;\r
  }\r
  &::after {\r
    z-index: -1;\r
    content: '';\r
    position: absolute;\r
    width: 100%;\r
    height: 100%;\r
    background: rgb(17, 17, 17);\r
    left: 0px;\r
    top: 0px;\r
  }\r
}\r
@keyframes dv-wu--sf_Ta {\r
  0% {\r
    background-position: 0px 0px;\r
  }\r
  50% {\r
    background-position: 400% 0px;\r
  }\r
  100% {\r
    background-position: 0px 0px;\r
  }\r
}\r
\r
.stages--wh47k {\r
  position: relative;\r
  height: 74px;\r
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
      backface-visibility: hidden;\r
      -webkit-backface-visibility: hidden;\r
    }\r
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
  0%,\r
  to {\r
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
  to {\r
    transform: rotateX(1turn);\r
  }\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz {\r
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);\r
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
.video-box--RWlhc .video-btn--PPzlz:after,\r
.video-box--RWlhc .video-btn--PPzlz:before {\r
  content: '';\r
  display: block;\r
  position: absolute;\r
  top: 0;\r
  right: 0;\r
  z-index: -1;\r
  bottom: 0;\r
  left: 0;\r
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
.video-box--RWlhc .video-btn--PPzlz:before {\r
  animation: ripple--Ojifa 2s linear infinite;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz:after {\r
  animation: ripple--Ojifa 2s linear 1s infinite;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz:focus,\r
.video-box--RWlhc .video-btn--PPzlz:hover {\r
  background-color: #2d995d;\r
  color: #fff;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz:focus:after,\r
.video-box--RWlhc .video-btn--PPzlz:focus:before,\r
.video-box--RWlhc .video-btn--PPzlz:hover:after,\r
.video-box--RWlhc .video-btn--PPzlz:hover:before {\r
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
  to {\r
    transform: scale(2);\r
    opacity: 0;\r
  }\r
}\r
\r
@keyframes effect-1--LXEum {\r
  0% {\r
    text-shadow: 0px 0px #32a8a2;\r
  }\r
  40% {\r
    text-shadow: 2px 2px 5px #32a8a2;\r
  }\r
  100% {\r
    text-shadow: 0px 0px #32a8a2;\r
  }\r
}\r
\r
.effect--mKRM4 {\r
  animation: effect-1--LXEum 1s linear infinite;\r
  color: white;\r
  font-size: 48px;\r
}\r
`,"",{version:3,sources:["webpack://./src/pages/home/index.module.less"],names:[],mappings:"AAAA;EACE,uDAAgD;AAClD;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,wBAAwB;EAC1B;AACF;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,oBAAoB;EACpB,kBAAkB;EAClB,iBAAiB;EACjB,WAAW;EACX,eAAe;EACf,kBAAkB;EAClB,mFAA2E;UAA3E,2EAA2E;AAC7E;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,WAAW;EACX,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,qDAAqD;EACrD,wDAAiD;AACnD;;AAEA;EACE;IACE,2BAA2B;EAC7B;AACF;;AAEA;EACE,uBAAuB;EACvB,oBAAoB;EACpB;oEACkE;EAClE,wCAAwC;EACxC,6BAA6B;EAC7B,6BAA6B;EAC7B,sBAAsB;AACxB;;AAEA;EACE,kFAAkF;EAClF,6BAAqB;UAArB,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,kDAA2C;EAC3C,6BAA6B;EAC7B,mBAAmB;EACnB,yCAAyC;EACzC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,qBAAqB;EACrB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,mBAAmB;EACnB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,qBAAqB;EACrB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,qBAAqB;EACvB;;EAEA;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE;IACE,UAAU;IACV,mBAAmB;EACrB;;EAEA;IACE,UAAU;IACV,qBAAqB;EACvB;;EAEA;IACE,UAAU;IACV,uBAAuB;EACzB;AACF;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,oFAAoF;AACtF;;AAEA;EACE,eAAe;EACf,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,mBAAmB;EACnB,kBAAkB;EAClB,qBAAqB;EACrB,mBAAmB;EACnB,kBAAkB;EAClB,UAAU;EACV,yBAAyB;EACzB,yBAAyB;EACzB;IACE,WAAW;IACX,kBAAkB;IAClB,SAAS;IACT,UAAU;IACV,WAAW;IACX,iBAAiB;IACjB,uBAAuB;IACvB,wBAAwB;IACxB,wBAAwB;IACxB,6BAA6B;IAC7B,2BAA2B;IAC3B,UAAU;IACV;;;;;;;;;;;;kBAYc;IACd,kEAA2D;IAC3D,oCAAoC;EACtC;EACA;IACE,WAAW;IACX,WAAW;IACX,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,2BAA2B;IAC3B,SAAS;IACT,QAAQ;EACV;AACF;AACA;EACE;IACE,4BAA4B;EAC9B;EACA;IACE,6BAA6B;EAC/B;EACA;IACE,4BAA4B;EAC9B;AACF;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ;IACE,cAAc;IACd,gCAAyB;IACzB,sCAAsC;IACtC,mCAAmC;IACnC,sBAAsB;IACtB,4BAA4B;IAC5B,6BAA6B;IAC7B,kBAAkB;IAClB,eAAe;;IAEf;MACE,kBAAkB;MAClB,WAAW;MACX,2BAA2B;MAC3B,mCAAmC;IACrC;IACA;MACE,2BAA2B;IAC7B;;IAEA;MACE,2CAA2C;IAC7C;;IAEA;MACE,2CAA2C;IAC7C;EACF;AACF;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;IACE,wBAAwB;EAC1B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,yCAAyC;EACzC,kBAAkB;EAClB,qBAAqB;EACrB,2BAA2B;EAC3B,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,yBAAyB;EACzB,kBAAkB;EAClB,WAAW;EACX,eAAe;EACf,UAAU;EACV,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;;EAEE,WAAW;EACX,cAAc;EACd,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,WAAW;EACX,SAAS;EACT,OAAO;EACP,kBAAkB;EAClB,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,UAAU;EACV,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,2CAAoC;AACtC;;AAEA;EACE,8CAAuC;AACzC;;AAEA;;EAEE,yBAAyB;EACzB,WAAW;AACb;;AAEA;;;;EAIE,qBAAqB;AACvB;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,sBAAsB;IACtB,UAAU;EACZ;;EAEA;IACE,mBAAmB;IACnB,UAAU;EACZ;AACF;;AAEA;EACE;IACE,4BAA4B;EAC9B;EACA;IACE,gCAAgC;EAClC;EACA;IACE,4BAA4B;EAC9B;AACF;;AAEA;EACE,6CAAsC;EACtC,YAAY;EACZ,eAAe;AACjB",sourcesContent:[`.avatar {\r
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
  padding: 0px 1.8rem;\r
  text-align: center;\r
  text-decoration: none;\r
  white-space: nowrap;\r
  position: relative;\r
  z-index: 0;\r
  color: rgb(255, 255, 255);\r
  border-color: transparent;\r
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
        rgb(255, 0, 0),\r
        rgb(255, 115, 0),\r
        rgb(255, 251, 0),\r
        rgb(72, 255, 0),\r
        rgb(0, 255, 213),\r
        rgb(0, 43, 255),\r
        rgb(122, 0, 255),\r
        rgb(255, 0, 200),\r
        rgb(255, 0, 0)\r
      )\r
      0% 0% / 400%;\r
    animation: 20s linear 0s infinite normal none running dv-wu;\r
    transition: opacity 0.3s ease-in-out;\r
  }\r
  &::after {\r
    z-index: -1;\r
    content: '';\r
    position: absolute;\r
    width: 100%;\r
    height: 100%;\r
    background: rgb(17, 17, 17);\r
    left: 0px;\r
    top: 0px;\r
  }\r
}\r
@keyframes dv-wu {\r
  0% {\r
    background-position: 0px 0px;\r
  }\r
  50% {\r
    background-position: 400% 0px;\r
  }\r
  100% {\r
    background-position: 0px 0px;\r
  }\r
}\r
\r
.stages {\r
  position: relative;\r
  height: 74px;\r
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
      -webkit-backface-visibility: hidden;\r
    }\r
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
  0%,\r
  to {\r
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
  to {\r
    transform: rotateX(1turn);\r
  }\r
}\r
\r
.video-box .video-btn {\r
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);\r
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
.video-box .video-btn:after,\r
.video-box .video-btn:before {\r
  content: '';\r
  display: block;\r
  position: absolute;\r
  top: 0;\r
  right: 0;\r
  z-index: -1;\r
  bottom: 0;\r
  left: 0;\r
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
.video-box .video-btn:before {\r
  animation: ripple 2s linear infinite;\r
}\r
\r
.video-box .video-btn:after {\r
  animation: ripple 2s linear 1s infinite;\r
}\r
\r
.video-box .video-btn:focus,\r
.video-box .video-btn:hover {\r
  background-color: #2d995d;\r
  color: #fff;\r
}\r
\r
.video-box .video-btn:focus:after,\r
.video-box .video-btn:focus:before,\r
.video-box .video-btn:hover:after,\r
.video-box .video-btn:hover:before {\r
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
  to {\r
    transform: scale(2);\r
    opacity: 0;\r
  }\r
}\r
\r
@keyframes effect-1 {\r
  0% {\r
    text-shadow: 0px 0px #32a8a2;\r
  }\r
  40% {\r
    text-shadow: 2px 2px 5px #32a8a2;\r
  }\r
  100% {\r
    text-shadow: 0px 0px #32a8a2;\r
  }\r
}\r
\r
.effect {\r
  animation: effect-1 1s linear infinite;\r
  color: white;\r
  font-size: 48px;\r
}\r
`],sourceRoot:""}]),o.locals={avatar:"avatar--tAk6h",levitate:"levitate--RZCwS",maskBox:"maskBox--uAYjJ",watermark:"watermark--YUolT","blend-me":"blend-me--f5L11",blendMe:"blend-me--f5L11","move-me":"move-me--FUPwc",moveMe:"move-me--FUPwc",button:"button--GgsIa","button-label":"button-label--d_jxl",buttonLabel:"button-label--d_jxl","circle-1":"circle-1--kJj6k",circle1:"circle-1--kJj6k",expand:"expand--kmoUS","circle-2":"circle-2--YMeVl",circle2:"circle-2--YMeVl","expand-opacity":"expand-opacity--XzitQ",expandOpacity:"expand-opacity--XzitQ","circle-3":"circle-3--DvCUJ",circle3:"circle-3--DvCUJ","circle-4":"circle-4--UkUyn",circle4:"circle-4--UkUyn",line:"line--Lp5NS",eHElAY:"eHElAY--ul0hZ",eHElAy:"eHElAY--ul0hZ","dv-wu":"dv-wu--sf_Ta",dvWu:"dv-wu--sf_Ta",stages:"stages--wh47k","spin-cube":"spin-cube--eXtsy",spinCube:"spin-cube--eXtsy",cubeSpinner:"cubeSpinner--eOJc0",face1:"face1--KIPp1",face2:"face2--aYKpi",face3:"face3--M7CTV","video-box":"video-box--RWlhc",videoBox:"video-box--RWlhc","video-btn":"video-btn--PPzlz",videoBtn:"video-btn--PPzlz",ripple:"ripple--Ojifa",effect:"effect--mKRM4","effect-1":"effect-1--LXEum",effect1:"effect-1--LXEum"},n.A=o},68733:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e(96540),d=a(e(66824)),t=function(){var E=(0,d.default)();return React.createElement("div",{className:"mx-auto grid max-w-sm items-start gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3",ref:E},React.createElement("div",{className:"relative rounded-xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"},React.createElement("div",{style:{height:140}},"\u6211\u7684\u4E2D\u56FD\u5FC3")),React.createElement("div",{className:"relative rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"},React.createElement("div",{style:{height:80}},"\u6211\u7684\u4E2D\u56FD\u5FC3")),React.createElement("div",{className:"relative rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"},React.createElement("div",{style:{height:150}},"\u6211\u7684\u4E2D\u56FD\u5FC3")),React.createElement("div",{className:"relative rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"},React.createElement("div",{style:{height:120}},"\u6211\u7684\u4E2D\u56FD\u5FC3")),React.createElement("div",{className:"relative rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"},React.createElement("div",{style:{height:130}},"\u6211\u7684\u4E2D\u56FD\u5FC3")),React.createElement("div",{className:"relative rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"},React.createElement("div",{style:{height:50}},"\u6211\u7684\u4E2D\u56FD\u5FC3")))},o=n.default=t},66824:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(85715)),d=e(96540),t=function(){var E=(0,d.useRef)(null),g=(0,d.useState)([]),l=(0,i.default)(g,2),c=l[0],_=l[1];(0,d.useEffect)(function(){if(E.current){var m=Array.from(E.current.children);_(m)}},[]),(0,d.useEffect)(function(){var m=function(){if(!(!c||c.length<1)){var x=0;E.current&&(x=parseInt(window.getComputedStyle(E.current).getPropertyValue("grid-row-gap"))),c.forEach(function(B){if(B instanceof HTMLElement)for(var f=B.previousSibling;f;){if(f.nodeType===1&&(B.style.marginTop="0",f instanceof HTMLElement&&A(f)===A(B))){B.style.marginTop=-(s(B)-r(f)-x)+"px";break}f=f.previousSibling}})}};return m(),window.addEventListener("resize",m),function(){window.removeEventListener("resize",m)}},[c]);var A=function(O){return O.getBoundingClientRect().left},s=function(O){return O.getBoundingClientRect().top+window.scrollY},r=function(O){return O.getBoundingClientRect().bottom+window.scrollY};return E},o=n.default=t},5977:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(19936)),d=n.default=i.default},19936:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=t;var i=a(e(85715)),d=e(96540);function t(){var o=(0,d.useState)(0),C=(0,i.default)(o,2),E=C[0],g=C[1],l=(0,d.useState)(0),c=(0,i.default)(l,2),_=c[0],A=c[1];return(0,d.useEffect)(function(){var s=function(){window.addEventListener("mousemove",function(m){g(m.clientX),A(m.clientY)})};return window.addEventListener("mousemove",s),function(){window.removeEventListener("mousemove",s)}},[]),{x:E,y:_}}},81286:function(v,n,e){"use strict";var a=e(24994),i=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=C(e(96540)),t=a(e(25039));function o(l){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(o=function(s){return s?_:c})(l)}function C(l,c){if(!c&&l&&l.__esModule)return l;if(l===null||i(l)!="object"&&typeof l!="function")return{default:l};var _=o(c);if(_&&_.has(l))return _.get(l);var A={__proto__:null},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in l)if(r!=="default"&&{}.hasOwnProperty.call(l,r)){var m=s?Object.getOwnPropertyDescriptor(l,r):null;m&&(m.get||m.set)?Object.defineProperty(A,r,m):A[r]=l[r]}return A.default=l,_&&_.set(l,A),A}var E=function(c){var _=c.alternateText,A=_===void 0?[]:_;return(0,d.useEffect)(function(){var s=document.getElementById("alternating-text"),r=0,m=function(x){r=r<A.length-1?r+1:0,s.innerHTML=A[r]};return s.innerHTML=A[0],s.addEventListener("animationiteration",m,!1),function(){s.removeEventListener("animationiteration",m,!1)}},[]),d.default.createElement("span",{className:t.default.alternating,id:"alternating-text"},A[0]||"Text goes here")},g=n.default=E},44322:function(v,n,e){"use strict";var a=e(24994),i=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=a(e(43693)),t=a(e(85715)),o=E(e(96540));function C(B){if(typeof WeakMap!="function")return null;var f=new WeakMap,y=new WeakMap;return(C=function(M){return M?y:f})(B)}function E(B,f){if(!f&&B&&B.__esModule)return B;if(B===null||i(B)!="object"&&typeof B!="function")return{default:B};var y=C(f);if(y&&y.has(B))return y.get(B);var h={__proto__:null},M=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var j in B)if(j!=="default"&&{}.hasOwnProperty.call(B,j)){var I=M?Object.getOwnPropertyDescriptor(B,j):null;I&&(I.get||I.set)?Object.defineProperty(h,j,I):h[j]=B[j]}return h.default=B,y&&y.set(B,h),h}function g(B,f){var y=Object.keys(B);if(Object.getOwnPropertySymbols){var h=Object.getOwnPropertySymbols(B);f&&(h=h.filter(function(M){return Object.getOwnPropertyDescriptor(B,M).enumerable})),y.push.apply(y,h)}return y}function l(B){for(var f=1;f<arguments.length;f++){var y=arguments[f]!=null?arguments[f]:{};f%2?g(Object(y),!0).forEach(function(h){(0,d.default)(B,h,y[h])}):Object.getOwnPropertyDescriptors?Object.defineProperties(B,Object.getOwnPropertyDescriptors(y)):g(Object(y)).forEach(function(h){Object.defineProperty(B,h,Object.getOwnPropertyDescriptor(y,h))})}return B}var c=function(f){var y=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"0px",h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,M=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1,j=(0,o.useState)(!0),I=(0,t.default)(j,2),k=I[0],P=I[1],U=(0,o.useRef)(null);return(0,o.useEffect)(function(){return U.current=new IntersectionObserver(function(T){var W=(0,t.default)(T,1),z=W[0];z.isIntersecting&&z.intersectionRatio>=h?(P(!0),M&&U.current.disconnect()):P(!1)},{rootMargin:y,threshold:h}),f.current&&U.current.observe(f.current),function(){f.current&&U.current.unobserve(f.current)}},[f,y,h,M]),k},_=function(f){var y=f.from,h=f.to,M=f.rootMargin,j=f.threshold,I=f.triggerOnce,k=f.children,P=(0,o.useRef)(null),U=c(P,M,j,I),T={transition:"1000ms ease-in-out"};return o.default.createElement("div",{ref:P,style:U?l(l({},T),h):l(l({},T),y)},k)},A=function(f){var y=f.rootMargin,h=y===void 0?"0px":y,M=f.threshold,j=M===void 0?0:M,I=f.triggerOnce,k=I===void 0?!1:I,P=f.children;return o.default.createElement(_,{from:{opacity:0},to:{opacity:1},rootMargin:h,threshold:j,triggerOnce:k},P)},s=function(f){var y=f.rootMargin,h=y===void 0?"0px":y,M=f.threshold,j=M===void 0?0:M,I=f.triggerOnce,k=I===void 0?!1:I,P=f.children;return o.default.createElement(_,{from:{opacity:0,translate:"0 2rem"},to:{opacity:1,translate:"none"},rootMargin:h,threshold:j,triggerOnce:k},P)},r=function(f){var y=f.rootMargin,h=y===void 0?"0px":y,M=f.threshold,j=M===void 0?0:M,I=f.triggerOnce,k=I===void 0?!1:I,P=f.children;return o.default.createElement(_,{from:{scale:"0"},to:{scale:"1"},rootMargin:h,threshold:j,triggerOnce:k},P)},m=function(f){var y=f.from,h=f.to,M=f.rootMargin,j=M===void 0?"0px":M,I=f.threshold,k=I===void 0?0:I,P=f.triggerOnce,U=P===void 0?!1:P,T=f.children;return o.default.createElement(_,{from:y,to:h,rootMargin:j,threshold:k,triggerOnce:U},T)},O={FadeIn:A,FadeUp:s,ScaleIn:r,DiyAnimation:m},x=n.default=O},53795:function(v,n,e){"use strict";var a=e(24994),i=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=a(e(94634)),t=a(e(91847)),o=a(e(85715)),C=c(e(96540)),E=a(e(48122)),g=["children","onClick"];function l(r){if(typeof WeakMap!="function")return null;var m=new WeakMap,O=new WeakMap;return(l=function(B){return B?O:m})(r)}function c(r,m){if(!m&&r&&r.__esModule)return r;if(r===null||i(r)!="object"&&typeof r!="function")return{default:r};var O=l(m);if(O&&O.has(r))return O.get(r);var x={__proto__:null},B=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var f in r)if(f!=="default"&&{}.hasOwnProperty.call(r,f)){var y=B?Object.getOwnPropertyDescriptor(r,f):null;y&&(y.get||y.set)?Object.defineProperty(x,f,y):x[f]=r[f]}return x.default=r,O&&O.set(r,x),x}var _=function(){var m=C.default.useState({x:-1,y:-1}),O=(0,o.default)(m,2),x=O[0],B=x.x,f=x.y,y=O[1],h=B!==-1&&f!==-1,M=function(I){var k=I.currentTarget.getBoundingClientRect(),P=k.left,U=k.top;y({x:I.clientX-P,y:I.clientY-U}),setTimeout(function(){y({x:-1,y:-1})},300)};return{x:B,y:f,handleRippleOnClick:M,isRippling:h}},A=function(m){var O=m.children,x=m.onClick,B=(0,t.default)(m,g),f=_(),y=f.x,h=f.y,M=f.handleRippleOnClick,j=f.isRippling,I=function(P){M(P),x&&x(P)};return C.default.createElement("button",(0,d.default)({type:"button",onClick:I,className:E.default.btn},B),C.default.createElement("span",{className:E.default.content},O),j&&C.default.createElement("div",{className:E.default["btn-ripple-container"]},C.default.createElement("span",{className:E.default["btn-ripple"],style:{left:y,top:h}})))},s=n.default=A},85666:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(96540)),d=a(e(57903)),t=function(E){var g=E.children;return i.default.createElement(i.default.Fragment,null,i.default.createElement("section",{className:d.default.hIBkFg},i.default.createElement("h2",null,"Design and code"," ",i.default.createElement("span",{className:d.default.kqOLaE},i.default.createElement("span",null,"R"),i.default.createElement("span",null,"e"),i.default.createElement("span",null,"a"),i.default.createElement("span",null,"c"),i.default.createElement("span",null,"t"))," ","apps")))},o=n.default=t},59409:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(96540)),d=a(e(21958)),t=function(E){var g=E.text,l=/((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;return i.default.createElement(i.default.Fragment,null,g.split(l).map(function(c,_){var A=c.match(l);if(A){var s=A[0];return i.default.createElement("a",{key:_,className:d.default.squiggle,target:"_blank",href:s.startsWith("http")?s:"http://".concat(s)},s)}return c}))},o=n.default=t},76017:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(96540)),d=a(e(39726)),t=function(E){var g=E.avatar,l=E.text;return i.default.createElement("div",{className:d.default.avatarCard},i.default.createElement("div",{className:d.default.card},i.default.createElement("figure",null,i.default.createElement("img",{alt:"",src:g,className:d.default.avatar})),i.default.createElement("p",{className:d.default.content},l)))},o=n.default=t},12770:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(96540)),d=a(e(49511)),t=function(){return i.default.createElement(i.default.Fragment,null,i.default.createElement("section",{className:d.default.breatheItem},i.default.createElement("span",null,"Breathe")))},o=n.default=t},42916:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(43693)),d=a(e(96540));function t(g,l){var c=Object.keys(g);if(Object.getOwnPropertySymbols){var _=Object.getOwnPropertySymbols(g);l&&(_=_.filter(function(A){return Object.getOwnPropertyDescriptor(g,A).enumerable})),c.push.apply(c,_)}return c}function o(g){for(var l=1;l<arguments.length;l++){var c=arguments[l]!=null?arguments[l]:{};l%2?t(Object(c),!0).forEach(function(_){(0,i.default)(g,_,c[_])}):Object.getOwnPropertyDescriptors?Object.defineProperties(g,Object.getOwnPropertyDescriptors(c)):t(Object(c)).forEach(function(_){Object.defineProperty(g,_,Object.getOwnPropertyDescriptor(c,_))})}return g}var C=function(l){var c=l.style,_=l.children;return d.default.createElement("div",{style:o({width:"100%",minHeight:"calc(100vh - 232px)"},c)},_)},E=n.default=C},18903:function(v,n,e){"use strict";var a=e(24994),i=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=C(e(96540)),t=a(e(84576));function o(l){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(o=function(s){return s?_:c})(l)}function C(l,c){if(!c&&l&&l.__esModule)return l;if(l===null||i(l)!="object"&&typeof l!="function")return{default:l};var _=o(c);if(_&&_.has(l))return _.get(l);var A={__proto__:null},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in l)if(r!=="default"&&{}.hasOwnProperty.call(l,r)){var m=s?Object.getOwnPropertyDescriptor(l,r):null;m&&(m.get||m.set)?Object.defineProperty(A,r,m):A[r]=l[r]}return A.default=l,_&&_.set(l,A),A}var E=function(){var c=(0,d.useRef)(null);return(0,d.useLayoutEffect)(function(){var _=c.current,A=function(r){var m=r.target.getBoundingClientRect(),O=r.clientX-m.left,x=r.clientY-m.top;_.style.setProperty("--x",O+"px"),_.style.setProperty("--y",x+"px")};return _.addEventListener("mousemove",A),function(){_.removeEventListener("mousemove",A)}},[]),d.default.createElement("button",{className:t.default.gradientTracking,ref:c},d.default.createElement("span",null,"Hover me"))},g=n.default=E},52537:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(96540)),d=a(e(85120)),t=function(E){var g=E.text;return i.default.createElement("div",{className:d.default.isometricCard},i.default.createElement("p",null,g))},o=n.default=t},35317:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(94634)),d=a(e(85715)),t=a(e(91847)),o=a(e(96540)),C=a(e(61352)),E=["alt","src","className","loadInitially","observerOptions"],g=function(_){var A=_.alt,s=_.src,r=_.className,m=_.loadInitially,O=m===void 0?!1:m,x=_.observerOptions,B=x===void 0?{root:null,rootMargin:"200px 0px"}:x,f=(0,t.default)(_,E),y=o.default.useRef(null),h=o.default.useRef(null),M=o.default.useState(O),j=(0,d.default)(M,2),I=j[0],k=j[1],P=o.default.useCallback(function(U){U[0].isIntersecting&&(y.current.disconnect(),k(!0))},[y]);return o.default.useEffect(function(){if(!O){if("loading"in HTMLImageElement.prototype){k(!0);return}return y.current=new IntersectionObserver(P,B),y.current.observe(h.current),function(){y.current.disconnect()}}},[]),o.default.createElement("figure",{className:C.default.hoverRotate},o.default.createElement("img",(0,i.default)({alt:A,src:I?s:"",ref:h,className:r,loading:O?void 0:"lazy"},f)),o.default.createElement("figcaption",null,o.default.createElement("h3",null,"Lorem ",o.default.createElement("br",null),"Ipsum")))},l=n.default=g},22807:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(96540)),d=a(e(89696)),t=function(E){var g=E.text;return i.default.createElement("span",{className:d.default.lineBordered},g)},o=n.default=t},75747:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(96540)),d=a(e(89200)),t=function(E){return i.default.createElement("div",{style:{position:"relative",height:"100%"}},i.default.createElement("div",{className:d.default.background},"Mesh Gradient Background"))},o=n.default=t},81740:function(v,n,e){"use strict";var a=e(24994),i=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=a(e(54756)),t=a(e(94634)),o=a(e(85715)),C=a(e(29293)),E=h(e(96540)),g=e(55290),l=a(e(43160)),c=a(e(41512)),_=a(e(54152)),A=a(e(63940)),s=a(e(37948)),r=a(e(73410)),m=a(e(51498)),O=a(e(22802)),x=e(81591),B=a(e(65548));e(35819);var f=a(e(49887));function y(P){if(typeof WeakMap!="function")return null;var U=new WeakMap,T=new WeakMap;return(y=function(z){return z?T:U})(P)}function h(P,U){if(!U&&P&&P.__esModule)return P;if(P===null||i(P)!="object"&&typeof P!="function")return{default:P};var T=y(U);if(T&&T.has(P))return T.get(P);var W={__proto__:null},z=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var w in P)if(w!=="default"&&{}.hasOwnProperty.call(P,w)){var F=z?Object.getOwnPropertyDescriptor(P,w):null;F&&(F.get||F.set)?Object.defineProperty(W,w,F):W[w]=P[w]}return W.default=P,T&&T.set(P,W),W}var M=function(){var P=(0,C.default)(d.default.mark(function U(T){var W,z;return d.default.wrap(function(F){for(;;)switch(F.prev=F.next){case 0:if(F.prev=0,!((W=navigator)!==null&&W!==void 0&&(W=W.clipboard)!==null&&W!==void 0&&W.writeText)){F.next=5;break}return F.next=4,navigator.clipboard.writeText(T);case 4:g.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F");case 5:F.next=16;break;case 7:F.prev=7,F.t0=F.catch(0),z=document.createElement("textarea"),z.value=T,document.body.appendChild(z),z.focus(),z.select();try{document.execCommand("copy"),g.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F")}catch(Z){g.message.success("\u590D\u5236\u5230\u526A\u8D34\u677F\u5931\u8D25")}document.body.removeChild(z);case 16:case"end":return F.stop()}},U,null,[[0,7]])}));return function(T){return P.apply(this,arguments)}}(),j=function(U){var T,W=(0,E.useRef)(null),z=(T=W.current)===null||T===void 0?void 0:T.innerText,w=(0,E.useRef)(""),F=(0,x.useDebouncedCallback)(function(){if(W.current){var Z=W.current.querySelector("code"),L=Z.className,te=/language-(\w+)/.exec(L||"");if(te){var oe=(0,o.default)(te,2),ie=oe[1];w.current=ie}}},800);return(0,E.useEffect)(function(){setTimeout(F,1)},[z]),E.default.createElement("section",null,E.default.createElement("section",{className:f.default.copySection},E.default.createElement("span",{className:f.default.lang},w.current),E.default.createElement("span",{className:f.default.copySpan,role:"button",onClick:function(){if(W.current){var L=W.current.innerText;M(L)}}},"\u590D\u5236\u4EE3\u7801")),E.default.createElement("pre",{className:f.default.preCode,ref:W},U.children))},I=function(U){var T=U.markdownText,W=T===void 0?"":T,z=U.isLoading,w=z===void 0?!1:z;return E.default.createElement("section",{className:f.default.markdownBody},w&&!W&&E.default.createElement(l.default,{component:B.default,style:{color:"#fff"},className:f.default.loadingIcon}),W&&E.default.createElement(c.default,{remarkPlugins:[_.default,r.default,A.default],rehypePlugins:[s.default,O.default,[m.default,{detect:!1,ignoreMissing:!0}]],components:{pre:j,p:function(Z){return E.default.createElement("p",(0,t.default)({},Z,{dir:"auto"}))},a:function(Z){var L,te=Z.href||"",oe=/^\/#/i.test(te),ie=oe?"_self":(L=Z.target)!==null&&L!==void 0?L:"_blank";return E.default.createElement("a",(0,t.default)({},Z,{target:ie}))}}},W))},k=n.default=I},63023:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(96540)),d=e(23947),t=function(E){var g=E.children;return i.default.createElement(d.motion.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{ease:"linear",duration:1,y:{duration:.5}}},g)},o=n.default=t},3102:function(v,n,e){"use strict";var a=e(24994),i=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=C(e(96540)),t=a(e(91193));function o(l){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(o=function(s){return s?_:c})(l)}function C(l,c){if(!c&&l&&l.__esModule)return l;if(l===null||i(l)!="object"&&typeof l!="function")return{default:l};var _=o(c);if(_&&_.has(l))return _.get(l);var A={__proto__:null},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in l)if(r!=="default"&&{}.hasOwnProperty.call(l,r)){var m=s?Object.getOwnPropertyDescriptor(l,r):null;m&&(m.get||m.set)?Object.defineProperty(A,r,m):A[r]=l[r]}return A.default=l,_&&_.set(l,A),A}var E=function(){var c=(0,d.useRef)(null);return(0,d.useLayoutEffect)(function(){var _=c.current,A=_.getBoundingClientRect(),s=A.x,r=A.y,m=A.width,O=m===void 0?240:m,x=A.height,B=x===void 0?360:x,f=s+(O||240)/2,y=r+(B||360)/2,h=function(I){var k=I.pageX,P=I.pageY,U=(f-k)/((O||240)/2),T=(y-P)/((B||360)/2);_.style.setProperty("--dx",U),_.style.setProperty("--dy",T)},M=function(){_.style.setProperty("--dx",0),_.style.setProperty("--dy",0)};return _.addEventListener("mousemove",h),_.addEventListener("mouseleave",M),function(){_.removeEventListener("mousemove",h),_.removeEventListener("mouseleave",M)}},[]),d.default.createElement("div",{ref:c,className:t.default.shiftingCard},d.default.createElement("h3",null,"Shifting Card"))},g=n.default=E},89524:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(96540)),d=a(e(32141)),t=function(E){var g=E.children;return i.default.createElement("div",{className:d.default.slider},i.default.createElement("div",{className:d.default.content},g))},o=n.default=t},31456:function(v,n,e){"use strict";var a=e(24994),i=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=g;var d=a(e(85715)),t=E(e(96540)),o=a(e(5977));function C(l){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(C=function(s){return s?_:c})(l)}function E(l,c){if(!c&&l&&l.__esModule)return l;if(l===null||i(l)!="object"&&typeof l!="function")return{default:l};var _=C(c);if(_&&_.has(l))return _.get(l);var A={__proto__:null},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in l)if(r!=="default"&&{}.hasOwnProperty.call(l,r)){var m=s?Object.getOwnPropertyDescriptor(l,r):null;m&&(m.get||m.set)?Object.defineProperty(A,r,m):A[r]=l[r]}return A.default=l,_&&_.set(l,A),A}function g(l){var c=l.children,_=l.className,A=_===void 0?"":_,s=(0,t.useRef)(null),r=(0,o.default)(),m=(0,t.useRef)({x:0,y:0}),O=(0,t.useRef)({w:0,h:0}),x=(0,t.useState)([]),B=(0,d.default)(x,2),f=B[0],y=B[1];(0,t.useEffect)(function(){s.current&&y(Array.from(s.current.children).map(function(j){return j}))},[]),(0,t.useEffect)(function(){return h(),window.addEventListener("resize",h),function(){window.removeEventListener("resize",h)}},[f]),(0,t.useEffect)(function(){M()},[r]);var h=function(){s.current&&(O.current.w=s.current.offsetWidth,O.current.h=s.current.offsetHeight)},M=function(){if(s.current){var I=s.current.getBoundingClientRect(),k=O.current,P=k.w,U=k.h,T=r.x-I.left,W=r.y-I.top,z=T<P&&T>0&&W<U&&W>0;z&&(m.current.x=T,m.current.y=W,f.forEach(function(w){var F=-(w.getBoundingClientRect().left-I.left)+m.current.x,Z=-(w.getBoundingClientRect().top-I.top)+m.current.y;w.style.setProperty("--mouse-x","".concat(F,"px")),w.style.setProperty("--mouse-y","".concat(Z,"px"))}))}};return t.default.createElement("div",{className:A,ref:s},c)}},58843:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(85715)),d=a(e(96540)),t=a(e(57812)),o=function(l){var c=l.marked,_=l.starId;return d.default.createElement("span",{"data-star-id":_,className:t.default.star,role:"button"},c?"\u2605":"\u2606")},C=function(l){var c=l.value,_=d.default.useState(parseInt(c)||0),A=(0,i.default)(_,2),s=A[0],r=A[1],m=d.default.useState(0),O=(0,i.default)(m,2),x=O[0],B=O[1],f=function(h){var M,j=0;h!=null&&(M=h.target)!==null&&M!==void 0&&M.getAttribute("data-star-id")&&(j=h.target.getAttribute("data-star-id")),B(j)};return d.default.createElement("span",{onMouseOut:function(){return f(null)},onClick:function(h){return r(h.target.getAttribute("data-star-id")||s)},onMouseOver:f,role:"button",tabIndex:"0"},Array.from({length:5},function(y,h){return d.default.createElement(o,{starId:h+1,key:"star_".concat(h+1),marked:x?x>=h+1:s>=h+1})}),d.default.createElement("span",null,s))},E=n.default=C},3783:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e(96540)),d=a(e(95280)),t=function(){return i.default.createElement("div",{className:"relative flex flex-col items-center justify-center overflow-hidden"},i.default.createElement("div",{className:"not-prose my-5 w-full"},i.default.createElement("ul",{className:"flex w-full flex-wrap items-center justify-center gap-3"},i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"'use server'"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useOptimistic"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"React Server Components"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Concurrent Rendering"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useActionState"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Improved Hydration"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Form Actions"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Server Actions"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Suspense"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"'use client'"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useTransition"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"React Compiler"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Streaming"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useFormStatus"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"New React Hooks"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"use()"),i.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Automatic Memoization"))),i.default.createElement("div",{className:d.default.mask}))},o=n.default=t},59593:function(v,n,e){"use strict";var a=e(24994),i=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=a(e(85715)),t=E(e(96540)),o=a(e(1052));function C(c){if(typeof WeakMap!="function")return null;var _=new WeakMap,A=new WeakMap;return(C=function(r){return r?A:_})(c)}function E(c,_){if(!_&&c&&c.__esModule)return c;if(c===null||i(c)!="object"&&typeof c!="function")return{default:c};var A=C(_);if(A&&A.has(c))return A.get(c);var s={__proto__:null},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var m in c)if(m!=="default"&&{}.hasOwnProperty.call(c,m)){var O=r?Object.getOwnPropertyDescriptor(c,m):null;O&&(O.get||O.set)?Object.defineProperty(s,m,O):s[m]=c[m]}return s.default=c,A&&A.set(c,s),s}var g=function(_){var A=_.children,s=_.delay,r=s===void 0?110:s,m=(0,t.useState)(0),O=(0,d.default)(m,2),x=O[0],B=O[1],f=setInterval(function(){return B(function(y){return y+1})},r);return(0,t.useEffect)(function(){x===A.length&&clearInterval(f)},[A,f,x]),(0,t.useEffect)(function(){return function(){return clearInterval(f)}},[f]),t.default.createElement(t.default.Fragment,null,A.substring(0,x),t.default.createElement("span",{className:o.default.typedCursorBlink},"|"))},l=n.default=(0,t.memo)(g)},76526:function(v,n,e){"use strict";var a=e(24994),i=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=a(e(85715)),t=oe(e(96540)),o=e(55290),C=e(43160),E=e(96619),g=a(e(64856)),l=e(69893),c=a(e(31456)),_=a(e(8242)),A=a(e(42916)),s=a(e(59593)),r=a(e(81740)),m=a(e(81286)),O=a(e(59409)),x=a(e(35317)),B=a(e(58843)),f=a(e(52537)),y=a(e(76017)),h=a(e(22807)),M=a(e(18903)),j=a(e(3102)),I=a(e(12770)),k=a(e(63023)),P=a(e(44322)),U=a(e(53795)),T=a(e(85666)),W=a(e(75747)),z=a(e(3783)),w=a(e(89524)),F=a(e(68733)),Z=e(31819),L=a(e(47443));function te(Y){if(typeof WeakMap!="function")return null;var re=new WeakMap,$=new WeakMap;return(te=function(J){return J?$:re})(Y)}function oe(Y,re){if(!re&&Y&&Y.__esModule)return Y;if(Y===null||i(Y)!="object"&&typeof Y!="function")return{default:Y};var $=te(re);if($&&$.has(Y))return $.get(Y);var ee={__proto__:null},J=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var H in Y)if(H!=="default"&&{}.hasOwnProperty.call(Y,H)){var ae=J?Object.getOwnPropertyDescriptor(Y,H):null;ae&&(ae.get||ae.set)?Object.defineProperty(ee,H,ae):ee[H]=Y[H]}return ee.default=Y,$&&$.set(Y,ee),ee}var ie=function(){var re=(0,t.useState)(""),$=(0,d.default)(re,2),ee=$[0],J=$[1],H=(0,t.useRef)(null),ae=(0,t.useState)(!1),Ee=(0,d.default)(ae,2),_e=Ee[0],se=Ee[1],xe=(0,t.useState)(""),fe=(0,d.default)(xe,2),Me=fe[0],Ie=fe[1],ge=(0,t.useRef)(null),Ce=(0,t.useState)(function(){return""}),ve=(0,d.default)(Ce,2),pe=ve[0],je=ve[1],Te=(0,t.useState)(""),Be=(0,d.default)(Te,2),ue=Be[0],Re=Be[1],b=(0,t.useRef)(null),u=function(Q){je(Q.target.value)},p=function(Q){Re(Q.target.value)},D=function(Q){Q.metaKey&&Q.key==="Enter"&&(N(),Q.preventDefault())},R=(0,t.useState)(["","","","","","",""]),S=(0,d.default)(R,2),K=S[0],X=S[1],N=function(){if(ue.trim()!==""){var Q=new AbortController;ge.current=Q,V(ue,pe,Q)}},ne=function(){ge.current.abort(),se(!1)},V=function(Q,We,ye){H.current="",J(H.current);var Ke=ye.signal;se(!0),(0,Z.oneApiChat)([{content:Q,role:"user"}],We,Ke).then(function(q){var G=q.headers.get("content-type");if(!q.ok||!(G!=null&&G.startsWith("text/event-stream"))||q.status!==200){if(G!=null&&G.startsWith("text/html")||G!=null&&G.startsWith("text/plain")){var ze=q.clone().text();ze.then(function(ce){J(ce)})}else if(G!=null&&G.startsWith("application/json")){var Fe=q.clone().json();Fe.then(function(ce){J((0,Z.prettyObject)(ce))})}else J(q.statusText);se(!1)}else{var he,we=q==null||(he=q.body)===null||he===void 0?void 0:he.getReader(),be=`

`,de="",Se="",Ue=function(){we.read().then(function(De){var Ye=De.done,Xe=De.value;if(Ye){se(!1);return}for(de+=new TextDecoder().decode(Xe);de.includes(be);){var Le=de.indexOf(be),Ne=de.slice(0,Le),me=Ne.split("data: ");for(var Oe in me)if(me[Oe]!==""&&me[Oe]!=="[DONE]")try{var Pe,Ae,Ze=JSON.parse(me[Oe]),Ve=(Pe=(Ae=Ze.choices[0])===null||Ae===void 0||(Ae=Ae.delta)===null||Ae===void 0?void 0:Ae.content)!==null&&Pe!==void 0?Pe:"";Se+=Ve,Ie(new Date().toLocaleString()),H.current=Se,J(H.current)}catch(Qe){}de=de.slice(Le+be.length)}Ue()}).catch(function(De){})};Ue()}}).catch(function(q){se(!1),J(q.message)})};return t.default.createElement(A.default,null,t.default.createElement("section",{style:{marginBottom:15}},t.default.createElement(s.default,null,"Cool! Hi, React & Ant Design!")),t.default.createElement("section",{className:L.default.avatar},"React version: ",t.version),t.default.createElement("section",null,"I love coding in ",t.default.createElement(m.default,{alternateText:["javascript","typescript","rect","vue"]}),"."),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(O.default,{text:"foo bar baz http://example.org bar https://github.com/wkylin/pro-react-admin"})),t.default.createElement("section",{className:L.default.line}),t.default.createElement("section",null,t.default.createElement(y.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."})),t.default.createElement("section",null,t.default.createElement(f.default,{text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?"})),t.default.createElement(B.default,{value:2}),t.default.createElement(h.default,{text:"A line bordered text."}),t.default.createElement("section",{style:{display:"flex",alignItems:"center",marginTop:10,marginBottom:40}},t.default.createElement(E.Atom,null)," ",t.default.createElement(E.Merge,null)," ",t.default.createElement(E.GitMerge,null)," ",t.default.createElement(E.GitPullRequestArrow,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(k.default,null,t.default.createElement(x.default,{src:"https://picsum.photos/seed/picsum/300/160",alt:"Strawberries"}))),t.default.createElement("section",{style:{marginBottom:40,fontSize:36}},t.default.createElement(_.default,{options:{strings:["Software Developer.","Full Stack Developer.","Open Source Contributor."],autoStart:!0,loop:!0,deleteSpeed:50}})),t.default.createElement("section",null,t.default.createElement(M.default,null)),t.default.createElement("section",{style:{margin:40}},t.default.createElement(I.default,null)),t.default.createElement("section",{style:{margin:"60px 0 40px 40px"}},t.default.createElement("div",{className:L.default["video-box"]},t.default.createElement("div",{className:L.default["video-btn"]},"b"))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(j.default,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(l.PinInput,{onChange:function(Q,We,ye){return X(ye)},values:K})),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(P.default.FadeIn,null,t.default.createElement(y.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."}))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(P.default.FadeUp,null,t.default.createElement("img",{src:"https://picsum.photos/360/200.jpg",alt:""}))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},t.default.createElement(P.default.ScaleIn,{triggerOnce:!1},t.default.createElement(t.default.Fragment,null,t.default.createElement("img",{src:"https://picsum.photos/360/200/?blur=2",alt:""}),t.default.createElement("section",{className:L.default["blend-me"]},"Mix Blend Mode")))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},t.default.createElement(P.default.DiyAnimation,{from:{opacity:0,transform:"translate(-100%, 0)"},to:{opacity:1,transform:"translate(0, 0)"},triggerOnce:!0},t.default.createElement("img",{src:"https://picsum.photos/360/200.jpg",alt:""}))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},t.default.createElement(c.default,{className:"w-full h-full group mx-auto grid max-w-sm items-start gap-6"},t.default.createElement("div",{className:"relative w-full h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-900/90 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100"}))),t.default.createElement("section",{style:{marginBottom:40,height:200,width:360,overflow:"hidden"}},t.default.createElement(W.default,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(U.default,null,"Click Me")),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement("section",{className:L.default.effect}," Hello CSS")),t.default.createElement("section",{style:{marginBottom:40},className:L.default.maskBox},t.default.createElement("section",{className:L.default.watermark},"water mark"),"mask"),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement("button",{className:L.default.button},t.default.createElement("span",{className:L.default["button-label"]},"Click Me"))),t.default.createElement("section",{style:{position:"relative",margin:"80px 0 160px 100px"}},t.default.createElement("div",{className:L.default["circle-1"]}),t.default.createElement("div",{className:L.default["circle-2"]}),t.default.createElement("div",{className:L.default["circle-3"]}),t.default.createElement("div",{className:L.default["circle-4"]})),t.default.createElement("section",{style:{margin:20},className:L.default.eHElAY},"Hi, React!"),t.default.createElement("section",null,t.default.createElement("div",{className:L.default.stages},t.default.createElement("div",{className:L.default.cubeSpinner},t.default.createElement("span",{className:L.default.face1},"Web Services"),t.default.createElement("span",{className:L.default.face2},"Blockchain"),t.default.createElement("span",{className:L.default.face3},"Mobile Apps")))),t.default.createElement("section",{style:{margin:20,fontSize:40}},t.default.createElement(g.default,{start:20,end:1e4,duration:10,enableScrollSpy:!0,scrollSpyDelay:1e3})),t.default.createElement("section",{style:{margin:20}},t.default.createElement(z.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(w.default,null,t.default.createElement("div",{style:{width:200,height:40,background:"#aaa",margin:"0 10px",borderRadius:4}}),t.default.createElement("div",{style:{width:200,height:40,background:"#aaa",margin:"0 10px",borderRadius:4}}),t.default.createElement("div",{style:{width:200,height:40,background:"#aaa",margin:"0 10px",borderRadius:4}}),t.default.createElement("div",{style:{width:200,height:40,background:"#aaa",margin:"0 10px",borderRadius:4}}),t.default.createElement("div",{style:{width:200,height:40,background:"#aaa",margin:"0 10px",borderRadius:4}}),t.default.createElement("div",{style:{width:200,height:40,background:"#aaa",margin:"0 10px",borderRadius:4}}),t.default.createElement("div",{style:{width:200,height:40,background:"#aaa",margin:"0 10px",borderRadius:4}}),t.default.createElement("div",{style:{width:200,height:40,background:"#aaa",margin:"0 10px",borderRadius:4}}))),t.default.createElement("section",{style:{width:600,margin:"30px 0"}},t.default.createElement(o.Input,{defaultValue:pe,placeholder:"api key",onChange:u,style:{marginBottom:20}}),t.default.createElement(o.Flex,{align:"center"},t.default.createElement(o.Input.TextArea,{ref:b,defaultValue:ue,placeholder:"\u6765\uFF0C\u8BF4\u70B9\u4EC0\u4E48\u5457...Meta + Enter\u53D1\u9001",onChange:p,onKeyDown:D,autoSize:!0,style:{width:300,height:30,caretColor:"#ff0000"}}),t.default.createElement(o.Button,{style:{margin:"0 10px"},icon:t.default.createElement(C.SendOutlined,{rotate:-60}),type:"primary",disabled:_e,onClick:N},"\u53D1\u9001"),t.default.createElement(o.Button,{icon:t.default.createElement(C.SendOutlined,{rotate:-60}),type:"primary",disabled:!_e,onClick:ne},"\u505C\u6B62"))),t.default.createElement("section",null,_e&&t.default.createElement("div",null,"\u6B63\u5728\u8F93\u5165..."),t.default.createElement("section",{style:{textAlign:"right",color:"#666"}},Me),t.default.createElement(r.default,{markdownText:ee,isLoading:_e})),t.default.createElement("section",{style:{position:"relative",height:300}},t.default.createElement(T.default,null,t.default.createElement("p",null," wave "))))},ke=n.default=ie},31819:function(v,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.trimTopic=n.toFixedBug=n.toFixed=n.toCamelCase=n.sleep=n.shuffleArr=n.saveHtmlToPng=n.reqStringify=n.readFromFile=n.randomString=n.randomNum=n.randomItem=n.randomHex=n.randomColor=n.random=n.promiseWithTimeout=n.prettyObject=n.pause=n.passwordStrength=n.oneApiChat=n.limitDecimal=n.isURLSearchParams=n.isObject=n.isNotEmpty=n.isEqual=n.isEmptyArray=n.isDecimal=n.isDate=n.isDarkMode=n.isArray=n.hidePhone=n.hasFocus=n.getType=n.getRandomId=n.getParamObject=n.getImgsUrl=n.getFileType=n.getEnv=n.getCurrentDate=n.fetchSomething=n.exportJsonData=n.exportFile=n.dayDif=n.customizeTimer=n.copyTextToClipboard=n.clearCookies=n.checkIsLocalPage=n.capitalize=n.camelizeCamelCase=n.asyncTo=n.asyncAction=n.ThousandNum=n.RoundNum=n.RandomId=void 0;var i=a(e(54756)),d=a(e(29293)),t=a(e(41132)),o=a(e(73738)),C=e(55373),E=a(e(20354)),g=n.getEnv=function(){var u;return typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]"&&(u="NODE"),typeof XMLHttpRequest!="undefined"&&(u="BROWSER"),u},l=n.isArray=function(u){return(0,o.default)(u)==="object"&&Object.prototype.toString.call(u)==="[object Array]"},c=n.isURLSearchParams=function(u){return typeof URLSearchParams!="undefined"&&u instanceof URLSearchParams},_=n.isDate=function(u){return(0,o.default)(u)==="object"&&Object.prototype.toString.call(u)==="[object Date]"},A=n.isObject=function(u){return u!==null&&(0,o.default)(u)==="object"},s=n.getParamObject=function(u){return c(u)?(0,C.parse)(u.toString(),{strictNullHandling:!0}):typeof u=="string"?[u]:u},r=n.reqStringify=function(u){return(0,C.stringify)(u,{arrayFormat:"repeat",strictNullHandling:!0})},m=n.getType=function(u){var p=Object.prototype.toString.call(u),D=/\[object (.*?)\]/.exec(p);return D?D[1]:null},O=n.hidePhone=function(u){return u==null?void 0:u.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")},x=n.asyncAction=function(u){var p=Promise.resolve(u);return function(D){p.then(function(){return setTimeout(function(){return D()})})}},B=n.getImgsUrl=function(u){var p=/<img.*?(?:>|\/>)/gi,D=/src=['"]?([^'"]*)['"]?/i,R=u.match(p);if(!R)return null;var S=R.reduce(function(K,X){var N=X.match(D);return N[1]?[].concat((0,t.default)(K),[N[1]]):K},[]);return S},f=n.customizeTimer={intervalTimer:null,timeoutTimer:null,setTimeout:function(u,p){var D=this,R=Date.now,S=R(),K=S,X=function(){D.timeoutTimer=requestAnimationFrame(X),K=R(),K-S>=p&&(u(),cancelAnimationFrame(D.timeoutTimer))};return this.timeoutTimer=requestAnimationFrame(X),this.timeoutTimer},clearTimeout:function(){cancelAnimationFrame(this.timeoutTimer)},setInterval:function(u,p){var D=this,R=Date.now,S=R(),K=S,X=function(){D.intervalTimer=requestAnimationFrame(X),K=R(),K-S>=p&&(S=R(),K=S,u())};return this.intervalTimer=requestAnimationFrame(X),this.intervalTimer},clearInterval:function(){cancelAnimationFrame(this.intervalTimer)}},y=n.isDecimal=function(u){var p=/(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/;return p.test(u)},h=n.limitDecimal=function(u){return u.replace(/^(-)*(\d+)\.(\d\d).*$/,"$1$2.$3")},M=n.passwordStrength=function(u){var p=/^(?=.*[A-Z])(?=.*[\d])(?=.*[a-z]).{8,}$/;return p.test(u)},j=n.checkIsLocalPage=function(){document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")return!1;if(document.visibilityState==="visible")return!0;window.addEventListener("pagehide",function(u){u.persisted},!1)})},I=n.randomHex=function(){return"#".concat(Math.floor(Math.random()*16777215).toString(16).padEnd(6,"0"))},k=n.clearCookies=document.cookie.split(";").forEach(function(b){return document.cookie=b.replace(/^ +/,"").replace(/[=].*/,"=;expires=".concat(new Date(0).toUTCString(),";path=/"))}),P=n.dayDif=function(u,p){return Math.ceil(Math.abs(u.getTime()-p.getTime())/864e5)},U=n.capitalize=function(u){return u.charAt(0).toUpperCase()+u.slice(1)},T=n.isNotEmpty=function(u){return Array.isArray(u)&&u.length>0},W=n.isDarkMode=window.matchMedia("(prefers-color-scheme: dark)").matches,z=n.fetchSomething=function(){return new Promise(function(u){setTimeout(function(){u("")},1e3)})},w=n.toFixed=function(u,p){if(typeof u!="number")throw new Error("number\u4E0D\u662F\u6570\u5B57");var D=Math.round(Math.pow(10,p)*u)/Math.pow(10,p);if(D=String(D),D.indexOf(".")===-1)p!==0&&(D+=".",D+=new Array(p+1).join("0"));else{var R=D.split(".");R[1].length<p&&(R[1]+=new Array(p-R[1].length+1).join("0")),D=R.join(".")}return D},F=n.toFixedBug=function(u,p){return~~(Math.pow(10,p)*u)/Math.pow(10,p)},Z=n.promiseWithTimeout=function(u,p){var D=new Promise(function(R){return setTimeout(function(){return R("Time Out!")},p)});return Promise.race([D,u])},L=n.shuffleArr=function(u){return u.sort(function(){return .5-Math.random()})},te=n.sleep=function(u){return new Promise(function(p){return setTimeout(function(){return p()},u)})},oe=n.ThousandNum=function(u){return u.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},ie=n.RandomId=function(u){return Math.random().toString(36).substring(3,u)},ke=n.RoundNum=function(u,p){return Math.round(u*Math.pow(10,p))/Math.pow(10,p)},Y=n.randomNum=function(u,p){return Math.floor(Math.random()*(p-u+1))+u},re=n.isEmptyArray=function(u){return Array.isArray(u)&&!u.length},$=n.randomItem=function(u){return u[Math.floor(Math.random()*u.length)]},ee=n.asyncTo=function(u){return u.then(function(p){return[null,p]}).catch(function(p){return[p]})},J=n.hasFocus=function(u){return u===document.activeElement},H=n.isEqual=function(u,p){return JSON.stringify(u)===JSON.stringify(p)},ae=n.randomString=function(){return Math.random().toString(36).slice(2)},Ee=n.toCamelCase=function(u){return u.trim().replace(/[-_\s]+(.)?/g,function(p,D){return D?D.toUpperCase():""})},_e=n.random=function(u,p){return Math.floor(Math.random()*(p-u+1)+u)},se=n.randomColor=function(){return"#".concat(Math.random().toString(16).slice(2,8).padEnd(6,"0"))},xe=n.pause=function(u){return new Promise(function(p){return setTimeout(p,u)})},fe=n.camelizeCamelCase=function(u){return u.replace(/(?:^\w|[A-Z]|\b\w)/g,function(p,D){return D===0?p.toLowerCase():p.toUpperCase()}).replace(/\s+/g,"")},Me=n.copyTextToClipboard=function(){var b=(0,d.default)(i.default.mark(function u(p){var D;return i.default.wrap(function(S){for(;;)switch(S.prev=S.next){case 0:if(S.prev=0,!((D=navigator)!==null&&D!==void 0&&(D=D.clipboard)!==null&&D!==void 0&&D.writeText)){S.next=4;break}return S.next=4,navigator.clipboard.writeText(p);case 4:S.next=8;break;case 6:S.prev=6,S.t0=S.catch(0);case 8:case"end":return S.stop()}},u,null,[[0,6]])}));return function(p){return b.apply(this,arguments)}}(),Ie=n.getRandomId=function(){for(var u="",p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",D=0;D<32;D++)u+=p.charAt(Math.floor(Math.random()*p.length));return u},ge=n.oneApiChat=function(u,p,D){return fetch("https://api.openai.com/v1/chat/completions",{method:"POST",signal:D,headers:{Authorization:p,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:u,stream:!0})})},Ce=n.getCurrentDate=function(){var u=new Date,p=u.getDate(),D=u.getMonth()+1,R=u.getFullYear();return"".concat(R,"-").concat(D,"-").concat(p)},ve=n.exportJsonData=function(u){var p=Ce(),D=JSON.stringify(JSON.parse(u),null,2),R=new Blob([D],{type:"application/json"}),S=URL.createObjectURL(R),K=document.createElement("a");K.href=S,K.download="chat-store_".concat(p,".json"),document.body.appendChild(K),K.click(),document.body.removeChild(K)},pe=n.saveHtmlToPng=function(){var b=(0,d.default)(i.default.mark(function u(p,D,R){var S,K,X,N;return i.default.wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return V.prev=0,S=p!=null?p:document.getElementById("image-wrapper"),V.next=4,(0,E.default)(S,{useCORS:!0});case 4:K=V.sent,X=K.toDataURL("image/png"),N=document.createElement("a"),N.style.display="none",N.href=X,N.setAttribute("download","chat-shot.png"),typeof N.download=="undefined"&&N.setAttribute("target","_blank"),document.body.appendChild(N),N.click(),document.body.removeChild(N),window.URL.revokeObjectURL(X),D&&D(),Promise.resolve(),V.next=22;break;case 19:V.prev=19,V.t0=V.catch(0),R&&R(V.t0.message);case 22:case"end":return V.stop()}},u,null,[[0,19]])}));return function(p,D,R){return b.apply(this,arguments)}}(),je=n.trimTopic=function(u){return u.replace(/[，。！？”“"、,.!?]*$/,"")},Te=n.readFromFile=function(){return new Promise(function(u,p){var D=document.createElement("input");D.type="file",D.accept="application/json",D.onchange=function(R){var S=R.target.files[0],K=new FileReader;K.onload=function(X){u(X.target.result)},K.onerror=function(X){return p(new Error(X))},K.readAsText(S)},D.click()})},Be=n.prettyObject=function(u){var p="";return typeof u!="string"&&(p=JSON.stringify(u,null,"  ")),p==="{}"?p.toString():p.startsWith("```json")?p:["```json",p,"```"].join(`
`)},ue=n.getFileType=function(u,p){var D=p.split(".").pop().toLowerCase();switch(D){case"txt":return"text/plain";case"json":return"application/json";case"doc":return"application/msword";case"docx":return"application/vnd.openxmlformats-officedocument.wordprocessingml.document";case"xls":return"application/vnd.ms-excel";case"xlsx":return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";case"ppt":return"application/vnd.ms-powerpoint";case"pptx":return"application/vnd.openxmlformats-officedocument.presentationml.presentation";case"pdf":return"application/pdf";case"jpg":case"jpeg":return"image/jpeg";case"png":return"image/png";case"gif":return"image/gif";case"zip":return"application/zip";case"rar":return"application/x-rar-compressed";default:if(typeof u=="string")try{return JSON.parse(u),"application/json"}catch(R){return"text/plain"}else return u instanceof Uint8Array||u instanceof ArrayBuffer,"application/octet-stream"}},Re=n.exportFile=function(u,p){var D;if((u==null||(D=u.headers["content-type"])===null||D===void 0?void 0:D.indexOf("application/json"))===-1){var R=u.headers&&u.headers["content-disposition"]||"attachment;filename=".concat(p||"file",".xlsx"),S=decodeURI(R==null?void 0:R.split("=")[1].replace(/'/g,"")).replace(/"/g,"").replace("utf-8''","")||"",K=ue(u.data,p||S),X=new Blob([u.data],{type:K}),N=URL.createObjectURL(X),ne=document.createElement("a");document.body.appendChild(ne),ne.style="display: none",ne.href=N,ne.download=S,ne.click(),document.body.removeChild(ne)}}},25039:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(47122),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},48122:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(61543),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},57903:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(9666),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},21958:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(97669),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},39726:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(27825),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},49511:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(90958),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},84576:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(80711),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},85120:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(45789),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},61352:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(91869),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},89696:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(22211),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},89200:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(38791),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},49887:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(6988),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},91193:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(41742),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},32141:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(10332),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},57812:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(20335),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},95280:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(97331),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},1052:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(38413),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},47443:function(v,n,e){"use strict";e.r(n);var a=e(85072),i=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),g=e.n(E),l=e(10540),c=e.n(l),_=e(41113),A=e.n(_),s=e(37318),r={};r.styleTagTransform=A(),r.setAttributes=g(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=i()(s.A,r);n.default=s.A&&s.A.locals?s.A.locals:void 0},82547:function(v){"use strict";v.exports="data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 4%27%3E%3Cstyle type=%27text/css%27%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX%280%29;}to {transform:translateX%28-15px%29;}}%3C/style%3E%3Cpath fill=%27none%27 stroke=%27%230087ca%27 stroke-width=%272%27 class=%27squiggle%27 d=%27M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3%27/%3E%3C/svg%3E"},42634:function(){}}]);

//# sourceMappingURL=267.1c4d9876d65c0c3a884c.js.map