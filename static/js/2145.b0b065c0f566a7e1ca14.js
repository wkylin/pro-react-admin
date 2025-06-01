(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[2145],{9:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(92188),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},556:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=i(e(96540)),d=e(97751),C=o(e(38913)),g=o(e(29492)),h=o(e(26718)),v=o(e(48632)),p=o(e(17329));function i(s,c){if(typeof WeakMap=="function")var E=new WeakMap,l=new WeakMap;return(i=function(_,y){if(!y&&_&&_.__esModule)return _;var B,O,D={__proto__:null,default:_};if(_===null||A(_)!="object"&&typeof _!="function")return D;if(B=y?l:E){if(B.has(_))return B.get(_);B.set(_,D)}for(var M in _)M!=="default"&&{}.hasOwnProperty.call(_,M)&&((O=(B=Object.defineProperty)&&Object.getOwnPropertyDescriptor(_,M))&&(O.get||O.set)?B(D,M,O):D[M]=_[M]);return D})(s,c)}var u=[{id:1,name:"\u300A\u548F\u67F3\u300B",title:"\u8D3A\u77E5\u7AE0",quote:"\u78A7\u7389\u5986\u6210\u4E00\u6811\u9AD8\uFF0C\u4E07\u6761\u5782\u4E0B\u7EFF\u4E1D\u7EE6\u3002\u4E0D\u77E5\u7EC6\u53F6\u8C01\u88C1\u51FA\uFF0C\u4E8C\u6708\u6625\u98CE\u4F3C\u526A\u5200\u3002",image:g.default},{id:2,name:"\u300A\u5C0F\u6C60\u300B",title:"\u6768\u4E07\u91CC",quote:"\u6CC9\u773C\u65E0\u58F0\u60DC\u7EC6\u6D41\uFF0C\u6811\u9634\u7167\u6C34\u7231\u6674\u67D4\u3002\u5C0F\u8377\u624D\u9732\u5C16\u5C16\u89D2\uFF0C\u65E9\u6709\u873B\u8713\u7ACB\u4E0A\u5934\u3002",image:h.default},{id:3,name:"\u300A\u5C71\u5C45\u79CB\u669D\u300B",title:"\u738B\u7EF4",quote:"\u7A7A\u5C71\u65B0\u96E8\u540E\uFF0C\u5929\u6C14\u665A\u6765\u79CB\u3002\u660E\u6708\u677E\u95F4\u7167\uFF0C\u6E05\u6CC9\u77F3\u4E0A\u6D41\u3002",image:v.default},{id:4,name:"\u300A\u9022\u96EA\u5BBF\u8299\u84C9\u5C71\u4E3B\u4EBA\u300B",title:"\u5218\u957F\u537F",quote:"\u65E5\u66AE\u82CD\u5C71\u8FDC\uFF0C\u5929\u5BD2\u767D\u5C4B\u8D2B\u3002\u67F4\u95E8\u95FB\u72AC\u5420\uFF0C\u98CE\u96EA\u591C\u5F52\u4EBA\u3002",image:p.default}],n=function(){var c=(0,t.useState)(u),E=(0,m.default)(c,2),l=E[0],f=E[1],_=t.default.useState(0),y=(0,m.default)(_,2),B=y[0],O=y[1];(0,t.useEffect)(function(){var P=l.length-1;B<0&&O(P),B>P&&O(0)},[B,l]);var D=null;(0,t.useEffect)(function(){return D=setInterval(function(){O(B+1)},5e3),function(){clearInterval(D)}},[B]);var M=function(I){clearInterval(D),O(I),D=setInterval(function(){O(function(T){return(T+1)%l.length})},5e3)};return t.default.createElement("section",{className:C.default.section},t.default.createElement("div",{className:C.default["section-center"]},l.map(function(P,I){var T=P.id,U=P.image,R=P.name,w=P.title,L=P.quote,z=C.default.nextSlide;return I===B&&(z=C.default.activeSlide),(I===B-1||B===0&&I===l.length-1)&&(z=C.default.lastSlide),t.default.createElement("article",{className:z,key:T},t.default.createElement("img",{src:U,alt:R,className:C.default["person-img"]}),t.default.createElement("h4",null,R),t.default.createElement("p",{className:C.default.title},w),t.default.createElement("p",{className:C.default.text},L),t.default.createElement(d.Quote,{className:C.default.icon}))}),t.default.createElement("button",{className:C.default.prev,onClick:function(){return M(B-1)}},t.default.createElement(d.ArrowLeft,null)),t.default.createElement("button",{className:C.default.next,onClick:function(){return M(B+1)}},t.default.createElement(d.ArrowRight,null))))},a=r.default=n},1273:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=C(e(96540)),d=e(21126);function C(p,i){if(typeof WeakMap=="function")var u=new WeakMap,n=new WeakMap;return(C=function(s,c){if(!c&&s&&s.__esModule)return s;var E,l,f={__proto__:null,default:s};if(s===null||A(s)!="object"&&typeof s!="function")return f;if(E=c?n:u){if(E.has(s))return E.get(s);E.set(s,f)}for(var _ in s)_!=="default"&&{}.hasOwnProperty.call(s,_)&&((l=(E=Object.defineProperty)&&Object.getOwnPropertyDescriptor(s,_))&&(l.get||l.set)?E(f,_,l):f[_]=s[_]);return f})(p,i)}var g=[{text:"\u5317\u98CE\u5439\u96EA\u56DB\u66F4\u521D\uFF0C\u5609\u745E\u5929\u6559\u53CA\u5C81\u9664\u3002",author:"\u9664\u591C\u96EA"},{text:"\u4E0D\u6C42\u89C1\u9762\u60DF\u901A\u8C12\uFF0C\u540D\u7EB8\u671D\u6765\u6EE1\u655D\u5E90\u3002",author:"\u5B88\u5C81"},{text:"\u534A\u76CF\u5C60\u82CF\u72B9\u672A\u4E3E\uFF0C\u706F\u524D\u5C0F\u8349\u5199\u6843\u7B26\u3002",author:"\u9664\u591C\u96EA"},{text:"\u6211\u4EA6\u968F\u4EBA\u6295\u6570\u7EB8\uFF0C\u4E16\u60C5\u5ACC\u7B80\u4E0D\u5ACC\u865A\u3002",author:"\u5B88\u5C81"}],h=function(){var i=(0,t.useState)(0),u=(0,m.default)(i,2),n=u[0],a=u[1];(0,t.useEffect)(function(){var y=setInterval(function(){a(function(B){return(B+1)%g.length})},3e3);return function(){clearInterval(y)}},[]);var s=g[n],c=s.text,E=s.author,l=s.image,f={initial:{opacity:0,y:"100%",scale:.1},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:"100%",scale:.1}},_={active:{scale:1.2,backgroundColor:"#3f3f46"},inactive:{scale:1,backgroundColor:"#D1D5DB"}};return t.default.createElement("section",{className:"py-12"},t.default.createElement("div",{className:"w-full max-w-2xl"},t.default.createElement(d.AnimatePresence,{mode:"popLayout"},t.default.createElement(d.motion.div,{key:n,initial:"initial",animate:"animate",exit:"exit",variants:f,className:"flex w-full flex-col items-center justify-center",transition:{type:"spring",stiffness:200,damping:20,duration:.5}},t.default.createElement("p",{className:"text m-0 text-center font-medium tracking-tight"},'"',c,'"'),t.default.createElement("div",{className:"mx-auto mt-5"},t.default.createElement("div",{className:"flex flex-col items-center justify-center space-x-3"},t.default.createElement("div",{className:"font-regular text-sm text-gray-900/80"},E)))),t.default.createElement("div",{className:"mt-8 flex justify-center"},g.map(function(y,B){return t.default.createElement(d.motion.div,{key:B,className:"mx-1 h-1 w-1 cursor-pointer rounded-full",variants:_,animate:B===n?"active":"inactive",onClick:function(){return a(B)}})})))))},v=r.default=h},1472:function(x,r,e){"use strict";"use client";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(54756)),m=o(e(29293)),t=o(e(85715)),d=e(96540),C=function(){var v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},p=v.isCopiedDelay,i=p===void 0?2e3:p,u=(0,d.useState)(null),n=(0,t.default)(u,2),a=n[0],s=n[1],c=(0,d.useState)(!1),E=(0,t.default)(c,2),l=E[0],f=E[1];(0,d.useEffect)(function(){l&&setTimeout(function(){f(!1)},i)},[l,i]);var _=(0,d.useCallback)(function(){var y=(0,m.default)(A.default.mark(function B(O){var D;return A.default.wrap(function(P){for(;;)switch(P.prev=P.next){case 0:if((D=navigator)!==null&&D!==void 0&&D.clipboard){P.next=2;break}return P.abrupt("return",!1);case 2:return P.prev=2,P.next=5,navigator.clipboard.writeText(O);case 5:return s(O),f(!0),P.abrupt("return",!0);case 10:return P.prev=10,P.t0=P.catch(2),s(null),P.abrupt("return",!1);case 14:case"end":return P.stop()}},B,null,[[2,10]])}));return function(B){return y.apply(this,arguments)}}(),[]);return[a,_,l]},g=r.default=C},2724:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(42101),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},2857:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.truncate=r.trimTopic=r.toKebabCase=r.toFixedBug=r.toFixed=r.toCamelCase=r.sleep=r.shuffleArr=r.saveHtmlToPng=r.rgbToHex=r.reqStringify=r.readFromFile=r.randomString=r.randomNum=r.randomItem=r.randomHex=r.randomColor=r.random=r.promiseWithTimeout=r.prettyObject=r.pause=r.passwordStrength=r.oneApiImage=r.oneApiChat=r.limitDecimal=r.lerp=r.isURLSearchParams=r.isPalindrome=r.isObject=r.isNotEmpty=r.isEqual=r.isEmptyArray=r.isDecimal=r.isDate=r.isDarkMode=r.isArray=r.hidePhone=r.hasFocus=r.getType=r.getRandomId=r.getParamObject=r.getImgsUrl=r.getFileType=r.getEnv=r.getDirection=r.getCurrentDate=r.formatScientific=r.formatRomanNumeral=r.formatPercentage=r.formatOrdinal=r.formatFileSize=r.fibonacci=r.fetchSomething=r.exportJsonData=r.exportFile=r.delay=r.dayDif=r.customizeTimer=r.copyTextToClipboard=r.clearCookies=r.checkIsLocalPage=r.capitalizeWords=r.capitalize=r.camelizeCamelCase=r.asyncTo=r.asyncAction=r.ThousandNum=r.RoundNum=r.RandomId=void 0;var A=o(e(54756)),m=o(e(29293)),t=o(e(41132)),d=o(e(73738)),C=e(55373),g=o(e(20354)),h=r.getEnv=function(){var b;return typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]"&&(b="NODE"),typeof XMLHttpRequest!="undefined"&&(b="BROWSER"),b},v=r.isArray=function(b){return(0,d.default)(b)==="object"&&Object.prototype.toString.call(b)==="[object Array]"},p=r.isURLSearchParams=function(b){return typeof URLSearchParams!="undefined"&&b instanceof URLSearchParams},i=r.isDate=function(b){return(0,d.default)(b)==="object"&&Object.prototype.toString.call(b)==="[object Date]"},u=r.isObject=function(b){return b!==null&&(0,d.default)(b)==="object"},n=r.getParamObject=function(b){return p(b)?(0,C.parse)(b.toString(),{strictNullHandling:!0}):typeof b=="string"?[b]:b},a=r.reqStringify=function(b){return(0,C.stringify)(b,{arrayFormat:"repeat",strictNullHandling:!0})},s=r.getType=function(b){var j=Object.prototype.toString.call(b),S=/\[object (.*?)\]/.exec(j);return S?S[1]:null},c=r.hidePhone=function(b){return b==null?void 0:b.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")},E=r.asyncAction=function(b){var j=Promise.resolve(b);return function(S){j.then(function(){return setTimeout(function(){return S()})})}},l=r.getImgsUrl=function(b){var j=/<img.*?(?:>|\/>)/gi,S=/src=['"]?([^'"]*)['"]?/i,K=b.match(j);if(!K)return null;var Z=K.reduce(function(H,Q){var le=Q.match(S);return le[1]?[].concat((0,t.default)(H),[le[1]]):H},[]);return Z},f=r.customizeTimer={intervalTimer:null,timeoutTimer:null,setTimeout:function(b,j){var S=this,K=Date.now,Z=K(),H=Z,Q=function(){S.timeoutTimer=requestAnimationFrame(Q),H=K(),H-Z>=j&&(b(),cancelAnimationFrame(S.timeoutTimer))};return this.timeoutTimer=requestAnimationFrame(Q),this.timeoutTimer},clearTimeout:function(){cancelAnimationFrame(this.timeoutTimer)},setInterval:function(b,j){var S=this,K=Date.now,Z=K(),H=Z,Q=function(){S.intervalTimer=requestAnimationFrame(Q),H=K(),H-Z>=j&&(Z=K(),H=Z,b())};return this.intervalTimer=requestAnimationFrame(Q),this.intervalTimer},clearInterval:function(){cancelAnimationFrame(this.intervalTimer)}},_=r.isDecimal=function(b){var j=/(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/;return j.test(b)},y=r.limitDecimal=function(b){return b.replace(/^(-)*(\d+)\.(\d\d).*$/,"$1$2.$3")},B=r.passwordStrength=function(b){var j=/^(?=.*[A-Z])(?=.*[\d])(?=.*[a-z]).{8,}$/;return j.test(b)},O=r.checkIsLocalPage=function(){document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")return!1;if(document.visibilityState==="visible")return!0;window.addEventListener("pagehide",function(b){b.persisted},!1)})},D=r.randomHex=function(){return"#".concat(Math.floor(Math.random()*16777215).toString(16).padEnd(6,"0"))},M=r.rgbToHex=function(b,j,S){return"#".concat((1<<24|b<<16|j<<8|S).toString(16).slice(1))},P=r.fibonacci=function(b){for(var j=[0,1],S=2;S<b;S++)j.push(j[S-1]+j[S-2]);return j.slice(0,b)},I=r.lerp=function(b,j,S){return b+(j-b)*S},T=r.formatFileSize=function(b){var j=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2;if(b===0)return"0 Bytes";var S=1024,K=["B","KB","MB","GB","TB"],Z=Math.floor(Math.log(b)/Math.log(S));return"".concat((b/Math.pow(S,Z)).toFixed(j)," ").concat(K[Z])},U=r.formatOrdinal=function(b){var j=["th","st","nd","rd"],S=b%100;return"".concat(b).concat(j[(S-20)%10]||j[S]||j[0])},R=r.formatPercentage=function(b){var j=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2;return"".concat((b*100).toFixed(j),"%")},w=r.formatRomanNumeral=function(b){for(var j=[{value:1e3,numeral:"M"},{value:900,numeral:"CM"},{value:500,numeral:"D"},{value:400,numeral:"CD"},{value:100,numeral:"C"},{value:90,numeral:"XC"},{value:50,numeral:"L"},{value:40,numeral:"XL"},{value:10,numeral:"X"},{value:9,numeral:"IX"},{value:5,numeral:"V"},{value:4,numeral:"IV"},{value:1,numeral:"I"}],S="",K=0,Z=j;K<Z.length;K++)for(var H=Z[K],Q=H.value,le=H.numeral;b>=Q;)S+=le,b-=Q;return S},L=r.formatScientific=function(b){var j=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2;return toExponential(j)},z=r.capitalizeWords=function(b){return b.replace(/\b\w/g,function(j){return j.toUpperCase()})},F=r.isPalindrome=function(b){var j=b.toLowerCase().replace(/[^a-z0-9]/g,"");return j===j.split("").reverse().join("")},k=r.toCamelCase=function(b){return b.replace(/\W+(.)/g,function(j,S){return S.toUpperCase()})},N=r.toKebabCase=function(b){return b.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g,"").replace(/([a-z])([A-Z])/g,function(j,S,K){return"".concat(S,"_").concat(K.toLowerCase())}).replace(/[^A-Za-z0-9]+|_+/g,"-").toLowerCase()},V=r.truncate=function(b,j){return b.length>j?b.slice(0,j)+"...":b},X=r.delay=function(b){return new Promise(function(j){return setTimeout(j,b)})},$=r.clearCookies=document.cookie.split(";").forEach(function(W){return document.cookie=W.replace(/^ +/,"").replace(/[=].*/,"=;expires=".concat(new Date(0).toUTCString(),";path=/"))}),Y=r.dayDif=function(b,j){return Math.ceil(Math.abs(b.getTime()-j.getTime())/864e5)},re=r.capitalize=function(b){return b.charAt(0).toUpperCase()+b.slice(1)},ue=r.isNotEmpty=function(b){return Array.isArray(b)&&b.length>0},pe=r.isDarkMode=window.matchMedia("(prefers-color-scheme: dark)").matches,Ae=r.fetchSomething=function(){return new Promise(function(b){setTimeout(function(){b("")},1e3)})},ye=r.toFixed=function(b,j){if(typeof b!="number")throw new Error("number\u4E0D\u662F\u6570\u5B57");var S=Math.round(Math.pow(10,j)*b)/Math.pow(10,j);if(S=String(S),S.indexOf(".")===-1)j!==0&&(S+=".",S+=new Array(j+1).join("0"));else{var K=S.split(".");K[1].length<j&&(K[1]+=new Array(j-K[1].length+1).join("0")),S=K.join(".")}return S},ne=r.toFixedBug=function(b,j){return~~(Math.pow(10,j)*b)/Math.pow(10,j)},G=r.promiseWithTimeout=function(b,j){var S=new Promise(function(K){return setTimeout(function(){return K("Time Out!")},j)});return Promise.race([S,b])},ae=r.shuffleArr=function(b){return b.sort(function(){return .5-Math.random()})},oe=r.sleep=function(b){return new Promise(function(j){return setTimeout(function(){return j()},b)})},q=null,J=r.ThousandNum=function(b){return b.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},de=r.RandomId=function(b){return Math.random().toString(36).substring(3,b)},ee=r.RoundNum=function(b,j){return Math.round(b*Math.pow(10,j))/Math.pow(10,j)},me=r.randomNum=function(b,j){return Math.floor(Math.random()*(j-b+1))+b},Ee=r.isEmptyArray=function(b){return Array.isArray(b)&&!b.length},Me=r.randomItem=function(b){return b[Math.floor(Math.random()*b.length)]},ve=r.asyncTo=function(b){return b.then(function(j){return[null,j]}).catch(function(j){return[j]})},Be=r.hasFocus=function(b){return b===document.activeElement},De=r.isEqual=function(b,j){return JSON.stringify(b)===JSON.stringify(j)},Ce=r.randomString=function(){return Math.random().toString(36).slice(2)},xe=r.random=function(b,j){return Math.floor(Math.random()*(j-b+1)+b)},Ie=r.randomColor=function(){return"#".concat(Math.random().toString(16).slice(2,8).padEnd(6,"0"))},Se=r.pause=function(b){return new Promise(function(j){return setTimeout(j,b)})},We=r.camelizeCamelCase=function(b){return b.replace(/(?:^\w|[A-Z]|\b\w)/g,function(j,S){return S===0?j.toLowerCase():j.toUpperCase()}).replace(/\s+/g,"")},Ue=r.copyTextToClipboard=function(){var W=(0,m.default)(A.default.mark(function b(j){var S;return A.default.wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:if(Z.prev=0,!((S=navigator)!==null&&S!==void 0&&(S=S.clipboard)!==null&&S!==void 0&&S.writeText)){Z.next=4;break}return Z.next=4,navigator.clipboard.writeText(j);case 4:Z.next=8;break;case 6:Z.prev=6,Z.t0=Z.catch(0);case 8:case"end":return Z.stop()}},b,null,[[0,6]])}));return function(j){return W.apply(this,arguments)}}(),ke=r.getRandomId=function(){for(var b="",j="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",S=0;S<32;S++)b+=j.charAt(Math.floor(Math.random()*j.length));return b},Pe=r.oneApiChat=function(b,j,S){return fetch("https://api.zhizengzeng.com/v1/chat/completions",{method:"POST",signal:S,headers:{Authorization:j,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-4.1",messages:b,stream:!0})})},Oe=r.oneApiImage=function(b,j,S){return fetch("https://api.zhizengzeng.com/v1/images/generations",{method:"POST",signal:S,headers:{Authorization:j,"Content-Type":"application/json"},body:JSON.stringify({model:"dall-e-3",prompt:b[0].content,n:1,size:"1792x1024",response_format:"url"})})},je=r.getCurrentDate=function(){var b=new Date,j=b.getDate(),S=b.getMonth()+1,K=b.getFullYear();return"".concat(K,"-").concat(S,"-").concat(j)},we=r.exportJsonData=function(b){var j=je(),S=JSON.stringify(JSON.parse(b),null,2),K=new Blob([S],{type:"application/json"}),Z=URL.createObjectURL(K),H=document.createElement("a");H.href=Z,H.download="chat-store_".concat(j,".json"),document.body.appendChild(H),H.click(),document.body.removeChild(H)},se=r.saveHtmlToPng=function(){var W=(0,m.default)(A.default.mark(function b(j,S,K){var Z,H,Q,le;return A.default.wrap(function(te){for(;;)switch(te.prev=te.next){case 0:return te.prev=0,Z=j!=null?j:document.getElementById("image-wrapper"),te.next=4,(0,g.default)(Z,{useCORS:!0});case 4:H=te.sent,Q=H.toDataURL("image/png"),le=document.createElement("a"),le.style.display="none",le.href=Q,le.setAttribute("download","chat-shot.png"),typeof le.download=="undefined"&&le.setAttribute("target","_blank"),document.body.appendChild(le),le.click(),document.body.removeChild(le),window.URL.revokeObjectURL(Q),S&&S(),Promise.resolve(),te.next=22;break;case 19:te.prev=19,te.t0=te.catch(0),K&&K(te.t0.message);case 22:case"end":return te.stop()}},b,null,[[0,19]])}));return function(j,S,K){return W.apply(this,arguments)}}(),He=r.trimTopic=function(b){return b.replace(/[，。！？”“"、,.!?]*$/,"")},Le=r.readFromFile=function(){return new Promise(function(b,j){var S=document.createElement("input");S.type="file",S.accept="application/json",S.onchange=function(K){var Z=K.target.files[0],H=new FileReader;H.onload=function(Q){b(Q.target.result)},H.onerror=function(Q){return j(new Error(Q))},H.readAsText(Z)},S.click()})},qe=r.prettyObject=function(b){var j="";return typeof b!="string"&&(j=JSON.stringify(b,null,"  ")),j==="{}"?j.toString():j.startsWith("```json")?j:["```json",j,"```"].join(`
`)},et=r.getFileType=function(b,j){var S=j.split(".").pop().toLowerCase();switch(S){case"txt":return"text/plain";case"json":return"application/json";case"doc":return"application/msword";case"docx":return"application/vnd.openxmlformats-officedocument.wordprocessingml.document";case"xls":return"application/vnd.ms-excel";case"xlsx":return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";case"ppt":return"application/vnd.ms-powerpoint";case"pptx":return"application/vnd.openxmlformats-officedocument.presentationml.presentation";case"pdf":return"application/pdf";case"jpg":case"jpeg":return"image/jpeg";case"png":return"image/png";case"gif":return"image/gif";case"zip":return"application/zip";case"rar":return"application/x-rar-compressed";default:if(typeof b=="string")try{return JSON.parse(b),"application/json"}catch(K){return"text/plain"}else return b instanceof Uint8Array||b instanceof ArrayBuffer,"application/octet-stream"}},ut=r.exportFile=function(b,j){var S,K;if((b==null||(S=b.headers["content-type"])===null||S===void 0?void 0:S.indexOf("application/json"))===-1){var Z=((K=b.headers)===null||K===void 0?void 0:K["content-disposition"])||"attachment;filename=".concat(j||"file",".xlsx"),H=decodeURI(Z.split("=")[1].replace(/'/g,"").replace(/UTF-8/g,"").replace(/utf-8/g,""))||"",Q=et(b.data,j||H),le=new Blob([b.data],{type:Q}),be=URL.createObjectURL(le),te=document.createElement("a");document.body.appendChild(te),te.style="display: none",te.href=be,te.download=H,te.click(),document.body.removeChild(te)}},dt=r.getDirection=function(b,j){var S=j.getBoundingClientRect(),K=S.width,Z=S.height,H=S.left,Q=S.top,le=b.clientX-H-K/2*(K>Z?Z/K:1),be=b.clientY-Q-Z/2*(Z>K?K/Z:1),te=Math.round(Math.atan2(be,le)/1.57079633+5)%4;return te}},4204:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=C(e(96540)),d=e(65848);function C(p,i){if(typeof WeakMap=="function")var u=new WeakMap,n=new WeakMap;return(C=function(s,c){if(!c&&s&&s.__esModule)return s;var E,l,f={__proto__:null,default:s};if(s===null||A(s)!="object"&&typeof s!="function")return f;if(E=c?n:u){if(E.has(s))return E.get(s);E.set(s,f)}for(var _ in s)_!=="default"&&{}.hasOwnProperty.call(s,_)&&((l=(E=Object.defineProperty)&&Object.getOwnPropertyDescriptor(s,_))&&(l.get||l.set)?E(f,_,l):f[_]=s[_]);return f})(p,i)}function g(p){return 1-Math.pow(1-p,3)}var h=function(i){var u=i.icons,n=i.images,a=(0,t.useRef)(null),s=(0,t.useState)([]),c=(0,m.default)(s,2),E=c[0],l=c[1],f=(0,t.useState)({x:0,y:0}),_=(0,m.default)(f,2),y=_[0],B=_[1],O=(0,t.useState)(!1),D=(0,m.default)(O,2),M=D[0],P=D[1],I=(0,t.useState)({x:0,y:0}),T=(0,m.default)(I,2),U=T[0],R=T[1],w=(0,t.useState)({x:0,y:0}),L=(0,m.default)(w,2),z=L[0],F=L[1],k=(0,t.useState)(null),N=(0,m.default)(k,2),V=N[0],X=N[1],$=(0,t.useRef)(),Y=(0,t.useRef)(y),re=(0,t.useRef)([]),ue=(0,t.useRef)([]);(0,t.useEffect)(function(){if(!(!u&&!n)){var ne=u||n||[];ue.current=new Array(ne.length).fill(!1);var G=ne.map(function(ae,oe){var q=document.createElement("canvas");q.width=40,q.height=40;var J=q.getContext("2d");if(J)if(n){var de=new Image;de.crossOrigin="anonymous",de.src=ne[oe],de.onload=function(){J.clearRect(0,0,q.width,q.height),J.beginPath(),J.arc(20,20,20,0,Math.PI*2),J.closePath(),J.clip(),J.drawImage(de,0,0,40,40),ue.current[oe]=!0}}else{J.scale(.4,.4);var ee=(0,d.renderToString)(ae),me=new Image;me.src="data:image/svg+xml;base64,"+btoa(ee),me.onload=function(){J.clearRect(0,0,q.width,q.height),J.drawImage(me,0,0),ue.current[oe]=!0}}return q});re.current=G}},[u,n]),(0,t.useEffect)(function(){for(var ne=u||n||[],G=[],ae=ne.length||20,oe=2/ae,q=Math.PI*(3-Math.sqrt(5)),J=0;J<ae;J++){var de=J*oe-1+oe/2,ee=Math.sqrt(1-de*de),me=J*q,Ee=Math.cos(me)*ee,Me=Math.sin(me)*ee;G.push({x:Ee*100,y:de*100,z:Me*100,scale:1,opacity:1,id:J})}l(G)},[u,n]);var pe=function(G){var ae,oe=(ae=a.current)===null||ae===void 0?void 0:ae.getBoundingClientRect();if(!(!oe||!a.current)){var q=G.clientX-oe.left,J=G.clientY-oe.top,de=a.current.getContext("2d");de&&(E.forEach(function(ee){var me,Ee,Me=Math.cos(Y.current.x),ve=Math.sin(Y.current.x),Be=Math.cos(Y.current.y),De=Math.sin(Y.current.y),Ce=ee.x*Be-ee.z*De,xe=ee.x*De+ee.z*Be,Ie=ee.y*Me+xe*ve,Se=((me=a.current)===null||me===void 0?void 0:me.width)/2+Ce,We=((Ee=a.current)===null||Ee===void 0?void 0:Ee.height)/2+Ie,Ue=(xe+200)/300,ke=20*Ue,Pe=q-Se,Oe=J-We;if(Pe*Pe+Oe*Oe<ke*ke){var je=-Math.atan2(ee.y,Math.sqrt(ee.x*ee.x+ee.z*ee.z)),we=Math.atan2(ee.x,ee.z),se=Y.current.x,He=Y.current.y,Le=Math.sqrt(Math.pow(je-se,2)+Math.pow(we-He,2)),qe=Math.min(2e3,Math.max(800,Le*1e3));X({x:je,y:we,startX:se,startY:He,distance:Le,startTime:performance.now(),duration:qe});return}}),P(!0),R({x:G.clientX,y:G.clientY}))}},Ae=function(G){var ae,oe=(ae=a.current)===null||ae===void 0?void 0:ae.getBoundingClientRect();if(oe){var q=G.clientX-oe.left,J=G.clientY-oe.top;F({x:q,y:J})}if(M){var de=G.clientX-U.x,ee=G.clientY-U.y;Y.current={x:Y.current.x+ee*.002,y:Y.current.y+de*.002},R({x:G.clientX,y:G.clientY})}},ye=function(){P(!1)};return(0,t.useEffect)(function(){var ne=a.current,G=ne==null?void 0:ne.getContext("2d");if(!(!ne||!G)){var ae=function(){G.clearRect(0,0,ne.width,ne.height);var q=ne.width/2,J=ne.height/2,de=Math.sqrt(q*q+J*J),ee=z.x-q,me=z.y-J,Ee=Math.sqrt(ee*ee+me*me),Me=.003+Ee/de*.01;if(V){var ve=performance.now()-V.startTime,Be=Math.min(1,ve/V.duration),De=g(Be);Y.current={x:V.startX+(V.x-V.startX)*De,y:V.startY+(V.y-V.startY)*De},Be>=1&&X(null)}else M||(Y.current={x:Y.current.x+me/ne.height*Me,y:Y.current.y+ee/ne.width*Me});E.forEach(function(Ce,xe){var Ie=Math.cos(Y.current.x),Se=Math.sin(Y.current.x),We=Math.cos(Y.current.y),Ue=Math.sin(Y.current.y),ke=Ce.x*We-Ce.z*Ue,Pe=Ce.x*Ue+Ce.z*We,Oe=Ce.y*Ie+Pe*Se,je=(Pe+200)/300,we=Math.max(.2,Math.min(1,(Pe+150)/200));G.save(),G.translate(ne.width/2+ke,ne.height/2+Oe),G.scale(je,je),G.globalAlpha=we,u||n?re.current[xe]&&ue.current[xe]&&G.drawImage(re.current[xe],-20,-20,40,40):(G.beginPath(),G.arc(0,0,20,0,Math.PI*2),G.fillStyle="#4444ff",G.fill(),G.fillStyle="white",G.textAlign="center",G.textBaseline="middle",G.font="16px Arial",G.fillText("".concat(Ce.id+1),0,0)),G.restore()}),$.current=requestAnimationFrame(ae)};return ae(),function(){$.current&&cancelAnimationFrame($.current)}}},[u,n,E,M,z,V]),t.default.createElement("canvas",{ref:a,width:360,height:360,onMouseDown:pe,onMouseMove:Ae,onMouseUp:ye,onMouseLeave:ye})},v=r.default=h},6731:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(94634)),m=o(e(85715)),t=o(e(91847)),d=o(e(96540)),C=o(e(21652)),g=["alt","src","className","loadInitially","observerOptions"],h=function(i){var u=i.alt,n=i.src,a=i.className,s=i.loadInitially,c=s===void 0?!1:s,E=i.observerOptions,l=E===void 0?{root:null,rootMargin:"200px 0px"}:E,f=(0,t.default)(i,g),_=d.default.useRef(null),y=d.default.useRef(null),B=d.default.useState(c),O=(0,m.default)(B,2),D=O[0],M=O[1],P=d.default.useCallback(function(I){I[0].isIntersecting&&(_.current.disconnect(),M(!0))},[_]);return d.default.useEffect(function(){if(!c){if("loading"in HTMLImageElement.prototype){M(!0);return}return _.current=new IntersectionObserver(P,l),_.current.observe(y.current),function(){_.current.disconnect()}}},[]),d.default.createElement("figure",{className:C.default.hoverRotate},d.default.createElement("img",(0,A.default)({alt:u,src:D?n:null,ref:y,className:a,loading:c?void 0:"lazy"},f)),d.default.createElement("figcaption",null,d.default.createElement("h3",null,"Lorem ",d.default.createElement("br",null),"Ipsum")))},v=r.default=h},6901:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=e(23947),t=function(g){var h=g.children;return A.default.createElement(m.motion.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{ease:"linear",duration:1,y:{duration:.5}}},h)},d=r.default=t},7629:function(x,r,e){"use strict";"use client";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.ReactSignature=n;var m=o(e(94634)),t=o(e(85715)),d=o(e(91847)),C=o(e(71508)),g=o(e(33560)),h=e(97751),v=u(e(96540)),p=e(63859),i=["className"];function u(f,_){if(typeof WeakMap=="function")var y=new WeakMap,B=new WeakMap;return(u=function(D,M){if(!M&&D&&D.__esModule)return D;var P,I,T={__proto__:null,default:D};if(D===null||A(D)!="object"&&typeof D!="function")return T;if(P=M?B:y){if(P.has(D))return P.get(D);P.set(D,T)}for(var U in D)U!=="default"&&{}.hasOwnProperty.call(D,U)&&((I=(P=Object.defineProperty)&&Object.getOwnPropertyDescriptor(D,U))&&(I.get||I.set)?P(T,U,I):T[U]=D[U]);return T})(f,_)}function n(f){var _,y,B=f.className,O=(0,d.default)(f,i),D=(0,v.useState)(!1),M=(0,t.default)(D,2),P=M[0],I=M[1],T=(0,v.useRef)(null),U=function(){var L;return(L=T.current)===null||L===void 0?void 0:L.clear()},R=function(){if(P){var L;(L=T.current)===null||L===void 0||L.clear(),I(!1)}else I(!0)};return v.default.createElement("div",{className:"flex flex-col gap-2"},v.default.createElement("p",{className:"text-lg tracking-tight text-neutral-500"},"\u6570\u5B57\u7B7E\u540D\uFF1A"),v.default.createElement(g.default,(0,m.default)({className:(0,C.default)("h-28 w-80 rounded-lg border border-neutral-500/20 bg-neutral-500/10",P?"cursor-not-allowed fill-neutral-500":"fill-neutral-800 dark:fill-neutral-200",B),options:{smoothing:0,streamline:.8,thinning:.7},readonly:P},O,{ref:T})),v.default.createElement("div",{className:"flex justify-end gap-1 text-neutral-700 dark:text-neutral-200"},v.default.createElement(s,{onClick:R,readonly:P}),P&&v.default.createElement(v.default.Fragment,null,v.default.createElement(c,{svgElement:(_=T.current)===null||_===void 0?void 0:_.svg}),v.default.createElement(E,{svgElement:(y=T.current)===null||y===void 0?void 0:y.svg})),!P&&v.default.createElement(l,{onClick:U})))}function a(f){var _=f.cloneNode(!0),y=f.clientWidth,B=f.clientHeight;return _.removeAttribute("style"),_.setAttribute("width","".concat(y,"px")),_.setAttribute("height","".concat(B,"px")),_.setAttribute("viewBox","0 0 ".concat(y," ").concat(B)),{svgElm:_,clientWidth:y,clientHeight:B}}function s(f){var _=f.readonly,y=f.onClick;return v.default.createElement("button",{className:"inline-grid size-8 place-content-center rounded-md border border-neutral-500/10 bg-neutral-500/10 hover:bg-neutral-500/20",onClick:y,type:"button"},_?v.default.createElement(v.default.Fragment,null,v.default.createElement(h.RefreshCcwIcon,{className:"size-5"}),v.default.createElement("span",{className:"sr-only"},"Reset")):v.default.createElement(v.default.Fragment,null,v.default.createElement(h.CheckIcon,{className:"size-5"}),v.default.createElement("span",{className:"sr-only"},"Validate")))}function c(f){var _=f.svgElement,y=function(){if(_){var O=a(_),D=O.svgElm,M=O.clientWidth,P=O.clientHeight,I=new XMLSerializer().serializeToString(D),T=document.createElement("canvas"),U=T.getContext("2d"),R=new Image;R.onload=function(){T.width=M!=null?M:0,T.height=P!=null?P:0,U==null||U.drawImage(R,0,0);var w=document.createElement("a");w.download="signature.png",w.href=T.toDataURL("image/png"),w.click()},R.src="data:image/svg+xml;base64,".concat(window.btoa(decodeURIComponent(encodeURIComponent(I))))}};return v.default.createElement("button",{className:"inline-grid size-8 place-content-center rounded-md border border-neutral-500/10 bg-neutral-500/10 hover:bg-neutral-500/20",onClick:y,type:"button"},v.default.createElement(h.DownloadIcon,{className:"size-5"}),v.default.createElement("span",{className:"sr-only"},"Download"))}function E(f){var _=f.svgElement,y=(0,p.useCopy)(),B=(0,t.default)(y,3),O=B[0],D=B[1],M=B[2],P=function(){if(_){var T=a(_),U=T.svgElm;D(U.outerHTML)}};return v.default.createElement("button",{className:"inline-flex items-center gap-1 rounded-md border border-neutral-500/10 bg-neutral-500/10 px-1 text-sm tracking-tight hover:bg-neutral-500/20",onClick:P,type:"button"},M?v.default.createElement(v.default.Fragment,null,v.default.createElement("span",null,"Copied"),v.default.createElement(h.CheckIcon,{className:"size-5"})):v.default.createElement(v.default.Fragment,null,v.default.createElement("span",null,"Copy to SVG"),v.default.createElement(h.CopyIcon,{className:"size-5"})))}function l(f){var _=f.onClick;return v.default.createElement("button",{className:"inline-grid size-8 place-content-center rounded-md border border-neutral-500/10 bg-neutral-500/10 hover:bg-neutral-500/20",onClick:_,type:"button"},v.default.createElement(h.Eraser,{className:"size-5"}),v.default.createElement("span",{className:"sr-only"},"Clear"))}},7867:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.background--V0AeH {\r
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
`],sourceRoot:""}]),d.locals={background:"background--V0AeH","move-background":"move-background--h74DC",moveBackground:"move-background--h74DC"},r.A=d},11530:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.placeholder--japL8 {\r
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
`],sourceRoot:""}]),d.locals={placeholder:"placeholder--japL8","faux-image-wrapper":"faux-image-wrapper--XUkhI",fauxImageWrapper:"faux-image-wrapper--XUkhI","faux-image":"faux-image--jW9eM",fauxImage:"faux-image--jW9eM",pulse:"pulse--GkzDV","faux-text":"faux-text--npYJI",fauxText:"faux-text--npYJI",short:"short--IDBVM","min-short":"min-short--iTXAn",minShort:"min-short--iTXAn",shimmer:"shimmer--rIetr"},r.A=d},11845:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(41132)),t=C(e(96540)),d=e(21126);function C(p,i){if(typeof WeakMap=="function")var u=new WeakMap,n=new WeakMap;return(C=function(s,c){if(!c&&s&&s.__esModule)return s;var E,l,f={__proto__:null,default:s};if(s===null||A(s)!="object"&&typeof s!="function")return f;if(E=c?n:u){if(E.has(s))return E.get(s);E.set(s,f)}for(var _ in s)_!=="default"&&{}.hasOwnProperty.call(s,_)&&((l=(E=Object.defineProperty)&&Object.getOwnPropertyDescriptor(s,_))&&(l.get||l.set)?E(f,_,l):f[_]=s[_]);return f})(p,i)}var g=function(){var i=function(){return Math.random()*4-2},u=function(){return Math.random()},n=function(){return Math.random()};return t.default.createElement("div",{className:"absolute inset-0"},(0,m.default)(Array(80)).map(function(a,s){return t.default.createElement(d.motion.span,{key:"star-".concat(s),animate:{top:"calc(".concat(n()*100,"% + ").concat(i(),"px)"),left:"calc(".concat(n()*100,"% + ").concat(i(),"px)"),opacity:u(),scale:[1,1.2,0]},transition:{duration:n()*10+20,repeat:1/0,ease:"linear"},style:{position:"absolute",top:"".concat(n()*100,"%"),left:"".concat(n()*100,"%"),width:"2px",height:"2px",backgroundColor:"white",borderRadius:"50%",zIndex:1},className:"inline-block"})}))},h=(0,t.memo)(g),v=r.default=h},12005:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=d(e(96540)),t=o(e(12076));function d(h,v){if(typeof WeakMap=="function")var p=new WeakMap,i=new WeakMap;return(d=function(n,a){if(!a&&n&&n.__esModule)return n;var s,c,E={__proto__:null,default:n};if(n===null||A(n)!="object"&&typeof n!="function")return E;if(s=a?i:p){if(s.has(n))return s.get(n);s.set(n,E)}for(var l in n)l!=="default"&&{}.hasOwnProperty.call(n,l)&&((c=(s=Object.defineProperty)&&Object.getOwnPropertyDescriptor(n,l))&&(c.get||c.set)?s(E,l,c):E[l]=n[l]);return E})(h,v)}var C=function(){var v=(0,m.useRef)(null);return(0,m.useLayoutEffect)(function(){var p=v.current,i=function(n){var a=n.target.getBoundingClientRect(),s=n.clientX-a.left,c=n.clientY-a.top;p.style.setProperty("--x",s+"px"),p.style.setProperty("--y",c+"px")};return p.addEventListener("mousemove",i),function(){p.removeEventListener("mousemove",i)}},[]),m.default.createElement("button",{className:t.default.gradientTracking,ref:v},m.default.createElement("span",null,"Hover me"))},g=r.default=C},12076:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(98827),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},13187:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=o(e(87834)),t=function(g){var h=g.text,v=/((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;return A.default.createElement(A.default.Fragment,null,h.split(v).map(function(p,i){var u=p.match(v);if(u){var n=u[0];return A.default.createElement("a",{key:i,className:m.default.squiggle,target:"_blank",href:n.startsWith("http")?n:"http://".concat(n)},n)}return p}))},d=r.default=t},14278:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(99827),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},14726:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(43693)),t=C(e(96540)),d=e(74848);function C(i,u){if(typeof WeakMap=="function")var n=new WeakMap,a=new WeakMap;return(C=function(c,E){if(!E&&c&&c.__esModule)return c;var l,f,_={__proto__:null,default:c};if(c===null||A(c)!="object"&&typeof c!="function")return _;if(l=E?a:n){if(l.has(c))return l.get(c);l.set(c,_)}for(var y in c)y!=="default"&&{}.hasOwnProperty.call(c,y)&&((f=(l=Object.defineProperty)&&Object.getOwnPropertyDescriptor(c,y))&&(f.get||f.set)?l(_,y,f):_[y]=c[y]);return _})(i,u)}function g(i,u){var n=Object.keys(i);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(i);u&&(a=a.filter(function(s){return Object.getOwnPropertyDescriptor(i,s).enumerable})),n.push.apply(n,a)}return n}function h(i){for(var u=1;u<arguments.length;u++){var n=arguments[u]!=null?arguments[u]:{};u%2?g(Object(n),!0).forEach(function(a){(0,m.default)(i,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach(function(a){Object.defineProperty(i,a,Object.getOwnPropertyDescriptor(n,a))})}return i}var v=function(u){return(0,d.jsxs)("svg",h(h({xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",width:"1em",height:"1em"},u),{},{children:[(0,d.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),(0,d.jsx)("path",{d:"M16.54 7c-.805-2.365-2.536-4-4.54-4-2.774 0-5.023 2.632-5.023 6.496 0 1.956 1.582 4.727 2.512 6"}),(0,d.jsx)("path",{d:"M4.711 11.979C3.055 13.856 2.497 16.164 3.5 17.89c1.387 2.39 5.138 2.831 8.501.9 1.703-.979 2.875-3.362 3.516-4.798"}),(0,d.jsx)("path",{d:"M15.014 19.99c2.511 0 4.523-.438 5.487-2.1 1.387-2.39-.215-5.893-3.579-7.824-1.702-.979-4.357-1.235-5.927-1.07"}),(0,d.jsx)("path",{d:"M10.493 9.862c.48.276 1.095.112 1.372-.366a1 1 0 0 0-.367-1.365 1.007 1.007 0 0 0-1.373.366 1 1 0 0 0 .368 1.365zM8.5 15.5a1 1 0 1 0 2 0 1 1 0 1 0-2 0M14.5 14a1 1 0 1 0 2 0 1 1 0 1 0-2 0"})]}))},p=r.default=v},15678:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.alternating--mj1_d {\r
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
`],sourceRoot:""}]),d.locals={alternating:"alternating--mj1_d","alternating-text":"alternating-text--p6lWH",alternatingText:"alternating-text--p6lWH"},r.A=d},17329:function(x,r,e){"use strict";x.exports=e.p+"images/9ce539741014a14d8c0c.png"},17881:function(x,r,e){"use strict";var o=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=m(e(96540));function m(C,g){if(typeof WeakMap=="function")var h=new WeakMap,v=new WeakMap;return(m=function(i,u){if(!u&&i&&i.__esModule)return i;var n,a,s={__proto__:null,default:i};if(i===null||o(i)!="object"&&typeof i!="function")return s;if(n=u?v:h){if(n.has(i))return n.get(i);n.set(i,s)}for(var c in i)c!=="default"&&{}.hasOwnProperty.call(i,c)&&((a=(n=Object.defineProperty)&&Object.getOwnPropertyDescriptor(i,c))&&(a.get||a.set)?n(s,c,a):s[c]=i[c]);return s})(C,g)}var t=function(){var g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(){};(0,A.useEffect)(function(){var h=new AbortController;return document.documentElement.addEventListener("click",function(){g()},{signal:h.signal}),document.documentElement.addEventListener("mousedown",function(v){v.detail>1&&v.preventDefault()},{signal:h.signal}),function(){h.abort()}},[])},d=r.default=t},19064:function(x,r,e){"use strict";var o=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=m(e(96540));function m(C,g){if(typeof WeakMap=="function")var h=new WeakMap,v=new WeakMap;return(m=function(i,u){if(!u&&i&&i.__esModule)return i;var n,a,s={__proto__:null,default:i};if(i===null||o(i)!="object"&&typeof i!="function")return s;if(n=u?v:h){if(n.has(i))return n.get(i);n.set(i,s)}for(var c in i)c!=="default"&&{}.hasOwnProperty.call(i,c)&&((a=(n=Object.defineProperty)&&Object.getOwnPropertyDescriptor(i,c))&&(a.get||a.set)?n(s,c,a):s[c]=i[c]);return s})(C,g)}var t=function(){return A.default.createElement("div",{className:"flex items-center justify-start"},A.default.createElement("div",{className:"relative h-[150px] w-[360px] rounded-lg p-1",style:{backgroundImage:"radial-gradient(circle 230px at 0% 0%, #ffffff, #0c0d0d)"}},A.default.createElement("div",{className:"animate-move-dot absolute top-[10%] right-[10%] z-20 h-2 w-2 rounded-full bg-white shadow-md"}),A.default.createElement("div",{className:"bg-gradient-radial relative z-10 flex h-full w-full flex-col items-center justify-center rounded-lg from-gray-600 to-gray-900"},A.default.createElement("div",{className:"absolute top-0 left-0 h-[45px] w-[220px] origin-left rotate-[40deg] transform rounded-full bg-neutral-300 opacity-40 shadow-[0_0_50px_#ffffff] blur-md"}),A.default.createElement("div",{className:"bg-gradient-to-r from-black via-white to-black bg-clip-text text-6xl font-extrabold text-transparent"},"750k"),A.default.createElement("div",{className:"text-lg text-white"},"\u6D4F\u89C8\u91CF"),A.default.createElement("div",{className:"absolute top-[10%] h-[1px] w-full bg-gradient-to-r from-neutral-400 to-neutral-700"}),A.default.createElement("div",{className:"absolute bottom-[10%] h-[1px] w-full bg-neutral-700"}),A.default.createElement("div",{className:"absolute left-[10%] h-full w-[1px] bg-gradient-to-b from-neutral-400 to-neutral-700"}),A.default.createElement("div",{className:"absolute right-[10%] h-full w-[1px] bg-neutral-700"}))))},d=r.default=t},19484:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(7867),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},20485:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=g(e(96540)),d=e(21126),C=e(97751);function g(s,c){if(typeof WeakMap=="function")var E=new WeakMap,l=new WeakMap;return(g=function(_,y){if(!y&&_&&_.__esModule)return _;var B,O,D={__proto__:null,default:_};if(_===null||A(_)!="object"&&typeof _!="function")return D;if(B=y?l:E){if(B.has(_))return B.get(_);B.set(_,D)}for(var M in _)M!=="default"&&{}.hasOwnProperty.call(_,M)&&((O=(B=Object.defineProperty)&&Object.getOwnPropertyDescriptor(_,M))&&(O.get||O.set)?B(D,M,O):D[M]=_[M]);return D})(s,c)}var h=[{label:"Introduction"},{label:"Personal Information",fields:[{name:"name",type:"text",placeholder:"Name"},{name:"email",type:"email",placeholder:"Email"}]},{label:"Address Details",fields:[{name:"address",type:"text",placeholder:"Address"},{name:"city",type:"text",placeholder:"City"},{name:"country",type:"text",placeholder:"Country"}]},{label:"Review & Submit"}],v=function(c){var E=c.currentStep,l=c.steps;return t.default.createElement("div",{className:"relative w-full"},t.default.createElement("div",{className:"flex items-center justify-between"},l.map(function(f,_){return t.default.createElement(t.default.Fragment,{key:f.label},t.default.createElement("div",{className:"flex flex-col items-center"},t.default.createElement(d.motion.div,{className:"z-10 flex h-8 w-8 items-center justify-center rounded-full ".concat(_<=E?"bg-gray-500 text-white":"bg-gray-200 text-white dark:bg-gray-800 dark:text-gray-600"),animate:{scale:1.02}},_<E?t.default.createElement(C.CheckCircle,{size:17}):t.default.createElement(C.Circle,{size:17,fill:"currentColor"}))),_<l.length-1&&t.default.createElement("div",{className:"relative flex-grow"},t.default.createElement("div",{className:"absolute -top-1 h-1.5 w-full bg-gray-100 dark:bg-gray-800"}),t.default.createElement(d.motion.div,{className:"absolute -top-1 h-1.5 w-full bg-gray-500",initial:{width:"0%"},animate:{width:_<E?"100%":"0%"},transition:{duration:.5,ease:"easeInOut"}})))})))},p=function(){return t.default.createElement("div",{className:"my-4 flex min-h-[30vh] w-full items-center justify-center rounded-lg border bg-gray-100 text-center dark:border-gray-600 dark:bg-gray-800"},"Stepper Content")},i="rounded-2xl bg-gray-500 px-2 py-1 text-sm font-medium text-white",u=function(c){var E=c.currentStep,l=c.totalSteps,f=c.handlePrev,_=c.handleNext;return t.default.createElement("div",{className:"flex justify-end gap-3"},E===0?null:t.default.createElement("button",{onClick:f,className:i},"Previous"),E===l-1?null:t.default.createElement("button",{onClick:_,className:i},"Next"))},n=function(){var c=(0,t.useState)(1),E=(0,m.default)(c,2),l=E[0],f=E[1],_=function(){f(function(O){return Math.min(O+1,h.length-1)})},y=function(){f(function(O){return Math.max(O-1,0)})};return t.default.createElement("div",{className:"mx-auto w-full p-6"},t.default.createElement(v,{currentStep:l,steps:h}),t.default.createElement(p,null),t.default.createElement(u,{currentStep:l,totalSteps:h.length,handlePrev:y,handleNext:_}))},a=r.default=n},21265:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=r.BoxesCore=void 0;var A=o(e(94634)),m=o(e(91847)),t=o(e(96540)),d=e(21126),C=o(e(71508)),g=["className"],h=r.BoxesCore=function(u){var n=u.className,a=(0,m.default)(u,g),s=new Array(50).fill(1),c=new Array(30).fill(1),E=["rgb(125 211 252)","rgb(249 168 212)","rgb(134 239 172)","rgb(253 224 71)","rgb(252 165 165)","rgb(216 180 254)","rgb(147 197 253)","rgb(165 180 252)","rgb(196 181 253)"],l=function(){return E[Math.floor(Math.random()*E.length)]};return t.default.createElement("div",(0,A.default)({style:{transform:"translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)"},className:(0,C.default)("absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",n)},a),s.map(function(f,_){return t.default.createElement(d.motion.div,{key:"row"+_,className:"relative h-8 w-16 border-l border-slate-700"},c.map(function(y,B){return t.default.createElement(d.motion.div,{whileHover:{backgroundColor:l(),transition:{duration:0}},animate:{transition:{duration:1}},key:"col"+B,className:"relative h-8 w-16 border-t border-r border-slate-700"},B%2===0&&_%2===0?t.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700"},t.default.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6v12m6-6H6"})):null)}))}))},v=t.default.memo(h),p=r.default=v},21502:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(94634)),t=o(e(43693)),d=o(e(85715)),C=o(e(91847)),g=i(e(96540)),h=e(21126),v=o(e(71508)),p=["text","colors","className","sparklesCount"];function i(E,l){if(typeof WeakMap=="function")var f=new WeakMap,_=new WeakMap;return(i=function(B,O){if(!O&&B&&B.__esModule)return B;var D,M,P={__proto__:null,default:B};if(B===null||A(B)!="object"&&typeof B!="function")return P;if(D=O?_:f){if(D.has(B))return D.get(B);D.set(B,P)}for(var I in B)I!=="default"&&{}.hasOwnProperty.call(B,I)&&((M=(D=Object.defineProperty)&&Object.getOwnPropertyDescriptor(B,I))&&(M.get||M.set)?D(P,I,M):P[I]=B[I]);return P})(E,l)}function u(E,l){var f=Object.keys(E);if(Object.getOwnPropertySymbols){var _=Object.getOwnPropertySymbols(E);l&&(_=_.filter(function(y){return Object.getOwnPropertyDescriptor(E,y).enumerable})),f.push.apply(f,_)}return f}function n(E){for(var l=1;l<arguments.length;l++){var f=arguments[l]!=null?arguments[l]:{};l%2?u(Object(f),!0).forEach(function(_){(0,t.default)(E,_,f[_])}):Object.getOwnPropertyDescriptors?Object.defineProperties(E,Object.getOwnPropertyDescriptors(f)):u(Object(f)).forEach(function(_){Object.defineProperty(E,_,Object.getOwnPropertyDescriptor(f,_))})}return E}var a=function(l){var f=l.text,_=l.colors,y=_===void 0?{first:"#9E7AFF",second:"#FE8BBB"}:_,B=l.className,O=l.sparklesCount,D=O===void 0?10:O,M=(0,C.default)(l,p),P=(0,g.useState)([]),I=(0,d.default)(P,2),T=I[0],U=I[1];return(0,g.useEffect)(function(){var R=function(){var k="".concat(Math.random()*100,"%"),N="".concat(Math.random()*100,"%"),V=Math.random()>.5?y.first:y.second,X=Math.random()*2,$=Math.random()*1+.3,Y=Math.random()*10+5,re="".concat(k,"-").concat(N,"-").concat(Date.now());return{id:re,x:k,y:N,color:V,delay:X,scale:$,lifespan:Y}},w=function(){var k=Array.from({length:D},R);U(k)},L=function(){U(function(k){return k.map(function(N){return N.lifespan<=0?R():n(n({},N),{},{lifespan:N.lifespan-.1})})})};w();var z=setInterval(L,100);return function(){return clearInterval(z)}},[y.first,y.second]),g.default.createElement("div",(0,m.default)({className:(0,v.default)("text",B)},M,{style:{"--sparkles-first-color":"".concat(y.first),"--sparkles-second-color":"".concat(y.second)}}),g.default.createElement("span",{className:"relative inline-block"},T.map(function(R){return g.default.createElement(s,(0,m.default)({key:R.id},R))}),g.default.createElement("i",null,f)))},s=function(l){var f=l.id,_=l.x,y=l.y,B=l.color,O=l.delay,D=l.scale;return g.default.createElement(h.motion.svg,{key:f,className:"pointer-events-none absolute z-20",initial:{opacity:0,left:_,top:y},animate:{opacity:[0,1,0],scale:[0,D,0],rotate:[75,120,150]},transition:{duration:.8,repeat:1/0,delay:O},width:"21",height:"21",viewBox:"0 0 21 21"},g.default.createElement("path",{d:"M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z",fill:B}))},c=r.default=a},21652:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(48497),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},23259:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=d(e(96540));function d(h,v){if(typeof WeakMap=="function")var p=new WeakMap,i=new WeakMap;return(d=function(n,a){if(!a&&n&&n.__esModule)return n;var s,c,E={__proto__:null,default:n};if(n===null||A(n)!="object"&&typeof n!="function")return E;if(s=a?i:p){if(s.has(n))return s.get(n);s.set(n,E)}for(var l in n)l!=="default"&&{}.hasOwnProperty.call(n,l)&&((c=(s=Object.defineProperty)&&Object.getOwnPropertyDescriptor(n,l))&&(c.get||c.set)?s(E,l,c):E[l]=n[l]);return E})(h,v)}var C=function(){var v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",i=(0,t.useState)(p?void 0:0),u=(0,m.default)(i,2),n=u[0],a=u[1],s=function(){return a(function(E){return((E!=null?E:-1)+1)%v.length})};return[n==null&&p?p:v[n!=null?n:0],s]},g=r.default=C},23883:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=o(e(49676)),t=function(g){var h=g.text;return A.default.createElement("div",{className:m.default.isometricCard},A.default.createElement("p",null,h))},d=r.default=t},23973:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=o(e(19484)),t=function(g){return A.default.createElement("div",{style:{position:"relative",height:"100%"}},A.default.createElement("div",{className:m.default.background},"Mesh Gradient Background"))},d=r.default=t},24124:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.fireConfetti=void 0;var A=o(e(43693)),m=o(e(14685));function t(p,i){var u=Object.keys(p);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(p);i&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(p,a).enumerable})),u.push.apply(u,n)}return u}function d(p){for(var i=1;i<arguments.length;i++){var u=arguments[i]!=null?arguments[i]:{};i%2?t(Object(u),!0).forEach(function(n){(0,A.default)(p,n,u[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(p,Object.getOwnPropertyDescriptors(u)):t(Object(u)).forEach(function(n){Object.defineProperty(p,n,Object.getOwnPropertyDescriptor(u,n))})}return p}var C=200,g={origin:{y:.7},zIndex:1500};function h(p,i){(0,m.default)(d(d(d({},g),i),{},{particleCount:Math.floor(C*p)}))}var v=r.fireConfetti=function(){h(.25,{spread:26,startVelocity:55}),h(.2,{spread:60}),h(.35,{spread:100,decay:.91,scalar:.8}),h(.1,{spread:120,startVelocity:25,decay:.92,scalar:1.2}),h(.1,{spread:120,startVelocity:45})}},24274:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.text-animate--hQcUn {\r
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
`],sourceRoot:""}]),d.locals={"text-animate":"text-animate--hQcUn",textAnimate:"text-animate--hQcUn","bounce-in":"bounce-in--EivIZ",bounceIn:"bounce-in--EivIZ","text-animate-hover":"text-animate-hover--WcHin",textAnimateHover:"text-animate-hover--WcHin","rubber-band":"rubber-band--dY19h",rubberBand:"rubber-band--dY19h"},r.A=d},25598:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=C(e(96540)),d=o(e(91757));function C(v,p){if(typeof WeakMap=="function")var i=new WeakMap,u=new WeakMap;return(C=function(a,s){if(!s&&a&&a.__esModule)return a;var c,E,l={__proto__:null,default:a};if(a===null||A(a)!="object"&&typeof a!="function")return l;if(c=s?u:i){if(c.has(a))return c.get(a);c.set(a,l)}for(var f in a)f!=="default"&&{}.hasOwnProperty.call(a,f)&&((E=(c=Object.defineProperty)&&Object.getOwnPropertyDescriptor(a,f))&&(E.get||E.set)?c(l,f,E):l[f]=a[f]);return l})(v,p)}var g=function(p){var i=p.direction,u=i===void 0?"right":i,n=p.speed,a=n===void 0?1:n,s=p.borderColor,c=s===void 0?"#999":s,E=p.squareSize,l=E===void 0?40:E,f=p.hoverFillColor,_=f===void 0?"#222":f,y=(0,t.useRef)(null),B=(0,t.useRef)(null),O=(0,t.useRef)(),D=(0,t.useRef)(),M=(0,t.useRef)({x:0,y:0}),P=(0,t.useState)(null),I=(0,m.default)(P,2),T=I[0],U=I[1];return(0,t.useEffect)(function(){var R=y.current;if(R){var w=R.getContext("2d"),L=function(){R.width=R.offsetWidth,R.height=R.offsetHeight,O.current=Math.ceil(R.width/l)+1,D.current=Math.ceil(R.height/l)+1};window.addEventListener("resize",L),L();var z=function(){w.clearRect(0,0,R.width,R.height);for(var X=Math.floor(M.current.x/l)*l,$=Math.floor(M.current.y/l)*l,Y=X;Y<R.width+l;Y+=l)for(var re=$;re<R.height+l;re+=l){var ue=Y-M.current.x%l,pe=re-M.current.y%l;T&&Math.floor((Y-X)/l)===T.x&&Math.floor((re-$)/l)===T.y&&(w.fillStyle=_,w.fillRect(ue,pe,l,l)),w.strokeStyle=c,w.strokeRect(ue,pe,l,l)}var Ae=w.createRadialGradient(R.width/2,R.height/2,0,R.width/2,R.height/2,Math.sqrt(Math.pow(R.width,2)+Math.pow(R.height,2))/2);Ae.addColorStop(0,"rgba(0, 0, 0, 0)"),Ae.addColorStop(1,"#060606"),w.fillStyle=Ae,w.fillRect(0,0,R.width,R.height)},F=function(){var X=Math.max(a,.1);switch(u){case"right":M.current.x=(M.current.x-X+l)%l;break;case"left":M.current.x=(M.current.x+X+l)%l;break;case"up":M.current.y=(M.current.y+X+l)%l;break;case"down":M.current.y=(M.current.y-X+l)%l;break;case"diagonal":M.current.x=(M.current.x-X+l)%l,M.current.y=(M.current.y-X+l)%l;break;default:break}z(),B.current=requestAnimationFrame(F)},k=function(X){var $=R.getBoundingClientRect(),Y=X.clientX-$.left,re=X.clientY-$.top,ue=Math.floor(M.current.x/l)*l,pe=Math.floor(M.current.y/l)*l,Ae=Math.floor((Y+M.current.x-ue)/l),ye=Math.floor((re+M.current.y-pe)/l);U({x:Ae,y:ye})},N=function(){U(null)};return R.addEventListener("mousemove",k),R.addEventListener("mouseleave",N),B.current=requestAnimationFrame(F),function(){window.removeEventListener("resize",L),cancelAnimationFrame(B.current),R.removeEventListener("mousemove",k),R.removeEventListener("mouseleave",N)}}},[u,a,c,_,T,l]),t.default.createElement("canvas",{ref:y,className:d.default.squaresCanvas})},h=r.default=g},25635:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=o(e(71508)),t=e(21126),d=function(h){var v=h.textLeft,p=v===void 0?"":v,i=h.textRight,u=i===void 0?"":i,n=h.className,a=n===void 0?"":n,s={hidden:{opacity:0,x:"-100vw"},visible:{opacity:1,x:"0"},right:{opacity:0,x:"100vw"}};return A.default.createElement("div",{className:(0,m.default)("flex justify-center overflow-hidden",a)},A.default.createElement(t.motion.section,{initial:"hidden",animate:"visible",variants:s,transition:{duration:2}},p),A.default.createElement(t.motion.section,{initial:"right",animate:"visible",variants:s,transition:{duration:1}},u))},C=r.default=d},26718:function(x,r,e){"use strict";x.exports=e.p+"images/916ddb5adf113a8dd7a3.png"},26860:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(37255),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},27024:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=d(e(96540)),t=o(e(71508));function d(h,v){if(typeof WeakMap=="function")var p=new WeakMap,i=new WeakMap;return(d=function(n,a){if(!a&&n&&n.__esModule)return n;var s,c,E={__proto__:null,default:n};if(n===null||A(n)!="object"&&typeof n!="function")return E;if(s=a?i:p){if(s.has(n))return s.get(n);s.set(n,E)}for(var l in n)l!=="default"&&{}.hasOwnProperty.call(n,l)&&((c=(s=Object.defineProperty)&&Object.getOwnPropertyDescriptor(n,l))&&(c.get||c.set)?s(E,l,c):E[l]=n[l]);return E})(h,v)}var C=function(v){var p=v.number,i=v.title,u=v.content,n=v.isOpen,a=v.loadingWidthPercent;return m.default.createElement("div",{className:(0,t.default)("transform-gpu rounded-lg border transition-all",n?"border-neutral-500/10 bg-linear-to-b from-neutral-200/15 to-neutral-200/5 dark:border-neutral-500/15 dark:from-neutral-600/15 dark:to-neutral-600/5 dark:shadow-[2px_4px_25px_0px_rgba(248,248,248,0.06)_inset]":"scale-90 border-transparent opacity-50 saturate-0")},m.default.createElement("div",{className:"flex w-full items-center gap-4 p-4"},m.default.createElement("p",{className:(0,t.default)("inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-neutral-500/20 text-neutral-600")},p),m.default.createElement("h2",{className:(0,t.default)("text-left text-xl font-medium text-neutral-800 dark:text-neutral-200")},i)),m.default.createElement("div",{className:(0,t.default)("w-full transform-gpu overflow-hidden text-left text-neutral-600 transition-all duration-500 dark:text-neutral-400",n?"max-h-64":"max-h-0")},m.default.createElement("p",{className:"p-4 text-lg"},u),m.default.createElement("div",{className:"w-full px-4 pb-4"},m.default.createElement("div",{className:"relative h-1 w-full overflow-hidden rounded-full"},m.default.createElement("div",{className:(0,t.default)("absolute top-0 left-0 h-1 bg-neutral-500"),style:{width:"".concat(a,"%")}})))))},g=r.default=C},27488:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=C(e(96540)),d=e(21126);function C(v,p){if(typeof WeakMap=="function")var i=new WeakMap,u=new WeakMap;return(C=function(a,s){if(!s&&a&&a.__esModule)return a;var c,E,l={__proto__:null,default:a};if(a===null||A(a)!="object"&&typeof a!="function")return l;if(c=s?u:i){if(c.has(a))return c.get(a);c.set(a,l)}for(var f in a)f!=="default"&&{}.hasOwnProperty.call(a,f)&&((E=(c=Object.defineProperty)&&Object.getOwnPropertyDescriptor(a,f))&&(E.get||E.set)?c(l,f,E):l[f]=a[f]);return l})(v,p)}var g=function(p){var i=p.text,u=i===void 0?[]:i,n=(0,t.useState)(0),a=(0,m.default)(n,2),s=a[0],c=a[1],E=(0,t.useMemo)(function(){return u},[]);return(0,t.useEffect)(function(){var l=setTimeout(function(){s===E.length-1?c(0):c(s+1)},2e3);return function(){return clearTimeout(l)}},[s,E]),t.default.createElement("span",{className:"relative overflow-hidden pl-4 text-center"},E.map(function(l,f){return t.default.createElement(d.motion.span,{key:f,className:"absolute font-semibold",initial:{opacity:0,y:-100},transition:{type:"spring",stiffness:50},animate:s===f?{y:0,opacity:1}:{y:s>f?-150:150,opacity:0}},l)}))},h=r.default=g},29492:function(x,r,e){"use strict";x.exports=e.p+"images/f5fb3175e80af3f631cc.png"},29777:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(85715)),m=o(e(96540)),t=e(21126),d=function(h){var v=h.text,p=["rgb(131, 179, 32)","rgb(47, 195, 106)","rgb(42, 169, 210)","rgb(4, 112, 202)","rgb(107, 10, 255)","rgb(183, 0, 218)","rgb(218, 0, 171)","rgb(230, 64, 92)","rgb(232, 98, 63)","rgb(249, 129, 47)"],i=m.default.useState(p),u=(0,A.default)(i,2),n=u[0],a=u[1],s=m.default.useState(0),c=(0,A.default)(s,2),E=c[0],l=c[1];return m.default.useEffect(function(){var f=setInterval(function(){var _=[].concat(p).sort(function(){return Math.random()-.5});a(_),l(function(y){return y+1})},5e3);return function(){return clearInterval(f)}},[]),v.split("").map(function(f,_){return m.default.createElement(t.motion.span,{key:"".concat(f,"-").concat(E,"-").concat(_),initial:{y:0},animate:{color:n[_%n.length],y:[0,-3,0],scale:[1,1.01,1],filter:["blur(0px)","blur(5px)","blur(0px)"],opacity:[1,.8,1]},transition:{duration:.5,delay:_*.05},className:"inline-block font-sans tracking-tight"},f)})},C=r.default=d},32765:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=o(e(99725)),t=o(e(93018)),d=o(e(97361)),C=o(e(59651)),g=o(e(84265)),h=o(e(94624)),v=o(e(14726)),p=[{size:"md",type:"outline",icon:null},{size:"lg",type:"fill",icon:A.default.createElement(m.default,null)},{size:"sm",type:"outline",icon:null},{size:"lg",type:"outline",icon:A.default.createElement(t.default,null)},{size:"md",type:"outline",icon:null},{size:"md",type:"fill",icon:A.default.createElement(h.default,null)},{size:"sm",type:"outline",icon:null},{size:"md",type:"outline",icon:null},{size:"sm",type:"outline",icon:null},{size:"lg",type:"outline",icon:A.default.createElement(d.default,null)},{size:"md",type:"fill",icon:null},{size:"md",type:"outline",icon:null},{size:"md",type:"outline",icon:null},{size:"sm",type:"fill",icon:A.default.createElement(v.default,null)},{size:"sm",type:"fill",icon:null},{size:"md",type:"outline",icon:null},{size:"lg",type:"fill",icon:A.default.createElement(g.default,null)},{size:"sm",type:"outline",icon:null},{size:"sm",type:"outline",icon:null},{size:"md",type:"fill",icon:A.default.createElement(C.default,null)},{size:"sm",type:"outline",icon:null},{size:"sm",type:"outline",icon:null}],i=r.default=p},33005:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(94054),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},35861:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(64928),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},36176:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.markdownBody--xUrgB {\r
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
`],sourceRoot:""}]),d.locals={markdownBody:"markdownBody--xUrgB",loadingIcon:"loadingIcon--VpAmv",copySection:"copySection--aJHtb",lang:"lang--SO0lS",copySpan:"copySpan--u4qzC",preCode:"preCode--s6faO"},r.A=d},37070:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(85715)),m=o(e(96540)),t=o(e(44782)),d=o(e(23259)),C=o(e(17881)),g=[398.43,-3243.5,1435237],h=function(){var i=(0,d.default)(g),u=(0,A.default)(i,2),n=u[0],a=u[1];return(0,C.default)(a),m.default.createElement(t.default,{value:n,trend:0})},v=r.default=h},37255:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.mask--LIqkO {\r
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
`],sourceRoot:""}]),d.locals={mask:"mask--LIqkO"},r.A=d},38913:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(83386),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},39751:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(94634)),m=o(e(85715)),t=o(e(96540)),d=e(77450),C=o(e(63859)),g=e(10252),h=o(e(2724)),v=function(u){var n=u.preCode,a=(0,C.default)(),s=(0,m.default)(a,2),c=s[0],E=s[1],l=function(){c(n)};return t.default.createElement("div",{className:"rounded-md bg-cyan-800 text-zinc-50"},t.default.createElement("header",{className:"grid grid-cols-6 items-center gap-3 px-4 py-3"},t.default.createElement("div",{className:"flex gap-1.5"},t.default.createElement("div",{className:"h-3 w-3 rounded-full bg-red-500"}),t.default.createElement("div",{className:"h-3 w-3 rounded-full bg-yellow-500"}),t.default.createElement("div",{className:"h-3 w-3 rounded-full bg-green-500"})),t.default.createElement("div",{className:"col-span-4 flex justify-center"},t.default.createElement("div",{className:"bg-transparent text-center text-sm font-medium text-gray-400 focus:outline-hidden"},"Untitled"))),t.default.createElement("div",{className:"relative px-4 pb-4"},t.default.createElement("div",{className:"absolute top-2 right-5 size-4 text-gray-400"},(E==null?void 0:E.state)==="success"?t.default.createElement(g.CheckCircleTwoTone,{className:"size-4 text-base",twoToneColor:"#52c41a"}):t.default.createElement(g.CopyOutlined,{className:"size-4 text-base",onClick:l})),t.default.createElement(d.Highlight,{theme:d.themes.dracula,className:h.default.wrapper,code:n==null?void 0:n.trim(),language:"jsx"},function(f){var _=f.style,y=f.tokens,B=f.getLineProps,O=f.getTokenProps;return t.default.createElement("pre",{className:h.default.pre,style:_},y.map(function(D,M){return t.default.createElement("div",(0,A.default)({className:h.default.line,key:M},B({line:D})),t.default.createElement("span",{className:h.default["line-no"]},M+1),D.map(function(P,I){return t.default.createElement("span",(0,A.default)({key:I},O({token:P})))}))}))})))},p=r.default=v},40999:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(43346),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},41854:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=g(e(96540)),d=e(21126),C=o(e(71508));function g(p,i){if(typeof WeakMap=="function")var u=new WeakMap,n=new WeakMap;return(g=function(s,c){if(!c&&s&&s.__esModule)return s;var E,l,f={__proto__:null,default:s};if(s===null||A(s)!="object"&&typeof s!="function")return f;if(E=c?n:u){if(E.has(s))return E.get(s);E.set(s,f)}for(var _ in s)_!=="default"&&{}.hasOwnProperty.call(s,_)&&((l=(E=Object.defineProperty)&&Object.getOwnPropertyDescriptor(s,_))&&(l.get||l.set)?E(f,_,l):f[_]=s[_]);return f})(p,i)}var h=function(i){var u=i.words,n=i.duration,a=n===void 0?3e3:n,s=i.className,c=(0,t.useState)(u[0]),E=(0,m.default)(c,2),l=E[0],f=E[1],_=(0,t.useState)(!1),y=(0,m.default)(_,2),B=y[0],O=y[1],D=(0,t.useCallback)(function(){var M=u[u.indexOf(l)+1]||u[0];f(M),O(!0)},[l,u]);return(0,t.useEffect)(function(){B||setTimeout(function(){D()},a)},[B,a,D]),t.default.createElement(d.AnimatePresence,{onExitComplete:function(){O(!1)}},t.default.createElement(d.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:100,damping:10},exit:{opacity:0,y:-40,x:40,filter:"blur(8px)",scale:2,position:"absolute"},className:(0,C.default)("relative z-10 inline-block px-2 text-left text-neutral-900 dark:text-neutral-100",s),key:l},l.split(" ").map(function(M,P){return t.default.createElement(d.motion.span,{key:M+P,initial:{opacity:0,y:10,filter:"blur(8px)"},animate:{opacity:1,y:0,filter:"blur(0px)"},transition:{delay:P*.3,duration:.3},className:"inline-block whitespace-nowrap"},M.split("").map(function(I,T){return t.default.createElement(d.motion.span,{key:M+T,initial:{opacity:0,y:10,filter:"blur(8px)"},animate:{opacity:1,y:0,filter:"blur(0px)"},transition:{delay:P*.3+T*.05,duration:.2},className:"inline-block"},I)}),t.default.createElement("span",{className:"inline-block"},"\xA0"))})))},v=r.default=h},42101:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.warpper--lLZe7 {\r
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
`],sourceRoot:""}]),d.locals={warpper:"warpper--lLZe7",pre:"pre--MB0A4","token-line":"token-line--ZnLJw",tokenLine:"token-line--ZnLJw",line:"line--aPWRo","line-no":"line-no--Rk8t7",lineNo:"line-no--Rk8t7"},r.A=d},42634:function(){},43259:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(36176),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},43346:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=e(4417),C=e.n(d),g=new URL(e(44148),e.b),h=t()(A()),v=C()(g);h.push([x.id,`.avatar--tAk6h {\r
  animation: levitate--RZCwS 10s ease 1s infinite reverse;\r
}\r
\r
@keyframes levitate--RZCwS {\r
  0% {\r
    transform: translateY(0);\r
  }\r
\r
  30% {\r
    transform: translateY(-10px);\r
  }\r
\r
  50% {\r
    transform: translateY(4px);\r
  }\r
\r
  70% {\r
    transform: translateY(-15px);\r
  }\r
\r
  100% {\r
    transform: translateY(0);\r
  }\r
}\r
\r
.maskBox--uAYjJ {\r
  width: 100px;\r
  height: 40px;\r
  background: darkcyan;\r
  text-align: center;\r
  line-height: 40px;\r
  color: #fff;\r
  font-size: 18px;\r
  position: relative;\r
  -webkit-mask: radial-gradient(8px at 10px 10px, transparent 98%, black) -10px -10px;\r
          mask: radial-gradient(8px at 10px 10px, transparent 98%, black) -10px -10px;\r
}\r
\r
.watermark--YUolT {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
  font-size: 18px;\r
  color: rgb(0 0 0 / 20%);\r
  white-space: nowrap;\r
  pointer-events: none;\r
}\r
\r
.blend-me--f5L11 {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
  color: #fff;\r
  text-align: center;\r
  font-size: 18px;\r
  font-weight: bold;\r
  mix-blend-mode: overlay;\r
  transition: 0.3s cubic-bezier(0.25, 0.25, 0.33, 1.33);\r
  animation: move-me--FUPwc 8s ease-out infinite alternate;\r
}\r
\r
@keyframes move-me--FUPwc {\r
  to {\r
    transform: translateY(50px);\r
  }\r
}\r
\r
.button--GgsIa {\r
  background: transparent;\r
  padding: 0.5rem 1rem;\r
  background-image:\r
    linear-gradient(90deg, white, white), linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));\r
  background-clip: padding-box, border-box;\r
  background-origin: border-box;\r
  border: 5px solid transparent;\r
  border-radius: 1.75rem;\r
}\r
\r
.button-label--d_jxl {\r
  background-image: linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));\r
  -webkit-background-clip: text;\r
          background-clip: text;\r
  color: transparent;\r
  font-weight: 600;\r
  font-size: 1.25rem;\r
  line-height: 1.5rem;\r
}\r
\r
.circle-1--kJj6k {\r
  position: absolute;\r
  width: 20px;\r
  height: 20px;\r
  border-radius: 50%;\r
  top: calc(-10px);\r
  left: calc(-10px);\r
  animation: expand--kmoUS 6s ease-out infinite both;\r
  animation-play-state: running;\r
  animation-delay: 1s;\r
  border: 1.5px solid rgb(121 40 202 / 40%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 40%) 40%, #000 100%);\r
}\r
\r
.circle-2--YMeVl {\r
  position: absolute;\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 50%;\r
  top: calc(-20px);\r
  left: calc(-20px);\r
  animation: expand-opacity--XzitQ 6s linear infinite both;\r
  animation-play-state: running;\r
  animation-delay: 0.5s;\r
  border: 1px solid rgb(121 40 202 / 40%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 30%) 20%, #000 100%);\r
}\r
\r
.circle-3--DvCUJ {\r
  position: absolute;\r
  width: 60px;\r
  height: 60px;\r
  border-radius: 50%;\r
  top: calc(-30px);\r
  left: calc(-30px);\r
  animation: expand-opacity--XzitQ 6s linear infinite both;\r
  animation-play-state: running;\r
  animation-delay: 1s;\r
  border: 1px solid rgb(121 40 202 / 30%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 20%) 20%, #000 100%);\r
}\r
\r
.circle-4--UkUyn {\r
  position: absolute;\r
  width: 80px;\r
  height: 80px;\r
  border-radius: 50%;\r
  top: calc(-40px);\r
  left: calc(-40px);\r
  animation: expand-opacity--XzitQ 6s linear infinite both;\r
  animation-play-state: running;\r
  animation-delay: 1.5s;\r
  border: 1px solid rgb(121 40 202 / 20%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 10%) 20%, #000 100%);\r
}\r
\r
@keyframes expand--kmoUS {\r
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
@keyframes expand-opacity--XzitQ {\r
  0% {\r
    opacity: 0;\r
    transform: scale(1);\r
  }\r
\r
  50% {\r
    opacity: 1;\r
    transform: scale(1.3);\r
  }\r
\r
  100% {\r
    opacity: 0;\r
    transform: scale(1.295);\r
  }\r
}\r
\r
.eHElAY--ul0hZ {\r
  cursor: pointer;\r
  display: inline-block;\r
  margin-bottom: 1rem;\r
  font-size: 1.1rem;\r
  height: 2.8rem;\r
  letter-spacing: 0.1rem;\r
  line-height: 2.8rem;\r
  padding: 0 1.8rem;\r
  text-align: center;\r
  text-decoration: none;\r
  white-space: nowrap;\r
  position: relative;\r
  z-index: 0;\r
  color: rgb(255 255 255);\r
  border-color: transparent;\r
\r
  &::before {\r
    content: '';\r
    position: absolute;\r
    top: -2px;\r
    left: -2px;\r
    z-index: -1;\r
    filter: blur(5px);\r
    width: calc(100% + 4px);\r
    height: calc(100% + 4px);\r
    animation-timeline: auto;\r
    animation-range-start: normal;\r
    animation-range-end: normal;\r
    opacity: 1;\r
    background: linear-gradient(\r
        45deg,\r
        rgb(255 0 0),\r
        rgb(255 115 0),\r
        rgb(255 251 0),\r
        rgb(72 255 0),\r
        rgb(0 255 213),\r
        rgb(0 43 255),\r
        rgb(122 0 255),\r
        rgb(255 0 200),\r
        rgb(255 0 0)\r
      )\r
      0% 0% / 400%;\r
    animation: 20s linear 0s infinite normal none running dv-wu--sf_Ta;\r
    transition: opacity 0.3s ease-in-out;\r
  }\r
\r
  &::after {\r
    z-index: -1;\r
    content: '';\r
    position: absolute;\r
    width: 100%;\r
    height: 100%;\r
    background: rgb(17 17 17);\r
    left: 0;\r
    top: 0;\r
  }\r
}\r
\r
@keyframes dv-wu--sf_Ta {\r
  0% {\r
    background-position: 0 0;\r
  }\r
\r
  50% {\r
    background-position: 400% 0;\r
  }\r
\r
  100% {\r
    background-position: 0 0;\r
  }\r
}\r
\r
.stages--wh47k {\r
  position: relative;\r
  height: 74px;\r
\r
  .cubeSpinner--eOJc0 {\r
    color: #42745a;\r
    animation-name: spin-cube--eXtsy;\r
    animation-timing-function: ease-in-out;\r
    animation-iteration-count: infinite;\r
    animation-duration: 8s;\r
    transform-style: preserve-3d;\r
    transform-origin: 40px 40px 0;\r
    line-height: 1.3em;\r
    font-size: 64px;\r
\r
    span {\r
      position: absolute;\r
      width: 100%;\r
      -webkit-backface-visibility: hidden;\r
              backface-visibility: hidden;\r
    }\r
\r
    .face1--KIPp1 {\r
      transform: translateZ(40px);\r
    }\r
\r
    .face2--aYKpi {\r
      transform: rotateX(240deg) translateZ(40px);\r
    }\r
\r
    .face3--M7CTV {\r
      transform: rotateX(120deg) translateZ(40px);\r
    }\r
  }\r
}\r
\r
@keyframes spin-cube--eXtsy {\r
  0% {\r
    transform: rotateX(0deg);\r
  }\r
\r
  15% {\r
    transform: rotateX(0deg);\r
  }\r
\r
  25% {\r
    transform: rotateX(120deg);\r
  }\r
\r
  40% {\r
    transform: rotateX(120deg);\r
  }\r
\r
  50% {\r
    transform: rotateX(240deg);\r
  }\r
\r
  65% {\r
    transform: rotateX(240deg);\r
  }\r
\r
  75% {\r
    transform: rotateX(240deg);\r
  }\r
\r
  90% {\r
    transform: rotateX(1turn);\r
  }\r
\r
  100% {\r
    transform: rotateX(1turn);\r
  }\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz {\r
  box-shadow: 0 6px 10px rgb(0 0 0 / 20%);\r
  position: relative;\r
  display: inline-block;\r
  transform: translateY(-50%);\r
  width: 40px;\r
  height: 40px;\r
  line-height: 40px;\r
  text-align: center;\r
  background-color: #1d5fca;\r
  border-radius: 50%;\r
  color: #fff;\r
  font-size: 20px;\r
  z-index: 1;\r
  margin-left: auto;\r
  margin-right: auto;\r
  cursor: pointer;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz::after,\r
.video-box--RWlhc .video-btn--PPzlz::before {\r
  content: '';\r
  display: block;\r
  position: absolute;\r
  inset: 0;\r
  z-index: -1;\r
  border-radius: 50%;\r
  border: 1px solid #1d5fca;\r
  transition: 0.5s;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz i {\r
  z-index: 1;\r
  margin-left: auto;\r
  margin-right: auto;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz::before {\r
  animation: ripple--Ojifa 2s linear infinite;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz::after {\r
  animation: ripple--Ojifa 2s linear 1s infinite;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz:focus,\r
.video-box--RWlhc .video-btn--PPzlz:hover {\r
  background-color: #2d995d;\r
  color: #fff;\r
}\r
\r
.video-box--RWlhc .video-btn--PPzlz:focus::after,\r
.video-box--RWlhc .video-btn--PPzlz:focus::before,\r
.video-box--RWlhc .video-btn--PPzlz:hover::after,\r
.video-box--RWlhc .video-btn--PPzlz:hover::before {\r
  border-color: #2d995d;\r
}\r
\r
@keyframes ripple--Ojifa {\r
  0% {\r
    transform: scale(1);\r
  }\r
\r
  75% {\r
    transform: scale(1.75);\r
    opacity: 1;\r
  }\r
\r
  100% {\r
    transform: scale(2);\r
    opacity: 0;\r
  }\r
}\r
\r
@keyframes effect-1--LXEum {\r
  0% {\r
    text-shadow: 0 0 #32a8a2;\r
  }\r
\r
  40% {\r
    text-shadow: 2px 2px 5px #32a8a2;\r
  }\r
\r
  100% {\r
    text-shadow: 0 0 #32a8a2;\r
  }\r
}\r
\r
.effect--mKRM4 {\r
  animation: effect-1--LXEum 1s linear infinite;\r
  color: white;\r
  font-size: 48px;\r
}\r
\r
.dotMask--sy6CL {\r
  position: absolute;\r
  inset: 0;\r
  height: 100%;\r
  width: 100%;\r
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);\r
  background-size: 16px 16px;\r
  -webkit-mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%);\r
          mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%);\r
}\r
\r
.dot--jqRVx {\r
  position: absolute;\r
  inset: 0;\r
  height: 100%;\r
  width: 100%;\r
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);\r
  background-size: 16px 16px;\r
}\r
\r
.grid--UCn5k {\r
  position: absolute;\r
  inset: 0;\r
  height: 100%;\r
  width: 100%;\r
  background-image:\r
    linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(#80808012 1px, transparent 1px);\r
  background-size: 24px 24px;\r
}\r
\r
.box--kP2q7 {\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  padding: 12px;\r
  border: 3px solid #85858500;\r
  border-radius: 12px;\r
  background:\r
    linear-gradient(#515153, #3a374a) padding-box,\r
    linear-gradient(var(--angle), #777676, rgb(81 174 132)) border-box;\r
  animation: 10s rotate--r6Mu6 linear infinite;\r
}\r
\r
@keyframes rotate--r6Mu6 {\r
  to {\r
    --angle: 360deg;\r
  }\r
}\r
\r
@property --angle {\r
  syntax: '<angle>';\r
  initial-value: 0deg;\r
  inherits: false;\r
}\r
\r
.circledHighlight--R41qx {\r
  position: relative;\r
  z-index: 1;\r
  padding: 5px;\r
  margin: 0 15px;\r
}\r
\r
.circledHighlight--R41qx::before,\r
.circledHighlight--R41qx::after {\r
  content: '';\r
  width: 120%;\r
  height: 100%;\r
  position: absolute;\r
  top: 5%;\r
  left: -10%;\r
  z-index: -1;\r
  border-radius: 80%;\r
  box-sizing: border-box;\r
}\r
\r
.circledHighlight--R41qx::before {\r
  border: 2px solid #06251b;\r
  transform: rotate(-4deg);\r
}\r
\r
.circledHighlight--R41qx::after {\r
  border: 1px solid #63d9b3;\r
  transform: rotate(6deg);\r
}\r
\r
.article--KGMY1::after {\r
  background-image: linear-gradient(45deg, #6366f1, #4f46e5, #7e22ce);\r
  bottom: -11px;\r
  content: '';\r
  height: 13px;\r
  left: 0;\r
  -webkit-mask-image: url(`+v+`);\r
          mask-image: url(`+v+`);\r
  -webkit-mask-size: cover;\r
          mask-size: cover;\r
  position: absolute;\r
  width: 100%;\r
}\r
\r
.line--Lp5NS {\r
  margin: 30px 0;\r
  height: 2px;\r
  width: 360px;\r
  background-image: linear-gradient(97deg, #0096ff, #bb64ff 42%, #f2416b 74%, #eb7500);\r
}\r
\r
.linear--OuChC {\r
  margin: 30px 0;\r
  height: 2px;\r
  width: 360px;\r
  background: linear-gradient(\r
    90deg,\r
    rgb(94 223 69 / 0%) 0%,\r
    rgb(202 23 23 / 20%) 23.02%,\r
    rgb(40 11 202 / 67%) 40.41%,\r
    rgb(7 224 18 / 20%) 80.93%,\r
    rgb(99 15 15 / 0%) 95.93%\r
  );\r
}\r
\r
/* shift + alt +a\r
backdrop-filter\r
object-fit: cover;\r
object-position: 0 0;\r
isolation: isolate;\r
z-index: 1;\r
 */\r
\r
.itemCircle--FMoRE {\r
  width: 13px;\r
  height: 13px;\r
  border-radius: 50%;\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  position: absolute;\r
  top: 10px;\r
  left: 10px;\r
  background-color: #2d995d;\r
}\r
\r
.itemCircleTail--XuNyZ {\r
  width: 13px;\r
  height: 13px;\r
  border-radius: 50%;\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  position: absolute;\r
  top: 10px;\r
  right: 10px;\r
  background-color: #d335be;\r
}\r
\r
.itemCircleTail--XuNyZ::before,\r
.itemCircle--FMoRE::before {\r
  content: '';\r
  position: absolute;\r
  width: 25px;\r
  height: 25px;\r
  opacity: 0.3;\r
  border-radius: 50%;\r
  background-color: inherit;\r
  animation: time-circle-pulse--Oa9Sv 3s infinite;\r
}\r
\r
@keyframes time-circle-pulse--Oa9Sv {\r
  0% {\r
    transform: scale(0.5);\r
    opacity: 0;\r
  }\r
\r
  50% {\r
    transform: scale(1);\r
    opacity: 0.4;\r
  }\r
\r
  85% {\r
    transform: scale(1);\r
    opacity: 0;\r
  }\r
\r
  100% {\r
    transform: scale(0.5);\r
    opacity: 0;\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/pages/home/index.module.less"],names:[],mappings:"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",sourcesContent:[`.avatar {\r
  animation: levitate 10s ease 1s infinite reverse;\r
}\r
\r
@keyframes levitate {\r
  0% {\r
    transform: translateY(0);\r
  }\r
\r
  30% {\r
    transform: translateY(-10px);\r
  }\r
\r
  50% {\r
    transform: translateY(4px);\r
  }\r
\r
  70% {\r
    transform: translateY(-15px);\r
  }\r
\r
  100% {\r
    transform: translateY(0);\r
  }\r
}\r
\r
.maskBox {\r
  width: 100px;\r
  height: 40px;\r
  background: darkcyan;\r
  text-align: center;\r
  line-height: 40px;\r
  color: #fff;\r
  font-size: 18px;\r
  position: relative;\r
  mask: radial-gradient(8px at 10px 10px, transparent 98%, black) -10px -10px;\r
}\r
\r
.watermark {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
  font-size: 18px;\r
  color: rgb(0 0 0 / 20%);\r
  white-space: nowrap;\r
  pointer-events: none;\r
}\r
\r
.blend-me {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
  color: #fff;\r
  text-align: center;\r
  font-size: 18px;\r
  font-weight: bold;\r
  mix-blend-mode: overlay;\r
  transition: 0.3s cubic-bezier(0.25, 0.25, 0.33, 1.33);\r
  animation: move-me 8s ease-out infinite alternate;\r
}\r
\r
@keyframes move-me {\r
  to {\r
    transform: translateY(50px);\r
  }\r
}\r
\r
.button {\r
  background: transparent;\r
  padding: 0.5rem 1rem;\r
  background-image:\r
    linear-gradient(90deg, white, white), linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));\r
  background-clip: padding-box, border-box;\r
  background-origin: border-box;\r
  border: 5px solid transparent;\r
  border-radius: 1.75rem;\r
}\r
\r
.button-label {\r
  background-image: linear-gradient(90deg, hsl(289deg 65% 64%), hsl(226deg 78% 67%));\r
  background-clip: text;\r
  color: transparent;\r
  font-weight: 600;\r
  font-size: 1.25rem;\r
  line-height: 1.5rem;\r
}\r
\r
.circle-1 {\r
  position: absolute;\r
  width: 20px;\r
  height: 20px;\r
  border-radius: 50%;\r
  top: calc(-10px);\r
  left: calc(-10px);\r
  animation: expand 6s ease-out infinite both;\r
  animation-play-state: running;\r
  animation-delay: 1s;\r
  border: 1.5px solid rgb(121 40 202 / 40%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 40%) 40%, #000 100%);\r
}\r
\r
.circle-2 {\r
  position: absolute;\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 50%;\r
  top: calc(-20px);\r
  left: calc(-20px);\r
  animation: expand-opacity 6s linear infinite both;\r
  animation-play-state: running;\r
  animation-delay: 0.5s;\r
  border: 1px solid rgb(121 40 202 / 40%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 30%) 20%, #000 100%);\r
}\r
\r
.circle-3 {\r
  position: absolute;\r
  width: 60px;\r
  height: 60px;\r
  border-radius: 50%;\r
  top: calc(-30px);\r
  left: calc(-30px);\r
  animation: expand-opacity 6s linear infinite both;\r
  animation-play-state: running;\r
  animation-delay: 1s;\r
  border: 1px solid rgb(121 40 202 / 30%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 20%) 20%, #000 100%);\r
}\r
\r
.circle-4 {\r
  position: absolute;\r
  width: 80px;\r
  height: 80px;\r
  border-radius: 50%;\r
  top: calc(-40px);\r
  left: calc(-40px);\r
  animation: expand-opacity 6s linear infinite both;\r
  animation-play-state: running;\r
  animation-delay: 1.5s;\r
  border: 1px solid rgb(121 40 202 / 20%);\r
  background: linear-gradient(-180deg, rgb(121 40 202 / 10%) 20%, #000 100%);\r
}\r
\r
@keyframes expand {\r
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
@keyframes expand-opacity {\r
  0% {\r
    opacity: 0;\r
    transform: scale(1);\r
  }\r
\r
  50% {\r
    opacity: 1;\r
    transform: scale(1.3);\r
  }\r
\r
  100% {\r
    opacity: 0;\r
    transform: scale(1.295);\r
  }\r
}\r
\r
.eHElAY {\r
  cursor: pointer;\r
  display: inline-block;\r
  margin-bottom: 1rem;\r
  font-size: 1.1rem;\r
  height: 2.8rem;\r
  letter-spacing: 0.1rem;\r
  line-height: 2.8rem;\r
  padding: 0 1.8rem;\r
  text-align: center;\r
  text-decoration: none;\r
  white-space: nowrap;\r
  position: relative;\r
  z-index: 0;\r
  color: rgb(255 255 255);\r
  border-color: transparent;\r
\r
  &::before {\r
    content: '';\r
    position: absolute;\r
    top: -2px;\r
    left: -2px;\r
    z-index: -1;\r
    filter: blur(5px);\r
    width: calc(100% + 4px);\r
    height: calc(100% + 4px);\r
    animation-timeline: auto;\r
    animation-range-start: normal;\r
    animation-range-end: normal;\r
    opacity: 1;\r
    background: linear-gradient(\r
        45deg,\r
        rgb(255 0 0),\r
        rgb(255 115 0),\r
        rgb(255 251 0),\r
        rgb(72 255 0),\r
        rgb(0 255 213),\r
        rgb(0 43 255),\r
        rgb(122 0 255),\r
        rgb(255 0 200),\r
        rgb(255 0 0)\r
      )\r
      0% 0% / 400%;\r
    animation: 20s linear 0s infinite normal none running dv-wu;\r
    transition: opacity 0.3s ease-in-out;\r
  }\r
\r
  &::after {\r
    z-index: -1;\r
    content: '';\r
    position: absolute;\r
    width: 100%;\r
    height: 100%;\r
    background: rgb(17 17 17);\r
    left: 0;\r
    top: 0;\r
  }\r
}\r
\r
@keyframes dv-wu {\r
  0% {\r
    background-position: 0 0;\r
  }\r
\r
  50% {\r
    background-position: 400% 0;\r
  }\r
\r
  100% {\r
    background-position: 0 0;\r
  }\r
}\r
\r
.stages {\r
  position: relative;\r
  height: 74px;\r
\r
  .cubeSpinner {\r
    color: #42745a;\r
    animation-name: spin-cube;\r
    animation-timing-function: ease-in-out;\r
    animation-iteration-count: infinite;\r
    animation-duration: 8s;\r
    transform-style: preserve-3d;\r
    transform-origin: 40px 40px 0;\r
    line-height: 1.3em;\r
    font-size: 64px;\r
\r
    span {\r
      position: absolute;\r
      width: 100%;\r
      backface-visibility: hidden;\r
    }\r
\r
    .face1 {\r
      transform: translateZ(40px);\r
    }\r
\r
    .face2 {\r
      transform: rotateX(240deg) translateZ(40px);\r
    }\r
\r
    .face3 {\r
      transform: rotateX(120deg) translateZ(40px);\r
    }\r
  }\r
}\r
\r
@keyframes spin-cube {\r
  0% {\r
    transform: rotateX(0deg);\r
  }\r
\r
  15% {\r
    transform: rotateX(0deg);\r
  }\r
\r
  25% {\r
    transform: rotateX(120deg);\r
  }\r
\r
  40% {\r
    transform: rotateX(120deg);\r
  }\r
\r
  50% {\r
    transform: rotateX(240deg);\r
  }\r
\r
  65% {\r
    transform: rotateX(240deg);\r
  }\r
\r
  75% {\r
    transform: rotateX(240deg);\r
  }\r
\r
  90% {\r
    transform: rotateX(1turn);\r
  }\r
\r
  100% {\r
    transform: rotateX(1turn);\r
  }\r
}\r
\r
.video-box .video-btn {\r
  box-shadow: 0 6px 10px rgb(0 0 0 / 20%);\r
  position: relative;\r
  display: inline-block;\r
  transform: translateY(-50%);\r
  width: 40px;\r
  height: 40px;\r
  line-height: 40px;\r
  text-align: center;\r
  background-color: #1d5fca;\r
  border-radius: 50%;\r
  color: #fff;\r
  font-size: 20px;\r
  z-index: 1;\r
  margin-left: auto;\r
  margin-right: auto;\r
  cursor: pointer;\r
}\r
\r
.video-box .video-btn::after,\r
.video-box .video-btn::before {\r
  content: '';\r
  display: block;\r
  position: absolute;\r
  inset: 0;\r
  z-index: -1;\r
  border-radius: 50%;\r
  border: 1px solid #1d5fca;\r
  transition: 0.5s;\r
}\r
\r
.video-box .video-btn i {\r
  z-index: 1;\r
  margin-left: auto;\r
  margin-right: auto;\r
}\r
\r
.video-box .video-btn::before {\r
  animation: ripple 2s linear infinite;\r
}\r
\r
.video-box .video-btn::after {\r
  animation: ripple 2s linear 1s infinite;\r
}\r
\r
.video-box .video-btn:focus,\r
.video-box .video-btn:hover {\r
  background-color: #2d995d;\r
  color: #fff;\r
}\r
\r
.video-box .video-btn:focus::after,\r
.video-box .video-btn:focus::before,\r
.video-box .video-btn:hover::after,\r
.video-box .video-btn:hover::before {\r
  border-color: #2d995d;\r
}\r
\r
@keyframes ripple {\r
  0% {\r
    transform: scale(1);\r
  }\r
\r
  75% {\r
    transform: scale(1.75);\r
    opacity: 1;\r
  }\r
\r
  100% {\r
    transform: scale(2);\r
    opacity: 0;\r
  }\r
}\r
\r
@keyframes effect-1 {\r
  0% {\r
    text-shadow: 0 0 #32a8a2;\r
  }\r
\r
  40% {\r
    text-shadow: 2px 2px 5px #32a8a2;\r
  }\r
\r
  100% {\r
    text-shadow: 0 0 #32a8a2;\r
  }\r
}\r
\r
.effect {\r
  animation: effect-1 1s linear infinite;\r
  color: white;\r
  font-size: 48px;\r
}\r
\r
.dotMask {\r
  position: absolute;\r
  inset: 0;\r
  height: 100%;\r
  width: 100%;\r
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);\r
  background-size: 16px 16px;\r
  mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%);\r
}\r
\r
.dot {\r
  position: absolute;\r
  inset: 0;\r
  height: 100%;\r
  width: 100%;\r
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);\r
  background-size: 16px 16px;\r
}\r
\r
.grid {\r
  position: absolute;\r
  inset: 0;\r
  height: 100%;\r
  width: 100%;\r
  background-image:\r
    linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(#80808012 1px, transparent 1px);\r
  background-size: 24px 24px;\r
}\r
\r
.box {\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  padding: 12px;\r
  border: 3px solid #85858500;\r
  border-radius: 12px;\r
  background:\r
    linear-gradient(#515153, #3a374a) padding-box,\r
    linear-gradient(var(--angle), #777676, rgb(81 174 132)) border-box;\r
  animation: 10s rotate linear infinite;\r
}\r
\r
@keyframes rotate {\r
  to {\r
    --angle: 360deg;\r
  }\r
}\r
\r
@property --angle {\r
  syntax: '<angle>';\r
  initial-value: 0deg;\r
  inherits: false;\r
}\r
\r
.circledHighlight {\r
  position: relative;\r
  z-index: 1;\r
  padding: 5px;\r
  margin: 0 15px;\r
}\r
\r
.circledHighlight::before,\r
.circledHighlight::after {\r
  content: '';\r
  width: 120%;\r
  height: 100%;\r
  position: absolute;\r
  top: 5%;\r
  left: -10%;\r
  z-index: -1;\r
  border-radius: 80%;\r
  box-sizing: border-box;\r
}\r
\r
.circledHighlight::before {\r
  border: 2px solid #06251b;\r
  transform: rotate(-4deg);\r
}\r
\r
.circledHighlight::after {\r
  border: 1px solid #63d9b3;\r
  transform: rotate(6deg);\r
}\r
\r
.article::after {\r
  background-image: linear-gradient(45deg, #6366f1, #4f46e5, #7e22ce);\r
  bottom: -11px;\r
  content: '';\r
  height: 13px;\r
  left: 0;\r
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M0 5 Q 25 10, 50 5 T 100 5 T 150 5 T 200 5" stroke="white" stroke-width="2" fill="none"/></svg>');\r
  mask-size: cover;\r
  position: absolute;\r
  width: 100%;\r
}\r
\r
.line {\r
  margin: 30px 0;\r
  height: 2px;\r
  width: 360px;\r
  background-image: linear-gradient(97deg, #0096ff, #bb64ff 42%, #f2416b 74%, #eb7500);\r
}\r
\r
.linear {\r
  margin: 30px 0;\r
  height: 2px;\r
  width: 360px;\r
  background: linear-gradient(\r
    90deg,\r
    rgb(94 223 69 / 0%) 0%,\r
    rgb(202 23 23 / 20%) 23.02%,\r
    rgb(40 11 202 / 67%) 40.41%,\r
    rgb(7 224 18 / 20%) 80.93%,\r
    rgb(99 15 15 / 0%) 95.93%\r
  );\r
}\r
\r
/* shift + alt +a\r
backdrop-filter\r
object-fit: cover;\r
object-position: 0 0;\r
isolation: isolate;\r
z-index: 1;\r
 */\r
\r
.itemCircle {\r
  width: 13px;\r
  height: 13px;\r
  border-radius: 50%;\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  position: absolute;\r
  top: 10px;\r
  left: 10px;\r
  background-color: #2d995d;\r
}\r
\r
.itemCircleTail {\r
  width: 13px;\r
  height: 13px;\r
  border-radius: 50%;\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  position: absolute;\r
  top: 10px;\r
  right: 10px;\r
  background-color: #d335be;\r
}\r
\r
.itemCircleTail::before,\r
.itemCircle::before {\r
  content: '';\r
  position: absolute;\r
  width: 25px;\r
  height: 25px;\r
  opacity: 0.3;\r
  border-radius: 50%;\r
  background-color: inherit;\r
  animation: time-circle-pulse 3s infinite;\r
}\r
\r
@keyframes time-circle-pulse {\r
  0% {\r
    transform: scale(0.5);\r
    opacity: 0;\r
  }\r
\r
  50% {\r
    transform: scale(1);\r
    opacity: 0.4;\r
  }\r
\r
  85% {\r
    transform: scale(1);\r
    opacity: 0;\r
  }\r
\r
  100% {\r
    transform: scale(0.5);\r
    opacity: 0;\r
  }\r
}\r
`],sourceRoot:""}]),h.locals={avatar:"avatar--tAk6h",levitate:"levitate--RZCwS",maskBox:"maskBox--uAYjJ",watermark:"watermark--YUolT","blend-me":"blend-me--f5L11",blendMe:"blend-me--f5L11","move-me":"move-me--FUPwc",moveMe:"move-me--FUPwc",button:"button--GgsIa","button-label":"button-label--d_jxl",buttonLabel:"button-label--d_jxl","circle-1":"circle-1--kJj6k",circle1:"circle-1--kJj6k",expand:"expand--kmoUS","circle-2":"circle-2--YMeVl",circle2:"circle-2--YMeVl","expand-opacity":"expand-opacity--XzitQ",expandOpacity:"expand-opacity--XzitQ","circle-3":"circle-3--DvCUJ",circle3:"circle-3--DvCUJ","circle-4":"circle-4--UkUyn",circle4:"circle-4--UkUyn",eHElAY:"eHElAY--ul0hZ",eHElAy:"eHElAY--ul0hZ","dv-wu":"dv-wu--sf_Ta",dvWu:"dv-wu--sf_Ta",stages:"stages--wh47k","spin-cube":"spin-cube--eXtsy",spinCube:"spin-cube--eXtsy",cubeSpinner:"cubeSpinner--eOJc0",face1:"face1--KIPp1",face2:"face2--aYKpi",face3:"face3--M7CTV","video-box":"video-box--RWlhc",videoBox:"video-box--RWlhc","video-btn":"video-btn--PPzlz",videoBtn:"video-btn--PPzlz",ripple:"ripple--Ojifa",effect:"effect--mKRM4","effect-1":"effect-1--LXEum",effect1:"effect-1--LXEum",dotMask:"dotMask--sy6CL",dot:"dot--jqRVx",grid:"grid--UCn5k",box:"box--kP2q7",rotate:"rotate--r6Mu6",circledHighlight:"circledHighlight--R41qx",article:"article--KGMY1",line:"line--Lp5NS",linear:"linear--OuChC",itemCircle:"itemCircle--FMoRE",itemCircleTail:"itemCircleTail--XuNyZ","time-circle-pulse":"time-circle-pulse--Oa9Sv",timeCirclePulse:"time-circle-pulse--Oa9Sv"},r.A=h},44148:function(x){"use strict";x.exports='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M0 5 Q 25 10, 50 5 T 100 5 T 150 5 T 200 5" stroke="white" stroke-width="2" fill="none"/></svg>'},45490:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(79901),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},45843:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(15678),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},45931:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=C(e(96540)),t=o(e(71508)),d=e(21126);function C(v,p){if(typeof WeakMap=="function")var i=new WeakMap,u=new WeakMap;return(C=function(a,s){if(!s&&a&&a.__esModule)return a;var c,E,l={__proto__:null,default:a};if(a===null||A(a)!="object"&&typeof a!="function")return l;if(c=s?u:i){if(c.has(a))return c.get(a);c.set(a,l)}for(var f in a)f!=="default"&&{}.hasOwnProperty.call(a,f)&&((E=(c=Object.defineProperty)&&Object.getOwnPropertyDescriptor(a,f))&&(E.get||E.set)?c(l,f,E):l[f]=a[f]);return l})(v,p)}var g=function(p){var i=p.text,u=i===void 0?"":i,n=p.className,a=n===void 0?"":n,s={hidden:{opacity:0,x:-20},visible:{opacity:1,x:0}},c=(0,m.useRef)(null),E=(0,d.useInView)(c,{once:!0});return m.default.createElement("div",{ref:c,className:(0,t.default)("",a)},m.default.createElement(d.AnimatePresence,null,u.split("").map(function(l,f){return m.default.createElement(d.motion.span,{key:f,initial:"hidden",animate:E?"visible":"hidden",exit:"hidden",variants:s,transition:{duration:.5,delay:f*.1}},l===" "?m.default.createElement("span",null,"\xA0"):l)})))},h=r.default=g},48497:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.hoverRotate--ew29g {\r
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
  -webkit-backface-visibility: hidden;\r
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
`,"",{version:3,sources:["webpack://./src/components/stateless/LazyLoadImage/index.module.less"],names:[],mappings:"AAAA;EACE,gBAAgB;EAChB,sBAAsB;EACtB,WAAW;EACX,qBAAqB;EACrB,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,sBAAsB;EACtB,0BAA0B;AAC5B;;AAEA;;EAEE,kCAAkC;EAClC,uCAAuC;EACvC,0CAA0C;EAC1C,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,yBAAyB;EACzB,UAAU;EACV,UAAU;EACV,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;EACnB,mCAA2B;UAA3B,2BAA2B;EAC3B,oBAAoB;EACpB,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,4CAA4C;EAC5C,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,+BAA+B;EAC/B,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,kBAAkB;EAClB,UAAU;EACV,UAAU;EACV,sBAAsB;EACtB,eAAe;EACf,uBAAuB;EACvB,gBAAgB;EAChB,mBAAmB;EACnB,yBAAyB;AAC3B;;AAEA;;EAEE,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,UAAU;AACZ",sourcesContent:[`.hoverRotate {\r
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
`],sourceRoot:""}]),d.locals={hoverRotate:"hoverRotate--ew29g"},r.A=d},48632:function(x,r,e){"use strict";x.exports=e.p+"images/695c6a7e4d55286b3565.png"},49676:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(98689),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},51941:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(94634)),m=o(e(91847)),t=o(e(85715)),d=o(e(96540)),C=o(e(88462)),g=["children","onClick"],h=function(){var u=d.default.useState({x:-1,y:-1}),n=(0,t.default)(u,2),a=n[0],s=a.x,c=a.y,E=n[1],l=s!==-1&&c!==-1,f=function(y){var B=y.currentTarget.getBoundingClientRect(),O=B.left,D=B.top;E({x:y.clientX-O,y:y.clientY-D}),setTimeout(function(){E({x:-1,y:-1})},300)};return{x:s,y:c,handleRippleOnClick:f,isRippling:l}},v=function(u){var n=u.children,a=u.onClick,s=(0,m.default)(u,g),c=h(),E=c.x,l=c.y,f=c.handleRippleOnClick,_=c.isRippling,y=function(O){f(O),a&&a(O)};return d.default.createElement("button",(0,A.default)({type:"button",onClick:y,className:C.default.btn},s),d.default.createElement("span",{className:C.default.content},n),_&&d.default.createElement("div",{className:C.default["btn-ripple-container"]},d.default.createElement("span",{className:C.default["btn-ripple"],style:{left:E,top:l}})))},p=r.default=v},52577:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=e(4417),C=e.n(d),g=new URL(e(82547),e.b),h=t()(A()),v=C()(g);h.push([x.id,`a.squiggle--JQRWj {\r
  background-image: linear-gradient(to bottom, #0087ca 0%, #0087ca 100%);\r
  background-position: 0 100%;\r
  background-repeat: repeat-x;\r
  background-size: 1px 1px;\r
  color: inherit;\r
  text-decoration: none;\r
}\r
\r
a.squiggle--JQRWj:hover {\r
  background-image: url(`+v+`);\r
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
`],sourceRoot:""}]),h.locals={squiggle:"squiggle--JQRWj"},r.A=h},53179:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(11530),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},54134:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=i(e(96540)),d=o(e(71508)),C=o(e(27024)),g=o(e(29492)),h=o(e(26718)),v=o(e(48632)),p=o(e(17329));function i(s,c){if(typeof WeakMap=="function")var E=new WeakMap,l=new WeakMap;return(i=function(_,y){if(!y&&_&&_.__esModule)return _;var B,O,D={__proto__:null,default:_};if(_===null||A(_)!="object"&&typeof _!="function")return D;if(B=y?l:E){if(B.has(_))return B.get(_);B.set(_,D)}for(var M in _)M!=="default"&&{}.hasOwnProperty.call(_,M)&&((O=(B=Object.defineProperty)&&Object.getOwnPropertyDescriptor(_,M))&&(O.get||O.set)?B(D,M,O):D[M]=_[M]);return D})(s,c)}var u=[{title:"\u300A\u548F\u67F3\u300B\u2014\u2014 \u8D3A\u77E5\u7AE0",content:"\u78A7\u7389\u5986\u6210\u4E00\u6811\u9AD8\uFF0C\u4E07\u6761\u5782\u4E0B\u7EFF\u4E1D\u7EE6\u3002\u4E0D\u77E5\u7EC6\u53F6\u8C01\u88C1\u51FA\uFF0C\u4E8C\u6708\u6625\u98CE\u4F3C\u526A\u5200\u3002",srcImage:g.default},{title:"\u300A\u5C0F\u6C60\u300B\u2014\u2014 \u6768\u4E07\u91CC",content:"\u6CC9\u773C\u65E0\u58F0\u60DC\u7EC6\u6D41\uFF0C\u6811\u9634\u7167\u6C34\u7231\u6674\u67D4\u3002\u5C0F\u8377\u624D\u9732\u5C16\u5C16\u89D2\uFF0C\u65E9\u6709\u873B\u8713\u7ACB\u4E0A\u5934\u3002",srcImage:h.default},{title:"\u300A\u5C71\u5C45\u79CB\u669D\u300B\u2014\u2014 \u738B\u7EF4",content:"\u7A7A\u5C71\u65B0\u96E8\u540E\uFF0C\u5929\u6C14\u665A\u6765\u79CB\u3002\u660E\u6708\u677E\u95F4\u7167\uFF0C\u6E05\u6CC9\u77F3\u4E0A\u6D41\u3002",srcImage:v.default},{title:"\u300A\u9022\u96EA\u5BBF\u8299\u84C9\u5C71\u4E3B\u4EBA\u300B\u2014\u2014 \u5218\u957F\u537F",content:"\u65E5\u66AE\u82CD\u5C71\u8FDC\uFF0C\u5929\u5BD2\u767D\u5C4B\u8D2B\u3002\u67F4\u95E8\u95FB\u72AC\u5420\uFF0C\u98CE\u96EA\u591C\u5F52\u4EBA\u3002",srcImage:p.default}],n=function(){var c=(0,t.useState)(0),E=(0,m.default)(c,2),l=E[0],f=E[1],_=(0,t.useState)(0),y=(0,m.default)(_,2),B=y[0],O=y[1];return(0,t.useEffect)(function(){var D=setInterval(function(){O(function(M){return M+10})},10);return function(){return clearInterval(D)}},[]),(0,t.useEffect)(function(){B>1e4&&(f(function(D){return(D+1)%u.length}),O(0))},[B]),t.default.createElement("div",{className:"grid grid-cols-1 gap-4 rounded-sm border p-4 md:grid-cols-2"},t.default.createElement("div",{className:"space-y-6"},u.map(function(D,M){return t.default.createElement("button",{className:"w-full",key:D.title,onClick:function(){f(M),O(0)},type:"button"},t.default.createElement(C.default,{content:D.content,isOpen:l===M,loadingWidthPercent:l===M?B/100:0,number:M+1,title:D.title}))})),t.default.createElement("div",{className:"h-full"},t.default.createElement("div",{className:(0,d.default)("relative h-96 w-full overflow-hidden rounded-lg md:h-[500px]")},u.map(function(D,M){return t.default.createElement("img",{alt:D.title,className:(0,d.default)("absolute h-[500px] w-full transform-gpu rounded-lg object-cover transition-all duration-300",l===M?"scale-100":"scale-70",l>M?"translate-y-full":""),key:D.title,src:D.srcImage,style:{zIndex:u.length-M}})}))))},a=r.default=n},56127:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(43693)),t=C(e(96540)),d=e(21126);function C(v,p){if(typeof WeakMap=="function")var i=new WeakMap,u=new WeakMap;return(C=function(a,s){if(!s&&a&&a.__esModule)return a;var c,E,l={__proto__:null,default:a};if(a===null||A(a)!="object"&&typeof a!="function")return l;if(c=s?u:i){if(c.has(a))return c.get(a);c.set(a,l)}for(var f in a)f!=="default"&&{}.hasOwnProperty.call(a,f)&&((E=(c=Object.defineProperty)&&Object.getOwnPropertyDescriptor(a,f))&&(E.get||E.set)?c(l,f,E):l[f]=a[f]);return l})(v,p)}var g=function(p){var i=p.children,u=p.className,n=p.variant,a=p.duration,s=a===void 0?.4:a,c=p.delay,E=c===void 0?0:c,l=p.offset,f=l===void 0?6:l,_=p.direction,y=_===void 0?"down":_,B=p.inView,O=B===void 0?!1:B,D=p.inViewMargin,M=D===void 0?"-50px":D,P=p.blur,I=P===void 0?"6px":P,T=p.once,U=T===void 0?!1:T,R=(0,t.useRef)(null),w=(0,d.useInView)(R,{once:U,margin:M}),L=!O||w,z={hidden:(0,m.default)((0,m.default)((0,m.default)({},y==="left"||y==="right"?"x":"y",y==="right"||y==="down"?-f:f),"opacity",0),"filter","blur(".concat(I,")")),visible:(0,m.default)((0,m.default)((0,m.default)({},y==="left"||y==="right"?"x":"y",0),"opacity",1),"filter","blur(0px)")},F=n||z;return t.default.createElement(d.AnimatePresence,null,t.default.createElement(d.motion.div,{ref:R,initial:"hidden",animate:L?"visible":"hidden",exit:"hidden",variants:F,transition:{delay:.04+E,duration:s,ease:"easeOut"},className:u},i))},h=r.default=g},56320:function(x,r,e){"use strict";"use client";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=h(e(96540)),d=e(21126),C=e(97751),g=o(e(71508));function h(i,u){if(typeof WeakMap=="function")var n=new WeakMap,a=new WeakMap;return(h=function(c,E){if(!E&&c&&c.__esModule)return c;var l,f,_={__proto__:null,default:c};if(c===null||A(c)!="object"&&typeof c!="function")return _;if(l=E?a:n){if(l.has(c))return l.get(c);l.set(c,_)}for(var y in c)y!=="default"&&{}.hasOwnProperty.call(c,y)&&((f=(l=Object.defineProperty)&&Object.getOwnPropertyDescriptor(c,y))&&(f.get||f.set)?l(_,y,f):_[y]=c[y]);return _})(i,u)}var v=function(u){var n=u.firstImage,a=n===void 0?"":n,s=u.secondImage,c=s===void 0?"":s,E=u.className,l=u.firstImageClassName,f=u.secondImageClassname,_=u.initialSliderPercentage,y=_===void 0?50:_,B=u.slideMode,O=B===void 0?"hover":B,D=u.showHandlebar,M=D===void 0?!0:D,P=u.autoplay,I=P===void 0?!1:P,T=u.autoplayDuration,U=T===void 0?5e3:T,R=(0,t.useState)(y),w=(0,m.default)(R,2),L=w[0],z=w[1],F=(0,t.useState)(!1),k=(0,m.default)(F,2),N=k[0],V=k[1],X=(0,t.useRef)(null),$=(0,t.useState)(!1),Y=(0,m.default)($,2),re=Y[0],ue=Y[1],pe=(0,t.useRef)(null),Ae=(0,t.useCallback)(function(){if(I){var ve=Date.now(),Be=function(){var Ce=Date.now()-ve,xe=Ce%(U*2)/U,Ie=xe<=1?xe*100:(2-xe)*100;z(Ie),pe.current=setTimeout(Be,16)};Be()}},[I,U]),ye=(0,t.useCallback)(function(){pe.current&&(clearTimeout(pe.current),pe.current=null)},[]);(0,t.useEffect)(function(){return Ae(),function(){return ye()}},[Ae,ye]);function ne(){ue(!0),ye()}function G(){ue(!1),O==="hover"&&z(y),O==="drag"&&V(!1),Ae()}var ae=(0,t.useCallback)(function(ve){O==="drag"&&V(!0)},[O]),oe=(0,t.useCallback)(function(){O==="drag"&&V(!1)},[O]),q=(0,t.useCallback)(function(ve){if(X.current&&(O==="hover"||O==="drag"&&N)){var Be=X.current.getBoundingClientRect(),De=ve-Be.left,Ce=De/Be.width*100;requestAnimationFrame(function(){z(Math.max(0,Math.min(100,Ce)))})}},[O,N]),J=(0,t.useCallback)(function(ve){return ae(ve.clientX)},[ae]),de=(0,t.useCallback)(function(){return oe()},[oe]),ee=(0,t.useCallback)(function(ve){return q(ve.clientX)},[q]),me=(0,t.useCallback)(function(ve){I||ae(ve.touches[0].clientX)},[ae,I]),Ee=(0,t.useCallback)(function(){I||oe()},[oe,I]),Me=(0,t.useCallback)(function(ve){I||q(ve.touches[0].clientX)},[q,I]);return t.default.createElement("div",{ref:X,className:(0,g.default)("h-[160px] w-[360px] overflow-hidden",E),style:{position:"relative",cursor:O==="drag"?"grab":"col-resize"},onMouseMove:ee,onMouseLeave:G,onMouseEnter:ne,onMouseDown:J,onMouseUp:de,onTouchStart:me,onTouchEnd:Ee,onTouchMove:Me},t.default.createElement(d.AnimatePresence,{initial:!1},t.default.createElement(d.motion.div,{className:"absolute top-0 z-30 m-auto h-full w-px bg-linear-to-b from-transparent from-5% via-indigo-500 to-transparent to-95%",style:{left:"".concat(L,"%"),top:"0",zIndex:40},transition:{duration:0}},t.default.createElement("div",{className:"absolute top-1/2 left-0 z-20 h-full w-36 -translate-y-1/2 bg-linear-to-r from-indigo-400 via-transparent to-transparent [mask-image:radial-gradient(100px_at_left,white,transparent)] opacity-50"}),t.default.createElement("div",{className:"absolute top-1/2 left-0 z-10 h-1/2 w-10 -translate-y-1/2 bg-linear-to-r from-cyan-400 via-transparent to-transparent [mask-image:radial-gradient(50px_at_left,white,transparent)] opacity-100"}),t.default.createElement("div",{className:"absolute top-1/2 -right-10 h-3/4 w-10 -translate-y-1/2 [mask-image:radial-gradient(100px_at_left,white,transparent)]"}),M&&t.default.createElement("div",{className:"absolute top-1/2 -right-2.5 z-30 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-md bg-white shadow-[0px_-1px_0px_0px_#FFFFFF40]"},t.default.createElement(C.GitMerge,{className:"h-4 w-4 text-black"})))),t.default.createElement("div",{className:"pointer-events-none relative z-20 h-full w-full overflow-hidden"},t.default.createElement(d.AnimatePresence,{initial:!1},a?t.default.createElement(d.motion.div,{className:(0,g.default)("absolute inset-0 z-20 h-full w-full shrink-0 overflow-hidden select-none",l),style:{clipPath:"inset(0 ".concat(100-L,"% 0 0)")},transition:{duration:0}},t.default.createElement("img",{alt:"first image",src:a,className:(0,g.default)("absolute inset-0 z-20 h-full w-full shrink-0 select-none",l),draggable:!1})):null)),t.default.createElement(d.AnimatePresence,{initial:!1},c?t.default.createElement(d.motion.img,{className:(0,g.default)("absolute top-0 left-0 z-19 h-full w-full select-none",f),alt:"second image",src:c,draggable:!1}):null))},p=r.default=v},56589:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=e(23947),t=function(g){var h=g.starCount,v=h===void 0?50:h,p=g.primaryColor,i=p===void 0?"#ffffff":p,u=g.className,n=u===void 0?"":u,a=Array.from({length:v},function(s,c){var E=Math.random()*2.5+5,l=Math.random()*100,f=Math.random()*6+6,_=Math.random()*10;return{id:c,topOffset:l,fallDuration:f,fallDelay:_}});return A.default.createElement("div",{className:"pointer-events-none absolute inset-0 h-full w-full -rotate-45 ".concat(n),style:{perspective:"1000px",transformStyle:"preserve-3d"}},a.map(function(s){return A.default.createElement(m.motion.div,{key:s.id,className:"absolute h-[2px] rounded-full bg-gradient-to-r from-current to-transparent drop-shadow-[0_0_6px_currentColor]",style:{top:"".concat(s.topOffset,"vh"),width:"6em",color:i,willChange:"transform"},initial:{x:"104em"},animate:{x:"-30em"},transition:{duration:s.fallDuration,delay:s.fallDelay,repeat:1/0,ease:"linear",repeatType:"loop"}},A.default.createElement("div",{className:"relative h-full w-full"},A.default.createElement("div",{className:"rounded-inherit animate-blink absolute top-0 left-[calc(-1em)] h-full w-[1em] bg-gradient-to-r from-transparent via-current to-transparent",style:{willChange:"transform, opacity"}}),A.default.createElement("div",{className:"rounded-inherit animate-blink absolute top-0 left-[calc(-1em)] h-full w-[1em] rotate-45 bg-gradient-to-r from-transparent via-current to-transparent",style:{willChange:"transform, opacity"}}),A.default.createElement("div",{className:"rounded-inherit animate-blink absolute top-0 left-[calc(-1em)] h-full w-[1em] -rotate-45 bg-gradient-to-r from-transparent via-current to-transparent",style:{willChange:"transform, opacity"}})))}))},d=r.default=t},57315:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.btn--Vmubv {\r
  border-radius: 4px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  border: 1px solid transparent;\r
  background-color: #3857e3;\r
  color: #fff;\r
  box-shadow:\r
    0 1px 3px 0 rgb(0 0 0 / 10%),\r
    0 1px 2px 0 rgb(0 0 0 / 6%);\r
  overflow: hidden;\r
  position: relative;\r
  padding: 4px 16px;\r
  font-size: 0.875rem;\r
}\r
\r
.content--jujDv {\r
  z-index: 2;\r
}\r
\r
.btn--Vmubv:hover {\r
  filter: brightness(115%);\r
  cursor: pointer;\r
}\r
\r
.btn-ripple--w2aOn {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
  opacity: 0;\r
  width: 0;\r
  height: 0;\r
  border-radius: 50%;\r
  background: rgb(255 255 255 / 20%);\r
  animation: ripple--oIc_l 0.4s ease-in;\r
}\r
\r
.btn-ripple-container--II62b {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
  background: transparent;\r
}\r
\r
@keyframes ripple--oIc_l {\r
  0% {\r
    opacity: 0;\r
  }\r
\r
  25% {\r
    opacity: 1;\r
  }\r
\r
  100% {\r
    width: 200%;\r
    padding-bottom: 200%;\r
    opacity: 0;\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/AnimateRipple/index.module.less"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,oBAAoB;EACpB,mBAAmB;EACnB,uBAAuB;EACvB,6BAA6B;EAC7B,yBAAyB;EACzB,WAAW;EACX;;+BAE6B;EAC7B,gBAAgB;EAChB,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,wBAAwB;EACxB,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,UAAU;EACV,QAAQ;EACR,SAAS;EACT,kBAAkB;EAClB,kCAAkC;EAClC,qCAA8B;AAChC;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,uBAAuB;AACzB;;AAEA;EACE;IACE,UAAU;EACZ;;EAEA;IACE,UAAU;EACZ;;EAEA;IACE,WAAW;IACX,oBAAoB;IACpB,UAAU;EACZ;AACF",sourcesContent:[`.btn {\r
  border-radius: 4px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  border: 1px solid transparent;\r
  background-color: #3857e3;\r
  color: #fff;\r
  box-shadow:\r
    0 1px 3px 0 rgb(0 0 0 / 10%),\r
    0 1px 2px 0 rgb(0 0 0 / 6%);\r
  overflow: hidden;\r
  position: relative;\r
  padding: 4px 16px;\r
  font-size: 0.875rem;\r
}\r
\r
.content {\r
  z-index: 2;\r
}\r
\r
.btn:hover {\r
  filter: brightness(115%);\r
  cursor: pointer;\r
}\r
\r
.btn-ripple {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
  opacity: 0;\r
  width: 0;\r
  height: 0;\r
  border-radius: 50%;\r
  background: rgb(255 255 255 / 20%);\r
  animation: ripple 0.4s ease-in;\r
}\r
\r
.btn-ripple-container {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
  background: transparent;\r
}\r
\r
@keyframes ripple {\r
  0% {\r
    opacity: 0;\r
  }\r
\r
  25% {\r
    opacity: 1;\r
  }\r
\r
  100% {\r
    width: 200%;\r
    padding-bottom: 200%;\r
    opacity: 0;\r
  }\r
}\r
`],sourceRoot:""}]),d.locals={btn:"btn--Vmubv",content:"content--jujDv","btn-ripple":"btn-ripple--w2aOn",btnRipple:"btn-ripple--w2aOn",ripple:"ripple--oIc_l","btn-ripple-container":"btn-ripple-container--II62b",btnRippleContainer:"btn-ripple-container--II62b"},r.A=d},57596:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=Le(e(96540)),d=e(51409),C=e(10252),g=e(97751),h=o(e(63278)),v=o(e(51521)),p=Le(e(47159)),i=o(e(7733)),u=o(e(59378)),n=o(e(64170)),a=o(e(59952)),s=o(e(13187)),c=o(e(6731)),E=o(e(23883)),l=o(e(98343)),f=o(e(78345)),_=o(e(12005)),y=o(e(59764)),B=o(e(6901)),O=o(e(83152)),D=o(e(51941)),M=o(e(37070)),P=o(e(23973)),I=o(e(63643)),T=o(e(87257)),U=o(e(39751)),R=o(e(57659)),w=o(e(54134)),L=o(e(82660)),z=o(e(64357)),F=o(e(90064)),k=o(e(78236)),N=e(7629),V=o(e(25598)),X=o(e(85042)),$=o(e(56589)),Y=o(e(56320)),re=o(e(70694)),ue=o(e(21265)),pe=o(e(66607)),Ae=o(e(27488)),ye=o(e(94143)),ne=o(e(21502)),G=o(e(29777)),ae=o(e(11845)),oe=o(e(1273)),q=o(e(56127)),J=o(e(4204)),de=o(e(45931)),ee=o(e(25635)),me=o(e(65378)),Ee=o(e(20485)),Me=o(e(41854)),ve=o(e(69849)),Be=o(e(556)),De=o(e(93868)),Ce=o(e(59833)),xe=o(e(19064)),Ie=o(e(79204)),Se=o(e(67554)),We=o(e(29492)),Ue=o(e(26718)),ke=o(e(48632)),Pe=o(e(17329)),Oe=e(2857),je=e(24124),we=o(e(34028));e(51432);var se=o(e(40999)),He=e(9365);function Le(j,S){if(typeof WeakMap=="function")var K=new WeakMap,Z=new WeakMap;return(Le=function(Q,le){if(!le&&Q&&Q.__esModule)return Q;var be,te,he={__proto__:null,default:Q};if(Q===null||A(Q)!="object"&&typeof Q!="function")return he;if(be=le?Z:K){if(be.has(Q))return be.get(Q);be.set(Q,he)}for(var Re in Q)Re!=="default"&&{}.hasOwnProperty.call(Q,Re)&&((te=(be=Object.defineProperty)&&Object.getOwnPropertyDescriptor(Q,Re))&&(te.get||te.set)?be(he,Re,te):he[Re]=Q[Re]);return he})(j,S)}var qe={fileName:"./explanations.ts",code:`export const = explanations = {
main : "This component needs more than the default code block to be displayed"
detailed : "For now, if you want the exact same behaviour, please check the github"
}`,lang:"typescript"},et=`
  const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
    return (
      <div>
        <h2>{item.name}</h2>
        <p>Price: {item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    );
  };
`.trim(),ut=["typescript","javascript","react","html5","css3","prisma","nginx","vercel","docker","git","sonarqube"],dt=[{title:"Step 1",code:"npx create-react-app my-app"},{title:"Step 2",code:"cd my-app"},{title:"Step 3",code:"npm start"},{title:"Step 4",code:"npm run build"}],W=function(){var S=(0,t.useState)(""),K=(0,m.default)(S,2),Z=K[0],H=K[1],Q=(0,t.useRef)(null),le=(0,t.useState)(!1),be=(0,m.default)(le,2),te=be[0],he=be[1],Re=(0,t.useState)(""),ct=(0,m.default)(Re,2),Ot=ct[0],Pt=ct[1],tt=(0,t.useRef)(null),jt=(0,t.useState)([]),At=(0,m.default)(jt,2),ft=At[0],mt=At[1],rt=(0,t.useRef)(null),It=(0,t.useState)("left"),Et=(0,m.default)(It,2),Rt=Et[0],Ve=Et[1],Tt=function(ie){if(rt.current){var Fe=(0,Oe.getDirection)(ie,rt.current);switch(Fe){case 0:Ve("top");break;case 1:Ve("right");break;case 2:Ve("bottom");break;case 3:Ve("left");break;default:Ve("left");break}}},St=(0,t.useState)(function(){return""}),_t=(0,m.default)(St,2),nt=_t[0],Wt=_t[1],Ut=(0,t.useState)(""),vt=(0,m.default)(Ut,2),Ze=vt[0],kt=vt[1],wt=(0,t.useRef)(null),Lt=function(ie){Wt(ie.target.value)},Ft=function(ie){kt(ie.target.value)},Kt=function(ie){ie.metaKey&&ie.key==="Enter"&&(pt(),ie.preventDefault())},pt=function(){if(Ze.trim()!==""){var ie=new AbortController;tt.current=ie,Yt(Ze,nt,ie)}},zt=function(){if(Ze.trim()!==""){var ie=new AbortController;tt.current=ie,Xt(Ze,nt,ie)}},Nt=function(){tt.current.abort(),he(!1)},Yt=function(ie,Fe,ze){Q.current="",H(Q.current);var Ke=ze.signal;he(!0),(0,Oe.oneApiChat)([{content:ie,role:"user"}],Fe,Ke).then(function(fe){var ce=fe.headers.get("content-type");if(!fe.ok||!(ce!=null&&ce.startsWith("text/event-stream"))||fe.status!==200){if(ce!=null&&ce.startsWith("text/html")||ce!=null&&ce.startsWith("text/plain")){var at=fe.clone().text();at.then(function(Je){H(Je)})}else if(ce!=null&&ce.startsWith("application/json")){var ot=fe.clone().json();ot.then(function(Je){H((0,Oe.prettyObject)(Je))})}else H(fe.statusText);he(!1)}else{var Qe,Te=fe==null||(Qe=fe.body)===null||Qe===void 0?void 0:Qe.getReader(),Ne=`

`,Ye="",xt="",Mt=function(){Te.read().then(function(lt){var er=lt.done,tr=lt.value;if(er){he(!1);return}for(Ye+=new TextDecoder().decode(tr);Ye.includes(Ne);){var Dt=Ye.indexOf(Ne),rr=Ye.slice(0,Dt),$e=rr.split("data: ");for(var it in $e)if($e[it]!==""&&$e[it]!=="[DONE]")try{var st,Xe,nr=JSON.parse($e[it]),ar=(st=(Xe=nr.choices[0])===null||Xe===void 0||(Xe=Xe.delta)===null||Xe===void 0?void 0:Xe.content)!==null&&st!==void 0?st:"";xt+=ar,Pt(new Date().toLocaleString()),Q.current=xt,H(Q.current)}catch(sr){}Ye=Ye.slice(Dt+Ne.length)}Mt()}).catch(function(lt){})};Mt()}}).catch(function(fe){he(!1),H(fe.message)})},Xt=function(ie,Fe,ze){Q.current="",H(Q.current),mt([]);var Ke=ze.signal;he(!0),(0,Oe.oneApiImage)([{content:ie,role:"user"}],Fe,Ke).then(function(fe){var ce=fe.headers.get("content-type");if(!fe.ok||fe.status!==200){if(ce!=null&&ce.startsWith("text/html")||ce!=null&&ce.startsWith("text/plain")){var at=fe.clone().text();at.then(function(Te){H(Te)})}else if(ce!=null&&ce.startsWith("application/json")){var ot=fe.clone().json();ot.then(function(Te){H((0,Oe.prettyObject)(Te))})}else H(fe.statusText);he(!1)}else{var Qe=fe.clone().json();Qe.then(function(Te){Te.error||mt(Te.data.map(function(Ne){return{imageUrl:Ne.url,imagePrompt:Ne.revised_prompt}}))}),he(!1)}}).catch(function(fe){he(!1),H(fe.message)})},Ge=(0,t.useRef)(null),Vt=(0,t.useState)(),gt=(0,m.default)(Vt,2),Zt=gt[0],Qt=gt[1],Ct=(0,i.default)({target:Zt}),Ht=Ct.scrollDir,ht=Ct.scrollPosition;(0,t.useEffect)(function(){Ge.current&&Qt(Ge.current)},[Ge]);var Gt=(0,t.useState)(!1),yt=(0,m.default)(Gt,2),or=yt[0],lr=yt[1],Jt=(0,I.default)(),Bt=(0,m.default)(Jt,2),ge=Bt[0],$t=Bt[1],qt=ut.map(function(_e){return"https://cdn.simpleicons.org/".concat(_e,"/").concat(_e)}),bt=(0,t.useRef)(null),ir=function(){if(bt.current){var ie=bt.current.outerHTML,Fe=new Blob([ie],{type:"image/svg+xml"}),ze=URL.createObjectURL(Fe),Ke=document.createElement("a");Ke.href=ze,Ke.download="mySvg.svg",Ke.click(),URL.revokeObjectURL(ze)}};return t.default.createElement(u.default,{ref:Ge},t.default.createElement("section",{className:se.default.avatar,style:{margin:"10px 0",fontSize:24}},t.default.createElement(G.default,{text:"React version: ".concat(t.version)})),t.default.createElement("section",{style:{width:600,margin:"30px 0"}},t.default.createElement(d.Input,{defaultValue:nt,placeholder:"api key",onChange:Lt,style:{marginBottom:20}}),t.default.createElement(d.Flex,{align:"center"},t.default.createElement(d.Input.TextArea,{ref:wt,defaultValue:Ze,placeholder:"\u6765\uFF0C\u8BF4\u70B9\u4EC0\u4E48\u5457...Meta + Enter\u53D1\u9001",onChange:Ft,onKeyDown:Kt,autoSize:!0,style:{width:300,height:30,caretColor:"#ff0000"}}),t.default.createElement(d.Button,{style:{margin:"0 10px"},icon:t.default.createElement(C.SendOutlined,{rotate:-60}),type:"primary",disabled:te,onClick:pt},"\u53D1\u9001"),t.default.createElement(d.Button,{style:{margin:"0 10px"},icon:t.default.createElement(C.SendOutlined,{rotate:-60}),type:"primary",disabled:te,onClick:zt},"\u751F\u6210\u56FE\u7247"),t.default.createElement(d.Button,{icon:t.default.createElement(C.SendOutlined,{rotate:-60}),type:"primary",disabled:!te,onClick:Nt},"\u505C\u6B62"))),t.default.createElement("section",{className:"mb-10"},te&&t.default.createElement("div",null,"\u6B63\u5728\u8F93\u5165..."),t.default.createElement("section",{style:{textAlign:"right",color:"#666"}},Ot),t.default.createElement(n.default,{markdownText:Z,isLoading:te}),t.default.createElement("section",{className:"aiImage"},ft.length>0&&t.default.createElement(t.default.Fragment,null,ft.map(function(_e,ie){return t.default.createElement("div",{key:ie},t.default.createElement("div",null,_e.imagePrompt),t.default.createElement("img",{src:_e.imageUrl,width:"100%",alt:_e.url}))})))),t.default.createElement("section",{style:{marginBottom:15,fontSize:20}},"I love ",t.default.createElement("span",{className:se.default.circledHighlight},"coding")," in"," ",t.default.createElement(a.default,{alternateText:["JavaScript","TypeScript","React","Vue","Remix","Node.js"]}),"."),t.default.createElement("section",{style:{marginBottom:15,fontSize:20}},"X\u5C81\u7684\u4F60\uFF0C\u6B63\u5904\u5728\u4E00\u4E2A\u7279\u6B8A\u7684\u4F4D\u7F6E\uFF1A",t.default.createElement(pe.default,{text:["\u5E74\u8F7B\u5230\u8DB3\u4EE5\u521B\u65B0, \u6210\u719F\u5230\u61C2\u5F97\u575A\u6301","\u4F60\u65E2\u6709\u5192\u9669\u7684\u52C7\u6C14, \u53C8\u6709\u63A7\u5236\u98CE\u9669\u7684\u667A\u6167","\u4EBA\u751F\u4E0D\u8BBE\u9650\uFF0C\u68A6\u60F3\u4E0D\u8FC7\u671F! "],speed:70,className:"text-gray-500",waitTime:1500,deleteSpeed:40,cursorChar:"_"})),t.default.createElement("section",{style:{margin:"20px 0",fontSize:20}},t.default.createElement(ee.default,{textLeft:"\u9010\u5149\u524D\u884C\uFF0C\u5954\u8D74\u65B0\u7A0B\uFF1B",textRight:"\u5343\u5C71\u8FC7\u5C3D\uFF0C\u4E07\u91CC\u661F\u8FB0\uFF01"})),t.default.createElement("section",{style:{margin:"20px 0",fontSize:20}},t.default.createElement(De.default,{animText:"\u9010\u5149\u524D\u884C\uFF0C\u5954\u8D74\u65B0\u7A0B\uFF1B\u5343\u5C71\u8FC7\u5C3D\uFF0C\u4E07\u91CC\u661F\u8FB0\uFF01"})),t.default.createElement("section",{style:{marginBottom:15,fontSize:20,overflow:"hidden"}},"This is something",t.default.createElement(Ae.default,{text:["amazing","new","wonderful","beautiful","smart"]})),t.default.createElement("section",{style:{marginBottom:15,fontSize:20}},t.default.createElement(ne.default,{text:"\u5343\u5C71\u8FC7\u5C3D\uFF0C\u4E07\u91CC\u661F\u8FB0!",sparklesCount:5})),t.default.createElement("section",{style:{marginBottom:15,fontSize:20}},t.default.createElement(s.default,{text:"foo bar baz http://example.org bar https://github.com/wkylin/pro-react-admin"})),t.default.createElement("section",{style:{marginBottom:15,fontSize:20}},t.default.createElement(X.default,{text:"Just some shiny text!",disabled:!1,speed:3})),t.default.createElement("section",{style:{marginBottom:15,width:360,fontSize:20}},t.default.createElement(re.default,{messages:["Preparing your experience","Loading awesome content","Almost there","Just a moment","Getting things ready"]})),t.default.createElement("section",{style:{marginBottom:15,width:360,fontSize:20}},t.default.createElement(oe.default,null)),t.default.createElement("section",{style:{marginBottom:15,position:"relative",overflow:"hidden"}},t.default.createElement(J.default,{images:qt})),t.default.createElement("section",{style:{marginBottom:15,position:"relative",overflow:"hidden"}},t.default.createElement(xe.default,null)),t.default.createElement("section",{style:{marginBottom:15,fontSize:20,height:200,width:360,background:"#111827",position:"relative",overflow:"hidden"}},t.default.createElement($.default,{starCount:30,primaryColor:"#6366f1",className:"opacity-30"}),t.default.createElement($.default,{starCount:25,primaryColor:"#818cf8",className:"opacity-50"}),t.default.createElement($.default,{starCount:20,primaryColor:"#ffffff",className:"opacity-70"})),t.default.createElement("section",{style:{marginBottom:15,fontSize:20,height:200,width:360,background:"#111827"}},t.default.createElement(ye.default,{background:"transparent",minSize:.4,maxSize:1,particleDensity:1200,className:"h-full w-full",particleColor:"#FFFFFF"})),t.default.createElement("section",{style:{marginBottom:15,fontSize:20,height:200,width:360,overflow:"hidden",position:"relative"},className:"bg-slate-900"},t.default.createElement(ue.default,null)),t.default.createElement("section",{style:{marginBottom:15,fontSize:20,height:200,width:360,overflow:"hidden",position:"relative"},className:"bg-slate-900"},t.default.createElement(ae.default,null)),t.default.createElement("section",{onMouseEnter:Tt,ref:rt,style:{marginBottom:15,height:200,width:360,background:"#111827",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}},"Direction: ",Rt),t.default.createElement("section",{style:{margin:"20px 0"}},t.default.createElement(Y.default,{firstImage:Ie.default,secondImage:Se.default,firstImageClassName:"object-cover object-left-top",secondImageClassName:"object-cover object-left-top",className:"h-[200px]",slideMode:"drag"})),t.default.createElement("section",{style:{margin:"20px 0",width:360,height:200,background:"#000"}},t.default.createElement(V.default,{speed:.5,squareSize:20,direction:"diagonal",borderColor:"#222",hoverFillColor:"#222"})),t.default.createElement("section",{className:se.default.line}),t.default.createElement("section",{className:se.default.linear}),t.default.createElement("section",null,t.default.createElement(E.default,{text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?"})),t.default.createElement(f.default,{text:"A line bordered text."}),t.default.createElement("section",{style:{display:"flex",alignItems:"center",marginTop:10,marginBottom:40}},t.default.createElement(g.Atom,null)," ",t.default.createElement(g.Merge,null)," ",t.default.createElement(g.GitMerge,null)," ",t.default.createElement(g.GitPullRequestArrow,null)),t.default.createElement("section",{style:{marginBottom:40,fontSize:16}},t.default.createElement("h2",null,"Scroll direction: ","".concat(Ht)),t.default.createElement("p",null,"Scroll position - Top: ",ht.top,", Bottom: ",ht.bottom)),t.default.createElement("section",{style:{marginBottom:40,fontSize:16}},t.default.createElement("h3",null,"React Animate On Scroll."),t.default.createElement("h3",null,t.default.createElement(s.default,{text:"https://motion.dev/ https://gsap.com/ https://www.react-spring.dev/ https://use-gesture.netlify.app/"})),t.default.createElement("h3",{style:{marginBottom:40}},t.default.createElement(s.default,{text:"https://www.npmjs.com/package/react-animate-on-scroll https://www.npmjs.com/package/react-scroll https://github.com/wellyshen/react-cool-inview"})),t.default.createElement(B.default,null,t.default.createElement(c.default,{src:Se.default,alt:"Strawberries"}))),t.default.createElement("section",null,t.default.createElement(_.default,null)),t.default.createElement("section",{style:{margin:40}},t.default.createElement(y.default,null)),t.default.createElement("section",{style:{margin:"60px 0 40px 40px"}},t.default.createElement("div",{className:se.default["video-box"]},t.default.createElement("div",{className:se.default["video-btn"]},"b"))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200,overflow:"hidden"}},t.default.createElement(O.default.FadeIn,null,t.default.createElement(l.default,{avatar:Pe.default,text:"Hi, I'm a developer."}))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200,overflow:"hidden"}},t.default.createElement(O.default.FadeUp,null,t.default.createElement("img",{src:ke.default,alt:"",style:{maskImage:"linear-gradient(to top, transparent, black 20%, black 80%, transparent)"}}))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200,overflow:"hidden"}},t.default.createElement(O.default.ScaleIn,{triggerOnce:!1},t.default.createElement(t.default.Fragment,null,t.default.createElement("img",{src:We.default,alt:""}),t.default.createElement("section",{className:se.default["blend-me"]},"Mix Blend Mode")))),t.default.createElement("section",{style:{marginBottom:40,width:360,height:200,overflow:"hidden"}},t.default.createElement(O.default.DiyAnimation,{from:{opacity:0,transform:"translate(-100%, 0)"},to:{opacity:1,transform:"translate(0, 0)"},triggerOnce:!0},t.default.createElement(we.default,null,t.default.createElement("img",{src:Ue.default,alt:""})))),t.default.createElement("section",{style:{marginBottom:40,display:"flex"}},t.default.createElement(h.default,{className:"my-spot",style:{width:360,height:200,color:"#fff"}},t.default.createElement("section",null))),t.default.createElement("section",{style:{margin:"20px 0",fontSize:24}},t.default.createElement(q.default,{delay:.25,inView:!0},"\u8FD9\u4E00\u5E74\uFF0C\u4EE5\u7B14\u4E3A\u5251\uFF0C\u4EE5\u68A6\u4E3A\u9A6C\uFF0C\u5728\u751F\u6D3B\u7684\u753B\u5E03\u4E0A\uFF0C\u7ED8\u5C31\u5C5E\u4E8E\u81EA\u5DF1\u7684\u58EE\u4E3D\u53F2\u8BD7\u3002")),t.default.createElement("section",{style:{margin:"20px 0",fontSize:24}},t.default.createElement(de.default,{text:"2025 \u5E74\uFF0C\u662F\u5145\u6EE1\u5E0C\u671B\u7684\u4E00\u5E74\u3002\u8BA9\u6211\u4EEC\u653E\u4E0B\u8FC7\u53BB\u7684\u5305\u88B1\uFF0C\u8F7B\u88C5\u4E0A\u9635\u3002\u7528\u79EF\u6781\u7684\u5FC3\u6001\u53BB\u9762\u5BF9\u751F\u6D3B\uFF0C\u7528\u575A\u5B9A\u7684\u4FE1\u5FF5\u53BB\u8FFD\u9010\u68A6\u60F3\u3002\u76F8\u4FE1\u81EA\u5DF1\uFF0C\u53EA\u8981\u6211\u4EEC\u52AA\u529B\u594B\u6597\uFF0C\u5C31\u4E00\u5B9A\u80FD\u521B\u9020\u51FA\u5C5E\u4E8E\u81EA\u5DF1\u7684\u7CBE\u5F69\u4EBA\u751F\u3002\u8BA9\u6211\u4EEC\u4E00\u8D77\u9010\u5149\u524D\u884C\uFF0C\u5954\u8D74\u65B0\u7A0B\uFF0C\u4E66\u5199\u5C5E\u4E8E\u6211\u4EEC\u7684\u8F89\u714C\u7BC7\u7AE0\uFF01"})),t.default.createElement("section",{style:{margin:"20px 0"}},t.default.createElement(F.default,null)),t.default.createElement("section",{style:{marginBottom:10,width:360,height:200,position:"relative",backgroundColor:"rgba(0, 0,0, 0.8)",borderRadius:8}},t.default.createElement("section",{className:se.default.dotMask,ref:$t},"dot mask"),t.default.createElement(ve.default,{size:100})),t.default.createElement("section",{style:{marginBottom:40,fontSize:18}},t.default.createElement("section",null,"RectResult."),"width: ",Number.parseInt(ge==null?void 0:ge.width)," height: ",Number.parseInt(ge==null?void 0:ge.height)," top:"," ",Number.parseInt(ge==null?void 0:ge.top)," bottom: ",Number.parseInt(ge==null?void 0:ge.bottom)," right:"," ",Number.parseInt(ge==null?void 0:ge.right)," left: ",Number.parseInt(ge==null?void 0:ge.left)),t.default.createElement("section",{style:{marginBottom:40,height:200,width:360,overflow:"hidden"}},t.default.createElement(P.default,null)),t.default.createElement("section",{style:{marginBottom:20}},t.default.createElement(L.default,{width:360,height:200,minScratchPercentage:70,className:"flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"},t.default.createElement("p",{className:"text-9xl"},"\u2728"))),t.default.createElement("section",{style:{margin:20}},t.default.createElement(D.default,null,"Click Me")),t.default.createElement("section",{style:{margin:20}},t.default.createElement("section",{className:se.default.effect}," Hello CSS")),t.default.createElement("section",{style:{margin:20},className:se.default.maskBox},t.default.createElement("section",{className:se.default.watermark},"water mark"),"mask"),t.default.createElement("section",{style:{margin:20}},t.default.createElement("button",{className:se.default.button,onClick:je.fireConfetti},t.default.createElement("span",{className:se.default["button-label"]},"Click Me"))),t.default.createElement("section",{style:{margin:20},className:se.default.eHElAY},"Hi, React!"),t.default.createElement("section",{style:{margin:20},className:"z-30 flex w-full items-center justify-start gap-8"},t.default.createElement(Ce.default,{backgroundColor:"#0c002b",textColor:"#1670f0",borderStartColor:"rgba(22, 112, 240, 0.1)",borderEndColor:"rgba(22, 112, 240, 0.7)"},"Button"),t.default.createElement(Ce.default,{backgroundColor:"#1a0b2e",textColor:"#ff00ff",borderStartColor:"rgba(255, 0, 255, 0.1)",borderEndColor:"rgba(0, 255, 255, 0.7)"},"Button")),t.default.createElement("section",null,t.default.createElement("div",{className:se.default.stages},t.default.createElement("div",{className:se.default.cubeSpinner},t.default.createElement("span",{className:se.default.face1},"Web Services"),t.default.createElement("span",{className:se.default.face2},"Blockchain"),t.default.createElement("span",{className:se.default.face3},"Mobile Apps")))),t.default.createElement("section",{style:{margin:"20px 0",fontSize:40}},t.default.createElement(M.default,null)),t.default.createElement("section",{style:{position:"relative",fontSize:36}},"I build",t.default.createElement(Me.default,{className:"mx-1 px-4 py-2",words:["creative","interactive","beautiful","modern"]}),t.default.createElement("span",{className:"block text-black sm:inline"},"websites and apps.")),t.default.createElement("section",{style:{margin:20}},t.default.createElement(N.ReactSignature,null)),t.default.createElement("section",{style:{margin:20}},dt.map(function(_e,ie){return t.default.createElement(R.default.StaticStep,{key:_e.title,step:ie+1,title:_e.title},t.default.createElement(R.default.CodeContainer,null,_e.code))})),t.default.createElement("section",{style:{margin:20}},t.default.createElement(w.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(k.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(p.ResponsiveMasonry,{columnsCountBreakPoints:{350:1,750:2,900:6}},t.default.createElement(p.default,{gutter:"10px"},t.default.createElement("section",{style:{height:100,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:200,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:150,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:150,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:200,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:100,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:200,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:150,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:100,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:150,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:100,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:200,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:150,width:"100%",border:"1px solid #ccc",background:"#aaa"}}),t.default.createElement("section",{style:{height:150,width:"100%",border:"1px solid #ccc",background:"#aaa"}})))),t.default.createElement("section",{style:{margin:20}},t.default.createElement(me.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(T.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(v.default,{autoFill:!0,direction:"left",gradient:!0,gradientColor:"rgba(255, 255, 255, 0.8)"},t.default.createElement("div",{style:{width:200,height:100,lineHeight:"100px",textAlign:"center",background:"#aaa",margin:"0 10px",borderRadius:8}},"React"))),t.default.createElement("section",{style:{margin:20}},t.default.createElement(v.default,{autoFill:!0,direction:"right",gradient:!0,gradientColor:"rgba(255, 255, 255, 0.8)"},t.default.createElement("div",{style:{width:200,height:100,lineHeight:"100px",textAlign:"center",background:"#aaa",margin:"0 10px",borderRadius:8}},"Vue"))),t.default.createElement("section",{style:{margin:0}},t.default.createElement(Ee.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(U.default,{preCode:et})),t.default.createElement("section",{style:{margin:20}},t.default.createElement(z.default,null)),t.default.createElement("section",{style:{margin:20}},t.default.createElement(Be.default,null)))},b=r.default=W},57659:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=o(e(71508)),t=function(v){var p=v.step,i=v.title,u=v.children;return A.default.createElement("div",{className:"flex gap-6"},A.default.createElement("div",{className:"flex flex-col items-center"},A.default.createElement("p",{className:"flex size-8 flex-none items-center justify-center rounded-full border border-neutral-400/20 bg-neutral-100 text-sm font-medium text-neutral-700 select-none dark:border-neutral-400/10 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80"},p),A.default.createElement("div",{className:"relative my-2 h-full w-px rounded-full bg-neutral-200 dark:bg-neutral-700"})),A.default.createElement("div",{className:"mb-4 w-full"},A.default.createElement("h6",{className:"mb-4 ml-1 text-lg font-medium tracking-tight text-neutral-700 dark:text-neutral-50"},i),u))},d=function(v){var p=v.children;return A.default.createElement("div",{className:"h-fit w-full rounded-lg border border-neutral-400/20 bg-neutral-100 px-5 py-3 transition-colors duration-300 dark:border-neutral-400/10 dark:bg-neutral-800 dark:hover:bg-neutral-800/80"},A.default.createElement("code",{className:(0,m.default)("text-sm whitespace-pre-wrap text-neutral-500 dark:text-neutral-300")},p))},C={StaticStep:t,CodeContainer:d},g=r.default=C},59378:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(94634)),m=o(e(43693)),t=o(e(91847)),d=o(e(96540)),C=["style","children"];function g(i,u){var n=Object.keys(i);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(i);u&&(a=a.filter(function(s){return Object.getOwnPropertyDescriptor(i,s).enumerable})),n.push.apply(n,a)}return n}function h(i){for(var u=1;u<arguments.length;u++){var n=arguments[u]!=null?arguments[u]:{};u%2?g(Object(n),!0).forEach(function(a){(0,m.default)(i,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach(function(a){Object.defineProperty(i,a,Object.getOwnPropertyDescriptor(n,a))})}return i}var v=d.default.forwardRef(function(i,u){var n=i.style,a=i.children,s=(0,t.default)(i,C);return d.default.createElement("div",(0,A.default)({ref:u},s,{id:"scrollContainer",style:h({width:"100%",height:"calc(100vh - 204px)",position:"relative",overflowX:"hidden",overflowY:"auto"},n)}),a)}),p=r.default=v},59651:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(43693)),t=C(e(96540)),d=e(74848);function C(i,u){if(typeof WeakMap=="function")var n=new WeakMap,a=new WeakMap;return(C=function(c,E){if(!E&&c&&c.__esModule)return c;var l,f,_={__proto__:null,default:c};if(c===null||A(c)!="object"&&typeof c!="function")return _;if(l=E?a:n){if(l.has(c))return l.get(c);l.set(c,_)}for(var y in c)y!=="default"&&{}.hasOwnProperty.call(c,y)&&((f=(l=Object.defineProperty)&&Object.getOwnPropertyDescriptor(c,y))&&(f.get||f.set)?l(_,y,f):_[y]=c[y]);return _})(i,u)}function g(i,u){var n=Object.keys(i);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(i);u&&(a=a.filter(function(s){return Object.getOwnPropertyDescriptor(i,s).enumerable})),n.push.apply(n,a)}return n}function h(i){for(var u=1;u<arguments.length;u++){var n=arguments[u]!=null?arguments[u]:{};u%2?g(Object(n),!0).forEach(function(a){(0,m.default)(i,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach(function(a){Object.defineProperty(i,a,Object.getOwnPropertyDescriptor(n,a))})}return i}var v=function(u){return(0,d.jsxs)("svg",h(h({xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",width:"1em",height:"1em"},u),{},{children:[(0,d.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),(0,d.jsx)("path",{d:"M1 8h22v7H11v2H7v-2H1zM7 8v7M14 8v7M17 11v4M4 11v4M11 11v1M20 11v4"})]}))},p=r.default=v},59764:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=o(e(76043)),t=function(){return A.default.createElement(A.default.Fragment,null,A.default.createElement("section",{className:m.default.breatheItem},A.default.createElement("span",null,"Breathe")))},d=r.default=t},59833:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(94634)),m=o(e(43693)),t=o(e(91847)),d=o(e(96540)),C=o(e(71508)),g=["children","className","textColor","borderStartColor","borderEndColor","backgroundColor","style"];function h(u,n){var a=Object.keys(u);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(u);n&&(s=s.filter(function(c){return Object.getOwnPropertyDescriptor(u,c).enumerable})),a.push.apply(a,s)}return a}function v(u){for(var n=1;n<arguments.length;n++){var a=arguments[n]!=null?arguments[n]:{};n%2?h(Object(a),!0).forEach(function(s){(0,m.default)(u,s,a[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(u,Object.getOwnPropertyDescriptors(a)):h(Object(a)).forEach(function(s){Object.defineProperty(u,s,Object.getOwnPropertyDescriptor(a,s))})}return u}var p=function(n){var a=n.children,s=n.className,c=n.textColor,E=c===void 0?"#1670f0":c,l=n.borderStartColor,f=l===void 0?"#0c002b":l,_=n.borderEndColor,y=_===void 0?"#1779ff":_,B=n.backgroundColor,O=B===void 0?"transparent":B,D=n.style,M=(0,t.default)(n,g),P=v({"--border-start":f,"--border-end":y,"--text-color":E,"--bg-color":O},D);return d.default.createElement("span",(0,A.default)({className:(0,C.default)("relative cursor-pointer overflow-hidden px-[10px] py-[10px] text-[14px] tracking-[5px] uppercase no-underline shadow-[0_20px_50px_rgba(0,0,0,0.5)]","bg-[var(--bg-color)] text-[var(--text-color)]",s),style:P},M),d.default.createElement("span",{className:"animate-wui-slide-right absolute top-0 left-0 h-[2px] w-full bg-linear-to-r from-[var(--border-start)] to-[var(--border-end)]"}),d.default.createElement("span",{className:"animate-wui-slide-down absolute top-0 right-0 h-full w-[2px] bg-linear-to-b from-[var(--border-start)] to-[var(--border-end)]"}),d.default.createElement("span",{className:"animate-wui-slide-left absolute bottom-0 left-0 h-[2px] w-full bg-linear-to-l from-[var(--border-start)] to-[var(--border-end)]"}),d.default.createElement("span",{className:"animate-wui-slide-up absolute top-0 left-0 h-full w-[2px] bg-linear-to-t from-[var(--border-start)] to-[var(--border-end)]"}),a)},i=r.default=p},59952:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=d(e(96540)),t=o(e(45843));function d(h,v){if(typeof WeakMap=="function")var p=new WeakMap,i=new WeakMap;return(d=function(n,a){if(!a&&n&&n.__esModule)return n;var s,c,E={__proto__:null,default:n};if(n===null||A(n)!="object"&&typeof n!="function")return E;if(s=a?i:p){if(s.has(n))return s.get(n);s.set(n,E)}for(var l in n)l!=="default"&&{}.hasOwnProperty.call(n,l)&&((c=(s=Object.defineProperty)&&Object.getOwnPropertyDescriptor(n,l))&&(c.get||c.set)?s(E,l,c):E[l]=n[l]);return E})(h,v)}var C=function(v){var p=v.alternateText,i=p===void 0?[]:p;return(0,m.useEffect)(function(){var u=document.getElementById("alternating-text"),n=0,a=function(c){n=n<i.length-1?n+1:0,u.innerHTML=i[n]};return u.innerHTML=i[0],u.addEventListener("animationiteration",a,!1),function(){u.removeEventListener("animationiteration",a,!1)}},[]),m.default.createElement("span",{className:t.default.alternating,id:"alternating-text"},i[0]||"Text goes here")},g=r.default=C},63278:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(43693)),t=o(e(85715)),d=g(e(96540)),C=o(e(9));function g(u,n){if(typeof WeakMap=="function")var a=new WeakMap,s=new WeakMap;return(g=function(E,l){if(!l&&E&&E.__esModule)return E;var f,_,y={__proto__:null,default:E};if(E===null||A(E)!="object"&&typeof E!="function")return y;if(f=l?s:a){if(f.has(E))return f.get(E);f.set(E,y)}for(var B in E)B!=="default"&&{}.hasOwnProperty.call(E,B)&&((_=(f=Object.defineProperty)&&Object.getOwnPropertyDescriptor(E,B))&&(_.get||_.set)?f(y,B,_):y[B]=E[B]);return y})(u,n)}function h(u,n){var a=Object.keys(u);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(u);n&&(s=s.filter(function(c){return Object.getOwnPropertyDescriptor(u,c).enumerable})),a.push.apply(a,s)}return a}function v(u){for(var n=1;n<arguments.length;n++){var a=arguments[n]!=null?arguments[n]:{};n%2?h(Object(a),!0).forEach(function(s){(0,m.default)(u,s,a[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(u,Object.getOwnPropertyDescriptors(a)):h(Object(a)).forEach(function(s){Object.defineProperty(u,s,Object.getOwnPropertyDescriptor(a,s))})}return u}var p=function(n){var a=n.className,s=n.style,c=n.children,E=(0,d.useRef)(null),l=(0,d.useState)(!1),f=(0,t.default)(l,2),_=f[0],y=f[1],B=(0,d.useState)({x:0,y:0}),O=(0,t.default)(B,2),D=O[0],M=O[1],P=(0,d.useState)(0),I=(0,t.default)(P,2),T=I[0],U=I[1],R=function(N){if(!(!E.current||_)){var V=E.current,X=V.getBoundingClientRect();M({x:N.clientX-X.left,y:N.clientY-X.top})}},w=function(){y(!0),U(1)},L=function(){y(!1),U(0)},z=function(){U(1)},F=function(){U(0)};return d.default.createElement("section",{ref:E,onMouseMove:R,onFocus:w,onBlur:L,onMouseEnter:z,onMouseLeave:F,className:"".concat(C.default.cardEffect," ").concat(a),style:v({},s)},d.default.createElement("section",{className:C.default.spotlight,style:{opacity:T,background:"radial-gradient(1000px circle at ".concat(D.x,"px ").concat(D.y,"px, rgba(190,255,255,.2), transparent 40%)")}}),d.default.createElement("section",{className:C.default.spotlight,style:{opacity:T,border:"2px solid rgb(255, 255, 255)",borderRadius:"8px",WebkitMaskImage:"radial-gradient(40% 40% at ".concat(D.x,"px ").concat(D.y,"px, black 45%, transparent)")}}),c)},i=r.default=p},63361:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(43693)),t=C(e(96540)),d=e(74848);function C(i,u){if(typeof WeakMap=="function")var n=new WeakMap,a=new WeakMap;return(C=function(c,E){if(!E&&c&&c.__esModule)return c;var l,f,_={__proto__:null,default:c};if(c===null||A(c)!="object"&&typeof c!="function")return _;if(l=E?a:n){if(l.has(c))return l.get(c);l.set(c,_)}for(var y in c)y!=="default"&&{}.hasOwnProperty.call(c,y)&&((f=(l=Object.defineProperty)&&Object.getOwnPropertyDescriptor(c,y))&&(f.get||f.set)?l(_,y,f):_[y]=c[y]);return _})(i,u)}function g(i,u){var n=Object.keys(i);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(i);u&&(a=a.filter(function(s){return Object.getOwnPropertyDescriptor(i,s).enumerable})),n.push.apply(n,a)}return n}function h(i){for(var u=1;u<arguments.length;u++){var n=arguments[u]!=null?arguments[u]:{};u%2?g(Object(n),!0).forEach(function(a){(0,m.default)(i,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach(function(a){Object.defineProperty(i,a,Object.getOwnPropertyDescriptor(n,a))})}return i}var v=function(u){return(0,d.jsxs)("svg",h(h({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"#fff",viewBox:"0 0 120 30"},u),{},{children:[(0,d.jsxs)("circle",{cx:15,cy:15,r:15,children:[(0,d.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,d.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]}),(0,d.jsxs)("circle",{cx:60,cy:15,r:9,fillOpacity:.3,children:[(0,d.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:9,repeatCount:"indefinite",to:9,values:"9;15;9"}),(0,d.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:.5,repeatCount:"indefinite",to:.5,values:".5;1;.5"})]}),(0,d.jsxs)("circle",{cx:105,cy:15,r:15,children:[(0,d.jsx)("animate",{attributeName:"r",begin:"0s",calcMode:"linear",dur:"0.8s",from:15,repeatCount:"indefinite",to:15,values:"15;9;15"}),(0,d.jsx)("animate",{attributeName:"fill-opacity",begin:"0s",calcMode:"linear",dur:"0.8s",from:1,repeatCount:"indefinite",to:1,values:"1;.5;1"})]})]}))},p=r.default=v},63643:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(85715)),m=e(96540),t=o(e(43591)),d=function(v){return v?v.getBoundingClientRect():null},C=function(){var v=(0,m.useRef)(null),p=v.current||null,i=(0,m.useState)(d(p)),u=(0,A.default)(i,2),n=u[0],a=u[1],s=(0,m.useCallback)(function(){v.current&&a(d(v.current))},[v]);return(0,m.useLayoutEffect)(function(){var c=v.current;if(c){if(s(),typeof t.default=="function"){var E=new t.default(function(){return s()});return E.observe(c),function(){E&&(E.disconnect(),E=null)}}return window.addEventListener("resize",s),function(){return window.removeEventListener("resize",s)}}},[s]),[n,v]},g=r.default=C},63859:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0,Object.defineProperty(r,"useCopy",{enumerable:!0,get:function(){return m.default}});var A=o(e(90467)),m=o(e(1472)),t=r.default=A.default},64170:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(54756)),t=o(e(94634)),d=o(e(85715)),C=o(e(29293)),g=_(e(96540)),h=e(51409),v=o(e(10252)),p=o(e(71525)),i=o(e(54152)),u=o(e(63940)),n=o(e(37948)),a=o(e(73410)),s=o(e(51498)),c=o(e(63461)),E=e(81591),l=o(e(63361));e(35819);var f=o(e(43259));function _(M,P){if(typeof WeakMap=="function")var I=new WeakMap,T=new WeakMap;return(_=function(R,w){if(!w&&R&&R.__esModule)return R;var L,z,F={__proto__:null,default:R};if(R===null||A(R)!="object"&&typeof R!="function")return F;if(L=w?T:I){if(L.has(R))return L.get(R);L.set(R,F)}for(var k in R)k!=="default"&&{}.hasOwnProperty.call(R,k)&&((z=(L=Object.defineProperty)&&Object.getOwnPropertyDescriptor(R,k))&&(z.get||z.set)?L(F,k,z):F[k]=R[k]);return F})(M,P)}var y=function(){var M=(0,C.default)(m.default.mark(function P(I){var T,U;return m.default.wrap(function(w){for(;;)switch(w.prev=w.next){case 0:if(w.prev=0,!((T=navigator)!==null&&T!==void 0&&(T=T.clipboard)!==null&&T!==void 0&&T.writeText)){w.next=5;break}return w.next=4,navigator.clipboard.writeText(I);case 4:h.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F");case 5:w.next=16;break;case 7:w.prev=7,w.t0=w.catch(0),U=document.createElement("textarea"),U.value=I,document.body.appendChild(U),U.focus(),U.select();try{document.execCommand("copy"),h.message.success("\u5DF2\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F")}catch(L){h.message.success("\u590D\u5236\u5230\u526A\u8D34\u677F\u5931\u8D25")}document.body.removeChild(U);case 16:case"end":return w.stop()}},P,null,[[0,7]])}));return function(I){return M.apply(this,arguments)}}(),B=function(P){var I,T=(0,g.useRef)(null),U=(I=T.current)===null||I===void 0?void 0:I.innerText,R=(0,g.useRef)(""),w=(0,E.useDebouncedCallback)(function(){if(T.current){var L=T.current.querySelector("code"),z=L.className,F=/language-(\w+)/.exec(z||"");if(F){var k=(0,d.default)(F,2),N=k[1];R.current=N}}},800);return(0,g.useEffect)(function(){setTimeout(w,1)},[U]),g.default.createElement("section",null,g.default.createElement("section",{className:f.default.copySection},g.default.createElement("span",{className:f.default.lang},R.current),g.default.createElement("span",{className:f.default.copySpan,role:"button",onClick:function(){if(T.current){var z=T.current.innerText;y(z)}}},"\u590D\u5236\u4EE3\u7801")),g.default.createElement("pre",{className:f.default.preCode,ref:T},P.children))},O=function(P){var I=P.markdownText,T=I===void 0?"":I,U=P.isLoading,R=U===void 0?!1:U;return g.default.createElement("section",{className:f.default.markdownBody},R&&!T&&g.default.createElement(v.default,{component:l.default,style:{color:"#fff"},className:f.default.loadingIcon}),T&&g.default.createElement(p.default,{remarkPlugins:[i.default,a.default,u.default],rehypePlugins:[n.default,c.default,[s.default,{detect:!1,ignoreMissing:!0}]],components:{pre:B,p:function(L){return g.default.createElement("p",(0,t.default)({},L,{dir:"auto"}))},a:function(L){var z,F=L.href||"",k=/^\/#/i.test(F),N=k?"_self":(z=L.target)!==null&&z!==void 0?z:"_blank";return g.default.createElement("a",(0,t.default)({},L,{target:N}))}}},T))},D=r.default=O},64357:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=h(e(96540)),d=e(81591),C=o(e(32765)),g=o(e(14278));function h(u,n){if(typeof WeakMap=="function")var a=new WeakMap,s=new WeakMap;return(h=function(E,l){if(!l&&E&&E.__esModule)return E;var f,_,y={__proto__:null,default:E};if(E===null||A(E)!="object"&&typeof E!="function")return y;if(f=l?s:a){if(f.has(E))return f.get(E);f.set(E,y)}for(var B in E)B!=="default"&&{}.hasOwnProperty.call(E,B)&&((_=(f=Object.defineProperty)&&Object.getOwnPropertyDescriptor(E,B))&&(_.get||_.set)?f(y,B,_):y[B]=E[B]);return y})(u,n)}var v=function(n,a,s){if(n==="sm")return{hoverX:a*.03,hoverY:s*.03};if(n==="md")return{hoverX:a*.06,hoverY:s*.06};if(n==="lg")return{hoverX:a*.1,hoverY:s*.1}},p=function(){var n,a=(0,t.useState)(!1),s=(0,m.default)(a,2),c=s[0],E=s[1],l=(0,t.useRef)(),f=(0,t.useRef)([]),_=C.default===null||C.default===void 0?void 0:C.default.length,y=(n=l==null?void 0:l.current)!==null&&n!==void 0?n:{},B=y.offsetWidth,O=y.offsetHeight,D=function(I){var T=I.clientX,U=I.clientY;f.current.forEach(function(R){var w,L=(w=R==null?void 0:R.initialPositions)!==null&&w!==void 0?w:{},z=L.xPos,F=L.yPos,k=R.size,N=v(k,T,U),V=N.hoverX,X=N.hoverY;R.refItem&&(R.refItem.style.transform="translate(".concat(z+V,"px, ").concat(F+X,"px)"))})},M=(0,d.useDebouncedCallback)(D,10);return(0,t.useEffect)(function(){E(!0);var P=l==null?void 0:l.current;if(P)return P.addEventListener("mousemove",M),P.addEventListener("resize",M),function(){P&&(P.removeEventListener("mousemove",M),P.removeEventListener("resize",M))}},[]),t.default.createElement("div",{className:g.default.hero,ref:l},c&&t.default.createElement("div",{className:g.default.iconLayer},C.default.map(function(P,I){var T=P.size,U=P.type,R=P.icon,w=Math.ceil(Math.sqrt(_)),L=Math.ceil(_/w),z=B/L,F=O/w,k=Math.floor(I/L),N=I%L,V=Math.random()*(z-75),X=Math.random()*(F-75),$=N*z,Y=k*F,re=$+V,ue=Y+X;return t.default.createElement("span",{key:I,ref:function(Ae){return f.current[I]={refItem:Ae,initialPositions:{xPos:re,yPos:ue},size:T}},className:"".concat(g.default.icon," ").concat(g.default[U]," ").concat(g.default[T]),style:{transform:"translateX(".concat(re,"px) translateY(").concat(ue,"px)")}},R&&R)})),t.default.createElement("div",{className:g.default.heroText},t.default.createElement("h1",null,"Grow your ",t.default.createElement("br",null)," ",t.default.createElement("span",null,"Frontend Skills")),t.default.createElement("h3",null,"with ",t.default.createElement("span",null,"React"),", ",t.default.createElement("span",null,"Angular"),", ",t.default.createElement("span",null,"Vue"),", ",t.default.createElement("span",null,"Typescript"),", ",t.default.createElement("span",null,"Redux"),","," ",t.default.createElement("span",null,"Node"),", ",t.default.createElement("span",null,"GraphQL"),",",t.default.createElement("span",null,"CSS"),", ",t.default.createElement("span",null,"HTML"),", ",t.default.createElement("span",null,"Webpack"),","," ",t.default.createElement("span",null,"Rollup"),", ",t.default.createElement("span",null,"ESLint"),", ",t.default.createElement("span",null,"Prettier"),", ",t.default.createElement("span",null,"Stylelint"),",",t.default.createElement("span",null,"PostCSS"),","," ",t.default.createElement("span",null,"Styled Components"),", ",t.default.createElement("span",null,"Emotion"),", ",t.default.createElement("span",null,"Material UI"),", ",t.default.createElement("span",null,"Ant Design"),","," ",t.default.createElement("span",null,"Bootstrap"),", ",t.default.createElement("span",null,"Foundation"),",",t.default.createElement("span",null,"React Native"),", ",t.default.createElement("span",null,"Flutter"),","," ",t.default.createElement("span",null,"Python"),", ",t.default.createElement("span",null,"Go"),",",t.default.createElement("span",null,"JavaScript"),", and ",t.default.createElement("span",null,"NPM"))))},i=r.default=p},64508:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(80791),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},64928:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.shinyText--ZebuC {\r
  color: #333;\r
  background: linear-gradient(120deg, rgb(0 0 0 / 0%) 40%, rgb(0 0 0 / 80%) 50%, #000 60%);\r
  background-size: 200% 100%;\r
  -webkit-background-clip: text;\r
          background-clip: text;\r
  display: inline-block;\r
  animation: shine--BuokE 5s linear infinite;\r
}\r
\r
@keyframes shine--BuokE {\r
  0% {\r
    background-position: 100%;\r
  }\r
\r
  100% {\r
    background-position: -100%;\r
  }\r
}\r
\r
.shinyText--ZebuC.disabled--dLh_t {\r
  animation: none;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/ShinyText/index.module.less"],names:[],mappings:"AAAA;EACE,WAAW;EACX,wFAAwF;EACxF,0BAA0B;EAC1B,6BAAqB;UAArB,qBAAqB;EACrB,qBAAqB;EACrB,0CAAmC;AACrC;;AAEA;EACE;IACE,yBAAyB;EAC3B;;EAEA;IACE,0BAA0B;EAC5B;AACF;;AAEA;EACE,eAAe;AACjB",sourcesContent:[`.shinyText {\r
  color: #333;\r
  background: linear-gradient(120deg, rgb(0 0 0 / 0%) 40%, rgb(0 0 0 / 80%) 50%, #000 60%);\r
  background-size: 200% 100%;\r
  background-clip: text;\r
  display: inline-block;\r
  animation: shine 5s linear infinite;\r
}\r
\r
@keyframes shine {\r
  0% {\r
    background-position: 100%;\r
  }\r
\r
  100% {\r
    background-position: -100%;\r
  }\r
}\r
\r
.shinyText.disabled {\r
  animation: none;\r
}\r
`],sourceRoot:""}]),d.locals={shinyText:"shinyText--ZebuC",shine:"shine--BuokE",disabled:"disabled--dLh_t"},r.A=d},65378:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=o(e(69363)),t=function(){return A.default.createElement(A.default.Fragment,null,A.default.createElement("div",{className:"flex h-[350px] items-end justify-center px-4 pb-24"},A.default.createElement(m.default,{variants:{hidden:{opacity:0,y:30,scale:.95,filter:"blur(4px)"},visible:{opacity:1,y:0,scale:1,filter:"blur(0px)"}},transition:{duration:.3,ease:"easeInOut"},viewOptions:{margin:"0px 0px -350px 0px"}},A.default.createElement("div",{className:"w-full bg-zinc-100 p-4"},A.default.createElement("p",{className:"text-zinc-600"},A.default.createElement("strong",{className:"font-medium text-zinc-900"},"\u54EA\u5412\uFF1A"),"\u662F\u9B54\u662F\u4ED9\uFF0C\u6211\u81EA\u5DF1\u8BF4\u4E86\u7B97\uFF0C\u7BA1\u4ED6\u4EC0\u4E48\u5929\u52AB\uFF01")))),A.default.createElement("div",{className:"flex h-[350px] items-end justify-center px-4 pb-24"},A.default.createElement(m.default,{variants:{hidden:{opacity:0,x:100},visible:{opacity:1,x:0}},transition:{duration:.3,ease:"easeInOut"},viewOptions:{margin:"0px 0px -350px 0px"}},A.default.createElement("div",{className:"w-full bg-zinc-900 p-4"},A.default.createElement("p",{className:"text-zinc-400"},A.default.createElement("strong",{className:"font-medium text-zinc-50"},"\u54EA\u5412\uFF1A"),"\u4EE5\u524D\u662F\u6211\u4E0D\u61C2\u4E8B\uFF0C\u73B0\u5728\uFF0C\u6362\u6211\u6765\u5B88\u62A4\u9648\u5858\u5173\uFF01")))),A.default.createElement("div",{className:"flex h-[350px] items-end justify-center overflow-x-hidden px-4 pb-24"},A.default.createElement(m.default,{variants:{hidden:{opacity:0,scale:1.5},visible:{opacity:1,scale:1}},transition:{duration:.3,ease:"easeInOut"},viewOptions:{margin:"0px 0px -350px 0px"}},A.default.createElement("div",{className:"w-full bg-zinc-100 p-4"},A.default.createElement("p",{className:"text-zinc-600"},A.default.createElement("strong",{className:"font-medium"},"\u54EA\u5412\uFF1A"),"\u4F60\u662F\u6211\u552F\u4E00\u7684\u5144\u5F1F\uFF0C\u6211\u4E0D\u8BB8\u4F60\u6B7B\uFF01")))))},d=r.default=t},66607:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=g(e(96540)),d=e(21126),C=o(e(71508));function g(p,i){if(typeof WeakMap=="function")var u=new WeakMap,n=new WeakMap;return(g=function(s,c){if(!c&&s&&s.__esModule)return s;var E,l,f={__proto__:null,default:s};if(s===null||A(s)!="object"&&typeof s!="function")return f;if(E=c?n:u){if(E.has(s))return E.get(s);E.set(s,f)}for(var _ in s)_!=="default"&&{}.hasOwnProperty.call(s,_)&&((l=(E=Object.defineProperty)&&Object.getOwnPropertyDescriptor(s,_))&&(l.get||l.set)?E(f,_,l):f[_]=s[_]);return f})(p,i)}var h=function(i){var u=i.text,n=i.speed,a=n===void 0?50:n,s=i.initialDelay,c=s===void 0?0:s,E=i.waitTime,l=E===void 0?2e3:E,f=i.deleteSpeed,_=f===void 0?30:f,y=i.loop,B=y===void 0?!0:y,O=i.className,D=i.showCursor,M=D===void 0?!0:D,P=i.hideCursorOnType,I=P===void 0?!1:P,T=i.cursorChar,U=T===void 0?"|":T,R=i.cursorClassName,w=R===void 0?"ml-1":R,L=i.cursorAnimationVariants,z=L===void 0?{initial:{opacity:0},animate:{opacity:1,transition:{duration:.01,repeat:1/0,repeatDelay:.4,repeatType:"reverse"}}}:L,F=(0,t.useState)(""),k=(0,m.default)(F,2),N=k[0],V=k[1],X=(0,t.useState)(0),$=(0,m.default)(X,2),Y=$[0],re=$[1],ue=(0,t.useState)(!1),pe=(0,m.default)(ue,2),Ae=pe[0],ye=pe[1],ne=(0,t.useState)(0),G=(0,m.default)(ne,2),ae=G[0],oe=G[1],q=Array.isArray(u)?u:[u];return(0,t.useEffect)(function(){var J,de=q[ae],ee=function(){if(Ae)if(N===""){if(ye(!1),ae===q.length-1&&!B)return;oe(function(Ee){return(Ee+1)%q.length}),re(0),J=setTimeout(function(){},l)}else J=setTimeout(function(){V(function(Ee){return Ee.slice(0,-1)})},_);else Y<de.length?J=setTimeout(function(){V(function(Ee){return Ee+de[Y]}),re(function(Ee){return Ee+1})},a):q.length>1&&(J=setTimeout(function(){ye(!0)},l))};return Y===0&&!Ae&&N===""?J=setTimeout(ee,c):ee(),function(){return clearTimeout(J)}},[Y,N,Ae,a,_,l,q,ae,B]),t.default.createElement("div",{className:"inline tracking-tight whitespace-pre-wrap ".concat(O)},t.default.createElement("span",null,N),M&&t.default.createElement(d.motion.span,{variants:z,className:(0,C.default)(w,I&&(Y<q[ae].length||Ae)?"hidden":""),initial:"initial",animate:"animate"},U))},v=r.default=h},67554:function(x){"use strict";x.exports="data:image/jpeg;base64,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"},69363:function(x,r,e){"use strict";var o=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=t(e(96540)),m=e(21126);function t(h,v){if(typeof WeakMap=="function")var p=new WeakMap,i=new WeakMap;return(t=function(n,a){if(!a&&n&&n.__esModule)return n;var s,c,E={__proto__:null,default:n};if(n===null||o(n)!="object"&&typeof n!="function")return E;if(s=a?i:p){if(s.has(n))return s.get(n);s.set(n,E)}for(var l in n)l!=="default"&&{}.hasOwnProperty.call(n,l)&&((c=(s=Object.defineProperty)&&Object.getOwnPropertyDescriptor(n,l))&&(c.get||c.set)?s(E,l,c):E[l]=n[l]);return E})(h,v)}var d={hidden:{opacity:0},visible:{opacity:1}},C=function(v){var p=v.children,i=v.variants,u=i===void 0?d:i,n=v.transition,a=v.viewOptions,s=v.as,c=s===void 0?"div":s,E=(0,A.useRef)(null),l=(0,m.useInView)(E,a),f=m.motion[c];return A.default.createElement(f,{ref:E,initial:"hidden",animate:l?"visible":"hidden",variants:u,transition:n},p)},g=r.default=C},69849:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(43693)),m=o(e(96540)),t=e(21126),d=o(e(71508));function C(p,i){var u=Object.keys(p);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(p);i&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(p,a).enumerable})),u.push.apply(u,n)}return u}function g(p){for(var i=1;i<arguments.length;i++){var u=arguments[i]!=null?arguments[i]:{};i%2?C(Object(u),!0).forEach(function(n){(0,A.default)(p,n,u[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(p,Object.getOwnPropertyDescriptors(u)):C(Object(u)).forEach(function(n){Object.defineProperty(p,n,Object.getOwnPropertyDescriptor(u,n))})}return p}var h=function(i){var u=i.className,n=i.size,a=n===void 0?50:n,s=i.delay,c=s===void 0?0:s,E=i.duration,l=E===void 0?6:E,f=i.colorFrom,_=f===void 0?"#ffaa40":f,y=i.colorTo,B=y===void 0?"#9c40ff":y,O=i.transition,D=i.style,M=i.reverse,P=M===void 0?!1:M,I=i.initialOffset,T=I===void 0?0:I;return m.default.createElement("div",{className:"pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] [mask-composite:intersect] [mask-clip:padding-box,border-box]"},m.default.createElement(t.motion.div,{className:(0,d.default)("absolute aspect-square","bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",u),style:g({width:a,offsetPath:"rect(0 auto auto 0 round ".concat(a,"px)"),"--color-from":_,"--color-to":B},D),initial:{offsetDistance:"".concat(T,"%")},animate:{offsetDistance:P?["".concat(100-T,"%"),"".concat(-T,"%")]:["".concat(T,"%"),"".concat(100+T,"%")]},transition:g({repeat:1/0,ease:"linear",duration:l,delay:-c},O)}))},v=r.default=h},70694:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.LoadingText=g,r.default=void 0;var m=o(e(85715)),t=C(e(96540)),d=e(21126);function C(p,i){if(typeof WeakMap=="function")var u=new WeakMap,n=new WeakMap;return(C=function(s,c){if(!c&&s&&s.__esModule)return s;var E,l,f={__proto__:null,default:s};if(s===null||A(s)!="object"&&typeof s!="function")return f;if(E=c?n:u){if(E.has(s))return E.get(s);E.set(s,f)}for(var _ in s)_!=="default"&&{}.hasOwnProperty.call(s,_)&&((l=(E=Object.defineProperty)&&Object.getOwnPropertyDescriptor(s,_))&&(l.get||l.set)?E(f,_,l):f[_]=s[_]);return f})(p,i)}function g(p){var i=p.text,u=p.dots;return t.default.createElement("div",{className:"relative"},t.default.createElement(d.AnimatePresence,{mode:"wait"},t.default.createElement(d.motion.div,{key:i,initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.3},className:"w-full text-lg font-medium"},i,u)))}var h=function(i){var u=i.messages,n=i.interval,a=n===void 0?2e3:n,s=i.dotCount,c=s===void 0?3:s,E=i.direction,l=E===void 0?"vertical":E,f=(0,t.useState)(0),_=(0,m.default)(f,2),y=_[0],B=_[1],O=(0,t.useState)(""),D=(0,m.default)(O,2),M=D[0],P=D[1];return(0,t.useEffect)(function(){var I=setInterval(function(){B(function(U){return(U+1)%u.length})},a),T=setInterval(function(){P(function(U){return U.length>=c?"":"".concat(U,".")})},500);return function(){clearInterval(I),clearInterval(T)}},[u.length,a,c]),l==="horizontal"?t.default.createElement("div",{className:"flex w-full items-center justify-start gap-3 rounded-xs border px-3 py-2"},t.default.createElement(d.motion.div,{className:"text-primary-foreground size-5 rounded-full border-[3px] border-t-transparent md:size-6",animate:{rotate:360},transition:{duration:1,repeat:Number.POSITIVE_INFINITY,ease:"linear"}}),t.default.createElement(g,{text:u[y],dots:M})):t.default.createElement("div",{className:"flex flex-col items-center justify-center gap-4 py-1"},t.default.createElement(d.motion.div,{className:"text-primary-foreground size-10 rounded-full border-[3px] border-t-transparent md:size-12",animate:{rotate:360},transition:{duration:1,repeat:Number.POSITIVE_INFINITY,ease:"linear"}}),t.default.createElement(g,{text:u[y],dots:M}))},v=r.default=h},76043:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(88362),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},78236:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=o(e(53179)),t=function(){return A.default.createElement("div",{className:"".concat(m.default.placeholder," ").concat(m.default.shimmer)},A.default.createElement("div",{className:m.default["faux-image-wrapper"]},A.default.createElement("div",{className:m.default["faux-image"]})),A.default.createElement("div",{className:m.default["faux-text"]}),A.default.createElement("div",{className:"".concat(m.default["faux-text"]," ").concat(m.default.short)}),A.default.createElement("div",{className:"".concat(m.default["faux-text"]," ").concat(m.default["min-short"])}))},d=r.default=t},78345:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=o(e(64508)),t=function(g){var h=g.text;return A.default.createElement("span",{className:m.default.lineBordered},h)},d=r.default=t},79204:function(x){"use strict";x.exports="data:image/jpeg;base64,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"},79901:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.avatarCard--kIii3 {\r
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
`],sourceRoot:""}]),d.locals={avatarCard:"avatarCard--kIii3",card:"card--W_bZq",content:"content--yiHmV"},r.A=d},80791:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.lineBordered--bh05r {\r
  border: none;\r
  outline: none;\r
  position: relative;\r
}\r
\r
.lineBordered--bh05r::before,\r
.lineBordered--bh05r::after {\r
  border: 0 solid transparent;\r
  transition: all 0.3s;\r
  content: '';\r
  height: 0;\r
  position: absolute;\r
  width: 24px;\r
}\r
\r
.lineBordered--bh05r::before {\r
  border-top: 2px solid #4f7df3;\r
  right: 0;\r
  top: -4px;\r
}\r
\r
.lineBordered--bh05r::after {\r
  border-bottom: 2px solid #4f7df3;\r
  bottom: -4px;\r
  left: 0;\r
}\r
\r
.lineBordered--bh05r:hover::before,\r
.lineBordered--bh05r:hover::after {\r
  width: 100%;\r
}\r
\r
.hover-underline-animation--TSfGP {\r
  display: inline-block;\r
  position: relative;\r
}\r
\r
.hover-underline-animation--TSfGP::after {\r
  content: '';\r
  position: absolute;\r
  width: 100%;\r
  transform: scaleX(0);\r
  height: 2px;\r
  bottom: 0;\r
  left: 0;\r
  background-color: #0087ca;\r
  transition: transform 0.25s ease-out;\r
}\r
\r
.hover-underline-animation--TSfGP:hover::after {\r
  transform: scaleX(1);\r
}\r
\r
.hover-underline-animation--TSfGP.left--ErwKf::after {\r
  transform-origin: bottom right;\r
}\r
\r
.hover-underline-animation--TSfGP.left--ErwKf:hover::after {\r
  transform-origin: bottom left;\r
}\r
\r
.hover-underline-animation--TSfGP.center--BFLFI::after {\r
  transform-origin: bottom center;\r
}\r
\r
.hover-underline-animation--TSfGP.center--BFLFI:hover::after {\r
  transform-origin: bottom center;\r
}\r
\r
.hover-underline-animation--TSfGP.right--DRVwU::after {\r
  transform-origin: bottom left;\r
}\r
\r
.hover-underline-animation--TSfGP.right--DRVwU:hover::after {\r
  transform-origin: bottom right;\r
}\r
\r
.dynamic-shadow--Us2nj {\r
  position: relative;\r
  width: 10rem;\r
  height: 10rem;\r
  background: linear-gradient(75deg, #f953c6, #b91d73);\r
}\r
\r
.dynamic-shadow--Us2nj::after {\r
  content: '';\r
  width: 100%;\r
  height: 100%;\r
  position: absolute;\r
  background: inherit;\r
  top: 0.5rem;\r
  filter: blur(0.4rem);\r
  opacity: 0.7;\r
  z-index: -1;\r
}\r
\r
.image-contain--Z_yfM {\r
  object-fit: contain;\r
  object-position: center;\r
}\r
\r
.image-cover--ZVSiS {\r
  object-fit: cover;\r
  object-position: right top;\r
}\r
\r
.image-cover--ZVSiS p:first-child::first-letter {\r
  color: #5f79ff;\r
  float: left;\r
  margin: 0 8px 0 4px;\r
  font-size: 3rem;\r
  font-weight: bold;\r
  line-height: 1;\r
}\r
\r
.container--lADY1 {\r
  position: relative;\r
  background: #fff;\r
  padding: 15px;\r
  border: 1px solid #ccc;\r
  margin-top: 20px;\r
  border-radius: 8px;\r
  text-align: center;\r
}\r
\r
.container--lADY1::before,\r
.container--lADY1::after {\r
  content: '';\r
  position: absolute;\r
  border: 11px solid transparent;\r
}\r
\r
.container--lADY1::after {\r
  border: 10px solid transparent;\r
}\r
\r
.container--lADY1.top--XQMfF::before,\r
.container--lADY1.top--XQMfF::after {\r
  bottom: 100%;\r
  left: 19px;\r
  border-bottom-color: #ccc;\r
}\r
\r
.container--lADY1.top--XQMfF::after {\r
  left: 20px;\r
  border-bottom-color: #fff;\r
}\r
\r
.container--lADY1.bottom--P1bZI::before,\r
.container--lADY1.bottom--P1bZI::after {\r
  top: 100%;\r
  right: 19px;\r
  border-top-color: #ccc;\r
}\r
\r
.container--lADY1.bottom--P1bZI::after {\r
  right: 20px;\r
  border-top-color: #fff;\r
}\r
\r
.no-scrollbars--AUOMQ {\r
  overflow: auto;\r
  scrollbar-width: none;\r
}\r
\r
.no-scrollbars--AUOMQ::-webkit-scrollbar {\r
  display: none;\r
}\r
\r
.engraved-text--dMPwS {\r
  background-color: #666;\r
  -webkit-background-clip: text;\r
          background-clip: text;\r
  color: transparent;\r
  text-shadow: 3px 5px 1px rgb(245 245 245 / 50%);\r
}\r
\r
.embossed-text--eQZ0_ {\r
  color: #f0f0f0;\r
  background-color: #666;\r
  text-shadow: 1px 4px 4px #555;\r
  -webkit-background-clip: text;\r
          background-clip: text;\r
}\r
\r
:root {\r
  /* ease-in corresponds to cubic-bezier(0.42, 0, 1.0, 1.0) */\r
  --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);\r
  --ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r
  --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);\r
  --ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);\r
  --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);\r
  --ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);\r
