(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[267],{65548:function(v,n,e){"use strict";var o=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(43693)),t=E(e(96540)),i=e(74848);function p(d){if(typeof WeakMap!="function")return null;var a=new WeakMap,r=new WeakMap;return(p=function(y){return y?r:a})(d)}function E(d,a){if(!a&&d&&d.__esModule)return d;if(d===null||l(d)!="object"&&typeof d!="function")return{default:d};var r=p(a);if(r&&r.has(d))return r.get(d);var m={__proto__:null},y=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var O in d)if(O!=="default"&&{}.hasOwnProperty.call(d,O)){var g=y?Object.getOwnPropertyDescriptor(d,O):null;g&&(g.get||g.set)?Object.defineProperty(m,O,g):m[O]=d[O]}return m.default=d,r&&r.set(d,m),m}function f(d,a){var r=Object.keys(d);if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(d);a&&(m=m.filter(function(y){return Object.getOwnPropertyDescriptor(d,y).enumerable})),r.push.apply(r,m)}return r}function s(d){for(var a=1;a<arguments.length;a++){var r=arguments[a]!=null?arguments[a]:{};a%2?f(Object(r),!0).forEach(function(m){(0,u.default)(d,m,r[m])}):Object.getOwnPropertyDescriptors?Object.defineProperties(d,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach(function(m){Object.defineProperty(d,m,Object.getOwnPropertyDescriptor(r,m))})}return d}var _=function(a){return(0,i.jsxs)("svg",s(s({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"#fff",viewBox:"0 0 120 30"},a),{},{children:[(0,i.jsxs)("circle",{cx:15,cy:15,r:15,children:[(0,i.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,i.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]}),(0,i.jsxs)("circle",{cx:60,cy:15,r:9,fillOpacity:.3,children:[(0,i.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:9,repeatCount:"indefinite",to:9,values:"9;15;9"}),(0,i.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:.5,repeatCount:"indefinite",to:.5,values:".5;1;.5"})]}),(0,i.jsxs)("circle",{cx:105,cy:15,r:15,children:[(0,i.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,i.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]})]}))},A=n.default=_},47122:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.alternating--mj1_d {
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
`],sourceRoot:""}]),i.locals={alternating:"alternating--mj1_d","alternating-text":"alternating-text--p6lWH",alternatingText:"alternating-text--p6lWH"},n.A=i},61543:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.btn--Vmubv {
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
`],sourceRoot:""}]),i.locals={btn:"btn--Vmubv",content:"content--jujDv","btn-ripple":"btn-ripple--w2aOn",btnRipple:"btn-ripple--w2aOn",ripple:"ripple--oIc_l","btn-ripple-container":"btn-ripple-container--II62b",btnRippleContainer:"btn-ripple-container--II62b"},n.A=i},9666:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.hIBkFg--xUSDY {
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
`],sourceRoot:""}]),i.locals={hIBkFg:"hIBkFg--xUSDY",kqOLaE:"kqOLaE--z4koa","bz-an":"bz-an--moL5G",bzAn:"bz-an--moL5G"},n.A=i},97669:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=e(4417),p=e.n(i),E=new URL(e(82547),e.b),f=t()(l()),s=p()(E);f.push([v.id,`a.squiggle--JQRWj {
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
`],sourceRoot:""}]),f.locals={squiggle:"squiggle--JQRWj"},n.A=f},27825:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.avatarCard--kIii3 {
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
`],sourceRoot:""}]),i.locals={avatarCard:"avatarCard--kIii3",card:"card--W_bZq",content:"content--yiHmV"},n.A=i},90958:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.breatheItem--VaM9v {
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
`],sourceRoot:""}]),i.locals={breatheItem:"breatheItem--VaM9v",breathe:"breathe--wA3l6",loopRotate:"loopRotate--GRmod",loop:"loop--Q7Ru6",outside:"outside--NZwXf",inner:"inner--ZClIQ",text:"text--FGKfx","play-button":"play-button--Wg3em",playButton:"play-button--Wg3em","zoom-in-zoom-out":"zoom-in-zoom-out--alaL8",zoomInZoomOut:"zoom-in-zoom-out--alaL8","div-block":"div-block--OwsxA",divBlock:"div-block--OwsxA","div-block-1019":"div-block-1019--iYyTM",divBlock1019:"div-block-1019--iYyTM","div-block-1021":"div-block-1021--EWkRm",divBlock1021:"div-block-1021--EWkRm",code:"code--Wc_Yz",trans:"trans--jcajC"},n.A=i},80711:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.gradientTracking--FyamC {
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
`],sourceRoot:""}]),i.locals={gradientTracking:"gradientTracking--FyamC"},n.A=i},45789:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.isometricCard--mEKMm {
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
`],sourceRoot:""}]),i.locals={isometricCard:"isometricCard--mEKMm"},n.A=i},91869:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.hoverRotate--ew29g {
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
  -webkit-backface-visibility: hidden;
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
`,"",{version:3,sources:["webpack://./src/components/stateless/LazyLoadImage/index.module.less"],names:[],mappings:"AAAA;EACE,gBAAgB;EAChB,sBAAsB;EACtB,WAAW;EACX,qBAAqB;EACrB,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,sBAAsB;EACtB,0BAA0B;AAC5B;;AAEA;;EAEE,kCAAkC;EAClC,uCAAuC;EACvC,0CAA0C;EAC1C,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,yBAAyB;EACzB,UAAU;EACV,UAAU;EACV,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;EACnB,mCAA2B;UAA3B,2BAA2B;EAC3B,oBAAoB;EACpB,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,4CAA4C;EAC5C,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,+BAA+B;EAC/B,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,kBAAkB;EAClB,UAAU;EACV,UAAU;EACV,sBAAsB;EACtB,eAAe;EACf,uBAAuB;EACvB,gBAAgB;EAChB,mBAAmB;EACnB,yBAAyB;AAC3B;;AAEA;;EAEE,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,UAAU;AACZ",sourcesContent:[`.hoverRotate {
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
`],sourceRoot:""}]),i.locals={hoverRotate:"hoverRotate--ew29g"},n.A=i},22211:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.lineBordered--bh05r {
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
`],sourceRoot:""}]),i.locals={lineBordered:"lineBordered--bh05r","hover-underline-animation":"hover-underline-animation--TSfGP",hoverUnderlineAnimation:"hover-underline-animation--TSfGP",left:"left--ErwKf",center:"center--BFLFI",right:"right--DRVwU","dynamic-shadow":"dynamic-shadow--Us2nj",dynamicShadow:"dynamic-shadow--Us2nj","image-contain":"image-contain--Z_yfM",imageContain:"image-contain--Z_yfM","image-cover":"image-cover--ZVSiS",imageCover:"image-cover--ZVSiS",container:"container--lADY1",top:"top--XQMfF",bottom:"bottom--P1bZI","no-scrollbars":"no-scrollbars--AUOMQ",noScrollbars:"no-scrollbars--AUOMQ","engraved-text":"engraved-text--dMPwS",engravedText:"engraved-text--dMPwS","embossed-text":"embossed-text--eQZ0_",embossedText:"embossed-text--eQZ0_"},n.A=i},38791:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.background--V0AeH {
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
`],sourceRoot:""}]),i.locals={background:"background--V0AeH","move-background":"move-background--h74DC",moveBackground:"move-background--h74DC"},n.A=i},6988:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.markdownBody--xUrgB {
  background: #282c34;
  border-radius: 4px;
  color: #fff;
}

.loadingIcon--VpAmv {
  padding: 10px;
}

.copySection--aJHtb {
  padding: 5px 10px;
  text-align: right;
  font-size: 14px;
}

.markdownBody--xUrgB ol,
.markdownBody--xUrgB ul {
  padding: 5px 10px;
}

.markdownBody--xUrgB p {
  padding: 5px 10px;
  font-size: 14px;
}

.lang--SO0lS {
  padding-right: 20px;
}

.copySpan--u4qzC {
  cursor: pointer;
}

.preCode--s6faO {
  margin: 0 10px 10px;
  border-radius: 4px;
  padding-bottom: 10px;

  code {
    margin-bottom: 5px;
  }
}
`,"",{version:3,sources:["webpack://./src/components/stateless/ReMarkdown/index.module.less"],names:[],mappings:"AAAA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,iBAAiB;EACjB,iBAAiB;EACjB,eAAe;AACjB;;AAEA;;EAEE,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,oBAAoB;;EAEpB;IACE,kBAAkB;EACpB;AACF",sourcesContent:[`.markdownBody {
  background: #282c34;
  border-radius: 4px;
  color: #fff;
}

.loadingIcon {
  padding: 10px;
}

.copySection {
  padding: 5px 10px;
  text-align: right;
  font-size: 14px;
}

.markdownBody ol,
.markdownBody ul {
  padding: 5px 10px;
}

.markdownBody p {
  padding: 5px 10px;
  font-size: 14px;
}

.lang {
  padding-right: 20px;
}

.copySpan {
  cursor: pointer;
}

.preCode {
  margin: 0 10px 10px;
  border-radius: 4px;
  padding-bottom: 10px;

  code {
    margin-bottom: 5px;
  }
}
`],sourceRoot:""}]),i.locals={markdownBody:"markdownBody--xUrgB",loadingIcon:"loadingIcon--VpAmv",copySection:"copySection--aJHtb",lang:"lang--SO0lS",copySpan:"copySpan--u4qzC",preCode:"preCode--s6faO"},n.A=i},96657:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.warpper--lLZe7 {
  font-family: sans-serif;
  text-align: center;
}

.pre--MB0A4 {
  text-align: left;
  padding: 0.5em;
  overflow: auto;

  & .token-line--ZnLJw {
    line-height: 1.3em;
    height: 1.3em;
  }
}

.line--aPWRo {
  padding-right: 0.5em;
}

.line-no--Rk8t7 {
  text-align: right;
  padding-right: 1em;
  -webkit-user-select: none;
      -ms-user-select: none;
          user-select: none;
  opacity: 0.5;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/ShiCode/index.module.less"],names:[],mappings:"AAAA;EACE,uBAAuB;EACvB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,cAAc;EACd,cAAc;;EAEd;IACE,kBAAkB;IAClB,aAAa;EACf;AACF;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,yBAAiB;MAAjB,qBAAiB;UAAjB,iBAAiB;EACjB,YAAY;AACd",sourcesContent:[`.warpper {
  font-family: sans-serif;
  text-align: center;
}

