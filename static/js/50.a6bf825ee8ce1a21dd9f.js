"use strict";(self.webpackChunkpromotion_web=self.webpackChunkpromotion_web||[]).push([[50],{5467:function(e,n,t){function o(e){return Object.keys(e).reduce((function(n,t){return!t.startsWith("data-")&&!t.startsWith("aria-")&&"role"!==t||t.startsWith("data-__")||(n[t]=e[t]),n}),{})}t.d(n,{Z:function(){return o}})},6772:function(e,n,t){t.d(n,{Z:function(){return M}});var o=t(7462),c=t(4942),r=t(9439),a=t(7294),s=t(4549),i=t(5873),l=t(7119),u=t(8628),m=t(1627),p=t(8819),d=t(8855),f=t(847),v=t(3061),h=t(3441),Z=t(4184),y=t.n(Z),b=t(5632),E=t(5467),g=t(5671),w=t(3144),x=t(136),N=t(8557),C=function(e){(0,x.Z)(t,e);var n=(0,N.Z)(t);function t(){var e;return(0,g.Z)(this,t),(e=n.apply(this,arguments)).state={error:void 0,info:{componentStack:""}},e}return(0,w.Z)(t,[{key:"componentDidCatch",value:function(e,n){this.setState({error:e,info:n})}},{key:"render",value:function(){var e=this.props,n=e.message,t=e.description,o=e.children,c=this.state,r=c.error,s=c.info,i=s&&s.componentStack?s.componentStack:null,l=void 0===n?(r||"").toString():n,u=void 0===t?i:t;return r?a.createElement(M,{type:"error",message:l,description:a.createElement("pre",null,u)}):o}}]),t}(a.Component),k=t(6159),O=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var c=0;for(o=Object.getOwnPropertySymbols(e);c<o.length;c++)n.indexOf(o[c])<0&&Object.prototype.propertyIsEnumerable.call(e,o[c])&&(t[o[c]]=e[o[c]])}return t},S={success:p.Z,info:f.Z,error:v.Z,warning:d.Z},j={success:i.Z,info:u.Z,error:m.Z,warning:l.Z},I=function(e){var n,t=e.description,i=e.prefixCls,l=e.message,u=e.banner,m=e.className,p=void 0===m?"":m,d=e.style,f=e.onMouseEnter,v=e.onMouseLeave,Z=e.onClick,g=e.afterClose,w=e.showIcon,x=e.closable,N=e.closeText,C=e.closeIcon,I=void 0===C?a.createElement(s.Z,null):C,M=e.action,L=O(e,["description","prefixCls","message","banner","className","style","onMouseEnter","onMouseLeave","onClick","afterClose","showIcon","closable","closeText","closeIcon","action"]),P=a.useState(!1),_=(0,r.Z)(P,2),H=_[0],T=_[1],W=a.useRef(),D=a.useContext(b.E_),A=D.getPrefixCls,B=D.direction,J=A("alert",i),R=function(e){var n;T(!0),null===(n=L.onClose)||void 0===n||n.call(L,e)},U=!!N||x,q=function(){var e=L.type;return void 0!==e?e:u?"warning":"info"}(),z=!(!u||void 0!==w)||w,F=y()(J,"".concat(J,"-").concat(q),(n={},(0,c.Z)(n,"".concat(J,"-with-description"),!!t),(0,c.Z)(n,"".concat(J,"-no-icon"),!z),(0,c.Z)(n,"".concat(J,"-banner"),!!u),(0,c.Z)(n,"".concat(J,"-rtl"),"rtl"===B),n),p),G=(0,E.Z)(L);return a.createElement(h.Z,{visible:!H,motionName:"".concat(J,"-motion"),motionAppear:!1,motionEnter:!1,onLeaveStart:function(e){return{maxHeight:e.offsetHeight}},onLeaveEnd:g},(function(e){var n,r,s=e.className,i=e.style;return a.createElement("div",(0,o.Z)({ref:W,"data-show":!H,className:y()(F,s),style:(0,o.Z)((0,o.Z)({},d),i),onMouseEnter:f,onMouseLeave:v,onClick:Z,role:"alert"},G),z?(n=L.icon,r=(t?j:S)[q]||null,n?(0,k.wm)(n,a.createElement("span",{className:"".concat(J,"-icon")},n),(function(){return{className:y()("".concat(J,"-icon"),(0,c.Z)({},n.props.className,n.props.className))}})):a.createElement(r,{className:"".concat(J,"-icon")})):null,a.createElement("div",{className:"".concat(J,"-content")},l?a.createElement("div",{className:"".concat(J,"-message")},l):null,t?a.createElement("div",{className:"".concat(J,"-description")},t):null),M?a.createElement("div",{className:"".concat(J,"-action")},M):null,U?a.createElement("button",{type:"button",onClick:R,className:"".concat(J,"-close-icon"),tabIndex:0},N?a.createElement("span",{className:"".concat(J,"-close-text")},N):I):null)}))};I.ErrorBoundary=C;var M=I},9485:function(e,n,t){t(5608)},6327:function(e,n,t){t(7294);var o=t(5893);n.Z=function(e){var n=e.children;return(0,o.jsx)("div",{style:{width:"100%",minHeight:"calc(100vh - 252px)"},children:n})}},2050:function(e,n,t){t.r(n);t(9485);var o=t(6772),c=t(9439),r=(t(7294),t(9711)),a=t(6974),s=t(6327),i=t(5893);n.default=function(){var e=(0,r.lr)(),n=(0,c.Z)(e,1)[0].get("id"),t=(0,a.UO)();return(0,i.jsxs)(s.Z,{children:[(0,i.jsx)(o.Z,{message:"Success Tips",description:"Detailed description and advice about successful copywriting.",type:"success",showIcon:!0}),(0,i.jsxs)("div",{children:["useParams: ",JSON.stringify(t,null,2)]}),(0,i.jsxs)("span",{children:["Search Id: ",n]})]})}}}]);
//# sourceMappingURL=50.a6bf825ee8ce1a21dd9f.js.map