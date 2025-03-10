(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[2145],{9:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(92188),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},556:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=r(e(96540)),d=e(55211),p=s(e(38913)),g=s(e(29492)),C=s(e(26718)),c=s(e(48632)),m=s(e(17329));function i(u){if(typeof WeakMap!="function")return null;var v=new WeakMap,_=new WeakMap;return(i=function(h){return h?_:v})(u)}function r(u,v){if(!v&&u&&u.__esModule)return u;if(u===null||f(u)!="object"&&typeof u!="function")return{default:u};var _=i(v);if(_&&_.has(u))return _.get(u);var E={__proto__:null},h=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var B in u)if(B!=="default"&&{}.hasOwnProperty.call(u,B)){var M=h?Object.getOwnPropertyDescriptor(u,B):null;M&&(M.get||M.set)?Object.defineProperty(E,B,M):E[B]=u[B]}return E.default=u,_&&_.set(u,E),E}var a=[{id:1,name:"\u300A\u548F\u67F3\u300B",title:"\u8D3A\u77E5\u7AE0",quote:"\u78A7\u7389\u5986\u6210\u4E00\u6811\u9AD8\uFF0C\u4E07\u6761\u5782\u4E0B\u7EFF\u4E1D\u7EE6\u3002\u4E0D\u77E5\u7EC6\u53F6\u8C01\u88C1\u51FA\uFF0C\u4E8C\u6708\u6625\u98CE\u4F3C\u526A\u5200\u3002",image:g.default},{id:2,name:"\u300A\u5C0F\u6C60\u300B",title:"\u6768\u4E07\u91CC",quote:"\u6CC9\u773C\u65E0\u58F0\u60DC\u7EC6\u6D41\uFF0C\u6811\u9634\u7167\u6C34\u7231\u6674\u67D4\u3002\u5C0F\u8377\u624D\u9732\u5C16\u5C16\u89D2\uFF0C\u65E9\u6709\u873B\u8713\u7ACB\u4E0A\u5934\u3002",image:C.default},{id:3,name:"\u300A\u5C71\u5C45\u79CB\u669D\u300B",title:"\u738B\u7EF4",quote:"\u7A7A\u5C71\u65B0\u96E8\u540E\uFF0C\u5929\u6C14\u665A\u6765\u79CB\u3002\u660E\u6708\u677E\u95F4\u7167\uFF0C\u6E05\u6CC9\u77F3\u4E0A\u6D41\u3002",image:c.default},{id:4,name:"\u300A\u9022\u96EA\u5BBF\u8299\u84C9\u5C71\u4E3B\u4EBA\u300B",title:"\u5218\u957F\u537F",quote:"\u65E5\u66AE\u82CD\u5C71\u8FDC\uFF0C\u5929\u5BD2\u767D\u5C4B\u8D2B\u3002\u67F4\u95E8\u95FB\u72AC\u5420\uFF0C\u98CE\u96EA\u591C\u5F52\u4EBA\u3002",image:m.default}],n=function(){var v=(0,t.useState)(a),_=(0,A.default)(v,2),E=_[0],h=_[1],B=t.default.useState(0),M=(0,A.default)(B,2),O=M[0],P=M[1];(0,t.useEffect)(function(){var j=E.length-1;O<0&&P(j),O>j&&P(0)},[O,E]);var R=null;(0,t.useEffect)(function(){return R=setInterval(function(){P(O+1)},5e3),function(){clearInterval(R)}},[O]);var D=function(T){clearInterval(R),P(T),R=setInterval(function(){P(function(W){return(W+1)%E.length})},5e3)};return t.default.createElement("section",{className:p.default.section},t.default.createElement("div",{className:p.default["section-center"]},E.map(function(j,T){var W=j.id,L=j.image,S=j.name,k=j.title,F=j.quote,Q=p.default.nextSlide;return T===O&&(Q=p.default.activeSlide),(T===O-1||O===0&&T===E.length-1)&&(Q=p.default.lastSlide),t.default.createElement("article",{className:Q,key:W},t.default.createElement("img",{src:L,alt:S,className:p.default["person-img"]}),t.default.createElement("h4",null,S),t.default.createElement("p",{className:p.default.title},k),t.default.createElement("p",{className:p.default.text},F),t.default.createElement(d.Quote,{className:p.default.icon}))}),t.default.createElement("button",{className:p.default.prev,onClick:function(){return D(O-1)}},t.default.createElement(d.ArrowLeft,null)),t.default.createElement("button",{className:p.default.next,onClick:function(){return D(O+1)}},t.default.createElement(d.ArrowRight,null))))},l=o.default=n},1273:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=g(e(96540)),d=e(21126);function p(i){if(typeof WeakMap!="function")return null;var r=new WeakMap,a=new WeakMap;return(p=function(l){return l?a:r})(i)}function g(i,r){if(!r&&i&&i.__esModule)return i;if(i===null||f(i)!="object"&&typeof i!="function")return{default:i};var a=p(r);if(a&&a.has(i))return a.get(i);var n={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in i)if(u!=="default"&&{}.hasOwnProperty.call(i,u)){var v=l?Object.getOwnPropertyDescriptor(i,u):null;v&&(v.get||v.set)?Object.defineProperty(n,u,v):n[u]=i[u]}return n.default=i,a&&a.set(i,n),n}var C=[{text:"\u5317\u98CE\u5439\u96EA\u56DB\u66F4\u521D\uFF0C\u5609\u745E\u5929\u6559\u53CA\u5C81\u9664\u3002",author:"\u9664\u591C\u96EA"},{text:"\u4E0D\u6C42\u89C1\u9762\u60DF\u901A\u8C12\uFF0C\u540D\u7EB8\u671D\u6765\u6EE1\u655D\u5E90\u3002",author:"\u5B88\u5C81"},{text:"\u534A\u76CF\u5C60\u82CF\u72B9\u672A\u4E3E\uFF0C\u706F\u524D\u5C0F\u8349\u5199\u6843\u7B26\u3002",author:"\u9664\u591C\u96EA"},{text:"\u6211\u4EA6\u968F\u4EBA\u6295\u6570\u7EB8\uFF0C\u4E16\u60C5\u5ACC\u7B80\u4E0D\u5ACC\u865A\u3002",author:"\u5B88\u5C81"}],c=function(){var r=(0,t.useState)(0),a=(0,A.default)(r,2),n=a[0],l=a[1];(0,t.useEffect)(function(){var M=setInterval(function(){l(function(O){return(O+1)%C.length})},3e3);return function(){clearInterval(M)}},[]);var u=C[n],v=u.text,_=u.author,E=u.image,h={initial:{opacity:0,y:"100%",scale:.1},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:"100%",scale:.1}},B={active:{scale:1.2,backgroundColor:"#3f3f46"},inactive:{scale:1,backgroundColor:"#D1D5DB"}};return t.default.createElement("section",{className:"py-12"},t.default.createElement("div",{className:"w-full max-w-2xl"},t.default.createElement(d.AnimatePresence,{mode:"popLayout"},t.default.createElement(d.motion.div,{key:n,initial:"initial",animate:"animate",exit:"exit",variants:h,className:"flex w-full flex-col items-center justify-center",transition:{type:"spring",stiffness:200,damping:20,duration:.5}},t.default.createElement("p",{className:"text m-0 text-center font-medium tracking-tight"},'"',v,'"'),t.default.createElement("div",{className:"mx-auto mt-5"},t.default.createElement("div",{className:"flex flex-col items-center justify-center space-x-3"},t.default.createElement("div",{className:"font-regular text-sm text-gray-900/80"},_)))),t.default.createElement("div",{className:"mt-8 flex justify-center"},C.map(function(M,O){return t.default.createElement(d.motion.div,{key:O,className:"mx-1 h-1 w-1 cursor-pointer rounded-full",variants:B,animate:O===n?"active":"inactive",onClick:function(){return l(O)}})})))))},m=o.default=c},1472:function(b,o,e){"use strict";"use client";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(54756)),A=s(e(29293)),t=s(e(85715)),d=e(96540),p=function(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},m=c.isCopiedDelay,i=m===void 0?2e3:m,r=(0,d.useState)(null),a=(0,t.default)(r,2),n=a[0],l=a[1],u=(0,d.useState)(!1),v=(0,t.default)(u,2),_=v[0],E=v[1];(0,d.useEffect)(function(){_&&setTimeout(function(){E(!1)},i)},[_,i]);var h=(0,d.useCallback)(function(){var B=(0,A.default)(f.default.mark(function M(O){var P;return f.default.wrap(function(D){for(;;)switch(D.prev=D.next){case 0:if((P=navigator)!==null&&P!==void 0&&P.clipboard){D.next=2;break}return D.abrupt("return",!1);case 2:return D.prev=2,D.next=5,navigator.clipboard.writeText(O);case 5:return l(O),E(!0),D.abrupt("return",!0);case 10:return D.prev=10,D.t0=D.catch(2),l(null),D.abrupt("return",!1);case 14:case"end":return D.stop()}},M,null,[[2,10]])}));return function(M){return B.apply(this,arguments)}}(),[]);return[n,h,_]},g=o.default=p},2724:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(42101),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},2857:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.truncate=o.trimTopic=o.toKebabCase=o.toFixedBug=o.toFixed=o.toCamelCase=o.sleep=o.shuffleArr=o.saveHtmlToPng=o.rgbToHex=o.reqStringify=o.readFromFile=o.randomString=o.randomNum=o.randomItem=o.randomHex=o.randomColor=o.random=o.promiseWithTimeout=o.prettyObject=o.pause=o.passwordStrength=o.oneApiChat=o.limitDecimal=o.lerp=o.isURLSearchParams=o.isPalindrome=o.isObject=o.isNotEmpty=o.isEqual=o.isEmptyArray=o.isDecimal=o.isDate=o.isDarkMode=o.isArray=o.hidePhone=o.hasFocus=o.getType=o.getRandomId=o.getParamObject=o.getImgsUrl=o.getFileType=o.getEnv=o.getDirection=o.getCurrentDate=o.formatScientific=o.formatRomanNumeral=o.formatPercentage=o.formatOrdinal=o.formatFileSize=o.fibonacci=o.fetchSomething=o.exportJsonData=o.exportFile=o.delay=o.dayDif=o.customizeTimer=o.copyTextToClipboard=o.clearCookies=o.checkIsLocalPage=o.capitalizeWords=o.capitalize=o.camelizeCamelCase=o.asyncTo=o.asyncAction=o.ThousandNum=o.RoundNum=o.RandomId=void 0;var f=s(e(54756)),A=s(e(29293)),t=s(e(41132)),d=s(e(73738)),p=e(55373),g=s(e(20354)),C=o.getEnv=function(){var y;return typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]"&&(y="NODE"),typeof XMLHttpRequest!="undefined"&&(y="BROWSER"),y},c=o.isArray=function(y){return(0,d.default)(y)==="object"&&Object.prototype.toString.call(y)==="[object Array]"},m=o.isURLSearchParams=function(y){return typeof URLSearchParams!="undefined"&&y instanceof URLSearchParams},i=o.isDate=function(y){return(0,d.default)(y)==="object"&&Object.prototype.toString.call(y)==="[object Date]"},r=o.isObject=function(y){return y!==null&&(0,d.default)(y)==="object"},a=o.getParamObject=function(y){return m(y)?(0,p.parse)(y.toString(),{strictNullHandling:!0}):typeof y=="string"?[y]:y},n=o.reqStringify=function(y){return(0,p.stringify)(y,{arrayFormat:"repeat",strictNullHandling:!0})},l=o.getType=function(y){var x=Object.prototype.toString.call(y),I=/\[object (.*?)\]/.exec(x);return I?I[1]:null},u=o.hidePhone=function(y){return y==null?void 0:y.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")},v=o.asyncAction=function(y){var x=Promise.resolve(y);return function(I){x.then(function(){return setTimeout(function(){return I()})})}},_=o.getImgsUrl=function(y){var x=/<img.*?(?:>|\/>)/gi,I=/src=['"]?([^'"]*)['"]?/i,K=y.match(x);if(!K)return null;var Z=K.reduce(function(J,oe){var ue=oe.match(I);return ue[1]?[].concat((0,t.default)(J),[ue[1]]):J},[]);return Z},E=o.customizeTimer={intervalTimer:null,timeoutTimer:null,setTimeout:function(y,x){var I=this,K=Date.now,Z=K(),J=Z,oe=function(){I.timeoutTimer=requestAnimationFrame(oe),J=K(),J-Z>=x&&(y(),cancelAnimationFrame(I.timeoutTimer))};return this.timeoutTimer=requestAnimationFrame(oe),this.timeoutTimer},clearTimeout:function(){cancelAnimationFrame(this.timeoutTimer)},setInterval:function(y,x){var I=this,K=Date.now,Z=K(),J=Z,oe=function(){I.intervalTimer=requestAnimationFrame(oe),J=K(),J-Z>=x&&(Z=K(),J=Z,y())};return this.intervalTimer=requestAnimationFrame(oe),this.intervalTimer},clearInterval:function(){cancelAnimationFrame(this.intervalTimer)}},h=o.isDecimal=function(y){var x=/(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/;return x.test(y)},B=o.limitDecimal=function(y){return y.replace(/^(-)*(\d+)\.(\d\d).*$/,"$1$2.$3")},M=o.passwordStrength=function(y){var x=/^(?=.*[A-Z])(?=.*[\d])(?=.*[a-z]).{8,}$/;return x.test(y)},O=o.checkIsLocalPage=function(){document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")return!1;if(document.visibilityState==="visible")return!0;window.addEventListener("pagehide",function(y){y.persisted},!1)})},P=o.randomHex=function(){return"#".concat(Math.floor(Math.random()*16777215).toString(16).padEnd(6,"0"))},R=o.rgbToHex=function(y,x,I){return"#".concat((1<<24|y<<16|x<<8|I).toString(16).slice(1))},D=o.fibonacci=function(y){for(var x=[0,1],I=2;I<y;I++)x.push(x[I-1]+x[I-2]);return x.slice(0,y)},j=o.lerp=function(y,x,I){return y+(x-y)*I},T=o.formatFileSize=function(y){var x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2;if(y===0)return"0 Bytes";var I=1024,K=["B","KB","MB","GB","TB"],Z=Math.floor(Math.log(y)/Math.log(I));return"".concat((y/Math.pow(I,Z)).toFixed(x)," ").concat(K[Z])},W=o.formatOrdinal=function(y){var x=["th","st","nd","rd"],I=y%100;return"".concat(y).concat(x[(I-20)%10]||x[I]||x[0])},L=o.formatPercentage=function(y){var x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2;return"".concat((y*100).toFixed(x),"%")},S=o.formatRomanNumeral=function(y){for(var x=[{value:1e3,numeral:"M"},{value:900,numeral:"CM"},{value:500,numeral:"D"},{value:400,numeral:"CD"},{value:100,numeral:"C"},{value:90,numeral:"XC"},{value:50,numeral:"L"},{value:40,numeral:"XL"},{value:10,numeral:"X"},{value:9,numeral:"IX"},{value:5,numeral:"V"},{value:4,numeral:"IV"},{value:1,numeral:"I"}],I="",K=0,Z=x;K<Z.length;K++)for(var J=Z[K],oe=J.value,ue=J.numeral;y>=oe;)I+=ue,y-=oe;return I},k=o.formatScientific=function(y){var x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2;return toExponential(x)},F=o.capitalizeWords=function(y){return y.replace(/\b\w/g,function(x){return x.toUpperCase()})},Q=o.isPalindrome=function(y){var x=y.toLowerCase().replace(/[^a-z0-9]/g,"");return x===x.split("").reverse().join("")},z=o.toCamelCase=function(y){return y.replace(/\W+(.)/g,function(x,I){return I.toUpperCase()})},w=o.toKebabCase=function(y){return y.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g,"").replace(/([a-z])([A-Z])/g,function(x,I,K){return"".concat(I,"_").concat(K.toLowerCase())}).replace(/[^A-Za-z0-9]+|_+/g,"-").toLowerCase()},N=o.truncate=function(y,x){return y.length>x?y.slice(0,x)+"...":y},V=o.delay=function(y){return new Promise(function(x){return setTimeout(x,y)})},X=o.clearCookies=document.cookie.split(";").forEach(function(U){return document.cookie=U.replace(/^ +/,"").replace(/[=].*/,"=;expires=".concat(new Date(0).toUTCString(),";path=/"))}),q=o.dayDif=function(y,x){return Math.ceil(Math.abs(y.getTime()-x.getTime())/864e5)},Y=o.capitalize=function(y){return y.charAt(0).toUpperCase()+y.slice(1)},te=o.isNotEmpty=function(y){return Array.isArray(y)&&y.length>0},ie=o.isDarkMode=window.matchMedia("(prefers-color-scheme: dark)").matches,_e=o.fetchSomething=function(){return new Promise(function(y){setTimeout(function(){y("")},1e3)})},ce=o.toFixed=function(y,x){if(typeof y!="number")throw new Error("number\u4E0D\u662F\u6570\u5B57");var I=Math.round(Math.pow(10,x)*y)/Math.pow(10,x);if(I=String(I),I.indexOf(".")===-1)x!==0&&(I+=".",I+=new Array(x+1).join("0"));else{var K=I.split(".");K[1].length<x&&(K[1]+=new Array(x-K[1].length+1).join("0")),I=K.join(".")}return I},he=o.toFixedBug=function(y,x){return~~(Math.pow(10,x)*y)/Math.pow(10,x)},ne=o.promiseWithTimeout=function(y,x){var I=new Promise(function(K){return setTimeout(function(){return K("Time Out!")},x)});return Promise.race([I,y])},G=o.shuffleArr=function(y){return y.sort(function(){return .5-Math.random()})},re=o.sleep=function(y){return new Promise(function(x){return setTimeout(function(){return x()},y)})},le=o.ThousandNum=function(y){return y.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},$=o.RandomId=function(y){return Math.random().toString(36).substring(3,y)},H=o.RoundNum=function(y,x){return Math.round(y*Math.pow(10,x))/Math.pow(10,x)},se=o.randomNum=function(y,x){return Math.floor(Math.random()*(x-y+1))+y},ee=o.isEmptyArray=function(y){return Array.isArray(y)&&!y.length},Ae=o.randomItem=function(y){return y[Math.floor(Math.random()*y.length)]},fe=o.asyncTo=function(y){return y.then(function(x){return[null,x]}).catch(function(x){return[x]})},Me=o.hasFocus=function(y){return y===document.activeElement},me=o.isEqual=function(y,x){return JSON.stringify(y)===JSON.stringify(x)},ye=o.randomString=function(){return Math.random().toString(36).slice(2)},xe=o.random=function(y,x){return Math.floor(Math.random()*(x-y+1)+y)},ge=o.randomColor=function(){return"#".concat(Math.random().toString(16).slice(2,8).padEnd(6,"0"))},pe=o.pause=function(y){return new Promise(function(x){return setTimeout(x,y)})},Ie=o.camelizeCamelCase=function(y){return y.replace(/(?:^\w|[A-Z]|\b\w)/g,function(x,I){return I===0?x.toLowerCase():x.toUpperCase()}).replace(/\s+/g,"")},Le=o.copyTextToClipboard=function(){var U=(0,A.default)(f.default.mark(function y(x){var I;return f.default.wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:if(Z.prev=0,!((I=navigator)!==null&&I!==void 0&&(I=I.clipboard)!==null&&I!==void 0&&I.writeText)){Z.next=4;break}return Z.next=4,navigator.clipboard.writeText(x);case 4:Z.next=8;break;case 6:Z.prev=6,Z.t0=Z.catch(0);case 8:case"end":return Z.stop()}},y,null,[[0,6]])}));return function(x){return U.apply(this,arguments)}}(),ae=o.getRandomId=function(){for(var y="",x="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",I=0;I<32;I++)y+=x.charAt(Math.floor(Math.random()*x.length));return y},Re=o.oneApiChat=function(y,x,I){return fetch("https://api.openai.com/v1/chat/completions",{method:"POST",signal:I,headers:{Authorization:x,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:y,stream:!0})})},Pe=o.getCurrentDate=function(){var y=new Date,x=y.getDate(),I=y.getMonth()+1,K=y.getFullYear();return"".concat(K,"-").concat(I,"-").concat(x)},Te=o.exportJsonData=function(y){var x=Pe(),I=JSON.stringify(JSON.parse(y),null,2),K=new Blob([I],{type:"application/json"}),Z=URL.createObjectURL(K),J=document.createElement("a");J.href=Z,J.download="chat-store_".concat(x,".json"),document.body.appendChild(J),J.click(),document.body.removeChild(J)},Se=o.saveHtmlToPng=function(){var U=(0,A.default)(f.default.mark(function y(x,I,K){var Z,J,oe,ue;return f.default.wrap(function(Ce){for(;;)switch(Ce.prev=Ce.next){case 0:return Ce.prev=0,Z=x!=null?x:document.getElementById("image-wrapper"),Ce.next=4,(0,g.default)(Z,{useCORS:!0});case 4:J=Ce.sent,oe=J.toDataURL("image/png"),ue=document.createElement("a"),ue.style.display="none",ue.href=oe,ue.setAttribute("download","chat-shot.png"),typeof ue.download=="undefined"&&ue.setAttribute("target","_blank"),document.body.appendChild(ue),ue.click(),document.body.removeChild(ue),window.URL.revokeObjectURL(oe),I&&I(),Promise.resolve(),Ce.next=22;break;case 19:Ce.prev=19,Ce.t0=Ce.catch(0),K&&K(Ce.t0.message);case 22:case"end":return Ce.stop()}},y,null,[[0,19]])}));return function(x,I,K){return U.apply(this,arguments)}}(),We=o.trimTopic=function(y){return y.replace(/[，。！？”“"、,.!?]*$/,"")},Ue=o.readFromFile=function(){return new Promise(function(y,x){var I=document.createElement("input");I.type="file",I.accept="application/json",I.onchange=function(K){var Z=K.target.files[0],J=new FileReader;J.onload=function(oe){y(oe.target.result)},J.onerror=function(oe){return x(new Error(oe))},J.readAsText(Z)},I.click()})},Fe=o.prettyObject=function(y){var x="";return typeof y!="string"&&(x=JSON.stringify(y,null,"  ")),x==="{}"?x.toString():x.startsWith("```json")?x:["```json",x,"```"].join(`
`)},Ke=o.getFileType=function(y,x){var I=x.split(".").pop().toLowerCase();switch(I){case"txt":return"text/plain";case"json":return"application/json";case"doc":return"application/msword";case"docx":return"application/vnd.openxmlformats-officedocument.wordprocessingml.document";case"xls":return"application/vnd.ms-excel";case"xlsx":return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";case"ppt":return"application/vnd.ms-powerpoint";case"pptx":return"application/vnd.openxmlformats-officedocument.presentationml.presentation";case"pdf":return"application/pdf";case"jpg":case"jpeg":return"image/jpeg";case"png":return"image/png";case"gif":return"image/gif";case"zip":return"application/zip";case"rar":return"application/x-rar-compressed";default:if(typeof y=="string")try{return JSON.parse(y),"application/json"}catch(K){return"text/plain"}else return y instanceof Uint8Array||y instanceof ArrayBuffer,"application/octet-stream"}},de=o.exportFile=function(y,x){var I;if((y==null||(I=y.headers["content-type"])===null||I===void 0?void 0:I.indexOf("application/json"))===-1){var K=y.headers&&y.headers["content-disposition"]||"attachment;filename=".concat(x||"file",".xlsx"),Z=decodeURI(K==null?void 0:K.split("=")[1].replace(/'/g,"")).replace(/"/g,"").replace("utf-8''","")||"",J=Ke(y.data,x||Z),oe=new Blob([y.data],{type:J}),ue=URL.createObjectURL(oe),be=document.createElement("a");document.body.appendChild(be),be.style="display: none",be.href=ue,be.download=Z,be.click(),document.body.removeChild(be)}},je=o.getDirection=function(y,x){var I=x.getBoundingClientRect(),K=I.width,Z=I.height,J=I.left,oe=I.top,ue=y.clientX-J-K/2*(K>Z?Z/K:1),be=y.clientY-oe-Z/2*(Z>K?K/Z:1),Ce=Math.round(Math.atan2(be,ue)/1.57079633+5)%4;return Ce}},4204:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=g(e(96540)),d=e(65848);function p(i){if(typeof WeakMap!="function")return null;var r=new WeakMap,a=new WeakMap;return(p=function(l){return l?a:r})(i)}function g(i,r){if(!r&&i&&i.__esModule)return i;if(i===null||f(i)!="object"&&typeof i!="function")return{default:i};var a=p(r);if(a&&a.has(i))return a.get(i);var n={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in i)if(u!=="default"&&{}.hasOwnProperty.call(i,u)){var v=l?Object.getOwnPropertyDescriptor(i,u):null;v&&(v.get||v.set)?Object.defineProperty(n,u,v):n[u]=i[u]}return n.default=i,a&&a.set(i,n),n}function C(i){return 1-Math.pow(1-i,3)}var c=function(r){var a=r.icons,n=r.images,l=(0,t.useRef)(null),u=(0,t.useState)([]),v=(0,A.default)(u,2),_=v[0],E=v[1],h=(0,t.useState)({x:0,y:0}),B=(0,A.default)(h,2),M=B[0],O=B[1],P=(0,t.useState)(!1),R=(0,A.default)(P,2),D=R[0],j=R[1],T=(0,t.useState)({x:0,y:0}),W=(0,A.default)(T,2),L=W[0],S=W[1],k=(0,t.useState)({x:0,y:0}),F=(0,A.default)(k,2),Q=F[0],z=F[1],w=(0,t.useState)(null),N=(0,A.default)(w,2),V=N[0],X=N[1],q=(0,t.useRef)(),Y=(0,t.useRef)(M),te=(0,t.useRef)([]),ie=(0,t.useRef)([]);(0,t.useEffect)(function(){if(!(!a&&!n)){var ne=a||n||[];ie.current=new Array(ne.length).fill(!1);var G=ne.map(function(re,le){var $=document.createElement("canvas");$.width=40,$.height=40;var H=$.getContext("2d");if(H)if(n){var se=new Image;se.crossOrigin="anonymous",se.src=ne[le],se.onload=function(){H.clearRect(0,0,$.width,$.height),H.beginPath(),H.arc(20,20,20,0,Math.PI*2),H.closePath(),H.clip(),H.drawImage(se,0,0,40,40),ie.current[le]=!0}}else{H.scale(.4,.4);var ee=(0,d.renderToString)(re),Ae=new Image;Ae.src="data:image/svg+xml;base64,"+btoa(ee),Ae.onload=function(){H.clearRect(0,0,$.width,$.height),H.drawImage(Ae,0,0),ie.current[le]=!0}}return $});te.current=G}},[a,n]),(0,t.useEffect)(function(){for(var ne=a||n||[],G=[],re=ne.length||20,le=2/re,$=Math.PI*(3-Math.sqrt(5)),H=0;H<re;H++){var se=H*le-1+le/2,ee=Math.sqrt(1-se*se),Ae=H*$,fe=Math.cos(Ae)*ee,Me=Math.sin(Ae)*ee;G.push({x:fe*100,y:se*100,z:Me*100,scale:1,opacity:1,id:H})}E(G)},[a,n]);var _e=function(G){var re,le=(re=l.current)===null||re===void 0?void 0:re.getBoundingClientRect();if(!(!le||!l.current)){var $=G.clientX-le.left,H=G.clientY-le.top,se=l.current.getContext("2d");se&&(_.forEach(function(ee){var Ae,fe,Me=Math.cos(Y.current.x),me=Math.sin(Y.current.x),ye=Math.cos(Y.current.y),xe=Math.sin(Y.current.y),ge=ee.x*ye-ee.z*xe,pe=ee.x*xe+ee.z*ye,Ie=ee.y*Me+pe*me,Le=((Ae=l.current)===null||Ae===void 0?void 0:Ae.width)/2+ge,ae=((fe=l.current)===null||fe===void 0?void 0:fe.height)/2+Ie,Re=(pe+200)/300,Pe=20*Re,Te=$-Le,Se=H-ae;if(Te*Te+Se*Se<Pe*Pe){var We=-Math.atan2(ee.y,Math.sqrt(ee.x*ee.x+ee.z*ee.z)),Ue=Math.atan2(ee.x,ee.z),Fe=Y.current.x,Ke=Y.current.y,de=Math.sqrt(Math.pow(We-Fe,2)+Math.pow(Ue-Ke,2)),je=Math.min(2e3,Math.max(800,de*1e3));X({x:We,y:Ue,startX:Fe,startY:Ke,distance:de,startTime:performance.now(),duration:je});return}}),j(!0),S({x:G.clientX,y:G.clientY}))}},ce=function(G){var re,le=(re=l.current)===null||re===void 0?void 0:re.getBoundingClientRect();if(le){var $=G.clientX-le.left,H=G.clientY-le.top;z({x:$,y:H})}if(D){var se=G.clientX-L.x,ee=G.clientY-L.y;Y.current={x:Y.current.x+ee*.002,y:Y.current.y+se*.002},S({x:G.clientX,y:G.clientY})}},he=function(){j(!1)};return(0,t.useEffect)(function(){var ne=l.current,G=ne==null?void 0:ne.getContext("2d");if(!(!ne||!G)){var re=function(){G.clearRect(0,0,ne.width,ne.height);var $=ne.width/2,H=ne.height/2,se=Math.sqrt($*$+H*H),ee=Q.x-$,Ae=Q.y-H,fe=Math.sqrt(ee*ee+Ae*Ae),Me=.003+fe/se*.01;if(V){var me=performance.now()-V.startTime,ye=Math.min(1,me/V.duration),xe=C(ye);Y.current={x:V.startX+(V.x-V.startX)*xe,y:V.startY+(V.y-V.startY)*xe},ye>=1&&X(null)}else D||(Y.current={x:Y.current.x+Ae/ne.height*Me,y:Y.current.y+ee/ne.width*Me});_.forEach(function(ge,pe){var Ie=Math.cos(Y.current.x),Le=Math.sin(Y.current.x),ae=Math.cos(Y.current.y),Re=Math.sin(Y.current.y),Pe=ge.x*ae-ge.z*Re,Te=ge.x*Re+ge.z*ae,Se=ge.y*Ie+Te*Le,We=(Te+200)/300,Ue=Math.max(.2,Math.min(1,(Te+150)/200));G.save(),G.translate(ne.width/2+Pe,ne.height/2+Se),G.scale(We,We),G.globalAlpha=Ue,a||n?te.current[pe]&&ie.current[pe]&&G.drawImage(te.current[pe],-20,-20,40,40):(G.beginPath(),G.arc(0,0,20,0,Math.PI*2),G.fillStyle="#4444ff",G.fill(),G.fillStyle="white",G.textAlign="center",G.textBaseline="middle",G.font="16px Arial",G.fillText("".concat(ge.id+1),0,0)),G.restore()}),q.current=requestAnimationFrame(re)};return re(),function(){q.current&&cancelAnimationFrame(q.current)}}},[a,n,_,D,Q,V]),t.default.createElement("canvas",{ref:l,width:360,height:360,onMouseDown:_e,onMouseMove:ce,onMouseUp:he,onMouseLeave:he})},m=o.default=c},6731:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(94634)),A=s(e(85715)),t=s(e(91847)),d=s(e(96540)),p=s(e(21652)),g=["alt","src","className","loadInitially","observerOptions"],C=function(i){var r=i.alt,a=i.src,n=i.className,l=i.loadInitially,u=l===void 0?!1:l,v=i.observerOptions,_=v===void 0?{root:null,rootMargin:"200px 0px"}:v,E=(0,t.default)(i,g),h=d.default.useRef(null),B=d.default.useRef(null),M=d.default.useState(u),O=(0,A.default)(M,2),P=O[0],R=O[1],D=d.default.useCallback(function(j){j[0].isIntersecting&&(h.current.disconnect(),R(!0))},[h]);return d.default.useEffect(function(){if(!u){if("loading"in HTMLImageElement.prototype){R(!0);return}return h.current=new IntersectionObserver(D,_),h.current.observe(B.current),function(){h.current.disconnect()}}},[]),d.default.createElement("figure",{className:p.default.hoverRotate},d.default.createElement("img",(0,f.default)({alt:r,src:P?a:null,ref:B,className:n,loading:u?void 0:"lazy"},E)),d.default.createElement("figcaption",null,d.default.createElement("h3",null,"Lorem ",d.default.createElement("br",null),"Ipsum")))},c=o.default=C},6901:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=e(23947),t=function(g){var C=g.children;return f.default.createElement(A.motion.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{ease:"linear",duration:1,y:{duration:.5}}},C)},d=o.default=t},7629:function(b,o,e){"use strict";"use client";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.ReactSignature=n;var A=s(e(94634)),t=s(e(85715)),d=s(e(91847)),p=s(e(71508)),g=s(e(33560)),C=e(55211),c=a(e(96540)),m=e(63859),i=["className"];function r(h){if(typeof WeakMap!="function")return null;var B=new WeakMap,M=new WeakMap;return(r=function(P){return P?M:B})(h)}function a(h,B){if(!B&&h&&h.__esModule)return h;if(h===null||f(h)!="object"&&typeof h!="function")return{default:h};var M=r(B);if(M&&M.has(h))return M.get(h);var O={__proto__:null},P=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var R in h)if(R!=="default"&&{}.hasOwnProperty.call(h,R)){var D=P?Object.getOwnPropertyDescriptor(h,R):null;D&&(D.get||D.set)?Object.defineProperty(O,R,D):O[R]=h[R]}return O.default=h,M&&M.set(h,O),O}function n(h){var B,M,O=h.className,P=(0,d.default)(h,i),R=(0,c.useState)(!1),D=(0,t.default)(R,2),j=D[0],T=D[1],W=(0,c.useRef)(null),L=function(){var F;return(F=W.current)===null||F===void 0?void 0:F.clear()},S=function(){if(j){var F;(F=W.current)===null||F===void 0||F.clear(),T(!1)}else T(!0)};return c.default.createElement("div",{className:"flex flex-col gap-2"},c.default.createElement("p",{className:"text-lg tracking-tight text-neutral-500"},"\u6570\u5B57\u7B7E\u540D\uFF1A"),c.default.createElement(g.default,(0,A.default)({className:(0,p.default)("h-28 w-80 rounded-lg border border-neutral-500/20 bg-neutral-500/10",j?"cursor-not-allowed fill-neutral-500":"fill-neutral-800 dark:fill-neutral-200",O),options:{smoothing:0,streamline:.8,thinning:.7},readonly:j},P,{ref:W})),c.default.createElement("div",{className:"flex justify-end gap-1 text-neutral-700 dark:text-neutral-200"},c.default.createElement(u,{onClick:S,readonly:j}),j&&c.default.createElement(c.default.Fragment,null,c.default.createElement(v,{svgElement:(B=W.current)===null||B===void 0?void 0:B.svg}),c.default.createElement(_,{svgElement:(M=W.current)===null||M===void 0?void 0:M.svg})),!j&&c.default.createElement(E,{onClick:L})))}function l(h){var B=h.cloneNode(!0),M=h.clientWidth,O=h.clientHeight;return B.removeAttribute("style"),B.setAttribute("width","".concat(M,"px")),B.setAttribute("height","".concat(O,"px")),B.setAttribute("viewBox","0 0 ".concat(M," ").concat(O)),{svgElm:B,clientWidth:M,clientHeight:O}}function u(h){var B=h.readonly,M=h.onClick;return c.default.createElement("button",{className:"inline-grid size-8 place-content-center rounded-md border border-neutral-500/10 bg-neutral-500/10 hover:bg-neutral-500/20",onClick:M,type:"button"},B?c.default.createElement(c.default.Fragment,null,c.default.createElement(C.RefreshCcwIcon,{className:"size-5"}),c.default.createElement("span",{className:"sr-only"},"Reset")):c.default.createElement(c.default.Fragment,null,c.default.createElement(C.CheckIcon,{className:"size-5"}),c.default.createElement("span",{className:"sr-only"},"Validate")))}function v(h){var B=h.svgElement,M=function(){if(B){var P=l(B),R=P.svgElm,D=P.clientWidth,j=P.clientHeight,T=new XMLSerializer().serializeToString(R),W=document.createElement("canvas"),L=W.getContext("2d"),S=new Image;S.onload=function(){W.width=D!=null?D:0,W.height=j!=null?j:0,L==null||L.drawImage(S,0,0);var k=document.createElement("a");k.download="signature.png",k.href=W.toDataURL("image/png"),k.click()},S.src="data:image/svg+xml;base64,".concat(window.btoa(decodeURIComponent(encodeURIComponent(T))))}};return c.default.createElement("button",{className:"inline-grid size-8 place-content-center rounded-md border border-neutral-500/10 bg-neutral-500/10 hover:bg-neutral-500/20",onClick:M,type:"button"},c.default.createElement(C.DownloadIcon,{className:"size-5"}),c.default.createElement("span",{className:"sr-only"},"Download"))}function _(h){var B=h.svgElement,M=(0,m.useCopy)(),O=(0,t.default)(M,3),P=O[0],R=O[1],D=O[2],j=function(){if(B){var W=l(B),L=W.svgElm;R(L.outerHTML)}};return c.default.createElement("button",{className:"inline-flex items-center gap-1 rounded-md border border-neutral-500/10 bg-neutral-500/10 px-1 text-sm tracking-tight hover:bg-neutral-500/20",onClick:j,type:"button"},D?c.default.createElement(c.default.Fragment,null,c.default.createElement("span",null,"Copied"),c.default.createElement(C.CheckIcon,{className:"size-5"})):c.default.createElement(c.default.Fragment,null,c.default.createElement("span",null,"Copy to SVG"),c.default.createElement(C.CopyIcon,{className:"size-5"})))}function E(h){var B=h.onClick;return c.default.createElement("button",{className:"inline-grid size-8 place-content-center rounded-md border border-neutral-500/10 bg-neutral-500/10 hover:bg-neutral-500/20",onClick:B,type:"button"},c.default.createElement(C.Eraser,{className:"size-5"}),c.default.createElement("span",{className:"sr-only"},"Clear"))}},7867:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.background--V0AeH {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  background-color: #ff99df;\r
  background-image:\r
    radial-gradient(circle at 52% 73%, hsl(310deg 85% 67% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 0% 30%, hsl(197deg 90% 76% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 41% 26%, hsl(234deg 79% 69% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 41% 51%, hsl(41deg 70% 63% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 41% 88%, hsl(36deg 83% 61% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 76% 73%, hsl(346deg 69% 70% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 29% 37%, hsl(272deg 96% 64% / 100%) 0, transparent 50%);\r
  background-size: 150% 150%;\r
  filter: blur(10px);\r
  animation: move-background--h74DC 10s linear infinite;\r
}\r
\r
@keyframes move-background--h74DC {\r
  0% {\r
    background-size: 100% 100%;\r
  }\r
\r
  10% {\r
    background-size: 120% 80%;\r
  }\r
\r
  20% {\r
    background-size: 190% 140%;\r
  }\r
\r
  30% {\r
    background-size: 130% 110%;\r
  }\r
\r
  40% {\r
    background-size: 150% 120%;\r
  }\r
\r
  50% {\r
    background-size: 180% 100%;\r
  }\r
\r
  60% {\r
    background-size: 220% 80%;\r
  }\r
\r
  70% {\r
    background-size: 100% 50%;\r
  }\r
\r
  80% {\r
    background-size: 120% 70%;\r
  }\r
\r
  90% {\r
    background-size: 110% 90%;\r
  }\r
\r
  100% {\r
    background-size: 100% 100%;\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/MeshGradientBackground/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB;;;;;;;qFAOmF;EACnF,0BAA0B;EAC1B,kBAAkB;EAClB,qDAA8C;AAChD;;AAEA;EACE;IACE,0BAA0B;EAC5B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,0BAA0B;EAC5B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,0BAA0B;EAC5B;AACF",sourcesContent:[`.background {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  background-color: #ff99df;\r
  background-image:\r
    radial-gradient(circle at 52% 73%, hsl(310deg 85% 67% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 0% 30%, hsl(197deg 90% 76% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 41% 26%, hsl(234deg 79% 69% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 41% 51%, hsl(41deg 70% 63% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 41% 88%, hsl(36deg 83% 61% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 76% 73%, hsl(346deg 69% 70% / 100%) 0, transparent 50%),\r
    radial-gradient(circle at 29% 37%, hsl(272deg 96% 64% / 100%) 0, transparent 50%);\r
  background-size: 150% 150%;\r
  filter: blur(10px);\r
  animation: move-background 10s linear infinite;\r
}\r
\r
@keyframes move-background {\r
  0% {\r
    background-size: 100% 100%;\r
  }\r
\r
  10% {\r
    background-size: 120% 80%;\r
  }\r
\r
  20% {\r
    background-size: 190% 140%;\r
  }\r
\r
  30% {\r
    background-size: 130% 110%;\r
  }\r
\r
  40% {\r
    background-size: 150% 120%;\r
  }\r
\r
  50% {\r
    background-size: 180% 100%;\r
  }\r
\r
  60% {\r
    background-size: 220% 80%;\r
  }\r
\r
  70% {\r
    background-size: 100% 50%;\r
  }\r
\r
  80% {\r
    background-size: 120% 70%;\r
  }\r
\r
  90% {\r
    background-size: 110% 90%;\r
  }\r
\r
  100% {\r
    background-size: 100% 100%;\r
  }\r
}\r
`],sourceRoot:""}]),d.locals={background:"background--V0AeH","move-background":"move-background--h74DC",moveBackground:"move-background--h74DC"},o.A=d},10766:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(36579),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},11530:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.placeholder--japL8 {\r
  width: 100%;\r
}\r
\r
.faux-image-wrapper--XUkhI {\r
  margin-bottom: 10px;\r
  position: relative;\r
  width: 100px;\r
  height: 100px;\r
}\r
\r
.faux-image--jW9eM {\r
  background: #ddd;\r
  border-radius: 4px;\r
  position: absolute;\r
  height: 100%;\r
  width: 100%;\r
  animation: pulse--GkzDV 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\r
}\r
\r
.faux-text--npYJI {\r
  background: #ddd;\r
  border-radius: 4px;\r
  height: 20px;\r
  margin-bottom: 5px;\r
  animation: pulse--GkzDV 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\r
}\r
\r
.faux-text--npYJI.short--IDBVM {\r
  width: 75%;\r
}\r
\r
.faux-text--npYJI.min-short--iTXAn {\r
  width: 45%;\r
}\r
\r
.shimmer--rIetr {\r
  overflow: hidden;\r
  position: relative;\r
}\r
\r
.shimmer--rIetr::before {\r
  content: '';\r
  position: absolute;\r
\r
  /* background: linear-gradient(90deg, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 40%) 50%, rgb(255 255 255 / 0%) 100%); */\r
  height: 100%;\r
  width: 100%;\r
  z-index: 1;\r
  border-radius: 4px;\r
\r
  /*  animation: shimmer 1s infinite; */\r
\r
  /* animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite; */\r
}\r
\r
@keyframes shimmer--rIetr {\r
  0% {\r
    transform: translateX(-100%);\r
  }\r
\r
  100% {\r
    transform: translateX(100%);\r
  }\r
}\r
\r
@keyframes pulse--GkzDV {\r
  50% {\r
    opacity: 0.5;\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/SkeletonFix/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;AACb;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;EAClB,YAAY;EACZ,WAAW;EACX,gEAAyD;AAC3D;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,YAAY;EACZ,kBAAkB;EAClB,gEAAyD;AAC3D;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,kBAAkB;;EAElB,0HAA0H;EAC1H,YAAY;EACZ,WAAW;EACX,UAAU;EACV,kBAAkB;;EAElB,qCAAqC;;EAErC,0DAA0D;AAC5D;;AAEA;EACE;IACE,4BAA4B;EAC9B;;EAEA;IACE,2BAA2B;EAC7B;AACF;;AAEA;EACE;IACE,YAAY;EACd;AACF",sourcesContent:[`.placeholder {\r
  width: 100%;\r
}\r
\r
.faux-image-wrapper {\r
  margin-bottom: 10px;\r
  position: relative;\r
  width: 100px;\r
  height: 100px;\r
}\r
\r
.faux-image {\r
  background: #ddd;\r
  border-radius: 4px;\r
  position: absolute;\r
  height: 100%;\r
  width: 100%;\r
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\r
}\r
\r
.faux-text {\r
  background: #ddd;\r
  border-radius: 4px;\r
  height: 20px;\r
  margin-bottom: 5px;\r
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\r
}\r
\r
.faux-text.short {\r
  width: 75%;\r
}\r
\r
.faux-text.min-short {\r
  width: 45%;\r
}\r
\r
.shimmer {\r
  overflow: hidden;\r
  position: relative;\r
}\r
\r
.shimmer::before {\r
  content: '';\r
  position: absolute;\r
\r
  /* background: linear-gradient(90deg, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 40%) 50%, rgb(255 255 255 / 0%) 100%); */\r
  height: 100%;\r
  width: 100%;\r
  z-index: 1;\r
  border-radius: 4px;\r
\r
  /*  animation: shimmer 1s infinite; */\r
\r
  /* animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite; */\r
}\r
\r
@keyframes shimmer {\r
  0% {\r
    transform: translateX(-100%);\r
  }\r
\r
  100% {\r
    transform: translateX(100%);\r
  }\r
}\r
\r
@keyframes pulse {\r
  50% {\r
    opacity: 0.5;\r
  }\r
}\r
`],sourceRoot:""}]),d.locals={placeholder:"placeholder--japL8","faux-image-wrapper":"faux-image-wrapper--XUkhI",fauxImageWrapper:"faux-image-wrapper--XUkhI","faux-image":"faux-image--jW9eM",fauxImage:"faux-image--jW9eM",pulse:"pulse--GkzDV","faux-text":"faux-text--npYJI",fauxText:"faux-text--npYJI",short:"short--IDBVM","min-short":"min-short--iTXAn",minShort:"min-short--iTXAn",shimmer:"shimmer--rIetr"},o.A=d},11845:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(41132)),t=g(e(96540)),d=e(21126);function p(i){if(typeof WeakMap!="function")return null;var r=new WeakMap,a=new WeakMap;return(p=function(l){return l?a:r})(i)}function g(i,r){if(!r&&i&&i.__esModule)return i;if(i===null||f(i)!="object"&&typeof i!="function")return{default:i};var a=p(r);if(a&&a.has(i))return a.get(i);var n={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in i)if(u!=="default"&&{}.hasOwnProperty.call(i,u)){var v=l?Object.getOwnPropertyDescriptor(i,u):null;v&&(v.get||v.set)?Object.defineProperty(n,u,v):n[u]=i[u]}return n.default=i,a&&a.set(i,n),n}var C=function(){var r=function(){return Math.random()*4-2},a=function(){return Math.random()},n=function(){return Math.random()};return t.default.createElement("div",{className:"absolute inset-0"},(0,A.default)(Array(80)).map(function(l,u){return t.default.createElement(d.motion.span,{key:"star-".concat(u),animate:{top:"calc(".concat(n()*100,"% + ").concat(r(),"px)"),left:"calc(".concat(n()*100,"% + ").concat(r(),"px)"),opacity:a(),scale:[1,1.2,0]},transition:{duration:n()*10+20,repeat:1/0,ease:"linear"},style:{position:"absolute",top:"".concat(n()*100,"%"),left:"".concat(n()*100,"%"),width:"2px",height:"2px",backgroundColor:"white",borderRadius:"50%",zIndex:1},className:"inline-block"})}))},c=(0,t.memo)(C),m=o.default=c},12005:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=p(e(96540)),t=s(e(12076));function d(c){if(typeof WeakMap!="function")return null;var m=new WeakMap,i=new WeakMap;return(d=function(a){return a?i:m})(c)}function p(c,m){if(!m&&c&&c.__esModule)return c;if(c===null||f(c)!="object"&&typeof c!="function")return{default:c};var i=d(m);if(i&&i.has(c))return i.get(c);var r={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in c)if(n!=="default"&&{}.hasOwnProperty.call(c,n)){var l=a?Object.getOwnPropertyDescriptor(c,n):null;l&&(l.get||l.set)?Object.defineProperty(r,n,l):r[n]=c[n]}return r.default=c,i&&i.set(c,r),r}var g=function(){var m=(0,A.useRef)(null);return(0,A.useLayoutEffect)(function(){var i=m.current,r=function(n){var l=n.target.getBoundingClientRect(),u=n.clientX-l.left,v=n.clientY-l.top;i.style.setProperty("--x",u+"px"),i.style.setProperty("--y",v+"px")};return i.addEventListener("mousemove",r),function(){i.removeEventListener("mousemove",r)}},[]),A.default.createElement("button",{className:t.default.gradientTracking,ref:m},A.default.createElement("span",null,"Hover me"))},C=o.default=g},12076:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(98827),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},13187:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=s(e(87834)),t=function(g){var C=g.text,c=/((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;return f.default.createElement(f.default.Fragment,null,C.split(c).map(function(m,i){var r=m.match(c);if(r){var a=r[0];return f.default.createElement("a",{key:i,className:A.default.squiggle,target:"_blank",href:a.startsWith("http")?a:"http://".concat(a)},a)}return m}))},d=o.default=t},14278:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(99827),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},14726:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(43693)),t=g(e(96540)),d=e(74848);function p(r){if(typeof WeakMap!="function")return null;var a=new WeakMap,n=new WeakMap;return(p=function(u){return u?n:a})(r)}function g(r,a){if(!a&&r&&r.__esModule)return r;if(r===null||f(r)!="object"&&typeof r!="function")return{default:r};var n=p(a);if(n&&n.has(r))return n.get(r);var l={__proto__:null},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in r)if(v!=="default"&&{}.hasOwnProperty.call(r,v)){var _=u?Object.getOwnPropertyDescriptor(r,v):null;_&&(_.get||_.set)?Object.defineProperty(l,v,_):l[v]=r[v]}return l.default=r,n&&n.set(r,l),l}function C(r,a){var n=Object.keys(r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(r);a&&(l=l.filter(function(u){return Object.getOwnPropertyDescriptor(r,u).enumerable})),n.push.apply(n,l)}return n}function c(r){for(var a=1;a<arguments.length;a++){var n=arguments[a]!=null?arguments[a]:{};a%2?C(Object(n),!0).forEach(function(l){(0,A.default)(r,l,n[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(l){Object.defineProperty(r,l,Object.getOwnPropertyDescriptor(n,l))})}return r}var m=function(a){return(0,d.jsxs)("svg",c(c({xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",width:"1em",height:"1em"},a),{},{children:[(0,d.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),(0,d.jsx)("path",{d:"M16.54 7c-.805-2.365-2.536-4-4.54-4-2.774 0-5.023 2.632-5.023 6.496 0 1.956 1.582 4.727 2.512 6"}),(0,d.jsx)("path",{d:"M4.711 11.979C3.055 13.856 2.497 16.164 3.5 17.89c1.387 2.39 5.138 2.831 8.501.9 1.703-.979 2.875-3.362 3.516-4.798"}),(0,d.jsx)("path",{d:"M15.014 19.99c2.511 0 4.523-.438 5.487-2.1 1.387-2.39-.215-5.893-3.579-7.824-1.702-.979-4.357-1.235-5.927-1.07"}),(0,d.jsx)("path",{d:"M10.493 9.862c.48.276 1.095.112 1.372-.366a1 1 0 0 0-.367-1.365 1.007 1.007 0 0 0-1.373.366 1 1 0 0 0 .368 1.365zM8.5 15.5a1 1 0 1 0 2 0 1 1 0 1 0-2 0M14.5 14a1 1 0 1 0 2 0 1 1 0 1 0-2 0"})]}))},i=o.default=m},15678:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.alternating--mj1_d {\r
  animation-name: alternating-text--p6lWH;\r
  animation-duration: 1s;\r
  animation-iteration-count: infinite;\r
  animation-timing-function: ease;\r
  background: linear-gradient(to right, #000, #0f9b0f);\r
  -webkit-text-fill-color: transparent;\r
  -webkit-background-clip: text;\r
          background-clip: text;\r
  font-size: 20px;\r
  font-weight: 700;\r
}\r
\r
@keyframes alternating-text--p6lWH {\r
  90% {\r
    display: none;\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/AlternatingText/index.module.less"],names:[],mappings:"AAAA;EACE,uCAAgC;EAChC,sBAAsB;EACtB,mCAAmC;EACnC,+BAA+B;EAC/B,oDAAoD;EACpD,oCAAoC;EACpC,6BAAqB;UAArB,qBAAqB;EACrB,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE;IACE,aAAa;EACf;AACF",sourcesContent:[`.alternating {\r
  animation-name: alternating-text;\r
  animation-duration: 1s;\r
  animation-iteration-count: infinite;\r
  animation-timing-function: ease;\r
  background: linear-gradient(to right, #000, #0f9b0f);\r
  -webkit-text-fill-color: transparent;\r
  background-clip: text;\r
  font-size: 20px;\r
  font-weight: 700;\r
}\r
\r
@keyframes alternating-text {\r
  90% {\r
    display: none;\r
  }\r
}\r
`],sourceRoot:""}]),d.locals={alternating:"alternating--mj1_d","alternating-text":"alternating-text--p6lWH",alternatingText:"alternating-text--p6lWH"},o.A=d},17329:function(b,o,e){"use strict";b.exports=e.p+"images/9ce539741014a14d8c0c.png"},17881:function(b,o,e){"use strict";var s=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=t(e(96540));function A(g){if(typeof WeakMap!="function")return null;var C=new WeakMap,c=new WeakMap;return(A=function(i){return i?c:C})(g)}function t(g,C){if(!C&&g&&g.__esModule)return g;if(g===null||s(g)!="object"&&typeof g!="function")return{default:g};var c=A(C);if(c&&c.has(g))return c.get(g);var m={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in g)if(r!=="default"&&{}.hasOwnProperty.call(g,r)){var a=i?Object.getOwnPropertyDescriptor(g,r):null;a&&(a.get||a.set)?Object.defineProperty(m,r,a):m[r]=g[r]}return m.default=g,c&&c.set(g,m),m}var d=function(){var C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(){};(0,f.useEffect)(function(){var c=new AbortController;return document.documentElement.addEventListener("click",function(){C()},{signal:c.signal}),document.documentElement.addEventListener("mousedown",function(m){m.detail>1&&m.preventDefault()},{signal:c.signal}),function(){c.abort()}},[])},p=o.default=d},19484:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(7867),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},20485:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=C(e(96540)),d=e(21126),p=e(55211);function g(u){if(typeof WeakMap!="function")return null;var v=new WeakMap,_=new WeakMap;return(g=function(h){return h?_:v})(u)}function C(u,v){if(!v&&u&&u.__esModule)return u;if(u===null||f(u)!="object"&&typeof u!="function")return{default:u};var _=g(v);if(_&&_.has(u))return _.get(u);var E={__proto__:null},h=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var B in u)if(B!=="default"&&{}.hasOwnProperty.call(u,B)){var M=h?Object.getOwnPropertyDescriptor(u,B):null;M&&(M.get||M.set)?Object.defineProperty(E,B,M):E[B]=u[B]}return E.default=u,_&&_.set(u,E),E}var c=[{label:"Introduction"},{label:"Personal Information",fields:[{name:"name",type:"text",placeholder:"Name"},{name:"email",type:"email",placeholder:"Email"}]},{label:"Address Details",fields:[{name:"address",type:"text",placeholder:"Address"},{name:"city",type:"text",placeholder:"City"},{name:"country",type:"text",placeholder:"Country"}]},{label:"Review & Submit"}],m=function(v){var _=v.currentStep,E=v.steps;return t.default.createElement("div",{className:"relative w-full"},t.default.createElement("div",{className:"flex items-center justify-between"},E.map(function(h,B){return t.default.createElement(t.default.Fragment,{key:h.label},t.default.createElement("div",{className:"flex flex-col items-center"},t.default.createElement(d.motion.div,{className:"z-10 flex h-8 w-8 items-center justify-center rounded-full ".concat(B<=_?"bg-gray-500 text-white":"bg-gray-200 text-white dark:bg-gray-800 dark:text-gray-600"),animate:{scale:1.02}},B<_?t.default.createElement(p.CheckCircle,{size:17}):t.default.createElement(p.Circle,{size:17,fill:"currentColor"}))),B<E.length-1&&t.default.createElement("div",{className:"relative flex-grow"},t.default.createElement("div",{className:"absolute -top-1 h-1.5 w-full bg-gray-100 dark:bg-gray-800"}),t.default.createElement(d.motion.div,{className:"absolute -top-1 h-1.5 w-full bg-gray-500",initial:{width:"0%"},animate:{width:B<_?"100%":"0%"},transition:{duration:.5,ease:"easeInOut"}})))})))},i=function(){return t.default.createElement("div",{className:"my-4 flex min-h-[30vh] w-full items-center justify-center rounded-lg border bg-gray-100 text-center dark:border-gray-600 dark:bg-gray-800"},"Stepper Content")},r="rounded-2xl bg-gray-500 px-2 py-1 text-sm font-medium text-white",a=function(v){var _=v.currentStep,E=v.totalSteps,h=v.handlePrev,B=v.handleNext;return t.default.createElement("div",{className:"flex justify-end gap-3"},_===0?null:t.default.createElement("button",{onClick:h,className:r},"Previous"),_===E-1?null:t.default.createElement("button",{onClick:B,className:r},"Next"))},n=function(){var v=(0,t.useState)(1),_=(0,A.default)(v,2),E=_[0],h=_[1],B=function(){h(function(P){return Math.min(P+1,c.length-1)})},M=function(){h(function(P){return Math.max(P-1,0)})};return t.default.createElement("div",{className:"mx-auto w-full p-6"},t.default.createElement(m,{currentStep:E,steps:c}),t.default.createElement(i,null),t.default.createElement(a,{currentStep:E,totalSteps:c.length,handlePrev:M,handleNext:B}))},l=o.default=n},21265:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=o.BoxesCore=void 0;var f=s(e(94634)),A=s(e(91847)),t=s(e(96540)),d=e(21126),p=s(e(71508)),g=["className"],C=o.BoxesCore=function(r){var a=r.className,n=(0,A.default)(r,g),l=new Array(50).fill(1),u=new Array(30).fill(1),v=["rgb(125 211 252)","rgb(249 168 212)","rgb(134 239 172)","rgb(253 224 71)","rgb(252 165 165)","rgb(216 180 254)","rgb(147 197 253)","rgb(165 180 252)","rgb(196 181 253)"],_=function(){return v[Math.floor(Math.random()*v.length)]};return t.default.createElement("div",(0,f.default)({style:{transform:"translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)"},className:(0,p.default)("absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",a)},n),l.map(function(E,h){return t.default.createElement(d.motion.div,{key:"row"+h,className:"relative h-8 w-16 border-l border-slate-700"},u.map(function(B,M){return t.default.createElement(d.motion.div,{whileHover:{backgroundColor:_(),transition:{duration:0}},animate:{transition:{duration:1}},key:"col"+M,className:"relative h-8 w-16 border-t border-r border-slate-700"},M%2===0&&h%2===0?t.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700"},t.default.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6v12m6-6H6"})):null)}))}))},c=t.default.memo(C),m=o.default=c},21502:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(94634)),t=s(e(43693)),d=s(e(85715)),p=s(e(91847)),g=r(e(96540)),C=e(21126),c=s(e(71508)),m=["text","colors","className","sparklesCount"];function i(_){if(typeof WeakMap!="function")return null;var E=new WeakMap,h=new WeakMap;return(i=function(M){return M?h:E})(_)}function r(_,E){if(!E&&_&&_.__esModule)return _;if(_===null||f(_)!="object"&&typeof _!="function")return{default:_};var h=i(E);if(h&&h.has(_))return h.get(_);var B={__proto__:null},M=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var O in _)if(O!=="default"&&{}.hasOwnProperty.call(_,O)){var P=M?Object.getOwnPropertyDescriptor(_,O):null;P&&(P.get||P.set)?Object.defineProperty(B,O,P):B[O]=_[O]}return B.default=_,h&&h.set(_,B),B}function a(_,E){var h=Object.keys(_);if(Object.getOwnPropertySymbols){var B=Object.getOwnPropertySymbols(_);E&&(B=B.filter(function(M){return Object.getOwnPropertyDescriptor(_,M).enumerable})),h.push.apply(h,B)}return h}function n(_){for(var E=1;E<arguments.length;E++){var h=arguments[E]!=null?arguments[E]:{};E%2?a(Object(h),!0).forEach(function(B){(0,t.default)(_,B,h[B])}):Object.getOwnPropertyDescriptors?Object.defineProperties(_,Object.getOwnPropertyDescriptors(h)):a(Object(h)).forEach(function(B){Object.defineProperty(_,B,Object.getOwnPropertyDescriptor(h,B))})}return _}var l=function(E){var h=E.text,B=E.colors,M=B===void 0?{first:"#9E7AFF",second:"#FE8BBB"}:B,O=E.className,P=E.sparklesCount,R=P===void 0?10:P,D=(0,p.default)(E,m),j=(0,g.useState)([]),T=(0,d.default)(j,2),W=T[0],L=T[1];return(0,g.useEffect)(function(){var S=function(){var w="".concat(Math.random()*100,"%"),N="".concat(Math.random()*100,"%"),V=Math.random()>.5?M.first:M.second,X=Math.random()*2,q=Math.random()*1+.3,Y=Math.random()*10+5,te="".concat(w,"-").concat(N,"-").concat(Date.now());return{id:te,x:w,y:N,color:V,delay:X,scale:q,lifespan:Y}},k=function(){var w=Array.from({length:R},S);L(w)},F=function(){L(function(w){return w.map(function(N){return N.lifespan<=0?S():n(n({},N),{},{lifespan:N.lifespan-.1})})})};k();var Q=setInterval(F,100);return function(){return clearInterval(Q)}},[M.first,M.second]),g.default.createElement("div",(0,A.default)({className:(0,c.default)("text",O)},D,{style:{"--sparkles-first-color":"".concat(M.first),"--sparkles-second-color":"".concat(M.second)}}),g.default.createElement("span",{className:"relative inline-block"},W.map(function(S){return g.default.createElement(u,(0,A.default)({key:S.id},S))}),g.default.createElement("i",null,h)))},u=function(E){var h=E.id,B=E.x,M=E.y,O=E.color,P=E.delay,R=E.scale;return g.default.createElement(C.motion.svg,{key:h,className:"pointer-events-none absolute z-20",initial:{opacity:0,left:B,top:M},animate:{opacity:[0,1,0],scale:[0,R,0],rotate:[75,120,150]},transition:{duration:.8,repeat:1/0,delay:P},width:"21",height:"21",viewBox:"0 0 21 21"},g.default.createElement("path",{d:"M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z",fill:O}))},v=o.default=l},21652:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(48497),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},23259:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=p(e(96540));function d(c){if(typeof WeakMap!="function")return null;var m=new WeakMap,i=new WeakMap;return(d=function(a){return a?i:m})(c)}function p(c,m){if(!m&&c&&c.__esModule)return c;if(c===null||f(c)!="object"&&typeof c!="function")return{default:c};var i=d(m);if(i&&i.has(c))return i.get(c);var r={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in c)if(n!=="default"&&{}.hasOwnProperty.call(c,n)){var l=a?Object.getOwnPropertyDescriptor(c,n):null;l&&(l.get||l.set)?Object.defineProperty(r,n,l):r[n]=c[n]}return r.default=c,i&&i.set(c,r),r}var g=function(){var m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",r=(0,t.useState)(i?void 0:0),a=(0,A.default)(r,2),n=a[0],l=a[1],u=function(){return l(function(_){return((_!=null?_:-1)+1)%m.length})};return[n==null&&i?i:m[n!=null?n:0],u]},C=o.default=g},23883:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=s(e(49676)),t=function(g){var C=g.text;return f.default.createElement("div",{className:A.default.isometricCard},f.default.createElement("p",null,C))},d=o.default=t},23973:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=s(e(19484)),t=function(g){return f.default.createElement("div",{style:{position:"relative",height:"100%"}},f.default.createElement("div",{className:A.default.background},"Mesh Gradient Background"))},d=o.default=t},24124:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.fireConfetti=void 0;var f=s(e(43693)),A=s(e(14685));function t(m,i){var r=Object.keys(m);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(m);i&&(a=a.filter(function(n){return Object.getOwnPropertyDescriptor(m,n).enumerable})),r.push.apply(r,a)}return r}function d(m){for(var i=1;i<arguments.length;i++){var r=arguments[i]!=null?arguments[i]:{};i%2?t(Object(r),!0).forEach(function(a){(0,f.default)(m,a,r[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(m,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach(function(a){Object.defineProperty(m,a,Object.getOwnPropertyDescriptor(r,a))})}return m}var p=200,g={origin:{y:.7},zIndex:1500};function C(m,i){(0,A.default)(d(d(d({},g),i),{},{particleCount:Math.floor(p*m)}))}var c=o.fireConfetti=function(){C(.25,{spread:26,startVelocity:55}),C(.2,{spread:60}),C(.35,{spread:100,decay:.91,scalar:.8}),C(.1,{spread:120,startVelocity:25,decay:.92,scalar:1.2}),C(.1,{spread:120,startVelocity:45})}},24274:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.text-animate--hQcUn {\r
  display: inline-block;\r
  opacity: 0;\r
  animation: bounce-in--EivIZ;\r
  animation-duration: 1s;\r
  animation-delay: 1s;\r
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r
  animation-fill-mode: forwards;\r
  min-width: 10px;\r
}\r
\r
.text-animate-hover--WcHin {\r
  --delay: 0;\r
\r
  min-width: 10px;\r
  display: inline-block;\r
  animation: rubber-band--dY19h 1s;\r
  animation-fill-mode: both;\r
  animation-delay: 0 s;\r
  animation-delay: var(--delay) s;\r
\r
  &:hover {\r
    animation: none;\r
    color: #ff4500;\r
  }\r
}\r
\r
@keyframes bounce-in--EivIZ {\r
  0% {\r
    opacity: 0;\r
    transform: scale3d(0.3, 0.3, 0.3);\r
  }\r
\r
  20% {\r
    transform: scale3d(1.1, 1.1, 1.1);\r
  }\r
\r
  40% {\r
    transform: scale3d(0.9, 0.9, 0.9);\r
  }\r
\r
  60% {\r
    opacity: 1;\r
    transform: scale3d(1.03, 1.03, 1.03);\r
  }\r
\r
  80% {\r
    transform: scale3d(0.97, 0.97, 0.97);\r
  }\r
\r
  100% {\r
    opacity: 1;\r
    transform: scale3d(1, 1, 1);\r
  }\r
}\r
\r
@keyframes rubber-band--dY19h {\r
  0% {\r
    transform: scale3d(1, 1, 1);\r
  }\r
\r
  30% {\r
    transform: scale3d(1.25, 0.75, 1);\r
  }\r
\r
  40% {\r
    transform: scale3d(0.75, 1.25, 1);\r
  }\r
\r
  50% {\r
    transform: scale3d(1.15, 0.85, 1);\r
  }\r
\r
  65% {\r
    transform: scale3d(0.95, 1.05, 1);\r
  }\r
\r
  75% {\r
    transform: scale3d(1.05, 0.95, 1);\r
  }\r
\r
  100% {\r
    transform: scale3d(1, 1, 1);\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/AnimText/index.module.less"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,UAAU;EACV,2BAAoB;EACpB,sBAAsB;EACtB,mBAAmB;EACnB,8DAA8D;EAC9D,6BAA6B;EAC7B,eAAe;AACjB;;AAEA;EACE,UAAU;;EAEV,eAAe;EACf,qBAAqB;EACrB,gCAAyB;EACzB,yBAAyB;EACzB,oBAA+B;EAA/B,+BAA+B;;EAE/B;IACE,eAAe;IACf,cAAc;EAChB;AACF;;AAEA;EACE;IACE,UAAU;IACV,iCAAiC;EACnC;;EAEA;IACE,iCAAiC;EACnC;;EAEA;IACE,iCAAiC;EACnC;;EAEA;IACE,UAAU;IACV,oCAAoC;EACtC;;EAEA;IACE,oCAAoC;EACtC;;EAEA;IACE,UAAU;IACV,2BAA2B;EAC7B;AACF;;AAEA;EACE;IACE,2BAA2B;EAC7B;;EAEA;IACE,iCAAiC;EACnC;;EAEA;IACE,iCAAiC;EACnC;;EAEA;IACE,iCAAiC;EACnC;;EAEA;IACE,iCAAiC;EACnC;;EAEA;IACE,iCAAiC;EACnC;;EAEA;IACE,2BAA2B;EAC7B;AACF",sourcesContent:[`.text-animate {\r
  display: inline-block;\r
  opacity: 0;\r
  animation: bounce-in;\r
  animation-duration: 1s;\r
  animation-delay: 1s;\r
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r
  animation-fill-mode: forwards;\r
  min-width: 10px;\r
}\r
\r
.text-animate-hover {\r
  --delay: 0;\r
\r
  min-width: 10px;\r
  display: inline-block;\r
  animation: rubber-band 1s;\r
  animation-fill-mode: both;\r
  animation-delay: var(--delay) s;\r
\r
  &:hover {\r
    animation: none;\r
    color: #ff4500;\r
  }\r
}\r
\r
@keyframes bounce-in {\r
  0% {\r
    opacity: 0;\r
    transform: scale3d(0.3, 0.3, 0.3);\r
  }\r
\r
  20% {\r
    transform: scale3d(1.1, 1.1, 1.1);\r
  }\r
\r
  40% {\r
    transform: scale3d(0.9, 0.9, 0.9);\r
  }\r
\r
  60% {\r
    opacity: 1;\r
    transform: scale3d(1.03, 1.03, 1.03);\r
  }\r
\r
  80% {\r
    transform: scale3d(0.97, 0.97, 0.97);\r
  }\r
\r
  100% {\r
    opacity: 1;\r
    transform: scale3d(1, 1, 1);\r
  }\r
}\r
\r
@keyframes rubber-band {\r
  0% {\r
    transform: scale3d(1, 1, 1);\r
  }\r
\r
  30% {\r
    transform: scale3d(1.25, 0.75, 1);\r
  }\r
\r
  40% {\r
    transform: scale3d(0.75, 1.25, 1);\r
  }\r
\r
  50% {\r
    transform: scale3d(1.15, 0.85, 1);\r
  }\r
\r
  65% {\r
    transform: scale3d(0.95, 1.05, 1);\r
  }\r
\r
  75% {\r
    transform: scale3d(1.05, 0.95, 1);\r
  }\r
\r
  100% {\r
    transform: scale3d(1, 1, 1);\r
  }\r
}\r
`],sourceRoot:""}]),d.locals={"text-animate":"text-animate--hQcUn",textAnimate:"text-animate--hQcUn","bounce-in":"bounce-in--EivIZ",bounceIn:"bounce-in--EivIZ","text-animate-hover":"text-animate-hover--WcHin",textAnimateHover:"text-animate-hover--WcHin","rubber-band":"rubber-band--dY19h",rubberBand:"rubber-band--dY19h"},o.A=d},25598:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=g(e(96540)),d=s(e(91757));function p(m){if(typeof WeakMap!="function")return null;var i=new WeakMap,r=new WeakMap;return(p=function(n){return n?r:i})(m)}function g(m,i){if(!i&&m&&m.__esModule)return m;if(m===null||f(m)!="object"&&typeof m!="function")return{default:m};var r=p(i);if(r&&r.has(m))return r.get(m);var a={__proto__:null},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in m)if(l!=="default"&&{}.hasOwnProperty.call(m,l)){var u=n?Object.getOwnPropertyDescriptor(m,l):null;u&&(u.get||u.set)?Object.defineProperty(a,l,u):a[l]=m[l]}return a.default=m,r&&r.set(m,a),a}var C=function(i){var r=i.direction,a=r===void 0?"right":r,n=i.speed,l=n===void 0?1:n,u=i.borderColor,v=u===void 0?"#999":u,_=i.squareSize,E=_===void 0?40:_,h=i.hoverFillColor,B=h===void 0?"#222":h,M=(0,t.useRef)(null),O=(0,t.useRef)(null),P=(0,t.useRef)(),R=(0,t.useRef)(),D=(0,t.useRef)({x:0,y:0}),j=(0,t.useState)(null),T=(0,A.default)(j,2),W=T[0],L=T[1];return(0,t.useEffect)(function(){var S=M.current;if(S){var k=S.getContext("2d"),F=function(){S.width=S.offsetWidth,S.height=S.offsetHeight,P.current=Math.ceil(S.width/E)+1,R.current=Math.ceil(S.height/E)+1};window.addEventListener("resize",F),F();var Q=function(){k.clearRect(0,0,S.width,S.height);for(var X=Math.floor(D.current.x/E)*E,q=Math.floor(D.current.y/E)*E,Y=X;Y<S.width+E;Y+=E)for(var te=q;te<S.height+E;te+=E){var ie=Y-D.current.x%E,_e=te-D.current.y%E;W&&Math.floor((Y-X)/E)===W.x&&Math.floor((te-q)/E)===W.y&&(k.fillStyle=B,k.fillRect(ie,_e,E,E)),k.strokeStyle=v,k.strokeRect(ie,_e,E,E)}var ce=k.createRadialGradient(S.width/2,S.height/2,0,S.width/2,S.height/2,Math.sqrt(Math.pow(S.width,2)+Math.pow(S.height,2))/2);ce.addColorStop(0,"rgba(0, 0, 0, 0)"),ce.addColorStop(1,"#060606"),k.fillStyle=ce,k.fillRect(0,0,S.width,S.height)},z=function(){var X=Math.max(l,.1);switch(a){case"right":D.current.x=(D.current.x-X+E)%E;break;case"left":D.current.x=(D.current.x+X+E)%E;break;case"up":D.current.y=(D.current.y+X+E)%E;break;case"down":D.current.y=(D.current.y-X+E)%E;break;case"diagonal":D.current.x=(D.current.x-X+E)%E,D.current.y=(D.current.y-X+E)%E;break;default:break}Q(),O.current=requestAnimationFrame(z)},w=function(X){var q=S.getBoundingClientRect(),Y=X.clientX-q.left,te=X.clientY-q.top,ie=Math.floor(D.current.x/E)*E,_e=Math.floor(D.current.y/E)*E,ce=Math.floor((Y+D.current.x-ie)/E),he=Math.floor((te+D.current.y-_e)/E);L({x:ce,y:he})},N=function(){L(null)};return S.addEventListener("mousemove",w),S.addEventListener("mouseleave",N),O.current=requestAnimationFrame(z),function(){window.removeEventListener("resize",F),cancelAnimationFrame(O.current),S.removeEventListener("mousemove",w),S.removeEventListener("mouseleave",N)}}},[a,l,v,B,W,E]),t.default.createElement("canvas",{ref:M,className:d.default.squaresCanvas})},c=o.default=C},25635:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=s(e(71508)),t=e(21126),d=function(C){var c=C.textLeft,m=c===void 0?"":c,i=C.textRight,r=i===void 0?"":i,a=C.className,n=a===void 0?"":a,l={hidden:{opacity:0,x:"-100vw"},visible:{opacity:1,x:"0"},right:{opacity:0,x:"100vw"}};return f.default.createElement("div",{className:(0,A.default)("flex justify-center overflow-hidden",n)},f.default.createElement(t.motion.section,{initial:"hidden",animate:"visible",variants:l,transition:{duration:2}},m),f.default.createElement(t.motion.section,{initial:"right",animate:"visible",variants:l,transition:{duration:1}},r))},p=o.default=d},26718:function(b,o,e){"use strict";b.exports=e.p+"images/916ddb5adf113a8dd7a3.png"},26860:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(37255),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},27024:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=p(e(96540)),t=s(e(71508));function d(c){if(typeof WeakMap!="function")return null;var m=new WeakMap,i=new WeakMap;return(d=function(a){return a?i:m})(c)}function p(c,m){if(!m&&c&&c.__esModule)return c;if(c===null||f(c)!="object"&&typeof c!="function")return{default:c};var i=d(m);if(i&&i.has(c))return i.get(c);var r={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in c)if(n!=="default"&&{}.hasOwnProperty.call(c,n)){var l=a?Object.getOwnPropertyDescriptor(c,n):null;l&&(l.get||l.set)?Object.defineProperty(r,n,l):r[n]=c[n]}return r.default=c,i&&i.set(c,r),r}var g=function(m){var i=m.number,r=m.title,a=m.content,n=m.isOpen,l=m.loadingWidthPercent;return A.default.createElement("div",{className:(0,t.default)("transform-gpu rounded-lg border transition-all",n?"border-neutral-500/10 bg-linear-to-b from-neutral-200/15 to-neutral-200/5 dark:border-neutral-500/15 dark:from-neutral-600/15 dark:to-neutral-600/5 dark:shadow-[2px_4px_25px_0px_rgba(248,248,248,0.06)_inset]":"scale-90 border-transparent opacity-50 saturate-0")},A.default.createElement("div",{className:"flex w-full items-center gap-4 p-4"},A.default.createElement("p",{className:(0,t.default)("inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-neutral-500/20 text-neutral-600")},i),A.default.createElement("h2",{className:(0,t.default)("text-left text-xl font-medium text-neutral-800 dark:text-neutral-200")},r)),A.default.createElement("div",{className:(0,t.default)("w-full transform-gpu overflow-hidden text-left text-neutral-600 transition-all duration-500 dark:text-neutral-400",n?"max-h-64":"max-h-0")},A.default.createElement("p",{className:"p-4 text-lg"},a),A.default.createElement("div",{className:"w-full px-4 pb-4"},A.default.createElement("div",{className:"relative h-1 w-full overflow-hidden rounded-full"},A.default.createElement("div",{className:(0,t.default)("absolute top-0 left-0 h-1 bg-neutral-500"),style:{width:"".concat(l,"%")}})))))},C=o.default=g},27488:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=g(e(96540)),d=e(21126);function p(m){if(typeof WeakMap!="function")return null;var i=new WeakMap,r=new WeakMap;return(p=function(n){return n?r:i})(m)}function g(m,i){if(!i&&m&&m.__esModule)return m;if(m===null||f(m)!="object"&&typeof m!="function")return{default:m};var r=p(i);if(r&&r.has(m))return r.get(m);var a={__proto__:null},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in m)if(l!=="default"&&{}.hasOwnProperty.call(m,l)){var u=n?Object.getOwnPropertyDescriptor(m,l):null;u&&(u.get||u.set)?Object.defineProperty(a,l,u):a[l]=m[l]}return a.default=m,r&&r.set(m,a),a}var C=function(i){var r=i.text,a=r===void 0?[]:r,n=(0,t.useState)(0),l=(0,A.default)(n,2),u=l[0],v=l[1],_=(0,t.useMemo)(function(){return a},[]);return(0,t.useEffect)(function(){var E=setTimeout(function(){u===_.length-1?v(0):v(u+1)},2e3);return function(){return clearTimeout(E)}},[u,_]),t.default.createElement("span",{className:"relative overflow-hidden pl-4 text-center"},_.map(function(E,h){return t.default.createElement(d.motion.span,{key:h,className:"absolute font-semibold",initial:{opacity:0,y:-100},transition:{type:"spring",stiffness:50},animate:u===h?{y:0,opacity:1}:{y:u>h?-150:150,opacity:0}},E)}))},c=o.default=C},29492:function(b,o,e){"use strict";b.exports=e.p+"images/f5fb3175e80af3f631cc.png"},29777:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(85715)),A=s(e(96540)),t=e(21126),d=function(C){var c=C.text,m=["rgb(131, 179, 32)","rgb(47, 195, 106)","rgb(42, 169, 210)","rgb(4, 112, 202)","rgb(107, 10, 255)","rgb(183, 0, 218)","rgb(218, 0, 171)","rgb(230, 64, 92)","rgb(232, 98, 63)","rgb(249, 129, 47)"],i=A.default.useState(m),r=(0,f.default)(i,2),a=r[0],n=r[1],l=A.default.useState(0),u=(0,f.default)(l,2),v=u[0],_=u[1];return A.default.useEffect(function(){var E=setInterval(function(){var h=[].concat(m).sort(function(){return Math.random()-.5});n(h),_(function(B){return B+1})},5e3);return function(){return clearInterval(E)}},[]),c.split("").map(function(E,h){return A.default.createElement(t.motion.span,{key:"".concat(E,"-").concat(v,"-").concat(h),initial:{y:0},animate:{color:a[h%a.length],y:[0,-3,0],scale:[1,1.01,1],filter:["blur(0px)","blur(5px)","blur(0px)"],opacity:[1,.8,1]},transition:{duration:.5,delay:h*.05},className:"inline-block font-sans tracking-tight"},E)})},p=o.default=d},32765:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=s(e(99725)),t=s(e(93018)),d=s(e(97361)),p=s(e(59651)),g=s(e(84265)),C=s(e(94624)),c=s(e(14726)),m=[{size:"md",type:"outline",icon:null},{size:"lg",type:"fill",icon:f.default.createElement(A.default,null)},{size:"sm",type:"outline",icon:null},{size:"lg",type:"outline",icon:f.default.createElement(t.default,null)},{size:"md",type:"outline",icon:null},{size:"md",type:"fill",icon:f.default.createElement(C.default,null)},{size:"sm",type:"outline",icon:null},{size:"md",type:"outline",icon:null},{size:"sm",type:"outline",icon:null},{size:"lg",type:"outline",icon:f.default.createElement(d.default,null)},{size:"md",type:"fill",icon:null},{size:"md",type:"outline",icon:null},{size:"md",type:"outline",icon:null},{size:"sm",type:"fill",icon:f.default.createElement(c.default,null)},{size:"sm",type:"fill",icon:null},{size:"md",type:"outline",icon:null},{size:"lg",type:"fill",icon:f.default.createElement(g.default,null)},{size:"sm",type:"outline",icon:null},{size:"sm",type:"outline",icon:null},{size:"md",type:"fill",icon:f.default.createElement(p.default,null)},{size:"sm",type:"outline",icon:null},{size:"sm",type:"outline",icon:null}],i=o.default=m},33005:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(94054),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},35861:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(64928),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},36176:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.markdownBody--xUrgB {\r
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
`],sourceRoot:""}]),d.locals={markdownBody:"markdownBody--xUrgB",loadingIcon:"loadingIcon--VpAmv",copySection:"copySection--aJHtb",lang:"lang--SO0lS",copySpan:"copySpan--u4qzC",preCode:"preCode--s6faO"},o.A=d},36579:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.animate-meteor-effect--ABfch {
  animation: meteor--JizpZ 5s linear infinite;
}

@keyframes meteor--JizpZ {
  0% {
    transform: rotate(215deg) translateX(0);
    opacity: 1;
  }

  70% {
    opacity: 1;
  }

  100% {
    transform: rotate(215deg) translateX(-500px);
    opacity: 0;
  }
}
`,"",{version:3,sources:["webpack://./src/components/stateless/Meteors/index.module.less"],names:[],mappings:"AAAA;EACE,2CAAoC;AACtC;;AAEA;EACE;IACE,uCAAuC;IACvC,UAAU;EACZ;;EAEA;IACE,UAAU;EACZ;;EAEA;IACE,4CAA4C;IAC5C,UAAU;EACZ;AACF",sourcesContent:[`.animate-meteor-effect {
  animation: meteor 5s linear infinite;
}

@keyframes meteor {
  0% {
    transform: rotate(215deg) translateX(0);
    opacity: 1;
  }

  70% {
    opacity: 1;
  }

  100% {
    transform: rotate(215deg) translateX(-500px);
    opacity: 0;
  }
}
`],sourceRoot:""}]),d.locals={"animate-meteor-effect":"animate-meteor-effect--ABfch",animateMeteorEffect:"animate-meteor-effect--ABfch",meteor:"meteor--JizpZ"},o.A=d},37070:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(85715)),A=s(e(96540)),t=s(e(44782)),d=s(e(23259)),p=s(e(17881)),g=[398.43,-3243.5,1435237],C=function(){var i=(0,d.default)(g),r=(0,f.default)(i,2),a=r[0],n=r[1];return(0,p.default)(n),A.default.createElement(t.default,{value:a,trend:0})},c=o.default=C},37255:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.mask--LIqkO {\r
  width: 100%;\r
  height: 100%;\r
  position: absolute;\r
  left: 0;\r
  top: 0;\r
  z-index: 10;\r
  background-image: linear-gradient(\r
    270deg,\r
    hsl(0deg 0% 100%) 0,\r
    hsl(0deg 0% 100%) 5%,\r
    rgb(17 23 41 / 0%) 49.8%,\r
    hsl(0deg 0% 100%) 95%,\r
    hsl(0deg 0% 100%) 100%\r
  );\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/TagCloud/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,OAAO;EACP,MAAM;EACN,WAAW;EACX;;;;;;;GAOC;AACH",sourcesContent:[`.mask {\r
  width: 100%;\r
  height: 100%;\r
  position: absolute;\r
  left: 0;\r
  top: 0;\r
  z-index: 10;\r
  background-image: linear-gradient(\r
    270deg,\r
    hsl(0deg 0% 100%) 0,\r
    hsl(0deg 0% 100%) 5%,\r
    rgb(17 23 41 / 0%) 49.8%,\r
    hsl(0deg 0% 100%) 95%,\r
    hsl(0deg 0% 100%) 100%\r
  );\r
}\r
`],sourceRoot:""}]),d.locals={mask:"mask--LIqkO"},o.A=d},38913:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(83386),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},39751:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(94634)),A=s(e(85715)),t=s(e(96540)),d=e(77450),p=s(e(63859)),g=e(43160),C=s(e(2724)),c=function(r){var a=r.preCode,n=(0,p.default)(),l=(0,A.default)(n,2),u=l[0],v=l[1],_=function(){u(a)};return t.default.createElement("div",{className:"rounded-md bg-cyan-800 text-zinc-50"},t.default.createElement("header",{className:"grid grid-cols-6 items-center gap-3 px-4 py-3"},t.default.createElement("div",{className:"flex gap-1.5"},t.default.createElement("div",{className:"h-3 w-3 rounded-full bg-red-500"}),t.default.createElement("div",{className:"h-3 w-3 rounded-full bg-yellow-500"}),t.default.createElement("div",{className:"h-3 w-3 rounded-full bg-green-500"})),t.default.createElement("div",{className:"col-span-4 flex justify-center"},t.default.createElement("div",{className:"bg-transparent text-center text-sm font-medium text-gray-400 focus:outline-hidden"},"Untitled"))),t.default.createElement("div",{className:"relative px-4 pb-4"},t.default.createElement("div",{className:"absolute top-2 right-5 size-4 text-gray-400"},(v==null?void 0:v.state)==="success"?t.default.createElement(g.CheckCircleTwoTone,{className:"size-4 text-base",twoToneColor:"#52c41a"}):t.default.createElement(g.CopyOutlined,{className:"size-4 text-base",onClick:_})),t.default.createElement(d.Highlight,{theme:d.themes.dracula,className:C.default.wrapper,code:a==null?void 0:a.trim(),language:"jsx"},function(E){var h=E.style,B=E.tokens,M=E.getLineProps,O=E.getTokenProps;return t.default.createElement("pre",{className:C.default.pre,style:h},B.map(function(P,R){return t.default.createElement("div",(0,f.default)({className:C.default.line,key:R},M({line:P})),t.default.createElement("span",{className:C.default["line-no"]},R+1),P.map(function(D,j){return t.default.createElement("span",(0,f.default)({key:j},O({token:D})))}))}))})))},m=o.default=c},40999:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(43346),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},41854:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=C(e(96540)),d=e(21126),p=s(e(71508));function g(i){if(typeof WeakMap!="function")return null;var r=new WeakMap,a=new WeakMap;return(g=function(l){return l?a:r})(i)}function C(i,r){if(!r&&i&&i.__esModule)return i;if(i===null||f(i)!="object"&&typeof i!="function")return{default:i};var a=g(r);if(a&&a.has(i))return a.get(i);var n={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in i)if(u!=="default"&&{}.hasOwnProperty.call(i,u)){var v=l?Object.getOwnPropertyDescriptor(i,u):null;v&&(v.get||v.set)?Object.defineProperty(n,u,v):n[u]=i[u]}return n.default=i,a&&a.set(i,n),n}var c=function(r){var a=r.words,n=r.duration,l=n===void 0?3e3:n,u=r.className,v=(0,t.useState)(a[0]),_=(0,A.default)(v,2),E=_[0],h=_[1],B=(0,t.useState)(!1),M=(0,A.default)(B,2),O=M[0],P=M[1],R=(0,t.useCallback)(function(){var D=a[a.indexOf(E)+1]||a[0];h(D),P(!0)},[E,a]);return(0,t.useEffect)(function(){O||setTimeout(function(){R()},l)},[O,l,R]),t.default.createElement(d.AnimatePresence,{onExitComplete:function(){P(!1)}},t.default.createElement(d.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:100,damping:10},exit:{opacity:0,y:-40,x:40,filter:"blur(8px)",scale:2,position:"absolute"},className:(0,p.default)("relative z-10 inline-block px-2 text-left text-neutral-900 dark:text-neutral-100",u),key:E},E.split(" ").map(function(D,j){return t.default.createElement(d.motion.span,{key:D+j,initial:{opacity:0,y:10,filter:"blur(8px)"},animate:{opacity:1,y:0,filter:"blur(0px)"},transition:{delay:j*.3,duration:.3},className:"inline-block whitespace-nowrap"},D.split("").map(function(T,W){return t.default.createElement(d.motion.span,{key:D+W,initial:{opacity:0,y:10,filter:"blur(8px)"},animate:{opacity:1,y:0,filter:"blur(0px)"},transition:{delay:j*.3+W*.05,duration:.2},className:"inline-block"},T)}),t.default.createElement("span",{className:"inline-block"},"\xA0"))})))},m=o.default=c},42101:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.warpper--lLZe7 {\r
  font-family: sans-serif;\r
  text-align: center;\r
}\r
\r
.pre--MB0A4 {\r
  text-align: left;\r
  padding: 0.5em;\r
  overflow: auto;\r
\r
  & .token-line--ZnLJw {\r
    line-height: 1.3em;\r
    height: 1.3em;\r
  }\r
}\r
\r
.line--aPWRo {\r
  padding-right: 0.5em;\r
}\r
\r
.line-no--Rk8t7 {\r
  text-align: right;\r
  padding-right: 1em;\r
  -webkit-user-select: none;\r
      -ms-user-select: none;\r
          user-select: none;\r
  opacity: 0.5;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/ShiCode/index.module.less"],names:[],mappings:"AAAA;EACE,uBAAuB;EACvB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,cAAc;EACd,cAAc;;EAEd;IACE,kBAAkB;IAClB,aAAa;EACf;AACF;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,yBAAiB;MAAjB,qBAAiB;UAAjB,iBAAiB;EACjB,YAAY;AACd",sourcesContent:[`.warpper {\r
  font-family: sans-serif;\r
  text-align: center;\r
}\r
\r
.pre {\r
  text-align: left;\r
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
`],sourceRoot:""}]),d.locals={warpper:"warpper--lLZe7",pre:"pre--MB0A4","token-line":"token-line--ZnLJw",tokenLine:"token-line--ZnLJw",line:"line--aPWRo","line-no":"line-no--Rk8t7",lineNo:"line-no--Rk8t7"},o.A=d},42634:function(){},43259:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(36176),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},43346:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=e(4417),p=e.n(d),g=new URL(e(44148),e.b),C=t()(f()),c=p()(g);C.push([b.id,`.avatar--tAk6h {
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

  100% {
    transform: translateY(0);
  }
}

.maskBox--uAYjJ {
  width: 100px;
  height: 40px;
  background: darkcyan;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 18px;
  position: relative;
  -webkit-mask: radial-gradient(8px at 10px 10px, transparent 98%, black) -10px -10px;
          mask: radial-gradient(8px at 10px 10px, transparent 98%, black) -10px -10px;
}

.watermark--YUolT {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: rgb(0 0 0 / 20%);
  white-space: nowrap;
  pointer-events: none;
}

.blend-me--f5L11 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  mix-blend-mode: overlay;
  transition: 0.3s cubic-bezier(0.25, 0.25, 0.33, 1.33);
  animation: move-me--FUPwc 8s ease-out infinite alternate;
}

@keyframes move-me--FUPwc {
  to {
    transform: translateY(50px);
  }
}

.button--GgsIa {
  background: transparent;
  padding: 0.5rem 1rem;
  background-image:
    linear-gradient(90deg, white, white), linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));
  background-clip: padding-box, border-box;
  background-origin: border-box;
  border: 5px solid transparent;
  border-radius: 1.75rem;
}

.button-label--d_jxl {
  background-image: linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));
  -webkit-background-clip: text;
          background-clip: text;
  color: transparent;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
}

