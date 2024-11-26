(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[267],{65548:function(p,e,n){"use strict";var r=n(24994),l=n(73738);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var A=r(n(43693)),t=m(n(96540)),o=n(74848);function B(_){if(typeof WeakMap!="function")return null;var i=new WeakMap,a=new WeakMap;return(B=function(O){return O?a:i})(_)}function m(_,i){if(!i&&_&&_.__esModule)return _;if(_===null||l(_)!="object"&&typeof _!="function")return{default:_};var a=B(i);if(a&&a.has(_))return a.get(_);var E={__proto__:null},O=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in _)if(g!=="default"&&{}.hasOwnProperty.call(_,g)){var b=O?Object.getOwnPropertyDescriptor(_,g):null;b&&(b.get||b.set)?Object.defineProperty(E,g,b):E[g]=_[g]}return E.default=_,a&&a.set(_,E),E}function C(_,i){var a=Object.keys(_);if(Object.getOwnPropertySymbols){var E=Object.getOwnPropertySymbols(_);i&&(E=E.filter(function(O){return Object.getOwnPropertyDescriptor(_,O).enumerable})),a.push.apply(a,E)}return a}function d(_){for(var i=1;i<arguments.length;i++){var a=arguments[i]!=null?arguments[i]:{};i%2?C(Object(a),!0).forEach(function(E){(0,A.default)(_,E,a[E])}):Object.getOwnPropertyDescriptors?Object.defineProperties(_,Object.getOwnPropertyDescriptors(a)):C(Object(a)).forEach(function(E){Object.defineProperty(_,E,Object.getOwnPropertyDescriptor(a,E))})}return _}var c=function(i){return(0,o.jsxs)("svg",d(d({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"#fff",viewBox:"0 0 120 30"},i),{},{children:[(0,o.jsxs)("circle",{cx:15,cy:15,r:15,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]}),(0,o.jsxs)("circle",{cx:60,cy:15,r:9,fillOpacity:.3,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:9,repeatCount:"indefinite",to:9,values:"9;15;9"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:.5,repeatCount:"indefinite",to:.5,values:".5;1;.5"})]}),(0,o.jsxs)("circle",{cx:105,cy:15,r:15,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]})]}))},u=e.default=c},47122:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`.alternating--mj1_d {
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
`],sourceRoot:""}]),o.locals={alternating:"alternating--mj1_d","alternating-text":"alternating-text--p6lWH",alternatingText:"alternating-text--p6lWH"},e.A=o},61543:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`.btn--Vmubv {
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
`],sourceRoot:""}]),o.locals={btn:"btn--Vmubv",content:"content--jujDv","btn-ripple":"btn-ripple--w2aOn",btnRipple:"btn-ripple--w2aOn",ripple:"ripple--oIc_l","btn-ripple-container":"btn-ripple-container--II62b",btnRippleContainer:"btn-ripple-container--II62b"},e.A=o},9666:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`.hIBkFg--xUSDY {
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
`],sourceRoot:""}]),o.locals={hIBkFg:"hIBkFg--xUSDY",kqOLaE:"kqOLaE--z4koa","bz-an":"bz-an--moL5G",bzAn:"bz-an--moL5G"},e.A=o},97669:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=n(4417),B=n.n(o),m=new URL(n(82547),n.b),C=t()(l()),d=B()(m);C.push([p.id,`a.squiggle--JQRWj {
  background-image: linear-gradient(to bottom, #0087ca 0%, #0087ca 100%);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 1px 1px;
  color: inherit;
  text-decoration: none;
}

a.squiggle--JQRWj:hover {
  background-image: url(`+d+`);
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
`],sourceRoot:""}]),C.locals={squiggle:"squiggle--JQRWj"},e.A=C},27825:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`.avatarCard--kIii3 {
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
`],sourceRoot:""}]),o.locals={avatarCard:"avatarCard--kIii3",card:"card--W_bZq",content:"content--yiHmV"},e.A=o},90958:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`.breatheItem--VaM9v {
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
`],sourceRoot:""}]),o.locals={breatheItem:"breatheItem--VaM9v",breathe:"breathe--wA3l6",loopRotate:"loopRotate--GRmod",loop:"loop--Q7Ru6",outside:"outside--NZwXf",inner:"inner--ZClIQ",text:"text--FGKfx","play-button":"play-button--Wg3em",playButton:"play-button--Wg3em","zoom-in-zoom-out":"zoom-in-zoom-out--alaL8",zoomInZoomOut:"zoom-in-zoom-out--alaL8","div-block":"div-block--OwsxA",divBlock:"div-block--OwsxA","div-block-1019":"div-block-1019--iYyTM",divBlock1019:"div-block-1019--iYyTM","div-block-1021":"div-block-1021--EWkRm",divBlock1021:"div-block-1021--EWkRm",code:"code--Wc_Yz",trans:"trans--jcajC"},e.A=o},80711:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`.gradientTracking--FyamC {
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
`],sourceRoot:""}]),o.locals={gradientTracking:"gradientTracking--FyamC"},e.A=o},45789:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`.isometricCard--mEKMm {
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
`],sourceRoot:""}]),o.locals={isometricCard:"isometricCard--mEKMm"},e.A=o},91869:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`.hoverRotate--ew29g {
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
`],sourceRoot:""}]),o.locals={hoverRotate:"hoverRotate--ew29g"},e.A=o},22211:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`.lineBordered--bh05r {
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
`],sourceRoot:""}]),o.locals={lineBordered:"lineBordered--bh05r","hover-underline-animation":"hover-underline-animation--TSfGP",hoverUnderlineAnimation:"hover-underline-animation--TSfGP",left:"left--ErwKf",center:"center--BFLFI",right:"right--DRVwU","dynamic-shadow":"dynamic-shadow--Us2nj",dynamicShadow:"dynamic-shadow--Us2nj","image-contain":"image-contain--Z_yfM",imageContain:"image-contain--Z_yfM","image-cover":"image-cover--ZVSiS",imageCover:"image-cover--ZVSiS",container:"container--lADY1",top:"top--XQMfF",bottom:"bottom--P1bZI","no-scrollbars":"no-scrollbars--AUOMQ",noScrollbars:"no-scrollbars--AUOMQ","engraved-text":"engraved-text--dMPwS",engravedText:"engraved-text--dMPwS","embossed-text":"embossed-text--eQZ0_",embossedText:"embossed-text--eQZ0_"},e.A=o},38791:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`.background--V0AeH {
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
`],sourceRoot:""}]),o.locals={background:"background--V0AeH","move-background":"move-background--h74DC",moveBackground:"move-background--h74DC"},e.A=o},6988:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`.markdownBody--xUrgB {\r
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
`],sourceRoot:""}]),o.locals={markdownBody:"markdownBody--xUrgB",loadingIcon:"loadingIcon--VpAmv",copySection:"copySection--aJHtb",lang:"lang--SO0lS",copySpan:"copySpan--u4qzC",preCode:"preCode--s6faO"},e.A=o},41742:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`/* Perspective card */
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
`],sourceRoot:""}]),o.locals={"perspective-card":"perspective-card--fRasE",perspectiveCard:"perspective-card--fRasE",shiftingCard:"shiftingCard--ejZ4B",cardAnimation:"cardAnimation--uMV0q"},e.A=o},20335:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`.star--H6zRP {
  color: #f93;
  cursor: pointer;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/StarRating/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,eAAe;AACjB",sourcesContent:[`.star {
  color: #f93;
  cursor: pointer;
}
`],sourceRoot:""}]),o.locals={star:"star--H6zRP"},e.A=o},38413:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`.typedCursorBlink--bnrB1 {
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
`],sourceRoot:""}]),o.locals={typedCursorBlink:"typedCursorBlink--bnrB1","typed-blink":"typed-blink--GZUvL",typedBlink:"typed-blink--GZUvL"},e.A=o},37318:function(p,e,n){"use strict";var r=n(71354),l=n.n(r),A=n(76314),t=n.n(A),o=t()(l());o.push([p.id,`.avatar--tAk6h {
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
`],sourceRoot:""}]),o.locals={avatar:"avatar--tAk6h",levitate:"levitate--RZCwS",maskBox:"maskBox--uAYjJ",watermark:"watermark--YUolT","blend-me":"blend-me--f5L11",blendMe:"blend-me--f5L11","move-me":"move-me--FUPwc",moveMe:"move-me--FUPwc",button:"button--GgsIa","button-label":"button-label--d_jxl",buttonLabel:"button-label--d_jxl","circle-1":"circle-1--kJj6k",circle1:"circle-1--kJj6k",expand:"expand--kmoUS","circle-2":"circle-2--YMeVl",circle2:"circle-2--YMeVl","expand-opacity":"expand-opacity--XzitQ",expandOpacity:"expand-opacity--XzitQ","circle-3":"circle-3--DvCUJ",circle3:"circle-3--DvCUJ","circle-4":"circle-4--UkUyn",circle4:"circle-4--UkUyn",line:"line--Lp5NS",eHElAY:"eHElAY--ul0hZ",eHElAy:"eHElAY--ul0hZ","dv-wu":"dv-wu--sf_Ta",dvWu:"dv-wu--sf_Ta",stages:"stages--wh47k","spin-cube":"spin-cube--eXtsy",spinCube:"spin-cube--eXtsy",cubeSpinner:"cubeSpinner--eOJc0",face1:"face1--KIPp1",face2:"face2--aYKpi",face3:"face3--M7CTV","video-box":"video-box--RWlhc",videoBox:"video-box--RWlhc","video-btn":"video-btn--PPzlz",videoBtn:"video-btn--PPzlz",ripple:"ripple--Ojifa",effect:"effect--mKRM4","effect-1":"effect-1--LXEum",effect1:"effect-1--LXEum"},e.A=o},81286:function(p,e,n){"use strict";var r=n(24994),l=n(73738);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var A=B(n(96540)),t=r(n(25039));function o(d){if(typeof WeakMap!="function")return null;var c=new WeakMap,u=new WeakMap;return(o=function(i){return i?u:c})(d)}function B(d,c){if(!c&&d&&d.__esModule)return d;if(d===null||l(d)!="object"&&typeof d!="function")return{default:d};var u=o(c);if(u&&u.has(d))return u.get(d);var _={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in d)if(a!=="default"&&{}.hasOwnProperty.call(d,a)){var E=i?Object.getOwnPropertyDescriptor(d,a):null;E&&(E.get||E.set)?Object.defineProperty(_,a,E):_[a]=d[a]}return _.default=d,u&&u.set(d,_),_}var m=function(c){var u=c.alternateText,_=u===void 0?[]:u;return(0,A.useEffect)(function(){var i=document.getElementById("alternating-text"),a=0,E=function(g){a=a<_.length-1?a+1:0,i.innerHTML=_[a]};return i.innerHTML=_[0],i.addEventListener("animationiteration",E,!1),function(){i.removeEventListener("animationiteration",E,!1)}},[]),A.default.createElement("span",{className:t.default.alternating,id:"alternating-text"},_[0]||"Text goes here")},C=e.default=m},44322:function(p,e,n){"use strict";var r=n(24994),l=n(73738);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var A=r(n(43693)),t=r(n(85715)),o=m(n(96540));function B(g){if(typeof WeakMap!="function")return null;var b=new WeakMap,v=new WeakMap;return(B=function(x){return x?v:b})(g)}function m(g,b){if(!b&&g&&g.__esModule)return g;if(g===null||l(g)!="object"&&typeof g!="function")return{default:g};var v=B(b);if(v&&v.has(g))return v.get(g);var D={__proto__:null},x=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var R in g)if(R!=="default"&&{}.hasOwnProperty.call(g,R)){var U=x?Object.getOwnPropertyDescriptor(g,R):null;U&&(U.get||U.set)?Object.defineProperty(D,R,U):D[R]=g[R]}return D.default=g,v&&v.set(g,D),D}function C(g,b){var v=Object.keys(g);if(Object.getOwnPropertySymbols){var D=Object.getOwnPropertySymbols(g);b&&(D=D.filter(function(x){return Object.getOwnPropertyDescriptor(g,x).enumerable})),v.push.apply(v,D)}return v}function d(g){for(var b=1;b<arguments.length;b++){var v=arguments[b]!=null?arguments[b]:{};b%2?C(Object(v),!0).forEach(function(D){(0,A.default)(g,D,v[D])}):Object.getOwnPropertyDescriptors?Object.defineProperties(g,Object.getOwnPropertyDescriptors(v)):C(Object(v)).forEach(function(D){Object.defineProperty(g,D,Object.getOwnPropertyDescriptor(v,D))})}return g}var c=function(b){var v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"0px",D=(0,o.useState)(!0),x=(0,t.default)(D,2),R=x[0],U=x[1];return(0,o.useEffect)(function(){var K=new IntersectionObserver(function(Q){var T=(0,t.default)(Q,1),L=T[0];U(L.isIntersecting)},{rootMargin:v});return b.current&&K.observe(b.current),function(){b.current&&K.unobserve(b.current)}},[]),R},u=function(b){var v=b.from,D=b.to,x=b.children,R=(0,o.useRef)(null),U=c(R),K={transition:"1000ms ease-in-out"};return o.default.createElement("div",{ref:R,style:U?d(d({},K),D):d(d({},K),v)},x)},_=function(b){var v=b.children;return o.default.createElement(u,{from:{opacity:0},to:{opacity:1}},v)},i=function(b){var v=b.children;return o.default.createElement(u,{from:{opacity:0,translate:"0 2rem"},to:{opacity:1,translate:"none"}},v)},a=function(b){var v=b.children;return o.default.createElement(u,{from:{scale:"0"},to:{scale:"1"}},v)},E={FadeIn:_,FadeUp:i,ScaleIn:a},O=e.default=E},53795:function(p,e,n){"use strict";var r=n(24994),l=n(73738);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var A=r(n(94634)),t=r(n(91847)),o=r(n(85715)),B=c(n(96540)),m=r(n(48122)),C=["children","onClick"];function d(a){if(typeof WeakMap!="function")return null;var E=new WeakMap,O=new WeakMap;return(d=function(b){return b?O:E})(a)}function c(a,E){if(!E&&a&&a.__esModule)return a;if(a===null||l(a)!="object"&&typeof a!="function")return{default:a};var O=d(E);if(O&&O.has(a))return O.get(a);var g={__proto__:null},b=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in a)if(v!=="default"&&{}.hasOwnProperty.call(a,v)){var D=b?Object.getOwnPropertyDescriptor(a,v):null;D&&(D.get||D.set)?Object.defineProperty(g,v,D):g[v]=a[v]}return g.default=a,O&&O.set(a,g),g}var u=function(){var E=B.default.useState({x:-1,y:-1}),O=(0,o.default)(E,2),g=O[0],b=g.x,v=g.y,D=O[1],x=b!==-1&&v!==-1,R=function(K){var Q=K.currentTarget.getBoundingClientRect(),T=Q.left,L=Q.top;D({x:K.clientX-T,y:K.clientY-L}),setTimeout(function(){D({x:-1,y:-1})},300)};return{x:b,y:v,handleRippleOnClick:R,isRippling:x}},_=function(E){var O=E.children,g=E.onClick,b=(0,t.default)(E,C),v=u(),D=v.x,x=v.y,R=v.handleRippleOnClick,U=v.isRippling,K=function(T){R(T),g&&g(T)};return B.default.createElement("button",(0,A.default)({type:"button",onClick:K,className:m.default.btn},b),B.default.createElement("span",{className:m.default.content},O),U&&B.default.createElement("div",{className:m.default["btn-ripple-container"]},B.default.createElement("span",{className:m.default["btn-ripple"],style:{left:D,top:x}})))},i=e.default=_},85666:function(p,e,n){"use strict";var r=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=r(n(96540)),A=r(n(57903)),t=function(m){var C=m.children;return l.default.createElement(l.default.Fragment,null,l.default.createElement("section",{className:A.default.hIBkFg},l.default.createElement("h2",null,"Design and code"," ",l.default.createElement("span",{className:A.default.kqOLaE},l.default.createElement("span",null,"R"),l.default.createElement("span",null,"e"),l.default.createElement("span",null,"a"),l.default.createElement("span",null,"c"),l.default.createElement("span",null,"t"))," ","apps")))},o=e.default=t},59409:function(p,e,n){"use strict";var r=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=r(n(96540)),A=r(n(21958)),t=function(m){var C=m.text,d=/((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;return l.default.createElement(l.default.Fragment,null,C.split(d).map(function(c,u){var _=c.match(d);if(_){var i=_[0];return l.default.createElement("a",{key:u,className:A.default.squiggle,target:"_blank",href:i.startsWith("http")?i:"http://".concat(i)},i)}return c}))},o=e.default=t},76017:function(p,e,n){"use strict";var r=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=r(n(96540)),A=r(n(39726)),t=function(m){var C=m.avatar,d=m.text;return l.default.createElement("div",{className:A.default.avatarCard},l.default.createElement("div",{className:A.default.card},l.default.createElement("figure",null,l.default.createElement("img",{alt:"",src:C,className:A.default.avatar})),l.default.createElement("p",{className:A.default.content},d)))},o=e.default=t},12770:function(p,e,n){"use strict";var r=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=r(n(96540)),A=r(n(49511)),t=function(){return l.default.createElement(l.default.Fragment,null,l.default.createElement("section",{className:A.default.breatheItem},l.default.createElement("span",null,"Breathe")))},o=e.default=t},42916:function(p,e,n){"use strict";var r=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=r(n(43693)),A=r(n(96540));function t(C,d){var c=Object.keys(C);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(C);d&&(u=u.filter(function(_){return Object.getOwnPropertyDescriptor(C,_).enumerable})),c.push.apply(c,u)}return c}function o(C){for(var d=1;d<arguments.length;d++){var c=arguments[d]!=null?arguments[d]:{};d%2?t(Object(c),!0).forEach(function(u){(0,l.default)(C,u,c[u])}):Object.getOwnPropertyDescriptors?Object.defineProperties(C,Object.getOwnPropertyDescriptors(c)):t(Object(c)).forEach(function(u){Object.defineProperty(C,u,Object.getOwnPropertyDescriptor(c,u))})}return C}var B=function(d){var c=d.style,u=d.children;return A.default.createElement("div",{style:o({width:"100%",minHeight:"calc(100vh - 232px)"},c)},u)},m=e.default=B},18903:function(p,e,n){"use strict";var r=n(24994),l=n(73738);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var A=B(n(96540)),t=r(n(84576));function o(d){if(typeof WeakMap!="function")return null;var c=new WeakMap,u=new WeakMap;return(o=function(i){return i?u:c})(d)}function B(d,c){if(!c&&d&&d.__esModule)return d;if(d===null||l(d)!="object"&&typeof d!="function")return{default:d};var u=o(c);if(u&&u.has(d))return u.get(d);var _={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in d)if(a!=="default"&&{}.hasOwnProperty.call(d,a)){var E=i?Object.getOwnPropertyDescriptor(d,a):null;E&&(E.get||E.set)?Object.defineProperty(_,a,E):_[a]=d[a]}return _.default=d,u&&u.set(d,_),_}var m=function(){var c=(0,A.useRef)(null);return(0,A.useLayoutEffect)(function(){var u=c.current,_=function(a){var E=a.target.getBoundingClientRect(),O=a.clientX-E.left,g=a.clientY-E.top;u.style.setProperty("--x",O+"px"),u.style.setProperty("--y",g+"px")};return u.addEventListener("mousemove",_),function(){u.removeEventListener("mousemove",_)}},[]),A.default.createElement("button",{className:t.default.gradientTracking,ref:c},A.default.createElement("span",null,"Hover me"))},C=e.default=m},52537:function(p,e,n){"use strict";var r=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=r(n(96540)),A=r(n(85120)),t=function(m){var C=m.text;return l.default.createElement("div",{className:A.default.isometricCard},l.default.createElement("p",null,C))},o=e.default=t},35317:function(p,e,n){"use strict";var r=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=r(n(94634)),A=r(n(85715)),t=r(n(91847)),o=r(n(96540)),B=r(n(61352)),m=["alt","src","className","loadInitially","observerOptions"],C=function(u){var _=u.alt,i=u.src,a=u.className,E=u.loadInitially,O=E===void 0?!1:E,g=u.observerOptions,b=g===void 0?{root:null,rootMargin:"200px 0px"}:g,v=(0,t.default)(u,m),D=o.default.useRef(null),x=o.default.useRef(null),R=o.default.useState(O),U=(0,A.default)(R,2),K=U[0],Q=U[1],T=o.default.useCallback(function(L){L[0].isIntersecting&&(D.current.disconnect(),Q(!0))},[D]);return o.default.useEffect(function(){if(!O){if("loading"in HTMLImageElement.prototype){Q(!0);return}return D.current=new IntersectionObserver(T,b),D.current.observe(x.current),function(){D.current.disconnect()}}},[]),o.default.createElement("figure",{className:B.default.hoverRotate},o.default.createElement("img",(0,l.default)({alt:_,src:K?i:"",ref:x,className:a,loading:O?void 0:"lazy"},v)),o.default.createElement("figcaption",null,o.default.createElement("h3",null,"Lorem ",o.default.createElement("br",null),"Ipsum")))},d=e.default=C},22807:function(p,e,n){"use strict";var r=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=r(n(96540)),A=r(n(89696)),t=function(m){var C=m.text;return l.default.createElement("span",{className:A.default.lineBordered},C)},o=e.default=t},75747:function(p,e,n){"use strict";var r=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=r(n(96540)),A=r(n(89200)),t=function(m){return l.default.createElement("div",{style:{position:"relative",height:"100%"}},l.default.createElement("div",{className:A.default.background},"Mesh Gradient Background"))},o=e.default=t},81740:function(p,e,n){"use strict";var r=n(24994),l=n(73738);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var A=r(n(54756)),t=r(n(94634)),o=r(n(85715)),B=r(n(29293)),m=x(n(96540)),C=n(8768),d=r(n(43160)),c=r(n(41512)),u=r(n(54152)),_=r(n(63940)),i=r(n(37948)),a=r(n(73410)),E=r(n(51687)),O=r(n(22802)),g=n(81591),b=r(n(65548));n(35819);var v=r(n(49887));function D(T){if(typeof WeakMap!="function")return null;var L=new WeakMap,P=new WeakMap;return(D=function(X){return X?P:L})(T)}function x(T,L){if(!L&&T&&T.__esModule)return T;if(T===null||l(T)!="object"&&typeof T!="function")return{default:T};var P=D(L);if(P&&P.has(T))return P.get(T);var S={__proto__:null},X=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var Z in T)if(Z!=="default"&&{}.hasOwnProperty.call(T,Z)){var z=X?Object.getOwnPropertyDescriptor(T,Z):null;z&&(z.get||z.set)?Object.defineProperty(S,Z,z):S[Z]=T[Z]}return S.default=T,P&&P.set(T,S),S}var R=function(){var T=(0,B.default)(A.default.mark(function L(P){var S,X;return A.default.wrap(function(z){for(;;)switch(z.prev=z.next){case 0:if(z.prev=0,!((S=navigator)!==null&&S!==void 0&&(S=S.clipboard)!==null&&S!==void 0&&S.writeText)){z.next=5;break}return z.next=4,navigator.clipboard.writeText(P);case 4:C.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F");case 5:z.next=16;break;case 7:z.prev=7,z.t0=z.catch(0),X=document.createElement("textarea"),X.value=P,document.body.appendChild(X),X.focus(),X.select();try{document.execCommand("copy"),C.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F")}catch(W){C.message.success("\u590D\u5236\u5230\u526A\u8D34\u677F\u5931\u8D25")}document.body.removeChild(X);case 16:case"end":return z.stop()}},L,null,[[0,7]])}));return function(P){return T.apply(this,arguments)}}(),U=function(L){var P,S=(0,m.useRef)(null),X=(P=S.current)===null||P===void 0?void 0:P.innerText,Z=(0,m.useRef)(""),z=(0,g.useDebouncedCallback)(function(){if(S.current){var W=S.current.querySelector("code"),N=W.className,F=/language-(\w+)/.exec(N||"");if(F){var G=(0,o.default)(F,2),V=G[1];Z.current=V}}},800);return(0,m.useEffect)(function(){setTimeout(z,1)},[X]),m.default.createElement("section",null,m.default.createElement("section",{className:v.default.copySection},m.default.createElement("span",{className:v.default.lang},Z.current),m.default.createElement("span",{className:v.default.copySpan,role:"button",onClick:function(){if(S.current){var N=S.current.innerText;R(N)}}},"\u590D\u5236\u4EE3\u7801")),m.default.createElement("pre",{className:v.default.preCode,ref:S},L.children))},K=function(L){var P=L.markdownText,S=P===void 0?"":P,X=L.isLoading,Z=X===void 0?!1:X;return m.default.createElement("section",{className:v.default.markdownBody},Z&&!S&&m.default.createElement(d.default,{component:b.default,style:{color:"#fff"},className:v.default.loadingIcon}),S&&m.default.createElement(c.default,{remarkPlugins:[u.default,a.default,_.default],rehypePlugins:[i.default,O.default,[E.default,{detect:!1,ignoreMissing:!0}]],components:{pre:U,p:function(W){return m.default.createElement("p",(0,t.default)({},W,{dir:"auto"}))},a:function(W){var N,F=W.href||"",G=/^\/#/i.test(F),V=G?"_self":(N=W.target)!==null&&N!==void 0?N:"_blank";return m.default.createElement("a",(0,t.default)({},W,{target:V}))}}},S))},Q=e.default=K},63023:function(p,e,n){"use strict";var r=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=r(n(96540)),A=n(23947),t=function(m){var C=m.children;return l.default.createElement(A.motion.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{ease:"linear",duration:1,y:{duration:.5}}},C)},o=e.default=t},3102:function(p,e,n){"use strict";var r=n(24994),l=n(73738);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var A=B(n(96540)),t=r(n(91193));function o(d){if(typeof WeakMap!="function")return null;var c=new WeakMap,u=new WeakMap;return(o=function(i){return i?u:c})(d)}function B(d,c){if(!c&&d&&d.__esModule)return d;if(d===null||l(d)!="object"&&typeof d!="function")return{default:d};var u=o(c);if(u&&u.has(d))return u.get(d);var _={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in d)if(a!=="default"&&{}.hasOwnProperty.call(d,a)){var E=i?Object.getOwnPropertyDescriptor(d,a):null;E&&(E.get||E.set)?Object.defineProperty(_,a,E):_[a]=d[a]}return _.default=d,u&&u.set(d,_),_}var m=function(){var c=(0,A.useRef)(null);return(0,A.useLayoutEffect)(function(){var u=c.current,_=u.getBoundingClientRect(),i=_.x,a=_.y,E=_.width,O=E===void 0?240:E,g=_.height,b=g===void 0?360:g,v=i+(O||240)/2,D=a+(b||360)/2,x=function(K){var Q=K.pageX,T=K.pageY,L=(v-Q)/((O||240)/2),P=(D-T)/((b||360)/2);u.style.setProperty("--dx",L),u.style.setProperty("--dy",P)},R=function(){u.style.setProperty("--dx",0),u.style.setProperty("--dy",0)};return u.addEventListener("mousemove",x),u.addEventListener("mouseleave",R),function(){u.removeEventListener("mousemove",x),u.removeEventListener("mouseleave",R)}},[]),A.default.createElement("div",{ref:c,className:t.default.shiftingCard},A.default.createElement("h3",null,"Shifting Card"))},C=e.default=m},58843:function(p,e,n){"use strict";var r=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=r(n(85715)),A=r(n(96540)),t=r(n(57812)),o=function(d){var c=d.marked,u=d.starId;return A.default.createElement("span",{"data-star-id":u,className:t.default.star,role:"button"},c?"\u2605":"\u2606")},B=function(d){var c=d.value,u=A.default.useState(parseInt(c)||0),_=(0,l.default)(u,2),i=_[0],a=_[1],E=A.default.useState(0),O=(0,l.default)(E,2),g=O[0],b=O[1],v=function(x){var R,U=0;x!=null&&(R=x.target)!==null&&R!==void 0&&R.getAttribute("data-star-id")&&(U=x.target.getAttribute("data-star-id")),b(U)};return A.default.createElement("span",{onMouseOut:function(){return v(null)},onClick:function(x){return a(x.target.getAttribute("data-star-id")||i)},onMouseOver:v,role:"button",tabIndex:"0"},Array.from({length:5},function(D,x){return A.default.createElement(o,{starId:x+1,key:"star_".concat(x+1),marked:g?g>=x+1:i>=x+1})}),A.default.createElement("span",null,i))},m=e.default=B},59593:function(p,e,n){"use strict";var r=n(24994),l=n(73738);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var A=r(n(85715)),t=m(n(96540)),o=r(n(1052));function B(c){if(typeof WeakMap!="function")return null;var u=new WeakMap,_=new WeakMap;return(B=function(a){return a?_:u})(c)}function m(c,u){if(!u&&c&&c.__esModule)return c;if(c===null||l(c)!="object"&&typeof c!="function")return{default:c};var _=B(u);if(_&&_.has(c))return _.get(c);var i={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var E in c)if(E!=="default"&&{}.hasOwnProperty.call(c,E)){var O=a?Object.getOwnPropertyDescriptor(c,E):null;O&&(O.get||O.set)?Object.defineProperty(i,E,O):i[E]=c[E]}return i.default=c,_&&_.set(c,i),i}var C=function(u){var _=u.children,i=u.delay,a=i===void 0?110:i,E=(0,t.useState)(0),O=(0,A.default)(E,2),g=O[0],b=O[1],v=setInterval(function(){return b(function(D){return D+1})},a);return(0,t.useEffect)(function(){g===_.length&&clearInterval(v)},[_,v,g]),(0,t.useEffect)(function(){return function(){return clearInterval(v)}},[v]),t.default.createElement(t.default.Fragment,null,_.substring(0,g),t.default.createElement("span",{className:o.default.typedCursorBlink},"|"))},d=e.default=(0,t.memo)(C)},76526:function(p,e,n){"use strict";var r=n(24994),l=n(73738);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var A=r(n(85715)),t=X(n(96540)),o=n(8768),B=n(43160),m=n(69739),C=n(69893),d=r(n(42916)),c=r(n(59593)),u=r(n(81740)),_=r(n(81286)),i=r(n(59409)),a=r(n(35317)),E=r(n(58843)),O=r(n(52537)),g=r(n(76017)),b=r(n(22807)),v=r(n(18903)),D=r(n(3102)),x=r(n(12770)),R=r(n(63023)),U=r(n(44322)),K=r(n(53795)),Q=r(n(85666)),T=r(n(75747)),L=n(31819),P=r(n(47443));function S(W){if(typeof WeakMap!="function")return null;var N=new WeakMap,F=new WeakMap;return(S=function(V){return V?F:N})(W)}function X(W,N){if(!N&&W&&W.__esModule)return W;if(W===null||l(W)!="object"&&typeof W!="function")return{default:W};var F=S(N);if(F&&F.has(W))return F.get(W);var G={__proto__:null},V=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var H in W)if(H!=="default"&&{}.hasOwnProperty.call(W,H)){var q=V?Object.getOwnPropertyDescriptor(W,H):null;q&&(q.get||q.set)?Object.defineProperty(G,H,q):G[H]=W[H]}return G.default=W,F&&F.set(W,G),G}var Z=function(){var N=(0,t.useState)(""),F=(0,A.default)(N,2),G=F[0],V=F[1],H=(0,t.useRef)(null),q=(0,t.useState)(!1),ln=(0,A.default)(q,2),an=ln[0],nn=ln[1],vn=(0,t.useState)(""),dn=(0,A.default)(vn,2),yn=dn[0],hn=dn[1],An=(0,t.useRef)(null),bn=(0,t.useState)(function(){return""}),_n=(0,A.default)(bn,2),un=_n[0],Dn=_n[1],On=(0,t.useState)(""),cn=(0,A.default)(On,2),rn=cn[0],Pn=cn[1],Mn=(0,t.useRef)(null),xn=function(M){Dn(M.target.value)},In=function(M){Pn(M.target.value)},Tn=function(M){M.metaKey&&M.key==="Enter"&&(f(),M.preventDefault())},mn=(0,t.useState)(["","","","","","",""]),En=(0,A.default)(mn,2),y=En[0],s=En[1],f=function(){if(rn.trim()!==""){var M=new AbortController;An.current=M,j(rn,un,M)}},h=function(){An.current.abort(),nn(!1)},j=function(M,Y,w){H.current="",V(H.current);var $=w.signal;nn(!0),(0,L.oneApiChat)([{content:M,role:"user"}],Y,$).then(function(k){var J=k.headers.get("content-type");if(!k.ok||!(J!=null&&J.startsWith("text/event-stream"))||k.status!==200){if(J!=null&&J.startsWith("text/html")||J!=null&&J.startsWith("text/plain")){var Sn=k.clone().text();Sn.then(function(on){V(on)})}else if(J!=null&&J.startsWith("application/json")){var Un=k.clone().json();Un.then(function(on){V((0,L.prettyObject)(on))})}else V(k.statusText);nn(!1)}else{var fn,Ln=k==null||(fn=k.body)===null||fn===void 0?void 0:fn.getReader(),Cn=`

`,en="",jn="",Rn=function(){Ln.read().then(function(Bn){var kn=Bn.done,Kn=Bn.value;if(kn){nn(!1);return}for(en+=new TextDecoder().decode(Kn);en.includes(Cn);){var Wn=en.indexOf(Cn),zn=en.slice(0,Wn),sn=zn.split("data: ");for(var gn in sn)if(sn[gn]!==""&&sn[gn]!=="[DONE]")try{var pn,tn,Yn=JSON.parse(sn[gn]),wn=(pn=(tn=Yn.choices[0])===null||tn===void 0||(tn=tn.delta)===null||tn===void 0?void 0:tn.content)!==null&&pn!==void 0?pn:"";jn+=wn,hn(new Date().toLocaleString()),H.current=jn,V(H.current)}catch(Xn){}en=en.slice(Wn+Cn.length)}Rn()}).catch(function(Bn){})};Rn()}}).catch(function(k){nn(!1),V(k.message)})};return t.default.createElement(d.default,null,t.default.createElement("section",{style:{marginBottom:15}},t.default.createElement(c.default,null,"Cool! Hi, React & Ant Design!")),t.default.createElement("section",{className:P.default.avatar},"React version: ",t.version),t.default.createElement("section",null,"I love coding in ",t.default.createElement(_.default,{alternateText:["javascript","typescript","rect","vue"]}),"."),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(i.default,{text:"foo bar baz http://example.org bar https://github.com/wkylin/pro-react-admin"})),t.default.createElement("section",{className:P.default.line}),t.default.createElement("section",null,t.default.createElement(g.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."})),t.default.createElement("section",null,t.default.createElement(O.default,{text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?"})),t.default.createElement(E.default,{value:2}),t.default.createElement(b.default,{text:"A line bordered text."}),t.default.createElement("section",{style:{display:"flex",alignItems:"center",marginTop:10,marginBottom:40}},t.default.createElement(m.Atom,null)," ",t.default.createElement(m.Merge,null)," ",t.default.createElement(m.GitMerge,null)," ",t.default.createElement(m.GitPullRequestArrow,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(R.default,null,t.default.createElement(a.default,{src:"https://picsum.photos/seed/picsum/300/160",alt:"Strawberries"}))),t.default.createElement("section",null,t.default.createElement(v.default,null)),t.default.createElement("section",{style:{margin:40}},t.default.createElement(x.default,null)),t.default.createElement("section",{style:{margin:"60px 0 40px 40px"}},t.default.createElement("div",{className:P.default["video-box"]},t.default.createElement("div",{className:P.default["video-btn"]},"b"))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(D.default,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(C.PinInput,{onChange:function(M,Y,w){return s(w)},values:y})),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(U.default.FadeIn,null,t.default.createElement(g.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."}))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(U.default.FadeUp,null,t.default.createElement("img",{src:"https://picsum.photos/360/200.jpg",alt:""}))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},t.default.createElement(U.default.ScaleIn,null,t.default.createElement(t.default.Fragment,null,t.default.createElement("img",{src:"https://picsum.photos/360/200/?blur=2",alt:""}),t.default.createElement("section",{className:P.default["blend-me"]},"Mix Blend Mode")))),t.default.createElement("section",{style:{marginBottom:40,height:200,width:360,overflow:"hidden"}},t.default.createElement(T.default,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(K.default,null,"Click Me")),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement("section",{className:P.default.effect}," Hello CSS")),t.default.createElement("section",{style:{marginBottom:40},className:P.default.maskBox},t.default.createElement("section",{className:P.default.watermark},"water mark"),"mask"),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement("button",{className:P.default.button},t.default.createElement("span",{className:P.default["button-label"]},"Click Me"))),t.default.createElement("section",{style:{position:"relative",margin:"80px 0 160px 50px"}},t.default.createElement("div",{className:P.default["circle-1"]}),t.default.createElement("div",{className:P.default["circle-2"]}),t.default.createElement("div",{className:P.default["circle-3"]}),t.default.createElement("div",{className:P.default["circle-4"]})),t.default.createElement("section",{style:{marginBottom:40},className:P.default.eHElAY},"Hi, React!"),t.default.createElement("section",null,t.default.createElement("div",{className:P.default.stages},t.default.createElement("div",{className:P.default.cubeSpinner},t.default.createElement("span",{className:P.default.face1},"Web Services"),t.default.createElement("span",{className:P.default.face2},"Blockchain"),t.default.createElement("span",{className:P.default.face3},"Mobile Apps")))),t.default.createElement("section",{style:{width:600,margin:"30px 0"}},t.default.createElement(o.Input,{defaultValue:un,placeholder:"api key",onChange:xn,style:{marginBottom:20}}),t.default.createElement(o.Flex,{align:"center"},t.default.createElement(o.Input.TextArea,{ref:Mn,defaultValue:rn,placeholder:"\u6765\uFF0C\u8BF4\u70B9\u4EC0\u4E48\u5457...Meta + Enter\u53D1\u9001",onChange:In,onKeyDown:Tn,autoSize:!0,style:{width:300,height:30,caretColor:"#ff0000"}}),t.default.createElement(o.Button,{style:{margin:"0 10px"},icon:t.default.createElement(B.SendOutlined,{rotate:-60}),type:"primary",disabled:an,onClick:f},"\u53D1\u9001"),t.default.createElement(o.Button,{icon:t.default.createElement(B.SendOutlined,{rotate:-60}),type:"primary",disabled:!an,onClick:h},"\u505C\u6B62"))),t.default.createElement("section",null,an&&t.default.createElement("div",null,"\u6B63\u5728\u8F93\u5165..."),t.default.createElement("section",{style:{textAlign:"right",color:"#666"}},yn),t.default.createElement(u.default,{markdownText:G,isLoading:an})),t.default.createElement("section",{style:{position:"relative",height:300}},t.default.createElement(Q.default,null,t.default.createElement("p",null," wave "))))},z=e.default=Z},31819:function(p,e,n){"use strict";var r=n(24994);Object.defineProperty(e,"__esModule",{value:!0}),e.trimTopic=e.toFixedBug=e.toFixed=e.toCamelCase=e.sleep=e.shuffleArr=e.saveHtmlToPng=e.reqStringify=e.readFromFile=e.randomString=e.randomNum=e.randomItem=e.randomHex=e.randomColor=e.random=e.promiseWithTimeout=e.prettyObject=e.pause=e.passwordStrength=e.oneApiChat=e.limitDecimal=e.isURLSearchParams=e.isObject=e.isNotEmpty=e.isEqual=e.isEmptyArray=e.isDecimal=e.isDate=e.isDarkMode=e.isArray=e.hidePhone=e.hasFocus=e.getType=e.getRandomId=e.getParamObject=e.getImgsUrl=e.getFileType=e.getEnv=e.getCurrentDate=e.fetchSomething=e.exportJsonData=e.exportFile=e.dayDif=e.customizeTimer=e.copyTextToClipboard=e.clearCookies=e.checkIsLocalPage=e.capitalize=e.camelizeCamelCase=e.asyncTo=e.asyncAction=e.ThousandNum=e.RoundNum=e.RandomId=void 0;var l=r(n(54756)),A=r(n(29293)),t=r(n(41132)),o=r(n(73738)),B=n(55373),m=r(n(20354)),C=e.getEnv=function(){var s;return typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]"&&(s="NODE"),typeof XMLHttpRequest!="undefined"&&(s="BROWSER"),s},d=e.isArray=function(s){return(0,o.default)(s)==="object"&&Object.prototype.toString.call(s)==="[object Array]"},c=e.isURLSearchParams=function(s){return typeof URLSearchParams!="undefined"&&s instanceof URLSearchParams},u=e.isDate=function(s){return(0,o.default)(s)==="object"&&Object.prototype.toString.call(s)==="[object Date]"},_=e.isObject=function(s){return s!==null&&(0,o.default)(s)==="object"},i=e.getParamObject=function(s){return c(s)?(0,B.parse)(s.toString(),{strictNullHandling:!0}):typeof s=="string"?[s]:s},a=e.reqStringify=function(s){return(0,B.stringify)(s,{arrayFormat:"repeat",strictNullHandling:!0})},E=e.getType=function(s){var f=Object.prototype.toString.call(s),h=/\[object (.*?)\]/.exec(f);return h?h[1]:null},O=e.hidePhone=function(s){return s==null?void 0:s.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")},g=e.asyncAction=function(s){var f=Promise.resolve(s);return function(h){f.then(function(){return setTimeout(function(){return h()})})}},b=e.getImgsUrl=function(s){var f=/<img.*?(?:>|\/>)/gi,h=/src=['"]?([^'"]*)['"]?/i,j=s.match(f);if(!j)return null;var I=j.reduce(function(M,Y){var w=Y.match(h);return w[1]?[].concat((0,t.default)(M),[w[1]]):M},[]);return I},v=e.customizeTimer={intervalTimer:null,timeoutTimer:null,setTimeout:function(s,f){var h=this,j=Date.now,I=j(),M=I,Y=function(){h.timeoutTimer=requestAnimationFrame(Y),M=j(),M-I>=f&&(s(),cancelAnimationFrame(h.timeoutTimer))};return this.timeoutTimer=requestAnimationFrame(Y),this.timeoutTimer},clearTimeout:function(){cancelAnimationFrame(this.timeoutTimer)},setInterval:function(s,f){var h=this,j=Date.now,I=j(),M=I,Y=function(){h.intervalTimer=requestAnimationFrame(Y),M=j(),M-I>=f&&(I=j(),M=I,s())};return this.intervalTimer=requestAnimationFrame(Y),this.intervalTimer},clearInterval:function(){cancelAnimationFrame(this.intervalTimer)}},D=e.isDecimal=function(s){var f=/(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/;return f.test(s)},x=e.limitDecimal=function(s){return s.replace(/^(-)*(\d+)\.(\d\d).*$/,"$1$2.$3")},R=e.passwordStrength=function(s){var f=/^(?=.*[A-Z])(?=.*[\d])(?=.*[a-z]).{8,}$/;return f.test(s)},U=e.checkIsLocalPage=function(){document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")return!1;if(document.visibilityState==="visible")return!0;window.addEventListener("pagehide",function(s){s.persisted},!1)})},K=e.randomHex=function(){return"#".concat(Math.floor(Math.random()*16777215).toString(16).padEnd(6,"0"))},Q=e.clearCookies=document.cookie.split(";").forEach(function(y){return document.cookie=y.replace(/^ +/,"").replace(/[=].*/,"=;expires=".concat(new Date(0).toUTCString(),";path=/"))}),T=e.dayDif=function(s,f){return Math.ceil(Math.abs(s.getTime()-f.getTime())/864e5)},L=e.capitalize=function(s){return s.charAt(0).toUpperCase()+s.slice(1)},P=e.isNotEmpty=function(s){return Array.isArray(s)&&s.length>0},S=e.isDarkMode=window.matchMedia("(prefers-color-scheme: dark)").matches,X=e.fetchSomething=function(){return new Promise(function(s){setTimeout(function(){s("")},1e3)})},Z=e.toFixed=function(s,f){if(typeof s!="number")throw new Error("number\u4E0D\u662F\u6570\u5B57");var h=Math.round(Math.pow(10,f)*s)/Math.pow(10,f);if(h=String(h),h.indexOf(".")===-1)f!==0&&(h+=".",h+=new Array(f+1).join("0"));else{var j=h.split(".");j[1].length<f&&(j[1]+=new Array(f-j[1].length+1).join("0")),h=j.join(".")}return h},z=e.toFixedBug=function(s,f){return~~(Math.pow(10,f)*s)/Math.pow(10,f)},W=e.promiseWithTimeout=function(s,f){var h=new Promise(function(j){return setTimeout(function(){return j("Time Out!")},f)});return Promise.race([h,s])},N=e.shuffleArr=function(s){return s.sort(function(){return .5-Math.random()})},F=e.sleep=function(s){return new Promise(function(f){return setTimeout(function(){return f()},s)})},G=e.ThousandNum=function(s){return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},V=e.RandomId=function(s){return Math.random().toString(36).substring(3,s)},H=e.RoundNum=function(s,f){return Math.round(s*Math.pow(10,f))/Math.pow(10,f)},q=e.randomNum=function(s,f){return Math.floor(Math.random()*(f-s+1))+s},ln=e.isEmptyArray=function(s){return Array.isArray(s)&&!s.length},an=e.randomItem=function(s){return s[Math.floor(Math.random()*s.length)]},nn=e.asyncTo=function(s){return s.then(function(f){return[null,f]}).catch(function(f){return[f]})},vn=e.hasFocus=function(s){return s===document.activeElement},dn=e.isEqual=function(s,f){return JSON.stringify(s)===JSON.stringify(f)},yn=e.randomString=function(){return Math.random().toString(36).slice(2)},hn=e.toCamelCase=function(s){return s.trim().replace(/[-_\s]+(.)?/g,function(f,h){return h?h.toUpperCase():""})},An=e.random=function(s,f){return Math.floor(Math.random()*(f-s+1)+s)},bn=e.randomColor=function(){return"#".concat(Math.random().toString(16).slice(2,8).padEnd(6,"0"))},_n=e.pause=function(s){return new Promise(function(f){return setTimeout(f,s)})},un=e.camelizeCamelCase=function(s){return s.replace(/(?:^\w|[A-Z]|\b\w)/g,function(f,h){return h===0?f.toLowerCase():f.toUpperCase()}).replace(/\s+/g,"")},Dn=e.copyTextToClipboard=function(){var y=(0,A.default)(l.default.mark(function s(f){var h;return l.default.wrap(function(I){for(;;)switch(I.prev=I.next){case 0:if(I.prev=0,!((h=navigator)!==null&&h!==void 0&&(h=h.clipboard)!==null&&h!==void 0&&h.writeText)){I.next=4;break}return I.next=4,navigator.clipboard.writeText(f);case 4:I.next=8;break;case 6:I.prev=6,I.t0=I.catch(0);case 8:case"end":return I.stop()}},s,null,[[0,6]])}));return function(f){return y.apply(this,arguments)}}(),On=e.getRandomId=function(){for(var s="",f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",h=0;h<32;h++)s+=f.charAt(Math.floor(Math.random()*f.length));return s},cn=e.oneApiChat=function(s,f,h){return fetch("https://api.openai.com/v1/chat/completions",{method:"POST",signal:h,headers:{Authorization:f,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:s,stream:!0})})},rn=e.getCurrentDate=function(){var s=new Date,f=s.getDate(),h=s.getMonth()+1,j=s.getFullYear();return"".concat(j,"-").concat(h,"-").concat(f)},Pn=e.exportJsonData=function(s){var f=rn(),h=JSON.stringify(JSON.parse(s),null,2),j=new Blob([h],{type:"application/json"}),I=URL.createObjectURL(j),M=document.createElement("a");M.href=I,M.download="chat-store_".concat(f,".json"),document.body.appendChild(M),M.click(),document.body.removeChild(M)},Mn=e.saveHtmlToPng=function(){var y=(0,A.default)(l.default.mark(function s(f,h,j){var I,M,Y,w;return l.default.wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.prev=0,I=f!=null?f:document.getElementById("image-wrapper"),k.next=4,(0,m.default)(I,{useCORS:!0});case 4:M=k.sent,Y=M.toDataURL("image/png"),w=document.createElement("a"),w.style.display="none",w.href=Y,w.setAttribute("download","chat-shot.png"),typeof w.download=="undefined"&&w.setAttribute("target","_blank"),document.body.appendChild(w),w.click(),document.body.removeChild(w),window.URL.revokeObjectURL(Y),h&&h(),Promise.resolve(),k.next=22;break;case 19:k.prev=19,k.t0=k.catch(0),j&&j(k.t0.message);case 22:case"end":return k.stop()}},s,null,[[0,19]])}));return function(f,h,j){return y.apply(this,arguments)}}(),xn=e.trimTopic=function(s){return s.replace(/[，。！？”“"、,.!?]*$/,"")},In=e.readFromFile=function(){return new Promise(function(s,f){var h=document.createElement("input");h.type="file",h.accept="application/json",h.onchange=function(j){var I=j.target.files[0],M=new FileReader;M.onload=function(Y){s(Y.target.result)},M.onerror=function(Y){return f(new Error(Y))},M.readAsText(I)},h.click()})},Tn=e.prettyObject=function(s){var f="";return typeof s!="string"&&(f=JSON.stringify(s,null,"  ")),f==="{}"?f.toString():f.startsWith("```json")?f:["```json",f,"```"].join(`
`)},mn=e.getFileType=function(s,f){var h=f.split(".").pop().toLowerCase();switch(h){case"txt":return"text/plain";case"json":return"application/json";case"doc":return"application/msword";case"docx":return"application/vnd.openxmlformats-officedocument.wordprocessingml.document";case"xls":return"application/vnd.ms-excel";case"xlsx":return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";case"ppt":return"application/vnd.ms-powerpoint";case"pptx":return"application/vnd.openxmlformats-officedocument.presentationml.presentation";case"pdf":return"application/pdf";case"jpg":case"jpeg":return"image/jpeg";case"png":return"image/png";case"gif":return"image/gif";case"zip":return"application/zip";case"rar":return"application/x-rar-compressed";default:if(typeof s=="string")try{return JSON.parse(s),"application/json"}catch(j){return"text/plain"}else return s instanceof Uint8Array||s instanceof ArrayBuffer,"application/octet-stream"}},En=e.exportFile=function(s,f){var h;if((s==null||(h=s.headers["content-type"])===null||h===void 0?void 0:h.indexOf("application/json"))===-1){var j=s.headers&&s.headers["content-disposition"]||"attachment;filename=".concat(f||"file",".xlsx"),I=decodeURI(j==null?void 0:j.split("=")[1].replace(/'/g,"")).replace(/"/g,"").replace("utf-8''","")||"",M=mn(s.data,f||I),Y=new Blob([s.data],{type:M}),w=URL.createObjectURL(Y),$=document.createElement("a");document.body.appendChild($),$.style="display: none",$.href=w,$.download=I,$.click(),document.body.removeChild($)}}},25039:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(47122),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},48122:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(61543),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},57903:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(9666),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},21958:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(97669),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},39726:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(27825),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},49511:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(90958),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},84576:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(80711),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},85120:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(45789),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},61352:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(91869),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},89696:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(22211),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},89200:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(38791),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},49887:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(6988),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},91193:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(41742),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},57812:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(20335),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},1052:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(38413),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},47443:function(p,e,n){"use strict";n.r(e);var r=n(85072),l=n.n(r),A=n(97825),t=n.n(A),o=n(77659),B=n.n(o),m=n(55056),C=n.n(m),d=n(10540),c=n.n(d),u=n(41113),_=n.n(u),i=n(37318),a={};a.styleTagTransform=_(),a.setAttributes=C(),a.insert=B().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=c();var E=l()(i.A,a);e.default=i.A&&i.A.locals?i.A.locals:void 0},82547:function(p){"use strict";p.exports="data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 4%27%3E%3Cstyle type=%27text/css%27%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX%280%29;}to {transform:translateX%28-15px%29;}}%3C/style%3E%3Cpath fill=%27none%27 stroke=%27%230087ca%27 stroke-width=%272%27 class=%27squiggle%27 d=%27M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3%27/%3E%3C/svg%3E"},42634:function(){}}]);

//# sourceMappingURL=267.fa8d48e3067195e9f162.js.map