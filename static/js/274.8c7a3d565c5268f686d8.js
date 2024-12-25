"use strict";(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[274],{42706:function(c,s,e){var a=e(71354),i=e.n(a),r=e(76314),o=e.n(r),d=o()(i());d.push([c.id,`.warpper--O5ESm {\r
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
`],sourceRoot:""}]),d.locals={warpper:"warpper--O5ESm",pre:"pre--csWZr","token-line":"token-line--Oslmy",tokenLine:"token-line--Oslmy",line:"line--wTVoy","line-no":"line-no--diNU0",lineNo:"line-no--diNU0"},s.A=d},42916:function(c,s,e){var a=e(24994);Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var i=a(e(43693)),r=a(e(96540));function o(n,_){var l=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);_&&(t=t.filter(function(E){return Object.getOwnPropertyDescriptor(n,E).enumerable})),l.push.apply(l,t)}return l}function d(n){for(var _=1;_<arguments.length;_++){var l=arguments[_]!=null?arguments[_]:{};_%2?o(Object(l),!0).forEach(function(t){(0,i.default)(n,t,l[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(l)):o(Object(l)).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(l,t))})}return n}var u=r.default.forwardRef(function(n,_){var l=n.style,t=n.children;return r.default.createElement("div",{ref:_,style:d({width:"100%",height:"calc(100vh - 204px)",position:"relative",overflowX:"hidden",overflowY:"auto"},l)},t)}),f=s.default=u},61274:function(c,s,e){var a=e(24994);Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var i=a(e(94634)),r=a(e(96540)),o=e(77450),d=a(e(42916)),u=a(e(19417)),f=`
const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}
`.trim(),n=function(){return r.default.createElement(d.default,null,r.default.createElement("h3",null,"Welcome to prism-react-renderer!"),r.default.createElement(o.Highlight,{theme:o.themes.dracula,className:u.default.wrapper,code:f,language:"jsx"},function(t){var E=t.style,A=t.tokens,m=t.getLineProps,y=t.getTokenProps;return r.default.createElement("pre",{className:u.default.pre,style:E},A.map(function(O,P){return r.default.createElement("div",(0,i.default)({className:u.default.line,key:P},m({line:O})),r.default.createElement("span",{className:u.default["line-no"]},P+1),O.map(function(p,v){return r.default.createElement("span",(0,i.default)({key:v},y({token:p})))}))}))}))},_=s.default=n},19417:function(c,s,e){e.r(s);var a=e(85072),i=e.n(a),r=e(97825),o=e.n(r),d=e(77659),u=e.n(d),f=e(55056),n=e.n(f),_=e(10540),l=e.n(_),t=e(41113),E=e.n(t),A=e(42706),m={};m.styleTagTransform=E(),m.setAttributes=n(),m.insert=u().bind(null,"head"),m.domAPI=o(),m.insertStyleElement=l();var y=i()(A.A,m);s.default=A.A&&A.A.locals?A.A.locals:void 0}}]);
