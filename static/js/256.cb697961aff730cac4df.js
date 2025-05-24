(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[256],{10256:function(n,s,e){"use strict";var r=e(24994);Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var a=r(e(94634)),t=r(e(96540)),d=e(77450),_=r(e(59378)),u=r(e(42901)),f=`
const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}
`.trim(),m=function(){return t.default.createElement(_.default,null,t.default.createElement("h3",null,"Welcome to prism-react-renderer!"),t.default.createElement(d.Highlight,{theme:d.themes.dracula,className:u.default.wrapper,code:f,language:"jsx"},function(l){var c=l.style,i=l.tokens,o=l.getLineProps,A=l.getTokenProps;return t.default.createElement("pre",{className:u.default.pre,style:c},i.map(function(v,y){return t.default.createElement("div",(0,a.default)({className:u.default.line,key:y},o({line:v})),t.default.createElement("span",{className:u.default["line-no"]},y+1),v.map(function(O,P){return t.default.createElement("span",(0,a.default)({key:P},A({token:O})))}))}))}))},p=s.default=m},17894:function(n,s,e){"use strict";var r=e(71354),a=e.n(r),t=e(76314),d=e.n(t),_=d()(a());_.push([n.id,`.warpper--O5ESm {\r
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
`],sourceRoot:""}]),_.locals={warpper:"warpper--O5ESm",pre:"pre--csWZr","token-line":"token-line--Oslmy",tokenLine:"token-line--Oslmy",line:"line--wTVoy","line-no":"line-no--diNU0",lineNo:"line-no--diNU0"},s.A=_},42901:function(n,s,e){"use strict";e.r(s);var r=e(85072),a=e.n(r),t=e(97825),d=e.n(t),_=e(77659),u=e.n(_),f=e(55056),m=e.n(f),p=e(10540),E=e.n(p),l=e(41113),c=e.n(l),i=e(17894),o={};o.styleTagTransform=c(),o.setAttributes=m(),o.insert=u().bind(null,"head"),o.domAPI=d(),o.insertStyleElement=E();var A=a()(i.A,o);s.default=i.A&&i.A.locals?i.A.locals:void 0},54893:function(n){function s(e,r){if(e==null)return{};var a={};for(var t in e)if({}.hasOwnProperty.call(e,t)){if(r.indexOf(t)!==-1)continue;a[t]=e[t]}return a}n.exports=s,n.exports.__esModule=!0,n.exports.default=n.exports},59378:function(n,s,e){"use strict";var r=e(24994);Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var a=r(e(94634)),t=r(e(43693)),d=r(e(91847)),_=r(e(96540)),u=["style","children"];function f(l,c){var i=Object.keys(l);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(l);c&&(o=o.filter(function(A){return Object.getOwnPropertyDescriptor(l,A).enumerable})),i.push.apply(i,o)}return i}function m(l){for(var c=1;c<arguments.length;c++){var i=arguments[c]!=null?arguments[c]:{};c%2?f(Object(i),!0).forEach(function(o){(0,t.default)(l,o,i[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(i)):f(Object(i)).forEach(function(o){Object.defineProperty(l,o,Object.getOwnPropertyDescriptor(i,o))})}return l}var p=_.default.forwardRef(function(l,c){var i=l.style,o=l.children,A=(0,d.default)(l,u);return _.default.createElement("div",(0,a.default)({ref:c},A,{id:"scrollContainer",style:m({width:"100%",height:"calc(100vh - 204px)",position:"relative",overflowX:"hidden",overflowY:"auto"},i)}),o)}),E=s.default=p},71354:function(n){"use strict";n.exports=function(s){var e=s[1],r=s[3];if(!r)return e;if(typeof btoa=="function"){var a=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),t="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),d="/*# ".concat(t," */");return[e].concat([d]).join(`
`)}return[e].join(`
`)}},91847:function(n,s,e){var r=e(54893);function a(t,d){if(t==null)return{};var _,u,f=r(t,d);if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(t);for(u=0;u<m.length;u++)_=m[u],d.indexOf(_)===-1&&{}.propertyIsEnumerable.call(t,_)&&(f[_]=t[_])}return f}n.exports=a,n.exports.__esModule=!0,n.exports.default=n.exports},94634:function(n){function s(){return n.exports=s=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var a=arguments[r];for(var t in a)({}).hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e},n.exports.__esModule=!0,n.exports.default=n.exports,s.apply(null,arguments)}n.exports=s,n.exports.__esModule=!0,n.exports.default=n.exports}}]);