.circle-1--kJj6k {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: calc(-10px);
  left: calc(-10px);
  animation: expand--kmoUS 6s ease-out infinite both;
  animation-play-state: running;
  animation-delay: 1s;
  border: 1.5px solid rgb(121 40 202 / 40%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 40%) 40%, #000 100%);
}

.circle-2--YMeVl {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: calc(-20px);
  left: calc(-20px);
  animation: expand-opacity--XzitQ 6s linear infinite both;
  animation-play-state: running;
  animation-delay: 0.5s;
  border: 1px solid rgb(121 40 202 / 40%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 30%) 20%, #000 100%);
}

.circle-3--DvCUJ {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  top: calc(-30px);
  left: calc(-30px);
  animation: expand-opacity--XzitQ 6s linear infinite both;
  animation-play-state: running;
  animation-delay: 1s;
  border: 1px solid rgb(121 40 202 / 30%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 20%) 20%, #000 100%);
}

.circle-4--UkUyn {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  top: calc(-40px);
  left: calc(-40px);
  animation: expand-opacity--XzitQ 6s linear infinite both;
  animation-play-state: running;
  animation-delay: 1.5s;
  border: 1px solid rgb(121 40 202 / 20%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 10%) 20%, #000 100%);
}

@keyframes expand--kmoUS {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes expand-opacity--XzitQ {
  0% {
    opacity: 0;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.3);
  }

  100% {
    opacity: 0;
    transform: scale(1.295);
  }
}

