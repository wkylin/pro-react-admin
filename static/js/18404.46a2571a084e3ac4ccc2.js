"use strict";(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[18404],{4604:function(w,d,e){"use client";var c=e(24994),u=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var h=c(e(54756)),n=c(e(29293)),t=c(e(85715)),v=s(e(96540)),E=e(55211),b=e(21126),p=c(e(71508)),A=c(e(51889));function o(a){if(typeof WeakMap!="function")return null;var i=new WeakMap,m=new WeakMap;return(o=function(g){return g?m:i})(a)}function s(a,i){if(!i&&a&&a.__esModule)return a;if(a===null||u(a)!="object"&&typeof a!="function")return{default:a};var m=o(i);if(m&&m.has(a))return m.get(a);var f={__proto__:null},g=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var _ in a)if(_!=="default"&&{}.hasOwnProperty.call(a,_)){var B=g?Object.getOwnPropertyDescriptor(a,_):null;B&&(B.get||B.set)?Object.defineProperty(f,_,B):f[_]=a[_]}return f.default=a,m&&m.set(a,f),f}var r=function(i){var m=i.showMultiplePackageOptions,f=m===void 0?!0:m,g=i.codeLanguage,_=i.commandMap,B=i.className,N=Object.keys(_),P=(0,v.useState)(N[0]),D=(0,t.default)(P,2),M=D[0],W=D[1],y=(0,v.useState)(!1),x=(0,t.default)(y,2),O=x[0],I=x[1],L=(0,v.useState)(""),T=(0,t.default)(L,2),S=T[0],F=T[1],C=_[M];(0,v.useEffect)(function(){function j(){return U.apply(this,arguments)}function U(){return U=(0,n.default)(h.default.mark(function Y(){var X,V,k;return h.default.wrap(function(z){for(;;)switch(z.prev=z.next){case 0:return z.prev=0,z.next=3,Promise.all([e.e(55271),e.e(21747),e.e(22763)]).then(e.bind(e,22763));case 3:return X=z.sent,V=X.codeToHtml,z.next=7,V(C,{lang:g,defaultColor:"light",theme:"github-dark",wrap:!1});case 7:k=z.sent,F(k),z.next=14;break;case 11:z.prev=11,z.t0=z.catch(0),F("<pre>".concat(C,"</pre>"));case 14:case"end":return z.stop()}},Y,null,[[0,11]])})),U.apply(this,arguments)}j()},[C,g]);var R=function(){navigator.clipboard.writeText(C),I(!0),setTimeout(function(){return I(!1)},2e3)};return v.default.createElement("div",{className:(0,p.default)("mx-auto flex max-w-md items-center justify-center",B)},v.default.createElement("div",{className:"w-full space-y-2"},v.default.createElement("div",{className:"mb-2 flex items-center justify-between"},f&&v.default.createElement("div",{className:"relative"},v.default.createElement("div",{className:"border-border inline-flex overflow-hidden rounded-md border text-xs"},N.map(function(j,U){return v.default.createElement("div",{key:j,className:"flex items-center"},U>0&&v.default.createElement("div",{className:"h-4 w-px ".concat(A.default["bg-border"]),"aria-hidden":"true"}),v.default.createElement("span",{className:"bg-background hover:bg-background text-primary relative cursor-pointer rounded-none px-2 py-1",onClick:function(){return W(j)}},j,M===j&&v.default.createElement(b.motion.div,{className:"absolute inset-x-0 bottom-[1px] mx-auto h-0.5 w-[90%] ".concat(A.default["bg-primary"]),layoutId:"activeTab",initial:!1,transition:{type:"spring",stiffness:500,damping:30}})))})))),v.default.createElement("div",{className:"relative flex items-center"},v.default.createElement("div",{className:"min-w-[300px] grow font-mono"},S?v.default.createElement("div",{className:"".concat(A.default.pre," light [&>pre]:overflow-x-auto [&>pre]:rounded-md [&>pre]:p-2 [&>pre]:px-4 [&>pre]:font-mono"),dangerouslySetInnerHTML:{__html:S}}):v.default.createElement("pre",{className:"".concat(A.default.pre," border-border rounded-md border bg-white p-2 px-4 font-mono dark:bg-black")},C)),v.default.createElement("span",{className:"relative ml-2 cursor-pointer rounded-md",onClick:R},v.default.createElement("span",{className:"sr-only"},O?"Copied":"Copy"),v.default.createElement(E.Copy,{className:"h-4 w-4 transition-all duration-300 ".concat(O?"scale-0":"scale-100")}),v.default.createElement(E.Check,{className:"absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ".concat(O?"scale-100":"scale-0")})))))},l=d.default=r},6923:function(w,d,e){var c=e(24994);Object.defineProperty(d,"__esModule",{value:!0}),d.OrbitingCircles=E,d.default=void 0;var u=c(e(94634)),h=c(e(91847)),n=c(e(96540)),t=c(e(71508)),v=["className","children","reverse","duration","radius","path","iconSize","speed"];function E(o){var s=o.className,r=o.children,l=o.reverse,a=o.duration,i=a===void 0?20:a,m=o.radius,f=m===void 0?160:m,g=o.path,_=g===void 0?!0:g,B=o.iconSize,N=B===void 0?30:B,P=o.speed,D=P===void 0?1:P,M=(0,h.default)(o,v),W=i/D;return n.default.createElement(n.default.Fragment,null,_&&n.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",className:"pointer-events-none absolute inset-0 size-full"},n.default.createElement("circle",{className:"stroke-black/10 stroke-1 dark:stroke-white/10",cx:"50%",cy:"50%",r:f,fill:"none"})),n.default.Children.map(r,function(y,x){var O=360/n.default.Children.count(r)*x;return n.default.createElement("div",(0,u.default)({style:{"--duration":W,"--radius":f,"--angle":O,"--icon-size":"".concat(N,"px")},className:(0,t.default)("animate-my-orbit absolute flex size-[var(--icon-size)] transform-gpu items-center justify-center rounded-full",{"[animation-direction:reverse]":l},s)},M),y)}))}var b=function(){return n.default.createElement("div",{className:"relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden"},n.default.createElement(E,{iconSize:40},n.default.createElement(p.whatsapp,null),n.default.createElement(p.notion,null),n.default.createElement(p.openai,null),n.default.createElement(p.googleDrive,null),n.default.createElement(p.whatsapp,null)),n.default.createElement(E,{iconSize:30,radius:100,reverse:!0,speed:2},n.default.createElement(p.whatsapp,null),n.default.createElement(p.notion,null),n.default.createElement(p.openai,null),n.default.createElement(p.googleDrive,null)))},p={gitHub:function(){return n.default.createElement("svg",{width:"100",height:"100",viewBox:"0 0 438.549 438.549"},n.default.createElement("path",{fill:"currentColor",d:"M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"}))},notion:function(){return n.default.createElement("svg",{width:"100",height:"100",viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg"},n.default.createElement("path",{d:"M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z",fill:"#ffffff"}),n.default.createElement("path",{d:"M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z",fill:"#000000",fillRule:"evenodd",clipRule:"evenodd"}))},openai:function(){return n.default.createElement("svg",{width:"100",height:"100",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",className:"fill-black dark:fill-white"},n.default.createElement("path",{d:"M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"}))},googleDrive:function(){return n.default.createElement("svg",{width:"100",height:"100",viewBox:"0 0 87.3 78",xmlns:"http://www.w3.org/2000/svg"},n.default.createElement("path",{d:"m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z",fill:"#0066da"}),n.default.createElement("path",{d:"m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z",fill:"#00ac47"}),n.default.createElement("path",{d:"m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z",fill:"#ea4335"}),n.default.createElement("path",{d:"m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z",fill:"#00832d"}),n.default.createElement("path",{d:"m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z",fill:"#2684fc"}),n.default.createElement("path",{d:"m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z",fill:"#ffba00"}))},whatsapp:function(){return n.default.createElement("svg",{width:"100",height:"100",viewBox:"0 0 175.216 175.552",xmlns:"http://www.w3.org/2000/svg"},n.default.createElement("defs",null,n.default.createElement("linearGradient",{id:"b",x1:"85.915",x2:"86.535",y1:"32.567",y2:"137.092",gradientUnits:"userSpaceOnUse"},n.default.createElement("stop",{offset:"0",stopColor:"#57d163"}),n.default.createElement("stop",{offset:"1",stopColor:"#23b33a"})),n.default.createElement("filter",{id:"a",width:"1.115",height:"1.114",x:"-.057",y:"-.057",colorInterpolationFilters:"sRGB"},n.default.createElement("feGaussianBlur",{stdDeviation:"3.531"}))),n.default.createElement("path",{d:"m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0",fill:"#b3b3b3",filter:"url(#a)"}),n.default.createElement("path",{d:"m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z",fill:"#ffffff"}),n.default.createElement("path",{d:"M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z",fill:"url(#linearGradient1780)"}),n.default.createElement("path",{d:"M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z",fill:"url(#b)"}),n.default.createElement("path",{d:"M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647",fill:"#ffffff",fillRule:"evenodd"}))}},A=d.default=b},17329:function(w,d,e){w.exports=e.p+"images/9ce539741014a14d8c0c.png"},18404:function(w,d,e){var c=e(24994),u=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var h=c(e(41132)),n=c(e(85715)),t=y(e(96540)),v=e(33742),E=c(e(59378)),b=c(e(81988)),p=c(e(62540)),A=y(e(71635)),o=c(e(51502)),s=c(e(59367)),r=c(e(61714)),l=c(e(6923)),a=c(e(22549)),i=c(e(29492)),m=c(e(26718)),f=c(e(48632)),g=c(e(17329)),_=e(55211),B=c(e(4604)),N=c(e(91193)),P=e(57101),D=c(e(54887)),M=c(e(60295));function W(C){if(typeof WeakMap!="function")return null;var R=new WeakMap,j=new WeakMap;return(W=function(Y){return Y?j:R})(C)}function y(C,R){if(!R&&C&&C.__esModule)return C;if(C===null||u(C)!="object"&&typeof C!="function")return{default:C};var j=W(R);if(j&&j.has(C))return j.get(C);var U={__proto__:null},Y=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var X in C)if(X!=="default"&&{}.hasOwnProperty.call(C,X)){var V=Y?Object.getOwnPropertyDescriptor(C,X):null;V&&(V.get||V.set)?Object.defineProperty(U,X,V):U[X]=C[X]}return U.default=C,j&&j.set(C,U),U}var x=[i.default,m.default,f.default,g.default],O=[{title:"Name",align:"center",dataIndex:"name",width:150},{title:"Age",align:"center",dataIndex:"age",width:150},{title:"Address",align:"center",dataIndex:"address"}],I=[{title:"Product",value:"product",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Product Tab"))},{title:"Services",value:"services",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Services tab"))},{title:"Playground",value:"playground",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Playground tab"))},{title:"Content",value:"content",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Content tab"))},{title:"Random",value:"random",content:t.default.createElement("div",{className:"relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"},t.default.createElement("p",null,"Random tab"))}],L={npm:"npm run shadcn add button",yarn:"yarn shadcn add button",pnpm:"pnpm dlx shadcn@latest add button",bun:"bun x shadcn@latest add button"},T=function(R,j){var U=new Date(R),Y=new Date(j),X=Math.abs(Y-U),V=Math.ceil(X/(1e3*60*60*24));return V},S=function(){var R=(0,t.useState)([{id:"1",content:t.default.createElement(P.DraggableItem,null,"First Item")},{id:"2",content:t.default.createElement(P.DraggableItem,null,"Second Item")},{id:"3",content:t.default.createElement(P.DraggableItem,null,"Third Item")}]),j=(0,n.default)(R,2),U=j[0],Y=j[1],X=function(k){Y(k)};return t.default.createElement(E.default,null,t.default.createElement(D.default,null),t.default.createElement(r.default,null),t.default.createElement(a.default,{cards:(0,h.default)(Array.from({length:4},function(){return{id:Math.random()}}))}),t.default.createElement("div",{className:"relative w-full overflow-hidden bg-[#0a192f]"},t.default.createElement("div",{className:"absolute top-0 right-0 h-full w-1/2"},t.default.createElement("div",{className:"absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20",style:{clipPath:"polygon(100% 0, 100% 100%, 0 100%, 100% 0)"}})),t.default.createElement("div",{className:"absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-white/20"}),t.default.createElement("div",{className:"absolute right-0 bottom-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full border-8 border-white/20"}),t.default.createElement("div",{className:"relative mx-auto max-w-7xl px-4 py-16"},t.default.createElement("div",{className:"mb-16 text-center"},t.default.createElement("h1",{className:"mb-6 text-4xl font-bold text-white md:text-5xl"},"Influencer And Affiliate Marketing Plans and Pricing"),t.default.createElement("p",{className:"mx-auto max-w-3xl text-lg text-gray-300"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, in? Nemo, quas esse a id at quae sunt! Temporibus, consectetur optio. Beatae, culpa nam quas eaque ipsa blanditiis adipisci rem."))),t.default.createElement("div",{className:"relative mt-8 flex h-16 justify-center gap-8"},t.default.createElement(A.default,{initialX:-150},t.default.createElement(A.SocialIcon,{icon:_.Command,color:"bg-blue-500"})),t.default.createElement(A.default,{initialX:-50},t.default.createElement(A.SocialIcon,{icon:_.Cannabis,color:"bg-blue-400"})),t.default.createElement(A.default,{initialX:50},t.default.createElement(A.SocialIcon,{icon:_.Beer,color:"bg-pink-500"})),t.default.createElement(A.default,{initialX:150},t.default.createElement(A.SocialIcon,{icon:_.Mail,color:"bg-red-500"})))),t.default.createElement(p.default,{companies:x}),t.default.createElement("section",{className:"flex flex-row items-center justify-center gap-5"},t.default.createElement(o.default,{width:300,height:100,path:"M0,50 Q150,0 300,50"}),t.default.createElement(o.default,{width:200,height:200,path:"M100,0 L75,75 L125,75 L50,200 L100,100 L50,100 L100,0",gradientColors:["#F1C40F","#F1C40F","#E67E22"]}),t.default.createElement(o.default,{width:200,height:200,path:"M100,100 m0,-75 a75,75 0 1,1 -0.1,0 z",gradientColors:["#7B68EE","#7B68EE","#3498DB"]}),t.default.createElement(o.default,{width:300,height:100,path:"M0,50 L75,25 L150,75 L225,25 L300,50"})),t.default.createElement("section",{className:"flex flex-row items-center justify-center gap-5"},t.default.createElement(o.default,{width:200,height:50,path:"M 20,25 L 180,25",gradientColors:["#FF5733","#FF5733","#C70039"]}),t.default.createElement(o.default,{width:250,height:200,path:"M 50,20 L 50,60 L 80,80 L 200,60",gradientColors:["#FFA07A","#FFA07A","#FF6347"]}),t.default.createElement(o.default,{width:200,height:200,path:"M 20,20 L 180,180",gradientColors:["#5733FF","#5733FF","#C700C7"]})),t.default.createElement("section",{className:"flex flex-row items-center justify-center gap-5"},t.default.createElement(o.default,{width:200,height:200,path:"M 50,20 L 100,20 L 60, 25 L 180, 25",gradientColors:["#FF69B4","#FF69B4","#8A2BE2"]}),t.default.createElement(o.default,{width:200,height:200,path:"M 50,20 L 100,20 L 100,30 L 150, 30",gradientColors:["#FF1493","#FF1493","#9400D3"]}),t.default.createElement(o.default,{width:200,height:200,path:"M 20,30 L 40,30 L 40,10 L 180, 10",gradientColors:["#FFA500","#FFA500","#FF4500"]}),t.default.createElement(o.default,{width:200,height:200,path:"M 10 10 L 90 10 Q 100 50 90 90 C 50 100 10 50 10 10 Z",gradientColors:["#FFA500","#FFA500","#FF4500"]})),t.default.createElement("div",{className:"b relative mx-auto flex h-[20rem] w-full max-w-5xl flex-col items-start justify-start [perspective:1000px]"},t.default.createElement(b.default,{tabs:I})),t.default.createElement(v.Table,{columns:O,dataSource:[],pagination:{pageSize:50},scroll:{y:240}}),t.default.createElement("section",{className:"m-10 flex items-center justify-center gap-5"},t.default.createElement("div",{className:"mb-5 inline-block rounded-xl bg-gradient-to-tl from-blue-600 via-transparent to-purple-400 p-px"},t.default.createElement("div",{className:"min-w-20 rounded-xl bg-white px-3 py-1.5 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:bg-neutral-900"},t.default.createElement("span",{className:"bg-gradient-to-tl from-blue-600 to-purple-400 bg-clip-text text-transparent"},"200+"))),t.default.createElement("div",{className:"mb-5 inline-block rounded-xl bg-gradient-to-tl from-blue-600 via-transparent to-purple-400 p-px"},t.default.createElement("div",{className:"min-w-20 rounded-xl bg-white px-3 py-1.5 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:bg-neutral-900"},t.default.createElement("span",{className:"bg-gradient-to-tl from-blue-600 to-purple-400 bg-clip-text text-transparent"},"400+"))),t.default.createElement("div",{className:"mb-5 inline-block rounded-xl bg-gradient-to-tl from-blue-600 via-transparent to-purple-400 p-px"},t.default.createElement("div",{className:"min-w-20 rounded-xl bg-white px-3 py-1.5 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:bg-neutral-900"},t.default.createElement("span",{className:"bg-gradient-to-tl from-blue-600 to-purple-400 bg-clip-text text-transparent"},"1200+"))),t.default.createElement("div",{className:"mb-5 inline-block rounded-xl bg-gradient-to-tl from-blue-600 via-transparent to-purple-400 p-px"},t.default.createElement("div",{className:"min-w-20 rounded-xl bg-white px-3 py-1.5 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:bg-neutral-900"},t.default.createElement("span",{className:"bg-gradient-to-tl from-blue-600 to-purple-400 bg-clip-text text-transparent"},"2000+")))),t.default.createElement("section",{className:M.default["section-gradient"]},t.default.createElement("div",{className:M.default.wave}),t.default.createElement("div",{className:M.default.wave}),t.default.createElement("div",{className:M.default.wave})),t.default.createElement(s.default,null))},F=d.default=S},21634:function(w,d,e){var c=e(71354),u=e.n(c),h=e(76314),n=e.n(h),t=n()(u());t.push([w.id,`@font: 'Karla', sans-serif;\r
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
`],sourceRoot:""}]),t.locals={flex:"flex--_gwXM",flexItem:"flexItem--U6z9X",button:"button--RU103","section-gradient":"section-gradient--xN4VI",sectionGradient:"section-gradient--xN4VI",gradient:"gradient--zruvo",wave:"wave--QYXbB"},d.A=t},22549:function(w,d,e){var c=e(24994),u=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var h=v(e(96540)),n=c(e(71508));function t(p){if(typeof WeakMap!="function")return null;var A=new WeakMap,o=new WeakMap;return(t=function(r){return r?o:A})(p)}function v(p,A){if(!A&&p&&p.__esModule)return p;if(p===null||u(p)!="object"&&typeof p!="function")return{default:p};var o=t(A);if(o&&o.has(p))return o.get(p);var s={__proto__:null},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in p)if(l!=="default"&&{}.hasOwnProperty.call(p,l)){var a=r?Object.getOwnPropertyDescriptor(p,l):null;a&&(a.get||a.set)?Object.defineProperty(s,l,a):s[l]=p[l]}return s.default=p,o&&o.set(p,s),s}var E=function(A){var o=A.cards,s=A.children;return h.default.createElement(h.default.Fragment,null,h.default.createElement("section",{className:"flex flex-col gap-4 pt-30 pb-20"},o.map(function(r,l){var a=l%2===0?"animate-slide-in-left":"animate-slide-in-right";return h.default.createElement("div",{key:r==null?void 0:r.id,style:{top:"calc(50px + ".concat((l+1)*30,"px)")},className:(0,n.default)("sticky z-0 m-auto flex w-[50vw] justify-center overflow-hidden rounded-2xl bg-[#0a192f] px-8 pt-4 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-2xl after:outline after:-outline-offset-2 after:outline-white/20",a)},h.default.createElement("div",{className:"animate-wiggle sticky top-9 h-[30vh]"},h.default.createElement("p",{className:"animate-hue-rotate hue-clip text-gradient text-2xl"},"Card Item")))})))},b=d.default=E},26718:function(w,d,e){w.exports=e.p+"images/916ddb5adf113a8dd7a3.png"},29492:function(w,d,e){w.exports=e.p+"images/f5fb3175e80af3f631cc.png"},31583:function(w,d,e){e.r(d);var c=e(85072),u=e.n(c),h=e(97825),n=e.n(h),t=e(77659),v=e.n(t),E=e(55056),b=e.n(E),p=e(10540),A=e.n(p),o=e(41113),s=e.n(o),r=e(46456),l={};l.styleTagTransform=s(),l.setAttributes=b(),l.insert=v().bind(null,"head"),l.domAPI=n(),l.insertStyleElement=A();var a=u()(r.A,l);d.default=r.A&&r.A.locals?r.A.locals:void 0},46456:function(w,d,e){var c=e(71354),u=e.n(c),h=e(76314),n=e.n(h),t=n()(u());t.push([w.id,`.stars--xQGmL {\r
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
`],sourceRoot:""}]),t.locals={stars:"stars--xQGmL","anim-star":"anim-star--rqp4H",animStar:"anim-star--rqp4H",medium:"medium--djEFj",big:"big--sf21I"},d.A=t},48632:function(w,d,e){w.exports=e.p+"images/695c6a7e4d55286b3565.png"},51502:function(w,d,e){var c=e(24994);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var u=c(e(96540)),h=e(23947),n=function(E){var b=E.width,p=E.height,A=E.baseColor,o=A===void 0?"black":A,s=E.gradientColors,r=s===void 0?["#2EB9DF","#2EB9DF","#9E00FF"]:s,l=E.animationDuration,a=l===void 0?2:l,i=E.strokeWidth,m=i===void 0?2:i,f=E.path,g="pulse-".concat(Math.random().toString(36).substring(2,9));return u.default.createElement("div",{className:"relative",style:{width:b,height:p}},u.default.createElement("svg",{width:b,height:p,viewBox:"0 0 ".concat(b," ").concat(p),fill:"none"},u.default.createElement("path",{d:f,stroke:o,strokeOpacity:"0.2"}),u.default.createElement("path",{d:f,stroke:"url(#".concat(g,")"),strokeLinecap:"round",strokeWidth:m}),u.default.createElement("defs",null,u.default.createElement(h.motion.linearGradient,{animate:{x1:[0,b*2],x2:[0,b]},transition:{duration:a,repeat:1/0,ease:"linear"},id:g,gradientUnits:"userSpaceOnUse"},u.default.createElement("stop",{stopColor:r[0],stopOpacity:"0"}),u.default.createElement("stop",{stopColor:r[1]}),u.default.createElement("stop",{offset:"1",stopColor:r[2],stopOpacity:"0"})))))},t=d.default=n},51889:function(w,d,e){e.r(d);var c=e(85072),u=e.n(c),h=e(97825),n=e.n(h),t=e(77659),v=e.n(t),E=e(55056),b=e.n(E),p=e(10540),A=e.n(p),o=e(41113),s=e.n(o),r=e(57130),l={};l.styleTagTransform=s(),l.setAttributes=b(),l.insert=v().bind(null,"head"),l.domAPI=n(),l.insertStyleElement=A();var a=u()(r.A,l);d.default=r.A&&r.A.locals?r.A.locals:void 0},54887:function(w,d,e){var c=e(24994),u=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var h=c(e(41132)),n=c(e(85715)),t=p(e(96540)),v=e(33742),E=e(55211);function b(r){if(typeof WeakMap!="function")return null;var l=new WeakMap,a=new WeakMap;return(b=function(m){return m?a:l})(r)}function p(r,l){if(!l&&r&&r.__esModule)return r;if(r===null||u(r)!="object"&&typeof r!="function")return{default:r};var a=b(l);if(a&&a.has(r))return a.get(r);var i={__proto__:null},m=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var f in r)if(f!=="default"&&{}.hasOwnProperty.call(r,f)){var g=m?Object.getOwnPropertyDescriptor(r,f):null;g&&(g.get||g.set)?Object.defineProperty(i,f,g):i[f]=r[f]}return i.default=r,a&&a.set(r,i),i}var A=Array.from({length:30},function(r,l){return{name:"Item ".concat(l+1),category:["A","B","C"][l%3]}}),o=function(l){var a=l.tradeList,i=a===void 0?[]:a,m=(0,t.useState)([].concat((0,h.default)(i),A)),f=(0,n.default)(m,2),g=f[0],_=f[1],B=(0,t.useState)("all"),N=(0,n.default)(B,2),P=N[0],D=N[1],M=(0,t.useState)([].concat((0,h.default)(i),A)),W=(0,n.default)(M,2),y=W[0],x=W[1],O=(0,t.useState)(0),I=(0,n.default)(O,2),L=I[0],T=I[1],S=[{label:"\u5168\u90E8",value:"all"},{label:"\u5206\u7C7B A",value:"A"},{label:"\u5206\u7C7B B",value:"B"},{label:"\u5206\u7C7B C",value:"C"}],F=function(){x(P==="all"?(0,h.default)(g):g.filter(function(K){return P.includes(K.category)})),T(0)},C=function(){D("all"),F()},R=6,j=t.default.useMemo(function(){for(var k=[],K=0;K<y.length;K+=R)k.push(y.slice(K,K+R));return k},[y]),U=Math.ceil(y.length/R),Y=function(){return T(Math.max(0,L-1))},X=function(){return T(Math.min(U-1,L+1))},V=function(K){return T(K)};return(0,t.useEffect)(function(){F()},[P,g]),t.default.createElement("div",{className:"relative mx-auto w-full max-w-6xl"},t.default.createElement("div",{className:"mb-4 flex justify-end"},t.default.createElement(v.Select,{value:P,onChange:D,className:"w-[240px]",placeholder:"\u8BF7\u9009\u62E9\u5206\u7C7B",options:S})),t.default.createElement("div",{className:"relative flex items-center justify-between"},t.default.createElement(v.Button,{className:"cursor-pointer rounded-full",onClick:Y,disabled:L===0,shape:"circle"},t.default.createElement(E.ChevronLeft,null)),t.default.createElement("div",{className:"relative mx-4 flex-grow overflow-hidden"},t.default.createElement("div",{className:"flex transition-transform duration-300 ease-in-out",style:{transform:"translateX(-".concat(L*100,"%)")}},j.length===0?t.default.createElement("div",{className:"w-full text-center text-gray-500"},"\u6682\u65E0\u6570\u636E"):t.default.createElement(t.default.Fragment,null,j.map(function(k,K){return t.default.createElement("div",{key:K,className:"flex min-w-full flex-wrap justify-center"},k.map(function(z,H){return t.default.createElement("div",{key:H,className:"w-1/3 p-2"},t.default.createElement("div",{className:"cus-bg mx-auto rounded-md border border-sky-500 p-4 text-center shadow-md"},t.default.createElement("div",{className:"mb-2 text-xl text-sky-500"},z.name),t.default.createElement("div",{className:"text-gray-500"},z.category)))}))})))),t.default.createElement(v.Button,{className:"cursor-pointer rounded-full",onClick:X,goToPage:!0,disabled:L===U-1||g.length===0,shape:"circle"},t.default.createElement(E.ChevronRight,null))),t.default.createElement("div",{className:"mt-4 flex justify-center gap-4 space-x-4"},Array.from({length:U}).map(function(k,K){return t.default.createElement("button",{key:K,className:"h-2 w-2 rounded-full ring ring-blue-600/80 transition-colors duration-300 hover:bg-blue-600/80 ".concat(L===K?"bg-blue-600/80":"bg-white"),onClick:function(){return K}})})))},s=d.default=o},57101:function(w,d,e){"use client";var c=e(24994),u=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.DraggableList=d.DraggableItem=void 0;var h=c(e(41132)),n=c(e(85715)),t=p(e(96540)),v=e(21126),E=c(e(71508));function b(s){if(typeof WeakMap!="function")return null;var r=new WeakMap,l=new WeakMap;return(b=function(i){return i?l:r})(s)}function p(s,r){if(!r&&s&&s.__esModule)return s;if(s===null||u(s)!="object"&&typeof s!="function")return{default:s};var l=b(r);if(l&&l.has(s))return l.get(s);var a={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var m in s)if(m!=="default"&&{}.hasOwnProperty.call(s,m)){var f=i?Object.getOwnPropertyDescriptor(s,m):null;f&&(f.get||f.set)?Object.defineProperty(a,m,f):a[m]=s[m]}return a.default=s,l&&l.set(s,a),a}var A=d.DraggableList=function(r){var l=r.items,a=r.onChange,i=r.className,m=(0,t.useState)(l),f=(0,n.default)(m,2),g=f[0],_=f[1],B=(0,t.useState)(null),N=(0,n.default)(B,2),P=N[0],D=N[1],M=(0,t.useState)(null),W=(0,n.default)(M,2),y=W[0],x=W[1],O=function(S){D(S)},I=function(S,F){S.preventDefault(),x(F)},L=function(){if(!P||!y){D(null),x(null);return}var S=(0,h.default)(g),F=g.findIndex(function(R){return R.id===P.id}),C=g.findIndex(function(R){return R.id===y});S.splice(F,1),S.splice(C,0,P),_(S),a==null||a(S),D(null),x(null)};return t.default.createElement("div",{className:(0,E.default)("space-y-2",i)},t.default.createElement(v.AnimatePresence,null,g.map(function(T){return t.default.createElement(v.motion.div,{key:T.id,layout:!0,initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.2},draggable:!0,onDragStart:function(){return O(T)},onDragOver:function(F){return I(F,T.id)},onDragEnd:L,className:(0,E.default)("bg-secondary/50 border-primary/10 cursor-grab rounded-lg border p-4 shadow-sm transition-colors",y===T.id&&"border-orange bg-secondary/40 border-2",(P==null?void 0:P.id)===T.id&&"border-2 border-gray-400 opacity-50")},T.content)})))},o=d.DraggableItem=function(r){var l=r.children,a=r.className;return t.default.createElement("div",{className:(0,E.default)("flex items-center gap-2",a)},t.default.createElement("div",{className:"text-gray-400"},"\u2261"),l)}},57130:function(w,d,e){var c=e(71354),u=e.n(c),h=e(76314),n=e.n(h),t=n()(u());t.push([w.id,`.pre--Dih6h pre {\r
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
`],sourceRoot:""}]),t.locals={pre:"pre--Dih6h","bg-primary":"bg-primary--JrjKB",bgPrimary:"bg-primary--JrjKB","bg-border":"bg-border--bETNR",bgBorder:"bg-border--bETNR"},d.A=t},59367:function(w,d,e){var c=e(24994);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var u=c(e(96540)),h=e(21126),n=e(55211),t=c(e(48632)),v=function(){return u.default.createElement("footer",{className:"bg-[#0a192f] py-16 text-white"},u.default.createElement("div",{className:"container mx-auto px-4"},u.default.createElement("div",{className:"grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4"},u.default.createElement("div",{className:"space-y-6"},u.default.createElement(h.motion.h2,{className:"bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5}},u.default.createElement("img",{src:t.default,width:"40",height:"40",alt:"Logo"})),u.default.createElement("p",{className:""},"Shaping the future of web development"),u.default.createElement("div",{className:"relative"},u.default.createElement("input",{type:"email",placeholder:"Your email",className:"w-full rounded-full border-2 px-4 py-2 transition-all duration-300 outline-none"}),u.default.createElement("button",{className:"absolute top-2 right-1 rounded-full p-1 transition-colors duration-300"},u.default.createElement(n.ArrowUpRight,{className:"size-4"})))),u.default.createElement("div",null,u.default.createElement("h3",{className:"mb-4 text-xl font-semibold"},"Navigation"),u.default.createElement("ul",{className:"space-y-2"},["Home","About","Services","Projects","Blog","Contact"].map(function(p){return u.default.createElement(h.motion.li,{key:p,whileHover:{x:5},transition:{type:"spring",stiffness:300}},u.default.createElement("a",{href:"#".concat(p.toLowerCase()),className:"text-black transition-colors duration-300 dark:text-white"},p))}))),u.default.createElement("div",null,u.default.createElement("h3",{className:"mb-4 text-xl font-semibold"},"Connect"),u.default.createElement("ul",{className:"space-y-2"},[{name:"LinkedIn",url:"https://www.linkedin.com"},{name:"Twitter",url:"https://www.twitter.com"},{name:"Instagram",url:"https://www.instagram.com"},{name:"GitHub",url:"https://www.github.com"}].map(function(p){return u.default.createElement(h.motion.li,{key:p.name,whileHover:{x:5},transition:{type:"spring",stiffness:300}},u.default.createElement("a",{href:p.url,target:"_blank",rel:"noopener noreferrer",className:"flex items-center text-black transition-colors duration-300 dark:text-white"},p.name,u.default.createElement(n.ArrowUpRight,{className:"ml-1 h-4 w-4"})))}))),u.default.createElement("div",{className:"space-y-4"},u.default.createElement("h3",{className:"text-xl font-semibold"},"Our Vision"),u.default.createElement("p",{className:""},"Pioneering the next generation of web experiences through innovative code and cutting-edge design."),u.default.createElement("div",{className:"flex space-x-4"},u.default.createElement(h.motion.div,{className:"h-2 w-2 rounded-full bg-blue-500",animate:{scale:[1,1.5,1]},transition:{repeat:1/0,duration:2}}),u.default.createElement(h.motion.div,{className:"h-2 w-2 rounded-full bg-purple-500",animate:{scale:[1,1.5,1]},transition:{repeat:1/0,duration:2,delay:.5}}),u.default.createElement(h.motion.div,{className:"h-2 w-2 rounded-full bg-pink-500",animate:{scale:[1,1.5,1]},transition:{repeat:1/0,duration:2,delay:1}})))),u.default.createElement("div",{className:"mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row"},u.default.createElement("p",{className:"text-sm"},"\xA9 ",new Date().getFullYear(),". All rights reserved."),u.default.createElement("div",{className:"mt-4 flex space-x-4 md:mt-0"},u.default.createElement("a",{className:"text-sm transition-colors duration-300 hover:text-white"},"Privacy Policy"),u.default.createElement("a",{className:"text-sm transition-colors duration-300 hover:text-white"},"Terms of Service")))))},E=d.default=v},59378:function(w,d,e){var c=e(24994);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var u=c(e(94634)),h=c(e(43693)),n=c(e(91847)),t=c(e(96540)),v=["style","children"];function E(o,s){var r=Object.keys(o);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(o);s&&(l=l.filter(function(a){return Object.getOwnPropertyDescriptor(o,a).enumerable})),r.push.apply(r,l)}return r}function b(o){for(var s=1;s<arguments.length;s++){var r=arguments[s]!=null?arguments[s]:{};s%2?E(Object(r),!0).forEach(function(l){(0,h.default)(o,l,r[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(r)):E(Object(r)).forEach(function(l){Object.defineProperty(o,l,Object.getOwnPropertyDescriptor(r,l))})}return o}var p=t.default.forwardRef(function(o,s){var r=o.style,l=o.children,a=(0,n.default)(o,v);return t.default.createElement("div",(0,u.default)({ref:s},a,{id:"scrollContainer",style:b({width:"100%",height:"calc(100vh - 204px)",position:"relative",overflowX:"hidden",overflowY:"auto"},r)}),l)}),A=d.default=p},60295:function(w,d,e){e.r(d);var c=e(85072),u=e.n(c),h=e(97825),n=e.n(h),t=e(77659),v=e.n(t),E=e(55056),b=e.n(E),p=e(10540),A=e.n(p),o=e(41113),s=e.n(o),r=e(21634),l={};l.styleTagTransform=s(),l.setAttributes=b(),l.insert=v().bind(null,"head"),l.domAPI=n(),l.insertStyleElement=A();var a=u()(r.A,l);d.default=r.A&&r.A.locals?r.A.locals:void 0},61714:function(w,d,e){var c=e(24994),u=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var h=c(e(85715)),n=E(e(96540)),t=c(e(31583));function v(o){if(typeof WeakMap!="function")return null;var s=new WeakMap,r=new WeakMap;return(v=function(a){return a?r:s})(o)}function E(o,s){if(!s&&o&&o.__esModule)return o;if(o===null||u(o)!="object"&&typeof o!="function")return{default:o};var r=v(s);if(r&&r.has(o))return r.get(o);var l={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in o)if(i!=="default"&&{}.hasOwnProperty.call(o,i)){var m=a?Object.getOwnPropertyDescriptor(o,i):null;m&&(m.get||m.set)?Object.defineProperty(l,i,m):l[i]=o[i]}return l.default=o,r&&r.set(o,l),l}var b=function(s){for(var r=[],l=0;l<s;l++){var a=Math.floor(Math.random()*2e3),i=Math.floor(Math.random()*2e3);r.push("".concat(a,"px ").concat(i,"px #333"))}return r.join(", ")},p=function(){var s=(0,n.useState)(b(1400)),r=(0,h.default)(s,1),l=r[0],a=(0,n.useState)(b(400)),i=(0,h.default)(a,1),m=i[0],f=(0,n.useState)(b(200)),g=(0,h.default)(f,1),_=g[0];return n.default.createElement("section",{className:"absolute top-0 left-0"},n.default.createElement("section",{className:t.default.stars,style:{"--box-shadow":l}}),n.default.createElement("section",{className:t.default.medium,style:{"--box-shadow":m}}),n.default.createElement("section",{className:t.default.big,style:{"--box-shadow":_}}))},A=d.default=p},62540:function(w,d,e){var c=e(24994),u=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var h=c(e(85715)),n=E(e(96540)),t=e(21126);function v(A){if(typeof WeakMap!="function")return null;var o=new WeakMap,s=new WeakMap;return(v=function(l){return l?s:o})(A)}function E(A,o){if(!o&&A&&A.__esModule)return A;if(A===null||u(A)!="object"&&typeof A!="function")return{default:A};var s=v(o);if(s&&s.has(A))return s.get(A);var r={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in A)if(a!=="default"&&{}.hasOwnProperty.call(A,a)){var i=l?Object.getOwnPropertyDescriptor(A,a):null;i&&(i.get||i.set)?Object.defineProperty(r,a,i):r[a]=A[a]}return r.default=A,s&&s.set(A,r),r}var b=function(o){var s=o.companies,r=o.autorotateTiming,l=r===void 0?3e3:r,a=o.direction,i=a===void 0?"right":a,m=o.radius,f=m===void 0?180:m,g=(0,n.useState)(0),_=(0,h.default)(g,2),B=_[0],N=_[1];(0,n.useEffect)(function(){if(!(!s||s.length===0)){var y=setInterval(function(){P(i)},l);return function(){return clearInterval(y)}}},[s,l,i]);var P=function(x){var O=x==="right"?1:-1;N(function(I){return(I+O+s.length)%s.length})},D=function(x){var O=x*(Math.PI/3);return{x:Math.sin(O)*f,y:-Math.cos(O)*f+f/2}},M=(0,n.useMemo)(function(){return{enter:function(x){var O=D(i==="right"?-2:2),I=O.x,L=O.y;return{x:I,y:L,opacity:0,scale:.5}},center:function(x){var O=D(x),I=O.x,L=O.y;return{x:I,y:L,opacity:1,scale:x===0?1:.8,transition:{duration:.6,ease:[.6,.05,.01,.9]}}},exit:function(x){var O=D(i==="right"?2:-2),I=O.x,L=O.y;return{x:I,y:L,opacity:0,scale:.5,transition:{duration:.6,ease:[.6,.05,.01,.9]}}}}},[i,f]),W=(0,n.useMemo)(function(){return!s||s.length===0?[]:[-1,0,1].map(function(y){var x=(B+y+s.length)%s.length;return{offset:y,logo:s[x],index:x}})},[B,s]);return n.default.createElement("div",null,n.default.createElement("div",{className:"mx-auto w-full text-center"},n.default.createElement("div",{className:"relative h-[260px] overflow-hidden"},n.default.createElement("div",{className:"absolute inset-0 flex items-center justify-center"},n.default.createElement("div",{className:"relative min-h-[500px] min-w-[500px]"},n.default.createElement(t.AnimatePresence,{initial:!1},W.map(function(y){var x=y.offset,O=y.logo,I=y.index;return n.default.createElement(t.motion.div,{key:I,custom:x,variants:M,initial:"enter",animate:"center",exit:"exit",className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3"},n.default.createElement("img",{src:O,width:80,height:80,alt:"Company logo ".concat(I+1),className:"dark:brightness-200"}))})))))))},p=d.default=b},71635:function(w,d,e){var c=e(24994),u=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=d.SocialIcon=void 0;var h=c(e(91847)),n=c(e(54756)),t=c(e(29293)),v=c(e(85715)),E=o(e(96540)),b=e(21126),p=["icon","color"];function A(a){if(typeof WeakMap!="function")return null;var i=new WeakMap,m=new WeakMap;return(A=function(g){return g?m:i})(a)}function o(a,i){if(!i&&a&&a.__esModule)return a;if(a===null||u(a)!="object"&&typeof a!="function")return{default:a};var m=A(i);if(m&&m.has(a))return m.get(a);var f={__proto__:null},g=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var _ in a)if(_!=="default"&&{}.hasOwnProperty.call(a,_)){var B=g?Object.getOwnPropertyDescriptor(a,_):null;B&&(B.get||B.set)?Object.defineProperty(f,_,B):f[_]=a[_]}return f.default=a,m&&m.set(a,f),f}var s=function(i){var m=i.children,f=i.initialX,g=(0,E.useState)(!1),_=(0,v.default)(g,2),B=_[0],N=_[1],P=(0,b.useAnimation)(),D=function(){var M=(0,t.default)(n.default.mark(function W(){return n.default.wrap(function(x){for(;;)switch(x.prev=x.next){case 0:if(!B){x.next=6;break}case 1:return x.next=4,P.start({x:f+Math.random()*30-15,y:Math.random()*30-15,transition:{duration:3,ease:"easeInOut"}});case 4:x.next=1;break;case 6:case"end":return x.stop()}},W)}));return function(){return M.apply(this,arguments)}}();return(0,E.useEffect)(function(){N(!0)},[]),(0,E.useEffect)(function(){D()},[B]),E.default.createElement(b.motion.div,{drag:!0,dragMomentum:!1,dragElastic:0,dragTransition:{bounceStiffness:600,bounceDamping:20},dragConstraints:{top:-200,left:-200,right:200,bottom:0},whileDrag:{scale:1.1},initial:{x:f,y:0},animate:P,className:"cursor-move"},m)},r=d.SocialIcon=function(i){var m=i.icon,f=i.color,g=(0,h.default)(i,p);return E.default.createElement("div",{className:"rounded-full p-3 ".concat(f," shadow-lg transition-shadow hover:shadow-xl")},E.default.createElement(m,{className:"h-6 w-6 text-white"}))},l=d.default=s},81988:function(w,d,e){"use client";var c=e(24994),u=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=d.FadeInDiv=void 0;var h=c(e(41132)),n=c(e(85715)),t=p(e(96540)),v=e(21126),E=c(e(71508));function b(r){if(typeof WeakMap!="function")return null;var l=new WeakMap,a=new WeakMap;return(b=function(m){return m?a:l})(r)}function p(r,l){if(!l&&r&&r.__esModule)return r;if(r===null||u(r)!="object"&&typeof r!="function")return{default:r};var a=b(l);if(a&&a.has(r))return a.get(r);var i={__proto__:null},m=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var f in r)if(f!=="default"&&{}.hasOwnProperty.call(r,f)){var g=m?Object.getOwnPropertyDescriptor(r,f):null;g&&(g.get||g.set)?Object.defineProperty(i,f,g):i[f]=r[f]}return i.default=r,a&&a.set(r,i),i}var A=function(l){var a=l.tabs,i=l.containerClassName,m=l.activeTabClassName,f=l.tabClassName,g=l.contentClassName,_=(0,t.useState)(a[0]),B=(0,n.default)(_,2),N=B[0],P=B[1],D=(0,t.useState)(a),M=(0,n.default)(D,2),W=M[0],y=M[1],x=function(F){var C=(0,h.default)(a),R=C.splice(F,1);C.unshift(R[0]),y(C),P(C[0])},O=(0,t.useState)(!1),I=(0,n.default)(O,2),L=I[0],T=I[1];return t.default.createElement(t.default.Fragment,null,t.default.createElement("div",{className:(0,E.default)("no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-start overflow-auto [perspective:1000px] sm:overflow-visible",i)},a.map(function(S,F){return t.default.createElement("button",{key:S.title,onClick:function(){x(F)},onMouseEnter:function(){return T(!0)},onMouseLeave:function(){return T(!1)},className:(0,E.default)("relative rounded-full px-4 py-2",f),style:{transformStyle:"preserve-3d"}},N.value===S.value&&t.default.createElement(v.motion.div,{layoutId:"clickedButton",transition:{type:"spring",bounce:.3,duration:.6},className:(0,E.default)("absolute inset-0 rounded-full bg-gray-200 dark:bg-zinc-800",m)}),t.default.createElement("span",{className:"relative block text-black dark:text-white"},S.title))})),t.default.createElement(o,{tabs:W,active:N,key:N.value,hovering:L,className:(0,E.default)("mt-32",g)}))},o=d.FadeInDiv=function(l){var a=l.className,i=l.tabs,m=l.hovering,f=function(_){return _.value===i[0].value};return t.default.createElement("div",{className:"relative h-full w-full"},i.map(function(g,_){return t.default.createElement(v.motion.div,{key:g.value,layoutId:g.value,style:{scale:1-_*.1,top:m?_*-50:0,zIndex:-_,opacity:_<3?1-_*.1:0},animate:{y:f(g)?[0,40,0]:0},className:(0,E.default)("absolute top-0 left-0 h-full w-full",a)},g.content)}))},s=d.default=A},91193:function(w,d,e){var c=e(24994),u=e(73738);Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var h=c(e(85715)),n=c(e(91847)),t=c(e(94634)),v=o(e(96540)),E=e(21126),b=c(e(71508)),p=["children","className","delay"];function A(a){if(typeof WeakMap!="function")return null;var i=new WeakMap,m=new WeakMap;return(A=function(g){return g?m:i})(a)}function o(a,i){if(!i&&a&&a.__esModule)return a;if(a===null||u(a)!="object"&&typeof a!="function")return{default:a};var m=A(i);if(m&&m.has(a))return m.get(a);var f={__proto__:null},g=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var _ in a)if(_!=="default"&&{}.hasOwnProperty.call(a,_)){var B=g?Object.getOwnPropertyDescriptor(a,_):null;B&&(B.get||B.set)?Object.defineProperty(f,_,B):f[_]=a[_]}return f.default=a,m&&m.set(a,f),f}var s=function(i){var m=i.children,f={initial:{scale:0,opacity:0},animate:{scale:1,opacity:1,originY:0},exit:{scale:0,opacity:0},transition:{type:"spring",stiffness:350,damping:40}};return v.default.createElement(E.motion.div,(0,t.default)({},f,{layout:!0,className:"mx-auto w-full"}),m)},r=v.default.memo(function(a){var i=a.children,m=a.className,f=a.delay,g=f===void 0?1e3:f,_=(0,n.default)(a,p),B=(0,v.useState)(0),N=(0,h.default)(B,2),P=N[0],D=N[1],M=(0,v.useMemo)(function(){return v.default.Children.toArray(i)},[i]);(0,v.useEffect)(function(){if(P<M.length-1){var y=setTimeout(function(){D(function(x){return(x+1)%M.length})},g);return function(){return clearTimeout(y)}}},[P,g,M.length]);var W=(0,v.useMemo)(function(){var y=M.slice(0,P+1).reverse();return y},[P,M]);return v.default.createElement("div",(0,t.default)({className:(0,b.default)("flex flex-col items-center gap-4",m)},_),v.default.createElement(E.AnimatePresence,null,W.map(function(y){return v.default.createElement(s,{key:y.key},y)})))}),l=d.default=r}}]);