.pre {
  text-align: left;
  padding: 0.5em;
  overflow: auto;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
}

.line {
  padding-right: 0.5em;
}

.line-no {
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
}
`],sourceRoot:""}]),i.locals={warpper:"warpper--lLZe7",pre:"pre--MB0A4","token-line":"token-line--ZnLJw",tokenLine:"token-line--ZnLJw",line:"line--aPWRo","line-no":"line-no--Rk8t7",lineNo:"line-no--Rk8t7"},n.A=i},41742:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`/* Perspective card */
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
`],sourceRoot:""}]),i.locals={"perspective-card":"perspective-card--fRasE",perspectiveCard:"perspective-card--fRasE",shiftingCard:"shiftingCard--ejZ4B",cardAnimation:"cardAnimation--uMV0q"},n.A=i},62264:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.cardEffect--cZUTZ {
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
}
`,"",{version:3,sources:["webpack://./src/components/stateless/Spotlight/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,6DAA6D;EAC7D,YAAY;AACd;;AAEA;EACE,oBAAoB;EACpB,kBAAkB;EAClB,QAAQ;EACR,UAAU;EACV,yBAAyB;AAC3B",sourcesContent:[`.cardEffect {
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
}
`],sourceRoot:""}]),i.locals={cardEffect:"cardEffect--cZUTZ",spotlight:"spotlight--GQ6XV"},n.A=i},97331:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.mask--LIqkO {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background-image: linear-gradient(
    270deg,
    hsl(0deg 0% 100%) 0,
    hsl(0deg 0% 100%) 5%,
    rgb(17 23 41 / 0%) 49.8%,
    hsl(0deg 0% 100%) 95%,
    hsl(0deg 0% 100%) 100%
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
    hsl(0deg 0% 100%) 0,
    hsl(0deg 0% 100%) 5%,
    rgb(17 23 41 / 0%) 49.8%,
    hsl(0deg 0% 100%) 95%,
    hsl(0deg 0% 100%) 100%
  );
}
`],sourceRoot:""}]),i.locals={mask:"mask--LIqkO"},n.A=i},38413:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.typedCursorBlink--bnrB1 {
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
`],sourceRoot:""}]),i.locals={typedCursorBlink:"typedCursorBlink--bnrB1","typed-blink":"typed-blink--GZUvL",typedBlink:"typed-blink--GZUvL"},n.A=i},37318:function(v,n,e){"use strict";var o=e(71354),l=e.n(o),u=e(76314),t=e.n(u),i=t()(l());i.push([v.id,`.avatar--tAk6h {
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
  padding: 0 1.8rem;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  z-index: 0;
  color: rgb(255 255 255);
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
        rgb(255 0 0),
        rgb(255 115 0),
        rgb(255 251 0),
        rgb(72 255 0),
        rgb(0 255 213),
        rgb(0 43 255),
        rgb(122 0 255),
        rgb(255 0 200),
        rgb(255 0 0)
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
    background: rgb(17 17 17);
    left: 0;
    top: 0;
  }
}

@keyframes dv-wu--sf_Ta {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 400% 0;
  }

  100% {
    background-position: 0 0;
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
      -webkit-backface-visibility: hidden;
              backface-visibility: hidden;
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
  0% {
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

  100% {
    transform: rotateX(1turn);
  }
}

.video-box--RWlhc .video-btn--PPzlz {
  box-shadow: 0 6px 10px rgb(0 0 0 / 20%);
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

.video-box--RWlhc .video-btn--PPzlz::after,
.video-box--RWlhc .video-btn--PPzlz::before {
  content: '';
  display: block;
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 50%;
  border: 1px solid #1d5fca;
  transition: 0.5s;
}

.video-box--RWlhc .video-btn--PPzlz i {
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
}

.video-box--RWlhc .video-btn--PPzlz::before {
  animation: ripple--Ojifa 2s linear infinite;
}

.video-box--RWlhc .video-btn--PPzlz::after {
  animation: ripple--Ojifa 2s linear 1s infinite;
}

.video-box--RWlhc .video-btn--PPzlz:focus,
.video-box--RWlhc .video-btn--PPzlz:hover {
  background-color: #2d995d;
  color: #fff;
}

.video-box--RWlhc .video-btn--PPzlz:focus::after,
.video-box--RWlhc .video-btn--PPzlz:focus::before,
.video-box--RWlhc .video-btn--PPzlz:hover::after,
.video-box--RWlhc .video-btn--PPzlz:hover::before {
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

  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes effect-1--LXEum {
  0% {
    text-shadow: 0 0 #32a8a2;
  }

  40% {
    text-shadow: 2px 2px 5px #32a8a2;
  }

  100% {
    text-shadow: 0 0 #32a8a2;
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
  -webkit-mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%);
          mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%);
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
    linear-gradient(#80808012 1px, transparent 1px);
  background-size: 24px 24px;
}

.box--kP2q7 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border: 3px solid #0000;
  border-radius: 12px;
  background:
    linear-gradient(#131219, #131219) padding-box,
    linear-gradient(var(--angle), #070707, #687aff) border-box;
  animation: 4s rotate--r6Mu6 linear infinite;
}

@keyframes rotate--r6Mu6 {
  to {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
`,"",{version:3,sources:["webpack://./src/pages/home/index.module.less"],names:[],mappings:"AAAA;EACE,uDAAgD;AAClD;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,wBAAwB;EAC1B;AACF;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,oBAAoB;EACpB,kBAAkB;EAClB,iBAAiB;EACjB,WAAW;EACX,eAAe;EACf,kBAAkB;EAClB,mFAA2E;UAA3E,2EAA2E;AAC7E;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,WAAW;EACX,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,qDAAqD;EACrD,wDAAiD;AACnD;;AAEA;EACE;IACE,2BAA2B;EAC7B;AACF;;AAEA;EACE,uBAAuB;EACvB,oBAAoB;EACpB;oEACkE;EAClE,wCAAwC;EACxC,6BAA6B;EAC7B,6BAA6B;EAC7B,sBAAsB;AACxB;;AAEA;EACE,kFAAkF;EAClF,6BAAqB;UAArB,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,kDAA2C;EAC3C,6BAA6B;EAC7B,mBAAmB;EACnB,yCAAyC;EACzC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,qBAAqB;EACrB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,mBAAmB;EACnB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,wDAAiD;EACjD,6BAA6B;EAC7B,qBAAqB;EACrB,uCAAuC;EACvC,0EAA0E;AAC5E;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,qBAAqB;EACvB;;EAEA;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE;IACE,UAAU;IACV,mBAAmB;EACrB;;EAEA;IACE,UAAU;IACV,qBAAqB;EACvB;;EAEA;IACE,UAAU;IACV,uBAAuB;EACzB;AACF;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,oFAAoF;AACtF;;AAEA;EACE,eAAe;EACf,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,mBAAmB;EACnB,kBAAkB;EAClB,UAAU;EACV,uBAAuB;EACvB,yBAAyB;;EAEzB;IACE,WAAW;IACX,kBAAkB;IAClB,SAAS;IACT,UAAU;IACV,WAAW;IACX,iBAAiB;IACjB,uBAAuB;IACvB,wBAAwB;IACxB,wBAAwB;IACxB,6BAA6B;IAC7B,2BAA2B;IAC3B,UAAU;IACV;;;;;;;;;;;;kBAYc;IACd,kEAA2D;IAC3D,oCAAoC;EACtC;;EAEA;IACE,WAAW;IACX,WAAW;IACX,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,yBAAyB;IACzB,OAAO;IACP,MAAM;EACR;AACF;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,2BAA2B;EAC7B;;EAEA;IACE,wBAAwB;EAC1B;AACF;;AAEA;EACE,kBAAkB;EAClB,YAAY;;EAEZ;IACE,cAAc;IACd,gCAAyB;IACzB,sCAAsC;IACtC,mCAAmC;IACnC,sBAAsB;IACtB,4BAA4B;IAC5B,6BAA6B;IAC7B,kBAAkB;IAClB,eAAe;;IAEf;MACE,kBAAkB;MAClB,WAAW;MACX,mCAA2B;cAA3B,2BAA2B;IAC7B;;IAEA;MACE,2BAA2B;IAC7B;;IAEA;MACE,2CAA2C;IAC7C;;IAEA;MACE,2CAA2C;IAC7C;EACF;AACF;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,wBAAwB;EAC1B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,uCAAuC;EACvC,kBAAkB;EAClB,qBAAqB;EACrB,2BAA2B;EAC3B,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,yBAAyB;EACzB,kBAAkB;EAClB,WAAW;EACX,eAAe;EACf,UAAU;EACV,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;;EAEE,WAAW;EACX,cAAc;EACd,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,kBAAkB;EAClB,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,UAAU;EACV,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,2CAAoC;AACtC;;AAEA;EACE,8CAAuC;AACzC;;AAEA;;EAEE,yBAAyB;EACzB,WAAW;AACb;;AAEA;;;;EAIE,qBAAqB;AACvB;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,sBAAsB;IACtB,UAAU;EACZ;;EAEA;IACE,mBAAmB;IACnB,UAAU;EACZ;AACF;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,gCAAgC;EAClC;;EAEA;IACE,wBAAwB;EAC1B;AACF;;AAEA;EACE,6CAAsC;EACtC,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,YAAY;EACZ,WAAW;EACX,+DAA+D;EAC/D,0BAA0B;EAC1B,2FAAmF;UAAnF,mFAAmF;AACrF;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,YAAY;EACZ,WAAW;EACX,+DAA+D;EAC/D,0BAA0B;AAC5B;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,YAAY;EACZ,WAAW;EACX;mDACiD;EACjD,0BAA0B;AAC5B;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB;;8DAE4D;EAC5D,2CAAoC;AACtC;;AAEA;EACE;IACE,eAAe;EACjB;AACF;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,eAAe;AACjB",sourcesContent:[`.avatar {
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
  padding: 0 1.8rem;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  z-index: 0;
  color: rgb(255 255 255);
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
        rgb(255 0 0),
        rgb(255 115 0),
        rgb(255 251 0),
        rgb(72 255 0),
        rgb(0 255 213),
        rgb(0 43 255),
        rgb(122 0 255),
        rgb(255 0 200),
        rgb(255 0 0)
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
    background: rgb(17 17 17);
    left: 0;
    top: 0;
  }
}

@keyframes dv-wu {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 400% 0;
  }

  100% {
    background-position: 0 0;
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
  0% {
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

  100% {
    transform: rotateX(1turn);
  }
}

.video-box .video-btn {
  box-shadow: 0 6px 10px rgb(0 0 0 / 20%);
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

.video-box .video-btn::after,
.video-box .video-btn::before {
  content: '';
  display: block;
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 50%;
  border: 1px solid #1d5fca;
  transition: 0.5s;
}

.video-box .video-btn i {
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
}

.video-box .video-btn::before {
  animation: ripple 2s linear infinite;
}

.video-box .video-btn::after {
  animation: ripple 2s linear 1s infinite;
}

.video-box .video-btn:focus,
.video-box .video-btn:hover {
  background-color: #2d995d;
  color: #fff;
}

.video-box .video-btn:focus::after,
.video-box .video-btn:focus::before,
.video-box .video-btn:hover::after,
.video-box .video-btn:hover::before {
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

  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes effect-1 {
  0% {
    text-shadow: 0 0 #32a8a2;
  }

  40% {
    text-shadow: 2px 2px 5px #32a8a2;
  }

  100% {
    text-shadow: 0 0 #32a8a2;
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
  mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%);
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
    linear-gradient(#80808012 1px, transparent 1px);
  background-size: 24px 24px;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border: 3px solid #0000;
  border-radius: 12px;
  background:
    linear-gradient(#131219, #131219) padding-box,
    linear-gradient(var(--angle), #070707, #687aff) border-box;
  animation: 4s rotate linear infinite;
}

@keyframes rotate {
  to {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
`],sourceRoot:""}]),i.locals={avatar:"avatar--tAk6h",levitate:"levitate--RZCwS",maskBox:"maskBox--uAYjJ",watermark:"watermark--YUolT","blend-me":"blend-me--f5L11",blendMe:"blend-me--f5L11","move-me":"move-me--FUPwc",moveMe:"move-me--FUPwc",button:"button--GgsIa","button-label":"button-label--d_jxl",buttonLabel:"button-label--d_jxl","circle-1":"circle-1--kJj6k",circle1:"circle-1--kJj6k",expand:"expand--kmoUS","circle-2":"circle-2--YMeVl",circle2:"circle-2--YMeVl","expand-opacity":"expand-opacity--XzitQ",expandOpacity:"expand-opacity--XzitQ","circle-3":"circle-3--DvCUJ",circle3:"circle-3--DvCUJ","circle-4":"circle-4--UkUyn",circle4:"circle-4--UkUyn",line:"line--Lp5NS",eHElAY:"eHElAY--ul0hZ",eHElAy:"eHElAY--ul0hZ","dv-wu":"dv-wu--sf_Ta",dvWu:"dv-wu--sf_Ta",stages:"stages--wh47k","spin-cube":"spin-cube--eXtsy",spinCube:"spin-cube--eXtsy",cubeSpinner:"cubeSpinner--eOJc0",face1:"face1--KIPp1",face2:"face2--aYKpi",face3:"face3--M7CTV","video-box":"video-box--RWlhc",videoBox:"video-box--RWlhc","video-btn":"video-btn--PPzlz",videoBtn:"video-btn--PPzlz",ripple:"ripple--Ojifa",effect:"effect--mKRM4","effect-1":"effect-1--LXEum",effect1:"effect-1--LXEum",dotMask:"dotMask--sy6CL",dot:"dot--jqRVx",grid:"grid--UCn5k",box:"box--kP2q7",rotate:"rotate--r6Mu6"},n.A=i},43825:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(54756)),u=o(e(29293)),t=o(e(85715)),i=e(96540),p=function(){var s=(0,i.useState)(null),_=(0,t.default)(s,2),A=_[0],d=_[1],a=function(){var r=(0,u.default)(l.default.mark(function m(y){return l.default.wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.prev=0,g.next=3,navigator.clipboard.writeText(y);case 3:d({state:"success"}),g.next=10;break;case 6:throw g.prev=6,g.t0=g.catch(0),d({state:"error",message:g.t0.message}),g.t0;case 10:return g.prev=10,setTimeout(function(){d(null)},2e3),g.finish(10);case 13:case"end":return g.stop()}},m,null,[[0,6,10,13]])}));return function(y){return r.apply(this,arguments)}}();return[a,A]},E=n.default=p},34573:function(v,n,e){"use strict";var o=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(85715)),t=p(e(96540));function i(s){if(typeof WeakMap!="function")return null;var _=new WeakMap,A=new WeakMap;return(i=function(a){return a?A:_})(s)}function p(s,_){if(!_&&s&&s.__esModule)return s;if(s===null||l(s)!="object"&&typeof s!="function")return{default:s};var A=i(_);if(A&&A.has(s))return A.get(s);var d={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in s)if(r!=="default"&&{}.hasOwnProperty.call(s,r)){var m=a?Object.getOwnPropertyDescriptor(s,r):null;m&&(m.get||m.set)?Object.defineProperty(d,r,m):d[r]=s[r]}return d.default=s,A&&A.set(s,d),d}var E=function(){var _=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",d=(0,t.useState)(A?void 0:0),a=(0,u.default)(d,2),r=a[0],m=a[1],y=function(){return m(function(g){return((g!=null?g:-1)+1)%_.length})};return[r==null&&A?A:_[r!=null?r:0],y]},f=n.default=E},87333:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(85715)),u=e(96540),t=o(e(43591)),i=function(s){return s?s.getBoundingClientRect():null},p=function(){var s=(0,u.useRef)(null),_=s.current||null,A=(0,u.useState)(i(_)),d=(0,l.default)(A,2),a=d[0],r=d[1],m=(0,u.useCallback)(function(){s.current&&r(i(s.current))},[s]);return(0,u.useLayoutEffect)(function(){var y=s.current;if(y){if(m(),typeof t.default=="function"){var O=new t.default(function(){return m()});return O.observe(y),function(){O&&(O.disconnect(),O=null)}}return window.addEventListener("resize",m),function(){return window.removeEventListener("resize",m)}}},[m]),[a,s]},E=n.default=p},2307:function(v,n,e){"use strict";var o=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=t(e(96540));function u(E){if(typeof WeakMap!="function")return null;var f=new WeakMap,s=new WeakMap;return(u=function(A){return A?s:f})(E)}function t(E,f){if(!f&&E&&E.__esModule)return E;if(E===null||o(E)!="object"&&typeof E!="function")return{default:E};var s=u(f);if(s&&s.has(E))return s.get(E);var _={__proto__:null},A=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var d in E)if(d!=="default"&&{}.hasOwnProperty.call(E,d)){var a=A?Object.getOwnPropertyDescriptor(E,d):null;a&&(a.get||a.set)?Object.defineProperty(_,d,a):_[d]=E[d]}return _.default=E,s&&s.set(E,_),_}var i=function(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(){};(0,l.useEffect)(function(){var s=new AbortController;return document.documentElement.addEventListener("click",function(){f()},{signal:s.signal}),document.documentElement.addEventListener("mousedown",function(_){_.detail>1&&_.preventDefault()},{signal:s.signal}),function(){s.abort()}},[])},p=n.default=i},81286:function(v,n,e){"use strict";var o=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=p(e(96540)),t=o(e(25039));function i(s){if(typeof WeakMap!="function")return null;var _=new WeakMap,A=new WeakMap;return(i=function(a){return a?A:_})(s)}function p(s,_){if(!_&&s&&s.__esModule)return s;if(s===null||l(s)!="object"&&typeof s!="function")return{default:s};var A=i(_);if(A&&A.has(s))return A.get(s);var d={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in s)if(r!=="default"&&{}.hasOwnProperty.call(s,r)){var m=a?Object.getOwnPropertyDescriptor(s,r):null;m&&(m.get||m.set)?Object.defineProperty(d,r,m):d[r]=s[r]}return d.default=s,A&&A.set(s,d),d}var E=function(_){var A=_.alternateText,d=A===void 0?[]:A;return(0,u.useEffect)(function(){var a=document.getElementById("alternating-text"),r=0,m=function(O){r=r<d.length-1?r+1:0,a.innerHTML=d[r]};return a.innerHTML=d[0],a.addEventListener("animationiteration",m,!1),function(){a.removeEventListener("animationiteration",m,!1)}},[]),u.default.createElement("span",{className:t.default.alternating,id:"alternating-text"},d[0]||"Text goes here")},f=n.default=E},44322:function(v,n,e){"use strict";var o=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(43693)),t=o(e(85715)),i=E(e(96540));function p(g){if(typeof WeakMap!="function")return null;var C=new WeakMap,h=new WeakMap;return(p=function(j){return j?h:C})(g)}function E(g,C){if(!C&&g&&g.__esModule)return g;if(g===null||l(g)!="object"&&typeof g!="function")return{default:g};var h=p(C);if(h&&h.has(g))return h.get(g);var x={__proto__:null},j=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var I in g)if(I!=="default"&&{}.hasOwnProperty.call(g,I)){var M=j?Object.getOwnPropertyDescriptor(g,I):null;M&&(M.get||M.set)?Object.defineProperty(x,I,M):x[I]=g[I]}return x.default=g,h&&h.set(g,x),x}function f(g,C){var h=Object.keys(g);if(Object.getOwnPropertySymbols){var x=Object.getOwnPropertySymbols(g);C&&(x=x.filter(function(j){return Object.getOwnPropertyDescriptor(g,j).enumerable})),h.push.apply(h,x)}return h}function s(g){for(var C=1;C<arguments.length;C++){var h=arguments[C]!=null?arguments[C]:{};C%2?f(Object(h),!0).forEach(function(x){(0,u.default)(g,x,h[x])}):Object.getOwnPropertyDescriptors?Object.defineProperties(g,Object.getOwnPropertyDescriptors(h)):f(Object(h)).forEach(function(x){Object.defineProperty(g,x,Object.getOwnPropertyDescriptor(h,x))})}return g}var _=function(C){var h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"0px",x=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,j=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1,I=(0,i.useState)(!0),M=(0,t.default)(I,2),S=M[0],P=M[1],T=(0,i.useRef)(null);return(0,i.useEffect)(function(){return T.current=new IntersectionObserver(function(W){var k=(0,t.default)(W,1),z=k[0];z.isIntersecting&&z.intersectionRatio>=x?(P(!0),j&&T.current.disconnect()):P(!1)},{rootMargin:h,threshold:x}),C.current&&T.current.observe(C.current),function(){C.current&&T.current.unobserve(C.current)}},[C,h,x,j]),S},A=function(C){var h=C.from,x=C.to,j=C.rootMargin,I=C.threshold,M=C.triggerOnce,S=C.children,P=(0,i.useRef)(null),T=_(P,j,I,M),W={transition:"1000ms ease-in-out"};return i.default.createElement("div",{ref:P,style:T?s(s({},W),x):s(s({},W),h)},S)},d=function(C){var h=C.rootMargin,x=h===void 0?"0px":h,j=C.threshold,I=j===void 0?0:j,M=C.triggerOnce,S=M===void 0?!1:M,P=C.children;return i.default.createElement(A,{from:{opacity:0},to:{opacity:1},rootMargin:x,threshold:I,triggerOnce:S},P)},a=function(C){var h=C.rootMargin,x=h===void 0?"0px":h,j=C.threshold,I=j===void 0?0:j,M=C.triggerOnce,S=M===void 0?!1:M,P=C.children;return i.default.createElement(A,{from:{opacity:0,translate:"0 2rem"},to:{opacity:1,translate:"none"},rootMargin:x,threshold:I,triggerOnce:S},P)},r=function(C){var h=C.rootMargin,x=h===void 0?"0px":h,j=C.threshold,I=j===void 0?0:j,M=C.triggerOnce,S=M===void 0?!1:M,P=C.children;return i.default.createElement(A,{from:{scale:"0"},to:{scale:"1"},rootMargin:x,threshold:I,triggerOnce:S},P)},m=function(C){var h=C.from,x=C.to,j=C.rootMargin,I=j===void 0?"0px":j,M=C.threshold,S=M===void 0?0:M,P=C.triggerOnce,T=P===void 0?!1:P,W=C.children;return i.default.createElement(A,{from:h,to:x,rootMargin:I,threshold:S,triggerOnce:T},W)},y={FadeIn:d,FadeUp:a,ScaleIn:r,DiyAnimation:m},O=n.default=y},53795:function(v,n,e){"use strict";var o=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(94634)),t=o(e(91847)),i=o(e(85715)),p=_(e(96540)),E=o(e(48122)),f=["children","onClick"];function s(r){if(typeof WeakMap!="function")return null;var m=new WeakMap,y=new WeakMap;return(s=function(g){return g?y:m})(r)}function _(r,m){if(!m&&r&&r.__esModule)return r;if(r===null||l(r)!="object"&&typeof r!="function")return{default:r};var y=s(m);if(y&&y.has(r))return y.get(r);var O={__proto__:null},g=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var C in r)if(C!=="default"&&{}.hasOwnProperty.call(r,C)){var h=g?Object.getOwnPropertyDescriptor(r,C):null;h&&(h.get||h.set)?Object.defineProperty(O,C,h):O[C]=r[C]}return O.default=r,y&&y.set(r,O),O}var A=function(){var m=p.default.useState({x:-1,y:-1}),y=(0,i.default)(m,2),O=y[0],g=O.x,C=O.y,h=y[1],x=g!==-1&&C!==-1,j=function(M){var S=M.currentTarget.getBoundingClientRect(),P=S.left,T=S.top;h({x:M.clientX-P,y:M.clientY-T}),setTimeout(function(){h({x:-1,y:-1})},300)};return{x:g,y:C,handleRippleOnClick:j,isRippling:x}},d=function(m){var y=m.children,O=m.onClick,g=(0,t.default)(m,f),C=A(),h=C.x,x=C.y,j=C.handleRippleOnClick,I=C.isRippling,M=function(P){j(P),O&&O(P)};return p.default.createElement("button",(0,u.default)({type:"button",onClick:M,className:E.default.btn},g),p.default.createElement("span",{className:E.default.content},y),I&&p.default.createElement("div",{className:E.default["btn-ripple-container"]},p.default.createElement("span",{className:E.default["btn-ripple"],style:{left:h,top:x}})))},a=n.default=d},85666:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(96540)),u=o(e(57903)),t=function(E){var f=E.children;return l.default.createElement(l.default.Fragment,null,l.default.createElement("section",{className:u.default.hIBkFg},l.default.createElement("h2",null,"Design and code"," ",l.default.createElement("span",{className:u.default.kqOLaE},l.default.createElement("span",null,"R"),l.default.createElement("span",null,"e"),l.default.createElement("span",null,"a"),l.default.createElement("span",null,"c"),l.default.createElement("span",null,"t"))," ","apps")))},i=n.default=t},59409:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(96540)),u=o(e(21958)),t=function(E){var f=E.text,s=/((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;return l.default.createElement(l.default.Fragment,null,f.split(s).map(function(_,A){var d=_.match(s);if(d){var a=d[0];return l.default.createElement("a",{key:A,className:u.default.squiggle,target:"_blank",href:a.startsWith("http")?a:"http://".concat(a)},a)}return _}))},i=n.default=t},76017:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(96540)),u=o(e(39726)),t=function(E){var f=E.avatar,s=E.text;return l.default.createElement("div",{className:u.default.avatarCard},l.default.createElement("div",{className:u.default.card},l.default.createElement("figure",null,l.default.createElement("img",{alt:"",src:f,className:u.default.avatar})),l.default.createElement("p",{className:u.default.content},s)))},i=n.default=t},12770:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(96540)),u=o(e(49511)),t=function(){return l.default.createElement(l.default.Fragment,null,l.default.createElement("section",{className:u.default.breatheItem},l.default.createElement("span",null,"Breathe")))},i=n.default=t},42916:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(43693)),u=o(e(96540));function t(f,s){var _=Object.keys(f);if(Object.getOwnPropertySymbols){var A=Object.getOwnPropertySymbols(f);s&&(A=A.filter(function(d){return Object.getOwnPropertyDescriptor(f,d).enumerable})),_.push.apply(_,A)}return _}function i(f){for(var s=1;s<arguments.length;s++){var _=arguments[s]!=null?arguments[s]:{};s%2?t(Object(_),!0).forEach(function(A){(0,l.default)(f,A,_[A])}):Object.getOwnPropertyDescriptors?Object.defineProperties(f,Object.getOwnPropertyDescriptors(_)):t(Object(_)).forEach(function(A){Object.defineProperty(f,A,Object.getOwnPropertyDescriptor(_,A))})}return f}var p=function(s){var _=s.style,A=s.children;return u.default.createElement("div",{style:i({width:"100%",minHeight:"calc(100vh - 232px)"},_)},A)},E=n.default=p},18903:function(v,n,e){"use strict";var o=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=p(e(96540)),t=o(e(84576));function i(s){if(typeof WeakMap!="function")return null;var _=new WeakMap,A=new WeakMap;return(i=function(a){return a?A:_})(s)}function p(s,_){if(!_&&s&&s.__esModule)return s;if(s===null||l(s)!="object"&&typeof s!="function")return{default:s};var A=i(_);if(A&&A.has(s))return A.get(s);var d={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in s)if(r!=="default"&&{}.hasOwnProperty.call(s,r)){var m=a?Object.getOwnPropertyDescriptor(s,r):null;m&&(m.get||m.set)?Object.defineProperty(d,r,m):d[r]=s[r]}return d.default=s,A&&A.set(s,d),d}var E=function(){var _=(0,u.useRef)(null);return(0,u.useLayoutEffect)(function(){var A=_.current,d=function(r){var m=r.target.getBoundingClientRect(),y=r.clientX-m.left,O=r.clientY-m.top;A.style.setProperty("--x",y+"px"),A.style.setProperty("--y",O+"px")};return A.addEventListener("mousemove",d),function(){A.removeEventListener("mousemove",d)}},[]),u.default.createElement("button",{className:t.default.gradientTracking,ref:_},u.default.createElement("span",null,"Hover me"))},f=n.default=E},52537:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(96540)),u=o(e(85120)),t=function(E){var f=E.text;return l.default.createElement("div",{className:u.default.isometricCard},l.default.createElement("p",null,f))},i=n.default=t},35317:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(94634)),u=o(e(85715)),t=o(e(91847)),i=o(e(96540)),p=o(e(61352)),E=["alt","src","className","loadInitially","observerOptions"],f=function(A){var d=A.alt,a=A.src,r=A.className,m=A.loadInitially,y=m===void 0?!1:m,O=A.observerOptions,g=O===void 0?{root:null,rootMargin:"200px 0px"}:O,C=(0,t.default)(A,E),h=i.default.useRef(null),x=i.default.useRef(null),j=i.default.useState(y),I=(0,u.default)(j,2),M=I[0],S=I[1],P=i.default.useCallback(function(T){T[0].isIntersecting&&(h.current.disconnect(),S(!0))},[h]);return i.default.useEffect(function(){if(!y){if("loading"in HTMLImageElement.prototype){S(!0);return}return h.current=new IntersectionObserver(P,g),h.current.observe(x.current),function(){h.current.disconnect()}}},[]),i.default.createElement("figure",{className:p.default.hoverRotate},i.default.createElement("img",(0,l.default)({alt:d,src:M?a:"",ref:x,className:r,loading:y?void 0:"lazy"},C)),i.default.createElement("figcaption",null,i.default.createElement("h3",null,"Lorem ",i.default.createElement("br",null),"Ipsum")))},s=n.default=f},22807:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(96540)),u=o(e(89696)),t=function(E){var f=E.text;return l.default.createElement("span",{className:u.default.lineBordered},f)},i=n.default=t},75747:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(96540)),u=o(e(89200)),t=function(E){return l.default.createElement("div",{style:{position:"relative",height:"100%"}},l.default.createElement("div",{className:u.default.background},"Mesh Gradient Background"))},i=n.default=t},67896:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(85715)),u=o(e(44782)),t=o(e(34573)),i=o(e(2307)),p=[398.43,-3243.5,1435237],E=function(){var _=(0,t.default)(p),A=(0,l.default)(_,2),d=A[0],a=A[1];return(0,i.default)(a),React.createElement(u.default,{value:d,trend:0})},f=n.default=E},81740:function(v,n,e){"use strict";var o=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(54756)),t=o(e(94634)),i=o(e(85715)),p=o(e(29293)),E=x(e(96540)),f=e(28048),s=o(e(43160)),_=o(e(41512)),A=o(e(54152)),d=o(e(63940)),a=o(e(37948)),r=o(e(73410)),m=o(e(51498)),y=o(e(7230)),O=e(81591),g=o(e(65548));e(35819);var C=o(e(49887));function h(P){if(typeof WeakMap!="function")return null;var T=new WeakMap,W=new WeakMap;return(h=function(z){return z?W:T})(P)}function x(P,T){if(!T&&P&&P.__esModule)return P;if(P===null||l(P)!="object"&&typeof P!="function")return{default:P};var W=h(T);if(W&&W.has(P))return W.get(P);var k={__proto__:null},z=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var Z in P)if(Z!=="default"&&{}.hasOwnProperty.call(P,Z)){var w=z?Object.getOwnPropertyDescriptor(P,Z):null;w&&(w.get||w.set)?Object.defineProperty(k,Z,w):k[Z]=P[Z]}return k.default=P,W&&W.set(P,k),k}var j=function(){var P=(0,p.default)(u.default.mark(function T(W){var k,z;return u.default.wrap(function(w){for(;;)switch(w.prev=w.next){case 0:if(w.prev=0,!((k=navigator)!==null&&k!==void 0&&(k=k.clipboard)!==null&&k!==void 0&&k.writeText)){w.next=5;break}return w.next=4,navigator.clipboard.writeText(W);case 4:f.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F");case 5:w.next=16;break;case 7:w.prev=7,w.t0=w.catch(0),z=document.createElement("textarea"),z.value=W,document.body.appendChild(z),z.focus(),z.select();try{document.execCommand("copy"),f.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F")}catch(V){f.message.success("\u590D\u5236\u5230\u526A\u8D34\u677F\u5931\u8D25")}document.body.removeChild(z);case 16:case"end":return w.stop()}},T,null,[[0,7]])}));return function(W){return P.apply(this,arguments)}}(),I=function(T){var W,k=(0,E.useRef)(null),z=(W=k.current)===null||W===void 0?void 0:W.innerText,Z=(0,E.useRef)(""),w=(0,O.useDebouncedCallback)(function(){if(k.current){var V=k.current.querySelector("code"),G=V.className,re=/language-(\w+)/.exec(G||"");if(re){var U=(0,i.default)(re,2),te=U[1];Z.current=te}}},800);return(0,E.useEffect)(function(){setTimeout(w,1)},[z]),E.default.createElement("section",null,E.default.createElement("section",{className:C.default.copySection},E.default.createElement("span",{className:C.default.lang},Z.current),E.default.createElement("span",{className:C.default.copySpan,role:"button",onClick:function(){if(k.current){var G=k.current.innerText;j(G)}}},"\u590D\u5236\u4EE3\u7801")),E.default.createElement("pre",{className:C.default.preCode,ref:k},T.children))},M=function(T){var W=T.markdownText,k=W===void 0?"":W,z=T.isLoading,Z=z===void 0?!1:z;return E.default.createElement("section",{className:C.default.markdownBody},Z&&!k&&E.default.createElement(s.default,{component:g.default,style:{color:"#fff"},className:C.default.loadingIcon}),k&&E.default.createElement(_.default,{remarkPlugins:[A.default,r.default,d.default],rehypePlugins:[a.default,y.default,[m.default,{detect:!1,ignoreMissing:!0}]],components:{pre:I,p:function(V){return E.default.createElement("p",(0,t.default)({},V,{dir:"auto"}))},a:function(V){var G,re=V.href||"",U=/^\/#/i.test(re),te=U?"_self":(G=V.target)!==null&&G!==void 0?G:"_blank";return E.default.createElement("a",(0,t.default)({},V,{target:te}))}}},k))},S=n.default=M},63023:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(96540)),u=e(23947),t=function(E){var f=E.children;return l.default.createElement(u.motion.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{ease:"linear",duration:1,y:{duration:.5}}},f)},i=n.default=t},80201:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(94634)),u=o(e(85715)),t=o(e(96540)),i=e(77450),p=o(e(43825)),E=e(43160),f=o(e(71352)),s=function(d){var a=d.preCode,r=(0,p.default)(),m=(0,u.default)(r,2),y=m[0],O=m[1],g=function(){y(a)};return t.default.createElement("div",{className:"rounded-md bg-cyan-800 text-zinc-50"},t.default.createElement("header",{className:"grid grid-cols-6 gap-3 items-center px-4 py-3"},t.default.createElement("div",{className:"flex gap-1.5"},t.default.createElement("div",{className:"rounded-full h-3 w-3 bg-red-500"}),t.default.createElement("div",{className:"rounded-full h-3 w-3 bg-yellow-500"}),t.default.createElement("div",{className:"rounded-full h-3 w-3 bg-green-500"})),t.default.createElement("div",{className:"col-span-4 flex justify-center"},t.default.createElement("div",{className:"bg-transparent text-center text-gray-400 text-sm font-medium focus:outline-none"},"Untitled"))),t.default.createElement("div",{className:"relative px-4 pb-4"},t.default.createElement("div",{className:"absolute top-2 right-5 size-4 text-gray-400"},(O==null?void 0:O.state)==="success"?t.default.createElement(E.CheckCircleTwoTone,{className:"size-4 text-base",twoToneColor:"#52c41a"}):t.default.createElement(E.CopyOutlined,{className:"size-4 text-base",onClick:g})),t.default.createElement(i.Highlight,{theme:i.themes.dracula,className:f.default.wrapper,code:a==null?void 0:a.trim(),language:"jsx"},function(C){var h=C.style,x=C.tokens,j=C.getLineProps,I=C.getTokenProps;return t.default.createElement("pre",{className:f.default.pre,style:h},x.map(function(M,S){return t.default.createElement("div",(0,l.default)({className:f.default.line,key:S},j({line:M})),t.default.createElement("span",{className:f.default["line-no"]},S+1),M.map(function(P,T){return t.default.createElement("span",(0,l.default)({key:T},I({token:P})))}))}))})))},_=n.default=s},3102:function(v,n,e){"use strict";var o=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=p(e(96540)),t=o(e(91193));function i(s){if(typeof WeakMap!="function")return null;var _=new WeakMap,A=new WeakMap;return(i=function(a){return a?A:_})(s)}function p(s,_){if(!_&&s&&s.__esModule)return s;if(s===null||l(s)!="object"&&typeof s!="function")return{default:s};var A=i(_);if(A&&A.has(s))return A.get(s);var d={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in s)if(r!=="default"&&{}.hasOwnProperty.call(s,r)){var m=a?Object.getOwnPropertyDescriptor(s,r):null;m&&(m.get||m.set)?Object.defineProperty(d,r,m):d[r]=s[r]}return d.default=s,A&&A.set(s,d),d}var E=function(){var _=(0,u.useRef)(null);return(0,u.useLayoutEffect)(function(){var A=_.current,d=A.getBoundingClientRect(),a=d.x,r=d.y,m=d.width,y=m===void 0?240:m,O=d.height,g=O===void 0?360:O,C=a+(y||240)/2,h=r+(g||360)/2,x=function(M){var S=M.pageX,P=M.pageY,T=(C-S)/((y||240)/2),W=(h-P)/((g||360)/2);A.style.setProperty("--dx",T),A.style.setProperty("--dy",W)},j=function(){A.style.setProperty("--dx",0),A.style.setProperty("--dy",0)};return A.addEventListener("mousemove",x),A.addEventListener("mouseleave",j),function(){A.removeEventListener("mousemove",x),A.removeEventListener("mouseleave",j)}},[]),u.default.createElement("div",{ref:_,className:t.default.shiftingCard},u.default.createElement("h3",null,"Shifting Card"))},f=n.default=E},31456:function(v,n,e){"use strict";var o=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(43693)),t=o(e(85715)),i=f(e(96540)),p=o(e(81709));function E(a){if(typeof WeakMap!="function")return null;var r=new WeakMap,m=new WeakMap;return(E=function(O){return O?m:r})(a)}function f(a,r){if(!r&&a&&a.__esModule)return a;if(a===null||l(a)!="object"&&typeof a!="function")return{default:a};var m=E(r);if(m&&m.has(a))return m.get(a);var y={__proto__:null},O=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if(g!=="default"&&{}.hasOwnProperty.call(a,g)){var C=O?Object.getOwnPropertyDescriptor(a,g):null;C&&(C.get||C.set)?Object.defineProperty(y,g,C):y[g]=a[g]}return y.default=a,m&&m.set(a,y),y}function s(a,r){var m=Object.keys(a);if(Object.getOwnPropertySymbols){var y=Object.getOwnPropertySymbols(a);r&&(y=y.filter(function(O){return Object.getOwnPropertyDescriptor(a,O).enumerable})),m.push.apply(m,y)}return m}function _(a){for(var r=1;r<arguments.length;r++){var m=arguments[r]!=null?arguments[r]:{};r%2?s(Object(m),!0).forEach(function(y){(0,u.default)(a,y,m[y])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(m)):s(Object(m)).forEach(function(y){Object.defineProperty(a,y,Object.getOwnPropertyDescriptor(m,y))})}return a}var A=function(r){var m=r.className,y=r.style,O=r.children,g=(0,i.useRef)(null),C=(0,i.useState)(!1),h=(0,t.default)(C,2),x=h[0],j=h[1],I=(0,i.useState)({x:0,y:0}),M=(0,t.default)(I,2),S=M[0],P=M[1],T=(0,i.useState)(0),W=(0,t.default)(T,2),k=W[0],z=W[1],Z=function(te){if(!(!g.current||x)){var ue=g.current,_e=ue.getBoundingClientRect();P({x:te.clientX-_e.left,y:te.clientY-_e.top})}},w=function(){j(!0),z(1)},V=function(){j(!1),z(0)},G=function(){z(1)},re=function(){z(0)};return i.default.createElement("section",{ref:g,onMouseMove:Z,onFocus:w,onBlur:V,onMouseEnter:G,onMouseLeave:re,className:"".concat(p.default.cardEffect," ").concat(m),style:_({},y)},i.default.createElement("section",{className:p.default.spotlight,style:{opacity:k,background:"radial-gradient(1000px circle at ".concat(S.x,"px ").concat(S.y,"px, rgba(190,255,255,.2), transparent 40%)")}}),i.default.createElement("section",{className:p.default.spotlight,style:{opacity:k,border:"2px solid rgb(255, 255, 255)",borderRadius:"8px",WebkitMaskImage:"radial-gradient(40% 40% at ".concat(S.x,"px ").concat(S.y,"px, black 45%, transparent)")}}),O)},d=n.default=A},3783:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=o(e(96540)),u=o(e(95280)),t=function(){return l.default.createElement("div",{className:"relative flex flex-col items-center justify-center overflow-hidden"},l.default.createElement("div",{className:"not-prose my-5 w-full"},l.default.createElement("ul",{className:"flex w-full flex-wrap items-center justify-center gap-3"},l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"'use server'"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useOptimistic"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"React Server Components"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Concurrent Rendering"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useActionState"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Improved Hydration"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Form Actions"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Server Actions"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Suspense"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"'use client'"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useTransition"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"React Compiler"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Streaming"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"useFormStatus"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"New React Hooks"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"use()"),l.default.createElement("li",{className:"flex h-10 items-center justify-center rounded border border-[#DEDFE2] bg-gradient-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg"},"Automatic Memoization"))),l.default.createElement("div",{className:u.default.mask}))},i=n.default=t},59593:function(v,n,e){"use strict";var o=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(85715)),t=E(e(96540)),i=o(e(1052));function p(_){if(typeof WeakMap!="function")return null;var A=new WeakMap,d=new WeakMap;return(p=function(r){return r?d:A})(_)}function E(_,A){if(!A&&_&&_.__esModule)return _;if(_===null||l(_)!="object"&&typeof _!="function")return{default:_};var d=p(A);if(d&&d.has(_))return d.get(_);var a={__proto__:null},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var m in _)if(m!=="default"&&{}.hasOwnProperty.call(_,m)){var y=r?Object.getOwnPropertyDescriptor(_,m):null;y&&(y.get||y.set)?Object.defineProperty(a,m,y):a[m]=_[m]}return a.default=_,d&&d.set(_,a),a}var f=function(A){var d=A.children,a=A.delay,r=a===void 0?110:a,m=(0,t.useState)(0),y=(0,u.default)(m,2),O=y[0],g=y[1],C=setInterval(function(){return g(function(h){return h+1})},r);return(0,t.useEffect)(function(){O===d.length&&clearInterval(C)},[d,C,O]),(0,t.useEffect)(function(){return function(){return clearInterval(C)}},[C]),t.default.createElement(t.default.Fragment,null,d.substring(0,O),t.default.createElement("span",{className:i.default.typedCursorBlink},"|"))},s=n.default=(0,t.memo)(f)},76526:function(v,n,e){"use strict";var o=e(24994),l=e(73738);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e(85715)),t=ue(e(96540)),i=e(28048),p=e(43160),E=e(43125),f=o(e(64856)),s=o(e(31456)),_=o(e(8242)),A=o(e(51521)),d=ue(e(47159)),a=o(e(42916)),r=o(e(59593)),m=o(e(81740)),y=o(e(81286)),O=o(e(59409)),g=o(e(35317)),C=o(e(52537)),h=o(e(76017)),x=o(e(22807)),j=o(e(18903)),I=o(e(3102)),M=o(e(12770)),S=o(e(63023)),P=o(e(44322)),T=o(e(53795)),W=o(e(85666)),k=o(e(67896)),z=o(e(75747)),Z=o(e(87333)),w=o(e(3783)),V=o(e(80201)),G=e(31819),re=e(21378),U=o(e(47443));function te(F){if(typeof WeakMap!="function")return null;var ie=new WeakMap,q=new WeakMap;return(te=function(ee){return ee?q:ie})(F)}function ue(F,ie){if(!ie&&F&&F.__esModule)return F;if(F===null||l(F)!="object"&&typeof F!="function")return{default:F};var q=te(ie);if(q&&q.has(F))return q.get(F);var ae={__proto__:null},ee=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var H in F)if(H!=="default"&&{}.hasOwnProperty.call(F,H)){var se=ee?Object.getOwnPropertyDescriptor(F,H):null;se&&(se.get||se.set)?Object.defineProperty(ae,H,se):ae[H]=F[H]}return ae.default=F,q&&q.set(F,ae),ae}var _e=function(){var ie=(0,t.useState)(""),q=(0,u.default)(ie,2),ae=q[0],ee=q[1],H=(0,t.useRef)(null),se=(0,t.useState)(!1),ge=(0,u.default)(se,2),ce=ge[0],le=ge[1],je=(0,t.useState)(""),pe=(0,u.default)(je,2),Ie=pe[0],Ce=pe[1],ve=(0,t.useRef)(null),Te=(0,t.useState)(function(){return""}),Be=(0,u.default)(Te,2),ye=Be[0],Re=Be[1],he=(0,t.useState)(""),be=(0,u.default)(he,2),b=be[0],c=be[1],B=(0,t.useRef)(null),D=function($){Re($.target.value)},R=function($){c($.target.value)},L=function($){$.metaKey&&$.key==="Enter"&&(K(),$.preventDefault())},K=function(){if(b.trim()!==""){var $=new AbortController;ve.current=$,X(b,ye,$)}},Y=function(){ve.current.abort(),le(!1)},X=function($,Ke,ze){H.current="",ee(H.current);var we=ze.signal;le(!0),(0,G.oneApiChat)([{content:$,role:"user"}],Ke,we).then(function(ne){var J=ne.headers.get("content-type");if(!ne.ok||!(J!=null&&J.startsWith("text/event-stream"))||ne.status!==200){if(J!=null&&J.startsWith("text/html")||J!=null&&J.startsWith("text/plain")){var Fe=ne.clone().text();Fe.then(function(Ee){ee(Ee)})}else if(J!=null&&J.startsWith("application/json")){var Ye=ne.clone().json();Ye.then(function(Ee){ee((0,G.prettyObject)(Ee))})}else ee(ne.statusText);le(!1)}else{var De,Xe=ne==null||(De=ne.body)===null||De===void 0?void 0:De.getReader(),Oe=`

`,de="",We="",Se=function(){Xe.read().then(function(Pe){var Ne=Pe.done,Ze=Pe.value;if(Ne){le(!1);return}for(de+=new TextDecoder().decode(Ze);de.includes(Oe);){var ke=de.indexOf(Oe),Ve=de.slice(0,ke),fe=Ve.split("data: ");for(var xe in fe)if(fe[xe]!==""&&fe[xe]!=="[DONE]")try{var Me,Ae,Qe=JSON.parse(fe[xe]),Ge=(Me=(Ae=Qe.choices[0])===null||Ae===void 0||(Ae=Ae.delta)===null||Ae===void 0?void 0:Ae.content)!==null&&Me!==void 0?Me:"";We+=Ge,Ce(new Date().toLocaleString()),H.current=We,ee(H.current)}catch(He){}de=de.slice(ke+Oe.length)}Se()}).catch(function(Pe){})};Se()}}).catch(function(ne){le(!1),ee(ne.message)})},oe=(0,Z.default)(),Q=(0,u.default)(oe,2),N=Q[0],Le=Q[1];return t.default.createElement(a.default,null,t.default.createElement("section",{style:{marginBottom:15}},t.default.createElement(r.default,null,"Cool! Hi, React & Ant Design!")),t.default.createElement("section",{className:U.default.avatar},"React version: ",t.version),t.default.createElement("section",null,"I love coding in ",t.default.createElement(y.default,{alternateText:["javascript","typescript","rect","vue"]}),"."),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(O.default,{text:"foo bar baz http://example.org bar https://github.com/wkylin/pro-react-admin"})),t.default.createElement("section",{className:U.default.line}),t.default.createElement("section",null,t.default.createElement(h.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."})),t.default.createElement("section",null,t.default.createElement(C.default,{text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?"})),t.default.createElement(x.default,{text:"A line bordered text."}),t.default.createElement("section",{style:{display:"flex",alignItems:"center",marginTop:10,marginBottom:40}},t.default.createElement(E.Atom,null)," ",t.default.createElement(E.Merge,null)," ",t.default.createElement(E.GitMerge,null)," ",t.default.createElement(E.GitPullRequestArrow,null)),t.default.createElement("section",{style:{marginBottom:40,fontSize:16}},t.default.createElement("h3",null,"React Animate On Scroll."),t.default.createElement("h3",null,t.default.createElement(O.default,{text:"https://motion.dev/ https://gsap.com/ https://www.react-spring.dev/ https://use-gesture.netlify.app/"})),t.default.createElement("h3",{style:{marginBottom:40}},t.default.createElement(O.default,{text:"https://www.npmjs.com/package/react-animate-on-scroll https://www.npmjs.com/package/react-scroll https://github.com/wellyshen/react-cool-inview"})),t.default.createElement(S.default,null,t.default.createElement(g.default,{src:"https://picsum.photos/seed/picsum/300/160",alt:"Strawberries"}))),t.default.createElement("section",{style:{marginBottom:40,fontSize:36}},t.default.createElement(_.default,{options:{strings:["Software Developer.","Full Stack Developer.","Open Source Contributor."],autoStart:!0,loop:!0,deleteSpeed:50}})),t.default.createElement("section",null,t.default.createElement(j.default,null)),t.default.createElement("section",{style:{margin:40}},t.default.createElement(M.default,null)),t.default.createElement("section",{style:{margin:"60px 0 40px 40px"}},t.default.createElement("div",{className:U.default["video-box"]},t.default.createElement("div",{className:U.default["video-btn"]},"b"))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(I.default,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(P.default.FadeIn,null,t.default.createElement(h.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."}))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(P.default.FadeUp,null,t.default.createElement("img",{src:"https://picsum.photos/360/200.jpg",alt:""}))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},t.default.createElement(P.default.ScaleIn,{triggerOnce:!1},t.default.createElement(t.default.Fragment,null,t.default.createElement("img",{src:"https://picsum.photos/360/200/?blur=2",alt:""}),t.default.createElement("section",{className:U.default["blend-me"]},"Mix Blend Mode")))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},t.default.createElement(P.default.DiyAnimation,{from:{opacity:0,transform:"translate(-100%, 0)"},to:{opacity:1,transform:"translate(0, 0)"},triggerOnce:!0},t.default.createElement("img",{src:"https://picsum.photos/360/200.jpg",alt:""}))),t.default.createElement("section",{style:{marginBottom:40,display:"flex"}},t.default.createElement(s.default,{className:"my-spot",style:{width:360,height:200,color:"#fff"}},t.default.createElement("section",null))),t.default.createElement("section",{className:U.default.box,style:{marginBottom:10,width:360,height:200,position:"relative",backgroundColor:"rgba(0, 0,0, 0.9)",borderRadius:8}},t.default.createElement("section",{className:U.default.dotMask,ref:Le},"dot mask")),t.default.createElement("section",{style:{marginBottom:40,fontSize:18}},t.default.createElement("section",null,"RectResult."),"width: ",parseInt(N==null?void 0:N.width)," height: ",parseInt(N==null?void 0:N.height)," top: ",parseInt(N==null?void 0:N.top)," bottom:"," ",parseInt(N==null?void 0:N.bottom)," right: ",parseInt(N==null?void 0:N.right)," left: ",parseInt(N==null?void 0:N.left)),t.default.createElement("section",{style:{marginBottom:40,height:200,width:360,overflow:"hidden"}},t.default.createElement(z.default,null)),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(T.default,null,"Click Me")),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement("section",{className:U.default.effect}," Hello CSS")),t.default.createElement("section",{style:{marginBottom:40},className:U.default.maskBox},t.default.createElement("section",{className:U.default.watermark},"water mark"),"mask"),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement("button",{className:U.default.button,onClick:re.fireConfetti},t.default.createElement("span",{className:U.default["button-label"]},"Click Me"))),t.default.createElement("section",{style:{position:"relative",margin:"80px 0 160px 100px"}},t.default.createElement("div",{className:U.default["circle-1"]}),t.default.createElement("div",{className:U.default["circle-2"]}),t.default.createElement("div",{className:U.default["circle-3"]}),t.default.createElement("div",{className:U.default["circle-4"]})),t.default.createElement("section",{style:{margin:20},className:U.default.eHElAY},"Hi, React!"),t.default.createElement("section",null,t.default.createElement("div",{className:U.default.stages},t.default.createElement("div",{className:U.default.cubeSpinner},t.default.createElement("span",{className:U.default.face1},"Web Services"),t.default.createElement("span",{className:U.default.face2},"Blockchain"),t.default.createElement("span",{className:U.default.face3},"Mobile Apps")))),t.default.createElement("section",{style:{margin:"20px 0",fontSize:40}},t.default.createElement(f.default,{start:20,end:1e4,duration:10,enableScrollSpy:!0})),t.default.createElement("section",{style:{margin:"20px 0",fontSize:40}},t.default.createElement(k.default,null)),t.default.createElement("section",{style:{width:600,margin:"30px 0"}},t.default.createElement(i.Input,{defaultValue:ye,placeholder:"api key",onChange:D,style:{marginBottom:20}}),t.default.createElement(i.Flex,{align:"center"},t.default.createElement(i.Input.TextArea,{ref:B,defaultValue:b,placeholder:"\u6765\uFF0C\u8BF4\u70B9\u4EC0\u4E48\u5457...Meta + Enter\u53D1\u9001",onChange:R,onKeyDown:L,autoSize:!0,style:{width:300,height:30,caretColor:"#ff0000"}}),t.default.createElement(i.Button,{style:{margin:"0 10px"},icon:t.default.createElement(p.SendOutlined,{rotate:-60}),type:"primary",disabled:ce,onClick:K},"\u53D1\u9001"),t.default.createElement(i.Button,{icon:t.default.createElement(p.SendOutlined,{rotate:-60}),type:"primary",disabled:!ce,onClick:Y},"\u505C\u6B62"))),t.default.createElement("section",null,ce&&t.default.createElement("div",null,"\u6B63\u5728\u8F93\u5165..."),t.default.createElement("section",{style:{textAlign:"right",color:"#666"}},Ie),t.default.createElement(m.default,{markdownText:ae,isLoading:ce})),t.default.createElement("section",{style:{position:"relative"}},t.default.createElement(W.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(d.ResponsiveMasonry,{columnsCountBreakPoints:{350:1,750:2,900:6}},t.default.createElement(d.default,{gutter:"10px"},t.default.createElement(g.default,{src:"https://picsum.photos/id/1/300/100",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/2/300/200",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/3/300/150",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/4/300/150",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/5/300/200",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/6/300/100",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/7/300/150",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/8/300/200",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/1/300/100",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/2/300/200",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/3/300/150",alt:"Strawberries"}),t.default.createElement(g.default,{src:"https://picsum.photos/id/4/300/150",alt:"Strawberries"})))),t.default.createElement("section",{style:{margin:20}},t.default.createElement(w.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(A.default,{autoFill:!0,direction:"left",gradient:!0,gradientColor:"rgba(255, 255, 255, 0.8)"},t.default.createElement("div",{style:{width:200,height:40,lineHeight:"40px",textAlign:"center",background:"#aaa",margin:"0 10px",borderRadius:4}},"React"))),t.default.createElement("section",{style:{margin:20}},t.default.createElement(A.default,{autoFill:!0,direction:"right",gradient:!0,gradientColor:"rgba(255, 255, 255, 0.8)"},t.default.createElement("div",{style:{width:200,height:40,lineHeight:"40px",textAlign:"center",background:"#aaa",margin:"0 10px",borderRadius:4}},"Vue"))),t.default.createElement("section",{style:{margin:"20px 0"}},t.default.createElement(V.default,{preCode:`
const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}
          `})))},Ue=n.default=_e},31819:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.trimTopic=n.toFixedBug=n.toFixed=n.toCamelCase=n.sleep=n.shuffleArr=n.saveHtmlToPng=n.reqStringify=n.readFromFile=n.randomString=n.randomNum=n.randomItem=n.randomHex=n.randomColor=n.random=n.promiseWithTimeout=n.prettyObject=n.pause=n.passwordStrength=n.oneApiChat=n.limitDecimal=n.isURLSearchParams=n.isObject=n.isNotEmpty=n.isEqual=n.isEmptyArray=n.isDecimal=n.isDate=n.isDarkMode=n.isArray=n.hidePhone=n.hasFocus=n.getType=n.getRandomId=n.getParamObject=n.getImgsUrl=n.getFileType=n.getEnv=n.getCurrentDate=n.fetchSomething=n.exportJsonData=n.exportFile=n.dayDif=n.customizeTimer=n.copyTextToClipboard=n.clearCookies=n.checkIsLocalPage=n.capitalize=n.camelizeCamelCase=n.asyncTo=n.asyncAction=n.ThousandNum=n.RoundNum=n.RandomId=void 0;var l=o(e(54756)),u=o(e(29293)),t=o(e(41132)),i=o(e(73738)),p=e(55373),E=o(e(20354)),f=n.getEnv=function(){var c;return typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]"&&(c="NODE"),typeof XMLHttpRequest!="undefined"&&(c="BROWSER"),c},s=n.isArray=function(c){return(0,i.default)(c)==="object"&&Object.prototype.toString.call(c)==="[object Array]"},_=n.isURLSearchParams=function(c){return typeof URLSearchParams!="undefined"&&c instanceof URLSearchParams},A=n.isDate=function(c){return(0,i.default)(c)==="object"&&Object.prototype.toString.call(c)==="[object Date]"},d=n.isObject=function(c){return c!==null&&(0,i.default)(c)==="object"},a=n.getParamObject=function(c){return _(c)?(0,p.parse)(c.toString(),{strictNullHandling:!0}):typeof c=="string"?[c]:c},r=n.reqStringify=function(c){return(0,p.stringify)(c,{arrayFormat:"repeat",strictNullHandling:!0})},m=n.getType=function(c){var B=Object.prototype.toString.call(c),D=/\[object (.*?)\]/.exec(B);return D?D[1]:null},y=n.hidePhone=function(c){return c==null?void 0:c.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")},O=n.asyncAction=function(c){var B=Promise.resolve(c);return function(D){B.then(function(){return setTimeout(function(){return D()})})}},g=n.getImgsUrl=function(c){var B=/<img.*?(?:>|\/>)/gi,D=/src=['"]?([^'"]*)['"]?/i,R=c.match(B);if(!R)return null;var L=R.reduce(function(K,Y){var X=Y.match(D);return X[1]?[].concat((0,t.default)(K),[X[1]]):K},[]);return L},C=n.customizeTimer={intervalTimer:null,timeoutTimer:null,setTimeout:function(c,B){var D=this,R=Date.now,L=R(),K=L,Y=function(){D.timeoutTimer=requestAnimationFrame(Y),K=R(),K-L>=B&&(c(),cancelAnimationFrame(D.timeoutTimer))};return this.timeoutTimer=requestAnimationFrame(Y),this.timeoutTimer},clearTimeout:function(){cancelAnimationFrame(this.timeoutTimer)},setInterval:function(c,B){var D=this,R=Date.now,L=R(),K=L,Y=function(){D.intervalTimer=requestAnimationFrame(Y),K=R(),K-L>=B&&(L=R(),K=L,c())};return this.intervalTimer=requestAnimationFrame(Y),this.intervalTimer},clearInterval:function(){cancelAnimationFrame(this.intervalTimer)}},h=n.isDecimal=function(c){var B=/(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/;return B.test(c)},x=n.limitDecimal=function(c){return c.replace(/^(-)*(\d+)\.(\d\d).*$/,"$1$2.$3")},j=n.passwordStrength=function(c){var B=/^(?=.*[A-Z])(?=.*[\d])(?=.*[a-z]).{8,}$/;return B.test(c)},I=n.checkIsLocalPage=function(){document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")return!1;if(document.visibilityState==="visible")return!0;window.addEventListener("pagehide",function(c){c.persisted},!1)})},M=n.randomHex=function(){return"#".concat(Math.floor(Math.random()*16777215).toString(16).padEnd(6,"0"))},S=n.clearCookies=document.cookie.split(";").forEach(function(b){return document.cookie=b.replace(/^ +/,"").replace(/[=].*/,"=;expires=".concat(new Date(0).toUTCString(),";path=/"))}),P=n.dayDif=function(c,B){return Math.ceil(Math.abs(c.getTime()-B.getTime())/864e5)},T=n.capitalize=function(c){return c.charAt(0).toUpperCase()+c.slice(1)},W=n.isNotEmpty=function(c){return Array.isArray(c)&&c.length>0},k=n.isDarkMode=window.matchMedia("(prefers-color-scheme: dark)").matches,z=n.fetchSomething=function(){return new Promise(function(c){setTimeout(function(){c("")},1e3)})},Z=n.toFixed=function(c,B){if(typeof c!="number")throw new Error("number\u4E0D\u662F\u6570\u5B57");var D=Math.round(Math.pow(10,B)*c)/Math.pow(10,B);if(D=String(D),D.indexOf(".")===-1)B!==0&&(D+=".",D+=new Array(B+1).join("0"));else{var R=D.split(".");R[1].length<B&&(R[1]+=new Array(B-R[1].length+1).join("0")),D=R.join(".")}return D},w=n.toFixedBug=function(c,B){return~~(Math.pow(10,B)*c)/Math.pow(10,B)},V=n.promiseWithTimeout=function(c,B){var D=new Promise(function(R){return setTimeout(function(){return R("Time Out!")},B)});return Promise.race([D,c])},G=n.shuffleArr=function(c){return c.sort(function(){return .5-Math.random()})},re=n.sleep=function(c){return new Promise(function(B){return setTimeout(function(){return B()},c)})},U=n.ThousandNum=function(c){return c.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},te=n.RandomId=function(c){return Math.random().toString(36).substring(3,c)},ue=n.RoundNum=function(c,B){return Math.round(c*Math.pow(10,B))/Math.pow(10,B)},_e=n.randomNum=function(c,B){return Math.floor(Math.random()*(B-c+1))+c},Ue=n.isEmptyArray=function(c){return Array.isArray(c)&&!c.length},F=n.randomItem=function(c){return c[Math.floor(Math.random()*c.length)]},ie=n.asyncTo=function(c){return c.then(function(B){return[null,B]}).catch(function(B){return[B]})},q=n.hasFocus=function(c){return c===document.activeElement},ae=n.isEqual=function(c,B){return JSON.stringify(c)===JSON.stringify(B)},ee=n.randomString=function(){return Math.random().toString(36).slice(2)},H=n.toCamelCase=function(c){return c.trim().replace(/[-_\s]+(.)?/g,function(B,D){return D?D.toUpperCase():""})},se=n.random=function(c,B){return Math.floor(Math.random()*(B-c+1)+c)},ge=n.randomColor=function(){return"#".concat(Math.random().toString(16).slice(2,8).padEnd(6,"0"))},ce=n.pause=function(c){return new Promise(function(B){return setTimeout(B,c)})},le=n.camelizeCamelCase=function(c){return c.replace(/(?:^\w|[A-Z]|\b\w)/g,function(B,D){return D===0?B.toLowerCase():B.toUpperCase()}).replace(/\s+/g,"")},je=n.copyTextToClipboard=function(){var b=(0,u.default)(l.default.mark(function c(B){var D;return l.default.wrap(function(L){for(;;)switch(L.prev=L.next){case 0:if(L.prev=0,!((D=navigator)!==null&&D!==void 0&&(D=D.clipboard)!==null&&D!==void 0&&D.writeText)){L.next=4;break}return L.next=4,navigator.clipboard.writeText(B);case 4:L.next=8;break;case 6:L.prev=6,L.t0=L.catch(0);case 8:case"end":return L.stop()}},c,null,[[0,6]])}));return function(B){return b.apply(this,arguments)}}(),pe=n.getRandomId=function(){for(var c="",B="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",D=0;D<32;D++)c+=B.charAt(Math.floor(Math.random()*B.length));return c},Ie=n.oneApiChat=function(c,B,D){return fetch("https://api.openai.com/v1/chat/completions",{method:"POST",signal:D,headers:{Authorization:B,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:c,stream:!0})})},Ce=n.getCurrentDate=function(){var c=new Date,B=c.getDate(),D=c.getMonth()+1,R=c.getFullYear();return"".concat(R,"-").concat(D,"-").concat(B)},ve=n.exportJsonData=function(c){var B=Ce(),D=JSON.stringify(JSON.parse(c),null,2),R=new Blob([D],{type:"application/json"}),L=URL.createObjectURL(R),K=document.createElement("a");K.href=L,K.download="chat-store_".concat(B,".json"),document.body.appendChild(K),K.click(),document.body.removeChild(K)},Te=n.saveHtmlToPng=function(){var b=(0,u.default)(l.default.mark(function c(B,D,R){var L,K,Y,X;return l.default.wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.prev=0,L=B!=null?B:document.getElementById("image-wrapper"),Q.next=4,(0,E.default)(L,{useCORS:!0});case 4:K=Q.sent,Y=K.toDataURL("image/png"),X=document.createElement("a"),X.style.display="none",X.href=Y,X.setAttribute("download","chat-shot.png"),typeof X.download=="undefined"&&X.setAttribute("target","_blank"),document.body.appendChild(X),X.click(),document.body.removeChild(X),window.URL.revokeObjectURL(Y),D&&D(),Promise.resolve(),Q.next=22;break;case 19:Q.prev=19,Q.t0=Q.catch(0),R&&R(Q.t0.message);case 22:case"end":return Q.stop()}},c,null,[[0,19]])}));return function(B,D,R){return b.apply(this,arguments)}}(),Be=n.trimTopic=function(c){return c.replace(/[，。！？”“"、,.!?]*$/,"")},ye=n.readFromFile=function(){return new Promise(function(c,B){var D=document.createElement("input");D.type="file",D.accept="application/json",D.onchange=function(R){var L=R.target.files[0],K=new FileReader;K.onload=function(Y){c(Y.target.result)},K.onerror=function(Y){return B(new Error(Y))},K.readAsText(L)},D.click()})},Re=n.prettyObject=function(c){var B="";return typeof c!="string"&&(B=JSON.stringify(c,null,"  ")),B==="{}"?B.toString():B.startsWith("```json")?B:["```json",B,"```"].join(`