\r
  /* ease-out corresponds to cubic-bezier(0, 0, 0.58, 1.0) */\r
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);\r
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);\r
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);\r
  --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);\r
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);\r
  --ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);\r
\r
  /* ease-in-out corresponds to cubic-bezier(0.42, 0, 0.58, 1.0) */\r
  --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);\r
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);\r
  --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);\r
  --ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);\r
  --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);\r
  --ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/LineBordered/index.module.less"],names:[],mappings:"AAAA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB;;AAEA;;EAEE,2BAA2B;EAC3B,oBAAoB;EACpB,WAAW;EACX,SAAS;EACT,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,6BAA6B;EAC7B,QAAQ;EACR,SAAS;AACX;;AAEA;EACE,gCAAgC;EAChC,YAAY;EACZ,OAAO;AACT;;AAEA;;EAEE,WAAW;AACb;;AAEA;EACE,qBAAqB;EACrB,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,WAAW;EACX,oBAAoB;EACpB,WAAW;EACX,SAAS;EACT,OAAO;EACP,yBAAyB;EACzB,oCAAoC;AACtC;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,oDAAoD;AACtD;;AAEA;EACE,WAAW;EACX,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,WAAW;EACX,oBAAoB;EACpB,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,iBAAiB;EACjB,0BAA0B;AAC5B;;AAEA;EACE,cAAc;EACd,WAAW;EACX,mBAAmB;EACnB,eAAe;EACf,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;;EAEE,WAAW;EACX,kBAAkB;EAClB,8BAA8B;AAChC;;AAEA;EACE,8BAA8B;AAChC;;AAEA;;EAEE,YAAY;EACZ,UAAU;EACV,yBAAyB;AAC3B;;AAEA;EACE,UAAU;EACV,yBAAyB;AAC3B;;AAEA;;EAEE,SAAS;EACT,WAAW;EACX,sBAAsB;AACxB;;AAEA;EACE,WAAW;EACX,sBAAsB;AACxB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,sBAAsB;EACtB,6BAAqB;UAArB,qBAAqB;EACrB,kBAAkB;EAClB,+CAA+C;AACjD;;AAEA;EACE,cAAc;EACd,sBAAsB;EACtB,6BAA6B;EAC7B,6BAAqB;UAArB,qBAAqB;AACvB;;AAEA;EACE,2DAA2D;EAC3D,qDAAqD;EACrD,uDAAuD;EACvD,uDAAuD;EACvD,uDAAuD;EACvD,sDAAsD;EACtD,oDAAoD;;EAEpD,0DAA0D;EAC1D,qDAAqD;EACrD,qDAAqD;EACrD,oDAAoD;EACpD,gDAAgD;EAChD,+CAA+C;EAC/C,oDAAoD;;EAEpD,gEAAgE;EAChE,2DAA2D;EAC3D,yDAAyD;EACzD,oDAAoD;EACpD,mDAAmD;EACnD,4CAA4C;EAC5C,0DAA0D;AAC5D",sourcesContent:[`.lineBordered {\r
  border: none;\r
  outline: none;\r
  position: relative;\r
}\r
\r
.lineBordered::before,\r
.lineBordered::after {\r
  border: 0 solid transparent;\r
  transition: all 0.3s;\r
  content: '';\r
  height: 0;\r
  position: absolute;\r
  width: 24px;\r
}\r
\r
.lineBordered::before {\r
  border-top: 2px solid #4f7df3;\r
  right: 0;\r
  top: -4px;\r
}\r
\r
.lineBordered::after {\r
  border-bottom: 2px solid #4f7df3;\r
  bottom: -4px;\r
  left: 0;\r
}\r
\r
.lineBordered:hover::before,\r
.lineBordered:hover::after {\r
  width: 100%;\r
}\r
\r
.hover-underline-animation {\r
  display: inline-block;\r
  position: relative;\r
}\r
\r
.hover-underline-animation::after {\r
  content: '';\r
  position: absolute;\r
  width: 100%;\r
  transform: scaleX(0);\r
  height: 2px;\r
  bottom: 0;\r
  left: 0;\r
  background-color: #0087ca;\r
  transition: transform 0.25s ease-out;\r
}\r
\r
.hover-underline-animation:hover::after {\r
  transform: scaleX(1);\r
}\r
\r
.hover-underline-animation.left::after {\r
  transform-origin: bottom right;\r
}\r
\r
.hover-underline-animation.left:hover::after {\r
  transform-origin: bottom left;\r
}\r
\r
.hover-underline-animation.center::after {\r
  transform-origin: bottom center;\r
}\r
\r
.hover-underline-animation.center:hover::after {\r
  transform-origin: bottom center;\r
}\r
\r
.hover-underline-animation.right::after {\r
  transform-origin: bottom left;\r
}\r
\r
.hover-underline-animation.right:hover::after {\r
  transform-origin: bottom right;\r
}\r
\r
.dynamic-shadow {\r
  position: relative;\r
  width: 10rem;\r
  height: 10rem;\r
  background: linear-gradient(75deg, #f953c6, #b91d73);\r
}\r
\r
.dynamic-shadow::after {\r
  content: '';\r
  width: 100%;\r
  height: 100%;\r
  position: absolute;\r
  background: inherit;\r
  top: 0.5rem;\r
  filter: blur(0.4rem);\r
  opacity: 0.7;\r
  z-index: -1;\r
}\r
\r
.image-contain {\r
  object-fit: contain;\r
  object-position: center;\r
}\r
\r
.image-cover {\r
  object-fit: cover;\r
  object-position: right top;\r
}\r
\r
.image-cover p:first-child::first-letter {\r
  color: #5f79ff;\r
  float: left;\r
  margin: 0 8px 0 4px;\r
  font-size: 3rem;\r
  font-weight: bold;\r
  line-height: 1;\r
}\r
\r
.container {\r
  position: relative;\r
  background: #fff;\r
  padding: 15px;\r
  border: 1px solid #ccc;\r
  margin-top: 20px;\r
  border-radius: 8px;\r
  text-align: center;\r
}\r
\r
.container::before,\r
.container::after {\r
  content: '';\r
  position: absolute;\r
  border: 11px solid transparent;\r
}\r
\r
.container::after {\r
  border: 10px solid transparent;\r
}\r
\r
.container.top::before,\r
.container.top::after {\r
  bottom: 100%;\r
  left: 19px;\r
  border-bottom-color: #ccc;\r
}\r
\r
.container.top::after {\r
  left: 20px;\r
  border-bottom-color: #fff;\r
}\r
\r
.container.bottom::before,\r
.container.bottom::after {\r
  top: 100%;\r
  right: 19px;\r
  border-top-color: #ccc;\r
}\r
\r
.container.bottom::after {\r
  right: 20px;\r
  border-top-color: #fff;\r
}\r
\r
.no-scrollbars {\r
  overflow: auto;\r
  scrollbar-width: none;\r
}\r
\r
.no-scrollbars::-webkit-scrollbar {\r
  display: none;\r
}\r
\r
.engraved-text {\r
  background-color: #666;\r
  background-clip: text;\r
  color: transparent;\r
  text-shadow: 3px 5px 1px rgb(245 245 245 / 50%);\r
}\r
\r
.embossed-text {\r
  color: #f0f0f0;\r
  background-color: #666;\r
  text-shadow: 1px 4px 4px #555;\r
  background-clip: text;\r
}\r
\r
:root {\r
  /* ease-in corresponds to cubic-bezier(0.42, 0, 1.0, 1.0) */\r
  --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);\r
  --ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r
  --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);\r
  --ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);\r
  --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);\r
  --ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);\r
