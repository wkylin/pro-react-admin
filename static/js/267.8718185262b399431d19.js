(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[267],{65548:function(B,n,e){"use strict";var i=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=i(e(43693)),t=f(e(96540)),o=e(74848);function p(d){if(typeof WeakMap!="function")return null;var a=new WeakMap,r=new WeakMap;return(p=function(y){return y?r:a})(d)}function f(d,a){if(!a&&d&&d.__esModule)return d;if(d===null||s(d)!="object"&&typeof d!="function")return{default:d};var r=p(a);if(r&&r.has(d))return r.get(d);var m={__proto__:null},y=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var x in d)if(x!=="default"&&{}.hasOwnProperty.call(d,x)){var v=y?Object.getOwnPropertyDescriptor(d,x):null;v&&(v.get||v.set)?Object.defineProperty(m,x,v):m[x]=d[x]}return m.default=d,r&&r.set(d,m),m}function g(d,a){var r=Object.keys(d);if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(d);a&&(m=m.filter(function(y){return Object.getOwnPropertyDescriptor(d,y).enumerable})),r.push.apply(r,m)}return r}function l(d){for(var a=1;a<arguments.length;a++){var r=arguments[a]!=null?arguments[a]:{};a%2?g(Object(r),!0).forEach(function(m){(0,A.default)(d,m,r[m])}):Object.getOwnPropertyDescriptors?Object.defineProperties(d,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach(function(m){Object.defineProperty(d,m,Object.getOwnPropertyDescriptor(r,m))})}return d}var c=function(a){return(0,o.jsxs)("svg",l(l({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"#fff",viewBox:"0 0 120 30"},a),{},{children:[(0,o.jsxs)("circle",{cx:15,cy:15,r:15,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]}),(0,o.jsxs)("circle",{cx:60,cy:15,r:9,fillOpacity:.3,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:9,repeatCount:"indefinite",to:9,values:"9;15;9"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:.5,repeatCount:"indefinite",to:.5,values:".5;1;.5"})]}),(0,o.jsxs)("circle",{cx:105,cy:15,r:15,children:[(0,o.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,o.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]})]}))},_=n.default=c},47122:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.alternating--mj1_d {
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
`],sourceRoot:""}]),o.locals={alternating:"alternating--mj1_d","alternating-text":"alternating-text--p6lWH",alternatingText:"alternating-text--p6lWH"},n.A=o},61543:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.btn--Vmubv {
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
`],sourceRoot:""}]),o.locals={btn:"btn--Vmubv",content:"content--jujDv","btn-ripple":"btn-ripple--w2aOn",btnRipple:"btn-ripple--w2aOn",ripple:"ripple--oIc_l","btn-ripple-container":"btn-ripple-container--II62b",btnRippleContainer:"btn-ripple-container--II62b"},n.A=o},9666:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.hIBkFg--xUSDY {
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
`],sourceRoot:""}]),o.locals={hIBkFg:"hIBkFg--xUSDY",kqOLaE:"kqOLaE--z4koa","bz-an":"bz-an--moL5G",bzAn:"bz-an--moL5G"},n.A=o},97669:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=e(4417),p=e.n(o),f=new URL(e(82547),e.b),g=t()(s()),l=p()(f);g.push([B.id,`a.squiggle--JQRWj {
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
`],sourceRoot:""}]),g.locals={squiggle:"squiggle--JQRWj"},n.A=g},27825:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.avatarCard--kIii3 {
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
`],sourceRoot:""}]),o.locals={avatarCard:"avatarCard--kIii3",card:"card--W_bZq",content:"content--yiHmV"},n.A=o},90958:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.breatheItem--VaM9v {
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
`],sourceRoot:""}]),o.locals={breatheItem:"breatheItem--VaM9v",breathe:"breathe--wA3l6",loopRotate:"loopRotate--GRmod",loop:"loop--Q7Ru6",outside:"outside--NZwXf",inner:"inner--ZClIQ",text:"text--FGKfx","play-button":"play-button--Wg3em",playButton:"play-button--Wg3em","zoom-in-zoom-out":"zoom-in-zoom-out--alaL8",zoomInZoomOut:"zoom-in-zoom-out--alaL8","div-block":"div-block--OwsxA",divBlock:"div-block--OwsxA","div-block-1019":"div-block-1019--iYyTM",divBlock1019:"div-block-1019--iYyTM","div-block-1021":"div-block-1021--EWkRm",divBlock1021:"div-block-1021--EWkRm",code:"code--Wc_Yz",trans:"trans--jcajC"},n.A=o},80711:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.gradientTracking--FyamC {
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
`],sourceRoot:""}]),o.locals={gradientTracking:"gradientTracking--FyamC"},n.A=o},45789:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.isometricCard--mEKMm {
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
`],sourceRoot:""}]),o.locals={isometricCard:"isometricCard--mEKMm"},n.A=o},91869:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.hoverRotate--ew29g {
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
`],sourceRoot:""}]),o.locals={hoverRotate:"hoverRotate--ew29g"},n.A=o},22211:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.lineBordered--bh05r {
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
`],sourceRoot:""}]),o.locals={lineBordered:"lineBordered--bh05r","hover-underline-animation":"hover-underline-animation--TSfGP",hoverUnderlineAnimation:"hover-underline-animation--TSfGP",left:"left--ErwKf",center:"center--BFLFI",right:"right--DRVwU","dynamic-shadow":"dynamic-shadow--Us2nj",dynamicShadow:"dynamic-shadow--Us2nj","image-contain":"image-contain--Z_yfM",imageContain:"image-contain--Z_yfM","image-cover":"image-cover--ZVSiS",imageCover:"image-cover--ZVSiS",container:"container--lADY1",top:"top--XQMfF",bottom:"bottom--P1bZI","no-scrollbars":"no-scrollbars--AUOMQ",noScrollbars:"no-scrollbars--AUOMQ","engraved-text":"engraved-text--dMPwS",engravedText:"engraved-text--dMPwS","embossed-text":"embossed-text--eQZ0_",embossedText:"embossed-text--eQZ0_"},n.A=o},38791:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.background--V0AeH {
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
`],sourceRoot:""}]),o.locals={background:"background--V0AeH","move-background":"move-background--h74DC",moveBackground:"move-background--h74DC"},n.A=o},6988:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.markdownBody--xUrgB {\r
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
`],sourceRoot:""}]),o.locals={markdownBody:"markdownBody--xUrgB",loadingIcon:"loadingIcon--VpAmv",copySection:"copySection--aJHtb",lang:"lang--SO0lS",copySpan:"copySpan--u4qzC",preCode:"preCode--s6faO"},n.A=o},41742:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`/* Perspective card */
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
`],sourceRoot:""}]),o.locals={"perspective-card":"perspective-card--fRasE",perspectiveCard:"perspective-card--fRasE",shiftingCard:"shiftingCard--ejZ4B",cardAnimation:"cardAnimation--uMV0q"},n.A=o},62264:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.cardEffect--cZUTZ {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #1e293b;
  background-image: linear-gradient(to right, #1e293b, #06171b);
  padding: 1px;
}

.spotlight--GQ6XV {
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 300ms;
}`,"",{version:3,sources:["webpack://./src/components/stateless/Spotlight/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,6DAA6D;EAC7D,YAAY;AACd;;AAEA;EACE,oBAAoB;EACpB,kBAAkB;EAClB,QAAQ;EACR,UAAU;EACV,yBAAyB;AAC3B",sourcesContent:[`.cardEffect {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #1e293b;
  background-image: linear-gradient(to right, #1e293b, #06171b);
  padding: 1px;
}

.spotlight {
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 300ms;
}`],sourceRoot:""}]),o.locals={cardEffect:"cardEffect--cZUTZ",spotlight:"spotlight--GQ6XV"},n.A=o},97331:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.mask--LIqkO {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background-image: linear-gradient(
    270deg,
    hsl(0, 0%, 100%) 0,
    hsl(0, 0%, 100%) 5%,
    rgba(17, 23, 41, 0) 49.8%,
    hsl(0, 0%, 100%) 95%,
    hsl(0, 0%, 100%) 100%
  );
}
`,"",{version:3,sources:["webpack://./src/components/stateless/TagCloud/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,OAAO;EACP,MAAM;EACN,WAAW;EACX;;;;;;;GAOC;AACH",sourcesContent:[`.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background-image: linear-gradient(
    270deg,
    hsl(0, 0%, 100%) 0,
    hsl(0, 0%, 100%) 5%,
    rgba(17, 23, 41, 0) 49.8%,
    hsl(0, 0%, 100%) 95%,
    hsl(0, 0%, 100%) 100%
  );
}
`],sourceRoot:""}]),o.locals={mask:"mask--LIqkO"},n.A=o},38413:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.typedCursorBlink--bnrB1 {
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
`],sourceRoot:""}]),o.locals={typedCursorBlink:"typedCursorBlink--bnrB1","typed-blink":"typed-blink--GZUvL",typedBlink:"typed-blink--GZUvL"},n.A=o},37318:function(B,n,e){"use strict";var i=e(71354),s=e.n(i),A=e(76314),t=e.n(A),o=t()(s());o.push([B.id,`.avatar--tAk6h {
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


.dotMask--sy6CL {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 16px 16px;
  -webkit-mask-image: radial-gradient(
    ellipse 50% 50% at 50% 50%,
    #000 60%,
    transparent 100%
  );
  mask-image: radial-gradient(
    ellipse 50% 50% at 50% 50%,
    #000 60%,
    transparent 100%
  );
}

.dot--jqRVx {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 16px 16px;
}

.grid--UCn5k {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, #80808012 1px, transparent 1px),
    linear-gradient(to bottom, #80808012 1px, transparent 1px);
  background-size: 24px 24px;
}

.box--kP2q7 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border: 3px solid #0000;
  border-radius: 12px;
  background: linear-gradient(#131219, #131219) padding-box, linear-gradient(
        var(--angle),
        #070707,
        #687aff
      ) border-box;
  animation: 4s rotate--r6Mu6 linear infinite;
}

@keyframes rotate--r6Mu6 {
  to {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}`,"",{version:3,sources:["webpack://./src/pages/home/index.module.less"],names:[],mappings:"AAAA;EACE,uDAAgD;AAClD;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,wBAAwB;EAC1B;AACF;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,oBAAoB;EACpB,kBAAkB;EAClB,iBAAiB;EACjB,WAAW;EACX,eAAe;EACf,kBAAkB;EAClB,mFAA2E;UAA3E,2EAA2E;AAC7E;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,WAAW;EACX,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,qDAAqD;EACrD,wDAAiD;AACnD;;AAEA;EACE;IACE,2BAA2B;EAC7B;AACF;;AAEA;EACE,uBAAuB;EACvB,oBAAoB;EACpB;oEACkE;EAClE,wCAAwC;EACxC,6BAA6B;EAC7B,6BAA6B;EAC7B,sBAAsB;AACxB;;AAEA;EACE,kFAAkF;EAClF,6BAAqB;UAArB,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,kDAA2C;EAC3C,6BAA6B;EAC7B,mBAAmB;EACnB,yCAAyC;EACzC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,qBAAqB;EACrB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,mBAAmB;EACnB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,qBAAqB;EACrB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,qBAAqB;EACvB;;EAEA;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE;IACE,UAAU;IACV,mBAAmB;EACrB;;EAEA;IACE,UAAU;IACV,qBAAqB;EACvB;;EAEA;IACE,UAAU;IACV,uBAAuB;EACzB;AACF;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,oFAAoF;AACtF;;AAEA;EACE,eAAe;EACf,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,mBAAmB;EACnB,kBAAkB;EAClB,qBAAqB;EACrB,mBAAmB;EACnB,kBAAkB;EAClB,UAAU;EACV,yBAAyB;EACzB,yBAAyB;EACzB;IACE,WAAW;IACX,kBAAkB;IAClB,SAAS;IACT,UAAU;IACV,WAAW;IACX,iBAAiB;IACjB,uBAAuB;IACvB,wBAAwB;IACxB,wBAAwB;IACxB,6BAA6B;IAC7B,2BAA2B;IAC3B,UAAU;IACV;;;;;;;;;;;;kBAYc;IACd,kEAA2D;IAC3D,oCAAoC;EACtC;EACA;IACE,WAAW;IACX,WAAW;IACX,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,2BAA2B;IAC3B,SAAS;IACT,QAAQ;EACV;AACF;AACA;EACE;IACE,4BAA4B;EAC9B;EACA;IACE,6BAA6B;EAC/B;EACA;IACE,4BAA4B;EAC9B;AACF;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ;IACE,cAAc;IACd,gCAAyB;IACzB,sCAAsC;IACtC,mCAAmC;IACnC,sBAAsB;IACtB,4BAA4B;IAC5B,6BAA6B;IAC7B,kBAAkB;IAClB,eAAe;;IAEf;MACE,kBAAkB;MAClB,WAAW;MACX,2BAA2B;MAC3B,mCAAmC;IACrC;IACA;MACE,2BAA2B;IAC7B;;IAEA;MACE,2CAA2C;IAC7C;;IAEA;MACE,2CAA2C;IAC7C;EACF;AACF;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;IACE,wBAAwB;EAC1B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,yCAAyC;EACzC,kBAAkB;EAClB,qBAAqB;EACrB,2BAA2B;EAC3B,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,yBAAyB;EACzB,kBAAkB;EAClB,WAAW;EACX,eAAe;EACf,UAAU;EACV,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;;EAEE,WAAW;EACX,cAAc;EACd,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,WAAW;EACX,SAAS;EACT,OAAO;EACP,kBAAkB;EAClB,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,UAAU;EACV,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,2CAAoC;AACtC;;AAEA;EACE,8CAAuC;AACzC;;AAEA;;EAEE,yBAAyB;EACzB,WAAW;AACb;;AAEA;;;;EAIE,qBAAqB;AACvB;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,sBAAsB;IACtB,UAAU;EACZ;;EAEA;IACE,mBAAmB;IACnB,UAAU;EACZ;AACF;;AAEA;EACE;IACE,4BAA4B;EAC9B;EACA;IACE,gCAAgC;EAClC;EACA;IACE,4BAA4B;EAC9B;AACF;;AAEA;EACE,6CAAsC;EACtC,YAAY;EACZ,eAAe;AACjB;;;AAGA;EACE,kBAAkB;EAClB,QAAQ;EACR,YAAY;EACZ,WAAW;EACX,+DAA+D;EAC/D,0BAA0B;EAC1B;;;;GAIC;EACD;;;;GAIC;AACH;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,YAAY;EACZ,WAAW;EACX,+DAA+D;EAC/D,0BAA0B;AAC5B;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,YAAY;EACZ,WAAW;EACX;8DAC4D;EAC5D,0BAA0B;AAC5B;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB;;;;kBAIgB;EAChB,2CAAoC;AACtC;;AAEA;EACE;IACE,eAAe;EACjB;AACF;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,eAAe;AACjB",sourcesContent:[`.avatar {
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


.dotMask {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 16px 16px;
  -webkit-mask-image: radial-gradient(
    ellipse 50% 50% at 50% 50%,
    #000 60%,
    transparent 100%
  );
  mask-image: radial-gradient(
    ellipse 50% 50% at 50% 50%,
    #000 60%,
    transparent 100%
  );
}

.dot {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 16px 16px;
}

.grid {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, #80808012 1px, transparent 1px),
    linear-gradient(to bottom, #80808012 1px, transparent 1px);
  background-size: 24px 24px;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border: 3px solid #0000;
  border-radius: 12px;
  background: linear-gradient(#131219, #131219) padding-box, linear-gradient(
        var(--angle),
        #070707,
        #687aff
      ) border-box;
  animation: 4s rotate linear infinite;
}

@keyframes rotate {
  to {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}`],sourceRoot:""}]),o.locals={avatar:"avatar--tAk6h",levitate:"levitate--RZCwS",maskBox:"maskBox--uAYjJ",watermark:"watermark--YUolT","blend-me":"blend-me--f5L11",blendMe:"blend-me--f5L11","move-me":"move-me--FUPwc",moveMe:"move-me--FUPwc",button:"button--GgsIa","button-label":"button-label--d_jxl",buttonLabel:"button-label--d_jxl","circle-1":"circle-1--kJj6k",circle1:"circle-1--kJj6k",expand:"expand--kmoUS","circle-2":"circle-2--YMeVl",circle2:"circle-2--YMeVl","expand-opacity":"expand-opacity--XzitQ",expandOpacity:"expand-opacity--XzitQ","circle-3":"circle-3--DvCUJ",circle3:"circle-3--DvCUJ","circle-4":"circle-4--UkUyn",circle4:"circle-4--UkUyn",line:"line--Lp5NS",eHElAY:"eHElAY--ul0hZ",eHElAy:"eHElAY--ul0hZ","dv-wu":"dv-wu--sf_Ta",dvWu:"dv-wu--sf_Ta",stages:"stages--wh47k","spin-cube":"spin-cube--eXtsy",spinCube:"spin-cube--eXtsy",cubeSpinner:"cubeSpinner--eOJc0",face1:"face1--KIPp1",face2:"face2--aYKpi",face3:"face3--M7CTV","video-box":"video-box--RWlhc",videoBox:"video-box--RWlhc","video-btn":"video-btn--PPzlz",videoBtn:"video-btn--PPzlz",ripple:"ripple--Ojifa",effect:"effect--mKRM4","effect-1":"effect-1--LXEum",effect1:"effect-1--LXEum",dotMask:"dotMask--sy6CL",dot:"dot--jqRVx",grid:"grid--UCn5k",box:"box--kP2q7",rotate:"rotate--r6Mu6"},n.A=o},87333:function(B,n,e){"use strict";var i=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=i(e(85715)),A=e(96540),t=i(e(43591)),o=function(l){return l?l.getBoundingClientRect():null},p=function(){var l=(0,A.useRef)(null),c=l.current||null,_=(0,A.useState)(o(c)),d=(0,s.default)(_,2),a=d[0],r=d[1],m=(0,A.useCallback)(function(){l.current&&r(o(l.current))},[l]);return(0,A.useLayoutEffect)(function(){var y=l.current;if(y){if(m(),typeof t.default=="function"){var x=new t.default(function(){return m()});return x.observe(y),function(){x&&(x.disconnect(),x=null)}}return window.addEventListener("resize",m),function(){return window.removeEventListener("resize",m)}}},[m]),[a,l]},f=n.default=p},81286:function(B,n,e){"use strict";var i=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=p(e(96540)),t=i(e(25039));function o(l){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(o=function(a){return a?_:c})(l)}function p(l,c){if(!c&&l&&l.__esModule)return l;if(l===null||s(l)!="object"&&typeof l!="function")return{default:l};var _=o(c);if(_&&_.has(l))return _.get(l);var d={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in l)if(r!=="default"&&{}.hasOwnProperty.call(l,r)){var m=a?Object.getOwnPropertyDescriptor(l,r):null;m&&(m.get||m.set)?Object.defineProperty(d,r,m):d[r]=l[r]}return d.default=l,_&&_.set(l,d),d}var f=function(c){var _=c.alternateText,d=_===void 0?[]:_;return(0,A.useEffect)(function(){var a=document.getElementById("alternating-text"),r=0,m=function(x){r=r<d.length-1?r+1:0,a.innerHTML=d[r]};return a.innerHTML=d[0],a.addEventListener("animationiteration",m,!1),function(){a.removeEventListener("animationiteration",m,!1)}},[]),A.default.createElement("span",{className:t.default.alternating,id:"alternating-text"},d[0]||"Text goes here")},g=n.default=f},44322:function(B,n,e){"use strict";var i=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=i(e(43693)),t=i(e(85715)),o=f(e(96540));function p(v){if(typeof WeakMap!="function")return null;var E=new WeakMap,h=new WeakMap;return(p=function(I){return I?h:E})(v)}function f(v,E){if(!E&&v&&v.__esModule)return v;if(v===null||s(v)!="object"&&typeof v!="function")return{default:v};var h=p(E);if(h&&h.has(v))return h.get(v);var P={__proto__:null},I=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var R in v)if(R!=="default"&&{}.hasOwnProperty.call(v,R)){var M=I?Object.getOwnPropertyDescriptor(v,R):null;M&&(M.get||M.set)?Object.defineProperty(P,R,M):P[R]=v[R]}return P.default=v,h&&h.set(v,P),P}function g(v,E){var h=Object.keys(v);if(Object.getOwnPropertySymbols){var P=Object.getOwnPropertySymbols(v);E&&(P=P.filter(function(I){return Object.getOwnPropertyDescriptor(v,I).enumerable})),h.push.apply(h,P)}return h}function l(v){for(var E=1;E<arguments.length;E++){var h=arguments[E]!=null?arguments[E]:{};E%2?g(Object(h),!0).forEach(function(P){(0,A.default)(v,P,h[P])}):Object.getOwnPropertyDescriptors?Object.defineProperties(v,Object.getOwnPropertyDescriptors(h)):g(Object(h)).forEach(function(P){Object.defineProperty(v,P,Object.getOwnPropertyDescriptor(h,P))})}return v}var c=function(E){var h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"0px",P=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,I=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1,R=(0,o.useState)(!0),M=(0,t.default)(R,2),L=M[0],O=M[1],j=(0,o.useRef)(null);return(0,o.useEffect)(function(){return j.current=new IntersectionObserver(function(W){var S=(0,t.default)(W,1),z=S[0];z.isIntersecting&&z.intersectionRatio>=P?(O(!0),I&&j.current.disconnect()):O(!1)},{rootMargin:h,threshold:P}),E.current&&j.current.observe(E.current),function(){E.current&&j.current.unobserve(E.current)}},[E,h,P,I]),L},_=function(E){var h=E.from,P=E.to,I=E.rootMargin,R=E.threshold,M=E.triggerOnce,L=E.children,O=(0,o.useRef)(null),j=c(O,I,R,M),W={transition:"1000ms ease-in-out"};return o.default.createElement("div",{ref:O,style:j?l(l({},W),P):l(l({},W),h)},L)},d=function(E){var h=E.rootMargin,P=h===void 0?"0px":h,I=E.threshold,R=I===void 0?0:I,M=E.triggerOnce,L=M===void 0?!1:M,O=E.children;return o.default.createElement(_,{from:{opacity:0},to:{opacity:1},rootMargin:P,threshold:R,triggerOnce:L},O)},a=function(E){var h=E.rootMargin,P=h===void 0?"0px":h,I=E.threshold,R=I===void 0?0:I,M=E.triggerOnce,L=M===void 0?!1:M,O=E.children;return o.default.createElement(_,{from:{opacity:0,translate:"0 2rem"},to:{opacity:1,translate:"none"},rootMargin:P,threshold:R,triggerOnce:L},O)},r=function(E){var h=E.rootMargin,P=h===void 0?"0px":h,I=E.threshold,R=I===void 0?0:I,M=E.triggerOnce,L=M===void 0?!1:M,O=E.children;return o.default.createElement(_,{from:{scale:"0"},to:{scale:"1"},rootMargin:P,threshold:R,triggerOnce:L},O)},m=function(E){var h=E.from,P=E.to,I=E.rootMargin,R=I===void 0?"0px":I,M=E.threshold,L=M===void 0?0:M,O=E.triggerOnce,j=O===void 0?!1:O,W=E.children;return o.default.createElement(_,{from:h,to:P,rootMargin:R,threshold:L,triggerOnce:j},W)},y={FadeIn:d,FadeUp:a,ScaleIn:r,DiyAnimation:m},x=n.default=y},53795:function(B,n,e){"use strict";var i=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=i(e(94634)),t=i(e(91847)),o=i(e(85715)),p=c(e(96540)),f=i(e(48122)),g=["children","onClick"];function l(r){if(typeof WeakMap!="function")return null;var m=new WeakMap,y=new WeakMap;return(l=function(v){return v?y:m})(r)}function c(r,m){if(!m&&r&&r.__esModule)return r;if(r===null||s(r)!="object"&&typeof r!="function")return{default:r};var y=l(m);if(y&&y.has(r))return y.get(r);var x={__proto__:null},v=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var E in r)if(E!=="default"&&{}.hasOwnProperty.call(r,E)){var h=v?Object.getOwnPropertyDescriptor(r,E):null;h&&(h.get||h.set)?Object.defineProperty(x,E,h):x[E]=r[E]}return x.default=r,y&&y.set(r,x),x}var _=function(){var m=p.default.useState({x:-1,y:-1}),y=(0,o.default)(m,2),x=y[0],v=x.x,E=x.y,h=y[1],P=v!==-1&&E!==-1,I=function(M){var L=M.currentTarget.getBoundingClientRect(),O=L.left,j=L.top;h({x:M.clientX-O,y:M.clientY-j}),setTimeout(function(){h({x:-1,y:-1})},300)};return{x:v,y:E,handleRippleOnClick:I,isRippling:P}},d=function(m){var y=m.children,x=m.onClick,v=(0,t.default)(m,g),E=_(),h=E.x,P=E.y,I=E.handleRippleOnClick,R=E.isRippling,M=function(O){I(O),x&&x(O)};return p.default.createElement("button",(0,A.default)({type:"button",onClick:M,className:f.default.btn},v),p.default.createElement("span",{className:f.default.content},y),R&&p.default.createElement("div",{className:f.default["btn-ripple-container"]},p.default.createElement("span",{className:f.default["btn-ripple"],style:{left:h,top:P}})))},a=n.default=d},85666:function(B,n,e){"use strict";var i=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=i(e(96540)),A=i(e(57903)),t=function(f){var g=f.children;return s.default.createElement(s.default.Fragment,null,s.default.createElement("section",{className:A.default.hIBkFg},s.default.createElement("h2",null,"Design and code"," ",s.default.createElement("span",{className:A.default.kqOLaE},s.default.createElement("span",null,"R"),s.default.createElement("span",null,"e"),s.default.createElement("span",null,"a"),s.default.createElement("span",null,"c"),s.default.createElement("span",null,"t"))," ","apps")))},o=n.default=t},59409:function(B,n,e){"use strict";var i=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=i(e(96540)),A=i(e(21958)),t=function(f){var g=f.text,l=/((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;return s.default.createElement(s.default.Fragment,null,g.split(l).map(function(c,_){var d=c.match(l);if(d){var a=d[0];return s.default.createElement("a",{key:_,className:A.default.squiggle,target:"_blank",href:a.startsWith("http")?a:"http://".concat(a)},a)}return c}))},o=n.default=t},76017:function(B,n,e){"use strict";var i=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=i(e(96540)),A=i(e(39726)),t=function(f){var g=f.avatar,l=f.text;return s.default.createElement("div",{className:A.default.avatarCard},s.default.createElement("div",{className:A.default.card},s.default.createElement("figure",null,s.default.createElement("img",{alt:"",src:g,className:A.default.avatar})),s.default.createElement("p",{className:A.default.content},l)))},o=n.default=t},12770:function(B,n,e){"use strict";var i=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=i(e(96540)),A=i(e(49511)),t=function(){return s.default.createElement(s.default.Fragment,null,s.default.createElement("section",{className:A.default.breatheItem},s.default.createElement("span",null,"Breathe")))},o=n.default=t},42916:function(B,n,e){"use strict";var i=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=i(e(43693)),A=i(e(96540));function t(g,l){var c=Object.keys(g);if(Object.getOwnPropertySymbols){var _=Object.getOwnPropertySymbols(g);l&&(_=_.filter(function(d){return Object.getOwnPropertyDescriptor(g,d).enumerable})),c.push.apply(c,_)}return c}function o(g){for(var l=1;l<arguments.length;l++){var c=arguments[l]!=null?arguments[l]:{};l%2?t(Object(c),!0).forEach(function(_){(0,s.default)(g,_,c[_])}):Object.getOwnPropertyDescriptors?Object.defineProperties(g,Object.getOwnPropertyDescriptors(c)):t(Object(c)).forEach(function(_){Object.defineProperty(g,_,Object.getOwnPropertyDescriptor(c,_))})}return g}var p=function(l){var c=l.style,_=l.children;return A.default.createElement("div",{style:o({width:"100%",minHeight:"calc(100vh - 232px)"},c)},_)},f=n.default=p},18903:function(B,n,e){"use strict";var i=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=p(e(96540)),t=i(e(84576));function o(l){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(o=function(a){return a?_:c})(l)}function p(l,c){if(!c&&l&&l.__esModule)return l;if(l===null||s(l)!="object"&&typeof l!="function")return{default:l};var _=o(c);if(_&&_.has(l))return _.get(l);var d={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in l)if(r!=="default"&&{}.hasOwnProperty.call(l,r)){var m=a?Object.getOwnPropertyDescriptor(l,r):null;m&&(m.get||m.set)?Object.defineProperty(d,r,m):d[r]=l[r]}return d.default=l,_&&_.set(l,d),d}var f=function(){var c=(0,A.useRef)(null);return(0,A.useLayoutEffect)(function(){var _=c.current,d=function(r){var m=r.target.getBoundingClientRect(),y=r.clientX-m.left,x=r.clientY-m.top;_.style.setProperty("--x",y+"px"),_.style.setProperty("--y",x+"px")};return _.addEventListener("mousemove",d),function(){_.removeEventListener("mousemove",d)}},[]),A.default.createElement("button",{className:t.default.gradientTracking,ref:c},A.default.createElement("span",null,"Hover me"))},g=n.default=f},52537:function(B,n,e){"use strict";var i=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=i(e(96540)),A=i(e(85120)),t=function(f){var g=f.text;return s.default.createElement("div",{className:A.default.isometricCard},s.default.createElement("p",null,g))},o=n.default=t},35317:function(B,n,e){"use strict";var i=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=i(e(94634)),A=i(e(85715)),t=i(e(91847)),o=i(e(96540)),p=i(e(61352)),f=["alt","src","className","loadInitially","observerOptions"],g=function(_){var d=_.alt,a=_.src,r=_.className,m=_.loadInitially,y=m===void 0?!1:m,x=_.observerOptions,v=x===void 0?{root:null,rootMargin:"200px 0px"}:x,E=(0,t.default)(_,f),h=o.default.useRef(null),P=o.default.useRef(null),I=o.default.useState(y),R=(0,A.default)(I,2),M=R[0],L=R[1],O=o.default.useCallback(function(j){j[0].isIntersecting&&(h.current.disconnect(),L(!0))},[h]);return o.default.useEffect(function(){if(!y){if("loading"in HTMLImageElement.prototype){L(!0);return}return h.current=new IntersectionObserver(O,v),h.current.observe(P.current),function(){h.current.disconnect()}}},[]),o.default.createElement("figure",{className:p.default.hoverRotate},o.default.createElement("img",(0,s.default)({alt:d,src:M?a:"",ref:P,className:r,loading:y?void 0:"lazy"},E)),o.default.createElement("figcaption",null,o.default.createElement("h3",null,"Lorem ",o.default.createElement("br",null),"Ipsum")))},l=n.default=g},22807:function(B,n,e){"use strict";var i=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=i(e(96540)),A=i(e(89696)),t=function(f){var g=f.text;return s.default.createElement("span",{className:A.default.lineBordered},g)},o=n.default=t},75747:function(B,n,e){"use strict";var i=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=i(e(96540)),A=i(e(89200)),t=function(f){return s.default.createElement("div",{style:{position:"relative",height:"100%"}},s.default.createElement("div",{className:A.default.background},"Mesh Gradient Background"))},o=n.default=t},81740:function(B,n,e){"use strict";var i=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=i(e(54756)),t=i(e(94634)),o=i(e(85715)),p=i(e(29293)),f=P(e(96540)),g=e(55724),l=i(e(43160)),c=i(e(41512)),_=i(e(54152)),d=i(e(63940)),a=i(e(37948)),r=i(e(73410)),m=i(e(51498)),y=i(e(22802)),x=e(81591),v=i(e(65548));e(35819);var E=i(e(49887));function h(O){if(typeof WeakMap!="function")return null;var j=new WeakMap,W=new WeakMap;return(h=function(z){return z?W:j})(O)}function P(O,j){if(!j&&O&&O.__esModule)return O;if(O===null||s(O)!="object"&&typeof O!="function")return{default:O};var W=h(j);if(W&&W.has(O))return W.get(O);var S={__proto__:null},z=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var N in O)if(N!=="default"&&{}.hasOwnProperty.call(O,N)){var w=z?Object.getOwnPropertyDescriptor(O,N):null;w&&(w.get||w.set)?Object.defineProperty(S,N,w):S[N]=O[N]}return S.default=O,W&&W.set(O,S),S}var I=function(){var O=(0,p.default)(A.default.mark(function j(W){var S,z;return A.default.wrap(function(w){for(;;)switch(w.prev=w.next){case 0:if(w.prev=0,!((S=navigator)!==null&&S!==void 0&&(S=S.clipboard)!==null&&S!==void 0&&S.writeText)){w.next=5;break}return w.next=4,navigator.clipboard.writeText(W);case 4:g.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F");case 5:w.next=16;break;case 7:w.prev=7,w.t0=w.catch(0),z=document.createElement("textarea"),z.value=W,document.body.appendChild(z),z.focus(),z.select();try{document.execCommand("copy"),g.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F")}catch(V){g.message.success("\u590D\u5236\u5230\u526A\u8D34\u677F\u5931\u8D25")}document.body.removeChild(z);case 16:case"end":return w.stop()}},j,null,[[0,7]])}));return function(W){return O.apply(this,arguments)}}(),R=function(j){var W,S=(0,f.useRef)(null),z=(W=S.current)===null||W===void 0?void 0:W.innerText,N=(0,f.useRef)(""),w=(0,x.useDebouncedCallback)(function(){if(S.current){var V=S.current.querySelector("code"),G=V.className,U=/language-(\w+)/.exec(G||"");if(U){var H=(0,o.default)(U,2),ee=H[1];N.current=ee}}},800);return(0,f.useEffect)(function(){setTimeout(w,1)},[z]),f.default.createElement("section",null,f.default.createElement("section",{className:E.default.copySection},f.default.createElement("span",{className:E.default.lang},N.current),f.default.createElement("span",{className:E.default.copySpan,role:"button",onClick:function(){if(S.current){var G=S.current.innerText;I(G)}}},"\u590D\u5236\u4EE3\u7801")),f.default.createElement("pre",{className:E.default.preCode,ref:S},j.children))},M=function(j){var W=j.markdownText,S=W===void 0?"":W,z=j.isLoading,N=z===void 0?!1:z;return f.default.createElement("section",{className:E.default.markdownBody},N&&!S&&f.default.createElement(l.default,{component:v.default,style:{color:"#fff"},className:E.default.loadingIcon}),S&&f.default.createElement(c.default,{remarkPlugins:[_.default,r.default,d.default],rehypePlugins:[a.default,y.default,[m.default,{detect:!1,ignoreMissing:!0}]],components:{pre:R,p:function(V){return f.default.createElement("p",(0,t.default)({},V,{dir:"auto"}))},a:function(V){var G,U=V.href||"",H=/^\/#/i.test(U),ee=H?"_self":(G=V.target)!==null&&G!==void 0?G:"_blank";return f.default.createElement("a",(0,t.default)({},V,{target:ee}))}}},S))},L=n.default=M},63023:function(B,n,e){"use strict";var i=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=i(e(96540)),A=e(23947),t=function(f){var g=f.children;return s.default.createElement(A.motion.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{ease:"linear",duration:1,y:{duration:.5}}},g)},o=n.default=t},3102:function(B,n,e){"use strict";var i=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=p(e(96540)),t=i(e(91193));function o(l){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(o=function(a){return a?_:c})(l)}function p(l,c){if(!c&&l&&l.__esModule)return l;if(l===null||s(l)!="object"&&typeof l!="function")return{default:l};var _=o(c);if(_&&_.has(l))return _.get(l);var d={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in l)if(r!=="default"&&{}.hasOwnProperty.call(l,r)){var m=a?Object.getOwnPropertyDescriptor(l,r):null;m&&(m.get||m.set)?Object.defineProperty(d,r,m):d[r]=l[r]}return d.default=l,_&&_.set(l,d),d}var f=function(){var c=(0,A.useRef)(null);return(0,A.useLayoutEffect)(function(){var _=c.current,d=_.getBoundingClientRect(),a=d.x,r=d.y,m=d.width,y=m===void 0?240:m,x=d.height,v=x===void 0?360:x,E=a+(y||240)/2,h=r+(v||360)/2,P=function(M){var L=M.pageX,O=M.pageY,j=(E-L)/((y||240)/2),W=(h-O)/((v||360)/2);_.style.setProperty("--dx",j),_.style.setProperty("--dy",W)},I=function(){_.style.setProperty("--dx",0),_.style.setProperty("--dy",0)};return _.addEventListener("mousemove",P),_.addEventListener("mouseleave",I),function(){_.removeEventListener("mousemove",P),_.removeEventListener("mouseleave",I)}},[]),A.default.createElement("div",{ref:c,className:t.default.shiftingCard},A.default.createElement("h3",null,"Shifting Card"))},g=n.default=f},31456:function(B,n,e){"use strict";var i=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=i(e(43693)),t=i(e(85715)),o=g(e(96540)),p=i(e(81709));function f(a){if(typeof WeakMap!="function")return null;var r=new WeakMap,m=new WeakMap;return(f=function(x){return x?m:r})(a)}function g(a,r){if(!r&&a&&a.__esModule)return a;if(a===null||s(a)!="object"&&typeof a!="function")return{default:a};var m=f(r);if(m&&m.has(a))return m.get(a);var y={__proto__:null},x=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in a)if(v!=="default"&&{}.hasOwnProperty.call(a,v)){var E=x?Object.getOwnPropertyDescriptor(a,v):null;E&&(E.get||E.set)?Object.defineProperty(y,v,E):y[v]=a[v]}return y.default=a,m&&m.set(a,y),y}function l(a,r){var m=Object.keys(a);if(Object.getOwnPropertySymbols){var y=Object.getOwnPropertySymbols(a);r&&(y=y.filter(function(x){return Object.getOwnPropertyDescriptor(a,x).enumerable})),m.push.apply(m,y)}return m}function c(a){for(var r=1;r<arguments.length;r++){var m=arguments[r]!=null?arguments[r]:{};r%2?l(Object(m),!0).forEach(function(y){(0,A.default)(a,y,m[y])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(m)):l(Object(m)).forEach(function(y){Object.defineProperty(a,y,Object.getOwnPropertyDescriptor(m,y))})}return a}var _=function(r){var m=r.className,y=r.style,x=r.children,v=(0,o.useRef)(null),E=(0,o.useState)(!1),h=(0,t.default)(E,2),P=h[0],I=h[1],R=(0,o.useState)({x:0,y:0}),M=(0,t.default)(R,2),L=M[0],O=M[1],j=(0,o.useState)(0),W=(0,t.default)(j,2),S=W[0],z=W[1],N=function(ee){if(!(!v.current||P)){var ce=v.current,me=ce.getBoundingClientRect();O({x:ee.clientX-me.left,y:ee.clientY-me.top})}},w=function(){I(!0),z(1)},V=function(){I(!1),z(0)},G=function(){z(1)},U=function(){z(0)};return o.default.createElement("section",{ref:v,onMouseMove:N,onFocus:w,onBlur:V,onMouseEnter:G,onMouseLeave:U,className:"".concat(p.default.cardEffect," ").concat(m),style:c({},y)},o.default.createElement("section",{className:p.default.spotlight,style:{opacity:S,background:"radial-gradient(1000px circle at ".concat(L.x,"px ").concat(L.y,"px, rgba(190,255,255,.2), transparent 40%)")}}),o.default.createElement("section",{className:p.default.spotlight,style:{opacity:S,border:"2px solid rgb(255, 255, 255)",borderRadius:"8px",WebkitMaskImage:"radial-gradient(40% 40% at ".concat(L.x,"px ").concat(L.y,"px, black 45%, transparent)")}}),x)},d=n.default=_},3783:function(B,n,e){"use strict";var i=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=i(e(96540)),A=i(e(95280)),t=function(){return s.default.createElement("div",{className:"relative flex flex-col items-center justify-center overflow-hidden"},s.default.createElement("div",{className:"not-prose my-5 w-full"},s.default.createElement("ul",{className:"flex w-full flex-wrap items-center justify-center gap-3"},s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"'use server'"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useOptimistic"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"React Server Components"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Concurrent Rendering"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useActionState"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Improved Hydration"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Form Actions"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Server Actions"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Suspense"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"'use client'"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useTransition"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"React Compiler"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Streaming"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useFormStatus"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"New React Hooks"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"use()"),s.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Automatic Memoization"))),s.default.createElement("div",{className:A.default.mask}))},o=n.default=t},59593:function(B,n,e){"use strict";var i=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=i(e(85715)),t=f(e(96540)),o=i(e(1052));function p(c){if(typeof WeakMap!="function")return null;var _=new WeakMap,d=new WeakMap;return(p=function(r){return r?d:_})(c)}function f(c,_){if(!_&&c&&c.__esModule)return c;if(c===null||s(c)!="object"&&typeof c!="function")return{default:c};var d=p(_);if(d&&d.has(c))return d.get(c);var a={__proto__:null},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var m in c)if(m!=="default"&&{}.hasOwnProperty.call(c,m)){var y=r?Object.getOwnPropertyDescriptor(c,m):null;y&&(y.get||y.set)?Object.defineProperty(a,m,y):a[m]=c[m]}return a.default=c,d&&d.set(c,a),a}var g=function(_){var d=_.children,a=_.delay,r=a===void 0?110:a,m=(0,t.useState)(0),y=(0,A.default)(m,2),x=y[0],v=y[1],E=setInterval(function(){return v(function(h){return h+1})},r);return(0,t.useEffect)(function(){x===d.length&&clearInterval(E)},[d,E,x]),(0,t.useEffect)(function(){return function(){return clearInterval(E)}},[E]),t.default.createElement(t.default.Fragment,null,d.substring(0,x),t.default.createElement("span",{className:o.default.typedCursorBlink},"|"))},l=n.default=(0,t.memo)(g)},76526:function(B,n,e){"use strict";var i=e(24994),s=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var A=i(e(85715)),t=ee(e(96540)),o=e(55724),p=e(43160),f=e(96619),g=i(e(64856)),l=i(e(31456)),c=i(e(8242)),_=i(e(51521)),d=ee(e(47159)),a=ee(e(7733)),r=i(e(42916)),m=i(e(59593)),y=i(e(81740)),x=i(e(81286)),v=i(e(59409)),E=i(e(35317)),h=i(e(52537)),P=i(e(76017)),I=i(e(22807)),R=i(e(18903)),M=i(e(3102)),L=i(e(12770)),O=i(e(63023)),j=i(e(44322)),W=i(e(53795)),S=i(e(85666)),z=i(e(75747)),N=i(e(87333)),w=i(e(3783)),V=e(31819),G=e(21378),U=i(e(47443));function H(F){if(typeof WeakMap!="function")return null;var ie=new WeakMap,ne=new WeakMap;return(H=function(te){return te?ne:ie})(F)}function ee(F,ie){if(!ie&&F&&F.__esModule)return F;if(F===null||s(F)!="object"&&typeof F!="function")return{default:F};var ne=H(ie);if(ne&&ne.has(F))return ne.get(F);var oe={__proto__:null},te=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var $ in F)if($!=="default"&&{}.hasOwnProperty.call(F,$)){var se=te?Object.getOwnPropertyDescriptor(F,$):null;se&&(se.get||se.set)?Object.defineProperty(oe,$,se):oe[$]=F[$]}return oe.default=F,ne&&ne.set(F,oe),oe}var ce=function(){var ie=(0,t.useState)(""),ne=(0,A.default)(ie,2),oe=ne[0],te=ne[1],$=(0,t.useRef)(null),se=(0,t.useState)(!1),Be=(0,A.default)(se,2),ue=Be[0],le=Be[1],Me=(0,t.useState)(""),ve=(0,A.default)(Me,2),Ie=ve[0],je=ve[1],Ee=(0,t.useRef)(null),Te=(0,t.useState)(function(){return""}),ye=(0,A.default)(Te,2),he=ye[0],Re=ye[1],We=(0,t.useState)(""),fe=(0,A.default)(We,2),ge=fe[0],b=fe[1],u=(0,t.useRef)(null),C=function(J){Re(J.target.value)},D=function(J){b(J.target.value)},T=function(J){J.metaKey&&J.key==="Enter"&&(ae(),J.preventDefault())},k=(0,t.useState)(["","","","","","",""]),K=(0,A.default)(k,2),Y=K[0],Z=K[1],ae=function(){if(ge.trim()!==""){var J=new AbortController;Ee.current=J,Ke(ge,he,J)}},Q=function(){Ee.current.abort(),le(!1)},Ke=function(J,Fe,Ye){$.current="",te($.current);var Xe=Ye.signal;le(!0),(0,V.oneApiChat)([{content:J,role:"user"}],Fe,Xe).then(function(re){var q=re.headers.get("content-type");if(!re.ok||!(q!=null&&q.startsWith("text/event-stream"))||re.status!==200){if(q!=null&&q.startsWith("text/html")||q!=null&&q.startsWith("text/plain")){var Ne=re.clone().text();Ne.then(function(pe){te(pe)})}else if(q!=null&&q.startsWith("application/json")){var Ze=re.clone().json();Ze.then(function(pe){te((0,V.prettyObject)(pe))})}else te(re.statusText);le(!1)}else{var be,Ve=re==null||(be=re.body)===null||be===void 0?void 0:be.getReader(),De=`

`,de="",ke="",Ue=function(){Ve.read().then(function(xe){var Qe=xe.done,Ge=xe.value;if(Qe){le(!1);return}for(de+=new TextDecoder().decode(Ge);de.includes(De);){var Le=de.indexOf(De),He=de.slice(0,Le),Ce=He.split("data: ");for(var Oe in Ce)if(Ce[Oe]!==""&&Ce[Oe]!=="[DONE]")try{var Pe,Ae,$e=JSON.parse(Ce[Oe]),Je=(Pe=(Ae=$e.choices[0])===null||Ae===void 0||(Ae=Ae.delta)===null||Ae===void 0?void 0:Ae.content)!==null&&Pe!==void 0?Pe:"";ke+=Je,je(new Date().toLocaleString()),$.current=ke,te($.current)}catch(qe){}de=de.slice(Le+De.length)}Ue()}).catch(function(xe){})};Ue()}}).catch(function(re){le(!1),te(re.message)})},ze=(0,N.default)(),Se=(0,A.default)(ze,2),X=Se[0],we=Se[1];return t.default.createElement(r.default,null,t.default.createElement("section",{style:{marginBottom:15}},t.default.createElement(m.default,null,"Cool! Hi, React & Ant Design!")),t.default.createElement("section",{className:U.default.avatar},"React version: ",t.version),t.default.createElement("section",null,"I love coding in ",t.default.createElement(x.default,{alternateText:["javascript","typescript","rect","vue"]}),"."),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(v.default,{text:"foo bar baz http://example.org bar https://github.com/wkylin/pro-react-admin"})),t.default.createElement("section",{className:U.default.line}),t.default.createElement("section",null,t.default.createElement(P.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."})),t.default.createElement("section",null,t.default.createElement(h.default,{text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?"})),t.default.createElement(I.default,{text:"A line bordered text."}),t.default.createElement("section",{style:{display:"flex",alignItems:"center",marginTop:10,marginBottom:40}},t.default.createElement(f.Atom,null)," ",t.default.createElement(f.Merge,null)," ",t.default.createElement(f.GitMerge,null)," ",t.default.createElement(f.GitPullRequestArrow,null)),t.default.createElement("section",{style:{marginBottom:40,fontSize:16}},t.default.createElement("h3",null,"React Animate On Scroll."),t.default.createElement("h3",null,t.default.createElement(v.default,{text:"https://motion.dev/ https://gsap.com/ https://www.react-spring.dev/ https://use-gesture.netlify.app/"})),t.default.createElement("h3",{style:{marginBottom:40}},t.default.createElement(v.default,{text:"https://www.npmjs.com/package/react-animate-on-scroll https://www.npmjs.com/package/react-scroll https://github.com/wellyshen/react-cool-inview"})),t.default.createElement(O.default,null,t.default.createElement(E.default,{src:"https://picsum.photos/seed/picsum/300/160",alt:"Strawberries"}))),t.default.createElement("section",{style:{marginBottom:40,fontSize:36}},t.default.createElement(c.default,{options:{strings:["Software Developer.","Full Stack Developer.","Open Source Contributor."],autoStart:!0,loop:!0,deleteSpeed:50}})),t.default.createElement("section",null,t.default.createElement(R.default,null)),t.default.createElement("section",{style:{margin:40}},t.default.createElement(L.default,null)),t.default.createElement("section",{style:{margin:"60px 0 40px 40px"}},t.default.createElement("div",{className:U.default["video-box"]},t.default.createElement("div",{className:U.default["video-btn"]},"b"))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(M.default,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(j.default.FadeIn,null,t.default.createElement(P.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."}))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(j.default.FadeUp,null,t.default.createElement("img",{src:"https://picsum.photos/360/200.jpg",alt:""}))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},t.default.createElement(j.default.ScaleIn,{triggerOnce:!1},t.default.createElement(t.default.Fragment,null,t.default.createElement("img",{src:"https://picsum.photos/360/200/?blur=2",alt:""}),t.default.createElement("section",{className:U.default["blend-me"]},"Mix Blend Mode")))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},t.default.createElement(j.default.DiyAnimation,{from:{opacity:0,transform:"translate(-100%, 0)"},to:{opacity:1,transform:"translate(0, 0)"},triggerOnce:!0},t.default.createElement("img",{src:"https://picsum.photos/360/200.jpg",alt:""}))),t.default.createElement("section",{style:{marginBottom:40,display:"flex"}},t.default.createElement(l.default,{className:"my-spot",style:{width:360,height:200,color:"#fff"}},t.default.createElement("section",null))),t.default.createElement("section",{className:U.default.box,style:{marginBottom:10,width:360,height:200,position:"relative",backgroundColor:"rgba(0, 0,0, 0.9)",borderRadius:8}},t.default.createElement("section",{className:U.default.dotMask,ref:we},"dot mask")),t.default.createElement("section",{style:{marginBottom:40,fontSize:18}},t.default.createElement("section",null,"RectResult."),"width: ",parseInt(X==null?void 0:X.width)," height: ",parseInt(X==null?void 0:X.height)," top: ",parseInt(X==null?void 0:X.top)," bottom: ",parseInt(X==null?void 0:X.bottom)," right: ",parseInt(X==null?void 0:X.right)," left: ",parseInt(X==null?void 0:X.left)),t.default.createElement("section",{style:{marginBottom:40,height:200,width:360,overflow:"hidden"}},t.default.createElement(z.default,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(W.default,null,"Click Me")),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement("section",{className:U.default.effect}," Hello CSS")),t.default.createElement("section",{style:{marginBottom:40},className:U.default.maskBox},t.default.createElement("section",{className:U.default.watermark},"water mark"),"mask"),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement("button",{className:U.default.button,onClick:G.fireConfetti},t.default.createElement("span",{className:U.default["button-label"]},"Click Me"))),t.default.createElement("section",{style:{position:"relative",margin:"80px 0 160px 100px"}},t.default.createElement("div",{className:U.default["circle-1"]}),t.default.createElement("div",{className:U.default["circle-2"]}),t.default.createElement("div",{className:U.default["circle-3"]}),t.default.createElement("div",{className:U.default["circle-4"]})),t.default.createElement("section",{style:{margin:20},className:U.default.eHElAY},"Hi, React!"),t.default.createElement("section",null,t.default.createElement("div",{className:U.default.stages},t.default.createElement("div",{className:U.default.cubeSpinner},t.default.createElement("span",{className:U.default.face1},"Web Services"),t.default.createElement("span",{className:U.default.face2},"Blockchain"),t.default.createElement("span",{className:U.default.face3},"Mobile Apps")))),t.default.createElement("section",{style:{margin:"20px 0",fontSize:40}},t.default.createElement(g.default,{start:20,end:1e4,duration:10,enableScrollSpy:!0})),t.default.createElement("section",{style:{width:600,margin:"30px 0"}},t.default.createElement(o.Input,{defaultValue:he,placeholder:"api key",onChange:C,style:{marginBottom:20}}),t.default.createElement(o.Flex,{align:"center"},t.default.createElement(o.Input.TextArea,{ref:u,defaultValue:ge,placeholder:"\u6765\uFF0C\u8BF4\u70B9\u4EC0\u4E48\u5457...Meta + Enter\u53D1\u9001",onChange:D,onKeyDown:T,autoSize:!0,style:{width:300,height:30,caretColor:"#ff0000"}}),t.default.createElement(o.Button,{style:{margin:"0 10px"},icon:t.default.createElement(p.SendOutlined,{rotate:-60}),type:"primary",disabled:ue,onClick:ae},"\u53D1\u9001"),t.default.createElement(o.Button,{icon:t.default.createElement(p.SendOutlined,{rotate:-60}),type:"primary",disabled:!ue,onClick:Q},"\u505C\u6B62"))),t.default.createElement("section",null,ue&&t.default.createElement("div",null,"\u6B63\u5728\u8F93\u5165..."),t.default.createElement("section",{style:{textAlign:"right",color:"#666"}},Ie),t.default.createElement(y.default,{markdownText:oe,isLoading:ue})),t.default.createElement("section",{style:{position:"relative"}},t.default.createElement(S.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(d.ResponsiveMasonry,{columnsCountBreakPoints:{350:1,750:2,900:6}},t.default.createElement(d.default,{gutter:"10px"},t.default.createElement(E.default,{src:"https://picsum.photos/id/1/300/100",alt:"Strawberries"}),t.default.createElement(E.default,{src:"https://picsum.photos/id/2/300/200",alt:"Strawberries"}),t.default.createElement(E.default,{src:"https://picsum.photos/id/3/300/150",alt:"Strawberries"}),t.default.createElement(E.default,{src:"https://picsum.photos/id/4/300/150",alt:"Strawberries"}),t.default.createElement(E.default,{src:"https://picsum.photos/id/5/300/200",alt:"Strawberries"}),t.default.createElement(E.default,{src:"https://picsum.photos/id/6/300/100",alt:"Strawberries"}),t.default.createElement(E.default,{src:"https://picsum.photos/id/7/300/150",alt:"Strawberries"}),t.default.createElement(E.default,{src:"https://picsum.photos/id/8/300/200",alt:"Strawberries"}),t.default.createElement(E.default,{src:"https://picsum.photos/id/1/300/100",alt:"Strawberries"}),t.default.createElement(E.default,{src:"https://picsum.photos/id/2/300/200",alt:"Strawberries"}),t.default.createElement(E.default,{src:"https://picsum.photos/id/3/300/150",alt:"Strawberries"}),t.default.createElement(E.default,{src:"https://picsum.photos/id/4/300/150",alt:"Strawberries"})))),t.default.createElement("section",{style:{margin:20}},t.default.createElement(w.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(_.default,{autoFill:!0,direction:"left",gradient:!0,gradientColor:"rgba(255, 255, 255, 0.8)"},t.default.createElement("div",{style:{width:200,height:40,lineHeight:"40px",textAlign:"center",background:"#aaa",margin:"0 10px",borderRadius:4}},"React"))),t.default.createElement("section",{style:{margin:20}},t.default.createElement(_.default,{autoFill:!0,direction:"right",gradient:!0,gradientColor:"rgba(255, 255, 255, 0.8)"},t.default.createElement("div",{style:{width:200,height:40,lineHeight:"40px",textAlign:"center",background:"#aaa",margin:"0 10px",borderRadius:4}},"Vue"))))},me=n.default=ce},31819:function(B,n,e){"use strict";var i=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.trimTopic=n.toFixedBug=n.toFixed=n.toCamelCase=n.sleep=n.shuffleArr=n.saveHtmlToPng=n.reqStringify=n.readFromFile=n.randomString=n.randomNum=n.randomItem=n.randomHex=n.randomColor=n.random=n.promiseWithTimeout=n.prettyObject=n.pause=n.passwordStrength=n.oneApiChat=n.limitDecimal=n.isURLSearchParams=n.isObject=n.isNotEmpty=n.isEqual=n.isEmptyArray=n.isDecimal=n.isDate=n.isDarkMode=n.isArray=n.hidePhone=n.hasFocus=n.getType=n.getRandomId=n.getParamObject=n.getImgsUrl=n.getFileType=n.getEnv=n.getCurrentDate=n.fetchSomething=n.exportJsonData=n.exportFile=n.dayDif=n.customizeTimer=n.copyTextToClipboard=n.clearCookies=n.checkIsLocalPage=n.capitalize=n.camelizeCamelCase=n.asyncTo=n.asyncAction=n.ThousandNum=n.RoundNum=n.RandomId=void 0;var s=i(e(54756)),A=i(e(29293)),t=i(e(41132)),o=i(e(73738)),p=e(55373),f=i(e(20354)),g=n.getEnv=function(){var u;return typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]"&&(u="NODE"),typeof XMLHttpRequest!="undefined"&&(u="BROWSER"),u},l=n.isArray=function(u){return(0,o.default)(u)==="object"&&Object.prototype.toString.call(u)==="[object Array]"},c=n.isURLSearchParams=function(u){return typeof URLSearchParams!="undefined"&&u instanceof URLSearchParams},_=n.isDate=function(u){return(0,o.default)(u)==="object"&&Object.prototype.toString.call(u)==="[object Date]"},d=n.isObject=function(u){return u!==null&&(0,o.default)(u)==="object"},a=n.getParamObject=function(u){return c(u)?(0,p.parse)(u.toString(),{strictNullHandling:!0}):typeof u=="string"?[u]:u},r=n.reqStringify=function(u){return(0,p.stringify)(u,{arrayFormat:"repeat",strictNullHandling:!0})},m=n.getType=function(u){var C=Object.prototype.toString.call(u),D=/\[object (.*?)\]/.exec(C);return D?D[1]:null},y=n.hidePhone=function(u){return u==null?void 0:u.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")},x=n.asyncAction=function(u){var C=Promise.resolve(u);return function(D){C.then(function(){return setTimeout(function(){return D()})})}},v=n.getImgsUrl=function(u){var C=/<img.*?(?:>|\/>)/gi,D=/src=['"]?([^'"]*)['"]?/i,T=u.match(C);if(!T)return null;var k=T.reduce(function(K,Y){var Z=Y.match(D);return Z[1]?[].concat((0,t.default)(K),[Z[1]]):K},[]);return k},E=n.customizeTimer={intervalTimer:null,timeoutTimer:null,setTimeout:function(u,C){var D=this,T=Date.now,k=T(),K=k,Y=function(){D.timeoutTimer=requestAnimationFrame(Y),K=T(),K-k>=C&&(u(),cancelAnimationFrame(D.timeoutTimer))};return this.timeoutTimer=requestAnimationFrame(Y),this.timeoutTimer},clearTimeout:function(){cancelAnimationFrame(this.timeoutTimer)},setInterval:function(u,C){var D=this,T=Date.now,k=T(),K=k,Y=function(){D.intervalTimer=requestAnimationFrame(Y),K=T(),K-k>=C&&(k=T(),K=k,u())};return this.intervalTimer=requestAnimationFrame(Y),this.intervalTimer},clearInterval:function(){cancelAnimationFrame(this.intervalTimer)}},h=n.isDecimal=function(u){var C=/(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/;return C.test(u)},P=n.limitDecimal=function(u){return u.replace(/^(-)*(\d+)\.(\d\d).*$/,"$1$2.$3")},I=n.passwordStrength=function(u){var C=/^(?=.*[A-Z])(?=.*[\d])(?=.*[a-z]).{8,}$/;return C.test(u)},R=n.checkIsLocalPage=function(){document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")return!1;if(document.visibilityState==="visible")return!0;window.addEventListener("pagehide",function(u){u.persisted},!1)})},M=n.randomHex=function(){return"#".concat(Math.floor(Math.random()*16777215).toString(16).padEnd(6,"0"))},L=n.clearCookies=document.cookie.split(";").forEach(function(b){return document.cookie=b.replace(/^ +/,"").replace(/[=].*/,"=;expires=".concat(new Date(0).toUTCString(),";path=/"))}),O=n.dayDif=function(u,C){return Math.ceil(Math.abs(u.getTime()-C.getTime())/864e5)},j=n.capitalize=function(u){return u.charAt(0).toUpperCase()+u.slice(1)},W=n.isNotEmpty=function(u){return Array.isArray(u)&&u.length>0},S=n.isDarkMode=window.matchMedia("(prefers-color-scheme: dark)").matches,z=n.fetchSomething=function(){return new Promise(function(u){setTimeout(function(){u("")},1e3)})},N=n.toFixed=function(u,C){if(typeof u!="number")throw new Error("number\u4E0D\u662F\u6570\u5B57");var D=Math.round(Math.pow(10,C)*u)/Math.pow(10,C);if(D=String(D),D.indexOf(".")===-1)C!==0&&(D+=".",D+=new Array(C+1).join("0"));else{var T=D.split(".");T[1].length<C&&(T[1]+=new Array(C-T[1].length+1).join("0")),D=T.join(".")}return D},w=n.toFixedBug=function(u,C){return~~(Math.pow(10,C)*u)/Math.pow(10,C)},V=n.promiseWithTimeout=function(u,C){var D=new Promise(function(T){return setTimeout(function(){return T("Time Out!")},C)});return Promise.race([D,u])},G=n.shuffleArr=function(u){return u.sort(function(){return .5-Math.random()})},U=n.sleep=function(u){return new Promise(function(C){return setTimeout(function(){return C()},u)})},H=n.ThousandNum=function(u){return u.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},ee=n.RandomId=function(u){return Math.random().toString(36).substring(3,u)},ce=n.RoundNum=function(u,C){return Math.round(u*Math.pow(10,C))/Math.pow(10,C)},me=n.randomNum=function(u,C){return Math.floor(Math.random()*(C-u+1))+u},F=n.isEmptyArray=function(u){return Array.isArray(u)&&!u.length},ie=n.randomItem=function(u){return u[Math.floor(Math.random()*u.length)]},ne=n.asyncTo=function(u){return u.then(function(C){return[null,C]}).catch(function(C){return[C]})},oe=n.hasFocus=function(u){return u===document.activeElement},te=n.isEqual=function(u,C){return JSON.stringify(u)===JSON.stringify(C)},$=n.randomString=function(){return Math.random().toString(36).slice(2)},se=n.toCamelCase=function(u){return u.trim().replace(/[-_\s]+(.)?/g,function(C,D){return D?D.toUpperCase():""})},Be=n.random=function(u,C){return Math.floor(Math.random()*(C-u+1)+u)},ue=n.randomColor=function(){return"#".concat(Math.random().toString(16).slice(2,8).padEnd(6,"0"))},le=n.pause=function(u){return new Promise(function(C){return setTimeout(C,u)})},Me=n.camelizeCamelCase=function(u){return u.replace(/(?:^\w|[A-Z]|\b\w)/g,function(C,D){return D===0?C.toLowerCase():C.toUpperCase()}).replace(/\s+/g,"")},ve=n.copyTextToClipboard=function(){var b=(0,A.default)(s.default.mark(function u(C){var D;return s.default.wrap(function(k){for(;;)switch(k.prev=k.next){case 0:if(k.prev=0,!((D=navigator)!==null&&D!==void 0&&(D=D.clipboard)!==null&&D!==void 0&&D.writeText)){k.next=4;break}return k.next=4,navigator.clipboard.writeText(C);case 4:k.next=8;break;case 6:k.prev=6,k.t0=k.catch(0);case 8:case"end":return k.stop()}},u,null,[[0,6]])}));return function(C){return b.apply(this,arguments)}}(),Ie=n.getRandomId=function(){for(var u="",C="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",D=0;D<32;D++)u+=C.charAt(Math.floor(Math.random()*C.length));return u},je=n.oneApiChat=function(u,C,D){return fetch("https://api.openai.com/v1/chat/completions",{method:"POST",signal:D,headers:{Authorization:C,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:u,stream:!0})})},Ee=n.getCurrentDate=function(){var u=new Date,C=u.getDate(),D=u.getMonth()+1,T=u.getFullYear();return"".concat(T,"-").concat(D,"-").concat(C)},Te=n.exportJsonData=function(u){var C=Ee(),D=JSON.stringify(JSON.parse(u),null,2),T=new Blob([D],{type:"application/json"}),k=URL.createObjectURL(T),K=document.createElement("a");K.href=k,K.download="chat-store_".concat(C,".json"),document.body.appendChild(K),K.click(),document.body.removeChild(K)},ye=n.saveHtmlToPng=function(){var b=(0,A.default)(s.default.mark(function u(C,D,T){var k,K,Y,Z;return s.default.wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.prev=0,k=C!=null?C:document.getElementById("image-wrapper"),Q.next=4,(0,f.default)(k,{useCORS:!0});case 4:K=Q.sent,Y=K.toDataURL("image/png"),Z=document.createElement("a"),Z.style.display="none",Z.href=Y,Z.setAttribute("download","chat-shot.png"),typeof Z.download=="undefined"&&Z.setAttribute("target","_blank"),document.body.appendChild(Z),Z.click(),document.body.removeChild(Z),window.URL.revokeObjectURL(Y),D&&D(),Promise.resolve(),Q.next=22;break;case 19:Q.prev=19,Q.t0=Q.catch(0),T&&T(Q.t0.message);case 22:case"end":return Q.stop()}},u,null,[[0,19]])}));return function(C,D,T){return b.apply(this,arguments)}}(),he=n.trimTopic=function(u){return u.replace(/[，。！？”“"、,.!?]*$/,"")},Re=n.readFromFile=function(){return new Promise(function(u,C){var D=document.createElement("input");D.type="file",D.accept="application/json",D.onchange=function(T){var k=T.target.files[0],K=new FileReader;K.onload=function(Y){u(Y.target.result)},K.onerror=function(Y){return C(new Error(Y))},K.readAsText(k)},D.click()})},We=n.prettyObject=function(u){var C="";return typeof u!="string"&&(C=JSON.stringify(u,null,"  ")),C==="{}"?C.toString():C.startsWith("```json")?C:["```json",C,"```"].join(`
`)},fe=n.getFileType=function(u,C){var D=C.split(".").pop().toLowerCase();switch(D){case"txt":return"text/plain";case"json":return"application/json";case"doc":return"application/msword";case"docx":return"application/vnd.openxmlformats-officedocument.wordprocessingml.document";case"xls":return"application/vnd.ms-excel";case"xlsx":return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";case"ppt":return"application/vnd.ms-powerpoint";case"pptx":return"application/vnd.openxmlformats-officedocument.presentationml.presentation";case"pdf":return"application/pdf";case"jpg":case"jpeg":return"image/jpeg";case"png":return"image/png";case"gif":return"image/gif";case"zip":return"application/zip";case"rar":return"application/x-rar-compressed";default:if(typeof u=="string")try{return JSON.parse(u),"application/json"}catch(T){return"text/plain"}else return u instanceof Uint8Array||u instanceof ArrayBuffer,"application/octet-stream"}},ge=n.exportFile=function(u,C){var D;if((u==null||(D=u.headers["content-type"])===null||D===void 0?void 0:D.indexOf("application/json"))===-1){var T=u.headers&&u.headers["content-disposition"]||"attachment;filename=".concat(C||"file",".xlsx"),k=decodeURI(T==null?void 0:T.split("=")[1].replace(/'/g,"")).replace(/"/g,"").replace("utf-8''","")||"",K=fe(u.data,C||k),Y=new Blob([u.data],{type:K}),Z=URL.createObjectURL(Y),ae=document.createElement("a");document.body.appendChild(ae),ae.style="display: none",ae.href=Z,ae.download=k,ae.click(),document.body.removeChild(ae)}}},21378:function(B,n,e){"use strict";var i=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.fireConfetti=void 0;var s=i(e(43693)),A=i(e(14685));function t(c,_){var d=Object.keys(c);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(c);_&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(c,r).enumerable})),d.push.apply(d,a)}return d}function o(c){for(var _=1;_<arguments.length;_++){var d=arguments[_]!=null?arguments[_]:{};_%2?t(Object(d),!0).forEach(function(a){(0,s.default)(c,a,d[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(c,Object.getOwnPropertyDescriptors(d)):t(Object(d)).forEach(function(a){Object.defineProperty(c,a,Object.getOwnPropertyDescriptor(d,a))})}return c}var p=200,f={origin:{y:.7},zIndex:1500};function g(c,_){(0,A.default)(o(o(o({},f),_),{},{particleCount:Math.floor(p*c)}))}var l=n.fireConfetti=function(){g(.25,{spread:26,startVelocity:55}),g(.2,{spread:60}),g(.35,{spread:100,decay:.91,scalar:.8}),g(.1,{spread:120,startVelocity:25,decay:.92,scalar:1.2}),g(.1,{spread:120,startVelocity:45})}},25039:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(47122),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},48122:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(61543),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},57903:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(9666),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},21958:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(97669),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},39726:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(27825),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},49511:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(90958),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},84576:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(80711),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},85120:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(45789),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},61352:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(91869),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},89696:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(22211),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},89200:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(38791),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},49887:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(6988),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},91193:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(41742),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},81709:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(62264),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},95280:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(97331),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},1052:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(38413),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},47443:function(B,n,e){"use strict";e.r(n);var i=e(85072),s=e.n(i),A=e(97825),t=e.n(A),o=e(77659),p=e.n(o),f=e(55056),g=e.n(f),l=e(10540),c=e.n(l),_=e(41113),d=e.n(_),a=e(37318),r={};r.styleTagTransform=d(),r.setAttributes=g(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=c();var m=s()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},82547:function(B){"use strict";B.exports="data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 4%27%3E%3Cstyle type=%27text/css%27%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX%280%29;}to {transform:translateX%28-15px%29;}}%3C/style%3E%3Cpath fill=%27none%27 stroke=%27%230087ca%27 stroke-width=%272%27 class=%27squiggle%27 d=%27M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3%27/%3E%3C/svg%3E"},42634:function(){}}]);

//# sourceMappingURL=267.8718185262b399431d19.js.map