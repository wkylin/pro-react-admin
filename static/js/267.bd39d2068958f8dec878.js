(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[267],{65548:function(g,n,e){"use strict";var a=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=a(e(43693)),t=E(e(96540)),o=e(74848);function C(A){if(typeof WeakMap!="function")return null;var i=new WeakMap,r=new WeakMap;return(C=function(O){return O?r:i})(A)}function E(A,i){if(!i&&A&&A.__esModule)return A;if(A===null||l(A)!="object"&&typeof A!="function")return{default:A};var r=C(i);if(r&&r.has(A))return r.get(A);var m={__proto__:null},O=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var p in A)if(p!=="default"&&{}.hasOwnProperty.call(A,p)){var b=O?Object.getOwnPropertyDescriptor(A,p):null;b&&(b.get||b.set)?Object.defineProperty(m,p,b):m[p]=A[p]}return m.default=A,r&&r.set(A,m),m}function f(A,i){var r=Object.keys(A);if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(A);i&&(m=m.filter(function(O){return Object.getOwnPropertyDescriptor(A,O).enumerable})),r.push.apply(r,m)}return r}function s(A){for(var i=1;i<arguments.length;i++){var r=arguments[i]!=null?arguments[i]:{};i%2?f(Object(r),!0).forEach(function(m){(0,d.default)(A,m,r[m])}):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach(function(m){Object.defineProperty(A,m,Object.getOwnPropertyDescriptor(r,m))})}return A}var c=function(i){return(0,o.jsxs)("svg",s(s({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"#fff",viewBox:"0 0 120 30"},i),{},{children:[(0,o.jsxs)("circle",{cx:15,cy:15,r:15,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]}),(0,o.jsxs)("circle",{cx:60,cy:15,r:9,fillOpacity:.3,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:9,repeatCount:"indefinite",to:9,values:"9;15;9"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:.5,repeatCount:"indefinite",to:.5,values:".5;1;.5"})]}),(0,o.jsxs)("circle",{cx:105,cy:15,r:15,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]})]}))},u=n.default=c},47122:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`.alternating--mj1_d {
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
`],sourceRoot:""}]),o.locals={alternating:"alternating--mj1_d","alternating-text":"alternating-text--p6lWH",alternatingText:"alternating-text--p6lWH"},n.A=o},61543:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`.btn--Vmubv {
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
`],sourceRoot:""}]),o.locals={btn:"btn--Vmubv",content:"content--jujDv","btn-ripple":"btn-ripple--w2aOn",btnRipple:"btn-ripple--w2aOn",ripple:"ripple--oIc_l","btn-ripple-container":"btn-ripple-container--II62b",btnRippleContainer:"btn-ripple-container--II62b"},n.A=o},9666:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`.hIBkFg--xUSDY {
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
`],sourceRoot:""}]),o.locals={hIBkFg:"hIBkFg--xUSDY",kqOLaE:"kqOLaE--z4koa","bz-an":"bz-an--moL5G",bzAn:"bz-an--moL5G"},n.A=o},97669:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=e(4417),C=e.n(o),E=new URL(e(82547),e.b),f=t()(l()),s=C()(E);f.push([g.id,`a.squiggle--JQRWj {
  background-image: linear-gradient(to bottom, #0087ca 0%, #0087ca 100%);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 1px 1px;
  color: inherit;
  text-decoration: none;
}

a.squiggle--JQRWj:hover {
  background-image: url(`+s+`);
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
`],sourceRoot:""}]),f.locals={squiggle:"squiggle--JQRWj"},n.A=f},27825:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`.avatarCard--kIii3 {
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
`],sourceRoot:""}]),o.locals={avatarCard:"avatarCard--kIii3",card:"card--W_bZq",content:"content--yiHmV"},n.A=o},90958:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`.breatheItem--VaM9v {
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
`],sourceRoot:""}]),o.locals={breatheItem:"breatheItem--VaM9v",breathe:"breathe--wA3l6",loopRotate:"loopRotate--GRmod",loop:"loop--Q7Ru6",outside:"outside--NZwXf",inner:"inner--ZClIQ",text:"text--FGKfx","play-button":"play-button--Wg3em",playButton:"play-button--Wg3em","zoom-in-zoom-out":"zoom-in-zoom-out--alaL8",zoomInZoomOut:"zoom-in-zoom-out--alaL8","div-block":"div-block--OwsxA",divBlock:"div-block--OwsxA","div-block-1019":"div-block-1019--iYyTM",divBlock1019:"div-block-1019--iYyTM","div-block-1021":"div-block-1021--EWkRm",divBlock1021:"div-block-1021--EWkRm",code:"code--Wc_Yz",trans:"trans--jcajC"},n.A=o},80711:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`.gradientTracking--FyamC {
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
`],sourceRoot:""}]),o.locals={gradientTracking:"gradientTracking--FyamC"},n.A=o},45789:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`.isometricCard--mEKMm {
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
`],sourceRoot:""}]),o.locals={isometricCard:"isometricCard--mEKMm"},n.A=o},91869:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`.hoverRotate--ew29g {
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
`],sourceRoot:""}]),o.locals={hoverRotate:"hoverRotate--ew29g"},n.A=o},22211:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`.lineBordered--bh05r {
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
`],sourceRoot:""}]),o.locals={lineBordered:"lineBordered--bh05r","hover-underline-animation":"hover-underline-animation--TSfGP",hoverUnderlineAnimation:"hover-underline-animation--TSfGP",left:"left--ErwKf",center:"center--BFLFI",right:"right--DRVwU","dynamic-shadow":"dynamic-shadow--Us2nj",dynamicShadow:"dynamic-shadow--Us2nj","image-contain":"image-contain--Z_yfM",imageContain:"image-contain--Z_yfM","image-cover":"image-cover--ZVSiS",imageCover:"image-cover--ZVSiS",container:"container--lADY1",top:"top--XQMfF",bottom:"bottom--P1bZI","no-scrollbars":"no-scrollbars--AUOMQ",noScrollbars:"no-scrollbars--AUOMQ","engraved-text":"engraved-text--dMPwS",engravedText:"engraved-text--dMPwS","embossed-text":"embossed-text--eQZ0_",embossedText:"embossed-text--eQZ0_"},n.A=o},38791:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`.background--V0AeH {
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
`],sourceRoot:""}]),o.locals={background:"background--V0AeH","move-background":"move-background--h74DC",moveBackground:"move-background--h74DC"},n.A=o},6988:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`.markdownBody--xUrgB {\r
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
`],sourceRoot:""}]),o.locals={markdownBody:"markdownBody--xUrgB",loadingIcon:"loadingIcon--VpAmv",copySection:"copySection--aJHtb",lang:"lang--SO0lS",copySpan:"copySpan--u4qzC",preCode:"preCode--s6faO"},n.A=o},41742:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`/* Perspective card */
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
`],sourceRoot:""}]),o.locals={"perspective-card":"perspective-card--fRasE",perspectiveCard:"perspective-card--fRasE",shiftingCard:"shiftingCard--ejZ4B",cardAnimation:"cardAnimation--uMV0q"},n.A=o},20335:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`.star--H6zRP {
  color: #f93;
  cursor: pointer;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/StarRating/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,eAAe;AACjB",sourcesContent:[`.star {
  color: #f93;
  cursor: pointer;
}
`],sourceRoot:""}]),o.locals={star:"star--H6zRP"},n.A=o},38413:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`.typedCursorBlink--bnrB1 {
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
`],sourceRoot:""}]),o.locals={typedCursorBlink:"typedCursorBlink--bnrB1","typed-blink":"typed-blink--GZUvL",typedBlink:"typed-blink--GZUvL"},n.A=o},37318:function(g,n,e){"use strict";var a=e(71354),l=e.n(a),d=e(76314),t=e.n(d),o=t()(l());o.push([g.id,`.avatar--tAk6h {
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

.line--Lp5NS {
  height: 2px;
  width: 360px;
  background-image: linear-gradient(97deg, #0096ff, #bb64ff 42%, #f2416b 74%, #eb7500);
}

.eHElAY--ul0hZ {
  cursor: pointer;
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  height: 2.8rem;
  letter-spacing: 0.1rem;
  line-height: 2.8rem;
  padding: 0px 1.8rem;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  z-index: 0;
  color: rgb(255, 255, 255);
  border-color: transparent;
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation-timeline: auto;
    animation-range-start: normal;
    animation-range-end: normal;
    opacity: 1;
    background: linear-gradient(
        45deg,
        rgb(255, 0, 0),
        rgb(255, 115, 0),
        rgb(255, 251, 0),
        rgb(72, 255, 0),
        rgb(0, 255, 213),
        rgb(0, 43, 255),
        rgb(122, 0, 255),
        rgb(255, 0, 200),
        rgb(255, 0, 0)
      )
      0% 0% / 400%;
    animation: 20s linear 0s infinite normal none running dv-wu--sf_Ta;
    transition: opacity 0.3s ease-in-out;
  }
  &::after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(17, 17, 17);
    left: 0px;
    top: 0px;
  }
}
@keyframes dv-wu--sf_Ta {
  0% {
    background-position: 0px 0px;
  }
  50% {
    background-position: 400% 0px;
  }
  100% {
    background-position: 0px 0px;
  }
}

.stages--wh47k {
  position: relative;
  height: 74px;
  .cubeSpinner--eOJc0 {
    color: #42745a;
    animation-name: spin-cube--eXtsy;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 8s;
    transform-style: preserve-3d;
    transform-origin: 40px 40px 0;
    line-height: 1.3em;
    font-size: 64px;

    span {
      position: absolute;
      width: 100%;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    .face1--KIPp1 {
      transform: translateZ(40px);
    }

    .face2--aYKpi {
      transform: rotateX(240deg) translateZ(40px);
    }

    .face3--M7CTV {
      transform: rotateX(120deg) translateZ(40px);
    }
  }
}

@keyframes spin-cube--eXtsy {
  0%,
  to {
    transform: rotateX(0deg);
  }

  15% {
    transform: rotateX(0deg);
  }

  25% {
    transform: rotateX(120deg);
  }

  40% {
    transform: rotateX(120deg);
  }

  50% {
    transform: rotateX(240deg);
  }

  65% {
    transform: rotateX(240deg);
  }

  75% {
    transform: rotateX(240deg);
  }

  90% {
    transform: rotateX(1turn);
  }

  to {
    transform: rotateX(1turn);
  }
}

.video-box--RWlhc .video-btn--PPzlz {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  display: inline-block;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #1d5fca;
  border-radius: 50%;
  color: #fff;
  font-size: 20px;
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}

.video-box--RWlhc .video-btn--PPzlz:after,
.video-box--RWlhc .video-btn--PPzlz:before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  border: 1px solid #1d5fca;
  transition: 0.5s;
}

.video-box--RWlhc .video-btn--PPzlz i {
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
}

.video-box--RWlhc .video-btn--PPzlz:before {
  animation: ripple--Ojifa 2s linear infinite;
}

.video-box--RWlhc .video-btn--PPzlz:after {
  animation: ripple--Ojifa 2s linear 1s infinite;
}

.video-box--RWlhc .video-btn--PPzlz:focus,
.video-box--RWlhc .video-btn--PPzlz:hover {
  background-color: #2d995d;
  color: #fff;
}

.video-box--RWlhc .video-btn--PPzlz:focus:after,
.video-box--RWlhc .video-btn--PPzlz:focus:before,
.video-box--RWlhc .video-btn--PPzlz:hover:after,
.video-box--RWlhc .video-btn--PPzlz:hover:before {
  border-color: #2d995d;
}

@keyframes ripple--Ojifa {
  0% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.75);
    opacity: 1;
  }

  to {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes effect-1--LXEum {
  0% {
    text-shadow: 0px 0px #32a8a2;
  }
  40% {
    text-shadow: 2px 2px 5px #32a8a2;
  }
  100% {
    text-shadow: 0px 0px #32a8a2;
  }
}

.effect--mKRM4 {
  animation: effect-1--LXEum 1s linear infinite;
  color: white;
  font-size: 48px;
}
`,"",{version:3,sources:["webpack://./src/pages/home/index.module.less"],names:[],mappings:"AAAA;EACE,uDAAgD;AAClD;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,wBAAwB;EAC1B;AACF;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,oBAAoB;EACpB,kBAAkB;EAClB,iBAAiB;EACjB,WAAW;EACX,eAAe;EACf,kBAAkB;EAClB,mFAA2E;UAA3E,2EAA2E;AAC7E;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,WAAW;EACX,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,qDAAqD;EACrD,wDAAiD;AACnD;;AAEA;EACE;IACE,2BAA2B;EAC7B;AACF;;AAEA;EACE,uBAAuB;EACvB,oBAAoB;EACpB;oEACkE;EAClE,wCAAwC;EACxC,6BAA6B;EAC7B,6BAA6B;EAC7B,sBAAsB;AACxB;;AAEA;EACE,kFAAkF;EAClF,6BAAqB;UAArB,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,kDAA2C;EAC3C,6BAA6B;EAC7B,mBAAmB;EACnB,yCAAyC;EACzC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,qBAAqB;EACrB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,mBAAmB;EACnB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,qBAAqB;EACrB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,qBAAqB;EACvB;;EAEA;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE;IACE,UAAU;IACV,mBAAmB;EACrB;;EAEA;IACE,UAAU;IACV,qBAAqB;EACvB;;EAEA;IACE,UAAU;IACV,uBAAuB;EACzB;AACF;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,oFAAoF;AACtF;;AAEA;EACE,eAAe;EACf,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,mBAAmB;EACnB,kBAAkB;EAClB,qBAAqB;EACrB,mBAAmB;EACnB,kBAAkB;EAClB,UAAU;EACV,yBAAyB;EACzB,yBAAyB;EACzB;IACE,WAAW;IACX,kBAAkB;IAClB,SAAS;IACT,UAAU;IACV,WAAW;IACX,iBAAiB;IACjB,uBAAuB;IACvB,wBAAwB;IACxB,wBAAwB;IACxB,6BAA6B;IAC7B,2BAA2B;IAC3B,UAAU;IACV;;;;;;;;;;;;kBAYc;IACd,kEAA2D;IAC3D,oCAAoC;EACtC;EACA;IACE,WAAW;IACX,WAAW;IACX,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,2BAA2B;IAC3B,SAAS;IACT,QAAQ;EACV;AACF;AACA;EACE;IACE,4BAA4B;EAC9B;EACA;IACE,6BAA6B;EAC/B;EACA;IACE,4BAA4B;EAC9B;AACF;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ;IACE,cAAc;IACd,gCAAyB;IACzB,sCAAsC;IACtC,mCAAmC;IACnC,sBAAsB;IACtB,4BAA4B;IAC5B,6BAA6B;IAC7B,kBAAkB;IAClB,eAAe;;IAEf;MACE,kBAAkB;MAClB,WAAW;MACX,2BAA2B;MAC3B,mCAAmC;IACrC;IACA;MACE,2BAA2B;IAC7B;;IAEA;MACE,2CAA2C;IAC7C;;IAEA;MACE,2CAA2C;IAC7C;EACF;AACF;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;IACE,wBAAwB;EAC1B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,yCAAyC;EACzC,kBAAkB;EAClB,qBAAqB;EACrB,2BAA2B;EAC3B,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,yBAAyB;EACzB,kBAAkB;EAClB,WAAW;EACX,eAAe;EACf,UAAU;EACV,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;;EAEE,WAAW;EACX,cAAc;EACd,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,WAAW;EACX,SAAS;EACT,OAAO;EACP,kBAAkB;EAClB,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,UAAU;EACV,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,2CAAoC;AACtC;;AAEA;EACE,8CAAuC;AACzC;;AAEA;;EAEE,yBAAyB;EACzB,WAAW;AACb;;AAEA;;;;EAIE,qBAAqB;AACvB;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,sBAAsB;IACtB,UAAU;EACZ;;EAEA;IACE,mBAAmB;IACnB,UAAU;EACZ;AACF;;AAEA;EACE;IACE,4BAA4B;EAC9B;EACA;IACE,gCAAgC;EAClC;EACA;IACE,4BAA4B;EAC9B;AACF;;AAEA;EACE,6CAAsC;EACtC,YAAY;EACZ,eAAe;AACjB",sourcesContent:[`.avatar {
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

.line {
  height: 2px;
  width: 360px;
  background-image: linear-gradient(97deg, #0096ff, #bb64ff 42%, #f2416b 74%, #eb7500);
}

.eHElAY {
  cursor: pointer;
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  height: 2.8rem;
  letter-spacing: 0.1rem;
  line-height: 2.8rem;
  padding: 0px 1.8rem;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  z-index: 0;
  color: rgb(255, 255, 255);
  border-color: transparent;
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation-timeline: auto;
    animation-range-start: normal;
    animation-range-end: normal;
    opacity: 1;
    background: linear-gradient(
        45deg,
        rgb(255, 0, 0),
        rgb(255, 115, 0),
        rgb(255, 251, 0),
        rgb(72, 255, 0),
        rgb(0, 255, 213),
        rgb(0, 43, 255),
        rgb(122, 0, 255),
        rgb(255, 0, 200),
        rgb(255, 0, 0)
      )
      0% 0% / 400%;
    animation: 20s linear 0s infinite normal none running dv-wu;
    transition: opacity 0.3s ease-in-out;
  }
  &::after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(17, 17, 17);
    left: 0px;
    top: 0px;
  }
}
@keyframes dv-wu {
  0% {
    background-position: 0px 0px;
  }
  50% {
    background-position: 400% 0px;
  }
  100% {
    background-position: 0px 0px;
  }
}

.stages {
  position: relative;
  height: 74px;
  .cubeSpinner {
    color: #42745a;
    animation-name: spin-cube;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 8s;
    transform-style: preserve-3d;
    transform-origin: 40px 40px 0;
    line-height: 1.3em;
    font-size: 64px;

    span {
      position: absolute;
      width: 100%;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    .face1 {
      transform: translateZ(40px);
    }

    .face2 {
      transform: rotateX(240deg) translateZ(40px);
    }

    .face3 {
      transform: rotateX(120deg) translateZ(40px);
    }
  }
}

@keyframes spin-cube {
  0%,
  to {
    transform: rotateX(0deg);
  }

  15% {
    transform: rotateX(0deg);
  }

  25% {
    transform: rotateX(120deg);
  }

  40% {
    transform: rotateX(120deg);
  }

  50% {
    transform: rotateX(240deg);
  }

  65% {
    transform: rotateX(240deg);
  }

  75% {
    transform: rotateX(240deg);
  }

  90% {
    transform: rotateX(1turn);
  }

  to {
    transform: rotateX(1turn);
  }
}

.video-box .video-btn {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  display: inline-block;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #1d5fca;
  border-radius: 50%;
  color: #fff;
  font-size: 20px;
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}

.video-box .video-btn:after,
.video-box .video-btn:before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  border: 1px solid #1d5fca;
  transition: 0.5s;
}

.video-box .video-btn i {
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
}

.video-box .video-btn:before {
  animation: ripple 2s linear infinite;
}

.video-box .video-btn:after {
  animation: ripple 2s linear 1s infinite;
}

.video-box .video-btn:focus,
.video-box .video-btn:hover {
  background-color: #2d995d;
  color: #fff;
}

.video-box .video-btn:focus:after,
.video-box .video-btn:focus:before,
.video-box .video-btn:hover:after,
.video-box .video-btn:hover:before {
  border-color: #2d995d;
}

@keyframes ripple {
  0% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.75);
    opacity: 1;
  }

  to {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes effect-1 {
  0% {
    text-shadow: 0px 0px #32a8a2;
  }
  40% {
    text-shadow: 2px 2px 5px #32a8a2;
  }
  100% {
    text-shadow: 0px 0px #32a8a2;
  }
}

.effect {
  animation: effect-1 1s linear infinite;
  color: white;
  font-size: 48px;
}
`],sourceRoot:""}]),o.locals={avatar:"avatar--tAk6h",levitate:"levitate--RZCwS",maskBox:"maskBox--uAYjJ",watermark:"watermark--YUolT","blend-me":"blend-me--f5L11",blendMe:"blend-me--f5L11","move-me":"move-me--FUPwc",moveMe:"move-me--FUPwc",button:"button--GgsIa","button-label":"button-label--d_jxl",buttonLabel:"button-label--d_jxl","circle-1":"circle-1--kJj6k",circle1:"circle-1--kJj6k",expand:"expand--kmoUS","circle-2":"circle-2--YMeVl",circle2:"circle-2--YMeVl","expand-opacity":"expand-opacity--XzitQ",expandOpacity:"expand-opacity--XzitQ","circle-3":"circle-3--DvCUJ",circle3:"circle-3--DvCUJ","circle-4":"circle-4--UkUyn",circle4:"circle-4--UkUyn",line:"line--Lp5NS",eHElAY:"eHElAY--ul0hZ",eHElAy:"eHElAY--ul0hZ","dv-wu":"dv-wu--sf_Ta",dvWu:"dv-wu--sf_Ta",stages:"stages--wh47k","spin-cube":"spin-cube--eXtsy",spinCube:"spin-cube--eXtsy",cubeSpinner:"cubeSpinner--eOJc0",face1:"face1--KIPp1",face2:"face2--aYKpi",face3:"face3--M7CTV","video-box":"video-box--RWlhc",videoBox:"video-box--RWlhc","video-btn":"video-btn--PPzlz",videoBtn:"video-btn--PPzlz",ripple:"ripple--Ojifa",effect:"effect--mKRM4","effect-1":"effect-1--LXEum",effect1:"effect-1--LXEum"},n.A=o},5977:function(g,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=a(e(19936)),d=n.default=l.default},19936:function(g,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=t;var l=a(e(85715)),d=e(96540);function t(){var o=(0,d.useState)(0),C=(0,l.default)(o,2),E=C[0],f=C[1],s=(0,d.useState)(0),c=(0,l.default)(s,2),u=c[0],A=c[1];return(0,d.useEffect)(function(){var i=function(){window.addEventListener("mousemove",function(m){f(m.clientX),A(m.clientY)})};return window.addEventListener("mousemove",i),function(){window.removeEventListener("mousemove",i)}},[]),{x:E,y:u}}},81286:function(g,n,e){"use strict";var a=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=C(e(96540)),t=a(e(25039));function o(s){if(typeof WeakMap!="function")return null;var c=new WeakMap,u=new WeakMap;return(o=function(i){return i?u:c})(s)}function C(s,c){if(!c&&s&&s.__esModule)return s;if(s===null||l(s)!="object"&&typeof s!="function")return{default:s};var u=o(c);if(u&&u.has(s))return u.get(s);var A={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in s)if(r!=="default"&&{}.hasOwnProperty.call(s,r)){var m=i?Object.getOwnPropertyDescriptor(s,r):null;m&&(m.get||m.set)?Object.defineProperty(A,r,m):A[r]=s[r]}return A.default=s,u&&u.set(s,A),A}var E=function(c){var u=c.alternateText,A=u===void 0?[]:u;return(0,d.useEffect)(function(){var i=document.getElementById("alternating-text"),r=0,m=function(p){r=r<A.length-1?r+1:0,i.innerHTML=A[r]};return i.innerHTML=A[0],i.addEventListener("animationiteration",m,!1),function(){i.removeEventListener("animationiteration",m,!1)}},[]),d.default.createElement("span",{className:t.default.alternating,id:"alternating-text"},A[0]||"Text goes here")},f=n.default=E},44322:function(g,n,e){"use strict";var a=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=a(e(43693)),t=a(e(85715)),o=E(e(96540));function C(p){if(typeof WeakMap!="function")return null;var b=new WeakMap,v=new WeakMap;return(C=function(P){return P?v:b})(p)}function E(p,b){if(!b&&p&&p.__esModule)return p;if(p===null||l(p)!="object"&&typeof p!="function")return{default:p};var v=C(b);if(v&&v.has(p))return v.get(p);var D={__proto__:null},P=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var T in p)if(T!=="default"&&{}.hasOwnProperty.call(p,T)){var W=P?Object.getOwnPropertyDescriptor(p,T):null;W&&(W.get||W.set)?Object.defineProperty(D,T,W):D[T]=p[T]}return D.default=p,v&&v.set(p,D),D}function f(p,b){var v=Object.keys(p);if(Object.getOwnPropertySymbols){var D=Object.getOwnPropertySymbols(p);b&&(D=D.filter(function(P){return Object.getOwnPropertyDescriptor(p,P).enumerable})),v.push.apply(v,D)}return v}function s(p){for(var b=1;b<arguments.length;b++){var v=arguments[b]!=null?arguments[b]:{};b%2?f(Object(v),!0).forEach(function(D){(0,d.default)(p,D,v[D])}):Object.getOwnPropertyDescriptors?Object.defineProperties(p,Object.getOwnPropertyDescriptors(v)):f(Object(v)).forEach(function(D){Object.defineProperty(p,D,Object.getOwnPropertyDescriptor(v,D))})}return p}var c=function(b){var v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"0px",D=(0,o.useState)(!0),P=(0,t.default)(D,2),T=P[0],W=P[1];return(0,o.useEffect)(function(){var U=new IntersectionObserver(function(Z){var M=(0,t.default)(Z,1),k=M[0];W(k.isIntersecting)},{rootMargin:v});return b.current&&U.observe(b.current),function(){b.current&&U.unobserve(b.current)}},[]),T},u=function(b){var v=b.from,D=b.to,P=b.children,T=(0,o.useRef)(null),W=c(T),U={transition:"1000ms ease-in-out"};return o.default.createElement("div",{ref:T,style:W?s(s({},U),D):s(s({},U),v)},P)},A=function(b){var v=b.children;return o.default.createElement(u,{from:{opacity:0},to:{opacity:1}},v)},i=function(b){var v=b.children;return o.default.createElement(u,{from:{opacity:0,translate:"0 2rem"},to:{opacity:1,translate:"none"}},v)},r=function(b){var v=b.children;return o.default.createElement(u,{from:{scale:"0"},to:{scale:"1"}},v)},m={FadeIn:A,FadeUp:i,ScaleIn:r},O=n.default=m},53795:function(g,n,e){"use strict";var a=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=a(e(94634)),t=a(e(91847)),o=a(e(85715)),C=c(e(96540)),E=a(e(48122)),f=["children","onClick"];function s(r){if(typeof WeakMap!="function")return null;var m=new WeakMap,O=new WeakMap;return(s=function(b){return b?O:m})(r)}function c(r,m){if(!m&&r&&r.__esModule)return r;if(r===null||l(r)!="object"&&typeof r!="function")return{default:r};var O=s(m);if(O&&O.has(r))return O.get(r);var p={__proto__:null},b=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in r)if(v!=="default"&&{}.hasOwnProperty.call(r,v)){var D=b?Object.getOwnPropertyDescriptor(r,v):null;D&&(D.get||D.set)?Object.defineProperty(p,v,D):p[v]=r[v]}return p.default=r,O&&O.set(r,p),p}var u=function(){var m=C.default.useState({x:-1,y:-1}),O=(0,o.default)(m,2),p=O[0],b=p.x,v=p.y,D=O[1],P=b!==-1&&v!==-1,T=function(U){var Z=U.currentTarget.getBoundingClientRect(),M=Z.left,k=Z.top;D({x:U.clientX-M,y:U.clientY-k}),setTimeout(function(){D({x:-1,y:-1})},300)};return{x:b,y:v,handleRippleOnClick:T,isRippling:P}},A=function(m){var O=m.children,p=m.onClick,b=(0,t.default)(m,f),v=u(),D=v.x,P=v.y,T=v.handleRippleOnClick,W=v.isRippling,U=function(M){T(M),p&&p(M)};return C.default.createElement("button",(0,d.default)({type:"button",onClick:U,className:E.default.btn},b),C.default.createElement("span",{className:E.default.content},O),W&&C.default.createElement("div",{className:E.default["btn-ripple-container"]},C.default.createElement("span",{className:E.default["btn-ripple"],style:{left:D,top:P}})))},i=n.default=A},85666:function(g,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=a(e(96540)),d=a(e(57903)),t=function(E){var f=E.children;return l.default.createElement(l.default.Fragment,null,l.default.createElement("section",{className:d.default.hIBkFg},l.default.createElement("h2",null,"Design and code"," ",l.default.createElement("span",{className:d.default.kqOLaE},l.default.createElement("span",null,"R"),l.default.createElement("span",null,"e"),l.default.createElement("span",null,"a"),l.default.createElement("span",null,"c"),l.default.createElement("span",null,"t"))," ","apps")))},o=n.default=t},59409:function(g,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=a(e(96540)),d=a(e(21958)),t=function(E){var f=E.text,s=/((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;return l.default.createElement(l.default.Fragment,null,f.split(s).map(function(c,u){var A=c.match(s);if(A){var i=A[0];return l.default.createElement("a",{key:u,className:d.default.squiggle,target:"_blank",href:i.startsWith("http")?i:"http://".concat(i)},i)}return c}))},o=n.default=t},76017:function(g,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=a(e(96540)),d=a(e(39726)),t=function(E){var f=E.avatar,s=E.text;return l.default.createElement("div",{className:d.default.avatarCard},l.default.createElement("div",{className:d.default.card},l.default.createElement("figure",null,l.default.createElement("img",{alt:"",src:f,className:d.default.avatar})),l.default.createElement("p",{className:d.default.content},s)))},o=n.default=t},12770:function(g,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=a(e(96540)),d=a(e(49511)),t=function(){return l.default.createElement(l.default.Fragment,null,l.default.createElement("section",{className:d.default.breatheItem},l.default.createElement("span",null,"Breathe")))},o=n.default=t},42916:function(g,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=a(e(43693)),d=a(e(96540));function t(f,s){var c=Object.keys(f);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(f);s&&(u=u.filter(function(A){return Object.getOwnPropertyDescriptor(f,A).enumerable})),c.push.apply(c,u)}return c}function o(f){for(var s=1;s<arguments.length;s++){var c=arguments[s]!=null?arguments[s]:{};s%2?t(Object(c),!0).forEach(function(u){(0,l.default)(f,u,c[u])}):Object.getOwnPropertyDescriptors?Object.defineProperties(f,Object.getOwnPropertyDescriptors(c)):t(Object(c)).forEach(function(u){Object.defineProperty(f,u,Object.getOwnPropertyDescriptor(c,u))})}return f}var C=function(s){var c=s.style,u=s.children;return d.default.createElement("div",{style:o({width:"100%",minHeight:"calc(100vh - 232px)"},c)},u)},E=n.default=C},18903:function(g,n,e){"use strict";var a=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=C(e(96540)),t=a(e(84576));function o(s){if(typeof WeakMap!="function")return null;var c=new WeakMap,u=new WeakMap;return(o=function(i){return i?u:c})(s)}function C(s,c){if(!c&&s&&s.__esModule)return s;if(s===null||l(s)!="object"&&typeof s!="function")return{default:s};var u=o(c);if(u&&u.has(s))return u.get(s);var A={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in s)if(r!=="default"&&{}.hasOwnProperty.call(s,r)){var m=i?Object.getOwnPropertyDescriptor(s,r):null;m&&(m.get||m.set)?Object.defineProperty(A,r,m):A[r]=s[r]}return A.default=s,u&&u.set(s,A),A}var E=function(){var c=(0,d.useRef)(null);return(0,d.useLayoutEffect)(function(){var u=c.current,A=function(r){var m=r.target.getBoundingClientRect(),O=r.clientX-m.left,p=r.clientY-m.top;u.style.setProperty("--x",O+"px"),u.style.setProperty("--y",p+"px")};return u.addEventListener("mousemove",A),function(){u.removeEventListener("mousemove",A)}},[]),d.default.createElement("button",{className:t.default.gradientTracking,ref:c},d.default.createElement("span",null,"Hover me"))},f=n.default=E},52537:function(g,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=a(e(96540)),d=a(e(85120)),t=function(E){var f=E.text;return l.default.createElement("div",{className:d.default.isometricCard},l.default.createElement("p",null,f))},o=n.default=t},35317:function(g,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=a(e(94634)),d=a(e(85715)),t=a(e(91847)),o=a(e(96540)),C=a(e(61352)),E=["alt","src","className","loadInitially","observerOptions"],f=function(u){var A=u.alt,i=u.src,r=u.className,m=u.loadInitially,O=m===void 0?!1:m,p=u.observerOptions,b=p===void 0?{root:null,rootMargin:"200px 0px"}:p,v=(0,t.default)(u,E),D=o.default.useRef(null),P=o.default.useRef(null),T=o.default.useState(O),W=(0,d.default)(T,2),U=W[0],Z=W[1],M=o.default.useCallback(function(k){k[0].isIntersecting&&(D.current.disconnect(),Z(!0))},[D]);return o.default.useEffect(function(){if(!O){if("loading"in HTMLImageElement.prototype){Z(!0);return}return D.current=new IntersectionObserver(M,b),D.current.observe(P.current),function(){D.current.disconnect()}}},[]),o.default.createElement("figure",{className:C.default.hoverRotate},o.default.createElement("img",(0,l.default)({alt:A,src:U?i:"",ref:P,className:r,loading:O?void 0:"lazy"},v)),o.default.createElement("figcaption",null,o.default.createElement("h3",null,"Lorem ",o.default.createElement("br",null),"Ipsum")))},s=n.default=f},22807:function(g,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=a(e(96540)),d=a(e(89696)),t=function(E){var f=E.text;return l.default.createElement("span",{className:d.default.lineBordered},f)},o=n.default=t},75747:function(g,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=a(e(96540)),d=a(e(89200)),t=function(E){return l.default.createElement("div",{style:{position:"relative",height:"100%"}},l.default.createElement("div",{className:d.default.background},"Mesh Gradient Background"))},o=n.default=t},81740:function(g,n,e){"use strict";var a=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=a(e(54756)),t=a(e(94634)),o=a(e(85715)),C=a(e(29293)),E=P(e(96540)),f=e(55290),s=a(e(43160)),c=a(e(41512)),u=a(e(54152)),A=a(e(63940)),i=a(e(37948)),r=a(e(73410)),m=a(e(51498)),O=a(e(22802)),p=e(81591),b=a(e(65548));e(35819);var v=a(e(49887));function D(M){if(typeof WeakMap!="function")return null;var k=new WeakMap,S=new WeakMap;return(D=function(w){return w?S:k})(M)}function P(M,k){if(!k&&M&&M.__esModule)return M;if(M===null||l(M)!="object"&&typeof M!="function")return{default:M};var S=D(k);if(S&&S.has(M))return S.get(M);var R={__proto__:null},w=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var x in M)if(x!=="default"&&{}.hasOwnProperty.call(M,x)){var K=w?Object.getOwnPropertyDescriptor(M,x):null;K&&(K.get||K.set)?Object.defineProperty(R,x,K):R[x]=M[x]}return R.default=M,S&&S.set(M,R),R}var T=function(){var M=(0,C.default)(d.default.mark(function k(S){var R,w;return d.default.wrap(function(K){for(;;)switch(K.prev=K.next){case 0:if(K.prev=0,!((R=navigator)!==null&&R!==void 0&&(R=R.clipboard)!==null&&R!==void 0&&R.writeText)){K.next=5;break}return K.next=4,navigator.clipboard.writeText(S);case 4:f.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F");case 5:K.next=16;break;case 7:K.prev=7,K.t0=K.catch(0),w=document.createElement("textarea"),w.value=S,document.body.appendChild(w),w.focus(),w.select();try{document.execCommand("copy"),f.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F")}catch(N){f.message.success("\u590D\u5236\u5230\u526A\u8D34\u677F\u5931\u8D25")}document.body.removeChild(w);case 16:case"end":return K.stop()}},k,null,[[0,7]])}));return function(S){return M.apply(this,arguments)}}(),W=function(k){var S,R=(0,E.useRef)(null),w=(S=R.current)===null||S===void 0?void 0:S.innerText,x=(0,E.useRef)(""),K=(0,p.useDebouncedCallback)(function(){if(R.current){var N=R.current.querySelector("code"),ee=N.className,re=/language-(\w+)/.exec(ee||"");if(re){var z=(0,o.default)(re,2),G=z[1];x.current=G}}},800);return(0,E.useEffect)(function(){setTimeout(K,1)},[w]),E.default.createElement("section",null,E.default.createElement("section",{className:v.default.copySection},E.default.createElement("span",{className:v.default.lang},x.current),E.default.createElement("span",{className:v.default.copySpan,role:"button",onClick:function(){if(R.current){var ee=R.current.innerText;T(ee)}}},"\u590D\u5236\u4EE3\u7801")),E.default.createElement("pre",{className:v.default.preCode,ref:R},k.children))},U=function(k){var S=k.markdownText,R=S===void 0?"":S,w=k.isLoading,x=w===void 0?!1:w;return E.default.createElement("section",{className:v.default.markdownBody},x&&!R&&E.default.createElement(s.default,{component:b.default,style:{color:"#fff"},className:v.default.loadingIcon}),R&&E.default.createElement(c.default,{remarkPlugins:[u.default,r.default,A.default],rehypePlugins:[i.default,O.default,[m.default,{detect:!1,ignoreMissing:!0}]],components:{pre:W,p:function(N){return E.default.createElement("p",(0,t.default)({},N,{dir:"auto"}))},a:function(N){var ee,re=N.href||"",z=/^\/#/i.test(re),G=z?"_self":(ee=N.target)!==null&&ee!==void 0?ee:"_blank";return E.default.createElement("a",(0,t.default)({},N,{target:G}))}}},R))},Z=n.default=U},63023:function(g,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=a(e(96540)),d=e(23947),t=function(E){var f=E.children;return l.default.createElement(d.motion.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{ease:"linear",duration:1,y:{duration:.5}}},f)},o=n.default=t},3102:function(g,n,e){"use strict";var a=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=C(e(96540)),t=a(e(91193));function o(s){if(typeof WeakMap!="function")return null;var c=new WeakMap,u=new WeakMap;return(o=function(i){return i?u:c})(s)}function C(s,c){if(!c&&s&&s.__esModule)return s;if(s===null||l(s)!="object"&&typeof s!="function")return{default:s};var u=o(c);if(u&&u.has(s))return u.get(s);var A={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in s)if(r!=="default"&&{}.hasOwnProperty.call(s,r)){var m=i?Object.getOwnPropertyDescriptor(s,r):null;m&&(m.get||m.set)?Object.defineProperty(A,r,m):A[r]=s[r]}return A.default=s,u&&u.set(s,A),A}var E=function(){var c=(0,d.useRef)(null);return(0,d.useLayoutEffect)(function(){var u=c.current,A=u.getBoundingClientRect(),i=A.x,r=A.y,m=A.width,O=m===void 0?240:m,p=A.height,b=p===void 0?360:p,v=i+(O||240)/2,D=r+(b||360)/2,P=function(U){var Z=U.pageX,M=U.pageY,k=(v-Z)/((O||240)/2),S=(D-M)/((b||360)/2);u.style.setProperty("--dx",k),u.style.setProperty("--dy",S)},T=function(){u.style.setProperty("--dx",0),u.style.setProperty("--dy",0)};return u.addEventListener("mousemove",P),u.addEventListener("mouseleave",T),function(){u.removeEventListener("mousemove",P),u.removeEventListener("mouseleave",T)}},[]),d.default.createElement("div",{ref:c,className:t.default.shiftingCard},d.default.createElement("h3",null,"Shifting Card"))},f=n.default=E},31456:function(g,n,e){"use strict";var a=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=f;var d=a(e(85715)),t=E(e(96540)),o=a(e(5977));function C(s){if(typeof WeakMap!="function")return null;var c=new WeakMap,u=new WeakMap;return(C=function(i){return i?u:c})(s)}function E(s,c){if(!c&&s&&s.__esModule)return s;if(s===null||l(s)!="object"&&typeof s!="function")return{default:s};var u=C(c);if(u&&u.has(s))return u.get(s);var A={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in s)if(r!=="default"&&{}.hasOwnProperty.call(s,r)){var m=i?Object.getOwnPropertyDescriptor(s,r):null;m&&(m.get||m.set)?Object.defineProperty(A,r,m):A[r]=s[r]}return A.default=s,u&&u.set(s,A),A}function f(s){var c=s.children,u=s.className,A=u===void 0?"":u,i=(0,t.useRef)(null),r=(0,o.default)(),m=(0,t.useRef)({x:0,y:0}),O=(0,t.useRef)({w:0,h:0}),p=(0,t.useState)([]),b=(0,d.default)(p,2),v=b[0],D=b[1];(0,t.useEffect)(function(){i.current&&D(Array.from(i.current.children).map(function(W){return W}))},[]),(0,t.useEffect)(function(){return P(),window.addEventListener("resize",P),function(){window.removeEventListener("resize",P)}},[v]),(0,t.useEffect)(function(){T()},[r]);var P=function(){i.current&&(O.current.w=i.current.offsetWidth,O.current.h=i.current.offsetHeight)},T=function(){if(i.current){var U=i.current.getBoundingClientRect(),Z=O.current,M=Z.w,k=Z.h,S=r.x-U.left,R=r.y-U.top,w=S<M&&S>0&&R<k&&R>0;w&&(m.current.x=S,m.current.y=R,v.forEach(function(x){var K=-(x.getBoundingClientRect().left-U.left)+m.current.x,N=-(x.getBoundingClientRect().top-U.top)+m.current.y;x.style.setProperty("--mouse-x","".concat(K,"px")),x.style.setProperty("--mouse-y","".concat(N,"px"))}))}};return t.default.createElement("div",{className:A,ref:i},c)}},58843:function(g,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=a(e(85715)),d=a(e(96540)),t=a(e(57812)),o=function(s){var c=s.marked,u=s.starId;return d.default.createElement("span",{"data-star-id":u,className:t.default.star,role:"button"},c?"\u2605":"\u2606")},C=function(s){var c=s.value,u=d.default.useState(parseInt(c)||0),A=(0,l.default)(u,2),i=A[0],r=A[1],m=d.default.useState(0),O=(0,l.default)(m,2),p=O[0],b=O[1],v=function(P){var T,W=0;P!=null&&(T=P.target)!==null&&T!==void 0&&T.getAttribute("data-star-id")&&(W=P.target.getAttribute("data-star-id")),b(W)};return d.default.createElement("span",{onMouseOut:function(){return v(null)},onClick:function(P){return r(P.target.getAttribute("data-star-id")||i)},onMouseOver:v,role:"button",tabIndex:"0"},Array.from({length:5},function(D,P){return d.default.createElement(o,{starId:P+1,key:"star_".concat(P+1),marked:p?p>=P+1:i>=P+1})}),d.default.createElement("span",null,i))},E=n.default=C},59593:function(g,n,e){"use strict";var a=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=a(e(85715)),t=E(e(96540)),o=a(e(1052));function C(c){if(typeof WeakMap!="function")return null;var u=new WeakMap,A=new WeakMap;return(C=function(r){return r?A:u})(c)}function E(c,u){if(!u&&c&&c.__esModule)return c;if(c===null||l(c)!="object"&&typeof c!="function")return{default:c};var A=C(u);if(A&&A.has(c))return A.get(c);var i={__proto__:null},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var m in c)if(m!=="default"&&{}.hasOwnProperty.call(c,m)){var O=r?Object.getOwnPropertyDescriptor(c,m):null;O&&(O.get||O.set)?Object.defineProperty(i,m,O):i[m]=c[m]}return i.default=c,A&&A.set(c,i),i}var f=function(u){var A=u.children,i=u.delay,r=i===void 0?110:i,m=(0,t.useState)(0),O=(0,d.default)(m,2),p=O[0],b=O[1],v=setInterval(function(){return b(function(D){return D+1})},r);return(0,t.useEffect)(function(){p===A.length&&clearInterval(v)},[A,v,p]),(0,t.useEffect)(function(){return function(){return clearInterval(v)}},[v]),t.default.createElement(t.default.Fragment,null,A.substring(0,p),t.default.createElement("span",{className:o.default.typedCursorBlink},"|"))},s=n.default=(0,t.memo)(f)},76526:function(g,n,e){"use strict";var a=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var d=a(e(85715)),t=N(e(96540)),o=e(55290),C=e(43160),E=e(96619),f=a(e(64856)),s=e(69893),c=a(e(31456)),u=a(e(8242)),A=a(e(42916)),i=a(e(59593)),r=a(e(81740)),m=a(e(81286)),O=a(e(59409)),p=a(e(35317)),b=a(e(58843)),v=a(e(52537)),D=a(e(76017)),P=a(e(22807)),T=a(e(18903)),W=a(e(3102)),U=a(e(12770)),Z=a(e(63023)),M=a(e(44322)),k=a(e(53795)),S=a(e(85666)),R=a(e(75747)),w=e(31819),x=a(e(47443));function K(z){if(typeof WeakMap!="function")return null;var G=new WeakMap,J=new WeakMap;return(K=function($){return $?J:G})(z)}function N(z,G){if(!G&&z&&z.__esModule)return z;if(z===null||l(z)!="object"&&typeof z!="function")return{default:z};var J=K(G);if(J&&J.has(z))return J.get(z);var ne={__proto__:null},$=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var Q in z)if(Q!=="default"&&{}.hasOwnProperty.call(z,Q)){var te=$?Object.getOwnPropertyDescriptor(z,Q):null;te&&(te.get||te.set)?Object.defineProperty(ne,Q,te):ne[Q]=z[Q]}return ne.default=z,J&&J.set(z,ne),ne}var ee=function(){var G=(0,t.useState)(""),J=(0,d.default)(G,2),ne=J[0],$=J[1],Q=(0,t.useRef)(null),te=(0,t.useState)(!1),_e=(0,d.default)(te,2),se=_e[0],ae=_e[1],De=(0,t.useState)(""),ue=(0,d.default)(De,2),Oe=ue[0],Pe=ue[1],ce=(0,t.useRef)(null),Me=(0,t.useState)(function(){return""}),me=(0,d.default)(Me,2),Ee=me[0],fe=me[1],xe=(0,t.useState)(""),Ce=(0,d.default)(xe,2),le=Ce[0],Ie=Ce[1],je=(0,t.useRef)(null),Be=function(X){fe(X.target.value)},Te=function(X){Ie(X.target.value)},y=function(X){X.metaKey&&X.key==="Enter"&&(j(),X.preventDefault())},_=(0,t.useState)(["","","","","","",""]),B=(0,d.default)(_,2),h=B[0],I=B[1],j=function(){if(le.trim()!==""){var X=new AbortController;ce.current=X,F(le,Ee,X)}},L=function(){ce.current.abort(),ae(!1)},F=function(X,V,pe){Q.current="",$(Q.current);var Ue=pe.signal;ae(!0),(0,w.oneApiChat)([{content:X,role:"user"}],V,Ue).then(function(q){var H=q.headers.get("content-type");if(!q.ok||!(H!=null&&H.startsWith("text/event-stream"))||q.status!==200){if(H!=null&&H.startsWith("text/html")||H!=null&&H.startsWith("text/plain")){var Le=q.clone().text();Le.then(function(de){$(de)})}else if(H!=null&&H.startsWith("application/json")){var ke=q.clone().json();ke.then(function(de){$((0,w.prettyObject)(de))})}else $(q.statusText);ae(!1)}else{var ge,Ke=q==null||(ge=q.body)===null||ge===void 0?void 0:ge.getReader(),ve=`

`,oe="",Re="",We=function(){Ke.read().then(function(ye){var ze=ye.done,Ye=ye.value;if(ze){ae(!1);return}for(oe+=new TextDecoder().decode(Ye);oe.includes(ve);){var Se=oe.indexOf(ve),we=oe.slice(0,Se),Ae=we.split("data: ");for(var he in Ae)if(Ae[he]!==""&&Ae[he]!=="[DONE]")try{var be,ie,Xe=JSON.parse(Ae[he]),Fe=(be=(ie=Xe.choices[0])===null||ie===void 0||(ie=ie.delta)===null||ie===void 0?void 0:ie.content)!==null&&be!==void 0?be:"";Re+=Fe,Pe(new Date().toLocaleString()),Q.current=Re,$(Q.current)}catch(Ze){}oe=oe.slice(Se+ve.length)}We()}).catch(function(ye){})};We()}}).catch(function(q){ae(!1),$(q.message)})};return t.default.createElement(A.default,null,t.default.createElement("section",{style:{marginBottom:15}},t.default.createElement(i.default,null,"Cool! Hi, React & Ant Design!")),t.default.createElement("section",{className:x.default.avatar},"React version: ",t.version),t.default.createElement("section",null,"I love coding in ",t.default.createElement(m.default,{alternateText:["javascript","typescript","rect","vue"]}),"."),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(O.default,{text:"foo bar baz http://example.org bar https://github.com/wkylin/pro-react-admin"})),t.default.createElement("section",{className:x.default.line}),t.default.createElement("section",null,t.default.createElement(D.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."})),t.default.createElement("section",null,t.default.createElement(v.default,{text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?"})),t.default.createElement(b.default,{value:2}),t.default.createElement(P.default,{text:"A line bordered text."}),t.default.createElement("section",{style:{display:"flex",alignItems:"center",marginTop:10,marginBottom:40}},t.default.createElement(E.Atom,null)," ",t.default.createElement(E.Merge,null)," ",t.default.createElement(E.GitMerge,null)," ",t.default.createElement(E.GitPullRequestArrow,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(Z.default,null,t.default.createElement(p.default,{src:"https://picsum.photos/seed/picsum/300/160",alt:"Strawberries"}))),t.default.createElement("section",{style:{marginBottom:40,fontSize:36}},t.default.createElement(u.default,{options:{strings:["Software Developer.","Full Stack Developer.","Open Source Contributor."],autoStart:!0,loop:!0,deleteSpeed:50}})),t.default.createElement("section",null,t.default.createElement(T.default,null)),t.default.createElement("section",{style:{margin:40}},t.default.createElement(U.default,null)),t.default.createElement("section",{style:{margin:"60px 0 40px 40px"}},t.default.createElement("div",{className:x.default["video-box"]},t.default.createElement("div",{className:x.default["video-btn"]},"b"))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(W.default,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(s.PinInput,{onChange:function(X,V,pe){return I(pe)},values:h})),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(M.default.FadeIn,null,t.default.createElement(D.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."}))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(M.default.FadeUp,null,t.default.createElement("img",{src:"https://picsum.photos/360/200.jpg",alt:""}))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},t.default.createElement(M.default.ScaleIn,null,t.default.createElement(t.default.Fragment,null,t.default.createElement("img",{src:"https://picsum.photos/360/200/?blur=2",alt:""}),t.default.createElement("section",{className:x.default["blend-me"]},"Mix Blend Mode")))),t.default.createElement("section",{style:{marginBottom:40,height:200,width:360,overflow:"hidden"}},t.default.createElement(R.default,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(k.default,null,"Click Me")),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement("section",{className:x.default.effect}," Hello CSS")),t.default.createElement("section",{style:{marginBottom:40},className:x.default.maskBox},t.default.createElement("section",{className:x.default.watermark},"water mark"),"mask"),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement("button",{className:x.default.button},t.default.createElement("span",{className:x.default["button-label"]},"Click Me"))),t.default.createElement("section",{style:{position:"relative",margin:"80px 0 160px 50px"}},t.default.createElement("div",{className:x.default["circle-1"]}),t.default.createElement("div",{className:x.default["circle-2"]}),t.default.createElement("div",{className:x.default["circle-3"]}),t.default.createElement("div",{className:x.default["circle-4"]})),t.default.createElement("section",{style:{margin:20},className:x.default.eHElAY},"Hi, React!"),t.default.createElement("section",null,t.default.createElement("div",{className:x.default.stages},t.default.createElement("div",{className:x.default.cubeSpinner},t.default.createElement("span",{className:x.default.face1},"Web Services"),t.default.createElement("span",{className:x.default.face2},"Blockchain"),t.default.createElement("span",{className:x.default.face3},"Mobile Apps")))),t.default.createElement("section",{style:{margin:20,fontSize:40}},t.default.createElement(f.default,{start:20,end:1e4,duration:10,enableScrollSpy:!0,scrollSpyDelay:1e3})),t.default.createElement("section",{style:{width:600,margin:"30px 0"}},t.default.createElement(o.Input,{defaultValue:Ee,placeholder:"api key",onChange:Be,style:{marginBottom:20}}),t.default.createElement(o.Flex,{align:"center"},t.default.createElement(o.Input.TextArea,{ref:je,defaultValue:le,placeholder:"\u6765\uFF0C\u8BF4\u70B9\u4EC0\u4E48\u5457...Meta + Enter\u53D1\u9001",onChange:Te,onKeyDown:y,autoSize:!0,style:{width:300,height:30,caretColor:"#ff0000"}}),t.default.createElement(o.Button,{style:{margin:"0 10px"},icon:t.default.createElement(C.SendOutlined,{rotate:-60}),type:"primary",disabled:se,onClick:j},"\u53D1\u9001"),t.default.createElement(o.Button,{icon:t.default.createElement(C.SendOutlined,{rotate:-60}),type:"primary",disabled:!se,onClick:L},"\u505C\u6B62"))),t.default.createElement("section",null,se&&t.default.createElement("div",null,"\u6B63\u5728\u8F93\u5165..."),t.default.createElement("section",{style:{textAlign:"right",color:"#666"}},Oe),t.default.createElement(r.default,{markdownText:ne,isLoading:se})),t.default.createElement("section",{style:{position:"relative",height:300}},t.default.createElement(S.default,null,t.default.createElement("p",null," wave "))))},re=n.default=ee},31819:function(g,n,e){"use strict";var a=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.trimTopic=n.toFixedBug=n.toFixed=n.toCamelCase=n.sleep=n.shuffleArr=n.saveHtmlToPng=n.reqStringify=n.readFromFile=n.randomString=n.randomNum=n.randomItem=n.randomHex=n.randomColor=n.random=n.promiseWithTimeout=n.prettyObject=n.pause=n.passwordStrength=n.oneApiChat=n.limitDecimal=n.isURLSearchParams=n.isObject=n.isNotEmpty=n.isEqual=n.isEmptyArray=n.isDecimal=n.isDate=n.isDarkMode=n.isArray=n.hidePhone=n.hasFocus=n.getType=n.getRandomId=n.getParamObject=n.getImgsUrl=n.getFileType=n.getEnv=n.getCurrentDate=n.fetchSomething=n.exportJsonData=n.exportFile=n.dayDif=n.customizeTimer=n.copyTextToClipboard=n.clearCookies=n.checkIsLocalPage=n.capitalize=n.camelizeCamelCase=n.asyncTo=n.asyncAction=n.ThousandNum=n.RoundNum=n.RandomId=void 0;var l=a(e(54756)),d=a(e(29293)),t=a(e(41132)),o=a(e(73738)),C=e(55373),E=a(e(20354)),f=n.getEnv=function(){var _;return typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]"&&(_="NODE"),typeof XMLHttpRequest!="undefined"&&(_="BROWSER"),_},s=n.isArray=function(_){return(0,o.default)(_)==="object"&&Object.prototype.toString.call(_)==="[object Array]"},c=n.isURLSearchParams=function(_){return typeof URLSearchParams!="undefined"&&_ instanceof URLSearchParams},u=n.isDate=function(_){return(0,o.default)(_)==="object"&&Object.prototype.toString.call(_)==="[object Date]"},A=n.isObject=function(_){return _!==null&&(0,o.default)(_)==="object"},i=n.getParamObject=function(_){return c(_)?(0,C.parse)(_.toString(),{strictNullHandling:!0}):typeof _=="string"?[_]:_},r=n.reqStringify=function(_){return(0,C.stringify)(_,{arrayFormat:"repeat",strictNullHandling:!0})},m=n.getType=function(_){var B=Object.prototype.toString.call(_),h=/\[object (.*?)\]/.exec(B);return h?h[1]:null},O=n.hidePhone=function(_){return _==null?void 0:_.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")},p=n.asyncAction=function(_){var B=Promise.resolve(_);return function(h){B.then(function(){return setTimeout(function(){return h()})})}},b=n.getImgsUrl=function(_){var B=/<img.*?(?:>|\/>)/gi,h=/src=['"]?([^'"]*)['"]?/i,I=_.match(B);if(!I)return null;var j=I.reduce(function(L,F){var Y=F.match(h);return Y[1]?[].concat((0,t.default)(L),[Y[1]]):L},[]);return j},v=n.customizeTimer={intervalTimer:null,timeoutTimer:null,setTimeout:function(_,B){var h=this,I=Date.now,j=I(),L=j,F=function(){h.timeoutTimer=requestAnimationFrame(F),L=I(),L-j>=B&&(_(),cancelAnimationFrame(h.timeoutTimer))};return this.timeoutTimer=requestAnimationFrame(F),this.timeoutTimer},clearTimeout:function(){cancelAnimationFrame(this.timeoutTimer)},setInterval:function(_,B){var h=this,I=Date.now,j=I(),L=j,F=function(){h.intervalTimer=requestAnimationFrame(F),L=I(),L-j>=B&&(j=I(),L=j,_())};return this.intervalTimer=requestAnimationFrame(F),this.intervalTimer},clearInterval:function(){cancelAnimationFrame(this.intervalTimer)}},D=n.isDecimal=function(_){var B=/(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/;return B.test(_)},P=n.limitDecimal=function(_){return _.replace(/^(-)*(\d+)\.(\d\d).*$/,"$1$2.$3")},T=n.passwordStrength=function(_){var B=/^(?=.*[A-Z])(?=.*[\d])(?=.*[a-z]).{8,}$/;return B.test(_)},W=n.checkIsLocalPage=function(){document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")return!1;if(document.visibilityState==="visible")return!0;window.addEventListener("pagehide",function(_){_.persisted},!1)})},U=n.randomHex=function(){return"#".concat(Math.floor(Math.random()*16777215).toString(16).padEnd(6,"0"))},Z=n.clearCookies=document.cookie.split(";").forEach(function(y){return document.cookie=y.replace(/^ +/,"").replace(/[=].*/,"=;expires=".concat(new Date(0).toUTCString(),";path=/"))}),M=n.dayDif=function(_,B){return Math.ceil(Math.abs(_.getTime()-B.getTime())/864e5)},k=n.capitalize=function(_){return _.charAt(0).toUpperCase()+_.slice(1)},S=n.isNotEmpty=function(_){return Array.isArray(_)&&_.length>0},R=n.isDarkMode=window.matchMedia("(prefers-color-scheme: dark)").matches,w=n.fetchSomething=function(){return new Promise(function(_){setTimeout(function(){_("")},1e3)})},x=n.toFixed=function(_,B){if(typeof _!="number")throw new Error("number\u4E0D\u662F\u6570\u5B57");var h=Math.round(Math.pow(10,B)*_)/Math.pow(10,B);if(h=String(h),h.indexOf(".")===-1)B!==0&&(h+=".",h+=new Array(B+1).join("0"));else{var I=h.split(".");I[1].length<B&&(I[1]+=new Array(B-I[1].length+1).join("0")),h=I.join(".")}return h},K=n.toFixedBug=function(_,B){return~~(Math.pow(10,B)*_)/Math.pow(10,B)},N=n.promiseWithTimeout=function(_,B){var h=new Promise(function(I){return setTimeout(function(){return I("Time Out!")},B)});return Promise.race([h,_])},ee=n.shuffleArr=function(_){return _.sort(function(){return .5-Math.random()})},re=n.sleep=function(_){return new Promise(function(B){return setTimeout(function(){return B()},_)})},z=n.ThousandNum=function(_){return _.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},G=n.RandomId=function(_){return Math.random().toString(36).substring(3,_)},J=n.RoundNum=function(_,B){return Math.round(_*Math.pow(10,B))/Math.pow(10,B)},ne=n.randomNum=function(_,B){return Math.floor(Math.random()*(B-_+1))+_},$=n.isEmptyArray=function(_){return Array.isArray(_)&&!_.length},Q=n.randomItem=function(_){return _[Math.floor(Math.random()*_.length)]},te=n.asyncTo=function(_){return _.then(function(B){return[null,B]}).catch(function(B){return[B]})},_e=n.hasFocus=function(_){return _===document.activeElement},se=n.isEqual=function(_,B){return JSON.stringify(_)===JSON.stringify(B)},ae=n.randomString=function(){return Math.random().toString(36).slice(2)},De=n.toCamelCase=function(_){return _.trim().replace(/[-_\s]+(.)?/g,function(B,h){return h?h.toUpperCase():""})},ue=n.random=function(_,B){return Math.floor(Math.random()*(B-_+1)+_)},Oe=n.randomColor=function(){return"#".concat(Math.random().toString(16).slice(2,8).padEnd(6,"0"))},Pe=n.pause=function(_){return new Promise(function(B){return setTimeout(B,_)})},ce=n.camelizeCamelCase=function(_){return _.replace(/(?:^\w|[A-Z]|\b\w)/g,function(B,h){return h===0?B.toLowerCase():B.toUpperCase()}).replace(/\s+/g,"")},Me=n.copyTextToClipboard=function(){var y=(0,d.default)(l.default.mark(function _(B){var h;return l.default.wrap(function(j){for(;;)switch(j.prev=j.next){case 0:if(j.prev=0,!((h=navigator)!==null&&h!==void 0&&(h=h.clipboard)!==null&&h!==void 0&&h.writeText)){j.next=4;break}return j.next=4,navigator.clipboard.writeText(B);case 4:j.next=8;break;case 6:j.prev=6,j.t0=j.catch(0);case 8:case"end":return j.stop()}},_,null,[[0,6]])}));return function(B){return y.apply(this,arguments)}}(),me=n.getRandomId=function(){for(var _="",B="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",h=0;h<32;h++)_+=B.charAt(Math.floor(Math.random()*B.length));return _},Ee=n.oneApiChat=function(_,B,h){return fetch("https://api.openai.com/v1/chat/completions",{method:"POST",signal:h,headers:{Authorization:B,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:_,stream:!0})})},fe=n.getCurrentDate=function(){var _=new Date,B=_.getDate(),h=_.getMonth()+1,I=_.getFullYear();return"".concat(I,"-").concat(h,"-").concat(B)},xe=n.exportJsonData=function(_){var B=fe(),h=JSON.stringify(JSON.parse(_),null,2),I=new Blob([h],{type:"application/json"}),j=URL.createObjectURL(I),L=document.createElement("a");L.href=j,L.download="chat-store_".concat(B,".json"),document.body.appendChild(L),L.click(),document.body.removeChild(L)},Ce=n.saveHtmlToPng=function(){var y=(0,d.default)(l.default.mark(function _(B,h,I){var j,L,F,Y;return l.default.wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return V.prev=0,j=B!=null?B:document.getElementById("image-wrapper"),V.next=4,(0,E.default)(j,{useCORS:!0});case 4:L=V.sent,F=L.toDataURL("image/png"),Y=document.createElement("a"),Y.style.display="none",Y.href=F,Y.setAttribute("download","chat-shot.png"),typeof Y.download=="undefined"&&Y.setAttribute("target","_blank"),document.body.appendChild(Y),Y.click(),document.body.removeChild(Y),window.URL.revokeObjectURL(F),h&&h(),Promise.resolve(),V.next=22;break;case 19:V.prev=19,V.t0=V.catch(0),I&&I(V.t0.message);case 22:case"end":return V.stop()}},_,null,[[0,19]])}));return function(B,h,I){return y.apply(this,arguments)}}(),le=n.trimTopic=function(_){return _.replace(/[，。！？”“"、,.!?]*$/,"")},Ie=n.readFromFile=function(){return new Promise(function(_,B){var h=document.createElement("input");h.type="file",h.accept="application/json",h.onchange=function(I){var j=I.target.files[0],L=new FileReader;L.onload=function(F){_(F.target.result)},L.onerror=function(F){return B(new Error(F))},L.readAsText(j)},h.click()})},je=n.prettyObject=function(_){var B="";return typeof _!="string"&&(B=JSON.stringify(_,null,"  ")),B==="{}"?B.toString():B.startsWith("```json")?B:["```json",B,"```"].join(`
`)},Be=n.getFileType=function(_,B){var h=B.split(".").pop().toLowerCase();switch(h){case"txt":return"text/plain";case"json":return"application/json";case"doc":return"application/msword";case"docx":return"application/vnd.openxmlformats-officedocument.wordprocessingml.document";case"xls":return"application/vnd.ms-excel";case"xlsx":return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";case"ppt":return"application/vnd.ms-powerpoint";case"pptx":return"application/vnd.openxmlformats-officedocument.presentationml.presentation";case"pdf":return"application/pdf";case"jpg":case"jpeg":return"image/jpeg";case"png":return"image/png";case"gif":return"image/gif";case"zip":return"application/zip";case"rar":return"application/x-rar-compressed";default:if(typeof _=="string")try{return JSON.parse(_),"application/json"}catch(I){return"text/plain"}else return _ instanceof Uint8Array||_ instanceof ArrayBuffer,"application/octet-stream"}},Te=n.exportFile=function(_,B){var h;if((_==null||(h=_.headers["content-type"])===null||h===void 0?void 0:h.indexOf("application/json"))===-1){var I=_.headers&&_.headers["content-disposition"]||"attachment;filename=".concat(B||"file",".xlsx"),j=decodeURI(I==null?void 0:I.split("=")[1].replace(/'/g,"")).replace(/"/g,"").replace("utf-8''","")||"",L=Be(_.data,B||j),F=new Blob([_.data],{type:L}),Y=URL.createObjectURL(F),X=document.createElement("a");document.body.appendChild(X),X.style="display: none",X.href=Y,X.download=j,X.click(),document.body.removeChild(X)}}},25039:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(47122),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},48122:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(61543),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},57903:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(9666),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},21958:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(97669),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},39726:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(27825),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},49511:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(90958),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},84576:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(80711),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},85120:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(45789),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},61352:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(91869),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},89696:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(22211),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},89200:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(38791),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},49887:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(6988),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},91193:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(41742),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},57812:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(20335),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},1052:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(38413),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},47443:function(g,n,e){"use strict";e.r(n);var a=e(85072),l=e.n(a),d=e(97825),t=e.n(d),o=e(77659),C=e.n(o),E=e(55056),f=e.n(E),s=e(10540),c=e.n(s),u=e(41113),A=e.n(u),i=e(37318),r={};r.styleTagTransform=A(),r.setAttributes=f(),r.insert=C().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=l()(i.A,r);n.default=i.A&&i.A.locals?i.A.locals:void 0},82547:function(g){"use strict";g.exports="data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 4%27%3E%3Cstyle type=%27text/css%27%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX%280%29;}to {transform:translateX%28-15px%29;}}%3C/style%3E%3Cpath fill=%27none%27 stroke=%27%230087ca%27 stroke-width=%272%27 class=%27squiggle%27 d=%27M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3%27/%3E%3C/svg%3E"},42634:function(){}}]);

//# sourceMappingURL=267.bd39d2068958f8dec878.js.map