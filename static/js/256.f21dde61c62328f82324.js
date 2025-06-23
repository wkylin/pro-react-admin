(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[256],{10256:function(n,l,e){"use strict";var r=e(24994);Object.defineProperty(l,"__esModule",{value:!0}),l.default=void 0;var _=r(e(94634)),t=r(e(96540)),c=e(77450),i=r(e(59378)),d=r(e(42901)),m=`
const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}
`.trim(),A=function(){return t.default.createElement(i.default,null,t.default.createElement("h3",null,"Welcome to prism-react-renderer!"),t.default.createElement(c.Highlight,{theme:c.themes.dracula,className:d.default.wrapper,code:m,language:"jsx"},function(o){var u=o.style,a=o.tokens,s=o.getLineProps,f=o.getTokenProps;return t.default.createElement("pre",{className:d.default.pre,style:u},a.map(function(y,O){return t.default.createElement("div",(0,_.default)({className:d.default.line,key:O},s({line:y})),t.default.createElement("span",{className:d.default["line-no"]},O+1),y.map(function(v,P){return t.default.createElement("span",(0,_.default)({key:P},f({token:v})))}))}))}))},E=l.default=A},17894:function(n,l,e){"use strict";var r=e(71354),_=e.n(r),t=e(76314),c=e.n(t),i=c()(_());i.push([n.id,`.warpper--O5ESm {\r
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
`],sourceRoot:""}]),i.locals={warpper:"warpper--O5ESm",pre:"pre--csWZr","token-line":"token-line--Oslmy",tokenLine:"token-line--Oslmy",line:"line--wTVoy","line-no":"line-no--diNU0",lineNo:"line-no--diNU0"},l.A=i},42901:function(n,l,e){"use strict";e.r(l);var r=e(85072),_=e.n(r),t=e(97825),c=e.n(t),i=e(77659),d=e.n(i),m=e(55056),A=e.n(m),E=e(10540),p=e.n(E),o=e(41113),u=e.n(o),a=e(17894),s={};s.styleTagTransform=u(),s.setAttributes=A(),s.insert=d().bind(null,"head"),s.domAPI=c(),s.insertStyleElement=p();var f=_()(a.A,s);l.default=a.A&&a.A.locals?a.A.locals:void 0},54893:function(n){function l(e,r){if(e==null)return{};var _={};for(var t in e)if({}.hasOwnProperty.call(e,t)){if(r.indexOf(t)!==-1)continue;_[t]=e[t]}return _}n.exports=l,n.exports.__esModule=!0,n.exports.default=n.exports},59378:function(n,l,e){"use strict";var r=e(24994);Object.defineProperty(l,"__esModule",{value:!0}),l.default=void 0;var _=r(e(94634)),t=r(e(43693)),c=r(e(91847)),i=r(e(96540)),d=["style","children"];function m(o,u){var a=Object.keys(o);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(o);u&&(s=s.filter(function(f){return Object.getOwnPropertyDescriptor(o,f).enumerable})),a.push.apply(a,s)}return a}function A(o){for(var u=1;u<arguments.length;u++){var a=arguments[u]!=null?arguments[u]:{};u%2?m(Object(a),!0).forEach(function(s){(0,t.default)(o,s,a[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(a)):m(Object(a)).forEach(function(s){Object.defineProperty(o,s,Object.getOwnPropertyDescriptor(a,s))})}return o}var E=i.default.forwardRef(function(o,u){var a=o.style,s=o.children,f=(0,c.default)(o,d);return i.default.createElement("div",(0,_.default)({ref:u},f,{id:"scrollContainer",style:A({width:"100%",height:"calc(100vh - 204px)",position:"relative",overflowX:"hidden",overflowY:"auto"},a)}),s)}),p=l.default=E},91847:function(n,l,e){var r=e(54893);function _(t,c){if(t==null)return{};var i,d,m=r(t,c);if(Object.getOwnPropertySymbols){var A=Object.getOwnPropertySymbols(t);for(d=0;d<A.length;d++)i=A[d],c.indexOf(i)===-1&&{}.propertyIsEnumerable.call(t,i)&&(m[i]=t[i])}return m}n.exports=_,n.exports.__esModule=!0,n.exports.default=n.exports},94634:function(n){function l(){return n.exports=l=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var _=arguments[r];for(var t in _)({}).hasOwnProperty.call(_,t)&&(e[t]=_[t])}return e},n.exports.__esModule=!0,n.exports.default=n.exports,l.apply(null,arguments)}n.exports=l,n.exports.__esModule=!0,n.exports.default=n.exports}}]);