.eHElAY--ul0hZ {
  cursor: pointer;
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  height: 2.8rem;
  letter-spacing: 0.1rem;
  line-height: 2.8rem;
  padding: 0 1.8rem;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  z-index: 0;
  color: rgb(255 255 255);
  border-color: transparent;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation-timeline: auto;
    animation-range-start: normal;
    animation-range-end: normal;
    opacity: 1;
    background: linear-gradient(
        45deg,
        rgb(255 0 0),
        rgb(255 115 0),
        rgb(255 251 0),
        rgb(72 255 0),
        rgb(0 255 213),
        rgb(0 43 255),
        rgb(122 0 255),
        rgb(255 0 200),
        rgb(255 0 0)
      )
      0% 0% / 400%;
    animation: 20s linear 0s infinite normal none running dv-wu--sf_Ta;
    transition: opacity 0.3s ease-in-out;
  }

  &::after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(17 17 17);
    left: 0;
    top: 0;
  }
}

@keyframes dv-wu--sf_Ta {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 400% 0;
  }

  100% {
    background-position: 0 0;
  }
}

.stages--wh47k {
  position: relative;
  height: 74px;

  .cubeSpinner--eOJc0 {
    color: #42745a;
    animation-name: spin-cube--eXtsy;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 8s;
    transform-style: preserve-3d;
    transform-origin: 40px 40px 0;
    line-height: 1.3em;
    font-size: 64px;

    span {
      position: absolute;
      width: 100%;
      backface-visibility: hidden;
    }

    .face1--KIPp1 {
      transform: translateZ(40px);
    }

    .face2--aYKpi {
      transform: rotateX(240deg) translateZ(40px);
    }

    .face3--M7CTV {
      transform: rotateX(120deg) translateZ(40px);
    }
  }
}

@keyframes spin-cube--eXtsy {
  0% {
    transform: rotateX(0deg);
  }

  15% {
    transform: rotateX(0deg);
  }

  25% {
    transform: rotateX(120deg);
  }

  40% {
    transform: rotateX(120deg);
  }

  50% {
    transform: rotateX(240deg);
  }

  65% {
    transform: rotateX(240deg);
  }

  75% {
    transform: rotateX(240deg);
  }

  90% {
    transform: rotateX(1turn);
  }

  100% {
    transform: rotateX(1turn);
  }
}

.video-box--RWlhc .video-btn--PPzlz {
  box-shadow: 0 6px 10px rgb(0 0 0 / 20%);
  position: relative;
  display: inline-block;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #1d5fca;
  border-radius: 50%;
  color: #fff;
  font-size: 20px;
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}

.video-box--RWlhc .video-btn--PPzlz::after,
.video-box--RWlhc .video-btn--PPzlz::before {
  content: '';
  display: block;
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 50%;
  border: 1px solid #1d5fca;
  transition: 0.5s;
}

.video-box--RWlhc .video-btn--PPzlz i {
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
}

.video-box--RWlhc .video-btn--PPzlz::before {
  animation: ripple--Ojifa 2s linear infinite;
}

.video-box--RWlhc .video-btn--PPzlz::after {
  animation: ripple--Ojifa 2s linear 1s infinite;
}

.video-box--RWlhc .video-btn--PPzlz:focus,
.video-box--RWlhc .video-btn--PPzlz:hover {
  background-color: #2d995d;
  color: #fff;
}

.video-box--RWlhc .video-btn--PPzlz:focus::after,
.video-box--RWlhc .video-btn--PPzlz:focus::before,
.video-box--RWlhc .video-btn--PPzlz:hover::after,
.video-box--RWlhc .video-btn--PPzlz:hover::before {
  border-color: #2d995d;
}

