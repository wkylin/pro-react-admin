(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[9676],{27495:function(ye,re,W){"use strict";var J=W(89840),A=function($,Z){return Z===void 0&&(Z=!1),function(he,fe,ue){if(he){$(he);return}if(fe.statusCode>=400&&fe.statusCode<=599){var ee=ue;if(Z)if(J.TextDecoder){var Ce=M(fe.headers&&fe.headers["content-type"]);try{ee=new TextDecoder(Ce).decode(ue)}catch(Pe){}}else ee=String.fromCharCode.apply(null,new Uint8Array(ue));$({cause:ee});return}$(null,ue)}};function M(k){return k===void 0&&(k=""),k.toLowerCase().split(";").reduce(function($,Z){var he=Z.split("="),fe=he[0],ue=he[1];return fe.trim()==="charset"?ue.trim():$},"utf-8")}ye.exports=A},21036:function(ye,re,W){"use strict";var J=W(89840),A=W(94634),M=W(37056),k=W(26162),$=W(8670);ee.httpHandler=W(27495),ee.requestInterceptorsStorage=new k,ee.responseInterceptorsStorage=new k,ee.retryManager=new $;/**
 * @license
 * slighly modified parse-headers 2.0.2 <https://github.com/kesla/parse-headers/>
 * Copyright (c) 2014 David Björklund
 * Available under the MIT license
 * <https://github.com/kesla/parse-headers/blob/master/LICENCE>
 */var Z=function(He){var Re={};return He&&He.trim().split(`
`).forEach(function(Xe){var ae=Xe.indexOf(":"),ke=Xe.slice(0,ae).trim().toLowerCase(),xe=Xe.slice(ae+1).trim();typeof Re[ke]=="undefined"?Re[ke]=xe:Array.isArray(Re[ke])?Re[ke].push(xe):Re[ke]=[Re[ke],xe]}),Re};ye.exports=ee,ye.exports.default=ee,ee.XMLHttpRequest=J.XMLHttpRequest||Ve,ee.XDomainRequest="withCredentials"in new ee.XMLHttpRequest?ee.XMLHttpRequest:J.XDomainRequest,he(["get","put","post","patch","head","delete"],function(X){ee[X==="delete"?"del":X]=function(He,Re,Xe){return Re=ue(He,Re,Xe),Re.method=X.toUpperCase(),Ce(Re)}});function he(X,He){for(var Re=0;Re<X.length;Re++)He(X[Re])}function fe(X){for(var He in X)if(X.hasOwnProperty(He))return!1;return!0}function ue(X,He,Re){var Xe=X;return M(He)?(Re=He,typeof X=="string"&&(Xe={uri:X})):Xe=A({},He,{uri:X}),Xe.callback=Re,Xe}function ee(X,He,Re){return He=ue(X,He,Re),Ce(He)}function Ce(X){if(typeof X.callback=="undefined")throw new Error("callback argument missing");if(X.requestType&&ee.requestInterceptorsStorage.getIsEnabled()){var He={uri:X.uri||X.url,headers:X.headers||{},body:X.body,metadata:X.metadata||{},retry:X.retry,timeout:X.timeout},Re=ee.requestInterceptorsStorage.execute(X.requestType,He);X.uri=Re.uri,X.headers=Re.headers,X.body=Re.body,X.metadata=Re.metadata,X.retry=Re.retry,X.timeout=Re.timeout}var Xe=!1,ae=function(te,ie,se){Xe||(Xe=!0,X.callback(te,ie,se))};function ke(){_e.readyState===4&&!ee.responseInterceptorsStorage.getIsEnabled()&&setTimeout(ge,0)}function xe(){var G=void 0;if(_e.response?G=_e.response:G=_e.responseText||Pe(_e),de)try{G=JSON.parse(G)}catch(te){}return G}function Se(G){if(clearTimeout(le),clearTimeout(X.retryTimeout),G instanceof Error||(G=new Error(""+(G||"Unknown XMLHttpRequest Error"))),G.statusCode=0,!De&&ee.retryManager.getIsEnabled()&&X.retry&&X.retry.shouldRetry()){X.retryTimeout=setTimeout(function(){X.retry.moveToNextAttempt(),X.xhr=_e,Ce(X)},X.retry.getCurrentFuzzedDelay());return}if(X.requestType&&ee.responseInterceptorsStorage.getIsEnabled()){var te={headers:me.headers||{},body:me.body,responseUrl:_e.responseURL,responseType:_e.responseType},ie=ee.responseInterceptorsStorage.execute(X.requestType,te);me.body=ie.body,me.headers=ie.headers}return ae(G,me)}function ge(){if(!De){var G;clearTimeout(le),clearTimeout(X.retryTimeout),X.useXDR&&_e.status===void 0?G=200:G=_e.status===1223?204:_e.status;var te=me,ie=null;if(G!==0?(te={body:xe(),statusCode:G,method:x,headers:{},url:T,rawRequest:_e},_e.getAllResponseHeaders&&(te.headers=Z(_e.getAllResponseHeaders()))):ie=new Error("Internal XMLHttpRequest Error"),X.requestType&&ee.responseInterceptorsStorage.getIsEnabled()){var se={headers:te.headers||{},body:te.body,responseUrl:_e.responseURL,responseType:_e.responseType},Te=ee.responseInterceptorsStorage.execute(X.requestType,se);te.body=Te.body,te.headers=Te.headers}return ae(ie,te,te.body)}}var _e=X.xhr||null;_e||(X.cors||X.useXDR?_e=new ee.XDomainRequest:_e=new ee.XMLHttpRequest);var Ue,De,T=_e.url=X.uri||X.url,x=_e.method=X.method||"GET",L=X.body||X.data,ne=_e.headers=X.headers||{},ce=!!X.sync,de=!1,le,me={body:void 0,headers:{},statusCode:0,method:x,url:T,rawRequest:_e};if("json"in X&&X.json!==!1&&(de=!0,ne.accept||ne.Accept||(ne.Accept="application/json"),x!=="GET"&&x!=="HEAD"&&(ne["content-type"]||ne["Content-Type"]||(ne["Content-Type"]="application/json"),L=JSON.stringify(X.json===!0?L:X.json))),_e.onreadystatechange=ke,_e.onload=ge,_e.onerror=Se,_e.onprogress=function(){},_e.onabort=function(){De=!0,clearTimeout(X.retryTimeout)},_e.ontimeout=Se,_e.open(x,T,!ce,X.username,X.password),ce||(_e.withCredentials=!!X.withCredentials),!ce&&X.timeout>0&&(le=setTimeout(function(){if(!De){De=!0,_e.abort("timeout");var G=new Error("XMLHttpRequest timeout");G.code="ETIMEDOUT",Se(G)}},X.timeout)),_e.setRequestHeader)for(Ue in ne)ne.hasOwnProperty(Ue)&&_e.setRequestHeader(Ue,ne[Ue]);else if(X.headers&&!fe(X.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in X&&(_e.responseType=X.responseType),"beforeSend"in X&&typeof X.beforeSend=="function"&&X.beforeSend(_e),_e.send(L||null),_e}function Pe(X){try{if(X.responseType==="document")return X.responseXML;var He=X.responseXML&&X.responseXML.documentElement.nodeName==="parsererror";if(X.responseType===""&&!He)return X.responseXML}catch(Re){}return null}function Ve(){}},26162:function(ye){"use strict";function re(M,k){var $=typeof Symbol!="undefined"&&M[Symbol.iterator]||M["@@iterator"];if($)return($=$.call(M)).next.bind($);if(Array.isArray(M)||($=W(M))||k&&M&&typeof M.length=="number"){$&&(M=$);var Z=0;return function(){return Z>=M.length?{done:!0}:{done:!1,value:M[Z++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function W(M,k){if(M){if(typeof M=="string")return J(M,k);var $=Object.prototype.toString.call(M).slice(8,-1);if($==="Object"&&M.constructor&&($=M.constructor.name),$==="Map"||$==="Set")return Array.from(M);if($==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test($))return J(M,k)}}function J(M,k){(k==null||k>M.length)&&(k=M.length);for(var $=0,Z=new Array(k);$<k;$++)Z[$]=M[$];return Z}var A=function(){function M(){this.typeToInterceptorsMap_=new Map,this.enabled_=!1}var k=M.prototype;return k.getIsEnabled=function(){return this.enabled_},k.enable=function(){this.enabled_=!0},k.disable=function(){this.enabled_=!1},k.reset=function(){this.typeToInterceptorsMap_=new Map,this.enabled_=!1},k.addInterceptor=function(Z,he){this.typeToInterceptorsMap_.has(Z)||this.typeToInterceptorsMap_.set(Z,new Set);var fe=this.typeToInterceptorsMap_.get(Z);return fe.has(he)?!1:(fe.add(he),!0)},k.removeInterceptor=function(Z,he){var fe=this.typeToInterceptorsMap_.get(Z);return fe&&fe.has(he)?(fe.delete(he),!0):!1},k.clearInterceptorsByType=function(Z){var he=this.typeToInterceptorsMap_.get(Z);return he?(this.typeToInterceptorsMap_.delete(Z),this.typeToInterceptorsMap_.set(Z,new Set),!0):!1},k.clear=function(){return this.typeToInterceptorsMap_.size?(this.typeToInterceptorsMap_=new Map,!0):!1},k.getForType=function(Z){return this.typeToInterceptorsMap_.get(Z)||new Set},k.execute=function(Z,he){for(var fe=this.getForType(Z),ue=re(fe),ee;!(ee=ue()).done;){var Ce=ee.value;try{he=Ce(he)}catch(Pe){}}return he},M}();ye.exports=A},8670:function(ye){"use strict";var re=function(){function J(){this.maxAttempts_=1,this.delayFactor_=.1,this.fuzzFactor_=.1,this.initialDelay_=1e3,this.enabled_=!1}var A=J.prototype;return A.getIsEnabled=function(){return this.enabled_},A.enable=function(){this.enabled_=!0},A.disable=function(){this.enabled_=!1},A.reset=function(){this.maxAttempts_=1,this.delayFactor_=.1,this.fuzzFactor_=.1,this.initialDelay_=1e3,this.enabled_=!1},A.getMaxAttempts=function(){return this.maxAttempts_},A.setMaxAttempts=function(k){this.maxAttempts_=k},A.getDelayFactor=function(){return this.delayFactor_},A.setDelayFactor=function(k){this.delayFactor_=k},A.getFuzzFactor=function(){return this.fuzzFactor_},A.setFuzzFactor=function(k){this.fuzzFactor_=k},A.getInitialDelay=function(){return this.initialDelay_},A.setInitialDelay=function(k){this.initialDelay_=k},A.createRetry=function(k){var $=k===void 0?{}:k,Z=$.maxAttempts,he=$.delayFactor,fe=$.fuzzFactor,ue=$.initialDelay;return new W({maxAttempts:Z||this.maxAttempts_,delayFactor:he||this.delayFactor_,fuzzFactor:fe||this.fuzzFactor_,initialDelay:ue||this.initialDelay_})},J}(),W=function(){function J(M){this.maxAttempts_=M.maxAttempts,this.delayFactor_=M.delayFactor,this.fuzzFactor_=M.fuzzFactor,this.currentDelay_=M.initialDelay,this.currentAttempt_=1}var A=J.prototype;return A.moveToNextAttempt=function(){this.currentAttempt_++;var k=this.currentDelay_*this.delayFactor_;this.currentDelay_=this.currentDelay_+k},A.shouldRetry=function(){return this.currentAttempt_<this.maxAttempts_},A.getCurrentDelay=function(){return this.currentDelay_},A.getCurrentMinPossibleDelay=function(){return(1-this.fuzzFactor_)*this.currentDelay_},A.getCurrentMaxPossibleDelay=function(){return(1+this.fuzzFactor_)*this.currentDelay_},A.getCurrentFuzzedDelay=function(){var k=this.getCurrentMinPossibleDelay(),$=this.getCurrentMaxPossibleDelay();return k+Math.random()*($-k)},J}();ye.exports=re},44582:function(ye,re){"use strict";function W($,Z,he){if(he===void 0&&(he=Array.prototype),$&&typeof he.find=="function")return he.find.call($,Z);for(var fe=0;fe<$.length;fe++)if(Object.prototype.hasOwnProperty.call($,fe)){var ue=$[fe];if(Z.call(void 0,ue,fe,$))return ue}}function J($,Z){return Z===void 0&&(Z=Object),Z&&typeof Z.freeze=="function"?Z.freeze($):$}function A($,Z){if($===null||typeof $!="object")throw new TypeError("target is not an object");for(var he in Z)Object.prototype.hasOwnProperty.call(Z,he)&&($[he]=Z[he]);return $}var M=J({HTML:"text/html",isHTML:function($){return $===M.HTML},XML_APPLICATION:"application/xml",XML_TEXT:"text/xml",XML_XHTML_APPLICATION:"application/xhtml+xml",XML_SVG_IMAGE:"image/svg+xml"}),k=J({HTML:"http://www.w3.org/1999/xhtml",isHTML:function($){return $===k.HTML},SVG:"http://www.w3.org/2000/svg",XML:"http://www.w3.org/XML/1998/namespace",XMLNS:"http://www.w3.org/2000/xmlns/"});re.assign=A,re.find=W,re.freeze=J,re.MIME_TYPE=M,re.NAMESPACE=k},15752:function(ye,re,W){var J,A=W(44582),M=W(84722),k=W(56559),$=W(64466),Z=M.DOMImplementation,he=A.NAMESPACE,fe=$.ParseError,ue=$.XMLReader;function ee(ae){return ae.replace(/\r[\n\u0085]/g,`
`).replace(/[\r\u0085\u2028]/g,`
`)}function Ce(ae){this.options=ae||{locator:{}}}Ce.prototype.parseFromString=function(ae,ke){var xe=this.options,Se=new ue,ge=xe.domBuilder||new Ve,_e=xe.errorHandler,Ue=xe.locator,De=xe.xmlns||{},T=/\/x?html?$/.test(ke),x=T?k.HTML_ENTITIES:k.XML_ENTITIES;Ue&&ge.setDocumentLocator(Ue),Se.errorHandler=Pe(_e,ge,Ue),Se.domBuilder=xe.domBuilder||ge,T&&(De[""]=he.HTML),De.xml=De.xml||he.XML;var L=xe.normalizeLineEndings||ee;return ae&&typeof ae=="string"?Se.parse(L(ae),De,x):Se.errorHandler.error("invalid doc source"),ge.doc};function Pe(ae,ke,xe){if(!ae){if(ke instanceof Ve)return ke;ae=ke}var Se={},ge=ae instanceof Function;xe=xe||{};function _e(Ue){var De=ae[Ue];!De&&ge&&(De=ae.length==2?function(T){ae(Ue,T)}:ae),Se[Ue]=De&&function(T){De("[xmldom "+Ue+"]	"+T+He(xe))}||function(){}}return _e("warning"),_e("error"),_e("fatalError"),Se}function Ve(){this.cdata=!1}function X(ae,ke){ke.lineNumber=ae.lineNumber,ke.columnNumber=ae.columnNumber}Ve.prototype={startDocument:function(){this.doc=new Z().createDocument(null,null,null),this.locator&&(this.doc.documentURI=this.locator.systemId)},startElement:function(ae,ke,xe,Se){var ge=this.doc,_e=ge.createElementNS(ae,xe||ke),Ue=Se.length;Xe(this,_e),this.currentElement=_e,this.locator&&X(this.locator,_e);for(var De=0;De<Ue;De++){var ae=Se.getURI(De),T=Se.getValue(De),xe=Se.getQName(De),x=ge.createAttributeNS(ae,xe);this.locator&&X(Se.getLocator(De),x),x.value=x.nodeValue=T,_e.setAttributeNode(x)}},endElement:function(ae,ke,xe){var Se=this.currentElement,ge=Se.tagName;this.currentElement=Se.parentNode},startPrefixMapping:function(ae,ke){},endPrefixMapping:function(ae){},processingInstruction:function(ae,ke){var xe=this.doc.createProcessingInstruction(ae,ke);this.locator&&X(this.locator,xe),Xe(this,xe)},ignorableWhitespace:function(ae,ke,xe){},characters:function(ae,ke,xe){if(ae=Re.apply(this,arguments),ae){if(this.cdata)var Se=this.doc.createCDATASection(ae);else var Se=this.doc.createTextNode(ae);this.currentElement?this.currentElement.appendChild(Se):/^\s*$/.test(ae)&&this.doc.appendChild(Se),this.locator&&X(this.locator,Se)}},skippedEntity:function(ae){},endDocument:function(){this.doc.normalize()},setDocumentLocator:function(ae){(this.locator=ae)&&(ae.lineNumber=0)},comment:function(ae,ke,xe){ae=Re.apply(this,arguments);var Se=this.doc.createComment(ae);this.locator&&X(this.locator,Se),Xe(this,Se)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(ae,ke,xe){var Se=this.doc.implementation;if(Se&&Se.createDocumentType){var ge=Se.createDocumentType(ae,ke,xe);this.locator&&X(this.locator,ge),Xe(this,ge),this.doc.doctype=ge}},warning:function(ae){console.warn("[xmldom warning]	"+ae,He(this.locator))},error:function(ae){console.error("[xmldom error]	"+ae,He(this.locator))},fatalError:function(ae){throw new fe(ae,this.locator)}};function He(ae){if(ae)return`
@`+(ae.systemId||"")+"#[line:"+ae.lineNumber+",col:"+ae.columnNumber+"]"}function Re(ae,ke,xe){return typeof ae=="string"?ae.substr(ke,xe):ae.length>=ke+xe||ke?new java.lang.String(ae,ke,xe)+"":ae}"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(ae){Ve.prototype[ae]=function(){return null}});function Xe(ae,ke){ae.currentElement?ae.currentElement.appendChild(ke):ae.doc.appendChild(ke)}J=Ve,J=ee,re.DOMParser=Ce},84722:function(ye,re,W){var J=W(44582),A=J.find,M=J.NAMESPACE;function k(v){return v!==""}function $(v){return v?v.split(/[\t\n\f\r ]+/).filter(k):[]}function Z(v,_){return v.hasOwnProperty(_)||(v[_]=!0),v}function he(v){if(!v)return[];var _=$(v);return Object.keys(_.reduce(Z,{}))}function fe(v){return function(_){return v&&v.indexOf(_)!==-1}}function ue(v,_){for(var w in v)Object.prototype.hasOwnProperty.call(v,w)&&(_[w]=v[w])}function ee(v,_){var w=v.prototype;if(!(w instanceof _)){let oe=function(){};var V=oe;oe.prototype=_.prototype,oe=new oe,ue(w,oe),v.prototype=w=oe}w.constructor!=v&&(typeof v!="function"&&console.error("unknown Class:"+v),w.constructor=v)}var Ce={},Pe=Ce.ELEMENT_NODE=1,Ve=Ce.ATTRIBUTE_NODE=2,X=Ce.TEXT_NODE=3,He=Ce.CDATA_SECTION_NODE=4,Re=Ce.ENTITY_REFERENCE_NODE=5,Xe=Ce.ENTITY_NODE=6,ae=Ce.PROCESSING_INSTRUCTION_NODE=7,ke=Ce.COMMENT_NODE=8,xe=Ce.DOCUMENT_NODE=9,Se=Ce.DOCUMENT_TYPE_NODE=10,ge=Ce.DOCUMENT_FRAGMENT_NODE=11,_e=Ce.NOTATION_NODE=12,Ue={},De={},T=Ue.INDEX_SIZE_ERR=(De[1]="Index size error",1),x=Ue.DOMSTRING_SIZE_ERR=(De[2]="DOMString size error",2),L=Ue.HIERARCHY_REQUEST_ERR=(De[3]="Hierarchy request error",3),ne=Ue.WRONG_DOCUMENT_ERR=(De[4]="Wrong document",4),ce=Ue.INVALID_CHARACTER_ERR=(De[5]="Invalid character",5),de=Ue.NO_DATA_ALLOWED_ERR=(De[6]="No data allowed",6),le=Ue.NO_MODIFICATION_ALLOWED_ERR=(De[7]="No modification allowed",7),me=Ue.NOT_FOUND_ERR=(De[8]="Not found",8),G=Ue.NOT_SUPPORTED_ERR=(De[9]="Not supported",9),te=Ue.INUSE_ATTRIBUTE_ERR=(De[10]="Attribute in use",10),ie=Ue.INVALID_STATE_ERR=(De[11]="Invalid state",11),se=Ue.SYNTAX_ERR=(De[12]="Syntax error",12),Te=Ue.INVALID_MODIFICATION_ERR=(De[13]="Invalid modification",13),Me=Ue.NAMESPACE_ERR=(De[14]="Invalid namespace",14),ze=Ue.INVALID_ACCESS_ERR=(De[15]="Invalid access",15);function je(v,_){if(_ instanceof Error)var w=_;else w=this,Error.call(this,De[v]),this.message=De[v],Error.captureStackTrace&&Error.captureStackTrace(this,je);return w.code=v,_&&(this.message=this.message+": "+_),w}je.prototype=Error.prototype,ue(Ue,je);function Be(){}Be.prototype={length:0,item:function(v){return v>=0&&v<this.length?this[v]:null},toString:function(v,_){for(var w=[],V=0;V<this.length;V++)vi(this[V],w,v,_);return w.join("")},filter:function(v){return Array.prototype.filter.call(this,v)},indexOf:function(v){return Array.prototype.indexOf.call(this,v)}};function _t(v,_){this._node=v,this._refresh=_,Dt(this)}function Dt(v){var _=v._node._inc||v._node.ownerDocument._inc;if(v._inc!==_){var w=v._refresh(v._node);if(nr(v,"length",w.length),!v.$$length||w.length<v.$$length)for(var V=w.length;V in v;V++)Object.prototype.hasOwnProperty.call(v,V)&&delete v[V];ue(w,v),v._inc=_}}_t.prototype.item=function(v){return Dt(this),this[v]||null},ee(_t,Be);function pt(){}function Ct(v,_){for(var w=v.length;w--;)if(v[w]===_)return w}function Wt(v,_,w,V){if(V?_[Ct(_,V)]=w:_[_.length++]=w,v){w.ownerElement=v;var oe=v.ownerDocument;oe&&(V&&os(oe,v,V),as(oe,v,w))}}function gi(v,_,w){var V=Ct(_,w);if(V>=0){for(var oe=_.length-1;V<oe;)_[V]=_[++V];if(_.length=oe,v){var Le=v.ownerDocument;Le&&(os(Le,v,w),w.ownerElement=null)}}else throw new je(me,new Error(v.tagName+"@"+w))}pt.prototype={length:0,item:Be.prototype.item,getNamedItem:function(v){for(var _=this.length;_--;){var w=this[_];if(w.nodeName==v)return w}},setNamedItem:function(v){var _=v.ownerElement;if(_&&_!=this._ownerElement)throw new je(te);var w=this.getNamedItem(v.nodeName);return Wt(this._ownerElement,this,v,w),w},setNamedItemNS:function(v){var _=v.ownerElement,w;if(_&&_!=this._ownerElement)throw new je(te);return w=this.getNamedItemNS(v.namespaceURI,v.localName),Wt(this._ownerElement,this,v,w),w},removeNamedItem:function(v){var _=this.getNamedItem(v);return gi(this._ownerElement,this,_),_},removeNamedItemNS:function(v,_){var w=this.getNamedItemNS(v,_);return gi(this._ownerElement,this,w),w},getNamedItemNS:function(v,_){for(var w=this.length;w--;){var V=this[w];if(V.localName==_&&V.namespaceURI==v)return V}return null}};function Sn(){}Sn.prototype={hasFeature:function(v,_){return!0},createDocument:function(v,_,w){var V=new pe;if(V.implementation=this,V.childNodes=new Be,V.doctype=w||null,w&&V.appendChild(w),_){var oe=V.createElementNS(v,_);V.appendChild(oe)}return V},createDocumentType:function(v,_,w){var V=new ui;return V.name=v,V.nodeName=v,V.publicId=_||"",V.systemId=w||"",V}};function $e(){}$e.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,attributes:null,parentNode:null,childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,insertBefore:function(v,_){return cs(this,v,_)},replaceChild:function(v,_){cs(this,v,_,Ca),_&&this.removeChild(_)},removeChild:function(v){return wi(this,v)},appendChild:function(v){return this.insertBefore(v,null)},hasChildNodes:function(){return this.firstChild!=null},cloneNode:function(v){return nn(this.ownerDocument||this,this,v)},normalize:function(){for(var v=this.firstChild;v;){var _=v.nextSibling;_&&_.nodeType==X&&v.nodeType==X?(this.removeChild(_),v.appendData(_.data)):(v.normalize(),v=_)}},isSupported:function(v,_){return this.ownerDocument.implementation.hasFeature(v,_)},hasAttributes:function(){return this.attributes.length>0},lookupPrefix:function(v){for(var _=this;_;){var w=_._nsMap;if(w){for(var V in w)if(Object.prototype.hasOwnProperty.call(w,V)&&w[V]===v)return V}_=_.nodeType==Ve?_.ownerDocument:_.parentNode}return null},lookupNamespaceURI:function(v){for(var _=this;_;){var w=_._nsMap;if(w&&Object.prototype.hasOwnProperty.call(w,v))return w[v];_=_.nodeType==Ve?_.ownerDocument:_.parentNode}return null},isDefaultNamespace:function(v){var _=this.lookupPrefix(v);return _==null}};function Et(v){return v=="<"&&"&lt;"||v==">"&&"&gt;"||v=="&"&&"&amp;"||v=='"'&&"&quot;"||"&#"+v.charCodeAt()+";"}ue(Ce,$e),ue(Ce,$e.prototype);function li(v,_){if(_(v))return!0;if(v=v.firstChild)do if(li(v,_))return!0;while(v=v.nextSibling)}function pe(){this.ownerDocument=this}function as(v,_,w){v&&v._inc++;var V=w.namespaceURI;V===M.XMLNS&&(_._nsMap[w.prefix?w.localName:""]=w.value)}function os(v,_,w,V){v&&v._inc++;var oe=w.namespaceURI;oe===M.XMLNS&&delete _._nsMap[w.prefix?w.localName:""]}function st(v,_,w){if(v&&v._inc){v._inc++;var V=_.childNodes;if(w)V[V.length++]=w;else{for(var oe=_.firstChild,Le=0;oe;)V[Le++]=oe,oe=oe.nextSibling;V.length=Le,delete V[V.length]}}}function wi(v,_){var w=_.previousSibling,V=_.nextSibling;return w?w.nextSibling=V:v.firstChild=V,V?V.previousSibling=w:v.lastChild=w,_.parentNode=null,_.previousSibling=null,_.nextSibling=null,st(v.ownerDocument,v),_}function tt(v){return v&&(v.nodeType===$e.DOCUMENT_NODE||v.nodeType===$e.DOCUMENT_FRAGMENT_NODE||v.nodeType===$e.ELEMENT_NODE)}function Pt(v){return v&&(Zt(v)||ls(v)||Jt(v)||v.nodeType===$e.DOCUMENT_FRAGMENT_NODE||v.nodeType===$e.COMMENT_NODE||v.nodeType===$e.PROCESSING_INSTRUCTION_NODE)}function Jt(v){return v&&v.nodeType===$e.DOCUMENT_TYPE_NODE}function Zt(v){return v&&v.nodeType===$e.ELEMENT_NODE}function ls(v){return v&&v.nodeType===$e.TEXT_NODE}function Zs(v,_){var w=v.childNodes||[];if(A(w,Zt)||Jt(_))return!1;var V=A(w,Jt);return!(_&&V&&w.indexOf(V)>w.indexOf(_))}function us(v,_){var w=v.childNodes||[];function V(Le){return Zt(Le)&&Le!==_}if(A(w,V))return!1;var oe=A(w,Jt);return!(_&&oe&&w.indexOf(oe)>w.indexOf(_))}function Ta(v,_,w){if(!tt(v))throw new je(L,"Unexpected parent node type "+v.nodeType);if(w&&w.parentNode!==v)throw new je(me,"child not in parent");if(!Pt(_)||Jt(_)&&v.nodeType!==$e.DOCUMENT_NODE)throw new je(L,"Unexpected node type "+_.nodeType+" for parent node type "+v.nodeType)}function it(v,_,w){var V=v.childNodes||[],oe=_.childNodes||[];if(_.nodeType===$e.DOCUMENT_FRAGMENT_NODE){var Le=oe.filter(Zt);if(Le.length>1||A(oe,ls))throw new je(L,"More than one element or text in fragment");if(Le.length===1&&!Zs(v,w))throw new je(L,"Element in fragment can not be inserted before doctype")}if(Zt(_)&&!Zs(v,w))throw new je(L,"Only one element can be added and only after doctype");if(Jt(_)){if(A(V,Jt))throw new je(L,"Only one doctype is allowed");var Ge=A(V,Zt);if(w&&V.indexOf(Ge)<V.indexOf(w))throw new je(L,"Doctype can only be inserted before an element");if(!w&&Ge)throw new je(L,"Doctype can not be appended since element is present")}}function Ca(v,_,w){var V=v.childNodes||[],oe=_.childNodes||[];if(_.nodeType===$e.DOCUMENT_FRAGMENT_NODE){var Le=oe.filter(Zt);if(Le.length>1||A(oe,ls))throw new je(L,"More than one element or text in fragment");if(Le.length===1&&!us(v,w))throw new je(L,"Element in fragment can not be inserted before doctype")}if(Zt(_)&&!us(v,w))throw new je(L,"Only one element can be added and only after doctype");if(Jt(_)){let $t=function(Gt){return Jt(Gt)&&Gt!==w};var xt=$t;if(A(V,$t))throw new je(L,"Only one doctype is allowed");var Ge=A(V,Zt);if(w&&V.indexOf(Ge)<V.indexOf(w))throw new je(L,"Doctype can only be inserted before an element")}}function cs(v,_,w,V){Ta(v,_,w),v.nodeType===$e.DOCUMENT_NODE&&(V||it)(v,_,w);var oe=_.parentNode;if(oe&&oe.removeChild(_),_.nodeType===ge){var Le=_.firstChild;if(Le==null)return _;var Ge=_.lastChild}else Le=Ge=_;var xt=w?w.previousSibling:v.lastChild;Le.previousSibling=xt,Ge.nextSibling=w,xt?xt.nextSibling=Le:v.firstChild=Le,w==null?v.lastChild=Ge:w.previousSibling=Ge;do Le.parentNode=v;while(Le!==Ge&&(Le=Le.nextSibling));return st(v.ownerDocument||v,v),_.nodeType==ge&&(_.firstChild=_.lastChild=null),_}function xa(v,_){return _.parentNode&&_.parentNode.removeChild(_),_.parentNode=v,_.previousSibling=v.lastChild,_.nextSibling=null,_.previousSibling?_.previousSibling.nextSibling=_:v.firstChild=_,v.lastChild=_,st(v.ownerDocument,v,_),_}pe.prototype={nodeName:"#document",nodeType:xe,doctype:null,documentElement:null,_inc:1,insertBefore:function(v,_){if(v.nodeType==ge){for(var w=v.firstChild;w;){var V=w.nextSibling;this.insertBefore(w,_),w=V}return v}return cs(this,v,_),v.ownerDocument=this,this.documentElement===null&&v.nodeType===Pe&&(this.documentElement=v),v},removeChild:function(v){return this.documentElement==v&&(this.documentElement=null),wi(this,v)},replaceChild:function(v,_){cs(this,v,_,Ca),v.ownerDocument=this,_&&this.removeChild(_),Zt(v)&&(this.documentElement=v)},importNode:function(v,_){return vs(this,v,_)},getElementById:function(v){var _=null;return li(this.documentElement,function(w){if(w.nodeType==Pe&&w.getAttribute("id")==v)return _=w,!0}),_},getElementsByClassName:function(v){var _=he(v);return new _t(this,function(w){var V=[];return _.length>0&&li(w.documentElement,function(oe){if(oe!==w&&oe.nodeType===Pe){var Le=oe.getAttribute("class");if(Le){var Ge=v===Le;if(!Ge){var xt=he(Le);Ge=_.every(fe(xt))}Ge&&V.push(oe)}}}),V})},createElement:function(v){var _=new Di;_.ownerDocument=this,_.nodeName=v,_.tagName=v,_.localName=v,_.childNodes=new Be;var w=_.attributes=new pt;return w._ownerElement=_,_},createDocumentFragment:function(){var v=new ci;return v.ownerDocument=this,v.childNodes=new Be,v},createTextNode:function(v){var _=new mt;return _.ownerDocument=this,_.appendData(v),_},createComment:function(v){var _=new jn;return _.ownerDocument=this,_.appendData(v),_},createCDATASection:function(v){var _=new hs;return _.ownerDocument=this,_.appendData(v),_},createProcessingInstruction:function(v,_){var w=new ki;return w.ownerDocument=this,w.tagName=w.nodeName=w.target=v,w.nodeValue=w.data=_,w},createAttribute:function(v){var _=new ds;return _.ownerDocument=this,_.name=v,_.nodeName=v,_.localName=v,_.specified=!0,_},createEntityReference:function(v){var _=new ps;return _.ownerDocument=this,_.nodeName=v,_},createElementNS:function(v,_){var w=new Di,V=_.split(":"),oe=w.attributes=new pt;return w.childNodes=new Be,w.ownerDocument=this,w.nodeName=_,w.tagName=_,w.namespaceURI=v,V.length==2?(w.prefix=V[0],w.localName=V[1]):w.localName=_,oe._ownerElement=w,w},createAttributeNS:function(v,_){var w=new ds,V=_.split(":");return w.ownerDocument=this,w.nodeName=_,w.name=_,w.namespaceURI=v,w.specified=!0,V.length==2?(w.prefix=V[0],w.localName=V[1]):w.localName=_,w}},ee(pe,$e);function Di(){this._nsMap={}}Di.prototype={nodeType:Pe,hasAttribute:function(v){return this.getAttributeNode(v)!=null},getAttribute:function(v){var _=this.getAttributeNode(v);return _&&_.value||""},getAttributeNode:function(v){return this.attributes.getNamedItem(v)},setAttribute:function(v,_){var w=this.ownerDocument.createAttribute(v);w.value=w.nodeValue=""+_,this.setAttributeNode(w)},removeAttribute:function(v){var _=this.getAttributeNode(v);_&&this.removeAttributeNode(_)},appendChild:function(v){return v.nodeType===ge?this.insertBefore(v,null):xa(this,v)},setAttributeNode:function(v){return this.attributes.setNamedItem(v)},setAttributeNodeNS:function(v){return this.attributes.setNamedItemNS(v)},removeAttributeNode:function(v){return this.attributes.removeNamedItem(v.nodeName)},removeAttributeNS:function(v,_){var w=this.getAttributeNodeNS(v,_);w&&this.removeAttributeNode(w)},hasAttributeNS:function(v,_){return this.getAttributeNodeNS(v,_)!=null},getAttributeNS:function(v,_){var w=this.getAttributeNodeNS(v,_);return w&&w.value||""},setAttributeNS:function(v,_,w){var V=this.ownerDocument.createAttributeNS(v,_);V.value=V.nodeValue=""+w,this.setAttributeNode(V)},getAttributeNodeNS:function(v,_){return this.attributes.getNamedItemNS(v,_)},getElementsByTagName:function(v){return new _t(this,function(_){var w=[];return li(_,function(V){V!==_&&V.nodeType==Pe&&(v==="*"||V.tagName==v)&&w.push(V)}),w})},getElementsByTagNameNS:function(v,_){return new _t(this,function(w){var V=[];return li(w,function(oe){oe!==w&&oe.nodeType===Pe&&(v==="*"||oe.namespaceURI===v)&&(_==="*"||oe.localName==_)&&V.push(oe)}),V})}},pe.prototype.getElementsByTagName=Di.prototype.getElementsByTagName,pe.prototype.getElementsByTagNameNS=Di.prototype.getElementsByTagNameNS,ee(Di,$e);function ds(){}ds.prototype.nodeType=Ve,ee(ds,$e);function qi(){}qi.prototype={data:"",substringData:function(v,_){return this.data.substring(v,v+_)},appendData:function(v){v=this.data+v,this.nodeValue=this.data=v,this.length=v.length},insertData:function(v,_){this.replaceData(v,0,_)},appendChild:function(v){throw new Error(De[L])},deleteData:function(v,_){this.replaceData(v,_,"")},replaceData:function(v,_,w){var V=this.data.substring(0,v),oe=this.data.substring(v+_);w=V+w+oe,this.nodeValue=this.data=w,this.length=w.length}},ee(qi,$e);function mt(){}mt.prototype={nodeName:"#text",nodeType:X,splitText:function(v){var _=this.data,w=_.substring(v);_=_.substring(0,v),this.data=this.nodeValue=_,this.length=_.length;var V=this.ownerDocument.createTextNode(w);return this.parentNode&&this.parentNode.insertBefore(V,this.nextSibling),V}},ee(mt,qi);function jn(){}jn.prototype={nodeName:"#comment",nodeType:ke},ee(jn,qi);function hs(){}hs.prototype={nodeName:"#cdata-section",nodeType:He},ee(hs,qi);function ui(){}ui.prototype.nodeType=Se,ee(ui,$e);function fs(){}fs.prototype.nodeType=_e,ee(fs,$e);function er(){}er.prototype.nodeType=Xe,ee(er,$e);function ps(){}ps.prototype.nodeType=Re,ee(ps,$e);function ci(){}ci.prototype.nodeName="#document-fragment",ci.prototype.nodeType=ge,ee(ci,$e);function ki(){}ki.prototype.nodeType=ae,ee(ki,$e);function tr(){}tr.prototype.serializeToString=function(v,_,w){return ms.call(v,_,w)},$e.prototype.toString=ms;function ms(v,_){var w=[],V=this.nodeType==9&&this.documentElement||this,oe=V.prefix,Le=V.namespaceURI;if(Le&&oe==null){var oe=V.lookupPrefix(Le);if(oe==null)var Ge=[{namespace:Le,prefix:null}]}return vi(this,w,v,_,Ge),w.join("")}function ir(v,_,w){var V=v.prefix||"",oe=v.namespaceURI;if(!oe||V==="xml"&&oe===M.XML||oe===M.XMLNS)return!1;for(var Le=w.length;Le--;){var Ge=w[Le];if(Ge.prefix===V)return Ge.namespace!==oe}return!0}function gs(v,_,w){v.push(" ",_,'="',w.replace(/[<>&"\t\n\r]/g,Et),'"')}function vi(v,_,w,V,oe){if(oe||(oe=[]),V)if(v=V(v),v){if(typeof v=="string"){_.push(v);return}}else return;switch(v.nodeType){case Pe:var Le=v.attributes,Ge=Le.length,St=v.firstChild,xt=v.tagName;w=M.isHTML(v.namespaceURI)||w;var $t=xt;if(!w&&!v.prefix&&v.namespaceURI){for(var Gt,di=0;di<Le.length;di++)if(Le.item(di).name==="xmlns"){Gt=Le.item(di).value;break}if(!Gt)for(var Ii=oe.length-1;Ii>=0;Ii--){var Pi=oe[Ii];if(Pi.prefix===""&&Pi.namespace===v.namespaceURI){Gt=Pi.namespace;break}}if(Gt!==v.namespaceURI)for(var Ii=oe.length-1;Ii>=0;Ii--){var Pi=oe[Ii];if(Pi.namespace===v.namespaceURI){Pi.prefix&&($t=Pi.prefix+":"+xt);break}}}_.push("<",$t);for(var Oi=0;Oi<Ge;Oi++){var ei=Le.item(Oi);ei.prefix=="xmlns"?oe.push({prefix:ei.localName,namespace:ei.value}):ei.nodeName=="xmlns"&&oe.push({prefix:"",namespace:ei.value})}for(var Oi=0;Oi<Ge;Oi++){var ei=Le.item(Oi);if(ir(ei,w,oe)){var Li=ei.prefix||"",sn=ei.namespaceURI;gs(_,Li?"xmlns:"+Li:"xmlns",sn),oe.push({prefix:Li,namespace:sn})}vi(ei,_,w,V,oe)}if(xt===$t&&ir(v,w,oe)){var Li=v.prefix||"",sn=v.namespaceURI;gs(_,Li?"xmlns:"+Li:"xmlns",sn),oe.push({prefix:Li,namespace:sn})}if(St||w&&!/^(?:meta|link|img|br|hr|input)$/i.test(xt)){if(_.push(">"),w&&/^script$/i.test(xt))for(;St;)St.data?_.push(St.data):vi(St,_,w,V,oe.slice()),St=St.nextSibling;else for(;St;)vi(St,_,w,V,oe.slice()),St=St.nextSibling;_.push("</",$t,">")}else _.push("/>");return;case xe:case ge:for(var St=v.firstChild;St;)vi(St,_,w,V,oe.slice()),St=St.nextSibling;return;case Ve:return gs(_,v.name,v.value);case X:return _.push(v.data.replace(/[<&>]/g,Et));case He:return _.push("<![CDATA[",v.data,"]]>");case ke:return _.push("<!--",v.data,"-->");case Se:var sr=v.publicId,Wi=v.systemId;if(_.push("<!DOCTYPE ",v.name),sr)_.push(" PUBLIC ",sr),Wi&&Wi!="."&&_.push(" ",Wi),_.push(">");else if(Wi&&Wi!=".")_.push(" SYSTEM ",Wi,">");else{var As=v.internalSubset;As&&_.push(" [",As,"]"),_.push(">")}return;case ae:return _.push("<?",v.target," ",v.data,"?>");case Re:return _.push("&",v.nodeName,";");default:_.push("??",v.nodeName)}}function vs(v,_,w){var V;switch(_.nodeType){case Pe:V=_.cloneNode(!1),V.ownerDocument=v;case ge:break;case Ve:w=!0;break}if(V||(V=_.cloneNode(!1)),V.ownerDocument=v,V.parentNode=null,w)for(var oe=_.firstChild;oe;)V.appendChild(vs(v,oe,w)),oe=oe.nextSibling;return V}function nn(v,_,w){var V=new _.constructor;for(var oe in _)if(Object.prototype.hasOwnProperty.call(_,oe)){var Le=_[oe];typeof Le!="object"&&Le!=V[oe]&&(V[oe]=Le)}switch(_.childNodes&&(V.childNodes=new Be),V.ownerDocument=v,V.nodeType){case Pe:var Ge=_.attributes,xt=V.attributes=new pt,$t=Ge.length;xt._ownerElement=V;for(var Gt=0;Gt<$t;Gt++)V.setAttributeNode(nn(v,Ge.item(Gt),!0));break;case Ve:w=!0}if(w)for(var di=_.firstChild;di;)V.appendChild(nn(v,di,w)),di=di.nextSibling;return V}function nr(v,_,w){v[_]=w}try{if(Object.defineProperty){let v=function(_){switch(_.nodeType){case Pe:case ge:var w=[];for(_=_.firstChild;_;)_.nodeType!==7&&_.nodeType!==8&&w.push(v(_)),_=_.nextSibling;return w.join("");default:return _.nodeValue}};var _l=v;Object.defineProperty(_t.prototype,"length",{get:function(){return Dt(this),this.$$length}}),Object.defineProperty($e.prototype,"textContent",{get:function(){return v(this)},set:function(_){switch(this.nodeType){case Pe:case ge:for(;this.firstChild;)this.removeChild(this.firstChild);(_||String(_))&&this.appendChild(this.ownerDocument.createTextNode(_));break;default:this.data=_,this.value=_,this.nodeValue=_}}}),nr=function(_,w,V){_["$$"+w]=V}}}catch(v){}re.DocumentType=ui,re.DOMException=je,re.DOMImplementation=Sn,re.Element=Di,re.Node=$e,re.NodeList=Be,re.XMLSerializer=tr},56559:function(ye,re,W){"use strict";var J=W(44582).freeze;re.XML_ENTITIES=J({amp:"&",apos:"'",gt:">",lt:"<",quot:'"'}),re.HTML_ENTITIES=J({Aacute:"\xC1",aacute:"\xE1",Abreve:"\u0102",abreve:"\u0103",ac:"\u223E",acd:"\u223F",acE:"\u223E\u0333",Acirc:"\xC2",acirc:"\xE2",acute:"\xB4",Acy:"\u0410",acy:"\u0430",AElig:"\xC6",aelig:"\xE6",af:"\u2061",Afr:"\u{1D504}",afr:"\u{1D51E}",Agrave:"\xC0",agrave:"\xE0",alefsym:"\u2135",aleph:"\u2135",Alpha:"\u0391",alpha:"\u03B1",Amacr:"\u0100",amacr:"\u0101",amalg:"\u2A3F",AMP:"&",amp:"&",And:"\u2A53",and:"\u2227",andand:"\u2A55",andd:"\u2A5C",andslope:"\u2A58",andv:"\u2A5A",ang:"\u2220",ange:"\u29A4",angle:"\u2220",angmsd:"\u2221",angmsdaa:"\u29A8",angmsdab:"\u29A9",angmsdac:"\u29AA",angmsdad:"\u29AB",angmsdae:"\u29AC",angmsdaf:"\u29AD",angmsdag:"\u29AE",angmsdah:"\u29AF",angrt:"\u221F",angrtvb:"\u22BE",angrtvbd:"\u299D",angsph:"\u2222",angst:"\xC5",angzarr:"\u237C",Aogon:"\u0104",aogon:"\u0105",Aopf:"\u{1D538}",aopf:"\u{1D552}",ap:"\u2248",apacir:"\u2A6F",apE:"\u2A70",ape:"\u224A",apid:"\u224B",apos:"'",ApplyFunction:"\u2061",approx:"\u2248",approxeq:"\u224A",Aring:"\xC5",aring:"\xE5",Ascr:"\u{1D49C}",ascr:"\u{1D4B6}",Assign:"\u2254",ast:"*",asymp:"\u2248",asympeq:"\u224D",Atilde:"\xC3",atilde:"\xE3",Auml:"\xC4",auml:"\xE4",awconint:"\u2233",awint:"\u2A11",backcong:"\u224C",backepsilon:"\u03F6",backprime:"\u2035",backsim:"\u223D",backsimeq:"\u22CD",Backslash:"\u2216",Barv:"\u2AE7",barvee:"\u22BD",Barwed:"\u2306",barwed:"\u2305",barwedge:"\u2305",bbrk:"\u23B5",bbrktbrk:"\u23B6",bcong:"\u224C",Bcy:"\u0411",bcy:"\u0431",bdquo:"\u201E",becaus:"\u2235",Because:"\u2235",because:"\u2235",bemptyv:"\u29B0",bepsi:"\u03F6",bernou:"\u212C",Bernoullis:"\u212C",Beta:"\u0392",beta:"\u03B2",beth:"\u2136",between:"\u226C",Bfr:"\u{1D505}",bfr:"\u{1D51F}",bigcap:"\u22C2",bigcirc:"\u25EF",bigcup:"\u22C3",bigodot:"\u2A00",bigoplus:"\u2A01",bigotimes:"\u2A02",bigsqcup:"\u2A06",bigstar:"\u2605",bigtriangledown:"\u25BD",bigtriangleup:"\u25B3",biguplus:"\u2A04",bigvee:"\u22C1",bigwedge:"\u22C0",bkarow:"\u290D",blacklozenge:"\u29EB",blacksquare:"\u25AA",blacktriangle:"\u25B4",blacktriangledown:"\u25BE",blacktriangleleft:"\u25C2",blacktriangleright:"\u25B8",blank:"\u2423",blk12:"\u2592",blk14:"\u2591",blk34:"\u2593",block:"\u2588",bne:"=\u20E5",bnequiv:"\u2261\u20E5",bNot:"\u2AED",bnot:"\u2310",Bopf:"\u{1D539}",bopf:"\u{1D553}",bot:"\u22A5",bottom:"\u22A5",bowtie:"\u22C8",boxbox:"\u29C9",boxDL:"\u2557",boxDl:"\u2556",boxdL:"\u2555",boxdl:"\u2510",boxDR:"\u2554",boxDr:"\u2553",boxdR:"\u2552",boxdr:"\u250C",boxH:"\u2550",boxh:"\u2500",boxHD:"\u2566",boxHd:"\u2564",boxhD:"\u2565",boxhd:"\u252C",boxHU:"\u2569",boxHu:"\u2567",boxhU:"\u2568",boxhu:"\u2534",boxminus:"\u229F",boxplus:"\u229E",boxtimes:"\u22A0",boxUL:"\u255D",boxUl:"\u255C",boxuL:"\u255B",boxul:"\u2518",boxUR:"\u255A",boxUr:"\u2559",boxuR:"\u2558",boxur:"\u2514",boxV:"\u2551",boxv:"\u2502",boxVH:"\u256C",boxVh:"\u256B",boxvH:"\u256A",boxvh:"\u253C",boxVL:"\u2563",boxVl:"\u2562",boxvL:"\u2561",boxvl:"\u2524",boxVR:"\u2560",boxVr:"\u255F",boxvR:"\u255E",boxvr:"\u251C",bprime:"\u2035",Breve:"\u02D8",breve:"\u02D8",brvbar:"\xA6",Bscr:"\u212C",bscr:"\u{1D4B7}",bsemi:"\u204F",bsim:"\u223D",bsime:"\u22CD",bsol:"\\",bsolb:"\u29C5",bsolhsub:"\u27C8",bull:"\u2022",bullet:"\u2022",bump:"\u224E",bumpE:"\u2AAE",bumpe:"\u224F",Bumpeq:"\u224E",bumpeq:"\u224F",Cacute:"\u0106",cacute:"\u0107",Cap:"\u22D2",cap:"\u2229",capand:"\u2A44",capbrcup:"\u2A49",capcap:"\u2A4B",capcup:"\u2A47",capdot:"\u2A40",CapitalDifferentialD:"\u2145",caps:"\u2229\uFE00",caret:"\u2041",caron:"\u02C7",Cayleys:"\u212D",ccaps:"\u2A4D",Ccaron:"\u010C",ccaron:"\u010D",Ccedil:"\xC7",ccedil:"\xE7",Ccirc:"\u0108",ccirc:"\u0109",Cconint:"\u2230",ccups:"\u2A4C",ccupssm:"\u2A50",Cdot:"\u010A",cdot:"\u010B",cedil:"\xB8",Cedilla:"\xB8",cemptyv:"\u29B2",cent:"\xA2",CenterDot:"\xB7",centerdot:"\xB7",Cfr:"\u212D",cfr:"\u{1D520}",CHcy:"\u0427",chcy:"\u0447",check:"\u2713",checkmark:"\u2713",Chi:"\u03A7",chi:"\u03C7",cir:"\u25CB",circ:"\u02C6",circeq:"\u2257",circlearrowleft:"\u21BA",circlearrowright:"\u21BB",circledast:"\u229B",circledcirc:"\u229A",circleddash:"\u229D",CircleDot:"\u2299",circledR:"\xAE",circledS:"\u24C8",CircleMinus:"\u2296",CirclePlus:"\u2295",CircleTimes:"\u2297",cirE:"\u29C3",cire:"\u2257",cirfnint:"\u2A10",cirmid:"\u2AEF",cirscir:"\u29C2",ClockwiseContourIntegral:"\u2232",CloseCurlyDoubleQuote:"\u201D",CloseCurlyQuote:"\u2019",clubs:"\u2663",clubsuit:"\u2663",Colon:"\u2237",colon:":",Colone:"\u2A74",colone:"\u2254",coloneq:"\u2254",comma:",",commat:"@",comp:"\u2201",compfn:"\u2218",complement:"\u2201",complexes:"\u2102",cong:"\u2245",congdot:"\u2A6D",Congruent:"\u2261",Conint:"\u222F",conint:"\u222E",ContourIntegral:"\u222E",Copf:"\u2102",copf:"\u{1D554}",coprod:"\u2210",Coproduct:"\u2210",COPY:"\xA9",copy:"\xA9",copysr:"\u2117",CounterClockwiseContourIntegral:"\u2233",crarr:"\u21B5",Cross:"\u2A2F",cross:"\u2717",Cscr:"\u{1D49E}",cscr:"\u{1D4B8}",csub:"\u2ACF",csube:"\u2AD1",csup:"\u2AD0",csupe:"\u2AD2",ctdot:"\u22EF",cudarrl:"\u2938",cudarrr:"\u2935",cuepr:"\u22DE",cuesc:"\u22DF",cularr:"\u21B6",cularrp:"\u293D",Cup:"\u22D3",cup:"\u222A",cupbrcap:"\u2A48",CupCap:"\u224D",cupcap:"\u2A46",cupcup:"\u2A4A",cupdot:"\u228D",cupor:"\u2A45",cups:"\u222A\uFE00",curarr:"\u21B7",curarrm:"\u293C",curlyeqprec:"\u22DE",curlyeqsucc:"\u22DF",curlyvee:"\u22CE",curlywedge:"\u22CF",curren:"\xA4",curvearrowleft:"\u21B6",curvearrowright:"\u21B7",cuvee:"\u22CE",cuwed:"\u22CF",cwconint:"\u2232",cwint:"\u2231",cylcty:"\u232D",Dagger:"\u2021",dagger:"\u2020",daleth:"\u2138",Darr:"\u21A1",dArr:"\u21D3",darr:"\u2193",dash:"\u2010",Dashv:"\u2AE4",dashv:"\u22A3",dbkarow:"\u290F",dblac:"\u02DD",Dcaron:"\u010E",dcaron:"\u010F",Dcy:"\u0414",dcy:"\u0434",DD:"\u2145",dd:"\u2146",ddagger:"\u2021",ddarr:"\u21CA",DDotrahd:"\u2911",ddotseq:"\u2A77",deg:"\xB0",Del:"\u2207",Delta:"\u0394",delta:"\u03B4",demptyv:"\u29B1",dfisht:"\u297F",Dfr:"\u{1D507}",dfr:"\u{1D521}",dHar:"\u2965",dharl:"\u21C3",dharr:"\u21C2",DiacriticalAcute:"\xB4",DiacriticalDot:"\u02D9",DiacriticalDoubleAcute:"\u02DD",DiacriticalGrave:"`",DiacriticalTilde:"\u02DC",diam:"\u22C4",Diamond:"\u22C4",diamond:"\u22C4",diamondsuit:"\u2666",diams:"\u2666",die:"\xA8",DifferentialD:"\u2146",digamma:"\u03DD",disin:"\u22F2",div:"\xF7",divide:"\xF7",divideontimes:"\u22C7",divonx:"\u22C7",DJcy:"\u0402",djcy:"\u0452",dlcorn:"\u231E",dlcrop:"\u230D",dollar:"$",Dopf:"\u{1D53B}",dopf:"\u{1D555}",Dot:"\xA8",dot:"\u02D9",DotDot:"\u20DC",doteq:"\u2250",doteqdot:"\u2251",DotEqual:"\u2250",dotminus:"\u2238",dotplus:"\u2214",dotsquare:"\u22A1",doublebarwedge:"\u2306",DoubleContourIntegral:"\u222F",DoubleDot:"\xA8",DoubleDownArrow:"\u21D3",DoubleLeftArrow:"\u21D0",DoubleLeftRightArrow:"\u21D4",DoubleLeftTee:"\u2AE4",DoubleLongLeftArrow:"\u27F8",DoubleLongLeftRightArrow:"\u27FA",DoubleLongRightArrow:"\u27F9",DoubleRightArrow:"\u21D2",DoubleRightTee:"\u22A8",DoubleUpArrow:"\u21D1",DoubleUpDownArrow:"\u21D5",DoubleVerticalBar:"\u2225",DownArrow:"\u2193",Downarrow:"\u21D3",downarrow:"\u2193",DownArrowBar:"\u2913",DownArrowUpArrow:"\u21F5",DownBreve:"\u0311",downdownarrows:"\u21CA",downharpoonleft:"\u21C3",downharpoonright:"\u21C2",DownLeftRightVector:"\u2950",DownLeftTeeVector:"\u295E",DownLeftVector:"\u21BD",DownLeftVectorBar:"\u2956",DownRightTeeVector:"\u295F",DownRightVector:"\u21C1",DownRightVectorBar:"\u2957",DownTee:"\u22A4",DownTeeArrow:"\u21A7",drbkarow:"\u2910",drcorn:"\u231F",drcrop:"\u230C",Dscr:"\u{1D49F}",dscr:"\u{1D4B9}",DScy:"\u0405",dscy:"\u0455",dsol:"\u29F6",Dstrok:"\u0110",dstrok:"\u0111",dtdot:"\u22F1",dtri:"\u25BF",dtrif:"\u25BE",duarr:"\u21F5",duhar:"\u296F",dwangle:"\u29A6",DZcy:"\u040F",dzcy:"\u045F",dzigrarr:"\u27FF",Eacute:"\xC9",eacute:"\xE9",easter:"\u2A6E",Ecaron:"\u011A",ecaron:"\u011B",ecir:"\u2256",Ecirc:"\xCA",ecirc:"\xEA",ecolon:"\u2255",Ecy:"\u042D",ecy:"\u044D",eDDot:"\u2A77",Edot:"\u0116",eDot:"\u2251",edot:"\u0117",ee:"\u2147",efDot:"\u2252",Efr:"\u{1D508}",efr:"\u{1D522}",eg:"\u2A9A",Egrave:"\xC8",egrave:"\xE8",egs:"\u2A96",egsdot:"\u2A98",el:"\u2A99",Element:"\u2208",elinters:"\u23E7",ell:"\u2113",els:"\u2A95",elsdot:"\u2A97",Emacr:"\u0112",emacr:"\u0113",empty:"\u2205",emptyset:"\u2205",EmptySmallSquare:"\u25FB",emptyv:"\u2205",EmptyVerySmallSquare:"\u25AB",emsp:"\u2003",emsp13:"\u2004",emsp14:"\u2005",ENG:"\u014A",eng:"\u014B",ensp:"\u2002",Eogon:"\u0118",eogon:"\u0119",Eopf:"\u{1D53C}",eopf:"\u{1D556}",epar:"\u22D5",eparsl:"\u29E3",eplus:"\u2A71",epsi:"\u03B5",Epsilon:"\u0395",epsilon:"\u03B5",epsiv:"\u03F5",eqcirc:"\u2256",eqcolon:"\u2255",eqsim:"\u2242",eqslantgtr:"\u2A96",eqslantless:"\u2A95",Equal:"\u2A75",equals:"=",EqualTilde:"\u2242",equest:"\u225F",Equilibrium:"\u21CC",equiv:"\u2261",equivDD:"\u2A78",eqvparsl:"\u29E5",erarr:"\u2971",erDot:"\u2253",Escr:"\u2130",escr:"\u212F",esdot:"\u2250",Esim:"\u2A73",esim:"\u2242",Eta:"\u0397",eta:"\u03B7",ETH:"\xD0",eth:"\xF0",Euml:"\xCB",euml:"\xEB",euro:"\u20AC",excl:"!",exist:"\u2203",Exists:"\u2203",expectation:"\u2130",ExponentialE:"\u2147",exponentiale:"\u2147",fallingdotseq:"\u2252",Fcy:"\u0424",fcy:"\u0444",female:"\u2640",ffilig:"\uFB03",fflig:"\uFB00",ffllig:"\uFB04",Ffr:"\u{1D509}",ffr:"\u{1D523}",filig:"\uFB01",FilledSmallSquare:"\u25FC",FilledVerySmallSquare:"\u25AA",fjlig:"fj",flat:"\u266D",fllig:"\uFB02",fltns:"\u25B1",fnof:"\u0192",Fopf:"\u{1D53D}",fopf:"\u{1D557}",ForAll:"\u2200",forall:"\u2200",fork:"\u22D4",forkv:"\u2AD9",Fouriertrf:"\u2131",fpartint:"\u2A0D",frac12:"\xBD",frac13:"\u2153",frac14:"\xBC",frac15:"\u2155",frac16:"\u2159",frac18:"\u215B",frac23:"\u2154",frac25:"\u2156",frac34:"\xBE",frac35:"\u2157",frac38:"\u215C",frac45:"\u2158",frac56:"\u215A",frac58:"\u215D",frac78:"\u215E",frasl:"\u2044",frown:"\u2322",Fscr:"\u2131",fscr:"\u{1D4BB}",gacute:"\u01F5",Gamma:"\u0393",gamma:"\u03B3",Gammad:"\u03DC",gammad:"\u03DD",gap:"\u2A86",Gbreve:"\u011E",gbreve:"\u011F",Gcedil:"\u0122",Gcirc:"\u011C",gcirc:"\u011D",Gcy:"\u0413",gcy:"\u0433",Gdot:"\u0120",gdot:"\u0121",gE:"\u2267",ge:"\u2265",gEl:"\u2A8C",gel:"\u22DB",geq:"\u2265",geqq:"\u2267",geqslant:"\u2A7E",ges:"\u2A7E",gescc:"\u2AA9",gesdot:"\u2A80",gesdoto:"\u2A82",gesdotol:"\u2A84",gesl:"\u22DB\uFE00",gesles:"\u2A94",Gfr:"\u{1D50A}",gfr:"\u{1D524}",Gg:"\u22D9",gg:"\u226B",ggg:"\u22D9",gimel:"\u2137",GJcy:"\u0403",gjcy:"\u0453",gl:"\u2277",gla:"\u2AA5",glE:"\u2A92",glj:"\u2AA4",gnap:"\u2A8A",gnapprox:"\u2A8A",gnE:"\u2269",gne:"\u2A88",gneq:"\u2A88",gneqq:"\u2269",gnsim:"\u22E7",Gopf:"\u{1D53E}",gopf:"\u{1D558}",grave:"`",GreaterEqual:"\u2265",GreaterEqualLess:"\u22DB",GreaterFullEqual:"\u2267",GreaterGreater:"\u2AA2",GreaterLess:"\u2277",GreaterSlantEqual:"\u2A7E",GreaterTilde:"\u2273",Gscr:"\u{1D4A2}",gscr:"\u210A",gsim:"\u2273",gsime:"\u2A8E",gsiml:"\u2A90",Gt:"\u226B",GT:">",gt:">",gtcc:"\u2AA7",gtcir:"\u2A7A",gtdot:"\u22D7",gtlPar:"\u2995",gtquest:"\u2A7C",gtrapprox:"\u2A86",gtrarr:"\u2978",gtrdot:"\u22D7",gtreqless:"\u22DB",gtreqqless:"\u2A8C",gtrless:"\u2277",gtrsim:"\u2273",gvertneqq:"\u2269\uFE00",gvnE:"\u2269\uFE00",Hacek:"\u02C7",hairsp:"\u200A",half:"\xBD",hamilt:"\u210B",HARDcy:"\u042A",hardcy:"\u044A",hArr:"\u21D4",harr:"\u2194",harrcir:"\u2948",harrw:"\u21AD",Hat:"^",hbar:"\u210F",Hcirc:"\u0124",hcirc:"\u0125",hearts:"\u2665",heartsuit:"\u2665",hellip:"\u2026",hercon:"\u22B9",Hfr:"\u210C",hfr:"\u{1D525}",HilbertSpace:"\u210B",hksearow:"\u2925",hkswarow:"\u2926",hoarr:"\u21FF",homtht:"\u223B",hookleftarrow:"\u21A9",hookrightarrow:"\u21AA",Hopf:"\u210D",hopf:"\u{1D559}",horbar:"\u2015",HorizontalLine:"\u2500",Hscr:"\u210B",hscr:"\u{1D4BD}",hslash:"\u210F",Hstrok:"\u0126",hstrok:"\u0127",HumpDownHump:"\u224E",HumpEqual:"\u224F",hybull:"\u2043",hyphen:"\u2010",Iacute:"\xCD",iacute:"\xED",ic:"\u2063",Icirc:"\xCE",icirc:"\xEE",Icy:"\u0418",icy:"\u0438",Idot:"\u0130",IEcy:"\u0415",iecy:"\u0435",iexcl:"\xA1",iff:"\u21D4",Ifr:"\u2111",ifr:"\u{1D526}",Igrave:"\xCC",igrave:"\xEC",ii:"\u2148",iiiint:"\u2A0C",iiint:"\u222D",iinfin:"\u29DC",iiota:"\u2129",IJlig:"\u0132",ijlig:"\u0133",Im:"\u2111",Imacr:"\u012A",imacr:"\u012B",image:"\u2111",ImaginaryI:"\u2148",imagline:"\u2110",imagpart:"\u2111",imath:"\u0131",imof:"\u22B7",imped:"\u01B5",Implies:"\u21D2",in:"\u2208",incare:"\u2105",infin:"\u221E",infintie:"\u29DD",inodot:"\u0131",Int:"\u222C",int:"\u222B",intcal:"\u22BA",integers:"\u2124",Integral:"\u222B",intercal:"\u22BA",Intersection:"\u22C2",intlarhk:"\u2A17",intprod:"\u2A3C",InvisibleComma:"\u2063",InvisibleTimes:"\u2062",IOcy:"\u0401",iocy:"\u0451",Iogon:"\u012E",iogon:"\u012F",Iopf:"\u{1D540}",iopf:"\u{1D55A}",Iota:"\u0399",iota:"\u03B9",iprod:"\u2A3C",iquest:"\xBF",Iscr:"\u2110",iscr:"\u{1D4BE}",isin:"\u2208",isindot:"\u22F5",isinE:"\u22F9",isins:"\u22F4",isinsv:"\u22F3",isinv:"\u2208",it:"\u2062",Itilde:"\u0128",itilde:"\u0129",Iukcy:"\u0406",iukcy:"\u0456",Iuml:"\xCF",iuml:"\xEF",Jcirc:"\u0134",jcirc:"\u0135",Jcy:"\u0419",jcy:"\u0439",Jfr:"\u{1D50D}",jfr:"\u{1D527}",jmath:"\u0237",Jopf:"\u{1D541}",jopf:"\u{1D55B}",Jscr:"\u{1D4A5}",jscr:"\u{1D4BF}",Jsercy:"\u0408",jsercy:"\u0458",Jukcy:"\u0404",jukcy:"\u0454",Kappa:"\u039A",kappa:"\u03BA",kappav:"\u03F0",Kcedil:"\u0136",kcedil:"\u0137",Kcy:"\u041A",kcy:"\u043A",Kfr:"\u{1D50E}",kfr:"\u{1D528}",kgreen:"\u0138",KHcy:"\u0425",khcy:"\u0445",KJcy:"\u040C",kjcy:"\u045C",Kopf:"\u{1D542}",kopf:"\u{1D55C}",Kscr:"\u{1D4A6}",kscr:"\u{1D4C0}",lAarr:"\u21DA",Lacute:"\u0139",lacute:"\u013A",laemptyv:"\u29B4",lagran:"\u2112",Lambda:"\u039B",lambda:"\u03BB",Lang:"\u27EA",lang:"\u27E8",langd:"\u2991",langle:"\u27E8",lap:"\u2A85",Laplacetrf:"\u2112",laquo:"\xAB",Larr:"\u219E",lArr:"\u21D0",larr:"\u2190",larrb:"\u21E4",larrbfs:"\u291F",larrfs:"\u291D",larrhk:"\u21A9",larrlp:"\u21AB",larrpl:"\u2939",larrsim:"\u2973",larrtl:"\u21A2",lat:"\u2AAB",lAtail:"\u291B",latail:"\u2919",late:"\u2AAD",lates:"\u2AAD\uFE00",lBarr:"\u290E",lbarr:"\u290C",lbbrk:"\u2772",lbrace:"{",lbrack:"[",lbrke:"\u298B",lbrksld:"\u298F",lbrkslu:"\u298D",Lcaron:"\u013D",lcaron:"\u013E",Lcedil:"\u013B",lcedil:"\u013C",lceil:"\u2308",lcub:"{",Lcy:"\u041B",lcy:"\u043B",ldca:"\u2936",ldquo:"\u201C",ldquor:"\u201E",ldrdhar:"\u2967",ldrushar:"\u294B",ldsh:"\u21B2",lE:"\u2266",le:"\u2264",LeftAngleBracket:"\u27E8",LeftArrow:"\u2190",Leftarrow:"\u21D0",leftarrow:"\u2190",LeftArrowBar:"\u21E4",LeftArrowRightArrow:"\u21C6",leftarrowtail:"\u21A2",LeftCeiling:"\u2308",LeftDoubleBracket:"\u27E6",LeftDownTeeVector:"\u2961",LeftDownVector:"\u21C3",LeftDownVectorBar:"\u2959",LeftFloor:"\u230A",leftharpoondown:"\u21BD",leftharpoonup:"\u21BC",leftleftarrows:"\u21C7",LeftRightArrow:"\u2194",Leftrightarrow:"\u21D4",leftrightarrow:"\u2194",leftrightarrows:"\u21C6",leftrightharpoons:"\u21CB",leftrightsquigarrow:"\u21AD",LeftRightVector:"\u294E",LeftTee:"\u22A3",LeftTeeArrow:"\u21A4",LeftTeeVector:"\u295A",leftthreetimes:"\u22CB",LeftTriangle:"\u22B2",LeftTriangleBar:"\u29CF",LeftTriangleEqual:"\u22B4",LeftUpDownVector:"\u2951",LeftUpTeeVector:"\u2960",LeftUpVector:"\u21BF",LeftUpVectorBar:"\u2958",LeftVector:"\u21BC",LeftVectorBar:"\u2952",lEg:"\u2A8B",leg:"\u22DA",leq:"\u2264",leqq:"\u2266",leqslant:"\u2A7D",les:"\u2A7D",lescc:"\u2AA8",lesdot:"\u2A7F",lesdoto:"\u2A81",lesdotor:"\u2A83",lesg:"\u22DA\uFE00",lesges:"\u2A93",lessapprox:"\u2A85",lessdot:"\u22D6",lesseqgtr:"\u22DA",lesseqqgtr:"\u2A8B",LessEqualGreater:"\u22DA",LessFullEqual:"\u2266",LessGreater:"\u2276",lessgtr:"\u2276",LessLess:"\u2AA1",lesssim:"\u2272",LessSlantEqual:"\u2A7D",LessTilde:"\u2272",lfisht:"\u297C",lfloor:"\u230A",Lfr:"\u{1D50F}",lfr:"\u{1D529}",lg:"\u2276",lgE:"\u2A91",lHar:"\u2962",lhard:"\u21BD",lharu:"\u21BC",lharul:"\u296A",lhblk:"\u2584",LJcy:"\u0409",ljcy:"\u0459",Ll:"\u22D8",ll:"\u226A",llarr:"\u21C7",llcorner:"\u231E",Lleftarrow:"\u21DA",llhard:"\u296B",lltri:"\u25FA",Lmidot:"\u013F",lmidot:"\u0140",lmoust:"\u23B0",lmoustache:"\u23B0",lnap:"\u2A89",lnapprox:"\u2A89",lnE:"\u2268",lne:"\u2A87",lneq:"\u2A87",lneqq:"\u2268",lnsim:"\u22E6",loang:"\u27EC",loarr:"\u21FD",lobrk:"\u27E6",LongLeftArrow:"\u27F5",Longleftarrow:"\u27F8",longleftarrow:"\u27F5",LongLeftRightArrow:"\u27F7",Longleftrightarrow:"\u27FA",longleftrightarrow:"\u27F7",longmapsto:"\u27FC",LongRightArrow:"\u27F6",Longrightarrow:"\u27F9",longrightarrow:"\u27F6",looparrowleft:"\u21AB",looparrowright:"\u21AC",lopar:"\u2985",Lopf:"\u{1D543}",lopf:"\u{1D55D}",loplus:"\u2A2D",lotimes:"\u2A34",lowast:"\u2217",lowbar:"_",LowerLeftArrow:"\u2199",LowerRightArrow:"\u2198",loz:"\u25CA",lozenge:"\u25CA",lozf:"\u29EB",lpar:"(",lparlt:"\u2993",lrarr:"\u21C6",lrcorner:"\u231F",lrhar:"\u21CB",lrhard:"\u296D",lrm:"\u200E",lrtri:"\u22BF",lsaquo:"\u2039",Lscr:"\u2112",lscr:"\u{1D4C1}",Lsh:"\u21B0",lsh:"\u21B0",lsim:"\u2272",lsime:"\u2A8D",lsimg:"\u2A8F",lsqb:"[",lsquo:"\u2018",lsquor:"\u201A",Lstrok:"\u0141",lstrok:"\u0142",Lt:"\u226A",LT:"<",lt:"<",ltcc:"\u2AA6",ltcir:"\u2A79",ltdot:"\u22D6",lthree:"\u22CB",ltimes:"\u22C9",ltlarr:"\u2976",ltquest:"\u2A7B",ltri:"\u25C3",ltrie:"\u22B4",ltrif:"\u25C2",ltrPar:"\u2996",lurdshar:"\u294A",luruhar:"\u2966",lvertneqq:"\u2268\uFE00",lvnE:"\u2268\uFE00",macr:"\xAF",male:"\u2642",malt:"\u2720",maltese:"\u2720",Map:"\u2905",map:"\u21A6",mapsto:"\u21A6",mapstodown:"\u21A7",mapstoleft:"\u21A4",mapstoup:"\u21A5",marker:"\u25AE",mcomma:"\u2A29",Mcy:"\u041C",mcy:"\u043C",mdash:"\u2014",mDDot:"\u223A",measuredangle:"\u2221",MediumSpace:"\u205F",Mellintrf:"\u2133",Mfr:"\u{1D510}",mfr:"\u{1D52A}",mho:"\u2127",micro:"\xB5",mid:"\u2223",midast:"*",midcir:"\u2AF0",middot:"\xB7",minus:"\u2212",minusb:"\u229F",minusd:"\u2238",minusdu:"\u2A2A",MinusPlus:"\u2213",mlcp:"\u2ADB",mldr:"\u2026",mnplus:"\u2213",models:"\u22A7",Mopf:"\u{1D544}",mopf:"\u{1D55E}",mp:"\u2213",Mscr:"\u2133",mscr:"\u{1D4C2}",mstpos:"\u223E",Mu:"\u039C",mu:"\u03BC",multimap:"\u22B8",mumap:"\u22B8",nabla:"\u2207",Nacute:"\u0143",nacute:"\u0144",nang:"\u2220\u20D2",nap:"\u2249",napE:"\u2A70\u0338",napid:"\u224B\u0338",napos:"\u0149",napprox:"\u2249",natur:"\u266E",natural:"\u266E",naturals:"\u2115",nbsp:"\xA0",nbump:"\u224E\u0338",nbumpe:"\u224F\u0338",ncap:"\u2A43",Ncaron:"\u0147",ncaron:"\u0148",Ncedil:"\u0145",ncedil:"\u0146",ncong:"\u2247",ncongdot:"\u2A6D\u0338",ncup:"\u2A42",Ncy:"\u041D",ncy:"\u043D",ndash:"\u2013",ne:"\u2260",nearhk:"\u2924",neArr:"\u21D7",nearr:"\u2197",nearrow:"\u2197",nedot:"\u2250\u0338",NegativeMediumSpace:"\u200B",NegativeThickSpace:"\u200B",NegativeThinSpace:"\u200B",NegativeVeryThinSpace:"\u200B",nequiv:"\u2262",nesear:"\u2928",nesim:"\u2242\u0338",NestedGreaterGreater:"\u226B",NestedLessLess:"\u226A",NewLine:`
`,nexist:"\u2204",nexists:"\u2204",Nfr:"\u{1D511}",nfr:"\u{1D52B}",ngE:"\u2267\u0338",nge:"\u2271",ngeq:"\u2271",ngeqq:"\u2267\u0338",ngeqslant:"\u2A7E\u0338",nges:"\u2A7E\u0338",nGg:"\u22D9\u0338",ngsim:"\u2275",nGt:"\u226B\u20D2",ngt:"\u226F",ngtr:"\u226F",nGtv:"\u226B\u0338",nhArr:"\u21CE",nharr:"\u21AE",nhpar:"\u2AF2",ni:"\u220B",nis:"\u22FC",nisd:"\u22FA",niv:"\u220B",NJcy:"\u040A",njcy:"\u045A",nlArr:"\u21CD",nlarr:"\u219A",nldr:"\u2025",nlE:"\u2266\u0338",nle:"\u2270",nLeftarrow:"\u21CD",nleftarrow:"\u219A",nLeftrightarrow:"\u21CE",nleftrightarrow:"\u21AE",nleq:"\u2270",nleqq:"\u2266\u0338",nleqslant:"\u2A7D\u0338",nles:"\u2A7D\u0338",nless:"\u226E",nLl:"\u22D8\u0338",nlsim:"\u2274",nLt:"\u226A\u20D2",nlt:"\u226E",nltri:"\u22EA",nltrie:"\u22EC",nLtv:"\u226A\u0338",nmid:"\u2224",NoBreak:"\u2060",NonBreakingSpace:"\xA0",Nopf:"\u2115",nopf:"\u{1D55F}",Not:"\u2AEC",not:"\xAC",NotCongruent:"\u2262",NotCupCap:"\u226D",NotDoubleVerticalBar:"\u2226",NotElement:"\u2209",NotEqual:"\u2260",NotEqualTilde:"\u2242\u0338",NotExists:"\u2204",NotGreater:"\u226F",NotGreaterEqual:"\u2271",NotGreaterFullEqual:"\u2267\u0338",NotGreaterGreater:"\u226B\u0338",NotGreaterLess:"\u2279",NotGreaterSlantEqual:"\u2A7E\u0338",NotGreaterTilde:"\u2275",NotHumpDownHump:"\u224E\u0338",NotHumpEqual:"\u224F\u0338",notin:"\u2209",notindot:"\u22F5\u0338",notinE:"\u22F9\u0338",notinva:"\u2209",notinvb:"\u22F7",notinvc:"\u22F6",NotLeftTriangle:"\u22EA",NotLeftTriangleBar:"\u29CF\u0338",NotLeftTriangleEqual:"\u22EC",NotLess:"\u226E",NotLessEqual:"\u2270",NotLessGreater:"\u2278",NotLessLess:"\u226A\u0338",NotLessSlantEqual:"\u2A7D\u0338",NotLessTilde:"\u2274",NotNestedGreaterGreater:"\u2AA2\u0338",NotNestedLessLess:"\u2AA1\u0338",notni:"\u220C",notniva:"\u220C",notnivb:"\u22FE",notnivc:"\u22FD",NotPrecedes:"\u2280",NotPrecedesEqual:"\u2AAF\u0338",NotPrecedesSlantEqual:"\u22E0",NotReverseElement:"\u220C",NotRightTriangle:"\u22EB",NotRightTriangleBar:"\u29D0\u0338",NotRightTriangleEqual:"\u22ED",NotSquareSubset:"\u228F\u0338",NotSquareSubsetEqual:"\u22E2",NotSquareSuperset:"\u2290\u0338",NotSquareSupersetEqual:"\u22E3",NotSubset:"\u2282\u20D2",NotSubsetEqual:"\u2288",NotSucceeds:"\u2281",NotSucceedsEqual:"\u2AB0\u0338",NotSucceedsSlantEqual:"\u22E1",NotSucceedsTilde:"\u227F\u0338",NotSuperset:"\u2283\u20D2",NotSupersetEqual:"\u2289",NotTilde:"\u2241",NotTildeEqual:"\u2244",NotTildeFullEqual:"\u2247",NotTildeTilde:"\u2249",NotVerticalBar:"\u2224",npar:"\u2226",nparallel:"\u2226",nparsl:"\u2AFD\u20E5",npart:"\u2202\u0338",npolint:"\u2A14",npr:"\u2280",nprcue:"\u22E0",npre:"\u2AAF\u0338",nprec:"\u2280",npreceq:"\u2AAF\u0338",nrArr:"\u21CF",nrarr:"\u219B",nrarrc:"\u2933\u0338",nrarrw:"\u219D\u0338",nRightarrow:"\u21CF",nrightarrow:"\u219B",nrtri:"\u22EB",nrtrie:"\u22ED",nsc:"\u2281",nsccue:"\u22E1",nsce:"\u2AB0\u0338",Nscr:"\u{1D4A9}",nscr:"\u{1D4C3}",nshortmid:"\u2224",nshortparallel:"\u2226",nsim:"\u2241",nsime:"\u2244",nsimeq:"\u2244",nsmid:"\u2224",nspar:"\u2226",nsqsube:"\u22E2",nsqsupe:"\u22E3",nsub:"\u2284",nsubE:"\u2AC5\u0338",nsube:"\u2288",nsubset:"\u2282\u20D2",nsubseteq:"\u2288",nsubseteqq:"\u2AC5\u0338",nsucc:"\u2281",nsucceq:"\u2AB0\u0338",nsup:"\u2285",nsupE:"\u2AC6\u0338",nsupe:"\u2289",nsupset:"\u2283\u20D2",nsupseteq:"\u2289",nsupseteqq:"\u2AC6\u0338",ntgl:"\u2279",Ntilde:"\xD1",ntilde:"\xF1",ntlg:"\u2278",ntriangleleft:"\u22EA",ntrianglelefteq:"\u22EC",ntriangleright:"\u22EB",ntrianglerighteq:"\u22ED",Nu:"\u039D",nu:"\u03BD",num:"#",numero:"\u2116",numsp:"\u2007",nvap:"\u224D\u20D2",nVDash:"\u22AF",nVdash:"\u22AE",nvDash:"\u22AD",nvdash:"\u22AC",nvge:"\u2265\u20D2",nvgt:">\u20D2",nvHarr:"\u2904",nvinfin:"\u29DE",nvlArr:"\u2902",nvle:"\u2264\u20D2",nvlt:"<\u20D2",nvltrie:"\u22B4\u20D2",nvrArr:"\u2903",nvrtrie:"\u22B5\u20D2",nvsim:"\u223C\u20D2",nwarhk:"\u2923",nwArr:"\u21D6",nwarr:"\u2196",nwarrow:"\u2196",nwnear:"\u2927",Oacute:"\xD3",oacute:"\xF3",oast:"\u229B",ocir:"\u229A",Ocirc:"\xD4",ocirc:"\xF4",Ocy:"\u041E",ocy:"\u043E",odash:"\u229D",Odblac:"\u0150",odblac:"\u0151",odiv:"\u2A38",odot:"\u2299",odsold:"\u29BC",OElig:"\u0152",oelig:"\u0153",ofcir:"\u29BF",Ofr:"\u{1D512}",ofr:"\u{1D52C}",ogon:"\u02DB",Ograve:"\xD2",ograve:"\xF2",ogt:"\u29C1",ohbar:"\u29B5",ohm:"\u03A9",oint:"\u222E",olarr:"\u21BA",olcir:"\u29BE",olcross:"\u29BB",oline:"\u203E",olt:"\u29C0",Omacr:"\u014C",omacr:"\u014D",Omega:"\u03A9",omega:"\u03C9",Omicron:"\u039F",omicron:"\u03BF",omid:"\u29B6",ominus:"\u2296",Oopf:"\u{1D546}",oopf:"\u{1D560}",opar:"\u29B7",OpenCurlyDoubleQuote:"\u201C",OpenCurlyQuote:"\u2018",operp:"\u29B9",oplus:"\u2295",Or:"\u2A54",or:"\u2228",orarr:"\u21BB",ord:"\u2A5D",order:"\u2134",orderof:"\u2134",ordf:"\xAA",ordm:"\xBA",origof:"\u22B6",oror:"\u2A56",orslope:"\u2A57",orv:"\u2A5B",oS:"\u24C8",Oscr:"\u{1D4AA}",oscr:"\u2134",Oslash:"\xD8",oslash:"\xF8",osol:"\u2298",Otilde:"\xD5",otilde:"\xF5",Otimes:"\u2A37",otimes:"\u2297",otimesas:"\u2A36",Ouml:"\xD6",ouml:"\xF6",ovbar:"\u233D",OverBar:"\u203E",OverBrace:"\u23DE",OverBracket:"\u23B4",OverParenthesis:"\u23DC",par:"\u2225",para:"\xB6",parallel:"\u2225",parsim:"\u2AF3",parsl:"\u2AFD",part:"\u2202",PartialD:"\u2202",Pcy:"\u041F",pcy:"\u043F",percnt:"%",period:".",permil:"\u2030",perp:"\u22A5",pertenk:"\u2031",Pfr:"\u{1D513}",pfr:"\u{1D52D}",Phi:"\u03A6",phi:"\u03C6",phiv:"\u03D5",phmmat:"\u2133",phone:"\u260E",Pi:"\u03A0",pi:"\u03C0",pitchfork:"\u22D4",piv:"\u03D6",planck:"\u210F",planckh:"\u210E",plankv:"\u210F",plus:"+",plusacir:"\u2A23",plusb:"\u229E",pluscir:"\u2A22",plusdo:"\u2214",plusdu:"\u2A25",pluse:"\u2A72",PlusMinus:"\xB1",plusmn:"\xB1",plussim:"\u2A26",plustwo:"\u2A27",pm:"\xB1",Poincareplane:"\u210C",pointint:"\u2A15",Popf:"\u2119",popf:"\u{1D561}",pound:"\xA3",Pr:"\u2ABB",pr:"\u227A",prap:"\u2AB7",prcue:"\u227C",prE:"\u2AB3",pre:"\u2AAF",prec:"\u227A",precapprox:"\u2AB7",preccurlyeq:"\u227C",Precedes:"\u227A",PrecedesEqual:"\u2AAF",PrecedesSlantEqual:"\u227C",PrecedesTilde:"\u227E",preceq:"\u2AAF",precnapprox:"\u2AB9",precneqq:"\u2AB5",precnsim:"\u22E8",precsim:"\u227E",Prime:"\u2033",prime:"\u2032",primes:"\u2119",prnap:"\u2AB9",prnE:"\u2AB5",prnsim:"\u22E8",prod:"\u220F",Product:"\u220F",profalar:"\u232E",profline:"\u2312",profsurf:"\u2313",prop:"\u221D",Proportion:"\u2237",Proportional:"\u221D",propto:"\u221D",prsim:"\u227E",prurel:"\u22B0",Pscr:"\u{1D4AB}",pscr:"\u{1D4C5}",Psi:"\u03A8",psi:"\u03C8",puncsp:"\u2008",Qfr:"\u{1D514}",qfr:"\u{1D52E}",qint:"\u2A0C",Qopf:"\u211A",qopf:"\u{1D562}",qprime:"\u2057",Qscr:"\u{1D4AC}",qscr:"\u{1D4C6}",quaternions:"\u210D",quatint:"\u2A16",quest:"?",questeq:"\u225F",QUOT:'"',quot:'"',rAarr:"\u21DB",race:"\u223D\u0331",Racute:"\u0154",racute:"\u0155",radic:"\u221A",raemptyv:"\u29B3",Rang:"\u27EB",rang:"\u27E9",rangd:"\u2992",range:"\u29A5",rangle:"\u27E9",raquo:"\xBB",Rarr:"\u21A0",rArr:"\u21D2",rarr:"\u2192",rarrap:"\u2975",rarrb:"\u21E5",rarrbfs:"\u2920",rarrc:"\u2933",rarrfs:"\u291E",rarrhk:"\u21AA",rarrlp:"\u21AC",rarrpl:"\u2945",rarrsim:"\u2974",Rarrtl:"\u2916",rarrtl:"\u21A3",rarrw:"\u219D",rAtail:"\u291C",ratail:"\u291A",ratio:"\u2236",rationals:"\u211A",RBarr:"\u2910",rBarr:"\u290F",rbarr:"\u290D",rbbrk:"\u2773",rbrace:"}",rbrack:"]",rbrke:"\u298C",rbrksld:"\u298E",rbrkslu:"\u2990",Rcaron:"\u0158",rcaron:"\u0159",Rcedil:"\u0156",rcedil:"\u0157",rceil:"\u2309",rcub:"}",Rcy:"\u0420",rcy:"\u0440",rdca:"\u2937",rdldhar:"\u2969",rdquo:"\u201D",rdquor:"\u201D",rdsh:"\u21B3",Re:"\u211C",real:"\u211C",realine:"\u211B",realpart:"\u211C",reals:"\u211D",rect:"\u25AD",REG:"\xAE",reg:"\xAE",ReverseElement:"\u220B",ReverseEquilibrium:"\u21CB",ReverseUpEquilibrium:"\u296F",rfisht:"\u297D",rfloor:"\u230B",Rfr:"\u211C",rfr:"\u{1D52F}",rHar:"\u2964",rhard:"\u21C1",rharu:"\u21C0",rharul:"\u296C",Rho:"\u03A1",rho:"\u03C1",rhov:"\u03F1",RightAngleBracket:"\u27E9",RightArrow:"\u2192",Rightarrow:"\u21D2",rightarrow:"\u2192",RightArrowBar:"\u21E5",RightArrowLeftArrow:"\u21C4",rightarrowtail:"\u21A3",RightCeiling:"\u2309",RightDoubleBracket:"\u27E7",RightDownTeeVector:"\u295D",RightDownVector:"\u21C2",RightDownVectorBar:"\u2955",RightFloor:"\u230B",rightharpoondown:"\u21C1",rightharpoonup:"\u21C0",rightleftarrows:"\u21C4",rightleftharpoons:"\u21CC",rightrightarrows:"\u21C9",rightsquigarrow:"\u219D",RightTee:"\u22A2",RightTeeArrow:"\u21A6",RightTeeVector:"\u295B",rightthreetimes:"\u22CC",RightTriangle:"\u22B3",RightTriangleBar:"\u29D0",RightTriangleEqual:"\u22B5",RightUpDownVector:"\u294F",RightUpTeeVector:"\u295C",RightUpVector:"\u21BE",RightUpVectorBar:"\u2954",RightVector:"\u21C0",RightVectorBar:"\u2953",ring:"\u02DA",risingdotseq:"\u2253",rlarr:"\u21C4",rlhar:"\u21CC",rlm:"\u200F",rmoust:"\u23B1",rmoustache:"\u23B1",rnmid:"\u2AEE",roang:"\u27ED",roarr:"\u21FE",robrk:"\u27E7",ropar:"\u2986",Ropf:"\u211D",ropf:"\u{1D563}",roplus:"\u2A2E",rotimes:"\u2A35",RoundImplies:"\u2970",rpar:")",rpargt:"\u2994",rppolint:"\u2A12",rrarr:"\u21C9",Rrightarrow:"\u21DB",rsaquo:"\u203A",Rscr:"\u211B",rscr:"\u{1D4C7}",Rsh:"\u21B1",rsh:"\u21B1",rsqb:"]",rsquo:"\u2019",rsquor:"\u2019",rthree:"\u22CC",rtimes:"\u22CA",rtri:"\u25B9",rtrie:"\u22B5",rtrif:"\u25B8",rtriltri:"\u29CE",RuleDelayed:"\u29F4",ruluhar:"\u2968",rx:"\u211E",Sacute:"\u015A",sacute:"\u015B",sbquo:"\u201A",Sc:"\u2ABC",sc:"\u227B",scap:"\u2AB8",Scaron:"\u0160",scaron:"\u0161",sccue:"\u227D",scE:"\u2AB4",sce:"\u2AB0",Scedil:"\u015E",scedil:"\u015F",Scirc:"\u015C",scirc:"\u015D",scnap:"\u2ABA",scnE:"\u2AB6",scnsim:"\u22E9",scpolint:"\u2A13",scsim:"\u227F",Scy:"\u0421",scy:"\u0441",sdot:"\u22C5",sdotb:"\u22A1",sdote:"\u2A66",searhk:"\u2925",seArr:"\u21D8",searr:"\u2198",searrow:"\u2198",sect:"\xA7",semi:";",seswar:"\u2929",setminus:"\u2216",setmn:"\u2216",sext:"\u2736",Sfr:"\u{1D516}",sfr:"\u{1D530}",sfrown:"\u2322",sharp:"\u266F",SHCHcy:"\u0429",shchcy:"\u0449",SHcy:"\u0428",shcy:"\u0448",ShortDownArrow:"\u2193",ShortLeftArrow:"\u2190",shortmid:"\u2223",shortparallel:"\u2225",ShortRightArrow:"\u2192",ShortUpArrow:"\u2191",shy:"\xAD",Sigma:"\u03A3",sigma:"\u03C3",sigmaf:"\u03C2",sigmav:"\u03C2",sim:"\u223C",simdot:"\u2A6A",sime:"\u2243",simeq:"\u2243",simg:"\u2A9E",simgE:"\u2AA0",siml:"\u2A9D",simlE:"\u2A9F",simne:"\u2246",simplus:"\u2A24",simrarr:"\u2972",slarr:"\u2190",SmallCircle:"\u2218",smallsetminus:"\u2216",smashp:"\u2A33",smeparsl:"\u29E4",smid:"\u2223",smile:"\u2323",smt:"\u2AAA",smte:"\u2AAC",smtes:"\u2AAC\uFE00",SOFTcy:"\u042C",softcy:"\u044C",sol:"/",solb:"\u29C4",solbar:"\u233F",Sopf:"\u{1D54A}",sopf:"\u{1D564}",spades:"\u2660",spadesuit:"\u2660",spar:"\u2225",sqcap:"\u2293",sqcaps:"\u2293\uFE00",sqcup:"\u2294",sqcups:"\u2294\uFE00",Sqrt:"\u221A",sqsub:"\u228F",sqsube:"\u2291",sqsubset:"\u228F",sqsubseteq:"\u2291",sqsup:"\u2290",sqsupe:"\u2292",sqsupset:"\u2290",sqsupseteq:"\u2292",squ:"\u25A1",Square:"\u25A1",square:"\u25A1",SquareIntersection:"\u2293",SquareSubset:"\u228F",SquareSubsetEqual:"\u2291",SquareSuperset:"\u2290",SquareSupersetEqual:"\u2292",SquareUnion:"\u2294",squarf:"\u25AA",squf:"\u25AA",srarr:"\u2192",Sscr:"\u{1D4AE}",sscr:"\u{1D4C8}",ssetmn:"\u2216",ssmile:"\u2323",sstarf:"\u22C6",Star:"\u22C6",star:"\u2606",starf:"\u2605",straightepsilon:"\u03F5",straightphi:"\u03D5",strns:"\xAF",Sub:"\u22D0",sub:"\u2282",subdot:"\u2ABD",subE:"\u2AC5",sube:"\u2286",subedot:"\u2AC3",submult:"\u2AC1",subnE:"\u2ACB",subne:"\u228A",subplus:"\u2ABF",subrarr:"\u2979",Subset:"\u22D0",subset:"\u2282",subseteq:"\u2286",subseteqq:"\u2AC5",SubsetEqual:"\u2286",subsetneq:"\u228A",subsetneqq:"\u2ACB",subsim:"\u2AC7",subsub:"\u2AD5",subsup:"\u2AD3",succ:"\u227B",succapprox:"\u2AB8",succcurlyeq:"\u227D",Succeeds:"\u227B",SucceedsEqual:"\u2AB0",SucceedsSlantEqual:"\u227D",SucceedsTilde:"\u227F",succeq:"\u2AB0",succnapprox:"\u2ABA",succneqq:"\u2AB6",succnsim:"\u22E9",succsim:"\u227F",SuchThat:"\u220B",Sum:"\u2211",sum:"\u2211",sung:"\u266A",Sup:"\u22D1",sup:"\u2283",sup1:"\xB9",sup2:"\xB2",sup3:"\xB3",supdot:"\u2ABE",supdsub:"\u2AD8",supE:"\u2AC6",supe:"\u2287",supedot:"\u2AC4",Superset:"\u2283",SupersetEqual:"\u2287",suphsol:"\u27C9",suphsub:"\u2AD7",suplarr:"\u297B",supmult:"\u2AC2",supnE:"\u2ACC",supne:"\u228B",supplus:"\u2AC0",Supset:"\u22D1",supset:"\u2283",supseteq:"\u2287",supseteqq:"\u2AC6",supsetneq:"\u228B",supsetneqq:"\u2ACC",supsim:"\u2AC8",supsub:"\u2AD4",supsup:"\u2AD6",swarhk:"\u2926",swArr:"\u21D9",swarr:"\u2199",swarrow:"\u2199",swnwar:"\u292A",szlig:"\xDF",Tab:"	",target:"\u2316",Tau:"\u03A4",tau:"\u03C4",tbrk:"\u23B4",Tcaron:"\u0164",tcaron:"\u0165",Tcedil:"\u0162",tcedil:"\u0163",Tcy:"\u0422",tcy:"\u0442",tdot:"\u20DB",telrec:"\u2315",Tfr:"\u{1D517}",tfr:"\u{1D531}",there4:"\u2234",Therefore:"\u2234",therefore:"\u2234",Theta:"\u0398",theta:"\u03B8",thetasym:"\u03D1",thetav:"\u03D1",thickapprox:"\u2248",thicksim:"\u223C",ThickSpace:"\u205F\u200A",thinsp:"\u2009",ThinSpace:"\u2009",thkap:"\u2248",thksim:"\u223C",THORN:"\xDE",thorn:"\xFE",Tilde:"\u223C",tilde:"\u02DC",TildeEqual:"\u2243",TildeFullEqual:"\u2245",TildeTilde:"\u2248",times:"\xD7",timesb:"\u22A0",timesbar:"\u2A31",timesd:"\u2A30",tint:"\u222D",toea:"\u2928",top:"\u22A4",topbot:"\u2336",topcir:"\u2AF1",Topf:"\u{1D54B}",topf:"\u{1D565}",topfork:"\u2ADA",tosa:"\u2929",tprime:"\u2034",TRADE:"\u2122",trade:"\u2122",triangle:"\u25B5",triangledown:"\u25BF",triangleleft:"\u25C3",trianglelefteq:"\u22B4",triangleq:"\u225C",triangleright:"\u25B9",trianglerighteq:"\u22B5",tridot:"\u25EC",trie:"\u225C",triminus:"\u2A3A",TripleDot:"\u20DB",triplus:"\u2A39",trisb:"\u29CD",tritime:"\u2A3B",trpezium:"\u23E2",Tscr:"\u{1D4AF}",tscr:"\u{1D4C9}",TScy:"\u0426",tscy:"\u0446",TSHcy:"\u040B",tshcy:"\u045B",Tstrok:"\u0166",tstrok:"\u0167",twixt:"\u226C",twoheadleftarrow:"\u219E",twoheadrightarrow:"\u21A0",Uacute:"\xDA",uacute:"\xFA",Uarr:"\u219F",uArr:"\u21D1",uarr:"\u2191",Uarrocir:"\u2949",Ubrcy:"\u040E",ubrcy:"\u045E",Ubreve:"\u016C",ubreve:"\u016D",Ucirc:"\xDB",ucirc:"\xFB",Ucy:"\u0423",ucy:"\u0443",udarr:"\u21C5",Udblac:"\u0170",udblac:"\u0171",udhar:"\u296E",ufisht:"\u297E",Ufr:"\u{1D518}",ufr:"\u{1D532}",Ugrave:"\xD9",ugrave:"\xF9",uHar:"\u2963",uharl:"\u21BF",uharr:"\u21BE",uhblk:"\u2580",ulcorn:"\u231C",ulcorner:"\u231C",ulcrop:"\u230F",ultri:"\u25F8",Umacr:"\u016A",umacr:"\u016B",uml:"\xA8",UnderBar:"_",UnderBrace:"\u23DF",UnderBracket:"\u23B5",UnderParenthesis:"\u23DD",Union:"\u22C3",UnionPlus:"\u228E",Uogon:"\u0172",uogon:"\u0173",Uopf:"\u{1D54C}",uopf:"\u{1D566}",UpArrow:"\u2191",Uparrow:"\u21D1",uparrow:"\u2191",UpArrowBar:"\u2912",UpArrowDownArrow:"\u21C5",UpDownArrow:"\u2195",Updownarrow:"\u21D5",updownarrow:"\u2195",UpEquilibrium:"\u296E",upharpoonleft:"\u21BF",upharpoonright:"\u21BE",uplus:"\u228E",UpperLeftArrow:"\u2196",UpperRightArrow:"\u2197",Upsi:"\u03D2",upsi:"\u03C5",upsih:"\u03D2",Upsilon:"\u03A5",upsilon:"\u03C5",UpTee:"\u22A5",UpTeeArrow:"\u21A5",upuparrows:"\u21C8",urcorn:"\u231D",urcorner:"\u231D",urcrop:"\u230E",Uring:"\u016E",uring:"\u016F",urtri:"\u25F9",Uscr:"\u{1D4B0}",uscr:"\u{1D4CA}",utdot:"\u22F0",Utilde:"\u0168",utilde:"\u0169",utri:"\u25B5",utrif:"\u25B4",uuarr:"\u21C8",Uuml:"\xDC",uuml:"\xFC",uwangle:"\u29A7",vangrt:"\u299C",varepsilon:"\u03F5",varkappa:"\u03F0",varnothing:"\u2205",varphi:"\u03D5",varpi:"\u03D6",varpropto:"\u221D",vArr:"\u21D5",varr:"\u2195",varrho:"\u03F1",varsigma:"\u03C2",varsubsetneq:"\u228A\uFE00",varsubsetneqq:"\u2ACB\uFE00",varsupsetneq:"\u228B\uFE00",varsupsetneqq:"\u2ACC\uFE00",vartheta:"\u03D1",vartriangleleft:"\u22B2",vartriangleright:"\u22B3",Vbar:"\u2AEB",vBar:"\u2AE8",vBarv:"\u2AE9",Vcy:"\u0412",vcy:"\u0432",VDash:"\u22AB",Vdash:"\u22A9",vDash:"\u22A8",vdash:"\u22A2",Vdashl:"\u2AE6",Vee:"\u22C1",vee:"\u2228",veebar:"\u22BB",veeeq:"\u225A",vellip:"\u22EE",Verbar:"\u2016",verbar:"|",Vert:"\u2016",vert:"|",VerticalBar:"\u2223",VerticalLine:"|",VerticalSeparator:"\u2758",VerticalTilde:"\u2240",VeryThinSpace:"\u200A",Vfr:"\u{1D519}",vfr:"\u{1D533}",vltri:"\u22B2",vnsub:"\u2282\u20D2",vnsup:"\u2283\u20D2",Vopf:"\u{1D54D}",vopf:"\u{1D567}",vprop:"\u221D",vrtri:"\u22B3",Vscr:"\u{1D4B1}",vscr:"\u{1D4CB}",vsubnE:"\u2ACB\uFE00",vsubne:"\u228A\uFE00",vsupnE:"\u2ACC\uFE00",vsupne:"\u228B\uFE00",Vvdash:"\u22AA",vzigzag:"\u299A",Wcirc:"\u0174",wcirc:"\u0175",wedbar:"\u2A5F",Wedge:"\u22C0",wedge:"\u2227",wedgeq:"\u2259",weierp:"\u2118",Wfr:"\u{1D51A}",wfr:"\u{1D534}",Wopf:"\u{1D54E}",wopf:"\u{1D568}",wp:"\u2118",wr:"\u2240",wreath:"\u2240",Wscr:"\u{1D4B2}",wscr:"\u{1D4CC}",xcap:"\u22C2",xcirc:"\u25EF",xcup:"\u22C3",xdtri:"\u25BD",Xfr:"\u{1D51B}",xfr:"\u{1D535}",xhArr:"\u27FA",xharr:"\u27F7",Xi:"\u039E",xi:"\u03BE",xlArr:"\u27F8",xlarr:"\u27F5",xmap:"\u27FC",xnis:"\u22FB",xodot:"\u2A00",Xopf:"\u{1D54F}",xopf:"\u{1D569}",xoplus:"\u2A01",xotime:"\u2A02",xrArr:"\u27F9",xrarr:"\u27F6",Xscr:"\u{1D4B3}",xscr:"\u{1D4CD}",xsqcup:"\u2A06",xuplus:"\u2A04",xutri:"\u25B3",xvee:"\u22C1",xwedge:"\u22C0",Yacute:"\xDD",yacute:"\xFD",YAcy:"\u042F",yacy:"\u044F",Ycirc:"\u0176",ycirc:"\u0177",Ycy:"\u042B",ycy:"\u044B",yen:"\xA5",Yfr:"\u{1D51C}",yfr:"\u{1D536}",YIcy:"\u0407",yicy:"\u0457",Yopf:"\u{1D550}",yopf:"\u{1D56A}",Yscr:"\u{1D4B4}",yscr:"\u{1D4CE}",YUcy:"\u042E",yucy:"\u044E",Yuml:"\u0178",yuml:"\xFF",Zacute:"\u0179",zacute:"\u017A",Zcaron:"\u017D",zcaron:"\u017E",Zcy:"\u0417",zcy:"\u0437",Zdot:"\u017B",zdot:"\u017C",zeetrf:"\u2128",ZeroWidthSpace:"\u200B",Zeta:"\u0396",zeta:"\u03B6",Zfr:"\u2128",zfr:"\u{1D537}",ZHcy:"\u0416",zhcy:"\u0436",zigrarr:"\u21DD",Zopf:"\u2124",zopf:"\u{1D56B}",Zscr:"\u{1D4B5}",zscr:"\u{1D4CF}",zwj:"\u200D",zwnj:"\u200C"}),re.entityMap=re.HTML_ENTITIES},28978:function(ye,re,W){var J,A=W(84722);J=A.DOMImplementation,J=A.XMLSerializer,re.DOMParser=W(15752).DOMParser},64466:function(ye,re,W){var J=W(44582).NAMESPACE,A=/[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,M=new RegExp("[\\-\\.0-9"+A.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),k=new RegExp("^"+A.source+M.source+"*(?::"+A.source+M.source+"*)?$"),$=0,Z=1,he=2,fe=3,ue=4,ee=5,Ce=6,Pe=7;function Ve(T,x){this.message=T,this.locator=x,Error.captureStackTrace&&Error.captureStackTrace(this,Ve)}Ve.prototype=new Error,Ve.prototype.name=Ve.name;function X(){}X.prototype={parse:function(T,x,L){var ne=this.domBuilder;ne.startDocument(),Se(x,x={}),He(T,x,L,ne,this.errorHandler),ne.endDocument()}};function He(T,x,L,ne,ce){function de(tt){if(tt>65535){tt-=65536;var Pt=55296+(tt>>10),Jt=56320+(tt&1023);return String.fromCharCode(Pt,Jt)}else return String.fromCharCode(tt)}function le(tt){var Pt=tt.slice(1,-1);return Object.hasOwnProperty.call(L,Pt)?L[Pt]:Pt.charAt(0)==="#"?de(parseInt(Pt.substr(1).replace("x","0x"))):(ce.error("entity not found:"+tt),tt)}function me(tt){if(tt>je){var Pt=T.substring(je,tt).replace(/&#?\w+;/g,le);Te&&G(je),ne.characters(Pt,0,tt-je),je=tt}}function G(tt,Pt){for(;tt>=ie&&(Pt=se.exec(T));)te=Pt.index,ie=te+Pt[0].length,Te.lineNumber++;Te.columnNumber=tt-te+1}for(var te=0,ie=0,se=/.*(?:\r\n?|\n)|.*$/g,Te=ne.locator,Me=[{currentNSMap:x}],ze={},je=0;;){try{var Be=T.indexOf("<",je);if(Be<0){if(!T.substr(je).match(/^\s*$/)){var _t=ne.doc,Dt=_t.createTextNode(T.substr(je));_t.appendChild(Dt),ne.currentElement=Dt}return}switch(Be>je&&me(Be),T.charAt(Be+1)){case"/":var pe=T.indexOf(">",Be+3),pt=T.substring(Be+2,pe).replace(/[ \t\n\r]+$/g,""),Ct=Me.pop();pe<0?(pt=T.substring(Be+2).replace(/[\s<].*/,""),ce.error("end tag name: "+pt+" is not complete:"+Ct.tagName),pe=Be+1+pt.length):pt.match(/\s</)&&(pt=pt.replace(/[\s<].*/,""),ce.error("end tag name: "+pt+" maybe not complete"),pe=Be+1+pt.length);var Wt=Ct.localNSMap,gi=Ct.tagName==pt,Sn=gi||Ct.tagName&&Ct.tagName.toLowerCase()==pt.toLowerCase();if(Sn){if(ne.endElement(Ct.uri,Ct.localName,pt),Wt)for(var $e in Wt)Object.prototype.hasOwnProperty.call(Wt,$e)&&ne.endPrefixMapping($e);gi||ce.fatalError("end tag name: "+pt+" is not match the current start tagName:"+Ct.tagName)}else Me.push(Ct);pe++;break;case"?":Te&&G(Be),pe=_e(T,Be,ne);break;case"!":Te&&G(Be),pe=ge(T,Be,ne,ce);break;default:Te&&G(Be);var Et=new Ue,li=Me[Me.length-1].currentNSMap,pe=Xe(T,Be,Et,li,le,ce),as=Et.length;if(!Et.closed&&xe(T,pe,Et.tagName,ze)&&(Et.closed=!0,L.nbsp||ce.warning("unclosed xml attribute")),Te&&as){for(var os=Re(Te,{}),st=0;st<as;st++){var wi=Et[st];G(wi.offset),wi.locator=Re(Te,{})}ne.locator=os,ae(Et,ne,li)&&Me.push(Et),ne.locator=Te}else ae(Et,ne,li)&&Me.push(Et);J.isHTML(Et.uri)&&!Et.closed?pe=ke(T,pe,Et.tagName,le,ne):pe++}}catch(tt){if(tt instanceof Ve)throw tt;ce.error("element parse error: "+tt),pe=-1}pe>je?je=pe:me(Math.max(Be,je)+1)}}function Re(T,x){return x.lineNumber=T.lineNumber,x.columnNumber=T.columnNumber,x}function Xe(T,x,L,ne,ce,de){function le(Me,ze,je){L.attributeNames.hasOwnProperty(Me)&&de.fatalError("Attribute "+Me+" redefined"),L.addValue(Me,ze.replace(/[\t\n\r]/g," ").replace(/&#?\w+;/g,ce),je)}for(var me,G,te=++x,ie=$;;){var se=T.charAt(te);switch(se){case"=":if(ie===Z)me=T.slice(x,te),ie=fe;else if(ie===he)ie=fe;else throw new Error("attribute equal must after attrName");break;case"'":case'"':if(ie===fe||ie===Z)if(ie===Z&&(de.warning('attribute value must after "="'),me=T.slice(x,te)),x=te+1,te=T.indexOf(se,x),te>0)G=T.slice(x,te),le(me,G,x-1),ie=ee;else throw new Error("attribute value no end '"+se+"' match");else if(ie==ue)G=T.slice(x,te),le(me,G,x),de.warning('attribute "'+me+'" missed start quot('+se+")!!"),x=te+1,ie=ee;else throw new Error('attribute value must after "="');break;case"/":switch(ie){case $:L.setTagName(T.slice(x,te));case ee:case Ce:case Pe:ie=Pe,L.closed=!0;case ue:case Z:break;case he:L.closed=!0;break;default:throw new Error("attribute invalid close char('/')")}break;case"":return de.error("unexpected end of input"),ie==$&&L.setTagName(T.slice(x,te)),te;case">":switch(ie){case $:L.setTagName(T.slice(x,te));case ee:case Ce:case Pe:break;case ue:case Z:G=T.slice(x,te),G.slice(-1)==="/"&&(L.closed=!0,G=G.slice(0,-1));case he:ie===he&&(G=me),ie==ue?(de.warning('attribute "'+G+'" missed quot(")!'),le(me,G,x)):((!J.isHTML(ne[""])||!G.match(/^(?:disabled|checked|selected)$/i))&&de.warning('attribute "'+G+'" missed value!! "'+G+'" instead!!'),le(G,G,x));break;case fe:throw new Error("attribute value missed!!")}return te;case"\x80":se=" ";default:if(se<=" ")switch(ie){case $:L.setTagName(T.slice(x,te)),ie=Ce;break;case Z:me=T.slice(x,te),ie=he;break;case ue:var G=T.slice(x,te);de.warning('attribute "'+G+'" missed quot(")!!'),le(me,G,x);case ee:ie=Ce;break}else switch(ie){case he:var Te=L.tagName;(!J.isHTML(ne[""])||!me.match(/^(?:disabled|checked|selected)$/i))&&de.warning('attribute "'+me+'" missed value!! "'+me+'" instead2!!'),le(me,me,x),x=te,ie=Z;break;case ee:de.warning('attribute space is required"'+me+'"!!');case Ce:ie=Z,x=te;break;case fe:ie=ue,x=te;break;case Pe:throw new Error("elements closed character '/' and '>' must be connected to")}}te++}}function ae(T,x,L){for(var ne=T.tagName,ce=null,se=T.length;se--;){var de=T[se],le=de.qName,me=de.value,Te=le.indexOf(":");if(Te>0)var G=de.prefix=le.slice(0,Te),te=le.slice(Te+1),ie=G==="xmlns"&&te;else te=le,G=null,ie=le==="xmlns"&&"";de.localName=te,ie!==!1&&(ce==null&&(ce={},Se(L,L={})),L[ie]=ce[ie]=me,de.uri=J.XMLNS,x.startPrefixMapping(ie,me))}for(var se=T.length;se--;){de=T[se];var G=de.prefix;G&&(G==="xml"&&(de.uri=J.XML),G!=="xmlns"&&(de.uri=L[G||""]))}var Te=ne.indexOf(":");Te>0?(G=T.prefix=ne.slice(0,Te),te=T.localName=ne.slice(Te+1)):(G=null,te=T.localName=ne);var Me=T.uri=L[G||""];if(x.startElement(Me,te,ne,T),T.closed){if(x.endElement(Me,te,ne),ce)for(G in ce)Object.prototype.hasOwnProperty.call(ce,G)&&x.endPrefixMapping(G)}else return T.currentNSMap=L,T.localNSMap=ce,!0}function ke(T,x,L,ne,ce){if(/^(?:script|textarea)$/i.test(L)){var de=T.indexOf("</"+L+">",x),le=T.substring(x+1,de);if(/[&<]/.test(le))return/^script$/i.test(L)?(ce.characters(le,0,le.length),de):(le=le.replace(/&#?\w+;/g,ne),ce.characters(le,0,le.length),de)}return x+1}function xe(T,x,L,ne){var ce=ne[L];return ce==null&&(ce=T.lastIndexOf("</"+L+">"),ce<x&&(ce=T.lastIndexOf("</"+L)),ne[L]=ce),ce<x}function Se(T,x){for(var L in T)Object.prototype.hasOwnProperty.call(T,L)&&(x[L]=T[L])}function ge(T,x,L,ne){var ce=T.charAt(x+2);switch(ce){case"-":if(T.charAt(x+3)==="-"){var de=T.indexOf("-->",x+4);return de>x?(L.comment(T,x+4,de-x-4),de+3):(ne.error("Unclosed comment"),-1)}else return-1;default:if(T.substr(x+3,6)=="CDATA["){var de=T.indexOf("]]>",x+9);return L.startCDATA(),L.characters(T,x+9,de-x-9),L.endCDATA(),de+3}var le=De(T,x),me=le.length;if(me>1&&/!doctype/i.test(le[0][0])){var G=le[1][0],te=!1,ie=!1;me>3&&(/^public$/i.test(le[2][0])?(te=le[3][0],ie=me>4&&le[4][0]):/^system$/i.test(le[2][0])&&(ie=le[3][0]));var se=le[me-1];return L.startDTD(G,te,ie),L.endDTD(),se.index+se[0].length}}return-1}function _e(T,x,L){var ne=T.indexOf("?>",x);if(ne){var ce=T.substring(x,ne).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);if(ce){var de=ce[0].length;return L.processingInstruction(ce[1],ce[2]),ne+2}else return-1}return-1}function Ue(){this.attributeNames={}}Ue.prototype={setTagName:function(T){if(!k.test(T))throw new Error("invalid tagName:"+T);this.tagName=T},addValue:function(T,x,L){if(!k.test(T))throw new Error("invalid attribute:"+T);this.attributeNames[T]=this.length,this[this.length++]={qName:T,value:x,offset:L}},length:0,getLocalName:function(T){return this[T].localName},getLocator:function(T){return this[T].locator},getQName:function(T){return this[T].qName},getURI:function(T){return this[T].uri},getValue:function(T){return this[T].value}};function De(T,x){var L,ne=[],ce=/'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;for(ce.lastIndex=x,ce.exec(T);L=ce.exec(T);)if(ne.push(L),L[1])return ne}re.XMLReader=X,re.ParseError=Ve},5175:function(ye,re,W){"use strict";var J=W(71354),A=W.n(J),M=W(76314),k=W.n(M),$=W(4417),Z=W.n($),he=new URL(W(17422),W.b),fe=k()(A()),ue=Z()(he);fe.push([ye.id,`.vjs-svg-icon {
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
  src: url(`+ue+`) format("woff");
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

.video-js .vjs-progress-control:hover .vjs-progress-holder {
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
.video-js .vjs-progress-control:hover .vjs-progress-holder:focus .vjs-time-tooltip {
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
`,"",{version:3,sources:["webpack://./node_modules/video.js/dist/video-js.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,4BAA4B;EAC5B,2BAA2B;EAC3B,kBAAkB;EAClB,aAAa;EACb,YAAY;AACd;AACA;EACE,wBAAwB;AAC1B;;AAEA;;EAEE,oCAAoC;AACtC;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;EACpB,2DAAijO;EACjjO,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;;;;;EAKE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;;;;;EAKE,gBAAgB;AAClB;;AAEA;;EAEE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,sBAAsB;EACtB,WAAW;EACX,sBAAsB;EACtB,kBAAkB;EAClB,UAAU;EACV,eAAe;EACf,cAAc;EACd,mBAAmB;EACnB,kBAAkB;EAClB,yCAAyC;EACzC,mBAAmB;AACrB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,aAAa;AACf;;AAEA;;;EAGE,mBAAmB;AACrB;;AAEA;EACE,oBAAoB;EACpB,kBAAkB;EAClB,oBAAoB;EACpB,4BAA4B;EAC5B,cAAc;EACd,eAAe;EACf,aAAa;EACb,gBAAgB;AAClB;;AAEA;;;;;EAKE,WAAW;EACX,eAAe;AACjB;;AAEA;;;;;EAKE,SAAS;AACX;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,UAAU;EACV,SAAS;EACT,YAAY;AACd;;AAEA;;EAEE,eAAe;EACf,gBAAgB;EAChB,aAAa;EACb,OAAO;EACP,MAAM;EACN,SAAS;EACT,QAAQ;AACV;;AAEA;;EAEE,sBAAsB;EACtB,uBAAuB;EACvB,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,cAAc;EACd,oCAAoC;EACpC,cAAc;EACd,kBAAkB;EAClB,WAAW;AACb;;AAEA;;;EAGE,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,kBAAkB;EAClB,MAAM;EACN,UAAU;AACZ;;AAEA;EACE,yBAAyB;EACzB,qBAAqB;EACrB,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,WAAW;EACX,sBAAsB;EACtB,eAAe;EACf,yCAAyC;EACzC,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,gBAAgB;AAClB;;AAEA;;EAEE,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,iBAAiB;EACjB,UAAU;EACV,cAAc;EACd,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;EACf,UAAU;EACV,4BAA4B;EAC5B,yBAAyB;EACzB,uCAAuC;EACvC,oBAAoB;EACpB,oBAAoB;AACtB;AACA;EACE,UAAU;EACV,WAAW;EACX,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,cAAc;EACd,gCAAgC;AAClC;;AAEA;;EAEE,kBAAkB;EAClB,yBAAyB;EACzB,0CAA0C;EAC1C,kBAAkB;AACpB;;AAEA;;;;EAIE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,cAAc;EACd,qBAAqB;EACrB,kBAAkB;EAClB,oBAAoB;EACpB,oBAAoB;EACpB,qBAAqB;EACrB,gBAAgB;EAChB,wBAAwB;OAEnB,gBAAgB;AACvB;;AAEA;EACE,6BAA6B;EAC7B,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,eAAe;EACf,WAAW;EACX,kBAAkB;EAClB,QAAQ;EACR,UAAU;EACV,UAAU;AACZ;AACA;EACE,8BAA8B;EAC9B,+EAA+E;EAC/E,cAAc;AAChB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,cAAc;EACd,UAAU;EACV,SAAS;EACT,yCAAyC;EACzC,cAAc;AAChB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,gBAAgB;EAChB,SAAS;EACT,gBAAgB;EAChB,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;;;EAGE,yBAAyB;EACzB,0CAA0C;AAC5C;;AAEA;;;;EAIE,sBAAsB;EACtB,cAAc;AAChB;AACA;;;;EAIE,aAAa;AACf;;AAEA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,yBAAyB;EACzB,cAAc;EACd,gBAAgB;EAChB,UAAU;EACV,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,UAAU;EACV,WAAW;EACX,oBAAoB;EACpB,uCAAuC;AACzC;;AAEA;EACE,WAAW;EACX,UAAU;AACZ;;AAEA;EACE,yBAAyB;EACzB,uCAAuC;EACvC,kBAAkB;EAClB,WAAW;EACX,aAAa;EACb,gBAAgB;AAClB;;AAEA;;EAEE,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;EAGE,gBAAgB;AAClB;;AAEA;;EAEE,cAAc;AAChB;;AAEA;EACE,oBAAoB;EACpB,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;AACtB;;AAEA;;;EAGE,WAAW;AACb;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,SAAS;EACT,MAAM;EACN,UAAU;EACV,SAAS;EACT,oBAAoB;AACtB;;AAEA;;;EAGE,cAAc;EACd,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,QAAQ;EACR,WAAW;EACX,yBAAyB;EACzB,uCAAuC;AACzC;;AAEA;EACE,QAAQ;AACV;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;;EAEE,aAAa;EACb,mBAAmB;EACnB,UAAU;EACV,yCAAyC;AAC3C;;AAEA;EACE,mBAAmB;EACnB,UAAU;EACV,oBAAoB;EACpB,qCAAqC;AACvC;;AAEA;;;EAGE,wBAAwB;AAC1B;;AAEA;;EAEE,UAAU;EACV,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,UAAU;EACV,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;;;EAGE,8BAA8B;AAChC;;AAEA;EACE,SAAS;EACT,mBAAmB;EACnB,WAAW;EACX,gBAAgB;EAChB,UAAU;EACV,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;EACf,UAAU;EACV,aAAa;EACb,mBAAmB;EACnB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,oBAAoB;EACpB,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,cAAc;AAChB;;AAEA;;;EAGE,kBAAkB;EAClB,cAAc;EACd,YAAY;EACZ,SAAS;EACT,UAAU;EACV,QAAQ;AACV;;AAEA;EACE,sBAAsB;AACxB;AACA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,qCAAqC;AACvC;;AAEA;EACE,sBAAsB;EACtB,0CAA0C;EAC1C,oBAAoB;EACpB,WAAW;EACX,YAAY;EACZ,yCAAyC;EACzC,cAAc;EACd,wBAAwB;EACxB,oBAAoB;EACpB,kBAAkB;EAClB,WAAW;EACX,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,cAAc;EACd,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,UAAU;EACV,YAAY;EACZ,sBAAsB;EACtB,UAAU;AACZ;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,qCAAqC;AACvC;;AAEA;EACE,WAAW;EACX,sBAAsB;EACtB,oCAAoC;AACtC;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,UAAU;EACV,yBAAyB;EACzB,eAAe;EACf,2BAA2B;EAC3B,0BAA0B;EAC1B,yBAAyB;EACzB,kEAAkE;OAE7D,qBAAiB;MAAjB,iBAAiB;EACtB,yBAAyB;EACzB,0CAA0C;AAC5C;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,8BAA8B;EAC9B,wBAAwB;AAC1B;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,eAAe;EACf,UAAU;AACZ;AACA;EACE,eAAe;EACf,iBAAiB;EACjB,aAAa;AACf;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,UAAU;EACV,UAAU;EACV,WAAW;EACX,iBAAiB;AACnB;;AAEA;EACE,oBAAoB;AACtB;AACA;EACE,mBAAmB;EACnB,UAAU;EACV,kBAAkB;EAClB,mFAAmF;AACrF;AACA;EACE,UAAU;EACV,WAAW;EACX,eAAe;AACjB;AACA;EACE,YAAY;EACZ,mBAAmB;AACrB;AACA;EACE,WAAW;EACX,sBAAsB;AACxB;AACA;EACE,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,UAAU;EACV,aAAa;EACb,uFAAuF;AACzF;;AAEA;EACE,oFAAoF;AACtF;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,UAAU;EACV,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;AACA;EACE,WAAW;EACX,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;AACA;EACE,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,2BAA2B;AAC7B;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,UAAU;EACV,WAAW;EACX,WAAW;EACX,yBAAyB;EACzB,uCAAuC;AACzC;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,sBAAsB;EACtB,0CAA0C;EAC1C,oBAAoB;EACpB,WAAW;EACX,YAAY;EACZ,yCAAyC;EACzC,cAAc;EACd,wBAAwB;EACxB,oBAAoB;EACpB,kBAAkB;EAClB,WAAW;EACX,kBAAkB;EAClB,UAAU;AACZ;;AAEA;;EAEE,cAAc;EACd,cAAc;EACd,mBAAmB;AACrB;;AAEA;;EAEE,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,WAAW;EACX,WAAW;EACX,sBAAsB;EACtB,UAAU;AACZ;;AAEA;EACE,UAAU;EACV,YAAY;AACd;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,qCAAqC;AACvC;;AAEA;EACE,WAAW;EACX,sBAAsB;EACtB,oCAAoC;AACtC;;AAEA;EACE,qBAAqB;EACrB,sBAAsB;EACtB,eAAe;EACf,SAAS;EACT,UAAU;EACV,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,YAAY;AACd;;AAEA;;EAEE,aAAa;AACf;;AAEA;;;EAGE,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,UAAU;EACV,cAAc;EACd,gBAAgB;AAClB;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,eAAe;EACf,UAAU;EACV,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,oBAAoB;EACpB,cAAc;EACd,gBAAgB;EAChB,WAAW;EACX,cAAc;AAChB;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,UAAU;EACV,WAAW;EACX,oBAAoB;EACpB,aAAa;AACf;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,UAAU;EACV,cAAc;EACd,gBAAgB;EAChB,cAAc;EACd,WAAW;EACX,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;;;;EAIE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,OAAO;EACP,QAAQ;EACR,MAAM;EACN,oBAAoB;AACtB;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;;EAEE,6BAA6B;AAC/B;;AAEA;EACE,6BAA6B;EAC7B,qBAAqB;AACvB;;AAEA;EACE;IACE,MAAM;IACN,QAAQ;IACR,SAAS;IACT,OAAO;EACT;AACF;AACA;EACE,eAAe;EACf,UAAU;AACZ;AACA;;EAEE,aAAa;AACf;;AAEA;EACE,eAAe;EACf,UAAU;AACZ;AACA;;EAEE,aAAa;AACf;;AAEA;;EAEE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;AACd;;AAEA;EACE,oBAAoB;EACpB,gBAAgB;EAChB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,SAAS;AACX;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,gBAAgB;EAChB,yCAAyC;EACzC,sBAAsB;EACtB,4BAA4B;EAC5B,UAAU;EACV,WAAW;EACX,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;;EAEE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,mDAAmD;AACrD;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,WAAW;EACX,kBAAkB;EAClB,mBAAmB;EACnB,cAAc;EACd,eAAe;EACf,sBAAsB;EACtB,UAAU;EACV,eAAe;EACf,yBAAyB;EACzB,uBAAuB;AACzB;;AAEA;;;;EAIE,+GAA+G;AACjH;;AAEA;;EAEE,oCAAoC;AACtC;;AAEA;;EAEE,oCAAoC;EACpC,sBAAsB;AACxB;;AAEA;EACE;IACE,mBAAmB;EACrB;AACF;AACA;EACE;IACE,yBAAyB;EAC3B;AACF;AACA;EACE;IACE,yBAAyB;EAC3B;EACA;IACE,yBAAyB;EAC3B;EACA;IACE,uBAAuB;EACzB;EACA;IACE,yBAAyB;EAC3B;EACA;IACE,yBAAyB;EAC3B;AACF;AACA;EACE,aAAa;AACf;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,sBAAsB;EACtB,qBAAqB;EACrB,qBAAqB;AACvB;;AAEA;EACE,oBAAoB;EACpB,gBAAgB;EAChB,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,sBAAsB;EACtB,qBAAqB;EACrB,qBAAqB;AACvB;;AAEA;;EAEE,oBAAoB;EACpB,iBAAiB;EACjB,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;;;;;;;;;;;;;;;;EAgBE,aAAa;AACf;AACA;EACE,WAAW;EACX,cAAc;AAChB;AACA;EACE,aAAa;AACf;AACA;EACE,UAAU;EACV,cAAc;AAChB;;AAEA;EACE,yBAAyB;EACzB,wCAAwC;EACxC,WAAW;EACX,WAAW;AACb;AACA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;;;EAGE,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,sBAAsB;AACxB;;AAEA;EACE;IACE,aAAa;IACb,8BAA8B;IAC9B,uBAAuB;IACvB,2BAA2B;EAC7B;EACA;IACE,mBAAmB;EACrB;EACA;IACE,iBAAiB;EACnB;EACA;;;IAGE,0BAA0B;EAC5B;AACF;AACA;EACE,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,qBAAqB;EACrB,sBAAsB;AACxB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;;EAEE,oBAAoB;EACpB,qBAAqB;EACrB,+DAA+D;AACjE;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,sBAAsB;EACtB,kEAAkE;EAClE,cAAc;EACd,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,8BAA8B;EAC9B,yGAAyG;EACzG,gBAAgB;EAChB,gBAAgB;EAChB,wBAAwB;EACxB,4BAA4B;EAC5B,oBAAoB;EACpB,kBAAkB;EAClB,MAAM;EACN,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,SAAS;EACT,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,sBAAsB;AACxB;;AAEA;EACE,UAAU;EACV,sBAAsB;AACxB;;AAEA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,uCAAuC;EACvC,eAAe;EACf,UAAU;EACV,sBAAsB;AACxB;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,UAAU;AACZ;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,QAAQ;AACV;;AAEA;EACE,QAAQ;AACV;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,uCAAuC;AACzC;;AAEA;EACE;IACE,kBAAkB;EACpB;AACF;AACA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,cAAc;AAChB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;AACf",sourcesContent:[`.vjs-svg-icon {
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

.video-js .vjs-progress-control:hover .vjs-progress-holder {
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
.video-js .vjs-progress-control:hover .vjs-progress-holder:focus .vjs-time-tooltip {
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
`],sourceRoot:""}]),re.A=fe},4417:function(ye){"use strict";ye.exports=function(re,W){return W||(W={}),re&&(re=String(re.__esModule?re.default:re),/^['"].*['"]$/.test(re)&&(re=re.slice(1,-1)),W.hash&&(re+=W.hash),/["'() \t\n]|(%20)/.test(re)||W.needQuotes?'"'.concat(re.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):re)}},42916:function(ye,re,W){"use strict";var J=W(24994);Object.defineProperty(re,"__esModule",{value:!0}),re.default=void 0;var A=J(W(43693)),M=J(W(96540));function k(fe,ue){var ee=Object.keys(fe);if(Object.getOwnPropertySymbols){var Ce=Object.getOwnPropertySymbols(fe);ue&&(Ce=Ce.filter(function(Pe){return Object.getOwnPropertyDescriptor(fe,Pe).enumerable})),ee.push.apply(ee,Ce)}return ee}function $(fe){for(var ue=1;ue<arguments.length;ue++){var ee=arguments[ue]!=null?arguments[ue]:{};ue%2?k(Object(ee),!0).forEach(function(Ce){(0,A.default)(fe,Ce,ee[Ce])}):Object.getOwnPropertyDescriptors?Object.defineProperties(fe,Object.getOwnPropertyDescriptors(ee)):k(Object(ee)).forEach(function(Ce){Object.defineProperty(fe,Ce,Object.getOwnPropertyDescriptor(ee,Ce))})}return fe}var Z=function(ue){var ee=ue.style,Ce=ue.children;return M.default.createElement("div",{style:$({width:"100%",minHeight:"calc(100vh - 232px)"},ee)},Ce)},he=re.default=Z},37049:function(ye,re,W){"use strict";var J=W(24994);Object.defineProperty(re,"__esModule",{value:!0}),re.default=re.VideoJS=void 0;var A=J(W(96540)),M=J(W(91568));W(18692);var k=re.VideoJS=function(he){var fe=A.default.useRef(null),ue=A.default.useRef(null),ee=he.options,Ce=he.onReady;return A.default.useEffect(function(){if(ue.current){var X=ue.current;X.autoplay(ee.autoplay),X.src(ee.sources)}else{var Pe=document.createElement("video-js");Pe.classList.add("vjs-big-play-centered"),fe.current.appendChild(Pe);var Ve=ue.current=(0,M.default)(Pe,ee,function(){M.default.log("player is ready"),Ce&&Ce(Ve)})}},[ee,fe]),A.default.useEffect(function(){var Pe=ue.current;return function(){Pe&&!Pe.isDisposed()&&(Pe.dispose(),ue.current=null)}},[ue]),A.default.createElement("div",{"data-vjs-player":!0},A.default.createElement("div",{ref:fe}))},$=re.default=k},39676:function(ye,re,W){"use strict";var J=W(24994);Object.defineProperty(re,"__esModule",{value:!0}),re.default=void 0;var A=J(W(96540)),M=J(W(42916)),k=J(W(37049)),$=function(){var fe=A.default.useRef(null),ue={autoplay:!0,controls:!0,responsive:!0,fluid:!0,sources:[{src:"https://placehold.co/1920x1080.mp4",type:"video/mp4"}]},ee=function(Pe){fe.current=Pe,Pe.on("waiting",function(){}),Pe.on("dispose",function(){})};return A.default.createElement(M.default,null,A.default.createElement("div",{style:{width:900}},A.default.createElement(k.default,{options:ue,onReady:ee})))},Z=re.default=$},49697:function(ye,re,W){var J=typeof W.g!="undefined"?W.g:typeof window!="undefined"?window:{},A=W(80542),M;typeof document!="undefined"?M=document:(M=J["__GLOBAL_DOCUMENT_CACHE@4"],M||(M=J["__GLOBAL_DOCUMENT_CACHE@4"]=A)),ye.exports=M},89840:function(ye,re,W){var J;typeof window!="undefined"?J=window:typeof W.g!="undefined"?J=W.g:typeof self!="undefined"?J=self:J={},ye.exports=J},37056:function(ye){ye.exports=W;var re=Object.prototype.toString;function W(J){if(!J)return!1;var A=re.call(J);return A==="[object Function]"||typeof J=="function"&&A!=="[object RegExp]"||typeof window!="undefined"&&(J===window.setTimeout||J===window.alert||J===window.confirm||J===window.prompt)}},98962:function(ye,re,W){var J=W(43626).getUint64,A=function(M){var k=new DataView(M.buffer,M.byteOffset,M.byteLength),$={version:M[0],flags:new Uint8Array(M.subarray(1,4)),references:[],referenceId:k.getUint32(4),timescale:k.getUint32(8)},Z=12;$.version===0?($.earliestPresentationTime=k.getUint32(Z),$.firstOffset=k.getUint32(Z+4),Z+=8):($.earliestPresentationTime=J(M.subarray(Z)),$.firstOffset=J(M.subarray(Z+8)),Z+=16),Z+=2;var he=k.getUint16(Z);for(Z+=2;he>0;Z+=12,he--)$.references.push({referenceType:(M[Z]&128)>>>7,referencedSize:k.getUint32(Z)&2147483647,subsegmentDuration:k.getUint32(Z+4),startsWithSap:!!(M[Z+8]&128),sapType:(M[Z+8]&112)>>>4,sapDeltaTime:k.getUint32(Z+8)&268435455});return $};ye.exports=A},79622:function(ye){var re=9e4,W,J,A,M,k,$,Z;W=function(he){return he*re},J=function(he,fe){return he*fe},A=function(he){return he/re},M=function(he,fe){return he/fe},k=function(he,fe){return W(M(he,fe))},$=function(he,fe){return J(A(he),fe)},Z=function(he,fe,ue){return A(ue?he:he-fe)},ye.exports={ONE_SECOND_IN_TS:re,secondsToVideoTs:W,secondsToAudioTs:J,videoTsToSeconds:A,audioTsToSeconds:M,audioTsToVideoTs:k,videoTsToAudioTs:$,metadataTsToSeconds:Z}},43626:function(ye){var re=Math.pow(2,32),W=function(J){var A=new DataView(J.buffer,J.byteOffset,J.byteLength),M;return A.getBigUint64?(M=A.getBigUint64(0),M<Number.MAX_SAFE_INTEGER?Number(M):M):A.getUint32(0)*re+A.getUint32(4)};ye.exports={getUint64:W,MAX_UINT32:re}},18692:function(ye,re,W){"use strict";W.r(re);var J=W(85072),A=W.n(J),M=W(97825),k=W.n(M),$=W(77659),Z=W.n($),he=W(55056),fe=W.n(he),ue=W(10540),ee=W.n(ue),Ce=W(41113),Pe=W.n(Ce),Ve=W(5175),X={};X.styleTagTransform=Pe(),X.setAttributes=fe(),X.insert=Z().bind(null,"head"),X.domAPI=k(),X.insertStyleElement=ee();var He=A()(Ve.A,X);re.default=Ve.A&&Ve.A.locals?Ve.A.locals:void 0},91568:function(ye,re,W){"use strict";W.r(re),W.d(re,{default:function(){return R}});var J=W(89840),A=W.n(J),M=W(49697),k=W.n(M),$=W(21036),Z=W.n($),he=W(94784),fe=W.n(he),ue=W(58168),ee="https://example.com",Ce=function(e,t){if(/^[a-z]+:/i.test(t))return t;/^data:/.test(e)&&(e=A().location&&A().location.href||"");var i=/^\/\//.test(e),s=!A().location&&!/\/\//i.test(e);e=new(A()).URL(e,A().location||ee);var r=new URL(t,e);return s?r.href.slice(ee.length):i?r.href.slice(r.protocol.length):r.href},Pe=Ce,Ve=function(){function n(){this.listeners={}}var e=n.prototype;return e.on=function(i,s){this.listeners[i]||(this.listeners[i]=[]),this.listeners[i].push(s)},e.off=function(i,s){if(!this.listeners[i])return!1;var r=this.listeners[i].indexOf(s);return this.listeners[i]=this.listeners[i].slice(0),this.listeners[i].splice(r,1),r>-1},e.trigger=function(i){var s=this.listeners[i];if(s)if(arguments.length===2)for(var r=s.length,a=0;a<r;++a)s[a].call(this,arguments[1]);else for(var l=Array.prototype.slice.call(arguments,1),d=s.length,p=0;p<d;++p)s[p].apply(this,l)},e.dispose=function(){this.listeners={}},e.pipe=function(i){this.on("data",function(s){i.push(s)})},n}(),X=W(48287).hp,He=function(e){return A().atob?A().atob(e):X.from(e,"base64").toString("binary")};function Re(n){for(var e=He(n),t=new Uint8Array(e.length),i=0;i<e.length;i++)t[i]=e.charCodeAt(i);return t}/*! @name m3u8-parser @version 7.2.0 @license Apache-2.0 */class Xe extends Ve{constructor(){super(),this.buffer=""}push(e){let t;for(this.buffer+=e,t=this.buffer.indexOf(`
`);t>-1;t=this.buffer.indexOf(`
`))this.trigger("data",this.buffer.substring(0,t)),this.buffer=this.buffer.substring(t+1)}}const ae="	",ke=function(n){const e=/([0-9.]*)?@?([0-9.]*)?/.exec(n||""),t={};return e[1]&&(t.length=parseInt(e[1],10)),e[2]&&(t.offset=parseInt(e[2],10)),t},xe=function(){const t="(?:"+"[^=]*"+")=(?:"+'"[^"]*"|[^,]*'+")";return new RegExp("(?:^|,)("+t+")")},Se=function(n){const e={};if(!n)return e;const t=n.split(xe());let i=t.length,s;for(;i--;)t[i]!==""&&(s=/([^=]*)=(.*)/.exec(t[i]).slice(1),s[0]=s[0].replace(/^\s+|\s+$/g,""),s[1]=s[1].replace(/^\s+|\s+$/g,""),s[1]=s[1].replace(/^['"](.*)['"]$/g,"$1"),e[s[0]]=s[1]);return e},ge=n=>{const e=n.split("x"),t={};return e[0]&&(t.width=parseInt(e[0],10)),e[1]&&(t.height=parseInt(e[1],10)),t};class _e extends Ve{constructor(){super(),this.customParsers=[],this.tagMappers=[]}push(e){let t,i;if(e=e.trim(),e.length===0)return;if(e[0]!=="#"){this.trigger("data",{type:"uri",uri:e});return}this.tagMappers.reduce((r,a)=>{const l=a(e);return l===e?r:r.concat([l])},[e]).forEach(r=>{for(let a=0;a<this.customParsers.length;a++)if(this.customParsers[a].call(this,r))return;if(r.indexOf("#EXT")!==0){this.trigger("data",{type:"comment",text:r.slice(1)});return}if(r=r.replace("\r",""),t=/^#EXTM3U/.exec(r),t){this.trigger("data",{type:"tag",tagType:"m3u"});return}if(t=/^#EXTINF:([0-9\.]*)?,?(.*)?$/.exec(r),t){i={type:"tag",tagType:"inf"},t[1]&&(i.duration=parseFloat(t[1])),t[2]&&(i.title=t[2]),this.trigger("data",i);return}if(t=/^#EXT-X-TARGETDURATION:([0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"targetduration"},t[1]&&(i.duration=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-VERSION:([0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"version"},t[1]&&(i.version=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-MEDIA-SEQUENCE:(\-?[0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"media-sequence"},t[1]&&(i.number=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-DISCONTINUITY-SEQUENCE:(\-?[0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"discontinuity-sequence"},t[1]&&(i.number=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-PLAYLIST-TYPE:(.*)?$/.exec(r),t){i={type:"tag",tagType:"playlist-type"},t[1]&&(i.playlistType=t[1]),this.trigger("data",i);return}if(t=/^#EXT-X-BYTERANGE:(.*)?$/.exec(r),t){i=(0,ue.A)(ke(t[1]),{type:"tag",tagType:"byterange"}),this.trigger("data",i);return}if(t=/^#EXT-X-ALLOW-CACHE:(YES|NO)?/.exec(r),t){i={type:"tag",tagType:"allow-cache"},t[1]&&(i.allowed=!/NO/.test(t[1])),this.trigger("data",i);return}if(t=/^#EXT-X-MAP:(.*)$/.exec(r),t){if(i={type:"tag",tagType:"map"},t[1]){const a=Se(t[1]);a.URI&&(i.uri=a.URI),a.BYTERANGE&&(i.byterange=ke(a.BYTERANGE))}this.trigger("data",i);return}if(t=/^#EXT-X-STREAM-INF:(.*)$/.exec(r),t){i={type:"tag",tagType:"stream-inf"},t[1]&&(i.attributes=Se(t[1]),i.attributes.RESOLUTION&&(i.attributes.RESOLUTION=ge(i.attributes.RESOLUTION)),i.attributes.BANDWIDTH&&(i.attributes.BANDWIDTH=parseInt(i.attributes.BANDWIDTH,10)),i.attributes["FRAME-RATE"]&&(i.attributes["FRAME-RATE"]=parseFloat(i.attributes["FRAME-RATE"])),i.attributes["PROGRAM-ID"]&&(i.attributes["PROGRAM-ID"]=parseInt(i.attributes["PROGRAM-ID"],10))),this.trigger("data",i);return}if(t=/^#EXT-X-MEDIA:(.*)$/.exec(r),t){i={type:"tag",tagType:"media"},t[1]&&(i.attributes=Se(t[1])),this.trigger("data",i);return}if(t=/^#EXT-X-ENDLIST/.exec(r),t){this.trigger("data",{type:"tag",tagType:"endlist"});return}if(t=/^#EXT-X-DISCONTINUITY/.exec(r),t){this.trigger("data",{type:"tag",tagType:"discontinuity"});return}if(t=/^#EXT-X-PROGRAM-DATE-TIME:(.*)$/.exec(r),t){i={type:"tag",tagType:"program-date-time"},t[1]&&(i.dateTimeString=t[1],i.dateTimeObject=new Date(t[1])),this.trigger("data",i);return}if(t=/^#EXT-X-KEY:(.*)$/.exec(r),t){i={type:"tag",tagType:"key"},t[1]&&(i.attributes=Se(t[1]),i.attributes.IV&&(i.attributes.IV.substring(0,2).toLowerCase()==="0x"&&(i.attributes.IV=i.attributes.IV.substring(2)),i.attributes.IV=i.attributes.IV.match(/.{8}/g),i.attributes.IV[0]=parseInt(i.attributes.IV[0],16),i.attributes.IV[1]=parseInt(i.attributes.IV[1],16),i.attributes.IV[2]=parseInt(i.attributes.IV[2],16),i.attributes.IV[3]=parseInt(i.attributes.IV[3],16),i.attributes.IV=new Uint32Array(i.attributes.IV))),this.trigger("data",i);return}if(t=/^#EXT-X-START:(.*)$/.exec(r),t){i={type:"tag",tagType:"start"},t[1]&&(i.attributes=Se(t[1]),i.attributes["TIME-OFFSET"]=parseFloat(i.attributes["TIME-OFFSET"]),i.attributes.PRECISE=/YES/.test(i.attributes.PRECISE)),this.trigger("data",i);return}if(t=/^#EXT-X-CUE-OUT-CONT:(.*)?$/.exec(r),t){i={type:"tag",tagType:"cue-out-cont"},t[1]?i.data=t[1]:i.data="",this.trigger("data",i);return}if(t=/^#EXT-X-CUE-OUT:(.*)?$/.exec(r),t){i={type:"tag",tagType:"cue-out"},t[1]?i.data=t[1]:i.data="",this.trigger("data",i);return}if(t=/^#EXT-X-CUE-IN:?(.*)?$/.exec(r),t){i={type:"tag",tagType:"cue-in"},t[1]?i.data=t[1]:i.data="",this.trigger("data",i);return}if(t=/^#EXT-X-SKIP:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"skip"},i.attributes=Se(t[1]),i.attributes.hasOwnProperty("SKIPPED-SEGMENTS")&&(i.attributes["SKIPPED-SEGMENTS"]=parseInt(i.attributes["SKIPPED-SEGMENTS"],10)),i.attributes.hasOwnProperty("RECENTLY-REMOVED-DATERANGES")&&(i.attributes["RECENTLY-REMOVED-DATERANGES"]=i.attributes["RECENTLY-REMOVED-DATERANGES"].split(ae)),this.trigger("data",i);return}if(t=/^#EXT-X-PART:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"part"},i.attributes=Se(t[1]),["DURATION"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseFloat(i.attributes[a]))}),["INDEPENDENT","GAP"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=/YES/.test(i.attributes[a]))}),i.attributes.hasOwnProperty("BYTERANGE")&&(i.attributes.byterange=ke(i.attributes.BYTERANGE)),this.trigger("data",i);return}if(t=/^#EXT-X-SERVER-CONTROL:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"server-control"},i.attributes=Se(t[1]),["CAN-SKIP-UNTIL","PART-HOLD-BACK","HOLD-BACK"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseFloat(i.attributes[a]))}),["CAN-SKIP-DATERANGES","CAN-BLOCK-RELOAD"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=/YES/.test(i.attributes[a]))}),this.trigger("data",i);return}if(t=/^#EXT-X-PART-INF:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"part-inf"},i.attributes=Se(t[1]),["PART-TARGET"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseFloat(i.attributes[a]))}),this.trigger("data",i);return}if(t=/^#EXT-X-PRELOAD-HINT:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"preload-hint"},i.attributes=Se(t[1]),["BYTERANGE-START","BYTERANGE-LENGTH"].forEach(function(a){if(i.attributes.hasOwnProperty(a)){i.attributes[a]=parseInt(i.attributes[a],10);const l=a==="BYTERANGE-LENGTH"?"length":"offset";i.attributes.byterange=i.attributes.byterange||{},i.attributes.byterange[l]=i.attributes[a],delete i.attributes[a]}}),this.trigger("data",i);return}if(t=/^#EXT-X-RENDITION-REPORT:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"rendition-report"},i.attributes=Se(t[1]),["LAST-MSN","LAST-PART"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseInt(i.attributes[a],10))}),this.trigger("data",i);return}if(t=/^#EXT-X-DATERANGE:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"daterange"},i.attributes=Se(t[1]),["ID","CLASS"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=String(i.attributes[l]))}),["START-DATE","END-DATE"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=new Date(i.attributes[l]))}),["DURATION","PLANNED-DURATION"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=parseFloat(i.attributes[l]))}),["END-ON-NEXT"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=/YES/i.test(i.attributes[l]))}),["SCTE35-CMD"," SCTE35-OUT","SCTE35-IN"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=i.attributes[l].toString(16))});const a=/^X-([A-Z]+-)+[A-Z]+$/;for(const l in i.attributes){if(!a.test(l))continue;const d=/[0-9A-Fa-f]{6}/g.test(i.attributes[l]),p=/^\d+(\.\d+)?$/.test(i.attributes[l]);i.attributes[l]=d?i.attributes[l].toString(16):p?parseFloat(i.attributes[l]):String(i.attributes[l])}this.trigger("data",i);return}if(t=/^#EXT-X-INDEPENDENT-SEGMENTS/.exec(r),t){this.trigger("data",{type:"tag",tagType:"independent-segments"});return}if(t=/^#EXT-X-I-FRAMES-ONLY/.exec(r),t){this.trigger("data",{type:"tag",tagType:"i-frames-only"});return}if(t=/^#EXT-X-CONTENT-STEERING:(.*)$/.exec(r),t){i={type:"tag",tagType:"content-steering"},i.attributes=Se(t[1]),this.trigger("data",i);return}if(t=/^#EXT-X-I-FRAME-STREAM-INF:(.*)$/.exec(r),t){i={type:"tag",tagType:"i-frame-playlist"},i.attributes=Se(t[1]),i.attributes.URI&&(i.uri=i.attributes.URI),i.attributes.BANDWIDTH&&(i.attributes.BANDWIDTH=parseInt(i.attributes.BANDWIDTH,10)),i.attributes.RESOLUTION&&(i.attributes.RESOLUTION=ge(i.attributes.RESOLUTION)),i.attributes["AVERAGE-BANDWIDTH"]&&(i.attributes["AVERAGE-BANDWIDTH"]=parseInt(i.attributes["AVERAGE-BANDWIDTH"],10)),i.attributes["FRAME-RATE"]&&(i.attributes["FRAME-RATE"]=parseFloat(i.attributes["FRAME-RATE"])),this.trigger("data",i);return}if(t=/^#EXT-X-DEFINE:(.*)$/.exec(r),t){i={type:"tag",tagType:"define"},i.attributes=Se(t[1]),this.trigger("data",i);return}this.trigger("data",{type:"tag",data:r.slice(4)})})}addParser({expression:e,customType:t,dataParser:i,segment:s}){typeof i!="function"&&(i=r=>r),this.customParsers.push(r=>{if(e.exec(r))return this.trigger("data",{type:"custom",data:i(r),customType:t,segment:s}),!0})}addTagMapper({expression:e,map:t}){const i=s=>e.test(s)?t(s):s;this.tagMappers.push(i)}}const Ue=n=>n.toLowerCase().replace(/-(\w)/g,e=>e[1].toUpperCase()),De=function(n){const e={};return Object.keys(n).forEach(function(t){e[Ue(t)]=n[t]}),e},T=function(n){const{serverControl:e,targetDuration:t,partTargetDuration:i}=n;if(!e)return;const s="#EXT-X-SERVER-CONTROL",r="holdBack",a="partHoldBack",l=t&&t*3,d=i&&i*2;t&&!e.hasOwnProperty(r)&&(e[r]=l,this.trigger("info",{message:`${s} defaulting HOLD-BACK to targetDuration * 3 (${l}).`})),l&&e[r]<l&&(this.trigger("warn",{message:`${s} clamping HOLD-BACK (${e[r]}) to targetDuration * 3 (${l})`}),e[r]=l),i&&!e.hasOwnProperty(a)&&(e[a]=i*3,this.trigger("info",{message:`${s} defaulting PART-HOLD-BACK to partTargetDuration * 3 (${e[a]}).`})),i&&e[a]<d&&(this.trigger("warn",{message:`${s} clamping PART-HOLD-BACK (${e[a]}) to partTargetDuration * 2 (${d}).`}),e[a]=d)};class x extends Ve{constructor(e={}){super(),this.lineStream=new Xe,this.parseStream=new _e,this.lineStream.pipe(this.parseStream),this.mainDefinitions=e.mainDefinitions||{},this.params=new URL(e.uri,"https://a.com").searchParams,this.lastProgramDateTime=null;const t=this,i=[];let s={},r,a,l=!1;const d=function(){},p={AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},g="urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed";let y=0;this.manifest={allowCache:!0,discontinuityStarts:[],dateRanges:[],iFramePlaylists:[],segments:[]};let B=0,D=0;const P={};this.on("end",()=>{s.uri||!s.parts&&!s.preloadHints||(!s.map&&r&&(s.map=r),!s.key&&a&&(s.key=a),!s.timeline&&typeof y=="number"&&(s.timeline=y),this.manifest.preloadSegment=s)}),this.parseStream.on("data",function(b){let U,H;if(t.manifest.definitions){for(const F in t.manifest.definitions)if(b.uri&&(b.uri=b.uri.replace(`{$${F}}`,t.manifest.definitions[F])),b.attributes)for(const N in b.attributes)typeof b.attributes[N]=="string"&&(b.attributes[N]=b.attributes[N].replace(`{$${F}}`,t.manifest.definitions[F]))}({tag(){({version(){b.version&&(this.manifest.version=b.version)},"allow-cache"(){this.manifest.allowCache=b.allowed,"allowed"in b||(this.trigger("info",{message:"defaulting allowCache to YES"}),this.manifest.allowCache=!0)},byterange(){const F={};"length"in b&&(s.byterange=F,F.length=b.length,"offset"in b||(b.offset=B)),"offset"in b&&(s.byterange=F,F.offset=b.offset),B=F.offset+F.length},endlist(){this.manifest.endList=!0},inf(){"mediaSequence"in this.manifest||(this.manifest.mediaSequence=0,this.trigger("info",{message:"defaulting media sequence to zero"})),"discontinuitySequence"in this.manifest||(this.manifest.discontinuitySequence=0,this.trigger("info",{message:"defaulting discontinuity sequence to zero"})),b.title&&(s.title=b.title),b.duration>0&&(s.duration=b.duration),b.duration===0&&(s.duration=.01,this.trigger("info",{message:"updating zero segment duration to a small value"})),this.manifest.segments=i},key(){if(!b.attributes){this.trigger("warn",{message:"ignoring key declaration without attribute list"});return}if(b.attributes.METHOD==="NONE"){a=null;return}if(!b.attributes.URI){this.trigger("warn",{message:"ignoring key declaration without URI"});return}if(b.attributes.KEYFORMAT==="com.apple.streamingkeydelivery"){this.manifest.contentProtection=this.manifest.contentProtection||{},this.manifest.contentProtection["com.apple.fps.1_0"]={attributes:b.attributes};return}if(b.attributes.KEYFORMAT==="com.microsoft.playready"){this.manifest.contentProtection=this.manifest.contentProtection||{},this.manifest.contentProtection["com.microsoft.playready"]={uri:b.attributes.URI};return}if(b.attributes.KEYFORMAT===g){if(["SAMPLE-AES","SAMPLE-AES-CTR","SAMPLE-AES-CENC"].indexOf(b.attributes.METHOD)===-1){this.trigger("warn",{message:"invalid key method provided for Widevine"});return}if(b.attributes.METHOD==="SAMPLE-AES-CENC"&&this.trigger("warn",{message:"SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead"}),b.attributes.URI.substring(0,23)!=="data:text/plain;base64,"){this.trigger("warn",{message:"invalid key URI provided for Widevine"});return}if(!(b.attributes.KEYID&&b.attributes.KEYID.substring(0,2)==="0x")){this.trigger("warn",{message:"invalid key ID provided for Widevine"});return}this.manifest.contentProtection=this.manifest.contentProtection||{},this.manifest.contentProtection["com.widevine.alpha"]={attributes:{schemeIdUri:b.attributes.KEYFORMAT,keyId:b.attributes.KEYID.substring(2)},pssh:Re(b.attributes.URI.split(",")[1])};return}b.attributes.METHOD||this.trigger("warn",{message:"defaulting key method to AES-128"}),a={method:b.attributes.METHOD||"AES-128",uri:b.attributes.URI},typeof b.attributes.IV!="undefined"&&(a.iv=b.attributes.IV)},"media-sequence"(){if(!isFinite(b.number)){this.trigger("warn",{message:"ignoring invalid media sequence: "+b.number});return}this.manifest.mediaSequence=b.number},"discontinuity-sequence"(){if(!isFinite(b.number)){this.trigger("warn",{message:"ignoring invalid discontinuity sequence: "+b.number});return}this.manifest.discontinuitySequence=b.number,y=b.number},"playlist-type"(){if(!/VOD|EVENT/.test(b.playlistType)){this.trigger("warn",{message:"ignoring unknown playlist type: "+b.playlist});return}this.manifest.playlistType=b.playlistType},map(){r={},b.uri&&(r.uri=b.uri),b.byterange&&(r.byterange=b.byterange),a&&(r.key=a)},"stream-inf"(){if(this.manifest.playlists=i,this.manifest.mediaGroups=this.manifest.mediaGroups||p,!b.attributes){this.trigger("warn",{message:"ignoring empty stream-inf attributes"});return}s.attributes||(s.attributes={}),(0,ue.A)(s.attributes,b.attributes)},media(){if(this.manifest.mediaGroups=this.manifest.mediaGroups||p,!(b.attributes&&b.attributes.TYPE&&b.attributes["GROUP-ID"]&&b.attributes.NAME)){this.trigger("warn",{message:"ignoring incomplete or missing media group"});return}const F=this.manifest.mediaGroups[b.attributes.TYPE];F[b.attributes["GROUP-ID"]]=F[b.attributes["GROUP-ID"]]||{},U=F[b.attributes["GROUP-ID"]],H={default:/yes/i.test(b.attributes.DEFAULT)},H.default?H.autoselect=!0:H.autoselect=/yes/i.test(b.attributes.AUTOSELECT),b.attributes.LANGUAGE&&(H.language=b.attributes.LANGUAGE),b.attributes.URI&&(H.uri=b.attributes.URI),b.attributes["INSTREAM-ID"]&&(H.instreamId=b.attributes["INSTREAM-ID"]),b.attributes.CHARACTERISTICS&&(H.characteristics=b.attributes.CHARACTERISTICS),b.attributes.FORCED&&(H.forced=/yes/i.test(b.attributes.FORCED)),U[b.attributes.NAME]=H},discontinuity(){y+=1,s.discontinuity=!0,this.manifest.discontinuityStarts.push(i.length)},"program-date-time"(){typeof this.manifest.dateTimeString=="undefined"&&(this.manifest.dateTimeString=b.dateTimeString,this.manifest.dateTimeObject=b.dateTimeObject),s.dateTimeString=b.dateTimeString,s.dateTimeObject=b.dateTimeObject;const{lastProgramDateTime:F}=this;this.lastProgramDateTime=new Date(b.dateTimeString).getTime(),F===null&&this.manifest.segments.reduceRight((N,Y)=>(Y.programDateTime=N-Y.duration*1e3,Y.programDateTime),this.lastProgramDateTime)},targetduration(){if(!isFinite(b.duration)||b.duration<0){this.trigger("warn",{message:"ignoring invalid target duration: "+b.duration});return}this.manifest.targetDuration=b.duration,T.call(this,this.manifest)},start(){if(!b.attributes||isNaN(b.attributes["TIME-OFFSET"])){this.trigger("warn",{message:"ignoring start declaration without appropriate attribute list"});return}this.manifest.start={timeOffset:b.attributes["TIME-OFFSET"],precise:b.attributes.PRECISE}},"cue-out"(){s.cueOut=b.data},"cue-out-cont"(){s.cueOutCont=b.data},"cue-in"(){s.cueIn=b.data},skip(){this.manifest.skip=De(b.attributes),this.warnOnMissingAttributes_("#EXT-X-SKIP",b.attributes,["SKIPPED-SEGMENTS"])},part(){l=!0;const F=this.manifest.segments.length,N=De(b.attributes);s.parts=s.parts||[],s.parts.push(N),N.byterange&&(N.byterange.hasOwnProperty("offset")||(N.byterange.offset=D),D=N.byterange.offset+N.byterange.length);const Y=s.parts.length-1;this.warnOnMissingAttributes_(`#EXT-X-PART #${Y} for segment #${F}`,b.attributes,["URI","DURATION"]),this.manifest.renditionReports&&this.manifest.renditionReports.forEach((O,K)=>{O.hasOwnProperty("lastPart")||this.trigger("warn",{message:`#EXT-X-RENDITION-REPORT #${K} lacks required attribute(s): LAST-PART`})})},"server-control"(){const F=this.manifest.serverControl=De(b.attributes);F.hasOwnProperty("canBlockReload")||(F.canBlockReload=!1,this.trigger("info",{message:"#EXT-X-SERVER-CONTROL defaulting CAN-BLOCK-RELOAD to false"})),T.call(this,this.manifest),F.canSkipDateranges&&!F.hasOwnProperty("canSkipUntil")&&this.trigger("warn",{message:"#EXT-X-SERVER-CONTROL lacks required attribute CAN-SKIP-UNTIL which is required when CAN-SKIP-DATERANGES is set"})},"preload-hint"(){const F=this.manifest.segments.length,N=De(b.attributes),Y=N.type&&N.type==="PART";s.preloadHints=s.preloadHints||[],s.preloadHints.push(N),N.byterange&&(N.byterange.hasOwnProperty("offset")||(N.byterange.offset=Y?D:0,Y&&(D=N.byterange.offset+N.byterange.length)));const O=s.preloadHints.length-1;if(this.warnOnMissingAttributes_(`#EXT-X-PRELOAD-HINT #${O} for segment #${F}`,b.attributes,["TYPE","URI"]),!!N.type)for(let K=0;K<s.preloadHints.length-1;K++){const be=s.preloadHints[K];be.type&&be.type===N.type&&this.trigger("warn",{message:`#EXT-X-PRELOAD-HINT #${O} for segment #${F} has the same TYPE ${N.type} as preload hint #${K}`})}},"rendition-report"(){const F=De(b.attributes);this.manifest.renditionReports=this.manifest.renditionReports||[],this.manifest.renditionReports.push(F);const N=this.manifest.renditionReports.length-1,Y=["LAST-MSN","URI"];l&&Y.push("LAST-PART"),this.warnOnMissingAttributes_(`#EXT-X-RENDITION-REPORT #${N}`,b.attributes,Y)},"part-inf"(){this.manifest.partInf=De(b.attributes),this.warnOnMissingAttributes_("#EXT-X-PART-INF",b.attributes,["PART-TARGET"]),this.manifest.partInf.partTarget&&(this.manifest.partTargetDuration=this.manifest.partInf.partTarget),T.call(this,this.manifest)},daterange(){this.manifest.dateRanges.push(De(b.attributes));const F=this.manifest.dateRanges.length-1;this.warnOnMissingAttributes_(`#EXT-X-DATERANGE #${F}`,b.attributes,["ID","START-DATE"]);const N=this.manifest.dateRanges[F];N.endDate&&N.startDate&&new Date(N.endDate)<new Date(N.startDate)&&this.trigger("warn",{message:"EXT-X-DATERANGE END-DATE must be equal to or later than the value of the START-DATE"}),N.duration&&N.duration<0&&this.trigger("warn",{message:"EXT-X-DATERANGE DURATION must not be negative"}),N.plannedDuration&&N.plannedDuration<0&&this.trigger("warn",{message:"EXT-X-DATERANGE PLANNED-DURATION must not be negative"});const Y=!!N.endOnNext;if(Y&&!N.class&&this.trigger("warn",{message:"EXT-X-DATERANGE with an END-ON-NEXT=YES attribute must have a CLASS attribute"}),Y&&(N.duration||N.endDate)&&this.trigger("warn",{message:"EXT-X-DATERANGE with an END-ON-NEXT=YES attribute must not contain DURATION or END-DATE attributes"}),N.duration&&N.endDate){const K=N.startDate.getTime()+N.duration*1e3;this.manifest.dateRanges[F].endDate=new Date(K)}if(!P[N.id])P[N.id]=N;else{for(const K in P[N.id])if(N[K]&&JSON.stringify(P[N.id][K])!==JSON.stringify(N[K])){this.trigger("warn",{message:"EXT-X-DATERANGE tags with the same ID in a playlist must have the same attributes values"});break}const O=this.manifest.dateRanges.findIndex(K=>K.id===N.id);this.manifest.dateRanges[O]=(0,ue.A)(this.manifest.dateRanges[O],N),P[N.id]=(0,ue.A)(P[N.id],N),this.manifest.dateRanges.pop()}},"independent-segments"(){this.manifest.independentSegments=!0},"i-frames-only"(){this.manifest.iFramesOnly=!0,this.requiredCompatibilityversion(this.manifest.version,4)},"content-steering"(){this.manifest.contentSteering=De(b.attributes),this.warnOnMissingAttributes_("#EXT-X-CONTENT-STEERING",b.attributes,["SERVER-URI"])},define(){this.manifest.definitions=this.manifest.definitions||{};const F=(N,Y)=>{if(N in this.manifest.definitions){this.trigger("error",{message:`EXT-X-DEFINE: Duplicate name ${N}`});return}this.manifest.definitions[N]=Y};if("QUERYPARAM"in b.attributes){if("NAME"in b.attributes||"IMPORT"in b.attributes){this.trigger("error",{message:"EXT-X-DEFINE: Invalid attributes"});return}const N=this.params.get(b.attributes.QUERYPARAM);if(!N){this.trigger("error",{message:`EXT-X-DEFINE: No query param ${b.attributes.QUERYPARAM}`});return}F(b.attributes.QUERYPARAM,decodeURIComponent(N));return}if("NAME"in b.attributes){if("IMPORT"in b.attributes){this.trigger("error",{message:"EXT-X-DEFINE: Invalid attributes"});return}if(!("VALUE"in b.attributes)||typeof b.attributes.VALUE!="string"){this.trigger("error",{message:`EXT-X-DEFINE: No value for ${b.attributes.NAME}`});return}F(b.attributes.NAME,b.attributes.VALUE);return}if("IMPORT"in b.attributes){if(!this.mainDefinitions[b.attributes.IMPORT]){this.trigger("error",{message:`EXT-X-DEFINE: No value ${b.attributes.IMPORT} to import, or IMPORT used on main playlist`});return}F(b.attributes.IMPORT,this.mainDefinitions[b.attributes.IMPORT]);return}this.trigger("error",{message:"EXT-X-DEFINE: No attribute"})},"i-frame-playlist"(){this.manifest.iFramePlaylists.push({attributes:b.attributes,uri:b.uri,timeline:y}),this.warnOnMissingAttributes_("#EXT-X-I-FRAME-STREAM-INF",b.attributes,["BANDWIDTH","URI"])}}[b.tagType]||d).call(t)},uri(){s.uri=b.uri,i.push(s),this.manifest.targetDuration&&!("duration"in s)&&(this.trigger("warn",{message:"defaulting segment duration to the target duration"}),s.duration=this.manifest.targetDuration),a&&(s.key=a),s.timeline=y,r&&(s.map=r),D=0,this.lastProgramDateTime!==null&&(s.programDateTime=this.lastProgramDateTime,this.lastProgramDateTime+=s.duration*1e3),s={}},comment(){},custom(){b.segment?(s.custom=s.custom||{},s.custom[b.customType]=b.data):(this.manifest.custom=this.manifest.custom||{},this.manifest.custom[b.customType]=b.data)}})[b.type].call(t)})}requiredCompatibilityversion(e,t){(e<t||!e)&&this.trigger("warn",{message:`manifest must be at least version ${t}`})}warnOnMissingAttributes_(e,t,i){const s=[];i.forEach(function(r){t.hasOwnProperty(r)||s.push(r)}),s.length&&this.trigger("warn",{message:`${e} lacks required attribute(s): ${s.join(", ")}`})}push(e){this.lineStream.push(e)}end(){this.lineStream.push(`
`),this.manifest.dateRanges.length&&this.lastProgramDateTime===null&&this.trigger("warn",{message:"A playlist with EXT-X-DATERANGE tag must contain atleast one EXT-X-PROGRAM-DATE-TIME tag"}),this.lastProgramDateTime=null,this.trigger("end")}addParser(e){this.parseStream.addParser(e)}addTagMapper(e){this.parseStream.addTagMapper(e)}}var L={mp4:/^(av0?1|avc0?[1234]|vp0?9|flac|opus|mp3|mp4a|mp4v|stpp.ttml.im1t)/,webm:/^(vp0?[89]|av0?1|opus|vorbis)/,ogg:/^(vp0?[89]|theora|flac|opus|vorbis)/,video:/^(av0?1|avc0?[1234]|vp0?[89]|hvc1|hev1|theora|mp4v)/,audio:/^(mp4a|flac|vorbis|opus|ac-[34]|ec-3|alac|mp3|speex|aac)/,text:/^(stpp.ttml.im1t)/,muxerVideo:/^(avc0?1)/,muxerAudio:/^(mp4a)/,muxerText:/a^/},ne=["video","audio","text"],ce=["Video","Audio","Text"],de=function(e){return e&&e.replace(/avc1\.(\d+)\.(\d+)/i,function(t,i,s){var r=("00"+Number(i).toString(16)).slice(-2),a=("00"+Number(s).toString(16)).slice(-2);return"avc1."+r+"00"+a})},le=function(e){return e.map(de)},me=function(e){return e.replace(/avc1\.(\d+)\.(\d+)/i,function(t){return le([t])[0]})},G=function(e){e===void 0&&(e="");var t=e.split(","),i=[];return t.forEach(function(s){s=s.trim();var r;ne.forEach(function(a){var l=L[a].exec(s.toLowerCase());if(!(!l||l.length<=1)){r=a;var d=s.substring(0,l[1].length),p=s.replace(d,"");i.push({type:d,details:p,mediaType:a})}}),r||i.push({type:s,details:"",mediaType:"unknown"})}),i},te=function(e,t){if(!e.mediaGroups.AUDIO||!t)return null;var i=e.mediaGroups.AUDIO[t];if(!i)return null;for(var s in i){var r=i[s];if(r.default&&r.playlists)return G(r.playlists[0].attributes.CODECS)}return null},ie=function(e){return e===void 0&&(e=""),L.video.test(e.trim().toLowerCase())},se=function(e){return e===void 0&&(e=""),L.audio.test(e.trim().toLowerCase())},Te=function(e){return e===void 0&&(e=""),L.text.test(e.trim().toLowerCase())},Me=function(e){if(!(!e||typeof e!="string")){var t=e.toLowerCase().split(",").map(function(r){return de(r.trim())}),i="video";t.length===1&&se(t[0])?i="audio":t.length===1&&Te(t[0])&&(i="application");var s="mp4";return t.every(function(r){return L.mp4.test(r)})?s="mp4":t.every(function(r){return L.webm.test(r)})?s="webm":t.every(function(r){return L.ogg.test(r)})&&(s="ogg"),i+"/"+s+';codecs="'+e+'"'}},ze=function(e,t){return e===void 0&&(e=""),t===void 0&&(t=!1),A().MediaSource&&A().MediaSource.isTypeSupported&&A().MediaSource.isTypeSupported(Me(e))||t&&A().ManagedMediaSource&&A().ManagedMediaSource.isTypeSupported&&A().ManagedMediaSource.isTypeSupported(Me(e))||!1},je=function(e){return e===void 0&&(e=""),e.toLowerCase().split(",").every(function(t){t=t.trim();for(var i=0;i<ce.length;i++){var s=ce[i];if(L["muxer"+s].test(t))return!0}return!1})},Be="mp4a.40.2",_t="avc1.4d400d",Dt=/^(audio|video|application)\/(x-|vnd\.apple\.)?mpegurl/i,pt=/^application\/dash\+xml/i,Ct=function(e){return Dt.test(e)?"hls":pt.test(e)?"dash":e==="application/vnd.videojs.vhs+json"?"vhs-json":null},Wt=function(e,t){for(var i="";t--;)i+=e;return i},gi=function(e){return e.toString(2).length},Sn=function(e){return Math.ceil(gi(e)/8)},$e=function(e,t,i){return i===void 0&&(i=" "),(Wt(i,t)+e.toString()).slice(-t)},Et=function(e){return ArrayBuffer.isView==="function"?ArrayBuffer.isView(e):e&&e.buffer instanceof ArrayBuffer},li=function(e){return Et(e)},pe=function(e){return e instanceof Uint8Array?e:(!Array.isArray(e)&&!li(e)&&!(e instanceof ArrayBuffer)&&(typeof e!="number"||typeof e=="number"&&e!==e?e=0:e=[e]),new Uint8Array(e&&e.buffer||e,e&&e.byteOffset||0,e&&e.byteLength||0))},as=function(e){e=pe(e);for(var t="",i=0;i<e.length;i++)t+=$e(e[i].toString(16),2,"0");return t},os=function(e){e=pe(e);for(var t="",i=0;i<e.length;i++)t+=$e(e[i].toString(2),8,"0");return t},st=A().BigInt||Number,wi=[st("0x1"),st("0x100"),st("0x10000"),st("0x1000000"),st("0x100000000"),st("0x10000000000"),st("0x1000000000000"),st("0x100000000000000"),st("0x10000000000000000")],tt=function(){var n=new Uint16Array([65484]),e=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);return e[0]===255?"big":e[0]===204?"little":"unknown"}(),Pt=tt==="big",Jt=tt==="little",Zt=function(e,t){var i=t===void 0?{}:t,s=i.signed,r=s===void 0?!1:s,a=i.le,l=a===void 0?!1:a;e=pe(e);var d=l?"reduce":"reduceRight",p=e[d]?e[d]:Array.prototype[d],g=p.call(e,function(B,D,P){var b=l?P:Math.abs(P+1-e.length);return B+st(D)*wi[b]},st(0));if(r){var y=wi[e.length]/st(2)-st(1);g=st(g),g>y&&(g-=y,g-=y,g-=st(2))}return Number(g)},ls=function(e,t){var i=t===void 0?{}:t,s=i.le,r=s===void 0?!1:s;(typeof e!="bigint"&&typeof e!="number"||typeof e=="number"&&e!==e)&&(e=0),e=st(e);for(var a=Sn(e),l=new Uint8Array(new ArrayBuffer(a)),d=0;d<a;d++){var p=r?d:Math.abs(d+1-l.length);l[p]=Number(e/wi[d]&st(255)),e<0&&(l[p]=Math.abs(~l[p]),l[p]-=d===0?1:2)}return l},Zs=function(e){if(!e)return"";e=Array.prototype.slice.call(e);var t=String.fromCharCode.apply(null,pe(e));try{return decodeURIComponent(escape(t))}catch(i){}return t},us=function(e,t){if(typeof e!="string"&&e&&typeof e.toString=="function"&&(e=e.toString()),typeof e!="string")return new Uint8Array;t||(e=unescape(encodeURIComponent(e)));for(var i=new Uint8Array(e.length),s=0;s<e.length;s++)i[s]=e.charCodeAt(s);return i},Ta=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];if(t=t.filter(function(l){return l&&(l.byteLength||l.length)&&typeof l!="string"}),t.length<=1)return pe(t[0]);var s=t.reduce(function(l,d,p){return l+(d.byteLength||d.length)},0),r=new Uint8Array(s),a=0;return t.forEach(function(l){l=pe(l),r.set(l,a),a+=l.byteLength}),r},it=function(e,t,i){var s=i===void 0?{}:i,r=s.offset,a=r===void 0?0:r,l=s.mask,d=l===void 0?[]:l;e=pe(e),t=pe(t);var p=t.every?t.every:Array.prototype.every;return t.length&&e.length-a>=t.length&&p.call(t,function(g,y){var B=d[y]?d[y]&e[a+y]:e[a+y];return g===B})},Ca=function(e,t,i){return Uint8Array.prototype.slice?Uint8Array.prototype.slice.call(e,t,i):new Uint8Array(Array.prototype.slice.call(e,t,i))},cs=function(e){return e.reverse?e.reverse():Array.prototype.reverse.call(e)},xa=function(e,t,i){t.forEach(function(s){for(var r in e.mediaGroups[s])for(var a in e.mediaGroups[s][r]){var l=e.mediaGroups[s][r][a];i(l,s,r,a)}})},Di=W(28978);/*! @name mpd-parser @version 1.3.0 @license Apache-2.0 */var ds="1.3.0";const qi=n=>!!n&&typeof n=="object",mt=(...n)=>n.reduce((e,t)=>(typeof t!="object"||Object.keys(t).forEach(i=>{Array.isArray(e[i])&&Array.isArray(t[i])?e[i]=e[i].concat(t[i]):qi(e[i])&&qi(t[i])?e[i]=mt(e[i],t[i]):e[i]=t[i]}),e),{}),jn=n=>Object.keys(n).map(e=>n[e]),hs=(n,e)=>{const t=[];for(let i=n;i<e;i++)t.push(i);return t},ui=n=>n.reduce((e,t)=>e.concat(t),[]),fs=n=>{if(!n.length)return[];const e=[];for(let t=0;t<n.length;t++)e.push(n[t]);return e},er=(n,e)=>n.reduce((t,i,s)=>(i[e]&&t.push(s),t),[]),ps=(n,e)=>jn(n.reduce((t,i)=>(i.forEach(s=>{t[e(s)]=s}),t),{}));var ci={INVALID_NUMBER_OF_PERIOD:"INVALID_NUMBER_OF_PERIOD",INVALID_NUMBER_OF_CONTENT_STEERING:"INVALID_NUMBER_OF_CONTENT_STEERING",DASH_EMPTY_MANIFEST:"DASH_EMPTY_MANIFEST",DASH_INVALID_XML:"DASH_INVALID_XML",NO_BASE_URL:"NO_BASE_URL",MISSING_SEGMENT_INFORMATION:"MISSING_SEGMENT_INFORMATION",SEGMENT_TIME_UNSPECIFIED:"SEGMENT_TIME_UNSPECIFIED",UNSUPPORTED_UTC_TIMING_SCHEME:"UNSUPPORTED_UTC_TIMING_SCHEME"};const ki=({baseUrl:n="",source:e="",range:t="",indexRange:i=""})=>{const s={uri:e,resolvedUri:Pe(n||"",e)};if(t||i){const a=(t||i).split("-");let l=A().BigInt?A().BigInt(a[0]):parseInt(a[0],10),d=A().BigInt?A().BigInt(a[1]):parseInt(a[1],10);l<Number.MAX_SAFE_INTEGER&&typeof l=="bigint"&&(l=Number(l)),d<Number.MAX_SAFE_INTEGER&&typeof d=="bigint"&&(d=Number(d));let p;typeof d=="bigint"||typeof l=="bigint"?p=A().BigInt(d)-A().BigInt(l)+A().BigInt(1):p=d-l+1,typeof p=="bigint"&&p<Number.MAX_SAFE_INTEGER&&(p=Number(p)),s.byterange={length:p,offset:l}}return s},tr=n=>{let e;return typeof n.offset=="bigint"||typeof n.length=="bigint"?e=A().BigInt(n.offset)+A().BigInt(n.length)-A().BigInt(1):e=n.offset+n.length-1,`${n.offset}-${e}`},ms=n=>(n&&typeof n!="number"&&(n=parseInt(n,10)),isNaN(n)?null:n),ir={static(n){const{duration:e,timescale:t=1,sourceDuration:i,periodDuration:s}=n,r=ms(n.endNumber),a=e/t;return typeof r=="number"?{start:0,end:r}:typeof s=="number"?{start:0,end:s/a}:{start:0,end:i/a}},dynamic(n){const{NOW:e,clientOffset:t,availabilityStartTime:i,timescale:s=1,duration:r,periodStart:a=0,minimumUpdatePeriod:l=0,timeShiftBufferDepth:d=1/0}=n,p=ms(n.endNumber),g=(e+t)/1e3,y=i+a,D=g+l-y,P=Math.ceil(D*s/r),b=Math.floor((g-y-d)*s/r),U=Math.floor((g-y)*s/r);return{start:Math.max(0,b),end:typeof p=="number"?p:Math.min(P,U)}}},gs=n=>e=>{const{duration:t,timescale:i=1,periodStart:s,startNumber:r=1}=n;return{number:r+e,duration:t/i,timeline:s,time:e*t}},vi=n=>{const{type:e,duration:t,timescale:i=1,periodDuration:s,sourceDuration:r}=n,{start:a,end:l}=ir[e](n),d=hs(a,l).map(gs(n));if(e==="static"){const p=d.length-1,g=typeof s=="number"?s:r;d[p].duration=g-t/i*p}return d},vs=n=>{const{baseUrl:e,initialization:t={},sourceDuration:i,indexRange:s="",periodStart:r,presentationTime:a,number:l=0,duration:d}=n;if(!e)throw new Error(ci.NO_BASE_URL);const p=ki({baseUrl:e,source:t.sourceURL,range:t.range}),g=ki({baseUrl:e,source:e,indexRange:s});if(g.map=p,d){const y=vi(n);y.length&&(g.duration=y[0].duration,g.timeline=y[0].timeline)}else i&&(g.duration=i,g.timeline=r);return g.presentationTime=a||r,g.number=l,[g]},nn=(n,e,t)=>{const i=n.sidx.map?n.sidx.map:null,s=n.sidx.duration,r=n.timeline||0,a=n.sidx.byterange,l=a.offset+a.length,d=e.timescale,p=e.references.filter(U=>U.referenceType!==1),g=[],y=n.endList?"static":"dynamic",B=n.sidx.timeline;let D=B,P=n.mediaSequence||0,b;typeof e.firstOffset=="bigint"?b=A().BigInt(l)+e.firstOffset:b=l+e.firstOffset;for(let U=0;U<p.length;U++){const H=e.references[U],F=H.referencedSize,N=H.subsegmentDuration;let Y;typeof b=="bigint"?Y=b+A().BigInt(F)-A().BigInt(1):Y=b+F-1;const O=`${b}-${Y}`,be=vs({baseUrl:t,timescale:d,timeline:r,periodStart:B,presentationTime:D,number:P,duration:N,sourceDuration:s,indexRange:O,type:y})[0];i&&(be.map=i),g.push(be),typeof b=="bigint"?b+=A().BigInt(F):b+=F,D+=N/d,P++}return n.segments=g,n},nr=["AUDIO","SUBTITLES"],_l=1/60,v=n=>ps(n,({timeline:e})=>e).sort((e,t)=>e.timeline>t.timeline?1:-1),_=(n,e)=>{for(let t=0;t<n.length;t++)if(n[t].attributes.NAME===e)return n[t];return null},w=n=>{let e=[];return xa(n,nr,(t,i,s,r)=>{e=e.concat(t.playlists||[])}),e},V=({playlist:n,mediaSequence:e})=>{n.mediaSequence=e,n.segments.forEach((t,i)=>{t.number=n.mediaSequence+i})},oe=({oldPlaylists:n,newPlaylists:e,timelineStarts:t})=>{e.forEach(i=>{i.discontinuitySequence=t.findIndex(function({timeline:d}){return d===i.timeline});const s=_(n,i.attributes.NAME);if(!s||i.sidx)return;const r=i.segments[0],a=s.segments.findIndex(function(d){return Math.abs(d.presentationTime-r.presentationTime)<_l});if(a===-1){V({playlist:i,mediaSequence:s.mediaSequence+s.segments.length}),i.segments[0].discontinuity=!0,i.discontinuityStarts.unshift(0),(!s.segments.length&&i.timeline>s.timeline||s.segments.length&&i.timeline>s.segments[s.segments.length-1].timeline)&&i.discontinuitySequence--;return}s.segments[a].discontinuity&&!r.discontinuity&&(r.discontinuity=!0,i.discontinuityStarts.unshift(0),i.discontinuitySequence--),V({playlist:i,mediaSequence:s.segments[a].number})})},Le=({oldManifest:n,newManifest:e})=>{const t=n.playlists.concat(w(n)),i=e.playlists.concat(w(e));return e.timelineStarts=v([n.timelineStarts,e.timelineStarts]),oe({oldPlaylists:t,newPlaylists:i,timelineStarts:e.timelineStarts}),e},Ge=n=>n&&n.uri+"-"+tr(n.byterange),xt=n=>{const e=n.reduce(function(i,s){return i[s.attributes.baseUrl]||(i[s.attributes.baseUrl]=[]),i[s.attributes.baseUrl].push(s),i},{});let t=[];return Object.values(e).forEach(i=>{const s=jn(i.reduce((r,a)=>{const l=a.attributes.id+(a.attributes.lang||"");return r[l]?(a.segments&&(a.segments[0]&&(a.segments[0].discontinuity=!0),r[l].segments.push(...a.segments)),a.attributes.contentProtection&&(r[l].attributes.contentProtection=a.attributes.contentProtection)):(r[l]=a,r[l].attributes.timelineStarts=[]),r[l].attributes.timelineStarts.push({start:a.attributes.periodStart,timeline:a.attributes.periodStart}),r},{}));t=t.concat(s)}),t.map(i=>(i.discontinuityStarts=er(i.segments||[],"discontinuity"),i))},$t=(n,e)=>{const t=Ge(n.sidx),i=t&&e[t]&&e[t].sidx;return i&&nn(n,i,n.sidx.resolvedUri),n},Gt=(n,e={})=>{if(!Object.keys(e).length)return n;for(const t in n)n[t]=$t(n[t],e);return n},di=({attributes:n,segments:e,sidx:t,mediaSequence:i,discontinuitySequence:s,discontinuityStarts:r},a)=>{const l={attributes:{NAME:n.id,BANDWIDTH:n.bandwidth,CODECS:n.codecs,"PROGRAM-ID":1},uri:"",endList:n.type==="static",timeline:n.periodStart,resolvedUri:n.baseUrl||"",targetDuration:n.duration,discontinuitySequence:s,discontinuityStarts:r,timelineStarts:n.timelineStarts,mediaSequence:i,segments:e};return n.contentProtection&&(l.contentProtection=n.contentProtection),n.serviceLocation&&(l.attributes.serviceLocation=n.serviceLocation),t&&(l.sidx=t),a&&(l.attributes.AUDIO="audio",l.attributes.SUBTITLES="subs"),l},Ii=({attributes:n,segments:e,mediaSequence:t,discontinuityStarts:i,discontinuitySequence:s})=>{typeof e=="undefined"&&(e=[{uri:n.baseUrl,timeline:n.periodStart,resolvedUri:n.baseUrl||"",duration:n.sourceDuration,number:0}],n.duration=n.sourceDuration);const r={NAME:n.id,BANDWIDTH:n.bandwidth,"PROGRAM-ID":1};n.codecs&&(r.CODECS=n.codecs);const a={attributes:r,uri:"",endList:n.type==="static",timeline:n.periodStart,resolvedUri:n.baseUrl||"",targetDuration:n.duration,timelineStarts:n.timelineStarts,discontinuityStarts:i,discontinuitySequence:s,mediaSequence:t,segments:e};return n.serviceLocation&&(a.attributes.serviceLocation=n.serviceLocation),a},Pi=(n,e={},t=!1)=>{let i;const s=n.reduce((r,a)=>{const l=a.attributes.role&&a.attributes.role.value||"",d=a.attributes.lang||"";let p=a.attributes.label||"main";if(d&&!a.attributes.label){const y=l?` (${l})`:"";p=`${a.attributes.lang}${y}`}r[p]||(r[p]={language:d,autoselect:!0,default:l==="main",playlists:[],uri:""});const g=$t(di(a,t),e);return r[p].playlists.push(g),typeof i=="undefined"&&l==="main"&&(i=a,i.default=!0),r},{});if(!i){const r=Object.keys(s)[0];s[r].default=!0}return s},Oi=(n,e={})=>n.reduce((t,i)=>{const s=i.attributes.label||i.attributes.lang||"text";return t[s]||(t[s]={language:s,default:!1,autoselect:!1,playlists:[],uri:""}),t[s].playlists.push($t(Ii(i),e)),t},{}),ei=n=>n.reduce((e,t)=>(t&&t.forEach(i=>{const{channel:s,language:r}=i;e[r]={autoselect:!1,default:!1,instreamId:s,language:r},i.hasOwnProperty("aspectRatio")&&(e[r].aspectRatio=i.aspectRatio),i.hasOwnProperty("easyReader")&&(e[r].easyReader=i.easyReader),i.hasOwnProperty("3D")&&(e[r]["3D"]=i["3D"])}),e),{}),Li=({attributes:n,segments:e,sidx:t,discontinuityStarts:i})=>{const s={attributes:{NAME:n.id,AUDIO:"audio",SUBTITLES:"subs",RESOLUTION:{width:n.width,height:n.height},CODECS:n.codecs,BANDWIDTH:n.bandwidth,"PROGRAM-ID":1},uri:"",endList:n.type==="static",timeline:n.periodStart,resolvedUri:n.baseUrl||"",targetDuration:n.duration,discontinuityStarts:i,timelineStarts:n.timelineStarts,segments:e};return n.frameRate&&(s.attributes["FRAME-RATE"]=n.frameRate),n.contentProtection&&(s.contentProtection=n.contentProtection),n.serviceLocation&&(s.attributes.serviceLocation=n.serviceLocation),t&&(s.sidx=t),s},sn=({attributes:n})=>n.mimeType==="video/mp4"||n.mimeType==="video/webm"||n.contentType==="video",St=({attributes:n})=>n.mimeType==="audio/mp4"||n.mimeType==="audio/webm"||n.contentType==="audio",sr=({attributes:n})=>n.mimeType==="text/vtt"||n.contentType==="text",Wi=(n,e)=>{n.forEach(t=>{t.mediaSequence=0,t.discontinuitySequence=e.findIndex(function({timeline:i}){return i===t.timeline}),t.segments&&t.segments.forEach((i,s)=>{i.number=s})})},As=n=>n?Object.keys(n).reduce((e,t)=>{const i=n[t];return e.concat(i.playlists)},[]):[],Fh=({dashPlaylists:n,locations:e,contentSteering:t,sidxMapping:i={},previousManifest:s,eventStream:r})=>{if(!n.length)return{};const{sourceDuration:a,type:l,suggestedPresentationDelay:d,minimumUpdatePeriod:p}=n[0].attributes,g=xt(n.filter(sn)).map(Li),y=xt(n.filter(St)),B=xt(n.filter(sr)),D=n.map(Y=>Y.attributes.captionServices).filter(Boolean),P={allowCache:!0,discontinuityStarts:[],segments:[],endList:!0,mediaGroups:{AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},uri:"",duration:a,playlists:Gt(g,i)};p>=0&&(P.minimumUpdatePeriod=p*1e3),e&&(P.locations=e),t&&(P.contentSteering=t),l==="dynamic"&&(P.suggestedPresentationDelay=d),r&&r.length>0&&(P.eventStream=r);const b=P.playlists.length===0,U=y.length?Pi(y,i,b):null,H=B.length?Oi(B,i):null,F=g.concat(As(U),As(H)),N=F.map(({timelineStarts:Y})=>Y);return P.timelineStarts=v(N),Wi(F,P.timelineStarts),U&&(P.mediaGroups.AUDIO.audio=U),H&&(P.mediaGroups.SUBTITLES.subs=H),D.length&&(P.mediaGroups["CLOSED-CAPTIONS"].cc=ei(D)),s?Le({oldManifest:s,newManifest:P}):P},Uh=(n,e,t)=>{const{NOW:i,clientOffset:s,availabilityStartTime:r,timescale:a=1,periodStart:l=0,minimumUpdatePeriod:d=0}=n,p=(i+s)/1e3,g=r+l,B=p+d-g;return Math.ceil((B*a-e)/t)},bl=(n,e)=>{const{type:t,minimumUpdatePeriod:i=0,media:s="",sourceDuration:r,timescale:a=1,startNumber:l=1,periodStart:d}=n,p=[];let g=-1;for(let y=0;y<e.length;y++){const B=e[y],D=B.d,P=B.r||0,b=B.t||0;g<0&&(g=b),b&&b>g&&(g=b);let U;if(P<0){const N=y+1;N===e.length?t==="dynamic"&&i>0&&s.indexOf("$Number$")>0?U=Uh(n,g,D):U=(r*a-g)/D:U=(e[N].t-g)/D}else U=P+1;const H=l+p.length+U;let F=l+p.length;for(;F<H;)p.push({number:F,duration:D/a,time:g,timeline:d}),g+=D,F++}return p},Vh=/\$([A-z]*)(?:(%0)([0-9]+)d)?\$/g,zh=n=>(e,t,i,s)=>{if(e==="$$")return"$";if(typeof n[t]=="undefined")return e;const r=""+n[t];return t==="RepresentationID"||(i?s=parseInt(s,10):s=1,r.length>=s)?r:`${new Array(s-r.length+1).join("0")}${r}`},El=(n,e)=>n.replace(Vh,zh(e)),Hh=(n,e)=>!n.duration&&!e?[{number:n.startNumber||1,duration:n.sourceDuration,time:0,timeline:n.periodStart}]:n.duration?vi(n):bl(n,e),qh=(n,e)=>{const t={RepresentationID:n.id,Bandwidth:n.bandwidth||0},{initialization:i={sourceURL:"",range:""}}=n,s=ki({baseUrl:n.baseUrl,source:El(i.sourceURL,t),range:i.range});return Hh(n,e).map(a=>{t.Number=a.number,t.Time=a.time;const l=El(n.media||"",t),d=n.timescale||1,p=n.presentationTimeOffset||0,g=n.periodStart+(a.time-p)/d;return{uri:l,timeline:a.timeline,duration:a.duration,resolvedUri:Pe(n.baseUrl||"",l),map:s,number:a.number,presentationTime:g}})},Wh=(n,e)=>{const{baseUrl:t,initialization:i={}}=n,s=ki({baseUrl:t,source:i.sourceURL,range:i.range}),r=ki({baseUrl:t,source:e.media,range:e.mediaRange});return r.map=s,r},$h=(n,e)=>{const{duration:t,segmentUrls:i=[],periodStart:s}=n;if(!t&&!e||t&&e)throw new Error(ci.SEGMENT_TIME_UNSPECIFIED);const r=i.map(d=>Wh(n,d));let a;return t&&(a=vi(n)),e&&(a=bl(n,e)),a.map((d,p)=>{if(r[p]){const g=r[p],y=n.timescale||1,B=n.presentationTimeOffset||0;return g.timeline=d.timeline,g.duration=d.duration,g.number=d.number,g.presentationTime=s+(d.time-B)/y,g}}).filter(d=>d)},Gh=({attributes:n,segmentInfo:e})=>{let t,i;e.template?(i=qh,t=mt(n,e.template)):e.base?(i=vs,t=mt(n,e.base)):e.list&&(i=$h,t=mt(n,e.list));const s={attributes:n};if(!i)return s;const r=i(t,e.segmentTimeline);if(t.duration){const{duration:a,timescale:l=1}=t;t.duration=a/l}else r.length?t.duration=r.reduce((a,l)=>Math.max(a,Math.ceil(l.duration)),0):t.duration=0;return s.attributes=t,s.segments=r,e.base&&t.indexRange&&(s.sidx=r[0],s.segments=[]),s},Yh=n=>n.map(Gh),lt=(n,e)=>fs(n.childNodes).filter(({tagName:t})=>t===e),ys=n=>n.textContent.trim(),Xh=n=>parseFloat(n.split("/").reduce((e,t)=>e/t)),Bn=n=>{const l=/P(?:(\d*)Y)?(?:(\d*)M)?(?:(\d*)D)?(?:T(?:(\d*)H)?(?:(\d*)M)?(?:([\d.]*)S)?)?/.exec(n);if(!l)return 0;const[d,p,g,y,B,D]=l.slice(1);return parseFloat(d||0)*31536e3+parseFloat(p||0)*2592e3+parseFloat(g||0)*86400+parseFloat(y||0)*3600+parseFloat(B||0)*60+parseFloat(D||0)},Kh=n=>(/^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/.test(n)&&(n+="Z"),Date.parse(n)),Tl={mediaPresentationDuration(n){return Bn(n)},availabilityStartTime(n){return Kh(n)/1e3},minimumUpdatePeriod(n){return Bn(n)},suggestedPresentationDelay(n){return Bn(n)},type(n){return n},timeShiftBufferDepth(n){return Bn(n)},start(n){return Bn(n)},width(n){return parseInt(n,10)},height(n){return parseInt(n,10)},bandwidth(n){return parseInt(n,10)},frameRate(n){return Xh(n)},startNumber(n){return parseInt(n,10)},timescale(n){return parseInt(n,10)},presentationTimeOffset(n){return parseInt(n,10)},duration(n){const e=parseInt(n,10);return isNaN(e)?Bn(n):e},d(n){return parseInt(n,10)},t(n){return parseInt(n,10)},r(n){return parseInt(n,10)},presentationTime(n){return parseInt(n,10)},DEFAULT(n){return n}},bt=n=>n&&n.attributes?fs(n.attributes).reduce((e,t)=>{const i=Tl[t.name]||Tl.DEFAULT;return e[t.name]=i(t.value),e},{}):{},Qh={"urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b":"org.w3.clearkey","urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed":"com.widevine.alpha","urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95":"com.microsoft.playready","urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb":"com.adobe.primetime","urn:mpeg:dash:mp4protection:2011":"mp4protection"},rr=(n,e)=>e.length?ui(n.map(function(t){return e.map(function(i){const s=ys(i),r=Pe(t.baseUrl,s),a=mt(bt(i),{baseUrl:r});return r!==s&&!a.serviceLocation&&t.serviceLocation&&(a.serviceLocation=t.serviceLocation),a})})):n,Sa=n=>{const e=lt(n,"SegmentTemplate")[0],t=lt(n,"SegmentList")[0],i=t&&lt(t,"SegmentURL").map(y=>mt({tag:"SegmentURL"},bt(y))),s=lt(n,"SegmentBase")[0],r=t||e,a=r&&lt(r,"SegmentTimeline")[0],l=t||s||e,d=l&&lt(l,"Initialization")[0],p=e&&bt(e);p&&d?p.initialization=d&&bt(d):p&&p.initialization&&(p.initialization={sourceURL:p.initialization});const g={template:p,segmentTimeline:a&&lt(a,"S").map(y=>bt(y)),list:t&&mt(bt(t),{segmentUrls:i,initialization:bt(d)}),base:s&&mt(bt(s),{initialization:bt(d)})};return Object.keys(g).forEach(y=>{g[y]||delete g[y]}),g},Jh=(n,e,t)=>i=>{const s=lt(i,"BaseURL"),r=rr(e,s),a=mt(n,bt(i)),l=Sa(i);return r.map(d=>({segmentInfo:mt(t,l),attributes:mt(a,d)}))},Zh=n=>n.reduce((e,t)=>{const i=bt(t);i.schemeIdUri&&(i.schemeIdUri=i.schemeIdUri.toLowerCase());const s=Qh[i.schemeIdUri];if(s){e[s]={attributes:i};const r=lt(t,"cenc:pssh")[0];if(r){const a=ys(r);e[s].pssh=a&&Re(a)}}return e},{}),ef=n=>{if(n.schemeIdUri==="urn:scte:dash:cc:cea-608:2015")return(typeof n.value!="string"?[]:n.value.split(";")).map(t=>{let i,s;return s=t,/^CC\d=/.test(t)?[i,s]=t.split("="):/^CC\d$/.test(t)&&(i=t),{channel:i,language:s}});if(n.schemeIdUri==="urn:scte:dash:cc:cea-708:2015")return(typeof n.value!="string"?[]:n.value.split(";")).map(t=>{const i={channel:void 0,language:void 0,aspectRatio:1,easyReader:0,"3D":0};if(/=/.test(t)){const[s,r=""]=t.split("=");i.channel=s,i.language=t,r.split(",").forEach(a=>{const[l,d]=a.split(":");l==="lang"?i.language=d:l==="er"?i.easyReader=Number(d):l==="war"?i.aspectRatio=Number(d):l==="3D"&&(i["3D"]=Number(d))})}else i.language=t;return i.channel&&(i.channel="SERVICE"+i.channel),i})},tf=n=>ui(lt(n.node,"EventStream").map(e=>{const t=bt(e),i=t.schemeIdUri;return lt(e,"Event").map(s=>{const r=bt(s),a=r.presentationTime||0,l=t.timescale||1,d=r.duration||0,p=a/l+n.attributes.start;return{schemeIdUri:i,value:t.value,id:r.id,start:p,end:p+d/l,messageData:ys(s)||r.messageData,contentEncoding:t.contentEncoding,presentationTimeOffset:t.presentationTimeOffset||0}})})),nf=(n,e,t)=>i=>{const s=bt(i),r=rr(e,lt(i,"BaseURL")),a=lt(i,"Role")[0],l={role:bt(a)};let d=mt(n,s,l);const p=lt(i,"Accessibility")[0],g=ef(bt(p));g&&(d=mt(d,{captionServices:g}));const y=lt(i,"Label")[0];if(y&&y.childNodes.length){const U=y.childNodes[0].nodeValue.trim();d=mt(d,{label:U})}const B=Zh(lt(i,"ContentProtection"));Object.keys(B).length&&(d=mt(d,{contentProtection:B}));const D=Sa(i),P=lt(i,"Representation"),b=mt(t,D);return ui(P.map(Jh(d,r,b)))},sf=(n,e)=>(t,i)=>{const s=rr(e,lt(t.node,"BaseURL")),r=mt(n,{periodStart:t.attributes.start});typeof t.attributes.duration=="number"&&(r.periodDuration=t.attributes.duration);const a=lt(t.node,"AdaptationSet"),l=Sa(t.node);return ui(a.map(nf(r,s,l)))},rf=(n,e)=>{if(n.length>1&&e({type:"warn",message:"The MPD manifest should contain no more than one ContentSteering tag"}),!n.length)return null;const t=mt({serverURL:ys(n[0])},bt(n[0]));return t.queryBeforeStart=t.queryBeforeStart==="true",t},af=({attributes:n,priorPeriodAttributes:e,mpdType:t})=>typeof n.start=="number"?n.start:e&&typeof e.start=="number"&&typeof e.duration=="number"?e.start+e.duration:!e&&t==="static"?0:null,of=(n,e={})=>{const{manifestUri:t="",NOW:i=Date.now(),clientOffset:s=0,eventHandler:r=function(){}}=e,a=lt(n,"Period");if(!a.length)throw new Error(ci.INVALID_NUMBER_OF_PERIOD);const l=lt(n,"Location"),d=bt(n),p=rr([{baseUrl:t}],lt(n,"BaseURL")),g=lt(n,"ContentSteering");d.type=d.type||"static",d.sourceDuration=d.mediaPresentationDuration||0,d.NOW=i,d.clientOffset=s,l.length&&(d.locations=l.map(ys));const y=[];return a.forEach((B,D)=>{const P=bt(B),b=y[D-1];P.start=af({attributes:P,priorPeriodAttributes:b?b.attributes:null,mpdType:d.type}),y.push({node:B,attributes:P})}),{locations:d.locations,contentSteeringInfo:rf(g,r),representationInfo:ui(y.map(sf(d,p))),eventStream:ui(y.map(tf))}},Cl=n=>{if(n==="")throw new Error(ci.DASH_EMPTY_MANIFEST);const e=new Di.DOMParser;let t,i;try{t=e.parseFromString(n,"application/xml"),i=t&&t.documentElement.tagName==="MPD"?t.documentElement:null}catch(s){}if(!i||i&&i.getElementsByTagName("parsererror").length>0)throw new Error(ci.DASH_INVALID_XML);return i},lf=n=>{const e=lt(n,"UTCTiming")[0];if(!e)return null;const t=bt(e);switch(t.schemeIdUri){case"urn:mpeg:dash:utc:http-head:2014":case"urn:mpeg:dash:utc:http-head:2012":t.method="HEAD";break;case"urn:mpeg:dash:utc:http-xsdate:2014":case"urn:mpeg:dash:utc:http-iso:2014":case"urn:mpeg:dash:utc:http-xsdate:2012":case"urn:mpeg:dash:utc:http-iso:2012":t.method="GET";break;case"urn:mpeg:dash:utc:direct:2014":case"urn:mpeg:dash:utc:direct:2012":t.method="DIRECT",t.value=Date.parse(t.value);break;case"urn:mpeg:dash:utc:http-ntp:2014":case"urn:mpeg:dash:utc:ntp:2014":case"urn:mpeg:dash:utc:sntp:2014":default:throw new Error(ci.UNSUPPORTED_UTC_TIMING_SCHEME)}return t},HA=null,uf=(n,e={})=>{const t=of(Cl(n),e),i=Yh(t.representationInfo);return Fh({dashPlaylists:i,locations:t.locations,contentSteering:t.contentSteeringInfo,sidxMapping:e.sidxMapping,previousManifest:e.previousManifest,eventStream:t.eventStream})},cf=n=>lf(Cl(n));var df=W(98962),hf=W.n(df),ff=pe([73,68,51]),pf=function(e,t){t===void 0&&(t=0),e=pe(e);var i=e[t+5],s=e[t+6]<<21|e[t+7]<<14|e[t+8]<<7|e[t+9],r=(i&16)>>4;return r?s+20:s+10},_s=function n(e,t){return t===void 0&&(t=0),e=pe(e),e.length-t<10||!it(e,ff,{offset:t})?t:(t+=pf(e,t),n(e,t))},qA=function(e){var t="",i=e[1]>>>3,s=e[1]&31,r=e[2]>>>7,a=(e[2]&64)>>6,l=(e[2]&32)>>5,d=(e[2]&16)>>4,p=(e[2]&8)>>3,g=(e[2]&4)>>2,y=e[2]&3;t+=i+"."+padStart(s,2,"0"),r===0?t+="M":r===1&&(t+="H");var B;return i===2&&a?B=l?12:10:B=a?10:8,t+="."+padStart(B,2,"0"),t+="."+d,t+="."+p+g+y,t},WA=function(e){var t=toHexString(e[1]),i=toHexString(e[2]&252),s=toHexString(e[3]);return""+t+i+s},$A=function(e){var t="",i=e[1]>>6,s=e[1]&31,r=(e[1]&32)>>5,a=e.subarray(2,6),l=e.subarray(6,12),d=e[12];i===1?t+="A":i===2?t+="B":i===3&&(t+="C"),t+=s+".";var p=parseInt(toBinaryString(a).split("").reverse().join(""),2);p>255&&(p=parseInt(toBinaryString(a),2)),t+=p.toString(16)+".",r===0?t+="L":t+="H",t+=d;for(var g="",y=0;y<l.length;y++){var B=l[y];B&&(g&&(g+="."),g+=B.toString(16))}return g&&(t+="."+g),t},GA=new Uint8Array([79,112,117,115,72,101,97,100]),YA=function(e){var t=new DataView(e.buffer,e.byteOffset,e.byteLength),i=t.getUint8(0),s=i!==0,r={version:i,channels:t.getUint8(1),preSkip:t.getUint16(2,s),sampleRate:t.getUint32(4,s),outputGain:t.getUint16(8,s),channelMappingFamily:t.getUint8(10)};if(r.channelMappingFamily>0&&e.length>10){r.streamCount=t.getUint8(11),r.twoChannelStreamCount=t.getUint8(12),r.channelMapping=[];for(var a=0;a<r.channels;a++)r.channelMapping.push(t.getUint8(13+a))}return r},XA=function(e){var t=e.channelMappingFamily<=0?11:12+e.channels,i=new DataView(new ArrayBuffer(t)),s=e.version!==0;return i.setUint8(0,e.version),i.setUint8(1,e.channels),i.setUint16(2,e.preSkip,s),i.setUint32(4,e.sampleRate,s),i.setUint16(8,e.outputGain,s),i.setUint8(10,e.channelMappingFamily),e.channelMappingFamily>0&&(i.setUint8(11,e.streamCount),e.channelMapping.foreach(function(r,a){i.setUint8(12+a,r)})),new Uint8Array(i.buffer)},ja=function(e){return typeof e=="string"?us(e):e},mf=function(e){return Array.isArray(e)?e.map(function(t){return ja(t)}):[ja(e)]},Ba,wa=function(e){e=pe(e);for(var t=[],i=0;e.length>i;){var s=e[i],r=0,a=0;a++;var l=e[a];for(a++;l&128;)r=(l&127)<<7,l=e[a],a++;r+=l&127;for(var d=0;d<Ba.length;d++){var p=Ba[d],g=p.id,y=p.parser;if(s===g){t.push(y(e.subarray(a,a+r)));break}}i+=r+a}return t};Ba=[{id:3,parser:function(e){var t={tag:3,id:e[0]<<8|e[1],flags:e[2],size:3,dependsOnEsId:0,ocrEsId:0,descriptors:[],url:""};if(t.flags&128&&(t.dependsOnEsId=e[t.size]<<8|e[t.size+1],t.size+=2),t.flags&64){var i=e[t.size];t.url=Zs(e.subarray(t.size+1,t.size+1+i)),t.size+=i}return t.flags&32&&(t.ocrEsId=e[t.size]<<8|e[t.size+1],t.size+=2),t.descriptors=wa(e.subarray(t.size))||[],t}},{id:4,parser:function(e){var t={tag:4,oti:e[0],streamType:e[1],bufferSize:e[2]<<16|e[3]<<8|e[4],maxBitrate:e[5]<<24|e[6]<<16|e[7]<<8|e[8],avgBitrate:e[9]<<24|e[10]<<16|e[11]<<8|e[12],descriptors:wa(e.subarray(13))};return t}},{id:5,parser:function(e){return{tag:5,bytes:e}}},{id:6,parser:function(e){return{tag:6,bytes:e}}}];var Ft=function n(e,t,i){i===void 0&&(i=!1),t=mf(t),e=pe(e);var s=[];if(!t.length)return s;for(var r=0;r<e.length;){var a=(e[r]<<24|e[r+1]<<16|e[r+2]<<8|e[r+3])>>>0,l=e.subarray(r+4,r+8);if(a===0)break;var d=r+a;if(d>e.length){if(i)break;d=e.length}var p=e.subarray(r+8,d);it(l,t[0])&&(t.length===1?s.push(p):s.push.apply(s,n(p,t.slice(1),i))),r=d}return s},wn=function(e,t){if(t=ja(t),!t.length)return e.subarray(e.length);for(var i=0;i<e.length;){if(bytesMatch(e.subarray(i,i+t.length),t)){var s=(e[i-4]<<24|e[i-3]<<16|e[i-2]<<8|e[i-1])>>>0,r=s>1?i+s:e.byteLength;return e.subarray(i+4,r)}i++}return e.subarray(e.length)},bs=function(e,t,i){t===void 0&&(t=4),i===void 0&&(i=function(d){return bytesToNumber(d)});var s=[];if(!e||!e.length)return s;for(var r=bytesToNumber(e.subarray(4,8)),a=8;r;a+=t,r--)s.push(i(e.subarray(a,a+t)));return s},gf=function(e,t){for(var i=bs(Ft(e,["stss"])[0]),s=bs(Ft(e,["stco"])[0]),r=bs(Ft(e,["stts"])[0],8,function(We){return{sampleCount:bytesToNumber(We.subarray(0,4)),sampleDelta:bytesToNumber(We.subarray(4,8))}}),a=bs(Ft(e,["stsc"])[0],12,function(We){return{firstChunk:bytesToNumber(We.subarray(0,4)),samplesPerChunk:bytesToNumber(We.subarray(4,8)),sampleDescriptionIndex:bytesToNumber(We.subarray(8,12))}}),l=Ft(e,["stsz"])[0],d=bs(l&&l.length&&l.subarray(4)||null),p=[],g=0;g<s.length;g++){for(var y=void 0,B=0;B<a.length;B++){var D=a[B],P=g+1>=D.firstChunk&&(B+1>=a.length||g+1<a[B+1].firstChunk);if(P){y=D.samplesPerChunk;break}}for(var b=s[g],U=0;U<y;U++){var H=d[p.length],F=!i.length;i.length&&i.indexOf(p.length+1)!==-1&&(F=!0);for(var N={keyframe:F,start:b,end:b+H},Y=0;Y<r.length;Y++){var O=r[Y],K=O.sampleCount,be=O.sampleDelta;if(p.length<=K){var Ee=p.length?p[p.length-1].timestamp:0;N.timestamp=Ee+be/t*1e3,N.duration=be;break}}p.push(N),b+=H}}return p},vf=function(e,t){var i=bytesToString(t.subarray(0,4));if(e.type==="video"?(e.info=e.info||{},e.info.width=t[28]<<8|t[29],e.info.height=t[30]<<8|t[31]):e.type==="audio"&&(e.info=e.info||{},e.info.channels=t[20]<<8|t[21],e.info.bitDepth=t[22]<<8|t[23],e.info.sampleRate=t[28]<<8|t[29]),i==="avc1"){var s=wn(t,"avcC");i+="."+getAvcCodec(s),e.info.avcC=s}else if(i==="hvc1"||i==="hev1")i+="."+getHvcCodec(wn(t,"hvcC"));else if(i==="mp4a"||i==="mp4v"){var r=wn(t,"esds"),a=wa(r.subarray(4))[0],l=a&&a.descriptors.filter(function(F){var N=F.tag;return N===4})[0];l?(i+="."+toHexString(l.oti),l.oti===64?i+="."+(l.descriptors[0].bytes[0]>>3).toString():l.oti===32?i+="."+l.descriptors[0].bytes[4].toString():l.oti===221&&(i="vorbis")):e.type==="audio"?i+=".40.2":i+=".20.9"}else if(i==="av01")i+="."+getAv1Codec(wn(t,"av1C"));else if(i==="vp09"){var d=wn(t,"vpcC"),p=d[0],g=d[1],y=d[2]>>4,B=(d[2]&15)>>1,D=(d[2]&15)>>3,P=d[3],b=d[4],U=d[5];i+="."+padStart(p,2,"0"),i+="."+padStart(g,2,"0"),i+="."+padStart(y,2,"0"),i+="."+padStart(B,2,"0"),i+="."+padStart(P,2,"0"),i+="."+padStart(b,2,"0"),i+="."+padStart(U,2,"0"),i+="."+padStart(D,2,"0")}else if(i==="theo")i="theora";else if(i==="spex")i="speex";else if(i===".mp3")i="mp4a.40.34";else if(i==="msVo")i="vorbis";else if(i==="Opus"){i="opus";var H=wn(t,"dOps");e.info.opus=parseOpusHead(H),e.info.codecDelay=65e5}else i=i.toLowerCase();e.codec=i},KA=function(e,t){t===void 0&&(t=!0),e=toUint8(e);var i=Ft(e,["moov","trak"],!0),s=[];return i.forEach(function(r){var a={bytes:r},l=Ft(r,["mdia"])[0],d=Ft(l,["hdlr"])[0],p=bytesToString(d.subarray(8,12));p==="soun"?a.type="audio":p==="vide"?a.type="video":a.type=p;var g=Ft(r,["tkhd"])[0];if(g){var y=new DataView(g.buffer,g.byteOffset,g.byteLength),B=y.getUint8(0);a.number=B===0?y.getUint32(12):y.getUint32(20)}var D=Ft(l,["mdhd"])[0];if(D){var P=D[0],b=P===0?12:20;a.timescale=(D[b]<<24|D[b+1]<<16|D[b+2]<<8|D[b+3])>>>0}for(var U=Ft(l,["minf","stbl"])[0],H=Ft(U,["stsd"])[0],F=bytesToNumber(H.subarray(4,8)),N=8;F--;){var Y=bytesToNumber(H.subarray(N,N+4)),O=H.subarray(N+4,N+4+Y);vf(a,O),N+=4+Y}t&&(a.frameTable=gf(U,a.timescale)),s.push(a)}),s},QA=function(e){var t=Ft(e,["moov","mvhd"],!0)[0];if(!(!t||!t.length)){var i={};return t[0]===1?(i.timestampScale=bytesToNumber(t.subarray(20,24)),i.duration=bytesToNumber(t.subarray(24,32))):(i.timestampScale=bytesToNumber(t.subarray(12,16)),i.duration=bytesToNumber(t.subarray(16,20))),i.bytes=t,i}},rt={EBML:pe([26,69,223,163]),DocType:pe([66,130]),Segment:pe([24,83,128,103]),SegmentInfo:pe([21,73,169,102]),Tracks:pe([22,84,174,107]),Track:pe([174]),TrackNumber:pe([215]),DefaultDuration:pe([35,227,131]),TrackEntry:pe([174]),TrackType:pe([131]),FlagDefault:pe([136]),CodecID:pe([134]),CodecPrivate:pe([99,162]),VideoTrack:pe([224]),AudioTrack:pe([225]),Cluster:pe([31,67,182,117]),Timestamp:pe([231]),TimestampScale:pe([42,215,177]),BlockGroup:pe([160]),BlockDuration:pe([155]),Block:pe([161]),SimpleBlock:pe([163])},Da=[128,64,32,16,8,4,2,1],Af=function(e){for(var t=1,i=0;i<Da.length&&!(e&Da[i]);i++)t++;return t},rn=function(e,t,i,s){i===void 0&&(i=!0),s===void 0&&(s=!1);var r=Af(e[t]),a=e.subarray(t,t+r);return i&&(a=Array.prototype.slice.call(e,t,t+r),a[0]^=Da[r-1]),{length:r,value:Zt(a,{signed:s}),bytes:a}},xl=function n(e){return typeof e=="string"?e.match(/.{1,2}/g).map(function(t){return n(t)}):typeof e=="number"?ls(e):e},yf=function(e){return Array.isArray(e)?e.map(function(t){return xl(t)}):[xl(e)]},_f=function n(e,t,i){if(i>=t.length)return t.length;var s=rn(t,i,!1);if(it(e.bytes,s.bytes))return i;var r=rn(t,i+s.length);return n(e,t,i+r.length+r.value+s.length)},dt=function n(e,t){t=yf(t),e=pe(e);var i=[];if(!t.length)return i;for(var s=0;s<e.length;){var r=rn(e,s,!1),a=rn(e,s+r.length),l=s+r.length+a.length;a.value===127&&(a.value=_f(r,e,l),a.value!==e.length&&(a.value-=l));var d=l+a.value>e.length?e.length:l+a.value,p=e.subarray(l,d);it(t[0],r.bytes)&&(t.length===1?i.push(p):i=i.concat(n(p,t.slice(1))));var g=r.length+a.length+p.length;s+=g}return i},bf=function(e,t,i,s){var r;t==="group"&&(r=dt(e,[rt.BlockDuration])[0],r&&(r=bytesToNumber(r),r=1/i*r*i/1e3),e=dt(e,[rt.Block])[0],t="block");var a=new DataView(e.buffer,e.byteOffset,e.byteLength),l=rn(e,0),d=a.getInt16(l.length,!1),p=e[l.length+2],g=e.subarray(l.length+3),y=1/i*(s+d)*i/1e3,B={duration:r,trackNumber:l.value,keyframe:t==="simple"&&p>>7===1,invisible:(p&8)>>3===1,lacing:(p&6)>>1,discardable:t==="simple"&&(p&1)===1,frames:[],pts:y,dts:y,timestamp:d};if(!B.lacing)return B.frames.push(g),B;var D=g[0]+1,P=[],b=1;if(B.lacing===2)for(var U=(g.length-b)/D,H=0;H<D;H++)P.push(U);if(B.lacing===1)for(var F=0;F<D-1;F++){var N=0;do N+=g[b],b++;while(g[b-1]===255);P.push(N)}if(B.lacing===3)for(var Y=0,O=0;O<D-1;O++){var K=O===0?rn(g,b):rn(g,b,!0,!0);Y+=K.value,P.push(Y),b+=K.length}return P.forEach(function(be){B.frames.push(g.subarray(b,b+be)),b+=be}),B},Ef=function(e){for(var t=0,i={};t<e.length;){var s=e[t]&127,r=e[t+1],a=void 0;r===1?a=e[t+2]:a=e.subarray(t+2,t+2+r),s===1?i.profile=a:s===2?i.level=a:s===3?i.bitDepth=a:s===4?i.chromaSubsampling=a:i[s]=a,t+=2+r}return i},Tf=function(e){e=toUint8(e);var t=[],i=dt(e,[rt.Segment,rt.Tracks,rt.Track]);return i.length||(i=dt(e,[rt.Tracks,rt.Track])),i.length||(i=dt(e,[rt.Track])),i.length?(i.forEach(function(s){var r=dt(s,rt.TrackType)[0];if(!(!r||!r.length)){if(r[0]===1)r="video";else if(r[0]===2)r="audio";else if(r[0]===17)r="subtitle";else return;var a={rawCodec:bytesToString(dt(s,[rt.CodecID])[0]),type:r,codecPrivate:dt(s,[rt.CodecPrivate])[0],number:bytesToNumber(dt(s,[rt.TrackNumber])[0]),defaultDuration:bytesToNumber(dt(s,[rt.DefaultDuration])[0]),default:dt(s,[rt.FlagDefault])[0],rawData:s},l="";if(/V_MPEG4\/ISO\/AVC/.test(a.rawCodec))l="avc1."+getAvcCodec(a.codecPrivate);else if(/V_MPEGH\/ISO\/HEVC/.test(a.rawCodec))l="hev1."+getHvcCodec(a.codecPrivate);else if(/V_MPEG4\/ISO\/ASP/.test(a.rawCodec))a.codecPrivate?l="mp4v.20."+a.codecPrivate[4].toString():l="mp4v.20.9";else if(/^V_THEORA/.test(a.rawCodec))l="theora";else if(/^V_VP8/.test(a.rawCodec))l="vp8";else if(/^V_VP9/.test(a.rawCodec))if(a.codecPrivate){var d=Ef(a.codecPrivate),p=d.profile,g=d.level,y=d.bitDepth,B=d.chromaSubsampling;l="vp09.",l+=padStart(p,2,"0")+".",l+=padStart(g,2,"0")+".",l+=padStart(y,2,"0")+".",l+=""+padStart(B,2,"0");var D=dt(s,[224,[85,176],[85,177]])[0]||[],P=dt(s,[224,[85,176],[85,185]])[0]||[],b=dt(s,[224,[85,176],[85,186]])[0]||[],U=dt(s,[224,[85,176],[85,187]])[0]||[];(D.length||P.length||b.length||U.length)&&(l+="."+padStart(U[0],2,"0"),l+="."+padStart(b[0],2,"0"),l+="."+padStart(D[0],2,"0"),l+="."+padStart(P[0],2,"0"))}else l="vp9";else/^V_AV1/.test(a.rawCodec)?l="av01."+getAv1Codec(a.codecPrivate):/A_ALAC/.test(a.rawCodec)?l="alac":/A_MPEG\/L2/.test(a.rawCodec)?l="mp2":/A_MPEG\/L3/.test(a.rawCodec)?l="mp3":/^A_AAC/.test(a.rawCodec)?a.codecPrivate?l="mp4a.40."+(a.codecPrivate[0]>>>3).toString():l="mp4a.40.2":/^A_AC3/.test(a.rawCodec)?l="ac-3":/^A_PCM/.test(a.rawCodec)?l="pcm":/^A_MS\/ACM/.test(a.rawCodec)?l="speex":/^A_EAC3/.test(a.rawCodec)?l="ec-3":/^A_VORBIS/.test(a.rawCodec)?l="vorbis":/^A_FLAC/.test(a.rawCodec)?l="flac":/^A_OPUS/.test(a.rawCodec)&&(l="opus");a.codec=l,t.push(a)}}),t.sort(function(s,r){return s.number-r.number})):t},JA=function(e,t){var i=[],s=dt(e,[rt.Segment])[0],r=dt(s,[rt.SegmentInfo,rt.TimestampScale])[0];r&&r.length?r=bytesToNumber(r):r=1e6;var a=dt(s,[rt.Cluster]);return t||(t=Tf(s)),a.forEach(function(l,d){var p=dt(l,[rt.SimpleBlock]).map(function(D){return{type:"simple",data:D}}),g=dt(l,[rt.BlockGroup]).map(function(D){return{type:"group",data:D}}),y=dt(l,[rt.Timestamp])[0]||0;y&&y.length&&(y=bytesToNumber(y));var B=p.concat(g).sort(function(D,P){return D.data.byteOffset-P.data.byteOffset});B.forEach(function(D,P){var b=bf(D.data,D.type,r,y);i.push(b)})}),{tracks:t,blocks:i}},Cf=pe([0,0,0,1]),xf=pe([0,0,1]),Sf=pe([0,0,3]),jf=function(e){for(var t=[],i=1;i<e.length-2;)it(e.subarray(i,i+3),Sf)&&(t.push(i+2),i++),i++;if(t.length===0)return e;var s=e.length-t.length,r=new Uint8Array(s),a=0;for(i=0;i<s;a++,i++)a===t[0]&&(a++,t.shift()),r[i]=e[a];return r},Sl=function(e,t,i,s){s===void 0&&(s=1/0),e=pe(e),i=[].concat(i);for(var r=0,a,l=0;r<e.length&&(l<s||a);){var d=void 0;if(it(e.subarray(r),Cf)?d=4:it(e.subarray(r),xf)&&(d=3),!d){r++;continue}if(l++,a)return jf(e.subarray(a,r));var p=void 0;t==="h264"?p=e[r+d]&31:t==="h265"&&(p=e[r+d]>>1&63),i.indexOf(p)!==-1&&(a=r+d),r+=d+(t==="h264"?1:2)}return e.subarray(0,0)},Bf=function(e,t,i){return Sl(e,"h264",t,i)},wf=function(e,t,i){return Sl(e,"h265",t,i)},Ot={webm:pe([119,101,98,109]),matroska:pe([109,97,116,114,111,115,107,97]),flac:pe([102,76,97,67]),ogg:pe([79,103,103,83]),ac3:pe([11,119]),riff:pe([82,73,70,70]),avi:pe([65,86,73]),wav:pe([87,65,86,69]),"3gp":pe([102,116,121,112,51,103]),mp4:pe([102,116,121,112]),fmp4:pe([115,116,121,112]),mov:pe([102,116,121,112,113,116]),moov:pe([109,111,111,118]),moof:pe([109,111,111,102])},Dn={aac:function(e){var t=_s(e);return it(e,[255,16],{offset:t,mask:[255,22]})},mp3:function(e){var t=_s(e);return it(e,[255,2],{offset:t,mask:[255,6]})},webm:function(e){var t=dt(e,[rt.EBML,rt.DocType])[0];return it(t,Ot.webm)},mkv:function(e){var t=dt(e,[rt.EBML,rt.DocType])[0];return it(t,Ot.matroska)},mp4:function(e){if(Dn["3gp"](e)||Dn.mov(e))return!1;if(it(e,Ot.mp4,{offset:4})||it(e,Ot.fmp4,{offset:4})||it(e,Ot.moof,{offset:4})||it(e,Ot.moov,{offset:4}))return!0},mov:function(e){return it(e,Ot.mov,{offset:4})},"3gp":function(e){return it(e,Ot["3gp"],{offset:4})},ac3:function(e){var t=_s(e);return it(e,Ot.ac3,{offset:t})},ts:function(e){if(e.length<189&&e.length>=1)return e[0]===71;for(var t=0;t+188<e.length&&t<188;){if(e[t]===71&&e[t+188]===71)return!0;t+=1}return!1},flac:function(e){var t=_s(e);return it(e,Ot.flac,{offset:t})},ogg:function(e){return it(e,Ot.ogg)},avi:function(e){return it(e,Ot.riff)&&it(e,Ot.avi,{offset:8})},wav:function(e){return it(e,Ot.riff)&&it(e,Ot.wav,{offset:8})},h264:function(e){return Bf(e,7,3).length},h265:function(e){return wf(e,[32,33],3).length}},ka=Object.keys(Dn).filter(function(n){return n!=="ts"&&n!=="h264"&&n!=="h265"}).concat(["ts","h264","h265"]);ka.forEach(function(n){var e=Dn[n];Dn[n]=function(t){return e(pe(t))}});var Df=Dn,Ia=function(e){e=pe(e);for(var t=0;t<ka.length;t++){var i=ka[t];if(Df[i](e))return i}return""},kf=function(e){return Ft(e,["moof"]).length>0},an=W(79622);/**
 * @license
 * Video.js 8.18.1 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/main/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/main/LICENSE>
 */var Pa="8.18.1";const Ri={},$i=function(n,e){return Ri[n]=Ri[n]||[],e&&(Ri[n]=Ri[n].concat(e)),Ri[n]},If=function(n,e){$i(n,e)},jl=function(n,e){const t=$i(n).indexOf(e);return t<=-1?!1:(Ri[n]=Ri[n].slice(),Ri[n].splice(t,1),!0)},Pf=function(n,e){$i(n,[].concat(e).map(t=>{const i=(...s)=>(jl(n,i),t(...s));return i}))},ar={prefixed:!0},or=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror","fullscreen"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror","-webkit-full-screen"]],Bl=or[0];let Es;for(let n=0;n<or.length;n++)if(or[n][1]in k()){Es=or[n];break}if(Es){for(let n=0;n<Es.length;n++)ar[Bl[n]]=Es[n];ar.prefixed=Es[0]!==Bl[0]}let Ut=[];const Of=(n,e,t)=>(i,s,r)=>{const a=e.levels[s],l=new RegExp(`^(${a})$`);let d=n;if(i!=="log"&&r.unshift(i.toUpperCase()+":"),t&&(d=`%c${n}`,r.unshift(t)),r.unshift(d+":"),Ut){Ut.push([].concat(r));const g=Ut.length-1e3;Ut.splice(0,g>0?g:0)}if(!A().console)return;let p=A().console[i];!p&&i==="debug"&&(p=A().console.info||A().console.log),!(!p||!a||!l.test(i))&&p[Array.isArray(r)?"apply":"call"](A().console,r)};function Oa(n,e=":",t=""){let i="info",s;function r(...a){s("log",i,a)}return s=Of(n,r,t),r.createLogger=(a,l,d)=>{const p=l!==void 0?l:e,g=d!==void 0?d:t,y=`${n} ${p} ${a}`;return Oa(y,p,g)},r.createNewLogger=(a,l,d)=>Oa(a,l,d),r.levels={all:"debug|log|warn|error",off:"",debug:"debug|log|warn|error",info:"log|warn|error",warn:"warn|error",error:"error",DEFAULT:i},r.level=a=>{if(typeof a=="string"){if(!r.levels.hasOwnProperty(a))throw new Error(`"${a}" in not a valid log level`);i=a}return i},r.history=()=>Ut?[].concat(Ut):[],r.history.filter=a=>(Ut||[]).filter(l=>new RegExp(`.*${a}.*`).test(l[0])),r.history.clear=()=>{Ut&&(Ut.length=0)},r.history.disable=()=>{Ut!==null&&(Ut.length=0,Ut=null)},r.history.enable=()=>{Ut===null&&(Ut=[])},r.error=(...a)=>s("error",i,a),r.warn=(...a)=>s("warn",i,a),r.debug=(...a)=>s("debug",i,a),r}const qe=Oa("VIDEOJS"),wl=qe.createLogger,Lf=Object.prototype.toString,Dl=function(n){return Ai(n)?Object.keys(n):[]};function kn(n,e){Dl(n).forEach(t=>e(n[t],t))}function kl(n,e,t=0){return Dl(n).reduce((i,s)=>e(i,n[s],s),t)}function Ai(n){return!!n&&typeof n=="object"}function In(n){return Ai(n)&&Lf.call(n)==="[object Object]"&&n.constructor===Object}function Ze(...n){const e={};return n.forEach(t=>{t&&kn(t,(i,s)=>{if(!In(i)){e[s]=i;return}In(e[s])||(e[s]={}),e[s]=Ze(e[s],i)})}),e}function Il(n={}){const e=[];for(const t in n)if(n.hasOwnProperty(t)){const i=n[t];e.push(i)}return e}function lr(n,e,t,i=!0){const s=a=>Object.defineProperty(n,e,{value:a,enumerable:!0,writable:!0}),r={configurable:!0,enumerable:!0,get(){const a=t();return s(a),a}};return i&&(r.set=s),Object.defineProperty(n,e,r)}var Rf=Object.freeze({__proto__:null,each:kn,reduce:kl,isObject:Ai,isPlain:In,merge:Ze,values:Il,defineLazyProperty:lr});let La=!1,Pl=null,yi=!1,Ol,Ll=!1,Pn=!1,On=!1,_i=!1,Ra=null,ur=null;const Nf=!!(A().cast&&A().cast.framework&&A().cast.framework.CastReceiverContext);let Rl=null,cr=!1,dr=!1,hr=!1,fr=!1,pr=!1,mr=!1,gr=!1;const Ts=!!(Ln()&&("ontouchstart"in A()||A().navigator.maxTouchPoints||A().DocumentTouch&&A().document instanceof A().DocumentTouch)),Gi=A().navigator&&A().navigator.userAgentData;if(Gi&&Gi.platform&&Gi.brands&&(yi=Gi.platform==="Android",Pn=!!Gi.brands.find(n=>n.brand==="Microsoft Edge"),On=!!Gi.brands.find(n=>n.brand==="Chromium"),_i=!Pn&&On,Ra=ur=(Gi.brands.find(n=>n.brand==="Chromium")||{}).version||null,dr=Gi.platform==="Windows"),!On){const n=A().navigator&&A().navigator.userAgent||"";La=/iPod/i.test(n),Pl=function(){const e=n.match(/OS (\d+)_/i);return e&&e[1]?e[1]:null}(),yi=/Android/i.test(n),Ol=function(){const e=n.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if(!e)return null;const t=e[1]&&parseFloat(e[1]),i=e[2]&&parseFloat(e[2]);return t&&i?parseFloat(e[1]+"."+e[2]):t||null}(),Ll=/Firefox/i.test(n),Pn=/Edg/i.test(n),On=/Chrome/i.test(n)||/CriOS/i.test(n),_i=!Pn&&On,Ra=ur=function(){const e=n.match(/(Chrome|CriOS)\/(\d+)/);return e&&e[2]?parseFloat(e[2]):null}(),Rl=function(){const e=/MSIE\s(\d+)\.\d/.exec(n);let t=e&&parseFloat(e[1]);return!t&&/Trident\/7.0/i.test(n)&&/rv:11.0/.test(n)&&(t=11),t}(),pr=/Tizen/i.test(n),mr=/Web0S/i.test(n),gr=pr||mr,cr=/Safari/i.test(n)&&!_i&&!yi&&!Pn&&!gr,dr=/Windows/i.test(n),hr=/iPad/i.test(n)||cr&&Ts&&!/iPhone/i.test(n),fr=/iPhone/i.test(n)&&!hr}const Lt=fr||hr||La,vr=(cr||Lt)&&!_i;var Nl=Object.freeze({__proto__:null,get IS_IPOD(){return La},get IOS_VERSION(){return Pl},get IS_ANDROID(){return yi},get ANDROID_VERSION(){return Ol},get IS_FIREFOX(){return Ll},get IS_EDGE(){return Pn},get IS_CHROMIUM(){return On},get IS_CHROME(){return _i},get CHROMIUM_VERSION(){return Ra},get CHROME_VERSION(){return ur},IS_CHROMECAST_RECEIVER:Nf,get IE_VERSION(){return Rl},get IS_SAFARI(){return cr},get IS_WINDOWS(){return dr},get IS_IPAD(){return hr},get IS_IPHONE(){return fr},get IS_TIZEN(){return pr},get IS_WEBOS(){return mr},get IS_SMART_TV(){return gr},TOUCH_ENABLED:Ts,IS_IOS:Lt,IS_ANY_SAFARI:vr});function Ml(n){return typeof n=="string"&&!!n.trim()}function Mf(n){if(n.indexOf(" ")>=0)throw new Error("class has illegal whitespace characters")}function Ln(){return k()===A().document}function Rn(n){return Ai(n)&&n.nodeType===1}function Fl(){try{return A().parent!==A().self}catch(n){return!0}}function Ul(n){return function(e,t){if(!Ml(e))return k()[n](null);Ml(t)&&(t=k().querySelector(t));const i=Rn(t)?t:k();return i[n]&&i[n](e)}}function Oe(n="div",e={},t={},i){const s=k().createElement(n);return Object.getOwnPropertyNames(e).forEach(function(r){const a=e[r];r==="textContent"?Yi(s,a):(s[r]!==a||r==="tabIndex")&&(s[r]=a)}),Object.getOwnPropertyNames(t).forEach(function(r){s.setAttribute(r,t[r])}),i&&Ma(s,i),s}function Yi(n,e){return typeof n.textContent=="undefined"?n.innerText=e:n.textContent=e,n}function Na(n,e){e.firstChild?e.insertBefore(n,e.firstChild):e.appendChild(n)}function Cs(n,e){return Mf(e),n.classList.contains(e)}function on(n,...e){return n.classList.add(...e.reduce((t,i)=>t.concat(i.split(/\s+/)),[])),n}function Ar(n,...e){return n?(n.classList.remove(...e.reduce((t,i)=>t.concat(i.split(/\s+/)),[])),n):(qe.warn("removeClass was called with an element that doesn't exist"),null)}function Vl(n,e,t){return typeof t=="function"&&(t=t(n,e)),typeof t!="boolean"&&(t=void 0),e.split(/\s+/).forEach(i=>n.classList.toggle(i,t)),n}function zl(n,e){Object.getOwnPropertyNames(e).forEach(function(t){const i=e[t];i===null||typeof i=="undefined"||i===!1?n.removeAttribute(t):n.setAttribute(t,i===!0?"":i)})}function Xi(n){const e={},t=["autoplay","controls","playsinline","loop","muted","default","defaultMuted"];if(n&&n.attributes&&n.attributes.length>0){const i=n.attributes;for(let s=i.length-1;s>=0;s--){const r=i[s].name;let a=i[s].value;t.includes(r)&&(a=a!==null),e[r]=a}}return e}function Hl(n,e){return n.getAttribute(e)}function Nn(n,e,t){n.setAttribute(e,t)}function yr(n,e){n.removeAttribute(e)}function ql(){k().body.focus(),k().onselectstart=function(){return!1}}function Wl(){k().onselectstart=function(){return!0}}function Mn(n){if(n&&n.getBoundingClientRect&&n.parentNode){const e=n.getBoundingClientRect(),t={};return["bottom","height","left","right","top","width"].forEach(i=>{e[i]!==void 0&&(t[i]=e[i])}),t.height||(t.height=parseFloat(Fn(n,"height"))),t.width||(t.width=parseFloat(Fn(n,"width"))),t}}function xs(n){if(!n||n&&!n.offsetParent)return{left:0,top:0,width:0,height:0};const e=n.offsetWidth,t=n.offsetHeight;let i=0,s=0;for(;n.offsetParent&&n!==k()[ar.fullscreenElement];)i+=n.offsetLeft,s+=n.offsetTop,n=n.offsetParent;return{left:i,top:s,width:e,height:t}}function _r(n,e){const t={x:0,y:0};if(Lt){let g=n;for(;g&&g.nodeName.toLowerCase()!=="html";){const y=Fn(g,"transform");if(/^matrix/.test(y)){const B=y.slice(7,-1).split(/,\s/).map(Number);t.x+=B[4],t.y+=B[5]}else if(/^matrix3d/.test(y)){const B=y.slice(9,-1).split(/,\s/).map(Number);t.x+=B[12],t.y+=B[13]}if(g.assignedSlot&&g.assignedSlot.parentElement&&A().WebKitCSSMatrix){const B=A().getComputedStyle(g.assignedSlot.parentElement).transform,D=new(A()).WebKitCSSMatrix(B);t.x+=D.m41,t.y+=D.m42}g=g.parentNode||g.host}}const i={},s=xs(e.target),r=xs(n),a=r.width,l=r.height;let d=e.offsetY-(r.top-s.top),p=e.offsetX-(r.left-s.left);return e.changedTouches&&(p=e.changedTouches[0].pageX-r.left,d=e.changedTouches[0].pageY+r.top,Lt&&(p-=t.x,d-=t.y)),i.y=1-Math.max(0,Math.min(1,d/l)),i.x=Math.max(0,Math.min(1,p/a)),i}function $l(n){return Ai(n)&&n.nodeType===3}function br(n){for(;n.firstChild;)n.removeChild(n.firstChild);return n}function Gl(n){return typeof n=="function"&&(n=n()),(Array.isArray(n)?n:[n]).map(e=>{if(typeof e=="function"&&(e=e()),Rn(e)||$l(e))return e;if(typeof e=="string"&&/\S/.test(e))return k().createTextNode(e)}).filter(e=>e)}function Ma(n,e){return Gl(e).forEach(t=>n.appendChild(t)),n}function Yl(n,e){return Ma(br(n),e)}function Ss(n){return n.button===void 0&&n.buttons===void 0||n.button===0&&n.buttons===void 0||n.type==="mouseup"&&n.button===0&&n.buttons===0||n.type==="mousedown"&&n.button===0&&n.buttons===0?!0:!(n.button!==0||n.buttons!==1)}const Ki=Ul("querySelector"),Xl=Ul("querySelectorAll");function Fn(n,e){if(!n||!e)return"";if(typeof A().getComputedStyle=="function"){let t;try{t=A().getComputedStyle(n)}catch(i){return""}return t?t.getPropertyValue(e)||t[e]:""}return""}function Kl(n){[...k().styleSheets].forEach(e=>{try{const t=[...e.cssRules].map(s=>s.cssText).join(""),i=k().createElement("style");i.textContent=t,n.document.head.appendChild(i)}catch(t){const i=k().createElement("link");i.rel="stylesheet",i.type=e.type,i.media=e.media.mediaText,i.href=e.href,n.document.head.appendChild(i)}})}var Ql=Object.freeze({__proto__:null,isReal:Ln,isEl:Rn,isInFrame:Fl,createEl:Oe,textContent:Yi,prependTo:Na,hasClass:Cs,addClass:on,removeClass:Ar,toggleClass:Vl,setAttributes:zl,getAttributes:Xi,getAttribute:Hl,setAttribute:Nn,removeAttribute:yr,blockTextSelection:ql,unblockTextSelection:Wl,getBoundingClientRect:Mn,findPosition:xs,getPointerPosition:_r,isTextNode:$l,emptyEl:br,normalizeContent:Gl,appendContent:Ma,insertContent:Yl,isSingleLeftClick:Ss,$:Ki,$$:Xl,computedStyle:Fn,copyStyleSheetsToWindow:Kl});let Jl=!1,Fa;const Ff=function(){if(Fa.options.autoSetup===!1)return;const n=Array.prototype.slice.call(k().getElementsByTagName("video")),e=Array.prototype.slice.call(k().getElementsByTagName("audio")),t=Array.prototype.slice.call(k().getElementsByTagName("video-js")),i=n.concat(e,t);if(i&&i.length>0)for(let s=0,r=i.length;s<r;s++){const a=i[s];if(a&&a.getAttribute)a.player===void 0&&a.getAttribute("data-setup")!==null&&Fa(a);else{Ua(1);break}}else Jl||Ua(1)};function Ua(n,e){Ln()&&(e&&(Fa=e),A().setTimeout(Ff,n))}function Va(){Jl=!0,A().removeEventListener("load",Va)}Ln()&&(k().readyState==="complete"?Va():A().addEventListener("load",Va));const Zl=function(n){const e=k().createElement("style");return e.className=n,e},eu=function(n,e){n.styleSheet?n.styleSheet.cssText=e:n.textContent=e};var Rt=new WeakMap;let Uf=3;function ti(){return Uf++}function tu(n,e){if(!Rt.has(n))return;const t=Rt.get(n);t.handlers[e].length===0&&(delete t.handlers[e],n.removeEventListener?n.removeEventListener(e,t.dispatcher,!1):n.detachEvent&&n.detachEvent("on"+e,t.dispatcher)),Object.getOwnPropertyNames(t.handlers).length<=0&&(delete t.handlers,delete t.dispatcher,delete t.disabled),Object.getOwnPropertyNames(t).length===0&&Rt.delete(n)}function za(n,e,t,i){t.forEach(function(s){n(e,s,i)})}function Er(n){if(n.fixed_)return n;function e(){return!0}function t(){return!1}if(!n||!n.isPropagationStopped||!n.isImmediatePropagationStopped){const i=n||A().event;n={};const s=["layerX","layerY","keyLocation","path","webkitMovementX","webkitMovementY","mozPressure","mozInputSource"];for(const r in i)s.includes(r)||r==="returnValue"&&i.preventDefault||(n[r]=i[r]);if(n.target||(n.target=n.srcElement||k()),n.relatedTarget||(n.relatedTarget=n.fromElement===n.target?n.toElement:n.fromElement),n.preventDefault=function(){i.preventDefault&&i.preventDefault(),n.returnValue=!1,i.returnValue=!1,n.defaultPrevented=!0},n.defaultPrevented=!1,n.stopPropagation=function(){i.stopPropagation&&i.stopPropagation(),n.cancelBubble=!0,i.cancelBubble=!0,n.isPropagationStopped=e},n.isPropagationStopped=t,n.stopImmediatePropagation=function(){i.stopImmediatePropagation&&i.stopImmediatePropagation(),n.isImmediatePropagationStopped=e,n.stopPropagation()},n.isImmediatePropagationStopped=t,n.clientX!==null&&n.clientX!==void 0){const r=k().documentElement,a=k().body;n.pageX=n.clientX+(r&&r.scrollLeft||a&&a.scrollLeft||0)-(r&&r.clientLeft||a&&a.clientLeft||0),n.pageY=n.clientY+(r&&r.scrollTop||a&&a.scrollTop||0)-(r&&r.clientTop||a&&a.clientTop||0)}n.which=n.charCode||n.keyCode,n.button!==null&&n.button!==void 0&&(n.button=n.button&1?0:n.button&4?1:n.button&2?2:0)}return n.fixed_=!0,n}let Tr;const Vf=function(){if(typeof Tr!="boolean"){Tr=!1;try{const n=Object.defineProperty({},"passive",{get(){Tr=!0}});A().addEventListener("test",null,n),A().removeEventListener("test",null,n)}catch(n){}}return Tr},zf=["touchstart","touchmove"];function Yt(n,e,t){if(Array.isArray(e))return za(Yt,n,e,t);Rt.has(n)||Rt.set(n,{});const i=Rt.get(n);if(i.handlers||(i.handlers={}),i.handlers[e]||(i.handlers[e]=[]),t.guid||(t.guid=ti()),i.handlers[e].push(t),i.dispatcher||(i.disabled=!1,i.dispatcher=function(s,r){if(i.disabled)return;s=Er(s);const a=i.handlers[s.type];if(a){const l=a.slice(0);for(let d=0,p=l.length;d<p&&!s.isImmediatePropagationStopped();d++)try{l[d].call(n,s,r)}catch(g){qe.error(g)}}}),i.handlers[e].length===1)if(n.addEventListener){let s=!1;Vf()&&zf.indexOf(e)>-1&&(s={passive:!0}),n.addEventListener(e,i.dispatcher,s)}else n.attachEvent&&n.attachEvent("on"+e,i.dispatcher)}function kt(n,e,t){if(!Rt.has(n))return;const i=Rt.get(n);if(!i.handlers)return;if(Array.isArray(e))return za(kt,n,e,t);const s=function(a,l){i.handlers[l]=[],tu(a,l)};if(e===void 0){for(const a in i.handlers)Object.prototype.hasOwnProperty.call(i.handlers||{},a)&&s(n,a);return}const r=i.handlers[e];if(r){if(!t){s(n,e);return}if(t.guid)for(let a=0;a<r.length;a++)r[a].guid===t.guid&&r.splice(a--,1);tu(n,e)}}function Un(n,e,t){const i=Rt.has(n)?Rt.get(n):{},s=n.parentNode||n.ownerDocument;if(typeof e=="string"?e={type:e,target:n}:e.target||(e.target=n),e=Er(e),i.dispatcher&&i.dispatcher.call(n,e,t),s&&!e.isPropagationStopped()&&e.bubbles===!0)Un.call(null,s,e,t);else if(!s&&!e.defaultPrevented&&e.target&&e.target[e.type]){Rt.has(e.target)||Rt.set(e.target,{});const r=Rt.get(e.target);e.target[e.type]&&(r.disabled=!0,typeof e.target[e.type]=="function"&&e.target[e.type](),r.disabled=!1)}return!e.defaultPrevented}function Cr(n,e,t){if(Array.isArray(e))return za(Cr,n,e,t);const i=function(){kt(n,e,i),t.apply(this,arguments)};i.guid=t.guid=t.guid||ti(),Yt(n,e,i)}function Ha(n,e,t){const i=function(){kt(n,e,i),t.apply(this,arguments)};i.guid=t.guid=t.guid||ti(),Yt(n,e,i)}var Hf=Object.freeze({__proto__:null,fixEvent:Er,on:Yt,off:kt,trigger:Un,one:Cr,any:Ha});const ii=30,nt=function(n,e,t){e.guid||(e.guid=ti());const i=e.bind(n);return i.guid=t?t+"_"+e.guid:e.guid,i},bi=function(n,e){let t=A().performance.now();return function(...s){const r=A().performance.now();r-t>=e&&(n(...s),t=r)}},iu=function(n,e,t,i=A()){let s;const r=()=>{i.clearTimeout(s),s=null},a=function(){const l=this,d=arguments;let p=function(){s=null,p=null,t||n.apply(l,d)};!s&&t&&n.apply(l,d),i.clearTimeout(s),s=i.setTimeout(p,e)};return a.cancel=r,a};var qf=Object.freeze({__proto__:null,UPDATE_REFRESH_INTERVAL:ii,bind_:nt,throttle:bi,debounce:iu});let js;class Xt{on(e,t){const i=this.addEventListener;this.addEventListener=()=>{},Yt(this,e,t),this.addEventListener=i}off(e,t){kt(this,e,t)}one(e,t){const i=this.addEventListener;this.addEventListener=()=>{},Cr(this,e,t),this.addEventListener=i}any(e,t){const i=this.addEventListener;this.addEventListener=()=>{},Ha(this,e,t),this.addEventListener=i}trigger(e){const t=e.type||e;typeof e=="string"&&(e={type:t}),e=Er(e),this.allowedEvents_[t]&&this["on"+t]&&this["on"+t](e),Un(this,e)}queueTrigger(e){js||(js=new Map);const t=e.type||e;let i=js.get(this);i||(i=new Map,js.set(this,i));const s=i.get(t);i.delete(t),A().clearTimeout(s);const r=A().setTimeout(()=>{i.delete(t),i.size===0&&(i=null,js.delete(this)),this.trigger(e)},0);i.set(t,r)}}Xt.prototype.allowedEvents_={},Xt.prototype.addEventListener=Xt.prototype.on,Xt.prototype.removeEventListener=Xt.prototype.off,Xt.prototype.dispatchEvent=Xt.prototype.trigger;const xr=n=>typeof n.name=="function"?n.name():typeof n.name=="string"?n.name:n.name_?n.name_:n.constructor&&n.constructor.name?n.constructor.name:typeof n,Ni=n=>n instanceof Xt||!!n.eventBusEl_&&["on","one","off","trigger"].every(e=>typeof n[e]=="function"),Wf=(n,e)=>{Ni(n)?e():(n.eventedCallbacks||(n.eventedCallbacks=[]),n.eventedCallbacks.push(e))},qa=n=>typeof n=="string"&&/\S/.test(n)||Array.isArray(n)&&!!n.length,Sr=(n,e,t)=>{if(!n||!n.nodeName&&!Ni(n))throw new Error(`Invalid target for ${xr(e)}#${t}; must be a DOM node or evented object.`)},nu=(n,e,t)=>{if(!qa(n))throw new Error(`Invalid event type for ${xr(e)}#${t}; must be a non-empty string or array.`)},su=(n,e,t)=>{if(typeof n!="function")throw new Error(`Invalid listener for ${xr(e)}#${t}; must be a function.`)},Wa=(n,e,t)=>{const i=e.length<3||e[0]===n||e[0]===n.eventBusEl_;let s,r,a;return i?(s=n.eventBusEl_,e.length>=3&&e.shift(),[r,a]=e):(s=e[0],r=e[1],a=e[2]),Sr(s,n,t),nu(r,n,t),su(a,n,t),a=nt(n,a),{isTargetingSelf:i,target:s,type:r,listener:a}},ln=(n,e,t,i)=>{Sr(n,n,e),n.nodeName?Hf[e](n,t,i):n[e](t,i)},$f={on(...n){const{isTargetingSelf:e,target:t,type:i,listener:s}=Wa(this,n,"on");if(ln(t,"on",i,s),!e){const r=()=>this.off(t,i,s);r.guid=s.guid;const a=()=>this.off("dispose",r);a.guid=s.guid,ln(this,"on","dispose",r),ln(t,"on","dispose",a)}},one(...n){const{isTargetingSelf:e,target:t,type:i,listener:s}=Wa(this,n,"one");if(e)ln(t,"one",i,s);else{const r=(...a)=>{this.off(t,i,r),s.apply(null,a)};r.guid=s.guid,ln(t,"one",i,r)}},any(...n){const{isTargetingSelf:e,target:t,type:i,listener:s}=Wa(this,n,"any");if(e)ln(t,"any",i,s);else{const r=(...a)=>{this.off(t,i,r),s.apply(null,a)};r.guid=s.guid,ln(t,"any",i,r)}},off(n,e,t){if(!n||qa(n))kt(this.eventBusEl_,n,e);else{const i=n,s=e;Sr(i,this,"off"),nu(s,this,"off"),su(t,this,"off"),t=nt(this,t),this.off("dispose",t),i.nodeName?(kt(i,s,t),kt(i,"dispose",t)):Ni(i)&&(i.off(s,t),i.off("dispose",t))}},trigger(n,e){Sr(this.eventBusEl_,this,"trigger");const t=n&&typeof n!="string"?n.type:n;if(!qa(t))throw new Error(`Invalid event type for ${xr(this)}#trigger; must be a non-empty string or object with a type key that has a non-empty value.`);return Un(this.eventBusEl_,n,e)}};function $a(n,e={}){const{eventBusKey:t}=e;if(t){if(!n[t].nodeName)throw new Error(`The eventBusKey "${t}" does not refer to an element.`);n.eventBusEl_=n[t]}else n.eventBusEl_=Oe("span",{className:"vjs-event-bus"});return Object.assign(n,$f),n.eventedCallbacks&&n.eventedCallbacks.forEach(i=>{i()}),n.on("dispose",()=>{n.off(),[n,n.el_,n.eventBusEl_].forEach(function(i){i&&Rt.has(i)&&Rt.delete(i)}),A().setTimeout(()=>{n.eventBusEl_=null},0)}),n}const Gf={state:{},setState(n){typeof n=="function"&&(n=n());let e;return kn(n,(t,i)=>{this.state[i]!==t&&(e=e||{},e[i]={from:this.state[i],to:t}),this.state[i]=t}),e&&Ni(this)&&this.trigger({changes:e,type:"statechanged"}),e}};function ru(n,e){return Object.assign(n,Gf),n.state=Object.assign({},n.state,e),typeof n.handleStateChanged=="function"&&Ni(n)&&n.on("statechanged",n.handleStateChanged),n}const Bs=function(n){return typeof n!="string"?n:n.replace(/./,e=>e.toLowerCase())},gt=function(n){return typeof n!="string"?n:n.replace(/./,e=>e.toUpperCase())},au=function(n,e){return gt(n)===gt(e)};var Yf=Object.freeze({__proto__:null,toLowerCase:Bs,toTitleCase:gt,titleCaseEquals:au});class q{constructor(e,t,i){if(!e&&this.play?this.player_=e=this:this.player_=e,this.isDisposed_=!1,this.parentComponent_=null,this.options_=Ze({},this.options_),t=this.options_=Ze(this.options_,t),this.id_=t.id||t.el&&t.el.id,!this.id_){const s=e&&e.id&&e.id()||"no_player";this.id_=`${s}_component_${ti()}`}this.name_=t.name||null,t.el?this.el_=t.el:t.createEl!==!1&&(this.el_=this.createEl()),t.className&&this.el_&&t.className.split(" ").forEach(s=>this.addClass(s)),["on","off","one","any","trigger"].forEach(s=>{this[s]=void 0}),t.evented!==!1&&($a(this,{eventBusKey:this.el_?"el_":null}),this.handleLanguagechange=this.handleLanguagechange.bind(this),this.on(this.player_,"languagechange",this.handleLanguagechange)),ru(this,this.constructor.defaultState),this.children_=[],this.childIndex_={},this.childNameIndex_={},this.setTimeoutIds_=new Set,this.setIntervalIds_=new Set,this.rafIds_=new Set,this.namedRafs_=new Map,this.clearingTimersOnDispose_=!1,t.initChildren!==!1&&this.initChildren(),this.ready(i),t.reportTouchActivity!==!1&&this.enableTouchActivity()}dispose(e={}){if(!this.isDisposed_){if(this.readyQueue_&&(this.readyQueue_.length=0),this.trigger({type:"dispose",bubbles:!1}),this.isDisposed_=!0,this.children_)for(let t=this.children_.length-1;t>=0;t--)this.children_[t].dispose&&this.children_[t].dispose();this.children_=null,this.childIndex_=null,this.childNameIndex_=null,this.parentComponent_=null,this.el_&&(this.el_.parentNode&&(e.restoreEl?this.el_.parentNode.replaceChild(e.restoreEl,this.el_):this.el_.parentNode.removeChild(this.el_)),this.el_=null),this.player_=null}}isDisposed(){return!!this.isDisposed_}player(){return this.player_}options(e){return e?(this.options_=Ze(this.options_,e),this.options_):this.options_}el(){return this.el_}createEl(e,t,i){return Oe(e,t,i)}localize(e,t,i=e){const s=this.player_.language&&this.player_.language(),r=this.player_.languages&&this.player_.languages(),a=r&&r[s],l=s&&s.split("-")[0],d=r&&r[l];let p=i;return a&&a[e]?p=a[e]:d&&d[e]&&(p=d[e]),t&&(p=p.replace(/\{(\d+)\}/g,function(g,y){const B=t[y-1];let D=B;return typeof B=="undefined"&&(D=g),D})),p}handleLanguagechange(){}contentEl(){return this.contentEl_||this.el_}id(){return this.id_}name(){return this.name_}children(){return this.children_}getChildById(e){return this.childIndex_[e]}getChild(e){if(e)return this.childNameIndex_[e]}getDescendant(...e){e=e.reduce((i,s)=>i.concat(s),[]);let t=this;for(let i=0;i<e.length;i++)if(t=t.getChild(e[i]),!t||!t.getChild)return;return t}setIcon(e,t=this.el()){if(!this.player_.options_.experimentalSvgIcons)return;const i="http://www.w3.org/2000/svg",s=Oe("span",{className:"vjs-icon-placeholder vjs-svg-icon"},{"aria-hidden":"true"}),r=k().createElementNS(i,"svg");r.setAttributeNS(null,"viewBox","0 0 512 512");const a=k().createElementNS(i,"use");return r.appendChild(a),a.setAttributeNS(null,"href",`#vjs-icon-${e}`),s.appendChild(r),this.iconIsSet_?t.replaceChild(s,t.querySelector(".vjs-icon-placeholder")):t.appendChild(s),this.iconIsSet_=!0,s}addChild(e,t={},i=this.children_.length){let s,r;if(typeof e=="string"){r=gt(e);const a=t.componentClass||r;t.name=r;const l=q.getComponent(a);if(!l)throw new Error(`Component ${a} does not exist`);if(typeof l!="function")return null;s=new l(this.player_||this,t)}else s=e;if(s.parentComponent_&&s.parentComponent_.removeChild(s),this.children_.splice(i,0,s),s.parentComponent_=this,typeof s.id=="function"&&(this.childIndex_[s.id()]=s),r=r||s.name&&gt(s.name()),r&&(this.childNameIndex_[r]=s,this.childNameIndex_[Bs(r)]=s),typeof s.el=="function"&&s.el()){let a=null;this.children_[i+1]&&(this.children_[i+1].el_?a=this.children_[i+1].el_:Rn(this.children_[i+1])&&(a=this.children_[i+1])),this.contentEl().insertBefore(s.el(),a)}return s}removeChild(e){if(typeof e=="string"&&(e=this.getChild(e)),!e||!this.children_)return;let t=!1;for(let s=this.children_.length-1;s>=0;s--)if(this.children_[s]===e){t=!0,this.children_.splice(s,1);break}if(!t)return;e.parentComponent_=null,this.childIndex_[e.id()]=null,this.childNameIndex_[gt(e.name())]=null,this.childNameIndex_[Bs(e.name())]=null;const i=e.el();i&&i.parentNode===this.contentEl()&&this.contentEl().removeChild(e.el())}initChildren(){const e=this.options_.children;if(e){const t=this.options_,i=a=>{const l=a.name;let d=a.opts;if(t[l]!==void 0&&(d=t[l]),d===!1)return;d===!0&&(d={}),d.playerOptions=this.options_.playerOptions;const p=this.addChild(l,d);p&&(this[l]=p)};let s;const r=q.getComponent("Tech");Array.isArray(e)?s=e:s=Object.keys(e),s.concat(Object.keys(this.options_).filter(function(a){return!s.some(function(l){return typeof l=="string"?a===l:a===l.name})})).map(a=>{let l,d;return typeof a=="string"?(l=a,d=e[l]||this.options_[l]||{}):(l=a.name,d=a),{name:l,opts:d}}).filter(a=>{const l=q.getComponent(a.opts.componentClass||gt(a.name));return l&&!r.isTech(l)}).forEach(i)}}buildCSSClass(){return""}ready(e,t=!1){if(e){if(!this.isReady_){this.readyQueue_=this.readyQueue_||[],this.readyQueue_.push(e);return}t?e.call(this):this.setTimeout(e,1)}}triggerReady(){this.isReady_=!0,this.setTimeout(function(){const e=this.readyQueue_;this.readyQueue_=[],e&&e.length>0&&e.forEach(function(t){t.call(this)},this),this.trigger("ready")},1)}$(e,t){return Ki(e,t||this.contentEl())}$$(e,t){return Xl(e,t||this.contentEl())}hasClass(e){return Cs(this.el_,e)}addClass(...e){on(this.el_,...e)}removeClass(...e){Ar(this.el_,...e)}toggleClass(e,t){Vl(this.el_,e,t)}show(){this.removeClass("vjs-hidden")}hide(){this.addClass("vjs-hidden")}lockShowing(){this.addClass("vjs-lock-showing")}unlockShowing(){this.removeClass("vjs-lock-showing")}getAttribute(e){return Hl(this.el_,e)}setAttribute(e,t){Nn(this.el_,e,t)}removeAttribute(e){yr(this.el_,e)}width(e,t){return this.dimension("width",e,t)}height(e,t){return this.dimension("height",e,t)}dimensions(e,t){this.width(e,!0),this.height(t)}dimension(e,t,i){if(t!==void 0){(t===null||t!==t)&&(t=0),(""+t).indexOf("%")!==-1||(""+t).indexOf("px")!==-1?this.el_.style[e]=t:t==="auto"?this.el_.style[e]="":this.el_.style[e]=t+"px",i||this.trigger("componentresize");return}if(!this.el_)return 0;const s=this.el_.style[e],r=s.indexOf("px");return parseInt(r!==-1?s.slice(0,r):this.el_["offset"+gt(e)],10)}currentDimension(e){let t=0;if(e!=="width"&&e!=="height")throw new Error("currentDimension only accepts width or height value");if(t=Fn(this.el_,e),t=parseFloat(t),t===0||isNaN(t)){const i=`offset${gt(e)}`;t=this.el_[i]}return t}currentDimensions(){return{width:this.currentDimension("width"),height:this.currentDimension("height")}}currentWidth(){return this.currentDimension("width")}currentHeight(){return this.currentDimension("height")}getPositions(){const e=this.el_.getBoundingClientRect(),t={x:e.x,y:e.y,width:e.width,height:e.height,top:e.top,right:e.right,bottom:e.bottom,left:e.left},i={x:e.left+e.width/2,y:e.top+e.height/2,width:0,height:0,top:e.top+e.height/2,right:e.left+e.width/2,bottom:e.top+e.height/2,left:e.left+e.width/2};return{boundingClientRect:t,center:i}}focus(){this.el_.focus()}blur(){this.el_.blur()}handleKeyDown(e){this.player_&&(e.key!=="Tab"&&!(this.player_.options_.playerOptions.spatialNavigation&&this.player_.options_.playerOptions.spatialNavigation.enabled)&&e.stopPropagation(),this.player_.handleKeyDown(e))}handleKeyPress(e){this.handleKeyDown(e)}emitTapEvents(){let e=0,t=null;const i=10,s=200;let r;this.on("touchstart",function(l){l.touches.length===1&&(t={pageX:l.touches[0].pageX,pageY:l.touches[0].pageY},e=A().performance.now(),r=!0)}),this.on("touchmove",function(l){if(l.touches.length>1)r=!1;else if(t){const d=l.touches[0].pageX-t.pageX,p=l.touches[0].pageY-t.pageY;Math.sqrt(d*d+p*p)>i&&(r=!1)}});const a=function(){r=!1};this.on("touchleave",a),this.on("touchcancel",a),this.on("touchend",function(l){t=null,r===!0&&A().performance.now()-e<s&&(l.preventDefault(),this.trigger("tap"))})}enableTouchActivity(){if(!this.player()||!this.player().reportUserActivity)return;const e=nt(this.player(),this.player().reportUserActivity);let t;this.on("touchstart",function(){e(),this.clearInterval(t),t=this.setInterval(e,250)});const i=function(s){e(),this.clearInterval(t)};this.on("touchmove",e),this.on("touchend",i),this.on("touchcancel",i)}setTimeout(e,t){var i;return e=nt(this,e),this.clearTimersOnDispose_(),i=A().setTimeout(()=>{this.setTimeoutIds_.has(i)&&this.setTimeoutIds_.delete(i),e()},t),this.setTimeoutIds_.add(i),i}clearTimeout(e){return this.setTimeoutIds_.has(e)&&(this.setTimeoutIds_.delete(e),A().clearTimeout(e)),e}setInterval(e,t){e=nt(this,e),this.clearTimersOnDispose_();const i=A().setInterval(e,t);return this.setIntervalIds_.add(i),i}clearInterval(e){return this.setIntervalIds_.has(e)&&(this.setIntervalIds_.delete(e),A().clearInterval(e)),e}requestAnimationFrame(e){this.clearTimersOnDispose_();var t;return e=nt(this,e),t=A().requestAnimationFrame(()=>{this.rafIds_.has(t)&&this.rafIds_.delete(t),e()}),this.rafIds_.add(t),t}requestNamedAnimationFrame(e,t){this.namedRafs_.has(e)&&this.cancelNamedAnimationFrame(e),this.clearTimersOnDispose_(),t=nt(this,t);const i=this.requestAnimationFrame(()=>{t(),this.namedRafs_.has(e)&&this.namedRafs_.delete(e)});return this.namedRafs_.set(e,i),e}cancelNamedAnimationFrame(e){this.namedRafs_.has(e)&&(this.cancelAnimationFrame(this.namedRafs_.get(e)),this.namedRafs_.delete(e))}cancelAnimationFrame(e){return this.rafIds_.has(e)&&(this.rafIds_.delete(e),A().cancelAnimationFrame(e)),e}clearTimersOnDispose_(){this.clearingTimersOnDispose_||(this.clearingTimersOnDispose_=!0,this.one("dispose",()=>{[["namedRafs_","cancelNamedAnimationFrame"],["rafIds_","cancelAnimationFrame"],["setTimeoutIds_","clearTimeout"],["setIntervalIds_","clearInterval"]].forEach(([e,t])=>{this[e].forEach((i,s)=>this[t](s))}),this.clearingTimersOnDispose_=!1}))}getIsDisabled(){return!!this.el_.disabled}getIsExpresslyInert(){return this.el_.inert&&!this.el_.ownerDocument.documentElement.inert}getIsFocusable(e){return(e||this.el_).tabIndex>=0&&!(this.getIsDisabled()||this.getIsExpresslyInert())}getIsAvailableToBeFocused(e){function t(r){const a=A().getComputedStyle(r,null),l=a.getPropertyValue("visibility");return a.getPropertyValue("display")!=="none"&&!["hidden","collapse"].includes(l)}function i(r){return!(!t(r.parentElement)||!t(r)||r.style.opacity==="0"||A().getComputedStyle(r).height==="0px"||A().getComputedStyle(r).width==="0px")}function s(r){if(r.offsetWidth+r.offsetHeight+r.getBoundingClientRect().height+r.getBoundingClientRect().width===0)return!1;const a={x:r.getBoundingClientRect().left+r.offsetWidth/2,y:r.getBoundingClientRect().top+r.offsetHeight/2};if(a.x<0||a.x>(k().documentElement.clientWidth||A().innerWidth)||a.y<0||a.y>(k().documentElement.clientHeight||A().innerHeight))return!1;let l=k().elementFromPoint(a.x,a.y);for(;l;){if(l===r)return!0;if(l.parentNode)l=l.parentNode;else return!1}}return e||(e=this.el()),!!(s(e)&&i(e)&&(!e.parentElement||e.tabIndex>=0))}static registerComponent(e,t){if(typeof e!="string"||!e)throw new Error(`Illegal component name, "${e}"; must be a non-empty string.`);const i=q.getComponent("Tech"),s=i&&i.isTech(t),r=q===t||q.prototype.isPrototypeOf(t.prototype);if(s||!r){let l;throw s?l="techs must be registered using Tech.registerTech()":l="must be a Component subclass",new Error(`Illegal component, "${e}"; ${l}.`)}e=gt(e),q.components_||(q.components_={});const a=q.getComponent("Player");if(e==="Player"&&a&&a.players){const l=a.players,d=Object.keys(l);if(l&&d.length>0&&d.map(p=>l[p]).every(Boolean))throw new Error("Can not register Player component after player has been created.")}return q.components_[e]=t,q.components_[Bs(e)]=t,t}static getComponent(e){if(!(!e||!q.components_))return q.components_[e]}}q.registerComponent("Component",q);function Xf(n,e,t){if(typeof e!="number"||e<0||e>t)throw new Error(`Failed to execute '${n}' on 'TimeRanges': The index provided (${e}) is non-numeric or out of bounds (0-${t}).`)}function ou(n,e,t,i){return Xf(n,i,t.length-1),t[i][e]}function Ga(n){let e;return n===void 0||n.length===0?e={length:0,start(){throw new Error("This TimeRanges object is empty")},end(){throw new Error("This TimeRanges object is empty")}}:e={length:n.length,start:ou.bind(null,"start",0,n),end:ou.bind(null,"end",1,n)},A().Symbol&&A().Symbol.iterator&&(e[A().Symbol.iterator]=()=>(n||[]).values()),e}function hi(n,e){return Array.isArray(n)?Ga(n):n===void 0||e===void 0?Ga():Ga([[n,e]])}const lu=function(n,e){n=n<0?0:n;let t=Math.floor(n%60),i=Math.floor(n/60%60),s=Math.floor(n/3600);const r=Math.floor(e/60%60),a=Math.floor(e/3600);return(isNaN(n)||n===1/0)&&(s=i=t="-"),s=s>0||a>0?s+":":"",i=((s||r>=10)&&i<10?"0"+i:i)+":",t=t<10?"0"+t:t,s+i+t};let Ya=lu;function uu(n){Ya=n}function cu(){Ya=lu}function un(n,e=n){return Ya(n,e)}var Kf=Object.freeze({__proto__:null,createTimeRanges:hi,createTimeRange:hi,setFormatTime:uu,resetFormatTime:cu,formatTime:un});function du(n,e){let t=0,i,s;if(!e)return 0;(!n||!n.length)&&(n=hi(0,0));for(let r=0;r<n.length;r++)i=n.start(r),s=n.end(r),s>e&&(s=e),t+=s-i;return t/e}function ht(n){if(n instanceof ht)return n;typeof n=="number"?this.code=n:typeof n=="string"?this.message=n:Ai(n)&&(typeof n.code=="number"&&(this.code=n.code),Object.assign(this,n)),this.message||(this.message=ht.defaultMessages[this.code]||"")}ht.prototype.code=0,ht.prototype.message="",ht.prototype.status=null,ht.prototype.metadata=null,ht.errorTypes=["MEDIA_ERR_CUSTOM","MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_ERR_ENCRYPTED"],ht.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail part-way.",3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",4:"The media could not be loaded, either because the server or network failed or because the format is not supported.",5:"The media is encrypted and we do not have the keys to decrypt it."},ht.MEDIA_ERR_CUSTOM=0,ht.prototype.MEDIA_ERR_CUSTOM=0,ht.MEDIA_ERR_ABORTED=1,ht.prototype.MEDIA_ERR_ABORTED=1,ht.MEDIA_ERR_NETWORK=2,ht.prototype.MEDIA_ERR_NETWORK=2,ht.MEDIA_ERR_DECODE=3,ht.prototype.MEDIA_ERR_DECODE=3,ht.MEDIA_ERR_SRC_NOT_SUPPORTED=4,ht.prototype.MEDIA_ERR_SRC_NOT_SUPPORTED=4,ht.MEDIA_ERR_ENCRYPTED=5,ht.prototype.MEDIA_ERR_ENCRYPTED=5;function ws(n){return n!=null&&typeof n.then=="function"}function Ei(n){ws(n)&&n.then(null,e=>{})}const Xa=function(n){return["kind","label","language","id","inBandMetadataTrackDispatchType","mode","src"].reduce((t,i,s)=>(n[i]&&(t[i]=n[i]),t),{cues:n.cues&&Array.prototype.map.call(n.cues,function(t){return{startTime:t.startTime,endTime:t.endTime,text:t.text,id:t.id}})})};var hu={textTracksToJson:function(n){const e=n.$$("track"),t=Array.prototype.map.call(e,s=>s.track);return Array.prototype.map.call(e,function(s){const r=Xa(s.track);return s.src&&(r.src=s.src),r}).concat(Array.prototype.filter.call(n.textTracks(),function(s){return t.indexOf(s)===-1}).map(Xa))},jsonToTextTracks:function(n,e){return n.forEach(function(t){const i=e.addRemoteTextTrack(t).track;!t.src&&t.cues&&t.cues.forEach(s=>i.addCue(s))}),e.textTracks()},trackToJson_:Xa};const Ka="vjs-modal-dialog";class Vn extends q{constructor(e,t){super(e,t),this.handleKeyDown_=i=>this.handleKeyDown(i),this.close_=i=>this.close(i),this.opened_=this.hasBeenOpened_=this.hasBeenFilled_=!1,this.closeable(!this.options_.uncloseable),this.content(this.options_.content),this.contentEl_=Oe("div",{className:`${Ka}-content`},{role:"document"}),this.descEl_=Oe("p",{className:`${Ka}-description vjs-control-text`,id:this.el().getAttribute("aria-describedby")}),Yi(this.descEl_,this.description()),this.el_.appendChild(this.descEl_),this.el_.appendChild(this.contentEl_)}createEl(){return super.createEl("div",{className:this.buildCSSClass(),tabIndex:-1},{"aria-describedby":`${this.id()}_description`,"aria-hidden":"true","aria-label":this.label(),role:"dialog","aria-live":"polite"})}dispose(){this.contentEl_=null,this.descEl_=null,this.previouslyActiveEl_=null,super.dispose()}buildCSSClass(){return`${Ka} vjs-hidden ${super.buildCSSClass()}`}label(){return this.localize(this.options_.label||"Modal Window")}description(){let e=this.options_.description||this.localize("This is a modal window.");return this.closeable()&&(e+=" "+this.localize("This modal can be closed by pressing the Escape key or activating the close button.")),e}open(){if(this.opened_){this.options_.fillAlways&&this.fill();return}const e=this.player();this.trigger("beforemodalopen"),this.opened_=!0,(this.options_.fillAlways||!this.hasBeenOpened_&&!this.hasBeenFilled_)&&this.fill(),this.wasPlaying_=!e.paused(),this.options_.pauseOnOpen&&this.wasPlaying_&&e.pause(),this.on("keydown",this.handleKeyDown_),this.hadControls_=e.controls(),e.controls(!1),this.show(),this.conditionalFocus_(),this.el().setAttribute("aria-hidden","false"),this.trigger("modalopen"),this.hasBeenOpened_=!0}opened(e){return typeof e=="boolean"&&this[e?"open":"close"](),this.opened_}close(){if(!this.opened_)return;const e=this.player();this.trigger("beforemodalclose"),this.opened_=!1,this.wasPlaying_&&this.options_.pauseOnOpen&&e.play(),this.off("keydown",this.handleKeyDown_),this.hadControls_&&e.controls(!0),this.hide(),this.el().setAttribute("aria-hidden","true"),this.trigger({type:"modalclose",bubbles:!0}),this.conditionalBlur_(),this.options_.temporary&&this.dispose()}closeable(e){if(typeof e=="boolean"){const t=this.closeable_=!!e;let i=this.getChild("closeButton");if(t&&!i){const s=this.contentEl_;this.contentEl_=this.el_,i=this.addChild("closeButton",{controlText:"Close Modal Dialog"}),this.contentEl_=s,this.on(i,"close",this.close_)}!t&&i&&(this.off(i,"close",this.close_),this.removeChild(i),i.dispose())}return this.closeable_}fill(){this.fillWith(this.content())}fillWith(e){const t=this.contentEl(),i=t.parentNode,s=t.nextSibling;this.trigger("beforemodalfill"),this.hasBeenFilled_=!0,i.removeChild(t),this.empty(),Yl(t,e),this.trigger("modalfill"),s?i.insertBefore(t,s):i.appendChild(t);const r=this.getChild("closeButton");r&&i.appendChild(r.el_),this.trigger("aftermodalfill")}empty(){this.trigger("beforemodalempty"),br(this.contentEl()),this.trigger("modalempty")}content(e){return typeof e!="undefined"&&(this.content_=e),this.content_}conditionalFocus_(){const e=k().activeElement,t=this.player_.el_;this.previouslyActiveEl_=null,(t.contains(e)||t===e)&&(this.previouslyActiveEl_=e,this.focus())}conditionalBlur_(){this.previouslyActiveEl_&&(this.previouslyActiveEl_.focus(),this.previouslyActiveEl_=null)}handleKeyDown(e){if(this.trigger({type:"modalKeydown",originalEvent:e,target:this,bubbles:!0}),e.stopPropagation(),e.key==="Escape"&&this.closeable()){e.preventDefault(),this.close();return}if(e.key!=="Tab")return;const t=this.focusableEls_(),i=this.el_.querySelector(":focus");let s;for(let r=0;r<t.length;r++)if(i===t[r]){s=r;break}k().activeElement===this.el_&&(s=0),e.shiftKey&&s===0?(t[t.length-1].focus(),e.preventDefault()):!e.shiftKey&&s===t.length-1&&(t[0].focus(),e.preventDefault())}focusableEls_(){const e=this.el_.querySelectorAll("*");return Array.prototype.filter.call(e,t=>(t instanceof A().HTMLAnchorElement||t instanceof A().HTMLAreaElement)&&t.hasAttribute("href")||(t instanceof A().HTMLInputElement||t instanceof A().HTMLSelectElement||t instanceof A().HTMLTextAreaElement||t instanceof A().HTMLButtonElement)&&!t.hasAttribute("disabled")||t instanceof A().HTMLIFrameElement||t instanceof A().HTMLObjectElement||t instanceof A().HTMLEmbedElement||t.hasAttribute("tabindex")&&t.getAttribute("tabindex")!==-1||t.hasAttribute("contenteditable"))}}Vn.prototype.options_={pauseOnOpen:!0,temporary:!0},q.registerComponent("ModalDialog",Vn);class zn extends Xt{constructor(e=[]){super(),this.tracks_=[],Object.defineProperty(this,"length",{get(){return this.tracks_.length}});for(let t=0;t<e.length;t++)this.addTrack(e[t])}addTrack(e){const t=this.tracks_.length;""+t in this||Object.defineProperty(this,t,{get(){return this.tracks_[t]}}),this.tracks_.indexOf(e)===-1&&(this.tracks_.push(e),this.trigger({track:e,type:"addtrack",target:this})),e.labelchange_=()=>{this.trigger({track:e,type:"labelchange",target:this})},Ni(e)&&e.addEventListener("labelchange",e.labelchange_)}removeTrack(e){let t;for(let i=0,s=this.length;i<s;i++)if(this[i]===e){t=this[i],t.off&&t.off(),this.tracks_.splice(i,1);break}t&&this.trigger({track:t,type:"removetrack",target:this})}getTrackById(e){let t=null;for(let i=0,s=this.length;i<s;i++){const r=this[i];if(r.id===e){t=r;break}}return t}}zn.prototype.allowedEvents_={change:"change",addtrack:"addtrack",removetrack:"removetrack",labelchange:"labelchange"};for(const n in zn.prototype.allowedEvents_)zn.prototype["on"+n]=null;const Qa=function(n,e){for(let t=0;t<n.length;t++)!Object.keys(n[t]).length||e.id===n[t].id||(n[t].enabled=!1)};class Qf extends zn{constructor(e=[]){for(let t=e.length-1;t>=0;t--)if(e[t].enabled){Qa(e,e[t]);break}super(e),this.changing_=!1}addTrack(e){e.enabled&&Qa(this,e),super.addTrack(e),e.addEventListener&&(e.enabledChange_=()=>{this.changing_||(this.changing_=!0,Qa(this,e),this.changing_=!1,this.trigger("change"))},e.addEventListener("enabledchange",e.enabledChange_))}removeTrack(e){super.removeTrack(e),e.removeEventListener&&e.enabledChange_&&(e.removeEventListener("enabledchange",e.enabledChange_),e.enabledChange_=null)}}const Ja=function(n,e){for(let t=0;t<n.length;t++)!Object.keys(n[t]).length||e.id===n[t].id||(n[t].selected=!1)};class Jf extends zn{constructor(e=[]){for(let t=e.length-1;t>=0;t--)if(e[t].selected){Ja(e,e[t]);break}super(e),this.changing_=!1,Object.defineProperty(this,"selectedIndex",{get(){for(let t=0;t<this.length;t++)if(this[t].selected)return t;return-1},set(){}})}addTrack(e){e.selected&&Ja(this,e),super.addTrack(e),e.addEventListener&&(e.selectedChange_=()=>{this.changing_||(this.changing_=!0,Ja(this,e),this.changing_=!1,this.trigger("change"))},e.addEventListener("selectedchange",e.selectedChange_))}removeTrack(e){super.removeTrack(e),e.removeEventListener&&e.selectedChange_&&(e.removeEventListener("selectedchange",e.selectedChange_),e.selectedChange_=null)}}class fu extends zn{addTrack(e){super.addTrack(e),this.queueChange_||(this.queueChange_=()=>this.queueTrigger("change")),this.triggerSelectedlanguagechange||(this.triggerSelectedlanguagechange_=()=>this.trigger("selectedlanguagechange")),e.addEventListener("modechange",this.queueChange_),["metadata","chapters"].indexOf(e.kind)===-1&&e.addEventListener("modechange",this.triggerSelectedlanguagechange_)}removeTrack(e){super.removeTrack(e),e.removeEventListener&&(this.queueChange_&&e.removeEventListener("modechange",this.queueChange_),this.selectedlanguagechange_&&e.removeEventListener("modechange",this.triggerSelectedlanguagechange_))}}class Zf{constructor(e=[]){this.trackElements_=[],Object.defineProperty(this,"length",{get(){return this.trackElements_.length}});for(let t=0,i=e.length;t<i;t++)this.addTrackElement_(e[t])}addTrackElement_(e){const t=this.trackElements_.length;""+t in this||Object.defineProperty(this,t,{get(){return this.trackElements_[t]}}),this.trackElements_.indexOf(e)===-1&&this.trackElements_.push(e)}getTrackElementByTrack_(e){let t;for(let i=0,s=this.trackElements_.length;i<s;i++)if(e===this.trackElements_[i].track){t=this.trackElements_[i];break}return t}removeTrackElement_(e){for(let t=0,i=this.trackElements_.length;t<i;t++)if(e===this.trackElements_[t]){this.trackElements_[t].track&&typeof this.trackElements_[t].track.off=="function"&&this.trackElements_[t].track.off(),typeof this.trackElements_[t].off=="function"&&this.trackElements_[t].off(),this.trackElements_.splice(t,1);break}}}class jr{constructor(e){jr.prototype.setCues_.call(this,e),Object.defineProperty(this,"length",{get(){return this.length_}})}setCues_(e){const t=this.length||0;let i=0;const s=e.length;this.cues_=e,this.length_=e.length;const r=function(a){""+a in this||Object.defineProperty(this,""+a,{get(){return this.cues_[a]}})};if(t<s)for(i=t;i<s;i++)r.call(this,i)}getCueById(e){let t=null;for(let i=0,s=this.length;i<s;i++){const r=this[i];if(r.id===e){t=r;break}}return t}}const ep={alternative:"alternative",captions:"captions",main:"main",sign:"sign",subtitles:"subtitles",commentary:"commentary"},tp={alternative:"alternative",descriptions:"descriptions",main:"main","main-desc":"main-desc",translation:"translation",commentary:"commentary"},ip={subtitles:"subtitles",captions:"captions",descriptions:"descriptions",chapters:"chapters",metadata:"metadata"},pu={disabled:"disabled",hidden:"hidden",showing:"showing"};class Za extends Xt{constructor(e={}){super();const t={id:e.id||"vjs_track_"+ti(),kind:e.kind||"",language:e.language||""};let i=e.label||"";for(const s in t)Object.defineProperty(this,s,{get(){return t[s]},set(){}});Object.defineProperty(this,"label",{get(){return i},set(s){s!==i&&(i=s,this.trigger("labelchange"))}})}}const eo=function(n){return new URL(n,k().baseURI)},mu=function(n){return new URL(n,k().baseURI).href},to=function(n){if(typeof n=="string"){const t=/^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/.exec(n);if(t)return t.pop().toLowerCase()}return""},Br=function(n,e=A().location){return eo(n).origin!==e.origin};var np=Object.freeze({__proto__:null,parseUrl:eo,getAbsoluteURL:mu,getFileExtension:to,isCrossOrigin:Br});const gu=function(n,e){const t=new(A()).WebVTT.Parser(A(),A().vttjs,A().WebVTT.StringDecoder()),i=[];t.oncue=function(s){e.addCue(s)},t.onparsingerror=function(s){i.push(s)},t.onflush=function(){e.trigger({type:"loadeddata",target:e})},t.parse(n),i.length>0&&(A().console&&A().console.groupCollapsed&&A().console.groupCollapsed(`Text Track parsing errors for ${e.src}`),i.forEach(s=>qe.error(s)),A().console&&A().console.groupEnd&&A().console.groupEnd()),t.flush()},vu=function(n,e){const t={uri:n},i=Br(n);i&&(t.cors=i);const s=e.tech_.crossOrigin()==="use-credentials";s&&(t.withCredentials=s),Z()(t,nt(this,function(r,a,l){if(r)return qe.error(r,a);e.loaded_=!0,typeof A().WebVTT!="function"?e.tech_&&e.tech_.any(["vttjsloaded","vttjserror"],d=>{if(d.type==="vttjserror"){qe.error(`vttjs failed to load, stopping trying to process ${e.src}`);return}return gu(l,e)}):gu(l,e)}))};class Ds extends Za{constructor(e={}){if(!e.tech)throw new Error("A tech was not provided.");const t=Ze(e,{kind:ip[e.kind]||"subtitles",language:e.language||e.srclang||""});let i=pu[t.mode]||"disabled";const s=t.default;(t.kind==="metadata"||t.kind==="chapters")&&(i="hidden"),super(t),this.tech_=t.tech,this.cues_=[],this.activeCues_=[],this.preload_=this.tech_.preloadTextTracks!==!1;const r=new jr(this.cues_),a=new jr(this.activeCues_);let l=!1;this.timeupdateHandler=nt(this,function(p={}){if(!this.tech_.isDisposed()){if(!this.tech_.isReady_){p.type!=="timeupdate"&&(this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler));return}this.activeCues=this.activeCues,l&&(this.trigger("cuechange"),l=!1),p.type!=="timeupdate"&&(this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler))}});const d=()=>{this.stopTracking()};this.tech_.one("dispose",d),i!=="disabled"&&this.startTracking(),Object.defineProperties(this,{default:{get(){return s},set(){}},mode:{get(){return i},set(p){pu[p]&&i!==p&&(i=p,!this.preload_&&i!=="disabled"&&this.cues.length===0&&vu(this.src,this),this.stopTracking(),i!=="disabled"&&this.startTracking(),this.trigger("modechange"))}},cues:{get(){return this.loaded_?r:null},set(){}},activeCues:{get(){if(!this.loaded_)return null;if(this.cues.length===0)return a;const p=this.tech_.currentTime(),g=[];for(let y=0,B=this.cues.length;y<B;y++){const D=this.cues[y];D.startTime<=p&&D.endTime>=p&&g.push(D)}if(l=!1,g.length!==this.activeCues_.length)l=!0;else for(let y=0;y<g.length;y++)this.activeCues_.indexOf(g[y])===-1&&(l=!0);return this.activeCues_=g,a.setCues_(this.activeCues_),a},set(){}}}),t.src?(this.src=t.src,this.preload_||(this.loaded_=!0),(this.preload_||t.kind!=="subtitles"&&t.kind!=="captions")&&vu(this.src,this)):this.loaded_=!0}startTracking(){this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler),this.tech_.on("timeupdate",this.timeupdateHandler)}stopTracking(){this.rvf_&&(this.tech_.cancelVideoFrameCallback(this.rvf_),this.rvf_=void 0),this.tech_.off("timeupdate",this.timeupdateHandler)}addCue(e){let t=e;if(!("getCueAsHTML"in t)){t=new(A()).vttjs.VTTCue(e.startTime,e.endTime,e.text);for(const s in e)s in t||(t[s]=e[s]);t.id=e.id,t.originalCue_=e}const i=this.tech_.textTracks();for(let s=0;s<i.length;s++)i[s]!==this&&i[s].removeCue(t);this.cues_.push(t),this.cues.setCues_(this.cues_)}removeCue(e){let t=this.cues_.length;for(;t--;){const i=this.cues_[t];if(i===e||i.originalCue_&&i.originalCue_===e){this.cues_.splice(t,1),this.cues.setCues_(this.cues_);break}}}}Ds.prototype.allowedEvents_={cuechange:"cuechange"};class Au extends Za{constructor(e={}){const t=Ze(e,{kind:tp[e.kind]||""});super(t);let i=!1;Object.defineProperty(this,"enabled",{get(){return i},set(s){typeof s!="boolean"||s===i||(i=s,this.trigger("enabledchange"))}}),t.enabled&&(this.enabled=t.enabled),this.loaded_=!0}}class yu extends Za{constructor(e={}){const t=Ze(e,{kind:ep[e.kind]||""});super(t);let i=!1;Object.defineProperty(this,"selected",{get(){return i},set(s){typeof s!="boolean"||s===i||(i=s,this.trigger("selectedchange"))}}),t.selected&&(this.selected=t.selected)}}class Mi extends Xt{constructor(e={}){super();let t;const i=new Ds(e);this.kind=i.kind,this.src=i.src,this.srclang=i.language,this.label=i.label,this.default=i.default,Object.defineProperties(this,{readyState:{get(){return t}},track:{get(){return i}}}),t=Mi.NONE,i.addEventListener("loadeddata",()=>{t=Mi.LOADED,this.trigger({type:"load",target:this})})}}Mi.prototype.allowedEvents_={load:"load"},Mi.NONE=0,Mi.LOADING=1,Mi.LOADED=2,Mi.ERROR=3;const ni={audio:{ListClass:Qf,TrackClass:Au,capitalName:"Audio"},video:{ListClass:Jf,TrackClass:yu,capitalName:"Video"},text:{ListClass:fu,TrackClass:Ds,capitalName:"Text"}};Object.keys(ni).forEach(function(n){ni[n].getterName=`${n}Tracks`,ni[n].privateName=`${n}Tracks_`});const Hn={remoteText:{ListClass:fu,TrackClass:Ds,capitalName:"RemoteText",getterName:"remoteTextTracks",privateName:"remoteTextTracks_"},remoteTextEl:{ListClass:Zf,TrackClass:Mi,capitalName:"RemoteTextTrackEls",getterName:"remoteTextTrackEls",privateName:"remoteTextTrackEls_"}},Nt=Object.assign({},ni,Hn);Hn.names=Object.keys(Hn),ni.names=Object.keys(ni),Nt.names=[].concat(Hn.names).concat(ni.names);function sp(n,e,t,i,s={}){const r=n.textTracks();s.kind=e,t&&(s.label=t),i&&(s.language=i),s.tech=n;const a=new Nt.text.TrackClass(s);return r.addTrack(a),a}class Fe extends q{constructor(e={},t=function(){}){e.reportTouchActivity=!1,super(null,e,t),this.onDurationChange_=i=>this.onDurationChange(i),this.trackProgress_=i=>this.trackProgress(i),this.trackCurrentTime_=i=>this.trackCurrentTime(i),this.stopTrackingCurrentTime_=i=>this.stopTrackingCurrentTime(i),this.disposeSourceHandler_=i=>this.disposeSourceHandler(i),this.queuedHanders_=new Set,this.hasStarted_=!1,this.on("playing",function(){this.hasStarted_=!0}),this.on("loadstart",function(){this.hasStarted_=!1}),Nt.names.forEach(i=>{const s=Nt[i];e&&e[s.getterName]&&(this[s.privateName]=e[s.getterName])}),this.featuresProgressEvents||this.manualProgressOn(),this.featuresTimeupdateEvents||this.manualTimeUpdatesOn(),["Text","Audio","Video"].forEach(i=>{e[`native${i}Tracks`]===!1&&(this[`featuresNative${i}Tracks`]=!1)}),e.nativeCaptions===!1||e.nativeTextTracks===!1?this.featuresNativeTextTracks=!1:(e.nativeCaptions===!0||e.nativeTextTracks===!0)&&(this.featuresNativeTextTracks=!0),this.featuresNativeTextTracks||this.emulateTextTracks(),this.preloadTextTracks=e.preloadTextTracks!==!1,this.autoRemoteTextTracks_=new Nt.text.ListClass,this.initTrackListeners(),e.nativeControlsForTouch||this.emitTapEvents(),this.constructor&&(this.name_=this.constructor.name||"Unknown Tech")}triggerSourceset(e){this.isReady_||this.one("ready",()=>this.setTimeout(()=>this.triggerSourceset(e),1)),this.trigger({src:e,type:"sourceset"})}manualProgressOn(){this.on("durationchange",this.onDurationChange_),this.manualProgress=!0,this.one("ready",this.trackProgress_)}manualProgressOff(){this.manualProgress=!1,this.stopTrackingProgress(),this.off("durationchange",this.onDurationChange_)}trackProgress(e){this.stopTrackingProgress(),this.progressInterval=this.setInterval(nt(this,function(){const t=this.bufferedPercent();this.bufferedPercent_!==t&&this.trigger("progress"),this.bufferedPercent_=t,t===1&&this.stopTrackingProgress()}),500)}onDurationChange(e){this.duration_=this.duration()}buffered(){return hi(0,0)}bufferedPercent(){return du(this.buffered(),this.duration_)}stopTrackingProgress(){this.clearInterval(this.progressInterval)}manualTimeUpdatesOn(){this.manualTimeUpdates=!0,this.on("play",this.trackCurrentTime_),this.on("pause",this.stopTrackingCurrentTime_)}manualTimeUpdatesOff(){this.manualTimeUpdates=!1,this.stopTrackingCurrentTime(),this.off("play",this.trackCurrentTime_),this.off("pause",this.stopTrackingCurrentTime_)}trackCurrentTime(){this.currentTimeInterval&&this.stopTrackingCurrentTime(),this.currentTimeInterval=this.setInterval(function(){this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},250)}stopTrackingCurrentTime(){this.clearInterval(this.currentTimeInterval),this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})}dispose(){this.clearTracks(ni.names),this.manualProgress&&this.manualProgressOff(),this.manualTimeUpdates&&this.manualTimeUpdatesOff(),super.dispose()}clearTracks(e){e=[].concat(e),e.forEach(t=>{const i=this[`${t}Tracks`]()||[];let s=i.length;for(;s--;){const r=i[s];t==="text"&&this.removeRemoteTextTrack(r),i.removeTrack(r)}})}cleanupAutoTextTracks(){const e=this.autoRemoteTextTracks_||[];let t=e.length;for(;t--;){const i=e[t];this.removeRemoteTextTrack(i)}}reset(){}crossOrigin(){}setCrossOrigin(){}error(e){return e!==void 0&&(this.error_=new ht(e),this.trigger("error")),this.error_}played(){return this.hasStarted_?hi(0,0):hi()}play(){}setScrubbing(e){}scrubbing(){}setCurrentTime(e){this.manualTimeUpdates&&this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})}initTrackListeners(){ni.names.forEach(e=>{const t=ni[e],i=()=>{this.trigger(`${e}trackchange`)},s=this[t.getterName]();s.addEventListener("removetrack",i),s.addEventListener("addtrack",i),this.on("dispose",()=>{s.removeEventListener("removetrack",i),s.removeEventListener("addtrack",i)})})}addWebVttScript_(){if(!A().WebVTT)if(k().body.contains(this.el())){if(!this.options_["vtt.js"]&&In(fe())&&Object.keys(fe()).length>0){this.trigger("vttjsloaded");return}const e=k().createElement("script");e.src=this.options_["vtt.js"]||"https://vjs.zencdn.net/vttjs/0.14.1/vtt.min.js",e.onload=()=>{this.trigger("vttjsloaded")},e.onerror=()=>{this.trigger("vttjserror")},this.on("dispose",()=>{e.onload=null,e.onerror=null}),A().WebVTT=!0,this.el().parentNode.appendChild(e)}else this.ready(this.addWebVttScript_)}emulateTextTracks(){const e=this.textTracks(),t=this.remoteTextTracks(),i=l=>e.addTrack(l.track),s=l=>e.removeTrack(l.track);t.on("addtrack",i),t.on("removetrack",s),this.addWebVttScript_();const r=()=>this.trigger("texttrackchange"),a=()=>{r();for(let l=0;l<e.length;l++){const d=e[l];d.removeEventListener("cuechange",r),d.mode==="showing"&&d.addEventListener("cuechange",r)}};a(),e.addEventListener("change",a),e.addEventListener("addtrack",a),e.addEventListener("removetrack",a),this.on("dispose",function(){t.off("addtrack",i),t.off("removetrack",s),e.removeEventListener("change",a),e.removeEventListener("addtrack",a),e.removeEventListener("removetrack",a);for(let l=0;l<e.length;l++)e[l].removeEventListener("cuechange",r)})}addTextTrack(e,t,i){if(!e)throw new Error("TextTrack kind is required but was not provided");return sp(this,e,t,i)}createRemoteTextTrack(e){const t=Ze(e,{tech:this});return new Hn.remoteTextEl.TrackClass(t)}addRemoteTextTrack(e={},t){const i=this.createRemoteTextTrack(e);return typeof t!="boolean"&&(t=!1),this.remoteTextTrackEls().addTrackElement_(i),this.remoteTextTracks().addTrack(i.track),t===!1&&this.ready(()=>this.autoRemoteTextTracks_.addTrack(i.track)),i}removeRemoteTextTrack(e){const t=this.remoteTextTrackEls().getTrackElementByTrack_(e);this.remoteTextTrackEls().removeTrackElement_(t),this.remoteTextTracks().removeTrack(e),this.autoRemoteTextTracks_.removeTrack(e)}getVideoPlaybackQuality(){return{}}requestPictureInPicture(){return Promise.reject()}disablePictureInPicture(){return!0}setDisablePictureInPicture(){}requestVideoFrameCallback(e){const t=ti();return!this.isReady_||this.paused()?(this.queuedHanders_.add(t),this.one("playing",()=>{this.queuedHanders_.has(t)&&(this.queuedHanders_.delete(t),e())})):this.requestNamedAnimationFrame(t,e),t}cancelVideoFrameCallback(e){this.queuedHanders_.has(e)?this.queuedHanders_.delete(e):this.cancelNamedAnimationFrame(e)}setPoster(){}playsinline(){}setPlaysinline(){}overrideNativeAudioTracks(e){}overrideNativeVideoTracks(e){}canPlayType(e){return""}static canPlayType(e){return""}static canPlaySource(e,t){return Fe.canPlayType(e.type)}static isTech(e){return e.prototype instanceof Fe||e instanceof Fe||e===Fe}static registerTech(e,t){if(Fe.techs_||(Fe.techs_={}),!Fe.isTech(t))throw new Error(`Tech ${e} must be a Tech`);if(!Fe.canPlayType)throw new Error("Techs must have a static canPlayType method on them");if(!Fe.canPlaySource)throw new Error("Techs must have a static canPlaySource method on them");return e=gt(e),Fe.techs_[e]=t,Fe.techs_[Bs(e)]=t,e!=="Tech"&&Fe.defaultTechOrder_.push(e),t}static getTech(e){if(e){if(Fe.techs_&&Fe.techs_[e])return Fe.techs_[e];if(e=gt(e),A()&&A().videojs&&A().videojs[e])return qe.warn(`The ${e} tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)`),A().videojs[e]}}}Nt.names.forEach(function(n){const e=Nt[n];Fe.prototype[e.getterName]=function(){return this[e.privateName]=this[e.privateName]||new e.ListClass,this[e.privateName]}}),Fe.prototype.featuresVolumeControl=!0,Fe.prototype.featuresMuteControl=!0,Fe.prototype.featuresFullscreenResize=!1,Fe.prototype.featuresPlaybackRate=!1,Fe.prototype.featuresProgressEvents=!1,Fe.prototype.featuresSourceset=!1,Fe.prototype.featuresTimeupdateEvents=!1,Fe.prototype.featuresNativeTextTracks=!1,Fe.prototype.featuresVideoFrameCallback=!1,Fe.withSourceHandlers=function(n){n.registerSourceHandler=function(t,i){let s=n.sourceHandlers;s||(s=n.sourceHandlers=[]),i===void 0&&(i=s.length),s.splice(i,0,t)},n.canPlayType=function(t){const i=n.sourceHandlers||[];let s;for(let r=0;r<i.length;r++)if(s=i[r].canPlayType(t),s)return s;return""},n.selectSourceHandler=function(t,i){const s=n.sourceHandlers||[];let r;for(let a=0;a<s.length;a++)if(r=s[a].canHandleSource(t,i),r)return s[a];return null},n.canPlaySource=function(t,i){const s=n.selectSourceHandler(t,i);return s?s.canHandleSource(t,i):""},["seekable","seeking","duration"].forEach(function(t){const i=this[t];typeof i=="function"&&(this[t]=function(){return this.sourceHandler_&&this.sourceHandler_[t]?this.sourceHandler_[t].apply(this.sourceHandler_,arguments):i.apply(this,arguments)})},n.prototype),n.prototype.setSource=function(t){let i=n.selectSourceHandler(t,this.options_);i||(n.nativeSourceHandler?i=n.nativeSourceHandler:qe.error("No source handler found for the current source.")),this.disposeSourceHandler(),this.off("dispose",this.disposeSourceHandler_),i!==n.nativeSourceHandler&&(this.currentSource_=t),this.sourceHandler_=i.handleSource(t,this,this.options_),this.one("dispose",this.disposeSourceHandler_)},n.prototype.disposeSourceHandler=function(){this.currentSource_&&(this.clearTracks(["audio","video"]),this.currentSource_=null),this.cleanupAutoTextTracks(),this.sourceHandler_&&(this.sourceHandler_.dispose&&this.sourceHandler_.dispose(),this.sourceHandler_=null)}},q.registerComponent("Tech",Fe),Fe.registerTech("Tech",Fe),Fe.defaultTechOrder_=[];const cn={},wr={},Dr={};function rp(n,e){cn[n]=cn[n]||[],cn[n].push(e)}function ap(n,e,t){n.setTimeout(()=>dn(e,cn[e.type],t,n),1)}function op(n,e){n.forEach(t=>t.setTech&&t.setTech(e))}function lp(n,e,t){return n.reduceRight(io(t),e[t]())}function up(n,e,t,i){return e[t](n.reduce(io(t),i))}function _u(n,e,t,i=null){const s="call"+gt(t),r=n.reduce(io(s),i),a=r===Dr,l=a?null:e[t](r);return hp(n,t,l,a),l}const cp={buffered:1,currentTime:1,duration:1,muted:1,played:1,paused:1,seekable:1,volume:1,ended:1},dp={setCurrentTime:1,setMuted:1,setVolume:1},bu={play:1,pause:1};function io(n){return(e,t)=>e===Dr?Dr:t[n]?t[n](e):e}function hp(n,e,t,i){for(let s=n.length-1;s>=0;s--){const r=n[s];r[e]&&r[e](i,t)}}function fp(n){wr.hasOwnProperty(n.id())&&delete wr[n.id()]}function pp(n,e){const t=wr[n.id()];let i=null;if(t==null)return i=e(n),wr[n.id()]=[[e,i]],i;for(let s=0;s<t.length;s++){const[r,a]=t[s];r===e&&(i=a)}return i===null&&(i=e(n),t.push([e,i])),i}function dn(n={},e=[],t,i,s=[],r=!1){const[a,...l]=e;if(typeof a=="string")dn(n,cn[a],t,i,s,r);else if(a){const d=pp(i,a);if(!d.setSource)return s.push(d),dn(n,l,t,i,s,r);d.setSource(Object.assign({},n),function(p,g){if(p)return dn(n,l,t,i,s,r);s.push(d),dn(g,n.type===g.type?l:cn[g.type],t,i,s,r)})}else l.length?dn(n,l,t,i,s,r):r?t(n,s):dn(n,cn["*"],t,i,s,!0)}const mp={opus:"video/ogg",ogv:"video/ogg",mp4:"video/mp4",mov:"video/mp4",m4v:"video/mp4",mkv:"video/x-matroska",m4a:"audio/mp4",mp3:"audio/mpeg",aac:"audio/aac",caf:"audio/x-caf",flac:"audio/flac",oga:"audio/ogg",wav:"audio/wav",m3u8:"application/x-mpegURL",mpd:"application/dash+xml",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",png:"image/png",svg:"image/svg+xml",webp:"image/webp"},kr=function(n=""){const e=to(n);return mp[e.toLowerCase()]||""},gp=(n,e)=>{if(!e)return"";if(n.cache_.source.src===e&&n.cache_.source.type)return n.cache_.source.type;const t=n.cache_.sources.filter(s=>s.src===e);if(t.length)return t[0].type;const i=n.$$("source");for(let s=0;s<i.length;s++){const r=i[s];if(r.type&&r.src&&r.src===e)return r.type}return kr(e)},Eu=function(n){if(Array.isArray(n)){let e=[];n.forEach(function(t){t=Eu(t),Array.isArray(t)?e=e.concat(t):Ai(t)&&e.push(t)}),n=e}else typeof n=="string"&&n.trim()?n=[Tu({src:n})]:Ai(n)&&typeof n.src=="string"&&n.src&&n.src.trim()?n=[Tu(n)]:n=[];return n};function Tu(n){if(!n.type){const e=kr(n.src);e&&(n.type=e)}return n}var vp=`<svg xmlns="http://www.w3.org/2000/svg">
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
</svg>`;const Cu=pr?10009:mr?461:8,qn={codes:{play:415,pause:19,ff:417,rw:412,back:Cu},names:{415:"play",19:"pause",417:"ff",412:"rw",[Cu]:"back"},isEventKey(n,e){return e=e.toLowerCase(),!!(this.names[n.keyCode]&&this.names[n.keyCode]===e)},getEventName(n){if(this.names[n.keyCode])return this.names[n.keyCode];if(this.codes[n.code]){const e=this.codes[n.code];return this.names[e]}return null}},xu=5;class Ap extends Xt{constructor(e){super(),this.player_=e,this.focusableComponents=[],this.isListening_=!1,this.isPaused_=!1,this.onKeyDown_=this.onKeyDown_.bind(this),this.lastFocusedComponent_=null}start(){this.isListening_||(this.player_.on("keydown",this.onKeyDown_),this.player_.on("modalKeydown",this.onKeyDown_),this.player_.on("loadedmetadata",()=>{this.focus(this.updateFocusableComponents()[0])}),this.player_.on("modalclose",()=>{this.refocusComponent()}),this.player_.on("focusin",this.handlePlayerFocus_.bind(this)),this.player_.on("focusout",this.handlePlayerBlur_.bind(this)),this.isListening_=!0,this.player_.errorDisplay&&this.player_.errorDisplay.on("aftermodalfill",()=>{this.updateFocusableComponents(),this.focusableComponents.length&&(this.focusableComponents.length>1?this.focusableComponents[1].focus():this.focusableComponents[0].focus())}))}stop(){this.player_.off("keydown",this.onKeyDown_),this.isListening_=!1}onKeyDown_(e){const t=e.originalEvent?e.originalEvent:e;if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(t.key)){if(this.isPaused_)return;t.preventDefault();const i=t.key.substring(5).toLowerCase();this.move(i)}else if(qn.isEventKey(t,"play")||qn.isEventKey(t,"pause")||qn.isEventKey(t,"ff")||qn.isEventKey(t,"rw")){t.preventDefault();const i=qn.getEventName(t);this.performMediaAction_(i)}else qn.isEventKey(t,"Back")&&e.target&&typeof e.target.closeable=="function"&&e.target.closeable()&&(t.preventDefault(),e.target.close())}performMediaAction_(e){if(this.player_)switch(e){case"play":this.player_.paused()&&this.player_.play();break;case"pause":this.player_.paused()||this.player_.pause();break;case"ff":this.userSeek_(this.player_.currentTime()+xu);break;case"rw":this.userSeek_(this.player_.currentTime()-xu);break}}userSeek_(e){this.player_.liveTracker&&this.player_.liveTracker.isLive()&&this.player_.liveTracker.nextSeekedFromUser(),this.player_.currentTime(e)}pause(){this.isPaused_=!0}resume(){this.isPaused_=!1}handlePlayerBlur_(e){const t=e.relatedTarget;let i=null;const s=this.getCurrentComponent(e.target);t&&(i=!!t.closest(".video-js"),t.classList.contains("vjs-text-track-settings")&&!this.isPaused_&&this.searchForTrackSelect_()),(!e.currentTarget.contains(e.relatedTarget)&&!i||!t)&&(s&&s.name()==="CloseButton"?this.refocusComponent():(this.pause(),s&&s.el()&&(this.lastFocusedComponent_=s)))}handlePlayerFocus_(){this.getCurrentComponent()&&this.getCurrentComponent().getIsFocusable()&&this.resume()}updateFocusableComponents(){const e=this.player_,t=[];function i(s){for(const r of s)r.hasOwnProperty("el_")&&r.getIsFocusable()&&r.getIsAvailableToBeFocused(r.el())&&t.push(r),r.hasOwnProperty("children_")&&r.children_.length>0&&i(r.children_)}return e.children_.forEach(s=>{if(s.hasOwnProperty("el_"))if(s.getIsFocusable&&s.getIsAvailableToBeFocused&&s.getIsFocusable()&&s.getIsAvailableToBeFocused(s.el())){t.push(s);return}else s.hasOwnProperty("children_")&&s.children_.length>0?i(s.children_):s.hasOwnProperty("items")&&s.items.length>0?i(s.items):this.findSuitableDOMChild(s)&&t.push(s);if(s.name_==="ErrorDisplay"&&s.opened_){const r=s.el_.querySelector(".vjs-errors-ok-button-container");r&&r.querySelectorAll("button").forEach((l,d)=>{t.push({name:()=>"ModalButton"+(d+1),el:()=>l,getPositions:()=>{const p=l.getBoundingClientRect(),g={x:p.x,y:p.y,width:p.width,height:p.height,top:p.top,right:p.right,bottom:p.bottom,left:p.left},y={x:p.left+p.width/2,y:p.top+p.height/2,width:0,height:0,top:p.top+p.height/2,right:p.left+p.width/2,bottom:p.top+p.height/2,left:p.left+p.width/2};return{boundingClientRect:g,center:y}},getIsAvailableToBeFocused:()=>!0,getIsFocusable:p=>!0,focus:()=>l.focus()})})}}),this.focusableComponents=t,this.focusableComponents}findSuitableDOMChild(e){function t(i){if(e.getIsFocusable(i)&&e.getIsAvailableToBeFocused(i))return i;for(let s=0;s<i.children.length;s++){const r=i.children[s],a=t(r);if(a)return a}return null}return e.el()?t(e.el()):null}getCurrentComponent(e){this.updateFocusableComponents();const t=e||document.activeElement;if(this.focusableComponents.length){for(const i of this.focusableComponents)if(i.el()===t)return i}}add(e){const t=[...this.focusableComponents];e.hasOwnProperty("el_")&&e.getIsFocusable()&&e.getIsAvailableToBeFocused(e.el())&&t.push(e),this.focusableComponents=t,this.trigger({type:"focusableComponentsChanged",focusableComponents:this.focusableComponents})}remove(e){for(let t=0;t<this.focusableComponents.length;t++)if(this.focusableComponents[t].name()===e.name()){this.focusableComponents.splice(t,1),this.trigger({type:"focusableComponentsChanged",focusableComponents:this.focusableComponents});return}}clear(){this.focusableComponents.length>0&&(this.focusableComponents=[],this.trigger({type:"focusableComponentsChanged",focusableComponents:this.focusableComponents}))}move(e){const t=this.getCurrentComponent();if(!t)return;const i=t.getPositions(),s=this.focusableComponents.filter(a=>a!==t&&this.isInDirection_(i.boundingClientRect,a.getPositions().boundingClientRect,e)),r=this.findBestCandidate_(i.center,s,e);r?this.focus(r):this.trigger({type:"endOfFocusableComponents",direction:e,focusedComponent:t})}findBestCandidate_(e,t,i){let s=1/0,r=null;for(const a of t){const l=a.getPositions().center,d=this.calculateDistance_(e,l,i);d<s&&(s=d,r=a)}return r}isInDirection_(e,t,i){switch(i){case"right":return t.left>=e.right;case"left":return t.right<=e.left;case"down":return t.top>=e.bottom;case"up":return t.bottom<=e.top;default:return!1}}refocusComponent(){if(this.lastFocusedComponent_){this.player_.userActive()||this.player_.userActive(!0),this.updateFocusableComponents();for(let e=0;e<this.focusableComponents.length;e++)if(this.focusableComponents[e].name()===this.lastFocusedComponent_.name()){this.focus(this.focusableComponents[e]);return}}else this.focus(this.updateFocusableComponents()[0])}focus(e){typeof e=="object"&&(e.getIsAvailableToBeFocused(e.el())?e.focus():this.findSuitableDOMChild(e)&&this.findSuitableDOMChild(e).focus())}calculateDistance_(e,t,i){const s=Math.abs(e.x-t.x),r=Math.abs(e.y-t.y);let a;switch(i){case"right":case"left":a=s+r*100;break;case"up":a=r*2+s*.5;break;case"down":a=r*5+s;break;default:a=s+r}return a}searchForTrackSelect_(){const e=this;for(const t of e.updateFocusableComponents())if(t.constructor.name==="TextTrackSelect"){e.focus(t);break}}}class yp extends q{constructor(e,t,i){const s=Ze({createEl:!1},t);if(super(e,s,i),!t.playerOptions.sources||t.playerOptions.sources.length===0)for(let r=0,a=t.playerOptions.techOrder;r<a.length;r++){const l=gt(a[r]);let d=Fe.getTech(l);if(l||(d=q.getComponent(l)),d&&d.isSupported()){e.loadTech_(l);break}}else e.src(t.playerOptions.sources)}}q.registerComponent("MediaLoader",yp);class Ir extends q{constructor(e,t){super(e,t),this.options_.controlText&&this.controlText(this.options_.controlText),this.handleMouseOver_=i=>this.handleMouseOver(i),this.handleMouseOut_=i=>this.handleMouseOut(i),this.handleClick_=i=>this.handleClick(i),this.handleKeyDown_=i=>this.handleKeyDown(i),this.emitTapEvents(),this.enable()}createEl(e="div",t={},i={}){t=Object.assign({className:this.buildCSSClass(),tabIndex:0},t),e==="button"&&qe.error(`Creating a ClickableComponent with an HTML element of ${e} is not supported; use a Button instead.`),i=Object.assign({role:"button"},i),this.tabIndex_=t.tabIndex;const s=Oe(e,t,i);return this.player_.options_.experimentalSvgIcons||s.appendChild(Oe("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),this.createControlTextEl(s),s}dispose(){this.controlTextEl_=null,super.dispose()}createControlTextEl(e){return this.controlTextEl_=Oe("span",{className:"vjs-control-text"},{"aria-live":"polite"}),e&&e.appendChild(this.controlTextEl_),this.controlText(this.controlText_,e),this.controlTextEl_}controlText(e,t=this.el()){if(e===void 0)return this.controlText_||"Need Text";const i=this.localize(e);this.controlText_=e,Yi(this.controlTextEl_,i),!this.nonIconControl&&!this.player_.options_.noUITitleAttributes&&t.setAttribute("title",i)}buildCSSClass(){return`vjs-control vjs-button ${super.buildCSSClass()}`}enable(){this.enabled_||(this.enabled_=!0,this.removeClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","false"),typeof this.tabIndex_!="undefined"&&this.el_.setAttribute("tabIndex",this.tabIndex_),this.on(["tap","click"],this.handleClick_),this.on("keydown",this.handleKeyDown_))}disable(){this.enabled_=!1,this.addClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","true"),typeof this.tabIndex_!="undefined"&&this.el_.removeAttribute("tabIndex"),this.off("mouseover",this.handleMouseOver_),this.off("mouseout",this.handleMouseOut_),this.off(["tap","click"],this.handleClick_),this.off("keydown",this.handleKeyDown_)}handleLanguagechange(){this.controlText(this.controlText_)}handleClick(e){this.options_.clickHandler&&this.options_.clickHandler.call(this,arguments)}handleKeyDown(e){e.key===" "||e.key==="Enter"?(e.preventDefault(),e.stopPropagation(),this.trigger("click")):super.handleKeyDown(e)}}q.registerComponent("ClickableComponent",Ir);class no extends Ir{constructor(e,t){super(e,t),this.update(),this.update_=i=>this.update(i),e.on("posterchange",this.update_)}dispose(){this.player().off("posterchange",this.update_),super.dispose()}createEl(){return Oe("div",{className:"vjs-poster"})}crossOrigin(e){if(typeof e=="undefined")return this.$("img")?this.$("img").crossOrigin:this.player_.tech_&&this.player_.tech_.isReady_?this.player_.crossOrigin():this.player_.options_.crossOrigin||this.player_.options_.crossorigin||null;if(e!==null&&e!=="anonymous"&&e!=="use-credentials"){this.player_.log.warn(`crossOrigin must be null,  "anonymous" or "use-credentials", given "${e}"`);return}this.$("img")&&(this.$("img").crossOrigin=e)}update(e){const t=this.player().poster();this.setSrc(t),t?this.show():this.hide()}setSrc(e){if(!e){this.el_.textContent="";return}this.$("img")||this.el_.appendChild(Oe("picture",{className:"vjs-poster",tabIndex:-1},{},Oe("img",{loading:"lazy",crossOrigin:this.crossOrigin()},{alt:""}))),this.$("img").src=e}handleClick(e){this.player_.controls()&&(this.player_.tech(!0)&&this.player_.tech(!0).focus(),this.player_.paused()?Ei(this.player_.play()):this.player_.pause())}}no.prototype.crossorigin=no.prototype.crossOrigin,q.registerComponent("PosterImage",no);const si="#222",Su="#ccc",_p={monospace:"monospace",sansSerif:"sans-serif",serif:"serif",monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace',monospaceSerif:'"Courier New", monospace',proportionalSansSerif:"sans-serif",proportionalSerif:"serif",casual:'"Comic Sans MS", Impact, fantasy',script:'"Monotype Corsiva", cursive',smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'};function so(n,e){let t;if(n.length===4)t=n[1]+n[1]+n[2]+n[2]+n[3]+n[3];else if(n.length===7)t=n.slice(1);else throw new Error("Invalid color code provided, "+n+"; must be formatted as e.g. #f0e or #f604e2.");return"rgba("+parseInt(t.slice(0,2),16)+","+parseInt(t.slice(2,4),16)+","+parseInt(t.slice(4,6),16)+","+e+")"}function Ti(n,e,t){try{n.style[e]=t}catch(i){return}}function ju(n){return n?`${n}px`:""}class bp extends q{constructor(e,t,i){super(e,t,i);const s=a=>this.updateDisplay(a),r=a=>{this.updateDisplayOverlay(),this.updateDisplay(a)};e.on("loadstart",a=>this.toggleDisplay(a)),e.on("texttrackchange",s),e.on("loadedmetadata",a=>{this.updateDisplayOverlay(),this.preselectTrack(a)}),e.ready(nt(this,function(){if(e.tech_&&e.tech_.featuresNativeTextTracks){this.hide();return}e.on("fullscreenchange",r),e.on("playerresize",r);const a=A().screen.orientation||A(),l=A().screen.orientation?"change":"orientationchange";a.addEventListener(l,r),e.on("dispose",()=>a.removeEventListener(l,r));const d=this.options_.playerOptions.tracks||[];for(let p=0;p<d.length;p++)this.player_.addRemoteTextTrack(d[p],!0);this.preselectTrack()}))}preselectTrack(){const e={captions:1,subtitles:1},t=this.player_.textTracks(),i=this.player_.cache_.selectedLanguage;let s,r,a;for(let l=0;l<t.length;l++){const d=t[l];i&&i.enabled&&i.language&&i.language===d.language&&d.kind in e?d.kind===i.kind?a=d:a||(a=d):i&&!i.enabled?(a=null,s=null,r=null):d.default&&(d.kind==="descriptions"&&!s?s=d:d.kind in e&&!r&&(r=d))}a?a.mode="showing":r?r.mode="showing":s&&(s.mode="showing")}toggleDisplay(){this.player_.tech_&&this.player_.tech_.featuresNativeTextTracks?this.hide():this.show()}createEl(){return super.createEl("div",{className:"vjs-text-track-display"},{translate:"yes","aria-live":"off","aria-atomic":"true"})}clearDisplay(){typeof A().WebVTT=="function"&&A().WebVTT.processCues(A(),[],this.el_)}updateDisplay(){const e=this.player_.textTracks(),t=this.options_.allowMultipleShowingTracks;if(this.clearDisplay(),t){const a=[];for(let l=0;l<e.length;++l){const d=e[l];d.mode==="showing"&&a.push(d)}this.updateForTrack(a);return}let i=null,s=null,r=e.length;for(;r--;){const a=e[r];a.mode==="showing"&&(a.kind==="descriptions"?i=a:s=a)}if(s?(this.getAttribute("aria-live")!=="off"&&this.setAttribute("aria-live","off"),this.updateForTrack(s)):i&&(this.getAttribute("aria-live")!=="assertive"&&this.setAttribute("aria-live","assertive"),this.updateForTrack(i)),!A().CSS.supports("inset","10px")){const a=this.el_,l=a.querySelectorAll(".vjs-text-track-cue"),d=this.player_.controlBar.el_.getBoundingClientRect().height,p=this.player_.el_.getBoundingClientRect().height;a.style="",Ti(a,"position","relative"),Ti(a,"height",p-d+"px"),Ti(a,"top","unset"),gr?Ti(a,"bottom",p+"px"):Ti(a,"bottom","0px"),l.length>0&&l.forEach(g=>{if(g.style.inset){const y=g.style.inset.split(" ");y.length===3&&Object.assign(g.style,{top:y[0],right:y[1],bottom:y[2],left:"unset"})}})}}updateDisplayOverlay(){if(!this.player_.videoHeight()||!A().CSS.supports("inset-inline: 10px"))return;const e=this.player_.currentWidth(),t=this.player_.currentHeight(),i=e/t,s=this.player_.videoWidth()/this.player_.videoHeight();let r=0,a=0;Math.abs(i-s)>.1&&(i>s?r=Math.round((e-t*s)/2):a=Math.round((t-e/s)/2)),Ti(this.el_,"insetInline",ju(r)),Ti(this.el_,"insetBlock",ju(a))}updateDisplayState(e){const t=this.player_.textTrackSettings.getValues(),i=e.activeCues;let s=i.length;for(;s--;){const r=i[s];if(!r)continue;const a=r.displayState;if(t.color&&(a.firstChild.style.color=t.color),t.textOpacity&&Ti(a.firstChild,"color",so(t.color||"#fff",t.textOpacity)),t.backgroundColor&&(a.firstChild.style.backgroundColor=t.backgroundColor),t.backgroundOpacity&&Ti(a.firstChild,"backgroundColor",so(t.backgroundColor||"#000",t.backgroundOpacity)),t.windowColor&&(t.windowOpacity?Ti(a,"backgroundColor",so(t.windowColor,t.windowOpacity)):a.style.backgroundColor=t.windowColor),t.edgeStyle&&(t.edgeStyle==="dropshadow"?a.firstChild.style.textShadow=`2px 2px 3px ${si}, 2px 2px 4px ${si}, 2px 2px 5px ${si}`:t.edgeStyle==="raised"?a.firstChild.style.textShadow=`1px 1px ${si}, 2px 2px ${si}, 3px 3px ${si}`:t.edgeStyle==="depressed"?a.firstChild.style.textShadow=`1px 1px ${Su}, 0 1px ${Su}, -1px -1px ${si}, 0 -1px ${si}`:t.edgeStyle==="uniform"&&(a.firstChild.style.textShadow=`0 0 4px ${si}, 0 0 4px ${si}, 0 0 4px ${si}, 0 0 4px ${si}`)),t.fontPercent&&t.fontPercent!==1){const l=A().parseFloat(a.style.fontSize);a.style.fontSize=l*t.fontPercent+"px",a.style.height="auto",a.style.top="auto"}t.fontFamily&&t.fontFamily!=="default"&&(t.fontFamily==="small-caps"?a.firstChild.style.fontVariant="small-caps":a.firstChild.style.fontFamily=_p[t.fontFamily])}}updateForTrack(e){if(Array.isArray(e)||(e=[e]),typeof A().WebVTT!="function"||e.every(i=>!i.activeCues))return;const t=[];for(let i=0;i<e.length;++i){const s=e[i];for(let r=0;r<s.activeCues.length;++r)t.push(s.activeCues[r])}A().WebVTT.processCues(A(),t,this.el_);for(let i=0;i<e.length;++i){const s=e[i];for(let r=0;r<s.activeCues.length;++r){const a=s.activeCues[r].displayState;on(a,"vjs-text-track-cue","vjs-text-track-cue-"+(s.language?s.language:i)),s.language&&Nn(a,"lang",s.language)}this.player_.textTrackSettings&&this.updateDisplayState(s)}}}q.registerComponent("TextTrackDisplay",bp);class Ep extends q{createEl(){const e=this.player_.isAudio(),t=this.localize(e?"Audio Player":"Video Player"),i=Oe("span",{className:"vjs-control-text",textContent:this.localize("{1} is loading.",[t])}),s=super.createEl("div",{className:"vjs-loading-spinner",dir:"ltr"});return s.appendChild(i),s}handleLanguagechange(){this.$(".vjs-control-text").textContent=this.localize("{1} is loading.",[this.player_.isAudio()?"Audio Player":"Video Player"])}}q.registerComponent("LoadingSpinner",Ep);class It extends Ir{createEl(e,t={},i={}){e="button",t=Object.assign({className:this.buildCSSClass()},t),i=Object.assign({type:"button"},i);const s=Oe(e,t,i);return this.player_.options_.experimentalSvgIcons||s.appendChild(Oe("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),this.createControlTextEl(s),s}addChild(e,t={}){const i=this.constructor.name;return qe.warn(`Adding an actionable (user controllable) child to a Button (${i}) is not supported; use a ClickableComponent instead.`),q.prototype.addChild.call(this,e,t)}enable(){super.enable(),this.el_.removeAttribute("disabled")}disable(){super.disable(),this.el_.setAttribute("disabled","disabled")}handleKeyDown(e){if(e.key===" "||e.key==="Enter"){e.stopPropagation();return}super.handleKeyDown(e)}}q.registerComponent("Button",It);class Bu extends It{constructor(e,t){super(e,t),this.mouseused_=!1,this.setIcon("play"),this.on("mousedown",i=>this.handleMouseDown(i))}buildCSSClass(){return"vjs-big-play-button"}handleClick(e){const t=this.player_.play();if(this.mouseused_&&"clientX"in e&&"clientY"in e){Ei(t),this.player_.tech(!0)&&this.player_.tech(!0).focus();return}const i=this.player_.getChild("controlBar"),s=i&&i.getChild("playToggle");if(!s){this.player_.tech(!0).focus();return}const r=()=>s.focus();ws(t)?t.then(r,()=>{}):this.setTimeout(r,1)}handleKeyDown(e){this.mouseused_=!1,super.handleKeyDown(e)}handleMouseDown(e){this.mouseused_=!0}}Bu.prototype.controlText_="Play Video",q.registerComponent("BigPlayButton",Bu);class Tp extends It{constructor(e,t){super(e,t),this.setIcon("cancel"),this.controlText(t&&t.controlText||this.localize("Close"))}buildCSSClass(){return`vjs-close-button ${super.buildCSSClass()}`}handleClick(e){this.trigger({type:"close",bubbles:!1})}handleKeyDown(e){e.key==="Escape"?(e.preventDefault(),e.stopPropagation(),this.trigger("click")):super.handleKeyDown(e)}}q.registerComponent("CloseButton",Tp);class wu extends It{constructor(e,t={}){super(e,t),t.replay=t.replay===void 0||t.replay,this.setIcon("play"),this.on(e,"play",i=>this.handlePlay(i)),this.on(e,"pause",i=>this.handlePause(i)),t.replay&&this.on(e,"ended",i=>this.handleEnded(i))}buildCSSClass(){return`vjs-play-control ${super.buildCSSClass()}`}handleClick(e){this.player_.paused()?Ei(this.player_.play()):this.player_.pause()}handleSeeked(e){this.removeClass("vjs-ended"),this.player_.paused()?this.handlePause(e):this.handlePlay(e)}handlePlay(e){this.removeClass("vjs-ended","vjs-paused"),this.addClass("vjs-playing"),this.setIcon("pause"),this.controlText("Pause")}handlePause(e){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.setIcon("play"),this.controlText("Play")}handleEnded(e){this.removeClass("vjs-playing"),this.addClass("vjs-ended"),this.setIcon("replay"),this.controlText("Replay"),this.one(this.player_,"seeked",t=>this.handleSeeked(t))}}wu.prototype.controlText_="Play",q.registerComponent("PlayToggle",wu);class Wn extends q{constructor(e,t){super(e,t),this.on(e,["timeupdate","ended","seeking"],i=>this.update(i)),this.updateTextNode_()}createEl(){const e=this.buildCSSClass(),t=super.createEl("div",{className:`${e} vjs-time-control vjs-control`}),i=Oe("span",{className:"vjs-control-text",textContent:`${this.localize(this.labelText_)}\xA0`},{role:"presentation"});return t.appendChild(i),this.contentEl_=Oe("span",{className:`${e}-display`},{role:"presentation"}),t.appendChild(this.contentEl_),t}dispose(){this.contentEl_=null,this.textNode_=null,super.dispose()}update(e){!this.player_.options_.enableSmoothSeeking&&e.type==="seeking"||this.updateContent(e)}updateTextNode_(e=0){e=un(e),this.formattedTime_!==e&&(this.formattedTime_=e,this.requestNamedAnimationFrame("TimeDisplay#updateTextNode_",()=>{if(!this.contentEl_)return;let t=this.textNode_;t&&this.contentEl_.firstChild!==t&&(t=null,qe.warn("TimeDisplay#updateTextnode_: Prevented replacement of text node element since it was no longer a child of this node. Appending a new node instead.")),this.textNode_=k().createTextNode(this.formattedTime_),this.textNode_&&(t?this.contentEl_.replaceChild(this.textNode_,t):this.contentEl_.appendChild(this.textNode_))}))}updateContent(e){}}Wn.prototype.labelText_="Time",Wn.prototype.controlText_="Time",q.registerComponent("TimeDisplay",Wn);class ro extends Wn{buildCSSClass(){return"vjs-current-time"}updateContent(e){let t;this.player_.ended()?t=this.player_.duration():t=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime(),this.updateTextNode_(t)}}ro.prototype.labelText_="Current Time",ro.prototype.controlText_="Current Time",q.registerComponent("CurrentTimeDisplay",ro);class ao extends Wn{constructor(e,t){super(e,t);const i=s=>this.updateContent(s);this.on(e,"durationchange",i),this.on(e,"loadstart",i),this.on(e,"loadedmetadata",i)}buildCSSClass(){return"vjs-duration"}updateContent(e){const t=this.player_.duration();this.updateTextNode_(t)}}ao.prototype.labelText_="Duration",ao.prototype.controlText_="Duration",q.registerComponent("DurationDisplay",ao);class Cp extends q{createEl(){const e=super.createEl("div",{className:"vjs-time-control vjs-time-divider"},{"aria-hidden":!0}),t=super.createEl("div"),i=super.createEl("span",{textContent:"/"});return t.appendChild(i),e.appendChild(t),e}}q.registerComponent("TimeDivider",Cp);class oo extends Wn{constructor(e,t){super(e,t),this.on(e,"durationchange",i=>this.updateContent(i))}buildCSSClass(){return"vjs-remaining-time"}createEl(){const e=super.createEl();return this.options_.displayNegative!==!1&&e.insertBefore(Oe("span",{},{"aria-hidden":!0},"-"),this.contentEl_),e}updateContent(e){if(typeof this.player_.duration()!="number")return;let t;this.player_.ended()?t=0:this.player_.remainingTimeDisplay?t=this.player_.remainingTimeDisplay():t=this.player_.remainingTime(),this.updateTextNode_(t)}}oo.prototype.labelText_="Remaining Time",oo.prototype.controlText_="Remaining Time",q.registerComponent("RemainingTimeDisplay",oo);class xp extends q{constructor(e,t){super(e,t),this.updateShowing(),this.on(this.player(),"durationchange",i=>this.updateShowing(i))}createEl(){const e=super.createEl("div",{className:"vjs-live-control vjs-control"});return this.contentEl_=Oe("div",{className:"vjs-live-display"},{"aria-live":"off"}),this.contentEl_.appendChild(Oe("span",{className:"vjs-control-text",textContent:`${this.localize("Stream Type")}\xA0`})),this.contentEl_.appendChild(k().createTextNode(this.localize("LIVE"))),e.appendChild(this.contentEl_),e}dispose(){this.contentEl_=null,super.dispose()}updateShowing(e){this.player().duration()===1/0?this.show():this.hide()}}q.registerComponent("LiveDisplay",xp);class Du extends It{constructor(e,t){super(e,t),this.updateLiveEdgeStatus(),this.player_.liveTracker&&(this.updateLiveEdgeStatusHandler_=i=>this.updateLiveEdgeStatus(i),this.on(this.player_.liveTracker,"liveedgechange",this.updateLiveEdgeStatusHandler_))}createEl(){const e=super.createEl("button",{className:"vjs-seek-to-live-control vjs-control"});return this.setIcon("circle",e),this.textEl_=Oe("span",{className:"vjs-seek-to-live-text",textContent:this.localize("LIVE")},{"aria-hidden":"true"}),e.appendChild(this.textEl_),e}updateLiveEdgeStatus(){!this.player_.liveTracker||this.player_.liveTracker.atLiveEdge()?(this.setAttribute("aria-disabled",!0),this.addClass("vjs-at-live-edge"),this.controlText("Seek to live, currently playing live")):(this.setAttribute("aria-disabled",!1),this.removeClass("vjs-at-live-edge"),this.controlText("Seek to live, currently behind live"))}handleClick(){this.player_.liveTracker.seekToLiveEdge()}dispose(){this.player_.liveTracker&&this.off(this.player_.liveTracker,"liveedgechange",this.updateLiveEdgeStatusHandler_),this.textEl_=null,super.dispose()}}Du.prototype.controlText_="Seek to live, currently playing live",q.registerComponent("SeekToLive",Du);function ks(n,e,t){return n=Number(n),Math.min(t,Math.max(e,isNaN(n)?e:n))}var Sp=Object.freeze({__proto__:null,clamp:ks});class lo extends q{constructor(e,t){super(e,t),this.handleMouseDown_=i=>this.handleMouseDown(i),this.handleMouseUp_=i=>this.handleMouseUp(i),this.handleKeyDown_=i=>this.handleKeyDown(i),this.handleClick_=i=>this.handleClick(i),this.handleMouseMove_=i=>this.handleMouseMove(i),this.update_=i=>this.update(i),this.bar=this.getChild(this.options_.barName),this.vertical(!!this.options_.vertical),this.enable()}enabled(){return this.enabled_}enable(){this.enabled()||(this.on("mousedown",this.handleMouseDown_),this.on("touchstart",this.handleMouseDown_),this.on("keydown",this.handleKeyDown_),this.on("click",this.handleClick_),this.on(this.player_,"controlsvisible",this.update),this.playerEvent&&this.on(this.player_,this.playerEvent,this.update),this.removeClass("disabled"),this.setAttribute("tabindex",0),this.enabled_=!0)}disable(){if(!this.enabled())return;const e=this.bar.el_.ownerDocument;this.off("mousedown",this.handleMouseDown_),this.off("touchstart",this.handleMouseDown_),this.off("keydown",this.handleKeyDown_),this.off("click",this.handleClick_),this.off(this.player_,"controlsvisible",this.update_),this.off(e,"mousemove",this.handleMouseMove_),this.off(e,"mouseup",this.handleMouseUp_),this.off(e,"touchmove",this.handleMouseMove_),this.off(e,"touchend",this.handleMouseUp_),this.removeAttribute("tabindex"),this.addClass("disabled"),this.playerEvent&&this.off(this.player_,this.playerEvent,this.update),this.enabled_=!1}createEl(e,t={},i={}){return t.className=t.className+" vjs-slider",t=Object.assign({tabIndex:0},t),i=Object.assign({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100},i),super.createEl(e,t,i)}handleMouseDown(e){const t=this.bar.el_.ownerDocument;e.type==="mousedown"&&e.preventDefault(),e.type==="touchstart"&&!_i&&e.preventDefault(),ql(),this.addClass("vjs-sliding"),this.trigger("slideractive"),this.on(t,"mousemove",this.handleMouseMove_),this.on(t,"mouseup",this.handleMouseUp_),this.on(t,"touchmove",this.handleMouseMove_),this.on(t,"touchend",this.handleMouseUp_),this.handleMouseMove(e,!0)}handleMouseMove(e){}handleMouseUp(e){const t=this.bar.el_.ownerDocument;Wl(),this.removeClass("vjs-sliding"),this.trigger("sliderinactive"),this.off(t,"mousemove",this.handleMouseMove_),this.off(t,"mouseup",this.handleMouseUp_),this.off(t,"touchmove",this.handleMouseMove_),this.off(t,"touchend",this.handleMouseUp_),this.update()}update(){if(!this.el_||!this.bar)return;const e=this.getProgress();return e===this.progress_||(this.progress_=e,this.requestNamedAnimationFrame("Slider#update",()=>{const t=this.vertical()?"height":"width";this.bar.el().style[t]=(e*100).toFixed(2)+"%"})),e}getProgress(){return Number(ks(this.getPercent(),0,1).toFixed(4))}calculateDistance(e){const t=_r(this.el_,e);return this.vertical()?t.y:t.x}handleKeyDown(e){const t=this.options_.playerOptions.spatialNavigation,i=t&&t.enabled,s=t&&t.horizontalSeek;i?s&&e.key==="ArrowLeft"||!s&&e.key==="ArrowDown"?(e.preventDefault(),e.stopPropagation(),this.stepBack()):s&&e.key==="ArrowRight"||!s&&e.key==="ArrowUp"?(e.preventDefault(),e.stopPropagation(),this.stepForward()):super.handleKeyDown(e):e.key==="ArrowLeft"||e.key==="ArrowDown"?(e.preventDefault(),e.stopPropagation(),this.stepBack()):e.key==="ArrowUp"||e.key==="ArrowRight"?(e.preventDefault(),e.stopPropagation(),this.stepForward()):super.handleKeyDown(e)}handleClick(e){e.stopPropagation(),e.preventDefault()}vertical(e){if(e===void 0)return this.vertical_||!1;this.vertical_=!!e,this.vertical_?this.addClass("vjs-slider-vertical"):this.addClass("vjs-slider-horizontal")}}q.registerComponent("Slider",lo);const uo=(n,e)=>ks(n/e*100,0,100).toFixed(2)+"%";class jp extends q{constructor(e,t){super(e,t),this.partEls_=[],this.on(e,"progress",i=>this.update(i))}createEl(){const e=super.createEl("div",{className:"vjs-load-progress"}),t=Oe("span",{className:"vjs-control-text"}),i=Oe("span",{textContent:this.localize("Loaded")}),s=k().createTextNode(": ");return this.percentageEl_=Oe("span",{className:"vjs-control-text-loaded-percentage",textContent:"0%"}),e.appendChild(t),t.appendChild(i),t.appendChild(s),t.appendChild(this.percentageEl_),e}dispose(){this.partEls_=null,this.percentageEl_=null,super.dispose()}update(e){this.requestNamedAnimationFrame("LoadProgressBar#update",()=>{const t=this.player_.liveTracker,i=this.player_.buffered(),s=t&&t.isLive()?t.seekableEnd():this.player_.duration(),r=this.player_.bufferedEnd(),a=this.partEls_,l=uo(r,s);this.percent_!==l&&(this.el_.style.width=l,Yi(this.percentageEl_,l),this.percent_=l);for(let d=0;d<i.length;d++){const p=i.start(d),g=i.end(d);let y=a[d];y||(y=this.el_.appendChild(Oe()),a[d]=y),!(y.dataset.start===p&&y.dataset.end===g)&&(y.dataset.start=p,y.dataset.end=g,y.style.left=uo(p,r),y.style.width=uo(g-p,r))}for(let d=a.length;d>i.length;d--)this.el_.removeChild(a[d-1]);a.length=i.length})}}q.registerComponent("LoadProgressBar",jp);class Bp extends q{constructor(e,t){super(e,t),this.update=bi(nt(this,this.update),ii)}createEl(){return super.createEl("div",{className:"vjs-time-tooltip"},{"aria-hidden":"true"})}update(e,t,i){const s=xs(this.el_),r=Mn(this.player_.el()),a=e.width*t;if(!r||!s)return;let l=e.left-r.left+a,d=e.width-a+(r.right-e.right);d||(d=e.width-a,l=a);let p=s.width/2;l<p?p+=p-l:d<p&&(p=d),p<0?p=0:p>s.width&&(p=s.width),p=Math.round(p),this.el_.style.right=`-${p}px`,this.write(i)}write(e){Yi(this.el_,e)}updateTime(e,t,i,s){this.requestNamedAnimationFrame("TimeTooltip#updateTime",()=>{let r;const a=this.player_.duration();if(this.player_.liveTracker&&this.player_.liveTracker.isLive()){const l=this.player_.liveTracker.liveWindow(),d=l-t*l;r=(d<1?"":"-")+un(d,l)}else r=un(i,a);this.update(e,t,r),s&&s()})}}q.registerComponent("TimeTooltip",Bp);class co extends q{constructor(e,t){super(e,t),this.setIcon("circle"),this.update=bi(nt(this,this.update),ii)}createEl(){return super.createEl("div",{className:"vjs-play-progress vjs-slider-bar"},{"aria-hidden":"true"})}update(e,t){const i=this.getChild("timeTooltip");if(!i)return;const s=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();i.updateTime(e,t,s)}}co.prototype.options_={children:[]},!Lt&&!yi&&co.prototype.options_.children.push("timeTooltip"),q.registerComponent("PlayProgressBar",co);class ku extends q{constructor(e,t){super(e,t),this.update=bi(nt(this,this.update),ii)}createEl(){return super.createEl("div",{className:"vjs-mouse-display"})}update(e,t){const i=t*this.player_.duration();this.getChild("timeTooltip").updateTime(e,t,i,()=>{this.el_.style.left=`${e.width*t}px`})}}ku.prototype.options_={children:["timeTooltip"]},q.registerComponent("MouseTimeDisplay",ku);const Pr=5,Iu=12;class ho extends lo{constructor(e,t){super(e,t),this.setEventHandlers_()}setEventHandlers_(){this.update_=nt(this,this.update),this.update=bi(this.update_,ii),this.on(this.player_,["durationchange","timeupdate"],this.update),this.on(this.player_,["ended"],this.update_),this.player_.liveTracker&&this.on(this.player_.liveTracker,"liveedgechange",this.update),this.updateInterval=null,this.enableIntervalHandler_=e=>this.enableInterval_(e),this.disableIntervalHandler_=e=>this.disableInterval_(e),this.on(this.player_,["playing"],this.enableIntervalHandler_),this.on(this.player_,["ended","pause","waiting"],this.disableIntervalHandler_),"hidden"in k()&&"visibilityState"in k()&&this.on(k(),"visibilitychange",this.toggleVisibility_)}toggleVisibility_(e){k().visibilityState==="hidden"?(this.cancelNamedAnimationFrame("SeekBar#update"),this.cancelNamedAnimationFrame("Slider#update"),this.disableInterval_(e)):(!this.player_.ended()&&!this.player_.paused()&&this.enableInterval_(),this.update())}enableInterval_(){this.updateInterval||(this.updateInterval=this.setInterval(this.update,ii))}disableInterval_(e){this.player_.liveTracker&&this.player_.liveTracker.isLive()&&e&&e.type!=="ended"||this.updateInterval&&(this.clearInterval(this.updateInterval),this.updateInterval=null)}createEl(){return super.createEl("div",{className:"vjs-progress-holder"},{"aria-label":this.localize("Progress Bar")})}update(e){if(k().visibilityState==="hidden")return;const t=super.update();return this.requestNamedAnimationFrame("SeekBar#update",()=>{const i=this.player_.ended()?this.player_.duration():this.getCurrentTime_(),s=this.player_.liveTracker;let r=this.player_.duration();s&&s.isLive()&&(r=this.player_.liveTracker.liveCurrentTime()),this.percent_!==t&&(this.el_.setAttribute("aria-valuenow",(t*100).toFixed(2)),this.percent_=t),(this.currentTime_!==i||this.duration_!==r)&&(this.el_.setAttribute("aria-valuetext",this.localize("progress bar timing: currentTime={1} duration={2}",[un(i,r),un(r,r)],"{1} of {2}")),this.currentTime_=i,this.duration_=r),this.bar&&this.bar.update(Mn(this.el()),this.getProgress())}),t}userSeek_(e){this.player_.liveTracker&&this.player_.liveTracker.isLive()&&this.player_.liveTracker.nextSeekedFromUser(),this.player_.currentTime(e)}getCurrentTime_(){return this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime()}getPercent(){const e=this.getCurrentTime_();let t;const i=this.player_.liveTracker;return i&&i.isLive()?(t=(e-i.seekableStart())/i.liveWindow(),i.atLiveEdge()&&(t=1)):t=e/this.player_.duration(),t}handleMouseDown(e){Ss(e)&&(e.stopPropagation(),this.videoWasPlaying=!this.player_.paused(),this.player_.pause(),super.handleMouseDown(e))}handleMouseMove(e,t=!1){if(!Ss(e)||isNaN(this.player_.duration()))return;!t&&!this.player_.scrubbing()&&this.player_.scrubbing(!0);let i;const s=this.calculateDistance(e),r=this.player_.liveTracker;if(!r||!r.isLive())i=s*this.player_.duration(),i===this.player_.duration()&&(i=i-.1);else{if(s>=.99){r.seekToLiveEdge();return}const a=r.seekableStart(),l=r.liveCurrentTime();if(i=a+s*r.liveWindow(),i>=l&&(i=l),i<=a&&(i=a+.1),i===1/0)return}this.userSeek_(i),this.player_.options_.enableSmoothSeeking&&this.update()}enable(){super.enable();const e=this.getChild("mouseTimeDisplay");e&&e.show()}disable(){super.disable();const e=this.getChild("mouseTimeDisplay");e&&e.hide()}handleMouseUp(e){super.handleMouseUp(e),e&&e.stopPropagation(),this.player_.scrubbing(!1),this.player_.trigger({type:"timeupdate",target:this,manuallyTriggered:!0}),this.videoWasPlaying?Ei(this.player_.play()):this.update_()}stepForward(){this.userSeek_(this.player_.currentTime()+Pr)}stepBack(){this.userSeek_(this.player_.currentTime()-Pr)}handleAction(e){this.player_.paused()?this.player_.play():this.player_.pause()}handleKeyDown(e){const t=this.player_.liveTracker;if(e.key===" "||e.key==="Enter")e.preventDefault(),e.stopPropagation(),this.handleAction(e);else if(e.key==="Home")e.preventDefault(),e.stopPropagation(),this.userSeek_(0);else if(e.key==="End")e.preventDefault(),e.stopPropagation(),t&&t.isLive()?this.userSeek_(t.liveCurrentTime()):this.userSeek_(this.player_.duration());else if(/^[0-9]$/.test(e.key)){e.preventDefault(),e.stopPropagation();const i=parseInt(e.key,10)*.1;t&&t.isLive()?this.userSeek_(t.seekableStart()+t.liveWindow()*i):this.userSeek_(this.player_.duration()*i)}else e.key==="PageDown"?(e.preventDefault(),e.stopPropagation(),this.userSeek_(this.player_.currentTime()-Pr*Iu)):e.key==="PageUp"?(e.preventDefault(),e.stopPropagation(),this.userSeek_(this.player_.currentTime()+Pr*Iu)):super.handleKeyDown(e)}dispose(){this.disableInterval_(),this.off(this.player_,["durationchange","timeupdate"],this.update),this.off(this.player_,["ended"],this.update_),this.player_.liveTracker&&this.off(this.player_.liveTracker,"liveedgechange",this.update),this.off(this.player_,["playing"],this.enableIntervalHandler_),this.off(this.player_,["ended","pause","waiting"],this.disableIntervalHandler_),"hidden"in k()&&"visibilityState"in k()&&this.off(k(),"visibilitychange",this.toggleVisibility_),super.dispose()}}ho.prototype.options_={children:["loadProgressBar","playProgressBar"],barName:"playProgressBar"},!Lt&&!yi&&ho.prototype.options_.children.splice(1,0,"mouseTimeDisplay"),q.registerComponent("SeekBar",ho);class Pu extends q{constructor(e,t){super(e,t),this.handleMouseMove=bi(nt(this,this.handleMouseMove),ii),this.throttledHandleMouseSeek=bi(nt(this,this.handleMouseSeek),ii),this.handleMouseUpHandler_=i=>this.handleMouseUp(i),this.handleMouseDownHandler_=i=>this.handleMouseDown(i),this.enable()}createEl(){return super.createEl("div",{className:"vjs-progress-control vjs-control"})}handleMouseMove(e){const t=this.getChild("seekBar");if(!t)return;const i=t.getChild("playProgressBar"),s=t.getChild("mouseTimeDisplay");if(!i&&!s)return;const r=t.el(),a=xs(r);let l=_r(r,e).x;l=ks(l,0,1),s&&s.update(a,l),i&&i.update(a,t.getProgress())}handleMouseSeek(e){const t=this.getChild("seekBar");t&&t.handleMouseMove(e)}enabled(){return this.enabled_}disable(){if(this.children().forEach(e=>e.disable&&e.disable()),!!this.enabled()&&(this.off(["mousedown","touchstart"],this.handleMouseDownHandler_),this.off(this.el_,"mousemove",this.handleMouseMove),this.removeListenersAddedOnMousedownAndTouchstart(),this.addClass("disabled"),this.enabled_=!1,this.player_.scrubbing())){const e=this.getChild("seekBar");this.player_.scrubbing(!1),e.videoWasPlaying&&Ei(this.player_.play())}}enable(){this.children().forEach(e=>e.enable&&e.enable()),!this.enabled()&&(this.on(["mousedown","touchstart"],this.handleMouseDownHandler_),this.on(this.el_,"mousemove",this.handleMouseMove),this.removeClass("disabled"),this.enabled_=!0)}removeListenersAddedOnMousedownAndTouchstart(){const e=this.el_.ownerDocument;this.off(e,"mousemove",this.throttledHandleMouseSeek),this.off(e,"touchmove",this.throttledHandleMouseSeek),this.off(e,"mouseup",this.handleMouseUpHandler_),this.off(e,"touchend",this.handleMouseUpHandler_)}handleMouseDown(e){const t=this.el_.ownerDocument,i=this.getChild("seekBar");i&&i.handleMouseDown(e),this.on(t,"mousemove",this.throttledHandleMouseSeek),this.on(t,"touchmove",this.throttledHandleMouseSeek),this.on(t,"mouseup",this.handleMouseUpHandler_),this.on(t,"touchend",this.handleMouseUpHandler_)}handleMouseUp(e){const t=this.getChild("seekBar");t&&t.handleMouseUp(e),this.removeListenersAddedOnMousedownAndTouchstart()}}Pu.prototype.options_={children:["seekBar"]},q.registerComponent("ProgressControl",Pu);class Ou extends It{constructor(e,t){super(e,t),this.setIcon("picture-in-picture-enter"),this.on(e,["enterpictureinpicture","leavepictureinpicture"],i=>this.handlePictureInPictureChange(i)),this.on(e,["disablepictureinpicturechanged","loadedmetadata"],i=>this.handlePictureInPictureEnabledChange(i)),this.on(e,["loadedmetadata","audioonlymodechange","audiopostermodechange"],()=>this.handlePictureInPictureAudioModeChange()),this.disable()}buildCSSClass(){return`vjs-picture-in-picture-control vjs-hidden ${super.buildCSSClass()}`}handlePictureInPictureAudioModeChange(){if(!(this.player_.currentType().substring(0,5)==="audio"||this.player_.audioPosterMode()||this.player_.audioOnlyMode())){this.show();return}this.player_.isInPictureInPicture()&&this.player_.exitPictureInPicture(),this.hide()}handlePictureInPictureEnabledChange(){k().pictureInPictureEnabled&&this.player_.disablePictureInPicture()===!1||this.player_.options_.enableDocumentPictureInPicture&&"documentPictureInPicture"in A()?this.enable():this.disable()}handlePictureInPictureChange(e){this.player_.isInPictureInPicture()?(this.setIcon("picture-in-picture-exit"),this.controlText("Exit Picture-in-Picture")):(this.setIcon("picture-in-picture-enter"),this.controlText("Picture-in-Picture")),this.handlePictureInPictureEnabledChange()}handleClick(e){this.player_.isInPictureInPicture()?this.player_.exitPictureInPicture():this.player_.requestPictureInPicture()}show(){typeof k().exitPictureInPicture=="function"&&super.show()}}Ou.prototype.controlText_="Picture-in-Picture",q.registerComponent("PictureInPictureToggle",Ou);class Lu extends It{constructor(e,t){super(e,t),this.setIcon("fullscreen-enter"),this.on(e,"fullscreenchange",i=>this.handleFullscreenChange(i)),k()[e.fsApi_.fullscreenEnabled]===!1&&this.disable()}buildCSSClass(){return`vjs-fullscreen-control ${super.buildCSSClass()}`}handleFullscreenChange(e){this.player_.isFullscreen()?(this.controlText("Exit Fullscreen"),this.setIcon("fullscreen-exit")):(this.controlText("Fullscreen"),this.setIcon("fullscreen-enter"))}handleClick(e){this.player_.isFullscreen()?this.player_.exitFullscreen():this.player_.requestFullscreen()}}Lu.prototype.controlText_="Fullscreen",q.registerComponent("FullscreenToggle",Lu);const wp=function(n,e){e.tech_&&!e.tech_.featuresVolumeControl&&n.addClass("vjs-hidden"),n.on(e,"loadstart",function(){e.tech_.featuresVolumeControl?n.removeClass("vjs-hidden"):n.addClass("vjs-hidden")})};class Dp extends q{createEl(){const e=super.createEl("div",{className:"vjs-volume-level"});return this.setIcon("circle",e),e.appendChild(super.createEl("span",{className:"vjs-control-text"})),e}}q.registerComponent("VolumeLevel",Dp);class kp extends q{constructor(e,t){super(e,t),this.update=bi(nt(this,this.update),ii)}createEl(){return super.createEl("div",{className:"vjs-volume-tooltip"},{"aria-hidden":"true"})}update(e,t,i,s){if(!i){const r=Mn(this.el_),a=Mn(this.player_.el()),l=e.width*t;if(!a||!r)return;const d=e.left-a.left+l,p=e.width-l+(a.right-e.right);let g=r.width/2;d<g?g+=g-d:p<g&&(g=p),g<0?g=0:g>r.width&&(g=r.width),this.el_.style.right=`-${g}px`}this.write(`${s}%`)}write(e){Yi(this.el_,e)}updateVolume(e,t,i,s,r){this.requestNamedAnimationFrame("VolumeLevelTooltip#updateVolume",()=>{this.update(e,t,i,s.toFixed(0)),r&&r()})}}q.registerComponent("VolumeLevelTooltip",kp);class Ru extends q{constructor(e,t){super(e,t),this.update=bi(nt(this,this.update),ii)}createEl(){return super.createEl("div",{className:"vjs-mouse-display"})}update(e,t,i){const s=100*t;this.getChild("volumeLevelTooltip").updateVolume(e,t,i,s,()=>{i?this.el_.style.bottom=`${e.height*t}px`:this.el_.style.left=`${e.width*t}px`})}}Ru.prototype.options_={children:["volumeLevelTooltip"]},q.registerComponent("MouseVolumeLevelDisplay",Ru);class Or extends lo{constructor(e,t){super(e,t),this.on("slideractive",i=>this.updateLastVolume_(i)),this.on(e,"volumechange",i=>this.updateARIAAttributes(i)),e.ready(()=>this.updateARIAAttributes())}createEl(){return super.createEl("div",{className:"vjs-volume-bar vjs-slider-bar"},{"aria-label":this.localize("Volume Level"),"aria-live":"polite"})}handleMouseDown(e){Ss(e)&&super.handleMouseDown(e)}handleMouseMove(e){const t=this.getChild("mouseVolumeLevelDisplay");if(t){const i=this.el(),s=Mn(i),r=this.vertical();let a=_r(i,e);a=r?a.y:a.x,a=ks(a,0,1),t.update(s,a,r)}Ss(e)&&(this.checkMuted(),this.player_.volume(this.calculateDistance(e)))}checkMuted(){this.player_.muted()&&this.player_.muted(!1)}getPercent(){return this.player_.muted()?0:this.player_.volume()}stepForward(){this.checkMuted(),this.player_.volume(this.player_.volume()+.1)}stepBack(){this.checkMuted(),this.player_.volume(this.player_.volume()-.1)}updateARIAAttributes(e){const t=this.player_.muted()?0:this.volumeAsPercentage_();this.el_.setAttribute("aria-valuenow",t),this.el_.setAttribute("aria-valuetext",t+"%")}volumeAsPercentage_(){return Math.round(this.player_.volume()*100)}updateLastVolume_(){const e=this.player_.volume();this.one("sliderinactive",()=>{this.player_.volume()===0&&this.player_.lastVolume_(e)})}}Or.prototype.options_={children:["volumeLevel"],barName:"volumeLevel"},!Lt&&!yi&&Or.prototype.options_.children.splice(0,0,"mouseVolumeLevelDisplay"),Or.prototype.playerEvent="volumechange",q.registerComponent("VolumeBar",Or);class Nu extends q{constructor(e,t={}){t.vertical=t.vertical||!1,(typeof t.volumeBar=="undefined"||In(t.volumeBar))&&(t.volumeBar=t.volumeBar||{},t.volumeBar.vertical=t.vertical),super(e,t),wp(this,e),this.throttledHandleMouseMove=bi(nt(this,this.handleMouseMove),ii),this.handleMouseUpHandler_=i=>this.handleMouseUp(i),this.on("mousedown",i=>this.handleMouseDown(i)),this.on("touchstart",i=>this.handleMouseDown(i)),this.on("mousemove",i=>this.handleMouseMove(i)),this.on(this.volumeBar,["focus","slideractive"],()=>{this.volumeBar.addClass("vjs-slider-active"),this.addClass("vjs-slider-active"),this.trigger("slideractive")}),this.on(this.volumeBar,["blur","sliderinactive"],()=>{this.volumeBar.removeClass("vjs-slider-active"),this.removeClass("vjs-slider-active"),this.trigger("sliderinactive")})}createEl(){let e="vjs-volume-horizontal";return this.options_.vertical&&(e="vjs-volume-vertical"),super.createEl("div",{className:`vjs-volume-control vjs-control ${e}`})}handleMouseDown(e){const t=this.el_.ownerDocument;this.on(t,"mousemove",this.throttledHandleMouseMove),this.on(t,"touchmove",this.throttledHandleMouseMove),this.on(t,"mouseup",this.handleMouseUpHandler_),this.on(t,"touchend",this.handleMouseUpHandler_)}handleMouseUp(e){const t=this.el_.ownerDocument;this.off(t,"mousemove",this.throttledHandleMouseMove),this.off(t,"touchmove",this.throttledHandleMouseMove),this.off(t,"mouseup",this.handleMouseUpHandler_),this.off(t,"touchend",this.handleMouseUpHandler_)}handleMouseMove(e){this.volumeBar.handleMouseMove(e)}}Nu.prototype.options_={children:["volumeBar"]},q.registerComponent("VolumeControl",Nu);const Ip=function(n,e){e.tech_&&!e.tech_.featuresMuteControl&&n.addClass("vjs-hidden"),n.on(e,"loadstart",function(){e.tech_.featuresMuteControl?n.removeClass("vjs-hidden"):n.addClass("vjs-hidden")})};class Mu extends It{constructor(e,t){super(e,t),Ip(this,e),this.on(e,["loadstart","volumechange"],i=>this.update(i))}buildCSSClass(){return`vjs-mute-control ${super.buildCSSClass()}`}handleClick(e){const t=this.player_.volume(),i=this.player_.lastVolume_();if(t===0){const s=i<.1?.1:i;this.player_.volume(s),this.player_.muted(!1)}else this.player_.muted(!this.player_.muted())}update(e){this.updateIcon_(),this.updateControlText_()}updateIcon_(){const e=this.player_.volume();let t=3;this.setIcon("volume-high"),Lt&&this.player_.tech_&&this.player_.tech_.el_&&this.player_.muted(this.player_.tech_.el_.muted),e===0||this.player_.muted()?(this.setIcon("volume-mute"),t=0):e<.33?(this.setIcon("volume-low"),t=1):e<.67&&(this.setIcon("volume-medium"),t=2),Ar(this.el_,[0,1,2,3].reduce((i,s)=>i+`${s?" ":""}vjs-vol-${s}`,"")),on(this.el_,`vjs-vol-${t}`)}updateControlText_(){const t=this.player_.muted()||this.player_.volume()===0?"Unmute":"Mute";this.controlText()!==t&&this.controlText(t)}}Mu.prototype.controlText_="Mute",q.registerComponent("MuteToggle",Mu);class Fu extends q{constructor(e,t={}){typeof t.inline!="undefined"?t.inline=t.inline:t.inline=!0,(typeof t.volumeControl=="undefined"||In(t.volumeControl))&&(t.volumeControl=t.volumeControl||{},t.volumeControl.vertical=!t.inline),super(e,t),this.handleKeyPressHandler_=i=>this.handleKeyPress(i),this.on(e,["loadstart"],i=>this.volumePanelState_(i)),this.on(this.muteToggle,"keyup",i=>this.handleKeyPress(i)),this.on(this.volumeControl,"keyup",i=>this.handleVolumeControlKeyUp(i)),this.on("keydown",i=>this.handleKeyPress(i)),this.on("mouseover",i=>this.handleMouseOver(i)),this.on("mouseout",i=>this.handleMouseOut(i)),this.on(this.volumeControl,["slideractive"],this.sliderActive_),this.on(this.volumeControl,["sliderinactive"],this.sliderInactive_)}sliderActive_(){this.addClass("vjs-slider-active")}sliderInactive_(){this.removeClass("vjs-slider-active")}volumePanelState_(){this.volumeControl.hasClass("vjs-hidden")&&this.muteToggle.hasClass("vjs-hidden")&&this.addClass("vjs-hidden"),this.volumeControl.hasClass("vjs-hidden")&&!this.muteToggle.hasClass("vjs-hidden")&&this.addClass("vjs-mute-toggle-only")}createEl(){let e="vjs-volume-panel-horizontal";return this.options_.inline||(e="vjs-volume-panel-vertical"),super.createEl("div",{className:`vjs-volume-panel vjs-control ${e}`})}dispose(){this.handleMouseOut(),super.dispose()}handleVolumeControlKeyUp(e){e.key==="Escape"&&this.muteToggle.focus()}handleMouseOver(e){this.addClass("vjs-hover"),Yt(k(),"keyup",this.handleKeyPressHandler_)}handleMouseOut(e){this.removeClass("vjs-hover"),kt(k(),"keyup",this.handleKeyPressHandler_)}handleKeyPress(e){e.key==="Escape"&&this.handleMouseOut()}}Fu.prototype.options_={children:["muteToggle","volumeControl"]},q.registerComponent("VolumePanel",Fu);class Uu extends It{constructor(e,t){super(e,t),this.validOptions=[5,10,30],this.skipTime=this.getSkipForwardTime(),this.skipTime&&this.validOptions.includes(this.skipTime)?(this.setIcon(`forward-${this.skipTime}`),this.controlText(this.localize("Skip forward {1} seconds",[this.skipTime.toLocaleString(e.language())])),this.show()):this.hide()}getSkipForwardTime(){const e=this.options_.playerOptions;return e.controlBar&&e.controlBar.skipButtons&&e.controlBar.skipButtons.forward}buildCSSClass(){return`vjs-skip-forward-${this.getSkipForwardTime()} ${super.buildCSSClass()}`}handleClick(e){if(isNaN(this.player_.duration()))return;const t=this.player_.currentTime(),i=this.player_.liveTracker,s=i&&i.isLive()?i.seekableEnd():this.player_.duration();let r;t+this.skipTime<=s?r=t+this.skipTime:r=s,this.player_.currentTime(r)}handleLanguagechange(){this.controlText(this.localize("Skip forward {1} seconds",[this.skipTime]))}}Uu.prototype.controlText_="Skip Forward",q.registerComponent("SkipForward",Uu);class Vu extends It{constructor(e,t){super(e,t),this.validOptions=[5,10,30],this.skipTime=this.getSkipBackwardTime(),this.skipTime&&this.validOptions.includes(this.skipTime)?(this.setIcon(`replay-${this.skipTime}`),this.controlText(this.localize("Skip backward {1} seconds",[this.skipTime.toLocaleString(e.language())])),this.show()):this.hide()}getSkipBackwardTime(){const e=this.options_.playerOptions;return e.controlBar&&e.controlBar.skipButtons&&e.controlBar.skipButtons.backward}buildCSSClass(){return`vjs-skip-backward-${this.getSkipBackwardTime()} ${super.buildCSSClass()}`}handleClick(e){const t=this.player_.currentTime(),i=this.player_.liveTracker,s=i&&i.isLive()&&i.seekableStart();let r;s&&t-this.skipTime<=s?r=s:t>=this.skipTime?r=t-this.skipTime:r=0,this.player_.currentTime(r)}handleLanguagechange(){this.controlText(this.localize("Skip backward {1} seconds",[this.skipTime]))}}Vu.prototype.controlText_="Skip Backward",q.registerComponent("SkipBackward",Vu);class zu extends q{constructor(e,t){super(e,t),t&&(this.menuButton_=t.menuButton),this.focusedChild_=-1,this.on("keydown",i=>this.handleKeyDown(i)),this.boundHandleBlur_=i=>this.handleBlur(i),this.boundHandleTapClick_=i=>this.handleTapClick(i)}addEventListenerForItem(e){e instanceof q&&(this.on(e,"blur",this.boundHandleBlur_),this.on(e,["tap","click"],this.boundHandleTapClick_))}removeEventListenerForItem(e){e instanceof q&&(this.off(e,"blur",this.boundHandleBlur_),this.off(e,["tap","click"],this.boundHandleTapClick_))}removeChild(e){typeof e=="string"&&(e=this.getChild(e)),this.removeEventListenerForItem(e),super.removeChild(e)}addItem(e){const t=this.addChild(e);t&&this.addEventListenerForItem(t)}createEl(){const e=this.options_.contentElType||"ul";this.contentEl_=Oe(e,{className:"vjs-menu-content"}),this.contentEl_.setAttribute("role","menu");const t=super.createEl("div",{append:this.contentEl_,className:"vjs-menu"});return t.appendChild(this.contentEl_),Yt(t,"click",function(i){i.preventDefault(),i.stopImmediatePropagation()}),t}dispose(){this.contentEl_=null,this.boundHandleBlur_=null,this.boundHandleTapClick_=null,super.dispose()}handleBlur(e){const t=e.relatedTarget||k().activeElement;if(!this.children().some(i=>i.el()===t)){const i=this.menuButton_;i&&i.buttonPressed_&&t!==i.el().firstChild&&i.unpressButton()}}handleTapClick(e){if(this.menuButton_){this.menuButton_.unpressButton();const t=this.children();if(!Array.isArray(t))return;const i=t.filter(s=>s.el()===e.target)[0];if(!i)return;i.name()!=="CaptionSettingsMenuItem"&&this.menuButton_.focus()}}handleKeyDown(e){e.key==="ArrowLeft"||e.key==="ArrowDown"?(e.preventDefault(),e.stopPropagation(),this.stepForward()):(e.key==="ArrowRight"||e.key==="ArrowUp")&&(e.preventDefault(),e.stopPropagation(),this.stepBack())}stepForward(){let e=0;this.focusedChild_!==void 0&&(e=this.focusedChild_+1),this.focus(e)}stepBack(){let e=0;this.focusedChild_!==void 0&&(e=this.focusedChild_-1),this.focus(e)}focus(e=0){const t=this.children().slice();t.length&&t[0].hasClass("vjs-menu-title")&&t.shift(),t.length>0&&(e<0?e=0:e>=t.length&&(e=t.length-1),this.focusedChild_=e,t[e].el_.focus())}}q.registerComponent("Menu",zu);class fo extends q{constructor(e,t={}){super(e,t),this.menuButton_=new It(e,t),this.menuButton_.controlText(this.controlText_),this.menuButton_.el_.setAttribute("aria-haspopup","true");const i=It.prototype.buildCSSClass();this.menuButton_.el_.className=this.buildCSSClass()+" "+i,this.menuButton_.removeClass("vjs-control"),this.addChild(this.menuButton_),this.update(),this.enabled_=!0;const s=r=>this.handleClick(r);this.handleMenuKeyUp_=r=>this.handleMenuKeyUp(r),this.on(this.menuButton_,"tap",s),this.on(this.menuButton_,"click",s),this.on(this.menuButton_,"keydown",r=>this.handleKeyDown(r)),this.on(this.menuButton_,"mouseenter",()=>{this.addClass("vjs-hover"),this.menu.show(),Yt(k(),"keyup",this.handleMenuKeyUp_)}),this.on("mouseleave",r=>this.handleMouseLeave(r)),this.on("keydown",r=>this.handleSubmenuKeyDown(r))}update(){const e=this.createMenu();this.menu&&(this.menu.dispose(),this.removeChild(this.menu)),this.menu=e,this.addChild(e),this.buttonPressed_=!1,this.menuButton_.el_.setAttribute("aria-expanded","false"),this.items&&this.items.length<=this.hideThreshold_?(this.hide(),this.menu.contentEl_.removeAttribute("role")):(this.show(),this.menu.contentEl_.setAttribute("role","menu"))}createMenu(){const e=new zu(this.player_,{menuButton:this});if(this.hideThreshold_=0,this.options_.title){const t=Oe("li",{className:"vjs-menu-title",textContent:gt(this.options_.title),tabIndex:-1}),i=new q(this.player_,{el:t});e.addItem(i)}if(this.items=this.createItems(),this.items)for(let t=0;t<this.items.length;t++)e.addItem(this.items[t]);return e}createItems(){}createEl(){return super.createEl("div",{className:this.buildWrapperCSSClass()},{})}setIcon(e){super.setIcon(e,this.menuButton_.el_)}buildWrapperCSSClass(){let e="vjs-menu-button";this.options_.inline===!0?e+="-inline":e+="-popup";const t=It.prototype.buildCSSClass();return`vjs-menu-button ${e} ${t} ${super.buildCSSClass()}`}buildCSSClass(){let e="vjs-menu-button";return this.options_.inline===!0?e+="-inline":e+="-popup",`vjs-menu-button ${e} ${super.buildCSSClass()}`}controlText(e,t=this.menuButton_.el()){return this.menuButton_.controlText(e,t)}dispose(){this.handleMouseLeave(),super.dispose()}handleClick(e){this.buttonPressed_?this.unpressButton():this.pressButton()}handleMouseLeave(e){this.removeClass("vjs-hover"),kt(k(),"keyup",this.handleMenuKeyUp_)}focus(){this.menuButton_.focus()}blur(){this.menuButton_.blur()}handleKeyDown(e){e.key==="Esc"||e.key==="Tab"?(this.buttonPressed_&&this.unpressButton(),!e.key==="Tab"&&(e.preventDefault(),this.menuButton_.focus())):(e.key==="Up"||e.key==="Down"&&!(this.player_.options_.playerOptions.spatialNavigation&&this.player_.options_.playerOptions.spatialNavigation.enabled))&&(this.buttonPressed_||(e.preventDefault(),this.pressButton()))}handleMenuKeyUp(e){(e.key==="Esc"||e.key==="Tab")&&this.removeClass("vjs-hover")}handleSubmenuKeyPress(e){this.handleSubmenuKeyDown(e)}handleSubmenuKeyDown(e){(e.key==="Esc"||e.key==="Tab")&&(this.buttonPressed_&&this.unpressButton(),!e.key==="Tab"&&(e.preventDefault(),this.menuButton_.focus()))}pressButton(){if(this.enabled_){if(this.buttonPressed_=!0,this.menu.show(),this.menu.lockShowing(),this.menuButton_.el_.setAttribute("aria-expanded","true"),Lt&&Fl())return;this.menu.focus()}}unpressButton(){this.enabled_&&(this.buttonPressed_=!1,this.menu.unlockShowing(),this.menu.hide(),this.menuButton_.el_.setAttribute("aria-expanded","false"))}disable(){this.unpressButton(),this.enabled_=!1,this.addClass("vjs-disabled"),this.menuButton_.disable()}enable(){this.enabled_=!0,this.removeClass("vjs-disabled"),this.menuButton_.enable()}}q.registerComponent("MenuButton",fo);class po extends fo{constructor(e,t){const i=t.tracks;if(super(e,t),this.items.length<=1&&this.hide(),!i)return;const s=nt(this,this.update);i.addEventListener("removetrack",s),i.addEventListener("addtrack",s),i.addEventListener("labelchange",s),this.player_.on("ready",s),this.player_.on("dispose",function(){i.removeEventListener("removetrack",s),i.removeEventListener("addtrack",s),i.removeEventListener("labelchange",s)})}}q.registerComponent("TrackButton",po);class Is extends Ir{constructor(e,t){super(e,t),this.selectable=t.selectable,this.isSelected_=t.selected||!1,this.multiSelectable=t.multiSelectable,this.selected(this.isSelected_),this.selectable?this.multiSelectable?this.el_.setAttribute("role","menuitemcheckbox"):this.el_.setAttribute("role","menuitemradio"):this.el_.setAttribute("role","menuitem")}createEl(e,t,i){this.nonIconControl=!0;const s=super.createEl("li",Object.assign({className:"vjs-menu-item",tabIndex:-1},t),i),r=Oe("span",{className:"vjs-menu-item-text",textContent:this.localize(this.options_.label)});return this.player_.options_.experimentalSvgIcons?s.appendChild(r):s.replaceChild(r,s.querySelector(".vjs-icon-placeholder")),s}handleKeyDown(e){["Tab","Escape","ArrowUp","ArrowLeft","ArrowRight","ArrowDown"].includes(e.key)||super.handleKeyDown(e)}handleClick(e){this.selected(!0)}selected(e){this.selectable&&(e?(this.addClass("vjs-selected"),this.el_.setAttribute("aria-checked","true"),this.controlText(", selected"),this.isSelected_=!0):(this.removeClass("vjs-selected"),this.el_.setAttribute("aria-checked","false"),this.controlText(""),this.isSelected_=!1))}}q.registerComponent("MenuItem",Is);class Ps extends Is{constructor(e,t){const i=t.track,s=e.textTracks();t.label=i.label||i.language||"Unknown",t.selected=i.mode==="showing",super(e,t),this.track=i,this.kinds=(t.kinds||[t.kind||this.track.kind]).filter(Boolean);const r=(...l)=>{this.handleTracksChange.apply(this,l)},a=(...l)=>{this.handleSelectedLanguageChange.apply(this,l)};if(e.on(["loadstart","texttrackchange"],r),s.addEventListener("change",r),s.addEventListener("selectedlanguagechange",a),this.on("dispose",function(){e.off(["loadstart","texttrackchange"],r),s.removeEventListener("change",r),s.removeEventListener("selectedlanguagechange",a)}),s.onchange===void 0){let l;this.on(["tap","click"],function(){if(typeof A().Event!="object")try{l=new(A()).Event("change")}catch(d){}l||(l=k().createEvent("Event"),l.initEvent("change",!0,!0)),s.dispatchEvent(l)})}this.handleTracksChange()}handleClick(e){const t=this.track,i=this.player_.textTracks();if(super.handleClick(e),!!i)for(let s=0;s<i.length;s++){const r=i[s];this.kinds.indexOf(r.kind)!==-1&&(r===t?r.mode!=="showing"&&(r.mode="showing"):r.mode!=="disabled"&&(r.mode="disabled"))}}handleTracksChange(e){const t=this.track.mode==="showing";t!==this.isSelected_&&this.selected(t)}handleSelectedLanguageChange(e){if(this.track.mode==="showing"){const t=this.player_.cache_.selectedLanguage;if(t&&t.enabled&&t.language===this.track.language&&t.kind!==this.track.kind)return;this.player_.cache_.selectedLanguage={enabled:!0,language:this.track.language,kind:this.track.kind}}}dispose(){this.track=null,super.dispose()}}q.registerComponent("TextTrackMenuItem",Ps);class Hu extends Ps{constructor(e,t){t.track={player:e,kind:t.kind,kinds:t.kinds,default:!1,mode:"disabled"},t.kinds||(t.kinds=[t.kind]),t.label?t.track.label=t.label:t.track.label=t.kinds.join(" and ")+" off",t.selectable=!0,t.multiSelectable=!1,super(e,t)}handleTracksChange(e){const t=this.player().textTracks();let i=!0;for(let s=0,r=t.length;s<r;s++){const a=t[s];if(this.options_.kinds.indexOf(a.kind)>-1&&a.mode==="showing"){i=!1;break}}i!==this.isSelected_&&this.selected(i)}handleSelectedLanguageChange(e){const t=this.player().textTracks();let i=!0;for(let s=0,r=t.length;s<r;s++){const a=t[s];if(["captions","descriptions","subtitles"].indexOf(a.kind)>-1&&a.mode==="showing"){i=!1;break}}i&&(this.player_.cache_.selectedLanguage={enabled:!1})}handleLanguagechange(){this.$(".vjs-menu-item-text").textContent=this.player_.localize(this.options_.label),super.handleLanguagechange()}}q.registerComponent("OffTextTrackMenuItem",Hu);class $n extends po{constructor(e,t={}){t.tracks=e.textTracks(),super(e,t)}createItems(e=[],t=Ps){let i;this.label_&&(i=`${this.label_} off`),e.push(new Hu(this.player_,{kinds:this.kinds_,kind:this.kind_,label:i})),this.hideThreshold_+=1;const s=this.player_.textTracks();Array.isArray(this.kinds_)||(this.kinds_=[this.kind_]);for(let r=0;r<s.length;r++){const a=s[r];if(this.kinds_.indexOf(a.kind)>-1){const l=new t(this.player_,{track:a,kinds:this.kinds_,kind:this.kind_,selectable:!0,multiSelectable:!1});l.addClass(`vjs-${a.kind}-menu-item`),e.push(l)}}return e}}q.registerComponent("TextTrackButton",$n);class qu extends Is{constructor(e,t){const i=t.track,s=t.cue,r=e.currentTime();t.selectable=!0,t.multiSelectable=!1,t.label=s.text,t.selected=s.startTime<=r&&r<s.endTime,super(e,t),this.track=i,this.cue=s}handleClick(e){super.handleClick(),this.player_.currentTime(this.cue.startTime)}}q.registerComponent("ChaptersTrackMenuItem",qu);class mo extends $n{constructor(e,t,i){super(e,t,i),this.setIcon("chapters"),this.selectCurrentItem_=()=>{this.items.forEach(s=>{s.selected(this.track_.activeCues[0]===s.cue)})}}buildCSSClass(){return`vjs-chapters-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-chapters-button ${super.buildWrapperCSSClass()}`}update(e){if(e&&e.track&&e.track.kind!=="chapters")return;const t=this.findChaptersTrack();t!==this.track_?(this.setTrack(t),super.update()):(!this.items||t&&t.cues&&t.cues.length!==this.items.length)&&super.update()}setTrack(e){if(this.track_!==e){if(this.updateHandler_||(this.updateHandler_=this.update.bind(this)),this.track_){const t=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);t&&t.removeEventListener("load",this.updateHandler_),this.track_.removeEventListener("cuechange",this.selectCurrentItem_),this.track_=null}if(this.track_=e,this.track_){this.track_.mode="hidden";const t=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);t&&t.addEventListener("load",this.updateHandler_),this.track_.addEventListener("cuechange",this.selectCurrentItem_)}}}findChaptersTrack(){const e=this.player_.textTracks()||[];for(let t=e.length-1;t>=0;t--){const i=e[t];if(i.kind===this.kind_)return i}}getMenuCaption(){return this.track_&&this.track_.label?this.track_.label:this.localize(gt(this.kind_))}createMenu(){return this.options_.title=this.getMenuCaption(),super.createMenu()}createItems(){const e=[];if(!this.track_)return e;const t=this.track_.cues;if(!t)return e;for(let i=0,s=t.length;i<s;i++){const r=t[i],a=new qu(this.player_,{track:this.track_,cue:r});e.push(a)}return e}}mo.prototype.kind_="chapters",mo.prototype.controlText_="Chapters",q.registerComponent("ChaptersButton",mo);class go extends $n{constructor(e,t,i){super(e,t,i),this.setIcon("audio-description");const s=e.textTracks(),r=nt(this,this.handleTracksChange);s.addEventListener("change",r),this.on("dispose",function(){s.removeEventListener("change",r)})}handleTracksChange(e){const t=this.player().textTracks();let i=!1;for(let s=0,r=t.length;s<r;s++){const a=t[s];if(a.kind!==this.kind_&&a.mode==="showing"){i=!0;break}}i?this.disable():this.enable()}buildCSSClass(){return`vjs-descriptions-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-descriptions-button ${super.buildWrapperCSSClass()}`}}go.prototype.kind_="descriptions",go.prototype.controlText_="Descriptions",q.registerComponent("DescriptionsButton",go);class vo extends $n{constructor(e,t,i){super(e,t,i),this.setIcon("subtitles")}buildCSSClass(){return`vjs-subtitles-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-subtitles-button ${super.buildWrapperCSSClass()}`}}vo.prototype.kind_="subtitles",vo.prototype.controlText_="Subtitles",q.registerComponent("SubtitlesButton",vo);class Ao extends Ps{constructor(e,t){t.track={player:e,kind:t.kind,label:t.kind+" settings",selectable:!1,default:!1,mode:"disabled"},t.selectable=!1,t.name="CaptionSettingsMenuItem",super(e,t),this.addClass("vjs-texttrack-settings"),this.controlText(", opens "+t.kind+" settings dialog")}handleClick(e){this.player().getChild("textTrackSettings").open()}handleLanguagechange(){this.$(".vjs-menu-item-text").textContent=this.player_.localize(this.options_.kind+" settings"),super.handleLanguagechange()}}q.registerComponent("CaptionSettingsMenuItem",Ao);class yo extends $n{constructor(e,t,i){super(e,t,i),this.setIcon("captions")}buildCSSClass(){return`vjs-captions-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-captions-button ${super.buildWrapperCSSClass()}`}createItems(){const e=[];return!(this.player().tech_&&this.player().tech_.featuresNativeTextTracks)&&this.player().getChild("textTrackSettings")&&(e.push(new Ao(this.player_,{kind:this.kind_})),this.hideThreshold_+=1),super.createItems(e)}}yo.prototype.kind_="captions",yo.prototype.controlText_="Captions",q.registerComponent("CaptionsButton",yo);class Wu extends Ps{createEl(e,t,i){const s=super.createEl(e,t,i),r=s.querySelector(".vjs-menu-item-text");return this.options_.track.kind==="captions"&&(this.player_.options_.experimentalSvgIcons?this.setIcon("captions",s):r.appendChild(Oe("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),r.appendChild(Oe("span",{className:"vjs-control-text",textContent:` ${this.localize("Captions")}`}))),s}}q.registerComponent("SubsCapsMenuItem",Wu);class _o extends $n{constructor(e,t={}){super(e,t),this.label_="subtitles",this.setIcon("subtitles"),["en","en-us","en-ca","fr-ca"].indexOf(this.player_.language_)>-1&&(this.label_="captions",this.setIcon("captions")),this.menuButton_.controlText(gt(this.label_))}buildCSSClass(){return`vjs-subs-caps-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-subs-caps-button ${super.buildWrapperCSSClass()}`}createItems(){let e=[];return!(this.player().tech_&&this.player().tech_.featuresNativeTextTracks)&&this.player().getChild("textTrackSettings")&&(e.push(new Ao(this.player_,{kind:this.label_})),this.hideThreshold_+=1),e=super.createItems(e,Wu),e}}_o.prototype.kinds_=["captions","subtitles"],_o.prototype.controlText_="Subtitles",q.registerComponent("SubsCapsButton",_o);class $u extends Is{constructor(e,t){const i=t.track,s=e.audioTracks();t.label=i.label||i.language||"Unknown",t.selected=i.enabled,super(e,t),this.track=i,this.addClass(`vjs-${i.kind}-menu-item`);const r=(...a)=>{this.handleTracksChange.apply(this,a)};s.addEventListener("change",r),this.on("dispose",()=>{s.removeEventListener("change",r)})}createEl(e,t,i){const s=super.createEl(e,t,i),r=s.querySelector(".vjs-menu-item-text");return["main-desc","descriptions"].indexOf(this.options_.track.kind)>=0&&(r.appendChild(Oe("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),r.appendChild(Oe("span",{className:"vjs-control-text",textContent:" "+this.localize("Descriptions")}))),s}handleClick(e){if(super.handleClick(e),this.track.enabled=!0,this.player_.tech_.featuresNativeAudioTracks){const t=this.player_.audioTracks();for(let i=0;i<t.length;i++){const s=t[i];s!==this.track&&(s.enabled=s===this.track)}}}handleTracksChange(e){this.selected(this.track.enabled)}}q.registerComponent("AudioTrackMenuItem",$u);class Gu extends po{constructor(e,t={}){t.tracks=e.audioTracks(),super(e,t),this.setIcon("audio")}buildCSSClass(){return`vjs-audio-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-audio-button ${super.buildWrapperCSSClass()}`}createItems(e=[]){this.hideThreshold_=1;const t=this.player_.audioTracks();for(let i=0;i<t.length;i++){const s=t[i];e.push(new $u(this.player_,{track:s,selectable:!0,multiSelectable:!1}))}return e}}Gu.prototype.controlText_="Audio Track",q.registerComponent("AudioTrackButton",Gu);class bo extends Is{constructor(e,t){const i=t.rate,s=parseFloat(i,10);t.label=i,t.selected=s===e.playbackRate(),t.selectable=!0,t.multiSelectable=!1,super(e,t),this.label=i,this.rate=s,this.on(e,"ratechange",r=>this.update(r))}handleClick(e){super.handleClick(),this.player().playbackRate(this.rate)}update(e){this.selected(this.player().playbackRate()===this.rate)}}bo.prototype.contentElType="button",q.registerComponent("PlaybackRateMenuItem",bo);class Yu extends fo{constructor(e,t){super(e,t),this.menuButton_.el_.setAttribute("aria-describedby",this.labelElId_),this.updateVisibility(),this.updateLabel(),this.on(e,"loadstart",i=>this.updateVisibility(i)),this.on(e,"ratechange",i=>this.updateLabel(i)),this.on(e,"playbackrateschange",i=>this.handlePlaybackRateschange(i))}createEl(){const e=super.createEl();return this.labelElId_="vjs-playback-rate-value-label-"+this.id_,this.labelEl_=Oe("div",{className:"vjs-playback-rate-value",id:this.labelElId_,textContent:"1x"}),e.appendChild(this.labelEl_),e}dispose(){this.labelEl_=null,super.dispose()}buildCSSClass(){return`vjs-playback-rate ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-playback-rate ${super.buildWrapperCSSClass()}`}createItems(){const e=this.playbackRates(),t=[];for(let i=e.length-1;i>=0;i--)t.push(new bo(this.player(),{rate:e[i]+"x"}));return t}handlePlaybackRateschange(e){this.update()}playbackRates(){const e=this.player();return e.playbackRates&&e.playbackRates()||[]}playbackRateSupported(){return this.player().tech_&&this.player().tech_.featuresPlaybackRate&&this.playbackRates()&&this.playbackRates().length>0}updateVisibility(e){this.playbackRateSupported()?this.removeClass("vjs-hidden"):this.addClass("vjs-hidden")}updateLabel(e){this.playbackRateSupported()&&(this.labelEl_.textContent=this.player().playbackRate()+"x")}}Yu.prototype.controlText_="Playback Rate",q.registerComponent("PlaybackRateMenuButton",Yu);class Xu extends q{buildCSSClass(){return`vjs-spacer ${super.buildCSSClass()}`}createEl(e="div",t={},i={}){return t.className||(t.className=this.buildCSSClass()),super.createEl(e,t,i)}}q.registerComponent("Spacer",Xu);class Pp extends Xu{buildCSSClass(){return`vjs-custom-control-spacer ${super.buildCSSClass()}`}createEl(){return super.createEl("div",{className:this.buildCSSClass(),textContent:"\xA0"})}}q.registerComponent("CustomControlSpacer",Pp);class Ku extends q{createEl(){return super.createEl("div",{className:"vjs-control-bar",dir:"ltr"})}}Ku.prototype.options_={children:["playToggle","skipBackward","skipForward","volumePanel","currentTimeDisplay","timeDivider","durationDisplay","progressControl","liveDisplay","seekToLive","remainingTimeDisplay","customControlSpacer","playbackRateMenuButton","chaptersButton","descriptionsButton","subsCapsButton","audioTrackButton","pictureInPictureToggle","fullscreenToggle"]},q.registerComponent("ControlBar",Ku);class Qu extends Vn{constructor(e,t){super(e,t),this.on(e,"error",i=>{this.open(i)})}buildCSSClass(){return`vjs-error-display ${super.buildCSSClass()}`}content(){const e=this.player().error();return e?this.localize(e.message):""}}Qu.prototype.options_=Object.assign({},Vn.prototype.options_,{pauseOnOpen:!1,fillAlways:!0,temporary:!1,uncloseable:!0}),q.registerComponent("ErrorDisplay",Qu);class Ju extends q{constructor(e,t={}){super(e,t),this.el_.setAttribute("aria-labelledby",this.selectLabelledbyIds)}createEl(){return this.selectLabelledbyIds=[this.options_.legendId,this.options_.labelId].join(" ").trim(),Oe("select",{id:this.options_.id},{},this.options_.SelectOptions.map(t=>{const i=(this.options_.labelId?this.options_.labelId:`vjs-track-option-${ti()}`)+"-"+t[1].replace(/\W+/g,""),s=Oe("option",{id:i,value:this.localize(t[0]),textContent:t[1]});return s.setAttribute("aria-labelledby",`${this.selectLabelledbyIds} ${i}`),s}))}}q.registerComponent("TextTrackSelect",Ju);class hn extends q{constructor(e,t={}){super(e,t);const i=Oe("legend",{textContent:this.localize(this.options_.legendText),id:this.options_.legendId});this.el().appendChild(i);const s=this.options_.selects;for(const r of s){const a=this.options_.selectConfigs[r],l=a.className,d=a.id.replace("%s",this.options_.id_);let p=null;const g=`vjs_select_${ti()}`;if(this.options_.type==="colors"){p=Oe("span",{className:l});const B=Oe("label",{id:d,className:"vjs-label",textContent:a.label});B.setAttribute("for",g),p.appendChild(B)}const y=new Ju(e,{SelectOptions:a.options,legendId:this.options_.legendId,id:g,labelId:d});this.addChild(y),this.options_.type==="colors"&&(p.appendChild(y.el()),this.el().appendChild(p))}}createEl(){return Oe("fieldset",{className:this.options_.className})}}q.registerComponent("TextTrackFieldset",hn);class Zu extends q{constructor(e,t={}){super(e,t);const i=this.options_.textTrackComponentid,s=new hn(e,{id_:i,legendId:`captions-text-legend-${i}`,legendText:this.localize("Text"),className:"vjs-fg vjs-track-setting",selects:this.options_.fieldSets[0],selectConfigs:this.options_.selectConfigs,type:"colors"});this.addChild(s);const r=new hn(e,{id_:i,legendId:`captions-background-${i}`,legendText:this.localize("Text Background"),className:"vjs-bg vjs-track-setting",selects:this.options_.fieldSets[1],selectConfigs:this.options_.selectConfigs,type:"colors"});this.addChild(r);const a=new hn(e,{id_:i,legendId:`captions-window-${i}`,legendText:this.localize("Caption Area Background"),className:"vjs-window vjs-track-setting",selects:this.options_.fieldSets[2],selectConfigs:this.options_.selectConfigs,type:"colors"});this.addChild(a)}createEl(){return Oe("div",{className:"vjs-track-settings-colors"})}}q.registerComponent("TextTrackSettingsColors",Zu);class ec extends q{constructor(e,t={}){super(e,t);const i=this.options_.textTrackComponentid,s=new hn(e,{id_:i,legendId:`captions-font-size-${i}`,legendText:"Font Size",className:"vjs-font-percent vjs-track-setting",selects:this.options_.fieldSets[0],selectConfigs:this.options_.selectConfigs,type:"font"});this.addChild(s);const r=new hn(e,{id_:i,legendId:`captions-edge-style-${i}`,legendText:this.localize("Text Edge Style"),className:"vjs-edge-style vjs-track-setting",selects:this.options_.fieldSets[1],selectConfigs:this.options_.selectConfigs,type:"font"});this.addChild(r);const a=new hn(e,{id_:i,legendId:`captions-font-family-${i}`,legendText:this.localize("Font Family"),className:"vjs-font-family vjs-track-setting",selects:this.options_.fieldSets[2],selectConfigs:this.options_.selectConfigs,type:"font"});this.addChild(a)}createEl(){return Oe("div",{className:"vjs-track-settings-font"})}}q.registerComponent("TextTrackSettingsFont",ec);class tc extends q{constructor(e,t={}){super(e,t);const i=this.localize("restore all settings to the default values"),s=new It(e,{controlText:i,className:"vjs-default-button"});s.el().classList.remove("vjs-control","vjs-button"),s.el().textContent=this.localize("Reset"),this.addChild(s);const r=new It(e,{controlText:i,className:"vjs-done-button"});r.el().classList.remove("vjs-control","vjs-button"),r.el().textContent=this.localize("Done"),this.addChild(r)}createEl(){return Oe("div",{className:"vjs-track-settings-controls"})}}q.registerComponent("TrackSettingsControls",tc);const Eo="vjs-text-track-settings",ic=["#000","Black"],nc=["#00F","Blue"],sc=["#0FF","Cyan"],rc=["#0F0","Green"],ac=["#F0F","Magenta"],oc=["#F00","Red"],lc=["#FFF","White"],uc=["#FF0","Yellow"],To=["1","Opaque"],Co=["0.5","Semi-Transparent"],cc=["0","Transparent"],Qi={backgroundColor:{selector:".vjs-bg-color > select",id:"captions-background-color-%s",label:"Color",options:[ic,lc,oc,rc,nc,uc,ac,sc],className:"vjs-bg-color"},backgroundOpacity:{selector:".vjs-bg-opacity > select",id:"captions-background-opacity-%s",label:"Opacity",options:[To,Co,cc],className:"vjs-bg-opacity vjs-opacity"},color:{selector:".vjs-text-color > select",id:"captions-foreground-color-%s",label:"Color",options:[lc,ic,oc,rc,nc,uc,ac,sc],className:"vjs-text-color"},edgeStyle:{selector:".vjs-edge-style > select",id:"",label:"Text Edge Style",options:[["none","None"],["raised","Raised"],["depressed","Depressed"],["uniform","Uniform"],["dropshadow","Drop shadow"]]},fontFamily:{selector:".vjs-font-family > select",id:"",label:"Font Family",options:[["proportionalSansSerif","Proportional Sans-Serif"],["monospaceSansSerif","Monospace Sans-Serif"],["proportionalSerif","Proportional Serif"],["monospaceSerif","Monospace Serif"],["casual","Casual"],["script","Script"],["small-caps","Small Caps"]]},fontPercent:{selector:".vjs-font-percent > select",id:"",label:"Font Size",options:[["0.50","50%"],["0.75","75%"],["1.00","100%"],["1.25","125%"],["1.50","150%"],["1.75","175%"],["2.00","200%"],["3.00","300%"],["4.00","400%"]],default:2,parser:n=>n==="1.00"?null:Number(n)},textOpacity:{selector:".vjs-text-opacity > select",id:"captions-foreground-opacity-%s",label:"Opacity",options:[To,Co],className:"vjs-text-opacity vjs-opacity"},windowColor:{selector:".vjs-window-color > select",id:"captions-window-color-%s",label:"Color",className:"vjs-window-color"},windowOpacity:{selector:".vjs-window-opacity > select",id:"captions-window-opacity-%s",label:"Opacity",options:[cc,Co,To],className:"vjs-window-opacity vjs-opacity"}};Qi.windowColor.options=Qi.backgroundColor.options;function dc(n,e){if(e&&(n=e(n)),n&&n!=="none")return n}function Op(n,e){const t=n.options[n.options.selectedIndex].value;return dc(t,e)}function Lp(n,e,t){if(e){for(let i=0;i<n.options.length;i++)if(dc(n.options[i].value,t)===e){n.selectedIndex=i;break}}}class Rp extends Vn{constructor(e,t){t.temporary=!1,super(e,t),this.updateDisplay=this.updateDisplay.bind(this),this.fill(),this.hasBeenOpened_=this.hasBeenFilled_=!0,this.renderModalComponents(e),this.endDialog=Oe("p",{className:"vjs-control-text",textContent:this.localize("End of dialog window.")}),this.el().appendChild(this.endDialog),this.setDefaults(),t.persistTextTrackSettings===void 0&&(this.options_.persistTextTrackSettings=this.options_.playerOptions.persistTextTrackSettings),this.bindFunctionsToSelectsAndButtons(),this.options_.persistTextTrackSettings&&this.restoreSettings()}renderModalComponents(e){const t=new Zu(e,{textTrackComponentid:this.id_,selectConfigs:Qi,fieldSets:[["color","textOpacity"],["backgroundColor","backgroundOpacity"],["windowColor","windowOpacity"]]});this.addChild(t);const i=new ec(e,{textTrackComponentid:this.id_,selectConfigs:Qi,fieldSets:[["fontPercent"],["edgeStyle"],["fontFamily"]]});this.addChild(i);const s=new tc(e);this.addChild(s)}bindFunctionsToSelectsAndButtons(){this.on(this.$(".vjs-done-button"),["click","tap"],()=>{this.saveSettings(),this.close()}),this.on(this.$(".vjs-default-button"),["click","tap"],()=>{this.setDefaults(),this.updateDisplay()}),kn(Qi,e=>{this.on(this.$(e.selector),"change",this.updateDisplay)})}dispose(){this.endDialog=null,super.dispose()}label(){return this.localize("Caption Settings Dialog")}description(){return this.localize("Beginning of dialog window. Escape will cancel and close the window.")}buildCSSClass(){return super.buildCSSClass()+" vjs-text-track-settings"}getValues(){return kl(Qi,(e,t,i)=>{const s=Op(this.$(t.selector),t.parser);return s!==void 0&&(e[i]=s),e},{})}setValues(e){kn(Qi,(t,i)=>{Lp(this.$(t.selector),e[i],t.parser)})}setDefaults(){kn(Qi,e=>{const t=e.hasOwnProperty("default")?e.default:0;this.$(e.selector).selectedIndex=t})}restoreSettings(){let e;try{e=JSON.parse(A().localStorage.getItem(Eo))}catch(t){qe.warn(t)}e&&this.setValues(e)}saveSettings(){if(!this.options_.persistTextTrackSettings)return;const e=this.getValues();try{Object.keys(e).length?A().localStorage.setItem(Eo,JSON.stringify(e)):A().localStorage.removeItem(Eo)}catch(t){qe.warn(t)}}updateDisplay(){const e=this.player_.getChild("textTrackDisplay");e&&e.updateDisplay()}handleLanguagechange(){this.fill(),this.renderModalComponents(this.player_),this.bindFunctionsToSelectsAndButtons()}}q.registerComponent("TextTrackSettings",Rp);class Np extends q{constructor(e,t){let i=t.ResizeObserver||A().ResizeObserver;t.ResizeObserver===null&&(i=!1);const s=Ze({createEl:!i,reportTouchActivity:!1},t);super(e,s),this.ResizeObserver=t.ResizeObserver||A().ResizeObserver,this.loadListener_=null,this.resizeObserver_=null,this.debouncedHandler_=iu(()=>{this.resizeHandler()},100,!1,this),i?(this.resizeObserver_=new this.ResizeObserver(this.debouncedHandler_),this.resizeObserver_.observe(e.el())):(this.loadListener_=()=>{if(!this.el_||!this.el_.contentWindow)return;const r=this.debouncedHandler_;let a=this.unloadListener_=function(){kt(this,"resize",r),kt(this,"unload",a),a=null};Yt(this.el_.contentWindow,"unload",a),Yt(this.el_.contentWindow,"resize",r)},this.one("load",this.loadListener_))}createEl(){return super.createEl("iframe",{className:"vjs-resize-manager",tabIndex:-1,title:this.localize("No content")},{"aria-hidden":"true"})}resizeHandler(){!this.player_||!this.player_.trigger||this.player_.trigger("playerresize")}dispose(){this.debouncedHandler_&&this.debouncedHandler_.cancel(),this.resizeObserver_&&(this.player_.el()&&this.resizeObserver_.unobserve(this.player_.el()),this.resizeObserver_.disconnect()),this.loadListener_&&this.off("load",this.loadListener_),this.el_&&this.el_.contentWindow&&this.unloadListener_&&this.unloadListener_.call(this.el_.contentWindow),this.ResizeObserver=null,this.resizeObserver=null,this.debouncedHandler_=null,this.loadListener_=null,super.dispose()}}q.registerComponent("ResizeManager",Np);const Mp={trackingThreshold:20,liveTolerance:15};class Fp extends q{constructor(e,t){const i=Ze(Mp,t,{createEl:!1});super(e,i),this.trackLiveHandler_=()=>this.trackLive_(),this.handlePlay_=s=>this.handlePlay(s),this.handleFirstTimeupdate_=s=>this.handleFirstTimeupdate(s),this.handleSeeked_=s=>this.handleSeeked(s),this.seekToLiveEdge_=s=>this.seekToLiveEdge(s),this.reset_(),this.on(this.player_,"durationchange",s=>this.handleDurationchange(s)),this.on(this.player_,"canplay",()=>this.toggleTracking())}trackLive_(){const e=this.player_.seekable();if(!e||!e.length)return;const t=Number(A().performance.now().toFixed(4)),i=this.lastTime_===-1?0:(t-this.lastTime_)/1e3;this.lastTime_=t,this.pastSeekEnd_=this.pastSeekEnd()+i;const s=this.liveCurrentTime(),r=this.player_.currentTime();let a=this.player_.paused()||this.seekedBehindLive_||Math.abs(s-r)>this.options_.liveTolerance;(!this.timeupdateSeen_||s===1/0)&&(a=!1),a!==this.behindLiveEdge_&&(this.behindLiveEdge_=a,this.trigger("liveedgechange"))}handleDurationchange(){this.toggleTracking()}toggleTracking(){this.player_.duration()===1/0&&this.liveWindow()>=this.options_.trackingThreshold?(this.player_.options_.liveui&&this.player_.addClass("vjs-liveui"),this.startTracking()):(this.player_.removeClass("vjs-liveui"),this.stopTracking())}startTracking(){this.isTracking()||(this.timeupdateSeen_||(this.timeupdateSeen_=this.player_.hasStarted()),this.trackingInterval_=this.setInterval(this.trackLiveHandler_,ii),this.trackLive_(),this.on(this.player_,["play","pause"],this.trackLiveHandler_),this.timeupdateSeen_?this.on(this.player_,"seeked",this.handleSeeked_):(this.one(this.player_,"play",this.handlePlay_),this.one(this.player_,"timeupdate",this.handleFirstTimeupdate_)))}handleFirstTimeupdate(){this.timeupdateSeen_=!0,this.on(this.player_,"seeked",this.handleSeeked_)}handleSeeked(){const e=Math.abs(this.liveCurrentTime()-this.player_.currentTime());this.seekedBehindLive_=this.nextSeekedFromUser_&&e>2,this.nextSeekedFromUser_=!1,this.trackLive_()}handlePlay(){this.one(this.player_,"timeupdate",this.seekToLiveEdge_)}reset_(){this.lastTime_=-1,this.pastSeekEnd_=0,this.lastSeekEnd_=-1,this.behindLiveEdge_=!0,this.timeupdateSeen_=!1,this.seekedBehindLive_=!1,this.nextSeekedFromUser_=!1,this.clearInterval(this.trackingInterval_),this.trackingInterval_=null,this.off(this.player_,["play","pause"],this.trackLiveHandler_),this.off(this.player_,"seeked",this.handleSeeked_),this.off(this.player_,"play",this.handlePlay_),this.off(this.player_,"timeupdate",this.handleFirstTimeupdate_),this.off(this.player_,"timeupdate",this.seekToLiveEdge_)}nextSeekedFromUser(){this.nextSeekedFromUser_=!0}stopTracking(){this.isTracking()&&(this.reset_(),this.trigger("liveedgechange"))}seekableEnd(){const e=this.player_.seekable(),t=[];let i=e?e.length:0;for(;i--;)t.push(e.end(i));return t.length?t.sort()[t.length-1]:1/0}seekableStart(){const e=this.player_.seekable(),t=[];let i=e?e.length:0;for(;i--;)t.push(e.start(i));return t.length?t.sort()[0]:0}liveWindow(){const e=this.liveCurrentTime();return e===1/0?0:e-this.seekableStart()}isLive(){return this.isTracking()}atLiveEdge(){return!this.behindLiveEdge()}liveCurrentTime(){return this.pastSeekEnd()+this.seekableEnd()}pastSeekEnd(){const e=this.seekableEnd();return this.lastSeekEnd_!==-1&&e!==this.lastSeekEnd_&&(this.pastSeekEnd_=0),this.lastSeekEnd_=e,this.pastSeekEnd_}behindLiveEdge(){return this.behindLiveEdge_}isTracking(){return typeof this.trackingInterval_=="number"}seekToLiveEdge(){this.seekedBehindLive_=!1,!this.atLiveEdge()&&(this.nextSeekedFromUser_=!1,this.player_.currentTime(this.liveCurrentTime()))}dispose(){this.stopTracking(),super.dispose()}}q.registerComponent("LiveTracker",Fp);class Up extends q{constructor(e,t){super(e,t),this.on("statechanged",i=>this.updateDom_()),this.updateDom_()}createEl(){return this.els={title:Oe("div",{className:"vjs-title-bar-title",id:`vjs-title-bar-title-${ti()}`}),description:Oe("div",{className:"vjs-title-bar-description",id:`vjs-title-bar-description-${ti()}`})},Oe("div",{className:"vjs-title-bar"},{},Il(this.els))}updateDom_(){const e=this.player_.tech_,t=e&&e.el_,i={title:"aria-labelledby",description:"aria-describedby"};["title","description"].forEach(s=>{const r=this.state[s],a=this.els[s],l=i[s];br(a),r&&Yi(a,r),t&&(t.removeAttribute(l),r&&t.setAttribute(l,a.id))}),this.state.title||this.state.description?this.show():this.hide()}update(e){this.setState(e)}dispose(){const e=this.player_.tech_,t=e&&e.el_;t&&(t.removeAttribute("aria-labelledby"),t.removeAttribute("aria-describedby")),super.dispose(),this.els=null}}q.registerComponent("TitleBar",Up);const Vp={initialDisplay:4e3,position:[],takeFocus:!1};class zp extends It{constructor(e,t){t=Ze(Vp,t),super(e,t),this.controlText(t.controlText),this.hide(),this.on(this.player_,["useractive","userinactive"],i=>{this.removeClass("force-display")})}buildCSSClass(){return`vjs-transient-button focus-visible ${this.options_.position.map(e=>`vjs-${e}`).join(" ")}`}createEl(){const e=Oe("button",{},{type:"button",class:this.buildCSSClass()},Oe("span"));return this.controlTextEl_=e.querySelector("span"),e}show(){super.show(),this.addClass("force-display"),this.options_.takeFocus&&this.el().focus({preventScroll:!0}),this.forceDisplayTimeout=this.player_.setTimeout(()=>{this.removeClass("force-display")},this.options_.initialDisplay)}hide(){this.removeClass("force-display"),super.hide()}dispose(){this.player_.clearTimeout(this.forceDisplayTimeout),super.dispose()}}q.registerComponent("TransientButton",zp);const xo=n=>{const e=n.el();if(e.hasAttribute("src"))return n.triggerSourceset(e.src),!0;const t=n.$$("source"),i=[];let s="";if(!t.length)return!1;for(let r=0;r<t.length;r++){const a=t[r].src;a&&i.indexOf(a)===-1&&i.push(a)}return i.length?(i.length===1&&(s=i[0]),n.triggerSourceset(s),!0):!1},Hp=Object.defineProperty({},"innerHTML",{get(){return this.cloneNode(!0).innerHTML},set(n){const e=k().createElement(this.nodeName.toLowerCase());e.innerHTML=n;const t=k().createDocumentFragment();for(;e.childNodes.length;)t.appendChild(e.childNodes[0]);return this.innerText="",A().Element.prototype.appendChild.call(this,t),this.innerHTML}}),hc=(n,e)=>{let t={};for(let i=0;i<n.length&&(t=Object.getOwnPropertyDescriptor(n[i],e),!(t&&t.set&&t.get));i++);return t.enumerable=!0,t.configurable=!0,t},qp=n=>hc([n.el(),A().HTMLMediaElement.prototype,A().Element.prototype,Hp],"innerHTML"),fc=function(n){const e=n.el();if(e.resetSourceWatch_)return;const t={},i=qp(n),s=r=>(...a)=>{const l=r.apply(e,a);return xo(n),l};["append","appendChild","insertAdjacentHTML"].forEach(r=>{e[r]&&(t[r]=e[r],e[r]=s(t[r]))}),Object.defineProperty(e,"innerHTML",Ze(i,{set:s(i.set)})),e.resetSourceWatch_=()=>{e.resetSourceWatch_=null,Object.keys(t).forEach(r=>{e[r]=t[r]}),Object.defineProperty(e,"innerHTML",i)},n.one("sourceset",e.resetSourceWatch_)},Wp=Object.defineProperty({},"src",{get(){return this.hasAttribute("src")?mu(A().Element.prototype.getAttribute.call(this,"src")):""},set(n){return A().Element.prototype.setAttribute.call(this,"src",n),n}}),$p=n=>hc([n.el(),A().HTMLMediaElement.prototype,Wp],"src"),Gp=function(n){if(!n.featuresSourceset)return;const e=n.el();if(e.resetSourceset_)return;const t=$p(n),i=e.setAttribute,s=e.load;Object.defineProperty(e,"src",Ze(t,{set:r=>{const a=t.set.call(e,r);return n.triggerSourceset(e.src),a}})),e.setAttribute=(r,a)=>{const l=i.call(e,r,a);return/src/i.test(r)&&n.triggerSourceset(e.src),l},e.load=()=>{const r=s.call(e);return xo(n)||(n.triggerSourceset(""),fc(n)),r},e.currentSrc?n.triggerSourceset(e.currentSrc):xo(n)||fc(n),e.resetSourceset_=()=>{e.resetSourceset_=null,e.load=s,e.setAttribute=i,Object.defineProperty(e,"src",t),e.resetSourceWatch_&&e.resetSourceWatch_()}};class Ae extends Fe{constructor(e,t){super(e,t);const i=e.source;let s=!1;if(this.featuresVideoFrameCallback=this.featuresVideoFrameCallback&&this.el_.tagName==="VIDEO",i&&(this.el_.currentSrc!==i.src||e.tag&&e.tag.initNetworkState_===3)?this.setSource(i):this.handleLateInit_(this.el_),e.enableSourceset&&this.setupSourcesetHandling_(),this.isScrubbing_=!1,this.el_.hasChildNodes()){const r=this.el_.childNodes;let a=r.length;const l=[];for(;a--;){const d=r[a];d.nodeName.toLowerCase()==="track"&&(this.featuresNativeTextTracks?(this.remoteTextTrackEls().addTrackElement_(d),this.remoteTextTracks().addTrack(d.track),this.textTracks().addTrack(d.track),!s&&!this.el_.hasAttribute("crossorigin")&&Br(d.src)&&(s=!0)):l.push(d))}for(let d=0;d<l.length;d++)this.el_.removeChild(l[d])}this.proxyNativeTracks_(),this.featuresNativeTextTracks&&s&&qe.warn(`Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.
This may prevent text tracks from loading.`),this.restoreMetadataTracksInIOSNativePlayer_(),(Ts||fr)&&e.nativeControlsForTouch===!0&&this.setControls(!0),this.proxyWebkitFullscreen_(),this.triggerReady()}dispose(){this.el_&&this.el_.resetSourceset_&&this.el_.resetSourceset_(),Ae.disposeMediaElement(this.el_),this.options_=null,super.dispose()}setupSourcesetHandling_(){Gp(this)}restoreMetadataTracksInIOSNativePlayer_(){const e=this.textTracks();let t;const i=()=>{t=[];for(let r=0;r<e.length;r++){const a=e[r];a.kind==="metadata"&&t.push({track:a,storedMode:a.mode})}};i(),e.addEventListener("change",i),this.on("dispose",()=>e.removeEventListener("change",i));const s=()=>{for(let r=0;r<t.length;r++){const a=t[r];a.track.mode==="disabled"&&a.track.mode!==a.storedMode&&(a.track.mode=a.storedMode)}e.removeEventListener("change",s)};this.on("webkitbeginfullscreen",()=>{e.removeEventListener("change",i),e.removeEventListener("change",s),e.addEventListener("change",s)}),this.on("webkitendfullscreen",()=>{e.removeEventListener("change",i),e.addEventListener("change",i),e.removeEventListener("change",s)})}overrideNative_(e,t){if(t!==this[`featuresNative${e}Tracks`])return;const i=e.toLowerCase();this[`${i}TracksListeners_`]&&Object.keys(this[`${i}TracksListeners_`]).forEach(s=>{this.el()[`${i}Tracks`].removeEventListener(s,this[`${i}TracksListeners_`][s])}),this[`featuresNative${e}Tracks`]=!t,this[`${i}TracksListeners_`]=null,this.proxyNativeTracksForType_(i)}overrideNativeAudioTracks(e){this.overrideNative_("Audio",e)}overrideNativeVideoTracks(e){this.overrideNative_("Video",e)}proxyNativeTracksForType_(e){const t=ni[e],i=this.el()[t.getterName],s=this[t.getterName]();if(!this[`featuresNative${t.capitalName}Tracks`]||!i||!i.addEventListener)return;const r={change:l=>{const d={type:"change",target:s,currentTarget:s,srcElement:s};s.trigger(d),e==="text"&&this[Hn.remoteText.getterName]().trigger(d)},addtrack(l){s.addTrack(l.track)},removetrack(l){s.removeTrack(l.track)}},a=function(){const l=[];for(let d=0;d<s.length;d++){let p=!1;for(let g=0;g<i.length;g++)if(i[g]===s[d]){p=!0;break}p||l.push(s[d])}for(;l.length;)s.removeTrack(l.shift())};this[t.getterName+"Listeners_"]=r,Object.keys(r).forEach(l=>{const d=r[l];i.addEventListener(l,d),this.on("dispose",p=>i.removeEventListener(l,d))}),this.on("loadstart",a),this.on("dispose",l=>this.off("loadstart",a))}proxyNativeTracks_(){ni.names.forEach(e=>{this.proxyNativeTracksForType_(e)})}createEl(){let e=this.options_.tag;if(!e||!(this.options_.playerElIngest||this.movingMediaElementInDOM)){if(e){const i=e.cloneNode(!0);e.parentNode&&e.parentNode.insertBefore(i,e),Ae.disposeMediaElement(e),e=i}else{e=k().createElement("video");const i=this.options_.tag&&Xi(this.options_.tag),s=Ze({},i);(!Ts||this.options_.nativeControlsForTouch!==!0)&&delete s.controls,zl(e,Object.assign(s,{id:this.options_.techId,class:"vjs-tech"}))}e.playerId=this.options_.playerId}typeof this.options_.preload!="undefined"&&Nn(e,"preload",this.options_.preload),this.options_.disablePictureInPicture!==void 0&&(e.disablePictureInPicture=this.options_.disablePictureInPicture);const t=["loop","muted","playsinline","autoplay"];for(let i=0;i<t.length;i++){const s=t[i],r=this.options_[s];typeof r!="undefined"&&(r?Nn(e,s,s):yr(e,s),e[s]=r)}return e}handleLateInit_(e){if(e.networkState===0||e.networkState===3)return;if(e.readyState===0){let i=!1;const s=function(){i=!0};this.on("loadstart",s);const r=function(){i||this.trigger("loadstart")};this.on("loadedmetadata",r),this.ready(function(){this.off("loadstart",s),this.off("loadedmetadata",r),i||this.trigger("loadstart")});return}const t=["loadstart"];t.push("loadedmetadata"),e.readyState>=2&&t.push("loadeddata"),e.readyState>=3&&t.push("canplay"),e.readyState>=4&&t.push("canplaythrough"),this.ready(function(){t.forEach(function(i){this.trigger(i)},this)})}setScrubbing(e){this.isScrubbing_=e}scrubbing(){return this.isScrubbing_}setCurrentTime(e){try{this.isScrubbing_&&this.el_.fastSeek&&vr?this.el_.fastSeek(e):this.el_.currentTime=e}catch(t){qe(t,"Video is not ready. (Video.js)")}}duration(){if(this.el_.duration===1/0&&yi&&_i&&this.el_.currentTime===0){const e=()=>{this.el_.currentTime>0&&(this.el_.duration===1/0&&this.trigger("durationchange"),this.off("timeupdate",e))};return this.on("timeupdate",e),NaN}return this.el_.duration||NaN}width(){return this.el_.offsetWidth}height(){return this.el_.offsetHeight}proxyWebkitFullscreen_(){if(!("webkitDisplayingFullscreen"in this.el_))return;const e=function(){this.trigger("fullscreenchange",{isFullscreen:!1}),this.el_.controls&&!this.options_.nativeControlsForTouch&&this.controls()&&(this.el_.controls=!1)},t=function(){"webkitPresentationMode"in this.el_&&this.el_.webkitPresentationMode!=="picture-in-picture"&&(this.one("webkitendfullscreen",e),this.trigger("fullscreenchange",{isFullscreen:!0,nativeIOSFullscreen:!0}))};this.on("webkitbeginfullscreen",t),this.on("dispose",()=>{this.off("webkitbeginfullscreen",t),this.off("webkitendfullscreen",e)})}supportsFullScreen(){return typeof this.el_.webkitEnterFullScreen=="function"}enterFullScreen(){const e=this.el_;if(e.paused&&e.networkState<=e.HAVE_METADATA)Ei(this.el_.play()),this.setTimeout(function(){e.pause();try{e.webkitEnterFullScreen()}catch(t){this.trigger("fullscreenerror",t)}},0);else try{e.webkitEnterFullScreen()}catch(t){this.trigger("fullscreenerror",t)}}exitFullScreen(){if(!this.el_.webkitDisplayingFullscreen){this.trigger("fullscreenerror",new Error("The video is not fullscreen"));return}this.el_.webkitExitFullScreen()}requestPictureInPicture(){return this.el_.requestPictureInPicture()}requestVideoFrameCallback(e){return this.featuresVideoFrameCallback&&!this.el_.webkitKeys?this.el_.requestVideoFrameCallback(e):super.requestVideoFrameCallback(e)}cancelVideoFrameCallback(e){this.featuresVideoFrameCallback&&!this.el_.webkitKeys?this.el_.cancelVideoFrameCallback(e):super.cancelVideoFrameCallback(e)}src(e){if(e===void 0)return this.el_.src;this.setSrc(e)}reset(){Ae.resetMediaElement(this.el_)}currentSrc(){return this.currentSource_?this.currentSource_.src:this.el_.currentSrc}setControls(e){this.el_.controls=!!e}addTextTrack(e,t,i){return this.featuresNativeTextTracks?this.el_.addTextTrack(e,t,i):super.addTextTrack(e,t,i)}createRemoteTextTrack(e){if(!this.featuresNativeTextTracks)return super.createRemoteTextTrack(e);const t=k().createElement("track");return e.kind&&(t.kind=e.kind),e.label&&(t.label=e.label),(e.language||e.srclang)&&(t.srclang=e.language||e.srclang),e.default&&(t.default=e.default),e.id&&(t.id=e.id),e.src&&(t.src=e.src),t}addRemoteTextTrack(e,t){const i=super.addRemoteTextTrack(e,t);return this.featuresNativeTextTracks&&this.el().appendChild(i),i}removeRemoteTextTrack(e){if(super.removeRemoteTextTrack(e),this.featuresNativeTextTracks){const t=this.$$("track");let i=t.length;for(;i--;)(e===t[i]||e===t[i].track)&&this.el().removeChild(t[i])}}getVideoPlaybackQuality(){if(typeof this.el().getVideoPlaybackQuality=="function")return this.el().getVideoPlaybackQuality();const e={};return typeof this.el().webkitDroppedFrameCount!="undefined"&&typeof this.el().webkitDecodedFrameCount!="undefined"&&(e.droppedVideoFrames=this.el().webkitDroppedFrameCount,e.totalVideoFrames=this.el().webkitDecodedFrameCount),A().performance&&(e.creationTime=A().performance.now()),e}}lr(Ae,"TEST_VID",function(){if(!Ln())return;const n=k().createElement("video"),e=k().createElement("track");return e.kind="captions",e.srclang="en",e.label="English",n.appendChild(e),n}),Ae.isSupported=function(){try{Ae.TEST_VID.volume=.5}catch(n){return!1}return!!(Ae.TEST_VID&&Ae.TEST_VID.canPlayType)},Ae.canPlayType=function(n){return Ae.TEST_VID.canPlayType(n)},Ae.canPlaySource=function(n,e){return Ae.canPlayType(n.type)},Ae.canControlVolume=function(){try{const n=Ae.TEST_VID.volume;Ae.TEST_VID.volume=n/2+.1;const e=n!==Ae.TEST_VID.volume;return e&&Lt?(A().setTimeout(()=>{Ae&&Ae.prototype&&(Ae.prototype.featuresVolumeControl=n!==Ae.TEST_VID.volume)}),!1):e}catch(n){return!1}},Ae.canMuteVolume=function(){try{const n=Ae.TEST_VID.muted;return Ae.TEST_VID.muted=!n,Ae.TEST_VID.muted?Nn(Ae.TEST_VID,"muted","muted"):yr(Ae.TEST_VID,"muted","muted"),n!==Ae.TEST_VID.muted}catch(n){return!1}},Ae.canControlPlaybackRate=function(){if(yi&&_i&&ur<58)return!1;try{const n=Ae.TEST_VID.playbackRate;return Ae.TEST_VID.playbackRate=n/2+.1,n!==Ae.TEST_VID.playbackRate}catch(n){return!1}},Ae.canOverrideAttributes=function(){try{const n=()=>{};Object.defineProperty(k().createElement("video"),"src",{get:n,set:n}),Object.defineProperty(k().createElement("audio"),"src",{get:n,set:n}),Object.defineProperty(k().createElement("video"),"innerHTML",{get:n,set:n}),Object.defineProperty(k().createElement("audio"),"innerHTML",{get:n,set:n})}catch(n){return!1}return!0},Ae.supportsNativeTextTracks=function(){return vr||Lt&&_i},Ae.supportsNativeVideoTracks=function(){return!!(Ae.TEST_VID&&Ae.TEST_VID.videoTracks)},Ae.supportsNativeAudioTracks=function(){return!!(Ae.TEST_VID&&Ae.TEST_VID.audioTracks)},Ae.Events=["loadstart","suspend","abort","error","emptied","stalled","loadedmetadata","loadeddata","canplay","canplaythrough","playing","waiting","seeking","seeked","ended","durationchange","timeupdate","progress","play","pause","ratechange","resize","volumechange"],[["featuresMuteControl","canMuteVolume"],["featuresPlaybackRate","canControlPlaybackRate"],["featuresSourceset","canOverrideAttributes"],["featuresNativeTextTracks","supportsNativeTextTracks"],["featuresNativeVideoTracks","supportsNativeVideoTracks"],["featuresNativeAudioTracks","supportsNativeAudioTracks"]].forEach(function([n,e]){lr(Ae.prototype,n,()=>Ae[e](),!0)}),Ae.prototype.featuresVolumeControl=Ae.canControlVolume(),Ae.prototype.movingMediaElementInDOM=!Lt,Ae.prototype.featuresFullscreenResize=!0,Ae.prototype.featuresProgressEvents=!0,Ae.prototype.featuresTimeupdateEvents=!0,Ae.prototype.featuresVideoFrameCallback=!!(Ae.TEST_VID&&Ae.TEST_VID.requestVideoFrameCallback),Ae.disposeMediaElement=function(n){if(n){for(n.parentNode&&n.parentNode.removeChild(n);n.hasChildNodes();)n.removeChild(n.firstChild);n.removeAttribute("src"),typeof n.load=="function"&&function(){try{n.load()}catch(e){}}()}},Ae.resetMediaElement=function(n){if(!n)return;const e=n.querySelectorAll("source");let t=e.length;for(;t--;)n.removeChild(e[t]);n.removeAttribute("src"),typeof n.load=="function"&&function(){try{n.load()}catch(i){}}()},["muted","defaultMuted","autoplay","controls","loop","playsinline"].forEach(function(n){Ae.prototype[n]=function(){return this.el_[n]||this.el_.hasAttribute(n)}}),["muted","defaultMuted","autoplay","loop","playsinline"].forEach(function(n){Ae.prototype["set"+gt(n)]=function(e){this.el_[n]=e,e?this.el_.setAttribute(n,n):this.el_.removeAttribute(n)}}),["paused","currentTime","buffered","volume","poster","preload","error","seeking","seekable","ended","playbackRate","defaultPlaybackRate","disablePictureInPicture","played","networkState","readyState","videoWidth","videoHeight","crossOrigin"].forEach(function(n){Ae.prototype[n]=function(){return this.el_[n]}}),["volume","src","poster","preload","playbackRate","defaultPlaybackRate","disablePictureInPicture","crossOrigin"].forEach(function(n){Ae.prototype["set"+gt(n)]=function(e){this.el_[n]=e}}),["pause","load","play"].forEach(function(n){Ae.prototype[n]=function(){return this.el_[n]()}}),Fe.withSourceHandlers(Ae),Ae.nativeSourceHandler={},Ae.nativeSourceHandler.canPlayType=function(n){try{return Ae.TEST_VID.canPlayType(n)}catch(e){return""}},Ae.nativeSourceHandler.canHandleSource=function(n,e){if(n.type)return Ae.nativeSourceHandler.canPlayType(n.type);if(n.src){const t=to(n.src);return Ae.nativeSourceHandler.canPlayType(`video/${t}`)}return""},Ae.nativeSourceHandler.handleSource=function(n,e,t){e.setSrc(n.src)},Ae.nativeSourceHandler.dispose=function(){},Ae.registerSourceHandler(Ae.nativeSourceHandler),Fe.registerTech("Html5",Ae);const pc=["progress","abort","suspend","emptied","stalled","loadedmetadata","loadeddata","timeupdate","resize","volumechange","texttrackchange"],So={canplay:"CanPlay",canplaythrough:"CanPlayThrough",playing:"Playing",seeked:"Seeked"},jo=["tiny","xsmall","small","medium","large","xlarge","huge"],Lr={};jo.forEach(n=>{const e=n.charAt(0)==="x"?`x-${n.substring(1)}`:n;Lr[n]=`vjs-layout-${e}`});const Yp={tiny:210,xsmall:320,small:425,medium:768,large:1440,xlarge:2560,huge:1/0};class at extends q{constructor(e,t,i){if(e.id=e.id||t.id||`vjs_video_${ti()}`,t=Object.assign(at.getTagSettings(e),t),t.initChildren=!1,t.createEl=!1,t.evented=!1,t.reportTouchActivity=!1,!t.language){const a=e.closest("[lang]");a&&(t.language=a.getAttribute("lang"))}if(super(null,t,i),this.boundDocumentFullscreenChange_=a=>this.documentFullscreenChange_(a),this.boundFullWindowOnEscKey_=a=>this.fullWindowOnEscKey(a),this.boundUpdateStyleEl_=a=>this.updateStyleEl_(a),this.boundApplyInitTime_=a=>this.applyInitTime_(a),this.boundUpdateCurrentBreakpoint_=a=>this.updateCurrentBreakpoint_(a),this.boundHandleTechClick_=a=>this.handleTechClick_(a),this.boundHandleTechDoubleClick_=a=>this.handleTechDoubleClick_(a),this.boundHandleTechTouchStart_=a=>this.handleTechTouchStart_(a),this.boundHandleTechTouchMove_=a=>this.handleTechTouchMove_(a),this.boundHandleTechTouchEnd_=a=>this.handleTechTouchEnd_(a),this.boundHandleTechTap_=a=>this.handleTechTap_(a),this.boundUpdatePlayerHeightOnAudioOnlyMode_=a=>this.updatePlayerHeightOnAudioOnlyMode_(a),this.isFullscreen_=!1,this.log=wl(this.id_),this.fsApi_=ar,this.isPosterFromTech_=!1,this.queuedCallbacks_=[],this.isReady_=!1,this.hasStarted_=!1,this.userActive_=!1,this.debugEnabled_=!1,this.audioOnlyMode_=!1,this.audioPosterMode_=!1,this.audioOnlyCache_={controlBarHeight:null,playerHeight:null,hiddenChildren:[]},!this.options_||!this.options_.techOrder||!this.options_.techOrder.length)throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");if(this.tag=e,this.tagAttributes=e&&Xi(e),this.language(this.options_.language),t.languages){const a={};Object.getOwnPropertyNames(t.languages).forEach(function(l){a[l.toLowerCase()]=t.languages[l]}),this.languages_=a}else this.languages_=at.prototype.options_.languages;this.resetCache_(),this.poster_=t.poster||"",this.controls_=!!t.controls,e.controls=!1,e.removeAttribute("controls"),this.changingSrc_=!1,this.playCallbacks_=[],this.playTerminatedQueue_=[],e.hasAttribute("autoplay")?this.autoplay(!0):this.autoplay(this.options_.autoplay),t.plugins&&Object.keys(t.plugins).forEach(a=>{if(typeof this[a]!="function")throw new Error(`plugin "${a}" does not exist`)}),this.scrubbing_=!1,this.el_=this.createEl(),$a(this,{eventBusKey:"el_"}),this.fsApi_.requestFullscreen&&(Yt(k(),this.fsApi_.fullscreenchange,this.boundDocumentFullscreenChange_),this.on(this.fsApi_.fullscreenchange,this.boundDocumentFullscreenChange_)),this.fluid_&&this.on(["playerreset","resize"],this.boundUpdateStyleEl_);const s=Ze(this.options_);if(t.plugins&&Object.keys(t.plugins).forEach(a=>{this[a](t.plugins[a])}),t.debug&&this.debug(!0),this.options_.playerOptions=s,this.middleware_=[],this.playbackRates(t.playbackRates),t.experimentalSvgIcons){const l=new(A()).DOMParser().parseFromString(vp,"image/svg+xml");if(l.querySelector("parsererror"))qe.warn("Failed to load SVG Icons. Falling back to Font Icons."),this.options_.experimentalSvgIcons=null;else{const p=l.documentElement;p.style.display="none",this.el_.appendChild(p),this.addClass("vjs-svg-icons-enabled")}}this.initChildren(),this.isAudio(e.nodeName.toLowerCase()==="audio"),this.controls()?this.addClass("vjs-controls-enabled"):this.addClass("vjs-controls-disabled"),this.el_.setAttribute("role","region"),this.isAudio()?this.el_.setAttribute("aria-label",this.localize("Audio Player")):this.el_.setAttribute("aria-label",this.localize("Video Player")),this.isAudio()&&this.addClass("vjs-audio"),t.spatialNavigation&&t.spatialNavigation.enabled&&(this.spatialNavigation=new Ap(this),this.addClass("vjs-spatial-navigation-enabled")),Ts&&this.addClass("vjs-touch-enabled"),Lt||this.addClass("vjs-workinghover"),at.players[this.id_]=this;const r=Pa.split(".")[0];this.addClass(`vjs-v${r}`),this.userActive(!0),this.reportUserActivity(),this.one("play",a=>this.listenForUserActivity_(a)),this.on("keydown",a=>this.handleKeyDown(a)),this.on("languagechange",a=>this.handleLanguagechange(a)),this.breakpoints(this.options_.breakpoints),this.responsive(this.options_.responsive),this.on("ready",()=>{this.audioPosterMode(this.options_.audioPosterMode),this.audioOnlyMode(this.options_.audioOnlyMode)})}dispose(){this.trigger("dispose"),this.off("dispose"),kt(k(),this.fsApi_.fullscreenchange,this.boundDocumentFullscreenChange_),kt(k(),"keydown",this.boundFullWindowOnEscKey_),this.styleEl_&&this.styleEl_.parentNode&&(this.styleEl_.parentNode.removeChild(this.styleEl_),this.styleEl_=null),at.players[this.id_]=null,this.tag&&this.tag.player&&(this.tag.player=null),this.el_&&this.el_.player&&(this.el_.player=null),this.tech_&&(this.tech_.dispose(),this.isPosterFromTech_=!1,this.poster_=""),this.playerElIngest_&&(this.playerElIngest_=null),this.tag&&(this.tag=null),fp(this),Nt.names.forEach(e=>{const t=Nt[e],i=this[t.getterName]();i&&i.off&&i.off()}),super.dispose({restoreEl:this.options_.restoreEl})}createEl(){let e=this.tag,t,i=this.playerElIngest_=e.parentNode&&e.parentNode.hasAttribute&&e.parentNode.hasAttribute("data-vjs-player");const s=this.tag.tagName.toLowerCase()==="video-js";i?t=this.el_=e.parentNode:s||(t=this.el_=super.createEl("div"));const r=Xi(e);if(s){for(t=this.el_=e,e=this.tag=k().createElement("video");t.children.length;)e.appendChild(t.firstChild);Cs(t,"video-js")||on(t,"video-js"),t.appendChild(e),i=this.playerElIngest_=t,Object.keys(t).forEach(d=>{try{e[d]=t[d]}catch(p){}})}e.setAttribute("tabindex","-1"),r.tabindex="-1",_i&&dr&&(e.setAttribute("role","application"),r.role="application"),e.removeAttribute("width"),e.removeAttribute("height"),"width"in r&&delete r.width,"height"in r&&delete r.height,Object.getOwnPropertyNames(r).forEach(function(d){s&&d==="class"||t.setAttribute(d,r[d]),s&&e.setAttribute(d,r[d])}),e.playerId=e.id,e.id+="_html5_api",e.className="vjs-tech",e.player=t.player=this,this.addClass("vjs-paused");const a=["IS_SMART_TV","IS_TIZEN","IS_WEBOS","IS_ANDROID","IS_IPAD","IS_IPHONE","IS_CHROMECAST_RECEIVER"].filter(d=>Nl[d]).map(d=>"vjs-device-"+d.substring(3).toLowerCase().replace(/\_/g,"-"));if(this.addClass(...a),A().VIDEOJS_NO_DYNAMIC_STYLE!==!0){this.styleEl_=Zl("vjs-styles-dimensions");const d=Ki(".vjs-styles-defaults"),p=Ki("head");p.insertBefore(this.styleEl_,d?d.nextSibling:p.firstChild)}this.fill_=!1,this.fluid_=!1,this.width(this.options_.width),this.height(this.options_.height),this.fill(this.options_.fill),this.fluid(this.options_.fluid),this.aspectRatio(this.options_.aspectRatio),this.crossOrigin(this.options_.crossOrigin||this.options_.crossorigin);const l=e.getElementsByTagName("a");for(let d=0;d<l.length;d++){const p=l.item(d);on(p,"vjs-hidden"),p.setAttribute("hidden","hidden")}return e.initNetworkState_=e.networkState,e.parentNode&&!i&&e.parentNode.insertBefore(t,e),Na(e,t),this.children_.unshift(e),this.el_.setAttribute("lang",this.language_),this.el_.setAttribute("translate","no"),this.el_=t,t}crossOrigin(e){if(typeof e=="undefined")return this.techGet_("crossOrigin");if(e!==null&&e!=="anonymous"&&e!=="use-credentials"){qe.warn(`crossOrigin must be null,  "anonymous" or "use-credentials", given "${e}"`);return}this.techCall_("setCrossOrigin",e),this.posterImage&&this.posterImage.crossOrigin(e)}width(e){return this.dimension("width",e)}height(e){return this.dimension("height",e)}dimension(e,t){const i=e+"_";if(t===void 0)return this[i]||0;if(t===""||t==="auto"){this[i]=void 0,this.updateStyleEl_();return}const s=parseFloat(t);if(isNaN(s)){qe.error(`Improper value "${t}" supplied for for ${e}`);return}this[i]=s,this.updateStyleEl_()}fluid(e){if(e===void 0)return!!this.fluid_;this.fluid_=!!e,Ni(this)&&this.off(["playerreset","resize"],this.boundUpdateStyleEl_),e?(this.addClass("vjs-fluid"),this.fill(!1),Wf(this,()=>{this.on(["playerreset","resize"],this.boundUpdateStyleEl_)})):this.removeClass("vjs-fluid"),this.updateStyleEl_()}fill(e){if(e===void 0)return!!this.fill_;this.fill_=!!e,e?(this.addClass("vjs-fill"),this.fluid(!1)):this.removeClass("vjs-fill")}aspectRatio(e){if(e===void 0)return this.aspectRatio_;if(!/^\d+\:\d+$/.test(e))throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");this.aspectRatio_=e,this.fluid(!0),this.updateStyleEl_()}updateStyleEl_(){if(A().VIDEOJS_NO_DYNAMIC_STYLE===!0){const l=typeof this.width_=="number"?this.width_:this.options_.width,d=typeof this.height_=="number"?this.height_:this.options_.height,p=this.tech_&&this.tech_.el();p&&(l>=0&&(p.width=l),d>=0&&(p.height=d));return}let e,t,i,s;this.aspectRatio_!==void 0&&this.aspectRatio_!=="auto"?i=this.aspectRatio_:this.videoWidth()>0?i=this.videoWidth()+":"+this.videoHeight():i="16:9";const r=i.split(":"),a=r[1]/r[0];this.width_!==void 0?e=this.width_:this.height_!==void 0?e=this.height_/a:e=this.videoWidth()||300,this.height_!==void 0?t=this.height_:t=e*a,/^[^a-zA-Z]/.test(this.id())?s="dimensions-"+this.id():s=this.id()+"-dimensions",this.addClass(s),eu(this.styleEl_,`
      .${s} {
        width: ${e}px;
        height: ${t}px;
      }

      .${s}.vjs-fluid:not(.vjs-audio-only-mode) {
        padding-top: ${a*100}%;
      }
    `)}loadTech_(e,t){this.tech_&&this.unloadTech_();const i=gt(e),s=e.charAt(0).toLowerCase()+e.slice(1);i!=="Html5"&&this.tag&&(Fe.getTech("Html5").disposeMediaElement(this.tag),this.tag.player=null,this.tag=null),this.techName_=i,this.isReady_=!1;let r=this.autoplay();(typeof this.autoplay()=="string"||this.autoplay()===!0&&this.options_.normalizeAutoplay)&&(r=!1);const a={source:t,autoplay:r,nativeControlsForTouch:this.options_.nativeControlsForTouch,playerId:this.id(),techId:`${this.id()}_${s}_api`,playsinline:this.options_.playsinline,preload:this.options_.preload,loop:this.options_.loop,disablePictureInPicture:this.options_.disablePictureInPicture,muted:this.options_.muted,poster:this.poster(),language:this.language(),playerElIngest:this.playerElIngest_||!1,"vtt.js":this.options_["vtt.js"],canOverridePoster:!!this.options_.techCanOverridePoster,enableSourceset:this.options_.enableSourceset};Nt.names.forEach(d=>{const p=Nt[d];a[p.getterName]=this[p.privateName]}),Object.assign(a,this.options_[i]),Object.assign(a,this.options_[s]),Object.assign(a,this.options_[e.toLowerCase()]),this.tag&&(a.tag=this.tag),t&&t.src===this.cache_.src&&this.cache_.currentTime>0&&(a.startTime=this.cache_.currentTime);const l=Fe.getTech(e);if(!l)throw new Error(`No Tech named '${i}' exists! '${i}' should be registered using videojs.registerTech()'`);this.tech_=new l(a),this.tech_.ready(nt(this,this.handleTechReady_),!0),hu.jsonToTextTracks(this.textTracksJson_||[],this.tech_),pc.forEach(d=>{this.on(this.tech_,d,p=>this[`handleTech${gt(d)}_`](p))}),Object.keys(So).forEach(d=>{this.on(this.tech_,d,p=>{if(this.tech_.playbackRate()===0&&this.tech_.seeking()){this.queuedCallbacks_.push({callback:this[`handleTech${So[d]}_`].bind(this),event:p});return}this[`handleTech${So[d]}_`](p)})}),this.on(this.tech_,"loadstart",d=>this.handleTechLoadStart_(d)),this.on(this.tech_,"sourceset",d=>this.handleTechSourceset_(d)),this.on(this.tech_,"waiting",d=>this.handleTechWaiting_(d)),this.on(this.tech_,"ended",d=>this.handleTechEnded_(d)),this.on(this.tech_,"seeking",d=>this.handleTechSeeking_(d)),this.on(this.tech_,"play",d=>this.handleTechPlay_(d)),this.on(this.tech_,"pause",d=>this.handleTechPause_(d)),this.on(this.tech_,"durationchange",d=>this.handleTechDurationChange_(d)),this.on(this.tech_,"fullscreenchange",(d,p)=>this.handleTechFullscreenChange_(d,p)),this.on(this.tech_,"fullscreenerror",(d,p)=>this.handleTechFullscreenError_(d,p)),this.on(this.tech_,"enterpictureinpicture",d=>this.handleTechEnterPictureInPicture_(d)),this.on(this.tech_,"leavepictureinpicture",d=>this.handleTechLeavePictureInPicture_(d)),this.on(this.tech_,"error",d=>this.handleTechError_(d)),this.on(this.tech_,"posterchange",d=>this.handleTechPosterChange_(d)),this.on(this.tech_,"textdata",d=>this.handleTechTextData_(d)),this.on(this.tech_,"ratechange",d=>this.handleTechRateChange_(d)),this.on(this.tech_,"loadedmetadata",this.boundUpdateStyleEl_),this.usingNativeControls(this.techGet_("controls")),this.controls()&&!this.usingNativeControls()&&this.addTechControlsListeners_(),this.tech_.el().parentNode!==this.el()&&(i!=="Html5"||!this.tag)&&Na(this.tech_.el(),this.el()),this.tag&&(this.tag.player=null,this.tag=null)}unloadTech_(){Nt.names.forEach(e=>{const t=Nt[e];this[t.privateName]=this[t.getterName]()}),this.textTracksJson_=hu.textTracksToJson(this.tech_),this.isReady_=!1,this.tech_.dispose(),this.tech_=!1,this.isPosterFromTech_&&(this.poster_="",this.trigger("posterchange")),this.isPosterFromTech_=!1}tech(e){return e===void 0&&qe.warn(`Using the tech directly can be dangerous. I hope you know what you're doing.
See https://github.com/videojs/video.js/issues/2617 for more info.
`),this.tech_}version(){return{"video.js":Pa}}addTechControlsListeners_(){this.removeTechControlsListeners_(),this.on(this.tech_,"click",this.boundHandleTechClick_),this.on(this.tech_,"dblclick",this.boundHandleTechDoubleClick_),this.on(this.tech_,"touchstart",this.boundHandleTechTouchStart_),this.on(this.tech_,"touchmove",this.boundHandleTechTouchMove_),this.on(this.tech_,"touchend",this.boundHandleTechTouchEnd_),this.on(this.tech_,"tap",this.boundHandleTechTap_)}removeTechControlsListeners_(){this.off(this.tech_,"tap",this.boundHandleTechTap_),this.off(this.tech_,"touchstart",this.boundHandleTechTouchStart_),this.off(this.tech_,"touchmove",this.boundHandleTechTouchMove_),this.off(this.tech_,"touchend",this.boundHandleTechTouchEnd_),this.off(this.tech_,"click",this.boundHandleTechClick_),this.off(this.tech_,"dblclick",this.boundHandleTechDoubleClick_)}handleTechReady_(){this.triggerReady(),this.cache_.volume&&this.techCall_("setVolume",this.cache_.volume),this.handleTechPosterChange_(),this.handleTechDurationChange_()}handleTechLoadStart_(){this.removeClass("vjs-ended","vjs-seeking"),this.error(null),this.handleTechDurationChange_(),this.paused()?(this.hasStarted(!1),this.trigger("loadstart")):this.trigger("loadstart"),this.manualAutoplay_(this.autoplay()===!0&&this.options_.normalizeAutoplay?"play":this.autoplay())}manualAutoplay_(e){if(!this.tech_||typeof e!="string")return;const t=()=>{const s=this.muted();this.muted(!0);const r=()=>{this.muted(s)};this.playTerminatedQueue_.push(r);const a=this.play();if(ws(a))return a.catch(l=>{throw r(),new Error(`Rejection at manualAutoplay. Restoring muted value. ${l||""}`)})};let i;if(e==="any"&&!this.muted()?(i=this.play(),ws(i)&&(i=i.catch(t))):e==="muted"&&!this.muted()?i=t():i=this.play(),!!ws(i))return i.then(()=>{this.trigger({type:"autoplay-success",autoplay:e})}).catch(()=>{this.trigger({type:"autoplay-failure",autoplay:e})})}updateSourceCaches_(e=""){let t=e,i="";typeof t!="string"&&(t=e.src,i=e.type),this.cache_.source=this.cache_.source||{},this.cache_.sources=this.cache_.sources||[],t&&!i&&(i=gp(this,t)),this.cache_.source=Ze({},e,{src:t,type:i});const s=this.cache_.sources.filter(d=>d.src&&d.src===t),r=[],a=this.$$("source"),l=[];for(let d=0;d<a.length;d++){const p=Xi(a[d]);r.push(p),p.src&&p.src===t&&l.push(p.src)}l.length&&!s.length?this.cache_.sources=r:s.length||(this.cache_.sources=[this.cache_.source]),this.cache_.src=t}handleTechSourceset_(e){if(!this.changingSrc_){let t=r=>this.updateSourceCaches_(r);const i=this.currentSource().src,s=e.src;i&&!/^blob:/.test(i)&&/^blob:/.test(s)&&(!this.lastSource_||this.lastSource_.tech!==s&&this.lastSource_.player!==i)&&(t=()=>{}),t(s),e.src||this.tech_.any(["sourceset","loadstart"],r=>{if(r.type==="sourceset")return;const a=this.techGet_("currentSrc");this.lastSource_.tech=a,this.updateSourceCaches_(a)})}this.lastSource_={player:this.currentSource().src,tech:e.src},this.trigger({src:e.src,type:"sourceset"})}hasStarted(e){if(e===void 0)return this.hasStarted_;e!==this.hasStarted_&&(this.hasStarted_=e,this.hasStarted_?this.addClass("vjs-has-started"):this.removeClass("vjs-has-started"))}handleTechPlay_(){this.removeClass("vjs-ended","vjs-paused"),this.addClass("vjs-playing"),this.hasStarted(!0),this.trigger("play")}handleTechRateChange_(){this.tech_.playbackRate()>0&&this.cache_.lastPlaybackRate===0&&(this.queuedCallbacks_.forEach(e=>e.callback(e.event)),this.queuedCallbacks_=[]),this.cache_.lastPlaybackRate=this.tech_.playbackRate(),this.trigger("ratechange")}handleTechWaiting_(){this.addClass("vjs-waiting"),this.trigger("waiting");const e=this.currentTime(),t=()=>{e!==this.currentTime()&&(this.removeClass("vjs-waiting"),this.off("timeupdate",t))};this.on("timeupdate",t)}handleTechCanPlay_(){this.removeClass("vjs-waiting"),this.trigger("canplay")}handleTechCanPlayThrough_(){this.removeClass("vjs-waiting"),this.trigger("canplaythrough")}handleTechPlaying_(){this.removeClass("vjs-waiting"),this.trigger("playing")}handleTechSeeking_(){this.addClass("vjs-seeking"),this.trigger("seeking")}handleTechSeeked_(){this.removeClass("vjs-seeking","vjs-ended"),this.trigger("seeked")}handleTechPause_(){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.trigger("pause")}handleTechEnded_(){this.addClass("vjs-ended"),this.removeClass("vjs-waiting"),this.options_.loop?(this.currentTime(0),this.play()):this.paused()||this.pause(),this.trigger("ended")}handleTechDurationChange_(){this.duration(this.techGet_("duration"))}handleTechClick_(e){this.controls_&&(this.options_===void 0||this.options_.userActions===void 0||this.options_.userActions.click===void 0||this.options_.userActions.click!==!1)&&(this.options_!==void 0&&this.options_.userActions!==void 0&&typeof this.options_.userActions.click=="function"?this.options_.userActions.click.call(this,e):this.paused()?Ei(this.play()):this.pause())}handleTechDoubleClick_(e){if(!this.controls_)return;Array.prototype.some.call(this.$$(".vjs-control-bar, .vjs-modal-dialog"),i=>i.contains(e.target))||(this.options_===void 0||this.options_.userActions===void 0||this.options_.userActions.doubleClick===void 0||this.options_.userActions.doubleClick!==!1)&&(this.options_!==void 0&&this.options_.userActions!==void 0&&typeof this.options_.userActions.doubleClick=="function"?this.options_.userActions.doubleClick.call(this,e):this.isFullscreen()?this.exitFullscreen():this.requestFullscreen())}handleTechTap_(){this.userActive(!this.userActive())}handleTechTouchStart_(){this.userWasActive=this.userActive()}handleTechTouchMove_(){this.userWasActive&&this.reportUserActivity()}handleTechTouchEnd_(e){e.cancelable&&e.preventDefault()}toggleFullscreenClass_(){this.isFullscreen()?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen")}documentFullscreenChange_(e){const t=e.target.player;if(t&&t!==this)return;const i=this.el();let s=k()[this.fsApi_.fullscreenElement]===i;!s&&i.matches&&(s=i.matches(":"+this.fsApi_.fullscreen)),this.isFullscreen(s)}handleTechFullscreenChange_(e,t){t&&(t.nativeIOSFullscreen&&(this.addClass("vjs-ios-native-fs"),this.tech_.one("webkitendfullscreen",()=>{this.removeClass("vjs-ios-native-fs")})),this.isFullscreen(t.isFullscreen))}handleTechFullscreenError_(e,t){this.trigger("fullscreenerror",t)}togglePictureInPictureClass_(){this.isInPictureInPicture()?this.addClass("vjs-picture-in-picture"):this.removeClass("vjs-picture-in-picture")}handleTechEnterPictureInPicture_(e){this.isInPictureInPicture(!0)}handleTechLeavePictureInPicture_(e){this.isInPictureInPicture(!1)}handleTechError_(){const e=this.tech_.error();e&&this.error(e)}handleTechTextData_(){let e=null;arguments.length>1&&(e=arguments[1]),this.trigger("textdata",e)}getCache(){return this.cache_}resetCache_(){this.cache_={currentTime:0,initTime:0,inactivityTimeout:this.options_.inactivityTimeout,duration:NaN,lastVolume:1,lastPlaybackRate:this.defaultPlaybackRate(),media:null,src:"",source:{},sources:[],playbackRates:[],volume:1}}techCall_(e,t){this.ready(function(){if(e in dp)return up(this.middleware_,this.tech_,e,t);if(e in bu)return _u(this.middleware_,this.tech_,e,t);try{this.tech_&&this.tech_[e](t)}catch(i){throw qe(i),i}},!0)}techGet_(e){if(!(!this.tech_||!this.tech_.isReady_)){if(e in cp)return lp(this.middleware_,this.tech_,e);if(e in bu)return _u(this.middleware_,this.tech_,e);try{return this.tech_[e]()}catch(t){throw this.tech_[e]===void 0?(qe(`Video.js: ${e} method not defined for ${this.techName_} playback technology.`,t),t):t.name==="TypeError"?(qe(`Video.js: ${e} unavailable on ${this.techName_} playback technology element.`,t),this.tech_.isReady_=!1,t):(qe(t),t)}}}play(){return new Promise(e=>{this.play_(e)})}play_(e=Ei){this.playCallbacks_.push(e);const t=!!(!this.changingSrc_&&(this.src()||this.currentSrc())),i=!!(vr||Lt);if(this.waitToPlay_&&(this.off(["ready","loadstart"],this.waitToPlay_),this.waitToPlay_=null),!this.isReady_||!t){this.waitToPlay_=a=>{this.play_()},this.one(["ready","loadstart"],this.waitToPlay_),!t&&i&&this.load();return}const s=this.techGet_("play");i&&this.hasClass("vjs-ended")&&this.resetProgressBar_(),s===null?this.runPlayTerminatedQueue_():this.runPlayCallbacks_(s)}runPlayTerminatedQueue_(){const e=this.playTerminatedQueue_.slice(0);this.playTerminatedQueue_=[],e.forEach(function(t){t()})}runPlayCallbacks_(e){const t=this.playCallbacks_.slice(0);this.playCallbacks_=[],this.playTerminatedQueue_=[],t.forEach(function(i){i(e)})}pause(){this.techCall_("pause")}paused(){return this.techGet_("paused")!==!1}played(){return this.techGet_("played")||hi(0,0)}scrubbing(e){if(typeof e=="undefined")return this.scrubbing_;this.scrubbing_=!!e,this.techCall_("setScrubbing",this.scrubbing_),e?this.addClass("vjs-scrubbing"):this.removeClass("vjs-scrubbing")}currentTime(e){if(e===void 0)return this.cache_.currentTime=this.techGet_("currentTime")||0,this.cache_.currentTime;if(e<0&&(e=0),!this.isReady_||this.changingSrc_||!this.tech_||!this.tech_.isReady_){this.cache_.initTime=e,this.off("canplay",this.boundApplyInitTime_),this.one("canplay",this.boundApplyInitTime_);return}this.techCall_("setCurrentTime",e),this.cache_.initTime=0,isFinite(e)&&(this.cache_.currentTime=Number(e))}applyInitTime_(){this.currentTime(this.cache_.initTime)}duration(e){if(e===void 0)return this.cache_.duration!==void 0?this.cache_.duration:NaN;e=parseFloat(e),e<0&&(e=1/0),e!==this.cache_.duration&&(this.cache_.duration=e,e===1/0?this.addClass("vjs-live"):this.removeClass("vjs-live"),isNaN(e)||this.trigger("durationchange"))}remainingTime(){return this.duration()-this.currentTime()}remainingTimeDisplay(){return Math.floor(this.duration())-Math.floor(this.currentTime())}buffered(){let e=this.techGet_("buffered");return(!e||!e.length)&&(e=hi(0,0)),e}seekable(){let e=this.techGet_("seekable");return(!e||!e.length)&&(e=hi(0,0)),e}seeking(){return this.techGet_("seeking")}ended(){return this.techGet_("ended")}networkState(){return this.techGet_("networkState")}readyState(){return this.techGet_("readyState")}bufferedPercent(){return du(this.buffered(),this.duration())}bufferedEnd(){const e=this.buffered(),t=this.duration();let i=e.end(e.length-1);return i>t&&(i=t),i}volume(e){let t;if(e!==void 0){t=Math.max(0,Math.min(1,e)),this.cache_.volume=t,this.techCall_("setVolume",t),t>0&&this.lastVolume_(t);return}return t=parseFloat(this.techGet_("volume")),isNaN(t)?1:t}muted(e){if(e!==void 0){this.techCall_("setMuted",e);return}return this.techGet_("muted")||!1}defaultMuted(e){return e!==void 0&&this.techCall_("setDefaultMuted",e),this.techGet_("defaultMuted")||!1}lastVolume_(e){if(e!==void 0&&e!==0){this.cache_.lastVolume=e;return}return this.cache_.lastVolume}supportsFullScreen(){return this.techGet_("supportsFullScreen")||!1}isFullscreen(e){if(e!==void 0){const t=this.isFullscreen_;this.isFullscreen_=!!e,this.isFullscreen_!==t&&this.fsApi_.prefixed&&this.trigger("fullscreenchange"),this.toggleFullscreenClass_();return}return this.isFullscreen_}requestFullscreen(e){this.isInPictureInPicture()&&this.exitPictureInPicture();const t=this;return new Promise((i,s)=>{function r(){t.off("fullscreenerror",l),t.off("fullscreenchange",a)}function a(){r(),i()}function l(p,g){r(),s(g)}t.one("fullscreenchange",a),t.one("fullscreenerror",l);const d=t.requestFullscreenHelper_(e);d&&(d.then(r,r),d.then(i,s))})}requestFullscreenHelper_(e){let t;if(this.fsApi_.prefixed||(t=this.options_.fullscreen&&this.options_.fullscreen.options||{},e!==void 0&&(t=e)),this.fsApi_.requestFullscreen){const i=this.el_[this.fsApi_.requestFullscreen](t);return i&&i.then(()=>this.isFullscreen(!0),()=>this.isFullscreen(!1)),i}else this.tech_.supportsFullScreen()&&!this.options_.preferFullWindow?this.techCall_("enterFullScreen"):this.enterFullWindow()}exitFullscreen(){const e=this;return new Promise((t,i)=>{function s(){e.off("fullscreenerror",a),e.off("fullscreenchange",r)}function r(){s(),t()}function a(d,p){s(),i(p)}e.one("fullscreenchange",r),e.one("fullscreenerror",a);const l=e.exitFullscreenHelper_();l&&(l.then(s,s),l.then(t,i))})}exitFullscreenHelper_(){if(this.fsApi_.requestFullscreen){const e=k()[this.fsApi_.exitFullscreen]();return e&&Ei(e.then(()=>this.isFullscreen(!1))),e}else this.tech_.supportsFullScreen()&&!this.options_.preferFullWindow?this.techCall_("exitFullScreen"):this.exitFullWindow()}enterFullWindow(){this.isFullscreen(!0),this.isFullWindow=!0,this.docOrigOverflow=k().documentElement.style.overflow,Yt(k(),"keydown",this.boundFullWindowOnEscKey_),k().documentElement.style.overflow="hidden",on(k().body,"vjs-full-window"),this.trigger("enterFullWindow")}fullWindowOnEscKey(e){e.key==="Escape"&&this.isFullscreen()===!0&&(this.isFullWindow?this.exitFullWindow():this.exitFullscreen())}exitFullWindow(){this.isFullscreen(!1),this.isFullWindow=!1,kt(k(),"keydown",this.boundFullWindowOnEscKey_),k().documentElement.style.overflow=this.docOrigOverflow,Ar(k().body,"vjs-full-window"),this.trigger("exitFullWindow")}disablePictureInPicture(e){if(e===void 0)return this.techGet_("disablePictureInPicture");this.techCall_("setDisablePictureInPicture",e),this.options_.disablePictureInPicture=e,this.trigger("disablepictureinpicturechanged")}isInPictureInPicture(e){if(e!==void 0){this.isInPictureInPicture_=!!e,this.togglePictureInPictureClass_();return}return!!this.isInPictureInPicture_}requestPictureInPicture(){if(this.options_.enableDocumentPictureInPicture&&A().documentPictureInPicture){const e=k().createElement(this.el().tagName);return e.classList=this.el().classList,e.classList.add("vjs-pip-container"),this.posterImage&&e.appendChild(this.posterImage.el().cloneNode(!0)),this.titleBar&&e.appendChild(this.titleBar.el().cloneNode(!0)),e.appendChild(Oe("p",{className:"vjs-pip-text"},{},this.localize("Playing in picture-in-picture"))),A().documentPictureInPicture.requestWindow({width:this.videoWidth(),height:this.videoHeight()}).then(t=>(Kl(t),this.el_.parentNode.insertBefore(e,this.el_),t.document.body.appendChild(this.el_),t.document.body.classList.add("vjs-pip-window"),this.player_.isInPictureInPicture(!0),this.player_.trigger({type:"enterpictureinpicture",pipWindow:t}),t.addEventListener("pagehide",i=>{const s=i.target.querySelector(".video-js");e.parentNode.replaceChild(s,e),this.player_.isInPictureInPicture(!1),this.player_.trigger("leavepictureinpicture")}),t))}return"pictureInPictureEnabled"in k()&&this.disablePictureInPicture()===!1?this.techGet_("requestPictureInPicture"):Promise.reject("No PiP mode is available")}exitPictureInPicture(){if(A().documentPictureInPicture&&A().documentPictureInPicture.window)return A().documentPictureInPicture.window.close(),Promise.resolve();if("pictureInPictureEnabled"in k())return k().exitPictureInPicture()}handleKeyDown(e){const{userActions:t}=this.options_;!t||!t.hotkeys||(s=>{const r=s.tagName.toLowerCase();if(s.isContentEditable)return!0;const a=["button","checkbox","hidden","radio","reset","submit"];return r==="input"?a.indexOf(s.type)===-1:["textarea"].indexOf(r)!==-1})(this.el_.ownerDocument.activeElement)||(typeof t.hotkeys=="function"?t.hotkeys.call(this,e):this.handleHotkeys(e))}handleHotkeys(e){const t=this.options_.userActions?this.options_.userActions.hotkeys:{},{fullscreenKey:i=a=>e.key.toLowerCase()==="f",muteKey:s=a=>e.key.toLowerCase()==="m",playPauseKey:r=a=>e.key.toLowerCase()==="k"||e.key.toLowerCase()===" "}=t;if(i.call(this,e)){e.preventDefault(),e.stopPropagation();const a=q.getComponent("FullscreenToggle");k()[this.fsApi_.fullscreenEnabled]!==!1&&a.prototype.handleClick.call(this,e)}else s.call(this,e)?(e.preventDefault(),e.stopPropagation(),q.getComponent("MuteToggle").prototype.handleClick.call(this,e)):r.call(this,e)&&(e.preventDefault(),e.stopPropagation(),q.getComponent("PlayToggle").prototype.handleClick.call(this,e))}canPlayType(e){let t;for(let i=0,s=this.options_.techOrder;i<s.length;i++){const r=s[i];let a=Fe.getTech(r);if(a||(a=q.getComponent(r)),!a){qe.error(`The "${r}" tech is undefined. Skipped browser support check for that tech.`);continue}if(a.isSupported()&&(t=a.canPlayType(e),t))return t}return""}selectSource(e){const t=this.options_.techOrder.map(l=>[l,Fe.getTech(l)]).filter(([l,d])=>d?d.isSupported():(qe.error(`The "${l}" tech is undefined. Skipped browser support check for that tech.`),!1)),i=function(l,d,p){let g;return l.some(y=>d.some(B=>{if(g=p(y,B),g)return!0})),g};let s;const r=l=>(d,p)=>l(p,d),a=([l,d],p)=>{if(d.canPlaySource(p,this.options_[l.toLowerCase()]))return{source:p,tech:l}};return this.options_.sourceOrder?s=i(e,t,r(a)):s=i(t,e,a),s||!1}handleSrc_(e,t){if(typeof e=="undefined")return this.cache_.src||"";this.resetRetryOnError_&&this.resetRetryOnError_();const i=Eu(e);if(!i.length){this.setTimeout(function(){this.error({code:4,message:this.options_.notSupportedMessage})},0);return}if(this.changingSrc_=!0,t||(this.cache_.sources=i),this.updateSourceCaches_(i[0]),ap(this,i[0],(s,r)=>{if(this.middleware_=r,t||(this.cache_.sources=i),this.updateSourceCaches_(s),this.src_(s)){if(i.length>1)return this.handleSrc_(i.slice(1));this.changingSrc_=!1,this.setTimeout(function(){this.error({code:4,message:this.options_.notSupportedMessage})},0),this.triggerReady();return}op(r,this.tech_)}),i.length>1){const s=()=>{this.error(null),this.handleSrc_(i.slice(1),!0)},r=()=>{this.off("error",s)};this.one("error",s),this.one("playing",r),this.resetRetryOnError_=()=>{this.off("error",s),this.off("playing",r)}}}src(e){return this.handleSrc_(e,!1)}src_(e){const t=this.selectSource([e]);return t?au(t.tech,this.techName_)?(this.ready(function(){this.tech_.constructor.prototype.hasOwnProperty("setSource")?this.techCall_("setSource",e):this.techCall_("src",e.src),this.changingSrc_=!1},!0),!1):(this.changingSrc_=!0,this.loadTech_(t.tech,t.source),this.tech_.ready(()=>{this.changingSrc_=!1}),!1):!0}load(){if(this.tech_&&this.tech_.vhs){this.src(this.currentSource());return}this.techCall_("load")}reset(){if(this.paused())this.doReset_();else{const e=this.play();Ei(e.then(()=>this.doReset_()))}}doReset_(){this.tech_&&this.tech_.clearTracks("text"),this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.resetCache_(),this.poster(""),this.loadTech_(this.options_.techOrder[0],null),this.techCall_("reset"),this.resetControlBarUI_(),this.error(null),this.titleBar&&this.titleBar.update({title:void 0,description:void 0}),Ni(this)&&this.trigger("playerreset")}resetControlBarUI_(){this.resetProgressBar_(),this.resetPlaybackRate_(),this.resetVolumeBar_()}resetProgressBar_(){this.currentTime(0);const{currentTimeDisplay:e,durationDisplay:t,progressControl:i,remainingTimeDisplay:s}=this.controlBar||{},{seekBar:r}=i||{};e&&e.updateContent(),t&&t.updateContent(),s&&s.updateContent(),r&&(r.update(),r.loadProgressBar&&r.loadProgressBar.update())}resetPlaybackRate_(){this.playbackRate(this.defaultPlaybackRate()),this.handleTechRateChange_()}resetVolumeBar_(){this.volume(1),this.trigger("volumechange")}currentSources(){const e=this.currentSource(),t=[];return Object.keys(e).length!==0&&t.push(e),this.cache_.sources||t}currentSource(){return this.cache_.source||{}}currentSrc(){return this.currentSource()&&this.currentSource().src||""}currentType(){return this.currentSource()&&this.currentSource().type||""}preload(e){if(e!==void 0){this.techCall_("setPreload",e),this.options_.preload=e;return}return this.techGet_("preload")}autoplay(e){if(e===void 0)return this.options_.autoplay||!1;let t;typeof e=="string"&&/(any|play|muted)/.test(e)||e===!0&&this.options_.normalizeAutoplay?(this.options_.autoplay=e,this.manualAutoplay_(typeof e=="string"?e:"play"),t=!1):e?this.options_.autoplay=!0:this.options_.autoplay=!1,t=typeof t=="undefined"?this.options_.autoplay:t,this.tech_&&this.techCall_("setAutoplay",t)}playsinline(e){return e!==void 0&&(this.techCall_("setPlaysinline",e),this.options_.playsinline=e),this.techGet_("playsinline")}loop(e){if(e!==void 0){this.techCall_("setLoop",e),this.options_.loop=e;return}return this.techGet_("loop")}poster(e){if(e===void 0)return this.poster_;e||(e=""),e!==this.poster_&&(this.poster_=e,this.techCall_("setPoster",e),this.isPosterFromTech_=!1,this.trigger("posterchange"))}handleTechPosterChange_(){if((!this.poster_||this.options_.techCanOverridePoster)&&this.tech_&&this.tech_.poster){const e=this.tech_.poster()||"";e!==this.poster_&&(this.poster_=e,this.isPosterFromTech_=!0,this.trigger("posterchange"))}}controls(e){if(e===void 0)return!!this.controls_;e=!!e,this.controls_!==e&&(this.controls_=e,this.usingNativeControls()&&this.techCall_("setControls",e),this.controls_?(this.removeClass("vjs-controls-disabled"),this.addClass("vjs-controls-enabled"),this.trigger("controlsenabled"),this.usingNativeControls()||this.addTechControlsListeners_()):(this.removeClass("vjs-controls-enabled"),this.addClass("vjs-controls-disabled"),this.trigger("controlsdisabled"),this.usingNativeControls()||this.removeTechControlsListeners_()))}usingNativeControls(e){if(e===void 0)return!!this.usingNativeControls_;e=!!e,this.usingNativeControls_!==e&&(this.usingNativeControls_=e,this.usingNativeControls_?(this.addClass("vjs-using-native-controls"),this.trigger("usingnativecontrols")):(this.removeClass("vjs-using-native-controls"),this.trigger("usingcustomcontrols")))}error(e){if(e===void 0)return this.error_||null;if($i("beforeerror").forEach(t=>{const i=t(this,e);if(!(Ai(i)&&!Array.isArray(i)||typeof i=="string"||typeof i=="number"||i===null)){this.log.error("please return a value that MediaError expects in beforeerror hooks");return}e=i}),this.options_.suppressNotSupportedError&&e&&e.code===4){const t=function(){this.error(e)};this.options_.suppressNotSupportedError=!1,this.any(["click","touchstart"],t),this.one("loadstart",function(){this.off(["click","touchstart"],t)});return}if(e===null){this.error_=null,this.removeClass("vjs-error"),this.errorDisplay&&this.errorDisplay.close();return}this.error_=new ht(e),this.addClass("vjs-error"),qe.error(`(CODE:${this.error_.code} ${ht.errorTypes[this.error_.code]})`,this.error_.message,this.error_),this.trigger("error"),$i("error").forEach(t=>t(this,this.error_))}reportUserActivity(e){this.userActivity_=!0}userActive(e){if(e===void 0)return this.userActive_;if(e=!!e,e!==this.userActive_){if(this.userActive_=e,this.userActive_){this.userActivity_=!0,this.removeClass("vjs-user-inactive"),this.addClass("vjs-user-active"),this.trigger("useractive");return}this.tech_&&this.tech_.one("mousemove",function(t){t.stopPropagation(),t.preventDefault()}),this.userActivity_=!1,this.removeClass("vjs-user-active"),this.addClass("vjs-user-inactive"),this.trigger("userinactive")}}listenForUserActivity_(){let e,t,i;const s=nt(this,this.reportUserActivity),r=function(y){(y.screenX!==t||y.screenY!==i)&&(t=y.screenX,i=y.screenY,s())},a=function(){s(),this.clearInterval(e),e=this.setInterval(s,250)},l=function(y){s(),this.clearInterval(e)};this.on("mousedown",a),this.on("mousemove",r),this.on("mouseup",l),this.on("mouseleave",l);const d=this.getChild("controlBar");d&&!Lt&&!yi&&(d.on("mouseenter",function(y){this.player().options_.inactivityTimeout!==0&&(this.player().cache_.inactivityTimeout=this.player().options_.inactivityTimeout),this.player().options_.inactivityTimeout=0}),d.on("mouseleave",function(y){this.player().options_.inactivityTimeout=this.player().cache_.inactivityTimeout})),this.on("keydown",s),this.on("keyup",s);let p;const g=function(){if(!this.userActivity_)return;this.userActivity_=!1,this.userActive(!0),this.clearTimeout(p);const y=this.options_.inactivityTimeout;y<=0||(p=this.setTimeout(function(){this.userActivity_||this.userActive(!1)},y))};this.setInterval(g,250)}playbackRate(e){if(e!==void 0){this.techCall_("setPlaybackRate",e);return}return this.tech_&&this.tech_.featuresPlaybackRate?this.cache_.lastPlaybackRate||this.techGet_("playbackRate"):1}defaultPlaybackRate(e){return e!==void 0?this.techCall_("setDefaultPlaybackRate",e):this.tech_&&this.tech_.featuresPlaybackRate?this.techGet_("defaultPlaybackRate"):1}isAudio(e){if(e!==void 0){this.isAudio_=!!e;return}return!!this.isAudio_}updatePlayerHeightOnAudioOnlyMode_(){const e=this.getChild("ControlBar");!e||this.audioOnlyCache_.controlBarHeight===e.currentHeight()||(this.audioOnlyCache_.controlBarHeight=e.currentHeight(),this.height(this.audioOnlyCache_.controlBarHeight))}enableAudioOnlyUI_(){this.addClass("vjs-audio-only-mode");const e=this.children(),t=this.getChild("ControlBar"),i=t&&t.currentHeight();e.forEach(s=>{s!==t&&s.el_&&!s.hasClass("vjs-hidden")&&(s.hide(),this.audioOnlyCache_.hiddenChildren.push(s))}),this.audioOnlyCache_.playerHeight=this.currentHeight(),this.audioOnlyCache_.controlBarHeight=i,this.on("playerresize",this.boundUpdatePlayerHeightOnAudioOnlyMode_),this.height(i),this.trigger("audioonlymodechange")}disableAudioOnlyUI_(){this.removeClass("vjs-audio-only-mode"),this.off("playerresize",this.boundUpdatePlayerHeightOnAudioOnlyMode_),this.audioOnlyCache_.hiddenChildren.forEach(e=>e.show()),this.height(this.audioOnlyCache_.playerHeight),this.trigger("audioonlymodechange")}audioOnlyMode(e){if(typeof e!="boolean"||e===this.audioOnlyMode_)return this.audioOnlyMode_;if(this.audioOnlyMode_=e,e){const t=[];return this.isInPictureInPicture()&&t.push(this.exitPictureInPicture()),this.isFullscreen()&&t.push(this.exitFullscreen()),this.audioPosterMode()&&t.push(this.audioPosterMode(!1)),Promise.all(t).then(()=>this.enableAudioOnlyUI_())}return Promise.resolve().then(()=>this.disableAudioOnlyUI_())}enablePosterModeUI_(){(this.tech_&&this.tech_).hide(),this.addClass("vjs-audio-poster-mode"),this.trigger("audiopostermodechange")}disablePosterModeUI_(){(this.tech_&&this.tech_).show(),this.removeClass("vjs-audio-poster-mode"),this.trigger("audiopostermodechange")}audioPosterMode(e){return typeof e!="boolean"||e===this.audioPosterMode_?this.audioPosterMode_:(this.audioPosterMode_=e,e?this.audioOnlyMode()?this.audioOnlyMode(!1).then(()=>{this.enablePosterModeUI_()}):Promise.resolve().then(()=>{this.enablePosterModeUI_()}):Promise.resolve().then(()=>{this.disablePosterModeUI_()}))}addTextTrack(e,t,i){if(this.tech_)return this.tech_.addTextTrack(e,t,i)}addRemoteTextTrack(e,t){if(this.tech_)return this.tech_.addRemoteTextTrack(e,t)}removeRemoteTextTrack(e={}){let{track:t}=e;if(t||(t=e),this.tech_)return this.tech_.removeRemoteTextTrack(t)}getVideoPlaybackQuality(){return this.techGet_("getVideoPlaybackQuality")}videoWidth(){return this.tech_&&this.tech_.videoWidth&&this.tech_.videoWidth()||0}videoHeight(){return this.tech_&&this.tech_.videoHeight&&this.tech_.videoHeight()||0}language(e){if(e===void 0)return this.language_;this.language_!==String(e).toLowerCase()&&(this.language_=String(e).toLowerCase(),Ni(this)&&this.trigger("languagechange"))}languages(){return Ze(at.prototype.options_.languages,this.languages_)}toJSON(){const e=Ze(this.options_),t=e.tracks;e.tracks=[];for(let i=0;i<t.length;i++){let s=t[i];s=Ze(s),s.player=void 0,e.tracks[i]=s}return e}createModal(e,t){t=t||{},t.content=e||"";const i=new Vn(this,t);return this.addChild(i),i.on("dispose",()=>{this.removeChild(i)}),i.open(),i}updateCurrentBreakpoint_(){if(!this.responsive())return;const e=this.currentBreakpoint(),t=this.currentWidth();for(let i=0;i<jo.length;i++){const s=jo[i],r=this.breakpoints_[s];if(t<=r){if(e===s)return;e&&this.removeClass(Lr[e]),this.addClass(Lr[s]),this.breakpoint_=s;break}}}removeCurrentBreakpoint_(){const e=this.currentBreakpointClass();this.breakpoint_="",e&&this.removeClass(e)}breakpoints(e){return e===void 0?Object.assign(this.breakpoints_):(this.breakpoint_="",this.breakpoints_=Object.assign({},Yp,e),this.updateCurrentBreakpoint_(),Object.assign(this.breakpoints_))}responsive(e){if(e===void 0)return this.responsive_;e=!!e;const t=this.responsive_;if(e!==t)return this.responsive_=e,e?(this.on("playerresize",this.boundUpdateCurrentBreakpoint_),this.updateCurrentBreakpoint_()):(this.off("playerresize",this.boundUpdateCurrentBreakpoint_),this.removeCurrentBreakpoint_()),e}currentBreakpoint(){return this.breakpoint_}currentBreakpointClass(){return Lr[this.breakpoint_]||""}loadMedia(e,t){if(!e||typeof e!="object")return;const i=this.crossOrigin();this.reset(),this.cache_.media=Ze(e);const{artist:s,artwork:r,description:a,poster:l,src:d,textTracks:p,title:g}=this.cache_.media;!r&&l&&(this.cache_.media.artwork=[{src:l,type:kr(l)}]),i&&this.crossOrigin(i),d&&this.src(d),l&&this.poster(l),Array.isArray(p)&&p.forEach(y=>this.addRemoteTextTrack(y,!1)),this.titleBar&&this.titleBar.update({title:g,description:a||s||""}),this.ready(t)}getMedia(){if(!this.cache_.media){const e=this.poster(),t=this.currentSources(),i=Array.prototype.map.call(this.remoteTextTracks(),r=>({kind:r.kind,label:r.label,language:r.language,src:r.src})),s={src:t,textTracks:i};return e&&(s.poster=e,s.artwork=[{src:s.poster,type:kr(s.poster)}]),s}return Ze(this.cache_.media)}static getTagSettings(e){const t={sources:[],tracks:[]},i=Xi(e),s=i["data-setup"];if(Cs(e,"vjs-fill")&&(i.fill=!0),Cs(e,"vjs-fluid")&&(i.fluid=!0),s!==null)try{Object.assign(i,JSON.parse(s||"{}"))}catch(r){qe.error("data-setup",r)}if(Object.assign(t,i),e.hasChildNodes()){const r=e.childNodes;for(let a=0,l=r.length;a<l;a++){const d=r[a],p=d.nodeName.toLowerCase();p==="source"?t.sources.push(Xi(d)):p==="track"&&t.tracks.push(Xi(d))}}return t}debug(e){if(e===void 0)return this.debugEnabled_;e?(this.trigger("debugon"),this.previousLogLevel_=this.log.level,this.log.level("debug"),this.debugEnabled_=!0):(this.trigger("debugoff"),this.log.level(this.previousLogLevel_),this.previousLogLevel_=void 0,this.debugEnabled_=!1)}playbackRates(e){if(e===void 0)return this.cache_.playbackRates;Array.isArray(e)&&e.every(t=>typeof t=="number")&&(this.cache_.playbackRates=e,this.trigger("playbackrateschange"))}}Nt.names.forEach(function(n){const e=Nt[n];at.prototype[e.getterName]=function(){return this.tech_?this.tech_[e.getterName]():(this[e.privateName]=this[e.privateName]||new e.ListClass,this[e.privateName])}}),at.prototype.crossorigin=at.prototype.crossOrigin,at.players={};const Os=A().navigator;at.prototype.options_={techOrder:Fe.defaultTechOrder_,html5:{},enableSourceset:!0,inactivityTimeout:2e3,playbackRates:[],liveui:!1,children:["mediaLoader","posterImage","titleBar","textTrackDisplay","loadingSpinner","bigPlayButton","liveTracker","controlBar","errorDisplay","textTrackSettings","resizeManager"],language:Os&&(Os.languages&&Os.languages[0]||Os.userLanguage||Os.language)||"en",languages:{},notSupportedMessage:"No compatible source was found for this media.",normalizeAutoplay:!1,fullscreen:{options:{navigationUI:"hide"}},breakpoints:{},responsive:!1,audioOnlyMode:!1,audioPosterMode:!1,spatialNavigation:{enabled:!1,horizontalSeek:!1},enableSmoothSeeking:!1},pc.forEach(function(n){at.prototype[`handleTech${gt(n)}_`]=function(){return this.trigger(n)}}),q.registerComponent("Player",at);const Rr="plugin",Gn="activePlugins_",Yn={},Nr=n=>Yn.hasOwnProperty(n),Mr=n=>Nr(n)?Yn[n]:void 0,mc=(n,e)=>{n[Gn]=n[Gn]||{},n[Gn][e]=!0},Fr=(n,e,t)=>{const i=(t?"before":"")+"pluginsetup";n.trigger(i,e),n.trigger(i+":"+e.name,e)},Xp=function(n,e){const t=function(){Fr(this,{name:n,plugin:e,instance:null},!0);const i=e.apply(this,arguments);return mc(this,n),Fr(this,{name:n,plugin:e,instance:i}),i};return Object.keys(e).forEach(function(i){t[i]=e[i]}),t},gc=(n,e)=>(e.prototype.name=n,function(...t){Fr(this,{name:n,plugin:e,instance:null},!0);const i=new e(this,...t);return this[n]=()=>i,Fr(this,i.getEventHash()),i});class Vt{constructor(e){if(this.constructor===Vt)throw new Error("Plugin must be sub-classed; not directly instantiated.");this.player=e,this.log||(this.log=this.player.log.createLogger(this.name)),$a(this),delete this.trigger,ru(this,this.constructor.defaultState),mc(e,this.name),this.dispose=this.dispose.bind(this),e.on("dispose",this.dispose)}version(){return this.constructor.VERSION}getEventHash(e={}){return e.name=this.name,e.plugin=this.constructor,e.instance=this,e}trigger(e,t={}){return Un(this.eventBusEl_,e,this.getEventHash(t))}handleStateChanged(e){}dispose(){const{name:e,player:t}=this;this.trigger("dispose"),this.off(),t.off("dispose",this.dispose),t[Gn][e]=!1,this.player=this.state=null,t[e]=gc(e,Yn[e])}static isBasic(e){const t=typeof e=="string"?Mr(e):e;return typeof t=="function"&&!Vt.prototype.isPrototypeOf(t.prototype)}static registerPlugin(e,t){if(typeof e!="string")throw new Error(`Illegal plugin name, "${e}", must be a string, was ${typeof e}.`);if(Nr(e))qe.warn(`A plugin named "${e}" already exists. You may want to avoid re-registering plugins!`);else if(at.prototype.hasOwnProperty(e))throw new Error(`Illegal plugin name, "${e}", cannot share a name with an existing player method!`);if(typeof t!="function")throw new Error(`Illegal plugin for "${e}", must be a function, was ${typeof t}.`);return Yn[e]=t,e!==Rr&&(Vt.isBasic(t)?at.prototype[e]=Xp(e,t):at.prototype[e]=gc(e,t)),t}static deregisterPlugin(e){if(e===Rr)throw new Error("Cannot de-register base plugin.");Nr(e)&&(delete Yn[e],delete at.prototype[e])}static getPlugins(e=Object.keys(Yn)){let t;return e.forEach(i=>{const s=Mr(i);s&&(t=t||{},t[i]=s)}),t}static getPluginVersion(e){const t=Mr(e);return t&&t.VERSION||""}}Vt.getPlugin=Mr,Vt.BASE_PLUGIN_NAME=Rr,Vt.registerPlugin(Rr,Vt),at.prototype.usingPlugin=function(n){return!!this[Gn]&&this[Gn][n]===!0},at.prototype.hasPlugin=function(n){return!!Nr(n)};function Kp(n,e){let t=!1;return function(...i){return t||qe.warn(n),t=!0,e.apply(this,i)}}function fi(n,e,t,i){return Kp(`${e} is deprecated and will be removed in ${n}.0; please use ${t} instead.`,i)}var Qp={NetworkBadStatus:"networkbadstatus",NetworkRequestFailed:"networkrequestfailed",NetworkRequestAborted:"networkrequestaborted",NetworkRequestTimeout:"networkrequesttimeout",NetworkBodyParserFailed:"networkbodyparserfailed",StreamingHlsPlaylistParserError:"streaminghlsplaylistparsererror",StreamingDashManifestParserError:"streamingdashmanifestparsererror",StreamingContentSteeringParserError:"streamingcontentsteeringparsererror",StreamingVttParserError:"streamingvttparsererror",StreamingFailedToSelectNextSegment:"streamingfailedtoselectnextsegment",StreamingFailedToDecryptSegment:"streamingfailedtodecryptsegment",StreamingFailedToTransmuxSegment:"streamingfailedtotransmuxsegment",StreamingFailedToAppendSegment:"streamingfailedtoappendsegment",StreamingCodecsChangeError:"streamingcodecschangeerror"};const vc=n=>n.indexOf("#")===0?n.slice(1):n;function R(n,e,t){let i=R.getPlayer(n);if(i)return e&&qe.warn(`Player "${n}" is already initialised. Options will not be applied.`),t&&i.ready(t),i;const s=typeof n=="string"?Ki("#"+vc(n)):n;if(!Rn(s))throw new TypeError("The element or ID supplied is not valid. (videojs)");const a=("getRootNode"in s?s.getRootNode()instanceof A().ShadowRoot:!1)?s.getRootNode():s.ownerDocument.body;(!s.ownerDocument.defaultView||!a.contains(s))&&qe.warn("The element supplied is not included in the DOM"),e=e||{},e.restoreEl===!0&&(e.restoreEl=(s.parentNode&&s.parentNode.hasAttribute&&s.parentNode.hasAttribute("data-vjs-player")?s.parentNode:s).cloneNode(!0)),$i("beforesetup").forEach(d=>{const p=d(s,Ze(e));if(!Ai(p)||Array.isArray(p)){qe.error("please return an object in beforesetup hooks");return}e=Ze(e,p)});const l=q.getComponent("Player");return i=new l(s,e,t),$i("setup").forEach(d=>d(i)),i}if(R.hooks_=Ri,R.hooks=$i,R.hook=If,R.hookOnce=Pf,R.removeHook=jl,A().VIDEOJS_NO_DYNAMIC_STYLE!==!0&&Ln()){let n=Ki(".vjs-styles-defaults");if(!n){n=Zl("vjs-styles-defaults");const e=Ki("head");e&&e.insertBefore(n,e.firstChild),eu(n,`
      .video-js {
        width: 300px;
        height: 150px;
      }

      .vjs-fluid:not(.vjs-audio-only-mode) {
        padding-top: 56.25%
      }
    `)}}Ua(1,R),R.VERSION=Pa,R.options=at.prototype.options_,R.getPlayers=()=>at.players,R.getPlayer=n=>{const e=at.players;let t;if(typeof n=="string"){const i=vc(n),s=e[i];if(s)return s;t=Ki("#"+i)}else t=n;if(Rn(t)){const{player:i,playerId:s}=t;if(i||e[s])return i||e[s]}},R.getAllPlayers=()=>Object.keys(at.players).map(n=>at.players[n]).filter(Boolean),R.players=at.players,R.getComponent=q.getComponent,R.registerComponent=(n,e)=>(Fe.isTech(e)&&qe.warn(`The ${n} tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)`),q.registerComponent.call(q,n,e)),R.getTech=Fe.getTech,R.registerTech=Fe.registerTech,R.use=rp,Object.defineProperty(R,"middleware",{value:{},writeable:!1,enumerable:!0}),Object.defineProperty(R.middleware,"TERMINATOR",{value:Dr,writeable:!1,enumerable:!0}),R.browser=Nl,R.obj=Rf,R.mergeOptions=fi(9,"videojs.mergeOptions","videojs.obj.merge",Ze),R.defineLazyProperty=fi(9,"videojs.defineLazyProperty","videojs.obj.defineLazyProperty",lr),R.bind=fi(9,"videojs.bind","native Function.prototype.bind",nt),R.registerPlugin=Vt.registerPlugin,R.deregisterPlugin=Vt.deregisterPlugin,R.plugin=(n,e)=>(qe.warn("videojs.plugin() is deprecated; use videojs.registerPlugin() instead"),Vt.registerPlugin(n,e)),R.getPlugins=Vt.getPlugins,R.getPlugin=Vt.getPlugin,R.getPluginVersion=Vt.getPluginVersion,R.addLanguage=function(n,e){return n=(""+n).toLowerCase(),R.options.languages=Ze(R.options.languages,{[n]:e}),R.options.languages[n]},R.log=qe,R.createLogger=wl,R.time=Kf,R.createTimeRange=fi(9,"videojs.createTimeRange","videojs.time.createTimeRanges",hi),R.createTimeRanges=fi(9,"videojs.createTimeRanges","videojs.time.createTimeRanges",hi),R.formatTime=fi(9,"videojs.formatTime","videojs.time.formatTime",un),R.setFormatTime=fi(9,"videojs.setFormatTime","videojs.time.setFormatTime",uu),R.resetFormatTime=fi(9,"videojs.resetFormatTime","videojs.time.resetFormatTime",cu),R.parseUrl=fi(9,"videojs.parseUrl","videojs.url.parseUrl",eo),R.isCrossOrigin=fi(9,"videojs.isCrossOrigin","videojs.url.isCrossOrigin",Br),R.EventTarget=Xt,R.any=Ha,R.on=Yt,R.one=Cr,R.off=kt,R.trigger=Un,R.xhr=Z(),R.TextTrack=Ds,R.AudioTrack=Au,R.VideoTrack=yu,["isEl","isTextNode","createEl","hasClass","addClass","removeClass","toggleClass","setAttributes","getAttributes","emptyEl","appendContent","insertContent"].forEach(n=>{R[n]=function(){return qe.warn(`videojs.${n}() is deprecated; use videojs.dom.${n}() instead`),Ql[n].apply(null,arguments)}}),R.computedStyle=fi(9,"videojs.computedStyle","videojs.dom.computedStyle",Fn),R.dom=Ql,R.fn=qf,R.num=Sp,R.str=Yf,R.url=np,R.Error=Qp;/*! @name videojs-contrib-quality-levels @version 4.1.0 @license Apache-2.0 */class Jp{constructor(e){let t=this;return t.id=e.id,t.label=t.id,t.width=e.width,t.height=e.height,t.bitrate=e.bandwidth,t.frameRate=e.frameRate,t.enabled_=e.enabled,Object.defineProperty(t,"enabled",{get(){return t.enabled_()},set(i){t.enabled_(i)}}),t}}class Ur extends R.EventTarget{constructor(){super();let e=this;return e.levels_=[],e.selectedIndex_=-1,Object.defineProperty(e,"selectedIndex",{get(){return e.selectedIndex_}}),Object.defineProperty(e,"length",{get(){return e.levels_.length}}),e[Symbol.iterator]=()=>e.levels_.values(),e}addQualityLevel(e){let t=this.getQualityLevelById(e.id);if(t)return t;const i=this.levels_.length;return t=new Jp(e),""+i in this||Object.defineProperty(this,i,{get(){return this.levels_[i]}}),this.levels_.push(t),this.trigger({qualityLevel:t,type:"addqualitylevel"}),t}removeQualityLevel(e){let t=null;for(let i=0,s=this.length;i<s;i++)if(this[i]===e){t=this.levels_.splice(i,1)[0],this.selectedIndex_===i?this.selectedIndex_=-1:this.selectedIndex_>i&&this.selectedIndex_--;break}return t&&this.trigger({qualityLevel:e,type:"removequalitylevel"}),t}getQualityLevelById(e){for(let t=0,i=this.length;t<i;t++){const s=this[t];if(s.id===e)return s}return null}dispose(){this.selectedIndex_=-1,this.levels_.length=0}}Ur.prototype.allowedEvents_={change:"change",addqualitylevel:"addqualitylevel",removequalitylevel:"removequalitylevel"};for(const n in Ur.prototype.allowedEvents_)Ur.prototype["on"+n]=null;var Ac="4.1.0";const Zp=function(n,e){const t=n.qualityLevels,i=new Ur,s=function(){i.dispose(),n.qualityLevels=t,n.off("dispose",s)};return n.on("dispose",s),n.qualityLevels=()=>i,n.qualityLevels.VERSION=Ac,i},yc=function(n){return Zp(this,R.obj.merge({},n))};R.registerPlugin("qualityLevels",yc),yc.VERSION=Ac;/*! @name @videojs/http-streaming @version 3.14.2 @license Apache-2.0 */const zt=Pe,Vr=(n,e)=>e&&e.responseURL&&n!==e.responseURL?e.responseURL:n,ri=n=>R.log.debug?R.log.debug.bind(R,"VHS:",`${n} >`):function(){};function Ye(...n){const e=R.obj||R;return(e.merge||e.mergeOptions).apply(e,n)}function wt(...n){const e=R.time||R;return(e.createTimeRanges||e.createTimeRanges).apply(e,n)}function em(n){if(n.length===0)return"Buffered Ranges are empty";let e=`Buffered Ranges: 
`;for(let t=0;t<n.length;t++){const i=n.start(t),s=n.end(t);e+=`${i} --> ${s}. Duration (${s-i})
`}return e}const Ci=1/30,xi=Ci*3,_c=function(n,e){const t=[];let i;if(n&&n.length)for(i=0;i<n.length;i++)e(n.start(i),n.end(i))&&t.push([n.start(i),n.end(i)]);return wt(t)},Xn=function(n,e){return _c(n,function(t,i){return t-xi<=e&&i+xi>=e})},zr=function(n,e){return _c(n,function(t){return t-Ci>=e})},tm=function(n){if(n.length<2)return wt();const e=[];for(let t=1;t<n.length;t++){const i=n.end(t-1),s=n.start(t);e.push([i,s])}return wt(e)},im=function(n,e){let t=null,i=null,s=0;const r=[],a=[];if(!n||!n.length||!e||!e.length)return wt();let l=n.length;for(;l--;)r.push({time:n.start(l),type:"start"}),r.push({time:n.end(l),type:"end"});for(l=e.length;l--;)r.push({time:e.start(l),type:"start"}),r.push({time:e.end(l),type:"end"});for(r.sort(function(d,p){return d.time-p.time}),l=0;l<r.length;l++)r[l].type==="start"?(s++,s===2&&(t=r[l].time)):r[l].type==="end"&&(s--,s===1&&(i=r[l].time)),t!==null&&i!==null&&(a.push([t,i]),t=null,i=null);return wt(a)},bc=n=>{const e=[];if(!n||!n.length)return"";for(let t=0;t<n.length;t++)e.push(n.start(t)+" => "+n.end(t));return e.join(", ")},nm=function(n,e,t=1){return((n.length?n.end(n.length-1):0)-e)/t},fn=n=>{const e=[];for(let t=0;t<n.length;t++)e.push({start:n.start(t),end:n.end(t)});return e},sm=function(n,e){if(n===e)return!1;if(!n&&e||!e&&n||n.length!==e.length)return!0;for(let t=0;t<n.length;t++)if(n.start(t)!==e.start(t)||n.end(t)!==e.end(t))return!0;return!1},Bo=function(n){if(!(!n||!n.length||!n.end))return n.end(n.length-1)},wo=function(n,e){let t=0;if(!n||!n.length)return t;for(let i=0;i<n.length;i++){const s=n.start(i),r=n.end(i);if(!(e>r)){if(e>s&&e<=r){t+=r-e;continue}t+=r-s}}return t},Do=(n,e)=>{if(!e.preload)return e.duration;let t=0;return(e.parts||[]).forEach(function(i){t+=i.duration}),(e.preloadHints||[]).forEach(function(i){i.type==="PART"&&(t+=n.partTargetDuration)}),t},ko=n=>(n.segments||[]).reduce((e,t,i)=>(t.parts?t.parts.forEach(function(s,r){e.push({duration:s.duration,segmentIndex:i,partIndex:r,part:s,segment:t})}):e.push({duration:t.duration,segmentIndex:i,partIndex:null,segment:t,part:null}),e),[]),Ec=n=>{const e=n.segments&&n.segments.length&&n.segments[n.segments.length-1];return e&&e.parts||[]},Tc=({preloadSegment:n})=>{if(!n)return;const{parts:e,preloadHints:t}=n;let i=(t||[]).reduce((s,r)=>s+(r.type==="PART"?1:0),0);return i+=e&&e.length?e.length:0,i},Cc=(n,e)=>{if(e.endList)return 0;if(n&&n.suggestedPresentationDelay)return n.suggestedPresentationDelay;const t=Ec(e).length>0;return t&&e.serverControl&&e.serverControl.partHoldBack?e.serverControl.partHoldBack:t&&e.partTargetDuration?e.partTargetDuration*3:e.serverControl&&e.serverControl.holdBack?e.serverControl.holdBack:e.targetDuration?e.targetDuration*3:0},rm=function(n,e){let t=0,i=e-n.mediaSequence,s=n.segments[i];if(s){if(typeof s.start!="undefined")return{result:s.start,precise:!0};if(typeof s.end!="undefined")return{result:s.end-s.duration,precise:!0}}for(;i--;){if(s=n.segments[i],typeof s.end!="undefined")return{result:t+s.end,precise:!0};if(t+=Do(n,s),typeof s.start!="undefined")return{result:t+s.start,precise:!0}}return{result:t,precise:!1}},am=function(n,e){let t=0,i,s=e-n.mediaSequence;for(;s<n.segments.length;s++){if(i=n.segments[s],typeof i.start!="undefined")return{result:i.start-t,precise:!0};if(t+=Do(n,i),typeof i.end!="undefined")return{result:i.end-t,precise:!0}}return{result:-1,precise:!1}},xc=function(n,e,t){if(typeof e=="undefined"&&(e=n.mediaSequence+n.segments.length),e<n.mediaSequence)return 0;const i=rm(n,e);if(i.precise)return i.result;const s=am(n,e);return s.precise?s.result:i.result+t},Sc=function(n,e,t){if(!n)return 0;if(typeof t!="number"&&(t=0),typeof e=="undefined"){if(n.totalDuration)return n.totalDuration;if(!n.endList)return A()[1/0]}return xc(n,e,t)},Ls=function({defaultDuration:n,durationList:e,startIndex:t,endIndex:i}){let s=0;if(t>i&&([t,i]=[i,t]),t<0){for(let r=t;r<Math.min(0,i);r++)s+=n;t=0}for(let r=t;r<i;r++)s+=e[r].duration;return s},jc=function(n,e,t,i){if(!n||!n.segments)return null;if(n.endList)return Sc(n);if(e===null)return null;e=e||0;let s=xc(n,n.mediaSequence+n.segments.length,e);return t&&(i=typeof i=="number"?i:Cc(null,n),s-=i),Math.max(0,s)},om=function(n,e,t){const s=e||0;let r=jc(n,e,!0,t);return r===null?wt():(r<s&&(r=s),wt(s,r))},lm=function({playlist:n,currentTime:e,startingSegmentIndex:t,startingPartIndex:i,startTime:s,exactManifestTimings:r}){let a=e-s;const l=ko(n);let d=0;for(let p=0;p<l.length;p++){const g=l[p];if(t===g.segmentIndex&&!(typeof i=="number"&&typeof g.partIndex=="number"&&i!==g.partIndex)){d=p;break}}if(a<0){if(d>0)for(let p=d-1;p>=0;p--){const g=l[p];if(a+=g.duration,r){if(a<0)continue}else if(a+Ci<=0)continue;return{partIndex:g.partIndex,segmentIndex:g.segmentIndex,startTime:s-Ls({defaultDuration:n.targetDuration,durationList:l,startIndex:d,endIndex:p})}}return{partIndex:l[0]&&l[0].partIndex||null,segmentIndex:l[0]&&l[0].segmentIndex||0,startTime:e}}if(d<0){for(let p=d;p<0;p++)if(a-=n.targetDuration,a<0)return{partIndex:l[0]&&l[0].partIndex||null,segmentIndex:l[0]&&l[0].segmentIndex||0,startTime:e};d=0}for(let p=d;p<l.length;p++){const g=l[p];a-=g.duration;const y=g.duration>Ci,B=a===0,D=y&&a+Ci>=0;if(!((B||D)&&p!==l.length-1)){if(r){if(a>0)continue}else if(a-Ci>=0)continue;return{partIndex:g.partIndex,segmentIndex:g.segmentIndex,startTime:s+Ls({defaultDuration:n.targetDuration,durationList:l,startIndex:d,endIndex:p})}}}return{segmentIndex:l[l.length-1].segmentIndex,partIndex:l[l.length-1].partIndex,startTime:e}},Bc=function(n){return n.excludeUntil&&n.excludeUntil>Date.now()},Io=function(n){return n.excludeUntil&&n.excludeUntil===1/0},Hr=function(n){const e=Bc(n);return!n.disabled&&!e},um=function(n){return n.disabled},cm=function(n){for(let e=0;e<n.segments.length;e++)if(n.segments[e].key)return!0;return!1},wc=function(n,e){return e.attributes&&e.attributes[n]},dm=function(n,e,t,i=0){return wc("BANDWIDTH",t)?(n*t.attributes.BANDWIDTH-i*8)/e:NaN},Po=(n,e)=>{if(n.playlists.length===1)return!0;const t=e.attributes.BANDWIDTH||Number.MAX_VALUE;return n.playlists.filter(i=>Hr(i)?(i.attributes.BANDWIDTH||0)<t:!1).length===0},Oo=(n,e)=>!n&&!e||!n&&e||n&&!e?!1:!!(n===e||n.id&&e.id&&n.id===e.id||n.resolvedUri&&e.resolvedUri&&n.resolvedUri===e.resolvedUri||n.uri&&e.uri&&n.uri===e.uri),Dc=function(n,e){const t=n&&n.mediaGroups&&n.mediaGroups.AUDIO||{};let i=!1;for(const s in t){for(const r in t[s])if(i=e(t[s][r]),i)break;if(i)break}return!!i},Rs=n=>{if(!n||!n.playlists||!n.playlists.length)return Dc(n,t=>t.playlists&&t.playlists.length||t.uri);for(let e=0;e<n.playlists.length;e++){const t=n.playlists[e],i=t.attributes&&t.attributes.CODECS;if(!(i&&i.split(",").every(r=>se(r))||Dc(n,r=>Oo(t,r))))return!1}return!0};var Ht={liveEdgeDelay:Cc,duration:Sc,seekable:om,getMediaInfoForTime:lm,isEnabled:Hr,isDisabled:um,isExcluded:Bc,isIncompatible:Io,playlistEnd:jc,isAes:cm,hasAttribute:wc,estimateSegmentRequestTime:dm,isLowestEnabledRendition:Po,isAudioOnly:Rs,playlistMatch:Oo,segmentDurationWithParts:Do};const{log:kc}=R,Kn=(n,e)=>`${n}-${e}`,Ic=(n,e,t)=>`placeholder-uri-${n}-${e}-${t}`,hm=({onwarn:n,oninfo:e,manifestString:t,customTagParsers:i=[],customTagMappers:s=[],llhls:r})=>{const a=new x;n&&a.on("warn",n),e&&a.on("info",e),i.forEach(p=>a.addParser(p)),s.forEach(p=>a.addTagMapper(p)),a.push(t),a.end();const l=a.manifest;if(r||(["preloadSegment","skip","serverControl","renditionReports","partInf","partTargetDuration"].forEach(function(p){l.hasOwnProperty(p)&&delete l[p]}),l.segments&&l.segments.forEach(function(p){["parts","preloadHints"].forEach(function(g){p.hasOwnProperty(g)&&delete p[g]})})),!l.targetDuration){let p=10;l.segments&&l.segments.length&&(p=l.segments.reduce((g,y)=>Math.max(g,y.duration),0)),n&&n({message:`manifest has no targetDuration defaulting to ${p}`}),l.targetDuration=p}const d=Ec(l);if(d.length&&!l.partTargetDuration){const p=d.reduce((g,y)=>Math.max(g,y.duration),0);n&&(n({message:`manifest has no partTargetDuration defaulting to ${p}`}),kc.error("LL-HLS manifest has parts but lacks required #EXT-X-PART-INF:PART-TARGET value. See https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-09#section-4.4.3.7. Playback is not guaranteed.")),l.partTargetDuration=p}return l},Qn=(n,e)=>{n.mediaGroups&&["AUDIO","SUBTITLES"].forEach(t=>{if(n.mediaGroups[t])for(const i in n.mediaGroups[t])for(const s in n.mediaGroups[t][i]){const r=n.mediaGroups[t][i][s];e(r,t,i,s)}})},Pc=({playlist:n,uri:e,id:t})=>{n.id=t,n.playlistErrors_=0,e&&(n.uri=e),n.attributes=n.attributes||{}},fm=n=>{let e=n.playlists.length;for(;e--;){const t=n.playlists[e];Pc({playlist:t,id:Kn(e,t.uri)}),t.resolvedUri=zt(n.uri,t.uri),n.playlists[t.id]=t,n.playlists[t.uri]=t,t.attributes.BANDWIDTH||kc.warn("Invalid playlist STREAM-INF detected. Missing BANDWIDTH attribute.")}},pm=n=>{Qn(n,e=>{e.uri&&(e.resolvedUri=zt(n.uri,e.uri))})},mm=(n,e)=>{const t=Kn(0,e),i={mediaGroups:{AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},uri:A().location.href,resolvedUri:A().location.href,playlists:[{uri:e,id:t,resolvedUri:e,attributes:{}}]};return i.playlists[t]=i.playlists[0],i.playlists[e]=i.playlists[0],i},Oc=(n,e,t=Ic)=>{n.uri=e;for(let s=0;s<n.playlists.length;s++)if(!n.playlists[s].uri){const r=`placeholder-uri-${s}`;n.playlists[s].uri=r}const i=Rs(n);Qn(n,(s,r,a,l)=>{if(!s.playlists||!s.playlists.length){if(i&&r==="AUDIO"&&!s.uri)for(let d=0;d<n.playlists.length;d++){const p=n.playlists[d];if(p.attributes&&p.attributes.AUDIO&&p.attributes.AUDIO===a)return}s.playlists=[(0,ue.A)({},s)]}s.playlists.forEach(function(d,p){const g=t(r,a,l,d),y=Kn(p,g);d.uri?d.resolvedUri=d.resolvedUri||zt(n.uri,d.uri):(d.uri=p===0?g:y,d.resolvedUri=d.uri),d.id=d.id||y,d.attributes=d.attributes||{},n.playlists[d.id]=d,n.playlists[d.uri]=d})}),fm(n),pm(n)};class Lc{constructor(){this.offset_=null,this.pendingDateRanges_=new Map,this.processedDateRanges_=new Map}setOffset(e=[]){if(this.offset_!==null||!e.length)return;const[t]=e;t.programDateTime!==void 0&&(this.offset_=t.programDateTime/1e3)}setPendingDateRanges(e=[]){if(!e.length)return;const[t]=e,i=t.startDate.getTime();this.trimProcessedDateRanges_(i),this.pendingDateRanges_=e.reduce((s,r)=>(s.set(r.id,r),s),new Map)}processDateRange(e){this.pendingDateRanges_.delete(e.id),this.processedDateRanges_.set(e.id,e)}getDateRangesToProcess(){if(this.offset_===null)return[];const e={},t=[];this.pendingDateRanges_.forEach((i,s)=>{if(!this.processedDateRanges_.has(s)&&(i.startTime=i.startDate.getTime()/1e3-this.offset_,i.processDateRange=()=>this.processDateRange(i),t.push(i),!!i.class))if(e[i.class]){const r=e[i.class].push(i);i.classListIndex=r-1}else e[i.class]=[i],i.classListIndex=0});for(const i of t){const s=e[i.class]||[];i.endDate?i.endTime=i.endDate.getTime()/1e3-this.offset_:i.endOnNext&&s[i.classListIndex+1]?i.endTime=s[i.classListIndex+1].startTime:i.duration?i.endTime=i.startTime+i.duration:i.plannedDuration?i.endTime=i.startTime+i.plannedDuration:i.endTime=i.startTime}return t}trimProcessedDateRanges_(e){new Map(this.processedDateRanges_).forEach((i,s)=>{i.startDate.getTime()<e&&this.processedDateRanges_.delete(s)})}}const Rc=22,pn=({requestType:n,request:e,error:t,parseFailure:i})=>{const s=e.status<200||e.status>299,r=e.status>=400&&e.status<=499,a={uri:e.uri,requestType:n},l=s&&!r||i;if(t&&r)a.error=(0,ue.A)({},t),a.errorType=R.Error.NetworkRequestFailed;else if(e.aborted)a.errorType=R.Error.NetworkRequestAborted;else if(e.timedout)a.erroType=R.Error.NetworkRequestTimeout;else if(l){const d=i?R.Error.NetworkBodyParserFailed:R.Error.NetworkBadStatus;a.errorType=d,a.status=e.status,a.headers=e.headers}return a},{EventTarget:gm}=R,vm=(n,e)=>{if(e.endList||!e.serverControl)return n;const t={};if(e.serverControl.canBlockReload){const{preloadSegment:i}=e;let s=e.mediaSequence+e.segments.length;if(i){const r=i.parts||[],a=Tc(e)-1;a>-1&&a!==r.length-1&&(t._HLS_part=a),(a>-1||r.length)&&s--}t._HLS_msn=s}if(e.serverControl&&e.serverControl.canSkipUntil&&(t._HLS_skip=e.serverControl.canSkipDateranges?"v2":"YES"),Object.keys(t).length){const i=new(A()).URL(n);["_HLS_skip","_HLS_msn","_HLS_part"].forEach(function(s){t.hasOwnProperty(s)&&i.searchParams.set(s,t[s])}),n=i.toString()}return n},Am=(n,e)=>{if(!n)return e;const t=Ye(n,e);if(n.preloadHints&&!e.preloadHints&&delete t.preloadHints,n.parts&&!e.parts)delete t.parts;else if(n.parts&&e.parts)for(let i=0;i<e.parts.length;i++)n.parts&&n.parts[i]&&(t.parts[i]=Ye(n.parts[i],e.parts[i]));return!n.skipped&&e.skipped&&(t.skipped=!1),n.preload&&!e.preload&&(t.preload=!1),t},ym=(n,e,t)=>{const i=n.slice(),s=e.slice();t=t||0;const r=[];let a;for(let l=0;l<s.length;l++){const d=i[l+t],p=s[l];d?(a=d.map||a,r.push(Am(d,p))):(a&&!p.map&&(p.map=a),r.push(p))}return r},Nc=(n,e)=>{!n.resolvedUri&&n.uri&&(n.resolvedUri=zt(e,n.uri)),n.key&&!n.key.resolvedUri&&(n.key.resolvedUri=zt(e,n.key.uri)),n.map&&!n.map.resolvedUri&&(n.map.resolvedUri=zt(e,n.map.uri)),n.map&&n.map.key&&!n.map.key.resolvedUri&&(n.map.key.resolvedUri=zt(e,n.map.key.uri)),n.parts&&n.parts.length&&n.parts.forEach(t=>{t.resolvedUri||(t.resolvedUri=zt(e,t.uri))}),n.preloadHints&&n.preloadHints.length&&n.preloadHints.forEach(t=>{t.resolvedUri||(t.resolvedUri=zt(e,t.uri))})},Mc=function(n){const e=n.segments||[],t=n.preloadSegment;if(t&&t.parts&&t.parts.length){if(t.preloadHints){for(let i=0;i<t.preloadHints.length;i++)if(t.preloadHints[i].type==="MAP")return e}t.duration=n.targetDuration,t.preload=!0,e.push(t)}return e},Fc=(n,e)=>n===e||n.segments&&e.segments&&n.segments.length===e.segments.length&&n.endList===e.endList&&n.mediaSequence===e.mediaSequence&&n.preloadSegment===e.preloadSegment,Lo=(n,e,t=Fc)=>{const i=Ye(n,{}),s=i.playlists[e.id];if(!s||t(s,e))return null;e.segments=Mc(e);const r=Ye(s,e);if(r.preloadSegment&&!e.preloadSegment&&delete r.preloadSegment,s.segments){if(e.skip){e.segments=e.segments||[];for(let a=0;a<e.skip.skippedSegments;a++)e.segments.unshift({skipped:!0})}r.segments=ym(s.segments,e.segments,e.mediaSequence-s.mediaSequence)}r.segments.forEach(a=>{Nc(a,r.resolvedUri)});for(let a=0;a<i.playlists.length;a++)i.playlists[a].id===e.id&&(i.playlists[a]=r);return i.playlists[e.id]=r,i.playlists[e.uri]=r,Qn(n,(a,l,d,p)=>{if(a.playlists)for(let g=0;g<a.playlists.length;g++)e.id===a.playlists[g].id&&(a.playlists[g]=r)}),i},Ro=(n,e)=>{const t=n.segments||[],i=t[t.length-1],s=i&&i.parts&&i.parts[i.parts.length-1],r=s&&s.duration||i&&i.duration;return e&&r?r*1e3:(n.partTargetDuration||n.targetDuration||10)*500},Uc=(n,e,t)=>{if(!n)return;const i=[];return n.forEach(s=>{if(!s.attributes)return;const{BANDWIDTH:r,RESOLUTION:a,CODECS:l}=s.attributes;i.push({id:s.id,bandwidth:r,resolution:a,codecs:l})}),{type:e,isLive:t,renditions:i}};class Jn extends gm{constructor(e,t,i={}){if(super(),!e)throw new Error("A non-empty playlist URL or object is required");this.logger_=ri("PlaylistLoader");const{withCredentials:s=!1}=i;this.src=e,this.vhs_=t,this.withCredentials=s,this.addDateRangesToTextTrack_=i.addDateRangesToTextTrack;const r=t.options_;this.customTagParsers=r&&r.customTagParsers||[],this.customTagMappers=r&&r.customTagMappers||[],this.llhls=r&&r.llhls,this.dateRangesStorage_=new Lc,this.state="HAVE_NOTHING",this.handleMediaupdatetimeout_=this.handleMediaupdatetimeout_.bind(this),this.on("mediaupdatetimeout",this.handleMediaupdatetimeout_),this.on("loadedplaylist",this.handleLoadedPlaylist_.bind(this))}handleLoadedPlaylist_(){const e=this.media();if(!e)return;this.dateRangesStorage_.setOffset(e.segments),this.dateRangesStorage_.setPendingDateRanges(e.dateRanges);const t=this.dateRangesStorage_.getDateRangesToProcess();!t.length||!this.addDateRangesToTextTrack_||this.addDateRangesToTextTrack_(t)}handleMediaupdatetimeout_(){if(this.state!=="HAVE_METADATA")return;const e=this.media();let t=zt(this.main.uri,e.uri);this.llhls&&(t=vm(t,e)),this.state="HAVE_CURRENT_METADATA",this.request=this.vhs_.xhr({uri:t,withCredentials:this.withCredentials,requestType:"hls-playlist"},(i,s)=>{if(this.request){if(i)return this.playlistRequestError(this.request,this.media(),"HAVE_METADATA");this.haveMetadata({playlistString:this.request.responseText,url:this.media().uri,id:this.media().id})}})}playlistRequestError(e,t,i){const{uri:s,id:r}=t;this.request=null,i&&(this.state=i),this.error={playlist:this.main.playlists[r],status:e.status,message:`HLS playlist request error at URL: ${s}.`,responseText:e.responseText,code:e.status>=500?4:2,metadata:pn({requestType:e.requestType,request:e,error:e.error})},this.trigger("error")}parseManifest_({url:e,manifestString:t}){try{return hm({onwarn:({message:i})=>this.logger_(`m3u8-parser warn for ${e}: ${i}`),oninfo:({message:i})=>this.logger_(`m3u8-parser info for ${e}: ${i}`),manifestString:t,customTagParsers:this.customTagParsers,customTagMappers:this.customTagMappers,llhls:this.llhls})}catch(i){this.error=i,this.error.metadata={errorType:R.Error.StreamingHlsPlaylistParserError,error:i}}}haveMetadata({playlistString:e,playlistObject:t,url:i,id:s}){this.request=null,this.state="HAVE_METADATA";const r={playlistInfo:{type:"media",uri:i}};this.trigger({type:"playlistparsestart",metadata:r});const a=t||this.parseManifest_({url:i,manifestString:e});a.lastRequest=Date.now(),Pc({playlist:a,uri:i,id:s});const l=Lo(this.main,a);this.targetDuration=a.partTargetDuration||a.targetDuration,this.pendingMedia_=null,l?(this.main=l,this.media_=this.main.playlists[s]):this.trigger("playlistunchanged"),this.updateMediaUpdateTimeout_(Ro(this.media(),!!l)),r.parsedPlaylist=Uc(this.main.playlists,r.playlistInfo.type,!this.media_.endList),this.trigger({type:"playlistparsecomplete",metadata:r}),this.trigger("loadedplaylist")}dispose(){this.trigger("dispose"),this.stopRequest(),A().clearTimeout(this.mediaUpdateTimeout),A().clearTimeout(this.finalRenditionTimeout),this.dateRangesStorage_=new Lc,this.off()}stopRequest(){if(this.request){const e=this.request;this.request=null,e.onreadystatechange=null,e.abort()}}media(e,t){if(!e)return this.media_;if(this.state==="HAVE_NOTHING")throw new Error("Cannot switch media playlist from "+this.state);if(typeof e=="string"){if(!this.main.playlists[e])throw new Error("Unknown playlist URI: "+e);e=this.main.playlists[e]}if(A().clearTimeout(this.finalRenditionTimeout),t){const l=(e.partTargetDuration||e.targetDuration)/2*1e3||5e3;this.finalRenditionTimeout=A().setTimeout(this.media.bind(this,e,!1),l);return}const i=this.state,s=!this.media_||e.id!==this.media_.id,r=this.main.playlists[e.id];if(r&&r.endList||e.endList&&e.segments.length){this.request&&(this.request.onreadystatechange=null,this.request.abort(),this.request=null),this.state="HAVE_METADATA",this.media_=e,s&&(this.trigger("mediachanging"),i==="HAVE_MAIN_MANIFEST"?this.trigger("loadedmetadata"):this.trigger("mediachange"));return}if(this.updateMediaUpdateTimeout_(Ro(e,!0)),!s)return;if(this.state="SWITCHING_MEDIA",this.request){if(e.resolvedUri===this.request.url)return;this.request.onreadystatechange=null,this.request.abort(),this.request=null}this.media_&&this.trigger("mediachanging"),this.pendingMedia_=e;const a={playlistInfo:{type:"media",uri:e.uri}};this.trigger({type:"playlistrequeststart",metadata:a}),this.request=this.vhs_.xhr({uri:e.resolvedUri,withCredentials:this.withCredentials,requestType:"hls-playlist"},(l,d)=>{if(this.request){if(e.lastRequest=Date.now(),e.resolvedUri=Vr(e.resolvedUri,d),l)return this.playlistRequestError(this.request,e,i);this.trigger({type:"playlistrequestcomplete",metadata:a}),this.haveMetadata({playlistString:d.responseText,url:e.uri,id:e.id}),i==="HAVE_MAIN_MANIFEST"?this.trigger("loadedmetadata"):this.trigger("mediachange")}})}pause(){this.mediaUpdateTimeout&&(A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null),this.stopRequest(),this.state==="HAVE_NOTHING"&&(this.started=!1),this.state==="SWITCHING_MEDIA"?this.media_?this.state="HAVE_METADATA":this.state="HAVE_MAIN_MANIFEST":this.state==="HAVE_CURRENT_METADATA"&&(this.state="HAVE_METADATA")}load(e){this.mediaUpdateTimeout&&(A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null);const t=this.media();if(e){const i=t?(t.partTargetDuration||t.targetDuration)/2*1e3:5e3;this.mediaUpdateTimeout=A().setTimeout(()=>{this.mediaUpdateTimeout=null,this.load()},i);return}if(!this.started){this.start();return}t&&!t.endList?this.trigger("mediaupdatetimeout"):this.trigger("loadedplaylist")}updateMediaUpdateTimeout_(e){this.mediaUpdateTimeout&&(A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null),!(!this.media()||this.media().endList)&&(this.mediaUpdateTimeout=A().setTimeout(()=>{this.mediaUpdateTimeout=null,this.trigger("mediaupdatetimeout"),this.updateMediaUpdateTimeout_(e)},e))}start(){if(this.started=!0,typeof this.src=="object"){this.src.uri||(this.src.uri=A().location.href),this.src.resolvedUri=this.src.uri,setTimeout(()=>{this.setupInitialPlaylist(this.src)},0);return}const e={playlistInfo:{type:"multivariant",uri:this.src}};this.trigger({type:"playlistrequeststart",metadata:e}),this.request=this.vhs_.xhr({uri:this.src,withCredentials:this.withCredentials,requestType:"hls-playlist"},(t,i)=>{if(!this.request)return;if(this.request=null,t)return this.error={status:i.status,message:`HLS playlist request error at URL: ${this.src}.`,responseText:i.responseText,code:2,metadata:pn({requestType:i.requestType,request:i,error:t})},this.state==="HAVE_NOTHING"&&(this.started=!1),this.trigger("error");this.trigger({type:"playlistrequestcomplete",metadata:e}),this.src=Vr(this.src,i),this.trigger({type:"playlistparsestart",metadata:e});const s=this.parseManifest_({manifestString:i.responseText,url:this.src});e.parsedPlaylist=Uc(s.playlists,e.playlistInfo.type,!1),this.trigger({type:"playlistparsecomplete",metadata:e}),this.setupInitialPlaylist(s)})}srcUri(){return typeof this.src=="string"?this.src:this.src.uri}setupInitialPlaylist(e){if(this.state="HAVE_MAIN_MANIFEST",e.playlists){this.main=e,Oc(this.main,this.srcUri()),e.playlists.forEach(i=>{i.segments=Mc(i),i.segments.forEach(s=>{Nc(s,i.resolvedUri)})}),this.trigger("loadedplaylist"),this.request||this.media(this.main.playlists[0]);return}const t=this.srcUri()||A().location.href;this.main=mm(e,t),this.haveMetadata({playlistObject:e,url:t,id:this.main.playlists[0].id}),this.trigger("loadedmetadata")}updateOrDeleteClone(e,t){const i=this.main,s=e.ID;let r=i.playlists.length;for(;r--;){const a=i.playlists[r];if(a.attributes["PATHWAY-ID"]===s){const l=a.resolvedUri,d=a.id;if(t){const p=this.createCloneURI_(a.resolvedUri,e),g=Kn(s,p),y=this.createCloneAttributes_(s,a.attributes),B=this.createClonePlaylist_(a,g,e,y);i.playlists[r]=B,i.playlists[g]=B,i.playlists[p]=B}else i.playlists.splice(r,1);delete i.playlists[d],delete i.playlists[l]}}this.updateOrDeleteCloneMedia(e,t)}updateOrDeleteCloneMedia(e,t){const i=this.main,s=e.ID;["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(r=>{if(!(!i.mediaGroups[r]||!i.mediaGroups[r][s])){for(const a in i.mediaGroups[r])if(a===s){for(const l in i.mediaGroups[r][a])i.mediaGroups[r][a][l].playlists.forEach((p,g)=>{const y=i.playlists[p.id],B=y.id,D=y.resolvedUri;delete i.playlists[B],delete i.playlists[D]});delete i.mediaGroups[r][a]}}}),t&&this.createClonedMediaGroups_(e)}addClonePathway(e,t={}){const i=this.main,s=i.playlists.length,r=this.createCloneURI_(t.resolvedUri,e),a=Kn(e.ID,r),l=this.createCloneAttributes_(e.ID,t.attributes),d=this.createClonePlaylist_(t,a,e,l);i.playlists[s]=d,i.playlists[a]=d,i.playlists[r]=d,this.createClonedMediaGroups_(e)}createClonedMediaGroups_(e){const t=e.ID,i=e["BASE-ID"],s=this.main;["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(r=>{if(!(!s.mediaGroups[r]||s.mediaGroups[r][t]))for(const a in s.mediaGroups[r]){if(a===i)s.mediaGroups[r][t]={};else continue;for(const l in s.mediaGroups[r][a]){const d=s.mediaGroups[r][a][l];s.mediaGroups[r][t][l]=(0,ue.A)({},d);const p=s.mediaGroups[r][t][l],g=this.createCloneURI_(d.resolvedUri,e);p.resolvedUri=g,p.uri=g,p.playlists=[],d.playlists.forEach((y,B)=>{const D=s.playlists[y.id],P=Ic(r,t,l),b=Kn(t,P);if(D&&!s.playlists[b]){const U=this.createClonePlaylist_(D,b,e),H=U.resolvedUri;s.playlists[b]=U,s.playlists[H]=U}p.playlists[B]=this.createClonePlaylist_(y,b,e)})}}})}createClonePlaylist_(e,t,i,s){const r=this.createCloneURI_(e.resolvedUri,i),a={resolvedUri:r,uri:r,id:t};return e.segments&&(a.segments=[]),s&&(a.attributes=s),Ye(e,a)}createCloneURI_(e,t){const i=new URL(e);i.hostname=t["URI-REPLACEMENT"].HOST;const s=t["URI-REPLACEMENT"].PARAMS;for(const r of Object.keys(s))i.searchParams.set(r,s[r]);return i.href}createCloneAttributes_(e,t){const i={"PATHWAY-ID":e};return["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(s=>{t[s]&&(i[s]=e)}),i}getKeyIdSet(e){if(e.contentProtection){const t=new Set;for(const i in e.contentProtection){const s=e.contentProtection[i].attributes.keyId;s&&t.add(s.toLowerCase())}return t}}}const No=function(n,e,t,i){const s=n.responseType==="arraybuffer"?n.response:n.responseText;!e&&s&&(n.responseTime=Date.now(),n.roundTripTime=n.responseTime-n.requestTime,n.bytesReceived=s.byteLength||s.length,n.bandwidth||(n.bandwidth=Math.floor(n.bytesReceived/n.roundTripTime*8*1e3))),t.headers&&(n.responseHeaders=t.headers),e&&e.code==="ETIMEDOUT"&&(n.timedout=!0),!e&&!n.aborted&&t.statusCode!==200&&t.statusCode!==206&&t.statusCode!==0&&(e=new Error("XHR Failed with a response of: "+(n&&(s||n.responseText)))),i(e,n)},_m=(n,e)=>{if(!n||!n.size)return;let t=e;return n.forEach(i=>{t=i(t)}),t},bm=(n,e,t,i)=>{!n||!n.size||n.forEach(s=>{s(e,t,i)})},Vc=function(){const n=function e(t,i){t=Ye({timeout:45e3},t);const s=e.beforeRequest||R.Vhs.xhr.beforeRequest,r=e._requestCallbackSet||R.Vhs.xhr._requestCallbackSet||new Set,a=e._responseCallbackSet||R.Vhs.xhr._responseCallbackSet;s&&typeof s=="function"&&(R.log.warn("beforeRequest is deprecated, use onRequest instead."),r.add(s));const l=R.Vhs.xhr.original===!0?R.xhr:R.Vhs.xhr,d=_m(r,t);r.delete(s);const p=l(d||t,function(y,B){return bm(a,p,y,B),No(p,y,B,i)}),g=p.abort;return p.abort=function(){return p.aborted=!0,g.apply(p,arguments)},p.uri=t.uri,p.requestType=t.requestType,p.requestTime=Date.now(),p};return n.original=!0,n},Em=function(n){let e;const t=n.offset;return typeof n.offset=="bigint"||typeof n.length=="bigint"?e=A().BigInt(n.offset)+A().BigInt(n.length)-A().BigInt(1):e=n.offset+n.length-1,"bytes="+t+"-"+e},Mo=function(n){const e={};return n.byterange&&(e.Range=Em(n.byterange)),e},Tm=function(n,e){return n.start(e)+"-"+n.end(e)},Cm=function(n,e){const t=n.toString(16);return"00".substring(0,2-t.length)+t+(e%2?" ":"")},xm=function(n){return n>=32&&n<126?String.fromCharCode(n):"."},zc=function(n){const e={};return Object.keys(n).forEach(t=>{const i=n[t];Et(i)?e[t]={bytes:i.buffer,byteOffset:i.byteOffset,byteLength:i.byteLength}:e[t]=i}),e},qr=function(n){const e=n.byterange||{length:1/0,offset:0};return[e.length,e.offset,n.resolvedUri].join(",")},Hc=function(n){return n.resolvedUri},qc=n=>{const e=Array.prototype.slice.call(n),t=16;let i="",s,r;for(let a=0;a<e.length/t;a++)s=e.slice(a*t,a*t+t).map(Cm).join(""),r=e.slice(a*t,a*t+t).map(xm).join(""),i+=s+" "+r+`
`;return i};var Sm=Object.freeze({__proto__:null,createTransferableMessage:zc,initSegmentId:qr,segmentKeyId:Hc,hexDump:qc,tagDump:({bytes:n})=>qc(n),textRanges:n=>{let e="",t;for(t=0;t<n.length;t++)e+=Tm(n,t)+" ";return e}});const Wc=.25,jm=(n,e)=>{if(!e.dateTimeObject)return null;const t=e.videoTimingInfo.transmuxerPrependedSeconds,s=e.videoTimingInfo.transmuxedPresentationStart+t,r=n-s;return new Date(e.dateTimeObject.getTime()+r*1e3)},Bm=n=>n.transmuxedPresentationEnd-n.transmuxedPresentationStart-n.transmuxerPrependedSeconds,wm=(n,e)=>{let t;try{t=new Date(n)}catch(d){return null}if(!e||!e.segments||e.segments.length===0)return null;let i=e.segments[0];if(t<new Date(i.dateTimeObject))return null;for(let d=0;d<e.segments.length-1;d++){i=e.segments[d];const p=new Date(e.segments[d+1].dateTimeObject);if(t<p)break}const s=e.segments[e.segments.length-1],r=s.dateTimeObject,a=s.videoTimingInfo?Bm(s.videoTimingInfo):s.duration+s.duration*Wc,l=new Date(r.getTime()+a*1e3);return t>l?null:(t>new Date(r)&&(i=s),{segment:i,estimatedStart:i.videoTimingInfo?i.videoTimingInfo.transmuxedPresentationStart:Ht.duration(e,e.mediaSequence+e.segments.indexOf(i)),type:i.videoTimingInfo?"accurate":"estimate"})},Dm=(n,e)=>{if(!e||!e.segments||e.segments.length===0)return null;let t=0,i;for(let r=0;r<e.segments.length&&(i=e.segments[r],t=i.videoTimingInfo?i.videoTimingInfo.transmuxedPresentationEnd:t+i.duration,!(n<=t));r++);const s=e.segments[e.segments.length-1];if(s.videoTimingInfo&&s.videoTimingInfo.transmuxedPresentationEnd<n)return null;if(n>t){if(n>t+s.duration*Wc)return null;i=s}return{segment:i,estimatedStart:i.videoTimingInfo?i.videoTimingInfo.transmuxedPresentationStart:t-i.duration,type:i.videoTimingInfo?"accurate":"estimate"}},km=(n,e)=>{let t,i;try{t=new Date(n),i=new Date(e)}catch(a){}const s=t.getTime();return(i.getTime()-s)/1e3},Im=n=>{if(!n.segments||n.segments.length===0)return!1;for(let e=0;e<n.segments.length;e++)if(!n.segments[e].dateTimeObject)return!1;return!0},Pm=({playlist:n,time:e=void 0,callback:t})=>{if(!t)throw new Error("getProgramTime: callback must be provided");if(!n||e===void 0)return t({message:"getProgramTime: playlist and time must be provided"});const i=Dm(e,n);if(!i)return t({message:"valid programTime was not found"});if(i.type==="estimate")return t({message:"Accurate programTime could not be determined. Please seek to e.seekTime and try again",seekTime:i.estimatedStart});const s={mediaSeconds:e},r=jm(e,i.segment);return r&&(s.programDateTime=r.toISOString()),t(null,s)},$c=({programTime:n,playlist:e,retryCount:t=2,seekTo:i,pauseAfterSeek:s=!0,tech:r,callback:a})=>{if(!a)throw new Error("seekToProgramTime: callback must be provided");if(typeof n=="undefined"||!e||!i)return a({message:"seekToProgramTime: programTime, seekTo and playlist must be provided"});if(!e.endList&&!r.hasStarted_)return a({message:"player must be playing a live stream to start buffering"});if(!Im(e))return a({message:"programDateTime tags must be provided in the manifest "+e.resolvedUri});const l=wm(n,e);if(!l)return a({message:`${n} was not found in the stream`});const d=l.segment,p=km(d.dateTimeObject,n);if(l.type==="estimate"){if(t===0)return a({message:`${n} is not buffered yet. Try again`});i(l.estimatedStart+p),r.one("seeked",()=>{$c({programTime:n,playlist:e,retryCount:t-1,seekTo:i,pauseAfterSeek:s,tech:r,callback:a})});return}const g=d.start+p,y=()=>a(null,r.currentTime());r.one("seeked",y),s&&r.pause(),i(g)},Fo=(n,e)=>{if(n.readyState===4)return e()},Om=(n,e,t,i)=>{let s=[],r,a=!1;const l=function(y,B,D,P){return B.abort(),a=!0,t(y,B,D,P)},d=function(y,B){if(a)return;if(y)return y.metadata=pn({requestType:i,request:B,error:y}),l(y,B,"",s);const D=B.responseText.substring(s&&s.byteLength||0,B.responseText.length);if(s=Ta(s,us(D,!0)),r=r||_s(s),s.length<10||r&&s.length<r+2)return Fo(B,()=>l(y,B,"",s));const P=Ia(s);return P==="ts"&&s.length<188?Fo(B,()=>l(y,B,"",s)):!P&&s.length<376?Fo(B,()=>l(y,B,"",s)):l(null,B,P,s)},g=e({uri:n,beforeSend(y){y.overrideMimeType("text/plain; charset=x-user-defined"),y.addEventListener("progress",function({total:B,loaded:D}){return No(y,null,{statusCode:y.status},d)})}},function(y,B){return No(g,y,B,d)});return g},{EventTarget:Lm}=R,Gc=function(n,e){if(!Fc(n,e)||n.sidx&&e.sidx&&(n.sidx.offset!==e.sidx.offset||n.sidx.length!==e.sidx.length))return!1;if(!n.sidx&&e.sidx||n.sidx&&!e.sidx||n.segments&&!e.segments||!n.segments&&e.segments)return!1;if(!n.segments&&!e.segments)return!0;for(let t=0;t<n.segments.length;t++){const i=n.segments[t],s=e.segments[t];if(i.uri!==s.uri)return!1;if(!i.byterange&&!s.byterange)continue;const r=i.byterange,a=s.byterange;if(r&&!a||!r&&a||r.offset!==a.offset||r.length!==a.length)return!1}return!0},Rm=(n,e,t,i)=>{const s=i.attributes.NAME||t;return`placeholder-uri-${n}-${e}-${s}`},Nm=({mainXml:n,srcUrl:e,clientOffset:t,sidxMapping:i,previousManifest:s})=>{const r=uf(n,{manifestUri:e,clientOffset:t,sidxMapping:i,previousManifest:s});return Oc(r,e,Rm),r},Mm=(n,e)=>{Qn(n,(t,i,s,r)=>{(!e.mediaGroups[i][s]||!(r in e.mediaGroups[i][s]))&&delete n.mediaGroups[i][s][r]})},Fm=(n,e,t)=>{let i=!0,s=Ye(n,{duration:e.duration,minimumUpdatePeriod:e.minimumUpdatePeriod,timelineStarts:e.timelineStarts});for(let r=0;r<e.playlists.length;r++){const a=e.playlists[r];if(a.sidx){const d=Ge(a.sidx);t&&t[d]&&t[d].sidx&&nn(a,t[d].sidx,a.sidx.resolvedUri)}const l=Lo(s,a,Gc);l&&(s=l,i=!1)}return Qn(e,(r,a,l,d)=>{if(r.playlists&&r.playlists.length){const p=r.playlists[0].id,g=Lo(s,r.playlists[0],Gc);g&&(s=g,d in s.mediaGroups[a][l]||(s.mediaGroups[a][l][d]=r),s.mediaGroups[a][l][d].playlists[0]=s.playlists[p],i=!1)}}),Mm(s,e),e.minimumUpdatePeriod!==n.minimumUpdatePeriod&&(i=!1),i?null:s},Um=(n,e)=>(!n.map&&!e.map||!!(n.map&&e.map&&n.map.byterange.offset===e.map.byterange.offset&&n.map.byterange.length===e.map.byterange.length))&&n.uri===e.uri&&n.byterange.offset===e.byterange.offset&&n.byterange.length===e.byterange.length,Yc=(n,e)=>{const t={};for(const i in n){const r=n[i].sidx;if(r){const a=Ge(r);if(!e[a])break;const l=e[a].sidxInfo;Um(l,r)&&(t[a]=e[a])}}return t},Vm=(n,e)=>{let i=Yc(n.playlists,e);return Qn(n,(s,r,a,l)=>{if(s.playlists&&s.playlists.length){const d=s.playlists;i=Ye(i,Yc(d,e))}}),i};class Uo extends Lm{constructor(e,t,i={},s){super(),this.mainPlaylistLoader_=s||this,s||(this.isMain_=!0);const{withCredentials:r=!1}=i;if(this.vhs_=t,this.withCredentials=r,this.addMetadataToTextTrack=i.addMetadataToTextTrack,!e)throw new Error("A non-empty playlist URL or object is required");this.on("minimumUpdatePeriod",()=>{this.refreshXml_()}),this.on("mediaupdatetimeout",()=>{this.refreshMedia_(this.media().id)}),this.state="HAVE_NOTHING",this.loadedPlaylists_={},this.logger_=ri("DashPlaylistLoader"),this.isMain_?(this.mainPlaylistLoader_.srcUrl=e,this.mainPlaylistLoader_.sidxMapping_={}):this.childPlaylist_=e}requestErrored_(e,t,i){if(!this.request)return!0;if(this.request=null,e)return this.error=typeof e=="object"&&!(e instanceof Error)?e:{status:t.status,message:"DASH request error at URL: "+t.uri,response:t.response,code:2,metadata:e.metadata},i&&(this.state=i),this.trigger("error"),!0}addSidxSegments_(e,t,i){const s=e.sidx&&Ge(e.sidx);if(!e.sidx||!s||this.mainPlaylistLoader_.sidxMapping_[s]){this.mediaRequest_=A().setTimeout(()=>i(!1),0);return}const r=Vr(e.sidx.resolvedUri),a=(d,p)=>{if(this.requestErrored_(d,p,t))return;const g=this.mainPlaylistLoader_.sidxMapping_,{requestType:y}=p;let B;try{B=hf()(pe(p.response).subarray(8))}catch(D){D.metadata=pn({requestType:y,request:p,parseFailure:!0}),this.requestErrored_(D,p,t);return}return g[s]={sidxInfo:e.sidx,sidx:B},nn(e,B,e.sidx.resolvedUri),i(!0)},l="dash-sidx";this.request=Om(r,this.vhs_.xhr,(d,p,g,y)=>{if(d)return a(d,p);if(!g||g!=="mp4"){const P=g||"unknown";return a({status:p.status,message:`Unsupported ${P} container type for sidx segment at URL: ${r}`,response:"",playlist:e,internal:!0,playlistExclusionDuration:1/0,code:2},p)}const{offset:B,length:D}=e.sidx.byterange;if(y.length>=D+B)return a(d,{response:y.subarray(B,B+D),status:p.status,uri:p.uri});this.request=this.vhs_.xhr({uri:r,responseType:"arraybuffer",requestType:"dash-sidx",headers:Mo({byterange:e.sidx.byterange})},a)},l)}dispose(){this.trigger("dispose"),this.stopRequest(),this.loadedPlaylists_={},A().clearTimeout(this.minimumUpdatePeriodTimeout_),A().clearTimeout(this.mediaRequest_),A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null,this.mediaRequest_=null,this.minimumUpdatePeriodTimeout_=null,this.mainPlaylistLoader_.createMupOnMedia_&&(this.off("loadedmetadata",this.mainPlaylistLoader_.createMupOnMedia_),this.mainPlaylistLoader_.createMupOnMedia_=null),this.off()}hasPendingRequest(){return this.request||this.mediaRequest_}stopRequest(){if(this.request){const e=this.request;this.request=null,e.onreadystatechange=null,e.abort()}}media(e){if(!e)return this.media_;if(this.state==="HAVE_NOTHING")throw new Error("Cannot switch media playlist from "+this.state);const t=this.state;if(typeof e=="string"){if(!this.mainPlaylistLoader_.main.playlists[e])throw new Error("Unknown playlist URI: "+e);e=this.mainPlaylistLoader_.main.playlists[e]}const i=!this.media_||e.id!==this.media_.id;if(i&&this.loadedPlaylists_[e.id]&&this.loadedPlaylists_[e.id].endList){this.state="HAVE_METADATA",this.media_=e,i&&(this.trigger("mediachanging"),this.trigger("mediachange"));return}i&&(this.media_&&this.trigger("mediachanging"),this.addSidxSegments_(e,t,s=>{this.haveMetadata({startingState:t,playlist:e})}))}haveMetadata({startingState:e,playlist:t}){this.state="HAVE_METADATA",this.loadedPlaylists_[t.id]=t,this.mediaRequest_=null,this.refreshMedia_(t.id),e==="HAVE_MAIN_MANIFEST"?this.trigger("loadedmetadata"):this.trigger("mediachange")}pause(){this.mainPlaylistLoader_.createMupOnMedia_&&(this.off("loadedmetadata",this.mainPlaylistLoader_.createMupOnMedia_),this.mainPlaylistLoader_.createMupOnMedia_=null),this.stopRequest(),A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null,this.isMain_&&(A().clearTimeout(this.mainPlaylistLoader_.minimumUpdatePeriodTimeout_),this.mainPlaylistLoader_.minimumUpdatePeriodTimeout_=null),this.state==="HAVE_NOTHING"&&(this.started=!1)}load(e){A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null;const t=this.media();if(e){const i=t?t.targetDuration/2*1e3:5e3;this.mediaUpdateTimeout=A().setTimeout(()=>this.load(),i);return}if(!this.started){this.start();return}t&&!t.endList?(this.isMain_&&!this.minimumUpdatePeriodTimeout_&&(this.trigger("minimumUpdatePeriod"),this.updateMinimumUpdatePeriodTimeout_()),this.trigger("mediaupdatetimeout")):this.trigger("loadedplaylist")}start(){if(this.started=!0,!this.isMain_){this.mediaRequest_=A().setTimeout(()=>this.haveMain_(),0);return}this.requestMain_((e,t)=>{this.haveMain_(),!this.hasPendingRequest()&&!this.media_&&this.media(this.mainPlaylistLoader_.main.playlists[0])})}requestMain_(e){const t={manifestInfo:{uri:this.mainPlaylistLoader_.srcUrl}};this.trigger({type:"manifestrequeststart",metadata:t}),this.request=this.vhs_.xhr({uri:this.mainPlaylistLoader_.srcUrl,withCredentials:this.withCredentials,requestType:"dash-manifest"},(i,s)=>{if(i){const{requestType:a}=s;i.metadata=pn({requestType:a,request:s,error:i})}if(this.requestErrored_(i,s)){this.state==="HAVE_NOTHING"&&(this.started=!1);return}this.trigger({type:"manifestrequestcomplete",metadata:t});const r=s.responseText!==this.mainPlaylistLoader_.mainXml_;if(this.mainPlaylistLoader_.mainXml_=s.responseText,s.responseHeaders&&s.responseHeaders.date?this.mainLoaded_=Date.parse(s.responseHeaders.date):this.mainLoaded_=Date.now(),this.mainPlaylistLoader_.srcUrl=Vr(this.mainPlaylistLoader_.srcUrl,s),r){this.handleMain_(),this.syncClientServerClock_(()=>e(s,r));return}return e(s,r)})}syncClientServerClock_(e){const t=cf(this.mainPlaylistLoader_.mainXml_);if(t===null)return this.mainPlaylistLoader_.clientOffset_=this.mainLoaded_-Date.now(),e();if(t.method==="DIRECT")return this.mainPlaylistLoader_.clientOffset_=t.value-Date.now(),e();this.request=this.vhs_.xhr({uri:zt(this.mainPlaylistLoader_.srcUrl,t.value),method:t.method,withCredentials:this.withCredentials,requestType:"dash-clock-sync"},(i,s)=>{if(!this.request)return;if(i){const{requestType:a}=s;return this.error.metadata=pn({requestType:a,request:s,error:i}),this.mainPlaylistLoader_.clientOffset_=this.mainLoaded_-Date.now(),e()}let r;t.method==="HEAD"?!s.responseHeaders||!s.responseHeaders.date?r=this.mainLoaded_:r=Date.parse(s.responseHeaders.date):r=Date.parse(s.responseText),this.mainPlaylistLoader_.clientOffset_=r-Date.now(),e()})}haveMain_(){this.state="HAVE_MAIN_MANIFEST",this.isMain_?this.trigger("loadedplaylist"):this.media_||this.media(this.childPlaylist_)}handleMain_(){this.mediaRequest_=null;const e=this.mainPlaylistLoader_.main,t={manifestInfo:{uri:this.mainPlaylistLoader_.srcUrl}};this.trigger({type:"manifestparsestart",metadata:t});let i;try{i=Nm({mainXml:this.mainPlaylistLoader_.mainXml_,srcUrl:this.mainPlaylistLoader_.srcUrl,clientOffset:this.mainPlaylistLoader_.clientOffset_,sidxMapping:this.mainPlaylistLoader_.sidxMapping_,previousManifest:e})}catch(r){this.error=r,this.error.metadata={errorType:R.Error.StreamingDashManifestParserError,error:r},this.trigger("error")}e&&(i=Fm(e,i,this.mainPlaylistLoader_.sidxMapping_)),this.mainPlaylistLoader_.main=i||e;const s=this.mainPlaylistLoader_.main.locations&&this.mainPlaylistLoader_.main.locations[0];if(s&&s!==this.mainPlaylistLoader_.srcUrl&&(this.mainPlaylistLoader_.srcUrl=s),(!e||i&&i.minimumUpdatePeriod!==e.minimumUpdatePeriod)&&this.updateMinimumUpdatePeriodTimeout_(),this.addEventStreamToMetadataTrack_(i),i){const{duration:r,endList:a}=i,l=[];i.playlists.forEach(p=>{l.push({id:p.id,bandwidth:p.attributes.BANDWIDTH,resolution:p.attributes.RESOLUTION,codecs:p.attributes.CODECS})});const d={duration:r,isLive:!a,renditions:l};t.parsedManifest=d,this.trigger({type:"manifestparsecomplete",metadata:t})}return!!i}updateMinimumUpdatePeriodTimeout_(){const e=this.mainPlaylistLoader_;e.createMupOnMedia_&&(e.off("loadedmetadata",e.createMupOnMedia_),e.createMupOnMedia_=null),e.minimumUpdatePeriodTimeout_&&(A().clearTimeout(e.minimumUpdatePeriodTimeout_),e.minimumUpdatePeriodTimeout_=null);let t=e.main&&e.main.minimumUpdatePeriod;if(t===0&&(e.media()?t=e.media().targetDuration*1e3:(e.createMupOnMedia_=e.updateMinimumUpdatePeriodTimeout_,e.one("loadedmetadata",e.createMupOnMedia_))),typeof t!="number"||t<=0){t<0&&this.logger_(`found invalid minimumUpdatePeriod of ${t}, not setting a timeout`);return}this.createMUPTimeout_(t)}createMUPTimeout_(e){const t=this.mainPlaylistLoader_;t.minimumUpdatePeriodTimeout_=A().setTimeout(()=>{t.minimumUpdatePeriodTimeout_=null,t.trigger("minimumUpdatePeriod"),t.createMUPTimeout_(e)},e)}refreshXml_(){this.requestMain_((e,t)=>{t&&(this.media_&&(this.media_=this.mainPlaylistLoader_.main.playlists[this.media_.id]),this.mainPlaylistLoader_.sidxMapping_=Vm(this.mainPlaylistLoader_.main,this.mainPlaylistLoader_.sidxMapping_),this.addSidxSegments_(this.media(),this.state,i=>{this.refreshMedia_(this.media().id)}))})}refreshMedia_(e){if(!e)throw new Error("refreshMedia_ must take a media id");this.media_&&this.isMain_&&this.handleMain_();const t=this.mainPlaylistLoader_.main.playlists,i=!this.media_||this.media_!==t[e];if(i?this.media_=t[e]:this.trigger("playlistunchanged"),!this.mediaUpdateTimeout){const s=()=>{this.media().endList||(this.mediaUpdateTimeout=A().setTimeout(()=>{this.trigger("mediaupdatetimeout"),s()},Ro(this.media(),!!i)))};s()}this.trigger("loadedplaylist")}addEventStreamToMetadataTrack_(e){if(e&&this.mainPlaylistLoader_.main.eventStream){const t=this.mainPlaylistLoader_.main.eventStream.map(i=>({cueTime:i.start,frames:[{data:i.messageData}]}));this.addMetadataToTextTrack("EventStream",t,this.mainPlaylistLoader_.main.duration)}}getKeyIdSet(e){if(e.contentProtection){const t=new Set;for(const i in e.contentProtection){const s=e.contentProtection[i].attributes["cenc:default_KID"];s&&t.add(s.replace(/-/g,"").toLowerCase())}return t}}}var jt={GOAL_BUFFER_LENGTH:30,MAX_GOAL_BUFFER_LENGTH:60,BACK_BUFFER_LENGTH:30,GOAL_BUFFER_LENGTH_RATE:1,INITIAL_BANDWIDTH:4194304,BANDWIDTH_VARIANCE:1.2,BUFFER_LOW_WATER_LINE:0,MAX_BUFFER_LOW_WATER_LINE:30,EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE:16,BUFFER_LOW_WATER_LINE_RATE:1,BUFFER_HIGH_WATER_LINE:30};const zm=n=>{const e=new Uint8Array(new ArrayBuffer(n.length));for(let t=0;t<n.length;t++)e[t]=n.charCodeAt(t);return e.buffer},Xc=function(n){return n.on=n.addEventListener,n.off=n.removeEventListener,n},Hm=function(n){try{return URL.createObjectURL(new Blob([n],{type:"application/javascript"}))}catch(e){const t=new BlobBuilder;return t.append(n),URL.createObjectURL(t.getBlob())}},Kc=function(n){return function(){const e=Hm(n),t=Xc(new Worker(e));t.objURL=e;const i=t.terminate;return t.on=t.addEventListener,t.off=t.removeEventListener,t.terminate=function(){return URL.revokeObjectURL(e),i.call(this)},t}},Qc=function(n){return`var browserWorkerPolyFill = ${Xc.toString()};
browserWorkerPolyFill(self);
`+n},Jc=function(n){return n.toString().replace(/^function.+?{/,"").slice(0,-1)},qm=Qc(Jc(function(){var n=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof W.g!="undefined"?W.g:typeof self!="undefined"?self:{},e=function(){this.init=function(){var o={};this.on=function(u,h){o[u]||(o[u]=[]),o[u]=o[u].concat(h)},this.off=function(u,h){var c;return o[u]?(c=o[u].indexOf(h),o[u]=o[u].slice(),o[u].splice(c,1),c>-1):!1},this.trigger=function(u){var h,c,f,m;if(h=o[u],!!h)if(arguments.length===2)for(f=h.length,c=0;c<f;++c)h[c].call(this,arguments[1]);else{for(m=[],c=arguments.length,c=1;c<arguments.length;++c)m.push(arguments[c]);for(f=h.length,c=0;c<f;++c)h[c].apply(this,m)}},this.dispose=function(){o={}}}};e.prototype.pipe=function(o){return this.on("data",function(u){o.push(u)}),this.on("done",function(u){o.flush(u)}),this.on("partialdone",function(u){o.partialFlush(u)}),this.on("endedtimeline",function(u){o.endTimeline(u)}),this.on("reset",function(u){o.reset(u)}),o},e.prototype.push=function(o){this.trigger("data",o)},e.prototype.flush=function(o){this.trigger("done",o)},e.prototype.partialFlush=function(o){this.trigger("partialdone",o)},e.prototype.endTimeline=function(o){this.trigger("endedtimeline",o)},e.prototype.reset=function(o){this.trigger("reset",o)};var t=e,i=Math.pow(2,32),s=function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),h;return u.getBigUint64?(h=u.getBigUint64(0),h<Number.MAX_SAFE_INTEGER?Number(h):h):u.getUint32(0)*i+u.getUint32(4)},r={getUint64:s,MAX_UINT32:i},a=r.MAX_UINT32,l,d,p,g,y,B,D,P,b,U,H,F,N,Y,O,K,be,Ee,We,vt,Bt,ut,we,Ke,ai,Vi,Zi,gn,vn,An,yn,_n,Qr,zd,Hd,qd;(function(){var o;if(we={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],mvex:[],mvhd:[],pasp:[],sdtp:[],smhd:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],styp:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[]},typeof Uint8Array!="undefined"){for(o in we)we.hasOwnProperty(o)&&(we[o]=[o.charCodeAt(0),o.charCodeAt(1),o.charCodeAt(2),o.charCodeAt(3)]);Ke=new Uint8Array([105,115,111,109]),Vi=new Uint8Array([97,118,99,49]),ai=new Uint8Array([0,0,0,1]),Zi=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),gn=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0]),vn={video:Zi,audio:gn},_n=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),yn=new Uint8Array([0,0,0,0,0,0,0,0]),Qr=new Uint8Array([0,0,0,0,0,0,0,0]),zd=Qr,Hd=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),qd=Qr,An=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0])}})(),l=function(o){var u=[],h=0,c,f,m;for(c=1;c<arguments.length;c++)u.push(arguments[c]);for(c=u.length;c--;)h+=u[c].byteLength;for(f=new Uint8Array(h+8),m=new DataView(f.buffer,f.byteOffset,f.byteLength),m.setUint32(0,f.byteLength),f.set(o,4),c=0,h=8;c<u.length;c++)f.set(u[c],h),h+=u[c].byteLength;return f},d=function(){return l(we.dinf,l(we.dref,_n))},p=function(o){return l(we.esds,new Uint8Array([0,0,0,0,3,25,0,0,0,4,17,64,21,0,6,0,0,0,218,192,0,0,218,192,5,2,o.audioobjecttype<<3|o.samplingfrequencyindex>>>1,o.samplingfrequencyindex<<7|o.channelcount<<3,6,1,2]))},g=function(){return l(we.ftyp,Ke,ai,Ke,Vi)},K=function(o){return l(we.hdlr,vn[o])},y=function(o){return l(we.mdat,o)},O=function(o){var u=new Uint8Array([0,0,0,0,0,0,0,2,0,0,0,3,0,1,95,144,o.duration>>>24&255,o.duration>>>16&255,o.duration>>>8&255,o.duration&255,85,196,0,0]);return o.samplerate&&(u[12]=o.samplerate>>>24&255,u[13]=o.samplerate>>>16&255,u[14]=o.samplerate>>>8&255,u[15]=o.samplerate&255),l(we.mdhd,u)},Y=function(o){return l(we.mdia,O(o),K(o.type),D(o))},B=function(o){return l(we.mfhd,new Uint8Array([0,0,0,0,(o&4278190080)>>24,(o&16711680)>>16,(o&65280)>>8,o&255]))},D=function(o){return l(we.minf,o.type==="video"?l(we.vmhd,An):l(we.smhd,yn),d(),Ee(o))},P=function(o,u){for(var h=[],c=u.length;c--;)h[c]=vt(u[c]);return l.apply(null,[we.moof,B(o)].concat(h))},b=function(o){for(var u=o.length,h=[];u--;)h[u]=F(o[u]);return l.apply(null,[we.moov,H(4294967295)].concat(h).concat(U(o)))},U=function(o){for(var u=o.length,h=[];u--;)h[u]=Bt(o[u]);return l.apply(null,[we.mvex].concat(h))},H=function(o){var u=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,2,0,1,95,144,(o&4278190080)>>24,(o&16711680)>>16,(o&65280)>>8,o&255,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255]);return l(we.mvhd,u)},be=function(o){var u=o.samples||[],h=new Uint8Array(4+u.length),c,f;for(f=0;f<u.length;f++)c=u[f].flags,h[f+4]=c.dependsOn<<4|c.isDependedOn<<2|c.hasRedundancy;return l(we.sdtp,h)},Ee=function(o){return l(we.stbl,We(o),l(we.stts,qd),l(we.stsc,zd),l(we.stsz,Hd),l(we.stco,Qr))},function(){var o,u;We=function(h){return l(we.stsd,new Uint8Array([0,0,0,0,0,0,0,1]),h.type==="video"?o(h):u(h))},o=function(h){var c=h.sps||[],f=h.pps||[],m=[],E=[],C,S;for(C=0;C<c.length;C++)m.push((c[C].byteLength&65280)>>>8),m.push(c[C].byteLength&255),m=m.concat(Array.prototype.slice.call(c[C]));for(C=0;C<f.length;C++)E.push((f[C].byteLength&65280)>>>8),E.push(f[C].byteLength&255),E=E.concat(Array.prototype.slice.call(f[C]));if(S=[we.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,(h.width&65280)>>8,h.width&255,(h.height&65280)>>8,h.height&255,0,72,0,0,0,72,0,0,0,0,0,0,0,1,19,118,105,100,101,111,106,115,45,99,111,110,116,114,105,98,45,104,108,115,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),l(we.avcC,new Uint8Array([1,h.profileIdc,h.profileCompatibility,h.levelIdc,255].concat([c.length],m,[f.length],E))),l(we.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192]))],h.sarRatio){var j=h.sarRatio[0],I=h.sarRatio[1];S.push(l(we.pasp,new Uint8Array([(j&4278190080)>>24,(j&16711680)>>16,(j&65280)>>8,j&255,(I&4278190080)>>24,(I&16711680)>>16,(I&65280)>>8,I&255])))}return l.apply(null,S)},u=function(h){return l(we.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,(h.channelcount&65280)>>8,h.channelcount&255,(h.samplesize&65280)>>8,h.samplesize&255,0,0,0,0,(h.samplerate&65280)>>8,h.samplerate&255,0,0]),p(h))}}(),N=function(o){var u=new Uint8Array([0,0,0,7,0,0,0,0,0,0,0,0,(o.id&4278190080)>>24,(o.id&16711680)>>16,(o.id&65280)>>8,o.id&255,0,0,0,0,(o.duration&4278190080)>>24,(o.duration&16711680)>>16,(o.duration&65280)>>8,o.duration&255,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,(o.width&65280)>>8,o.width&255,0,0,(o.height&65280)>>8,o.height&255,0,0]);return l(we.tkhd,u)},vt=function(o){var u,h,c,f,m,E,C;return u=l(we.tfhd,new Uint8Array([0,0,0,58,(o.id&4278190080)>>24,(o.id&16711680)>>16,(o.id&65280)>>8,o.id&255,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0])),E=Math.floor(o.baseMediaDecodeTime/a),C=Math.floor(o.baseMediaDecodeTime%a),h=l(we.tfdt,new Uint8Array([1,0,0,0,E>>>24&255,E>>>16&255,E>>>8&255,E&255,C>>>24&255,C>>>16&255,C>>>8&255,C&255])),m=92,o.type==="audio"?(c=ut(o,m),l(we.traf,u,h,c)):(f=be(o),c=ut(o,f.length+m),l(we.traf,u,h,c,f))},F=function(o){return o.duration=o.duration||4294967295,l(we.trak,N(o),Y(o))},Bt=function(o){var u=new Uint8Array([0,0,0,0,(o.id&4278190080)>>24,(o.id&16711680)>>16,(o.id&65280)>>8,o.id&255,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]);return o.type!=="video"&&(u[u.length-1]=0),l(we.trex,u)},function(){var o,u,h;h=function(c,f){var m=0,E=0,C=0,S=0;return c.length&&(c[0].duration!==void 0&&(m=1),c[0].size!==void 0&&(E=2),c[0].flags!==void 0&&(C=4),c[0].compositionTimeOffset!==void 0&&(S=8)),[0,0,m|E|C|S,1,(c.length&4278190080)>>>24,(c.length&16711680)>>>16,(c.length&65280)>>>8,c.length&255,(f&4278190080)>>>24,(f&16711680)>>>16,(f&65280)>>>8,f&255]},u=function(c,f){var m,E,C,S,j,I;for(S=c.samples||[],f+=20+16*S.length,C=h(S,f),E=new Uint8Array(C.length+S.length*16),E.set(C),m=C.length,I=0;I<S.length;I++)j=S[I],E[m++]=(j.duration&4278190080)>>>24,E[m++]=(j.duration&16711680)>>>16,E[m++]=(j.duration&65280)>>>8,E[m++]=j.duration&255,E[m++]=(j.size&4278190080)>>>24,E[m++]=(j.size&16711680)>>>16,E[m++]=(j.size&65280)>>>8,E[m++]=j.size&255,E[m++]=j.flags.isLeading<<2|j.flags.dependsOn,E[m++]=j.flags.isDependedOn<<6|j.flags.hasRedundancy<<4|j.flags.paddingValue<<1|j.flags.isNonSyncSample,E[m++]=j.flags.degradationPriority&61440,E[m++]=j.flags.degradationPriority&15,E[m++]=(j.compositionTimeOffset&4278190080)>>>24,E[m++]=(j.compositionTimeOffset&16711680)>>>16,E[m++]=(j.compositionTimeOffset&65280)>>>8,E[m++]=j.compositionTimeOffset&255;return l(we.trun,E)},o=function(c,f){var m,E,C,S,j,I;for(S=c.samples||[],f+=20+8*S.length,C=h(S,f),m=new Uint8Array(C.length+S.length*8),m.set(C),E=C.length,I=0;I<S.length;I++)j=S[I],m[E++]=(j.duration&4278190080)>>>24,m[E++]=(j.duration&16711680)>>>16,m[E++]=(j.duration&65280)>>>8,m[E++]=j.duration&255,m[E++]=(j.size&4278190080)>>>24,m[E++]=(j.size&16711680)>>>16,m[E++]=(j.size&65280)>>>8,m[E++]=j.size&255;return l(we.trun,m)},ut=function(c,f){return c.type==="audio"?o(c,f):u(c,f)}}();var D0={ftyp:g,mdat:y,moof:P,moov:b,initSegment:function(o){var u=g(),h=b(o),c;return c=new Uint8Array(u.byteLength+h.byteLength),c.set(u),c.set(h,u.byteLength),c}},k0=function(o){var u,h,c=[],f=[];for(f.byteLength=0,f.nalCount=0,f.duration=0,c.byteLength=0,u=0;u<o.length;u++)h=o[u],h.nalUnitType==="access_unit_delimiter_rbsp"?(c.length&&(c.duration=h.dts-c.dts,f.byteLength+=c.byteLength,f.nalCount+=c.length,f.duration+=c.duration,f.push(c)),c=[h],c.byteLength=h.data.byteLength,c.pts=h.pts,c.dts=h.dts):(h.nalUnitType==="slice_layer_without_partitioning_rbsp_idr"&&(c.keyFrame=!0),c.duration=h.dts-c.dts,c.byteLength+=h.data.byteLength,c.push(h));return f.length&&(!c.duration||c.duration<=0)&&(c.duration=f[f.length-1].duration),f.byteLength+=c.byteLength,f.nalCount+=c.length,f.duration+=c.duration,f.push(c),f},I0=function(o){var u,h,c=[],f=[];for(c.byteLength=0,c.nalCount=0,c.duration=0,c.pts=o[0].pts,c.dts=o[0].dts,f.byteLength=0,f.nalCount=0,f.duration=0,f.pts=o[0].pts,f.dts=o[0].dts,u=0;u<o.length;u++)h=o[u],h.keyFrame?(c.length&&(f.push(c),f.byteLength+=c.byteLength,f.nalCount+=c.nalCount,f.duration+=c.duration),c=[h],c.nalCount=h.length,c.byteLength=h.byteLength,c.pts=h.pts,c.dts=h.dts,c.duration=h.duration):(c.duration+=h.duration,c.nalCount+=h.length,c.byteLength+=h.byteLength,c.push(h));return f.length&&c.duration<=0&&(c.duration=f[f.length-1].duration),f.byteLength+=c.byteLength,f.nalCount+=c.nalCount,f.duration+=c.duration,f.push(c),f},P0=function(o){var u;return!o[0][0].keyFrame&&o.length>1&&(u=o.shift(),o.byteLength-=u.byteLength,o.nalCount-=u.nalCount,o[0][0].dts=u.dts,o[0][0].pts=u.pts,o[0][0].duration+=u.duration),o},O0=function(){return{size:0,flags:{isLeading:0,dependsOn:1,isDependedOn:0,hasRedundancy:0,degradationPriority:0,isNonSyncSample:1}}},Wd=function(o,u){var h=O0();return h.dataOffset=u,h.compositionTimeOffset=o.pts-o.dts,h.duration=o.duration,h.size=4*o.length,h.size+=o.byteLength,o.keyFrame&&(h.flags.dependsOn=2,h.flags.isNonSyncSample=0),h},L0=function(o,u){var h,c,f,m,E,C=u||0,S=[];for(h=0;h<o.length;h++)for(m=o[h],c=0;c<m.length;c++)E=m[c],f=Wd(E,C),C+=f.size,S.push(f);return S},R0=function(o){var u,h,c,f,m,E,C=0,S=o.byteLength,j=o.nalCount,I=S+4*j,z=new Uint8Array(I),ve=new DataView(z.buffer);for(u=0;u<o.length;u++)for(f=o[u],h=0;h<f.length;h++)for(m=f[h],c=0;c<m.length;c++)E=m[c],ve.setUint32(C,E.data.byteLength),C+=4,z.set(E.data,C),C+=E.data.byteLength;return z},N0=function(o,u){var h,c=u||0,f=[];return h=Wd(o,c),f.push(h),f},M0=function(o){var u,h,c=0,f=o.byteLength,m=o.length,E=f+4*m,C=new Uint8Array(E),S=new DataView(C.buffer);for(u=0;u<o.length;u++)h=o[u],S.setUint32(c,h.data.byteLength),c+=4,C.set(h.data,c),c+=h.data.byteLength;return C},F0={groupNalsIntoFrames:k0,groupFramesIntoGops:I0,extendFirstKeyFrame:P0,generateSampleTable:L0,concatenateNalData:R0,generateSampleTableForFrame:N0,concatenateNalDataForFrame:M0},en=[33,16,5,32,164,27],Ko=[33,65,108,84,1,2,4,8,168,2,4,8,17,191,252],Qe=function(o){for(var u=[];o--;)u.push(0);return u},U0=function(o){return Object.keys(o).reduce(function(u,h){return u[h]=new Uint8Array(o[h].reduce(function(c,f){return c.concat(f)},[])),u},{})},Qo,V0=function(){if(!Qo){var o={96e3:[en,[227,64],Qe(154),[56]],88200:[en,[231],Qe(170),[56]],64e3:[en,[248,192],Qe(240),[56]],48e3:[en,[255,192],Qe(268),[55,148,128],Qe(54),[112]],44100:[en,[255,192],Qe(268),[55,163,128],Qe(84),[112]],32e3:[en,[255,192],Qe(268),[55,234],Qe(226),[112]],24e3:[en,[255,192],Qe(268),[55,255,128],Qe(268),[111,112],Qe(126),[224]],16e3:[en,[255,192],Qe(268),[55,255,128],Qe(268),[111,255],Qe(269),[223,108],Qe(195),[1,192]],12e3:[Ko,Qe(268),[3,127,248],Qe(268),[6,255,240],Qe(268),[13,255,224],Qe(268),[27,253,128],Qe(259),[56]],11025:[Ko,Qe(268),[3,127,248],Qe(268),[6,255,240],Qe(268),[13,255,224],Qe(268),[27,255,192],Qe(268),[55,175,128],Qe(108),[112]],8e3:[Ko,Qe(268),[3,121,16],Qe(47),[7]]};Qo=U0(o)}return Qo},Jo=9e4,Zo,el,Jr,tl,$d,Gd,Yd;Zo=function(o){return o*Jo},el=function(o,u){return o*u},Jr=function(o){return o/Jo},tl=function(o,u){return o/u},$d=function(o,u){return Zo(tl(o,u))},Gd=function(o,u){return el(Jr(o),u)},Yd=function(o,u,h){return Jr(h?o:o-u)};var ot={ONE_SECOND_IN_TS:Jo,secondsToVideoTs:Zo,secondsToAudioTs:el,videoTsToSeconds:Jr,audioTsToSeconds:tl,audioTsToVideoTs:$d,videoTsToAudioTs:Gd,metadataTsToSeconds:Yd},z0=V0,Zr=ot,H0=function(o){var u,h,c=0;for(u=0;u<o.length;u++)h=o[u],c+=h.data.byteLength;return c},q0=function(o,u,h,c){var f,m=0,E=0,C=0,S=0,j,I,z;if(u.length&&(f=Zr.audioTsToVideoTs(o.baseMediaDecodeTime,o.samplerate),m=Math.ceil(Zr.ONE_SECOND_IN_TS/(o.samplerate/1024)),h&&c&&(E=f-Math.max(h,c),C=Math.floor(E/m),S=C*m),!(C<1||S>Zr.ONE_SECOND_IN_TS/2))){for(j=z0()[o.samplerate],j||(j=u[0].data),I=0;I<C;I++)z=u[0],u.splice(0,0,{data:j,dts:z.dts-m,pts:z.pts-m});return o.baseMediaDecodeTime-=Math.floor(Zr.videoTsToAudioTs(S,o.samplerate)),S}},W0=function(o,u,h){return u.minSegmentDts>=h?o:(u.minSegmentDts=1/0,o.filter(function(c){return c.dts>=h?(u.minSegmentDts=Math.min(u.minSegmentDts,c.dts),u.minSegmentPts=u.minSegmentDts,!0):!1}))},$0=function(o){var u,h,c=[];for(u=0;u<o.length;u++)h=o[u],c.push({size:h.data.byteLength,duration:1024});return c},G0=function(o){var u,h,c=0,f=new Uint8Array(H0(o));for(u=0;u<o.length;u++)h=o[u],f.set(h.data,c),c+=h.data.byteLength;return f},Y0={prefixWithSilence:q0,trimAdtsFramesByEarliestDts:W0,generateSampleTable:$0,concatenateFrameData:G0},X0=ot.ONE_SECOND_IN_TS,K0=function(o,u){typeof u.pts=="number"&&(o.timelineStartInfo.pts===void 0&&(o.timelineStartInfo.pts=u.pts),o.minSegmentPts===void 0?o.minSegmentPts=u.pts:o.minSegmentPts=Math.min(o.minSegmentPts,u.pts),o.maxSegmentPts===void 0?o.maxSegmentPts=u.pts:o.maxSegmentPts=Math.max(o.maxSegmentPts,u.pts)),typeof u.dts=="number"&&(o.timelineStartInfo.dts===void 0&&(o.timelineStartInfo.dts=u.dts),o.minSegmentDts===void 0?o.minSegmentDts=u.dts:o.minSegmentDts=Math.min(o.minSegmentDts,u.dts),o.maxSegmentDts===void 0?o.maxSegmentDts=u.dts:o.maxSegmentDts=Math.max(o.maxSegmentDts,u.dts))},Q0=function(o){delete o.minSegmentDts,delete o.maxSegmentDts,delete o.minSegmentPts,delete o.maxSegmentPts},J0=function(o,u){var h,c,f=o.minSegmentDts;return u||(f-=o.timelineStartInfo.dts),h=o.timelineStartInfo.baseMediaDecodeTime,h+=f,h=Math.max(0,h),o.type==="audio"&&(c=o.samplerate/X0,h*=c,h=Math.floor(h)),h},Z0={clearDtsInfo:Q0,calculateTrackBaseMediaDecodeTime:J0,collectDtsInfo:K0},Xd=4,ev=128,tv=function(o){for(var u=0,h={payloadType:-1,payloadSize:0},c=0,f=0;u<o.byteLength&&o[u]!==ev;){for(;o[u]===255;)c+=255,u++;for(c+=o[u++];o[u]===255;)f+=255,u++;if(f+=o[u++],!h.payload&&c===Xd){var m=String.fromCharCode(o[u+3],o[u+4],o[u+5],o[u+6]);if(m==="GA94"){h.payloadType=c,h.payloadSize=f,h.payload=o.subarray(u,u+f);break}else h.payload=void 0}u+=f,c=0,f=0}return h},iv=function(o){return o.payload[0]!==181||(o.payload[1]<<8|o.payload[2])!==49||String.fromCharCode(o.payload[3],o.payload[4],o.payload[5],o.payload[6])!=="GA94"||o.payload[7]!==3?null:o.payload.subarray(8,o.payload.length-1)},nv=function(o,u){var h=[],c,f,m,E;if(!(u[0]&64))return h;for(f=u[0]&31,c=0;c<f;c++)m=c*3,E={type:u[m+2]&3,pts:o},u[m+2]&4&&(E.ccData=u[m+3]<<8|u[m+4],h.push(E));return h},sv=function(o){for(var u=o.byteLength,h=[],c=1,f,m;c<u-2;)o[c]===0&&o[c+1]===0&&o[c+2]===3?(h.push(c+2),c+=2):c++;if(h.length===0)return o;f=u-h.length,m=new Uint8Array(f);var E=0;for(c=0;c<f;E++,c++)E===h[0]&&(E++,h.shift()),m[c]=o[E];return m},Kd={parseSei:tv,parseUserData:iv,parseCaptionPackets:nv,discardEmulationPreventionBytes:sv,USER_DATA_REGISTERED_ITU_T_T35:Xd},il=t,ea=Kd,qt=function(o){o=o||{},qt.prototype.init.call(this),this.parse708captions_=typeof o.parse708captions=="boolean"?o.parse708captions:!0,this.captionPackets_=[],this.ccStreams_=[new ct(0,0),new ct(0,1),new ct(1,0),new ct(1,1)],this.parse708captions_&&(this.cc708Stream_=new et({captionServices:o.captionServices})),this.reset(),this.ccStreams_.forEach(function(u){u.on("data",this.trigger.bind(this,"data")),u.on("partialdone",this.trigger.bind(this,"partialdone")),u.on("done",this.trigger.bind(this,"done"))},this),this.parse708captions_&&(this.cc708Stream_.on("data",this.trigger.bind(this,"data")),this.cc708Stream_.on("partialdone",this.trigger.bind(this,"partialdone")),this.cc708Stream_.on("done",this.trigger.bind(this,"done")))};qt.prototype=new il,qt.prototype.push=function(o){var u,h,c;if(o.nalUnitType==="sei_rbsp"&&(u=ea.parseSei(o.escapedRBSP),!!u.payload&&u.payloadType===ea.USER_DATA_REGISTERED_ITU_T_T35&&(h=ea.parseUserData(u),!!h))){if(o.dts<this.latestDts_){this.ignoreNextEqualDts_=!0;return}else if(o.dts===this.latestDts_&&this.ignoreNextEqualDts_){this.numSameDts_--,this.numSameDts_||(this.ignoreNextEqualDts_=!1);return}c=ea.parseCaptionPackets(o.pts,h),this.captionPackets_=this.captionPackets_.concat(c),this.latestDts_!==o.dts&&(this.numSameDts_=0),this.numSameDts_++,this.latestDts_=o.dts}},qt.prototype.flushCCStreams=function(o){this.ccStreams_.forEach(function(u){return o==="flush"?u.flush():u.partialFlush()},this)},qt.prototype.flushStream=function(o){if(!this.captionPackets_.length){this.flushCCStreams(o);return}this.captionPackets_.forEach(function(u,h){u.presortIndex=h}),this.captionPackets_.sort(function(u,h){return u.pts===h.pts?u.presortIndex-h.presortIndex:u.pts-h.pts}),this.captionPackets_.forEach(function(u){u.type<2?this.dispatchCea608Packet(u):this.dispatchCea708Packet(u)},this),this.captionPackets_.length=0,this.flushCCStreams(o)},qt.prototype.flush=function(){return this.flushStream("flush")},qt.prototype.partialFlush=function(){return this.flushStream("partialFlush")},qt.prototype.reset=function(){this.latestDts_=null,this.ignoreNextEqualDts_=!1,this.numSameDts_=0,this.activeCea608Channel_=[null,null],this.ccStreams_.forEach(function(o){o.reset()})},qt.prototype.dispatchCea608Packet=function(o){this.setsTextOrXDSActive(o)?this.activeCea608Channel_[o.type]=null:this.setsChannel1Active(o)?this.activeCea608Channel_[o.type]=0:this.setsChannel2Active(o)&&(this.activeCea608Channel_[o.type]=1),this.activeCea608Channel_[o.type]!==null&&this.ccStreams_[(o.type<<1)+this.activeCea608Channel_[o.type]].push(o)},qt.prototype.setsChannel1Active=function(o){return(o.ccData&30720)===4096},qt.prototype.setsChannel2Active=function(o){return(o.ccData&30720)===6144},qt.prototype.setsTextOrXDSActive=function(o){return(o.ccData&28928)===256||(o.ccData&30974)===4138||(o.ccData&30974)===6186},qt.prototype.dispatchCea708Packet=function(o){this.parse708captions_&&this.cc708Stream_.push(o)};var rv={127:9834,4128:32,4129:160,4133:8230,4138:352,4140:338,4144:9608,4145:8216,4146:8217,4147:8220,4148:8221,4149:8226,4153:8482,4154:353,4156:339,4157:8480,4159:376,4214:8539,4215:8540,4216:8541,4217:8542,4218:9168,4219:9124,4220:9123,4221:9135,4222:9126,4223:9121,4256:12600},av=function(o){var u=rv[o]||o;return o&4096&&o===u?"":String.fromCharCode(u)},ta=function(o){return 32<=o&&o<=127||160<=o&&o<=255},zi=function(o){this.windowNum=o,this.reset()};zi.prototype.reset=function(){this.clearText(),this.pendingNewLine=!1,this.winAttr={},this.penAttr={},this.penLoc={},this.penColor={},this.visible=0,this.rowLock=0,this.columnLock=0,this.priority=0,this.relativePositioning=0,this.anchorVertical=0,this.anchorHorizontal=0,this.anchorPoint=0,this.rowCount=1,this.virtualRowCount=this.rowCount+1,this.columnCount=41,this.windowStyle=0,this.penStyle=0},zi.prototype.getText=function(){return this.rows.join(`
`)},zi.prototype.clearText=function(){this.rows=[""],this.rowIdx=0},zi.prototype.newLine=function(o){for(this.rows.length>=this.virtualRowCount&&typeof this.beforeRowOverflow=="function"&&this.beforeRowOverflow(o),this.rows.length>0&&(this.rows.push(""),this.rowIdx++);this.rows.length>this.virtualRowCount;)this.rows.shift(),this.rowIdx--},zi.prototype.isEmpty=function(){return this.rows.length===0?!0:this.rows.length===1?this.rows[0]==="":!1},zi.prototype.addText=function(o){this.rows[this.rowIdx]+=o},zi.prototype.backspace=function(){if(!this.isEmpty()){var o=this.rows[this.rowIdx];this.rows[this.rowIdx]=o.substr(0,o.length-1)}};var ia=function(o,u,h){this.serviceNum=o,this.text="",this.currentWindow=new zi(-1),this.windows=[],this.stream=h,typeof u=="string"&&this.createTextDecoder(u)};ia.prototype.init=function(o,u){this.startPts=o;for(var h=0;h<8;h++)this.windows[h]=new zi(h),typeof u=="function"&&(this.windows[h].beforeRowOverflow=u)},ia.prototype.setCurrentWindow=function(o){this.currentWindow=this.windows[o]},ia.prototype.createTextDecoder=function(o){if(typeof TextDecoder=="undefined")this.stream.trigger("log",{level:"warn",message:"The `encoding` option is unsupported without TextDecoder support"});else try{this.textDecoder_=new TextDecoder(o)}catch(u){this.stream.trigger("log",{level:"warn",message:"TextDecoder could not be created with "+o+" encoding. "+u})}};var et=function(o){o=o||{},et.prototype.init.call(this);var u=this,h=o.captionServices||{},c={},f;Object.keys(h).forEach(m=>{f=h[m],/^SERVICE/.test(m)&&(c[m]=f.encoding)}),this.serviceEncodings=c,this.current708Packet=null,this.services={},this.push=function(m){m.type===3?(u.new708Packet(),u.add708Bytes(m)):(u.current708Packet===null&&u.new708Packet(),u.add708Bytes(m))}};et.prototype=new il,et.prototype.new708Packet=function(){this.current708Packet!==null&&this.push708Packet(),this.current708Packet={data:[],ptsVals:[]}},et.prototype.add708Bytes=function(o){var u=o.ccData,h=u>>>8,c=u&255;this.current708Packet.ptsVals.push(o.pts),this.current708Packet.data.push(h),this.current708Packet.data.push(c)},et.prototype.push708Packet=function(){var o=this.current708Packet,u=o.data,h=null,c=null,f=0,m=u[f++];for(o.seq=m>>6,o.sizeCode=m&63;f<u.length;f++)m=u[f++],h=m>>5,c=m&31,h===7&&c>0&&(m=u[f++],h=m),this.pushServiceBlock(h,f,c),c>0&&(f+=c-1)},et.prototype.pushServiceBlock=function(o,u,h){var c,f=u,m=this.current708Packet.data,E=this.services[o];for(E||(E=this.initService(o,f));f<u+h&&f<m.length;f++)c=m[f],ta(c)?f=this.handleText(f,E):c===24?f=this.multiByteCharacter(f,E):c===16?f=this.extendedCommands(f,E):128<=c&&c<=135?f=this.setCurrentWindow(f,E):152<=c&&c<=159?f=this.defineWindow(f,E):c===136?f=this.clearWindows(f,E):c===140?f=this.deleteWindows(f,E):c===137?f=this.displayWindows(f,E):c===138?f=this.hideWindows(f,E):c===139?f=this.toggleWindows(f,E):c===151?f=this.setWindowAttributes(f,E):c===144?f=this.setPenAttributes(f,E):c===145?f=this.setPenColor(f,E):c===146?f=this.setPenLocation(f,E):c===143?E=this.reset(f,E):c===8?E.currentWindow.backspace():c===12?E.currentWindow.clearText():c===13?E.currentWindow.pendingNewLine=!0:c===14?E.currentWindow.clearText():c===141&&f++},et.prototype.extendedCommands=function(o,u){var h=this.current708Packet.data,c=h[++o];return ta(c)&&(o=this.handleText(o,u,{isExtended:!0})),o},et.prototype.getPts=function(o){return this.current708Packet.ptsVals[Math.floor(o/2)]},et.prototype.initService=function(o,u){var c="SERVICE"+o,h=this,c,f;return c in this.serviceEncodings&&(f=this.serviceEncodings[c]),this.services[o]=new ia(o,f,h),this.services[o].init(this.getPts(u),function(m){h.flushDisplayed(m,h.services[o])}),this.services[o]},et.prototype.handleText=function(o,u,h){var c=h&&h.isExtended,f=h&&h.isMultiByte,m=this.current708Packet.data,E=c?4096:0,C=m[o],S=m[o+1],j=u.currentWindow,I,z;function ve(Q){return Q.map(Ie=>("0"+(Ie&255).toString(16)).slice(-2)).join("")}if(f?(z=[C,S],o++):z=[C],u.textDecoder_&&!c)I=u.textDecoder_.decode(new Uint8Array(z));else if(f){const Q=ve(z);I=String.fromCharCode(parseInt(Q,16))}else I=av(E|C);return j.pendingNewLine&&!j.isEmpty()&&j.newLine(this.getPts(o)),j.pendingNewLine=!1,j.addText(I),o},et.prototype.multiByteCharacter=function(o,u){var h=this.current708Packet.data,c=h[o+1],f=h[o+2];return ta(c)&&ta(f)&&(o=this.handleText(++o,u,{isMultiByte:!0})),o},et.prototype.setCurrentWindow=function(o,u){var h=this.current708Packet.data,c=h[o],f=c&7;return u.setCurrentWindow(f),o},et.prototype.defineWindow=function(o,u){var h=this.current708Packet.data,c=h[o],f=c&7;u.setCurrentWindow(f);var m=u.currentWindow;return c=h[++o],m.visible=(c&32)>>5,m.rowLock=(c&16)>>4,m.columnLock=(c&8)>>3,m.priority=c&7,c=h[++o],m.relativePositioning=(c&128)>>7,m.anchorVertical=c&127,c=h[++o],m.anchorHorizontal=c,c=h[++o],m.anchorPoint=(c&240)>>4,m.rowCount=c&15,c=h[++o],m.columnCount=c&63,c=h[++o],m.windowStyle=(c&56)>>3,m.penStyle=c&7,m.virtualRowCount=m.rowCount+1,o},et.prototype.setWindowAttributes=function(o,u){var h=this.current708Packet.data,c=h[o],f=u.currentWindow.winAttr;return c=h[++o],f.fillOpacity=(c&192)>>6,f.fillRed=(c&48)>>4,f.fillGreen=(c&12)>>2,f.fillBlue=c&3,c=h[++o],f.borderType=(c&192)>>6,f.borderRed=(c&48)>>4,f.borderGreen=(c&12)>>2,f.borderBlue=c&3,c=h[++o],f.borderType+=(c&128)>>5,f.wordWrap=(c&64)>>6,f.printDirection=(c&48)>>4,f.scrollDirection=(c&12)>>2,f.justify=c&3,c=h[++o],f.effectSpeed=(c&240)>>4,f.effectDirection=(c&12)>>2,f.displayEffect=c&3,o},et.prototype.flushDisplayed=function(o,u){for(var h=[],c=0;c<8;c++)u.windows[c].visible&&!u.windows[c].isEmpty()&&h.push(u.windows[c].getText());u.endPts=o,u.text=h.join(`

`),this.pushCaption(u),u.startPts=o},et.prototype.pushCaption=function(o){o.text!==""&&(this.trigger("data",{startPts:o.startPts,endPts:o.endPts,text:o.text,stream:"cc708_"+o.serviceNum}),o.text="",o.startPts=o.endPts)},et.prototype.displayWindows=function(o,u){var h=this.current708Packet.data,c=h[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)c&1<<m&&(u.windows[m].visible=1);return o},et.prototype.hideWindows=function(o,u){var h=this.current708Packet.data,c=h[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)c&1<<m&&(u.windows[m].visible=0);return o},et.prototype.toggleWindows=function(o,u){var h=this.current708Packet.data,c=h[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)c&1<<m&&(u.windows[m].visible^=1);return o},et.prototype.clearWindows=function(o,u){var h=this.current708Packet.data,c=h[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)c&1<<m&&u.windows[m].clearText();return o},et.prototype.deleteWindows=function(o,u){var h=this.current708Packet.data,c=h[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)c&1<<m&&u.windows[m].reset();return o},et.prototype.setPenAttributes=function(o,u){var h=this.current708Packet.data,c=h[o],f=u.currentWindow.penAttr;return c=h[++o],f.textTag=(c&240)>>4,f.offset=(c&12)>>2,f.penSize=c&3,c=h[++o],f.italics=(c&128)>>7,f.underline=(c&64)>>6,f.edgeType=(c&56)>>3,f.fontStyle=c&7,o},et.prototype.setPenColor=function(o,u){var h=this.current708Packet.data,c=h[o],f=u.currentWindow.penColor;return c=h[++o],f.fgOpacity=(c&192)>>6,f.fgRed=(c&48)>>4,f.fgGreen=(c&12)>>2,f.fgBlue=c&3,c=h[++o],f.bgOpacity=(c&192)>>6,f.bgRed=(c&48)>>4,f.bgGreen=(c&12)>>2,f.bgBlue=c&3,c=h[++o],f.edgeRed=(c&48)>>4,f.edgeGreen=(c&12)>>2,f.edgeBlue=c&3,o},et.prototype.setPenLocation=function(o,u){var h=this.current708Packet.data,c=h[o],f=u.currentWindow.penLoc;return u.currentWindow.pendingNewLine=!0,c=h[++o],f.row=c&15,c=h[++o],f.column=c&63,o},et.prototype.reset=function(o,u){var h=this.getPts(o);return this.flushDisplayed(h,u),this.initService(u.serviceNum,o)};var ov={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608,304:174,305:176,306:189,307:191,308:8482,309:162,310:163,311:9834,312:224,313:160,314:232,315:226,316:234,317:238,318:244,319:251,544:193,545:201,546:211,547:218,548:220,549:252,550:8216,551:161,552:42,553:39,554:8212,555:169,556:8480,557:8226,558:8220,559:8221,560:192,561:194,562:199,563:200,564:202,565:203,566:235,567:206,568:207,569:239,570:212,571:217,572:249,573:219,574:171,575:187,800:195,801:227,802:205,803:204,804:236,805:210,806:242,807:213,808:245,809:123,810:125,811:92,812:94,813:95,814:124,815:126,816:196,817:228,818:214,819:246,820:223,821:165,822:164,823:9474,824:197,825:229,826:216,827:248,828:9484,829:9488,830:9492,831:9496},na=function(o){return o===null?"":(o=ov[o]||o,String.fromCharCode(o))},sa=14,lv=[4352,4384,4608,4640,5376,5408,5632,5664,5888,5920,4096,4864,4896,5120,5152],bn=function(){for(var o=[],u=sa+1;u--;)o.push({text:"",indent:0,offset:0});return o},ct=function(o,u){ct.prototype.init.call(this),this.field_=o||0,this.dataChannel_=u||0,this.name_="CC"+((this.field_<<1|this.dataChannel_)+1),this.setConstants(),this.reset(),this.push=function(h){var c,f,m,E,C;if(c=h.ccData&32639,c===this.lastControlCode_){this.lastControlCode_=null;return}if((c&61440)===4096?this.lastControlCode_=c:c!==this.PADDING_&&(this.lastControlCode_=null),m=c>>>8,E=c&255,c!==this.PADDING_)if(c===this.RESUME_CAPTION_LOADING_)this.mode_="popOn";else if(c===this.END_OF_CAPTION_)this.mode_="popOn",this.clearFormatting(h.pts),this.flushDisplayed(h.pts),f=this.displayed_,this.displayed_=this.nonDisplayed_,this.nonDisplayed_=f,this.startPts_=h.pts;else if(c===this.ROLL_UP_2_ROWS_)this.rollUpRows_=2,this.setRollUp(h.pts);else if(c===this.ROLL_UP_3_ROWS_)this.rollUpRows_=3,this.setRollUp(h.pts);else if(c===this.ROLL_UP_4_ROWS_)this.rollUpRows_=4,this.setRollUp(h.pts);else if(c===this.CARRIAGE_RETURN_)this.clearFormatting(h.pts),this.flushDisplayed(h.pts),this.shiftRowsUp_(),this.startPts_=h.pts;else if(c===this.BACKSPACE_)this.mode_==="popOn"?this.nonDisplayed_[this.row_].text=this.nonDisplayed_[this.row_].text.slice(0,-1):this.displayed_[this.row_].text=this.displayed_[this.row_].text.slice(0,-1);else if(c===this.ERASE_DISPLAYED_MEMORY_)this.flushDisplayed(h.pts),this.displayed_=bn();else if(c===this.ERASE_NON_DISPLAYED_MEMORY_)this.nonDisplayed_=bn();else if(c===this.RESUME_DIRECT_CAPTIONING_)this.mode_!=="paintOn"&&(this.flushDisplayed(h.pts),this.displayed_=bn()),this.mode_="paintOn",this.startPts_=h.pts;else if(this.isSpecialCharacter(m,E))m=(m&3)<<8,C=na(m|E),this[this.mode_](h.pts,C),this.column_++;else if(this.isExtCharacter(m,E))this.mode_==="popOn"?this.nonDisplayed_[this.row_].text=this.nonDisplayed_[this.row_].text.slice(0,-1):this.displayed_[this.row_].text=this.displayed_[this.row_].text.slice(0,-1),m=(m&3)<<8,C=na(m|E),this[this.mode_](h.pts,C),this.column_++;else if(this.isMidRowCode(m,E))this.clearFormatting(h.pts),this[this.mode_](h.pts," "),this.column_++,(E&14)===14&&this.addFormatting(h.pts,["i"]),(E&1)===1&&this.addFormatting(h.pts,["u"]);else if(this.isOffsetControlCode(m,E)){const j=E&3;this.nonDisplayed_[this.row_].offset=j,this.column_+=j}else if(this.isPAC(m,E)){var S=lv.indexOf(c&7968);if(this.mode_==="rollUp"&&(S-this.rollUpRows_+1<0&&(S=this.rollUpRows_-1),this.setRollUp(h.pts,S)),S!==this.row_&&S>=0&&S<=14&&(this.clearFormatting(h.pts),this.row_=S),E&1&&this.formatting_.indexOf("u")===-1&&this.addFormatting(h.pts,["u"]),(c&16)===16){const j=(c&14)>>1;this.column_=j*4,this.nonDisplayed_[this.row_].indent+=j}this.isColorPAC(E)&&(E&14)===14&&this.addFormatting(h.pts,["i"])}else this.isNormalChar(m)&&(E===0&&(E=null),C=na(m),C+=na(E),this[this.mode_](h.pts,C),this.column_+=C.length)}};ct.prototype=new il,ct.prototype.flushDisplayed=function(o){const u=c=>{this.trigger("log",{level:"warn",message:"Skipping a malformed 608 caption at index "+c+"."})},h=[];this.displayed_.forEach((c,f)=>{if(c&&c.text&&c.text.length){try{c.text=c.text.trim()}catch(m){u(f)}c.text.length&&h.push({text:c.text,line:f+1,position:10+Math.min(70,c.indent*10)+c.offset*2.5})}else c==null&&u(f)}),h.length&&this.trigger("data",{startPts:this.startPts_,endPts:o,content:h,stream:this.name_})},ct.prototype.reset=function(){this.mode_="popOn",this.topRow_=0,this.startPts_=0,this.displayed_=bn(),this.nonDisplayed_=bn(),this.lastControlCode_=null,this.column_=0,this.row_=sa,this.rollUpRows_=2,this.formatting_=[]},ct.prototype.setConstants=function(){this.dataChannel_===0?(this.BASE_=16,this.EXT_=17,this.CONTROL_=(20|this.field_)<<8,this.OFFSET_=23):this.dataChannel_===1&&(this.BASE_=24,this.EXT_=25,this.CONTROL_=(28|this.field_)<<8,this.OFFSET_=31),this.PADDING_=0,this.RESUME_CAPTION_LOADING_=this.CONTROL_|32,this.END_OF_CAPTION_=this.CONTROL_|47,this.ROLL_UP_2_ROWS_=this.CONTROL_|37,this.ROLL_UP_3_ROWS_=this.CONTROL_|38,this.ROLL_UP_4_ROWS_=this.CONTROL_|39,this.CARRIAGE_RETURN_=this.CONTROL_|45,this.RESUME_DIRECT_CAPTIONING_=this.CONTROL_|41,this.BACKSPACE_=this.CONTROL_|33,this.ERASE_DISPLAYED_MEMORY_=this.CONTROL_|44,this.ERASE_NON_DISPLAYED_MEMORY_=this.CONTROL_|46},ct.prototype.isSpecialCharacter=function(o,u){return o===this.EXT_&&u>=48&&u<=63},ct.prototype.isExtCharacter=function(o,u){return(o===this.EXT_+1||o===this.EXT_+2)&&u>=32&&u<=63},ct.prototype.isMidRowCode=function(o,u){return o===this.EXT_&&u>=32&&u<=47},ct.prototype.isOffsetControlCode=function(o,u){return o===this.OFFSET_&&u>=33&&u<=35},ct.prototype.isPAC=function(o,u){return o>=this.BASE_&&o<this.BASE_+8&&u>=64&&u<=127},ct.prototype.isColorPAC=function(o){return o>=64&&o<=79||o>=96&&o<=127},ct.prototype.isNormalChar=function(o){return o>=32&&o<=127},ct.prototype.setRollUp=function(o,u){if(this.mode_!=="rollUp"&&(this.row_=sa,this.mode_="rollUp",this.flushDisplayed(o),this.nonDisplayed_=bn(),this.displayed_=bn()),u!==void 0&&u!==this.row_)for(var h=0;h<this.rollUpRows_;h++)this.displayed_[u-h]=this.displayed_[this.row_-h],this.displayed_[this.row_-h]={text:"",indent:0,offset:0};u===void 0&&(u=this.row_),this.topRow_=u-this.rollUpRows_+1},ct.prototype.addFormatting=function(o,u){this.formatting_=this.formatting_.concat(u);var h=u.reduce(function(c,f){return c+"<"+f+">"},"");this[this.mode_](o,h)},ct.prototype.clearFormatting=function(o){if(this.formatting_.length){var u=this.formatting_.reverse().reduce(function(h,c){return h+"</"+c+">"},"");this.formatting_=[],this[this.mode_](o,u)}},ct.prototype.popOn=function(o,u){var h=this.nonDisplayed_[this.row_].text;h+=u,this.nonDisplayed_[this.row_].text=h},ct.prototype.rollUp=function(o,u){var h=this.displayed_[this.row_].text;h+=u,this.displayed_[this.row_].text=h},ct.prototype.shiftRowsUp_=function(){var o;for(o=0;o<this.topRow_;o++)this.displayed_[o]={text:"",indent:0,offset:0};for(o=this.row_+1;o<sa+1;o++)this.displayed_[o]={text:"",indent:0,offset:0};for(o=this.topRow_;o<this.row_;o++)this.displayed_[o]=this.displayed_[o+1];this.displayed_[this.row_]={text:"",indent:0,offset:0}},ct.prototype.paintOn=function(o,u){var h=this.displayed_[this.row_].text;h+=u,this.displayed_[this.row_].text=h};var Qd={CaptionStream:qt,Cea608Stream:ct,Cea708Stream:et},ra={H264_STREAM_TYPE:27,ADTS_STREAM_TYPE:15,METADATA_STREAM_TYPE:21},uv=t,cv=8589934592,dv=4294967296,Jd="shared",nl=function(o,u){var h=1;for(o>u&&(h=-1);Math.abs(u-o)>dv;)o+=h*cv;return o},sl=function(o){var u,h;sl.prototype.init.call(this),this.type_=o||Jd,this.push=function(c){if(c.type==="metadata"){this.trigger("data",c);return}this.type_!==Jd&&c.type!==this.type_||(h===void 0&&(h=c.dts),c.dts=nl(c.dts,h),c.pts=nl(c.pts,h),u=c.dts,this.trigger("data",c))},this.flush=function(){h=u,this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")},this.discontinuity=function(){h=void 0,u=void 0},this.reset=function(){this.discontinuity(),this.trigger("reset")}};sl.prototype=new uv;var Zd={TimestampRolloverStream:sl,handleRollover:nl},hv=(o,u,h)=>{if(!o)return-1;for(var c=h;c<o.length;c++)if(o[c]===u)return c;return-1},fv={typedArrayIndexOf:hv},aa=fv.typedArrayIndexOf,oa={Iso88591:0,Utf16:1,Utf16be:2,Utf8:3},eh=function(o,u,h){var c,f="";for(c=u;c<h;c++)f+="%"+("00"+o[c].toString(16)).slice(-2);return f},Vs=function(o,u,h){return decodeURIComponent(eh(o,u,h))},zs=function(o,u,h){return unescape(eh(o,u,h))},Hs=function(o){return o[0]<<21|o[1]<<14|o[2]<<7|o[3]},qs={APIC:function(o){var u=1,h,c,f="-->";o.data[0]===oa.Utf8&&(h=aa(o.data,0,u),!(h<0)&&(o.mimeType=zs(o.data,u,h),u=h+1,o.pictureType=o.data[u],u++,c=aa(o.data,0,u),!(c<0)&&(o.description=Vs(o.data,u,c),u=c+1,o.mimeType===f?o.url=zs(o.data,u,o.data.length):o.pictureData=o.data.subarray(u,o.data.length))))},"T*":function(o){o.data[0]===oa.Utf8&&(o.value=Vs(o.data,1,o.data.length).replace(/\0*$/,""),o.values=o.value.split("\0"))},TXXX:function(o){var u;o.data[0]===oa.Utf8&&(u=aa(o.data,0,1),u!==-1&&(o.description=Vs(o.data,1,u),o.value=Vs(o.data,u+1,o.data.length).replace(/\0*$/,""),o.data=o.value))},"W*":function(o){o.url=zs(o.data,0,o.data.length).replace(/\0.*$/,"")},WXXX:function(o){var u;o.data[0]===oa.Utf8&&(u=aa(o.data,0,1),u!==-1&&(o.description=Vs(o.data,1,u),o.url=zs(o.data,u+1,o.data.length).replace(/\0.*$/,"")))},PRIV:function(o){var u;for(u=0;u<o.data.length;u++)if(o.data[u]===0){o.owner=zs(o.data,0,u);break}o.privateData=o.data.subarray(u+1),o.data=o.privateData}},pv=function(o){var u,h,c=10,f=0,m=[];if(!(o.length<10||o[0]!==73||o[1]!==68||o[2]!==51)){f=Hs(o.subarray(6,10)),f+=10;var E=o[5]&64;E&&(c+=4,c+=Hs(o.subarray(10,14)),f-=Hs(o.subarray(16,20)));do{if(u=Hs(o.subarray(c+4,c+8)),u<1)break;h=String.fromCharCode(o[c],o[c+1],o[c+2],o[c+3]);var C={id:h,data:o.subarray(c+10,c+u+10)};C.key=C.id,qs[C.id]?qs[C.id](C):C.id[0]==="T"?qs["T*"](C):C.id[0]==="W"&&qs["W*"](C),m.push(C),c+=10,c+=u}while(c<f);return m}},th={parseId3Frames:pv,parseSyncSafeInteger:Hs,frameParsers:qs},mv=t,gv=ra,tn=th,la;la=function(o){var u={descriptor:o&&o.descriptor},h=0,c=[],f=0,m;if(la.prototype.init.call(this),this.dispatchType=gv.METADATA_STREAM_TYPE.toString(16),u.descriptor)for(m=0;m<u.descriptor.length;m++)this.dispatchType+=("00"+u.descriptor[m].toString(16)).slice(-2);this.push=function(E){var C,S,j,I,z,ve;if(E.type==="timed-metadata"){if(E.dataAlignmentIndicator&&(f=0,c.length=0),c.length===0&&(E.data.length<10||E.data[0]!==73||E.data[1]!==68||E.data[2]!==51)){this.trigger("log",{level:"warn",message:"Skipping unrecognized metadata packet"});return}if(c.push(E),f+=E.data.byteLength,c.length===1&&(h=tn.parseSyncSafeInteger(E.data.subarray(6,10)),h+=10),!(f<h)){for(C={data:new Uint8Array(h),frames:[],pts:c[0].pts,dts:c[0].dts},z=0;z<h;)C.data.set(c[0].data.subarray(0,h-z),z),z+=c[0].data.byteLength,f-=c[0].data.byteLength,c.shift();S=10,C.data[5]&64&&(S+=4,S+=tn.parseSyncSafeInteger(C.data.subarray(10,14)),h-=tn.parseSyncSafeInteger(C.data.subarray(16,20)));do{if(j=tn.parseSyncSafeInteger(C.data.subarray(S+4,S+8)),j<1){this.trigger("log",{level:"warn",message:"Malformed ID3 frame encountered. Skipping remaining metadata parsing."});break}if(ve=String.fromCharCode(C.data[S],C.data[S+1],C.data[S+2],C.data[S+3]),I={id:ve,data:C.data.subarray(S+10,S+j+10)},I.key=I.id,tn.frameParsers[I.id]?tn.frameParsers[I.id](I):I.id[0]==="T"?tn.frameParsers["T*"](I):I.id[0]==="W"&&tn.frameParsers["W*"](I),I.owner==="com.apple.streaming.transportStreamTimestamp"){var Q=I.data,Ie=(Q[3]&1)<<30|Q[4]<<22|Q[5]<<14|Q[6]<<6|Q[7]>>>2;Ie*=4,Ie+=Q[7]&3,I.timeStamp=Ie,C.pts===void 0&&C.dts===void 0&&(C.pts=I.timeStamp,C.dts=I.timeStamp),this.trigger("timestamp",I)}C.frames.push(I),S+=10,S+=j}while(S<h);this.trigger("data",C)}}}},la.prototype=new mv;var vv=la,rl=t,al=Qd,pi=ra,Av=Zd.TimestampRolloverStream,ua,Ws,ca,is=188,ol=71;ua=function(){var o=new Uint8Array(is),u=0;ua.prototype.init.call(this),this.push=function(h){var c=0,f=is,m;for(u?(m=new Uint8Array(h.byteLength+u),m.set(o.subarray(0,u)),m.set(h,u),u=0):m=h;f<m.byteLength;){if(m[c]===ol&&m[f]===ol){this.trigger("data",m.subarray(c,f)),c+=is,f+=is;continue}c++,f++}c<m.byteLength&&(o.set(m.subarray(c),0),u=m.byteLength-c)},this.flush=function(){u===is&&o[0]===ol&&(this.trigger("data",o),u=0),this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")},this.reset=function(){u=0,this.trigger("reset")}},ua.prototype=new rl,Ws=function(){var o,u,h,c;Ws.prototype.init.call(this),c=this,this.packetsWaitingForPmt=[],this.programMapTable=void 0,o=function(f,m){var E=0;m.payloadUnitStartIndicator&&(E+=f[E]+1),m.type==="pat"?u(f.subarray(E),m):h(f.subarray(E),m)},u=function(f,m){m.section_number=f[7],m.last_section_number=f[8],c.pmtPid=(f[10]&31)<<8|f[11],m.pmtPid=c.pmtPid},h=function(f,m){var E,C,S,j;if(f[5]&1){for(c.programMapTable={video:null,audio:null,"timed-metadata":{}},E=(f[1]&15)<<8|f[2],C=3+E-4,S=(f[10]&15)<<8|f[11],j=12+S;j<C;){var I=f[j],z=(f[j+1]&31)<<8|f[j+2];I===pi.H264_STREAM_TYPE&&c.programMapTable.video===null?c.programMapTable.video=z:I===pi.ADTS_STREAM_TYPE&&c.programMapTable.audio===null?c.programMapTable.audio=z:I===pi.METADATA_STREAM_TYPE&&(c.programMapTable["timed-metadata"][z]=I),j+=((f[j+3]&15)<<8|f[j+4])+5}m.programMapTable=c.programMapTable}},this.push=function(f){var m={},E=4;if(m.payloadUnitStartIndicator=!!(f[1]&64),m.pid=f[1]&31,m.pid<<=8,m.pid|=f[2],(f[3]&48)>>>4>1&&(E+=f[E]+1),m.pid===0)m.type="pat",o(f.subarray(E),m),this.trigger("data",m);else if(m.pid===this.pmtPid)for(m.type="pmt",o(f.subarray(E),m),this.trigger("data",m);this.packetsWaitingForPmt.length;)this.processPes_.apply(this,this.packetsWaitingForPmt.shift());else this.programMapTable===void 0?this.packetsWaitingForPmt.push([f,E,m]):this.processPes_(f,E,m)},this.processPes_=function(f,m,E){E.pid===this.programMapTable.video?E.streamType=pi.H264_STREAM_TYPE:E.pid===this.programMapTable.audio?E.streamType=pi.ADTS_STREAM_TYPE:E.streamType=this.programMapTable["timed-metadata"][E.pid],E.type="pes",E.data=f.subarray(m),this.trigger("data",E)}},Ws.prototype=new rl,Ws.STREAM_TYPES={h264:27,adts:15},ca=function(){var o=this,u=!1,h={data:[],size:0},c={data:[],size:0},f={data:[],size:0},m,E=function(S,j){var I;const z=S[0]<<16|S[1]<<8|S[2];j.data=new Uint8Array,z===1&&(j.packetLength=6+(S[4]<<8|S[5]),j.dataAlignmentIndicator=(S[6]&4)!==0,I=S[7],I&192&&(j.pts=(S[9]&14)<<27|(S[10]&255)<<20|(S[11]&254)<<12|(S[12]&255)<<5|(S[13]&254)>>>3,j.pts*=4,j.pts+=(S[13]&6)>>>1,j.dts=j.pts,I&64&&(j.dts=(S[14]&14)<<27|(S[15]&255)<<20|(S[16]&254)<<12|(S[17]&255)<<5|(S[18]&254)>>>3,j.dts*=4,j.dts+=(S[18]&6)>>>1)),j.data=S.subarray(9+S[8]))},C=function(S,j,I){var z=new Uint8Array(S.size),ve={type:j},Q=0,Ie=0,Ne=!1,Tt;if(!(!S.data.length||S.size<9)){for(ve.trackId=S.data[0].pid,Q=0;Q<S.data.length;Q++)Tt=S.data[Q],z.set(Tt.data,Ie),Ie+=Tt.data.byteLength;E(z,ve),Ne=j==="video"||ve.packetLength<=S.size,(I||Ne)&&(S.size=0,S.data.length=0),Ne&&o.trigger("data",ve)}};ca.prototype.init.call(this),this.push=function(S){({pat:function(){},pes:function(){var j,I;switch(S.streamType){case pi.H264_STREAM_TYPE:j=h,I="video";break;case pi.ADTS_STREAM_TYPE:j=c,I="audio";break;case pi.METADATA_STREAM_TYPE:j=f,I="timed-metadata";break;default:return}S.payloadUnitStartIndicator&&C(j,I,!0),j.data.push(S),j.size+=S.data.byteLength},pmt:function(){var j={type:"metadata",tracks:[]};m=S.programMapTable,m.video!==null&&j.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+m.video,codec:"avc",type:"video"}),m.audio!==null&&j.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+m.audio,codec:"adts",type:"audio"}),u=!0,o.trigger("data",j)}})[S.type]()},this.reset=function(){h.size=0,h.data.length=0,c.size=0,c.data.length=0,this.trigger("reset")},this.flushStreams_=function(){C(h,"video"),C(c,"audio"),C(f,"timed-metadata")},this.flush=function(){if(!u&&m){var S={type:"metadata",tracks:[]};m.video!==null&&S.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+m.video,codec:"avc",type:"video"}),m.audio!==null&&S.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+m.audio,codec:"adts",type:"audio"}),o.trigger("data",S)}u=!1,this.flushStreams_(),this.trigger("done")}},ca.prototype=new rl;var ih={PAT_PID:0,MP2T_PACKET_LENGTH:is,TransportPacketStream:ua,TransportParseStream:Ws,ElementaryStream:ca,TimestampRolloverStream:Av,CaptionStream:al.CaptionStream,Cea608Stream:al.Cea608Stream,Cea708Stream:al.Cea708Stream,MetadataStream:vv};for(var ll in pi)pi.hasOwnProperty(ll)&&(ih[ll]=pi[ll]);var yv=ih,_v=t,bv=ot.ONE_SECOND_IN_TS,da,nh=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];da=function(o){var u,h=0;da.prototype.init.call(this),this.skipWarn_=function(c,f){this.trigger("log",{level:"warn",message:`adts skiping bytes ${c} to ${f} in frame ${h} outside syncword`})},this.push=function(c){var f=0,m,E,C,S,j;if(o||(h=0),c.type==="audio"){u&&u.length?(C=u,u=new Uint8Array(C.byteLength+c.data.byteLength),u.set(C),u.set(c.data,C.byteLength)):u=c.data;for(var I;f+7<u.length;){if(u[f]!==255||(u[f+1]&246)!==240){typeof I!="number"&&(I=f),f++;continue}if(typeof I=="number"&&(this.skipWarn_(I,f),I=null),E=(~u[f+1]&1)*2,m=(u[f+3]&3)<<11|u[f+4]<<3|(u[f+5]&224)>>5,S=((u[f+6]&3)+1)*1024,j=S*bv/nh[(u[f+2]&60)>>>2],u.byteLength-f<m)break;this.trigger("data",{pts:c.pts+h*j,dts:c.dts+h*j,sampleCount:S,audioobjecttype:(u[f+2]>>>6&3)+1,channelcount:(u[f+2]&1)<<2|(u[f+3]&192)>>>6,samplerate:nh[(u[f+2]&60)>>>2],samplingfrequencyindex:(u[f+2]&60)>>>2,samplesize:16,data:u.subarray(f+7+E,f+m)}),h++,f+=m}typeof I=="number"&&(this.skipWarn_(I,f),I=null),u=u.subarray(f)}},this.flush=function(){h=0,this.trigger("done")},this.reset=function(){u=void 0,this.trigger("reset")},this.endTimeline=function(){u=void 0,this.trigger("endedtimeline")}},da.prototype=new _v;var Ev=da,sh;sh=function(o){var u=o.byteLength,h=0,c=0;this.length=function(){return 8*u},this.bitsAvailable=function(){return 8*u+c},this.loadWord=function(){var f=o.byteLength-u,m=new Uint8Array(4),E=Math.min(4,u);if(E===0)throw new Error("no bytes available");m.set(o.subarray(f,f+E)),h=new DataView(m.buffer).getUint32(0),c=E*8,u-=E},this.skipBits=function(f){var m;c>f?(h<<=f,c-=f):(f-=c,m=Math.floor(f/8),f-=m*8,u-=m,this.loadWord(),h<<=f,c-=f)},this.readBits=function(f){var m=Math.min(c,f),E=h>>>32-m;return c-=m,c>0?h<<=m:u>0&&this.loadWord(),m=f-m,m>0?E<<m|this.readBits(m):E},this.skipLeadingZeros=function(){var f;for(f=0;f<c;++f)if(h&2147483648>>>f)return h<<=f,c-=f,f;return this.loadWord(),f+this.skipLeadingZeros()},this.skipUnsignedExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.skipExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.readUnsignedExpGolomb=function(){var f=this.skipLeadingZeros();return this.readBits(f+1)-1},this.readExpGolomb=function(){var f=this.readUnsignedExpGolomb();return 1&f?1+f>>>1:-1*(f>>>1)},this.readBoolean=function(){return this.readBits(1)===1},this.readUnsignedByte=function(){return this.readBits(8)},this.loadWord()};var Tv=sh,rh=t,Cv=Tv,ha,$s,ah;$s=function(){var o=0,u,h;$s.prototype.init.call(this),this.push=function(c){var f;h?(f=new Uint8Array(h.byteLength+c.data.byteLength),f.set(h),f.set(c.data,h.byteLength),h=f):h=c.data;for(var m=h.byteLength;o<m-3;o++)if(h[o+2]===1){u=o+5;break}for(;u<m;)switch(h[u]){case 0:if(h[u-1]!==0){u+=2;break}else if(h[u-2]!==0){u++;break}o+3!==u-2&&this.trigger("data",h.subarray(o+3,u-2));do u++;while(h[u]!==1&&u<m);o=u-2,u+=3;break;case 1:if(h[u-1]!==0||h[u-2]!==0){u+=3;break}this.trigger("data",h.subarray(o+3,u-2)),o=u-2,u+=3;break;default:u+=3;break}h=h.subarray(o),u-=o,o=0},this.reset=function(){h=null,o=0,this.trigger("reset")},this.flush=function(){h&&h.byteLength>3&&this.trigger("data",h.subarray(o+3)),h=null,o=0,this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")}},$s.prototype=new rh,ah={100:!0,110:!0,122:!0,244:!0,44:!0,83:!0,86:!0,118:!0,128:!0,138:!0,139:!0,134:!0},ha=function(){var o=new $s,u,h,c,f,m,E,C;ha.prototype.init.call(this),u=this,this.push=function(S){S.type==="video"&&(h=S.trackId,c=S.pts,f=S.dts,o.push(S))},o.on("data",function(S){var j={trackId:h,pts:c,dts:f,data:S,nalUnitTypeCode:S[0]&31};switch(j.nalUnitTypeCode){case 5:j.nalUnitType="slice_layer_without_partitioning_rbsp_idr";break;case 6:j.nalUnitType="sei_rbsp",j.escapedRBSP=m(S.subarray(1));break;case 7:j.nalUnitType="seq_parameter_set_rbsp",j.escapedRBSP=m(S.subarray(1)),j.config=E(j.escapedRBSP);break;case 8:j.nalUnitType="pic_parameter_set_rbsp";break;case 9:j.nalUnitType="access_unit_delimiter_rbsp";break}u.trigger("data",j)}),o.on("done",function(){u.trigger("done")}),o.on("partialdone",function(){u.trigger("partialdone")}),o.on("reset",function(){u.trigger("reset")}),o.on("endedtimeline",function(){u.trigger("endedtimeline")}),this.flush=function(){o.flush()},this.partialFlush=function(){o.partialFlush()},this.reset=function(){o.reset()},this.endTimeline=function(){o.endTimeline()},C=function(S,j){var I=8,z=8,ve,Q;for(ve=0;ve<S;ve++)z!==0&&(Q=j.readExpGolomb(),z=(I+Q+256)%256),I=z===0?I:z},m=function(S){for(var j=S.byteLength,I=[],z=1,ve,Q;z<j-2;)S[z]===0&&S[z+1]===0&&S[z+2]===3?(I.push(z+2),z+=2):z++;if(I.length===0)return S;ve=j-I.length,Q=new Uint8Array(ve);var Ie=0;for(z=0;z<ve;Ie++,z++)Ie===I[0]&&(Ie++,I.shift()),Q[z]=S[Ie];return Q},E=function(S){var j=0,I=0,z=0,ve=0,Q,Ie,Ne,Tt,oi,Cn,Oh,Lh,Rh,yl,Nh,yt=[1,1],Mh,xn;if(Q=new Cv(S),Ie=Q.readUnsignedByte(),Tt=Q.readUnsignedByte(),Ne=Q.readUnsignedByte(),Q.skipUnsignedExpGolomb(),ah[Ie]&&(oi=Q.readUnsignedExpGolomb(),oi===3&&Q.skipBits(1),Q.skipUnsignedExpGolomb(),Q.skipUnsignedExpGolomb(),Q.skipBits(1),Q.readBoolean()))for(Nh=oi!==3?8:12,xn=0;xn<Nh;xn++)Q.readBoolean()&&(xn<6?C(16,Q):C(64,Q));if(Q.skipUnsignedExpGolomb(),Cn=Q.readUnsignedExpGolomb(),Cn===0)Q.readUnsignedExpGolomb();else if(Cn===1)for(Q.skipBits(1),Q.skipExpGolomb(),Q.skipExpGolomb(),Oh=Q.readUnsignedExpGolomb(),xn=0;xn<Oh;xn++)Q.skipExpGolomb();if(Q.skipUnsignedExpGolomb(),Q.skipBits(1),Lh=Q.readUnsignedExpGolomb(),Rh=Q.readUnsignedExpGolomb(),yl=Q.readBits(1),yl===0&&Q.skipBits(1),Q.skipBits(1),Q.readBoolean()&&(j=Q.readUnsignedExpGolomb(),I=Q.readUnsignedExpGolomb(),z=Q.readUnsignedExpGolomb(),ve=Q.readUnsignedExpGolomb()),Q.readBoolean()&&Q.readBoolean()){switch(Mh=Q.readUnsignedByte(),Mh){case 1:yt=[1,1];break;case 2:yt=[12,11];break;case 3:yt=[10,11];break;case 4:yt=[16,11];break;case 5:yt=[40,33];break;case 6:yt=[24,11];break;case 7:yt=[20,11];break;case 8:yt=[32,11];break;case 9:yt=[80,33];break;case 10:yt=[18,11];break;case 11:yt=[15,11];break;case 12:yt=[64,33];break;case 13:yt=[160,99];break;case 14:yt=[4,3];break;case 15:yt=[3,2];break;case 16:yt=[2,1];break;case 255:{yt=[Q.readUnsignedByte()<<8|Q.readUnsignedByte(),Q.readUnsignedByte()<<8|Q.readUnsignedByte()];break}}yt&&yt[0]/yt[1]}return{profileIdc:Ie,levelIdc:Ne,profileCompatibility:Tt,width:(Lh+1)*16-j*2-I*2,height:(2-yl)*(Rh+1)*16-z*2-ve*2,sarRatio:yt}}},ha.prototype=new rh;var xv={H264Stream:ha,NalByteStream:$s},Sv=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],oh=function(o,u){var h=o[u+6]<<21|o[u+7]<<14|o[u+8]<<7|o[u+9],c=o[u+5],f=(c&16)>>4;return h=h>=0?h:0,f?h+20:h+10},lh=function(o,u){return o.length-u<10||o[u]!==73||o[u+1]!==68||o[u+2]!==51?u:(u+=oh(o,u),lh(o,u))},jv=function(o){var u=lh(o,0);return o.length>=u+2&&(o[u]&255)===255&&(o[u+1]&240)===240&&(o[u+1]&22)===16},uh=function(o){return o[0]<<21|o[1]<<14|o[2]<<7|o[3]},Bv=function(o,u,h){var c,f="";for(c=u;c<h;c++)f+="%"+("00"+o[c].toString(16)).slice(-2);return f},wv=function(o,u,h){return unescape(Bv(o,u,h))},Dv=function(o,u){var h=(o[u+5]&224)>>5,c=o[u+4]<<3,f=o[u+3]&6144;return f|c|h},kv=function(o,u){return o[u]===73&&o[u+1]===68&&o[u+2]===51?"timed-metadata":o[u]&!0&&(o[u+1]&240)===240?"audio":null},Iv=function(o){for(var u=0;u+5<o.length;){if(o[u]!==255||(o[u+1]&246)!==240){u++;continue}return Sv[(o[u+2]&60)>>>2]}return null},Pv=function(o){var u,h,c,f;u=10,o[5]&64&&(u+=4,u+=uh(o.subarray(10,14)));do{if(h=uh(o.subarray(u+4,u+8)),h<1)return null;if(f=String.fromCharCode(o[u],o[u+1],o[u+2],o[u+3]),f==="PRIV"){c=o.subarray(u+10,u+h+10);for(var m=0;m<c.byteLength;m++)if(c[m]===0){var E=wv(c,0,m);if(E==="com.apple.streaming.transportStreamTimestamp"){var C=c.subarray(m+1),S=(C[3]&1)<<30|C[4]<<22|C[5]<<14|C[6]<<6|C[7]>>>2;return S*=4,S+=C[7]&3,S}break}}u+=10,u+=h}while(u<o.byteLength);return null},ul={isLikelyAacData:jv,parseId3TagSize:oh,parseAdtsSize:Dv,parseType:kv,parseSampleRate:Iv,parseAacTimestamp:Pv},Ov=t,ch=ul,fa;fa=function(){var o=new Uint8Array,u=0;fa.prototype.init.call(this),this.setTimestamp=function(h){u=h},this.push=function(h){var c=0,f=0,m,E,C,S;for(o.length?(S=o.length,o=new Uint8Array(h.byteLength+S),o.set(o.subarray(0,S)),o.set(h,S)):o=h;o.length-f>=3;){if(o[f]===73&&o[f+1]===68&&o[f+2]===51){if(o.length-f<10||(c=ch.parseId3TagSize(o,f),f+c>o.length))break;E={type:"timed-metadata",data:o.subarray(f,f+c)},this.trigger("data",E),f+=c;continue}else if((o[f]&255)===255&&(o[f+1]&240)===240){if(o.length-f<7||(c=ch.parseAdtsSize(o,f),f+c>o.length))break;C={type:"audio",data:o.subarray(f,f+c),pts:u,dts:u},this.trigger("data",C),f+=c;continue}f++}m=o.length-f,m>0?o=o.subarray(f):o=new Uint8Array},this.reset=function(){o=new Uint8Array,this.trigger("reset")},this.endTimeline=function(){o=new Uint8Array,this.trigger("endedtimeline")}},fa.prototype=new Ov;var Lv=fa,Rv=["audioobjecttype","channelcount","samplerate","samplingfrequencyindex","samplesize"],Nv=Rv,Mv=["width","height","profileIdc","levelIdc","profileCompatibility","sarRatio"],Fv=Mv,pa=t,Gs=D0,Ys=F0,ma=Y0,mi=Z0,Hi=yv,ga=ot,dh=Ev,Uv=xv.H264Stream,Vv=Lv,zv=ul.isLikelyAacData,Hv=ot.ONE_SECOND_IN_TS,cl=Nv,dl=Fv,Xs,ns,va,En,qv=function(o,u){u.stream=o,this.trigger("log",u)},hh=function(o,u){for(var h=Object.keys(u),c=0;c<h.length;c++){var f=h[c];f==="headOfPipeline"||!u[f].on||u[f].on("log",qv.bind(o,f))}},fh=function(o,u){var h;if(o.length!==u.length)return!1;for(h=0;h<o.length;h++)if(o[h]!==u[h])return!1;return!0},hl=function(o,u,h,c,f,m){var E=h-u,C=c-u,S=f-h;return{start:{dts:o,pts:o+E},end:{dts:o+C,pts:o+S},prependedContentDuration:m,baseMediaDecodeTime:o}};ns=function(o,u){var h=[],c,f=0,m=0,E=1/0;u=u||{},c=u.firstSequenceNumber||0,ns.prototype.init.call(this),this.push=function(C){mi.collectDtsInfo(o,C),o&&cl.forEach(function(S){o[S]=C[S]}),h.push(C)},this.setEarliestDts=function(C){f=C},this.setVideoBaseMediaDecodeTime=function(C){E=C},this.setAudioAppendStart=function(C){m=C},this.flush=function(){var C,S,j,I,z,ve,Q;if(h.length===0){this.trigger("done","AudioSegmentStream");return}C=ma.trimAdtsFramesByEarliestDts(h,o,f),o.baseMediaDecodeTime=mi.calculateTrackBaseMediaDecodeTime(o,u.keepOriginalTimestamps),Q=ma.prefixWithSilence(o,C,m,E),o.samples=ma.generateSampleTable(C),j=Gs.mdat(ma.concatenateFrameData(C)),h=[],S=Gs.moof(c,[o]),I=new Uint8Array(S.byteLength+j.byteLength),c++,I.set(S),I.set(j,S.byteLength),mi.clearDtsInfo(o),z=Math.ceil(Hv*1024/o.samplerate),C.length&&(ve=C.length*z,this.trigger("segmentTimingInfo",hl(ga.audioTsToVideoTs(o.baseMediaDecodeTime,o.samplerate),C[0].dts,C[0].pts,C[0].dts+ve,C[0].pts+ve,Q||0)),this.trigger("timingInfo",{start:C[0].pts,end:C[0].pts+ve})),this.trigger("data",{track:o,boxes:I}),this.trigger("done","AudioSegmentStream")},this.reset=function(){mi.clearDtsInfo(o),h=[],this.trigger("reset")}},ns.prototype=new pa,Xs=function(o,u){var h,c=[],f=[],m,E;u=u||{},h=u.firstSequenceNumber||0,Xs.prototype.init.call(this),delete o.minPTS,this.gopCache_=[],this.push=function(C){mi.collectDtsInfo(o,C),C.nalUnitType==="seq_parameter_set_rbsp"&&!m&&(m=C.config,o.sps=[C.data],dl.forEach(function(S){o[S]=m[S]},this)),C.nalUnitType==="pic_parameter_set_rbsp"&&!E&&(E=C.data,o.pps=[C.data]),c.push(C)},this.flush=function(){for(var C,S,j,I,z,ve,Q=0,Ie,Ne;c.length&&c[0].nalUnitType!=="access_unit_delimiter_rbsp";)c.shift();if(c.length===0){this.resetStream_(),this.trigger("done","VideoSegmentStream");return}if(C=Ys.groupNalsIntoFrames(c),j=Ys.groupFramesIntoGops(C),j[0][0].keyFrame||(S=this.getGopForFusion_(c[0],o),S?(Q=S.duration,j.unshift(S),j.byteLength+=S.byteLength,j.nalCount+=S.nalCount,j.pts=S.pts,j.dts=S.dts,j.duration+=S.duration):j=Ys.extendFirstKeyFrame(j)),f.length){var Tt;if(u.alignGopsAtEnd?Tt=this.alignGopsAtEnd_(j):Tt=this.alignGopsAtStart_(j),!Tt){this.gopCache_.unshift({gop:j.pop(),pps:o.pps,sps:o.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),c=[],this.resetStream_(),this.trigger("done","VideoSegmentStream");return}mi.clearDtsInfo(o),j=Tt}mi.collectDtsInfo(o,j),o.samples=Ys.generateSampleTable(j),z=Gs.mdat(Ys.concatenateNalData(j)),o.baseMediaDecodeTime=mi.calculateTrackBaseMediaDecodeTime(o,u.keepOriginalTimestamps),this.trigger("processedGopsInfo",j.map(function(oi){return{pts:oi.pts,dts:oi.dts,byteLength:oi.byteLength}})),Ie=j[0],Ne=j[j.length-1],this.trigger("segmentTimingInfo",hl(o.baseMediaDecodeTime,Ie.dts,Ie.pts,Ne.dts+Ne.duration,Ne.pts+Ne.duration,Q)),this.trigger("timingInfo",{start:j[0].pts,end:j[j.length-1].pts+j[j.length-1].duration}),this.gopCache_.unshift({gop:j.pop(),pps:o.pps,sps:o.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),c=[],this.trigger("baseMediaDecodeTime",o.baseMediaDecodeTime),this.trigger("timelineStartInfo",o.timelineStartInfo),I=Gs.moof(h,[o]),ve=new Uint8Array(I.byteLength+z.byteLength),h++,ve.set(I),ve.set(z,I.byteLength),this.trigger("data",{track:o,boxes:ve}),this.resetStream_(),this.trigger("done","VideoSegmentStream")},this.reset=function(){this.resetStream_(),c=[],this.gopCache_.length=0,f.length=0,this.trigger("reset")},this.resetStream_=function(){mi.clearDtsInfo(o),m=void 0,E=void 0},this.getGopForFusion_=function(C){var S=45e3,j=1e4,I=1/0,z,ve,Q,Ie,Ne;for(Ne=0;Ne<this.gopCache_.length;Ne++)Ie=this.gopCache_[Ne],Q=Ie.gop,!(!(o.pps&&fh(o.pps[0],Ie.pps[0]))||!(o.sps&&fh(o.sps[0],Ie.sps[0])))&&(Q.dts<o.timelineStartInfo.dts||(z=C.dts-Q.dts-Q.duration,z>=-j&&z<=S&&(!ve||I>z)&&(ve=Ie,I=z)));return ve?ve.gop:null},this.alignGopsAtStart_=function(C){var S,j,I,z,ve,Q,Ie,Ne;for(ve=C.byteLength,Q=C.nalCount,Ie=C.duration,S=j=0;S<f.length&&j<C.length&&(I=f[S],z=C[j],I.pts!==z.pts);){if(z.pts>I.pts){S++;continue}j++,ve-=z.byteLength,Q-=z.nalCount,Ie-=z.duration}return j===0?C:j===C.length?null:(Ne=C.slice(j),Ne.byteLength=ve,Ne.duration=Ie,Ne.nalCount=Q,Ne.pts=Ne[0].pts,Ne.dts=Ne[0].dts,Ne)},this.alignGopsAtEnd_=function(C){var S,j,I,z,ve,Q;for(S=f.length-1,j=C.length-1,ve=null,Q=!1;S>=0&&j>=0;){if(I=f[S],z=C[j],I.pts===z.pts){Q=!0;break}if(I.pts>z.pts){S--;continue}S===f.length-1&&(ve=j),j--}if(!Q&&ve===null)return null;var Ie;if(Q?Ie=j:Ie=ve,Ie===0)return C;var Ne=C.slice(Ie),Tt=Ne.reduce(function(oi,Cn){return oi.byteLength+=Cn.byteLength,oi.duration+=Cn.duration,oi.nalCount+=Cn.nalCount,oi},{byteLength:0,duration:0,nalCount:0});return Ne.byteLength=Tt.byteLength,Ne.duration=Tt.duration,Ne.nalCount=Tt.nalCount,Ne.pts=Ne[0].pts,Ne.dts=Ne[0].dts,Ne},this.alignGopsWith=function(C){f=C}},Xs.prototype=new pa,En=function(o,u){this.numberOfTracks=0,this.metadataStream=u,o=o||{},typeof o.remux!="undefined"?this.remuxTracks=!!o.remux:this.remuxTracks=!0,typeof o.keepOriginalTimestamps=="boolean"?this.keepOriginalTimestamps=o.keepOriginalTimestamps:this.keepOriginalTimestamps=!1,this.pendingTracks=[],this.videoTrack=null,this.pendingBoxes=[],this.pendingCaptions=[],this.pendingMetadata=[],this.pendingBytes=0,this.emittedTracks=0,En.prototype.init.call(this),this.push=function(h){if(h.content||h.text)return this.pendingCaptions.push(h);if(h.frames)return this.pendingMetadata.push(h);this.pendingTracks.push(h.track),this.pendingBytes+=h.boxes.byteLength,h.track.type==="video"&&(this.videoTrack=h.track,this.pendingBoxes.push(h.boxes)),h.track.type==="audio"&&(this.audioTrack=h.track,this.pendingBoxes.unshift(h.boxes))}},En.prototype=new pa,En.prototype.flush=function(o){var u=0,h={captions:[],captionStreams:{},metadata:[],info:{}},c,f,m,E=0,C;if(this.pendingTracks.length<this.numberOfTracks){if(o!=="VideoSegmentStream"&&o!=="AudioSegmentStream")return;if(this.remuxTracks)return;if(this.pendingTracks.length===0){this.emittedTracks++,this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0);return}}if(this.videoTrack?(E=this.videoTrack.timelineStartInfo.pts,dl.forEach(function(S){h.info[S]=this.videoTrack[S]},this)):this.audioTrack&&(E=this.audioTrack.timelineStartInfo.pts,cl.forEach(function(S){h.info[S]=this.audioTrack[S]},this)),this.videoTrack||this.audioTrack){for(this.pendingTracks.length===1?h.type=this.pendingTracks[0].type:h.type="combined",this.emittedTracks+=this.pendingTracks.length,m=Gs.initSegment(this.pendingTracks),h.initSegment=new Uint8Array(m.byteLength),h.initSegment.set(m),h.data=new Uint8Array(this.pendingBytes),C=0;C<this.pendingBoxes.length;C++)h.data.set(this.pendingBoxes[C],u),u+=this.pendingBoxes[C].byteLength;for(C=0;C<this.pendingCaptions.length;C++)c=this.pendingCaptions[C],c.startTime=ga.metadataTsToSeconds(c.startPts,E,this.keepOriginalTimestamps),c.endTime=ga.metadataTsToSeconds(c.endPts,E,this.keepOriginalTimestamps),h.captionStreams[c.stream]=!0,h.captions.push(c);for(C=0;C<this.pendingMetadata.length;C++)f=this.pendingMetadata[C],f.cueTime=ga.metadataTsToSeconds(f.pts,E,this.keepOriginalTimestamps),h.metadata.push(f);for(h.metadata.dispatchType=this.metadataStream.dispatchType,this.pendingTracks.length=0,this.videoTrack=null,this.pendingBoxes.length=0,this.pendingCaptions.length=0,this.pendingBytes=0,this.pendingMetadata.length=0,this.trigger("data",h),C=0;C<h.captions.length;C++)c=h.captions[C],this.trigger("caption",c);for(C=0;C<h.metadata.length;C++)f=h.metadata[C],this.trigger("id3Frame",f)}this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0)},En.prototype.setRemux=function(o){this.remuxTracks=o},va=function(o){var u=this,h=!0,c,f;va.prototype.init.call(this),o=o||{},this.baseMediaDecodeTime=o.baseMediaDecodeTime||0,this.transmuxPipeline_={},this.setupAacPipeline=function(){var m={};this.transmuxPipeline_=m,m.type="aac",m.metadataStream=new Hi.MetadataStream,m.aacStream=new Vv,m.audioTimestampRolloverStream=new Hi.TimestampRolloverStream("audio"),m.timedMetadataTimestampRolloverStream=new Hi.TimestampRolloverStream("timed-metadata"),m.adtsStream=new dh,m.coalesceStream=new En(o,m.metadataStream),m.headOfPipeline=m.aacStream,m.aacStream.pipe(m.audioTimestampRolloverStream).pipe(m.adtsStream),m.aacStream.pipe(m.timedMetadataTimestampRolloverStream).pipe(m.metadataStream).pipe(m.coalesceStream),m.metadataStream.on("timestamp",function(E){m.aacStream.setTimestamp(E.timeStamp)}),m.aacStream.on("data",function(E){E.type!=="timed-metadata"&&E.type!=="audio"||m.audioSegmentStream||(f=f||{timelineStartInfo:{baseMediaDecodeTime:u.baseMediaDecodeTime},codec:"adts",type:"audio"},m.coalesceStream.numberOfTracks++,m.audioSegmentStream=new ns(f,o),m.audioSegmentStream.on("log",u.getLogTrigger_("audioSegmentStream")),m.audioSegmentStream.on("timingInfo",u.trigger.bind(u,"audioTimingInfo")),m.adtsStream.pipe(m.audioSegmentStream).pipe(m.coalesceStream),u.trigger("trackinfo",{hasAudio:!!f,hasVideo:!!c}))}),m.coalesceStream.on("data",this.trigger.bind(this,"data")),m.coalesceStream.on("done",this.trigger.bind(this,"done")),hh(this,m)},this.setupTsPipeline=function(){var m={};this.transmuxPipeline_=m,m.type="ts",m.metadataStream=new Hi.MetadataStream,m.packetStream=new Hi.TransportPacketStream,m.parseStream=new Hi.TransportParseStream,m.elementaryStream=new Hi.ElementaryStream,m.timestampRolloverStream=new Hi.TimestampRolloverStream,m.adtsStream=new dh,m.h264Stream=new Uv,m.captionStream=new Hi.CaptionStream(o),m.coalesceStream=new En(o,m.metadataStream),m.headOfPipeline=m.packetStream,m.packetStream.pipe(m.parseStream).pipe(m.elementaryStream).pipe(m.timestampRolloverStream),m.timestampRolloverStream.pipe(m.h264Stream),m.timestampRolloverStream.pipe(m.adtsStream),m.timestampRolloverStream.pipe(m.metadataStream).pipe(m.coalesceStream),m.h264Stream.pipe(m.captionStream).pipe(m.coalesceStream),m.elementaryStream.on("data",function(E){var C;if(E.type==="metadata"){for(C=E.tracks.length;C--;)!c&&E.tracks[C].type==="video"?(c=E.tracks[C],c.timelineStartInfo.baseMediaDecodeTime=u.baseMediaDecodeTime):!f&&E.tracks[C].type==="audio"&&(f=E.tracks[C],f.timelineStartInfo.baseMediaDecodeTime=u.baseMediaDecodeTime);c&&!m.videoSegmentStream&&(m.coalesceStream.numberOfTracks++,m.videoSegmentStream=new Xs(c,o),m.videoSegmentStream.on("log",u.getLogTrigger_("videoSegmentStream")),m.videoSegmentStream.on("timelineStartInfo",function(S){f&&!o.keepOriginalTimestamps&&(f.timelineStartInfo=S,m.audioSegmentStream.setEarliestDts(S.dts-u.baseMediaDecodeTime))}),m.videoSegmentStream.on("processedGopsInfo",u.trigger.bind(u,"gopInfo")),m.videoSegmentStream.on("segmentTimingInfo",u.trigger.bind(u,"videoSegmentTimingInfo")),m.videoSegmentStream.on("baseMediaDecodeTime",function(S){f&&m.audioSegmentStream.setVideoBaseMediaDecodeTime(S)}),m.videoSegmentStream.on("timingInfo",u.trigger.bind(u,"videoTimingInfo")),m.h264Stream.pipe(m.videoSegmentStream).pipe(m.coalesceStream)),f&&!m.audioSegmentStream&&(m.coalesceStream.numberOfTracks++,m.audioSegmentStream=new ns(f,o),m.audioSegmentStream.on("log",u.getLogTrigger_("audioSegmentStream")),m.audioSegmentStream.on("timingInfo",u.trigger.bind(u,"audioTimingInfo")),m.audioSegmentStream.on("segmentTimingInfo",u.trigger.bind(u,"audioSegmentTimingInfo")),m.adtsStream.pipe(m.audioSegmentStream).pipe(m.coalesceStream)),u.trigger("trackinfo",{hasAudio:!!f,hasVideo:!!c})}}),m.coalesceStream.on("data",this.trigger.bind(this,"data")),m.coalesceStream.on("id3Frame",function(E){E.dispatchType=m.metadataStream.dispatchType,u.trigger("id3Frame",E)}),m.coalesceStream.on("caption",this.trigger.bind(this,"caption")),m.coalesceStream.on("done",this.trigger.bind(this,"done")),hh(this,m)},this.setBaseMediaDecodeTime=function(m){var E=this.transmuxPipeline_;o.keepOriginalTimestamps||(this.baseMediaDecodeTime=m),f&&(f.timelineStartInfo.dts=void 0,f.timelineStartInfo.pts=void 0,mi.clearDtsInfo(f),E.audioTimestampRolloverStream&&E.audioTimestampRolloverStream.discontinuity()),c&&(E.videoSegmentStream&&(E.videoSegmentStream.gopCache_=[]),c.timelineStartInfo.dts=void 0,c.timelineStartInfo.pts=void 0,mi.clearDtsInfo(c),E.captionStream.reset()),E.timestampRolloverStream&&E.timestampRolloverStream.discontinuity()},this.setAudioAppendStart=function(m){f&&this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(m)},this.setRemux=function(m){var E=this.transmuxPipeline_;o.remux=m,E&&E.coalesceStream&&E.coalesceStream.setRemux(m)},this.alignGopsWith=function(m){c&&this.transmuxPipeline_.videoSegmentStream&&this.transmuxPipeline_.videoSegmentStream.alignGopsWith(m)},this.getLogTrigger_=function(m){var E=this;return function(C){C.stream=m,E.trigger("log",C)}},this.push=function(m){if(h){var E=zv(m);E&&this.transmuxPipeline_.type!=="aac"?this.setupAacPipeline():!E&&this.transmuxPipeline_.type!=="ts"&&this.setupTsPipeline(),h=!1}this.transmuxPipeline_.headOfPipeline.push(m)},this.flush=function(){h=!0,this.transmuxPipeline_.headOfPipeline.flush()},this.endTimeline=function(){this.transmuxPipeline_.headOfPipeline.endTimeline()},this.reset=function(){this.transmuxPipeline_.headOfPipeline&&this.transmuxPipeline_.headOfPipeline.reset()},this.resetCaptions=function(){this.transmuxPipeline_.captionStream&&this.transmuxPipeline_.captionStream.reset()}},va.prototype=new pa;var Wv={Transmuxer:va,VideoSegmentStream:Xs,AudioSegmentStream:ns,AUDIO_PROPERTIES:cl,VIDEO_PROPERTIES:dl,generateSegmentTimingInfo:hl},$v=function(o){return o>>>0},Gv=function(o){return("00"+o.toString(16)).slice(-2)},Aa={toUnsigned:$v,toHexString:Gv},Yv=function(o){var u="";return u+=String.fromCharCode(o[0]),u+=String.fromCharCode(o[1]),u+=String.fromCharCode(o[2]),u+=String.fromCharCode(o[3]),u},ph=Yv,Xv=Aa.toUnsigned,Kv=ph,mh=function(o,u){var h=[],c,f,m,E,C;if(!u.length)return null;for(c=0;c<o.byteLength;)f=Xv(o[c]<<24|o[c+1]<<16|o[c+2]<<8|o[c+3]),m=Kv(o.subarray(c+4,c+8)),E=f>1?c+f:o.byteLength,m===u[0]&&(u.length===1?h.push(o.subarray(c+8,E)):(C=mh(o.subarray(c+8,E),u.slice(1)),C.length&&(h=h.concat(C)))),c=E;return h},gh=mh,Qv=Aa.toUnsigned,Jv=r.getUint64,Zv=function(o){var u={version:o[0],flags:new Uint8Array(o.subarray(1,4))};return u.version===1?u.baseMediaDecodeTime=Jv(o.subarray(4)):u.baseMediaDecodeTime=Qv(o[4]<<24|o[5]<<16|o[6]<<8|o[7]),u},vh=Zv,eA=function(o){return{isLeading:(o[0]&12)>>>2,dependsOn:o[0]&3,isDependedOn:(o[1]&192)>>>6,hasRedundancy:(o[1]&48)>>>4,paddingValue:(o[1]&14)>>>1,isNonSyncSample:o[1]&1,degradationPriority:o[2]<<8|o[3]}},tA=eA,Ah=tA,iA=function(o){var u={version:o[0],flags:new Uint8Array(o.subarray(1,4)),samples:[]},h=new DataView(o.buffer,o.byteOffset,o.byteLength),c=u.flags[2]&1,f=u.flags[2]&4,m=u.flags[1]&1,E=u.flags[1]&2,C=u.flags[1]&4,S=u.flags[1]&8,j=h.getUint32(4),I=8,z;for(c&&(u.dataOffset=h.getInt32(I),I+=4),f&&j&&(z={flags:Ah(o.subarray(I,I+4))},I+=4,m&&(z.duration=h.getUint32(I),I+=4),E&&(z.size=h.getUint32(I),I+=4),S&&(u.version===1?z.compositionTimeOffset=h.getInt32(I):z.compositionTimeOffset=h.getUint32(I),I+=4),u.samples.push(z),j--);j--;)z={},m&&(z.duration=h.getUint32(I),I+=4),E&&(z.size=h.getUint32(I),I+=4),C&&(z.flags=Ah(o.subarray(I,I+4)),I+=4),S&&(u.version===1?z.compositionTimeOffset=h.getInt32(I):z.compositionTimeOffset=h.getUint32(I),I+=4),u.samples.push(z);return u},yh=iA,nA=function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),h={version:o[0],flags:new Uint8Array(o.subarray(1,4)),trackId:u.getUint32(4)},c=h.flags[2]&1,f=h.flags[2]&2,m=h.flags[2]&8,E=h.flags[2]&16,C=h.flags[2]&32,S=h.flags[0]&65536,j=h.flags[0]&131072,I;return I=8,c&&(I+=4,h.baseDataOffset=u.getUint32(12),I+=4),f&&(h.sampleDescriptionIndex=u.getUint32(I),I+=4),m&&(h.defaultSampleDuration=u.getUint32(I),I+=4),E&&(h.defaultSampleSize=u.getUint32(I),I+=4),C&&(h.defaultSampleFlags=u.getUint32(I)),S&&(h.durationIsEmpty=!0),!c&&j&&(h.baseDataOffsetIsMoof=!0),h},_h=nA,Ks;typeof window!="undefined"?Ks=window:typeof n!="undefined"?Ks=n:typeof self!="undefined"?Ks=self:Ks={};var bh=Ks,sA=Kd.discardEmulationPreventionBytes,rA=Qd.CaptionStream,Qs=gh,aA=vh,oA=yh,lA=_h,Eh=bh,uA=function(o,u){for(var h=o,c=0;c<u.length;c++){var f=u[c];if(h<f.size)return f;h-=f.size}return null},cA=function(o,u,h){var c=new DataView(o.buffer,o.byteOffset,o.byteLength),f={logs:[],seiNals:[]},m,E,C,S;for(E=0;E+4<o.length;E+=C)if(C=c.getUint32(E),E+=4,!(C<=0))switch(o[E]&31){case 6:var j=o.subarray(E+1,E+1+C),I=uA(E,u);if(m={nalUnitType:"sei_rbsp",size:C,data:j,escapedRBSP:sA(j),trackId:h},I)m.pts=I.pts,m.dts=I.dts,S=I;else if(S)m.pts=S.pts,m.dts=S.dts;else{f.logs.push({level:"warn",message:"We've encountered a nal unit without data at "+E+" for trackId "+h+". See mux.js#223."});break}f.seiNals.push(m);break}return f},dA=function(o,u,h){var c=u,f=h.defaultSampleDuration||0,m=h.defaultSampleSize||0,E=h.trackId,C=[];return o.forEach(function(S){var j=oA(S),I=j.samples;I.forEach(function(z){z.duration===void 0&&(z.duration=f),z.size===void 0&&(z.size=m),z.trackId=E,z.dts=c,z.compositionTimeOffset===void 0&&(z.compositionTimeOffset=0),typeof c=="bigint"?(z.pts=c+Eh.BigInt(z.compositionTimeOffset),c+=Eh.BigInt(z.duration)):(z.pts=c+z.compositionTimeOffset,c+=z.duration)}),C=C.concat(I)}),C},hA=function(o,u){var h=Qs(o,["moof","traf"]),c=Qs(o,["mdat"]),f={},m=[];return c.forEach(function(E,C){var S=h[C];m.push({mdat:E,traf:S})}),m.forEach(function(E){var C=E.mdat,S=E.traf,j=Qs(S,["tfhd"]),I=lA(j[0]),z=I.trackId,ve=Qs(S,["tfdt"]),Q=ve.length>0?aA(ve[0]).baseMediaDecodeTime:0,Ie=Qs(S,["trun"]),Ne,Tt;u===z&&Ie.length>0&&(Ne=dA(Ie,Q,I),Tt=cA(C,Ne,z),f[z]||(f[z]={seiNals:[],logs:[]}),f[z].seiNals=f[z].seiNals.concat(Tt.seiNals),f[z].logs=f[z].logs.concat(Tt.logs))}),f},fA=function(o,u,h){var c;if(u===null)return null;c=hA(o,u);var f=c[u]||{};return{seiNals:f.seiNals,logs:f.logs,timescale:h}},pA=function(){var o=!1,u,h,c,f,m,E;this.isInitialized=function(){return o},this.init=function(C){u=new rA,o=!0,E=C?C.isPartial:!1,u.on("data",function(S){S.startTime=S.startPts/f,S.endTime=S.endPts/f,m.captions.push(S),m.captionStreams[S.stream]=!0}),u.on("log",function(S){m.logs.push(S)})},this.isNewInit=function(C,S){return C&&C.length===0||S&&typeof S=="object"&&Object.keys(S).length===0?!1:c!==C[0]||f!==S[c]},this.parse=function(C,S,j){var I;if(this.isInitialized()){if(!S||!j)return null;if(this.isNewInit(S,j))c=S[0],f=j[c];else if(c===null||!f)return h.push(C),null}else return null;for(;h.length>0;){var z=h.shift();this.parse(z,S,j)}return I=fA(C,c,f),I&&I.logs&&(m.logs=m.logs.concat(I.logs)),I===null||!I.seiNals?m.logs.length?{logs:m.logs,captions:[],captionStreams:[]}:null:(this.pushNals(I.seiNals),this.flushStream(),m)},this.pushNals=function(C){if(!this.isInitialized()||!C||C.length===0)return null;C.forEach(function(S){u.push(S)})},this.flushStream=function(){if(!this.isInitialized())return null;E?u.partialFlush():u.flush()},this.clearParsedCaptions=function(){m.captions=[],m.captionStreams={},m.logs=[]},this.resetCaptionStream=function(){if(!this.isInitialized())return null;u.reset()},this.clearAllCaptions=function(){this.clearParsedCaptions(),this.resetCaptionStream()},this.reset=function(){h=[],c=null,f=null,m?this.clearParsedCaptions():m={captions:[],captionStreams:{},logs:[]},this.resetCaptionStream()},this.reset()},mA=pA,gA=function(o){for(var u=0,h=String.fromCharCode(o[u]),c="";h!=="\0";)c+=h,u++,h=String.fromCharCode(o[u]);return c+=h,c},vA={uint8ToCString:gA},ya=vA.uint8ToCString,AA=r.getUint64,yA=function(o){var u=4,h=o[0],c,f,m,E,C,S,j,I;if(h===0){c=ya(o.subarray(u)),u+=c.length,f=ya(o.subarray(u)),u+=f.length;var z=new DataView(o.buffer);m=z.getUint32(u),u+=4,C=z.getUint32(u),u+=4,S=z.getUint32(u),u+=4,j=z.getUint32(u),u+=4}else if(h===1){var z=new DataView(o.buffer);m=z.getUint32(u),u+=4,E=AA(o.subarray(u)),u+=8,S=z.getUint32(u),u+=4,j=z.getUint32(u),u+=4,c=ya(o.subarray(u)),u+=c.length,f=ya(o.subarray(u)),u+=f.length}I=new Uint8Array(o.subarray(u,o.byteLength));var ve={scheme_id_uri:c,value:f,timescale:m||1,presentation_time:E,presentation_time_delta:C,event_duration:S,id:j,message_data:I};return bA(h,ve)?ve:void 0},_A=function(o,u,h,c){return o||o===0?o/u:c+h/u},bA=function(o,u){var h=u.scheme_id_uri!=="\0",c=o===0&&Th(u.presentation_time_delta)&&h,f=o===1&&Th(u.presentation_time)&&h;return!(o>1)&&c||f},Th=function(o){return o!==void 0||o!==null},EA={parseEmsgBox:yA,scaleTime:_A},_a=Aa.toUnsigned,Js=Aa.toHexString,At=gh,ss=ph,fl=EA,TA=_h,CA=yh,xA=vh,SA=r.getUint64,Ch,xh,Sh,jh,Bh,pl,wh,ml=bh,jA=th.parseId3Frames;Ch=function(o){var u={},h=At(o,["moov","trak"]);return h.reduce(function(c,f){var m,E,C,S,j;return m=At(f,["tkhd"])[0],!m||(E=m[0],C=E===0?12:20,S=_a(m[C]<<24|m[C+1]<<16|m[C+2]<<8|m[C+3]),j=At(f,["mdia","mdhd"])[0],!j)?null:(E=j[0],C=E===0?12:20,c[S]=_a(j[C]<<24|j[C+1]<<16|j[C+2]<<8|j[C+3]),c)},u)},xh=function(o,u){var h;h=At(u,["moof","traf"]);var c=h.reduce(function(f,m){var E=At(m,["tfhd"])[0],C=_a(E[4]<<24|E[5]<<16|E[6]<<8|E[7]),S=o[C]||9e4,j=At(m,["tfdt"])[0],I=new DataView(j.buffer,j.byteOffset,j.byteLength),z;j[0]===1?z=SA(j.subarray(4,12)):z=I.getUint32(4);let ve;return typeof z=="bigint"?ve=z/ml.BigInt(S):typeof z=="number"&&!isNaN(z)&&(ve=z/S),ve<Number.MAX_SAFE_INTEGER&&(ve=Number(ve)),ve<f&&(f=ve),f},1/0);return typeof c=="bigint"||isFinite(c)?c:0},Sh=function(o,u){var h=At(u,["moof","traf"]),c=0,f=0,m;if(h&&h.length){var E=At(h[0],["tfhd"])[0],C=At(h[0],["trun"])[0],S=At(h[0],["tfdt"])[0];if(E){var j=TA(E);m=j.trackId}if(S){var I=xA(S);c=I.baseMediaDecodeTime}if(C){var z=CA(C);z.samples&&z.samples.length&&(f=z.samples[0].compositionTimeOffset||0)}}var ve=o[m]||9e4;typeof c=="bigint"&&(f=ml.BigInt(f),ve=ml.BigInt(ve));var Q=(c+f)/ve;return typeof Q=="bigint"&&Q<Number.MAX_SAFE_INTEGER&&(Q=Number(Q)),Q},jh=function(o){var u=At(o,["moov","trak"]),h=[];return u.forEach(function(c){var f=At(c,["mdia","hdlr"]),m=At(c,["tkhd"]);f.forEach(function(E,C){var S=ss(E.subarray(8,12)),j=m[C],I,z,ve;S==="vide"&&(I=new DataView(j.buffer,j.byteOffset,j.byteLength),z=I.getUint8(0),ve=z===0?I.getUint32(12):I.getUint32(20),h.push(ve))})}),h},pl=function(o){var u=o[0],h=u===0?12:20;return _a(o[h]<<24|o[h+1]<<16|o[h+2]<<8|o[h+3])},Bh=function(o){var u=At(o,["moov","trak"]),h=[];return u.forEach(function(c){var f={},m=At(c,["tkhd"])[0],E,C;m&&(E=new DataView(m.buffer,m.byteOffset,m.byteLength),C=E.getUint8(0),f.id=C===0?E.getUint32(12):E.getUint32(20));var S=At(c,["mdia","hdlr"])[0];if(S){var j=ss(S.subarray(8,12));j==="vide"?f.type="video":j==="soun"?f.type="audio":f.type=j}var I=At(c,["mdia","minf","stbl","stsd"])[0];if(I){var z=I.subarray(8);f.codec=ss(z.subarray(4,8));var ve=At(z,[f.codec])[0],Q,Ie;ve&&(/^[asm]vc[1-9]$/i.test(f.codec)?(Q=ve.subarray(78),Ie=ss(Q.subarray(4,8)),Ie==="avcC"&&Q.length>11?(f.codec+=".",f.codec+=Js(Q[9]),f.codec+=Js(Q[10]),f.codec+=Js(Q[11])):f.codec="avc1.4d400d"):/^mp4[a,v]$/i.test(f.codec)?(Q=ve.subarray(28),Ie=ss(Q.subarray(4,8)),Ie==="esds"&&Q.length>20&&Q[19]!==0?(f.codec+="."+Js(Q[19]),f.codec+="."+Js(Q[20]>>>2&63).replace(/^0/,"")):f.codec="mp4a.40.2"):f.codec=f.codec.toLowerCase())}var Ne=At(c,["mdia","mdhd"])[0];Ne&&(f.timescale=pl(Ne)),h.push(f)}),h},wh=function(o,u=0){var h=At(o,["emsg"]);return h.map(c=>{var f=fl.parseEmsgBox(new Uint8Array(c)),m=jA(f.message_data);return{cueTime:fl.scaleTime(f.presentation_time,f.timescale,f.presentation_time_delta,u),duration:fl.scaleTime(f.event_duration,f.timescale),frames:m}})};var gl={findBox:At,parseType:ss,timescale:Ch,startTime:xh,compositionStartTime:Sh,videoTrackIds:jh,tracks:Bh,getTimescaleFromMediaHeader:pl,getEmsgID3:wh},vl=ra,Dh=function(o){var u=o[1]&31;return u<<=8,u|=o[2],u},ba=function(o){return!!(o[1]&64)},Ea=function(o){var u=0;return(o[3]&48)>>>4>1&&(u+=o[4]+1),u},BA=function(o,u){var h=Dh(o);return h===0?"pat":h===u?"pmt":u?"pes":null},wA=function(o){var u=ba(o),h=4+Ea(o);return u&&(h+=o[h]+1),(o[h+10]&31)<<8|o[h+11]},DA=function(o){var u={},h=ba(o),c=4+Ea(o);if(h&&(c+=o[c]+1),!!(o[c+5]&1)){var f,m,E;f=(o[c+1]&15)<<8|o[c+2],m=3+f-4,E=(o[c+10]&15)<<8|o[c+11];for(var C=12+E;C<m;){var S=c+C;u[(o[S+1]&31)<<8|o[S+2]]=o[S],C+=((o[S+3]&15)<<8|o[S+4])+5}return u}},kA=function(o,u){var h=Dh(o),c=u[h];switch(c){case vl.H264_STREAM_TYPE:return"video";case vl.ADTS_STREAM_TYPE:return"audio";case vl.METADATA_STREAM_TYPE:return"timed-metadata";default:return null}},IA=function(o){var u=ba(o);if(!u)return null;var h=4+Ea(o);if(h>=o.byteLength)return null;var c=null,f;return f=o[h+7],f&192&&(c={},c.pts=(o[h+9]&14)<<27|(o[h+10]&255)<<20|(o[h+11]&254)<<12|(o[h+12]&255)<<5|(o[h+13]&254)>>>3,c.pts*=4,c.pts+=(o[h+13]&6)>>>1,c.dts=c.pts,f&64&&(c.dts=(o[h+14]&14)<<27|(o[h+15]&255)<<20|(o[h+16]&254)<<12|(o[h+17]&255)<<5|(o[h+18]&254)>>>3,c.dts*=4,c.dts+=(o[h+18]&6)>>>1)),c},Al=function(o){switch(o){case 5:return"slice_layer_without_partitioning_rbsp_idr";case 6:return"sei_rbsp";case 7:return"seq_parameter_set_rbsp";case 8:return"pic_parameter_set_rbsp";case 9:return"access_unit_delimiter_rbsp";default:return null}},PA=function(o){for(var u=4+Ea(o),h=o.subarray(u),c=0,f=0,m=!1,E;f<h.byteLength-3;f++)if(h[f+2]===1){c=f+5;break}for(;c<h.byteLength;)switch(h[c]){case 0:if(h[c-1]!==0){c+=2;break}else if(h[c-2]!==0){c++;break}f+3!==c-2&&(E=Al(h[f+3]&31),E==="slice_layer_without_partitioning_rbsp_idr"&&(m=!0));do c++;while(h[c]!==1&&c<h.length);f=c-2,c+=3;break;case 1:if(h[c-1]!==0||h[c-2]!==0){c+=3;break}E=Al(h[f+3]&31),E==="slice_layer_without_partitioning_rbsp_idr"&&(m=!0),f=c-2,c+=3;break;default:c+=3;break}return h=h.subarray(f),c-=f,f=0,h&&h.byteLength>3&&(E=Al(h[f+3]&31),E==="slice_layer_without_partitioning_rbsp_idr"&&(m=!0)),m},OA={parseType:BA,parsePat:wA,parsePmt:DA,parsePayloadUnitStartIndicator:ba,parsePesType:kA,parsePesTime:IA,videoPacketContainsKeyFrame:PA},kh=ra,rs=Zd.handleRollover,Je={};Je.ts=OA,Je.aac=ul;var Tn=ot.ONE_SECOND_IN_TS,Mt=188,Bi=71,LA=function(o,u){for(var h=0,c=Mt,f,m;c<o.byteLength;){if(o[h]===Bi&&o[c]===Bi){switch(f=o.subarray(h,c),m=Je.ts.parseType(f,u.pid),m){case"pat":u.pid=Je.ts.parsePat(f);break;case"pmt":var E=Je.ts.parsePmt(f);u.table=u.table||{},Object.keys(E).forEach(function(C){u.table[C]=E[C]});break}h+=Mt,c+=Mt;continue}h++,c++}},Ih=function(o,u,h){for(var c=0,f=Mt,m,E,C,S,j,I=!1;f<=o.byteLength;){if(o[c]===Bi&&(o[f]===Bi||f===o.byteLength)){switch(m=o.subarray(c,f),E=Je.ts.parseType(m,u.pid),E){case"pes":C=Je.ts.parsePesType(m,u.table),S=Je.ts.parsePayloadUnitStartIndicator(m),C==="audio"&&S&&(j=Je.ts.parsePesTime(m),j&&(j.type="audio",h.audio.push(j),I=!0));break}if(I)break;c+=Mt,f+=Mt;continue}c++,f++}for(f=o.byteLength,c=f-Mt,I=!1;c>=0;){if(o[c]===Bi&&(o[f]===Bi||f===o.byteLength)){switch(m=o.subarray(c,f),E=Je.ts.parseType(m,u.pid),E){case"pes":C=Je.ts.parsePesType(m,u.table),S=Je.ts.parsePayloadUnitStartIndicator(m),C==="audio"&&S&&(j=Je.ts.parsePesTime(m),j&&(j.type="audio",h.audio.push(j),I=!0));break}if(I)break;c-=Mt,f-=Mt;continue}c--,f--}},RA=function(o,u,h){for(var c=0,f=Mt,m,E,C,S,j,I,z,ve,Q=!1,Ie={data:[],size:0};f<o.byteLength;){if(o[c]===Bi&&o[f]===Bi){switch(m=o.subarray(c,f),E=Je.ts.parseType(m,u.pid),E){case"pes":if(C=Je.ts.parsePesType(m,u.table),S=Je.ts.parsePayloadUnitStartIndicator(m),C==="video"&&(S&&!Q&&(j=Je.ts.parsePesTime(m),j&&(j.type="video",h.video.push(j),Q=!0)),!h.firstKeyFrame)){if(S&&Ie.size!==0){for(I=new Uint8Array(Ie.size),z=0;Ie.data.length;)ve=Ie.data.shift(),I.set(ve,z),z+=ve.byteLength;if(Je.ts.videoPacketContainsKeyFrame(I)){var Ne=Je.ts.parsePesTime(I);Ne?(h.firstKeyFrame=Ne,h.firstKeyFrame.type="video"):console.warn("Failed to extract PTS/DTS from PES at first keyframe. This could be an unusual TS segment, or else mux.js did not parse your TS segment correctly. If you know your TS segments do contain PTS/DTS on keyframes please file a bug report! You can try ffprobe to double check for yourself.")}Ie.size=0}Ie.data.push(m),Ie.size+=m.byteLength}break}if(Q&&h.firstKeyFrame)break;c+=Mt,f+=Mt;continue}c++,f++}for(f=o.byteLength,c=f-Mt,Q=!1;c>=0;){if(o[c]===Bi&&o[f]===Bi){switch(m=o.subarray(c,f),E=Je.ts.parseType(m,u.pid),E){case"pes":C=Je.ts.parsePesType(m,u.table),S=Je.ts.parsePayloadUnitStartIndicator(m),C==="video"&&S&&(j=Je.ts.parsePesTime(m),j&&(j.type="video",h.video.push(j),Q=!0));break}if(Q)break;c-=Mt,f-=Mt;continue}c--,f--}},NA=function(o,u){if(o.audio&&o.audio.length){var h=u;(typeof h=="undefined"||isNaN(h))&&(h=o.audio[0].dts),o.audio.forEach(function(m){m.dts=rs(m.dts,h),m.pts=rs(m.pts,h),m.dtsTime=m.dts/Tn,m.ptsTime=m.pts/Tn})}if(o.video&&o.video.length){var c=u;if((typeof c=="undefined"||isNaN(c))&&(c=o.video[0].dts),o.video.forEach(function(m){m.dts=rs(m.dts,c),m.pts=rs(m.pts,c),m.dtsTime=m.dts/Tn,m.ptsTime=m.pts/Tn}),o.firstKeyFrame){var f=o.firstKeyFrame;f.dts=rs(f.dts,c),f.pts=rs(f.pts,c),f.dtsTime=f.dts/Tn,f.ptsTime=f.pts/Tn}}},MA=function(o){for(var u=!1,h=0,c=null,f=null,m=0,E=0,C;o.length-E>=3;){var S=Je.aac.parseType(o,E);switch(S){case"timed-metadata":if(o.length-E<10){u=!0;break}if(m=Je.aac.parseId3TagSize(o,E),m>o.length){u=!0;break}f===null&&(C=o.subarray(E,E+m),f=Je.aac.parseAacTimestamp(C)),E+=m;break;case"audio":if(o.length-E<7){u=!0;break}if(m=Je.aac.parseAdtsSize(o,E),m>o.length){u=!0;break}c===null&&(C=o.subarray(E,E+m),c=Je.aac.parseSampleRate(C)),h++,E+=m;break;default:E++;break}if(u)return null}if(c===null||f===null)return null;var j=Tn/c,I={audio:[{type:"audio",dts:f,pts:f},{type:"audio",dts:f+h*1024*j,pts:f+h*1024*j}]};return I},FA=function(o){var u={pid:null,table:null},h={};LA(o,u);for(var c in u.table)if(u.table.hasOwnProperty(c)){var f=u.table[c];switch(f){case kh.H264_STREAM_TYPE:h.video=[],RA(o,u,h),h.video.length===0&&delete h.video;break;case kh.ADTS_STREAM_TYPE:h.audio=[],Ih(o,u,h),h.audio.length===0&&delete h.audio;break}}return h},UA=function(o,u){var h=Je.aac.isLikelyAacData(o),c;return h?c=MA(o):c=FA(o),!c||!c.audio&&!c.video?null:(NA(c,u),c)},VA={inspect:UA,parseAudioPes_:Ih};const zA=function(o,u){u.on("data",function(h){const c=h.initSegment;h.initSegment={data:c.buffer,byteOffset:c.byteOffset,byteLength:c.byteLength};const f=h.data;h.data=f.buffer,o.postMessage({action:"data",segment:h,byteOffset:f.byteOffset,byteLength:f.byteLength},[h.data])}),u.on("done",function(h){o.postMessage({action:"done"})}),u.on("gopInfo",function(h){o.postMessage({action:"gopInfo",gopInfo:h})}),u.on("videoSegmentTimingInfo",function(h){const c={start:{decode:ot.videoTsToSeconds(h.start.dts),presentation:ot.videoTsToSeconds(h.start.pts)},end:{decode:ot.videoTsToSeconds(h.end.dts),presentation:ot.videoTsToSeconds(h.end.pts)},baseMediaDecodeTime:ot.videoTsToSeconds(h.baseMediaDecodeTime)};h.prependedContentDuration&&(c.prependedContentDuration=ot.videoTsToSeconds(h.prependedContentDuration)),o.postMessage({action:"videoSegmentTimingInfo",videoSegmentTimingInfo:c})}),u.on("audioSegmentTimingInfo",function(h){const c={start:{decode:ot.videoTsToSeconds(h.start.dts),presentation:ot.videoTsToSeconds(h.start.pts)},end:{decode:ot.videoTsToSeconds(h.end.dts),presentation:ot.videoTsToSeconds(h.end.pts)},baseMediaDecodeTime:ot.videoTsToSeconds(h.baseMediaDecodeTime)};h.prependedContentDuration&&(c.prependedContentDuration=ot.videoTsToSeconds(h.prependedContentDuration)),o.postMessage({action:"audioSegmentTimingInfo",audioSegmentTimingInfo:c})}),u.on("id3Frame",function(h){o.postMessage({action:"id3Frame",id3Frame:h})}),u.on("caption",function(h){o.postMessage({action:"caption",caption:h})}),u.on("trackinfo",function(h){o.postMessage({action:"trackinfo",trackInfo:h})}),u.on("audioTimingInfo",function(h){o.postMessage({action:"audioTimingInfo",audioTimingInfo:{start:ot.videoTsToSeconds(h.start),end:ot.videoTsToSeconds(h.end)}})}),u.on("videoTimingInfo",function(h){o.postMessage({action:"videoTimingInfo",videoTimingInfo:{start:ot.videoTsToSeconds(h.start),end:ot.videoTsToSeconds(h.end)}})}),u.on("log",function(h){o.postMessage({action:"log",log:h})})};class Ph{constructor(u,h){this.options=h||{},this.self=u,this.init()}init(){this.transmuxer&&this.transmuxer.dispose(),this.transmuxer=new Wv.Transmuxer(this.options),zA(this.self,this.transmuxer)}pushMp4Captions(u){this.captionParser||(this.captionParser=new mA,this.captionParser.init());const h=new Uint8Array(u.data,u.byteOffset,u.byteLength),c=this.captionParser.parse(h,u.trackIds,u.timescales);this.self.postMessage({action:"mp4Captions",captions:c&&c.captions||[],logs:c&&c.logs||[],data:h.buffer},[h.buffer])}probeMp4StartTime({timescales:u,data:h}){const c=gl.startTime(u,h);this.self.postMessage({action:"probeMp4StartTime",startTime:c,data:h},[h.buffer])}probeMp4Tracks({data:u}){const h=gl.tracks(u);this.self.postMessage({action:"probeMp4Tracks",tracks:h,data:u},[u.buffer])}probeEmsgID3({data:u,offset:h}){const c=gl.getEmsgID3(u,h);this.self.postMessage({action:"probeEmsgID3",id3Frames:c,emsgData:u},[u.buffer])}probeTs({data:u,baseStartTime:h}){const c=typeof h=="number"&&!isNaN(h)?h*ot.ONE_SECOND_IN_TS:void 0,f=VA.inspect(u,c);let m=null;f&&(m={hasVideo:f.video&&f.video.length===2||!1,hasAudio:f.audio&&f.audio.length===2||!1},m.hasVideo&&(m.videoStart=f.video[0].ptsTime),m.hasAudio&&(m.audioStart=f.audio[0].ptsTime)),this.self.postMessage({action:"probeTs",result:m,data:u},[u.buffer])}clearAllMp4Captions(){this.captionParser&&this.captionParser.clearAllCaptions()}clearParsedMp4Captions(){this.captionParser&&this.captionParser.clearParsedCaptions()}push(u){const h=new Uint8Array(u.data,u.byteOffset,u.byteLength);this.transmuxer.push(h)}reset(){this.transmuxer.reset()}setTimestampOffset(u){const h=u.timestampOffset||0;this.transmuxer.setBaseMediaDecodeTime(Math.round(ot.secondsToVideoTs(h)))}setAudioAppendStart(u){this.transmuxer.setAudioAppendStart(Math.ceil(ot.secondsToVideoTs(u.appendStart)))}setRemux(u){this.transmuxer.setRemux(u.remux)}flush(u){this.transmuxer.flush(),self.postMessage({action:"done",type:"transmuxed"})}endTimeline(){this.transmuxer.endTimeline(),self.postMessage({action:"endedtimeline",type:"transmuxed"})}alignGopsWith(u){this.transmuxer.alignGopsWith(u.gopsToAlignWith.slice())}}self.onmessage=function(o){if(o.data.action==="init"&&o.data.options){this.messageHandlers=new Ph(self,o.data.options);return}this.messageHandlers||(this.messageHandlers=new Ph(self)),o.data&&o.data.action&&o.data.action!=="init"&&this.messageHandlers[o.data.action]&&this.messageHandlers[o.data.action](o.data)}}));var Wm=Kc(qm);const $m=(n,e,t)=>{const{type:i,initSegment:s,captions:r,captionStreams:a,metadata:l,videoFrameDtsTime:d,videoFramePtsTime:p}=n.data.segment;e.buffer.push({captions:r,captionStreams:a,metadata:l});const g=n.data.segment.boxes||{data:n.data.segment.data},y={type:i,data:new Uint8Array(g.data,g.data.byteOffset,g.data.byteLength),initSegment:new Uint8Array(s.data,s.byteOffset,s.byteLength)};typeof d!="undefined"&&(y.videoFrameDtsTime=d),typeof p!="undefined"&&(y.videoFramePtsTime=p),t(y)},Gm=({transmuxedData:n,callback:e})=>{n.buffer=[],e(n)},Ym=(n,e)=>{e.gopInfo=n.data.gopInfo},Zc=n=>{const{transmuxer:e,bytes:t,audioAppendStart:i,gopsToAlignWith:s,remux:r,onData:a,onTrackInfo:l,onAudioTimingInfo:d,onVideoTimingInfo:p,onVideoSegmentTimingInfo:g,onAudioSegmentTimingInfo:y,onId3:B,onCaptions:D,onDone:P,onEndedTimeline:b,onTransmuxerLog:U,isEndOfTimeline:H,segment:F,triggerSegmentEventFn:N}=n,Y={buffer:[]};let O=H;const K=Ee=>{e.currentTransmux===n&&(Ee.data.action==="data"&&$m(Ee,Y,a),Ee.data.action==="trackinfo"&&l(Ee.data.trackInfo),Ee.data.action==="gopInfo"&&Ym(Ee,Y),Ee.data.action==="audioTimingInfo"&&d(Ee.data.audioTimingInfo),Ee.data.action==="videoTimingInfo"&&p(Ee.data.videoTimingInfo),Ee.data.action==="videoSegmentTimingInfo"&&g(Ee.data.videoSegmentTimingInfo),Ee.data.action==="audioSegmentTimingInfo"&&y(Ee.data.audioSegmentTimingInfo),Ee.data.action==="id3Frame"&&B([Ee.data.id3Frame],Ee.data.id3Frame.dispatchType),Ee.data.action==="caption"&&D(Ee.data.caption),Ee.data.action==="endedtimeline"&&(O=!1,b()),Ee.data.action==="log"&&U(Ee.data.log),Ee.data.type==="transmuxed"&&(O||(e.onmessage=null,Gm({transmuxedData:Y,callback:P}),ed(e))))},be=()=>{const Ee={message:"Received an error message from the transmuxer worker",metadata:{errorType:R.Error.StreamingFailedToTransmuxSegment,segmentInfo:mn({segment:F})}};P(null,Ee)};if(e.onmessage=K,e.onerror=be,i&&e.postMessage({action:"setAudioAppendStart",appendStart:i}),Array.isArray(s)&&e.postMessage({action:"alignGopsWith",gopsToAlignWith:s}),typeof r!="undefined"&&e.postMessage({action:"setRemux",remux:r}),t.byteLength){const Ee=t instanceof ArrayBuffer?t:t.buffer,We=t instanceof ArrayBuffer?0:t.byteOffset;N({type:"segmenttransmuxingstart",segment:F}),e.postMessage({action:"push",data:Ee,byteOffset:We,byteLength:t.byteLength},[Ee])}H&&e.postMessage({action:"endTimeline"}),e.postMessage({action:"flush"})},ed=n=>{n.currentTransmux=null,n.transmuxQueue.length&&(n.currentTransmux=n.transmuxQueue.shift(),typeof n.currentTransmux=="function"?n.currentTransmux():Zc(n.currentTransmux))},td=(n,e)=>{n.postMessage({action:e}),ed(n)},id=(n,e)=>{if(!e.currentTransmux){e.currentTransmux=n,td(e,n);return}e.transmuxQueue.push(td.bind(null,e,n))},Xm=n=>{id("reset",n)},Km=n=>{id("endTimeline",n)},nd=n=>{if(!n.transmuxer.currentTransmux){n.transmuxer.currentTransmux=n,Zc(n);return}n.transmuxer.transmuxQueue.push(n)};var Vo={reset:Xm,endTimeline:Km,transmux:nd,createTransmuxer:n=>{const e=new Wm;e.currentTransmux=null,e.transmuxQueue=[];const t=e.terminate;return e.terminate=()=>(e.currentTransmux=null,e.transmuxQueue.length=0,t.call(e)),e.postMessage({action:"init",options:n}),e}};const Ns=function(n){const e=n.transmuxer,t=n.endAction||n.action,i=n.callback,s=(0,ue.A)({},n,{endAction:null,transmuxer:null,callback:null}),r=a=>{a.data.action===t&&(e.removeEventListener("message",r),a.data.data&&(a.data.data=new Uint8Array(a.data.data,n.byteOffset||0,n.byteLength||a.data.data.byteLength),n.data&&(n.data=a.data.data)),i(a.data))};if(e.addEventListener("message",r),n.data){const a=n.data instanceof ArrayBuffer;s.byteOffset=a?0:n.data.byteOffset,s.byteLength=n.data.byteLength;const l=[a?n.data:n.data.buffer];e.postMessage(s,l)}else e.postMessage(s)},Si={FAILURE:2,TIMEOUT:-101,ABORTED:-102},zo=n=>{n.forEach(e=>{e.abort()})},Qm=n=>({bandwidth:n.bandwidth,bytesReceived:n.bytesReceived||0,roundTripTime:n.roundTripTime||0}),Jm=n=>{const e=n.target,i={bandwidth:1/0,bytesReceived:0,roundTripTime:Date.now()-e.requestTime||0};return i.bytesReceived=n.loaded,i.bandwidth=Math.floor(i.bytesReceived/i.roundTripTime*8*1e3),i},Ho=(n,e)=>{const{requestType:t}=e,i=pn({requestType:t,request:e,error:n});return e.timedout?{status:e.status,message:"HLS request timed-out at URL: "+e.uri,code:Si.TIMEOUT,xhr:e,metadata:i}:e.aborted?{status:e.status,message:"HLS request aborted at URL: "+e.uri,code:Si.ABORTED,xhr:e,metadata:i}:n?{status:e.status,message:"HLS request errored at URL: "+e.uri,code:Si.FAILURE,xhr:e,metadata:i}:e.responseType==="arraybuffer"&&e.response.byteLength===0?{status:e.status,message:"Empty HLS response at URL: "+e.uri,code:Si.FAILURE,xhr:e,metadata:i}:null},sd=(n,e,t,i)=>(s,r)=>{const a=r.response,l=Ho(s,r);if(l)return t(l,n);if(a.byteLength!==16)return t({status:r.status,message:"Invalid HLS key at URL: "+r.uri,code:Si.FAILURE,xhr:r},n);const d=new DataView(a),p=new Uint32Array([d.getUint32(0),d.getUint32(4),d.getUint32(8),d.getUint32(12)]);for(let y=0;y<e.length;y++)e[y].bytes=p;const g={uri:r.uri};return i({type:"segmentkeyloadcomplete",segment:n,keyInfo:g}),t(null,n)},rd=(n,e)=>{const t=Ia(n.map.bytes);if(t!=="mp4"){const i=n.map.resolvedUri||n.map.uri,s=t||"unknown";return e({internal:!0,message:`Found unsupported ${s} container for initialization segment at URL: ${i}`,code:Si.FAILURE,metadata:{mediaType:s}})}Ns({action:"probeMp4Tracks",data:n.map.bytes,transmuxer:n.transmuxer,callback:({tracks:i,data:s})=>(n.map.bytes=s,i.forEach(function(r){n.map.tracks=n.map.tracks||{},!n.map.tracks[r.type]&&(n.map.tracks[r.type]=r,typeof r.id=="number"&&r.timescale&&(n.map.timescales=n.map.timescales||{},n.map.timescales[r.id]=r.timescale))}),e(null))})},Zm=({segment:n,finishProcessingFn:e,triggerSegmentEventFn:t})=>(i,s)=>{const r=Ho(i,s);if(r)return e(r,n);const a=new Uint8Array(s.response);if(t({type:"segmentloaded",segment:n}),n.map.key)return n.map.encryptedBytes=a,e(null,n);n.map.bytes=a,rd(n,function(l){if(l)return l.xhr=s,l.status=s.status,e(l,n);e(null,n)})},eg=({segment:n,finishProcessingFn:e,responseType:t,triggerSegmentEventFn:i})=>(s,r)=>{const a=Ho(s,r);if(a)return e(a,n);i({type:"segmentloaded",segment:n});const l=t==="arraybuffer"||!r.responseText?r.response:zm(r.responseText.substring(n.lastReachedChar||0));return n.stats=Qm(r),n.key?n.encryptedBytes=new Uint8Array(l):n.bytes=new Uint8Array(l),e(null,n)},tg=({segment:n,bytes:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:d,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:B,triggerSegmentEventFn:D})=>{const P=n.map&&n.map.tracks||{},b=!!(P.audio&&P.video);let U=i.bind(null,n,"audio","start");const H=i.bind(null,n,"audio","end");let F=i.bind(null,n,"video","start");const N=i.bind(null,n,"video","end"),Y=()=>nd({bytes:e,transmuxer:n.transmuxer,audioAppendStart:n.audioAppendStart,gopsToAlignWith:n.gopsToAlignWith,remux:b,onData:O=>{O.type=O.type==="combined"?"video":O.type,g(n,O)},onTrackInfo:O=>{t&&(b&&(O.isMuxed=!0),t(n,O))},onAudioTimingInfo:O=>{U&&typeof O.start!="undefined"&&(U(O.start),U=null),H&&typeof O.end!="undefined"&&H(O.end)},onVideoTimingInfo:O=>{F&&typeof O.start!="undefined"&&(F(O.start),F=null),N&&typeof O.end!="undefined"&&N(O.end)},onVideoSegmentTimingInfo:O=>{const K={pts:{start:O.start.presentation,end:O.end.presentation},dts:{start:O.start.decode,end:O.end.decode}};D({type:"segmenttransmuxingtiminginfoavailable",segment:n,timingInfo:K}),s(O)},onAudioSegmentTimingInfo:O=>{const K={pts:{start:O.start.pts,end:O.end.pts},dts:{start:O.start.dts,end:O.end.dts}};D({type:"segmenttransmuxingtiminginfoavailable",segment:n,timingInfo:K}),r(O)},onId3:(O,K)=>{a(n,O,K)},onCaptions:O=>{l(n,[O])},isEndOfTimeline:d,onEndedTimeline:()=>{p()},onTransmuxerLog:B,onDone:(O,K)=>{y&&(O.type=O.type==="combined"?"video":O.type,D({type:"segmenttransmuxingcomplete",segment:n}),y(K,n,O))},segment:n,triggerSegmentEventFn:D});Ns({action:"probeTs",transmuxer:n.transmuxer,data:e,baseStartTime:n.baseStartTime,callback:O=>{n.bytes=e=O.data;const K=O.result;K&&(t(n,{hasAudio:K.hasAudio,hasVideo:K.hasVideo,isMuxed:b}),t=null),Y()}})},ad=({segment:n,bytes:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:d,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:B,triggerSegmentEventFn:D})=>{let P=new Uint8Array(e);if(kf(P)){n.isFmp4=!0;const{tracks:b}=n.map,U={isFmp4:!0,hasVideo:!!b.video,hasAudio:!!b.audio};b.audio&&b.audio.codec&&b.audio.codec!=="enca"&&(U.audioCodec=b.audio.codec),b.video&&b.video.codec&&b.video.codec!=="encv"&&(U.videoCodec=b.video.codec),b.video&&b.audio&&(U.isMuxed=!0),t(n,U);const H=(F,N)=>{g(n,{data:P,type:U.hasAudio&&!U.isMuxed?"audio":"video"}),N&&N.length&&a(n,N),F&&F.length&&l(n,F),y(null,n,{})};Ns({action:"probeMp4StartTime",timescales:n.map.timescales,data:P,transmuxer:n.transmuxer,callback:({data:F,startTime:N})=>{e=F.buffer,n.bytes=P=F,U.hasAudio&&!U.isMuxed&&i(n,"audio","start",N),U.hasVideo&&i(n,"video","start",N),Ns({action:"probeEmsgID3",data:P,transmuxer:n.transmuxer,offset:N,callback:({emsgData:Y,id3Frames:O})=>{if(e=Y.buffer,n.bytes=P=Y,!b.video||!Y.byteLength||!n.transmuxer){H(void 0,O);return}Ns({action:"pushMp4Captions",endAction:"mp4Captions",transmuxer:n.transmuxer,data:P,timescales:n.map.timescales,trackIds:[b.video.id],callback:K=>{e=K.data.buffer,n.bytes=P=K.data,K.logs.forEach(function(be){B(Ye(be,{stream:"mp4CaptionParser"}))}),H(K.captions,O)}})}})}});return}if(!n.transmuxer){y(null,n,{});return}if(typeof n.container=="undefined"&&(n.container=Ia(P)),n.container!=="ts"&&n.container!=="aac"){t(n,{hasAudio:!1,hasVideo:!1}),y(null,n,{});return}tg({segment:n,bytes:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:d,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:B,triggerSegmentEventFn:D})},od=function({id:n,key:e,encryptedBytes:t,decryptionWorker:i,segment:s,doneFn:r},a){const l=p=>{if(p.data.source===n){i.removeEventListener("message",l);const g=p.data.decrypted;a(new Uint8Array(g.bytes,g.byteOffset,g.byteLength))}};i.onerror=()=>{const p="An error occurred in the decryption worker",g=mn({segment:s}),y={message:p,metadata:{error:new Error(p),errorType:R.Error.StreamingFailedToDecryptSegment,segmentInfo:g,keyInfo:{uri:s.key.resolvedUri||s.map.key.resolvedUri}}};r(y,s)},i.addEventListener("message",l);let d;e.bytes.slice?d=e.bytes.slice():d=new Uint32Array(Array.prototype.slice.call(e.bytes)),i.postMessage(zc({source:n,encrypted:t,key:d,iv:e.iv}),[t.buffer,d.buffer])},ig=({decryptionWorker:n,segment:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:d,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:B,triggerSegmentEventFn:D})=>{D({type:"segmentdecryptionstart"}),od({id:e.requestId,key:e.key,encryptedBytes:e.encryptedBytes,decryptionWorker:n,segment:e,doneFn:y},P=>{e.bytes=P,D({type:"segmentdecryptioncomplete",segment:e}),ad({segment:e,bytes:e.bytes,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:d,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:B,triggerSegmentEventFn:D})})},ng=({activeXhrs:n,decryptionWorker:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:d,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:B,triggerSegmentEventFn:D})=>{let P=0,b=!1;return(U,H)=>{if(!b){if(U)return b=!0,zo(n),y(U,H);if(P+=1,P===n.length){const F=function(){if(H.encryptedBytes)return ig({decryptionWorker:e,segment:H,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:d,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:B,triggerSegmentEventFn:D});ad({segment:H,bytes:H.bytes,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:d,endedTimelineFn:p,dataFn:g,doneFn:y,onTransmuxerLog:B,triggerSegmentEventFn:D})};if(H.endOfAllRequests=Date.now(),H.map&&H.map.encryptedBytes&&!H.map.bytes)return D({type:"segmentdecryptionstart",segment:H}),od({decryptionWorker:e,id:H.requestId+"-init",encryptedBytes:H.map.encryptedBytes,key:H.map.key,segment:H,doneFn:y},N=>{H.map.bytes=N,D({type:"segmentdecryptioncomplete",segment:H}),rd(H,Y=>{if(Y)return zo(n),y(Y,H);F()})});F()}}}},sg=({loadendState:n,abortFn:e})=>t=>{t.target.aborted&&e&&!n.calledAbortFn&&(e(),n.calledAbortFn=!0)},rg=({segment:n,progressFn:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:d,endedTimelineFn:p,dataFn:g})=>y=>{if(!y.target.aborted)return n.stats=Ye(n.stats,Jm(y)),!n.stats.firstBytesReceivedAt&&n.stats.bytesReceived&&(n.stats.firstBytesReceivedAt=Date.now()),e(y,n)},ag=({xhr:n,xhrOptions:e,decryptionWorker:t,segment:i,abortFn:s,progressFn:r,trackInfoFn:a,timingInfoFn:l,videoSegmentTimingInfoFn:d,audioSegmentTimingInfoFn:p,id3Fn:g,captionsFn:y,isEndOfTimeline:B,endedTimelineFn:D,dataFn:P,doneFn:b,onTransmuxerLog:U,triggerSegmentEventFn:H})=>{const F=[],N=ng({activeXhrs:F,decryptionWorker:t,trackInfoFn:a,timingInfoFn:l,videoSegmentTimingInfoFn:d,audioSegmentTimingInfoFn:p,id3Fn:g,captionsFn:y,isEndOfTimeline:B,endedTimelineFn:D,dataFn:P,doneFn:b,onTransmuxerLog:U,triggerSegmentEventFn:H});if(i.key&&!i.key.bytes){const Ee=[i.key];i.map&&!i.map.bytes&&i.map.key&&i.map.key.resolvedUri===i.key.resolvedUri&&Ee.push(i.map.key);const We=Ye(e,{uri:i.key.resolvedUri,responseType:"arraybuffer",requestType:"segment-key"}),vt=sd(i,Ee,N,H),Bt={uri:i.key.resolvedUri};H({type:"segmentkeyloadstart",segment:i,keyInfo:Bt});const ut=n(We,vt);F.push(ut)}if(i.map&&!i.map.bytes){if(i.map.key&&(!i.key||i.key.resolvedUri!==i.map.key.resolvedUri)){const ut=Ye(e,{uri:i.map.key.resolvedUri,responseType:"arraybuffer",requestType:"segment-key"}),we=sd(i,[i.map.key],N,H),Ke={uri:i.map.key.resolvedUri};H({type:"segmentkeyloadstart",segment:i,keyInfo:Ke});const ai=n(ut,we);F.push(ai)}const We=Ye(e,{uri:i.map.resolvedUri,responseType:"arraybuffer",headers:Mo(i.map),requestType:"segment-media-initialization"}),vt=Zm({segment:i,finishProcessingFn:N,triggerSegmentEventFn:H});H({type:"segmentloadstart",segment:i});const Bt=n(We,vt);F.push(Bt)}const Y=Ye(e,{uri:i.part&&i.part.resolvedUri||i.resolvedUri,responseType:"arraybuffer",headers:Mo(i),requestType:"segment"}),O=eg({segment:i,finishProcessingFn:N,responseType:Y.responseType,triggerSegmentEventFn:H});H({type:"segmentloadstart",segment:i});const K=n(Y,O);K.addEventListener("progress",rg({segment:i,progressFn:r,trackInfoFn:a,timingInfoFn:l,videoSegmentTimingInfoFn:d,audioSegmentTimingInfoFn:p,id3Fn:g,captionsFn:y,isEndOfTimeline:B,endedTimelineFn:D,dataFn:P})),F.push(K);const be={};return F.forEach(Ee=>{Ee.addEventListener("loadend",sg({loadendState:be,abortFn:s}))}),()=>zo(F)},og=ri("CodecUtils"),lg=function(n){const e=n.attributes||{};if(e.CODECS)return G(e.CODECS)},ld=(n,e)=>{const t=e.attributes||{};return n&&n.mediaGroups&&n.mediaGroups.AUDIO&&t.AUDIO&&n.mediaGroups.AUDIO[t.AUDIO]},ug=(n,e)=>{if(!ld(n,e))return!0;const t=e.attributes||{},i=n.mediaGroups.AUDIO[t.AUDIO];for(const s in i)if(!i[s].uri&&!i[s].playlists)return!0;return!1},Wr=function(n){const e={};return n.forEach(({mediaType:t,type:i,details:s})=>{e[t]=e[t]||[],e[t].push(de(`${i}${s}`))}),Object.keys(e).forEach(function(t){if(e[t].length>1){og(`multiple ${t} codecs found as attributes: ${e[t].join(", ")}. Setting playlist codecs to null so that we wait for mux.js to probe segments for real codecs.`),e[t]=null;return}e[t]=e[t][0]}),e},ud=function(n){let e=0;return n.audio&&e++,n.video&&e++,e},Ms=function(n,e){const t=e.attributes||{},i=Wr(lg(e)||[]);if(ld(n,e)&&!i.audio&&!ug(n,e)){const s=Wr(te(n,t.AUDIO)||[]);s.audio&&(i.audio=s.audio)}return i},$r=ri("PlaylistSelector"),cd=function(n){if(!n||!n.playlist)return;const e=n.playlist;return JSON.stringify({id:e.id,bandwidth:n.bandwidth,width:n.width,height:n.height,codecs:e.attributes&&e.attributes.CODECS||""})},Gr=function(n,e){if(!n)return"";const t=A().getComputedStyle(n);return t?t[e]:""},Zn=function(n,e){const t=n.slice();n.sort(function(i,s){const r=e(i,s);return r===0?t.indexOf(i)-t.indexOf(s):r})},qo=function(n,e){let t,i;return n.attributes.BANDWIDTH&&(t=n.attributes.BANDWIDTH),t=t||A().Number.MAX_VALUE,e.attributes.BANDWIDTH&&(i=e.attributes.BANDWIDTH),i=i||A().Number.MAX_VALUE,t-i},cg=function(n,e){let t,i;return n.attributes.RESOLUTION&&n.attributes.RESOLUTION.width&&(t=n.attributes.RESOLUTION.width),t=t||A().Number.MAX_VALUE,e.attributes.RESOLUTION&&e.attributes.RESOLUTION.width&&(i=e.attributes.RESOLUTION.width),i=i||A().Number.MAX_VALUE,t===i&&n.attributes.BANDWIDTH&&e.attributes.BANDWIDTH?n.attributes.BANDWIDTH-e.attributes.BANDWIDTH:t-i};let dd=function(n,e,t,i,s,r){if(!n)return;const a={bandwidth:e,width:t,height:i,limitRenditionByPlayerDimensions:s};let l=n.playlists;Ht.isAudioOnly(n)&&(l=r.getAudioTrackPlaylists_(),a.audioOnly=!0);let d=l.map(O=>{let K;const be=O.attributes&&O.attributes.RESOLUTION&&O.attributes.RESOLUTION.width,Ee=O.attributes&&O.attributes.RESOLUTION&&O.attributes.RESOLUTION.height;return K=O.attributes&&O.attributes.BANDWIDTH,K=K||A().Number.MAX_VALUE,{bandwidth:K,width:be,height:Ee,playlist:O}});Zn(d,(O,K)=>O.bandwidth-K.bandwidth),d=d.filter(O=>!Ht.isIncompatible(O.playlist));let p=d.filter(O=>Ht.isEnabled(O.playlist));p.length||(p=d.filter(O=>!Ht.isDisabled(O.playlist)));const g=p.filter(O=>O.bandwidth*jt.BANDWIDTH_VARIANCE<e);let y=g[g.length-1];const B=g.filter(O=>O.bandwidth===y.bandwidth)[0];if(s===!1){const O=B||p[0]||d[0];if(O&&O.playlist){let K="sortedPlaylistReps";return B&&(K="bandwidthBestRep"),p[0]&&(K="enabledPlaylistReps"),$r(`choosing ${cd(O)} using ${K} with options`,a),O.playlist}return $r("could not choose a playlist with options",a),null}const D=g.filter(O=>O.width&&O.height);Zn(D,(O,K)=>O.width-K.width);const P=D.filter(O=>O.width===t&&O.height===i);y=P[P.length-1];const b=P.filter(O=>O.bandwidth===y.bandwidth)[0];let U,H,F;b||(U=D.filter(O=>O.width>t||O.height>i),H=U.filter(O=>O.width===U[0].width&&O.height===U[0].height),y=H[H.length-1],F=H.filter(O=>O.bandwidth===y.bandwidth)[0]);let N;if(r.leastPixelDiffSelector){const O=D.map(K=>(K.pixelDiff=Math.abs(K.width-t)+Math.abs(K.height-i),K));Zn(O,(K,be)=>K.pixelDiff===be.pixelDiff?be.bandwidth-K.bandwidth:K.pixelDiff-be.pixelDiff),N=O[0]}const Y=N||F||b||B||p[0]||d[0];if(Y&&Y.playlist){let O="sortedPlaylistReps";return N?O="leastPixelDiffRep":F?O="resolutionPlusOneRep":b?O="resolutionBestRep":B?O="bandwidthBestRep":p[0]&&(O="enabledPlaylistReps"),$r(`choosing ${cd(Y)} using ${O} with options`,a),Y.playlist}return $r("could not choose a playlist with options",a),null};const hd=function(){let n=this.useDevicePixelRatio&&A().devicePixelRatio||1;return isNaN(this.customPixelRatio)||(n=this.customPixelRatio),dd(this.playlists.main,this.systemBandwidth,parseInt(Gr(this.tech_.el(),"width"),10)*n,parseInt(Gr(this.tech_.el(),"height"),10)*n,this.limitRenditionByPlayerDimensions,this.playlistController_)},dg=function(n){let e=-1,t=-1;if(n<0||n>1)throw new Error("Moving average bandwidth decay must be between 0 and 1.");return function(){let i=this.useDevicePixelRatio&&A().devicePixelRatio||1;return isNaN(this.customPixelRatio)||(i=this.customPixelRatio),e<0&&(e=this.systemBandwidth,t=this.systemBandwidth),this.systemBandwidth>0&&this.systemBandwidth!==t&&(e=n*this.systemBandwidth+(1-n)*e,t=this.systemBandwidth),dd(this.playlists.main,e,parseInt(Gr(this.tech_.el(),"width"),10)*i,parseInt(Gr(this.tech_.el(),"height"),10)*i,this.limitRenditionByPlayerDimensions,this.playlistController_)}},hg=function(n){const{main:e,currentTime:t,bandwidth:i,duration:s,segmentDuration:r,timeUntilRebuffer:a,currentTimeline:l,syncController:d}=n,p=e.playlists.filter(P=>!Ht.isIncompatible(P));let g=p.filter(Ht.isEnabled);g.length||(g=p.filter(P=>!Ht.isDisabled(P)));const B=g.filter(Ht.hasAttribute.bind(null,"BANDWIDTH")).map(P=>{const U=d.getSyncPoint(P,s,l,t)?1:2,F=Ht.estimateSegmentRequestTime(r,i,P)*U-a;return{playlist:P,rebufferingImpact:F}}),D=B.filter(P=>P.rebufferingImpact<=0);return Zn(D,(P,b)=>qo(b.playlist,P.playlist)),D.length?D[0]:(Zn(B,(P,b)=>P.rebufferingImpact-b.rebufferingImpact),B[0]||null)},fg=function(){const n=this.playlists.main.playlists.filter(Ht.isEnabled);return Zn(n,(t,i)=>qo(t,i)),n.filter(t=>!!Ms(this.playlists.main,t).video)[0]||null},pg=n=>{let e=0,t;return n.bytes&&(t=new Uint8Array(n.bytes),n.segments.forEach(i=>{t.set(i,e),e+=i.byteLength})),t};function fd(n){try{return new URL(n).pathname.split("/").slice(-2).join("/")}catch(e){return""}}const mg=function(n,e,t){if(!n[t]){e.trigger({type:"usage",name:"vhs-608"});let i=t;/^cc708_/.test(t)&&(i="SERVICE"+t.split("_")[1]);const s=e.textTracks().getTrackById(i);if(s)n[t]=s;else{const r=e.options_.vhs&&e.options_.vhs.captionServices||{};let a=t,l=t,d=!1;const p=r[i];p&&(a=p.label,l=p.language,d=p.default),n[t]=e.addRemoteTextTrack({kind:"captions",id:i,default:d,label:a,language:l},!1).track}}},gg=function({inbandTextTracks:n,captionArray:e,timestampOffset:t}){if(!e)return;const i=A().WebKitDataCue||A().VTTCue;e.forEach(s=>{const r=s.stream;s.content?s.content.forEach(a=>{const l=new i(s.startTime+t,s.endTime+t,a.text);l.line=a.line,l.align="left",l.position=a.position,l.positionAlign="line-left",n[r].addCue(l)}):n[r].addCue(new i(s.startTime+t,s.endTime+t,s.text))})},vg=function(n){Object.defineProperties(n.frame,{id:{get(){return R.log.warn("cue.frame.id is deprecated. Use cue.value.key instead."),n.value.key}},value:{get(){return R.log.warn("cue.frame.value is deprecated. Use cue.value.data instead."),n.value.data}},privateData:{get(){return R.log.warn("cue.frame.privateData is deprecated. Use cue.value.data instead."),n.value.data}}})},Ag=({inbandTextTracks:n,metadataArray:e,timestampOffset:t,videoDuration:i})=>{if(!e)return;const s=A().WebKitDataCue||A().VTTCue,r=n.metadataTrack_;if(!r||(e.forEach(g=>{const y=g.cueTime+t;typeof y!="number"||A().isNaN(y)||y<0||!(y<1/0)||!g.frames||!g.frames.length||g.frames.forEach(B=>{const D=new s(y,y,B.value||B.url||B.data||"");D.frame=B,D.value=B,vg(D),r.addCue(D)})}),!r.cues||!r.cues.length))return;const a=r.cues,l=[];for(let g=0;g<a.length;g++)a[g]&&l.push(a[g]);const d=l.reduce((g,y)=>{const B=g[y.startTime]||[];return B.push(y),g[y.startTime]=B,g},{}),p=Object.keys(d).sort((g,y)=>Number(g)-Number(y));p.forEach((g,y)=>{const B=d[g],D=isFinite(i)?i:g,P=Number(p[y+1])||D;B.forEach(b=>{b.endTime=P})})},yg={id:"ID",class:"CLASS",startDate:"START-DATE",duration:"DURATION",endDate:"END-DATE",endOnNext:"END-ON-NEXT",plannedDuration:"PLANNED-DURATION",scte35Out:"SCTE35-OUT",scte35In:"SCTE35-IN"},_g=new Set(["id","class","startDate","duration","endDate","endOnNext","startTime","endTime","processDateRange"]),bg=({inbandTextTracks:n,dateRanges:e})=>{const t=n.metadataTrack_;if(!t)return;const i=A().WebKitDataCue||A().VTTCue;e.forEach(s=>{for(const r of Object.keys(s)){if(_g.has(r))continue;const a=new i(s.startTime,s.endTime,"");a.id=s.id,a.type="com.apple.quicktime.HLS",a.value={key:yg[r],data:s[r]},(r==="scte35Out"||r==="scte35In")&&(a.value.data=new Uint8Array(a.value.data.match(/[\da-f]{2}/gi)).buffer),t.addCue(a)}s.processDateRange()})},pd=(n,e,t)=>{n.metadataTrack_||(n.metadataTrack_=t.addRemoteTextTrack({kind:"metadata",label:"Timed Metadata"},!1).track,R.browser.IS_ANY_SAFARI||(n.metadataTrack_.inBandMetadataTrackDispatchType=e))},Fs=function(n,e,t){let i,s;if(t&&t.cues)for(i=t.cues.length;i--;)s=t.cues[i],s.startTime>=n&&s.endTime<=e&&t.removeCue(s)},Eg=function(n){const e=n.cues;if(!e)return;const t={};for(let i=e.length-1;i>=0;i--){const s=e[i],r=`${s.startTime}-${s.endTime}-${s.text}`;t[r]?n.removeCue(s):t[r]=s}},Tg=(n,e,t)=>{if(typeof e=="undefined"||e===null||!n.length)return[];const i=Math.ceil((e-t+3)*an.ONE_SECOND_IN_TS);let s;for(s=0;s<n.length&&!(n[s].pts>i);s++);return n.slice(s)},Cg=(n,e,t)=>{if(!e.length)return n;if(t)return e.slice();const i=e[0].pts;let s=0;for(s;s<n.length&&!(n[s].pts>=i);s++);return n.slice(0,s).concat(e)},xg=(n,e,t,i)=>{const s=Math.ceil((e-i)*an.ONE_SECOND_IN_TS),r=Math.ceil((t-i)*an.ONE_SECOND_IN_TS),a=n.slice();let l=n.length;for(;l--&&!(n[l].pts<=r););if(l===-1)return a;let d=l+1;for(;d--&&!(n[d].pts<=s););return d=Math.max(d,0),a.splice(d,l-d+1),a},Sg=function(n,e){if(!n&&!e||!n&&e||n&&!e)return!1;if(n===e)return!0;const t=Object.keys(n).sort(),i=Object.keys(e).sort();if(t.length!==i.length)return!1;for(let s=0;s<t.length;s++){const r=t[s];if(r!==i[s]||n[r]!==e[r])return!1}return!0},jg=function(n,e,t){e=e||[];const i=[];let s=0;for(let r=0;r<e.length;r++){const a=e[r];if(n===a.timeline&&(i.push(r),s+=a.duration,s>t))return r}return i.length===0?0:i[i.length-1]},Us=1,Bg=500,md=n=>typeof n=="number"&&isFinite(n),Yr=1/60,wg=(n,e,t)=>n!=="main"||!e||!t?null:!t.hasAudio&&!t.hasVideo?"Neither audio nor video found in segment.":e.hasVideo&&!t.hasVideo?"Only audio found in segment when we expected video. We can't switch to audio only from a stream that had video. To get rid of this message, please add codec information to the manifest.":!e.hasVideo&&t.hasVideo?"Video found in segment when we expected only audio. We can't switch to a stream with video from an audio only stream. To get rid of this message, please add codec information to the manifest.":null,Dg=(n,e,t)=>{let i=e-jt.BACK_BUFFER_LENGTH;n.length&&(i=Math.max(i,n.start(0)));const s=e-t;return Math.min(s,i)},es=n=>{const{startOfSegment:e,duration:t,segment:i,part:s,playlist:{mediaSequence:r,id:a,segments:l=[]},mediaIndex:d,partIndex:p,timeline:g}=n,y=l.length-1;let B="mediaIndex/partIndex increment";n.getMediaInfoForTime?B=`getMediaInfoForTime (${n.getMediaInfoForTime})`:n.isSyncRequest&&(B="getSyncSegmentCandidate (isSyncRequest)"),n.independent&&(B+=` with independent ${n.independent}`);const D=typeof p=="number",P=n.segment.uri?"segment":"pre-segment",b=D?Tc({preloadSegment:i})-1:0;return`${P} [${r+d}/${r+y}]`+(D?` part [${p}/${b}]`:"")+` segment start/end [${i.start} => ${i.end}]`+(D?` part start/end [${s.start} => ${s.end}]`:"")+` startOfSegment [${e}] duration [${t}] timeline [${g}] selected by [${B}] playlist [${a}]`},gd=n=>`${n}TimingInfo`,kg=({segmentTimeline:n,currentTimeline:e,startOfSegment:t,buffered:i,overrideCheck:s})=>!s&&n===e?null:n<e?t:i.length?i.end(i.length-1):t,Wo=({timelineChangeController:n,currentTimeline:e,segmentTimeline:t,loaderType:i,audioDisabled:s})=>{if(e===t)return!1;if(i==="audio"){const r=n.lastTimelineChange({type:"main"});return!r||r.to!==t}if(i==="main"&&s){const r=n.pendingTimelineChange({type:"audio"});return!(r&&r.to===t)}return!1},Ig=n=>{if(!n)return!1;const e=n.pendingTimelineChange({type:"audio"}),t=n.pendingTimelineChange({type:"main"}),i=e&&t,s=i&&e.to!==t.to;return!!(i&&e.from!==-1&&t.from!==-1&&s)},Pg=n=>{n&&(n.pause(),n.resetEverything(),n.load())},Og=n=>{const e=n.timelineChangeController_.pendingTimelineChange({type:"audio"}),t=n.timelineChangeController_.pendingTimelineChange({type:"main"});return e&&t&&e.to<t.to},Ji=n=>{const e=n.pendingSegment_;if(!e)return;if(Wo({timelineChangeController:n.timelineChangeController_,currentTimeline:n.currentTimeline_,segmentTimeline:e.timeline,loaderType:n.loaderType_,audioDisabled:n.audioDisabled_})&&Ig(n.timelineChangeController_)){if(Og(n)){n.timelineChangeController_.trigger("audioTimelineBehind");return}Pg(n)}},Lg=n=>{let e=0;return["video","audio"].forEach(function(t){const i=n[`${t}TimingInfo`];if(!i)return;const{start:s,end:r}=i;let a;typeof s=="bigint"||typeof r=="bigint"?a=A().BigInt(r)-A().BigInt(s):typeof s=="number"&&typeof r=="number"&&(a=r-s),typeof a!="undefined"&&a>e&&(e=a)}),typeof e=="bigint"&&e<Number.MAX_SAFE_INTEGER&&(e=Number(e)),e},vd=({segmentDuration:n,maxDuration:e})=>n?Math.round(n)>e+Ci:!1,Rg=(n,e)=>{if(e!=="hls")return null;const t=Lg({audioTimingInfo:n.audioTimingInfo,videoTimingInfo:n.videoTimingInfo});if(!t)return null;const i=n.playlist.targetDuration,s=vd({segmentDuration:t,maxDuration:i*2}),r=vd({segmentDuration:t,maxDuration:i}),a=`Segment with index ${n.mediaIndex} from playlist ${n.playlist.id} has a duration of ${t} when the reported duration is ${n.duration} and the target duration is ${i}. For HLS content, a duration in excess of the target duration may result in playback issues. See the HLS specification section on EXT-X-TARGETDURATION for more details: https://tools.ietf.org/html/draft-pantos-http-live-streaming-23#section-4.3.3.1`;return s||r?{severity:s?"warn":"info",message:a}:null},mn=({type:n,segment:e})=>{if(!e)return;const t=!!(e.key||e.map&&e.map.ke),i=!!(e.map&&!e.map.bytes),s=e.startOfSegment===void 0?e.start:e.startOfSegment;return{type:n||e.type,uri:e.resolvedUri||e.uri,start:s,duration:e.duration,isEncrypted:t,isMediaInitialization:i}};class $o extends R.EventTarget{constructor(e,t={}){if(super(),!e)throw new TypeError("Initialization settings are required");if(typeof e.currentTime!="function")throw new TypeError("No currentTime getter specified");if(!e.mediaSource)throw new TypeError("No MediaSource specified");this.bandwidth=e.bandwidth,this.throughput={rate:0,count:0},this.roundTrip=NaN,this.resetStats_(),this.mediaIndex=null,this.partIndex=null,this.hasPlayed_=e.hasPlayed,this.currentTime_=e.currentTime,this.seekable_=e.seekable,this.seeking_=e.seeking,this.duration_=e.duration,this.mediaSource_=e.mediaSource,this.vhs_=e.vhs,this.loaderType_=e.loaderType,this.currentMediaInfo_=void 0,this.startingMediaInfo_=void 0,this.segmentMetadataTrack_=e.segmentMetadataTrack,this.goalBufferLength_=e.goalBufferLength,this.sourceType_=e.sourceType,this.sourceUpdater_=e.sourceUpdater,this.inbandTextTracks_=e.inbandTextTracks,this.state_="INIT",this.timelineChangeController_=e.timelineChangeController,this.shouldSaveSegmentTimingInfo_=!0,this.parse708captions_=e.parse708captions,this.useDtsForTimestampOffset_=e.useDtsForTimestampOffset,this.captionServices_=e.captionServices,this.exactManifestTimings=e.exactManifestTimings,this.addMetadataToTextTrack=e.addMetadataToTextTrack,this.checkBufferTimeout_=null,this.error_=void 0,this.currentTimeline_=-1,this.shouldForceTimestampOffsetAfterResync_=!1,this.pendingSegment_=null,this.xhrOptions_=null,this.pendingSegments_=[],this.audioDisabled_=!1,this.isPendingTimestampOffset_=!1,this.gopBuffer_=[],this.timeMapping_=0,this.safeAppend_=!1,this.appendInitSegment_={audio:!0,video:!0},this.playlistOfLastInitSegment_={audio:null,video:null},this.callQueue_=[],this.loadQueue_=[],this.metadataQueue_={id3:[],caption:[]},this.waitingOnRemove_=!1,this.quotaExceededErrorRetryTimeout_=null,this.activeInitSegmentId_=null,this.initSegments_={},this.cacheEncryptionKeys_=e.cacheEncryptionKeys,this.keyCache_={},this.decrypter_=e.decrypter,this.syncController_=e.syncController,this.syncPoint_={segmentIndex:0,time:0},this.transmuxer_=this.createTransmuxer_(),this.triggerSyncInfoUpdate_=()=>this.trigger("syncinfoupdate"),this.syncController_.on("syncinfoupdate",this.triggerSyncInfoUpdate_),this.mediaSource_.addEventListener("sourceopen",()=>{this.isEndOfStream_()||(this.ended_=!1)}),this.fetchAtBuffer_=!1,this.logger_=ri(`SegmentLoader[${this.loaderType_}]`),Object.defineProperty(this,"state",{get(){return this.state_},set(i){i!==this.state_&&(this.logger_(`${this.state_} -> ${i}`),this.state_=i,this.trigger("statechange"))}}),this.sourceUpdater_.on("ready",()=>{this.hasEnoughInfoToAppend_()?this.processCallQueue_():Ji(this)}),this.sourceUpdater_.on("codecschange",i=>{this.trigger((0,ue.A)({type:"codecschange"},i))}),this.loaderType_==="main"&&this.timelineChangeController_.on("pendingtimelinechange",()=>{this.hasEnoughInfoToAppend_()?this.processCallQueue_():Ji(this)}),this.loaderType_==="audio"&&this.timelineChangeController_.on("timelinechange",i=>{this.trigger((0,ue.A)({type:"timelinechange"},i)),this.hasEnoughInfoToLoad_()?this.processLoadQueue_():Ji(this),this.hasEnoughInfoToAppend_()?this.processCallQueue_():Ji(this)})}get mediaSequenceSync_(){return this.syncController_.getMediaSequenceSync(this.loaderType_)}createTransmuxer_(){return Vo.createTransmuxer({remux:!1,alignGopsAtEnd:this.safeAppend_,keepOriginalTimestamps:!0,parse708captions:this.parse708captions_,captionServices:this.captionServices_})}resetStats_(){this.mediaBytesTransferred=0,this.mediaRequests=0,this.mediaRequestsAborted=0,this.mediaRequestsTimedout=0,this.mediaRequestsErrored=0,this.mediaTransferDuration=0,this.mediaSecondsLoaded=0,this.mediaAppends=0}dispose(){this.trigger("dispose"),this.state="DISPOSED",this.pause(),this.abort_(),this.transmuxer_&&this.transmuxer_.terminate(),this.resetStats_(),this.checkBufferTimeout_&&A().clearTimeout(this.checkBufferTimeout_),this.syncController_&&this.triggerSyncInfoUpdate_&&this.syncController_.off("syncinfoupdate",this.triggerSyncInfoUpdate_),this.off()}setAudio(e){this.audioDisabled_=!e,e?this.appendInitSegment_.audio=!0:this.sourceUpdater_.removeAudio(0,this.duration_())}abort(){if(this.state!=="WAITING"){this.pendingSegment_&&(this.pendingSegment_=null);return}this.abort_(),this.state="READY",this.paused()||this.monitorBuffer_()}abort_(){this.pendingSegment_&&this.pendingSegment_.abortRequests&&this.pendingSegment_.abortRequests(),this.pendingSegment_=null,this.callQueue_=[],this.loadQueue_=[],this.metadataQueue_.id3=[],this.metadataQueue_.caption=[],this.timelineChangeController_.clearPendingTimelineChange(this.loaderType_),this.waitingOnRemove_=!1,A().clearTimeout(this.quotaExceededErrorRetryTimeout_),this.quotaExceededErrorRetryTimeout_=null}checkForAbort_(e){return this.state==="APPENDING"&&!this.pendingSegment_?(this.state="READY",!0):!this.pendingSegment_||this.pendingSegment_.requestId!==e}error(e){return typeof e!="undefined"&&(this.logger_("error occurred:",e),this.error_=e),this.pendingSegment_=null,this.error_}endOfStream(){this.ended_=!0,this.transmuxer_&&Vo.reset(this.transmuxer_),this.gopBuffer_.length=0,this.pause(),this.trigger("ended")}buffered_(){const e=this.getMediaInfo_();if(!this.sourceUpdater_||!e)return wt();if(this.loaderType_==="main"){const{hasAudio:t,hasVideo:i,isMuxed:s}=e;if(i&&t&&!this.audioDisabled_&&!s)return this.sourceUpdater_.buffered();if(i)return this.sourceUpdater_.videoBuffered()}return this.sourceUpdater_.audioBuffered()}initSegmentForMap(e,t=!1){if(!e)return null;const i=qr(e);let s=this.initSegments_[i];return t&&!s&&e.bytes&&(this.initSegments_[i]=s={resolvedUri:e.resolvedUri,byterange:e.byterange,bytes:e.bytes,tracks:e.tracks,timescales:e.timescales}),s||e}segmentKey(e,t=!1){if(!e)return null;const i=Hc(e);let s=this.keyCache_[i];this.cacheEncryptionKeys_&&t&&!s&&e.bytes&&(this.keyCache_[i]=s={resolvedUri:e.resolvedUri,bytes:e.bytes});const r={resolvedUri:(s||e).resolvedUri};return s&&(r.bytes=s.bytes),r}couldBeginLoading_(){return this.playlist_&&!this.paused()}load(){if(this.monitorBuffer_(),!!this.playlist_){if(this.state==="INIT"&&this.couldBeginLoading_())return this.init_();!this.couldBeginLoading_()||this.state!=="READY"&&this.state!=="INIT"||(this.state="READY")}}init_(){return this.state="READY",this.resetEverything(),this.monitorBuffer_()}playlist(e,t={}){if(!e)return;const i=this.playlist_,s=this.pendingSegment_;this.playlist_=e,this.xhrOptions_=t,this.state==="INIT"&&(e.syncInfo={mediaSequence:e.mediaSequence,time:0},this.loaderType_==="main"&&this.syncController_.setDateTimeMappingForStart(e));let r=null;if(i&&(i.id?r=i.id:i.uri&&(r=i.uri)),this.logger_(`playlist update [${r} => ${e.id||e.uri}]`),this.mediaSequenceSync_&&(this.mediaSequenceSync_.update(e,this.currentTime_()),this.logger_(`Playlist update:
currentTime: ${this.currentTime_()}
bufferedEnd: ${Bo(this.buffered_())}
`,this.mediaSequenceSync_.diagnostics)),this.trigger("syncinfoupdate"),this.state==="INIT"&&this.couldBeginLoading_())return this.init_();if(!i||i.uri!==e.uri){this.mediaIndex!==null&&(!e.endList&&typeof e.partTargetDuration=="number"?this.resetLoader():this.resyncLoader()),this.currentMediaInfo_=void 0,this.trigger("playlistupdate");return}const a=e.mediaSequence-i.mediaSequence;if(this.logger_(`live window shift [${a}]`),this.mediaIndex!==null)if(this.mediaIndex-=a,this.mediaIndex<0)this.mediaIndex=null,this.partIndex=null;else{const l=this.playlist_.segments[this.mediaIndex];if(this.partIndex&&(!l.parts||!l.parts.length||!l.parts[this.partIndex])){const d=this.mediaIndex;this.logger_(`currently processing part (index ${this.partIndex}) no longer exists.`),this.resetLoader(),this.mediaIndex=d}}s&&(s.mediaIndex-=a,s.mediaIndex<0?(s.mediaIndex=null,s.partIndex=null):(s.mediaIndex>=0&&(s.segment=e.segments[s.mediaIndex]),s.partIndex>=0&&s.segment.parts&&(s.part=s.segment.parts[s.partIndex]))),this.syncController_.saveExpiredSegmentInfo(i,e)}pause(){this.checkBufferTimeout_&&(A().clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=null)}paused(){return this.checkBufferTimeout_===null}resetEverything(e){this.ended_=!1,this.activeInitSegmentId_=null,this.appendInitSegment_={audio:!0,video:!0},this.resetLoader(),this.remove(0,1/0,e),this.transmuxer_&&(this.transmuxer_.postMessage({action:"clearAllMp4Captions"}),this.transmuxer_.postMessage({action:"reset"}))}resetLoader(){this.fetchAtBuffer_=!1,this.mediaSequenceSync_&&this.mediaSequenceSync_.resetAppendedStatus(),this.resyncLoader()}resyncLoader(){this.transmuxer_&&Vo.reset(this.transmuxer_),this.mediaIndex=null,this.partIndex=null,this.syncPoint_=null,this.isPendingTimestampOffset_=!1;const e=this.currentMediaInfo_&&this.currentMediaInfo_.isFmp4;this.sourceType_==="hls"&&!e&&(this.shouldForceTimestampOffsetAfterResync_=!0),this.callQueue_=[],this.loadQueue_=[],this.metadataQueue_.id3=[],this.metadataQueue_.caption=[],this.abort(),this.transmuxer_&&this.transmuxer_.postMessage({action:"clearParsedMp4Captions"})}remove(e,t,i=()=>{},s=!1){if(t===1/0&&(t=this.duration_()),t<=e){this.logger_("skipping remove because end ${end} is <= start ${start}");return}if(!this.sourceUpdater_||!this.getMediaInfo_()){this.logger_("skipping remove because no source updater or starting media info");return}let r=1;const a=()=>{r--,r===0&&i()};(s||!this.audioDisabled_)&&(r++,this.sourceUpdater_.removeAudio(e,t,a)),(s||this.loaderType_==="main")&&(this.gopBuffer_=xg(this.gopBuffer_,e,t,this.timeMapping_),r++,this.sourceUpdater_.removeVideo(e,t,a));for(const l in this.inbandTextTracks_)Fs(e,t,this.inbandTextTracks_[l]);Fs(e,t,this.segmentMetadataTrack_),a()}monitorBuffer_(){this.checkBufferTimeout_&&A().clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=A().setTimeout(this.monitorBufferTick_.bind(this),1)}monitorBufferTick_(){this.state==="READY"&&this.fillBuffer_(),this.checkBufferTimeout_&&A().clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=A().setTimeout(this.monitorBufferTick_.bind(this),Bg)}fillBuffer_(){if(this.sourceUpdater_.updating())return;const e=this.chooseNextRequest_();if(!e)return;const t={segmentInfo:mn({type:this.loaderType_,segment:e})};this.trigger({type:"segmentselected",metadata:t}),typeof e.timestampOffset=="number"&&(this.isPendingTimestampOffset_=!1,this.timelineChangeController_.pendingTimelineChange({type:this.loaderType_,from:this.currentTimeline_,to:e.timeline})),this.loadSegment_(e)}isEndOfStream_(e=this.mediaIndex,t=this.playlist_,i=this.partIndex){if(!t||!this.mediaSource_)return!1;const s=typeof e=="number"&&t.segments[e],r=e+1===t.segments.length,a=!s||!s.parts||i+1===s.parts.length;return t.endList&&this.mediaSource_.readyState==="open"&&r&&a}chooseNextRequest_(){const e=this.buffered_(),t=Bo(e)||0,i=wo(e,this.currentTime_()),s=!this.hasPlayed_()&&i>=1,r=i>=this.goalBufferLength_(),a=this.playlist_.segments;if(!a.length||s||r)return null;this.syncPoint_=this.syncPoint_||this.syncController_.getSyncPoint(this.playlist_,this.duration_(),this.currentTimeline_,this.currentTime_(),this.loaderType_);const l={partIndex:null,mediaIndex:null,startOfSegment:null,playlist:this.playlist_,isSyncRequest:!this.syncPoint_};if(l.isSyncRequest)l.mediaIndex=jg(this.currentTimeline_,a,t),this.logger_(`choose next request. Can not find sync point. Fallback to media Index: ${l.mediaIndex}`);else if(this.mediaIndex!==null){const B=a[this.mediaIndex],D=typeof this.partIndex=="number"?this.partIndex:-1;l.startOfSegment=B.end?B.end:t,B.parts&&B.parts[D+1]?(l.mediaIndex=this.mediaIndex,l.partIndex=D+1):l.mediaIndex=this.mediaIndex+1}else{let B,D,P;const b=this.fetchAtBuffer_?t:this.currentTime_();if(this.mediaSequenceSync_&&this.logger_(`chooseNextRequest_ request after Quality Switch:
For TargetTime: ${b}.
CurrentTime: ${this.currentTime_()}
BufferedEnd: ${t}
Fetch At Buffer: ${this.fetchAtBuffer_}
`,this.mediaSequenceSync_.diagnostics),this.mediaSequenceSync_&&this.mediaSequenceSync_.isReliable){const U=this.getSyncInfoFromMediaSequenceSync_(b);if(!U){const H="No sync info found while using media sequence sync";return this.error({message:H,metadata:{errorType:R.Error.StreamingFailedToSelectNextSegment,error:new Error(H)}}),this.logger_("chooseNextRequest_ - no sync info found using media sequence sync"),null}this.logger_(`chooseNextRequest_ mediaSequence syncInfo (${U.start} --> ${U.end})`),B=U.segmentIndex,D=U.partIndex,P=U.start}else{this.logger_("chooseNextRequest_ - fallback to a regular segment selection algorithm, based on a syncPoint.");const U=Ht.getMediaInfoForTime({exactManifestTimings:this.exactManifestTimings,playlist:this.playlist_,currentTime:b,startingPartIndex:this.syncPoint_.partIndex,startingSegmentIndex:this.syncPoint_.segmentIndex,startTime:this.syncPoint_.time});B=U.segmentIndex,D=U.partIndex,P=U.startTime}l.getMediaInfoForTime=this.fetchAtBuffer_?`bufferedEnd ${b}`:`currentTime ${b}`,l.mediaIndex=B,l.startOfSegment=P,l.partIndex=D,this.logger_(`choose next request. Playlist switched and we have a sync point. Media Index: ${l.mediaIndex} `)}const d=a[l.mediaIndex];let p=d&&typeof l.partIndex=="number"&&d.parts&&d.parts[l.partIndex];if(!d||typeof l.partIndex=="number"&&!p)return null;typeof l.partIndex!="number"&&d.parts&&(l.partIndex=0,p=d.parts[0]);const g=this.vhs_.playlists&&this.vhs_.playlists.main&&this.vhs_.playlists.main.independentSegments||this.playlist_.independentSegments;if(!i&&p&&!g&&!p.independent)if(l.partIndex===0){const B=a[l.mediaIndex-1],D=B.parts&&B.parts.length&&B.parts[B.parts.length-1];D&&D.independent&&(l.mediaIndex-=1,l.partIndex=B.parts.length-1,l.independent="previous segment")}else d.parts[l.partIndex-1].independent&&(l.partIndex-=1,l.independent="previous part");const y=this.mediaSource_&&this.mediaSource_.readyState==="ended";return l.mediaIndex>=a.length-1&&y&&!this.seeking_()?null:(this.shouldForceTimestampOffsetAfterResync_&&(this.shouldForceTimestampOffsetAfterResync_=!1,l.forceTimestampOffset=!0,this.logger_("choose next request. Force timestamp offset after loader resync")),this.generateSegmentInfo_(l))}getSyncInfoFromMediaSequenceSync_(e){if(!this.mediaSequenceSync_)return null;const t=Math.max(e,this.mediaSequenceSync_.start);e!==t&&this.logger_(`getSyncInfoFromMediaSequenceSync_. Pulled target time from ${e} to ${t}`);const i=this.mediaSequenceSync_.getSyncInfoForTime(t);if(!i)return null;if(!i.isAppended)return i;const s=this.mediaSequenceSync_.getSyncInfoForTime(i.end);return s?(s.isAppended&&this.logger_("getSyncInfoFromMediaSequenceSync_: We encounter unexpected scenario where next media sequence sync info is also appended!"),s):null}generateSegmentInfo_(e){const{independent:t,playlist:i,mediaIndex:s,startOfSegment:r,isSyncRequest:a,partIndex:l,forceTimestampOffset:d,getMediaInfoForTime:p}=e,g=i.segments[s],y=typeof l=="number"&&g.parts[l],B={requestId:"segment-loader-"+Math.random(),uri:y&&y.resolvedUri||g.resolvedUri,mediaIndex:s,partIndex:y?l:null,isSyncRequest:a,startOfSegment:r,playlist:i,bytes:null,encryptedBytes:null,timestampOffset:null,timeline:g.timeline,duration:y&&y.duration||g.duration,segment:g,part:y,byteLength:0,transmuxer:this.transmuxer_,getMediaInfoForTime:p,independent:t},D=typeof d!="undefined"?d:this.isPendingTimestampOffset_;B.timestampOffset=this.timestampOffsetForSegment_({segmentTimeline:g.timeline,currentTimeline:this.currentTimeline_,startOfSegment:r,buffered:this.buffered_(),overrideCheck:D});const P=Bo(this.sourceUpdater_.audioBuffered());return typeof P=="number"&&(B.audioAppendStart=P-this.sourceUpdater_.audioTimestampOffset()),this.sourceUpdater_.videoBuffered().length&&(B.gopsToAlignWith=Tg(this.gopBuffer_,this.currentTime_()-this.sourceUpdater_.videoTimestampOffset(),this.timeMapping_)),B}timestampOffsetForSegment_(e){return kg(e)}earlyAbortWhenNeeded_(e){if(this.vhs_.tech_.paused()||!this.xhrOptions_.timeout||!this.playlist_.attributes.BANDWIDTH||Date.now()-(e.firstBytesReceivedAt||Date.now())<1e3)return;const t=this.currentTime_(),i=e.bandwidth,s=this.pendingSegment_.duration,r=Ht.estimateSegmentRequestTime(s,i,this.playlist_,e.bytesReceived),a=nm(this.buffered_(),t,this.vhs_.tech_.playbackRate())-1;if(r<=a)return;const l=hg({main:this.vhs_.playlists.main,currentTime:t,bandwidth:i,duration:this.duration_(),segmentDuration:s,timeUntilRebuffer:a,currentTimeline:this.currentTimeline_,syncController:this.syncController_});if(!l)return;const p=r-a-l.rebufferingImpact;let g=.5;a<=Ci&&(g=1),!(!l.playlist||l.playlist.uri===this.playlist_.uri||p<g)&&(this.bandwidth=l.playlist.attributes.BANDWIDTH*jt.BANDWIDTH_VARIANCE+1,this.trigger("earlyabort"))}handleAbort_(e){this.logger_(`Aborting ${es(e)}`),this.mediaRequestsAborted+=1}handleProgress_(e,t){this.earlyAbortWhenNeeded_(t.stats),!this.checkForAbort_(t.requestId)&&this.trigger("progress")}handleTrackInfo_(e,t){const{hasAudio:i,hasVideo:s}=t,r={segmentInfo:mn({type:this.loaderType_,segment:e}),trackInfo:{hasAudio:i,hasVideo:s}};this.trigger({type:"segmenttransmuxingtrackinfoavailable",metadata:r}),this.earlyAbortWhenNeeded_(e.stats),!this.checkForAbort_(e.requestId)&&(this.checkForIllegalMediaSwitch(t)||(t=t||{},Sg(this.currentMediaInfo_,t)||(this.appendInitSegment_={audio:!0,video:!0},this.startingMediaInfo_=t,this.currentMediaInfo_=t,this.logger_("trackinfo update",t),this.trigger("trackinfo")),!this.checkForAbort_(e.requestId)&&(this.pendingSegment_.trackInfo=t,this.hasEnoughInfoToAppend_()?this.processCallQueue_():Ji(this))))}handleTimingInfo_(e,t,i,s){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;const r=this.pendingSegment_,a=gd(t);r[a]=r[a]||{},r[a][i]=s,this.logger_(`timinginfo: ${t} - ${i} - ${s}`),this.hasEnoughInfoToAppend_()?this.processCallQueue_():Ji(this)}handleCaptions_(e,t){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;if(t.length===0){this.logger_("SegmentLoader received no captions from a caption event");return}if(!this.pendingSegment_.hasAppendedData_){this.metadataQueue_.caption.push(this.handleCaptions_.bind(this,e,t));return}const s=this.sourceUpdater_.videoTimestampOffset()===null?this.sourceUpdater_.audioTimestampOffset():this.sourceUpdater_.videoTimestampOffset(),r={};t.forEach(a=>{r[a.stream]=r[a.stream]||{startTime:1/0,captions:[],endTime:0};const l=r[a.stream];l.startTime=Math.min(l.startTime,a.startTime+s),l.endTime=Math.max(l.endTime,a.endTime+s),l.captions.push(a)}),Object.keys(r).forEach(a=>{const{startTime:l,endTime:d,captions:p}=r[a],g=this.inbandTextTracks_;this.logger_(`adding cues from ${l} -> ${d} for ${a}`),mg(g,this.vhs_.tech_,a),Fs(l,d,g[a]),gg({captionArray:p,inbandTextTracks:g,timestampOffset:s})}),this.transmuxer_&&this.transmuxer_.postMessage({action:"clearParsedMp4Captions"})}handleId3_(e,t,i){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;if(!this.pendingSegment_.hasAppendedData_){this.metadataQueue_.id3.push(this.handleId3_.bind(this,e,t,i));return}this.addMetadataToTextTrack(i,t,this.duration_())}processMetadataQueue_(){this.metadataQueue_.id3.forEach(e=>e()),this.metadataQueue_.caption.forEach(e=>e()),this.metadataQueue_.id3=[],this.metadataQueue_.caption=[]}processCallQueue_(){const e=this.callQueue_;this.callQueue_=[],e.forEach(t=>t())}processLoadQueue_(){const e=this.loadQueue_;this.loadQueue_=[],e.forEach(t=>t())}hasEnoughInfoToLoad_(){if(this.loaderType_!=="audio")return!0;const e=this.pendingSegment_;return e?this.getCurrentMediaInfo_()?!Wo({timelineChangeController:this.timelineChangeController_,currentTimeline:this.currentTimeline_,segmentTimeline:e.timeline,loaderType:this.loaderType_,audioDisabled:this.audioDisabled_}):!0:!1}getCurrentMediaInfo_(e=this.pendingSegment_){return e&&e.trackInfo||this.currentMediaInfo_}getMediaInfo_(e=this.pendingSegment_){return this.getCurrentMediaInfo_(e)||this.startingMediaInfo_}getPendingSegmentPlaylist(){return this.pendingSegment_?this.pendingSegment_.playlist:null}hasEnoughInfoToAppend_(){if(!this.sourceUpdater_.ready()||this.waitingOnRemove_||this.quotaExceededErrorRetryTimeout_)return!1;const e=this.pendingSegment_,t=this.getCurrentMediaInfo_();if(!e||!t)return!1;const{hasAudio:i,hasVideo:s,isMuxed:r}=t;return!(s&&!e.videoTimingInfo||i&&!this.audioDisabled_&&!r&&!e.audioTimingInfo||Wo({timelineChangeController:this.timelineChangeController_,currentTimeline:this.currentTimeline_,segmentTimeline:e.timeline,loaderType:this.loaderType_,audioDisabled:this.audioDisabled_}))}handleData_(e,t){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;if(this.callQueue_.length||!this.hasEnoughInfoToAppend_()){Ji(this),this.callQueue_.push(this.handleData_.bind(this,e,t));return}const i=this.pendingSegment_;if(this.setTimeMapping_(i.timeline),this.updateMediaSecondsLoaded_(i.part||i.segment),this.mediaSource_.readyState!=="closed"){if(e.map&&(e.map=this.initSegmentForMap(e.map,!0),i.segment.map=e.map),e.key&&this.segmentKey(e.key,!0),i.isFmp4=e.isFmp4,i.timingInfo=i.timingInfo||{},i.isFmp4)this.trigger("fmp4"),i.timingInfo.start=i[gd(t.type)].start;else{const s=this.getCurrentMediaInfo_(),r=this.loaderType_==="main"&&s&&s.hasVideo;let a;r&&(a=i.videoTimingInfo.start),i.timingInfo.start=this.trueSegmentStart_({currentStart:i.timingInfo.start,playlist:i.playlist,mediaIndex:i.mediaIndex,currentVideoTimestampOffset:this.sourceUpdater_.videoTimestampOffset(),useVideoTimingInfo:r,firstVideoFrameTimeForData:a,videoTimingInfo:i.videoTimingInfo,audioTimingInfo:i.audioTimingInfo})}if(this.updateAppendInitSegmentStatus(i,t.type),this.updateSourceBufferTimestampOffset_(i),i.isSyncRequest){this.updateTimingInfoEnd_(i),this.syncController_.saveSegmentTimingInfo({segmentInfo:i,shouldSaveTimelineMapping:this.loaderType_==="main"});const s=this.chooseNextRequest_();if(s.mediaIndex!==i.mediaIndex||s.partIndex!==i.partIndex){this.logger_("sync segment was incorrect, not appending");return}this.logger_("sync segment was correct, appending")}i.hasAppendedData_=!0,this.processMetadataQueue_(),this.appendData_(i,t)}}updateAppendInitSegmentStatus(e,t){this.loaderType_==="main"&&typeof e.timestampOffset=="number"&&!e.changedTimestampOffset&&(this.appendInitSegment_={audio:!0,video:!0}),this.playlistOfLastInitSegment_[t]!==e.playlist&&(this.appendInitSegment_[t]=!0)}getInitSegmentAndUpdateState_({type:e,initSegment:t,map:i,playlist:s}){if(i){const r=qr(i);if(this.activeInitSegmentId_===r)return null;t=this.initSegmentForMap(i,!0).bytes,this.activeInitSegmentId_=r}return t&&this.appendInitSegment_[e]?(this.playlistOfLastInitSegment_[e]=s,this.appendInitSegment_[e]=!1,this.activeInitSegmentId_=null,t):null}handleQuotaExceededError_({segmentInfo:e,type:t,bytes:i},s){const r=this.sourceUpdater_.audioBuffered(),a=this.sourceUpdater_.videoBuffered();r.length>1&&this.logger_("On QUOTA_EXCEEDED_ERR, found gaps in the audio buffer: "+fn(r).join(", ")),a.length>1&&this.logger_("On QUOTA_EXCEEDED_ERR, found gaps in the video buffer: "+fn(a).join(", "));const l=r.length?r.start(0):0,d=r.length?r.end(r.length-1):0,p=a.length?a.start(0):0,g=a.length?a.end(a.length-1):0;if(d-l<=Us&&g-p<=Us){this.logger_(`On QUOTA_EXCEEDED_ERR, single segment too large to append to buffer, triggering an error. Appended byte length: ${i.byteLength}, audio buffer: ${fn(r).join(", ")}, video buffer: ${fn(a).join(", ")}, `),this.error({message:"Quota exceeded error with append of a single segment of content",excludeUntil:1/0}),this.trigger("error");return}this.waitingOnRemove_=!0,this.callQueue_.push(this.appendToSourceBuffer_.bind(this,{segmentInfo:e,type:t,bytes:i}));const B=this.currentTime_()-Us;this.logger_(`On QUOTA_EXCEEDED_ERR, removing audio/video from 0 to ${B}`),this.remove(0,B,()=>{this.logger_(`On QUOTA_EXCEEDED_ERR, retrying append in ${Us}s`),this.waitingOnRemove_=!1,this.quotaExceededErrorRetryTimeout_=A().setTimeout(()=>{this.logger_("On QUOTA_EXCEEDED_ERR, re-processing call queue"),this.quotaExceededErrorRetryTimeout_=null,this.processCallQueue_()},Us*1e3)},!0)}handleAppendError_({segmentInfo:e,type:t,bytes:i},s){if(s){if(s.code===Rc){this.handleQuotaExceededError_({segmentInfo:e,type:t,bytes:i});return}this.logger_("Received non QUOTA_EXCEEDED_ERR on append",s),this.error({message:`${t} append of ${i.length}b failed for segment #${e.mediaIndex} in playlist ${e.playlist.id}`,metadata:{errorType:R.Error.StreamingFailedToAppendSegment}}),this.trigger("appenderror")}}appendToSourceBuffer_({segmentInfo:e,type:t,initSegment:i,data:s,bytes:r}){if(!r){const l=[s];let d=s.byteLength;i&&(l.unshift(i),d+=i.byteLength),r=pg({bytes:d,segments:l})}const a={segmentInfo:mn({type:this.loaderType_,segment:e})};this.trigger({type:"segmentappendstart",metadata:a}),this.sourceUpdater_.appendBuffer({segmentInfo:e,type:t,bytes:r},this.handleAppendError_.bind(this,{segmentInfo:e,type:t,bytes:r}))}handleSegmentTimingInfo_(e,t,i){if(!this.pendingSegment_||t!==this.pendingSegment_.requestId)return;const s=this.pendingSegment_.segment,r=`${e}TimingInfo`;s[r]||(s[r]={}),s[r].transmuxerPrependedSeconds=i.prependedContentDuration||0,s[r].transmuxedPresentationStart=i.start.presentation,s[r].transmuxedDecodeStart=i.start.decode,s[r].transmuxedPresentationEnd=i.end.presentation,s[r].transmuxedDecodeEnd=i.end.decode,s[r].baseMediaDecodeTime=i.baseMediaDecodeTime}appendData_(e,t){const{type:i,data:s}=t;if(!s||!s.byteLength||i==="audio"&&this.audioDisabled_)return;const r=this.getInitSegmentAndUpdateState_({type:i,initSegment:t.initSegment,playlist:e.playlist,map:e.isFmp4?e.segment.map:null});this.appendToSourceBuffer_({segmentInfo:e,type:i,initSegment:r,data:s})}loadSegment_(e){if(this.state="WAITING",this.pendingSegment_=e,this.trimBackBuffer_(e),typeof e.timestampOffset=="number"&&this.transmuxer_&&this.transmuxer_.postMessage({action:"clearAllMp4Captions"}),!this.hasEnoughInfoToLoad_()){Ji(this),this.loadQueue_.push(()=>{const t=(0,ue.A)({},e,{forceTimestampOffset:!0});(0,ue.A)(e,this.generateSegmentInfo_(t)),this.isPendingTimestampOffset_=!1,this.updateTransmuxerAndRequestSegment_(e)});return}this.updateTransmuxerAndRequestSegment_(e)}updateTransmuxerAndRequestSegment_(e){this.shouldUpdateTransmuxerTimestampOffset_(e.timestampOffset)&&(this.gopBuffer_.length=0,e.gopsToAlignWith=[],this.timeMapping_=0,this.transmuxer_.postMessage({action:"reset"}),this.transmuxer_.postMessage({action:"setTimestampOffset",timestampOffset:e.timestampOffset}));const t=this.createSimplifiedSegmentObj_(e),i=this.isEndOfStream_(e.mediaIndex,e.playlist,e.partIndex),s=this.mediaIndex!==null,r=e.timeline!==this.currentTimeline_&&e.timeline>0,a=i||s&&r;this.logger_(`Requesting
${fd(e.uri)}
${es(e)}`),t.map&&!t.map.bytes&&(this.logger_("going to request init segment."),this.appendInitSegment_={video:!0,audio:!0}),e.abortRequests=ag({xhr:this.vhs_.xhr,xhrOptions:this.xhrOptions_,decryptionWorker:this.decrypter_,segment:t,abortFn:this.handleAbort_.bind(this,e),progressFn:this.handleProgress_.bind(this),trackInfoFn:this.handleTrackInfo_.bind(this),timingInfoFn:this.handleTimingInfo_.bind(this),videoSegmentTimingInfoFn:this.handleSegmentTimingInfo_.bind(this,"video",e.requestId),audioSegmentTimingInfoFn:this.handleSegmentTimingInfo_.bind(this,"audio",e.requestId),captionsFn:this.handleCaptions_.bind(this),isEndOfTimeline:a,endedTimelineFn:()=>{this.logger_("received endedtimeline callback")},id3Fn:this.handleId3_.bind(this),dataFn:this.handleData_.bind(this),doneFn:this.segmentRequestFinished_.bind(this),onTransmuxerLog:({message:l,level:d,stream:p})=>{this.logger_(`${es(e)} logged from transmuxer stream ${p} as a ${d}: ${l}`)},triggerSegmentEventFn:({type:l,segment:d,keyInfo:p,trackInfo:g,timingInfo:y})=>{const D={segmentInfo:mn({segment:d})};p&&(D.keyInfo=p),g&&(D.trackInfo=g),y&&(D.timingInfo=y),this.trigger({type:l,metadata:D})}})}trimBackBuffer_(e){const t=Dg(this.seekable_(),this.currentTime_(),this.playlist_.targetDuration||10);t>0&&this.remove(0,t)}createSimplifiedSegmentObj_(e){const t=e.segment,i=e.part,s=e.segment.key||e.segment.map&&e.segment.map.key,r=e.segment.map&&!e.segment.map.bytes,a={resolvedUri:i?i.resolvedUri:t.resolvedUri,byterange:i?i.byterange:t.byterange,requestId:e.requestId,transmuxer:e.transmuxer,audioAppendStart:e.audioAppendStart,gopsToAlignWith:e.gopsToAlignWith,part:e.part,type:this.loaderType_,start:e.startOfSegment,duration:e.duration,isEncrypted:s,isMediaInitialization:r},l=e.playlist.segments[e.mediaIndex-1];if(l&&l.timeline===t.timeline&&(l.videoTimingInfo?a.baseStartTime=l.videoTimingInfo.transmuxedDecodeEnd:l.audioTimingInfo&&(a.baseStartTime=l.audioTimingInfo.transmuxedDecodeEnd)),t.key){const d=t.key.iv||new Uint32Array([0,0,0,e.mediaIndex+e.playlist.mediaSequence]);a.key=this.segmentKey(t.key),a.key.iv=d}return t.map&&(a.map=this.initSegmentForMap(t.map)),a}saveTransferStats_(e){this.mediaRequests+=1,e&&(this.mediaBytesTransferred+=e.bytesReceived,this.mediaTransferDuration+=e.roundTripTime)}saveBandwidthRelatedStats_(e,t){if(this.pendingSegment_.byteLength=t.bytesReceived,e<Yr){this.logger_(`Ignoring segment's bandwidth because its duration of ${e} is less than the min to record ${Yr}`);return}const i={bandwidthInfo:{from:this.bandwidth,to:t.bandwidth}};this.trigger({type:"bandwidthupdated",metadata:i}),this.bandwidth=t.bandwidth,this.roundTrip=t.roundTripTime}handleTimeout_(){this.mediaRequestsTimedout+=1,this.bandwidth=1,this.roundTrip=NaN,this.trigger("bandwidthupdate"),this.trigger("timeout")}segmentRequestFinished_(e,t,i){if(this.callQueue_.length){this.callQueue_.push(this.segmentRequestFinished_.bind(this,e,t,i));return}if(this.saveTransferStats_(t.stats),!this.pendingSegment_||t.requestId!==this.pendingSegment_.requestId)return;if(e){if(this.pendingSegment_=null,this.state="READY",e.code===Si.ABORTED)return;if(this.pause(),e.code===Si.TIMEOUT){this.handleTimeout_();return}this.mediaRequestsErrored+=1,this.error(e),this.trigger("error");return}const s=this.pendingSegment_;this.saveBandwidthRelatedStats_(s.duration,t.stats),s.endOfAllRequests=t.endOfAllRequests,i.gopInfo&&(this.gopBuffer_=Cg(this.gopBuffer_,i.gopInfo,this.safeAppend_)),this.state="APPENDING",this.trigger("appending"),this.waitForAppendsToComplete_(s)}setTimeMapping_(e){const t=this.syncController_.mappingForTimeline(e);t!==null&&(this.timeMapping_=t)}updateMediaSecondsLoaded_(e){typeof e.start=="number"&&typeof e.end=="number"?this.mediaSecondsLoaded+=e.end-e.start:this.mediaSecondsLoaded+=e.duration}shouldUpdateTransmuxerTimestampOffset_(e){return e===null?!1:this.loaderType_==="main"&&e!==this.sourceUpdater_.videoTimestampOffset()||!this.audioDisabled_&&e!==this.sourceUpdater_.audioTimestampOffset()}trueSegmentStart_({currentStart:e,playlist:t,mediaIndex:i,firstVideoFrameTimeForData:s,currentVideoTimestampOffset:r,useVideoTimingInfo:a,videoTimingInfo:l,audioTimingInfo:d}){if(typeof e!="undefined")return e;if(!a)return d.start;const p=t.segments[i-1];return i===0||!p||typeof p.start=="undefined"||p.end!==s+r?s:l.start}waitForAppendsToComplete_(e){const t=this.getCurrentMediaInfo_(e);if(!t){this.error({message:"No starting media returned, likely due to an unsupported media format.",playlistExclusionDuration:1/0}),this.trigger("error");return}const{hasAudio:i,hasVideo:s,isMuxed:r}=t,a=this.loaderType_==="main"&&s,l=!this.audioDisabled_&&i&&!r;if(e.waitingOnAppends=0,!e.hasAppendedData_){!e.timingInfo&&typeof e.timestampOffset=="number"&&(this.isPendingTimestampOffset_=!0),e.timingInfo={start:0},e.waitingOnAppends++,this.isPendingTimestampOffset_||(this.updateSourceBufferTimestampOffset_(e),this.processMetadataQueue_()),this.checkAppendsDone_(e);return}a&&e.waitingOnAppends++,l&&e.waitingOnAppends++,a&&this.sourceUpdater_.videoQueueCallback(this.checkAppendsDone_.bind(this,e)),l&&this.sourceUpdater_.audioQueueCallback(this.checkAppendsDone_.bind(this,e))}checkAppendsDone_(e){this.checkForAbort_(e.requestId)||(e.waitingOnAppends--,e.waitingOnAppends===0&&this.handleAppendsDone_())}checkForIllegalMediaSwitch(e){const t=wg(this.loaderType_,this.getCurrentMediaInfo_(),e);return t?(this.error({message:t,playlistExclusionDuration:1/0}),this.trigger("error"),!0):!1}updateSourceBufferTimestampOffset_(e){if(e.timestampOffset===null||typeof e.timingInfo.start!="number"||e.changedTimestampOffset||this.loaderType_!=="main")return;let t=!1;e.timestampOffset-=this.getSegmentStartTimeForTimestampOffsetCalculation_({videoTimingInfo:e.segment.videoTimingInfo,audioTimingInfo:e.segment.audioTimingInfo,timingInfo:e.timingInfo}),e.changedTimestampOffset=!0,e.timestampOffset!==this.sourceUpdater_.videoTimestampOffset()&&(this.sourceUpdater_.videoTimestampOffset(e.timestampOffset),t=!0),e.timestampOffset!==this.sourceUpdater_.audioTimestampOffset()&&(this.sourceUpdater_.audioTimestampOffset(e.timestampOffset),t=!0),t&&this.trigger("timestampoffset")}getSegmentStartTimeForTimestampOffsetCalculation_({videoTimingInfo:e,audioTimingInfo:t,timingInfo:i}){return this.useDtsForTimestampOffset_?e&&typeof e.transmuxedDecodeStart=="number"?e.transmuxedDecodeStart:t&&typeof t.transmuxedDecodeStart=="number"?t.transmuxedDecodeStart:i.start:i.start}updateTimingInfoEnd_(e){e.timingInfo=e.timingInfo||{};const t=this.getMediaInfo_(),s=this.loaderType_==="main"&&t&&t.hasVideo&&e.videoTimingInfo?e.videoTimingInfo:e.audioTimingInfo;s&&(e.timingInfo.end=typeof s.end=="number"?s.end:s.start+e.duration)}handleAppendsDone_(){if(this.pendingSegment_){const d={segmentInfo:mn({type:this.loaderType_,segment:this.pendingSegment_})};this.trigger({type:"appendsdone",metadata:d})}if(!this.pendingSegment_){this.state="READY",this.paused()||this.monitorBuffer_();return}const e=this.pendingSegment_;e.part&&e.part.syncInfo?e.part.syncInfo.markAppended():e.segment.syncInfo&&e.segment.syncInfo.markAppended(),this.updateTimingInfoEnd_(e),this.shouldSaveSegmentTimingInfo_&&this.syncController_.saveSegmentTimingInfo({segmentInfo:e,shouldSaveTimelineMapping:this.loaderType_==="main"});const t=Rg(e,this.sourceType_);if(t&&(t.severity==="warn"?R.log.warn(t.message):this.logger_(t.message)),this.recordThroughput_(e),this.pendingSegment_=null,this.state="READY",e.isSyncRequest&&(this.trigger("syncinfoupdate"),!e.hasAppendedData_)){this.logger_(`Throwing away un-appended sync request ${es(e)}`);return}this.logger_(`Appended ${es(e)}`),this.addSegmentMetadataCue_(e),this.fetchAtBuffer_=!0,this.currentTimeline_!==e.timeline&&(this.timelineChangeController_.lastTimelineChange({type:this.loaderType_,from:this.currentTimeline_,to:e.timeline}),this.loaderType_==="main"&&!this.audioDisabled_&&this.timelineChangeController_.lastTimelineChange({type:"audio",from:this.currentTimeline_,to:e.timeline})),this.currentTimeline_=e.timeline,this.trigger("syncinfoupdate");const i=e.segment,s=e.part,r=i.end&&this.currentTime_()-i.end>e.playlist.targetDuration*3,a=s&&s.end&&this.currentTime_()-s.end>e.playlist.partTargetDuration*3;if(r||a){this.logger_(`bad ${r?"segment":"part"} ${es(e)}`),this.resetEverything();return}this.mediaIndex!==null&&this.trigger("bandwidthupdate"),this.trigger("progress"),this.mediaIndex=e.mediaIndex,this.partIndex=e.partIndex,this.isEndOfStream_(e.mediaIndex,e.playlist,e.partIndex)&&this.endOfStream(),this.trigger("appended"),e.hasAppendedData_&&this.mediaAppends++,this.paused()||this.monitorBuffer_()}recordThroughput_(e){if(e.duration<Yr){this.logger_(`Ignoring segment's throughput because its duration of ${e.duration} is less than the min to record ${Yr}`);return}const t=this.throughput.rate,i=Date.now()-e.endOfAllRequests+1,s=Math.floor(e.byteLength/i*8*1e3);this.throughput.rate+=(s-t)/++this.throughput.count}addSegmentMetadataCue_(e){if(!this.segmentMetadataTrack_)return;const t=e.segment,i=t.start,s=t.end;if(!md(i)||!md(s))return;Fs(i,s,this.segmentMetadataTrack_);const r=A().WebKitDataCue||A().VTTCue,a={custom:t.custom,dateTimeObject:t.dateTimeObject,dateTimeString:t.dateTimeString,programDateTime:t.programDateTime,bandwidth:e.playlist.attributes.BANDWIDTH,resolution:e.playlist.attributes.RESOLUTION,codecs:e.playlist.attributes.CODECS,byteLength:e.byteLength,uri:e.uri,timeline:e.timeline,playlist:e.playlist.id,start:i,end:s},l=JSON.stringify(a),d=new r(i,s,l);d.value=a,this.segmentMetadataTrack_.addCue(d)}}function Fi(){}const Ad=function(n){return typeof n!="string"?n:n.replace(/./,e=>e.toUpperCase())},Ng=["video","audio"],Go=(n,e)=>{const t=e[`${n}Buffer`];return t&&t.updating||e.queuePending[n]},Mg=(n,e)=>{for(let t=0;t<e.length;t++){const i=e[t];if(i.type==="mediaSource")return null;if(i.type===n)return t}return null},ts=(n,e)=>{if(e.queue.length===0)return;let t=0,i=e.queue[t];if(i.type==="mediaSource"){!e.updating()&&e.mediaSource.readyState!=="closed"&&(e.queue.shift(),i.action(e),i.doneFn&&i.doneFn(),ts("audio",e),ts("video",e));return}if(n!=="mediaSource"&&!(!e.ready()||e.mediaSource.readyState==="closed"||Go(n,e))){if(i.type!==n){if(t=Mg(n,e.queue),t===null)return;i=e.queue[t]}if(e.queue.splice(t,1),e.queuePending[n]=i,i.action(n,e),!i.doneFn){e.queuePending[n]=null,ts(n,e);return}}},yd=(n,e)=>{const t=e[`${n}Buffer`],i=Ad(n);t&&(t.removeEventListener("updateend",e[`on${i}UpdateEnd_`]),t.removeEventListener("error",e[`on${i}Error_`]),e.codecs[n]=null,e[`${n}Buffer`]=null)},ji=(n,e)=>n&&e&&Array.prototype.indexOf.call(n.sourceBuffers,e)!==-1,Kt={appendBuffer:(n,e,t)=>(i,s)=>{const r=s[`${i}Buffer`];if(ji(s.mediaSource,r)){s.logger_(`Appending segment ${e.mediaIndex}'s ${n.length} bytes to ${i}Buffer`);try{r.appendBuffer(n)}catch(a){s.logger_(`Error with code ${a.code} `+(a.code===Rc?"(QUOTA_EXCEEDED_ERR) ":"")+`when appending segment ${e.mediaIndex} to ${i}Buffer`),s.queuePending[i]=null,t(a)}}},remove:(n,e)=>(t,i)=>{const s=i[`${t}Buffer`];if(ji(i.mediaSource,s)){i.logger_(`Removing ${n} to ${e} from ${t}Buffer`);try{s.remove(n,e)}catch(r){i.logger_(`Remove ${n} to ${e} from ${t}Buffer failed`)}}},timestampOffset:n=>(e,t)=>{const i=t[`${e}Buffer`];ji(t.mediaSource,i)&&(t.logger_(`Setting ${e}timestampOffset to ${n}`),i.timestampOffset=n)},callback:n=>(e,t)=>{n()},endOfStream:n=>e=>{if(e.mediaSource.readyState==="open"){e.logger_(`Calling mediaSource endOfStream(${n||""})`);try{e.mediaSource.endOfStream(n)}catch(t){R.log.warn("Failed to call media source endOfStream",t)}}},duration:n=>e=>{e.logger_(`Setting mediaSource duration to ${n}`);try{e.mediaSource.duration=n}catch(t){R.log.warn("Failed to set media source duration",t)}},abort:()=>(n,e)=>{if(e.mediaSource.readyState!=="open")return;const t=e[`${n}Buffer`];if(ji(e.mediaSource,t)){e.logger_(`calling abort on ${n}Buffer`);try{t.abort()}catch(i){R.log.warn(`Failed to abort on ${n}Buffer`,i)}}},addSourceBuffer:(n,e)=>t=>{const i=Ad(n),s=Me(e);t.logger_(`Adding ${n}Buffer with codec ${e} to mediaSource`);const r=t.mediaSource.addSourceBuffer(s);r.addEventListener("updateend",t[`on${i}UpdateEnd_`]),r.addEventListener("error",t[`on${i}Error_`]),t.codecs[n]=e,t[`${n}Buffer`]=r},removeSourceBuffer:n=>e=>{const t=e[`${n}Buffer`];if(yd(n,e),!!ji(e.mediaSource,t)){e.logger_(`Removing ${n}Buffer with codec ${e.codecs[n]} from mediaSource`);try{e.mediaSource.removeSourceBuffer(t)}catch(i){R.log.warn(`Failed to removeSourceBuffer ${n}Buffer`,i)}}},changeType:n=>(e,t)=>{const i=t[`${e}Buffer`],s=Me(n);if(!ji(t.mediaSource,i))return;const r=n.substring(0,n.indexOf(".")),a=t.codecs[e];if(a.substring(0,a.indexOf("."))===r)return;const d={codecsChangeInfo:{from:a,to:n}};t.trigger({type:"codecschange",metadata:d}),t.logger_(`changing ${e}Buffer codec from ${a} to ${n}`);try{i.changeType(s),t.codecs[e]=n}catch(p){d.errorType=R.Error.StreamingCodecsChangeError,d.error=p,p.metadata=d,t.error_=p,t.trigger("error"),R.log.warn(`Failed to changeType on ${e}Buffer`,p)}}},Qt=({type:n,sourceUpdater:e,action:t,doneFn:i,name:s})=>{e.queue.push({type:n,action:t,doneFn:i,name:s}),ts(n,e)},_d=(n,e)=>t=>{const i=e[`${n}Buffered`](),s=em(i);if(e.logger_(`received "updateend" event for ${n} Source Buffer: `,s),e.queuePending[n]){const r=e.queuePending[n].doneFn;e.queuePending[n]=null,r&&r(e[`${n}Error_`])}ts(n,e)};class bd extends R.EventTarget{constructor(e){super(),this.mediaSource=e,this.sourceopenListener_=()=>ts("mediaSource",this),this.mediaSource.addEventListener("sourceopen",this.sourceopenListener_),this.logger_=ri("SourceUpdater"),this.audioTimestampOffset_=0,this.videoTimestampOffset_=0,this.queue=[],this.queuePending={audio:null,video:null},this.delayedAudioAppendQueue_=[],this.videoAppendQueued_=!1,this.codecs={},this.onVideoUpdateEnd_=_d("video",this),this.onAudioUpdateEnd_=_d("audio",this),this.onVideoError_=t=>{this.videoError_=t},this.onAudioError_=t=>{this.audioError_=t},this.createdSourceBuffers_=!1,this.initializedEme_=!1,this.triggeredReady_=!1}initializedEme(){this.initializedEme_=!0,this.triggerReady()}hasCreatedSourceBuffers(){return this.createdSourceBuffers_}hasInitializedAnyEme(){return this.initializedEme_}ready(){return this.hasCreatedSourceBuffers()&&this.hasInitializedAnyEme()}createSourceBuffers(e){this.hasCreatedSourceBuffers()||(this.addOrChangeSourceBuffers(e),this.createdSourceBuffers_=!0,this.trigger("createdsourcebuffers"),this.triggerReady())}triggerReady(){this.ready()&&!this.triggeredReady_&&(this.triggeredReady_=!0,this.trigger("ready"))}addSourceBuffer(e,t){Qt({type:"mediaSource",sourceUpdater:this,action:Kt.addSourceBuffer(e,t),name:"addSourceBuffer"})}abort(e){Qt({type:e,sourceUpdater:this,action:Kt.abort(e),name:"abort"})}removeSourceBuffer(e){if(!this.canRemoveSourceBuffer()){R.log.error("removeSourceBuffer is not supported!");return}Qt({type:"mediaSource",sourceUpdater:this,action:Kt.removeSourceBuffer(e),name:"removeSourceBuffer"})}canRemoveSourceBuffer(){return!R.browser.IS_FIREFOX&&A().MediaSource&&A().MediaSource.prototype&&typeof A().MediaSource.prototype.removeSourceBuffer=="function"}static canChangeType(){return A().SourceBuffer&&A().SourceBuffer.prototype&&typeof A().SourceBuffer.prototype.changeType=="function"}canChangeType(){return this.constructor.canChangeType()}changeType(e,t){if(!this.canChangeType()){R.log.error("changeType is not supported!");return}Qt({type:e,sourceUpdater:this,action:Kt.changeType(t),name:"changeType"})}addOrChangeSourceBuffers(e){if(!e||typeof e!="object"||Object.keys(e).length===0)throw new Error("Cannot addOrChangeSourceBuffers to undefined codecs");Object.keys(e).forEach(t=>{const i=e[t];if(!this.hasCreatedSourceBuffers())return this.addSourceBuffer(t,i);this.canChangeType()&&this.changeType(t,i)})}appendBuffer(e,t){const{segmentInfo:i,type:s,bytes:r}=e;if(this.processedAppend_=!0,s==="audio"&&this.videoBuffer&&!this.videoAppendQueued_){this.delayedAudioAppendQueue_.push([e,t]),this.logger_(`delayed audio append of ${r.length} until video append`);return}const a=t;if(Qt({type:s,sourceUpdater:this,action:Kt.appendBuffer(r,i||{mediaIndex:-1},a),doneFn:t,name:"appendBuffer"}),s==="video"){if(this.videoAppendQueued_=!0,!this.delayedAudioAppendQueue_.length)return;const l=this.delayedAudioAppendQueue_.slice();this.logger_(`queuing delayed audio ${l.length} appendBuffers`),this.delayedAudioAppendQueue_.length=0,l.forEach(d=>{this.appendBuffer.apply(this,d)})}}audioBuffered(){return ji(this.mediaSource,this.audioBuffer)&&this.audioBuffer.buffered?this.audioBuffer.buffered:wt()}videoBuffered(){return ji(this.mediaSource,this.videoBuffer)&&this.videoBuffer.buffered?this.videoBuffer.buffered:wt()}buffered(){const e=ji(this.mediaSource,this.videoBuffer)?this.videoBuffer:null,t=ji(this.mediaSource,this.audioBuffer)?this.audioBuffer:null;return t&&!e?this.audioBuffered():e&&!t?this.videoBuffered():im(this.audioBuffered(),this.videoBuffered())}setDuration(e,t=Fi){Qt({type:"mediaSource",sourceUpdater:this,action:Kt.duration(e),name:"duration",doneFn:t})}endOfStream(e=null,t=Fi){typeof e!="string"&&(e=void 0),Qt({type:"mediaSource",sourceUpdater:this,action:Kt.endOfStream(e),name:"endOfStream",doneFn:t})}removeAudio(e,t,i=Fi){if(!this.audioBuffered().length||this.audioBuffered().end(0)===0){i();return}Qt({type:"audio",sourceUpdater:this,action:Kt.remove(e,t),doneFn:i,name:"remove"})}removeVideo(e,t,i=Fi){if(!this.videoBuffered().length||this.videoBuffered().end(0)===0){i();return}Qt({type:"video",sourceUpdater:this,action:Kt.remove(e,t),doneFn:i,name:"remove"})}updating(){return!!(Go("audio",this)||Go("video",this))}audioTimestampOffset(e){return typeof e!="undefined"&&this.audioBuffer&&this.audioTimestampOffset_!==e&&(Qt({type:"audio",sourceUpdater:this,action:Kt.timestampOffset(e),name:"timestampOffset"}),this.audioTimestampOffset_=e),this.audioTimestampOffset_}videoTimestampOffset(e){return typeof e!="undefined"&&this.videoBuffer&&this.videoTimestampOffset_!==e&&(Qt({type:"video",sourceUpdater:this,action:Kt.timestampOffset(e),name:"timestampOffset"}),this.videoTimestampOffset_=e),this.videoTimestampOffset_}audioQueueCallback(e){this.audioBuffer&&Qt({type:"audio",sourceUpdater:this,action:Kt.callback(e),name:"callback"})}videoQueueCallback(e){this.videoBuffer&&Qt({type:"video",sourceUpdater:this,action:Kt.callback(e),name:"callback"})}dispose(){this.trigger("dispose"),Ng.forEach(e=>{this.abort(e),this.canRemoveSourceBuffer()?this.removeSourceBuffer(e):this[`${e}QueueCallback`](()=>yd(e,this))}),this.videoAppendQueued_=!1,this.delayedAudioAppendQueue_.length=0,this.sourceopenListener_&&this.mediaSource.removeEventListener("sourceopen",this.sourceopenListener_),this.off()}}const Ed=n=>decodeURIComponent(escape(String.fromCharCode.apply(null,n))),Fg=n=>{const e=new Uint8Array(n);return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")},Td=new Uint8Array(`

`.split("").map(n=>n.charCodeAt(0)));class Ug extends Error{constructor(){super("Trying to parse received VTT cues, but there is no WebVTT. Make sure vtt.js is loaded.")}}class Vg extends $o{constructor(e,t={}){super(e,t),this.mediaSource_=null,this.subtitlesTrack_=null,this.featuresNativeTextTracks_=e.featuresNativeTextTracks,this.loadVttJs=e.loadVttJs,this.shouldSaveSegmentTimingInfo_=!1}createTransmuxer_(){return null}buffered_(){if(!this.subtitlesTrack_||!this.subtitlesTrack_.cues||!this.subtitlesTrack_.cues.length)return wt();const e=this.subtitlesTrack_.cues,t=e[0].startTime,i=e[e.length-1].startTime;return wt([[t,i]])}initSegmentForMap(e,t=!1){if(!e)return null;const i=qr(e);let s=this.initSegments_[i];if(t&&!s&&e.bytes){const r=Td.byteLength+e.bytes.byteLength,a=new Uint8Array(r);a.set(e.bytes),a.set(Td,e.bytes.byteLength),this.initSegments_[i]=s={resolvedUri:e.resolvedUri,byterange:e.byterange,bytes:a}}return s||e}couldBeginLoading_(){return this.playlist_&&this.subtitlesTrack_&&!this.paused()}init_(){return this.state="READY",this.resetEverything(),this.monitorBuffer_()}track(e){return typeof e=="undefined"?this.subtitlesTrack_:(this.subtitlesTrack_=e,this.state==="INIT"&&this.couldBeginLoading_()&&this.init_(),this.subtitlesTrack_)}remove(e,t){Fs(e,t,this.subtitlesTrack_)}fillBuffer_(){const e=this.chooseNextRequest_();if(e){if(this.syncController_.timestampOffsetForTimeline(e.timeline)===null){const t=()=>{this.state="READY",this.paused()||this.monitorBuffer_()};this.syncController_.one("timestampoffset",t),this.state="WAITING_ON_TIMELINE";return}this.loadSegment_(e)}}timestampOffsetForSegment_(){return null}chooseNextRequest_(){return this.skipEmptySegments_(super.chooseNextRequest_())}skipEmptySegments_(e){for(;e&&e.segment.empty;){if(e.mediaIndex+1>=e.playlist.segments.length){e=null;break}e=this.generateSegmentInfo_({playlist:e.playlist,mediaIndex:e.mediaIndex+1,startOfSegment:e.startOfSegment+e.duration,isSyncRequest:e.isSyncRequest})}return e}stopForError(e){this.error(e),this.state="READY",this.pause(),this.trigger("error")}segmentRequestFinished_(e,t,i){if(!this.subtitlesTrack_){this.state="READY";return}if(this.saveTransferStats_(t.stats),!this.pendingSegment_){this.state="READY",this.mediaRequestsAborted+=1;return}if(e){e.code===Si.TIMEOUT&&this.handleTimeout_(),e.code===Si.ABORTED?this.mediaRequestsAborted+=1:this.mediaRequestsErrored+=1,this.stopForError(e);return}const s=this.pendingSegment_;this.saveBandwidthRelatedStats_(s.duration,t.stats),t.key&&this.segmentKey(t.key,!0),this.state="APPENDING",this.trigger("appending");const r=s.segment;if(r.map&&(r.map.bytes=t.map.bytes),s.bytes=t.bytes,typeof A().WebVTT!="function"&&typeof this.loadVttJs=="function"){this.state="WAITING_ON_VTTJS",this.loadVttJs().then(()=>this.segmentRequestFinished_(e,t,i),()=>this.stopForError({message:"Error loading vtt.js"}));return}r.requested=!0;try{this.parseVTTCues_(s)}catch(a){this.stopForError({message:a.message,metadata:{errorType:R.Error.StreamingVttParserError,error:a}});return}if(this.updateTimeMapping_(s,this.syncController_.timelines[s.timeline],this.playlist_),s.cues.length?s.timingInfo={start:s.cues[0].startTime,end:s.cues[s.cues.length-1].endTime}:s.timingInfo={start:s.startOfSegment,end:s.startOfSegment+s.duration},s.isSyncRequest){this.trigger("syncinfoupdate"),this.pendingSegment_=null,this.state="READY";return}s.byteLength=s.bytes.byteLength,this.mediaSecondsLoaded+=r.duration,s.cues.forEach(a=>{this.subtitlesTrack_.addCue(this.featuresNativeTextTracks_?new(A()).VTTCue(a.startTime,a.endTime,a.text):a)}),Eg(this.subtitlesTrack_),this.handleAppendsDone_()}handleData_(){}updateTimingInfoEnd_(){}parseVTTCues_(e){let t,i=!1;if(typeof A().WebVTT!="function")throw new Ug;typeof A().TextDecoder=="function"?t=new(A()).TextDecoder("utf8"):(t=A().WebVTT.StringDecoder(),i=!0);const s=new(A()).WebVTT.Parser(A(),A().vttjs,t);if(e.cues=[],e.timestampmap={MPEGTS:0,LOCAL:0},s.oncue=e.cues.push.bind(e.cues),s.ontimestampmap=a=>{e.timestampmap=a},s.onparsingerror=a=>{R.log.warn("Error encountered when parsing cues: "+a.message)},e.segment.map){let a=e.segment.map.bytes;i&&(a=Ed(a)),s.parse(a)}let r=e.bytes;i&&(r=Ed(r)),s.parse(r),s.flush()}updateTimeMapping_(e,t,i){const s=e.segment;if(!t)return;if(!e.cues.length){s.empty=!0;return}const{MPEGTS:r,LOCAL:a}=e.timestampmap,d=r/an.ONE_SECOND_IN_TS-a+t.mapping;if(e.cues.forEach(p=>{const g=p.endTime-p.startTime,y=this.handleRollover_(p.startTime+d,t.time);p.startTime=Math.max(y,0),p.endTime=Math.max(y+g,0)}),!i.syncInfo){const p=e.cues[0].startTime,g=e.cues[e.cues.length-1].startTime;i.syncInfo={mediaSequence:i.mediaSequence+e.mediaIndex,time:Math.min(p,g-s.duration)}}}handleRollover_(e,t){if(t===null)return e;let i=e*an.ONE_SECOND_IN_TS;const s=t*an.ONE_SECOND_IN_TS;let r;for(s<i?r=-8589934592:r=8589934592;Math.abs(i-s)>4294967296;)i+=r;return i/an.ONE_SECOND_IN_TS}}const zg=function(n,e){const t=n.cues;for(let i=0;i<t.length;i++){const s=t[i];if(e>=s.adStartTime&&e<=s.adEndTime)return s}return null},Hg=function(n,e,t=0){if(!n.segments)return;let i=t,s;for(let r=0;r<n.segments.length;r++){const a=n.segments[r];if(s||(s=zg(e,i+a.duration/2)),s){if("cueIn"in a){s.endTime=i,s.adEndTime=i,i+=a.duration,s=null;continue}if(i<s.endTime){i+=a.duration;continue}s.endTime+=a.duration}else if("cueOut"in a&&(s=new(A()).VTTCue(i,i+a.duration,a.cueOut),s.adStartTime=i,s.adEndTime=i+parseFloat(a.cueOut),e.addCue(s)),"cueOutCont"in a){const[l,d]=a.cueOutCont.split("/").map(parseFloat);s=new(A()).VTTCue(i,i+a.duration,""),s.adStartTime=i-l,s.adEndTime=s.adStartTime+d,e.addCue(s)}i+=a.duration}};class Cd{constructor({start:e,end:t,segmentIndex:i,partIndex:s=null,appended:r=!1}){this.start_=e,this.end_=t,this.segmentIndex_=i,this.partIndex_=s,this.appended_=r}isInRange(e){return e>=this.start&&e<this.end}markAppended(){this.appended_=!0}resetAppendedStatus(){this.appended_=!1}get isAppended(){return this.appended_}get start(){return this.start_}get end(){return this.end_}get segmentIndex(){return this.segmentIndex_}get partIndex(){return this.partIndex_}}class qg{constructor(e,t=[]){this.segmentSyncInfo_=e,this.partsSyncInfo_=t}get segmentSyncInfo(){return this.segmentSyncInfo_}get partsSyncInfo(){return this.partsSyncInfo_}get hasPartsSyncInfo(){return this.partsSyncInfo_.length>0}resetAppendStatus(){this.segmentSyncInfo_.resetAppendedStatus(),this.partsSyncInfo_.forEach(e=>e.resetAppendedStatus())}}class xd{constructor(){this.storage_=new Map,this.diagnostics_="",this.isReliable_=!1,this.start_=-1/0,this.end_=1/0}get start(){return this.start_}get end(){return this.end_}get diagnostics(){return this.diagnostics_}get isReliable(){return this.isReliable_}resetAppendedStatus(){this.storage_.forEach(e=>e.resetAppendStatus())}update(e,t){const{mediaSequence:i,segments:s}=e;if(this.isReliable_=this.isReliablePlaylist_(i,s),!!this.isReliable_)return this.updateStorage_(s,i,this.calculateBaseTime_(i,t))}getSyncInfoForTime(e){for(const{segmentSyncInfo:t,partsSyncInfo:i}of this.storage_.values())if(i.length){for(const s of i)if(s.isInRange(e))return s}else if(t.isInRange(e))return t;return null}getSyncInfoForMediaSequence(e){return this.storage_.get(e)}updateStorage_(e,t,i){const s=new Map;let r=`
`,a=i,l=t;this.start_=a,e.forEach((d,p)=>{const g=this.storage_.get(l),y=a,B=y+d.duration,D=!!(g&&g.segmentSyncInfo&&g.segmentSyncInfo.isAppended),P=new Cd({start:y,end:B,appended:D,segmentIndex:p});d.syncInfo=P;let b=a;const U=(d.parts||[]).map((H,F)=>{const N=b,Y=b+H.duration,O=!!(g&&g.partsSyncInfo&&g.partsSyncInfo[F]&&g.partsSyncInfo[F].isAppended),K=new Cd({start:N,end:Y,appended:O,segmentIndex:p,partIndex:F});return b=Y,r+=`Media Sequence: ${l}.${F} | Range: ${N} --> ${Y} | Appended: ${O}
`,H.syncInfo=K,K});s.set(l,new qg(P,U)),r+=`${fd(d.resolvedUri)} | Media Sequence: ${l} | Range: ${y} --> ${B} | Appended: ${D}
`,l++,a=B}),this.end_=a,this.storage_=s,this.diagnostics_=r}calculateBaseTime_(e,t){return this.storage_.size?this.storage_.has(e)?this.storage_.get(e).segmentSyncInfo.start:t:0}isReliablePlaylist_(e,t){return e!=null&&Array.isArray(t)&&t.length}}class Sd extends xd{constructor(e){super(),this.parent_=e}calculateBaseTime_(e,t){if(!this.storage_.size){const i=this.parent_.getSyncInfoForMediaSequence(e);return i?i.segmentSyncInfo.start:0}return super.calculateBaseTime_(e,t)}}const Wg=86400,Yo=[{name:"VOD",run:(n,e,t,i,s)=>t!==1/0?{time:0,segmentIndex:0,partIndex:null}:null},{name:"MediaSequence",run:(n,e,t,i,s,r)=>{const a=n.getMediaSequenceSync(r);if(!a||!a.isReliable)return null;const l=a.getSyncInfoForTime(s);return l?{time:l.start,partIndex:l.partIndex,segmentIndex:l.segmentIndex}:null}},{name:"ProgramDateTime",run:(n,e,t,i,s)=>{if(!Object.keys(n.timelineToDatetimeMappings).length)return null;let r=null,a=null;const l=ko(e);s=s||0;for(let d=0;d<l.length;d++){const p=e.endList||s===0?d:l.length-(d+1),g=l[p],y=g.segment,B=n.timelineToDatetimeMappings[y.timeline];if(!B||!y.dateTimeObject)continue;let P=y.dateTimeObject.getTime()/1e3+B;if(y.parts&&typeof g.partIndex=="number")for(let U=0;U<g.partIndex;U++)P+=y.parts[U].duration;const b=Math.abs(s-P);if(a!==null&&(b===0||a<b))break;a=b,r={time:P,segmentIndex:g.segmentIndex,partIndex:g.partIndex}}return r}},{name:"Segment",run:(n,e,t,i,s)=>{let r=null,a=null;s=s||0;const l=ko(e);for(let d=0;d<l.length;d++){const p=e.endList||s===0?d:l.length-(d+1),g=l[p],y=g.segment,B=g.part&&g.part.start||y&&y.start;if(y.timeline===i&&typeof B!="undefined"){const D=Math.abs(s-B);if(a!==null&&a<D)break;(!r||a===null||a>=D)&&(a=D,r={time:B,segmentIndex:g.segmentIndex,partIndex:g.partIndex})}}return r}},{name:"Discontinuity",run:(n,e,t,i,s)=>{let r=null;if(s=s||0,e.discontinuityStarts&&e.discontinuityStarts.length){let a=null;for(let l=0;l<e.discontinuityStarts.length;l++){const d=e.discontinuityStarts[l],p=e.discontinuitySequence+l+1,g=n.discontinuities[p];if(g){const y=Math.abs(s-g.time);if(a!==null&&a<y)break;(!r||a===null||a>=y)&&(a=y,r={time:g.time,segmentIndex:d,partIndex:null})}}}return r}},{name:"Playlist",run:(n,e,t,i,s)=>e.syncInfo?{time:e.syncInfo.time,segmentIndex:e.syncInfo.mediaSequence-e.mediaSequence,partIndex:null}:null}];class $g extends R.EventTarget{constructor(e={}){super(),this.timelines=[],this.discontinuities=[],this.timelineToDatetimeMappings={};const t=new xd,i=new Sd(t),s=new Sd(t);this.mediaSequenceStorage_={main:t,audio:i,vtt:s},this.logger_=ri("SyncController")}getMediaSequenceSync(e){return this.mediaSequenceStorage_[e]||null}getSyncPoint(e,t,i,s,r){if(t!==1/0)return Yo.find(({name:d})=>d==="VOD").run(this,e,t);const a=this.runStrategies_(e,t,i,s,r);if(!a.length)return null;for(const l of a){const{syncPoint:d,strategy:p}=l,{segmentIndex:g,time:y}=d;if(g<0)continue;const B=e.segments[g],D=y,P=D+B.duration;if(this.logger_(`Strategy: ${p}. Current time: ${s}. selected segment: ${g}. Time: [${D} -> ${P}]}`),s>=D&&s<P)return this.logger_("Found sync point with exact match: ",d),d}return this.selectSyncPoint_(a,{key:"time",value:s})}getExpiredTime(e,t){if(!e||!e.segments)return null;const i=this.runStrategies_(e,t,e.discontinuitySequence,0);if(!i.length)return null;const s=this.selectSyncPoint_(i,{key:"segmentIndex",value:0});return s.segmentIndex>0&&(s.time*=-1),Math.abs(s.time+Ls({defaultDuration:e.targetDuration,durationList:e.segments,startIndex:s.segmentIndex,endIndex:0}))}runStrategies_(e,t,i,s,r){const a=[];for(let l=0;l<Yo.length;l++){const d=Yo[l],p=d.run(this,e,t,i,s,r);p&&(p.strategy=d.name,a.push({strategy:d.name,syncPoint:p}))}return a}selectSyncPoint_(e,t){let i=e[0].syncPoint,s=Math.abs(e[0].syncPoint[t.key]-t.value),r=e[0].strategy;for(let a=1;a<e.length;a++){const l=Math.abs(e[a].syncPoint[t.key]-t.value);l<s&&(s=l,i=e[a].syncPoint,r=e[a].strategy)}return this.logger_(`syncPoint for [${t.key}: ${t.value}] chosen with strategy [${r}]: [time:${i.time}, segmentIndex:${i.segmentIndex}`+(typeof i.partIndex=="number"?`,partIndex:${i.partIndex}`:"")+"]"),i}saveExpiredSegmentInfo(e,t){const i=t.mediaSequence-e.mediaSequence;if(i>Wg){R.log.warn(`Not saving expired segment info. Media sequence gap ${i} is too large.`);return}for(let s=i-1;s>=0;s--){const r=e.segments[s];if(r&&typeof r.start!="undefined"){t.syncInfo={mediaSequence:e.mediaSequence+s,time:r.start},this.logger_(`playlist refresh sync: [time:${t.syncInfo.time}, mediaSequence: ${t.syncInfo.mediaSequence}]`),this.trigger("syncinfoupdate");break}}}setDateTimeMappingForStart(e){if(this.timelineToDatetimeMappings={},e.segments&&e.segments.length&&e.segments[0].dateTimeObject){const t=e.segments[0],i=t.dateTimeObject.getTime()/1e3;this.timelineToDatetimeMappings[t.timeline]=-i}}saveSegmentTimingInfo({segmentInfo:e,shouldSaveTimelineMapping:t}){const i=this.calculateSegmentTimeMapping_(e,e.timingInfo,t),s=e.segment;i&&(this.saveDiscontinuitySyncInfo_(e),e.playlist.syncInfo||(e.playlist.syncInfo={mediaSequence:e.playlist.mediaSequence+e.mediaIndex,time:s.start}));const r=s.dateTimeObject;s.discontinuity&&t&&r&&(this.timelineToDatetimeMappings[s.timeline]=-(r.getTime()/1e3))}timestampOffsetForTimeline(e){return typeof this.timelines[e]=="undefined"?null:this.timelines[e].time}mappingForTimeline(e){return typeof this.timelines[e]=="undefined"?null:this.timelines[e].mapping}calculateSegmentTimeMapping_(e,t,i){const s=e.segment,r=e.part;let a=this.timelines[e.timeline],l,d;if(typeof e.timestampOffset=="number")a={time:e.startOfSegment,mapping:e.startOfSegment-t.start},i&&(this.timelines[e.timeline]=a,this.trigger("timestampoffset"),this.logger_(`time mapping for timeline ${e.timeline}: [time: ${a.time}] [mapping: ${a.mapping}]`)),l=e.startOfSegment,d=t.end+a.mapping;else if(a)l=t.start+a.mapping,d=t.end+a.mapping;else return!1;return r&&(r.start=l,r.end=d),(!s.start||l<s.start)&&(s.start=l),s.end=d,!0}saveDiscontinuitySyncInfo_(e){const t=e.playlist,i=e.segment;if(i.discontinuity)this.discontinuities[i.timeline]={time:i.start,accuracy:0};else if(t.discontinuityStarts&&t.discontinuityStarts.length)for(let s=0;s<t.discontinuityStarts.length;s++){const r=t.discontinuityStarts[s],a=t.discontinuitySequence+s+1,l=r-e.mediaIndex,d=Math.abs(l);if(!this.discontinuities[a]||this.discontinuities[a].accuracy>d){let p;l<0?p=i.start-Ls({defaultDuration:t.targetDuration,durationList:t.segments,startIndex:e.mediaIndex,endIndex:r}):p=i.end+Ls({defaultDuration:t.targetDuration,durationList:t.segments,startIndex:e.mediaIndex+1,endIndex:r}),this.discontinuities[a]={time:p,accuracy:d}}}}dispose(){this.trigger("dispose"),this.off()}}class Gg extends R.EventTarget{constructor(){super(),this.pendingTimelineChanges_={},this.lastTimelineChanges_={}}clearPendingTimelineChange(e){this.pendingTimelineChanges_[e]=null,this.trigger("pendingtimelinechange")}pendingTimelineChange({type:e,from:t,to:i}){return typeof t=="number"&&typeof i=="number"&&(this.pendingTimelineChanges_[e]={type:e,from:t,to:i},this.trigger("pendingtimelinechange")),this.pendingTimelineChanges_[e]}lastTimelineChange({type:e,from:t,to:i}){if(typeof t=="number"&&typeof i=="number"){this.lastTimelineChanges_[e]={type:e,from:t,to:i},delete this.pendingTimelineChanges_[e];const s={timelineChangeInfo:{from:t,to:i}};this.trigger({type:"timelinechange",metadata:s})}return this.lastTimelineChanges_[e]}dispose(){this.trigger("dispose"),this.pendingTimelineChanges_={},this.lastTimelineChanges_={},this.off()}}const Yg=Qc(Jc(function(){var n=function(){function b(){this.listeners={}}var U=b.prototype;return U.on=function(F,N){this.listeners[F]||(this.listeners[F]=[]),this.listeners[F].push(N)},U.off=function(F,N){if(!this.listeners[F])return!1;var Y=this.listeners[F].indexOf(N);return this.listeners[F]=this.listeners[F].slice(0),this.listeners[F].splice(Y,1),Y>-1},U.trigger=function(F){var N=this.listeners[F];if(N)if(arguments.length===2)for(var Y=N.length,O=0;O<Y;++O)N[O].call(this,arguments[1]);else for(var K=Array.prototype.slice.call(arguments,1),be=N.length,Ee=0;Ee<be;++Ee)N[Ee].apply(this,K)},U.dispose=function(){this.listeners={}},U.pipe=function(F){this.on("data",function(N){F.push(N)})},b}();/*! @name pkcs7 @version 1.0.4 @license Apache-2.0 */function e(b){return b.subarray(0,b.byteLength-b[b.byteLength-1])}/*! @name aes-decrypter @version 4.0.2 @license Apache-2.0 */const t=function(){const b=[[[],[],[],[],[]],[[],[],[],[],[]]],U=b[0],H=b[1],F=U[4],N=H[4];let Y,O,K;const be=[],Ee=[];let We,vt,Bt,ut,we,Ke;for(Y=0;Y<256;Y++)Ee[(be[Y]=Y<<1^(Y>>7)*283)^Y]=Y;for(O=K=0;!F[O];O^=We||1,K=Ee[K]||1)for(ut=K^K<<1^K<<2^K<<3^K<<4,ut=ut>>8^ut&255^99,F[O]=ut,N[ut]=O,Bt=be[vt=be[We=be[O]]],Ke=Bt*16843009^vt*65537^We*257^O*16843008,we=be[ut]*257^ut*16843008,Y=0;Y<4;Y++)U[Y][O]=we=we<<24^we>>>8,H[Y][ut]=Ke=Ke<<24^Ke>>>8;for(Y=0;Y<5;Y++)U[Y]=U[Y].slice(0),H[Y]=H[Y].slice(0);return b};let i=null;class s{constructor(U){i||(i=t()),this._tables=[[i[0][0].slice(),i[0][1].slice(),i[0][2].slice(),i[0][3].slice(),i[0][4].slice()],[i[1][0].slice(),i[1][1].slice(),i[1][2].slice(),i[1][3].slice(),i[1][4].slice()]];let H,F,N;const Y=this._tables[0][4],O=this._tables[1],K=U.length;let be=1;if(K!==4&&K!==6&&K!==8)throw new Error("Invalid aes key size");const Ee=U.slice(0),We=[];for(this._key=[Ee,We],H=K;H<4*K+28;H++)N=Ee[H-1],(H%K===0||K===8&&H%K===4)&&(N=Y[N>>>24]<<24^Y[N>>16&255]<<16^Y[N>>8&255]<<8^Y[N&255],H%K===0&&(N=N<<8^N>>>24^be<<24,be=be<<1^(be>>7)*283)),Ee[H]=Ee[H-K]^N;for(F=0;H;F++,H--)N=Ee[F&3?H:H-4],H<=4||F<4?We[F]=N:We[F]=O[0][Y[N>>>24]]^O[1][Y[N>>16&255]]^O[2][Y[N>>8&255]]^O[3][Y[N&255]]}decrypt(U,H,F,N,Y,O){const K=this._key[1];let be=U^K[0],Ee=N^K[1],We=F^K[2],vt=H^K[3],Bt,ut,we;const Ke=K.length/4-2;let ai,Vi=4;const Zi=this._tables[1],gn=Zi[0],vn=Zi[1],An=Zi[2],yn=Zi[3],_n=Zi[4];for(ai=0;ai<Ke;ai++)Bt=gn[be>>>24]^vn[Ee>>16&255]^An[We>>8&255]^yn[vt&255]^K[Vi],ut=gn[Ee>>>24]^vn[We>>16&255]^An[vt>>8&255]^yn[be&255]^K[Vi+1],we=gn[We>>>24]^vn[vt>>16&255]^An[be>>8&255]^yn[Ee&255]^K[Vi+2],vt=gn[vt>>>24]^vn[be>>16&255]^An[Ee>>8&255]^yn[We&255]^K[Vi+3],Vi+=4,be=Bt,Ee=ut,We=we;for(ai=0;ai<4;ai++)Y[(3&-ai)+O]=_n[be>>>24]<<24^_n[Ee>>16&255]<<16^_n[We>>8&255]<<8^_n[vt&255]^K[Vi++],Bt=be,be=Ee,Ee=We,We=vt,vt=Bt}}class r extends n{constructor(){super(n),this.jobs=[],this.delay=1,this.timeout_=null}processJob_(){this.jobs.shift()(),this.jobs.length?this.timeout_=setTimeout(this.processJob_.bind(this),this.delay):this.timeout_=null}push(U){this.jobs.push(U),this.timeout_||(this.timeout_=setTimeout(this.processJob_.bind(this),this.delay))}}const a=function(b){return b<<24|(b&65280)<<8|(b&16711680)>>8|b>>>24},l=function(b,U,H){const F=new Int32Array(b.buffer,b.byteOffset,b.byteLength>>2),N=new s(Array.prototype.slice.call(U)),Y=new Uint8Array(b.byteLength),O=new Int32Array(Y.buffer);let K,be,Ee,We,vt,Bt,ut,we,Ke;for(K=H[0],be=H[1],Ee=H[2],We=H[3],Ke=0;Ke<F.length;Ke+=4)vt=a(F[Ke]),Bt=a(F[Ke+1]),ut=a(F[Ke+2]),we=a(F[Ke+3]),N.decrypt(vt,Bt,ut,we,O,Ke),O[Ke]=a(O[Ke]^K),O[Ke+1]=a(O[Ke+1]^be),O[Ke+2]=a(O[Ke+2]^Ee),O[Ke+3]=a(O[Ke+3]^We),K=vt,be=Bt,Ee=ut,We=we;return Y};class d{constructor(U,H,F,N){const Y=d.STEP,O=new Int32Array(U.buffer),K=new Uint8Array(U.byteLength);let be=0;for(this.asyncStream_=new r,this.asyncStream_.push(this.decryptChunk_(O.subarray(be,be+Y),H,F,K)),be=Y;be<O.length;be+=Y)F=new Uint32Array([a(O[be-4]),a(O[be-3]),a(O[be-2]),a(O[be-1])]),this.asyncStream_.push(this.decryptChunk_(O.subarray(be,be+Y),H,F,K));this.asyncStream_.push(function(){N(null,e(K))})}static get STEP(){return 32e3}decryptChunk_(U,H,F,N){return function(){const Y=l(U,H,F);N.set(Y,U.byteOffset)}}}var p=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof W.g!="undefined"?W.g:typeof self!="undefined"?self:{},g;typeof window!="undefined"?g=window:typeof p!="undefined"?g=p:typeof self!="undefined"?g=self:g={};var y=g,B=function(U){return ArrayBuffer.isView==="function"?ArrayBuffer.isView(U):U&&U.buffer instanceof ArrayBuffer},D=y.BigInt||Number;D("0x1"),D("0x100"),D("0x10000"),D("0x1000000"),D("0x100000000"),D("0x10000000000"),D("0x1000000000000"),D("0x100000000000000"),D("0x10000000000000000"),function(){var b=new Uint16Array([65484]),U=new Uint8Array(b.buffer,b.byteOffset,b.byteLength);return U[0]===255?"big":U[0]===204?"little":"unknown"}();const P=function(b){const U={};return Object.keys(b).forEach(H=>{const F=b[H];B(F)?U[H]={bytes:F.buffer,byteOffset:F.byteOffset,byteLength:F.byteLength}:U[H]=F}),U};self.onmessage=function(b){const U=b.data,H=new Uint8Array(U.encrypted.bytes,U.encrypted.byteOffset,U.encrypted.byteLength),F=new Uint32Array(U.key.bytes,U.key.byteOffset,U.key.byteLength/4),N=new Uint32Array(U.iv.bytes,U.iv.byteOffset,U.iv.byteLength/4);new d(H,F,N,function(Y,O){self.postMessage(P({source:U.source,decrypted:O}),[O.buffer])})}}));var Xg=Kc(Yg);const Kg=n=>{let e=n.default?"main":"alternative";return n.characteristics&&n.characteristics.indexOf("public.accessibility.describes-video")>=0&&(e="main-desc"),e},jd=(n,e)=>{n.abort(),n.pause(),e&&e.activePlaylistLoader&&(e.activePlaylistLoader.pause(),e.activePlaylistLoader=null)},Xo=(n,e)=>{e.activePlaylistLoader=n,n.load()},Qg=(n,e)=>()=>{const{segmentLoaders:{[n]:t,main:i},mediaTypes:{[n]:s}}=e,r=s.activeTrack(),a=s.getActiveGroup(),l=s.activePlaylistLoader,d=s.lastGroup_;if(!(a&&d&&a.id===d.id)&&(s.lastGroup_=a,s.lastTrack_=r,jd(t,s),!(!a||a.isMainPlaylist))){if(!a.playlistLoader){l&&i.resetEverything();return}t.resyncLoader(),Xo(a.playlistLoader,s)}},Jg=(n,e)=>()=>{const{segmentLoaders:{[n]:t},mediaTypes:{[n]:i}}=e;i.lastGroup_=null,t.abort(),t.pause()},Zg=(n,e)=>()=>{const{mainPlaylistLoader:t,segmentLoaders:{[n]:i,main:s},mediaTypes:{[n]:r}}=e,a=r.activeTrack(),l=r.getActiveGroup(),d=r.activePlaylistLoader,p=r.lastTrack_;if(!(p&&a&&p.id===a.id)&&(r.lastGroup_=l,r.lastTrack_=a,jd(i,r),!!l)){if(l.isMainPlaylist){if(!a||!p||a.id===p.id)return;const g=e.vhs.playlistController_,y=g.selectPlaylist();if(g.media()===y)return;r.logger_(`track change. Switching main audio from ${p.id} to ${a.id}`),t.pause(),s.resetEverything(),g.fastQualityChange_(y);return}if(n==="AUDIO"){if(!l.playlistLoader){s.setAudio(!0),s.resetEverything();return}i.setAudio(!0),s.setAudio(!1)}if(d===l.playlistLoader){Xo(l.playlistLoader,r);return}i.track&&i.track(a),i.resetEverything(),Xo(l.playlistLoader,r)}},Xr={AUDIO:(n,e)=>()=>{const{mediaTypes:{[n]:t},excludePlaylist:i}=e,s=t.activeTrack(),r=t.activeGroup(),a=(r.filter(d=>d.default)[0]||r[0]).id,l=t.tracks[a];if(s===l){i({error:{message:"Problem encountered loading the default audio track."}});return}R.log.warn("Problem encountered loading the alternate audio track.Switching back to default.");for(const d in t.tracks)t.tracks[d].enabled=t.tracks[d]===l;t.onTrackChanged()},SUBTITLES:(n,e)=>()=>{const{mediaTypes:{[n]:t}}=e;R.log.warn("Problem encountered loading the subtitle track.Disabling subtitle track.");const i=t.activeTrack();i&&(i.mode="disabled"),t.onTrackChanged()}},Bd={AUDIO:(n,e,t)=>{if(!e)return;const{tech:i,requestOptions:s,segmentLoaders:{[n]:r}}=t;e.on("loadedmetadata",()=>{const a=e.media();r.playlist(a,s),(!i.paused()||a.endList&&i.preload()!=="none")&&r.load()}),e.on("loadedplaylist",()=>{r.playlist(e.media(),s),i.paused()||r.load()}),e.on("error",Xr[n](n,t))},SUBTITLES:(n,e,t)=>{const{tech:i,requestOptions:s,segmentLoaders:{[n]:r},mediaTypes:{[n]:a}}=t;e.on("loadedmetadata",()=>{const l=e.media();r.playlist(l,s),r.track(a.activeTrack()),(!i.paused()||l.endList&&i.preload()!=="none")&&r.load()}),e.on("loadedplaylist",()=>{r.playlist(e.media(),s),i.paused()||r.load()}),e.on("error",Xr[n](n,t))}},e0={AUDIO:(n,e)=>{const{vhs:t,sourceType:i,segmentLoaders:{[n]:s},requestOptions:r,main:{mediaGroups:a},mediaTypes:{[n]:{groups:l,tracks:d,logger_:p}},mainPlaylistLoader:g}=e,y=Rs(g.main);(!a[n]||Object.keys(a[n]).length===0)&&(a[n]={main:{default:{default:!0}}},y&&(a[n].main.default.playlists=g.main.playlists));for(const B in a[n]){l[B]||(l[B]=[]);for(const D in a[n][B]){let P=a[n][B][D],b;if(y?(p(`AUDIO group '${B}' label '${D}' is a main playlist`),P.isMainPlaylist=!0,b=null):i==="vhs-json"&&P.playlists?b=new Jn(P.playlists[0],t,r):P.resolvedUri?b=new Jn(P.resolvedUri,t,r):P.playlists&&i==="dash"?b=new Uo(P.playlists[0],t,r,g):b=null,P=Ye({id:D,playlistLoader:b},P),Bd[n](n,P.playlistLoader,e),l[B].push(P),typeof d[D]=="undefined"){const U=new R.AudioTrack({id:D,kind:Kg(P),enabled:!1,language:P.language,default:P.default,label:D});d[D]=U}}}s.on("error",Xr[n](n,e))},SUBTITLES:(n,e)=>{const{tech:t,vhs:i,sourceType:s,segmentLoaders:{[n]:r},requestOptions:a,main:{mediaGroups:l},mediaTypes:{[n]:{groups:d,tracks:p}},mainPlaylistLoader:g}=e;for(const y in l[n]){d[y]||(d[y]=[]);for(const B in l[n][y]){if(!i.options_.useForcedSubtitles&&l[n][y][B].forced)continue;let D=l[n][y][B],P;if(s==="hls")P=new Jn(D.resolvedUri,i,a);else if(s==="dash"){if(!D.playlists.filter(U=>U.excludeUntil!==1/0).length)return;P=new Uo(D.playlists[0],i,a,g)}else s==="vhs-json"&&(P=new Jn(D.playlists?D.playlists[0]:D.resolvedUri,i,a));if(D=Ye({id:B,playlistLoader:P},D),Bd[n](n,D.playlistLoader,e),d[y].push(D),typeof p[B]=="undefined"){const b=t.addRemoteTextTrack({id:B,kind:"subtitles",default:D.default&&D.autoselect,language:D.language,label:B},!1).track;p[B]=b}}}r.on("error",Xr[n](n,e))},"CLOSED-CAPTIONS":(n,e)=>{const{tech:t,main:{mediaGroups:i},mediaTypes:{[n]:{groups:s,tracks:r}}}=e;for(const a in i[n]){s[a]||(s[a]=[]);for(const l in i[n][a]){const d=i[n][a][l];if(!/^(?:CC|SERVICE)/.test(d.instreamId))continue;const p=t.options_.vhs&&t.options_.vhs.captionServices||{};let g={label:l,language:d.language,instreamId:d.instreamId,default:d.default&&d.autoselect};if(p[g.instreamId]&&(g=Ye(g,p[g.instreamId])),g.default===void 0&&delete g.default,s[a].push(Ye({id:l},d)),typeof r[l]=="undefined"){const y=t.addRemoteTextTrack({id:g.instreamId,kind:"captions",default:g.default,language:g.language,label:g.label},!1).track;r[l]=y}}}}},wd=(n,e)=>{for(let t=0;t<n.length;t++)if(Oo(e,n[t])||n[t].playlists&&wd(n[t].playlists,e))return!0;return!1},t0=(n,e)=>t=>{const{mainPlaylistLoader:i,mediaTypes:{[n]:{groups:s}}}=e,r=i.media();if(!r)return null;let a=null;r.attributes[n]&&(a=s[r.attributes[n]]);const l=Object.keys(s);if(!a)if(n==="AUDIO"&&l.length>1&&Rs(e.main))for(let d=0;d<l.length;d++){const p=s[l[d]];if(wd(p,r)){a=p;break}}else s.main?a=s.main:l.length===1&&(a=s[l[0]]);return typeof t=="undefined"?a:t===null||!a?null:a.filter(d=>d.id===t.id)[0]||null},i0={AUDIO:(n,e)=>()=>{const{mediaTypes:{[n]:{tracks:t}}}=e;for(const i in t)if(t[i].enabled)return t[i];return null},SUBTITLES:(n,e)=>()=>{const{mediaTypes:{[n]:{tracks:t}}}=e;for(const i in t)if(t[i].mode==="showing"||t[i].mode==="hidden")return t[i];return null}},n0=(n,{mediaTypes:e})=>()=>{const t=e[n].activeTrack();return t?e[n].activeGroup(t):null},s0=n=>{["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(p=>{e0[p](p,n)});const{mediaTypes:e,mainPlaylistLoader:t,tech:i,vhs:s,segmentLoaders:{["AUDIO"]:r,main:a}}=n;["AUDIO","SUBTITLES"].forEach(p=>{e[p].activeGroup=t0(p,n),e[p].activeTrack=i0[p](p,n),e[p].onGroupChanged=Qg(p,n),e[p].onGroupChanging=Jg(p,n),e[p].onTrackChanged=Zg(p,n),e[p].getActiveGroup=n0(p,n)});const l=e.AUDIO.activeGroup();if(l){const p=(l.filter(y=>y.default)[0]||l[0]).id;e.AUDIO.tracks[p].enabled=!0,e.AUDIO.onGroupChanged(),e.AUDIO.onTrackChanged(),e.AUDIO.getActiveGroup().playlistLoader?(a.setAudio(!1),r.setAudio(!0)):a.setAudio(!0)}t.on("mediachange",()=>{["AUDIO","SUBTITLES"].forEach(p=>e[p].onGroupChanged())}),t.on("mediachanging",()=>{["AUDIO","SUBTITLES"].forEach(p=>e[p].onGroupChanging())});const d=()=>{e.AUDIO.onTrackChanged(),i.trigger({type:"usage",name:"vhs-audio-change"})};i.audioTracks().addEventListener("change",d),i.remoteTextTracks().addEventListener("change",e.SUBTITLES.onTrackChanged),s.on("dispose",()=>{i.audioTracks().removeEventListener("change",d),i.remoteTextTracks().removeEventListener("change",e.SUBTITLES.onTrackChanged)}),i.clearTracks("audio");for(const p in e.AUDIO.tracks)i.audioTracks().addTrack(e.AUDIO.tracks[p])},r0=()=>{const n={};return["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(e=>{n[e]={groups:{},tracks:{},activePlaylistLoader:null,activeGroup:Fi,activeTrack:Fi,getActiveGroup:Fi,onGroupChanged:Fi,onTrackChanged:Fi,lastTrack_:null,logger_:ri(`MediaGroups[${e}]`)}}),n};class Dd{constructor(){this.priority_=[],this.pathwayClones_=new Map}set version(e){e===1&&(this.version_=e)}set ttl(e){this.ttl_=e||300}set reloadUri(e){e&&(this.reloadUri_=zt(this.reloadUri_,e))}set priority(e){e&&e.length&&(this.priority_=e)}set pathwayClones(e){e&&e.length&&(this.pathwayClones_=new Map(e.map(t=>[t.ID,t])))}get version(){return this.version_}get ttl(){return this.ttl_}get reloadUri(){return this.reloadUri_}get priority(){return this.priority_}get pathwayClones(){return this.pathwayClones_}}class a0 extends R.EventTarget{constructor(e,t){super(),this.currentPathway=null,this.defaultPathway=null,this.queryBeforeStart=!1,this.availablePathways_=new Set,this.steeringManifest=new Dd,this.proxyServerUrl_=null,this.manifestType_=null,this.ttlTimeout_=null,this.request_=null,this.currentPathwayClones=new Map,this.nextPathwayClones=new Map,this.excludedSteeringManifestURLs=new Set,this.logger_=ri("Content Steering"),this.xhr_=e,this.getBandwidth_=t}assignTagProperties(e,t){this.manifestType_=t.serverUri?"HLS":"DASH";const i=t.serverUri||t.serverURL;if(!i){this.logger_(`steering manifest URL is ${i}, cannot request steering manifest.`),this.trigger("error");return}if(i.startsWith("data:")){this.decodeDataUriManifest_(i.substring(i.indexOf(",")+1));return}this.steeringManifest.reloadUri=zt(e,i),this.defaultPathway=t.pathwayId||t.defaultServiceLocation,this.queryBeforeStart=t.queryBeforeStart,this.proxyServerUrl_=t.proxyServerURL,this.defaultPathway&&!this.queryBeforeStart&&this.trigger("content-steering")}requestSteeringManifest(e){const t=this.steeringManifest.reloadUri;if(!t)return;const i=e?t:this.getRequestURI(t);if(!i){this.logger_("No valid content steering manifest URIs. Stopping content steering."),this.trigger("error"),this.dispose();return}const s={contentSteeringInfo:{uri:i}};this.trigger({type:"contentsteeringloadstart",metadata:s}),this.request_=this.xhr_({uri:i,requestType:"content-steering-manifest"},(r,a)=>{if(r){if(a.status===410){this.logger_(`manifest request 410 ${r}.`),this.logger_(`There will be no more content steering requests to ${i} this session.`),this.excludedSteeringManifestURLs.add(i);return}if(a.status===429){const p=a.responseHeaders["retry-after"];this.logger_(`manifest request 429 ${r}.`),this.logger_(`content steering will retry in ${p} seconds.`),this.startTTLTimeout_(parseInt(p,10));return}this.logger_(`manifest failed to load ${r}.`),this.startTTLTimeout_();return}this.trigger({type:"contentsteeringloadcomplete",metadata:s});let l;try{l=JSON.parse(this.request_.responseText)}catch(p){const g={errorType:R.Error.StreamingContentSteeringParserError,error:p};this.trigger({type:"error",metadata:g})}this.assignSteeringProperties_(l);const d={contentSteeringInfo:s.contentSteeringInfo,contentSteeringManifest:{version:this.steeringManifest.version,reloadUri:this.steeringManifest.reloadUri,priority:this.steeringManifest.priority}};this.trigger({type:"contentsteeringparsed",metadata:d}),this.startTTLTimeout_()})}setProxyServerUrl_(e){const t=new(A()).URL(e),i=new(A()).URL(this.proxyServerUrl_);return i.searchParams.set("url",encodeURI(t.toString())),this.setSteeringParams_(i.toString())}decodeDataUriManifest_(e){const t=JSON.parse(A().atob(e));this.assignSteeringProperties_(t)}setSteeringParams_(e){const t=new(A()).URL(e),i=this.getPathway(),s=this.getBandwidth_();if(i){const r=`_${this.manifestType_}_pathway`;t.searchParams.set(r,i)}if(s){const r=`_${this.manifestType_}_throughput`;t.searchParams.set(r,s)}return t.toString()}assignSteeringProperties_(e){if(this.steeringManifest.version=e.VERSION,!this.steeringManifest.version){this.logger_(`manifest version is ${e.VERSION}, which is not supported.`),this.trigger("error");return}this.steeringManifest.ttl=e.TTL,this.steeringManifest.reloadUri=e["RELOAD-URI"],this.steeringManifest.priority=e["PATHWAY-PRIORITY"]||e["SERVICE-LOCATION-PRIORITY"],this.steeringManifest.pathwayClones=e["PATHWAY-CLONES"],this.nextPathwayClones=this.steeringManifest.pathwayClones,this.availablePathways_.size||(this.logger_("There are no available pathways for content steering. Ending content steering."),this.trigger("error"),this.dispose());const i=(s=>{for(const r of s)if(this.availablePathways_.has(r))return r;return[...this.availablePathways_][0]})(this.steeringManifest.priority);this.currentPathway!==i&&(this.currentPathway=i,this.trigger("content-steering"))}getPathway(){return this.currentPathway||this.defaultPathway}getRequestURI(e){if(!e)return null;const t=s=>this.excludedSteeringManifestURLs.has(s);if(this.proxyServerUrl_){const s=this.setProxyServerUrl_(e);if(!t(s))return s}const i=this.setSteeringParams_(e);return t(i)?null:i}startTTLTimeout_(e=this.steeringManifest.ttl){const t=e*1e3;this.ttlTimeout_=A().setTimeout(()=>{this.requestSteeringManifest()},t)}clearTTLTimeout_(){A().clearTimeout(this.ttlTimeout_),this.ttlTimeout_=null}abort(){this.request_&&this.request_.abort(),this.request_=null}dispose(){this.off("content-steering"),this.off("error"),this.abort(),this.clearTTLTimeout_(),this.currentPathway=null,this.defaultPathway=null,this.queryBeforeStart=null,this.proxyServerUrl_=null,this.manifestType_=null,this.ttlTimeout_=null,this.request_=null,this.excludedSteeringManifestURLs=new Set,this.availablePathways_=new Set,this.steeringManifest=new Dd}addAvailablePathway(e){e&&this.availablePathways_.add(e)}clearAvailablePathways(){this.availablePathways_.clear()}excludePathway(e){return this.availablePathways_.delete(e)}didDASHTagChange(e,t){return!t&&this.steeringManifest.reloadUri||t&&(zt(e,t.serverURL)!==this.steeringManifest.reloadUri||t.defaultServiceLocation!==this.defaultPathway||t.queryBeforeStart!==this.queryBeforeStart||t.proxyServerURL!==this.proxyServerUrl_)}getAvailablePathways(){return this.availablePathways_}}const o0=10;let Ui;const l0=["mediaRequests","mediaRequestsAborted","mediaRequestsTimedout","mediaRequestsErrored","mediaTransferDuration","mediaBytesTransferred","mediaAppends"],u0=function(n){return this.audioSegmentLoader_[n]+this.mainSegmentLoader_[n]},c0=function({currentPlaylist:n,buffered:e,currentTime:t,nextPlaylist:i,bufferLowWaterLine:s,bufferHighWaterLine:r,duration:a,bufferBasedABR:l,log:d}){if(!i)return R.log.warn("We received no playlist to switch to. Please check your stream."),!1;const p=`allowing switch ${n&&n.id||"null"} -> ${i.id}`;if(!n)return d(`${p} as current playlist is not set`),!0;if(i.id===n.id)return!1;const g=!!Xn(e,t).length;if(!n.endList)return!g&&typeof n.partTargetDuration=="number"?(d(`not ${p} as current playlist is live llhls, but currentTime isn't in buffered.`),!1):(d(`${p} as current playlist is live`),!0);const y=wo(e,t),B=l?jt.EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE:jt.MAX_BUFFER_LOW_WATER_LINE;if(a<B)return d(`${p} as duration < max low water line (${a} < ${B})`),!0;const D=i.attributes.BANDWIDTH,P=n.attributes.BANDWIDTH;if(D<P&&(!l||y<r)){let b=`${p} as next bandwidth < current bandwidth (${D} < ${P})`;return l&&(b+=` and forwardBuffer < bufferHighWaterLine (${y} < ${r})`),d(b),!0}if((!l||D>P)&&y>=s){let b=`${p} as forwardBuffer >= bufferLowWaterLine (${y} >= ${s})`;return l&&(b+=` and next bandwidth > current bandwidth (${D} > ${P})`),d(b),!0}return d(`not ${p} as no switching criteria met`),!1};class d0 extends R.EventTarget{constructor(e){super();const{src:t,withCredentials:i,tech:s,bandwidth:r,externVhs:a,useCueTags:l,playlistExclusionDuration:d,enableLowInitialPlaylist:p,sourceType:g,cacheEncryptionKeys:y,bufferBasedABR:B,leastPixelDiffSelector:D,captionServices:P,experimentalUseMMS:b}=e;if(!t)throw new Error("A non-empty playlist URL or JSON manifest string is required");let{maxPlaylistRetries:U}=e;(U===null||typeof U=="undefined")&&(U=1/0),Ui=a,this.bufferBasedABR=!!B,this.leastPixelDiffSelector=!!D,this.withCredentials=i,this.tech_=s,this.vhs_=s.vhs,this.player_=e.player_,this.sourceType_=g,this.useCueTags_=l,this.playlistExclusionDuration=d,this.maxPlaylistRetries=U,this.enableLowInitialPlaylist=p,this.useCueTags_&&(this.cueTagsTrack_=this.tech_.addTextTrack("metadata","ad-cues"),this.cueTagsTrack_.inBandMetadataTrackDispatchType=""),this.requestOptions_={withCredentials:i,maxPlaylistRetries:U,timeout:null},this.on("error",this.pauseLoading),this.mediaTypes_=r0(),b&&A().ManagedMediaSource?(this.tech_.el_.disableRemotePlayback=!0,this.mediaSource=new(A()).ManagedMediaSource,R.log("Using ManagedMediaSource")):A().MediaSource&&(this.mediaSource=new(A()).MediaSource),this.handleDurationChange_=this.handleDurationChange_.bind(this),this.handleSourceOpen_=this.handleSourceOpen_.bind(this),this.handleSourceEnded_=this.handleSourceEnded_.bind(this),this.mediaSource.addEventListener("durationchange",this.handleDurationChange_),this.mediaSource.addEventListener("sourceopen",this.handleSourceOpen_),this.mediaSource.addEventListener("sourceended",this.handleSourceEnded_),this.seekable_=wt(),this.hasPlayed_=!1,this.syncController_=new $g(e),this.segmentMetadataTrack_=s.addRemoteTextTrack({kind:"metadata",label:"segment-metadata"},!1).track,this.decrypter_=new Xg,this.sourceUpdater_=new bd(this.mediaSource),this.inbandTextTracks_={},this.timelineChangeController_=new Gg,this.keyStatusMap_=new Map;const H={vhs:this.vhs_,parse708captions:e.parse708captions,useDtsForTimestampOffset:e.useDtsForTimestampOffset,captionServices:P,mediaSource:this.mediaSource,currentTime:this.tech_.currentTime.bind(this.tech_),seekable:()=>this.seekable(),seeking:()=>this.tech_.seeking(),duration:()=>this.duration(),hasPlayed:()=>this.hasPlayed_,goalBufferLength:()=>this.goalBufferLength(),bandwidth:r,syncController:this.syncController_,decrypter:this.decrypter_,sourceType:this.sourceType_,inbandTextTracks:this.inbandTextTracks_,cacheEncryptionKeys:y,sourceUpdater:this.sourceUpdater_,timelineChangeController:this.timelineChangeController_,exactManifestTimings:e.exactManifestTimings,addMetadataToTextTrack:this.addMetadataToTextTrack.bind(this)};this.mainPlaylistLoader_=this.sourceType_==="dash"?new Uo(t,this.vhs_,Ye(this.requestOptions_,{addMetadataToTextTrack:this.addMetadataToTextTrack.bind(this)})):new Jn(t,this.vhs_,Ye(this.requestOptions_,{addDateRangesToTextTrack:this.addDateRangesToTextTrack_.bind(this)})),this.setupMainPlaylistLoaderListeners_(),this.mainSegmentLoader_=new $o(Ye(H,{segmentMetadataTrack:this.segmentMetadataTrack_,loaderType:"main"}),e),this.audioSegmentLoader_=new $o(Ye(H,{loaderType:"audio"}),e),this.subtitleSegmentLoader_=new Vg(Ye(H,{loaderType:"vtt",featuresNativeTextTracks:this.tech_.featuresNativeTextTracks,loadVttJs:()=>new Promise((Y,O)=>{function K(){s.off("vttjserror",be),Y()}function be(){s.off("vttjsloaded",K),O()}s.one("vttjsloaded",K),s.one("vttjserror",be),s.addWebVttScript_()})}),e);const F=()=>this.mainSegmentLoader_.bandwidth;this.contentSteeringController_=new a0(this.vhs_.xhr,F),this.setupSegmentLoaderListeners_(),this.bufferBasedABR&&(this.mainPlaylistLoader_.one("loadedplaylist",()=>this.startABRTimer_()),this.tech_.on("pause",()=>this.stopABRTimer_()),this.tech_.on("play",()=>this.startABRTimer_())),l0.forEach(Y=>{this[Y+"_"]=u0.bind(this,Y)}),this.logger_=ri("pc"),this.triggeredFmp4Usage=!1,this.tech_.preload()==="none"?(this.loadOnPlay_=()=>{this.loadOnPlay_=null,this.mainPlaylistLoader_.load()},this.tech_.one("play",this.loadOnPlay_)):this.mainPlaylistLoader_.load(),this.timeToLoadedData__=-1,this.mainAppendsToLoadedData__=-1,this.audioAppendsToLoadedData__=-1;const N=this.tech_.preload()==="none"?"play":"loadstart";this.tech_.one(N,()=>{const Y=Date.now();this.tech_.one("loadeddata",()=>{this.timeToLoadedData__=Date.now()-Y,this.mainAppendsToLoadedData__=this.mainSegmentLoader_.mediaAppends,this.audioAppendsToLoadedData__=this.audioSegmentLoader_.mediaAppends})})}mainAppendsToLoadedData_(){return this.mainAppendsToLoadedData__}audioAppendsToLoadedData_(){return this.audioAppendsToLoadedData__}appendsToLoadedData_(){const e=this.mainAppendsToLoadedData_(),t=this.audioAppendsToLoadedData_();return e===-1||t===-1?-1:e+t}timeToLoadedData_(){return this.timeToLoadedData__}checkABR_(e="abr"){const t=this.selectPlaylist();t&&this.shouldSwitchToMedia_(t)&&this.switchMedia_(t,e)}switchMedia_(e,t,i){const s=this.media(),r=s&&(s.id||s.uri),a=e&&(e.id||e.uri);if(r&&r!==a){this.logger_(`switch media ${r} -> ${a} from ${t}`);const l={renditionInfo:{id:a,bandwidth:e.attributes.BANDWIDTH,resolution:e.attributes.RESOLUTION,codecs:e.attributes.CODECS},cause:t};this.trigger({type:"renditionselected",metadata:l}),this.tech_.trigger({type:"usage",name:`vhs-rendition-change-${t}`})}this.mainPlaylistLoader_.media(e,i)}switchMediaForDASHContentSteering_(){["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(e=>{const t=this.mediaTypes_[e],i=t?t.activeGroup():null,s=this.contentSteeringController_.getPathway();if(i&&s){const a=(i.length?i[0].playlists:i.playlists).filter(l=>l.attributes.serviceLocation===s);a.length&&this.mediaTypes_[e].activePlaylistLoader.media(a[0])}})}startABRTimer_(){this.stopABRTimer_(),this.abrTimer_=A().setInterval(()=>this.checkABR_(),250)}stopABRTimer_(){this.tech_.scrubbing&&this.tech_.scrubbing()||(A().clearInterval(this.abrTimer_),this.abrTimer_=null)}getAudioTrackPlaylists_(){const e=this.main(),t=e&&e.playlists||[];if(!e||!e.mediaGroups||!e.mediaGroups.AUDIO)return t;const i=e.mediaGroups.AUDIO,s=Object.keys(i);let r;if(Object.keys(this.mediaTypes_.AUDIO.groups).length)r=this.mediaTypes_.AUDIO.activeTrack();else{const l=i.main||s.length&&i[s[0]];for(const d in l)if(l[d].default){r={label:d};break}}if(!r)return t;const a=[];for(const l in i)if(i[l][r.label]){const d=i[l][r.label];if(d.playlists&&d.playlists.length)a.push.apply(a,d.playlists);else if(d.uri)a.push(d);else if(e.playlists.length)for(let p=0;p<e.playlists.length;p++){const g=e.playlists[p];g.attributes&&g.attributes.AUDIO&&g.attributes.AUDIO===l&&a.push(g)}}return a.length?a:t}setupMainPlaylistLoaderListeners_(){this.mainPlaylistLoader_.on("loadedmetadata",()=>{const t=this.mainPlaylistLoader_.media(),i=t.targetDuration*1.5*1e3;Po(this.mainPlaylistLoader_.main,this.mainPlaylistLoader_.media())?this.requestOptions_.timeout=0:this.requestOptions_.timeout=i,t.endList&&this.tech_.preload()!=="none"&&(this.mainSegmentLoader_.playlist(t,this.requestOptions_),this.mainSegmentLoader_.load()),s0({sourceType:this.sourceType_,segmentLoaders:{AUDIO:this.audioSegmentLoader_,SUBTITLES:this.subtitleSegmentLoader_,main:this.mainSegmentLoader_},tech:this.tech_,requestOptions:this.requestOptions_,mainPlaylistLoader:this.mainPlaylistLoader_,vhs:this.vhs_,main:this.main(),mediaTypes:this.mediaTypes_,excludePlaylist:this.excludePlaylist.bind(this)}),this.triggerPresenceUsage_(this.main(),t),this.setupFirstPlay(),!this.mediaTypes_.AUDIO.activePlaylistLoader||this.mediaTypes_.AUDIO.activePlaylistLoader.media()?this.trigger("selectedinitialmedia"):this.mediaTypes_.AUDIO.activePlaylistLoader.one("loadedmetadata",()=>{this.trigger("selectedinitialmedia")})}),this.mainPlaylistLoader_.on("loadedplaylist",()=>{this.loadOnPlay_&&this.tech_.off("play",this.loadOnPlay_);let t=this.mainPlaylistLoader_.media();if(!t){this.attachContentSteeringListeners_(),this.initContentSteeringController_(),this.excludeUnsupportedVariants_();let i;if(this.enableLowInitialPlaylist&&(i=this.selectInitialPlaylist()),i||(i=this.selectPlaylist()),!i||!this.shouldSwitchToMedia_(i)||(this.initialMedia_=i,this.switchMedia_(this.initialMedia_,"initial"),!(this.sourceType_==="vhs-json"&&this.initialMedia_.segments)))return;t=this.initialMedia_}this.handleUpdatedMediaPlaylist(t)}),this.mainPlaylistLoader_.on("error",()=>{const t=this.mainPlaylistLoader_.error;this.excludePlaylist({playlistToExclude:t.playlist,error:t})}),this.mainPlaylistLoader_.on("mediachanging",()=>{this.mainSegmentLoader_.abort(),this.mainSegmentLoader_.pause()}),this.mainPlaylistLoader_.on("mediachange",()=>{const t=this.mainPlaylistLoader_.media(),i=t.targetDuration*1.5*1e3;Po(this.mainPlaylistLoader_.main,this.mainPlaylistLoader_.media())?this.requestOptions_.timeout=0:this.requestOptions_.timeout=i,this.sourceType_==="dash"&&this.mainPlaylistLoader_.load(),this.mainSegmentLoader_.pause(),this.mainSegmentLoader_.playlist(t,this.requestOptions_),this.waitingForFastQualityPlaylistReceived_?this.runFastQualitySwitch_():this.mainSegmentLoader_.load(),this.tech_.trigger({type:"mediachange",bubbles:!0})}),this.mainPlaylistLoader_.on("playlistunchanged",()=>{const t=this.mainPlaylistLoader_.media();if(t.lastExcludeReason_==="playlist-unchanged")return;this.stuckAtPlaylistEnd_(t)&&(this.excludePlaylist({error:{message:"Playlist no longer updating.",reason:"playlist-unchanged"}}),this.tech_.trigger("playliststuck"))}),this.mainPlaylistLoader_.on("renditiondisabled",()=>{this.tech_.trigger({type:"usage",name:"vhs-rendition-disabled"})}),this.mainPlaylistLoader_.on("renditionenabled",()=>{this.tech_.trigger({type:"usage",name:"vhs-rendition-enabled"})}),["manifestrequeststart","manifestrequestcomplete","manifestparsestart","manifestparsecomplete","playlistrequeststart","playlistrequestcomplete","playlistparsestart","playlistparsecomplete","renditiondisabled","renditionenabled"].forEach(t=>{this.mainPlaylistLoader_.on(t,i=>{this.player_.trigger((0,ue.A)({},i))})})}handleUpdatedMediaPlaylist(e){this.useCueTags_&&this.updateAdCues_(e),this.mainSegmentLoader_.pause(),this.mainSegmentLoader_.playlist(e,this.requestOptions_),this.waitingForFastQualityPlaylistReceived_&&this.runFastQualitySwitch_(),this.updateDuration(!e.endList),this.tech_.paused()||(this.mainSegmentLoader_.load(),this.audioSegmentLoader_&&this.audioSegmentLoader_.load())}triggerPresenceUsage_(e,t){const i=e.mediaGroups||{};let s=!0;const r=Object.keys(i.AUDIO);for(const a in i.AUDIO)for(const l in i.AUDIO[a])i.AUDIO[a][l].uri||(s=!1);s&&this.tech_.trigger({type:"usage",name:"vhs-demuxed"}),Object.keys(i.SUBTITLES).length&&this.tech_.trigger({type:"usage",name:"vhs-webvtt"}),Ui.Playlist.isAes(t)&&this.tech_.trigger({type:"usage",name:"vhs-aes"}),r.length&&Object.keys(i.AUDIO[r[0]]).length>1&&this.tech_.trigger({type:"usage",name:"vhs-alternate-audio"}),this.useCueTags_&&this.tech_.trigger({type:"usage",name:"vhs-playlist-cue-tags"})}shouldSwitchToMedia_(e){const t=this.mainPlaylistLoader_.media()||this.mainPlaylistLoader_.pendingMedia_,i=this.tech_.currentTime(),s=this.bufferLowWaterLine(),r=this.bufferHighWaterLine(),a=this.tech_.buffered();return c0({buffered:a,currentTime:i,currentPlaylist:t,nextPlaylist:e,bufferLowWaterLine:s,bufferHighWaterLine:r,duration:this.duration(),bufferBasedABR:this.bufferBasedABR,log:this.logger_})}setupSegmentLoaderListeners_(){this.mainSegmentLoader_.on("bandwidthupdate",()=>{this.checkABR_("bandwidthupdate"),this.tech_.trigger("bandwidthupdate")}),this.mainSegmentLoader_.on("timeout",()=>{this.bufferBasedABR&&this.mainSegmentLoader_.load()}),this.bufferBasedABR||this.mainSegmentLoader_.on("progress",()=>{this.trigger("progress")}),this.mainSegmentLoader_.on("error",()=>{const i=this.mainSegmentLoader_.error();this.excludePlaylist({playlistToExclude:i.playlist,error:i})}),this.mainSegmentLoader_.on("appenderror",()=>{this.error=this.mainSegmentLoader_.error_,this.trigger("error")}),this.mainSegmentLoader_.on("syncinfoupdate",()=>{this.onSyncInfoUpdate_()}),this.mainSegmentLoader_.on("timestampoffset",()=>{this.tech_.trigger({type:"usage",name:"vhs-timestamp-offset"})}),this.audioSegmentLoader_.on("syncinfoupdate",()=>{this.onSyncInfoUpdate_()}),this.audioSegmentLoader_.on("appenderror",()=>{this.error=this.audioSegmentLoader_.error_,this.trigger("error")}),this.mainSegmentLoader_.on("ended",()=>{this.logger_("main segment loader ended"),this.onEndOfStream()}),this.timelineChangeController_.on("audioTimelineBehind",()=>{const i=this.audioSegmentLoader_.pendingSegment_;if(!i||!i.segment||!i.segment.syncInfo)return;const s=i.segment.syncInfo.end+.01;this.tech_.setCurrentTime(s)}),this.mainSegmentLoader_.on("earlyabort",i=>{this.bufferBasedABR||(this.delegateLoaders_("all",["abort"]),this.excludePlaylist({error:{message:"Aborted early because there isn't enough bandwidth to complete the request without rebuffering."},playlistExclusionDuration:o0}))});const e=()=>{if(!this.sourceUpdater_.hasCreatedSourceBuffers())return this.tryToCreateSourceBuffers_();const i=this.getCodecsOrExclude_();i&&this.sourceUpdater_.addOrChangeSourceBuffers(i)};this.mainSegmentLoader_.on("trackinfo",e),this.audioSegmentLoader_.on("trackinfo",e),this.mainSegmentLoader_.on("fmp4",()=>{this.triggeredFmp4Usage||(this.tech_.trigger({type:"usage",name:"vhs-fmp4"}),this.triggeredFmp4Usage=!0)}),this.audioSegmentLoader_.on("fmp4",()=>{this.triggeredFmp4Usage||(this.tech_.trigger({type:"usage",name:"vhs-fmp4"}),this.triggeredFmp4Usage=!0)}),this.audioSegmentLoader_.on("ended",()=>{this.logger_("audioSegmentLoader ended"),this.onEndOfStream()}),["segmentselected","segmentloadstart","segmentloaded","segmentkeyloadstart","segmentkeyloadcomplete","segmentdecryptionstart","segmentdecryptioncomplete","segmenttransmuxingstart","segmenttransmuxingcomplete","segmenttransmuxingtrackinfoavailable","segmenttransmuxingtiminginfoavailable","segmentappendstart","appendsdone","bandwidthupdated","timelinechange","codecschange"].forEach(i=>{this.mainSegmentLoader_.on(i,s=>{this.player_.trigger((0,ue.A)({},s))}),this.audioSegmentLoader_.on(i,s=>{this.player_.trigger((0,ue.A)({},s))}),this.subtitleSegmentLoader_.on(i,s=>{this.player_.trigger((0,ue.A)({},s))})})}mediaSecondsLoaded_(){return Math.max(this.audioSegmentLoader_.mediaSecondsLoaded+this.mainSegmentLoader_.mediaSecondsLoaded)}load(){this.mainSegmentLoader_.load(),this.mediaTypes_.AUDIO.activePlaylistLoader&&this.audioSegmentLoader_.load(),this.mediaTypes_.SUBTITLES.activePlaylistLoader&&this.subtitleSegmentLoader_.load()}fastQualityChange_(e=this.selectPlaylist()){if(e&&e===this.mainPlaylistLoader_.media()){this.logger_("skipping fastQualityChange because new media is same as old");return}this.switchMedia_(e,"fast-quality"),this.waitingForFastQualityPlaylistReceived_=!0}runFastQualitySwitch_(){this.waitingForFastQualityPlaylistReceived_=!1,this.mainSegmentLoader_.pause(),this.mainSegmentLoader_.resetEverything(()=>{this.mainSegmentLoader_.load()})}play(){if(this.setupFirstPlay())return;this.tech_.ended()&&this.tech_.setCurrentTime(0),this.hasPlayed_&&this.load();const e=this.tech_.seekable();if(this.tech_.duration()===1/0&&this.tech_.currentTime()<e.start(0))return this.tech_.setCurrentTime(e.end(e.length-1))}setupFirstPlay(){const e=this.mainPlaylistLoader_.media();if(!e||this.tech_.paused()||this.hasPlayed_)return!1;if(!e.endList||e.start){const t=this.seekable();if(!t.length)return!1;const i=t.end(0);let s=i;if(e.start){const r=e.start.timeOffset;r<0?s=Math.max(i+r,t.start(0)):s=Math.min(i,r)}this.trigger("firstplay"),this.tech_.setCurrentTime(s)}return this.hasPlayed_=!0,this.load(),!0}handleSourceOpen_(){if(this.tryToCreateSourceBuffers_(),this.tech_.autoplay()){const e=this.tech_.play();typeof e!="undefined"&&typeof e.then=="function"&&e.then(null,t=>{})}this.trigger("sourceopen")}handleSourceEnded_(){if(!this.inbandTextTracks_.metadataTrack_)return;const e=this.inbandTextTracks_.metadataTrack_.cues;if(!e||!e.length)return;const t=this.duration();e[e.length-1].endTime=isNaN(t)||Math.abs(t)===1/0?Number.MAX_VALUE:t}handleDurationChange_(){this.tech_.trigger("durationchange")}onEndOfStream(){let e=this.mainSegmentLoader_.ended_;if(this.mediaTypes_.AUDIO.activePlaylistLoader){const t=this.mainSegmentLoader_.getCurrentMediaInfo_();!t||t.hasVideo?e=e&&this.audioSegmentLoader_.ended_:e=this.audioSegmentLoader_.ended_}e&&(this.stopABRTimer_(),this.sourceUpdater_.endOfStream())}stuckAtPlaylistEnd_(e){if(!this.seekable().length)return!1;const i=this.syncController_.getExpiredTime(e,this.duration());if(i===null)return!1;const s=Ui.Playlist.playlistEnd(e,i),r=this.tech_.currentTime(),a=this.tech_.buffered();if(!a.length)return s-r<=xi;const l=a.end(a.length-1);return l-r<=xi&&s-l<=xi}excludePlaylist({playlistToExclude:e=this.mainPlaylistLoader_.media(),error:t={},playlistExclusionDuration:i}){if(e=e||this.mainPlaylistLoader_.media(),i=i||t.playlistExclusionDuration||this.playlistExclusionDuration,!e){this.error=t,this.mediaSource.readyState!=="open"?this.trigger("error"):this.sourceUpdater_.endOfStream("network");return}e.playlistErrors_++;const s=this.mainPlaylistLoader_.main.playlists,r=s.filter(Hr),a=r.length===1&&r[0]===e;if(s.length===1&&i!==1/0)return R.log.warn(`Problem encountered with playlist ${e.id}. Trying again since it is the only playlist.`),this.tech_.trigger("retryplaylist"),this.mainPlaylistLoader_.load(a);if(a){if(this.main().contentSteering){const P=this.pathwayAttribute_(e),b=this.contentSteeringController_.steeringManifest.ttl*1e3;this.contentSteeringController_.excludePathway(P),this.excludeThenChangePathway_(),setTimeout(()=>{this.contentSteeringController_.addAvailablePathway(P)},b);return}let D=!1;s.forEach(P=>{if(P===e)return;const b=P.excludeUntil;typeof b!="undefined"&&b!==1/0&&(D=!0,delete P.excludeUntil)}),D&&(R.log.warn("Removing other playlists from the exclusion list because the last rendition is about to be excluded."),this.tech_.trigger("retryplaylist"))}let l;e.playlistErrors_>this.maxPlaylistRetries?l=1/0:l=Date.now()+i*1e3,e.excludeUntil=l,t.reason&&(e.lastExcludeReason_=t.reason),this.tech_.trigger("excludeplaylist"),this.tech_.trigger({type:"usage",name:"vhs-rendition-excluded"});const d=this.selectPlaylist();if(!d){this.error="Playback cannot continue. No available working or supported playlists.",this.trigger("error");return}const p=t.internal?this.logger_:R.log.warn,g=t.message?" "+t.message:"";p(`${t.internal?"Internal problem":"Problem"} encountered with playlist ${e.id}.${g} Switching to playlist ${d.id}.`),d.attributes.AUDIO!==e.attributes.AUDIO&&this.delegateLoaders_("audio",["abort","pause"]),d.attributes.SUBTITLES!==e.attributes.SUBTITLES&&this.delegateLoaders_("subtitle",["abort","pause"]),this.delegateLoaders_("main",["abort","pause"]);const y=d.targetDuration/2*1e3||5*1e3,B=typeof d.lastRequest=="number"&&Date.now()-d.lastRequest<=y;return this.switchMedia_(d,"exclude",a||B)}pauseLoading(){this.delegateLoaders_("all",["abort","pause"]),this.stopABRTimer_()}delegateLoaders_(e,t){const i=[],s=e==="all";(s||e==="main")&&i.push(this.mainPlaylistLoader_);const r=[];(s||e==="audio")&&r.push("AUDIO"),(s||e==="subtitle")&&(r.push("CLOSED-CAPTIONS"),r.push("SUBTITLES")),r.forEach(a=>{const l=this.mediaTypes_[a]&&this.mediaTypes_[a].activePlaylistLoader;l&&i.push(l)}),["main","audio","subtitle"].forEach(a=>{const l=this[`${a}SegmentLoader_`];l&&(e===a||e==="all")&&i.push(l)}),i.forEach(a=>t.forEach(l=>{typeof a[l]=="function"&&a[l]()}))}setCurrentTime(e){const t=Xn(this.tech_.buffered(),e);if(!(this.mainPlaylistLoader_&&this.mainPlaylistLoader_.media())||!this.mainPlaylistLoader_.media().segments)return 0;if(t&&t.length)return e;this.mainSegmentLoader_.pause(),this.mainSegmentLoader_.resetEverything(),this.mediaTypes_.AUDIO.activePlaylistLoader&&(this.audioSegmentLoader_.pause(),this.audioSegmentLoader_.resetEverything()),this.mediaTypes_.SUBTITLES.activePlaylistLoader&&(this.subtitleSegmentLoader_.pause(),this.subtitleSegmentLoader_.resetEverything()),this.load()}duration(){if(!this.mainPlaylistLoader_)return 0;const e=this.mainPlaylistLoader_.media();return e?e.endList?this.mediaSource?this.mediaSource.duration:Ui.Playlist.duration(e):1/0:0}seekable(){return this.seekable_}onSyncInfoUpdate_(){let e;if(!this.mainPlaylistLoader_)return;let t=this.mainPlaylistLoader_.media();if(!t)return;let i=this.syncController_.getExpiredTime(t,this.duration());if(i===null)return;const s=this.mainPlaylistLoader_.main,r=Ui.Playlist.seekable(t,i,Ui.Playlist.liveEdgeDelay(s,t));if(r.length===0||this.mediaTypes_.AUDIO.activePlaylistLoader&&(t=this.mediaTypes_.AUDIO.activePlaylistLoader.media(),i=this.syncController_.getExpiredTime(t,this.duration()),i===null||(e=Ui.Playlist.seekable(t,i,Ui.Playlist.liveEdgeDelay(s,t)),e.length===0)))return;let a,l;if(this.seekable_&&this.seekable_.length&&(a=this.seekable_.end(0),l=this.seekable_.start(0)),e?e.start(0)>r.end(0)||r.start(0)>e.end(0)?this.seekable_=r:this.seekable_=wt([[e.start(0)>r.start(0)?e.start(0):r.start(0),e.end(0)<r.end(0)?e.end(0):r.end(0)]]):this.seekable_=r,this.seekable_&&this.seekable_.length&&this.seekable_.end(0)===a&&this.seekable_.start(0)===l)return;this.logger_(`seekable updated [${bc(this.seekable_)}]`);const d={seekableRanges:this.seekable_};this.trigger({type:"seekablerangeschanged",metadata:d}),this.tech_.trigger("seekablechanged")}updateDuration(e){if(this.updateDuration_&&(this.mediaSource.removeEventListener("sourceopen",this.updateDuration_),this.updateDuration_=null),this.mediaSource.readyState!=="open"){this.updateDuration_=this.updateDuration.bind(this,e),this.mediaSource.addEventListener("sourceopen",this.updateDuration_);return}if(e){const s=this.seekable();if(!s.length)return;(isNaN(this.mediaSource.duration)||this.mediaSource.duration<s.end(s.length-1))&&this.sourceUpdater_.setDuration(s.end(s.length-1));return}const t=this.tech_.buffered();let i=Ui.Playlist.duration(this.mainPlaylistLoader_.media());t.length>0&&(i=Math.max(i,t.end(t.length-1))),this.mediaSource.duration!==i&&this.sourceUpdater_.setDuration(i)}dispose(){this.trigger("dispose"),this.decrypter_.terminate(),this.mainPlaylistLoader_.dispose(),this.mainSegmentLoader_.dispose(),this.contentSteeringController_.dispose(),this.keyStatusMap_.clear(),this.loadOnPlay_&&this.tech_.off("play",this.loadOnPlay_),["AUDIO","SUBTITLES"].forEach(e=>{const t=this.mediaTypes_[e].groups;for(const i in t)t[i].forEach(s=>{s.playlistLoader&&s.playlistLoader.dispose()})}),this.audioSegmentLoader_.dispose(),this.subtitleSegmentLoader_.dispose(),this.sourceUpdater_.dispose(),this.timelineChangeController_.dispose(),this.stopABRTimer_(),this.updateDuration_&&this.mediaSource.removeEventListener("sourceopen",this.updateDuration_),this.mediaSource.removeEventListener("durationchange",this.handleDurationChange_),this.mediaSource.removeEventListener("sourceopen",this.handleSourceOpen_),this.mediaSource.removeEventListener("sourceended",this.handleSourceEnded_),this.off()}main(){return this.mainPlaylistLoader_.main}media(){return this.mainPlaylistLoader_.media()||this.initialMedia_}areMediaTypesKnown_(){const e=!!this.mediaTypes_.AUDIO.activePlaylistLoader,t=!!this.mainSegmentLoader_.getCurrentMediaInfo_(),i=e?!!this.audioSegmentLoader_.getCurrentMediaInfo_():!0;return!(!t||!i)}getCodecsOrExclude_(){const e={main:this.mainSegmentLoader_.getCurrentMediaInfo_()||{},audio:this.audioSegmentLoader_.getCurrentMediaInfo_()||{}},t=this.mainSegmentLoader_.getPendingSegmentPlaylist()||this.media();e.video=e.main;const i=Ms(this.main(),t),s={},r=!!this.mediaTypes_.AUDIO.activePlaylistLoader;if(e.main.hasVideo&&(s.video=i.video||e.main.videoCodec||_t),e.main.isMuxed&&(s.video+=`,${i.audio||e.main.audioCodec||Be}`),(e.main.hasAudio&&!e.main.isMuxed||e.audio.hasAudio||r)&&(s.audio=i.audio||e.main.audioCodec||e.audio.audioCodec||Be,e.audio.isFmp4=e.main.hasAudio&&!e.main.isMuxed?e.main.isFmp4:e.audio.isFmp4),!s.audio&&!s.video){this.excludePlaylist({playlistToExclude:t,error:{message:"Could not determine codecs for playlist."},playlistExclusionDuration:1/0});return}const a=(p,g)=>p?ze(g):je(g),l={};let d;if(["video","audio"].forEach(function(p){if(s.hasOwnProperty(p)&&!a(e[p].isFmp4,s[p])){const g=e[p].isFmp4?"browser":"muxer";l[g]=l[g]||[],l[g].push(s[p]),p==="audio"&&(d=g)}}),r&&d&&t.attributes.AUDIO){const p=t.attributes.AUDIO;this.main().playlists.forEach(g=>{(g.attributes&&g.attributes.AUDIO)===p&&g!==t&&(g.excludeUntil=1/0)}),this.logger_(`excluding audio group ${p} as ${d} does not support codec(s): "${s.audio}"`)}if(Object.keys(l).length){const p=Object.keys(l).reduce((g,y)=>(g&&(g+=", "),g+=`${y} does not support codec(s): "${l[y].join(",")}"`,g),"")+".";this.excludePlaylist({playlistToExclude:t,error:{internal:!0,message:p},playlistExclusionDuration:1/0});return}if(this.sourceUpdater_.hasCreatedSourceBuffers()&&!this.sourceUpdater_.canChangeType()){const p=[];if(["video","audio"].forEach(g=>{const y=(G(this.sourceUpdater_.codecs[g]||"")[0]||{}).type,B=(G(s[g]||"")[0]||{}).type;y&&B&&y.toLowerCase()!==B.toLowerCase()&&p.push(`"${this.sourceUpdater_.codecs[g]}" -> "${s[g]}"`)}),p.length){this.excludePlaylist({playlistToExclude:t,error:{message:`Codec switching not supported: ${p.join(", ")}.`,internal:!0},playlistExclusionDuration:1/0});return}}return s}tryToCreateSourceBuffers_(){if(this.mediaSource.readyState!=="open"||this.sourceUpdater_.hasCreatedSourceBuffers()||!this.areMediaTypesKnown_())return;const e=this.getCodecsOrExclude_();if(!e)return;this.sourceUpdater_.createSourceBuffers(e);const t=[e.video,e.audio].filter(Boolean).join(",");this.excludeIncompatibleVariants_(t)}excludeUnsupportedVariants_(){const e=this.main().playlists,t=[];Object.keys(e).forEach(i=>{const s=e[i];if(t.indexOf(s.id)!==-1)return;t.push(s.id);const r=Ms(this.main,s),a=[];r.audio&&!je(r.audio)&&!ze(r.audio)&&a.push(`audio codec ${r.audio}`),r.video&&!je(r.video)&&!ze(r.video)&&a.push(`video codec ${r.video}`),r.text&&r.text==="stpp.ttml.im1t"&&a.push(`text codec ${r.text}`),a.length&&(s.excludeUntil=1/0,this.logger_(`excluding ${s.id} for unsupported: ${a.join(", ")}`))})}excludeIncompatibleVariants_(e){const t=[],i=this.main().playlists,s=Wr(G(e)),r=ud(s),a=s.video&&G(s.video)[0]||null,l=s.audio&&G(s.audio)[0]||null;Object.keys(i).forEach(d=>{const p=i[d];if(t.indexOf(p.id)!==-1||p.excludeUntil===1/0)return;t.push(p.id);const g=[],y=Ms(this.mainPlaylistLoader_.main,p),B=ud(y);if(!(!y.audio&&!y.video)){if(B!==r&&g.push(`codec count "${B}" !== "${r}"`),!this.sourceUpdater_.canChangeType()){const D=y.video&&G(y.video)[0]||null,P=y.audio&&G(y.audio)[0]||null;D&&a&&D.type.toLowerCase()!==a.type.toLowerCase()&&g.push(`video codec "${D.type}" !== "${a.type}"`),P&&l&&P.type.toLowerCase()!==l.type.toLowerCase()&&g.push(`audio codec "${P.type}" !== "${l.type}"`)}g.length&&(p.excludeUntil=1/0,this.logger_(`excluding ${p.id}: ${g.join(" && ")}`))}})}updateAdCues_(e){let t=0;const i=this.seekable();i.length&&(t=i.start(0)),Hg(e,this.cueTagsTrack_,t)}goalBufferLength(){const e=this.tech_.currentTime(),t=jt.GOAL_BUFFER_LENGTH,i=jt.GOAL_BUFFER_LENGTH_RATE,s=Math.max(t,jt.MAX_GOAL_BUFFER_LENGTH);return Math.min(t+e*i,s)}bufferLowWaterLine(){const e=this.tech_.currentTime(),t=jt.BUFFER_LOW_WATER_LINE,i=jt.BUFFER_LOW_WATER_LINE_RATE,s=Math.max(t,jt.MAX_BUFFER_LOW_WATER_LINE),r=Math.max(t,jt.EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE);return Math.min(t+e*i,this.bufferBasedABR?r:s)}bufferHighWaterLine(){return jt.BUFFER_HIGH_WATER_LINE}addDateRangesToTextTrack_(e){pd(this.inbandTextTracks_,"com.apple.streaming",this.tech_),bg({inbandTextTracks:this.inbandTextTracks_,dateRanges:e})}addMetadataToTextTrack(e,t,i){const s=this.sourceUpdater_.videoBuffer?this.sourceUpdater_.videoTimestampOffset():this.sourceUpdater_.audioTimestampOffset();pd(this.inbandTextTracks_,e,this.tech_),Ag({inbandTextTracks:this.inbandTextTracks_,metadataArray:t,timestampOffset:s,videoDuration:i})}pathwayAttribute_(e){return e.attributes["PATHWAY-ID"]||e.attributes.serviceLocation}initContentSteeringController_(){const e=this.main();if(e.contentSteering){for(const t of e.playlists)this.contentSteeringController_.addAvailablePathway(this.pathwayAttribute_(t));if(this.contentSteeringController_.assignTagProperties(e.uri,e.contentSteering),this.contentSteeringController_.queryBeforeStart){this.contentSteeringController_.requestSteeringManifest(!0);return}this.tech_.one("canplay",()=>{this.contentSteeringController_.requestSteeringManifest()})}}resetContentSteeringController_(){this.contentSteeringController_.clearAvailablePathways(),this.contentSteeringController_.dispose(),this.initContentSteeringController_()}attachContentSteeringListeners_(){this.contentSteeringController_.on("content-steering",this.excludeThenChangePathway_.bind(this)),["contentsteeringloadstart","contentsteeringloadcomplete","contentsteeringparsed"].forEach(t=>{this.contentSteeringController_.on(t,i=>{this.trigger((0,ue.A)({},i))})}),this.sourceType_==="dash"&&this.mainPlaylistLoader_.on("loadedplaylist",()=>{const t=this.main();(this.contentSteeringController_.didDASHTagChange(t.uri,t.contentSteering)||(()=>{const r=this.contentSteeringController_.getAvailablePathways(),a=[];for(const l of t.playlists){const d=l.attributes.serviceLocation;if(d&&(a.push(d),!r.has(d)))return!0}return!!(!a.length&&r.size)})())&&this.resetContentSteeringController_()})}excludeThenChangePathway_(){const e=this.contentSteeringController_.getPathway();if(!e)return;this.handlePathwayClones_();const i=this.main().playlists,s=new Set;let r=!1;Object.keys(i).forEach(a=>{const l=i[a],d=this.pathwayAttribute_(l),p=d&&e!==d;l.excludeUntil===1/0&&l.lastExcludeReason_==="content-steering"&&!p&&(delete l.excludeUntil,delete l.lastExcludeReason_,r=!0);const y=!l.excludeUntil&&l.excludeUntil!==1/0;!s.has(l.id)&&p&&y&&(s.add(l.id),l.excludeUntil=1/0,l.lastExcludeReason_="content-steering",this.logger_(`excluding ${l.id} for ${l.lastExcludeReason_}`))}),this.contentSteeringController_.manifestType_==="DASH"&&Object.keys(this.mediaTypes_).forEach(a=>{const l=this.mediaTypes_[a];if(l.activePlaylistLoader){const d=l.activePlaylistLoader.media_;d&&d.attributes.serviceLocation!==e&&(r=!0)}}),r&&this.changeSegmentPathway_()}handlePathwayClones_(){const t=this.main().playlists,i=this.contentSteeringController_.currentPathwayClones,s=this.contentSteeringController_.nextPathwayClones;if(i&&i.size||s&&s.size){for(const[a,l]of i.entries())s.get(a)||(this.mainPlaylistLoader_.updateOrDeleteClone(l),this.contentSteeringController_.excludePathway(a));for(const[a,l]of s.entries()){const d=i.get(a);if(!d){t.filter(g=>g.attributes["PATHWAY-ID"]===l["BASE-ID"]).forEach(g=>{this.mainPlaylistLoader_.addClonePathway(l,g)}),this.contentSteeringController_.addAvailablePathway(a);continue}this.equalPathwayClones_(d,l)||(this.mainPlaylistLoader_.updateOrDeleteClone(l,!0),this.contentSteeringController_.addAvailablePathway(a))}this.contentSteeringController_.currentPathwayClones=new Map(JSON.parse(JSON.stringify([...s])))}}equalPathwayClones_(e,t){if(e["BASE-ID"]!==t["BASE-ID"]||e.ID!==t.ID||e["URI-REPLACEMENT"].HOST!==t["URI-REPLACEMENT"].HOST)return!1;const i=e["URI-REPLACEMENT"].PARAMS,s=t["URI-REPLACEMENT"].PARAMS;for(const r in i)if(i[r]!==s[r])return!1;for(const r in s)if(i[r]!==s[r])return!1;return!0}changeSegmentPathway_(){const e=this.selectPlaylist();this.pauseLoading(),this.contentSteeringController_.manifestType_==="DASH"&&this.switchMediaForDASHContentSteering_(),this.switchMedia_(e,"content-steering")}excludeNonUsablePlaylistsByKeyId_(){if(!this.mainPlaylistLoader_||!this.mainPlaylistLoader_.main)return;let e=0;const t="non-usable";this.mainPlaylistLoader_.main.playlists.forEach(i=>{const s=this.mainPlaylistLoader_.getKeyIdSet(i);!s||!s.size||s.forEach(r=>{const a="usable",l=this.keyStatusMap_.has(r)&&this.keyStatusMap_.get(r)===a,d=i.lastExcludeReason_===t&&i.excludeUntil===1/0;l?l&&d&&(delete i.excludeUntil,delete i.lastExcludeReason_,this.logger_(`enabling playlist ${i.id} because key ID ${r} is ${a}`)):(i.excludeUntil!==1/0&&i.lastExcludeReason_!==t&&(i.excludeUntil=1/0,i.lastExcludeReason_=t,this.logger_(`excluding playlist ${i.id} because the key ID ${r} doesn't exist in the keyStatusMap or is not ${a}`)),e++)})}),e>=this.mainPlaylistLoader_.main.playlists.length&&this.mainPlaylistLoader_.main.playlists.forEach(i=>{const s=i&&i.attributes&&i.attributes.RESOLUTION&&i.attributes.RESOLUTION.height<720,r=i.excludeUntil===1/0&&i.lastExcludeReason_===t;s&&r&&(delete i.excludeUntil,R.log.warn(`enabling non-HD playlist ${i.id} because all playlists were excluded due to ${t} key IDs`))})}addKeyStatus_(e,t){const r=(typeof e=="string"?e:Fg(e)).slice(0,32).toLowerCase();this.logger_(`KeyStatus '${t}' with key ID ${r} added to the keyStatusMap`),this.keyStatusMap_.set(r,t)}updatePlaylistByKeyStatus(e,t){this.addKeyStatus_(e,t),this.waitingForFastQualityPlaylistReceived_||this.excludeNonUsableThenChangePlaylist_(),this.mainPlaylistLoader_.off("loadedplaylist",this.excludeNonUsableThenChangePlaylist_.bind(this)),this.mainPlaylistLoader_.on("loadedplaylist",this.excludeNonUsableThenChangePlaylist_.bind(this))}excludeNonUsableThenChangePlaylist_(){this.excludeNonUsablePlaylistsByKeyId_(),this.fastQualityChange_()}}const h0=(n,e,t)=>i=>{const s=n.main.playlists[e],r=Io(s),a=Hr(s);if(typeof i=="undefined")return a;i?delete s.disabled:s.disabled=!0;const l={renditionInfo:{id:e,bandwidth:s.attributes.BANDWIDTH,resolution:s.attributes.RESOLUTION,codecs:s.attributes.CODECS},cause:"fast-quality"};return i!==a&&!r&&(t(s),i?n.trigger({type:"renditionenabled",metadata:l}):n.trigger({type:"renditiondisabled",metadata:l})),i};class f0{constructor(e,t,i){const{playlistController_:s}=e,r=s.fastQualityChange_.bind(s);if(t.attributes){const a=t.attributes.RESOLUTION;this.width=a&&a.width,this.height=a&&a.height,this.bandwidth=t.attributes.BANDWIDTH,this.frameRate=t.attributes["FRAME-RATE"]}this.codecs=Ms(s.main(),t),this.playlist=t,this.id=i,this.enabled=h0(e.playlists,t.id,r)}}const p0=function(n){n.representations=()=>{const e=n.playlistController_.main(),t=Rs(e)?n.playlistController_.getAudioTrackPlaylists_():e.playlists;return t?t.filter(i=>!Io(i)).map((i,s)=>new f0(n,i,i.id)):[]}},kd=["seeking","seeked","pause","playing","error"];class m0 extends R.EventTarget{constructor(e){super(),this.playlistController_=e.playlistController,this.tech_=e.tech,this.seekable=e.seekable,this.allowSeeksWithinUnsafeLiveWindow=e.allowSeeksWithinUnsafeLiveWindow,this.liveRangeSafeTimeDelta=e.liveRangeSafeTimeDelta,this.media=e.media,this.playedRanges_=[],this.consecutiveUpdates=0,this.lastRecordedTime=null,this.checkCurrentTimeTimeout_=null,this.logger_=ri("PlaybackWatcher"),this.logger_("initialize");const t=()=>this.monitorCurrentTime_(),i=()=>this.monitorCurrentTime_(),s=()=>this.techWaiting_(),r=()=>this.resetTimeUpdate_(),a=this.playlistController_,l=["main","subtitle","audio"],d={};l.forEach(g=>{d[g]={reset:()=>this.resetSegmentDownloads_(g),updateend:()=>this.checkSegmentDownloads_(g)},a[`${g}SegmentLoader_`].on("appendsdone",d[g].updateend),a[`${g}SegmentLoader_`].on("playlistupdate",d[g].reset),this.tech_.on(["seeked","seeking"],d[g].reset)});const p=g=>{["main","audio"].forEach(y=>{a[`${y}SegmentLoader_`][g]("appended",this.seekingAppendCheck_)})};this.seekingAppendCheck_=()=>{this.fixesBadSeeks_()&&(this.consecutiveUpdates=0,this.lastRecordedTime=this.tech_.currentTime(),p("off"))},this.clearSeekingAppendCheck_=()=>p("off"),this.watchForBadSeeking_=()=>{this.clearSeekingAppendCheck_(),p("on")},this.tech_.on("seeked",this.clearSeekingAppendCheck_),this.tech_.on("seeking",this.watchForBadSeeking_),this.tech_.on("waiting",s),this.tech_.on(kd,r),this.tech_.on("canplay",i),this.tech_.one("play",t),this.dispose=()=>{this.clearSeekingAppendCheck_(),this.logger_("dispose"),this.tech_.off("waiting",s),this.tech_.off(kd,r),this.tech_.off("canplay",i),this.tech_.off("play",t),this.tech_.off("seeking",this.watchForBadSeeking_),this.tech_.off("seeked",this.clearSeekingAppendCheck_),l.forEach(g=>{a[`${g}SegmentLoader_`].off("appendsdone",d[g].updateend),a[`${g}SegmentLoader_`].off("playlistupdate",d[g].reset),this.tech_.off(["seeked","seeking"],d[g].reset)}),this.checkCurrentTimeTimeout_&&A().clearTimeout(this.checkCurrentTimeTimeout_),this.resetTimeUpdate_()}}monitorCurrentTime_(){this.checkCurrentTime_(),this.checkCurrentTimeTimeout_&&A().clearTimeout(this.checkCurrentTimeTimeout_),this.checkCurrentTimeTimeout_=A().setTimeout(this.monitorCurrentTime_.bind(this),250)}resetSegmentDownloads_(e){const t=this.playlistController_[`${e}SegmentLoader_`];this[`${e}StalledDownloads_`]>0&&this.logger_(`resetting possible stalled download count for ${e} loader`),this[`${e}StalledDownloads_`]=0,this[`${e}Buffered_`]=t.buffered_()}checkSegmentDownloads_(e){const t=this.playlistController_,i=t[`${e}SegmentLoader_`],s=i.buffered_(),r=sm(this[`${e}Buffered_`],s);if(this[`${e}Buffered_`]=s,r){const a={bufferedRanges:s};t.trigger({type:"bufferedrangeschanged",metadata:a}),this.resetSegmentDownloads_(e);return}this[`${e}StalledDownloads_`]++,this.logger_(`found #${this[`${e}StalledDownloads_`]} ${e} appends that did not increase buffer (possible stalled download)`,{playlistId:i.playlist_&&i.playlist_.id,buffered:fn(s)}),!(this[`${e}StalledDownloads_`]<10)&&(this.logger_(`${e} loader stalled download exclusion`),this.resetSegmentDownloads_(e),this.tech_.trigger({type:"usage",name:`vhs-${e}-download-exclusion`}),e!=="subtitle"&&t.excludePlaylist({error:{message:`Excessive ${e} segment downloading detected.`},playlistExclusionDuration:1/0}))}checkCurrentTime_(){if(this.tech_.paused()||this.tech_.seeking())return;const e=this.tech_.currentTime(),t=this.tech_.buffered();if(this.lastRecordedTime===e&&(!t.length||e+xi>=t.end(t.length-1)))return this.techWaiting_();if(this.consecutiveUpdates>=5&&e===this.lastRecordedTime)this.consecutiveUpdates++,this.waiting_();else if(e===this.lastRecordedTime)this.consecutiveUpdates++;else{this.playedRanges_.push(wt([this.lastRecordedTime,e]));const i={playedRanges:this.playedRanges_};this.playlistController_.trigger({type:"playedrangeschanged",metadata:i}),this.consecutiveUpdates=0,this.lastRecordedTime=e}}resetTimeUpdate_(){this.consecutiveUpdates=0}fixesBadSeeks_(){if(!this.tech_.seeking())return!1;const t=this.seekable(),i=this.tech_.currentTime(),s=this.afterSeekableWindow_(t,i,this.media(),this.allowSeeksWithinUnsafeLiveWindow);let r;if(s&&(r=t.end(t.length-1)),this.beforeSeekableWindow_(t,i)){const P=t.start(0);r=P+(P===t.end(0)?0:xi)}if(typeof r!="undefined")return this.logger_(`Trying to seek outside of seekable at time ${i} with seekable range ${bc(t)}. Seeking to ${r}.`),this.tech_.setCurrentTime(r),!0;const a=this.playlistController_.sourceUpdater_,l=this.tech_.buffered(),d=a.audioBuffer?a.audioBuffered():null,p=a.videoBuffer?a.videoBuffered():null,g=this.media(),y=g.partTargetDuration?g.partTargetDuration:(g.targetDuration-Ci)*2,B=[d,p];for(let P=0;P<B.length;P++){if(!B[P])continue;if(wo(B[P],i)<y)return!1}const D=zr(l,i);return D.length===0?!1:(r=D.start(0)+xi,this.logger_(`Buffered region starts (${D.start(0)})  just beyond seek point (${i}). Seeking to ${r}.`),this.tech_.setCurrentTime(r),!0)}waiting_(){if(this.techWaiting_())return;const e=this.tech_.currentTime(),t=this.tech_.buffered(),i=Xn(t,e);if(i.length&&e+3<=i.end(0)){this.resetTimeUpdate_(),this.tech_.setCurrentTime(e),this.logger_(`Stopped at ${e} while inside a buffered region [${i.start(0)} -> ${i.end(0)}]. Attempting to resume playback by seeking to the current time.`),this.tech_.trigger({type:"usage",name:"vhs-unknown-waiting"});return}}techWaiting_(){const e=this.seekable(),t=this.tech_.currentTime();if(this.tech_.seeking())return!0;if(this.beforeSeekableWindow_(e,t)){const l=e.end(e.length-1);return this.logger_(`Fell out of live window at time ${t}. Seeking to live point (seekable end) ${l}`),this.resetTimeUpdate_(),this.tech_.setCurrentTime(l),this.tech_.trigger({type:"usage",name:"vhs-live-resync"}),!0}const i=this.tech_.vhs.playlistController_.sourceUpdater_,s=this.tech_.buffered();if(this.videoUnderflow_({audioBuffered:i.audioBuffered(),videoBuffered:i.videoBuffered(),currentTime:t}))return this.resetTimeUpdate_(),this.tech_.setCurrentTime(t),this.tech_.trigger({type:"usage",name:"vhs-video-underflow"}),!0;const a=zr(s,t);return a.length>0?(this.logger_(`Stopped at ${t} and seeking to ${a.start(0)}`),this.resetTimeUpdate_(),this.skipTheGap_(t),!0):!1}afterSeekableWindow_(e,t,i,s=!1){if(!e.length)return!1;let r=e.end(e.length-1)+xi;const a=!i.endList,l=typeof i.partTargetDuration=="number";return a&&(l||s)&&(r=e.end(e.length-1)+i.targetDuration*3),t>r}beforeSeekableWindow_(e,t){return!!(e.length&&e.start(0)>0&&t<e.start(0)-this.liveRangeSafeTimeDelta)}videoUnderflow_({videoBuffered:e,audioBuffered:t,currentTime:i}){if(!e)return;let s;if(e.length&&t.length){const r=Xn(e,i-3),a=Xn(e,i),l=Xn(t,i);l.length&&!a.length&&r.length&&(s={start:r.end(0),end:l.end(0)})}else zr(e,i).length||(s=this.gapFromVideoUnderflow_(e,i));return s?(this.logger_(`Encountered a gap in video from ${s.start} to ${s.end}. Seeking to current time ${i}`),!0):!1}skipTheGap_(e){const t=this.tech_.buffered(),i=this.tech_.currentTime(),s=zr(t,i);if(this.resetTimeUpdate_(),s.length===0||i!==e)return;this.logger_("skipTheGap_:","currentTime:",i,"scheduled currentTime:",e,"nextRange start:",s.start(0)),this.tech_.setCurrentTime(s.start(0)+Ci);const r={gapInfo:{from:i,to:s.start(0)}};this.playlistController_.trigger({type:"gapjumped",metadata:r}),this.tech_.trigger({type:"usage",name:"vhs-gap-skip"})}gapFromVideoUnderflow_(e,t){const i=tm(e);for(let s=0;s<i.length;s++){const r=i.start(s),a=i.end(s);if(t-r<4&&t-r>2)return{start:r,end:a}}return null}}const g0={errorInterval:30,getSource(n){const t=this.tech({IWillNotUseThisInPlugins:!0}).currentSource_||this.currentSource();return n(t)}},Id=function(n,e){let t=0,i=0;const s=Ye(g0,e);n.ready(()=>{n.trigger({type:"usage",name:"vhs-error-reload-initialized"})});const r=function(){i&&n.currentTime(i)},a=function(g){g!=null&&(i=n.duration()!==1/0&&n.currentTime()||0,n.one("loadedmetadata",r),n.src(g),n.trigger({type:"usage",name:"vhs-error-reload"}),n.play())},l=function(){if(Date.now()-t<s.errorInterval*1e3){n.trigger({type:"usage",name:"vhs-error-reload-canceled"});return}if(!s.getSource||typeof s.getSource!="function"){R.log.error("ERROR: reloadSourceOnError - The option getSource must be a function!");return}return t=Date.now(),s.getSource.call(n,a)},d=function(){n.off("loadedmetadata",r),n.off("error",l),n.off("dispose",d)},p=function(g){d(),Id(n,g)};n.on("error",l),n.on("dispose",d),n.reloadSourceOnError=p},v0=function(n){Id(this,n)};var Pd="3.14.2",A0="7.0.3",y0="1.3.0",_0="7.2.0",b0="4.0.2";const ft={PlaylistLoader:Jn,Playlist:Ht,utils:Sm,STANDARD_PLAYLIST_SELECTOR:hd,INITIAL_PLAYLIST_SELECTOR:fg,lastBandwidthSelector:hd,movingAverageBandwidthSelector:dg,comparePlaylistBandwidth:qo,comparePlaylistResolution:cg,xhr:Vc()};Object.keys(jt).forEach(n=>{Object.defineProperty(ft,n,{get(){return R.log.warn(`using Vhs.${n} is UNSAFE be sure you know what you are doing`),jt[n]},set(e){if(R.log.warn(`using Vhs.${n} is UNSAFE be sure you know what you are doing`),typeof e!="number"||e<0){R.log.warn(`value of Vhs.${n} must be greater than or equal to 0`);return}jt[n]=e}})});const Od="videojs-vhs",Ld=function(n,e){const t=e.media();let i=-1;for(let s=0;s<n.length;s++)if(n[s].id===t.id){i=s;break}n.selectedIndex_=i,n.trigger({selectedIndex:i,type:"change"})},E0=function(n,e){e.representations().forEach(t=>{n.addQualityLevel(t)}),Ld(n,e.playlists)};ft.canPlaySource=function(){return R.log.warn("VHS is no longer a tech. Please remove it from your player's techOrder.")};const T0=(n,e,t)=>{if(!n)return n;let i={};e&&e.attributes&&e.attributes.CODECS&&(i=Wr(G(e.attributes.CODECS))),t&&t.attributes&&t.attributes.CODECS&&(i.audio=t.attributes.CODECS);const s=Me(i.video),r=Me(i.audio),a={};for(const l in n)a[l]={},r&&(a[l].audioContentType=r),s&&(a[l].videoContentType=s),e.contentProtection&&e.contentProtection[l]&&e.contentProtection[l].pssh&&(a[l].pssh=e.contentProtection[l].pssh),typeof n[l]=="string"&&(a[l].url=n[l]);return Ye(n,a)},C0=(n,e)=>n.reduce((t,i)=>{if(!i.contentProtection)return t;const s=e.reduce((r,a)=>{const l=i.contentProtection[a];return l&&l.pssh&&(r[a]={pssh:l.pssh}),r},{});return Object.keys(s).length&&t.push(s),t},[]),x0=({player:n,sourceKeySystems:e,audioMedia:t,mainPlaylists:i})=>{if(!n.eme.initializeMediaKeys)return Promise.resolve();const s=t?i.concat([t]):i,r=C0(s,Object.keys(e)),a=[],l=[];return r.forEach(d=>{l.push(new Promise((p,g)=>{n.tech_.one("keysessioncreated",p)})),a.push(new Promise((p,g)=>{n.eme.initializeMediaKeys({keySystems:d},y=>{if(y){g(y);return}p()})}))}),Promise.race([Promise.all(a),Promise.race(l)])},S0=({player:n,sourceKeySystems:e,media:t,audioMedia:i})=>{const s=T0(e,t,i);return s?(n.currentSource().keySystems=s,s&&!n.eme?(R.log.warn("DRM encrypted source cannot be decrypted without a DRM plugin"),!1):!0):!1},Rd=()=>{if(!A().localStorage)return null;const n=A().localStorage.getItem(Od);if(!n)return null;try{return JSON.parse(n)}catch(e){return null}},j0=n=>{if(!A().localStorage)return!1;let e=Rd();e=e?Ye(e,n):n;try{A().localStorage.setItem(Od,JSON.stringify(e))}catch(t){return!1}return e},B0=n=>n.toLowerCase().indexOf("data:application/vnd.videojs.vhs+json,")===0?JSON.parse(n.substring(n.indexOf(",")+1)):n,Nd=(n,e)=>{n._requestCallbackSet||(n._requestCallbackSet=new Set),n._requestCallbackSet.add(e)},Md=(n,e)=>{n._responseCallbackSet||(n._responseCallbackSet=new Set),n._responseCallbackSet.add(e)},Fd=(n,e)=>{n._requestCallbackSet&&(n._requestCallbackSet.delete(e),n._requestCallbackSet.size||delete n._requestCallbackSet)},Ud=(n,e)=>{n._responseCallbackSet&&(n._responseCallbackSet.delete(e),n._responseCallbackSet.size||delete n._responseCallbackSet)};ft.supportsNativeHls=function(){if(!k()||!k().createElement)return!1;const n=k().createElement("video");return R.getTech("Html5").isSupported()?["application/vnd.apple.mpegurl","audio/mpegurl","audio/x-mpegurl","application/x-mpegurl","video/x-mpegurl","video/mpegurl","application/mpegurl"].some(function(t){return/maybe|probably/i.test(n.canPlayType(t))}):!1}(),ft.supportsNativeDash=function(){return!k()||!k().createElement||!R.getTech("Html5").isSupported()?!1:/maybe|probably/i.test(k().createElement("video").canPlayType("application/dash+xml"))}(),ft.supportsTypeNatively=n=>n==="hls"?ft.supportsNativeHls:n==="dash"?ft.supportsNativeDash:!1,ft.isSupported=function(){return R.log.warn("VHS is no longer a tech. Please remove it from your player's techOrder.")},ft.xhr.onRequest=function(n){Nd(ft.xhr,n)},ft.xhr.onResponse=function(n){Md(ft.xhr,n)},ft.xhr.offRequest=function(n){Fd(ft.xhr,n)},ft.xhr.offResponse=function(n){Ud(ft.xhr,n)};const w0=R.getComponent("Component");class Vd extends w0{constructor(e,t,i){if(super(t,i.vhs),typeof i.initialBandwidth=="number"&&(this.options_.bandwidth=i.initialBandwidth),this.logger_=ri("VhsHandler"),t.options_&&t.options_.playerId){const s=R.getPlayer(t.options_.playerId);this.player_=s}if(this.tech_=t,this.source_=e,this.stats={},this.ignoreNextSeekingEvent_=!1,this.setOptions_(),this.options_.overrideNative&&t.overrideNativeAudioTracks&&t.overrideNativeVideoTracks)t.overrideNativeAudioTracks(!0),t.overrideNativeVideoTracks(!0);else if(this.options_.overrideNative&&(t.featuresNativeVideoTracks||t.featuresNativeAudioTracks))throw new Error("Overriding native VHS requires emulated tracks. See https://git.io/vMpjB");this.on(k(),["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","MSFullscreenChange"],s=>{const r=k().fullscreenElement||k().webkitFullscreenElement||k().mozFullScreenElement||k().msFullscreenElement;r&&r.contains(this.tech_.el())?this.playlistController_.fastQualityChange_():this.playlistController_.checkABR_()}),this.on(this.tech_,"seeking",function(){if(this.ignoreNextSeekingEvent_){this.ignoreNextSeekingEvent_=!1;return}this.setCurrentTime(this.tech_.currentTime())}),this.on(this.tech_,"error",function(){this.tech_.error()&&this.playlistController_&&this.playlistController_.pauseLoading()}),this.on(this.tech_,"play",this.play)}setOptions_(e={}){if(this.options_=Ye(this.options_,e),this.options_.withCredentials=this.options_.withCredentials||!1,this.options_.limitRenditionByPlayerDimensions=this.options_.limitRenditionByPlayerDimensions!==!1,this.options_.useDevicePixelRatio=this.options_.useDevicePixelRatio||!1,this.options_.useBandwidthFromLocalStorage=typeof this.source_.useBandwidthFromLocalStorage!="undefined"?this.source_.useBandwidthFromLocalStorage:this.options_.useBandwidthFromLocalStorage||!1,this.options_.useForcedSubtitles=this.options_.useForcedSubtitles||!1,this.options_.useNetworkInformationApi=this.options_.useNetworkInformationApi||!1,this.options_.useDtsForTimestampOffset=this.options_.useDtsForTimestampOffset||!1,this.options_.customTagParsers=this.options_.customTagParsers||[],this.options_.customTagMappers=this.options_.customTagMappers||[],this.options_.cacheEncryptionKeys=this.options_.cacheEncryptionKeys||!1,this.options_.llhls=this.options_.llhls!==!1,this.options_.bufferBasedABR=this.options_.bufferBasedABR||!1,typeof this.options_.playlistExclusionDuration!="number"&&(this.options_.playlistExclusionDuration=60),typeof this.options_.bandwidth!="number"&&this.options_.useBandwidthFromLocalStorage){const i=Rd();i&&i.bandwidth&&(this.options_.bandwidth=i.bandwidth,this.tech_.trigger({type:"usage",name:"vhs-bandwidth-from-local-storage"})),i&&i.throughput&&(this.options_.throughput=i.throughput,this.tech_.trigger({type:"usage",name:"vhs-throughput-from-local-storage"}))}typeof this.options_.bandwidth!="number"&&(this.options_.bandwidth=jt.INITIAL_BANDWIDTH),this.options_.enableLowInitialPlaylist=this.options_.enableLowInitialPlaylist&&this.options_.bandwidth===jt.INITIAL_BANDWIDTH,["withCredentials","useDevicePixelRatio","customPixelRatio","limitRenditionByPlayerDimensions","bandwidth","customTagParsers","customTagMappers","cacheEncryptionKeys","playlistSelector","initialPlaylistSelector","bufferBasedABR","liveRangeSafeTimeDelta","llhls","useForcedSubtitles","useNetworkInformationApi","useDtsForTimestampOffset","exactManifestTimings","leastPixelDiffSelector"].forEach(i=>{typeof this.source_[i]!="undefined"&&(this.options_[i]=this.source_[i])}),this.limitRenditionByPlayerDimensions=this.options_.limitRenditionByPlayerDimensions,this.useDevicePixelRatio=this.options_.useDevicePixelRatio;const t=this.options_.customPixelRatio;typeof t=="number"&&t>=0&&(this.customPixelRatio=t)}setOptions(e={}){this.setOptions_(e)}src(e,t){if(!e)return;this.setOptions_(),this.options_.src=B0(this.source_.src),this.options_.tech=this.tech_,this.options_.externVhs=ft,this.options_.sourceType=Ct(t),this.options_.seekTo=r=>{this.tech_.setCurrentTime(r)},this.options_.player_=this.player_,this.playlistController_=new d0(this.options_);const i=Ye({liveRangeSafeTimeDelta:xi},this.options_,{seekable:()=>this.seekable(),media:()=>this.playlistController_.media(),playlistController:this.playlistController_});this.playbackWatcher_=new m0(i),this.attachStreamingEventListeners_(),this.playlistController_.on("error",()=>{const r=R.players[this.tech_.options_.playerId];let a=this.playlistController_.error;typeof a=="object"&&!a.code?a.code=3:typeof a=="string"&&(a={message:a,code:3}),r.error(a)});const s=this.options_.bufferBasedABR?ft.movingAverageBandwidthSelector(.55):ft.STANDARD_PLAYLIST_SELECTOR;this.playlistController_.selectPlaylist=this.selectPlaylist?this.selectPlaylist.bind(this):s.bind(this),this.playlistController_.selectInitialPlaylist=ft.INITIAL_PLAYLIST_SELECTOR.bind(this),this.playlists=this.playlistController_.mainPlaylistLoader_,this.mediaSource=this.playlistController_.mediaSource,Object.defineProperties(this,{selectPlaylist:{get(){return this.playlistController_.selectPlaylist},set(r){this.playlistController_.selectPlaylist=r.bind(this)}},throughput:{get(){return this.playlistController_.mainSegmentLoader_.throughput.rate},set(r){this.playlistController_.mainSegmentLoader_.throughput.rate=r,this.playlistController_.mainSegmentLoader_.throughput.count=1}},bandwidth:{get(){let r=this.playlistController_.mainSegmentLoader_.bandwidth;const a=A().navigator.connection||A().navigator.mozConnection||A().navigator.webkitConnection,l=1e7;if(this.options_.useNetworkInformationApi&&a){const d=a.downlink*1e3*1e3;d>=l&&r>=l?r=Math.max(r,d):r=d}return r},set(r){this.playlistController_.mainSegmentLoader_.bandwidth=r,this.playlistController_.mainSegmentLoader_.throughput={rate:0,count:0}}},systemBandwidth:{get(){const r=1/(this.bandwidth||1);let a;return this.throughput>0?a=1/this.throughput:a=0,Math.floor(1/(r+a))},set(){R.log.error('The "systemBandwidth" property is read-only')}}}),this.options_.bandwidth&&(this.bandwidth=this.options_.bandwidth),this.options_.throughput&&(this.throughput=this.options_.throughput),Object.defineProperties(this.stats,{bandwidth:{get:()=>this.bandwidth||0,enumerable:!0},mediaRequests:{get:()=>this.playlistController_.mediaRequests_()||0,enumerable:!0},mediaRequestsAborted:{get:()=>this.playlistController_.mediaRequestsAborted_()||0,enumerable:!0},mediaRequestsTimedout:{get:()=>this.playlistController_.mediaRequestsTimedout_()||0,enumerable:!0},mediaRequestsErrored:{get:()=>this.playlistController_.mediaRequestsErrored_()||0,enumerable:!0},mediaTransferDuration:{get:()=>this.playlistController_.mediaTransferDuration_()||0,enumerable:!0},mediaBytesTransferred:{get:()=>this.playlistController_.mediaBytesTransferred_()||0,enumerable:!0},mediaSecondsLoaded:{get:()=>this.playlistController_.mediaSecondsLoaded_()||0,enumerable:!0},mediaAppends:{get:()=>this.playlistController_.mediaAppends_()||0,enumerable:!0},mainAppendsToLoadedData:{get:()=>this.playlistController_.mainAppendsToLoadedData_()||0,enumerable:!0},audioAppendsToLoadedData:{get:()=>this.playlistController_.audioAppendsToLoadedData_()||0,enumerable:!0},appendsToLoadedData:{get:()=>this.playlistController_.appendsToLoadedData_()||0,enumerable:!0},timeToLoadedData:{get:()=>this.playlistController_.timeToLoadedData_()||0,enumerable:!0},buffered:{get:()=>fn(this.tech_.buffered()),enumerable:!0},currentTime:{get:()=>this.tech_.currentTime(),enumerable:!0},currentSource:{get:()=>this.tech_.currentSource_,enumerable:!0},currentTech:{get:()=>this.tech_.name_,enumerable:!0},duration:{get:()=>this.tech_.duration(),enumerable:!0},main:{get:()=>this.playlists.main,enumerable:!0},playerDimensions:{get:()=>this.tech_.currentDimensions(),enumerable:!0},seekable:{get:()=>fn(this.tech_.seekable()),enumerable:!0},timestamp:{get:()=>Date.now(),enumerable:!0},videoPlaybackQuality:{get:()=>this.tech_.getVideoPlaybackQuality(),enumerable:!0}}),this.tech_.one("canplay",this.playlistController_.setupFirstPlay.bind(this.playlistController_)),this.tech_.on("bandwidthupdate",()=>{this.options_.useBandwidthFromLocalStorage&&j0({bandwidth:this.bandwidth,throughput:Math.round(this.throughput)})}),this.playlistController_.on("selectedinitialmedia",()=>{p0(this)}),this.playlistController_.sourceUpdater_.on("createdsourcebuffers",()=>{this.setupEme_()}),this.on(this.playlistController_,"progress",function(){this.tech_.trigger("progress")}),this.on(this.playlistController_,"firstplay",function(){this.ignoreNextSeekingEvent_=!0}),this.setupQualityLevels_(),this.tech_.el()&&(this.mediaSourceUrl_=A().URL.createObjectURL(this.playlistController_.mediaSource),this.tech_.src(this.mediaSourceUrl_))}createKeySessions_(){const e=this.playlistController_.mediaTypes_.AUDIO.activePlaylistLoader;this.logger_("waiting for EME key session creation"),x0({player:this.player_,sourceKeySystems:this.source_.keySystems,audioMedia:e&&e.media(),mainPlaylists:this.playlists.main.playlists}).then(()=>{this.logger_("created EME key session"),this.playlistController_.sourceUpdater_.initializedEme()}).catch(t=>{this.logger_("error while creating EME key session",t),this.player_.error({message:"Failed to initialize media keys for EME",code:3})})}handleWaitingForKey_(){this.logger_("waitingforkey fired, attempting to create any new key sessions"),this.createKeySessions_()}setupEme_(){const e=this.playlistController_.mediaTypes_.AUDIO.activePlaylistLoader,t=S0({player:this.player_,sourceKeySystems:this.source_.keySystems,media:this.playlists.media(),audioMedia:e&&e.media()});if(this.player_.tech_.on("keystatuschange",i=>{this.playlistController_.updatePlaylistByKeyStatus(i.keyId,i.status)}),this.handleWaitingForKey_=this.handleWaitingForKey_.bind(this),this.player_.tech_.on("waitingforkey",this.handleWaitingForKey_),!t){this.playlistController_.sourceUpdater_.initializedEme();return}this.createKeySessions_()}setupQualityLevels_(){const e=R.players[this.tech_.options_.playerId];!e||!e.qualityLevels||this.qualityLevels_||(this.qualityLevels_=e.qualityLevels(),this.playlistController_.on("selectedinitialmedia",()=>{E0(this.qualityLevels_,this)}),this.playlists.on("mediachange",()=>{Ld(this.qualityLevels_,this.playlists)}))}static version(){return{"@videojs/http-streaming":Pd,"mux.js":A0,"mpd-parser":y0,"m3u8-parser":_0,"aes-decrypter":b0}}version(){return this.constructor.version()}canChangeType(){return bd.canChangeType()}play(){this.playlistController_.play()}setCurrentTime(e){this.playlistController_.setCurrentTime(e)}duration(){return this.playlistController_.duration()}seekable(){return this.playlistController_.seekable()}dispose(){this.playbackWatcher_&&this.playbackWatcher_.dispose(),this.playlistController_&&this.playlistController_.dispose(),this.qualityLevels_&&this.qualityLevels_.dispose(),this.tech_&&this.tech_.vhs&&delete this.tech_.vhs,this.mediaSourceUrl_&&A().URL.revokeObjectURL&&(A().URL.revokeObjectURL(this.mediaSourceUrl_),this.mediaSourceUrl_=null),this.tech_&&this.tech_.off("waitingforkey",this.handleWaitingForKey_),super.dispose()}convertToProgramTime(e,t){return Pm({playlist:this.playlistController_.media(),time:e,callback:t})}seekToProgramTime(e,t,i=!0,s=2){return $c({programTime:e,playlist:this.playlistController_.media(),retryCount:s,pauseAfterSeek:i,seekTo:this.options_.seekTo,tech:this.options_.tech,callback:t})}setupXhrHooks_(){this.xhr.onRequest=e=>{Nd(this.xhr,e)},this.xhr.onResponse=e=>{Md(this.xhr,e)},this.xhr.offRequest=e=>{Fd(this.xhr,e)},this.xhr.offResponse=e=>{Ud(this.xhr,e)},this.player_.trigger("xhr-hooks-ready")}attachStreamingEventListeners_(){const e=["seekablerangeschanged","bufferedrangeschanged","contentsteeringloadstart","contentsteeringloadcomplete","contentsteeringparsed"],t=["gapjumped","playedrangeschanged"];e.forEach(i=>{this.playlistController_.on(i,s=>{this.player_.trigger((0,ue.A)({},s))})}),t.forEach(i=>{this.playbackWatcher_.on(i,s=>{this.player_.trigger((0,ue.A)({},s))})})}}const Kr={name:"videojs-http-streaming",VERSION:Pd,canHandleSource(n,e={}){const t=Ye(R.options,e);return!t.vhs.experimentalUseMMS&&!ze("avc1.4d400d,mp4a.40.2",!1)?!1:Kr.canPlayType(n.type,t)},handleSource(n,e,t={}){const i=Ye(R.options,t);return e.vhs=new Vd(n,e,i),e.vhs.xhr=Vc(),e.vhs.setupXhrHooks_(),e.vhs.src(n.src,n.type),e.vhs},canPlayType(n,e){const t=Ct(n);if(!t)return"";const i=Kr.getOverrideNative(e);return!ft.supportsTypeNatively(t)||i?"maybe":""},getOverrideNative(n={}){const{vhs:e={}}=n,t=!(R.browser.IS_ANY_SAFARI||R.browser.IS_IOS),{overrideNative:i=t}=e;return i}};ze("avc1.4d400d,mp4a.40.2",!0)&&R.getTech("Html5").registerSourceHandler(Kr,0),R.VhsHandler=Vd,R.VhsSourceHandler=Kr,R.Vhs=ft,R.use||R.registerComponent("Vhs",ft),R.options.vhs=R.options.vhs||{},(!R.getPlugin||!R.getPlugin("reloadSourceOnError"))&&R.registerPlugin("reloadSourceOnError",v0)},94784:function(ye,re,W){var J=W(89840),A=ye.exports={WebVTT:W(66311),VTTCue:W(50184),VTTRegion:W(35891)};J.vttjs=A,J.WebVTT=A.WebVTT;var M=A.VTTCue,k=A.VTTRegion,$=J.VTTCue,Z=J.VTTRegion;A.shim=function(){J.VTTCue=M,J.VTTRegion=k},A.restore=function(){J.VTTCue=$,J.VTTRegion=Z},J.VTTCue||A.shim()},66311:function(ye,re,W){var J=W(49697),A=Object.create||function(){function T(){}return function(x){if(arguments.length!==1)throw new Error("Object.create shim only accepts one parameter.");return T.prototype=x,new T}}();function M(T,x){this.name="ParsingError",this.code=T.code,this.message=x||T.message}M.prototype=A(Error.prototype),M.prototype.constructor=M,M.Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}};function k(T){function x(ne,ce,de,le){return(ne|0)*3600+(ce|0)*60+(de|0)+(le|0)/1e3}var L=T.match(/^(\d+):(\d{1,2})(:\d{1,2})?\.(\d{3})/);return L?L[3]?x(L[1],L[2],L[3].replace(":",""),L[4]):L[1]>59?x(L[1],L[2],0,L[4]):x(0,L[1],L[2],L[4]):null}function $(){this.values=A(null)}$.prototype={set:function(T,x){!this.get(T)&&x!==""&&(this.values[T]=x)},get:function(T,x,L){return L?this.has(T)?this.values[T]:x[L]:this.has(T)?this.values[T]:x},has:function(T){return T in this.values},alt:function(T,x,L){for(var ne=0;ne<L.length;++ne)if(x===L[ne]){this.set(T,x);break}},integer:function(T,x){/^-?\d+$/.test(x)&&this.set(T,parseInt(x,10))},percent:function(T,x){var L;return(L=x.match(/^([\d]{1,3})(\.[\d]*)?%$/))&&(x=parseFloat(x),x>=0&&x<=100)?(this.set(T,x),!0):!1}};function Z(T,x,L,ne){var ce=ne?T.split(ne):[T];for(var de in ce)if(typeof ce[de]=="string"){var le=ce[de].split(L);if(le.length===2){var me=le[0].trim(),G=le[1].trim();x(me,G)}}}function he(T,x,L){var ne=T;function ce(){var me=k(T);if(me===null)throw new M(M.Errors.BadTimeStamp,"Malformed timestamp: "+ne);return T=T.replace(/^[^\sa-zA-Z-]+/,""),me}function de(me,G){var te=new $;Z(me,function(ie,se){switch(ie){case"region":for(var Te=L.length-1;Te>=0;Te--)if(L[Te].id===se){te.set(ie,L[Te].region);break}break;case"vertical":te.alt(ie,se,["rl","lr"]);break;case"line":var Me=se.split(","),ze=Me[0];te.integer(ie,ze),te.percent(ie,ze)&&te.set("snapToLines",!1),te.alt(ie,ze,["auto"]),Me.length===2&&te.alt("lineAlign",Me[1],["start","center","end"]);break;case"position":Me=se.split(","),te.percent(ie,Me[0]),Me.length===2&&te.alt("positionAlign",Me[1],["start","center","end"]);break;case"size":te.percent(ie,se);break;case"align":te.alt(ie,se,["start","center","end","left","right"]);break}},/:/,/\s/),G.region=te.get("region",null),G.vertical=te.get("vertical","");try{G.line=te.get("line","auto")}catch(ie){}G.lineAlign=te.get("lineAlign","start"),G.snapToLines=te.get("snapToLines",!0),G.size=te.get("size",100);try{G.align=te.get("align","center")}catch(ie){G.align=te.get("align","middle")}try{G.position=te.get("position","auto")}catch(ie){G.position=te.get("position",{start:0,left:0,center:50,middle:50,end:100,right:100},G.align)}G.positionAlign=te.get("positionAlign",{start:"start",left:"start",center:"center",middle:"center",end:"end",right:"end"},G.align)}function le(){T=T.replace(/^\s+/,"")}if(le(),x.startTime=ce(),le(),T.substr(0,3)!=="-->")throw new M(M.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '-->'): "+ne);T=T.substr(3),le(),x.endTime=ce(),le(),de(T,x)}var fe=J.createElement&&J.createElement("textarea"),ue={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},ee={white:"rgba(255,255,255,1)",lime:"rgba(0,255,0,1)",cyan:"rgba(0,255,255,1)",red:"rgba(255,0,0,1)",yellow:"rgba(255,255,0,1)",magenta:"rgba(255,0,255,1)",blue:"rgba(0,0,255,1)",black:"rgba(0,0,0,1)"},Ce={v:"title",lang:"lang"},Pe={rt:"ruby"};function Ve(T,x){function L(){if(!x)return null;function ze(Be){return x=x.substr(Be.length),Be}var je=x.match(/^([^<]*)(<[^>]*>?)?/);return ze(je[1]?je[1]:je[2])}function ne(ze){return fe.innerHTML=ze,ze=fe.textContent,fe.textContent="",ze}function ce(ze,je){return!Pe[je.localName]||Pe[je.localName]===ze.localName}function de(ze,je){var Be=ue[ze];if(!Be)return null;var _t=T.document.createElement(Be),Dt=Ce[ze];return Dt&&je&&(_t[Dt]=je.trim()),_t}for(var le=T.document.createElement("div"),me=le,G,te=[];(G=L())!==null;){if(G[0]==="<"){if(G[1]==="/"){te.length&&te[te.length-1]===G.substr(2).replace(">","")&&(te.pop(),me=me.parentNode);continue}var ie=k(G.substr(1,G.length-2)),se;if(ie){se=T.document.createProcessingInstruction("timestamp",ie),me.appendChild(se);continue}var Te=G.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);if(!Te||(se=de(Te[1],Te[3]),!se)||!ce(me,se))continue;if(Te[2]){var Me=Te[2].split(".");Me.forEach(function(ze){var je=/^bg_/.test(ze),Be=je?ze.slice(3):ze;if(ee.hasOwnProperty(Be)){var _t=je?"background-color":"color",Dt=ee[Be];se.style[_t]=Dt}}),se.className=Me.join(" ")}te.push(Te[1]),me.appendChild(se),me=se;continue}me.appendChild(T.document.createTextNode(ne(G)))}return le}var X=[[1470,1470],[1472,1472],[1475,1475],[1478,1478],[1488,1514],[1520,1524],[1544,1544],[1547,1547],[1549,1549],[1563,1563],[1566,1610],[1645,1647],[1649,1749],[1765,1766],[1774,1775],[1786,1805],[1807,1808],[1810,1839],[1869,1957],[1969,1969],[1984,2026],[2036,2037],[2042,2042],[2048,2069],[2074,2074],[2084,2084],[2088,2088],[2096,2110],[2112,2136],[2142,2142],[2208,2208],[2210,2220],[8207,8207],[64285,64285],[64287,64296],[64298,64310],[64312,64316],[64318,64318],[64320,64321],[64323,64324],[64326,64449],[64467,64829],[64848,64911],[64914,64967],[65008,65020],[65136,65140],[65142,65276],[67584,67589],[67592,67592],[67594,67637],[67639,67640],[67644,67644],[67647,67669],[67671,67679],[67840,67867],[67872,67897],[67903,67903],[67968,68023],[68030,68031],[68096,68096],[68112,68115],[68117,68119],[68121,68147],[68160,68167],[68176,68184],[68192,68223],[68352,68405],[68416,68437],[68440,68466],[68472,68479],[68608,68680],[126464,126467],[126469,126495],[126497,126498],[126500,126500],[126503,126503],[126505,126514],[126516,126519],[126521,126521],[126523,126523],[126530,126530],[126535,126535],[126537,126537],[126539,126539],[126541,126543],[126545,126546],[126548,126548],[126551,126551],[126553,126553],[126555,126555],[126557,126557],[126559,126559],[126561,126562],[126564,126564],[126567,126570],[126572,126578],[126580,126583],[126585,126588],[126590,126590],[126592,126601],[126603,126619],[126625,126627],[126629,126633],[126635,126651],[1114109,1114109]];function He(T){for(var x=0;x<X.length;x++){var L=X[x];if(T>=L[0]&&T<=L[1])return!0}return!1}function Re(T){var x=[],L="",ne;if(!T||!T.childNodes)return"ltr";function ce(me,G){for(var te=G.childNodes.length-1;te>=0;te--)me.push(G.childNodes[te])}function de(me){if(!me||!me.length)return null;var G=me.pop(),te=G.textContent||G.innerText;if(te){var ie=te.match(/^.*(\n|\r)/);return ie?(me.length=0,ie[0]):te}if(G.tagName==="ruby")return de(me);if(G.childNodes)return ce(me,G),de(me)}for(ce(x,T);L=de(x);)for(var le=0;le<L.length;le++)if(ne=L.charCodeAt(le),He(ne))return"rtl";return"ltr"}function Xe(T){if(typeof T.line=="number"&&(T.snapToLines||T.line>=0&&T.line<=100))return T.line;if(!T.track||!T.track.textTrackList||!T.track.textTrackList.mediaElement)return-1;for(var x=T.track,L=x.textTrackList,ne=0,ce=0;ce<L.length&&L[ce]!==x;ce++)L[ce].mode==="showing"&&ne++;return++ne*-1}function ae(){}ae.prototype.applyStyles=function(T,x){x=x||this.div;for(var L in T)T.hasOwnProperty(L)&&(x.style[L]=T[L])},ae.prototype.formatStyle=function(T,x){return T===0?0:T+x};function ke(T,x,L){ae.call(this),this.cue=x,this.cueDiv=Ve(T,x.text);var ne={color:"rgba(255, 255, 255, 1)",backgroundColor:"rgba(0, 0, 0, 0.8)",position:"relative",left:0,right:0,top:0,bottom:0,display:"inline",writingMode:x.vertical===""?"horizontal-tb":x.vertical==="lr"?"vertical-lr":"vertical-rl",unicodeBidi:"plaintext"};this.applyStyles(ne,this.cueDiv),this.div=T.document.createElement("div"),ne={direction:Re(this.cueDiv),writingMode:x.vertical===""?"horizontal-tb":x.vertical==="lr"?"vertical-lr":"vertical-rl",unicodeBidi:"plaintext",textAlign:x.align==="middle"?"center":x.align,font:L.font,whiteSpace:"pre-line",position:"absolute"},this.applyStyles(ne),this.div.appendChild(this.cueDiv);var ce=0;switch(x.positionAlign){case"start":case"line-left":ce=x.position;break;case"center":ce=x.position-x.size/2;break;case"end":case"line-right":ce=x.position-x.size;break}x.vertical===""?this.applyStyles({left:this.formatStyle(ce,"%"),width:this.formatStyle(x.size,"%")}):this.applyStyles({top:this.formatStyle(ce,"%"),height:this.formatStyle(x.size,"%")}),this.move=function(de){this.applyStyles({top:this.formatStyle(de.top,"px"),bottom:this.formatStyle(de.bottom,"px"),left:this.formatStyle(de.left,"px"),right:this.formatStyle(de.right,"px"),height:this.formatStyle(de.height,"px"),width:this.formatStyle(de.width,"px")})}}ke.prototype=A(ae.prototype),ke.prototype.constructor=ke;function xe(T){var x,L,ne,ce;if(T.div){L=T.div.offsetHeight,ne=T.div.offsetWidth,ce=T.div.offsetTop;var de=(de=T.div.childNodes)&&(de=de[0])&&de.getClientRects&&de.getClientRects();T=T.div.getBoundingClientRect(),x=de?Math.max(de[0]&&de[0].height||0,T.height/de.length):0}this.left=T.left,this.right=T.right,this.top=T.top||ce,this.height=T.height||L,this.bottom=T.bottom||ce+(T.height||L),this.width=T.width||ne,this.lineHeight=x!==void 0?x:T.lineHeight}xe.prototype.move=function(T,x){switch(x=x!==void 0?x:this.lineHeight,T){case"+x":this.left+=x,this.right+=x;break;case"-x":this.left-=x,this.right-=x;break;case"+y":this.top+=x,this.bottom+=x;break;case"-y":this.top-=x,this.bottom-=x;break}},xe.prototype.overlaps=function(T){return this.left<T.right&&this.right>T.left&&this.top<T.bottom&&this.bottom>T.top},xe.prototype.overlapsAny=function(T){for(var x=0;x<T.length;x++)if(this.overlaps(T[x]))return!0;return!1},xe.prototype.within=function(T){return this.top>=T.top&&this.bottom<=T.bottom&&this.left>=T.left&&this.right<=T.right},xe.prototype.overlapsOppositeAxis=function(T,x){switch(x){case"+x":return this.left<T.left;case"-x":return this.right>T.right;case"+y":return this.top<T.top;case"-y":return this.bottom>T.bottom}},xe.prototype.intersectPercentage=function(T){var x=Math.max(0,Math.min(this.right,T.right)-Math.max(this.left,T.left)),L=Math.max(0,Math.min(this.bottom,T.bottom)-Math.max(this.top,T.top)),ne=x*L;return ne/(this.height*this.width)},xe.prototype.toCSSCompatValues=function(T){return{top:this.top-T.top,bottom:T.bottom-this.bottom,left:this.left-T.left,right:T.right-this.right,height:this.height,width:this.width}},xe.getSimpleBoxPosition=function(T){var x=T.div?T.div.offsetHeight:T.tagName?T.offsetHeight:0,L=T.div?T.div.offsetWidth:T.tagName?T.offsetWidth:0,ne=T.div?T.div.offsetTop:T.tagName?T.offsetTop:0;T=T.div?T.div.getBoundingClientRect():T.tagName?T.getBoundingClientRect():T;var ce={left:T.left,right:T.right,top:T.top||ne,height:T.height||x,bottom:T.bottom||ne+(T.height||x),width:T.width||L};return ce};function Se(T,x,L,ne){function ce(Be,_t){for(var Dt,pt=new xe(Be),Ct=1,Wt=0;Wt<_t.length;Wt++){for(;Be.overlapsOppositeAxis(L,_t[Wt])||Be.within(L)&&Be.overlapsAny(ne);)Be.move(_t[Wt]);if(Be.within(L))return Be;var gi=Be.intersectPercentage(L);Ct>gi&&(Dt=new xe(Be),Ct=gi),Be=new xe(pt)}return Dt||pt}var de=new xe(x),le=x.cue,me=Xe(le),G=[];if(le.snapToLines){var te;switch(le.vertical){case"":G=["+y","-y"],te="height";break;case"rl":G=["+x","-x"],te="width";break;case"lr":G=["-x","+x"],te="width";break}var ie=de.lineHeight,se=ie*Math.round(me),Te=L[te]+ie,Me=G[0];Math.abs(se)>Te&&(se=se<0?-1:1,se*=Math.ceil(Te/ie)*ie),me<0&&(se+=le.vertical===""?L.height:L.width,G=G.reverse()),de.move(Me,se)}else{var ze=de.lineHeight/L.height*100;switch(le.lineAlign){case"center":me-=ze/2;break;case"end":me-=ze;break}switch(le.vertical){case"":x.applyStyles({top:x.formatStyle(me,"%")});break;case"rl":x.applyStyles({left:x.formatStyle(me,"%")});break;case"lr":x.applyStyles({right:x.formatStyle(me,"%")});break}G=["+y","-x","+x","-y"],de=new xe(x)}var je=ce(de,G);x.move(je.toCSSCompatValues(L))}function ge(){}ge.StringDecoder=function(){return{decode:function(T){if(!T)return"";if(typeof T!="string")throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(T))}}},ge.convertCueToDOMTree=function(T,x){return!T||!x?null:Ve(T,x)};var _e=.05,Ue="sans-serif",De="1.5%";ge.processCues=function(T,x,L){if(!T||!x||!L)return null;for(;L.firstChild;)L.removeChild(L.firstChild);var ne=T.document.createElement("div");ne.style.position="absolute",ne.style.left="0",ne.style.right="0",ne.style.top="0",ne.style.bottom="0",ne.style.margin=De,L.appendChild(ne);function ce(ie){for(var se=0;se<ie.length;se++)if(ie[se].hasBeenReset||!ie[se].displayState)return!0;return!1}if(!ce(x)){for(var de=0;de<x.length;de++)ne.appendChild(x[de].displayState);return}var le=[],me=xe.getSimpleBoxPosition(ne),G=Math.round(me.height*_e*100)/100,te={font:G+"px "+Ue};(function(){for(var ie,se,Te=0;Te<x.length;Te++)se=x[Te],ie=new ke(T,se,te),ne.appendChild(ie.div),Se(T,ie,me,le),se.displayState=ie.div,le.push(xe.getSimpleBoxPosition(ie))})()},ge.Parser=function(T,x,L){L||(L=x,x={}),x||(x={}),this.window=T,this.vttjs=x,this.state="INITIAL",this.buffer="",this.decoder=L||new TextDecoder("utf8"),this.regionList=[]},ge.Parser.prototype={reportOrThrowError:function(T){if(T instanceof M)this.onparsingerror&&this.onparsingerror(T);else throw T},parse:function(T){var x=this;T&&(x.buffer+=x.decoder.decode(T,{stream:!0}));function L(){for(var ie=x.buffer,se=0;se<ie.length&&ie[se]!=="\r"&&ie[se]!==`
`;)++se;var Te=ie.substr(0,se);return ie[se]==="\r"&&++se,ie[se]===`
`&&++se,x.buffer=ie.substr(se),Te}function ne(ie){var se=new $;if(Z(ie,function(Me,ze){switch(Me){case"id":se.set(Me,ze);break;case"width":se.percent(Me,ze);break;case"lines":se.integer(Me,ze);break;case"regionanchor":case"viewportanchor":var je=ze.split(",");if(je.length!==2)break;var Be=new $;if(Be.percent("x",je[0]),Be.percent("y",je[1]),!Be.has("x")||!Be.has("y"))break;se.set(Me+"X",Be.get("x")),se.set(Me+"Y",Be.get("y"));break;case"scroll":se.alt(Me,ze,["up"]);break}},/=/,/\s/),se.has("id")){var Te=new(x.vttjs.VTTRegion||x.window.VTTRegion);Te.width=se.get("width",100),Te.lines=se.get("lines",3),Te.regionAnchorX=se.get("regionanchorX",0),Te.regionAnchorY=se.get("regionanchorY",100),Te.viewportAnchorX=se.get("viewportanchorX",0),Te.viewportAnchorY=se.get("viewportanchorY",100),Te.scroll=se.get("scroll",""),x.onregion&&x.onregion(Te),x.regionList.push({id:se.get("id"),region:Te})}}function ce(ie){var se=new $;Z(ie,function(Te,Me){switch(Te){case"MPEGT":se.integer(Te+"S",Me);break;case"LOCA":se.set(Te+"L",k(Me));break}},/[^\d]:/,/,/),x.ontimestampmap&&x.ontimestampmap({MPEGTS:se.get("MPEGTS"),LOCAL:se.get("LOCAL")})}function de(ie){ie.match(/X-TIMESTAMP-MAP/)?Z(ie,function(se,Te){switch(se){case"X-TIMESTAMP-MAP":ce(Te);break}},/=/):Z(ie,function(se,Te){switch(se){case"Region":ne(Te);break}},/:/)}try{var le;if(x.state==="INITIAL"){if(!/\r\n|\n/.test(x.buffer))return this;le=L();var me=le.match(/^WEBVTT([ \t].*)?$/);if(!me||!me[0])throw new M(M.Errors.BadSignature);x.state="HEADER"}for(var G=!1;x.buffer;){if(!/\r\n|\n/.test(x.buffer))return this;switch(G?G=!1:le=L(),x.state){case"HEADER":/:/.test(le)?de(le):le||(x.state="ID");continue;case"NOTE":le||(x.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(le)){x.state="NOTE";break}if(!le)continue;x.cue=new(x.vttjs.VTTCue||x.window.VTTCue)(0,0,"");try{x.cue.align="center"}catch(ie){x.cue.align="middle"}if(x.state="CUE",le.indexOf("-->")===-1){x.cue.id=le;continue}case"CUE":try{he(le,x.cue,x.regionList)}catch(ie){x.reportOrThrowError(ie),x.cue=null,x.state="BADCUE";continue}x.state="CUETEXT";continue;case"CUETEXT":var te=le.indexOf("-->")!==-1;if(!le||te&&(G=!0)){x.oncue&&x.oncue(x.cue),x.cue=null,x.state="ID";continue}x.cue.text&&(x.cue.text+=`
`),x.cue.text+=le.replace(/\u2028/g,`
`).replace(/u2029/g,`
`);continue;case"BADCUE":le||(x.state="ID");continue}}}catch(ie){x.reportOrThrowError(ie),x.state==="CUETEXT"&&x.cue&&x.oncue&&x.oncue(x.cue),x.cue=null,x.state=x.state==="INITIAL"?"BADWEBVTT":"BADCUE"}return this},flush:function(){var T=this;try{if(T.buffer+=T.decoder.decode(),(T.cue||T.state==="HEADER")&&(T.buffer+=`

`,T.parse()),T.state==="INITIAL")throw new M(M.Errors.BadSignature)}catch(x){T.reportOrThrowError(x)}return T.onflush&&T.onflush(),this}},ye.exports=ge},50184:function(ye){var re="auto",W={"":1,lr:1,rl:1},J={start:1,center:1,end:1,left:1,right:1,auto:1,"line-left":1,"line-right":1};function A($){if(typeof $!="string")return!1;var Z=W[$.toLowerCase()];return Z?$.toLowerCase():!1}function M($){if(typeof $!="string")return!1;var Z=J[$.toLowerCase()];return Z?$.toLowerCase():!1}function k($,Z,he){this.hasBeenReset=!1;var fe="",ue=!1,ee=$,Ce=Z,Pe=he,Ve=null,X="",He=!0,Re="auto",Xe="start",ae="auto",ke="auto",xe=100,Se="center";Object.defineProperties(this,{id:{enumerable:!0,get:function(){return fe},set:function(ge){fe=""+ge}},pauseOnExit:{enumerable:!0,get:function(){return ue},set:function(ge){ue=!!ge}},startTime:{enumerable:!0,get:function(){return ee},set:function(ge){if(typeof ge!="number")throw new TypeError("Start time must be set to a number.");ee=ge,this.hasBeenReset=!0}},endTime:{enumerable:!0,get:function(){return Ce},set:function(ge){if(typeof ge!="number")throw new TypeError("End time must be set to a number.");Ce=ge,this.hasBeenReset=!0}},text:{enumerable:!0,get:function(){return Pe},set:function(ge){Pe=""+ge,this.hasBeenReset=!0}},region:{enumerable:!0,get:function(){return Ve},set:function(ge){Ve=ge,this.hasBeenReset=!0}},vertical:{enumerable:!0,get:function(){return X},set:function(ge){var _e=A(ge);if(_e===!1)throw new SyntaxError("Vertical: an invalid or illegal direction string was specified.");X=_e,this.hasBeenReset=!0}},snapToLines:{enumerable:!0,get:function(){return He},set:function(ge){He=!!ge,this.hasBeenReset=!0}},line:{enumerable:!0,get:function(){return Re},set:function(ge){if(typeof ge!="number"&&ge!==re)throw new SyntaxError("Line: an invalid number or illegal string was specified.");Re=ge,this.hasBeenReset=!0}},lineAlign:{enumerable:!0,get:function(){return Xe},set:function(ge){var _e=M(ge);_e?(Xe=_e,this.hasBeenReset=!0):console.warn("lineAlign: an invalid or illegal string was specified.")}},position:{enumerable:!0,get:function(){return ae},set:function(ge){if(ge<0||ge>100)throw new Error("Position must be between 0 and 100.");ae=ge,this.hasBeenReset=!0}},positionAlign:{enumerable:!0,get:function(){return ke},set:function(ge){var _e=M(ge);_e?(ke=_e,this.hasBeenReset=!0):console.warn("positionAlign: an invalid or illegal string was specified.")}},size:{enumerable:!0,get:function(){return xe},set:function(ge){if(ge<0||ge>100)throw new Error("Size must be between 0 and 100.");xe=ge,this.hasBeenReset=!0}},align:{enumerable:!0,get:function(){return Se},set:function(ge){var _e=M(ge);if(!_e)throw new SyntaxError("align: an invalid or illegal alignment string was specified.");Se=_e,this.hasBeenReset=!0}}}),this.displayState=void 0}k.prototype.getCueAsHTML=function(){return WebVTT.convertCueToDOMTree(window,this.text)},ye.exports=k},35891:function(ye){var re={"":!0,up:!0};function W(M){if(typeof M!="string")return!1;var k=re[M.toLowerCase()];return k?M.toLowerCase():!1}function J(M){return typeof M=="number"&&M>=0&&M<=100}function A(){var M=100,k=3,$=0,Z=100,he=0,fe=100,ue="";Object.defineProperties(this,{width:{enumerable:!0,get:function(){return M},set:function(ee){if(!J(ee))throw new Error("Width must be between 0 and 100.");M=ee}},lines:{enumerable:!0,get:function(){return k},set:function(ee){if(typeof ee!="number")throw new TypeError("Lines must be set to a number.");k=ee}},regionAnchorY:{enumerable:!0,get:function(){return Z},set:function(ee){if(!J(ee))throw new Error("RegionAnchorX must be between 0 and 100.");Z=ee}},regionAnchorX:{enumerable:!0,get:function(){return $},set:function(ee){if(!J(ee))throw new Error("RegionAnchorY must be between 0 and 100.");$=ee}},viewportAnchorY:{enumerable:!0,get:function(){return fe},set:function(ee){if(!J(ee))throw new Error("ViewportAnchorY must be between 0 and 100.");fe=ee}},viewportAnchorX:{enumerable:!0,get:function(){return he},set:function(ee){if(!J(ee))throw new Error("ViewportAnchorX must be between 0 and 100.");he=ee}},scroll:{enumerable:!0,get:function(){return ue},set:function(ee){var Ce=W(ee);Ce===!1?console.warn("Scroll: an invalid or illegal string was specified."):ue=Ce}}})}ye.exports=A},17422:function(ye){"use strict";ye.exports="data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAABTsAAsAAAAAIpAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAAPgAAAFZRiV32Y21hcAAAAYQAAAEJAAAD5p42+VxnbHlmAAACkAAADtIAABckI4l972hlYWQAABFkAAAAKwAAADYsvIjpaGhlYQAAEZAAAAAdAAAAJA+RCL1obXR4AAARsAAAABcAAAC8Q2YAAGxvY2EAABHIAAAAYAAAAGB7CIGGbWF4cAAAEigAAAAfAAAAIAFAAI9uYW1lAAASSAAAASUAAAIK1cf1oHBvc3QAABNwAAABfAAAAnXdFqh1eJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGR7yDiBgZWBgaWQ5RkDA8MvCM0cwxDOeI6BgYmBlZkBKwhIc01hcPjI+FGPHcRdyA4RZgQRADaGCyYAAHic7dPXbcMwAEXRK1vuvffem749XAbKV3bjBA6fXsaIgMMLEWoQJaAEFKNnlELyQ4K27zib5PNF6vl8yld+TKr5kH0+cUw0xv00Hwvx2DResUyFKrV4XoMmLdp06NKjz4AhI8ZMmDJjzoIlK9Zs2LJjz4EjJ85cuHLjziPe/0UWL17mf2tqKLz/9jK9f8tXpGCoRdPKhtS0RqFkWvVQNtSKoVYNtWaoddPXEBqG2jQ9XWgZattQO4baNdSeofYNdWCoQ0MdGerYUCeGOjXUmaHODXVhqEtDXRnq2lA3hro11J2h7g31YKhHQz0Z6tlQL4Z6NdSbod4N9WGoT9MfHF6GmhnZLxyDcRMAAAB4nJ1YC1hU17U+a5/HMA4iA3NmVBDmoQwP5TFnHlFeA4gYiUFRQINoSCBAyK3G2yi+0aipYtFcHYo2xsb4NiY3+VrNxSaX5uvt495ozNdoYoxmem2/L8HGpLc+InB279pnhlGr5mvL4eyz99nrrL32eu1/DQcc/okdYgdHOA6MQKp4r9gx0EcMHMezOalVasW5BM7NcXoSb9fFgE6KtSSBxWz1FYDPG+vMBGcKb9cebu2VS5s2aaTkCvRSf6C7Y+Ppibm5E09v7IDs2/3uZQtbD0zIyppwoHXh/93ukmyYgdePNRp65p5v+3v/9otQl2O7wP34cT88p8Md2YxpYLQZoRcy6FlSBRnwnGAe6BPMSCZo+7NJVqS0cE4uHendzhSnbPH6TDqL1+Nme5LZXkCHnGyoH0kne30WH+gswhm3q+pt/mTas9NLS64GnjmSlTPw0wVQT/ewRaBgxtydy3cuUB9/6SW+vb5yRvr+t0eOfPKJZ/9t3+4tL7xj32Xd3thCxi+ge6ifdsAN+l5+wi5HQ/cCoeull1AszS7CUfEcJzK7sKWJAdJhCd0sPM4+EY7QDm5ov08hXRQXE5bf6PV5Q5+IjW7X7Nku92Ask4l2hCRRD6TPqISiCJeQna3SCFwrhrNzXHzo4yFevBwxpzxk8WCIIfkvVEKVy32SbT8n68gzgaslpaiO2zIGIyuSb7RNf9HSuN26y/7OC1tgEmpiyA6aD4qcgTOiLThwGG0eB694FI8NHLLN6OBlRVaMxNAFS4JdXUG6mW8PwpKuYLCLXKGbu8iwYNdgO06Sn3Th+/vyZAxs8Ro30DjHe9gy8Fywi24OMm7Qyzh3MTZVOMYhLBnoC+J79lpTUyQmorjhnMwlcQ5uPEYGpDjsOkkH49BjQLQBqs3jFtFdJNlksYmoQFDArLh8Xh+Qd6Ghcsb6FUuehDi+U/lqD71K/qiegeV1imcwjl7ExwiSrf4BZyCujV6cVcFo6VX+G9IcPyFjJnUufbU/jzrL1X99as36reXl8K32nFaOr+E8jWJEcJ55DpMVfSMe95/AJaOsGBH2GJCNpiRQbK4C8BjdmQA22QY2j03Em13i2YHqtNLU1NI04Yj2HJgA6fQc6VPNpA/D+Ryks554NnVy2mB72uRUfPLsqR4N0LOBQKArwJYO+5W2fgZX8oC1HR6HjNaQTVIG2FPwnTcXXGZZfNB7TE6pTKZUwaw91XWLAoFFGcnB5PHjsckgBjbWutrL+0h5Y1xw3DRGDumsnXb3MJwXrJIN5U7m0rgJ3yG5w4he5ckFG4pmNEkOm0/xOO4r4yL87wqtQM+hiJIVp+6iG2wPBKD35ElGkDx+UfC2v1mFG1o+M3AjNFty8biKMXwzyxnZLds8wYD2BxmCPHAldPOeLsy/0BugftYhVYFAhO8SqQ0j3oK7dHJZnI/jxmUS4onlxskSF8thmvNZjIrRZwEPxr0lBuLRuz3oy/FOHCsxwOPYh2M+e9u3J5pgPYz9gp6G7C9m0A11F9ddqKMfV+4sbq45/YspOysXvT+3pdFdYNg2fHbW8Dz301MqDVuGrz0Fuh0YMW8mddrpqzST7rV9BcvqPoNvadRndWp0p8HvbiqrFj5yFQ/vNFSXDpxpLEFWp+DcrF3FT1afWshFcmCfeAMjEvO65i0Y6XijQfSRPWx3TV/Df7Km3E1l+kLt56s/rwVzuRusNMhudznkwdLaS+QNdeal2jDPP4l9qHc98vTYZOSkxzD+njBWVWjFPKgipx6DkWvXQiW8OYcewVHE5yukinDMcfGgc0opDltYKDxIGBedkzc6jSfE7tlvESCDFUw0Hx0opS+U0lHCxNottbNWSxX9zZVvEhKWUSyBpaXwBc2a98M6UqPeXAs/GDon8Ax7hsthO8cM5HU7Ad0UvRR9lHmtyQKZ4MAe814X5h9MSUkQmhf96eVJ6p90OjIiqSIjvykvr2l5U55O/fPQKD+jIomYpNyGJQ25uQ2kIikRfAmuBHCPsWqkSDEqgZ5KDI2sifS/R43MbZg0idFHbCPNxXxZws1ACVE6hAhOdJwRkJLFBLPZpRGYJ50pko6XzMkgmSx40ljik6AQcKhFnLcQE6rF7PXFe1Ocoj0T3AXgSgJTDIhHRfHlYZKuSzc6uievOJGXY+i5GJkkTp7UM3y0LqATDbtFcbdBxO7o4T25JYlEjoH0uynUh8rapkxp62QN70svSF+hT4gGPlovlmcm/ComLi7mV4kTykV9NFWjE/QrwgQ4uIcAP0rQF4VZYRP2o3PhHHzfPMJj9Ir+uzKUlrH49ntT18AVvj1sc3YGjUT/Mt2Dxawa8ArcA7bCQIpvfwAYu22vEG/No/5RvPdA7g+AelLrPwzy+LtkLPhnpIxH14m4EYq8eeMHbPEPNm6G7Nv9B4jcFPZ8bJj0SEjP3MPgQdKTqqEoy2v6G32P/Y6dxOv04AxnoAeq+GILvUavtYCBXm+BaIhuodcfrN5B/V2EYMCPh+SxavjGyPwV0x4CJgUPGT0mQaODGBACIJZGsMXwAD0LGXx7l3CdAcKMIKI+f5CepWeD0BvyU/GcdBxPF8SwejC6LGZmAURFdsSWKR5HyHld2kbdIZO1Ixx+bnnzU7n5+blPNV9jnUDWhP2tC68tbN3PVIldsQPxSAcSpjOav7Q05uXn5zW2LLvDXn9B6syscPy9iDLEMmSrJz6nYuWMipukjM0AH8JkGS+XFyMRkzSCH7KD/hwm172SAyZYumHlefr5AddrtA0O0TnwaVZxcRY9Bfukn9Gf05N1r9DV9MoBsJ1f+ZrqUvtPHizJAntWybv7hmqLt6QLuK6ZS9Fqi1jO5rDoWPZXXII5Tgajg53cIXCjDCGIcYrRIY2n6+mXOa/W0bdhau3ryiEYe2FV/5oeaIYK/5w5frCyll6/cYO8DiNhw6t1MBWmznt91QX62UF1N7l0eHBZTRGpKaqpKVIPF9UcIzmReud9TSY75+K899GHbBu6wjoR7RKKZVYiYxSPf5/2wJT5e3NAhmUbVn5KLx1Ujg0+BGvpAIh0DezInTkzF37KVocxrKU3r1+XLtAe2lO3l66kfQfB/unKY+q8N375Ru8bc4pJXfEcESU95q+p8ZNZRTWH1d9FzvUdYXk5rLkcdkEisoKKVHQW/b3GEx6tPaYcoJfOr9wAbSBnv1IHpep0OExr4LPMkpJM+j7sly7UHkOzXjoAZljHCGiyegtNlwljM0v+c19ET9Pvst09a2Mtgcf5/ZSzYO5h1156+eyydfAsxGa9XAuF6vzjh6CssLq6ECysperXX0sX5h5ZdpZe3guxsGIPEtHk/aqXX1hVqP5HYVVVISkrrNqvXorIc+5Ou91Hnr/LcD2afi6eX7UBloOcs7cOpqgGaNfs1g7bNbs9z6wASaylN69d0/TFTIz6Ws8+oGV3mE2612wRTHKcVUbhjKadebloMc+dyXgMVtVK6BwMB/+mVW09igdRBWaRtNQX59d/VD//xdQ0TCiYNj1KT9sq6Wdu5WTbqk3qDXyDaLa1fv621LS01G3z61sD6lH8lAxDLicV921s6Bf92JOYvzNYCL1khbqBXEFUzC521N5NyzNaQIWhjyFyDoBIVrAjmv2UEaLlI+c6zw1jmVIPLLLZZUTj6GxGHW+mq1tgHXR2D85p4Q934+jLbtjVLcyCdS10NVzpHqxp4Q/hK7WopY/NRGx9HGsPGdFjOjcpjBnGYMVqY/4eqT5khWEHWUup2A/pTw7pdWgsWft7ETUERL96nRg0HNFPmCYba6pylECaExX89A9WLUOVB4oKLu/o1oqSYHCgLzBUlAz8hNFDRpeSU1XT+LRmDUgPaKbYdHDn9suF/tu13nHJij0N97LfS0QmqONuyONk7zvUI6Qa0pF9f2+oABL92AT6e0U//z9YqAiWtJLU1JK0gS+1aacwamiNqK067u9ZQ8f1d4qLodMzz3uL89Z68V/Hnr++hXWUuHgw8dfi972PeTyPefu3aNNucemQ74qFuIaJnVkOu4Q+yjuwmmC1FqZpl1i4uzoPxjkpPf3Xv545tl26Rr+dOvUd+omqJzch9dOeU7f10Y64nMcKK137DccIZq2WdXtdZjbEoLSzHwiMtrjYLDxpHQW8gjMX6XFYAE2zSWVD04EGYSs9MbO6sEo20BMEAB4mpvSypsKjZ4Stgzb+c3A9/MQT2+vrBy+qvyFxLUtLlSRF/Ri2wjfZ2dus2Q8lXx4608/jnqK5OOap6NY2PSjYYnECCjiEeLJll/pbmqfeIK+ps3+MxrlEhqmTPipVP7kqlF4VhpEb6r+Q7YOJg38kJ9SHBf3NBl6+9YchfbUjb5ahLSzUM3kPHmwFAsZ5rpai0S7E5xWzZ1j+fW7zsUWP2g5NXTw52ySCTrgG0+lbw60l2Y/CB185CoA8NK+tbRKxfjy6pm5hzQRRR+cMqv1Jbiw6STivtEvt3DRcy0QEh92JlUGo2PG4tSKHl00YD6xc8CK+YPYyy3io2lN8BcSjKRzrIV6ypOAobqxViJPaT9M9Hy5szY33mp7OX/Zu89L/7Ww5vqY2Y8b0pKgoiUhG5cPDPzq8qTV/WkzUOIvXVVA96kmjcBrr3HrYC/Wn+fYP6Z7T1rqy3zknbvqma/FvVk96fNXGkuaXrdHW5JGSxZT/2I/O73v+yNWafMdzc5NdxYurHs6h86e01sLKLz9EBrg+x36rxAaED7hRnAMx7Vzu+9wabh3zG8XLQjx0ablUJzmxdErxYT3kzQSd0SSafVqF5PXgpp0OyYJ1EyNHpGUZmvK575ySzd85JSqF7IBzSAbMM04+MbE58xF3/njXOGecSaermlw2y9PsSQdytLJVr8t+wg+rR8cZYoeNxVIzNdk3Bngi8U5LAlgTFoQnzJCa5EsCgYhCaGL+qPj7TdhG31p9tej3R04N//PXxNwJvyUqwaJqRPJY98TJ5TPndmflRAkAhBfe46sfKW5wizSge08Xb7Ca/GUVs55trngkKkrUS2WPzKttaaqq+idmahugkY+W6fN0I6i3gPt/x88U4wAAeJxjYGRgYADiGU9YXsXz23xl4GZnAIFH7fO+IdMc/WBxDgYmEAUASbMKwAB4nGNgZGBgZwABjj4Ghv//OfoZGBlQgT4ARicDZAAAAHicY2BgYGAfxJijD8Fmu4EqBwCSpgKpAAAAAAAADgBoAH4AzADgAQIBQgFsAZgB7gIuAooC0AL8A2IDjAOoA+AEMASwBNoFCAVaBcAGCAYuBnAGrAb2B04HigfSCCoIcAiGCJwIyAkkCVYJiAmsCfIKIApWCsQLknicY2BkYGDQZ2hmYGcAASYg5gJCBob/YD4DABqrAdAAeJxdkE1qg0AYhl8Tk9AIoVDaVSmzahcF87PMARLIMoFAl0ZHY1BHdBJIT9AT9AQ9RQ9Qeqy+yteNMzDzfM+88w0K4BY/cNAMB6N2bUaPPBLukybCLvleeAAPj8JD+hfhMV7hC3u4wxs7OO4NzQSZcI/8Ltwnfwi75E/hAR7wJTyk/xYeY49fYQ/PztM+jbTZ7LY6OWdBJdX/pqs6NYWa+zMxa13oKrA6Uoerqi/JwtpYxZXJ1coUVmeZUWVlTjq0/tHacjmdxuL90OR8O0UEDYMNdtiSEpz5XQGqzlm30kzUdAYFFOb8R7NOZk0q2lwAyz1i7oAr1xoXvrOgtYhZx8wY5KRV269JZ5yGpmzPTjQhvY9je6vEElPOuJP3mWKnP5M3V+YAAAB4nG2ReVPbMBDF/ULi2EkDBFqO3gdHLxUzDB9IkdexBllydRD49ihO3Ckz7B/a31utZnafkkGyiXnyclxhgB0MMUKKMTLkmGCKV5hhF3vYxxwHOMRrvMERjnGCU7zFO7zHB3zEJ3zGF3zFN5zhHBe4xHf8wE/8wm8w/MEVimTYKv44XR9MSCsUjVoeHE3vjQoNsSZ4mmxZmVWPjSz7jlou6/0qKOWEJdKMtCe793/hQfqxa6XWZHMXFl56RS4TvPXSaDeoy0zUUZB109KstDK8lHo5q6Qi1hcOnqkImubPS6aqRq7mlnaEWabub4iYblba3SRmgldS0+FWdhNtt04F14JUaqkl7tcpOpJtErvNt3Bd9HRT5JWxK25Ldjvp6br4hzfFiIdSmlzTg2fSUzNrLd1LE1ynxq4OVaVoKLjzJ60UPtj1RKzHzsbjly6inVnFBS2MucviPncU7Rr7lfTxRepDs1A2j3ZHRc7PuzFYSfE3ZOd4kjwBy227hA=="},80542:function(){},43693:function(ye,re,W){var J=W(77736);function A(M,k,$){return(k=J(k))in M?Object.defineProperty(M,k,{value:$,enumerable:!0,configurable:!0,writable:!0}):M[k]=$,M}ye.exports=A,ye.exports.__esModule=!0,ye.exports.default=ye.exports},94634:function(ye){function re(){return ye.exports=re=Object.assign?Object.assign.bind():function(W){for(var J=1;J<arguments.length;J++){var A=arguments[J];for(var M in A)({}).hasOwnProperty.call(A,M)&&(W[M]=A[M])}return W},ye.exports.__esModule=!0,ye.exports.default=ye.exports,re.apply(null,arguments)}ye.exports=re,ye.exports.__esModule=!0,ye.exports.default=ye.exports},89045:function(ye,re,W){var J=W(73738).default;function A(M,k){if(J(M)!="object"||!M)return M;var $=M[Symbol.toPrimitive];if($!==void 0){var Z=$.call(M,k||"default");if(J(Z)!="object")return Z;throw new TypeError("@@toPrimitive must return a primitive value.")}return(k==="string"?String:Number)(M)}ye.exports=A,ye.exports.__esModule=!0,ye.exports.default=ye.exports},77736:function(ye,re,W){var J=W(73738).default,A=W(89045);function M(k){var $=A(k,"string");return J($)=="symbol"?$:$+""}ye.exports=M,ye.exports.__esModule=!0,ye.exports.default=ye.exports}}]);

//# sourceMappingURL=9676.55de29afa067e6b9c596.js.map