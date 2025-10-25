"use strict";(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[6283],{9449:(function(g,o,e){var d=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var r=d(e(96540)),s=function(C){var p=C.children;return r.default.createElement("div",{style:{width:"100%",height:"100vh",overflow:"auto"}},p)},n=o.default=s}),31897:(function(g,o,e){e.r(o);var d=e(85072),r=e.n(d),s=e(97825),n=e.n(s),t=e(77659),C=e.n(t),p=e(55056),h=e.n(p),y=e(10540),i=e.n(y),B=e(41113),_=e.n(B),c=e(82322),l={};l.styleTagTransform=_(),l.setAttributes=h(),l.insert=C().bind(null,"head"),l.domAPI=n(),l.insertStyleElement=i();var a=r()(c.A,l);o.default=c.A&&c.A.locals?c.A.locals:void 0}),56283:(function(g,o,e){var d=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var r=d(e(96540)),s=e(84976),n=e(30324),t=e(10252),C=d(e(9449)),p=d(e(95598)),h=n.Layout.Content,y=function(){var _=(0,s.useNavigate)(),c=n.theme.useToken(),l=c.token.colorBgContainer;return r.default.createElement(C.default,null,r.default.createElement(n.Layout,{style:{height:"100%"}},r.default.createElement(h,{style:{height:"100%",background:l}},r.default.createElement(s.Routes,null,r.default.createElement(s.Route,{path:"/",element:r.default.createElement(r.default.Fragment,null,r.default.createElement(n.Space,null,r.default.createElement(n.Button,{type:"link",icon:r.default.createElement(t.ArrowLeftOutlined,null),onClick:function(){return _("/")}},"\u56DE\u4E3B\u7AD9"),r.default.createElement(n.Button,{type:"link",icon:r.default.createElement(t.ArrowRightOutlined,null),onClick:function(){return _("invoices")}},"\u4E0B\u4E00\u7AD9")),r.default.createElement(p.default,null))}),r.default.createElement(s.Route,{path:"invoices",element:r.default.createElement(r.default.Fragment,null,r.default.createElement(n.Space,null,r.default.createElement(n.Button,{type:"link",icon:r.default.createElement(t.ArrowLeftOutlined,null),onClick:function(){return _(-1)}},"\u4E0A\u4E00\u7AD9")),r.default.createElement(n.Skeleton,{active:!0}))})))))},i=o.default=y}),82322:(function(g,o,e){var d=e(71354),r=e.n(d),s=e(76314),n=e.n(s),t=n()(r());t.push([g.id,`.container--B9B5Z {\r
  width: 100%;\r
  background-color: #f5f5f5;\r
}\r
\r
.tabsContainer--JKtDu {\r
  background-color: white;\r
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);\r
}\r
\r
.tabsList--lgdbl {\r
  display: flex;\r
  align-items: center;\r
  padding: 0 20px;\r
  border-bottom: 1px solid #e8e8e8;\r
}\r
\r
.tabItem--EnwOa {\r
  display: flex;\r
  align-items: center;\r
  padding: 16px 24px;\r
  cursor: pointer;\r
  position: relative;\r
  color: #666;\r
  font-size: 14px;\r
  transition: all 0.3s ease;\r
\r
  &:hover {\r
    color: #1890ff;\r
  }\r
\r
  &.actived--gufbt {\r
    color: #1890ff;\r
    font-weight: 500;\r
\r
    &::after {\r
      content: '';\r
      position: absolute;\r
      bottom: 0;\r
      left: 50%;\r
      transform: translateX(-50%);\r
      width: 20px;\r
      height: 2px;\r
      background-color: #1890ff;\r
    }\r
  }\r
\r
  &.hasArrow--O1T_u {\r
    color: #1890ff;\r
    font-weight: 500;\r
    background-color: #f0f8ff;\r
  }\r
}\r
\r
.arrow--cuaJf {\r
  margin-left: 8px;\r
  font-size: 12px;\r
  transition: transform 0.3s ease;\r
\r
  &.arrowDown--XMHdG {\r
    transform: rotate(0deg);\r
  }\r
}\r
\r
.subTabsList--Ik3CA {\r
  display: flex;\r
  align-items: center;\r
  padding: 0 20px;\r
  background-color: #fafafa;\r
  border-bottom: 1px solid #e8e8e8;\r
}\r
\r
.subTabItem--u5Szp {\r
  padding: 12px 20px;\r
  cursor: pointer;\r
  color: #666;\r
  font-size: 13px;\r
  position: relative;\r
  transition: all 0.3s ease;\r
\r
  &:hover {\r
    color: #1890ff;\r
  }\r
\r
  &.presented--WlCTt {\r
    color: #1890ff;\r
    font-weight: 500;\r
\r
    &::after {\r
      content: '';\r
      position: absolute;\r
      bottom: 0;\r
      left: 50%;\r
      transform: translateX(-50%);\r
      width: 100%;\r
      height: 2px;\r
      background-color: #1890ff;\r
    }\r
  }\r
}\r
\r
.contentArea--rUNGP {\r
  padding: 40px 20px;\r
}\r
\r
.mockContent--yiVfu {\r
  background-color: white;\r
  padding: 40px;\r
  border-radius: 8px;\r
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);\r
  font-size: 16px;\r
  color: #333;\r
  text-align: center;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/NavigationTabs/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,yBAAyB;AAC3B;;AAEA;EACE,uBAAuB;EACvB,sCAAsC;AACxC;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,gCAAgC;AAClC;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,eAAe;EACf,kBAAkB;EAClB,WAAW;EACX,eAAe;EACf,yBAAyB;;EAEzB;IACE,cAAc;EAChB;;EAEA;IACE,cAAc;IACd,gBAAgB;;IAEhB;MACE,WAAW;MACX,kBAAkB;MAClB,SAAS;MACT,SAAS;MACT,2BAA2B;MAC3B,WAAW;MACX,WAAW;MACX,yBAAyB;IAC3B;EACF;;EAEA;IACE,cAAc;IACd,gBAAgB;IAChB,yBAAyB;EAC3B;AACF;;AAEA;EACE,gBAAgB;EAChB,eAAe;EACf,+BAA+B;;EAE/B;IACE,uBAAuB;EACzB;AACF;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,yBAAyB;EACzB,gCAAgC;AAClC;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,WAAW;EACX,eAAe;EACf,kBAAkB;EAClB,yBAAyB;;EAEzB;IACE,cAAc;EAChB;;EAEA;IACE,cAAc;IACd,gBAAgB;;IAEhB;MACE,WAAW;MACX,kBAAkB;MAClB,SAAS;MACT,SAAS;MACT,2BAA2B;MAC3B,WAAW;MACX,WAAW;MACX,yBAAyB;IAC3B;EACF;AACF;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,uBAAuB;EACvB,aAAa;EACb,kBAAkB;EAClB,sCAAsC;EACtC,eAAe;EACf,WAAW;EACX,kBAAkB;AACpB",sourcesContent:[`.container {\r
  width: 100%;\r
  background-color: #f5f5f5;\r
}\r
\r
.tabsContainer {\r
  background-color: white;\r
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);\r
}\r
\r
.tabsList {\r
  display: flex;\r
  align-items: center;\r
  padding: 0 20px;\r
  border-bottom: 1px solid #e8e8e8;\r
}\r
\r
.tabItem {\r
  display: flex;\r
  align-items: center;\r
  padding: 16px 24px;\r
  cursor: pointer;\r
  position: relative;\r
  color: #666;\r
  font-size: 14px;\r
  transition: all 0.3s ease;\r
\r
  &:hover {\r
    color: #1890ff;\r
  }\r
\r
  &.actived {\r
    color: #1890ff;\r
    font-weight: 500;\r
\r
    &::after {\r
      content: '';\r
      position: absolute;\r
      bottom: 0;\r
      left: 50%;\r
      transform: translateX(-50%);\r
      width: 20px;\r
      height: 2px;\r
      background-color: #1890ff;\r
    }\r
  }\r
\r
  &.hasArrow {\r
    color: #1890ff;\r
    font-weight: 500;\r
    background-color: #f0f8ff;\r
  }\r
}\r
\r
.arrow {\r
  margin-left: 8px;\r
  font-size: 12px;\r
  transition: transform 0.3s ease;\r
\r
  &.arrowDown {\r
    transform: rotate(0deg);\r
  }\r
}\r
\r
.subTabsList {\r
  display: flex;\r
  align-items: center;\r
  padding: 0 20px;\r
  background-color: #fafafa;\r
  border-bottom: 1px solid #e8e8e8;\r
}\r
\r
.subTabItem {\r
  padding: 12px 20px;\r
  cursor: pointer;\r
  color: #666;\r
  font-size: 13px;\r
  position: relative;\r
  transition: all 0.3s ease;\r
\r
  &:hover {\r
    color: #1890ff;\r
  }\r
\r
  &.presented {\r
    color: #1890ff;\r
    font-weight: 500;\r
\r
    &::after {\r
      content: '';\r
      position: absolute;\r
      bottom: 0;\r
      left: 50%;\r
      transform: translateX(-50%);\r
      width: 100%;\r
      height: 2px;\r
      background-color: #1890ff;\r
    }\r
  }\r
}\r
\r
.contentArea {\r
  padding: 40px 20px;\r
}\r
\r
.mockContent {\r
  background-color: white;\r
  padding: 40px;\r
  border-radius: 8px;\r
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);\r
  font-size: 16px;\r
  color: #333;\r
  text-align: center;\r
}\r
`],sourceRoot:""}]),t.locals={container:"container--B9B5Z",tabsContainer:"tabsContainer--JKtDu",tabsList:"tabsList--lgdbl",tabItem:"tabItem--EnwOa",actived:"actived--gufbt",hasArrow:"hasArrow--O1T_u",arrow:"arrow--cuaJf",arrowDown:"arrowDown--XMHdG",subTabsList:"subTabsList--Ik3CA",subTabItem:"subTabItem--u5Szp",presented:"presented--WlCTt",contentArea:"contentArea--rUNGP",mockContent:"mockContent--yiVfu"},o.A=t}),95598:(function(g,o,e){"use client";var d=e(24994),r=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var s=d(e(85715)),n=C(e(96540)),t=d(e(31897));function C(i,B){if(typeof WeakMap=="function")var _=new WeakMap,c=new WeakMap;return(C=function(a,M){if(!M&&a&&a.__esModule)return a;var E,b,m={__proto__:null,default:a};if(a===null||r(a)!="object"&&typeof a!="function")return m;if(E=M?c:_){if(E.has(a))return E.get(a);E.set(a,m)}for(var f in a)f!=="default"&&{}.hasOwnProperty.call(a,f)&&((b=(E=Object.defineProperty)&&Object.getOwnPropertyDescriptor(a,f))&&(b.get||b.set)?E(m,f,b):m[f]=a[f]);return m})(i,B)}var p={0:function(){return n.default.createElement("div",{className:t.default.mockContent},"\u9996\u9875\u5185\u5BB9")},1:function(){return n.default.createElement("div",{className:t.default.mockContent},"\u4EA7\u54C1\u4ECB\u7ECD\u5185\u5BB9")},2:function(){return n.default.createElement("div",{className:t.default.mockContent},"\u5173\u4E8E\u6211\u4EEC\u5185\u5BB9")},"3-0":function(){return n.default.createElement("div",{className:t.default.mockContent},"\u670D\u52A1\u6982\u89C8\u5185\u5BB9")},"3-1":function(){return n.default.createElement("div",{className:t.default.mockContent},"\u6280\u672F\u652F\u6301\u5185\u5BB9")},"3-2":function(){return n.default.createElement("div",{className:t.default.mockContent},"\u552E\u540E\u670D\u52A1\u5185\u5BB9")},4:function(){return n.default.createElement("div",{className:t.default.mockContent},"\u8054\u7CFB\u6211\u4EEC\u5185\u5BB9")}},h=function(){var B,_=(0,n.useState)(0),c=(0,s.default)(_,2),l=c[0],a=c[1],M=(0,n.useState)(""),E=(0,s.default)(M,2),b=E[0],m=E[1],f=[{label:"\u9996\u9875"},{label:"\u4EA7\u54C1"},{label:"\u5173\u4E8E"},{label:"\u670D\u52A1",children:[{label:"\u6982\u89C8"},{label:"\u6280\u672F\u652F\u6301"},{label:"\u552E\u540E"}]},{label:"\u8054\u7CFB"}],x=function(u){a(u);var A=f[u];A.children&&A.children.length>0?m("".concat(u,"-0")):m("")},k=function(u,A){m("".concat(u,"-").concat(A))},T=function(){var u=b||l.toString(),A=p[u];return A?n.default.createElement(A,null):n.default.createElement("div",{className:t.default.mockContent},"\u9ED8\u8BA4\u5185\u5BB9")};return n.default.createElement("div",{className:t.default.container},n.default.createElement("div",{className:t.default.tabsContainer},n.default.createElement("div",{className:t.default.tabsList},f.map(function(v,u){var A=l===u,D=v.children&&v.children.length>0,I=A&&D;return n.default.createElement("div",{key:u,className:"".concat(t.default.tabItem," ").concat(I?t.default.hasArrow:A?t.default.actived:""),onClick:function(){return x(u)}},n.default.createElement("span",null,v.label),D&&n.default.createElement("span",{className:"".concat(t.default.arrow," ").concat(A?t.default.arrowDown:"")},"\u25BC"))})),((B=f[l])===null||B===void 0?void 0:B.children)&&n.default.createElement("div",{className:t.default.subTabsList},f[l].children.map(function(v,u){var A=b==="".concat(l,"-").concat(u);return n.default.createElement("div",{key:u,className:"".concat(t.default.subTabItem," ").concat(A?t.default.presented:""),onClick:function(){return k(l,u)}},v.label)}))),n.default.createElement("div",{className:t.default.contentArea},T()))},y=o.default=h})}]);
