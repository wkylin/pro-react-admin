"use strict";(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[274],{42706:function(A,r,e){var l=e(71354),i=e.n(l),t=e(76314),o=e.n(t),d=o()(i());d.push([A.id,`.warpper--O5ESm {\r
  font-family: sans-serif;\r
  text-align: center;\r
}\r
\r
.pre--csWZr {\r
  text-align: left;\r
  margin: 1em 0;\r
  padding: 0.5em;\r
  overflow: auto;\r
\r
  & .token-line--Oslmy {\r
    line-height: 1.3em;\r
    height: 1.3em;\r
  }\r
}\r
\r
.line--wTVoy {\r
  padding-right: 0.5em;\r
}\r
\r
.line-no--diNU0 {\r
  text-align: right;\r
  padding-right: 1em;\r
  -webkit-user-select: none;\r
      -ms-user-select: none;\r
          user-select: none;\r
  opacity: 0.5;\r
}\r
`,"",{version:3,sources:["webpack://./src/pages/prism/index.module.less"],names:[],mappings:"AAAA;EACE,uBAAuB;EACvB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,cAAc;EACd,cAAc;;EAEd;IACE,kBAAkB;IAClB,aAAa;EACf;AACF;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,yBAAiB;MAAjB,qBAAiB;UAAjB,iBAAiB;EACjB,YAAY;AACd",sourcesContent:[`.warpper {\r
  font-family: sans-serif;\r
  text-align: center;\r
}\r
\r
.pre {\r
  text-align: left;\r
  margin: 1em 0;\r
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
`],sourceRoot:""}]),d.locals={warpper:"warpper--O5ESm",pre:"pre--csWZr","token-line":"token-line--Oslmy",tokenLine:"token-line--Oslmy",line:"line--wTVoy","line-no":"line-no--diNU0",lineNo:"line-no--diNU0"},r.A=d},71354:function(A){A.exports=function(r){var e=r[1],l=r[3];if(!l)return e;if(typeof btoa=="function"){var i=btoa(unescape(encodeURIComponent(JSON.stringify(l)))),t="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),o="/*# ".concat(t," */");return[e].concat([o]).join(`
`)}return[e].join(`
`)}},42916:function(A,r,e){var l=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var i=l(e(43693)),t=l(e(96540));function o(s,a){var _=Object.keys(s);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(s);a&&(n=n.filter(function(E){return Object.getOwnPropertyDescriptor(s,E).enumerable})),_.push.apply(_,n)}return _}function d(s){for(var a=1;a<arguments.length;a++){var _=arguments[a]!=null?arguments[a]:{};a%2?o(Object(_),!0).forEach(function(n){(0,i.default)(s,n,_[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(_)):o(Object(_)).forEach(function(n){Object.defineProperty(s,n,Object.getOwnPropertyDescriptor(_,n))})}return s}var u=t.default.forwardRef(function(s,a){var _=s.style,n=s.children;return t.default.createElement("div",{ref:a,style:d({width:"100%",height:"calc(100vh - 204px)",position:"relative",overflowX:"hidden",overflowY:"auto"},_)},n)}),f=r.default=u},61274:function(A,r,e){var l=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var i=l(e(94634)),t=l(e(96540)),o=e(77450),d=l(e(42916)),u=l(e(19417)),f=`
const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}
`.trim(),s=function(){return t.default.createElement(d.default,null,t.default.createElement("h3",null,"Welcome to prism-react-renderer!"),t.default.createElement(o.Highlight,{theme:o.themes.dracula,className:u.default.wrapper,code:f,language:"jsx"},function(n){var E=n.style,c=n.tokens,m=n.getLineProps,p=n.getTokenProps;return t.default.createElement("pre",{className:u.default.pre,style:E},c.map(function(y,v){return t.default.createElement("div",(0,i.default)({className:u.default.line,key:v},m({line:y})),t.default.createElement("span",{className:u.default["line-no"]},v+1),y.map(function(O,P){return t.default.createElement("span",(0,i.default)({key:P},p({token:O})))}))}))}))},a=r.default=s},19417:function(A,r,e){e.r(r);var l=e(85072),i=e.n(l),t=e(97825),o=e.n(t),d=e(77659),u=e.n(d),f=e(55056),s=e.n(f),a=e(10540),_=e.n(a),n=e(41113),E=e.n(n),c=e(42706),m={};m.styleTagTransform=E(),m.setAttributes=s(),m.insert=u().bind(null,"head"),m.domAPI=o(),m.insertStyleElement=_();var p=i()(c.A,m);r.default=c.A&&c.A.locals?c.A.locals:void 0}}]);