@keyframes ripple--Ojifa {
  0% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.75);
    opacity: 1;
  }

  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes effect-1--LXEum {
  0% {
    text-shadow: 0 0 #32a8a2;
  }

  40% {
    text-shadow: 2px 2px 5px #32a8a2;
  }

  100% {
    text-shadow: 0 0 #32a8a2;
  }
}

.effect--mKRM4 {
  animation: effect-1--LXEum 1s linear infinite;
  color: white;
  font-size: 48px;
}

.dotMask--sy6CL {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 16px 16px;
  -webkit-mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%);
          mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%);
}

.dot--jqRVx {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 16px 16px;
}

.grid--UCn5k {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background-image:
    linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(#80808012 1px, transparent 1px);
  background-size: 24px 24px;
}

.box--kP2q7 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border: 3px solid #85858500;
  border-radius: 12px;
  background:
    linear-gradient(#515153, #3a374a) padding-box,
    linear-gradient(var(--angle), #777676, rgb(81 174 132)) border-box;
  animation: 10s rotate--r6Mu6 linear infinite;
}

@keyframes rotate--r6Mu6 {
  to {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.circledHighlight--R41qx {
  position: relative;
  z-index: 1;
  padding: 5px;
  margin: 0 15px;
}

.circledHighlight--R41qx::before,
.circledHighlight--R41qx::after {
  content: '';
  width: 120%;
  height: 100%;
  position: absolute;
  top: 5%;
  left: -10%;
  z-index: -1;
  border-radius: 80%;
  box-sizing: border-box;
}

.circledHighlight--R41qx::before {
  border: 2px solid #06251b;
  transform: rotate(-4deg);
}

.circledHighlight--R41qx::after {
  border: 1px solid #63d9b3;
  transform: rotate(6deg);
}

.article--KGMY1::after {
  background-image: linear-gradient(45deg, #6366f1, #4f46e5, #7e22ce);
  bottom: -11px;
  content: '';
  height: 13px;
  left: 0;
  -webkit-mask-image: url(`+c+`);
          mask-image: url(`+c+`);
  -webkit-mask-size: cover;
          mask-size: cover;
  position: absolute;
  width: 100%;
}

.line--Lp5NS {
  height: 1px;
  width: 360px;
  background-image: linear-gradient(97deg, #0096ff, #bb64ff 42%, #f2416b 74%, #eb7500);
}

.violetGradient--LnrMD {
  margin: 30px 0;
  height: 1px;
  width: 360px;
  background: #804dee;
  background: linear-gradient(180deg, rgb(60 51 80 / 0%) 0%, #804dee 50%, rgb(60 51 80 / 0%) 100%);
  background: linear-gradient(180deg, rgb(60 51 80 / 0%) 0%, #804dee 50%, rgb(60 51 80 / 0%) 100%);
}

.linearGradient--sz7LZ {
  margin: 30px 0;
  height: 1px;
  width: 360px;
  background: #804dee;
  background: linear-gradient(180deg, #804dee 0%, rgb(60 51 80 / 0%) 100%);
  background: linear-gradient(180deg, #804dee 0%, rgb(60 51 80 / 0%) 100%);
}

.linearGra--jMVRp {
  margin: 30px 0;
  height: 2px;
  width: 360px;
  background: #804dee;
  background: linear-gradient(180deg, rgb(60 51 80 / 0%) 0%, #804dee 100%);
  background: linear-gradient(180deg, rgb(60 51 80 / 0%) 0%, #804dee 100%);
}

.violet--cWM1F {
  margin: 30px 0;
  height: 100px;
  width: 1px;
  background: #804dee;
  background: linear-gradient(-90deg, #804dee 0%, rgb(60 51 80 / 0%) 100%);
  background: linear-gradient(-90deg, #804dee 0%, rgb(60 51 80 / 0%) 100%);
}

/* shift + alt +a
backdrop-filter
object-fit: cover;
object-position: 0 0;
isolation: isolate;
z-index: 1;
 */
`,"",{version:3,sources:["webpack://./src/pages/home/index.module.less"],names:[],mappings:"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",sourcesContent:[`.avatar {
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

  100% {
    transform: translateY(0);
  }
}

.maskBox {
  width: 100px;
  height: 40px;
  background: darkcyan;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 18px;
  position: relative;
  mask: radial-gradient(8px at 10px 10px, transparent 98%, black) -10px -10px;
}

.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: rgb(0 0 0 / 20%);
  white-space: nowrap;
  pointer-events: none;
}

.blend-me {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  mix-blend-mode: overlay;
  transition: 0.3s cubic-bezier(0.25, 0.25, 0.33, 1.33);
  animation: move-me 8s ease-out infinite alternate;
}

@keyframes move-me {
  to {
    transform: translateY(50px);
  }
}

.button {
  background: transparent;
  padding: 0.5rem 1rem;
  background-image:
    linear-gradient(90deg, white, white), linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));
  background-clip: padding-box, border-box;
  background-origin: border-box;
  border: 5px solid transparent;
  border-radius: 1.75rem;
}

.button-label {
  background-image: linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));
  background-clip: text;
  color: transparent;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
}

.circle-1 {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: calc(-10px);
  left: calc(-10px);
  animation: expand 6s ease-out infinite both;
  animation-play-state: running;
  animation-delay: 1s;
  border: 1.5px solid rgb(121 40 202 / 40%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 40%) 40%, #000 100%);
}

.circle-2 {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: calc(-20px);
  left: calc(-20px);
  animation: expand-opacity 6s linear infinite both;
  animation-play-state: running;
  animation-delay: 0.5s;
  border: 1px solid rgb(121 40 202 / 40%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 30%) 20%, #000 100%);
}

.circle-3 {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  top: calc(-30px);
  left: calc(-30px);
  animation: expand-opacity 6s linear infinite both;
  animation-play-state: running;
  animation-delay: 1s;
  border: 1px solid rgb(121 40 202 / 30%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 20%) 20%, #000 100%);
}

.circle-4 {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  top: calc(-40px);
  left: calc(-40px);
  animation: expand-opacity 6s linear infinite both;
  animation-play-state: running;
  animation-delay: 1.5s;
  border: 1px solid rgb(121 40 202 / 20%);
  background: linear-gradient(-180deg, rgb(121 40 202 / 10%) 20%, #000 100%);
}

@keyframes expand {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes expand-opacity {
  0% {
    opacity: 0;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.3);
  }

  100% {
    opacity: 0;
    transform: scale(1.295);
  }
}

.eHElAY {
  cursor: pointer;
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  height: 2.8rem;
  letter-spacing: 0.1rem;
  line-height: 2.8rem;
  padding: 0 1.8rem;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  z-index: 0;
  color: rgb(255 255 255);
  border-color: transparent;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation-timeline: auto;
    animation-range-start: normal;
    animation-range-end: normal;
    opacity: 1;
    background: linear-gradient(
        45deg,
        rgb(255 0 0),
        rgb(255 115 0),
        rgb(255 251 0),
        rgb(72 255 0),
        rgb(0 255 213),
        rgb(0 43 255),
        rgb(122 0 255),
        rgb(255 0 200),
        rgb(255 0 0)
      )
      0% 0% / 400%;
    animation: 20s linear 0s infinite normal none running dv-wu;
    transition: opacity 0.3s ease-in-out;
  }

  &::after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(17 17 17);
    left: 0;
    top: 0;
  }
}

@keyframes dv-wu {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 400% 0;
  }

  100% {
    background-position: 0 0;
  }
}

.stages {
  position: relative;
  height: 74px;

  .cubeSpinner {
    color: #42745a;
    animation-name: spin-cube;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 8s;
    transform-style: preserve-3d;
    transform-origin: 40px 40px 0;
    line-height: 1.3em;
    font-size: 64px;

    span {
      position: absolute;
      width: 100%;
      backface-visibility: hidden;
    }

    .face1 {
      transform: translateZ(40px);
    }

    .face2 {
      transform: rotateX(240deg) translateZ(40px);
    }

    .face3 {
      transform: rotateX(120deg) translateZ(40px);
    }
  }
}

@keyframes spin-cube {
  0% {
    transform: rotateX(0deg);
  }

  15% {
    transform: rotateX(0deg);
  }

  25% {
    transform: rotateX(120deg);
  }

  40% {
    transform: rotateX(120deg);
  }

  50% {
    transform: rotateX(240deg);
  }

  65% {
    transform: rotateX(240deg);
  }

  75% {
    transform: rotateX(240deg);
  }

  90% {
    transform: rotateX(1turn);
  }

  100% {
    transform: rotateX(1turn);
  }
}

.video-box .video-btn {
  box-shadow: 0 6px 10px rgb(0 0 0 / 20%);
  position: relative;
  display: inline-block;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #1d5fca;
  border-radius: 50%;
  color: #fff;
  font-size: 20px;
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}

.video-box .video-btn::after,
.video-box .video-btn::before {
  content: '';
  display: block;
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 50%;
  border: 1px solid #1d5fca;
  transition: 0.5s;
}

.video-box .video-btn i {
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
}

.video-box .video-btn::before {
  animation: ripple 2s linear infinite;
}

.video-box .video-btn::after {
  animation: ripple 2s linear 1s infinite;
}

.video-box .video-btn:focus,
.video-box .video-btn:hover {
  background-color: #2d995d;
  color: #fff;
}

.video-box .video-btn:focus::after,
.video-box .video-btn:focus::before,
.video-box .video-btn:hover::after,
.video-box .video-btn:hover::before {
  border-color: #2d995d;
}

@keyframes ripple {
  0% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.75);
    opacity: 1;
  }

  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes effect-1 {
  0% {
    text-shadow: 0 0 #32a8a2;
  }

  40% {
    text-shadow: 2px 2px 5px #32a8a2;
  }

  100% {
    text-shadow: 0 0 #32a8a2;
  }
}

.effect {
  animation: effect-1 1s linear infinite;
  color: white;
  font-size: 48px;
}

.dotMask {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 16px 16px;
  mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%);
}

.dot {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 16px 16px;
}

.grid {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background-image:
    linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(#80808012 1px, transparent 1px);
  background-size: 24px 24px;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border: 3px solid #85858500;
  border-radius: 12px;
  background:
    linear-gradient(#515153, #3a374a) padding-box,
    linear-gradient(var(--angle), #777676, rgb(81 174 132)) border-box;
  animation: 10s rotate linear infinite;
}

@keyframes rotate {
  to {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.circledHighlight {
  position: relative;
  z-index: 1;
  padding: 5px;
  margin: 0 15px;
}

.circledHighlight::before,
.circledHighlight::after {
  content: '';
  width: 120%;
  height: 100%;
  position: absolute;
  top: 5%;
  left: -10%;
  z-index: -1;
  border-radius: 80%;
  box-sizing: border-box;
}

.circledHighlight::before {
  border: 2px solid #06251b;
  transform: rotate(-4deg);
}

.circledHighlight::after {
  border: 1px solid #63d9b3;
  transform: rotate(6deg);
}

.article::after {
  background-image: linear-gradient(45deg, #6366f1, #4f46e5, #7e22ce);
  bottom: -11px;
  content: '';
  height: 13px;
  left: 0;
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M0 5 Q 25 10, 50 5 T 100 5 T 150 5 T 200 5" stroke="white" stroke-width="2" fill="none"/></svg>');
  mask-size: cover;
  position: absolute;
  width: 100%;
}

.line {
  height: 1px;
  width: 360px;
  background-image: linear-gradient(97deg, #0096ff, #bb64ff 42%, #f2416b 74%, #eb7500);
}

.violetGradient {
  margin: 30px 0;
  height: 1px;
  width: 360px;
  background: #804dee;
  background: linear-gradient(180deg, rgb(60 51 80 / 0%) 0%, #804dee 50%, rgb(60 51 80 / 0%) 100%);
  background: linear-gradient(180deg, rgb(60 51 80 / 0%) 0%, #804dee 50%, rgb(60 51 80 / 0%) 100%);
}

.linearGradient {
  margin: 30px 0;
  height: 1px;
  width: 360px;
  background: #804dee;
  background: linear-gradient(180deg, #804dee 0%, rgb(60 51 80 / 0%) 100%);
  background: linear-gradient(180deg, #804dee 0%, rgb(60 51 80 / 0%) 100%);
}

.linearGra {
  margin: 30px 0;
  height: 2px;
  width: 360px;
  background: #804dee;
  background: linear-gradient(180deg, rgb(60 51 80 / 0%) 0%, #804dee 100%);
  background: linear-gradient(180deg, rgb(60 51 80 / 0%) 0%, #804dee 100%);
}

.violet {
  margin: 30px 0;
  height: 100px;
  width: 1px;
  background: #804dee;
  background: linear-gradient(-90deg, #804dee 0%, rgb(60 51 80 / 0%) 100%);
  background: linear-gradient(-90deg, #804dee 0%, rgb(60 51 80 / 0%) 100%);
}

/* shift + alt +a
backdrop-filter
object-fit: cover;
object-position: 0 0;
isolation: isolate;
z-index: 1;
 */
`],sourceRoot:""}]),C.locals={avatar:"avatar--tAk6h",levitate:"levitate--RZCwS",maskBox:"maskBox--uAYjJ",watermark:"watermark--YUolT","blend-me":"blend-me--f5L11",blendMe:"blend-me--f5L11","move-me":"move-me--FUPwc",moveMe:"move-me--FUPwc",button:"button--GgsIa","button-label":"button-label--d_jxl",buttonLabel:"button-label--d_jxl","circle-1":"circle-1--kJj6k",circle1:"circle-1--kJj6k",expand:"expand--kmoUS","circle-2":"circle-2--YMeVl",circle2:"circle-2--YMeVl","expand-opacity":"expand-opacity--XzitQ",expandOpacity:"expand-opacity--XzitQ","circle-3":"circle-3--DvCUJ",circle3:"circle-3--DvCUJ","circle-4":"circle-4--UkUyn",circle4:"circle-4--UkUyn",eHElAY:"eHElAY--ul0hZ",eHElAy:"eHElAY--ul0hZ","dv-wu":"dv-wu--sf_Ta",dvWu:"dv-wu--sf_Ta",stages:"stages--wh47k","spin-cube":"spin-cube--eXtsy",spinCube:"spin-cube--eXtsy",cubeSpinner:"cubeSpinner--eOJc0",face1:"face1--KIPp1",face2:"face2--aYKpi",face3:"face3--M7CTV","video-box":"video-box--RWlhc",videoBox:"video-box--RWlhc","video-btn":"video-btn--PPzlz",videoBtn:"video-btn--PPzlz",ripple:"ripple--Ojifa",effect:"effect--mKRM4","effect-1":"effect-1--LXEum",effect1:"effect-1--LXEum",dotMask:"dotMask--sy6CL",dot:"dot--jqRVx",grid:"grid--UCn5k",box:"box--kP2q7",rotate:"rotate--r6Mu6",circledHighlight:"circledHighlight--R41qx",article:"article--KGMY1",line:"line--Lp5NS",violetGradient:"violetGradient--LnrMD",linearGradient:"linearGradient--sz7LZ",linearGra:"linearGra--jMVRp",violet:"violet--cWM1F"},o.A=C},44148:function(b){"use strict";b.exports='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M0 5 Q 25 10, 50 5 T 100 5 T 150 5 T 200 5" stroke="white" stroke-width="2" fill="none"/></svg>'},45490:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(79901),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},45843:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(15678),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},45931:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=g(e(96540)),t=s(e(71508)),d=e(21126);function p(m){if(typeof WeakMap!="function")return null;var i=new WeakMap,r=new WeakMap;return(p=function(n){return n?r:i})(m)}function g(m,i){if(!i&&m&&m.__esModule)return m;if(m===null||f(m)!="object"&&typeof m!="function")return{default:m};var r=p(i);if(r&&r.has(m))return r.get(m);var a={__proto__:null},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in m)if(l!=="default"&&{}.hasOwnProperty.call(m,l)){var u=n?Object.getOwnPropertyDescriptor(m,l):null;u&&(u.get||u.set)?Object.defineProperty(a,l,u):a[l]=m[l]}return a.default=m,r&&r.set(m,a),a}var C=function(i){var r=i.text,a=r===void 0?"":r,n=i.className,l=n===void 0?"":n,u={hidden:{opacity:0,x:-20},visible:{opacity:1,x:0}},v=(0,A.useRef)(null),_=(0,d.useInView)(v,{once:!0});return A.default.createElement("div",{ref:v,className:(0,t.default)("",l)},A.default.createElement(d.AnimatePresence,null,a.split("").map(function(E,h){return A.default.createElement(d.motion.span,{key:h,initial:"hidden",animate:_?"visible":"hidden",exit:"hidden",variants:u,transition:{duration:.5,delay:h*.1}},E===" "?A.default.createElement("span",null,"\xA0"):E)})))},c=o.default=C},48497:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.hoverRotate--ew29g {\r
  overflow: hidden;\r
  background-color: #000;\r
  color: #fff;\r
  display: inline-block;\r
  max-width: 300px;\r
  min-width: 160px;\r
  position: relative;\r
  width: 100%;\r
}\r
\r
.hoverRotate--ew29g * {\r
  box-sizing: border-box;\r
  transition: all 0.45s ease;\r
}\r
\r
.hoverRotate--ew29g::before,\r
.hoverRotate--ew29g::after {\r
  background-color: rgb(0 0 0 / 50%);\r
  border-top: 32px solid rgb(0 0 0 / 50%);\r
  border-bottom: 32px solid rgb(0 0 0 / 50%);\r
  position: absolute;\r
  inset: 0;\r
  content: '';\r
  transition: all 0.3s ease;\r
  z-index: 1;\r
  opacity: 0;\r
  transform: scaleY(2);\r
}\r
\r
.hoverRotate--ew29g img {\r
  vertical-align: top;\r
  backface-visibility: hidden;\r
  transition: all 0.3s;\r
  box-sizing: border-box;\r
  max-width: 100%;\r
}\r
\r
.hoverRotate--ew29g img::before {\r
  content: 'Sorry, this image is unavailable.';\r
  display: block;\r
  margin-bottom: 8px;\r
}\r
\r
.hoverRotate--ew29g img::after {\r
  content: '(url: ' attr(src) ')';\r
  display: block;\r
  font-size: 12px;\r
}\r
\r
.hoverRotate--ew29g:hover img {\r
  transform: scale(1.3) rotate(5deg);\r
}\r
\r
.hoverRotate--ew29g figcaption {\r
  position: absolute;\r
  inset: 0;\r
  align-items: center;\r
  display: flex;\r
  flex-direction: column;\r
  justify-content: center;\r
  line-height: 1.1em;\r
  opacity: 0;\r
  z-index: 2;\r
  transition-delay: 0.1s;\r
  font-size: 24px;\r
  font-family: sans-serif;\r
  font-weight: 400;\r
  letter-spacing: 1px;\r
  text-transform: uppercase;\r
}\r
\r
.hoverRotate--ew29g:hover::before,\r
.hoverRotate--ew29g:hover::after {\r
  transform: scale(1);\r
  opacity: 1;\r
}\r
\r
.hoverRotate--ew29g:hover > img {\r
  opacity: 0.7;\r
}\r
\r
.hoverRotate--ew29g:hover figcaption {\r
  opacity: 1;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/LazyLoadImage/index.module.less"],names:[],mappings:"AAAA;EACE,gBAAgB;EAChB,sBAAsB;EACtB,WAAW;EACX,qBAAqB;EACrB,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,sBAAsB;EACtB,0BAA0B;AAC5B;;AAEA;;EAEE,kCAAkC;EAClC,uCAAuC;EACvC,0CAA0C;EAC1C,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,yBAAyB;EACzB,UAAU;EACV,UAAU;EACV,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;EACnB,2BAA2B;EAC3B,oBAAoB;EACpB,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,4CAA4C;EAC5C,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,+BAA+B;EAC/B,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,kBAAkB;EAClB,UAAU;EACV,UAAU;EACV,sBAAsB;EACtB,eAAe;EACf,uBAAuB;EACvB,gBAAgB;EAChB,mBAAmB;EACnB,yBAAyB;AAC3B;;AAEA;;EAEE,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,UAAU;AACZ",sourcesContent:[`.hoverRotate {\r
  overflow: hidden;\r
  background-color: #000;\r
  color: #fff;\r
  display: inline-block;\r
  max-width: 300px;\r
  min-width: 160px;\r
  position: relative;\r
  width: 100%;\r
}\r
\r
.hoverRotate * {\r
  box-sizing: border-box;\r
  transition: all 0.45s ease;\r
}\r
\r
.hoverRotate::before,\r
.hoverRotate::after {\r
  background-color: rgb(0 0 0 / 50%);\r
  border-top: 32px solid rgb(0 0 0 / 50%);\r
  border-bottom: 32px solid rgb(0 0 0 / 50%);\r
  position: absolute;\r
  inset: 0;\r
  content: '';\r
  transition: all 0.3s ease;\r
  z-index: 1;\r
  opacity: 0;\r
  transform: scaleY(2);\r
}\r
\r
.hoverRotate img {\r
  vertical-align: top;\r
  backface-visibility: hidden;\r
  transition: all 0.3s;\r
  box-sizing: border-box;\r
  max-width: 100%;\r
}\r
\r
.hoverRotate img::before {\r
  content: 'Sorry, this image is unavailable.';\r
  display: block;\r
  margin-bottom: 8px;\r
}\r
\r
.hoverRotate img::after {\r
  content: '(url: ' attr(src) ')';\r
  display: block;\r
  font-size: 12px;\r
}\r
\r
.hoverRotate:hover img {\r
  transform: scale(1.3) rotate(5deg);\r
}\r
\r
.hoverRotate figcaption {\r
  position: absolute;\r
  inset: 0;\r
  align-items: center;\r
  display: flex;\r
  flex-direction: column;\r
  justify-content: center;\r
  line-height: 1.1em;\r
  opacity: 0;\r
  z-index: 2;\r
  transition-delay: 0.1s;\r
  font-size: 24px;\r
  font-family: sans-serif;\r
  font-weight: 400;\r
  letter-spacing: 1px;\r
  text-transform: uppercase;\r
}\r
\r
.hoverRotate:hover::before,\r
.hoverRotate:hover::after {\r
  transform: scale(1);\r
  opacity: 1;\r
}\r
\r
.hoverRotate:hover > img {\r
  opacity: 0.7;\r
}\r
\r
.hoverRotate:hover figcaption {\r
  opacity: 1;\r
}\r
`],sourceRoot:""}]),d.locals={hoverRotate:"hoverRotate--ew29g"},o.A=d},48632:function(b,o,e){"use strict";b.exports=e.p+"images/695c6a7e4d55286b3565.png"},49676:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(98689),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},51941:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(94634)),A=s(e(91847)),t=s(e(85715)),d=s(e(96540)),p=s(e(88462)),g=["children","onClick"],C=function(){var r=d.default.useState({x:-1,y:-1}),a=(0,t.default)(r,2),n=a[0],l=n.x,u=n.y,v=a[1],_=l!==-1&&u!==-1,E=function(B){var M=B.currentTarget.getBoundingClientRect(),O=M.left,P=M.top;v({x:B.clientX-O,y:B.clientY-P}),setTimeout(function(){v({x:-1,y:-1})},300)};return{x:l,y:u,handleRippleOnClick:E,isRippling:_}},c=function(r){var a=r.children,n=r.onClick,l=(0,A.default)(r,g),u=C(),v=u.x,_=u.y,E=u.handleRippleOnClick,h=u.isRippling,B=function(O){E(O),n&&n(O)};return d.default.createElement("button",(0,f.default)({type:"button",onClick:B,className:p.default.btn},l),d.default.createElement("span",{className:p.default.content},a),h&&d.default.createElement("div",{className:p.default["btn-ripple-container"]},d.default.createElement("span",{className:p.default["btn-ripple"],style:{left:v,top:_}})))},m=o.default=c},52577:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=e(4417),p=e.n(d),g=new URL(e(82547),e.b),C=t()(f()),c=p()(g);C.push([b.id,`a.squiggle--JQRWj {\r
  background-image: linear-gradient(to bottom, #0087ca 0%, #0087ca 100%);\r
  background-position: 0 100%;\r
  background-repeat: repeat-x;\r
  background-size: 1px 1px;\r
  color: inherit;\r
  text-decoration: none;\r
}\r
\r
a.squiggle--JQRWj:hover {\r
  background-image: url(`+c+`);\r
  background-size: auto 2px;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/AutoLink/index.module.less"],names:[],mappings:"AAAA;EACE,sEAAsE;EACtE,2BAA2B;EAC3B,2BAA2B;EAC3B,wBAAwB;EACxB,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,yDAA0b;EAC1b,yBAAyB;AAC3B",sourcesContent:[`a.squiggle {\r
  background-image: linear-gradient(to bottom, #0087ca 0%, #0087ca 100%);\r
  background-position: 0 100%;\r
  background-repeat: repeat-x;\r
  background-size: 1px 1px;\r
  color: inherit;\r
  text-decoration: none;\r
}\r
\r
a.squiggle:hover {\r
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-15px);}}%3C/style%3E%3Cpath fill='none' stroke='%230087ca' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");\r
  background-size: auto 2px;\r
}\r
`],sourceRoot:""}]),C.locals={squiggle:"squiggle--JQRWj"},o.A=C},53179:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(11530),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},54134:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=r(e(96540)),d=s(e(71508)),p=s(e(27024)),g=s(e(29492)),C=s(e(26718)),c=s(e(48632)),m=s(e(17329));function i(u){if(typeof WeakMap!="function")return null;var v=new WeakMap,_=new WeakMap;return(i=function(h){return h?_:v})(u)}function r(u,v){if(!v&&u&&u.__esModule)return u;if(u===null||f(u)!="object"&&typeof u!="function")return{default:u};var _=i(v);if(_&&_.has(u))return _.get(u);var E={__proto__:null},h=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var B in u)if(B!=="default"&&{}.hasOwnProperty.call(u,B)){var M=h?Object.getOwnPropertyDescriptor(u,B):null;M&&(M.get||M.set)?Object.defineProperty(E,B,M):E[B]=u[B]}return E.default=u,_&&_.set(u,E),E}var a=[{title:"\u300A\u548F\u67F3\u300B\u2014\u2014 \u8D3A\u77E5\u7AE0",content:"\u78A7\u7389\u5986\u6210\u4E00\u6811\u9AD8\uFF0C\u4E07\u6761\u5782\u4E0B\u7EFF\u4E1D\u7EE6\u3002\u4E0D\u77E5\u7EC6\u53F6\u8C01\u88C1\u51FA\uFF0C\u4E8C\u6708\u6625\u98CE\u4F3C\u526A\u5200\u3002",srcImage:g.default},{title:"\u300A\u5C0F\u6C60\u300B\u2014\u2014 \u6768\u4E07\u91CC",content:"\u6CC9\u773C\u65E0\u58F0\u60DC\u7EC6\u6D41\uFF0C\u6811\u9634\u7167\u6C34\u7231\u6674\u67D4\u3002\u5C0F\u8377\u624D\u9732\u5C16\u5C16\u89D2\uFF0C\u65E9\u6709\u873B\u8713\u7ACB\u4E0A\u5934\u3002",srcImage:C.default},{title:"\u300A\u5C71\u5C45\u79CB\u669D\u300B\u2014\u2014 \u738B\u7EF4",content:"\u7A7A\u5C71\u65B0\u96E8\u540E\uFF0C\u5929\u6C14\u665A\u6765\u79CB\u3002\u660E\u6708\u677E\u95F4\u7167\uFF0C\u6E05\u6CC9\u77F3\u4E0A\u6D41\u3002",srcImage:c.default},{title:"\u300A\u9022\u96EA\u5BBF\u8299\u84C9\u5C71\u4E3B\u4EBA\u300B\u2014\u2014 \u5218\u957F\u537F",content:"\u65E5\u66AE\u82CD\u5C71\u8FDC\uFF0C\u5929\u5BD2\u767D\u5C4B\u8D2B\u3002\u67F4\u95E8\u95FB\u72AC\u5420\uFF0C\u98CE\u96EA\u591C\u5F52\u4EBA\u3002",srcImage:m.default}],n=function(){var v=(0,t.useState)(0),_=(0,A.default)(v,2),E=_[0],h=_[1],B=(0,t.useState)(0),M=(0,A.default)(B,2),O=M[0],P=M[1];return(0,t.useEffect)(function(){var R=setInterval(function(){P(function(D){return D+10})},10);return function(){return clearInterval(R)}},[]),(0,t.useEffect)(function(){O>1e4&&(h(function(R){return(R+1)%a.length}),P(0))},[O]),t.default.createElement("div",{className:"grid grid-cols-1 gap-4 rounded-sm border p-4 md:grid-cols-2"},t.default.createElement("div",{className:"space-y-6"},a.map(function(R,D){return t.default.createElement("button",{className:"w-full",key:R.title,onClick:function(){h(D),P(0)},type:"button"},t.default.createElement(p.default,{content:R.content,isOpen:E===D,loadingWidthPercent:E===D?O/100:0,number:D+1,title:R.title}))})),t.default.createElement("div",{className:"h-full"},t.default.createElement("div",{className:(0,d.default)("relative h-96 w-full overflow-hidden rounded-lg md:h-[500px]")},a.map(function(R,D){return t.default.createElement("img",{alt:R.title,className:(0,d.default)("absolute h-[500px] w-full transform-gpu rounded-lg object-cover transition-all duration-300",E===D?"scale-100":"scale-70",E>D?"translate-y-full":""),key:R.title,src:R.srcImage,style:{zIndex:a.length-D}})}))))},l=o.default=n},56127:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(43693)),t=g(e(96540)),d=e(21126);function p(m){if(typeof WeakMap!="function")return null;var i=new WeakMap,r=new WeakMap;return(p=function(n){return n?r:i})(m)}function g(m,i){if(!i&&m&&m.__esModule)return m;if(m===null||f(m)!="object"&&typeof m!="function")return{default:m};var r=p(i);if(r&&r.has(m))return r.get(m);var a={__proto__:null},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in m)if(l!=="default"&&{}.hasOwnProperty.call(m,l)){var u=n?Object.getOwnPropertyDescriptor(m,l):null;u&&(u.get||u.set)?Object.defineProperty(a,l,u):a[l]=m[l]}return a.default=m,r&&r.set(m,a),a}var C=function(i){var r=i.children,a=i.className,n=i.variant,l=i.duration,u=l===void 0?.4:l,v=i.delay,_=v===void 0?0:v,E=i.offset,h=E===void 0?6:E,B=i.direction,M=B===void 0?"down":B,O=i.inView,P=O===void 0?!1:O,R=i.inViewMargin,D=R===void 0?"-50px":R,j=i.blur,T=j===void 0?"6px":j,W=i.once,L=W===void 0?!1:W,S=(0,t.useRef)(null),k=(0,d.useInView)(S,{once:L,margin:D}),F=!P||k,Q={hidden:(0,A.default)((0,A.default)((0,A.default)({},M==="left"||M==="right"?"x":"y",M==="right"||M==="down"?-h:h),"opacity",0),"filter","blur(".concat(T,")")),visible:(0,A.default)((0,A.default)((0,A.default)({},M==="left"||M==="right"?"x":"y",0),"opacity",1),"filter","blur(0px)")},z=n||Q;return t.default.createElement(d.AnimatePresence,null,t.default.createElement(d.motion.div,{ref:S,initial:"hidden",animate:F?"visible":"hidden",exit:"hidden",variants:z,transition:{delay:.04+_,duration:u,ease:"easeOut"},className:a},r))},c=o.default=C},56320:function(b,o,e){"use strict";"use client";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=c(e(96540)),d=e(21126),p=e(55211),g=s(e(71508));function C(r){if(typeof WeakMap!="function")return null;var a=new WeakMap,n=new WeakMap;return(C=function(u){return u?n:a})(r)}function c(r,a){if(!a&&r&&r.__esModule)return r;if(r===null||f(r)!="object"&&typeof r!="function")return{default:r};var n=C(a);if(n&&n.has(r))return n.get(r);var l={__proto__:null},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in r)if(v!=="default"&&{}.hasOwnProperty.call(r,v)){var _=u?Object.getOwnPropertyDescriptor(r,v):null;_&&(_.get||_.set)?Object.defineProperty(l,v,_):l[v]=r[v]}return l.default=r,n&&n.set(r,l),l}var m=function(a){var n=a.firstImage,l=n===void 0?"":n,u=a.secondImage,v=u===void 0?"":u,_=a.className,E=a.firstImageClassName,h=a.secondImageClassname,B=a.initialSliderPercentage,M=B===void 0?50:B,O=a.slideMode,P=O===void 0?"hover":O,R=a.showHandlebar,D=R===void 0?!0:R,j=a.autoplay,T=j===void 0?!1:j,W=a.autoplayDuration,L=W===void 0?5e3:W,S=(0,t.useState)(M),k=(0,A.default)(S,2),F=k[0],Q=k[1],z=(0,t.useState)(!1),w=(0,A.default)(z,2),N=w[0],V=w[1],X=(0,t.useRef)(null),q=(0,t.useState)(!1),Y=(0,A.default)(q,2),te=Y[0],ie=Y[1],_e=(0,t.useRef)(null),ce=(0,t.useCallback)(function(){if(T){var me=Date.now(),ye=function(){var ge=Date.now()-me,pe=ge%(L*2)/L,Ie=pe<=1?pe*100:(2-pe)*100;Q(Ie),_e.current=setTimeout(ye,16)};ye()}},[T,L]),he=(0,t.useCallback)(function(){_e.current&&(clearTimeout(_e.current),_e.current=null)},[]);(0,t.useEffect)(function(){return ce(),function(){return he()}},[ce,he]);function ne(){ie(!0),he()}function G(){ie(!1),P==="hover"&&Q(M),P==="drag"&&V(!1),ce()}var re=(0,t.useCallback)(function(me){P==="drag"&&V(!0)},[P]),le=(0,t.useCallback)(function(){P==="drag"&&V(!1)},[P]),$=(0,t.useCallback)(function(me){if(X.current&&(P==="hover"||P==="drag"&&N)){var ye=X.current.getBoundingClientRect(),xe=me-ye.left,ge=xe/ye.width*100;requestAnimationFrame(function(){Q(Math.max(0,Math.min(100,ge)))})}},[P,N]),H=(0,t.useCallback)(function(me){return re(me.clientX)},[re]),se=(0,t.useCallback)(function(){return le()},[le]),ee=(0,t.useCallback)(function(me){return $(me.clientX)},[$]),Ae=(0,t.useCallback)(function(me){T||re(me.touches[0].clientX)},[re,T]),fe=(0,t.useCallback)(function(){T||le()},[le,T]),Me=(0,t.useCallback)(function(me){T||$(me.touches[0].clientX)},[$,T]);return t.default.createElement("div",{ref:X,className:(0,g.default)("h-[160px] w-[360px] overflow-hidden",_),style:{position:"relative",cursor:P==="drag"?"grab":"col-resize"},onMouseMove:ee,onMouseLeave:G,onMouseEnter:ne,onMouseDown:H,onMouseUp:se,onTouchStart:Ae,onTouchEnd:fe,onTouchMove:Me},t.default.createElement(d.AnimatePresence,{initial:!1},t.default.createElement(d.motion.div,{className:"absolute top-0 z-30 m-auto h-full w-px bg-linear-to-b from-transparent from-5% via-indigo-500 to-transparent to-95%",style:{left:"".concat(F,"%"),top:"0",zIndex:40},transition:{duration:0}},t.default.createElement("div",{className:"absolute top-1/2 left-0 z-20 h-full w-36 -translate-y-1/2 bg-linear-to-r from-indigo-400 via-transparent to-transparent opacity-50 [mask-image:radial-gradient(100px_at_left,white,transparent)]"}),t.default.createElement("div",{className:"absolute top-1/2 left-0 z-10 h-1/2 w-10 -translate-y-1/2 bg-linear-to-r from-cyan-400 via-transparent to-transparent opacity-100 [mask-image:radial-gradient(50px_at_left,white,transparent)]"}),t.default.createElement("div",{className:"absolute top-1/2 -right-10 h-3/4 w-10 -translate-y-1/2 [mask-image:radial-gradient(100px_at_left,white,transparent)]"}),D&&t.default.createElement("div",{className:"absolute top-1/2 -right-2.5 z-30 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-md bg-white shadow-[0px_-1px_0px_0px_#FFFFFF40]"},t.default.createElement(p.GitMerge,{className:"h-4 w-4 text-black"})))),t.default.createElement("div",{className:"pointer-events-none relative z-20 h-full w-full overflow-hidden"},t.default.createElement(d.AnimatePresence,{initial:!1},l?t.default.createElement(d.motion.div,{className:(0,g.default)("absolute inset-0 z-20 h-full w-full shrink-0 overflow-hidden select-none",E),style:{clipPath:"inset(0 ".concat(100-F,"% 0 0)")},transition:{duration:0}},t.default.createElement("img",{alt:"first image",src:l,className:(0,g.default)("absolute inset-0 z-20 h-full w-full shrink-0 select-none",E),draggable:!1})):null)),t.default.createElement(d.AnimatePresence,{initial:!1},v?t.default.createElement(d.motion.img,{className:(0,g.default)("absolute top-0 left-0 z-19 h-full w-full select-none",h),alt:"second image",src:v,draggable:!1}):null))},i=o.default=m},56589:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=s(e(71508)),t=s(e(10766)),d=function(C){var c=C.number,m=C.className,i=new Array(c||20).fill(!0);return f.default.createElement(f.default.Fragment,null,i.map(function(r,a){return f.default.createElement("span",{key:"meteor"+a,className:(0,A.default)("".concat(t.default["animate-meteor-effect"]," absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-[215deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"),"before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-linear-to-r before:from-[#64748b] before:to-transparent before:content-['']",m),style:{top:0,left:Math.floor(Math.random()*800+-400)+"px",animationDelay:Math.random()*(.8-.2)+.2+"s",animationDuration:Math.floor(Math.random()*8+2)+"s"}})}))},p=o.default=d},57315:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.btn--Vmubv {
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: #3857e3;
  color: #fff;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 10%),
    0 1px 2px 0 rgb(0 0 0 / 6%);
  overflow: hidden;
  position: relative;
  padding: 4px 16px;
  font-size: 0.875rem;
}

.content--jujDv {
  z-index: 2;
}

.btn--Vmubv:hover {
  filter: brightness(115%);
  cursor: pointer;
}

.btn-ripple--w2aOn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgb(255 255 255 / 20%);
  animation: ripple--oIc_l 0.4s ease-in;
}

.btn-ripple-container--II62b {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
}

@keyframes ripple--oIc_l {
  0% {
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  100% {
    width: 200%;
    padding-bottom: 200%;
    opacity: 0;
  }
}
`,"",{version:3,sources:["webpack://./src/components/stateless/AnimateRipple/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,oBAAoB;EACpB,mBAAmB;EACnB,uBAAuB;EACvB,6BAA6B;EAC7B,yBAAyB;EACzB,WAAW;EACX;;+BAE6B;EAC7B,gBAAgB;EAChB,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,wBAAwB;EACxB,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,UAAU;EACV,QAAQ;EACR,SAAS;EACT,kBAAkB;EAClB,kCAAkC;EAClC,qCAA8B;AAChC;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,uBAAuB;AACzB;;AAEA;EACE;IACE,UAAU;EACZ;;EAEA;IACE,UAAU;EACZ;;EAEA;IACE,WAAW;IACX,oBAAoB;IACpB,UAAU;EACZ;AACF",sourcesContent:[`.btn {
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: #3857e3;
  color: #fff;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 10%),
    0 1px 2px 0 rgb(0 0 0 / 6%);
  overflow: hidden;
  position: relative;
  padding: 4px 16px;
  font-size: 0.875rem;
}

.content {
  z-index: 2;
}

.btn:hover {
  filter: brightness(115%);
  cursor: pointer;
}

.btn-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgb(255 255 255 / 20%);
  animation: ripple 0.4s ease-in;
}

.btn-ripple-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
}

@keyframes ripple {
  0% {
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  100% {
    width: 200%;
    padding-bottom: 200%;
    opacity: 0;
  }
}
`],sourceRoot:""}]),d.locals={btn:"btn--Vmubv",content:"content--jujDv","btn-ripple":"btn-ripple--w2aOn",btnRipple:"btn-ripple--w2aOn",ripple:"ripple--oIc_l","btn-ripple-container":"btn-ripple-container--II62b",btnRippleContainer:"btn-ripple-container--II62b"},o.A=d},57596:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=Pe(e(96540)),d=e(39358),p=e(43160),g=e(55211),C=s(e(63278)),c=s(e(51521)),m=Pe(e(47159)),i=s(e(7733)),r=s(e(59378)),a=s(e(64170)),n=s(e(59952)),l=s(e(13187)),u=s(e(6731)),v=s(e(23883)),_=s(e(98343)),E=s(e(78345)),h=s(e(12005)),B=s(e(59764)),M=s(e(6901)),O=s(e(83152)),P=s(e(51941)),R=s(e(37070)),D=s(e(23973)),j=s(e(63643)),T=s(e(87257)),W=s(e(39751)),L=s(e(57659)),S=s(e(54134)),k=s(e(82660)),F=s(e(64357)),Q=s(e(90064)),z=s(e(78236)),w=e(7629),N=s(e(25598)),V=s(e(85042)),X=s(e(56589)),q=s(e(56320)),Y=s(e(70694)),te=s(e(21265)),ie=s(e(66607)),_e=s(e(27488)),ce=s(e(94143)),he=s(e(21502)),ne=s(e(29777)),G=s(e(11845)),re=s(e(1273)),le=s(e(56127)),$=s(e(4204)),H=s(e(45931)),se=s(e(25635)),ee=s(e(65378)),Ae=s(e(20485)),fe=s(e(41854)),Me=s(e(69849)),me=s(e(556)),ye=s(e(93868)),xe=s(e(79204)),ge=s(e(67554)),pe=e(2857),Ie=e(24124),Le=s(e(34028));e(51432);var ae=s(e(40999));function Re(de){if(typeof WeakMap!="function")return null;var je=new WeakMap,U=new WeakMap;return(Re=function(x){return x?U:je})(de)}function Pe(de,je){if(!je&&de&&de.__esModule)return de;if(de===null||f(de)!="object"&&typeof de!="function")return{default:de};var U=Re(je);if(U&&U.has(de))return U.get(de);var y={__proto__:null},x=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var I in de)if(I!=="default"&&{}.hasOwnProperty.call(de,I)){var K=x?Object.getOwnPropertyDescriptor(de,I):null;K&&(K.get||K.set)?Object.defineProperty(y,I,K):y[I]=de[I]}return y.default=de,U&&U.set(de,y),y}var Te={fileName:"./explanations.ts",code:`export const = explanations = {
main : "This component needs more than the default code block to be displayed"
detailed : "For now, if you want the exact same behaviour, please check the github"
}`,lang:"typescript"},Se=`
  const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
    return (
      <div>
        <h2>{item.name}</h2>
        <p>Price: {item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    );
  };
`.trim(),We=["typescript","javascript","react","html5","css3","prisma","nginx","vercel","docker","git","sonarqube"],Ue=[{title:"Step 1",code:"npx create-react-app my-app"},{title:"Step 2",code:"cd my-app"},{title:"Step 3",code:"npm start"},{title:"Step 4",code:"npm run build"}],Fe=function(){var je=(0,t.useState)(""),U=(0,A.default)(je,2),y=U[0],x=U[1],I=(0,t.useRef)(null),K=(0,t.useState)(!1),Z=(0,A.default)(K,2),J=Z[0],oe=Z[1],ue=(0,t.useState)(""),be=(0,A.default)(ue,2),Ce=be[0],mt=be[1],et=(0,t.useRef)(null),Ve=(0,t.useRef)(null),_t=(0,t.useState)("left"),tt=(0,A.default)(_t,2),Et=tt[0],ze=tt[1],vt=function(ve){if(Ve.current){var Qe=(0,pe.getDirection)(ve,Ve.current);switch(Qe){case 0:ze("top");break;case 1:ze("right");break;case 2:ze("bottom");break;case 3:ze("left");break;default:ze("left");break}}},gt=(0,t.useState)(function(){return""}),nt=(0,A.default)(gt,2),rt=nt[0],pt=nt[1],Ct=(0,t.useState)(""),at=(0,A.default)(Ct,2),Ze=at[0],ht=at[1],yt=(0,t.useRef)(null),Bt=function(ve){pt(ve.target.value)},bt=function(ve){ht(ve.target.value)},Dt=function(ve){ve.metaKey&&ve.key==="Enter"&&(ot(),ve.preventDefault())},ot=function(){if(Ze.trim()!==""){var ve=new AbortController;et.current=ve,xt(Ze,rt,ve)}},Mt=function(){et.current.abort(),oe(!1)},xt=function(ve,Qe,Ut){I.current="",x(I.current);var Lt=Ut.signal;oe(!0),(0,pe.oneApiChat)([{content:ve,role:"user"}],Qe,Lt).then(function(Oe){var De=Oe.headers.get("content-type");if(!Oe.ok||!(De!=null&&De.startsWith("text/event-stream"))||Oe.status!==200){if(De!=null&&De.startsWith("text/html")||De!=null&&De.startsWith("text/plain")){var kt=Oe.clone().text();kt.then(function(Ye){x(Ye)})}else if(De!=null&&De.startsWith("application/json")){var wt=Oe.clone().json();wt.then(function(Ye){x((0,pe.prettyObject)(Ye))})}else x(Oe.statusText);oe(!1)}else{var Ge,Ft=Oe==null||(Ge=Oe.body)===null||Ge===void 0?void 0:Ge.getReader(),He=`

`,ke="",ct="",At=function(){Ft.read().then(function(Je){var Kt=Je.done,zt=Je.value;if(Kt){oe(!1);return}for(ke+=new TextDecoder().decode(zt);ke.includes(He);){var ft=ke.indexOf(He),Nt=ke.slice(0,ft),Xe=Nt.split("data: ");for(var $e in Xe)if(Xe[$e]!==""&&Xe[$e]!=="[DONE]")try{var qe,we,Yt=JSON.parse(Xe[$e]),Xt=(qe=(we=Yt.choices[0])===null||we===void 0||(we=we.delta)===null||we===void 0?void 0:we.content)!==null&&qe!==void 0?qe:"";ct+=Xt,mt(new Date().toLocaleString()),I.current=ct,x(I.current)}catch(Qt){}ke=ke.slice(ft+He.length)}At()}).catch(function(Je){})};At()}}).catch(function(Oe){oe(!1),x(Oe.message)})},Ne=(0,t.useRef)(null),Ot=(0,t.useState)(),lt=(0,A.default)(Ot,2),Pt=lt[0],jt=lt[1],it=(0,i.default)({target:Pt}),It=it.scrollDir,st=it.scrollPosition;(0,t.useEffect)(function(){Ne.current&&jt(Ne.current)},[Ne]);var Rt=(0,t.useState)(!1),dt=(0,A.default)(Rt,2),Vt=dt[0],Zt=dt[1],Tt=(0,j.default)(),ut=(0,A.default)(Tt,2),Ee=ut[0],Wt=ut[1],St=We.map(function(Be){return"https://cdn.simpleicons.org/".concat(Be,"/").concat(Be)});return t.default.createElement(r.default,{ref:Ne},t.default.createElement("section",{className:ae.default.avatar,style:{margin:"10px 0",fontSize:24}},t.default.createElement(ne.default,{text:"React version: ".concat(t.version)})),t.default.createElement("section",{style:{marginBottom:15,fontSize:20}},"I love ",t.default.createElement("span",{className:ae.default.circledHighlight},"coding")," in"," ",t.default.createElement(n.default,{alternateText:["Js","Ts","Rect","Vue"]}),"."),t.default.createElement("section",{style:{marginBottom:15,fontSize:20}},"X\u5C81\u7684\u4F60\uFF0C\u6B63\u5904\u5728\u4E00\u4E2A\u7279\u6B8A\u7684\u4F4D\u7F6E\uFF1A",t.default.createElement(ie.default,{text:["\u5E74\u8F7B\u5230\u8DB3\u4EE5\u521B\u65B0, \u6210\u719F\u5230\u61C2\u5F97\u575A\u6301","\u4F60\u65E2\u6709\u5192\u9669\u7684\u52C7\u6C14, \u53C8\u6709\u63A7\u5236\u98CE\u9669\u7684\u667A\u6167","\u4EBA\u751F\u4E0D\u8BBE\u9650\uFF0C\u68A6\u60F3\u4E0D\u8FC7\u671F! "],speed:70,className:"text-gray-500",waitTime:1500,deleteSpeed:40,cursorChar:"_"})),t.default.createElement("section",{style:{margin:"20px 0",fontSize:20}},t.default.createElement(se.default,{textLeft:"\u9010\u5149\u524D\u884C\uFF0C\u5954\u8D74\u65B0\u7A0B\uFF1B",textRight:"\u5343\u5C71\u8FC7\u5C3D\uFF0C\u4E07\u91CC\u661F\u8FB0\uFF01"})),t.default.createElement("section",{style:{margin:"20px 0",fontSize:20}},t.default.createElement(ye.default,{animText:"\u9010\u5149\u524D\u884C\uFF0C\u5954\u8D74\u65B0\u7A0B\uFF1B\u5343\u5C71\u8FC7\u5C3D\uFF0C\u4E07\u91CC\u661F\u8FB0\uFF01"})),t.default.createElement("section",{style:{marginBottom:15,fontSize:20,overflow:"hidden"}},"This is something",t.default.createElement(_e.default,{text:["amazing","new","wonderful","beautiful","smart"]})),t.default.createElement("section",{style:{marginBottom:15,fontSize:20}},t.default.createElement(he.default,{text:"\u5343\u5C71\u8FC7\u5C3D\uFF0C\u4E07\u91CC\u661F\u8FB0!",sparklesCount:5})),t.default.createElement("section",{style:{marginBottom:15,fontSize:20}},t.default.createElement(l.default,{text:"foo bar baz http://example.org bar https://github.com/wkylin/pro-react-admin"})),t.default.createElement("section",{style:{marginBottom:15,fontSize:20}},t.default.createElement(V.default,{text:"Just some shiny text!",disabled:!1,speed:3})),t.default.createElement("section",{style:{marginBottom:15,width:360,fontSize:20}},t.default.createElement(Y.default,{messages:["Preparing your experience","Loading awesome content","Almost there","Just a moment","Getting things ready"]})),t.default.createElement("section",{style:{marginBottom:15,width:360,fontSize:20}},t.default.createElement(re.default,null)),t.default.createElement("section",{style:{marginBottom:15,position:"relative",overflow:"hidden"}},t.default.createElement($.default,{images:St})),t.default.createElement("section",{style:{marginBottom:15,fontSize:20,height:200,width:360,background:"#111827",position:"relative",overflow:"hidden"}},t.default.createElement(X.default,{number:40})),t.default.createElement("section",{style:{marginBottom:15,fontSize:20,height:200,width:360,background:"#111827"}},t.default.createElement(ce.default,{background:"transparent",minSize:.4,maxSize:1,particleDensity:1200,className:"h-full w-full",particleColor:"#FFFFFF"})),t.default.createElement("section",{style:{marginBottom:15,fontSize:20,height:200,width:360,overflow:"hidden",position:"relative"},className:"bg-slate-900"},t.default.createElement(te.default,null)),t.default.createElement("section",{style:{marginBottom:15,fontSize:20,height:200,width:360,overflow:"hidden",position:"relative"},className:"bg-slate-900"},t.default.createElement(G.default,null)),t.default.createElement("section",{onMouseEnter:vt,ref:Ve,style:{marginBottom:15,height:200,width:360,background:"#111827",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}},"Direction: ",Et),t.default.createElement("section",{style:{margin:"20px 0"}},t.default.createElement(q.default,{firstImage:xe.default,secondImage:ge.default,firstImageClassName:"object-cover object-left-top",secondImageClassName:"object-cover object-left-top",className:"h-[200px]",slideMode:"drag"})),t.default.createElement("section",{style:{margin:"20px 0",width:360,height:200,background:"#000"}},t.default.createElement(N.default,{speed:.5,squareSize:20,direction:"diagonal",borderColor:"#222",hoverFillColor:"#222"})),t.default.createElement("section",{className:ae.default.line}),t.default.createElement("section",null,t.default.createElement(v.default,{text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?"})),t.default.createElement(E.default,{text:"A line bordered text."}),t.default.createElement("section",{style:{display:"flex",alignItems:"center",marginTop:10,marginBottom:40}},t.default.createElement(g.Atom,null)," ",t.default.createElement(g.Merge,null)," ",t.default.createElement(g.GitMerge,null)," ",t.default.createElement(g.GitPullRequestArrow,null)),t.default.createElement("section",{style:{marginBottom:40,fontSize:16}},t.default.createElement("h2",null,"Scroll direction: ","".concat(It)),t.default.createElement("p",null,"Scroll position - Top: ",st.top,", Bottom: ",st.bottom)),t.default.createElement("section",{style:{marginBottom:40,fontSize:16}},t.default.createElement("h3",null,"React Animate On Scroll."),t.default.createElement("h3",null,t.default.createElement(l.default,{text:"https://motion.dev/ https://gsap.com/ https://www.react-spring.dev/ https://use-gesture.netlify.app/"})),t.default.createElement("h3",{style:{marginBottom:40}},t.default.createElement(l.default,{text:"https://www.npmjs.com/package/react-animate-on-scroll https://www.npmjs.com/package/react-scroll https://github.com/wellyshen/react-cool-inview"})),t.default.createElement(M.default,null,t.default.createElement(u.default,{src:"https://picsum.photos/seed/picsum/300/160",alt:"Strawberries"}))),t.default.createElement("section",null,t.default.createElement(h.default,null)),t.default.createElement("section",{style:{margin:40}},t.default.createElement(B.default,null)),t.default.createElement("section",{style:{margin:"60px 0 40px 40px"}},t.default.createElement("div",{className:ae.default["video-box"]},t.default.createElement("div",{className:ae.default["video-btn"]},"b"))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(O.default.FadeIn,null,t.default.createElement(_.default,{avatar:"https://picsum.photos/seed/picsum/300/160",text:"Hi, I'm a developer."}))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(O.default.FadeUp,null,t.default.createElement("img",{src:"https://picsum.photos/360/200.jpg",alt:"",style:{maskImage:"linear-gradient(to top, transparent, black 20%, black 80%, transparent)"}}))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},t.default.createElement(O.default.ScaleIn,{triggerOnce:!1},t.default.createElement(t.default.Fragment,null,t.default.createElement("img",{src:"https://picsum.photos/360/200/?blur=2",alt:""}),t.default.createElement("section",{className:ae.default["blend-me"]},"Mix Blend Mode")))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200}},t.default.createElement(O.default.DiyAnimation,{from:{opacity:0,transform:"translate(-100%, 0)"},to:{opacity:1,transform:"translate(0, 0)"},triggerOnce:!0},t.default.createElement(Le.default,null,t.default.createElement("img",{src:"https://picsum.photos/360/200.jpg",alt:""})))),t.default.createElement("section",{style:{marginBottom:40,display:"flex"}},t.default.createElement(C.default,{className:"my-spot",style:{width:360,height:200,color:"#fff"}},t.default.createElement("section",null))),t.default.createElement("section",{style:{margin:"20px 0",fontSize:24}},t.default.createElement(le.default,{delay:.25,inView:!0},"\u8FD9\u4E00\u5E74\uFF0C\u4EE5\u7B14\u4E3A\u5251\uFF0C\u4EE5\u68A6\u4E3A\u9A6C\uFF0C\u5728\u751F\u6D3B\u7684\u753B\u5E03\u4E0A\uFF0C\u7ED8\u5C31\u5C5E\u4E8E\u81EA\u5DF1\u7684\u58EE\u4E3D\u53F2\u8BD7\u3002")),t.default.createElement("section",{style:{margin:"20px 0",fontSize:24}},t.default.createElement(H.default,{text:"2025 \u5E74\uFF0C\u662F\u5145\u6EE1\u5E0C\u671B\u7684\u4E00\u5E74\u3002\u8BA9\u6211\u4EEC\u653E\u4E0B\u8FC7\u53BB\u7684\u5305\u88B1\uFF0C\u8F7B\u88C5\u4E0A\u9635\u3002\u7528\u79EF\u6781\u7684\u5FC3\u6001\u53BB\u9762\u5BF9\u751F\u6D3B\uFF0C\u7528\u575A\u5B9A\u7684\u4FE1\u5FF5\u53BB\u8FFD\u9010\u68A6\u60F3\u3002\u76F8\u4FE1\u81EA\u5DF1\uFF0C\u53EA\u8981\u6211\u4EEC\u52AA\u529B\u594B\u6597\uFF0C\u5C31\u4E00\u5B9A\u80FD\u521B\u9020\u51FA\u5C5E\u4E8E\u81EA\u5DF1\u7684\u7CBE\u5F69\u4EBA\u751F\u3002\u8BA9\u6211\u4EEC\u4E00\u8D77\u9010\u5149\u524D\u884C\uFF0C\u5954\u8D74\u65B0\u7A0B\uFF0C\u4E66\u5199\u5C5E\u4E8E\u6211\u4EEC\u7684\u8F89\u714C\u7BC7\u7AE0\uFF01"})),t.default.createElement("section",{style:{margin:"20px 0"}},t.default.createElement(Q.default,null)),t.default.createElement("section",{style:{marginBottom:10,width:360,height:200,position:"relative",backgroundColor:"rgba(0, 0,0, 0.8)",borderRadius:8}},t.default.createElement("section",{className:ae.default.dotMask,ref:Wt},"dot mask"),t.default.createElement(Me.default,{size:100})),t.default.createElement("section",{style:{marginBottom:40,fontSize:18}},t.default.createElement("section",null,"RectResult."),"width: ",parseInt(Ee==null?void 0:Ee.width)," height: ",parseInt(Ee==null?void 0:Ee.height)," top: ",parseInt(Ee==null?void 0:Ee.top)," bottom:"," ",parseInt(Ee==null?void 0:Ee.bottom)," right: ",parseInt(Ee==null?void 0:Ee.right)," left: ",parseInt(Ee==null?void 0:Ee.left)),t.default.createElement("section",{style:{marginBottom:40,height:200,width:360,overflow:"hidden"}},t.default.createElement(D.default,null)),t.default.createElement("section",{style:{marginBottom:20}},t.default.createElement(k.default,{width:360,height:200,minScratchPercentage:70,className:"flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"},t.default.createElement("p",{className:"text-9xl"},"\u2728"))),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement(P.default,null,"Click Me")),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement("section",{className:ae.default.effect}," Hello CSS")),t.default.createElement("section",{style:{marginBottom:40},className:ae.default.maskBox},t.default.createElement("section",{className:ae.default.watermark},"water mark"),"mask"),t.default.createElement("section",{style:{marginBottom:40}},t.default.createElement("button",{className:ae.default.button,onClick:Ie.fireConfetti},t.default.createElement("span",{className:ae.default["button-label"]},"Click Me"))),t.default.createElement("section",{style:{position:"relative",margin:"80px 0 160px 100px"}},t.default.createElement("div",{className:ae.default["circle-1"]}),t.default.createElement("div",{className:ae.default["circle-2"]}),t.default.createElement("div",{className:ae.default["circle-3"]}),t.default.createElement("div",{className:ae.default["circle-4"]})),t.default.createElement("section",{style:{margin:20},className:ae.default.eHElAY},"Hi, React!"),t.default.createElement("section",null,t.default.createElement("div",{className:ae.default.stages},t.default.createElement("div",{className:ae.default.cubeSpinner},t.default.createElement("span",{className:ae.default.face1},"Web Services"),t.default.createElement("span",{className:ae.default.face2},"Blockchain"),t.default.createElement("span",{className:ae.default.face3},"Mobile Apps")))),t.default.createElement("section",{style:{margin:"20px 0",fontSize:40}},t.default.createElement(R.default,null)),t.default.createElement("section",{style:{width:600,margin:"30px 0"}},t.default.createElement(d.Input,{defaultValue:rt,placeholder:"api key",onChange:Bt,style:{marginBottom:20}}),t.default.createElement(d.Flex,{align:"center"},t.default.createElement(d.Input.TextArea,{ref:yt,defaultValue:Ze,placeholder:"\u6765\uFF0C\u8BF4\u70B9\u4EC0\u4E48\u5457...Meta + Enter\u53D1\u9001",onChange:bt,onKeyDown:Dt,autoSize:!0,style:{width:300,height:30,caretColor:"#ff0000"}}),t.default.createElement(d.Button,{style:{margin:"0 10px"},icon:t.default.createElement(p.SendOutlined,{rotate:-60}),type:"primary",disabled:J,onClick:ot},"\u53D1\u9001"),t.default.createElement(d.Button,{icon:t.default.createElement(p.SendOutlined,{rotate:-60}),type:"primary",disabled:!J,onClick:Mt},"\u505C\u6B62"))),t.default.createElement("section",null,J&&t.default.createElement("div",null,"\u6B63\u5728\u8F93\u5165..."),t.default.createElement("section",{style:{textAlign:"right",color:"#666"}},Ce),t.default.createElement(a.default,{markdownText:y,isLoading:J})),t.default.createElement("section",{style:{position:"relative",fontSize:36}},"I build",t.default.createElement(fe.default,{className:"mx-1 px-4 py-2",words:["creative","interactive","beautiful","modern"]}),t.default.createElement("span",{className:"block text-black sm:inline"},"websites and apps.")),t.default.createElement("section",{style:{margin:20}},t.default.createElement(w.ReactSignature,null)),t.default.createElement("section",{style:{margin:20}},Ue.map(function(Be,ve){return t.default.createElement(L.default.StaticStep,{key:Be.title,step:ve+1,title:Be.title},t.default.createElement(L.default.CodeContainer,null,Be.code))})),t.default.createElement("section",{style:{margin:20}},t.default.createElement(S.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(z.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(m.ResponsiveMasonry,{columnsCountBreakPoints:{350:1,750:2,900:6}},t.default.createElement(m.default,{gutter:"10px"},t.default.createElement("section",{style:{height:100,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:200,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:150,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:150,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:200,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:100,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:200,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:150,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:100,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:150,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:100,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:200,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:150,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:150,width:"100%",border:"1px solid #ccc",background:"#aaa"}})))),t.default.createElement("section",{style:{margin:20}},t.default.createElement(ee.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(T.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(c.default,{autoFill:!0,direction:"left",gradient:!0,gradientColor:"rgba(255, 255, 255, 0.8)"},t.default.createElement("div",{style:{width:200,height:100,lineHeight:"100px",textAlign:"center",background:"#aaa",margin:"0 10px",borderRadius:8}},"React on view"))),t.default.createElement("section",{style:{margin:20}},t.default.createElement(c.default,{autoFill:!0,direction:"right",gradient:!0,gradientColor:"rgba(255, 255, 255, 0.8)"},t.default.createElement("div",{style:{width:200,height:100,lineHeight:"100px",textAlign:"center",background:"#aaa",margin:"0 10px",borderRadius:8}},"Vue"))),t.default.createElement("section",{style:{margin:0}},t.default.createElement(Ae.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(W.default,{preCode:Se})),t.default.createElement("section",{style:{margin:20}},t.default.createElement(F.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(me.default,null)))},Ke=o.default=Fe},57659:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=s(e(71508)),t=function(c){var m=c.step,i=c.title,r=c.children;return f.default.createElement("div",{className:"flex gap-6"},f.default.createElement("div",{className:"flex flex-col items-center"},f.default.createElement("p",{className:"flex size-8 flex-none items-center justify-center rounded-full border border-neutral-400/20 bg-neutral-100 text-sm font-medium text-neutral-700 select-none dark:border-neutral-400/10 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80"},m),f.default.createElement("div",{className:"relative my-2 h-full w-px rounded-full bg-neutral-200 dark:bg-neutral-700"})),f.default.createElement("div",{className:"mb-4 w-full"},f.default.createElement("h6",{className:"mb-4 ml-1 text-lg font-medium tracking-tight text-neutral-700 dark:text-neutral-50"},i),r))},d=function(c){var m=c.children;return f.default.createElement("div",{className:"h-fit w-full rounded-lg border border-neutral-400/20 bg-neutral-100 px-5 py-3 transition-colors duration-300 dark:border-neutral-400/10 dark:bg-neutral-800 dark:hover:bg-neutral-800/80"},f.default.createElement("code",{className:(0,A.default)("text-sm whitespace-pre-wrap text-neutral-500 dark:text-neutral-300")},m))},p={StaticStep:t,CodeContainer:d},g=o.default=p},59378:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(94634)),A=s(e(43693)),t=s(e(91847)),d=s(e(96540)),p=["style","children"];function g(i,r){var a=Object.keys(i);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(i);r&&(n=n.filter(function(l){return Object.getOwnPropertyDescriptor(i,l).enumerable})),a.push.apply(a,n)}return a}function C(i){for(var r=1;r<arguments.length;r++){var a=arguments[r]!=null?arguments[r]:{};r%2?g(Object(a),!0).forEach(function(n){(0,A.default)(i,n,a[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(a)):g(Object(a)).forEach(function(n){Object.defineProperty(i,n,Object.getOwnPropertyDescriptor(a,n))})}return i}var c=d.default.forwardRef(function(i,r){var a=i.style,n=i.children,l=(0,t.default)(i,p);return d.default.createElement("div",(0,f.default)({ref:r},l,{id:"scrollContainer",style:C({width:"100%",height:"calc(100vh - 204px)",position:"relative",overflowX:"hidden",overflowY:"auto"},a)}),n)}),m=o.default=c},59651:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(43693)),t=g(e(96540)),d=e(74848);function p(r){if(typeof WeakMap!="function")return null;var a=new WeakMap,n=new WeakMap;return(p=function(u){return u?n:a})(r)}function g(r,a){if(!a&&r&&r.__esModule)return r;if(r===null||f(r)!="object"&&typeof r!="function")return{default:r};var n=p(a);if(n&&n.has(r))return n.get(r);var l={__proto__:null},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in r)if(v!=="default"&&{}.hasOwnProperty.call(r,v)){var _=u?Object.getOwnPropertyDescriptor(r,v):null;_&&(_.get||_.set)?Object.defineProperty(l,v,_):l[v]=r[v]}return l.default=r,n&&n.set(r,l),l}function C(r,a){var n=Object.keys(r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(r);a&&(l=l.filter(function(u){return Object.getOwnPropertyDescriptor(r,u).enumerable})),n.push.apply(n,l)}return n}function c(r){for(var a=1;a<arguments.length;a++){var n=arguments[a]!=null?arguments[a]:{};a%2?C(Object(n),!0).forEach(function(l){(0,A.default)(r,l,n[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(l){Object.defineProperty(r,l,Object.getOwnPropertyDescriptor(n,l))})}return r}var m=function(a){return(0,d.jsxs)("svg",c(c({xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",width:"1em",height:"1em"},a),{},{children:[(0,d.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),(0,d.jsx)("path",{d:"M1 8h22v7H11v2H7v-2H1zM7 8v7M14 8v7M17 11v4M4 11v4M11 11v1M20 11v4"})]}))},i=o.default=m},59764:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=s(e(76043)),t=function(){return f.default.createElement(f.default.Fragment,null,f.default.createElement("section",{className:A.default.breatheItem},f.default.createElement("span",null,"Breathe")))},d=o.default=t},59952:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=p(e(96540)),t=s(e(45843));function d(c){if(typeof WeakMap!="function")return null;var m=new WeakMap,i=new WeakMap;return(d=function(a){return a?i:m})(c)}function p(c,m){if(!m&&c&&c.__esModule)return c;if(c===null||f(c)!="object"&&typeof c!="function")return{default:c};var i=d(m);if(i&&i.has(c))return i.get(c);var r={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in c)if(n!=="default"&&{}.hasOwnProperty.call(c,n)){var l=a?Object.getOwnPropertyDescriptor(c,n):null;l&&(l.get||l.set)?Object.defineProperty(r,n,l):r[n]=c[n]}return r.default=c,i&&i.set(c,r),r}var g=function(m){var i=m.alternateText,r=i===void 0?[]:i;return(0,A.useEffect)(function(){var a=document.getElementById("alternating-text"),n=0,l=function(v){n=n<r.length-1?n+1:0,a.innerHTML=r[n]};return a.innerHTML=r[0],a.addEventListener("animationiteration",l,!1),function(){a.removeEventListener("animationiteration",l,!1)}},[]),A.default.createElement("span",{className:t.default.alternating,id:"alternating-text"},r[0]||"Text goes here")},C=o.default=g},63278:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(43693)),t=s(e(85715)),d=C(e(96540)),p=s(e(9));function g(a){if(typeof WeakMap!="function")return null;var n=new WeakMap,l=new WeakMap;return(g=function(v){return v?l:n})(a)}function C(a,n){if(!n&&a&&a.__esModule)return a;if(a===null||f(a)!="object"&&typeof a!="function")return{default:a};var l=g(n);if(l&&l.has(a))return l.get(a);var u={__proto__:null},v=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var _ in a)if(_!=="default"&&{}.hasOwnProperty.call(a,_)){var E=v?Object.getOwnPropertyDescriptor(a,_):null;E&&(E.get||E.set)?Object.defineProperty(u,_,E):u[_]=a[_]}return u.default=a,l&&l.set(a,u),u}function c(a,n){var l=Object.keys(a);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(a);n&&(u=u.filter(function(v){return Object.getOwnPropertyDescriptor(a,v).enumerable})),l.push.apply(l,u)}return l}function m(a){for(var n=1;n<arguments.length;n++){var l=arguments[n]!=null?arguments[n]:{};n%2?c(Object(l),!0).forEach(function(u){(0,A.default)(a,u,l[u])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(l)):c(Object(l)).forEach(function(u){Object.defineProperty(a,u,Object.getOwnPropertyDescriptor(l,u))})}return a}var i=function(n){var l=n.className,u=n.style,v=n.children,_=(0,d.useRef)(null),E=(0,d.useState)(!1),h=(0,t.default)(E,2),B=h[0],M=h[1],O=(0,d.useState)({x:0,y:0}),P=(0,t.default)(O,2),R=P[0],D=P[1],j=(0,d.useState)(0),T=(0,t.default)(j,2),W=T[0],L=T[1],S=function(N){if(!(!_.current||B)){var V=_.current,X=V.getBoundingClientRect();D({x:N.clientX-X.left,y:N.clientY-X.top})}},k=function(){M(!0),L(1)},F=function(){M(!1),L(0)},Q=function(){L(1)},z=function(){L(0)};return d.default.createElement("section",{ref:_,onMouseMove:S,onFocus:k,onBlur:F,onMouseEnter:Q,onMouseLeave:z,className:"".concat(p.default.cardEffect," ").concat(l),style:m({},u)},d.default.createElement("section",{className:p.default.spotlight,style:{opacity:W,background:"radial-gradient(1000px circle at ".concat(R.x,"px ").concat(R.y,"px, rgba(190,255,255,.2), transparent 40%)")}}),d.default.createElement("section",{className:p.default.spotlight,style:{opacity:W,border:"2px solid rgb(255, 255, 255)",borderRadius:"8px",WebkitMaskImage:"radial-gradient(40% 40% at ".concat(R.x,"px ").concat(R.y,"px, black 45%, transparent)")}}),v)},r=o.default=i},63361:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(43693)),t=g(e(96540)),d=e(74848);function p(r){if(typeof WeakMap!="function")return null;var a=new WeakMap,n=new WeakMap;return(p=function(u){return u?n:a})(r)}function g(r,a){if(!a&&r&&r.__esModule)return r;if(r===null||f(r)!="object"&&typeof r!="function")return{default:r};var n=p(a);if(n&&n.has(r))return n.get(r);var l={__proto__:null},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in r)if(v!=="default"&&{}.hasOwnProperty.call(r,v)){var _=u?Object.getOwnPropertyDescriptor(r,v):null;_&&(_.get||_.set)?Object.defineProperty(l,v,_):l[v]=r[v]}return l.default=r,n&&n.set(r,l),l}function C(r,a){var n=Object.keys(r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(r);a&&(l=l.filter(function(u){return Object.getOwnPropertyDescriptor(r,u).enumerable})),n.push.apply(n,l)}return n}function c(r){for(var a=1;a<arguments.length;a++){var n=arguments[a]!=null?arguments[a]:{};a%2?C(Object(n),!0).forEach(function(l){(0,A.default)(r,l,n[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(l){Object.defineProperty(r,l,Object.getOwnPropertyDescriptor(n,l))})}return r}var m=function(a){return(0,d.jsxs)("svg",c(c({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"#fff",viewBox:"0 0 120 30"},a),{},{children:[(0,d.jsxs)("circle",{cx:15,cy:15,r:15,children:[(0,d.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,d.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]}),(0,d.jsxs)("circle",{cx:60,cy:15,r:9,fillOpacity:.3,children:[(0,d.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:9,repeatCount:"indefinite",to:9,values:"9;15;9"}),(0,d.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:.5,repeatCount:"indefinite",to:.5,values:".5;1;.5"})]}),(0,d.jsxs)("circle",{cx:105,cy:15,r:15,children:[(0,d.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,d.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]})]}))},i=o.default=m},63643:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(85715)),A=e(96540),t=s(e(43591)),d=function(c){return c?c.getBoundingClientRect():null},p=function(){var c=(0,A.useRef)(null),m=c.current||null,i=(0,A.useState)(d(m)),r=(0,f.default)(i,2),a=r[0],n=r[1],l=(0,A.useCallback)(function(){c.current&&n(d(c.current))},[c]);return(0,A.useLayoutEffect)(function(){var u=c.current;if(u){if(l(),typeof t.default=="function"){var v=new t.default(function(){return l()});return v.observe(u),function(){v&&(v.disconnect(),v=null)}}return window.addEventListener("resize",l),function(){return window.removeEventListener("resize",l)}}},[l]),[a,c]},g=o.default=p},63859:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0,Object.defineProperty(o,"useCopy",{enumerable:!0,get:function(){return A.default}});var f=s(e(90467)),A=s(e(1472)),t=o.default=f.default},64170:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(54756)),t=s(e(94634)),d=s(e(85715)),p=s(e(29293)),g=B(e(96540)),C=e(39358),c=s(e(43160)),m=s(e(71525)),i=s(e(54152)),r=s(e(63940)),a=s(e(16475)),n=s(e(73410)),l=s(e(51498)),u=s(e(35696)),v=e(81591),_=s(e(63361));e(35819);var E=s(e(43259));function h(D){if(typeof WeakMap!="function")return null;var j=new WeakMap,T=new WeakMap;return(h=function(L){return L?T:j})(D)}function B(D,j){if(!j&&D&&D.__esModule)return D;if(D===null||f(D)!="object"&&typeof D!="function")return{default:D};var T=h(j);if(T&&T.has(D))return T.get(D);var W={__proto__:null},L=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var S in D)if(S!=="default"&&{}.hasOwnProperty.call(D,S)){var k=L?Object.getOwnPropertyDescriptor(D,S):null;k&&(k.get||k.set)?Object.defineProperty(W,S,k):W[S]=D[S]}return W.default=D,T&&T.set(D,W),W}var M=function(){var D=(0,p.default)(A.default.mark(function j(T){var W,L;return A.default.wrap(function(k){for(;;)switch(k.prev=k.next){case 0:if(k.prev=0,!((W=navigator)!==null&&W!==void 0&&(W=W.clipboard)!==null&&W!==void 0&&W.writeText)){k.next=5;break}return k.next=4,navigator.clipboard.writeText(T);case 4:C.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F");case 5:k.next=16;break;case 7:k.prev=7,k.t0=k.catch(0),L=document.createElement("textarea"),L.value=T,document.body.appendChild(L),L.focus(),L.select();try{document.execCommand("copy"),C.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F")}catch(F){C.message.success("\u590D\u5236\u5230\u526A\u8D34\u677F\u5931\u8D25")}document.body.removeChild(L);case 16:case"end":return k.stop()}},j,null,[[0,7]])}));return function(T){return D.apply(this,arguments)}}(),O=function(j){var T,W=(0,g.useRef)(null),L=(T=W.current)===null||T===void 0?void 0:T.innerText,S=(0,g.useRef)(""),k=(0,v.useDebouncedCallback)(function(){if(W.current){var F=W.current.querySelector("code"),Q=F.className,z=/language-(\w+)/.exec(Q||"");if(z){var w=(0,d.default)(z,2),N=w[1];S.current=N}}},800);return(0,g.useEffect)(function(){setTimeout(k,1)},[L]),g.default.createElement("section",null,g.default.createElement("section",{className:E.default.copySection},g.default.createElement("span",{className:E.default.lang},S.current),g.default.createElement("span",{className:E.default.copySpan,role:"button",onClick:function(){if(W.current){var Q=W.current.innerText;M(Q)}}},"\u590D\u5236\u4EE3\u7801")),g.default.createElement("pre",{className:E.default.preCode,ref:W},j.children))},P=function(j){var T=j.markdownText,W=T===void 0?"":T,L=j.isLoading,S=L===void 0?!1:L;return g.default.createElement("section",{className:E.default.markdownBody},S&&!W&&g.default.createElement(c.default,{component:_.default,style:{color:"#fff"},className:E.default.loadingIcon}),W&&g.default.createElement(m.default,{remarkPlugins:[i.default,n.default,r.default],rehypePlugins:[a.default,u.default,[l.default,{detect:!1,ignoreMissing:!0}]],components:{pre:O,p:function(F){return g.default.createElement("p",(0,t.default)({},F,{dir:"auto"}))},a:function(F){var Q,z=F.href||"",w=/^\/#/i.test(z),N=w?"_self":(Q=F.target)!==null&&Q!==void 0?Q:"_blank";return g.default.createElement("a",(0,t.default)({},F,{target:N}))}}},W))},R=o.default=P},64357:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=c(e(96540)),d=e(81591),p=s(e(32765)),g=s(e(14278));function C(a){if(typeof WeakMap!="function")return null;var n=new WeakMap,l=new WeakMap;return(C=function(v){return v?l:n})(a)}function c(a,n){if(!n&&a&&a.__esModule)return a;if(a===null||f(a)!="object"&&typeof a!="function")return{default:a};var l=C(n);if(l&&l.has(a))return l.get(a);var u={__proto__:null},v=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var _ in a)if(_!=="default"&&{}.hasOwnProperty.call(a,_)){var E=v?Object.getOwnPropertyDescriptor(a,_):null;E&&(E.get||E.set)?Object.defineProperty(u,_,E):u[_]=a[_]}return u.default=a,l&&l.set(a,u),u}var m=function(n,l,u){if(n==="sm")return{hoverX:l*.03,hoverY:u*.03};if(n==="md")return{hoverX:l*.06,hoverY:u*.06};if(n==="lg")return{hoverX:l*.1,hoverY:u*.1}},i=function(){var n,l=(0,t.useState)(!1),u=(0,A.default)(l,2),v=u[0],_=u[1],E=(0,t.useRef)(),h=(0,t.useRef)([]),B=p.default===null||p.default===void 0?void 0:p.default.length,M=(n=E==null?void 0:E.current)!==null&&n!==void 0?n:{},O=M.offsetWidth,P=M.offsetHeight,R=function(T){var W=T.clientX,L=T.clientY;h.current.forEach(function(S){var k,F=(k=S==null?void 0:S.initialPositions)!==null&&k!==void 0?k:{},Q=F.xPos,z=F.yPos,w=S.size,N=m(w,W,L),V=N.hoverX,X=N.hoverY;S.refItem&&(S.refItem.style.transform="translate(".concat(Q+V,"px, ").concat(z+X,"px)"))})},D=(0,d.useDebouncedCallback)(R,10);return(0,t.useEffect)(function(){_(!0);var j=E==null?void 0:E.current;if(j)return j.addEventListener("mousemove",D),j.addEventListener("resize",D),function(){j&&(j.removeEventListener("mousemove",D),j.removeEventListener("resize",D))}},[]),t.default.createElement("div",{className:g.default.hero,ref:E},v&&t.default.createElement("div",{className:g.default.iconLayer},p.default.map(function(j,T){var W=j.size,L=j.type,S=j.icon,k=Math.ceil(Math.sqrt(B)),F=Math.ceil(B/k),Q=O/F,z=P/k,w=Math.floor(T/F),N=T%F,V=Math.random()*(Q-75),X=Math.random()*(z-75),q=N*Q,Y=w*z,te=q+V,ie=Y+X;return t.default.createElement("span",{key:T,ref:function(ce){return h.current[T]={refItem:ce,initialPositions:{xPos:te,yPos:ie},size:W}},className:"".concat(g.default.icon," ").concat(g.default[L]," ").concat(g.default[W]),style:{transform:"translateX(".concat(te,"px) translateY(").concat(ie,"px)")}},S&&S)})),t.default.createElement("div",{className:g.default.heroText},t.default.createElement("h1",null,"Grow your ",t.default.createElement("br",null)," ",t.default.createElement("span",null,"Frontend Skills")),t.default.createElement("h3",null,"with ",t.default.createElement("span",null,"React"),", ",t.default.createElement("span",null,"Angular"),", ",t.default.createElement("span",null,"Vue"),", ",t.default.createElement("span",null,"Typescript"),", ",t.default.createElement("span",null,"Redux"),","," ",t.default.createElement("span",null,"Node"),", ",t.default.createElement("span",null,"GraphQL"),",",t.default.createElement("span",null,"CSS"),", ",t.default.createElement("span",null,"HTML"),", ",t.default.createElement("span",null,"Webpack"),","," ",t.default.createElement("span",null,"Rollup"),", ",t.default.createElement("span",null,"ESLint"),", ",t.default.createElement("span",null,"Prettier"),", ",t.default.createElement("span",null,"Stylelint"),",",t.default.createElement("span",null,"PostCSS"),","," ",t.default.createElement("span",null,"Styled Components"),", ",t.default.createElement("span",null,"Emotion"),", ",t.default.createElement("span",null,"Material UI"),", ",t.default.createElement("span",null,"Ant Design"),","," ",t.default.createElement("span",null,"Bootstrap"),", ",t.default.createElement("span",null,"Foundation"),",",t.default.createElement("span",null,"React Native"),", ",t.default.createElement("span",null,"Flutter"),","," ",t.default.createElement("span",null,"Python"),", ",t.default.createElement("span",null,"Go"),",",t.default.createElement("span",null,"JavaScript"),", and ",t.default.createElement("span",null,"NPM"))))},r=o.default=i},64508:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(80791),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},64928:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.shinyText--ZebuC {
  color: #333;
  background: linear-gradient(120deg, rgb(0 0 0 / 0%) 40%, rgb(0 0 0 / 80%) 50%, #000 60%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
          background-clip: text;
  display: inline-block;
  animation: shine--BuokE 5s linear infinite;
}

@keyframes shine--BuokE {
  0% {
    background-position: 100%;
  }

  100% {
    background-position: -100%;
  }
}

.shinyText--ZebuC.disabled--dLh_t {
  animation: none;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/ShinyText/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,wFAAwF;EACxF,0BAA0B;EAC1B,6BAAqB;UAArB,qBAAqB;EACrB,qBAAqB;EACrB,0CAAmC;AACrC;;AAEA;EACE;IACE,yBAAyB;EAC3B;;EAEA;IACE,0BAA0B;EAC5B;AACF;;AAEA;EACE,eAAe;AACjB",sourcesContent:[`.shinyText {
  color: #333;
  background: linear-gradient(120deg, rgb(0 0 0 / 0%) 40%, rgb(0 0 0 / 80%) 50%, #000 60%);
  background-size: 200% 100%;
  background-clip: text;
  display: inline-block;
  animation: shine 5s linear infinite;
}

@keyframes shine {
  0% {
    background-position: 100%;
  }

  100% {
    background-position: -100%;
  }
}

.shinyText.disabled {
  animation: none;
}
`],sourceRoot:""}]),d.locals={shinyText:"shinyText--ZebuC",shine:"shine--BuokE",disabled:"disabled--dLh_t"},o.A=d},65378:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=s(e(69363)),t=function(){return f.default.createElement(f.default.Fragment,null,f.default.createElement("div",{className:"flex h-[350px] items-end justify-center px-4 pb-24"},f.default.createElement(A.default,{variants:{hidden:{opacity:0,y:30,scale:.95,filter:"blur(4px)"},visible:{opacity:1,y:0,scale:1,filter:"blur(0px)"}},transition:{duration:.3,ease:"easeInOut"},viewOptions:{margin:"0px 0px -350px 0px"}},f.default.createElement("div",{className:"w-full bg-zinc-100 p-4"},f.default.createElement("p",{className:"text-zinc-600"},f.default.createElement("strong",{className:"font-medium text-zinc-900"},"\u54EA\u5412\uFF1A"),"\u662F\u9B54\u662F\u4ED9\uFF0C\u6211\u81EA\u5DF1\u8BF4\u4E86\u7B97\uFF0C\u7BA1\u4ED6\u4EC0\u4E48\u5929\u52AB\uFF01")))),f.default.createElement("div",{className:"flex h-[350px] items-end justify-center px-4 pb-24"},f.default.createElement(A.default,{variants:{hidden:{opacity:0,x:100},visible:{opacity:1,x:0}},transition:{duration:.3,ease:"easeInOut"},viewOptions:{margin:"0px 0px -350px 0px"}},f.default.createElement("div",{className:"w-full bg-zinc-900 p-4"},f.default.createElement("p",{className:"text-zinc-400"},f.default.createElement("strong",{className:"font-medium text-zinc-50"},"\u54EA\u5412\uFF1A"),"\u4EE5\u524D\u662F\u6211\u4E0D\u61C2\u4E8B\uFF0C\u73B0\u5728\uFF0C\u6362\u6211\u6765\u5B88\u62A4\u9648\u5858\u5173\uFF01")))),f.default.createElement("div",{className:"flex h-[350px] items-end justify-center overflow-x-hidden px-4 pb-24"},f.default.createElement(A.default,{variants:{hidden:{opacity:0,scale:1.5},visible:{opacity:1,scale:1}},transition:{duration:.3,ease:"easeInOut"},viewOptions:{margin:"0px 0px -350px 0px"}},f.default.createElement("div",{className:"w-full bg-zinc-100 p-4"},f.default.createElement("p",{className:"text-zinc-600"},f.default.createElement("strong",{className:"font-medium"},"\u54EA\u5412\uFF1A"),"\u4F60\u662F\u6211\u552F\u4E00\u7684\u5144\u5F1F\uFF0C\u6211\u4E0D\u8BB8\u4F60\u6B7B\uFF01")))))},d=o.default=t},66607:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=C(e(96540)),d=e(21126),p=s(e(71508));function g(i){if(typeof WeakMap!="function")return null;var r=new WeakMap,a=new WeakMap;return(g=function(l){return l?a:r})(i)}function C(i,r){if(!r&&i&&i.__esModule)return i;if(i===null||f(i)!="object"&&typeof i!="function")return{default:i};var a=g(r);if(a&&a.has(i))return a.get(i);var n={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in i)if(u!=="default"&&{}.hasOwnProperty.call(i,u)){var v=l?Object.getOwnPropertyDescriptor(i,u):null;v&&(v.get||v.set)?Object.defineProperty(n,u,v):n[u]=i[u]}return n.default=i,a&&a.set(i,n),n}var c=function(r){var a=r.text,n=r.speed,l=n===void 0?50:n,u=r.initialDelay,v=u===void 0?0:u,_=r.waitTime,E=_===void 0?2e3:_,h=r.deleteSpeed,B=h===void 0?30:h,M=r.loop,O=M===void 0?!0:M,P=r.className,R=r.showCursor,D=R===void 0?!0:R,j=r.hideCursorOnType,T=j===void 0?!1:j,W=r.cursorChar,L=W===void 0?"|":W,S=r.cursorClassName,k=S===void 0?"ml-1":S,F=r.cursorAnimationVariants,Q=F===void 0?{initial:{opacity:0},animate:{opacity:1,transition:{duration:.01,repeat:1/0,repeatDelay:.4,repeatType:"reverse"}}}:F,z=(0,t.useState)(""),w=(0,A.default)(z,2),N=w[0],V=w[1],X=(0,t.useState)(0),q=(0,A.default)(X,2),Y=q[0],te=q[1],ie=(0,t.useState)(!1),_e=(0,A.default)(ie,2),ce=_e[0],he=_e[1],ne=(0,t.useState)(0),G=(0,A.default)(ne,2),re=G[0],le=G[1],$=Array.isArray(a)?a:[a];return(0,t.useEffect)(function(){var H,se=$[re],ee=function(){if(ce)if(N===""){if(he(!1),re===$.length-1&&!O)return;le(function(fe){return(fe+1)%$.length}),te(0),H=setTimeout(function(){},E)}else H=setTimeout(function(){V(function(fe){return fe.slice(0,-1)})},B);else Y<se.length?H=setTimeout(function(){V(function(fe){return fe+se[Y]}),te(function(fe){return fe+1})},l):$.length>1&&(H=setTimeout(function(){he(!0)},E))};return Y===0&&!ce&&N===""?H=setTimeout(ee,v):ee(),function(){return clearTimeout(H)}},[Y,N,ce,l,B,E,$,re,O]),t.default.createElement("div",{className:"inline tracking-tight whitespace-pre-wrap ".concat(P)},t.default.createElement("span",null,N),D&&t.default.createElement(d.motion.span,{variants:Q,className:(0,p.default)(k,T&&(Y<$[re].length||ce)?"hidden":""),initial:"initial",animate:"animate"},L))},m=o.default=c},67554:function(b){"use strict";b.exports="data:image/jpeg;base64,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"},69363:function(b,o,e){"use strict";var s=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=d(e(96540)),A=e(21126);function t(c){if(typeof WeakMap!="function")return null;var m=new WeakMap,i=new WeakMap;return(t=function(a){return a?i:m})(c)}function d(c,m){if(!m&&c&&c.__esModule)return c;if(c===null||s(c)!="object"&&typeof c!="function")return{default:c};var i=t(m);if(i&&i.has(c))return i.get(c);var r={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in c)if(n!=="default"&&{}.hasOwnProperty.call(c,n)){var l=a?Object.getOwnPropertyDescriptor(c,n):null;l&&(l.get||l.set)?Object.defineProperty(r,n,l):r[n]=c[n]}return r.default=c,i&&i.set(c,r),r}var p={hidden:{opacity:0},visible:{opacity:1}},g=function(m){var i=m.children,r=m.variants,a=r===void 0?p:r,n=m.transition,l=m.viewOptions,u=m.as,v=u===void 0?"div":u,_=(0,f.useRef)(null),E=(0,A.useInView)(_,l),h=A.motion[v];return f.default.createElement(h,{ref:_,initial:"hidden",animate:E?"visible":"hidden",variants:a,transition:n},i)},C=o.default=g},69849:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(43693)),A=s(e(96540)),t=e(21126),d=s(e(71508));function p(m,i){var r=Object.keys(m);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(m);i&&(a=a.filter(function(n){return Object.getOwnPropertyDescriptor(m,n).enumerable})),r.push.apply(r,a)}return r}function g(m){for(var i=1;i<arguments.length;i++){var r=arguments[i]!=null?arguments[i]:{};i%2?p(Object(r),!0).forEach(function(a){(0,f.default)(m,a,r[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(m,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach(function(a){Object.defineProperty(m,a,Object.getOwnPropertyDescriptor(r,a))})}return m}var C=function(i){var r=i.className,a=i.size,n=a===void 0?50:a,l=i.delay,u=l===void 0?0:l,v=i.duration,_=v===void 0?6:v,E=i.colorFrom,h=E===void 0?"#ffaa40":E,B=i.colorTo,M=B===void 0?"#9c40ff":B,O=i.transition,P=i.style,R=i.reverse,D=R===void 0?!1:R,j=i.initialOffset,T=j===void 0?0:j;return A.default.createElement("div",{className:"pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"},A.default.createElement(t.motion.div,{className:(0,d.default)("absolute aspect-square","bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",r),style:g({width:n,offsetPath:"rect(0 auto auto 0 round ".concat(n,"px)"),"--color-from":h,"--color-to":M},P),initial:{offsetDistance:"".concat(T,"%")},animate:{offsetDistance:D?["".concat(100-T,"%"),"".concat(-T,"%")]:["".concat(T,"%"),"".concat(100+T,"%")]},transition:g({repeat:1/0,ease:"linear",duration:_,delay:-u},O)}))},c=o.default=C},70694:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.LoadingText=C,o.default=void 0;var A=s(e(85715)),t=g(e(96540)),d=e(21126);function p(i){if(typeof WeakMap!="function")return null;var r=new WeakMap,a=new WeakMap;return(p=function(l){return l?a:r})(i)}function g(i,r){if(!r&&i&&i.__esModule)return i;if(i===null||f(i)!="object"&&typeof i!="function")return{default:i};var a=p(r);if(a&&a.has(i))return a.get(i);var n={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in i)if(u!=="default"&&{}.hasOwnProperty.call(i,u)){var v=l?Object.getOwnPropertyDescriptor(i,u):null;v&&(v.get||v.set)?Object.defineProperty(n,u,v):n[u]=i[u]}return n.default=i,a&&a.set(i,n),n}function C(i){var r=i.text,a=i.dots;return t.default.createElement("div",{className:"relative"},t.default.createElement(d.AnimatePresence,{mode:"wait"},t.default.createElement(d.motion.div,{key:r,initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.3},className:"w-full text-lg font-medium"},r,a)))}var c=function(r){var a=r.messages,n=r.interval,l=n===void 0?2e3:n,u=r.dotCount,v=u===void 0?3:u,_=r.direction,E=_===void 0?"vertical":_,h=(0,t.useState)(0),B=(0,A.default)(h,2),M=B[0],O=B[1],P=(0,t.useState)(""),R=(0,A.default)(P,2),D=R[0],j=R[1];return(0,t.useEffect)(function(){var T=setInterval(function(){O(function(L){return(L+1)%a.length})},l),W=setInterval(function(){j(function(L){return L.length>=v?"":"".concat(L,".")})},500);return function(){clearInterval(T),clearInterval(W)}},[a.length,l,v]),E==="horizontal"?t.default.createElement("div",{className:"flex w-full items-center justify-start gap-3 rounded-xs border px-3 py-2"},t.default.createElement(d.motion.div,{className:"text-primary-foreground size-5 rounded-full border-[3px] border-t-transparent md:size-6",animate:{rotate:360},transition:{duration:1,repeat:Number.POSITIVE_INFINITY,ease:"linear"}}),t.default.createElement(C,{text:a[M],dots:D})):t.default.createElement("div",{className:"flex flex-col items-center justify-center gap-4 py-1"},t.default.createElement(d.motion.div,{className:"text-primary-foreground size-10 rounded-full border-[3px] border-t-transparent md:size-12",animate:{rotate:360},transition:{duration:1,repeat:Number.POSITIVE_INFINITY,ease:"linear"}}),t.default.createElement(C,{text:a[M],dots:D}))},m=o.default=c},76043:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(88362),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},78236:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=s(e(53179)),t=function(){return f.default.createElement("div",{className:"".concat(A.default.placeholder," ").concat(A.default.shimmer)},f.default.createElement("div",{className:A.default["faux-image-wrapper"]},f.default.createElement("div",{className:A.default["faux-image"]})),f.default.createElement("div",{className:A.default["faux-text"]}),f.default.createElement("div",{className:"".concat(A.default["faux-text"]," ").concat(A.default.short)}),f.default.createElement("div",{className:"".concat(A.default["faux-text"]," ").concat(A.default["min-short"])}))},d=o.default=t},78345:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=s(e(64508)),t=function(g){var C=g.text;return f.default.createElement("span",{className:A.default.lineBordered},C)},d=o.default=t},79204:function(b){"use strict";b.exports="data:image/jpeg;base64,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"},79901:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.avatarCard--kIii3 {\r
  .card--W_bZq {\r
    width: 350px;\r
    display: flex;\r
    flex-direction: column;\r
    align-items: center;\r
    background: #f3f1fe;\r
    border-radius: 10px;\r
    margin: 8px;\r
    margin-top: 100px;\r
  }\r
\r
  .card--W_bZq figure {\r
    width: 120px;\r
    height: 120px;\r
    border-radius: 50%;\r
    margin-top: -60px;\r
    position: relative;\r
  }\r
\r
  .card--W_bZq figure::before {\r
    content: '';\r
    border-radius: inherit;\r
    position: absolute;\r
    top: 50%;\r
    left: 50%;\r
    width: 100%;\r
    height: 100%;\r
    transform: translate(-50%, -50%);\r
    border: 1rem solid #fff;\r
    box-shadow: 0 1px #fff;\r
  }\r
\r
  .card--W_bZq figure img {\r
    border-radius: inherit;\r
    width: 100%;\r
    height: 100%;\r
    object-fit: cover;\r
  }\r
\r
  .card--W_bZq .content--yiHmV {\r
    text-align: center;\r
    margin: 2rem;\r
    line-height: 1.5;\r
    color: #101010;\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/AvatarCard/index.module.less"],names:[],mappings:"AAAA;EACE;IACE,YAAY;IACZ,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,mBAAmB;IACnB,mBAAmB;IACnB,WAAW;IACX,iBAAiB;EACnB;;EAEA;IACE,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,iBAAiB;IACjB,kBAAkB;EACpB;;EAEA;IACE,WAAW;IACX,sBAAsB;IACtB,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,WAAW;IACX,YAAY;IACZ,gCAAgC;IAChC,uBAAuB;IACvB,sBAAsB;EACxB;;EAEA;IACE,sBAAsB;IACtB,WAAW;IACX,YAAY;IACZ,iBAAiB;EACnB;;EAEA;IACE,kBAAkB;IAClB,YAAY;IACZ,gBAAgB;IAChB,cAAc;EAChB;AACF",sourcesContent:[`.avatarCard {\r
  .card {\r
    width: 350px;\r
    display: flex;\r
    flex-direction: column;\r
    align-items: center;\r
    background: #f3f1fe;\r
    border-radius: 10px;\r
    margin: 8px;\r
    margin-top: 100px;\r
  }\r
\r
  .card figure {\r
    width: 120px;\r
    height: 120px;\r
    border-radius: 50%;\r
    margin-top: -60px;\r
    position: relative;\r
  }\r
\r
  .card figure::before {\r
    content: '';\r
    border-radius: inherit;\r
    position: absolute;\r
    top: 50%;\r
    left: 50%;\r
    width: 100%;\r
    height: 100%;\r
    transform: translate(-50%, -50%);\r
    border: 1rem solid #fff;\r
    box-shadow: 0 1px #fff;\r
  }\r
\r
  .card figure img {\r
    border-radius: inherit;\r
    width: 100%;\r
    height: 100%;\r
    object-fit: cover;\r
  }\r
\r
  .card .content {\r
    text-align: center;\r
    margin: 2rem;\r
    line-height: 1.5;\r
    color: #101010;\r
  }\r
}\r
`],sourceRoot:""}]),d.locals={avatarCard:"avatarCard--kIii3",card:"card--W_bZq",content:"content--yiHmV"},o.A=d},80791:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.lineBordered--bh05r {
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

.image-cover--ZVSiS p:first-child::first-letter {
  color: #5f79ff;
  float: left;
  margin: 0 8px 0 4px;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
}

.container--lADY1 {
  position: relative;
  background: #fff;
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
  border-bottom-color: #fff;
}

.container--lADY1.bottom--P1bZI::before,
.container--lADY1.bottom--P1bZI::after {
  top: 100%;
  right: 19px;
  border-top-color: #ccc;
}

.container--lADY1.bottom--P1bZI::after {
  right: 20px;
  border-top-color: #fff;
}

.no-scrollbars--AUOMQ {
  overflow: auto;
  scrollbar-width: none;
}

.no-scrollbars--AUOMQ::-webkit-scrollbar {
  display: none;
}

.engraved-text--dMPwS {
  background-color: #666;
  -webkit-background-clip: text;
          background-clip: text;
  color: transparent;
  text-shadow: 3px 5px 1px rgb(245 245 245 / 50%);
}

.embossed-text--eQZ0_ {
  color: #f0f0f0;
  background-color: #666;
  text-shadow: 1px 4px 4px #555;
  -webkit-background-clip: text;
          background-clip: text;
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
`,"",{version:3,sources:["webpack://./src/components/stateless/LineBordered/index.module.less"],names:[],mappings:"AAAA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB;;AAEA;;EAEE,2BAA2B;EAC3B,oBAAoB;EACpB,WAAW;EACX,SAAS;EACT,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,6BAA6B;EAC7B,QAAQ;EACR,SAAS;AACX;;AAEA;EACE,gCAAgC;EAChC,YAAY;EACZ,OAAO;AACT;;AAEA;;EAEE,WAAW;AACb;;AAEA;EACE,qBAAqB;EACrB,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,WAAW;EACX,oBAAoB;EACpB,WAAW;EACX,SAAS;EACT,OAAO;EACP,yBAAyB;EACzB,oCAAoC;AACtC;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,oDAAoD;AACtD;;AAEA;EACE,WAAW;EACX,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,WAAW;EACX,oBAAoB;EACpB,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,iBAAiB;EACjB,0BAA0B;AAC5B;;AAEA;EACE,cAAc;EACd,WAAW;EACX,mBAAmB;EACnB,eAAe;EACf,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;;EAEE,WAAW;EACX,kBAAkB;EAClB,8BAA8B;AAChC;;AAEA;EACE,8BAA8B;AAChC;;AAEA;;EAEE,YAAY;EACZ,UAAU;EACV,yBAAyB;AAC3B;;AAEA;EACE,UAAU;EACV,yBAAyB;AAC3B;;AAEA;;EAEE,SAAS;EACT,WAAW;EACX,sBAAsB;AACxB;;AAEA;EACE,WAAW;EACX,sBAAsB;AACxB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,sBAAsB;EACtB,6BAAqB;UAArB,qBAAqB;EACrB,kBAAkB;EAClB,+CAA+C;AACjD;;AAEA;EACE,cAAc;EACd,sBAAsB;EACtB,6BAA6B;EAC7B,6BAAqB;UAArB,qBAAqB;AACvB;;AAEA;EACE,2DAA2D;EAC3D,qDAAqD;EACrD,uDAAuD;EACvD,uDAAuD;EACvD,uDAAuD;EACvD,sDAAsD;EACtD,oDAAoD;;EAEpD,0DAA0D;EAC1D,qDAAqD;EACrD,qDAAqD;EACrD,oDAAoD;EACpD,gDAAgD;EAChD,+CAA+C;EAC/C,oDAAoD;;EAEpD,gEAAgE;EAChE,2DAA2D;EAC3D,yDAAyD;EACzD,oDAAoD;EACpD,mDAAmD;EACnD,4CAA4C;EAC5C,0DAA0D;AAC5D",sourcesContent:[`.lineBordered {
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

.image-cover p:first-child::first-letter {
  color: #5f79ff;
  float: left;
  margin: 0 8px 0 4px;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
}

.container {
  position: relative;
  background: #fff;
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
  border-bottom-color: #fff;
}

.container.bottom::before,
.container.bottom::after {
  top: 100%;
  right: 19px;
  border-top-color: #ccc;
}

.container.bottom::after {
  right: 20px;
  border-top-color: #fff;
}

.no-scrollbars {
  overflow: auto;
  scrollbar-width: none;
}

.no-scrollbars::-webkit-scrollbar {
  display: none;
}

.engraved-text {
  background-color: #666;
  background-clip: text;
  color: transparent;
  text-shadow: 3px 5px 1px rgb(245 245 245 / 50%);
}

.embossed-text {
  color: #f0f0f0;
  background-color: #666;
  text-shadow: 1px 4px 4px #555;
  background-clip: text;
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
`],sourceRoot:""}]),d.locals={lineBordered:"lineBordered--bh05r","hover-underline-animation":"hover-underline-animation--TSfGP",hoverUnderlineAnimation:"hover-underline-animation--TSfGP",left:"left--ErwKf",center:"center--BFLFI",right:"right--DRVwU","dynamic-shadow":"dynamic-shadow--Us2nj",dynamicShadow:"dynamic-shadow--Us2nj","image-contain":"image-contain--Z_yfM",imageContain:"image-contain--Z_yfM","image-cover":"image-cover--ZVSiS",imageCover:"image-cover--ZVSiS",container:"container--lADY1",top:"top--XQMfF",bottom:"bottom--P1bZI","no-scrollbars":"no-scrollbars--AUOMQ",noScrollbars:"no-scrollbars--AUOMQ","engraved-text":"engraved-text--dMPwS",engravedText:"engraved-text--dMPwS","embossed-text":"embossed-text--eQZ0_",embossedText:"embossed-text--eQZ0_"},o.A=d},82547:function(b){"use strict";b.exports="data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 4%27%3E%3Cstyle type=%27text/css%27%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX%280%29;}to {transform:translateX%28-15px%29;}}%3C/style%3E%3Cpath fill=%27none%27 stroke=%27%230087ca%27 stroke-width=%272%27 class=%27squiggle%27 d=%27M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3%27/%3E%3C/svg%3E"},82660:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=C(e(96540)),d=s(e(71508)),p=e(21126);function g(i){if(typeof WeakMap!="function")return null;var r=new WeakMap,a=new WeakMap;return(g=function(l){return l?a:r})(i)}function C(i,r){if(!r&&i&&i.__esModule)return i;if(i===null||f(i)!="object"&&typeof i!="function")return{default:i};var a=g(r);if(a&&a.has(i))return a.get(i);var n={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in i)if(u!=="default"&&{}.hasOwnProperty.call(i,u)){var v=l?Object.getOwnPropertyDescriptor(i,u):null;v&&(v.get||v.set)?Object.defineProperty(n,u,v):n[u]=i[u]}return n.default=i,a&&a.set(i,n),n}var c=function(r){var a=r.width,n=r.height,l=r.minScratchPercentage,u=l===void 0?50:l,v=r.onComplete,_=r.children,E=r.className,h=(0,t.useRef)(null),B=(0,t.useState)(!1),M=(0,A.default)(B,2),O=M[0],P=M[1],R=(0,t.useState)(!1),D=(0,A.default)(R,2),j=D[0],T=D[1],W=(0,p.useAnimation)();(0,t.useEffect)(function(){var z=h.current,w=z==null?void 0:z.getContext("2d");if(z&&w){var N=w.createLinearGradient(0,0,z.width,z.height);N.addColorStop(0,"#A97CF8"),N.addColorStop(.5,"#F38CB8"),N.addColorStop(1,"#FDCC92"),w.fillStyle=N,w.fillRect(0,0,z.width,z.height)}},[]),(0,t.useEffect)(function(){var z=function(q){O&&k(q.clientX,q.clientY)},w=function(q){if(O){var Y=q.touches[0];k(Y.clientX,Y.clientY)}},N=function(){P(!1),F()},V=function(){P(!1),F()};return document.addEventListener("mousedown",z),document.addEventListener("mousemove",z),document.addEventListener("touchstart",w),document.addEventListener("touchmove",w),document.addEventListener("mouseup",N),document.addEventListener("touchend",V),document.addEventListener("touchcancel",V),function(){document.removeEventListener("mousedown",z),document.removeEventListener("mousemove",z),document.removeEventListener("touchstart",w),document.removeEventListener("touchmove",w),document.removeEventListener("mouseup",N),document.removeEventListener("touchend",V),document.removeEventListener("touchcancel",V)}},[O]);var L=function(){return P(!0)},S=function(){return P(!0)},k=function(w,N){var V=h.current,X=V==null?void 0:V.getContext("2d");if(V&&X){var q=V.getBoundingClientRect(),Y=w-q.left+16,te=N-q.top+16;X.globalCompositeOperation="destination-out",X.beginPath(),X.arc(Y,te,30,0,Math.PI*2),X.fill()}},F=function(){if(!j){var w=h.current,N=w==null?void 0:w.getContext("2d");if(w&&N){for(var V=N.getImageData(0,0,w.width,w.height),X=V.data,q=X.length/4,Y=0,te=3;te<X.length;te+=4)X[te]===0&&Y++;var ie=Y/q*100;ie>=u&&(T(!0),N.clearRect(0,0,w.width,w.height),Q(),v&&v())}}},Q=function(){W.start({scale:[1,1.5,1],rotate:[0,10,-10,10,-10,0],transition:{duration:.5}})};return t.default.createElement(p.motion.div,{className:(0,d.default)("relative select-none",E),style:{width:a,height:n,cursor:"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNSIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MXB4OyIgLz4KPC9zdmc+'), auto"},animate:W},t.default.createElement("canvas",{ref:h,width:a,height:n,className:"absolute top-0 left-0",onMouseDown:L,onTouchStart:S}),_)},m=o.default=c},83152:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(43693)),t=s(e(85715)),d=g(e(96540));function p(_){if(typeof WeakMap!="function")return null;var E=new WeakMap,h=new WeakMap;return(p=function(M){return M?h:E})(_)}function g(_,E){if(!E&&_&&_.__esModule)return _;if(_===null||f(_)!="object"&&typeof _!="function")return{default:_};var h=p(E);if(h&&h.has(_))return h.get(_);var B={__proto__:null},M=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var O in _)if(O!=="default"&&{}.hasOwnProperty.call(_,O)){var P=M?Object.getOwnPropertyDescriptor(_,O):null;P&&(P.get||P.set)?Object.defineProperty(B,O,P):B[O]=_[O]}return B.default=_,h&&h.set(_,B),B}function C(_,E){var h=Object.keys(_);if(Object.getOwnPropertySymbols){var B=Object.getOwnPropertySymbols(_);E&&(B=B.filter(function(M){return Object.getOwnPropertyDescriptor(_,M).enumerable})),h.push.apply(h,B)}return h}function c(_){for(var E=1;E<arguments.length;E++){var h=arguments[E]!=null?arguments[E]:{};E%2?C(Object(h),!0).forEach(function(B){(0,A.default)(_,B,h[B])}):Object.getOwnPropertyDescriptors?Object.defineProperties(_,Object.getOwnPropertyDescriptors(h)):C(Object(h)).forEach(function(B){Object.defineProperty(_,B,Object.getOwnPropertyDescriptor(h,B))})}return _}var m=function(E){var h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"0px",B=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,M=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1,O=(0,d.useState)(!0),P=(0,t.default)(O,2),R=P[0],D=P[1],j=(0,d.useRef)(null);return(0,d.useEffect)(function(){return j.current=new IntersectionObserver(function(T){var W=(0,t.default)(T,1),L=W[0];L.isIntersecting&&L.intersectionRatio>=B?(D(!0),M&&j.current.disconnect()):D(!1)},{rootMargin:h,threshold:B}),E.current&&j.current.observe(E.current),function(){E.current&&j.current.unobserve(E.current)}},[E,h,B,M]),R},i=function(E){var h=E.from,B=E.to,M=E.rootMargin,O=E.threshold,P=E.triggerOnce,R=E.children,D=(0,d.useRef)(null),j=m(D,M,O,P),T={transition:"1000ms ease-in-out"};return d.default.createElement("div",{ref:D,style:j?c(c({},T),B):c(c({},T),h)},R)},r=function(E){var h=E.rootMargin,B=h===void 0?"0px":h,M=E.threshold,O=M===void 0?0:M,P=E.triggerOnce,R=P===void 0?!1:P,D=E.children;return d.default.createElement(i,{from:{opacity:0},to:{opacity:1},rootMargin:B,threshold:O,triggerOnce:R},D)},a=function(E){var h=E.rootMargin,B=h===void 0?"0px":h,M=E.threshold,O=M===void 0?0:M,P=E.triggerOnce,R=P===void 0?!1:P,D=E.children;return d.default.createElement(i,{from:{opacity:0,translate:"0 2rem"},to:{opacity:1,translate:"none"},rootMargin:B,threshold:O,triggerOnce:R},D)},n=function(E){var h=E.rootMargin,B=h===void 0?"0px":h,M=E.threshold,O=M===void 0?0:M,P=E.triggerOnce,R=P===void 0?!1:P,D=E.children;return d.default.createElement(i,{from:{scale:"0"},to:{scale:"1"},rootMargin:B,threshold:O,triggerOnce:R},D)},l=function(E){var h=E.from,B=E.to,M=E.rootMargin,O=M===void 0?"0px":M,P=E.threshold,R=P===void 0?0:P,D=E.triggerOnce,j=D===void 0?!1:D,T=E.children;return d.default.createElement(i,{from:h,to:B,rootMargin:O,threshold:R,triggerOnce:j},T)},u={FadeIn:r,FadeUp:a,ScaleIn:n,DiyAnimation:l},v=o.default=u},83386:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`/* section */\r
.section--p4kEt {\r
  width: 90vw;\r
}\r
\r
.section-center--v_JIb {\r
  margin: 0 auto;\r
  margin-top: 4rem;\r
  width: 80vw;\r
  height: 450px;\r
  max-width: 800px;\r
  text-align: center;\r
  position: relative;\r
  display: flex;\r
  overflow: hidden;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.person-img--TI6oK {\r
  border-radius: 50%;\r
  margin-bottom: 1rem;\r
  width: 150px;\r
  height: 150px;\r
  object-fit: cover;\r
  border: 4px solid hsl(210deg 31% 80%);\r
  box-shadow: 0 5px 15px rgb(0 0 0 / 20%);\r
}\r
\r
article h4 {\r
  text-transform: uppercase;\r
  color: hsl(21deg 62% 45%);\r
  margin-bottom: 0.25rem;\r
}\r
\r
.text--KTqJ2 {\r
  max-width: 35em;\r
  margin: 0 auto;\r
  margin-top: 2rem;\r
  line-height: 2;\r
  color: hsl(210deg 22% 49%);\r
}\r
\r
.icon--BvtNK {\r
  font-size: 3rem;\r
  color: hsl(21deg 62% 45%);\r
}\r
\r
.prev--ZH0Iz,\r
.next--fXhU_ {\r
  position: absolute;\r
  top: 150px;\r
  transform: translateY(-50%);\r
  height: 1.25rem;\r
  display: grid;\r
  place-items: center;\r
  border-color: transparent;\r
  font-size: 1rem;\r
  border-radius: 0.25rem;\r
  cursor: pointer;\r
  transition: all 0.3s linear;\r
}\r
\r
.prev--ZH0Iz {\r
  left: 0;\r
}\r
\r
.next--fXhU_ {\r
  right: 0;\r
}\r
\r
article {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  opacity: 0;\r
  transition: all 0.3s linear;\r
  display: flex;\r
  flex-flow: column;\r
  align-items: center;\r
}\r
\r
article.activeSlide--HRpnT {\r
  opacity: 1;\r
  transform: translateX(0);\r
}\r
\r
article.lastSlide--ECyTb {\r
  transform: translateX(-100%);\r
}\r
\r
article.nextSlide--l7wCN {\r
  transform: translateX(100%);\r
}\r
\r
article.lastSlideRight--Va86d {\r
  transform: translateX(100%);\r
}\r
\r
article.nextSlideRight--rQmHZ {\r
  transform: translateX(-100%);\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/AutoSlider/index.module.less"],names:[],mappings:"AAAA,YAAY;AACZ;EACE,WAAW;AACb;;AAEA;EACE,cAAc;EACd,gBAAgB;EAChB,WAAW;EACX,aAAa;EACb,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;EAClB,aAAa;EACb,gBAAgB;EAChB,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,qCAAqC;EACrC,uCAAuC;AACzC;;AAEA;EACE,yBAAyB;EACzB,yBAAyB;EACzB,sBAAsB;AACxB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,cAAc;EACd,0BAA0B;AAC5B;;AAEA;EACE,eAAe;EACf,yBAAyB;AAC3B;;AAEA;;EAEE,kBAAkB;EAClB,UAAU;EACV,2BAA2B;EAC3B,eAAe;EACf,aAAa;EACb,mBAAmB;EACnB,yBAAyB;EACzB,eAAe;EACf,sBAAsB;EACtB,eAAe;EACf,2BAA2B;AAC7B;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,QAAQ;AACV;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,UAAU;EACV,2BAA2B;EAC3B,aAAa;EACb,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,wBAAwB;AAC1B;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,4BAA4B;AAC9B",sourcesContent:[`/* section */\r
.section {\r
  width: 90vw;\r
}\r
\r
.section-center {\r
  margin: 0 auto;\r
  margin-top: 4rem;\r
  width: 80vw;\r
  height: 450px;\r
  max-width: 800px;\r
  text-align: center;\r
  position: relative;\r
  display: flex;\r
  overflow: hidden;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.person-img {\r
  border-radius: 50%;\r
  margin-bottom: 1rem;\r
  width: 150px;\r
  height: 150px;\r
  object-fit: cover;\r
  border: 4px solid hsl(210deg 31% 80%);\r
  box-shadow: 0 5px 15px rgb(0 0 0 / 20%);\r
}\r
\r
article h4 {\r
  text-transform: uppercase;\r
  color: hsl(21deg 62% 45%);\r
  margin-bottom: 0.25rem;\r
}\r
\r
.text {\r
  max-width: 35em;\r
  margin: 0 auto;\r
  margin-top: 2rem;\r
  line-height: 2;\r
  color: hsl(210deg 22% 49%);\r
}\r
\r
.icon {\r
  font-size: 3rem;\r
  color: hsl(21deg 62% 45%);\r
}\r
\r
.prev,\r
.next {\r
  position: absolute;\r
  top: 150px;\r
  transform: translateY(-50%);\r
  height: 1.25rem;\r
  display: grid;\r
  place-items: center;\r
  border-color: transparent;\r
  font-size: 1rem;\r
  border-radius: 0.25rem;\r
  cursor: pointer;\r
  transition: all 0.3s linear;\r
}\r
\r
.prev {\r
  left: 0;\r
}\r
\r
.next {\r
  right: 0;\r
}\r
\r
article {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  opacity: 0;\r
  transition: all 0.3s linear;\r
  display: flex;\r
  flex-flow: column;\r
  align-items: center;\r
}\r
\r
article.activeSlide {\r
  opacity: 1;\r
  transform: translateX(0);\r
}\r
\r
article.lastSlide {\r
  transform: translateX(-100%);\r
}\r
\r
article.nextSlide {\r
  transform: translateX(100%);\r
}\r
\r
article.lastSlideRight {\r
  transform: translateX(100%);\r
}\r
\r
article.nextSlideRight {\r
  transform: translateX(-100%);\r
}\r
`],sourceRoot:""}]),d.locals={section:"section--p4kEt","section-center":"section-center--v_JIb",sectionCenter:"section-center--v_JIb","person-img":"person-img--TI6oK",personImg:"person-img--TI6oK",text:"text--KTqJ2",icon:"icon--BvtNK",prev:"prev--ZH0Iz",next:"next--fXhU_",activeSlide:"activeSlide--HRpnT",lastSlide:"lastSlide--ECyTb",nextSlide:"nextSlide--l7wCN",lastSlideRight:"lastSlideRight--Va86d",nextSlideRight:"nextSlideRight--rQmHZ"},o.A=d},84265:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(43693)),t=g(e(96540)),d=e(74848);function p(r){if(typeof WeakMap!="function")return null;var a=new WeakMap,n=new WeakMap;return(p=function(u){return u?n:a})(r)}function g(r,a){if(!a&&r&&r.__esModule)return r;if(r===null||f(r)!="object"&&typeof r!="function")return{default:r};var n=p(a);if(n&&n.has(r))return n.get(r);var l={__proto__:null},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in r)if(v!=="default"&&{}.hasOwnProperty.call(r,v)){var _=u?Object.getOwnPropertyDescriptor(r,v):null;_&&(_.get||_.set)?Object.defineProperty(l,v,_):l[v]=r[v]}return l.default=r,n&&n.set(r,l),l}function C(r,a){var n=Object.keys(r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(r);a&&(l=l.filter(function(u){return Object.getOwnPropertyDescriptor(r,u).enumerable})),n.push.apply(n,l)}return n}function c(r){for(var a=1;a<arguments.length;a++){var n=arguments[a]!=null?arguments[a]:{};a%2?C(Object(n),!0).forEach(function(l){(0,A.default)(r,l,n[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(l){Object.defineProperty(r,l,Object.getOwnPropertyDescriptor(n,l))})}return r}var m=function(a){return(0,d.jsxs)("svg",c(c({xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",width:"1em",height:"1em"},a),{},{children:[(0,d.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),(0,d.jsx)("path",{d:"M15 17.5c.32.32.754.5 1.207.5h.543c.69 0 1.25-.56 1.25-1.25v-.25a1.5 1.5 0 0 0-1.5-1.5 1.5 1.5 0 0 1-1.5-1.5v-.25c0-.69.56-1.25 1.25-1.25h.543c.453 0 .887.18 1.207.5M9 12h4M11 12v6"}),(0,d.jsx)("path",{d:"M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"})]}))},i=o.default=m},85042:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=s(e(35861)),t=function(g){var C=g.text,c=g.disabled,m=c===void 0?!1:c,i=g.speed,r=i===void 0?5:i,a=g.className,n=a===void 0?"":a,l="".concat(r,"s");return f.default.createElement("div",{className:"".concat(A.default.shinyText," ").concat(m?A.default.disabled:""," ").concat(n),style:{animationDuration:l}},C)},d=o.default=t},87257:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=s(e(26860)),t=function(){return f.default.createElement("div",{className:"relative flex flex-col items-center justify-center overflow-hidden"},f.default.createElement("div",{className:"not-prose my-5 w-full"},f.default.createElement("ul",{className:"flex w-full flex-wrap items-center justify-center gap-3"},f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"'use server'"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"useOptimistic"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"React Server Components"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"Concurrent Rendering"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"useActionState"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"Improved Hydration"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"Form Actions"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"Server Actions"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"Suspense"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"'use client'"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"useTransition"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"React Compiler"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"Streaming"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"useFormStatus"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"New React Hooks"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"use()"),f.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"Automatic Memoization"))),f.default.createElement("div",{className:A.default.mask}))},d=o.default=t},87834:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(52577),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},88362:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.breatheItem--VaM9v {\r
  width: 40px;\r
  height: 40px;\r
  background-color: #27c2a3;\r
  border-radius: 50%;\r
  text-align: center;\r
  margin-bottom: 80px;\r
}\r
\r
.breatheItem--VaM9v::before {\r
  content: '';\r
  display: block;\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 50%;\r
  opacity: 0.7;\r
  background-color: #27c2a3;\r
  animation: breathe--wA3l6 2s infinite cubic-bezier(0, 0, 0.49, 1.02);\r
}\r
\r
@keyframes breathe--wA3l6 {\r
  0% {\r
    transform: scale(1);\r
  }\r
\r
  50%,\r
  75% {\r
    transform: scale(3);\r
  }\r
\r
  78%,\r
  100% {\r
    opacity: 0;\r
  }\r
}\r
\r
.loopRotate--GRmod {\r
  position: relative;\r
  display: flex;\r
  flex-direction: column;\r
  justify-content: center;\r
  align-items: start;\r
\r
  .outside--NZwXf {\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    width: 120px;\r
    height: 120px;\r
    border: 1px dashed #44ec79;\r
    border-radius: 50%;\r
    position: relative;\r
\r
    .inner--ZClIQ {\r
      width: 100px;\r
      height: 100px;\r
      border: 3px dashed #44ec79;\r
      border-radius: 50%;\r
      text-align: center;\r
      line-height: 100px;\r
      animation: loop--Q7Ru6 10s linear infinite;\r
    }\r
\r
    .text--FGKfx {\r
      position: absolute;\r
      padding: 0;\r
      color: #44ec79;\r
      font-size: 20px;\r
      font-weight: bolder;\r
    }\r
  }\r
}\r
\r
@keyframes loop--Q7Ru6 {\r
  0% {\r
    transform: rotate(0deg);\r
  }\r
\r
  50% {\r
    transform: rotate(180deg);\r
  }\r
\r
  100% {\r
    transform: rotate(360deg);\r
  }\r
}\r
\r
@keyframes trans--jcajC {\r
  0% {\r
    transform: rotate(0deg);\r
  }\r
\r
  50% {\r
    transform: rotate(180deg);\r
  }\r
\r
  100% {\r
    transform: rotate(0deg);\r
  }\r
}\r
\r
.play-button--Wg3em {\r
  z-index: 1;\r
  width: 100px;\r
  height: 100px;\r
  background-color: #2761ff;\r
  border-radius: 100%;\r
  justify-content: center;\r
  align-items: center;\r
  display: flex;\r
  position: absolute;\r
  box-shadow:\r
    1px 1px 94px #000,\r
    1px 1px 164px rgb(39 97 255 / 90%);\r
  animation: zoom-in-zoom-out--alaL8 2s ease infinite;\r
}\r
\r
.div-block--OwsxA {\r
  width: 86px;\r
  height: 86px;\r
  background-color: rgb(39 97 255 / 10%);\r
  border-radius: 100%;\r
  position: absolute;\r
}\r
\r
@keyframes zoom-in-zoom-out--alaL8 {\r
  0% {\r
    transform: scale(1);\r
  }\r
\r
  50% {\r
    transform: scale(1.2);\r
  }\r
\r
  100% {\r
    transform: scale(1);\r
  }\r
}\r
\r
.div-block-1019--iYyTM {\r
  width: 1px;\r
  height: 100px;\r
  background-image: linear-gradient(#1d1d1c, #462f19 28%, #ff800d);\r
  margin-left: auto;\r
  margin-right: auto;\r
  position: absolute;\r
  top: -98px;\r
  left: 0;\r
  right: 0;\r
}\r
\r
.div-block-1021--EWkRm.code--Wc_Yz {\r
  background-image: radial-gradient(circle, #006b6b, rgb(158 75 0 / 0%));\r
  border-color: #1cc7c7;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/BreatheText/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,cAAc;EACd,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,yBAAyB;EACzB,oEAA6D;AAC/D;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;;IAEE,mBAAmB;EACrB;;EAEA;;IAEE,UAAU;EACZ;AACF;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,kBAAkB;;EAElB;IACE,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;IACZ,aAAa;IACb,0BAA0B;IAC1B,kBAAkB;IAClB,kBAAkB;;IAElB;MACE,YAAY;MACZ,aAAa;MACb,0BAA0B;MAC1B,kBAAkB;MAClB,kBAAkB;MAClB,kBAAkB;MAClB,0CAAmC;IACrC;;IAEA;MACE,kBAAkB;MAClB,UAAU;MACV,cAAc;MACd,eAAe;MACf,mBAAmB;IACrB;EACF;AACF;;AAEA;EACE;IACE,uBAAuB;EACzB;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE;IACE,uBAAuB;EACzB;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,uBAAuB;EACzB;AACF;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,aAAa;EACb,yBAAyB;EACzB,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;EACb,kBAAkB;EAClB;;sCAEoC;EACpC,mDAA4C;AAC9C;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,sCAAsC;EACtC,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE;IACE,mBAAmB;EACrB;;EAEA;IACE,qBAAqB;EACvB;;EAEA;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE,UAAU;EACV,aAAa;EACb,gEAAgE;EAChE,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;EAClB,UAAU;EACV,OAAO;EACP,QAAQ;AACV;;AAEA;EACE,sEAAsE;EACtE,qBAAqB;AACvB",sourcesContent:[`.breatheItem {\r
  width: 40px;\r
  height: 40px;\r
  background-color: #27c2a3;\r
  border-radius: 50%;\r
  text-align: center;\r
  margin-bottom: 80px;\r
}\r
\r
.breatheItem::before {\r
  content: '';\r
  display: block;\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 50%;\r
  opacity: 0.7;\r
  background-color: #27c2a3;\r
  animation: breathe 2s infinite cubic-bezier(0, 0, 0.49, 1.02);\r
}\r
\r
@keyframes breathe {\r
  0% {\r
    transform: scale(1);\r
  }\r
\r
  50%,\r
  75% {\r
    transform: scale(3);\r
  }\r
\r
  78%,\r
  100% {\r
    opacity: 0;\r
  }\r
}\r
\r
.loopRotate {\r
  position: relative;\r
  display: flex;\r
  flex-direction: column;\r
  justify-content: center;\r
  align-items: start;\r
\r
  .outside {\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    width: 120px;\r
    height: 120px;\r
    border: 1px dashed #44ec79;\r
    border-radius: 50%;\r
    position: relative;\r
\r
    .inner {\r
      width: 100px;\r
      height: 100px;\r
      border: 3px dashed #44ec79;\r
      border-radius: 50%;\r
      text-align: center;\r
      line-height: 100px;\r
      animation: loop 10s linear infinite;\r
    }\r
\r
    .text {\r
      position: absolute;\r
      padding: 0;\r
      color: #44ec79;\r
      font-size: 20px;\r
      font-weight: bolder;\r
    }\r
  }\r
}\r
\r
@keyframes loop {\r
  0% {\r
    transform: rotate(0deg);\r
  }\r
\r
  50% {\r
    transform: rotate(180deg);\r
  }\r
\r
  100% {\r
    transform: rotate(360deg);\r
  }\r
}\r
\r
@keyframes trans {\r
  0% {\r
    transform: rotate(0deg);\r
  }\r
\r
  50% {\r
    transform: rotate(180deg);\r
  }\r
\r
  100% {\r
    transform: rotate(0deg);\r
  }\r
}\r
\r
.play-button {\r
  z-index: 1;\r
  width: 100px;\r
  height: 100px;\r
  background-color: #2761ff;\r
  border-radius: 100%;\r
  justify-content: center;\r
  align-items: center;\r
  display: flex;\r
  position: absolute;\r
  box-shadow:\r
    1px 1px 94px #000,\r
    1px 1px 164px rgb(39 97 255 / 90%);\r
  animation: zoom-in-zoom-out 2s ease infinite;\r
}\r
\r
.div-block {\r
  width: 86px;\r
  height: 86px;\r
  background-color: rgb(39 97 255 / 10%);\r
  border-radius: 100%;\r
  position: absolute;\r
}\r
\r
@keyframes zoom-in-zoom-out {\r
  0% {\r
    transform: scale(1);\r
  }\r
\r
  50% {\r
    transform: scale(1.2);\r
  }\r
\r
  100% {\r
    transform: scale(1);\r
  }\r
}\r
\r
.div-block-1019 {\r
  width: 1px;\r
  height: 100px;\r
  background-image: linear-gradient(#1d1d1c, #462f19 28%, #ff800d);\r
  margin-left: auto;\r
  margin-right: auto;\r
  position: absolute;\r
  top: -98px;\r
  left: 0;\r
  right: 0;\r
}\r
\r
.div-block-1021.code {\r
  background-image: radial-gradient(circle, #006b6b, rgb(158 75 0 / 0%));\r
  border-color: #1cc7c7;\r
}\r
`],sourceRoot:""}]),d.locals={breatheItem:"breatheItem--VaM9v",breathe:"breathe--wA3l6",loopRotate:"loopRotate--GRmod",loop:"loop--Q7Ru6",outside:"outside--NZwXf",inner:"inner--ZClIQ",text:"text--FGKfx","play-button":"play-button--Wg3em",playButton:"play-button--Wg3em","zoom-in-zoom-out":"zoom-in-zoom-out--alaL8",zoomInZoomOut:"zoom-in-zoom-out--alaL8","div-block":"div-block--OwsxA",divBlock:"div-block--OwsxA","div-block-1019":"div-block-1019--iYyTM",divBlock1019:"div-block-1019--iYyTM","div-block-1021":"div-block-1021--EWkRm",divBlock1021:"div-block-1021--EWkRm",code:"code--Wc_Yz",trans:"trans--jcajC"},o.A=d},88462:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(57315),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},89493:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(24274),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},90064:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=o.Word=void 0;var f=s(e(41132)),A=s(e(96540)),t=e(21126),d=e(63734),p=s(e(33005)),g=function(u,v){return Math.round((0,d.mix)(u,v,Math.random()))},C=function(){return g(5,20)},c=function(){return g(20,100)},m=(0,f.default)(Array(3)).map(function(){return(0,f.default)(Array(C())).map(c)}),i=o.Word=function(u){var v=u.width;return A.default.createElement("div",{className:p.default.word,style:{width:v}})},r=function(u){var v=u.words;return A.default.createElement("div",{className:p.default.paragraph},v.map(function(_,E){return A.default.createElement(i,{key:E,width:_})}))},a=function(){return A.default.createElement(t.motion.div,{variants:{collapsed:{scale:.8},open:{scale:1}},initial:"collapsed",animate:"open",whileInView:!0,transition:{duration:.8},className:p.default.contentPlaceholder},A.default.createElement("section",null,A.default.createElement(i,{width:75}),A.default.createElement(i,{width:245}),A.default.createElement(i,{width:120})),m.map(function(u,v){return A.default.createElement(r,{key:v,words:u})}))},n=o.default=a},90467:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(54756)),A=s(e(29293)),t=s(e(85715)),d=e(96540),p=function(){var c=(0,d.useState)(null),m=(0,t.default)(c,2),i=m[0],r=m[1],a=function(){var n=(0,A.default)(f.default.mark(function l(u){return f.default.wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.prev=0,_.next=3,navigator.clipboard.writeText(u);case 3:r({state:"success"}),_.next=10;break;case 6:throw _.prev=6,_.t0=_.catch(0),r({state:"error",message:_.t0.message}),_.t0;case 10:return _.prev=10,setTimeout(function(){r(null)},2e3),_.finish(10);case 13:case"end":return _.stop()}},l,null,[[0,6,10,13]])}));return function(u){return n.apply(this,arguments)}}();return[a,i]},g=o.default=p},91757:function(b,o,e){"use strict";e.r(o);var s=e(85072),f=e.n(s),A=e(97825),t=e.n(A),d=e(77659),p=e.n(d),g=e(55056),C=e.n(g),c=e(10540),m=e.n(c),i=e(41113),r=e.n(i),a=e(91796),n={};n.styleTagTransform=r(),n.setAttributes=C(),n.insert=p().bind(null,"head"),n.domAPI=t(),n.insertStyleElement=m();var l=f()(a.A,n);o.default=a.A&&a.A.locals?a.A.locals:void 0},91796:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.squaresCanvas--eB4nW {\r
  width: 100%;\r
  height: 100%;\r
  border: none;\r
  display: block;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/SquaresGrid/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,cAAc;AAChB",sourcesContent:[`.squaresCanvas {\r
  width: 100%;\r
  height: 100%;\r
  border: none;\r
  display: block;\r
}\r
`],sourceRoot:""}]),d.locals={squaresCanvas:"squaresCanvas--eB4nW"},o.A=d},92188:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.cardEffect--cZUTZ {\r
  position: relative;\r
  overflow: hidden;\r
  border-radius: 8px;\r
  border: 1px solid #1e293b;\r
  background-image: linear-gradient(to right, #1e293b, #06171b);\r
  padding: 1px;\r
}\r
\r
.spotlight--GQ6XV {\r
  pointer-events: none;\r
  position: absolute;\r
  inset: 0;\r
  opacity: 0;\r
  transition: opacity 300ms;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/Spotlight/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,6DAA6D;EAC7D,YAAY;AACd;;AAEA;EACE,oBAAoB;EACpB,kBAAkB;EAClB,QAAQ;EACR,UAAU;EACV,yBAAyB;AAC3B",sourcesContent:[`.cardEffect {\r
  position: relative;\r
  overflow: hidden;\r
  border-radius: 8px;\r
  border: 1px solid #1e293b;\r
  background-image: linear-gradient(to right, #1e293b, #06171b);\r
  padding: 1px;\r
}\r
\r
.spotlight {\r
  pointer-events: none;\r
  position: absolute;\r
  inset: 0;\r
  opacity: 0;\r
  transition: opacity 300ms;\r
}\r
`],sourceRoot:""}]),d.locals={cardEffect:"cardEffect--cZUTZ",spotlight:"spotlight--GQ6XV"},o.A=d},93018:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(43693)),t=g(e(96540)),d=e(74848);function p(r){if(typeof WeakMap!="function")return null;var a=new WeakMap,n=new WeakMap;return(p=function(u){return u?n:a})(r)}function g(r,a){if(!a&&r&&r.__esModule)return r;if(r===null||f(r)!="object"&&typeof r!="function")return{default:r};var n=p(a);if(n&&n.has(r))return n.get(r);var l={__proto__:null},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in r)if(v!=="default"&&{}.hasOwnProperty.call(r,v)){var _=u?Object.getOwnPropertyDescriptor(r,v):null;_&&(_.get||_.set)?Object.defineProperty(l,v,_):l[v]=r[v]}return l.default=r,n&&n.set(r,l),l}function C(r,a){var n=Object.keys(r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(r);a&&(l=l.filter(function(u){return Object.getOwnPropertyDescriptor(r,u).enumerable})),n.push.apply(n,l)}return n}function c(r){for(var a=1;a<arguments.length;a++){var n=arguments[a]!=null?arguments[a]:{};a%2?C(Object(n),!0).forEach(function(l){(0,A.default)(r,l,n[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(l){Object.defineProperty(r,l,Object.getOwnPropertyDescriptor(n,l))})}return r}var m=function(a){return(0,d.jsxs)("svg",c(c({xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",width:"1em",height:"1em"},a),{},{children:[(0,d.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),(0,d.jsx)("path",{d:"m5.428 17.245 6.076 3.471a1 1 0 0 0 .992 0l6.076-3.471a1 1 0 0 0 .495-.734l1.323-9.704a1 1 0 0 0-.658-1.078l-7.4-2.612a1 1 0 0 0-.665 0L4.268 5.73a1 1 0 0 0-.658 1.078l1.323 9.704a1 1 0 0 0 .495.734z"}),(0,d.jsx)("path",{d:"m9 15 3-8 3 8M10 13h4"})]}))},i=o.default=m},93868:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(85715)),t=g(e(96540)),d=s(e(89493));function p(m){if(typeof WeakMap!="function")return null;var i=new WeakMap,r=new WeakMap;return(p=function(n){return n?r:i})(m)}function g(m,i){if(!i&&m&&m.__esModule)return m;if(m===null||f(m)!="object"&&typeof m!="function")return{default:m};var r=p(i);if(r&&r.has(m))return r.get(m);var a={__proto__:null},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in m)if(l!=="default"&&{}.hasOwnProperty.call(m,l)){var u=n?Object.getOwnPropertyDescriptor(m,l):null;u&&(u.get||u.set)?Object.defineProperty(a,l,u):a[l]=m[l]}return a.default=m,r&&r.set(m,a),a}var C=function(i){var r=i.animText,a=r===void 0?"":r,n=a.split("")||[],l=(0,t.useState)("text-animate"),u=(0,A.default)(l,2),v=u[0],_=u[1];return(0,t.useEffect)(function(){setTimeout(function(){_("text-animate-hover")},3e3)},[]),t.default.createElement("span",null,n.map(function(E,h){return t.default.createElement("span",{key:E+h,style:{"--delay":h+1},className:d.default[v]},E)}))},c=o.default=C},94054:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.contentPlaceholder--vUdMy {
  padding: 20px;
  transform-origin: top center;
}

.word--KIIET {
  height: 10px;
  border-radius: 5px;
  display: inline-block;
  margin-bottom: 4px;
  margin-right: 4px;
  background: #aaa;
}

.paragraph--_FNyP {
  margin-bottom: 20px;
}
`,"",{version:3,sources:["webpack://./src/components/stateless/ContentPlaceholder/index.module.less"],names:[],mappings:"AAAA;EACE,aAAa;EACb,4BAA4B;AAC9B;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,qBAAqB;EACrB,kBAAkB;EAClB,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;AACrB",sourcesContent:[`.contentPlaceholder {
  padding: 20px;
  transform-origin: top center;
}

.word {
  height: 10px;
  border-radius: 5px;
  display: inline-block;
  margin-bottom: 4px;
  margin-right: 4px;
  background: #aaa;
}

.paragraph {
  margin-bottom: 20px;
}
`],sourceRoot:""}]),d.locals={contentPlaceholder:"contentPlaceholder--vUdMy",word:"word--KIIET",paragraph:"paragraph--_FNyP"},o.A=d},94143:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(54756)),t=s(e(29293)),d=s(e(85715)),p=r(e(96540)),g=r(e(24396)),C=e(64193),c=s(e(71508)),m=e(21126);function i(l){if(typeof WeakMap!="function")return null;var u=new WeakMap,v=new WeakMap;return(i=function(E){return E?v:u})(l)}function r(l,u){if(!u&&l&&l.__esModule)return l;if(l===null||f(l)!="object"&&typeof l!="function")return{default:l};var v=i(u);if(v&&v.has(l))return v.get(l);var _={__proto__:null},E=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var h in l)if(h!=="default"&&{}.hasOwnProperty.call(l,h)){var B=E?Object.getOwnPropertyDescriptor(l,h):null;B&&(B.get||B.set)?Object.defineProperty(_,h,B):_[h]=l[h]}return _.default=l,v&&v.set(l,_),_}var a=function(u){var v=u.id,_=u.className,E=u.background,h=u.minSize,B=u.maxSize,M=u.speed,O=u.particleColor,P=u.particleDensity,R=(0,p.useState)(!1),D=(0,d.default)(R,2),j=D[0],T=D[1];(0,p.useEffect)(function(){(0,g.initParticlesEngine)(function(){var k=(0,t.default)(A.default.mark(function F(Q){return A.default.wrap(function(w){for(;;)switch(w.prev=w.next){case 0:return w.next=2,(0,C.loadSlim)(Q);case 2:case"end":return w.stop()}},F)}));return function(F){return k.apply(this,arguments)}}()).then(function(){T(!0)})},[]);var W=(0,m.useAnimation)(),L=function(){var k=(0,t.default)(A.default.mark(function F(Q){return A.default.wrap(function(w){for(;;)switch(w.prev=w.next){case 0:Q&&W.start({opacity:1,transition:{duration:1}});case 1:case"end":return w.stop()}},F)}));return function(Q){return k.apply(this,arguments)}}(),S=(0,p.useId)();return p.default.createElement(m.motion.div,{animate:W,className:(0,c.default)("opacity-0",_)},j&&p.default.createElement(g.default,{id:v||S,className:(0,c.default)("h-full w-full"),particlesLoaded:L,options:{background:{color:{value:E||"#0d47a1"}},fullScreen:{enable:!1,zIndex:1},fpsLimit:120,interactivity:{events:{onClick:{enable:!0,mode:"push"},onHover:{enable:!1,mode:"repulse"},resize:!0},modes:{push:{quantity:4},repulse:{distance:200,duration:.4}}},particles:{bounce:{horizontal:{value:1},vertical:{value:1}},collisions:{absorb:{speed:2},bounce:{horizontal:{value:1},vertical:{value:1}},enable:!1,maxSpeed:50,mode:"bounce",overlap:{enable:!0,retries:0}},color:{value:O||"#ffffff",animation:{h:{count:0,enable:!1,speed:1,decay:0,delay:0,sync:!0,offset:0},s:{count:0,enable:!1,speed:1,decay:0,delay:0,sync:!0,offset:0},l:{count:0,enable:!1,speed:1,decay:0,delay:0,sync:!0,offset:0}}},effect:{close:!0,fill:!0,options:{},type:{}},groups:{},move:{angle:{offset:0,value:90},attract:{distance:200,enable:!1,rotate:{x:3e3,y:3e3}},center:{x:50,y:50,mode:"percent",radius:0},decay:0,distance:{},direction:"none",drift:0,enable:!0,gravity:{acceleration:9.81,enable:!1,inverse:!1,maxSpeed:50},path:{clamp:!0,delay:{value:0},enable:!1,options:{}},outModes:{default:"out"},random:!1,size:!1,speed:{min:.1,max:1},spin:{acceleration:0,enable:!1},straight:!1,trail:{enable:!1,length:10,fill:{}},vibrate:!1,warp:!1},number:{density:{enable:!0,width:400,height:400},limit:{mode:"delete",value:0},value:P||120},opacity:{value:{min:.1,max:1},animation:{count:0,enable:!0,speed:M||4,decay:0,delay:0,sync:!1,mode:"auto",startValue:"random",destroy:"none"}},reduceDuplicates:!1,shadow:{blur:0,color:{value:"#000"},enable:!1,offset:{x:0,y:0}},shape:{close:!0,fill:!0,options:{},type:"circle"},size:{value:{min:h||1,max:B||3},animation:{count:0,enable:!1,speed:5,decay:0,delay:0,sync:!1,mode:"auto",startValue:"random",destroy:"none"}},stroke:{width:0},zIndex:{value:0,opacityRate:1,sizeRate:1,velocityRate:1},destroy:{bounds:{},mode:"none",split:{count:1,factor:{value:3},rate:{value:{min:4,max:9}},sizeOffset:!0}},roll:{darken:{enable:!1,value:0},enable:!1,enlighten:{enable:!1,value:0},mode:"vertical",speed:25},tilt:{value:0,animation:{enable:!1,speed:0,decay:0,sync:!1},direction:"clockwise",enable:!1},twinkle:{lines:{enable:!1,frequency:.05,opacity:1},particles:{enable:!1,frequency:.05,opacity:1}},wobble:{distance:5,enable:!1,speed:{angle:50,move:10}},life:{count:0,delay:{value:0,sync:!1},duration:{value:0,sync:!1}},rotate:{value:0,animation:{enable:!1,speed:0,decay:0,sync:!1},direction:"clockwise",path:!1},orbit:{animation:{count:0,enable:!1,speed:1,decay:0,delay:0,sync:!1},enable:!1,opacity:1,rotation:{value:45},width:1},links:{blink:!1,color:{value:"#fff"},consent:!1,distance:100,enable:!1,frequency:1,opacity:1,shadow:{blur:5,color:{value:"#000"},enable:!1},triangles:{enable:!1,frequency:1},width:1,warp:!1},repulse:{value:0,enabled:!1,distance:1,duration:1,factor:1,speed:1}},detectRetina:!0}}))},n=o.default=a},94624:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(43693)),t=g(e(96540)),d=e(74848);function p(r){if(typeof WeakMap!="function")return null;var a=new WeakMap,n=new WeakMap;return(p=function(u){return u?n:a})(r)}function g(r,a){if(!a&&r&&r.__esModule)return r;if(r===null||f(r)!="object"&&typeof r!="function")return{default:r};var n=p(a);if(n&&n.has(r))return n.get(r);var l={__proto__:null},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in r)if(v!=="default"&&{}.hasOwnProperty.call(r,v)){var _=u?Object.getOwnPropertyDescriptor(r,v):null;_&&(_.get||_.set)?Object.defineProperty(l,v,_):l[v]=r[v]}return l.default=r,n&&n.set(r,l),l}function C(r,a){var n=Object.keys(r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(r);a&&(l=l.filter(function(u){return Object.getOwnPropertyDescriptor(r,u).enumerable})),n.push.apply(n,l)}return n}function c(r){for(var a=1;a<arguments.length;a++){var n=arguments[a]!=null?arguments[a]:{};a%2?C(Object(n),!0).forEach(function(l){(0,A.default)(r,l,n[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(l){Object.defineProperty(r,l,Object.getOwnPropertyDescriptor(n,l))})}return r}var m=function(a){return(0,d.jsxs)("svg",c(c({xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",width:"1em",height:"1em"},a),{},{children:[(0,d.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),(0,d.jsx)("path",{d:"M16.5 4 12 12 7.5 4"}),(0,d.jsx)("path",{d:"m3 4 9 16 9-16"})]}))},i=o.default=m},97361:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(43693)),t=g(e(96540)),d=e(74848);function p(r){if(typeof WeakMap!="function")return null;var a=new WeakMap,n=new WeakMap;return(p=function(u){return u?n:a})(r)}function g(r,a){if(!a&&r&&r.__esModule)return r;if(r===null||f(r)!="object"&&typeof r!="function")return{default:r};var n=p(a);if(n&&n.has(r))return n.get(r);var l={__proto__:null},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in r)if(v!=="default"&&{}.hasOwnProperty.call(r,v)){var _=u?Object.getOwnPropertyDescriptor(r,v):null;_&&(_.get||_.set)?Object.defineProperty(l,v,_):l[v]=r[v]}return l.default=r,n&&n.set(r,l),l}function C(r,a){var n=Object.keys(r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(r);a&&(l=l.filter(function(u){return Object.getOwnPropertyDescriptor(r,u).enumerable})),n.push.apply(n,l)}return n}function c(r){for(var a=1;a<arguments.length;a++){var n=arguments[a]!=null?arguments[a]:{};a%2?C(Object(n),!0).forEach(function(l){(0,A.default)(r,l,n[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(l){Object.defineProperty(r,l,Object.getOwnPropertyDescriptor(n,l))})}return r}var m=function(a){return(0,d.jsxs)("svg",c(c({xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",width:"1em",height:"1em"},a),{},{children:[(0,d.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),(0,d.jsx)("path",{d:"m20 4-2 14.5-6 2-6-2L4 4z"}),(0,d.jsx)("path",{d:"M7.5 8h3v8l-2-1M16.5 8H14a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1.423a.5.5 0 0 1 .495.57L15.5 15.5l-2 .5"})]}))},i=o.default=m},98343:function(b,o,e){"use strict";var s=e(24994);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var f=s(e(96540)),A=s(e(45490)),t=function(g){var C=g.avatar,c=g.text;return f.default.createElement("div",{className:A.default.avatarCard},f.default.createElement("div",{className:A.default.card},f.default.createElement("figure",null,f.default.createElement("img",{alt:"",src:C,className:A.default.avatar})),f.default.createElement("p",{className:A.default.content},c)))},d=o.default=t},98689:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.isometricCard--mEKMm {\r
  margin: 0 100px;\r
  transform: rotateX(51deg) rotateZ(43deg);\r
  transform-style: preserve-3d;\r
  will-change: transform;\r
  display: flex;\r
  align-items: center;\r
  width: 240px;\r
  height: 320px;\r
  background: #070221;\r
  border-radius: 2rem;\r
  box-shadow:\r
    1px 1px 0 1px #f9f9fb,\r
    -1px 0 28px 0 rgb(34 33 81 / 1%),\r
    28px 28px 28px 0 rgb(34 33 81 / 25%);\r
  transition:\r
    0.4s ease-in-out transform,\r
    0.3s ease-in-out box-shadow;\r
  color: #fff;\r
}\r
\r
.isometricCard--mEKMm:hover {\r
  transform: translate3d(0, -16px, 0) rotateX(51deg) rotateZ(43deg);\r
  box-shadow:\r
    1px 1px 0 1px #f9f9fb,\r
    -1px 0 28px 0 rgb(34 33 81 / 1%),\r
    54px 54px 28px -10px rgb(34 33 81 / 15%);\r
}\r
\r
.isometricCard--mEKMm p {\r
  margin: 0 36px;\r
  text-align: center;\r
  font-size: 20px;\r
  line-height: 1.4;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/IsometricCard/index.module.less"],names:[],mappings:"AAAA;EACE,eAAe;EACf,wCAAwC;EACxC,4BAA4B;EAC5B,sBAAsB;EACtB,aAAa;EACb,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB;;;wCAGsC;EACtC;;+BAE6B;EAC7B,WAAW;AACb;;AAEA;EACE,iEAAiE;EACjE;;;4CAG0C;AAC5C;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,eAAe;EACf,gBAAgB;AAClB",sourcesContent:[`.isometricCard {\r
  margin: 0 100px;\r
  transform: rotateX(51deg) rotateZ(43deg);\r
  transform-style: preserve-3d;\r
  will-change: transform;\r
  display: flex;\r
  align-items: center;\r
  width: 240px;\r
  height: 320px;\r
  background: #070221;\r
  border-radius: 2rem;\r
  box-shadow:\r
    1px 1px 0 1px #f9f9fb,\r
    -1px 0 28px 0 rgb(34 33 81 / 1%),\r
    28px 28px 28px 0 rgb(34 33 81 / 25%);\r
  transition:\r
    0.4s ease-in-out transform,\r
    0.3s ease-in-out box-shadow;\r
  color: #fff;\r
}\r
\r
.isometricCard:hover {\r
  transform: translate3d(0, -16px, 0) rotateX(51deg) rotateZ(43deg);\r
  box-shadow:\r
    1px 1px 0 1px #f9f9fb,\r
    -1px 0 28px 0 rgb(34 33 81 / 1%),\r
    54px 54px 28px -10px rgb(34 33 81 / 15%);\r
}\r
\r
.isometricCard p {\r
  margin: 0 36px;\r
  text-align: center;\r
  font-size: 20px;\r
  line-height: 1.4;\r
}\r
`],sourceRoot:""}]),d.locals={isometricCard:"isometricCard--mEKMm"},o.A=d},98827:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.gradientTracking--FyamC {\r
  position: relative;\r
  margin: 10px 0;\r
  background: #7983ff;\r
  padding: 5px 10px;\r
  font-size: 18px;\r
  border: none;\r
  border-radius: 8px;\r
  color: white;\r
  cursor: pointer;\r
  outline: none;\r
  overflow: hidden;\r
}\r
\r
.gradientTracking--FyamC span {\r
  position: relative;\r
  pointer-events: none;\r
}\r
\r
.gradientTracking--FyamC::before {\r
  --size: 0;\r
\r
  content: '';\r
  position: absolute;\r
  left: var(--x);\r
  top: var(--y);\r
  width: 0;\r
  width: var(--size);\r
  height: 0;\r
  height: var(--size);\r
  background: radial-gradient(circle closest-side, pink, transparent);\r
  transform: translate(-50%, -50%);\r
  transition:\r
    width 0.2s ease,\r
    height 0.2s ease;\r
}\r
\r
.gradientTracking--FyamC:hover::before {\r
  --size: 200px;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/GradientTracking/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,cAAc;EACd,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;EACf,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,eAAe;EACf,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,SAAS;;EAET,WAAW;EACX,kBAAkB;EAClB,cAAc;EACd,aAAa;EACb,QAAkB;EAAlB,kBAAkB;EAClB,SAAmB;EAAnB,mBAAmB;EACnB,mEAAmE;EACnE,gCAAgC;EAChC;;oBAEkB;AACpB;;AAEA;EACE,aAAa;AACf",sourcesContent:[`.gradientTracking {\r
  position: relative;\r
  margin: 10px 0;\r
  background: #7983ff;\r
  padding: 5px 10px;\r
  font-size: 18px;\r
  border: none;\r
  border-radius: 8px;\r
  color: white;\r
  cursor: pointer;\r
  outline: none;\r
  overflow: hidden;\r
}\r
\r
.gradientTracking span {\r
  position: relative;\r
  pointer-events: none;\r
}\r
\r
.gradientTracking::before {\r
  --size: 0;\r
\r
  content: '';\r
  position: absolute;\r
  left: var(--x);\r
  top: var(--y);\r
  width: var(--size);\r
  height: var(--size);\r
  background: radial-gradient(circle closest-side, pink, transparent);\r
  transform: translate(-50%, -50%);\r
  transition:\r
    width 0.2s ease,\r
    height 0.2s ease;\r
}\r
\r
.gradientTracking:hover::before {\r
  --size: 200px;\r
}\r
`],sourceRoot:""}]),d.locals={gradientTracking:"gradientTracking--FyamC"},o.A=d},99725:function(b,o,e){"use strict";var s=e(24994),f=e(73738);Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var A=s(e(43693)),t=g(e(96540)),d=e(74848);function p(r){if(typeof WeakMap!="function")return null;var a=new WeakMap,n=new WeakMap;return(p=function(u){return u?n:a})(r)}function g(r,a){if(!a&&r&&r.__esModule)return r;if(r===null||f(r)!="object"&&typeof r!="function")return{default:r};var n=p(a);if(n&&n.has(r))return n.get(r);var l={__proto__:null},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in r)if(v!=="default"&&{}.hasOwnProperty.call(r,v)){var _=u?Object.getOwnPropertyDescriptor(r,v):null;_&&(_.get||_.set)?Object.defineProperty(l,v,_):l[v]=r[v]}return l.default=r,n&&n.set(r,l),l}function C(r,a){var n=Object.keys(r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(r);a&&(l=l.filter(function(u){return Object.getOwnPropertyDescriptor(r,u).enumerable})),n.push.apply(n,l)}return n}function c(r){for(var a=1;a<arguments.length;a++){var n=arguments[a]!=null?arguments[a]:{};a%2?C(Object(n),!0).forEach(function(l){(0,A.default)(r,l,n[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(l){Object.defineProperty(r,l,Object.getOwnPropertyDescriptor(n,l))})}return r}var m=function(a){return(0,d.jsxs)("svg",c(c({xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",width:"1em",height:"1em"},a),{},{children:[(0,d.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),(0,d.jsx)("path",{d:"M6.306 8.711C3.704 9.434 2 10.637 2 12c0 2.21 4.477 4 10 4 .773 0 1.526-.035 2.248-.102M17.692 15.289C20.295 14.567 22 13.363 22 12c0-2.21-4.477-4-10-4-.773 0-1.526.035-2.25.102"}),(0,d.jsx)("path",{d:"M6.305 15.287C5.629 17.902 5.82 19.98 7 20.66c1.913 1.105 5.703-1.877 8.464-6.66q.581-1.007 1.036-2M17.694 8.716C18.371 6.1 18.181 4.02 17 3.34 15.087 2.235 11.297 5.217 8.536 10c-.387.67-.733 1.34-1.037 2"}),(0,d.jsx)("path",{d:"M12 5.424C10.075 3.532 8.18 2.658 7 3.34 5.087 4.444 5.774 9.217 8.536 14c.386.67.793 1.304 1.212 1.896M12 18.574c1.926 1.893 3.821 2.768 5 2.086 1.913-1.104 1.226-5.877-1.536-10.66q-.563-.976-1.212-1.897M11.5 12.866a1 1 0 1 0 1-1.732 1 1 0 0 0-1 1.732z"})]}))},i=o.default=m},99827:function(b,o,e){"use strict";var s=e(71354),f=e.n(s),A=e(76314),t=e.n(A),d=t()(f());d.push([b.id,`.hero--Gi4L2 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 50px 0;
  position: relative;
  height: 600px;
  overflow: hidden;
  background: radial-gradient(circle, hsl(30deg 100% 8% / 100%) 0%, rgb(0 0 0) 100%);
}

.heroText--DK21p {
  text-align: center;
  color: #fff;
  max-width: 750px;
  z-index: 10;

  h1 {
    font-size: 76px;
    margin: 0 0 30px;
    font-weight: 300;

    span {
      background: linear-gradient(30deg, #ff8000 40%, #ad1d1d 70%);
      -webkit-background-clip: text;
              background-clip: text;
      color: transparent;
    }
  }

  h3 {
    font-size: 20px;
    font-weight: 300;
  }

  a {
    margin-top: 20px;
    display: inline-block;
    color: #fff;
    text-decoration: none;
    font-size: 20px;
    border-radius: 8px;
    background: #ad1d1d;
    padding: 20px 30px;
  }
}

.iconLayer--F5Ovp {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}

.icon--vnklr {
  position: absolute;
  border-radius: 12px;
  transition: transform 1s ease-out;
  animation: icon-fade-in--dW0La 7s ease forwards;
  padding: 10px;

  svg {
    width: 100%;
    height: 100%;
  }

  path {
    color: #fff;
  }

  &.outline--fnROM {
    border: 1px solid #414141;
  }

  &.fill--GObeU {
    background: #414141;
  }

  &.sm--nwTxE {
    height: 40px;
    width: 40px;
    z-index: 1;
  }

  &.md--uoHcF {
    height: 60px;
    width: 60px;
    z-index: 3;
  }

  &.lg--enKwC {
    height: 80px;
    width: 80px;
    z-index: 5;
  }
}

@keyframes icon-fade-in--dW0La {
  from {
    opacity: 0;
  }

  to {
    opacity: 0.6;
  }
}
`,"",{version:3,sources:["webpack://./src/components/stateless/DynamicBackground/index.module.less"],names:[],mappings:"AAAA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,sBAAsB;EACtB,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,aAAa;EACb,gBAAgB;EAChB,kFAAkF;AACpF;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,gBAAgB;EAChB,WAAW;;EAEX;IACE,eAAe;IACf,gBAAgB;IAChB,gBAAgB;;IAEhB;MACE,4DAA4D;MAC5D,6BAAqB;cAArB,qBAAqB;MACrB,kBAAkB;IACpB;EACF;;EAEA;IACE,eAAe;IACf,gBAAgB;EAClB;;EAEA;IACE,gBAAgB;IAChB,qBAAqB;IACrB,WAAW;IACX,qBAAqB;IACrB,eAAe;IACf,kBAAkB;IAClB,mBAAmB;IACnB,kBAAkB;EACpB;AACF;;AAEA;EACE,kBAAkB;EAClB,OAAO;EACP,MAAM;EACN,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,iCAAiC;EACjC,+CAAwC;EACxC,aAAa;;EAEb;IACE,WAAW;IACX,YAAY;EACd;;EAEA;IACE,WAAW;EACb;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,mBAAmB;EACrB;;EAEA;IACE,YAAY;IACZ,WAAW;IACX,UAAU;EACZ;;EAEA;IACE,YAAY;IACZ,WAAW;IACX,UAAU;EACZ;;EAEA;IACE,YAAY;IACZ,WAAW;IACX,UAAU;EACZ;AACF;;AAEA;EACE;IACE,UAAU;EACZ;;EAEA;IACE,YAAY;EACd;AACF",sourcesContent:[`.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 50px 0;
  position: relative;
  height: 600px;
  overflow: hidden;
  background: radial-gradient(circle, hsl(30deg 100% 8% / 100%) 0%, rgb(0 0 0) 100%);
}

.heroText {
  text-align: center;
  color: #fff;
  max-width: 750px;
  z-index: 10;

  h1 {
    font-size: 76px;
    margin: 0 0 30px;
    font-weight: 300;

    span {
      background: linear-gradient(30deg, #ff8000 40%, #ad1d1d 70%);
      background-clip: text;
      color: transparent;
    }
  }

  h3 {
    font-size: 20px;
    font-weight: 300;
  }

  a {
    margin-top: 20px;
    display: inline-block;
    color: #fff;
    text-decoration: none;
    font-size: 20px;
    border-radius: 8px;
    background: #ad1d1d;
    padding: 20px 30px;
  }
}

.iconLayer {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}

.icon {
  position: absolute;
  border-radius: 12px;
  transition: transform 1s ease-out;
  animation: icon-fade-in 7s ease forwards;
  padding: 10px;

  svg {
    width: 100%;
    height: 100%;
  }

  path {
    color: #fff;
  }

  &.outline {
    border: 1px solid #414141;
  }

  &.fill {
    background: #414141;
  }

  &.sm {
    height: 40px;
    width: 40px;
    z-index: 1;
  }

  &.md {
    height: 60px;
    width: 60px;
    z-index: 3;
  }

  &.lg {
    height: 80px;
    width: 80px;
    z-index: 5;
  }
}

@keyframes icon-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 0.6;
  }
}
`],sourceRoot:""}]),d.locals={hero:"hero--Gi4L2",heroText:"heroText--DK21p",iconLayer:"iconLayer--F5Ovp",icon:"icon--vnklr","icon-fade-in":"icon-fade-in--dW0La",iconFadeIn:"icon-fade-in--dW0La",outline:"outline--fnROM",fill:"fill--GObeU",sm:"sm--nwTxE",md:"md--uoHcF",lg:"lg--enKwC"},o.A=d}}]);
