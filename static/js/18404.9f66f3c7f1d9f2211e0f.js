"use strict";(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[18404],{4604:function(O,u,e){"use client";var c=e(24994),s=e(73738);Object.defineProperty(u,"__esModule",{value:!0}),u.default=void 0;var h=c(e(54756)),r=c(e(29293)),t=c(e(85715)),v=i(e(96540)),g=e(55211),b=e(21126),A=c(e(71508)),p=c(e(51889));function l(a){if(typeof WeakMap!="function")return null;var d=new WeakMap,f=new WeakMap;return(l=function(_){return _?f:d})(a)}function i(a,d){if(!d&&a&&a.__esModule)return a;if(a===null||s(a)!="object"&&typeof a!="function")return{default:a};var f=l(d);if(f&&f.has(a))return f.get(a);var m={__proto__:null},_=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var E in a)if(E!=="default"&&{}.hasOwnProperty.call(a,E)){var y=_?Object.getOwnPropertyDescriptor(a,E):null;y&&(y.get||y.set)?Object.defineProperty(m,E,y):m[E]=a[E]}return m.default=a,f&&f.set(a,m),m}var n=function(d){var f=d.showMultiplePackageOptions,m=f===void 0?!0:f,_=d.codeLanguage,E=d.commandMap,y=d.className,N=Object.keys(E),w=(0,v.useState)(N[0]),D=(0,t.default)(w,2),I=D[0],T=D[1],C=(0,v.useState)(!1),x=(0,t.default)(C,2),M=x[0],S=x[1],F=(0,v.useState)(""),R=(0,t.default)(F,2),W=R[0],B=R[1],P=E[I];(0,v.useEffect)(function(){function L(){return U.apply(this,arguments)}function U(){return U=(0,r.default)(h.default.mark(function z(){var K,X,Y;return h.default.wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.prev=0,k.next=3,Promise.all([e.e(55271),e.e(21747),e.e(22763)]).then(e.bind(e,22763));case 3:return K=k.sent,X=K.codeToHtml,k.next=7,X(P,{lang:_,defaultColor:"light",theme:"github-dark",wrap:!1});case 7:Y=k.sent,B(Y),k.next=14;break;case 11:k.prev=11,k.t0=k.catch(0),B("<pre>".concat(P,"</pre>"));case 14:case"end":return k.stop()}},z,null,[[0,11]])})),U.apply(this,arguments)}L()},[P,_]);var j=function(){navigator.clipboard.writeText(P),S(!0),setTimeout(function(){return S(!1)},2e3)};return v.default.createElement("div",{className:(0,A.default)("mx-auto flex max-w-md items-center justify-center",y)},v.default.createElement("div",{className:"w-full space-y-2"},v.default.createElement("div",{className:"mb-2 flex items-center justify-between"},m&&v.default.createElement("div",{className:"relative"},v.default.createElement("div",{className:"border-border inline-flex overflow-hidden rounded-md border text-xs"},N.map(function(L,U){return v.default.createElement("div",{key:L,className:"flex items-center"},U>0&&v.default.createElement("div",{className:"h-4 w-px ".concat(p.default["bg-border"]),"aria-hidden":"true"}),v.default.createElement("span",{className:"bg-background hover:bg-background text-primary relative cursor-pointer rounded-none px-2 py-1",onClick:function(){return T(L)}},L,I===L&&v.default.createElement(b.motion.div,{className:"absolute inset-x-0 bottom-[1px] mx-auto h-0.5 w-[90%] ".concat(p.default["bg-primary"]),layoutId:"activeTab",initial:!1,transition:{type:"spring",stiffness:500,damping:30}})))})))),v.default.createElement("div",{className:"relative flex items-center"},v.default.createElement("div",{className:"min-w-[300px] grow font-mono"},W?v.default.createElement("div",{className:"".concat(p.default.pre," light [&>pre]:overflow-x-auto [&>pre]:rounded-md [&>pre]:p-2 [&>pre]:px-4 [&>pre]:font-mono"),dangerouslySetInnerHTML:{__html:W}}):v.default.createElement("pre",{className:"".concat(p.default.pre," border-border rounded-md border bg-white p-2 px-4 font-mono dark:bg-black")},P)),v.default.createElement("span",{className:"relative ml-2 cursor-pointer rounded-md",onClick:j},v.default.createElement("span",{className:"sr-only"},M?"Copied":"Copy"),v.default.createElement(g.Copy,{className:"h-4 w-4 transition-all duration-300 ".concat(M?"scale-0":"scale-100")}),v.default.createElement(g.Check,{className:"absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ".concat(M?"scale-100":"scale-0")})))))},o=u.default=n},6923:function(O,u,e){var c=e(24994);Object.defineProperty(u,"__esModule",{value:!0}),u.OrbitingCircles=g,u.default=void 0;var s=c(e(94634)),h=c(e(91847)),r=c(e(96540)),t=c(e(71508)),v=["className","children","reverse","duration","radius","path","iconSize","speed"];function g(l){var i=l.className,n=l.children,o=l.reverse,a=l.duration,d=a===void 0?20:a,f=l.radius,m=f===void 0?160:f,_=l.path,E=_===void 0?!0:_,y=l.iconSize,N=y===void 0?30:y,w=l.speed,D=w===void 0?1:w,I=(0,h.default)(l,v),T=d/D;return r.default.createElement(r.default.Fragment,null,E&&r.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",className:"pointer-events-none absolute inset-0 size-full"},r.default.createElement("circle",{className:"stroke-black/10 stroke-1 dark:stroke-white/10",cx:"50%",cy:"50%",r:m,fill:"none"})),r.default.Children.map(n,function(C,x){var M=360/r.default.Children.count(n)*x;return r.default.createElement("div",(0,s.default)({style:{"--duration":T,"--radius":m,"--angle":M,"--icon-size":"".concat(N,"px")},className:(0,t.default)("animate-my-orbit absolute flex size-[var(--icon-size)] transform-gpu items-center justify-center rounded-full",{"[animation-direction:reverse]":o},i)},I),C)}))}var b=function(){return r.default.createElement("div",{className:"relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden"},r.default.createElement(g,{iconSize:40},r.default.createElement(A.whatsapp,null),r.default.createElement(A.notion,null),r.default.createElement(A.openai,null),r.default.createElement(A.googleDrive,null),r.default.createElement(A.whatsapp,null)),r.default.createElement(g,{iconSize:30,radius:100,reverse:!0,speed:2},r.default.createElement(A.whatsapp,null),r.default.createElement(A.notion,null),r.default.createElement(A.openai,null),r.default.createElement(A.googleDrive,null)))},A={gitHub:function(){return r.default.createElement("svg",{width:"100",height:"100",viewBox:"0 0 438.549 438.549"},r.default.createElement("path",{fill:"currentColor",d:"M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"}))},notion:function(){return r.default.createElement("svg",{width:"100",height:"100",viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{d:"M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z",fill:"#ffffff"}),r.default.createElement("path",{d:"M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z",fill:"#000000",fillRule:"evenodd",clipRule:"evenodd"}))},openai:function(){return r.default.createElement("svg",{width:"100",height:"100",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",className:"fill-black dark:fill-white"},r.default.createElement("path",{d:"M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"}))},googleDrive:function(){return r.default.createElement("svg",{width:"100",height:"100",viewBox:"0 0 87.3 78",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{d:"m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z",fill:"#0066da"}),r.default.createElement("path",{d:"m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z",fill:"#00ac47"}),r.default.createElement("path",{d:"m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z",fill:"#ea4335"}),r.default.createElement("path",{d:"m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z",fill:"#00832d"}),r.default.createElement("path",{d:"m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z",fill:"#2684fc"}),r.default.createElement("path",{d:"m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z",fill:"#ffba00"}))},whatsapp:function(){return r.default.createElement("svg",{width:"100",height:"100",viewBox:"0 0 175.216 175.552",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("defs",null,r.default.createElement("linearGradient",{id:"b",x1:"85.915",x2:"86.535",y1:"32.567",y2:"137.092",gradientUnits:"userSpaceOnUse"},r.default.createElement("stop",{offset:"0",stopColor:"#57d163"}),r.default.createElement("stop",{offset:"1",stopColor:"#23b33a"})),r.default.createElement("filter",{id:"a",width:"1.115",height:"1.114",x:"-.057",y:"-.057",colorInterpolationFilters:"sRGB"},r.default.createElement("feGaussianBlur",{stdDeviation:"3.531"}))),r.default.createElement("path",{d:"m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0",fill:"#b3b3b3",filter:"url(#a)"}),r.default.createElement("path",{d:"m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z",fill:"#ffffff"}),r.default.createElement("path",{d:"M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z",fill:"url(#linearGradient1780)"}),r.default.createElement("path",{d:"M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z",fill:"url(#b)"}),r.default.createElement("path",{d:"M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647",fill:"#ffffff",fillRule:"evenodd"}))}},p=u.default=b},17329:function(O,u,e){O.exports=e.p+"images/9ce539741014a14d8c0c.png"},18404:function(O,u,e){var c=e(24994),s=e(73738);Object.defineProperty(u,"__esModule",{value:!0}),u.default=void 0;var h=c(e(41132)),r=c(e(85715)),t=T(e(96540)),v=e(33742),g=c(e(59378)),b=c(e(81988)),A=c(e(62540)),p=T(e(71635)),l=c(e(51502)),i=c(e(59367)),n=c(e(61714)),o=c(e(6923)),a=c(e(22549)),d=c(e(29492)),f=c(e(26718)),m=c(e(48632)),_=c(e(17329)),E=e(55211),y=c(e(4604)),N=c(e(91193)),w=e(57101),D=c(e(60295));function I(B){if(typeof WeakMap!="function")return null;var P=new WeakMap,j=new WeakMap;return(I=function(U){return U?j:P})(B)}function T(B,P){if(!P&&B&&B.__esModule)return B;if(B===null||s(B)!="object"&&typeof B!="function")return{default:B};var j=I(P);if(j&&j.has(B))return j.get(B);var L={__proto__:null},U=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var z in B)if(z!=="default"&&{}.hasOwnProperty.call(B,z)){var K=U?Object.getOwnPropertyDescriptor(B,z):null;K&&(K.get||K.set)?Object.defineProperty(L,z,K):L[z]=B[z]}return L.default=B,j&&j.set(B,L),L}var C=[d.default,f.default,m.default,_.default],x=[{title:"Name",align:"center",dataIndex:"name",width:150},{title:"Age",align:"center",dataIndex:"age",width:150},{title:"Address",align:"center",dataIndex:"address"}],M=[{title:"Product",value:"product",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Product Tab"))},{title:"Services",value:"services",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Services tab"))},{title:"Playground",value:"playground",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Playground tab"))},{title:"Content",value:"content",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Content tab"))},{title:"Random",value:"random",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Random tab"))}],S={npm:"npm run shadcn add button",yarn:"yarn shadcn add button",pnpm:"pnpm dlx shadcn@latest add button",bun:"bun x shadcn@latest add button"},F=function(P,j){var L=new Date(P),U=new Date(j),z=Math.abs(U-L),K=Math.ceil(z/(1e3*60*60*24));return K},R=function(){var P=(0,t.useState)([{id:"1",content:t.default.createElement(w.DraggableItem,null,"First Item")},{id:"2",content:t.default.createElement(w.DraggableItem,null,"Second Item")},{id:"3",content:t.default.createElement(w.DraggableItem,null,"Third Item")}]),j=(0,r.default)(P,2),L=j[0],U=j[1],z=function(X){U(X)};return t.default.createElement(g.default,null,t.default.createElement(n.default,null),t.default.createElement(a.default,{cards:(0,h.default)(Array.from({length:4},function(){return{id:Math.random()}}))}),t.default.createElement("div",{className:"relative w-full overflow-hidden bg-[#0a192f]"},t.default.createElement("div",{className:"absolute top-0 right-0 h-full w-1/2"},t.default.createElement("div",{className:"absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20",style:{clipPath:"polygon(100% 0, 100% 100%, 0 100%, 100% 0)"}})),t.default.createElement("div",{className:"absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-white/20"}),t.default.createElement("div",{className:"absolute right-0 bottom-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full border-8 border-white/20"}),t.default.createElement("div",{className:"relative mx-auto max-w-7xl px-4 py-16"},t.default.createElement("div",{className:"mb-16 text-center"},t.default.createElement("h1",{className:"mb-6 text-4xl font-bold text-white md:text-5xl"},"Influencer And Affiliate Marketing Plans and Pricing"),t.default.createElement("p",{className:"mx-auto max-w-3xl text-lg text-gray-300"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, in? Nemo, quas esse a id at quae sunt! Temporibus, consectetur optio. Beatae, culpa nam quas eaque ipsa blanditiis adipisci rem."))),t.default.createElement("div",{className:"relative mt-8 flex h-16 justify-center gap-8"},t.default.createElement(p.default,{initialX:-150},t.default.createElement(p.SocialIcon,{icon:E.Command,color:"bg-blue-500"})),t.default.createElement(p.default,{initialX:-50},t.default.createElement(p.SocialIcon,{icon:E.Cannabis,color:"bg-blue-400"})),t.default.createElement(p.default,{initialX:50},t.default.createElement(p.SocialIcon,{icon:E.Beer,color:"bg-pink-500"})),t.default.createElement(p.default,{initialX:150},t.default.createElement(p.SocialIcon,{icon:E.Mail,color:"bg-red-500"})))),t.default.createElement(A.default,{companies:C}),t.default.createElement("section",{className:"flex flex-row items-center justify-center gap-5"},t.default.createElement(l.default,{width:300,height:100,path:"M0,50 Q150,0 300,50"}),t.default.createElement(l.default,{width:200,height:200,path:"M100,0 L75,75 L125,75 L50,200 L100,100 L50,100 L100,0",gradientColors:["#F1C40F","#F1C40F","#E67E22"]}),t.default.createElement(l.default,{width:200,height:200,path:"M100,100 m0,-75 a75,75 0 1,1 -0.1,0 z",gradientColors:["#7B68EE","#7B68EE","#3498DB"]}),t.default.createElement(l.default,{width:300,height:100,path:"M0,50 L75,25 L150,75 L225,25 L300,50"})),t.default.createElement("section",{className:"flex flex-row items-center justify-center gap-5"},t.default.createElement(l.default,{width:200,height:50,path:"M 20,25 L 180,25",gradientColors:["#FF5733","#FF5733","#C70039"]}),t.default.createElement(l.default,{width:250,height:200,path:"M 50,20 L 50,60 L 80,80 L 200,60",gradientColors:["#FFA07A","#FFA07A","#FF6347"]}),t.default.createElement(l.default,{width:200,height:200,path:"M 20,20 L 180,180",gradientColors:["#5733FF","#5733FF","#C700C7"]})),t.default.createElement("section",{className:"flex flex-row items-center justify-center gap-5"},t.default.createElement(l.default,{width:200,height:200,path:"M 50,20 L 100,20 L 60, 25 L 180, 25",gradientColors:["#FF69B4","#FF69B4","#8A2BE2"]}),t.default.createElement(l.default,{width:200,height:200,path:"M 50,20 L 100,20 L 100,30 L 150, 30",gradientColors:["#FF1493","#FF1493","#9400D3"]}),t.default.createElement(l.default,{width:200,height:200,path:"M 20,30 L 40,30 L 40,10 L 180, 10",gradientColors:["#FFA500","#FFA500","#FF4500"]}),t.default.createElement(l.default,{width:200,height:200,path:"M 10 10 L 90 10 Q 100 50 90 90 C 50 100 10 50 10 10 Z",gradientColors:["#FFA500","#FFA500","#FF4500"]})),t.default.createElement("div",{className:"b relative mx-auto flex h-[20rem] w-full max-w-5xl flex-col items-start justify-start [perspective:1000px]"},t.default.createElement(b.default,{tabs:M})),t.default.createElement(v.Table,{columns:x,dataSource:[],pagination:{pageSize:50},scroll:{y:240}}),t.default.createElement("section",{className:"m-10 flex items-center justify-center gap-5"},t.default.createElement("div",{className:"mb-5 inline-block rounded-xl bg-gradient-to-tl from-blue-600 via-transparent to-purple-400 p-px"},t.default.createElement("div",{className:"min-w-20 rounded-xl bg-white px-3 py-1.5 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:bg-neutral-900"},t.default.createElement("span",{className:"bg-gradient-to-tl from-blue-600 to-purple-400 bg-clip-text text-transparent"},"200+"))),t.default.createElement("div",{className:"mb-5 inline-block rounded-xl bg-gradient-to-tl from-blue-600 via-transparent to-purple-400 p-px"},t.default.createElement("div",{className:"min-w-20 rounded-xl bg-white px-3 py-1.5 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:bg-neutral-900"},t.default.createElement("span",{className:"bg-gradient-to-tl from-blue-600 to-purple-400 bg-clip-text text-transparent"},"400+"))),t.default.createElement("div",{className:"mb-5 inline-block rounded-xl bg-gradient-to-tl from-blue-600 via-transparent to-purple-400 p-px"},t.default.createElement("div",{className:"min-w-20 rounded-xl bg-white px-3 py-1.5 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:bg-neutral-900"},t.default.createElement("span",{className:"bg-gradient-to-tl from-blue-600 to-purple-400 bg-clip-text text-transparent"},"1200+"))),t.default.createElement("div",{className:"mb-5 inline-block rounded-xl bg-gradient-to-tl from-blue-600 via-transparent to-purple-400 p-px"},t.default.createElement("div",{className:"min-w-20 rounded-xl bg-white px-3 py-1.5 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:bg-neutral-900"},t.default.createElement("span",{className:"bg-gradient-to-tl from-blue-600 to-purple-400 bg-clip-text text-transparent"},"2000+")))),t.default.createElement("section",{className:D.default["section-gradient"]},t.default.createElement("div",{className:D.default.wave}),t.default.createElement("div",{className:D.default.wave}),t.default.createElement("div",{className:D.default.wave})),t.default.createElement(i.default,null))},W=u.default=R},21634:function(O,u,e){var c=e(71354),s=e.n(c),h=e(76314),r=e.n(h),t=r()(s());t.push([O.id,`@font: 'Karla', sans-serif;\r
\r
@primary-color: #3e6f9e;\r
\r
body {\r
  font-family: @font;\r
  color: @primary-color;\r
  font-size: 14px;\r
}\r
\r
.flex--_gwXM {\r
  display: flex;\r
  align-items: center;\r
\r
  .flexItem--U6z9X {\r
    flex: 1 1;\r
    color: #3e6f9e;\r
  }\r
}\r
\r
.button--RU103 {\r
  background: transparent;\r
  color: #33333360;\r
  text-transform: uppercase;\r
  border: 4px solid #33333360;\r
  border-radius: 1000px;\r
  font-size: 18px;\r
  font-weight: 700;\r
  letter-spacing: 5px;\r
  padding: 10px 20px;\r
  position: relative;\r
  transition:\r
    border-color 0.5s,\r
    color 0.5s;\r
  cursor: pointer;\r
  z-index: 1;\r
  overflow: hidden;\r
}\r
\r
.button--RU103:hover {\r
  border-color: #33333380;\r
  color: #33333380;\r
}\r
\r
.button--RU103::before,\r
.button--RU103::after {\r
  content: '';\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  background: #00000060;\r
  transition: transform 0.5s;\r
  transform: rotate(-90deg);\r
  transform-origin: bottom left;\r
  z-index: -1;\r
}\r
\r
.button--RU103::after {\r
  transform-origin: top right;\r
}\r
\r
.button--RU103:hover::before,\r
.button--RU103:hover::after {\r
  transform: rotate(0deg);\r
}\r
\r
.section-gradient--xN4VI {\r
  background: linear-gradient(\r
    315deg,\r
    rgb(252 208 158) 3%,\r
    rgb(144 200 255) 38%,\r
    rgb(104 245 250) 68%,\r
    rgb(45 151 250) 98%\r
  );\r
  animation: gradient--zruvo 25s ease infinite;\r
  background-size: 400% 400%;\r
  position: relative;\r
  overflow: hidden;\r
  height: 300px;\r
}\r
\r
@keyframes gradient--zruvo {\r
  0% {\r
    background-position: 0% 0%;\r
  }\r
\r
  50% {\r
    background-position: 100% 100%;\r
  }\r
\r
  100% {\r
    background-position: 0% 0%;\r
  }\r
}\r
\r
.wave--QYXbB {\r
  background: rgb(255 255 255 / 25%);\r
  border-radius: 1000% 1000% 0 0;\r
  position: absolute;\r
  bottom: 0;\r
  left: 0;\r
  width: 200%;\r
  height: 200px;\r
  animation: wave--QYXbB 10s -3s linear infinite;\r
  transform: translate3d(0, 0, 0);\r
  opacity: 0.8;\r
  z-index: 1;\r
}\r
\r
.wave--QYXbB:nth-of-type(2) {\r
  bottom: -30px;\r
  animation: wave--QYXbB 8s linear reverse infinite;\r
  opacity: 0.8;\r
}\r
\r
.wave--QYXbB:nth-of-type(3) {\r
  bottom: -60px;\r
  animation: wave--QYXbB 10s -1s reverse infinite;\r
  opacity: 0.9;\r
}\r
\r
@keyframes wave--QYXbB {\r
  2% {\r
    transform: translateX(1);\r
  }\r
\r
  25% {\r
    transform: translateX(-25%);\r
  }\r
\r
  50% {\r
    transform: translateX(-50%);\r
  }\r
\r
  75% {\r
    transform: translateX(-25%);\r
  }\r
\r
  100% {\r
    transform: translateX(1);\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/pages/demo/index.module.less"],names:[],mappings:"AAAA,0BAA0B;;AAE1B,uBAAuB;;AAEvB;EACE,kBAAkB;EAClB,qBAAqB;EACrB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;;EAEnB;IACE,SAAO;IACP,cAAc;EAChB;AACF;;AAEA;EACE,uBAAuB;EACvB,gBAAgB;EAChB,yBAAyB;EACzB,2BAA2B;EAC3B,qBAAqB;EACrB,eAAe;EACf,gBAAgB;EAChB,mBAAmB;EACnB,kBAAkB;EAClB,kBAAkB;EAClB;;cAEY;EACZ,eAAe;EACf,UAAU;EACV,gBAAgB;AAClB;;AAEA;EACE,uBAAuB;EACvB,gBAAgB;AAClB;;AAEA;;EAEE,WAAW;EACX,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,qBAAqB;EACrB,0BAA0B;EAC1B,yBAAyB;EACzB,6BAA6B;EAC7B,WAAW;AACb;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;;EAEE,uBAAuB;AACzB;;AAEA;EACE;;;;;;GAMC;EACD,4CAAqC;EACrC,0BAA0B;EAC1B,kBAAkB;EAClB,gBAAgB;EAChB,aAAa;AACf;;AAEA;EACE;IACE,0BAA0B;EAC5B;;EAEA;IACE,8BAA8B;EAChC;;EAEA;IACE,0BAA0B;EAC5B;AACF;;AAEA;EACE,kCAAkC;EAClC,8BAA8B;EAC9B,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,WAAW;EACX,aAAa;EACb,8CAAuC;EACvC,+BAA+B;EAC/B,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,iDAA0C;EAC1C,YAAY;AACd;;AAEA;EACE,aAAa;EACb,+CAAwC;EACxC,YAAY;AACd;;AAEA;EACE;IACE,wBAAwB;EAC1B;;EAEA;IACE,2BAA2B;EAC7B;;EAEA;IACE,2BAA2B;EAC7B;;EAEA;IACE,2BAA2B;EAC7B;;EAEA;IACE,wBAAwB;EAC1B;AACF",sourcesContent:[`@font: 'Karla', sans-serif;\r
\r
@primary-color: #3e6f9e;\r
\r
body {\r
  font-family: @font;\r
  color: @primary-color;\r
  font-size: 14px;\r
}\r
\r
.flex {\r
  display: flex;\r
  align-items: center;\r
\r
  .flexItem {\r
    flex: 1;\r
    color: #3e6f9e;\r
  }\r
}\r
\r
.button {\r
  background: transparent;\r
  color: #33333360;\r
  text-transform: uppercase;\r
  border: 4px solid #33333360;\r
  border-radius: 1000px;\r
  font-size: 18px;\r
  font-weight: 700;\r
  letter-spacing: 5px;\r
  padding: 10px 20px;\r
  position: relative;\r
  transition:\r
    border-color 0.5s,\r
    color 0.5s;\r
  cursor: pointer;\r
  z-index: 1;\r
  overflow: hidden;\r
}\r
\r
.button:hover {\r
  border-color: #33333380;\r
  color: #33333380;\r
}\r
\r
.button::before,\r
.button::after {\r
  content: '';\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  background: #00000060;\r
  transition: transform 0.5s;\r
  transform: rotate(-90deg);\r
  transform-origin: bottom left;\r
  z-index: -1;\r
}\r
\r
.button::after {\r
  transform-origin: top right;\r
}\r
\r
.button:hover::before,\r
.button:hover::after {\r
  transform: rotate(0deg);\r
}\r
\r
.section-gradient {\r
  background: linear-gradient(\r
    315deg,\r
    rgb(252 208 158) 3%,\r
    rgb(144 200 255) 38%,\r
    rgb(104 245 250) 68%,\r
    rgb(45 151 250) 98%\r
  );\r
  animation: gradient 25s ease infinite;\r
  background-size: 400% 400%;\r
  position: relative;\r
  overflow: hidden;\r
  height: 300px;\r
}\r
\r
@keyframes gradient {\r
  0% {\r
    background-position: 0% 0%;\r
  }\r
\r
  50% {\r
    background-position: 100% 100%;\r
  }\r
\r
  100% {\r
    background-position: 0% 0%;\r
  }\r
}\r
\r
.wave {\r
  background: rgb(255 255 255 / 25%);\r
  border-radius: 1000% 1000% 0 0;\r
  position: absolute;\r
  bottom: 0;\r
  left: 0;\r
  width: 200%;\r
  height: 200px;\r
  animation: wave 10s -3s linear infinite;\r
  transform: translate3d(0, 0, 0);\r
  opacity: 0.8;\r
  z-index: 1;\r
}\r
\r
.wave:nth-of-type(2) {\r
  bottom: -30px;\r
  animation: wave 8s linear reverse infinite;\r
  opacity: 0.8;\r
}\r
\r
.wave:nth-of-type(3) {\r
  bottom: -60px;\r
  animation: wave 10s -1s reverse infinite;\r
  opacity: 0.9;\r
}\r
\r
@keyframes wave {\r
  2% {\r
    transform: translateX(1);\r
  }\r
\r
  25% {\r
    transform: translateX(-25%);\r
  }\r
\r
  50% {\r
    transform: translateX(-50%);\r
  }\r
\r
  75% {\r
    transform: translateX(-25%);\r
  }\r
\r
  100% {\r
    transform: translateX(1);\r
  }\r
}\r
`],sourceRoot:""}]),t.locals={flex:"flex--_gwXM",flexItem:"flexItem--U6z9X",button:"button--RU103","section-gradient":"section-gradient--xN4VI",sectionGradient:"section-gradient--xN4VI",gradient:"gradient--zruvo",wave:"wave--QYXbB"},u.A=t},22549:function(O,u,e){var c=e(24994),s=e(73738);Object.defineProperty(u,"__esModule",{value:!0}),u.default=void 0;var h=v(e(96540)),r=c(e(71508));function t(A){if(typeof WeakMap!="function")return null;var p=new WeakMap,l=new WeakMap;return(t=function(n){return n?l:p})(A)}function v(A,p){if(!p&&A&&A.__esModule)return A;if(A===null||s(A)!="object"&&typeof A!="function")return{default:A};var l=t(p);if(l&&l.has(A))return l.get(A);var i={__proto__:null},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in A)if(o!=="default"&&{}.hasOwnProperty.call(A,o)){var a=n?Object.getOwnPropertyDescriptor(A,o):null;a&&(a.get||a.set)?Object.defineProperty(i,o,a):i[o]=A[o]}return i.default=A,l&&l.set(A,i),i}var g=function(p){var l=p.cards,i=p.children;return h.default.createElement(h.default.Fragment,null,h.default.createElement("section",{className:"flex flex-col gap-4 pt-30 pb-20"},l.map(function(n,o){var a=o%2===0?"animate-slide-in-left":"animate-slide-in-right";return h.default.createElement("div",{key:n==null?void 0:n.id,style:{top:"calc(50px + ".concat((o+1)*30,"px)")},className:(0,r.default)("sticky z-0 m-auto flex w-[50vw] justify-center overflow-hidden rounded-2xl bg-[#0a192f] px-8 pt-4 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-2xl after:outline after:-outline-offset-2 after:outline-white/20",a)},h.default.createElement("div",{className:"animate-wiggle sticky top-9 h-[30vh]"},h.default.createElement("p",{className:"animate-hue-rotate hue-clip text-gradient text-2xl"},"Card Item")))})))},b=u.default=g},26718:function(O,u,e){O.exports=e.p+"images/916ddb5adf113a8dd7a3.png"},29492:function(O,u,e){O.exports=e.p+"images/f5fb3175e80af3f631cc.png"},31583:function(O,u,e){e.r(u);var c=e(85072),s=e.n(c),h=e(97825),r=e.n(h),t=e(77659),v=e.n(t),g=e(55056),b=e.n(g),A=e(10540),p=e.n(A),l=e(41113),i=e.n(l),n=e(46456),o={};o.styleTagTransform=i(),o.setAttributes=b(),o.insert=v().bind(null,"head"),o.domAPI=r(),o.insertStyleElement=p();var a=s()(n.A,o);u.default=n.A&&n.A.locals?n.A.locals:void 0},46456:function(O,u,e){var c=e(71354),s=e.n(c),h=e(76314),r=e.n(h),t=r()(s());t.push([O.id,`.stars--xQGmL {\r
  --box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
\r
  width: 1px;\r
  height: 1px;\r
  border-radius: 100%;\r
  background: transparent;\r
  box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
  box-shadow: var(--box-shadow);\r
  animation: anim-star--rqp4H 50s linear infinite;\r
\r
  &::after {\r
    content: ' ';\r
    position: absolute;\r
    top: 2000px;\r
    width: 1px;\r
    height: 1px;\r
    border-radius: 100%;\r
    box-shadow: var(--box-shadow);\r
    background: transparent;\r
  }\r
}\r
\r
.medium--djEFj {\r
  --box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
\r
  width: 2px;\r
  height: 2px;\r
  border-radius: 100%;\r
  background: transparent;\r
  box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
  box-shadow: var(--box-shadow);\r
  animation: anim-star--rqp4H 150s linear infinite;\r
\r
  &::after {\r
    content: ' ';\r
    position: absolute;\r
    top: 2000px;\r
    width: 2px;\r
    height: 2px;\r
    border-radius: 100%;\r
    box-shadow: var(--box-shadow);\r
    background: transparent;\r
  }\r
}\r
\r
.big--sf21I {\r
  --box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
\r
  width: 3px;\r
  height: 3px;\r
  border-radius: 100%;\r
  background: transparent;\r
  box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
  box-shadow: var(--box-shadow);\r
  animation: anim-star--rqp4H 30s linear infinite;\r
\r
  &::after {\r
    content: '*';\r
    position: absolute;\r
    top: 2000px;\r
    width: 3px;\r
    height: 3px;\r
    border-radius: 100%;\r
    box-shadow: var(--box-shadow);\r
    background: transparent;\r
  }\r
}\r
\r
@keyframes anim-star--rqp4H {\r
  from {\r
    transform: translateY(-2000px);\r
  }\r
\r
  to {\r
    transform: translateY(0);\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/StarBackground/index.module.less"],names:[],mappings:"AAAA;EACE,iDAAiD;;EAEjD,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,uBAAuB;EACvB,+CAA6B;EAA7B,6BAA6B;EAC7B,+CAAwC;;EAExC;IACE,YAAY;IACZ,kBAAkB;IAClB,WAAW;IACX,UAAU;IACV,WAAW;IACX,mBAAmB;IACnB,6BAA6B;IAC7B,uBAAuB;EACzB;AACF;;AAEA;EACE,iDAAiD;;EAEjD,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,uBAAuB;EACvB,+CAA6B;EAA7B,6BAA6B;EAC7B,gDAAyC;;EAEzC;IACE,YAAY;IACZ,kBAAkB;IAClB,WAAW;IACX,UAAU;IACV,WAAW;IACX,mBAAmB;IACnB,6BAA6B;IAC7B,uBAAuB;EACzB;AACF;;AAEA;EACE,iDAAiD;;EAEjD,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,uBAAuB;EACvB,+CAA6B;EAA7B,6BAA6B;EAC7B,+CAAwC;;EAExC;IACE,YAAY;IACZ,kBAAkB;IAClB,WAAW;IACX,UAAU;IACV,WAAW;IACX,mBAAmB;IACnB,6BAA6B;IAC7B,uBAAuB;EACzB;AACF;;AAEA;EACE;IACE,8BAA8B;EAChC;;EAEA;IACE,wBAAwB;EAC1B;AACF",sourcesContent:[`.stars {\r
  --box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
\r
  width: 1px;\r
  height: 1px;\r
  border-radius: 100%;\r
  background: transparent;\r
  box-shadow: var(--box-shadow);\r
  animation: anim-star 50s linear infinite;\r
\r
  &::after {\r
    content: ' ';\r
    position: absolute;\r
    top: 2000px;\r
    width: 1px;\r
    height: 1px;\r
    border-radius: 100%;\r
    box-shadow: var(--box-shadow);\r
    background: transparent;\r
  }\r
}\r
\r
.medium {\r
  --box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
\r
  width: 2px;\r
  height: 2px;\r
  border-radius: 100%;\r
  background: transparent;\r
  box-shadow: var(--box-shadow);\r
  animation: anim-star 150s linear infinite;\r
\r
  &::after {\r
    content: ' ';\r
    position: absolute;\r
    top: 2000px;\r
    width: 2px;\r
    height: 2px;\r
    border-radius: 100%;\r
    box-shadow: var(--box-shadow);\r
    background: transparent;\r
  }\r
}\r
\r
.big {\r
  --box-shadow: 0 0 10px 1px rgb(255 255 255 / 50%);\r
\r
  width: 3px;\r
  height: 3px;\r
  border-radius: 100%;\r
  background: transparent;\r
  box-shadow: var(--box-shadow);\r
  animation: anim-star 30s linear infinite;\r
\r
  &::after {\r
    content: '*';\r
    position: absolute;\r
    top: 2000px;\r
    width: 3px;\r
    height: 3px;\r
    border-radius: 100%;\r
    box-shadow: var(--box-shadow);\r
    background: transparent;\r
  }\r
}\r
\r
@keyframes anim-star {\r
  from {\r
    transform: translateY(-2000px);\r
  }\r
\r
  to {\r
    transform: translateY(0);\r
  }\r
}\r
`],sourceRoot:""}]),t.locals={stars:"stars--xQGmL","anim-star":"anim-star--rqp4H",animStar:"anim-star--rqp4H",medium:"medium--djEFj",big:"big--sf21I"},u.A=t},48632:function(O,u,e){O.exports=e.p+"images/695c6a7e4d55286b3565.png"},51502:function(O,u,e){var c=e(24994);Object.defineProperty(u,"__esModule",{value:!0}),u.default=void 0;var s=c(e(96540)),h=e(23947),r=function(g){var b=g.width,A=g.height,p=g.baseColor,l=p===void 0?"black":p,i=g.gradientColors,n=i===void 0?["#2EB9DF","#2EB9DF","#9E00FF"]:i,o=g.animationDuration,a=o===void 0?2:o,d=g.strokeWidth,f=d===void 0?2:d,m=g.path,_="pulse-".concat(Math.random().toString(36).substring(2,9));return s.default.createElement("div",{className:"relative",style:{width:b,height:A}},s.default.createElement("svg",{width:b,height:A,viewBox:"0 0 ".concat(b," ").concat(A),fill:"none"},s.default.createElement("path",{d:m,stroke:l,strokeOpacity:"0.2"}),s.default.createElement("path",{d:m,stroke:"url(#".concat(_,")"),strokeLinecap:"round",strokeWidth:f}),s.default.createElement("defs",null,s.default.createElement(h.motion.linearGradient,{animate:{x1:[0,b*2],x2:[0,b]},transition:{duration:a,repeat:1/0,ease:"linear"},id:_,gradientUnits:"userSpaceOnUse"},s.default.createElement("stop",{stopColor:n[0],stopOpacity:"0"}),s.default.createElement("stop",{stopColor:n[1]}),s.default.createElement("stop",{offset:"1",stopColor:n[2],stopOpacity:"0"})))))},t=u.default=r},51889:function(O,u,e){e.r(u);var c=e(85072),s=e.n(c),h=e(97825),r=e.n(h),t=e(77659),v=e.n(t),g=e(55056),b=e.n(g),A=e(10540),p=e.n(A),l=e(41113),i=e.n(l),n=e(57130),o={};o.styleTagTransform=i(),o.setAttributes=b(),o.insert=v().bind(null,"head"),o.domAPI=r(),o.insertStyleElement=p();var a=s()(n.A,o);u.default=n.A&&n.A.locals?n.A.locals:void 0},57101:function(O,u,e){"use client";var c=e(24994),s=e(73738);Object.defineProperty(u,"__esModule",{value:!0}),u.DraggableList=u.DraggableItem=void 0;var h=c(e(41132)),r=c(e(85715)),t=A(e(96540)),v=e(21126),g=c(e(71508));function b(i){if(typeof WeakMap!="function")return null;var n=new WeakMap,o=new WeakMap;return(b=function(d){return d?o:n})(i)}function A(i,n){if(!n&&i&&i.__esModule)return i;if(i===null||s(i)!="object"&&typeof i!="function")return{default:i};var o=b(n);if(o&&o.has(i))return o.get(i);var a={__proto__:null},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var f in i)if(f!=="default"&&{}.hasOwnProperty.call(i,f)){var m=d?Object.getOwnPropertyDescriptor(i,f):null;m&&(m.get||m.set)?Object.defineProperty(a,f,m):a[f]=i[f]}return a.default=i,o&&o.set(i,a),a}var p=u.DraggableList=function(n){var o=n.items,a=n.onChange,d=n.className,f=(0,t.useState)(o),m=(0,r.default)(f,2),_=m[0],E=m[1],y=(0,t.useState)(null),N=(0,r.default)(y,2),w=N[0],D=N[1],I=(0,t.useState)(null),T=(0,r.default)(I,2),C=T[0],x=T[1],M=function(W){D(W)},S=function(W,B){W.preventDefault(),x(B)},F=function(){if(!w||!C){D(null),x(null);return}var W=(0,h.default)(_),B=_.findIndex(function(j){return j.id===w.id}),P=_.findIndex(function(j){return j.id===C});W.splice(B,1),W.splice(P,0,w),E(W),a==null||a(W),D(null),x(null)};return t.default.createElement("div",{className:(0,g.default)("space-y-2",d)},t.default.createElement(v.AnimatePresence,null,_.map(function(R){return t.default.createElement(v.motion.div,{key:R.id,layout:!0,initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.2},draggable:!0,onDragStart:function(){return M(R)},onDragOver:function(B){return S(B,R.id)},onDragEnd:F,className:(0,g.default)("bg-secondary/50 border-primary/10 cursor-grab rounded-lg border p-4 shadow-sm transition-colors",C===R.id&&"border-orange bg-secondary/40 border-2",(w==null?void 0:w.id)===R.id&&"border-2 border-gray-400 opacity-50")},R.content)})))},l=u.DraggableItem=function(n){var o=n.children,a=n.className;return t.default.createElement("div",{className:(0,g.default)("flex items-center gap-2",a)},t.default.createElement("div",{className:"text-gray-400"},"\u2261"),o)}},57130:function(O,u,e){var c=e(71354),s=e.n(c),h=e(76314),r=e.n(h),t=r()(s());t.push([O.id,`.pre--Dih6h pre {\r
  margin-bottom: 0;\r
}\r
\r
.bg-primary--JrjKB {\r
  background-color: #333;\r
}\r
\r
.bg-border--bETNR {\r
  background-color: #eee;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/ScriptView/index.module.less"],names:[],mappings:"AAAA;EACE,gBAAgB;AAClB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB",sourcesContent:[`.pre pre {\r
  margin-bottom: 0;\r
}\r
\r
.bg-primary {\r
  background-color: #333;\r
}\r
\r
.bg-border {\r
  background-color: #eee;\r
}\r
`],sourceRoot:""}]),t.locals={pre:"pre--Dih6h","bg-primary":"bg-primary--JrjKB",bgPrimary:"bg-primary--JrjKB","bg-border":"bg-border--bETNR",bgBorder:"bg-border--bETNR"},u.A=t},59367:function(O,u,e){var c=e(24994);Object.defineProperty(u,"__esModule",{value:!0}),u.default=void 0;var s=c(e(96540)),h=e(21126),r=e(55211),t=c(e(48632)),v=function(){return s.default.createElement("footer",{className:"bg-[#0a192f] py-16 text-white"},s.default.createElement("div",{className:"container mx-auto px-4"},s.default.createElement("div",{className:"grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4"},s.default.createElement("div",{className:"space-y-6"},s.default.createElement(h.motion.h2,{className:"bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5}},s.default.createElement("img",{src:t.default,width:"40",height:"40",alt:"Logo"})),s.default.createElement("p",{className:""},"Shaping the future of web development"),s.default.createElement("div",{className:"relative"},s.default.createElement("input",{type:"email",placeholder:"Your email",className:"w-full rounded-full border-2 px-4 py-2 transition-all duration-300 outline-none"}),s.default.createElement("button",{className:"absolute top-2 right-1 rounded-full p-1 transition-colors duration-300"},s.default.createElement(r.ArrowUpRight,{className:"size-4"})))),s.default.createElement("div",null,s.default.createElement("h3",{className:"mb-4 text-xl font-semibold"},"Navigation"),s.default.createElement("ul",{className:"space-y-2"},["Home","About","Services","Projects","Blog","Contact"].map(function(A){return s.default.createElement(h.motion.li,{key:A,whileHover:{x:5},transition:{type:"spring",stiffness:300}},s.default.createElement("a",{href:"#".concat(A.toLowerCase()),className:"text-black transition-colors duration-300 dark:text-white"},A))}))),s.default.createElement("div",null,s.default.createElement("h3",{className:"mb-4 text-xl font-semibold"},"Connect"),s.default.createElement("ul",{className:"space-y-2"},[{name:"LinkedIn",url:"https://www.linkedin.com"},{name:"Twitter",url:"https://www.twitter.com"},{name:"Instagram",url:"https://www.instagram.com"},{name:"GitHub",url:"https://www.github.com"}].map(function(A){return s.default.createElement(h.motion.li,{key:A.name,whileHover:{x:5},transition:{type:"spring",stiffness:300}},s.default.createElement("a",{href:A.url,target:"_blank",rel:"noopener noreferrer",className:"flex items-center text-black transition-colors duration-300 dark:text-white"},A.name,s.default.createElement(r.ArrowUpRight,{className:"ml-1 h-4 w-4"})))}))),s.default.createElement("div",{className:"space-y-4"},s.default.createElement("h3",{className:"text-xl font-semibold"},"Our Vision"),s.default.createElement("p",{className:""},"Pioneering the next generation of web experiences through innovative code and cutting-edge design."),s.default.createElement("div",{className:"flex space-x-4"},s.default.createElement(h.motion.div,{className:"h-2 w-2 rounded-full bg-blue-500",animate:{scale:[1,1.5,1]},transition:{repeat:1/0,duration:2}}),s.default.createElement(h.motion.div,{className:"h-2 w-2 rounded-full bg-purple-500",animate:{scale:[1,1.5,1]},transition:{repeat:1/0,duration:2,delay:.5}}),s.default.createElement(h.motion.div,{className:"h-2 w-2 rounded-full bg-pink-500",animate:{scale:[1,1.5,1]},transition:{repeat:1/0,duration:2,delay:1}})))),s.default.createElement("div",{className:"mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row"},s.default.createElement("p",{className:"text-sm"},"\xA9 ",new Date().getFullYear(),". All rights reserved."),s.default.createElement("div",{className:"mt-4 flex space-x-4 md:mt-0"},s.default.createElement("a",{className:"text-sm transition-colors duration-300 hover:text-white"},"Privacy Policy"),s.default.createElement("a",{className:"text-sm transition-colors duration-300 hover:text-white"},"Terms of Service")))))},g=u.default=v},59378:function(O,u,e){var c=e(24994);Object.defineProperty(u,"__esModule",{value:!0}),u.default=void 0;var s=c(e(94634)),h=c(e(43693)),r=c(e(91847)),t=c(e(96540)),v=["style","children"];function g(l,i){var n=Object.keys(l);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(l);i&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(l,a).enumerable})),n.push.apply(n,o)}return n}function b(l){for(var i=1;i<arguments.length;i++){var n=arguments[i]!=null?arguments[i]:{};i%2?g(Object(n),!0).forEach(function(o){(0,h.default)(l,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach(function(o){Object.defineProperty(l,o,Object.getOwnPropertyDescriptor(n,o))})}return l}var A=t.default.forwardRef(function(l,i){var n=l.style,o=l.children,a=(0,r.default)(l,v);return t.default.createElement("div",(0,s.default)({ref:i},a,{id:"scrollContainer",style:b({width:"100%",height:"calc(100vh - 204px)",position:"relative",overflowX:"hidden",overflowY:"auto"},n)}),o)}),p=u.default=A},60295:function(O,u,e){e.r(u);var c=e(85072),s=e.n(c),h=e(97825),r=e.n(h),t=e(77659),v=e.n(t),g=e(55056),b=e.n(g),A=e(10540),p=e.n(A),l=e(41113),i=e.n(l),n=e(21634),o={};o.styleTagTransform=i(),o.setAttributes=b(),o.insert=v().bind(null,"head"),o.domAPI=r(),o.insertStyleElement=p();var a=s()(n.A,o);u.default=n.A&&n.A.locals?n.A.locals:void 0},61714:function(O,u,e){var c=e(24994),s=e(73738);Object.defineProperty(u,"__esModule",{value:!0}),u.default=void 0;var h=c(e(85715)),r=g(e(96540)),t=c(e(31583));function v(l){if(typeof WeakMap!="function")return null;var i=new WeakMap,n=new WeakMap;return(v=function(a){return a?n:i})(l)}function g(l,i){if(!i&&l&&l.__esModule)return l;if(l===null||s(l)!="object"&&typeof l!="function")return{default:l};var n=v(i);if(n&&n.has(l))return n.get(l);var o={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var d in l)if(d!=="default"&&{}.hasOwnProperty.call(l,d)){var f=a?Object.getOwnPropertyDescriptor(l,d):null;f&&(f.get||f.set)?Object.defineProperty(o,d,f):o[d]=l[d]}return o.default=l,n&&n.set(l,o),o}var b=function(i){for(var n=[],o=0;o<i;o++){var a=Math.floor(Math.random()*2e3),d=Math.floor(Math.random()*2e3);n.push("".concat(a,"px ").concat(d,"px #333"))}return n.join(", ")},A=function(){var i=(0,r.useState)(b(1400)),n=(0,h.default)(i,1),o=n[0],a=(0,r.useState)(b(400)),d=(0,h.default)(a,1),f=d[0],m=(0,r.useState)(b(200)),_=(0,h.default)(m,1),E=_[0];return r.default.createElement("section",{className:"absolute top-0 left-0"},r.default.createElement("section",{className:t.default.stars,style:{"--box-shadow":o}}),r.default.createElement("section",{className:t.default.medium,style:{"--box-shadow":f}}),r.default.createElement("section",{className:t.default.big,style:{"--box-shadow":E}}))},p=u.default=A},62540:function(O,u,e){var c=e(24994),s=e(73738);Object.defineProperty(u,"__esModule",{value:!0}),u.default=void 0;var h=c(e(85715)),r=g(e(96540)),t=e(21126);function v(p){if(typeof WeakMap!="function")return null;var l=new WeakMap,i=new WeakMap;return(v=function(o){return o?i:l})(p)}function g(p,l){if(!l&&p&&p.__esModule)return p;if(p===null||s(p)!="object"&&typeof p!="function")return{default:p};var i=v(l);if(i&&i.has(p))return i.get(p);var n={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in p)if(a!=="default"&&{}.hasOwnProperty.call(p,a)){var d=o?Object.getOwnPropertyDescriptor(p,a):null;d&&(d.get||d.set)?Object.defineProperty(n,a,d):n[a]=p[a]}return n.default=p,i&&i.set(p,n),n}var b=function(l){var i=l.companies,n=l.autorotateTiming,o=n===void 0?3e3:n,a=l.direction,d=a===void 0?"right":a,f=l.radius,m=f===void 0?180:f,_=(0,r.useState)(0),E=(0,h.default)(_,2),y=E[0],N=E[1];(0,r.useEffect)(function(){if(!(!i||i.length===0)){var C=setInterval(function(){w(d)},o);return function(){return clearInterval(C)}}},[i,o,d]);var w=function(x){var M=x==="right"?1:-1;N(function(S){return(S+M+i.length)%i.length})},D=function(x){var M=x*(Math.PI/3);return{x:Math.sin(M)*m,y:-Math.cos(M)*m+m/2}},I=(0,r.useMemo)(function(){return{enter:function(x){var M=D(d==="right"?-2:2),S=M.x,F=M.y;return{x:S,y:F,opacity:0,scale:.5}},center:function(x){var M=D(x),S=M.x,F=M.y;return{x:S,y:F,opacity:1,scale:x===0?1:.8,transition:{duration:.6,ease:[.6,.05,.01,.9]}}},exit:function(x){var M=D(d==="right"?2:-2),S=M.x,F=M.y;return{x:S,y:F,opacity:0,scale:.5,transition:{duration:.6,ease:[.6,.05,.01,.9]}}}}},[d,m]),T=(0,r.useMemo)(function(){return!i||i.length===0?[]:[-1,0,1].map(function(C){var x=(y+C+i.length)%i.length;return{offset:C,logo:i[x],index:x}})},[y,i]);return r.default.createElement("div",null,r.default.createElement("div",{className:"mx-auto w-full text-center"},r.default.createElement("div",{className:"relative h-[260px] overflow-hidden"},r.default.createElement("div",{className:"absolute inset-0 flex items-center justify-center"},r.default.createElement("div",{className:"relative min-h-[500px] min-w-[500px]"},r.default.createElement(t.AnimatePresence,{initial:!1},T.map(function(C){var x=C.offset,M=C.logo,S=C.index;return r.default.createElement(t.motion.div,{key:S,custom:x,variants:I,initial:"enter",animate:"center",exit:"exit",className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3"},r.default.createElement("img",{src:M,width:80,height:80,alt:"Company logo ".concat(S+1),className:"dark:brightness-200"}))})))))))},A=u.default=b},71635:function(O,u,e){var c=e(24994),s=e(73738);Object.defineProperty(u,"__esModule",{value:!0}),u.default=u.SocialIcon=void 0;var h=c(e(91847)),r=c(e(54756)),t=c(e(29293)),v=c(e(85715)),g=l(e(96540)),b=e(21126),A=["icon","color"];function p(a){if(typeof WeakMap!="function")return null;var d=new WeakMap,f=new WeakMap;return(p=function(_){return _?f:d})(a)}function l(a,d){if(!d&&a&&a.__esModule)return a;if(a===null||s(a)!="object"&&typeof a!="function")return{default:a};var f=p(d);if(f&&f.has(a))return f.get(a);var m={__proto__:null},_=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var E in a)if(E!=="default"&&{}.hasOwnProperty.call(a,E)){var y=_?Object.getOwnPropertyDescriptor(a,E):null;y&&(y.get||y.set)?Object.defineProperty(m,E,y):m[E]=a[E]}return m.default=a,f&&f.set(a,m),m}var i=function(d){var f=d.children,m=d.initialX,_=(0,g.useState)(!1),E=(0,v.default)(_,2),y=E[0],N=E[1],w=(0,b.useAnimation)(),D=function(){var I=(0,t.default)(r.default.mark(function T(){return r.default.wrap(function(x){for(;;)switch(x.prev=x.next){case 0:if(!y){x.next=6;break}case 1:return x.next=4,w.start({x:m+Math.random()*30-15,y:Math.random()*30-15,transition:{duration:3,ease:"easeInOut"}});case 4:x.next=1;break;case 6:case"end":return x.stop()}},T)}));return function(){return I.apply(this,arguments)}}();return(0,g.useEffect)(function(){N(!0)},[]),(0,g.useEffect)(function(){D()},[y]),g.default.createElement(b.motion.div,{drag:!0,dragMomentum:!1,dragElastic:0,dragTransition:{bounceStiffness:600,bounceDamping:20},dragConstraints:{top:-200,left:-200,right:200,bottom:0},whileDrag:{scale:1.1},initial:{x:m,y:0},animate:w,className:"cursor-move"},f)},n=u.SocialIcon=function(d){var f=d.icon,m=d.color,_=(0,h.default)(d,A);return g.default.createElement("div",{className:"rounded-full p-3 ".concat(m," shadow-lg transition-shadow hover:shadow-xl")},g.default.createElement(f,{className:"h-6 w-6 text-white"}))},o=u.default=i},81988:function(O,u,e){"use client";var c=e(24994),s=e(73738);Object.defineProperty(u,"__esModule",{value:!0}),u.default=u.FadeInDiv=void 0;var h=c(e(41132)),r=c(e(85715)),t=A(e(96540)),v=e(21126),g=c(e(71508));function b(n){if(typeof WeakMap!="function")return null;var o=new WeakMap,a=new WeakMap;return(b=function(f){return f?a:o})(n)}function A(n,o){if(!o&&n&&n.__esModule)return n;if(n===null||s(n)!="object"&&typeof n!="function")return{default:n};var a=b(o);if(a&&a.has(n))return a.get(n);var d={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var m in n)if(m!=="default"&&{}.hasOwnProperty.call(n,m)){var _=f?Object.getOwnPropertyDescriptor(n,m):null;_&&(_.get||_.set)?Object.defineProperty(d,m,_):d[m]=n[m]}return d.default=n,a&&a.set(n,d),d}var p=function(o){var a=o.tabs,d=o.containerClassName,f=o.activeTabClassName,m=o.tabClassName,_=o.contentClassName,E=(0,t.useState)(a[0]),y=(0,r.default)(E,2),N=y[0],w=y[1],D=(0,t.useState)(a),I=(0,r.default)(D,2),T=I[0],C=I[1],x=function(B){var P=(0,h.default)(a),j=P.splice(B,1);P.unshift(j[0]),C(P),w(P[0])},M=(0,t.useState)(!1),S=(0,r.default)(M,2),F=S[0],R=S[1];return t.default.createElement(t.default.Fragment,null,t.default.createElement("div",{className:(0,g.default)("no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-start overflow-auto [perspective:1000px] sm:overflow-visible",d)},a.map(function(W,B){return t.default.createElement("button",{key:W.title,onClick:function(){x(B)},onMouseEnter:function(){return R(!0)},onMouseLeave:function(){return R(!1)},className:(0,g.default)("relative rounded-full px-4 py-2",m),style:{transformStyle:"preserve-3d"}},N.value===W.value&&t.default.createElement(v.motion.div,{layoutId:"clickedButton",transition:{type:"spring",bounce:.3,duration:.6},className:(0,g.default)("absolute inset-0 rounded-full bg-gray-200 dark:bg-zinc-800",f)}),t.default.createElement("span",{className:"relative block text-black dark:text-white"},W.title))})),t.default.createElement(l,{tabs:T,active:N,key:N.value,hovering:F,className:(0,g.default)("mt-32",_)}))},l=u.FadeInDiv=function(o){var a=o.className,d=o.tabs,f=o.hovering,m=function(E){return E.value===d[0].value};return t.default.createElement("div",{className:"relative h-full w-full"},d.map(function(_,E){return t.default.createElement(v.motion.div,{key:_.value,layoutId:_.value,style:{scale:1-E*.1,top:f?E*-50:0,zIndex:-E,opacity:E<3?1-E*.1:0},animate:{y:m(_)?[0,40,0]:0},className:(0,g.default)("absolute top-0 left-0 h-full w-full",a)},_.content)}))},i=u.default=p},91193:function(O,u,e){var c=e(24994),s=e(73738);Object.defineProperty(u,"__esModule",{value:!0}),u.default=void 0;var h=c(e(85715)),r=c(e(91847)),t=c(e(94634)),v=l(e(96540)),g=e(21126),b=c(e(71508)),A=["children","className","delay"];function p(a){if(typeof WeakMap!="function")return null;var d=new WeakMap,f=new WeakMap;return(p=function(_){return _?f:d})(a)}function l(a,d){if(!d&&a&&a.__esModule)return a;if(a===null||s(a)!="object"&&typeof a!="function")return{default:a};var f=p(d);if(f&&f.has(a))return f.get(a);var m={__proto__:null},_=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var E in a)if(E!=="default"&&{}.hasOwnProperty.call(a,E)){var y=_?Object.getOwnPropertyDescriptor(a,E):null;y&&(y.get||y.set)?Object.defineProperty(m,E,y):m[E]=a[E]}return m.default=a,f&&f.set(a,m),m}var i=function(d){var f=d.children,m={initial:{scale:0,opacity:0},animate:{scale:1,opacity:1,originY:0},exit:{scale:0,opacity:0},transition:{type:"spring",stiffness:350,damping:40}};return v.default.createElement(g.motion.div,(0,t.default)({},m,{layout:!0,className:"mx-auto w-full"}),f)},n=v.default.memo(function(a){var d=a.children,f=a.className,m=a.delay,_=m===void 0?1e3:m,E=(0,r.default)(a,A),y=(0,v.useState)(0),N=(0,h.default)(y,2),w=N[0],D=N[1],I=(0,v.useMemo)(function(){return v.default.Children.toArray(d)},[d]);(0,v.useEffect)(function(){if(w<I.length-1){var C=setTimeout(function(){D(function(x){return(x+1)%I.length})},_);return function(){return clearTimeout(C)}}},[w,_,I.length]);var T=(0,v.useMemo)(function(){var C=I.slice(0,w+1).reverse();return C},[w,I]);return v.default.createElement("div",(0,t.default)({className:(0,b.default)("flex flex-col items-center gap-4",f)},E),v.default.createElement(g.AnimatePresence,null,T.map(function(C){return v.default.createElement(i,{key:C.key},C)})))}),o=u.default=n}}]);
