"use strict";(self.webpackChunkpromotion_web=self.webpackChunkpromotion_web||[]).push([[822,720],{5467:function(e,n,t){function o(e){return Object.keys(e).reduce((function(n,t){return!t.startsWith("data-")&&!t.startsWith("aria-")&&"role"!==t||t.startsWith("data-__")||(n[t]=e[t]),n}),{})}t.d(n,{Z:function(){return o}})},6772:function(e,n,t){t.d(n,{Z:function(){return _}});var o=t(7462),r=t(4942),c=t(9439),a=t(7294),i=t(4549),s=t(5873),l=t(7119),u=t(8628),f=t(1627),d=t(8819),v=t(8855),m=t(847),p=t(3061),h=t(3441),y=t(4184),Z=t.n(y),g=t(5632),x=t(5467),b=t(5671),E=t(3144),k=t(136),w=t(8557),C=function(e){(0,k.Z)(t,e);var n=(0,w.Z)(t);function t(){var e;return(0,b.Z)(this,t),(e=n.apply(this,arguments)).state={error:void 0,info:{componentStack:""}},e}return(0,E.Z)(t,[{key:"componentDidCatch",value:function(e,n){this.setState({error:e,info:n})}},{key:"render",value:function(){var e=this.props,n=e.message,t=e.description,o=e.children,r=this.state,c=r.error,i=r.info,s=i&&i.componentStack?i.componentStack:null,l=void 0===n?(c||"").toString():n,u=void 0===t?s:t;return c?a.createElement(_,{type:"error",message:l,description:a.createElement("pre",null,u)}):o}}]),t}(a.Component),N=t(6159),j=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)n.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(t[o[r]]=e[o[r]])}return t},S={success:d.Z,info:m.Z,error:p.Z,warning:v.Z},I={success:s.Z,info:u.Z,error:f.Z,warning:l.Z},O=function(e){var n,t=e.description,s=e.prefixCls,l=e.message,u=e.banner,f=e.className,d=void 0===f?"":f,v=e.style,m=e.onMouseEnter,p=e.onMouseLeave,y=e.onClick,b=e.afterClose,E=e.showIcon,k=e.closable,w=e.closeText,C=e.closeIcon,O=void 0===C?a.createElement(i.Z,null):C,_=e.action,P=j(e,["description","prefixCls","message","banner","className","style","onMouseEnter","onMouseLeave","onClick","afterClose","showIcon","closable","closeText","closeIcon","action"]),A=a.useState(!1),M=(0,c.Z)(A,2),T=M[0],L=M[1],K=a.useRef(),H=a.useContext(g.E_),R=H.getPrefixCls,D=H.direction,V=R("alert",s),W=function(e){var n;L(!0),null===(n=P.onClose)||void 0===n||n.call(P,e)},F=!!w||k,B=function(){var e=P.type;return void 0!==e?e:u?"warning":"info"}(),G=!(!u||void 0!==E)||E,q=Z()(V,"".concat(V,"-").concat(B),(n={},(0,r.Z)(n,"".concat(V,"-with-description"),!!t),(0,r.Z)(n,"".concat(V,"-no-icon"),!G),(0,r.Z)(n,"".concat(V,"-banner"),!!u),(0,r.Z)(n,"".concat(V,"-rtl"),"rtl"===D),n),d),z=(0,x.Z)(P);return a.createElement(h.Z,{visible:!T,motionName:"".concat(V,"-motion"),motionAppear:!1,motionEnter:!1,onLeaveStart:function(e){return{maxHeight:e.offsetHeight}},onLeaveEnd:b},(function(e){var n,c,i=e.className,s=e.style;return a.createElement("div",(0,o.Z)({ref:K,"data-show":!T,className:Z()(q,i),style:(0,o.Z)((0,o.Z)({},v),s),onMouseEnter:m,onMouseLeave:p,onClick:y,role:"alert"},z),G?(n=P.icon,c=(t?I:S)[B]||null,n?(0,N.wm)(n,a.createElement("span",{className:"".concat(V,"-icon")},n),(function(){return{className:Z()("".concat(V,"-icon"),(0,r.Z)({},n.props.className,n.props.className))}})):a.createElement(c,{className:"".concat(V,"-icon")})):null,a.createElement("div",{className:"".concat(V,"-content")},l?a.createElement("div",{className:"".concat(V,"-message")},l):null,t?a.createElement("div",{className:"".concat(V,"-description")},t):null),_?a.createElement("div",{className:"".concat(V,"-action")},_):null,F?a.createElement("button",{type:"button",onClick:W,className:"".concat(V,"-close-icon"),tabIndex:0},w?a.createElement("span",{className:"".concat(V,"-close-text")},w):O):null)}))};O.ErrorBoundary=C;var _=O},9485:function(e,n,t){t(5608)},4468:function(e,n,t){t.d(n,{A:function(){return f},n:function(){return d}});var o=t(9439),r=t(7294),c=t(6974),a=t(720),i=t(5893),s={activeKey:"",setActiveKey:function(){},panes:[],setPanes:function(){},removeTab:function(){}},l=[{title:"首页",key:"/",content:(0,i.jsx)(a.default,{}),closable:!1,path:"/"}],u=(0,r.createContext)(s),f=function(){var e=(0,r.useContext)(u);if(void 0===e)throw new Error("useValue must be used within a ValueProvider");return e},d=function(e){var n=e.children,t=(0,r.useState)(""),a=(0,o.Z)(t,2),s=a[0],f=a[1],d=(0,r.useState)(l),v=(0,o.Z)(d,2),m=v[0],p=v[1],h=(0,c.s0)(),y=(0,r.useCallback)((function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},t=m.findIndex((function(n){return n.key===e})),o=m.filter((function(n){return n.key!==e}));if(e!==s)p(o);else{var r=o[t-1].key;h(r),f(r),p(o)}n()}),[s,m,h]),Z=(0,r.useMemo)((function(){return{activeKey:s,setActiveKey:f,panes:m,setPanes:p,removeTab:y}}),[s,f,m,p,y]);return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(u.Provider,{value:Z,children:n})})}},6327:function(e,n,t){t(7294);var o=t(5893);n.Z=function(e){var n=e.children;return(0,o.jsx)("div",{style:{width:"100%",minHeight:"calc(100vh - 252px)"},children:n})}},2822:function(e,n,t){t.r(n);t(9485);var o=t(6772),r=(t(8385),t(404)),c=(t(7294),t(6974)),a=t(6327),i=t(4468),s=t(5893);n.default=function(){var e=(0,i.A)(),n=e.activeKey,t=e.removeTab,l=(0,c.s0)();return(0,s.jsxs)(a.Z,{children:[(0,s.jsx)(r.Z,{type:"link",onClick:function(){t(n,(function(){l("coupons/edit",{replace:!0})}))},children:"关闭当前标签 并打开 Angular标签"}),(0,s.jsx)(o.Z,{message:"Success Tips",description:"Detailed description and advice about successful copywriting.",type:"success",showIcon:!0})]})}},720:function(e,n,t){t.r(n),t.d(n,{default:function(){return f}});var o=t(7294),r=t(6327),c=t(9439),a=t(5893),i=function(e){var n=e.children,t=e.delay,r=void 0===t?110:t,i=(0,o.useState)(0),s=(0,c.Z)(i,2),l=s[0],u=s[1],f=setInterval((function(){return u((function(e){return e+1}))}),r);return(0,o.useEffect)((function(){l===n.length&&clearInterval(f)}),[n,f,l]),(0,o.useEffect)((function(){return function(){return clearInterval(f)}}),[f]),(0,a.jsx)(a.Fragment,{children:n.substring(0,l)})},s=(0,o.memo)(i),l="pages-home-index-module__typedText--od9oV",u="pages-home-index-module__spotLight--ghGu1",f=function(){return(0,a.jsxs)(r.Z,{children:[(0,a.jsx)("h2",{className:l,children:(0,a.jsx)(s,{children:"Cool! Hi, React & Ant Design!"})}),(0,a.jsxs)("h3",{className:u,"data-spotlight":"React version: ".concat(o.version),children:["React version: ",o.version]})]})}}}]);
//# sourceMappingURL=822.53aa7659c81f39f6ff28.js.map