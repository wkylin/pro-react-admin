(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[267],{65548:function(B,t,e){"use strict";var s=e(24994),A=e(73738);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=s(e(43693)),o=v(e(96540)),i=e(74848);function p(d){if(typeof WeakMap!="function")return null;var l=new WeakMap,n=new WeakMap;return(p=function(T){return T?n:l})(d)}function v(d,l){if(!l&&d&&d.__esModule)return d;if(d===null||A(d)!="object"&&typeof d!="function")return{default:d};var n=p(l);if(n&&n.has(d))return n.get(d);var E={__proto__:null},T=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var I in d)if(I!=="default"&&{}.hasOwnProperty.call(d,I)){var L=T?Object.getOwnPropertyDescriptor(d,I):null;L&&(L.get||L.set)?Object.defineProperty(E,I,L):E[I]=d[I]}return E.default=d,n&&n.set(d,E),E}function C(d,l){var n=Object.keys(d);if(Object.getOwnPropertySymbols){var E=Object.getOwnPropertySymbols(d);l&&(E=E.filter(function(T){return Object.getOwnPropertyDescriptor(d,T).enumerable})),n.push.apply(n,E)}return n}function a(d){for(var l=1;l<arguments.length;l++){var n=arguments[l]!=null?arguments[l]:{};l%2?C(Object(n),!0).forEach(function(E){(0,u.default)(d,E,n[E])}):Object.getOwnPropertyDescriptors?Object.defineProperties(d,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(E){Object.defineProperty(d,E,Object.getOwnPropertyDescriptor(n,E))})}return d}var c=function(l){return(0,i.jsxs)("svg",a(a({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"#fff",viewBox:"0 0 120 30"},l),{},{children:[(0,i.jsxs)("circle",{cx:15,cy:15,r:15,children:[(0,i.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,i.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]}),(0,i.jsxs)("circle",{cx:60,cy:15,r:9,fillOpacity:.3,children:[(0,i.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:9,repeatCount:"indefinite",to:9,values:"9;15;9"}),(0,i.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:.5,repeatCount:"indefinite",to:.5,values:".5;1;.5"})]}),(0,i.jsxs)("circle",{cx:105,cy:15,r:15,children:[(0,i.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,i.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]})]}))},_=t.default=c},47122:function(B,t,e){"use strict";var s=e(71354),A=e.n(s),u=e(76314),o=e.n(u),i=o()(A());i.push([B.id,`.alternating--mj1_d {
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
`],sourceRoot:""}]),i.locals={alternating:"alternating--mj1_d","alternating-text":"alternating-text--p6lWH",alternatingText:"alternating-text--p6lWH"},t.A=i},97669:function(B,t,e){"use strict";var s=e(71354),A=e.n(s),u=e(76314),o=e.n(u),i=e(4417),p=e.n(i),v=new URL(e(82547),e.b),C=o()(A()),a=p()(v);C.push([B.id,`a.squiggle--JQRWj {
  background-image: linear-gradient(to bottom, #0087ca 0%, #0087ca 100%);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 1px 1px;
  color: inherit;
  text-decoration: none;
}

a.squiggle--JQRWj:hover {
  background-image: url(`+a+`);
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
`],sourceRoot:""}]),C.locals={squiggle:"squiggle--JQRWj"},t.A=C},27825:function(B,t,e){"use strict";var s=e(71354),A=e.n(s),u=e(76314),o=e.n(u),i=o()(A());i.push([B.id,`.avatarCard--kIii3 {
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
`],sourceRoot:""}]),i.locals={avatarCard:"avatarCard--kIii3",card:"card--W_bZq",content:"content--yiHmV"},t.A=i},80711:function(B,t,e){"use strict";var s=e(71354),A=e.n(s),u=e(76314),o=e.n(u),i=o()(A());i.push([B.id,`.gradientTracking--FyamC {
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
`],sourceRoot:""}]),i.locals={gradientTracking:"gradientTracking--FyamC"},t.A=i},45789:function(B,t,e){"use strict";var s=e(71354),A=e.n(s),u=e(76314),o=e.n(u),i=o()(A());i.push([B.id,`.isometricCard--mEKMm {
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
`],sourceRoot:""}]),i.locals={isometricCard:"isometricCard--mEKMm"},t.A=i},91869:function(B,t,e){"use strict";var s=e(71354),A=e.n(s),u=e(76314),o=e.n(u),i=o()(A());i.push([B.id,`.hoverRotate--ew29g {
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
`],sourceRoot:""}]),i.locals={hoverRotate:"hoverRotate--ew29g"},t.A=i},22211:function(B,t,e){"use strict";var s=e(71354),A=e.n(s),u=e(76314),o=e.n(u),i=o()(A());i.push([B.id,`.lineBordered--bh05r {
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
`],sourceRoot:""}]),i.locals={lineBordered:"lineBordered--bh05r","hover-underline-animation":"hover-underline-animation--TSfGP",hoverUnderlineAnimation:"hover-underline-animation--TSfGP",left:"left--ErwKf",center:"center--BFLFI",right:"right--DRVwU","dynamic-shadow":"dynamic-shadow--Us2nj",dynamicShadow:"dynamic-shadow--Us2nj","image-contain":"image-contain--Z_yfM",imageContain:"image-contain--Z_yfM","image-cover":"image-cover--ZVSiS",imageCover:"image-cover--ZVSiS",container:"container--lADY1",top:"top--XQMfF",bottom:"bottom--P1bZI","no-scrollbars":"no-scrollbars--AUOMQ",noScrollbars:"no-scrollbars--AUOMQ","engraved-text":"engraved-text--dMPwS",engravedText:"engraved-text--dMPwS","embossed-text":"embossed-text--eQZ0_",embossedText:"embossed-text--eQZ0_"},t.A=i},34671:function(B,t,e){"use strict";var s=e(71354),A=e.n(s),u=e(76314),o=e.n(u),i=o()(A());i.push([B.id,`.linearWrap--EI336 {
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
`],sourceRoot:""}]),i.locals={linearWrap:"linearWrap--EI336",line:"line--LijIE",animate1:"animate1--rw6dI",animate2:"animate2--uMKrU",animate3:"animate3--dW9XO",animate4:"animate4--KPFuY"},t.A=i},6988:function(B,t,e){"use strict";var s=e(71354),A=e.n(s),u=e(76314),o=e.n(u),i=o()(A());i.push([B.id,`.markdownBody--xUrgB {\r
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
`],sourceRoot:""}]),i.locals={markdownBody:"markdownBody--xUrgB",loadingIcon:"loadingIcon--VpAmv",copySection:"copySection--aJHtb",lang:"lang--SO0lS",copySpan:"copySpan--u4qzC",preCode:"preCode--s6faO"},t.A=i},41742:function(B,t,e){"use strict";var s=e(71354),A=e.n(s),u=e(76314),o=e.n(u),i=o()(A());i.push([B.id,`/* Perspective card */
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
    width: 100%;
    text-align: center;
    margin-top: 30%;
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
`,"",{version:3,sources:["webpack://./src/components/stateless/ShiftingCard/index.module.less"],names:[],mappings:"AAAA,qBAAqB;AACrB;EACE,6CAA6C;EAC7C,gCAAgC;AAClC;;AAEA;EACE,4CAA4C;AAC9C;;AAEA,qBAAqB;AACrB;EACE,kBAAkB;EAClB,qBAAqB;EACrB,sBAAsB;EACtB,aAAa;EACb,YAAY;EACZ,YAAY;EACZ,mBAAmB;EACnB,mDAAmD;EACnD,sBAAsB;EACtB,4DAAkF;EAAlF,kFAAkF;EAClF,mCAAmC;EACnC,8DAA8D;;EAE9D;IACE,WAAW;IACX,kBAAkB;IAClB,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;IACZ,8BAA8B;IAC9B,UAAU;IACV,6BAA6B;EAC/B;;EAEA;IACE,WAAW;IACX,kBAAkB;IAClB,eAAe;EACjB;AACF;;AAEA;EACE;IACE,UAAU;EACZ;;EAEA;IACE,UAAU;EACZ;;EAEA;IACE,oEAAoE;EACtE;AACF",sourcesContent:[`/* Perspective card */
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
    width: 100%;
    text-align: center;
    margin-top: 30%;
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
`],sourceRoot:""}]),i.locals={"perspective-card":"perspective-card--fRasE",perspectiveCard:"perspective-card--fRasE",shiftingCard:"shiftingCard--ejZ4B",cardAnimation:"cardAnimation--uMV0q"},t.A=i},20335:function(B,t,e){"use strict";var s=e(71354),A=e.n(s),u=e(76314),o=e.n(u),i=o()(A());i.push([B.id,`.star--H6zRP {
  color: #ff9933;
  cursor: pointer;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/StarRating/index.module.less"],names:[],mappings:"AAAA;EACE,cAAc;EACd,eAAe;AACjB",sourcesContent:[`.star {
  color: #ff9933;
  cursor: pointer;
}
`],sourceRoot:""}]),i.locals={star:"star--H6zRP"},t.A=i},37318:function(B,t,e){"use strict";var s=e(71354),A=e.n(s),u=e(76314),o=e.n(u),i=o()(A());i.push([B.id,`.avatar--tAk6h {
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
`,"",{version:3,sources:["webpack://./src/pages/home/index.module.less"],names:[],mappings:"AAAA;EACE,uDAAgD;AAClD;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,wBAAwB;EAC1B;AACF",sourcesContent:[`.avatar {
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
`],sourceRoot:""}]),i.locals={avatar:"avatar--tAk6h",levitate:"levitate--RZCwS"},t.A=i},81286:function(B,t,e){"use strict";var s=e(24994),A=e(73738);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=p(e(96540)),o=s(e(25039));function i(a){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(i=function(l){return l?_:c})(a)}function p(a,c){if(!c&&a&&a.__esModule)return a;if(a===null||A(a)!="object"&&typeof a!="function")return{default:a};var _=i(c);if(_&&_.has(a))return _.get(a);var d={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in a)if(n!=="default"&&{}.hasOwnProperty.call(a,n)){var E=l?Object.getOwnPropertyDescriptor(a,n):null;E&&(E.get||E.set)?Object.defineProperty(d,n,E):d[n]=a[n]}return d.default=a,_&&_.set(a,d),d}var v=function(c){var _=c.alternateText,d=_===void 0?[]:_;return(0,u.useEffect)(function(){var l=document.getElementById("alternating-text"),n=0,E=function(I){n=n<d.length-1?n+1:0,l.innerHTML=d[n]};return l.innerHTML=d[0],l.addEventListener("animationiteration",E,!1),function(){l.removeEventListener("animationiteration",E,!1)}},[]),u.default.createElement("span",{className:o.default.alternating,id:"alternating-text"},d[0]||"Text goes here")},C=t.default=v},59409:function(B,t,e){"use strict";var s=e(24994);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var A=s(e(96540)),u=s(e(21958)),o=function(v){var C=v.text,a=/((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;return A.default.createElement(A.default.Fragment,null,C.split(a).map(function(c,_){var d=c.match(a);if(d){var l=d[0];return A.default.createElement("a",{key:_,className:u.default.squiggle,target:"_blank",href:l.startsWith("http")?l:"http://".concat(l)},l)}return c}))},i=t.default=o},76017:function(B,t,e){"use strict";var s=e(24994);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var A=s(e(96540)),u=s(e(39726)),o=function(v){var C=v.avatar,a=v.text;return A.default.createElement("div",{className:u.default.avatarCard},A.default.createElement("div",{className:u.default.card},A.default.createElement("figure",null,A.default.createElement("img",{alt:"",src:C,className:u.default.avatar})),A.default.createElement("p",{className:u.default.content},a)))},i=t.default=o},42916:function(B,t,e){"use strict";var s=e(24994);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var A=s(e(43693)),u=s(e(96540));function o(C,a){var c=Object.keys(C);if(Object.getOwnPropertySymbols){var _=Object.getOwnPropertySymbols(C);a&&(_=_.filter(function(d){return Object.getOwnPropertyDescriptor(C,d).enumerable})),c.push.apply(c,_)}return c}function i(C){for(var a=1;a<arguments.length;a++){var c=arguments[a]!=null?arguments[a]:{};a%2?o(Object(c),!0).forEach(function(_){(0,A.default)(C,_,c[_])}):Object.getOwnPropertyDescriptors?Object.defineProperties(C,Object.getOwnPropertyDescriptors(c)):o(Object(c)).forEach(function(_){Object.defineProperty(C,_,Object.getOwnPropertyDescriptor(c,_))})}return C}var p=function(a){var c=a.style,_=a.children;return u.default.createElement("div",{style:i({width:"100%",minHeight:"calc(100vh - 232px)"},c)},_)},v=t.default=p},18903:function(B,t,e){"use strict";var s=e(24994),A=e(73738);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=p(e(96540)),o=s(e(84576));function i(a){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(i=function(l){return l?_:c})(a)}function p(a,c){if(!c&&a&&a.__esModule)return a;if(a===null||A(a)!="object"&&typeof a!="function")return{default:a};var _=i(c);if(_&&_.has(a))return _.get(a);var d={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in a)if(n!=="default"&&{}.hasOwnProperty.call(a,n)){var E=l?Object.getOwnPropertyDescriptor(a,n):null;E&&(E.get||E.set)?Object.defineProperty(d,n,E):d[n]=a[n]}return d.default=a,_&&_.set(a,d),d}var v=function(){var c=(0,u.useRef)(null);return(0,u.useLayoutEffect)(function(){var _=c.current,d=function(n){var E=n.target.getBoundingClientRect(),T=n.clientX-E.left,I=n.clientY-E.top;_.style.setProperty("--x",T+"px"),_.style.setProperty("--y",I+"px")};return _.addEventListener("mousemove",d),function(){_.removeEventListener("mousemove",d)}},[]),u.default.createElement("button",{className:o.default.gradientTracking,ref:c},u.default.createElement("span",null,"Hover me"))},C=t.default=v},52537:function(B,t,e){"use strict";var s=e(24994);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var A=s(e(96540)),u=s(e(85120)),o=function(v){var C=v.text;return A.default.createElement("div",{className:u.default.isometricCard},A.default.createElement("p",null,C))},i=t.default=o},35317:function(B,t,e){"use strict";var s=e(24994);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var A=s(e(94634)),u=s(e(85715)),o=s(e(91847)),i=s(e(96540)),p=s(e(61352)),v=["alt","src","className","loadInitially","observerOptions"],C=function(_){var d=_.alt,l=_.src,n=_.className,E=_.loadInitially,T=E===void 0?!1:E,I=_.observerOptions,L=I===void 0?{root:null,rootMargin:"200px 0px"}:I,K=(0,o.default)(_,v),z=i.default.useRef(null),S=i.default.useRef(null),Y=i.default.useState(T),Q=(0,u.default)(Y,2),V=Q[0],G=Q[1],y=i.default.useCallback(function(W){W[0].isIntersecting&&(z.current.disconnect(),G(!0))},[z]);return i.default.useEffect(function(){if(!T){if("loading"in HTMLImageElement.prototype){G(!0);return}return z.current=new IntersectionObserver(y,L),z.current.observe(S.current),function(){z.current.disconnect()}}},[]),i.default.createElement("figure",{className:p.default.hoverRotate},i.default.createElement("img",(0,A.default)({alt:d,src:V?l:"",ref:S,className:n,loading:T?void 0:"lazy"},K)),i.default.createElement("figcaption",null,i.default.createElement("h3",null,"Lorem ",i.default.createElement("br",null),"Ipsum")))},a=t.default=C},22807:function(B,t,e){"use strict";var s=e(24994);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var A=s(e(96540)),u=s(e(89696)),o=function(v){var C=v.text;return A.default.createElement("span",{className:u.default.lineBordered},C)},i=t.default=o},84871:function(B,t,e){"use strict";var s=e(24994);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var A=s(e(96540)),u=s(e(30152)),o=function(v){var C=v.children;return A.default.createElement("section",{className:u.default.linearWrap},A.default.createElement("span",{className:u.default.line}),A.default.createElement("span",{className:u.default.line}),A.default.createElement("span",{className:u.default.line}),A.default.createElement("span",{className:u.default.line}),A.default.createElement("section",null,C))},i=t.default=o},81740:function(B,t,e){"use strict";var s=e(24994),A=e(73738);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=s(e(54756)),o=s(e(94634)),i=s(e(85715)),p=s(e(29293)),v=S(e(96540)),C=e(62135),a=s(e(43160)),c=s(e(41512)),_=s(e(54152)),d=s(e(63940)),l=s(e(37948)),n=s(e(629)),E=s(e(51687)),T=s(e(22802)),I=e(81591),L=s(e(65548));e(35819);var K=s(e(49887));function z(y){if(typeof WeakMap!="function")return null;var W=new WeakMap,O=new WeakMap;return(z=function(M){return M?O:W})(y)}function S(y,W){if(!W&&y&&y.__esModule)return y;if(y===null||A(y)!="object"&&typeof y!="function")return{default:y};var O=z(W);if(O&&O.has(y))return O.get(y);var D={__proto__:null},M=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var R in y)if(R!=="default"&&{}.hasOwnProperty.call(y,R)){var j=M?Object.getOwnPropertyDescriptor(y,R):null;j&&(j.get||j.set)?Object.defineProperty(D,R,j):D[R]=y[R]}return D.default=y,O&&O.set(y,D),D}var Y=function(){var y=(0,p.default)(u.default.mark(function W(O){var D,M;return u.default.wrap(function(j){for(;;)switch(j.prev=j.next){case 0:if(j.prev=0,!((D=navigator)!==null&&D!==void 0&&(D=D.clipboard)!==null&&D!==void 0&&D.writeText)){j.next=5;break}return j.next=4,navigator.clipboard.writeText(O);case 4:C.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F");case 5:j.next=16;break;case 7:j.prev=7,j.t0=j.catch(0),M=document.createElement("textarea"),M.value=O,document.body.appendChild(M),M.focus(),M.select();try{document.execCommand("copy"),C.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F")}catch(N){C.message.success("\u590D\u5236\u5230\u526A\u8D34\u677F\u5931\u8D25")}document.body.removeChild(M);case 16:case"end":return j.stop()}},W,null,[[0,7]])}));return function(O){return y.apply(this,arguments)}}(),Q=function(W){var O,D=(0,v.useRef)(null),M=(O=D.current)===null||O===void 0?void 0:O.innerText,R=(0,v.useRef)(""),j=(0,I.useDebouncedCallback)(function(){if(D.current){var N=D.current.querySelector("code"),X=N.className,k=/language-(\w+)/.exec(X||"");if(k){var J=(0,i.default)(k,2),$=J[1];R.current=$}}},800);return(0,v.useEffect)(function(){setTimeout(j,1)},[M]),v.default.createElement("section",null,v.default.createElement("section",{className:K.default.copySection},v.default.createElement("span",{className:K.default.lang},R.current),v.default.createElement("span",{className:K.default.copySpan,onClick:function(){if(D.current){var X=D.current.innerText;Y(X)}}},"\u590D\u5236\u4EE3\u7801")),v.default.createElement("pre",{className:K.default.preCode,ref:D},W.children))},V=function(W){var O=W.markdownText,D=O===void 0?"":O,M=W.isLoading,R=M===void 0?!1:M;return v.default.createElement("section",{className:K.default.markdownBody},R&&!D&&v.default.createElement(a.default,{component:L.default,style:{color:"#fff"},className:K.default.loadingIcon}),D&&v.default.createElement(c.default,{remarkPlugins:[_.default,n.default,d.default],rehypePlugins:[l.default,T.default,[E.default,{detect:!1,ignoreMissing:!0}]],components:{pre:Q,p:function(N){return v.default.createElement("p",(0,o.default)({},N,{dir:"auto"}))},a:function(N){var X,k=N.href||"",J=/^\/#/i.test(k),$=J?"_self":(X=N.target)!==null&&X!==void 0?X:"_blank";return v.default.createElement("a",(0,o.default)({},N,{target:$}))}}},D))},G=t.default=V},3102:function(B,t,e){"use strict";var s=e(24994),A=e(73738);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=p(e(96540)),o=s(e(91193));function i(a){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(i=function(l){return l?_:c})(a)}function p(a,c){if(!c&&a&&a.__esModule)return a;if(a===null||A(a)!="object"&&typeof a!="function")return{default:a};var _=i(c);if(_&&_.has(a))return _.get(a);var d={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in a)if(n!=="default"&&{}.hasOwnProperty.call(a,n)){var E=l?Object.getOwnPropertyDescriptor(a,n):null;E&&(E.get||E.set)?Object.defineProperty(d,n,E):d[n]=a[n]}return d.default=a,_&&_.set(a,d),d}var v=function(){var c=(0,u.useRef)(null);return(0,u.useLayoutEffect)(function(){var _=c.current,d=_.getBoundingClientRect(),l=d.x,n=d.y,E=d.width,T=E===void 0?240:E,I=d.height,L=I===void 0?360:I,K=l+(T||240)/2,z=n+(L||360)/2,S=function(V){var G=V.pageX,y=V.pageY,W=(K-G)/((T||240)/2),O=(z-y)/((L||360)/2);_.style.setProperty("--dx",W),_.style.setProperty("--dy",O)},Y=function(){_.style.setProperty("--dx",0),_.style.setProperty("--dy",0)};return _.addEventListener("mousemove",S),_.addEventListener("mouseleave",Y),function(){_.removeEventListener("mousemove",S),_.removeEventListener("mouseleave",Y)}},[]),u.default.createElement("div",{ref:c,className:o.default.shiftingCard},u.default.createElement("h3",null,"Shifting Card"))},C=t.default=v},58843:function(B,t,e){"use strict";var s=e(24994);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var A=s(e(85715)),u=s(e(96540)),o=s(e(57812)),i=function(a){var c=a.marked,_=a.starId;return u.default.createElement("span",{"data-star-id":_,className:o.default.star,role:"button"},c?"\u2605":"\u2606")},p=function(a){var c=a.value,_=u.default.useState(parseInt(c)||0),d=(0,A.default)(_,2),l=d[0],n=d[1],E=u.default.useState(0),T=(0,A.default)(E,2),I=T[0],L=T[1],K=function(S){var Y=0;S&&S.target&&S.target.getAttribute("data-star-id")&&(Y=S.target.getAttribute("data-star-id")),L(Y)};return u.default.createElement("div",{onMouseOut:function(){return K(null)},onClick:function(S){return n(S.target.getAttribute("data-star-id")||l)},onMouseOver:K},Array.from({length:5},function(z,S){return u.default.createElement(i,{starId:S+1,key:"star_".concat(S+1),marked:I?I>=S+1:l>=S+1})}),u.default.createElement("span",null,l))},v=t.default=p},59593:function(B,t,e){"use strict";var s=e(24994),A=e(73738);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=s(e(85715)),o=p(e(96540));function i(a){if(typeof WeakMap!="function")return null;var c=new WeakMap,_=new WeakMap;return(i=function(l){return l?_:c})(a)}function p(a,c){if(!c&&a&&a.__esModule)return a;if(a===null||A(a)!="object"&&typeof a!="function")return{default:a};var _=i(c);if(_&&_.has(a))return _.get(a);var d={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in a)if(n!=="default"&&{}.hasOwnProperty.call(a,n)){var E=l?Object.getOwnPropertyDescriptor(a,n):null;E&&(E.get||E.set)?Object.defineProperty(d,n,E):d[n]=a[n]}return d.default=a,_&&_.set(a,d),d}var v=function(c){var _=c.children,d=c.delay,l=d===void 0?110:d,n=(0,o.useState)(0),E=(0,u.default)(n,2),T=E[0],I=E[1],L=setInterval(function(){return I(function(K){return K+1})},l);return(0,o.useEffect)(function(){T===_.length&&clearInterval(L)},[_,L,T]),(0,o.useEffect)(function(){return function(){return clearInterval(L)}},[L]),o.default.createElement(o.default.Fragment,null,_.substring(0,T))},C=t.default=(0,o.memo)(v)},76526:function(B,t,e){"use strict";var s=e(24994),A=e(73738);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=s(e(85715)),o=Q(e(96540)),i=e(62135),p=e(43160),v=s(e(42916)),C=s(e(59593)),a=s(e(81740)),c=s(e(84871)),_=s(e(81286)),d=s(e(59409)),l=s(e(35317)),n=s(e(58843)),E=s(e(52537)),T=s(e(76017)),I=s(e(22807)),L=s(e(18903)),K=s(e(3102)),z=e(31819),S=s(e(47443));function Y(y){if(typeof WeakMap!="function")return null;var W=new WeakMap,O=new WeakMap;return(Y=function(M){return M?O:W})(y)}function Q(y,W){if(!W&&y&&y.__esModule)return y;if(y===null||A(y)!="object"&&typeof y!="function")return{default:y};var O=Y(W);if(O&&O.has(y))return O.get(y);var D={__proto__:null},M=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var R in y)if(R!=="default"&&{}.hasOwnProperty.call(y,R)){var j=M?Object.getOwnPropertyDescriptor(y,R):null;j&&(j.get||j.set)?Object.defineProperty(D,R,j):D[R]=y[R]}return D.default=y,O&&O.set(y,D),D}var V=function(){var W=(0,o.useState)(""),O=(0,u.default)(W,2),D=O[0],M=O[1],R=(0,o.useRef)(null),j=(0,o.useState)(!1),N=(0,u.default)(j,2),X=N[0],k=N[1],J=(0,o.useState)(""),$=(0,u.default)(J,2),ce=$[0],me=$[1],re=(0,o.useRef)(null),fe=(0,o.useState)(function(){return""}),ae=(0,u.default)(fe,2),oe=ae[0],Ee=ae[1],ve=(0,o.useState)(""),ie=(0,u.default)(ve,2),te=ie[0],Ce=ie[1],ge=(0,o.useRef)(null),pe=function(w){Ee(w.target.value)},Be=function(w){Ce(w.target.value)},ye=function(w){w.metaKey&&w.key==="Enter"&&(se(),w.preventDefault())},se=function(){if(te.trim()!==""){var w=new AbortController;re.current=w,he(te,oe,w)}},le=function(){re.current.abort(),k(!1)},he=function(w,De,Oe){R.current="",M(R.current);var de=Oe.signal;k(!0),(0,z.oneApiChat)([{content:w,role:"user"}],De,de).then(function(Z){var f=Z.headers.get("content-type");if(!Z.ok||!(f!=null&&f.startsWith("text/event-stream"))||Z.status!==200){if(f!=null&&f.startsWith("text/html")){var r=Z.clone().text();r.then(function(F){M(F)})}else if(f!=null&&f.startsWith("text/plain")){var m=Z.clone().text();m.then(function(F){M(F)})}else if(f!=null&&f.startsWith("application/json")){var g=Z.clone().json();g.then(function(F){M((0,z.prettyObject)(F))})}else M(Z.statusText);k(!1)}else{var h,P=Z==null||(h=Z.body)===null||h===void 0?void 0:h.getReader(),b=`

`,x="",U="",H=function(){P.read().then(function(_e){var Me=_e.done,be=_e.value;if(Me){k(!1);return}for(x+=new TextDecoder().decode(be);x.includes(b);){var Pe=x.indexOf(b),Te=x.slice(0,Pe),ne=Te.split("data: ");for(var ue in ne)if(ne[ue]!==""&&ne[ue]!=="[DONE]")try{var Ae,ee,je=JSON.parse(ne[ue]),Ie=(Ae=(ee=je.choices[0])===null||ee===void 0||(ee=ee.delta)===null||ee===void 0?void 0:ee.content)!==null&&Ae!==void 0?Ae:"";U+=Ie,me(new Date().toLocaleString()),R.current=U,M(R.current)}catch(Re){}x=x.slice(Pe+b.length)}H()}).catch(function(_e){})};H()}}).catch(function(Z){k(!1),M(Z.message)})};return o.default.createElement(v.default,null,o.default.createElement("h2",{style:{marginBottom:15}},o.default.createElement(C.default,null,"Cool! Hi, React & Ant Design!")),o.default.createElement("h2",{className:S.default.avatar},"React version: ",o.version),o.default.createElement("section",null,"I love coding in ",o.default.createElement(_.default,{alternateText:["javascript","typescript","rect","vue"]}),"."),o.default.createElement("section",null,o.default.createElement(d.default,{text:"foo bar baz http://example.org bar https://github.com/wkylin/pro-react-admin"})),o.default.createElement("section",null,o.default.createElement(l.default,{src:"https://picsum.photos/seed/picsum/300/160",alt:"Strawberries"})),o.default.createElement("section",null,o.default.createElement(T.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."})),o.default.createElement("section",null,o.default.createElement(E.default,{text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?"})),o.default.createElement(n.default,{value:2}),o.default.createElement(I.default,{text:"A line bordered text."}),o.default.createElement("section",null,o.default.createElement(L.default,null)),o.default.createElement("section",null,o.default.createElement(K.default,null)),o.default.createElement("section",{style:{width:600,margin:"30px 0"}},o.default.createElement(i.Input,{defaultValue:oe,placeholder:"api key",onChange:pe,style:{marginBottom:20}}),o.default.createElement(i.Flex,{align:"center"},o.default.createElement(c.default,null,o.default.createElement(i.Input.TextArea,{ref:ge,defaultValue:te,placeholder:"\u6765\uFF0C\u8BF4\u70B9\u4EC0\u4E48\u5457...Meta + Enter\u53D1\u9001",onChange:Be,onKeyDown:ye,autoSize:!0,style:{width:300,height:30}})),o.default.createElement(i.Button,{style:{margin:"0 10px"},icon:o.default.createElement(p.SendOutlined,{rotate:-60}),type:"primary",disabled:X,onClick:se},"\u53D1\u9001"),o.default.createElement(i.Button,{icon:o.default.createElement(p.SendOutlined,{rotate:-60}),type:"primary",disabled:!X,onClick:le},"\u505C\u6B62"))),o.default.createElement("section",null,X&&o.default.createElement("div",null,"\u6B63\u5728\u8F93\u5165..."),o.default.createElement("section",{style:{textAlign:"right",color:"#666"}},ce),o.default.createElement(a.default,{markdownText:D,isLoading:X})))},G=t.default=V},31819:function(B,t,e){"use strict";var s=e(24994);Object.defineProperty(t,"__esModule",{value:!0}),t.trimTopic=t.toFixedBug=t.toFixed=t.toCamelCase=t.sleep=t.shuffleArr=t.saveHtmlToPng=t.reqStringify=t.readFromFile=t.randomString=t.randomNum=t.randomItem=t.randomHex=t.randomColor=t.random=t.promiseWithTimeout=t.prettyObject=t.pause=t.passwordStrength=t.oneApiChat=t.limitDecimal=t.isURLSearchParams=t.isObject=t.isNotEmpty=t.isEqual=t.isEmptyArray=t.isDecimal=t.isDate=t.isDarkMode=t.isArray=t.hidePhone=t.hasFocus=t.getType=t.getRandomId=t.getParamObject=t.getImgsUrl=t.getFileType=t.getEnv=t.getCurrentDate=t.fetchSomething=t.exportJsonData=t.exportFile=t.dayDif=t.customizeTimer=t.copyTextToClipboard=t.clearCookies=t.checkIsLocalPage=t.capitalize=t.camelizeCamelCase=t.asyncTo=t.asyncAction=t.ThousandNum=t.RoundNum=t.RandomId=void 0;var A=s(e(54756)),u=s(e(29293)),o=s(e(41132)),i=s(e(73738)),p=e(55373),v=s(e(20354)),C=t.getEnv=function(){var r;return typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]"&&(r="NODE"),typeof XMLHttpRequest!="undefined"&&(r="BROWSER"),r},a=t.isArray=function(r){return(0,i.default)(r)==="object"&&Object.prototype.toString.call(r)==="[object Array]"},c=t.isURLSearchParams=function(r){return typeof URLSearchParams!="undefined"&&r instanceof URLSearchParams},_=t.isDate=function(r){return(0,i.default)(r)==="object"&&Object.prototype.toString.call(r)==="[object Date]"},d=t.isObject=function(r){return r!==null&&(0,i.default)(r)==="object"},l=t.getParamObject=function(r){return c(r)?(0,p.parse)(r.toString(),{strictNullHandling:!0}):typeof r=="string"?[r]:r},n=t.reqStringify=function(r){return(0,p.stringify)(r,{arrayFormat:"repeat",strictNullHandling:!0})},E=t.getType=function(r){var m=(0,i.default)(r);return m!=="object"?m:Object.prototype.toString.call(r).replace(/^$/,"$1")},T=t.hidePhone=function(r){return r==null?void 0:r.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")},I=t.asyncAction=function(r){var m=Promise.resolve(r);return function(g){m.then(function(){return setTimeout(function(){return g()})})}},L=t.getImgsUrl=function(r){var m=/<img.*?(?:>|\/>)/gi,g=/src=['"]?([^'"]*)['"]?/i,h=r.match(m);if(!h)return null;var P=h.reduce(function(b,x){var U=x.match(g);return U[1]?[].concat((0,o.default)(b),[U[1]]):b},[]);return P},K=t.customizeTimer={intervalTimer:null,timeoutTimer:null,setTimeout:function(r,m){var g=this,h=Date.now,P=h(),b=P,x=function(){g.timeoutTimer=requestAnimationFrame(x),b=h(),b-P>=m&&(r(),cancelAnimationFrame(g.timeoutTimer))};return this.timeoutTimer=requestAnimationFrame(x),this.timeoutTimer},clearTimeout:function(){cancelAnimationFrame(this.timeoutTimer)},setInterval:function(r,m){var g=this,h=Date.now,P=h(),b=P,x=function(){g.intervalTimer=requestAnimationFrame(x),b=h(),b-P>=m&&(P=h(),b=P,r())};return this.intervalTimer=requestAnimationFrame(x),this.intervalTimer},clearInterval:function(){cancelAnimationFrame(this.intervalTimer)}},z=t.isDecimal=function(r){var m=/(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/;return m.test(r)},S=t.limitDecimal=function(r){return r.replace(/^(-)*(\d+)\.(\d\d).*$/,"$1$2.$3")},Y=t.passwordStrength=function(r){var m=/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;return m.test(r)},Q=t.checkIsLocalPage=function(){document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")return!1;if(document.visibilityState==="visible")return!0;window.addEventListener("pagehide",function(r){r.persisted},!1)})},V=t.randomHex=function(){return"#".concat(Math.floor(Math.random()*16777215).toString(16).padEnd(6,"0"))},G=t.clearCookies=document.cookie.split(";").forEach(function(f){return document.cookie=f.replace(/^ +/,"").replace(/[=].*/,"=;expires=".concat(new Date(0).toUTCString(),";path=/"))}),y=t.dayDif=function(r,m){return Math.ceil(Math.abs(r.getTime()-m.getTime())/864e5)},W=t.capitalize=function(r){return r.charAt(0).toUpperCase()+r.slice(1)},O=t.isNotEmpty=function(r){return Array.isArray(r)&&r.length>0},D=t.isDarkMode=window.matchMedia("(prefers-color-scheme: dark)").matches,M=t.fetchSomething=function(){return new Promise(function(r){setTimeout(function(){r("")},1e3)})},R=t.toFixed=function(r,m){if(typeof r!="number")throw new Error("number\u4E0D\u662F\u6570\u5B57");var g=Math.round(Math.pow(10,m)*r)/Math.pow(10,m);if(g=String(g),g.indexOf(".")===-1)m!==0&&(g+=".",g+=new Array(m+1).join("0"));else{var h=g.split(".");h[1].length<m&&(h[1]+=new Array(m-h[1].length+1).join("0")),g=h.join(".")}return g},j=t.toFixedBug=function(r,m){return~~(Math.pow(10,m)*r)/Math.pow(10,m)},N=t.promiseWithTimeout=function(r,m){var g=new Promise(function(h){return setTimeout(function(){return h("Time Out!")},m)});return Promise.race([g,r])},X=t.shuffleArr=function(r){return r.sort(function(){return .5-Math.random()})},k=t.sleep=function(r){return new Promise(function(m){return setTimeout(function(){return m()},r)})},J=t.ThousandNum=function(r){return r.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},$=t.RandomId=function(r){return Math.random().toString(36).substring(3,r)},ce=t.RoundNum=function(r,m){return Math.round(r*Math.pow(10,m))/Math.pow(10,m)},me=t.randomNum=function(r,m){return Math.floor(Math.random()*(m-r+1))+r},re=t.isEmptyArray=function(r){return Array.isArray(r)&&!r.length},fe=t.randomItem=function(r){return r[Math.floor(Math.random()*r.length)]},ae=t.asyncTo=function(r){return r.then(function(m){return[null,m]}).catch(function(m){return[m]})},oe=t.hasFocus=function(r){return r===document.activeElement},Ee=t.isEqual=function(r,m){return JSON.stringify(r)===JSON.stringify(m)},ve=t.randomString=function(){return Math.random().toString(36).slice(2)},ie=t.toCamelCase=function(r){return r.trim().replace(/[-_\s]+(.)?/g,function(m,g){return g?g.toUpperCase():""})},te=t.random=function(r,m){return Math.floor(Math.random()*(m-r+1)+r)},Ce=t.randomColor=function(){return"#".concat(Math.random().toString(16).slice(2,8).padEnd(6,"0"))},ge=t.pause=function(r){return new Promise(function(m){return setTimeout(m,r)})},pe=t.camelizeCamelCase=function(r){return r.replace(/(?:^\w|[A-Z]|\b\w)/g,function(m,g){return g===0?m.toLowerCase():m.toUpperCase()}).replace(/\s+/g,"")},Be=t.copyTextToClipboard=function(){var f=(0,u.default)(A.default.mark(function r(m){var g;return A.default.wrap(function(P){for(;;)switch(P.prev=P.next){case 0:if(P.prev=0,!((g=navigator)!==null&&g!==void 0&&(g=g.clipboard)!==null&&g!==void 0&&g.writeText)){P.next=4;break}return P.next=4,navigator.clipboard.writeText(m);case 4:P.next=8;break;case 6:P.prev=6,P.t0=P.catch(0);case 8:case"end":return P.stop()}},r,null,[[0,6]])}));return function(m){return f.apply(this,arguments)}}(),ye=t.getRandomId=function(){for(var r="",m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",g=0;g<32;g++)r+=m.charAt(Math.floor(Math.random()*m.length));return r},se=t.oneApiChat=function(r,m,g){return fetch("https://api.openai.com/v1/chat/completions",{method:"POST",signal:g,headers:{Authorization:m,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:r,stream:!0})})},le=t.getCurrentDate=function(){var r=new Date,m=r.getDate(),g=r.getMonth()+1,h=r.getFullYear();return"".concat(h,"-").concat(g,"-").concat(m)},he=t.exportJsonData=function(r){var m=le(),g=JSON.stringify(JSON.parse(r),null,2),h=new Blob([g],{type:"application/json"}),P=URL.createObjectURL(h),b=document.createElement("a");b.href=P,b.download="chat-store_".concat(m,".json"),document.body.appendChild(b),b.click(),document.body.removeChild(b)},q=t.saveHtmlToPng=function(){var f=(0,u.default)(A.default.mark(function r(m,g,h){var P,b,x,U;return A.default.wrap(function(F){for(;;)switch(F.prev=F.next){case 0:return F.prev=0,P=m!=null?m:document.getElementById("image-wrapper"),F.next=4,(0,v.default)(P,{useCORS:!0});case 4:b=F.sent,x=b.toDataURL("image/png"),U=document.createElement("a"),U.style.display="none",U.href=x,U.setAttribute("download","chat-shot.png"),typeof U.download=="undefined"&&U.setAttribute("target","_blank"),document.body.appendChild(U),U.click(),document.body.removeChild(U),window.URL.revokeObjectURL(x),g&&g(),Promise.resolve(),F.next=22;break;case 19:F.prev=19,F.t0=F.catch(0),h&&h(F.t0.message);case 22:case"end":return F.stop()}},r,null,[[0,19]])}));return function(m,g,h){return f.apply(this,arguments)}}(),w=t.trimTopic=function(r){return r.replace(/[，。！？”“"、,.!?]*$/,"")},De=t.readFromFile=function(){return new Promise(function(r,m){var g=document.createElement("input");g.type="file",g.accept="application/json",g.onchange=function(h){var P=h.target.files[0],b=new FileReader;b.onload=function(x){r(x.target.result)},b.onerror=function(x){return m(x)},b.readAsText(P)},g.click()})},Oe=t.prettyObject=function(r){var m="";return typeof r!="string"&&(m=JSON.stringify(r,null,"  ")),m==="{}"?m.toString():m.startsWith("```json")?m:["```json",m,"```"].join(`
`)},de=t.getFileType=function(r,m){var g=m.split(".").pop().toLowerCase();switch(g){case"txt":return"text/plain";case"json":return"application/json";case"doc":return"application/msword";case"docx":return"application/vnd.openxmlformats-officedocument.wordprocessingml.document";case"xls":return"application/vnd.ms-excel";case"xlsx":return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";case"ppt":return"application/vnd.ms-powerpoint";case"pptx":return"application/vnd.openxmlformats-officedocument.presentationml.presentation";case"pdf":return"application/pdf";case"jpg":case"jpeg":return"image/jpeg";case"png":return"image/png";case"gif":return"image/gif";case"zip":return"application/zip";case"rar":return"application/x-rar-compressed";default:if(typeof r=="string")try{return JSON.parse(r),"application/json"}catch(h){return"text/plain"}else return r instanceof Uint8Array||r instanceof ArrayBuffer,"application/octet-stream"}},Z=t.exportFile=function(r,m){var g;if((r==null||(g=r.headers["content-type"])===null||g===void 0?void 0:g.indexOf("application/json"))===-1){var h=r.headers&&r.headers["content-disposition"]||"attachment;filename=".concat(m||"file",".xlsx"),P=decodeURI(h==null?void 0:h.split("=")[1].replace(/'/g,"")).replace(/"/g,"").replace("utf-8''","")||"",b=de(r.data,m||P),x=new Blob([r.data],{type:b}),U=URL.createObjectURL(x),H=document.createElement("a");document.body.appendChild(H),H.style="display: none",H.href=U,H.download=P,H.click(),document.body.removeChild(H)}}},25039:function(B,t,e){"use strict";e.r(t);var s=e(85072),A=e.n(s),u=e(97825),o=e.n(u),i=e(77659),p=e.n(i),v=e(55056),C=e.n(v),a=e(10540),c=e.n(a),_=e(41113),d=e.n(_),l=e(47122),n={};n.styleTagTransform=d(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=o(),n.insertStyleElement=c();var E=A()(l.A,n);t.default=l.A&&l.A.locals?l.A.locals:void 0},21958:function(B,t,e){"use strict";e.r(t);var s=e(85072),A=e.n(s),u=e(97825),o=e.n(u),i=e(77659),p=e.n(i),v=e(55056),C=e.n(v),a=e(10540),c=e.n(a),_=e(41113),d=e.n(_),l=e(97669),n={};n.styleTagTransform=d(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=o(),n.insertStyleElement=c();var E=A()(l.A,n);t.default=l.A&&l.A.locals?l.A.locals:void 0},39726:function(B,t,e){"use strict";e.r(t);var s=e(85072),A=e.n(s),u=e(97825),o=e.n(u),i=e(77659),p=e.n(i),v=e(55056),C=e.n(v),a=e(10540),c=e.n(a),_=e(41113),d=e.n(_),l=e(27825),n={};n.styleTagTransform=d(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=o(),n.insertStyleElement=c();var E=A()(l.A,n);t.default=l.A&&l.A.locals?l.A.locals:void 0},84576:function(B,t,e){"use strict";e.r(t);var s=e(85072),A=e.n(s),u=e(97825),o=e.n(u),i=e(77659),p=e.n(i),v=e(55056),C=e.n(v),a=e(10540),c=e.n(a),_=e(41113),d=e.n(_),l=e(80711),n={};n.styleTagTransform=d(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=o(),n.insertStyleElement=c();var E=A()(l.A,n);t.default=l.A&&l.A.locals?l.A.locals:void 0},85120:function(B,t,e){"use strict";e.r(t);var s=e(85072),A=e.n(s),u=e(97825),o=e.n(u),i=e(77659),p=e.n(i),v=e(55056),C=e.n(v),a=e(10540),c=e.n(a),_=e(41113),d=e.n(_),l=e(45789),n={};n.styleTagTransform=d(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=o(),n.insertStyleElement=c();var E=A()(l.A,n);t.default=l.A&&l.A.locals?l.A.locals:void 0},61352:function(B,t,e){"use strict";e.r(t);var s=e(85072),A=e.n(s),u=e(97825),o=e.n(u),i=e(77659),p=e.n(i),v=e(55056),C=e.n(v),a=e(10540),c=e.n(a),_=e(41113),d=e.n(_),l=e(91869),n={};n.styleTagTransform=d(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=o(),n.insertStyleElement=c();var E=A()(l.A,n);t.default=l.A&&l.A.locals?l.A.locals:void 0},89696:function(B,t,e){"use strict";e.r(t);var s=e(85072),A=e.n(s),u=e(97825),o=e.n(u),i=e(77659),p=e.n(i),v=e(55056),C=e.n(v),a=e(10540),c=e.n(a),_=e(41113),d=e.n(_),l=e(22211),n={};n.styleTagTransform=d(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=o(),n.insertStyleElement=c();var E=A()(l.A,n);t.default=l.A&&l.A.locals?l.A.locals:void 0},30152:function(B,t,e){"use strict";e.r(t);var s=e(85072),A=e.n(s),u=e(97825),o=e.n(u),i=e(77659),p=e.n(i),v=e(55056),C=e.n(v),a=e(10540),c=e.n(a),_=e(41113),d=e.n(_),l=e(34671),n={};n.styleTagTransform=d(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=o(),n.insertStyleElement=c();var E=A()(l.A,n);t.default=l.A&&l.A.locals?l.A.locals:void 0},49887:function(B,t,e){"use strict";e.r(t);var s=e(85072),A=e.n(s),u=e(97825),o=e.n(u),i=e(77659),p=e.n(i),v=e(55056),C=e.n(v),a=e(10540),c=e.n(a),_=e(41113),d=e.n(_),l=e(6988),n={};n.styleTagTransform=d(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=o(),n.insertStyleElement=c();var E=A()(l.A,n);t.default=l.A&&l.A.locals?l.A.locals:void 0},91193:function(B,t,e){"use strict";e.r(t);var s=e(85072),A=e.n(s),u=e(97825),o=e.n(u),i=e(77659),p=e.n(i),v=e(55056),C=e.n(v),a=e(10540),c=e.n(a),_=e(41113),d=e.n(_),l=e(41742),n={};n.styleTagTransform=d(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=o(),n.insertStyleElement=c();var E=A()(l.A,n);t.default=l.A&&l.A.locals?l.A.locals:void 0},57812:function(B,t,e){"use strict";e.r(t);var s=e(85072),A=e.n(s),u=e(97825),o=e.n(u),i=e(77659),p=e.n(i),v=e(55056),C=e.n(v),a=e(10540),c=e.n(a),_=e(41113),d=e.n(_),l=e(20335),n={};n.styleTagTransform=d(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=o(),n.insertStyleElement=c();var E=A()(l.A,n);t.default=l.A&&l.A.locals?l.A.locals:void 0},47443:function(B,t,e){"use strict";e.r(t);var s=e(85072),A=e.n(s),u=e(97825),o=e.n(u),i=e(77659),p=e.n(i),v=e(55056),C=e.n(v),a=e(10540),c=e.n(a),_=e(41113),d=e.n(_),l=e(37318),n={};n.styleTagTransform=d(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=o(),n.insertStyleElement=c();var E=A()(l.A,n);t.default=l.A&&l.A.locals?l.A.locals:void 0},82547:function(B){"use strict";B.exports="data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 4%27%3E%3Cstyle type=%27text/css%27%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX%280%29;}to {transform:translateX%28-15px%29;}}%3C/style%3E%3Cpath fill=%27none%27 stroke=%27%230087ca%27 stroke-width=%272%27 class=%27squiggle%27 d=%27M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3%27/%3E%3C/svg%3E"},42634:function(){}}]);

//# sourceMappingURL=267.e033a56ee5a8385435c3.js.map