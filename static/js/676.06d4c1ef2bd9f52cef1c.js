(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[676],{27495:function(ke,le,G){"use strict";var ne=G(89840),A=function(K,Z){return Z===void 0&&(Z=!1),function(he,ye,ge){if(he){K(he);return}if(ye.statusCode>=400&&ye.statusCode<=599){var J=ge;if(Z)if(ne.TextDecoder){var Ie=N(ye.headers&&ye.headers["content-type"]);try{J=new TextDecoder(Ie).decode(ge)}catch(Pe){}}else J=String.fromCharCode.apply(null,new Uint8Array(ge));K({cause:J});return}K(null,ge)}};function N(I){return I===void 0&&(I=""),I.toLowerCase().split(";").reduce(function(K,Z){var he=Z.split("="),ye=he[0],ge=he[1];return ye.trim()==="charset"?ge.trim():K},"utf-8")}ke.exports=A},21036:function(ke,le,G){"use strict";var ne=G(89840),A=G(94634),N=G(37056),I=G(26162),K=G(8670);J.httpHandler=G(27495),J.requestInterceptorsStorage=new I,J.responseInterceptorsStorage=new I,J.retryManager=new K;/**
 * @license
 * slighly modified parse-headers 2.0.2 <https://github.com/kesla/parse-headers/>
 * Copyright (c) 2014 David Björklund
 * Available under the MIT license
 * <https://github.com/kesla/parse-headers/blob/master/LICENCE>
 */var Z=function(Ue){var Se={};return Ue&&Ue.trim().split(`
`).forEach(function(Xe){var re=Xe.indexOf(":"),Oe=Xe.slice(0,re).trim().toLowerCase(),Te=Xe.slice(re+1).trim();typeof Se[Oe]=="undefined"?Se[Oe]=Te:Array.isArray(Se[Oe])?Se[Oe].push(Te):Se[Oe]=[Se[Oe],Te]}),Se};ke.exports=J,ke.exports.default=J,J.XMLHttpRequest=ne.XMLHttpRequest||Me,J.XDomainRequest="withCredentials"in new J.XMLHttpRequest?J.XMLHttpRequest:ne.XDomainRequest,he(["get","put","post","patch","head","delete"],function($){J[$==="delete"?"del":$]=function(Ue,Se,Xe){return Se=ge(Ue,Se,Xe),Se.method=$.toUpperCase(),Ie(Se)}});function he($,Ue){for(var Se=0;Se<$.length;Se++)Ue($[Se])}function ye($){for(var Ue in $)if($.hasOwnProperty(Ue))return!1;return!0}function ge($,Ue,Se){var Xe=$;return N(Ue)?(Se=Ue,typeof $=="string"&&(Xe={uri:$})):Xe=A({},Ue,{uri:$}),Xe.callback=Se,Xe}function J($,Ue,Se){return Ue=ge($,Ue,Se),Ie(Ue)}function Ie($){if(typeof $.callback=="undefined")throw new Error("callback argument missing");if($.requestType&&J.requestInterceptorsStorage.getIsEnabled()){var Ue={uri:$.uri||$.url,headers:$.headers||{},body:$.body,metadata:$.metadata||{},retry:$.retry,timeout:$.timeout},Se=J.requestInterceptorsStorage.execute($.requestType,Ue);$.uri=Se.uri,$.headers=Se.headers,$.body=Se.body,$.metadata=Se.metadata,$.retry=Se.retry,$.timeout=Se.timeout}var Xe=!1,re=function(ee,te,se){Xe||(Xe=!0,$.callback(ee,te,se))};function Oe(){_e.readyState===4&&!J.responseInterceptorsStorage.getIsEnabled()&&setTimeout(me,0)}function Te(){var W=void 0;if(_e.response?W=_e.response:W=_e.responseText||Pe(_e),ce)try{W=JSON.parse(W)}catch(ee){}return W}function Ce(W){if(clearTimeout(oe),clearTimeout($.retryTimeout),W instanceof Error||(W=new Error(""+(W||"Unknown XMLHttpRequest Error"))),W.statusCode=0,!De&&J.retryManager.getIsEnabled()&&$.retry&&$.retry.shouldRetry()){$.retryTimeout=setTimeout(function(){$.retry.moveToNextAttempt(),$.xhr=_e,Ie($)},$.retry.getCurrentFuzzedDelay());return}if($.requestType&&J.responseInterceptorsStorage.getIsEnabled()){var ee={headers:pe.headers||{},body:pe.body,responseUrl:_e.responseURL,responseType:_e.responseType},te=J.responseInterceptorsStorage.execute($.requestType,ee);pe.body=te.body,pe.headers=te.headers}return re(W,pe)}function me(){if(!De){var W;clearTimeout(oe),clearTimeout($.retryTimeout),$.useXDR&&_e.status===void 0?W=200:W=_e.status===1223?204:_e.status;var ee=pe,te=null;if(W!==0?(ee={body:Te(),statusCode:W,method:S,headers:{},url:C,rawRequest:_e},_e.getAllResponseHeaders&&(ee.headers=Z(_e.getAllResponseHeaders()))):te=new Error("Internal XMLHttpRequest Error"),$.requestType&&J.responseInterceptorsStorage.getIsEnabled()){var se={headers:ee.headers||{},body:ee.body,responseUrl:_e.responseURL,responseType:_e.responseType},Ee=J.responseInterceptorsStorage.execute($.requestType,se);ee.body=Ee.body,ee.headers=Ee.headers}return re(te,ee,ee.body)}}var _e=$.xhr||null;_e||($.cors||$.useXDR?_e=new J.XDomainRequest:_e=new J.XMLHttpRequest);var ze,De,C=_e.url=$.uri||$.url,S=_e.method=$.method||"GET",R=$.body||$.data,ie=_e.headers=$.headers||{},ue=!!$.sync,ce=!1,oe,pe={body:void 0,headers:{},statusCode:0,method:S,url:C,rawRequest:_e};if("json"in $&&$.json!==!1&&(ce=!0,ie.accept||ie.Accept||(ie.Accept="application/json"),S!=="GET"&&S!=="HEAD"&&(ie["content-type"]||ie["Content-Type"]||(ie["Content-Type"]="application/json"),R=JSON.stringify($.json===!0?R:$.json))),_e.onreadystatechange=Oe,_e.onload=me,_e.onerror=Ce,_e.onprogress=function(){},_e.onabort=function(){De=!0,clearTimeout($.retryTimeout)},_e.ontimeout=Ce,_e.open(S,C,!ue,$.username,$.password),ue||(_e.withCredentials=!!$.withCredentials),!ue&&$.timeout>0&&(oe=setTimeout(function(){if(!De){De=!0,_e.abort("timeout");var W=new Error("XMLHttpRequest timeout");W.code="ETIMEDOUT",Ce(W)}},$.timeout)),_e.setRequestHeader)for(ze in ie)ie.hasOwnProperty(ze)&&_e.setRequestHeader(ze,ie[ze]);else if($.headers&&!ye($.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in $&&(_e.responseType=$.responseType),"beforeSend"in $&&typeof $.beforeSend=="function"&&$.beforeSend(_e),_e.send(R||null),_e}function Pe($){try{if($.responseType==="document")return $.responseXML;var Ue=$.responseXML&&$.responseXML.documentElement.nodeName==="parsererror";if($.responseType===""&&!Ue)return $.responseXML}catch(Se){}return null}function Me(){}},26162:function(ke){"use strict";function le(N,I){var K=typeof Symbol!="undefined"&&N[Symbol.iterator]||N["@@iterator"];if(K)return(K=K.call(N)).next.bind(K);if(Array.isArray(N)||(K=G(N))||I&&N&&typeof N.length=="number"){K&&(N=K);var Z=0;return function(){return Z>=N.length?{done:!0}:{done:!1,value:N[Z++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function G(N,I){if(N){if(typeof N=="string")return ne(N,I);var K=Object.prototype.toString.call(N).slice(8,-1);if(K==="Object"&&N.constructor&&(K=N.constructor.name),K==="Map"||K==="Set")return Array.from(N);if(K==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K))return ne(N,I)}}function ne(N,I){(I==null||I>N.length)&&(I=N.length);for(var K=0,Z=new Array(I);K<I;K++)Z[K]=N[K];return Z}var A=function(){function N(){this.typeToInterceptorsMap_=new Map,this.enabled_=!1}var I=N.prototype;return I.getIsEnabled=function(){return this.enabled_},I.enable=function(){this.enabled_=!0},I.disable=function(){this.enabled_=!1},I.reset=function(){this.typeToInterceptorsMap_=new Map,this.enabled_=!1},I.addInterceptor=function(Z,he){this.typeToInterceptorsMap_.has(Z)||this.typeToInterceptorsMap_.set(Z,new Set);var ye=this.typeToInterceptorsMap_.get(Z);return ye.has(he)?!1:(ye.add(he),!0)},I.removeInterceptor=function(Z,he){var ye=this.typeToInterceptorsMap_.get(Z);return ye&&ye.has(he)?(ye.delete(he),!0):!1},I.clearInterceptorsByType=function(Z){var he=this.typeToInterceptorsMap_.get(Z);return he?(this.typeToInterceptorsMap_.delete(Z),this.typeToInterceptorsMap_.set(Z,new Set),!0):!1},I.clear=function(){return this.typeToInterceptorsMap_.size?(this.typeToInterceptorsMap_=new Map,!0):!1},I.getForType=function(Z){return this.typeToInterceptorsMap_.get(Z)||new Set},I.execute=function(Z,he){for(var ye=this.getForType(Z),ge=le(ye),J;!(J=ge()).done;){var Ie=J.value;try{he=Ie(he)}catch(Pe){}}return he},N}();ke.exports=A},8670:function(ke){"use strict";var le=function(){function ne(){this.maxAttempts_=1,this.delayFactor_=.1,this.fuzzFactor_=.1,this.initialDelay_=1e3,this.enabled_=!1}var A=ne.prototype;return A.getIsEnabled=function(){return this.enabled_},A.enable=function(){this.enabled_=!0},A.disable=function(){this.enabled_=!1},A.reset=function(){this.maxAttempts_=1,this.delayFactor_=.1,this.fuzzFactor_=.1,this.initialDelay_=1e3,this.enabled_=!1},A.getMaxAttempts=function(){return this.maxAttempts_},A.setMaxAttempts=function(I){this.maxAttempts_=I},A.getDelayFactor=function(){return this.delayFactor_},A.setDelayFactor=function(I){this.delayFactor_=I},A.getFuzzFactor=function(){return this.fuzzFactor_},A.setFuzzFactor=function(I){this.fuzzFactor_=I},A.getInitialDelay=function(){return this.initialDelay_},A.setInitialDelay=function(I){this.initialDelay_=I},A.createRetry=function(I){var K=I===void 0?{}:I,Z=K.maxAttempts,he=K.delayFactor,ye=K.fuzzFactor,ge=K.initialDelay;return new G({maxAttempts:Z||this.maxAttempts_,delayFactor:he||this.delayFactor_,fuzzFactor:ye||this.fuzzFactor_,initialDelay:ge||this.initialDelay_})},ne}(),G=function(){function ne(N){this.maxAttempts_=N.maxAttempts,this.delayFactor_=N.delayFactor,this.fuzzFactor_=N.fuzzFactor,this.currentDelay_=N.initialDelay,this.currentAttempt_=1}var A=ne.prototype;return A.moveToNextAttempt=function(){this.currentAttempt_++;var I=this.currentDelay_*this.delayFactor_;this.currentDelay_=this.currentDelay_+I},A.shouldRetry=function(){return this.currentAttempt_<this.maxAttempts_},A.getCurrentDelay=function(){return this.currentDelay_},A.getCurrentMinPossibleDelay=function(){return(1-this.fuzzFactor_)*this.currentDelay_},A.getCurrentMaxPossibleDelay=function(){return(1+this.fuzzFactor_)*this.currentDelay_},A.getCurrentFuzzedDelay=function(){var I=this.getCurrentMinPossibleDelay(),K=this.getCurrentMaxPossibleDelay();return I+Math.random()*(K-I)},ne}();ke.exports=le},44582:function(ke,le){"use strict";function G(K,Z,he){if(he===void 0&&(he=Array.prototype),K&&typeof he.find=="function")return he.find.call(K,Z);for(var ye=0;ye<K.length;ye++)if(Object.prototype.hasOwnProperty.call(K,ye)){var ge=K[ye];if(Z.call(void 0,ge,ye,K))return ge}}function ne(K,Z){return Z===void 0&&(Z=Object),Z&&typeof Z.freeze=="function"?Z.freeze(K):K}function A(K,Z){if(K===null||typeof K!="object")throw new TypeError("target is not an object");for(var he in Z)Object.prototype.hasOwnProperty.call(Z,he)&&(K[he]=Z[he]);return K}var N=ne({HTML:"text/html",isHTML:function(K){return K===N.HTML},XML_APPLICATION:"application/xml",XML_TEXT:"text/xml",XML_XHTML_APPLICATION:"application/xhtml+xml",XML_SVG_IMAGE:"image/svg+xml"}),I=ne({HTML:"http://www.w3.org/1999/xhtml",isHTML:function(K){return K===I.HTML},SVG:"http://www.w3.org/2000/svg",XML:"http://www.w3.org/XML/1998/namespace",XMLNS:"http://www.w3.org/2000/xmlns/"});le.assign=A,le.find=G,le.freeze=ne,le.MIME_TYPE=N,le.NAMESPACE=I},15752:function(ke,le,G){var ne,A=G(44582),N=G(84722),I=G(56559),K=G(64466),Z=N.DOMImplementation,he=A.NAMESPACE,ye=K.ParseError,ge=K.XMLReader;function J(re){return re.replace(/\r[\n\u0085]/g,`
`).replace(/[\r\u0085\u2028]/g,`
`)}function Ie(re){this.options=re||{locator:{}}}Ie.prototype.parseFromString=function(re,Oe){var Te=this.options,Ce=new ge,me=Te.domBuilder||new Me,_e=Te.errorHandler,ze=Te.locator,De=Te.xmlns||{},C=/\/x?html?$/.test(Oe),S=C?I.HTML_ENTITIES:I.XML_ENTITIES;ze&&me.setDocumentLocator(ze),Ce.errorHandler=Pe(_e,me,ze),Ce.domBuilder=Te.domBuilder||me,C&&(De[""]=he.HTML),De.xml=De.xml||he.XML;var R=Te.normalizeLineEndings||J;return re&&typeof re=="string"?Ce.parse(R(re),De,S):Ce.errorHandler.error("invalid doc source"),me.doc};function Pe(re,Oe,Te){if(!re){if(Oe instanceof Me)return Oe;re=Oe}var Ce={},me=re instanceof Function;Te=Te||{};function _e(ze){var De=re[ze];!De&&me&&(De=re.length==2?function(C){re(ze,C)}:re),Ce[ze]=De&&function(C){De("[xmldom "+ze+"]	"+C+Ue(Te))}||function(){}}return _e("warning"),_e("error"),_e("fatalError"),Ce}function Me(){this.cdata=!1}function $(re,Oe){Oe.lineNumber=re.lineNumber,Oe.columnNumber=re.columnNumber}Me.prototype={startDocument:function(){this.doc=new Z().createDocument(null,null,null),this.locator&&(this.doc.documentURI=this.locator.systemId)},startElement:function(re,Oe,Te,Ce){var me=this.doc,_e=me.createElementNS(re,Te||Oe),ze=Ce.length;Xe(this,_e),this.currentElement=_e,this.locator&&$(this.locator,_e);for(var De=0;De<ze;De++){var re=Ce.getURI(De),C=Ce.getValue(De),Te=Ce.getQName(De),S=me.createAttributeNS(re,Te);this.locator&&$(Ce.getLocator(De),S),S.value=S.nodeValue=C,_e.setAttributeNode(S)}},endElement:function(re,Oe,Te){var Ce=this.currentElement,me=Ce.tagName;this.currentElement=Ce.parentNode},startPrefixMapping:function(re,Oe){},endPrefixMapping:function(re){},processingInstruction:function(re,Oe){var Te=this.doc.createProcessingInstruction(re,Oe);this.locator&&$(this.locator,Te),Xe(this,Te)},ignorableWhitespace:function(re,Oe,Te){},characters:function(re,Oe,Te){if(re=Se.apply(this,arguments),re){if(this.cdata)var Ce=this.doc.createCDATASection(re);else var Ce=this.doc.createTextNode(re);this.currentElement?this.currentElement.appendChild(Ce):/^\s*$/.test(re)&&this.doc.appendChild(Ce),this.locator&&$(this.locator,Ce)}},skippedEntity:function(re){},endDocument:function(){this.doc.normalize()},setDocumentLocator:function(re){(this.locator=re)&&(re.lineNumber=0)},comment:function(re,Oe,Te){re=Se.apply(this,arguments);var Ce=this.doc.createComment(re);this.locator&&$(this.locator,Ce),Xe(this,Ce)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(re,Oe,Te){var Ce=this.doc.implementation;if(Ce&&Ce.createDocumentType){var me=Ce.createDocumentType(re,Oe,Te);this.locator&&$(this.locator,me),Xe(this,me),this.doc.doctype=me}},warning:function(re){console.warn("[xmldom warning]	"+re,Ue(this.locator))},error:function(re){console.error("[xmldom error]	"+re,Ue(this.locator))},fatalError:function(re){throw new ye(re,this.locator)}};function Ue(re){if(re)return`
@`+(re.systemId||"")+"#[line:"+re.lineNumber+",col:"+re.columnNumber+"]"}function Se(re,Oe,Te){return typeof re=="string"?re.substr(Oe,Te):re.length>=Oe+Te||Oe?new java.lang.String(re,Oe,Te)+"":re}"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(re){Me.prototype[re]=function(){return null}});function Xe(re,Oe){re.currentElement?re.currentElement.appendChild(Oe):re.doc.appendChild(Oe)}ne=Me,ne=J,le.DOMParser=Ie},84722:function(ke,le,G){var ne=G(44582),A=ne.find,N=ne.NAMESPACE;function I(v){return v!==""}function K(v){return v?v.split(/[\t\n\f\r ]+/).filter(I):[]}function Z(v,b){return v.hasOwnProperty(b)||(v[b]=!0),v}function he(v){if(!v)return[];var b=K(v);return Object.keys(b.reduce(Z,{}))}function ye(v){return function(b){return v&&v.indexOf(b)!==-1}}function ge(v,b){for(var B in v)Object.prototype.hasOwnProperty.call(v,B)&&(b[B]=v[B])}function J(v,b){var B=v.prototype;if(!(B instanceof b)){let ae=function(){};var F=ae;ae.prototype=b.prototype,ae=new ae,ge(B,ae),v.prototype=B=ae}B.constructor!=v&&(typeof v!="function"&&console.error("unknown Class:"+v),B.constructor=v)}var Ie={},Pe=Ie.ELEMENT_NODE=1,Me=Ie.ATTRIBUTE_NODE=2,$=Ie.TEXT_NODE=3,Ue=Ie.CDATA_SECTION_NODE=4,Se=Ie.ENTITY_REFERENCE_NODE=5,Xe=Ie.ENTITY_NODE=6,re=Ie.PROCESSING_INSTRUCTION_NODE=7,Oe=Ie.COMMENT_NODE=8,Te=Ie.DOCUMENT_NODE=9,Ce=Ie.DOCUMENT_TYPE_NODE=10,me=Ie.DOCUMENT_FRAGMENT_NODE=11,_e=Ie.NOTATION_NODE=12,ze={},De={},C=ze.INDEX_SIZE_ERR=(De[1]="Index size error",1),S=ze.DOMSTRING_SIZE_ERR=(De[2]="DOMString size error",2),R=ze.HIERARCHY_REQUEST_ERR=(De[3]="Hierarchy request error",3),ie=ze.WRONG_DOCUMENT_ERR=(De[4]="Wrong document",4),ue=ze.INVALID_CHARACTER_ERR=(De[5]="Invalid character",5),ce=ze.NO_DATA_ALLOWED_ERR=(De[6]="No data allowed",6),oe=ze.NO_MODIFICATION_ALLOWED_ERR=(De[7]="No modification allowed",7),pe=ze.NOT_FOUND_ERR=(De[8]="Not found",8),W=ze.NOT_SUPPORTED_ERR=(De[9]="Not supported",9),ee=ze.INUSE_ATTRIBUTE_ERR=(De[10]="Attribute in use",10),te=ze.INVALID_STATE_ERR=(De[11]="Invalid state",11),se=ze.SYNTAX_ERR=(De[12]="Syntax error",12),Ee=ze.INVALID_MODIFICATION_ERR=(De[13]="Invalid modification",13),Fe=ze.NAMESPACE_ERR=(De[14]="Invalid namespace",14),qe=ze.INVALID_ACCESS_ERR=(De[15]="Invalid access",15);function xe(v,b){if(b instanceof Error)var B=b;else B=this,Error.call(this,De[v]),this.message=De[v],Error.captureStackTrace&&Error.captureStackTrace(this,xe);return B.code=v,b&&(this.message=this.message+": "+b),B}xe.prototype=Error.prototype,ge(ze,xe);function je(){}je.prototype={length:0,item:function(v){return v>=0&&v<this.length?this[v]:null},toString:function(v,b){for(var B=[],F=0;F<this.length;F++)bi(this[F],B,v,b);return B.join("")},filter:function(v){return Array.prototype.filter.call(this,v)},indexOf:function(v){return Array.prototype.indexOf.call(this,v)}};function _t(v,b){this._node=v,this._refresh=b,Dt(this)}function Dt(v){var b=v._node._inc||v._node.ownerDocument._inc;if(v._inc!==b){var B=v._refresh(v._node);if(fr(v,"length",B.length),!v.$$length||B.length<v.$$length)for(var F=B.length;F in v;F++)Object.prototype.hasOwnProperty.call(v,F)&&delete v[F];ge(B,v),v._inc=b}}_t.prototype.item=function(v){return Dt(this),this[v]||null},J(_t,je);function mt(){}function Tt(v,b){for(var B=v.length;B--;)if(v[B]===b)return B}function $t(v,b,B,F){if(F?b[Tt(b,F)]=B:b[b.length++]=B,v){B.ownerElement=v;var ae=v.ownerDocument;ae&&(F&&hs(ae,v,F),ds(ae,v,B))}}function _i(v,b,B){var F=Tt(b,B);if(F>=0){for(var ae=b.length-1;F<ae;)b[F]=b[++F];if(b.length=ae,v){var Re=v.ownerDocument;Re&&(hs(Re,v,B),B.ownerElement=null)}}else throw new xe(pe,new Error(v.tagName+"@"+B))}mt.prototype={length:0,item:je.prototype.item,getNamedItem:function(v){for(var b=this.length;b--;){var B=this[b];if(B.nodeName==v)return B}},setNamedItem:function(v){var b=v.ownerElement;if(b&&b!=this._ownerElement)throw new xe(ee);var B=this.getNamedItem(v.nodeName);return $t(this._ownerElement,this,v,B),B},setNamedItemNS:function(v){var b=v.ownerElement,B;if(b&&b!=this._ownerElement)throw new xe(ee);return B=this.getNamedItemNS(v.namespaceURI,v.localName),$t(this._ownerElement,this,v,B),B},removeNamedItem:function(v){var b=this.getNamedItem(v);return _i(this._ownerElement,this,b),b},removeNamedItemNS:function(v,b){var B=this.getNamedItemNS(v,b);return _i(this._ownerElement,this,B),B},getNamedItemNS:function(v,b){for(var B=this.length;B--;){var F=this[B];if(F.localName==b&&F.namespaceURI==v)return F}return null}};function Dn(){}Dn.prototype={hasFeature:function(v,b){return!0},createDocument:function(v,b,B){var F=new fe;if(F.implementation=this,F.childNodes=new je,F.doctype=B||null,B&&F.appendChild(B),b){var ae=F.createElementNS(v,b);F.appendChild(ae)}return F},createDocumentType:function(v,b,B){var F=new di;return F.name=v,F.nodeName=v,F.publicId=b||"",F.systemId=B||"",F}};function $e(){}$e.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,attributes:null,parentNode:null,childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,insertBefore:function(v,b){return ms(this,v,b)},replaceChild:function(v,b){ms(this,v,b,Ma),b&&this.removeChild(b)},removeChild:function(v){return Ii(this,v)},appendChild:function(v){return this.insertBefore(v,null)},hasChildNodes:function(){return this.firstChild!=null},cloneNode:function(v){return un(this.ownerDocument||this,this,v)},normalize:function(){for(var v=this.firstChild;v;){var b=v.nextSibling;b&&b.nodeType==$&&v.nodeType==$?(this.removeChild(b),v.appendData(b.data)):(v.normalize(),v=b)}},isSupported:function(v,b){return this.ownerDocument.implementation.hasFeature(v,b)},hasAttributes:function(){return this.attributes.length>0},lookupPrefix:function(v){for(var b=this;b;){var B=b._nsMap;if(B){for(var F in B)if(Object.prototype.hasOwnProperty.call(B,F)&&B[F]===v)return F}b=b.nodeType==Me?b.ownerDocument:b.parentNode}return null},lookupNamespaceURI:function(v){for(var b=this;b;){var B=b._nsMap;if(B&&Object.prototype.hasOwnProperty.call(B,v))return B[v];b=b.nodeType==Me?b.ownerDocument:b.parentNode}return null},isDefaultNamespace:function(v){var b=this.lookupPrefix(v);return b==null}};function Et(v){return v=="<"&&"&lt;"||v==">"&&"&gt;"||v=="&"&&"&amp;"||v=='"'&&"&quot;"||"&#"+v.charCodeAt()+";"}ge(Ie,$e),ge(Ie,$e.prototype);function ci(v,b){if(b(v))return!0;if(v=v.firstChild)do if(ci(v,b))return!0;while(v=v.nextSibling)}function fe(){this.ownerDocument=this}function ds(v,b,B){v&&v._inc++;var F=B.namespaceURI;F===N.XMLNS&&(b._nsMap[B.prefix?B.localName:""]=B.value)}function hs(v,b,B,F){v&&v._inc++;var ae=B.namespaceURI;ae===N.XMLNS&&delete b._nsMap[B.prefix?B.localName:""]}function st(v,b,B){if(v&&v._inc){v._inc++;var F=b.childNodes;if(B)F[F.length++]=B;else{for(var ae=b.firstChild,Re=0;ae;)F[Re++]=ae,ae=ae.nextSibling;F.length=Re,delete F[F.length]}}}function Ii(v,b){var B=b.previousSibling,F=b.nextSibling;return B?B.nextSibling=F:v.firstChild=F,F?F.previousSibling=B:v.lastChild=B,b.parentNode=null,b.previousSibling=null,b.nextSibling=null,st(v.ownerDocument,v),b}function tt(v){return v&&(v.nodeType===$e.DOCUMENT_NODE||v.nodeType===$e.DOCUMENT_FRAGMENT_NODE||v.nodeType===$e.ELEMENT_NODE)}function Lt(v){return v&&(ti(v)||fs(v)||ei(v)||v.nodeType===$e.DOCUMENT_FRAGMENT_NODE||v.nodeType===$e.COMMENT_NODE||v.nodeType===$e.PROCESSING_INSTRUCTION_NODE)}function ei(v){return v&&v.nodeType===$e.DOCUMENT_TYPE_NODE}function ti(v){return v&&v.nodeType===$e.ELEMENT_NODE}function fs(v){return v&&v.nodeType===$e.TEXT_NODE}function ur(v,b){var B=v.childNodes||[];if(A(B,ti)||ei(b))return!1;var F=A(B,ei);return!(b&&F&&B.indexOf(F)>B.indexOf(b))}function ps(v,b){var B=v.childNodes||[];function F(Re){return ti(Re)&&Re!==b}if(A(B,F))return!1;var ae=A(B,ei);return!(b&&ae&&B.indexOf(ae)>B.indexOf(b))}function Ra(v,b,B){if(!tt(v))throw new xe(R,"Unexpected parent node type "+v.nodeType);if(B&&B.parentNode!==v)throw new xe(pe,"child not in parent");if(!Lt(b)||ei(b)&&v.nodeType!==$e.DOCUMENT_NODE)throw new xe(R,"Unexpected node type "+b.nodeType+" for parent node type "+v.nodeType)}function it(v,b,B){var F=v.childNodes||[],ae=b.childNodes||[];if(b.nodeType===$e.DOCUMENT_FRAGMENT_NODE){var Re=ae.filter(ti);if(Re.length>1||A(ae,fs))throw new xe(R,"More than one element or text in fragment");if(Re.length===1&&!ur(v,B))throw new xe(R,"Element in fragment can not be inserted before doctype")}if(ti(b)&&!ur(v,B))throw new xe(R,"Only one element can be added and only after doctype");if(ei(b)){if(A(F,ei))throw new xe(R,"Only one doctype is allowed");var Ge=A(F,ti);if(B&&F.indexOf(Ge)<F.indexOf(B))throw new xe(R,"Doctype can only be inserted before an element");if(!B&&Ge)throw new xe(R,"Doctype can not be appended since element is present")}}function Ma(v,b,B){var F=v.childNodes||[],ae=b.childNodes||[];if(b.nodeType===$e.DOCUMENT_FRAGMENT_NODE){var Re=ae.filter(ti);if(Re.length>1||A(ae,fs))throw new xe(R,"More than one element or text in fragment");if(Re.length===1&&!ps(v,B))throw new xe(R,"Element in fragment can not be inserted before doctype")}if(ti(b)&&!ps(v,B))throw new xe(R,"Only one element can be added and only after doctype");if(ei(b)){let Gt=function(Yt){return ei(Yt)&&Yt!==B};var Ct=Gt;if(A(F,Gt))throw new xe(R,"Only one doctype is allowed");var Ge=A(F,ti);if(B&&F.indexOf(Ge)<F.indexOf(B))throw new xe(R,"Doctype can only be inserted before an element")}}function ms(v,b,B,F){Ra(v,b,B),v.nodeType===$e.DOCUMENT_NODE&&(F||it)(v,b,B);var ae=b.parentNode;if(ae&&ae.removeChild(b),b.nodeType===me){var Re=b.firstChild;if(Re==null)return b;var Ge=b.lastChild}else Re=Ge=b;var Ct=B?B.previousSibling:v.lastChild;Re.previousSibling=Ct,Ge.nextSibling=B,Ct?Ct.nextSibling=Re:v.firstChild=Re,B==null?v.lastChild=Ge:B.previousSibling=Ge;do Re.parentNode=v;while(Re!==Ge&&(Re=Re.nextSibling));return st(v.ownerDocument||v,v),b.nodeType==me&&(b.firstChild=b.lastChild=null),b}function Na(v,b){return b.parentNode&&b.parentNode.removeChild(b),b.parentNode=v,b.previousSibling=v.lastChild,b.nextSibling=null,b.previousSibling?b.previousSibling.nextSibling=b:v.firstChild=b,v.lastChild=b,st(v.ownerDocument,v,b),b}fe.prototype={nodeName:"#document",nodeType:Te,doctype:null,documentElement:null,_inc:1,insertBefore:function(v,b){if(v.nodeType==me){for(var B=v.firstChild;B;){var F=B.nextSibling;this.insertBefore(B,b),B=F}return v}return ms(this,v,b),v.ownerDocument=this,this.documentElement===null&&v.nodeType===Pe&&(this.documentElement=v),v},removeChild:function(v){return this.documentElement==v&&(this.documentElement=null),Ii(this,v)},replaceChild:function(v,b){ms(this,v,b,Ma),v.ownerDocument=this,b&&this.removeChild(b),ti(v)&&(this.documentElement=v)},importNode:function(v,b){return Es(this,v,b)},getElementById:function(v){var b=null;return ci(this.documentElement,function(B){if(B.nodeType==Pe&&B.getAttribute("id")==v)return b=B,!0}),b},getElementsByClassName:function(v){var b=he(v);return new _t(this,function(B){var F=[];return b.length>0&&ci(B.documentElement,function(ae){if(ae!==B&&ae.nodeType===Pe){var Re=ae.getAttribute("class");if(Re){var Ge=v===Re;if(!Ge){var Ct=he(Re);Ge=b.every(ye(Ct))}Ge&&F.push(ae)}}}),F})},createElement:function(v){var b=new Pi;b.ownerDocument=this,b.nodeName=v,b.tagName=v,b.localName=v,b.childNodes=new je;var B=b.attributes=new mt;return B._ownerElement=b,b},createDocumentFragment:function(){var v=new hi;return v.ownerDocument=this,v.childNodes=new je,v},createTextNode:function(v){var b=new gt;return b.ownerDocument=this,b.appendData(v),b},createComment:function(v){var b=new kn;return b.ownerDocument=this,b.appendData(v),b},createCDATASection:function(v){var b=new vs;return b.ownerDocument=this,b.appendData(v),b},createProcessingInstruction:function(v,b){var B=new Oi;return B.ownerDocument=this,B.tagName=B.nodeName=B.target=v,B.nodeValue=B.data=b,B},createAttribute:function(v){var b=new gs;return b.ownerDocument=this,b.name=v,b.nodeName=v,b.localName=v,b.specified=!0,b},createEntityReference:function(v){var b=new ys;return b.ownerDocument=this,b.nodeName=v,b},createElementNS:function(v,b){var B=new Pi,F=b.split(":"),ae=B.attributes=new mt;return B.childNodes=new je,B.ownerDocument=this,B.nodeName=b,B.tagName=b,B.namespaceURI=v,F.length==2?(B.prefix=F[0],B.localName=F[1]):B.localName=b,ae._ownerElement=B,B},createAttributeNS:function(v,b){var B=new gs,F=b.split(":");return B.ownerDocument=this,B.nodeName=b,B.name=b,B.namespaceURI=v,B.specified=!0,F.length==2?(B.prefix=F[0],B.localName=F[1]):B.localName=b,B}},J(fe,$e);function Pi(){this._nsMap={}}Pi.prototype={nodeType:Pe,hasAttribute:function(v){return this.getAttributeNode(v)!=null},getAttribute:function(v){var b=this.getAttributeNode(v);return b&&b.value||""},getAttributeNode:function(v){return this.attributes.getNamedItem(v)},setAttribute:function(v,b){var B=this.ownerDocument.createAttribute(v);B.value=B.nodeValue=""+b,this.setAttributeNode(B)},removeAttribute:function(v){var b=this.getAttributeNode(v);b&&this.removeAttributeNode(b)},appendChild:function(v){return v.nodeType===me?this.insertBefore(v,null):Na(this,v)},setAttributeNode:function(v){return this.attributes.setNamedItem(v)},setAttributeNodeNS:function(v){return this.attributes.setNamedItemNS(v)},removeAttributeNode:function(v){return this.attributes.removeNamedItem(v.nodeName)},removeAttributeNS:function(v,b){var B=this.getAttributeNodeNS(v,b);B&&this.removeAttributeNode(B)},hasAttributeNS:function(v,b){return this.getAttributeNodeNS(v,b)!=null},getAttributeNS:function(v,b){var B=this.getAttributeNodeNS(v,b);return B&&B.value||""},setAttributeNS:function(v,b,B){var F=this.ownerDocument.createAttributeNS(v,b);F.value=F.nodeValue=""+B,this.setAttributeNode(F)},getAttributeNodeNS:function(v,b){return this.attributes.getNamedItemNS(v,b)},getElementsByTagName:function(v){return new _t(this,function(b){var B=[];return ci(b,function(F){F!==b&&F.nodeType==Pe&&(v==="*"||F.tagName==v)&&B.push(F)}),B})},getElementsByTagNameNS:function(v,b){return new _t(this,function(B){var F=[];return ci(B,function(ae){ae!==B&&ae.nodeType===Pe&&(v==="*"||ae.namespaceURI===v)&&(b==="*"||ae.localName==b)&&F.push(ae)}),F})}},fe.prototype.getElementsByTagName=Pi.prototype.getElementsByTagName,fe.prototype.getElementsByTagNameNS=Pi.prototype.getElementsByTagNameNS,J(Pi,$e);function gs(){}gs.prototype.nodeType=Me,J(gs,$e);function $i(){}$i.prototype={data:"",substringData:function(v,b){return this.data.substring(v,v+b)},appendData:function(v){v=this.data+v,this.nodeValue=this.data=v,this.length=v.length},insertData:function(v,b){this.replaceData(v,0,b)},appendChild:function(v){throw new Error(De[R])},deleteData:function(v,b){this.replaceData(v,b,"")},replaceData:function(v,b,B){var F=this.data.substring(0,v),ae=this.data.substring(v+b);B=F+B+ae,this.nodeValue=this.data=B,this.length=B.length}},J($i,$e);function gt(){}gt.prototype={nodeName:"#text",nodeType:$,splitText:function(v){var b=this.data,B=b.substring(v);b=b.substring(0,v),this.data=this.nodeValue=b,this.length=b.length;var F=this.ownerDocument.createTextNode(B);return this.parentNode&&this.parentNode.insertBefore(F,this.nextSibling),F}},J(gt,$i);function kn(){}kn.prototype={nodeName:"#comment",nodeType:Oe},J(kn,$i);function vs(){}vs.prototype={nodeName:"#cdata-section",nodeType:Ue},J(vs,$i);function di(){}di.prototype.nodeType=Ce,J(di,$e);function As(){}As.prototype.nodeType=_e,J(As,$e);function cr(){}cr.prototype.nodeType=Xe,J(cr,$e);function ys(){}ys.prototype.nodeType=Se,J(ys,$e);function hi(){}hi.prototype.nodeName="#document-fragment",hi.prototype.nodeType=me,J(hi,$e);function Oi(){}Oi.prototype.nodeType=re,J(Oi,$e);function dr(){}dr.prototype.serializeToString=function(v,b,B){return _s.call(v,b,B)},$e.prototype.toString=_s;function _s(v,b){var B=[],F=this.nodeType==9&&this.documentElement||this,ae=F.prefix,Re=F.namespaceURI;if(Re&&ae==null){var ae=F.lookupPrefix(Re);if(ae==null)var Ge=[{namespace:Re,prefix:null}]}return bi(this,B,v,b,Ge),B.join("")}function hr(v,b,B){var F=v.prefix||"",ae=v.namespaceURI;if(!ae||F==="xml"&&ae===N.XML||ae===N.XMLNS)return!1;for(var Re=B.length;Re--;){var Ge=B[Re];if(Ge.prefix===F)return Ge.namespace!==ae}return!0}function bs(v,b,B){v.push(" ",b,'="',B.replace(/[<>&"\t\n\r]/g,Et),'"')}function bi(v,b,B,F,ae){if(ae||(ae=[]),F)if(v=F(v),v){if(typeof v=="string"){b.push(v);return}}else return;switch(v.nodeType){case Pe:var Re=v.attributes,Ge=Re.length,xt=v.firstChild,Ct=v.tagName;B=N.isHTML(v.namespaceURI)||B;var Gt=Ct;if(!B&&!v.prefix&&v.namespaceURI){for(var Yt,fi=0;fi<Re.length;fi++)if(Re.item(fi).name==="xmlns"){Yt=Re.item(fi).value;break}if(!Yt)for(var Li=ae.length-1;Li>=0;Li--){var Ri=ae[Li];if(Ri.prefix===""&&Ri.namespace===v.namespaceURI){Yt=Ri.namespace;break}}if(Yt!==v.namespaceURI)for(var Li=ae.length-1;Li>=0;Li--){var Ri=ae[Li];if(Ri.namespace===v.namespaceURI){Ri.prefix&&(Gt=Ri.prefix+":"+Ct);break}}}b.push("<",Gt);for(var Mi=0;Mi<Ge;Mi++){var ii=Re.item(Mi);ii.prefix=="xmlns"?ae.push({prefix:ii.localName,namespace:ii.value}):ii.nodeName=="xmlns"&&ae.push({prefix:"",namespace:ii.value})}for(var Mi=0;Mi<Ge;Mi++){var ii=Re.item(Mi);if(hr(ii,B,ae)){var Ni=ii.prefix||"",cn=ii.namespaceURI;bs(b,Ni?"xmlns:"+Ni:"xmlns",cn),ae.push({prefix:Ni,namespace:cn})}bi(ii,b,B,F,ae)}if(Ct===Gt&&hr(v,B,ae)){var Ni=v.prefix||"",cn=v.namespaceURI;bs(b,Ni?"xmlns:"+Ni:"xmlns",cn),ae.push({prefix:Ni,namespace:cn})}if(xt||B&&!/^(?:meta|link|img|br|hr|input)$/i.test(Ct)){if(b.push(">"),B&&/^script$/i.test(Ct))for(;xt;)xt.data?b.push(xt.data):bi(xt,b,B,F,ae.slice()),xt=xt.nextSibling;else for(;xt;)bi(xt,b,B,F,ae.slice()),xt=xt.nextSibling;b.push("</",Gt,">")}else b.push("/>");return;case Te:case me:for(var xt=v.firstChild;xt;)bi(xt,b,B,F,ae.slice()),xt=xt.nextSibling;return;case Me:return bs(b,v.name,v.value);case $:return b.push(v.data.replace(/[<&>]/g,Et));case Ue:return b.push("<![CDATA[",v.data,"]]>");case Oe:return b.push("<!--",v.data,"-->");case Ce:var pr=v.publicId,Gi=v.systemId;if(b.push("<!DOCTYPE ",v.name),pr)b.push(" PUBLIC ",pr),Gi&&Gi!="."&&b.push(" ",Gi),b.push(">");else if(Gi&&Gi!=".")b.push(" SYSTEM ",Gi,">");else{var Ts=v.internalSubset;Ts&&b.push(" [",Ts,"]"),b.push(">")}return;case re:return b.push("<?",v.target," ",v.data,"?>");case Se:return b.push("&",v.nodeName,";");default:b.push("??",v.nodeName)}}function Es(v,b,B){var F;switch(b.nodeType){case Pe:F=b.cloneNode(!1),F.ownerDocument=v;case me:break;case Me:B=!0;break}if(F||(F=b.cloneNode(!1)),F.ownerDocument=v,F.parentNode=null,B)for(var ae=b.firstChild;ae;)F.appendChild(Es(v,ae,B)),ae=ae.nextSibling;return F}function un(v,b,B){var F=new b.constructor;for(var ae in b)if(Object.prototype.hasOwnProperty.call(b,ae)){var Re=b[ae];typeof Re!="object"&&Re!=F[ae]&&(F[ae]=Re)}switch(b.childNodes&&(F.childNodes=new je),F.ownerDocument=v,F.nodeType){case Pe:var Ge=b.attributes,Ct=F.attributes=new mt,Gt=Ge.length;Ct._ownerElement=F;for(var Yt=0;Yt<Gt;Yt++)F.setAttributeNode(un(v,Ge.item(Yt),!0));break;case Me:B=!0}if(B)for(var fi=b.firstChild;fi;)F.appendChild(un(v,fi,B)),fi=fi.nextSibling;return F}function fr(v,b,B){v[b]=B}try{if(Object.defineProperty){let v=function(b){switch(b.nodeType){case Pe:case me:var B=[];for(b=b.firstChild;b;)b.nodeType!==7&&b.nodeType!==8&&B.push(v(b)),b=b.nextSibling;return B.join("");default:return b.nodeValue}};var Ll=v;Object.defineProperty(_t.prototype,"length",{get:function(){return Dt(this),this.$$length}}),Object.defineProperty($e.prototype,"textContent",{get:function(){return v(this)},set:function(b){switch(this.nodeType){case Pe:case me:for(;this.firstChild;)this.removeChild(this.firstChild);(b||String(b))&&this.appendChild(this.ownerDocument.createTextNode(b));break;default:this.data=b,this.value=b,this.nodeValue=b}}}),fr=function(b,B,F){b["$$"+B]=F}}}catch(v){}le.DocumentType=di,le.DOMException=xe,le.DOMImplementation=Dn,le.Element=Pi,le.Node=$e,le.NodeList=je,le.XMLSerializer=dr},56559:function(ke,le,G){"use strict";var ne=G(44582).freeze;le.XML_ENTITIES=ne({amp:"&",apos:"'",gt:">",lt:"<",quot:'"'}),le.HTML_ENTITIES=ne({Aacute:"\xC1",aacute:"\xE1",Abreve:"\u0102",abreve:"\u0103",ac:"\u223E",acd:"\u223F",acE:"\u223E\u0333",Acirc:"\xC2",acirc:"\xE2",acute:"\xB4",Acy:"\u0410",acy:"\u0430",AElig:"\xC6",aelig:"\xE6",af:"\u2061",Afr:"\u{1D504}",afr:"\u{1D51E}",Agrave:"\xC0",agrave:"\xE0",alefsym:"\u2135",aleph:"\u2135",Alpha:"\u0391",alpha:"\u03B1",Amacr:"\u0100",amacr:"\u0101",amalg:"\u2A3F",AMP:"&",amp:"&",And:"\u2A53",and:"\u2227",andand:"\u2A55",andd:"\u2A5C",andslope:"\u2A58",andv:"\u2A5A",ang:"\u2220",ange:"\u29A4",angle:"\u2220",angmsd:"\u2221",angmsdaa:"\u29A8",angmsdab:"\u29A9",angmsdac:"\u29AA",angmsdad:"\u29AB",angmsdae:"\u29AC",angmsdaf:"\u29AD",angmsdag:"\u29AE",angmsdah:"\u29AF",angrt:"\u221F",angrtvb:"\u22BE",angrtvbd:"\u299D",angsph:"\u2222",angst:"\xC5",angzarr:"\u237C",Aogon:"\u0104",aogon:"\u0105",Aopf:"\u{1D538}",aopf:"\u{1D552}",ap:"\u2248",apacir:"\u2A6F",apE:"\u2A70",ape:"\u224A",apid:"\u224B",apos:"'",ApplyFunction:"\u2061",approx:"\u2248",approxeq:"\u224A",Aring:"\xC5",aring:"\xE5",Ascr:"\u{1D49C}",ascr:"\u{1D4B6}",Assign:"\u2254",ast:"*",asymp:"\u2248",asympeq:"\u224D",Atilde:"\xC3",atilde:"\xE3",Auml:"\xC4",auml:"\xE4",awconint:"\u2233",awint:"\u2A11",backcong:"\u224C",backepsilon:"\u03F6",backprime:"\u2035",backsim:"\u223D",backsimeq:"\u22CD",Backslash:"\u2216",Barv:"\u2AE7",barvee:"\u22BD",Barwed:"\u2306",barwed:"\u2305",barwedge:"\u2305",bbrk:"\u23B5",bbrktbrk:"\u23B6",bcong:"\u224C",Bcy:"\u0411",bcy:"\u0431",bdquo:"\u201E",becaus:"\u2235",Because:"\u2235",because:"\u2235",bemptyv:"\u29B0",bepsi:"\u03F6",bernou:"\u212C",Bernoullis:"\u212C",Beta:"\u0392",beta:"\u03B2",beth:"\u2136",between:"\u226C",Bfr:"\u{1D505}",bfr:"\u{1D51F}",bigcap:"\u22C2",bigcirc:"\u25EF",bigcup:"\u22C3",bigodot:"\u2A00",bigoplus:"\u2A01",bigotimes:"\u2A02",bigsqcup:"\u2A06",bigstar:"\u2605",bigtriangledown:"\u25BD",bigtriangleup:"\u25B3",biguplus:"\u2A04",bigvee:"\u22C1",bigwedge:"\u22C0",bkarow:"\u290D",blacklozenge:"\u29EB",blacksquare:"\u25AA",blacktriangle:"\u25B4",blacktriangledown:"\u25BE",blacktriangleleft:"\u25C2",blacktriangleright:"\u25B8",blank:"\u2423",blk12:"\u2592",blk14:"\u2591",blk34:"\u2593",block:"\u2588",bne:"=\u20E5",bnequiv:"\u2261\u20E5",bNot:"\u2AED",bnot:"\u2310",Bopf:"\u{1D539}",bopf:"\u{1D553}",bot:"\u22A5",bottom:"\u22A5",bowtie:"\u22C8",boxbox:"\u29C9",boxDL:"\u2557",boxDl:"\u2556",boxdL:"\u2555",boxdl:"\u2510",boxDR:"\u2554",boxDr:"\u2553",boxdR:"\u2552",boxdr:"\u250C",boxH:"\u2550",boxh:"\u2500",boxHD:"\u2566",boxHd:"\u2564",boxhD:"\u2565",boxhd:"\u252C",boxHU:"\u2569",boxHu:"\u2567",boxhU:"\u2568",boxhu:"\u2534",boxminus:"\u229F",boxplus:"\u229E",boxtimes:"\u22A0",boxUL:"\u255D",boxUl:"\u255C",boxuL:"\u255B",boxul:"\u2518",boxUR:"\u255A",boxUr:"\u2559",boxuR:"\u2558",boxur:"\u2514",boxV:"\u2551",boxv:"\u2502",boxVH:"\u256C",boxVh:"\u256B",boxvH:"\u256A",boxvh:"\u253C",boxVL:"\u2563",boxVl:"\u2562",boxvL:"\u2561",boxvl:"\u2524",boxVR:"\u2560",boxVr:"\u255F",boxvR:"\u255E",boxvr:"\u251C",bprime:"\u2035",Breve:"\u02D8",breve:"\u02D8",brvbar:"\xA6",Bscr:"\u212C",bscr:"\u{1D4B7}",bsemi:"\u204F",bsim:"\u223D",bsime:"\u22CD",bsol:"\\",bsolb:"\u29C5",bsolhsub:"\u27C8",bull:"\u2022",bullet:"\u2022",bump:"\u224E",bumpE:"\u2AAE",bumpe:"\u224F",Bumpeq:"\u224E",bumpeq:"\u224F",Cacute:"\u0106",cacute:"\u0107",Cap:"\u22D2",cap:"\u2229",capand:"\u2A44",capbrcup:"\u2A49",capcap:"\u2A4B",capcup:"\u2A47",capdot:"\u2A40",CapitalDifferentialD:"\u2145",caps:"\u2229\uFE00",caret:"\u2041",caron:"\u02C7",Cayleys:"\u212D",ccaps:"\u2A4D",Ccaron:"\u010C",ccaron:"\u010D",Ccedil:"\xC7",ccedil:"\xE7",Ccirc:"\u0108",ccirc:"\u0109",Cconint:"\u2230",ccups:"\u2A4C",ccupssm:"\u2A50",Cdot:"\u010A",cdot:"\u010B",cedil:"\xB8",Cedilla:"\xB8",cemptyv:"\u29B2",cent:"\xA2",CenterDot:"\xB7",centerdot:"\xB7",Cfr:"\u212D",cfr:"\u{1D520}",CHcy:"\u0427",chcy:"\u0447",check:"\u2713",checkmark:"\u2713",Chi:"\u03A7",chi:"\u03C7",cir:"\u25CB",circ:"\u02C6",circeq:"\u2257",circlearrowleft:"\u21BA",circlearrowright:"\u21BB",circledast:"\u229B",circledcirc:"\u229A",circleddash:"\u229D",CircleDot:"\u2299",circledR:"\xAE",circledS:"\u24C8",CircleMinus:"\u2296",CirclePlus:"\u2295",CircleTimes:"\u2297",cirE:"\u29C3",cire:"\u2257",cirfnint:"\u2A10",cirmid:"\u2AEF",cirscir:"\u29C2",ClockwiseContourIntegral:"\u2232",CloseCurlyDoubleQuote:"\u201D",CloseCurlyQuote:"\u2019",clubs:"\u2663",clubsuit:"\u2663",Colon:"\u2237",colon:":",Colone:"\u2A74",colone:"\u2254",coloneq:"\u2254",comma:",",commat:"@",comp:"\u2201",compfn:"\u2218",complement:"\u2201",complexes:"\u2102",cong:"\u2245",congdot:"\u2A6D",Congruent:"\u2261",Conint:"\u222F",conint:"\u222E",ContourIntegral:"\u222E",Copf:"\u2102",copf:"\u{1D554}",coprod:"\u2210",Coproduct:"\u2210",COPY:"\xA9",copy:"\xA9",copysr:"\u2117",CounterClockwiseContourIntegral:"\u2233",crarr:"\u21B5",Cross:"\u2A2F",cross:"\u2717",Cscr:"\u{1D49E}",cscr:"\u{1D4B8}",csub:"\u2ACF",csube:"\u2AD1",csup:"\u2AD0",csupe:"\u2AD2",ctdot:"\u22EF",cudarrl:"\u2938",cudarrr:"\u2935",cuepr:"\u22DE",cuesc:"\u22DF",cularr:"\u21B6",cularrp:"\u293D",Cup:"\u22D3",cup:"\u222A",cupbrcap:"\u2A48",CupCap:"\u224D",cupcap:"\u2A46",cupcup:"\u2A4A",cupdot:"\u228D",cupor:"\u2A45",cups:"\u222A\uFE00",curarr:"\u21B7",curarrm:"\u293C",curlyeqprec:"\u22DE",curlyeqsucc:"\u22DF",curlyvee:"\u22CE",curlywedge:"\u22CF",curren:"\xA4",curvearrowleft:"\u21B6",curvearrowright:"\u21B7",cuvee:"\u22CE",cuwed:"\u22CF",cwconint:"\u2232",cwint:"\u2231",cylcty:"\u232D",Dagger:"\u2021",dagger:"\u2020",daleth:"\u2138",Darr:"\u21A1",dArr:"\u21D3",darr:"\u2193",dash:"\u2010",Dashv:"\u2AE4",dashv:"\u22A3",dbkarow:"\u290F",dblac:"\u02DD",Dcaron:"\u010E",dcaron:"\u010F",Dcy:"\u0414",dcy:"\u0434",DD:"\u2145",dd:"\u2146",ddagger:"\u2021",ddarr:"\u21CA",DDotrahd:"\u2911",ddotseq:"\u2A77",deg:"\xB0",Del:"\u2207",Delta:"\u0394",delta:"\u03B4",demptyv:"\u29B1",dfisht:"\u297F",Dfr:"\u{1D507}",dfr:"\u{1D521}",dHar:"\u2965",dharl:"\u21C3",dharr:"\u21C2",DiacriticalAcute:"\xB4",DiacriticalDot:"\u02D9",DiacriticalDoubleAcute:"\u02DD",DiacriticalGrave:"`",DiacriticalTilde:"\u02DC",diam:"\u22C4",Diamond:"\u22C4",diamond:"\u22C4",diamondsuit:"\u2666",diams:"\u2666",die:"\xA8",DifferentialD:"\u2146",digamma:"\u03DD",disin:"\u22F2",div:"\xF7",divide:"\xF7",divideontimes:"\u22C7",divonx:"\u22C7",DJcy:"\u0402",djcy:"\u0452",dlcorn:"\u231E",dlcrop:"\u230D",dollar:"$",Dopf:"\u{1D53B}",dopf:"\u{1D555}",Dot:"\xA8",dot:"\u02D9",DotDot:"\u20DC",doteq:"\u2250",doteqdot:"\u2251",DotEqual:"\u2250",dotminus:"\u2238",dotplus:"\u2214",dotsquare:"\u22A1",doublebarwedge:"\u2306",DoubleContourIntegral:"\u222F",DoubleDot:"\xA8",DoubleDownArrow:"\u21D3",DoubleLeftArrow:"\u21D0",DoubleLeftRightArrow:"\u21D4",DoubleLeftTee:"\u2AE4",DoubleLongLeftArrow:"\u27F8",DoubleLongLeftRightArrow:"\u27FA",DoubleLongRightArrow:"\u27F9",DoubleRightArrow:"\u21D2",DoubleRightTee:"\u22A8",DoubleUpArrow:"\u21D1",DoubleUpDownArrow:"\u21D5",DoubleVerticalBar:"\u2225",DownArrow:"\u2193",Downarrow:"\u21D3",downarrow:"\u2193",DownArrowBar:"\u2913",DownArrowUpArrow:"\u21F5",DownBreve:"\u0311",downdownarrows:"\u21CA",downharpoonleft:"\u21C3",downharpoonright:"\u21C2",DownLeftRightVector:"\u2950",DownLeftTeeVector:"\u295E",DownLeftVector:"\u21BD",DownLeftVectorBar:"\u2956",DownRightTeeVector:"\u295F",DownRightVector:"\u21C1",DownRightVectorBar:"\u2957",DownTee:"\u22A4",DownTeeArrow:"\u21A7",drbkarow:"\u2910",drcorn:"\u231F",drcrop:"\u230C",Dscr:"\u{1D49F}",dscr:"\u{1D4B9}",DScy:"\u0405",dscy:"\u0455",dsol:"\u29F6",Dstrok:"\u0110",dstrok:"\u0111",dtdot:"\u22F1",dtri:"\u25BF",dtrif:"\u25BE",duarr:"\u21F5",duhar:"\u296F",dwangle:"\u29A6",DZcy:"\u040F",dzcy:"\u045F",dzigrarr:"\u27FF",Eacute:"\xC9",eacute:"\xE9",easter:"\u2A6E",Ecaron:"\u011A",ecaron:"\u011B",ecir:"\u2256",Ecirc:"\xCA",ecirc:"\xEA",ecolon:"\u2255",Ecy:"\u042D",ecy:"\u044D",eDDot:"\u2A77",Edot:"\u0116",eDot:"\u2251",edot:"\u0117",ee:"\u2147",efDot:"\u2252",Efr:"\u{1D508}",efr:"\u{1D522}",eg:"\u2A9A",Egrave:"\xC8",egrave:"\xE8",egs:"\u2A96",egsdot:"\u2A98",el:"\u2A99",Element:"\u2208",elinters:"\u23E7",ell:"\u2113",els:"\u2A95",elsdot:"\u2A97",Emacr:"\u0112",emacr:"\u0113",empty:"\u2205",emptyset:"\u2205",EmptySmallSquare:"\u25FB",emptyv:"\u2205",EmptyVerySmallSquare:"\u25AB",emsp:"\u2003",emsp13:"\u2004",emsp14:"\u2005",ENG:"\u014A",eng:"\u014B",ensp:"\u2002",Eogon:"\u0118",eogon:"\u0119",Eopf:"\u{1D53C}",eopf:"\u{1D556}",epar:"\u22D5",eparsl:"\u29E3",eplus:"\u2A71",epsi:"\u03B5",Epsilon:"\u0395",epsilon:"\u03B5",epsiv:"\u03F5",eqcirc:"\u2256",eqcolon:"\u2255",eqsim:"\u2242",eqslantgtr:"\u2A96",eqslantless:"\u2A95",Equal:"\u2A75",equals:"=",EqualTilde:"\u2242",equest:"\u225F",Equilibrium:"\u21CC",equiv:"\u2261",equivDD:"\u2A78",eqvparsl:"\u29E5",erarr:"\u2971",erDot:"\u2253",Escr:"\u2130",escr:"\u212F",esdot:"\u2250",Esim:"\u2A73",esim:"\u2242",Eta:"\u0397",eta:"\u03B7",ETH:"\xD0",eth:"\xF0",Euml:"\xCB",euml:"\xEB",euro:"\u20AC",excl:"!",exist:"\u2203",Exists:"\u2203",expectation:"\u2130",ExponentialE:"\u2147",exponentiale:"\u2147",fallingdotseq:"\u2252",Fcy:"\u0424",fcy:"\u0444",female:"\u2640",ffilig:"\uFB03",fflig:"\uFB00",ffllig:"\uFB04",Ffr:"\u{1D509}",ffr:"\u{1D523}",filig:"\uFB01",FilledSmallSquare:"\u25FC",FilledVerySmallSquare:"\u25AA",fjlig:"fj",flat:"\u266D",fllig:"\uFB02",fltns:"\u25B1",fnof:"\u0192",Fopf:"\u{1D53D}",fopf:"\u{1D557}",ForAll:"\u2200",forall:"\u2200",fork:"\u22D4",forkv:"\u2AD9",Fouriertrf:"\u2131",fpartint:"\u2A0D",frac12:"\xBD",frac13:"\u2153",frac14:"\xBC",frac15:"\u2155",frac16:"\u2159",frac18:"\u215B",frac23:"\u2154",frac25:"\u2156",frac34:"\xBE",frac35:"\u2157",frac38:"\u215C",frac45:"\u2158",frac56:"\u215A",frac58:"\u215D",frac78:"\u215E",frasl:"\u2044",frown:"\u2322",Fscr:"\u2131",fscr:"\u{1D4BB}",gacute:"\u01F5",Gamma:"\u0393",gamma:"\u03B3",Gammad:"\u03DC",gammad:"\u03DD",gap:"\u2A86",Gbreve:"\u011E",gbreve:"\u011F",Gcedil:"\u0122",Gcirc:"\u011C",gcirc:"\u011D",Gcy:"\u0413",gcy:"\u0433",Gdot:"\u0120",gdot:"\u0121",gE:"\u2267",ge:"\u2265",gEl:"\u2A8C",gel:"\u22DB",geq:"\u2265",geqq:"\u2267",geqslant:"\u2A7E",ges:"\u2A7E",gescc:"\u2AA9",gesdot:"\u2A80",gesdoto:"\u2A82",gesdotol:"\u2A84",gesl:"\u22DB\uFE00",gesles:"\u2A94",Gfr:"\u{1D50A}",gfr:"\u{1D524}",Gg:"\u22D9",gg:"\u226B",ggg:"\u22D9",gimel:"\u2137",GJcy:"\u0403",gjcy:"\u0453",gl:"\u2277",gla:"\u2AA5",glE:"\u2A92",glj:"\u2AA4",gnap:"\u2A8A",gnapprox:"\u2A8A",gnE:"\u2269",gne:"\u2A88",gneq:"\u2A88",gneqq:"\u2269",gnsim:"\u22E7",Gopf:"\u{1D53E}",gopf:"\u{1D558}",grave:"`",GreaterEqual:"\u2265",GreaterEqualLess:"\u22DB",GreaterFullEqual:"\u2267",GreaterGreater:"\u2AA2",GreaterLess:"\u2277",GreaterSlantEqual:"\u2A7E",GreaterTilde:"\u2273",Gscr:"\u{1D4A2}",gscr:"\u210A",gsim:"\u2273",gsime:"\u2A8E",gsiml:"\u2A90",Gt:"\u226B",GT:">",gt:">",gtcc:"\u2AA7",gtcir:"\u2A7A",gtdot:"\u22D7",gtlPar:"\u2995",gtquest:"\u2A7C",gtrapprox:"\u2A86",gtrarr:"\u2978",gtrdot:"\u22D7",gtreqless:"\u22DB",gtreqqless:"\u2A8C",gtrless:"\u2277",gtrsim:"\u2273",gvertneqq:"\u2269\uFE00",gvnE:"\u2269\uFE00",Hacek:"\u02C7",hairsp:"\u200A",half:"\xBD",hamilt:"\u210B",HARDcy:"\u042A",hardcy:"\u044A",hArr:"\u21D4",harr:"\u2194",harrcir:"\u2948",harrw:"\u21AD",Hat:"^",hbar:"\u210F",Hcirc:"\u0124",hcirc:"\u0125",hearts:"\u2665",heartsuit:"\u2665",hellip:"\u2026",hercon:"\u22B9",Hfr:"\u210C",hfr:"\u{1D525}",HilbertSpace:"\u210B",hksearow:"\u2925",hkswarow:"\u2926",hoarr:"\u21FF",homtht:"\u223B",hookleftarrow:"\u21A9",hookrightarrow:"\u21AA",Hopf:"\u210D",hopf:"\u{1D559}",horbar:"\u2015",HorizontalLine:"\u2500",Hscr:"\u210B",hscr:"\u{1D4BD}",hslash:"\u210F",Hstrok:"\u0126",hstrok:"\u0127",HumpDownHump:"\u224E",HumpEqual:"\u224F",hybull:"\u2043",hyphen:"\u2010",Iacute:"\xCD",iacute:"\xED",ic:"\u2063",Icirc:"\xCE",icirc:"\xEE",Icy:"\u0418",icy:"\u0438",Idot:"\u0130",IEcy:"\u0415",iecy:"\u0435",iexcl:"\xA1",iff:"\u21D4",Ifr:"\u2111",ifr:"\u{1D526}",Igrave:"\xCC",igrave:"\xEC",ii:"\u2148",iiiint:"\u2A0C",iiint:"\u222D",iinfin:"\u29DC",iiota:"\u2129",IJlig:"\u0132",ijlig:"\u0133",Im:"\u2111",Imacr:"\u012A",imacr:"\u012B",image:"\u2111",ImaginaryI:"\u2148",imagline:"\u2110",imagpart:"\u2111",imath:"\u0131",imof:"\u22B7",imped:"\u01B5",Implies:"\u21D2",in:"\u2208",incare:"\u2105",infin:"\u221E",infintie:"\u29DD",inodot:"\u0131",Int:"\u222C",int:"\u222B",intcal:"\u22BA",integers:"\u2124",Integral:"\u222B",intercal:"\u22BA",Intersection:"\u22C2",intlarhk:"\u2A17",intprod:"\u2A3C",InvisibleComma:"\u2063",InvisibleTimes:"\u2062",IOcy:"\u0401",iocy:"\u0451",Iogon:"\u012E",iogon:"\u012F",Iopf:"\u{1D540}",iopf:"\u{1D55A}",Iota:"\u0399",iota:"\u03B9",iprod:"\u2A3C",iquest:"\xBF",Iscr:"\u2110",iscr:"\u{1D4BE}",isin:"\u2208",isindot:"\u22F5",isinE:"\u22F9",isins:"\u22F4",isinsv:"\u22F3",isinv:"\u2208",it:"\u2062",Itilde:"\u0128",itilde:"\u0129",Iukcy:"\u0406",iukcy:"\u0456",Iuml:"\xCF",iuml:"\xEF",Jcirc:"\u0134",jcirc:"\u0135",Jcy:"\u0419",jcy:"\u0439",Jfr:"\u{1D50D}",jfr:"\u{1D527}",jmath:"\u0237",Jopf:"\u{1D541}",jopf:"\u{1D55B}",Jscr:"\u{1D4A5}",jscr:"\u{1D4BF}",Jsercy:"\u0408",jsercy:"\u0458",Jukcy:"\u0404",jukcy:"\u0454",Kappa:"\u039A",kappa:"\u03BA",kappav:"\u03F0",Kcedil:"\u0136",kcedil:"\u0137",Kcy:"\u041A",kcy:"\u043A",Kfr:"\u{1D50E}",kfr:"\u{1D528}",kgreen:"\u0138",KHcy:"\u0425",khcy:"\u0445",KJcy:"\u040C",kjcy:"\u045C",Kopf:"\u{1D542}",kopf:"\u{1D55C}",Kscr:"\u{1D4A6}",kscr:"\u{1D4C0}",lAarr:"\u21DA",Lacute:"\u0139",lacute:"\u013A",laemptyv:"\u29B4",lagran:"\u2112",Lambda:"\u039B",lambda:"\u03BB",Lang:"\u27EA",lang:"\u27E8",langd:"\u2991",langle:"\u27E8",lap:"\u2A85",Laplacetrf:"\u2112",laquo:"\xAB",Larr:"\u219E",lArr:"\u21D0",larr:"\u2190",larrb:"\u21E4",larrbfs:"\u291F",larrfs:"\u291D",larrhk:"\u21A9",larrlp:"\u21AB",larrpl:"\u2939",larrsim:"\u2973",larrtl:"\u21A2",lat:"\u2AAB",lAtail:"\u291B",latail:"\u2919",late:"\u2AAD",lates:"\u2AAD\uFE00",lBarr:"\u290E",lbarr:"\u290C",lbbrk:"\u2772",lbrace:"{",lbrack:"[",lbrke:"\u298B",lbrksld:"\u298F",lbrkslu:"\u298D",Lcaron:"\u013D",lcaron:"\u013E",Lcedil:"\u013B",lcedil:"\u013C",lceil:"\u2308",lcub:"{",Lcy:"\u041B",lcy:"\u043B",ldca:"\u2936",ldquo:"\u201C",ldquor:"\u201E",ldrdhar:"\u2967",ldrushar:"\u294B",ldsh:"\u21B2",lE:"\u2266",le:"\u2264",LeftAngleBracket:"\u27E8",LeftArrow:"\u2190",Leftarrow:"\u21D0",leftarrow:"\u2190",LeftArrowBar:"\u21E4",LeftArrowRightArrow:"\u21C6",leftarrowtail:"\u21A2",LeftCeiling:"\u2308",LeftDoubleBracket:"\u27E6",LeftDownTeeVector:"\u2961",LeftDownVector:"\u21C3",LeftDownVectorBar:"\u2959",LeftFloor:"\u230A",leftharpoondown:"\u21BD",leftharpoonup:"\u21BC",leftleftarrows:"\u21C7",LeftRightArrow:"\u2194",Leftrightarrow:"\u21D4",leftrightarrow:"\u2194",leftrightarrows:"\u21C6",leftrightharpoons:"\u21CB",leftrightsquigarrow:"\u21AD",LeftRightVector:"\u294E",LeftTee:"\u22A3",LeftTeeArrow:"\u21A4",LeftTeeVector:"\u295A",leftthreetimes:"\u22CB",LeftTriangle:"\u22B2",LeftTriangleBar:"\u29CF",LeftTriangleEqual:"\u22B4",LeftUpDownVector:"\u2951",LeftUpTeeVector:"\u2960",LeftUpVector:"\u21BF",LeftUpVectorBar:"\u2958",LeftVector:"\u21BC",LeftVectorBar:"\u2952",lEg:"\u2A8B",leg:"\u22DA",leq:"\u2264",leqq:"\u2266",leqslant:"\u2A7D",les:"\u2A7D",lescc:"\u2AA8",lesdot:"\u2A7F",lesdoto:"\u2A81",lesdotor:"\u2A83",lesg:"\u22DA\uFE00",lesges:"\u2A93",lessapprox:"\u2A85",lessdot:"\u22D6",lesseqgtr:"\u22DA",lesseqqgtr:"\u2A8B",LessEqualGreater:"\u22DA",LessFullEqual:"\u2266",LessGreater:"\u2276",lessgtr:"\u2276",LessLess:"\u2AA1",lesssim:"\u2272",LessSlantEqual:"\u2A7D",LessTilde:"\u2272",lfisht:"\u297C",lfloor:"\u230A",Lfr:"\u{1D50F}",lfr:"\u{1D529}",lg:"\u2276",lgE:"\u2A91",lHar:"\u2962",lhard:"\u21BD",lharu:"\u21BC",lharul:"\u296A",lhblk:"\u2584",LJcy:"\u0409",ljcy:"\u0459",Ll:"\u22D8",ll:"\u226A",llarr:"\u21C7",llcorner:"\u231E",Lleftarrow:"\u21DA",llhard:"\u296B",lltri:"\u25FA",Lmidot:"\u013F",lmidot:"\u0140",lmoust:"\u23B0",lmoustache:"\u23B0",lnap:"\u2A89",lnapprox:"\u2A89",lnE:"\u2268",lne:"\u2A87",lneq:"\u2A87",lneqq:"\u2268",lnsim:"\u22E6",loang:"\u27EC",loarr:"\u21FD",lobrk:"\u27E6",LongLeftArrow:"\u27F5",Longleftarrow:"\u27F8",longleftarrow:"\u27F5",LongLeftRightArrow:"\u27F7",Longleftrightarrow:"\u27FA",longleftrightarrow:"\u27F7",longmapsto:"\u27FC",LongRightArrow:"\u27F6",Longrightarrow:"\u27F9",longrightarrow:"\u27F6",looparrowleft:"\u21AB",looparrowright:"\u21AC",lopar:"\u2985",Lopf:"\u{1D543}",lopf:"\u{1D55D}",loplus:"\u2A2D",lotimes:"\u2A34",lowast:"\u2217",lowbar:"_",LowerLeftArrow:"\u2199",LowerRightArrow:"\u2198",loz:"\u25CA",lozenge:"\u25CA",lozf:"\u29EB",lpar:"(",lparlt:"\u2993",lrarr:"\u21C6",lrcorner:"\u231F",lrhar:"\u21CB",lrhard:"\u296D",lrm:"\u200E",lrtri:"\u22BF",lsaquo:"\u2039",Lscr:"\u2112",lscr:"\u{1D4C1}",Lsh:"\u21B0",lsh:"\u21B0",lsim:"\u2272",lsime:"\u2A8D",lsimg:"\u2A8F",lsqb:"[",lsquo:"\u2018",lsquor:"\u201A",Lstrok:"\u0141",lstrok:"\u0142",Lt:"\u226A",LT:"<",lt:"<",ltcc:"\u2AA6",ltcir:"\u2A79",ltdot:"\u22D6",lthree:"\u22CB",ltimes:"\u22C9",ltlarr:"\u2976",ltquest:"\u2A7B",ltri:"\u25C3",ltrie:"\u22B4",ltrif:"\u25C2",ltrPar:"\u2996",lurdshar:"\u294A",luruhar:"\u2966",lvertneqq:"\u2268\uFE00",lvnE:"\u2268\uFE00",macr:"\xAF",male:"\u2642",malt:"\u2720",maltese:"\u2720",Map:"\u2905",map:"\u21A6",mapsto:"\u21A6",mapstodown:"\u21A7",mapstoleft:"\u21A4",mapstoup:"\u21A5",marker:"\u25AE",mcomma:"\u2A29",Mcy:"\u041C",mcy:"\u043C",mdash:"\u2014",mDDot:"\u223A",measuredangle:"\u2221",MediumSpace:"\u205F",Mellintrf:"\u2133",Mfr:"\u{1D510}",mfr:"\u{1D52A}",mho:"\u2127",micro:"\xB5",mid:"\u2223",midast:"*",midcir:"\u2AF0",middot:"\xB7",minus:"\u2212",minusb:"\u229F",minusd:"\u2238",minusdu:"\u2A2A",MinusPlus:"\u2213",mlcp:"\u2ADB",mldr:"\u2026",mnplus:"\u2213",models:"\u22A7",Mopf:"\u{1D544}",mopf:"\u{1D55E}",mp:"\u2213",Mscr:"\u2133",mscr:"\u{1D4C2}",mstpos:"\u223E",Mu:"\u039C",mu:"\u03BC",multimap:"\u22B8",mumap:"\u22B8",nabla:"\u2207",Nacute:"\u0143",nacute:"\u0144",nang:"\u2220\u20D2",nap:"\u2249",napE:"\u2A70\u0338",napid:"\u224B\u0338",napos:"\u0149",napprox:"\u2249",natur:"\u266E",natural:"\u266E",naturals:"\u2115",nbsp:"\xA0",nbump:"\u224E\u0338",nbumpe:"\u224F\u0338",ncap:"\u2A43",Ncaron:"\u0147",ncaron:"\u0148",Ncedil:"\u0145",ncedil:"\u0146",ncong:"\u2247",ncongdot:"\u2A6D\u0338",ncup:"\u2A42",Ncy:"\u041D",ncy:"\u043D",ndash:"\u2013",ne:"\u2260",nearhk:"\u2924",neArr:"\u21D7",nearr:"\u2197",nearrow:"\u2197",nedot:"\u2250\u0338",NegativeMediumSpace:"\u200B",NegativeThickSpace:"\u200B",NegativeThinSpace:"\u200B",NegativeVeryThinSpace:"\u200B",nequiv:"\u2262",nesear:"\u2928",nesim:"\u2242\u0338",NestedGreaterGreater:"\u226B",NestedLessLess:"\u226A",NewLine:`
`,nexist:"\u2204",nexists:"\u2204",Nfr:"\u{1D511}",nfr:"\u{1D52B}",ngE:"\u2267\u0338",nge:"\u2271",ngeq:"\u2271",ngeqq:"\u2267\u0338",ngeqslant:"\u2A7E\u0338",nges:"\u2A7E\u0338",nGg:"\u22D9\u0338",ngsim:"\u2275",nGt:"\u226B\u20D2",ngt:"\u226F",ngtr:"\u226F",nGtv:"\u226B\u0338",nhArr:"\u21CE",nharr:"\u21AE",nhpar:"\u2AF2",ni:"\u220B",nis:"\u22FC",nisd:"\u22FA",niv:"\u220B",NJcy:"\u040A",njcy:"\u045A",nlArr:"\u21CD",nlarr:"\u219A",nldr:"\u2025",nlE:"\u2266\u0338",nle:"\u2270",nLeftarrow:"\u21CD",nleftarrow:"\u219A",nLeftrightarrow:"\u21CE",nleftrightarrow:"\u21AE",nleq:"\u2270",nleqq:"\u2266\u0338",nleqslant:"\u2A7D\u0338",nles:"\u2A7D\u0338",nless:"\u226E",nLl:"\u22D8\u0338",nlsim:"\u2274",nLt:"\u226A\u20D2",nlt:"\u226E",nltri:"\u22EA",nltrie:"\u22EC",nLtv:"\u226A\u0338",nmid:"\u2224",NoBreak:"\u2060",NonBreakingSpace:"\xA0",Nopf:"\u2115",nopf:"\u{1D55F}",Not:"\u2AEC",not:"\xAC",NotCongruent:"\u2262",NotCupCap:"\u226D",NotDoubleVerticalBar:"\u2226",NotElement:"\u2209",NotEqual:"\u2260",NotEqualTilde:"\u2242\u0338",NotExists:"\u2204",NotGreater:"\u226F",NotGreaterEqual:"\u2271",NotGreaterFullEqual:"\u2267\u0338",NotGreaterGreater:"\u226B\u0338",NotGreaterLess:"\u2279",NotGreaterSlantEqual:"\u2A7E\u0338",NotGreaterTilde:"\u2275",NotHumpDownHump:"\u224E\u0338",NotHumpEqual:"\u224F\u0338",notin:"\u2209",notindot:"\u22F5\u0338",notinE:"\u22F9\u0338",notinva:"\u2209",notinvb:"\u22F7",notinvc:"\u22F6",NotLeftTriangle:"\u22EA",NotLeftTriangleBar:"\u29CF\u0338",NotLeftTriangleEqual:"\u22EC",NotLess:"\u226E",NotLessEqual:"\u2270",NotLessGreater:"\u2278",NotLessLess:"\u226A\u0338",NotLessSlantEqual:"\u2A7D\u0338",NotLessTilde:"\u2274",NotNestedGreaterGreater:"\u2AA2\u0338",NotNestedLessLess:"\u2AA1\u0338",notni:"\u220C",notniva:"\u220C",notnivb:"\u22FE",notnivc:"\u22FD",NotPrecedes:"\u2280",NotPrecedesEqual:"\u2AAF\u0338",NotPrecedesSlantEqual:"\u22E0",NotReverseElement:"\u220C",NotRightTriangle:"\u22EB",NotRightTriangleBar:"\u29D0\u0338",NotRightTriangleEqual:"\u22ED",NotSquareSubset:"\u228F\u0338",NotSquareSubsetEqual:"\u22E2",NotSquareSuperset:"\u2290\u0338",NotSquareSupersetEqual:"\u22E3",NotSubset:"\u2282\u20D2",NotSubsetEqual:"\u2288",NotSucceeds:"\u2281",NotSucceedsEqual:"\u2AB0\u0338",NotSucceedsSlantEqual:"\u22E1",NotSucceedsTilde:"\u227F\u0338",NotSuperset:"\u2283\u20D2",NotSupersetEqual:"\u2289",NotTilde:"\u2241",NotTildeEqual:"\u2244",NotTildeFullEqual:"\u2247",NotTildeTilde:"\u2249",NotVerticalBar:"\u2224",npar:"\u2226",nparallel:"\u2226",nparsl:"\u2AFD\u20E5",npart:"\u2202\u0338",npolint:"\u2A14",npr:"\u2280",nprcue:"\u22E0",npre:"\u2AAF\u0338",nprec:"\u2280",npreceq:"\u2AAF\u0338",nrArr:"\u21CF",nrarr:"\u219B",nrarrc:"\u2933\u0338",nrarrw:"\u219D\u0338",nRightarrow:"\u21CF",nrightarrow:"\u219B",nrtri:"\u22EB",nrtrie:"\u22ED",nsc:"\u2281",nsccue:"\u22E1",nsce:"\u2AB0\u0338",Nscr:"\u{1D4A9}",nscr:"\u{1D4C3}",nshortmid:"\u2224",nshortparallel:"\u2226",nsim:"\u2241",nsime:"\u2244",nsimeq:"\u2244",nsmid:"\u2224",nspar:"\u2226",nsqsube:"\u22E2",nsqsupe:"\u22E3",nsub:"\u2284",nsubE:"\u2AC5\u0338",nsube:"\u2288",nsubset:"\u2282\u20D2",nsubseteq:"\u2288",nsubseteqq:"\u2AC5\u0338",nsucc:"\u2281",nsucceq:"\u2AB0\u0338",nsup:"\u2285",nsupE:"\u2AC6\u0338",nsupe:"\u2289",nsupset:"\u2283\u20D2",nsupseteq:"\u2289",nsupseteqq:"\u2AC6\u0338",ntgl:"\u2279",Ntilde:"\xD1",ntilde:"\xF1",ntlg:"\u2278",ntriangleleft:"\u22EA",ntrianglelefteq:"\u22EC",ntriangleright:"\u22EB",ntrianglerighteq:"\u22ED",Nu:"\u039D",nu:"\u03BD",num:"#",numero:"\u2116",numsp:"\u2007",nvap:"\u224D\u20D2",nVDash:"\u22AF",nVdash:"\u22AE",nvDash:"\u22AD",nvdash:"\u22AC",nvge:"\u2265\u20D2",nvgt:">\u20D2",nvHarr:"\u2904",nvinfin:"\u29DE",nvlArr:"\u2902",nvle:"\u2264\u20D2",nvlt:"<\u20D2",nvltrie:"\u22B4\u20D2",nvrArr:"\u2903",nvrtrie:"\u22B5\u20D2",nvsim:"\u223C\u20D2",nwarhk:"\u2923",nwArr:"\u21D6",nwarr:"\u2196",nwarrow:"\u2196",nwnear:"\u2927",Oacute:"\xD3",oacute:"\xF3",oast:"\u229B",ocir:"\u229A",Ocirc:"\xD4",ocirc:"\xF4",Ocy:"\u041E",ocy:"\u043E",odash:"\u229D",Odblac:"\u0150",odblac:"\u0151",odiv:"\u2A38",odot:"\u2299",odsold:"\u29BC",OElig:"\u0152",oelig:"\u0153",ofcir:"\u29BF",Ofr:"\u{1D512}",ofr:"\u{1D52C}",ogon:"\u02DB",Ograve:"\xD2",ograve:"\xF2",ogt:"\u29C1",ohbar:"\u29B5",ohm:"\u03A9",oint:"\u222E",olarr:"\u21BA",olcir:"\u29BE",olcross:"\u29BB",oline:"\u203E",olt:"\u29C0",Omacr:"\u014C",omacr:"\u014D",Omega:"\u03A9",omega:"\u03C9",Omicron:"\u039F",omicron:"\u03BF",omid:"\u29B6",ominus:"\u2296",Oopf:"\u{1D546}",oopf:"\u{1D560}",opar:"\u29B7",OpenCurlyDoubleQuote:"\u201C",OpenCurlyQuote:"\u2018",operp:"\u29B9",oplus:"\u2295",Or:"\u2A54",or:"\u2228",orarr:"\u21BB",ord:"\u2A5D",order:"\u2134",orderof:"\u2134",ordf:"\xAA",ordm:"\xBA",origof:"\u22B6",oror:"\u2A56",orslope:"\u2A57",orv:"\u2A5B",oS:"\u24C8",Oscr:"\u{1D4AA}",oscr:"\u2134",Oslash:"\xD8",oslash:"\xF8",osol:"\u2298",Otilde:"\xD5",otilde:"\xF5",Otimes:"\u2A37",otimes:"\u2297",otimesas:"\u2A36",Ouml:"\xD6",ouml:"\xF6",ovbar:"\u233D",OverBar:"\u203E",OverBrace:"\u23DE",OverBracket:"\u23B4",OverParenthesis:"\u23DC",par:"\u2225",para:"\xB6",parallel:"\u2225",parsim:"\u2AF3",parsl:"\u2AFD",part:"\u2202",PartialD:"\u2202",Pcy:"\u041F",pcy:"\u043F",percnt:"%",period:".",permil:"\u2030",perp:"\u22A5",pertenk:"\u2031",Pfr:"\u{1D513}",pfr:"\u{1D52D}",Phi:"\u03A6",phi:"\u03C6",phiv:"\u03D5",phmmat:"\u2133",phone:"\u260E",Pi:"\u03A0",pi:"\u03C0",pitchfork:"\u22D4",piv:"\u03D6",planck:"\u210F",planckh:"\u210E",plankv:"\u210F",plus:"+",plusacir:"\u2A23",plusb:"\u229E",pluscir:"\u2A22",plusdo:"\u2214",plusdu:"\u2A25",pluse:"\u2A72",PlusMinus:"\xB1",plusmn:"\xB1",plussim:"\u2A26",plustwo:"\u2A27",pm:"\xB1",Poincareplane:"\u210C",pointint:"\u2A15",Popf:"\u2119",popf:"\u{1D561}",pound:"\xA3",Pr:"\u2ABB",pr:"\u227A",prap:"\u2AB7",prcue:"\u227C",prE:"\u2AB3",pre:"\u2AAF",prec:"\u227A",precapprox:"\u2AB7",preccurlyeq:"\u227C",Precedes:"\u227A",PrecedesEqual:"\u2AAF",PrecedesSlantEqual:"\u227C",PrecedesTilde:"\u227E",preceq:"\u2AAF",precnapprox:"\u2AB9",precneqq:"\u2AB5",precnsim:"\u22E8",precsim:"\u227E",Prime:"\u2033",prime:"\u2032",primes:"\u2119",prnap:"\u2AB9",prnE:"\u2AB5",prnsim:"\u22E8",prod:"\u220F",Product:"\u220F",profalar:"\u232E",profline:"\u2312",profsurf:"\u2313",prop:"\u221D",Proportion:"\u2237",Proportional:"\u221D",propto:"\u221D",prsim:"\u227E",prurel:"\u22B0",Pscr:"\u{1D4AB}",pscr:"\u{1D4C5}",Psi:"\u03A8",psi:"\u03C8",puncsp:"\u2008",Qfr:"\u{1D514}",qfr:"\u{1D52E}",qint:"\u2A0C",Qopf:"\u211A",qopf:"\u{1D562}",qprime:"\u2057",Qscr:"\u{1D4AC}",qscr:"\u{1D4C6}",quaternions:"\u210D",quatint:"\u2A16",quest:"?",questeq:"\u225F",QUOT:'"',quot:'"',rAarr:"\u21DB",race:"\u223D\u0331",Racute:"\u0154",racute:"\u0155",radic:"\u221A",raemptyv:"\u29B3",Rang:"\u27EB",rang:"\u27E9",rangd:"\u2992",range:"\u29A5",rangle:"\u27E9",raquo:"\xBB",Rarr:"\u21A0",rArr:"\u21D2",rarr:"\u2192",rarrap:"\u2975",rarrb:"\u21E5",rarrbfs:"\u2920",rarrc:"\u2933",rarrfs:"\u291E",rarrhk:"\u21AA",rarrlp:"\u21AC",rarrpl:"\u2945",rarrsim:"\u2974",Rarrtl:"\u2916",rarrtl:"\u21A3",rarrw:"\u219D",rAtail:"\u291C",ratail:"\u291A",ratio:"\u2236",rationals:"\u211A",RBarr:"\u2910",rBarr:"\u290F",rbarr:"\u290D",rbbrk:"\u2773",rbrace:"}",rbrack:"]",rbrke:"\u298C",rbrksld:"\u298E",rbrkslu:"\u2990",Rcaron:"\u0158",rcaron:"\u0159",Rcedil:"\u0156",rcedil:"\u0157",rceil:"\u2309",rcub:"}",Rcy:"\u0420",rcy:"\u0440",rdca:"\u2937",rdldhar:"\u2969",rdquo:"\u201D",rdquor:"\u201D",rdsh:"\u21B3",Re:"\u211C",real:"\u211C",realine:"\u211B",realpart:"\u211C",reals:"\u211D",rect:"\u25AD",REG:"\xAE",reg:"\xAE",ReverseElement:"\u220B",ReverseEquilibrium:"\u21CB",ReverseUpEquilibrium:"\u296F",rfisht:"\u297D",rfloor:"\u230B",Rfr:"\u211C",rfr:"\u{1D52F}",rHar:"\u2964",rhard:"\u21C1",rharu:"\u21C0",rharul:"\u296C",Rho:"\u03A1",rho:"\u03C1",rhov:"\u03F1",RightAngleBracket:"\u27E9",RightArrow:"\u2192",Rightarrow:"\u21D2",rightarrow:"\u2192",RightArrowBar:"\u21E5",RightArrowLeftArrow:"\u21C4",rightarrowtail:"\u21A3",RightCeiling:"\u2309",RightDoubleBracket:"\u27E7",RightDownTeeVector:"\u295D",RightDownVector:"\u21C2",RightDownVectorBar:"\u2955",RightFloor:"\u230B",rightharpoondown:"\u21C1",rightharpoonup:"\u21C0",rightleftarrows:"\u21C4",rightleftharpoons:"\u21CC",rightrightarrows:"\u21C9",rightsquigarrow:"\u219D",RightTee:"\u22A2",RightTeeArrow:"\u21A6",RightTeeVector:"\u295B",rightthreetimes:"\u22CC",RightTriangle:"\u22B3",RightTriangleBar:"\u29D0",RightTriangleEqual:"\u22B5",RightUpDownVector:"\u294F",RightUpTeeVector:"\u295C",RightUpVector:"\u21BE",RightUpVectorBar:"\u2954",RightVector:"\u21C0",RightVectorBar:"\u2953",ring:"\u02DA",risingdotseq:"\u2253",rlarr:"\u21C4",rlhar:"\u21CC",rlm:"\u200F",rmoust:"\u23B1",rmoustache:"\u23B1",rnmid:"\u2AEE",roang:"\u27ED",roarr:"\u21FE",robrk:"\u27E7",ropar:"\u2986",Ropf:"\u211D",ropf:"\u{1D563}",roplus:"\u2A2E",rotimes:"\u2A35",RoundImplies:"\u2970",rpar:")",rpargt:"\u2994",rppolint:"\u2A12",rrarr:"\u21C9",Rrightarrow:"\u21DB",rsaquo:"\u203A",Rscr:"\u211B",rscr:"\u{1D4C7}",Rsh:"\u21B1",rsh:"\u21B1",rsqb:"]",rsquo:"\u2019",rsquor:"\u2019",rthree:"\u22CC",rtimes:"\u22CA",rtri:"\u25B9",rtrie:"\u22B5",rtrif:"\u25B8",rtriltri:"\u29CE",RuleDelayed:"\u29F4",ruluhar:"\u2968",rx:"\u211E",Sacute:"\u015A",sacute:"\u015B",sbquo:"\u201A",Sc:"\u2ABC",sc:"\u227B",scap:"\u2AB8",Scaron:"\u0160",scaron:"\u0161",sccue:"\u227D",scE:"\u2AB4",sce:"\u2AB0",Scedil:"\u015E",scedil:"\u015F",Scirc:"\u015C",scirc:"\u015D",scnap:"\u2ABA",scnE:"\u2AB6",scnsim:"\u22E9",scpolint:"\u2A13",scsim:"\u227F",Scy:"\u0421",scy:"\u0441",sdot:"\u22C5",sdotb:"\u22A1",sdote:"\u2A66",searhk:"\u2925",seArr:"\u21D8",searr:"\u2198",searrow:"\u2198",sect:"\xA7",semi:";",seswar:"\u2929",setminus:"\u2216",setmn:"\u2216",sext:"\u2736",Sfr:"\u{1D516}",sfr:"\u{1D530}",sfrown:"\u2322",sharp:"\u266F",SHCHcy:"\u0429",shchcy:"\u0449",SHcy:"\u0428",shcy:"\u0448",ShortDownArrow:"\u2193",ShortLeftArrow:"\u2190",shortmid:"\u2223",shortparallel:"\u2225",ShortRightArrow:"\u2192",ShortUpArrow:"\u2191",shy:"\xAD",Sigma:"\u03A3",sigma:"\u03C3",sigmaf:"\u03C2",sigmav:"\u03C2",sim:"\u223C",simdot:"\u2A6A",sime:"\u2243",simeq:"\u2243",simg:"\u2A9E",simgE:"\u2AA0",siml:"\u2A9D",simlE:"\u2A9F",simne:"\u2246",simplus:"\u2A24",simrarr:"\u2972",slarr:"\u2190",SmallCircle:"\u2218",smallsetminus:"\u2216",smashp:"\u2A33",smeparsl:"\u29E4",smid:"\u2223",smile:"\u2323",smt:"\u2AAA",smte:"\u2AAC",smtes:"\u2AAC\uFE00",SOFTcy:"\u042C",softcy:"\u044C",sol:"/",solb:"\u29C4",solbar:"\u233F",Sopf:"\u{1D54A}",sopf:"\u{1D564}",spades:"\u2660",spadesuit:"\u2660",spar:"\u2225",sqcap:"\u2293",sqcaps:"\u2293\uFE00",sqcup:"\u2294",sqcups:"\u2294\uFE00",Sqrt:"\u221A",sqsub:"\u228F",sqsube:"\u2291",sqsubset:"\u228F",sqsubseteq:"\u2291",sqsup:"\u2290",sqsupe:"\u2292",sqsupset:"\u2290",sqsupseteq:"\u2292",squ:"\u25A1",Square:"\u25A1",square:"\u25A1",SquareIntersection:"\u2293",SquareSubset:"\u228F",SquareSubsetEqual:"\u2291",SquareSuperset:"\u2290",SquareSupersetEqual:"\u2292",SquareUnion:"\u2294",squarf:"\u25AA",squf:"\u25AA",srarr:"\u2192",Sscr:"\u{1D4AE}",sscr:"\u{1D4C8}",ssetmn:"\u2216",ssmile:"\u2323",sstarf:"\u22C6",Star:"\u22C6",star:"\u2606",starf:"\u2605",straightepsilon:"\u03F5",straightphi:"\u03D5",strns:"\xAF",Sub:"\u22D0",sub:"\u2282",subdot:"\u2ABD",subE:"\u2AC5",sube:"\u2286",subedot:"\u2AC3",submult:"\u2AC1",subnE:"\u2ACB",subne:"\u228A",subplus:"\u2ABF",subrarr:"\u2979",Subset:"\u22D0",subset:"\u2282",subseteq:"\u2286",subseteqq:"\u2AC5",SubsetEqual:"\u2286",subsetneq:"\u228A",subsetneqq:"\u2ACB",subsim:"\u2AC7",subsub:"\u2AD5",subsup:"\u2AD3",succ:"\u227B",succapprox:"\u2AB8",succcurlyeq:"\u227D",Succeeds:"\u227B",SucceedsEqual:"\u2AB0",SucceedsSlantEqual:"\u227D",SucceedsTilde:"\u227F",succeq:"\u2AB0",succnapprox:"\u2ABA",succneqq:"\u2AB6",succnsim:"\u22E9",succsim:"\u227F",SuchThat:"\u220B",Sum:"\u2211",sum:"\u2211",sung:"\u266A",Sup:"\u22D1",sup:"\u2283",sup1:"\xB9",sup2:"\xB2",sup3:"\xB3",supdot:"\u2ABE",supdsub:"\u2AD8",supE:"\u2AC6",supe:"\u2287",supedot:"\u2AC4",Superset:"\u2283",SupersetEqual:"\u2287",suphsol:"\u27C9",suphsub:"\u2AD7",suplarr:"\u297B",supmult:"\u2AC2",supnE:"\u2ACC",supne:"\u228B",supplus:"\u2AC0",Supset:"\u22D1",supset:"\u2283",supseteq:"\u2287",supseteqq:"\u2AC6",supsetneq:"\u228B",supsetneqq:"\u2ACC",supsim:"\u2AC8",supsub:"\u2AD4",supsup:"\u2AD6",swarhk:"\u2926",swArr:"\u21D9",swarr:"\u2199",swarrow:"\u2199",swnwar:"\u292A",szlig:"\xDF",Tab:"	",target:"\u2316",Tau:"\u03A4",tau:"\u03C4",tbrk:"\u23B4",Tcaron:"\u0164",tcaron:"\u0165",Tcedil:"\u0162",tcedil:"\u0163",Tcy:"\u0422",tcy:"\u0442",tdot:"\u20DB",telrec:"\u2315",Tfr:"\u{1D517}",tfr:"\u{1D531}",there4:"\u2234",Therefore:"\u2234",therefore:"\u2234",Theta:"\u0398",theta:"\u03B8",thetasym:"\u03D1",thetav:"\u03D1",thickapprox:"\u2248",thicksim:"\u223C",ThickSpace:"\u205F\u200A",thinsp:"\u2009",ThinSpace:"\u2009",thkap:"\u2248",thksim:"\u223C",THORN:"\xDE",thorn:"\xFE",Tilde:"\u223C",tilde:"\u02DC",TildeEqual:"\u2243",TildeFullEqual:"\u2245",TildeTilde:"\u2248",times:"\xD7",timesb:"\u22A0",timesbar:"\u2A31",timesd:"\u2A30",tint:"\u222D",toea:"\u2928",top:"\u22A4",topbot:"\u2336",topcir:"\u2AF1",Topf:"\u{1D54B}",topf:"\u{1D565}",topfork:"\u2ADA",tosa:"\u2929",tprime:"\u2034",TRADE:"\u2122",trade:"\u2122",triangle:"\u25B5",triangledown:"\u25BF",triangleleft:"\u25C3",trianglelefteq:"\u22B4",triangleq:"\u225C",triangleright:"\u25B9",trianglerighteq:"\u22B5",tridot:"\u25EC",trie:"\u225C",triminus:"\u2A3A",TripleDot:"\u20DB",triplus:"\u2A39",trisb:"\u29CD",tritime:"\u2A3B",trpezium:"\u23E2",Tscr:"\u{1D4AF}",tscr:"\u{1D4C9}",TScy:"\u0426",tscy:"\u0446",TSHcy:"\u040B",tshcy:"\u045B",Tstrok:"\u0166",tstrok:"\u0167",twixt:"\u226C",twoheadleftarrow:"\u219E",twoheadrightarrow:"\u21A0",Uacute:"\xDA",uacute:"\xFA",Uarr:"\u219F",uArr:"\u21D1",uarr:"\u2191",Uarrocir:"\u2949",Ubrcy:"\u040E",ubrcy:"\u045E",Ubreve:"\u016C",ubreve:"\u016D",Ucirc:"\xDB",ucirc:"\xFB",Ucy:"\u0423",ucy:"\u0443",udarr:"\u21C5",Udblac:"\u0170",udblac:"\u0171",udhar:"\u296E",ufisht:"\u297E",Ufr:"\u{1D518}",ufr:"\u{1D532}",Ugrave:"\xD9",ugrave:"\xF9",uHar:"\u2963",uharl:"\u21BF",uharr:"\u21BE",uhblk:"\u2580",ulcorn:"\u231C",ulcorner:"\u231C",ulcrop:"\u230F",ultri:"\u25F8",Umacr:"\u016A",umacr:"\u016B",uml:"\xA8",UnderBar:"_",UnderBrace:"\u23DF",UnderBracket:"\u23B5",UnderParenthesis:"\u23DD",Union:"\u22C3",UnionPlus:"\u228E",Uogon:"\u0172",uogon:"\u0173",Uopf:"\u{1D54C}",uopf:"\u{1D566}",UpArrow:"\u2191",Uparrow:"\u21D1",uparrow:"\u2191",UpArrowBar:"\u2912",UpArrowDownArrow:"\u21C5",UpDownArrow:"\u2195",Updownarrow:"\u21D5",updownarrow:"\u2195",UpEquilibrium:"\u296E",upharpoonleft:"\u21BF",upharpoonright:"\u21BE",uplus:"\u228E",UpperLeftArrow:"\u2196",UpperRightArrow:"\u2197",Upsi:"\u03D2",upsi:"\u03C5",upsih:"\u03D2",Upsilon:"\u03A5",upsilon:"\u03C5",UpTee:"\u22A5",UpTeeArrow:"\u21A5",upuparrows:"\u21C8",urcorn:"\u231D",urcorner:"\u231D",urcrop:"\u230E",Uring:"\u016E",uring:"\u016F",urtri:"\u25F9",Uscr:"\u{1D4B0}",uscr:"\u{1D4CA}",utdot:"\u22F0",Utilde:"\u0168",utilde:"\u0169",utri:"\u25B5",utrif:"\u25B4",uuarr:"\u21C8",Uuml:"\xDC",uuml:"\xFC",uwangle:"\u29A7",vangrt:"\u299C",varepsilon:"\u03F5",varkappa:"\u03F0",varnothing:"\u2205",varphi:"\u03D5",varpi:"\u03D6",varpropto:"\u221D",vArr:"\u21D5",varr:"\u2195",varrho:"\u03F1",varsigma:"\u03C2",varsubsetneq:"\u228A\uFE00",varsubsetneqq:"\u2ACB\uFE00",varsupsetneq:"\u228B\uFE00",varsupsetneqq:"\u2ACC\uFE00",vartheta:"\u03D1",vartriangleleft:"\u22B2",vartriangleright:"\u22B3",Vbar:"\u2AEB",vBar:"\u2AE8",vBarv:"\u2AE9",Vcy:"\u0412",vcy:"\u0432",VDash:"\u22AB",Vdash:"\u22A9",vDash:"\u22A8",vdash:"\u22A2",Vdashl:"\u2AE6",Vee:"\u22C1",vee:"\u2228",veebar:"\u22BB",veeeq:"\u225A",vellip:"\u22EE",Verbar:"\u2016",verbar:"|",Vert:"\u2016",vert:"|",VerticalBar:"\u2223",VerticalLine:"|",VerticalSeparator:"\u2758",VerticalTilde:"\u2240",VeryThinSpace:"\u200A",Vfr:"\u{1D519}",vfr:"\u{1D533}",vltri:"\u22B2",vnsub:"\u2282\u20D2",vnsup:"\u2283\u20D2",Vopf:"\u{1D54D}",vopf:"\u{1D567}",vprop:"\u221D",vrtri:"\u22B3",Vscr:"\u{1D4B1}",vscr:"\u{1D4CB}",vsubnE:"\u2ACB\uFE00",vsubne:"\u228A\uFE00",vsupnE:"\u2ACC\uFE00",vsupne:"\u228B\uFE00",Vvdash:"\u22AA",vzigzag:"\u299A",Wcirc:"\u0174",wcirc:"\u0175",wedbar:"\u2A5F",Wedge:"\u22C0",wedge:"\u2227",wedgeq:"\u2259",weierp:"\u2118",Wfr:"\u{1D51A}",wfr:"\u{1D534}",Wopf:"\u{1D54E}",wopf:"\u{1D568}",wp:"\u2118",wr:"\u2240",wreath:"\u2240",Wscr:"\u{1D4B2}",wscr:"\u{1D4CC}",xcap:"\u22C2",xcirc:"\u25EF",xcup:"\u22C3",xdtri:"\u25BD",Xfr:"\u{1D51B}",xfr:"\u{1D535}",xhArr:"\u27FA",xharr:"\u27F7",Xi:"\u039E",xi:"\u03BE",xlArr:"\u27F8",xlarr:"\u27F5",xmap:"\u27FC",xnis:"\u22FB",xodot:"\u2A00",Xopf:"\u{1D54F}",xopf:"\u{1D569}",xoplus:"\u2A01",xotime:"\u2A02",xrArr:"\u27F9",xrarr:"\u27F6",Xscr:"\u{1D4B3}",xscr:"\u{1D4CD}",xsqcup:"\u2A06",xuplus:"\u2A04",xutri:"\u25B3",xvee:"\u22C1",xwedge:"\u22C0",Yacute:"\xDD",yacute:"\xFD",YAcy:"\u042F",yacy:"\u044F",Ycirc:"\u0176",ycirc:"\u0177",Ycy:"\u042B",ycy:"\u044B",yen:"\xA5",Yfr:"\u{1D51C}",yfr:"\u{1D536}",YIcy:"\u0407",yicy:"\u0457",Yopf:"\u{1D550}",yopf:"\u{1D56A}",Yscr:"\u{1D4B4}",yscr:"\u{1D4CE}",YUcy:"\u042E",yucy:"\u044E",Yuml:"\u0178",yuml:"\xFF",Zacute:"\u0179",zacute:"\u017A",Zcaron:"\u017D",zcaron:"\u017E",Zcy:"\u0417",zcy:"\u0437",Zdot:"\u017B",zdot:"\u017C",zeetrf:"\u2128",ZeroWidthSpace:"\u200B",Zeta:"\u0396",zeta:"\u03B6",Zfr:"\u2128",zfr:"\u{1D537}",ZHcy:"\u0416",zhcy:"\u0436",zigrarr:"\u21DD",Zopf:"\u2124",zopf:"\u{1D56B}",Zscr:"\u{1D4B5}",zscr:"\u{1D4CF}",zwj:"\u200D",zwnj:"\u200C"}),le.entityMap=le.HTML_ENTITIES},28978:function(ke,le,G){var ne,A=G(84722);ne=A.DOMImplementation,ne=A.XMLSerializer,le.DOMParser=G(15752).DOMParser},64466:function(ke,le,G){var ne=G(44582).NAMESPACE,A=/[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,N=new RegExp("[\\-\\.0-9"+A.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),I=new RegExp("^"+A.source+N.source+"*(?::"+A.source+N.source+"*)?$"),K=0,Z=1,he=2,ye=3,ge=4,J=5,Ie=6,Pe=7;function Me(C,S){this.message=C,this.locator=S,Error.captureStackTrace&&Error.captureStackTrace(this,Me)}Me.prototype=new Error,Me.prototype.name=Me.name;function $(){}$.prototype={parse:function(C,S,R){var ie=this.domBuilder;ie.startDocument(),Ce(S,S={}),Ue(C,S,R,ie,this.errorHandler),ie.endDocument()}};function Ue(C,S,R,ie,ue){function ce(tt){if(tt>65535){tt-=65536;var Lt=55296+(tt>>10),ei=56320+(tt&1023);return String.fromCharCode(Lt,ei)}else return String.fromCharCode(tt)}function oe(tt){var Lt=tt.slice(1,-1);return Object.hasOwnProperty.call(R,Lt)?R[Lt]:Lt.charAt(0)==="#"?ce(parseInt(Lt.substr(1).replace("x","0x"))):(ue.error("entity not found:"+tt),tt)}function pe(tt){if(tt>xe){var Lt=C.substring(xe,tt).replace(/&#?\w+;/g,oe);Ee&&W(xe),ie.characters(Lt,0,tt-xe),xe=tt}}function W(tt,Lt){for(;tt>=te&&(Lt=se.exec(C));)ee=Lt.index,te=ee+Lt[0].length,Ee.lineNumber++;Ee.columnNumber=tt-ee+1}for(var ee=0,te=0,se=/.*(?:\r\n?|\n)|.*$/g,Ee=ie.locator,Fe=[{currentNSMap:S}],qe={},xe=0;;){try{var je=C.indexOf("<",xe);if(je<0){if(!C.substr(xe).match(/^\s*$/)){var _t=ie.doc,Dt=_t.createTextNode(C.substr(xe));_t.appendChild(Dt),ie.currentElement=Dt}return}switch(je>xe&&pe(je),C.charAt(je+1)){case"/":var fe=C.indexOf(">",je+3),mt=C.substring(je+2,fe).replace(/[ \t\n\r]+$/g,""),Tt=Fe.pop();fe<0?(mt=C.substring(je+2).replace(/[\s<].*/,""),ue.error("end tag name: "+mt+" is not complete:"+Tt.tagName),fe=je+1+mt.length):mt.match(/\s</)&&(mt=mt.replace(/[\s<].*/,""),ue.error("end tag name: "+mt+" maybe not complete"),fe=je+1+mt.length);var $t=Tt.localNSMap,_i=Tt.tagName==mt,Dn=_i||Tt.tagName&&Tt.tagName.toLowerCase()==mt.toLowerCase();if(Dn){if(ie.endElement(Tt.uri,Tt.localName,mt),$t)for(var $e in $t)Object.prototype.hasOwnProperty.call($t,$e)&&ie.endPrefixMapping($e);_i||ue.fatalError("end tag name: "+mt+" is not match the current start tagName:"+Tt.tagName)}else Fe.push(Tt);fe++;break;case"?":Ee&&W(je),fe=_e(C,je,ie);break;case"!":Ee&&W(je),fe=me(C,je,ie,ue);break;default:Ee&&W(je);var Et=new ze,ci=Fe[Fe.length-1].currentNSMap,fe=Xe(C,je,Et,ci,oe,ue),ds=Et.length;if(!Et.closed&&Te(C,fe,Et.tagName,qe)&&(Et.closed=!0,R.nbsp||ue.warning("unclosed xml attribute")),Ee&&ds){for(var hs=Se(Ee,{}),st=0;st<ds;st++){var Ii=Et[st];W(Ii.offset),Ii.locator=Se(Ee,{})}ie.locator=hs,re(Et,ie,ci)&&Fe.push(Et),ie.locator=Ee}else re(Et,ie,ci)&&Fe.push(Et);ne.isHTML(Et.uri)&&!Et.closed?fe=Oe(C,fe,Et.tagName,oe,ie):fe++}}catch(tt){if(tt instanceof Me)throw tt;ue.error("element parse error: "+tt),fe=-1}fe>xe?xe=fe:pe(Math.max(je,xe)+1)}}function Se(C,S){return S.lineNumber=C.lineNumber,S.columnNumber=C.columnNumber,S}function Xe(C,S,R,ie,ue,ce){function oe(Fe,qe,xe){R.attributeNames.hasOwnProperty(Fe)&&ce.fatalError("Attribute "+Fe+" redefined"),R.addValue(Fe,qe.replace(/[\t\n\r]/g," ").replace(/&#?\w+;/g,ue),xe)}for(var pe,W,ee=++S,te=K;;){var se=C.charAt(ee);switch(se){case"=":if(te===Z)pe=C.slice(S,ee),te=ye;else if(te===he)te=ye;else throw new Error("attribute equal must after attrName");break;case"'":case'"':if(te===ye||te===Z)if(te===Z&&(ce.warning('attribute value must after "="'),pe=C.slice(S,ee)),S=ee+1,ee=C.indexOf(se,S),ee>0)W=C.slice(S,ee),oe(pe,W,S-1),te=J;else throw new Error("attribute value no end '"+se+"' match");else if(te==ge)W=C.slice(S,ee),oe(pe,W,S),ce.warning('attribute "'+pe+'" missed start quot('+se+")!!"),S=ee+1,te=J;else throw new Error('attribute value must after "="');break;case"/":switch(te){case K:R.setTagName(C.slice(S,ee));case J:case Ie:case Pe:te=Pe,R.closed=!0;case ge:case Z:break;case he:R.closed=!0;break;default:throw new Error("attribute invalid close char('/')")}break;case"":return ce.error("unexpected end of input"),te==K&&R.setTagName(C.slice(S,ee)),ee;case">":switch(te){case K:R.setTagName(C.slice(S,ee));case J:case Ie:case Pe:break;case ge:case Z:W=C.slice(S,ee),W.slice(-1)==="/"&&(R.closed=!0,W=W.slice(0,-1));case he:te===he&&(W=pe),te==ge?(ce.warning('attribute "'+W+'" missed quot(")!'),oe(pe,W,S)):((!ne.isHTML(ie[""])||!W.match(/^(?:disabled|checked|selected)$/i))&&ce.warning('attribute "'+W+'" missed value!! "'+W+'" instead!!'),oe(W,W,S));break;case ye:throw new Error("attribute value missed!!")}return ee;case"\x80":se=" ";default:if(se<=" ")switch(te){case K:R.setTagName(C.slice(S,ee)),te=Ie;break;case Z:pe=C.slice(S,ee),te=he;break;case ge:var W=C.slice(S,ee);ce.warning('attribute "'+W+'" missed quot(")!!'),oe(pe,W,S);case J:te=Ie;break}else switch(te){case he:var Ee=R.tagName;(!ne.isHTML(ie[""])||!pe.match(/^(?:disabled|checked|selected)$/i))&&ce.warning('attribute "'+pe+'" missed value!! "'+pe+'" instead2!!'),oe(pe,pe,S),S=ee,te=Z;break;case J:ce.warning('attribute space is required"'+pe+'"!!');case Ie:te=Z,S=ee;break;case ye:te=ge,S=ee;break;case Pe:throw new Error("elements closed character '/' and '>' must be connected to")}}ee++}}function re(C,S,R){for(var ie=C.tagName,ue=null,se=C.length;se--;){var ce=C[se],oe=ce.qName,pe=ce.value,Ee=oe.indexOf(":");if(Ee>0)var W=ce.prefix=oe.slice(0,Ee),ee=oe.slice(Ee+1),te=W==="xmlns"&&ee;else ee=oe,W=null,te=oe==="xmlns"&&"";ce.localName=ee,te!==!1&&(ue==null&&(ue={},Ce(R,R={})),R[te]=ue[te]=pe,ce.uri=ne.XMLNS,S.startPrefixMapping(te,pe))}for(var se=C.length;se--;){ce=C[se];var W=ce.prefix;W&&(W==="xml"&&(ce.uri=ne.XML),W!=="xmlns"&&(ce.uri=R[W||""]))}var Ee=ie.indexOf(":");Ee>0?(W=C.prefix=ie.slice(0,Ee),ee=C.localName=ie.slice(Ee+1)):(W=null,ee=C.localName=ie);var Fe=C.uri=R[W||""];if(S.startElement(Fe,ee,ie,C),C.closed){if(S.endElement(Fe,ee,ie),ue)for(W in ue)Object.prototype.hasOwnProperty.call(ue,W)&&S.endPrefixMapping(W)}else return C.currentNSMap=R,C.localNSMap=ue,!0}function Oe(C,S,R,ie,ue){if(/^(?:script|textarea)$/i.test(R)){var ce=C.indexOf("</"+R+">",S),oe=C.substring(S+1,ce);if(/[&<]/.test(oe))return/^script$/i.test(R)?(ue.characters(oe,0,oe.length),ce):(oe=oe.replace(/&#?\w+;/g,ie),ue.characters(oe,0,oe.length),ce)}return S+1}function Te(C,S,R,ie){var ue=ie[R];return ue==null&&(ue=C.lastIndexOf("</"+R+">"),ue<S&&(ue=C.lastIndexOf("</"+R)),ie[R]=ue),ue<S}function Ce(C,S){for(var R in C)Object.prototype.hasOwnProperty.call(C,R)&&(S[R]=C[R])}function me(C,S,R,ie){var ue=C.charAt(S+2);switch(ue){case"-":if(C.charAt(S+3)==="-"){var ce=C.indexOf("-->",S+4);return ce>S?(R.comment(C,S+4,ce-S-4),ce+3):(ie.error("Unclosed comment"),-1)}else return-1;default:if(C.substr(S+3,6)=="CDATA["){var ce=C.indexOf("]]>",S+9);return R.startCDATA(),R.characters(C,S+9,ce-S-9),R.endCDATA(),ce+3}var oe=De(C,S),pe=oe.length;if(pe>1&&/!doctype/i.test(oe[0][0])){var W=oe[1][0],ee=!1,te=!1;pe>3&&(/^public$/i.test(oe[2][0])?(ee=oe[3][0],te=pe>4&&oe[4][0]):/^system$/i.test(oe[2][0])&&(te=oe[3][0]));var se=oe[pe-1];return R.startDTD(W,ee,te),R.endDTD(),se.index+se[0].length}}return-1}function _e(C,S,R){var ie=C.indexOf("?>",S);if(ie){var ue=C.substring(S,ie).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);if(ue){var ce=ue[0].length;return R.processingInstruction(ue[1],ue[2]),ie+2}else return-1}return-1}function ze(){this.attributeNames={}}ze.prototype={setTagName:function(C){if(!I.test(C))throw new Error("invalid tagName:"+C);this.tagName=C},addValue:function(C,S,R){if(!I.test(C))throw new Error("invalid attribute:"+C);this.attributeNames[C]=this.length,this[this.length++]={qName:C,value:S,offset:R}},length:0,getLocalName:function(C){return this[C].localName},getLocator:function(C){return this[C].locator},getQName:function(C){return this[C].qName},getURI:function(C){return this[C].uri},getValue:function(C){return this[C].value}};function De(C,S){var R,ie=[],ue=/'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;for(ue.lastIndex=S,ue.exec(C);R=ue.exec(C);)if(ie.push(R),R[1])return ie}le.XMLReader=$,le.ParseError=Me},5175:function(ke,le,G){"use strict";var ne=G(71354),A=G.n(ne),N=G(76314),I=G.n(N),K=G(4417),Z=G.n(K),he=new URL(G(17422),G.b),ye=I()(A()),ge=Z()(he);ye.push([ke.id,`.vjs-svg-icon {
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  fill: currentColor;
  height: 1.8em;
  width: 1.8em;
}
.vjs-svg-icon:before {
  content: none !important;
}

.vjs-svg-icon:hover,
.vjs-control:focus .vjs-svg-icon {
  filter: drop-shadow(0 0 0.25em #fff);
}

.vjs-modal-dialog .vjs-modal-dialog-content, .video-js .vjs-modal-dialog, .vjs-button > .vjs-icon-placeholder:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.vjs-button > .vjs-icon-placeholder:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  text-align: center;
}

@font-face {
  font-family: VideoJS;
  src: url(`+ge+`) format("woff");
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-play, .video-js .vjs-play-control .vjs-icon-placeholder, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-play:before, .video-js .vjs-play-control .vjs-icon-placeholder:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  content: "\\f101";
}

.vjs-icon-play-circle {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-play-circle:before {
  content: "\\f102";
}

.vjs-icon-pause, .video-js .vjs-play-control.vjs-playing .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-pause:before, .video-js .vjs-play-control.vjs-playing .vjs-icon-placeholder:before {
  content: "\\f103";
}

.vjs-icon-volume-mute, .video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-volume-mute:before, .video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder:before {
  content: "\\f104";
}

.vjs-icon-volume-low, .video-js .vjs-mute-control.vjs-vol-1 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-volume-low:before, .video-js .vjs-mute-control.vjs-vol-1 .vjs-icon-placeholder:before {
  content: "\\f105";
}

.vjs-icon-volume-mid, .video-js .vjs-mute-control.vjs-vol-2 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-volume-mid:before, .video-js .vjs-mute-control.vjs-vol-2 .vjs-icon-placeholder:before {
  content: "\\f106";
}

.vjs-icon-volume-high, .video-js .vjs-mute-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-volume-high:before, .video-js .vjs-mute-control .vjs-icon-placeholder:before {
  content: "\\f107";
}

.vjs-icon-fullscreen-enter, .video-js .vjs-fullscreen-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-fullscreen-enter:before, .video-js .vjs-fullscreen-control .vjs-icon-placeholder:before {
  content: "\\f108";
}

.vjs-icon-fullscreen-exit, .video-js.vjs-fullscreen .vjs-fullscreen-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-fullscreen-exit:before, .video-js.vjs-fullscreen .vjs-fullscreen-control .vjs-icon-placeholder:before {
  content: "\\f109";
}

.vjs-icon-spinner {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-spinner:before {
  content: "\\f10a";
}

.vjs-icon-subtitles, .video-js .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js.video-js:lang(en-GB) .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js.video-js:lang(en-IE) .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js.video-js:lang(en-AU) .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js.video-js:lang(en-NZ) .vjs-subs-caps-button .vjs-icon-placeholder, .video-js .vjs-subtitles-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-subtitles:before, .video-js .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js.video-js:lang(en-GB) .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js.video-js:lang(en-IE) .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js.video-js:lang(en-AU) .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js.video-js:lang(en-NZ) .vjs-subs-caps-button .vjs-icon-placeholder:before, .video-js .vjs-subtitles-button .vjs-icon-placeholder:before {
  content: "\\f10b";
}

.vjs-icon-captions, .video-js:lang(en) .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js:lang(fr-CA) .vjs-subs-caps-button .vjs-icon-placeholder, .video-js .vjs-captions-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-captions:before, .video-js:lang(en) .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js:lang(fr-CA) .vjs-subs-caps-button .vjs-icon-placeholder:before, .video-js .vjs-captions-button .vjs-icon-placeholder:before {
  content: "\\f10c";
}

.vjs-icon-hd {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-hd:before {
  content: "\\f10d";
}

.vjs-icon-chapters, .video-js .vjs-chapters-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-chapters:before, .video-js .vjs-chapters-button .vjs-icon-placeholder:before {
  content: "\\f10e";
}

.vjs-icon-downloading {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-downloading:before {
  content: "\\f10f";
}

.vjs-icon-file-download {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-file-download:before {
  content: "\\f110";
}

.vjs-icon-file-download-done {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-file-download-done:before {
  content: "\\f111";
}

.vjs-icon-file-download-off {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-file-download-off:before {
  content: "\\f112";
}

.vjs-icon-share {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-share:before {
  content: "\\f113";
}

.vjs-icon-cog {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-cog:before {
  content: "\\f114";
}

.vjs-icon-square {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-square:before {
  content: "\\f115";
}

.vjs-icon-circle, .vjs-seek-to-live-control .vjs-icon-placeholder, .video-js .vjs-volume-level, .video-js .vjs-play-progress {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-circle:before, .vjs-seek-to-live-control .vjs-icon-placeholder:before, .video-js .vjs-volume-level:before, .video-js .vjs-play-progress:before {
  content: "\\f116";
}

.vjs-icon-circle-outline {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-circle-outline:before {
  content: "\\f117";
}

.vjs-icon-circle-inner-circle {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-circle-inner-circle:before {
  content: "\\f118";
}

.vjs-icon-cancel, .video-js .vjs-control.vjs-close-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-cancel:before, .video-js .vjs-control.vjs-close-button .vjs-icon-placeholder:before {
  content: "\\f119";
}

.vjs-icon-repeat {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-repeat:before {
  content: "\\f11a";
}

.vjs-icon-replay, .video-js .vjs-play-control.vjs-ended .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-replay:before, .video-js .vjs-play-control.vjs-ended .vjs-icon-placeholder:before {
  content: "\\f11b";
}

.vjs-icon-replay-5, .video-js .vjs-skip-backward-5 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-replay-5:before, .video-js .vjs-skip-backward-5 .vjs-icon-placeholder:before {
  content: "\\f11c";
}

.vjs-icon-replay-10, .video-js .vjs-skip-backward-10 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-replay-10:before, .video-js .vjs-skip-backward-10 .vjs-icon-placeholder:before {
  content: "\\f11d";
}

.vjs-icon-replay-30, .video-js .vjs-skip-backward-30 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-replay-30:before, .video-js .vjs-skip-backward-30 .vjs-icon-placeholder:before {
  content: "\\f11e";
}

.vjs-icon-forward-5, .video-js .vjs-skip-forward-5 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-forward-5:before, .video-js .vjs-skip-forward-5 .vjs-icon-placeholder:before {
  content: "\\f11f";
}

.vjs-icon-forward-10, .video-js .vjs-skip-forward-10 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-forward-10:before, .video-js .vjs-skip-forward-10 .vjs-icon-placeholder:before {
  content: "\\f120";
}

.vjs-icon-forward-30, .video-js .vjs-skip-forward-30 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-forward-30:before, .video-js .vjs-skip-forward-30 .vjs-icon-placeholder:before {
  content: "\\f121";
}

.vjs-icon-audio, .video-js .vjs-audio-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-audio:before, .video-js .vjs-audio-button .vjs-icon-placeholder:before {
  content: "\\f122";
}

.vjs-icon-next-item {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-next-item:before {
  content: "\\f123";
}

.vjs-icon-previous-item {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-previous-item:before {
  content: "\\f124";
}

.vjs-icon-shuffle {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-shuffle:before {
  content: "\\f125";
}

.vjs-icon-cast {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-cast:before {
  content: "\\f126";
}

.vjs-icon-picture-in-picture-enter, .video-js .vjs-picture-in-picture-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-picture-in-picture-enter:before, .video-js .vjs-picture-in-picture-control .vjs-icon-placeholder:before {
  content: "\\f127";
}

.vjs-icon-picture-in-picture-exit, .video-js.vjs-picture-in-picture .vjs-picture-in-picture-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-picture-in-picture-exit:before, .video-js.vjs-picture-in-picture .vjs-picture-in-picture-control .vjs-icon-placeholder:before {
  content: "\\f128";
}

.vjs-icon-facebook {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-facebook:before {
  content: "\\f129";
}

.vjs-icon-linkedin {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-linkedin:before {
  content: "\\f12a";
}

.vjs-icon-twitter {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-twitter:before {
  content: "\\f12b";
}

.vjs-icon-tumblr {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-tumblr:before {
  content: "\\f12c";
}

.vjs-icon-pinterest {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-pinterest:before {
  content: "\\f12d";
}

.vjs-icon-audio-description, .video-js .vjs-descriptions-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-audio-description:before, .video-js .vjs-descriptions-button .vjs-icon-placeholder:before {
  content: "\\f12e";
}

.video-js {
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  color: #fff;
  background-color: #000;
  position: relative;
  padding: 0;
  font-size: 10px;
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  font-family: Arial, Helvetica, sans-serif;
  word-break: initial;
}
.video-js:-moz-full-screen {
  position: absolute;
}
.video-js:-webkit-full-screen {
  width: 100% !important;
  height: 100% !important;
}

.video-js[tabindex="-1"] {
  outline: none;
}

.video-js *,
.video-js *:before,
.video-js *:after {
  box-sizing: inherit;
}

.video-js ul {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  list-style-position: outside;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.video-js.vjs-fluid,
.video-js.vjs-16-9,
.video-js.vjs-4-3,
.video-js.vjs-9-16,
.video-js.vjs-1-1 {
  width: 100%;
  max-width: 100%;
}

.video-js.vjs-fluid:not(.vjs-audio-only-mode),
.video-js.vjs-16-9:not(.vjs-audio-only-mode),
.video-js.vjs-4-3:not(.vjs-audio-only-mode),
.video-js.vjs-9-16:not(.vjs-audio-only-mode),
.video-js.vjs-1-1:not(.vjs-audio-only-mode) {
  height: 0;
}

.video-js.vjs-16-9:not(.vjs-audio-only-mode) {
  padding-top: 56.25%;
}

.video-js.vjs-4-3:not(.vjs-audio-only-mode) {
  padding-top: 75%;
}

.video-js.vjs-9-16:not(.vjs-audio-only-mode) {
  padding-top: 177.7777777778%;
}

.video-js.vjs-1-1:not(.vjs-audio-only-mode) {
  padding-top: 100%;
}

.video-js.vjs-fill:not(.vjs-audio-only-mode) {
  width: 100%;
  height: 100%;
}

.video-js .vjs-tech {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-js.vjs-audio-only-mode .vjs-tech {
  display: none;
}

body.vjs-full-window,
body.vjs-pip-window {
  padding: 0;
  margin: 0;
  height: 100%;
}

.vjs-full-window .video-js.vjs-fullscreen,
body.vjs-pip-window .video-js {
  position: fixed;
  overflow: hidden;
  z-index: 1000;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}

.video-js.vjs-fullscreen:not(.vjs-ios-native-fs),
body.vjs-pip-window .video-js {
  width: 100% !important;
  height: 100% !important;
  padding-top: 0 !important;
  display: block;
}

.video-js.vjs-fullscreen.vjs-user-inactive {
  cursor: none;
}

.vjs-pip-container .vjs-pip-text {
  position: absolute;
  bottom: 10%;
  font-size: 2em;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.5em;
  text-align: center;
  width: 100%;
}

.vjs-layout-tiny.vjs-pip-container .vjs-pip-text,
.vjs-layout-x-small.vjs-pip-container .vjs-pip-text,
.vjs-layout-small.vjs-pip-container .vjs-pip-text {
  bottom: 0;
  font-size: 1.4em;
}

.vjs-hidden {
  display: none !important;
}

.vjs-disabled {
  opacity: 0.5;
  cursor: default;
}

.video-js .vjs-offscreen {
  height: 1px;
  left: -9999px;
  position: absolute;
  top: 0;
  width: 1px;
}

.vjs-lock-showing {
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.vjs-no-js {
  padding: 20px;
  color: #fff;
  background-color: #000;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  width: 300px;
  height: 150px;
  margin: 0px auto;
}

.vjs-no-js a,
.vjs-no-js a:visited {
  color: #66A8CC;
}

.video-js .vjs-big-play-button {
  font-size: 3em;
  line-height: 1.5em;
  height: 1.63332em;
  width: 3em;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 0;
  margin-top: -0.81666em;
  margin-left: -1.5em;
  cursor: pointer;
  opacity: 1;
  border: 0.06666em solid #fff;
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.7);
  border-radius: 0.3em;
  transition: all 0.4s;
}
.vjs-big-play-button .vjs-svg-icon {
  width: 1em;
  height: 1em;
  position: absolute;
  top: 50%;
  left: 50%;
  line-height: 1;
  transform: translate(-50%, -50%);
}

.video-js:hover .vjs-big-play-button,
.video-js .vjs-big-play-button:focus {
  border-color: #fff;
  background-color: #73859f;
  background-color: rgba(115, 133, 159, 0.5);
  transition: all 0s;
}

.vjs-controls-disabled .vjs-big-play-button,
.vjs-has-started .vjs-big-play-button,
.vjs-using-native-controls .vjs-big-play-button,
.vjs-error .vjs-big-play-button {
  display: none;
}

.vjs-has-started.vjs-paused.vjs-show-big-play-button-on-pause:not(.vjs-seeking, .vjs-scrubbing, .vjs-error) .vjs-big-play-button {
  display: block;
}

.video-js button {
  background: none;
  border: none;
  color: inherit;
  display: inline-block;
  font-size: inherit;
  line-height: inherit;
  text-transform: none;
  text-decoration: none;
  transition: none;
  -webkit-appearance: none;
       appearance: none;
}

.video-js.vjs-spatial-navigation-enabled .vjs-button:focus {
  outline: 0.0625em solid white;
  box-shadow: none;
}

.vjs-control .vjs-button {
  width: 100%;
  height: 100%;
}

.video-js .vjs-control.vjs-close-button {
  cursor: pointer;
  height: 3em;
  position: absolute;
  right: 0;
  top: 0.5em;
  z-index: 2;
}
.video-js .vjs-modal-dialog {
  background: rgba(0, 0, 0, 0.8);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0));
  overflow: auto;
}

.video-js .vjs-modal-dialog > * {
  box-sizing: border-box;
}

.vjs-modal-dialog .vjs-modal-dialog-content {
  font-size: 1.2em;
  line-height: 1.5;
  padding: 20px 24px;
  z-index: 1;
}

.vjs-menu-button {
  cursor: pointer;
}

.vjs-menu-button.vjs-disabled {
  cursor: default;
}

.vjs-workinghover .vjs-menu-button.vjs-disabled:hover .vjs-menu {
  display: none;
}

.vjs-menu .vjs-menu-content {
  display: block;
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  overflow: auto;
}

.vjs-menu .vjs-menu-content > * {
  box-sizing: border-box;
}

.vjs-scrubbing .vjs-control.vjs-menu-button:hover .vjs-menu {
  display: none;
}

.vjs-menu li {
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0.2em 0;
  line-height: 1.4em;
  font-size: 1.2em;
  text-align: center;
  text-transform: lowercase;
}

.vjs-menu li.vjs-menu-item:focus,
.vjs-menu li.vjs-menu-item:hover,
.js-focus-visible .vjs-menu li.vjs-menu-item:hover {
  background-color: #73859f;
  background-color: rgba(115, 133, 159, 0.5);
}

.vjs-menu li.vjs-selected,
.vjs-menu li.vjs-selected:focus,
.vjs-menu li.vjs-selected:hover,
.js-focus-visible .vjs-menu li.vjs-selected:hover {
  background-color: #fff;
  color: #2B333F;
}
.vjs-menu li.vjs-selected .vjs-svg-icon,
.vjs-menu li.vjs-selected:focus .vjs-svg-icon,
.vjs-menu li.vjs-selected:hover .vjs-svg-icon,
.js-focus-visible .vjs-menu li.vjs-selected:hover .vjs-svg-icon {
  fill: #000000;
}

.video-js .vjs-menu *:not(.vjs-selected):focus:not(:focus-visible),
.js-focus-visible .vjs-menu *:not(.vjs-selected):focus:not(.focus-visible) {
  background: none;
}

.vjs-menu li.vjs-menu-title {
  text-align: center;
  text-transform: uppercase;
  font-size: 1em;
  line-height: 2em;
  padding: 0;
  margin: 0 0 0.3em 0;
  font-weight: bold;
  cursor: default;
}

.vjs-menu-button-popup .vjs-menu {
  display: none;
  position: absolute;
  bottom: 0;
  width: 10em;
  left: -3em;
  height: 0em;
  margin-bottom: 1.5em;
  border-top-color: rgba(43, 51, 63, 0.7);
}

.vjs-pip-window .vjs-menu-button-popup .vjs-menu {
  left: unset;
  right: 1em;
}

.vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.7);
  position: absolute;
  width: 100%;
  bottom: 1.5em;
  max-height: 15em;
}

.vjs-layout-tiny .vjs-menu-button-popup .vjs-menu .vjs-menu-content,
.vjs-layout-x-small .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  max-height: 5em;
}

.vjs-layout-small .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  max-height: 10em;
}

.vjs-layout-medium .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  max-height: 14em;
}

.vjs-layout-large .vjs-menu-button-popup .vjs-menu .vjs-menu-content,
.vjs-layout-x-large .vjs-menu-button-popup .vjs-menu .vjs-menu-content,
.vjs-layout-huge .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  max-height: 25em;
}

.vjs-workinghover .vjs-menu-button-popup.vjs-hover .vjs-menu,
.vjs-menu-button-popup .vjs-menu.vjs-lock-showing {
  display: block;
}

.video-js .vjs-menu-button-inline {
  transition: all 0.4s;
  overflow: hidden;
}

.video-js .vjs-menu-button-inline:before {
  width: 2.222222222em;
}

.video-js .vjs-menu-button-inline:hover,
.video-js .vjs-menu-button-inline:focus,
.video-js .vjs-menu-button-inline.vjs-slider-active {
  width: 12em;
}

.vjs-menu-button-inline .vjs-menu {
  opacity: 0;
  height: 100%;
  width: auto;
  position: absolute;
  left: 4em;
  top: 0;
  padding: 0;
  margin: 0;
  transition: all 0.4s;
}

.vjs-menu-button-inline:hover .vjs-menu,
.vjs-menu-button-inline:focus .vjs-menu,
.vjs-menu-button-inline.vjs-slider-active .vjs-menu {
  display: block;
  opacity: 1;
}

.vjs-menu-button-inline .vjs-menu-content {
  width: auto;
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.video-js .vjs-control-bar {
  display: none;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3em;
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.7);
}

.video-js.vjs-spatial-navigation-enabled .vjs-control-bar {
  gap: 1px;
}

.video-js:not(.vjs-controls-disabled, .vjs-using-native-controls, .vjs-error) .vjs-control-bar.vjs-lock-showing {
  display: flex !important;
}

.vjs-has-started .vjs-control-bar,
.vjs-audio-only-mode .vjs-control-bar {
  display: flex;
  visibility: visible;
  opacity: 1;
  transition: visibility 0.1s, opacity 0.1s;
}

.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
  visibility: visible;
  opacity: 0;
  pointer-events: none;
  transition: visibility 1s, opacity 1s;
}

.vjs-controls-disabled .vjs-control-bar,
.vjs-using-native-controls .vjs-control-bar,
.vjs-error .vjs-control-bar {
  display: none !important;
}

.vjs-audio.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar,
.vjs-audio-only-mode.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.video-js .vjs-control {
  position: relative;
  text-align: center;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 4em;
  flex: none;
}

.video-js .vjs-control.vjs-visible-text {
  width: auto;
  padding-left: 1em;
  padding-right: 1em;
}

.vjs-button > .vjs-icon-placeholder:before {
  font-size: 1.8em;
  line-height: 1.67;
}

.vjs-button > .vjs-icon-placeholder {
  display: block;
}

.vjs-button > .vjs-svg-icon {
  display: inline-block;
}

.video-js .vjs-control:focus:before,
.video-js .vjs-control:hover:before,
.video-js .vjs-control:focus {
  text-shadow: 0em 0em 1em white;
}

.video-js *:not(.vjs-visible-text) > .vjs-control-text {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.video-js .vjs-custom-control-spacer {
  display: none;
}

.video-js .vjs-progress-control {
  cursor: pointer;
  flex: auto;
  display: flex;
  align-items: center;
  min-width: 4em;
  touch-action: none;
}

.video-js .vjs-progress-control.disabled {
  cursor: default;
}

.vjs-live .vjs-progress-control {
  display: none;
}

.vjs-liveui .vjs-progress-control {
  display: flex;
  align-items: center;
}

.video-js .vjs-progress-holder {
  flex: auto;
  transition: all 0.2s;
  height: 0.3em;
}

.video-js .vjs-progress-control .vjs-progress-holder {
  margin: 0 10px;
}

.video-js .vjs-progress-control:hover .vjs-progress-holder,
.video-js.vjs-scrubbing.vjs-touch-enabled .vjs-progress-control .vjs-progress-holder {
  font-size: 1.6666666667em;
}

.video-js .vjs-progress-control:hover .vjs-progress-holder.disabled {
  font-size: 1em;
}

.video-js .vjs-progress-holder .vjs-play-progress,
.video-js .vjs-progress-holder .vjs-load-progress,
.video-js .vjs-progress-holder .vjs-load-progress div {
  position: absolute;
  display: block;
  height: 100%;
  margin: 0;
  padding: 0;
  width: 0;
}

.video-js .vjs-play-progress {
  background-color: #fff;
}
.video-js .vjs-play-progress:before {
  font-size: 0.9em;
  position: absolute;
  right: -0.5em;
  line-height: 0.35em;
  z-index: 1;
}

.vjs-svg-icons-enabled .vjs-play-progress:before {
  content: none !important;
}

.vjs-play-progress .vjs-svg-icon {
  position: absolute;
  top: -0.35em;
  right: -0.4em;
  width: 0.9em;
  height: 0.9em;
  pointer-events: none;
  line-height: 0.15em;
  z-index: 1;
}

.video-js .vjs-load-progress {
  background: rgba(115, 133, 159, 0.5);
}

.video-js .vjs-load-progress div {
  background: rgba(115, 133, 159, 0.75);
}

.video-js .vjs-time-tooltip {
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.3em;
  color: #000;
  float: right;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  padding: 6px 8px 8px 8px;
  pointer-events: none;
  position: absolute;
  top: -3.4em;
  visibility: hidden;
  z-index: 1;
}

.video-js .vjs-progress-holder:focus .vjs-time-tooltip {
  display: none;
}

.video-js .vjs-progress-control:hover .vjs-time-tooltip,
.video-js .vjs-progress-control:hover .vjs-progress-holder:focus .vjs-time-tooltip,
.video-js.vjs-scrubbing.vjs-touch-enabled .vjs-progress-control .vjs-time-tooltip {
  display: block;
  font-size: 0.6em;
  visibility: visible;
}

.video-js .vjs-progress-control.disabled:hover .vjs-time-tooltip {
  font-size: 1em;
}

.video-js .vjs-progress-control .vjs-mouse-display {
  display: none;
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: #000;
  z-index: 1;
}

.video-js .vjs-progress-control:hover .vjs-mouse-display {
  display: block;
}

.video-js.vjs-scrubbing.vjs-touch-enabled .vjs-progress-control .vjs-mouse-display {
  display: block;
}

.video-js.vjs-user-inactive .vjs-progress-control .vjs-mouse-display {
  visibility: hidden;
  opacity: 0;
  transition: visibility 1s, opacity 1s;
}

.vjs-mouse-display .vjs-time-tooltip {
  color: #fff;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.8);
}

.video-js .vjs-slider {
  position: relative;
  cursor: pointer;
  padding: 0;
  margin: 0 0.45em 0 0.45em;
  /* iOS Safari */
  -webkit-touch-callout: none;
  /* Safari, and Chrome 53 */
  -webkit-user-select: none;
  /* Non-prefixed version, currently supported by Chrome and Opera */
       -ms-user-select: none;
      user-select: none;
  background-color: #73859f;
  background-color: rgba(115, 133, 159, 0.5);
}

.video-js .vjs-slider.disabled {
  cursor: default;
}

.video-js .vjs-slider:focus {
  text-shadow: 0em 0em 1em white;
  box-shadow: 0 0 1em #fff;
}

.video-js.vjs-spatial-navigation-enabled .vjs-slider:focus {
  outline: 0.0625em solid white;
}

.video-js .vjs-mute-control {
  cursor: pointer;
  flex: none;
}
.video-js .vjs-volume-control {
  cursor: pointer;
  margin-right: 1em;
  display: flex;
}

.video-js .vjs-volume-control.vjs-volume-horizontal {
  width: 5em;
}

.video-js .vjs-volume-panel .vjs-volume-control {
  visibility: visible;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin-left: -1px;
}

.video-js .vjs-volume-panel {
  transition: width 1s;
}
.video-js .vjs-volume-panel.vjs-hover .vjs-volume-control, .video-js .vjs-volume-panel:active .vjs-volume-control, .video-js .vjs-volume-panel:focus .vjs-volume-control, .video-js .vjs-volume-panel .vjs-volume-control:active, .video-js .vjs-volume-panel.vjs-hover .vjs-mute-control ~ .vjs-volume-control, .video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active {
  visibility: visible;
  opacity: 1;
  position: relative;
  transition: visibility 0.1s, opacity 0.1s, height 0.1s, width 0.1s, left 0s, top 0s;
}
.video-js .vjs-volume-panel.vjs-hover .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel:active .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel:focus .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel .vjs-volume-control:active.vjs-volume-horizontal, .video-js .vjs-volume-panel.vjs-hover .vjs-mute-control ~ .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active.vjs-volume-horizontal {
  width: 5em;
  height: 3em;
  margin-right: 0;
}
.video-js .vjs-volume-panel.vjs-hover .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel:active .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel:focus .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel .vjs-volume-control:active.vjs-volume-vertical, .video-js .vjs-volume-panel.vjs-hover .vjs-mute-control ~ .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active.vjs-volume-vertical {
  left: -3.5em;
  transition: left 0s;
}
.video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-hover, .video-js .vjs-volume-panel.vjs-volume-panel-horizontal:active, .video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active {
  width: 10em;
  transition: width 0.1s;
}
.video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-mute-toggle-only {
  width: 4em;
}

.video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical {
  height: 8em;
  width: 3em;
  left: -3000em;
  transition: visibility 1s, opacity 1s, height 1s 1s, width 1s 1s, left 1s 1s, top 1s 1s;
}

.video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-horizontal {
  transition: visibility 1s, opacity 1s, height 1s 1s, width 1s, left 1s 1s, top 1s 1s;
}

.video-js .vjs-volume-panel {
  display: flex;
}

.video-js .vjs-volume-bar {
  margin: 1.35em 0.45em;
}

.vjs-volume-bar.vjs-slider-horizontal {
  width: 5em;
  height: 0.3em;
}

.vjs-volume-bar.vjs-slider-vertical {
  width: 0.3em;
  height: 5em;
  margin: 1.35em auto;
}

.video-js .vjs-volume-level {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
.video-js .vjs-volume-level:before {
  position: absolute;
  font-size: 0.9em;
  z-index: 1;
}

.vjs-slider-vertical .vjs-volume-level {
  width: 0.3em;
}
.vjs-slider-vertical .vjs-volume-level:before {
  top: -0.5em;
  left: -0.3em;
  z-index: 1;
}

.vjs-svg-icons-enabled .vjs-volume-level:before {
  content: none;
}

.vjs-volume-level .vjs-svg-icon {
  position: absolute;
  width: 0.9em;
  height: 0.9em;
  pointer-events: none;
  z-index: 1;
}

.vjs-slider-horizontal .vjs-volume-level {
  height: 0.3em;
}
.vjs-slider-horizontal .vjs-volume-level:before {
  line-height: 0.35em;
  right: -0.5em;
}

.vjs-slider-horizontal .vjs-volume-level .vjs-svg-icon {
  right: -0.3em;
  transform: translateY(-50%);
}

.vjs-slider-vertical .vjs-volume-level .vjs-svg-icon {
  top: -0.55em;
  transform: translateX(-50%);
}

.video-js .vjs-volume-panel.vjs-volume-panel-vertical {
  width: 4em;
}

.vjs-volume-bar.vjs-slider-vertical .vjs-volume-level {
  height: 100%;
}

.vjs-volume-bar.vjs-slider-horizontal .vjs-volume-level {
  width: 100%;
}

.video-js .vjs-volume-vertical {
  width: 3em;
  height: 8em;
  bottom: 8em;
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.7);
}

.video-js .vjs-volume-horizontal .vjs-menu {
  left: -2em;
}

.video-js .vjs-volume-tooltip {
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.3em;
  color: #000;
  float: right;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  padding: 6px 8px 8px 8px;
  pointer-events: none;
  position: absolute;
  top: -3.4em;
  visibility: hidden;
  z-index: 1;
}

.video-js .vjs-volume-control:hover .vjs-volume-tooltip,
.video-js .vjs-volume-control:hover .vjs-progress-holder:focus .vjs-volume-tooltip {
  display: block;
  font-size: 1em;
  visibility: visible;
}

.video-js .vjs-volume-vertical:hover .vjs-volume-tooltip,
.video-js .vjs-volume-vertical:hover .vjs-progress-holder:focus .vjs-volume-tooltip {
  left: 1em;
  top: -12px;
}

.video-js .vjs-volume-control.disabled:hover .vjs-volume-tooltip {
  font-size: 1em;
}

.video-js .vjs-volume-control .vjs-mouse-display {
  display: none;
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #000;
  z-index: 1;
}

.video-js .vjs-volume-horizontal .vjs-mouse-display {
  width: 1px;
  height: 100%;
}

.video-js .vjs-volume-control:hover .vjs-mouse-display {
  display: block;
}

.video-js.vjs-user-inactive .vjs-volume-control .vjs-mouse-display {
  visibility: hidden;
  opacity: 0;
  transition: visibility 1s, opacity 1s;
}

.vjs-mouse-display .vjs-volume-tooltip {
  color: #fff;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.8);
}

.vjs-poster {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
}

.vjs-has-started .vjs-poster,
.vjs-using-native-controls .vjs-poster {
  display: none;
}

.vjs-audio.vjs-has-started .vjs-poster,
.vjs-has-started.vjs-audio-poster-mode .vjs-poster,
.vjs-pip-container.vjs-has-started .vjs-poster {
  display: block;
}

.vjs-poster img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-js .vjs-live-control {
  display: flex;
  align-items: flex-start;
  flex: auto;
  font-size: 1em;
  line-height: 3em;
}

.video-js:not(.vjs-live) .vjs-live-control,
.video-js.vjs-liveui .vjs-live-control {
  display: none;
}

.video-js .vjs-seek-to-live-control {
  align-items: center;
  cursor: pointer;
  flex: none;
  display: inline-flex;
  height: 100%;
  padding-left: 0.5em;
  padding-right: 0.5em;
  font-size: 1em;
  line-height: 3em;
  width: auto;
  min-width: 4em;
}

.video-js.vjs-live:not(.vjs-liveui) .vjs-seek-to-live-control,
.video-js:not(.vjs-live) .vjs-seek-to-live-control {
  display: none;
}

.vjs-seek-to-live-control.vjs-control.vjs-at-live-edge {
  cursor: auto;
}

.vjs-seek-to-live-control .vjs-icon-placeholder {
  margin-right: 0.5em;
  color: #888;
}

.vjs-svg-icons-enabled .vjs-seek-to-live-control {
  line-height: 0;
}

.vjs-seek-to-live-control .vjs-svg-icon {
  width: 1em;
  height: 1em;
  pointer-events: none;
  fill: #888888;
}

.vjs-seek-to-live-control.vjs-control.vjs-at-live-edge .vjs-icon-placeholder {
  color: red;
}

.vjs-seek-to-live-control.vjs-control.vjs-at-live-edge .vjs-svg-icon {
  fill: red;
}

.video-js .vjs-time-control {
  flex: none;
  font-size: 1em;
  line-height: 3em;
  min-width: 2em;
  width: auto;
  padding-left: 1em;
  padding-right: 1em;
}

.vjs-live .vjs-time-control,
.vjs-live .vjs-time-divider,
.video-js .vjs-current-time,
.video-js .vjs-duration {
  display: none;
}

.vjs-time-divider {
  display: none;
  line-height: 3em;
}

.vjs-normalise-time-controls:not(.vjs-live) .vjs-time-control {
  display: flex;
}

.video-js .vjs-play-control {
  cursor: pointer;
}

.video-js .vjs-play-control .vjs-icon-placeholder {
  flex: none;
}

.vjs-text-track-display {
  position: absolute;
  bottom: 3em;
  left: 0;
  right: 0;
  top: 0;
  pointer-events: none;
}

.vjs-error .vjs-text-track-display {
  display: none;
}

.video-js.vjs-controls-disabled .vjs-text-track-display,
.video-js.vjs-user-inactive.vjs-playing .vjs-text-track-display {
  bottom: 1em;
}

.video-js .vjs-text-track {
  font-size: 1.4em;
  text-align: center;
  margin-bottom: 0.1em;
}

.vjs-subtitles {
  color: #fff;
}

.vjs-captions {
  color: #fc6;
}

.vjs-tt-cue {
  display: block;
}

video::-webkit-media-text-track-display {
  transform: translateY(-3em);
}

.video-js.vjs-controls-disabled video::-webkit-media-text-track-display,
.video-js.vjs-user-inactive.vjs-playing video::-webkit-media-text-track-display {
  transform: translateY(-1.5em);
}

.video-js.vjs-force-center-align-cues .vjs-text-track-cue {
  text-align: center !important;
  width: 80% !important;
}

@supports not (inset: 10px) {
  .video-js .vjs-text-track-display > div {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.video-js .vjs-picture-in-picture-control {
  cursor: pointer;
  flex: none;
}
.video-js.vjs-audio-only-mode .vjs-picture-in-picture-control,
.vjs-pip-window .vjs-picture-in-picture-control {
  display: none;
}

.video-js .vjs-fullscreen-control {
  cursor: pointer;
  flex: none;
}
.video-js.vjs-audio-only-mode .vjs-fullscreen-control,
.vjs-pip-window .vjs-fullscreen-control {
  display: none;
}

.vjs-playback-rate > .vjs-menu-button,
.vjs-playback-rate .vjs-playback-rate-value {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.vjs-playback-rate .vjs-playback-rate-value {
  pointer-events: none;
  font-size: 1.5em;
  line-height: 2;
  text-align: center;
}

.vjs-playback-rate .vjs-menu {
  width: 4em;
  left: 0em;
}

.vjs-error .vjs-error-display .vjs-modal-dialog-content {
  font-size: 1.4em;
  text-align: center;
}

.vjs-loading-spinner {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.85;
  text-align: left;
  border: 0.6em solid rgba(43, 51, 63, 0.7);
  box-sizing: border-box;
  background-clip: padding-box;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  visibility: hidden;
}

.vjs-seeking .vjs-loading-spinner,
.vjs-waiting .vjs-loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: vjs-spinner-show 0s linear 0.3s forwards;
}

.vjs-error .vjs-loading-spinner {
  display: none;
}

.vjs-loading-spinner:before,
.vjs-loading-spinner:after {
  content: "";
  position: absolute;
  box-sizing: inherit;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  opacity: 1;
  border: inherit;
  border-color: transparent;
  border-top-color: white;
}

.vjs-seeking .vjs-loading-spinner:before,
.vjs-seeking .vjs-loading-spinner:after,
.vjs-waiting .vjs-loading-spinner:before,
.vjs-waiting .vjs-loading-spinner:after {
  animation: vjs-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8) infinite, vjs-spinner-fade 1.1s linear infinite;
}

.vjs-seeking .vjs-loading-spinner:before,
.vjs-waiting .vjs-loading-spinner:before {
  border-top-color: rgb(255, 255, 255);
}

.vjs-seeking .vjs-loading-spinner:after,
.vjs-waiting .vjs-loading-spinner:after {
  border-top-color: rgb(255, 255, 255);
  animation-delay: 0.44s;
}

@keyframes vjs-spinner-show {
  to {
    visibility: visible;
  }
}
@keyframes vjs-spinner-spin {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes vjs-spinner-fade {
  0% {
    border-top-color: #73859f;
  }
  20% {
    border-top-color: #73859f;
  }
  35% {
    border-top-color: white;
  }
  60% {
    border-top-color: #73859f;
  }
  100% {
    border-top-color: #73859f;
  }
}
.video-js.vjs-audio-only-mode .vjs-captions-button {
  display: none;
}

.vjs-chapters-button .vjs-menu ul {
  width: 24em;
}

.video-js.vjs-audio-only-mode .vjs-descriptions-button {
  display: none;
}

.vjs-subs-caps-button + .vjs-menu .vjs-captions-menu-item .vjs-svg-icon {
  width: 1.5em;
  height: 1.5em;
}

.video-js .vjs-subs-caps-button + .vjs-menu .vjs-captions-menu-item .vjs-menu-item-text .vjs-icon-placeholder {
  vertical-align: middle;
  display: inline-block;
  margin-bottom: -0.1em;
}

.video-js .vjs-subs-caps-button + .vjs-menu .vjs-captions-menu-item .vjs-menu-item-text .vjs-icon-placeholder:before {
  font-family: VideoJS;
  content: "\\f10c";
  font-size: 1.5em;
  line-height: inherit;
}

.video-js.vjs-audio-only-mode .vjs-subs-caps-button {
  display: none;
}

.video-js .vjs-audio-button + .vjs-menu .vjs-descriptions-menu-item .vjs-menu-item-text .vjs-icon-placeholder,
.video-js .vjs-audio-button + .vjs-menu .vjs-main-desc-menu-item .vjs-menu-item-text .vjs-icon-placeholder {
  vertical-align: middle;
  display: inline-block;
  margin-bottom: -0.1em;
}

.video-js .vjs-audio-button + .vjs-menu .vjs-descriptions-menu-item .vjs-menu-item-text .vjs-icon-placeholder:before,
.video-js .vjs-audio-button + .vjs-menu .vjs-main-desc-menu-item .vjs-menu-item-text .vjs-icon-placeholder:before {
  font-family: VideoJS;
  content: " \\f12e";
  font-size: 1.5em;
  line-height: inherit;
}

.video-js.vjs-layout-small .vjs-current-time,
.video-js.vjs-layout-small .vjs-time-divider,
.video-js.vjs-layout-small .vjs-duration,
.video-js.vjs-layout-small .vjs-remaining-time,
.video-js.vjs-layout-small .vjs-playback-rate,
.video-js.vjs-layout-small .vjs-volume-control, .video-js.vjs-layout-x-small .vjs-current-time,
.video-js.vjs-layout-x-small .vjs-time-divider,
.video-js.vjs-layout-x-small .vjs-duration,
.video-js.vjs-layout-x-small .vjs-remaining-time,
.video-js.vjs-layout-x-small .vjs-playback-rate,
.video-js.vjs-layout-x-small .vjs-volume-control, .video-js.vjs-layout-tiny .vjs-current-time,
.video-js.vjs-layout-tiny .vjs-time-divider,
.video-js.vjs-layout-tiny .vjs-duration,
.video-js.vjs-layout-tiny .vjs-remaining-time,
.video-js.vjs-layout-tiny .vjs-playback-rate,
.video-js.vjs-layout-tiny .vjs-volume-control {
  display: none;
}
.video-js.vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal:hover, .video-js.vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal:active, .video-js.vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active, .video-js.vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-hover, .video-js.vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal:hover, .video-js.vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal:active, .video-js.vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active, .video-js.vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-hover, .video-js.vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal:hover, .video-js.vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal:active, .video-js.vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active, .video-js.vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-hover {
  width: auto;
  width: initial;
}
.video-js.vjs-layout-x-small .vjs-progress-control, .video-js.vjs-layout-tiny .vjs-progress-control {
  display: none;
}
.video-js.vjs-layout-x-small .vjs-custom-control-spacer {
  flex: auto;
  display: block;
}

.vjs-modal-dialog.vjs-text-track-settings {
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.75);
  color: #fff;
  height: 70%;
}
.vjs-spatial-navigation-enabled .vjs-modal-dialog.vjs-text-track-settings {
  height: 80%;
}

.vjs-error .vjs-text-track-settings {
  display: none;
}

.vjs-text-track-settings .vjs-modal-dialog-content {
  display: table;
}

.vjs-text-track-settings .vjs-track-settings-colors,
.vjs-text-track-settings .vjs-track-settings-font,
.vjs-text-track-settings .vjs-track-settings-controls {
  display: table-cell;
}

.vjs-text-track-settings .vjs-track-settings-controls {
  text-align: right;
  vertical-align: bottom;
}

@supports (display: grid) {
  .vjs-text-track-settings .vjs-modal-dialog-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    padding: 20px 24px 0px 24px;
  }
  .vjs-track-settings-controls .vjs-default-button {
    margin-bottom: 20px;
  }
  .vjs-text-track-settings .vjs-track-settings-controls {
    grid-column: 1/-1;
  }
  .vjs-layout-small .vjs-text-track-settings .vjs-modal-dialog-content,
  .vjs-layout-x-small .vjs-text-track-settings .vjs-modal-dialog-content,
  .vjs-layout-tiny .vjs-text-track-settings .vjs-modal-dialog-content {
    grid-template-columns: 1fr;
  }
}
.vjs-text-track-settings select {
  font-size: inherit;
}

.vjs-track-setting > select {
  margin-right: 1em;
  margin-bottom: 0.5em;
}

.vjs-text-track-settings fieldset {
  margin: 10px;
  border: none;
}

.vjs-text-track-settings fieldset span {
  display: inline-block;
  padding: 0 0.6em 0.8em;
}

.vjs-text-track-settings fieldset span > select {
  max-width: 7.3em;
}

.vjs-text-track-settings legend {
  color: #fff;
  font-weight: bold;
  font-size: 1.2em;
}

.vjs-text-track-settings .vjs-label {
  margin: 0 0.5em 0.5em 0;
}

.vjs-track-settings-controls button:focus,
.vjs-track-settings-controls button:active {
  outline-style: solid;
  outline-width: medium;
  background-image: linear-gradient(0deg, #fff 88%, #73859f 100%);
}

.vjs-track-settings-controls button:hover {
  color: rgba(43, 51, 63, 0.75);
}

.vjs-track-settings-controls button {
  background-color: #fff;
  background-image: linear-gradient(-180deg, #fff 88%, #73859f 100%);
  color: #2B333F;
  cursor: pointer;
  border-radius: 2px;
}

.vjs-track-settings-controls .vjs-default-button {
  margin-right: 1em;
}

.vjs-title-bar {
  background: rgba(0, 0, 0, 0.9);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0) 100%);
  font-size: 1.2em;
  line-height: 1.5;
  transition: opacity 0.1s;
  padding: 0.666em 1.333em 4em;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
}

.vjs-error .vjs-title-bar {
  display: none;
}

.vjs-title-bar-title,
.vjs-title-bar-description {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.vjs-title-bar-title {
  font-weight: bold;
  margin-bottom: 0.333em;
}

.vjs-playing.vjs-user-inactive .vjs-title-bar {
  opacity: 0;
  transition: opacity 1s;
}

.video-js .vjs-skip-forward-5 {
  cursor: pointer;
}
.video-js .vjs-skip-forward-10 {
  cursor: pointer;
}
.video-js .vjs-skip-forward-30 {
  cursor: pointer;
}
.video-js .vjs-skip-backward-5 {
  cursor: pointer;
}
.video-js .vjs-skip-backward-10 {
  cursor: pointer;
}
.video-js .vjs-skip-backward-30 {
  cursor: pointer;
}
.video-js .vjs-transient-button {
  position: absolute;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(50, 50, 50, 0.5);
  cursor: pointer;
  opacity: 1;
  transition: opacity 1s;
}

.video-js:not(.vjs-has-started) .vjs-transient-button {
  display: none;
}

.video-js.not-hover .vjs-transient-button:not(.force-display),
.video-js.vjs-user-inactive .vjs-transient-button:not(.force-display) {
  opacity: 0;
}

.video-js .vjs-transient-button span {
  padding: 0 0.5em;
}

.video-js .vjs-transient-button.vjs-left {
  left: 1em;
}

.video-js .vjs-transient-button.vjs-right {
  right: 1em;
}

.video-js .vjs-transient-button.vjs-top {
  top: 1em;
}

.video-js .vjs-transient-button.vjs-near-top {
  top: 4em;
}

.video-js .vjs-transient-button.vjs-bottom {
  bottom: 4em;
}

.video-js .vjs-transient-button:hover {
  background-color: rgba(50, 50, 50, 0.9);
}

@media print {
  .video-js > *:not(.vjs-tech):not(.vjs-poster) {
    visibility: hidden;
  }
}
.vjs-resize-manager {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: -1000;
}

.js-focus-visible .video-js *:focus:not(.focus-visible) {
  outline: none;
}

.video-js *:focus:not(:focus-visible) {
  outline: none;
}
`,"",{version:3,sources:["webpack://./node_modules/video.js/dist/video-js.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,4BAA4B;EAC5B,2BAA2B;EAC3B,kBAAkB;EAClB,aAAa;EACb,YAAY;AACd;AACA;EACE,wBAAwB;AAC1B;;AAEA;;EAEE,oCAAoC;AACtC;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;EACpB,2DAAijO;EACjjO,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;;;;;EAKE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;;;;;EAKE,gBAAgB;AAClB;;AAEA;;EAEE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,sBAAsB;EACtB,WAAW;EACX,sBAAsB;EACtB,kBAAkB;EAClB,UAAU;EACV,eAAe;EACf,cAAc;EACd,mBAAmB;EACnB,kBAAkB;EAClB,yCAAyC;EACzC,mBAAmB;AACrB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,aAAa;AACf;;AAEA;;;EAGE,mBAAmB;AACrB;;AAEA;EACE,oBAAoB;EACpB,kBAAkB;EAClB,oBAAoB;EACpB,4BAA4B;EAC5B,cAAc;EACd,eAAe;EACf,aAAa;EACb,gBAAgB;AAClB;;AAEA;;;;;EAKE,WAAW;EACX,eAAe;AACjB;;AAEA;;;;;EAKE,SAAS;AACX;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,UAAU;EACV,SAAS;EACT,YAAY;AACd;;AAEA;;EAEE,eAAe;EACf,gBAAgB;EAChB,aAAa;EACb,OAAO;EACP,MAAM;EACN,SAAS;EACT,QAAQ;AACV;;AAEA;;EAEE,sBAAsB;EACtB,uBAAuB;EACvB,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,cAAc;EACd,oCAAoC;EACpC,cAAc;EACd,kBAAkB;EAClB,WAAW;AACb;;AAEA;;;EAGE,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,kBAAkB;EAClB,MAAM;EACN,UAAU;AACZ;;AAEA;EACE,yBAAyB;EACzB,qBAAqB;EACrB,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,WAAW;EACX,sBAAsB;EACtB,eAAe;EACf,yCAAyC;EACzC,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,gBAAgB;AAClB;;AAEA;;EAEE,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,iBAAiB;EACjB,UAAU;EACV,cAAc;EACd,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;EACf,UAAU;EACV,4BAA4B;EAC5B,yBAAyB;EACzB,uCAAuC;EACvC,oBAAoB;EACpB,oBAAoB;AACtB;AACA;EACE,UAAU;EACV,WAAW;EACX,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,cAAc;EACd,gCAAgC;AAClC;;AAEA;;EAEE,kBAAkB;EAClB,yBAAyB;EACzB,0CAA0C;EAC1C,kBAAkB;AACpB;;AAEA;;;;EAIE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,cAAc;EACd,qBAAqB;EACrB,kBAAkB;EAClB,oBAAoB;EACpB,oBAAoB;EACpB,qBAAqB;EACrB,gBAAgB;EAChB,wBAAwB;OAEnB,gBAAgB;AACvB;;AAEA;EACE,6BAA6B;EAC7B,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,eAAe;EACf,WAAW;EACX,kBAAkB;EAClB,QAAQ;EACR,UAAU;EACV,UAAU;AACZ;AACA;EACE,8BAA8B;EAC9B,+EAA+E;EAC/E,cAAc;AAChB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,cAAc;EACd,UAAU;EACV,SAAS;EACT,yCAAyC;EACzC,cAAc;AAChB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,gBAAgB;EAChB,SAAS;EACT,gBAAgB;EAChB,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;;;EAGE,yBAAyB;EACzB,0CAA0C;AAC5C;;AAEA;;;;EAIE,sBAAsB;EACtB,cAAc;AAChB;AACA;;;;EAIE,aAAa;AACf;;AAEA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,yBAAyB;EACzB,cAAc;EACd,gBAAgB;EAChB,UAAU;EACV,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,UAAU;EACV,WAAW;EACX,oBAAoB;EACpB,uCAAuC;AACzC;;AAEA;EACE,WAAW;EACX,UAAU;AACZ;;AAEA;EACE,yBAAyB;EACzB,uCAAuC;EACvC,kBAAkB;EAClB,WAAW;EACX,aAAa;EACb,gBAAgB;AAClB;;AAEA;;EAEE,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;EAGE,gBAAgB;AAClB;;AAEA;;EAEE,cAAc;AAChB;;AAEA;EACE,oBAAoB;EACpB,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;AACtB;;AAEA;;;EAGE,WAAW;AACb;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,SAAS;EACT,MAAM;EACN,UAAU;EACV,SAAS;EACT,oBAAoB;AACtB;;AAEA;;;EAGE,cAAc;EACd,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,QAAQ;EACR,WAAW;EACX,yBAAyB;EACzB,uCAAuC;AACzC;;AAEA;EACE,QAAQ;AACV;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;;EAEE,aAAa;EACb,mBAAmB;EACnB,UAAU;EACV,yCAAyC;AAC3C;;AAEA;EACE,mBAAmB;EACnB,UAAU;EACV,oBAAoB;EACpB,qCAAqC;AACvC;;AAEA;;;EAGE,wBAAwB;AAC1B;;AAEA;;EAEE,UAAU;EACV,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,UAAU;EACV,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;;;EAGE,8BAA8B;AAChC;;AAEA;EACE,SAAS;EACT,mBAAmB;EACnB,WAAW;EACX,gBAAgB;EAChB,UAAU;EACV,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;EACf,UAAU;EACV,aAAa;EACb,mBAAmB;EACnB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,oBAAoB;EACpB,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;;EAEE,yBAAyB;AAC3B;;AAEA;EACE,cAAc;AAChB;;AAEA;;;EAGE,kBAAkB;EAClB,cAAc;EACd,YAAY;EACZ,SAAS;EACT,UAAU;EACV,QAAQ;AACV;;AAEA;EACE,sBAAsB;AACxB;AACA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,qCAAqC;AACvC;;AAEA;EACE,sBAAsB;EACtB,0CAA0C;EAC1C,oBAAoB;EACpB,WAAW;EACX,YAAY;EACZ,yCAAyC;EACzC,cAAc;EACd,wBAAwB;EACxB,oBAAoB;EACpB,kBAAkB;EAClB,WAAW;EACX,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;;AAEA;;;EAGE,cAAc;EACd,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,UAAU;EACV,YAAY;EACZ,sBAAsB;EACtB,UAAU;AACZ;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,qCAAqC;AACvC;;AAEA;EACE,WAAW;EACX,sBAAsB;EACtB,oCAAoC;AACtC;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,UAAU;EACV,yBAAyB;EACzB,eAAe;EACf,2BAA2B;EAC3B,0BAA0B;EAC1B,yBAAyB;EACzB,kEAAkE;OAE7D,qBAAiB;MAAjB,iBAAiB;EACtB,yBAAyB;EACzB,0CAA0C;AAC5C;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,8BAA8B;EAC9B,wBAAwB;AAC1B;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,eAAe;EACf,UAAU;AACZ;AACA;EACE,eAAe;EACf,iBAAiB;EACjB,aAAa;AACf;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,UAAU;EACV,UAAU;EACV,WAAW;EACX,iBAAiB;AACnB;;AAEA;EACE,oBAAoB;AACtB;AACA;EACE,mBAAmB;EACnB,UAAU;EACV,kBAAkB;EAClB,mFAAmF;AACrF;AACA;EACE,UAAU;EACV,WAAW;EACX,eAAe;AACjB;AACA;EACE,YAAY;EACZ,mBAAmB;AACrB;AACA;EACE,WAAW;EACX,sBAAsB;AACxB;AACA;EACE,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,UAAU;EACV,aAAa;EACb,uFAAuF;AACzF;;AAEA;EACE,oFAAoF;AACtF;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,UAAU;EACV,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;AACA;EACE,WAAW;EACX,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;AACA;EACE,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,2BAA2B;AAC7B;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,UAAU;EACV,WAAW;EACX,WAAW;EACX,yBAAyB;EACzB,uCAAuC;AACzC;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,sBAAsB;EACtB,0CAA0C;EAC1C,oBAAoB;EACpB,WAAW;EACX,YAAY;EACZ,yCAAyC;EACzC,cAAc;EACd,wBAAwB;EACxB,oBAAoB;EACpB,kBAAkB;EAClB,WAAW;EACX,kBAAkB;EAClB,UAAU;AACZ;;AAEA;;EAEE,cAAc;EACd,cAAc;EACd,mBAAmB;AACrB;;AAEA;;EAEE,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,WAAW;EACX,WAAW;EACX,sBAAsB;EACtB,UAAU;AACZ;;AAEA;EACE,UAAU;EACV,YAAY;AACd;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,qCAAqC;AACvC;;AAEA;EACE,WAAW;EACX,sBAAsB;EACtB,oCAAoC;AACtC;;AAEA;EACE,qBAAqB;EACrB,sBAAsB;EACtB,eAAe;EACf,SAAS;EACT,UAAU;EACV,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,YAAY;AACd;;AAEA;;EAEE,aAAa;AACf;;AAEA;;;EAGE,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,UAAU;EACV,cAAc;EACd,gBAAgB;AAClB;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,eAAe;EACf,UAAU;EACV,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,oBAAoB;EACpB,cAAc;EACd,gBAAgB;EAChB,WAAW;EACX,cAAc;AAChB;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,UAAU;EACV,WAAW;EACX,oBAAoB;EACpB,aAAa;AACf;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,UAAU;EACV,cAAc;EACd,gBAAgB;EAChB,cAAc;EACd,WAAW;EACX,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;;;;EAIE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,OAAO;EACP,QAAQ;EACR,MAAM;EACN,oBAAoB;AACtB;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;;EAEE,6BAA6B;AAC/B;;AAEA;EACE,6BAA6B;EAC7B,qBAAqB;AACvB;;AAEA;EACE;IACE,MAAM;IACN,QAAQ;IACR,SAAS;IACT,OAAO;EACT;AACF;AACA;EACE,eAAe;EACf,UAAU;AACZ;AACA;;EAEE,aAAa;AACf;;AAEA;EACE,eAAe;EACf,UAAU;AACZ;AACA;;EAEE,aAAa;AACf;;AAEA;;EAEE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;AACd;;AAEA;EACE,oBAAoB;EACpB,gBAAgB;EAChB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,SAAS;AACX;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,gBAAgB;EAChB,yCAAyC;EACzC,sBAAsB;EACtB,4BAA4B;EAC5B,UAAU;EACV,WAAW;EACX,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;;EAEE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,mDAAmD;AACrD;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,WAAW;EACX,kBAAkB;EAClB,mBAAmB;EACnB,cAAc;EACd,eAAe;EACf,sBAAsB;EACtB,UAAU;EACV,eAAe;EACf,yBAAyB;EACzB,uBAAuB;AACzB;;AAEA;;;;EAIE,+GAA+G;AACjH;;AAEA;;EAEE,oCAAoC;AACtC;;AAEA;;EAEE,oCAAoC;EACpC,sBAAsB;AACxB;;AAEA;EACE;IACE,mBAAmB;EACrB;AACF;AACA;EACE;IACE,yBAAyB;EAC3B;AACF;AACA;EACE;IACE,yBAAyB;EAC3B;EACA;IACE,yBAAyB;EAC3B;EACA;IACE,uBAAuB;EACzB;EACA;IACE,yBAAyB;EAC3B;EACA;IACE,yBAAyB;EAC3B;AACF;AACA;EACE,aAAa;AACf;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,sBAAsB;EACtB,qBAAqB;EACrB,qBAAqB;AACvB;;AAEA;EACE,oBAAoB;EACpB,gBAAgB;EAChB,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,sBAAsB;EACtB,qBAAqB;EACrB,qBAAqB;AACvB;;AAEA;;EAEE,oBAAoB;EACpB,iBAAiB;EACjB,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;;;;;;;;;;;;;;;;EAgBE,aAAa;AACf;AACA;EACE,WAAW;EACX,cAAc;AAChB;AACA;EACE,aAAa;AACf;AACA;EACE,UAAU;EACV,cAAc;AAChB;;AAEA;EACE,yBAAyB;EACzB,wCAAwC;EACxC,WAAW;EACX,WAAW;AACb;AACA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;;;EAGE,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,sBAAsB;AACxB;;AAEA;EACE;IACE,aAAa;IACb,8BAA8B;IAC9B,uBAAuB;IACvB,2BAA2B;EAC7B;EACA;IACE,mBAAmB;EACrB;EACA;IACE,iBAAiB;EACnB;EACA;;;IAGE,0BAA0B;EAC5B;AACF;AACA;EACE,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,qBAAqB;EACrB,sBAAsB;AACxB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;;EAEE,oBAAoB;EACpB,qBAAqB;EACrB,+DAA+D;AACjE;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,sBAAsB;EACtB,kEAAkE;EAClE,cAAc;EACd,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,8BAA8B;EAC9B,yGAAyG;EACzG,gBAAgB;EAChB,gBAAgB;EAChB,wBAAwB;EACxB,4BAA4B;EAC5B,oBAAoB;EACpB,kBAAkB;EAClB,MAAM;EACN,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,SAAS;EACT,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,sBAAsB;AACxB;;AAEA;EACE,UAAU;EACV,sBAAsB;AACxB;;AAEA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,uCAAuC;EACvC,eAAe;EACf,UAAU;EACV,sBAAsB;AACxB;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,UAAU;AACZ;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,QAAQ;AACV;;AAEA;EACE,QAAQ;AACV;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,uCAAuC;AACzC;;AAEA;EACE;IACE,kBAAkB;EACpB;AACF;AACA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,cAAc;AAChB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;AACf",sourcesContent:[`.vjs-svg-icon {
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  fill: currentColor;
  height: 1.8em;
  width: 1.8em;
}
.vjs-svg-icon:before {
  content: none !important;
}

.vjs-svg-icon:hover,
.vjs-control:focus .vjs-svg-icon {
  filter: drop-shadow(0 0 0.25em #fff);
}

.vjs-modal-dialog .vjs-modal-dialog-content, .video-js .vjs-modal-dialog, .vjs-button > .vjs-icon-placeholder:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.vjs-button > .vjs-icon-placeholder:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  text-align: center;
}

@font-face {
  font-family: VideoJS;
  src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAABTsAAsAAAAAIpAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAAPgAAAFZRiV32Y21hcAAAAYQAAAEJAAAD5p42+VxnbHlmAAACkAAADtIAABckI4l972hlYWQAABFkAAAAKwAAADYsvIjpaGhlYQAAEZAAAAAdAAAAJA+RCL1obXR4AAARsAAAABcAAAC8Q2YAAGxvY2EAABHIAAAAYAAAAGB7CIGGbWF4cAAAEigAAAAfAAAAIAFAAI9uYW1lAAASSAAAASUAAAIK1cf1oHBvc3QAABNwAAABfAAAAnXdFqh1eJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGR7yDiBgZWBgaWQ5RkDA8MvCM0cwxDOeI6BgYmBlZkBKwhIc01hcPjI+FGPHcRdyA4RZgQRADaGCyYAAHic7dPXbcMwAEXRK1vuvffem749XAbKV3bjBA6fXsaIgMMLEWoQJaAEFKNnlELyQ4K27zib5PNF6vl8yld+TKr5kH0+cUw0xv00Hwvx2DResUyFKrV4XoMmLdp06NKjz4AhI8ZMmDJjzoIlK9Zs2LJjz4EjJ85cuHLjziPe/0UWL17mf2tqKLz/9jK9f8tXpGCoRdPKhtS0RqFkWvVQNtSKoVYNtWaoddPXEBqG2jQ9XWgZattQO4baNdSeofYNdWCoQ0MdGerYUCeGOjXUmaHODXVhqEtDXRnq2lA3hro11J2h7g31YKhHQz0Z6tlQL4Z6NdSbod4N9WGoT9MfHF6GmhnZLxyDcRMAAAB4nJ1YC1hU17U+a5/HMA4iA3NmVBDmoQwP5TFnHlFeA4gYiUFRQINoSCBAyK3G2yi+0aipYtFcHYo2xsb4NiY3+VrNxSaX5uvt495ozNdoYoxmem2/L8HGpLc+InB279pnhlGr5mvL4eyz99nrrL32eu1/DQcc/okdYgdHOA6MQKp4r9gx0EcMHMezOalVasW5BM7NcXoSb9fFgE6KtSSBxWz1FYDPG+vMBGcKb9cebu2VS5s2aaTkCvRSf6C7Y+Ppibm5E09v7IDs2/3uZQtbD0zIyppwoHXh/93ukmyYgdePNRp65p5v+3v/9otQl2O7wP34cT88p8Md2YxpYLQZoRcy6FlSBRnwnGAe6BPMSCZo+7NJVqS0cE4uHendzhSnbPH6TDqL1+Nme5LZXkCHnGyoH0kne30WH+gswhm3q+pt/mTas9NLS64GnjmSlTPw0wVQT/ewRaBgxtydy3cuUB9/6SW+vb5yRvr+t0eOfPKJZ/9t3+4tL7xj32Xd3thCxi+ge6ifdsAN+l5+wi5HQ/cCoeull1AszS7CUfEcJzK7sKWJAdJhCd0sPM4+EY7QDm5ov08hXRQXE5bf6PV5Q5+IjW7X7Nku92Ask4l2hCRRD6TPqISiCJeQna3SCFwrhrNzXHzo4yFevBwxpzxk8WCIIfkvVEKVy32SbT8n68gzgaslpaiO2zIGIyuSb7RNf9HSuN26y/7OC1tgEmpiyA6aD4qcgTOiLThwGG0eB694FI8NHLLN6OBlRVaMxNAFS4JdXUG6mW8PwpKuYLCLXKGbu8iwYNdgO06Sn3Th+/vyZAxs8Ro30DjHe9gy8Fywi24OMm7Qyzh3MTZVOMYhLBnoC+J79lpTUyQmorjhnMwlcQ5uPEYGpDjsOkkH49BjQLQBqs3jFtFdJNlksYmoQFDArLh8Xh+Qd6Ghcsb6FUuehDi+U/lqD71K/qiegeV1imcwjl7ExwiSrf4BZyCujV6cVcFo6VX+G9IcPyFjJnUufbU/jzrL1X99as36reXl8K32nFaOr+E8jWJEcJ55DpMVfSMe95/AJaOsGBH2GJCNpiRQbK4C8BjdmQA22QY2j03Em13i2YHqtNLU1NI04Yj2HJgA6fQc6VPNpA/D+Ryks554NnVy2mB72uRUfPLsqR4N0LOBQKArwJYO+5W2fgZX8oC1HR6HjNaQTVIG2FPwnTcXXGZZfNB7TE6pTKZUwaw91XWLAoFFGcnB5PHjsckgBjbWutrL+0h5Y1xw3DRGDumsnXb3MJwXrJIN5U7m0rgJ3yG5w4he5ckFG4pmNEkOm0/xOO4r4yL87wqtQM+hiJIVp+6iG2wPBKD35ElGkDx+UfC2v1mFG1o+M3AjNFty8biKMXwzyxnZLds8wYD2BxmCPHAldPOeLsy/0BugftYhVYFAhO8SqQ0j3oK7dHJZnI/jxmUS4onlxskSF8thmvNZjIrRZwEPxr0lBuLRuz3oy/FOHCsxwOPYh2M+e9u3J5pgPYz9gp6G7C9m0A11F9ddqKMfV+4sbq45/YspOysXvT+3pdFdYNg2fHbW8Dz301MqDVuGrz0Fuh0YMW8mddrpqzST7rV9BcvqPoNvadRndWp0p8HvbiqrFj5yFQ/vNFSXDpxpLEFWp+DcrF3FT1afWshFcmCfeAMjEvO65i0Y6XijQfSRPWx3TV/Df7Km3E1l+kLt56s/rwVzuRusNMhudznkwdLaS+QNdeal2jDPP4l9qHc98vTYZOSkxzD+njBWVWjFPKgipx6DkWvXQiW8OYcewVHE5yukinDMcfGgc0opDltYKDxIGBedkzc6jSfE7tlvESCDFUw0Hx0opS+U0lHCxNottbNWSxX9zZVvEhKWUSyBpaXwBc2a98M6UqPeXAs/GDon8Ax7hsthO8cM5HU7Ad0UvRR9lHmtyQKZ4MAe814X5h9MSUkQmhf96eVJ6p90OjIiqSIjvykvr2l5U55O/fPQKD+jIomYpNyGJQ25uQ2kIikRfAmuBHCPsWqkSDEqgZ5KDI2sifS/R43MbZg0idFHbCPNxXxZws1ACVE6hAhOdJwRkJLFBLPZpRGYJ50pko6XzMkgmSx40ljik6AQcKhFnLcQE6rF7PXFe1Ocoj0T3AXgSgJTDIhHRfHlYZKuSzc6uievOJGXY+i5GJkkTp7UM3y0LqATDbtFcbdBxO7o4T25JYlEjoH0uynUh8rapkxp62QN70svSF+hT4gGPlovlmcm/ComLi7mV4kTykV9NFWjE/QrwgQ4uIcAP0rQF4VZYRP2o3PhHHzfPMJj9Ir+uzKUlrH49ntT18AVvj1sc3YGjUT/Mt2Dxawa8ArcA7bCQIpvfwAYu22vEG/No/5RvPdA7g+AelLrPwzy+LtkLPhnpIxH14m4EYq8eeMHbPEPNm6G7Nv9B4jcFPZ8bJj0SEjP3MPgQdKTqqEoy2v6G32P/Y6dxOv04AxnoAeq+GILvUavtYCBXm+BaIhuodcfrN5B/V2EYMCPh+SxavjGyPwV0x4CJgUPGT0mQaODGBACIJZGsMXwAD0LGXx7l3CdAcKMIKI+f5CepWeD0BvyU/GcdBxPF8SwejC6LGZmAURFdsSWKR5HyHld2kbdIZO1Ixx+bnnzU7n5+blPNV9jnUDWhP2tC68tbN3PVIldsQPxSAcSpjOav7Q05uXn5zW2LLvDXn9B6syscPy9iDLEMmSrJz6nYuWMipukjM0AH8JkGS+XFyMRkzSCH7KD/hwm172SAyZYumHlefr5AddrtA0O0TnwaVZxcRY9Bfukn9Gf05N1r9DV9MoBsJ1f+ZrqUvtPHizJAntWybv7hmqLt6QLuK6ZS9Fqi1jO5rDoWPZXXII5Tgajg53cIXCjDCGIcYrRIY2n6+mXOa/W0bdhau3ryiEYe2FV/5oeaIYK/5w5frCyll6/cYO8DiNhw6t1MBWmznt91QX62UF1N7l0eHBZTRGpKaqpKVIPF9UcIzmReud9TSY75+K899GHbBu6wjoR7RKKZVYiYxSPf5/2wJT5e3NAhmUbVn5KLx1Ujg0+BGvpAIh0DezInTkzF37KVocxrKU3r1+XLtAe2lO3l66kfQfB/unKY+q8N375Ru8bc4pJXfEcESU95q+p8ZNZRTWH1d9FzvUdYXk5rLkcdkEisoKKVHQW/b3GEx6tPaYcoJfOr9wAbSBnv1IHpep0OExr4LPMkpJM+j7sly7UHkOzXjoAZljHCGiyegtNlwljM0v+c19ET9Pvst09a2Mtgcf5/ZSzYO5h1156+eyydfAsxGa9XAuF6vzjh6CssLq6ECysperXX0sX5h5ZdpZe3guxsGIPEtHk/aqXX1hVqP5HYVVVISkrrNqvXorIc+5Ou91Hnr/LcD2afi6eX7UBloOcs7cOpqgGaNfs1g7bNbs9z6wASaylN69d0/TFTIz6Ws8+oGV3mE2612wRTHKcVUbhjKadebloMc+dyXgMVtVK6BwMB/+mVW09igdRBWaRtNQX59d/VD//xdQ0TCiYNj1KT9sq6Wdu5WTbqk3qDXyDaLa1fv621LS01G3z61sD6lH8lAxDLicV921s6Bf92JOYvzNYCL1khbqBXEFUzC521N5NyzNaQIWhjyFyDoBIVrAjmv2UEaLlI+c6zw1jmVIPLLLZZUTj6GxGHW+mq1tgHXR2D85p4Q934+jLbtjVLcyCdS10NVzpHqxp4Q/hK7WopY/NRGx9HGsPGdFjOjcpjBnGYMVqY/4eqT5khWEHWUup2A/pTw7pdWgsWft7ETUERL96nRg0HNFPmCYba6pylECaExX89A9WLUOVB4oKLu/o1oqSYHCgLzBUlAz8hNFDRpeSU1XT+LRmDUgPaKbYdHDn9suF/tu13nHJij0N97LfS0QmqONuyONk7zvUI6Qa0pF9f2+oABL92AT6e0U//z9YqAiWtJLU1JK0gS+1aacwamiNqK067u9ZQ8f1d4qLodMzz3uL89Z68V/Hnr++hXWUuHgw8dfi972PeTyPefu3aNNucemQ74qFuIaJnVkOu4Q+yjuwmmC1FqZpl1i4uzoPxjkpPf3Xv545tl26Rr+dOvUd+omqJzch9dOeU7f10Y64nMcKK137DccIZq2WdXtdZjbEoLSzHwiMtrjYLDxpHQW8gjMX6XFYAE2zSWVD04EGYSs9MbO6sEo20BMEAB4mpvSypsKjZ4Stgzb+c3A9/MQT2+vrBy+qvyFxLUtLlSRF/Ri2wjfZ2dus2Q8lXx4608/jnqK5OOap6NY2PSjYYnECCjiEeLJll/pbmqfeIK+ps3+MxrlEhqmTPipVP7kqlF4VhpEb6r+Q7YOJg38kJ9SHBf3NBl6+9YchfbUjb5ahLSzUM3kPHmwFAsZ5rpai0S7E5xWzZ1j+fW7zsUWP2g5NXTw52ySCTrgG0+lbw60l2Y/CB185CoA8NK+tbRKxfjy6pm5hzQRRR+cMqv1Jbiw6STivtEvt3DRcy0QEh92JlUGo2PG4tSKHl00YD6xc8CK+YPYyy3io2lN8BcSjKRzrIV6ypOAobqxViJPaT9M9Hy5szY33mp7OX/Zu89L/7Ww5vqY2Y8b0pKgoiUhG5cPDPzq8qTV/WkzUOIvXVVA96kmjcBrr3HrYC/Wn+fYP6Z7T1rqy3zknbvqma/FvVk96fNXGkuaXrdHW5JGSxZT/2I/O73v+yNWafMdzc5NdxYurHs6h86e01sLKLz9EBrg+x36rxAaED7hRnAMx7Vzu+9wabh3zG8XLQjx0ablUJzmxdErxYT3kzQSd0SSafVqF5PXgpp0OyYJ1EyNHpGUZmvK575ySzd85JSqF7IBzSAbMM04+MbE58xF3/njXOGecSaermlw2y9PsSQdytLJVr8t+wg+rR8cZYoeNxVIzNdk3Bngi8U5LAlgTFoQnzJCa5EsCgYhCaGL+qPj7TdhG31p9tej3R04N//PXxNwJvyUqwaJqRPJY98TJ5TPndmflRAkAhBfe46sfKW5wizSge08Xb7Ca/GUVs55trngkKkrUS2WPzKttaaqq+idmahugkY+W6fN0I6i3gPt/x88U4wAAeJxjYGRgYADiGU9YXsXz23xl4GZnAIFH7fO+IdMc/WBxDgYmEAUASbMKwAB4nGNgZGBgZwABjj4Ghv//OfoZGBlQgT4ARicDZAAAAHicY2BgYGAfxJijD8Fmu4EqBwCSpgKpAAAAAAAADgBoAH4AzADgAQIBQgFsAZgB7gIuAooC0AL8A2IDjAOoA+AEMASwBNoFCAVaBcAGCAYuBnAGrAb2B04HigfSCCoIcAiGCJwIyAkkCVYJiAmsCfIKIApWCsQLknicY2BkYGDQZ2hmYGcAASYg5gJCBob/YD4DABqrAdAAeJxdkE1qg0AYhl8Tk9AIoVDaVSmzahcF87PMARLIMoFAl0ZHY1BHdBJIT9AT9AQ9RQ9Qeqy+yteNMzDzfM+88w0K4BY/cNAMB6N2bUaPPBLukybCLvleeAAPj8JD+hfhMV7hC3u4wxs7OO4NzQSZcI/8Ltwnfwi75E/hAR7wJTyk/xYeY49fYQ/PztM+jbTZ7LY6OWdBJdX/pqs6NYWa+zMxa13oKrA6Uoerqi/JwtpYxZXJ1coUVmeZUWVlTjq0/tHacjmdxuL90OR8O0UEDYMNdtiSEpz5XQGqzlm30kzUdAYFFOb8R7NOZk0q2lwAyz1i7oAr1xoXvrOgtYhZx8wY5KRV269JZ5yGpmzPTjQhvY9je6vEElPOuJP3mWKnP5M3V+YAAAB4nG2ReVPbMBDF/ULi2EkDBFqO3gdHLxUzDB9IkdexBllydRD49ihO3Ckz7B/a31utZnafkkGyiXnyclxhgB0MMUKKMTLkmGCKV5hhF3vYxxwHOMRrvMERjnGCU7zFO7zHB3zEJ3zGF3zFN5zhHBe4xHf8wE/8wm8w/MEVimTYKv44XR9MSCsUjVoeHE3vjQoNsSZ4mmxZmVWPjSz7jlou6/0qKOWEJdKMtCe793/hQfqxa6XWZHMXFl56RS4TvPXSaDeoy0zUUZB109KstDK8lHo5q6Qi1hcOnqkImubPS6aqRq7mlnaEWabub4iYblba3SRmgldS0+FWdhNtt04F14JUaqkl7tcpOpJtErvNt3Bd9HRT5JWxK25Ldjvp6br4hzfFiIdSmlzTg2fSUzNrLd1LE1ynxq4OVaVoKLjzJ60UPtj1RKzHzsbjly6inVnFBS2MucviPncU7Rr7lfTxRepDs1A2j3ZHRc7PuzFYSfE3ZOd4kjwBy227hA==) format("woff");
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-play, .video-js .vjs-play-control .vjs-icon-placeholder, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-play:before, .video-js .vjs-play-control .vjs-icon-placeholder:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  content: "\\f101";
}

.vjs-icon-play-circle {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-play-circle:before {
  content: "\\f102";
}

.vjs-icon-pause, .video-js .vjs-play-control.vjs-playing .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-pause:before, .video-js .vjs-play-control.vjs-playing .vjs-icon-placeholder:before {
  content: "\\f103";
}

.vjs-icon-volume-mute, .video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-volume-mute:before, .video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder:before {
  content: "\\f104";
}

.vjs-icon-volume-low, .video-js .vjs-mute-control.vjs-vol-1 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-volume-low:before, .video-js .vjs-mute-control.vjs-vol-1 .vjs-icon-placeholder:before {
  content: "\\f105";
}

.vjs-icon-volume-mid, .video-js .vjs-mute-control.vjs-vol-2 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-volume-mid:before, .video-js .vjs-mute-control.vjs-vol-2 .vjs-icon-placeholder:before {
  content: "\\f106";
}

.vjs-icon-volume-high, .video-js .vjs-mute-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-volume-high:before, .video-js .vjs-mute-control .vjs-icon-placeholder:before {
  content: "\\f107";
}

.vjs-icon-fullscreen-enter, .video-js .vjs-fullscreen-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-fullscreen-enter:before, .video-js .vjs-fullscreen-control .vjs-icon-placeholder:before {
  content: "\\f108";
}

.vjs-icon-fullscreen-exit, .video-js.vjs-fullscreen .vjs-fullscreen-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-fullscreen-exit:before, .video-js.vjs-fullscreen .vjs-fullscreen-control .vjs-icon-placeholder:before {
  content: "\\f109";
}

.vjs-icon-spinner {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-spinner:before {
  content: "\\f10a";
}

.vjs-icon-subtitles, .video-js .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js.video-js:lang(en-GB) .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js.video-js:lang(en-IE) .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js.video-js:lang(en-AU) .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js.video-js:lang(en-NZ) .vjs-subs-caps-button .vjs-icon-placeholder, .video-js .vjs-subtitles-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-subtitles:before, .video-js .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js.video-js:lang(en-GB) .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js.video-js:lang(en-IE) .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js.video-js:lang(en-AU) .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js.video-js:lang(en-NZ) .vjs-subs-caps-button .vjs-icon-placeholder:before, .video-js .vjs-subtitles-button .vjs-icon-placeholder:before {
  content: "\\f10b";
}

.vjs-icon-captions, .video-js:lang(en) .vjs-subs-caps-button .vjs-icon-placeholder,
.video-js:lang(fr-CA) .vjs-subs-caps-button .vjs-icon-placeholder, .video-js .vjs-captions-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-captions:before, .video-js:lang(en) .vjs-subs-caps-button .vjs-icon-placeholder:before,
.video-js:lang(fr-CA) .vjs-subs-caps-button .vjs-icon-placeholder:before, .video-js .vjs-captions-button .vjs-icon-placeholder:before {
  content: "\\f10c";
}

.vjs-icon-hd {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-hd:before {
  content: "\\f10d";
}

.vjs-icon-chapters, .video-js .vjs-chapters-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-chapters:before, .video-js .vjs-chapters-button .vjs-icon-placeholder:before {
  content: "\\f10e";
}

.vjs-icon-downloading {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-downloading:before {
  content: "\\f10f";
}

.vjs-icon-file-download {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-file-download:before {
  content: "\\f110";
}

.vjs-icon-file-download-done {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-file-download-done:before {
  content: "\\f111";
}

.vjs-icon-file-download-off {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-file-download-off:before {
  content: "\\f112";
}

.vjs-icon-share {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-share:before {
  content: "\\f113";
}

.vjs-icon-cog {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-cog:before {
  content: "\\f114";
}

.vjs-icon-square {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-square:before {
  content: "\\f115";
}

.vjs-icon-circle, .vjs-seek-to-live-control .vjs-icon-placeholder, .video-js .vjs-volume-level, .video-js .vjs-play-progress {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-circle:before, .vjs-seek-to-live-control .vjs-icon-placeholder:before, .video-js .vjs-volume-level:before, .video-js .vjs-play-progress:before {
  content: "\\f116";
}

.vjs-icon-circle-outline {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-circle-outline:before {
  content: "\\f117";
}

.vjs-icon-circle-inner-circle {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-circle-inner-circle:before {
  content: "\\f118";
}

.vjs-icon-cancel, .video-js .vjs-control.vjs-close-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-cancel:before, .video-js .vjs-control.vjs-close-button .vjs-icon-placeholder:before {
  content: "\\f119";
}

.vjs-icon-repeat {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-repeat:before {
  content: "\\f11a";
}

.vjs-icon-replay, .video-js .vjs-play-control.vjs-ended .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-replay:before, .video-js .vjs-play-control.vjs-ended .vjs-icon-placeholder:before {
  content: "\\f11b";
}

.vjs-icon-replay-5, .video-js .vjs-skip-backward-5 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-replay-5:before, .video-js .vjs-skip-backward-5 .vjs-icon-placeholder:before {
  content: "\\f11c";
}

.vjs-icon-replay-10, .video-js .vjs-skip-backward-10 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-replay-10:before, .video-js .vjs-skip-backward-10 .vjs-icon-placeholder:before {
  content: "\\f11d";
}

.vjs-icon-replay-30, .video-js .vjs-skip-backward-30 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-replay-30:before, .video-js .vjs-skip-backward-30 .vjs-icon-placeholder:before {
  content: "\\f11e";
}

.vjs-icon-forward-5, .video-js .vjs-skip-forward-5 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-forward-5:before, .video-js .vjs-skip-forward-5 .vjs-icon-placeholder:before {
  content: "\\f11f";
}

.vjs-icon-forward-10, .video-js .vjs-skip-forward-10 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-forward-10:before, .video-js .vjs-skip-forward-10 .vjs-icon-placeholder:before {
  content: "\\f120";
}

.vjs-icon-forward-30, .video-js .vjs-skip-forward-30 .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-forward-30:before, .video-js .vjs-skip-forward-30 .vjs-icon-placeholder:before {
  content: "\\f121";
}

.vjs-icon-audio, .video-js .vjs-audio-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-audio:before, .video-js .vjs-audio-button .vjs-icon-placeholder:before {
  content: "\\f122";
}

.vjs-icon-next-item {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-next-item:before {
  content: "\\f123";
}

.vjs-icon-previous-item {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-previous-item:before {
  content: "\\f124";
}

.vjs-icon-shuffle {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-shuffle:before {
  content: "\\f125";
}

.vjs-icon-cast {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-cast:before {
  content: "\\f126";
}

.vjs-icon-picture-in-picture-enter, .video-js .vjs-picture-in-picture-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-picture-in-picture-enter:before, .video-js .vjs-picture-in-picture-control .vjs-icon-placeholder:before {
  content: "\\f127";
}

.vjs-icon-picture-in-picture-exit, .video-js.vjs-picture-in-picture .vjs-picture-in-picture-control .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-picture-in-picture-exit:before, .video-js.vjs-picture-in-picture .vjs-picture-in-picture-control .vjs-icon-placeholder:before {
  content: "\\f128";
}

.vjs-icon-facebook {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-facebook:before {
  content: "\\f129";
}

.vjs-icon-linkedin {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-linkedin:before {
  content: "\\f12a";
}

.vjs-icon-twitter {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-twitter:before {
  content: "\\f12b";
}

.vjs-icon-tumblr {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-tumblr:before {
  content: "\\f12c";
}

.vjs-icon-pinterest {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-pinterest:before {
  content: "\\f12d";
}

.vjs-icon-audio-description, .video-js .vjs-descriptions-button .vjs-icon-placeholder {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal;
}
.vjs-icon-audio-description:before, .video-js .vjs-descriptions-button .vjs-icon-placeholder:before {
  content: "\\f12e";
}

.video-js {
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  color: #fff;
  background-color: #000;
  position: relative;
  padding: 0;
  font-size: 10px;
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  font-family: Arial, Helvetica, sans-serif;
  word-break: initial;
}
.video-js:-moz-full-screen {
  position: absolute;
}
.video-js:-webkit-full-screen {
  width: 100% !important;
  height: 100% !important;
}

.video-js[tabindex="-1"] {
  outline: none;
}

.video-js *,
.video-js *:before,
.video-js *:after {
  box-sizing: inherit;
}

.video-js ul {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  list-style-position: outside;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.video-js.vjs-fluid,
.video-js.vjs-16-9,
.video-js.vjs-4-3,
.video-js.vjs-9-16,
.video-js.vjs-1-1 {
  width: 100%;
  max-width: 100%;
}

.video-js.vjs-fluid:not(.vjs-audio-only-mode),
.video-js.vjs-16-9:not(.vjs-audio-only-mode),
.video-js.vjs-4-3:not(.vjs-audio-only-mode),
.video-js.vjs-9-16:not(.vjs-audio-only-mode),
.video-js.vjs-1-1:not(.vjs-audio-only-mode) {
  height: 0;
}

.video-js.vjs-16-9:not(.vjs-audio-only-mode) {
  padding-top: 56.25%;
}

.video-js.vjs-4-3:not(.vjs-audio-only-mode) {
  padding-top: 75%;
}

.video-js.vjs-9-16:not(.vjs-audio-only-mode) {
  padding-top: 177.7777777778%;
}

.video-js.vjs-1-1:not(.vjs-audio-only-mode) {
  padding-top: 100%;
}

.video-js.vjs-fill:not(.vjs-audio-only-mode) {
  width: 100%;
  height: 100%;
}

.video-js .vjs-tech {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-js.vjs-audio-only-mode .vjs-tech {
  display: none;
}

body.vjs-full-window,
body.vjs-pip-window {
  padding: 0;
  margin: 0;
  height: 100%;
}

.vjs-full-window .video-js.vjs-fullscreen,
body.vjs-pip-window .video-js {
  position: fixed;
  overflow: hidden;
  z-index: 1000;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}

.video-js.vjs-fullscreen:not(.vjs-ios-native-fs),
body.vjs-pip-window .video-js {
  width: 100% !important;
  height: 100% !important;
  padding-top: 0 !important;
  display: block;
}

.video-js.vjs-fullscreen.vjs-user-inactive {
  cursor: none;
}

.vjs-pip-container .vjs-pip-text {
  position: absolute;
  bottom: 10%;
  font-size: 2em;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.5em;
  text-align: center;
  width: 100%;
}

.vjs-layout-tiny.vjs-pip-container .vjs-pip-text,
.vjs-layout-x-small.vjs-pip-container .vjs-pip-text,
.vjs-layout-small.vjs-pip-container .vjs-pip-text {
  bottom: 0;
  font-size: 1.4em;
}

.vjs-hidden {
  display: none !important;
}

.vjs-disabled {
  opacity: 0.5;
  cursor: default;
}

.video-js .vjs-offscreen {
  height: 1px;
  left: -9999px;
  position: absolute;
  top: 0;
  width: 1px;
}

.vjs-lock-showing {
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.vjs-no-js {
  padding: 20px;
  color: #fff;
  background-color: #000;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  width: 300px;
  height: 150px;
  margin: 0px auto;
}

.vjs-no-js a,
.vjs-no-js a:visited {
  color: #66A8CC;
}

.video-js .vjs-big-play-button {
  font-size: 3em;
  line-height: 1.5em;
  height: 1.63332em;
  width: 3em;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 0;
  margin-top: -0.81666em;
  margin-left: -1.5em;
  cursor: pointer;
  opacity: 1;
  border: 0.06666em solid #fff;
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.7);
  border-radius: 0.3em;
  transition: all 0.4s;
}
.vjs-big-play-button .vjs-svg-icon {
  width: 1em;
  height: 1em;
  position: absolute;
  top: 50%;
  left: 50%;
  line-height: 1;
  transform: translate(-50%, -50%);
}

.video-js:hover .vjs-big-play-button,
.video-js .vjs-big-play-button:focus {
  border-color: #fff;
  background-color: #73859f;
  background-color: rgba(115, 133, 159, 0.5);
  transition: all 0s;
}

.vjs-controls-disabled .vjs-big-play-button,
.vjs-has-started .vjs-big-play-button,
.vjs-using-native-controls .vjs-big-play-button,
.vjs-error .vjs-big-play-button {
  display: none;
}

.vjs-has-started.vjs-paused.vjs-show-big-play-button-on-pause:not(.vjs-seeking, .vjs-scrubbing, .vjs-error) .vjs-big-play-button {
  display: block;
}

.video-js button {
  background: none;
  border: none;
  color: inherit;
  display: inline-block;
  font-size: inherit;
  line-height: inherit;
  text-transform: none;
  text-decoration: none;
  transition: none;
  -webkit-appearance: none;
  -moz-appearance: none;
       appearance: none;
}

.video-js.vjs-spatial-navigation-enabled .vjs-button:focus {
  outline: 0.0625em solid white;
  box-shadow: none;
}

.vjs-control .vjs-button {
  width: 100%;
  height: 100%;
}

.video-js .vjs-control.vjs-close-button {
  cursor: pointer;
  height: 3em;
  position: absolute;
  right: 0;
  top: 0.5em;
  z-index: 2;
}
.video-js .vjs-modal-dialog {
  background: rgba(0, 0, 0, 0.8);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0));
  overflow: auto;
}

.video-js .vjs-modal-dialog > * {
  box-sizing: border-box;
}

.vjs-modal-dialog .vjs-modal-dialog-content {
  font-size: 1.2em;
  line-height: 1.5;
  padding: 20px 24px;
  z-index: 1;
}

.vjs-menu-button {
  cursor: pointer;
}

.vjs-menu-button.vjs-disabled {
  cursor: default;
}

.vjs-workinghover .vjs-menu-button.vjs-disabled:hover .vjs-menu {
  display: none;
}

.vjs-menu .vjs-menu-content {
  display: block;
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  overflow: auto;
}

.vjs-menu .vjs-menu-content > * {
  box-sizing: border-box;
}

.vjs-scrubbing .vjs-control.vjs-menu-button:hover .vjs-menu {
  display: none;
}

.vjs-menu li {
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0.2em 0;
  line-height: 1.4em;
  font-size: 1.2em;
  text-align: center;
  text-transform: lowercase;
}

.vjs-menu li.vjs-menu-item:focus,
.vjs-menu li.vjs-menu-item:hover,
.js-focus-visible .vjs-menu li.vjs-menu-item:hover {
  background-color: #73859f;
  background-color: rgba(115, 133, 159, 0.5);
}

.vjs-menu li.vjs-selected,
.vjs-menu li.vjs-selected:focus,
.vjs-menu li.vjs-selected:hover,
.js-focus-visible .vjs-menu li.vjs-selected:hover {
  background-color: #fff;
  color: #2B333F;
}
.vjs-menu li.vjs-selected .vjs-svg-icon,
.vjs-menu li.vjs-selected:focus .vjs-svg-icon,
.vjs-menu li.vjs-selected:hover .vjs-svg-icon,
.js-focus-visible .vjs-menu li.vjs-selected:hover .vjs-svg-icon {
  fill: #000000;
}

.video-js .vjs-menu *:not(.vjs-selected):focus:not(:focus-visible),
.js-focus-visible .vjs-menu *:not(.vjs-selected):focus:not(.focus-visible) {
  background: none;
}

.vjs-menu li.vjs-menu-title {
  text-align: center;
  text-transform: uppercase;
  font-size: 1em;
  line-height: 2em;
  padding: 0;
  margin: 0 0 0.3em 0;
  font-weight: bold;
  cursor: default;
}

.vjs-menu-button-popup .vjs-menu {
  display: none;
  position: absolute;
  bottom: 0;
  width: 10em;
  left: -3em;
  height: 0em;
  margin-bottom: 1.5em;
  border-top-color: rgba(43, 51, 63, 0.7);
}

.vjs-pip-window .vjs-menu-button-popup .vjs-menu {
  left: unset;
  right: 1em;
}

.vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.7);
  position: absolute;
  width: 100%;
  bottom: 1.5em;
  max-height: 15em;
}

.vjs-layout-tiny .vjs-menu-button-popup .vjs-menu .vjs-menu-content,
.vjs-layout-x-small .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  max-height: 5em;
}

.vjs-layout-small .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  max-height: 10em;
}

.vjs-layout-medium .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  max-height: 14em;
}

.vjs-layout-large .vjs-menu-button-popup .vjs-menu .vjs-menu-content,
.vjs-layout-x-large .vjs-menu-button-popup .vjs-menu .vjs-menu-content,
.vjs-layout-huge .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
  max-height: 25em;
}

.vjs-workinghover .vjs-menu-button-popup.vjs-hover .vjs-menu,
.vjs-menu-button-popup .vjs-menu.vjs-lock-showing {
  display: block;
}

.video-js .vjs-menu-button-inline {
  transition: all 0.4s;
  overflow: hidden;
}

.video-js .vjs-menu-button-inline:before {
  width: 2.222222222em;
}

.video-js .vjs-menu-button-inline:hover,
.video-js .vjs-menu-button-inline:focus,
.video-js .vjs-menu-button-inline.vjs-slider-active {
  width: 12em;
}

.vjs-menu-button-inline .vjs-menu {
  opacity: 0;
  height: 100%;
  width: auto;
  position: absolute;
  left: 4em;
  top: 0;
  padding: 0;
  margin: 0;
  transition: all 0.4s;
}

.vjs-menu-button-inline:hover .vjs-menu,
.vjs-menu-button-inline:focus .vjs-menu,
.vjs-menu-button-inline.vjs-slider-active .vjs-menu {
  display: block;
  opacity: 1;
}

.vjs-menu-button-inline .vjs-menu-content {
  width: auto;
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.video-js .vjs-control-bar {
  display: none;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3em;
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.7);
}

.video-js.vjs-spatial-navigation-enabled .vjs-control-bar {
  gap: 1px;
}

.video-js:not(.vjs-controls-disabled, .vjs-using-native-controls, .vjs-error) .vjs-control-bar.vjs-lock-showing {
  display: flex !important;
}

.vjs-has-started .vjs-control-bar,
.vjs-audio-only-mode .vjs-control-bar {
  display: flex;
  visibility: visible;
  opacity: 1;
  transition: visibility 0.1s, opacity 0.1s;
}

.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
  visibility: visible;
  opacity: 0;
  pointer-events: none;
  transition: visibility 1s, opacity 1s;
}

.vjs-controls-disabled .vjs-control-bar,
.vjs-using-native-controls .vjs-control-bar,
.vjs-error .vjs-control-bar {
  display: none !important;
}

.vjs-audio.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar,
.vjs-audio-only-mode.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.video-js .vjs-control {
  position: relative;
  text-align: center;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 4em;
  flex: none;
}

.video-js .vjs-control.vjs-visible-text {
  width: auto;
  padding-left: 1em;
  padding-right: 1em;
}

.vjs-button > .vjs-icon-placeholder:before {
  font-size: 1.8em;
  line-height: 1.67;
}

.vjs-button > .vjs-icon-placeholder {
  display: block;
}

.vjs-button > .vjs-svg-icon {
  display: inline-block;
}

.video-js .vjs-control:focus:before,
.video-js .vjs-control:hover:before,
.video-js .vjs-control:focus {
  text-shadow: 0em 0em 1em white;
}

.video-js *:not(.vjs-visible-text) > .vjs-control-text {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.video-js .vjs-custom-control-spacer {
  display: none;
}

.video-js .vjs-progress-control {
  cursor: pointer;
  flex: auto;
  display: flex;
  align-items: center;
  min-width: 4em;
  touch-action: none;
}

.video-js .vjs-progress-control.disabled {
  cursor: default;
}

.vjs-live .vjs-progress-control {
  display: none;
}

.vjs-liveui .vjs-progress-control {
  display: flex;
  align-items: center;
}

.video-js .vjs-progress-holder {
  flex: auto;
  transition: all 0.2s;
  height: 0.3em;
}

.video-js .vjs-progress-control .vjs-progress-holder {
  margin: 0 10px;
}

.video-js .vjs-progress-control:hover .vjs-progress-holder,
.video-js.vjs-scrubbing.vjs-touch-enabled .vjs-progress-control .vjs-progress-holder {
  font-size: 1.6666666667em;
}

.video-js .vjs-progress-control:hover .vjs-progress-holder.disabled {
  font-size: 1em;
}

.video-js .vjs-progress-holder .vjs-play-progress,
.video-js .vjs-progress-holder .vjs-load-progress,
.video-js .vjs-progress-holder .vjs-load-progress div {
  position: absolute;
  display: block;
  height: 100%;
  margin: 0;
  padding: 0;
  width: 0;
}

.video-js .vjs-play-progress {
  background-color: #fff;
}
.video-js .vjs-play-progress:before {
  font-size: 0.9em;
  position: absolute;
  right: -0.5em;
  line-height: 0.35em;
  z-index: 1;
}

.vjs-svg-icons-enabled .vjs-play-progress:before {
  content: none !important;
}

.vjs-play-progress .vjs-svg-icon {
  position: absolute;
  top: -0.35em;
  right: -0.4em;
  width: 0.9em;
  height: 0.9em;
  pointer-events: none;
  line-height: 0.15em;
  z-index: 1;
}

.video-js .vjs-load-progress {
  background: rgba(115, 133, 159, 0.5);
}

.video-js .vjs-load-progress div {
  background: rgba(115, 133, 159, 0.75);
}

.video-js .vjs-time-tooltip {
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.3em;
  color: #000;
  float: right;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  padding: 6px 8px 8px 8px;
  pointer-events: none;
  position: absolute;
  top: -3.4em;
  visibility: hidden;
  z-index: 1;
}

.video-js .vjs-progress-holder:focus .vjs-time-tooltip {
  display: none;
}

.video-js .vjs-progress-control:hover .vjs-time-tooltip,
.video-js .vjs-progress-control:hover .vjs-progress-holder:focus .vjs-time-tooltip,
.video-js.vjs-scrubbing.vjs-touch-enabled .vjs-progress-control .vjs-time-tooltip {
  display: block;
  font-size: 0.6em;
  visibility: visible;
}

.video-js .vjs-progress-control.disabled:hover .vjs-time-tooltip {
  font-size: 1em;
}

.video-js .vjs-progress-control .vjs-mouse-display {
  display: none;
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: #000;
  z-index: 1;
}

.video-js .vjs-progress-control:hover .vjs-mouse-display {
  display: block;
}

.video-js.vjs-scrubbing.vjs-touch-enabled .vjs-progress-control .vjs-mouse-display {
  display: block;
}

.video-js.vjs-user-inactive .vjs-progress-control .vjs-mouse-display {
  visibility: hidden;
  opacity: 0;
  transition: visibility 1s, opacity 1s;
}

.vjs-mouse-display .vjs-time-tooltip {
  color: #fff;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.8);
}

.video-js .vjs-slider {
  position: relative;
  cursor: pointer;
  padding: 0;
  margin: 0 0.45em 0 0.45em;
  /* iOS Safari */
  -webkit-touch-callout: none;
  /* Safari, and Chrome 53 */
  -webkit-user-select: none;
  /* Non-prefixed version, currently supported by Chrome and Opera */
  -moz-user-select: none;
       user-select: none;
  background-color: #73859f;
  background-color: rgba(115, 133, 159, 0.5);
}

.video-js .vjs-slider.disabled {
  cursor: default;
}

.video-js .vjs-slider:focus {
  text-shadow: 0em 0em 1em white;
  box-shadow: 0 0 1em #fff;
}

.video-js.vjs-spatial-navigation-enabled .vjs-slider:focus {
  outline: 0.0625em solid white;
}

.video-js .vjs-mute-control {
  cursor: pointer;
  flex: none;
}
.video-js .vjs-volume-control {
  cursor: pointer;
  margin-right: 1em;
  display: flex;
}

.video-js .vjs-volume-control.vjs-volume-horizontal {
  width: 5em;
}

.video-js .vjs-volume-panel .vjs-volume-control {
  visibility: visible;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin-left: -1px;
}

.video-js .vjs-volume-panel {
  transition: width 1s;
}
.video-js .vjs-volume-panel.vjs-hover .vjs-volume-control, .video-js .vjs-volume-panel:active .vjs-volume-control, .video-js .vjs-volume-panel:focus .vjs-volume-control, .video-js .vjs-volume-panel .vjs-volume-control:active, .video-js .vjs-volume-panel.vjs-hover .vjs-mute-control ~ .vjs-volume-control, .video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active {
  visibility: visible;
  opacity: 1;
  position: relative;
  transition: visibility 0.1s, opacity 0.1s, height 0.1s, width 0.1s, left 0s, top 0s;
}
.video-js .vjs-volume-panel.vjs-hover .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel:active .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel:focus .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel .vjs-volume-control:active.vjs-volume-horizontal, .video-js .vjs-volume-panel.vjs-hover .vjs-mute-control ~ .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active.vjs-volume-horizontal {
  width: 5em;
  height: 3em;
  margin-right: 0;
}
.video-js .vjs-volume-panel.vjs-hover .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel:active .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel:focus .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel .vjs-volume-control:active.vjs-volume-vertical, .video-js .vjs-volume-panel.vjs-hover .vjs-mute-control ~ .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active.vjs-volume-vertical {
  left: -3.5em;
  transition: left 0s;
}
.video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-hover, .video-js .vjs-volume-panel.vjs-volume-panel-horizontal:active, .video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active {
  width: 10em;
  transition: width 0.1s;
}
.video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-mute-toggle-only {
  width: 4em;
}

.video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical {
  height: 8em;
  width: 3em;
  left: -3000em;
  transition: visibility 1s, opacity 1s, height 1s 1s, width 1s 1s, left 1s 1s, top 1s 1s;
}

.video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-horizontal {
  transition: visibility 1s, opacity 1s, height 1s 1s, width 1s, left 1s 1s, top 1s 1s;
}

.video-js .vjs-volume-panel {
  display: flex;
}

.video-js .vjs-volume-bar {
  margin: 1.35em 0.45em;
}

.vjs-volume-bar.vjs-slider-horizontal {
  width: 5em;
  height: 0.3em;
}

.vjs-volume-bar.vjs-slider-vertical {
  width: 0.3em;
  height: 5em;
  margin: 1.35em auto;
}

.video-js .vjs-volume-level {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
.video-js .vjs-volume-level:before {
  position: absolute;
  font-size: 0.9em;
  z-index: 1;
}

.vjs-slider-vertical .vjs-volume-level {
  width: 0.3em;
}
.vjs-slider-vertical .vjs-volume-level:before {
  top: -0.5em;
  left: -0.3em;
  z-index: 1;
}

.vjs-svg-icons-enabled .vjs-volume-level:before {
  content: none;
}

.vjs-volume-level .vjs-svg-icon {
  position: absolute;
  width: 0.9em;
  height: 0.9em;
  pointer-events: none;
  z-index: 1;
}

.vjs-slider-horizontal .vjs-volume-level {
  height: 0.3em;
}
.vjs-slider-horizontal .vjs-volume-level:before {
  line-height: 0.35em;
  right: -0.5em;
}

.vjs-slider-horizontal .vjs-volume-level .vjs-svg-icon {
  right: -0.3em;
  transform: translateY(-50%);
}

.vjs-slider-vertical .vjs-volume-level .vjs-svg-icon {
  top: -0.55em;
  transform: translateX(-50%);
}

.video-js .vjs-volume-panel.vjs-volume-panel-vertical {
  width: 4em;
}

.vjs-volume-bar.vjs-slider-vertical .vjs-volume-level {
  height: 100%;
}

.vjs-volume-bar.vjs-slider-horizontal .vjs-volume-level {
  width: 100%;
}

.video-js .vjs-volume-vertical {
  width: 3em;
  height: 8em;
  bottom: 8em;
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.7);
}

.video-js .vjs-volume-horizontal .vjs-menu {
  left: -2em;
}

.video-js .vjs-volume-tooltip {
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.3em;
  color: #000;
  float: right;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  padding: 6px 8px 8px 8px;
  pointer-events: none;
  position: absolute;
  top: -3.4em;
  visibility: hidden;
  z-index: 1;
}

.video-js .vjs-volume-control:hover .vjs-volume-tooltip,
.video-js .vjs-volume-control:hover .vjs-progress-holder:focus .vjs-volume-tooltip {
  display: block;
  font-size: 1em;
  visibility: visible;
}

.video-js .vjs-volume-vertical:hover .vjs-volume-tooltip,
.video-js .vjs-volume-vertical:hover .vjs-progress-holder:focus .vjs-volume-tooltip {
  left: 1em;
  top: -12px;
}

.video-js .vjs-volume-control.disabled:hover .vjs-volume-tooltip {
  font-size: 1em;
}

.video-js .vjs-volume-control .vjs-mouse-display {
  display: none;
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #000;
  z-index: 1;
}

.video-js .vjs-volume-horizontal .vjs-mouse-display {
  width: 1px;
  height: 100%;
}

.video-js .vjs-volume-control:hover .vjs-mouse-display {
  display: block;
}

.video-js.vjs-user-inactive .vjs-volume-control .vjs-mouse-display {
  visibility: hidden;
  opacity: 0;
  transition: visibility 1s, opacity 1s;
}

.vjs-mouse-display .vjs-volume-tooltip {
  color: #fff;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.8);
}

.vjs-poster {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
}

.vjs-has-started .vjs-poster,
.vjs-using-native-controls .vjs-poster {
  display: none;
}

.vjs-audio.vjs-has-started .vjs-poster,
.vjs-has-started.vjs-audio-poster-mode .vjs-poster,
.vjs-pip-container.vjs-has-started .vjs-poster {
  display: block;
}

.vjs-poster img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-js .vjs-live-control {
  display: flex;
  align-items: flex-start;
  flex: auto;
  font-size: 1em;
  line-height: 3em;
}

.video-js:not(.vjs-live) .vjs-live-control,
.video-js.vjs-liveui .vjs-live-control {
  display: none;
}

.video-js .vjs-seek-to-live-control {
  align-items: center;
  cursor: pointer;
  flex: none;
  display: inline-flex;
  height: 100%;
  padding-left: 0.5em;
  padding-right: 0.5em;
  font-size: 1em;
  line-height: 3em;
  width: auto;
  min-width: 4em;
}

.video-js.vjs-live:not(.vjs-liveui) .vjs-seek-to-live-control,
.video-js:not(.vjs-live) .vjs-seek-to-live-control {
  display: none;
}

.vjs-seek-to-live-control.vjs-control.vjs-at-live-edge {
  cursor: auto;
}

.vjs-seek-to-live-control .vjs-icon-placeholder {
  margin-right: 0.5em;
  color: #888;
}

.vjs-svg-icons-enabled .vjs-seek-to-live-control {
  line-height: 0;
}

.vjs-seek-to-live-control .vjs-svg-icon {
  width: 1em;
  height: 1em;
  pointer-events: none;
  fill: #888888;
}

.vjs-seek-to-live-control.vjs-control.vjs-at-live-edge .vjs-icon-placeholder {
  color: red;
}

.vjs-seek-to-live-control.vjs-control.vjs-at-live-edge .vjs-svg-icon {
  fill: red;
}

.video-js .vjs-time-control {
  flex: none;
  font-size: 1em;
  line-height: 3em;
  min-width: 2em;
  width: auto;
  padding-left: 1em;
  padding-right: 1em;
}

.vjs-live .vjs-time-control,
.vjs-live .vjs-time-divider,
.video-js .vjs-current-time,
.video-js .vjs-duration {
  display: none;
}

.vjs-time-divider {
  display: none;
  line-height: 3em;
}

.vjs-normalise-time-controls:not(.vjs-live) .vjs-time-control {
  display: flex;
}

.video-js .vjs-play-control {
  cursor: pointer;
}

.video-js .vjs-play-control .vjs-icon-placeholder {
  flex: none;
}

.vjs-text-track-display {
  position: absolute;
  bottom: 3em;
  left: 0;
  right: 0;
  top: 0;
  pointer-events: none;
}

.vjs-error .vjs-text-track-display {
  display: none;
}

.video-js.vjs-controls-disabled .vjs-text-track-display,
.video-js.vjs-user-inactive.vjs-playing .vjs-text-track-display {
  bottom: 1em;
}

.video-js .vjs-text-track {
  font-size: 1.4em;
  text-align: center;
  margin-bottom: 0.1em;
}

.vjs-subtitles {
  color: #fff;
}

.vjs-captions {
  color: #fc6;
}

.vjs-tt-cue {
  display: block;
}

video::-webkit-media-text-track-display {
  transform: translateY(-3em);
}

.video-js.vjs-controls-disabled video::-webkit-media-text-track-display,
.video-js.vjs-user-inactive.vjs-playing video::-webkit-media-text-track-display {
  transform: translateY(-1.5em);
}

.video-js.vjs-force-center-align-cues .vjs-text-track-cue {
  text-align: center !important;
  width: 80% !important;
}

@supports not (inset: 10px) {
  .video-js .vjs-text-track-display > div {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.video-js .vjs-picture-in-picture-control {
  cursor: pointer;
  flex: none;
}
.video-js.vjs-audio-only-mode .vjs-picture-in-picture-control,
.vjs-pip-window .vjs-picture-in-picture-control {
  display: none;
}

.video-js .vjs-fullscreen-control {
  cursor: pointer;
  flex: none;
}
.video-js.vjs-audio-only-mode .vjs-fullscreen-control,
.vjs-pip-window .vjs-fullscreen-control {
  display: none;
}

.vjs-playback-rate > .vjs-menu-button,
.vjs-playback-rate .vjs-playback-rate-value {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.vjs-playback-rate .vjs-playback-rate-value {
  pointer-events: none;
  font-size: 1.5em;
  line-height: 2;
  text-align: center;
}

.vjs-playback-rate .vjs-menu {
  width: 4em;
  left: 0em;
}

.vjs-error .vjs-error-display .vjs-modal-dialog-content {
  font-size: 1.4em;
  text-align: center;
}

.vjs-loading-spinner {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.85;
  text-align: left;
  border: 0.6em solid rgba(43, 51, 63, 0.7);
  box-sizing: border-box;
  background-clip: padding-box;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  visibility: hidden;
}

.vjs-seeking .vjs-loading-spinner,
.vjs-waiting .vjs-loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: vjs-spinner-show 0s linear 0.3s forwards;
}

.vjs-error .vjs-loading-spinner {
  display: none;
}

.vjs-loading-spinner:before,
.vjs-loading-spinner:after {
  content: "";
  position: absolute;
  box-sizing: inherit;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  opacity: 1;
  border: inherit;
  border-color: transparent;
  border-top-color: white;
}

.vjs-seeking .vjs-loading-spinner:before,
.vjs-seeking .vjs-loading-spinner:after,
.vjs-waiting .vjs-loading-spinner:before,
.vjs-waiting .vjs-loading-spinner:after {
  animation: vjs-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8) infinite, vjs-spinner-fade 1.1s linear infinite;
}

.vjs-seeking .vjs-loading-spinner:before,
.vjs-waiting .vjs-loading-spinner:before {
  border-top-color: rgb(255, 255, 255);
}

.vjs-seeking .vjs-loading-spinner:after,
.vjs-waiting .vjs-loading-spinner:after {
  border-top-color: rgb(255, 255, 255);
  animation-delay: 0.44s;
}

@keyframes vjs-spinner-show {
  to {
    visibility: visible;
  }
}
@keyframes vjs-spinner-spin {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes vjs-spinner-fade {
  0% {
    border-top-color: #73859f;
  }
  20% {
    border-top-color: #73859f;
  }
  35% {
    border-top-color: white;
  }
  60% {
    border-top-color: #73859f;
  }
  100% {
    border-top-color: #73859f;
  }
}
.video-js.vjs-audio-only-mode .vjs-captions-button {
  display: none;
}

.vjs-chapters-button .vjs-menu ul {
  width: 24em;
}

.video-js.vjs-audio-only-mode .vjs-descriptions-button {
  display: none;
}

.vjs-subs-caps-button + .vjs-menu .vjs-captions-menu-item .vjs-svg-icon {
  width: 1.5em;
  height: 1.5em;
}

.video-js .vjs-subs-caps-button + .vjs-menu .vjs-captions-menu-item .vjs-menu-item-text .vjs-icon-placeholder {
  vertical-align: middle;
  display: inline-block;
  margin-bottom: -0.1em;
}

.video-js .vjs-subs-caps-button + .vjs-menu .vjs-captions-menu-item .vjs-menu-item-text .vjs-icon-placeholder:before {
  font-family: VideoJS;
  content: "\\f10c";
  font-size: 1.5em;
  line-height: inherit;
}

.video-js.vjs-audio-only-mode .vjs-subs-caps-button {
  display: none;
}

.video-js .vjs-audio-button + .vjs-menu .vjs-descriptions-menu-item .vjs-menu-item-text .vjs-icon-placeholder,
.video-js .vjs-audio-button + .vjs-menu .vjs-main-desc-menu-item .vjs-menu-item-text .vjs-icon-placeholder {
  vertical-align: middle;
  display: inline-block;
  margin-bottom: -0.1em;
}

.video-js .vjs-audio-button + .vjs-menu .vjs-descriptions-menu-item .vjs-menu-item-text .vjs-icon-placeholder:before,
.video-js .vjs-audio-button + .vjs-menu .vjs-main-desc-menu-item .vjs-menu-item-text .vjs-icon-placeholder:before {
  font-family: VideoJS;
  content: " \\f12e";
  font-size: 1.5em;
  line-height: inherit;
}

.video-js.vjs-layout-small .vjs-current-time,
.video-js.vjs-layout-small .vjs-time-divider,
.video-js.vjs-layout-small .vjs-duration,
.video-js.vjs-layout-small .vjs-remaining-time,
.video-js.vjs-layout-small .vjs-playback-rate,
.video-js.vjs-layout-small .vjs-volume-control, .video-js.vjs-layout-x-small .vjs-current-time,
.video-js.vjs-layout-x-small .vjs-time-divider,
.video-js.vjs-layout-x-small .vjs-duration,
.video-js.vjs-layout-x-small .vjs-remaining-time,
.video-js.vjs-layout-x-small .vjs-playback-rate,
.video-js.vjs-layout-x-small .vjs-volume-control, .video-js.vjs-layout-tiny .vjs-current-time,
.video-js.vjs-layout-tiny .vjs-time-divider,
.video-js.vjs-layout-tiny .vjs-duration,
.video-js.vjs-layout-tiny .vjs-remaining-time,
.video-js.vjs-layout-tiny .vjs-playback-rate,
.video-js.vjs-layout-tiny .vjs-volume-control {
  display: none;
}
.video-js.vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal:hover, .video-js.vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal:active, .video-js.vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active, .video-js.vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-hover, .video-js.vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal:hover, .video-js.vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal:active, .video-js.vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active, .video-js.vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-hover, .video-js.vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal:hover, .video-js.vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal:active, .video-js.vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active, .video-js.vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-hover {
  width: auto;
  width: initial;
}
.video-js.vjs-layout-x-small .vjs-progress-control, .video-js.vjs-layout-tiny .vjs-progress-control {
  display: none;
}
.video-js.vjs-layout-x-small .vjs-custom-control-spacer {
  flex: auto;
  display: block;
}

.vjs-modal-dialog.vjs-text-track-settings {
  background-color: #2B333F;
  background-color: rgba(43, 51, 63, 0.75);
  color: #fff;
  height: 70%;
}
.vjs-spatial-navigation-enabled .vjs-modal-dialog.vjs-text-track-settings {
  height: 80%;
}

.vjs-error .vjs-text-track-settings {
  display: none;
}

.vjs-text-track-settings .vjs-modal-dialog-content {
  display: table;
}

.vjs-text-track-settings .vjs-track-settings-colors,
.vjs-text-track-settings .vjs-track-settings-font,
.vjs-text-track-settings .vjs-track-settings-controls {
  display: table-cell;
}

.vjs-text-track-settings .vjs-track-settings-controls {
  text-align: right;
  vertical-align: bottom;
}

@supports (display: grid) {
  .vjs-text-track-settings .vjs-modal-dialog-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    padding: 20px 24px 0px 24px;
  }
  .vjs-track-settings-controls .vjs-default-button {
    margin-bottom: 20px;
  }
  .vjs-text-track-settings .vjs-track-settings-controls {
    grid-column: 1/-1;
  }
  .vjs-layout-small .vjs-text-track-settings .vjs-modal-dialog-content,
  .vjs-layout-x-small .vjs-text-track-settings .vjs-modal-dialog-content,
  .vjs-layout-tiny .vjs-text-track-settings .vjs-modal-dialog-content {
    grid-template-columns: 1fr;
  }
}
.vjs-text-track-settings select {
  font-size: inherit;
}

.vjs-track-setting > select {
  margin-right: 1em;
  margin-bottom: 0.5em;
}

.vjs-text-track-settings fieldset {
  margin: 10px;
  border: none;
}

.vjs-text-track-settings fieldset span {
  display: inline-block;
  padding: 0 0.6em 0.8em;
}

.vjs-text-track-settings fieldset span > select {
  max-width: 7.3em;
}

.vjs-text-track-settings legend {
  color: #fff;
  font-weight: bold;
  font-size: 1.2em;
}

.vjs-text-track-settings .vjs-label {
  margin: 0 0.5em 0.5em 0;
}

.vjs-track-settings-controls button:focus,
.vjs-track-settings-controls button:active {
  outline-style: solid;
  outline-width: medium;
  background-image: linear-gradient(0deg, #fff 88%, #73859f 100%);
}

.vjs-track-settings-controls button:hover {
  color: rgba(43, 51, 63, 0.75);
}

.vjs-track-settings-controls button {
  background-color: #fff;
  background-image: linear-gradient(-180deg, #fff 88%, #73859f 100%);
  color: #2B333F;
  cursor: pointer;
  border-radius: 2px;
}

.vjs-track-settings-controls .vjs-default-button {
  margin-right: 1em;
}

.vjs-title-bar {
  background: rgba(0, 0, 0, 0.9);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0) 100%);
  font-size: 1.2em;
  line-height: 1.5;
  transition: opacity 0.1s;
  padding: 0.666em 1.333em 4em;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
}

.vjs-error .vjs-title-bar {
  display: none;
}

.vjs-title-bar-title,
.vjs-title-bar-description {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.vjs-title-bar-title {
  font-weight: bold;
  margin-bottom: 0.333em;
}

.vjs-playing.vjs-user-inactive .vjs-title-bar {
  opacity: 0;
  transition: opacity 1s;
}

.video-js .vjs-skip-forward-5 {
  cursor: pointer;
}
.video-js .vjs-skip-forward-10 {
  cursor: pointer;
}
.video-js .vjs-skip-forward-30 {
  cursor: pointer;
}
.video-js .vjs-skip-backward-5 {
  cursor: pointer;
}
.video-js .vjs-skip-backward-10 {
  cursor: pointer;
}
.video-js .vjs-skip-backward-30 {
  cursor: pointer;
}
.video-js .vjs-transient-button {
  position: absolute;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(50, 50, 50, 0.5);
  cursor: pointer;
  opacity: 1;
  transition: opacity 1s;
}

.video-js:not(.vjs-has-started) .vjs-transient-button {
  display: none;
}

.video-js.not-hover .vjs-transient-button:not(.force-display),
.video-js.vjs-user-inactive .vjs-transient-button:not(.force-display) {
  opacity: 0;
}

.video-js .vjs-transient-button span {
  padding: 0 0.5em;
}

.video-js .vjs-transient-button.vjs-left {
  left: 1em;
}

.video-js .vjs-transient-button.vjs-right {
  right: 1em;
}

.video-js .vjs-transient-button.vjs-top {
  top: 1em;
}

.video-js .vjs-transient-button.vjs-near-top {
  top: 4em;
}

.video-js .vjs-transient-button.vjs-bottom {
  bottom: 4em;
}

.video-js .vjs-transient-button:hover {
  background-color: rgba(50, 50, 50, 0.9);
}

@media print {
  .video-js > *:not(.vjs-tech):not(.vjs-poster) {
    visibility: hidden;
  }
}
.vjs-resize-manager {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: -1000;
}

.js-focus-visible .video-js *:focus:not(.focus-visible) {
  outline: none;
}

.video-js *:focus:not(:focus-visible) {
  outline: none;
}
`],sourceRoot:""}]),le.A=ye},4417:function(ke){"use strict";ke.exports=function(le,G){return G||(G={}),le&&(le=String(le.__esModule?le.default:le),/^['"].*['"]$/.test(le)&&(le=le.slice(1,-1)),G.hash&&(le+=G.hash),/["'() \t\n]|(%20)/.test(le)||G.needQuotes?'"'.concat(le.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):le)}},37049:function(ke,le,G){"use strict";var ne=G(24994);Object.defineProperty(le,"__esModule",{value:!0}),le.default=le.VideoJS=void 0;var A=ne(G(96540)),N=ne(G(91568));G(18692);var I=le.VideoJS=function(he){var ye=A.default.useRef(null),ge=A.default.useRef(null),J=he.options,Ie=he.onReady;return A.default.useEffect(function(){if(ge.current){var $=ge.current;$.autoplay(J.autoplay),$.src(J.sources)}else{var Pe=document.createElement("video-js");Pe.classList.add("vjs-big-play-centered"),ye.current.appendChild(Pe);var Me=ge.current=(0,N.default)(Pe,J,function(){N.default.log("player is ready"),Ie&&Ie(Me)})}},[J,ye]),A.default.useEffect(function(){var Pe=ge.current;return function(){Pe&&!Pe.isDisposed()&&(Pe.dispose(),ge.current=null)}},[ge]),A.default.createElement("div",{"data-vjs-player":!0},A.default.createElement("div",{ref:ye}))},K=le.default=I},39676:function(ke,le,G){"use strict";var ne=G(24994),A=G(73738);Object.defineProperty(le,"__esModule",{value:!0}),le.default=void 0;var N=he(G(96540)),I=ne(G(42916)),K=ne(G(37049));function Z(J){if(typeof WeakMap!="function")return null;var Ie=new WeakMap,Pe=new WeakMap;return(Z=function($){return $?Pe:Ie})(J)}function he(J,Ie){if(!Ie&&J&&J.__esModule)return J;if(J===null||A(J)!="object"&&typeof J!="function")return{default:J};var Pe=Z(Ie);if(Pe&&Pe.has(J))return Pe.get(J);var Me={__proto__:null},$=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var Ue in J)if(Ue!=="default"&&{}.hasOwnProperty.call(J,Ue)){var Se=$?Object.getOwnPropertyDescriptor(J,Ue):null;Se&&(Se.get||Se.set)?Object.defineProperty(Me,Ue,Se):Me[Ue]=J[Ue]}return Me.default=J,Pe&&Pe.set(J,Me),Me}var ye=function(){var Ie=(0,N.useRef)(null),Pe=(0,N.useRef)(null),Me={autoplay:!0,controls:!0,responsive:!0,fluid:!0,sources:[{src:"https://placehold.co/1920x1080.mp4",type:"video/mp4"}]},$=function(Se){Ie.current=Se,Se.on("waiting",function(){}),Se.on("dispose",function(){})};return N.default.createElement(I.default,null,N.default.createElement("video",{ref:Pe,controls:!0,muted:!0,controlsList:"nodownload",style:{width:900}},N.default.createElement("track",{kind:"captions"}),N.default.createElement("source",{src:"https://media.w3.org/2010/05/sintel/trailer.mp4",type:"video/mp4"})),N.default.createElement("div",{style:{width:900}},N.default.createElement(K.default,{options:Me,onReady:$})))},ge=le.default=ye},49697:function(ke,le,G){var ne=typeof G.g!="undefined"?G.g:typeof window!="undefined"?window:{},A=G(80542),N;typeof document!="undefined"?N=document:(N=ne["__GLOBAL_DOCUMENT_CACHE@4"],N||(N=ne["__GLOBAL_DOCUMENT_CACHE@4"]=A)),ke.exports=N},89840:function(ke,le,G){var ne;typeof window!="undefined"?ne=window:typeof G.g!="undefined"?ne=G.g:typeof self!="undefined"?ne=self:ne={},ke.exports=ne},37056:function(ke){ke.exports=G;var le=Object.prototype.toString;function G(ne){if(!ne)return!1;var A=le.call(ne);return A==="[object Function]"||typeof ne=="function"&&A!=="[object RegExp]"||typeof window!="undefined"&&(ne===window.setTimeout||ne===window.alert||ne===window.confirm||ne===window.prompt)}},98962:function(ke,le,G){var ne=G(43626).getUint64,A=function(N){var I=new DataView(N.buffer,N.byteOffset,N.byteLength),K={version:N[0],flags:new Uint8Array(N.subarray(1,4)),references:[],referenceId:I.getUint32(4),timescale:I.getUint32(8)},Z=12;K.version===0?(K.earliestPresentationTime=I.getUint32(Z),K.firstOffset=I.getUint32(Z+4),Z+=8):(K.earliestPresentationTime=ne(N.subarray(Z)),K.firstOffset=ne(N.subarray(Z+8)),Z+=16),Z+=2;var he=I.getUint16(Z);for(Z+=2;he>0;Z+=12,he--)K.references.push({referenceType:(N[Z]&128)>>>7,referencedSize:I.getUint32(Z)&2147483647,subsegmentDuration:I.getUint32(Z+4),startsWithSap:!!(N[Z+8]&128),sapType:(N[Z+8]&112)>>>4,sapDeltaTime:I.getUint32(Z+8)&268435455});return K};ke.exports=A},79622:function(ke){var le=9e4,G,ne,A,N,I,K,Z;G=function(he){return he*le},ne=function(he,ye){return he*ye},A=function(he){return he/le},N=function(he,ye){return he/ye},I=function(he,ye){return G(N(he,ye))},K=function(he,ye){return ne(A(he),ye)},Z=function(he,ye,ge){return A(ge?he:he-ye)},ke.exports={ONE_SECOND_IN_TS:le,secondsToVideoTs:G,secondsToAudioTs:ne,videoTsToSeconds:A,audioTsToSeconds:N,audioTsToVideoTs:I,videoTsToAudioTs:K,metadataTsToSeconds:Z}},43626:function(ke){var le=Math.pow(2,32),G=function(ne){var A=new DataView(ne.buffer,ne.byteOffset,ne.byteLength),N;return A.getBigUint64?(N=A.getBigUint64(0),N<Number.MAX_SAFE_INTEGER?Number(N):N):A.getUint32(0)*le+A.getUint32(4)};ke.exports={getUint64:G,MAX_UINT32:le}},18692:function(ke,le,G){"use strict";G.r(le);var ne=G(85072),A=G.n(ne),N=G(97825),I=G.n(N),K=G(77659),Z=G.n(K),he=G(55056),ye=G.n(he),ge=G(10540),J=G.n(ge),Ie=G(41113),Pe=G.n(Ie),Me=G(5175),$={};$.styleTagTransform=Pe(),$.setAttributes=ye(),$.insert=Z().bind(null,"head"),$.domAPI=I(),$.insertStyleElement=J();var Ue=A()(Me.A,$);le.default=Me.A&&Me.A.locals?Me.A.locals:void 0},91568:function(ke,le,G){"use strict";G.r(le),G.d(le,{default:function(){return L}});var ne=G(89840),A=G.n(ne),N=G(49697),I=G.n(N),K=G(21036),Z=G.n(K),he=G(94784),ye=G.n(he),ge=G(58168),J="https://example.com",Ie=function(e,t){if(/^[a-z]+:/i.test(t))return t;/^data:/.test(e)&&(e=A().location&&A().location.href||"");var i=/^\/\//.test(e),s=!A().location&&!/\/\//i.test(e);e=new(A()).URL(e,A().location||J);var r=new URL(t,e);return s?r.href.slice(J.length):i?r.href.slice(r.protocol.length):r.href},Pe=Ie,Me=function(){function n(){this.listeners={}}var e=n.prototype;return e.on=function(i,s){this.listeners[i]||(this.listeners[i]=[]),this.listeners[i].push(s)},e.off=function(i,s){if(!this.listeners[i])return!1;var r=this.listeners[i].indexOf(s);return this.listeners[i]=this.listeners[i].slice(0),this.listeners[i].splice(r,1),r>-1},e.trigger=function(i){var s=this.listeners[i];if(s)if(arguments.length===2)for(var r=s.length,a=0;a<r;++a)s[a].call(this,arguments[1]);else for(var l=Array.prototype.slice.call(arguments,1),h=s.length,p=0;p<h;++p)s[p].apply(this,l)},e.dispose=function(){this.listeners={}},e.pipe=function(i){this.on("data",function(s){i.push(s)})},n}(),$=G(55271).hp,Ue=function(e){return A().atob?A().atob(e):$.from(e,"base64").toString("binary")};function Se(n){for(var e=Ue(n),t=new Uint8Array(e.length),i=0;i<e.length;i++)t[i]=e.charCodeAt(i);return t}/*! @name m3u8-parser @version 7.2.0 @license Apache-2.0 */class Xe extends Me{constructor(){super(),this.buffer=""}push(e){let t;for(this.buffer+=e,t=this.buffer.indexOf(`
`);t>-1;t=this.buffer.indexOf(`
`))this.trigger("data",this.buffer.substring(0,t)),this.buffer=this.buffer.substring(t+1)}}const re="	",Oe=function(n){const e=/([0-9.]*)?@?([0-9.]*)?/.exec(n||""),t={};return e[1]&&(t.length=parseInt(e[1],10)),e[2]&&(t.offset=parseInt(e[2],10)),t},Te=function(){const t="(?:"+"[^=]*"+")=(?:"+'"[^"]*"|[^,]*'+")";return new RegExp("(?:^|,)("+t+")")},Ce=function(n){const e={};if(!n)return e;const t=n.split(Te());let i=t.length,s;for(;i--;)t[i]!==""&&(s=/([^=]*)=(.*)/.exec(t[i]).slice(1),s[0]=s[0].replace(/^\s+|\s+$/g,""),s[1]=s[1].replace(/^\s+|\s+$/g,""),s[1]=s[1].replace(/^['"](.*)['"]$/g,"$1"),e[s[0]]=s[1]);return e},me=n=>{const e=n.split("x"),t={};return e[0]&&(t.width=parseInt(e[0],10)),e[1]&&(t.height=parseInt(e[1],10)),t};class _e extends Me{constructor(){super(),this.customParsers=[],this.tagMappers=[]}push(e){let t,i;if(e=e.trim(),e.length===0)return;if(e[0]!=="#"){this.trigger("data",{type:"uri",uri:e});return}this.tagMappers.reduce((r,a)=>{const l=a(e);return l===e?r:r.concat([l])},[e]).forEach(r=>{for(let a=0;a<this.customParsers.length;a++)if(this.customParsers[a].call(this,r))return;if(r.indexOf("#EXT")!==0){this.trigger("data",{type:"comment",text:r.slice(1)});return}if(r=r.replace("\r",""),t=/^#EXTM3U/.exec(r),t){this.trigger("data",{type:"tag",tagType:"m3u"});return}if(t=/^#EXTINF:([0-9\.]*)?,?(.*)?$/.exec(r),t){i={type:"tag",tagType:"inf"},t[1]&&(i.duration=parseFloat(t[1])),t[2]&&(i.title=t[2]),this.trigger("data",i);return}if(t=/^#EXT-X-TARGETDURATION:([0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"targetduration"},t[1]&&(i.duration=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-VERSION:([0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"version"},t[1]&&(i.version=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-MEDIA-SEQUENCE:(\-?[0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"media-sequence"},t[1]&&(i.number=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-DISCONTINUITY-SEQUENCE:(\-?[0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"discontinuity-sequence"},t[1]&&(i.number=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-PLAYLIST-TYPE:(.*)?$/.exec(r),t){i={type:"tag",tagType:"playlist-type"},t[1]&&(i.playlistType=t[1]),this.trigger("data",i);return}if(t=/^#EXT-X-BYTERANGE:(.*)?$/.exec(r),t){i=(0,ge.A)(Oe(t[1]),{type:"tag",tagType:"byterange"}),this.trigger("data",i);return}if(t=/^#EXT-X-ALLOW-CACHE:(YES|NO)?/.exec(r),t){i={type:"tag",tagType:"allow-cache"},t[1]&&(i.allowed=!/NO/.test(t[1])),this.trigger("data",i);return}if(t=/^#EXT-X-MAP:(.*)$/.exec(r),t){if(i={type:"tag",tagType:"map"},t[1]){const a=Ce(t[1]);a.URI&&(i.uri=a.URI),a.BYTERANGE&&(i.byterange=Oe(a.BYTERANGE))}this.trigger("data",i);return}if(t=/^#EXT-X-STREAM-INF:(.*)$/.exec(r),t){i={type:"tag",tagType:"stream-inf"},t[1]&&(i.attributes=Ce(t[1]),i.attributes.RESOLUTION&&(i.attributes.RESOLUTION=me(i.attributes.RESOLUTION)),i.attributes.BANDWIDTH&&(i.attributes.BANDWIDTH=parseInt(i.attributes.BANDWIDTH,10)),i.attributes["FRAME-RATE"]&&(i.attributes["FRAME-RATE"]=parseFloat(i.attributes["FRAME-RATE"])),i.attributes["PROGRAM-ID"]&&(i.attributes["PROGRAM-ID"]=parseInt(i.attributes["PROGRAM-ID"],10))),this.trigger("data",i);return}if(t=/^#EXT-X-MEDIA:(.*)$/.exec(r),t){i={type:"tag",tagType:"media"},t[1]&&(i.attributes=Ce(t[1])),this.trigger("data",i);return}if(t=/^#EXT-X-ENDLIST/.exec(r),t){this.trigger("data",{type:"tag",tagType:"endlist"});return}if(t=/^#EXT-X-DISCONTINUITY/.exec(r),t){this.trigger("data",{type:"tag",tagType:"discontinuity"});return}if(t=/^#EXT-X-PROGRAM-DATE-TIME:(.*)$/.exec(r),t){i={type:"tag",tagType:"program-date-time"},t[1]&&(i.dateTimeString=t[1],i.dateTimeObject=new Date(t[1])),this.trigger("data",i);return}if(t=/^#EXT-X-KEY:(.*)$/.exec(r),t){i={type:"tag",tagType:"key"},t[1]&&(i.attributes=Ce(t[1]),i.attributes.IV&&(i.attributes.IV.substring(0,2).toLowerCase()==="0x"&&(i.attributes.IV=i.attributes.IV.substring(2)),i.attributes.IV=i.attributes.IV.match(/.{8}/g),i.attributes.IV[0]=parseInt(i.attributes.IV[0],16),i.attributes.IV[1]=parseInt(i.attributes.IV[1],16),i.attributes.IV[2]=parseInt(i.attributes.IV[2],16),i.attributes.IV[3]=parseInt(i.attributes.IV[3],16),i.attributes.IV=new Uint32Array(i.attributes.IV))),this.trigger("data",i);return}if(t=/^#EXT-X-START:(.*)$/.exec(r),t){i={type:"tag",tagType:"start"},t[1]&&(i.attributes=Ce(t[1]),i.attributes["TIME-OFFSET"]=parseFloat(i.attributes["TIME-OFFSET"]),i.attributes.PRECISE=/YES/.test(i.attributes.PRECISE)),this.trigger("data",i);return}if(t=/^#EXT-X-CUE-OUT-CONT:(.*)?$/.exec(r),t){i={type:"tag",tagType:"cue-out-cont"},t[1]?i.data=t[1]:i.data="",this.trigger("data",i);return}if(t=/^#EXT-X-CUE-OUT:(.*)?$/.exec(r),t){i={type:"tag",tagType:"cue-out"},t[1]?i.data=t[1]:i.data="",this.trigger("data",i);return}if(t=/^#EXT-X-CUE-IN:?(.*)?$/.exec(r),t){i={type:"tag",tagType:"cue-in"},t[1]?i.data=t[1]:i.data="",this.trigger("data",i);return}if(t=/^#EXT-X-SKIP:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"skip"},i.attributes=Ce(t[1]),i.attributes.hasOwnProperty("SKIPPED-SEGMENTS")&&(i.attributes["SKIPPED-SEGMENTS"]=parseInt(i.attributes["SKIPPED-SEGMENTS"],10)),i.attributes.hasOwnProperty("RECENTLY-REMOVED-DATERANGES")&&(i.attributes["RECENTLY-REMOVED-DATERANGES"]=i.attributes["RECENTLY-REMOVED-DATERANGES"].split(re)),this.trigger("data",i);return}if(t=/^#EXT-X-PART:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"part"},i.attributes=Ce(t[1]),["DURATION"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseFloat(i.attributes[a]))}),["INDEPENDENT","GAP"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=/YES/.test(i.attributes[a]))}),i.attributes.hasOwnProperty("BYTERANGE")&&(i.attributes.byterange=Oe(i.attributes.BYTERANGE)),this.trigger("data",i);return}if(t=/^#EXT-X-SERVER-CONTROL:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"server-control"},i.attributes=Ce(t[1]),["CAN-SKIP-UNTIL","PART-HOLD-BACK","HOLD-BACK"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseFloat(i.attributes[a]))}),["CAN-SKIP-DATERANGES","CAN-BLOCK-RELOAD"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=/YES/.test(i.attributes[a]))}),this.trigger("data",i);return}if(t=/^#EXT-X-PART-INF:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"part-inf"},i.attributes=Ce(t[1]),["PART-TARGET"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseFloat(i.attributes[a]))}),this.trigger("data",i);return}if(t=/^#EXT-X-PRELOAD-HINT:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"preload-hint"},i.attributes=Ce(t[1]),["BYTERANGE-START","BYTERANGE-LENGTH"].forEach(function(a){if(i.attributes.hasOwnProperty(a)){i.attributes[a]=parseInt(i.attributes[a],10);const l=a==="BYTERANGE-LENGTH"?"length":"offset";i.attributes.byterange=i.attributes.byterange||{},i.attributes.byterange[l]=i.attributes[a],delete i.attributes[a]}}),this.trigger("data",i);return}if(t=/^#EXT-X-RENDITION-REPORT:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"rendition-report"},i.attributes=Ce(t[1]),["LAST-MSN","LAST-PART"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseInt(i.attributes[a],10))}),this.trigger("data",i);return}if(t=/^#EXT-X-DATERANGE:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"daterange"},i.attributes=Ce(t[1]),["ID","CLASS"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=String(i.attributes[l]))}),["START-DATE","END-DATE"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=new Date(i.attributes[l]))}),["DURATION","PLANNED-DURATION"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=parseFloat(i.attributes[l]))}),["END-ON-NEXT"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=/YES/i.test(i.attributes[l]))}),["SCTE35-CMD"," SCTE35-OUT","SCTE35-IN"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=i.attributes[l].toString(16))});const a=/^X-([A-Z]+-)+[A-Z]+$/;for(const l in i.attributes){if(!a.test(l))continue;const h=/[0-9A-Fa-f]{6}/g.test(i.attributes[l]),p=/^\d+(\.\d+)?$/.test(i.attributes[l]);i.attributes[l]=h?i.attributes[l].toString(16):p?parseFloat(i.attributes[l]):String(i.attributes[l])}this.trigger("data",i);return}if(t=/^#EXT-X-INDEPENDENT-SEGMENTS/.exec(r),t){this.trigger("data",{type:"tag",tagType:"independent-segments"});return}if(t=/^#EXT-X-I-FRAMES-ONLY/.exec(r),t){this.trigger("data",{type:"tag",tagType:"i-frames-only"});return}if(t=/^#EXT-X-CONTENT-STEERING:(.*)$/.exec(r),t){i={type:"tag",tagType:"content-steering"},i.attributes=Ce(t[1]),this.trigger("data",i);return}if(t=/^#EXT-X-I-FRAME-STREAM-INF:(.*)$/.exec(r),t){i={type:"tag",tagType:"i-frame-playlist"},i.attributes=Ce(t[1]),i.attributes.URI&&(i.uri=i.attributes.URI),i.attributes.BANDWIDTH&&(i.attributes.BANDWIDTH=parseInt(i.attributes.BANDWIDTH,10)),i.attributes.RESOLUTION&&(i.attributes.RESOLUTION=me(i.attributes.RESOLUTION)),i.attributes["AVERAGE-BANDWIDTH"]&&(i.attributes["AVERAGE-BANDWIDTH"]=parseInt(i.attributes["AVERAGE-BANDWIDTH"],10)),i.attributes["FRAME-RATE"]&&(i.attributes["FRAME-RATE"]=parseFloat(i.attributes["FRAME-RATE"])),this.trigger("data",i);return}if(t=/^#EXT-X-DEFINE:(.*)$/.exec(r),t){i={type:"tag",tagType:"define"},i.attributes=Ce(t[1]),this.trigger("data",i);return}this.trigger("data",{type:"tag",data:r.slice(4)})})}addParser({expression:e,customType:t,dataParser:i,segment:s}){typeof i!="function"&&(i=r=>r),this.customParsers.push(r=>{if(e.exec(r))return this.trigger("data",{type:"custom",data:i(r),customType:t,segment:s}),!0})}addTagMapper({expression:e,map:t}){const i=s=>e.test(s)?t(s):s;this.tagMappers.push(i)}}const ze=n=>n.toLowerCase().replace(/-(\w)/g,e=>e[1].toUpperCase()),De=function(n){const e={};return Object.keys(n).forEach(function(t){e[ze(t)]=n[t]}),e},C=function(n){const{serverControl:e,targetDuration:t,partTargetDuration:i}=n;if(!e)return;const s="#EXT-X-SERVER-CONTROL",r="holdBack",a="partHoldBack",l=t&&t*3,h=i&&i*2;t&&!e.hasOwnProperty(r)&&(e[r]=l,this.trigger("info",{message:`${s} defaulting HOLD-BACK to targetDuration * 3 (${l}).`})),l&&e[r]<l&&(this.trigger("warn",{message:`${s} clamping HOLD-BACK (${e[r]}) to targetDuration * 3 (${l})`}),e[r]=l),i&&!e.hasOwnProperty(a)&&(e[a]=i*3,this.trigger("info",{message:`${s} defaulting PART-HOLD-BACK to partTargetDuration * 3 (${e[a]}).`})),i&&e[a]<h&&(this.trigger("warn",{message:`${s} clamping PART-HOLD-BACK (${e[a]}) to partTargetDuration * 2 (${h}).`}),e[a]=h)};class S extends Me{constructor(e={}){super(),this.lineStream=new Xe,this.parseStream=new _e,this.lineStream.pipe(this.parseStream),this.mainDefinitions=e.mainDefinitions||{},this.params=new URL(e.uri,"https://a.com").searchParams,this.lastProgramDateTime=null;const t=this,i=[];let s={},r,a,l=!1;const h=function(){},p={AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},g="urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed";let y=0;this.manifest={allowCache:!0,discontinuityStarts:[],dateRanges:[],iFramePlaylists:[],segments:[]};let w=0,D=0;const P={};this.on("end",()=>{s.uri||!s.parts&&!s.preloadHints||(!s.map&&r&&(s.map=r),!s.key&&a&&(s.key=a),!s.timeline&&typeof y=="number"&&(s.timeline=y),this.manifest.preloadSegment=s)}),this.parseStream.on("data",function(E){let H,V;if(t.manifest.definitions){for(const U in t.manifest.definitions)if(E.uri&&(E.uri=E.uri.replace(`{$${U}}`,t.manifest.definitions[U])),E.attributes)for(const M in E.attributes)typeof E.attributes[M]=="string"&&(E.attributes[M]=E.attributes[M].replace(`{$${U}}`,t.manifest.definitions[U]))}({tag(){({version(){E.version&&(this.manifest.version=E.version)},"allow-cache"(){this.manifest.allowCache=E.allowed,"allowed"in E||(this.trigger("info",{message:"defaulting allowCache to YES"}),this.manifest.allowCache=!0)},byterange(){const U={};"length"in E&&(s.byterange=U,U.length=E.length,"offset"in E||(E.offset=w)),"offset"in E&&(s.byterange=U,U.offset=E.offset),w=U.offset+U.length},endlist(){this.manifest.endList=!0},inf(){"mediaSequence"in this.manifest||(this.manifest.mediaSequence=0,this.trigger("info",{message:"defaulting media sequence to zero"})),"discontinuitySequence"in this.manifest||(this.manifest.discontinuitySequence=0,this.trigger("info",{message:"defaulting discontinuity sequence to zero"})),E.title&&(s.title=E.title),E.duration>0&&(s.duration=E.duration),E.duration===0&&(s.duration=.01,this.trigger("info",{message:"updating zero segment duration to a small value"})),this.manifest.segments=i},key(){if(!E.attributes){this.trigger("warn",{message:"ignoring key declaration without attribute list"});return}if(E.attributes.METHOD==="NONE"){a=null;return}if(!E.attributes.URI){this.trigger("warn",{message:"ignoring key declaration without URI"});return}if(E.attributes.KEYFORMAT==="com.apple.streamingkeydelivery"){this.manifest.contentProtection=this.manifest.contentProtection||{},this.manifest.contentProtection["com.apple.fps.1_0"]={attributes:E.attributes};return}if(E.attributes.KEYFORMAT==="com.microsoft.playready"){this.manifest.contentProtection=this.manifest.contentProtection||{},this.manifest.contentProtection["com.microsoft.playready"]={uri:E.attributes.URI};return}if(E.attributes.KEYFORMAT===g){if(["SAMPLE-AES","SAMPLE-AES-CTR","SAMPLE-AES-CENC"].indexOf(E.attributes.METHOD)===-1){this.trigger("warn",{message:"invalid key method provided for Widevine"});return}if(E.attributes.METHOD==="SAMPLE-AES-CENC"&&this.trigger("warn",{message:"SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead"}),E.attributes.URI.substring(0,23)!=="data:text/plain;base64,"){this.trigger("warn",{message:"invalid key URI provided for Widevine"});return}if(!(E.attributes.KEYID&&E.attributes.KEYID.substring(0,2)==="0x")){this.trigger("warn",{message:"invalid key ID provided for Widevine"});return}this.manifest.contentProtection=this.manifest.contentProtection||{},this.manifest.contentProtection["com.widevine.alpha"]={attributes:{schemeIdUri:E.attributes.KEYFORMAT,keyId:E.attributes.KEYID.substring(2)},pssh:Se(E.attributes.URI.split(",")[1])};return}E.attributes.METHOD||this.trigger("warn",{message:"defaulting key method to AES-128"}),a={method:E.attributes.METHOD||"AES-128",uri:E.attributes.URI},typeof E.attributes.IV!="undefined"&&(a.iv=E.attributes.IV)},"media-sequence"(){if(!isFinite(E.number)){this.trigger("warn",{message:"ignoring invalid media sequence: "+E.number});return}this.manifest.mediaSequence=E.number},"discontinuity-sequence"(){if(!isFinite(E.number)){this.trigger("warn",{message:"ignoring invalid discontinuity sequence: "+E.number});return}this.manifest.discontinuitySequence=E.number,y=E.number},"playlist-type"(){if(!/VOD|EVENT/.test(E.playlistType)){this.trigger("warn",{message:"ignoring unknown playlist type: "+E.playlist});return}this.manifest.playlistType=E.playlistType},map(){r={},E.uri&&(r.uri=E.uri),E.byterange&&(r.byterange=E.byterange),a&&(r.key=a)},"stream-inf"(){if(this.manifest.playlists=i,this.manifest.mediaGroups=this.manifest.mediaGroups||p,!E.attributes){this.trigger("warn",{message:"ignoring empty stream-inf attributes"});return}s.attributes||(s.attributes={}),(0,ge.A)(s.attributes,E.attributes)},media(){if(this.manifest.mediaGroups=this.manifest.mediaGroups||p,!(E.attributes&&E.attributes.TYPE&&E.attributes["GROUP-ID"]&&E.attributes.NAME)){this.trigger("warn",{message:"ignoring incomplete or missing media group"});return}const U=this.manifest.mediaGroups[E.attributes.TYPE];U[E.attributes["GROUP-ID"]]=U[E.attributes["GROUP-ID"]]||{},H=U[E.attributes["GROUP-ID"]],V={default:/yes/i.test(E.attributes.DEFAULT)},V.default?V.autoselect=!0:V.autoselect=/yes/i.test(E.attributes.AUTOSELECT),E.attributes.LANGUAGE&&(V.language=E.attributes.LANGUAGE),E.attributes.URI&&(V.uri=E.attributes.URI),E.attributes["INSTREAM-ID"]&&(V.instreamId=E.attributes["INSTREAM-ID"]),E.attributes.CHARACTERISTICS&&(V.characteristics=E.attributes.CHARACTERISTICS),E.attributes.FORCED&&(V.forced=/yes/i.test(E.attributes.FORCED)),H[E.attributes.NAME]=V},discontinuity(){y+=1,s.discontinuity=!0,this.manifest.discontinuityStarts.push(i.length)},"program-date-time"(){typeof this.manifest.dateTimeString=="undefined"&&(this.manifest.dateTimeString=E.dateTimeString,this.manifest.dateTimeObject=E.dateTimeObject),s.dateTimeString=E.dateTimeString,s.dateTimeObject=E.dateTimeObject;const{lastProgramDateTime:U}=this;this.lastProgramDateTime=new Date(E.dateTimeString).getTime(),U===null&&this.manifest.segments.reduceRight((M,Y)=>(Y.programDateTime=M-Y.duration*1e3,Y.programDateTime),this.lastProgramDateTime)},targetduration(){if(!isFinite(E.duration)||E.duration<0){this.trigger("warn",{message:"ignoring invalid target duration: "+E.duration});return}this.manifest.targetDuration=E.duration,C.call(this,this.manifest)},start(){if(!E.attributes||isNaN(E.attributes["TIME-OFFSET"])){this.trigger("warn",{message:"ignoring start declaration without appropriate attribute list"});return}this.manifest.start={timeOffset:E.attributes["TIME-OFFSET"],precise:E.attributes.PRECISE}},"cue-out"(){s.cueOut=E.data},"cue-out-cont"(){s.cueOutCont=E.data},"cue-in"(){s.cueIn=E.data},skip(){this.manifest.skip=De(E.attributes),this.warnOnMissingAttributes_("#EXT-X-SKIP",E.attributes,["SKIPPED-SEGMENTS"])},part(){l=!0;const U=this.manifest.segments.length,M=De(E.attributes);s.parts=s.parts||[],s.parts.push(M),M.byterange&&(M.byterange.hasOwnProperty("offset")||(M.byterange.offset=D),D=M.byterange.offset+M.byterange.length);const Y=s.parts.length-1;this.warnOnMissingAttributes_(`#EXT-X-PART #${Y} for segment #${U}`,E.attributes,["URI","DURATION"]),this.manifest.renditionReports&&this.manifest.renditionReports.forEach((O,Q)=>{O.hasOwnProperty("lastPart")||this.trigger("warn",{message:`#EXT-X-RENDITION-REPORT #${Q} lacks required attribute(s): LAST-PART`})})},"server-control"(){const U=this.manifest.serverControl=De(E.attributes);U.hasOwnProperty("canBlockReload")||(U.canBlockReload=!1,this.trigger("info",{message:"#EXT-X-SERVER-CONTROL defaulting CAN-BLOCK-RELOAD to false"})),C.call(this,this.manifest),U.canSkipDateranges&&!U.hasOwnProperty("canSkipUntil")&&this.trigger("warn",{message:"#EXT-X-SERVER-CONTROL lacks required attribute CAN-SKIP-UNTIL which is required when CAN-SKIP-DATERANGES is set"})},"preload-hint"(){const U=this.manifest.segments.length,M=De(E.attributes),Y=M.type&&M.type==="PART";s.preloadHints=s.preloadHints||[],s.preloadHints.push(M),M.byterange&&(M.byterange.hasOwnProperty("offset")||(M.byterange.offset=Y?D:0,Y&&(D=M.byterange.offset+M.byterange.length)));const O=s.preloadHints.length-1;if(this.warnOnMissingAttributes_(`#EXT-X-PRELOAD-HINT #${O} for segment #${U}`,E.attributes,["TYPE","URI"]),!!M.type)for(let Q=0;Q<s.preloadHints.length-1;Q++){const Ae=s.preloadHints[Q];Ae.type&&Ae.type===M.type&&this.trigger("warn",{message:`#EXT-X-PRELOAD-HINT #${O} for segment #${U} has the same TYPE ${M.type} as preload hint #${Q}`})}},"rendition-report"(){const U=De(E.attributes);this.manifest.renditionReports=this.manifest.renditionReports||[],this.manifest.renditionReports.push(U);const M=this.manifest.renditionReports.length-1,Y=["LAST-MSN","URI"];l&&Y.push("LAST-PART"),this.warnOnMissingAttributes_(`#EXT-X-RENDITION-REPORT #${M}`,E.attributes,Y)},"part-inf"(){this.manifest.partInf=De(E.attributes),this.warnOnMissingAttributes_("#EXT-X-PART-INF",E.attributes,["PART-TARGET"]),this.manifest.partInf.partTarget&&(this.manifest.partTargetDuration=this.manifest.partInf.partTarget),C.call(this,this.manifest)},daterange(){this.manifest.dateRanges.push(De(E.attributes));const U=this.manifest.dateRanges.length-1;this.warnOnMissingAttributes_(`#EXT-X-DATERANGE #${U}`,E.attributes,["ID","START-DATE"]);const M=this.manifest.dateRanges[U];M.endDate&&M.startDate&&new Date(M.endDate)<new Date(M.startDate)&&this.trigger("warn",{message:"EXT-X-DATERANGE END-DATE must be equal to or later than the value of the START-DATE"}),M.duration&&M.duration<0&&this.trigger("warn",{message:"EXT-X-DATERANGE DURATION must not be negative"}),M.plannedDuration&&M.plannedDuration<0&&this.trigger("warn",{message:"EXT-X-DATERANGE PLANNED-DURATION must not be negative"});const Y=!!M.endOnNext;if(Y&&!M.class&&this.trigger("warn",{message:"EXT-X-DATERANGE with an END-ON-NEXT=YES attribute must have a CLASS attribute"}),Y&&(M.duration||M.endDate)&&this.trigger("warn",{message:"EXT-X-DATERANGE with an END-ON-NEXT=YES attribute must not contain DURATION or END-DATE attributes"}),M.duration&&M.endDate){const Q=M.startDate.getTime()+M.duration*1e3;this.manifest.dateRanges[U].endDate=new Date(Q)}if(!P[M.id])P[M.id]=M;else{for(const Q in P[M.id])if(M[Q]&&JSON.stringify(P[M.id][Q])!==JSON.stringify(M[Q])){this.trigger("warn",{message:"EXT-X-DATERANGE tags with the same ID in a playlist must have the same attributes values"});break}const O=this.manifest.dateRanges.findIndex(Q=>Q.id===M.id);this.manifest.dateRanges[O]=(0,ge.A)(this.manifest.dateRanges[O],M),P[M.id]=(0,ge.A)(P[M.id],M),this.manifest.dateRanges.pop()}},"independent-segments"(){this.manifest.independentSegments=!0},"i-frames-only"(){this.manifest.iFramesOnly=!0,this.requiredCompatibilityversion(this.manifest.version,4)},"content-steering"(){this.manifest.contentSteering=De(E.attributes),this.warnOnMissingAttributes_("#EXT-X-CONTENT-STEERING",E.attributes,["SERVER-URI"])},define(){this.manifest.definitions=this.manifest.definitions||{};const U=(M,Y)=>{if(M in this.manifest.definitions){this.trigger("error",{message:`EXT-X-DEFINE: Duplicate name ${M}`});return}this.manifest.definitions[M]=Y};if("QUERYPARAM"in E.attributes){if("NAME"in E.attributes||"IMPORT"in E.attributes){this.trigger("error",{message:"EXT-X-DEFINE: Invalid attributes"});return}const M=this.params.get(E.attributes.QUERYPARAM);if(!M){this.trigger("error",{message:`EXT-X-DEFINE: No query param ${E.attributes.QUERYPARAM}`});return}U(E.attributes.QUERYPARAM,decodeURIComponent(M));return}if("NAME"in E.attributes){if("IMPORT"in E.attributes){this.trigger("error",{message:"EXT-X-DEFINE: Invalid attributes"});return}if(!("VALUE"in E.attributes)||typeof E.attributes.VALUE!="string"){this.trigger("error",{message:`EXT-X-DEFINE: No value for ${E.attributes.NAME}`});return}U(E.attributes.NAME,E.attributes.VALUE);return}if("IMPORT"in E.attributes){if(!this.mainDefinitions[E.attributes.IMPORT]){this.trigger("error",{message:`EXT-X-DEFINE: No value ${E.attributes.IMPORT} to import, or IMPORT used on main playlist`});return}U(E.attributes.IMPORT,this.mainDefinitions[E.attributes.IMPORT]);return}this.trigger("error",{message:"EXT-X-DEFINE: No attribute"})},"i-frame-playlist"(){this.manifest.iFramePlaylists.push({attributes:E.attributes,uri:E.uri,timeline:y}),this.warnOnMissingAttributes_("#EXT-X-I-FRAME-STREAM-INF",E.attributes,["BANDWIDTH","URI"])}}[E.tagType]||h).call(t)},uri(){s.uri=E.uri,i.push(s),this.manifest.targetDuration&&!("duration"in s)&&(this.trigger("warn",{message:"defaulting segment duration to the target duration"}),s.duration=this.manifest.targetDuration),a&&(s.key=a),s.timeline=y,r&&(s.map=r),D=0,this.lastProgramDateTime!==null&&(s.programDateTime=this.lastProgramDateTime,this.lastProgramDateTime+=s.duration*1e3),s={}},comment(){},custom(){E.segment?(s.custom=s.custom||{},s.custom[E.customType]=E.data):(this.manifest.custom=this.manifest.custom||{},this.manifest.custom[E.customType]=E.data)}})[E.type].call(t)})}requiredCompatibilityversion(e,t){(e<t||!e)&&this.trigger("warn",{message:`manifest must be at least version ${t}`})}warnOnMissingAttributes_(e,t,i){const s=[];i.forEach(function(r){t.hasOwnProperty(r)||s.push(r)}),s.length&&this.trigger("warn",{message:`${e} lacks required attribute(s): ${s.join(", ")}`})}push(e){this.lineStream.push(e)}end(){this.lineStream.push(`
`),this.manifest.dateRanges.length&&this.lastProgramDateTime===null&&this.trigger("warn",{message:"A playlist with EXT-X-DATERANGE tag must contain atleast one EXT-X-PROGRAM-DATE-TIME tag"}),this.lastProgramDateTime=null,this.trigger("end")}addParser(e){this.parseStream.addParser(e)}addTagMapper(e){this.parseStream.addTagMapper(e)}}var R={mp4:/^(av0?1|avc0?[1234]|vp0?9|flac|opus|mp3|mp4a|mp4v|stpp.ttml.im1t)/,webm:/^(vp0?[89]|av0?1|opus|vorbis)/,ogg:/^(vp0?[89]|theora|flac|opus|vorbis)/,video:/^(av0?1|avc0?[1234]|vp0?[89]|hvc1|hev1|theora|mp4v)/,audio:/^(mp4a|flac|vorbis|opus|ac-[34]|ec-3|alac|mp3|speex|aac)/,text:/^(stpp.ttml.im1t)/,muxerVideo:/^(avc0?1)/,muxerAudio:/^(mp4a)/,muxerText:/a^/},ie=["video","audio","text"],ue=["Video","Audio","Text"],ce=function(e){return e&&e.replace(/avc1\.(\d+)\.(\d+)/i,function(t,i,s){var r=("00"+Number(i).toString(16)).slice(-2),a=("00"+Number(s).toString(16)).slice(-2);return"avc1."+r+"00"+a})},oe=function(e){return e.map(ce)},pe=function(e){return e.replace(/avc1\.(\d+)\.(\d+)/i,function(t){return oe([t])[0]})},W=function(e){e===void 0&&(e="");var t=e.split(","),i=[];return t.forEach(function(s){s=s.trim();var r;ie.forEach(function(a){var l=R[a].exec(s.toLowerCase());if(!(!l||l.length<=1)){r=a;var h=s.substring(0,l[1].length),p=s.replace(h,"");i.push({type:h,details:p,mediaType:a})}}),r||i.push({type:s,details:"",mediaType:"unknown"})}),i},ee=function(e,t){if(!e.mediaGroups.AUDIO||!t)return null;var i=e.mediaGroups.AUDIO[t];if(!i)return null;for(var s in i){var r=i[s];if(r.default&&r.playlists)return W(r.playlists[0].attributes.CODECS)}return null},te=function(e){return e===void 0&&(e=""),R.video.test(e.trim().toLowerCase())},se=function(e){return e===void 0&&(e=""),R.audio.test(e.trim().toLowerCase())},Ee=function(e){return e===void 0&&(e=""),R.text.test(e.trim().toLowerCase())},Fe=function(e){if(!(!e||typeof e!="string")){var t=e.toLowerCase().split(",").map(function(r){return ce(r.trim())}),i="video";t.length===1&&se(t[0])?i="audio":t.length===1&&Ee(t[0])&&(i="application");var s="mp4";return t.every(function(r){return R.mp4.test(r)})?s="mp4":t.every(function(r){return R.webm.test(r)})?s="webm":t.every(function(r){return R.ogg.test(r)})&&(s="ogg"),i+"/"+s+';codecs="'+e+'"'}},qe=function(e,t){return e===void 0&&(e=""),t===void 0&&(t=!1),A().MediaSource&&A().MediaSource.isTypeSupported&&A().MediaSource.isTypeSupported(Fe(e))||t&&A().ManagedMediaSource&&A().ManagedMediaSource.isTypeSupported&&A().ManagedMediaSource.isTypeSupported(Fe(e))||!1},xe=function(e){return e===void 0&&(e=""),e.toLowerCase().split(",").every(function(t){t=t.trim();for(var i=0;i<ue.length;i++){var s=ue[i];if(R["muxer"+s].test(t))return!0}return!1})},je="mp4a.40.2",_t="avc1.4d400d",Dt=/^(audio|video|application)\/(x-|vnd\.apple\.)?mpegurl/i,mt=/^application\/dash\+xml/i,Tt=function(e){return Dt.test(e)?"hls":mt.test(e)?"dash":e==="application/vnd.videojs.vhs+json"?"vhs-json":null},$t=function(e,t){for(var i="";t--;)i+=e;return i},_i=function(e){return e.toString(2).length},Dn=function(e){return Math.ceil(_i(e)/8)},$e=function(e,t,i){return i===void 0&&(i=" "),($t(i,t)+e.toString()).slice(-t)},Et=function(e){return ArrayBuffer.isView==="function"?ArrayBuffer.isView(e):e&&e.buffer instanceof ArrayBuffer},ci=function(e){return Et(e)},fe=function(e){return e instanceof Uint8Array?e:(!Array.isArray(e)&&!ci(e)&&!(e instanceof ArrayBuffer)&&(typeof e!="number"||typeof e=="number"&&e!==e?e=0:e=[e]),new Uint8Array(e&&e.buffer||e,e&&e.byteOffset||0,e&&e.byteLength||0))},ds=function(e){e=fe(e);for(var t="",i=0;i<e.length;i++)t+=$e(e[i].toString(16),2,"0");return t},hs=function(e){e=fe(e);for(var t="",i=0;i<e.length;i++)t+=$e(e[i].toString(2),8,"0");return t},st=A().BigInt||Number,Ii=[st("0x1"),st("0x100"),st("0x10000"),st("0x1000000"),st("0x100000000"),st("0x10000000000"),st("0x1000000000000"),st("0x100000000000000"),st("0x10000000000000000")],tt=function(){var n=new Uint16Array([65484]),e=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);return e[0]===255?"big":e[0]===204?"little":"unknown"}(),Lt=tt==="big",ei=tt==="little",ti=function(e,t){var i=t===void 0?{}:t,s=i.signed,r=s===void 0?!1:s,a=i.le,l=a===void 0?!1:a;e=fe(e);var h=l?"reduce":"reduceRight",p=e[h]?e[h]:Array.prototype[h],g=p.call(e,function(w,D,P){var E=l?P:Math.abs(P+1-e.length);return w+st(D)*Ii[E]},st(0));if(r){var y=Ii[e.length]/st(2)-st(1);g=st(g),g>y&&(g-=y,g-=y,g-=st(2))}return Number(g)},fs=function(e,t){var i=t===void 0?{}:t,s=i.le,r=s===void 0?!1:s;(typeof e!="bigint"&&typeof e!="number"||typeof e=="number"&&e!==e)&&(e=0),e=st(e);for(var a=Dn(e),l=new Uint8Array(new ArrayBuffer(a)),h=0;h<a;h++){var p=r?h:Math.abs(h+1-l.length);l[p]=Number(e/Ii[h]&st(255)),e<0&&(l[p]=Math.abs(~l[p]),l[p]-=h===0?1:2)}return l},ur=function(e){if(!e)return"";e=Array.prototype.slice.call(e);var t=String.fromCharCode.apply(null,fe(e));try{return decodeURIComponent(escape(t))}catch(i){}return t},ps=function(e,t){if(typeof e!="string"&&e&&typeof e.toString=="function"&&(e=e.toString()),typeof e!="string")return new Uint8Array;t||(e=unescape(encodeURIComponent(e)));for(var i=new Uint8Array(e.length),s=0;s<e.length;s++)i[s]=e.charCodeAt(s);return i},Ra=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];if(t=t.filter(function(l){return l&&(l.byteLength||l.length)&&typeof l!="string"}),t.length<=1)return fe(t[0]);var s=t.reduce(function(l,h,p){return l+(h.byteLength||h.length)},0),r=new Uint8Array(s),a=0;return t.forEach(function(l){l=fe(l),r.set(l,a),a+=l.byteLength}),r},it=function(e,t,i){var s=i===void 0?{}:i,r=s.offset,a=r===void 0?0:r,l=s.mask,h=l===void 0?[]:l;e=fe(e),t=fe(t);var p=t.every?t.every:Array.prototype.every;return t.length&&e.length-a>=t.length&&p.call(t,function(g,y){var w=h[y]?h[y]&e[a+y]:e[a+y];return g===w})},Ma=function(e,t,i){return Uint8Array.prototype.slice?Uint8Array.prototype.slice.call(e,t,i):new Uint8Array(Array.prototype.slice.call(e,t,i))},ms=function(e){return e.reverse?e.reverse():Array.prototype.reverse.call(e)},Na=function(e,t,i){t.forEach(function(s){for(var r in e.mediaGroups[s])for(var a in e.mediaGroups[s][r]){var l=e.mediaGroups[s][r][a];i(l,s,r,a)}})},Pi=G(28978);/*! @name mpd-parser @version 1.3.1 @license Apache-2.0 */var gs="1.3.1";const $i=n=>!!n&&typeof n=="object",gt=(...n)=>n.reduce((e,t)=>(typeof t!="object"||Object.keys(t).forEach(i=>{Array.isArray(e[i])&&Array.isArray(t[i])?e[i]=e[i].concat(t[i]):$i(e[i])&&$i(t[i])?e[i]=gt(e[i],t[i]):e[i]=t[i]}),e),{}),kn=n=>Object.keys(n).map(e=>n[e]),vs=(n,e)=>{const t=[];for(let i=n;i<e;i++)t.push(i);return t},di=n=>n.reduce((e,t)=>e.concat(t),[]),As=n=>{if(!n.length)return[];const e=[];for(let t=0;t<n.length;t++)e.push(n[t]);return e},cr=(n,e)=>n.reduce((t,i,s)=>(i[e]&&t.push(s),t),[]),ys=(n,e)=>kn(n.reduce((t,i)=>(i.forEach(s=>{t[e(s)]=s}),t),{}));var hi={INVALID_NUMBER_OF_PERIOD:"INVALID_NUMBER_OF_PERIOD",INVALID_NUMBER_OF_CONTENT_STEERING:"INVALID_NUMBER_OF_CONTENT_STEERING",DASH_EMPTY_MANIFEST:"DASH_EMPTY_MANIFEST",DASH_INVALID_XML:"DASH_INVALID_XML",NO_BASE_URL:"NO_BASE_URL",MISSING_SEGMENT_INFORMATION:"MISSING_SEGMENT_INFORMATION",SEGMENT_TIME_UNSPECIFIED:"SEGMENT_TIME_UNSPECIFIED",UNSUPPORTED_UTC_TIMING_SCHEME:"UNSUPPORTED_UTC_TIMING_SCHEME"};const Oi=({baseUrl:n="",source:e="",range:t="",indexRange:i=""})=>{const s={uri:e,resolvedUri:Pe(n||"",e)};if(t||i){const a=(t||i).split("-");let l=A().BigInt?A().BigInt(a[0]):parseInt(a[0],10),h=A().BigInt?A().BigInt(a[1]):parseInt(a[1],10);l<Number.MAX_SAFE_INTEGER&&typeof l=="bigint"&&(l=Number(l)),h<Number.MAX_SAFE_INTEGER&&typeof h=="bigint"&&(h=Number(h));let p;typeof h=="bigint"||typeof l=="bigint"?p=A().BigInt(h)-A().BigInt(l)+A().BigInt(1):p=h-l+1,typeof p=="bigint"&&p<Number.MAX_SAFE_INTEGER&&(p=Number(p)),s.byterange={length:p,offset:l}}return s},dr=n=>{let e;return typeof n.offset=="bigint"||typeof n.length=="bigint"?e=A().BigInt(n.offset)+A().BigInt(n.length)-A().BigInt(1):e=n.offset+n.length-1,`${n.offset}-${e}`},_s=n=>(n&&typeof n!="number"&&(n=parseInt(n,10)),isNaN(n)?null:n),hr={static(n){const{duration:e,timescale:t=1,sourceDuration:i,periodDuration:s}=n,r=_s(n.endNumber),a=e/t;return typeof r=="number"?{start:0,end:r}:typeof s=="number"?{start:0,end:s/a}:{start:0,end:i/a}},dynamic(n){const{NOW:e,clientOffset:t,availabilityStartTime:i,timescale:s=1,duration:r,periodStart:a=0,minimumUpdatePeriod:l=0,timeShiftBufferDepth:h=1/0}=n,p=_s(n.endNumber),g=(e+t)/1e3,y=i+a,D=g+l-y,P=Math.ceil(D*s/r),E=Math.floor((g-y-h)*s/r),H=Math.floor((g-y)*s/r);return{start:Math.max(0,E),end:typeof p=="number"?p:Math.min(P,H)}}},bs=n=>e=>{const{duration:t,timescale:i=1,periodStart:s,startNumber:r=1}=n;return{number:r+e,duration:t/i,timeline:s,time:e*t}},bi=n=>{const{type:e,duration:t,timescale:i=1,periodDuration:s,sourceDuration:r}=n,{start:a,end:l}=hr[e](n),h=vs(a,l).map(bs(n));if(e==="static"){const p=h.length-1,g=typeof s=="number"?s:r;h[p].duration=g-t/i*p}return h},Es=n=>{const{baseUrl:e,initialization:t={},sourceDuration:i,indexRange:s="",periodStart:r,presentationTime:a,number:l=0,duration:h}=n;if(!e)throw new Error(hi.NO_BASE_URL);const p=Oi({baseUrl:e,source:t.sourceURL,range:t.range}),g=Oi({baseUrl:e,source:e,indexRange:s});if(g.map=p,h){const y=bi(n);y.length&&(g.duration=y[0].duration,g.timeline=y[0].timeline)}else i&&(g.duration=i,g.timeline=r);return g.presentationTime=a||r,g.number=l,[g]},un=(n,e,t)=>{const i=n.sidx.map?n.sidx.map:null,s=n.sidx.duration,r=n.timeline||0,a=n.sidx.byterange,l=a.offset+a.length,h=e.timescale,p=e.references.filter(H=>H.referenceType!==1),g=[],y=n.endList?"static":"dynamic",w=n.sidx.timeline;let D=w,P=n.mediaSequence||0,E;typeof e.firstOffset=="bigint"?E=A().BigInt(l)+e.firstOffset:E=l+e.firstOffset;for(let H=0;H<p.length;H++){const V=e.references[H],U=V.referencedSize,M=V.subsegmentDuration;let Y;typeof E=="bigint"?Y=E+A().BigInt(U)-A().BigInt(1):Y=E+U-1;const O=`${E}-${Y}`,Ae=Es({baseUrl:t,timescale:h,timeline:r,periodStart:w,presentationTime:D,number:P,duration:M,sourceDuration:s,indexRange:O,type:y})[0];i&&(Ae.map=i),g.push(Ae),typeof E=="bigint"?E+=A().BigInt(U):E+=U,D+=M/h,P++}return n.segments=g,n},fr=["AUDIO","SUBTITLES"],Ll=1/60,v=n=>ys(n,({timeline:e})=>e).sort((e,t)=>e.timeline>t.timeline?1:-1),b=(n,e)=>{for(let t=0;t<n.length;t++)if(n[t].attributes.NAME===e)return n[t];return null},B=n=>{let e=[];return Na(n,fr,(t,i,s,r)=>{e=e.concat(t.playlists||[])}),e},F=({playlist:n,mediaSequence:e})=>{n.mediaSequence=e,n.segments.forEach((t,i)=>{t.number=n.mediaSequence+i})},ae=({oldPlaylists:n,newPlaylists:e,timelineStarts:t})=>{e.forEach(i=>{i.discontinuitySequence=t.findIndex(function({timeline:h}){return h===i.timeline});const s=b(n,i.attributes.NAME);if(!s||i.sidx)return;const r=i.segments[0],a=s.segments.findIndex(function(h){return Math.abs(h.presentationTime-r.presentationTime)<Ll});if(a===-1){F({playlist:i,mediaSequence:s.mediaSequence+s.segments.length}),i.segments[0].discontinuity=!0,i.discontinuityStarts.unshift(0),(!s.segments.length&&i.timeline>s.timeline||s.segments.length&&i.timeline>s.segments[s.segments.length-1].timeline)&&i.discontinuitySequence--;return}s.segments[a].discontinuity&&!r.discontinuity&&(r.discontinuity=!0,i.discontinuityStarts.unshift(0),i.discontinuitySequence--),F({playlist:i,mediaSequence:s.segments[a].number})})},Re=({oldManifest:n,newManifest:e})=>{const t=n.playlists.concat(B(n)),i=e.playlists.concat(B(e));return e.timelineStarts=v([n.timelineStarts,e.timelineStarts]),ae({oldPlaylists:t,newPlaylists:i,timelineStarts:e.timelineStarts}),e},Ge=n=>n&&n.uri+"-"+dr(n.byterange),Ct=n=>{const e=n.reduce(function(i,s){return i[s.attributes.baseUrl]||(i[s.attributes.baseUrl]=[]),i[s.attributes.baseUrl].push(s),i},{});let t=[];return Object.values(e).forEach(i=>{const s=kn(i.reduce((r,a)=>{const l=a.attributes.id+(a.attributes.lang||"");return r[l]?(a.segments&&(a.segments[0]&&(a.segments[0].discontinuity=!0),r[l].segments.push(...a.segments)),a.attributes.contentProtection&&(r[l].attributes.contentProtection=a.attributes.contentProtection)):(r[l]=a,r[l].attributes.timelineStarts=[]),r[l].attributes.timelineStarts.push({start:a.attributes.periodStart,timeline:a.attributes.periodStart}),r},{}));t=t.concat(s)}),t.map(i=>(i.discontinuityStarts=cr(i.segments||[],"discontinuity"),i))},Gt=(n,e)=>{const t=Ge(n.sidx),i=t&&e[t]&&e[t].sidx;return i&&un(n,i,n.sidx.resolvedUri),n},Yt=(n,e={})=>{if(!Object.keys(e).length)return n;for(const t in n)n[t]=Gt(n[t],e);return n},fi=({attributes:n,segments:e,sidx:t,mediaSequence:i,discontinuitySequence:s,discontinuityStarts:r},a)=>{const l={attributes:{NAME:n.id,BANDWIDTH:n.bandwidth,CODECS:n.codecs,"PROGRAM-ID":1},uri:"",endList:n.type==="static",timeline:n.periodStart,resolvedUri:n.baseUrl||"",targetDuration:n.duration,discontinuitySequence:s,discontinuityStarts:r,timelineStarts:n.timelineStarts,mediaSequence:i,segments:e};return n.contentProtection&&(l.contentProtection=n.contentProtection),n.serviceLocation&&(l.attributes.serviceLocation=n.serviceLocation),t&&(l.sidx=t),a&&(l.attributes.AUDIO="audio",l.attributes.SUBTITLES="subs"),l},Li=({attributes:n,segments:e,mediaSequence:t,discontinuityStarts:i,discontinuitySequence:s})=>{typeof e=="undefined"&&(e=[{uri:n.baseUrl,timeline:n.periodStart,resolvedUri:n.baseUrl||"",duration:n.sourceDuration,number:0}],n.duration=n.sourceDuration);const r={NAME:n.id,BANDWIDTH:n.bandwidth,"PROGRAM-ID":1};n.codecs&&(r.CODECS=n.codecs);const a={attributes:r,uri:"",endList:n.type==="static",timeline:n.periodStart,resolvedUri:n.baseUrl||"",targetDuration:n.duration,timelineStarts:n.timelineStarts,discontinuityStarts:i,discontinuitySequence:s,mediaSequence:t,segments:e};return n.serviceLocation&&(a.attributes.serviceLocation=n.serviceLocation),a},Ri=(n,e={},t=!1)=>{let i;const s=n.reduce((r,a)=>{const l=a.attributes.role&&a.attributes.role.value||"",h=a.attributes.lang||"";let p=a.attributes.label||"main";if(h&&!a.attributes.label){const y=l?` (${l})`:"";p=`${a.attributes.lang}${y}`}r[p]||(r[p]={language:h,autoselect:!0,default:l==="main",playlists:[],uri:""});const g=Gt(fi(a,t),e);return r[p].playlists.push(g),typeof i=="undefined"&&l==="main"&&(i=a,i.default=!0),r},{});if(!i){const r=Object.keys(s)[0];s[r].default=!0}return s},Mi=(n,e={})=>n.reduce((t,i)=>{const s=i.attributes.label||i.attributes.lang||"text",r=i.attributes.lang||"und";return t[s]||(t[s]={language:r,default:!1,autoselect:!1,playlists:[],uri:""}),t[s].playlists.push(Gt(Li(i),e)),t},{}),ii=n=>n.reduce((e,t)=>(t&&t.forEach(i=>{const{channel:s,language:r}=i;e[r]={autoselect:!1,default:!1,instreamId:s,language:r},i.hasOwnProperty("aspectRatio")&&(e[r].aspectRatio=i.aspectRatio),i.hasOwnProperty("easyReader")&&(e[r].easyReader=i.easyReader),i.hasOwnProperty("3D")&&(e[r]["3D"]=i["3D"])}),e),{}),Ni=({attributes:n,segments:e,sidx:t,discontinuityStarts:i})=>{const s={attributes:{NAME:n.id,AUDIO:"audio",SUBTITLES:"subs",RESOLUTION:{width:n.width,height:n.height},CODECS:n.codecs,BANDWIDTH:n.bandwidth,"PROGRAM-ID":1},uri:"",endList:n.type==="static",timeline:n.periodStart,resolvedUri:n.baseUrl||"",targetDuration:n.duration,discontinuityStarts:i,timelineStarts:n.timelineStarts,segments:e};return n.frameRate&&(s.attributes["FRAME-RATE"]=n.frameRate),n.contentProtection&&(s.contentProtection=n.contentProtection),n.serviceLocation&&(s.attributes.serviceLocation=n.serviceLocation),t&&(s.sidx=t),s},cn=({attributes:n})=>n.mimeType==="video/mp4"||n.mimeType==="video/webm"||n.contentType==="video",xt=({attributes:n})=>n.mimeType==="audio/mp4"||n.mimeType==="audio/webm"||n.contentType==="audio",pr=({attributes:n})=>n.mimeType==="text/vtt"||n.contentType==="text",Gi=(n,e)=>{n.forEach(t=>{t.mediaSequence=0,t.discontinuitySequence=e.findIndex(function({timeline:i}){return i===t.timeline}),t.segments&&t.segments.forEach((i,s)=>{i.number=s})})},Ts=n=>n?Object.keys(n).reduce((e,t)=>{const i=n[t];return e.concat(i.playlists)},[]):[],Jh=({dashPlaylists:n,locations:e,contentSteering:t,sidxMapping:i={},previousManifest:s,eventStream:r})=>{if(!n.length)return{};const{sourceDuration:a,type:l,suggestedPresentationDelay:h,minimumUpdatePeriod:p}=n[0].attributes,g=Ct(n.filter(cn)).map(Ni),y=Ct(n.filter(xt)),w=Ct(n.filter(pr)),D=n.map(Y=>Y.attributes.captionServices).filter(Boolean),P={allowCache:!0,discontinuityStarts:[],segments:[],endList:!0,mediaGroups:{AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},uri:"",duration:a,playlists:Yt(g,i)};p>=0&&(P.minimumUpdatePeriod=p*1e3),e&&(P.locations=e),t&&(P.contentSteering=t),l==="dynamic"&&(P.suggestedPresentationDelay=h),r&&r.length>0&&(P.eventStream=r);const E=P.playlists.length===0,H=y.length?Ri(y,i,E):null,V=w.length?Mi(w,i):null,U=g.concat(Ts(H),Ts(V)),M=U.map(({timelineStarts:Y})=>Y);return P.timelineStarts=v(M),Gi(U,P.timelineStarts),H&&(P.mediaGroups.AUDIO.audio=H),V&&(P.mediaGroups.SUBTITLES.subs=V),D.length&&(P.mediaGroups["CLOSED-CAPTIONS"].cc=ii(D)),s?Re({oldManifest:s,newManifest:P}):P},Zh=(n,e,t)=>{const{NOW:i,clientOffset:s,availabilityStartTime:r,timescale:a=1,periodStart:l=0,minimumUpdatePeriod:h=0}=n,p=(i+s)/1e3,g=r+l,w=p+h-g;return Math.ceil((w*a-e)/t)},Rl=(n,e)=>{const{type:t,minimumUpdatePeriod:i=0,media:s="",sourceDuration:r,timescale:a=1,startNumber:l=1,periodStart:h}=n,p=[];let g=-1;for(let y=0;y<e.length;y++){const w=e[y],D=w.d,P=w.r||0,E=w.t||0;g<0&&(g=E),E&&E>g&&(g=E);let H;if(P<0){const M=y+1;M===e.length?t==="dynamic"&&i>0&&s.indexOf("$Number$")>0?H=Zh(n,g,D):H=(r*a-g)/D:H=(e[M].t-g)/D}else H=P+1;const V=l+p.length+H;let U=l+p.length;for(;U<V;)p.push({number:U,duration:D/a,time:g,timeline:h}),g+=D,U++}return p},ef=/\$([A-z]*)(?:(%0)([0-9]+)d)?\$/g,tf=n=>(e,t,i,s)=>{if(e==="$$")return"$";if(typeof n[t]=="undefined")return e;const r=""+n[t];return t==="RepresentationID"||(i?s=parseInt(s,10):s=1,r.length>=s)?r:`${new Array(s-r.length+1).join("0")}${r}`},Ml=(n,e)=>n.replace(ef,tf(e)),nf=(n,e)=>!n.duration&&!e?[{number:n.startNumber||1,duration:n.sourceDuration,time:0,timeline:n.periodStart}]:n.duration?bi(n):Rl(n,e),sf=(n,e)=>{const t={RepresentationID:n.id,Bandwidth:n.bandwidth||0},{initialization:i={sourceURL:"",range:""}}=n,s=Oi({baseUrl:n.baseUrl,source:Ml(i.sourceURL,t),range:i.range});return nf(n,e).map(a=>{t.Number=a.number,t.Time=a.time;const l=Ml(n.media||"",t),h=n.timescale||1,p=n.presentationTimeOffset||0,g=n.periodStart+(a.time-p)/h;return{uri:l,timeline:a.timeline,duration:a.duration,resolvedUri:Pe(n.baseUrl||"",l),map:s,number:a.number,presentationTime:g}})},rf=(n,e)=>{const{baseUrl:t,initialization:i={}}=n,s=Oi({baseUrl:t,source:i.sourceURL,range:i.range}),r=Oi({baseUrl:t,source:e.media,range:e.mediaRange});return r.map=s,r},af=(n,e)=>{const{duration:t,segmentUrls:i=[],periodStart:s}=n;if(!t&&!e||t&&e)throw new Error(hi.SEGMENT_TIME_UNSPECIFIED);const r=i.map(h=>rf(n,h));let a;return t&&(a=bi(n)),e&&(a=Rl(n,e)),a.map((h,p)=>{if(r[p]){const g=r[p],y=n.timescale||1,w=n.presentationTimeOffset||0;return g.timeline=h.timeline,g.duration=h.duration,g.number=h.number,g.presentationTime=s+(h.time-w)/y,g}}).filter(h=>h)},of=({attributes:n,segmentInfo:e})=>{let t,i;e.template?(i=sf,t=gt(n,e.template)):e.base?(i=Es,t=gt(n,e.base)):e.list&&(i=af,t=gt(n,e.list));const s={attributes:n};if(!i)return s;const r=i(t,e.segmentTimeline);if(t.duration){const{duration:a,timescale:l=1}=t;t.duration=a/l}else r.length?t.duration=r.reduce((a,l)=>Math.max(a,Math.ceil(l.duration)),0):t.duration=0;return s.attributes=t,s.segments=r,e.base&&t.indexRange&&(s.sidx=r[0],s.segments=[]),s},lf=n=>n.map(of),ut=(n,e)=>As(n.childNodes).filter(({tagName:t})=>t===e),Cs=n=>n.textContent.trim(),uf=n=>parseFloat(n.split("/").reduce((e,t)=>e/t)),In=n=>{const l=/P(?:(\d*)Y)?(?:(\d*)M)?(?:(\d*)D)?(?:T(?:(\d*)H)?(?:(\d*)M)?(?:([\d.]*)S)?)?/.exec(n);if(!l)return 0;const[h,p,g,y,w,D]=l.slice(1);return parseFloat(h||0)*31536e3+parseFloat(p||0)*2592e3+parseFloat(g||0)*86400+parseFloat(y||0)*3600+parseFloat(w||0)*60+parseFloat(D||0)},cf=n=>(/^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/.test(n)&&(n+="Z"),Date.parse(n)),Nl={mediaPresentationDuration(n){return In(n)},availabilityStartTime(n){return cf(n)/1e3},minimumUpdatePeriod(n){return In(n)},suggestedPresentationDelay(n){return In(n)},type(n){return n},timeShiftBufferDepth(n){return In(n)},start(n){return In(n)},width(n){return parseInt(n,10)},height(n){return parseInt(n,10)},bandwidth(n){return parseInt(n,10)},frameRate(n){return uf(n)},startNumber(n){return parseInt(n,10)},timescale(n){return parseInt(n,10)},presentationTimeOffset(n){return parseInt(n,10)},duration(n){const e=parseInt(n,10);return isNaN(e)?In(n):e},d(n){return parseInt(n,10)},t(n){return parseInt(n,10)},r(n){return parseInt(n,10)},presentationTime(n){return parseInt(n,10)},DEFAULT(n){return n}},bt=n=>n&&n.attributes?As(n.attributes).reduce((e,t)=>{const i=Nl[t.name]||Nl.DEFAULT;return e[t.name]=i(t.value),e},{}):{},df={"urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b":"org.w3.clearkey","urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed":"com.widevine.alpha","urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95":"com.microsoft.playready","urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb":"com.adobe.primetime","urn:mpeg:dash:mp4protection:2011":"mp4protection"},mr=(n,e)=>e.length?di(n.map(function(t){return e.map(function(i){const s=Cs(i),r=Pe(t.baseUrl,s),a=gt(bt(i),{baseUrl:r});return r!==s&&!a.serviceLocation&&t.serviceLocation&&(a.serviceLocation=t.serviceLocation),a})})):n,Ua=n=>{const e=ut(n,"SegmentTemplate")[0],t=ut(n,"SegmentList")[0],i=t&&ut(t,"SegmentURL").map(y=>gt({tag:"SegmentURL"},bt(y))),s=ut(n,"SegmentBase")[0],r=t||e,a=r&&ut(r,"SegmentTimeline")[0],l=t||s||e,h=l&&ut(l,"Initialization")[0],p=e&&bt(e);p&&h?p.initialization=h&&bt(h):p&&p.initialization&&(p.initialization={sourceURL:p.initialization});const g={template:p,segmentTimeline:a&&ut(a,"S").map(y=>bt(y)),list:t&&gt(bt(t),{segmentUrls:i,initialization:bt(h)}),base:s&&gt(bt(s),{initialization:bt(h)})};return Object.keys(g).forEach(y=>{g[y]||delete g[y]}),g},hf=(n,e,t)=>i=>{const s=ut(i,"BaseURL"),r=mr(e,s),a=gt(n,bt(i)),l=Ua(i);return r.map(h=>({segmentInfo:gt(t,l),attributes:gt(a,h)}))},ff=n=>n.reduce((e,t)=>{const i=bt(t);i.schemeIdUri&&(i.schemeIdUri=i.schemeIdUri.toLowerCase());const s=df[i.schemeIdUri];if(s){e[s]={attributes:i};const r=ut(t,"cenc:pssh")[0];if(r){const a=Cs(r);e[s].pssh=a&&Se(a)}}return e},{}),pf=n=>{if(n.schemeIdUri==="urn:scte:dash:cc:cea-608:2015")return(typeof n.value!="string"?[]:n.value.split(";")).map(t=>{let i,s;return s=t,/^CC\d=/.test(t)?[i,s]=t.split("="):/^CC\d$/.test(t)&&(i=t),{channel:i,language:s}});if(n.schemeIdUri==="urn:scte:dash:cc:cea-708:2015")return(typeof n.value!="string"?[]:n.value.split(";")).map(t=>{const i={channel:void 0,language:void 0,aspectRatio:1,easyReader:0,"3D":0};if(/=/.test(t)){const[s,r=""]=t.split("=");i.channel=s,i.language=t,r.split(",").forEach(a=>{const[l,h]=a.split(":");l==="lang"?i.language=h:l==="er"?i.easyReader=Number(h):l==="war"?i.aspectRatio=Number(h):l==="3D"&&(i["3D"]=Number(h))})}else i.language=t;return i.channel&&(i.channel="SERVICE"+i.channel),i})},mf=n=>di(ut(n.node,"EventStream").map(e=>{const t=bt(e),i=t.schemeIdUri;return ut(e,"Event").map(s=>{const r=bt(s),a=r.presentationTime||0,l=t.timescale||1,h=r.duration||0,p=a/l+n.attributes.start;return{schemeIdUri:i,value:t.value,id:r.id,start:p,end:p+h/l,messageData:Cs(s)||r.messageData,contentEncoding:t.contentEncoding,presentationTimeOffset:t.presentationTimeOffset||0}})})),gf=(n,e,t)=>i=>{const s=bt(i),r=mr(e,ut(i,"BaseURL")),a=ut(i,"Role")[0],l={role:bt(a)};let h=gt(n,s,l);const p=ut(i,"Accessibility")[0],g=pf(bt(p));g&&(h=gt(h,{captionServices:g}));const y=ut(i,"Label")[0];if(y&&y.childNodes.length){const H=y.childNodes[0].nodeValue.trim();h=gt(h,{label:H})}const w=ff(ut(i,"ContentProtection"));Object.keys(w).length&&(h=gt(h,{contentProtection:w}));const D=Ua(i),P=ut(i,"Representation"),E=gt(t,D);return di(P.map(hf(h,r,E)))},vf=(n,e)=>(t,i)=>{const s=mr(e,ut(t.node,"BaseURL")),r=gt(n,{periodStart:t.attributes.start});typeof t.attributes.duration=="number"&&(r.periodDuration=t.attributes.duration);const a=ut(t.node,"AdaptationSet"),l=Ua(t.node);return di(a.map(gf(r,s,l)))},Af=(n,e)=>{if(n.length>1&&e({type:"warn",message:"The MPD manifest should contain no more than one ContentSteering tag"}),!n.length)return null;const t=gt({serverURL:Cs(n[0])},bt(n[0]));return t.queryBeforeStart=t.queryBeforeStart==="true",t},yf=({attributes:n,priorPeriodAttributes:e,mpdType:t})=>typeof n.start=="number"?n.start:e&&typeof e.start=="number"&&typeof e.duration=="number"?e.start+e.duration:!e&&t==="static"?0:null,_f=(n,e={})=>{const{manifestUri:t="",NOW:i=Date.now(),clientOffset:s=0,eventHandler:r=function(){}}=e,a=ut(n,"Period");if(!a.length)throw new Error(hi.INVALID_NUMBER_OF_PERIOD);const l=ut(n,"Location"),h=bt(n),p=mr([{baseUrl:t}],ut(n,"BaseURL")),g=ut(n,"ContentSteering");h.type=h.type||"static",h.sourceDuration=h.mediaPresentationDuration||0,h.NOW=i,h.clientOffset=s,l.length&&(h.locations=l.map(Cs));const y=[];return a.forEach((w,D)=>{const P=bt(w),E=y[D-1];P.start=yf({attributes:P,priorPeriodAttributes:E?E.attributes:null,mpdType:h.type}),y.push({node:w,attributes:P})}),{locations:h.locations,contentSteeringInfo:Af(g,r),representationInfo:di(y.map(vf(h,p))),eventStream:di(y.map(mf))}},Ul=n=>{if(n==="")throw new Error(hi.DASH_EMPTY_MANIFEST);const e=new Pi.DOMParser;let t,i;try{t=e.parseFromString(n,"application/xml"),i=t&&t.documentElement.tagName==="MPD"?t.documentElement:null}catch(s){}if(!i||i&&i.getElementsByTagName("parsererror").length>0)throw new Error(hi.DASH_INVALID_XML);return i},bf=n=>{const e=ut(n,"UTCTiming")[0];if(!e)return null;const t=bt(e);switch(t.schemeIdUri){case"urn:mpeg:dash:utc:http-head:2014":case"urn:mpeg:dash:utc:http-head:2012":t.method="HEAD";break;case"urn:mpeg:dash:utc:http-xsdate:2014":case"urn:mpeg:dash:utc:http-iso:2014":case"urn:mpeg:dash:utc:http-xsdate:2012":case"urn:mpeg:dash:utc:http-iso:2012":t.method="GET";break;case"urn:mpeg:dash:utc:direct:2014":case"urn:mpeg:dash:utc:direct:2012":t.method="DIRECT",t.value=Date.parse(t.value);break;case"urn:mpeg:dash:utc:http-ntp:2014":case"urn:mpeg:dash:utc:ntp:2014":case"urn:mpeg:dash:utc:sntp:2014":default:throw new Error(hi.UNSUPPORTED_UTC_TIMING_SCHEME)}return t},gy=null,Ef=(n,e={})=>{const t=_f(Ul(n),e),i=lf(t.representationInfo);return Jh({dashPlaylists:i,locations:t.locations,contentSteering:t.contentSteeringInfo,sidxMapping:e.sidxMapping,previousManifest:e.previousManifest,eventStream:t.eventStream})},Tf=n=>bf(Ul(n));var Cf=G(98962),xf=G.n(Cf),Sf=fe([73,68,51]),jf=function(e,t){t===void 0&&(t=0),e=fe(e);var i=e[t+5],s=e[t+6]<<21|e[t+7]<<14|e[t+8]<<7|e[t+9],r=(i&16)>>4;return r?s+20:s+10},xs=function n(e,t){return t===void 0&&(t=0),e=fe(e),e.length-t<10||!it(e,Sf,{offset:t})?t:(t+=jf(e,t),n(e,t))},vy=function(e){var t="",i=e[1]>>>3,s=e[1]&31,r=e[2]>>>7,a=(e[2]&64)>>6,l=(e[2]&32)>>5,h=(e[2]&16)>>4,p=(e[2]&8)>>3,g=(e[2]&4)>>2,y=e[2]&3;t+=i+"."+padStart(s,2,"0"),r===0?t+="M":r===1&&(t+="H");var w;return i===2&&a?w=l?12:10:w=a?10:8,t+="."+padStart(w,2,"0"),t+="."+h,t+="."+p+g+y,t},Ay=function(e){var t=toHexString(e[1]),i=toHexString(e[2]&252),s=toHexString(e[3]);return""+t+i+s},yy=function(e){var t="",i=e[1]>>6,s=e[1]&31,r=(e[1]&32)>>5,a=e.subarray(2,6),l=e.subarray(6,12),h=e[12];i===1?t+="A":i===2?t+="B":i===3&&(t+="C"),t+=s+".";var p=parseInt(toBinaryString(a).split("").reverse().join(""),2);p>255&&(p=parseInt(toBinaryString(a),2)),t+=p.toString(16)+".",r===0?t+="L":t+="H",t+=h;for(var g="",y=0;y<l.length;y++){var w=l[y];w&&(g&&(g+="."),g+=w.toString(16))}return g&&(t+="."+g),t},_y=new Uint8Array([79,112,117,115,72,101,97,100]),by=function(e){var t=new DataView(e.buffer,e.byteOffset,e.byteLength),i=t.getUint8(0),s=i!==0,r={version:i,channels:t.getUint8(1),preSkip:t.getUint16(2,s),sampleRate:t.getUint32(4,s),outputGain:t.getUint16(8,s),channelMappingFamily:t.getUint8(10)};if(r.channelMappingFamily>0&&e.length>10){r.streamCount=t.getUint8(11),r.twoChannelStreamCount=t.getUint8(12),r.channelMapping=[];for(var a=0;a<r.channels;a++)r.channelMapping.push(t.getUint8(13+a))}return r},Ey=function(e){var t=e.channelMappingFamily<=0?11:12+e.channels,i=new DataView(new ArrayBuffer(t)),s=e.version!==0;return i.setUint8(0,e.version),i.setUint8(1,e.channels),i.setUint16(2,e.preSkip,s),i.setUint32(4,e.sampleRate,s),i.setUint16(8,e.outputGain,s),i.setUint8(10,e.channelMappingFamily),e.channelMappingFamily>0&&(i.setUint8(11,e.streamCount),e.channelMapping.foreach(function(r,a){i.setUint8(12+a,r)})),new Uint8Array(i.buffer)},Fa=function(e){return typeof e=="string"?ps(e):e},wf=function(e){return Array.isArray(e)?e.map(function(t){return Fa(t)}):[Fa(e)]},Va,za=function(e){e=fe(e);for(var t=[],i=0;e.length>i;){var s=e[i],r=0,a=0;a++;var l=e[a];for(a++;l&128;)r=(l&127)<<7,l=e[a],a++;r+=l&127;for(var h=0;h<Va.length;h++){var p=Va[h],g=p.id,y=p.parser;if(s===g){t.push(y(e.subarray(a,a+r)));break}}i+=r+a}return t};Va=[{id:3,parser:function(e){var t={tag:3,id:e[0]<<8|e[1],flags:e[2],size:3,dependsOnEsId:0,ocrEsId:0,descriptors:[],url:""};if(t.flags&128&&(t.dependsOnEsId=e[t.size]<<8|e[t.size+1],t.size+=2),t.flags&64){var i=e[t.size];t.url=ur(e.subarray(t.size+1,t.size+1+i)),t.size+=i}return t.flags&32&&(t.ocrEsId=e[t.size]<<8|e[t.size+1],t.size+=2),t.descriptors=za(e.subarray(t.size))||[],t}},{id:4,parser:function(e){var t={tag:4,oti:e[0],streamType:e[1],bufferSize:e[2]<<16|e[3]<<8|e[4],maxBitrate:e[5]<<24|e[6]<<16|e[7]<<8|e[8],avgBitrate:e[9]<<24|e[10]<<16|e[11]<<8|e[12],descriptors:za(e.subarray(13))};return t}},{id:5,parser:function(e){return{tag:5,bytes:e}}},{id:6,parser:function(e){return{tag:6,bytes:e}}}];var Ft=function n(e,t,i){i===void 0&&(i=!1),t=wf(t),e=fe(e);var s=[];if(!t.length)return s;for(var r=0;r<e.length;){var a=(e[r]<<24|e[r+1]<<16|e[r+2]<<8|e[r+3])>>>0,l=e.subarray(r+4,r+8);if(a===0)break;var h=r+a;if(h>e.length){if(i)break;h=e.length}var p=e.subarray(r+8,h);it(l,t[0])&&(t.length===1?s.push(p):s.push.apply(s,n(p,t.slice(1),i))),r=h}return s},Pn=function(e,t){if(t=Fa(t),!t.length)return e.subarray(e.length);for(var i=0;i<e.length;){if(bytesMatch(e.subarray(i,i+t.length),t)){var s=(e[i-4]<<24|e[i-3]<<16|e[i-2]<<8|e[i-1])>>>0,r=s>1?i+s:e.byteLength;return e.subarray(i+4,r)}i++}return e.subarray(e.length)},Ss=function(e,t,i){t===void 0&&(t=4),i===void 0&&(i=function(h){return bytesToNumber(h)});var s=[];if(!e||!e.length)return s;for(var r=bytesToNumber(e.subarray(4,8)),a=8;r;a+=t,r--)s.push(i(e.subarray(a,a+t)));return s},Bf=function(e,t){for(var i=Ss(Ft(e,["stss"])[0]),s=Ss(Ft(e,["stco"])[0]),r=Ss(Ft(e,["stts"])[0],8,function(We){return{sampleCount:bytesToNumber(We.subarray(0,4)),sampleDelta:bytesToNumber(We.subarray(4,8))}}),a=Ss(Ft(e,["stsc"])[0],12,function(We){return{firstChunk:bytesToNumber(We.subarray(0,4)),samplesPerChunk:bytesToNumber(We.subarray(4,8)),sampleDescriptionIndex:bytesToNumber(We.subarray(8,12))}}),l=Ft(e,["stsz"])[0],h=Ss(l&&l.length&&l.subarray(4)||null),p=[],g=0;g<s.length;g++){for(var y=void 0,w=0;w<a.length;w++){var D=a[w],P=g+1>=D.firstChunk&&(w+1>=a.length||g+1<a[w+1].firstChunk);if(P){y=D.samplesPerChunk;break}}for(var E=s[g],H=0;H<y;H++){var V=h[p.length],U=!i.length;i.length&&i.indexOf(p.length+1)!==-1&&(U=!0);for(var M={keyframe:U,start:E,end:E+V},Y=0;Y<r.length;Y++){var O=r[Y],Q=O.sampleCount,Ae=O.sampleDelta;if(p.length<=Q){var be=p.length?p[p.length-1].timestamp:0;M.timestamp=be+Ae/t*1e3,M.duration=Ae;break}}p.push(M),E+=V}}return p},Df=function(e,t){var i=bytesToString(t.subarray(0,4));if(e.type==="video"?(e.info=e.info||{},e.info.width=t[28]<<8|t[29],e.info.height=t[30]<<8|t[31]):e.type==="audio"&&(e.info=e.info||{},e.info.channels=t[20]<<8|t[21],e.info.bitDepth=t[22]<<8|t[23],e.info.sampleRate=t[28]<<8|t[29]),i==="avc1"){var s=Pn(t,"avcC");i+="."+getAvcCodec(s),e.info.avcC=s}else if(i==="hvc1"||i==="hev1")i+="."+getHvcCodec(Pn(t,"hvcC"));else if(i==="mp4a"||i==="mp4v"){var r=Pn(t,"esds"),a=za(r.subarray(4))[0],l=a&&a.descriptors.filter(function(U){var M=U.tag;return M===4})[0];l?(i+="."+toHexString(l.oti),l.oti===64?i+="."+(l.descriptors[0].bytes[0]>>3).toString():l.oti===32?i+="."+l.descriptors[0].bytes[4].toString():l.oti===221&&(i="vorbis")):e.type==="audio"?i+=".40.2":i+=".20.9"}else if(i==="av01")i+="."+getAv1Codec(Pn(t,"av1C"));else if(i==="vp09"){var h=Pn(t,"vpcC"),p=h[0],g=h[1],y=h[2]>>4,w=(h[2]&15)>>1,D=(h[2]&15)>>3,P=h[3],E=h[4],H=h[5];i+="."+padStart(p,2,"0"),i+="."+padStart(g,2,"0"),i+="."+padStart(y,2,"0"),i+="."+padStart(w,2,"0"),i+="."+padStart(P,2,"0"),i+="."+padStart(E,2,"0"),i+="."+padStart(H,2,"0"),i+="."+padStart(D,2,"0")}else if(i==="theo")i="theora";else if(i==="spex")i="speex";else if(i===".mp3")i="mp4a.40.34";else if(i==="msVo")i="vorbis";else if(i==="Opus"){i="opus";var V=Pn(t,"dOps");e.info.opus=parseOpusHead(V),e.info.codecDelay=65e5}else i=i.toLowerCase();e.codec=i},Ty=function(e,t){t===void 0&&(t=!0),e=toUint8(e);var i=Ft(e,["moov","trak"],!0),s=[];return i.forEach(function(r){var a={bytes:r},l=Ft(r,["mdia"])[0],h=Ft(l,["hdlr"])[0],p=bytesToString(h.subarray(8,12));p==="soun"?a.type="audio":p==="vide"?a.type="video":a.type=p;var g=Ft(r,["tkhd"])[0];if(g){var y=new DataView(g.buffer,g.byteOffset,g.byteLength),w=y.getUint8(0);a.number=w===0?y.getUint32(12):y.getUint32(20)}var D=Ft(l,["mdhd"])[0];if(D){var P=D[0],E=P===0?12:20;a.timescale=(D[E]<<24|D[E+1]<<16|D[E+2]<<8|D[E+3])>>>0}for(var H=Ft(l,["minf","stbl"])[0],V=Ft(H,["stsd"])[0],U=bytesToNumber(V.subarray(4,8)),M=8;U--;){var Y=bytesToNumber(V.subarray(M,M+4)),O=V.subarray(M+4,M+4+Y);Df(a,O),M+=4+Y}t&&(a.frameTable=Bf(H,a.timescale)),s.push(a)}),s},Cy=function(e){var t=Ft(e,["moov","mvhd"],!0)[0];if(!(!t||!t.length)){var i={};return t[0]===1?(i.timestampScale=bytesToNumber(t.subarray(20,24)),i.duration=bytesToNumber(t.subarray(24,32))):(i.timestampScale=bytesToNumber(t.subarray(12,16)),i.duration=bytesToNumber(t.subarray(16,20))),i.bytes=t,i}},rt={EBML:fe([26,69,223,163]),DocType:fe([66,130]),Segment:fe([24,83,128,103]),SegmentInfo:fe([21,73,169,102]),Tracks:fe([22,84,174,107]),Track:fe([174]),TrackNumber:fe([215]),DefaultDuration:fe([35,227,131]),TrackEntry:fe([174]),TrackType:fe([131]),FlagDefault:fe([136]),CodecID:fe([134]),CodecPrivate:fe([99,162]),VideoTrack:fe([224]),AudioTrack:fe([225]),Cluster:fe([31,67,182,117]),Timestamp:fe([231]),TimestampScale:fe([42,215,177]),BlockGroup:fe([160]),BlockDuration:fe([155]),Block:fe([161]),SimpleBlock:fe([163])},Ha=[128,64,32,16,8,4,2,1],kf=function(e){for(var t=1,i=0;i<Ha.length&&!(e&Ha[i]);i++)t++;return t},dn=function(e,t,i,s){i===void 0&&(i=!0),s===void 0&&(s=!1);var r=kf(e[t]),a=e.subarray(t,t+r);return i&&(a=Array.prototype.slice.call(e,t,t+r),a[0]^=Ha[r-1]),{length:r,value:ti(a,{signed:s}),bytes:a}},Fl=function n(e){return typeof e=="string"?e.match(/.{1,2}/g).map(function(t){return n(t)}):typeof e=="number"?fs(e):e},If=function(e){return Array.isArray(e)?e.map(function(t){return Fl(t)}):[Fl(e)]},Pf=function n(e,t,i){if(i>=t.length)return t.length;var s=dn(t,i,!1);if(it(e.bytes,s.bytes))return i;var r=dn(t,i+s.length);return n(e,t,i+r.length+r.value+s.length)},ht=function n(e,t){t=If(t),e=fe(e);var i=[];if(!t.length)return i;for(var s=0;s<e.length;){var r=dn(e,s,!1),a=dn(e,s+r.length),l=s+r.length+a.length;a.value===127&&(a.value=Pf(r,e,l),a.value!==e.length&&(a.value-=l));var h=l+a.value>e.length?e.length:l+a.value,p=e.subarray(l,h);it(t[0],r.bytes)&&(t.length===1?i.push(p):i=i.concat(n(p,t.slice(1))));var g=r.length+a.length+p.length;s+=g}return i},Of=function(e,t,i,s){var r;t==="group"&&(r=ht(e,[rt.BlockDuration])[0],r&&(r=bytesToNumber(r),r=1/i*r*i/1e3),e=ht(e,[rt.Block])[0],t="block");var a=new DataView(e.buffer,e.byteOffset,e.byteLength),l=dn(e,0),h=a.getInt16(l.length,!1),p=e[l.length+2],g=e.subarray(l.length+3),y=1/i*(s+h)*i/1e3,w={duration:r,trackNumber:l.value,keyframe:t==="simple"&&p>>7===1,invisible:(p&8)>>3===1,lacing:(p&6)>>1,discardable:t==="simple"&&(p&1)===1,frames:[],pts:y,dts:y,timestamp:h};if(!w.lacing)return w.frames.push(g),w;var D=g[0]+1,P=[],E=1;if(w.lacing===2)for(var H=(g.length-E)/D,V=0;V<D;V++)P.push(H);if(w.lacing===1)for(var U=0;U<D-1;U++){var M=0;do M+=g[E],E++;while(g[E-1]===255);P.push(M)}if(w.lacing===3)for(var Y=0,O=0;O<D-1;O++){var Q=O===0?dn(g,E):dn(g,E,!0,!0);Y+=Q.value,P.push(Y),E+=Q.length}return P.forEach(function(Ae){w.frames.push(g.subarray(E,E+Ae)),E+=Ae}),w},Lf=function(e){for(var t=0,i={};t<e.length;){var s=e[t]&127,r=e[t+1],a=void 0;r===1?a=e[t+2]:a=e.subarray(t+2,t+2+r),s===1?i.profile=a:s===2?i.level=a:s===3?i.bitDepth=a:s===4?i.chromaSubsampling=a:i[s]=a,t+=2+r}return i},Rf=function(e){e=toUint8(e);var t=[],i=ht(e,[rt.Segment,rt.Tracks,rt.Track]);return i.length||(i=ht(e,[rt.Tracks,rt.Track])),i.length||(i=ht(e,[rt.Track])),i.length?(i.forEach(function(s){var r=ht(s,rt.TrackType)[0];if(!(!r||!r.length)){if(r[0]===1)r="video";else if(r[0]===2)r="audio";else if(r[0]===17)r="subtitle";else return;var a={rawCodec:bytesToString(ht(s,[rt.CodecID])[0]),type:r,codecPrivate:ht(s,[rt.CodecPrivate])[0],number:bytesToNumber(ht(s,[rt.TrackNumber])[0]),defaultDuration:bytesToNumber(ht(s,[rt.DefaultDuration])[0]),default:ht(s,[rt.FlagDefault])[0],rawData:s},l="";if(/V_MPEG4\/ISO\/AVC/.test(a.rawCodec))l="avc1."+getAvcCodec(a.codecPrivate);else if(/V_MPEGH\/ISO\/HEVC/.test(a.rawCodec))l="hev1."+getHvcCodec(a.codecPrivate);else if(/V_MPEG4\/ISO\/ASP/.test(a.rawCodec))a.codecPrivate?l="mp4v.20."+a.codecPrivate[4].toString():l="mp4v.20.9";else if(/^V_THEORA/.test(a.rawCodec))l="theora";else if(/^V_VP8/.test(a.rawCodec))l="vp8";else if(/^V_VP9/.test(a.rawCodec))if(a.codecPrivate){var h=Lf(a.codecPrivate),p=h.profile,g=h.level,y=h.bitDepth,w=h.chromaSubsampling;l="vp09.",l+=padStart(p,2,"0")+".",l+=padStart(g,2,"0")+".",l+=padStart(y,2,"0")+".",l+=""+padStart(w,2,"0");var D=ht(s,[224,[85,176],[85,177]])[0]||[],P=ht(s,[224,[85,176],[85,185]])[0]||[],E=ht(s,[224,[85,176],[85,186]])[0]||[],H=ht(s,[224,[85,176],[85,187]])[0]||[];(D.length||P.length||E.length||H.length)&&(l+="."+padStart(H[0],2,"0"),l+="."+padStart(E[0],2,"0"),l+="."+padStart(D[0],2,"0"),l+="."+padStart(P[0],2,"0"))}else l="vp9";else/^V_AV1/.test(a.rawCodec)?l="av01."+getAv1Codec(a.codecPrivate):/A_ALAC/.test(a.rawCodec)?l="alac":/A_MPEG\/L2/.test(a.rawCodec)?l="mp2":/A_MPEG\/L3/.test(a.rawCodec)?l="mp3":/^A_AAC/.test(a.rawCodec)?a.codecPrivate?l="mp4a.40."+(a.codecPrivate[0]>>>3).toString():l="mp4a.40.2":/^A_AC3/.test(a.rawCodec)?l="ac-3":/^A_PCM/.test(a.rawCodec)?l="pcm":/^A_MS\/ACM/.test(a.rawCodec)?l="speex":/^A_EAC3/.test(a.rawCodec)?l="ec-3":/^A_VORBIS/.test(a.rawCodec)?l="vorbis":/^A_FLAC/.test(a.rawCodec)?l="flac":/^A_OPUS/.test(a.rawCodec)&&(l="opus");a.codec=l,t.push(a)}}),t.sort(function(s,r){return s.number-r.number})):t},xy=function(e,t){var i=[],s=ht(e,[rt.Segment])[0],r=ht(s,[rt.SegmentInfo,rt.TimestampScale])[0];r&&r.length?r=bytesToNumber(r):r=1e6;var a=ht(s,[rt.Cluster]);return t||(t=Rf(s)),a.forEach(function(l,h){var p=ht(l,[rt.SimpleBlock]).map(function(D){return{type:"simple",data:D}}),g=ht(l,[rt.BlockGroup]).map(function(D){return{type:"group",data:D}}),y=ht(l,[rt.Timestamp])[0]||0;y&&y.length&&(y=bytesToNumber(y));var w=p.concat(g).sort(function(D,P){return D.data.byteOffset-P.data.byteOffset});w.forEach(function(D,P){var E=Of(D.data,D.type,r,y);i.push(E)})}),{tracks:t,blocks:i}},Mf=fe([0,0,0,1]),Nf=fe([0,0,1]),Uf=fe([0,0,3]),Ff=function(e){for(var t=[],i=1;i<e.length-2;)it(e.subarray(i,i+3),Uf)&&(t.push(i+2),i++),i++;if(t.length===0)return e;var s=e.length-t.length,r=new Uint8Array(s),a=0;for(i=0;i<s;a++,i++)a===t[0]&&(a++,t.shift()),r[i]=e[a];return r},Vl=function(e,t,i,s){s===void 0&&(s=1/0),e=fe(e),i=[].concat(i);for(var r=0,a,l=0;r<e.length&&(l<s||a);){var h=void 0;if(it(e.subarray(r),Mf)?h=4:it(e.subarray(r),Nf)&&(h=3),!h){r++;continue}if(l++,a)return Ff(e.subarray(a,r));var p=void 0;t==="h264"?p=e[r+h]&31:t==="h265"&&(p=e[r+h]>>1&63),i.indexOf(p)!==-1&&(a=r+h),r+=h+(t==="h264"?1:2)}return e.subarray(0,0)},Vf=function(e,t,i){return Vl(e,"h264",t,i)},zf=function(e,t,i){return Vl(e,"h265",t,i)},Rt={webm:fe([119,101,98,109]),matroska:fe([109,97,116,114,111,115,107,97]),flac:fe([102,76,97,67]),ogg:fe([79,103,103,83]),ac3:fe([11,119]),riff:fe([82,73,70,70]),avi:fe([65,86,73]),wav:fe([87,65,86,69]),"3gp":fe([102,116,121,112,51,103]),mp4:fe([102,116,121,112]),fmp4:fe([115,116,121,112]),mov:fe([102,116,121,112,113,116]),moov:fe([109,111,111,118]),moof:fe([109,111,111,102])},On={aac:function(e){var t=xs(e);return it(e,[255,16],{offset:t,mask:[255,22]})},mp3:function(e){var t=xs(e);return it(e,[255,2],{offset:t,mask:[255,6]})},webm:function(e){var t=ht(e,[rt.EBML,rt.DocType])[0];return it(t,Rt.webm)},mkv:function(e){var t=ht(e,[rt.EBML,rt.DocType])[0];return it(t,Rt.matroska)},mp4:function(e){if(On["3gp"](e)||On.mov(e))return!1;if(it(e,Rt.mp4,{offset:4})||it(e,Rt.fmp4,{offset:4})||it(e,Rt.moof,{offset:4})||it(e,Rt.moov,{offset:4}))return!0},mov:function(e){return it(e,Rt.mov,{offset:4})},"3gp":function(e){return it(e,Rt["3gp"],{offset:4})},ac3:function(e){var t=xs(e);return it(e,Rt.ac3,{offset:t})},ts:function(e){if(e.length<189&&e.length>=1)return e[0]===71;for(var t=0;t+188<e.length&&t<188;){if(e[t]===71&&e[t+188]===71)return!0;t+=1}return!1},flac:function(e){var t=xs(e);return it(e,Rt.flac,{offset:t})},ogg:function(e){return it(e,Rt.ogg)},avi:function(e){return it(e,Rt.riff)&&it(e,Rt.avi,{offset:8})},wav:function(e){return it(e,Rt.riff)&&it(e,Rt.wav,{offset:8})},h264:function(e){return Vf(e,7,3).length},h265:function(e){return zf(e,[32,33],3).length}},qa=Object.keys(On).filter(function(n){return n!=="ts"&&n!=="h264"&&n!=="h265"}).concat(["ts","h264","h265"]);qa.forEach(function(n){var e=On[n];On[n]=function(t){return e(fe(t))}});var Hf=On,Wa=function(e){e=fe(e);for(var t=0;t<qa.length;t++){var i=qa[t];if(Hf[i](e))return i}return""},qf=function(e){return Ft(e,["moof"]).length>0},hn=G(79622);/**
 * @license
 * Video.js 8.21.0 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/main/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/main/LICENSE>
 */var $a="8.21.0";const Ui={},Yi=function(n,e){return Ui[n]=Ui[n]||[],e&&(Ui[n]=Ui[n].concat(e)),Ui[n]},Wf=function(n,e){Yi(n,e)},zl=function(n,e){const t=Yi(n).indexOf(e);return t<=-1?!1:(Ui[n]=Ui[n].slice(),Ui[n].splice(t,1),!0)},$f=function(n,e){Yi(n,[].concat(e).map(t=>{const i=(...s)=>(zl(n,i),t(...s));return i}))},gr={prefixed:!0},vr=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror","fullscreen"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror","-webkit-full-screen"]],Hl=vr[0];let js;for(let n=0;n<vr.length;n++)if(vr[n][1]in I()){js=vr[n];break}if(js){for(let n=0;n<js.length;n++)gr[Hl[n]]=js[n];gr.prefixed=js[0]!==Hl[0]}let Vt=[];const Gf=(n,e,t)=>(i,s,r)=>{const a=e.levels[s],l=new RegExp(`^(${a})$`);let h=n;if(i!=="log"&&r.unshift(i.toUpperCase()+":"),t&&(h=`%c${n}`,r.unshift(t)),r.unshift(h+":"),Vt){Vt.push([].concat(r));const g=Vt.length-1e3;Vt.splice(0,g>0?g:0)}if(!A().console)return;let p=A().console[i];!p&&i==="debug"&&(p=A().console.info||A().console.log),!(!p||!a||!l.test(i))&&p[Array.isArray(r)?"apply":"call"](A().console,r)};function Ga(n,e=":",t=""){let i="info",s;function r(...a){s("log",i,a)}return s=Gf(n,r,t),r.createLogger=(a,l,h)=>{const p=l!==void 0?l:e,g=h!==void 0?h:t,y=`${n} ${p} ${a}`;return Ga(y,p,g)},r.createNewLogger=(a,l,h)=>Ga(a,l,h),r.levels={all:"debug|log|warn|error",off:"",debug:"debug|log|warn|error",info:"log|warn|error",warn:"warn|error",error:"error",DEFAULT:i},r.level=a=>{if(typeof a=="string"){if(!r.levels.hasOwnProperty(a))throw new Error(`"${a}" in not a valid log level`);i=a}return i},r.history=()=>Vt?[].concat(Vt):[],r.history.filter=a=>(Vt||[]).filter(l=>new RegExp(`.*${a}.*`).test(l[0])),r.history.clear=()=>{Vt&&(Vt.length=0)},r.history.disable=()=>{Vt!==null&&(Vt.length=0,Vt=null)},r.history.enable=()=>{Vt===null&&(Vt=[])},r.error=(...a)=>s("error",i,a),r.warn=(...a)=>s("warn",i,a),r.debug=(...a)=>s("debug",i,a),r}const He=Ga("VIDEOJS"),ql=He.createLogger,Yf=Object.prototype.toString,Wl=function(n){return Ei(n)?Object.keys(n):[]};function Ln(n,e){Wl(n).forEach(t=>e(n[t],t))}function $l(n,e,t=0){return Wl(n).reduce((i,s)=>e(i,n[s],s),t)}function Ei(n){return!!n&&typeof n=="object"}function Rn(n){return Ei(n)&&Yf.call(n)==="[object Object]"&&n.constructor===Object}function Ze(...n){const e={};return n.forEach(t=>{t&&Ln(t,(i,s)=>{if(!Rn(i)){e[s]=i;return}Rn(e[s])||(e[s]={}),e[s]=Ze(e[s],i)})}),e}function Gl(n={}){const e=[];for(const t in n)if(n.hasOwnProperty(t)){const i=n[t];e.push(i)}return e}function Ar(n,e,t,i=!0){const s=a=>Object.defineProperty(n,e,{value:a,enumerable:!0,writable:!0}),r={configurable:!0,enumerable:!0,get(){const a=t();return s(a),a}};return i&&(r.set=s),Object.defineProperty(n,e,r)}var Xf=Object.freeze({__proto__:null,each:Ln,reduce:$l,isObject:Ei,isPlain:Rn,merge:Ze,values:Gl,defineLazyProperty:Ar});let Ya=!1,Yl=null,pi=!1,Xl,Kl=!1,Mn=!1,Nn=!1,Ti=!1,Xa=null,yr=null;const Kf=!!(A().cast&&A().cast.framework&&A().cast.framework.CastReceiverContext);let Ql=null,_r=!1,br=!1,Er=!1,Tr=!1,Cr=!1,xr=!1,Sr=!1;const ws=!!(Un()&&("ontouchstart"in A()||A().navigator.maxTouchPoints||A().DocumentTouch&&A().document instanceof A().DocumentTouch)),Xi=A().navigator&&A().navigator.userAgentData;if(Xi&&Xi.platform&&Xi.brands&&(pi=Xi.platform==="Android",Mn=!!Xi.brands.find(n=>n.brand==="Microsoft Edge"),Nn=!!Xi.brands.find(n=>n.brand==="Chromium"),Ti=!Mn&&Nn,Xa=yr=(Xi.brands.find(n=>n.brand==="Chromium")||{}).version||null,br=Xi.platform==="Windows"),!Nn){const n=A().navigator&&A().navigator.userAgent||"";Ya=/iPod/i.test(n),Yl=function(){const e=n.match(/OS (\d+)_/i);return e&&e[1]?e[1]:null}(),pi=/Android/i.test(n),Xl=function(){const e=n.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if(!e)return null;const t=e[1]&&parseFloat(e[1]),i=e[2]&&parseFloat(e[2]);return t&&i?parseFloat(e[1]+"."+e[2]):t||null}(),Kl=/Firefox/i.test(n),Mn=/Edg/i.test(n),Nn=/Chrome/i.test(n)||/CriOS/i.test(n),Ti=!Mn&&Nn,Xa=yr=function(){const e=n.match(/(Chrome|CriOS)\/(\d+)/);return e&&e[2]?parseFloat(e[2]):null}(),Ql=function(){const e=/MSIE\s(\d+)\.\d/.exec(n);let t=e&&parseFloat(e[1]);return!t&&/Trident\/7.0/i.test(n)&&/rv:11.0/.test(n)&&(t=11),t}(),Cr=/Tizen/i.test(n),xr=/Web0S/i.test(n),Sr=Cr||xr,_r=/Safari/i.test(n)&&!Ti&&!pi&&!Mn&&!Sr,br=/Windows/i.test(n),Er=/iPad/i.test(n)||_r&&ws&&!/iPhone/i.test(n),Tr=/iPhone/i.test(n)&&!Er}const kt=Tr||Er||Ya,jr=(_r||kt)&&!Ti;var Jl=Object.freeze({__proto__:null,get IS_IPOD(){return Ya},get IOS_VERSION(){return Yl},get IS_ANDROID(){return pi},get ANDROID_VERSION(){return Xl},get IS_FIREFOX(){return Kl},get IS_EDGE(){return Mn},get IS_CHROMIUM(){return Nn},get IS_CHROME(){return Ti},get CHROMIUM_VERSION(){return Xa},get CHROME_VERSION(){return yr},IS_CHROMECAST_RECEIVER:Kf,get IE_VERSION(){return Ql},get IS_SAFARI(){return _r},get IS_WINDOWS(){return br},get IS_IPAD(){return Er},get IS_IPHONE(){return Tr},get IS_TIZEN(){return Cr},get IS_WEBOS(){return xr},get IS_SMART_TV(){return Sr},TOUCH_ENABLED:ws,IS_IOS:kt,IS_ANY_SAFARI:jr});function Zl(n){return typeof n=="string"&&!!n.trim()}function Qf(n){if(n.indexOf(" ")>=0)throw new Error("class has illegal whitespace characters")}function Un(){return I()===A().document}function Fn(n){return Ei(n)&&n.nodeType===1}function eu(){try{return A().parent!==A().self}catch(n){return!0}}function tu(n){return function(e,t){if(!Zl(e))return I()[n](null);Zl(t)&&(t=I().querySelector(t));const i=Fn(t)?t:I();return i[n]&&i[n](e)}}function Le(n="div",e={},t={},i){const s=I().createElement(n);return Object.getOwnPropertyNames(e).forEach(function(r){const a=e[r];r==="textContent"?Ki(s,a):(s[r]!==a||r==="tabIndex")&&(s[r]=a)}),Object.getOwnPropertyNames(t).forEach(function(r){s.setAttribute(r,t[r])}),i&&Qa(s,i),s}function Ki(n,e){return typeof n.textContent=="undefined"?n.innerText=e:n.textContent=e,n}function Ka(n,e){e.firstChild?e.insertBefore(n,e.firstChild):e.appendChild(n)}function Bs(n,e){return Qf(e),n.classList.contains(e)}function fn(n,...e){return n.classList.add(...e.reduce((t,i)=>t.concat(i.split(/\s+/)),[])),n}function wr(n,...e){return n?(n.classList.remove(...e.reduce((t,i)=>t.concat(i.split(/\s+/)),[])),n):(He.warn("removeClass was called with an element that doesn't exist"),null)}function iu(n,e,t){return typeof t=="function"&&(t=t(n,e)),typeof t!="boolean"&&(t=void 0),e.split(/\s+/).forEach(i=>n.classList.toggle(i,t)),n}function nu(n,e){Object.getOwnPropertyNames(e).forEach(function(t){const i=e[t];i===null||typeof i=="undefined"||i===!1?n.removeAttribute(t):n.setAttribute(t,i===!0?"":i)})}function Qi(n){const e={},t=["autoplay","controls","playsinline","loop","muted","default","defaultMuted"];if(n&&n.attributes&&n.attributes.length>0){const i=n.attributes;for(let s=i.length-1;s>=0;s--){const r=i[s].name;let a=i[s].value;t.includes(r)&&(a=a!==null),e[r]=a}}return e}function su(n,e){return n.getAttribute(e)}function Vn(n,e,t){n.setAttribute(e,t)}function Br(n,e){n.removeAttribute(e)}function ru(){I().body.focus(),I().onselectstart=function(){return!1}}function au(){I().onselectstart=function(){return!0}}function zn(n){if(n&&n.getBoundingClientRect&&n.parentNode){const e=n.getBoundingClientRect(),t={};return["bottom","height","left","right","top","width"].forEach(i=>{e[i]!==void 0&&(t[i]=e[i])}),t.height||(t.height=parseFloat(Hn(n,"height"))),t.width||(t.width=parseFloat(Hn(n,"width"))),t}}function Ds(n){if(!n||n&&!n.offsetParent)return{left:0,top:0,width:0,height:0};const e=n.offsetWidth,t=n.offsetHeight;let i=0,s=0;for(;n.offsetParent&&n!==I()[gr.fullscreenElement];)i+=n.offsetLeft,s+=n.offsetTop,n=n.offsetParent;return{left:i,top:s,width:e,height:t}}function Dr(n,e){const t={x:0,y:0};if(kt){let g=n;for(;g&&g.nodeName.toLowerCase()!=="html";){const y=Hn(g,"transform");if(/^matrix/.test(y)){const w=y.slice(7,-1).split(/,\s/).map(Number);t.x+=w[4],t.y+=w[5]}else if(/^matrix3d/.test(y)){const w=y.slice(9,-1).split(/,\s/).map(Number);t.x+=w[12],t.y+=w[13]}if(g.assignedSlot&&g.assignedSlot.parentElement&&A().WebKitCSSMatrix){const w=A().getComputedStyle(g.assignedSlot.parentElement).transform,D=new(A()).WebKitCSSMatrix(w);t.x+=D.m41,t.y+=D.m42}g=g.parentNode||g.host}}const i={},s=Ds(e.target),r=Ds(n),a=r.width,l=r.height;let h=e.offsetY-(r.top-s.top),p=e.offsetX-(r.left-s.left);return e.changedTouches&&(p=e.changedTouches[0].pageX-r.left,h=e.changedTouches[0].pageY+r.top,kt&&(p-=t.x,h-=t.y)),i.y=1-Math.max(0,Math.min(1,h/l)),i.x=Math.max(0,Math.min(1,p/a)),i}function ou(n){return Ei(n)&&n.nodeType===3}function kr(n){for(;n.firstChild;)n.removeChild(n.firstChild);return n}function lu(n){return typeof n=="function"&&(n=n()),(Array.isArray(n)?n:[n]).map(e=>{if(typeof e=="function"&&(e=e()),Fn(e)||ou(e))return e;if(typeof e=="string"&&/\S/.test(e))return I().createTextNode(e)}).filter(e=>e)}function Qa(n,e){return lu(e).forEach(t=>n.appendChild(t)),n}function uu(n,e){return Qa(kr(n),e)}function ks(n){return n.button===void 0&&n.buttons===void 0||n.button===0&&n.buttons===void 0||n.type==="mouseup"&&n.button===0&&n.buttons===0||n.type==="mousedown"&&n.button===0&&n.buttons===0?!0:!(n.button!==0||n.buttons!==1)}const Ji=tu("querySelector"),cu=tu("querySelectorAll");function Hn(n,e){if(!n||!e)return"";if(typeof A().getComputedStyle=="function"){let t;try{t=A().getComputedStyle(n)}catch(i){return""}return t?t.getPropertyValue(e)||t[e]:""}return""}function du(n){[...I().styleSheets].forEach(e=>{try{const t=[...e.cssRules].map(s=>s.cssText).join(""),i=I().createElement("style");i.textContent=t,n.document.head.appendChild(i)}catch(t){const i=I().createElement("link");i.rel="stylesheet",i.type=e.type,i.media=e.media.mediaText,i.href=e.href,n.document.head.appendChild(i)}})}var hu=Object.freeze({__proto__:null,isReal:Un,isEl:Fn,isInFrame:eu,createEl:Le,textContent:Ki,prependTo:Ka,hasClass:Bs,addClass:fn,removeClass:wr,toggleClass:iu,setAttributes:nu,getAttributes:Qi,getAttribute:su,setAttribute:Vn,removeAttribute:Br,blockTextSelection:ru,unblockTextSelection:au,getBoundingClientRect:zn,findPosition:Ds,getPointerPosition:Dr,isTextNode:ou,emptyEl:kr,normalizeContent:lu,appendContent:Qa,insertContent:uu,isSingleLeftClick:ks,$:Ji,$$:cu,computedStyle:Hn,copyStyleSheetsToWindow:du});let fu=!1,Ja;const Jf=function(){if(Ja.options.autoSetup===!1)return;const n=Array.prototype.slice.call(I().getElementsByTagName("video")),e=Array.prototype.slice.call(I().getElementsByTagName("audio")),t=Array.prototype.slice.call(I().getElementsByTagName("video-js")),i=n.concat(e,t);if(i&&i.length>0)for(let s=0,r=i.length;s<r;s++){const a=i[s];if(a&&a.getAttribute)a.player===void 0&&a.getAttribute("data-setup")!==null&&Ja(a);else{Za(1);break}}else fu||Za(1)};function Za(n,e){Un()&&(e&&(Ja=e),A().setTimeout(Jf,n))}function eo(){fu=!0,A().removeEventListener("load",eo)}Un()&&(I().readyState==="complete"?eo():A().addEventListener("load",eo));const pu=function(n){const e=I().createElement("style");return e.className=n,e},mu=function(n,e){n.styleSheet?n.styleSheet.cssText=e:n.textContent=e};var Mt=new WeakMap;let Zf=3;function ni(){return Zf++}function gu(n,e){if(!Mt.has(n))return;const t=Mt.get(n);t.handlers[e].length===0&&(delete t.handlers[e],n.removeEventListener?n.removeEventListener(e,t.dispatcher,!1):n.detachEvent&&n.detachEvent("on"+e,t.dispatcher)),Object.getOwnPropertyNames(t.handlers).length<=0&&(delete t.handlers,delete t.dispatcher,delete t.disabled),Object.getOwnPropertyNames(t).length===0&&Mt.delete(n)}function to(n,e,t,i){t.forEach(function(s){n(e,s,i)})}function Ir(n){if(n.fixed_)return n;function e(){return!0}function t(){return!1}if(!n||!n.isPropagationStopped||!n.isImmediatePropagationStopped){const i=n||A().event;n={};const s=["layerX","layerY","keyLocation","path","webkitMovementX","webkitMovementY","mozPressure","mozInputSource"];for(const r in i)s.includes(r)||r==="returnValue"&&i.preventDefault||(n[r]=i[r]);if(n.target||(n.target=n.srcElement||I()),n.relatedTarget||(n.relatedTarget=n.fromElement===n.target?n.toElement:n.fromElement),n.preventDefault=function(){i.preventDefault&&i.preventDefault(),n.returnValue=!1,i.returnValue=!1,n.defaultPrevented=!0},n.defaultPrevented=!1,n.stopPropagation=function(){i.stopPropagation&&i.stopPropagation(),n.cancelBubble=!0,i.cancelBubble=!0,n.isPropagationStopped=e},n.isPropagationStopped=t,n.stopImmediatePropagation=function(){i.stopImmediatePropagation&&i.stopImmediatePropagation(),n.isImmediatePropagationStopped=e,n.stopPropagation()},n.isImmediatePropagationStopped=t,n.clientX!==null&&n.clientX!==void 0){const r=I().documentElement,a=I().body;n.pageX=n.clientX+(r&&r.scrollLeft||a&&a.scrollLeft||0)-(r&&r.clientLeft||a&&a.clientLeft||0),n.pageY=n.clientY+(r&&r.scrollTop||a&&a.scrollTop||0)-(r&&r.clientTop||a&&a.clientTop||0)}n.which=n.charCode||n.keyCode,n.button!==null&&n.button!==void 0&&(n.button=n.button&1?0:n.button&4?1:n.button&2?2:0)}return n.fixed_=!0,n}let Pr;const ep=function(){if(typeof Pr!="boolean"){Pr=!1;try{const n=Object.defineProperty({},"passive",{get(){Pr=!0}});A().addEventListener("test",null,n),A().removeEventListener("test",null,n)}catch(n){}}return Pr},tp=["touchstart","touchmove"];function Xt(n,e,t){if(Array.isArray(e))return to(Xt,n,e,t);Mt.has(n)||Mt.set(n,{});const i=Mt.get(n);if(i.handlers||(i.handlers={}),i.handlers[e]||(i.handlers[e]=[]),t.guid||(t.guid=ni()),i.handlers[e].push(t),i.dispatcher||(i.disabled=!1,i.dispatcher=function(s,r){if(i.disabled)return;s=Ir(s);const a=i.handlers[s.type];if(a){const l=a.slice(0);for(let h=0,p=l.length;h<p&&!s.isImmediatePropagationStopped();h++)try{l[h].call(n,s,r)}catch(g){He.error(g)}}}),i.handlers[e].length===1)if(n.addEventListener){let s=!1;ep()&&tp.indexOf(e)>-1&&(s={passive:!0}),n.addEventListener(e,i.dispatcher,s)}else n.attachEvent&&n.attachEvent("on"+e,i.dispatcher)}function It(n,e,t){if(!Mt.has(n))return;const i=Mt.get(n);if(!i.handlers)return;if(Array.isArray(e))return to(It,n,e,t);const s=function(a,l){i.handlers[l]=[],gu(a,l)};if(e===void 0){for(const a in i.handlers)Object.prototype.hasOwnProperty.call(i.handlers||{},a)&&s(n,a);return}const r=i.handlers[e];if(r){if(!t){s(n,e);return}if(t.guid)for(let a=0;a<r.length;a++)r[a].guid===t.guid&&r.splice(a--,1);gu(n,e)}}function qn(n,e,t){const i=Mt.has(n)?Mt.get(n):{},s=n.parentNode||n.ownerDocument;if(typeof e=="string"?e={type:e,target:n}:e.target||(e.target=n),e=Ir(e),i.dispatcher&&i.dispatcher.call(n,e,t),s&&!e.isPropagationStopped()&&e.bubbles===!0)qn.call(null,s,e,t);else if(!s&&!e.defaultPrevented&&e.target&&e.target[e.type]){Mt.has(e.target)||Mt.set(e.target,{});const r=Mt.get(e.target);e.target[e.type]&&(r.disabled=!0,typeof e.target[e.type]=="function"&&e.target[e.type](),r.disabled=!1)}return!e.defaultPrevented}function Or(n,e,t){if(Array.isArray(e))return to(Or,n,e,t);const i=function(){It(n,e,i),t.apply(this,arguments)};i.guid=t.guid=t.guid||ni(),Xt(n,e,i)}function io(n,e,t){const i=function(){It(n,e,i),t.apply(this,arguments)};i.guid=t.guid=t.guid||ni(),Xt(n,e,i)}var ip=Object.freeze({__proto__:null,fixEvent:Ir,on:Xt,off:It,trigger:qn,one:Or,any:io});const si=30,nt=function(n,e,t){e.guid||(e.guid=ni());const i=e.bind(n);return i.guid=t?t+"_"+e.guid:e.guid,i},Ci=function(n,e){let t=A().performance.now();return function(...s){const r=A().performance.now();r-t>=e&&(n(...s),t=r)}},vu=function(n,e,t,i=A()){let s;const r=()=>{i.clearTimeout(s),s=null},a=function(){const l=this,h=arguments;let p=function(){s=null,p=null,t||n.apply(l,h)};!s&&t&&n.apply(l,h),i.clearTimeout(s),s=i.setTimeout(p,e)};return a.cancel=r,a};var np=Object.freeze({__proto__:null,UPDATE_REFRESH_INTERVAL:si,bind_:nt,throttle:Ci,debounce:vu});let Is;class Kt{on(e,t){const i=this.addEventListener;this.addEventListener=()=>{},Xt(this,e,t),this.addEventListener=i}off(e,t){It(this,e,t)}one(e,t){const i=this.addEventListener;this.addEventListener=()=>{},Or(this,e,t),this.addEventListener=i}any(e,t){const i=this.addEventListener;this.addEventListener=()=>{},io(this,e,t),this.addEventListener=i}trigger(e){const t=e.type||e;typeof e=="string"&&(e={type:t}),e=Ir(e),this.allowedEvents_[t]&&this["on"+t]&&this["on"+t](e),qn(this,e)}queueTrigger(e){Is||(Is=new Map);const t=e.type||e;let i=Is.get(this);i||(i=new Map,Is.set(this,i));const s=i.get(t);i.delete(t),A().clearTimeout(s);const r=A().setTimeout(()=>{i.delete(t),i.size===0&&(i=null,Is.delete(this)),this.trigger(e)},0);i.set(t,r)}}Kt.prototype.allowedEvents_={},Kt.prototype.addEventListener=Kt.prototype.on,Kt.prototype.removeEventListener=Kt.prototype.off,Kt.prototype.dispatchEvent=Kt.prototype.trigger;const Lr=n=>typeof n.name=="function"?n.name():typeof n.name=="string"?n.name:n.name_?n.name_:n.constructor&&n.constructor.name?n.constructor.name:typeof n,Fi=n=>n instanceof Kt||!!n.eventBusEl_&&["on","one","off","trigger"].every(e=>typeof n[e]=="function"),sp=(n,e)=>{Fi(n)?e():(n.eventedCallbacks||(n.eventedCallbacks=[]),n.eventedCallbacks.push(e))},no=n=>typeof n=="string"&&/\S/.test(n)||Array.isArray(n)&&!!n.length,Rr=(n,e,t)=>{if(!n||!n.nodeName&&!Fi(n))throw new Error(`Invalid target for ${Lr(e)}#${t}; must be a DOM node or evented object.`)},Au=(n,e,t)=>{if(!no(n))throw new Error(`Invalid event type for ${Lr(e)}#${t}; must be a non-empty string or array.`)},yu=(n,e,t)=>{if(typeof n!="function")throw new Error(`Invalid listener for ${Lr(e)}#${t}; must be a function.`)},so=(n,e,t)=>{const i=e.length<3||e[0]===n||e[0]===n.eventBusEl_;let s,r,a;return i?(s=n.eventBusEl_,e.length>=3&&e.shift(),[r,a]=e):(s=e[0],r=e[1],a=e[2]),Rr(s,n,t),Au(r,n,t),yu(a,n,t),a=nt(n,a),{isTargetingSelf:i,target:s,type:r,listener:a}},pn=(n,e,t,i)=>{Rr(n,n,e),n.nodeName?ip[e](n,t,i):n[e](t,i)},rp={on(...n){const{isTargetingSelf:e,target:t,type:i,listener:s}=so(this,n,"on");if(pn(t,"on",i,s),!e){const r=()=>this.off(t,i,s);r.guid=s.guid;const a=()=>this.off("dispose",r);a.guid=s.guid,pn(this,"on","dispose",r),pn(t,"on","dispose",a)}},one(...n){const{isTargetingSelf:e,target:t,type:i,listener:s}=so(this,n,"one");if(e)pn(t,"one",i,s);else{const r=(...a)=>{this.off(t,i,r),s.apply(null,a)};r.guid=s.guid,pn(t,"one",i,r)}},any(...n){const{isTargetingSelf:e,target:t,type:i,listener:s}=so(this,n,"any");if(e)pn(t,"any",i,s);else{const r=(...a)=>{this.off(t,i,r),s.apply(null,a)};r.guid=s.guid,pn(t,"any",i,r)}},off(n,e,t){if(!n||no(n))It(this.eventBusEl_,n,e);else{const i=n,s=e;Rr(i,this,"off"),Au(s,this,"off"),yu(t,this,"off"),t=nt(this,t),this.off("dispose",t),i.nodeName?(It(i,s,t),It(i,"dispose",t)):Fi(i)&&(i.off(s,t),i.off("dispose",t))}},trigger(n,e){Rr(this.eventBusEl_,this,"trigger");const t=n&&typeof n!="string"?n.type:n;if(!no(t))throw new Error(`Invalid event type for ${Lr(this)}#trigger; must be a non-empty string or object with a type key that has a non-empty value.`);return qn(this.eventBusEl_,n,e)}};function ro(n,e={}){const{eventBusKey:t}=e;if(t){if(!n[t].nodeName)throw new Error(`The eventBusKey "${t}" does not refer to an element.`);n.eventBusEl_=n[t]}else n.eventBusEl_=Le("span",{className:"vjs-event-bus"});return Object.assign(n,rp),n.eventedCallbacks&&n.eventedCallbacks.forEach(i=>{i()}),n.on("dispose",()=>{n.off(),[n,n.el_,n.eventBusEl_].forEach(function(i){i&&Mt.has(i)&&Mt.delete(i)}),A().setTimeout(()=>{n.eventBusEl_=null},0)}),n}const ap={state:{},setState(n){typeof n=="function"&&(n=n());let e;return Ln(n,(t,i)=>{this.state[i]!==t&&(e=e||{},e[i]={from:this.state[i],to:t}),this.state[i]=t}),e&&Fi(this)&&this.trigger({changes:e,type:"statechanged"}),e}};function _u(n,e){return Object.assign(n,ap),n.state=Object.assign({},n.state,e),typeof n.handleStateChanged=="function"&&Fi(n)&&n.on("statechanged",n.handleStateChanged),n}const Ps=function(n){return typeof n!="string"?n:n.replace(/./,e=>e.toLowerCase())},vt=function(n){return typeof n!="string"?n:n.replace(/./,e=>e.toUpperCase())},bu=function(n,e){return vt(n)===vt(e)};var op=Object.freeze({__proto__:null,toLowerCase:Ps,toTitleCase:vt,titleCaseEquals:bu});class q{constructor(e,t,i){if(!e&&this.play?this.player_=e=this:this.player_=e,this.isDisposed_=!1,this.parentComponent_=null,this.options_=Ze({},this.options_),t=this.options_=Ze(this.options_,t),this.id_=t.id||t.el&&t.el.id,!this.id_){const s=e&&e.id&&e.id()||"no_player";this.id_=`${s}_component_${ni()}`}this.name_=t.name||null,t.el?this.el_=t.el:t.createEl!==!1&&(this.el_=this.createEl()),t.className&&this.el_&&t.className.split(" ").forEach(s=>this.addClass(s)),["on","off","one","any","trigger"].forEach(s=>{this[s]=void 0}),t.evented!==!1&&(ro(this,{eventBusKey:this.el_?"el_":null}),this.handleLanguagechange=this.handleLanguagechange.bind(this),this.on(this.player_,"languagechange",this.handleLanguagechange)),_u(this,this.constructor.defaultState),this.children_=[],this.childIndex_={},this.childNameIndex_={},this.setTimeoutIds_=new Set,this.setIntervalIds_=new Set,this.rafIds_=new Set,this.namedRafs_=new Map,this.clearingTimersOnDispose_=!1,t.initChildren!==!1&&this.initChildren(),this.ready(i),t.reportTouchActivity!==!1&&this.enableTouchActivity()}dispose(e={}){if(!this.isDisposed_){if(this.readyQueue_&&(this.readyQueue_.length=0),this.trigger({type:"dispose",bubbles:!1}),this.isDisposed_=!0,this.children_)for(let t=this.children_.length-1;t>=0;t--)this.children_[t].dispose&&this.children_[t].dispose();this.children_=null,this.childIndex_=null,this.childNameIndex_=null,this.parentComponent_=null,this.el_&&(this.el_.parentNode&&(e.restoreEl?this.el_.parentNode.replaceChild(e.restoreEl,this.el_):this.el_.parentNode.removeChild(this.el_)),this.el_=null),this.player_=null}}isDisposed(){return!!this.isDisposed_}player(){return this.player_}options(e){return e?(this.options_=Ze(this.options_,e),this.options_):this.options_}el(){return this.el_}createEl(e,t,i){return Le(e,t,i)}localize(e,t,i=e){const s=this.player_.language&&this.player_.language(),r=this.player_.languages&&this.player_.languages(),a=r&&r[s],l=s&&s.split("-")[0],h=r&&r[l];let p=i;return a&&a[e]?p=a[e]:h&&h[e]&&(p=h[e]),t&&(p=p.replace(/\{(\d+)\}/g,function(g,y){const w=t[y-1];let D=w;return typeof w=="undefined"&&(D=g),D})),p}handleLanguagechange(){}contentEl(){return this.contentEl_||this.el_}id(){return this.id_}name(){return this.name_}children(){return this.children_}getChildById(e){return this.childIndex_[e]}getChild(e){if(e)return this.childNameIndex_[e]}getDescendant(...e){e=e.reduce((i,s)=>i.concat(s),[]);let t=this;for(let i=0;i<e.length;i++)if(t=t.getChild(e[i]),!t||!t.getChild)return;return t}setIcon(e,t=this.el()){if(!this.player_.options_.experimentalSvgIcons)return;const i="http://www.w3.org/2000/svg",s=Le("span",{className:"vjs-icon-placeholder vjs-svg-icon"},{"aria-hidden":"true"}),r=I().createElementNS(i,"svg");r.setAttributeNS(null,"viewBox","0 0 512 512");const a=I().createElementNS(i,"use");return r.appendChild(a),a.setAttributeNS(null,"href",`#vjs-icon-${e}`),s.appendChild(r),this.iconIsSet_?t.replaceChild(s,t.querySelector(".vjs-icon-placeholder")):t.appendChild(s),this.iconIsSet_=!0,s}addChild(e,t={},i=this.children_.length){let s,r;if(typeof e=="string"){r=vt(e);const a=t.componentClass||r;t.name=r;const l=q.getComponent(a);if(!l)throw new Error(`Component ${a} does not exist`);if(typeof l!="function")return null;s=new l(this.player_||this,t)}else s=e;if(s.parentComponent_&&s.parentComponent_.removeChild(s),this.children_.splice(i,0,s),s.parentComponent_=this,typeof s.id=="function"&&(this.childIndex_[s.id()]=s),r=r||s.name&&vt(s.name()),r&&(this.childNameIndex_[r]=s,this.childNameIndex_[Ps(r)]=s),typeof s.el=="function"&&s.el()){let a=null;this.children_[i+1]&&(this.children_[i+1].el_?a=this.children_[i+1].el_:Fn(this.children_[i+1])&&(a=this.children_[i+1])),this.contentEl().insertBefore(s.el(),a)}return s}removeChild(e){if(typeof e=="string"&&(e=this.getChild(e)),!e||!this.children_)return;let t=!1;for(let s=this.children_.length-1;s>=0;s--)if(this.children_[s]===e){t=!0,this.children_.splice(s,1);break}if(!t)return;e.parentComponent_=null,this.childIndex_[e.id()]=null,this.childNameIndex_[vt(e.name())]=null,this.childNameIndex_[Ps(e.name())]=null;const i=e.el();i&&i.parentNode===this.contentEl()&&this.contentEl().removeChild(e.el())}initChildren(){const e=this.options_.children;if(e){const t=this.options_,i=a=>{const l=a.name;let h=a.opts;if(t[l]!==void 0&&(h=t[l]),h===!1)return;h===!0&&(h={}),h.playerOptions=this.options_.playerOptions;const p=this.addChild(l,h);p&&(this[l]=p)};let s;const r=q.getComponent("Tech");Array.isArray(e)?s=e:s=Object.keys(e),s.concat(Object.keys(this.options_).filter(function(a){return!s.some(function(l){return typeof l=="string"?a===l:a===l.name})})).map(a=>{let l,h;return typeof a=="string"?(l=a,h=e[l]||this.options_[l]||{}):(l=a.name,h=a),{name:l,opts:h}}).filter(a=>{const l=q.getComponent(a.opts.componentClass||vt(a.name));return l&&!r.isTech(l)}).forEach(i)}}buildCSSClass(){return""}ready(e,t=!1){if(e){if(!this.isReady_){this.readyQueue_=this.readyQueue_||[],this.readyQueue_.push(e);return}t?e.call(this):this.setTimeout(e,1)}}triggerReady(){this.isReady_=!0,this.setTimeout(function(){const e=this.readyQueue_;this.readyQueue_=[],e&&e.length>0&&e.forEach(function(t){t.call(this)},this),this.trigger("ready")},1)}$(e,t){return Ji(e,t||this.contentEl())}$$(e,t){return cu(e,t||this.contentEl())}hasClass(e){return Bs(this.el_,e)}addClass(...e){fn(this.el_,...e)}removeClass(...e){wr(this.el_,...e)}toggleClass(e,t){iu(this.el_,e,t)}show(){this.removeClass("vjs-hidden")}hide(){this.addClass("vjs-hidden")}lockShowing(){this.addClass("vjs-lock-showing")}unlockShowing(){this.removeClass("vjs-lock-showing")}getAttribute(e){return su(this.el_,e)}setAttribute(e,t){Vn(this.el_,e,t)}removeAttribute(e){Br(this.el_,e)}width(e,t){return this.dimension("width",e,t)}height(e,t){return this.dimension("height",e,t)}dimensions(e,t){this.width(e,!0),this.height(t)}dimension(e,t,i){if(t!==void 0){(t===null||t!==t)&&(t=0),(""+t).indexOf("%")!==-1||(""+t).indexOf("px")!==-1?this.el_.style[e]=t:t==="auto"?this.el_.style[e]="":this.el_.style[e]=t+"px",i||this.trigger("componentresize");return}if(!this.el_)return 0;const s=this.el_.style[e],r=s.indexOf("px");return parseInt(r!==-1?s.slice(0,r):this.el_["offset"+vt(e)],10)}currentDimension(e){let t=0;if(e!=="width"&&e!=="height")throw new Error("currentDimension only accepts width or height value");if(t=Hn(this.el_,e),t=parseFloat(t),t===0||isNaN(t)){const i=`offset${vt(e)}`;t=this.el_[i]}return t}currentDimensions(){return{width:this.currentDimension("width"),height:this.currentDimension("height")}}currentWidth(){return this.currentDimension("width")}currentHeight(){return this.currentDimension("height")}getPositions(){const e=this.el_.getBoundingClientRect(),t={x:e.x,y:e.y,width:e.width,height:e.height,top:e.top,right:e.right,bottom:e.bottom,left:e.left},i={x:e.left+e.width/2,y:e.top+e.height/2,width:0,height:0,top:e.top+e.height/2,right:e.left+e.width/2,bottom:e.top+e.height/2,left:e.left+e.width/2};return{boundingClientRect:t,center:i}}focus(){this.el_.focus()}blur(){this.el_.blur()}handleKeyDown(e){this.player_&&(e.key!=="Tab"&&!(this.player_.options_.playerOptions.spatialNavigation&&this.player_.options_.playerOptions.spatialNavigation.enabled)&&e.stopPropagation(),this.player_.handleKeyDown(e))}handleKeyPress(e){this.handleKeyDown(e)}emitTapEvents(){let e=0,t=null;const i=10,s=200;let r;this.on("touchstart",function(l){l.touches.length===1&&(t={pageX:l.touches[0].pageX,pageY:l.touches[0].pageY},e=A().performance.now(),r=!0)}),this.on("touchmove",function(l){if(l.touches.length>1)r=!1;else if(t){const h=l.touches[0].pageX-t.pageX,p=l.touches[0].pageY-t.pageY;Math.sqrt(h*h+p*p)>i&&(r=!1)}});const a=function(){r=!1};this.on("touchleave",a),this.on("touchcancel",a),this.on("touchend",function(l){t=null,r===!0&&A().performance.now()-e<s&&(l.preventDefault(),this.trigger("tap"))})}enableTouchActivity(){if(!this.player()||!this.player().reportUserActivity)return;const e=nt(this.player(),this.player().reportUserActivity);let t;this.on("touchstart",function(){e(),this.clearInterval(t),t=this.setInterval(e,250)});const i=function(s){e(),this.clearInterval(t)};this.on("touchmove",e),this.on("touchend",i),this.on("touchcancel",i)}setTimeout(e,t){var i;return e=nt(this,e),this.clearTimersOnDispose_(),i=A().setTimeout(()=>{this.setTimeoutIds_.has(i)&&this.setTimeoutIds_.delete(i),e()},t),this.setTimeoutIds_.add(i),i}clearTimeout(e){return this.setTimeoutIds_.has(e)&&(this.setTimeoutIds_.delete(e),A().clearTimeout(e)),e}setInterval(e,t){e=nt(this,e),this.clearTimersOnDispose_();const i=A().setInterval(e,t);return this.setIntervalIds_.add(i),i}clearInterval(e){return this.setIntervalIds_.has(e)&&(this.setIntervalIds_.delete(e),A().clearInterval(e)),e}requestAnimationFrame(e){this.clearTimersOnDispose_();var t;return e=nt(this,e),t=A().requestAnimationFrame(()=>{this.rafIds_.has(t)&&this.rafIds_.delete(t),e()}),this.rafIds_.add(t),t}requestNamedAnimationFrame(e,t){this.namedRafs_.has(e)&&this.cancelNamedAnimationFrame(e),this.clearTimersOnDispose_(),t=nt(this,t);const i=this.requestAnimationFrame(()=>{t(),this.namedRafs_.has(e)&&this.namedRafs_.delete(e)});return this.namedRafs_.set(e,i),e}cancelNamedAnimationFrame(e){this.namedRafs_.has(e)&&(this.cancelAnimationFrame(this.namedRafs_.get(e)),this.namedRafs_.delete(e))}cancelAnimationFrame(e){return this.rafIds_.has(e)&&(this.rafIds_.delete(e),A().cancelAnimationFrame(e)),e}clearTimersOnDispose_(){this.clearingTimersOnDispose_||(this.clearingTimersOnDispose_=!0,this.one("dispose",()=>{[["namedRafs_","cancelNamedAnimationFrame"],["rafIds_","cancelAnimationFrame"],["setTimeoutIds_","clearTimeout"],["setIntervalIds_","clearInterval"]].forEach(([e,t])=>{this[e].forEach((i,s)=>this[t](s))}),this.clearingTimersOnDispose_=!1}))}getIsDisabled(){return!!this.el_.disabled}getIsExpresslyInert(){return this.el_.inert&&!this.el_.ownerDocument.documentElement.inert}getIsFocusable(e){return(e||this.el_).tabIndex>=0&&!(this.getIsDisabled()||this.getIsExpresslyInert())}getIsAvailableToBeFocused(e){function t(r){const a=A().getComputedStyle(r,null),l=a.getPropertyValue("visibility");return a.getPropertyValue("display")!=="none"&&!["hidden","collapse"].includes(l)}function i(r){return!(!t(r.parentElement)||!t(r)||r.style.opacity==="0"||A().getComputedStyle(r).height==="0px"||A().getComputedStyle(r).width==="0px")}function s(r){if(r.offsetWidth+r.offsetHeight+r.getBoundingClientRect().height+r.getBoundingClientRect().width===0)return!1;const a={x:r.getBoundingClientRect().left+r.offsetWidth/2,y:r.getBoundingClientRect().top+r.offsetHeight/2};if(a.x<0||a.x>(I().documentElement.clientWidth||A().innerWidth)||a.y<0||a.y>(I().documentElement.clientHeight||A().innerHeight))return!1;let l=I().elementFromPoint(a.x,a.y);for(;l;){if(l===r)return!0;if(l.parentNode)l=l.parentNode;else return!1}}return e||(e=this.el()),!!(s(e)&&i(e)&&(!e.parentElement||e.tabIndex>=0))}static registerComponent(e,t){if(typeof e!="string"||!e)throw new Error(`Illegal component name, "${e}"; must be a non-empty string.`);const i=q.getComponent("Tech"),s=i&&i.isTech(t),r=q===t||q.prototype.isPrototypeOf(t.prototype);if(s||!r){let l;throw s?l="techs must be registered using Tech.registerTech()":l="must be a Component subclass",new Error(`Illegal component, "${e}"; ${l}.`)}e=vt(e),q.components_||(q.components_={});const a=q.getComponent("Player");if(e==="Player"&&a&&a.players){const l=a.players,h=Object.keys(l);if(l&&h.length>0&&h.map(p=>l[p]).every(Boolean))throw new Error("Can not register Player component after player has been created.")}return q.components_[e]=t,q.components_[Ps(e)]=t,t}static getComponent(e){if(!(!e||!q.components_))return q.components_[e]}}q.registerComponent("Component",q);function lp(n,e,t){if(typeof e!="number"||e<0||e>t)throw new Error(`Failed to execute '${n}' on 'TimeRanges': The index provided (${e}) is non-numeric or out of bounds (0-${t}).`)}function Eu(n,e,t,i){return lp(n,i,t.length-1),t[i][e]}function ao(n){let e;return n===void 0||n.length===0?e={length:0,start(){throw new Error("This TimeRanges object is empty")},end(){throw new Error("This TimeRanges object is empty")}}:e={length:n.length,start:Eu.bind(null,"start",0,n),end:Eu.bind(null,"end",1,n)},A().Symbol&&A().Symbol.iterator&&(e[A().Symbol.iterator]=()=>(n||[]).values()),e}function mi(n,e){return Array.isArray(n)?ao(n):n===void 0||e===void 0?ao():ao([[n,e]])}const Tu=function(n,e){n=n<0?0:n;let t=Math.floor(n%60),i=Math.floor(n/60%60),s=Math.floor(n/3600);const r=Math.floor(e/60%60),a=Math.floor(e/3600);return(isNaN(n)||n===1/0)&&(s=i=t="-"),s=s>0||a>0?s+":":"",i=((s||r>=10)&&i<10?"0"+i:i)+":",t=t<10?"0"+t:t,s+i+t};let oo=Tu;function Cu(n){oo=n}function xu(){oo=Tu}function mn(n,e=n){return oo(n,e)}var up=Object.freeze({__proto__:null,createTimeRanges:mi,createTimeRange:mi,setFormatTime:Cu,resetFormatTime:xu,formatTime:mn});function Su(n,e){let t=0,i,s;if(!e)return 0;(!n||!n.length)&&(n=mi(0,0));for(let r=0;r<n.length;r++)i=n.start(r),s=n.end(r),s>e&&(s=e),t+=s-i;return t/e}function ft(n){if(n instanceof ft)return n;typeof n=="number"?this.code=n:typeof n=="string"?this.message=n:Ei(n)&&(typeof n.code=="number"&&(this.code=n.code),Object.assign(this,n)),this.message||(this.message=ft.defaultMessages[this.code]||"")}ft.prototype.code=0,ft.prototype.message="",ft.prototype.status=null,ft.prototype.metadata=null,ft.errorTypes=["MEDIA_ERR_CUSTOM","MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_ERR_ENCRYPTED"],ft.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail part-way.",3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",4:"The media could not be loaded, either because the server or network failed or because the format is not supported.",5:"The media is encrypted and we do not have the keys to decrypt it."},ft.MEDIA_ERR_CUSTOM=0,ft.prototype.MEDIA_ERR_CUSTOM=0,ft.MEDIA_ERR_ABORTED=1,ft.prototype.MEDIA_ERR_ABORTED=1,ft.MEDIA_ERR_NETWORK=2,ft.prototype.MEDIA_ERR_NETWORK=2,ft.MEDIA_ERR_DECODE=3,ft.prototype.MEDIA_ERR_DECODE=3,ft.MEDIA_ERR_SRC_NOT_SUPPORTED=4,ft.prototype.MEDIA_ERR_SRC_NOT_SUPPORTED=4,ft.MEDIA_ERR_ENCRYPTED=5,ft.prototype.MEDIA_ERR_ENCRYPTED=5;function Os(n){return n!=null&&typeof n.then=="function"}function xi(n){Os(n)&&n.then(null,e=>{})}const lo=function(n){return["kind","label","language","id","inBandMetadataTrackDispatchType","mode","src"].reduce((t,i,s)=>(n[i]&&(t[i]=n[i]),t),{cues:n.cues&&Array.prototype.map.call(n.cues,function(t){return{startTime:t.startTime,endTime:t.endTime,text:t.text,id:t.id}})})};var ju={textTracksToJson:function(n){const e=n.$$("track"),t=Array.prototype.map.call(e,s=>s.track);return Array.prototype.map.call(e,function(s){const r=lo(s.track);return s.src&&(r.src=s.src),r}).concat(Array.prototype.filter.call(n.textTracks(),function(s){return t.indexOf(s)===-1}).map(lo))},jsonToTextTracks:function(n,e){return n.forEach(function(t){const i=e.addRemoteTextTrack(t).track;!t.src&&t.cues&&t.cues.forEach(s=>i.addCue(s))}),e.textTracks()},trackToJson_:lo};const uo="vjs-modal-dialog";class Wn extends q{constructor(e,t){super(e,t),this.handleKeyDown_=i=>this.handleKeyDown(i),this.close_=i=>this.close(i),this.opened_=this.hasBeenOpened_=this.hasBeenFilled_=!1,this.closeable(!this.options_.uncloseable),this.content(this.options_.content),this.contentEl_=Le("div",{className:`${uo}-content`},{role:"document"}),this.descEl_=Le("p",{className:`${uo}-description vjs-control-text`,id:this.el().getAttribute("aria-describedby")}),Ki(this.descEl_,this.description()),this.el_.appendChild(this.descEl_),this.el_.appendChild(this.contentEl_)}createEl(){return super.createEl("div",{className:this.buildCSSClass(),tabIndex:-1},{"aria-describedby":`${this.id()}_description`,"aria-hidden":"true","aria-label":this.label(),role:"dialog","aria-live":"polite"})}dispose(){this.contentEl_=null,this.descEl_=null,this.previouslyActiveEl_=null,super.dispose()}buildCSSClass(){return`${uo} vjs-hidden ${super.buildCSSClass()}`}label(){return this.localize(this.options_.label||"Modal Window")}description(){let e=this.options_.description||this.localize("This is a modal window.");return this.closeable()&&(e+=" "+this.localize("This modal can be closed by pressing the Escape key or activating the close button.")),e}open(){if(this.opened_){this.options_.fillAlways&&this.fill();return}const e=this.player();this.trigger("beforemodalopen"),this.opened_=!0,(this.options_.fillAlways||!this.hasBeenOpened_&&!this.hasBeenFilled_)&&this.fill(),this.wasPlaying_=!e.paused(),this.options_.pauseOnOpen&&this.wasPlaying_&&e.pause(),this.on("keydown",this.handleKeyDown_),this.hadControls_=e.controls(),e.controls(!1),this.show(),this.conditionalFocus_(),this.el().setAttribute("aria-hidden","false"),this.trigger("modalopen"),this.hasBeenOpened_=!0}opened(e){return typeof e=="boolean"&&this[e?"open":"close"](),this.opened_}close(){if(!this.opened_)return;const e=this.player();this.trigger("beforemodalclose"),this.opened_=!1,this.wasPlaying_&&this.options_.pauseOnOpen&&e.play(),this.off("keydown",this.handleKeyDown_),this.hadControls_&&e.controls(!0),this.hide(),this.el().setAttribute("aria-hidden","true"),this.trigger({type:"modalclose",bubbles:!0}),this.conditionalBlur_(),this.options_.temporary&&this.dispose()}closeable(e){if(typeof e=="boolean"){const t=this.closeable_=!!e;let i=this.getChild("closeButton");if(t&&!i){const s=this.contentEl_;this.contentEl_=this.el_,i=this.addChild("closeButton",{controlText:"Close Modal Dialog"}),this.contentEl_=s,this.on(i,"close",this.close_)}!t&&i&&(this.off(i,"close",this.close_),this.removeChild(i),i.dispose())}return this.closeable_}fill(){this.fillWith(this.content())}fillWith(e){const t=this.contentEl(),i=t.parentNode,s=t.nextSibling;this.trigger("beforemodalfill"),this.hasBeenFilled_=!0,i.removeChild(t),this.empty(),uu(t,e),this.trigger("modalfill"),s?i.insertBefore(t,s):i.appendChild(t);const r=this.getChild("closeButton");r&&i.appendChild(r.el_),this.trigger("aftermodalfill")}empty(){this.trigger("beforemodalempty"),kr(this.contentEl()),this.trigger("modalempty")}content(e){return typeof e!="undefined"&&(this.content_=e),this.content_}conditionalFocus_(){const e=I().activeElement,t=this.player_.el_;this.previouslyActiveEl_=null,(t.contains(e)||t===e)&&(this.previouslyActiveEl_=e,this.focus())}conditionalBlur_(){this.previouslyActiveEl_&&(this.previouslyActiveEl_.focus(),this.previouslyActiveEl_=null)}handleKeyDown(e){if(this.trigger({type:"modalKeydown",originalEvent:e,target:this,bubbles:!0}),e.stopPropagation(),e.key==="Escape"&&this.closeable()){e.preventDefault(),this.close();return}if(e.key!=="Tab")return;const t=this.focusableEls_(),i=this.el_.querySelector(":focus");let s;for(let r=0;r<t.length;r++)if(i===t[r]){s=r;break}I().activeElement===this.el_&&(s=0),e.shiftKey&&s===0?(t[t.length-1].focus(),e.preventDefault()):!e.shiftKey&&s===t.length-1&&(t[0].focus(),e.preventDefault())}focusableEls_(){const e=this.el_.querySelectorAll("*");return Array.prototype.filter.call(e,t=>(t instanceof A().HTMLAnchorElement||t instanceof A().HTMLAreaElement)&&t.hasAttribute("href")||(t instanceof A().HTMLInputElement||t instanceof A().HTMLSelectElement||t instanceof A().HTMLTextAreaElement||t instanceof A().HTMLButtonElement)&&!t.hasAttribute("disabled")||t instanceof A().HTMLIFrameElement||t instanceof A().HTMLObjectElement||t instanceof A().HTMLEmbedElement||t.hasAttribute("tabindex")&&t.getAttribute("tabindex")!==-1||t.hasAttribute("contenteditable"))}}Wn.prototype.options_={pauseOnOpen:!0,temporary:!0},q.registerComponent("ModalDialog",Wn);class $n extends Kt{constructor(e=[]){super(),this.tracks_=[],Object.defineProperty(this,"length",{get(){return this.tracks_.length}});for(let t=0;t<e.length;t++)this.addTrack(e[t])}addTrack(e){const t=this.tracks_.length;""+t in this||Object.defineProperty(this,t,{get(){return this.tracks_[t]}}),this.tracks_.indexOf(e)===-1&&(this.tracks_.push(e),this.trigger({track:e,type:"addtrack",target:this})),e.labelchange_=()=>{this.trigger({track:e,type:"labelchange",target:this})},Fi(e)&&e.addEventListener("labelchange",e.labelchange_)}removeTrack(e){let t;for(let i=0,s=this.length;i<s;i++)if(this[i]===e){t=this[i],t.off&&t.off(),this.tracks_.splice(i,1);break}t&&this.trigger({track:t,type:"removetrack",target:this})}getTrackById(e){let t=null;for(let i=0,s=this.length;i<s;i++){const r=this[i];if(r.id===e){t=r;break}}return t}}$n.prototype.allowedEvents_={change:"change",addtrack:"addtrack",removetrack:"removetrack",labelchange:"labelchange"};for(const n in $n.prototype.allowedEvents_)$n.prototype["on"+n]=null;const co=function(n,e){for(let t=0;t<n.length;t++)!Object.keys(n[t]).length||e.id===n[t].id||(n[t].enabled=!1)};class cp extends $n{constructor(e=[]){for(let t=e.length-1;t>=0;t--)if(e[t].enabled){co(e,e[t]);break}super(e),this.changing_=!1}addTrack(e){e.enabled&&co(this,e),super.addTrack(e),e.addEventListener&&(e.enabledChange_=()=>{this.changing_||(this.changing_=!0,co(this,e),this.changing_=!1,this.trigger("change"))},e.addEventListener("enabledchange",e.enabledChange_))}removeTrack(e){super.removeTrack(e),e.removeEventListener&&e.enabledChange_&&(e.removeEventListener("enabledchange",e.enabledChange_),e.enabledChange_=null)}}const ho=function(n,e){for(let t=0;t<n.length;t++)!Object.keys(n[t]).length||e.id===n[t].id||(n[t].selected=!1)};class dp extends $n{constructor(e=[]){for(let t=e.length-1;t>=0;t--)if(e[t].selected){ho(e,e[t]);break}super(e),this.changing_=!1,Object.defineProperty(this,"selectedIndex",{get(){for(let t=0;t<this.length;t++)if(this[t].selected)return t;return-1},set(){}})}addTrack(e){e.selected&&ho(this,e),super.addTrack(e),e.addEventListener&&(e.selectedChange_=()=>{this.changing_||(this.changing_=!0,ho(this,e),this.changing_=!1,this.trigger("change"))},e.addEventListener("selectedchange",e.selectedChange_))}removeTrack(e){super.removeTrack(e),e.removeEventListener&&e.selectedChange_&&(e.removeEventListener("selectedchange",e.selectedChange_),e.selectedChange_=null)}}class wu extends $n{addTrack(e){super.addTrack(e),this.queueChange_||(this.queueChange_=()=>this.queueTrigger("change")),this.triggerSelectedlanguagechange||(this.triggerSelectedlanguagechange_=()=>this.trigger("selectedlanguagechange")),e.addEventListener("modechange",this.queueChange_),["metadata","chapters"].indexOf(e.kind)===-1&&e.addEventListener("modechange",this.triggerSelectedlanguagechange_)}removeTrack(e){super.removeTrack(e),e.removeEventListener&&(this.queueChange_&&e.removeEventListener("modechange",this.queueChange_),this.selectedlanguagechange_&&e.removeEventListener("modechange",this.triggerSelectedlanguagechange_))}}class hp{constructor(e=[]){this.trackElements_=[],Object.defineProperty(this,"length",{get(){return this.trackElements_.length}});for(let t=0,i=e.length;t<i;t++)this.addTrackElement_(e[t])}addTrackElement_(e){const t=this.trackElements_.length;""+t in this||Object.defineProperty(this,t,{get(){return this.trackElements_[t]}}),this.trackElements_.indexOf(e)===-1&&this.trackElements_.push(e)}getTrackElementByTrack_(e){let t;for(let i=0,s=this.trackElements_.length;i<s;i++)if(e===this.trackElements_[i].track){t=this.trackElements_[i];break}return t}removeTrackElement_(e){for(let t=0,i=this.trackElements_.length;t<i;t++)if(e===this.trackElements_[t]){this.trackElements_[t].track&&typeof this.trackElements_[t].track.off=="function"&&this.trackElements_[t].track.off(),typeof this.trackElements_[t].off=="function"&&this.trackElements_[t].off(),this.trackElements_.splice(t,1);break}}}class Mr{constructor(e){Mr.prototype.setCues_.call(this,e),Object.defineProperty(this,"length",{get(){return this.length_}})}setCues_(e){const t=this.length||0;let i=0;const s=e.length;this.cues_=e,this.length_=e.length;const r=function(a){""+a in this||Object.defineProperty(this,""+a,{get(){return this.cues_[a]}})};if(t<s)for(i=t;i<s;i++)r.call(this,i)}getCueById(e){let t=null;for(let i=0,s=this.length;i<s;i++){const r=this[i];if(r.id===e){t=r;break}}return t}}const fp={alternative:"alternative",captions:"captions",main:"main",sign:"sign",subtitles:"subtitles",commentary:"commentary"},pp={alternative:"alternative",descriptions:"descriptions",main:"main","main-desc":"main-desc",translation:"translation",commentary:"commentary"},mp={subtitles:"subtitles",captions:"captions",descriptions:"descriptions",chapters:"chapters",metadata:"metadata"},Bu={disabled:"disabled",hidden:"hidden",showing:"showing"};class fo extends Kt{constructor(e={}){super();const t={id:e.id||"vjs_track_"+ni(),kind:e.kind||"",language:e.language||""};let i=e.label||"";for(const s in t)Object.defineProperty(this,s,{get(){return t[s]},set(){}});Object.defineProperty(this,"label",{get(){return i},set(s){s!==i&&(i=s,this.trigger("labelchange"))}})}}const po=function(n){return new URL(n,I().baseURI)},Du=function(n){return new URL(n,I().baseURI).href},mo=function(n){if(typeof n=="string"){const t=/^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/.exec(n);if(t)return t.pop().toLowerCase()}return""},Nr=function(n,e=A().location){return po(n).origin!==e.origin};var gp=Object.freeze({__proto__:null,parseUrl:po,getAbsoluteURL:Du,getFileExtension:mo,isCrossOrigin:Nr});const ku=function(n,e){const t=new(A()).WebVTT.Parser(A(),A().vttjs,A().WebVTT.StringDecoder()),i=[];t.oncue=function(s){e.addCue(s)},t.onparsingerror=function(s){i.push(s)},t.onflush=function(){e.trigger({type:"loadeddata",target:e})},t.parse(n),i.length>0&&(A().console&&A().console.groupCollapsed&&A().console.groupCollapsed(`Text Track parsing errors for ${e.src}`),i.forEach(s=>He.error(s)),A().console&&A().console.groupEnd&&A().console.groupEnd()),t.flush()},Iu=function(n,e){const t={uri:n},i=Nr(n);i&&(t.cors=i);const s=e.tech_.crossOrigin()==="use-credentials";s&&(t.withCredentials=s),Z()(t,nt(this,function(r,a,l){if(r)return He.error(r,a);e.loaded_=!0,typeof A().WebVTT!="function"?e.tech_&&e.tech_.any(["vttjsloaded","vttjserror"],h=>{if(h.type==="vttjserror"){He.error(`vttjs failed to load, stopping trying to process ${e.src}`);return}return ku(l,e)}):ku(l,e)}))};class Ls extends fo{constructor(e={}){if(!e.tech)throw new Error("A tech was not provided.");const t=Ze(e,{kind:mp[e.kind]||"subtitles",language:e.language||e.srclang||""});let i=Bu[t.mode]||"disabled";const s=t.default;(t.kind==="metadata"||t.kind==="chapters")&&(i="hidden"),super(t),this.tech_=t.tech,this.cues_=[],this.activeCues_=[],this.preload_=this.tech_.preloadTextTracks!==!1;const r=new Mr(this.cues_),a=new Mr(this.activeCues_);let l=!1;this.timeupdateHandler=nt(this,function(p={}){if(!this.tech_.isDisposed()){if(!this.tech_.isReady_){p.type!=="timeupdate"&&(this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler));return}this.activeCues=this.activeCues,l&&(this.trigger("cuechange"),l=!1),p.type!=="timeupdate"&&(this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler))}});const h=()=>{this.stopTracking()};this.tech_.one("dispose",h),i!=="disabled"&&this.startTracking(),Object.defineProperties(this,{default:{get(){return s},set(){}},mode:{get(){return i},set(p){Bu[p]&&i!==p&&(i=p,!this.preload_&&i!=="disabled"&&this.cues.length===0&&Iu(this.src,this),this.stopTracking(),i!=="disabled"&&this.startTracking(),this.trigger("modechange"))}},cues:{get(){return this.loaded_?r:null},set(){}},activeCues:{get(){if(!this.loaded_)return null;if(this.cues.length===0)return a;const p=this.tech_.currentTime(),g=[];for(let y=0,w=this.cues.length;y<w;y++){const D=this.cues[y];D.startTime<=p&&D.endTime>=p&&g.push(D)}if(l=!1,g.length!==this.activeCues_.length)l=!0;else for(let y=0;y<g.length;y++)this.activeCues_.indexOf(g[y])===-1&&(l=!0);return this.activeCues_=g,a.setCues_(this.activeCues_),a},set(){}}}),t.src?(this.src=t.src,this.preload_||(this.loaded_=!0),(this.preload_||t.kind!=="subtitles"&&t.kind!=="captions")&&Iu(this.src,this)):this.loaded_=!0}startTracking(){this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler),this.tech_.on("timeupdate",this.timeupdateHandler)}stopTracking(){this.rvf_&&(this.tech_.cancelVideoFrameCallback(this.rvf_),this.rvf_=void 0),this.tech_.off("timeupdate",this.timeupdateHandler)}addCue(e){let t=e;if(!("getCueAsHTML"in t)){t=new(A()).vttjs.VTTCue(e.startTime,e.endTime,e.text);for(const s in e)s in t||(t[s]=e[s]);t.id=e.id,t.originalCue_=e}const i=this.tech_.textTracks();for(let s=0;s<i.length;s++)i[s]!==this&&i[s].removeCue(t);this.cues_.push(t),this.cues.setCues_(this.cues_)}removeCue(e){let t=this.cues_.length;for(;t--;){const i=this.cues_[t];if(i===e||i.originalCue_&&i.originalCue_===e){this.cues_.splice(t,1),this.cues.setCues_(this.cues_);break}}}}Ls.prototype.allowedEvents_={cuechange:"cuechange"};class Pu extends fo{constructor(e={}){const t=Ze(e,{kind:pp[e.kind]||""});super(t);let i=!1;Object.defineProperty(this,"enabled",{get(){return i},set(s){typeof s!="boolean"||s===i||(i=s,this.trigger("enabledchange"))}}),t.enabled&&(this.enabled=t.enabled),this.loaded_=!0}}class Ou extends fo{constructor(e={}){const t=Ze(e,{kind:fp[e.kind]||""});super(t);let i=!1;Object.defineProperty(this,"selected",{get(){return i},set(s){typeof s!="boolean"||s===i||(i=s,this.trigger("selectedchange"))}}),t.selected&&(this.selected=t.selected)}}class Vi extends Kt{constructor(e={}){super();let t;const i=new Ls(e);this.kind=i.kind,this.src=i.src,this.srclang=i.language,this.label=i.label,this.default=i.default,Object.defineProperties(this,{readyState:{get(){return t}},track:{get(){return i}}}),t=Vi.NONE,i.addEventListener("loadeddata",()=>{t=Vi.LOADED,this.trigger({type:"load",target:this})})}}Vi.prototype.allowedEvents_={load:"load"},Vi.NONE=0,Vi.LOADING=1,Vi.LOADED=2,Vi.ERROR=3;const ri={audio:{ListClass:cp,TrackClass:Pu,capitalName:"Audio"},video:{ListClass:dp,TrackClass:Ou,capitalName:"Video"},text:{ListClass:wu,TrackClass:Ls,capitalName:"Text"}};Object.keys(ri).forEach(function(n){ri[n].getterName=`${n}Tracks`,ri[n].privateName=`${n}Tracks_`});const Gn={remoteText:{ListClass:wu,TrackClass:Ls,capitalName:"RemoteText",getterName:"remoteTextTracks",privateName:"remoteTextTracks_"},remoteTextEl:{ListClass:hp,TrackClass:Vi,capitalName:"RemoteTextTrackEls",getterName:"remoteTextTrackEls",privateName:"remoteTextTrackEls_"}},Nt=Object.assign({},ri,Gn);Gn.names=Object.keys(Gn),ri.names=Object.keys(ri),Nt.names=[].concat(Gn.names).concat(ri.names);function vp(n,e,t,i,s={}){const r=n.textTracks();s.kind=e,t&&(s.label=t),i&&(s.language=i),s.tech=n;const a=new Nt.text.TrackClass(s);return r.addTrack(a),a}class Ve extends q{constructor(e={},t=function(){}){e.reportTouchActivity=!1,super(null,e,t),this.onDurationChange_=i=>this.onDurationChange(i),this.trackProgress_=i=>this.trackProgress(i),this.trackCurrentTime_=i=>this.trackCurrentTime(i),this.stopTrackingCurrentTime_=i=>this.stopTrackingCurrentTime(i),this.disposeSourceHandler_=i=>this.disposeSourceHandler(i),this.queuedHanders_=new Set,this.hasStarted_=!1,this.on("playing",function(){this.hasStarted_=!0}),this.on("loadstart",function(){this.hasStarted_=!1}),Nt.names.forEach(i=>{const s=Nt[i];e&&e[s.getterName]&&(this[s.privateName]=e[s.getterName])}),this.featuresProgressEvents||this.manualProgressOn(),this.featuresTimeupdateEvents||this.manualTimeUpdatesOn(),["Text","Audio","Video"].forEach(i=>{e[`native${i}Tracks`]===!1&&(this[`featuresNative${i}Tracks`]=!1)}),e.nativeCaptions===!1||e.nativeTextTracks===!1?this.featuresNativeTextTracks=!1:(e.nativeCaptions===!0||e.nativeTextTracks===!0)&&(this.featuresNativeTextTracks=!0),this.featuresNativeTextTracks||this.emulateTextTracks(),this.preloadTextTracks=e.preloadTextTracks!==!1,this.autoRemoteTextTracks_=new Nt.text.ListClass,this.initTrackListeners(),e.nativeControlsForTouch||this.emitTapEvents(),this.constructor&&(this.name_=this.constructor.name||"Unknown Tech")}triggerSourceset(e){this.isReady_||this.one("ready",()=>this.setTimeout(()=>this.triggerSourceset(e),1)),this.trigger({src:e,type:"sourceset"})}manualProgressOn(){this.on("durationchange",this.onDurationChange_),this.manualProgress=!0,this.one("ready",this.trackProgress_)}manualProgressOff(){this.manualProgress=!1,this.stopTrackingProgress(),this.off("durationchange",this.onDurationChange_)}trackProgress(e){this.stopTrackingProgress(),this.progressInterval=this.setInterval(nt(this,function(){const t=this.bufferedPercent();this.bufferedPercent_!==t&&this.trigger("progress"),this.bufferedPercent_=t,t===1&&this.stopTrackingProgress()}),500)}onDurationChange(e){this.duration_=this.duration()}buffered(){return mi(0,0)}bufferedPercent(){return Su(this.buffered(),this.duration_)}stopTrackingProgress(){this.clearInterval(this.progressInterval)}manualTimeUpdatesOn(){this.manualTimeUpdates=!0,this.on("play",this.trackCurrentTime_),this.on("pause",this.stopTrackingCurrentTime_)}manualTimeUpdatesOff(){this.manualTimeUpdates=!1,this.stopTrackingCurrentTime(),this.off("play",this.trackCurrentTime_),this.off("pause",this.stopTrackingCurrentTime_)}trackCurrentTime(){this.currentTimeInterval&&this.stopTrackingCurrentTime(),this.currentTimeInterval=this.setInterval(function(){this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},250)}stopTrackingCurrentTime(){this.clearInterval(this.currentTimeInterval),this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})}dispose(){this.clearTracks(ri.names),this.manualProgress&&this.manualProgressOff(),this.manualTimeUpdates&&this.manualTimeUpdatesOff(),super.dispose()}clearTracks(e){e=[].concat(e),e.forEach(t=>{const i=this[`${t}Tracks`]()||[];let s=i.length;for(;s--;){const r=i[s];t==="text"&&this.removeRemoteTextTrack(r),i.removeTrack(r)}})}cleanupAutoTextTracks(){const e=this.autoRemoteTextTracks_||[];let t=e.length;for(;t--;){const i=e[t];this.removeRemoteTextTrack(i)}}reset(){}crossOrigin(){}setCrossOrigin(){}error(e){return e!==void 0&&(this.error_=new ft(e),this.trigger("error")),this.error_}played(){return this.hasStarted_?mi(0,0):mi()}play(){}setScrubbing(e){}scrubbing(){}setCurrentTime(e){this.manualTimeUpdates&&this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})}initTrackListeners(){ri.names.forEach(e=>{const t=ri[e],i=()=>{this.trigger(`${e}trackchange`)},s=this[t.getterName]();s.addEventListener("removetrack",i),s.addEventListener("addtrack",i),this.on("dispose",()=>{s.removeEventListener("removetrack",i),s.removeEventListener("addtrack",i)})})}addWebVttScript_(){if(!A().WebVTT)if(I().body.contains(this.el())){if(!this.options_["vtt.js"]&&Rn(ye())&&Object.keys(ye()).length>0){this.trigger("vttjsloaded");return}const e=I().createElement("script");e.src=this.options_["vtt.js"]||"https://vjs.zencdn.net/vttjs/0.14.1/vtt.min.js",e.onload=()=>{this.trigger("vttjsloaded")},e.onerror=()=>{this.trigger("vttjserror")},this.on("dispose",()=>{e.onload=null,e.onerror=null}),A().WebVTT=!0,this.el().parentNode.appendChild(e)}else this.ready(this.addWebVttScript_)}emulateTextTracks(){const e=this.textTracks(),t=this.remoteTextTracks(),i=l=>e.addTrack(l.track),s=l=>e.removeTrack(l.track);t.on("addtrack",i),t.on("removetrack",s),this.addWebVttScript_();const r=()=>this.trigger("texttrackchange"),a=()=>{r();for(let l=0;l<e.length;l++){const h=e[l];h.removeEventListener("cuechange",r),h.mode==="showing"&&h.addEventListener("cuechange",r)}};a(),e.addEventListener("change",a),e.addEventListener("addtrack",a),e.addEventListener("removetrack",a),this.on("dispose",function(){t.off("addtrack",i),t.off("removetrack",s),e.removeEventListener("change",a),e.removeEventListener("addtrack",a),e.removeEventListener("removetrack",a);for(let l=0;l<e.length;l++)e[l].removeEventListener("cuechange",r)})}addTextTrack(e,t,i){if(!e)throw new Error("TextTrack kind is required but was not provided");return vp(this,e,t,i)}createRemoteTextTrack(e){const t=Ze(e,{tech:this});return new Gn.remoteTextEl.TrackClass(t)}addRemoteTextTrack(e={},t){const i=this.createRemoteTextTrack(e);return typeof t!="boolean"&&(t=!1),this.remoteTextTrackEls().addTrackElement_(i),this.remoteTextTracks().addTrack(i.track),t===!1&&this.ready(()=>this.autoRemoteTextTracks_.addTrack(i.track)),i}removeRemoteTextTrack(e){const t=this.remoteTextTrackEls().getTrackElementByTrack_(e);this.remoteTextTrackEls().removeTrackElement_(t),this.remoteTextTracks().removeTrack(e),this.autoRemoteTextTracks_.removeTrack(e)}getVideoPlaybackQuality(){return{}}requestPictureInPicture(){return Promise.reject()}disablePictureInPicture(){return!0}setDisablePictureInPicture(){}requestVideoFrameCallback(e){const t=ni();return!this.isReady_||this.paused()?(this.queuedHanders_.add(t),this.one("playing",()=>{this.queuedHanders_.has(t)&&(this.queuedHanders_.delete(t),e())})):this.requestNamedAnimationFrame(t,e),t}cancelVideoFrameCallback(e){this.queuedHanders_.has(e)?this.queuedHanders_.delete(e):this.cancelNamedAnimationFrame(e)}setPoster(){}playsinline(){}setPlaysinline(){}overrideNativeAudioTracks(e){}overrideNativeVideoTracks(e){}canPlayType(e){return""}static canPlayType(e){return""}static canPlaySource(e,t){return Ve.canPlayType(e.type)}static isTech(e){return e.prototype instanceof Ve||e instanceof Ve||e===Ve}static registerTech(e,t){if(Ve.techs_||(Ve.techs_={}),!Ve.isTech(t))throw new Error(`Tech ${e} must be a Tech`);if(!Ve.canPlayType)throw new Error("Techs must have a static canPlayType method on them");if(!Ve.canPlaySource)throw new Error("Techs must have a static canPlaySource method on them");return e=vt(e),Ve.techs_[e]=t,Ve.techs_[Ps(e)]=t,e!=="Tech"&&Ve.defaultTechOrder_.push(e),t}static getTech(e){if(e){if(Ve.techs_&&Ve.techs_[e])return Ve.techs_[e];if(e=vt(e),A()&&A().videojs&&A().videojs[e])return He.warn(`The ${e} tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)`),A().videojs[e]}}}Nt.names.forEach(function(n){const e=Nt[n];Ve.prototype[e.getterName]=function(){return this[e.privateName]=this[e.privateName]||new e.ListClass,this[e.privateName]}}),Ve.prototype.featuresVolumeControl=!0,Ve.prototype.featuresMuteControl=!0,Ve.prototype.featuresFullscreenResize=!1,Ve.prototype.featuresPlaybackRate=!1,Ve.prototype.featuresProgressEvents=!1,Ve.prototype.featuresSourceset=!1,Ve.prototype.featuresTimeupdateEvents=!1,Ve.prototype.featuresNativeTextTracks=!1,Ve.prototype.featuresVideoFrameCallback=!1,Ve.withSourceHandlers=function(n){n.registerSourceHandler=function(t,i){let s=n.sourceHandlers;s||(s=n.sourceHandlers=[]),i===void 0&&(i=s.length),s.splice(i,0,t)},n.canPlayType=function(t){const i=n.sourceHandlers||[];let s;for(let r=0;r<i.length;r++)if(s=i[r].canPlayType(t),s)return s;return""},n.selectSourceHandler=function(t,i){const s=n.sourceHandlers||[];let r;for(let a=0;a<s.length;a++)if(r=s[a].canHandleSource(t,i),r)return s[a];return null},n.canPlaySource=function(t,i){const s=n.selectSourceHandler(t,i);return s?s.canHandleSource(t,i):""},["seekable","seeking","duration"].forEach(function(t){const i=this[t];typeof i=="function"&&(this[t]=function(){return this.sourceHandler_&&this.sourceHandler_[t]?this.sourceHandler_[t].apply(this.sourceHandler_,arguments):i.apply(this,arguments)})},n.prototype),n.prototype.setSource=function(t){let i=n.selectSourceHandler(t,this.options_);i||(n.nativeSourceHandler?i=n.nativeSourceHandler:He.error("No source handler found for the current source.")),this.disposeSourceHandler(),this.off("dispose",this.disposeSourceHandler_),i!==n.nativeSourceHandler&&(this.currentSource_=t),this.sourceHandler_=i.handleSource(t,this,this.options_),this.one("dispose",this.disposeSourceHandler_)},n.prototype.disposeSourceHandler=function(){this.currentSource_&&(this.clearTracks(["audio","video"]),this.currentSource_=null),this.cleanupAutoTextTracks(),this.sourceHandler_&&(this.sourceHandler_.dispose&&this.sourceHandler_.dispose(),this.sourceHandler_=null)}},q.registerComponent("Tech",Ve),Ve.registerTech("Tech",Ve),Ve.defaultTechOrder_=[];const gn={},Ur={},Fr={};function Ap(n,e){gn[n]=gn[n]||[],gn[n].push(e)}function yp(n,e,t){n.setTimeout(()=>vn(e,gn[e.type],t,n),1)}function _p(n,e){n.forEach(t=>t.setTech&&t.setTech(e))}function bp(n,e,t){return n.reduceRight(go(t),e[t]())}function Ep(n,e,t,i){return e[t](n.reduce(go(t),i))}function Lu(n,e,t,i=null){const s="call"+vt(t),r=n.reduce(go(s),i),a=r===Fr,l=a?null:e[t](r);return xp(n,t,l,a),l}const Tp={buffered:1,currentTime:1,duration:1,muted:1,played:1,paused:1,seekable:1,volume:1,ended:1},Cp={setCurrentTime:1,setMuted:1,setVolume:1},Ru={play:1,pause:1};function go(n){return(e,t)=>e===Fr?Fr:t[n]?t[n](e):e}function xp(n,e,t,i){for(let s=n.length-1;s>=0;s--){const r=n[s];r[e]&&r[e](i,t)}}function Sp(n){Ur.hasOwnProperty(n.id())&&delete Ur[n.id()]}function jp(n,e){const t=Ur[n.id()];let i=null;if(t==null)return i=e(n),Ur[n.id()]=[[e,i]],i;for(let s=0;s<t.length;s++){const[r,a]=t[s];r===e&&(i=a)}return i===null&&(i=e(n),t.push([e,i])),i}function vn(n={},e=[],t,i,s=[],r=!1){const[a,...l]=e;if(typeof a=="string")vn(n,gn[a],t,i,s,r);else if(a){const h=jp(i,a);if(!h.setSource)return s.push(h),vn(n,l,t,i,s,r);h.setSource(Object.assign({},n),function(p,g){if(p)return vn(n,l,t,i,s,r);s.push(h),vn(g,n.type===g.type?l:gn[g.type],t,i,s,r)})}else l.length?vn(n,l,t,i,s,r):r?t(n,s):vn(n,gn["*"],t,i,s,!0)}const wp={opus:"video/ogg",ogv:"video/ogg",mp4:"video/mp4",mov:"video/mp4",m4v:"video/mp4",mkv:"video/x-matroska",m4a:"audio/mp4",mp3:"audio/mpeg",aac:"audio/aac",caf:"audio/x-caf",flac:"audio/flac",oga:"audio/ogg",wav:"audio/wav",m3u8:"application/x-mpegURL",mpd:"application/dash+xml",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",png:"image/png",svg:"image/svg+xml",webp:"image/webp"},Vr=function(n=""){const e=mo(n);return wp[e.toLowerCase()]||""},Bp=(n,e)=>{if(!e)return"";if(n.cache_.source.src===e&&n.cache_.source.type)return n.cache_.source.type;const t=n.cache_.sources.filter(s=>s.src===e);if(t.length)return t[0].type;const i=n.$$("source");for(let s=0;s<i.length;s++){const r=i[s];if(r.type&&r.src&&r.src===e)return r.type}return Vr(e)},Mu=function(n){if(Array.isArray(n)){let e=[];n.forEach(function(t){t=Mu(t),Array.isArray(t)?e=e.concat(t):Ei(t)&&e.push(t)}),n=e}else typeof n=="string"&&n.trim()?n=[Nu({src:n})]:Ei(n)&&typeof n.src=="string"&&n.src&&n.src.trim()?n=[Nu(n)]:n=[];return n};function Nu(n){if(!n.type){const e=Vr(n.src);e&&(n.type=e)}return n}var Dp=`<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <symbol viewBox="0 0 48 48" id="vjs-icon-play">
      <path d="M16 10v28l22-14z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-pause">
      <path d="M12 38h8V10h-8v28zm16-28v28h8V10h-8z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-audio">
      <path d="M24 2C14.06 2 6 10.06 6 20v14c0 3.31 2.69 6 6 6h6V24h-8v-4c0-7.73 6.27-14 14-14s14 6.27 14 14v4h-8v16h6c3.31 0 6-2.69 6-6V20c0-9.94-8.06-18-18-18z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-captions">
      <path d="M38 8H10c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM22 22h-3v-1h-4v6h4v-1h3v2a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2zm14 0h-3v-1h-4v6h4v-1h3v2a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-subtitles">
      <path d="M40 8H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM8 24h8v4H8v-4zm20 12H8v-4h20v4zm12 0h-8v-4h8v4zm0-8H20v-4h20v4z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-fullscreen-enter">
      <path d="M14 28h-4v10h10v-4h-6v-6zm-4-8h4v-6h6v-4H10v10zm24 14h-6v4h10V28h-4v6zm-6-24v4h6v6h4V10H28z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-fullscreen-exit">
      <path d="M10 32h6v6h4V28H10v4zm6-16h-6v4h10V10h-4v6zm12 22h4v-6h6v-4H28v10zm4-22v-6h-4v10h10v-4h-6z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-play-circle">
      <path d="M20 33l12-9-12-9v18zm4-29C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-volume-mute">
      <path d="M33 24c0-3.53-2.04-6.58-5-8.05v4.42l4.91 4.91c.06-.42.09-.85.09-1.28zm5 0c0 1.88-.41 3.65-1.08 5.28l3.03 3.03C41.25 29.82 42 27 42 24c0-8.56-5.99-15.72-14-17.54v4.13c5.78 1.72 10 7.07 10 13.41zM8.55 6L6 8.55 15.45 18H6v12h8l10 10V26.55l8.51 8.51c-1.34 1.03-2.85 1.86-4.51 2.36v4.13a17.94 17.94 0 0 0 7.37-3.62L39.45 42 42 39.45l-18-18L8.55 6zM24 8l-4.18 4.18L24 16.36V8z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-volume-low">
      <path d="M14 18v12h8l10 10V8L22 18h-8z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-volume-medium">
      <path d="M37 24c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zm-27-6v12h8l10 10V8L18 18h-8z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-volume-high">
      <path d="M6 18v12h8l10 10V8L14 18H6zm27 6c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zM28 6.46v4.13c5.78 1.72 10 7.07 10 13.41s-4.22 11.69-10 13.41v4.13c8.01-1.82 14-8.97 14-17.54S36.01 8.28 28 6.46z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-spinner">
      <path d="M18.8 21l9.53-16.51C26.94 4.18 25.49 4 24 4c-4.8 0-9.19 1.69-12.64 4.51l7.33 12.69.11-.2zm24.28-3c-1.84-5.85-6.3-10.52-11.99-12.68L23.77 18h19.31zm.52 2H28.62l.58 1 9.53 16.5C41.99 33.94 44 29.21 44 24c0-1.37-.14-2.71-.4-4zm-26.53 4l-7.8-13.5C6.01 14.06 4 18.79 4 24c0 1.37.14 2.71.4 4h14.98l-2.31-4zM4.92 30c1.84 5.85 6.3 10.52 11.99 12.68L24.23 30H4.92zm22.54 0l-7.8 13.51c1.4.31 2.85.49 4.34.49 4.8 0 9.19-1.69 12.64-4.51L29.31 26.8 27.46 30z"></path>
    </symbol>
    <symbol viewBox="0 0 24 24" id="vjs-icon-hd">
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11v6zm2-6h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-4V9zm1.5 4.5h2v-3h-2v3z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-chapters">
      <path d="M6 26h4v-4H6v4zm0 8h4v-4H6v4zm0-16h4v-4H6v4zm8 8h28v-4H14v4zm0 8h28v-4H14v4zm0-20v4h28v-4H14z"></path>
    </symbol>
    <symbol viewBox="0 0 40 40" id="vjs-icon-downloading">
      <path d="M18.208 36.875q-3.208-.292-5.979-1.729-2.771-1.438-4.812-3.729-2.042-2.292-3.188-5.229-1.146-2.938-1.146-6.23 0-6.583 4.334-11.416 4.333-4.834 10.833-5.5v3.166q-5.167.75-8.583 4.646Q6.25 14.75 6.25 19.958q0 5.209 3.396 9.104 3.396 3.896 8.562 4.646zM20 28.417L11.542 20l2.083-2.083 4.917 4.916v-11.25h2.916v11.25l4.875-4.916L28.417 20zm1.792 8.458v-3.167q1.833-.25 3.541-.958 1.709-.708 3.167-1.875l2.333 2.292q-1.958 1.583-4.25 2.541-2.291.959-4.791 1.167zm6.791-27.792q-1.541-1.125-3.25-1.854-1.708-.729-3.541-1.021V3.042q2.5.25 4.77 1.208 2.271.958 4.271 2.5zm4.584 21.584l-2.25-2.25q1.166-1.5 1.854-3.209.687-1.708.937-3.541h3.209q-.292 2.5-1.229 4.791-.938 2.292-2.521 4.209zm.541-12.417q-.291-1.833-.958-3.562-.667-1.73-1.833-3.188l2.375-2.208q1.541 1.916 2.458 4.208.917 2.292 1.167 4.75z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-file-download">
      <path d="M10.8 40.55q-1.35 0-2.375-1T7.4 37.15v-7.7h3.4v7.7h26.35v-7.7h3.4v7.7q0 1.4-1 2.4t-2.4 1zM24 32.1L13.9 22.05l2.45-2.45 5.95 5.95V7.15h3.4v18.4l5.95-5.95 2.45 2.45z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-file-download-done">
      <path d="M9.8 40.5v-3.45h28.4v3.45zm9.2-9.05L7.4 19.85l2.45-2.35L19 26.65l19.2-19.2 2.4 2.4z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-file-download-off">
      <path d="M4.9 4.75L43.25 43.1 41 45.3l-4.75-4.75q-.05.05-.075.025-.025-.025-.075-.025H10.8q-1.35 0-2.375-1T7.4 37.15v-7.7h3.4v7.7h22.05l-7-7-1.85 1.8L13.9 21.9l1.85-1.85L2.7 7zm26.75 14.7l2.45 2.45-3.75 3.8-2.45-2.5zM25.7 7.15V21.1l-3.4-3.45V7.15z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-share">
      <path d="M36 32.17c-1.52 0-2.89.59-3.93 1.54L17.82 25.4c.11-.45.18-.92.18-1.4s-.07-.95-.18-1.4l14.1-8.23c1.07 1 2.5 1.62 4.08 1.62 3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6c0 .48.07.95.18 1.4l-14.1 8.23c-1.07-1-2.5-1.62-4.08-1.62-3.31 0-6 2.69-6 6s2.69 6 6 6c1.58 0 3.01-.62 4.08-1.62l14.25 8.31c-.1.42-.16.86-.16 1.31A5.83 5.83 0 1 0 36 32.17z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-cog">
      <path d="M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97L29 4.84c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3a14.8 14.8 0 0 0-3.38 1.97L9.9 10.1a1 1 0 0 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31C9.06 22.69 9 23.34 9 24s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3a14.8 14.8 0 0 0 3.38-1.97l4.98 2.01a1 1 0 0 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zM24 31c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-square">
      <path d="M36 8H12c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm0 28H12V12h24v24z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-circle">
      <circle cx="24" cy="24" r="20"></circle>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-circle-outline">
      <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-circle-inner-circle">
      <path d="M24 4C12.97 4 4 12.97 4 24s8.97 20 20 20 20-8.97 20-20S35.03 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm6-16c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6 6 2.69 6 6z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-cancel">
      <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 27.17L31.17 34 24 26.83 16.83 34 14 31.17 21.17 24 14 16.83 16.83 14 24 21.17 31.17 14 34 16.83 26.83 24 34 31.17z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-replay">
      <path d="M24 10V2L14 12l10 10v-8c6.63 0 12 5.37 12 12s-5.37 12-12 12-12-5.37-12-12H8c0 8.84 7.16 16 16 16s16-7.16 16-16-7.16-16-16-16z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-repeat">
      <path d="M14 14h20v6l8-8-8-8v6H10v12h4v-8zm20 20H14v-6l-8 8 8 8v-6h24V26h-4v8z"></path>
    </symbol>
    <symbol viewBox="0 96 48 48" id="vjs-icon-replay-5">
      <path d="M17.689 98l-8.697 8.696 8.697 8.697 2.486-2.485-4.32-4.319h1.302c4.93 0 9.071 1.722 12.424 5.165 3.352 3.443 5.029 7.638 5.029 12.584h3.55c0-2.958-.553-5.73-1.658-8.313-1.104-2.583-2.622-4.841-4.555-6.774-1.932-1.932-4.19-3.45-6.773-4.555-2.584-1.104-5.355-1.657-8.313-1.657H15.5l4.615-4.615zm-8.08 21.659v13.861h11.357v5.008H9.609V143h12.7c.834 0 1.55-.298 2.146-.894.596-.597.895-1.31.895-2.145v-7.781c0-.835-.299-1.55-.895-2.147a2.929 2.929 0 0 0-2.147-.894h-8.227v-5.096H25.35v-4.384z"></path>
    </symbol>
    <symbol viewBox="0 96 48 48" id="vjs-icon-replay-10">
      <path d="M42.315 125.63c0-4.997-1.694-9.235-5.08-12.713-3.388-3.479-7.571-5.218-12.552-5.218h-1.315l4.363 4.363-2.51 2.51-8.787-8.786L25.221 97l2.45 2.45-4.662 4.663h1.375c2.988 0 5.788.557 8.397 1.673 2.61 1.116 4.892 2.65 6.844 4.602 1.953 1.953 3.487 4.234 4.602 6.844 1.116 2.61 1.674 5.41 1.674 8.398zM8.183 142v-19.657H3.176V117.8h9.643V142zm13.63 0c-1.156 0-2.127-.393-2.912-1.178-.778-.778-1.168-1.746-1.168-2.902v-16.04c0-1.156.393-2.127 1.178-2.912.779-.779 1.746-1.168 2.902-1.168h7.696c1.156 0 2.126.392 2.911 1.177.779.78 1.168 1.747 1.168 2.903v16.04c0 1.156-.392 2.127-1.177 2.912-.779.779-1.746 1.168-2.902 1.168zm.556-4.636h6.583v-15.02H22.37z"></path>
    </symbol>
    <symbol viewBox="0 96 48 48" id="vjs-icon-replay-30">
      <path d="M26.047 97l-8.733 8.732 8.733 8.733 2.496-2.494-4.336-4.338h1.307c4.95 0 9.108 1.73 12.474 5.187 3.367 3.458 5.051 7.668 5.051 12.635h3.565c0-2.97-.556-5.751-1.665-8.346-1.109-2.594-2.633-4.862-4.574-6.802-1.94-1.941-4.208-3.466-6.803-4.575-2.594-1.109-5.375-1.664-8.345-1.664H23.85l4.634-4.634zM2.555 117.531v4.688h10.297v5.25H5.873v4.687h6.979v5.156H2.555V142H13.36c1.061 0 1.95-.395 2.668-1.186.718-.79 1.076-1.772 1.076-2.94v-16.218c0-1.168-.358-2.149-1.076-2.94-.717-.79-1.607-1.185-2.668-1.185zm22.482.14c-1.149 0-2.11.39-2.885 1.165-.78.78-1.172 1.744-1.172 2.893v15.943c0 1.149.388 2.11 1.163 2.885.78.78 1.745 1.172 2.894 1.172h7.649c1.148 0 2.11-.388 2.884-1.163.78-.78 1.17-1.745 1.17-2.894v-15.943c0-1.15-.386-2.111-1.16-2.885-.78-.78-1.746-1.172-2.894-1.172zm.553 4.518h6.545v14.93H25.59z"></path>
    </symbol>
    <symbol viewBox="0 96 48 48" id="vjs-icon-forward-5">
      <path d="M29.508 97l-2.431 2.43 4.625 4.625h-1.364c-2.965 0-5.742.554-8.332 1.66-2.589 1.107-4.851 2.629-6.788 4.566-1.937 1.937-3.458 4.2-4.565 6.788-1.107 2.59-1.66 5.367-1.66 8.331h3.557c0-4.957 1.68-9.16 5.04-12.611 3.36-3.45 7.51-5.177 12.451-5.177h1.304l-4.326 4.33 2.49 2.49 8.715-8.716zm-9.783 21.61v13.89h11.382v5.018H19.725V142h12.727a2.93 2.93 0 0 0 2.15-.896 2.93 2.93 0 0 0 .896-2.15v-7.798c0-.837-.299-1.554-.896-2.152a2.93 2.93 0 0 0-2.15-.896h-8.245V123h11.29v-4.392z"></path>
    </symbol>
    <symbol viewBox="0 96 48 48" id="vjs-icon-forward-10">
      <path d="M23.119 97l-2.386 2.383 4.538 4.538h-1.339c-2.908 0-5.633.543-8.173 1.63-2.54 1.085-4.76 2.577-6.66 4.478-1.9 1.9-3.392 4.12-4.478 6.66-1.085 2.54-1.629 5.264-1.629 8.172h3.49c0-4.863 1.648-8.986 4.944-12.372 3.297-3.385 7.368-5.078 12.216-5.078h1.279l-4.245 4.247 2.443 2.442 8.55-8.55zm-9.52 21.45v4.42h4.871V142h4.513v-23.55zm18.136 0c-1.125 0-2.066.377-2.824 1.135-.764.764-1.148 1.709-1.148 2.834v15.612c0 1.124.38 2.066 1.139 2.824.764.764 1.708 1.145 2.833 1.145h7.489c1.125 0 2.066-.378 2.824-1.136.764-.764 1.145-1.709 1.145-2.833v-15.612c0-1.125-.378-2.067-1.136-2.825-.764-.764-1.708-1.145-2.833-1.145zm.54 4.42h6.408v14.617h-6.407z"></path>
    </symbol>
    <symbol viewBox="0 96 48 48" id="vjs-icon-forward-30">
      <path d="M25.549 97l-2.437 2.434 4.634 4.635H26.38c-2.97 0-5.753.555-8.347 1.664-2.594 1.109-4.861 2.633-6.802 4.574-1.94 1.94-3.465 4.207-4.574 6.802-1.109 2.594-1.664 5.377-1.664 8.347h3.565c0-4.967 1.683-9.178 5.05-12.636 3.366-3.458 7.525-5.187 12.475-5.187h1.307l-4.335 4.338 2.495 2.494 8.732-8.732zm-11.553 20.53v4.689h10.297v5.249h-6.978v4.688h6.978v5.156H13.996V142h10.808c1.06 0 1.948-.395 2.666-1.186.718-.79 1.077-1.771 1.077-2.94v-16.217c0-1.169-.36-2.15-1.077-2.94-.718-.79-1.605-1.186-2.666-1.186zm21.174.168c-1.149 0-2.11.389-2.884 1.163-.78.78-1.172 1.745-1.172 2.894v15.942c0 1.15.388 2.11 1.162 2.885.78.78 1.745 1.17 2.894 1.17h7.649c1.149 0 2.11-.386 2.885-1.16.78-.78 1.17-1.746 1.17-2.895v-15.942c0-1.15-.387-2.11-1.161-2.885-.78-.78-1.745-1.172-2.894-1.172zm.552 4.516h6.542v14.931h-6.542z"></path>
    </symbol>
    <symbol viewBox="0 0 512 512" id="vjs-icon-audio-description">
      <g fill-rule="evenodd"><path d="M227.29 381.351V162.993c50.38-1.017 89.108-3.028 117.631 17.126 27.374 19.342 48.734 56.965 44.89 105.325-4.067 51.155-41.335 94.139-89.776 98.475-24.085 2.155-71.972 0-71.972 0s-.84-1.352-.773-2.568m48.755-54.804c31.43 1.26 53.208-16.633 56.495-45.386 4.403-38.51-21.188-63.552-58.041-60.796v103.612c-.036 1.466.575 2.22 1.546 2.57"></path><path d="M383.78 381.328c13.336 3.71 17.387-11.06 23.215-21.408 12.722-22.571 22.294-51.594 22.445-84.774.221-47.594-18.343-82.517-35.6-106.182h-8.51c-.587 3.874 2.226 7.315 3.865 10.276 13.166 23.762 25.367 56.553 25.54 94.194.2 43.176-14.162 79.278-30.955 107.894"></path><path d="M425.154 381.328c13.336 3.71 17.384-11.061 23.215-21.408 12.721-22.571 22.291-51.594 22.445-84.774.221-47.594-18.343-82.517-35.6-106.182h-8.511c-.586 3.874 2.226 7.315 3.866 10.276 13.166 23.762 25.367 56.553 25.54 94.194.2 43.176-14.162 79.278-30.955 107.894"></path><path d="M466.26 381.328c13.337 3.71 17.385-11.061 23.216-21.408 12.722-22.571 22.292-51.594 22.445-84.774.221-47.594-18.343-82.517-35.6-106.182h-8.51c-.587 3.874 2.225 7.315 3.865 10.276 13.166 23.762 25.367 56.553 25.54 94.194.2 43.176-14.162 79.278-30.955 107.894M4.477 383.005H72.58l18.573-28.484 64.169-.135s.065 19.413.065 28.62h48.756V160.307h-58.816c-5.653 9.537-140.85 222.697-140.85 222.697zm152.667-145.282v71.158l-40.453-.27 40.453-70.888z"></path></g>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-next-item">
      <path d="M12 36l17-12-17-12v24zm20-24v24h4V12h-4z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-previous-item">
      <path d="M12 12h4v24h-4zm7 12l17 12V12z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-shuffle">
      <path d="M21.17 18.34L10.83 8 8 10.83l10.34 10.34 2.83-2.83zM29 8l4.09 4.09L8 37.17 10.83 40l25.09-25.09L40 19V8H29zm.66 18.83l-2.83 2.83 6.26 6.26L29 40h11V29l-4.09 4.09-6.25-6.26z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-cast">
      <path d="M42 6H6c-2.21 0-4 1.79-4 4v6h4v-6h36v28H28v4h14c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM2 36v6h6c0-3.31-2.69-6-6-6zm0-8v4c5.52 0 10 4.48 10 10h4c0-7.73-6.27-14-14-14zm0-8v4c9.94 0 18 8.06 18 18h4c0-12.15-9.85-22-22-22z"></path>
    </symbol>
    <symbol viewBox="0 0 48 48" id="vjs-icon-picture-in-picture-enter">
      <path d="M38 22H22v11.99h16V22zm8 16V9.96C46 7.76 44.2 6 42 6H6C3.8 6 2 7.76 2 9.96V38c0 2.2 1.8 4 4 4h36c2.2 0 4-1.8 4-4zm-4 .04H6V9.94h36v28.1z"></path>
    </symbol>
    <symbol viewBox="0 0 22 18" id="vjs-icon-picture-in-picture-exit">
      <path d="M18 4H4v10h14V4zm4 12V1.98C22 .88 21.1 0 20 0H2C.9 0 0 .88 0 1.98V16c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H2V1.97h18v14.05z"></path>
      <path fill="none" d="M-1-3h24v24H-1z"></path>
    </symbol>
    <symbol viewBox="0 0 1792 1792" id="vjs-icon-facebook">
      <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759H734V905H479V609h255V391q0-186 104-288.5T1115 0q147 0 228 12z"></path>
    </symbol>
    <symbol viewBox="0 0 1792 1792" id="vjs-icon-linkedin">
      <path d="M477 625v991H147V625h330zm21-306q1 73-50.5 122T312 490h-2q-82 0-132-49t-50-122q0-74 51.5-122.5T314 148t133 48.5T498 319zm1166 729v568h-329v-530q0-105-40.5-164.5T1168 862q-63 0-105.5 34.5T999 982q-11 30-11 81v553H659q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5T1285 602q171 0 275 113.5t104 332.5z"></path>
    </symbol>
    <symbol viewBox="0 0 1200 1227" id="vjs-icon-twitter">
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/>
    </symbol>
    <symbol viewBox="0 0 1792 1792" id="vjs-icon-tumblr">
      <path d="M1328 1329l80 237q-23 35-111 66t-177 32q-104 2-190.5-26T787 1564t-95-106-55.5-120-16.5-118V676H452V461q72-26 129-69.5t91-90 58-102 34-99T779 12q1-5 4.5-8.5T791 0h244v424h333v252h-334v518q0 30 6.5 56t22.5 52.5 49.5 41.5 81.5 14q78-2 134-29z"></path>
    </symbol>
    <symbol viewBox="0 0 1792 1792" id="vjs-icon-pinterest">
      <path d="M1664 896q0 209-103 385.5T1281.5 1561 896 1664q-111 0-218-32 59-93 78-164 9-34 54-211 20 39 73 67.5t114 28.5q121 0 216-68.5t147-188.5 52-270q0-114-59.5-214T1180 449t-255-63q-105 0-196 29t-154.5 77-109 110.5-67 129.5T377 866q0 104 40 183t117 111q30 12 38-20 2-7 8-31t8-30q6-23-11-43-51-61-51-151 0-151 104.5-259.5T904 517q151 0 235.5 82t84.5 213q0 170-68.5 289T980 1220q-61 0-98-43.5T859 1072q8-35 26.5-93.5t30-103T927 800q0-50-27-83t-77-33q-62 0-105 57t-43 142q0 73 25 122l-99 418q-17 70-13 177-206-91-333-281T128 896q0-209 103-385.5T510.5 231 896 128t385.5 103T1561 510.5 1664 896z"></path>
    </symbol>
  </defs>
</svg>`;const Uu=Cr?10009:xr?461:8,Yn={codes:{play:415,pause:19,ff:417,rw:412,back:Uu},names:{415:"play",19:"pause",417:"ff",412:"rw",[Uu]:"back"},isEventKey(n,e){return e=e.toLowerCase(),!!(this.names[n.keyCode]&&this.names[n.keyCode]===e)},getEventName(n){if(this.names[n.keyCode])return this.names[n.keyCode];if(this.codes[n.code]){const e=this.codes[n.code];return this.names[e]}return null}},Fu=5;class kp extends Kt{constructor(e){super(),this.player_=e,this.focusableComponents=[],this.isListening_=!1,this.isPaused_=!1,this.onKeyDown_=this.onKeyDown_.bind(this),this.lastFocusedComponent_=null}start(){this.isListening_||(this.player_.on("keydown",this.onKeyDown_),this.player_.on("modalKeydown",this.onKeyDown_),this.player_.on("loadedmetadata",()=>{this.focus(this.updateFocusableComponents()[0])}),this.player_.on("modalclose",()=>{this.refocusComponent()}),this.player_.on("focusin",this.handlePlayerFocus_.bind(this)),this.player_.on("focusout",this.handlePlayerBlur_.bind(this)),this.isListening_=!0,this.player_.errorDisplay&&this.player_.errorDisplay.on("aftermodalfill",()=>{this.updateFocusableComponents(),this.focusableComponents.length&&(this.focusableComponents.length>1?this.focusableComponents[1].focus():this.focusableComponents[0].focus())}))}stop(){this.player_.off("keydown",this.onKeyDown_),this.isListening_=!1}onKeyDown_(e){const t=e.originalEvent?e.originalEvent:e;if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(t.key)){if(this.isPaused_)return;t.preventDefault();const i=t.key.substring(5).toLowerCase();this.move(i)}else if(Yn.isEventKey(t,"play")||Yn.isEventKey(t,"pause")||Yn.isEventKey(t,"ff")||Yn.isEventKey(t,"rw")){t.preventDefault();const i=Yn.getEventName(t);this.performMediaAction_(i)}else Yn.isEventKey(t,"Back")&&e.target&&typeof e.target.closeable=="function"&&e.target.closeable()&&(t.preventDefault(),e.target.close())}performMediaAction_(e){if(this.player_)switch(e){case"play":this.player_.paused()&&this.player_.play();break;case"pause":this.player_.paused()||this.player_.pause();break;case"ff":this.userSeek_(this.player_.currentTime()+Fu);break;case"rw":this.userSeek_(this.player_.currentTime()-Fu);break}}userSeek_(e){this.player_.liveTracker&&this.player_.liveTracker.isLive()&&this.player_.liveTracker.nextSeekedFromUser(),this.player_.currentTime(e)}pause(){this.isPaused_=!0}resume(){this.isPaused_=!1}handlePlayerBlur_(e){const t=e.relatedTarget;let i=null;const s=this.getCurrentComponent(e.target);t&&(i=!!t.closest(".video-js"),t.classList.contains("vjs-text-track-settings")&&!this.isPaused_&&this.searchForTrackSelect_()),(!e.currentTarget.contains(e.relatedTarget)&&!i||!t)&&(s&&s.name()==="CloseButton"?this.refocusComponent():(this.pause(),s&&s.el()&&(this.lastFocusedComponent_=s)))}handlePlayerFocus_(){this.getCurrentComponent()&&this.getCurrentComponent().getIsFocusable()&&this.resume()}updateFocusableComponents(){const e=this.player_,t=[];function i(s){for(const r of s)r.hasOwnProperty("el_")&&r.getIsFocusable()&&r.getIsAvailableToBeFocused(r.el())&&t.push(r),r.hasOwnProperty("children_")&&r.children_.length>0&&i(r.children_)}return e.children_.forEach(s=>{if(s.hasOwnProperty("el_"))if(s.getIsFocusable&&s.getIsAvailableToBeFocused&&s.getIsFocusable()&&s.getIsAvailableToBeFocused(s.el())){t.push(s);return}else s.hasOwnProperty("children_")&&s.children_.length>0?i(s.children_):s.hasOwnProperty("items")&&s.items.length>0?i(s.items):this.findSuitableDOMChild(s)&&t.push(s);if(s.name_==="ErrorDisplay"&&s.opened_){const r=s.el_.querySelector(".vjs-errors-ok-button-container");r&&r.querySelectorAll("button").forEach((l,h)=>{t.push({name:()=>"ModalButton"+(h+1),el:()=>l,getPositions:()=>{const p=l.getBoundingClientRect(),g={x:p.x,y:p.y,width:p.width,height:p.height,top:p.top,right:p.right,bottom:p.bottom,left:p.left},y={x:p.left+p.width/2,y:p.top+p.height/2,width:0,height:0,top:p.top+p.height/2,right:p.left+p.width/2,bottom:p.top+p.height/2,left:p.left+p.width/2};return{boundingClientRect:g,center:y}},getIsAvailableToBeFocused:()=>!0,getIsFocusable:p=>!0,focus:()=>l.focus()})})}}),this.focusableComponents=t,this.focusableComponents}findSuitableDOMChild(e){function t(i){if(e.getIsFocusable(i)&&e.getIsAvailableToBeFocused(i))return i;for(let s=0;s<i.children.length;s++){const r=i.children[s],a=t(r);if(a)return a}return null}return e.el()?t(e.el()):null}getCurrentComponent(e){this.updateFocusableComponents();const t=e||document.activeElement;if(this.focusableComponents.length){for(const i of this.focusableComponents)if(i.el()===t)return i}}add(e){const t=[...this.focusableComponents];e.hasOwnProperty("el_")&&e.getIsFocusable()&&e.getIsAvailableToBeFocused(e.el())&&t.push(e),this.focusableComponents=t,this.trigger({type:"focusableComponentsChanged",focusableComponents:this.focusableComponents})}remove(e){for(let t=0;t<this.focusableComponents.length;t++)if(this.focusableComponents[t].name()===e.name()){this.focusableComponents.splice(t,1),this.trigger({type:"focusableComponentsChanged",focusableComponents:this.focusableComponents});return}}clear(){this.focusableComponents.length>0&&(this.focusableComponents=[],this.trigger({type:"focusableComponentsChanged",focusableComponents:this.focusableComponents}))}move(e){const t=this.getCurrentComponent();if(!t)return;const i=t.getPositions(),s=this.focusableComponents.filter(a=>a!==t&&this.isInDirection_(i.boundingClientRect,a.getPositions().boundingClientRect,e)),r=this.findBestCandidate_(i.center,s,e);r?this.focus(r):this.trigger({type:"endOfFocusableComponents",direction:e,focusedComponent:t})}findBestCandidate_(e,t,i){let s=1/0,r=null;for(const a of t){const l=a.getPositions().center,h=this.calculateDistance_(e,l,i);h<s&&(s=h,r=a)}return r}isInDirection_(e,t,i){switch(i){case"right":return t.left>=e.right;case"left":return t.right<=e.left;case"down":return t.top>=e.bottom;case"up":return t.bottom<=e.top;default:return!1}}refocusComponent(){if(this.lastFocusedComponent_){this.player_.userActive()||this.player_.userActive(!0),this.updateFocusableComponents();for(let e=0;e<this.focusableComponents.length;e++)if(this.focusableComponents[e].name()===this.lastFocusedComponent_.name()){this.focus(this.focusableComponents[e]);return}}else this.focus(this.updateFocusableComponents()[0])}focus(e){typeof e=="object"&&(e.getIsAvailableToBeFocused(e.el())?e.focus():this.findSuitableDOMChild(e)&&this.findSuitableDOMChild(e).focus())}calculateDistance_(e,t,i){const s=Math.abs(e.x-t.x),r=Math.abs(e.y-t.y);let a;switch(i){case"right":case"left":a=s+r*100;break;case"up":a=r*2+s*.5;break;case"down":a=r*5+s;break;default:a=s+r}return a}searchForTrackSelect_(){const e=this;for(const t of e.updateFocusableComponents())if(t.constructor.name==="TextTrackSelect"){e.focus(t);break}}}class Ip extends q{constructor(e,t,i){const s=Ze({createEl:!1},t);if(super(e,s,i),!t.playerOptions.sources||t.playerOptions.sources.length===0)for(let r=0,a=t.playerOptions.techOrder;r<a.length;r++){const l=vt(a[r]);let h=Ve.getTech(l);if(l||(h=q.getComponent(l)),h&&h.isSupported()){e.loadTech_(l);break}}else e.src(t.playerOptions.sources)}}q.registerComponent("MediaLoader",Ip);class zr extends q{constructor(e,t){super(e,t),this.options_.controlText&&this.controlText(this.options_.controlText),this.handleMouseOver_=i=>this.handleMouseOver(i),this.handleMouseOut_=i=>this.handleMouseOut(i),this.handleClick_=i=>this.handleClick(i),this.handleKeyDown_=i=>this.handleKeyDown(i),this.emitTapEvents(),this.enable()}createEl(e="div",t={},i={}){t=Object.assign({className:this.buildCSSClass(),tabIndex:0},t),e==="button"&&He.error(`Creating a ClickableComponent with an HTML element of ${e} is not supported; use a Button instead.`),i=Object.assign({role:"button"},i),this.tabIndex_=t.tabIndex;const s=Le(e,t,i);return this.player_.options_.experimentalSvgIcons||s.appendChild(Le("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),this.createControlTextEl(s),s}dispose(){this.controlTextEl_=null,super.dispose()}createControlTextEl(e){return this.controlTextEl_=Le("span",{className:"vjs-control-text"},{"aria-live":"polite"}),e&&e.appendChild(this.controlTextEl_),this.controlText(this.controlText_,e),this.controlTextEl_}controlText(e,t=this.el()){if(e===void 0)return this.controlText_||"Need Text";const i=this.localize(e);this.controlText_=e,Ki(this.controlTextEl_,i),!this.nonIconControl&&!this.player_.options_.noUITitleAttributes&&t.setAttribute("title",i)}buildCSSClass(){return`vjs-control vjs-button ${super.buildCSSClass()}`}enable(){this.enabled_||(this.enabled_=!0,this.removeClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","false"),typeof this.tabIndex_!="undefined"&&this.el_.setAttribute("tabIndex",this.tabIndex_),this.on(["tap","click"],this.handleClick_),this.on("keydown",this.handleKeyDown_))}disable(){this.enabled_=!1,this.addClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","true"),typeof this.tabIndex_!="undefined"&&this.el_.removeAttribute("tabIndex"),this.off("mouseover",this.handleMouseOver_),this.off("mouseout",this.handleMouseOut_),this.off(["tap","click"],this.handleClick_),this.off("keydown",this.handleKeyDown_)}handleLanguagechange(){this.controlText(this.controlText_)}handleClick(e){this.options_.clickHandler&&this.options_.clickHandler.call(this,arguments)}handleKeyDown(e){e.key===" "||e.key==="Enter"?(e.preventDefault(),e.stopPropagation(),this.trigger("click")):super.handleKeyDown(e)}}q.registerComponent("ClickableComponent",zr);class vo extends zr{constructor(e,t){super(e,t),this.update(),this.update_=i=>this.update(i),e.on("posterchange",this.update_)}dispose(){this.player().off("posterchange",this.update_),super.dispose()}createEl(){return Le("div",{className:"vjs-poster"})}crossOrigin(e){if(typeof e=="undefined")return this.$("img")?this.$("img").crossOrigin:this.player_.tech_&&this.player_.tech_.isReady_?this.player_.crossOrigin():this.player_.options_.crossOrigin||this.player_.options_.crossorigin||null;if(e!==null&&e!=="anonymous"&&e!=="use-credentials"){this.player_.log.warn(`crossOrigin must be null,  "anonymous" or "use-credentials", given "${e}"`);return}this.$("img")&&(this.$("img").crossOrigin=e)}update(e){const t=this.player().poster();this.setSrc(t),t?this.show():this.hide()}setSrc(e){if(!e){this.el_.textContent="";return}this.$("img")||this.el_.appendChild(Le("picture",{className:"vjs-poster",tabIndex:-1},{},Le("img",{loading:"lazy",crossOrigin:this.crossOrigin()},{alt:""}))),this.$("img").src=e}handleClick(e){this.player_.controls()&&(this.player_.tech(!0)&&this.player_.tech(!0).focus(),this.player_.paused()?xi(this.player_.play()):this.player_.pause())}}vo.prototype.crossorigin=vo.prototype.crossOrigin,q.registerComponent("PosterImage",vo);const ai="#222",Vu="#ccc",Pp={monospace:"monospace",sansSerif:"sans-serif",serif:"serif",monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace',monospaceSerif:'"Courier New", monospace',proportionalSansSerif:"sans-serif",proportionalSerif:"serif",casual:'"Comic Sans MS", Impact, fantasy',script:'"Monotype Corsiva", cursive',smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'};function Ao(n,e){let t;if(n.length===4)t=n[1]+n[1]+n[2]+n[2]+n[3]+n[3];else if(n.length===7)t=n.slice(1);else throw new Error("Invalid color code provided, "+n+"; must be formatted as e.g. #f0e or #f604e2.");return"rgba("+parseInt(t.slice(0,2),16)+","+parseInt(t.slice(2,4),16)+","+parseInt(t.slice(4,6),16)+","+e+")"}function Si(n,e,t){try{n.style[e]=t}catch(i){return}}function zu(n){return n?`${n}px`:""}class Op extends q{constructor(e,t,i){super(e,t,i);const s=a=>this.updateDisplay(a),r=a=>{this.updateDisplayOverlay(),this.updateDisplay(a)};e.on("loadstart",a=>this.toggleDisplay(a)),e.on("texttrackchange",s),e.on("loadedmetadata",a=>{this.updateDisplayOverlay(),this.preselectTrack(a)}),e.ready(nt(this,function(){if(e.tech_&&e.tech_.featuresNativeTextTracks){this.hide();return}e.on("fullscreenchange",r),e.on("playerresize",r);const a=A().screen.orientation||A(),l=A().screen.orientation?"change":"orientationchange";a.addEventListener(l,r),e.on("dispose",()=>a.removeEventListener(l,r));const h=this.options_.playerOptions.tracks||[];for(let p=0;p<h.length;p++)this.player_.addRemoteTextTrack(h[p],!0);this.preselectTrack()}))}preselectTrack(){const e={captions:1,subtitles:1},t=this.player_.textTracks(),i=this.player_.cache_.selectedLanguage;let s,r,a;for(let l=0;l<t.length;l++){const h=t[l];i&&i.enabled&&i.language&&i.language===h.language&&h.kind in e?h.kind===i.kind?a=h:a||(a=h):i&&!i.enabled?(a=null,s=null,r=null):h.default&&(h.kind==="descriptions"&&!s?s=h:h.kind in e&&!r&&(r=h))}a?a.mode="showing":r?r.mode="showing":s&&(s.mode="showing")}toggleDisplay(){this.player_.tech_&&this.player_.tech_.featuresNativeTextTracks?this.hide():this.show()}createEl(){return super.createEl("div",{className:"vjs-text-track-display"},{translate:"yes","aria-live":"off","aria-atomic":"true"})}clearDisplay(){typeof A().WebVTT=="function"&&A().WebVTT.processCues(A(),[],this.el_)}updateDisplay(){const e=this.player_.textTracks(),t=this.options_.allowMultipleShowingTracks;if(this.clearDisplay(),t){const a=[];for(let l=0;l<e.length;++l){const h=e[l];h.mode==="showing"&&a.push(h)}this.updateForTrack(a);return}let i=null,s=null,r=e.length;for(;r--;){const a=e[r];a.mode==="showing"&&(a.kind==="descriptions"?i=a:s=a)}if(s?(this.getAttribute("aria-live")!=="off"&&this.setAttribute("aria-live","off"),this.updateForTrack(s)):i&&(this.getAttribute("aria-live")!=="assertive"&&this.setAttribute("aria-live","assertive"),this.updateForTrack(i)),!A().CSS.supports("inset","10px")){const a=this.el_,l=a.querySelectorAll(".vjs-text-track-cue"),h=this.player_.controlBar.el_.getBoundingClientRect().height,p=this.player_.el_.getBoundingClientRect().height;a.style="",Si(a,"position","relative"),Si(a,"height",p-h+"px"),Si(a,"top","unset"),Sr?Si(a,"bottom",p+"px"):Si(a,"bottom","0px"),l.length>0&&l.forEach(g=>{if(g.style.inset){const y=g.style.inset.split(" ");y.length===3&&Object.assign(g.style,{top:y[0],right:y[1],bottom:y[2],left:"unset"})}})}}updateDisplayOverlay(){if(!this.player_.videoHeight()||!A().CSS.supports("inset-inline: 10px"))return;const e=this.player_.currentWidth(),t=this.player_.currentHeight(),i=e/t,s=this.player_.videoWidth()/this.player_.videoHeight();let r=0,a=0;Math.abs(i-s)>.1&&(i>s?r=Math.round((e-t*s)/2):a=Math.round((t-e/s)/2)),Si(this.el_,"insetInline",zu(r)),Si(this.el_,"insetBlock",zu(a))}updateDisplayState(e){const t=this.player_.textTrackSettings.getValues(),i=e.activeCues;let s=i.length;for(;s--;){const r=i[s];if(!r)continue;const a=r.displayState;if(t.color&&(a.firstChild.style.color=t.color),t.textOpacity&&Si(a.firstChild,"color",Ao(t.color||"#fff",t.textOpacity)),t.backgroundColor&&(a.firstChild.style.backgroundColor=t.backgroundColor),t.backgroundOpacity&&Si(a.firstChild,"backgroundColor",Ao(t.backgroundColor||"#000",t.backgroundOpacity)),t.windowColor&&(t.windowOpacity?Si(a,"backgroundColor",Ao(t.windowColor,t.windowOpacity)):a.style.backgroundColor=t.windowColor),t.edgeStyle&&(t.edgeStyle==="dropshadow"?a.firstChild.style.textShadow=`2px 2px 3px ${ai}, 2px 2px 4px ${ai}, 2px 2px 5px ${ai}`:t.edgeStyle==="raised"?a.firstChild.style.textShadow=`1px 1px ${ai}, 2px 2px ${ai}, 3px 3px ${ai}`:t.edgeStyle==="depressed"?a.firstChild.style.textShadow=`1px 1px ${Vu}, 0 1px ${Vu}, -1px -1px ${ai}, 0 -1px ${ai}`:t.edgeStyle==="uniform"&&(a.firstChild.style.textShadow=`0 0 4px ${ai}, 0 0 4px ${ai}, 0 0 4px ${ai}, 0 0 4px ${ai}`)),t.fontPercent&&t.fontPercent!==1){const l=A().parseFloat(a.style.fontSize);a.style.fontSize=l*t.fontPercent+"px",a.style.height="auto",a.style.top="auto"}t.fontFamily&&t.fontFamily!=="default"&&(t.fontFamily==="small-caps"?a.firstChild.style.fontVariant="small-caps":a.firstChild.style.fontFamily=Pp[t.fontFamily])}}updateForTrack(e){if(Array.isArray(e)||(e=[e]),typeof A().WebVTT!="function"||e.every(i=>!i.activeCues))return;const t=[];for(let i=0;i<e.length;++i){const s=e[i];for(let r=0;r<s.activeCues.length;++r)t.push(s.activeCues[r])}A().WebVTT.processCues(A(),t,this.el_);for(let i=0;i<e.length;++i){const s=e[i];for(let r=0;r<s.activeCues.length;++r){const a=s.activeCues[r].displayState;fn(a,"vjs-text-track-cue","vjs-text-track-cue-"+(s.language?s.language:i)),s.language&&Vn(a,"lang",s.language)}this.player_.textTrackSettings&&this.updateDisplayState(s)}}}q.registerComponent("TextTrackDisplay",Op);class Lp extends q{createEl(){const e=this.player_.isAudio(),t=this.localize(e?"Audio Player":"Video Player"),i=Le("span",{className:"vjs-control-text",textContent:this.localize("{1} is loading.",[t])}),s=super.createEl("div",{className:"vjs-loading-spinner",dir:"ltr"});return s.appendChild(i),s}handleLanguagechange(){this.$(".vjs-control-text").textContent=this.localize("{1} is loading.",[this.player_.isAudio()?"Audio Player":"Video Player"])}}q.registerComponent("LoadingSpinner",Lp);class Pt extends zr{createEl(e,t={},i={}){e="button",t=Object.assign({className:this.buildCSSClass()},t),i=Object.assign({type:"button"},i);const s=Le(e,t,i);return this.player_.options_.experimentalSvgIcons||s.appendChild(Le("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),this.createControlTextEl(s),s}addChild(e,t={}){const i=this.constructor.name;return He.warn(`Adding an actionable (user controllable) child to a Button (${i}) is not supported; use a ClickableComponent instead.`),q.prototype.addChild.call(this,e,t)}enable(){super.enable(),this.el_.removeAttribute("disabled")}disable(){super.disable(),this.el_.setAttribute("disabled","disabled")}handleKeyDown(e){if(e.key===" "||e.key==="Enter"){e.stopPropagation();return}super.handleKeyDown(e)}}q.registerComponent("Button",Pt);class Hu extends Pt{constructor(e,t){super(e,t),this.mouseused_=!1,this.setIcon("play"),this.on("mousedown",i=>this.handleMouseDown(i))}buildCSSClass(){return"vjs-big-play-button"}handleClick(e){const t=this.player_.play();if(this.mouseused_&&"clientX"in e&&"clientY"in e){xi(t),this.player_.tech(!0)&&this.player_.tech(!0).focus();return}const i=this.player_.getChild("controlBar"),s=i&&i.getChild("playToggle");if(!s){this.player_.tech(!0).focus();return}const r=()=>s.focus();Os(t)?t.then(r,()=>{}):this.setTimeout(r,1)}handleKeyDown(e){this.mouseused_=!1,super.handleKeyDown(e)}handleMouseDown(e){this.mouseused_=!0}}Hu.prototype.controlText_="Play Video",q.registerComponent("BigPlayButton",Hu);class Rp extends Pt{constructor(e,t){super(e,t),this.setIcon("cancel"),this.controlText(t&&t.controlText||this.localize("Close"))}buildCSSClass(){return`vjs-close-button ${super.buildCSSClass()}`}handleClick(e){this.trigger({type:"close",bubbles:!1})}handleKeyDown(e){e.key==="Escape"?(e.preventDefault(),e.stopPropagation(),this.trigger("click")):super.handleKeyDown(e)}}q.registerComponent("CloseButton",Rp);class qu extends Pt{constructor(e,t={}){super(e,t),t.replay=t.replay===void 0||t.replay,this.setIcon("play"),this.on(e,"play",i=>this.handlePlay(i)),this.on(e,"pause",i=>this.handlePause(i)),t.replay&&this.on(e,"ended",i=>this.handleEnded(i))}buildCSSClass(){return`vjs-play-control ${super.buildCSSClass()}`}handleClick(e){this.player_.paused()?xi(this.player_.play()):this.player_.pause()}handleSeeked(e){this.removeClass("vjs-ended"),this.player_.paused()?this.handlePause(e):this.handlePlay(e)}handlePlay(e){this.removeClass("vjs-ended","vjs-paused"),this.addClass("vjs-playing"),this.setIcon("pause"),this.controlText("Pause")}handlePause(e){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.setIcon("play"),this.controlText("Play")}handleEnded(e){this.removeClass("vjs-playing"),this.addClass("vjs-ended"),this.setIcon("replay"),this.controlText("Replay"),this.one(this.player_,"seeked",t=>this.handleSeeked(t))}}qu.prototype.controlText_="Play",q.registerComponent("PlayToggle",qu);class Xn extends q{constructor(e,t){super(e,t),this.on(e,["timeupdate","ended","seeking"],i=>this.update(i)),this.updateTextNode_()}createEl(){const e=this.buildCSSClass(),t=super.createEl("div",{className:`${e} vjs-time-control vjs-control`}),i=Le("span",{className:"vjs-control-text",textContent:`${this.localize(this.labelText_)}\xA0`},{role:"presentation"});return t.appendChild(i),this.contentEl_=Le("span",{className:`${e}-display`},{role:"presentation"}),t.appendChild(this.contentEl_),t}dispose(){this.contentEl_=null,this.textNode_=null,super.dispose()}update(e){!this.player_.options_.enableSmoothSeeking&&e.type==="seeking"||this.updateContent(e)}updateTextNode_(e=0){e=mn(e),this.formattedTime_!==e&&(this.formattedTime_=e,this.requestNamedAnimationFrame("TimeDisplay#updateTextNode_",()=>{if(!this.contentEl_)return;let t=this.textNode_;t&&this.contentEl_.firstChild!==t&&(t=null,He.warn("TimeDisplay#updateTextnode_: Prevented replacement of text node element since it was no longer a child of this node. Appending a new node instead.")),this.textNode_=I().createTextNode(this.formattedTime_),this.textNode_&&(t?this.contentEl_.replaceChild(this.textNode_,t):this.contentEl_.appendChild(this.textNode_))}))}updateContent(e){}}Xn.prototype.labelText_="Time",Xn.prototype.controlText_="Time",q.registerComponent("TimeDisplay",Xn);class yo extends Xn{buildCSSClass(){return"vjs-current-time"}updateContent(e){let t;this.player_.ended()?t=this.player_.duration():t=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime(),this.updateTextNode_(t)}}yo.prototype.labelText_="Current Time",yo.prototype.controlText_="Current Time",q.registerComponent("CurrentTimeDisplay",yo);class _o extends Xn{constructor(e,t){super(e,t);const i=s=>this.updateContent(s);this.on(e,"durationchange",i),this.on(e,"loadstart",i),this.on(e,"loadedmetadata",i)}buildCSSClass(){return"vjs-duration"}updateContent(e){const t=this.player_.duration();this.updateTextNode_(t)}}_o.prototype.labelText_="Duration",_o.prototype.controlText_="Duration",q.registerComponent("DurationDisplay",_o);class Mp extends q{createEl(){const e=super.createEl("div",{className:"vjs-time-control vjs-time-divider"},{"aria-hidden":!0}),t=super.createEl("div"),i=super.createEl("span",{textContent:"/"});return t.appendChild(i),e.appendChild(t),e}}q.registerComponent("TimeDivider",Mp);class bo extends Xn{constructor(e,t){super(e,t),this.on(e,"durationchange",i=>this.updateContent(i))}buildCSSClass(){return"vjs-remaining-time"}createEl(){const e=super.createEl();return this.options_.displayNegative!==!1&&e.insertBefore(Le("span",{},{"aria-hidden":!0},"-"),this.contentEl_),e}updateContent(e){if(typeof this.player_.duration()!="number")return;let t;this.player_.ended()?t=0:this.player_.remainingTimeDisplay?t=this.player_.remainingTimeDisplay():t=this.player_.remainingTime(),this.updateTextNode_(t)}}bo.prototype.labelText_="Remaining Time",bo.prototype.controlText_="Remaining Time",q.registerComponent("RemainingTimeDisplay",bo);class Np extends q{constructor(e,t){super(e,t),this.updateShowing(),this.on(this.player(),"durationchange",i=>this.updateShowing(i))}createEl(){const e=super.createEl("div",{className:"vjs-live-control vjs-control"});return this.contentEl_=Le("div",{className:"vjs-live-display"},{"aria-live":"off"}),this.contentEl_.appendChild(Le("span",{className:"vjs-control-text",textContent:`${this.localize("Stream Type")}\xA0`})),this.contentEl_.appendChild(I().createTextNode(this.localize("LIVE"))),e.appendChild(this.contentEl_),e}dispose(){this.contentEl_=null,super.dispose()}updateShowing(e){this.player().duration()===1/0?this.show():this.hide()}}q.registerComponent("LiveDisplay",Np);class Wu extends Pt{constructor(e,t){super(e,t),this.updateLiveEdgeStatus(),this.player_.liveTracker&&(this.updateLiveEdgeStatusHandler_=i=>this.updateLiveEdgeStatus(i),this.on(this.player_.liveTracker,"liveedgechange",this.updateLiveEdgeStatusHandler_))}createEl(){const e=super.createEl("button",{className:"vjs-seek-to-live-control vjs-control"});return this.setIcon("circle",e),this.textEl_=Le("span",{className:"vjs-seek-to-live-text",textContent:this.localize("LIVE")},{"aria-hidden":"true"}),e.appendChild(this.textEl_),e}updateLiveEdgeStatus(){!this.player_.liveTracker||this.player_.liveTracker.atLiveEdge()?(this.setAttribute("aria-disabled",!0),this.addClass("vjs-at-live-edge"),this.controlText("Seek to live, currently playing live")):(this.setAttribute("aria-disabled",!1),this.removeClass("vjs-at-live-edge"),this.controlText("Seek to live, currently behind live"))}handleClick(){this.player_.liveTracker.seekToLiveEdge()}dispose(){this.player_.liveTracker&&this.off(this.player_.liveTracker,"liveedgechange",this.updateLiveEdgeStatusHandler_),this.textEl_=null,super.dispose()}}Wu.prototype.controlText_="Seek to live, currently playing live",q.registerComponent("SeekToLive",Wu);function Rs(n,e,t){return n=Number(n),Math.min(t,Math.max(e,isNaN(n)?e:n))}var Up=Object.freeze({__proto__:null,clamp:Rs});class Eo extends q{constructor(e,t){super(e,t),this.handleMouseDown_=i=>this.handleMouseDown(i),this.handleMouseUp_=i=>this.handleMouseUp(i),this.handleKeyDown_=i=>this.handleKeyDown(i),this.handleClick_=i=>this.handleClick(i),this.handleMouseMove_=i=>this.handleMouseMove(i),this.update_=i=>this.update(i),this.bar=this.getChild(this.options_.barName),this.vertical(!!this.options_.vertical),this.enable()}enabled(){return this.enabled_}enable(){this.enabled()||(this.on("mousedown",this.handleMouseDown_),this.on("touchstart",this.handleMouseDown_),this.on("keydown",this.handleKeyDown_),this.on("click",this.handleClick_),this.on(this.player_,"controlsvisible",this.update),this.playerEvent&&this.on(this.player_,this.playerEvent,this.update),this.removeClass("disabled"),this.setAttribute("tabindex",0),this.enabled_=!0)}disable(){if(!this.enabled())return;const e=this.bar.el_.ownerDocument;this.off("mousedown",this.handleMouseDown_),this.off("touchstart",this.handleMouseDown_),this.off("keydown",this.handleKeyDown_),this.off("click",this.handleClick_),this.off(this.player_,"controlsvisible",this.update_),this.off(e,"mousemove",this.handleMouseMove_),this.off(e,"mouseup",this.handleMouseUp_),this.off(e,"touchmove",this.handleMouseMove_),this.off(e,"touchend",this.handleMouseUp_),this.removeAttribute("tabindex"),this.addClass("disabled"),this.playerEvent&&this.off(this.player_,this.playerEvent,this.update),this.enabled_=!1}createEl(e,t={},i={}){return t.className=t.className+" vjs-slider",t=Object.assign({tabIndex:0},t),i=Object.assign({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100},i),super.createEl(e,t,i)}handleMouseDown(e){const t=this.bar.el_.ownerDocument;e.type==="mousedown"&&e.preventDefault(),e.type==="touchstart"&&!Ti&&e.preventDefault(),ru(),this.addClass("vjs-sliding"),this.trigger("slideractive"),this.on(t,"mousemove",this.handleMouseMove_),this.on(t,"mouseup",this.handleMouseUp_),this.on(t,"touchmove",this.handleMouseMove_),this.on(t,"touchend",this.handleMouseUp_),this.handleMouseMove(e,!0)}handleMouseMove(e){}handleMouseUp(e){const t=this.bar.el_.ownerDocument;au(),this.removeClass("vjs-sliding"),this.trigger("sliderinactive"),this.off(t,"mousemove",this.handleMouseMove_),this.off(t,"mouseup",this.handleMouseUp_),this.off(t,"touchmove",this.handleMouseMove_),this.off(t,"touchend",this.handleMouseUp_),this.update()}update(){if(!this.el_||!this.bar)return;const e=this.getProgress();return e===this.progress_||(this.progress_=e,this.requestNamedAnimationFrame("Slider#update",()=>{const t=this.vertical()?"height":"width";this.bar.el().style[t]=(e*100).toFixed(2)+"%"})),e}getProgress(){return Number(Rs(this.getPercent(),0,1).toFixed(4))}calculateDistance(e){const t=Dr(this.el_,e);return this.vertical()?t.y:t.x}handleKeyDown(e){const t=this.options_.playerOptions.spatialNavigation,i=t&&t.enabled,s=t&&t.horizontalSeek;i?s&&e.key==="ArrowLeft"||!s&&e.key==="ArrowDown"?(e.preventDefault(),e.stopPropagation(),this.stepBack()):s&&e.key==="ArrowRight"||!s&&e.key==="ArrowUp"?(e.preventDefault(),e.stopPropagation(),this.stepForward()):super.handleKeyDown(e):e.key==="ArrowLeft"||e.key==="ArrowDown"?(e.preventDefault(),e.stopPropagation(),this.stepBack()):e.key==="ArrowUp"||e.key==="ArrowRight"?(e.preventDefault(),e.stopPropagation(),this.stepForward()):super.handleKeyDown(e)}handleClick(e){e.stopPropagation(),e.preventDefault()}vertical(e){if(e===void 0)return this.vertical_||!1;this.vertical_=!!e,this.vertical_?this.addClass("vjs-slider-vertical"):this.addClass("vjs-slider-horizontal")}}q.registerComponent("Slider",Eo);const To=(n,e)=>Rs(n/e*100,0,100).toFixed(2)+"%";class Fp extends q{constructor(e,t){super(e,t),this.partEls_=[],this.on(e,"progress",i=>this.update(i))}createEl(){const e=super.createEl("div",{className:"vjs-load-progress"}),t=Le("span",{className:"vjs-control-text"}),i=Le("span",{textContent:this.localize("Loaded")}),s=I().createTextNode(": ");return this.percentageEl_=Le("span",{className:"vjs-control-text-loaded-percentage",textContent:"0%"}),e.appendChild(t),t.appendChild(i),t.appendChild(s),t.appendChild(this.percentageEl_),e}dispose(){this.partEls_=null,this.percentageEl_=null,super.dispose()}update(e){this.requestNamedAnimationFrame("LoadProgressBar#update",()=>{const t=this.player_.liveTracker,i=this.player_.buffered(),s=t&&t.isLive()?t.seekableEnd():this.player_.duration(),r=this.player_.bufferedEnd(),a=this.partEls_,l=To(r,s);this.percent_!==l&&(this.el_.style.width=l,Ki(this.percentageEl_,l),this.percent_=l);for(let h=0;h<i.length;h++){const p=i.start(h),g=i.end(h);let y=a[h];y||(y=this.el_.appendChild(Le()),a[h]=y),!(y.dataset.start===p&&y.dataset.end===g)&&(y.dataset.start=p,y.dataset.end=g,y.style.left=To(p,r),y.style.width=To(g-p,r))}for(let h=a.length;h>i.length;h--)this.el_.removeChild(a[h-1]);a.length=i.length})}}q.registerComponent("LoadProgressBar",Fp);class Vp extends q{constructor(e,t){super(e,t),this.update=Ci(nt(this,this.update),si)}createEl(){return super.createEl("div",{className:"vjs-time-tooltip"},{"aria-hidden":"true"})}update(e,t,i){const s=Ds(this.el_),r=zn(this.player_.el()),a=e.width*t;if(!r||!s)return;let l=e.left-r.left+a,h=e.width-a+(r.right-e.right);h||(h=e.width-a,l=a);let p=s.width/2;l<p?p+=p-l:h<p&&(p=h),p<0?p=0:p>s.width&&(p=s.width),p=Math.round(p),this.el_.style.right=`-${p}px`,this.write(i)}write(e){Ki(this.el_,e)}updateTime(e,t,i,s){this.requestNamedAnimationFrame("TimeTooltip#updateTime",()=>{let r;const a=this.player_.duration();if(this.player_.liveTracker&&this.player_.liveTracker.isLive()){const l=this.player_.liveTracker.liveWindow(),h=l-t*l;r=(h<1?"":"-")+mn(h,l)}else r=mn(i,a);this.update(e,t,r),s&&s()})}}q.registerComponent("TimeTooltip",Vp);class Co extends q{constructor(e,t){super(e,t),this.setIcon("circle"),this.update=Ci(nt(this,this.update),si)}createEl(){return super.createEl("div",{className:"vjs-play-progress vjs-slider-bar"},{"aria-hidden":"true"})}update(e,t){const i=this.getChild("timeTooltip");if(!i)return;const s=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();i.updateTime(e,t,s)}}Co.prototype.options_={children:[]},!kt&&!pi&&Co.prototype.options_.children.push("timeTooltip"),q.registerComponent("PlayProgressBar",Co);class $u extends q{constructor(e,t){super(e,t),this.update=Ci(nt(this,this.update),si)}createEl(){return super.createEl("div",{className:"vjs-mouse-display"})}update(e,t){const i=t*this.player_.duration();this.getChild("timeTooltip").updateTime(e,t,i,()=>{this.el_.style.left=`${e.width*t}px`})}}$u.prototype.options_={children:["timeTooltip"]},q.registerComponent("MouseTimeDisplay",$u);const Hr=5,Gu=12;class qr extends Eo{constructor(e,t){t=Ze(qr.prototype.options_,t),t.children=[...t.children];const i=e.options_.disableSeekWhileScrubbingOnMobile&&(kt||pi);(!kt&&!pi||i)&&t.children.splice(1,0,"mouseTimeDisplay"),super(e,t),this.shouldDisableSeekWhileScrubbingOnMobile_=i,this.pendingSeekTime_=null,this.setEventHandlers_()}setEventHandlers_(){this.update_=nt(this,this.update),this.update=Ci(this.update_,si),this.on(this.player_,["durationchange","timeupdate"],this.update),this.on(this.player_,["ended"],this.update_),this.player_.liveTracker&&this.on(this.player_.liveTracker,"liveedgechange",this.update),this.updateInterval=null,this.enableIntervalHandler_=e=>this.enableInterval_(e),this.disableIntervalHandler_=e=>this.disableInterval_(e),this.on(this.player_,["playing"],this.enableIntervalHandler_),this.on(this.player_,["ended","pause","waiting"],this.disableIntervalHandler_),"hidden"in I()&&"visibilityState"in I()&&this.on(I(),"visibilitychange",this.toggleVisibility_)}toggleVisibility_(e){I().visibilityState==="hidden"?(this.cancelNamedAnimationFrame("SeekBar#update"),this.cancelNamedAnimationFrame("Slider#update"),this.disableInterval_(e)):(!this.player_.ended()&&!this.player_.paused()&&this.enableInterval_(),this.update())}enableInterval_(){this.updateInterval||(this.updateInterval=this.setInterval(this.update,si))}disableInterval_(e){this.player_.liveTracker&&this.player_.liveTracker.isLive()&&e&&e.type!=="ended"||this.updateInterval&&(this.clearInterval(this.updateInterval),this.updateInterval=null)}createEl(){return super.createEl("div",{className:"vjs-progress-holder"},{"aria-label":this.localize("Progress Bar")})}update(e){if(I().visibilityState==="hidden")return;const t=super.update();return this.requestNamedAnimationFrame("SeekBar#update",()=>{const i=this.player_.ended()?this.player_.duration():this.getCurrentTime_(),s=this.player_.liveTracker;let r=this.player_.duration();s&&s.isLive()&&(r=this.player_.liveTracker.liveCurrentTime()),this.percent_!==t&&(this.el_.setAttribute("aria-valuenow",(t*100).toFixed(2)),this.percent_=t),(this.currentTime_!==i||this.duration_!==r)&&(this.el_.setAttribute("aria-valuetext",this.localize("progress bar timing: currentTime={1} duration={2}",[mn(i,r),mn(r,r)],"{1} of {2}")),this.currentTime_=i,this.duration_=r),this.bar&&this.bar.update(zn(this.el()),this.getProgress())}),t}userSeek_(e){this.player_.liveTracker&&this.player_.liveTracker.isLive()&&this.player_.liveTracker.nextSeekedFromUser(),this.player_.currentTime(e)}getCurrentTime_(){return this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime()}getPercent(){if(this.pendingSeekTime_)return this.pendingSeekTime_/this.player_.duration();const e=this.getCurrentTime_();let t;const i=this.player_.liveTracker;return i&&i.isLive()?(t=(e-i.seekableStart())/i.liveWindow(),i.atLiveEdge()&&(t=1)):t=e/this.player_.duration(),t}handleMouseDown(e){ks(e)&&(e.stopPropagation(),this.videoWasPlaying=!this.player_.paused(),this.shouldDisableSeekWhileScrubbingOnMobile_||this.player_.pause(),super.handleMouseDown(e))}handleMouseMove(e,t=!1){if(!ks(e)||isNaN(this.player_.duration()))return;!t&&!this.player_.scrubbing()&&this.player_.scrubbing(!0);let i;const s=this.calculateDistance(e),r=this.player_.liveTracker;if(!r||!r.isLive())i=s*this.player_.duration(),i===this.player_.duration()&&(i=i-.1);else{if(s>=.99){r.seekToLiveEdge();return}const a=r.seekableStart(),l=r.liveCurrentTime();if(i=a+s*r.liveWindow(),i>=l&&(i=l),i<=a&&(i=a+.1),i===1/0)return}this.shouldDisableSeekWhileScrubbingOnMobile_?this.pendingSeekTime_=i:this.userSeek_(i),this.player_.options_.enableSmoothSeeking&&this.update()}enable(){super.enable();const e=this.getChild("mouseTimeDisplay");e&&e.show()}disable(){super.disable();const e=this.getChild("mouseTimeDisplay");e&&e.hide()}handleMouseUp(e){super.handleMouseUp(e),e&&e.stopPropagation(),this.player_.scrubbing(!1),this.pendingSeekTime_&&(this.userSeek_(this.pendingSeekTime_),this.pendingSeekTime_=null),this.player_.trigger({type:"timeupdate",target:this,manuallyTriggered:!0}),this.videoWasPlaying?xi(this.player_.play()):this.update_()}stepForward(){this.userSeek_(this.player_.currentTime()+Hr)}stepBack(){this.userSeek_(this.player_.currentTime()-Hr)}handleAction(e){this.player_.paused()?this.player_.play():this.player_.pause()}handleKeyDown(e){const t=this.player_.liveTracker;if(e.key===" "||e.key==="Enter")e.preventDefault(),e.stopPropagation(),this.handleAction(e);else if(e.key==="Home")e.preventDefault(),e.stopPropagation(),this.userSeek_(0);else if(e.key==="End")e.preventDefault(),e.stopPropagation(),t&&t.isLive()?this.userSeek_(t.liveCurrentTime()):this.userSeek_(this.player_.duration());else if(/^[0-9]$/.test(e.key)){e.preventDefault(),e.stopPropagation();const i=parseInt(e.key,10)*.1;t&&t.isLive()?this.userSeek_(t.seekableStart()+t.liveWindow()*i):this.userSeek_(this.player_.duration()*i)}else e.key==="PageDown"?(e.preventDefault(),e.stopPropagation(),this.userSeek_(this.player_.currentTime()-Hr*Gu)):e.key==="PageUp"?(e.preventDefault(),e.stopPropagation(),this.userSeek_(this.player_.currentTime()+Hr*Gu)):super.handleKeyDown(e)}dispose(){this.disableInterval_(),this.off(this.player_,["durationchange","timeupdate"],this.update),this.off(this.player_,["ended"],this.update_),this.player_.liveTracker&&this.off(this.player_.liveTracker,"liveedgechange",this.update),this.off(this.player_,["playing"],this.enableIntervalHandler_),this.off(this.player_,["ended","pause","waiting"],this.disableIntervalHandler_),"hidden"in I()&&"visibilityState"in I()&&this.off(I(),"visibilitychange",this.toggleVisibility_),super.dispose()}}qr.prototype.options_={children:["loadProgressBar","playProgressBar"],barName:"playProgressBar"},q.registerComponent("SeekBar",qr);class Yu extends q{constructor(e,t){super(e,t),this.handleMouseMove=Ci(nt(this,this.handleMouseMove),si),this.throttledHandleMouseSeek=Ci(nt(this,this.handleMouseSeek),si),this.handleMouseUpHandler_=i=>this.handleMouseUp(i),this.handleMouseDownHandler_=i=>this.handleMouseDown(i),this.enable()}createEl(){return super.createEl("div",{className:"vjs-progress-control vjs-control"})}handleMouseMove(e){const t=this.getChild("seekBar");if(!t)return;const i=t.getChild("playProgressBar"),s=t.getChild("mouseTimeDisplay");if(!i&&!s)return;const r=t.el(),a=Ds(r);let l=Dr(r,e).x;l=Rs(l,0,1),s&&s.update(a,l),i&&i.update(a,t.getProgress())}handleMouseSeek(e){const t=this.getChild("seekBar");t&&t.handleMouseMove(e)}enabled(){return this.enabled_}disable(){if(this.children().forEach(e=>e.disable&&e.disable()),!!this.enabled()&&(this.off(["mousedown","touchstart"],this.handleMouseDownHandler_),this.off(this.el_,["mousemove","touchmove"],this.handleMouseMove),this.removeListenersAddedOnMousedownAndTouchstart(),this.addClass("disabled"),this.enabled_=!1,this.player_.scrubbing())){const e=this.getChild("seekBar");this.player_.scrubbing(!1),e.videoWasPlaying&&xi(this.player_.play())}}enable(){this.children().forEach(e=>e.enable&&e.enable()),!this.enabled()&&(this.on(["mousedown","touchstart"],this.handleMouseDownHandler_),this.on(this.el_,["mousemove","touchmove"],this.handleMouseMove),this.removeClass("disabled"),this.enabled_=!0)}removeListenersAddedOnMousedownAndTouchstart(){const e=this.el_.ownerDocument;this.off(e,"mousemove",this.throttledHandleMouseSeek),this.off(e,"touchmove",this.throttledHandleMouseSeek),this.off(e,"mouseup",this.handleMouseUpHandler_),this.off(e,"touchend",this.handleMouseUpHandler_)}handleMouseDown(e){const t=this.el_.ownerDocument,i=this.getChild("seekBar");i&&i.handleMouseDown(e),this.on(t,"mousemove",this.throttledHandleMouseSeek),this.on(t,"touchmove",this.throttledHandleMouseSeek),this.on(t,"mouseup",this.handleMouseUpHandler_),this.on(t,"touchend",this.handleMouseUpHandler_)}handleMouseUp(e){const t=this.getChild("seekBar");t&&t.handleMouseUp(e),this.removeListenersAddedOnMousedownAndTouchstart()}}Yu.prototype.options_={children:["seekBar"]},q.registerComponent("ProgressControl",Yu);class Xu extends Pt{constructor(e,t){super(e,t),this.setIcon("picture-in-picture-enter"),this.on(e,["enterpictureinpicture","leavepictureinpicture"],i=>this.handlePictureInPictureChange(i)),this.on(e,["disablepictureinpicturechanged","loadedmetadata"],i=>this.handlePictureInPictureEnabledChange(i)),this.on(e,["loadedmetadata","audioonlymodechange","audiopostermodechange"],()=>this.handlePictureInPictureAudioModeChange()),this.disable()}buildCSSClass(){return`vjs-picture-in-picture-control vjs-hidden ${super.buildCSSClass()}`}handlePictureInPictureAudioModeChange(){if(!(this.player_.currentType().substring(0,5)==="audio"||this.player_.audioPosterMode()||this.player_.audioOnlyMode())){this.show();return}this.player_.isInPictureInPicture()&&this.player_.exitPictureInPicture(),this.hide()}handlePictureInPictureEnabledChange(){I().pictureInPictureEnabled&&this.player_.disablePictureInPicture()===!1||this.player_.options_.enableDocumentPictureInPicture&&"documentPictureInPicture"in A()?this.enable():this.disable()}handlePictureInPictureChange(e){this.player_.isInPictureInPicture()?(this.setIcon("picture-in-picture-exit"),this.controlText("Exit Picture-in-Picture")):(this.setIcon("picture-in-picture-enter"),this.controlText("Picture-in-Picture")),this.handlePictureInPictureEnabledChange()}handleClick(e){this.player_.isInPictureInPicture()?this.player_.exitPictureInPicture():this.player_.requestPictureInPicture()}show(){typeof I().exitPictureInPicture=="function"&&super.show()}}Xu.prototype.controlText_="Picture-in-Picture",q.registerComponent("PictureInPictureToggle",Xu);class Ku extends Pt{constructor(e,t){super(e,t),this.setIcon("fullscreen-enter"),this.on(e,"fullscreenchange",i=>this.handleFullscreenChange(i)),I()[e.fsApi_.fullscreenEnabled]===!1&&this.disable()}buildCSSClass(){return`vjs-fullscreen-control ${super.buildCSSClass()}`}handleFullscreenChange(e){this.player_.isFullscreen()?(this.controlText("Exit Fullscreen"),this.setIcon("fullscreen-exit")):(this.controlText("Fullscreen"),this.setIcon("fullscreen-enter"))}handleClick(e){this.player_.isFullscreen()?this.player_.exitFullscreen():this.player_.requestFullscreen()}}Ku.prototype.controlText_="Fullscreen",q.registerComponent("FullscreenToggle",Ku);const zp=function(n,e){e.tech_&&!e.tech_.featuresVolumeControl&&n.addClass("vjs-hidden"),n.on(e,"loadstart",function(){e.tech_.featuresVolumeControl?n.removeClass("vjs-hidden"):n.addClass("vjs-hidden")})};class Hp extends q{createEl(){const e=super.createEl("div",{className:"vjs-volume-level"});return this.setIcon("circle",e),e.appendChild(super.createEl("span",{className:"vjs-control-text"})),e}}q.registerComponent("VolumeLevel",Hp);class qp extends q{constructor(e,t){super(e,t),this.update=Ci(nt(this,this.update),si)}createEl(){return super.createEl("div",{className:"vjs-volume-tooltip"},{"aria-hidden":"true"})}update(e,t,i,s){if(!i){const r=zn(this.el_),a=zn(this.player_.el()),l=e.width*t;if(!a||!r)return;const h=e.left-a.left+l,p=e.width-l+(a.right-e.right);let g=r.width/2;h<g?g+=g-h:p<g&&(g=p),g<0?g=0:g>r.width&&(g=r.width),this.el_.style.right=`-${g}px`}this.write(`${s}%`)}write(e){Ki(this.el_,e)}updateVolume(e,t,i,s,r){this.requestNamedAnimationFrame("VolumeLevelTooltip#updateVolume",()=>{this.update(e,t,i,s.toFixed(0)),r&&r()})}}q.registerComponent("VolumeLevelTooltip",qp);class Qu extends q{constructor(e,t){super(e,t),this.update=Ci(nt(this,this.update),si)}createEl(){return super.createEl("div",{className:"vjs-mouse-display"})}update(e,t,i){const s=100*t;this.getChild("volumeLevelTooltip").updateVolume(e,t,i,s,()=>{i?this.el_.style.bottom=`${e.height*t}px`:this.el_.style.left=`${e.width*t}px`})}}Qu.prototype.options_={children:["volumeLevelTooltip"]},q.registerComponent("MouseVolumeLevelDisplay",Qu);class Wr extends Eo{constructor(e,t){super(e,t),this.on("slideractive",i=>this.updateLastVolume_(i)),this.on(e,"volumechange",i=>this.updateARIAAttributes(i)),e.ready(()=>this.updateARIAAttributes())}createEl(){return super.createEl("div",{className:"vjs-volume-bar vjs-slider-bar"},{"aria-label":this.localize("Volume Level"),"aria-live":"polite"})}handleMouseDown(e){ks(e)&&super.handleMouseDown(e)}handleMouseMove(e){const t=this.getChild("mouseVolumeLevelDisplay");if(t){const i=this.el(),s=zn(i),r=this.vertical();let a=Dr(i,e);a=r?a.y:a.x,a=Rs(a,0,1),t.update(s,a,r)}ks(e)&&(this.checkMuted(),this.player_.volume(this.calculateDistance(e)))}checkMuted(){this.player_.muted()&&this.player_.muted(!1)}getPercent(){return this.player_.muted()?0:this.player_.volume()}stepForward(){this.checkMuted(),this.player_.volume(this.player_.volume()+.1)}stepBack(){this.checkMuted(),this.player_.volume(this.player_.volume()-.1)}updateARIAAttributes(e){const t=this.player_.muted()?0:this.volumeAsPercentage_();this.el_.setAttribute("aria-valuenow",t),this.el_.setAttribute("aria-valuetext",t+"%")}volumeAsPercentage_(){return Math.round(this.player_.volume()*100)}updateLastVolume_(){const e=this.player_.volume();this.one("sliderinactive",()=>{this.player_.volume()===0&&this.player_.lastVolume_(e)})}}Wr.prototype.options_={children:["volumeLevel"],barName:"volumeLevel"},!kt&&!pi&&Wr.prototype.options_.children.splice(0,0,"mouseVolumeLevelDisplay"),Wr.prototype.playerEvent="volumechange",q.registerComponent("VolumeBar",Wr);class Ju extends q{constructor(e,t={}){t.vertical=t.vertical||!1,(typeof t.volumeBar=="undefined"||Rn(t.volumeBar))&&(t.volumeBar=t.volumeBar||{},t.volumeBar.vertical=t.vertical),super(e,t),zp(this,e),this.throttledHandleMouseMove=Ci(nt(this,this.handleMouseMove),si),this.handleMouseUpHandler_=i=>this.handleMouseUp(i),this.on("mousedown",i=>this.handleMouseDown(i)),this.on("touchstart",i=>this.handleMouseDown(i)),this.on("mousemove",i=>this.handleMouseMove(i)),this.on(this.volumeBar,["focus","slideractive"],()=>{this.volumeBar.addClass("vjs-slider-active"),this.addClass("vjs-slider-active"),this.trigger("slideractive")}),this.on(this.volumeBar,["blur","sliderinactive"],()=>{this.volumeBar.removeClass("vjs-slider-active"),this.removeClass("vjs-slider-active"),this.trigger("sliderinactive")})}createEl(){let e="vjs-volume-horizontal";return this.options_.vertical&&(e="vjs-volume-vertical"),super.createEl("div",{className:`vjs-volume-control vjs-control ${e}`})}handleMouseDown(e){const t=this.el_.ownerDocument;this.on(t,"mousemove",this.throttledHandleMouseMove),this.on(t,"touchmove",this.throttledHandleMouseMove),this.on(t,"mouseup",this.handleMouseUpHandler_),this.on(t,"touchend",this.handleMouseUpHandler_)}handleMouseUp(e){const t=this.el_.ownerDocument;this.off(t,"mousemove",this.throttledHandleMouseMove),this.off(t,"touchmove",this.throttledHandleMouseMove),this.off(t,"mouseup",this.handleMouseUpHandler_),this.off(t,"touchend",this.handleMouseUpHandler_)}handleMouseMove(e){this.volumeBar.handleMouseMove(e)}}Ju.prototype.options_={children:["volumeBar"]},q.registerComponent("VolumeControl",Ju);const Wp=function(n,e){e.tech_&&!e.tech_.featuresMuteControl&&n.addClass("vjs-hidden"),n.on(e,"loadstart",function(){e.tech_.featuresMuteControl?n.removeClass("vjs-hidden"):n.addClass("vjs-hidden")})};class Zu extends Pt{constructor(e,t){super(e,t),Wp(this,e),this.on(e,["loadstart","volumechange"],i=>this.update(i))}buildCSSClass(){return`vjs-mute-control ${super.buildCSSClass()}`}handleClick(e){const t=this.player_.volume(),i=this.player_.lastVolume_();if(t===0){const s=i<.1?.1:i;this.player_.volume(s),this.player_.muted(!1)}else this.player_.muted(!this.player_.muted())}update(e){this.updateIcon_(),this.updateControlText_()}updateIcon_(){const e=this.player_.volume();let t=3;this.setIcon("volume-high"),kt&&this.player_.tech_&&this.player_.tech_.el_&&this.player_.muted(this.player_.tech_.el_.muted),e===0||this.player_.muted()?(this.setIcon("volume-mute"),t=0):e<.33?(this.setIcon("volume-low"),t=1):e<.67&&(this.setIcon("volume-medium"),t=2),wr(this.el_,[0,1,2,3].reduce((i,s)=>i+`${s?" ":""}vjs-vol-${s}`,"")),fn(this.el_,`vjs-vol-${t}`)}updateControlText_(){const t=this.player_.muted()||this.player_.volume()===0?"Unmute":"Mute";this.controlText()!==t&&this.controlText(t)}}Zu.prototype.controlText_="Mute",q.registerComponent("MuteToggle",Zu);class ec extends q{constructor(e,t={}){typeof t.inline!="undefined"?t.inline=t.inline:t.inline=!0,(typeof t.volumeControl=="undefined"||Rn(t.volumeControl))&&(t.volumeControl=t.volumeControl||{},t.volumeControl.vertical=!t.inline),super(e,t),this.handleKeyPressHandler_=i=>this.handleKeyPress(i),this.on(e,["loadstart"],i=>this.volumePanelState_(i)),this.on(this.muteToggle,"keyup",i=>this.handleKeyPress(i)),this.on(this.volumeControl,"keyup",i=>this.handleVolumeControlKeyUp(i)),this.on("keydown",i=>this.handleKeyPress(i)),this.on("mouseover",i=>this.handleMouseOver(i)),this.on("mouseout",i=>this.handleMouseOut(i)),this.on(this.volumeControl,["slideractive"],this.sliderActive_),this.on(this.volumeControl,["sliderinactive"],this.sliderInactive_)}sliderActive_(){this.addClass("vjs-slider-active")}sliderInactive_(){this.removeClass("vjs-slider-active")}volumePanelState_(){this.volumeControl.hasClass("vjs-hidden")&&this.muteToggle.hasClass("vjs-hidden")&&this.addClass("vjs-hidden"),this.volumeControl.hasClass("vjs-hidden")&&!this.muteToggle.hasClass("vjs-hidden")&&this.addClass("vjs-mute-toggle-only")}createEl(){let e="vjs-volume-panel-horizontal";return this.options_.inline||(e="vjs-volume-panel-vertical"),super.createEl("div",{className:`vjs-volume-panel vjs-control ${e}`})}dispose(){this.handleMouseOut(),super.dispose()}handleVolumeControlKeyUp(e){e.key==="Escape"&&this.muteToggle.focus()}handleMouseOver(e){this.addClass("vjs-hover"),Xt(I(),"keyup",this.handleKeyPressHandler_)}handleMouseOut(e){this.removeClass("vjs-hover"),It(I(),"keyup",this.handleKeyPressHandler_)}handleKeyPress(e){e.key==="Escape"&&this.handleMouseOut()}}ec.prototype.options_={children:["muteToggle","volumeControl"]},q.registerComponent("VolumePanel",ec);class tc extends Pt{constructor(e,t){super(e,t),this.validOptions=[5,10,30],this.skipTime=this.getSkipForwardTime(),this.skipTime&&this.validOptions.includes(this.skipTime)?(this.setIcon(`forward-${this.skipTime}`),this.controlText(this.localize("Skip forward {1} seconds",[this.skipTime.toLocaleString(e.language())])),this.show()):this.hide()}getSkipForwardTime(){const e=this.options_.playerOptions;return e.controlBar&&e.controlBar.skipButtons&&e.controlBar.skipButtons.forward}buildCSSClass(){return`vjs-skip-forward-${this.getSkipForwardTime()} ${super.buildCSSClass()}`}handleClick(e){if(isNaN(this.player_.duration()))return;const t=this.player_.currentTime(),i=this.player_.liveTracker,s=i&&i.isLive()?i.seekableEnd():this.player_.duration();let r;t+this.skipTime<=s?r=t+this.skipTime:r=s,this.player_.currentTime(r)}handleLanguagechange(){this.controlText(this.localize("Skip forward {1} seconds",[this.skipTime]))}}tc.prototype.controlText_="Skip Forward",q.registerComponent("SkipForward",tc);class ic extends Pt{constructor(e,t){super(e,t),this.validOptions=[5,10,30],this.skipTime=this.getSkipBackwardTime(),this.skipTime&&this.validOptions.includes(this.skipTime)?(this.setIcon(`replay-${this.skipTime}`),this.controlText(this.localize("Skip backward {1} seconds",[this.skipTime.toLocaleString(e.language())])),this.show()):this.hide()}getSkipBackwardTime(){const e=this.options_.playerOptions;return e.controlBar&&e.controlBar.skipButtons&&e.controlBar.skipButtons.backward}buildCSSClass(){return`vjs-skip-backward-${this.getSkipBackwardTime()} ${super.buildCSSClass()}`}handleClick(e){const t=this.player_.currentTime(),i=this.player_.liveTracker,s=i&&i.isLive()&&i.seekableStart();let r;s&&t-this.skipTime<=s?r=s:t>=this.skipTime?r=t-this.skipTime:r=0,this.player_.currentTime(r)}handleLanguagechange(){this.controlText(this.localize("Skip backward {1} seconds",[this.skipTime]))}}ic.prototype.controlText_="Skip Backward",q.registerComponent("SkipBackward",ic);class nc extends q{constructor(e,t){super(e,t),t&&(this.menuButton_=t.menuButton),this.focusedChild_=-1,this.on("keydown",i=>this.handleKeyDown(i)),this.boundHandleBlur_=i=>this.handleBlur(i),this.boundHandleTapClick_=i=>this.handleTapClick(i)}addEventListenerForItem(e){e instanceof q&&(this.on(e,"blur",this.boundHandleBlur_),this.on(e,["tap","click"],this.boundHandleTapClick_))}removeEventListenerForItem(e){e instanceof q&&(this.off(e,"blur",this.boundHandleBlur_),this.off(e,["tap","click"],this.boundHandleTapClick_))}removeChild(e){typeof e=="string"&&(e=this.getChild(e)),this.removeEventListenerForItem(e),super.removeChild(e)}addItem(e){const t=this.addChild(e);t&&this.addEventListenerForItem(t)}createEl(){const e=this.options_.contentElType||"ul";this.contentEl_=Le(e,{className:"vjs-menu-content"}),this.contentEl_.setAttribute("role","menu");const t=super.createEl("div",{append:this.contentEl_,className:"vjs-menu"});return t.appendChild(this.contentEl_),Xt(t,"click",function(i){i.preventDefault(),i.stopImmediatePropagation()}),t}dispose(){this.contentEl_=null,this.boundHandleBlur_=null,this.boundHandleTapClick_=null,super.dispose()}handleBlur(e){const t=e.relatedTarget||I().activeElement;if(!this.children().some(i=>i.el()===t)){const i=this.menuButton_;i&&i.buttonPressed_&&t!==i.el().firstChild&&i.unpressButton()}}handleTapClick(e){if(this.menuButton_){this.menuButton_.unpressButton();const t=this.children();if(!Array.isArray(t))return;const i=t.filter(s=>s.el()===e.target)[0];if(!i)return;i.name()!=="CaptionSettingsMenuItem"&&this.menuButton_.focus()}}handleKeyDown(e){e.key==="ArrowLeft"||e.key==="ArrowDown"?(e.preventDefault(),e.stopPropagation(),this.stepForward()):(e.key==="ArrowRight"||e.key==="ArrowUp")&&(e.preventDefault(),e.stopPropagation(),this.stepBack())}stepForward(){let e=0;this.focusedChild_!==void 0&&(e=this.focusedChild_+1),this.focus(e)}stepBack(){let e=0;this.focusedChild_!==void 0&&(e=this.focusedChild_-1),this.focus(e)}focus(e=0){const t=this.children().slice();t.length&&t[0].hasClass("vjs-menu-title")&&t.shift(),t.length>0&&(e<0?e=0:e>=t.length&&(e=t.length-1),this.focusedChild_=e,t[e].el_.focus())}}q.registerComponent("Menu",nc);class xo extends q{constructor(e,t={}){super(e,t),this.menuButton_=new Pt(e,t),this.menuButton_.controlText(this.controlText_),this.menuButton_.el_.setAttribute("aria-haspopup","true");const i=Pt.prototype.buildCSSClass();this.menuButton_.el_.className=this.buildCSSClass()+" "+i,this.menuButton_.removeClass("vjs-control"),this.addChild(this.menuButton_),this.update(),this.enabled_=!0;const s=r=>this.handleClick(r);this.handleMenuKeyUp_=r=>this.handleMenuKeyUp(r),this.on(this.menuButton_,"tap",s),this.on(this.menuButton_,"click",s),this.on(this.menuButton_,"keydown",r=>this.handleKeyDown(r)),this.on(this.menuButton_,"mouseenter",()=>{this.addClass("vjs-hover"),this.menu.show(),Xt(I(),"keyup",this.handleMenuKeyUp_)}),this.on("mouseleave",r=>this.handleMouseLeave(r)),this.on("keydown",r=>this.handleSubmenuKeyDown(r))}update(){const e=this.createMenu();this.menu&&(this.menu.dispose(),this.removeChild(this.menu)),this.menu=e,this.addChild(e),this.buttonPressed_=!1,this.menuButton_.el_.setAttribute("aria-expanded","false"),this.items&&this.items.length<=this.hideThreshold_?(this.hide(),this.menu.contentEl_.removeAttribute("role")):(this.show(),this.menu.contentEl_.setAttribute("role","menu"))}createMenu(){const e=new nc(this.player_,{menuButton:this});if(this.hideThreshold_=0,this.options_.title){const t=Le("li",{className:"vjs-menu-title",textContent:vt(this.options_.title),tabIndex:-1}),i=new q(this.player_,{el:t});e.addItem(i)}if(this.items=this.createItems(),this.items)for(let t=0;t<this.items.length;t++)e.addItem(this.items[t]);return e}createItems(){}createEl(){return super.createEl("div",{className:this.buildWrapperCSSClass()},{})}setIcon(e){super.setIcon(e,this.menuButton_.el_)}buildWrapperCSSClass(){let e="vjs-menu-button";this.options_.inline===!0?e+="-inline":e+="-popup";const t=Pt.prototype.buildCSSClass();return`vjs-menu-button ${e} ${t} ${super.buildCSSClass()}`}buildCSSClass(){let e="vjs-menu-button";return this.options_.inline===!0?e+="-inline":e+="-popup",`vjs-menu-button ${e} ${super.buildCSSClass()}`}controlText(e,t=this.menuButton_.el()){return this.menuButton_.controlText(e,t)}dispose(){this.handleMouseLeave(),super.dispose()}handleClick(e){this.buttonPressed_?this.unpressButton():this.pressButton()}handleMouseLeave(e){this.removeClass("vjs-hover"),It(I(),"keyup",this.handleMenuKeyUp_)}focus(){this.menuButton_.focus()}blur(){this.menuButton_.blur()}handleKeyDown(e){e.key==="Escape"||e.key==="Tab"?(this.buttonPressed_&&this.unpressButton(),!e.key==="Tab"&&(e.preventDefault(),this.menuButton_.focus())):(e.key==="Up"||e.key==="Down"&&!(this.player_.options_.playerOptions.spatialNavigation&&this.player_.options_.playerOptions.spatialNavigation.enabled))&&(this.buttonPressed_||(e.preventDefault(),this.pressButton()))}handleMenuKeyUp(e){(e.key==="Escape"||e.key==="Tab")&&this.removeClass("vjs-hover")}handleSubmenuKeyPress(e){this.handleSubmenuKeyDown(e)}handleSubmenuKeyDown(e){(e.key==="Escape"||e.key==="Tab")&&(this.buttonPressed_&&this.unpressButton(),!e.key==="Tab"&&(e.preventDefault(),this.menuButton_.focus()))}pressButton(){if(this.enabled_){if(this.buttonPressed_=!0,this.menu.show(),this.menu.lockShowing(),this.menuButton_.el_.setAttribute("aria-expanded","true"),kt&&eu())return;this.menu.focus()}}unpressButton(){this.enabled_&&(this.buttonPressed_=!1,this.menu.unlockShowing(),this.menu.hide(),this.menuButton_.el_.setAttribute("aria-expanded","false"))}disable(){this.unpressButton(),this.enabled_=!1,this.addClass("vjs-disabled"),this.menuButton_.disable()}enable(){this.enabled_=!0,this.removeClass("vjs-disabled"),this.menuButton_.enable()}}q.registerComponent("MenuButton",xo);class So extends xo{constructor(e,t){const i=t.tracks;if(super(e,t),this.items.length<=1&&this.hide(),!i)return;const s=nt(this,this.update);i.addEventListener("removetrack",s),i.addEventListener("addtrack",s),i.addEventListener("labelchange",s),this.player_.on("ready",s),this.player_.on("dispose",function(){i.removeEventListener("removetrack",s),i.removeEventListener("addtrack",s),i.removeEventListener("labelchange",s)})}}q.registerComponent("TrackButton",So);class Ms extends zr{constructor(e,t){super(e,t),this.selectable=t.selectable,this.isSelected_=t.selected||!1,this.multiSelectable=t.multiSelectable,this.selected(this.isSelected_),this.selectable?this.multiSelectable?this.el_.setAttribute("role","menuitemcheckbox"):this.el_.setAttribute("role","menuitemradio"):this.el_.setAttribute("role","menuitem")}createEl(e,t,i){this.nonIconControl=!0;const s=super.createEl("li",Object.assign({className:"vjs-menu-item",tabIndex:-1},t),i),r=Le("span",{className:"vjs-menu-item-text",textContent:this.localize(this.options_.label)});return this.player_.options_.experimentalSvgIcons?s.appendChild(r):s.replaceChild(r,s.querySelector(".vjs-icon-placeholder")),s}handleKeyDown(e){["Tab","Escape","ArrowUp","ArrowLeft","ArrowRight","ArrowDown"].includes(e.key)||super.handleKeyDown(e)}handleClick(e){this.selected(!0)}selected(e){this.selectable&&(e?(this.addClass("vjs-selected"),this.el_.setAttribute("aria-checked","true"),this.controlText(", selected"),this.isSelected_=!0):(this.removeClass("vjs-selected"),this.el_.setAttribute("aria-checked","false"),this.controlText(""),this.isSelected_=!1))}}q.registerComponent("MenuItem",Ms);class Ns extends Ms{constructor(e,t){const i=t.track,s=e.textTracks();t.label=i.label||i.language||"Unknown",t.selected=i.mode==="showing",super(e,t),this.track=i,this.kinds=(t.kinds||[t.kind||this.track.kind]).filter(Boolean);const r=(...l)=>{this.handleTracksChange.apply(this,l)},a=(...l)=>{this.handleSelectedLanguageChange.apply(this,l)};if(e.on(["loadstart","texttrackchange"],r),s.addEventListener("change",r),s.addEventListener("selectedlanguagechange",a),this.on("dispose",function(){e.off(["loadstart","texttrackchange"],r),s.removeEventListener("change",r),s.removeEventListener("selectedlanguagechange",a)}),s.onchange===void 0){let l;this.on(["tap","click"],function(){if(typeof A().Event!="object")try{l=new(A()).Event("change")}catch(h){}l||(l=I().createEvent("Event"),l.initEvent("change",!0,!0)),s.dispatchEvent(l)})}this.handleTracksChange()}handleClick(e){const t=this.track,i=this.player_.textTracks();if(super.handleClick(e),!!i)for(let s=0;s<i.length;s++){const r=i[s];this.kinds.indexOf(r.kind)!==-1&&(r===t?r.mode!=="showing"&&(r.mode="showing"):r.mode!=="disabled"&&(r.mode="disabled"))}}handleTracksChange(e){const t=this.track.mode==="showing";t!==this.isSelected_&&this.selected(t)}handleSelectedLanguageChange(e){if(this.track.mode==="showing"){const t=this.player_.cache_.selectedLanguage;if(t&&t.enabled&&t.language===this.track.language&&t.kind!==this.track.kind)return;this.player_.cache_.selectedLanguage={enabled:!0,language:this.track.language,kind:this.track.kind}}}dispose(){this.track=null,super.dispose()}}q.registerComponent("TextTrackMenuItem",Ns);class sc extends Ns{constructor(e,t){t.track={player:e,kind:t.kind,kinds:t.kinds,default:!1,mode:"disabled"},t.kinds||(t.kinds=[t.kind]),t.label?t.track.label=t.label:t.track.label=t.kinds.join(" and ")+" off",t.selectable=!0,t.multiSelectable=!1,super(e,t)}handleTracksChange(e){const t=this.player().textTracks();let i=!0;for(let s=0,r=t.length;s<r;s++){const a=t[s];if(this.options_.kinds.indexOf(a.kind)>-1&&a.mode==="showing"){i=!1;break}}i!==this.isSelected_&&this.selected(i)}handleSelectedLanguageChange(e){const t=this.player().textTracks();let i=!0;for(let s=0,r=t.length;s<r;s++){const a=t[s];if(["captions","descriptions","subtitles"].indexOf(a.kind)>-1&&a.mode==="showing"){i=!1;break}}i&&(this.player_.cache_.selectedLanguage={enabled:!1})}handleLanguagechange(){this.$(".vjs-menu-item-text").textContent=this.player_.localize(this.options_.label),super.handleLanguagechange()}}q.registerComponent("OffTextTrackMenuItem",sc);class Kn extends So{constructor(e,t={}){t.tracks=e.textTracks(),super(e,t)}createItems(e=[],t=Ns){let i;this.label_&&(i=`${this.label_} off`),e.push(new sc(this.player_,{kinds:this.kinds_,kind:this.kind_,label:i})),this.hideThreshold_+=1;const s=this.player_.textTracks();Array.isArray(this.kinds_)||(this.kinds_=[this.kind_]);for(let r=0;r<s.length;r++){const a=s[r];if(this.kinds_.indexOf(a.kind)>-1){const l=new t(this.player_,{track:a,kinds:this.kinds_,kind:this.kind_,selectable:!0,multiSelectable:!1});l.addClass(`vjs-${a.kind}-menu-item`),e.push(l)}}return e}}q.registerComponent("TextTrackButton",Kn);class rc extends Ms{constructor(e,t){const i=t.track,s=t.cue,r=e.currentTime();t.selectable=!0,t.multiSelectable=!1,t.label=s.text,t.selected=s.startTime<=r&&r<s.endTime,super(e,t),this.track=i,this.cue=s}handleClick(e){super.handleClick(),this.player_.currentTime(this.cue.startTime)}}q.registerComponent("ChaptersTrackMenuItem",rc);class jo extends Kn{constructor(e,t,i){super(e,t,i),this.setIcon("chapters"),this.selectCurrentItem_=()=>{this.items.forEach(s=>{s.selected(this.track_.activeCues[0]===s.cue)})}}buildCSSClass(){return`vjs-chapters-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-chapters-button ${super.buildWrapperCSSClass()}`}update(e){if(e&&e.track&&e.track.kind!=="chapters")return;const t=this.findChaptersTrack();t!==this.track_?(this.setTrack(t),super.update()):(!this.items||t&&t.cues&&t.cues.length!==this.items.length)&&super.update()}setTrack(e){if(this.track_!==e){if(this.updateHandler_||(this.updateHandler_=this.update.bind(this)),this.track_){const t=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);t&&t.removeEventListener("load",this.updateHandler_),this.track_.removeEventListener("cuechange",this.selectCurrentItem_),this.track_=null}if(this.track_=e,this.track_){this.track_.mode="hidden";const t=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);t&&t.addEventListener("load",this.updateHandler_),this.track_.addEventListener("cuechange",this.selectCurrentItem_)}}}findChaptersTrack(){const e=this.player_.textTracks()||[];for(let t=e.length-1;t>=0;t--){const i=e[t];if(i.kind===this.kind_)return i}}getMenuCaption(){return this.track_&&this.track_.label?this.track_.label:this.localize(vt(this.kind_))}createMenu(){return this.options_.title=this.getMenuCaption(),super.createMenu()}createItems(){const e=[];if(!this.track_)return e;const t=this.track_.cues;if(!t)return e;for(let i=0,s=t.length;i<s;i++){const r=t[i],a=new rc(this.player_,{track:this.track_,cue:r});e.push(a)}return e}}jo.prototype.kind_="chapters",jo.prototype.controlText_="Chapters",q.registerComponent("ChaptersButton",jo);class wo extends Kn{constructor(e,t,i){super(e,t,i),this.setIcon("audio-description");const s=e.textTracks(),r=nt(this,this.handleTracksChange);s.addEventListener("change",r),this.on("dispose",function(){s.removeEventListener("change",r)})}handleTracksChange(e){const t=this.player().textTracks();let i=!1;for(let s=0,r=t.length;s<r;s++){const a=t[s];if(a.kind!==this.kind_&&a.mode==="showing"){i=!0;break}}i?this.disable():this.enable()}buildCSSClass(){return`vjs-descriptions-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-descriptions-button ${super.buildWrapperCSSClass()}`}}wo.prototype.kind_="descriptions",wo.prototype.controlText_="Descriptions",q.registerComponent("DescriptionsButton",wo);class Bo extends Kn{constructor(e,t,i){super(e,t,i),this.setIcon("subtitles")}buildCSSClass(){return`vjs-subtitles-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-subtitles-button ${super.buildWrapperCSSClass()}`}}Bo.prototype.kind_="subtitles",Bo.prototype.controlText_="Subtitles",q.registerComponent("SubtitlesButton",Bo);class Do extends Ns{constructor(e,t){t.track={player:e,kind:t.kind,label:t.kind+" settings",selectable:!1,default:!1,mode:"disabled"},t.selectable=!1,t.name="CaptionSettingsMenuItem",super(e,t),this.addClass("vjs-texttrack-settings"),this.controlText(", opens "+t.kind+" settings dialog")}handleClick(e){this.player().getChild("textTrackSettings").open()}handleLanguagechange(){this.$(".vjs-menu-item-text").textContent=this.player_.localize(this.options_.kind+" settings"),super.handleLanguagechange()}}q.registerComponent("CaptionSettingsMenuItem",Do);class ko extends Kn{constructor(e,t,i){super(e,t,i),this.setIcon("captions")}buildCSSClass(){return`vjs-captions-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-captions-button ${super.buildWrapperCSSClass()}`}createItems(){const e=[];return!(this.player().tech_&&this.player().tech_.featuresNativeTextTracks)&&this.player().getChild("textTrackSettings")&&(e.push(new Do(this.player_,{kind:this.kind_})),this.hideThreshold_+=1),super.createItems(e)}}ko.prototype.kind_="captions",ko.prototype.controlText_="Captions",q.registerComponent("CaptionsButton",ko);class ac extends Ns{createEl(e,t,i){const s=super.createEl(e,t,i),r=s.querySelector(".vjs-menu-item-text");return this.options_.track.kind==="captions"&&(this.player_.options_.experimentalSvgIcons?this.setIcon("captions",s):r.appendChild(Le("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),r.appendChild(Le("span",{className:"vjs-control-text",textContent:` ${this.localize("Captions")}`}))),s}}q.registerComponent("SubsCapsMenuItem",ac);class Io extends Kn{constructor(e,t={}){super(e,t),this.label_="subtitles",this.setIcon("subtitles"),["en","en-us","en-ca","fr-ca"].indexOf(this.player_.language_)>-1&&(this.label_="captions",this.setIcon("captions")),this.menuButton_.controlText(vt(this.label_))}buildCSSClass(){return`vjs-subs-caps-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-subs-caps-button ${super.buildWrapperCSSClass()}`}createItems(){let e=[];return!(this.player().tech_&&this.player().tech_.featuresNativeTextTracks)&&this.player().getChild("textTrackSettings")&&(e.push(new Do(this.player_,{kind:this.label_})),this.hideThreshold_+=1),e=super.createItems(e,ac),e}}Io.prototype.kinds_=["captions","subtitles"],Io.prototype.controlText_="Subtitles",q.registerComponent("SubsCapsButton",Io);class oc extends Ms{constructor(e,t){const i=t.track,s=e.audioTracks();t.label=i.label||i.language||"Unknown",t.selected=i.enabled,super(e,t),this.track=i,this.addClass(`vjs-${i.kind}-menu-item`);const r=(...a)=>{this.handleTracksChange.apply(this,a)};s.addEventListener("change",r),this.on("dispose",()=>{s.removeEventListener("change",r)})}createEl(e,t,i){const s=super.createEl(e,t,i),r=s.querySelector(".vjs-menu-item-text");return["main-desc","descriptions"].indexOf(this.options_.track.kind)>=0&&(r.appendChild(Le("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),r.appendChild(Le("span",{className:"vjs-control-text",textContent:" "+this.localize("Descriptions")}))),s}handleClick(e){if(super.handleClick(e),this.track.enabled=!0,this.player_.tech_.featuresNativeAudioTracks){const t=this.player_.audioTracks();for(let i=0;i<t.length;i++){const s=t[i];s!==this.track&&(s.enabled=s===this.track)}}}handleTracksChange(e){this.selected(this.track.enabled)}}q.registerComponent("AudioTrackMenuItem",oc);class lc extends So{constructor(e,t={}){t.tracks=e.audioTracks(),super(e,t),this.setIcon("audio")}buildCSSClass(){return`vjs-audio-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-audio-button ${super.buildWrapperCSSClass()}`}createItems(e=[]){this.hideThreshold_=1;const t=this.player_.audioTracks();for(let i=0;i<t.length;i++){const s=t[i];e.push(new oc(this.player_,{track:s,selectable:!0,multiSelectable:!1}))}return e}}lc.prototype.controlText_="Audio Track",q.registerComponent("AudioTrackButton",lc);class Po extends Ms{constructor(e,t){const i=t.rate,s=parseFloat(i,10);t.label=i,t.selected=s===e.playbackRate(),t.selectable=!0,t.multiSelectable=!1,super(e,t),this.label=i,this.rate=s,this.on(e,"ratechange",r=>this.update(r))}handleClick(e){super.handleClick(),this.player().playbackRate(this.rate)}update(e){this.selected(this.player().playbackRate()===this.rate)}}Po.prototype.contentElType="button",q.registerComponent("PlaybackRateMenuItem",Po);class uc extends xo{constructor(e,t){super(e,t),this.menuButton_.el_.setAttribute("aria-describedby",this.labelElId_),this.updateVisibility(),this.updateLabel(),this.on(e,"loadstart",i=>this.updateVisibility(i)),this.on(e,"ratechange",i=>this.updateLabel(i)),this.on(e,"playbackrateschange",i=>this.handlePlaybackRateschange(i))}createEl(){const e=super.createEl();return this.labelElId_="vjs-playback-rate-value-label-"+this.id_,this.labelEl_=Le("div",{className:"vjs-playback-rate-value",id:this.labelElId_,textContent:"1x"}),e.appendChild(this.labelEl_),e}dispose(){this.labelEl_=null,super.dispose()}buildCSSClass(){return`vjs-playback-rate ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-playback-rate ${super.buildWrapperCSSClass()}`}createItems(){const e=this.playbackRates(),t=[];for(let i=e.length-1;i>=0;i--)t.push(new Po(this.player(),{rate:e[i]+"x"}));return t}handlePlaybackRateschange(e){this.update()}playbackRates(){const e=this.player();return e.playbackRates&&e.playbackRates()||[]}playbackRateSupported(){return this.player().tech_&&this.player().tech_.featuresPlaybackRate&&this.playbackRates()&&this.playbackRates().length>0}updateVisibility(e){this.playbackRateSupported()?this.removeClass("vjs-hidden"):this.addClass("vjs-hidden")}updateLabel(e){this.playbackRateSupported()&&(this.labelEl_.textContent=this.player().playbackRate()+"x")}}uc.prototype.controlText_="Playback Rate",q.registerComponent("PlaybackRateMenuButton",uc);class cc extends q{buildCSSClass(){return`vjs-spacer ${super.buildCSSClass()}`}createEl(e="div",t={},i={}){return t.className||(t.className=this.buildCSSClass()),super.createEl(e,t,i)}}q.registerComponent("Spacer",cc);class $p extends cc{buildCSSClass(){return`vjs-custom-control-spacer ${super.buildCSSClass()}`}createEl(){return super.createEl("div",{className:this.buildCSSClass(),textContent:"\xA0"})}}q.registerComponent("CustomControlSpacer",$p);class dc extends q{createEl(){return super.createEl("div",{className:"vjs-control-bar",dir:"ltr"})}}dc.prototype.options_={children:["playToggle","skipBackward","skipForward","volumePanel","currentTimeDisplay","timeDivider","durationDisplay","progressControl","liveDisplay","seekToLive","remainingTimeDisplay","customControlSpacer","playbackRateMenuButton","chaptersButton","descriptionsButton","subsCapsButton","audioTrackButton","pictureInPictureToggle","fullscreenToggle"]},q.registerComponent("ControlBar",dc);class hc extends Wn{constructor(e,t){super(e,t),this.on(e,"error",i=>{this.open(i)})}buildCSSClass(){return`vjs-error-display ${super.buildCSSClass()}`}content(){const e=this.player().error();return e?this.localize(e.message):""}}hc.prototype.options_=Object.assign({},Wn.prototype.options_,{pauseOnOpen:!1,fillAlways:!0,temporary:!1,uncloseable:!0}),q.registerComponent("ErrorDisplay",hc);class fc extends q{constructor(e,t={}){super(e,t),this.el_.setAttribute("aria-labelledby",this.selectLabelledbyIds)}createEl(){return this.selectLabelledbyIds=[this.options_.legendId,this.options_.labelId].join(" ").trim(),Le("select",{id:this.options_.id},{},this.options_.SelectOptions.map(t=>{const i=(this.options_.labelId?this.options_.labelId:`vjs-track-option-${ni()}`)+"-"+t[1].replace(/\W+/g,""),s=Le("option",{id:i,value:this.localize(t[0]),textContent:this.localize(t[1])});return s.setAttribute("aria-labelledby",`${this.selectLabelledbyIds} ${i}`),s}))}}q.registerComponent("TextTrackSelect",fc);class An extends q{constructor(e,t={}){super(e,t);const i=Le("legend",{textContent:this.localize(this.options_.legendText),id:this.options_.legendId});this.el().appendChild(i);const s=this.options_.selects;for(const r of s){const a=this.options_.selectConfigs[r],l=a.className,h=a.id.replace("%s",this.options_.id_);let p=null;const g=`vjs_select_${ni()}`;if(this.options_.type==="colors"){p=Le("span",{className:l});const w=Le("label",{id:h,className:"vjs-label",textContent:this.localize(a.label)});w.setAttribute("for",g),p.appendChild(w)}const y=new fc(e,{SelectOptions:a.options,legendId:this.options_.legendId,id:g,labelId:h});this.addChild(y),this.options_.type==="colors"&&(p.appendChild(y.el()),this.el().appendChild(p))}}createEl(){return Le("fieldset",{className:this.options_.className})}}q.registerComponent("TextTrackFieldset",An);class pc extends q{constructor(e,t={}){super(e,t);const i=this.options_.textTrackComponentid,s=new An(e,{id_:i,legendId:`captions-text-legend-${i}`,legendText:this.localize("Text"),className:"vjs-fg vjs-track-setting",selects:this.options_.fieldSets[0],selectConfigs:this.options_.selectConfigs,type:"colors"});this.addChild(s);const r=new An(e,{id_:i,legendId:`captions-background-${i}`,legendText:this.localize("Text Background"),className:"vjs-bg vjs-track-setting",selects:this.options_.fieldSets[1],selectConfigs:this.options_.selectConfigs,type:"colors"});this.addChild(r);const a=new An(e,{id_:i,legendId:`captions-window-${i}`,legendText:this.localize("Caption Area Background"),className:"vjs-window vjs-track-setting",selects:this.options_.fieldSets[2],selectConfigs:this.options_.selectConfigs,type:"colors"});this.addChild(a)}createEl(){return Le("div",{className:"vjs-track-settings-colors"})}}q.registerComponent("TextTrackSettingsColors",pc);class mc extends q{constructor(e,t={}){super(e,t);const i=this.options_.textTrackComponentid,s=new An(e,{id_:i,legendId:`captions-font-size-${i}`,legendText:"Font Size",className:"vjs-font-percent vjs-track-setting",selects:this.options_.fieldSets[0],selectConfigs:this.options_.selectConfigs,type:"font"});this.addChild(s);const r=new An(e,{id_:i,legendId:`captions-edge-style-${i}`,legendText:this.localize("Text Edge Style"),className:"vjs-edge-style vjs-track-setting",selects:this.options_.fieldSets[1],selectConfigs:this.options_.selectConfigs,type:"font"});this.addChild(r);const a=new An(e,{id_:i,legendId:`captions-font-family-${i}`,legendText:this.localize("Font Family"),className:"vjs-font-family vjs-track-setting",selects:this.options_.fieldSets[2],selectConfigs:this.options_.selectConfigs,type:"font"});this.addChild(a)}createEl(){return Le("div",{className:"vjs-track-settings-font"})}}q.registerComponent("TextTrackSettingsFont",mc);class gc extends q{constructor(e,t={}){super(e,t);const i=this.localize("restore all settings to the default values"),s=new Pt(e,{controlText:i,className:"vjs-default-button"});s.el().classList.remove("vjs-control","vjs-button"),s.el().textContent=this.localize("Reset"),this.addChild(s);const r=new Pt(e,{controlText:i,className:"vjs-done-button"});r.el().classList.remove("vjs-control","vjs-button"),r.el().textContent=this.localize("Done"),this.addChild(r)}createEl(){return Le("div",{className:"vjs-track-settings-controls"})}}q.registerComponent("TrackSettingsControls",gc);const Oo="vjs-text-track-settings",vc=["#000","Black"],Ac=["#00F","Blue"],yc=["#0FF","Cyan"],_c=["#0F0","Green"],bc=["#F0F","Magenta"],Ec=["#F00","Red"],Tc=["#FFF","White"],Cc=["#FF0","Yellow"],Lo=["1","Opaque"],Ro=["0.5","Semi-Transparent"],xc=["0","Transparent"],Zi={backgroundColor:{selector:".vjs-bg-color > select",id:"captions-background-color-%s",label:"Color",options:[vc,Tc,Ec,_c,Ac,Cc,bc,yc],className:"vjs-bg-color"},backgroundOpacity:{selector:".vjs-bg-opacity > select",id:"captions-background-opacity-%s",label:"Opacity",options:[Lo,Ro,xc],className:"vjs-bg-opacity vjs-opacity"},color:{selector:".vjs-text-color > select",id:"captions-foreground-color-%s",label:"Color",options:[Tc,vc,Ec,_c,Ac,Cc,bc,yc],className:"vjs-text-color"},edgeStyle:{selector:".vjs-edge-style > select",id:"",label:"Text Edge Style",options:[["none","None"],["raised","Raised"],["depressed","Depressed"],["uniform","Uniform"],["dropshadow","Drop shadow"]]},fontFamily:{selector:".vjs-font-family > select",id:"",label:"Font Family",options:[["proportionalSansSerif","Proportional Sans-Serif"],["monospaceSansSerif","Monospace Sans-Serif"],["proportionalSerif","Proportional Serif"],["monospaceSerif","Monospace Serif"],["casual","Casual"],["script","Script"],["small-caps","Small Caps"]]},fontPercent:{selector:".vjs-font-percent > select",id:"",label:"Font Size",options:[["0.50","50%"],["0.75","75%"],["1.00","100%"],["1.25","125%"],["1.50","150%"],["1.75","175%"],["2.00","200%"],["3.00","300%"],["4.00","400%"]],default:2,parser:n=>n==="1.00"?null:Number(n)},textOpacity:{selector:".vjs-text-opacity > select",id:"captions-foreground-opacity-%s",label:"Opacity",options:[Lo,Ro],className:"vjs-text-opacity vjs-opacity"},windowColor:{selector:".vjs-window-color > select",id:"captions-window-color-%s",label:"Color",className:"vjs-window-color"},windowOpacity:{selector:".vjs-window-opacity > select",id:"captions-window-opacity-%s",label:"Opacity",options:[xc,Ro,Lo],className:"vjs-window-opacity vjs-opacity"}};Zi.windowColor.options=Zi.backgroundColor.options;function Sc(n,e){if(e&&(n=e(n)),n&&n!=="none")return n}function Gp(n,e){const t=n.options[n.options.selectedIndex].value;return Sc(t,e)}function Yp(n,e,t){if(e){for(let i=0;i<n.options.length;i++)if(Sc(n.options[i].value,t)===e){n.selectedIndex=i;break}}}class Xp extends Wn{constructor(e,t){t.temporary=!1,super(e,t),this.updateDisplay=this.updateDisplay.bind(this),this.fill(),this.hasBeenOpened_=this.hasBeenFilled_=!0,this.renderModalComponents(e),this.endDialog=Le("p",{className:"vjs-control-text",textContent:this.localize("End of dialog window.")}),this.el().appendChild(this.endDialog),this.setDefaults(),t.persistTextTrackSettings===void 0&&(this.options_.persistTextTrackSettings=this.options_.playerOptions.persistTextTrackSettings),this.bindFunctionsToSelectsAndButtons(),this.options_.persistTextTrackSettings&&this.restoreSettings()}renderModalComponents(e){const t=new pc(e,{textTrackComponentid:this.id_,selectConfigs:Zi,fieldSets:[["color","textOpacity"],["backgroundColor","backgroundOpacity"],["windowColor","windowOpacity"]]});this.addChild(t);const i=new mc(e,{textTrackComponentid:this.id_,selectConfigs:Zi,fieldSets:[["fontPercent"],["edgeStyle"],["fontFamily"]]});this.addChild(i);const s=new gc(e);this.addChild(s)}bindFunctionsToSelectsAndButtons(){this.on(this.$(".vjs-done-button"),["click","tap"],()=>{this.saveSettings(),this.close()}),this.on(this.$(".vjs-default-button"),["click","tap"],()=>{this.setDefaults(),this.updateDisplay()}),Ln(Zi,e=>{this.on(this.$(e.selector),"change",this.updateDisplay)})}dispose(){this.endDialog=null,super.dispose()}label(){return this.localize("Caption Settings Dialog")}description(){return this.localize("Beginning of dialog window. Escape will cancel and close the window.")}buildCSSClass(){return super.buildCSSClass()+" vjs-text-track-settings"}getValues(){return $l(Zi,(e,t,i)=>{const s=Gp(this.$(t.selector),t.parser);return s!==void 0&&(e[i]=s),e},{})}setValues(e){Ln(Zi,(t,i)=>{Yp(this.$(t.selector),e[i],t.parser)})}setDefaults(){Ln(Zi,e=>{const t=e.hasOwnProperty("default")?e.default:0;this.$(e.selector).selectedIndex=t})}restoreSettings(){let e;try{e=JSON.parse(A().localStorage.getItem(Oo))}catch(t){He.warn(t)}e&&this.setValues(e)}saveSettings(){if(!this.options_.persistTextTrackSettings)return;const e=this.getValues();try{Object.keys(e).length?A().localStorage.setItem(Oo,JSON.stringify(e)):A().localStorage.removeItem(Oo)}catch(t){He.warn(t)}}updateDisplay(){const e=this.player_.getChild("textTrackDisplay");e&&e.updateDisplay()}handleLanguagechange(){this.fill(),this.renderModalComponents(this.player_),this.bindFunctionsToSelectsAndButtons()}}q.registerComponent("TextTrackSettings",Xp);class Kp extends q{constructor(e,t){let i=t.ResizeObserver||A().ResizeObserver;t.ResizeObserver===null&&(i=!1);const s=Ze({createEl:!i,reportTouchActivity:!1},t);super(e,s),this.ResizeObserver=t.ResizeObserver||A().ResizeObserver,this.loadListener_=null,this.resizeObserver_=null,this.debouncedHandler_=vu(()=>{this.resizeHandler()},100,!1,this),i?(this.resizeObserver_=new this.ResizeObserver(this.debouncedHandler_),this.resizeObserver_.observe(e.el())):(this.loadListener_=()=>{if(!this.el_||!this.el_.contentWindow)return;const r=this.debouncedHandler_;let a=this.unloadListener_=function(){It(this,"resize",r),It(this,"unload",a),a=null};Xt(this.el_.contentWindow,"unload",a),Xt(this.el_.contentWindow,"resize",r)},this.one("load",this.loadListener_))}createEl(){return super.createEl("iframe",{className:"vjs-resize-manager",tabIndex:-1,title:this.localize("No content")},{"aria-hidden":"true"})}resizeHandler(){!this.player_||!this.player_.trigger||this.player_.trigger("playerresize")}dispose(){this.debouncedHandler_&&this.debouncedHandler_.cancel(),this.resizeObserver_&&(this.player_.el()&&this.resizeObserver_.unobserve(this.player_.el()),this.resizeObserver_.disconnect()),this.loadListener_&&this.off("load",this.loadListener_),this.el_&&this.el_.contentWindow&&this.unloadListener_&&this.unloadListener_.call(this.el_.contentWindow),this.ResizeObserver=null,this.resizeObserver=null,this.debouncedHandler_=null,this.loadListener_=null,super.dispose()}}q.registerComponent("ResizeManager",Kp);const Qp={trackingThreshold:20,liveTolerance:15};class Jp extends q{constructor(e,t){const i=Ze(Qp,t,{createEl:!1});super(e,i),this.trackLiveHandler_=()=>this.trackLive_(),this.handlePlay_=s=>this.handlePlay(s),this.handleFirstTimeupdate_=s=>this.handleFirstTimeupdate(s),this.handleSeeked_=s=>this.handleSeeked(s),this.seekToLiveEdge_=s=>this.seekToLiveEdge(s),this.reset_(),this.on(this.player_,"durationchange",s=>this.handleDurationchange(s)),this.on(this.player_,"canplay",()=>this.toggleTracking())}trackLive_(){const e=this.player_.seekable();if(!e||!e.length)return;const t=Number(A().performance.now().toFixed(4)),i=this.lastTime_===-1?0:(t-this.lastTime_)/1e3;this.lastTime_=t,this.pastSeekEnd_=this.pastSeekEnd()+i;const s=this.liveCurrentTime(),r=this.player_.currentTime();let a=this.player_.paused()||this.seekedBehindLive_||Math.abs(s-r)>this.options_.liveTolerance;(!this.timeupdateSeen_||s===1/0)&&(a=!1),a!==this.behindLiveEdge_&&(this.behindLiveEdge_=a,this.trigger("liveedgechange"))}handleDurationchange(){this.toggleTracking()}toggleTracking(){this.player_.duration()===1/0&&this.liveWindow()>=this.options_.trackingThreshold?(this.player_.options_.liveui&&this.player_.addClass("vjs-liveui"),this.startTracking()):(this.player_.removeClass("vjs-liveui"),this.stopTracking())}startTracking(){this.isTracking()||(this.timeupdateSeen_||(this.timeupdateSeen_=this.player_.hasStarted()),this.trackingInterval_=this.setInterval(this.trackLiveHandler_,si),this.trackLive_(),this.on(this.player_,["play","pause"],this.trackLiveHandler_),this.timeupdateSeen_?this.on(this.player_,"seeked",this.handleSeeked_):(this.one(this.player_,"play",this.handlePlay_),this.one(this.player_,"timeupdate",this.handleFirstTimeupdate_)))}handleFirstTimeupdate(){this.timeupdateSeen_=!0,this.on(this.player_,"seeked",this.handleSeeked_)}handleSeeked(){const e=Math.abs(this.liveCurrentTime()-this.player_.currentTime());this.seekedBehindLive_=this.nextSeekedFromUser_&&e>2,this.nextSeekedFromUser_=!1,this.trackLive_()}handlePlay(){this.one(this.player_,"timeupdate",this.seekToLiveEdge_)}reset_(){this.lastTime_=-1,this.pastSeekEnd_=0,this.lastSeekEnd_=-1,this.behindLiveEdge_=!0,this.timeupdateSeen_=!1,this.seekedBehindLive_=!1,this.nextSeekedFromUser_=!1,this.clearInterval(this.trackingInterval_),this.trackingInterval_=null,this.off(this.player_,["play","pause"],this.trackLiveHandler_),this.off(this.player_,"seeked",this.handleSeeked_),this.off(this.player_,"play",this.handlePlay_),this.off(this.player_,"timeupdate",this.handleFirstTimeupdate_),this.off(this.player_,"timeupdate",this.seekToLiveEdge_)}nextSeekedFromUser(){this.nextSeekedFromUser_=!0}stopTracking(){this.isTracking()&&(this.reset_(),this.trigger("liveedgechange"))}seekableEnd(){const e=this.player_.seekable(),t=[];let i=e?e.length:0;for(;i--;)t.push(e.end(i));return t.length?t.sort()[t.length-1]:1/0}seekableStart(){const e=this.player_.seekable(),t=[];let i=e?e.length:0;for(;i--;)t.push(e.start(i));return t.length?t.sort()[0]:0}liveWindow(){const e=this.liveCurrentTime();return e===1/0?0:e-this.seekableStart()}isLive(){return this.isTracking()}atLiveEdge(){return!this.behindLiveEdge()}liveCurrentTime(){return this.pastSeekEnd()+this.seekableEnd()}pastSeekEnd(){const e=this.seekableEnd();return this.lastSeekEnd_!==-1&&e!==this.lastSeekEnd_&&(this.pastSeekEnd_=0),this.lastSeekEnd_=e,this.pastSeekEnd_}behindLiveEdge(){return this.behindLiveEdge_}isTracking(){return typeof this.trackingInterval_=="number"}seekToLiveEdge(){this.seekedBehindLive_=!1,!this.atLiveEdge()&&(this.nextSeekedFromUser_=!1,this.player_.currentTime(this.liveCurrentTime()))}dispose(){this.stopTracking(),super.dispose()}}q.registerComponent("LiveTracker",Jp);class Zp extends q{constructor(e,t){super(e,t),this.on("statechanged",i=>this.updateDom_()),this.updateDom_()}createEl(){return this.els={title:Le("div",{className:"vjs-title-bar-title",id:`vjs-title-bar-title-${ni()}`}),description:Le("div",{className:"vjs-title-bar-description",id:`vjs-title-bar-description-${ni()}`})},Le("div",{className:"vjs-title-bar"},{},Gl(this.els))}updateDom_(){const e=this.player_.tech_,t=e&&e.el_,i={title:"aria-labelledby",description:"aria-describedby"};["title","description"].forEach(s=>{const r=this.state[s],a=this.els[s],l=i[s];kr(a),r&&Ki(a,r),t&&(t.removeAttribute(l),r&&t.setAttribute(l,a.id))}),this.state.title||this.state.description?this.show():this.hide()}update(e){this.setState(e)}dispose(){const e=this.player_.tech_,t=e&&e.el_;t&&(t.removeAttribute("aria-labelledby"),t.removeAttribute("aria-describedby")),super.dispose(),this.els=null}}q.registerComponent("TitleBar",Zp);const em={initialDisplay:4e3,position:[],takeFocus:!1};class tm extends Pt{constructor(e,t){t=Ze(em,t),super(e,t),this.controlText(t.controlText),this.hide(),this.on(this.player_,["useractive","userinactive"],i=>{this.removeClass("force-display")})}buildCSSClass(){return`vjs-transient-button focus-visible ${this.options_.position.map(e=>`vjs-${e}`).join(" ")}`}createEl(){const e=Le("button",{},{type:"button",class:this.buildCSSClass()},Le("span"));return this.controlTextEl_=e.querySelector("span"),e}show(){super.show(),this.addClass("force-display"),this.options_.takeFocus&&this.el().focus({preventScroll:!0}),this.forceDisplayTimeout=this.player_.setTimeout(()=>{this.removeClass("force-display")},this.options_.initialDisplay)}hide(){this.removeClass("force-display"),super.hide()}dispose(){this.player_.clearTimeout(this.forceDisplayTimeout),super.dispose()}}q.registerComponent("TransientButton",tm);const Mo=n=>{const e=n.el();if(e.hasAttribute("src"))return n.triggerSourceset(e.src),!0;const t=n.$$("source"),i=[];let s="";if(!t.length)return!1;for(let r=0;r<t.length;r++){const a=t[r].src;a&&i.indexOf(a)===-1&&i.push(a)}return i.length?(i.length===1&&(s=i[0]),n.triggerSourceset(s),!0):!1},im=Object.defineProperty({},"innerHTML",{get(){return this.cloneNode(!0).innerHTML},set(n){const e=I().createElement(this.nodeName.toLowerCase());e.innerHTML=n;const t=I().createDocumentFragment();for(;e.childNodes.length;)t.appendChild(e.childNodes[0]);return this.innerText="",A().Element.prototype.appendChild.call(this,t),this.innerHTML}}),jc=(n,e)=>{let t={};for(let i=0;i<n.length&&(t=Object.getOwnPropertyDescriptor(n[i],e),!(t&&t.set&&t.get));i++);return t.enumerable=!0,t.configurable=!0,t},nm=n=>jc([n.el(),A().HTMLMediaElement.prototype,A().Element.prototype,im],"innerHTML"),wc=function(n){const e=n.el();if(e.resetSourceWatch_)return;const t={},i=nm(n),s=r=>(...a)=>{const l=r.apply(e,a);return Mo(n),l};["append","appendChild","insertAdjacentHTML"].forEach(r=>{e[r]&&(t[r]=e[r],e[r]=s(t[r]))}),Object.defineProperty(e,"innerHTML",Ze(i,{set:s(i.set)})),e.resetSourceWatch_=()=>{e.resetSourceWatch_=null,Object.keys(t).forEach(r=>{e[r]=t[r]}),Object.defineProperty(e,"innerHTML",i)},n.one("sourceset",e.resetSourceWatch_)},sm=Object.defineProperty({},"src",{get(){return this.hasAttribute("src")?Du(A().Element.prototype.getAttribute.call(this,"src")):""},set(n){return A().Element.prototype.setAttribute.call(this,"src",n),n}}),rm=n=>jc([n.el(),A().HTMLMediaElement.prototype,sm],"src"),am=function(n){if(!n.featuresSourceset)return;const e=n.el();if(e.resetSourceset_)return;const t=rm(n),i=e.setAttribute,s=e.load;Object.defineProperty(e,"src",Ze(t,{set:r=>{const a=t.set.call(e,r);return n.triggerSourceset(e.src),a}})),e.setAttribute=(r,a)=>{const l=i.call(e,r,a);return/src/i.test(r)&&n.triggerSourceset(e.src),l},e.load=()=>{const r=s.call(e);return Mo(n)||(n.triggerSourceset(""),wc(n)),r},e.currentSrc?n.triggerSourceset(e.currentSrc):Mo(n)||wc(n),e.resetSourceset_=()=>{e.resetSourceset_=null,e.load=s,e.setAttribute=i,Object.defineProperty(e,"src",t),e.resetSourceWatch_&&e.resetSourceWatch_()}};class ve extends Ve{constructor(e,t){super(e,t);const i=e.source;let s=!1;if(this.featuresVideoFrameCallback=this.featuresVideoFrameCallback&&this.el_.tagName==="VIDEO",i&&(this.el_.currentSrc!==i.src||e.tag&&e.tag.initNetworkState_===3)?this.setSource(i):this.handleLateInit_(this.el_),e.enableSourceset&&this.setupSourcesetHandling_(),this.isScrubbing_=!1,this.el_.hasChildNodes()){const r=this.el_.childNodes;let a=r.length;const l=[];for(;a--;){const h=r[a];h.nodeName.toLowerCase()==="track"&&(this.featuresNativeTextTracks?(this.remoteTextTrackEls().addTrackElement_(h),this.remoteTextTracks().addTrack(h.track),this.textTracks().addTrack(h.track),!s&&!this.el_.hasAttribute("crossorigin")&&Nr(h.src)&&(s=!0)):l.push(h))}for(let h=0;h<l.length;h++)this.el_.removeChild(l[h])}this.proxyNativeTracks_(),this.featuresNativeTextTracks&&s&&He.warn(`Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.
This may prevent text tracks from loading.`),this.restoreMetadataTracksInIOSNativePlayer_(),(ws||Tr)&&e.nativeControlsForTouch===!0&&this.setControls(!0),this.proxyWebkitFullscreen_(),this.triggerReady()}dispose(){this.el_&&this.el_.resetSourceset_&&this.el_.resetSourceset_(),ve.disposeMediaElement(this.el_),this.options_=null,super.dispose()}setupSourcesetHandling_(){am(this)}restoreMetadataTracksInIOSNativePlayer_(){const e=this.textTracks();let t;const i=()=>{t=[];for(let r=0;r<e.length;r++){const a=e[r];a.kind==="metadata"&&t.push({track:a,storedMode:a.mode})}};i(),e.addEventListener("change",i),this.on("dispose",()=>e.removeEventListener("change",i));const s=()=>{for(let r=0;r<t.length;r++){const a=t[r];a.track.mode==="disabled"&&a.track.mode!==a.storedMode&&(a.track.mode=a.storedMode)}e.removeEventListener("change",s)};this.on("webkitbeginfullscreen",()=>{e.removeEventListener("change",i),e.removeEventListener("change",s),e.addEventListener("change",s)}),this.on("webkitendfullscreen",()=>{e.removeEventListener("change",i),e.addEventListener("change",i),e.removeEventListener("change",s)})}overrideNative_(e,t){if(t!==this[`featuresNative${e}Tracks`])return;const i=e.toLowerCase();this[`${i}TracksListeners_`]&&Object.keys(this[`${i}TracksListeners_`]).forEach(s=>{this.el()[`${i}Tracks`].removeEventListener(s,this[`${i}TracksListeners_`][s])}),this[`featuresNative${e}Tracks`]=!t,this[`${i}TracksListeners_`]=null,this.proxyNativeTracksForType_(i)}overrideNativeAudioTracks(e){this.overrideNative_("Audio",e)}overrideNativeVideoTracks(e){this.overrideNative_("Video",e)}proxyNativeTracksForType_(e){const t=ri[e],i=this.el()[t.getterName],s=this[t.getterName]();if(!this[`featuresNative${t.capitalName}Tracks`]||!i||!i.addEventListener)return;const r={change:l=>{const h={type:"change",target:s,currentTarget:s,srcElement:s};s.trigger(h),e==="text"&&this[Gn.remoteText.getterName]().trigger(h)},addtrack(l){s.addTrack(l.track)},removetrack(l){s.removeTrack(l.track)}},a=function(){const l=[];for(let h=0;h<s.length;h++){let p=!1;for(let g=0;g<i.length;g++)if(i[g]===s[h]){p=!0;break}p||l.push(s[h])}for(;l.length;)s.removeTrack(l.shift())};this[t.getterName+"Listeners_"]=r,Object.keys(r).forEach(l=>{const h=r[l];i.addEventListener(l,h),this.on("dispose",p=>i.removeEventListener(l,h))}),this.on("loadstart",a),this.on("dispose",l=>this.off("loadstart",a))}proxyNativeTracks_(){ri.names.forEach(e=>{this.proxyNativeTracksForType_(e)})}createEl(){let e=this.options_.tag;if(!e||!(this.options_.playerElIngest||this.movingMediaElementInDOM)){if(e){const i=e.cloneNode(!0);e.parentNode&&e.parentNode.insertBefore(i,e),ve.disposeMediaElement(e),e=i}else{e=I().createElement("video");const i=this.options_.tag&&Qi(this.options_.tag),s=Ze({},i);(!ws||this.options_.nativeControlsForTouch!==!0)&&delete s.controls,nu(e,Object.assign(s,{id:this.options_.techId,class:"vjs-tech"}))}e.playerId=this.options_.playerId}typeof this.options_.preload!="undefined"&&Vn(e,"preload",this.options_.preload),this.options_.disablePictureInPicture!==void 0&&(e.disablePictureInPicture=this.options_.disablePictureInPicture);const t=["loop","muted","playsinline","autoplay"];for(let i=0;i<t.length;i++){const s=t[i],r=this.options_[s];typeof r!="undefined"&&(r?Vn(e,s,s):Br(e,s),e[s]=r)}return e}handleLateInit_(e){if(e.networkState===0||e.networkState===3)return;if(e.readyState===0){let i=!1;const s=function(){i=!0};this.on("loadstart",s);const r=function(){i||this.trigger("loadstart")};this.on("loadedmetadata",r),this.ready(function(){this.off("loadstart",s),this.off("loadedmetadata",r),i||this.trigger("loadstart")});return}const t=["loadstart"];t.push("loadedmetadata"),e.readyState>=2&&t.push("loadeddata"),e.readyState>=3&&t.push("canplay"),e.readyState>=4&&t.push("canplaythrough"),this.ready(function(){t.forEach(function(i){this.trigger(i)},this)})}setScrubbing(e){this.isScrubbing_=e}scrubbing(){return this.isScrubbing_}setCurrentTime(e){try{this.isScrubbing_&&this.el_.fastSeek&&jr?this.el_.fastSeek(e):this.el_.currentTime=e}catch(t){He(t,"Video is not ready. (Video.js)")}}duration(){if(this.el_.duration===1/0&&pi&&Ti&&this.el_.currentTime===0){const e=()=>{this.el_.currentTime>0&&(this.el_.duration===1/0&&this.trigger("durationchange"),this.off("timeupdate",e))};return this.on("timeupdate",e),NaN}return this.el_.duration||NaN}width(){return this.el_.offsetWidth}height(){return this.el_.offsetHeight}proxyWebkitFullscreen_(){if(!("webkitDisplayingFullscreen"in this.el_))return;const e=function(){this.trigger("fullscreenchange",{isFullscreen:!1}),this.el_.controls&&!this.options_.nativeControlsForTouch&&this.controls()&&(this.el_.controls=!1)},t=function(){"webkitPresentationMode"in this.el_&&this.el_.webkitPresentationMode!=="picture-in-picture"&&(this.one("webkitendfullscreen",e),this.trigger("fullscreenchange",{isFullscreen:!0,nativeIOSFullscreen:!0}))};this.on("webkitbeginfullscreen",t),this.on("dispose",()=>{this.off("webkitbeginfullscreen",t),this.off("webkitendfullscreen",e)})}supportsFullScreen(){return typeof this.el_.webkitEnterFullScreen=="function"}enterFullScreen(){const e=this.el_;if(e.paused&&e.networkState<=e.HAVE_METADATA)xi(this.el_.play()),this.setTimeout(function(){e.pause();try{e.webkitEnterFullScreen()}catch(t){this.trigger("fullscreenerror",t)}},0);else try{e.webkitEnterFullScreen()}catch(t){this.trigger("fullscreenerror",t)}}exitFullScreen(){if(!this.el_.webkitDisplayingFullscreen){this.trigger("fullscreenerror",new Error("The video is not fullscreen"));return}this.el_.webkitExitFullScreen()}requestPictureInPicture(){return this.el_.requestPictureInPicture()}requestVideoFrameCallback(e){return this.featuresVideoFrameCallback&&!this.el_.webkitKeys?this.el_.requestVideoFrameCallback(e):super.requestVideoFrameCallback(e)}cancelVideoFrameCallback(e){this.featuresVideoFrameCallback&&!this.el_.webkitKeys?this.el_.cancelVideoFrameCallback(e):super.cancelVideoFrameCallback(e)}src(e){if(e===void 0)return this.el_.src;this.setSrc(e)}addSourceElement(e,t){if(!e)return He.error("Invalid source URL."),!1;const i={src:e};t&&(i.type=t);const s=Le("source",{},i);return this.el_.appendChild(s),!0}removeSourceElement(e){if(!e)return He.error("Source URL is required to remove the source element."),!1;const t=this.el_.querySelectorAll("source");for(const i of t)if(i.src===e)return this.el_.removeChild(i),!0;return He.warn(`No matching source element found with src: ${e}`),!1}reset(){ve.resetMediaElement(this.el_)}currentSrc(){return this.currentSource_?this.currentSource_.src:this.el_.currentSrc}setControls(e){this.el_.controls=!!e}addTextTrack(e,t,i){return this.featuresNativeTextTracks?this.el_.addTextTrack(e,t,i):super.addTextTrack(e,t,i)}createRemoteTextTrack(e){if(!this.featuresNativeTextTracks)return super.createRemoteTextTrack(e);const t=I().createElement("track");return e.kind&&(t.kind=e.kind),e.label&&(t.label=e.label),(e.language||e.srclang)&&(t.srclang=e.language||e.srclang),e.default&&(t.default=e.default),e.id&&(t.id=e.id),e.src&&(t.src=e.src),t}addRemoteTextTrack(e,t){const i=super.addRemoteTextTrack(e,t);return this.featuresNativeTextTracks&&this.el().appendChild(i),i}removeRemoteTextTrack(e){if(super.removeRemoteTextTrack(e),this.featuresNativeTextTracks){const t=this.$$("track");let i=t.length;for(;i--;)(e===t[i]||e===t[i].track)&&this.el().removeChild(t[i])}}getVideoPlaybackQuality(){if(typeof this.el().getVideoPlaybackQuality=="function")return this.el().getVideoPlaybackQuality();const e={};return typeof this.el().webkitDroppedFrameCount!="undefined"&&typeof this.el().webkitDecodedFrameCount!="undefined"&&(e.droppedVideoFrames=this.el().webkitDroppedFrameCount,e.totalVideoFrames=this.el().webkitDecodedFrameCount),A().performance&&(e.creationTime=A().performance.now()),e}}Ar(ve,"TEST_VID",function(){if(!Un())return;const n=I().createElement("video"),e=I().createElement("track");return e.kind="captions",e.srclang="en",e.label="English",n.appendChild(e),n}),ve.isSupported=function(){try{ve.TEST_VID.volume=.5}catch(n){return!1}return!!(ve.TEST_VID&&ve.TEST_VID.canPlayType)},ve.canPlayType=function(n){return ve.TEST_VID.canPlayType(n)},ve.canPlaySource=function(n,e){return ve.canPlayType(n.type)},ve.canControlVolume=function(){try{const n=ve.TEST_VID.volume;ve.TEST_VID.volume=n/2+.1;const e=n!==ve.TEST_VID.volume;return e&&kt?(A().setTimeout(()=>{ve&&ve.prototype&&(ve.prototype.featuresVolumeControl=n!==ve.TEST_VID.volume)}),!1):e}catch(n){return!1}},ve.canMuteVolume=function(){try{const n=ve.TEST_VID.muted;return ve.TEST_VID.muted=!n,ve.TEST_VID.muted?Vn(ve.TEST_VID,"muted","muted"):Br(ve.TEST_VID,"muted","muted"),n!==ve.TEST_VID.muted}catch(n){return!1}},ve.canControlPlaybackRate=function(){if(pi&&Ti&&yr<58)return!1;try{const n=ve.TEST_VID.playbackRate;return ve.TEST_VID.playbackRate=n/2+.1,n!==ve.TEST_VID.playbackRate}catch(n){return!1}},ve.canOverrideAttributes=function(){try{const n=()=>{};Object.defineProperty(I().createElement("video"),"src",{get:n,set:n}),Object.defineProperty(I().createElement("audio"),"src",{get:n,set:n}),Object.defineProperty(I().createElement("video"),"innerHTML",{get:n,set:n}),Object.defineProperty(I().createElement("audio"),"innerHTML",{get:n,set:n})}catch(n){return!1}return!0},ve.supportsNativeTextTracks=function(){return jr||kt&&Ti},ve.supportsNativeVideoTracks=function(){return!!(ve.TEST_VID&&ve.TEST_VID.videoTracks)},ve.supportsNativeAudioTracks=function(){return!!(ve.TEST_VID&&ve.TEST_VID.audioTracks)},ve.Events=["loadstart","suspend","abort","error","emptied","stalled","loadedmetadata","loadeddata","canplay","canplaythrough","playing","waiting","seeking","seeked","ended","durationchange","timeupdate","progress","play","pause","ratechange","resize","volumechange"],[["featuresMuteControl","canMuteVolume"],["featuresPlaybackRate","canControlPlaybackRate"],["featuresSourceset","canOverrideAttributes"],["featuresNativeTextTracks","supportsNativeTextTracks"],["featuresNativeVideoTracks","supportsNativeVideoTracks"],["featuresNativeAudioTracks","supportsNativeAudioTracks"]].forEach(function([n,e]){Ar(ve.prototype,n,()=>ve[e](),!0)}),ve.prototype.featuresVolumeControl=ve.canControlVolume(),ve.prototype.movingMediaElementInDOM=!kt,ve.prototype.featuresFullscreenResize=!0,ve.prototype.featuresProgressEvents=!0,ve.prototype.featuresTimeupdateEvents=!0,ve.prototype.featuresVideoFrameCallback=!!(ve.TEST_VID&&ve.TEST_VID.requestVideoFrameCallback),ve.disposeMediaElement=function(n){if(n){for(n.parentNode&&n.parentNode.removeChild(n);n.hasChildNodes();)n.removeChild(n.firstChild);n.removeAttribute("src"),typeof n.load=="function"&&function(){try{n.load()}catch(e){}}()}},ve.resetMediaElement=function(n){if(!n)return;const e=n.querySelectorAll("source");let t=e.length;for(;t--;)n.removeChild(e[t]);n.removeAttribute("src"),typeof n.load=="function"&&function(){try{n.load()}catch(i){}}()},["muted","defaultMuted","autoplay","controls","loop","playsinline"].forEach(function(n){ve.prototype[n]=function(){return this.el_[n]||this.el_.hasAttribute(n)}}),["muted","defaultMuted","autoplay","loop","playsinline"].forEach(function(n){ve.prototype["set"+vt(n)]=function(e){this.el_[n]=e,e?this.el_.setAttribute(n,n):this.el_.removeAttribute(n)}}),["paused","currentTime","buffered","volume","poster","preload","error","seeking","seekable","ended","playbackRate","defaultPlaybackRate","disablePictureInPicture","played","networkState","readyState","videoWidth","videoHeight","crossOrigin"].forEach(function(n){ve.prototype[n]=function(){return this.el_[n]}}),["volume","src","poster","preload","playbackRate","defaultPlaybackRate","disablePictureInPicture","crossOrigin"].forEach(function(n){ve.prototype["set"+vt(n)]=function(e){this.el_[n]=e}}),["pause","load","play"].forEach(function(n){ve.prototype[n]=function(){return this.el_[n]()}}),Ve.withSourceHandlers(ve),ve.nativeSourceHandler={},ve.nativeSourceHandler.canPlayType=function(n){try{return ve.TEST_VID.canPlayType(n)}catch(e){return""}},ve.nativeSourceHandler.canHandleSource=function(n,e){if(n.type)return ve.nativeSourceHandler.canPlayType(n.type);if(n.src){const t=mo(n.src);return ve.nativeSourceHandler.canPlayType(`video/${t}`)}return""},ve.nativeSourceHandler.handleSource=function(n,e,t){e.setSrc(n.src)},ve.nativeSourceHandler.dispose=function(){},ve.registerSourceHandler(ve.nativeSourceHandler),Ve.registerTech("Html5",ve);const Bc=["progress","abort","suspend","emptied","stalled","loadedmetadata","loadeddata","timeupdate","resize","volumechange","texttrackchange"],No={canplay:"CanPlay",canplaythrough:"CanPlayThrough",playing:"Playing",seeked:"Seeked"},Uo=["tiny","xsmall","small","medium","large","xlarge","huge"],$r={};Uo.forEach(n=>{const e=n.charAt(0)==="x"?`x-${n.substring(1)}`:n;$r[n]=`vjs-layout-${e}`});const om={tiny:210,xsmall:320,small:425,medium:768,large:1440,xlarge:2560,huge:1/0};class at extends q{constructor(e,t,i){if(e.id=e.id||t.id||`vjs_video_${ni()}`,t=Object.assign(at.getTagSettings(e),t),t.initChildren=!1,t.createEl=!1,t.evented=!1,t.reportTouchActivity=!1,!t.language){const a=e.closest("[lang]");a&&(t.language=a.getAttribute("lang"))}if(super(null,t,i),this.boundDocumentFullscreenChange_=a=>this.documentFullscreenChange_(a),this.boundFullWindowOnEscKey_=a=>this.fullWindowOnEscKey(a),this.boundUpdateStyleEl_=a=>this.updateStyleEl_(a),this.boundApplyInitTime_=a=>this.applyInitTime_(a),this.boundUpdateCurrentBreakpoint_=a=>this.updateCurrentBreakpoint_(a),this.boundHandleTechClick_=a=>this.handleTechClick_(a),this.boundHandleTechDoubleClick_=a=>this.handleTechDoubleClick_(a),this.boundHandleTechTouchStart_=a=>this.handleTechTouchStart_(a),this.boundHandleTechTouchMove_=a=>this.handleTechTouchMove_(a),this.boundHandleTechTouchEnd_=a=>this.handleTechTouchEnd_(a),this.boundHandleTechTap_=a=>this.handleTechTap_(a),this.boundUpdatePlayerHeightOnAudioOnlyMode_=a=>this.updatePlayerHeightOnAudioOnlyMode_(a),this.isFullscreen_=!1,this.log=ql(this.id_),this.fsApi_=gr,this.isPosterFromTech_=!1,this.queuedCallbacks_=[],this.isReady_=!1,this.hasStarted_=!1,this.userActive_=!1,this.debugEnabled_=!1,this.audioOnlyMode_=!1,this.audioPosterMode_=!1,this.audioOnlyCache_={controlBarHeight:null,playerHeight:null,hiddenChildren:[]},!this.options_||!this.options_.techOrder||!this.options_.techOrder.length)throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");if(this.tag=e,this.tagAttributes=e&&Qi(e),this.language(this.options_.language),t.languages){const a={};Object.getOwnPropertyNames(t.languages).forEach(function(l){a[l.toLowerCase()]=t.languages[l]}),this.languages_=a}else this.languages_=at.prototype.options_.languages;this.resetCache_(),this.poster_=t.poster||"",this.controls_=!!t.controls,e.controls=!1,e.removeAttribute("controls"),this.changingSrc_=!1,this.playCallbacks_=[],this.playTerminatedQueue_=[],e.hasAttribute("autoplay")?this.autoplay(!0):this.autoplay(this.options_.autoplay),t.plugins&&Object.keys(t.plugins).forEach(a=>{if(typeof this[a]!="function")throw new Error(`plugin "${a}" does not exist`)}),this.scrubbing_=!1,this.el_=this.createEl(),ro(this,{eventBusKey:"el_"}),this.fsApi_.requestFullscreen&&(Xt(I(),this.fsApi_.fullscreenchange,this.boundDocumentFullscreenChange_),this.on(this.fsApi_.fullscreenchange,this.boundDocumentFullscreenChange_)),this.fluid_&&this.on(["playerreset","resize"],this.boundUpdateStyleEl_);const s=Ze(this.options_);if(t.plugins&&Object.keys(t.plugins).forEach(a=>{this[a](t.plugins[a])}),t.debug&&this.debug(!0),this.options_.playerOptions=s,this.middleware_=[],this.playbackRates(t.playbackRates),t.experimentalSvgIcons){const l=new(A()).DOMParser().parseFromString(Dp,"image/svg+xml");if(l.querySelector("parsererror"))He.warn("Failed to load SVG Icons. Falling back to Font Icons."),this.options_.experimentalSvgIcons=null;else{const p=l.documentElement;p.style.display="none",this.el_.appendChild(p),this.addClass("vjs-svg-icons-enabled")}}this.initChildren(),this.isAudio(e.nodeName.toLowerCase()==="audio"),this.controls()?this.addClass("vjs-controls-enabled"):this.addClass("vjs-controls-disabled"),this.el_.setAttribute("role","region"),this.isAudio()?this.el_.setAttribute("aria-label",this.localize("Audio Player")):this.el_.setAttribute("aria-label",this.localize("Video Player")),this.isAudio()&&this.addClass("vjs-audio"),t.spatialNavigation&&t.spatialNavigation.enabled&&(this.spatialNavigation=new kp(this),this.addClass("vjs-spatial-navigation-enabled")),ws&&this.addClass("vjs-touch-enabled"),kt||this.addClass("vjs-workinghover"),at.players[this.id_]=this;const r=$a.split(".")[0];this.addClass(`vjs-v${r}`),this.userActive(!0),this.reportUserActivity(),this.one("play",a=>this.listenForUserActivity_(a)),this.on("keydown",a=>this.handleKeyDown(a)),this.on("languagechange",a=>this.handleLanguagechange(a)),this.breakpoints(this.options_.breakpoints),this.responsive(this.options_.responsive),this.on("ready",()=>{this.audioPosterMode(this.options_.audioPosterMode),this.audioOnlyMode(this.options_.audioOnlyMode)})}dispose(){this.trigger("dispose"),this.off("dispose"),It(I(),this.fsApi_.fullscreenchange,this.boundDocumentFullscreenChange_),It(I(),"keydown",this.boundFullWindowOnEscKey_),this.styleEl_&&this.styleEl_.parentNode&&(this.styleEl_.parentNode.removeChild(this.styleEl_),this.styleEl_=null),at.players[this.id_]=null,this.tag&&this.tag.player&&(this.tag.player=null),this.el_&&this.el_.player&&(this.el_.player=null),this.tech_&&(this.tech_.dispose(),this.isPosterFromTech_=!1,this.poster_=""),this.playerElIngest_&&(this.playerElIngest_=null),this.tag&&(this.tag=null),Sp(this),Nt.names.forEach(e=>{const t=Nt[e],i=this[t.getterName]();i&&i.off&&i.off()}),super.dispose({restoreEl:this.options_.restoreEl})}createEl(){let e=this.tag,t,i=this.playerElIngest_=e.parentNode&&e.parentNode.hasAttribute&&e.parentNode.hasAttribute("data-vjs-player");const s=this.tag.tagName.toLowerCase()==="video-js";i?t=this.el_=e.parentNode:s||(t=this.el_=super.createEl("div"));const r=Qi(e);if(s){for(t=this.el_=e,e=this.tag=I().createElement("video");t.children.length;)e.appendChild(t.firstChild);Bs(t,"video-js")||fn(t,"video-js"),t.appendChild(e),i=this.playerElIngest_=t,Object.keys(t).forEach(h=>{try{e[h]=t[h]}catch(p){}})}e.setAttribute("tabindex","-1"),r.tabindex="-1",Ti&&br&&(e.setAttribute("role","application"),r.role="application"),e.removeAttribute("width"),e.removeAttribute("height"),"width"in r&&delete r.width,"height"in r&&delete r.height,Object.getOwnPropertyNames(r).forEach(function(h){s&&h==="class"||t.setAttribute(h,r[h]),s&&e.setAttribute(h,r[h])}),e.playerId=e.id,e.id+="_html5_api",e.className="vjs-tech",e.player=t.player=this,this.addClass("vjs-paused");const a=["IS_SMART_TV","IS_TIZEN","IS_WEBOS","IS_ANDROID","IS_IPAD","IS_IPHONE","IS_CHROMECAST_RECEIVER"].filter(h=>Jl[h]).map(h=>"vjs-device-"+h.substring(3).toLowerCase().replace(/\_/g,"-"));if(this.addClass(...a),A().VIDEOJS_NO_DYNAMIC_STYLE!==!0){this.styleEl_=pu("vjs-styles-dimensions");const h=Ji(".vjs-styles-defaults"),p=Ji("head");p.insertBefore(this.styleEl_,h?h.nextSibling:p.firstChild)}this.fill_=!1,this.fluid_=!1,this.width(this.options_.width),this.height(this.options_.height),this.fill(this.options_.fill),this.fluid(this.options_.fluid),this.aspectRatio(this.options_.aspectRatio),this.crossOrigin(this.options_.crossOrigin||this.options_.crossorigin);const l=e.getElementsByTagName("a");for(let h=0;h<l.length;h++){const p=l.item(h);fn(p,"vjs-hidden"),p.setAttribute("hidden","hidden")}return e.initNetworkState_=e.networkState,e.parentNode&&!i&&e.parentNode.insertBefore(t,e),Ka(e,t),this.children_.unshift(e),this.el_.setAttribute("lang",this.language_),this.el_.setAttribute("translate","no"),this.el_=t,t}crossOrigin(e){if(typeof e=="undefined")return this.techGet_("crossOrigin");if(e!==null&&e!=="anonymous"&&e!=="use-credentials"){He.warn(`crossOrigin must be null,  "anonymous" or "use-credentials", given "${e}"`);return}this.techCall_("setCrossOrigin",e),this.posterImage&&this.posterImage.crossOrigin(e)}width(e){return this.dimension("width",e)}height(e){return this.dimension("height",e)}dimension(e,t){const i=e+"_";if(t===void 0)return this[i]||0;if(t===""||t==="auto"){this[i]=void 0,this.updateStyleEl_();return}const s=parseFloat(t);if(isNaN(s)){He.error(`Improper value "${t}" supplied for for ${e}`);return}this[i]=s,this.updateStyleEl_()}fluid(e){if(e===void 0)return!!this.fluid_;this.fluid_=!!e,Fi(this)&&this.off(["playerreset","resize"],this.boundUpdateStyleEl_),e?(this.addClass("vjs-fluid"),this.fill(!1),sp(this,()=>{this.on(["playerreset","resize"],this.boundUpdateStyleEl_)})):this.removeClass("vjs-fluid"),this.updateStyleEl_()}fill(e){if(e===void 0)return!!this.fill_;this.fill_=!!e,e?(this.addClass("vjs-fill"),this.fluid(!1)):this.removeClass("vjs-fill")}aspectRatio(e){if(e===void 0)return this.aspectRatio_;if(!/^\d+\:\d+$/.test(e))throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");this.aspectRatio_=e,this.fluid(!0),this.updateStyleEl_()}updateStyleEl_(){if(A().VIDEOJS_NO_DYNAMIC_STYLE===!0){const l=typeof this.width_=="number"?this.width_:this.options_.width,h=typeof this.height_=="number"?this.height_:this.options_.height,p=this.tech_&&this.tech_.el();p&&(l>=0&&(p.width=l),h>=0&&(p.height=h));return}let e,t,i,s;this.aspectRatio_!==void 0&&this.aspectRatio_!=="auto"?i=this.aspectRatio_:this.videoWidth()>0?i=this.videoWidth()+":"+this.videoHeight():i="16:9";const r=i.split(":"),a=r[1]/r[0];this.width_!==void 0?e=this.width_:this.height_!==void 0?e=this.height_/a:e=this.videoWidth()||300,this.height_!==void 0?t=this.height_:t=e*a,/^[^a-zA-Z]/.test(this.id())?s="dimensions-"+this.id():s=this.id()+"-dimensions",this.addClass(s),mu(this.styleEl_,`
      .${s} {
        width: ${e}px;
        height: ${t}px;
      }

      .${s}.vjs-fluid:not(.vjs-audio-only-mode) {
        padding-top: ${a*100}%;
      }
    `)}loadTech_(e,t){this.tech_&&this.unloadTech_();const i=vt(e),s=e.charAt(0).toLowerCase()+e.slice(1);i!=="Html5"&&this.tag&&(Ve.getTech("Html5").disposeMediaElement(this.tag),this.tag.player=null,this.tag=null),this.techName_=i,this.isReady_=!1;let r=this.autoplay();(typeof this.autoplay()=="string"||this.autoplay()===!0&&this.options_.normalizeAutoplay)&&(r=!1);const a={source:t,autoplay:r,nativeControlsForTouch:this.options_.nativeControlsForTouch,playerId:this.id(),techId:`${this.id()}_${s}_api`,playsinline:this.options_.playsinline,preload:this.options_.preload,loop:this.options_.loop,disablePictureInPicture:this.options_.disablePictureInPicture,muted:this.options_.muted,poster:this.poster(),language:this.language(),playerElIngest:this.playerElIngest_||!1,"vtt.js":this.options_["vtt.js"],canOverridePoster:!!this.options_.techCanOverridePoster,enableSourceset:this.options_.enableSourceset};Nt.names.forEach(h=>{const p=Nt[h];a[p.getterName]=this[p.privateName]}),Object.assign(a,this.options_[i]),Object.assign(a,this.options_[s]),Object.assign(a,this.options_[e.toLowerCase()]),this.tag&&(a.tag=this.tag),t&&t.src===this.cache_.src&&this.cache_.currentTime>0&&(a.startTime=this.cache_.currentTime);const l=Ve.getTech(e);if(!l)throw new Error(`No Tech named '${i}' exists! '${i}' should be registered using videojs.registerTech()'`);this.tech_=new l(a),this.tech_.ready(nt(this,this.handleTechReady_),!0),ju.jsonToTextTracks(this.textTracksJson_||[],this.tech_),Bc.forEach(h=>{this.on(this.tech_,h,p=>this[`handleTech${vt(h)}_`](p))}),Object.keys(No).forEach(h=>{this.on(this.tech_,h,p=>{if(this.tech_.playbackRate()===0&&this.tech_.seeking()){this.queuedCallbacks_.push({callback:this[`handleTech${No[h]}_`].bind(this),event:p});return}this[`handleTech${No[h]}_`](p)})}),this.on(this.tech_,"loadstart",h=>this.handleTechLoadStart_(h)),this.on(this.tech_,"sourceset",h=>this.handleTechSourceset_(h)),this.on(this.tech_,"waiting",h=>this.handleTechWaiting_(h)),this.on(this.tech_,"ended",h=>this.handleTechEnded_(h)),this.on(this.tech_,"seeking",h=>this.handleTechSeeking_(h)),this.on(this.tech_,"play",h=>this.handleTechPlay_(h)),this.on(this.tech_,"pause",h=>this.handleTechPause_(h)),this.on(this.tech_,"durationchange",h=>this.handleTechDurationChange_(h)),this.on(this.tech_,"fullscreenchange",(h,p)=>this.handleTechFullscreenChange_(h,p)),this.on(this.tech_,"fullscreenerror",(h,p)=>this.handleTechFullscreenError_(h,p)),this.on(this.tech_,"enterpictureinpicture",h=>this.handleTechEnterPictureInPicture_(h)),this.on(this.tech_,"leavepictureinpicture",h=>this.handleTechLeavePictureInPicture_(h)),this.on(this.tech_,"error",h=>this.handleTechError_(h)),this.on(this.tech_,"posterchange",h=>this.handleTechPosterChange_(h)),this.on(this.tech_,"textdata",h=>this.handleTechTextData_(h)),this.on(this.tech_,"ratechange",h=>this.handleTechRateChange_(h)),this.on(this.tech_,"loadedmetadata",this.boundUpdateStyleEl_),this.usingNativeControls(this.techGet_("controls")),this.controls()&&!this.usingNativeControls()&&this.addTechControlsListeners_(),this.tech_.el().parentNode!==this.el()&&(i!=="Html5"||!this.tag)&&Ka(this.tech_.el(),this.el()),this.tag&&(this.tag.player=null,this.tag=null)}unloadTech_(){Nt.names.forEach(e=>{const t=Nt[e];this[t.privateName]=this[t.getterName]()}),this.textTracksJson_=ju.textTracksToJson(this.tech_),this.isReady_=!1,this.tech_.dispose(),this.tech_=!1,this.isPosterFromTech_&&(this.poster_="",this.trigger("posterchange")),this.isPosterFromTech_=!1}tech(e){return e===void 0&&He.warn(`Using the tech directly can be dangerous. I hope you know what you're doing.
See https://github.com/videojs/video.js/issues/2617 for more info.
`),this.tech_}version(){return{"video.js":$a}}addTechControlsListeners_(){this.removeTechControlsListeners_(),this.on(this.tech_,"click",this.boundHandleTechClick_),this.on(this.tech_,"dblclick",this.boundHandleTechDoubleClick_),this.on(this.tech_,"touchstart",this.boundHandleTechTouchStart_),this.on(this.tech_,"touchmove",this.boundHandleTechTouchMove_),this.on(this.tech_,"touchend",this.boundHandleTechTouchEnd_),this.on(this.tech_,"tap",this.boundHandleTechTap_)}removeTechControlsListeners_(){this.off(this.tech_,"tap",this.boundHandleTechTap_),this.off(this.tech_,"touchstart",this.boundHandleTechTouchStart_),this.off(this.tech_,"touchmove",this.boundHandleTechTouchMove_),this.off(this.tech_,"touchend",this.boundHandleTechTouchEnd_),this.off(this.tech_,"click",this.boundHandleTechClick_),this.off(this.tech_,"dblclick",this.boundHandleTechDoubleClick_)}handleTechReady_(){this.triggerReady(),this.cache_.volume&&this.techCall_("setVolume",this.cache_.volume),this.handleTechPosterChange_(),this.handleTechDurationChange_()}handleTechLoadStart_(){this.removeClass("vjs-ended","vjs-seeking"),this.error(null),this.handleTechDurationChange_(),this.paused()?(this.hasStarted(!1),this.trigger("loadstart")):this.trigger("loadstart"),this.manualAutoplay_(this.autoplay()===!0&&this.options_.normalizeAutoplay?"play":this.autoplay())}manualAutoplay_(e){if(!this.tech_||typeof e!="string")return;const t=()=>{const s=this.muted();this.muted(!0);const r=()=>{this.muted(s)};this.playTerminatedQueue_.push(r);const a=this.play();if(Os(a))return a.catch(l=>{throw r(),new Error(`Rejection at manualAutoplay. Restoring muted value. ${l||""}`)})};let i;if(e==="any"&&!this.muted()?(i=this.play(),Os(i)&&(i=i.catch(t))):e==="muted"&&!this.muted()?i=t():i=this.play(),!!Os(i))return i.then(()=>{this.trigger({type:"autoplay-success",autoplay:e})}).catch(()=>{this.trigger({type:"autoplay-failure",autoplay:e})})}updateSourceCaches_(e=""){let t=e,i="";typeof t!="string"&&(t=e.src,i=e.type),this.cache_.source=this.cache_.source||{},this.cache_.sources=this.cache_.sources||[],t&&!i&&(i=Bp(this,t)),this.cache_.source=Ze({},e,{src:t,type:i});const s=this.cache_.sources.filter(h=>h.src&&h.src===t),r=[],a=this.$$("source"),l=[];for(let h=0;h<a.length;h++){const p=Qi(a[h]);r.push(p),p.src&&p.src===t&&l.push(p.src)}l.length&&!s.length?this.cache_.sources=r:s.length||(this.cache_.sources=[this.cache_.source]),this.cache_.src=t}handleTechSourceset_(e){if(!this.changingSrc_){let t=r=>this.updateSourceCaches_(r);const i=this.currentSource().src,s=e.src;i&&!/^blob:/.test(i)&&/^blob:/.test(s)&&(!this.lastSource_||this.lastSource_.tech!==s&&this.lastSource_.player!==i)&&(t=()=>{}),t(s),e.src||this.tech_.any(["sourceset","loadstart"],r=>{if(r.type==="sourceset")return;const a=this.techGet_("currentSrc");this.lastSource_.tech=a,this.updateSourceCaches_(a)})}this.lastSource_={player:this.currentSource().src,tech:e.src},this.trigger({src:e.src,type:"sourceset"})}hasStarted(e){if(e===void 0)return this.hasStarted_;e!==this.hasStarted_&&(this.hasStarted_=e,this.hasStarted_?this.addClass("vjs-has-started"):this.removeClass("vjs-has-started"))}handleTechPlay_(){this.removeClass("vjs-ended","vjs-paused"),this.addClass("vjs-playing"),this.hasStarted(!0),this.trigger("play")}handleTechRateChange_(){this.tech_.playbackRate()>0&&this.cache_.lastPlaybackRate===0&&(this.queuedCallbacks_.forEach(e=>e.callback(e.event)),this.queuedCallbacks_=[]),this.cache_.lastPlaybackRate=this.tech_.playbackRate(),this.trigger("ratechange")}handleTechWaiting_(){this.addClass("vjs-waiting"),this.trigger("waiting");const e=this.currentTime(),t=()=>{e!==this.currentTime()&&(this.removeClass("vjs-waiting"),this.off("timeupdate",t))};this.on("timeupdate",t)}handleTechCanPlay_(){this.removeClass("vjs-waiting"),this.trigger("canplay")}handleTechCanPlayThrough_(){this.removeClass("vjs-waiting"),this.trigger("canplaythrough")}handleTechPlaying_(){this.removeClass("vjs-waiting"),this.trigger("playing")}handleTechSeeking_(){this.addClass("vjs-seeking"),this.trigger("seeking")}handleTechSeeked_(){this.removeClass("vjs-seeking","vjs-ended"),this.trigger("seeked")}handleTechPause_(){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.trigger("pause")}handleTechEnded_(){this.addClass("vjs-ended"),this.removeClass("vjs-waiting"),this.options_.loop?(this.currentTime(0),this.play()):this.paused()||this.pause(),this.trigger("ended")}handleTechDurationChange_(){this.duration(this.techGet_("duration"))}handleTechClick_(e){this.controls_&&(this.options_===void 0||this.options_.userActions===void 0||this.options_.userActions.click===void 0||this.options_.userActions.click!==!1)&&(this.options_!==void 0&&this.options_.userActions!==void 0&&typeof this.options_.userActions.click=="function"?this.options_.userActions.click.call(this,e):this.paused()?xi(this.play()):this.pause())}handleTechDoubleClick_(e){if(!this.controls_)return;Array.prototype.some.call(this.$$(".vjs-control-bar, .vjs-modal-dialog"),i=>i.contains(e.target))||(this.options_===void 0||this.options_.userActions===void 0||this.options_.userActions.doubleClick===void 0||this.options_.userActions.doubleClick!==!1)&&(this.options_!==void 0&&this.options_.userActions!==void 0&&typeof this.options_.userActions.doubleClick=="function"?this.options_.userActions.doubleClick.call(this,e):this.isInPictureInPicture()&&!I().pictureInPictureElement?this.exitPictureInPicture():this.isFullscreen()?this.exitFullscreen():this.requestFullscreen())}handleTechTap_(){this.userActive(!this.userActive())}handleTechTouchStart_(){this.userWasActive=this.userActive()}handleTechTouchMove_(){this.userWasActive&&this.reportUserActivity()}handleTechTouchEnd_(e){e.cancelable&&e.preventDefault()}toggleFullscreenClass_(){this.isFullscreen()?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen")}documentFullscreenChange_(e){const t=e.target.player;if(t&&t!==this)return;const i=this.el();let s=I()[this.fsApi_.fullscreenElement]===i;!s&&i.matches&&(s=i.matches(":"+this.fsApi_.fullscreen)),this.isFullscreen(s)}handleTechFullscreenChange_(e,t){t&&(t.nativeIOSFullscreen&&(this.addClass("vjs-ios-native-fs"),this.tech_.one("webkitendfullscreen",()=>{this.removeClass("vjs-ios-native-fs")})),this.isFullscreen(t.isFullscreen))}handleTechFullscreenError_(e,t){this.trigger("fullscreenerror",t)}togglePictureInPictureClass_(){this.isInPictureInPicture()?this.addClass("vjs-picture-in-picture"):this.removeClass("vjs-picture-in-picture")}handleTechEnterPictureInPicture_(e){this.isInPictureInPicture(!0)}handleTechLeavePictureInPicture_(e){this.isInPictureInPicture(!1)}handleTechError_(){const e=this.tech_.error();e&&this.error(e)}handleTechTextData_(){let e=null;arguments.length>1&&(e=arguments[1]),this.trigger("textdata",e)}getCache(){return this.cache_}resetCache_(){this.cache_={currentTime:0,initTime:0,inactivityTimeout:this.options_.inactivityTimeout,duration:NaN,lastVolume:1,lastPlaybackRate:this.defaultPlaybackRate(),media:null,src:"",source:{},sources:[],playbackRates:[],volume:1}}techCall_(e,t){this.ready(function(){if(e in Cp)return Ep(this.middleware_,this.tech_,e,t);if(e in Ru)return Lu(this.middleware_,this.tech_,e,t);try{this.tech_&&this.tech_[e](t)}catch(i){throw He(i),i}},!0)}techGet_(e){if(!(!this.tech_||!this.tech_.isReady_)){if(e in Tp)return bp(this.middleware_,this.tech_,e);if(e in Ru)return Lu(this.middleware_,this.tech_,e);try{return this.tech_[e]()}catch(t){throw this.tech_[e]===void 0?(He(`Video.js: ${e} method not defined for ${this.techName_} playback technology.`,t),t):t.name==="TypeError"?(He(`Video.js: ${e} unavailable on ${this.techName_} playback technology element.`,t),this.tech_.isReady_=!1,t):(He(t),t)}}}play(){return new Promise(e=>{this.play_(e)})}play_(e=xi){this.playCallbacks_.push(e);const t=!!(!this.changingSrc_&&(this.src()||this.currentSrc())),i=!!(jr||kt);if(this.waitToPlay_&&(this.off(["ready","loadstart"],this.waitToPlay_),this.waitToPlay_=null),!this.isReady_||!t){this.waitToPlay_=a=>{this.play_()},this.one(["ready","loadstart"],this.waitToPlay_),!t&&i&&this.load();return}const s=this.techGet_("play");i&&this.hasClass("vjs-ended")&&this.resetProgressBar_(),s===null?this.runPlayTerminatedQueue_():this.runPlayCallbacks_(s)}runPlayTerminatedQueue_(){const e=this.playTerminatedQueue_.slice(0);this.playTerminatedQueue_=[],e.forEach(function(t){t()})}runPlayCallbacks_(e){const t=this.playCallbacks_.slice(0);this.playCallbacks_=[],this.playTerminatedQueue_=[],t.forEach(function(i){i(e)})}pause(){this.techCall_("pause")}paused(){return this.techGet_("paused")!==!1}played(){return this.techGet_("played")||mi(0,0)}scrubbing(e){if(typeof e=="undefined")return this.scrubbing_;this.scrubbing_=!!e,this.techCall_("setScrubbing",this.scrubbing_),e?this.addClass("vjs-scrubbing"):this.removeClass("vjs-scrubbing")}currentTime(e){if(e===void 0)return this.cache_.currentTime=this.techGet_("currentTime")||0,this.cache_.currentTime;if(e<0&&(e=0),!this.isReady_||this.changingSrc_||!this.tech_||!this.tech_.isReady_){this.cache_.initTime=e,this.off("canplay",this.boundApplyInitTime_),this.one("canplay",this.boundApplyInitTime_);return}this.techCall_("setCurrentTime",e),this.cache_.initTime=0,isFinite(e)&&(this.cache_.currentTime=Number(e))}applyInitTime_(){this.currentTime(this.cache_.initTime)}duration(e){if(e===void 0)return this.cache_.duration!==void 0?this.cache_.duration:NaN;e=parseFloat(e),e<0&&(e=1/0),e!==this.cache_.duration&&(this.cache_.duration=e,e===1/0?this.addClass("vjs-live"):this.removeClass("vjs-live"),isNaN(e)||this.trigger("durationchange"))}remainingTime(){return this.duration()-this.currentTime()}remainingTimeDisplay(){return Math.floor(this.duration())-Math.floor(this.currentTime())}buffered(){let e=this.techGet_("buffered");return(!e||!e.length)&&(e=mi(0,0)),e}seekable(){let e=this.techGet_("seekable");return(!e||!e.length)&&(e=mi(0,0)),e}seeking(){return this.techGet_("seeking")}ended(){return this.techGet_("ended")}networkState(){return this.techGet_("networkState")}readyState(){return this.techGet_("readyState")}bufferedPercent(){return Su(this.buffered(),this.duration())}bufferedEnd(){const e=this.buffered(),t=this.duration();let i=e.end(e.length-1);return i>t&&(i=t),i}volume(e){let t;if(e!==void 0){t=Math.max(0,Math.min(1,e)),this.cache_.volume=t,this.techCall_("setVolume",t),t>0&&this.lastVolume_(t);return}return t=parseFloat(this.techGet_("volume")),isNaN(t)?1:t}muted(e){if(e!==void 0){this.techCall_("setMuted",e);return}return this.techGet_("muted")||!1}defaultMuted(e){return e!==void 0&&this.techCall_("setDefaultMuted",e),this.techGet_("defaultMuted")||!1}lastVolume_(e){if(e!==void 0&&e!==0){this.cache_.lastVolume=e;return}return this.cache_.lastVolume}supportsFullScreen(){return this.techGet_("supportsFullScreen")||!1}isFullscreen(e){if(e!==void 0){const t=this.isFullscreen_;this.isFullscreen_=!!e,this.isFullscreen_!==t&&this.fsApi_.prefixed&&this.trigger("fullscreenchange"),this.toggleFullscreenClass_();return}return this.isFullscreen_}requestFullscreen(e){this.isInPictureInPicture()&&this.exitPictureInPicture();const t=this;return new Promise((i,s)=>{function r(){t.off("fullscreenerror",l),t.off("fullscreenchange",a)}function a(){r(),i()}function l(p,g){r(),s(g)}t.one("fullscreenchange",a),t.one("fullscreenerror",l);const h=t.requestFullscreenHelper_(e);h&&(h.then(r,r),h.then(i,s))})}requestFullscreenHelper_(e){let t;if(this.fsApi_.prefixed||(t=this.options_.fullscreen&&this.options_.fullscreen.options||{},e!==void 0&&(t=e)),this.fsApi_.requestFullscreen){const i=this.el_[this.fsApi_.requestFullscreen](t);return i&&i.then(()=>this.isFullscreen(!0),()=>this.isFullscreen(!1)),i}else this.tech_.supportsFullScreen()&&!this.options_.preferFullWindow?this.techCall_("enterFullScreen"):this.enterFullWindow()}exitFullscreen(){const e=this;return new Promise((t,i)=>{function s(){e.off("fullscreenerror",a),e.off("fullscreenchange",r)}function r(){s(),t()}function a(h,p){s(),i(p)}e.one("fullscreenchange",r),e.one("fullscreenerror",a);const l=e.exitFullscreenHelper_();l&&(l.then(s,s),l.then(t,i))})}exitFullscreenHelper_(){if(this.fsApi_.requestFullscreen){const e=I()[this.fsApi_.exitFullscreen]();return e&&xi(e.then(()=>this.isFullscreen(!1))),e}else this.tech_.supportsFullScreen()&&!this.options_.preferFullWindow?this.techCall_("exitFullScreen"):this.exitFullWindow()}enterFullWindow(){this.isFullscreen(!0),this.isFullWindow=!0,this.docOrigOverflow=I().documentElement.style.overflow,Xt(I(),"keydown",this.boundFullWindowOnEscKey_),I().documentElement.style.overflow="hidden",fn(I().body,"vjs-full-window"),this.trigger("enterFullWindow")}fullWindowOnEscKey(e){e.key==="Escape"&&this.isFullscreen()===!0&&(this.isFullWindow?this.exitFullWindow():this.exitFullscreen())}exitFullWindow(){this.isFullscreen(!1),this.isFullWindow=!1,It(I(),"keydown",this.boundFullWindowOnEscKey_),I().documentElement.style.overflow=this.docOrigOverflow,wr(I().body,"vjs-full-window"),this.trigger("exitFullWindow")}disablePictureInPicture(e){if(e===void 0)return this.techGet_("disablePictureInPicture");this.techCall_("setDisablePictureInPicture",e),this.options_.disablePictureInPicture=e,this.trigger("disablepictureinpicturechanged")}isInPictureInPicture(e){if(e!==void 0){this.isInPictureInPicture_=!!e,this.togglePictureInPictureClass_();return}return!!this.isInPictureInPicture_}requestPictureInPicture(){if(this.options_.enableDocumentPictureInPicture&&A().documentPictureInPicture){const e=I().createElement(this.el().tagName);return e.classList=this.el().classList,e.classList.add("vjs-pip-container"),this.posterImage&&e.appendChild(this.posterImage.el().cloneNode(!0)),this.titleBar&&e.appendChild(this.titleBar.el().cloneNode(!0)),e.appendChild(Le("p",{className:"vjs-pip-text"},{},this.localize("Playing in picture-in-picture"))),A().documentPictureInPicture.requestWindow({width:this.videoWidth(),height:this.videoHeight()}).then(t=>(du(t),this.el_.parentNode.insertBefore(e,this.el_),t.document.body.appendChild(this.el_),t.document.body.classList.add("vjs-pip-window"),this.player_.isInPictureInPicture(!0),this.player_.trigger({type:"enterpictureinpicture",pipWindow:t}),t.addEventListener("pagehide",i=>{const s=i.target.querySelector(".video-js");e.parentNode.replaceChild(s,e),this.player_.isInPictureInPicture(!1),this.player_.trigger("leavepictureinpicture")}),t))}return"pictureInPictureEnabled"in I()&&this.disablePictureInPicture()===!1?this.techGet_("requestPictureInPicture"):Promise.reject("No PiP mode is available")}exitPictureInPicture(){if(A().documentPictureInPicture&&A().documentPictureInPicture.window)return A().documentPictureInPicture.window.close(),Promise.resolve();if("pictureInPictureEnabled"in I())return I().exitPictureInPicture()}handleKeyDown(e){const{userActions:t}=this.options_;!t||!t.hotkeys||(s=>{const r=s.tagName.toLowerCase();if(s.isContentEditable)return!0;const a=["button","checkbox","hidden","radio","reset","submit"];return r==="input"?a.indexOf(s.type)===-1:["textarea"].indexOf(r)!==-1})(this.el_.ownerDocument.activeElement)||(typeof t.hotkeys=="function"?t.hotkeys.call(this,e):this.handleHotkeys(e))}handleHotkeys(e){const t=this.options_.userActions?this.options_.userActions.hotkeys:{},{fullscreenKey:i=a=>e.key.toLowerCase()==="f",muteKey:s=a=>e.key.toLowerCase()==="m",playPauseKey:r=a=>e.key.toLowerCase()==="k"||e.key.toLowerCase()===" "}=t;if(i.call(this,e)){e.preventDefault(),e.stopPropagation();const a=q.getComponent("FullscreenToggle");I()[this.fsApi_.fullscreenEnabled]!==!1&&a.prototype.handleClick.call(this,e)}else s.call(this,e)?(e.preventDefault(),e.stopPropagation(),q.getComponent("MuteToggle").prototype.handleClick.call(this,e)):r.call(this,e)&&(e.preventDefault(),e.stopPropagation(),q.getComponent("PlayToggle").prototype.handleClick.call(this,e))}canPlayType(e){let t;for(let i=0,s=this.options_.techOrder;i<s.length;i++){const r=s[i];let a=Ve.getTech(r);if(a||(a=q.getComponent(r)),!a){He.error(`The "${r}" tech is undefined. Skipped browser support check for that tech.`);continue}if(a.isSupported()&&(t=a.canPlayType(e),t))return t}return""}selectSource(e){const t=this.options_.techOrder.map(l=>[l,Ve.getTech(l)]).filter(([l,h])=>h?h.isSupported():(He.error(`The "${l}" tech is undefined. Skipped browser support check for that tech.`),!1)),i=function(l,h,p){let g;return l.some(y=>h.some(w=>{if(g=p(y,w),g)return!0})),g};let s;const r=l=>(h,p)=>l(p,h),a=([l,h],p)=>{if(h.canPlaySource(p,this.options_[l.toLowerCase()]))return{source:p,tech:l}};return this.options_.sourceOrder?s=i(e,t,r(a)):s=i(t,e,a),s||!1}handleSrc_(e,t){if(typeof e=="undefined")return this.cache_.src||"";this.resetRetryOnError_&&this.resetRetryOnError_();const i=Mu(e);if(!i.length){this.setTimeout(function(){this.error({code:4,message:this.options_.notSupportedMessage})},0);return}if(this.changingSrc_=!0,t||(this.cache_.sources=i),this.updateSourceCaches_(i[0]),yp(this,i[0],(s,r)=>{if(this.middleware_=r,t||(this.cache_.sources=i),this.updateSourceCaches_(s),this.src_(s)){if(i.length>1)return this.handleSrc_(i.slice(1));this.changingSrc_=!1,this.setTimeout(function(){this.error({code:4,message:this.options_.notSupportedMessage})},0),this.triggerReady();return}_p(r,this.tech_)}),i.length>1){const s=()=>{this.error(null),this.handleSrc_(i.slice(1),!0)},r=()=>{this.off("error",s)};this.one("error",s),this.one("playing",r),this.resetRetryOnError_=()=>{this.off("error",s),this.off("playing",r)}}}src(e){return this.handleSrc_(e,!1)}src_(e){const t=this.selectSource([e]);return t?bu(t.tech,this.techName_)?(this.ready(function(){this.tech_.constructor.prototype.hasOwnProperty("setSource")?this.techCall_("setSource",e):this.techCall_("src",e.src),this.changingSrc_=!1},!0),!1):(this.changingSrc_=!0,this.loadTech_(t.tech,t.source),this.tech_.ready(()=>{this.changingSrc_=!1}),!1):!0}addSourceElement(e,t){return this.tech_?this.tech_.addSourceElement(e,t):!1}removeSourceElement(e){return this.tech_?this.tech_.removeSourceElement(e):!1}load(){if(this.tech_&&this.tech_.vhs){this.src(this.currentSource());return}this.techCall_("load")}reset(){if(this.paused())this.doReset_();else{const e=this.play();xi(e.then(()=>this.doReset_()))}}doReset_(){this.tech_&&this.tech_.clearTracks("text"),this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.resetCache_(),this.poster(""),this.loadTech_(this.options_.techOrder[0],null),this.techCall_("reset"),this.resetControlBarUI_(),this.error(null),this.titleBar&&this.titleBar.update({title:void 0,description:void 0}),Fi(this)&&this.trigger("playerreset")}resetControlBarUI_(){this.resetProgressBar_(),this.resetPlaybackRate_(),this.resetVolumeBar_()}resetProgressBar_(){this.currentTime(0);const{currentTimeDisplay:e,durationDisplay:t,progressControl:i,remainingTimeDisplay:s}=this.controlBar||{},{seekBar:r}=i||{};e&&e.updateContent(),t&&t.updateContent(),s&&s.updateContent(),r&&(r.update(),r.loadProgressBar&&r.loadProgressBar.update())}resetPlaybackRate_(){this.playbackRate(this.defaultPlaybackRate()),this.handleTechRateChange_()}resetVolumeBar_(){this.volume(1),this.trigger("volumechange")}currentSources(){const e=this.currentSource(),t=[];return Object.keys(e).length!==0&&t.push(e),this.cache_.sources||t}currentSource(){return this.cache_.source||{}}currentSrc(){return this.currentSource()&&this.currentSource().src||""}currentType(){return this.currentSource()&&this.currentSource().type||""}preload(e){if(e!==void 0){this.techCall_("setPreload",e),this.options_.preload=e;return}return this.techGet_("preload")}autoplay(e){if(e===void 0)return this.options_.autoplay||!1;let t;typeof e=="string"&&/(any|play|muted)/.test(e)||e===!0&&this.options_.normalizeAutoplay?(this.options_.autoplay=e,this.manualAutoplay_(typeof e=="string"?e:"play"),t=!1):e?this.options_.autoplay=!0:this.options_.autoplay=!1,t=typeof t=="undefined"?this.options_.autoplay:t,this.tech_&&this.techCall_("setAutoplay",t)}playsinline(e){return e!==void 0&&(this.techCall_("setPlaysinline",e),this.options_.playsinline=e),this.techGet_("playsinline")}loop(e){if(e!==void 0){this.techCall_("setLoop",e),this.options_.loop=e;return}return this.techGet_("loop")}poster(e){if(e===void 0)return this.poster_;e||(e=""),e!==this.poster_&&(this.poster_=e,this.techCall_("setPoster",e),this.isPosterFromTech_=!1,this.trigger("posterchange"))}handleTechPosterChange_(){if((!this.poster_||this.options_.techCanOverridePoster)&&this.tech_&&this.tech_.poster){const e=this.tech_.poster()||"";e!==this.poster_&&(this.poster_=e,this.isPosterFromTech_=!0,this.trigger("posterchange"))}}controls(e){if(e===void 0)return!!this.controls_;e=!!e,this.controls_!==e&&(this.controls_=e,this.usingNativeControls()&&this.techCall_("setControls",e),this.controls_?(this.removeClass("vjs-controls-disabled"),this.addClass("vjs-controls-enabled"),this.trigger("controlsenabled"),this.usingNativeControls()||this.addTechControlsListeners_()):(this.removeClass("vjs-controls-enabled"),this.addClass("vjs-controls-disabled"),this.trigger("controlsdisabled"),this.usingNativeControls()||this.removeTechControlsListeners_()))}usingNativeControls(e){if(e===void 0)return!!this.usingNativeControls_;e=!!e,this.usingNativeControls_!==e&&(this.usingNativeControls_=e,this.usingNativeControls_?(this.addClass("vjs-using-native-controls"),this.trigger("usingnativecontrols")):(this.removeClass("vjs-using-native-controls"),this.trigger("usingcustomcontrols")))}error(e){if(e===void 0)return this.error_||null;if(Yi("beforeerror").forEach(t=>{const i=t(this,e);if(!(Ei(i)&&!Array.isArray(i)||typeof i=="string"||typeof i=="number"||i===null)){this.log.error("please return a value that MediaError expects in beforeerror hooks");return}e=i}),this.options_.suppressNotSupportedError&&e&&e.code===4){const t=function(){this.error(e)};this.options_.suppressNotSupportedError=!1,this.any(["click","touchstart"],t),this.one("loadstart",function(){this.off(["click","touchstart"],t)});return}if(e===null){this.error_=null,this.removeClass("vjs-error"),this.errorDisplay&&this.errorDisplay.close();return}this.error_=new ft(e),this.addClass("vjs-error"),He.error(`(CODE:${this.error_.code} ${ft.errorTypes[this.error_.code]})`,this.error_.message,this.error_),this.trigger("error"),Yi("error").forEach(t=>t(this,this.error_))}reportUserActivity(e){this.userActivity_=!0}userActive(e){if(e===void 0)return this.userActive_;if(e=!!e,e!==this.userActive_){if(this.userActive_=e,this.userActive_){this.userActivity_=!0,this.removeClass("vjs-user-inactive"),this.addClass("vjs-user-active"),this.trigger("useractive");return}this.tech_&&this.tech_.one("mousemove",function(t){t.stopPropagation(),t.preventDefault()}),this.userActivity_=!1,this.removeClass("vjs-user-active"),this.addClass("vjs-user-inactive"),this.trigger("userinactive")}}listenForUserActivity_(){let e,t,i;const s=nt(this,this.reportUserActivity),r=function(y){(y.screenX!==t||y.screenY!==i)&&(t=y.screenX,i=y.screenY,s())},a=function(){s(),this.clearInterval(e),e=this.setInterval(s,250)},l=function(y){s(),this.clearInterval(e)};this.on("mousedown",a),this.on("mousemove",r),this.on("mouseup",l),this.on("mouseleave",l);const h=this.getChild("controlBar");h&&!kt&&!pi&&(h.on("mouseenter",function(y){this.player().options_.inactivityTimeout!==0&&(this.player().cache_.inactivityTimeout=this.player().options_.inactivityTimeout),this.player().options_.inactivityTimeout=0}),h.on("mouseleave",function(y){this.player().options_.inactivityTimeout=this.player().cache_.inactivityTimeout})),this.on("keydown",s),this.on("keyup",s);let p;const g=function(){if(!this.userActivity_)return;this.userActivity_=!1,this.userActive(!0),this.clearTimeout(p);const y=this.options_.inactivityTimeout;y<=0||(p=this.setTimeout(function(){this.userActivity_||this.userActive(!1)},y))};this.setInterval(g,250)}playbackRate(e){if(e!==void 0){this.techCall_("setPlaybackRate",e);return}return this.tech_&&this.tech_.featuresPlaybackRate?this.cache_.lastPlaybackRate||this.techGet_("playbackRate"):1}defaultPlaybackRate(e){return e!==void 0?this.techCall_("setDefaultPlaybackRate",e):this.tech_&&this.tech_.featuresPlaybackRate?this.techGet_("defaultPlaybackRate"):1}isAudio(e){if(e!==void 0){this.isAudio_=!!e;return}return!!this.isAudio_}updatePlayerHeightOnAudioOnlyMode_(){const e=this.getChild("ControlBar");!e||this.audioOnlyCache_.controlBarHeight===e.currentHeight()||(this.audioOnlyCache_.controlBarHeight=e.currentHeight(),this.height(this.audioOnlyCache_.controlBarHeight))}enableAudioOnlyUI_(){this.addClass("vjs-audio-only-mode");const e=this.children(),t=this.getChild("ControlBar"),i=t&&t.currentHeight();e.forEach(s=>{s!==t&&s.el_&&!s.hasClass("vjs-hidden")&&(s.hide(),this.audioOnlyCache_.hiddenChildren.push(s))}),this.audioOnlyCache_.playerHeight=this.currentHeight(),this.audioOnlyCache_.controlBarHeight=i,this.on("playerresize",this.boundUpdatePlayerHeightOnAudioOnlyMode_),this.height(i),this.trigger("audioonlymodechange")}disableAudioOnlyUI_(){this.removeClass("vjs-audio-only-mode"),this.off("playerresize",this.boundUpdatePlayerHeightOnAudioOnlyMode_),this.audioOnlyCache_.hiddenChildren.forEach(e=>e.show()),this.height(this.audioOnlyCache_.playerHeight),this.trigger("audioonlymodechange")}audioOnlyMode(e){if(typeof e!="boolean"||e===this.audioOnlyMode_)return this.audioOnlyMode_;if(this.audioOnlyMode_=e,e){const t=[];return this.isInPictureInPicture()&&t.push(this.exitPictureInPicture()),this.isFullscreen()&&t.push(this.exitFullscreen()),this.audioPosterMode()&&t.push(this.audioPosterMode(!1)),Promise.all(t).then(()=>this.enableAudioOnlyUI_())}return Promise.resolve().then(()=>this.disableAudioOnlyUI_())}enablePosterModeUI_(){(this.tech_&&this.tech_).hide(),this.addClass("vjs-audio-poster-mode"),this.trigger("audiopostermodechange")}disablePosterModeUI_(){(this.tech_&&this.tech_).show(),this.removeClass("vjs-audio-poster-mode"),this.trigger("audiopostermodechange")}audioPosterMode(e){return typeof e!="boolean"||e===this.audioPosterMode_?this.audioPosterMode_:(this.audioPosterMode_=e,e?this.audioOnlyMode()?this.audioOnlyMode(!1).then(()=>{this.enablePosterModeUI_()}):Promise.resolve().then(()=>{this.enablePosterModeUI_()}):Promise.resolve().then(()=>{this.disablePosterModeUI_()}))}addTextTrack(e,t,i){if(this.tech_)return this.tech_.addTextTrack(e,t,i)}addRemoteTextTrack(e,t){if(this.tech_)return this.tech_.addRemoteTextTrack(e,t)}removeRemoteTextTrack(e={}){let{track:t}=e;if(t||(t=e),this.tech_)return this.tech_.removeRemoteTextTrack(t)}getVideoPlaybackQuality(){return this.techGet_("getVideoPlaybackQuality")}videoWidth(){return this.tech_&&this.tech_.videoWidth&&this.tech_.videoWidth()||0}videoHeight(){return this.tech_&&this.tech_.videoHeight&&this.tech_.videoHeight()||0}language(e){if(e===void 0)return this.language_;this.language_!==String(e).toLowerCase()&&(this.language_=String(e).toLowerCase(),Fi(this)&&this.trigger("languagechange"))}languages(){return Ze(at.prototype.options_.languages,this.languages_)}toJSON(){const e=Ze(this.options_),t=e.tracks;e.tracks=[];for(let i=0;i<t.length;i++){let s=t[i];s=Ze(s),s.player=void 0,e.tracks[i]=s}return e}createModal(e,t){t=t||{},t.content=e||"";const i=new Wn(this,t);return this.addChild(i),i.on("dispose",()=>{this.removeChild(i)}),i.open(),i}updateCurrentBreakpoint_(){if(!this.responsive())return;const e=this.currentBreakpoint(),t=this.currentWidth();for(let i=0;i<Uo.length;i++){const s=Uo[i],r=this.breakpoints_[s];if(t<=r){if(e===s)return;e&&this.removeClass($r[e]),this.addClass($r[s]),this.breakpoint_=s;break}}}removeCurrentBreakpoint_(){const e=this.currentBreakpointClass();this.breakpoint_="",e&&this.removeClass(e)}breakpoints(e){return e===void 0?Object.assign(this.breakpoints_):(this.breakpoint_="",this.breakpoints_=Object.assign({},om,e),this.updateCurrentBreakpoint_(),Object.assign(this.breakpoints_))}responsive(e){if(e===void 0)return this.responsive_;e=!!e;const t=this.responsive_;if(e!==t)return this.responsive_=e,e?(this.on("playerresize",this.boundUpdateCurrentBreakpoint_),this.updateCurrentBreakpoint_()):(this.off("playerresize",this.boundUpdateCurrentBreakpoint_),this.removeCurrentBreakpoint_()),e}currentBreakpoint(){return this.breakpoint_}currentBreakpointClass(){return $r[this.breakpoint_]||""}loadMedia(e,t){if(!e||typeof e!="object")return;const i=this.crossOrigin();this.reset(),this.cache_.media=Ze(e);const{artist:s,artwork:r,description:a,poster:l,src:h,textTracks:p,title:g}=this.cache_.media;!r&&l&&(this.cache_.media.artwork=[{src:l,type:Vr(l)}]),i&&this.crossOrigin(i),h&&this.src(h),l&&this.poster(l),Array.isArray(p)&&p.forEach(y=>this.addRemoteTextTrack(y,!1)),this.titleBar&&this.titleBar.update({title:g,description:a||s||""}),this.ready(t)}getMedia(){if(!this.cache_.media){const e=this.poster(),t=this.currentSources(),i=Array.prototype.map.call(this.remoteTextTracks(),r=>({kind:r.kind,label:r.label,language:r.language,src:r.src})),s={src:t,textTracks:i};return e&&(s.poster=e,s.artwork=[{src:s.poster,type:Vr(s.poster)}]),s}return Ze(this.cache_.media)}static getTagSettings(e){const t={sources:[],tracks:[]},i=Qi(e),s=i["data-setup"];if(Bs(e,"vjs-fill")&&(i.fill=!0),Bs(e,"vjs-fluid")&&(i.fluid=!0),s!==null)try{Object.assign(i,JSON.parse(s||"{}"))}catch(r){He.error("data-setup",r)}if(Object.assign(t,i),e.hasChildNodes()){const r=e.childNodes;for(let a=0,l=r.length;a<l;a++){const h=r[a],p=h.nodeName.toLowerCase();p==="source"?t.sources.push(Qi(h)):p==="track"&&t.tracks.push(Qi(h))}}return t}debug(e){if(e===void 0)return this.debugEnabled_;e?(this.trigger("debugon"),this.previousLogLevel_=this.log.level,this.log.level("debug"),this.debugEnabled_=!0):(this.trigger("debugoff"),this.log.level(this.previousLogLevel_),this.previousLogLevel_=void 0,this.debugEnabled_=!1)}playbackRates(e){if(e===void 0)return this.cache_.playbackRates;Array.isArray(e)&&e.every(t=>typeof t=="number")&&(this.cache_.playbackRates=e,this.trigger("playbackrateschange"))}}Nt.names.forEach(function(n){const e=Nt[n];at.prototype[e.getterName]=function(){return this.tech_?this.tech_[e.getterName]():(this[e.privateName]=this[e.privateName]||new e.ListClass,this[e.privateName])}}),at.prototype.crossorigin=at.prototype.crossOrigin,at.players={};const Us=A().navigator;at.prototype.options_={techOrder:Ve.defaultTechOrder_,html5:{},enableSourceset:!0,inactivityTimeout:2e3,playbackRates:[],liveui:!1,children:["mediaLoader","posterImage","titleBar","textTrackDisplay","loadingSpinner","bigPlayButton","liveTracker","controlBar","errorDisplay","textTrackSettings","resizeManager"],language:Us&&(Us.languages&&Us.languages[0]||Us.userLanguage||Us.language)||"en",languages:{},notSupportedMessage:"No compatible source was found for this media.",normalizeAutoplay:!1,fullscreen:{options:{navigationUI:"hide"}},breakpoints:{},responsive:!1,audioOnlyMode:!1,audioPosterMode:!1,spatialNavigation:{enabled:!1,horizontalSeek:!1},enableSmoothSeeking:!1,disableSeekWhileScrubbingOnMobile:!1},Bc.forEach(function(n){at.prototype[`handleTech${vt(n)}_`]=function(){return this.trigger(n)}}),q.registerComponent("Player",at);const Gr="plugin",Qn="activePlugins_",Jn={},Yr=n=>Jn.hasOwnProperty(n),Xr=n=>Yr(n)?Jn[n]:void 0,Dc=(n,e)=>{n[Qn]=n[Qn]||{},n[Qn][e]=!0},Kr=(n,e,t)=>{const i=(t?"before":"")+"pluginsetup";n.trigger(i,e),n.trigger(i+":"+e.name,e)},lm=function(n,e){const t=function(){Kr(this,{name:n,plugin:e,instance:null},!0);const i=e.apply(this,arguments);return Dc(this,n),Kr(this,{name:n,plugin:e,instance:i}),i};return Object.keys(e).forEach(function(i){t[i]=e[i]}),t},kc=(n,e)=>(e.prototype.name=n,function(...t){Kr(this,{name:n,plugin:e,instance:null},!0);const i=new e(this,...t);return this[n]=()=>i,Kr(this,i.getEventHash()),i});class zt{constructor(e){if(this.constructor===zt)throw new Error("Plugin must be sub-classed; not directly instantiated.");this.player=e,this.log||(this.log=this.player.log.createLogger(this.name)),ro(this),delete this.trigger,_u(this,this.constructor.defaultState),Dc(e,this.name),this.dispose=this.dispose.bind(this),e.on("dispose",this.dispose)}version(){return this.constructor.VERSION}getEventHash(e={}){return e.name=this.name,e.plugin=this.constructor,e.instance=this,e}trigger(e,t={}){return qn(this.eventBusEl_,e,this.getEventHash(t))}handleStateChanged(e){}dispose(){const{name:e,player:t}=this;this.trigger("dispose"),this.off(),t.off("dispose",this.dispose),t[Qn][e]=!1,this.player=this.state=null,t[e]=kc(e,Jn[e])}static isBasic(e){const t=typeof e=="string"?Xr(e):e;return typeof t=="function"&&!zt.prototype.isPrototypeOf(t.prototype)}static registerPlugin(e,t){if(typeof e!="string")throw new Error(`Illegal plugin name, "${e}", must be a string, was ${typeof e}.`);if(Yr(e))He.warn(`A plugin named "${e}" already exists. You may want to avoid re-registering plugins!`);else if(at.prototype.hasOwnProperty(e))throw new Error(`Illegal plugin name, "${e}", cannot share a name with an existing player method!`);if(typeof t!="function")throw new Error(`Illegal plugin for "${e}", must be a function, was ${typeof t}.`);return Jn[e]=t,e!==Gr&&(zt.isBasic(t)?at.prototype[e]=lm(e,t):at.prototype[e]=kc(e,t)),t}static deregisterPlugin(e){if(e===Gr)throw new Error("Cannot de-register base plugin.");Yr(e)&&(delete Jn[e],delete at.prototype[e])}static getPlugins(e=Object.keys(Jn)){let t;return e.forEach(i=>{const s=Xr(i);s&&(t=t||{},t[i]=s)}),t}static getPluginVersion(e){const t=Xr(e);return t&&t.VERSION||""}}zt.getPlugin=Xr,zt.BASE_PLUGIN_NAME=Gr,zt.registerPlugin(Gr,zt),at.prototype.usingPlugin=function(n){return!!this[Qn]&&this[Qn][n]===!0},at.prototype.hasPlugin=function(n){return!!Yr(n)};function um(n,e){let t=!1;return function(...i){return t||He.warn(n),t=!0,e.apply(this,i)}}function gi(n,e,t,i){return um(`${e} is deprecated and will be removed in ${n}.0; please use ${t} instead.`,i)}var cm={NetworkBadStatus:"networkbadstatus",NetworkRequestFailed:"networkrequestfailed",NetworkRequestAborted:"networkrequestaborted",NetworkRequestTimeout:"networkrequesttimeout",NetworkBodyParserFailed:"networkbodyparserfailed",StreamingHlsPlaylistParserError:"streaminghlsplaylistparsererror",StreamingDashManifestParserError:"streamingdashmanifestparsererror",StreamingContentSteeringParserError:"streamingcontentsteeringparsererror",StreamingVttParserError:"streamingvttparsererror",StreamingFailedToSelectNextSegment:"streamingfailedtoselectnextsegment",StreamingFailedToDecryptSegment:"streamingfailedtodecryptsegment",StreamingFailedToTransmuxSegment:"streamingfailedtotransmuxsegment",StreamingFailedToAppendSegment:"streamingfailedtoappendsegment",StreamingCodecsChangeError:"streamingcodecschangeerror"};const Ic=n=>n.indexOf("#")===0?n.slice(1):n;function L(n,e,t){let i=L.getPlayer(n);if(i)return e&&He.warn(`Player "${n}" is already initialised. Options will not be applied.`),t&&i.ready(t),i;const s=typeof n=="string"?Ji("#"+Ic(n)):n;if(!Fn(s))throw new TypeError("The element or ID supplied is not valid. (videojs)");const a=("getRootNode"in s?s.getRootNode()instanceof A().ShadowRoot:!1)?s.getRootNode():s.ownerDocument.body;(!s.ownerDocument.defaultView||!a.contains(s))&&He.warn("The element supplied is not included in the DOM"),e=e||{},e.restoreEl===!0&&(e.restoreEl=(s.parentNode&&s.parentNode.hasAttribute&&s.parentNode.hasAttribute("data-vjs-player")?s.parentNode:s).cloneNode(!0)),Yi("beforesetup").forEach(h=>{const p=h(s,Ze(e));if(!Ei(p)||Array.isArray(p)){He.error("please return an object in beforesetup hooks");return}e=Ze(e,p)});const l=q.getComponent("Player");return i=new l(s,e,t),Yi("setup").forEach(h=>h(i)),i}if(L.hooks_=Ui,L.hooks=Yi,L.hook=Wf,L.hookOnce=$f,L.removeHook=zl,A().VIDEOJS_NO_DYNAMIC_STYLE!==!0&&Un()){let n=Ji(".vjs-styles-defaults");if(!n){n=pu("vjs-styles-defaults");const e=Ji("head");e&&e.insertBefore(n,e.firstChild),mu(n,`
      .video-js {
        width: 300px;
        height: 150px;
      }

      .vjs-fluid:not(.vjs-audio-only-mode) {
        padding-top: 56.25%
      }
    `)}}Za(1,L),L.VERSION=$a,L.options=at.prototype.options_,L.getPlayers=()=>at.players,L.getPlayer=n=>{const e=at.players;let t;if(typeof n=="string"){const i=Ic(n),s=e[i];if(s)return s;t=Ji("#"+i)}else t=n;if(Fn(t)){const{player:i,playerId:s}=t;if(i||e[s])return i||e[s]}},L.getAllPlayers=()=>Object.keys(at.players).map(n=>at.players[n]).filter(Boolean),L.players=at.players,L.getComponent=q.getComponent,L.registerComponent=(n,e)=>(Ve.isTech(e)&&He.warn(`The ${n} tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)`),q.registerComponent.call(q,n,e)),L.getTech=Ve.getTech,L.registerTech=Ve.registerTech,L.use=Ap,Object.defineProperty(L,"middleware",{value:{},writeable:!1,enumerable:!0}),Object.defineProperty(L.middleware,"TERMINATOR",{value:Fr,writeable:!1,enumerable:!0}),L.browser=Jl,L.obj=Xf,L.mergeOptions=gi(9,"videojs.mergeOptions","videojs.obj.merge",Ze),L.defineLazyProperty=gi(9,"videojs.defineLazyProperty","videojs.obj.defineLazyProperty",Ar),L.bind=gi(9,"videojs.bind","native Function.prototype.bind",nt),L.registerPlugin=zt.registerPlugin,L.deregisterPlugin=zt.deregisterPlugin,L.plugin=(n,e)=>(He.warn("videojs.plugin() is deprecated; use videojs.registerPlugin() instead"),zt.registerPlugin(n,e)),L.getPlugins=zt.getPlugins,L.getPlugin=zt.getPlugin,L.getPluginVersion=zt.getPluginVersion,L.addLanguage=function(n,e){return n=(""+n).toLowerCase(),L.options.languages=Ze(L.options.languages,{[n]:e}),L.options.languages[n]},L.log=He,L.createLogger=ql,L.time=up,L.createTimeRange=gi(9,"videojs.createTimeRange","videojs.time.createTimeRanges",mi),L.createTimeRanges=gi(9,"videojs.createTimeRanges","videojs.time.createTimeRanges",mi),L.formatTime=gi(9,"videojs.formatTime","videojs.time.formatTime",mn),L.setFormatTime=gi(9,"videojs.setFormatTime","videojs.time.setFormatTime",Cu),L.resetFormatTime=gi(9,"videojs.resetFormatTime","videojs.time.resetFormatTime",xu),L.parseUrl=gi(9,"videojs.parseUrl","videojs.url.parseUrl",po),L.isCrossOrigin=gi(9,"videojs.isCrossOrigin","videojs.url.isCrossOrigin",Nr),L.EventTarget=Kt,L.any=io,L.on=Xt,L.one=Or,L.off=It,L.trigger=qn,L.xhr=Z(),L.TextTrack=Ls,L.AudioTrack=Pu,L.VideoTrack=Ou,["isEl","isTextNode","createEl","hasClass","addClass","removeClass","toggleClass","setAttributes","getAttributes","emptyEl","appendContent","insertContent"].forEach(n=>{L[n]=function(){return He.warn(`videojs.${n}() is deprecated; use videojs.dom.${n}() instead`),hu[n].apply(null,arguments)}}),L.computedStyle=gi(9,"videojs.computedStyle","videojs.dom.computedStyle",Hn),L.dom=hu,L.fn=np,L.num=Up,L.str=op,L.url=gp,L.Error=cm;/*! @name videojs-contrib-quality-levels @version 4.1.0 @license Apache-2.0 */class dm{constructor(e){let t=this;return t.id=e.id,t.label=t.id,t.width=e.width,t.height=e.height,t.bitrate=e.bandwidth,t.frameRate=e.frameRate,t.enabled_=e.enabled,Object.defineProperty(t,"enabled",{get(){return t.enabled_()},set(i){t.enabled_(i)}}),t}}class Qr extends L.EventTarget{constructor(){super();let e=this;return e.levels_=[],e.selectedIndex_=-1,Object.defineProperty(e,"selectedIndex",{get(){return e.selectedIndex_}}),Object.defineProperty(e,"length",{get(){return e.levels_.length}}),e[Symbol.iterator]=()=>e.levels_.values(),e}addQualityLevel(e){let t=this.getQualityLevelById(e.id);if(t)return t;const i=this.levels_.length;return t=new dm(e),""+i in this||Object.defineProperty(this,i,{get(){return this.levels_[i]}}),this.levels_.push(t),this.trigger({qualityLevel:t,type:"addqualitylevel"}),t}removeQualityLevel(e){let t=null;for(let i=0,s=this.length;i<s;i++)if(this[i]===e){t=this.levels_.splice(i,1)[0],this.selectedIndex_===i?this.selectedIndex_=-1:this.selectedIndex_>i&&this.selectedIndex_--;break}return t&&this.trigger({qualityLevel:e,type:"removequalitylevel"}),t}getQualityLevelById(e){for(let t=0,i=this.length;t<i;t++){const s=this[t];if(s.id===e)return s}return null}dispose(){this.selectedIndex_=-1,this.levels_.length=0}}Qr.prototype.allowedEvents_={change:"change",addqualitylevel:"addqualitylevel",removequalitylevel:"removequalitylevel"};for(const n in Qr.prototype.allowedEvents_)Qr.prototype["on"+n]=null;var Pc="4.1.0";const hm=function(n,e){const t=n.qualityLevels,i=new Qr,s=function(){i.dispose(),n.qualityLevels=t,n.off("dispose",s)};return n.on("dispose",s),n.qualityLevels=()=>i,n.qualityLevels.VERSION=Pc,i},Oc=function(n){return hm(this,L.obj.merge({},n))};L.registerPlugin("qualityLevels",Oc),Oc.VERSION=Pc;/*! @name @videojs/http-streaming @version 3.16.2 @license Apache-2.0 */const Ht=Pe,Jr=(n,e)=>e&&e.responseURL&&n!==e.responseURL?e.responseURL:n,oi=n=>L.log.debug?L.log.debug.bind(L,"VHS:",`${n} >`):function(){};function Ye(...n){const e=L.obj||L;return(e.merge||e.mergeOptions).apply(e,n)}function St(...n){const e=L.time||L;return(e.createTimeRanges||e.createTimeRanges).apply(e,n)}function fm(n){if(n.length===0)return"Buffered Ranges are empty";let e=`Buffered Ranges: 
`;for(let t=0;t<n.length;t++){const i=n.start(t),s=n.end(t);e+=`${i} --> ${s}. Duration (${s-i})
`}return e}const ji=1/30,wi=ji*3,Lc=function(n,e){const t=[];let i;if(n&&n.length)for(i=0;i<n.length;i++)e(n.start(i),n.end(i))&&t.push([n.start(i),n.end(i)]);return St(t)},Zn=function(n,e){return Lc(n,function(t,i){return t-wi<=e&&i+wi>=e})},Zr=function(n,e){return Lc(n,function(t){return t-ji>=e})},pm=function(n){if(n.length<2)return St();const e=[];for(let t=1;t<n.length;t++){const i=n.end(t-1),s=n.start(t);e.push([i,s])}return St(e)},mm=function(n,e){let t=null,i=null,s=0;const r=[],a=[];if(!n||!n.length||!e||!e.length)return St();let l=n.length;for(;l--;)r.push({time:n.start(l),type:"start"}),r.push({time:n.end(l),type:"end"});for(l=e.length;l--;)r.push({time:e.start(l),type:"start"}),r.push({time:e.end(l),type:"end"});for(r.sort(function(h,p){return h.time-p.time}),l=0;l<r.length;l++)r[l].type==="start"?(s++,s===2&&(t=r[l].time)):r[l].type==="end"&&(s--,s===1&&(i=r[l].time)),t!==null&&i!==null&&(a.push([t,i]),t=null,i=null);return St(a)},Rc=n=>{const e=[];if(!n||!n.length)return"";for(let t=0;t<n.length;t++)e.push(n.start(t)+" => "+n.end(t));return e.join(", ")},gm=function(n,e,t=1){return((n.length?n.end(n.length-1):0)-e)/t},yn=n=>{const e=[];for(let t=0;t<n.length;t++)e.push({start:n.start(t),end:n.end(t)});return e},vm=function(n,e){if(n===e)return!1;if(!n&&e||!e&&n||n.length!==e.length)return!0;for(let t=0;t<n.length;t++)if(n.start(t)!==e.start(t)||n.end(t)!==e.end(t))return!0;return!1},Fo=function(n){if(!(!n||!n.length||!n.end))return n.end(n.length-1)},Vo=function(n,e){let t=0;if(!n||!n.length)return t;for(let i=0;i<n.length;i++){const s=n.start(i),r=n.end(i);if(!(e>r)){if(e>s&&e<=r){t+=r-e;continue}t+=r-s}}return t},zo=(n,e)=>{if(!e.preload)return e.duration;let t=0;return(e.parts||[]).forEach(function(i){t+=i.duration}),(e.preloadHints||[]).forEach(function(i){i.type==="PART"&&(t+=n.partTargetDuration)}),t},Ho=n=>(n.segments||[]).reduce((e,t,i)=>(t.parts?t.parts.forEach(function(s,r){e.push({duration:s.duration,segmentIndex:i,partIndex:r,part:s,segment:t})}):e.push({duration:t.duration,segmentIndex:i,partIndex:null,segment:t,part:null}),e),[]),Mc=n=>{const e=n.segments&&n.segments.length&&n.segments[n.segments.length-1];return e&&e.parts||[]},Nc=({preloadSegment:n})=>{if(!n)return;const{parts:e,preloadHints:t}=n;let i=(t||[]).reduce((s,r)=>s+(r.type==="PART"?1:0),0);return i+=e&&e.length?e.length:0,i},Uc=(n,e)=>{if(e.endList)return 0;if(n&&n.suggestedPresentationDelay)return n.suggestedPresentationDelay;const t=Mc(e).length>0;return t&&e.serverControl&&e.serverControl.partHoldBack?e.serverControl.partHoldBack:t&&e.partTargetDuration?e.partTargetDuration*3:e.serverControl&&e.serverControl.holdBack?e.serverControl.holdBack:e.targetDuration?e.targetDuration*3:0},Am=function(n,e){let t=0,i=e-n.mediaSequence,s=n.segments[i];if(s){if(typeof s.start!="undefined")return{result:s.start,precise:!0};if(typeof s.end!="undefined")return{result:s.end-s.duration,precise:!0}}for(;i--;){if(s=n.segments[i],typeof s.end!="undefined")return{result:t+s.end,precise:!0};if(t+=zo(n,s),typeof s.start!="undefined")return{result:t+s.start,precise:!0}}return{result:t,precise:!1}},ym=function(n,e){let t=0,i,s=e-n.mediaSequence;for(;s<n.segments.length;s++){if(i=n.segments[s],typeof i.start!="undefined")return{result:i.start-t,precise:!0};if(t+=zo(n,i),typeof i.end!="undefined")return{result:i.end-t,precise:!0}}return{result:-1,precise:!1}},Fc=function(n,e,t){if(typeof e=="undefined"&&(e=n.mediaSequence+n.segments.length),e<n.mediaSequence)return 0;const i=Am(n,e);if(i.precise)return i.result;const s=ym(n,e);return s.precise?s.result:i.result+t},Vc=function(n,e,t){if(!n)return 0;if(typeof t!="number"&&(t=0),typeof e=="undefined"){if(n.totalDuration)return n.totalDuration;if(!n.endList)return A()[1/0]}return Fc(n,e,t)},Fs=function({defaultDuration:n,durationList:e,startIndex:t,endIndex:i}){let s=0;if(t>i&&([t,i]=[i,t]),t<0){for(let r=t;r<Math.min(0,i);r++)s+=n;t=0}for(let r=t;r<i;r++)s+=e[r].duration;return s},zc=function(n,e,t,i){if(!n||!n.segments)return null;if(n.endList)return Vc(n);if(e===null)return null;e=e||0;let s=Fc(n,n.mediaSequence+n.segments.length,e);return t&&(i=typeof i=="number"?i:Uc(null,n),s-=i),Math.max(0,s)},_m=function(n,e,t){const s=e||0;let r=zc(n,e,!0,t);return r===null?St():(r<s&&(r=s),St(s,r))},bm=function({playlist:n,currentTime:e,startingSegmentIndex:t,startingPartIndex:i,startTime:s,exactManifestTimings:r}){let a=e-s;const l=Ho(n);let h=0;for(let p=0;p<l.length;p++){const g=l[p];if(t===g.segmentIndex&&!(typeof i=="number"&&typeof g.partIndex=="number"&&i!==g.partIndex)){h=p;break}}if(a<0){if(h>0)for(let p=h-1;p>=0;p--){const g=l[p];if(a+=g.duration,r){if(a<0)continue}else if(a+ji<=0)continue;return{partIndex:g.partIndex,segmentIndex:g.segmentIndex,startTime:s-Fs({defaultDuration:n.targetDuration,durationList:l,startIndex:h,endIndex:p})}}return{partIndex:l[0]&&l[0].partIndex||null,segmentIndex:l[0]&&l[0].segmentIndex||0,startTime:e}}if(h<0){for(let p=h;p<0;p++)if(a-=n.targetDuration,a<0)return{partIndex:l[0]&&l[0].partIndex||null,segmentIndex:l[0]&&l[0].segmentIndex||0,startTime:e};h=0}for(let p=h;p<l.length;p++){const g=l[p];a-=g.duration;const y=g.duration>ji,w=a===0,D=y&&a+ji>=0;if(!((w||D)&&p!==l.length-1)){if(r){if(a>0)continue}else if(a-ji>=0)continue;return{partIndex:g.partIndex,segmentIndex:g.segmentIndex,startTime:s+Fs({defaultDuration:n.targetDuration,durationList:l,startIndex:h,endIndex:p})}}}return{segmentIndex:l[l.length-1].segmentIndex,partIndex:l[l.length-1].partIndex,startTime:e}},Hc=function(n){return n.excludeUntil&&n.excludeUntil>Date.now()},qo=function(n){return n.excludeUntil&&n.excludeUntil===1/0},ea=function(n){const e=Hc(n);return!n.disabled&&!e},Em=function(n){return n.disabled},Tm=function(n){for(let e=0;e<n.segments.length;e++)if(n.segments[e].key)return!0;return!1},qc=function(n,e){return e.attributes&&e.attributes[n]},Cm=function(n,e,t,i=0){return qc("BANDWIDTH",t)?(n*t.attributes.BANDWIDTH-i*8)/e:NaN},Wo=(n,e)=>{if(n.playlists.length===1)return!0;const t=e.attributes.BANDWIDTH||Number.MAX_VALUE;return n.playlists.filter(i=>ea(i)?(i.attributes.BANDWIDTH||0)<t:!1).length===0},$o=(n,e)=>!n&&!e||!n&&e||n&&!e?!1:!!(n===e||n.id&&e.id&&n.id===e.id||n.resolvedUri&&e.resolvedUri&&n.resolvedUri===e.resolvedUri||n.uri&&e.uri&&n.uri===e.uri),Wc=function(n,e){const t=n&&n.mediaGroups&&n.mediaGroups.AUDIO||{};let i=!1;for(const s in t){for(const r in t[s])if(i=e(t[s][r]),i)break;if(i)break}return!!i},Vs=n=>{if(!n||!n.playlists||!n.playlists.length)return Wc(n,t=>t.playlists&&t.playlists.length||t.uri);for(let e=0;e<n.playlists.length;e++){const t=n.playlists[e],i=t.attributes&&t.attributes.CODECS;if(!(i&&i.split(",").every(r=>se(r))||Wc(n,r=>$o(t,r))))return!1}return!0};var qt={liveEdgeDelay:Uc,duration:Vc,seekable:_m,getMediaInfoForTime:bm,isEnabled:ea,isDisabled:Em,isExcluded:Hc,isIncompatible:qo,playlistEnd:zc,isAes:Tm,hasAttribute:qc,estimateSegmentRequestTime:Cm,isLowestEnabledRendition:Wo,isAudioOnly:Vs,playlistMatch:$o,segmentDurationWithParts:zo};const{log:$c}=L,es=(n,e)=>`${n}-${e}`,Gc=(n,e,t)=>`placeholder-uri-${n}-${e}-${t}`,xm=({onwarn:n,oninfo:e,manifestString:t,customTagParsers:i=[],customTagMappers:s=[],llhls:r})=>{const a=new S;n&&a.on("warn",n),e&&a.on("info",e),i.forEach(p=>a.addParser(p)),s.forEach(p=>a.addTagMapper(p)),a.push(t),a.end();const l=a.manifest;if(r||(["preloadSegment","skip","serverControl","renditionReports","partInf","partTargetDuration"].forEach(function(p){l.hasOwnProperty(p)&&delete l[p]}),l.segments&&l.segments.forEach(function(p){["parts","preloadHints"].forEach(function(g){p.hasOwnProperty(g)&&delete p[g]})})),!l.targetDuration){let p=10;l.segments&&l.segments.length&&(p=l.segments.reduce((g,y)=>Math.max(g,y.duration),0)),n&&n({message:`manifest has no targetDuration defaulting to ${p}`}),l.targetDuration=p}const h=Mc(l);if(h.length&&!l.partTargetDuration){const p=h.reduce((g,y)=>Math.max(g,y.duration),0);n&&(n({message:`manifest has no partTargetDuration defaulting to ${p}`}),$c.error("LL-HLS manifest has parts but lacks required #EXT-X-PART-INF:PART-TARGET value. See https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-09#section-4.4.3.7. Playback is not guaranteed.")),l.partTargetDuration=p}return l},ts=(n,e)=>{n.mediaGroups&&["AUDIO","SUBTITLES"].forEach(t=>{if(n.mediaGroups[t])for(const i in n.mediaGroups[t])for(const s in n.mediaGroups[t][i]){const r=n.mediaGroups[t][i][s];e(r,t,i,s)}})},Yc=({playlist:n,uri:e,id:t})=>{n.id=t,n.playlistErrors_=0,e&&(n.uri=e),n.attributes=n.attributes||{}},Sm=n=>{let e=n.playlists.length;for(;e--;){const t=n.playlists[e];Yc({playlist:t,id:es(e,t.uri)}),t.resolvedUri=Ht(n.uri,t.uri),n.playlists[t.id]=t,n.playlists[t.uri]=t,t.attributes.BANDWIDTH||$c.warn("Invalid playlist STREAM-INF detected. Missing BANDWIDTH attribute.")}},jm=n=>{ts(n,e=>{e.uri&&(e.resolvedUri=Ht(n.uri,e.uri))})},wm=(n,e)=>{const t=es(0,e),i={mediaGroups:{AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},uri:A().location.href,resolvedUri:A().location.href,playlists:[{uri:e,id:t,resolvedUri:e,attributes:{}}]};return i.playlists[t]=i.playlists[0],i.playlists[e]=i.playlists[0],i},Xc=(n,e,t=Gc)=>{n.uri=e;for(let s=0;s<n.playlists.length;s++)if(!n.playlists[s].uri){const r=`placeholder-uri-${s}`;n.playlists[s].uri=r}const i=Vs(n);ts(n,(s,r,a,l)=>{if(!s.playlists||!s.playlists.length){if(i&&r==="AUDIO"&&!s.uri)for(let h=0;h<n.playlists.length;h++){const p=n.playlists[h];if(p.attributes&&p.attributes.AUDIO&&p.attributes.AUDIO===a)return}s.playlists=[(0,ge.A)({},s)]}s.playlists.forEach(function(h,p){const g=t(r,a,l,h),y=es(p,g);h.uri?h.resolvedUri=h.resolvedUri||Ht(n.uri,h.uri):(h.uri=p===0?g:y,h.resolvedUri=h.uri),h.id=h.id||y,h.attributes=h.attributes||{},n.playlists[h.id]=h,n.playlists[h.uri]=h})}),Sm(n),jm(n)};class Kc{constructor(){this.offset_=null,this.pendingDateRanges_=new Map,this.processedDateRanges_=new Map}setOffset(e=[]){if(this.offset_!==null||!e.length)return;const[t]=e;t.programDateTime!==void 0&&(this.offset_=t.programDateTime/1e3)}setPendingDateRanges(e=[]){if(!e.length)return;const[t]=e,i=t.startDate.getTime();this.trimProcessedDateRanges_(i),this.pendingDateRanges_=e.reduce((s,r)=>(s.set(r.id,r),s),new Map)}processDateRange(e){this.pendingDateRanges_.delete(e.id),this.processedDateRanges_.set(e.id,e)}getDateRangesToProcess(){if(this.offset_===null)return[];const e={},t=[];this.pendingDateRanges_.forEach((i,s)=>{if(!this.processedDateRanges_.has(s)&&(i.startTime=i.startDate.getTime()/1e3-this.offset_,i.processDateRange=()=>this.processDateRange(i),t.push(i),!!i.class))if(e[i.class]){const r=e[i.class].push(i);i.classListIndex=r-1}else e[i.class]=[i],i.classListIndex=0});for(const i of t){const s=e[i.class]||[];i.endDate?i.endTime=i.endDate.getTime()/1e3-this.offset_:i.endOnNext&&s[i.classListIndex+1]?i.endTime=s[i.classListIndex+1].startTime:i.duration?i.endTime=i.startTime+i.duration:i.plannedDuration?i.endTime=i.startTime+i.plannedDuration:i.endTime=i.startTime}return t}trimProcessedDateRanges_(e){new Map(this.processedDateRanges_).forEach((i,s)=>{i.startDate.getTime()<e&&this.processedDateRanges_.delete(s)})}}const Qc=22,_n=({requestType:n,request:e,error:t,parseFailure:i})=>{const s=e.status<200||e.status>299,r=e.status>=400&&e.status<=499,a={uri:e.uri,requestType:n},l=s&&!r||i;if(t&&r)a.error=(0,ge.A)({},t),a.errorType=L.Error.NetworkRequestFailed;else if(e.aborted)a.errorType=L.Error.NetworkRequestAborted;else if(e.timedout)a.erroType=L.Error.NetworkRequestTimeout;else if(l){const h=i?L.Error.NetworkBodyParserFailed:L.Error.NetworkBadStatus;a.errorType=h,a.status=e.status,a.headers=e.headers}return a},{EventTarget:Bm}=L,Dm=(n,e)=>{if(e.endList||!e.serverControl)return n;const t={};if(e.serverControl.canBlockReload){const{preloadSegment:i}=e;let s=e.mediaSequence+e.segments.length;if(i){const r=i.parts||[],a=Nc(e)-1;a>-1&&a!==r.length-1&&(t._HLS_part=a),(a>-1||r.length)&&s--}t._HLS_msn=s}if(e.serverControl&&e.serverControl.canSkipUntil&&(t._HLS_skip=e.serverControl.canSkipDateranges?"v2":"YES"),Object.keys(t).length){const i=new(A()).URL(n);["_HLS_skip","_HLS_msn","_HLS_part"].forEach(function(s){t.hasOwnProperty(s)&&i.searchParams.set(s,t[s])}),n=i.toString()}return n},km=(n,e)=>{if(!n)return e;const t=Ye(n,e);if(n.preloadHints&&!e.preloadHints&&delete t.preloadHints,n.parts&&!e.parts)delete t.parts;else if(n.parts&&e.parts)for(let i=0;i<e.parts.length;i++)n.parts&&n.parts[i]&&(t.parts[i]=Ye(n.parts[i],e.parts[i]));return!n.skipped&&e.skipped&&(t.skipped=!1),n.preload&&!e.preload&&(t.preload=!1),t},Im=(n,e,t)=>{const i=n.slice(),s=e.slice();t=t||0;const r=[];let a;for(let l=0;l<s.length;l++){const h=i[l+t],p=s[l];h?(a=h.map||a,r.push(km(h,p))):(a&&!p.map&&(p.map=a),r.push(p))}return r},Jc=(n,e)=>{!n.resolvedUri&&n.uri&&(n.resolvedUri=Ht(e,n.uri)),n.key&&!n.key.resolvedUri&&(n.key.resolvedUri=Ht(e,n.key.uri)),n.map&&!n.map.resolvedUri&&(n.map.resolvedUri=Ht(e,n.map.uri)),n.map&&n.map.key&&!n.map.key.resolvedUri&&(n.map.key.resolvedUri=Ht(e,n.map.key.uri)),n.parts&&n.parts.length&&n.parts.forEach(t=>{t.resolvedUri||(t.resolvedUri=Ht(e,t.uri))}),n.preloadHints&&n.preloadHints.length&&n.preloadHints.forEach(t=>{t.resolvedUri||(t.resolvedUri=Ht(e,t.uri))})},Zc=function(n){const e=n.segments||[],t=n.preloadSegment;if(t&&t.parts&&t.parts.length){if(t.preloadHints){for(let i=0;i<t.preloadHints.length;i++)if(t.preloadHints[i].type==="MAP")return e}t.duration=n.targetDuration,t.preload=!0,e.push(t)}return e},ed=(n,e)=>n===e||n.segments&&e.segments&&n.segments.length===e.segments.length&&n.endList===e.endList&&n.mediaSequence===e.mediaSequence&&n.preloadSegment===e.preloadSegment,Go=(n,e,t=ed)=>{const i=Ye(n,{}),s=i.playlists[e.id];if(!s||t(s,e))return null;e.segments=Zc(e);const r=Ye(s,e);if(r.preloadSegment&&!e.preloadSegment&&delete r.preloadSegment,s.segments){if(e.skip){e.segments=e.segments||[];for(let a=0;a<e.skip.skippedSegments;a++)e.segments.unshift({skipped:!0})}r.segments=Im(s.segments,e.segments,e.mediaSequence-s.mediaSequence)}r.segments.forEach(a=>{Jc(a,r.resolvedUri)});for(let a=0;a<i.playlists.length;a++)i.playlists[a].id===e.id&&(i.playlists[a]=r);return i.playlists[e.id]=r,i.playlists[e.uri]=r,ts(n,(a,l,h,p)=>{if(a.playlists)for(let g=0;g<a.playlists.length;g++)e.id===a.playlists[g].id&&(a.playlists[g]=r)}),i},Yo=(n,e)=>{const t=n.segments||[],i=t[t.length-1],s=i&&i.parts&&i.parts[i.parts.length-1],r=s&&s.duration||i&&i.duration;return e&&r?r*1e3:(n.partTargetDuration||n.targetDuration||10)*500},td=(n,e,t)=>{if(!n)return;const i=[];return n.forEach(s=>{if(!s.attributes)return;const{BANDWIDTH:r,RESOLUTION:a,CODECS:l}=s.attributes;i.push({id:s.id,bandwidth:r,resolution:a,codecs:l})}),{type:e,isLive:t,renditions:i}};class is extends Bm{constructor(e,t,i={}){if(super(),!e)throw new Error("A non-empty playlist URL or object is required");this.logger_=oi("PlaylistLoader");const{withCredentials:s=!1}=i;this.src=e,this.vhs_=t,this.withCredentials=s,this.addDateRangesToTextTrack_=i.addDateRangesToTextTrack;const r=t.options_;this.customTagParsers=r&&r.customTagParsers||[],this.customTagMappers=r&&r.customTagMappers||[],this.llhls=r&&r.llhls,this.dateRangesStorage_=new Kc,this.state="HAVE_NOTHING",this.handleMediaupdatetimeout_=this.handleMediaupdatetimeout_.bind(this),this.on("mediaupdatetimeout",this.handleMediaupdatetimeout_),this.on("loadedplaylist",this.handleLoadedPlaylist_.bind(this))}handleLoadedPlaylist_(){const e=this.media();if(!e)return;this.dateRangesStorage_.setOffset(e.segments),this.dateRangesStorage_.setPendingDateRanges(e.dateRanges);const t=this.dateRangesStorage_.getDateRangesToProcess();!t.length||!this.addDateRangesToTextTrack_||this.addDateRangesToTextTrack_(t)}handleMediaupdatetimeout_(){if(this.state!=="HAVE_METADATA")return;const e=this.media();let t=Ht(this.main.uri,e.uri);this.llhls&&(t=Dm(t,e)),this.state="HAVE_CURRENT_METADATA",this.request=this.vhs_.xhr({uri:t,withCredentials:this.withCredentials,requestType:"hls-playlist"},(i,s)=>{if(this.request){if(i)return this.playlistRequestError(this.request,this.media(),"HAVE_METADATA");this.haveMetadata({playlistString:this.request.responseText,url:this.media().uri,id:this.media().id})}})}playlistRequestError(e,t,i){const{uri:s,id:r}=t;this.request=null,i&&(this.state=i),this.error={playlist:this.main.playlists[r],status:e.status,message:`HLS playlist request error at URL: ${s}.`,responseText:e.responseText,code:e.status>=500?4:2,metadata:_n({requestType:e.requestType,request:e,error:e.error})},this.trigger("error")}parseManifest_({url:e,manifestString:t}){try{return xm({onwarn:({message:i})=>this.logger_(`m3u8-parser warn for ${e}: ${i}`),oninfo:({message:i})=>this.logger_(`m3u8-parser info for ${e}: ${i}`),manifestString:t,customTagParsers:this.customTagParsers,customTagMappers:this.customTagMappers,llhls:this.llhls})}catch(i){this.error=i,this.error.metadata={errorType:L.Error.StreamingHlsPlaylistParserError,error:i}}}haveMetadata({playlistString:e,playlistObject:t,url:i,id:s}){this.request=null,this.state="HAVE_METADATA";const r={playlistInfo:{type:"media",uri:i}};this.trigger({type:"playlistparsestart",metadata:r});const a=t||this.parseManifest_({url:i,manifestString:e});a.lastRequest=Date.now(),Yc({playlist:a,uri:i,id:s});const l=Go(this.main,a);this.targetDuration=a.partTargetDuration||a.targetDuration,this.pendingMedia_=null,l?(this.main=l,this.media_=this.main.playlists[s]):this.trigger("playlistunchanged"),this.updateMediaUpdateTimeout_(Yo(this.media(),!!l)),r.parsedPlaylist=td(this.main.playlists,r.playlistInfo.type,!this.media_.endList),this.trigger({type:"playlistparsecomplete",metadata:r}),this.trigger("loadedplaylist")}dispose(){this.trigger("dispose"),this.stopRequest(),A().clearTimeout(this.mediaUpdateTimeout),A().clearTimeout(this.finalRenditionTimeout),this.dateRangesStorage_=new Kc,this.off()}stopRequest(){if(this.request){const e=this.request;this.request=null,e.onreadystatechange=null,e.abort()}}media(e,t){if(!e)return this.media_;if(this.state==="HAVE_NOTHING")throw new Error("Cannot switch media playlist from "+this.state);if(typeof e=="string"){if(!this.main.playlists[e])throw new Error("Unknown playlist URI: "+e);e=this.main.playlists[e]}if(A().clearTimeout(this.finalRenditionTimeout),t){const l=(e.partTargetDuration||e.targetDuration)/2*1e3||5e3;this.finalRenditionTimeout=A().setTimeout(this.media.bind(this,e,!1),l);return}const i=this.state,s=!this.media_||e.id!==this.media_.id,r=this.main.playlists[e.id];if(r&&r.endList||e.endList&&e.segments.length){this.request&&(this.request.onreadystatechange=null,this.request.abort(),this.request=null),this.state="HAVE_METADATA",this.media_=e,s&&(this.trigger("mediachanging"),i==="HAVE_MAIN_MANIFEST"?this.trigger("loadedmetadata"):this.trigger("mediachange"));return}if(this.updateMediaUpdateTimeout_(Yo(e,!0)),!s)return;if(this.state="SWITCHING_MEDIA",this.request){if(e.resolvedUri===this.request.url)return;this.request.onreadystatechange=null,this.request.abort(),this.request=null}this.media_&&this.trigger("mediachanging"),this.pendingMedia_=e;const a={playlistInfo:{type:"media",uri:e.uri}};this.trigger({type:"playlistrequeststart",metadata:a}),this.request=this.vhs_.xhr({uri:e.resolvedUri,withCredentials:this.withCredentials,requestType:"hls-playlist"},(l,h)=>{if(this.request){if(e.lastRequest=Date.now(),e.resolvedUri=Jr(e.resolvedUri,h),l)return this.playlistRequestError(this.request,e,i);this.trigger({type:"playlistrequestcomplete",metadata:a}),this.haveMetadata({playlistString:h.responseText,url:e.uri,id:e.id}),i==="HAVE_MAIN_MANIFEST"?this.trigger("loadedmetadata"):this.trigger("mediachange")}})}pause(){this.mediaUpdateTimeout&&(A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null),this.stopRequest(),this.state==="HAVE_NOTHING"&&(this.started=!1),this.state==="SWITCHING_MEDIA"?this.media_?this.state="HAVE_METADATA":this.state="HAVE_MAIN_MANIFEST":this.state==="HAVE_CURRENT_METADATA"&&(this.state="HAVE_METADATA")}load(e){this.mediaUpdateTimeout&&(A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null);const t=this.media();if(e){const i=t?(t.partTargetDuration||t.targetDuration)/2*1e3:5e3;this.mediaUpdateTimeout=A().setTimeout(()=>{this.mediaUpdateTimeout=null,this.load()},i);return}if(!this.started){this.start();return}t&&!t.endList?this.trigger("mediaupdatetimeout"):this.trigger("loadedplaylist")}updateMediaUpdateTimeout_(e){this.mediaUpdateTimeout&&(A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null),!(!this.media()||this.media().endList)&&(this.mediaUpdateTimeout=A().setTimeout(()=>{this.mediaUpdateTimeout=null,this.trigger("mediaupdatetimeout"),this.updateMediaUpdateTimeout_(e)},e))}start(){if(this.started=!0,typeof this.src=="object"){this.src.uri||(this.src.uri=A().location.href),this.src.resolvedUri=this.src.uri,setTimeout(()=>{this.setupInitialPlaylist(this.src)},0);return}const e={playlistInfo:{type:"multivariant",uri:this.src}};this.trigger({type:"playlistrequeststart",metadata:e}),this.request=this.vhs_.xhr({uri:this.src,withCredentials:this.withCredentials,requestType:"hls-playlist"},(t,i)=>{if(!this.request)return;if(this.request=null,t)return this.error={status:i.status,message:`HLS playlist request error at URL: ${this.src}.`,responseText:i.responseText,code:2,metadata:_n({requestType:i.requestType,request:i,error:t})},this.state==="HAVE_NOTHING"&&(this.started=!1),this.trigger("error");this.trigger({type:"playlistrequestcomplete",metadata:e}),this.src=Jr(this.src,i),this.trigger({type:"playlistparsestart",metadata:e});const s=this.parseManifest_({manifestString:i.responseText,url:this.src});e.parsedPlaylist=td(s.playlists,e.playlistInfo.type,!1),this.trigger({type:"playlistparsecomplete",metadata:e}),this.setupInitialPlaylist(s)})}srcUri(){return typeof this.src=="string"?this.src:this.src.uri}setupInitialPlaylist(e){if(this.state="HAVE_MAIN_MANIFEST",e.playlists){this.main=e,Xc(this.main,this.srcUri()),e.playlists.forEach(i=>{i.segments=Zc(i),i.segments.forEach(s=>{Jc(s,i.resolvedUri)})}),this.trigger("loadedplaylist"),this.request||this.media(this.main.playlists[0]);return}const t=this.srcUri()||A().location.href;this.main=wm(e,t),this.haveMetadata({playlistObject:e,url:t,id:this.main.playlists[0].id}),this.trigger("loadedmetadata")}updateOrDeleteClone(e,t){const i=this.main,s=e.ID;let r=i.playlists.length;for(;r--;){const a=i.playlists[r];if(a.attributes["PATHWAY-ID"]===s){const l=a.resolvedUri,h=a.id;if(t){const p=this.createCloneURI_(a.resolvedUri,e),g=es(s,p),y=this.createCloneAttributes_(s,a.attributes),w=this.createClonePlaylist_(a,g,e,y);i.playlists[r]=w,i.playlists[g]=w,i.playlists[p]=w}else i.playlists.splice(r,1);delete i.playlists[h],delete i.playlists[l]}}this.updateOrDeleteCloneMedia(e,t)}updateOrDeleteCloneMedia(e,t){const i=this.main,s=e.ID;["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(r=>{if(!(!i.mediaGroups[r]||!i.mediaGroups[r][s])){for(const a in i.mediaGroups[r])if(a===s){for(const l in i.mediaGroups[r][a])i.mediaGroups[r][a][l].playlists.forEach((p,g)=>{const y=i.playlists[p.id],w=y.id,D=y.resolvedUri;delete i.playlists[w],delete i.playlists[D]});delete i.mediaGroups[r][a]}}}),t&&this.createClonedMediaGroups_(e)}addClonePathway(e,t={}){const i=this.main,s=i.playlists.length,r=this.createCloneURI_(t.resolvedUri,e),a=es(e.ID,r),l=this.createCloneAttributes_(e.ID,t.attributes),h=this.createClonePlaylist_(t,a,e,l);i.playlists[s]=h,i.playlists[a]=h,i.playlists[r]=h,this.createClonedMediaGroups_(e)}createClonedMediaGroups_(e){const t=e.ID,i=e["BASE-ID"],s=this.main;["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(r=>{if(!(!s.mediaGroups[r]||s.mediaGroups[r][t]))for(const a in s.mediaGroups[r]){if(a===i)s.mediaGroups[r][t]={};else continue;for(const l in s.mediaGroups[r][a]){const h=s.mediaGroups[r][a][l];s.mediaGroups[r][t][l]=(0,ge.A)({},h);const p=s.mediaGroups[r][t][l],g=this.createCloneURI_(h.resolvedUri,e);p.resolvedUri=g,p.uri=g,p.playlists=[],h.playlists.forEach((y,w)=>{const D=s.playlists[y.id],P=Gc(r,t,l),E=es(t,P);if(D&&!s.playlists[E]){const H=this.createClonePlaylist_(D,E,e),V=H.resolvedUri;s.playlists[E]=H,s.playlists[V]=H}p.playlists[w]=this.createClonePlaylist_(y,E,e)})}}})}createClonePlaylist_(e,t,i,s){const r=this.createCloneURI_(e.resolvedUri,i),a={resolvedUri:r,uri:r,id:t};return e.segments&&(a.segments=[]),s&&(a.attributes=s),Ye(e,a)}createCloneURI_(e,t){const i=new URL(e);i.hostname=t["URI-REPLACEMENT"].HOST;const s=t["URI-REPLACEMENT"].PARAMS;for(const r of Object.keys(s))i.searchParams.set(r,s[r]);return i.href}createCloneAttributes_(e,t){const i={"PATHWAY-ID":e};return["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(s=>{t[s]&&(i[s]=e)}),i}getKeyIdSet(e){if(e.contentProtection){const t=new Set;for(const i in e.contentProtection){const s=e.contentProtection[i].attributes.keyId;s&&t.add(s.toLowerCase())}return t}}}const Xo=function(n,e,t,i){const s=n.responseType==="arraybuffer"?n.response:n.responseText;!e&&s&&(n.responseTime=Date.now(),n.roundTripTime=n.responseTime-n.requestTime,n.bytesReceived=s.byteLength||s.length,n.bandwidth||(n.bandwidth=Math.floor(n.bytesReceived/n.roundTripTime*8*1e3))),t.headers&&(n.responseHeaders=t.headers),e&&e.code==="ETIMEDOUT"&&(n.timedout=!0),!e&&!n.aborted&&t.statusCode!==200&&t.statusCode!==206&&t.statusCode!==0&&(e=new Error("XHR Failed with a response of: "+(n&&(s||n.responseText)))),i(e,n)},Pm=(n,e)=>{if(!n||!n.size)return;let t=e;return n.forEach(i=>{t=i(t)}),t},Om=(n,e,t,i)=>{!n||!n.size||n.forEach(s=>{s(e,t,i)})},id=function(){const n=function e(t,i){t=Ye({timeout:45e3},t);const s=e.beforeRequest||L.Vhs.xhr.beforeRequest,r=e._requestCallbackSet||L.Vhs.xhr._requestCallbackSet||new Set,a=e._responseCallbackSet||L.Vhs.xhr._responseCallbackSet;s&&typeof s=="function"&&(L.log.warn("beforeRequest is deprecated, use onRequest instead."),r.add(s));const l=L.Vhs.xhr.original===!0?L.xhr:L.Vhs.xhr,h=Pm(r,t);r.delete(s);const p=l(h||t,function(y,w){return Om(a,p,y,w),Xo(p,y,w,i)}),g=p.abort;return p.abort=function(){return p.aborted=!0,g.apply(p,arguments)},p.uri=t.uri,p.requestType=t.requestType,p.requestTime=Date.now(),p};return n.original=!0,n},Lm=function(n){let e;const t=n.offset;return typeof n.offset=="bigint"||typeof n.length=="bigint"?e=A().BigInt(n.offset)+A().BigInt(n.length)-A().BigInt(1):e=n.offset+n.length-1,"bytes="+t+"-"+e},Ko=function(n){const e={};return n.byterange&&(e.Range=Lm(n.byterange)),e},Rm=function(n,e){return n.start(e)+"-"+n.end(e)},Mm=function(n,e){const t=n.toString(16);return"00".substring(0,2-t.length)+t+(e%2?" ":"")},Nm=function(n){return n>=32&&n<126?String.fromCharCode(n):"."},nd=function(n){const e={};return Object.keys(n).forEach(t=>{const i=n[t];Et(i)?e[t]={bytes:i.buffer,byteOffset:i.byteOffset,byteLength:i.byteLength}:e[t]=i}),e},ta=function(n){const e=n.byterange||{length:1/0,offset:0};return[e.length,e.offset,n.resolvedUri].join(",")},sd=function(n){return n.resolvedUri},rd=n=>{const e=Array.prototype.slice.call(n),t=16;let i="",s,r;for(let a=0;a<e.length/t;a++)s=e.slice(a*t,a*t+t).map(Mm).join(""),r=e.slice(a*t,a*t+t).map(Nm).join(""),i+=s+" "+r+`
`;return i};var Um=Object.freeze({__proto__:null,createTransferableMessage:nd,initSegmentId:ta,segmentKeyId:sd,hexDump:rd,tagDump:({bytes:n})=>rd(n),textRanges:n=>{let e="",t;for(t=0;t<n.length;t++)e+=Rm(n,t)+" ";return e}});const ad=.25,Fm=(n,e)=>{if(!e.dateTimeObject)return null;const t=e.videoTimingInfo.transmuxerPrependedSeconds,s=e.videoTimingInfo.transmuxedPresentationStart+t,r=n-s;return new Date(e.dateTimeObject.getTime()+r*1e3)},Vm=n=>n.transmuxedPresentationEnd-n.transmuxedPresentationStart-n.transmuxerPrependedSeconds,zm=(n,e)=>{let t;try{t=new Date(n)}catch(h){return null}if(!e||!e.segments||e.segments.length===0)return null;let i=e.segments[0];if(t<new Date(i.dateTimeObject))return null;for(let h=0;h<e.segments.length-1;h++){i=e.segments[h];const p=new Date(e.segments[h+1].dateTimeObject);if(t<p)break}const s=e.segments[e.segments.length-1],r=s.dateTimeObject,a=s.videoTimingInfo?Vm(s.videoTimingInfo):s.duration+s.duration*ad,l=new Date(r.getTime()+a*1e3);return t>l?null:(t>new Date(r)&&(i=s),{segment:i,estimatedStart:i.videoTimingInfo?i.videoTimingInfo.transmuxedPresentationStart:qt.duration(e,e.mediaSequence+e.segments.indexOf(i)),type:i.videoTimingInfo?"accurate":"estimate"})},Hm=(n,e)=>{if(!e||!e.segments||e.segments.length===0)return null;let t=0,i;for(let r=0;r<e.segments.length&&(i=e.segments[r],t=i.videoTimingInfo?i.videoTimingInfo.transmuxedPresentationEnd:t+i.duration,!(n<=t));r++);const s=e.segments[e.segments.length-1];if(s.videoTimingInfo&&s.videoTimingInfo.transmuxedPresentationEnd<n)return null;if(n>t){if(n>t+s.duration*ad)return null;i=s}return{segment:i,estimatedStart:i.videoTimingInfo?i.videoTimingInfo.transmuxedPresentationStart:t-i.duration,type:i.videoTimingInfo?"accurate":"estimate"}},qm=(n,e)=>{let t,i;try{t=new Date(n),i=new Date(e)}catch(a){}const s=t.getTime();return(i.getTime()-s)/1e3},Wm=n=>{if(!n.segments||n.segments.length===0)return!1;for(let e=0;e<n.segments.length;e++)if(!n.segments[e].dateTimeObject)return!1;return!0},$m=({playlist:n,time:e=void 0,callback:t})=>{if(!t)throw new Error("getProgramTime: callback must be provided");if(!n||e===void 0)return t({message:"getProgramTime: playlist and time must be provided"});const i=Hm(e,n);if(!i)return t({message:"valid programTime was not found"});if(i.type==="estimate")return t({message:"Accurate programTime could not be determined. Please seek to e.seekTime and try again",seekTime:i.estimatedStart});const s={mediaSeconds:e},r=Fm(e,i.segment);return r&&(s.programDateTime=r.toISOString()),t(null,s)},od=({programTime:n,playlist:e,retryCount:t=2,seekTo:i,pauseAfterSeek:s=!0,tech:r,callback:a})=>{if(!a)throw new Error("seekToProgramTime: callback must be provided");if(typeof n=="undefined"||!e||!i)return a({message:"seekToProgramTime: programTime, seekTo and playlist must be provided"});if(!e.endList&&!r.hasStarted_)return a({message:"player must be playing a live stream to start buffering"});if(!Wm(e))return a({message:"programDateTime tags must be provided in the manifest "+e.resolvedUri});const l=zm(n,e);if(!l)return a({message:`${n} was not found in the stream`});const h=l.segment,p=qm(h.dateTimeObject,n);if(l.type==="estimate"){if(t===0)return a({message:`${n} is not buffered yet. Try again`});i(l.estimatedStart+p),r.one("seeked",()=>{od({programTime:n,playlist:e,retryCount:t-1,seekTo:i,pauseAfterSeek:s,tech:r,callback:a})});return}const g=h.start+p,y=()=>a(null,r.currentTime());r.one("seeked",y),s&&r.pause(),i(g)},Qo=(n,e)=>{if(n.readyState===4)return e()},Gm=(n,e,t,i)=>{let s=[],r,a=!1;const l=function(y,w,D,P){return w.abort(),a=!0,t(y,w,D,P)},h=function(y,w){if(a)return;if(y)return y.metadata=_n({requestType:i,request:w,error:y}),l(y,w,"",s);const D=w.responseText.substring(s&&s.byteLength||0,w.responseText.length);if(s=Ra(s,ps(D,!0)),r=r||xs(s),s.length<10||r&&s.length<r+2)return Qo(w,()=>l(y,w,"",s));const P=Wa(s);return P==="ts"&&s.length<188?Qo(w,()=>l(y,w,"",s)):!P&&s.length<376?Qo(w,()=>l(y,w,"",s)):l(null,w,P,s)},g=e({uri:n,beforeSend(y){y.overrideMimeType("text/plain; charset=x-user-defined"),y.addEventListener("progress",function({total:w,loaded:D}){return Xo(y,null,{statusCode:y.status},h)})}},function(y,w){return Xo(g,y,w,h)});return g},{EventTarget:Ym}=L,ld=function(n,e){if(!ed(n,e)||n.sidx&&e.sidx&&(n.sidx.offset!==e.sidx.offset||n.sidx.length!==e.sidx.length))return!1;if(!n.sidx&&e.sidx||n.sidx&&!e.sidx||n.segments&&!e.segments||!n.segments&&e.segments)return!1;if(!n.segments&&!e.segments)return!0;for(let t=0;t<n.segments.length;t++){const i=n.segments[t],s=e.segments[t];if(i.uri!==s.uri)return!1;if(!i.byterange&&!s.byterange)continue;const r=i.byterange,a=s.byterange;if(r&&!a||!r&&a||r.offset!==a.offset||r.length!==a.length)return!1}return!0},Xm=(n,e,t,i)=>{const s=i.attributes.NAME||t;return`placeholder-uri-${n}-${e}-${s}`},Km=({mainXml:n,srcUrl:e,clientOffset:t,sidxMapping:i,previousManifest:s})=>{const r=Ef(n,{manifestUri:e,clientOffset:t,sidxMapping:i,previousManifest:s});return Xc(r,e,Xm),r},Qm=(n,e)=>{ts(n,(t,i,s,r)=>{(!e.mediaGroups[i][s]||!(r in e.mediaGroups[i][s]))&&delete n.mediaGroups[i][s][r]})},Jm=(n,e,t)=>{let i=!0,s=Ye(n,{duration:e.duration,minimumUpdatePeriod:e.minimumUpdatePeriod,timelineStarts:e.timelineStarts});for(let r=0;r<e.playlists.length;r++){const a=e.playlists[r];if(a.sidx){const h=Ge(a.sidx);t&&t[h]&&t[h].sidx&&un(a,t[h].sidx,a.sidx.resolvedUri)}const l=Go(s,a,ld);l&&(s=l,i=!1)}return ts(e,(r,a,l,h)=>{if(r.playlists&&r.playlists.length){const p=r.playlists[0].id,g=Go(s,r.playlists[0],ld);g&&(s=g,h in s.mediaGroups[a][l]||(s.mediaGroups[a][l][h]=r),s.mediaGroups[a][l][h].playlists[0]=s.playlists[p],i=!1)}}),Qm(s,e),e.minimumUpdatePeriod!==n.minimumUpdatePeriod&&(i=!1),i?null:s},Zm=(n,e)=>(!n.map&&!e.map||!!(n.map&&e.map&&n.map.byterange.offset===e.map.byterange.offset&&n.map.byterange.length===e.map.byterange.length))&&n.uri===e.uri&&n.byterange.offset===e.byterange.offset&&n.byterange.length===e.byterange.length,ud=(n,e)=>{const t={};for(const i in n){const r=n[i].sidx;if(r){const a=Ge(r);if(!e[a])break;const l=e[a].sidxInfo;Zm(l,r)&&(t[a]=e[a])}}return t},eg=(n,e)=>{let i=ud(n.playlists,e);return ts(n,(s,r,a,l)=>{if(s.playlists&&s.playlists.length){const h=s.playlists;i=Ye(i,ud(h,e))}}),i};class Jo extends Ym{constructor(e,t,i={},s){super(),this.isPaused_=!0,this.mainPlaylistLoader_=s||this,s||(this.isMain_=!0);const{withCredentials:r=!1}=i;if(this.vhs_=t,this.withCredentials=r,this.addMetadataToTextTrack=i.addMetadataToTextTrack,!e)throw new Error("A non-empty playlist URL or object is required");this.on("minimumUpdatePeriod",()=>{this.refreshXml_()}),this.on("mediaupdatetimeout",()=>{this.refreshMedia_(this.media().id)}),this.state="HAVE_NOTHING",this.loadedPlaylists_={},this.logger_=oi("DashPlaylistLoader"),this.isMain_?(this.mainPlaylistLoader_.srcUrl=e,this.mainPlaylistLoader_.sidxMapping_={}):this.childPlaylist_=e}get isPaused(){return this.isPaused_}requestErrored_(e,t,i){if(!this.request)return!0;if(this.request=null,e)return this.error=typeof e=="object"&&!(e instanceof Error)?e:{status:t.status,message:"DASH request error at URL: "+t.uri,response:t.response,code:2,metadata:e.metadata},i&&(this.state=i),this.trigger("error"),!0}addSidxSegments_(e,t,i){const s=e.sidx&&Ge(e.sidx);if(!e.sidx||!s||this.mainPlaylistLoader_.sidxMapping_[s]){A().clearTimeout(this.mediaRequest_),this.mediaRequest_=A().setTimeout(()=>i(!1),0);return}const r=Jr(e.sidx.resolvedUri),a=(h,p)=>{if(this.requestErrored_(h,p,t))return;const g=this.mainPlaylistLoader_.sidxMapping_,{requestType:y}=p;let w;try{w=xf()(fe(p.response).subarray(8))}catch(D){D.metadata=_n({requestType:y,request:p,parseFailure:!0}),this.requestErrored_(D,p,t);return}return g[s]={sidxInfo:e.sidx,sidx:w},un(e,w,e.sidx.resolvedUri),i(!0)},l="dash-sidx";this.request=Gm(r,this.vhs_.xhr,(h,p,g,y)=>{if(h)return a(h,p);if(!g||g!=="mp4"){const P=g||"unknown";return a({status:p.status,message:`Unsupported ${P} container type for sidx segment at URL: ${r}`,response:"",playlist:e,internal:!0,playlistExclusionDuration:1/0,code:2},p)}const{offset:w,length:D}=e.sidx.byterange;if(y.length>=D+w)return a(h,{response:y.subarray(w,w+D),status:p.status,uri:p.uri});this.request=this.vhs_.xhr({uri:r,responseType:"arraybuffer",requestType:"dash-sidx",headers:Ko({byterange:e.sidx.byterange})},a)},l)}dispose(){this.isPaused_=!0,this.trigger("dispose"),this.stopRequest(),this.loadedPlaylists_={},A().clearTimeout(this.minimumUpdatePeriodTimeout_),A().clearTimeout(this.mediaRequest_),A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null,this.mediaRequest_=null,this.minimumUpdatePeriodTimeout_=null,this.mainPlaylistLoader_.createMupOnMedia_&&(this.off("loadedmetadata",this.mainPlaylistLoader_.createMupOnMedia_),this.mainPlaylistLoader_.createMupOnMedia_=null),this.off()}hasPendingRequest(){return this.request||this.mediaRequest_}stopRequest(){if(this.request){const e=this.request;this.request=null,e.onreadystatechange=null,e.abort()}}media(e){if(!e)return this.media_;if(this.state==="HAVE_NOTHING")throw new Error("Cannot switch media playlist from "+this.state);const t=this.state;if(typeof e=="string"){if(!this.mainPlaylistLoader_.main.playlists[e])throw new Error("Unknown playlist URI: "+e);e=this.mainPlaylistLoader_.main.playlists[e]}const i=!this.media_||e.id!==this.media_.id;if(i&&this.loadedPlaylists_[e.id]&&this.loadedPlaylists_[e.id].endList){this.state="HAVE_METADATA",this.media_=e,i&&(this.trigger("mediachanging"),this.trigger("mediachange"));return}i&&(this.media_&&this.trigger("mediachanging"),this.addSidxSegments_(e,t,s=>{this.haveMetadata({startingState:t,playlist:e})}))}haveMetadata({startingState:e,playlist:t}){this.state="HAVE_METADATA",this.loadedPlaylists_[t.id]=t,A().clearTimeout(this.mediaRequest_),this.mediaRequest_=null,this.refreshMedia_(t.id),e==="HAVE_MAIN_MANIFEST"?this.trigger("loadedmetadata"):this.trigger("mediachange")}pause(){this.isPaused_=!0,this.mainPlaylistLoader_.createMupOnMedia_&&(this.off("loadedmetadata",this.mainPlaylistLoader_.createMupOnMedia_),this.mainPlaylistLoader_.createMupOnMedia_=null),this.stopRequest(),A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null,this.isMain_&&(A().clearTimeout(this.mainPlaylistLoader_.minimumUpdatePeriodTimeout_),this.mainPlaylistLoader_.minimumUpdatePeriodTimeout_=null),this.state==="HAVE_NOTHING"&&(this.started=!1)}load(e){this.isPaused_=!1,A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null;const t=this.media();if(e){const i=t?t.targetDuration/2*1e3:5e3;this.mediaUpdateTimeout=A().setTimeout(()=>this.load(),i);return}if(!this.started){this.start();return}t&&!t.endList?(this.isMain_&&!this.minimumUpdatePeriodTimeout_&&(this.trigger("minimumUpdatePeriod"),this.updateMinimumUpdatePeriodTimeout_()),this.trigger("mediaupdatetimeout")):this.trigger("loadedplaylist")}start(){if(this.started=!0,!this.isMain_){A().clearTimeout(this.mediaRequest_),this.mediaRequest_=A().setTimeout(()=>this.haveMain_(),0);return}this.requestMain_((e,t)=>{this.haveMain_(),!this.hasPendingRequest()&&!this.media_&&this.media(this.mainPlaylistLoader_.main.playlists[0])})}requestMain_(e){const t={manifestInfo:{uri:this.mainPlaylistLoader_.srcUrl}};this.trigger({type:"manifestrequeststart",metadata:t}),this.request=this.vhs_.xhr({uri:this.mainPlaylistLoader_.srcUrl,withCredentials:this.withCredentials,requestType:"dash-manifest"},(i,s)=>{if(i){const{requestType:a}=s;i.metadata=_n({requestType:a,request:s,error:i})}if(this.requestErrored_(i,s)){this.state==="HAVE_NOTHING"&&(this.started=!1);return}this.trigger({type:"manifestrequestcomplete",metadata:t});const r=s.responseText!==this.mainPlaylistLoader_.mainXml_;if(this.mainPlaylistLoader_.mainXml_=s.responseText,s.responseHeaders&&s.responseHeaders.date?this.mainLoaded_=Date.parse(s.responseHeaders.date):this.mainLoaded_=Date.now(),this.mainPlaylistLoader_.srcUrl=Jr(this.mainPlaylistLoader_.srcUrl,s),r){this.handleMain_(),this.syncClientServerClock_(()=>e(s,r));return}return e(s,r)})}syncClientServerClock_(e){const t=Tf(this.mainPlaylistLoader_.mainXml_);if(t===null)return this.mainPlaylistLoader_.clientOffset_=this.mainLoaded_-Date.now(),e();if(t.method==="DIRECT")return this.mainPlaylistLoader_.clientOffset_=t.value-Date.now(),e();this.request=this.vhs_.xhr({uri:Ht(this.mainPlaylistLoader_.srcUrl,t.value),method:t.method,withCredentials:this.withCredentials,requestType:"dash-clock-sync"},(i,s)=>{if(!this.request)return;if(i){const{requestType:a}=s;return this.error.metadata=_n({requestType:a,request:s,error:i}),this.mainPlaylistLoader_.clientOffset_=this.mainLoaded_-Date.now(),e()}let r;t.method==="HEAD"?!s.responseHeaders||!s.responseHeaders.date?r=this.mainLoaded_:r=Date.parse(s.responseHeaders.date):r=Date.parse(s.responseText),this.mainPlaylistLoader_.clientOffset_=r-Date.now(),e()})}haveMain_(){this.state="HAVE_MAIN_MANIFEST",this.isMain_?this.trigger("loadedplaylist"):this.media_||this.media(this.childPlaylist_)}handleMain_(){A().clearTimeout(this.mediaRequest_),this.mediaRequest_=null;const e=this.mainPlaylistLoader_.main,t={manifestInfo:{uri:this.mainPlaylistLoader_.srcUrl}};this.trigger({type:"manifestparsestart",metadata:t});let i;try{i=Km({mainXml:this.mainPlaylistLoader_.mainXml_,srcUrl:this.mainPlaylistLoader_.srcUrl,clientOffset:this.mainPlaylistLoader_.clientOffset_,sidxMapping:this.mainPlaylistLoader_.sidxMapping_,previousManifest:e})}catch(r){this.error=r,this.error.metadata={errorType:L.Error.StreamingDashManifestParserError,error:r},this.trigger("error")}e&&(i=Jm(e,i,this.mainPlaylistLoader_.sidxMapping_)),this.mainPlaylistLoader_.main=i||e;const s=this.mainPlaylistLoader_.main.locations&&this.mainPlaylistLoader_.main.locations[0];if(s&&s!==this.mainPlaylistLoader_.srcUrl&&(this.mainPlaylistLoader_.srcUrl=s),(!e||i&&i.minimumUpdatePeriod!==e.minimumUpdatePeriod)&&this.updateMinimumUpdatePeriodTimeout_(),this.addEventStreamToMetadataTrack_(i),i){const{duration:r,endList:a}=i,l=[];i.playlists.forEach(p=>{l.push({id:p.id,bandwidth:p.attributes.BANDWIDTH,resolution:p.attributes.RESOLUTION,codecs:p.attributes.CODECS})});const h={duration:r,isLive:!a,renditions:l};t.parsedManifest=h,this.trigger({type:"manifestparsecomplete",metadata:t})}return!!i}updateMinimumUpdatePeriodTimeout_(){const e=this.mainPlaylistLoader_;e.createMupOnMedia_&&(e.off("loadedmetadata",e.createMupOnMedia_),e.createMupOnMedia_=null),e.minimumUpdatePeriodTimeout_&&(A().clearTimeout(e.minimumUpdatePeriodTimeout_),e.minimumUpdatePeriodTimeout_=null);let t=e.main&&e.main.minimumUpdatePeriod;if(t===0&&(e.media()?t=e.media().targetDuration*1e3:(e.createMupOnMedia_=e.updateMinimumUpdatePeriodTimeout_,e.one("loadedmetadata",e.createMupOnMedia_))),typeof t!="number"||t<=0){t<0&&this.logger_(`found invalid minimumUpdatePeriod of ${t}, not setting a timeout`);return}this.createMUPTimeout_(t)}createMUPTimeout_(e){const t=this.mainPlaylistLoader_;t.minimumUpdatePeriodTimeout_=A().setTimeout(()=>{t.minimumUpdatePeriodTimeout_=null,t.trigger("minimumUpdatePeriod"),t.createMUPTimeout_(e)},e)}refreshXml_(){this.requestMain_((e,t)=>{t&&(this.media_&&(this.media_=this.mainPlaylistLoader_.main.playlists[this.media_.id]),this.mainPlaylistLoader_.sidxMapping_=eg(this.mainPlaylistLoader_.main,this.mainPlaylistLoader_.sidxMapping_),this.addSidxSegments_(this.media(),this.state,i=>{this.refreshMedia_(this.media().id)}))})}refreshMedia_(e){if(!e)throw new Error("refreshMedia_ must take a media id");this.media_&&this.isMain_&&this.handleMain_();const t=this.mainPlaylistLoader_.main.playlists,i=!this.media_||this.media_!==t[e];if(i?this.media_=t[e]:this.trigger("playlistunchanged"),!this.mediaUpdateTimeout){const s=()=>{this.media().endList||(this.mediaUpdateTimeout=A().setTimeout(()=>{this.trigger("mediaupdatetimeout"),s()},Yo(this.media(),!!i)))};s()}this.trigger("loadedplaylist")}addEventStreamToMetadataTrack_(e){if(e&&this.mainPlaylistLoader_.main.eventStream){const t=this.mainPlaylistLoader_.main.eventStream.map(i=>({cueTime:i.start,frames:[{data:i.messageData}]}));this.addMetadataToTextTrack("EventStream",t,this.mainPlaylistLoader_.main.duration)}}getKeyIdSet(e){if(e.contentProtection){const t=new Set;for(const i in e.contentProtection){const s=e.contentProtection[i].attributes["cenc:default_KID"];s&&t.add(s.replace(/-/g,"").toLowerCase())}return t}}}var jt={GOAL_BUFFER_LENGTH:30,MAX_GOAL_BUFFER_LENGTH:60,BACK_BUFFER_LENGTH:30,GOAL_BUFFER_LENGTH_RATE:1,INITIAL_BANDWIDTH:4194304,BANDWIDTH_VARIANCE:1.2,BUFFER_LOW_WATER_LINE:0,MAX_BUFFER_LOW_WATER_LINE:30,EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE:16,BUFFER_LOW_WATER_LINE_RATE:1,BUFFER_HIGH_WATER_LINE:30};const tg=n=>{const e=new Uint8Array(new ArrayBuffer(n.length));for(let t=0;t<n.length;t++)e[t]=n.charCodeAt(t);return e.buffer},cd=function(n){return n.on=n.addEventListener,n.off=n.removeEventListener,n},ig=function(n){try{return URL.createObjectURL(new Blob([n],{type:"application/javascript"}))}catch(e){const t=new BlobBuilder;return t.append(n),URL.createObjectURL(t.getBlob())}},dd=function(n){return function(){const e=ig(n),t=cd(new Worker(e));t.objURL=e;const i=t.terminate;return t.on=t.addEventListener,t.off=t.removeEventListener,t.terminate=function(){return URL.revokeObjectURL(e),i.call(this)},t}},hd=function(n){return`var browserWorkerPolyFill = ${cd.toString()};
browserWorkerPolyFill(self);
`+n},fd=function(n){return n.toString().replace(/^function.+?{/,"").slice(0,-1)},ng=hd(fd(function(){var n=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof G.g!="undefined"?G.g:typeof self!="undefined"?self:{},e=function(){this.init=function(){var o={};this.on=function(u,c){o[u]||(o[u]=[]),o[u]=o[u].concat(c)},this.off=function(u,c){var d;return o[u]?(d=o[u].indexOf(c),o[u]=o[u].slice(),o[u].splice(d,1),d>-1):!1},this.trigger=function(u){var c,d,f,m;if(c=o[u],!!c)if(arguments.length===2)for(f=c.length,d=0;d<f;++d)c[d].call(this,arguments[1]);else{for(m=[],d=arguments.length,d=1;d<arguments.length;++d)m.push(arguments[d]);for(f=c.length,d=0;d<f;++d)c[d].apply(this,m)}},this.dispose=function(){o={}}}};e.prototype.pipe=function(o){return this.on("data",function(u){o.push(u)}),this.on("done",function(u){o.flush(u)}),this.on("partialdone",function(u){o.partialFlush(u)}),this.on("endedtimeline",function(u){o.endTimeline(u)}),this.on("reset",function(u){o.reset(u)}),o},e.prototype.push=function(o){this.trigger("data",o)},e.prototype.flush=function(o){this.trigger("done",o)},e.prototype.partialFlush=function(o){this.trigger("partialdone",o)},e.prototype.endTimeline=function(o){this.trigger("endedtimeline",o)},e.prototype.reset=function(o){this.trigger("reset",o)};var t=e,i=Math.pow(2,32),s=function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c;return u.getBigUint64?(c=u.getBigUint64(0),c<Number.MAX_SAFE_INTEGER?Number(c):c):u.getUint32(0)*i+u.getUint32(4)},r={getUint64:s,MAX_UINT32:i},a=r.MAX_UINT32,l,h,p,g,y,w,D,P,E,H,V,U,M,Y,O,Q,Ae,be,We,At,wt,ct,we,Ke,li,Hi,nn,En,Tn,Cn,xn,Sn,la,sh,rh,ah;(function(){var o;if(we={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],mvex:[],mvhd:[],pasp:[],sdtp:[],smhd:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],styp:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[]},typeof Uint8Array!="undefined"){for(o in we)we.hasOwnProperty(o)&&(we[o]=[o.charCodeAt(0),o.charCodeAt(1),o.charCodeAt(2),o.charCodeAt(3)]);Ke=new Uint8Array([105,115,111,109]),Hi=new Uint8Array([97,118,99,49]),li=new Uint8Array([0,0,0,1]),nn=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),En=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0]),Tn={video:nn,audio:En},Sn=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),xn=new Uint8Array([0,0,0,0,0,0,0,0]),la=new Uint8Array([0,0,0,0,0,0,0,0]),sh=la,rh=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),ah=la,Cn=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0])}})(),l=function(o){var u=[],c=0,d,f,m;for(d=1;d<arguments.length;d++)u.push(arguments[d]);for(d=u.length;d--;)c+=u[d].byteLength;for(f=new Uint8Array(c+8),m=new DataView(f.buffer,f.byteOffset,f.byteLength),m.setUint32(0,f.byteLength),f.set(o,4),d=0,c=8;d<u.length;d++)f.set(u[d],c),c+=u[d].byteLength;return f},h=function(){return l(we.dinf,l(we.dref,Sn))},p=function(o){return l(we.esds,new Uint8Array([0,0,0,0,3,25,0,0,0,4,17,64,21,0,6,0,0,0,218,192,0,0,218,192,5,2,o.audioobjecttype<<3|o.samplingfrequencyindex>>>1,o.samplingfrequencyindex<<7|o.channelcount<<3,6,1,2]))},g=function(){return l(we.ftyp,Ke,li,Ke,Hi)},Q=function(o){return l(we.hdlr,Tn[o])},y=function(o){return l(we.mdat,o)},O=function(o){var u=new Uint8Array([0,0,0,0,0,0,0,2,0,0,0,3,0,1,95,144,o.duration>>>24&255,o.duration>>>16&255,o.duration>>>8&255,o.duration&255,85,196,0,0]);return o.samplerate&&(u[12]=o.samplerate>>>24&255,u[13]=o.samplerate>>>16&255,u[14]=o.samplerate>>>8&255,u[15]=o.samplerate&255),l(we.mdhd,u)},Y=function(o){return l(we.mdia,O(o),Q(o.type),D(o))},w=function(o){return l(we.mfhd,new Uint8Array([0,0,0,0,(o&4278190080)>>24,(o&16711680)>>16,(o&65280)>>8,o&255]))},D=function(o){return l(we.minf,o.type==="video"?l(we.vmhd,Cn):l(we.smhd,xn),h(),be(o))},P=function(o,u){for(var c=[],d=u.length;d--;)c[d]=At(u[d]);return l.apply(null,[we.moof,w(o)].concat(c))},E=function(o){for(var u=o.length,c=[];u--;)c[u]=U(o[u]);return l.apply(null,[we.moov,V(4294967295)].concat(c).concat(H(o)))},H=function(o){for(var u=o.length,c=[];u--;)c[u]=wt(o[u]);return l.apply(null,[we.mvex].concat(c))},V=function(o){var u=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,2,0,1,95,144,(o&4278190080)>>24,(o&16711680)>>16,(o&65280)>>8,o&255,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255]);return l(we.mvhd,u)},Ae=function(o){var u=o.samples||[],c=new Uint8Array(4+u.length),d,f;for(f=0;f<u.length;f++)d=u[f].flags,c[f+4]=d.dependsOn<<4|d.isDependedOn<<2|d.hasRedundancy;return l(we.sdtp,c)},be=function(o){return l(we.stbl,We(o),l(we.stts,ah),l(we.stsc,sh),l(we.stsz,rh),l(we.stco,la))},function(){var o,u;We=function(c){return l(we.stsd,new Uint8Array([0,0,0,0,0,0,0,1]),c.type==="video"?o(c):u(c))},o=function(c){var d=c.sps||[],f=c.pps||[],m=[],_=[],T,x;for(T=0;T<d.length;T++)m.push((d[T].byteLength&65280)>>>8),m.push(d[T].byteLength&255),m=m.concat(Array.prototype.slice.call(d[T]));for(T=0;T<f.length;T++)_.push((f[T].byteLength&65280)>>>8),_.push(f[T].byteLength&255),_=_.concat(Array.prototype.slice.call(f[T]));if(x=[we.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,(c.width&65280)>>8,c.width&255,(c.height&65280)>>8,c.height&255,0,72,0,0,0,72,0,0,0,0,0,0,0,1,19,118,105,100,101,111,106,115,45,99,111,110,116,114,105,98,45,104,108,115,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),l(we.avcC,new Uint8Array([1,c.profileIdc,c.profileCompatibility,c.levelIdc,255].concat([d.length],m,[f.length],_))),l(we.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192]))],c.sarRatio){var j=c.sarRatio[0],k=c.sarRatio[1];x.push(l(we.pasp,new Uint8Array([(j&4278190080)>>24,(j&16711680)>>16,(j&65280)>>8,j&255,(k&4278190080)>>24,(k&16711680)>>16,(k&65280)>>8,k&255])))}return l.apply(null,x)},u=function(c){return l(we.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,(c.channelcount&65280)>>8,c.channelcount&255,(c.samplesize&65280)>>8,c.samplesize&255,0,0,0,0,(c.samplerate&65280)>>8,c.samplerate&255,0,0]),p(c))}}(),M=function(o){var u=new Uint8Array([0,0,0,7,0,0,0,0,0,0,0,0,(o.id&4278190080)>>24,(o.id&16711680)>>16,(o.id&65280)>>8,o.id&255,0,0,0,0,(o.duration&4278190080)>>24,(o.duration&16711680)>>16,(o.duration&65280)>>8,o.duration&255,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,(o.width&65280)>>8,o.width&255,0,0,(o.height&65280)>>8,o.height&255,0,0]);return l(we.tkhd,u)},At=function(o){var u,c,d,f,m,_,T;return u=l(we.tfhd,new Uint8Array([0,0,0,58,(o.id&4278190080)>>24,(o.id&16711680)>>16,(o.id&65280)>>8,o.id&255,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0])),_=Math.floor(o.baseMediaDecodeTime/a),T=Math.floor(o.baseMediaDecodeTime%a),c=l(we.tfdt,new Uint8Array([1,0,0,0,_>>>24&255,_>>>16&255,_>>>8&255,_&255,T>>>24&255,T>>>16&255,T>>>8&255,T&255])),m=92,o.type==="audio"?(d=ct(o,m),l(we.traf,u,c,d)):(f=Ae(o),d=ct(o,f.length+m),l(we.traf,u,c,d,f))},U=function(o){return o.duration=o.duration||4294967295,l(we.trak,M(o),Y(o))},wt=function(o){var u=new Uint8Array([0,0,0,0,(o.id&4278190080)>>24,(o.id&16711680)>>16,(o.id&65280)>>8,o.id&255,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]);return o.type!=="video"&&(u[u.length-1]=0),l(we.trex,u)},function(){var o,u,c;c=function(d,f){var m=0,_=0,T=0,x=0;return d.length&&(d[0].duration!==void 0&&(m=1),d[0].size!==void 0&&(_=2),d[0].flags!==void 0&&(T=4),d[0].compositionTimeOffset!==void 0&&(x=8)),[0,0,m|_|T|x,1,(d.length&4278190080)>>>24,(d.length&16711680)>>>16,(d.length&65280)>>>8,d.length&255,(f&4278190080)>>>24,(f&16711680)>>>16,(f&65280)>>>8,f&255]},u=function(d,f){var m,_,T,x,j,k;for(x=d.samples||[],f+=20+16*x.length,T=c(x,f),_=new Uint8Array(T.length+x.length*16),_.set(T),m=T.length,k=0;k<x.length;k++)j=x[k],_[m++]=(j.duration&4278190080)>>>24,_[m++]=(j.duration&16711680)>>>16,_[m++]=(j.duration&65280)>>>8,_[m++]=j.duration&255,_[m++]=(j.size&4278190080)>>>24,_[m++]=(j.size&16711680)>>>16,_[m++]=(j.size&65280)>>>8,_[m++]=j.size&255,_[m++]=j.flags.isLeading<<2|j.flags.dependsOn,_[m++]=j.flags.isDependedOn<<6|j.flags.hasRedundancy<<4|j.flags.paddingValue<<1|j.flags.isNonSyncSample,_[m++]=j.flags.degradationPriority&61440,_[m++]=j.flags.degradationPriority&15,_[m++]=(j.compositionTimeOffset&4278190080)>>>24,_[m++]=(j.compositionTimeOffset&16711680)>>>16,_[m++]=(j.compositionTimeOffset&65280)>>>8,_[m++]=j.compositionTimeOffset&255;return l(we.trun,_)},o=function(d,f){var m,_,T,x,j,k;for(x=d.samples||[],f+=20+8*x.length,T=c(x,f),m=new Uint8Array(T.length+x.length*8),m.set(T),_=T.length,k=0;k<x.length;k++)j=x[k],m[_++]=(j.duration&4278190080)>>>24,m[_++]=(j.duration&16711680)>>>16,m[_++]=(j.duration&65280)>>>8,m[_++]=j.duration&255,m[_++]=(j.size&4278190080)>>>24,m[_++]=(j.size&16711680)>>>16,m[_++]=(j.size&65280)>>>8,m[_++]=j.size&255;return l(we.trun,m)},ct=function(d,f){return d.type==="audio"?o(d,f):u(d,f)}}();var W0={ftyp:g,mdat:y,moof:P,moov:E,initSegment:function(o){var u=g(),c=E(o),d;return d=new Uint8Array(u.byteLength+c.byteLength),d.set(u),d.set(c,u.byteLength),d}},$0=function(o){var u,c,d=[],f=[];for(f.byteLength=0,f.nalCount=0,f.duration=0,d.byteLength=0,u=0;u<o.length;u++)c=o[u],c.nalUnitType==="access_unit_delimiter_rbsp"?(d.length&&(d.duration=c.dts-d.dts,f.byteLength+=d.byteLength,f.nalCount+=d.length,f.duration+=d.duration,f.push(d)),d=[c],d.byteLength=c.data.byteLength,d.pts=c.pts,d.dts=c.dts):(c.nalUnitType==="slice_layer_without_partitioning_rbsp_idr"&&(d.keyFrame=!0),d.duration=c.dts-d.dts,d.byteLength+=c.data.byteLength,d.push(c));return f.length&&(!d.duration||d.duration<=0)&&(d.duration=f[f.length-1].duration),f.byteLength+=d.byteLength,f.nalCount+=d.length,f.duration+=d.duration,f.push(d),f},G0=function(o){var u,c,d=[],f=[];for(d.byteLength=0,d.nalCount=0,d.duration=0,d.pts=o[0].pts,d.dts=o[0].dts,f.byteLength=0,f.nalCount=0,f.duration=0,f.pts=o[0].pts,f.dts=o[0].dts,u=0;u<o.length;u++)c=o[u],c.keyFrame?(d.length&&(f.push(d),f.byteLength+=d.byteLength,f.nalCount+=d.nalCount,f.duration+=d.duration),d=[c],d.nalCount=c.length,d.byteLength=c.byteLength,d.pts=c.pts,d.dts=c.dts,d.duration=c.duration):(d.duration+=c.duration,d.nalCount+=c.length,d.byteLength+=c.byteLength,d.push(c));return f.length&&d.duration<=0&&(d.duration=f[f.length-1].duration),f.byteLength+=d.byteLength,f.nalCount+=d.nalCount,f.duration+=d.duration,f.push(d),f},Y0=function(o){var u;return!o[0][0].keyFrame&&o.length>1&&(u=o.shift(),o.byteLength-=u.byteLength,o.nalCount-=u.nalCount,o[0][0].dts=u.dts,o[0][0].pts=u.pts,o[0][0].duration+=u.duration),o},X0=function(){return{size:0,flags:{isLeading:0,dependsOn:1,isDependedOn:0,hasRedundancy:0,degradationPriority:0,isNonSyncSample:1}}},oh=function(o,u){var c=X0();return c.dataOffset=u,c.compositionTimeOffset=o.pts-o.dts,c.duration=o.duration,c.size=4*o.length,c.size+=o.byteLength,o.keyFrame&&(c.flags.dependsOn=2,c.flags.isNonSyncSample=0),c},K0=function(o,u){var c,d,f,m,_,T=u||0,x=[];for(c=0;c<o.length;c++)for(m=o[c],d=0;d<m.length;d++)_=m[d],f=oh(_,T),T+=f.size,x.push(f);return x},Q0=function(o){var u,c,d,f,m,_,T=0,x=o.byteLength,j=o.nalCount,k=x+4*j,z=new Uint8Array(k),de=new DataView(z.buffer);for(u=0;u<o.length;u++)for(f=o[u],c=0;c<f.length;c++)for(m=f[c],d=0;d<m.length;d++)_=m[d],de.setUint32(T,_.data.byteLength),T+=4,z.set(_.data,T),T+=_.data.byteLength;return z},J0=function(o,u){var c,d=u||0,f=[];return c=oh(o,d),f.push(c),f},Z0=function(o){var u,c,d=0,f=o.byteLength,m=o.length,_=f+4*m,T=new Uint8Array(_),x=new DataView(T.buffer);for(u=0;u<o.length;u++)c=o[u],x.setUint32(d,c.data.byteLength),d+=4,T.set(c.data,d),d+=c.data.byteLength;return T},ev={groupNalsIntoFrames:$0,groupFramesIntoGops:G0,extendFirstKeyFrame:Y0,generateSampleTable:K0,concatenateNalData:Q0,generateSampleTableForFrame:J0,concatenateNalDataForFrame:Z0},sn=[33,16,5,32,164,27],ll=[33,65,108,84,1,2,4,8,168,2,4,8,17,191,252],Qe=function(o){for(var u=[];o--;)u.push(0);return u},tv=function(o){return Object.keys(o).reduce(function(u,c){return u[c]=new Uint8Array(o[c].reduce(function(d,f){return d.concat(f)},[])),u},{})},ul,iv=function(){if(!ul){var o={96e3:[sn,[227,64],Qe(154),[56]],88200:[sn,[231],Qe(170),[56]],64e3:[sn,[248,192],Qe(240),[56]],48e3:[sn,[255,192],Qe(268),[55,148,128],Qe(54),[112]],44100:[sn,[255,192],Qe(268),[55,163,128],Qe(84),[112]],32e3:[sn,[255,192],Qe(268),[55,234],Qe(226),[112]],24e3:[sn,[255,192],Qe(268),[55,255,128],Qe(268),[111,112],Qe(126),[224]],16e3:[sn,[255,192],Qe(268),[55,255,128],Qe(268),[111,255],Qe(269),[223,108],Qe(195),[1,192]],12e3:[ll,Qe(268),[3,127,248],Qe(268),[6,255,240],Qe(268),[13,255,224],Qe(268),[27,253,128],Qe(259),[56]],11025:[ll,Qe(268),[3,127,248],Qe(268),[6,255,240],Qe(268),[13,255,224],Qe(268),[27,255,192],Qe(268),[55,175,128],Qe(108),[112]],8e3:[ll,Qe(268),[3,121,16],Qe(47),[7]]};ul=tv(o)}return ul},cl=9e4,dl,hl,ua,fl,lh,uh,ch;dl=function(o){return o*cl},hl=function(o,u){return o*u},ua=function(o){return o/cl},fl=function(o,u){return o/u},lh=function(o,u){return dl(fl(o,u))},uh=function(o,u){return hl(ua(o),u)},ch=function(o,u,c){return ua(c?o:o-u)};var ot={ONE_SECOND_IN_TS:cl,secondsToVideoTs:dl,secondsToAudioTs:hl,videoTsToSeconds:ua,audioTsToSeconds:fl,audioTsToVideoTs:lh,videoTsToAudioTs:uh,metadataTsToSeconds:ch},nv=iv,ca=ot,sv=function(o){var u,c,d=0;for(u=0;u<o.length;u++)c=o[u],d+=c.data.byteLength;return d},rv=function(o,u,c,d){var f,m=0,_=0,T=0,x=0,j,k,z;if(u.length&&(f=ca.audioTsToVideoTs(o.baseMediaDecodeTime,o.samplerate),m=Math.ceil(ca.ONE_SECOND_IN_TS/(o.samplerate/1024)),c&&d&&(_=f-Math.max(c,d),T=Math.floor(_/m),x=T*m),!(T<1||x>ca.ONE_SECOND_IN_TS/2))){for(j=nv()[o.samplerate],j||(j=u[0].data),k=0;k<T;k++)z=u[0],u.splice(0,0,{data:j,dts:z.dts-m,pts:z.pts-m});return o.baseMediaDecodeTime-=Math.floor(ca.videoTsToAudioTs(x,o.samplerate)),x}},av=function(o,u,c){return u.minSegmentDts>=c?o:(u.minSegmentDts=1/0,o.filter(function(d){return d.dts>=c?(u.minSegmentDts=Math.min(u.minSegmentDts,d.dts),u.minSegmentPts=u.minSegmentDts,!0):!1}))},ov=function(o){var u,c,d=[];for(u=0;u<o.length;u++)c=o[u],d.push({size:c.data.byteLength,duration:1024});return d},lv=function(o){var u,c,d=0,f=new Uint8Array(sv(o));for(u=0;u<o.length;u++)c=o[u],f.set(c.data,d),d+=c.data.byteLength;return f},uv={prefixWithSilence:rv,trimAdtsFramesByEarliestDts:av,generateSampleTable:ov,concatenateFrameData:lv},cv=ot.ONE_SECOND_IN_TS,dv=function(o,u){typeof u.pts=="number"&&(o.timelineStartInfo.pts===void 0&&(o.timelineStartInfo.pts=u.pts),o.minSegmentPts===void 0?o.minSegmentPts=u.pts:o.minSegmentPts=Math.min(o.minSegmentPts,u.pts),o.maxSegmentPts===void 0?o.maxSegmentPts=u.pts:o.maxSegmentPts=Math.max(o.maxSegmentPts,u.pts)),typeof u.dts=="number"&&(o.timelineStartInfo.dts===void 0&&(o.timelineStartInfo.dts=u.dts),o.minSegmentDts===void 0?o.minSegmentDts=u.dts:o.minSegmentDts=Math.min(o.minSegmentDts,u.dts),o.maxSegmentDts===void 0?o.maxSegmentDts=u.dts:o.maxSegmentDts=Math.max(o.maxSegmentDts,u.dts))},hv=function(o){delete o.minSegmentDts,delete o.maxSegmentDts,delete o.minSegmentPts,delete o.maxSegmentPts},fv=function(o,u){var c,d,f=o.minSegmentDts;return u||(f-=o.timelineStartInfo.dts),c=o.timelineStartInfo.baseMediaDecodeTime,c+=f,c=Math.max(0,c),o.type==="audio"&&(d=o.samplerate/cv,c*=d,c=Math.floor(c)),c},pv={clearDtsInfo:hv,calculateTrackBaseMediaDecodeTime:fv,collectDtsInfo:dv},dh=4,mv=128,gv=function(o){for(var u=0,c={payloadType:-1,payloadSize:0},d=0,f=0;u<o.byteLength&&o[u]!==mv;){for(;o[u]===255;)d+=255,u++;for(d+=o[u++];o[u]===255;)f+=255,u++;if(f+=o[u++],!c.payload&&d===dh){var m=String.fromCharCode(o[u+3],o[u+4],o[u+5],o[u+6]);if(m==="GA94"){c.payloadType=d,c.payloadSize=f,c.payload=o.subarray(u,u+f);break}else c.payload=void 0}u+=f,d=0,f=0}return c},vv=function(o){return o.payload[0]!==181||(o.payload[1]<<8|o.payload[2])!==49||String.fromCharCode(o.payload[3],o.payload[4],o.payload[5],o.payload[6])!=="GA94"||o.payload[7]!==3?null:o.payload.subarray(8,o.payload.length-1)},Av=function(o,u){var c=[],d,f,m,_;if(!(u[0]&64))return c;for(f=u[0]&31,d=0;d<f;d++)m=d*3,_={type:u[m+2]&3,pts:o},u[m+2]&4&&(_.ccData=u[m+3]<<8|u[m+4],c.push(_));return c},yv=function(o){for(var u=o.byteLength,c=[],d=1,f,m;d<u-2;)o[d]===0&&o[d+1]===0&&o[d+2]===3?(c.push(d+2),d+=2):d++;if(c.length===0)return o;f=u-c.length,m=new Uint8Array(f);var _=0;for(d=0;d<f;_++,d++)_===c[0]&&(_++,c.shift()),m[d]=o[_];return m},hh={parseSei:gv,parseUserData:vv,parseCaptionPackets:Av,discardEmulationPreventionBytes:yv,USER_DATA_REGISTERED_ITU_T_T35:dh},pl=t,da=hh,Wt=function(o){o=o||{},Wt.prototype.init.call(this),this.parse708captions_=typeof o.parse708captions=="boolean"?o.parse708captions:!0,this.captionPackets_=[],this.ccStreams_=[new dt(0,0),new dt(0,1),new dt(1,0),new dt(1,1)],this.parse708captions_&&(this.cc708Stream_=new et({captionServices:o.captionServices})),this.reset(),this.ccStreams_.forEach(function(u){u.on("data",this.trigger.bind(this,"data")),u.on("partialdone",this.trigger.bind(this,"partialdone")),u.on("done",this.trigger.bind(this,"done"))},this),this.parse708captions_&&(this.cc708Stream_.on("data",this.trigger.bind(this,"data")),this.cc708Stream_.on("partialdone",this.trigger.bind(this,"partialdone")),this.cc708Stream_.on("done",this.trigger.bind(this,"done")))};Wt.prototype=new pl,Wt.prototype.push=function(o){var u,c,d;if(o.nalUnitType==="sei_rbsp"&&(u=da.parseSei(o.escapedRBSP),!!u.payload&&u.payloadType===da.USER_DATA_REGISTERED_ITU_T_T35&&(c=da.parseUserData(u),!!c))){if(o.dts<this.latestDts_){this.ignoreNextEqualDts_=!0;return}else if(o.dts===this.latestDts_&&this.ignoreNextEqualDts_){this.numSameDts_--,this.numSameDts_||(this.ignoreNextEqualDts_=!1);return}d=da.parseCaptionPackets(o.pts,c),this.captionPackets_=this.captionPackets_.concat(d),this.latestDts_!==o.dts&&(this.numSameDts_=0),this.numSameDts_++,this.latestDts_=o.dts}},Wt.prototype.flushCCStreams=function(o){this.ccStreams_.forEach(function(u){return o==="flush"?u.flush():u.partialFlush()},this)},Wt.prototype.flushStream=function(o){if(!this.captionPackets_.length){this.flushCCStreams(o);return}this.captionPackets_.forEach(function(u,c){u.presortIndex=c}),this.captionPackets_.sort(function(u,c){return u.pts===c.pts?u.presortIndex-c.presortIndex:u.pts-c.pts}),this.captionPackets_.forEach(function(u){u.type<2?this.dispatchCea608Packet(u):this.dispatchCea708Packet(u)},this),this.captionPackets_.length=0,this.flushCCStreams(o)},Wt.prototype.flush=function(){return this.flushStream("flush")},Wt.prototype.partialFlush=function(){return this.flushStream("partialFlush")},Wt.prototype.reset=function(){this.latestDts_=null,this.ignoreNextEqualDts_=!1,this.numSameDts_=0,this.activeCea608Channel_=[null,null],this.ccStreams_.forEach(function(o){o.reset()})},Wt.prototype.dispatchCea608Packet=function(o){this.setsTextOrXDSActive(o)?this.activeCea608Channel_[o.type]=null:this.setsChannel1Active(o)?this.activeCea608Channel_[o.type]=0:this.setsChannel2Active(o)&&(this.activeCea608Channel_[o.type]=1),this.activeCea608Channel_[o.type]!==null&&this.ccStreams_[(o.type<<1)+this.activeCea608Channel_[o.type]].push(o)},Wt.prototype.setsChannel1Active=function(o){return(o.ccData&30720)===4096},Wt.prototype.setsChannel2Active=function(o){return(o.ccData&30720)===6144},Wt.prototype.setsTextOrXDSActive=function(o){return(o.ccData&28928)===256||(o.ccData&30974)===4138||(o.ccData&30974)===6186},Wt.prototype.dispatchCea708Packet=function(o){this.parse708captions_&&this.cc708Stream_.push(o)};var _v={127:9834,4128:32,4129:160,4133:8230,4138:352,4140:338,4144:9608,4145:8216,4146:8217,4147:8220,4148:8221,4149:8226,4153:8482,4154:353,4156:339,4157:8480,4159:376,4214:8539,4215:8540,4216:8541,4217:8542,4218:9168,4219:9124,4220:9123,4221:9135,4222:9126,4223:9121,4256:12600},bv=function(o){var u=_v[o]||o;return o&4096&&o===u?"":String.fromCharCode(u)},ha=function(o){return 32<=o&&o<=127||160<=o&&o<=255},qi=function(o){this.windowNum=o,this.reset()};qi.prototype.reset=function(){this.clearText(),this.pendingNewLine=!1,this.winAttr={},this.penAttr={},this.penLoc={},this.penColor={},this.visible=0,this.rowLock=0,this.columnLock=0,this.priority=0,this.relativePositioning=0,this.anchorVertical=0,this.anchorHorizontal=0,this.anchorPoint=0,this.rowCount=1,this.virtualRowCount=this.rowCount+1,this.columnCount=41,this.windowStyle=0,this.penStyle=0},qi.prototype.getText=function(){return this.rows.join(`
`)},qi.prototype.clearText=function(){this.rows=[""],this.rowIdx=0},qi.prototype.newLine=function(o){for(this.rows.length>=this.virtualRowCount&&typeof this.beforeRowOverflow=="function"&&this.beforeRowOverflow(o),this.rows.length>0&&(this.rows.push(""),this.rowIdx++);this.rows.length>this.virtualRowCount;)this.rows.shift(),this.rowIdx--},qi.prototype.isEmpty=function(){return this.rows.length===0?!0:this.rows.length===1?this.rows[0]==="":!1},qi.prototype.addText=function(o){this.rows[this.rowIdx]+=o},qi.prototype.backspace=function(){if(!this.isEmpty()){var o=this.rows[this.rowIdx];this.rows[this.rowIdx]=o.substr(0,o.length-1)}};var fa=function(o,u,c){this.serviceNum=o,this.text="",this.currentWindow=new qi(-1),this.windows=[],this.stream=c,typeof u=="string"&&this.createTextDecoder(u)};fa.prototype.init=function(o,u){this.startPts=o;for(var c=0;c<8;c++)this.windows[c]=new qi(c),typeof u=="function"&&(this.windows[c].beforeRowOverflow=u)},fa.prototype.setCurrentWindow=function(o){this.currentWindow=this.windows[o]},fa.prototype.createTextDecoder=function(o){if(typeof TextDecoder=="undefined")this.stream.trigger("log",{level:"warn",message:"The `encoding` option is unsupported without TextDecoder support"});else try{this.textDecoder_=new TextDecoder(o)}catch(u){this.stream.trigger("log",{level:"warn",message:"TextDecoder could not be created with "+o+" encoding. "+u})}};var et=function(o){o=o||{},et.prototype.init.call(this);var u=this,c=o.captionServices||{},d={},f;Object.keys(c).forEach(m=>{f=c[m],/^SERVICE/.test(m)&&(d[m]=f.encoding)}),this.serviceEncodings=d,this.current708Packet=null,this.services={},this.push=function(m){m.type===3?(u.new708Packet(),u.add708Bytes(m)):(u.current708Packet===null&&u.new708Packet(),u.add708Bytes(m))}};et.prototype=new pl,et.prototype.new708Packet=function(){this.current708Packet!==null&&this.push708Packet(),this.current708Packet={data:[],ptsVals:[]}},et.prototype.add708Bytes=function(o){var u=o.ccData,c=u>>>8,d=u&255;this.current708Packet.ptsVals.push(o.pts),this.current708Packet.data.push(c),this.current708Packet.data.push(d)},et.prototype.push708Packet=function(){var o=this.current708Packet,u=o.data,c=null,d=null,f=0,m=u[f++];for(o.seq=m>>6,o.sizeCode=m&63;f<u.length;f++)m=u[f++],c=m>>5,d=m&31,c===7&&d>0&&(m=u[f++],c=m),this.pushServiceBlock(c,f,d),d>0&&(f+=d-1)},et.prototype.pushServiceBlock=function(o,u,c){var d,f=u,m=this.current708Packet.data,_=this.services[o];for(_||(_=this.initService(o,f));f<u+c&&f<m.length;f++)d=m[f],ha(d)?f=this.handleText(f,_):d===24?f=this.multiByteCharacter(f,_):d===16?f=this.extendedCommands(f,_):128<=d&&d<=135?f=this.setCurrentWindow(f,_):152<=d&&d<=159?f=this.defineWindow(f,_):d===136?f=this.clearWindows(f,_):d===140?f=this.deleteWindows(f,_):d===137?f=this.displayWindows(f,_):d===138?f=this.hideWindows(f,_):d===139?f=this.toggleWindows(f,_):d===151?f=this.setWindowAttributes(f,_):d===144?f=this.setPenAttributes(f,_):d===145?f=this.setPenColor(f,_):d===146?f=this.setPenLocation(f,_):d===143?_=this.reset(f,_):d===8?_.currentWindow.backspace():d===12?_.currentWindow.clearText():d===13?_.currentWindow.pendingNewLine=!0:d===14?_.currentWindow.clearText():d===141&&f++},et.prototype.extendedCommands=function(o,u){var c=this.current708Packet.data,d=c[++o];return ha(d)&&(o=this.handleText(o,u,{isExtended:!0})),o},et.prototype.getPts=function(o){return this.current708Packet.ptsVals[Math.floor(o/2)]},et.prototype.initService=function(o,u){var d="SERVICE"+o,c=this,d,f;return d in this.serviceEncodings&&(f=this.serviceEncodings[d]),this.services[o]=new fa(o,f,c),this.services[o].init(this.getPts(u),function(m){c.flushDisplayed(m,c.services[o])}),this.services[o]},et.prototype.handleText=function(o,u,c){var d=c&&c.isExtended,f=c&&c.isMultiByte,m=this.current708Packet.data,_=d?4096:0,T=m[o],x=m[o+1],j=u.currentWindow,k,z;function de(X){return X.map(Be=>("0"+(Be&255).toString(16)).slice(-2)).join("")}if(f?(z=[T,x],o++):z=[T],u.textDecoder_&&!d)k=u.textDecoder_.decode(new Uint8Array(z));else if(f){const X=de(z);k=String.fromCharCode(parseInt(X,16))}else k=bv(_|T);return j.pendingNewLine&&!j.isEmpty()&&j.newLine(this.getPts(o)),j.pendingNewLine=!1,j.addText(k),o},et.prototype.multiByteCharacter=function(o,u){var c=this.current708Packet.data,d=c[o+1],f=c[o+2];return ha(d)&&ha(f)&&(o=this.handleText(++o,u,{isMultiByte:!0})),o},et.prototype.setCurrentWindow=function(o,u){var c=this.current708Packet.data,d=c[o],f=d&7;return u.setCurrentWindow(f),o},et.prototype.defineWindow=function(o,u){var c=this.current708Packet.data,d=c[o],f=d&7;u.setCurrentWindow(f);var m=u.currentWindow;return d=c[++o],m.visible=(d&32)>>5,m.rowLock=(d&16)>>4,m.columnLock=(d&8)>>3,m.priority=d&7,d=c[++o],m.relativePositioning=(d&128)>>7,m.anchorVertical=d&127,d=c[++o],m.anchorHorizontal=d,d=c[++o],m.anchorPoint=(d&240)>>4,m.rowCount=d&15,d=c[++o],m.columnCount=d&63,d=c[++o],m.windowStyle=(d&56)>>3,m.penStyle=d&7,m.virtualRowCount=m.rowCount+1,o},et.prototype.setWindowAttributes=function(o,u){var c=this.current708Packet.data,d=c[o],f=u.currentWindow.winAttr;return d=c[++o],f.fillOpacity=(d&192)>>6,f.fillRed=(d&48)>>4,f.fillGreen=(d&12)>>2,f.fillBlue=d&3,d=c[++o],f.borderType=(d&192)>>6,f.borderRed=(d&48)>>4,f.borderGreen=(d&12)>>2,f.borderBlue=d&3,d=c[++o],f.borderType+=(d&128)>>5,f.wordWrap=(d&64)>>6,f.printDirection=(d&48)>>4,f.scrollDirection=(d&12)>>2,f.justify=d&3,d=c[++o],f.effectSpeed=(d&240)>>4,f.effectDirection=(d&12)>>2,f.displayEffect=d&3,o},et.prototype.flushDisplayed=function(o,u){for(var c=[],d=0;d<8;d++)u.windows[d].visible&&!u.windows[d].isEmpty()&&c.push(u.windows[d].getText());u.endPts=o,u.text=c.join(`

`),this.pushCaption(u),u.startPts=o},et.prototype.pushCaption=function(o){o.text!==""&&(this.trigger("data",{startPts:o.startPts,endPts:o.endPts,text:o.text,stream:"cc708_"+o.serviceNum}),o.text="",o.startPts=o.endPts)},et.prototype.displayWindows=function(o,u){var c=this.current708Packet.data,d=c[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)d&1<<m&&(u.windows[m].visible=1);return o},et.prototype.hideWindows=function(o,u){var c=this.current708Packet.data,d=c[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)d&1<<m&&(u.windows[m].visible=0);return o},et.prototype.toggleWindows=function(o,u){var c=this.current708Packet.data,d=c[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)d&1<<m&&(u.windows[m].visible^=1);return o},et.prototype.clearWindows=function(o,u){var c=this.current708Packet.data,d=c[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)d&1<<m&&u.windows[m].clearText();return o},et.prototype.deleteWindows=function(o,u){var c=this.current708Packet.data,d=c[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)d&1<<m&&u.windows[m].reset();return o},et.prototype.setPenAttributes=function(o,u){var c=this.current708Packet.data,d=c[o],f=u.currentWindow.penAttr;return d=c[++o],f.textTag=(d&240)>>4,f.offset=(d&12)>>2,f.penSize=d&3,d=c[++o],f.italics=(d&128)>>7,f.underline=(d&64)>>6,f.edgeType=(d&56)>>3,f.fontStyle=d&7,o},et.prototype.setPenColor=function(o,u){var c=this.current708Packet.data,d=c[o],f=u.currentWindow.penColor;return d=c[++o],f.fgOpacity=(d&192)>>6,f.fgRed=(d&48)>>4,f.fgGreen=(d&12)>>2,f.fgBlue=d&3,d=c[++o],f.bgOpacity=(d&192)>>6,f.bgRed=(d&48)>>4,f.bgGreen=(d&12)>>2,f.bgBlue=d&3,d=c[++o],f.edgeRed=(d&48)>>4,f.edgeGreen=(d&12)>>2,f.edgeBlue=d&3,o},et.prototype.setPenLocation=function(o,u){var c=this.current708Packet.data,d=c[o],f=u.currentWindow.penLoc;return u.currentWindow.pendingNewLine=!0,d=c[++o],f.row=d&15,d=c[++o],f.column=d&63,o},et.prototype.reset=function(o,u){var c=this.getPts(o);return this.flushDisplayed(c,u),this.initService(u.serviceNum,o)};var Ev={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608,304:174,305:176,306:189,307:191,308:8482,309:162,310:163,311:9834,312:224,313:160,314:232,315:226,316:234,317:238,318:244,319:251,544:193,545:201,546:211,547:218,548:220,549:252,550:8216,551:161,552:42,553:39,554:8212,555:169,556:8480,557:8226,558:8220,559:8221,560:192,561:194,562:199,563:200,564:202,565:203,566:235,567:206,568:207,569:239,570:212,571:217,572:249,573:219,574:171,575:187,800:195,801:227,802:205,803:204,804:236,805:210,806:242,807:213,808:245,809:123,810:125,811:92,812:94,813:95,814:124,815:126,816:196,817:228,818:214,819:246,820:223,821:165,822:164,823:9474,824:197,825:229,826:216,827:248,828:9484,829:9488,830:9492,831:9496},pa=function(o){return o===null?"":(o=Ev[o]||o,String.fromCharCode(o))},ma=14,Tv=[4352,4384,4608,4640,5376,5408,5632,5664,5888,5920,4096,4864,4896,5120,5152],jn=function(){for(var o=[],u=ma+1;u--;)o.push({text:"",indent:0,offset:0});return o},dt=function(o,u){dt.prototype.init.call(this),this.field_=o||0,this.dataChannel_=u||0,this.name_="CC"+((this.field_<<1|this.dataChannel_)+1),this.setConstants(),this.reset(),this.push=function(c){var d,f,m,_,T;if(d=c.ccData&32639,d===this.lastControlCode_){this.lastControlCode_=null;return}if((d&61440)===4096?this.lastControlCode_=d:d!==this.PADDING_&&(this.lastControlCode_=null),m=d>>>8,_=d&255,d!==this.PADDING_)if(d===this.RESUME_CAPTION_LOADING_)this.mode_="popOn";else if(d===this.END_OF_CAPTION_)this.mode_="popOn",this.clearFormatting(c.pts),this.flushDisplayed(c.pts),f=this.displayed_,this.displayed_=this.nonDisplayed_,this.nonDisplayed_=f,this.startPts_=c.pts;else if(d===this.ROLL_UP_2_ROWS_)this.rollUpRows_=2,this.setRollUp(c.pts);else if(d===this.ROLL_UP_3_ROWS_)this.rollUpRows_=3,this.setRollUp(c.pts);else if(d===this.ROLL_UP_4_ROWS_)this.rollUpRows_=4,this.setRollUp(c.pts);else if(d===this.CARRIAGE_RETURN_)this.clearFormatting(c.pts),this.flushDisplayed(c.pts),this.shiftRowsUp_(),this.startPts_=c.pts;else if(d===this.BACKSPACE_)this.mode_==="popOn"?this.nonDisplayed_[this.row_].text=this.nonDisplayed_[this.row_].text.slice(0,-1):this.displayed_[this.row_].text=this.displayed_[this.row_].text.slice(0,-1);else if(d===this.ERASE_DISPLAYED_MEMORY_)this.flushDisplayed(c.pts),this.displayed_=jn();else if(d===this.ERASE_NON_DISPLAYED_MEMORY_)this.nonDisplayed_=jn();else if(d===this.RESUME_DIRECT_CAPTIONING_)this.mode_!=="paintOn"&&(this.flushDisplayed(c.pts),this.displayed_=jn()),this.mode_="paintOn",this.startPts_=c.pts;else if(this.isSpecialCharacter(m,_))m=(m&3)<<8,T=pa(m|_),this[this.mode_](c.pts,T),this.column_++;else if(this.isExtCharacter(m,_))this.mode_==="popOn"?this.nonDisplayed_[this.row_].text=this.nonDisplayed_[this.row_].text.slice(0,-1):this.displayed_[this.row_].text=this.displayed_[this.row_].text.slice(0,-1),m=(m&3)<<8,T=pa(m|_),this[this.mode_](c.pts,T),this.column_++;else if(this.isMidRowCode(m,_))this.clearFormatting(c.pts),this[this.mode_](c.pts," "),this.column_++,(_&14)===14&&this.addFormatting(c.pts,["i"]),(_&1)===1&&this.addFormatting(c.pts,["u"]);else if(this.isOffsetControlCode(m,_)){const j=_&3;this.nonDisplayed_[this.row_].offset=j,this.column_+=j}else if(this.isPAC(m,_)){var x=Tv.indexOf(d&7968);if(this.mode_==="rollUp"&&(x-this.rollUpRows_+1<0&&(x=this.rollUpRows_-1),this.setRollUp(c.pts,x)),x!==this.row_&&x>=0&&x<=14&&(this.clearFormatting(c.pts),this.row_=x),_&1&&this.formatting_.indexOf("u")===-1&&this.addFormatting(c.pts,["u"]),(d&16)===16){const j=(d&14)>>1;this.column_=j*4,this.nonDisplayed_[this.row_].indent+=j}this.isColorPAC(_)&&(_&14)===14&&this.addFormatting(c.pts,["i"])}else this.isNormalChar(m)&&(_===0&&(_=null),T=pa(m),T+=pa(_),this[this.mode_](c.pts,T),this.column_+=T.length)}};dt.prototype=new pl,dt.prototype.flushDisplayed=function(o){const u=d=>{this.trigger("log",{level:"warn",message:"Skipping a malformed 608 caption at index "+d+"."})},c=[];this.displayed_.forEach((d,f)=>{if(d&&d.text&&d.text.length){try{d.text=d.text.trim()}catch(m){u(f)}d.text.length&&c.push({text:d.text,line:f+1,position:10+Math.min(70,d.indent*10)+d.offset*2.5})}else d==null&&u(f)}),c.length&&this.trigger("data",{startPts:this.startPts_,endPts:o,content:c,stream:this.name_})},dt.prototype.reset=function(){this.mode_="popOn",this.topRow_=0,this.startPts_=0,this.displayed_=jn(),this.nonDisplayed_=jn(),this.lastControlCode_=null,this.column_=0,this.row_=ma,this.rollUpRows_=2,this.formatting_=[]},dt.prototype.setConstants=function(){this.dataChannel_===0?(this.BASE_=16,this.EXT_=17,this.CONTROL_=(20|this.field_)<<8,this.OFFSET_=23):this.dataChannel_===1&&(this.BASE_=24,this.EXT_=25,this.CONTROL_=(28|this.field_)<<8,this.OFFSET_=31),this.PADDING_=0,this.RESUME_CAPTION_LOADING_=this.CONTROL_|32,this.END_OF_CAPTION_=this.CONTROL_|47,this.ROLL_UP_2_ROWS_=this.CONTROL_|37,this.ROLL_UP_3_ROWS_=this.CONTROL_|38,this.ROLL_UP_4_ROWS_=this.CONTROL_|39,this.CARRIAGE_RETURN_=this.CONTROL_|45,this.RESUME_DIRECT_CAPTIONING_=this.CONTROL_|41,this.BACKSPACE_=this.CONTROL_|33,this.ERASE_DISPLAYED_MEMORY_=this.CONTROL_|44,this.ERASE_NON_DISPLAYED_MEMORY_=this.CONTROL_|46},dt.prototype.isSpecialCharacter=function(o,u){return o===this.EXT_&&u>=48&&u<=63},dt.prototype.isExtCharacter=function(o,u){return(o===this.EXT_+1||o===this.EXT_+2)&&u>=32&&u<=63},dt.prototype.isMidRowCode=function(o,u){return o===this.EXT_&&u>=32&&u<=47},dt.prototype.isOffsetControlCode=function(o,u){return o===this.OFFSET_&&u>=33&&u<=35},dt.prototype.isPAC=function(o,u){return o>=this.BASE_&&o<this.BASE_+8&&u>=64&&u<=127},dt.prototype.isColorPAC=function(o){return o>=64&&o<=79||o>=96&&o<=127},dt.prototype.isNormalChar=function(o){return o>=32&&o<=127},dt.prototype.setRollUp=function(o,u){if(this.mode_!=="rollUp"&&(this.row_=ma,this.mode_="rollUp",this.flushDisplayed(o),this.nonDisplayed_=jn(),this.displayed_=jn()),u!==void 0&&u!==this.row_)for(var c=0;c<this.rollUpRows_;c++)this.displayed_[u-c]=this.displayed_[this.row_-c],this.displayed_[this.row_-c]={text:"",indent:0,offset:0};u===void 0&&(u=this.row_),this.topRow_=u-this.rollUpRows_+1},dt.prototype.addFormatting=function(o,u){this.formatting_=this.formatting_.concat(u);var c=u.reduce(function(d,f){return d+"<"+f+">"},"");this[this.mode_](o,c)},dt.prototype.clearFormatting=function(o){if(this.formatting_.length){var u=this.formatting_.reverse().reduce(function(c,d){return c+"</"+d+">"},"");this.formatting_=[],this[this.mode_](o,u)}},dt.prototype.popOn=function(o,u){var c=this.nonDisplayed_[this.row_].text;c+=u,this.nonDisplayed_[this.row_].text=c},dt.prototype.rollUp=function(o,u){var c=this.displayed_[this.row_].text;c+=u,this.displayed_[this.row_].text=c},dt.prototype.shiftRowsUp_=function(){var o;for(o=0;o<this.topRow_;o++)this.displayed_[o]={text:"",indent:0,offset:0};for(o=this.row_+1;o<ma+1;o++)this.displayed_[o]={text:"",indent:0,offset:0};for(o=this.topRow_;o<this.row_;o++)this.displayed_[o]=this.displayed_[o+1];this.displayed_[this.row_]={text:"",indent:0,offset:0}},dt.prototype.paintOn=function(o,u){var c=this.displayed_[this.row_].text;c+=u,this.displayed_[this.row_].text=c};var fh={CaptionStream:Wt,Cea608Stream:dt,Cea708Stream:et},ga={H264_STREAM_TYPE:27,ADTS_STREAM_TYPE:15,METADATA_STREAM_TYPE:21},Cv=t,xv=8589934592,Sv=4294967296,ph="shared",ml=function(o,u){var c=1;for(o>u&&(c=-1);Math.abs(u-o)>Sv;)o+=c*xv;return o},gl=function(o){var u,c;gl.prototype.init.call(this),this.type_=o||ph,this.push=function(d){if(d.type==="metadata"){this.trigger("data",d);return}this.type_!==ph&&d.type!==this.type_||(c===void 0&&(c=d.dts),d.dts=ml(d.dts,c),d.pts=ml(d.pts,c),u=d.dts,this.trigger("data",d))},this.flush=function(){c=u,this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")},this.discontinuity=function(){c=void 0,u=void 0},this.reset=function(){this.discontinuity(),this.trigger("reset")}};gl.prototype=new Cv;var mh={TimestampRolloverStream:gl,handleRollover:ml},jv=(o,u,c)=>{if(!o)return-1;for(var d=c;d<o.length;d++)if(o[d]===u)return d;return-1},wv={typedArrayIndexOf:jv},va=wv.typedArrayIndexOf,Aa={Iso88591:0,Utf16:1,Utf16be:2,Utf8:3},gh=function(o,u,c){var d,f="";for(d=u;d<c;d++)f+="%"+("00"+o[d].toString(16)).slice(-2);return f},Ws=function(o,u,c){return decodeURIComponent(gh(o,u,c))},$s=function(o,u,c){return unescape(gh(o,u,c))},Gs=function(o){return o[0]<<21|o[1]<<14|o[2]<<7|o[3]},Ys={APIC:function(o){var u=1,c,d,f="-->";o.data[0]===Aa.Utf8&&(c=va(o.data,0,u),!(c<0)&&(o.mimeType=$s(o.data,u,c),u=c+1,o.pictureType=o.data[u],u++,d=va(o.data,0,u),!(d<0)&&(o.description=Ws(o.data,u,d),u=d+1,o.mimeType===f?o.url=$s(o.data,u,o.data.length):o.pictureData=o.data.subarray(u,o.data.length))))},"T*":function(o){o.data[0]===Aa.Utf8&&(o.value=Ws(o.data,1,o.data.length).replace(/\0*$/,""),o.values=o.value.split("\0"))},TXXX:function(o){var u;o.data[0]===Aa.Utf8&&(u=va(o.data,0,1),u!==-1&&(o.description=Ws(o.data,1,u),o.value=Ws(o.data,u+1,o.data.length).replace(/\0*$/,""),o.data=o.value))},"W*":function(o){o.url=$s(o.data,0,o.data.length).replace(/\0.*$/,"")},WXXX:function(o){var u;o.data[0]===Aa.Utf8&&(u=va(o.data,0,1),u!==-1&&(o.description=Ws(o.data,1,u),o.url=$s(o.data,u+1,o.data.length).replace(/\0.*$/,"")))},PRIV:function(o){var u;for(u=0;u<o.data.length;u++)if(o.data[u]===0){o.owner=$s(o.data,0,u);break}o.privateData=o.data.subarray(u+1),o.data=o.privateData}},Bv=function(o){var u,c,d=10,f=0,m=[];if(!(o.length<10||o[0]!==73||o[1]!==68||o[2]!==51)){f=Gs(o.subarray(6,10)),f+=10;var _=o[5]&64;_&&(d+=4,d+=Gs(o.subarray(10,14)),f-=Gs(o.subarray(16,20)));do{if(u=Gs(o.subarray(d+4,d+8)),u<1)break;c=String.fromCharCode(o[d],o[d+1],o[d+2],o[d+3]);var T={id:c,data:o.subarray(d+10,d+u+10)};T.key=T.id,Ys[T.id]?Ys[T.id](T):T.id[0]==="T"?Ys["T*"](T):T.id[0]==="W"&&Ys["W*"](T),m.push(T),d+=10,d+=u}while(d<f);return m}},vh={parseId3Frames:Bv,parseSyncSafeInteger:Gs,frameParsers:Ys},Dv=t,kv=ga,rn=vh,ya;ya=function(o){var u={descriptor:o&&o.descriptor},c=0,d=[],f=0,m;if(ya.prototype.init.call(this),this.dispatchType=kv.METADATA_STREAM_TYPE.toString(16),u.descriptor)for(m=0;m<u.descriptor.length;m++)this.dispatchType+=("00"+u.descriptor[m].toString(16)).slice(-2);this.push=function(_){var T,x,j,k,z,de;if(_.type==="timed-metadata"){if(_.dataAlignmentIndicator&&(f=0,d.length=0),d.length===0&&(_.data.length<10||_.data[0]!==73||_.data[1]!==68||_.data[2]!==51)){this.trigger("log",{level:"warn",message:"Skipping unrecognized metadata packet"});return}if(d.push(_),f+=_.data.byteLength,d.length===1&&(c=rn.parseSyncSafeInteger(_.data.subarray(6,10)),c+=10),!(f<c)){for(T={data:new Uint8Array(c),frames:[],pts:d[0].pts,dts:d[0].dts},z=0;z<c;)T.data.set(d[0].data.subarray(0,c-z),z),z+=d[0].data.byteLength,f-=d[0].data.byteLength,d.shift();x=10,T.data[5]&64&&(x+=4,x+=rn.parseSyncSafeInteger(T.data.subarray(10,14)),c-=rn.parseSyncSafeInteger(T.data.subarray(16,20)));do{if(j=rn.parseSyncSafeInteger(T.data.subarray(x+4,x+8)),j<1){this.trigger("log",{level:"warn",message:"Malformed ID3 frame encountered. Skipping remaining metadata parsing."});break}if(de=String.fromCharCode(T.data[x],T.data[x+1],T.data[x+2],T.data[x+3]),k={id:de,data:T.data.subarray(x+10,x+j+10)},k.key=k.id,rn.frameParsers[k.id]?rn.frameParsers[k.id](k):k.id[0]==="T"?rn.frameParsers["T*"](k):k.id[0]==="W"&&rn.frameParsers["W*"](k),k.owner==="com.apple.streaming.transportStreamTimestamp"){var X=k.data,Be=(X[3]&1)<<30|X[4]<<22|X[5]<<14|X[6]<<6|X[7]>>>2;Be*=4,Be+=X[7]&3,k.timeStamp=Be,T.pts===void 0&&T.dts===void 0&&(T.pts=k.timeStamp,T.dts=k.timeStamp),this.trigger("timestamp",k)}T.frames.push(k),x+=10,x+=j}while(x<c);this.trigger("data",T)}}}},ya.prototype=new Dv;var Iv=ya,vl=t,Al=fh,vi=ga,Pv=mh.TimestampRolloverStream,_a,Xs,ba,os=188,yl=71;_a=function(){var o=new Uint8Array(os),u=0;_a.prototype.init.call(this),this.push=function(c){var d=0,f=os,m;for(u?(m=new Uint8Array(c.byteLength+u),m.set(o.subarray(0,u)),m.set(c,u),u=0):m=c;f<m.byteLength;){if(m[d]===yl&&m[f]===yl){this.trigger("data",m.subarray(d,f)),d+=os,f+=os;continue}d++,f++}d<m.byteLength&&(o.set(m.subarray(d),0),u=m.byteLength-d)},this.flush=function(){u===os&&o[0]===yl&&(this.trigger("data",o),u=0),this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")},this.reset=function(){u=0,this.trigger("reset")}},_a.prototype=new vl,Xs=function(){var o,u,c,d;Xs.prototype.init.call(this),d=this,this.packetsWaitingForPmt=[],this.programMapTable=void 0,o=function(f,m){var _=0;m.payloadUnitStartIndicator&&(_+=f[_]+1),m.type==="pat"?u(f.subarray(_),m):c(f.subarray(_),m)},u=function(f,m){m.section_number=f[7],m.last_section_number=f[8],d.pmtPid=(f[10]&31)<<8|f[11],m.pmtPid=d.pmtPid},c=function(f,m){var _,T,x,j;if(f[5]&1){for(d.programMapTable={video:null,audio:null,"timed-metadata":{}},_=(f[1]&15)<<8|f[2],T=3+_-4,x=(f[10]&15)<<8|f[11],j=12+x;j<T;){var k=f[j],z=(f[j+1]&31)<<8|f[j+2];k===vi.H264_STREAM_TYPE&&d.programMapTable.video===null?d.programMapTable.video=z:k===vi.ADTS_STREAM_TYPE&&d.programMapTable.audio===null?d.programMapTable.audio=z:k===vi.METADATA_STREAM_TYPE&&(d.programMapTable["timed-metadata"][z]=k),j+=((f[j+3]&15)<<8|f[j+4])+5}m.programMapTable=d.programMapTable}},this.push=function(f){var m={},_=4;if(m.payloadUnitStartIndicator=!!(f[1]&64),m.pid=f[1]&31,m.pid<<=8,m.pid|=f[2],(f[3]&48)>>>4>1&&(_+=f[_]+1),m.pid===0)m.type="pat",o(f.subarray(_),m),this.trigger("data",m);else if(m.pid===this.pmtPid)for(m.type="pmt",o(f.subarray(_),m),this.trigger("data",m);this.packetsWaitingForPmt.length;)this.processPes_.apply(this,this.packetsWaitingForPmt.shift());else this.programMapTable===void 0?this.packetsWaitingForPmt.push([f,_,m]):this.processPes_(f,_,m)},this.processPes_=function(f,m,_){_.pid===this.programMapTable.video?_.streamType=vi.H264_STREAM_TYPE:_.pid===this.programMapTable.audio?_.streamType=vi.ADTS_STREAM_TYPE:_.streamType=this.programMapTable["timed-metadata"][_.pid],_.type="pes",_.data=f.subarray(m),this.trigger("data",_)}},Xs.prototype=new vl,Xs.STREAM_TYPES={h264:27,adts:15},ba=function(){var o=this,u=!1,c={data:[],size:0},d={data:[],size:0},f={data:[],size:0},m,_=function(x,j){var k;const z=x[0]<<16|x[1]<<8|x[2];j.data=new Uint8Array,z===1&&(j.packetLength=6+(x[4]<<8|x[5]),j.dataAlignmentIndicator=(x[6]&4)!==0,k=x[7],k&192&&(j.pts=(x[9]&14)<<27|(x[10]&255)<<20|(x[11]&254)<<12|(x[12]&255)<<5|(x[13]&254)>>>3,j.pts*=4,j.pts+=(x[13]&6)>>>1,j.dts=j.pts,k&64&&(j.dts=(x[14]&14)<<27|(x[15]&255)<<20|(x[16]&254)<<12|(x[17]&255)<<5|(x[18]&254)>>>3,j.dts*=4,j.dts+=(x[18]&6)>>>1)),j.data=x.subarray(9+x[8]))},T=function(x,j,k){var z=new Uint8Array(x.size),de={type:j},X=0,Be=0,Ne=!1,Bt;if(!(!x.data.length||x.size<9)){for(de.trackId=x.data[0].pid,X=0;X<x.data.length;X++)Bt=x.data[X],z.set(Bt.data,Be),Be+=Bt.data.byteLength;_(z,de),Ne=j==="video"||de.packetLength<=x.size,(k||Ne)&&(x.size=0,x.data.length=0),Ne&&o.trigger("data",de)}};ba.prototype.init.call(this),this.push=function(x){({pat:function(){},pes:function(){var j,k;switch(x.streamType){case vi.H264_STREAM_TYPE:j=c,k="video";break;case vi.ADTS_STREAM_TYPE:j=d,k="audio";break;case vi.METADATA_STREAM_TYPE:j=f,k="timed-metadata";break;default:return}x.payloadUnitStartIndicator&&T(j,k,!0),j.data.push(x),j.size+=x.data.byteLength},pmt:function(){var j={type:"metadata",tracks:[]};m=x.programMapTable,m.video!==null&&j.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+m.video,codec:"avc",type:"video"}),m.audio!==null&&j.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+m.audio,codec:"adts",type:"audio"}),u=!0,o.trigger("data",j)}})[x.type]()},this.reset=function(){c.size=0,c.data.length=0,d.size=0,d.data.length=0,this.trigger("reset")},this.flushStreams_=function(){T(c,"video"),T(d,"audio"),T(f,"timed-metadata")},this.flush=function(){if(!u&&m){var x={type:"metadata",tracks:[]};m.video!==null&&x.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+m.video,codec:"avc",type:"video"}),m.audio!==null&&x.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+m.audio,codec:"adts",type:"audio"}),o.trigger("data",x)}u=!1,this.flushStreams_(),this.trigger("done")}},ba.prototype=new vl;var Ah={PAT_PID:0,MP2T_PACKET_LENGTH:os,TransportPacketStream:_a,TransportParseStream:Xs,ElementaryStream:ba,TimestampRolloverStream:Pv,CaptionStream:Al.CaptionStream,Cea608Stream:Al.Cea608Stream,Cea708Stream:Al.Cea708Stream,MetadataStream:Iv};for(var _l in vi)vi.hasOwnProperty(_l)&&(Ah[_l]=vi[_l]);var Ov=Ah,Lv=t,Rv=ot.ONE_SECOND_IN_TS,Ea,yh=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];Ea=function(o){var u,c=0;Ea.prototype.init.call(this),this.skipWarn_=function(d,f){this.trigger("log",{level:"warn",message:`adts skiping bytes ${d} to ${f} in frame ${c} outside syncword`})},this.push=function(d){var f=0,m,_,T,x,j;if(o||(c=0),d.type==="audio"){u&&u.length?(T=u,u=new Uint8Array(T.byteLength+d.data.byteLength),u.set(T),u.set(d.data,T.byteLength)):u=d.data;for(var k;f+7<u.length;){if(u[f]!==255||(u[f+1]&246)!==240){typeof k!="number"&&(k=f),f++;continue}if(typeof k=="number"&&(this.skipWarn_(k,f),k=null),_=(~u[f+1]&1)*2,m=(u[f+3]&3)<<11|u[f+4]<<3|(u[f+5]&224)>>5,x=((u[f+6]&3)+1)*1024,j=x*Rv/yh[(u[f+2]&60)>>>2],u.byteLength-f<m)break;this.trigger("data",{pts:d.pts+c*j,dts:d.dts+c*j,sampleCount:x,audioobjecttype:(u[f+2]>>>6&3)+1,channelcount:(u[f+2]&1)<<2|(u[f+3]&192)>>>6,samplerate:yh[(u[f+2]&60)>>>2],samplingfrequencyindex:(u[f+2]&60)>>>2,samplesize:16,data:u.subarray(f+7+_,f+m)}),c++,f+=m}typeof k=="number"&&(this.skipWarn_(k,f),k=null),u=u.subarray(f)}},this.flush=function(){c=0,this.trigger("done")},this.reset=function(){u=void 0,this.trigger("reset")},this.endTimeline=function(){u=void 0,this.trigger("endedtimeline")}},Ea.prototype=new Lv;var Mv=Ea,_h;_h=function(o){var u=o.byteLength,c=0,d=0;this.length=function(){return 8*u},this.bitsAvailable=function(){return 8*u+d},this.loadWord=function(){var f=o.byteLength-u,m=new Uint8Array(4),_=Math.min(4,u);if(_===0)throw new Error("no bytes available");m.set(o.subarray(f,f+_)),c=new DataView(m.buffer).getUint32(0),d=_*8,u-=_},this.skipBits=function(f){var m;d>f?(c<<=f,d-=f):(f-=d,m=Math.floor(f/8),f-=m*8,u-=m,this.loadWord(),c<<=f,d-=f)},this.readBits=function(f){var m=Math.min(d,f),_=c>>>32-m;return d-=m,d>0?c<<=m:u>0&&this.loadWord(),m=f-m,m>0?_<<m|this.readBits(m):_},this.skipLeadingZeros=function(){var f;for(f=0;f<d;++f)if(c&2147483648>>>f)return c<<=f,d-=f,f;return this.loadWord(),f+this.skipLeadingZeros()},this.skipUnsignedExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.skipExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.readUnsignedExpGolomb=function(){var f=this.skipLeadingZeros();return this.readBits(f+1)-1},this.readExpGolomb=function(){var f=this.readUnsignedExpGolomb();return 1&f?1+f>>>1:-1*(f>>>1)},this.readBoolean=function(){return this.readBits(1)===1},this.readUnsignedByte=function(){return this.readBits(8)},this.loadWord()};var Nv=_h,bh=t,Uv=Nv,Ta,Ks,Eh;Ks=function(){var o=0,u,c;Ks.prototype.init.call(this),this.push=function(d){var f;c?(f=new Uint8Array(c.byteLength+d.data.byteLength),f.set(c),f.set(d.data,c.byteLength),c=f):c=d.data;for(var m=c.byteLength;o<m-3;o++)if(c[o+2]===1){u=o+5;break}for(;u<m;)switch(c[u]){case 0:if(c[u-1]!==0){u+=2;break}else if(c[u-2]!==0){u++;break}o+3!==u-2&&this.trigger("data",c.subarray(o+3,u-2));do u++;while(c[u]!==1&&u<m);o=u-2,u+=3;break;case 1:if(c[u-1]!==0||c[u-2]!==0){u+=3;break}this.trigger("data",c.subarray(o+3,u-2)),o=u-2,u+=3;break;default:u+=3;break}c=c.subarray(o),u-=o,o=0},this.reset=function(){c=null,o=0,this.trigger("reset")},this.flush=function(){c&&c.byteLength>3&&this.trigger("data",c.subarray(o+3)),c=null,o=0,this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")}},Ks.prototype=new bh,Eh={100:!0,110:!0,122:!0,244:!0,44:!0,83:!0,86:!0,118:!0,128:!0,138:!0,139:!0,134:!0},Ta=function(){var o=new Ks,u,c,d,f,m,_,T;Ta.prototype.init.call(this),u=this,this.push=function(x){x.type==="video"&&(c=x.trackId,d=x.pts,f=x.dts,o.push(x))},o.on("data",function(x){var j={trackId:c,pts:d,dts:f,data:x,nalUnitTypeCode:x[0]&31};switch(j.nalUnitTypeCode){case 5:j.nalUnitType="slice_layer_without_partitioning_rbsp_idr";break;case 6:j.nalUnitType="sei_rbsp",j.escapedRBSP=m(x.subarray(1));break;case 7:j.nalUnitType="seq_parameter_set_rbsp",j.escapedRBSP=m(x.subarray(1)),j.config=_(j.escapedRBSP);break;case 8:j.nalUnitType="pic_parameter_set_rbsp";break;case 9:j.nalUnitType="access_unit_delimiter_rbsp";break}u.trigger("data",j)}),o.on("done",function(){u.trigger("done")}),o.on("partialdone",function(){u.trigger("partialdone")}),o.on("reset",function(){u.trigger("reset")}),o.on("endedtimeline",function(){u.trigger("endedtimeline")}),this.flush=function(){o.flush()},this.partialFlush=function(){o.partialFlush()},this.reset=function(){o.reset()},this.endTimeline=function(){o.endTimeline()},T=function(x,j){var k=8,z=8,de,X;for(de=0;de<x;de++)z!==0&&(X=j.readExpGolomb(),z=(k+X+256)%256),k=z===0?k:z},m=function(x){for(var j=x.byteLength,k=[],z=1,de,X;z<j-2;)x[z]===0&&x[z+1]===0&&x[z+2]===3?(k.push(z+2),z+=2):z++;if(k.length===0)return x;de=j-k.length,X=new Uint8Array(de);var Be=0;for(z=0;z<de;Be++,z++)Be===k[0]&&(Be++,k.shift()),X[z]=x[Be];return X},_=function(x){var j=0,k=0,z=0,de=0,X,Be,Ne,Bt,Zt,ln,sr,rr,ar,or,La,lt=[1,1],lr,yi;if(X=new Uv(x),Be=X.readUnsignedByte(),Bt=X.readUnsignedByte(),Ne=X.readUnsignedByte(),X.skipUnsignedExpGolomb(),Eh[Be]&&(Zt=X.readUnsignedExpGolomb(),Zt===3&&X.skipBits(1),X.skipUnsignedExpGolomb(),X.skipUnsignedExpGolomb(),X.skipBits(1),X.readBoolean()))for(La=Zt!==3?8:12,yi=0;yi<La;yi++)X.readBoolean()&&(yi<6?T(16,X):T(64,X));if(X.skipUnsignedExpGolomb(),ln=X.readUnsignedExpGolomb(),ln===0)X.readUnsignedExpGolomb();else if(ln===1)for(X.skipBits(1),X.skipExpGolomb(),X.skipExpGolomb(),sr=X.readUnsignedExpGolomb(),yi=0;yi<sr;yi++)X.skipExpGolomb();if(X.skipUnsignedExpGolomb(),X.skipBits(1),rr=X.readUnsignedExpGolomb(),ar=X.readUnsignedExpGolomb(),or=X.readBits(1),or===0&&X.skipBits(1),X.skipBits(1),X.readBoolean()&&(j=X.readUnsignedExpGolomb(),k=X.readUnsignedExpGolomb(),z=X.readUnsignedExpGolomb(),de=X.readUnsignedExpGolomb()),X.readBoolean()&&X.readBoolean()){switch(lr=X.readUnsignedByte(),lr){case 1:lt=[1,1];break;case 2:lt=[12,11];break;case 3:lt=[10,11];break;case 4:lt=[16,11];break;case 5:lt=[40,33];break;case 6:lt=[24,11];break;case 7:lt=[20,11];break;case 8:lt=[32,11];break;case 9:lt=[80,33];break;case 10:lt=[18,11];break;case 11:lt=[15,11];break;case 12:lt=[64,33];break;case 13:lt=[160,99];break;case 14:lt=[4,3];break;case 15:lt=[3,2];break;case 16:lt=[2,1];break;case 255:{lt=[X.readUnsignedByte()<<8|X.readUnsignedByte(),X.readUnsignedByte()<<8|X.readUnsignedByte()];break}}lt&&lt[0]/lt[1]}return{profileIdc:Be,levelIdc:Ne,profileCompatibility:Bt,width:(rr+1)*16-j*2-k*2,height:(2-or)*(ar+1)*16-z*2-de*2,sarRatio:lt}}},Ta.prototype=new bh;var Fv={H264Stream:Ta,NalByteStream:Ks},Vv=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],Th=function(o,u){var c=o[u+6]<<21|o[u+7]<<14|o[u+8]<<7|o[u+9],d=o[u+5],f=(d&16)>>4;return c=c>=0?c:0,f?c+20:c+10},Ch=function(o,u){return o.length-u<10||o[u]!==73||o[u+1]!==68||o[u+2]!==51?u:(u+=Th(o,u),Ch(o,u))},zv=function(o){var u=Ch(o,0);return o.length>=u+2&&(o[u]&255)===255&&(o[u+1]&240)===240&&(o[u+1]&22)===16},xh=function(o){return o[0]<<21|o[1]<<14|o[2]<<7|o[3]},Hv=function(o,u,c){var d,f="";for(d=u;d<c;d++)f+="%"+("00"+o[d].toString(16)).slice(-2);return f},qv=function(o,u,c){return unescape(Hv(o,u,c))},Wv=function(o,u){var c=(o[u+5]&224)>>5,d=o[u+4]<<3,f=o[u+3]&6144;return f|d|c},$v=function(o,u){return o[u]===73&&o[u+1]===68&&o[u+2]===51?"timed-metadata":o[u]&!0&&(o[u+1]&240)===240?"audio":null},Gv=function(o){for(var u=0;u+5<o.length;){if(o[u]!==255||(o[u+1]&246)!==240){u++;continue}return Vv[(o[u+2]&60)>>>2]}return null},Yv=function(o){var u,c,d,f;u=10,o[5]&64&&(u+=4,u+=xh(o.subarray(10,14)));do{if(c=xh(o.subarray(u+4,u+8)),c<1)return null;if(f=String.fromCharCode(o[u],o[u+1],o[u+2],o[u+3]),f==="PRIV"){d=o.subarray(u+10,u+c+10);for(var m=0;m<d.byteLength;m++)if(d[m]===0){var _=qv(d,0,m);if(_==="com.apple.streaming.transportStreamTimestamp"){var T=d.subarray(m+1),x=(T[3]&1)<<30|T[4]<<22|T[5]<<14|T[6]<<6|T[7]>>>2;return x*=4,x+=T[7]&3,x}break}}u+=10,u+=c}while(u<o.byteLength);return null},bl={isLikelyAacData:zv,parseId3TagSize:Th,parseAdtsSize:Wv,parseType:$v,parseSampleRate:Gv,parseAacTimestamp:Yv},Xv=t,Sh=bl,Ca;Ca=function(){var o=new Uint8Array,u=0;Ca.prototype.init.call(this),this.setTimestamp=function(c){u=c},this.push=function(c){var d=0,f=0,m,_,T,x;for(o.length?(x=o.length,o=new Uint8Array(c.byteLength+x),o.set(o.subarray(0,x)),o.set(c,x)):o=c;o.length-f>=3;){if(o[f]===73&&o[f+1]===68&&o[f+2]===51){if(o.length-f<10||(d=Sh.parseId3TagSize(o,f),f+d>o.length))break;_={type:"timed-metadata",data:o.subarray(f,f+d)},this.trigger("data",_),f+=d;continue}else if((o[f]&255)===255&&(o[f+1]&240)===240){if(o.length-f<7||(d=Sh.parseAdtsSize(o,f),f+d>o.length))break;T={type:"audio",data:o.subarray(f,f+d),pts:u,dts:u},this.trigger("data",T),f+=d;continue}f++}m=o.length-f,m>0?o=o.subarray(f):o=new Uint8Array},this.reset=function(){o=new Uint8Array,this.trigger("reset")},this.endTimeline=function(){o=new Uint8Array,this.trigger("endedtimeline")}},Ca.prototype=new Xv;var Kv=Ca,Qv=["audioobjecttype","channelcount","samplerate","samplingfrequencyindex","samplesize"],Jv=Qv,Zv=["width","height","profileIdc","levelIdc","profileCompatibility","sarRatio"],eA=Zv,xa=t,Qs=W0,Js=ev,Sa=uv,Ai=pv,Wi=Ov,ja=ot,jh=Mv,tA=Fv.H264Stream,iA=Kv,nA=bl.isLikelyAacData,sA=ot.ONE_SECOND_IN_TS,El=Jv,Tl=eA,Zs,ls,wa,wn,rA=function(o,u){u.stream=o,this.trigger("log",u)},wh=function(o,u){for(var c=Object.keys(u),d=0;d<c.length;d++){var f=c[d];f==="headOfPipeline"||!u[f].on||u[f].on("log",rA.bind(o,f))}},Bh=function(o,u){var c;if(o.length!==u.length)return!1;for(c=0;c<o.length;c++)if(o[c]!==u[c])return!1;return!0},Cl=function(o,u,c,d,f,m){var _=c-u,T=d-u,x=f-c;return{start:{dts:o,pts:o+_},end:{dts:o+T,pts:o+x},prependedContentDuration:m,baseMediaDecodeTime:o}};ls=function(o,u){var c=[],d,f=0,m=0,_=1/0;u=u||{},d=u.firstSequenceNumber||0,ls.prototype.init.call(this),this.push=function(T){Ai.collectDtsInfo(o,T),o&&El.forEach(function(x){o[x]=T[x]}),c.push(T)},this.setEarliestDts=function(T){f=T},this.setVideoBaseMediaDecodeTime=function(T){_=T},this.setAudioAppendStart=function(T){m=T},this.flush=function(){var T,x,j,k,z,de,X;if(c.length===0){this.trigger("done","AudioSegmentStream");return}T=Sa.trimAdtsFramesByEarliestDts(c,o,f),o.baseMediaDecodeTime=Ai.calculateTrackBaseMediaDecodeTime(o,u.keepOriginalTimestamps),X=Sa.prefixWithSilence(o,T,m,_),o.samples=Sa.generateSampleTable(T),j=Qs.mdat(Sa.concatenateFrameData(T)),c=[],x=Qs.moof(d,[o]),k=new Uint8Array(x.byteLength+j.byteLength),d++,k.set(x),k.set(j,x.byteLength),Ai.clearDtsInfo(o),z=Math.ceil(sA*1024/o.samplerate),T.length&&(de=T.length*z,this.trigger("segmentTimingInfo",Cl(ja.audioTsToVideoTs(o.baseMediaDecodeTime,o.samplerate),T[0].dts,T[0].pts,T[0].dts+de,T[0].pts+de,X||0)),this.trigger("timingInfo",{start:T[0].pts,end:T[0].pts+de})),this.trigger("data",{track:o,boxes:k}),this.trigger("done","AudioSegmentStream")},this.reset=function(){Ai.clearDtsInfo(o),c=[],this.trigger("reset")}},ls.prototype=new xa,Zs=function(o,u){var c,d=[],f=[],m,_;u=u||{},c=u.firstSequenceNumber||0,Zs.prototype.init.call(this),delete o.minPTS,this.gopCache_=[],this.push=function(T){Ai.collectDtsInfo(o,T),T.nalUnitType==="seq_parameter_set_rbsp"&&!m&&(m=T.config,o.sps=[T.data],Tl.forEach(function(x){o[x]=m[x]},this)),T.nalUnitType==="pic_parameter_set_rbsp"&&!_&&(_=T.data,o.pps=[T.data]),d.push(T)},this.flush=function(){for(var T,x,j,k,z,de,X=0,Be,Ne;d.length&&d[0].nalUnitType!=="access_unit_delimiter_rbsp";)d.shift();if(d.length===0){this.resetStream_(),this.trigger("done","VideoSegmentStream");return}if(T=Js.groupNalsIntoFrames(d),j=Js.groupFramesIntoGops(T),j[0][0].keyFrame||(x=this.getGopForFusion_(d[0],o),x?(X=x.duration,j.unshift(x),j.byteLength+=x.byteLength,j.nalCount+=x.nalCount,j.pts=x.pts,j.dts=x.dts,j.duration+=x.duration):j=Js.extendFirstKeyFrame(j)),f.length){var Bt;if(u.alignGopsAtEnd?Bt=this.alignGopsAtEnd_(j):Bt=this.alignGopsAtStart_(j),!Bt){this.gopCache_.unshift({gop:j.pop(),pps:o.pps,sps:o.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),d=[],this.resetStream_(),this.trigger("done","VideoSegmentStream");return}Ai.clearDtsInfo(o),j=Bt}Ai.collectDtsInfo(o,j),o.samples=Js.generateSampleTable(j),z=Qs.mdat(Js.concatenateNalData(j)),o.baseMediaDecodeTime=Ai.calculateTrackBaseMediaDecodeTime(o,u.keepOriginalTimestamps),this.trigger("processedGopsInfo",j.map(function(Zt){return{pts:Zt.pts,dts:Zt.dts,byteLength:Zt.byteLength}})),Be=j[0],Ne=j[j.length-1],this.trigger("segmentTimingInfo",Cl(o.baseMediaDecodeTime,Be.dts,Be.pts,Ne.dts+Ne.duration,Ne.pts+Ne.duration,X)),this.trigger("timingInfo",{start:j[0].pts,end:j[j.length-1].pts+j[j.length-1].duration}),this.gopCache_.unshift({gop:j.pop(),pps:o.pps,sps:o.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),d=[],this.trigger("baseMediaDecodeTime",o.baseMediaDecodeTime),this.trigger("timelineStartInfo",o.timelineStartInfo),k=Qs.moof(c,[o]),de=new Uint8Array(k.byteLength+z.byteLength),c++,de.set(k),de.set(z,k.byteLength),this.trigger("data",{track:o,boxes:de}),this.resetStream_(),this.trigger("done","VideoSegmentStream")},this.reset=function(){this.resetStream_(),d=[],this.gopCache_.length=0,f.length=0,this.trigger("reset")},this.resetStream_=function(){Ai.clearDtsInfo(o),m=void 0,_=void 0},this.getGopForFusion_=function(T){var x=45e3,j=1e4,k=1/0,z,de,X,Be,Ne;for(Ne=0;Ne<this.gopCache_.length;Ne++)Be=this.gopCache_[Ne],X=Be.gop,!(!(o.pps&&Bh(o.pps[0],Be.pps[0]))||!(o.sps&&Bh(o.sps[0],Be.sps[0])))&&(X.dts<o.timelineStartInfo.dts||(z=T.dts-X.dts-X.duration,z>=-j&&z<=x&&(!de||k>z)&&(de=Be,k=z)));return de?de.gop:null},this.alignGopsAtStart_=function(T){var x,j,k,z,de,X,Be,Ne;for(de=T.byteLength,X=T.nalCount,Be=T.duration,x=j=0;x<f.length&&j<T.length&&(k=f[x],z=T[j],k.pts!==z.pts);){if(z.pts>k.pts){x++;continue}j++,de-=z.byteLength,X-=z.nalCount,Be-=z.duration}return j===0?T:j===T.length?null:(Ne=T.slice(j),Ne.byteLength=de,Ne.duration=Be,Ne.nalCount=X,Ne.pts=Ne[0].pts,Ne.dts=Ne[0].dts,Ne)},this.alignGopsAtEnd_=function(T){var x,j,k,z,de,X;for(x=f.length-1,j=T.length-1,de=null,X=!1;x>=0&&j>=0;){if(k=f[x],z=T[j],k.pts===z.pts){X=!0;break}if(k.pts>z.pts){x--;continue}x===f.length-1&&(de=j),j--}if(!X&&de===null)return null;var Be;if(X?Be=j:Be=de,Be===0)return T;var Ne=T.slice(Be),Bt=Ne.reduce(function(Zt,ln){return Zt.byteLength+=ln.byteLength,Zt.duration+=ln.duration,Zt.nalCount+=ln.nalCount,Zt},{byteLength:0,duration:0,nalCount:0});return Ne.byteLength=Bt.byteLength,Ne.duration=Bt.duration,Ne.nalCount=Bt.nalCount,Ne.pts=Ne[0].pts,Ne.dts=Ne[0].dts,Ne},this.alignGopsWith=function(T){f=T}},Zs.prototype=new xa,wn=function(o,u){this.numberOfTracks=0,this.metadataStream=u,o=o||{},typeof o.remux!="undefined"?this.remuxTracks=!!o.remux:this.remuxTracks=!0,typeof o.keepOriginalTimestamps=="boolean"?this.keepOriginalTimestamps=o.keepOriginalTimestamps:this.keepOriginalTimestamps=!1,this.pendingTracks=[],this.videoTrack=null,this.pendingBoxes=[],this.pendingCaptions=[],this.pendingMetadata=[],this.pendingBytes=0,this.emittedTracks=0,wn.prototype.init.call(this),this.push=function(c){if(c.content||c.text)return this.pendingCaptions.push(c);if(c.frames)return this.pendingMetadata.push(c);this.pendingTracks.push(c.track),this.pendingBytes+=c.boxes.byteLength,c.track.type==="video"&&(this.videoTrack=c.track,this.pendingBoxes.push(c.boxes)),c.track.type==="audio"&&(this.audioTrack=c.track,this.pendingBoxes.unshift(c.boxes))}},wn.prototype=new xa,wn.prototype.flush=function(o){var u=0,c={captions:[],captionStreams:{},metadata:[],info:{}},d,f,m,_=0,T;if(this.pendingTracks.length<this.numberOfTracks){if(o!=="VideoSegmentStream"&&o!=="AudioSegmentStream")return;if(this.remuxTracks)return;if(this.pendingTracks.length===0){this.emittedTracks++,this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0);return}}if(this.videoTrack?(_=this.videoTrack.timelineStartInfo.pts,Tl.forEach(function(x){c.info[x]=this.videoTrack[x]},this)):this.audioTrack&&(_=this.audioTrack.timelineStartInfo.pts,El.forEach(function(x){c.info[x]=this.audioTrack[x]},this)),this.videoTrack||this.audioTrack){for(this.pendingTracks.length===1?c.type=this.pendingTracks[0].type:c.type="combined",this.emittedTracks+=this.pendingTracks.length,m=Qs.initSegment(this.pendingTracks),c.initSegment=new Uint8Array(m.byteLength),c.initSegment.set(m),c.data=new Uint8Array(this.pendingBytes),T=0;T<this.pendingBoxes.length;T++)c.data.set(this.pendingBoxes[T],u),u+=this.pendingBoxes[T].byteLength;for(T=0;T<this.pendingCaptions.length;T++)d=this.pendingCaptions[T],d.startTime=ja.metadataTsToSeconds(d.startPts,_,this.keepOriginalTimestamps),d.endTime=ja.metadataTsToSeconds(d.endPts,_,this.keepOriginalTimestamps),c.captionStreams[d.stream]=!0,c.captions.push(d);for(T=0;T<this.pendingMetadata.length;T++)f=this.pendingMetadata[T],f.cueTime=ja.metadataTsToSeconds(f.pts,_,this.keepOriginalTimestamps),c.metadata.push(f);for(c.metadata.dispatchType=this.metadataStream.dispatchType,this.pendingTracks.length=0,this.videoTrack=null,this.pendingBoxes.length=0,this.pendingCaptions.length=0,this.pendingBytes=0,this.pendingMetadata.length=0,this.trigger("data",c),T=0;T<c.captions.length;T++)d=c.captions[T],this.trigger("caption",d);for(T=0;T<c.metadata.length;T++)f=c.metadata[T],this.trigger("id3Frame",f)}this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0)},wn.prototype.setRemux=function(o){this.remuxTracks=o},wa=function(o){var u=this,c=!0,d,f;wa.prototype.init.call(this),o=o||{},this.baseMediaDecodeTime=o.baseMediaDecodeTime||0,this.transmuxPipeline_={},this.setupAacPipeline=function(){var m={};this.transmuxPipeline_=m,m.type="aac",m.metadataStream=new Wi.MetadataStream,m.aacStream=new iA,m.audioTimestampRolloverStream=new Wi.TimestampRolloverStream("audio"),m.timedMetadataTimestampRolloverStream=new Wi.TimestampRolloverStream("timed-metadata"),m.adtsStream=new jh,m.coalesceStream=new wn(o,m.metadataStream),m.headOfPipeline=m.aacStream,m.aacStream.pipe(m.audioTimestampRolloverStream).pipe(m.adtsStream),m.aacStream.pipe(m.timedMetadataTimestampRolloverStream).pipe(m.metadataStream).pipe(m.coalesceStream),m.metadataStream.on("timestamp",function(_){m.aacStream.setTimestamp(_.timeStamp)}),m.aacStream.on("data",function(_){_.type!=="timed-metadata"&&_.type!=="audio"||m.audioSegmentStream||(f=f||{timelineStartInfo:{baseMediaDecodeTime:u.baseMediaDecodeTime},codec:"adts",type:"audio"},m.coalesceStream.numberOfTracks++,m.audioSegmentStream=new ls(f,o),m.audioSegmentStream.on("log",u.getLogTrigger_("audioSegmentStream")),m.audioSegmentStream.on("timingInfo",u.trigger.bind(u,"audioTimingInfo")),m.adtsStream.pipe(m.audioSegmentStream).pipe(m.coalesceStream),u.trigger("trackinfo",{hasAudio:!!f,hasVideo:!!d}))}),m.coalesceStream.on("data",this.trigger.bind(this,"data")),m.coalesceStream.on("done",this.trigger.bind(this,"done")),wh(this,m)},this.setupTsPipeline=function(){var m={};this.transmuxPipeline_=m,m.type="ts",m.metadataStream=new Wi.MetadataStream,m.packetStream=new Wi.TransportPacketStream,m.parseStream=new Wi.TransportParseStream,m.elementaryStream=new Wi.ElementaryStream,m.timestampRolloverStream=new Wi.TimestampRolloverStream,m.adtsStream=new jh,m.h264Stream=new tA,m.captionStream=new Wi.CaptionStream(o),m.coalesceStream=new wn(o,m.metadataStream),m.headOfPipeline=m.packetStream,m.packetStream.pipe(m.parseStream).pipe(m.elementaryStream).pipe(m.timestampRolloverStream),m.timestampRolloverStream.pipe(m.h264Stream),m.timestampRolloverStream.pipe(m.adtsStream),m.timestampRolloverStream.pipe(m.metadataStream).pipe(m.coalesceStream),m.h264Stream.pipe(m.captionStream).pipe(m.coalesceStream),m.elementaryStream.on("data",function(_){var T;if(_.type==="metadata"){for(T=_.tracks.length;T--;)!d&&_.tracks[T].type==="video"?(d=_.tracks[T],d.timelineStartInfo.baseMediaDecodeTime=u.baseMediaDecodeTime):!f&&_.tracks[T].type==="audio"&&(f=_.tracks[T],f.timelineStartInfo.baseMediaDecodeTime=u.baseMediaDecodeTime);d&&!m.videoSegmentStream&&(m.coalesceStream.numberOfTracks++,m.videoSegmentStream=new Zs(d,o),m.videoSegmentStream.on("log",u.getLogTrigger_("videoSegmentStream")),m.videoSegmentStream.on("timelineStartInfo",function(x){f&&!o.keepOriginalTimestamps&&(f.timelineStartInfo=x,m.audioSegmentStream.setEarliestDts(x.dts-u.baseMediaDecodeTime))}),m.videoSegmentStream.on("processedGopsInfo",u.trigger.bind(u,"gopInfo")),m.videoSegmentStream.on("segmentTimingInfo",u.trigger.bind(u,"videoSegmentTimingInfo")),m.videoSegmentStream.on("baseMediaDecodeTime",function(x){f&&m.audioSegmentStream.setVideoBaseMediaDecodeTime(x)}),m.videoSegmentStream.on("timingInfo",u.trigger.bind(u,"videoTimingInfo")),m.h264Stream.pipe(m.videoSegmentStream).pipe(m.coalesceStream)),f&&!m.audioSegmentStream&&(m.coalesceStream.numberOfTracks++,m.audioSegmentStream=new ls(f,o),m.audioSegmentStream.on("log",u.getLogTrigger_("audioSegmentStream")),m.audioSegmentStream.on("timingInfo",u.trigger.bind(u,"audioTimingInfo")),m.audioSegmentStream.on("segmentTimingInfo",u.trigger.bind(u,"audioSegmentTimingInfo")),m.adtsStream.pipe(m.audioSegmentStream).pipe(m.coalesceStream)),u.trigger("trackinfo",{hasAudio:!!f,hasVideo:!!d})}}),m.coalesceStream.on("data",this.trigger.bind(this,"data")),m.coalesceStream.on("id3Frame",function(_){_.dispatchType=m.metadataStream.dispatchType,u.trigger("id3Frame",_)}),m.coalesceStream.on("caption",this.trigger.bind(this,"caption")),m.coalesceStream.on("done",this.trigger.bind(this,"done")),wh(this,m)},this.setBaseMediaDecodeTime=function(m){var _=this.transmuxPipeline_;o.keepOriginalTimestamps||(this.baseMediaDecodeTime=m),f&&(f.timelineStartInfo.dts=void 0,f.timelineStartInfo.pts=void 0,Ai.clearDtsInfo(f),_.audioTimestampRolloverStream&&_.audioTimestampRolloverStream.discontinuity()),d&&(_.videoSegmentStream&&(_.videoSegmentStream.gopCache_=[]),d.timelineStartInfo.dts=void 0,d.timelineStartInfo.pts=void 0,Ai.clearDtsInfo(d),_.captionStream.reset()),_.timestampRolloverStream&&_.timestampRolloverStream.discontinuity()},this.setAudioAppendStart=function(m){f&&this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(m)},this.setRemux=function(m){var _=this.transmuxPipeline_;o.remux=m,_&&_.coalesceStream&&_.coalesceStream.setRemux(m)},this.alignGopsWith=function(m){d&&this.transmuxPipeline_.videoSegmentStream&&this.transmuxPipeline_.videoSegmentStream.alignGopsWith(m)},this.getLogTrigger_=function(m){var _=this;return function(T){T.stream=m,_.trigger("log",T)}},this.push=function(m){if(c){var _=nA(m);_&&this.transmuxPipeline_.type!=="aac"?this.setupAacPipeline():!_&&this.transmuxPipeline_.type!=="ts"&&this.setupTsPipeline(),c=!1}this.transmuxPipeline_.headOfPipeline.push(m)},this.flush=function(){c=!0,this.transmuxPipeline_.headOfPipeline.flush()},this.endTimeline=function(){this.transmuxPipeline_.headOfPipeline.endTimeline()},this.reset=function(){this.transmuxPipeline_.headOfPipeline&&this.transmuxPipeline_.headOfPipeline.reset()},this.resetCaptions=function(){this.transmuxPipeline_.captionStream&&this.transmuxPipeline_.captionStream.reset()}},wa.prototype=new xa;var aA={Transmuxer:wa,VideoSegmentStream:Zs,AudioSegmentStream:ls,AUDIO_PROPERTIES:El,VIDEO_PROPERTIES:Tl,generateSegmentTimingInfo:Cl},oA=function(o){return o>>>0},lA=function(o){return("00"+o.toString(16)).slice(-2)},Ba={toUnsigned:oA,toHexString:lA},uA=function(o){var u="";return u+=String.fromCharCode(o[0]),u+=String.fromCharCode(o[1]),u+=String.fromCharCode(o[2]),u+=String.fromCharCode(o[3]),u},xl=uA,cA=Ba.toUnsigned,dA=xl,Dh=function(o,u){var c=[],d,f,m,_,T;if(!u.length)return null;for(d=0;d<o.byteLength;)f=cA(o[d]<<24|o[d+1]<<16|o[d+2]<<8|o[d+3]),m=dA(o.subarray(d+4,d+8)),_=f>1?d+f:o.byteLength,m===u[0]&&(u.length===1?c.push(o.subarray(d+8,_)):(T=Dh(o.subarray(d+8,_),u.slice(1)),T.length&&(c=c.concat(T)))),d=_;return c},Da=Dh,hA=Ba.toUnsigned,fA=r.getUint64,pA=function(o){var u={version:o[0],flags:new Uint8Array(o.subarray(1,4))};return u.version===1?u.baseMediaDecodeTime=fA(o.subarray(4)):u.baseMediaDecodeTime=hA(o[4]<<24|o[5]<<16|o[6]<<8|o[7]),u},Sl=pA,mA=function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c={version:o[0],flags:new Uint8Array(o.subarray(1,4)),trackId:u.getUint32(4)},d=c.flags[2]&1,f=c.flags[2]&2,m=c.flags[2]&8,_=c.flags[2]&16,T=c.flags[2]&32,x=c.flags[0]&65536,j=c.flags[0]&131072,k;return k=8,d&&(k+=4,c.baseDataOffset=u.getUint32(12),k+=4),f&&(c.sampleDescriptionIndex=u.getUint32(k),k+=4),m&&(c.defaultSampleDuration=u.getUint32(k),k+=4),_&&(c.defaultSampleSize=u.getUint32(k),k+=4),T&&(c.defaultSampleFlags=u.getUint32(k)),x&&(c.durationIsEmpty=!0),!d&&j&&(c.baseDataOffsetIsMoof=!0),c},jl=mA,kh=r.getUint64,gA=function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c={version:o[0],flags:new Uint8Array(o.subarray(1,4)),references:[],referenceId:u.getUint32(4),timescale:u.getUint32(8)},d=12;c.version===0?(c.earliestPresentationTime=u.getUint32(d),c.firstOffset=u.getUint32(d+4),d+=8):(c.earliestPresentationTime=kh(o.subarray(d)),c.firstOffset=kh(o.subarray(d+8)),d+=16),d+=2;var f=u.getUint16(d);for(d+=2;f>0;d+=12,f--)c.references.push({referenceType:(o[d]&128)>>>7,referencedSize:u.getUint32(d)&2147483647,subsegmentDuration:u.getUint32(d+4),startsWithSap:!!(o[d+8]&128),sapType:(o[d+8]&112)>>>4,sapDeltaTime:u.getUint32(d+8)&268435455});return c},vA=gA,AA=function(o){return{isLeading:(o[0]&12)>>>2,dependsOn:o[0]&3,isDependedOn:(o[1]&192)>>>6,hasRedundancy:(o[1]&48)>>>4,paddingValue:(o[1]&14)>>>1,isNonSyncSample:o[1]&1,degradationPriority:o[2]<<8|o[3]}},yA=AA,Ih=yA,_A=function(o){var u={version:o[0],flags:new Uint8Array(o.subarray(1,4)),samples:[]},c=new DataView(o.buffer,o.byteOffset,o.byteLength),d=u.flags[2]&1,f=u.flags[2]&4,m=u.flags[1]&1,_=u.flags[1]&2,T=u.flags[1]&4,x=u.flags[1]&8,j=c.getUint32(4),k=8,z;for(d&&(u.dataOffset=c.getInt32(k),k+=4),f&&j&&(z={flags:Ih(o.subarray(k,k+4))},k+=4,m&&(z.duration=c.getUint32(k),k+=4),_&&(z.size=c.getUint32(k),k+=4),x&&(u.version===1?z.compositionTimeOffset=c.getInt32(k):z.compositionTimeOffset=c.getUint32(k),k+=4),u.samples.push(z),j--);j--;)z={},m&&(z.duration=c.getUint32(k),k+=4),_&&(z.size=c.getUint32(k),k+=4),T&&(z.flags=Ih(o.subarray(k,k+4)),k+=4),x&&(u.version===1?z.compositionTimeOffset=c.getInt32(k):z.compositionTimeOffset=c.getUint32(k),k+=4),u.samples.push(z);return u},Ph=_A,bA=r,Oh=bA.getUint64,Ot,wl,ui=function(o){return new Date(o*1e3-20828448e5)},er=xl,EA=Da,TA=function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c=[],d,f;for(d=0;d+4<o.length;d+=f){if(f=u.getUint32(d),d+=4,f<=0){c.push("<span style='color:red;'>MALFORMED DATA</span>");continue}switch(o[d]&31){case 1:c.push("slice_layer_without_partitioning_rbsp");break;case 5:c.push("slice_layer_without_partitioning_rbsp_idr");break;case 6:c.push("sei_rbsp");break;case 7:c.push("seq_parameter_set_rbsp");break;case 8:c.push("pic_parameter_set_rbsp");break;case 9:c.push("access_unit_delimiter_rbsp");break;default:c.push("UNKNOWN NAL - "+o[d]&31);break}}return c},an={avc1:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength);return{dataReferenceIndex:u.getUint16(6),width:u.getUint16(24),height:u.getUint16(26),horizresolution:u.getUint16(28)+u.getUint16(30)/16,vertresolution:u.getUint16(32)+u.getUint16(34)/16,frameCount:u.getUint16(40),depth:u.getUint16(74),config:Ot(o.subarray(78,o.byteLength))}},avcC:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c={configurationVersion:o[0],avcProfileIndication:o[1],profileCompatibility:o[2],avcLevelIndication:o[3],lengthSizeMinusOne:o[4]&3,sps:[],pps:[]},d=o[5]&31,f,m,_,T;for(_=6,T=0;T<d;T++)m=u.getUint16(_),_+=2,c.sps.push(new Uint8Array(o.subarray(_,_+m))),_+=m;for(f=o[_],_++,T=0;T<f;T++)m=u.getUint16(_),_+=2,c.pps.push(new Uint8Array(o.subarray(_,_+m))),_+=m;return c},btrt:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength);return{bufferSizeDB:u.getUint32(0),maxBitrate:u.getUint32(4),avgBitrate:u.getUint32(8)}},edts:function(u){return{boxes:Ot(u)}},elst:function(u){var c=new DataView(u.buffer,u.byteOffset,u.byteLength),d={version:c.getUint8(0),flags:new Uint8Array(u.subarray(1,4)),edits:[]},f=c.getUint32(4),m;for(m=8;f;f--)d.version===0?(d.edits.push({segmentDuration:c.getUint32(m),mediaTime:c.getInt32(m+4),mediaRate:c.getUint16(m+8)+c.getUint16(m+10)/(256*256)}),m+=12):(d.edits.push({segmentDuration:Oh(u.subarray(m)),mediaTime:Oh(u.subarray(m+8)),mediaRate:c.getUint16(m+16)+c.getUint16(m+18)/(256*256)}),m+=20);return d},esds:function(o){return{version:o[0],flags:new Uint8Array(o.subarray(1,4)),esId:o[6]<<8|o[7],streamPriority:o[8]&31,decoderConfig:{objectProfileIndication:o[11],streamType:o[12]>>>2&63,bufferSize:o[13]<<16|o[14]<<8|o[15],maxBitrate:o[16]<<24|o[17]<<16|o[18]<<8|o[19],avgBitrate:o[20]<<24|o[21]<<16|o[22]<<8|o[23],decoderConfigDescriptor:{tag:o[24],length:o[25],audioObjectType:o[26]>>>3&31,samplingFrequencyIndex:(o[26]&7)<<1|o[27]>>>7&1,channelConfiguration:o[27]>>>3&15}}}},ftyp:function(o){for(var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c={majorBrand:er(o.subarray(0,4)),minorVersion:u.getUint32(4),compatibleBrands:[]},d=8;d<o.byteLength;)c.compatibleBrands.push(er(o.subarray(d,d+4))),d+=4;return c},dinf:function(o){return{boxes:Ot(o)}},dref:function(o){return{version:o[0],flags:new Uint8Array(o.subarray(1,4)),dataReferences:Ot(o.subarray(8))}},hdlr:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c={version:u.getUint8(0),flags:new Uint8Array(o.subarray(1,4)),handlerType:er(o.subarray(8,12)),name:""},d=8;for(d=24;d<o.byteLength;d++){if(o[d]===0){d++;break}c.name+=String.fromCharCode(o[d])}return c.name=decodeURIComponent(escape(c.name)),c},mdat:function(o){return{byteLength:o.byteLength,nals:TA(o)}},mdhd:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c=4,d,f={version:u.getUint8(0),flags:new Uint8Array(o.subarray(1,4)),language:""};return f.version===1?(c+=4,f.creationTime=ui(u.getUint32(c)),c+=8,f.modificationTime=ui(u.getUint32(c)),c+=4,f.timescale=u.getUint32(c),c+=8,f.duration=u.getUint32(c)):(f.creationTime=ui(u.getUint32(c)),c+=4,f.modificationTime=ui(u.getUint32(c)),c+=4,f.timescale=u.getUint32(c),c+=4,f.duration=u.getUint32(c)),c+=4,d=u.getUint16(c),f.language+=String.fromCharCode((d>>10)+96),f.language+=String.fromCharCode(((d&992)>>5)+96),f.language+=String.fromCharCode((d&31)+96),f},mdia:function(o){return{boxes:Ot(o)}},mfhd:function(o){return{version:o[0],flags:new Uint8Array(o.subarray(1,4)),sequenceNumber:o[4]<<24|o[5]<<16|o[6]<<8|o[7]}},minf:function(o){return{boxes:Ot(o)}},mp4a:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c={dataReferenceIndex:u.getUint16(6),channelcount:u.getUint16(16),samplesize:u.getUint16(18),samplerate:u.getUint16(24)+u.getUint16(26)/65536};return o.byteLength>28&&(c.streamDescriptor=Ot(o.subarray(28))[0]),c},moof:function(o){return{boxes:Ot(o)}},moov:function(o){return{boxes:Ot(o)}},mvex:function(o){return{boxes:Ot(o)}},mvhd:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c=4,d={version:u.getUint8(0),flags:new Uint8Array(o.subarray(1,4))};return d.version===1?(c+=4,d.creationTime=ui(u.getUint32(c)),c+=8,d.modificationTime=ui(u.getUint32(c)),c+=4,d.timescale=u.getUint32(c),c+=8,d.duration=u.getUint32(c)):(d.creationTime=ui(u.getUint32(c)),c+=4,d.modificationTime=ui(u.getUint32(c)),c+=4,d.timescale=u.getUint32(c),c+=4,d.duration=u.getUint32(c)),c+=4,d.rate=u.getUint16(c)+u.getUint16(c+2)/16,c+=4,d.volume=u.getUint8(c)+u.getUint8(c+1)/8,c+=2,c+=2,c+=2*4,d.matrix=new Uint32Array(o.subarray(c,c+9*4)),c+=9*4,c+=6*4,d.nextTrackId=u.getUint32(c),d},pdin:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength);return{version:u.getUint8(0),flags:new Uint8Array(o.subarray(1,4)),rate:u.getUint32(4),initialDelay:u.getUint32(8)}},sdtp:function(o){var u={version:o[0],flags:new Uint8Array(o.subarray(1,4)),samples:[]},c;for(c=4;c<o.byteLength;c++)u.samples.push({dependsOn:(o[c]&48)>>4,isDependedOn:(o[c]&12)>>2,hasRedundancy:o[c]&3});return u},sidx:vA,smhd:function(o){return{version:o[0],flags:new Uint8Array(o.subarray(1,4)),balance:o[4]+o[5]/256}},stbl:function(o){return{boxes:Ot(o)}},ctts:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c={version:u.getUint8(0),flags:new Uint8Array(o.subarray(1,4)),compositionOffsets:[]},d=u.getUint32(4),f;for(f=8;d;f+=8,d--)c.compositionOffsets.push({sampleCount:u.getUint32(f),sampleOffset:u[c.version===0?"getUint32":"getInt32"](f+4)});return c},stss:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c={version:u.getUint8(0),flags:new Uint8Array(o.subarray(1,4)),syncSamples:[]},d=u.getUint32(4),f;for(f=8;d;f+=4,d--)c.syncSamples.push(u.getUint32(f));return c},stco:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c={version:o[0],flags:new Uint8Array(o.subarray(1,4)),chunkOffsets:[]},d=u.getUint32(4),f;for(f=8;d;f+=4,d--)c.chunkOffsets.push(u.getUint32(f));return c},stsc:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c=u.getUint32(4),d={version:o[0],flags:new Uint8Array(o.subarray(1,4)),sampleToChunks:[]},f;for(f=8;c;f+=12,c--)d.sampleToChunks.push({firstChunk:u.getUint32(f),samplesPerChunk:u.getUint32(f+4),sampleDescriptionIndex:u.getUint32(f+8)});return d},stsd:function(o){return{version:o[0],flags:new Uint8Array(o.subarray(1,4)),sampleDescriptions:Ot(o.subarray(8))}},stsz:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c={version:o[0],flags:new Uint8Array(o.subarray(1,4)),sampleSize:u.getUint32(4),entries:[]},d;for(d=12;d<o.byteLength;d+=4)c.entries.push(u.getUint32(d));return c},stts:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c={version:o[0],flags:new Uint8Array(o.subarray(1,4)),timeToSamples:[]},d=u.getUint32(4),f;for(f=8;d;f+=8,d--)c.timeToSamples.push({sampleCount:u.getUint32(f),sampleDelta:u.getUint32(f+4)});return c},styp:function(o){return an.ftyp(o)},tfdt:Sl,tfhd:jl,tkhd:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),c=4,d={version:u.getUint8(0),flags:new Uint8Array(o.subarray(1,4))};return d.version===1?(c+=4,d.creationTime=ui(u.getUint32(c)),c+=8,d.modificationTime=ui(u.getUint32(c)),c+=4,d.trackId=u.getUint32(c),c+=4,c+=8,d.duration=u.getUint32(c)):(d.creationTime=ui(u.getUint32(c)),c+=4,d.modificationTime=ui(u.getUint32(c)),c+=4,d.trackId=u.getUint32(c),c+=4,c+=4,d.duration=u.getUint32(c)),c+=4,c+=2*4,d.layer=u.getUint16(c),c+=2,d.alternateGroup=u.getUint16(c),c+=2,d.volume=u.getUint8(c)+u.getUint8(c+1)/8,c+=2,c+=2,d.matrix=new Uint32Array(o.subarray(c,c+9*4)),c+=9*4,d.width=u.getUint16(c)+u.getUint16(c+2)/65536,c+=4,d.height=u.getUint16(c)+u.getUint16(c+2)/65536,d},traf:function(o){return{boxes:Ot(o)}},trak:function(o){return{boxes:Ot(o)}},trex:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength);return{version:o[0],flags:new Uint8Array(o.subarray(1,4)),trackId:u.getUint32(4),defaultSampleDescriptionIndex:u.getUint32(8),defaultSampleDuration:u.getUint32(12),defaultSampleSize:u.getUint32(16),sampleDependsOn:o[20]&3,sampleIsDependedOn:(o[21]&192)>>6,sampleHasRedundancy:(o[21]&48)>>4,samplePaddingValue:(o[21]&14)>>1,sampleIsDifferenceSample:!!(o[21]&1),sampleDegradationPriority:u.getUint16(22)}},trun:Ph,"url ":function(o){return{version:o[0],flags:new Uint8Array(o.subarray(1,4))}},vmhd:function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength);return{version:o[0],flags:new Uint8Array(o.subarray(1,4)),graphicsmode:u.getUint16(4),opcolor:new Uint16Array([u.getUint16(6),u.getUint16(8),u.getUint16(10)])}}};Ot=function(o){for(var u=0,c=[],d,f,m,_,T,x=new ArrayBuffer(o.length),j=new Uint8Array(x),k=0;k<o.length;++k)j[k]=o[k];for(d=new DataView(x);u<o.byteLength;)f=d.getUint32(u),m=er(o.subarray(u+4,u+8)),_=f>1?u+f:o.byteLength,T=(an[m]||function(z){return{data:z}})(o.subarray(u+8,_)),T.size=f,T.type=m,c.push(T),u=_;return c},wl=function(o,u){var c;return u=u||0,c=new Array(u*2+1).join(" "),o.map(function(d,f){return c+d.type+`
`+Object.keys(d).filter(function(m){return m!=="type"&&m!=="boxes"}).map(function(m){var _=c+"  "+m+": ",T=d[m];if(T instanceof Uint8Array||T instanceof Uint32Array){var x=Array.prototype.slice.call(new Uint8Array(T.buffer,T.byteOffset,T.byteLength)).map(function(j){return" "+("00"+j.toString(16)).slice(-2)}).join("").match(/.{1,24}/g);return x?x.length===1?_+"<"+x.join("").slice(1)+">":_+`<
`+x.map(function(j){return c+"  "+j}).join(`
`)+`
`+c+"  >":_+"<>"}return _+JSON.stringify(T,null,2).split(`
`).map(function(j,k){return k===0?j:c+"  "+j}).join(`
`)}).join(`
`)+(d.boxes?`
`+wl(d.boxes,u+1):"")}).join(`
`)};var Lh={inspect:Ot,textify:wl,parseType:er,findBox:EA,parseTraf:an.traf,parseTfdt:an.tfdt,parseHdlr:an.hdlr,parseTfhd:an.tfhd,parseTrun:an.trun,parseSidx:an.sidx},CA=function(o){for(var u=0,c=String.fromCharCode(o[u]),d="";c!=="\0";)d+=c,u++,c=String.fromCharCode(o[u]);return d+=c,d},xA={uint8ToCString:CA},ka=xA.uint8ToCString,SA=r.getUint64,jA=function(o){var u=4,c=o[0],d,f,m,_,T,x,j,k;if(c===0){d=ka(o.subarray(u)),u+=d.length,f=ka(o.subarray(u)),u+=f.length;var z=new DataView(o.buffer);m=z.getUint32(u),u+=4,T=z.getUint32(u),u+=4,x=z.getUint32(u),u+=4,j=z.getUint32(u),u+=4}else if(c===1){var z=new DataView(o.buffer);m=z.getUint32(u),u+=4,_=SA(o.subarray(u)),u+=8,x=z.getUint32(u),u+=4,j=z.getUint32(u),u+=4,d=ka(o.subarray(u)),u+=d.length,f=ka(o.subarray(u)),u+=f.length}k=new Uint8Array(o.subarray(u,o.byteLength));var de={scheme_id_uri:d,value:f,timescale:m||1,presentation_time:_,presentation_time_delta:T,event_duration:x,id:j,message_data:k};return BA(c,de)?de:void 0},wA=function(o,u,c,d){return o||o===0?o/u:d+c/u},BA=function(o,u){var c=u.scheme_id_uri!=="\0",d=o===0&&Rh(u.presentation_time_delta)&&c,f=o===1&&Rh(u.presentation_time)&&c;return!(o>1)&&d||f},Rh=function(o){return o!==void 0||o!==null},DA={parseEmsgBox:jA,scaleTime:wA},tr;typeof window!="undefined"?tr=window:typeof n!="undefined"?tr=n:typeof self!="undefined"?tr=self:tr={};var Mh=tr,Ia=Ba.toUnsigned,ir=Ba.toHexString,yt=Da,us=xl,Bl=DA,kA=jl,IA=Ph,PA=Sl,OA=r.getUint64,Nh,Uh,Fh,Vh,zh,Dl,Hh,kl=Mh,LA=vh.parseId3Frames;Nh=function(o){var u={},c=yt(o,["moov","trak"]);return c.reduce(function(d,f){var m,_,T,x,j;return m=yt(f,["tkhd"])[0],!m||(_=m[0],T=_===0?12:20,x=Ia(m[T]<<24|m[T+1]<<16|m[T+2]<<8|m[T+3]),j=yt(f,["mdia","mdhd"])[0],!j)?null:(_=j[0],T=_===0?12:20,d[x]=Ia(j[T]<<24|j[T+1]<<16|j[T+2]<<8|j[T+3]),d)},u)},Uh=function(o,u){var c;c=yt(u,["moof","traf"]);var d=c.reduce(function(f,m){var _=yt(m,["tfhd"])[0],T=Ia(_[4]<<24|_[5]<<16|_[6]<<8|_[7]),x=o[T]||9e4,j=yt(m,["tfdt"])[0],k=new DataView(j.buffer,j.byteOffset,j.byteLength),z;j[0]===1?z=OA(j.subarray(4,12)):z=k.getUint32(4);let de;return typeof z=="bigint"?de=z/kl.BigInt(x):typeof z=="number"&&!isNaN(z)&&(de=z/x),de<Number.MAX_SAFE_INTEGER&&(de=Number(de)),de<f&&(f=de),f},1/0);return typeof d=="bigint"||isFinite(d)?d:0},Fh=function(o,u){var c=yt(u,["moof","traf"]),d=0,f=0,m;if(c&&c.length){var _=yt(c[0],["tfhd"])[0],T=yt(c[0],["trun"])[0],x=yt(c[0],["tfdt"])[0];if(_){var j=kA(_);m=j.trackId}if(x){var k=PA(x);d=k.baseMediaDecodeTime}if(T){var z=IA(T);z.samples&&z.samples.length&&(f=z.samples[0].compositionTimeOffset||0)}}var de=o[m]||9e4;typeof d=="bigint"&&(f=kl.BigInt(f),de=kl.BigInt(de));var X=(d+f)/de;return typeof X=="bigint"&&X<Number.MAX_SAFE_INTEGER&&(X=Number(X)),X},Vh=function(o){var u=yt(o,["moov","trak"]),c=[];return u.forEach(function(d){var f=yt(d,["mdia","hdlr"]),m=yt(d,["tkhd"]);f.forEach(function(_,T){var x=us(_.subarray(8,12)),j=m[T],k,z,de;x==="vide"&&(k=new DataView(j.buffer,j.byteOffset,j.byteLength),z=k.getUint8(0),de=z===0?k.getUint32(12):k.getUint32(20),c.push(de))})}),c},Dl=function(o){var u=o[0],c=u===0?12:20;return Ia(o[c]<<24|o[c+1]<<16|o[c+2]<<8|o[c+3])},zh=function(o){var u=yt(o,["moov","trak"]),c=[];return u.forEach(function(d){var f={},m=yt(d,["tkhd"])[0],_,T;m&&(_=new DataView(m.buffer,m.byteOffset,m.byteLength),T=_.getUint8(0),f.id=T===0?_.getUint32(12):_.getUint32(20));var x=yt(d,["mdia","hdlr"])[0];if(x){var j=us(x.subarray(8,12));j==="vide"?f.type="video":j==="soun"?f.type="audio":f.type=j}var k=yt(d,["mdia","minf","stbl","stsd"])[0];if(k){var z=k.subarray(8);f.codec=us(z.subarray(4,8));var de=yt(z,[f.codec])[0],X,Be;de&&(/^[asm]vc[1-9]$/i.test(f.codec)?(X=de.subarray(78),Be=us(X.subarray(4,8)),Be==="avcC"&&X.length>11?(f.codec+=".",f.codec+=ir(X[9]),f.codec+=ir(X[10]),f.codec+=ir(X[11])):f.codec="avc1.4d400d"):/^mp4[a,v]$/i.test(f.codec)?(X=de.subarray(28),Be=us(X.subarray(4,8)),Be==="esds"&&X.length>20&&X[19]!==0?(f.codec+="."+ir(X[19]),f.codec+="."+ir(X[20]>>>2&63).replace(/^0/,"")):f.codec="mp4a.40.2"):f.codec=f.codec.toLowerCase())}var Ne=yt(d,["mdia","mdhd"])[0];Ne&&(f.timescale=Dl(Ne)),c.push(f)}),c},Hh=function(o,u=0){var c=yt(o,["emsg"]);return c.map(d=>{var f=Bl.parseEmsgBox(new Uint8Array(d)),m=LA(f.message_data);return{cueTime:Bl.scaleTime(f.presentation_time,f.timescale,f.presentation_time_delta,u),duration:Bl.scaleTime(f.event_duration,f.timescale),frames:m}})};var nr={findBox:yt,parseType:us,timescale:Nh,startTime:Uh,compositionStartTime:Fh,videoTrackIds:Vh,tracks:zh,getTimescaleFromMediaHeader:Dl,getEmsgID3:Hh};const{parseTrun:RA}=Lh,{findBox:qh}=nr;var Wh=Mh,MA=function(o){var u=qh(o,["moof","traf"]),c=qh(o,["mdat"]),d=[];return c.forEach(function(f,m){var _=u[m];d.push({mdat:f,traf:_})}),d},NA=function(o,u,c){var d=u,f=c.defaultSampleDuration||0,m=c.defaultSampleSize||0,_=c.trackId,T=[];return o.forEach(function(x){var j=RA(x),k=j.samples;k.forEach(function(z){z.duration===void 0&&(z.duration=f),z.size===void 0&&(z.size=m),z.trackId=_,z.dts=d,z.compositionTimeOffset===void 0&&(z.compositionTimeOffset=0),typeof d=="bigint"?(z.pts=d+Wh.BigInt(z.compositionTimeOffset),d+=Wh.BigInt(z.duration)):(z.pts=d+z.compositionTimeOffset,d+=z.duration)}),T=T.concat(k)}),T},$h={getMdatTrafPairs:MA,parseSamples:NA},UA=hh.discardEmulationPreventionBytes,FA=fh.CaptionStream,Il=Da,VA=Sl,zA=jl,{getMdatTrafPairs:HA,parseSamples:qA}=$h,WA=function(o,u){for(var c=o,d=0;d<u.length;d++){var f=u[d];if(c<f.size)return f;c-=f.size}return null},$A=function(o,u,c){var d=new DataView(o.buffer,o.byteOffset,o.byteLength),f={logs:[],seiNals:[]},m,_,T,x;for(_=0;_+4<o.length;_+=T)if(T=d.getUint32(_),_+=4,!(T<=0))switch(o[_]&31){case 6:var j=o.subarray(_+1,_+1+T),k=WA(_,u);if(m={nalUnitType:"sei_rbsp",size:T,data:j,escapedRBSP:UA(j),trackId:c},k)m.pts=k.pts,m.dts=k.dts,x=k;else if(x)m.pts=x.pts,m.dts=x.dts;else{f.logs.push({level:"warn",message:"We've encountered a nal unit without data at "+_+" for trackId "+c+". See mux.js#223."});break}f.seiNals.push(m);break}return f},GA=function(o,u){var c={},d=HA(o);return d.forEach(function(f){var m=f.mdat,_=f.traf,T=Il(_,["tfhd"]),x=zA(T[0]),j=x.trackId,k=Il(_,["tfdt"]),z=k.length>0?VA(k[0]).baseMediaDecodeTime:0,de=Il(_,["trun"]),X,Be;u===j&&de.length>0&&(X=qA(de,z,x),Be=$A(m,X,j),c[j]||(c[j]={seiNals:[],logs:[]}),c[j].seiNals=c[j].seiNals.concat(Be.seiNals),c[j].logs=c[j].logs.concat(Be.logs))}),c},YA=function(o,u,c){var d;if(u===null)return null;d=GA(o,u);var f=d[u]||{};return{seiNals:f.seiNals,logs:f.logs,timescale:c}},XA=function(){var o=!1,u,c,d,f,m,_;this.isInitialized=function(){return o},this.init=function(T){u=new FA,o=!0,_=T?T.isPartial:!1,u.on("data",function(x){x.startTime=x.startPts/f,x.endTime=x.endPts/f,m.captions.push(x),m.captionStreams[x.stream]=!0}),u.on("log",function(x){m.logs.push(x)})},this.isNewInit=function(T,x){return T&&T.length===0||x&&typeof x=="object"&&Object.keys(x).length===0?!1:d!==T[0]||f!==x[d]},this.parse=function(T,x,j){var k;if(this.isInitialized()){if(!x||!j)return null;if(this.isNewInit(x,j))d=x[0],f=j[d];else if(d===null||!f)return c.push(T),null}else return null;for(;c.length>0;){var z=c.shift();this.parse(z,x,j)}return k=YA(T,d,f),k&&k.logs&&(m.logs=m.logs.concat(k.logs)),k===null||!k.seiNals?m.logs.length?{logs:m.logs,captions:[],captionStreams:[]}:null:(this.pushNals(k.seiNals),this.flushStream(),m)},this.pushNals=function(T){if(!this.isInitialized()||!T||T.length===0)return null;T.forEach(function(x){u.push(x)})},this.flushStream=function(){if(!this.isInitialized())return null;_?u.partialFlush():u.flush()},this.clearParsedCaptions=function(){m.captions=[],m.captionStreams={},m.logs=[]},this.resetCaptionStream=function(){if(!this.isInitialized())return null;u.reset()},this.clearAllCaptions=function(){this.clearParsedCaptions(),this.resetCaptionStream()},this.reset=function(){c=[],d=null,f=null,m?this.clearParsedCaptions():m={captions:[],captionStreams:{},logs:[]},this.resetCaptionStream()},this.reset()},KA=XA;const{parseTfdt:QA}=Lh,on=Da,{getTimescaleFromMediaHeader:JA}=nr,{parseSamples:ZA,getMdatTrafPairs:ey}=$h;var Gh=function(){let o=9e4;this.init=function(u){const c=on(u,["moov","trak","mdia","mdhd"])[0];c&&(o=JA(c))},this.parseSegment=function(u){const c=[],d=ey(u);let f=0;return d.forEach(function(m){const _=m.mdat,T=m.traf,x=on(T,["tfdt"])[0],j=on(T,["tfhd"])[0],k=on(T,["trun"]);if(x&&(f=QA(x).baseMediaDecodeTime),k.length&&j){const z=ZA(k,f,j);let de=0;z.forEach(function(X){const Be="utf-8",Ne=new TextDecoder(Be),Bt=_.slice(de,de+X.size);if(on(Bt,["vtte"])[0]){de+=X.size;return}on(Bt,["vttc"]).forEach(function(sr){const rr=on(sr,["payl"])[0],ar=on(sr,["sttg"])[0],or=X.pts/o,La=(X.pts+X.duration)/o;let lt,lr;if(rr)try{lt=Ne.decode(rr)}catch(yi){console.error(yi)}if(ar)try{lr=Ne.decode(ar)}catch(yi){console.error(yi)}X.duration&&lt&&c.push({cueText:lt,start:or,end:La,settings:lr})}),de+=X.size})}}),c}},Pl=ga,Yh=function(o){var u=o[1]&31;return u<<=8,u|=o[2],u},Pa=function(o){return!!(o[1]&64)},Oa=function(o){var u=0;return(o[3]&48)>>>4>1&&(u+=o[4]+1),u},ty=function(o,u){var c=Yh(o);return c===0?"pat":c===u?"pmt":u?"pes":null},iy=function(o){var u=Pa(o),c=4+Oa(o);return u&&(c+=o[c]+1),(o[c+10]&31)<<8|o[c+11]},ny=function(o){var u={},c=Pa(o),d=4+Oa(o);if(c&&(d+=o[d]+1),!!(o[d+5]&1)){var f,m,_;f=(o[d+1]&15)<<8|o[d+2],m=3+f-4,_=(o[d+10]&15)<<8|o[d+11];for(var T=12+_;T<m;){var x=d+T;u[(o[x+1]&31)<<8|o[x+2]]=o[x],T+=((o[x+3]&15)<<8|o[x+4])+5}return u}},sy=function(o,u){var c=Yh(o),d=u[c];switch(d){case Pl.H264_STREAM_TYPE:return"video";case Pl.ADTS_STREAM_TYPE:return"audio";case Pl.METADATA_STREAM_TYPE:return"timed-metadata";default:return null}},ry=function(o){var u=Pa(o);if(!u)return null;var c=4+Oa(o);if(c>=o.byteLength)return null;var d=null,f;return f=o[c+7],f&192&&(d={},d.pts=(o[c+9]&14)<<27|(o[c+10]&255)<<20|(o[c+11]&254)<<12|(o[c+12]&255)<<5|(o[c+13]&254)>>>3,d.pts*=4,d.pts+=(o[c+13]&6)>>>1,d.dts=d.pts,f&64&&(d.dts=(o[c+14]&14)<<27|(o[c+15]&255)<<20|(o[c+16]&254)<<12|(o[c+17]&255)<<5|(o[c+18]&254)>>>3,d.dts*=4,d.dts+=(o[c+18]&6)>>>1)),d},Ol=function(o){switch(o){case 5:return"slice_layer_without_partitioning_rbsp_idr";case 6:return"sei_rbsp";case 7:return"seq_parameter_set_rbsp";case 8:return"pic_parameter_set_rbsp";case 9:return"access_unit_delimiter_rbsp";default:return null}},ay=function(o){for(var u=4+Oa(o),c=o.subarray(u),d=0,f=0,m=!1,_;f<c.byteLength-3;f++)if(c[f+2]===1){d=f+5;break}for(;d<c.byteLength;)switch(c[d]){case 0:if(c[d-1]!==0){d+=2;break}else if(c[d-2]!==0){d++;break}f+3!==d-2&&(_=Ol(c[f+3]&31),_==="slice_layer_without_partitioning_rbsp_idr"&&(m=!0));do d++;while(c[d]!==1&&d<c.length);f=d-2,d+=3;break;case 1:if(c[d-1]!==0||c[d-2]!==0){d+=3;break}_=Ol(c[f+3]&31),_==="slice_layer_without_partitioning_rbsp_idr"&&(m=!0),f=d-2,d+=3;break;default:d+=3;break}return c=c.subarray(f),d-=f,f=0,c&&c.byteLength>3&&(_=Ol(c[f+3]&31),_==="slice_layer_without_partitioning_rbsp_idr"&&(m=!0)),m},oy={parseType:ty,parsePat:iy,parsePmt:ny,parsePayloadUnitStartIndicator:Pa,parsePesType:sy,parsePesTime:ry,videoPacketContainsKeyFrame:ay},Xh=ga,cs=mh.handleRollover,Je={};Je.ts=oy,Je.aac=bl;var Bn=ot.ONE_SECOND_IN_TS,Ut=188,ki=71,ly=function(o,u){for(var c=0,d=Ut,f,m;d<o.byteLength;){if(o[c]===ki&&o[d]===ki){switch(f=o.subarray(c,d),m=Je.ts.parseType(f,u.pid),m){case"pat":u.pid=Je.ts.parsePat(f);break;case"pmt":var _=Je.ts.parsePmt(f);u.table=u.table||{},Object.keys(_).forEach(function(T){u.table[T]=_[T]});break}c+=Ut,d+=Ut;continue}c++,d++}},Kh=function(o,u,c){for(var d=0,f=Ut,m,_,T,x,j,k=!1;f<=o.byteLength;){if(o[d]===ki&&(o[f]===ki||f===o.byteLength)){switch(m=o.subarray(d,f),_=Je.ts.parseType(m,u.pid),_){case"pes":T=Je.ts.parsePesType(m,u.table),x=Je.ts.parsePayloadUnitStartIndicator(m),T==="audio"&&x&&(j=Je.ts.parsePesTime(m),j&&(j.type="audio",c.audio.push(j),k=!0));break}if(k)break;d+=Ut,f+=Ut;continue}d++,f++}for(f=o.byteLength,d=f-Ut,k=!1;d>=0;){if(o[d]===ki&&(o[f]===ki||f===o.byteLength)){switch(m=o.subarray(d,f),_=Je.ts.parseType(m,u.pid),_){case"pes":T=Je.ts.parsePesType(m,u.table),x=Je.ts.parsePayloadUnitStartIndicator(m),T==="audio"&&x&&(j=Je.ts.parsePesTime(m),j&&(j.type="audio",c.audio.push(j),k=!0));break}if(k)break;d-=Ut,f-=Ut;continue}d--,f--}},uy=function(o,u,c){for(var d=0,f=Ut,m,_,T,x,j,k,z,de,X=!1,Be={data:[],size:0};f<o.byteLength;){if(o[d]===ki&&o[f]===ki){switch(m=o.subarray(d,f),_=Je.ts.parseType(m,u.pid),_){case"pes":if(T=Je.ts.parsePesType(m,u.table),x=Je.ts.parsePayloadUnitStartIndicator(m),T==="video"&&(x&&!X&&(j=Je.ts.parsePesTime(m),j&&(j.type="video",c.video.push(j),X=!0)),!c.firstKeyFrame)){if(x&&Be.size!==0){for(k=new Uint8Array(Be.size),z=0;Be.data.length;)de=Be.data.shift(),k.set(de,z),z+=de.byteLength;if(Je.ts.videoPacketContainsKeyFrame(k)){var Ne=Je.ts.parsePesTime(k);Ne?(c.firstKeyFrame=Ne,c.firstKeyFrame.type="video"):console.warn("Failed to extract PTS/DTS from PES at first keyframe. This could be an unusual TS segment, or else mux.js did not parse your TS segment correctly. If you know your TS segments do contain PTS/DTS on keyframes please file a bug report! You can try ffprobe to double check for yourself.")}Be.size=0}Be.data.push(m),Be.size+=m.byteLength}break}if(X&&c.firstKeyFrame)break;d+=Ut,f+=Ut;continue}d++,f++}for(f=o.byteLength,d=f-Ut,X=!1;d>=0;){if(o[d]===ki&&o[f]===ki){switch(m=o.subarray(d,f),_=Je.ts.parseType(m,u.pid),_){case"pes":T=Je.ts.parsePesType(m,u.table),x=Je.ts.parsePayloadUnitStartIndicator(m),T==="video"&&x&&(j=Je.ts.parsePesTime(m),j&&(j.type="video",c.video.push(j),X=!0));break}if(X)break;d-=Ut,f-=Ut;continue}d--,f--}},cy=function(o,u){if(o.audio&&o.audio.length){var c=u;(typeof c=="undefined"||isNaN(c))&&(c=o.audio[0].dts),o.audio.forEach(function(m){m.dts=cs(m.dts,c),m.pts=cs(m.pts,c),m.dtsTime=m.dts/Bn,m.ptsTime=m.pts/Bn})}if(o.video&&o.video.length){var d=u;if((typeof d=="undefined"||isNaN(d))&&(d=o.video[0].dts),o.video.forEach(function(m){m.dts=cs(m.dts,d),m.pts=cs(m.pts,d),m.dtsTime=m.dts/Bn,m.ptsTime=m.pts/Bn}),o.firstKeyFrame){var f=o.firstKeyFrame;f.dts=cs(f.dts,d),f.pts=cs(f.pts,d),f.dtsTime=f.dts/Bn,f.ptsTime=f.pts/Bn}}},dy=function(o){for(var u=!1,c=0,d=null,f=null,m=0,_=0,T;o.length-_>=3;){var x=Je.aac.parseType(o,_);switch(x){case"timed-metadata":if(o.length-_<10){u=!0;break}if(m=Je.aac.parseId3TagSize(o,_),m>o.length){u=!0;break}f===null&&(T=o.subarray(_,_+m),f=Je.aac.parseAacTimestamp(T)),_+=m;break;case"audio":if(o.length-_<7){u=!0;break}if(m=Je.aac.parseAdtsSize(o,_),m>o.length){u=!0;break}d===null&&(T=o.subarray(_,_+m),d=Je.aac.parseSampleRate(T)),c++,_+=m;break;default:_++;break}if(u)return null}if(d===null||f===null)return null;var j=Bn/d,k={audio:[{type:"audio",dts:f,pts:f},{type:"audio",dts:f+c*1024*j,pts:f+c*1024*j}]};return k},hy=function(o){var u={pid:null,table:null},c={};ly(o,u);for(var d in u.table)if(u.table.hasOwnProperty(d)){var f=u.table[d];switch(f){case Xh.H264_STREAM_TYPE:c.video=[],uy(o,u,c),c.video.length===0&&delete c.video;break;case Xh.ADTS_STREAM_TYPE:c.audio=[],Kh(o,u,c),c.audio.length===0&&delete c.audio;break}}return c},fy=function(o,u){var c=Je.aac.isLikelyAacData(o),d;return c?d=dy(o):d=hy(o),!d||!d.audio&&!d.video?null:(cy(d,u),d)},py={inspect:fy,parseAudioPes_:Kh};const my=function(o,u){u.on("data",function(c){const d=c.initSegment;c.initSegment={data:d.buffer,byteOffset:d.byteOffset,byteLength:d.byteLength};const f=c.data;c.data=f.buffer,o.postMessage({action:"data",segment:c,byteOffset:f.byteOffset,byteLength:f.byteLength},[c.data])}),u.on("done",function(c){o.postMessage({action:"done"})}),u.on("gopInfo",function(c){o.postMessage({action:"gopInfo",gopInfo:c})}),u.on("videoSegmentTimingInfo",function(c){const d={start:{decode:ot.videoTsToSeconds(c.start.dts),presentation:ot.videoTsToSeconds(c.start.pts)},end:{decode:ot.videoTsToSeconds(c.end.dts),presentation:ot.videoTsToSeconds(c.end.pts)},baseMediaDecodeTime:ot.videoTsToSeconds(c.baseMediaDecodeTime)};c.prependedContentDuration&&(d.prependedContentDuration=ot.videoTsToSeconds(c.prependedContentDuration)),o.postMessage({action:"videoSegmentTimingInfo",videoSegmentTimingInfo:d})}),u.on("audioSegmentTimingInfo",function(c){const d={start:{decode:ot.videoTsToSeconds(c.start.dts),presentation:ot.videoTsToSeconds(c.start.pts)},end:{decode:ot.videoTsToSeconds(c.end.dts),presentation:ot.videoTsToSeconds(c.end.pts)},baseMediaDecodeTime:ot.videoTsToSeconds(c.baseMediaDecodeTime)};c.prependedContentDuration&&(d.prependedContentDuration=ot.videoTsToSeconds(c.prependedContentDuration)),o.postMessage({action:"audioSegmentTimingInfo",audioSegmentTimingInfo:d})}),u.on("id3Frame",function(c){o.postMessage({action:"id3Frame",id3Frame:c})}),u.on("caption",function(c){o.postMessage({action:"caption",caption:c})}),u.on("trackinfo",function(c){o.postMessage({action:"trackinfo",trackInfo:c})}),u.on("audioTimingInfo",function(c){o.postMessage({action:"audioTimingInfo",audioTimingInfo:{start:ot.videoTsToSeconds(c.start),end:ot.videoTsToSeconds(c.end)}})}),u.on("videoTimingInfo",function(c){o.postMessage({action:"videoTimingInfo",videoTimingInfo:{start:ot.videoTsToSeconds(c.start),end:ot.videoTsToSeconds(c.end)}})}),u.on("log",function(c){o.postMessage({action:"log",log:c})})};class Qh{constructor(u,c){this.options=c||{},this.self=u,this.init()}init(){this.transmuxer&&this.transmuxer.dispose(),this.transmuxer=new aA.Transmuxer(this.options),my(this.self,this.transmuxer)}pushMp4Captions(u){this.captionParser||(this.captionParser=new KA,this.captionParser.init());const c=new Uint8Array(u.data,u.byteOffset,u.byteLength),d=this.captionParser.parse(c,u.trackIds,u.timescales);this.self.postMessage({action:"mp4Captions",captions:d&&d.captions||[],logs:d&&d.logs||[],data:c.buffer},[c.buffer])}initMp4WebVttParser(u){this.webVttParser||(this.webVttParser=new Gh);const c=new Uint8Array(u.data,u.byteOffset,u.byteLength);this.webVttParser.init(c)}getMp4WebVttText(u){this.webVttParser||(this.webVttParser=new Gh);const c=new Uint8Array(u.data,u.byteOffset,u.byteLength),d=this.webVttParser.parseSegment(c);this.self.postMessage({action:"getMp4WebVttText",mp4VttCues:d||[],data:c.buffer},[c.buffer])}probeMp4StartTime({timescales:u,data:c}){const d=nr.startTime(u,c);this.self.postMessage({action:"probeMp4StartTime",startTime:d,data:c},[c.buffer])}probeMp4Tracks({data:u}){const c=nr.tracks(u);this.self.postMessage({action:"probeMp4Tracks",tracks:c,data:u},[u.buffer])}probeEmsgID3({data:u,offset:c}){const d=nr.getEmsgID3(u,c);this.self.postMessage({action:"probeEmsgID3",id3Frames:d,emsgData:u},[u.buffer])}probeTs({data:u,baseStartTime:c}){const d=typeof c=="number"&&!isNaN(c)?c*ot.ONE_SECOND_IN_TS:void 0,f=py.inspect(u,d);let m=null;f&&(m={hasVideo:f.video&&f.video.length===2||!1,hasAudio:f.audio&&f.audio.length===2||!1},m.hasVideo&&(m.videoStart=f.video[0].ptsTime),m.hasAudio&&(m.audioStart=f.audio[0].ptsTime)),this.self.postMessage({action:"probeTs",result:m,data:u},[u.buffer])}clearAllMp4Captions(){this.captionParser&&this.captionParser.clearAllCaptions()}clearParsedMp4Captions(){this.captionParser&&this.captionParser.clearParsedCaptions()}push(u){const c=new Uint8Array(u.data,u.byteOffset,u.byteLength);this.transmuxer.push(c)}reset(){this.transmuxer.reset()}setTimestampOffset(u){const c=u.timestampOffset||0;this.transmuxer.setBaseMediaDecodeTime(Math.round(ot.secondsToVideoTs(c)))}setAudioAppendStart(u){this.transmuxer.setAudioAppendStart(Math.ceil(ot.secondsToVideoTs(u.appendStart)))}setRemux(u){this.transmuxer.setRemux(u.remux)}flush(u){this.transmuxer.flush(),self.postMessage({action:"done",type:"transmuxed"})}endTimeline(){this.transmuxer.endTimeline(),self.postMessage({action:"endedtimeline",type:"transmuxed"})}alignGopsWith(u){this.transmuxer.alignGopsWith(u.gopsToAlignWith.slice())}}self.onmessage=function(o){if(o.data.action==="init"&&o.data.options){this.messageHandlers=new Qh(self,o.data.options);return}this.messageHandlers||(this.messageHandlers=new Qh(self)),o.data&&o.data.action&&o.data.action!=="init"&&this.messageHandlers[o.data.action]&&this.messageHandlers[o.data.action](o.data)}}));var sg=dd(ng);const rg=(n,e,t)=>{const{type:i,initSegment:s,captions:r,captionStreams:a,metadata:l,videoFrameDtsTime:h,videoFramePtsTime:p}=n.data.segment;e.buffer.push({captions:r,captionStreams:a,metadata:l});const g=n.data.segment.boxes||{data:n.data.segment.data},y={type:i,data:new Uint8Array(g.data,g.data.byteOffset,g.data.byteLength),initSegment:new Uint8Array(s.data,s.byteOffset,s.byteLength)};typeof h!="undefined"&&(y.videoFrameDtsTime=h),typeof p!="undefined"&&(y.videoFramePtsTime=p),t(y)},ag=({transmuxedData:n,callback:e})=>{n.buffer=[],e(n)},og=(n,e)=>{e.gopInfo=n.data.gopInfo},pd=n=>{const{transmuxer:e,bytes:t,audioAppendStart:i,gopsToAlignWith:s,remux:r,onData:a,onTrackInfo:l,onAudioTimingInfo:h,onVideoTimingInfo:p,onVideoSegmentTimingInfo:g,onAudioSegmentTimingInfo:y,onId3:w,onCaptions:D,onDone:P,onEndedTimeline:E,onTransmuxerLog:H,isEndOfTimeline:V,segment:U,triggerSegmentEventFn:M}=n,Y={buffer:[]};let O=V;const Q=be=>{e.currentTransmux===n&&(be.data.action==="data"&&rg(be,Y,a),be.data.action==="trackinfo"&&l(be.data.trackInfo),be.data.action==="gopInfo"&&og(be,Y),be.data.action==="audioTimingInfo"&&h(be.data.audioTimingInfo),be.data.action==="videoTimingInfo"&&p(be.data.videoTimingInfo),be.data.action==="videoSegmentTimingInfo"&&g(be.data.videoSegmentTimingInfo),be.data.action==="audioSegmentTimingInfo"&&y(be.data.audioSegmentTimingInfo),be.data.action==="id3Frame"&&w([be.data.id3Frame],be.data.id3Frame.dispatchType),be.data.action==="caption"&&D(be.data.caption),be.data.action==="endedtimeline"&&(O=!1,E()),be.data.action==="log"&&H(be.data.log),be.data.type==="transmuxed"&&(O||(e.onmessage=null,ag({transmuxedData:Y,callback:P}),md(e))))},Ae=()=>{const be={message:"Received an error message from the transmuxer worker",metadata:{errorType:L.Error.StreamingFailedToTransmuxSegment,segmentInfo:bn({segment:U})}};P(null,be)};if(e.onmessage=Q,e.onerror=Ae,i&&e.postMessage({action:"setAudioAppendStart",appendStart:i}),Array.isArray(s)&&e.postMessage({action:"alignGopsWith",gopsToAlignWith:s}),typeof r!="undefined"&&e.postMessage({action:"setRemux",remux:r}),t.byteLength){const be=t instanceof ArrayBuffer?t:t.buffer,We=t instanceof ArrayBuffer?0:t.byteOffset;M({type:"segmenttransmuxingstart",segment:U}),e.postMessage({action:"push",data:be,byteOffset:We,byteLength:t.byteLength},[be])}V&&e.postMessage({action:"endTimeline"}),e.postMessage({action:"flush"})},md=n=>{n.currentTransmux=null,n.transmuxQueue.length&&(n.currentTransmux=n.transmuxQueue.shift(),typeof n.currentTransmux=="function"?n.currentTransmux():pd(n.currentTransmux))},gd=(n,e)=>{n.postMessage({action:e}),md(n)},vd=(n,e)=>{if(!e.currentTransmux){e.currentTransmux=n,gd(e,n);return}e.transmuxQueue.push(gd.bind(null,e,n))},lg=n=>{vd("reset",n)},ug=n=>{vd("endTimeline",n)},Ad=n=>{if(!n.transmuxer.currentTransmux){n.transmuxer.currentTransmux=n,pd(n);return}n.transmuxer.transmuxQueue.push(n)};var Zo={reset:lg,endTimeline:ug,transmux:Ad,createTransmuxer:n=>{const e=new sg;e.currentTransmux=null,e.transmuxQueue=[];const t=e.terminate;return e.terminate=()=>(e.currentTransmux=null,e.transmuxQueue.length=0,t.call(e)),e.postMessage({action:"init",options:n}),e}};const ns=function(n){const e=n.transmuxer,t=n.endAction||n.action,i=n.callback,s=(0,ge.A)({},n,{endAction:null,transmuxer:null,callback:null}),r=a=>{a.data.action===t&&(e.removeEventListener("message",r),a.data.data&&(a.data.data=new Uint8Array(a.data.data,n.byteOffset||0,n.byteLength||a.data.data.byteLength),n.data&&(n.data=a.data.data)),i(a.data))};if(e.addEventListener("message",r),n.data){const a=n.data instanceof ArrayBuffer;s.byteOffset=a?0:n.data.byteOffset,s.byteLength=n.data.byteLength;const l=[a?n.data:n.data.buffer];e.postMessage(s,l)}else e.postMessage(s)},Bi={FAILURE:2,TIMEOUT:-101,ABORTED:-102},yd="wvtt",el=n=>{n.forEach(e=>{e.abort()})},cg=n=>({bandwidth:n.bandwidth,bytesReceived:n.bytesReceived||0,roundTripTime:n.roundTripTime||0}),dg=n=>{const e=n.target,i={bandwidth:1/0,bytesReceived:0,roundTripTime:Date.now()-e.requestTime||0};return i.bytesReceived=n.loaded,i.bandwidth=Math.floor(i.bytesReceived/i.roundTripTime*8*1e3),i},tl=(n,e)=>{const{requestType:t}=e,i=_n({requestType:t,request:e,error:n});return e.timedout?{status:e.status,message:"HLS request timed-out at URL: "+e.uri,code:Bi.TIMEOUT,xhr:e,metadata:i}:e.aborted?{status:e.status,message:"HLS request aborted at URL: "+e.uri,code:Bi.ABORTED,xhr:e,metadata:i}:n?{status:e.status,message:"HLS request errored at URL: "+e.uri,code:Bi.FAILURE,xhr:e,metadata:i}:e.responseType==="arraybuffer"&&e.response.byteLength===0?{status:e.status,message:"Empty HLS response at URL: "+e.uri,code:Bi.FAILURE,xhr:e,metadata:i}:null},_d=(n,e,t,i)=>(s,r)=>{const a=r.response,l=tl(s,r);if(l)return t(l,n);if(a.byteLength!==16)return t({status:r.status,message:"Invalid HLS key at URL: "+r.uri,code:Bi.FAILURE,xhr:r},n);const h=new DataView(a),p=new Uint32Array([h.getUint32(0),h.getUint32(4),h.getUint32(8),h.getUint32(12)]);for(let y=0;y<e.length;y++)e[y].bytes=p;const g={uri:r.uri};return i({type:"segmentkeyloadcomplete",segment:n,keyInfo:g}),t(null,n)},hg=(n,e)=>{e===yd&&n.transmuxer.postMessage({action:"initMp4WebVttParser",data:n.map.bytes})},fg=(n,e,t)=>{e===yd&&ns({action:"getMp4WebVttText",data:n.bytes,transmuxer:n.transmuxer,callback:({data:i,mp4VttCues:s})=>{n.bytes=i,t(null,n,{mp4VttCues:s})}})},bd=(n,e)=>{const t=Wa(n.map.bytes);if(t!=="mp4"){const i=n.map.resolvedUri||n.map.uri,s=t||"unknown";return e({internal:!0,message:`Found unsupported ${s} container for initialization segment at URL: ${i}`,code:Bi.FAILURE,metadata:{mediaType:s}})}ns({action:"probeMp4Tracks",data:n.map.bytes,transmuxer:n.transmuxer,callback:({tracks:i,data:s})=>(n.map.bytes=s,i.forEach(function(r){n.map.tracks=n.map.tracks||{},!n.map.tracks[r.type]&&(n.map.tracks[r.type]=r,typeof r.id=="number"&&r.timescale&&(n.map.timescales=n.map.timescales||{},n.map.timescales[r.id]=r.timescale),r.type==="text"&&hg(n,r.codec))}),e(null))})},pg=({segment:n,finishProcessingFn:e,triggerSegmentEventFn:t})=>(i,s)=>{const r=tl(i,s);if(r)return e(r,n);const a=new Uint8Array(s.response);if(t({type:"segmentloaded",segment:n}),n.map.key)return n.map.encryptedBytes=a,e(null,n);n.map.bytes=a,bd(n,function(l){if(l)return l.xhr=s,l.status=s.status,e(l,n);e(null,n)})},mg=({segment:n,finishProcessingFn:e,responseType:t,triggerSegmentEventFn:i})=>(s,r)=>{const a=tl(s,r);if(a)return e(a,n);i({type:"segmentloaded",segment:n});const l=t==="arraybuffer"||!r.responseText?r.response:tg(r.responseText.substring(n.lastReachedChar||0));return n.stats=cg(r),n.key?n.encryptedBytes=new Uint8Array(l):n.bytes=new Uint8Array(l),e(null,n)},gg=({segment:n,bytes:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:w,triggerSegmentEventFn:D})=>{const P=n.map&&n.map.tracks||{},E=!!(P.audio&&P.video);let H=i.bind(null,n,"audio","start");const V=i.bind(null,n,"audio","end");let U=i.bind(null,n,"video","start");const M=i.bind(null,n,"video","end"),Y=()=>Ad({bytes:e,transmuxer:n.transmuxer,audioAppendStart:n.audioAppendStart,gopsToAlignWith:n.gopsToAlignWith,remux:E,onData:O=>{O.type=O.type==="combined"?"video":O.type,g(n,O)},onTrackInfo:O=>{t&&(E&&(O.isMuxed=!0),t(n,O))},onAudioTimingInfo:O=>{H&&typeof O.start!="undefined"&&(H(O.start),H=null),V&&typeof O.end!="undefined"&&V(O.end)},onVideoTimingInfo:O=>{U&&typeof O.start!="undefined"&&(U(O.start),U=null),M&&typeof O.end!="undefined"&&M(O.end)},onVideoSegmentTimingInfo:O=>{const Q={pts:{start:O.start.presentation,end:O.end.presentation},dts:{start:O.start.decode,end:O.end.decode}};D({type:"segmenttransmuxingtiminginfoavailable",segment:n,timingInfo:Q}),s(O)},onAudioSegmentTimingInfo:O=>{const Q={pts:{start:O.start.pts,end:O.end.pts},dts:{start:O.start.dts,end:O.end.dts}};D({type:"segmenttransmuxingtiminginfoavailable",segment:n,timingInfo:Q}),r(O)},onId3:(O,Q)=>{a(n,O,Q)},onCaptions:O=>{l(n,[O])},isEndOfTimeline:h,onEndedTimeline:()=>{p()},onTransmuxerLog:w,onDone:(O,Q)=>{y&&(O.type=O.type==="combined"?"video":O.type,D({type:"segmenttransmuxingcomplete",segment:n}),y(Q,n,O))},segment:n,triggerSegmentEventFn:D});ns({action:"probeTs",transmuxer:n.transmuxer,data:e,baseStartTime:n.baseStartTime,callback:O=>{n.bytes=e=O.data;const Q=O.result;Q&&(t(n,{hasAudio:Q.hasAudio,hasVideo:Q.hasVideo,isMuxed:E}),t=null),Y()}})},Ed=({segment:n,bytes:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:w,triggerSegmentEventFn:D})=>{let P=new Uint8Array(e);if(qf(P)){n.isFmp4=!0;const{tracks:E}=n.map;if(E.text&&(!E.audio||!E.video)){g(n,{data:P,type:"text"}),fg(n,E.text.codec,y);return}const V={isFmp4:!0,hasVideo:!!E.video,hasAudio:!!E.audio};E.audio&&E.audio.codec&&E.audio.codec!=="enca"&&(V.audioCodec=E.audio.codec),E.video&&E.video.codec&&E.video.codec!=="encv"&&(V.videoCodec=E.video.codec),E.video&&E.audio&&(V.isMuxed=!0),t(n,V);const U=(M,Y)=>{g(n,{data:P,type:V.hasAudio&&!V.isMuxed?"audio":"video"}),Y&&Y.length&&a(n,Y),M&&M.length&&l(n,M),y(null,n,{})};ns({action:"probeMp4StartTime",timescales:n.map.timescales,data:P,transmuxer:n.transmuxer,callback:({data:M,startTime:Y})=>{e=M.buffer,n.bytes=P=M,V.hasAudio&&!V.isMuxed&&i(n,"audio","start",Y),V.hasVideo&&i(n,"video","start",Y),ns({action:"probeEmsgID3",data:P,transmuxer:n.transmuxer,offset:Y,callback:({emsgData:O,id3Frames:Q})=>{if(e=O.buffer,n.bytes=P=O,!E.video||!O.byteLength||!n.transmuxer){U(void 0,Q);return}ns({action:"pushMp4Captions",endAction:"mp4Captions",transmuxer:n.transmuxer,data:P,timescales:n.map.timescales,trackIds:[E.video.id],callback:Ae=>{e=Ae.data.buffer,n.bytes=P=Ae.data,Ae.logs.forEach(function(be){w(Ye(be,{stream:"mp4CaptionParser"}))}),U(Ae.captions,Q)}})}})}});return}if(!n.transmuxer){y(null,n,{});return}if(typeof n.container=="undefined"&&(n.container=Wa(P)),n.container!=="ts"&&n.container!=="aac"){t(n,{hasAudio:!1,hasVideo:!1}),y(null,n,{});return}gg({segment:n,bytes:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:w,triggerSegmentEventFn:D})},Td=function({id:n,key:e,encryptedBytes:t,decryptionWorker:i,segment:s,doneFn:r},a){const l=p=>{if(p.data.source===n){i.removeEventListener("message",l);const g=p.data.decrypted;a(new Uint8Array(g.bytes,g.byteOffset,g.byteLength))}};i.onerror=()=>{const p="An error occurred in the decryption worker",g=bn({segment:s}),y={message:p,metadata:{error:new Error(p),errorType:L.Error.StreamingFailedToDecryptSegment,segmentInfo:g,keyInfo:{uri:s.key.resolvedUri||s.map.key.resolvedUri}}};r(y,s)},i.addEventListener("message",l);let h;e.bytes.slice?h=e.bytes.slice():h=new Uint32Array(Array.prototype.slice.call(e.bytes)),i.postMessage(nd({source:n,encrypted:t,key:h,iv:e.iv}),[t.buffer,h.buffer])},vg=({decryptionWorker:n,segment:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:w,triggerSegmentEventFn:D})=>{D({type:"segmentdecryptionstart"}),Td({id:e.requestId,key:e.key,encryptedBytes:e.encryptedBytes,decryptionWorker:n,segment:e,doneFn:y},P=>{e.bytes=P,D({type:"segmentdecryptioncomplete",segment:e}),Ed({segment:e,bytes:e.bytes,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:w,triggerSegmentEventFn:D})})},Ag=({activeXhrs:n,decryptionWorker:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:w,triggerSegmentEventFn:D})=>{let P=0,E=!1;return(H,V)=>{if(!E){if(H)return E=!0,el(n),y(H,V);if(P+=1,P===n.length){const U=function(){if(V.encryptedBytes)return vg({decryptionWorker:e,segment:V,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:w,triggerSegmentEventFn:D});Ed({segment:V,bytes:V.bytes,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:w,triggerSegmentEventFn:D})};if(V.endOfAllRequests=Date.now(),V.map&&V.map.encryptedBytes&&!V.map.bytes)return D({type:"segmentdecryptionstart",segment:V}),Td({decryptionWorker:e,id:V.requestId+"-init",encryptedBytes:V.map.encryptedBytes,key:V.map.key,segment:V,doneFn:y},M=>{V.map.bytes=M,D({type:"segmentdecryptioncomplete",segment:V}),bd(V,Y=>{if(Y)return el(n),y(Y,V);U()})});U()}}}},yg=({loadendState:n,abortFn:e})=>t=>{t.target.aborted&&e&&!n.calledAbortFn&&(e(),n.calledAbortFn=!0)},_g=({segment:n,progressFn:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g})=>y=>{if(!y.target.aborted)return n.stats=Ye(n.stats,dg(y)),!n.stats.firstBytesReceivedAt&&n.stats.bytesReceived&&(n.stats.firstBytesReceivedAt=Date.now()),e(y,n)},bg=({xhr:n,xhrOptions:e,decryptionWorker:t,segment:i,abortFn:s,progressFn:r,trackInfoFn:a,timingInfoFn:l,videoSegmentTimingInfoFn:h,audioSegmentTimingInfoFn:p,id3Fn:g,captionsFn:y,isEndOfTimeline:w,endedTimelineFn:D,dataFn:P,doneFn:E,onTransmuxerLog:H,triggerSegmentEventFn:V})=>{const U=[],M=Ag({activeXhrs:U,decryptionWorker:t,trackInfoFn:a,timingInfoFn:l,videoSegmentTimingInfoFn:h,audioSegmentTimingInfoFn:p,id3Fn:g,captionsFn:y,isEndOfTimeline:w,endedTimelineFn:D,dataFn:P,doneFn:E,onTransmuxerLog:H,triggerSegmentEventFn:V});if(i.key&&!i.key.bytes){const be=[i.key];i.map&&!i.map.bytes&&i.map.key&&i.map.key.resolvedUri===i.key.resolvedUri&&be.push(i.map.key);const We=Ye(e,{uri:i.key.resolvedUri,responseType:"arraybuffer",requestType:"segment-key"}),At=_d(i,be,M,V),wt={uri:i.key.resolvedUri};V({type:"segmentkeyloadstart",segment:i,keyInfo:wt});const ct=n(We,At);U.push(ct)}if(i.map&&!i.map.bytes){if(i.map.key&&(!i.key||i.key.resolvedUri!==i.map.key.resolvedUri)){const ct=Ye(e,{uri:i.map.key.resolvedUri,responseType:"arraybuffer",requestType:"segment-key"}),we=_d(i,[i.map.key],M,V),Ke={uri:i.map.key.resolvedUri};V({type:"segmentkeyloadstart",segment:i,keyInfo:Ke});const li=n(ct,we);U.push(li)}const We=Ye(e,{uri:i.map.resolvedUri,responseType:"arraybuffer",headers:Ko(i.map),requestType:"segment-media-initialization"}),At=pg({segment:i,finishProcessingFn:M,triggerSegmentEventFn:V});V({type:"segmentloadstart",segment:i});const wt=n(We,At);U.push(wt)}const Y=Ye(e,{uri:i.part&&i.part.resolvedUri||i.resolvedUri,responseType:"arraybuffer",headers:Ko(i),requestType:"segment"}),O=mg({segment:i,finishProcessingFn:M,responseType:Y.responseType,triggerSegmentEventFn:V});V({type:"segmentloadstart",segment:i});const Q=n(Y,O);Q.addEventListener("progress",_g({segment:i,progressFn:r,trackInfoFn:a,timingInfoFn:l,videoSegmentTimingInfoFn:h,audioSegmentTimingInfoFn:p,id3Fn:g,captionsFn:y,isEndOfTimeline:w,endedTimelineFn:D,dataFn:P})),U.push(Q);const Ae={};return U.forEach(be=>{be.addEventListener("loadend",yg({loadendState:Ae,abortFn:s}))}),()=>el(U)},Eg=oi("CodecUtils"),Tg=function(n){const e=n.attributes||{};if(e.CODECS)return W(e.CODECS)},Cd=(n,e)=>{const t=e.attributes||{};return n&&n.mediaGroups&&n.mediaGroups.AUDIO&&t.AUDIO&&n.mediaGroups.AUDIO[t.AUDIO]},Cg=(n,e)=>{if(!Cd(n,e))return!0;const t=e.attributes||{},i=n.mediaGroups.AUDIO[t.AUDIO];for(const s in i)if(!i[s].uri&&!i[s].playlists)return!0;return!1},ia=function(n){const e={};return n.forEach(({mediaType:t,type:i,details:s})=>{e[t]=e[t]||[],e[t].push(ce(`${i}${s}`))}),Object.keys(e).forEach(function(t){if(e[t].length>1){Eg(`multiple ${t} codecs found as attributes: ${e[t].join(", ")}. Setting playlist codecs to null so that we wait for mux.js to probe segments for real codecs.`),e[t]=null;return}e[t]=e[t][0]}),e},xd=function(n){let e=0;return n.audio&&e++,n.video&&e++,e},zs=function(n,e){const t=e.attributes||{},i=ia(Tg(e)||[]);if(Cd(n,e)&&!i.audio&&!Cg(n,e)){const s=ia(ee(n,t.AUDIO)||[]);s.audio&&(i.audio=s.audio)}return i},na=oi("PlaylistSelector"),Sd=function(n){if(!n||!n.playlist)return;const e=n.playlist;return JSON.stringify({id:e.id,bandwidth:n.bandwidth,width:n.width,height:n.height,codecs:e.attributes&&e.attributes.CODECS||""})},sa=function(n,e){if(!n)return"";const t=A().getComputedStyle(n);return t?t[e]:""},ss=function(n,e){const t=n.slice();n.sort(function(i,s){const r=e(i,s);return r===0?t.indexOf(i)-t.indexOf(s):r})},il=function(n,e){let t,i;return n.attributes.BANDWIDTH&&(t=n.attributes.BANDWIDTH),t=t||A().Number.MAX_VALUE,e.attributes.BANDWIDTH&&(i=e.attributes.BANDWIDTH),i=i||A().Number.MAX_VALUE,t-i},xg=function(n,e){let t,i;return n.attributes.RESOLUTION&&n.attributes.RESOLUTION.width&&(t=n.attributes.RESOLUTION.width),t=t||A().Number.MAX_VALUE,e.attributes.RESOLUTION&&e.attributes.RESOLUTION.width&&(i=e.attributes.RESOLUTION.width),i=i||A().Number.MAX_VALUE,t===i&&n.attributes.BANDWIDTH&&e.attributes.BANDWIDTH?n.attributes.BANDWIDTH-e.attributes.BANDWIDTH:t-i};let jd=function(n,e,t,i,s,r){if(!n)return;const a={bandwidth:e,width:t,height:i,limitRenditionByPlayerDimensions:s};let l=n.playlists;qt.isAudioOnly(n)&&(l=r.getAudioTrackPlaylists_(),a.audioOnly=!0);let h=l.map(O=>{let Q;const Ae=O.attributes&&O.attributes.RESOLUTION&&O.attributes.RESOLUTION.width,be=O.attributes&&O.attributes.RESOLUTION&&O.attributes.RESOLUTION.height;return Q=O.attributes&&O.attributes.BANDWIDTH,Q=Q||A().Number.MAX_VALUE,{bandwidth:Q,width:Ae,height:be,playlist:O}});ss(h,(O,Q)=>O.bandwidth-Q.bandwidth),h=h.filter(O=>!qt.isIncompatible(O.playlist));let p=h.filter(O=>qt.isEnabled(O.playlist));p.length||(p=h.filter(O=>!qt.isDisabled(O.playlist)));const g=p.filter(O=>O.bandwidth*jt.BANDWIDTH_VARIANCE<e);let y=g[g.length-1];const w=g.filter(O=>O.bandwidth===y.bandwidth)[0];if(s===!1){const O=w||p[0]||h[0];if(O&&O.playlist){let Q="sortedPlaylistReps";return w&&(Q="bandwidthBestRep"),p[0]&&(Q="enabledPlaylistReps"),na(`choosing ${Sd(O)} using ${Q} with options`,a),O.playlist}return na("could not choose a playlist with options",a),null}const D=g.filter(O=>O.width&&O.height);ss(D,(O,Q)=>O.width-Q.width);const P=D.filter(O=>O.width===t&&O.height===i);y=P[P.length-1];const E=P.filter(O=>O.bandwidth===y.bandwidth)[0];let H,V,U;E||(H=D.filter(O=>O.width>t||O.height>i),V=H.filter(O=>O.width===H[0].width&&O.height===H[0].height),y=V[V.length-1],U=V.filter(O=>O.bandwidth===y.bandwidth)[0]);let M;if(r.leastPixelDiffSelector){const O=D.map(Q=>(Q.pixelDiff=Math.abs(Q.width-t)+Math.abs(Q.height-i),Q));ss(O,(Q,Ae)=>Q.pixelDiff===Ae.pixelDiff?Ae.bandwidth-Q.bandwidth:Q.pixelDiff-Ae.pixelDiff),M=O[0]}const Y=M||U||E||w||p[0]||h[0];if(Y&&Y.playlist){let O="sortedPlaylistReps";return M?O="leastPixelDiffRep":U?O="resolutionPlusOneRep":E?O="resolutionBestRep":w?O="bandwidthBestRep":p[0]&&(O="enabledPlaylistReps"),na(`choosing ${Sd(Y)} using ${O} with options`,a),Y.playlist}return na("could not choose a playlist with options",a),null};const wd=function(){let n=this.useDevicePixelRatio&&A().devicePixelRatio||1;return isNaN(this.customPixelRatio)||(n=this.customPixelRatio),jd(this.playlists.main,this.systemBandwidth,parseInt(sa(this.tech_.el(),"width"),10)*n,parseInt(sa(this.tech_.el(),"height"),10)*n,this.limitRenditionByPlayerDimensions,this.playlistController_)},Sg=function(n){let e=-1,t=-1;if(n<0||n>1)throw new Error("Moving average bandwidth decay must be between 0 and 1.");return function(){let i=this.useDevicePixelRatio&&A().devicePixelRatio||1;return isNaN(this.customPixelRatio)||(i=this.customPixelRatio),e<0&&(e=this.systemBandwidth,t=this.systemBandwidth),this.systemBandwidth>0&&this.systemBandwidth!==t&&(e=n*this.systemBandwidth+(1-n)*e,t=this.systemBandwidth),jd(this.playlists.main,e,parseInt(sa(this.tech_.el(),"width"),10)*i,parseInt(sa(this.tech_.el(),"height"),10)*i,this.limitRenditionByPlayerDimensions,this.playlistController_)}},jg=function(n){const{main:e,currentTime:t,bandwidth:i,duration:s,segmentDuration:r,timeUntilRebuffer:a,currentTimeline:l,syncController:h}=n,p=e.playlists.filter(P=>!qt.isIncompatible(P));let g=p.filter(qt.isEnabled);g.length||(g=p.filter(P=>!qt.isDisabled(P)));const w=g.filter(qt.hasAttribute.bind(null,"BANDWIDTH")).map(P=>{const H=h.getSyncPoint(P,s,l,t)?1:2,U=qt.estimateSegmentRequestTime(r,i,P)*H-a;return{playlist:P,rebufferingImpact:U}}),D=w.filter(P=>P.rebufferingImpact<=0);return ss(D,(P,E)=>il(E.playlist,P.playlist)),D.length?D[0]:(ss(w,(P,E)=>P.rebufferingImpact-E.rebufferingImpact),w[0]||null)},wg=function(){const n=this.playlists.main.playlists.filter(qt.isEnabled);return ss(n,(t,i)=>il(t,i)),n.filter(t=>!!zs(this.playlists.main,t).video)[0]||null},Bg=n=>{let e=0,t;return n.bytes&&(t=new Uint8Array(n.bytes),n.segments.forEach(i=>{t.set(i,e),e+=i.byteLength})),t};function Bd(n){try{return new URL(n).pathname.split("/").slice(-2).join("/")}catch(e){return""}}const Dg=function(n,e,t){if(!n[t]){e.trigger({type:"usage",name:"vhs-608"});let i=t;/^cc708_/.test(t)&&(i="SERVICE"+t.split("_")[1]);const s=e.textTracks().getTrackById(i);if(s)n[t]=s;else{const r=e.options_.vhs&&e.options_.vhs.captionServices||{};let a=t,l=t,h=!1;const p=r[i];p&&(a=p.label,l=p.language,h=p.default),n[t]=e.addRemoteTextTrack({kind:"captions",id:i,default:h,label:a,language:l},!1).track}}},kg=function({inbandTextTracks:n,captionArray:e,timestampOffset:t}){if(!e)return;const i=A().WebKitDataCue||A().VTTCue;e.forEach(s=>{const r=s.stream;s.content?s.content.forEach(a=>{const l=new i(s.startTime+t,s.endTime+t,a.text);l.line=a.line,l.align="left",l.position=a.position,l.positionAlign="line-left",n[r].addCue(l)}):n[r].addCue(new i(s.startTime+t,s.endTime+t,s.text))})},Ig=function(n){Object.defineProperties(n.frame,{id:{get(){return L.log.warn("cue.frame.id is deprecated. Use cue.value.key instead."),n.value.key}},value:{get(){return L.log.warn("cue.frame.value is deprecated. Use cue.value.data instead."),n.value.data}},privateData:{get(){return L.log.warn("cue.frame.privateData is deprecated. Use cue.value.data instead."),n.value.data}}})},Pg=({inbandTextTracks:n,metadataArray:e,timestampOffset:t,videoDuration:i})=>{if(!e)return;const s=A().WebKitDataCue||A().VTTCue,r=n.metadataTrack_;if(!r||(e.forEach(g=>{const y=g.cueTime+t;typeof y!="number"||A().isNaN(y)||y<0||!(y<1/0)||!g.frames||!g.frames.length||g.frames.forEach(w=>{const D=new s(y,y,w.value||w.url||w.data||"");D.frame=w,D.value=w,Ig(D),r.addCue(D)})}),!r.cues||!r.cues.length))return;const a=r.cues,l=[];for(let g=0;g<a.length;g++)a[g]&&l.push(a[g]);const h=l.reduce((g,y)=>{const w=g[y.startTime]||[];return w.push(y),g[y.startTime]=w,g},{}),p=Object.keys(h).sort((g,y)=>Number(g)-Number(y));p.forEach((g,y)=>{const w=h[g],D=isFinite(i)?i:g,P=Number(p[y+1])||D;w.forEach(E=>{E.endTime=P})})},Og={id:"ID",class:"CLASS",startDate:"START-DATE",duration:"DURATION",endDate:"END-DATE",endOnNext:"END-ON-NEXT",plannedDuration:"PLANNED-DURATION",scte35Out:"SCTE35-OUT",scte35In:"SCTE35-IN"},Lg=new Set(["id","class","startDate","duration","endDate","endOnNext","startTime","endTime","processDateRange"]),Rg=({inbandTextTracks:n,dateRanges:e})=>{const t=n.metadataTrack_;if(!t)return;const i=A().WebKitDataCue||A().VTTCue;e.forEach(s=>{for(const r of Object.keys(s)){if(Lg.has(r))continue;const a=new i(s.startTime,s.endTime,"");a.id=s.id,a.type="com.apple.quicktime.HLS",a.value={key:Og[r],data:s[r]},(r==="scte35Out"||r==="scte35In")&&(a.value.data=new Uint8Array(a.value.data.match(/[\da-f]{2}/gi)).buffer),t.addCue(a)}s.processDateRange()})},Dd=(n,e,t)=>{n.metadataTrack_||(n.metadataTrack_=t.addRemoteTextTrack({kind:"metadata",label:"Timed Metadata"},!1).track,L.browser.IS_ANY_SAFARI||(n.metadataTrack_.inBandMetadataTrackDispatchType=e))},Hs=function(n,e,t){let i,s;if(t&&t.cues)for(i=t.cues.length;i--;)s=t.cues[i],s.startTime>=n&&s.endTime<=e&&t.removeCue(s)},Mg=function(n){const e=n.cues;if(!e)return;const t={};for(let i=e.length-1;i>=0;i--){const s=e[i],r=`${s.startTime}-${s.endTime}-${s.text}`;t[r]?n.removeCue(s):t[r]=s}},Ng=(n,e,t)=>{if(typeof e=="undefined"||e===null||!n.length)return[];const i=Math.ceil((e-t+3)*hn.ONE_SECOND_IN_TS);let s;for(s=0;s<n.length&&!(n[s].pts>i);s++);return n.slice(s)},Ug=(n,e,t)=>{if(!e.length)return n;if(t)return e.slice();const i=e[0].pts;let s=0;for(s;s<n.length&&!(n[s].pts>=i);s++);return n.slice(0,s).concat(e)},Fg=(n,e,t,i)=>{const s=Math.ceil((e-i)*hn.ONE_SECOND_IN_TS),r=Math.ceil((t-i)*hn.ONE_SECOND_IN_TS),a=n.slice();let l=n.length;for(;l--&&!(n[l].pts<=r););if(l===-1)return a;let h=l+1;for(;h--&&!(n[h].pts<=s););return h=Math.max(h,0),a.splice(h,l-h+1),a},Vg=function(n,e){if(!n&&!e||!n&&e||n&&!e)return!1;if(n===e)return!0;const t=Object.keys(n).sort(),i=Object.keys(e).sort();if(t.length!==i.length)return!1;for(let s=0;s<t.length;s++){const r=t[s];if(r!==i[s]||n[r]!==e[r])return!1}return!0},zg=function(n,e,t){e=e||[];const i=[];let s=0;for(let r=0;r<e.length;r++){const a=e[r];if(n===a.timeline&&(i.push(r),s+=a.duration,s>t))return r}return i.length===0?0:i[i.length-1]},qs=1,Hg=500,kd=n=>typeof n=="number"&&isFinite(n),ra=1/60,qg=(n,e,t)=>n!=="main"||!e||!t?null:!t.hasAudio&&!t.hasVideo?"Neither audio nor video found in segment.":e.hasVideo&&!t.hasVideo?"Only audio found in segment when we expected video. We can't switch to audio only from a stream that had video. To get rid of this message, please add codec information to the manifest.":!e.hasVideo&&t.hasVideo?"Video found in segment when we expected only audio. We can't switch to a stream with video from an audio only stream. To get rid of this message, please add codec information to the manifest.":null,Wg=(n,e,t)=>{let i=e-jt.BACK_BUFFER_LENGTH;n.length&&(i=Math.max(i,n.start(0)));const s=e-t;return Math.min(s,i)},rs=n=>{const{startOfSegment:e,duration:t,segment:i,part:s,playlist:{mediaSequence:r,id:a,segments:l=[]},mediaIndex:h,partIndex:p,timeline:g}=n,y=l.length-1;let w="mediaIndex/partIndex increment";n.getMediaInfoForTime?w=`getMediaInfoForTime (${n.getMediaInfoForTime})`:n.isSyncRequest&&(w="getSyncSegmentCandidate (isSyncRequest)"),n.independent&&(w+=` with independent ${n.independent}`);const D=typeof p=="number",P=n.segment.uri?"segment":"pre-segment",E=D?Nc({preloadSegment:i})-1:0;return`${P} [${r+h}/${r+y}]`+(D?` part [${p}/${E}]`:"")+` segment start/end [${i.start} => ${i.end}]`+(D?` part start/end [${s.start} => ${s.end}]`:"")+` startOfSegment [${e}] duration [${t}] timeline [${g}] selected by [${w}] playlist [${a}]`},Id=n=>`${n}TimingInfo`,$g=({segmentTimeline:n,currentTimeline:e,startOfSegment:t,buffered:i,overrideCheck:s})=>!s&&n===e?null:n<e?t:i.length?i.end(i.length-1):t,nl=({timelineChangeController:n,currentTimeline:e,segmentTimeline:t,loaderType:i,audioDisabled:s})=>{if(e===t)return!1;if(i==="audio"){const r=n.lastTimelineChange({type:"main"});return!r||r.to!==t}if(i==="main"&&s){const r=n.pendingTimelineChange({type:"audio"});return!(r&&r.to===t)}return!1},Gg=n=>{if(!n)return!1;const e=n.pendingTimelineChange({type:"audio"}),t=n.pendingTimelineChange({type:"main"}),i=e&&t,s=i&&e.to!==t.to;return!!(i&&e.from!==-1&&t.from!==-1&&s)},Yg=n=>{const e=n.timelineChangeController_.pendingTimelineChange({type:"audio"}),t=n.timelineChangeController_.pendingTimelineChange({type:"main"});return e&&t&&e.to<t.to},en=n=>{const e=n.pendingSegment_;if(!e)return;if(nl({timelineChangeController:n.timelineChangeController_,currentTimeline:n.currentTimeline_,segmentTimeline:e.timeline,loaderType:n.loaderType_,audioDisabled:n.audioDisabled_})&&Gg(n.timelineChangeController_)){if(Yg(n)){n.timelineChangeController_.trigger("audioTimelineBehind");return}n.timelineChangeController_.trigger("fixBadTimelineChange")}},Xg=n=>{let e=0;return["video","audio"].forEach(function(t){const i=n[`${t}TimingInfo`];if(!i)return;const{start:s,end:r}=i;let a;typeof s=="bigint"||typeof r=="bigint"?a=A().BigInt(r)-A().BigInt(s):typeof s=="number"&&typeof r=="number"&&(a=r-s),typeof a!="undefined"&&a>e&&(e=a)}),typeof e=="bigint"&&e<Number.MAX_SAFE_INTEGER&&(e=Number(e)),e},Pd=({segmentDuration:n,maxDuration:e})=>n?Math.round(n)>e+ji:!1,Kg=(n,e)=>{if(e!=="hls")return null;const t=Xg({audioTimingInfo:n.audioTimingInfo,videoTimingInfo:n.videoTimingInfo});if(!t)return null;const i=n.playlist.targetDuration,s=Pd({segmentDuration:t,maxDuration:i*2}),r=Pd({segmentDuration:t,maxDuration:i}),a=`Segment with index ${n.mediaIndex} from playlist ${n.playlist.id} has a duration of ${t} when the reported duration is ${n.duration} and the target duration is ${i}. For HLS content, a duration in excess of the target duration may result in playback issues. See the HLS specification section on EXT-X-TARGETDURATION for more details: https://tools.ietf.org/html/draft-pantos-http-live-streaming-23#section-4.3.3.1`;return s||r?{severity:s?"warn":"info",message:a}:null},bn=({type:n,segment:e})=>{if(!e)return;const t=!!(e.key||e.map&&e.map.ke),i=!!(e.map&&!e.map.bytes),s=e.startOfSegment===void 0?e.start:e.startOfSegment;return{type:n||e.type,uri:e.resolvedUri||e.uri,start:s,duration:e.duration,isEncrypted:t,isMediaInitialization:i}};class sl extends L.EventTarget{constructor(e,t={}){if(super(),!e)throw new TypeError("Initialization settings are required");if(typeof e.currentTime!="function")throw new TypeError("No currentTime getter specified");if(!e.mediaSource)throw new TypeError("No MediaSource specified");this.bandwidth=e.bandwidth,this.throughput={rate:0,count:0},this.roundTrip=NaN,this.resetStats_(),this.mediaIndex=null,this.partIndex=null,this.hasPlayed_=e.hasPlayed,this.currentTime_=e.currentTime,this.seekable_=e.seekable,this.seeking_=e.seeking,this.duration_=e.duration,this.mediaSource_=e.mediaSource,this.vhs_=e.vhs,this.loaderType_=e.loaderType,this.currentMediaInfo_=void 0,this.startingMediaInfo_=void 0,this.segmentMetadataTrack_=e.segmentMetadataTrack,this.goalBufferLength_=e.goalBufferLength,this.sourceType_=e.sourceType,this.sourceUpdater_=e.sourceUpdater,this.inbandTextTracks_=e.inbandTextTracks,this.state_="INIT",this.timelineChangeController_=e.timelineChangeController,this.shouldSaveSegmentTimingInfo_=!0,this.parse708captions_=e.parse708captions,this.useDtsForTimestampOffset_=e.useDtsForTimestampOffset,this.captionServices_=e.captionServices,this.exactManifestTimings=e.exactManifestTimings,this.addMetadataToTextTrack=e.addMetadataToTextTrack,this.checkBufferTimeout_=null,this.error_=void 0,this.currentTimeline_=-1,this.shouldForceTimestampOffsetAfterResync_=!1,this.pendingSegment_=null,this.xhrOptions_=null,this.pendingSegments_=[],this.audioDisabled_=!1,this.isPendingTimestampOffset_=!1,this.gopBuffer_=[],this.timeMapping_=0,this.safeAppend_=!1,this.appendInitSegment_={audio:!0,video:!0},this.playlistOfLastInitSegment_={audio:null,video:null},this.callQueue_=[],this.loadQueue_=[],this.metadataQueue_={id3:[],caption:[]},this.waitingOnRemove_=!1,this.quotaExceededErrorRetryTimeout_=null,this.activeInitSegmentId_=null,this.initSegments_={},this.cacheEncryptionKeys_=e.cacheEncryptionKeys,this.keyCache_={},this.decrypter_=e.decrypter,this.syncController_=e.syncController,this.syncPoint_={segmentIndex:0,time:0},this.transmuxer_=this.createTransmuxer_(),this.triggerSyncInfoUpdate_=()=>this.trigger("syncinfoupdate"),this.syncController_.on("syncinfoupdate",this.triggerSyncInfoUpdate_),this.mediaSource_.addEventListener("sourceopen",()=>{this.isEndOfStream_()||(this.ended_=!1)}),this.fetchAtBuffer_=!1,this.logger_=oi(`SegmentLoader[${this.loaderType_}]`),Object.defineProperty(this,"state",{get(){return this.state_},set(i){i!==this.state_&&(this.logger_(`${this.state_} -> ${i}`),this.state_=i,this.trigger("statechange"))}}),this.sourceUpdater_.on("ready",()=>{this.hasEnoughInfoToAppend_()?this.processCallQueue_():en(this)}),this.sourceUpdater_.on("codecschange",i=>{this.trigger((0,ge.A)({type:"codecschange"},i))}),this.loaderType_==="main"&&this.timelineChangeController_.on("pendingtimelinechange",()=>{this.hasEnoughInfoToAppend_()?this.processCallQueue_():en(this)}),this.loaderType_==="audio"&&this.timelineChangeController_.on("timelinechange",i=>{this.trigger((0,ge.A)({type:"timelinechange"},i)),this.hasEnoughInfoToLoad_()?this.processLoadQueue_():en(this),this.hasEnoughInfoToAppend_()?this.processCallQueue_():en(this)})}get mediaSequenceSync_(){return this.syncController_.getMediaSequenceSync(this.loaderType_)}createTransmuxer_(){return Zo.createTransmuxer({remux:!1,alignGopsAtEnd:this.safeAppend_,keepOriginalTimestamps:!0,parse708captions:this.parse708captions_,captionServices:this.captionServices_})}resetStats_(){this.mediaBytesTransferred=0,this.mediaRequests=0,this.mediaRequestsAborted=0,this.mediaRequestsTimedout=0,this.mediaRequestsErrored=0,this.mediaTransferDuration=0,this.mediaSecondsLoaded=0,this.mediaAppends=0}dispose(){this.trigger("dispose"),this.state="DISPOSED",this.pause(),this.abort_(),this.transmuxer_&&this.transmuxer_.terminate(),this.resetStats_(),this.checkBufferTimeout_&&A().clearTimeout(this.checkBufferTimeout_),this.syncController_&&this.triggerSyncInfoUpdate_&&this.syncController_.off("syncinfoupdate",this.triggerSyncInfoUpdate_),this.off()}setAudio(e){this.audioDisabled_=!e,e?this.appendInitSegment_.audio=!0:this.sourceUpdater_.removeAudio(0,this.duration_())}abort(){if(this.state!=="WAITING"){this.pendingSegment_&&(this.pendingSegment_=null),this.timelineChangeController_.clearPendingTimelineChange(this.loaderType_);return}this.abort_(),this.state="READY",this.paused()||this.monitorBuffer_()}abort_(){this.pendingSegment_&&this.pendingSegment_.abortRequests&&this.pendingSegment_.abortRequests(),this.pendingSegment_=null,this.callQueue_=[],this.loadQueue_=[],this.metadataQueue_.id3=[],this.metadataQueue_.caption=[],this.timelineChangeController_.clearPendingTimelineChange(this.loaderType_),this.waitingOnRemove_=!1,A().clearTimeout(this.quotaExceededErrorRetryTimeout_),this.quotaExceededErrorRetryTimeout_=null}checkForAbort_(e){return this.state==="APPENDING"&&!this.pendingSegment_?(this.state="READY",!0):!this.pendingSegment_||this.pendingSegment_.requestId!==e}error(e){return typeof e!="undefined"&&(this.logger_("error occurred:",e),this.error_=e),this.pendingSegment_=null,this.error_}endOfStream(){this.ended_=!0,this.transmuxer_&&Zo.reset(this.transmuxer_),this.gopBuffer_.length=0,this.pause(),this.trigger("ended")}buffered_(){const e=this.getMediaInfo_();if(!this.sourceUpdater_||!e)return St();if(this.loaderType_==="main"){const{hasAudio:t,hasVideo:i,isMuxed:s}=e;if(i&&t&&!this.audioDisabled_&&!s)return this.sourceUpdater_.buffered();if(i)return this.sourceUpdater_.videoBuffered()}return this.sourceUpdater_.audioBuffered()}initSegmentForMap(e,t=!1){if(!e)return null;const i=ta(e);let s=this.initSegments_[i];return t&&!s&&e.bytes&&(this.initSegments_[i]=s={resolvedUri:e.resolvedUri,byterange:e.byterange,bytes:e.bytes,tracks:e.tracks,timescales:e.timescales}),s||e}segmentKey(e,t=!1){if(!e)return null;const i=sd(e);let s=this.keyCache_[i];this.cacheEncryptionKeys_&&t&&!s&&e.bytes&&(this.keyCache_[i]=s={resolvedUri:e.resolvedUri,bytes:e.bytes});const r={resolvedUri:(s||e).resolvedUri};return s&&(r.bytes=s.bytes),r}couldBeginLoading_(){return this.playlist_&&!this.paused()}load(){if(this.monitorBuffer_(),!!this.playlist_){if(this.state==="INIT"&&this.couldBeginLoading_())return this.init_();!this.couldBeginLoading_()||this.state!=="READY"&&this.state!=="INIT"||(this.state="READY")}}init_(){return this.state="READY",this.resetEverything(),this.monitorBuffer_()}playlist(e,t={}){if(!e||this.playlist_&&this.playlist_.endList&&e.endList&&this.playlist_.uri===e.uri)return;const i=this.playlist_,s=this.pendingSegment_;this.playlist_=e,this.xhrOptions_=t,this.state==="INIT"&&(e.syncInfo={mediaSequence:e.mediaSequence,time:0},this.loaderType_==="main"&&this.syncController_.setDateTimeMappingForStart(e));let r=null;if(i&&(i.id?r=i.id:i.uri&&(r=i.uri)),this.logger_(`playlist update [${r} => ${e.id||e.uri}]`),this.mediaSequenceSync_&&(this.mediaSequenceSync_.update(e,this.currentTime_()),this.logger_(`Playlist update:
currentTime: ${this.currentTime_()}
bufferedEnd: ${Fo(this.buffered_())}
`,this.mediaSequenceSync_.diagnostics)),this.trigger("syncinfoupdate"),this.state==="INIT"&&this.couldBeginLoading_())return this.init_();if(!i||i.uri!==e.uri){this.mediaIndex!==null&&(!e.endList&&typeof e.partTargetDuration=="number"?this.resetLoader():this.resyncLoader()),this.currentMediaInfo_=void 0,this.trigger("playlistupdate");return}const a=e.mediaSequence-i.mediaSequence;if(this.logger_(`live window shift [${a}]`),this.mediaIndex!==null)if(this.mediaIndex-=a,this.mediaIndex<0)this.mediaIndex=null,this.partIndex=null;else{const l=this.playlist_.segments[this.mediaIndex];if(this.partIndex&&(!l.parts||!l.parts.length||!l.parts[this.partIndex])){const h=this.mediaIndex;this.logger_(`currently processing part (index ${this.partIndex}) no longer exists.`),this.resetLoader(),this.mediaIndex=h}}s&&(s.mediaIndex-=a,s.mediaIndex<0?(s.mediaIndex=null,s.partIndex=null):(s.mediaIndex>=0&&(s.segment=e.segments[s.mediaIndex]),s.partIndex>=0&&s.segment.parts&&(s.part=s.segment.parts[s.partIndex]))),this.syncController_.saveExpiredSegmentInfo(i,e)}pause(){this.checkBufferTimeout_&&(A().clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=null)}paused(){return this.checkBufferTimeout_===null}resetEverything(e){this.ended_=!1,this.activeInitSegmentId_=null,this.appendInitSegment_={audio:!0,video:!0},this.resetLoader(),this.remove(0,1/0,e),this.transmuxer_&&(this.transmuxer_.postMessage({action:"clearAllMp4Captions"}),this.transmuxer_.postMessage({action:"reset"}))}resetLoader(){this.fetchAtBuffer_=!1,this.mediaSequenceSync_&&this.mediaSequenceSync_.resetAppendedStatus(),this.resyncLoader()}resyncLoader(){this.transmuxer_&&Zo.reset(this.transmuxer_),this.mediaIndex=null,this.partIndex=null,this.syncPoint_=null,this.isPendingTimestampOffset_=!1;const e=this.currentMediaInfo_&&this.currentMediaInfo_.isFmp4;this.sourceType_==="hls"&&!e&&(this.shouldForceTimestampOffsetAfterResync_=!0),this.callQueue_=[],this.loadQueue_=[],this.metadataQueue_.id3=[],this.metadataQueue_.caption=[],this.abort(),this.transmuxer_&&this.transmuxer_.postMessage({action:"clearParsedMp4Captions"})}remove(e,t,i=()=>{},s=!1){if(t===1/0&&(t=this.duration_()),t<=e){this.logger_("skipping remove because end ${end} is <= start ${start}");return}if(!this.sourceUpdater_||!this.getMediaInfo_()){this.logger_("skipping remove because no source updater or starting media info");return}let r=1;const a=()=>{r--,r===0&&i()};(s||!this.audioDisabled_)&&(r++,this.sourceUpdater_.removeAudio(e,t,a)),(s||this.loaderType_==="main")&&(this.gopBuffer_=Fg(this.gopBuffer_,e,t,this.timeMapping_),r++,this.sourceUpdater_.removeVideo(e,t,a));for(const l in this.inbandTextTracks_)Hs(e,t,this.inbandTextTracks_[l]);Hs(e,t,this.segmentMetadataTrack_),a()}monitorBuffer_(){this.checkBufferTimeout_&&A().clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=A().setTimeout(this.monitorBufferTick_.bind(this),1)}monitorBufferTick_(){this.state==="READY"&&this.fillBuffer_(),this.checkBufferTimeout_&&A().clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=A().setTimeout(this.monitorBufferTick_.bind(this),Hg)}fillBuffer_(){if(this.sourceUpdater_.updating())return;const e=this.chooseNextRequest_();if(!e)return;const t={segmentInfo:bn({type:this.loaderType_,segment:e})};this.trigger({type:"segmentselected",metadata:t}),typeof e.timestampOffset=="number"&&(this.isPendingTimestampOffset_=!1,this.timelineChangeController_.pendingTimelineChange({type:this.loaderType_,from:this.currentTimeline_,to:e.timeline})),this.loadSegment_(e)}isEndOfStream_(e=this.mediaIndex,t=this.playlist_,i=this.partIndex){if(!t||!this.mediaSource_)return!1;const s=typeof e=="number"&&t.segments[e],r=e+1===t.segments.length,a=!s||!s.parts||i+1===s.parts.length;return t.endList&&this.mediaSource_.readyState==="open"&&r&&a}chooseNextRequest_(){const e=this.buffered_(),t=Fo(e)||0,i=Vo(e,this.currentTime_()),s=!this.hasPlayed_()&&i>=1,r=i>=this.goalBufferLength_(),a=this.playlist_.segments;if(!a.length||s||r)return null;this.syncPoint_=this.syncPoint_||this.syncController_.getSyncPoint(this.playlist_,this.duration_(),this.currentTimeline_,this.currentTime_(),this.loaderType_);const l={partIndex:null,mediaIndex:null,startOfSegment:null,playlist:this.playlist_,isSyncRequest:!this.syncPoint_};if(l.isSyncRequest)l.mediaIndex=zg(this.currentTimeline_,a,t),this.logger_(`choose next request. Can not find sync point. Fallback to media Index: ${l.mediaIndex}`);else if(this.mediaIndex!==null){const w=a[this.mediaIndex],D=typeof this.partIndex=="number"?this.partIndex:-1;l.startOfSegment=w.end?w.end:t,w.parts&&w.parts[D+1]?(l.mediaIndex=this.mediaIndex,l.partIndex=D+1):l.mediaIndex=this.mediaIndex+1}else{let w,D,P;const E=this.fetchAtBuffer_?t:this.currentTime_();if(this.mediaSequenceSync_&&this.logger_(`chooseNextRequest_ request after Quality Switch:
For TargetTime: ${E}.
CurrentTime: ${this.currentTime_()}
BufferedEnd: ${t}
Fetch At Buffer: ${this.fetchAtBuffer_}
`,this.mediaSequenceSync_.diagnostics),this.mediaSequenceSync_&&this.mediaSequenceSync_.isReliable){const H=this.getSyncInfoFromMediaSequenceSync_(E);if(!H){const V="No sync info found while using media sequence sync";return this.error({message:V,metadata:{errorType:L.Error.StreamingFailedToSelectNextSegment,error:new Error(V)}}),this.logger_("chooseNextRequest_ - no sync info found using media sequence sync"),null}this.logger_(`chooseNextRequest_ mediaSequence syncInfo (${H.start} --> ${H.end})`),w=H.segmentIndex,D=H.partIndex,P=H.start}else{this.logger_("chooseNextRequest_ - fallback to a regular segment selection algorithm, based on a syncPoint.");const H=qt.getMediaInfoForTime({exactManifestTimings:this.exactManifestTimings,playlist:this.playlist_,currentTime:E,startingPartIndex:this.syncPoint_.partIndex,startingSegmentIndex:this.syncPoint_.segmentIndex,startTime:this.syncPoint_.time});w=H.segmentIndex,D=H.partIndex,P=H.startTime}l.getMediaInfoForTime=this.fetchAtBuffer_?`bufferedEnd ${E}`:`currentTime ${E}`,l.mediaIndex=w,l.startOfSegment=P,l.partIndex=D,this.logger_(`choose next request. Playlist switched and we have a sync point. Media Index: ${l.mediaIndex} `)}const h=a[l.mediaIndex];let p=h&&typeof l.partIndex=="number"&&h.parts&&h.parts[l.partIndex];if(!h||typeof l.partIndex=="number"&&!p)return null;typeof l.partIndex!="number"&&h.parts&&(l.partIndex=0,p=h.parts[0]);const g=this.vhs_.playlists&&this.vhs_.playlists.main&&this.vhs_.playlists.main.independentSegments||this.playlist_.independentSegments;if(!i&&p&&!g&&!p.independent)if(l.partIndex===0){const w=a[l.mediaIndex-1],D=w.parts&&w.parts.length&&w.parts[w.parts.length-1];D&&D.independent&&(l.mediaIndex-=1,l.partIndex=w.parts.length-1,l.independent="previous segment")}else h.parts[l.partIndex-1].independent&&(l.partIndex-=1,l.independent="previous part");const y=this.mediaSource_&&this.mediaSource_.readyState==="ended";return l.mediaIndex>=a.length-1&&y&&!this.seeking_()?null:(this.shouldForceTimestampOffsetAfterResync_&&(this.shouldForceTimestampOffsetAfterResync_=!1,l.forceTimestampOffset=!0,this.logger_("choose next request. Force timestamp offset after loader resync")),this.generateSegmentInfo_(l))}getSyncInfoFromMediaSequenceSync_(e){if(!this.mediaSequenceSync_)return null;const t=Math.max(e,this.mediaSequenceSync_.start);e!==t&&this.logger_(`getSyncInfoFromMediaSequenceSync_. Pulled target time from ${e} to ${t}`);const i=this.mediaSequenceSync_.getSyncInfoForTime(t);if(!i)return null;if(!i.isAppended)return i;const s=this.mediaSequenceSync_.getSyncInfoForTime(i.end);return s?(s.isAppended&&this.logger_("getSyncInfoFromMediaSequenceSync_: We encounter unexpected scenario where next media sequence sync info is also appended!"),s):null}generateSegmentInfo_(e){const{independent:t,playlist:i,mediaIndex:s,startOfSegment:r,isSyncRequest:a,partIndex:l,forceTimestampOffset:h,getMediaInfoForTime:p}=e,g=i.segments[s],y=typeof l=="number"&&g.parts[l],w={requestId:"segment-loader-"+Math.random(),uri:y&&y.resolvedUri||g.resolvedUri,mediaIndex:s,partIndex:y?l:null,isSyncRequest:a,startOfSegment:r,playlist:i,bytes:null,encryptedBytes:null,timestampOffset:null,timeline:g.timeline,duration:y&&y.duration||g.duration,segment:g,part:y,byteLength:0,transmuxer:this.transmuxer_,getMediaInfoForTime:p,independent:t},D=typeof h!="undefined"?h:this.isPendingTimestampOffset_;w.timestampOffset=this.timestampOffsetForSegment_({segmentTimeline:g.timeline,currentTimeline:this.currentTimeline_,startOfSegment:r,buffered:this.buffered_(),overrideCheck:D});const P=Fo(this.sourceUpdater_.audioBuffered());return typeof P=="number"&&(w.audioAppendStart=P-this.sourceUpdater_.audioTimestampOffset()),this.sourceUpdater_.videoBuffered().length&&(w.gopsToAlignWith=Ng(this.gopBuffer_,this.currentTime_()-this.sourceUpdater_.videoTimestampOffset(),this.timeMapping_)),w}timestampOffsetForSegment_(e){return $g(e)}earlyAbortWhenNeeded_(e){if(this.vhs_.tech_.paused()||!this.xhrOptions_.timeout||!this.playlist_.attributes.BANDWIDTH||Date.now()-(e.firstBytesReceivedAt||Date.now())<1e3)return;const t=this.currentTime_(),i=e.bandwidth,s=this.pendingSegment_.duration,r=qt.estimateSegmentRequestTime(s,i,this.playlist_,e.bytesReceived),a=gm(this.buffered_(),t,this.vhs_.tech_.playbackRate())-1;if(r<=a)return;const l=jg({main:this.vhs_.playlists.main,currentTime:t,bandwidth:i,duration:this.duration_(),segmentDuration:s,timeUntilRebuffer:a,currentTimeline:this.currentTimeline_,syncController:this.syncController_});if(!l)return;const p=r-a-l.rebufferingImpact;let g=.5;a<=ji&&(g=1),!(!l.playlist||l.playlist.uri===this.playlist_.uri||p<g)&&(this.bandwidth=l.playlist.attributes.BANDWIDTH*jt.BANDWIDTH_VARIANCE+1,this.trigger("earlyabort"))}handleAbort_(e){this.logger_(`Aborting ${rs(e)}`),this.mediaRequestsAborted+=1}handleProgress_(e,t){this.earlyAbortWhenNeeded_(t.stats),!this.checkForAbort_(t.requestId)&&this.trigger("progress")}handleTrackInfo_(e,t){const{hasAudio:i,hasVideo:s}=t,r={segmentInfo:bn({type:this.loaderType_,segment:e}),trackInfo:{hasAudio:i,hasVideo:s}};this.trigger({type:"segmenttransmuxingtrackinfoavailable",metadata:r}),this.earlyAbortWhenNeeded_(e.stats),!this.checkForAbort_(e.requestId)&&(this.checkForIllegalMediaSwitch(t)||(t=t||{},Vg(this.currentMediaInfo_,t)||(this.appendInitSegment_={audio:!0,video:!0},this.startingMediaInfo_=t,this.currentMediaInfo_=t,this.logger_("trackinfo update",t),this.trigger("trackinfo")),!this.checkForAbort_(e.requestId)&&(this.pendingSegment_.trackInfo=t,this.hasEnoughInfoToAppend_()?this.processCallQueue_():en(this))))}handleTimingInfo_(e,t,i,s){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;const r=this.pendingSegment_,a=Id(t);r[a]=r[a]||{},r[a][i]=s,this.logger_(`timinginfo: ${t} - ${i} - ${s}`),this.hasEnoughInfoToAppend_()?this.processCallQueue_():en(this)}handleCaptions_(e,t){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;if(t.length===0){this.logger_("SegmentLoader received no captions from a caption event");return}if(!this.pendingSegment_.hasAppendedData_){this.metadataQueue_.caption.push(this.handleCaptions_.bind(this,e,t));return}const s=this.sourceUpdater_.videoTimestampOffset()===null?this.sourceUpdater_.audioTimestampOffset():this.sourceUpdater_.videoTimestampOffset(),r={};t.forEach(a=>{r[a.stream]=r[a.stream]||{startTime:1/0,captions:[],endTime:0};const l=r[a.stream];l.startTime=Math.min(l.startTime,a.startTime+s),l.endTime=Math.max(l.endTime,a.endTime+s),l.captions.push(a)}),Object.keys(r).forEach(a=>{const{startTime:l,endTime:h,captions:p}=r[a],g=this.inbandTextTracks_;this.logger_(`adding cues from ${l} -> ${h} for ${a}`),Dg(g,this.vhs_.tech_,a),Hs(l,h,g[a]),kg({captionArray:p,inbandTextTracks:g,timestampOffset:s})}),this.transmuxer_&&this.transmuxer_.postMessage({action:"clearParsedMp4Captions"})}handleId3_(e,t,i){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;if(!this.pendingSegment_.hasAppendedData_){this.metadataQueue_.id3.push(this.handleId3_.bind(this,e,t,i));return}this.addMetadataToTextTrack(i,t,this.duration_())}processMetadataQueue_(){this.metadataQueue_.id3.forEach(e=>e()),this.metadataQueue_.caption.forEach(e=>e()),this.metadataQueue_.id3=[],this.metadataQueue_.caption=[]}processCallQueue_(){const e=this.callQueue_;this.callQueue_=[],e.forEach(t=>t())}processLoadQueue_(){const e=this.loadQueue_;this.loadQueue_=[],e.forEach(t=>t())}hasEnoughInfoToLoad_(){if(this.loaderType_!=="audio")return!0;const e=this.pendingSegment_;return e?this.getCurrentMediaInfo_()?!nl({timelineChangeController:this.timelineChangeController_,currentTimeline:this.currentTimeline_,segmentTimeline:e.timeline,loaderType:this.loaderType_,audioDisabled:this.audioDisabled_}):!0:!1}getCurrentMediaInfo_(e=this.pendingSegment_){return e&&e.trackInfo||this.currentMediaInfo_}getMediaInfo_(e=this.pendingSegment_){return this.getCurrentMediaInfo_(e)||this.startingMediaInfo_}getPendingSegmentPlaylist(){return this.pendingSegment_?this.pendingSegment_.playlist:null}hasEnoughInfoToAppend_(){if(!this.sourceUpdater_.ready()||this.waitingOnRemove_||this.quotaExceededErrorRetryTimeout_)return!1;const e=this.pendingSegment_,t=this.getCurrentMediaInfo_();if(!e||!t)return!1;const{hasAudio:i,hasVideo:s,isMuxed:r}=t;return!(s&&!e.videoTimingInfo||i&&!this.audioDisabled_&&!r&&!e.audioTimingInfo||nl({timelineChangeController:this.timelineChangeController_,currentTimeline:this.currentTimeline_,segmentTimeline:e.timeline,loaderType:this.loaderType_,audioDisabled:this.audioDisabled_}))}handleData_(e,t){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;if(this.callQueue_.length||!this.hasEnoughInfoToAppend_()){en(this),this.callQueue_.push(this.handleData_.bind(this,e,t));return}const i=this.pendingSegment_;if(this.setTimeMapping_(i.timeline),this.updateMediaSecondsLoaded_(i.part||i.segment),this.mediaSource_.readyState!=="closed"){if(e.map&&(e.map=this.initSegmentForMap(e.map,!0),i.segment.map=e.map),e.key&&this.segmentKey(e.key,!0),i.isFmp4=e.isFmp4,i.timingInfo=i.timingInfo||{},i.isFmp4)this.trigger("fmp4"),i.timingInfo.start=i[Id(t.type)].start;else{const s=this.getCurrentMediaInfo_(),r=this.loaderType_==="main"&&s&&s.hasVideo;let a;r&&(a=i.videoTimingInfo.start),i.timingInfo.start=this.trueSegmentStart_({currentStart:i.timingInfo.start,playlist:i.playlist,mediaIndex:i.mediaIndex,currentVideoTimestampOffset:this.sourceUpdater_.videoTimestampOffset(),useVideoTimingInfo:r,firstVideoFrameTimeForData:a,videoTimingInfo:i.videoTimingInfo,audioTimingInfo:i.audioTimingInfo})}if(this.updateAppendInitSegmentStatus(i,t.type),this.updateSourceBufferTimestampOffset_(i),i.isSyncRequest){this.updateTimingInfoEnd_(i),this.syncController_.saveSegmentTimingInfo({segmentInfo:i,shouldSaveTimelineMapping:this.loaderType_==="main"});const s=this.chooseNextRequest_();if(s.mediaIndex!==i.mediaIndex||s.partIndex!==i.partIndex){this.logger_("sync segment was incorrect, not appending");return}this.logger_("sync segment was correct, appending")}i.hasAppendedData_=!0,this.processMetadataQueue_(),this.appendData_(i,t)}}updateAppendInitSegmentStatus(e,t){this.loaderType_==="main"&&typeof e.timestampOffset=="number"&&!e.changedTimestampOffset&&(this.appendInitSegment_={audio:!0,video:!0}),this.playlistOfLastInitSegment_[t]!==e.playlist&&(this.appendInitSegment_[t]=!0)}getInitSegmentAndUpdateState_({type:e,initSegment:t,map:i,playlist:s}){if(i){const r=ta(i);if(this.activeInitSegmentId_===r)return null;t=this.initSegmentForMap(i,!0).bytes,this.activeInitSegmentId_=r}return t&&this.appendInitSegment_[e]?(this.playlistOfLastInitSegment_[e]=s,this.appendInitSegment_[e]=!1,this.activeInitSegmentId_=null,t):null}handleQuotaExceededError_({segmentInfo:e,type:t,bytes:i},s){const r=this.sourceUpdater_.audioBuffered(),a=this.sourceUpdater_.videoBuffered();r.length>1&&this.logger_("On QUOTA_EXCEEDED_ERR, found gaps in the audio buffer: "+yn(r).join(", ")),a.length>1&&this.logger_("On QUOTA_EXCEEDED_ERR, found gaps in the video buffer: "+yn(a).join(", "));const l=r.length?r.start(0):0,h=r.length?r.end(r.length-1):0,p=a.length?a.start(0):0,g=a.length?a.end(a.length-1):0;if(h-l<=qs&&g-p<=qs){this.logger_(`On QUOTA_EXCEEDED_ERR, single segment too large to append to buffer, triggering an error. Appended byte length: ${i.byteLength}, audio buffer: ${yn(r).join(", ")}, video buffer: ${yn(a).join(", ")}, `),this.error({message:"Quota exceeded error with append of a single segment of content",excludeUntil:1/0}),this.trigger("error");return}this.waitingOnRemove_=!0,this.callQueue_.push(this.appendToSourceBuffer_.bind(this,{segmentInfo:e,type:t,bytes:i}));const w=this.currentTime_()-qs;this.logger_(`On QUOTA_EXCEEDED_ERR, removing audio/video from 0 to ${w}`),this.remove(0,w,()=>{this.logger_(`On QUOTA_EXCEEDED_ERR, retrying append in ${qs}s`),this.waitingOnRemove_=!1,this.quotaExceededErrorRetryTimeout_=A().setTimeout(()=>{this.logger_("On QUOTA_EXCEEDED_ERR, re-processing call queue"),this.quotaExceededErrorRetryTimeout_=null,this.processCallQueue_()},qs*1e3)},!0)}handleAppendError_({segmentInfo:e,type:t,bytes:i},s){if(s){if(s.code===Qc){this.handleQuotaExceededError_({segmentInfo:e,type:t,bytes:i});return}this.logger_("Received non QUOTA_EXCEEDED_ERR on append",s),this.error({message:`${t} append of ${i.length}b failed for segment #${e.mediaIndex} in playlist ${e.playlist.id}`,metadata:{errorType:L.Error.StreamingFailedToAppendSegment}}),this.trigger("appenderror")}}appendToSourceBuffer_({segmentInfo:e,type:t,initSegment:i,data:s,bytes:r}){if(!r){const l=[s];let h=s.byteLength;i&&(l.unshift(i),h+=i.byteLength),r=Bg({bytes:h,segments:l})}const a={segmentInfo:bn({type:this.loaderType_,segment:e})};this.trigger({type:"segmentappendstart",metadata:a}),this.sourceUpdater_.appendBuffer({segmentInfo:e,type:t,bytes:r},this.handleAppendError_.bind(this,{segmentInfo:e,type:t,bytes:r}))}handleSegmentTimingInfo_(e,t,i){if(!this.pendingSegment_||t!==this.pendingSegment_.requestId)return;const s=this.pendingSegment_.segment,r=`${e}TimingInfo`;s[r]||(s[r]={}),s[r].transmuxerPrependedSeconds=i.prependedContentDuration||0,s[r].transmuxedPresentationStart=i.start.presentation,s[r].transmuxedDecodeStart=i.start.decode,s[r].transmuxedPresentationEnd=i.end.presentation,s[r].transmuxedDecodeEnd=i.end.decode,s[r].baseMediaDecodeTime=i.baseMediaDecodeTime}appendData_(e,t){const{type:i,data:s}=t;if(!s||!s.byteLength||i==="audio"&&this.audioDisabled_)return;const r=this.getInitSegmentAndUpdateState_({type:i,initSegment:t.initSegment,playlist:e.playlist,map:e.isFmp4?e.segment.map:null});this.appendToSourceBuffer_({segmentInfo:e,type:i,initSegment:r,data:s})}loadSegment_(e){if(this.state="WAITING",this.pendingSegment_=e,this.trimBackBuffer_(e),typeof e.timestampOffset=="number"&&this.transmuxer_&&this.transmuxer_.postMessage({action:"clearAllMp4Captions"}),!this.hasEnoughInfoToLoad_()){en(this),this.loadQueue_.push(()=>{const t=(0,ge.A)({},e,{forceTimestampOffset:!0});(0,ge.A)(e,this.generateSegmentInfo_(t)),this.isPendingTimestampOffset_=!1,this.updateTransmuxerAndRequestSegment_(e)});return}this.updateTransmuxerAndRequestSegment_(e)}updateTransmuxerAndRequestSegment_(e){this.shouldUpdateTransmuxerTimestampOffset_(e.timestampOffset)&&(this.gopBuffer_.length=0,e.gopsToAlignWith=[],this.timeMapping_=0,this.transmuxer_.postMessage({action:"reset"}),this.transmuxer_.postMessage({action:"setTimestampOffset",timestampOffset:e.timestampOffset}));const t=this.createSimplifiedSegmentObj_(e),i=this.isEndOfStream_(e.mediaIndex,e.playlist,e.partIndex),s=this.mediaIndex!==null,r=e.timeline!==this.currentTimeline_&&e.timeline>0,a=i||s&&r;this.logger_(`Requesting
${Bd(e.uri)}
${rs(e)}`),t.map&&!t.map.bytes&&(this.logger_("going to request init segment."),this.appendInitSegment_={video:!0,audio:!0}),e.abortRequests=bg({xhr:this.vhs_.xhr,xhrOptions:this.xhrOptions_,decryptionWorker:this.decrypter_,segment:t,abortFn:this.handleAbort_.bind(this,e),progressFn:this.handleProgress_.bind(this),trackInfoFn:this.handleTrackInfo_.bind(this),timingInfoFn:this.handleTimingInfo_.bind(this),videoSegmentTimingInfoFn:this.handleSegmentTimingInfo_.bind(this,"video",e.requestId),audioSegmentTimingInfoFn:this.handleSegmentTimingInfo_.bind(this,"audio",e.requestId),captionsFn:this.handleCaptions_.bind(this),isEndOfTimeline:a,endedTimelineFn:()=>{this.logger_("received endedtimeline callback")},id3Fn:this.handleId3_.bind(this),dataFn:this.handleData_.bind(this),doneFn:this.segmentRequestFinished_.bind(this),onTransmuxerLog:({message:l,level:h,stream:p})=>{this.logger_(`${rs(e)} logged from transmuxer stream ${p} as a ${h}: ${l}`)},triggerSegmentEventFn:({type:l,segment:h,keyInfo:p,trackInfo:g,timingInfo:y})=>{const D={segmentInfo:bn({segment:h})};p&&(D.keyInfo=p),g&&(D.trackInfo=g),y&&(D.timingInfo=y),this.trigger({type:l,metadata:D})}})}trimBackBuffer_(e){const t=Wg(this.seekable_(),this.currentTime_(),this.playlist_.targetDuration||10);t>0&&this.remove(0,t)}createSimplifiedSegmentObj_(e){const t=e.segment,i=e.part,s=e.segment.key||e.segment.map&&e.segment.map.key,r=e.segment.map&&!e.segment.map.bytes,a={resolvedUri:i?i.resolvedUri:t.resolvedUri,byterange:i?i.byterange:t.byterange,requestId:e.requestId,transmuxer:e.transmuxer,audioAppendStart:e.audioAppendStart,gopsToAlignWith:e.gopsToAlignWith,part:e.part,type:this.loaderType_,start:e.startOfSegment,duration:e.duration,isEncrypted:s,isMediaInitialization:r},l=e.playlist.segments[e.mediaIndex-1];if(l&&l.timeline===t.timeline&&(l.videoTimingInfo?a.baseStartTime=l.videoTimingInfo.transmuxedDecodeEnd:l.audioTimingInfo&&(a.baseStartTime=l.audioTimingInfo.transmuxedDecodeEnd)),t.key){const h=t.key.iv||new Uint32Array([0,0,0,e.mediaIndex+e.playlist.mediaSequence]);a.key=this.segmentKey(t.key),a.key.iv=h}return t.map&&(a.map=this.initSegmentForMap(t.map)),a}saveTransferStats_(e){this.mediaRequests+=1,e&&(this.mediaBytesTransferred+=e.bytesReceived,this.mediaTransferDuration+=e.roundTripTime)}saveBandwidthRelatedStats_(e,t){if(this.pendingSegment_.byteLength=t.bytesReceived,e<ra){this.logger_(`Ignoring segment's bandwidth because its duration of ${e} is less than the min to record ${ra}`);return}const i={bandwidthInfo:{from:this.bandwidth,to:t.bandwidth}};this.trigger({type:"bandwidthupdated",metadata:i}),this.bandwidth=t.bandwidth,this.roundTrip=t.roundTripTime}handleTimeout_(){this.mediaRequestsTimedout+=1,this.bandwidth=1,this.roundTrip=NaN,this.trigger("bandwidthupdate"),this.trigger("timeout")}segmentRequestFinished_(e,t,i){if(this.callQueue_.length){this.callQueue_.push(this.segmentRequestFinished_.bind(this,e,t,i));return}if(this.saveTransferStats_(t.stats),!this.pendingSegment_||t.requestId!==this.pendingSegment_.requestId)return;if(e){if(this.pendingSegment_=null,this.state="READY",e.code===Bi.ABORTED)return;if(this.pause(),e.code===Bi.TIMEOUT){this.handleTimeout_();return}this.mediaRequestsErrored+=1,this.error(e),this.trigger("error");return}const s=this.pendingSegment_;this.saveBandwidthRelatedStats_(s.duration,t.stats),s.endOfAllRequests=t.endOfAllRequests,i.gopInfo&&(this.gopBuffer_=Ug(this.gopBuffer_,i.gopInfo,this.safeAppend_)),this.state="APPENDING",this.trigger("appending"),this.waitForAppendsToComplete_(s)}setTimeMapping_(e){const t=this.syncController_.mappingForTimeline(e);t!==null&&(this.timeMapping_=t)}updateMediaSecondsLoaded_(e){typeof e.start=="number"&&typeof e.end=="number"?this.mediaSecondsLoaded+=e.end-e.start:this.mediaSecondsLoaded+=e.duration}shouldUpdateTransmuxerTimestampOffset_(e){return e===null?!1:this.loaderType_==="main"&&e!==this.sourceUpdater_.videoTimestampOffset()||!this.audioDisabled_&&e!==this.sourceUpdater_.audioTimestampOffset()}trueSegmentStart_({currentStart:e,playlist:t,mediaIndex:i,firstVideoFrameTimeForData:s,currentVideoTimestampOffset:r,useVideoTimingInfo:a,videoTimingInfo:l,audioTimingInfo:h}){if(typeof e!="undefined")return e;if(!a)return h.start;const p=t.segments[i-1];return i===0||!p||typeof p.start=="undefined"||p.end!==s+r?s:l.start}waitForAppendsToComplete_(e){const t=this.getCurrentMediaInfo_(e);if(!t){this.error({message:"No starting media returned, likely due to an unsupported media format.",playlistExclusionDuration:1/0}),this.trigger("error");return}const{hasAudio:i,hasVideo:s,isMuxed:r}=t,a=this.loaderType_==="main"&&s,l=!this.audioDisabled_&&i&&!r;if(e.waitingOnAppends=0,!e.hasAppendedData_){!e.timingInfo&&typeof e.timestampOffset=="number"&&(this.isPendingTimestampOffset_=!0),e.timingInfo={start:0},e.waitingOnAppends++,this.isPendingTimestampOffset_||(this.updateSourceBufferTimestampOffset_(e),this.processMetadataQueue_()),this.checkAppendsDone_(e);return}a&&e.waitingOnAppends++,l&&e.waitingOnAppends++,a&&this.sourceUpdater_.videoQueueCallback(this.checkAppendsDone_.bind(this,e)),l&&this.sourceUpdater_.audioQueueCallback(this.checkAppendsDone_.bind(this,e))}checkAppendsDone_(e){this.checkForAbort_(e.requestId)||(e.waitingOnAppends--,e.waitingOnAppends===0&&this.handleAppendsDone_())}checkForIllegalMediaSwitch(e){const t=qg(this.loaderType_,this.getCurrentMediaInfo_(),e);return t?(this.error({message:t,playlistExclusionDuration:1/0}),this.trigger("error"),!0):!1}updateSourceBufferTimestampOffset_(e){if(e.timestampOffset===null||typeof e.timingInfo.start!="number"||e.changedTimestampOffset||this.loaderType_!=="main")return;let t=!1;e.timestampOffset-=this.getSegmentStartTimeForTimestampOffsetCalculation_({videoTimingInfo:e.segment.videoTimingInfo,audioTimingInfo:e.segment.audioTimingInfo,timingInfo:e.timingInfo}),e.changedTimestampOffset=!0,e.timestampOffset!==this.sourceUpdater_.videoTimestampOffset()&&(this.sourceUpdater_.videoTimestampOffset(e.timestampOffset),t=!0),e.timestampOffset!==this.sourceUpdater_.audioTimestampOffset()&&(this.sourceUpdater_.audioTimestampOffset(e.timestampOffset),t=!0),t&&this.trigger("timestampoffset")}getSegmentStartTimeForTimestampOffsetCalculation_({videoTimingInfo:e,audioTimingInfo:t,timingInfo:i}){return this.useDtsForTimestampOffset_?e&&typeof e.transmuxedDecodeStart=="number"?e.transmuxedDecodeStart:t&&typeof t.transmuxedDecodeStart=="number"?t.transmuxedDecodeStart:i.start:i.start}updateTimingInfoEnd_(e){e.timingInfo=e.timingInfo||{};const t=this.getMediaInfo_(),s=this.loaderType_==="main"&&t&&t.hasVideo&&e.videoTimingInfo?e.videoTimingInfo:e.audioTimingInfo;s&&(e.timingInfo.end=typeof s.end=="number"?s.end:s.start+e.duration)}handleAppendsDone_(){if(this.pendingSegment_){const h={segmentInfo:bn({type:this.loaderType_,segment:this.pendingSegment_})};this.trigger({type:"appendsdone",metadata:h})}if(!this.pendingSegment_){this.state="READY",this.paused()||this.monitorBuffer_();return}const e=this.pendingSegment_;e.part&&e.part.syncInfo?e.part.syncInfo.markAppended():e.segment.syncInfo&&e.segment.syncInfo.markAppended(),this.updateTimingInfoEnd_(e),this.shouldSaveSegmentTimingInfo_&&this.syncController_.saveSegmentTimingInfo({segmentInfo:e,shouldSaveTimelineMapping:this.loaderType_==="main"});const t=Kg(e,this.sourceType_);if(t&&(t.severity==="warn"?L.log.warn(t.message):this.logger_(t.message)),this.recordThroughput_(e),this.pendingSegment_=null,this.state="READY",e.isSyncRequest&&(this.trigger("syncinfoupdate"),!e.hasAppendedData_)){this.logger_(`Throwing away un-appended sync request ${rs(e)}`);return}this.logger_(`Appended ${rs(e)}`),this.addSegmentMetadataCue_(e),this.fetchAtBuffer_=!0,this.currentTimeline_!==e.timeline&&(this.timelineChangeController_.lastTimelineChange({type:this.loaderType_,from:this.currentTimeline_,to:e.timeline}),this.loaderType_==="main"&&!this.audioDisabled_&&this.timelineChangeController_.lastTimelineChange({type:"audio",from:this.currentTimeline_,to:e.timeline})),this.currentTimeline_=e.timeline,this.trigger("syncinfoupdate");const i=e.segment,s=e.part,r=i.end&&this.currentTime_()-i.end>e.playlist.targetDuration*3,a=s&&s.end&&this.currentTime_()-s.end>e.playlist.partTargetDuration*3;if(r||a){this.logger_(`bad ${r?"segment":"part"} ${rs(e)}`),this.resetEverything();return}this.mediaIndex!==null&&this.trigger("bandwidthupdate"),this.trigger("progress"),this.mediaIndex=e.mediaIndex,this.partIndex=e.partIndex,this.isEndOfStream_(e.mediaIndex,e.playlist,e.partIndex)&&this.endOfStream(),this.trigger("appended"),e.hasAppendedData_&&this.mediaAppends++,this.paused()||this.monitorBuffer_()}recordThroughput_(e){if(e.duration<ra){this.logger_(`Ignoring segment's throughput because its duration of ${e.duration} is less than the min to record ${ra}`);return}const t=this.throughput.rate,i=Date.now()-e.endOfAllRequests+1,s=Math.floor(e.byteLength/i*8*1e3);this.throughput.rate+=(s-t)/++this.throughput.count}addSegmentMetadataCue_(e){if(!this.segmentMetadataTrack_)return;const t=e.segment,i=t.start,s=t.end;if(!kd(i)||!kd(s))return;Hs(i,s,this.segmentMetadataTrack_);const r=A().WebKitDataCue||A().VTTCue,a={custom:t.custom,dateTimeObject:t.dateTimeObject,dateTimeString:t.dateTimeString,programDateTime:t.programDateTime,bandwidth:e.playlist.attributes.BANDWIDTH,resolution:e.playlist.attributes.RESOLUTION,codecs:e.playlist.attributes.CODECS,byteLength:e.byteLength,uri:e.uri,timeline:e.timeline,playlist:e.playlist.id,start:i,end:s},l=JSON.stringify(a),h=new r(i,s,l);h.value=a,this.segmentMetadataTrack_.addCue(h)}}function zi(){}const Od=function(n){return typeof n!="string"?n:n.replace(/./,e=>e.toUpperCase())},Qg=["video","audio"],rl=(n,e)=>{const t=e[`${n}Buffer`];return t&&t.updating||e.queuePending[n]},Jg=(n,e)=>{for(let t=0;t<e.length;t++){const i=e[t];if(i.type==="mediaSource")return null;if(i.type===n)return t}return null},as=(n,e)=>{if(e.queue.length===0)return;let t=0,i=e.queue[t];if(i.type==="mediaSource"){!e.updating()&&e.mediaSource.readyState!=="closed"&&(e.queue.shift(),i.action(e),i.doneFn&&i.doneFn(),as("audio",e),as("video",e));return}if(n!=="mediaSource"&&!(!e.ready()||e.mediaSource.readyState==="closed"||rl(n,e))){if(i.type!==n){if(t=Jg(n,e.queue),t===null)return;i=e.queue[t]}if(e.queue.splice(t,1),e.queuePending[n]=i,i.action(n,e),!i.doneFn){e.queuePending[n]=null,as(n,e);return}}},Ld=(n,e)=>{const t=e[`${n}Buffer`],i=Od(n);t&&(t.removeEventListener("updateend",e[`on${i}UpdateEnd_`]),t.removeEventListener("error",e[`on${i}Error_`]),e.codecs[n]=null,e[`${n}Buffer`]=null)},Di=(n,e)=>n&&e&&Array.prototype.indexOf.call(n.sourceBuffers,e)!==-1,Qt={appendBuffer:(n,e,t)=>(i,s)=>{const r=s[`${i}Buffer`];if(Di(s.mediaSource,r)){s.logger_(`Appending segment ${e.mediaIndex}'s ${n.length} bytes to ${i}Buffer`);try{r.appendBuffer(n)}catch(a){s.logger_(`Error with code ${a.code} `+(a.code===Qc?"(QUOTA_EXCEEDED_ERR) ":"")+`when appending segment ${e.mediaIndex} to ${i}Buffer`),s.queuePending[i]=null,t(a)}}},remove:(n,e)=>(t,i)=>{const s=i[`${t}Buffer`];if(Di(i.mediaSource,s)){i.logger_(`Removing ${n} to ${e} from ${t}Buffer`);try{s.remove(n,e)}catch(r){i.logger_(`Remove ${n} to ${e} from ${t}Buffer failed`)}}},timestampOffset:n=>(e,t)=>{const i=t[`${e}Buffer`];Di(t.mediaSource,i)&&(t.logger_(`Setting ${e}timestampOffset to ${n}`),i.timestampOffset=n)},callback:n=>(e,t)=>{n()},endOfStream:n=>e=>{if(e.mediaSource.readyState==="open"){e.logger_(`Calling mediaSource endOfStream(${n||""})`);try{e.mediaSource.endOfStream(n)}catch(t){L.log.warn("Failed to call media source endOfStream",t)}}},duration:n=>e=>{e.logger_(`Setting mediaSource duration to ${n}`);try{e.mediaSource.duration=n}catch(t){L.log.warn("Failed to set media source duration",t)}},abort:()=>(n,e)=>{if(e.mediaSource.readyState!=="open")return;const t=e[`${n}Buffer`];if(Di(e.mediaSource,t)){e.logger_(`calling abort on ${n}Buffer`);try{t.abort()}catch(i){L.log.warn(`Failed to abort on ${n}Buffer`,i)}}},addSourceBuffer:(n,e)=>t=>{const i=Od(n),s=Fe(e);t.logger_(`Adding ${n}Buffer with codec ${e} to mediaSource`);const r=t.mediaSource.addSourceBuffer(s);r.addEventListener("updateend",t[`on${i}UpdateEnd_`]),r.addEventListener("error",t[`on${i}Error_`]),t.codecs[n]=e,t[`${n}Buffer`]=r},removeSourceBuffer:n=>e=>{const t=e[`${n}Buffer`];if(Ld(n,e),!!Di(e.mediaSource,t)){e.logger_(`Removing ${n}Buffer with codec ${e.codecs[n]} from mediaSource`);try{e.mediaSource.removeSourceBuffer(t)}catch(i){L.log.warn(`Failed to removeSourceBuffer ${n}Buffer`,i)}}},changeType:n=>(e,t)=>{const i=t[`${e}Buffer`],s=Fe(n);if(!Di(t.mediaSource,i))return;const r=n.substring(0,n.indexOf(".")),a=t.codecs[e];if(a.substring(0,a.indexOf("."))===r)return;const h={codecsChangeInfo:{from:a,to:n}};t.trigger({type:"codecschange",metadata:h}),t.logger_(`changing ${e}Buffer codec from ${a} to ${n}`);try{i.changeType(s),t.codecs[e]=n}catch(p){h.errorType=L.Error.StreamingCodecsChangeError,h.error=p,p.metadata=h,t.error_=p,t.trigger("error"),L.log.warn(`Failed to changeType on ${e}Buffer`,p)}}},Jt=({type:n,sourceUpdater:e,action:t,doneFn:i,name:s})=>{e.queue.push({type:n,action:t,doneFn:i,name:s}),as(n,e)},Rd=(n,e)=>t=>{const i=e[`${n}Buffered`](),s=fm(i);if(e.logger_(`received "updateend" event for ${n} Source Buffer: `,s),e.queuePending[n]){const r=e.queuePending[n].doneFn;e.queuePending[n]=null,r&&r(e[`${n}Error_`])}as(n,e)};class Md extends L.EventTarget{constructor(e){super(),this.mediaSource=e,this.sourceopenListener_=()=>as("mediaSource",this),this.mediaSource.addEventListener("sourceopen",this.sourceopenListener_),this.logger_=oi("SourceUpdater"),this.audioTimestampOffset_=0,this.videoTimestampOffset_=0,this.queue=[],this.queuePending={audio:null,video:null},this.delayedAudioAppendQueue_=[],this.videoAppendQueued_=!1,this.codecs={},this.onVideoUpdateEnd_=Rd("video",this),this.onAudioUpdateEnd_=Rd("audio",this),this.onVideoError_=t=>{this.videoError_=t},this.onAudioError_=t=>{this.audioError_=t},this.createdSourceBuffers_=!1,this.initializedEme_=!1,this.triggeredReady_=!1}initializedEme(){this.initializedEme_=!0,this.triggerReady()}hasCreatedSourceBuffers(){return this.createdSourceBuffers_}hasInitializedAnyEme(){return this.initializedEme_}ready(){return this.hasCreatedSourceBuffers()&&this.hasInitializedAnyEme()}createSourceBuffers(e){this.hasCreatedSourceBuffers()||(this.addOrChangeSourceBuffers(e),this.createdSourceBuffers_=!0,this.trigger("createdsourcebuffers"),this.triggerReady())}triggerReady(){this.ready()&&!this.triggeredReady_&&(this.triggeredReady_=!0,this.trigger("ready"))}addSourceBuffer(e,t){Jt({type:"mediaSource",sourceUpdater:this,action:Qt.addSourceBuffer(e,t),name:"addSourceBuffer"})}abort(e){Jt({type:e,sourceUpdater:this,action:Qt.abort(e),name:"abort"})}removeSourceBuffer(e){if(!this.canRemoveSourceBuffer()){L.log.error("removeSourceBuffer is not supported!");return}Jt({type:"mediaSource",sourceUpdater:this,action:Qt.removeSourceBuffer(e),name:"removeSourceBuffer"})}canRemoveSourceBuffer(){return!L.browser.IS_FIREFOX&&A().MediaSource&&A().MediaSource.prototype&&typeof A().MediaSource.prototype.removeSourceBuffer=="function"}static canChangeType(){return A().SourceBuffer&&A().SourceBuffer.prototype&&typeof A().SourceBuffer.prototype.changeType=="function"}canChangeType(){return this.constructor.canChangeType()}changeType(e,t){if(!this.canChangeType()){L.log.error("changeType is not supported!");return}Jt({type:e,sourceUpdater:this,action:Qt.changeType(t),name:"changeType"})}addOrChangeSourceBuffers(e){if(!e||typeof e!="object"||Object.keys(e).length===0)throw new Error("Cannot addOrChangeSourceBuffers to undefined codecs");Object.keys(e).forEach(t=>{const i=e[t];if(!this.hasCreatedSourceBuffers())return this.addSourceBuffer(t,i);this.canChangeType()&&this.changeType(t,i)})}appendBuffer(e,t){const{segmentInfo:i,type:s,bytes:r}=e;if(this.processedAppend_=!0,s==="audio"&&this.videoBuffer&&!this.videoAppendQueued_){this.delayedAudioAppendQueue_.push([e,t]),this.logger_(`delayed audio append of ${r.length} until video append`);return}const a=t;if(Jt({type:s,sourceUpdater:this,action:Qt.appendBuffer(r,i||{mediaIndex:-1},a),doneFn:t,name:"appendBuffer"}),s==="video"){if(this.videoAppendQueued_=!0,!this.delayedAudioAppendQueue_.length)return;const l=this.delayedAudioAppendQueue_.slice();this.logger_(`queuing delayed audio ${l.length} appendBuffers`),this.delayedAudioAppendQueue_.length=0,l.forEach(h=>{this.appendBuffer.apply(this,h)})}}audioBuffered(){return Di(this.mediaSource,this.audioBuffer)&&this.audioBuffer.buffered?this.audioBuffer.buffered:St()}videoBuffered(){return Di(this.mediaSource,this.videoBuffer)&&this.videoBuffer.buffered?this.videoBuffer.buffered:St()}buffered(){const e=Di(this.mediaSource,this.videoBuffer)?this.videoBuffer:null,t=Di(this.mediaSource,this.audioBuffer)?this.audioBuffer:null;return t&&!e?this.audioBuffered():e&&!t?this.videoBuffered():mm(this.audioBuffered(),this.videoBuffered())}setDuration(e,t=zi){Jt({type:"mediaSource",sourceUpdater:this,action:Qt.duration(e),name:"duration",doneFn:t})}endOfStream(e=null,t=zi){typeof e!="string"&&(e=void 0),Jt({type:"mediaSource",sourceUpdater:this,action:Qt.endOfStream(e),name:"endOfStream",doneFn:t})}removeAudio(e,t,i=zi){if(!this.audioBuffered().length||this.audioBuffered().end(0)===0){i();return}Jt({type:"audio",sourceUpdater:this,action:Qt.remove(e,t),doneFn:i,name:"remove"})}removeVideo(e,t,i=zi){if(!this.videoBuffered().length||this.videoBuffered().end(0)===0){i();return}Jt({type:"video",sourceUpdater:this,action:Qt.remove(e,t),doneFn:i,name:"remove"})}updating(){return!!(rl("audio",this)||rl("video",this))}audioTimestampOffset(e){return typeof e!="undefined"&&this.audioBuffer&&this.audioTimestampOffset_!==e&&(Jt({type:"audio",sourceUpdater:this,action:Qt.timestampOffset(e),name:"timestampOffset"}),this.audioTimestampOffset_=e),this.audioTimestampOffset_}videoTimestampOffset(e){return typeof e!="undefined"&&this.videoBuffer&&this.videoTimestampOffset_!==e&&(Jt({type:"video",sourceUpdater:this,action:Qt.timestampOffset(e),name:"timestampOffset"}),this.videoTimestampOffset_=e),this.videoTimestampOffset_}audioQueueCallback(e){this.audioBuffer&&Jt({type:"audio",sourceUpdater:this,action:Qt.callback(e),name:"callback"})}videoQueueCallback(e){this.videoBuffer&&Jt({type:"video",sourceUpdater:this,action:Qt.callback(e),name:"callback"})}dispose(){this.trigger("dispose"),Qg.forEach(e=>{this.abort(e),this.canRemoveSourceBuffer()?this.removeSourceBuffer(e):this[`${e}QueueCallback`](()=>Ld(e,this))}),this.videoAppendQueued_=!1,this.delayedAudioAppendQueue_.length=0,this.sourceopenListener_&&this.mediaSource.removeEventListener("sourceopen",this.sourceopenListener_),this.off()}}const Nd=n=>decodeURIComponent(escape(String.fromCharCode.apply(null,n))),Zg=n=>{const e=new Uint8Array(n);return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")},Ud=new Uint8Array(`

`.split("").map(n=>n.charCodeAt(0)));class e0 extends Error{constructor(){super("Trying to parse received VTT cues, but there is no WebVTT. Make sure vtt.js is loaded.")}}class t0 extends sl{constructor(e,t={}){super(e,t),this.mediaSource_=null,this.subtitlesTrack_=null,this.featuresNativeTextTracks_=e.featuresNativeTextTracks,this.loadVttJs=e.loadVttJs,this.shouldSaveSegmentTimingInfo_=!1}buffered_(){if(!this.subtitlesTrack_||!this.subtitlesTrack_.cues||!this.subtitlesTrack_.cues.length)return St();const e=this.subtitlesTrack_.cues,t=e[0].startTime,i=e[e.length-1].startTime;return St([[t,i]])}initSegmentForMap(e,t=!1){if(!e)return null;const i=ta(e);let s=this.initSegments_[i];if(t&&!s&&e.bytes){const r=Ud.byteLength+e.bytes.byteLength,a=new Uint8Array(r);a.set(e.bytes),a.set(Ud,e.bytes.byteLength),this.initSegments_[i]=s={resolvedUri:e.resolvedUri,byterange:e.byterange,bytes:a}}return s||e}couldBeginLoading_(){return this.playlist_&&this.subtitlesTrack_&&!this.paused()}init_(){return this.state="READY",this.resetEverything(),this.monitorBuffer_()}track(e){return typeof e=="undefined"?this.subtitlesTrack_:(this.subtitlesTrack_=e,this.state==="INIT"&&this.couldBeginLoading_()&&this.init_(),this.subtitlesTrack_)}remove(e,t){Hs(e,t,this.subtitlesTrack_)}fillBuffer_(){const e=this.chooseNextRequest_();if(e){if(this.syncController_.timestampOffsetForTimeline(e.timeline)===null){const t=()=>{this.state="READY",this.paused()||this.monitorBuffer_()};this.syncController_.one("timestampoffset",t),this.state="WAITING_ON_TIMELINE";return}this.loadSegment_(e)}}timestampOffsetForSegment_(){return null}chooseNextRequest_(){return this.skipEmptySegments_(super.chooseNextRequest_())}skipEmptySegments_(e){for(;e&&e.segment.empty;){if(e.mediaIndex+1>=e.playlist.segments.length){e=null;break}e=this.generateSegmentInfo_({playlist:e.playlist,mediaIndex:e.mediaIndex+1,startOfSegment:e.startOfSegment+e.duration,isSyncRequest:e.isSyncRequest})}return e}stopForError(e){this.error(e),this.state="READY",this.pause(),this.trigger("error")}segmentRequestFinished_(e,t,i){if(!this.subtitlesTrack_){this.state="READY";return}if(this.saveTransferStats_(t.stats),!this.pendingSegment_){this.state="READY",this.mediaRequestsAborted+=1;return}if(e){e.code===Bi.TIMEOUT&&this.handleTimeout_(),e.code===Bi.ABORTED?this.mediaRequestsAborted+=1:this.mediaRequestsErrored+=1,this.stopForError(e);return}const s=this.pendingSegment_,r=i.mp4VttCues&&i.mp4VttCues.length;r&&(s.mp4VttCues=i.mp4VttCues),this.saveBandwidthRelatedStats_(s.duration,t.stats),t.key&&this.segmentKey(t.key,!0),this.state="APPENDING",this.trigger("appending");const a=s.segment;if(a.map&&(a.map.bytes=t.map.bytes),s.bytes=t.bytes,typeof A().WebVTT!="function"&&typeof this.loadVttJs=="function"){this.state="WAITING_ON_VTTJS",this.loadVttJs().then(()=>this.segmentRequestFinished_(e,t,i),()=>this.stopForError({message:"Error loading vtt.js"}));return}a.requested=!0;try{this.parseVTTCues_(s)}catch(l){this.stopForError({message:l.message,metadata:{errorType:L.Error.StreamingVttParserError,error:l}});return}if(r||this.updateTimeMapping_(s,this.syncController_.timelines[s.timeline],this.playlist_),s.cues.length?s.timingInfo={start:s.cues[0].startTime,end:s.cues[s.cues.length-1].endTime}:s.timingInfo={start:s.startOfSegment,end:s.startOfSegment+s.duration},s.isSyncRequest){this.trigger("syncinfoupdate"),this.pendingSegment_=null,this.state="READY";return}s.byteLength=s.bytes.byteLength,this.mediaSecondsLoaded+=a.duration,s.cues.forEach(l=>{this.subtitlesTrack_.addCue(this.featuresNativeTextTracks_?new(A()).VTTCue(l.startTime,l.endTime,l.text):l)}),Mg(this.subtitlesTrack_),this.handleAppendsDone_()}handleData_(e,t){const i=e&&e.type==="vtt",s=t&&t.type==="text";i&&s&&super.handleData_(e,t)}updateTimingInfoEnd_(){}parseMp4VttCues_(e){const t=this.sourceUpdater_.videoTimestampOffset()===null?this.sourceUpdater_.audioTimestampOffset():this.sourceUpdater_.videoTimestampOffset();e.mp4VttCues.forEach(i=>{const s=i.start+t,r=i.end+t,a=new(A()).VTTCue(s,r,i.cueText);i.settings&&i.settings.split(" ").forEach(l=>{const h=l.split(":"),p=h[0],g=h[1];a[p]=isNaN(g)?g:Number(g)}),e.cues.push(a)})}parseVTTCues_(e){let t,i=!1;if(typeof A().WebVTT!="function")throw new e0;if(e.cues=[],e.timestampmap={MPEGTS:0,LOCAL:0},e.mp4VttCues){this.parseMp4VttCues_(e);return}typeof A().TextDecoder=="function"?t=new(A()).TextDecoder("utf8"):(t=A().WebVTT.StringDecoder(),i=!0);const s=new(A()).WebVTT.Parser(A(),A().vttjs,t);if(s.oncue=e.cues.push.bind(e.cues),s.ontimestampmap=a=>{e.timestampmap=a},s.onparsingerror=a=>{L.log.warn("Error encountered when parsing cues: "+a.message)},e.segment.map){let a=e.segment.map.bytes;i&&(a=Nd(a)),s.parse(a)}let r=e.bytes;i&&(r=Nd(r)),s.parse(r),s.flush()}updateTimeMapping_(e,t,i){const s=e.segment;if(!t)return;if(!e.cues.length){s.empty=!0;return}const{MPEGTS:r,LOCAL:a}=e.timestampmap,h=r/hn.ONE_SECOND_IN_TS-a+t.mapping;if(e.cues.forEach(p=>{const g=p.endTime-p.startTime,y=this.handleRollover_(p.startTime+h,t.time);p.startTime=Math.max(y,0),p.endTime=Math.max(y+g,0)}),!i.syncInfo){const p=e.cues[0].startTime,g=e.cues[e.cues.length-1].startTime;i.syncInfo={mediaSequence:i.mediaSequence+e.mediaIndex,time:Math.min(p,g-s.duration)}}}handleRollover_(e,t){if(t===null)return e;let i=e*hn.ONE_SECOND_IN_TS;const s=t*hn.ONE_SECOND_IN_TS;let r;for(s<i?r=-8589934592:r=8589934592;Math.abs(i-s)>4294967296;)i+=r;return i/hn.ONE_SECOND_IN_TS}}const i0=function(n,e){const t=n.cues;for(let i=0;i<t.length;i++){const s=t[i];if(e>=s.adStartTime&&e<=s.adEndTime)return s}return null},n0=function(n,e,t=0){if(!n.segments)return;let i=t,s;for(let r=0;r<n.segments.length;r++){const a=n.segments[r];if(s||(s=i0(e,i+a.duration/2)),s){if("cueIn"in a){s.endTime=i,s.adEndTime=i,i+=a.duration,s=null;continue}if(i<s.endTime){i+=a.duration;continue}s.endTime+=a.duration}else if("cueOut"in a&&(s=new(A()).VTTCue(i,i+a.duration,a.cueOut),s.adStartTime=i,s.adEndTime=i+parseFloat(a.cueOut),e.addCue(s)),"cueOutCont"in a){const[l,h]=a.cueOutCont.split("/").map(parseFloat);s=new(A()).VTTCue(i,i+a.duration,""),s.adStartTime=i-l,s.adEndTime=s.adStartTime+h,e.addCue(s)}i+=a.duration}};class Fd{constructor({start:e,end:t,segmentIndex:i,partIndex:s=null,appended:r=!1}){this.start_=e,this.end_=t,this.segmentIndex_=i,this.partIndex_=s,this.appended_=r}isInRange(e){return e>=this.start&&e<this.end}markAppended(){this.appended_=!0}resetAppendedStatus(){this.appended_=!1}get isAppended(){return this.appended_}get start(){return this.start_}get end(){return this.end_}get segmentIndex(){return this.segmentIndex_}get partIndex(){return this.partIndex_}}class s0{constructor(e,t=[]){this.segmentSyncInfo_=e,this.partsSyncInfo_=t}get segmentSyncInfo(){return this.segmentSyncInfo_}get partsSyncInfo(){return this.partsSyncInfo_}get hasPartsSyncInfo(){return this.partsSyncInfo_.length>0}resetAppendStatus(){this.segmentSyncInfo_.resetAppendedStatus(),this.partsSyncInfo_.forEach(e=>e.resetAppendedStatus())}}class Vd{constructor(){this.storage_=new Map,this.diagnostics_="",this.isReliable_=!1,this.start_=-1/0,this.end_=1/0}get start(){return this.start_}get end(){return this.end_}get diagnostics(){return this.diagnostics_}get isReliable(){return this.isReliable_}resetAppendedStatus(){this.storage_.forEach(e=>e.resetAppendStatus())}update(e,t){const{mediaSequence:i,segments:s}=e;if(this.isReliable_=this.isReliablePlaylist_(i,s),!!this.isReliable_)return this.updateStorage_(s,i,this.calculateBaseTime_(i,s,t))}getSyncInfoForTime(e){for(const{segmentSyncInfo:t,partsSyncInfo:i}of this.storage_.values())if(i.length){for(const s of i)if(s.isInRange(e))return s}else if(t.isInRange(e))return t;return null}getSyncInfoForMediaSequence(e){return this.storage_.get(e)}updateStorage_(e,t,i){const s=new Map;let r=`
`,a=i,l=t;this.start_=a,e.forEach((h,p)=>{const g=this.storage_.get(l),y=a,w=y+h.duration,D=!!(g&&g.segmentSyncInfo&&g.segmentSyncInfo.isAppended),P=new Fd({start:y,end:w,appended:D,segmentIndex:p});h.syncInfo=P;let E=a;const H=(h.parts||[]).map((V,U)=>{const M=E,Y=E+V.duration,O=!!(g&&g.partsSyncInfo&&g.partsSyncInfo[U]&&g.partsSyncInfo[U].isAppended),Q=new Fd({start:M,end:Y,appended:O,segmentIndex:p,partIndex:U});return E=Y,r+=`Media Sequence: ${l}.${U} | Range: ${M} --> ${Y} | Appended: ${O}
`,V.syncInfo=Q,Q});s.set(l,new s0(P,H)),r+=`${Bd(h.resolvedUri)} | Media Sequence: ${l} | Range: ${y} --> ${w} | Appended: ${D}
`,l++,a=w}),this.end_=a,this.storage_=s,this.diagnostics_=r}calculateBaseTime_(e,t,i){if(!this.storage_.size)return 0;if(this.storage_.has(e))return this.storage_.get(e).segmentSyncInfo.start;const s=Math.min(...this.storage_.keys());if(e<s){const r=s-e;let a=this.storage_.get(s).segmentSyncInfo.start;for(let l=0;l<r;l++){const h=t[l];a-=h.duration}return a}return i}isReliablePlaylist_(e,t){return e!=null&&Array.isArray(t)&&t.length}}class zd extends Vd{constructor(e){super(),this.parent_=e}calculateBaseTime_(e,t,i){if(!this.storage_.size){const s=this.parent_.getSyncInfoForMediaSequence(e);return s?s.segmentSyncInfo.start:0}return super.calculateBaseTime_(e,t,i)}}const r0=86400,al=[{name:"VOD",run:(n,e,t,i,s)=>t!==1/0?{time:0,segmentIndex:0,partIndex:null}:null},{name:"MediaSequence",run:(n,e,t,i,s,r)=>{const a=n.getMediaSequenceSync(r);if(!a||!a.isReliable)return null;const l=a.getSyncInfoForTime(s);return l?{time:l.start,partIndex:l.partIndex,segmentIndex:l.segmentIndex}:null}},{name:"ProgramDateTime",run:(n,e,t,i,s)=>{if(!Object.keys(n.timelineToDatetimeMappings).length)return null;let r=null,a=null;const l=Ho(e);s=s||0;for(let h=0;h<l.length;h++){const p=e.endList||s===0?h:l.length-(h+1),g=l[p],y=g.segment,w=n.timelineToDatetimeMappings[y.timeline];if(!w||!y.dateTimeObject)continue;let P=y.dateTimeObject.getTime()/1e3+w;if(y.parts&&typeof g.partIndex=="number")for(let H=0;H<g.partIndex;H++)P+=y.parts[H].duration;const E=Math.abs(s-P);if(a!==null&&(E===0||a<E))break;a=E,r={time:P,segmentIndex:g.segmentIndex,partIndex:g.partIndex}}return r}},{name:"Segment",run:(n,e,t,i,s)=>{let r=null,a=null;s=s||0;const l=Ho(e);for(let h=0;h<l.length;h++){const p=e.endList||s===0?h:l.length-(h+1),g=l[p],y=g.segment,w=g.part&&g.part.start||y&&y.start;if(y.timeline===i&&typeof w!="undefined"){const D=Math.abs(s-w);if(a!==null&&a<D)break;(!r||a===null||a>=D)&&(a=D,r={time:w,segmentIndex:g.segmentIndex,partIndex:g.partIndex})}}return r}},{name:"Discontinuity",run:(n,e,t,i,s)=>{let r=null;if(s=s||0,e.discontinuityStarts&&e.discontinuityStarts.length){let a=null;for(let l=0;l<e.discontinuityStarts.length;l++){const h=e.discontinuityStarts[l],p=e.discontinuitySequence+l+1,g=n.discontinuities[p];if(g){const y=Math.abs(s-g.time);if(a!==null&&a<y)break;(!r||a===null||a>=y)&&(a=y,r={time:g.time,segmentIndex:h,partIndex:null})}}}return r}},{name:"Playlist",run:(n,e,t,i,s)=>e.syncInfo?{time:e.syncInfo.time,segmentIndex:e.syncInfo.mediaSequence-e.mediaSequence,partIndex:null}:null}];class a0 extends L.EventTarget{constructor(e={}){super(),this.timelines=[],this.discontinuities=[],this.timelineToDatetimeMappings={};const t=new Vd,i=new zd(t),s=new zd(t);this.mediaSequenceStorage_={main:t,audio:i,vtt:s},this.logger_=oi("SyncController")}getMediaSequenceSync(e){return this.mediaSequenceStorage_[e]||null}getSyncPoint(e,t,i,s,r){if(t!==1/0)return al.find(({name:h})=>h==="VOD").run(this,e,t);const a=this.runStrategies_(e,t,i,s,r);if(!a.length)return null;for(const l of a){const{syncPoint:h,strategy:p}=l,{segmentIndex:g,time:y}=h;if(g<0)continue;const w=e.segments[g],D=y,P=D+w.duration;if(this.logger_(`Strategy: ${p}. Current time: ${s}. selected segment: ${g}. Time: [${D} -> ${P}]}`),s>=D&&s<P)return this.logger_("Found sync point with exact match: ",h),h}return this.selectSyncPoint_(a,{key:"time",value:s})}getExpiredTime(e,t){if(!e||!e.segments)return null;const i=this.runStrategies_(e,t,e.discontinuitySequence,0);if(!i.length)return null;const s=this.selectSyncPoint_(i,{key:"segmentIndex",value:0});return s.segmentIndex>0&&(s.time*=-1),Math.abs(s.time+Fs({defaultDuration:e.targetDuration,durationList:e.segments,startIndex:s.segmentIndex,endIndex:0}))}runStrategies_(e,t,i,s,r){const a=[];for(let l=0;l<al.length;l++){const h=al[l],p=h.run(this,e,t,i,s,r);p&&(p.strategy=h.name,a.push({strategy:h.name,syncPoint:p}))}return a}selectSyncPoint_(e,t){let i=e[0].syncPoint,s=Math.abs(e[0].syncPoint[t.key]-t.value),r=e[0].strategy;for(let a=1;a<e.length;a++){const l=Math.abs(e[a].syncPoint[t.key]-t.value);l<s&&(s=l,i=e[a].syncPoint,r=e[a].strategy)}return this.logger_(`syncPoint for [${t.key}: ${t.value}] chosen with strategy [${r}]: [time:${i.time}, segmentIndex:${i.segmentIndex}`+(typeof i.partIndex=="number"?`,partIndex:${i.partIndex}`:"")+"]"),i}saveExpiredSegmentInfo(e,t){const i=t.mediaSequence-e.mediaSequence;if(i>r0){L.log.warn(`Not saving expired segment info. Media sequence gap ${i} is too large.`);return}for(let s=i-1;s>=0;s--){const r=e.segments[s];if(r&&typeof r.start!="undefined"){t.syncInfo={mediaSequence:e.mediaSequence+s,time:r.start},this.logger_(`playlist refresh sync: [time:${t.syncInfo.time}, mediaSequence: ${t.syncInfo.mediaSequence}]`),this.trigger("syncinfoupdate");break}}}setDateTimeMappingForStart(e){if(this.timelineToDatetimeMappings={},e.segments&&e.segments.length&&e.segments[0].dateTimeObject){const t=e.segments[0],i=t.dateTimeObject.getTime()/1e3;this.timelineToDatetimeMappings[t.timeline]=-i}}saveSegmentTimingInfo({segmentInfo:e,shouldSaveTimelineMapping:t}){const i=this.calculateSegmentTimeMapping_(e,e.timingInfo,t),s=e.segment;i&&(this.saveDiscontinuitySyncInfo_(e),e.playlist.syncInfo||(e.playlist.syncInfo={mediaSequence:e.playlist.mediaSequence+e.mediaIndex,time:s.start}));const r=s.dateTimeObject;s.discontinuity&&t&&r&&(this.timelineToDatetimeMappings[s.timeline]=-(r.getTime()/1e3))}timestampOffsetForTimeline(e){return typeof this.timelines[e]=="undefined"?null:this.timelines[e].time}mappingForTimeline(e){return typeof this.timelines[e]=="undefined"?null:this.timelines[e].mapping}calculateSegmentTimeMapping_(e,t,i){const s=e.segment,r=e.part;let a=this.timelines[e.timeline],l,h;if(typeof e.timestampOffset=="number")a={time:e.startOfSegment,mapping:e.startOfSegment-t.start},i&&(this.timelines[e.timeline]=a,this.trigger("timestampoffset"),this.logger_(`time mapping for timeline ${e.timeline}: [time: ${a.time}] [mapping: ${a.mapping}]`)),l=e.startOfSegment,h=t.end+a.mapping;else if(a)l=t.start+a.mapping,h=t.end+a.mapping;else return!1;return r&&(r.start=l,r.end=h),(!s.start||l<s.start)&&(s.start=l),s.end=h,!0}saveDiscontinuitySyncInfo_(e){const t=e.playlist,i=e.segment;if(i.discontinuity)this.discontinuities[i.timeline]={time:i.start,accuracy:0};else if(t.discontinuityStarts&&t.discontinuityStarts.length)for(let s=0;s<t.discontinuityStarts.length;s++){const r=t.discontinuityStarts[s],a=t.discontinuitySequence+s+1,l=r-e.mediaIndex,h=Math.abs(l);if(!this.discontinuities[a]||this.discontinuities[a].accuracy>h){let p;l<0?p=i.start-Fs({defaultDuration:t.targetDuration,durationList:t.segments,startIndex:e.mediaIndex,endIndex:r}):p=i.end+Fs({defaultDuration:t.targetDuration,durationList:t.segments,startIndex:e.mediaIndex+1,endIndex:r}),this.discontinuities[a]={time:p,accuracy:h}}}}dispose(){this.trigger("dispose"),this.off()}}class o0 extends L.EventTarget{constructor(){super(),this.pendingTimelineChanges_={},this.lastTimelineChanges_={}}clearPendingTimelineChange(e){this.pendingTimelineChanges_[e]=null,this.trigger("pendingtimelinechange")}pendingTimelineChange({type:e,from:t,to:i}){return typeof t=="number"&&typeof i=="number"&&(this.pendingTimelineChanges_[e]={type:e,from:t,to:i},this.trigger("pendingtimelinechange")),this.pendingTimelineChanges_[e]}lastTimelineChange({type:e,from:t,to:i}){if(typeof t=="number"&&typeof i=="number"){this.lastTimelineChanges_[e]={type:e,from:t,to:i},delete this.pendingTimelineChanges_[e];const s={timelineChangeInfo:{from:t,to:i}};this.trigger({type:"timelinechange",metadata:s})}return this.lastTimelineChanges_[e]}dispose(){this.trigger("dispose"),this.pendingTimelineChanges_={},this.lastTimelineChanges_={},this.off()}}const l0=hd(fd(function(){var n=function(){function E(){this.listeners={}}var H=E.prototype;return H.on=function(U,M){this.listeners[U]||(this.listeners[U]=[]),this.listeners[U].push(M)},H.off=function(U,M){if(!this.listeners[U])return!1;var Y=this.listeners[U].indexOf(M);return this.listeners[U]=this.listeners[U].slice(0),this.listeners[U].splice(Y,1),Y>-1},H.trigger=function(U){var M=this.listeners[U];if(M)if(arguments.length===2)for(var Y=M.length,O=0;O<Y;++O)M[O].call(this,arguments[1]);else for(var Q=Array.prototype.slice.call(arguments,1),Ae=M.length,be=0;be<Ae;++be)M[be].apply(this,Q)},H.dispose=function(){this.listeners={}},H.pipe=function(U){this.on("data",function(M){U.push(M)})},E}();/*! @name pkcs7 @version 1.0.4 @license Apache-2.0 */function e(E){return E.subarray(0,E.byteLength-E[E.byteLength-1])}/*! @name aes-decrypter @version 4.0.2 @license Apache-2.0 */const t=function(){const E=[[[],[],[],[],[]],[[],[],[],[],[]]],H=E[0],V=E[1],U=H[4],M=V[4];let Y,O,Q;const Ae=[],be=[];let We,At,wt,ct,we,Ke;for(Y=0;Y<256;Y++)be[(Ae[Y]=Y<<1^(Y>>7)*283)^Y]=Y;for(O=Q=0;!U[O];O^=We||1,Q=be[Q]||1)for(ct=Q^Q<<1^Q<<2^Q<<3^Q<<4,ct=ct>>8^ct&255^99,U[O]=ct,M[ct]=O,wt=Ae[At=Ae[We=Ae[O]]],Ke=wt*16843009^At*65537^We*257^O*16843008,we=Ae[ct]*257^ct*16843008,Y=0;Y<4;Y++)H[Y][O]=we=we<<24^we>>>8,V[Y][ct]=Ke=Ke<<24^Ke>>>8;for(Y=0;Y<5;Y++)H[Y]=H[Y].slice(0),V[Y]=V[Y].slice(0);return E};let i=null;class s{constructor(H){i||(i=t()),this._tables=[[i[0][0].slice(),i[0][1].slice(),i[0][2].slice(),i[0][3].slice(),i[0][4].slice()],[i[1][0].slice(),i[1][1].slice(),i[1][2].slice(),i[1][3].slice(),i[1][4].slice()]];let V,U,M;const Y=this._tables[0][4],O=this._tables[1],Q=H.length;let Ae=1;if(Q!==4&&Q!==6&&Q!==8)throw new Error("Invalid aes key size");const be=H.slice(0),We=[];for(this._key=[be,We],V=Q;V<4*Q+28;V++)M=be[V-1],(V%Q===0||Q===8&&V%Q===4)&&(M=Y[M>>>24]<<24^Y[M>>16&255]<<16^Y[M>>8&255]<<8^Y[M&255],V%Q===0&&(M=M<<8^M>>>24^Ae<<24,Ae=Ae<<1^(Ae>>7)*283)),be[V]=be[V-Q]^M;for(U=0;V;U++,V--)M=be[U&3?V:V-4],V<=4||U<4?We[U]=M:We[U]=O[0][Y[M>>>24]]^O[1][Y[M>>16&255]]^O[2][Y[M>>8&255]]^O[3][Y[M&255]]}decrypt(H,V,U,M,Y,O){const Q=this._key[1];let Ae=H^Q[0],be=M^Q[1],We=U^Q[2],At=V^Q[3],wt,ct,we;const Ke=Q.length/4-2;let li,Hi=4;const nn=this._tables[1],En=nn[0],Tn=nn[1],Cn=nn[2],xn=nn[3],Sn=nn[4];for(li=0;li<Ke;li++)wt=En[Ae>>>24]^Tn[be>>16&255]^Cn[We>>8&255]^xn[At&255]^Q[Hi],ct=En[be>>>24]^Tn[We>>16&255]^Cn[At>>8&255]^xn[Ae&255]^Q[Hi+1],we=En[We>>>24]^Tn[At>>16&255]^Cn[Ae>>8&255]^xn[be&255]^Q[Hi+2],At=En[At>>>24]^Tn[Ae>>16&255]^Cn[be>>8&255]^xn[We&255]^Q[Hi+3],Hi+=4,Ae=wt,be=ct,We=we;for(li=0;li<4;li++)Y[(3&-li)+O]=Sn[Ae>>>24]<<24^Sn[be>>16&255]<<16^Sn[We>>8&255]<<8^Sn[At&255]^Q[Hi++],wt=Ae,Ae=be,be=We,We=At,At=wt}}class r extends n{constructor(){super(n),this.jobs=[],this.delay=1,this.timeout_=null}processJob_(){this.jobs.shift()(),this.jobs.length?this.timeout_=setTimeout(this.processJob_.bind(this),this.delay):this.timeout_=null}push(H){this.jobs.push(H),this.timeout_||(this.timeout_=setTimeout(this.processJob_.bind(this),this.delay))}}const a=function(E){return E<<24|(E&65280)<<8|(E&16711680)>>8|E>>>24},l=function(E,H,V){const U=new Int32Array(E.buffer,E.byteOffset,E.byteLength>>2),M=new s(Array.prototype.slice.call(H)),Y=new Uint8Array(E.byteLength),O=new Int32Array(Y.buffer);let Q,Ae,be,We,At,wt,ct,we,Ke;for(Q=V[0],Ae=V[1],be=V[2],We=V[3],Ke=0;Ke<U.length;Ke+=4)At=a(U[Ke]),wt=a(U[Ke+1]),ct=a(U[Ke+2]),we=a(U[Ke+3]),M.decrypt(At,wt,ct,we,O,Ke),O[Ke]=a(O[Ke]^Q),O[Ke+1]=a(O[Ke+1]^Ae),O[Ke+2]=a(O[Ke+2]^be),O[Ke+3]=a(O[Ke+3]^We),Q=At,Ae=wt,be=ct,We=we;return Y};class h{constructor(H,V,U,M){const Y=h.STEP,O=new Int32Array(H.buffer),Q=new Uint8Array(H.byteLength);let Ae=0;for(this.asyncStream_=new r,this.asyncStream_.push(this.decryptChunk_(O.subarray(Ae,Ae+Y),V,U,Q)),Ae=Y;Ae<O.length;Ae+=Y)U=new Uint32Array([a(O[Ae-4]),a(O[Ae-3]),a(O[Ae-2]),a(O[Ae-1])]),this.asyncStream_.push(this.decryptChunk_(O.subarray(Ae,Ae+Y),V,U,Q));this.asyncStream_.push(function(){M(null,e(Q))})}static get STEP(){return 32e3}decryptChunk_(H,V,U,M){return function(){const Y=l(H,V,U);M.set(Y,H.byteOffset)}}}var p=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof G.g!="undefined"?G.g:typeof self!="undefined"?self:{},g;typeof window!="undefined"?g=window:typeof p!="undefined"?g=p:typeof self!="undefined"?g=self:g={};var y=g,w=function(H){return ArrayBuffer.isView==="function"?ArrayBuffer.isView(H):H&&H.buffer instanceof ArrayBuffer},D=y.BigInt||Number;D("0x1"),D("0x100"),D("0x10000"),D("0x1000000"),D("0x100000000"),D("0x10000000000"),D("0x1000000000000"),D("0x100000000000000"),D("0x10000000000000000"),function(){var E=new Uint16Array([65484]),H=new Uint8Array(E.buffer,E.byteOffset,E.byteLength);return H[0]===255?"big":H[0]===204?"little":"unknown"}();const P=function(E){const H={};return Object.keys(E).forEach(V=>{const U=E[V];w(U)?H[V]={bytes:U.buffer,byteOffset:U.byteOffset,byteLength:U.byteLength}:H[V]=U}),H};self.onmessage=function(E){const H=E.data,V=new Uint8Array(H.encrypted.bytes,H.encrypted.byteOffset,H.encrypted.byteLength),U=new Uint32Array(H.key.bytes,H.key.byteOffset,H.key.byteLength/4),M=new Uint32Array(H.iv.bytes,H.iv.byteOffset,H.iv.byteLength/4);new h(V,U,M,function(Y,O){self.postMessage(P({source:H.source,decrypted:O}),[O.buffer])})}}));var u0=dd(l0);const c0=n=>{let e=n.default?"main":"alternative";return n.characteristics&&n.characteristics.indexOf("public.accessibility.describes-video")>=0&&(e="main-desc"),e},Hd=(n,e)=>{n.abort(),n.pause(),e&&e.activePlaylistLoader&&(e.activePlaylistLoader.pause(),e.activePlaylistLoader=null)},ol=(n,e)=>{e.activePlaylistLoader=n,n.load()},d0=(n,e)=>()=>{const{segmentLoaders:{[n]:t,main:i},mediaTypes:{[n]:s}}=e,r=s.activeTrack(),a=s.getActiveGroup(),l=s.activePlaylistLoader,h=s.lastGroup_;if(!(a&&h&&a.id===h.id)&&(s.lastGroup_=a,s.lastTrack_=r,Hd(t,s),!(!a||a.isMainPlaylist))){if(!a.playlistLoader){l&&i.resetEverything();return}t.resyncLoader(),ol(a.playlistLoader,s)}},h0=(n,e)=>()=>{const{segmentLoaders:{[n]:t},mediaTypes:{[n]:i}}=e;i.lastGroup_=null,t.abort(),t.pause()},f0=(n,e)=>()=>{const{mainPlaylistLoader:t,segmentLoaders:{[n]:i,main:s},mediaTypes:{[n]:r}}=e,a=r.activeTrack(),l=r.getActiveGroup(),h=r.activePlaylistLoader,p=r.lastTrack_;if(!(p&&a&&p.id===a.id)&&(r.lastGroup_=l,r.lastTrack_=a,Hd(i,r),!!l)){if(l.isMainPlaylist){if(!a||!p||a.id===p.id)return;const g=e.vhs.playlistController_,y=g.selectPlaylist();if(g.media()===y)return;r.logger_(`track change. Switching main audio from ${p.id} to ${a.id}`),t.pause(),s.resetEverything(),g.fastQualityChange_(y);return}if(n==="AUDIO"){if(!l.playlistLoader){s.setAudio(!0),s.resetEverything();return}i.setAudio(!0),s.setAudio(!1)}if(h===l.playlistLoader){ol(l.playlistLoader,r);return}i.track&&i.track(a),i.resetEverything(),ol(l.playlistLoader,r)}},aa={AUDIO:(n,e)=>()=>{const{mediaTypes:{[n]:t},excludePlaylist:i}=e,s=t.activeTrack(),r=t.activeGroup(),a=(r.filter(h=>h.default)[0]||r[0]).id,l=t.tracks[a];if(s===l){i({error:{message:"Problem encountered loading the default audio track."}});return}L.log.warn("Problem encountered loading the alternate audio track.Switching back to default.");for(const h in t.tracks)t.tracks[h].enabled=t.tracks[h]===l;t.onTrackChanged()},SUBTITLES:(n,e)=>()=>{const{mediaTypes:{[n]:t}}=e;L.log.warn("Problem encountered loading the subtitle track.Disabling subtitle track.");const i=t.activeTrack();i&&(i.mode="disabled"),t.onTrackChanged()}},qd={AUDIO:(n,e,t)=>{if(!e)return;const{tech:i,requestOptions:s,segmentLoaders:{[n]:r}}=t;e.on("loadedmetadata",()=>{const a=e.media();r.playlist(a,s),(!i.paused()||a.endList&&i.preload()!=="none")&&r.load()}),e.on("loadedplaylist",()=>{r.playlist(e.media(),s),i.paused()||r.load()}),e.on("error",aa[n](n,t))},SUBTITLES:(n,e,t)=>{const{tech:i,requestOptions:s,segmentLoaders:{[n]:r},mediaTypes:{[n]:a}}=t;e.on("loadedmetadata",()=>{const l=e.media();r.playlist(l,s),r.track(a.activeTrack()),(!i.paused()||l.endList&&i.preload()!=="none")&&r.load()}),e.on("loadedplaylist",()=>{r.playlist(e.media(),s),i.paused()||r.load()}),e.on("error",aa[n](n,t))}},p0={AUDIO:(n,e)=>{const{vhs:t,sourceType:i,segmentLoaders:{[n]:s},requestOptions:r,main:{mediaGroups:a},mediaTypes:{[n]:{groups:l,tracks:h,logger_:p}},mainPlaylistLoader:g}=e,y=Vs(g.main);(!a[n]||Object.keys(a[n]).length===0)&&(a[n]={main:{default:{default:!0}}},y&&(a[n].main.default.playlists=g.main.playlists));for(const w in a[n]){l[w]||(l[w]=[]);for(const D in a[n][w]){let P=a[n][w][D],E;if(y?(p(`AUDIO group '${w}' label '${D}' is a main playlist`),P.isMainPlaylist=!0,E=null):i==="vhs-json"&&P.playlists?E=new is(P.playlists[0],t,r):P.resolvedUri?E=new is(P.resolvedUri,t,r):P.playlists&&i==="dash"?E=new Jo(P.playlists[0],t,r,g):E=null,P=Ye({id:D,playlistLoader:E},P),qd[n](n,P.playlistLoader,e),l[w].push(P),typeof h[D]=="undefined"){const H=new L.AudioTrack({id:D,kind:c0(P),enabled:!1,language:P.language,default:P.default,label:D});h[D]=H}}}s.on("error",aa[n](n,e))},SUBTITLES:(n,e)=>{const{tech:t,vhs:i,sourceType:s,segmentLoaders:{[n]:r},requestOptions:a,main:{mediaGroups:l},mediaTypes:{[n]:{groups:h,tracks:p}},mainPlaylistLoader:g}=e;for(const y in l[n]){h[y]||(h[y]=[]);for(const w in l[n][y]){if(!i.options_.useForcedSubtitles&&l[n][y][w].forced)continue;let D=l[n][y][w],P;if(s==="hls")P=new is(D.resolvedUri,i,a);else if(s==="dash"){if(!D.playlists.filter(H=>H.excludeUntil!==1/0).length)return;P=new Jo(D.playlists[0],i,a,g)}else s==="vhs-json"&&(P=new is(D.playlists?D.playlists[0]:D.resolvedUri,i,a));if(D=Ye({id:w,playlistLoader:P},D),qd[n](n,D.playlistLoader,e),h[y].push(D),typeof p[w]=="undefined"){const E=t.addRemoteTextTrack({id:w,kind:"subtitles",default:D.default&&D.autoselect,language:D.language,label:w},!1).track;p[w]=E}}}r.on("error",aa[n](n,e))},"CLOSED-CAPTIONS":(n,e)=>{const{tech:t,main:{mediaGroups:i},mediaTypes:{[n]:{groups:s,tracks:r}}}=e;for(const a in i[n]){s[a]||(s[a]=[]);for(const l in i[n][a]){const h=i[n][a][l];if(!/^(?:CC|SERVICE)/.test(h.instreamId))continue;const p=t.options_.vhs&&t.options_.vhs.captionServices||{};let g={label:l,language:h.language,instreamId:h.instreamId,default:h.default&&h.autoselect};if(p[g.instreamId]&&(g=Ye(g,p[g.instreamId])),g.default===void 0&&delete g.default,s[a].push(Ye({id:l},h)),typeof r[l]=="undefined"){const y=t.addRemoteTextTrack({id:g.instreamId,kind:"captions",default:g.default,language:g.language,label:g.label},!1).track;r[l]=y}}}}},Wd=(n,e)=>{for(let t=0;t<n.length;t++)if($o(e,n[t])||n[t].playlists&&Wd(n[t].playlists,e))return!0;return!1},m0=(n,e)=>t=>{const{mainPlaylistLoader:i,mediaTypes:{[n]:{groups:s}}}=e,r=i.media();if(!r)return null;let a=null;r.attributes[n]&&(a=s[r.attributes[n]]);const l=Object.keys(s);if(!a)if(n==="AUDIO"&&l.length>1&&Vs(e.main))for(let h=0;h<l.length;h++){const p=s[l[h]];if(Wd(p,r)){a=p;break}}else s.main?a=s.main:l.length===1&&(a=s[l[0]]);return typeof t=="undefined"?a:t===null||!a?null:a.filter(h=>h.id===t.id)[0]||null},g0={AUDIO:(n,e)=>()=>{const{mediaTypes:{[n]:{tracks:t}}}=e;for(const i in t)if(t[i].enabled)return t[i];return null},SUBTITLES:(n,e)=>()=>{const{mediaTypes:{[n]:{tracks:t}}}=e;for(const i in t)if(t[i].mode==="showing"||t[i].mode==="hidden")return t[i];return null}},v0=(n,{mediaTypes:e})=>()=>{const t=e[n].activeTrack();return t?e[n].activeGroup(t):null},A0=n=>{["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(p=>{p0[p](p,n)});const{mediaTypes:e,mainPlaylistLoader:t,tech:i,vhs:s,segmentLoaders:{["AUDIO"]:r,main:a}}=n;["AUDIO","SUBTITLES"].forEach(p=>{e[p].activeGroup=m0(p,n),e[p].activeTrack=g0[p](p,n),e[p].onGroupChanged=d0(p,n),e[p].onGroupChanging=h0(p,n),e[p].onTrackChanged=f0(p,n),e[p].getActiveGroup=v0(p,n)});const l=e.AUDIO.activeGroup();if(l){const p=(l.filter(y=>y.default)[0]||l[0]).id;e.AUDIO.tracks[p].enabled=!0,e.AUDIO.onGroupChanged(),e.AUDIO.onTrackChanged(),e.AUDIO.getActiveGroup().playlistLoader?(a.setAudio(!1),r.setAudio(!0)):a.setAudio(!0)}t.on("mediachange",()=>{["AUDIO","SUBTITLES"].forEach(p=>e[p].onGroupChanged())}),t.on("mediachanging",()=>{["AUDIO","SUBTITLES"].forEach(p=>e[p].onGroupChanging())});const h=()=>{e.AUDIO.onTrackChanged(),i.trigger({type:"usage",name:"vhs-audio-change"})};i.audioTracks().addEventListener("change",h),i.remoteTextTracks().addEventListener("change",e.SUBTITLES.onTrackChanged),s.on("dispose",()=>{i.audioTracks().removeEventListener("change",h),i.remoteTextTracks().removeEventListener("change",e.SUBTITLES.onTrackChanged)}),i.clearTracks("audio");for(const p in e.AUDIO.tracks)i.audioTracks().addTrack(e.AUDIO.tracks[p])},y0=()=>{const n={};return["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(e=>{n[e]={groups:{},tracks:{},activePlaylistLoader:null,activeGroup:zi,activeTrack:zi,getActiveGroup:zi,onGroupChanged:zi,onTrackChanged:zi,lastTrack_:null,logger_:oi(`MediaGroups[${e}]`)}}),n};class $d{constructor(){this.priority_=[],this.pathwayClones_=new Map}set version(e){e===1&&(this.version_=e)}set ttl(e){this.ttl_=e||300}set reloadUri(e){e&&(this.reloadUri_=Ht(this.reloadUri_,e))}set priority(e){e&&e.length&&(this.priority_=e)}set pathwayClones(e){e&&e.length&&(this.pathwayClones_=new Map(e.map(t=>[t.ID,t])))}get version(){return this.version_}get ttl(){return this.ttl_}get reloadUri(){return this.reloadUri_}get priority(){return this.priority_}get pathwayClones(){return this.pathwayClones_}}class _0 extends L.EventTarget{constructor(e,t){super(),this.currentPathway=null,this.defaultPathway=null,this.queryBeforeStart=!1,this.availablePathways_=new Set,this.steeringManifest=new $d,this.proxyServerUrl_=null,this.manifestType_=null,this.ttlTimeout_=null,this.request_=null,this.currentPathwayClones=new Map,this.nextPathwayClones=new Map,this.excludedSteeringManifestURLs=new Set,this.logger_=oi("Content Steering"),this.xhr_=e,this.getBandwidth_=t}assignTagProperties(e,t){this.manifestType_=t.serverUri?"HLS":"DASH";const i=t.serverUri||t.serverURL;if(!i){this.logger_(`steering manifest URL is ${i}, cannot request steering manifest.`),this.trigger("error");return}if(i.startsWith("data:")){this.decodeDataUriManifest_(i.substring(i.indexOf(",")+1));return}this.steeringManifest.reloadUri=Ht(e,i),this.defaultPathway=t.pathwayId||t.defaultServiceLocation,this.queryBeforeStart=t.queryBeforeStart,this.proxyServerUrl_=t.proxyServerURL,this.defaultPathway&&!this.queryBeforeStart&&this.trigger("content-steering")}requestSteeringManifest(e){const t=this.steeringManifest.reloadUri;if(!t)return;const i=e?t:this.getRequestURI(t);if(!i){this.logger_("No valid content steering manifest URIs. Stopping content steering."),this.trigger("error"),this.dispose();return}const s={contentSteeringInfo:{uri:i}};this.trigger({type:"contentsteeringloadstart",metadata:s}),this.request_=this.xhr_({uri:i,requestType:"content-steering-manifest"},(r,a)=>{if(r){if(a.status===410){this.logger_(`manifest request 410 ${r}.`),this.logger_(`There will be no more content steering requests to ${i} this session.`),this.excludedSteeringManifestURLs.add(i);return}if(a.status===429){const p=a.responseHeaders["retry-after"];this.logger_(`manifest request 429 ${r}.`),this.logger_(`content steering will retry in ${p} seconds.`),this.startTTLTimeout_(parseInt(p,10));return}this.logger_(`manifest failed to load ${r}.`),this.startTTLTimeout_();return}this.trigger({type:"contentsteeringloadcomplete",metadata:s});let l;try{l=JSON.parse(this.request_.responseText)}catch(p){const g={errorType:L.Error.StreamingContentSteeringParserError,error:p};this.trigger({type:"error",metadata:g})}this.assignSteeringProperties_(l);const h={contentSteeringInfo:s.contentSteeringInfo,contentSteeringManifest:{version:this.steeringManifest.version,reloadUri:this.steeringManifest.reloadUri,priority:this.steeringManifest.priority}};this.trigger({type:"contentsteeringparsed",metadata:h}),this.startTTLTimeout_()})}setProxyServerUrl_(e){const t=new(A()).URL(e),i=new(A()).URL(this.proxyServerUrl_);return i.searchParams.set("url",encodeURI(t.toString())),this.setSteeringParams_(i.toString())}decodeDataUriManifest_(e){const t=JSON.parse(A().atob(e));this.assignSteeringProperties_(t)}setSteeringParams_(e){const t=new(A()).URL(e),i=this.getPathway(),s=this.getBandwidth_();if(i){const r=`_${this.manifestType_}_pathway`;t.searchParams.set(r,i)}if(s){const r=`_${this.manifestType_}_throughput`;t.searchParams.set(r,s)}return t.toString()}assignSteeringProperties_(e){if(this.steeringManifest.version=e.VERSION,!this.steeringManifest.version){this.logger_(`manifest version is ${e.VERSION}, which is not supported.`),this.trigger("error");return}this.steeringManifest.ttl=e.TTL,this.steeringManifest.reloadUri=e["RELOAD-URI"],this.steeringManifest.priority=e["PATHWAY-PRIORITY"]||e["SERVICE-LOCATION-PRIORITY"],this.steeringManifest.pathwayClones=e["PATHWAY-CLONES"],this.nextPathwayClones=this.steeringManifest.pathwayClones,this.availablePathways_.size||(this.logger_("There are no available pathways for content steering. Ending content steering."),this.trigger("error"),this.dispose());const i=(s=>{for(const r of s)if(this.availablePathways_.has(r))return r;return[...this.availablePathways_][0]})(this.steeringManifest.priority);this.currentPathway!==i&&(this.currentPathway=i,this.trigger("content-steering"))}getPathway(){return this.currentPathway||this.defaultPathway}getRequestURI(e){if(!e)return null;const t=s=>this.excludedSteeringManifestURLs.has(s);if(this.proxyServerUrl_){const s=this.setProxyServerUrl_(e);if(!t(s))return s}const i=this.setSteeringParams_(e);return t(i)?null:i}startTTLTimeout_(e=this.steeringManifest.ttl){const t=e*1e3;this.ttlTimeout_=A().setTimeout(()=>{this.requestSteeringManifest()},t)}clearTTLTimeout_(){A().clearTimeout(this.ttlTimeout_),this.ttlTimeout_=null}abort(){this.request_&&this.request_.abort(),this.request_=null}dispose(){this.off("content-steering"),this.off("error"),this.abort(),this.clearTTLTimeout_(),this.currentPathway=null,this.defaultPathway=null,this.queryBeforeStart=null,this.proxyServerUrl_=null,this.manifestType_=null,this.ttlTimeout_=null,this.request_=null,this.excludedSteeringManifestURLs=new Set,this.availablePathways_=new Set,this.steeringManifest=new $d}addAvailablePathway(e){e&&this.availablePathways_.add(e)}clearAvailablePathways(){this.availablePathways_.clear()}excludePathway(e){return this.availablePathways_.delete(e)}didDASHTagChange(e,t){return!t&&this.steeringManifest.reloadUri||t&&(Ht(e,t.serverURL)!==this.steeringManifest.reloadUri||t.defaultServiceLocation!==this.defaultPathway||t.queryBeforeStart!==this.queryBeforeStart||t.proxyServerURL!==this.proxyServerUrl_)}getAvailablePathways(){return this.availablePathways_}}const b0=(n,e)=>{let t=null;return(...i)=>{clearTimeout(t),t=setTimeout(()=>{n.apply(null,i)},e)}},E0=10;let tn;const T0=["mediaRequests","mediaRequestsAborted","mediaRequestsTimedout","mediaRequestsErrored","mediaTransferDuration","mediaBytesTransferred","mediaAppends"],C0=function(n){return this.audioSegmentLoader_[n]+this.mainSegmentLoader_[n]},x0=function({currentPlaylist:n,buffered:e,currentTime:t,nextPlaylist:i,bufferLowWaterLine:s,bufferHighWaterLine:r,duration:a,bufferBasedABR:l,log:h}){if(!i)return L.log.warn("We received no playlist to switch to. Please check your stream."),!1;const p=`allowing switch ${n&&n.id||"null"} -> ${i.id}`;if(!n)return h(`${p} as current playlist is not set`),!0;if(i.id===n.id)return!1;const g=!!Zn(e,t).length;if(!n.endList)return!g&&typeof n.partTargetDuration=="number"?(h(`not ${p} as current playlist is live llhls, but currentTime isn't in buffered.`),!1):(h(`${p} as current playlist is live`),!0);const y=Vo(e,t),w=l?jt.EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE:jt.MAX_BUFFER_LOW_WATER_LINE;if(a<w)return h(`${p} as duration < max low water line (${a} < ${w})`),!0;const D=i.attributes.BANDWIDTH,P=n.attributes.BANDWIDTH;if(D<P&&(!l||y<r)){let E=`${p} as next bandwidth < current bandwidth (${D} < ${P})`;return l&&(E+=` and forwardBuffer < bufferHighWaterLine (${y} < ${r})`),h(E),!0}if((!l||D>P)&&y>=s){let E=`${p} as forwardBuffer >= bufferLowWaterLine (${y} >= ${s})`;return l&&(E+=` and next bandwidth > current bandwidth (${D} > ${P})`),h(E),!0}return h(`not ${p} as no switching criteria met`),!1};class S0 extends L.EventTarget{constructor(e){super(),this.fastQualityChange_=b0(this.fastQualityChange_.bind(this),100);const{src:t,withCredentials:i,tech:s,bandwidth:r,externVhs:a,useCueTags:l,playlistExclusionDuration:h,enableLowInitialPlaylist:p,sourceType:g,cacheEncryptionKeys:y,bufferBasedABR:w,leastPixelDiffSelector:D,captionServices:P,experimentalUseMMS:E}=e;if(!t)throw new Error("A non-empty playlist URL or JSON manifest string is required");let{maxPlaylistRetries:H}=e;(H===null||typeof H=="undefined")&&(H=1/0),tn=a,this.bufferBasedABR=!!w,this.leastPixelDiffSelector=!!D,this.withCredentials=i,this.tech_=s,this.vhs_=s.vhs,this.player_=e.player_,this.sourceType_=g,this.useCueTags_=l,this.playlistExclusionDuration=h,this.maxPlaylistRetries=H,this.enableLowInitialPlaylist=p,this.usingManagedMediaSource_=!1,this.useCueTags_&&(this.cueTagsTrack_=this.tech_.addTextTrack("metadata","ad-cues"),this.cueTagsTrack_.inBandMetadataTrackDispatchType=""),this.requestOptions_={withCredentials:i,maxPlaylistRetries:H,timeout:null},this.on("error",this.pauseLoading),this.mediaTypes_=y0(),E&&A().ManagedMediaSource?(this.tech_.el_.disableRemotePlayback=!0,this.mediaSource=new(A()).ManagedMediaSource,this.usingManagedMediaSource_=!0,L.log("Using ManagedMediaSource")):A().MediaSource&&(this.mediaSource=new(A()).MediaSource),this.handleDurationChange_=this.handleDurationChange_.bind(this),this.handleSourceOpen_=this.handleSourceOpen_.bind(this),this.handleSourceEnded_=this.handleSourceEnded_.bind(this),this.load=this.load.bind(this),this.pause=this.pause.bind(this),this.mediaSource.addEventListener("durationchange",this.handleDurationChange_),this.mediaSource.addEventListener("sourceopen",this.handleSourceOpen_),this.mediaSource.addEventListener("sourceended",this.handleSourceEnded_),this.mediaSource.addEventListener("startstreaming",this.load),this.mediaSource.addEventListener("endstreaming",this.pause),this.seekable_=St(),this.hasPlayed_=!1,this.syncController_=new a0(e),this.segmentMetadataTrack_=s.addRemoteTextTrack({kind:"metadata",label:"segment-metadata"},!1).track,this.decrypter_=new u0,this.sourceUpdater_=new Md(this.mediaSource),this.inbandTextTracks_={},this.timelineChangeController_=new o0,this.keyStatusMap_=new Map;const V={vhs:this.vhs_,parse708captions:e.parse708captions,useDtsForTimestampOffset:e.useDtsForTimestampOffset,captionServices:P,mediaSource:this.mediaSource,currentTime:this.tech_.currentTime.bind(this.tech_),seekable:()=>this.seekable(),seeking:()=>this.tech_.seeking(),duration:()=>this.duration(),hasPlayed:()=>this.hasPlayed_,goalBufferLength:()=>this.goalBufferLength(),bandwidth:r,syncController:this.syncController_,decrypter:this.decrypter_,sourceType:this.sourceType_,inbandTextTracks:this.inbandTextTracks_,cacheEncryptionKeys:y,sourceUpdater:this.sourceUpdater_,timelineChangeController:this.timelineChangeController_,exactManifestTimings:e.exactManifestTimings,addMetadataToTextTrack:this.addMetadataToTextTrack.bind(this)};this.mainPlaylistLoader_=this.sourceType_==="dash"?new Jo(t,this.vhs_,Ye(this.requestOptions_,{addMetadataToTextTrack:this.addMetadataToTextTrack.bind(this)})):new is(t,this.vhs_,Ye(this.requestOptions_,{addDateRangesToTextTrack:this.addDateRangesToTextTrack_.bind(this)})),this.setupMainPlaylistLoaderListeners_(),this.mainSegmentLoader_=new sl(Ye(V,{segmentMetadataTrack:this.segmentMetadataTrack_,loaderType:"main"}),e),this.audioSegmentLoader_=new sl(Ye(V,{loaderType:"audio"}),e),this.subtitleSegmentLoader_=new t0(Ye(V,{loaderType:"vtt",featuresNativeTextTracks:this.tech_.featuresNativeTextTracks,loadVttJs:()=>new Promise((Y,O)=>{function Q(){s.off("vttjserror",Ae),Y()}function Ae(){s.off("vttjsloaded",Q),O()}s.one("vttjsloaded",Q),s.one("vttjserror",Ae),s.addWebVttScript_()})}),e);const U=()=>this.mainSegmentLoader_.bandwidth;this.contentSteeringController_=new _0(this.vhs_.xhr,U),this.setupSegmentLoaderListeners_(),this.bufferBasedABR&&(this.mainPlaylistLoader_.one("loadedplaylist",()=>this.startABRTimer_()),this.tech_.on("pause",()=>this.stopABRTimer_()),this.tech_.on("play",()=>this.startABRTimer_())),T0.forEach(Y=>{this[Y+"_"]=C0.bind(this,Y)}),this.logger_=oi("pc"),this.triggeredFmp4Usage=!1,this.tech_.preload()==="none"?(this.loadOnPlay_=()=>{this.loadOnPlay_=null,this.mainPlaylistLoader_.load()},this.tech_.one("play",this.loadOnPlay_)):this.mainPlaylistLoader_.load(),this.timeToLoadedData__=-1,this.mainAppendsToLoadedData__=-1,this.audioAppendsToLoadedData__=-1;const M=this.tech_.preload()==="none"?"play":"loadstart";this.tech_.one(M,()=>{const Y=Date.now();this.tech_.one("loadeddata",()=>{this.timeToLoadedData__=Date.now()-Y,this.mainAppendsToLoadedData__=this.mainSegmentLoader_.mediaAppends,this.audioAppendsToLoadedData__=this.audioSegmentLoader_.mediaAppends})})}mainAppendsToLoadedData_(){return this.mainAppendsToLoadedData__}audioAppendsToLoadedData_(){return this.audioAppendsToLoadedData__}appendsToLoadedData_(){const e=this.mainAppendsToLoadedData_(),t=this.audioAppendsToLoadedData_();return e===-1||t===-1?-1:e+t}timeToLoadedData_(){return this.timeToLoadedData__}checkABR_(e="abr"){const t=this.selectPlaylist();t&&this.shouldSwitchToMedia_(t)&&this.switchMedia_(t,e)}switchMedia_(e,t,i){const s=this.media(),r=s&&(s.id||s.uri),a=e&&(e.id||e.uri);if(r&&r!==a){this.logger_(`switch media ${r} -> ${a} from ${t}`);const l={renditionInfo:{id:a,bandwidth:e.attributes.BANDWIDTH,resolution:e.attributes.RESOLUTION,codecs:e.attributes.CODECS},cause:t};this.trigger({type:"renditionselected",metadata:l}),this.tech_.trigger({type:"usage",name:`vhs-rendition-change-${t}`})}this.mainPlaylistLoader_.media(e,i)}switchMediaForDASHContentSteering_(){["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(e=>{const t=this.mediaTypes_[e],i=t?t.activeGroup():null,s=this.contentSteeringController_.getPathway();if(i&&s){const a=(i.length?i[0].playlists:i.playlists).filter(l=>l.attributes.serviceLocation===s);a.length&&this.mediaTypes_[e].activePlaylistLoader.media(a[0])}})}startABRTimer_(){this.stopABRTimer_(),this.abrTimer_=A().setInterval(()=>this.checkABR_(),250)}stopABRTimer_(){this.tech_.scrubbing&&this.tech_.scrubbing()||(A().clearInterval(this.abrTimer_),this.abrTimer_=null)}getAudioTrackPlaylists_(){const e=this.main(),t=e&&e.playlists||[];if(!e||!e.mediaGroups||!e.mediaGroups.AUDIO)return t;const i=e.mediaGroups.AUDIO,s=Object.keys(i);let r;if(Object.keys(this.mediaTypes_.AUDIO.groups).length)r=this.mediaTypes_.AUDIO.activeTrack();else{const l=i.main||s.length&&i[s[0]];for(const h in l)if(l[h].default){r={label:h};break}}if(!r)return t;const a=[];for(const l in i)if(i[l][r.label]){const h=i[l][r.label];if(h.playlists&&h.playlists.length)a.push.apply(a,h.playlists);else if(h.uri)a.push(h);else if(e.playlists.length)for(let p=0;p<e.playlists.length;p++){const g=e.playlists[p];g.attributes&&g.attributes.AUDIO&&g.attributes.AUDIO===l&&a.push(g)}}return a.length?a:t}setupMainPlaylistLoaderListeners_(){this.mainPlaylistLoader_.on("loadedmetadata",()=>{const t=this.mainPlaylistLoader_.media(),i=t.targetDuration*1.5*1e3;Wo(this.mainPlaylistLoader_.main,this.mainPlaylistLoader_.media())?this.requestOptions_.timeout=0:this.requestOptions_.timeout=i,t.endList&&this.tech_.preload()!=="none"&&(this.mainSegmentLoader_.playlist(t,this.requestOptions_),this.mainSegmentLoader_.load()),A0({sourceType:this.sourceType_,segmentLoaders:{AUDIO:this.audioSegmentLoader_,SUBTITLES:this.subtitleSegmentLoader_,main:this.mainSegmentLoader_},tech:this.tech_,requestOptions:this.requestOptions_,mainPlaylistLoader:this.mainPlaylistLoader_,vhs:this.vhs_,main:this.main(),mediaTypes:this.mediaTypes_,excludePlaylist:this.excludePlaylist.bind(this)}),this.triggerPresenceUsage_(this.main(),t),this.setupFirstPlay(),!this.mediaTypes_.AUDIO.activePlaylistLoader||this.mediaTypes_.AUDIO.activePlaylistLoader.media()?this.trigger("selectedinitialmedia"):this.mediaTypes_.AUDIO.activePlaylistLoader.one("loadedmetadata",()=>{this.trigger("selectedinitialmedia")})}),this.mainPlaylistLoader_.on("loadedplaylist",()=>{this.loadOnPlay_&&this.tech_.off("play",this.loadOnPlay_);let t=this.mainPlaylistLoader_.media();if(!t){this.attachContentSteeringListeners_(),this.initContentSteeringController_(),this.excludeUnsupportedVariants_();let i;if(this.enableLowInitialPlaylist&&(i=this.selectInitialPlaylist()),i||(i=this.selectPlaylist()),!i||!this.shouldSwitchToMedia_(i)||(this.initialMedia_=i,this.switchMedia_(this.initialMedia_,"initial"),!(this.sourceType_==="vhs-json"&&this.initialMedia_.segments)))return;t=this.initialMedia_}this.handleUpdatedMediaPlaylist(t)}),this.mainPlaylistLoader_.on("error",()=>{const t=this.mainPlaylistLoader_.error;this.excludePlaylist({playlistToExclude:t.playlist,error:t})}),this.mainPlaylistLoader_.on("mediachanging",()=>{this.mainSegmentLoader_.abort(),this.mainSegmentLoader_.pause()}),this.mainPlaylistLoader_.on("mediachange",()=>{const t=this.mainPlaylistLoader_.media(),i=t.targetDuration*1.5*1e3;Wo(this.mainPlaylistLoader_.main,this.mainPlaylistLoader_.media())?this.requestOptions_.timeout=0:this.requestOptions_.timeout=i,this.sourceType_==="dash"&&this.mainPlaylistLoader_.isPaused&&this.mainPlaylistLoader_.load(),this.mainSegmentLoader_.pause(),this.mainSegmentLoader_.playlist(t,this.requestOptions_),this.waitingForFastQualityPlaylistReceived_?this.runFastQualitySwitch_():this.mainSegmentLoader_.load(),this.tech_.trigger({type:"mediachange",bubbles:!0})}),this.mainPlaylistLoader_.on("playlistunchanged",()=>{const t=this.mainPlaylistLoader_.media();if(t.lastExcludeReason_==="playlist-unchanged")return;this.stuckAtPlaylistEnd_(t)&&(this.excludePlaylist({error:{message:"Playlist no longer updating.",reason:"playlist-unchanged"}}),this.tech_.trigger("playliststuck"))}),this.mainPlaylistLoader_.on("renditiondisabled",()=>{this.tech_.trigger({type:"usage",name:"vhs-rendition-disabled"})}),this.mainPlaylistLoader_.on("renditionenabled",()=>{this.tech_.trigger({type:"usage",name:"vhs-rendition-enabled"})}),["manifestrequeststart","manifestrequestcomplete","manifestparsestart","manifestparsecomplete","playlistrequeststart","playlistrequestcomplete","playlistparsestart","playlistparsecomplete","renditiondisabled","renditionenabled"].forEach(t=>{this.mainPlaylistLoader_.on(t,i=>{this.player_.trigger((0,ge.A)({},i))})})}handleUpdatedMediaPlaylist(e){this.useCueTags_&&this.updateAdCues_(e),this.mainSegmentLoader_.pause(),this.mainSegmentLoader_.playlist(e,this.requestOptions_),this.waitingForFastQualityPlaylistReceived_&&this.runFastQualitySwitch_(),this.updateDuration(!e.endList),this.tech_.paused()||(this.mainSegmentLoader_.load(),this.audioSegmentLoader_&&this.audioSegmentLoader_.load())}triggerPresenceUsage_(e,t){const i=e.mediaGroups||{};let s=!0;const r=Object.keys(i.AUDIO);for(const a in i.AUDIO)for(const l in i.AUDIO[a])i.AUDIO[a][l].uri||(s=!1);s&&this.tech_.trigger({type:"usage",name:"vhs-demuxed"}),Object.keys(i.SUBTITLES).length&&this.tech_.trigger({type:"usage",name:"vhs-webvtt"}),tn.Playlist.isAes(t)&&this.tech_.trigger({type:"usage",name:"vhs-aes"}),r.length&&Object.keys(i.AUDIO[r[0]]).length>1&&this.tech_.trigger({type:"usage",name:"vhs-alternate-audio"}),this.useCueTags_&&this.tech_.trigger({type:"usage",name:"vhs-playlist-cue-tags"})}shouldSwitchToMedia_(e){const t=this.mainPlaylistLoader_.media()||this.mainPlaylistLoader_.pendingMedia_,i=this.tech_.currentTime(),s=this.bufferLowWaterLine(),r=this.bufferHighWaterLine(),a=this.tech_.buffered();return x0({buffered:a,currentTime:i,currentPlaylist:t,nextPlaylist:e,bufferLowWaterLine:s,bufferHighWaterLine:r,duration:this.duration(),bufferBasedABR:this.bufferBasedABR,log:this.logger_})}setupSegmentLoaderListeners_(){this.mainSegmentLoader_.on("bandwidthupdate",()=>{this.checkABR_("bandwidthupdate"),this.tech_.trigger("bandwidthupdate")}),this.mainSegmentLoader_.on("timeout",()=>{this.bufferBasedABR&&this.mainSegmentLoader_.load()}),this.bufferBasedABR||this.mainSegmentLoader_.on("progress",()=>{this.trigger("progress")}),this.mainSegmentLoader_.on("error",()=>{const i=this.mainSegmentLoader_.error();this.excludePlaylist({playlistToExclude:i.playlist,error:i})}),this.mainSegmentLoader_.on("appenderror",()=>{this.error=this.mainSegmentLoader_.error_,this.trigger("error")}),this.mainSegmentLoader_.on("syncinfoupdate",()=>{this.onSyncInfoUpdate_()}),this.mainSegmentLoader_.on("timestampoffset",()=>{this.tech_.trigger({type:"usage",name:"vhs-timestamp-offset"})}),this.audioSegmentLoader_.on("syncinfoupdate",()=>{this.onSyncInfoUpdate_()}),this.audioSegmentLoader_.on("appenderror",()=>{this.error=this.audioSegmentLoader_.error_,this.trigger("error")}),this.mainSegmentLoader_.on("ended",()=>{this.logger_("main segment loader ended"),this.onEndOfStream()}),this.timelineChangeController_.on("audioTimelineBehind",()=>{const i=this.audioSegmentLoader_.pendingSegment_;if(!i||!i.segment||!i.segment.syncInfo)return;const s=i.segment.syncInfo.end+.01;this.tech_.setCurrentTime(s)}),this.timelineChangeController_.on("fixBadTimelineChange",()=>{this.logger_("Fix bad timeline change. Restarting al segment loaders..."),this.mainSegmentLoader_.pause(),this.mainSegmentLoader_.resetEverything(),this.mediaTypes_.AUDIO.activePlaylistLoader&&(this.audioSegmentLoader_.pause(),this.audioSegmentLoader_.resetEverything()),this.mediaTypes_.SUBTITLES.activePlaylistLoader&&(this.subtitleSegmentLoader_.pause(),this.subtitleSegmentLoader_.resetEverything()),this.load()}),this.mainSegmentLoader_.on("earlyabort",i=>{this.bufferBasedABR||(this.delegateLoaders_("all",["abort"]),this.excludePlaylist({error:{message:"Aborted early because there isn't enough bandwidth to complete the request without rebuffering."},playlistExclusionDuration:E0}))});const e=()=>{if(!this.sourceUpdater_.hasCreatedSourceBuffers())return this.tryToCreateSourceBuffers_();const i=this.getCodecsOrExclude_();i&&this.sourceUpdater_.addOrChangeSourceBuffers(i)};this.mainSegmentLoader_.on("trackinfo",e),this.audioSegmentLoader_.on("trackinfo",e),this.mainSegmentLoader_.on("fmp4",()=>{this.triggeredFmp4Usage||(this.tech_.trigger({type:"usage",name:"vhs-fmp4"}),this.triggeredFmp4Usage=!0)}),this.audioSegmentLoader_.on("fmp4",()=>{this.triggeredFmp4Usage||(this.tech_.trigger({type:"usage",name:"vhs-fmp4"}),this.triggeredFmp4Usage=!0)}),this.audioSegmentLoader_.on("ended",()=>{this.logger_("audioSegmentLoader ended"),this.onEndOfStream()}),["segmentselected","segmentloadstart","segmentloaded","segmentkeyloadstart","segmentkeyloadcomplete","segmentdecryptionstart","segmentdecryptioncomplete","segmenttransmuxingstart","segmenttransmuxingcomplete","segmenttransmuxingtrackinfoavailable","segmenttransmuxingtiminginfoavailable","segmentappendstart","appendsdone","bandwidthupdated","timelinechange","codecschange"].forEach(i=>{this.mainSegmentLoader_.on(i,s=>{this.player_.trigger((0,ge.A)({},s))}),this.audioSegmentLoader_.on(i,s=>{this.player_.trigger((0,ge.A)({},s))}),this.subtitleSegmentLoader_.on(i,s=>{this.player_.trigger((0,ge.A)({},s))})})}mediaSecondsLoaded_(){return Math.max(this.audioSegmentLoader_.mediaSecondsLoaded+this.mainSegmentLoader_.mediaSecondsLoaded)}load(){this.mainSegmentLoader_.load(),this.mediaTypes_.AUDIO.activePlaylistLoader&&this.audioSegmentLoader_.load(),this.mediaTypes_.SUBTITLES.activePlaylistLoader&&this.subtitleSegmentLoader_.load()}pause(){this.mainSegmentLoader_.pause(),this.mediaTypes_.AUDIO.activePlaylistLoader&&this.audioSegmentLoader_.pause(),this.mediaTypes_.SUBTITLES.activePlaylistLoader&&this.subtitleSegmentLoader_.pause()}fastQualityChange_(e=this.selectPlaylist()){if(e&&e===this.mainPlaylistLoader_.media()){this.logger_("skipping fastQualityChange because new media is same as old");return}this.switchMedia_(e,"fast-quality"),this.waitingForFastQualityPlaylistReceived_=!0}runFastQualitySwitch_(){this.waitingForFastQualityPlaylistReceived_=!1,this.mainSegmentLoader_.pause(),this.mainSegmentLoader_.resetEverything(),this.mediaTypes_.AUDIO.activePlaylistLoader&&(this.audioSegmentLoader_.pause(),this.audioSegmentLoader_.resetEverything()),this.mediaTypes_.SUBTITLES.activePlaylistLoader&&(this.subtitleSegmentLoader_.pause(),this.subtitleSegmentLoader_.resetEverything()),this.load()}play(){if(this.setupFirstPlay())return;this.tech_.ended()&&this.tech_.setCurrentTime(0),this.hasPlayed_&&this.load();const e=this.tech_.seekable();if(this.tech_.duration()===1/0&&this.tech_.currentTime()<e.start(0))return this.tech_.setCurrentTime(e.end(e.length-1))}setupFirstPlay(){const e=this.mainPlaylistLoader_.media();if(!e||this.tech_.paused()||this.hasPlayed_)return!1;if(!e.endList||e.start){const t=this.seekable();if(!t.length)return!1;const i=t.end(0);let s=i;if(e.start){const r=e.start.timeOffset;r<0?s=Math.max(i+r,t.start(0)):s=Math.min(i,r)}this.trigger("firstplay"),this.tech_.setCurrentTime(s)}return this.hasPlayed_=!0,this.load(),!0}handleSourceOpen_(){if(this.tryToCreateSourceBuffers_(),this.tech_.autoplay()){const e=this.tech_.play();typeof e!="undefined"&&typeof e.then=="function"&&e.then(null,t=>{})}this.trigger("sourceopen")}handleSourceEnded_(){if(!this.inbandTextTracks_.metadataTrack_)return;const e=this.inbandTextTracks_.metadataTrack_.cues;if(!e||!e.length)return;const t=this.duration();e[e.length-1].endTime=isNaN(t)||Math.abs(t)===1/0?Number.MAX_VALUE:t}handleDurationChange_(){this.tech_.trigger("durationchange")}onEndOfStream(){let e=this.mainSegmentLoader_.ended_;if(this.mediaTypes_.AUDIO.activePlaylistLoader){const t=this.mainSegmentLoader_.getCurrentMediaInfo_();!t||t.hasVideo?e=e&&this.audioSegmentLoader_.ended_:e=this.audioSegmentLoader_.ended_}e&&(this.stopABRTimer_(),this.sourceUpdater_.endOfStream())}stuckAtPlaylistEnd_(e){if(!this.seekable().length)return!1;const i=this.syncController_.getExpiredTime(e,this.duration());if(i===null)return!1;const s=tn.Playlist.playlistEnd(e,i),r=this.tech_.currentTime(),a=this.tech_.buffered();if(!a.length)return s-r<=wi;const l=a.end(a.length-1);return l-r<=wi&&s-l<=wi}excludePlaylist({playlistToExclude:e=this.mainPlaylistLoader_.media(),error:t={},playlistExclusionDuration:i}){if(e=e||this.mainPlaylistLoader_.media(),i=i||t.playlistExclusionDuration||this.playlistExclusionDuration,!e){this.error=t,this.mediaSource.readyState!=="open"?this.trigger("error"):this.sourceUpdater_.endOfStream("network");return}e.playlistErrors_++;const s=this.mainPlaylistLoader_.main.playlists,r=s.filter(ea),a=r.length===1&&r[0]===e;if(s.length===1&&i!==1/0)return L.log.warn(`Problem encountered with playlist ${e.id}. Trying again since it is the only playlist.`),this.tech_.trigger("retryplaylist"),this.mainPlaylistLoader_.load(a);if(a){if(this.main().contentSteering){const P=this.pathwayAttribute_(e),E=this.contentSteeringController_.steeringManifest.ttl*1e3;this.contentSteeringController_.excludePathway(P),this.excludeThenChangePathway_(),setTimeout(()=>{this.contentSteeringController_.addAvailablePathway(P)},E);return}let D=!1;s.forEach(P=>{if(P===e)return;const E=P.excludeUntil;typeof E!="undefined"&&E!==1/0&&(D=!0,delete P.excludeUntil)}),D&&(L.log.warn("Removing other playlists from the exclusion list because the last rendition is about to be excluded."),this.tech_.trigger("retryplaylist"))}let l;e.playlistErrors_>this.maxPlaylistRetries?l=1/0:l=Date.now()+i*1e3,e.excludeUntil=l,t.reason&&(e.lastExcludeReason_=t.reason),this.tech_.trigger("excludeplaylist"),this.tech_.trigger({type:"usage",name:"vhs-rendition-excluded"});const h=this.selectPlaylist();if(!h){this.error="Playback cannot continue. No available working or supported playlists.",this.trigger("error");return}const p=t.internal?this.logger_:L.log.warn,g=t.message?" "+t.message:"";p(`${t.internal?"Internal problem":"Problem"} encountered with playlist ${e.id}.${g} Switching to playlist ${h.id}.`),h.attributes.AUDIO!==e.attributes.AUDIO&&this.delegateLoaders_("audio",["abort","pause"]),h.attributes.SUBTITLES!==e.attributes.SUBTITLES&&this.delegateLoaders_("subtitle",["abort","pause"]),this.delegateLoaders_("main",["abort","pause"]);const y=h.targetDuration/2*1e3||5*1e3,w=typeof h.lastRequest=="number"&&Date.now()-h.lastRequest<=y;return this.switchMedia_(h,"exclude",a||w)}pauseLoading(){this.delegateLoaders_("all",["abort","pause"]),this.stopABRTimer_()}delegateLoaders_(e,t){const i=[],s=e==="all";(s||e==="main")&&i.push(this.mainPlaylistLoader_);const r=[];(s||e==="audio")&&r.push("AUDIO"),(s||e==="subtitle")&&(r.push("CLOSED-CAPTIONS"),r.push("SUBTITLES")),r.forEach(a=>{const l=this.mediaTypes_[a]&&this.mediaTypes_[a].activePlaylistLoader;l&&i.push(l)}),["main","audio","subtitle"].forEach(a=>{const l=this[`${a}SegmentLoader_`];l&&(e===a||e==="all")&&i.push(l)}),i.forEach(a=>t.forEach(l=>{typeof a[l]=="function"&&a[l]()}))}setCurrentTime(e){const t=Zn(this.tech_.buffered(),e);if(!(this.mainPlaylistLoader_&&this.mainPlaylistLoader_.media())||!this.mainPlaylistLoader_.media().segments)return 0;if(t&&t.length)return e;this.mainSegmentLoader_.pause(),this.mainSegmentLoader_.resetEverything(),this.mediaTypes_.AUDIO.activePlaylistLoader&&(this.audioSegmentLoader_.pause(),this.audioSegmentLoader_.resetEverything()),this.mediaTypes_.SUBTITLES.activePlaylistLoader&&(this.subtitleSegmentLoader_.pause(),this.subtitleSegmentLoader_.resetEverything()),this.load()}duration(){if(!this.mainPlaylistLoader_)return 0;const e=this.mainPlaylistLoader_.media();return e?e.endList?this.mediaSource?this.mediaSource.duration:tn.Playlist.duration(e):1/0:0}seekable(){return this.seekable_}getSeekableRange_(e,t){const i=e.media();if(!i)return null;const s=this.syncController_.getMediaSequenceSync(t);if(s&&s.isReliable){const l=s.start,h=s.end;if(!isFinite(l)||!isFinite(h))return null;const p=tn.Playlist.liveEdgeDelay(this.mainPlaylistLoader_.main,i),g=Math.max(0,h-p);return g<l?null:St([[l,g]])}const r=this.syncController_.getExpiredTime(i,this.duration());if(r===null)return null;const a=tn.Playlist.seekable(i,r,tn.Playlist.liveEdgeDelay(this.mainPlaylistLoader_.main,i));return a.length?a:null}computeFinalSeekable_(e,t){if(!t)return e;const i=e.start(0),s=e.end(0),r=t.start(0),a=t.end(0);return r>s||i>a?e:St([[Math.max(i,r),Math.min(s,a)]])}onSyncInfoUpdate_(){if(!this.mainPlaylistLoader_)return;const e=this.getSeekableRange_(this.mainPlaylistLoader_,"main");if(!e)return;let t;if(this.mediaTypes_.AUDIO.activePlaylistLoader&&(t=this.getSeekableRange_(this.mediaTypes_.AUDIO.activePlaylistLoader,"audio"),!t))return;const i=this.seekable_;if(this.seekable_=this.computeFinalSeekable_(e,t),!this.seekable_||i&&i.length&&this.seekable_.length&&i.start(0)===this.seekable_.start(0)&&i.end(0)===this.seekable_.end(0))return;this.logger_(`seekable updated [${Rc(this.seekable_)}]`);const s={seekableRanges:this.seekable_};this.trigger({type:"seekablerangeschanged",metadata:s}),this.tech_.trigger("seekablechanged")}updateDuration(e){if(this.updateDuration_&&(this.mediaSource.removeEventListener("sourceopen",this.updateDuration_),this.updateDuration_=null),this.mediaSource.readyState!=="open"){this.updateDuration_=this.updateDuration.bind(this,e),this.mediaSource.addEventListener("sourceopen",this.updateDuration_);return}if(e){const s=this.seekable();if(!s.length)return;(isNaN(this.mediaSource.duration)||this.mediaSource.duration<s.end(s.length-1))&&this.sourceUpdater_.setDuration(s.end(s.length-1));return}const t=this.tech_.buffered();let i=tn.Playlist.duration(this.mainPlaylistLoader_.media());t.length>0&&(i=Math.max(i,t.end(t.length-1))),this.mediaSource.duration!==i&&this.sourceUpdater_.setDuration(i)}dispose(){this.trigger("dispose"),this.decrypter_.terminate(),this.mainPlaylistLoader_.dispose(),this.mainSegmentLoader_.dispose(),this.contentSteeringController_.dispose(),this.keyStatusMap_.clear(),this.loadOnPlay_&&this.tech_.off("play",this.loadOnPlay_),["AUDIO","SUBTITLES"].forEach(e=>{const t=this.mediaTypes_[e].groups;for(const i in t)t[i].forEach(s=>{s.playlistLoader&&s.playlistLoader.dispose()})}),this.audioSegmentLoader_.dispose(),this.subtitleSegmentLoader_.dispose(),this.sourceUpdater_.dispose(),this.timelineChangeController_.dispose(),this.stopABRTimer_(),this.updateDuration_&&this.mediaSource.removeEventListener("sourceopen",this.updateDuration_),this.mediaSource.removeEventListener("durationchange",this.handleDurationChange_),this.mediaSource.removeEventListener("sourceopen",this.handleSourceOpen_),this.mediaSource.removeEventListener("sourceended",this.handleSourceEnded_),this.off()}main(){return this.mainPlaylistLoader_.main}media(){return this.mainPlaylistLoader_.media()||this.initialMedia_}areMediaTypesKnown_(){const e=!!this.mediaTypes_.AUDIO.activePlaylistLoader,t=!!this.mainSegmentLoader_.getCurrentMediaInfo_(),i=e?!!this.audioSegmentLoader_.getCurrentMediaInfo_():!0;return!(!t||!i)}getCodecsOrExclude_(){const e={main:this.mainSegmentLoader_.getCurrentMediaInfo_()||{},audio:this.audioSegmentLoader_.getCurrentMediaInfo_()||{}},t=this.mainSegmentLoader_.getPendingSegmentPlaylist()||this.media();e.video=e.main;const i=zs(this.main(),t),s={},r=!!this.mediaTypes_.AUDIO.activePlaylistLoader;if(e.main.hasVideo&&(s.video=i.video||e.main.videoCodec||_t),e.main.isMuxed&&(s.video+=`,${i.audio||e.main.audioCodec||je}`),(e.main.hasAudio&&!e.main.isMuxed||e.audio.hasAudio||r)&&(s.audio=i.audio||e.main.audioCodec||e.audio.audioCodec||je,e.audio.isFmp4=e.main.hasAudio&&!e.main.isMuxed?e.main.isFmp4:e.audio.isFmp4),!s.audio&&!s.video){this.excludePlaylist({playlistToExclude:t,error:{message:"Could not determine codecs for playlist."},playlistExclusionDuration:1/0});return}const a=(p,g)=>p?qe(g,this.usingManagedMediaSource_):xe(g),l={};let h;if(["video","audio"].forEach(function(p){if(s.hasOwnProperty(p)&&!a(e[p].isFmp4,s[p])){const g=e[p].isFmp4?"browser":"muxer";l[g]=l[g]||[],l[g].push(s[p]),p==="audio"&&(h=g)}}),r&&h&&t.attributes.AUDIO){const p=t.attributes.AUDIO;this.main().playlists.forEach(g=>{(g.attributes&&g.attributes.AUDIO)===p&&g!==t&&(g.excludeUntil=1/0)}),this.logger_(`excluding audio group ${p} as ${h} does not support codec(s): "${s.audio}"`)}if(Object.keys(l).length){const p=Object.keys(l).reduce((g,y)=>(g&&(g+=", "),g+=`${y} does not support codec(s): "${l[y].join(",")}"`,g),"")+".";this.excludePlaylist({playlistToExclude:t,error:{internal:!0,message:p},playlistExclusionDuration:1/0});return}if(this.sourceUpdater_.hasCreatedSourceBuffers()&&!this.sourceUpdater_.canChangeType()){const p=[];if(["video","audio"].forEach(g=>{const y=(W(this.sourceUpdater_.codecs[g]||"")[0]||{}).type,w=(W(s[g]||"")[0]||{}).type;y&&w&&y.toLowerCase()!==w.toLowerCase()&&p.push(`"${this.sourceUpdater_.codecs[g]}" -> "${s[g]}"`)}),p.length){this.excludePlaylist({playlistToExclude:t,error:{message:`Codec switching not supported: ${p.join(", ")}.`,internal:!0},playlistExclusionDuration:1/0});return}}return s}tryToCreateSourceBuffers_(){if(this.mediaSource.readyState!=="open"||this.sourceUpdater_.hasCreatedSourceBuffers()||!this.areMediaTypesKnown_())return;const e=this.getCodecsOrExclude_();if(!e)return;this.sourceUpdater_.createSourceBuffers(e);const t=[e.video,e.audio].filter(Boolean).join(",");this.excludeIncompatibleVariants_(t)}excludeUnsupportedVariants_(){const e=this.main().playlists,t=[];Object.keys(e).forEach(i=>{const s=e[i];if(t.indexOf(s.id)!==-1)return;t.push(s.id);const r=zs(this.main,s),a=[];r.audio&&!xe(r.audio)&&!qe(r.audio,this.usingManagedMediaSource_)&&a.push(`audio codec ${r.audio}`),r.video&&!xe(r.video)&&!qe(r.video,this.usingManagedMediaSource_)&&a.push(`video codec ${r.video}`),r.text&&r.text==="stpp.ttml.im1t"&&a.push(`text codec ${r.text}`),a.length&&(s.excludeUntil=1/0,this.logger_(`excluding ${s.id} for unsupported: ${a.join(", ")}`))})}excludeIncompatibleVariants_(e){const t=[],i=this.main().playlists,s=ia(W(e)),r=xd(s),a=s.video&&W(s.video)[0]||null,l=s.audio&&W(s.audio)[0]||null;Object.keys(i).forEach(h=>{const p=i[h];if(t.indexOf(p.id)!==-1||p.excludeUntil===1/0)return;t.push(p.id);const g=[],y=zs(this.mainPlaylistLoader_.main,p),w=xd(y);if(!(!y.audio&&!y.video)){if(w!==r&&g.push(`codec count "${w}" !== "${r}"`),!this.sourceUpdater_.canChangeType()){const D=y.video&&W(y.video)[0]||null,P=y.audio&&W(y.audio)[0]||null;D&&a&&D.type.toLowerCase()!==a.type.toLowerCase()&&g.push(`video codec "${D.type}" !== "${a.type}"`),P&&l&&P.type.toLowerCase()!==l.type.toLowerCase()&&g.push(`audio codec "${P.type}" !== "${l.type}"`)}g.length&&(p.excludeUntil=1/0,this.logger_(`excluding ${p.id}: ${g.join(" && ")}`))}})}updateAdCues_(e){let t=0;const i=this.seekable();i.length&&(t=i.start(0)),n0(e,this.cueTagsTrack_,t)}goalBufferLength(){const e=this.tech_.currentTime(),t=jt.GOAL_BUFFER_LENGTH,i=jt.GOAL_BUFFER_LENGTH_RATE,s=Math.max(t,jt.MAX_GOAL_BUFFER_LENGTH);return Math.min(t+e*i,s)}bufferLowWaterLine(){const e=this.tech_.currentTime(),t=jt.BUFFER_LOW_WATER_LINE,i=jt.BUFFER_LOW_WATER_LINE_RATE,s=Math.max(t,jt.MAX_BUFFER_LOW_WATER_LINE),r=Math.max(t,jt.EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE);return Math.min(t+e*i,this.bufferBasedABR?r:s)}bufferHighWaterLine(){return jt.BUFFER_HIGH_WATER_LINE}addDateRangesToTextTrack_(e){Dd(this.inbandTextTracks_,"com.apple.streaming",this.tech_),Rg({inbandTextTracks:this.inbandTextTracks_,dateRanges:e})}addMetadataToTextTrack(e,t,i){const s=this.sourceUpdater_.videoBuffer?this.sourceUpdater_.videoTimestampOffset():this.sourceUpdater_.audioTimestampOffset();Dd(this.inbandTextTracks_,e,this.tech_),Pg({inbandTextTracks:this.inbandTextTracks_,metadataArray:t,timestampOffset:s,videoDuration:i})}pathwayAttribute_(e){return e.attributes["PATHWAY-ID"]||e.attributes.serviceLocation}initContentSteeringController_(){const e=this.main();if(e.contentSteering){for(const t of e.playlists)this.contentSteeringController_.addAvailablePathway(this.pathwayAttribute_(t));if(this.contentSteeringController_.assignTagProperties(e.uri,e.contentSteering),this.contentSteeringController_.queryBeforeStart){this.contentSteeringController_.requestSteeringManifest(!0);return}this.tech_.one("canplay",()=>{this.contentSteeringController_.requestSteeringManifest()})}}resetContentSteeringController_(){this.contentSteeringController_.clearAvailablePathways(),this.contentSteeringController_.dispose(),this.initContentSteeringController_()}attachContentSteeringListeners_(){this.contentSteeringController_.on("content-steering",this.excludeThenChangePathway_.bind(this)),["contentsteeringloadstart","contentsteeringloadcomplete","contentsteeringparsed"].forEach(t=>{this.contentSteeringController_.on(t,i=>{this.trigger((0,ge.A)({},i))})}),this.sourceType_==="dash"&&this.mainPlaylistLoader_.on("loadedplaylist",()=>{const t=this.main();(this.contentSteeringController_.didDASHTagChange(t.uri,t.contentSteering)||(()=>{const r=this.contentSteeringController_.getAvailablePathways(),a=[];for(const l of t.playlists){const h=l.attributes.serviceLocation;if(h&&(a.push(h),!r.has(h)))return!0}return!!(!a.length&&r.size)})())&&this.resetContentSteeringController_()})}excludeThenChangePathway_(){const e=this.contentSteeringController_.getPathway();if(!e)return;this.handlePathwayClones_();const i=this.main().playlists,s=new Set;let r=!1;Object.keys(i).forEach(a=>{const l=i[a],h=this.pathwayAttribute_(l),p=h&&e!==h;l.excludeUntil===1/0&&l.lastExcludeReason_==="content-steering"&&!p&&(delete l.excludeUntil,delete l.lastExcludeReason_,r=!0);const y=!l.excludeUntil&&l.excludeUntil!==1/0;!s.has(l.id)&&p&&y&&(s.add(l.id),l.excludeUntil=1/0,l.lastExcludeReason_="content-steering",this.logger_(`excluding ${l.id} for ${l.lastExcludeReason_}`))}),this.contentSteeringController_.manifestType_==="DASH"&&Object.keys(this.mediaTypes_).forEach(a=>{const l=this.mediaTypes_[a];if(l.activePlaylistLoader){const h=l.activePlaylistLoader.media_;h&&h.attributes.serviceLocation!==e&&(r=!0)}}),r&&this.changeSegmentPathway_()}handlePathwayClones_(){const t=this.main().playlists,i=this.contentSteeringController_.currentPathwayClones,s=this.contentSteeringController_.nextPathwayClones;if(i&&i.size||s&&s.size){for(const[a,l]of i.entries())s.get(a)||(this.mainPlaylistLoader_.updateOrDeleteClone(l),this.contentSteeringController_.excludePathway(a));for(const[a,l]of s.entries()){const h=i.get(a);if(!h){t.filter(g=>g.attributes["PATHWAY-ID"]===l["BASE-ID"]).forEach(g=>{this.mainPlaylistLoader_.addClonePathway(l,g)}),this.contentSteeringController_.addAvailablePathway(a);continue}this.equalPathwayClones_(h,l)||(this.mainPlaylistLoader_.updateOrDeleteClone(l,!0),this.contentSteeringController_.addAvailablePathway(a))}this.contentSteeringController_.currentPathwayClones=new Map(JSON.parse(JSON.stringify([...s])))}}equalPathwayClones_(e,t){if(e["BASE-ID"]!==t["BASE-ID"]||e.ID!==t.ID||e["URI-REPLACEMENT"].HOST!==t["URI-REPLACEMENT"].HOST)return!1;const i=e["URI-REPLACEMENT"].PARAMS,s=t["URI-REPLACEMENT"].PARAMS;for(const r in i)if(i[r]!==s[r])return!1;for(const r in s)if(i[r]!==s[r])return!1;return!0}changeSegmentPathway_(){const e=this.selectPlaylist();this.pauseLoading(),this.contentSteeringController_.manifestType_==="DASH"&&this.switchMediaForDASHContentSteering_(),this.switchMedia_(e,"content-steering")}excludeNonUsablePlaylistsByKeyId_(){if(!this.mainPlaylistLoader_||!this.mainPlaylistLoader_.main)return;let e=0;const t="non-usable";this.mainPlaylistLoader_.main.playlists.forEach(i=>{const s=this.mainPlaylistLoader_.getKeyIdSet(i);!s||!s.size||s.forEach(r=>{const a="usable",l=this.keyStatusMap_.has(r)&&this.keyStatusMap_.get(r)===a,h=i.lastExcludeReason_===t&&i.excludeUntil===1/0;l?l&&h&&(delete i.excludeUntil,delete i.lastExcludeReason_,this.logger_(`enabling playlist ${i.id} because key ID ${r} is ${a}`)):(i.excludeUntil!==1/0&&i.lastExcludeReason_!==t&&(i.excludeUntil=1/0,i.lastExcludeReason_=t,this.logger_(`excluding playlist ${i.id} because the key ID ${r} doesn't exist in the keyStatusMap or is not ${a}`)),e++)})}),e>=this.mainPlaylistLoader_.main.playlists.length&&this.mainPlaylistLoader_.main.playlists.forEach(i=>{const s=i&&i.attributes&&i.attributes.RESOLUTION&&i.attributes.RESOLUTION.height<720,r=i.excludeUntil===1/0&&i.lastExcludeReason_===t;s&&r&&(delete i.excludeUntil,L.log.warn(`enabling non-HD playlist ${i.id} because all playlists were excluded due to ${t} key IDs`))})}addKeyStatus_(e,t){const r=(typeof e=="string"?e:Zg(e)).slice(0,32).toLowerCase();this.logger_(`KeyStatus '${t}' with key ID ${r} added to the keyStatusMap`),this.keyStatusMap_.set(r,t)}updatePlaylistByKeyStatus(e,t){this.addKeyStatus_(e,t),this.waitingForFastQualityPlaylistReceived_||this.excludeNonUsableThenChangePlaylist_(),this.mainPlaylistLoader_.off("loadedplaylist",this.excludeNonUsableThenChangePlaylist_.bind(this)),this.mainPlaylistLoader_.on("loadedplaylist",this.excludeNonUsableThenChangePlaylist_.bind(this))}excludeNonUsableThenChangePlaylist_(){this.excludeNonUsablePlaylistsByKeyId_(),this.fastQualityChange_()}}const j0=(n,e,t)=>i=>{const s=n.main.playlists[e],r=qo(s),a=ea(s);if(typeof i=="undefined")return a;i?delete s.disabled:s.disabled=!0;const l={renditionInfo:{id:e,bandwidth:s.attributes.BANDWIDTH,resolution:s.attributes.RESOLUTION,codecs:s.attributes.CODECS},cause:"fast-quality"};return i!==a&&!r&&(i?(t(s),n.trigger({type:"renditionenabled",metadata:l})):n.trigger({type:"renditiondisabled",metadata:l})),i};class w0{constructor(e,t,i){const{playlistController_:s}=e,r=s.fastQualityChange_.bind(s);if(t.attributes){const a=t.attributes.RESOLUTION;this.width=a&&a.width,this.height=a&&a.height,this.bandwidth=t.attributes.BANDWIDTH,this.frameRate=t.attributes["FRAME-RATE"]}this.codecs=zs(s.main(),t),this.playlist=t,this.id=i,this.enabled=j0(e.playlists,t.id,r)}}const B0=function(n){n.representations=()=>{const e=n.playlistController_.main(),t=Vs(e)?n.playlistController_.getAudioTrackPlaylists_():e.playlists;return t?t.filter(i=>!qo(i)).map((i,s)=>new w0(n,i,i.id)):[]}},Gd=["seeking","seeked","pause","playing","error"];class D0 extends L.EventTarget{constructor(e){super(),this.playlistController_=e.playlistController,this.tech_=e.tech,this.seekable=e.seekable,this.allowSeeksWithinUnsafeLiveWindow=e.allowSeeksWithinUnsafeLiveWindow,this.liveRangeSafeTimeDelta=e.liveRangeSafeTimeDelta,this.media=e.media,this.playedRanges_=[],this.consecutiveUpdates=0,this.lastRecordedTime=null,this.checkCurrentTimeTimeout_=null,this.logger_=oi("PlaybackWatcher"),this.logger_("initialize");const t=()=>this.monitorCurrentTime_(),i=()=>this.monitorCurrentTime_(),s=()=>this.techWaiting_(),r=()=>this.resetTimeUpdate_(),a=this.playlistController_,l=["main","subtitle","audio"],h={};l.forEach(g=>{h[g]={reset:()=>this.resetSegmentDownloads_(g),updateend:()=>this.checkSegmentDownloads_(g)},a[`${g}SegmentLoader_`].on("appendsdone",h[g].updateend),a[`${g}SegmentLoader_`].on("playlistupdate",h[g].reset),this.tech_.on(["seeked","seeking"],h[g].reset)});const p=g=>{["main","audio"].forEach(y=>{a[`${y}SegmentLoader_`][g]("appended",this.seekingAppendCheck_)})};this.seekingAppendCheck_=()=>{this.fixesBadSeeks_()&&(this.consecutiveUpdates=0,this.lastRecordedTime=this.tech_.currentTime(),p("off"))},this.clearSeekingAppendCheck_=()=>p("off"),this.watchForBadSeeking_=()=>{this.clearSeekingAppendCheck_(),p("on")},this.tech_.on("seeked",this.clearSeekingAppendCheck_),this.tech_.on("seeking",this.watchForBadSeeking_),this.tech_.on("waiting",s),this.tech_.on(Gd,r),this.tech_.on("canplay",i),this.tech_.one("play",t),this.dispose=()=>{this.clearSeekingAppendCheck_(),this.logger_("dispose"),this.tech_.off("waiting",s),this.tech_.off(Gd,r),this.tech_.off("canplay",i),this.tech_.off("play",t),this.tech_.off("seeking",this.watchForBadSeeking_),this.tech_.off("seeked",this.clearSeekingAppendCheck_),l.forEach(g=>{a[`${g}SegmentLoader_`].off("appendsdone",h[g].updateend),a[`${g}SegmentLoader_`].off("playlistupdate",h[g].reset),this.tech_.off(["seeked","seeking"],h[g].reset)}),this.checkCurrentTimeTimeout_&&A().clearTimeout(this.checkCurrentTimeTimeout_),this.resetTimeUpdate_()}}monitorCurrentTime_(){this.checkCurrentTime_(),this.checkCurrentTimeTimeout_&&A().clearTimeout(this.checkCurrentTimeTimeout_),this.checkCurrentTimeTimeout_=A().setTimeout(this.monitorCurrentTime_.bind(this),250)}resetSegmentDownloads_(e){const t=this.playlistController_[`${e}SegmentLoader_`];this[`${e}StalledDownloads_`]>0&&this.logger_(`resetting possible stalled download count for ${e} loader`),this[`${e}StalledDownloads_`]=0,this[`${e}Buffered_`]=t.buffered_()}checkSegmentDownloads_(e){const t=this.playlistController_,i=t[`${e}SegmentLoader_`],s=i.buffered_(),r=vm(this[`${e}Buffered_`],s);if(this[`${e}Buffered_`]=s,r){const a={bufferedRanges:s};t.trigger({type:"bufferedrangeschanged",metadata:a}),this.resetSegmentDownloads_(e);return}this[`${e}StalledDownloads_`]++,this.logger_(`found #${this[`${e}StalledDownloads_`]} ${e} appends that did not increase buffer (possible stalled download)`,{playlistId:i.playlist_&&i.playlist_.id,buffered:yn(s)}),!(this[`${e}StalledDownloads_`]<10)&&(this.logger_(`${e} loader stalled download exclusion`),this.resetSegmentDownloads_(e),this.tech_.trigger({type:"usage",name:`vhs-${e}-download-exclusion`}),e!=="subtitle"&&t.excludePlaylist({error:{message:`Excessive ${e} segment downloading detected.`},playlistExclusionDuration:1/0}))}checkCurrentTime_(){if(this.tech_.paused()||this.tech_.seeking())return;const e=this.tech_.currentTime(),t=this.tech_.buffered();if(this.lastRecordedTime===e&&(!t.length||e+wi>=t.end(t.length-1)))return this.techWaiting_();if(this.consecutiveUpdates>=5&&e===this.lastRecordedTime)this.consecutiveUpdates++,this.waiting_();else if(e===this.lastRecordedTime)this.consecutiveUpdates++;else{this.playedRanges_.push(St([this.lastRecordedTime,e]));const i={playedRanges:this.playedRanges_};this.playlistController_.trigger({type:"playedrangeschanged",metadata:i}),this.consecutiveUpdates=0,this.lastRecordedTime=e}}resetTimeUpdate_(){this.consecutiveUpdates=0}fixesBadSeeks_(){if(!this.tech_.seeking())return!1;const t=this.seekable(),i=this.tech_.currentTime(),s=this.afterSeekableWindow_(t,i,this.media(),this.allowSeeksWithinUnsafeLiveWindow);let r;if(s&&(r=t.end(t.length-1)),this.beforeSeekableWindow_(t,i)){const P=t.start(0);r=P+(P===t.end(0)?0:wi)}if(typeof r!="undefined")return this.logger_(`Trying to seek outside of seekable at time ${i} with seekable range ${Rc(t)}. Seeking to ${r}.`),this.tech_.setCurrentTime(r),!0;const a=this.playlistController_.sourceUpdater_,l=this.tech_.buffered(),h=a.audioBuffer?a.audioBuffered():null,p=a.videoBuffer?a.videoBuffered():null,g=this.media(),y=g.partTargetDuration?g.partTargetDuration:(g.targetDuration-ji)*2,w=[h,p];for(let P=0;P<w.length;P++){if(!w[P])continue;if(Vo(w[P],i)<y)return!1}const D=Zr(l,i);return D.length===0?!1:(r=D.start(0)+wi,this.logger_(`Buffered region starts (${D.start(0)})  just beyond seek point (${i}). Seeking to ${r}.`),this.tech_.setCurrentTime(r),!0)}waiting_(){if(this.techWaiting_())return;const e=this.tech_.currentTime(),t=this.tech_.buffered(),i=Zn(t,e);if(i.length&&e+3<=i.end(0)){this.resetTimeUpdate_(),this.tech_.setCurrentTime(e),this.logger_(`Stopped at ${e} while inside a buffered region [${i.start(0)} -> ${i.end(0)}]. Attempting to resume playback by seeking to the current time.`),this.tech_.trigger({type:"usage",name:"vhs-unknown-waiting"});return}}techWaiting_(){const e=this.seekable(),t=this.tech_.currentTime();if(this.tech_.seeking())return!0;if(this.beforeSeekableWindow_(e,t)){const l=e.end(e.length-1);return this.logger_(`Fell out of live window at time ${t}. Seeking to live point (seekable end) ${l}`),this.resetTimeUpdate_(),this.tech_.setCurrentTime(l),this.tech_.trigger({type:"usage",name:"vhs-live-resync"}),!0}const i=this.tech_.vhs.playlistController_.sourceUpdater_,s=this.tech_.buffered();if(this.videoUnderflow_({audioBuffered:i.audioBuffered(),videoBuffered:i.videoBuffered(),currentTime:t}))return this.resetTimeUpdate_(),this.tech_.setCurrentTime(t),this.tech_.trigger({type:"usage",name:"vhs-video-underflow"}),!0;const a=Zr(s,t);return a.length>0?(this.logger_(`Stopped at ${t} and seeking to ${a.start(0)}`),this.resetTimeUpdate_(),this.skipTheGap_(t),!0):!1}afterSeekableWindow_(e,t,i,s=!1){if(!e.length)return!1;let r=e.end(e.length-1)+wi;const a=!i.endList,l=typeof i.partTargetDuration=="number";return a&&(l||s)&&(r=e.end(e.length-1)+i.targetDuration*3),t>r}beforeSeekableWindow_(e,t){return!!(e.length&&e.start(0)>0&&t<e.start(0)-this.liveRangeSafeTimeDelta)}videoUnderflow_({videoBuffered:e,audioBuffered:t,currentTime:i}){if(!e)return;let s;if(e.length&&t.length){const r=Zn(e,i-3),a=Zn(e,i),l=Zn(t,i);l.length&&!a.length&&r.length&&(s={start:r.end(0),end:l.end(0)})}else Zr(e,i).length||(s=this.gapFromVideoUnderflow_(e,i));return s?(this.logger_(`Encountered a gap in video from ${s.start} to ${s.end}. Seeking to current time ${i}`),!0):!1}skipTheGap_(e){const t=this.tech_.buffered(),i=this.tech_.currentTime(),s=Zr(t,i);if(this.resetTimeUpdate_(),s.length===0||i!==e)return;this.logger_("skipTheGap_:","currentTime:",i,"scheduled currentTime:",e,"nextRange start:",s.start(0)),this.tech_.setCurrentTime(s.start(0)+ji);const r={gapInfo:{from:i,to:s.start(0)}};this.playlistController_.trigger({type:"gapjumped",metadata:r}),this.tech_.trigger({type:"usage",name:"vhs-gap-skip"})}gapFromVideoUnderflow_(e,t){const i=pm(e);for(let s=0;s<i.length;s++){const r=i.start(s),a=i.end(s);if(t-r<4&&t-r>2)return{start:r,end:a}}return null}}const k0={errorInterval:30,getSource(n){const t=this.tech({IWillNotUseThisInPlugins:!0}).currentSource_||this.currentSource();return n(t)}},Yd=function(n,e){let t=0,i=0;const s=Ye(k0,e);n.ready(()=>{n.trigger({type:"usage",name:"vhs-error-reload-initialized"})});const r=function(){i&&n.currentTime(i)},a=function(g){g!=null&&(i=n.duration()!==1/0&&n.currentTime()||0,n.one("loadedmetadata",r),n.src(g),n.trigger({type:"usage",name:"vhs-error-reload"}),n.play())},l=function(){if(Date.now()-t<s.errorInterval*1e3){n.trigger({type:"usage",name:"vhs-error-reload-canceled"});return}if(!s.getSource||typeof s.getSource!="function"){L.log.error("ERROR: reloadSourceOnError - The option getSource must be a function!");return}return t=Date.now(),s.getSource.call(n,a)},h=function(){n.off("loadedmetadata",r),n.off("error",l),n.off("dispose",h)},p=function(g){h(),Yd(n,g)};n.on("error",l),n.on("dispose",h),n.reloadSourceOnError=p},I0=function(n){Yd(this,n)};var Xd="3.16.2",P0="7.1.0",O0="1.3.1",L0="7.2.0",R0="4.0.2";const pt={PlaylistLoader:is,Playlist:qt,utils:Um,STANDARD_PLAYLIST_SELECTOR:wd,INITIAL_PLAYLIST_SELECTOR:wg,lastBandwidthSelector:wd,movingAverageBandwidthSelector:Sg,comparePlaylistBandwidth:il,comparePlaylistResolution:xg,xhr:id()};Object.keys(jt).forEach(n=>{Object.defineProperty(pt,n,{get(){return L.log.warn(`using Vhs.${n} is UNSAFE be sure you know what you are doing`),jt[n]},set(e){if(L.log.warn(`using Vhs.${n} is UNSAFE be sure you know what you are doing`),typeof e!="number"||e<0){L.log.warn(`value of Vhs.${n} must be greater than or equal to 0`);return}jt[n]=e}})});const Kd="videojs-vhs",Qd=function(n,e){const t=e.media();let i=-1;for(let s=0;s<n.length;s++)if(n[s].id===t.id){i=s;break}n.selectedIndex_=i,n.trigger({selectedIndex:i,type:"change"})},M0=function(n,e){e.representations().forEach(t=>{n.addQualityLevel(t)}),Qd(n,e.playlists)};pt.canPlaySource=function(){return L.log.warn("VHS is no longer a tech. Please remove it from your player's techOrder.")};const N0=(n,e,t)=>{if(!n)return n;let i={};e&&e.attributes&&e.attributes.CODECS&&(i=ia(W(e.attributes.CODECS))),t&&t.attributes&&t.attributes.CODECS&&(i.audio=t.attributes.CODECS);const s=Fe(i.video),r=Fe(i.audio),a={};for(const l in n)a[l]={},r&&(a[l].audioContentType=r),s&&(a[l].videoContentType=s),e.contentProtection&&e.contentProtection[l]&&e.contentProtection[l].pssh&&(a[l].pssh=e.contentProtection[l].pssh),typeof n[l]=="string"&&(a[l].url=n[l]);return Ye(n,a)},U0=(n,e)=>n.reduce((t,i)=>{if(!i.contentProtection)return t;const s=e.reduce((r,a)=>{const l=i.contentProtection[a];return l&&l.pssh&&(r[a]={pssh:l.pssh}),r},{});return Object.keys(s).length&&t.push(s),t},[]),F0=({player:n,sourceKeySystems:e,audioMedia:t,mainPlaylists:i})=>{if(!n.eme.initializeMediaKeys)return Promise.resolve();const s=t?i.concat([t]):i,r=U0(s,Object.keys(e)),a=[],l=[];return r.forEach(h=>{l.push(new Promise((p,g)=>{n.tech_.one("keysessioncreated",p)})),a.push(new Promise((p,g)=>{n.eme.initializeMediaKeys({keySystems:h},y=>{if(y){g(y);return}p()})}))}),Promise.race([Promise.all(a),Promise.race(l)])},V0=({player:n,sourceKeySystems:e,media:t,audioMedia:i})=>{const s=N0(e,t,i);return s?(n.currentSource().keySystems=s,s&&!n.eme?(L.log.warn("DRM encrypted source cannot be decrypted without a DRM plugin"),!1):!0):!1},Jd=()=>{if(!A().localStorage)return null;const n=A().localStorage.getItem(Kd);if(!n)return null;try{return JSON.parse(n)}catch(e){return null}},z0=n=>{if(!A().localStorage)return!1;let e=Jd();e=e?Ye(e,n):n;try{A().localStorage.setItem(Kd,JSON.stringify(e))}catch(t){return!1}return e},H0=n=>n.toLowerCase().indexOf("data:application/vnd.videojs.vhs+json,")===0?JSON.parse(n.substring(n.indexOf(",")+1)):n,Zd=(n,e)=>{n._requestCallbackSet||(n._requestCallbackSet=new Set),n._requestCallbackSet.add(e)},eh=(n,e)=>{n._responseCallbackSet||(n._responseCallbackSet=new Set),n._responseCallbackSet.add(e)},th=(n,e)=>{n._requestCallbackSet&&(n._requestCallbackSet.delete(e),n._requestCallbackSet.size||delete n._requestCallbackSet)},ih=(n,e)=>{n._responseCallbackSet&&(n._responseCallbackSet.delete(e),n._responseCallbackSet.size||delete n._responseCallbackSet)};pt.supportsNativeHls=function(){if(!I()||!I().createElement)return!1;const n=I().createElement("video");return L.getTech("Html5").isSupported()?["application/vnd.apple.mpegurl","audio/mpegurl","audio/x-mpegurl","application/x-mpegurl","video/x-mpegurl","video/mpegurl","application/mpegurl"].some(function(t){return/maybe|probably/i.test(n.canPlayType(t))}):!1}(),pt.supportsNativeDash=function(){return!I()||!I().createElement||!L.getTech("Html5").isSupported()?!1:/maybe|probably/i.test(I().createElement("video").canPlayType("application/dash+xml"))}(),pt.supportsTypeNatively=n=>n==="hls"?pt.supportsNativeHls:n==="dash"?pt.supportsNativeDash:!1,pt.isSupported=function(){return L.log.warn("VHS is no longer a tech. Please remove it from your player's techOrder.")},pt.xhr.onRequest=function(n){Zd(pt.xhr,n)},pt.xhr.onResponse=function(n){eh(pt.xhr,n)},pt.xhr.offRequest=function(n){th(pt.xhr,n)},pt.xhr.offResponse=function(n){ih(pt.xhr,n)};const q0=L.getComponent("Component");class nh extends q0{constructor(e,t,i){if(super(t,i.vhs),typeof i.initialBandwidth=="number"&&(this.options_.bandwidth=i.initialBandwidth),this.logger_=oi("VhsHandler"),t.options_&&t.options_.playerId){const s=L.getPlayer(t.options_.playerId);this.player_=s}if(this.tech_=t,this.source_=e,this.stats={},this.ignoreNextSeekingEvent_=!1,this.setOptions_(),this.options_.overrideNative&&t.overrideNativeAudioTracks&&t.overrideNativeVideoTracks)t.overrideNativeAudioTracks(!0),t.overrideNativeVideoTracks(!0);else if(this.options_.overrideNative&&(t.featuresNativeVideoTracks||t.featuresNativeAudioTracks))throw new Error("Overriding native VHS requires emulated tracks. See https://git.io/vMpjB");this.on(I(),["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","MSFullscreenChange"],s=>{const r=I().fullscreenElement||I().webkitFullscreenElement||I().mozFullScreenElement||I().msFullscreenElement;r&&r.contains(this.tech_.el())?this.playlistController_.fastQualityChange_():this.playlistController_.checkABR_()}),this.on(this.tech_,"seeking",function(){if(this.ignoreNextSeekingEvent_){this.ignoreNextSeekingEvent_=!1;return}this.setCurrentTime(this.tech_.currentTime())}),this.on(this.tech_,"error",function(){this.tech_.error()&&this.playlistController_&&this.playlistController_.pauseLoading()}),this.on(this.tech_,"play",this.play)}setOptions_(e={}){if(this.options_=Ye(this.options_,e),this.options_.withCredentials=this.options_.withCredentials||!1,this.options_.limitRenditionByPlayerDimensions=this.options_.limitRenditionByPlayerDimensions!==!1,this.options_.useDevicePixelRatio=this.options_.useDevicePixelRatio||!1,this.options_.useBandwidthFromLocalStorage=typeof this.source_.useBandwidthFromLocalStorage!="undefined"?this.source_.useBandwidthFromLocalStorage:this.options_.useBandwidthFromLocalStorage||!1,this.options_.useForcedSubtitles=this.options_.useForcedSubtitles||!1,this.options_.useNetworkInformationApi=this.options_.useNetworkInformationApi||!1,this.options_.useDtsForTimestampOffset=this.options_.useDtsForTimestampOffset||!1,this.options_.customTagParsers=this.options_.customTagParsers||[],this.options_.customTagMappers=this.options_.customTagMappers||[],this.options_.cacheEncryptionKeys=this.options_.cacheEncryptionKeys||!1,this.options_.llhls=this.options_.llhls!==!1,this.options_.bufferBasedABR=this.options_.bufferBasedABR||!1,typeof this.options_.playlistExclusionDuration!="number"&&(this.options_.playlistExclusionDuration=60),typeof this.options_.bandwidth!="number"&&this.options_.useBandwidthFromLocalStorage){const i=Jd();i&&i.bandwidth&&(this.options_.bandwidth=i.bandwidth,this.tech_.trigger({type:"usage",name:"vhs-bandwidth-from-local-storage"})),i&&i.throughput&&(this.options_.throughput=i.throughput,this.tech_.trigger({type:"usage",name:"vhs-throughput-from-local-storage"}))}typeof this.options_.bandwidth!="number"&&(this.options_.bandwidth=jt.INITIAL_BANDWIDTH),this.options_.enableLowInitialPlaylist=this.options_.enableLowInitialPlaylist&&this.options_.bandwidth===jt.INITIAL_BANDWIDTH,["withCredentials","useDevicePixelRatio","customPixelRatio","limitRenditionByPlayerDimensions","bandwidth","customTagParsers","customTagMappers","cacheEncryptionKeys","playlistSelector","initialPlaylistSelector","bufferBasedABR","liveRangeSafeTimeDelta","llhls","useForcedSubtitles","useNetworkInformationApi","useDtsForTimestampOffset","exactManifestTimings","leastPixelDiffSelector"].forEach(i=>{typeof this.source_[i]!="undefined"&&(this.options_[i]=this.source_[i])}),this.limitRenditionByPlayerDimensions=this.options_.limitRenditionByPlayerDimensions,this.useDevicePixelRatio=this.options_.useDevicePixelRatio;const t=this.options_.customPixelRatio;typeof t=="number"&&t>=0&&(this.customPixelRatio=t)}setOptions(e={}){this.setOptions_(e)}src(e,t){if(!e)return;this.setOptions_(),this.options_.src=H0(this.source_.src),this.options_.tech=this.tech_,this.options_.externVhs=pt,this.options_.sourceType=Tt(t),this.options_.seekTo=r=>{this.tech_.setCurrentTime(r)},this.options_.player_=this.player_,this.playlistController_=new S0(this.options_);const i=Ye({liveRangeSafeTimeDelta:wi},this.options_,{seekable:()=>this.seekable(),media:()=>this.playlistController_.media(),playlistController:this.playlistController_});this.playbackWatcher_=new D0(i),this.attachStreamingEventListeners_(),this.playlistController_.on("error",()=>{const r=L.players[this.tech_.options_.playerId];let a=this.playlistController_.error;typeof a=="object"&&!a.code?a.code=3:typeof a=="string"&&(a={message:a,code:3}),r.error(a)});const s=this.options_.bufferBasedABR?pt.movingAverageBandwidthSelector(.55):pt.STANDARD_PLAYLIST_SELECTOR;this.playlistController_.selectPlaylist=this.selectPlaylist?this.selectPlaylist.bind(this):s.bind(this),this.playlistController_.selectInitialPlaylist=pt.INITIAL_PLAYLIST_SELECTOR.bind(this),this.playlists=this.playlistController_.mainPlaylistLoader_,this.mediaSource=this.playlistController_.mediaSource,Object.defineProperties(this,{selectPlaylist:{get(){return this.playlistController_.selectPlaylist},set(r){this.playlistController_.selectPlaylist=r.bind(this)}},throughput:{get(){return this.playlistController_.mainSegmentLoader_.throughput.rate},set(r){this.playlistController_.mainSegmentLoader_.throughput.rate=r,this.playlistController_.mainSegmentLoader_.throughput.count=1}},bandwidth:{get(){let r=this.playlistController_.mainSegmentLoader_.bandwidth;const a=A().navigator.connection||A().navigator.mozConnection||A().navigator.webkitConnection,l=1e7;if(this.options_.useNetworkInformationApi&&a){const h=a.downlink*1e3*1e3;h>=l&&r>=l?r=Math.max(r,h):r=h}return r},set(r){this.playlistController_.mainSegmentLoader_.bandwidth=r,this.playlistController_.mainSegmentLoader_.throughput={rate:0,count:0}}},systemBandwidth:{get(){const r=1/(this.bandwidth||1);let a;return this.throughput>0?a=1/this.throughput:a=0,Math.floor(1/(r+a))},set(){L.log.error('The "systemBandwidth" property is read-only')}}}),this.options_.bandwidth&&(this.bandwidth=this.options_.bandwidth),this.options_.throughput&&(this.throughput=this.options_.throughput),Object.defineProperties(this.stats,{bandwidth:{get:()=>this.bandwidth||0,enumerable:!0},mediaRequests:{get:()=>this.playlistController_.mediaRequests_()||0,enumerable:!0},mediaRequestsAborted:{get:()=>this.playlistController_.mediaRequestsAborted_()||0,enumerable:!0},mediaRequestsTimedout:{get:()=>this.playlistController_.mediaRequestsTimedout_()||0,enumerable:!0},mediaRequestsErrored:{get:()=>this.playlistController_.mediaRequestsErrored_()||0,enumerable:!0},mediaTransferDuration:{get:()=>this.playlistController_.mediaTransferDuration_()||0,enumerable:!0},mediaBytesTransferred:{get:()=>this.playlistController_.mediaBytesTransferred_()||0,enumerable:!0},mediaSecondsLoaded:{get:()=>this.playlistController_.mediaSecondsLoaded_()||0,enumerable:!0},mediaAppends:{get:()=>this.playlistController_.mediaAppends_()||0,enumerable:!0},mainAppendsToLoadedData:{get:()=>this.playlistController_.mainAppendsToLoadedData_()||0,enumerable:!0},audioAppendsToLoadedData:{get:()=>this.playlistController_.audioAppendsToLoadedData_()||0,enumerable:!0},appendsToLoadedData:{get:()=>this.playlistController_.appendsToLoadedData_()||0,enumerable:!0},timeToLoadedData:{get:()=>this.playlistController_.timeToLoadedData_()||0,enumerable:!0},buffered:{get:()=>yn(this.tech_.buffered()),enumerable:!0},currentTime:{get:()=>this.tech_.currentTime(),enumerable:!0},currentSource:{get:()=>this.tech_.currentSource_,enumerable:!0},currentTech:{get:()=>this.tech_.name_,enumerable:!0},duration:{get:()=>this.tech_.duration(),enumerable:!0},main:{get:()=>this.playlists.main,enumerable:!0},playerDimensions:{get:()=>this.tech_.currentDimensions(),enumerable:!0},seekable:{get:()=>yn(this.tech_.seekable()),enumerable:!0},timestamp:{get:()=>Date.now(),enumerable:!0},videoPlaybackQuality:{get:()=>this.tech_.getVideoPlaybackQuality(),enumerable:!0}}),this.tech_.one("canplay",this.playlistController_.setupFirstPlay.bind(this.playlistController_)),this.tech_.on("bandwidthupdate",()=>{this.options_.useBandwidthFromLocalStorage&&z0({bandwidth:this.bandwidth,throughput:Math.round(this.throughput)})}),this.playlistController_.on("selectedinitialmedia",()=>{B0(this)}),this.playlistController_.sourceUpdater_.on("createdsourcebuffers",()=>{this.setupEme_()}),this.on(this.playlistController_,"progress",function(){this.tech_.trigger("progress")}),this.on(this.playlistController_,"firstplay",function(){this.ignoreNextSeekingEvent_=!0}),this.setupQualityLevels_(),this.tech_.el()&&(this.mediaSourceUrl_=A().URL.createObjectURL(this.playlistController_.mediaSource),(L.browser.IS_ANY_SAFARI||L.browser.IS_IOS)&&this.options_.overrideNative&&this.options_.sourceType==="hls"&&typeof this.tech_.addSourceElement=="function"?(this.tech_.addSourceElement(this.mediaSourceUrl_),this.tech_.addSourceElement(this.source_.src)):this.tech_.src(this.mediaSourceUrl_))}createKeySessions_(){const e=this.playlistController_.mediaTypes_.AUDIO.activePlaylistLoader;this.logger_("waiting for EME key session creation"),F0({player:this.player_,sourceKeySystems:this.source_.keySystems,audioMedia:e&&e.media(),mainPlaylists:this.playlists.main.playlists}).then(()=>{this.logger_("created EME key session"),this.playlistController_.sourceUpdater_.initializedEme()}).catch(t=>{this.logger_("error while creating EME key session",t),this.player_.error({message:"Failed to initialize media keys for EME",code:3})})}handleWaitingForKey_(){this.logger_("waitingforkey fired, attempting to create any new key sessions"),this.createKeySessions_()}setupEme_(){const e=this.playlistController_.mediaTypes_.AUDIO.activePlaylistLoader,t=V0({player:this.player_,sourceKeySystems:this.source_.keySystems,media:this.playlists.media(),audioMedia:e&&e.media()});if(this.player_.tech_.on("keystatuschange",i=>{this.playlistController_.updatePlaylistByKeyStatus(i.keyId,i.status)}),this.handleWaitingForKey_=this.handleWaitingForKey_.bind(this),this.player_.tech_.on("waitingforkey",this.handleWaitingForKey_),!t){this.playlistController_.sourceUpdater_.initializedEme();return}this.createKeySessions_()}setupQualityLevels_(){const e=L.players[this.tech_.options_.playerId];!e||!e.qualityLevels||this.qualityLevels_||(this.qualityLevels_=e.qualityLevels(),this.playlistController_.on("selectedinitialmedia",()=>{M0(this.qualityLevels_,this)}),this.playlists.on("mediachange",()=>{Qd(this.qualityLevels_,this.playlists)}))}static version(){return{"@videojs/http-streaming":Xd,"mux.js":P0,"mpd-parser":O0,"m3u8-parser":L0,"aes-decrypter":R0}}version(){return this.constructor.version()}canChangeType(){return Md.canChangeType()}play(){this.playlistController_.play()}setCurrentTime(e){this.playlistController_.setCurrentTime(e)}duration(){return this.playlistController_.duration()}seekable(){return this.playlistController_.seekable()}dispose(){this.playbackWatcher_&&this.playbackWatcher_.dispose(),this.playlistController_&&this.playlistController_.dispose(),this.qualityLevels_&&this.qualityLevels_.dispose(),this.tech_&&this.tech_.vhs&&delete this.tech_.vhs,this.mediaSourceUrl_&&A().URL.revokeObjectURL&&(A().URL.revokeObjectURL(this.mediaSourceUrl_),this.mediaSourceUrl_=null),this.tech_&&this.tech_.off("waitingforkey",this.handleWaitingForKey_),super.dispose()}convertToProgramTime(e,t){return $m({playlist:this.playlistController_.media(),time:e,callback:t})}seekToProgramTime(e,t,i=!0,s=2){return od({programTime:e,playlist:this.playlistController_.media(),retryCount:s,pauseAfterSeek:i,seekTo:this.options_.seekTo,tech:this.options_.tech,callback:t})}setupXhrHooks_(){this.xhr.onRequest=e=>{Zd(this.xhr,e)},this.xhr.onResponse=e=>{eh(this.xhr,e)},this.xhr.offRequest=e=>{th(this.xhr,e)},this.xhr.offResponse=e=>{ih(this.xhr,e)},this.player_.trigger("xhr-hooks-ready")}attachStreamingEventListeners_(){const e=["seekablerangeschanged","bufferedrangeschanged","contentsteeringloadstart","contentsteeringloadcomplete","contentsteeringparsed"],t=["gapjumped","playedrangeschanged"];e.forEach(i=>{this.playlistController_.on(i,s=>{this.player_.trigger((0,ge.A)({},s))})}),t.forEach(i=>{this.playbackWatcher_.on(i,s=>{this.player_.trigger((0,ge.A)({},s))})})}}const oa={name:"videojs-http-streaming",VERSION:Xd,canHandleSource(n,e={}){const t=Ye(L.options,e);return!t.vhs.experimentalUseMMS&&!qe("avc1.4d400d,mp4a.40.2",!1)?!1:oa.canPlayType(n.type,t)},handleSource(n,e,t={}){const i=Ye(L.options,t);return e.vhs=new nh(n,e,i),e.vhs.xhr=id(),e.vhs.setupXhrHooks_(),e.vhs.src(n.src,n.type),e.vhs},canPlayType(n,e){const t=Tt(n);if(!t)return"";const i=oa.getOverrideNative(e);return!pt.supportsTypeNatively(t)||i?"maybe":""},getOverrideNative(n={}){const{vhs:e={}}=n,t=!(L.browser.IS_ANY_SAFARI||L.browser.IS_IOS),{overrideNative:i=t}=e;return i}};qe("avc1.4d400d,mp4a.40.2",!0)&&L.getTech("Html5").registerSourceHandler(oa,0),L.VhsHandler=nh,L.VhsSourceHandler=oa,L.Vhs=pt,L.use||L.registerComponent("Vhs",pt),L.options.vhs=L.options.vhs||{},(!L.getPlugin||!L.getPlugin("reloadSourceOnError"))&&L.registerPlugin("reloadSourceOnError",I0)},94784:function(ke,le,G){var ne=G(89840),A=ke.exports={WebVTT:G(66311),VTTCue:G(50184),VTTRegion:G(35891)};ne.vttjs=A,ne.WebVTT=A.WebVTT;var N=A.VTTCue,I=A.VTTRegion,K=ne.VTTCue,Z=ne.VTTRegion;A.shim=function(){ne.VTTCue=N,ne.VTTRegion=I},A.restore=function(){ne.VTTCue=K,ne.VTTRegion=Z},ne.VTTCue||A.shim()},66311:function(ke,le,G){var ne=G(49697),A=Object.create||function(){function C(){}return function(S){if(arguments.length!==1)throw new Error("Object.create shim only accepts one parameter.");return C.prototype=S,new C}}();function N(C,S){this.name="ParsingError",this.code=C.code,this.message=S||C.message}N.prototype=A(Error.prototype),N.prototype.constructor=N,N.Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}};function I(C){function S(ie,ue,ce,oe){return(ie|0)*3600+(ue|0)*60+(ce|0)+(oe|0)/1e3}var R=C.match(/^(\d+):(\d{1,2})(:\d{1,2})?\.(\d{3})/);return R?R[3]?S(R[1],R[2],R[3].replace(":",""),R[4]):R[1]>59?S(R[1],R[2],0,R[4]):S(0,R[1],R[2],R[4]):null}function K(){this.values=A(null)}K.prototype={set:function(C,S){!this.get(C)&&S!==""&&(this.values[C]=S)},get:function(C,S,R){return R?this.has(C)?this.values[C]:S[R]:this.has(C)?this.values[C]:S},has:function(C){return C in this.values},alt:function(C,S,R){for(var ie=0;ie<R.length;++ie)if(S===R[ie]){this.set(C,S);break}},integer:function(C,S){/^-?\d+$/.test(S)&&this.set(C,parseInt(S,10))},percent:function(C,S){var R;return(R=S.match(/^([\d]{1,3})(\.[\d]*)?%$/))&&(S=parseFloat(S),S>=0&&S<=100)?(this.set(C,S),!0):!1}};function Z(C,S,R,ie){var ue=ie?C.split(ie):[C];for(var ce in ue)if(typeof ue[ce]=="string"){var oe=ue[ce].split(R);if(oe.length===2){var pe=oe[0].trim(),W=oe[1].trim();S(pe,W)}}}function he(C,S,R){var ie=C;function ue(){var pe=I(C);if(pe===null)throw new N(N.Errors.BadTimeStamp,"Malformed timestamp: "+ie);return C=C.replace(/^[^\sa-zA-Z-]+/,""),pe}function ce(pe,W){var ee=new K;Z(pe,function(te,se){switch(te){case"region":for(var Ee=R.length-1;Ee>=0;Ee--)if(R[Ee].id===se){ee.set(te,R[Ee].region);break}break;case"vertical":ee.alt(te,se,["rl","lr"]);break;case"line":var Fe=se.split(","),qe=Fe[0];ee.integer(te,qe),ee.percent(te,qe)&&ee.set("snapToLines",!1),ee.alt(te,qe,["auto"]),Fe.length===2&&ee.alt("lineAlign",Fe[1],["start","center","end"]);break;case"position":Fe=se.split(","),ee.percent(te,Fe[0]),Fe.length===2&&ee.alt("positionAlign",Fe[1],["start","center","end"]);break;case"size":ee.percent(te,se);break;case"align":ee.alt(te,se,["start","center","end","left","right"]);break}},/:/,/\s/),W.region=ee.get("region",null),W.vertical=ee.get("vertical","");try{W.line=ee.get("line","auto")}catch(te){}W.lineAlign=ee.get("lineAlign","start"),W.snapToLines=ee.get("snapToLines",!0),W.size=ee.get("size",100);try{W.align=ee.get("align","center")}catch(te){W.align=ee.get("align","middle")}try{W.position=ee.get("position","auto")}catch(te){W.position=ee.get("position",{start:0,left:0,center:50,middle:50,end:100,right:100},W.align)}W.positionAlign=ee.get("positionAlign",{start:"start",left:"start",center:"center",middle:"center",end:"end",right:"end"},W.align)}function oe(){C=C.replace(/^\s+/,"")}if(oe(),S.startTime=ue(),oe(),C.substr(0,3)!=="-->")throw new N(N.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '-->'): "+ie);C=C.substr(3),oe(),S.endTime=ue(),oe(),ce(C,S)}var ye=ne.createElement&&ne.createElement("textarea"),ge={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},J={white:"rgba(255,255,255,1)",lime:"rgba(0,255,0,1)",cyan:"rgba(0,255,255,1)",red:"rgba(255,0,0,1)",yellow:"rgba(255,255,0,1)",magenta:"rgba(255,0,255,1)",blue:"rgba(0,0,255,1)",black:"rgba(0,0,0,1)"},Ie={v:"title",lang:"lang"},Pe={rt:"ruby"};function Me(C,S){function R(){if(!S)return null;function qe(je){return S=S.substr(je.length),je}var xe=S.match(/^([^<]*)(<[^>]*>?)?/);return qe(xe[1]?xe[1]:xe[2])}function ie(qe){return ye.innerHTML=qe,qe=ye.textContent,ye.textContent="",qe}function ue(qe,xe){return!Pe[xe.localName]||Pe[xe.localName]===qe.localName}function ce(qe,xe){var je=ge[qe];if(!je)return null;var _t=C.document.createElement(je),Dt=Ie[qe];return Dt&&xe&&(_t[Dt]=xe.trim()),_t}for(var oe=C.document.createElement("div"),pe=oe,W,ee=[];(W=R())!==null;){if(W[0]==="<"){if(W[1]==="/"){ee.length&&ee[ee.length-1]===W.substr(2).replace(">","")&&(ee.pop(),pe=pe.parentNode);continue}var te=I(W.substr(1,W.length-2)),se;if(te){se=C.document.createProcessingInstruction("timestamp",te),pe.appendChild(se);continue}var Ee=W.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);if(!Ee||(se=ce(Ee[1],Ee[3]),!se)||!ue(pe,se))continue;if(Ee[2]){var Fe=Ee[2].split(".");Fe.forEach(function(qe){var xe=/^bg_/.test(qe),je=xe?qe.slice(3):qe;if(J.hasOwnProperty(je)){var _t=xe?"background-color":"color",Dt=J[je];se.style[_t]=Dt}}),se.className=Fe.join(" ")}ee.push(Ee[1]),pe.appendChild(se),pe=se;continue}pe.appendChild(C.document.createTextNode(ie(W)))}return oe}var $=[[1470,1470],[1472,1472],[1475,1475],[1478,1478],[1488,1514],[1520,1524],[1544,1544],[1547,1547],[1549,1549],[1563,1563],[1566,1610],[1645,1647],[1649,1749],[1765,1766],[1774,1775],[1786,1805],[1807,1808],[1810,1839],[1869,1957],[1969,1969],[1984,2026],[2036,2037],[2042,2042],[2048,2069],[2074,2074],[2084,2084],[2088,2088],[2096,2110],[2112,2136],[2142,2142],[2208,2208],[2210,2220],[8207,8207],[64285,64285],[64287,64296],[64298,64310],[64312,64316],[64318,64318],[64320,64321],[64323,64324],[64326,64449],[64467,64829],[64848,64911],[64914,64967],[65008,65020],[65136,65140],[65142,65276],[67584,67589],[67592,67592],[67594,67637],[67639,67640],[67644,67644],[67647,67669],[67671,67679],[67840,67867],[67872,67897],[67903,67903],[67968,68023],[68030,68031],[68096,68096],[68112,68115],[68117,68119],[68121,68147],[68160,68167],[68176,68184],[68192,68223],[68352,68405],[68416,68437],[68440,68466],[68472,68479],[68608,68680],[126464,126467],[126469,126495],[126497,126498],[126500,126500],[126503,126503],[126505,126514],[126516,126519],[126521,126521],[126523,126523],[126530,126530],[126535,126535],[126537,126537],[126539,126539],[126541,126543],[126545,126546],[126548,126548],[126551,126551],[126553,126553],[126555,126555],[126557,126557],[126559,126559],[126561,126562],[126564,126564],[126567,126570],[126572,126578],[126580,126583],[126585,126588],[126590,126590],[126592,126601],[126603,126619],[126625,126627],[126629,126633],[126635,126651],[1114109,1114109]];function Ue(C){for(var S=0;S<$.length;S++){var R=$[S];if(C>=R[0]&&C<=R[1])return!0}return!1}function Se(C){var S=[],R="",ie;if(!C||!C.childNodes)return"ltr";function ue(pe,W){for(var ee=W.childNodes.length-1;ee>=0;ee--)pe.push(W.childNodes[ee])}function ce(pe){if(!pe||!pe.length)return null;var W=pe.pop(),ee=W.textContent||W.innerText;if(ee){var te=ee.match(/^.*(\n|\r)/);return te?(pe.length=0,te[0]):ee}if(W.tagName==="ruby")return ce(pe);if(W.childNodes)return ue(pe,W),ce(pe)}for(ue(S,C);R=ce(S);)for(var oe=0;oe<R.length;oe++)if(ie=R.charCodeAt(oe),Ue(ie))return"rtl";return"ltr"}function Xe(C){if(typeof C.line=="number"&&(C.snapToLines||C.line>=0&&C.line<=100))return C.line;if(!C.track||!C.track.textTrackList||!C.track.textTrackList.mediaElement)return-1;for(var S=C.track,R=S.textTrackList,ie=0,ue=0;ue<R.length&&R[ue]!==S;ue++)R[ue].mode==="showing"&&ie++;return++ie*-1}function re(){}re.prototype.applyStyles=function(C,S){S=S||this.div;for(var R in C)C.hasOwnProperty(R)&&(S.style[R]=C[R])},re.prototype.formatStyle=function(C,S){return C===0?0:C+S};function Oe(C,S,R){re.call(this),this.cue=S,this.cueDiv=Me(C,S.text);var ie={color:"rgba(255, 255, 255, 1)",backgroundColor:"rgba(0, 0, 0, 0.8)",position:"relative",left:0,right:0,top:0,bottom:0,display:"inline",writingMode:S.vertical===""?"horizontal-tb":S.vertical==="lr"?"vertical-lr":"vertical-rl",unicodeBidi:"plaintext"};this.applyStyles(ie,this.cueDiv),this.div=C.document.createElement("div"),ie={direction:Se(this.cueDiv),writingMode:S.vertical===""?"horizontal-tb":S.vertical==="lr"?"vertical-lr":"vertical-rl",unicodeBidi:"plaintext",textAlign:S.align==="middle"?"center":S.align,font:R.font,whiteSpace:"pre-line",position:"absolute"},this.applyStyles(ie),this.div.appendChild(this.cueDiv);var ue=0;switch(S.positionAlign){case"start":case"line-left":ue=S.position;break;case"center":ue=S.position-S.size/2;break;case"end":case"line-right":ue=S.position-S.size;break}S.vertical===""?this.applyStyles({left:this.formatStyle(ue,"%"),width:this.formatStyle(S.size,"%")}):this.applyStyles({top:this.formatStyle(ue,"%"),height:this.formatStyle(S.size,"%")}),this.move=function(ce){this.applyStyles({top:this.formatStyle(ce.top,"px"),bottom:this.formatStyle(ce.bottom,"px"),left:this.formatStyle(ce.left,"px"),right:this.formatStyle(ce.right,"px"),height:this.formatStyle(ce.height,"px"),width:this.formatStyle(ce.width,"px")})}}Oe.prototype=A(re.prototype),Oe.prototype.constructor=Oe;function Te(C){var S,R,ie,ue;if(C.div){R=C.div.offsetHeight,ie=C.div.offsetWidth,ue=C.div.offsetTop;var ce=(ce=C.div.childNodes)&&(ce=ce[0])&&ce.getClientRects&&ce.getClientRects();C=C.div.getBoundingClientRect(),S=ce?Math.max(ce[0]&&ce[0].height||0,C.height/ce.length):0}this.left=C.left,this.right=C.right,this.top=C.top||ue,this.height=C.height||R,this.bottom=C.bottom||ue+(C.height||R),this.width=C.width||ie,this.lineHeight=S!==void 0?S:C.lineHeight}Te.prototype.move=function(C,S){switch(S=S!==void 0?S:this.lineHeight,C){case"+x":this.left+=S,this.right+=S;break;case"-x":this.left-=S,this.right-=S;break;case"+y":this.top+=S,this.bottom+=S;break;case"-y":this.top-=S,this.bottom-=S;break}},Te.prototype.overlaps=function(C){return this.left<C.right&&this.right>C.left&&this.top<C.bottom&&this.bottom>C.top},Te.prototype.overlapsAny=function(C){for(var S=0;S<C.length;S++)if(this.overlaps(C[S]))return!0;return!1},Te.prototype.within=function(C){return this.top>=C.top&&this.bottom<=C.bottom&&this.left>=C.left&&this.right<=C.right},Te.prototype.overlapsOppositeAxis=function(C,S){switch(S){case"+x":return this.left<C.left;case"-x":return this.right>C.right;case"+y":return this.top<C.top;case"-y":return this.bottom>C.bottom}},Te.prototype.intersectPercentage=function(C){var S=Math.max(0,Math.min(this.right,C.right)-Math.max(this.left,C.left)),R=Math.max(0,Math.min(this.bottom,C.bottom)-Math.max(this.top,C.top)),ie=S*R;return ie/(this.height*this.width)},Te.prototype.toCSSCompatValues=function(C){return{top:this.top-C.top,bottom:C.bottom-this.bottom,left:this.left-C.left,right:C.right-this.right,height:this.height,width:this.width}},Te.getSimpleBoxPosition=function(C){var S=C.div?C.div.offsetHeight:C.tagName?C.offsetHeight:0,R=C.div?C.div.offsetWidth:C.tagName?C.offsetWidth:0,ie=C.div?C.div.offsetTop:C.tagName?C.offsetTop:0;C=C.div?C.div.getBoundingClientRect():C.tagName?C.getBoundingClientRect():C;var ue={left:C.left,right:C.right,top:C.top||ie,height:C.height||S,bottom:C.bottom||ie+(C.height||S),width:C.width||R};return ue};function Ce(C,S,R,ie){function ue(je,_t){for(var Dt,mt=new Te(je),Tt=1,$t=0;$t<_t.length;$t++){for(;je.overlapsOppositeAxis(R,_t[$t])||je.within(R)&&je.overlapsAny(ie);)je.move(_t[$t]);if(je.within(R))return je;var _i=je.intersectPercentage(R);Tt>_i&&(Dt=new Te(je),Tt=_i),je=new Te(mt)}return Dt||mt}var ce=new Te(S),oe=S.cue,pe=Xe(oe),W=[];if(oe.snapToLines){var ee;switch(oe.vertical){case"":W=["+y","-y"],ee="height";break;case"rl":W=["+x","-x"],ee="width";break;case"lr":W=["-x","+x"],ee="width";break}var te=ce.lineHeight,se=te*Math.round(pe),Ee=R[ee]+te,Fe=W[0];Math.abs(se)>Ee&&(se=se<0?-1:1,se*=Math.ceil(Ee/te)*te),pe<0&&(se+=oe.vertical===""?R.height:R.width,W=W.reverse()),ce.move(Fe,se)}else{var qe=ce.lineHeight/R.height*100;switch(oe.lineAlign){case"center":pe-=qe/2;break;case"end":pe-=qe;break}switch(oe.vertical){case"":S.applyStyles({top:S.formatStyle(pe,"%")});break;case"rl":S.applyStyles({left:S.formatStyle(pe,"%")});break;case"lr":S.applyStyles({right:S.formatStyle(pe,"%")});break}W=["+y","-x","+x","-y"],ce=new Te(S)}var xe=ue(ce,W);S.move(xe.toCSSCompatValues(R))}function me(){}me.StringDecoder=function(){return{decode:function(C){if(!C)return"";if(typeof C!="string")throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(C))}}},me.convertCueToDOMTree=function(C,S){return!C||!S?null:Me(C,S)};var _e=.05,ze="sans-serif",De="1.5%";me.processCues=function(C,S,R){if(!C||!S||!R)return null;for(;R.firstChild;)R.removeChild(R.firstChild);var ie=C.document.createElement("div");ie.style.position="absolute",ie.style.left="0",ie.style.right="0",ie.style.top="0",ie.style.bottom="0",ie.style.margin=De,R.appendChild(ie);function ue(te){for(var se=0;se<te.length;se++)if(te[se].hasBeenReset||!te[se].displayState)return!0;return!1}if(!ue(S)){for(var ce=0;ce<S.length;ce++)ie.appendChild(S[ce].displayState);return}var oe=[],pe=Te.getSimpleBoxPosition(ie),W=Math.round(pe.height*_e*100)/100,ee={font:W+"px "+ze};(function(){for(var te,se,Ee=0;Ee<S.length;Ee++)se=S[Ee],te=new Oe(C,se,ee),ie.appendChild(te.div),Ce(C,te,pe,oe),se.displayState=te.div,oe.push(Te.getSimpleBoxPosition(te))})()},me.Parser=function(C,S,R){R||(R=S,S={}),S||(S={}),this.window=C,this.vttjs=S,this.state="INITIAL",this.buffer="",this.decoder=R||new TextDecoder("utf8"),this.regionList=[]},me.Parser.prototype={reportOrThrowError:function(C){if(C instanceof N)this.onparsingerror&&this.onparsingerror(C);else throw C},parse:function(C){var S=this;C&&(S.buffer+=S.decoder.decode(C,{stream:!0}));function R(){for(var te=S.buffer,se=0;se<te.length&&te[se]!=="\r"&&te[se]!==`
`;)++se;var Ee=te.substr(0,se);return te[se]==="\r"&&++se,te[se]===`
`&&++se,S.buffer=te.substr(se),Ee}function ie(te){var se=new K;if(Z(te,function(Fe,qe){switch(Fe){case"id":se.set(Fe,qe);break;case"width":se.percent(Fe,qe);break;case"lines":se.integer(Fe,qe);break;case"regionanchor":case"viewportanchor":var xe=qe.split(",");if(xe.length!==2)break;var je=new K;if(je.percent("x",xe[0]),je.percent("y",xe[1]),!je.has("x")||!je.has("y"))break;se.set(Fe+"X",je.get("x")),se.set(Fe+"Y",je.get("y"));break;case"scroll":se.alt(Fe,qe,["up"]);break}},/=/,/\s/),se.has("id")){var Ee=new(S.vttjs.VTTRegion||S.window.VTTRegion);Ee.width=se.get("width",100),Ee.lines=se.get("lines",3),Ee.regionAnchorX=se.get("regionanchorX",0),Ee.regionAnchorY=se.get("regionanchorY",100),Ee.viewportAnchorX=se.get("viewportanchorX",0),Ee.viewportAnchorY=se.get("viewportanchorY",100),Ee.scroll=se.get("scroll",""),S.onregion&&S.onregion(Ee),S.regionList.push({id:se.get("id"),region:Ee})}}function ue(te){var se=new K;Z(te,function(Ee,Fe){switch(Ee){case"MPEGT":se.integer(Ee+"S",Fe);break;case"LOCA":se.set(Ee+"L",I(Fe));break}},/[^\d]:/,/,/),S.ontimestampmap&&S.ontimestampmap({MPEGTS:se.get("MPEGTS"),LOCAL:se.get("LOCAL")})}function ce(te){te.match(/X-TIMESTAMP-MAP/)?Z(te,function(se,Ee){switch(se){case"X-TIMESTAMP-MAP":ue(Ee);break}},/=/):Z(te,function(se,Ee){switch(se){case"Region":ie(Ee);break}},/:/)}try{var oe;if(S.state==="INITIAL"){if(!/\r\n|\n/.test(S.buffer))return this;oe=R();var pe=oe.match(/^WEBVTT([ \t].*)?$/);if(!pe||!pe[0])throw new N(N.Errors.BadSignature);S.state="HEADER"}for(var W=!1;S.buffer;){if(!/\r\n|\n/.test(S.buffer))return this;switch(W?W=!1:oe=R(),S.state){case"HEADER":/:/.test(oe)?ce(oe):oe||(S.state="ID");continue;case"NOTE":oe||(S.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(oe)){S.state="NOTE";break}if(!oe)continue;S.cue=new(S.vttjs.VTTCue||S.window.VTTCue)(0,0,"");try{S.cue.align="center"}catch(te){S.cue.align="middle"}if(S.state="CUE",oe.indexOf("-->")===-1){S.cue.id=oe;continue}case"CUE":try{he(oe,S.cue,S.regionList)}catch(te){S.reportOrThrowError(te),S.cue=null,S.state="BADCUE";continue}S.state="CUETEXT";continue;case"CUETEXT":var ee=oe.indexOf("-->")!==-1;if(!oe||ee&&(W=!0)){S.oncue&&S.oncue(S.cue),S.cue=null,S.state="ID";continue}S.cue.text&&(S.cue.text+=`
`),S.cue.text+=oe.replace(/\u2028/g,`
`).replace(/u2029/g,`
`);continue;case"BADCUE":oe||(S.state="ID");continue}}}catch(te){S.reportOrThrowError(te),S.state==="CUETEXT"&&S.cue&&S.oncue&&S.oncue(S.cue),S.cue=null,S.state=S.state==="INITIAL"?"BADWEBVTT":"BADCUE"}return this},flush:function(){var C=this;try{if(C.buffer+=C.decoder.decode(),(C.cue||C.state==="HEADER")&&(C.buffer+=`

`,C.parse()),C.state==="INITIAL")throw new N(N.Errors.BadSignature)}catch(S){C.reportOrThrowError(S)}return C.onflush&&C.onflush(),this}},ke.exports=me},50184:function(ke){var le="auto",G={"":1,lr:1,rl:1},ne={start:1,center:1,end:1,left:1,right:1,auto:1,"line-left":1,"line-right":1};function A(K){if(typeof K!="string")return!1;var Z=G[K.toLowerCase()];return Z?K.toLowerCase():!1}function N(K){if(typeof K!="string")return!1;var Z=ne[K.toLowerCase()];return Z?K.toLowerCase():!1}function I(K,Z,he){this.hasBeenReset=!1;var ye="",ge=!1,J=K,Ie=Z,Pe=he,Me=null,$="",Ue=!0,Se="auto",Xe="start",re="auto",Oe="auto",Te=100,Ce="center";Object.defineProperties(this,{id:{enumerable:!0,get:function(){return ye},set:function(me){ye=""+me}},pauseOnExit:{enumerable:!0,get:function(){return ge},set:function(me){ge=!!me}},startTime:{enumerable:!0,get:function(){return J},set:function(me){if(typeof me!="number")throw new TypeError("Start time must be set to a number.");J=me,this.hasBeenReset=!0}},endTime:{enumerable:!0,get:function(){return Ie},set:function(me){if(typeof me!="number")throw new TypeError("End time must be set to a number.");Ie=me,this.hasBeenReset=!0}},text:{enumerable:!0,get:function(){return Pe},set:function(me){Pe=""+me,this.hasBeenReset=!0}},region:{enumerable:!0,get:function(){return Me},set:function(me){Me=me,this.hasBeenReset=!0}},vertical:{enumerable:!0,get:function(){return $},set:function(me){var _e=A(me);if(_e===!1)throw new SyntaxError("Vertical: an invalid or illegal direction string was specified.");$=_e,this.hasBeenReset=!0}},snapToLines:{enumerable:!0,get:function(){return Ue},set:function(me){Ue=!!me,this.hasBeenReset=!0}},line:{enumerable:!0,get:function(){return Se},set:function(me){if(typeof me!="number"&&me!==le)throw new SyntaxError("Line: an invalid number or illegal string was specified.");Se=me,this.hasBeenReset=!0}},lineAlign:{enumerable:!0,get:function(){return Xe},set:function(me){var _e=N(me);_e?(Xe=_e,this.hasBeenReset=!0):console.warn("lineAlign: an invalid or illegal string was specified.")}},position:{enumerable:!0,get:function(){return re},set:function(me){if(me<0||me>100)throw new Error("Position must be between 0 and 100.");re=me,this.hasBeenReset=!0}},positionAlign:{enumerable:!0,get:function(){return Oe},set:function(me){var _e=N(me);_e?(Oe=_e,this.hasBeenReset=!0):console.warn("positionAlign: an invalid or illegal string was specified.")}},size:{enumerable:!0,get:function(){return Te},set:function(me){if(me<0||me>100)throw new Error("Size must be between 0 and 100.");Te=me,this.hasBeenReset=!0}},align:{enumerable:!0,get:function(){return Ce},set:function(me){var _e=N(me);if(!_e)throw new SyntaxError("align: an invalid or illegal alignment string was specified.");Ce=_e,this.hasBeenReset=!0}}}),this.displayState=void 0}I.prototype.getCueAsHTML=function(){return WebVTT.convertCueToDOMTree(window,this.text)},ke.exports=I},35891:function(ke){var le={"":!0,up:!0};function G(N){if(typeof N!="string")return!1;var I=le[N.toLowerCase()];return I?N.toLowerCase():!1}function ne(N){return typeof N=="number"&&N>=0&&N<=100}function A(){var N=100,I=3,K=0,Z=100,he=0,ye=100,ge="";Object.defineProperties(this,{width:{enumerable:!0,get:function(){return N},set:function(J){if(!ne(J))throw new Error("Width must be between 0 and 100.");N=J}},lines:{enumerable:!0,get:function(){return I},set:function(J){if(typeof J!="number")throw new TypeError("Lines must be set to a number.");I=J}},regionAnchorY:{enumerable:!0,get:function(){return Z},set:function(J){if(!ne(J))throw new Error("RegionAnchorX must be between 0 and 100.");Z=J}},regionAnchorX:{enumerable:!0,get:function(){return K},set:function(J){if(!ne(J))throw new Error("RegionAnchorY must be between 0 and 100.");K=J}},viewportAnchorY:{enumerable:!0,get:function(){return ye},set:function(J){if(!ne(J))throw new Error("ViewportAnchorY must be between 0 and 100.");ye=J}},viewportAnchorX:{enumerable:!0,get:function(){return he},set:function(J){if(!ne(J))throw new Error("ViewportAnchorX must be between 0 and 100.");he=J}},scroll:{enumerable:!0,get:function(){return ge},set:function(J){var Ie=G(J);Ie===!1?console.warn("Scroll: an invalid or illegal string was specified."):ge=Ie}}})}ke.exports=A},17422:function(ke){"use strict";ke.exports="data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAABTsAAsAAAAAIpAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAAPgAAAFZRiV32Y21hcAAAAYQAAAEJAAAD5p42+VxnbHlmAAACkAAADtIAABckI4l972hlYWQAABFkAAAAKwAAADYsvIjpaGhlYQAAEZAAAAAdAAAAJA+RCL1obXR4AAARsAAAABcAAAC8Q2YAAGxvY2EAABHIAAAAYAAAAGB7CIGGbWF4cAAAEigAAAAfAAAAIAFAAI9uYW1lAAASSAAAASUAAAIK1cf1oHBvc3QAABNwAAABfAAAAnXdFqh1eJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGR7yDiBgZWBgaWQ5RkDA8MvCM0cwxDOeI6BgYmBlZkBKwhIc01hcPjI+FGPHcRdyA4RZgQRADaGCyYAAHic7dPXbcMwAEXRK1vuvffem749XAbKV3bjBA6fXsaIgMMLEWoQJaAEFKNnlELyQ4K27zib5PNF6vl8yld+TKr5kH0+cUw0xv00Hwvx2DResUyFKrV4XoMmLdp06NKjz4AhI8ZMmDJjzoIlK9Zs2LJjz4EjJ85cuHLjziPe/0UWL17mf2tqKLz/9jK9f8tXpGCoRdPKhtS0RqFkWvVQNtSKoVYNtWaoddPXEBqG2jQ9XWgZattQO4baNdSeofYNdWCoQ0MdGerYUCeGOjXUmaHODXVhqEtDXRnq2lA3hro11J2h7g31YKhHQz0Z6tlQL4Z6NdSbod4N9WGoT9MfHF6GmhnZLxyDcRMAAAB4nJ1YC1hU17U+a5/HMA4iA3NmVBDmoQwP5TFnHlFeA4gYiUFRQINoSCBAyK3G2yi+0aipYtFcHYo2xsb4NiY3+VrNxSaX5uvt495ozNdoYoxmem2/L8HGpLc+InB279pnhlGr5mvL4eyz99nrrL32eu1/DQcc/okdYgdHOA6MQKp4r9gx0EcMHMezOalVasW5BM7NcXoSb9fFgE6KtSSBxWz1FYDPG+vMBGcKb9cebu2VS5s2aaTkCvRSf6C7Y+Ppibm5E09v7IDs2/3uZQtbD0zIyppwoHXh/93ukmyYgdePNRp65p5v+3v/9otQl2O7wP34cT88p8Md2YxpYLQZoRcy6FlSBRnwnGAe6BPMSCZo+7NJVqS0cE4uHendzhSnbPH6TDqL1+Nme5LZXkCHnGyoH0kne30WH+gswhm3q+pt/mTas9NLS64GnjmSlTPw0wVQT/ewRaBgxtydy3cuUB9/6SW+vb5yRvr+t0eOfPKJZ/9t3+4tL7xj32Xd3thCxi+ge6ifdsAN+l5+wi5HQ/cCoeull1AszS7CUfEcJzK7sKWJAdJhCd0sPM4+EY7QDm5ov08hXRQXE5bf6PV5Q5+IjW7X7Nku92Ask4l2hCRRD6TPqISiCJeQna3SCFwrhrNzXHzo4yFevBwxpzxk8WCIIfkvVEKVy32SbT8n68gzgaslpaiO2zIGIyuSb7RNf9HSuN26y/7OC1tgEmpiyA6aD4qcgTOiLThwGG0eB694FI8NHLLN6OBlRVaMxNAFS4JdXUG6mW8PwpKuYLCLXKGbu8iwYNdgO06Sn3Th+/vyZAxs8Ro30DjHe9gy8Fywi24OMm7Qyzh3MTZVOMYhLBnoC+J79lpTUyQmorjhnMwlcQ5uPEYGpDjsOkkH49BjQLQBqs3jFtFdJNlksYmoQFDArLh8Xh+Qd6Ghcsb6FUuehDi+U/lqD71K/qiegeV1imcwjl7ExwiSrf4BZyCujV6cVcFo6VX+G9IcPyFjJnUufbU/jzrL1X99as36reXl8K32nFaOr+E8jWJEcJ55DpMVfSMe95/AJaOsGBH2GJCNpiRQbK4C8BjdmQA22QY2j03Em13i2YHqtNLU1NI04Yj2HJgA6fQc6VPNpA/D+Ryks554NnVy2mB72uRUfPLsqR4N0LOBQKArwJYO+5W2fgZX8oC1HR6HjNaQTVIG2FPwnTcXXGZZfNB7TE6pTKZUwaw91XWLAoFFGcnB5PHjsckgBjbWutrL+0h5Y1xw3DRGDumsnXb3MJwXrJIN5U7m0rgJ3yG5w4he5ckFG4pmNEkOm0/xOO4r4yL87wqtQM+hiJIVp+6iG2wPBKD35ElGkDx+UfC2v1mFG1o+M3AjNFty8biKMXwzyxnZLds8wYD2BxmCPHAldPOeLsy/0BugftYhVYFAhO8SqQ0j3oK7dHJZnI/jxmUS4onlxskSF8thmvNZjIrRZwEPxr0lBuLRuz3oy/FOHCsxwOPYh2M+e9u3J5pgPYz9gp6G7C9m0A11F9ddqKMfV+4sbq45/YspOysXvT+3pdFdYNg2fHbW8Dz301MqDVuGrz0Fuh0YMW8mddrpqzST7rV9BcvqPoNvadRndWp0p8HvbiqrFj5yFQ/vNFSXDpxpLEFWp+DcrF3FT1afWshFcmCfeAMjEvO65i0Y6XijQfSRPWx3TV/Df7Km3E1l+kLt56s/rwVzuRusNMhudznkwdLaS+QNdeal2jDPP4l9qHc98vTYZOSkxzD+njBWVWjFPKgipx6DkWvXQiW8OYcewVHE5yukinDMcfGgc0opDltYKDxIGBedkzc6jSfE7tlvESCDFUw0Hx0opS+U0lHCxNottbNWSxX9zZVvEhKWUSyBpaXwBc2a98M6UqPeXAs/GDon8Ax7hsthO8cM5HU7Ad0UvRR9lHmtyQKZ4MAe814X5h9MSUkQmhf96eVJ6p90OjIiqSIjvykvr2l5U55O/fPQKD+jIomYpNyGJQ25uQ2kIikRfAmuBHCPsWqkSDEqgZ5KDI2sifS/R43MbZg0idFHbCPNxXxZws1ACVE6hAhOdJwRkJLFBLPZpRGYJ50pko6XzMkgmSx40ljik6AQcKhFnLcQE6rF7PXFe1Ocoj0T3AXgSgJTDIhHRfHlYZKuSzc6uievOJGXY+i5GJkkTp7UM3y0LqATDbtFcbdBxO7o4T25JYlEjoH0uynUh8rapkxp62QN70svSF+hT4gGPlovlmcm/ComLi7mV4kTykV9NFWjE/QrwgQ4uIcAP0rQF4VZYRP2o3PhHHzfPMJj9Ir+uzKUlrH49ntT18AVvj1sc3YGjUT/Mt2Dxawa8ArcA7bCQIpvfwAYu22vEG/No/5RvPdA7g+AelLrPwzy+LtkLPhnpIxH14m4EYq8eeMHbPEPNm6G7Nv9B4jcFPZ8bJj0SEjP3MPgQdKTqqEoy2v6G32P/Y6dxOv04AxnoAeq+GILvUavtYCBXm+BaIhuodcfrN5B/V2EYMCPh+SxavjGyPwV0x4CJgUPGT0mQaODGBACIJZGsMXwAD0LGXx7l3CdAcKMIKI+f5CepWeD0BvyU/GcdBxPF8SwejC6LGZmAURFdsSWKR5HyHld2kbdIZO1Ixx+bnnzU7n5+blPNV9jnUDWhP2tC68tbN3PVIldsQPxSAcSpjOav7Q05uXn5zW2LLvDXn9B6syscPy9iDLEMmSrJz6nYuWMipukjM0AH8JkGS+XFyMRkzSCH7KD/hwm172SAyZYumHlefr5AddrtA0O0TnwaVZxcRY9Bfukn9Gf05N1r9DV9MoBsJ1f+ZrqUvtPHizJAntWybv7hmqLt6QLuK6ZS9Fqi1jO5rDoWPZXXII5Tgajg53cIXCjDCGIcYrRIY2n6+mXOa/W0bdhau3ryiEYe2FV/5oeaIYK/5w5frCyll6/cYO8DiNhw6t1MBWmznt91QX62UF1N7l0eHBZTRGpKaqpKVIPF9UcIzmReud9TSY75+K899GHbBu6wjoR7RKKZVYiYxSPf5/2wJT5e3NAhmUbVn5KLx1Ujg0+BGvpAIh0DezInTkzF37KVocxrKU3r1+XLtAe2lO3l66kfQfB/unKY+q8N375Ru8bc4pJXfEcESU95q+p8ZNZRTWH1d9FzvUdYXk5rLkcdkEisoKKVHQW/b3GEx6tPaYcoJfOr9wAbSBnv1IHpep0OExr4LPMkpJM+j7sly7UHkOzXjoAZljHCGiyegtNlwljM0v+c19ET9Pvst09a2Mtgcf5/ZSzYO5h1156+eyydfAsxGa9XAuF6vzjh6CssLq6ECysperXX0sX5h5ZdpZe3guxsGIPEtHk/aqXX1hVqP5HYVVVISkrrNqvXorIc+5Ou91Hnr/LcD2afi6eX7UBloOcs7cOpqgGaNfs1g7bNbs9z6wASaylN69d0/TFTIz6Ws8+oGV3mE2612wRTHKcVUbhjKadebloMc+dyXgMVtVK6BwMB/+mVW09igdRBWaRtNQX59d/VD//xdQ0TCiYNj1KT9sq6Wdu5WTbqk3qDXyDaLa1fv621LS01G3z61sD6lH8lAxDLicV921s6Bf92JOYvzNYCL1khbqBXEFUzC521N5NyzNaQIWhjyFyDoBIVrAjmv2UEaLlI+c6zw1jmVIPLLLZZUTj6GxGHW+mq1tgHXR2D85p4Q934+jLbtjVLcyCdS10NVzpHqxp4Q/hK7WopY/NRGx9HGsPGdFjOjcpjBnGYMVqY/4eqT5khWEHWUup2A/pTw7pdWgsWft7ETUERL96nRg0HNFPmCYba6pylECaExX89A9WLUOVB4oKLu/o1oqSYHCgLzBUlAz8hNFDRpeSU1XT+LRmDUgPaKbYdHDn9suF/tu13nHJij0N97LfS0QmqONuyONk7zvUI6Qa0pF9f2+oABL92AT6e0U//z9YqAiWtJLU1JK0gS+1aacwamiNqK067u9ZQ8f1d4qLodMzz3uL89Z68V/Hnr++hXWUuHgw8dfi972PeTyPefu3aNNucemQ74qFuIaJnVkOu4Q+yjuwmmC1FqZpl1i4uzoPxjkpPf3Xv545tl26Rr+dOvUd+omqJzch9dOeU7f10Y64nMcKK137DccIZq2WdXtdZjbEoLSzHwiMtrjYLDxpHQW8gjMX6XFYAE2zSWVD04EGYSs9MbO6sEo20BMEAB4mpvSypsKjZ4Stgzb+c3A9/MQT2+vrBy+qvyFxLUtLlSRF/Ri2wjfZ2dus2Q8lXx4608/jnqK5OOap6NY2PSjYYnECCjiEeLJll/pbmqfeIK+ps3+MxrlEhqmTPipVP7kqlF4VhpEb6r+Q7YOJg38kJ9SHBf3NBl6+9YchfbUjb5ahLSzUM3kPHmwFAsZ5rpai0S7E5xWzZ1j+fW7zsUWP2g5NXTw52ySCTrgG0+lbw60l2Y/CB185CoA8NK+tbRKxfjy6pm5hzQRRR+cMqv1Jbiw6STivtEvt3DRcy0QEh92JlUGo2PG4tSKHl00YD6xc8CK+YPYyy3io2lN8BcSjKRzrIV6ypOAobqxViJPaT9M9Hy5szY33mp7OX/Zu89L/7Ww5vqY2Y8b0pKgoiUhG5cPDPzq8qTV/WkzUOIvXVVA96kmjcBrr3HrYC/Wn+fYP6Z7T1rqy3zknbvqma/FvVk96fNXGkuaXrdHW5JGSxZT/2I/O73v+yNWafMdzc5NdxYurHs6h86e01sLKLz9EBrg+x36rxAaED7hRnAMx7Vzu+9wabh3zG8XLQjx0ablUJzmxdErxYT3kzQSd0SSafVqF5PXgpp0OyYJ1EyNHpGUZmvK575ySzd85JSqF7IBzSAbMM04+MbE58xF3/njXOGecSaermlw2y9PsSQdytLJVr8t+wg+rR8cZYoeNxVIzNdk3Bngi8U5LAlgTFoQnzJCa5EsCgYhCaGL+qPj7TdhG31p9tej3R04N//PXxNwJvyUqwaJqRPJY98TJ5TPndmflRAkAhBfe46sfKW5wizSge08Xb7Ca/GUVs55trngkKkrUS2WPzKttaaqq+idmahugkY+W6fN0I6i3gPt/x88U4wAAeJxjYGRgYADiGU9YXsXz23xl4GZnAIFH7fO+IdMc/WBxDgYmEAUASbMKwAB4nGNgZGBgZwABjj4Ghv//OfoZGBlQgT4ARicDZAAAAHicY2BgYGAfxJijD8Fmu4EqBwCSpgKpAAAAAAAADgBoAH4AzADgAQIBQgFsAZgB7gIuAooC0AL8A2IDjAOoA+AEMASwBNoFCAVaBcAGCAYuBnAGrAb2B04HigfSCCoIcAiGCJwIyAkkCVYJiAmsCfIKIApWCsQLknicY2BkYGDQZ2hmYGcAASYg5gJCBob/YD4DABqrAdAAeJxdkE1qg0AYhl8Tk9AIoVDaVSmzahcF87PMARLIMoFAl0ZHY1BHdBJIT9AT9AQ9RQ9Qeqy+yteNMzDzfM+88w0K4BY/cNAMB6N2bUaPPBLukybCLvleeAAPj8JD+hfhMV7hC3u4wxs7OO4NzQSZcI/8Ltwnfwi75E/hAR7wJTyk/xYeY49fYQ/PztM+jbTZ7LY6OWdBJdX/pqs6NYWa+zMxa13oKrA6Uoerqi/JwtpYxZXJ1coUVmeZUWVlTjq0/tHacjmdxuL90OR8O0UEDYMNdtiSEpz5XQGqzlm30kzUdAYFFOb8R7NOZk0q2lwAyz1i7oAr1xoXvrOgtYhZx8wY5KRV269JZ5yGpmzPTjQhvY9je6vEElPOuJP3mWKnP5M3V+YAAAB4nG2ReVPbMBDF/ULi2EkDBFqO3gdHLxUzDB9IkdexBllydRD49ihO3Ckz7B/a31utZnafkkGyiXnyclxhgB0MMUKKMTLkmGCKV5hhF3vYxxwHOMRrvMERjnGCU7zFO7zHB3zEJ3zGF3zFN5zhHBe4xHf8wE/8wm8w/MEVimTYKv44XR9MSCsUjVoeHE3vjQoNsSZ4mmxZmVWPjSz7jlou6/0qKOWEJdKMtCe793/hQfqxa6XWZHMXFl56RS4TvPXSaDeoy0zUUZB109KstDK8lHo5q6Qi1hcOnqkImubPS6aqRq7mlnaEWabub4iYblba3SRmgldS0+FWdhNtt04F14JUaqkl7tcpOpJtErvNt3Bd9HRT5JWxK25Ldjvp6br4hzfFiIdSmlzTg2fSUzNrLd1LE1ynxq4OVaVoKLjzJ60UPtj1RKzHzsbjly6inVnFBS2MucviPncU7Rr7lfTxRepDs1A2j3ZHRc7PuzFYSfE3ZOd4kjwBy227hA=="},80542:function(){},94634:function(ke){function le(){return ke.exports=le=Object.assign?Object.assign.bind():function(G){for(var ne=1;ne<arguments.length;ne++){var A=arguments[ne];for(var N in A)({}).hasOwnProperty.call(A,N)&&(G[N]=A[N])}return G},ke.exports.__esModule=!0,ke.exports.default=ke.exports,le.apply(null,arguments)}ke.exports=le,ke.exports.__esModule=!0,ke.exports.default=ke.exports}}]);

//# sourceMappingURL=676.06d4c1ef2bd9f52cef1c.js.map