\r
  /* ease-out corresponds to cubic-bezier(0, 0, 0.58, 1.0) */\r
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);\r
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);\r
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);\r
  --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);\r
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);\r
  --ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);\r
\r
  /* ease-in-out corresponds to cubic-bezier(0.42, 0, 0.58, 1.0) */\r
  --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);\r
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);\r
  --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);\r
  --ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);\r
  --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);\r
  --ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);\r
}\r
`],sourceRoot:""}]),d.locals={lineBordered:"lineBordered--bh05r","hover-underline-animation":"hover-underline-animation--TSfGP",hoverUnderlineAnimation:"hover-underline-animation--TSfGP",left:"left--ErwKf",center:"center--BFLFI",right:"right--DRVwU","dynamic-shadow":"dynamic-shadow--Us2nj",dynamicShadow:"dynamic-shadow--Us2nj","image-contain":"image-contain--Z_yfM",imageContain:"image-contain--Z_yfM","image-cover":"image-cover--ZVSiS",imageCover:"image-cover--ZVSiS",container:"container--lADY1",top:"top--XQMfF",bottom:"bottom--P1bZI","no-scrollbars":"no-scrollbars--AUOMQ",noScrollbars:"no-scrollbars--AUOMQ","engraved-text":"engraved-text--dMPwS",engravedText:"engraved-text--dMPwS","embossed-text":"embossed-text--eQZ0_",embossedText:"embossed-text--eQZ0_"},r.A=d},82547:function(x){"use strict";x.exports="data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 4%27%3E%3Cstyle type=%27text/css%27%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX%280%29;}to {transform:translateX%28-15px%29;}}%3C/style%3E%3Cpath fill=%27none%27 stroke=%27%230087ca%27 stroke-width=%272%27 class=%27squiggle%27 d=%27M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3%27/%3E%3C/svg%3E"},82660:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=g(e(96540)),d=o(e(71508)),C=e(21126);function g(p,i){if(typeof WeakMap=="function")var u=new WeakMap,n=new WeakMap;return(g=function(s,c){if(!c&&s&&s.__esModule)return s;var E,l,f={__proto__:null,default:s};if(s===null||A(s)!="object"&&typeof s!="function")return f;if(E=c?n:u){if(E.has(s))return E.get(s);E.set(s,f)}for(var _ in s)_!=="default"&&{}.hasOwnProperty.call(s,_)&&((l=(E=Object.defineProperty)&&Object.getOwnPropertyDescriptor(s,_))&&(l.get||l.set)?E(f,_,l):f[_]=s[_]);return f})(p,i)}var h=function(i){var u=i.width,n=i.height,a=i.minScratchPercentage,s=a===void 0?50:a,c=i.onComplete,E=i.children,l=i.className,f=(0,t.useRef)(null),_=(0,t.useState)(!1),y=(0,m.default)(_,2),B=y[0],O=y[1],D=(0,t.useState)(!1),M=(0,m.default)(D,2),P=M[0],I=M[1],T=(0,C.useAnimation)();(0,t.useEffect)(function(){var F=f.current,k=F==null?void 0:F.getContext("2d");if(F&&k){var N=k.createLinearGradient(0,0,F.width,F.height);N.addColorStop(0,"#A97CF8"),N.addColorStop(.5,"#F38CB8"),N.addColorStop(1,"#FDCC92"),k.fillStyle=N,k.fillRect(0,0,F.width,F.height)}},[]),(0,t.useEffect)(function(){var F=function($){B&&w($.clientX,$.clientY)},k=function($){if(B){var Y=$.touches[0];w(Y.clientX,Y.clientY)}},N=function(){O(!1),L()},V=function(){O(!1),L()};return document.addEventListener("mousedown",F),document.addEventListener("mousemove",F),document.addEventListener("touchstart",k),document.addEventListener("touchmove",k),document.addEventListener("mouseup",N),document.addEventListener("touchend",V),document.addEventListener("touchcancel",V),function(){document.removeEventListener("mousedown",F),document.removeEventListener("mousemove",F),document.removeEventListener("touchstart",k),document.removeEventListener("touchmove",k),document.removeEventListener("mouseup",N),document.removeEventListener("touchend",V),document.removeEventListener("touchcancel",V)}},[B]);var U=function(){return O(!0)},R=function(){return O(!0)},w=function(k,N){var V=f.current,X=V==null?void 0:V.getContext("2d");if(V&&X){var $=V.getBoundingClientRect(),Y=k-$.left+16,re=N-$.top+16;X.globalCompositeOperation="destination-out",X.beginPath(),X.arc(Y,re,30,0,Math.PI*2),X.fill()}},L=function(){if(!P){var k=f.current,N=k==null?void 0:k.getContext("2d");if(k&&N){for(var V=N.getImageData(0,0,k.width,k.height),X=V.data,$=X.length/4,Y=0,re=3;re<X.length;re+=4)X[re]===0&&Y++;var ue=Y/$*100;ue>=s&&(I(!0),N.clearRect(0,0,k.width,k.height),z(),c&&c())}}},z=function(){T.start({scale:[1,1.5,1],rotate:[0,10,-10,10,-10,0],transition:{duration:.5}})};return t.default.createElement(C.motion.div,{className:(0,d.default)("relative select-none",l),style:{width:u,height:n,cursor:"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNSIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MXB4OyIgLz4KPC9zdmc+'), auto"},animate:T},t.default.createElement("canvas",{ref:f,width:u,height:n,className:"absolute top-0 left-0",onMouseDown:U,onTouchStart:R}),E)},v=r.default=h},83152:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(43693)),t=o(e(85715)),d=C(e(96540));function C(E,l){if(typeof WeakMap=="function")var f=new WeakMap,_=new WeakMap;return(C=function(B,O){if(!O&&B&&B.__esModule)return B;var D,M,P={__proto__:null,default:B};if(B===null||A(B)!="object"&&typeof B!="function")return P;if(D=O?_:f){if(D.has(B))return D.get(B);D.set(B,P)}for(var I in B)I!=="default"&&{}.hasOwnProperty.call(B,I)&&((M=(D=Object.defineProperty)&&Object.getOwnPropertyDescriptor(B,I))&&(M.get||M.set)?D(P,I,M):P[I]=B[I]);return P})(E,l)}function g(E,l){var f=Object.keys(E);if(Object.getOwnPropertySymbols){var _=Object.getOwnPropertySymbols(E);l&&(_=_.filter(function(y){return Object.getOwnPropertyDescriptor(E,y).enumerable})),f.push.apply(f,_)}return f}function h(E){for(var l=1;l<arguments.length;l++){var f=arguments[l]!=null?arguments[l]:{};l%2?g(Object(f),!0).forEach(function(_){(0,m.default)(E,_,f[_])}):Object.getOwnPropertyDescriptors?Object.defineProperties(E,Object.getOwnPropertyDescriptors(f)):g(Object(f)).forEach(function(_){Object.defineProperty(E,_,Object.getOwnPropertyDescriptor(f,_))})}return E}var v=function(l){var f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"0px",_=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,y=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1,B=(0,d.useState)(!0),O=(0,t.default)(B,2),D=O[0],M=O[1],P=(0,d.useRef)(null);return(0,d.useEffect)(function(){return P.current=new IntersectionObserver(function(I){var T=(0,t.default)(I,1),U=T[0];U.isIntersecting&&U.intersectionRatio>=_?(M(!0),y&&P.current.disconnect()):M(!1)},{rootMargin:f,threshold:_}),l.current&&P.current.observe(l.current),function(){l.current&&P.current.unobserve(l.current)}},[l,f,_,y]),D},p=function(l){var f=l.from,_=l.to,y=l.rootMargin,B=l.threshold,O=l.triggerOnce,D=l.children,M=(0,d.useRef)(null),P=v(M,y,B,O),I={transition:"1000ms ease-in-out"};return d.default.createElement("div",{ref:M,style:P?h(h({},I),_):h(h({},I),f)},D)},i=function(l){var f=l.rootMargin,_=f===void 0?"0px":f,y=l.threshold,B=y===void 0?0:y,O=l.triggerOnce,D=O===void 0?!1:O,M=l.children;return d.default.createElement(p,{from:{opacity:0},to:{opacity:1},rootMargin:_,threshold:B,triggerOnce:D},M)},u=function(l){var f=l.rootMargin,_=f===void 0?"0px":f,y=l.threshold,B=y===void 0?0:y,O=l.triggerOnce,D=O===void 0?!1:O,M=l.children;return d.default.createElement(p,{from:{opacity:0,translate:"0 2rem"},to:{opacity:1,translate:"none"},rootMargin:_,threshold:B,triggerOnce:D},M)},n=function(l){var f=l.rootMargin,_=f===void 0?"0px":f,y=l.threshold,B=y===void 0?0:y,O=l.triggerOnce,D=O===void 0?!1:O,M=l.children;return d.default.createElement(p,{from:{scale:"0"},to:{scale:"1"},rootMargin:_,threshold:B,triggerOnce:D},M)},a=function(l){var f=l.from,_=l.to,y=l.rootMargin,B=y===void 0?"0px":y,O=l.threshold,D=O===void 0?0:O,M=l.triggerOnce,P=M===void 0?!1:M,I=l.children;return d.default.createElement(p,{from:f,to:_,rootMargin:B,threshold:D,triggerOnce:P},I)},s={FadeIn:i,FadeUp:u,ScaleIn:n,DiyAnimation:a},c=r.default=s},83386:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`/* section */\r
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
`],sourceRoot:""}]),d.locals={section:"section--p4kEt","section-center":"section-center--v_JIb",sectionCenter:"section-center--v_JIb","person-img":"person-img--TI6oK",personImg:"person-img--TI6oK",text:"text--KTqJ2",icon:"icon--BvtNK",prev:"prev--ZH0Iz",next:"next--fXhU_",activeSlide:"activeSlide--HRpnT",lastSlide:"lastSlide--ECyTb",nextSlide:"nextSlide--l7wCN",lastSlideRight:"lastSlideRight--Va86d",nextSlideRight:"nextSlideRight--rQmHZ"},r.A=d},84265:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(43693)),t=C(e(96540)),d=e(74848);function C(i,u){if(typeof WeakMap=="function")var n=new WeakMap,a=new WeakMap;return(C=function(c,E){if(!E&&c&&c.__esModule)return c;var l,f,_={__proto__:null,default:c};if(c===null||A(c)!="object"&&typeof c!="function")return _;if(l=E?a:n){if(l.has(c))return l.get(c);l.set(c,_)}for(var y in c)y!=="default"&&{}.hasOwnProperty.call(c,y)&&((f=(l=Object.defineProperty)&&Object.getOwnPropertyDescriptor(c,y))&&(f.get||f.set)?l(_,y,f):_[y]=c[y]);return _})(i,u)}function g(i,u){var n=Object.keys(i);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(i);u&&(a=a.filter(function(s){return Object.getOwnPropertyDescriptor(i,s).enumerable})),n.push.apply(n,a)}return n}function h(i){for(var u=1;u<arguments.length;u++){var n=arguments[u]!=null?arguments[u]:{};u%2?g(Object(n),!0).forEach(function(a){(0,m.default)(i,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach(function(a){Object.defineProperty(i,a,Object.getOwnPropertyDescriptor(n,a))})}return i}var v=function(u){return(0,d.jsxs)("svg",h(h({xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",width:"1em",height:"1em"},u),{},{children:[(0,d.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),(0,d.jsx)("path",{d:"M15 17.5c.32.32.754.5 1.207.5h.543c.69 0 1.25-.56 1.25-1.25v-.25a1.5 1.5 0 0 0-1.5-1.5 1.5 1.5 0 0 1-1.5-1.5v-.25c0-.69.56-1.25 1.25-1.25h.543c.453 0 .887.18 1.207.5M9 12h4M11 12v6"}),(0,d.jsx)("path",{d:"M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"})]}))},p=r.default=v},85042:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=o(e(35861)),t=function(g){var h=g.text,v=g.disabled,p=v===void 0?!1:v,i=g.speed,u=i===void 0?5:i,n=g.className,a=n===void 0?"":n,s="".concat(u,"s");return A.default.createElement("div",{className:"".concat(m.default.shinyText," ").concat(p?m.default.disabled:""," ").concat(a),style:{animationDuration:s}},h)},d=r.default=t},87257:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=o(e(26860)),t=function(){return A.default.createElement("div",{className:"relative flex flex-col items-center justify-center overflow-hidden"},A.default.createElement("div",{className:"not-prose my-5 w-full"},A.default.createElement("ul",{className:"flex w-full flex-wrap items-center justify-center gap-3"},A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"'use server'"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"useOptimistic"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"React Server Components"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"Concurrent Rendering"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"useActionState"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"Improved Hydration"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"Form Actions"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"Server Actions"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"Suspense"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"'use client'"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"useTransition"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"React Compiler"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"Streaming"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"useFormStatus"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"New React Hooks"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"use()"),A.default.createElement("li",{className:"flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium sm:h-12 sm:px-7 sm:text-lg dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal"},"Automatic Memoization"))),A.default.createElement("div",{className:m.default.mask}))},d=r.default=t},87834:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(52577),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},88362:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.breatheItem--VaM9v {\r
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
`],sourceRoot:""}]),d.locals={breatheItem:"breatheItem--VaM9v",breathe:"breathe--wA3l6",loopRotate:"loopRotate--GRmod",loop:"loop--Q7Ru6",outside:"outside--NZwXf",inner:"inner--ZClIQ",text:"text--FGKfx","play-button":"play-button--Wg3em",playButton:"play-button--Wg3em","zoom-in-zoom-out":"zoom-in-zoom-out--alaL8",zoomInZoomOut:"zoom-in-zoom-out--alaL8","div-block":"div-block--OwsxA",divBlock:"div-block--OwsxA","div-block-1019":"div-block-1019--iYyTM",divBlock1019:"div-block-1019--iYyTM","div-block-1021":"div-block-1021--EWkRm",divBlock1021:"div-block-1021--EWkRm",code:"code--Wc_Yz",trans:"trans--jcajC"},r.A=d},88462:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(57315),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},89493:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(24274),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},90064:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=r.Word=void 0;var A=o(e(41132)),m=o(e(96540)),t=e(21126),d=e(63734),C=o(e(33005)),g=function(c,E){return Math.round((0,d.mix)(c,E,Math.random()))},h=function(){return g(5,20)},v=function(){return g(20,100)},p=(0,A.default)(Array(3)).map(function(){return(0,A.default)(Array(h())).map(v)}),i=r.Word=function(c){var E=c.width;return m.default.createElement("div",{className:C.default.word,style:{width:E}})},u=function(c){var E=c.words;return m.default.createElement("div",{className:C.default.paragraph},E.map(function(l,f){return m.default.createElement(i,{key:f,width:l})}))},n=function(){return m.default.createElement(t.motion.div,{variants:{collapsed:{scale:.8},open:{scale:1}},initial:"collapsed",animate:"open",whileInView:!0,transition:{duration:.8},className:C.default.contentPlaceholder},m.default.createElement("section",null,m.default.createElement(i,{width:75}),m.default.createElement(i,{width:245}),m.default.createElement(i,{width:120})),p.map(function(c,E){return m.default.createElement(u,{key:E,words:c})}))},a=r.default=n},90467:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(54756)),m=o(e(29293)),t=o(e(85715)),d=e(96540),C=function(){var v=(0,d.useState)(null),p=(0,t.default)(v,2),i=p[0],u=p[1],n=function(){var a=(0,m.default)(A.default.mark(function s(c){return A.default.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,l.next=3,navigator.clipboard.writeText(c);case 3:u({state:"success"}),l.next=10;break;case 6:throw l.prev=6,l.t0=l.catch(0),u({state:"error",message:l.t0.message}),l.t0;case 10:return l.prev=10,setTimeout(function(){u(null)},2e3),l.finish(10);case 13:case"end":return l.stop()}},s,null,[[0,6,10,13]])}));return function(c){return a.apply(this,arguments)}}();return[n,i]},g=r.default=C},91757:function(x,r,e){"use strict";e.r(r);var o=e(85072),A=e.n(o),m=e(97825),t=e.n(m),d=e(77659),C=e.n(d),g=e(55056),h=e.n(g),v=e(10540),p=e.n(v),i=e(41113),u=e.n(i),n=e(91796),a={};a.styleTagTransform=u(),a.setAttributes=h(),a.insert=C().bind(null,"head"),a.domAPI=t(),a.insertStyleElement=p();var s=A()(n.A,a);r.default=n.A&&n.A.locals?n.A.locals:void 0},91796:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.squaresCanvas--eB4nW {\r
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
`],sourceRoot:""}]),d.locals={squaresCanvas:"squaresCanvas--eB4nW"},r.A=d},92188:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.cardEffect--cZUTZ {\r
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
`],sourceRoot:""}]),d.locals={cardEffect:"cardEffect--cZUTZ",spotlight:"spotlight--GQ6XV"},r.A=d},93018:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(43693)),t=C(e(96540)),d=e(74848);function C(i,u){if(typeof WeakMap=="function")var n=new WeakMap,a=new WeakMap;return(C=function(c,E){if(!E&&c&&c.__esModule)return c;var l,f,_={__proto__:null,default:c};if(c===null||A(c)!="object"&&typeof c!="function")return _;if(l=E?a:n){if(l.has(c))return l.get(c);l.set(c,_)}for(var y in c)y!=="default"&&{}.hasOwnProperty.call(c,y)&&((f=(l=Object.defineProperty)&&Object.getOwnPropertyDescriptor(c,y))&&(f.get||f.set)?l(_,y,f):_[y]=c[y]);return _})(i,u)}function g(i,u){var n=Object.keys(i);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(i);u&&(a=a.filter(function(s){return Object.getOwnPropertyDescriptor(i,s).enumerable})),n.push.apply(n,a)}return n}function h(i){for(var u=1;u<arguments.length;u++){var n=arguments[u]!=null?arguments[u]:{};u%2?g(Object(n),!0).forEach(function(a){(0,m.default)(i,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach(function(a){Object.defineProperty(i,a,Object.getOwnPropertyDescriptor(n,a))})}return i}var v=function(u){return(0,d.jsxs)("svg",h(h({xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",width:"1em",height:"1em"},u),{},{children:[(0,d.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),(0,d.jsx)("path",{d:"m5.428 17.245 6.076 3.471a1 1 0 0 0 .992 0l6.076-3.471a1 1 0 0 0 .495-.734l1.323-9.704a1 1 0 0 0-.658-1.078l-7.4-2.612a1 1 0 0 0-.665 0L4.268 5.73a1 1 0 0 0-.658 1.078l1.323 9.704a1 1 0 0 0 .495.734z"}),(0,d.jsx)("path",{d:"m9 15 3-8 3 8M10 13h4"})]}))},p=r.default=v},93868:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(85715)),t=C(e(96540)),d=o(e(89493));function C(v,p){if(typeof WeakMap=="function")var i=new WeakMap,u=new WeakMap;return(C=function(a,s){if(!s&&a&&a.__esModule)return a;var c,E,l={__proto__:null,default:a};if(a===null||A(a)!="object"&&typeof a!="function")return l;if(c=s?u:i){if(c.has(a))return c.get(a);c.set(a,l)}for(var f in a)f!=="default"&&{}.hasOwnProperty.call(a,f)&&((E=(c=Object.defineProperty)&&Object.getOwnPropertyDescriptor(a,f))&&(E.get||E.set)?c(l,f,E):l[f]=a[f]);return l})(v,p)}var g=function(p){var i=p.animText,u=i===void 0?"":i,n=u.split("")||[],a=(0,t.useState)("text-animate"),s=(0,m.default)(a,2),c=s[0],E=s[1];return(0,t.useEffect)(function(){setTimeout(function(){E("text-animate-hover")},3e3)},[]),t.default.createElement("span",null,n.map(function(l,f){return t.default.createElement("span",{key:l+f,style:{"--delay":f+1},className:d.default[c]},l)}))},h=r.default=g},94054:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.contentPlaceholder--vUdMy {\r
  padding: 20px;\r
  transform-origin: top center;\r
}\r
\r
.word--KIIET {\r
  height: 10px;\r
  border-radius: 5px;\r
  display: inline-block;\r
  margin-bottom: 4px;\r
  margin-right: 4px;\r
  background: #aaa;\r
}\r
\r
.paragraph--_FNyP {\r
  margin-bottom: 20px;\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/ContentPlaceholder/index.module.less"],names:[],mappings:"AAAA;EACE,aAAa;EACb,4BAA4B;AAC9B;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,qBAAqB;EACrB,kBAAkB;EAClB,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;AACrB",sourcesContent:[`.contentPlaceholder {\r
  padding: 20px;\r
  transform-origin: top center;\r
}\r
\r
.word {\r
  height: 10px;\r
  border-radius: 5px;\r
  display: inline-block;\r
  margin-bottom: 4px;\r
  margin-right: 4px;\r
  background: #aaa;\r
}\r
\r
.paragraph {\r
  margin-bottom: 20px;\r
}\r
`],sourceRoot:""}]),d.locals={contentPlaceholder:"contentPlaceholder--vUdMy",word:"word--KIIET",paragraph:"paragraph--_FNyP"},r.A=d},94143:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(54756)),t=o(e(29293)),d=o(e(85715)),C=i(e(96540)),g=i(e(24396)),h=e(64193),v=o(e(71508)),p=e(21126);function i(a,s){if(typeof WeakMap=="function")var c=new WeakMap,E=new WeakMap;return(i=function(f,_){if(!_&&f&&f.__esModule)return f;var y,B,O={__proto__:null,default:f};if(f===null||A(f)!="object"&&typeof f!="function")return O;if(y=_?E:c){if(y.has(f))return y.get(f);y.set(f,O)}for(var D in f)D!=="default"&&{}.hasOwnProperty.call(f,D)&&((B=(y=Object.defineProperty)&&Object.getOwnPropertyDescriptor(f,D))&&(B.get||B.set)?y(O,D,B):O[D]=f[D]);return O})(a,s)}var u=function(s){var c=s.id,E=s.className,l=s.background,f=s.minSize,_=s.maxSize,y=s.speed,B=s.particleColor,O=s.particleDensity,D=(0,C.useState)(!1),M=(0,d.default)(D,2),P=M[0],I=M[1];(0,C.useEffect)(function(){(0,g.initParticlesEngine)(function(){var w=(0,t.default)(m.default.mark(function L(z){return m.default.wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.next=2,(0,h.loadSlim)(z);case 2:case"end":return k.stop()}},L)}));return function(L){return w.apply(this,arguments)}}()).then(function(){I(!0)})},[]);var T=(0,p.useAnimation)(),U=function(){var w=(0,t.default)(m.default.mark(function L(z){return m.default.wrap(function(k){for(;;)switch(k.prev=k.next){case 0:z&&T.start({opacity:1,transition:{duration:1}});case 1:case"end":return k.stop()}},L)}));return function(z){return w.apply(this,arguments)}}(),R=(0,C.useId)();return C.default.createElement(p.motion.div,{animate:T,className:(0,v.default)("opacity-0",E)},P&&C.default.createElement(g.default,{id:c||R,className:(0,v.default)("h-full w-full"),particlesLoaded:U,options:{background:{color:{value:l||"#0d47a1"}},fullScreen:{enable:!1,zIndex:1},fpsLimit:120,interactivity:{events:{onClick:{enable:!0,mode:"push"},onHover:{enable:!1,mode:"repulse"},resize:!0},modes:{push:{quantity:4},repulse:{distance:200,duration:.4}}},particles:{bounce:{horizontal:{value:1},vertical:{value:1}},collisions:{absorb:{speed:2},bounce:{horizontal:{value:1},vertical:{value:1}},enable:!1,maxSpeed:50,mode:"bounce",overlap:{enable:!0,retries:0}},color:{value:B||"#ffffff",animation:{h:{count:0,enable:!1,speed:1,decay:0,delay:0,sync:!0,offset:0},s:{count:0,enable:!1,speed:1,decay:0,delay:0,sync:!0,offset:0},l:{count:0,enable:!1,speed:1,decay:0,delay:0,sync:!0,offset:0}}},effect:{close:!0,fill:!0,options:{},type:{}},groups:{},move:{angle:{offset:0,value:90},attract:{distance:200,enable:!1,rotate:{x:3e3,y:3e3}},center:{x:50,y:50,mode:"percent",radius:0},decay:0,distance:{},direction:"none",drift:0,enable:!0,gravity:{acceleration:9.81,enable:!1,inverse:!1,maxSpeed:50},path:{clamp:!0,delay:{value:0},enable:!1,options:{}},outModes:{default:"out"},random:!1,size:!1,speed:{min:.1,max:1},spin:{acceleration:0,enable:!1},straight:!1,trail:{enable:!1,length:10,fill:{}},vibrate:!1,warp:!1},number:{density:{enable:!0,width:400,height:400},limit:{mode:"delete",value:0},value:O||120},opacity:{value:{min:.1,max:1},animation:{count:0,enable:!0,speed:y||4,decay:0,delay:0,sync:!1,mode:"auto",startValue:"random",destroy:"none"}},reduceDuplicates:!1,shadow:{blur:0,color:{value:"#000"},enable:!1,offset:{x:0,y:0}},shape:{close:!0,fill:!0,options:{},type:"circle"},size:{value:{min:f||1,max:_||3},animation:{count:0,enable:!1,speed:5,decay:0,delay:0,sync:!1,mode:"auto",startValue:"random",destroy:"none"}},stroke:{width:0},zIndex:{value:0,opacityRate:1,sizeRate:1,velocityRate:1},destroy:{bounds:{},mode:"none",split:{count:1,factor:{value:3},rate:{value:{min:4,max:9}},sizeOffset:!0}},roll:{darken:{enable:!1,value:0},enable:!1,enlighten:{enable:!1,value:0},mode:"vertical",speed:25},tilt:{value:0,animation:{enable:!1,speed:0,decay:0,sync:!1},direction:"clockwise",enable:!1},twinkle:{lines:{enable:!1,frequency:.05,opacity:1},particles:{enable:!1,frequency:.05,opacity:1}},wobble:{distance:5,enable:!1,speed:{angle:50,move:10}},life:{count:0,delay:{value:0,sync:!1},duration:{value:0,sync:!1}},rotate:{value:0,animation:{enable:!1,speed:0,decay:0,sync:!1},direction:"clockwise",path:!1},orbit:{animation:{count:0,enable:!1,speed:1,decay:0,delay:0,sync:!1},enable:!1,opacity:1,rotation:{value:45},width:1},links:{blink:!1,color:{value:"#fff"},consent:!1,distance:100,enable:!1,frequency:1,opacity:1,shadow:{blur:5,color:{value:"#000"},enable:!1},triangles:{enable:!1,frequency:1},width:1,warp:!1},repulse:{value:0,enabled:!1,distance:1,duration:1,factor:1,speed:1}},detectRetina:!0}}))},n=r.default=u},94624:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(43693)),t=C(e(96540)),d=e(74848);function C(i,u){if(typeof WeakMap=="function")var n=new WeakMap,a=new WeakMap;return(C=function(c,E){if(!E&&c&&c.__esModule)return c;var l,f,_={__proto__:null,default:c};if(c===null||A(c)!="object"&&typeof c!="function")return _;if(l=E?a:n){if(l.has(c))return l.get(c);l.set(c,_)}for(var y in c)y!=="default"&&{}.hasOwnProperty.call(c,y)&&((f=(l=Object.defineProperty)&&Object.getOwnPropertyDescriptor(c,y))&&(f.get||f.set)?l(_,y,f):_[y]=c[y]);return _})(i,u)}function g(i,u){var n=Object.keys(i);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(i);u&&(a=a.filter(function(s){return Object.getOwnPropertyDescriptor(i,s).enumerable})),n.push.apply(n,a)}return n}function h(i){for(var u=1;u<arguments.length;u++){var n=arguments[u]!=null?arguments[u]:{};u%2?g(Object(n),!0).forEach(function(a){(0,m.default)(i,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach(function(a){Object.defineProperty(i,a,Object.getOwnPropertyDescriptor(n,a))})}return i}var v=function(u){return(0,d.jsxs)("svg",h(h({xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",width:"1em",height:"1em"},u),{},{children:[(0,d.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),(0,d.jsx)("path",{d:"M16.5 4 12 12 7.5 4"}),(0,d.jsx)("path",{d:"m3 4 9 16 9-16"})]}))},p=r.default=v},97361:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(43693)),t=C(e(96540)),d=e(74848);function C(i,u){if(typeof WeakMap=="function")var n=new WeakMap,a=new WeakMap;return(C=function(c,E){if(!E&&c&&c.__esModule)return c;var l,f,_={__proto__:null,default:c};if(c===null||A(c)!="object"&&typeof c!="function")return _;if(l=E?a:n){if(l.has(c))return l.get(c);l.set(c,_)}for(var y in c)y!=="default"&&{}.hasOwnProperty.call(c,y)&&((f=(l=Object.defineProperty)&&Object.getOwnPropertyDescriptor(c,y))&&(f.get||f.set)?l(_,y,f):_[y]=c[y]);return _})(i,u)}function g(i,u){var n=Object.keys(i);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(i);u&&(a=a.filter(function(s){return Object.getOwnPropertyDescriptor(i,s).enumerable})),n.push.apply(n,a)}return n}function h(i){for(var u=1;u<arguments.length;u++){var n=arguments[u]!=null?arguments[u]:{};u%2?g(Object(n),!0).forEach(function(a){(0,m.default)(i,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach(function(a){Object.defineProperty(i,a,Object.getOwnPropertyDescriptor(n,a))})}return i}var v=function(u){return(0,d.jsxs)("svg",h(h({xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",width:"1em",height:"1em"},u),{},{children:[(0,d.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),(0,d.jsx)("path",{d:"m20 4-2 14.5-6 2-6-2L4 4z"}),(0,d.jsx)("path",{d:"M7.5 8h3v8l-2-1M16.5 8H14a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1.423a.5.5 0 0 1 .495.57L15.5 15.5l-2 .5"})]}))},p=r.default=v},98343:function(x,r,e){"use strict";var o=e(24994);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var A=o(e(96540)),m=o(e(45490)),t=function(g){var h=g.avatar,v=g.text;return A.default.createElement("div",{className:m.default.avatarCard},A.default.createElement("div",{className:m.default.card},A.default.createElement("figure",null,A.default.createElement("img",{alt:"",src:h,className:m.default.avatar})),A.default.createElement("p",{className:m.default.content},v)))},d=r.default=t},98689:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.isometricCard--mEKMm {\r
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
`],sourceRoot:""}]),d.locals={isometricCard:"isometricCard--mEKMm"},r.A=d},98827:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.gradientTracking--FyamC {\r
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
`],sourceRoot:""}]),d.locals={gradientTracking:"gradientTracking--FyamC"},r.A=d},99725:function(x,r,e){"use strict";var o=e(24994),A=e(73738);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var m=o(e(43693)),t=C(e(96540)),d=e(74848);function C(i,u){if(typeof WeakMap=="function")var n=new WeakMap,a=new WeakMap;return(C=function(c,E){if(!E&&c&&c.__esModule)return c;var l,f,_={__proto__:null,default:c};if(c===null||A(c)!="object"&&typeof c!="function")return _;if(l=E?a:n){if(l.has(c))return l.get(c);l.set(c,_)}for(var y in c)y!=="default"&&{}.hasOwnProperty.call(c,y)&&((f=(l=Object.defineProperty)&&Object.getOwnPropertyDescriptor(c,y))&&(f.get||f.set)?l(_,y,f):_[y]=c[y]);return _})(i,u)}function g(i,u){var n=Object.keys(i);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(i);u&&(a=a.filter(function(s){return Object.getOwnPropertyDescriptor(i,s).enumerable})),n.push.apply(n,a)}return n}function h(i){for(var u=1;u<arguments.length;u++){var n=arguments[u]!=null?arguments[u]:{};u%2?g(Object(n),!0).forEach(function(a){(0,m.default)(i,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach(function(a){Object.defineProperty(i,a,Object.getOwnPropertyDescriptor(n,a))})}return i}var v=function(u){return(0,d.jsxs)("svg",h(h({xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",width:"1em",height:"1em"},u),{},{children:[(0,d.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),(0,d.jsx)("path",{d:"M6.306 8.711C3.704 9.434 2 10.637 2 12c0 2.21 4.477 4 10 4 .773 0 1.526-.035 2.248-.102M17.692 15.289C20.295 14.567 22 13.363 22 12c0-2.21-4.477-4-10-4-.773 0-1.526.035-2.25.102"}),(0,d.jsx)("path",{d:"M6.305 15.287C5.629 17.902 5.82 19.98 7 20.66c1.913 1.105 5.703-1.877 8.464-6.66q.581-1.007 1.036-2M17.694 8.716C18.371 6.1 18.181 4.02 17 3.34 15.087 2.235 11.297 5.217 8.536 10c-.387.67-.733 1.34-1.037 2"}),(0,d.jsx)("path",{d:"M12 5.424C10.075 3.532 8.18 2.658 7 3.34 5.087 4.444 5.774 9.217 8.536 14c.386.67.793 1.304 1.212 1.896M12 18.574c1.926 1.893 3.821 2.768 5 2.086 1.913-1.104 1.226-5.877-1.536-10.66q-.563-.976-1.212-1.897M11.5 12.866a1 1 0 1 0 1-1.732 1 1 0 0 0-1 1.732z"})]}))},p=r.default=v},99827:function(x,r,e){"use strict";var o=e(71354),A=e.n(o),m=e(76314),t=e.n(m),d=t()(A());d.push([x.id,`.hero--Gi4L2 {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  flex-direction: column;\r
  margin: 0 auto;\r
  padding: 50px 0;\r
  position: relative;\r
  height: 600px;\r
  overflow: hidden;\r
  background: radial-gradient(circle, hsl(30deg 100% 8% / 100%) 0%, rgb(0 0 0) 100%);\r
}\r
\r
.heroText--DK21p {\r
  text-align: center;\r
  color: #fff;\r
  max-width: 750px;\r
  z-index: 10;\r
\r
  h1 {\r
    font-size: 76px;\r
    margin: 0 0 30px;\r
    font-weight: 300;\r
\r
    span {\r
      background: linear-gradient(30deg, #ff8000 40%, #ad1d1d 70%);\r
      -webkit-background-clip: text;\r
              background-clip: text;\r
      color: transparent;\r
    }\r
  }\r
\r
  h3 {\r
    font-size: 20px;\r
    font-weight: 300;\r
  }\r
\r
  a {\r
    margin-top: 20px;\r
    display: inline-block;\r
    color: #fff;\r
    text-decoration: none;\r
    font-size: 20px;\r
    border-radius: 8px;\r
    background: #ad1d1d;\r
    padding: 20px 30px;\r
  }\r
}\r
\r
.iconLayer--F5Ovp {\r
  position: absolute;\r
  left: 0;\r
  top: 0;\r
  height: 100%;\r
  width: 100%;\r
}\r
\r
.icon--vnklr {\r
  position: absolute;\r
  border-radius: 12px;\r
  transition: transform 1s ease-out;\r
  animation: icon-fade-in--dW0La 7s ease forwards;\r
  padding: 10px;\r
\r
  svg {\r
    width: 100%;\r
    height: 100%;\r
  }\r
\r
  path {\r
    color: #fff;\r
  }\r
\r
  &.outline--fnROM {\r
    border: 1px solid #414141;\r
  }\r
\r
  &.fill--GObeU {\r
    background: #414141;\r
  }\r
\r
  &.sm--nwTxE {\r
    height: 40px;\r
    width: 40px;\r
    z-index: 1;\r
  }\r
\r
  &.md--uoHcF {\r
    height: 60px;\r
    width: 60px;\r
    z-index: 3;\r
  }\r
\r
  &.lg--enKwC {\r
    height: 80px;\r
    width: 80px;\r
    z-index: 5;\r
  }\r
}\r
\r
@keyframes icon-fade-in--dW0La {\r
  from {\r
    opacity: 0;\r
  }\r
\r
  to {\r
    opacity: 0.6;\r
  }\r
}\r
`,"",{version:3,sources:["webpack://./src/components/stateless/DynamicBackground/index.module.less"],names:[],mappings:"AAAA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,sBAAsB;EACtB,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,aAAa;EACb,gBAAgB;EAChB,kFAAkF;AACpF;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,gBAAgB;EAChB,WAAW;;EAEX;IACE,eAAe;IACf,gBAAgB;IAChB,gBAAgB;;IAEhB;MACE,4DAA4D;MAC5D,6BAAqB;cAArB,qBAAqB;MACrB,kBAAkB;IACpB;EACF;;EAEA;IACE,eAAe;IACf,gBAAgB;EAClB;;EAEA;IACE,gBAAgB;IAChB,qBAAqB;IACrB,WAAW;IACX,qBAAqB;IACrB,eAAe;IACf,kBAAkB;IAClB,mBAAmB;IACnB,kBAAkB;EACpB;AACF;;AAEA;EACE,kBAAkB;EAClB,OAAO;EACP,MAAM;EACN,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,iCAAiC;EACjC,+CAAwC;EACxC,aAAa;;EAEb;IACE,WAAW;IACX,YAAY;EACd;;EAEA;IACE,WAAW;EACb;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,mBAAmB;EACrB;;EAEA;IACE,YAAY;IACZ,WAAW;IACX,UAAU;EACZ;;EAEA;IACE,YAAY;IACZ,WAAW;IACX,UAAU;EACZ;;EAEA;IACE,YAAY;IACZ,WAAW;IACX,UAAU;EACZ;AACF;;AAEA;EACE;IACE,UAAU;EACZ;;EAEA;IACE,YAAY;EACd;AACF",sourcesContent:[`.hero {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  flex-direction: column;\r
  margin: 0 auto;\r
  padding: 50px 0;\r
  position: relative;\r
  height: 600px;\r
  overflow: hidden;\r
  background: radial-gradient(circle, hsl(30deg 100% 8% / 100%) 0%, rgb(0 0 0) 100%);\r
}\r
\r
.heroText {\r
  text-align: center;\r
  color: #fff;\r
  max-width: 750px;\r
  z-index: 10;\r
\r
  h1 {\r
    font-size: 76px;\r
    margin: 0 0 30px;\r
    font-weight: 300;\r
\r
    span {\r
      background: linear-gradient(30deg, #ff8000 40%, #ad1d1d 70%);\r
      background-clip: text;\r
      color: transparent;\r
    }\r
  }\r
\r
  h3 {\r
    font-size: 20px;\r
    font-weight: 300;\r
  }\r
\r
  a {\r
    margin-top: 20px;\r
    display: inline-block;\r
    color: #fff;\r
    text-decoration: none;\r
    font-size: 20px;\r
    border-radius: 8px;\r
    background: #ad1d1d;\r
    padding: 20px 30px;\r
  }\r
}\r
\r
.iconLayer {\r
  position: absolute;\r
  left: 0;\r
  top: 0;\r
  height: 100%;\r
  width: 100%;\r
}\r
\r
.icon {\r
  position: absolute;\r
  border-radius: 12px;\r
  transition: transform 1s ease-out;\r
  animation: icon-fade-in 7s ease forwards;\r
  padding: 10px;\r
\r
  svg {\r
    width: 100%;\r
    height: 100%;\r
  }\r
\r
  path {\r
    color: #fff;\r
  }\r
\r
  &.outline {\r
    border: 1px solid #414141;\r
  }\r
\r
  &.fill {\r
    background: #414141;\r
  }\r
\r
  &.sm {\r
    height: 40px;\r
    width: 40px;\r
    z-index: 1;\r
  }\r
\r
  &.md {\r
    height: 60px;\r
    width: 60px;\r
    z-index: 3;\r
  }\r
\r
  &.lg {\r
    height: 80px;\r
    width: 80px;\r
    z-index: 5;\r
  }\r
}\r
\r
@keyframes icon-fade-in {\r
  from {\r
    opacity: 0;\r
  }\r
\r
  to {\r
    opacity: 0.6;\r
  }\r
}\r
`],sourceRoot:""}]),d.locals={hero:"hero--Gi4L2",heroText:"heroText--DK21p",iconLayer:"iconLayer--F5Ovp",icon:"icon--vnklr","icon-fade-in":"icon-fade-in--dW0La",iconFadeIn:"icon-fade-in--dW0La",outline:"outline--fnROM",fill:"fill--GObeU",sm:"sm--nwTxE",md:"md--uoHcF",lg:"lg--enKwC"},r.A=d}}]);