`)},he=n.getFileType=function(c,B){var D=B.split(".").pop().toLowerCase();switch(D){case"txt":return"text/plain";case"json":return"application/json";case"doc":return"application/msword";case"docx":return"application/vnd.openxmlformats-officedocument.wordprocessingml.document";case"xls":return"application/vnd.ms-excel";case"xlsx":return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";case"ppt":return"application/vnd.ms-powerpoint";case"pptx":return"application/vnd.openxmlformats-officedocument.presentationml.presentation";case"pdf":return"application/pdf";case"jpg":case"jpeg":return"image/jpeg";case"png":return"image/png";case"gif":return"image/gif";case"zip":return"application/zip";case"rar":return"application/x-rar-compressed";default:if(typeof c=="string")try{return JSON.parse(c),"application/json"}catch(R){return"text/plain"}else return c instanceof Uint8Array||c instanceof ArrayBuffer,"application/octet-stream"}},be=n.exportFile=function(c,B){var D;if((c==null||(D=c.headers["content-type"])===null||D===void 0?void 0:D.indexOf("application/json"))===-1){var R=c.headers&&c.headers["content-disposition"]||"attachment;filename=".concat(B||"file",".xlsx"),L=decodeURI(R==null?void 0:R.split("=")[1].replace(/'/g,"")).replace(/"/g,"").replace("utf-8''","")||"",K=he(c.data,B||L),Y=new Blob([c.data],{type:K}),X=URL.createObjectURL(Y),oe=document.createElement("a");document.body.appendChild(oe),oe.style="display: none",oe.href=X,oe.download=L,oe.click(),document.body.removeChild(oe)}}},21378:function(v,n,e){"use strict";var o=e(24994);Object.defineProperty(n,"__esModule",{value:!0}),n.fireConfetti=void 0;var l=o(e(43693)),u=o(e(14685));function t(_,A){var d=Object.keys(_);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(_);A&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(_,r).enumerable})),d.push.apply(d,a)}return d}function i(_){for(var A=1;A<arguments.length;A++){var d=arguments[A]!=null?arguments[A]:{};A%2?t(Object(d),!0).forEach(function(a){(0,l.default)(_,a,d[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(_,Object.getOwnPropertyDescriptors(d)):t(Object(d)).forEach(function(a){Object.defineProperty(_,a,Object.getOwnPropertyDescriptor(d,a))})}return _}var p=200,E={origin:{y:.7},zIndex:1500};function f(_,A){(0,u.default)(i(i(i({},E),A),{},{particleCount:Math.floor(p*_)}))}var s=n.fireConfetti=function(){f(.25,{spread:26,startVelocity:55}),f(.2,{spread:60}),f(.35,{spread:100,decay:.91,scalar:.8}),f(.1,{spread:120,startVelocity:25,decay:.92,scalar:1.2}),f(.1,{spread:120,startVelocity:45})}},25039:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(47122),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},48122:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(61543),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},57903:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(9666),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},21958:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(97669),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},39726:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(27825),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},49511:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(90958),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},84576:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(80711),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},85120:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(45789),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},61352:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(91869),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},89696:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(22211),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},89200:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(38791),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},49887:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(6988),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},71352:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(96657),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},91193:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(41742),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},81709:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(62264),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},95280:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(97331),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},1052:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(38413),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},47443:function(v,n,e){"use strict";e.r(n);var o=e(85072),l=e.n(o),u=e(97825),t=e.n(u),i=e(77659),p=e.n(i),E=e(55056),f=e.n(E),s=e(10540),_=e.n(s),A=e(41113),d=e.n(A),a=e(37318),r={};r.styleTagTransform=d(),r.setAttributes=f(),r.insert=p().bind(null,"head"),r.domAPI=t(),r.insertStyleElement=_();var m=l()(a.A,r);n.default=a.A&&a.A.locals?a.A.locals:void 0},82547:function(v){"use strict";v.exports="data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 4%27%3E%3Cstyle type=%27text/css%27%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX%280%29;}to {transform:translateX%28-15px%29;}}%3C/style%3E%3Cpath fill=%27none%27 stroke=%27%230087ca%27 stroke-width=%272%27 class=%27squiggle%27 d=%27M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3%27/%3E%3C/svg%3E"},42634:function(){}}]);

//# sourceMappingURL=267.f5b2658a9520e763f779.js.map