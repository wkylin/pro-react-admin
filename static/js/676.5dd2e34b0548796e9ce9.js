(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[676],{7495:function(xe,ee,z){"use strict";var Y=z(9840),A=function(J,U){return U===void 0&&(U=!1),function(de,he,fe){if(de){J(de);return}if(he.statusCode>=400&&he.statusCode<=599){var se=fe;if(U)if(Y.TextDecoder){var Pe=G(he.headers&&he.headers["content-type"]);try{se=new TextDecoder(Pe).decode(fe)}catch(Q){}}else se=String.fromCharCode.apply(null,new Uint8Array(fe));J({cause:se});return}J(null,fe)}};function G(O){return O===void 0&&(O=""),O.toLowerCase().split(";").reduce(function(J,U){var de=U.split("="),he=de[0],fe=de[1];return he.trim()==="charset"?fe.trim():J},"utf-8")}xe.exports=A},1036:function(xe,ee,z){"use strict";var Y=z(9840),A=z(4634),G=z(4675);he.httpHandler=z(7495);/**
 * @license
 * slighly modified parse-headers 2.0.2 <https://github.com/kesla/parse-headers/>
 * Copyright (c) 2014 David Björklund
 * Available under the MIT license
 * <https://github.com/kesla/parse-headers/blob/master/LICENCE>
 */var O=function(_e){var be={};return _e&&_e.trim().split(`
`).forEach(function(We){var vt=We.indexOf(":"),et=We.slice(0,vt).trim().toLowerCase(),ne=We.slice(vt+1).trim();typeof be[et]=="undefined"?be[et]=ne:Array.isArray(be[et])?be[et].push(ne):be[et]=[be[et],ne]}),be};xe.exports=he,xe.exports.default=he,he.XMLHttpRequest=Y.XMLHttpRequest||Pe,he.XDomainRequest="withCredentials"in new he.XMLHttpRequest?he.XMLHttpRequest:Y.XDomainRequest,J(["get","put","post","patch","head","delete"],function(Q){he[Q==="delete"?"del":Q]=function(_e,be,We){return be=de(_e,be,We),be.method=Q.toUpperCase(),fe(be)}});function J(Q,_e){for(var be=0;be<Q.length;be++)_e(Q[be])}function U(Q){for(var _e in Q)if(Q.hasOwnProperty(_e))return!1;return!0}function de(Q,_e,be){var We=Q;return G(_e)?(be=_e,typeof Q=="string"&&(We={uri:Q})):We=A({},_e,{uri:Q}),We.callback=be,We}function he(Q,_e,be){return _e=de(Q,_e,be),fe(_e)}function fe(Q){if(typeof Q.callback=="undefined")throw new Error("callback argument missing");var _e=!1,be=function(oe,ue,me){_e||(_e=!0,Q.callback(oe,ue,me))};function We(){ge.readyState===4&&setTimeout(ne,0)}function vt(){var K=void 0;if(ge.response?K=ge.response:K=ge.responseText||se(ge),x)try{K=JSON.parse(K)}catch(oe){}return K}function et(K){return clearTimeout(N),K instanceof Error||(K=new Error(""+(K||"Unknown XMLHttpRequest Error"))),K.statusCode=0,be(K,te)}function ne(){if(!Oe){var K;clearTimeout(N),Q.useXDR&&ge.status===void 0?K=200:K=ge.status===1223?204:ge.status;var oe=te,ue=null;return K!==0?(oe={body:vt(),statusCode:K,method:Ue,headers:{},url:ve,rawRequest:ge},ge.getAllResponseHeaders&&(oe.headers=O(ge.getAllResponseHeaders()))):ue=new Error("Internal XMLHttpRequest Error"),be(ue,oe,oe.body)}}var ge=Q.xhr||null;ge||(Q.cors||Q.useXDR?ge=new he.XDomainRequest:ge=new he.XMLHttpRequest);var Ce,Oe,ve=ge.url=Q.uri||Q.url,Ue=ge.method=Q.method||"GET",Ne=Q.body||Q.data,we=ge.headers=Q.headers||{},T=!!Q.sync,x=!1,N,te={body:void 0,headers:{},statusCode:0,method:Ue,url:ve,rawRequest:ge};if("json"in Q&&Q.json!==!1&&(x=!0,we.accept||we.Accept||(we.Accept="application/json"),Ue!=="GET"&&Ue!=="HEAD"&&(we["content-type"]||we["Content-Type"]||(we["Content-Type"]="application/json"),Ne=JSON.stringify(Q.json===!0?Ne:Q.json))),ge.onreadystatechange=We,ge.onload=ne,ge.onerror=et,ge.onprogress=function(){},ge.onabort=function(){Oe=!0},ge.ontimeout=et,ge.open(Ue,ve,!T,Q.username,Q.password),T||(ge.withCredentials=!!Q.withCredentials),!T&&Q.timeout>0&&(N=setTimeout(function(){if(!Oe){Oe=!0,ge.abort("timeout");var K=new Error("XMLHttpRequest timeout");K.code="ETIMEDOUT",et(K)}},Q.timeout)),ge.setRequestHeader)for(Ce in we)we.hasOwnProperty(Ce)&&ge.setRequestHeader(Ce,we[Ce]);else if(Q.headers&&!U(Q.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in Q&&(ge.responseType=Q.responseType),"beforeSend"in Q&&typeof Q.beforeSend=="function"&&Q.beforeSend(ge),ge.send(Ne||null),ge}function se(Q){try{if(Q.responseType==="document")return Q.responseXML;var _e=Q.responseXML&&Q.responseXML.documentElement.nodeName==="parsererror";if(Q.responseType===""&&!_e)return Q.responseXML}catch(be){}return null}function Pe(){}},4582:function(xe,ee){"use strict";function z(J,U,de){if(de===void 0&&(de=Array.prototype),J&&typeof de.find=="function")return de.find.call(J,U);for(var he=0;he<J.length;he++)if(Object.prototype.hasOwnProperty.call(J,he)){var fe=J[he];if(U.call(void 0,fe,he,J))return fe}}function Y(J,U){return U===void 0&&(U=Object),U&&typeof U.freeze=="function"?U.freeze(J):J}function A(J,U){if(J===null||typeof J!="object")throw new TypeError("target is not an object");for(var de in U)Object.prototype.hasOwnProperty.call(U,de)&&(J[de]=U[de]);return J}var G=Y({HTML:"text/html",isHTML:function(J){return J===G.HTML},XML_APPLICATION:"application/xml",XML_TEXT:"text/xml",XML_XHTML_APPLICATION:"application/xhtml+xml",XML_SVG_IMAGE:"image/svg+xml"}),O=Y({HTML:"http://www.w3.org/1999/xhtml",isHTML:function(J){return J===O.HTML},SVG:"http://www.w3.org/2000/svg",XML:"http://www.w3.org/XML/1998/namespace",XMLNS:"http://www.w3.org/2000/xmlns/"});ee.assign=A,ee.find=z,ee.freeze=Y,ee.MIME_TYPE=G,ee.NAMESPACE=O},5752:function(xe,ee,z){var Y,A=z(4582),G=z(4722),O=z(6559),J=z(2085),U=G.DOMImplementation,de=A.NAMESPACE,he=J.ParseError,fe=J.XMLReader;function se(ne){return ne.replace(/\r[\n\u0085]/g,`
`).replace(/[\r\u0085\u2028]/g,`
`)}function Pe(ne){this.options=ne||{locator:{}}}Pe.prototype.parseFromString=function(ne,ge){var Ce=this.options,Oe=new fe,ve=Ce.domBuilder||new _e,Ue=Ce.errorHandler,Ne=Ce.locator,we=Ce.xmlns||{},T=/\/x?html?$/.test(ge),x=T?O.HTML_ENTITIES:O.XML_ENTITIES;Ne&&ve.setDocumentLocator(Ne),Oe.errorHandler=Q(Ue,ve,Ne),Oe.domBuilder=Ce.domBuilder||ve,T&&(we[""]=de.HTML),we.xml=we.xml||de.XML;var N=Ce.normalizeLineEndings||se;return ne&&typeof ne=="string"?Oe.parse(N(ne),we,x):Oe.errorHandler.error("invalid doc source"),ve.doc};function Q(ne,ge,Ce){if(!ne){if(ge instanceof _e)return ge;ne=ge}var Oe={},ve=ne instanceof Function;Ce=Ce||{};function Ue(Ne){var we=ne[Ne];!we&&ve&&(we=ne.length==2?function(T){ne(Ne,T)}:ne),Oe[Ne]=we&&function(T){we("[xmldom "+Ne+"]	"+T+We(Ce))}||function(){}}return Ue("warning"),Ue("error"),Ue("fatalError"),Oe}function _e(){this.cdata=!1}function be(ne,ge){ge.lineNumber=ne.lineNumber,ge.columnNumber=ne.columnNumber}_e.prototype={startDocument:function(){this.doc=new U().createDocument(null,null,null),this.locator&&(this.doc.documentURI=this.locator.systemId)},startElement:function(ne,ge,Ce,Oe){var ve=this.doc,Ue=ve.createElementNS(ne,Ce||ge),Ne=Oe.length;et(this,Ue),this.currentElement=Ue,this.locator&&be(this.locator,Ue);for(var we=0;we<Ne;we++){var ne=Oe.getURI(we),T=Oe.getValue(we),Ce=Oe.getQName(we),x=ve.createAttributeNS(ne,Ce);this.locator&&be(Oe.getLocator(we),x),x.value=x.nodeValue=T,Ue.setAttributeNode(x)}},endElement:function(ne,ge,Ce){var Oe=this.currentElement,ve=Oe.tagName;this.currentElement=Oe.parentNode},startPrefixMapping:function(ne,ge){},endPrefixMapping:function(ne){},processingInstruction:function(ne,ge){var Ce=this.doc.createProcessingInstruction(ne,ge);this.locator&&be(this.locator,Ce),et(this,Ce)},ignorableWhitespace:function(ne,ge,Ce){},characters:function(ne,ge,Ce){if(ne=vt.apply(this,arguments),ne){if(this.cdata)var Oe=this.doc.createCDATASection(ne);else var Oe=this.doc.createTextNode(ne);this.currentElement?this.currentElement.appendChild(Oe):/^\s*$/.test(ne)&&this.doc.appendChild(Oe),this.locator&&be(this.locator,Oe)}},skippedEntity:function(ne){},endDocument:function(){this.doc.normalize()},setDocumentLocator:function(ne){(this.locator=ne)&&(ne.lineNumber=0)},comment:function(ne,ge,Ce){ne=vt.apply(this,arguments);var Oe=this.doc.createComment(ne);this.locator&&be(this.locator,Oe),et(this,Oe)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(ne,ge,Ce){var Oe=this.doc.implementation;if(Oe&&Oe.createDocumentType){var ve=Oe.createDocumentType(ne,ge,Ce);this.locator&&be(this.locator,ve),et(this,ve),this.doc.doctype=ve}},warning:function(ne){console.warn("[xmldom warning]	"+ne,We(this.locator))},error:function(ne){console.error("[xmldom error]	"+ne,We(this.locator))},fatalError:function(ne){throw new he(ne,this.locator)}};function We(ne){if(ne)return`
@`+(ne.systemId||"")+"#[line:"+ne.lineNumber+",col:"+ne.columnNumber+"]"}function vt(ne,ge,Ce){return typeof ne=="string"?ne.substr(ge,Ce):ne.length>=ge+Ce||ge?new java.lang.String(ne,ge,Ce)+"":ne}"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(ne){_e.prototype[ne]=function(){return null}});function et(ne,ge){ne.currentElement?ne.currentElement.appendChild(ge):ne.doc.appendChild(ge)}Y=_e,Y=se,ee.DOMParser=Pe},4722:function(xe,ee,z){var Y=z(4582),A=Y.find,G=Y.NAMESPACE;function O(v){return v!==""}function J(v){return v?v.split(/[\t\n\f\r ]+/).filter(O):[]}function U(v,y){return v.hasOwnProperty(y)||(v[y]=!0),v}function de(v){if(!v)return[];var y=J(v);return Object.keys(y.reduce(U,{}))}function he(v){return function(y){return v&&v.indexOf(y)!==-1}}function fe(v,y){for(var B in v)Object.prototype.hasOwnProperty.call(v,B)&&(y[B]=v[B])}function se(v,y){var B=v.prototype;if(!(B instanceof y)){let le=function(){};var F=le;le.prototype=y.prototype,le=new le,fe(B,le),v.prototype=B=le}B.constructor!=v&&(typeof v!="function"&&console.error("unknown Class:"+v),B.constructor=v)}var Pe={},Q=Pe.ELEMENT_NODE=1,_e=Pe.ATTRIBUTE_NODE=2,be=Pe.TEXT_NODE=3,We=Pe.CDATA_SECTION_NODE=4,vt=Pe.ENTITY_REFERENCE_NODE=5,et=Pe.ENTITY_NODE=6,ne=Pe.PROCESSING_INSTRUCTION_NODE=7,ge=Pe.COMMENT_NODE=8,Ce=Pe.DOCUMENT_NODE=9,Oe=Pe.DOCUMENT_TYPE_NODE=10,ve=Pe.DOCUMENT_FRAGMENT_NODE=11,Ue=Pe.NOTATION_NODE=12,Ne={},we={},T=Ne.INDEX_SIZE_ERR=(we[1]="Index size error",1),x=Ne.DOMSTRING_SIZE_ERR=(we[2]="DOMString size error",2),N=Ne.HIERARCHY_REQUEST_ERR=(we[3]="Hierarchy request error",3),te=Ne.WRONG_DOCUMENT_ERR=(we[4]="Wrong document",4),K=Ne.INVALID_CHARACTER_ERR=(we[5]="Invalid character",5),oe=Ne.NO_DATA_ALLOWED_ERR=(we[6]="No data allowed",6),ue=Ne.NO_MODIFICATION_ALLOWED_ERR=(we[7]="No modification allowed",7),me=Ne.NOT_FOUND_ERR=(we[8]="Not found",8),ie=Ne.NOT_SUPPORTED_ERR=(we[9]="Not supported",9),re=Ne.INUSE_ATTRIBUTE_ERR=(we[10]="Attribute in use",10),Z=Ne.INVALID_STATE_ERR=(we[11]="Invalid state",11),ae=Ne.SYNTAX_ERR=(we[12]="Syntax error",12),Te=Ne.INVALID_MODIFICATION_ERR=(we[13]="Invalid modification",13),Ie=Ne.NAMESPACE_ERR=(we[14]="Invalid namespace",14),qe=Ne.INVALID_ACCESS_ERR=(we[15]="Invalid access",15);function Se(v,y){if(y instanceof Error)var B=y;else B=this,Error.call(this,we[v]),this.message=we[v],Error.captureStackTrace&&Error.captureStackTrace(this,Se);return B.code=v,y&&(this.message=this.message+": "+y),B}Se.prototype=Error.prototype,fe(Ne,Se);function je(){}je.prototype={length:0,item:function(v){return v>=0&&v<this.length?this[v]:null},toString:function(v,y){for(var B=[],F=0;F<this.length;F++)Vi(this[F],B,v,y);return B.join("")},filter:function(v){return Array.prototype.filter.call(this,v)},indexOf:function(v){return Array.prototype.indexOf.call(this,v)}};function _t(v,y){this._node=v,this._refresh=y,bt(this)}function bt(v){var y=v._node._inc||v._node.ownerDocument._inc;if(v._inc!==y){var B=v._refresh(v._node);if(qi(v,"length",B.length),!v.$$length||B.length<v.$$length)for(var F=B.length;F in v;F++)Object.prototype.hasOwnProperty.call(v,F)&&delete v[F];fe(B,v),v._inc=y}}_t.prototype.item=function(v){return bt(this),this[v]||null},se(_t,je);function nt(){}function Tt(v,y){for(var B=v.length;B--;)if(v[B]===y)return B}function Ut(v,y,B,F){if(F?y[Tt(y,F)]=B:y[y.length++]=B,v){B.ownerElement=v;var le=v.ownerDocument;le&&(F&&Ji(le,v,F),Tn(le,v,B))}}function fi(v,y,B){var F=Tt(y,B);if(F>=0){for(var le=y.length-1;F<le;)y[F]=y[++F];if(y.length=le,v){var ke=v.ownerDocument;ke&&(Ji(ke,v,B),B.ownerElement=null)}}else throw new Se(me,new Error(v.tagName+"@"+B))}nt.prototype={length:0,item:je.prototype.item,getNamedItem:function(v){for(var y=this.length;y--;){var B=this[y];if(B.nodeName==v)return B}},setNamedItem:function(v){var y=v.ownerElement;if(y&&y!=this._ownerElement)throw new Se(re);var B=this.getNamedItem(v.nodeName);return Ut(this._ownerElement,this,v,B),B},setNamedItemNS:function(v){var y=v.ownerElement,B;if(y&&y!=this._ownerElement)throw new Se(re);return B=this.getNamedItemNS(v.namespaceURI,v.localName),Ut(this._ownerElement,this,v,B),B},removeNamedItem:function(v){var y=this.getNamedItem(v);return fi(this._ownerElement,this,y),y},removeNamedItemNS:function(v,y){var B=this.getNamedItemNS(v,y);return fi(this._ownerElement,this,B),B},getNamedItemNS:function(v,y){for(var B=this.length;B--;){var F=this[B];if(F.localName==y&&F.namespaceURI==v)return F}return null}};function En(){}En.prototype={hasFeature:function(v,y){return!0},createDocument:function(v,y,B){var F=new ut;if(F.implementation=this,F.childNodes=new je,F.doctype=B||null,B&&F.appendChild(B),y){var le=F.createElementNS(v,y);F.appendChild(le)}return F},createDocumentType:function(v,y,B){var F=new Sn;return F.name=v,F.nodeName=v,F.publicId=y||"",F.systemId=B||"",F}};function ze(){}ze.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,attributes:null,parentNode:null,childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,insertBefore:function(v,y){return Cn(this,v,y)},replaceChild:function(v,y){Cn(this,v,y,Hs),y&&this.removeChild(y)},removeChild:function(v){return Zi(this,v)},appendChild:function(v){return this.insertBefore(v,null)},hasChildNodes:function(){return this.firstChild!=null},cloneNode:function(v){return mi(this.ownerDocument||this,this,v)},normalize:function(){for(var v=this.firstChild;v;){var y=v.nextSibling;y&&y.nodeType==be&&v.nodeType==be?(this.removeChild(y),v.appendData(y.data)):(v.normalize(),v=y)}},isSupported:function(v,y){return this.ownerDocument.implementation.hasFeature(v,y)},hasAttributes:function(){return this.attributes.length>0},lookupPrefix:function(v){for(var y=this;y;){var B=y._nsMap;if(B){for(var F in B)if(Object.prototype.hasOwnProperty.call(B,F)&&B[F]===v)return F}y=y.nodeType==_e?y.ownerDocument:y.parentNode}return null},lookupNamespaceURI:function(v){for(var y=this;y;){var B=y._nsMap;if(B&&Object.prototype.hasOwnProperty.call(B,v))return B[v];y=y.nodeType==_e?y.ownerDocument:y.parentNode}return null},isDefaultNamespace:function(v){var y=this.lookupPrefix(v);return y==null}};function Ct(v){return v=="<"&&"&lt;"||v==">"&&"&gt;"||v=="&"&&"&amp;"||v=='"'&&"&quot;"||"&#"+v.charCodeAt()+";"}fe(Pe,ze),fe(Pe,ze.prototype);function ai(v,y){if(y(v))return!0;if(v=v.firstChild)do if(ai(v,y))return!0;while(v=v.nextSibling)}function ut(){this.ownerDocument=this}function Tn(v,y,B){v&&v._inc++;var F=B.namespaceURI;F===G.XMLNS&&(y._nsMap[B.prefix?B.localName:""]=B.value)}function Ji(v,y,B,F){v&&v._inc++;var le=B.namespaceURI;le===G.XMLNS&&delete y._nsMap[B.prefix?B.localName:""]}function pi(v,y,B){if(v&&v._inc){v._inc++;var F=y.childNodes;if(B)F[F.length++]=B;else{for(var le=y.firstChild,ke=0;le;)F[ke++]=le,le=le.nextSibling;F.length=ke,delete F[F.length]}}}function Zi(v,y){var B=y.previousSibling,F=y.nextSibling;return B?B.nextSibling=F:v.firstChild=F,F?F.previousSibling=B:v.lastChild=B,y.parentNode=null,y.previousSibling=null,y.nextSibling=null,pi(v.ownerDocument,v),y}function pe(v){return v&&(v.nodeType===ze.DOCUMENT_NODE||v.nodeType===ze.DOCUMENT_FRAGMENT_NODE||v.nodeType===ze.ELEMENT_NODE)}function It(v){return v&&(Ke(v)||en(v)||Qt(v)||v.nodeType===ze.DOCUMENT_FRAGMENT_NODE||v.nodeType===ze.COMMENT_NODE||v.nodeType===ze.PROCESSING_INSTRUCTION_NODE)}function Qt(v){return v&&v.nodeType===ze.DOCUMENT_TYPE_NODE}function Ke(v){return v&&v.nodeType===ze.ELEMENT_NODE}function en(v){return v&&v.nodeType===ze.TEXT_NODE}function rs(v,y){var B=v.childNodes||[];if(A(B,Ke)||Qt(y))return!1;var F=A(B,Qt);return!(y&&F&&B.indexOf(F)>B.indexOf(y))}function pa(v,y){var B=v.childNodes||[];function F(ke){return Ke(ke)&&ke!==y}if(A(B,F))return!1;var le=A(B,Qt);return!(y&&le&&B.indexOf(le)>B.indexOf(y))}function pl(v,y,B){if(!pe(v))throw new Se(N,"Unexpected parent node type "+v.nodeType);if(B&&B.parentNode!==v)throw new Se(me,"child not in parent");if(!It(y)||Qt(y)&&v.nodeType!==ze.DOCUMENT_NODE)throw new Se(N,"Unexpected node type "+y.nodeType+" for parent node type "+v.nodeType)}function ma(v,y,B){var F=v.childNodes||[],le=y.childNodes||[];if(y.nodeType===ze.DOCUMENT_FRAGMENT_NODE){var ke=le.filter(Ke);if(ke.length>1||A(le,en))throw new Se(N,"More than one element or text in fragment");if(ke.length===1&&!rs(v,B))throw new Se(N,"Element in fragment can not be inserted before doctype")}if(Ke(y)&&!rs(v,B))throw new Se(N,"Only one element can be added and only after doctype");if(Qt(y)){if(A(F,Qt))throw new Se(N,"Only one doctype is allowed");var Qe=A(F,Ke);if(B&&F.indexOf(Qe)<F.indexOf(B))throw new Se(N,"Doctype can only be inserted before an element");if(!B&&Qe)throw new Se(N,"Doctype can not be appended since element is present")}}function Hs(v,y,B){var F=v.childNodes||[],le=y.childNodes||[];if(y.nodeType===ze.DOCUMENT_FRAGMENT_NODE){var ke=le.filter(Ke);if(ke.length>1||A(le,en))throw new Se(N,"More than one element or text in fragment");if(ke.length===1&&!pa(v,B))throw new Se(N,"Element in fragment can not be inserted before doctype")}if(Ke(y)&&!pa(v,B))throw new Se(N,"Only one element can be added and only after doctype");if(Qt(y)){let Jt=function(Gt){return Qt(Gt)&&Gt!==B};var Bt=Jt;if(A(F,Jt))throw new Se(N,"Only one doctype is allowed");var Qe=A(F,Ke);if(B&&F.indexOf(Qe)<F.indexOf(B))throw new Se(N,"Doctype can only be inserted before an element")}}function Cn(v,y,B,F){pl(v,y,B),v.nodeType===ze.DOCUMENT_NODE&&(F||ma)(v,y,B);var le=y.parentNode;if(le&&le.removeChild(y),y.nodeType===ve){var ke=y.firstChild;if(ke==null)return y;var Qe=y.lastChild}else ke=Qe=y;var Bt=B?B.previousSibling:v.lastChild;ke.previousSibling=Bt,Qe.nextSibling=B,Bt?Bt.nextSibling=ke:v.firstChild=ke,B==null?v.lastChild=Qe:B.previousSibling=Qe;do ke.parentNode=v;while(ke!==Qe&&(ke=ke.nextSibling));return pi(v.ownerDocument||v,v),y.nodeType==ve&&(y.firstChild=y.lastChild=null),y}function Ws(v,y){return y.parentNode&&y.parentNode.removeChild(y),y.parentNode=v,y.previousSibling=v.lastChild,y.nextSibling=null,y.previousSibling?y.previousSibling.nextSibling=y:v.firstChild=y,v.lastChild=y,pi(v.ownerDocument,v,y),y}ut.prototype={nodeName:"#document",nodeType:Ce,doctype:null,documentElement:null,_inc:1,insertBefore:function(v,y){if(v.nodeType==ve){for(var B=v.firstChild;B;){var F=B.nextSibling;this.insertBefore(B,y),B=F}return v}return Cn(this,v,y),v.ownerDocument=this,this.documentElement===null&&v.nodeType===Q&&(this.documentElement=v),v},removeChild:function(v){return this.documentElement==v&&(this.documentElement=null),Zi(this,v)},replaceChild:function(v,y){Cn(this,v,y,Hs),v.ownerDocument=this,y&&this.removeChild(y),Ke(v)&&(this.documentElement=v)},importNode:function(v,y){return Qs(this,v,y)},getElementById:function(v){var y=null;return ai(this.documentElement,function(B){if(B.nodeType==Q&&B.getAttribute("id")==v)return y=B,!0}),y},getElementsByClassName:function(v){var y=de(v);return new _t(this,function(B){var F=[];return y.length>0&&ai(B.documentElement,function(le){if(le!==B&&le.nodeType===Q){var ke=le.getAttribute("class");if(ke){var Qe=v===ke;if(!Qe){var Bt=de(ke);Qe=y.every(he(Bt))}Qe&&F.push(le)}}}),F})},createElement:function(v){var y=new Bi;y.ownerDocument=this,y.nodeName=v,y.tagName=v,y.localName=v,y.childNodes=new je;var B=y.attributes=new nt;return B._ownerElement=y,y},createDocumentFragment:function(){var v=new tn;return v.ownerDocument=this,v.childNodes=new je,v},createTextNode:function(v){var y=new Gs;return y.ownerDocument=this,y.appendData(v),y},createComment:function(v){var y=new as;return y.ownerDocument=this,y.appendData(v),y},createCDATASection:function(v){var y=new os;return y.ownerDocument=this,y.appendData(v),y},createProcessingInstruction:function(v,y){var B=new ft;return B.ownerDocument=this,B.tagName=B.nodeName=B.target=v,B.nodeValue=B.data=y,B},createAttribute:function(v){var y=new $e;return y.ownerDocument=this,y.name=v,y.nodeName=v,y.localName=v,y.specified=!0,y},createEntityReference:function(v){var y=new Ys;return y.ownerDocument=this,y.nodeName=v,y},createElementNS:function(v,y){var B=new Bi,F=y.split(":"),le=B.attributes=new nt;return B.childNodes=new je,B.ownerDocument=this,B.nodeName=y,B.tagName=y,B.namespaceURI=v,F.length==2?(B.prefix=F[0],B.localName=F[1]):B.localName=y,le._ownerElement=B,B},createAttributeNS:function(v,y){var B=new $e,F=y.split(":");return B.ownerDocument=this,B.nodeName=y,B.name=y,B.namespaceURI=v,B.specified=!0,F.length==2?(B.prefix=F[0],B.localName=F[1]):B.localName=y,B}},se(ut,ze);function Bi(){this._nsMap={}}Bi.prototype={nodeType:Q,hasAttribute:function(v){return this.getAttributeNode(v)!=null},getAttribute:function(v){var y=this.getAttributeNode(v);return y&&y.value||""},getAttributeNode:function(v){return this.attributes.getNamedItem(v)},setAttribute:function(v,y){var B=this.ownerDocument.createAttribute(v);B.value=B.nodeValue=""+y,this.setAttributeNode(B)},removeAttribute:function(v){var y=this.getAttributeNode(v);y&&this.removeAttributeNode(y)},appendChild:function(v){return v.nodeType===ve?this.insertBefore(v,null):Ws(this,v)},setAttributeNode:function(v){return this.attributes.setNamedItem(v)},setAttributeNodeNS:function(v){return this.attributes.setNamedItemNS(v)},removeAttributeNode:function(v){return this.attributes.removeNamedItem(v.nodeName)},removeAttributeNS:function(v,y){var B=this.getAttributeNodeNS(v,y);B&&this.removeAttributeNode(B)},hasAttributeNS:function(v,y){return this.getAttributeNodeNS(v,y)!=null},getAttributeNS:function(v,y){var B=this.getAttributeNodeNS(v,y);return B&&B.value||""},setAttributeNS:function(v,y,B){var F=this.ownerDocument.createAttributeNS(v,y);F.value=F.nodeValue=""+B,this.setAttributeNode(F)},getAttributeNodeNS:function(v,y){return this.attributes.getNamedItemNS(v,y)},getElementsByTagName:function(v){return new _t(this,function(y){var B=[];return ai(y,function(F){F!==y&&F.nodeType==Q&&(v==="*"||F.tagName==v)&&B.push(F)}),B})},getElementsByTagNameNS:function(v,y){return new _t(this,function(B){var F=[];return ai(B,function(le){le!==B&&le.nodeType===Q&&(v==="*"||le.namespaceURI===v)&&(y==="*"||le.localName==y)&&F.push(le)}),F})}},ut.prototype.getElementsByTagName=Bi.prototype.getElementsByTagName,ut.prototype.getElementsByTagNameNS=Bi.prototype.getElementsByTagNameNS,se(Bi,ze);function $e(){}$e.prototype.nodeType=_e,se($e,ze);function xn(){}xn.prototype={data:"",substringData:function(v,y){return this.data.substring(v,v+y)},appendData:function(v){v=this.data+v,this.nodeValue=this.data=v,this.length=v.length},insertData:function(v,y){this.replaceData(v,0,y)},appendChild:function(v){throw new Error(we[N])},deleteData:function(v,y){this.replaceData(v,y,"")},replaceData:function(v,y,B){var F=this.data.substring(0,v),le=this.data.substring(v+y);B=F+B+le,this.nodeValue=this.data=B,this.length=B.length}},se(xn,ze);function Gs(){}Gs.prototype={nodeName:"#text",nodeType:be,splitText:function(v){var y=this.data,B=y.substring(v);y=y.substring(0,v),this.data=this.nodeValue=y,this.length=y.length;var F=this.ownerDocument.createTextNode(B);return this.parentNode&&this.parentNode.insertBefore(F,this.nextSibling),F}},se(Gs,xn);function as(){}as.prototype={nodeName:"#comment",nodeType:ge},se(as,xn);function os(){}os.prototype={nodeName:"#cdata-section",nodeType:We},se(os,xn);function Sn(){}Sn.prototype.nodeType=Oe,se(Sn,ze);function $s(){}$s.prototype.nodeType=Ue,se($s,ze);function Xs(){}Xs.prototype.nodeType=et,se(Xs,ze);function Ys(){}Ys.prototype.nodeType=vt,se(Ys,ze);function tn(){}tn.prototype.nodeName="#document-fragment",tn.prototype.nodeType=ve,se(tn,ze);function ft(){}ft.prototype.nodeType=ne,se(ft,ze);function ls(){}ls.prototype.serializeToString=function(v,y,B){return Ks.call(v,y,B)},ze.prototype.toString=Ks;function Ks(v,y){var B=[],F=this.nodeType==9&&this.documentElement||this,le=F.prefix,ke=F.namespaceURI;if(ke&&le==null){var le=F.lookupPrefix(ke);if(le==null)var Qe=[{namespace:ke,prefix:null}]}return Vi(this,B,v,y,Qe),B.join("")}function wi(v,y,B){var F=v.prefix||"",le=v.namespaceURI;if(!le||F==="xml"&&le===G.XML||le===G.XMLNS)return!1;for(var ke=B.length;ke--;){var Qe=B[ke];if(Qe.prefix===F)return Qe.namespace!==le}return!0}function jn(v,y,B){v.push(" ",y,'="',B.replace(/[<>&"\t\n\r]/g,Ct),'"')}function Vi(v,y,B,F,le){if(le||(le=[]),F)if(v=F(v),v){if(typeof v=="string"){y.push(v);return}}else return;switch(v.nodeType){case Q:var ke=v.attributes,Qe=ke.length,St=v.firstChild,Bt=v.tagName;B=G.isHTML(v.namespaceURI)||B;var Jt=Bt;if(!B&&!v.prefix&&v.namespaceURI){for(var Gt,Zt=0;Zt<ke.length;Zt++)if(ke.item(Zt).name==="xmlns"){Gt=ke.item(Zt).value;break}if(!Gt)for(var gi=le.length-1;gi>=0;gi--){var Di=le[gi];if(Di.prefix===""&&Di.namespace===v.namespaceURI){Gt=Di.namespace;break}}if(Gt!==v.namespaceURI)for(var gi=le.length-1;gi>=0;gi--){var Di=le[gi];if(Di.namespace===v.namespaceURI){Di.prefix&&(Jt=Di.prefix+":"+Bt);break}}}y.push("<",Jt);for(var ki=0;ki<Qe;ki++){var Pt=ke.item(ki);Pt.prefix=="xmlns"?le.push({prefix:Pt.localName,namespace:Pt.value}):Pt.nodeName=="xmlns"&&le.push({prefix:"",namespace:Pt.value})}for(var ki=0;ki<Qe;ki++){var Pt=ke.item(ki);if(wi(Pt,B,le)){var oi=Pt.prefix||"",Ii=Pt.namespaceURI;jn(y,oi?"xmlns:"+oi:"xmlns",Ii),le.push({prefix:oi,namespace:Ii})}Vi(Pt,y,B,F,le)}if(Bt===Jt&&wi(v,B,le)){var oi=v.prefix||"",Ii=v.namespaceURI;jn(y,oi?"xmlns:"+oi:"xmlns",Ii),le.push({prefix:oi,namespace:Ii})}if(St||B&&!/^(?:meta|link|img|br|hr|input)$/i.test(Bt)){if(y.push(">"),B&&/^script$/i.test(Bt))for(;St;)St.data?y.push(St.data):Vi(St,y,B,F,le.slice()),St=St.nextSibling;else for(;St;)Vi(St,y,B,F,le.slice()),St=St.nextSibling;y.push("</",Jt,">")}else y.push("/>");return;case Ce:case ve:for(var St=v.firstChild;St;)Vi(St,y,B,F,le.slice()),St=St.nextSibling;return;case _e:return jn(y,v.name,v.value);case be:return y.push(v.data.replace(/[<&>]/g,Ct));case We:return y.push("<![CDATA[",v.data,"]]>");case ge:return y.push("<!--",v.data,"-->");case Oe:var Js=v.publicId,zi=v.systemId;if(y.push("<!DOCTYPE ",v.name),Js)y.push(" PUBLIC ",Js),zi&&zi!="."&&y.push(" ",zi),y.push(">");else if(zi&&zi!=".")y.push(" SYSTEM ",zi,">");else{var Zs=v.internalSubset;Zs&&y.push(" [",Zs,"]"),y.push(">")}return;case ne:return y.push("<?",v.target," ",v.data,"?>");case vt:return y.push("&",v.nodeName,";");default:y.push("??",v.nodeName)}}function Qs(v,y,B){var F;switch(y.nodeType){case Q:F=y.cloneNode(!1),F.ownerDocument=v;case ve:break;case _e:B=!0;break}if(F||(F=y.cloneNode(!1)),F.ownerDocument=v,F.parentNode=null,B)for(var le=y.firstChild;le;)F.appendChild(Qs(v,le,B)),le=le.nextSibling;return F}function mi(v,y,B){var F=new y.constructor;for(var le in y)if(Object.prototype.hasOwnProperty.call(y,le)){var ke=y[le];typeof ke!="object"&&ke!=F[le]&&(F[le]=ke)}switch(y.childNodes&&(F.childNodes=new je),F.ownerDocument=v,F.nodeType){case Q:var Qe=y.attributes,Bt=F.attributes=new nt,Jt=Qe.length;Bt._ownerElement=F;for(var Gt=0;Gt<Jt;Gt++)F.setAttributeNode(mi(v,Qe.item(Gt),!0));break;case _e:B=!0}if(B)for(var Zt=y.firstChild;Zt;)F.appendChild(mi(v,Zt,B)),Zt=Zt.nextSibling;return F}function qi(v,y,B){v[y]=B}try{if(Object.defineProperty){let v=function(y){switch(y.nodeType){case Q:case ve:var B=[];for(y=y.firstChild;y;)y.nodeType!==7&&y.nodeType!==8&&B.push(v(y)),y=y.nextSibling;return B.join("");default:return y.nodeValue}};var ml=v;Object.defineProperty(_t.prototype,"length",{get:function(){return bt(this),this.$$length}}),Object.defineProperty(ze.prototype,"textContent",{get:function(){return v(this)},set:function(y){switch(this.nodeType){case Q:case ve:for(;this.firstChild;)this.removeChild(this.firstChild);(y||String(y))&&this.appendChild(this.ownerDocument.createTextNode(y));break;default:this.data=y,this.value=y,this.nodeValue=y}}}),qi=function(y,B,F){y["$$"+B]=F}}}catch(v){}ee.DocumentType=Sn,ee.DOMException=Se,ee.DOMImplementation=En,ee.Element=Bi,ee.Node=ze,ee.NodeList=je,ee.XMLSerializer=ls},6559:function(xe,ee,z){"use strict";var Y=z(4582).freeze;ee.XML_ENTITIES=Y({amp:"&",apos:"'",gt:">",lt:"<",quot:'"'}),ee.HTML_ENTITIES=Y({Aacute:"\xC1",aacute:"\xE1",Abreve:"\u0102",abreve:"\u0103",ac:"\u223E",acd:"\u223F",acE:"\u223E\u0333",Acirc:"\xC2",acirc:"\xE2",acute:"\xB4",Acy:"\u0410",acy:"\u0430",AElig:"\xC6",aelig:"\xE6",af:"\u2061",Afr:"\u{1D504}",afr:"\u{1D51E}",Agrave:"\xC0",agrave:"\xE0",alefsym:"\u2135",aleph:"\u2135",Alpha:"\u0391",alpha:"\u03B1",Amacr:"\u0100",amacr:"\u0101",amalg:"\u2A3F",AMP:"&",amp:"&",And:"\u2A53",and:"\u2227",andand:"\u2A55",andd:"\u2A5C",andslope:"\u2A58",andv:"\u2A5A",ang:"\u2220",ange:"\u29A4",angle:"\u2220",angmsd:"\u2221",angmsdaa:"\u29A8",angmsdab:"\u29A9",angmsdac:"\u29AA",angmsdad:"\u29AB",angmsdae:"\u29AC",angmsdaf:"\u29AD",angmsdag:"\u29AE",angmsdah:"\u29AF",angrt:"\u221F",angrtvb:"\u22BE",angrtvbd:"\u299D",angsph:"\u2222",angst:"\xC5",angzarr:"\u237C",Aogon:"\u0104",aogon:"\u0105",Aopf:"\u{1D538}",aopf:"\u{1D552}",ap:"\u2248",apacir:"\u2A6F",apE:"\u2A70",ape:"\u224A",apid:"\u224B",apos:"'",ApplyFunction:"\u2061",approx:"\u2248",approxeq:"\u224A",Aring:"\xC5",aring:"\xE5",Ascr:"\u{1D49C}",ascr:"\u{1D4B6}",Assign:"\u2254",ast:"*",asymp:"\u2248",asympeq:"\u224D",Atilde:"\xC3",atilde:"\xE3",Auml:"\xC4",auml:"\xE4",awconint:"\u2233",awint:"\u2A11",backcong:"\u224C",backepsilon:"\u03F6",backprime:"\u2035",backsim:"\u223D",backsimeq:"\u22CD",Backslash:"\u2216",Barv:"\u2AE7",barvee:"\u22BD",Barwed:"\u2306",barwed:"\u2305",barwedge:"\u2305",bbrk:"\u23B5",bbrktbrk:"\u23B6",bcong:"\u224C",Bcy:"\u0411",bcy:"\u0431",bdquo:"\u201E",becaus:"\u2235",Because:"\u2235",because:"\u2235",bemptyv:"\u29B0",bepsi:"\u03F6",bernou:"\u212C",Bernoullis:"\u212C",Beta:"\u0392",beta:"\u03B2",beth:"\u2136",between:"\u226C",Bfr:"\u{1D505}",bfr:"\u{1D51F}",bigcap:"\u22C2",bigcirc:"\u25EF",bigcup:"\u22C3",bigodot:"\u2A00",bigoplus:"\u2A01",bigotimes:"\u2A02",bigsqcup:"\u2A06",bigstar:"\u2605",bigtriangledown:"\u25BD",bigtriangleup:"\u25B3",biguplus:"\u2A04",bigvee:"\u22C1",bigwedge:"\u22C0",bkarow:"\u290D",blacklozenge:"\u29EB",blacksquare:"\u25AA",blacktriangle:"\u25B4",blacktriangledown:"\u25BE",blacktriangleleft:"\u25C2",blacktriangleright:"\u25B8",blank:"\u2423",blk12:"\u2592",blk14:"\u2591",blk34:"\u2593",block:"\u2588",bne:"=\u20E5",bnequiv:"\u2261\u20E5",bNot:"\u2AED",bnot:"\u2310",Bopf:"\u{1D539}",bopf:"\u{1D553}",bot:"\u22A5",bottom:"\u22A5",bowtie:"\u22C8",boxbox:"\u29C9",boxDL:"\u2557",boxDl:"\u2556",boxdL:"\u2555",boxdl:"\u2510",boxDR:"\u2554",boxDr:"\u2553",boxdR:"\u2552",boxdr:"\u250C",boxH:"\u2550",boxh:"\u2500",boxHD:"\u2566",boxHd:"\u2564",boxhD:"\u2565",boxhd:"\u252C",boxHU:"\u2569",boxHu:"\u2567",boxhU:"\u2568",boxhu:"\u2534",boxminus:"\u229F",boxplus:"\u229E",boxtimes:"\u22A0",boxUL:"\u255D",boxUl:"\u255C",boxuL:"\u255B",boxul:"\u2518",boxUR:"\u255A",boxUr:"\u2559",boxuR:"\u2558",boxur:"\u2514",boxV:"\u2551",boxv:"\u2502",boxVH:"\u256C",boxVh:"\u256B",boxvH:"\u256A",boxvh:"\u253C",boxVL:"\u2563",boxVl:"\u2562",boxvL:"\u2561",boxvl:"\u2524",boxVR:"\u2560",boxVr:"\u255F",boxvR:"\u255E",boxvr:"\u251C",bprime:"\u2035",Breve:"\u02D8",breve:"\u02D8",brvbar:"\xA6",Bscr:"\u212C",bscr:"\u{1D4B7}",bsemi:"\u204F",bsim:"\u223D",bsime:"\u22CD",bsol:"\\",bsolb:"\u29C5",bsolhsub:"\u27C8",bull:"\u2022",bullet:"\u2022",bump:"\u224E",bumpE:"\u2AAE",bumpe:"\u224F",Bumpeq:"\u224E",bumpeq:"\u224F",Cacute:"\u0106",cacute:"\u0107",Cap:"\u22D2",cap:"\u2229",capand:"\u2A44",capbrcup:"\u2A49",capcap:"\u2A4B",capcup:"\u2A47",capdot:"\u2A40",CapitalDifferentialD:"\u2145",caps:"\u2229\uFE00",caret:"\u2041",caron:"\u02C7",Cayleys:"\u212D",ccaps:"\u2A4D",Ccaron:"\u010C",ccaron:"\u010D",Ccedil:"\xC7",ccedil:"\xE7",Ccirc:"\u0108",ccirc:"\u0109",Cconint:"\u2230",ccups:"\u2A4C",ccupssm:"\u2A50",Cdot:"\u010A",cdot:"\u010B",cedil:"\xB8",Cedilla:"\xB8",cemptyv:"\u29B2",cent:"\xA2",CenterDot:"\xB7",centerdot:"\xB7",Cfr:"\u212D",cfr:"\u{1D520}",CHcy:"\u0427",chcy:"\u0447",check:"\u2713",checkmark:"\u2713",Chi:"\u03A7",chi:"\u03C7",cir:"\u25CB",circ:"\u02C6",circeq:"\u2257",circlearrowleft:"\u21BA",circlearrowright:"\u21BB",circledast:"\u229B",circledcirc:"\u229A",circleddash:"\u229D",CircleDot:"\u2299",circledR:"\xAE",circledS:"\u24C8",CircleMinus:"\u2296",CirclePlus:"\u2295",CircleTimes:"\u2297",cirE:"\u29C3",cire:"\u2257",cirfnint:"\u2A10",cirmid:"\u2AEF",cirscir:"\u29C2",ClockwiseContourIntegral:"\u2232",CloseCurlyDoubleQuote:"\u201D",CloseCurlyQuote:"\u2019",clubs:"\u2663",clubsuit:"\u2663",Colon:"\u2237",colon:":",Colone:"\u2A74",colone:"\u2254",coloneq:"\u2254",comma:",",commat:"@",comp:"\u2201",compfn:"\u2218",complement:"\u2201",complexes:"\u2102",cong:"\u2245",congdot:"\u2A6D",Congruent:"\u2261",Conint:"\u222F",conint:"\u222E",ContourIntegral:"\u222E",Copf:"\u2102",copf:"\u{1D554}",coprod:"\u2210",Coproduct:"\u2210",COPY:"\xA9",copy:"\xA9",copysr:"\u2117",CounterClockwiseContourIntegral:"\u2233",crarr:"\u21B5",Cross:"\u2A2F",cross:"\u2717",Cscr:"\u{1D49E}",cscr:"\u{1D4B8}",csub:"\u2ACF",csube:"\u2AD1",csup:"\u2AD0",csupe:"\u2AD2",ctdot:"\u22EF",cudarrl:"\u2938",cudarrr:"\u2935",cuepr:"\u22DE",cuesc:"\u22DF",cularr:"\u21B6",cularrp:"\u293D",Cup:"\u22D3",cup:"\u222A",cupbrcap:"\u2A48",CupCap:"\u224D",cupcap:"\u2A46",cupcup:"\u2A4A",cupdot:"\u228D",cupor:"\u2A45",cups:"\u222A\uFE00",curarr:"\u21B7",curarrm:"\u293C",curlyeqprec:"\u22DE",curlyeqsucc:"\u22DF",curlyvee:"\u22CE",curlywedge:"\u22CF",curren:"\xA4",curvearrowleft:"\u21B6",curvearrowright:"\u21B7",cuvee:"\u22CE",cuwed:"\u22CF",cwconint:"\u2232",cwint:"\u2231",cylcty:"\u232D",Dagger:"\u2021",dagger:"\u2020",daleth:"\u2138",Darr:"\u21A1",dArr:"\u21D3",darr:"\u2193",dash:"\u2010",Dashv:"\u2AE4",dashv:"\u22A3",dbkarow:"\u290F",dblac:"\u02DD",Dcaron:"\u010E",dcaron:"\u010F",Dcy:"\u0414",dcy:"\u0434",DD:"\u2145",dd:"\u2146",ddagger:"\u2021",ddarr:"\u21CA",DDotrahd:"\u2911",ddotseq:"\u2A77",deg:"\xB0",Del:"\u2207",Delta:"\u0394",delta:"\u03B4",demptyv:"\u29B1",dfisht:"\u297F",Dfr:"\u{1D507}",dfr:"\u{1D521}",dHar:"\u2965",dharl:"\u21C3",dharr:"\u21C2",DiacriticalAcute:"\xB4",DiacriticalDot:"\u02D9",DiacriticalDoubleAcute:"\u02DD",DiacriticalGrave:"`",DiacriticalTilde:"\u02DC",diam:"\u22C4",Diamond:"\u22C4",diamond:"\u22C4",diamondsuit:"\u2666",diams:"\u2666",die:"\xA8",DifferentialD:"\u2146",digamma:"\u03DD",disin:"\u22F2",div:"\xF7",divide:"\xF7",divideontimes:"\u22C7",divonx:"\u22C7",DJcy:"\u0402",djcy:"\u0452",dlcorn:"\u231E",dlcrop:"\u230D",dollar:"$",Dopf:"\u{1D53B}",dopf:"\u{1D555}",Dot:"\xA8",dot:"\u02D9",DotDot:"\u20DC",doteq:"\u2250",doteqdot:"\u2251",DotEqual:"\u2250",dotminus:"\u2238",dotplus:"\u2214",dotsquare:"\u22A1",doublebarwedge:"\u2306",DoubleContourIntegral:"\u222F",DoubleDot:"\xA8",DoubleDownArrow:"\u21D3",DoubleLeftArrow:"\u21D0",DoubleLeftRightArrow:"\u21D4",DoubleLeftTee:"\u2AE4",DoubleLongLeftArrow:"\u27F8",DoubleLongLeftRightArrow:"\u27FA",DoubleLongRightArrow:"\u27F9",DoubleRightArrow:"\u21D2",DoubleRightTee:"\u22A8",DoubleUpArrow:"\u21D1",DoubleUpDownArrow:"\u21D5",DoubleVerticalBar:"\u2225",DownArrow:"\u2193",Downarrow:"\u21D3",downarrow:"\u2193",DownArrowBar:"\u2913",DownArrowUpArrow:"\u21F5",DownBreve:"\u0311",downdownarrows:"\u21CA",downharpoonleft:"\u21C3",downharpoonright:"\u21C2",DownLeftRightVector:"\u2950",DownLeftTeeVector:"\u295E",DownLeftVector:"\u21BD",DownLeftVectorBar:"\u2956",DownRightTeeVector:"\u295F",DownRightVector:"\u21C1",DownRightVectorBar:"\u2957",DownTee:"\u22A4",DownTeeArrow:"\u21A7",drbkarow:"\u2910",drcorn:"\u231F",drcrop:"\u230C",Dscr:"\u{1D49F}",dscr:"\u{1D4B9}",DScy:"\u0405",dscy:"\u0455",dsol:"\u29F6",Dstrok:"\u0110",dstrok:"\u0111",dtdot:"\u22F1",dtri:"\u25BF",dtrif:"\u25BE",duarr:"\u21F5",duhar:"\u296F",dwangle:"\u29A6",DZcy:"\u040F",dzcy:"\u045F",dzigrarr:"\u27FF",Eacute:"\xC9",eacute:"\xE9",easter:"\u2A6E",Ecaron:"\u011A",ecaron:"\u011B",ecir:"\u2256",Ecirc:"\xCA",ecirc:"\xEA",ecolon:"\u2255",Ecy:"\u042D",ecy:"\u044D",eDDot:"\u2A77",Edot:"\u0116",eDot:"\u2251",edot:"\u0117",ee:"\u2147",efDot:"\u2252",Efr:"\u{1D508}",efr:"\u{1D522}",eg:"\u2A9A",Egrave:"\xC8",egrave:"\xE8",egs:"\u2A96",egsdot:"\u2A98",el:"\u2A99",Element:"\u2208",elinters:"\u23E7",ell:"\u2113",els:"\u2A95",elsdot:"\u2A97",Emacr:"\u0112",emacr:"\u0113",empty:"\u2205",emptyset:"\u2205",EmptySmallSquare:"\u25FB",emptyv:"\u2205",EmptyVerySmallSquare:"\u25AB",emsp:"\u2003",emsp13:"\u2004",emsp14:"\u2005",ENG:"\u014A",eng:"\u014B",ensp:"\u2002",Eogon:"\u0118",eogon:"\u0119",Eopf:"\u{1D53C}",eopf:"\u{1D556}",epar:"\u22D5",eparsl:"\u29E3",eplus:"\u2A71",epsi:"\u03B5",Epsilon:"\u0395",epsilon:"\u03B5",epsiv:"\u03F5",eqcirc:"\u2256",eqcolon:"\u2255",eqsim:"\u2242",eqslantgtr:"\u2A96",eqslantless:"\u2A95",Equal:"\u2A75",equals:"=",EqualTilde:"\u2242",equest:"\u225F",Equilibrium:"\u21CC",equiv:"\u2261",equivDD:"\u2A78",eqvparsl:"\u29E5",erarr:"\u2971",erDot:"\u2253",Escr:"\u2130",escr:"\u212F",esdot:"\u2250",Esim:"\u2A73",esim:"\u2242",Eta:"\u0397",eta:"\u03B7",ETH:"\xD0",eth:"\xF0",Euml:"\xCB",euml:"\xEB",euro:"\u20AC",excl:"!",exist:"\u2203",Exists:"\u2203",expectation:"\u2130",ExponentialE:"\u2147",exponentiale:"\u2147",fallingdotseq:"\u2252",Fcy:"\u0424",fcy:"\u0444",female:"\u2640",ffilig:"\uFB03",fflig:"\uFB00",ffllig:"\uFB04",Ffr:"\u{1D509}",ffr:"\u{1D523}",filig:"\uFB01",FilledSmallSquare:"\u25FC",FilledVerySmallSquare:"\u25AA",fjlig:"fj",flat:"\u266D",fllig:"\uFB02",fltns:"\u25B1",fnof:"\u0192",Fopf:"\u{1D53D}",fopf:"\u{1D557}",ForAll:"\u2200",forall:"\u2200",fork:"\u22D4",forkv:"\u2AD9",Fouriertrf:"\u2131",fpartint:"\u2A0D",frac12:"\xBD",frac13:"\u2153",frac14:"\xBC",frac15:"\u2155",frac16:"\u2159",frac18:"\u215B",frac23:"\u2154",frac25:"\u2156",frac34:"\xBE",frac35:"\u2157",frac38:"\u215C",frac45:"\u2158",frac56:"\u215A",frac58:"\u215D",frac78:"\u215E",frasl:"\u2044",frown:"\u2322",Fscr:"\u2131",fscr:"\u{1D4BB}",gacute:"\u01F5",Gamma:"\u0393",gamma:"\u03B3",Gammad:"\u03DC",gammad:"\u03DD",gap:"\u2A86",Gbreve:"\u011E",gbreve:"\u011F",Gcedil:"\u0122",Gcirc:"\u011C",gcirc:"\u011D",Gcy:"\u0413",gcy:"\u0433",Gdot:"\u0120",gdot:"\u0121",gE:"\u2267",ge:"\u2265",gEl:"\u2A8C",gel:"\u22DB",geq:"\u2265",geqq:"\u2267",geqslant:"\u2A7E",ges:"\u2A7E",gescc:"\u2AA9",gesdot:"\u2A80",gesdoto:"\u2A82",gesdotol:"\u2A84",gesl:"\u22DB\uFE00",gesles:"\u2A94",Gfr:"\u{1D50A}",gfr:"\u{1D524}",Gg:"\u22D9",gg:"\u226B",ggg:"\u22D9",gimel:"\u2137",GJcy:"\u0403",gjcy:"\u0453",gl:"\u2277",gla:"\u2AA5",glE:"\u2A92",glj:"\u2AA4",gnap:"\u2A8A",gnapprox:"\u2A8A",gnE:"\u2269",gne:"\u2A88",gneq:"\u2A88",gneqq:"\u2269",gnsim:"\u22E7",Gopf:"\u{1D53E}",gopf:"\u{1D558}",grave:"`",GreaterEqual:"\u2265",GreaterEqualLess:"\u22DB",GreaterFullEqual:"\u2267",GreaterGreater:"\u2AA2",GreaterLess:"\u2277",GreaterSlantEqual:"\u2A7E",GreaterTilde:"\u2273",Gscr:"\u{1D4A2}",gscr:"\u210A",gsim:"\u2273",gsime:"\u2A8E",gsiml:"\u2A90",Gt:"\u226B",GT:">",gt:">",gtcc:"\u2AA7",gtcir:"\u2A7A",gtdot:"\u22D7",gtlPar:"\u2995",gtquest:"\u2A7C",gtrapprox:"\u2A86",gtrarr:"\u2978",gtrdot:"\u22D7",gtreqless:"\u22DB",gtreqqless:"\u2A8C",gtrless:"\u2277",gtrsim:"\u2273",gvertneqq:"\u2269\uFE00",gvnE:"\u2269\uFE00",Hacek:"\u02C7",hairsp:"\u200A",half:"\xBD",hamilt:"\u210B",HARDcy:"\u042A",hardcy:"\u044A",hArr:"\u21D4",harr:"\u2194",harrcir:"\u2948",harrw:"\u21AD",Hat:"^",hbar:"\u210F",Hcirc:"\u0124",hcirc:"\u0125",hearts:"\u2665",heartsuit:"\u2665",hellip:"\u2026",hercon:"\u22B9",Hfr:"\u210C",hfr:"\u{1D525}",HilbertSpace:"\u210B",hksearow:"\u2925",hkswarow:"\u2926",hoarr:"\u21FF",homtht:"\u223B",hookleftarrow:"\u21A9",hookrightarrow:"\u21AA",Hopf:"\u210D",hopf:"\u{1D559}",horbar:"\u2015",HorizontalLine:"\u2500",Hscr:"\u210B",hscr:"\u{1D4BD}",hslash:"\u210F",Hstrok:"\u0126",hstrok:"\u0127",HumpDownHump:"\u224E",HumpEqual:"\u224F",hybull:"\u2043",hyphen:"\u2010",Iacute:"\xCD",iacute:"\xED",ic:"\u2063",Icirc:"\xCE",icirc:"\xEE",Icy:"\u0418",icy:"\u0438",Idot:"\u0130",IEcy:"\u0415",iecy:"\u0435",iexcl:"\xA1",iff:"\u21D4",Ifr:"\u2111",ifr:"\u{1D526}",Igrave:"\xCC",igrave:"\xEC",ii:"\u2148",iiiint:"\u2A0C",iiint:"\u222D",iinfin:"\u29DC",iiota:"\u2129",IJlig:"\u0132",ijlig:"\u0133",Im:"\u2111",Imacr:"\u012A",imacr:"\u012B",image:"\u2111",ImaginaryI:"\u2148",imagline:"\u2110",imagpart:"\u2111",imath:"\u0131",imof:"\u22B7",imped:"\u01B5",Implies:"\u21D2",in:"\u2208",incare:"\u2105",infin:"\u221E",infintie:"\u29DD",inodot:"\u0131",Int:"\u222C",int:"\u222B",intcal:"\u22BA",integers:"\u2124",Integral:"\u222B",intercal:"\u22BA",Intersection:"\u22C2",intlarhk:"\u2A17",intprod:"\u2A3C",InvisibleComma:"\u2063",InvisibleTimes:"\u2062",IOcy:"\u0401",iocy:"\u0451",Iogon:"\u012E",iogon:"\u012F",Iopf:"\u{1D540}",iopf:"\u{1D55A}",Iota:"\u0399",iota:"\u03B9",iprod:"\u2A3C",iquest:"\xBF",Iscr:"\u2110",iscr:"\u{1D4BE}",isin:"\u2208",isindot:"\u22F5",isinE:"\u22F9",isins:"\u22F4",isinsv:"\u22F3",isinv:"\u2208",it:"\u2062",Itilde:"\u0128",itilde:"\u0129",Iukcy:"\u0406",iukcy:"\u0456",Iuml:"\xCF",iuml:"\xEF",Jcirc:"\u0134",jcirc:"\u0135",Jcy:"\u0419",jcy:"\u0439",Jfr:"\u{1D50D}",jfr:"\u{1D527}",jmath:"\u0237",Jopf:"\u{1D541}",jopf:"\u{1D55B}",Jscr:"\u{1D4A5}",jscr:"\u{1D4BF}",Jsercy:"\u0408",jsercy:"\u0458",Jukcy:"\u0404",jukcy:"\u0454",Kappa:"\u039A",kappa:"\u03BA",kappav:"\u03F0",Kcedil:"\u0136",kcedil:"\u0137",Kcy:"\u041A",kcy:"\u043A",Kfr:"\u{1D50E}",kfr:"\u{1D528}",kgreen:"\u0138",KHcy:"\u0425",khcy:"\u0445",KJcy:"\u040C",kjcy:"\u045C",Kopf:"\u{1D542}",kopf:"\u{1D55C}",Kscr:"\u{1D4A6}",kscr:"\u{1D4C0}",lAarr:"\u21DA",Lacute:"\u0139",lacute:"\u013A",laemptyv:"\u29B4",lagran:"\u2112",Lambda:"\u039B",lambda:"\u03BB",Lang:"\u27EA",lang:"\u27E8",langd:"\u2991",langle:"\u27E8",lap:"\u2A85",Laplacetrf:"\u2112",laquo:"\xAB",Larr:"\u219E",lArr:"\u21D0",larr:"\u2190",larrb:"\u21E4",larrbfs:"\u291F",larrfs:"\u291D",larrhk:"\u21A9",larrlp:"\u21AB",larrpl:"\u2939",larrsim:"\u2973",larrtl:"\u21A2",lat:"\u2AAB",lAtail:"\u291B",latail:"\u2919",late:"\u2AAD",lates:"\u2AAD\uFE00",lBarr:"\u290E",lbarr:"\u290C",lbbrk:"\u2772",lbrace:"{",lbrack:"[",lbrke:"\u298B",lbrksld:"\u298F",lbrkslu:"\u298D",Lcaron:"\u013D",lcaron:"\u013E",Lcedil:"\u013B",lcedil:"\u013C",lceil:"\u2308",lcub:"{",Lcy:"\u041B",lcy:"\u043B",ldca:"\u2936",ldquo:"\u201C",ldquor:"\u201E",ldrdhar:"\u2967",ldrushar:"\u294B",ldsh:"\u21B2",lE:"\u2266",le:"\u2264",LeftAngleBracket:"\u27E8",LeftArrow:"\u2190",Leftarrow:"\u21D0",leftarrow:"\u2190",LeftArrowBar:"\u21E4",LeftArrowRightArrow:"\u21C6",leftarrowtail:"\u21A2",LeftCeiling:"\u2308",LeftDoubleBracket:"\u27E6",LeftDownTeeVector:"\u2961",LeftDownVector:"\u21C3",LeftDownVectorBar:"\u2959",LeftFloor:"\u230A",leftharpoondown:"\u21BD",leftharpoonup:"\u21BC",leftleftarrows:"\u21C7",LeftRightArrow:"\u2194",Leftrightarrow:"\u21D4",leftrightarrow:"\u2194",leftrightarrows:"\u21C6",leftrightharpoons:"\u21CB",leftrightsquigarrow:"\u21AD",LeftRightVector:"\u294E",LeftTee:"\u22A3",LeftTeeArrow:"\u21A4",LeftTeeVector:"\u295A",leftthreetimes:"\u22CB",LeftTriangle:"\u22B2",LeftTriangleBar:"\u29CF",LeftTriangleEqual:"\u22B4",LeftUpDownVector:"\u2951",LeftUpTeeVector:"\u2960",LeftUpVector:"\u21BF",LeftUpVectorBar:"\u2958",LeftVector:"\u21BC",LeftVectorBar:"\u2952",lEg:"\u2A8B",leg:"\u22DA",leq:"\u2264",leqq:"\u2266",leqslant:"\u2A7D",les:"\u2A7D",lescc:"\u2AA8",lesdot:"\u2A7F",lesdoto:"\u2A81",lesdotor:"\u2A83",lesg:"\u22DA\uFE00",lesges:"\u2A93",lessapprox:"\u2A85",lessdot:"\u22D6",lesseqgtr:"\u22DA",lesseqqgtr:"\u2A8B",LessEqualGreater:"\u22DA",LessFullEqual:"\u2266",LessGreater:"\u2276",lessgtr:"\u2276",LessLess:"\u2AA1",lesssim:"\u2272",LessSlantEqual:"\u2A7D",LessTilde:"\u2272",lfisht:"\u297C",lfloor:"\u230A",Lfr:"\u{1D50F}",lfr:"\u{1D529}",lg:"\u2276",lgE:"\u2A91",lHar:"\u2962",lhard:"\u21BD",lharu:"\u21BC",lharul:"\u296A",lhblk:"\u2584",LJcy:"\u0409",ljcy:"\u0459",Ll:"\u22D8",ll:"\u226A",llarr:"\u21C7",llcorner:"\u231E",Lleftarrow:"\u21DA",llhard:"\u296B",lltri:"\u25FA",Lmidot:"\u013F",lmidot:"\u0140",lmoust:"\u23B0",lmoustache:"\u23B0",lnap:"\u2A89",lnapprox:"\u2A89",lnE:"\u2268",lne:"\u2A87",lneq:"\u2A87",lneqq:"\u2268",lnsim:"\u22E6",loang:"\u27EC",loarr:"\u21FD",lobrk:"\u27E6",LongLeftArrow:"\u27F5",Longleftarrow:"\u27F8",longleftarrow:"\u27F5",LongLeftRightArrow:"\u27F7",Longleftrightarrow:"\u27FA",longleftrightarrow:"\u27F7",longmapsto:"\u27FC",LongRightArrow:"\u27F6",Longrightarrow:"\u27F9",longrightarrow:"\u27F6",looparrowleft:"\u21AB",looparrowright:"\u21AC",lopar:"\u2985",Lopf:"\u{1D543}",lopf:"\u{1D55D}",loplus:"\u2A2D",lotimes:"\u2A34",lowast:"\u2217",lowbar:"_",LowerLeftArrow:"\u2199",LowerRightArrow:"\u2198",loz:"\u25CA",lozenge:"\u25CA",lozf:"\u29EB",lpar:"(",lparlt:"\u2993",lrarr:"\u21C6",lrcorner:"\u231F",lrhar:"\u21CB",lrhard:"\u296D",lrm:"\u200E",lrtri:"\u22BF",lsaquo:"\u2039",Lscr:"\u2112",lscr:"\u{1D4C1}",Lsh:"\u21B0",lsh:"\u21B0",lsim:"\u2272",lsime:"\u2A8D",lsimg:"\u2A8F",lsqb:"[",lsquo:"\u2018",lsquor:"\u201A",Lstrok:"\u0141",lstrok:"\u0142",Lt:"\u226A",LT:"<",lt:"<",ltcc:"\u2AA6",ltcir:"\u2A79",ltdot:"\u22D6",lthree:"\u22CB",ltimes:"\u22C9",ltlarr:"\u2976",ltquest:"\u2A7B",ltri:"\u25C3",ltrie:"\u22B4",ltrif:"\u25C2",ltrPar:"\u2996",lurdshar:"\u294A",luruhar:"\u2966",lvertneqq:"\u2268\uFE00",lvnE:"\u2268\uFE00",macr:"\xAF",male:"\u2642",malt:"\u2720",maltese:"\u2720",Map:"\u2905",map:"\u21A6",mapsto:"\u21A6",mapstodown:"\u21A7",mapstoleft:"\u21A4",mapstoup:"\u21A5",marker:"\u25AE",mcomma:"\u2A29",Mcy:"\u041C",mcy:"\u043C",mdash:"\u2014",mDDot:"\u223A",measuredangle:"\u2221",MediumSpace:"\u205F",Mellintrf:"\u2133",Mfr:"\u{1D510}",mfr:"\u{1D52A}",mho:"\u2127",micro:"\xB5",mid:"\u2223",midast:"*",midcir:"\u2AF0",middot:"\xB7",minus:"\u2212",minusb:"\u229F",minusd:"\u2238",minusdu:"\u2A2A",MinusPlus:"\u2213",mlcp:"\u2ADB",mldr:"\u2026",mnplus:"\u2213",models:"\u22A7",Mopf:"\u{1D544}",mopf:"\u{1D55E}",mp:"\u2213",Mscr:"\u2133",mscr:"\u{1D4C2}",mstpos:"\u223E",Mu:"\u039C",mu:"\u03BC",multimap:"\u22B8",mumap:"\u22B8",nabla:"\u2207",Nacute:"\u0143",nacute:"\u0144",nang:"\u2220\u20D2",nap:"\u2249",napE:"\u2A70\u0338",napid:"\u224B\u0338",napos:"\u0149",napprox:"\u2249",natur:"\u266E",natural:"\u266E",naturals:"\u2115",nbsp:"\xA0",nbump:"\u224E\u0338",nbumpe:"\u224F\u0338",ncap:"\u2A43",Ncaron:"\u0147",ncaron:"\u0148",Ncedil:"\u0145",ncedil:"\u0146",ncong:"\u2247",ncongdot:"\u2A6D\u0338",ncup:"\u2A42",Ncy:"\u041D",ncy:"\u043D",ndash:"\u2013",ne:"\u2260",nearhk:"\u2924",neArr:"\u21D7",nearr:"\u2197",nearrow:"\u2197",nedot:"\u2250\u0338",NegativeMediumSpace:"\u200B",NegativeThickSpace:"\u200B",NegativeThinSpace:"\u200B",NegativeVeryThinSpace:"\u200B",nequiv:"\u2262",nesear:"\u2928",nesim:"\u2242\u0338",NestedGreaterGreater:"\u226B",NestedLessLess:"\u226A",NewLine:`
`,nexist:"\u2204",nexists:"\u2204",Nfr:"\u{1D511}",nfr:"\u{1D52B}",ngE:"\u2267\u0338",nge:"\u2271",ngeq:"\u2271",ngeqq:"\u2267\u0338",ngeqslant:"\u2A7E\u0338",nges:"\u2A7E\u0338",nGg:"\u22D9\u0338",ngsim:"\u2275",nGt:"\u226B\u20D2",ngt:"\u226F",ngtr:"\u226F",nGtv:"\u226B\u0338",nhArr:"\u21CE",nharr:"\u21AE",nhpar:"\u2AF2",ni:"\u220B",nis:"\u22FC",nisd:"\u22FA",niv:"\u220B",NJcy:"\u040A",njcy:"\u045A",nlArr:"\u21CD",nlarr:"\u219A",nldr:"\u2025",nlE:"\u2266\u0338",nle:"\u2270",nLeftarrow:"\u21CD",nleftarrow:"\u219A",nLeftrightarrow:"\u21CE",nleftrightarrow:"\u21AE",nleq:"\u2270",nleqq:"\u2266\u0338",nleqslant:"\u2A7D\u0338",nles:"\u2A7D\u0338",nless:"\u226E",nLl:"\u22D8\u0338",nlsim:"\u2274",nLt:"\u226A\u20D2",nlt:"\u226E",nltri:"\u22EA",nltrie:"\u22EC",nLtv:"\u226A\u0338",nmid:"\u2224",NoBreak:"\u2060",NonBreakingSpace:"\xA0",Nopf:"\u2115",nopf:"\u{1D55F}",Not:"\u2AEC",not:"\xAC",NotCongruent:"\u2262",NotCupCap:"\u226D",NotDoubleVerticalBar:"\u2226",NotElement:"\u2209",NotEqual:"\u2260",NotEqualTilde:"\u2242\u0338",NotExists:"\u2204",NotGreater:"\u226F",NotGreaterEqual:"\u2271",NotGreaterFullEqual:"\u2267\u0338",NotGreaterGreater:"\u226B\u0338",NotGreaterLess:"\u2279",NotGreaterSlantEqual:"\u2A7E\u0338",NotGreaterTilde:"\u2275",NotHumpDownHump:"\u224E\u0338",NotHumpEqual:"\u224F\u0338",notin:"\u2209",notindot:"\u22F5\u0338",notinE:"\u22F9\u0338",notinva:"\u2209",notinvb:"\u22F7",notinvc:"\u22F6",NotLeftTriangle:"\u22EA",NotLeftTriangleBar:"\u29CF\u0338",NotLeftTriangleEqual:"\u22EC",NotLess:"\u226E",NotLessEqual:"\u2270",NotLessGreater:"\u2278",NotLessLess:"\u226A\u0338",NotLessSlantEqual:"\u2A7D\u0338",NotLessTilde:"\u2274",NotNestedGreaterGreater:"\u2AA2\u0338",NotNestedLessLess:"\u2AA1\u0338",notni:"\u220C",notniva:"\u220C",notnivb:"\u22FE",notnivc:"\u22FD",NotPrecedes:"\u2280",NotPrecedesEqual:"\u2AAF\u0338",NotPrecedesSlantEqual:"\u22E0",NotReverseElement:"\u220C",NotRightTriangle:"\u22EB",NotRightTriangleBar:"\u29D0\u0338",NotRightTriangleEqual:"\u22ED",NotSquareSubset:"\u228F\u0338",NotSquareSubsetEqual:"\u22E2",NotSquareSuperset:"\u2290\u0338",NotSquareSupersetEqual:"\u22E3",NotSubset:"\u2282\u20D2",NotSubsetEqual:"\u2288",NotSucceeds:"\u2281",NotSucceedsEqual:"\u2AB0\u0338",NotSucceedsSlantEqual:"\u22E1",NotSucceedsTilde:"\u227F\u0338",NotSuperset:"\u2283\u20D2",NotSupersetEqual:"\u2289",NotTilde:"\u2241",NotTildeEqual:"\u2244",NotTildeFullEqual:"\u2247",NotTildeTilde:"\u2249",NotVerticalBar:"\u2224",npar:"\u2226",nparallel:"\u2226",nparsl:"\u2AFD\u20E5",npart:"\u2202\u0338",npolint:"\u2A14",npr:"\u2280",nprcue:"\u22E0",npre:"\u2AAF\u0338",nprec:"\u2280",npreceq:"\u2AAF\u0338",nrArr:"\u21CF",nrarr:"\u219B",nrarrc:"\u2933\u0338",nrarrw:"\u219D\u0338",nRightarrow:"\u21CF",nrightarrow:"\u219B",nrtri:"\u22EB",nrtrie:"\u22ED",nsc:"\u2281",nsccue:"\u22E1",nsce:"\u2AB0\u0338",Nscr:"\u{1D4A9}",nscr:"\u{1D4C3}",nshortmid:"\u2224",nshortparallel:"\u2226",nsim:"\u2241",nsime:"\u2244",nsimeq:"\u2244",nsmid:"\u2224",nspar:"\u2226",nsqsube:"\u22E2",nsqsupe:"\u22E3",nsub:"\u2284",nsubE:"\u2AC5\u0338",nsube:"\u2288",nsubset:"\u2282\u20D2",nsubseteq:"\u2288",nsubseteqq:"\u2AC5\u0338",nsucc:"\u2281",nsucceq:"\u2AB0\u0338",nsup:"\u2285",nsupE:"\u2AC6\u0338",nsupe:"\u2289",nsupset:"\u2283\u20D2",nsupseteq:"\u2289",nsupseteqq:"\u2AC6\u0338",ntgl:"\u2279",Ntilde:"\xD1",ntilde:"\xF1",ntlg:"\u2278",ntriangleleft:"\u22EA",ntrianglelefteq:"\u22EC",ntriangleright:"\u22EB",ntrianglerighteq:"\u22ED",Nu:"\u039D",nu:"\u03BD",num:"#",numero:"\u2116",numsp:"\u2007",nvap:"\u224D\u20D2",nVDash:"\u22AF",nVdash:"\u22AE",nvDash:"\u22AD",nvdash:"\u22AC",nvge:"\u2265\u20D2",nvgt:">\u20D2",nvHarr:"\u2904",nvinfin:"\u29DE",nvlArr:"\u2902",nvle:"\u2264\u20D2",nvlt:"<\u20D2",nvltrie:"\u22B4\u20D2",nvrArr:"\u2903",nvrtrie:"\u22B5\u20D2",nvsim:"\u223C\u20D2",nwarhk:"\u2923",nwArr:"\u21D6",nwarr:"\u2196",nwarrow:"\u2196",nwnear:"\u2927",Oacute:"\xD3",oacute:"\xF3",oast:"\u229B",ocir:"\u229A",Ocirc:"\xD4",ocirc:"\xF4",Ocy:"\u041E",ocy:"\u043E",odash:"\u229D",Odblac:"\u0150",odblac:"\u0151",odiv:"\u2A38",odot:"\u2299",odsold:"\u29BC",OElig:"\u0152",oelig:"\u0153",ofcir:"\u29BF",Ofr:"\u{1D512}",ofr:"\u{1D52C}",ogon:"\u02DB",Ograve:"\xD2",ograve:"\xF2",ogt:"\u29C1",ohbar:"\u29B5",ohm:"\u03A9",oint:"\u222E",olarr:"\u21BA",olcir:"\u29BE",olcross:"\u29BB",oline:"\u203E",olt:"\u29C0",Omacr:"\u014C",omacr:"\u014D",Omega:"\u03A9",omega:"\u03C9",Omicron:"\u039F",omicron:"\u03BF",omid:"\u29B6",ominus:"\u2296",Oopf:"\u{1D546}",oopf:"\u{1D560}",opar:"\u29B7",OpenCurlyDoubleQuote:"\u201C",OpenCurlyQuote:"\u2018",operp:"\u29B9",oplus:"\u2295",Or:"\u2A54",or:"\u2228",orarr:"\u21BB",ord:"\u2A5D",order:"\u2134",orderof:"\u2134",ordf:"\xAA",ordm:"\xBA",origof:"\u22B6",oror:"\u2A56",orslope:"\u2A57",orv:"\u2A5B",oS:"\u24C8",Oscr:"\u{1D4AA}",oscr:"\u2134",Oslash:"\xD8",oslash:"\xF8",osol:"\u2298",Otilde:"\xD5",otilde:"\xF5",Otimes:"\u2A37",otimes:"\u2297",otimesas:"\u2A36",Ouml:"\xD6",ouml:"\xF6",ovbar:"\u233D",OverBar:"\u203E",OverBrace:"\u23DE",OverBracket:"\u23B4",OverParenthesis:"\u23DC",par:"\u2225",para:"\xB6",parallel:"\u2225",parsim:"\u2AF3",parsl:"\u2AFD",part:"\u2202",PartialD:"\u2202",Pcy:"\u041F",pcy:"\u043F",percnt:"%",period:".",permil:"\u2030",perp:"\u22A5",pertenk:"\u2031",Pfr:"\u{1D513}",pfr:"\u{1D52D}",Phi:"\u03A6",phi:"\u03C6",phiv:"\u03D5",phmmat:"\u2133",phone:"\u260E",Pi:"\u03A0",pi:"\u03C0",pitchfork:"\u22D4",piv:"\u03D6",planck:"\u210F",planckh:"\u210E",plankv:"\u210F",plus:"+",plusacir:"\u2A23",plusb:"\u229E",pluscir:"\u2A22",plusdo:"\u2214",plusdu:"\u2A25",pluse:"\u2A72",PlusMinus:"\xB1",plusmn:"\xB1",plussim:"\u2A26",plustwo:"\u2A27",pm:"\xB1",Poincareplane:"\u210C",pointint:"\u2A15",Popf:"\u2119",popf:"\u{1D561}",pound:"\xA3",Pr:"\u2ABB",pr:"\u227A",prap:"\u2AB7",prcue:"\u227C",prE:"\u2AB3",pre:"\u2AAF",prec:"\u227A",precapprox:"\u2AB7",preccurlyeq:"\u227C",Precedes:"\u227A",PrecedesEqual:"\u2AAF",PrecedesSlantEqual:"\u227C",PrecedesTilde:"\u227E",preceq:"\u2AAF",precnapprox:"\u2AB9",precneqq:"\u2AB5",precnsim:"\u22E8",precsim:"\u227E",Prime:"\u2033",prime:"\u2032",primes:"\u2119",prnap:"\u2AB9",prnE:"\u2AB5",prnsim:"\u22E8",prod:"\u220F",Product:"\u220F",profalar:"\u232E",profline:"\u2312",profsurf:"\u2313",prop:"\u221D",Proportion:"\u2237",Proportional:"\u221D",propto:"\u221D",prsim:"\u227E",prurel:"\u22B0",Pscr:"\u{1D4AB}",pscr:"\u{1D4C5}",Psi:"\u03A8",psi:"\u03C8",puncsp:"\u2008",Qfr:"\u{1D514}",qfr:"\u{1D52E}",qint:"\u2A0C",Qopf:"\u211A",qopf:"\u{1D562}",qprime:"\u2057",Qscr:"\u{1D4AC}",qscr:"\u{1D4C6}",quaternions:"\u210D",quatint:"\u2A16",quest:"?",questeq:"\u225F",QUOT:'"',quot:'"',rAarr:"\u21DB",race:"\u223D\u0331",Racute:"\u0154",racute:"\u0155",radic:"\u221A",raemptyv:"\u29B3",Rang:"\u27EB",rang:"\u27E9",rangd:"\u2992",range:"\u29A5",rangle:"\u27E9",raquo:"\xBB",Rarr:"\u21A0",rArr:"\u21D2",rarr:"\u2192",rarrap:"\u2975",rarrb:"\u21E5",rarrbfs:"\u2920",rarrc:"\u2933",rarrfs:"\u291E",rarrhk:"\u21AA",rarrlp:"\u21AC",rarrpl:"\u2945",rarrsim:"\u2974",Rarrtl:"\u2916",rarrtl:"\u21A3",rarrw:"\u219D",rAtail:"\u291C",ratail:"\u291A",ratio:"\u2236",rationals:"\u211A",RBarr:"\u2910",rBarr:"\u290F",rbarr:"\u290D",rbbrk:"\u2773",rbrace:"}",rbrack:"]",rbrke:"\u298C",rbrksld:"\u298E",rbrkslu:"\u2990",Rcaron:"\u0158",rcaron:"\u0159",Rcedil:"\u0156",rcedil:"\u0157",rceil:"\u2309",rcub:"}",Rcy:"\u0420",rcy:"\u0440",rdca:"\u2937",rdldhar:"\u2969",rdquo:"\u201D",rdquor:"\u201D",rdsh:"\u21B3",Re:"\u211C",real:"\u211C",realine:"\u211B",realpart:"\u211C",reals:"\u211D",rect:"\u25AD",REG:"\xAE",reg:"\xAE",ReverseElement:"\u220B",ReverseEquilibrium:"\u21CB",ReverseUpEquilibrium:"\u296F",rfisht:"\u297D",rfloor:"\u230B",Rfr:"\u211C",rfr:"\u{1D52F}",rHar:"\u2964",rhard:"\u21C1",rharu:"\u21C0",rharul:"\u296C",Rho:"\u03A1",rho:"\u03C1",rhov:"\u03F1",RightAngleBracket:"\u27E9",RightArrow:"\u2192",Rightarrow:"\u21D2",rightarrow:"\u2192",RightArrowBar:"\u21E5",RightArrowLeftArrow:"\u21C4",rightarrowtail:"\u21A3",RightCeiling:"\u2309",RightDoubleBracket:"\u27E7",RightDownTeeVector:"\u295D",RightDownVector:"\u21C2",RightDownVectorBar:"\u2955",RightFloor:"\u230B",rightharpoondown:"\u21C1",rightharpoonup:"\u21C0",rightleftarrows:"\u21C4",rightleftharpoons:"\u21CC",rightrightarrows:"\u21C9",rightsquigarrow:"\u219D",RightTee:"\u22A2",RightTeeArrow:"\u21A6",RightTeeVector:"\u295B",rightthreetimes:"\u22CC",RightTriangle:"\u22B3",RightTriangleBar:"\u29D0",RightTriangleEqual:"\u22B5",RightUpDownVector:"\u294F",RightUpTeeVector:"\u295C",RightUpVector:"\u21BE",RightUpVectorBar:"\u2954",RightVector:"\u21C0",RightVectorBar:"\u2953",ring:"\u02DA",risingdotseq:"\u2253",rlarr:"\u21C4",rlhar:"\u21CC",rlm:"\u200F",rmoust:"\u23B1",rmoustache:"\u23B1",rnmid:"\u2AEE",roang:"\u27ED",roarr:"\u21FE",robrk:"\u27E7",ropar:"\u2986",Ropf:"\u211D",ropf:"\u{1D563}",roplus:"\u2A2E",rotimes:"\u2A35",RoundImplies:"\u2970",rpar:")",rpargt:"\u2994",rppolint:"\u2A12",rrarr:"\u21C9",Rrightarrow:"\u21DB",rsaquo:"\u203A",Rscr:"\u211B",rscr:"\u{1D4C7}",Rsh:"\u21B1",rsh:"\u21B1",rsqb:"]",rsquo:"\u2019",rsquor:"\u2019",rthree:"\u22CC",rtimes:"\u22CA",rtri:"\u25B9",rtrie:"\u22B5",rtrif:"\u25B8",rtriltri:"\u29CE",RuleDelayed:"\u29F4",ruluhar:"\u2968",rx:"\u211E",Sacute:"\u015A",sacute:"\u015B",sbquo:"\u201A",Sc:"\u2ABC",sc:"\u227B",scap:"\u2AB8",Scaron:"\u0160",scaron:"\u0161",sccue:"\u227D",scE:"\u2AB4",sce:"\u2AB0",Scedil:"\u015E",scedil:"\u015F",Scirc:"\u015C",scirc:"\u015D",scnap:"\u2ABA",scnE:"\u2AB6",scnsim:"\u22E9",scpolint:"\u2A13",scsim:"\u227F",Scy:"\u0421",scy:"\u0441",sdot:"\u22C5",sdotb:"\u22A1",sdote:"\u2A66",searhk:"\u2925",seArr:"\u21D8",searr:"\u2198",searrow:"\u2198",sect:"\xA7",semi:";",seswar:"\u2929",setminus:"\u2216",setmn:"\u2216",sext:"\u2736",Sfr:"\u{1D516}",sfr:"\u{1D530}",sfrown:"\u2322",sharp:"\u266F",SHCHcy:"\u0429",shchcy:"\u0449",SHcy:"\u0428",shcy:"\u0448",ShortDownArrow:"\u2193",ShortLeftArrow:"\u2190",shortmid:"\u2223",shortparallel:"\u2225",ShortRightArrow:"\u2192",ShortUpArrow:"\u2191",shy:"\xAD",Sigma:"\u03A3",sigma:"\u03C3",sigmaf:"\u03C2",sigmav:"\u03C2",sim:"\u223C",simdot:"\u2A6A",sime:"\u2243",simeq:"\u2243",simg:"\u2A9E",simgE:"\u2AA0",siml:"\u2A9D",simlE:"\u2A9F",simne:"\u2246",simplus:"\u2A24",simrarr:"\u2972",slarr:"\u2190",SmallCircle:"\u2218",smallsetminus:"\u2216",smashp:"\u2A33",smeparsl:"\u29E4",smid:"\u2223",smile:"\u2323",smt:"\u2AAA",smte:"\u2AAC",smtes:"\u2AAC\uFE00",SOFTcy:"\u042C",softcy:"\u044C",sol:"/",solb:"\u29C4",solbar:"\u233F",Sopf:"\u{1D54A}",sopf:"\u{1D564}",spades:"\u2660",spadesuit:"\u2660",spar:"\u2225",sqcap:"\u2293",sqcaps:"\u2293\uFE00",sqcup:"\u2294",sqcups:"\u2294\uFE00",Sqrt:"\u221A",sqsub:"\u228F",sqsube:"\u2291",sqsubset:"\u228F",sqsubseteq:"\u2291",sqsup:"\u2290",sqsupe:"\u2292",sqsupset:"\u2290",sqsupseteq:"\u2292",squ:"\u25A1",Square:"\u25A1",square:"\u25A1",SquareIntersection:"\u2293",SquareSubset:"\u228F",SquareSubsetEqual:"\u2291",SquareSuperset:"\u2290",SquareSupersetEqual:"\u2292",SquareUnion:"\u2294",squarf:"\u25AA",squf:"\u25AA",srarr:"\u2192",Sscr:"\u{1D4AE}",sscr:"\u{1D4C8}",ssetmn:"\u2216",ssmile:"\u2323",sstarf:"\u22C6",Star:"\u22C6",star:"\u2606",starf:"\u2605",straightepsilon:"\u03F5",straightphi:"\u03D5",strns:"\xAF",Sub:"\u22D0",sub:"\u2282",subdot:"\u2ABD",subE:"\u2AC5",sube:"\u2286",subedot:"\u2AC3",submult:"\u2AC1",subnE:"\u2ACB",subne:"\u228A",subplus:"\u2ABF",subrarr:"\u2979",Subset:"\u22D0",subset:"\u2282",subseteq:"\u2286",subseteqq:"\u2AC5",SubsetEqual:"\u2286",subsetneq:"\u228A",subsetneqq:"\u2ACB",subsim:"\u2AC7",subsub:"\u2AD5",subsup:"\u2AD3",succ:"\u227B",succapprox:"\u2AB8",succcurlyeq:"\u227D",Succeeds:"\u227B",SucceedsEqual:"\u2AB0",SucceedsSlantEqual:"\u227D",SucceedsTilde:"\u227F",succeq:"\u2AB0",succnapprox:"\u2ABA",succneqq:"\u2AB6",succnsim:"\u22E9",succsim:"\u227F",SuchThat:"\u220B",Sum:"\u2211",sum:"\u2211",sung:"\u266A",Sup:"\u22D1",sup:"\u2283",sup1:"\xB9",sup2:"\xB2",sup3:"\xB3",supdot:"\u2ABE",supdsub:"\u2AD8",supE:"\u2AC6",supe:"\u2287",supedot:"\u2AC4",Superset:"\u2283",SupersetEqual:"\u2287",suphsol:"\u27C9",suphsub:"\u2AD7",suplarr:"\u297B",supmult:"\u2AC2",supnE:"\u2ACC",supne:"\u228B",supplus:"\u2AC0",Supset:"\u22D1",supset:"\u2283",supseteq:"\u2287",supseteqq:"\u2AC6",supsetneq:"\u228B",supsetneqq:"\u2ACC",supsim:"\u2AC8",supsub:"\u2AD4",supsup:"\u2AD6",swarhk:"\u2926",swArr:"\u21D9",swarr:"\u2199",swarrow:"\u2199",swnwar:"\u292A",szlig:"\xDF",Tab:"	",target:"\u2316",Tau:"\u03A4",tau:"\u03C4",tbrk:"\u23B4",Tcaron:"\u0164",tcaron:"\u0165",Tcedil:"\u0162",tcedil:"\u0163",Tcy:"\u0422",tcy:"\u0442",tdot:"\u20DB",telrec:"\u2315",Tfr:"\u{1D517}",tfr:"\u{1D531}",there4:"\u2234",Therefore:"\u2234",therefore:"\u2234",Theta:"\u0398",theta:"\u03B8",thetasym:"\u03D1",thetav:"\u03D1",thickapprox:"\u2248",thicksim:"\u223C",ThickSpace:"\u205F\u200A",thinsp:"\u2009",ThinSpace:"\u2009",thkap:"\u2248",thksim:"\u223C",THORN:"\xDE",thorn:"\xFE",Tilde:"\u223C",tilde:"\u02DC",TildeEqual:"\u2243",TildeFullEqual:"\u2245",TildeTilde:"\u2248",times:"\xD7",timesb:"\u22A0",timesbar:"\u2A31",timesd:"\u2A30",tint:"\u222D",toea:"\u2928",top:"\u22A4",topbot:"\u2336",topcir:"\u2AF1",Topf:"\u{1D54B}",topf:"\u{1D565}",topfork:"\u2ADA",tosa:"\u2929",tprime:"\u2034",TRADE:"\u2122",trade:"\u2122",triangle:"\u25B5",triangledown:"\u25BF",triangleleft:"\u25C3",trianglelefteq:"\u22B4",triangleq:"\u225C",triangleright:"\u25B9",trianglerighteq:"\u22B5",tridot:"\u25EC",trie:"\u225C",triminus:"\u2A3A",TripleDot:"\u20DB",triplus:"\u2A39",trisb:"\u29CD",tritime:"\u2A3B",trpezium:"\u23E2",Tscr:"\u{1D4AF}",tscr:"\u{1D4C9}",TScy:"\u0426",tscy:"\u0446",TSHcy:"\u040B",tshcy:"\u045B",Tstrok:"\u0166",tstrok:"\u0167",twixt:"\u226C",twoheadleftarrow:"\u219E",twoheadrightarrow:"\u21A0",Uacute:"\xDA",uacute:"\xFA",Uarr:"\u219F",uArr:"\u21D1",uarr:"\u2191",Uarrocir:"\u2949",Ubrcy:"\u040E",ubrcy:"\u045E",Ubreve:"\u016C",ubreve:"\u016D",Ucirc:"\xDB",ucirc:"\xFB",Ucy:"\u0423",ucy:"\u0443",udarr:"\u21C5",Udblac:"\u0170",udblac:"\u0171",udhar:"\u296E",ufisht:"\u297E",Ufr:"\u{1D518}",ufr:"\u{1D532}",Ugrave:"\xD9",ugrave:"\xF9",uHar:"\u2963",uharl:"\u21BF",uharr:"\u21BE",uhblk:"\u2580",ulcorn:"\u231C",ulcorner:"\u231C",ulcrop:"\u230F",ultri:"\u25F8",Umacr:"\u016A",umacr:"\u016B",uml:"\xA8",UnderBar:"_",UnderBrace:"\u23DF",UnderBracket:"\u23B5",UnderParenthesis:"\u23DD",Union:"\u22C3",UnionPlus:"\u228E",Uogon:"\u0172",uogon:"\u0173",Uopf:"\u{1D54C}",uopf:"\u{1D566}",UpArrow:"\u2191",Uparrow:"\u21D1",uparrow:"\u2191",UpArrowBar:"\u2912",UpArrowDownArrow:"\u21C5",UpDownArrow:"\u2195",Updownarrow:"\u21D5",updownarrow:"\u2195",UpEquilibrium:"\u296E",upharpoonleft:"\u21BF",upharpoonright:"\u21BE",uplus:"\u228E",UpperLeftArrow:"\u2196",UpperRightArrow:"\u2197",Upsi:"\u03D2",upsi:"\u03C5",upsih:"\u03D2",Upsilon:"\u03A5",upsilon:"\u03C5",UpTee:"\u22A5",UpTeeArrow:"\u21A5",upuparrows:"\u21C8",urcorn:"\u231D",urcorner:"\u231D",urcrop:"\u230E",Uring:"\u016E",uring:"\u016F",urtri:"\u25F9",Uscr:"\u{1D4B0}",uscr:"\u{1D4CA}",utdot:"\u22F0",Utilde:"\u0168",utilde:"\u0169",utri:"\u25B5",utrif:"\u25B4",uuarr:"\u21C8",Uuml:"\xDC",uuml:"\xFC",uwangle:"\u29A7",vangrt:"\u299C",varepsilon:"\u03F5",varkappa:"\u03F0",varnothing:"\u2205",varphi:"\u03D5",varpi:"\u03D6",varpropto:"\u221D",vArr:"\u21D5",varr:"\u2195",varrho:"\u03F1",varsigma:"\u03C2",varsubsetneq:"\u228A\uFE00",varsubsetneqq:"\u2ACB\uFE00",varsupsetneq:"\u228B\uFE00",varsupsetneqq:"\u2ACC\uFE00",vartheta:"\u03D1",vartriangleleft:"\u22B2",vartriangleright:"\u22B3",Vbar:"\u2AEB",vBar:"\u2AE8",vBarv:"\u2AE9",Vcy:"\u0412",vcy:"\u0432",VDash:"\u22AB",Vdash:"\u22A9",vDash:"\u22A8",vdash:"\u22A2",Vdashl:"\u2AE6",Vee:"\u22C1",vee:"\u2228",veebar:"\u22BB",veeeq:"\u225A",vellip:"\u22EE",Verbar:"\u2016",verbar:"|",Vert:"\u2016",vert:"|",VerticalBar:"\u2223",VerticalLine:"|",VerticalSeparator:"\u2758",VerticalTilde:"\u2240",VeryThinSpace:"\u200A",Vfr:"\u{1D519}",vfr:"\u{1D533}",vltri:"\u22B2",vnsub:"\u2282\u20D2",vnsup:"\u2283\u20D2",Vopf:"\u{1D54D}",vopf:"\u{1D567}",vprop:"\u221D",vrtri:"\u22B3",Vscr:"\u{1D4B1}",vscr:"\u{1D4CB}",vsubnE:"\u2ACB\uFE00",vsubne:"\u228A\uFE00",vsupnE:"\u2ACC\uFE00",vsupne:"\u228B\uFE00",Vvdash:"\u22AA",vzigzag:"\u299A",Wcirc:"\u0174",wcirc:"\u0175",wedbar:"\u2A5F",Wedge:"\u22C0",wedge:"\u2227",wedgeq:"\u2259",weierp:"\u2118",Wfr:"\u{1D51A}",wfr:"\u{1D534}",Wopf:"\u{1D54E}",wopf:"\u{1D568}",wp:"\u2118",wr:"\u2240",wreath:"\u2240",Wscr:"\u{1D4B2}",wscr:"\u{1D4CC}",xcap:"\u22C2",xcirc:"\u25EF",xcup:"\u22C3",xdtri:"\u25BD",Xfr:"\u{1D51B}",xfr:"\u{1D535}",xhArr:"\u27FA",xharr:"\u27F7",Xi:"\u039E",xi:"\u03BE",xlArr:"\u27F8",xlarr:"\u27F5",xmap:"\u27FC",xnis:"\u22FB",xodot:"\u2A00",Xopf:"\u{1D54F}",xopf:"\u{1D569}",xoplus:"\u2A01",xotime:"\u2A02",xrArr:"\u27F9",xrarr:"\u27F6",Xscr:"\u{1D4B3}",xscr:"\u{1D4CD}",xsqcup:"\u2A06",xuplus:"\u2A04",xutri:"\u25B3",xvee:"\u22C1",xwedge:"\u22C0",Yacute:"\xDD",yacute:"\xFD",YAcy:"\u042F",yacy:"\u044F",Ycirc:"\u0176",ycirc:"\u0177",Ycy:"\u042B",ycy:"\u044B",yen:"\xA5",Yfr:"\u{1D51C}",yfr:"\u{1D536}",YIcy:"\u0407",yicy:"\u0457",Yopf:"\u{1D550}",yopf:"\u{1D56A}",Yscr:"\u{1D4B4}",yscr:"\u{1D4CE}",YUcy:"\u042E",yucy:"\u044E",Yuml:"\u0178",yuml:"\xFF",Zacute:"\u0179",zacute:"\u017A",Zcaron:"\u017D",zcaron:"\u017E",Zcy:"\u0417",zcy:"\u0437",Zdot:"\u017B",zdot:"\u017C",zeetrf:"\u2128",ZeroWidthSpace:"\u200B",Zeta:"\u0396",zeta:"\u03B6",Zfr:"\u2128",zfr:"\u{1D537}",ZHcy:"\u0416",zhcy:"\u0436",zigrarr:"\u21DD",Zopf:"\u2124",zopf:"\u{1D56B}",Zscr:"\u{1D4B5}",zscr:"\u{1D4CF}",zwj:"\u200D",zwnj:"\u200C"}),ee.entityMap=ee.HTML_ENTITIES},8978:function(xe,ee,z){var Y,A=z(4722);Y=A.DOMImplementation,Y=A.XMLSerializer,ee.DOMParser=z(5752).DOMParser},2085:function(xe,ee,z){var Y=z(4582).NAMESPACE,A=/[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,G=new RegExp("[\\-\\.0-9"+A.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),O=new RegExp("^"+A.source+G.source+"*(?::"+A.source+G.source+"*)?$"),J=0,U=1,de=2,he=3,fe=4,se=5,Pe=6,Q=7;function _e(T,x){this.message=T,this.locator=x,Error.captureStackTrace&&Error.captureStackTrace(this,_e)}_e.prototype=new Error,_e.prototype.name=_e.name;function be(){}be.prototype={parse:function(T,x,N){var te=this.domBuilder;te.startDocument(),Oe(x,x={}),We(T,x,N,te,this.errorHandler),te.endDocument()}};function We(T,x,N,te,K){function oe(pe){if(pe>65535){pe-=65536;var It=55296+(pe>>10),Qt=56320+(pe&1023);return String.fromCharCode(It,Qt)}else return String.fromCharCode(pe)}function ue(pe){var It=pe.slice(1,-1);return Object.hasOwnProperty.call(N,It)?N[It]:It.charAt(0)==="#"?oe(parseInt(It.substr(1).replace("x","0x"))):(K.error("entity not found:"+pe),pe)}function me(pe){if(pe>Se){var It=T.substring(Se,pe).replace(/&#?\w+;/g,ue);Te&&ie(Se),te.characters(It,0,pe-Se),Se=pe}}function ie(pe,It){for(;pe>=Z&&(It=ae.exec(T));)re=It.index,Z=re+It[0].length,Te.lineNumber++;Te.columnNumber=pe-re+1}for(var re=0,Z=0,ae=/.*(?:\r\n?|\n)|.*$/g,Te=te.locator,Ie=[{currentNSMap:x}],qe={},Se=0;;){try{var je=T.indexOf("<",Se);if(je<0){if(!T.substr(Se).match(/^\s*$/)){var _t=te.doc,bt=_t.createTextNode(T.substr(Se));_t.appendChild(bt),te.currentElement=bt}return}switch(je>Se&&me(je),T.charAt(je+1)){case"/":var ut=T.indexOf(">",je+3),nt=T.substring(je+2,ut).replace(/[ \t\n\r]+$/g,""),Tt=Ie.pop();ut<0?(nt=T.substring(je+2).replace(/[\s<].*/,""),K.error("end tag name: "+nt+" is not complete:"+Tt.tagName),ut=je+1+nt.length):nt.match(/\s</)&&(nt=nt.replace(/[\s<].*/,""),K.error("end tag name: "+nt+" maybe not complete"),ut=je+1+nt.length);var Ut=Tt.localNSMap,fi=Tt.tagName==nt,En=fi||Tt.tagName&&Tt.tagName.toLowerCase()==nt.toLowerCase();if(En){if(te.endElement(Tt.uri,Tt.localName,nt),Ut)for(var ze in Ut)Object.prototype.hasOwnProperty.call(Ut,ze)&&te.endPrefixMapping(ze);fi||K.fatalError("end tag name: "+nt+" is not match the current start tagName:"+Tt.tagName)}else Ie.push(Tt);ut++;break;case"?":Te&&ie(je),ut=Ue(T,je,te);break;case"!":Te&&ie(je),ut=ve(T,je,te,K);break;default:Te&&ie(je);var Ct=new Ne,ai=Ie[Ie.length-1].currentNSMap,ut=et(T,je,Ct,ai,ue,K),Tn=Ct.length;if(!Ct.closed&&Ce(T,ut,Ct.tagName,qe)&&(Ct.closed=!0,N.nbsp||K.warning("unclosed xml attribute")),Te&&Tn){for(var Ji=vt(Te,{}),pi=0;pi<Tn;pi++){var Zi=Ct[pi];ie(Zi.offset),Zi.locator=vt(Te,{})}te.locator=Ji,ne(Ct,te,ai)&&Ie.push(Ct),te.locator=Te}else ne(Ct,te,ai)&&Ie.push(Ct);Y.isHTML(Ct.uri)&&!Ct.closed?ut=ge(T,ut,Ct.tagName,ue,te):ut++}}catch(pe){if(pe instanceof _e)throw pe;K.error("element parse error: "+pe),ut=-1}ut>Se?Se=ut:me(Math.max(je,Se)+1)}}function vt(T,x){return x.lineNumber=T.lineNumber,x.columnNumber=T.columnNumber,x}function et(T,x,N,te,K,oe){function ue(Ie,qe,Se){N.attributeNames.hasOwnProperty(Ie)&&oe.fatalError("Attribute "+Ie+" redefined"),N.addValue(Ie,qe.replace(/[\t\n\r]/g," ").replace(/&#?\w+;/g,K),Se)}for(var me,ie,re=++x,Z=J;;){var ae=T.charAt(re);switch(ae){case"=":if(Z===U)me=T.slice(x,re),Z=he;else if(Z===de)Z=he;else throw new Error("attribute equal must after attrName");break;case"'":case'"':if(Z===he||Z===U)if(Z===U&&(oe.warning('attribute value must after "="'),me=T.slice(x,re)),x=re+1,re=T.indexOf(ae,x),re>0)ie=T.slice(x,re),ue(me,ie,x-1),Z=se;else throw new Error("attribute value no end '"+ae+"' match");else if(Z==fe)ie=T.slice(x,re),ue(me,ie,x),oe.warning('attribute "'+me+'" missed start quot('+ae+")!!"),x=re+1,Z=se;else throw new Error('attribute value must after "="');break;case"/":switch(Z){case J:N.setTagName(T.slice(x,re));case se:case Pe:case Q:Z=Q,N.closed=!0;case fe:case U:break;case de:N.closed=!0;break;default:throw new Error("attribute invalid close char('/')")}break;case"":return oe.error("unexpected end of input"),Z==J&&N.setTagName(T.slice(x,re)),re;case">":switch(Z){case J:N.setTagName(T.slice(x,re));case se:case Pe:case Q:break;case fe:case U:ie=T.slice(x,re),ie.slice(-1)==="/"&&(N.closed=!0,ie=ie.slice(0,-1));case de:Z===de&&(ie=me),Z==fe?(oe.warning('attribute "'+ie+'" missed quot(")!'),ue(me,ie,x)):((!Y.isHTML(te[""])||!ie.match(/^(?:disabled|checked|selected)$/i))&&oe.warning('attribute "'+ie+'" missed value!! "'+ie+'" instead!!'),ue(ie,ie,x));break;case he:throw new Error("attribute value missed!!")}return re;case"\x80":ae=" ";default:if(ae<=" ")switch(Z){case J:N.setTagName(T.slice(x,re)),Z=Pe;break;case U:me=T.slice(x,re),Z=de;break;case fe:var ie=T.slice(x,re);oe.warning('attribute "'+ie+'" missed quot(")!!'),ue(me,ie,x);case se:Z=Pe;break}else switch(Z){case de:var Te=N.tagName;(!Y.isHTML(te[""])||!me.match(/^(?:disabled|checked|selected)$/i))&&oe.warning('attribute "'+me+'" missed value!! "'+me+'" instead2!!'),ue(me,me,x),x=re,Z=U;break;case se:oe.warning('attribute space is required"'+me+'"!!');case Pe:Z=U,x=re;break;case he:Z=fe,x=re;break;case Q:throw new Error("elements closed character '/' and '>' must be connected to")}}re++}}function ne(T,x,N){for(var te=T.tagName,K=null,ae=T.length;ae--;){var oe=T[ae],ue=oe.qName,me=oe.value,Te=ue.indexOf(":");if(Te>0)var ie=oe.prefix=ue.slice(0,Te),re=ue.slice(Te+1),Z=ie==="xmlns"&&re;else re=ue,ie=null,Z=ue==="xmlns"&&"";oe.localName=re,Z!==!1&&(K==null&&(K={},Oe(N,N={})),N[Z]=K[Z]=me,oe.uri=Y.XMLNS,x.startPrefixMapping(Z,me))}for(var ae=T.length;ae--;){oe=T[ae];var ie=oe.prefix;ie&&(ie==="xml"&&(oe.uri=Y.XML),ie!=="xmlns"&&(oe.uri=N[ie||""]))}var Te=te.indexOf(":");Te>0?(ie=T.prefix=te.slice(0,Te),re=T.localName=te.slice(Te+1)):(ie=null,re=T.localName=te);var Ie=T.uri=N[ie||""];if(x.startElement(Ie,re,te,T),T.closed){if(x.endElement(Ie,re,te),K)for(ie in K)Object.prototype.hasOwnProperty.call(K,ie)&&x.endPrefixMapping(ie)}else return T.currentNSMap=N,T.localNSMap=K,!0}function ge(T,x,N,te,K){if(/^(?:script|textarea)$/i.test(N)){var oe=T.indexOf("</"+N+">",x),ue=T.substring(x+1,oe);if(/[&<]/.test(ue))return/^script$/i.test(N)?(K.characters(ue,0,ue.length),oe):(ue=ue.replace(/&#?\w+;/g,te),K.characters(ue,0,ue.length),oe)}return x+1}function Ce(T,x,N,te){var K=te[N];return K==null&&(K=T.lastIndexOf("</"+N+">"),K<x&&(K=T.lastIndexOf("</"+N)),te[N]=K),K<x}function Oe(T,x){for(var N in T)Object.prototype.hasOwnProperty.call(T,N)&&(x[N]=T[N])}function ve(T,x,N,te){var K=T.charAt(x+2);switch(K){case"-":if(T.charAt(x+3)==="-"){var oe=T.indexOf("-->",x+4);return oe>x?(N.comment(T,x+4,oe-x-4),oe+3):(te.error("Unclosed comment"),-1)}else return-1;default:if(T.substr(x+3,6)=="CDATA["){var oe=T.indexOf("]]>",x+9);return N.startCDATA(),N.characters(T,x+9,oe-x-9),N.endCDATA(),oe+3}var ue=we(T,x),me=ue.length;if(me>1&&/!doctype/i.test(ue[0][0])){var ie=ue[1][0],re=!1,Z=!1;me>3&&(/^public$/i.test(ue[2][0])?(re=ue[3][0],Z=me>4&&ue[4][0]):/^system$/i.test(ue[2][0])&&(Z=ue[3][0]));var ae=ue[me-1];return N.startDTD(ie,re,Z),N.endDTD(),ae.index+ae[0].length}}return-1}function Ue(T,x,N){var te=T.indexOf("?>",x);if(te){var K=T.substring(x,te).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);if(K){var oe=K[0].length;return N.processingInstruction(K[1],K[2]),te+2}else return-1}return-1}function Ne(){this.attributeNames={}}Ne.prototype={setTagName:function(T){if(!O.test(T))throw new Error("invalid tagName:"+T);this.tagName=T},addValue:function(T,x,N){if(!O.test(T))throw new Error("invalid attribute:"+T);this.attributeNames[T]=this.length,this[this.length++]={qName:T,value:x,offset:N}},length:0,getLocalName:function(T){return this[T].localName},getLocator:function(T){return this[T].locator},getQName:function(T){return this[T].qName},getURI:function(T){return this[T].uri},getValue:function(T){return this[T].value}};function we(T,x){var N,te=[],K=/'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;for(K.lastIndex=x,K.exec(T);N=K.exec(T);)if(te.push(N),N[1])return te}ee.XMLReader=be,ee.ParseError=_e},5175:function(xe,ee,z){"use strict";var Y=z(1354),A=z.n(Y),G=z(6314),O=z.n(G),J=z(4417),U=z.n(J),de=new URL(z(2141),z.b),he=O()(A()),fe=U()(de);he.push([xe.id,`.vjs-svg-icon {
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
  src: url(`+fe+`) format("woff");
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

.video-js .vjs-audio-button + .vjs-menu .vjs-description-menu-item .vjs-menu-item-text .vjs-icon-placeholder,
.video-js .vjs-audio-button + .vjs-menu .vjs-main-desc-menu-item .vjs-menu-item-text .vjs-icon-placeholder {
  vertical-align: middle;
  display: inline-block;
  margin-bottom: -0.1em;
}

.video-js .vjs-audio-button + .vjs-menu .vjs-description-menu-item .vjs-menu-item-text .vjs-icon-placeholder:before,
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
`,"",{version:3,sources:["webpack://./node_modules/video.js/dist/video-js.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,4BAA4B;EAC5B,2BAA2B;EAC3B,kBAAkB;EAClB,aAAa;EACb,YAAY;AACd;AACA;EACE,wBAAwB;AAC1B;;AAEA;;EAEE,oCAAoC;AACtC;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;EACpB,2DAAqnO;EACrnO,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;;;;;EAKE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;;;;;EAKE,gBAAgB;AAClB;;AAEA;;EAEE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,sBAAsB;EACtB,WAAW;EACX,sBAAsB;EACtB,kBAAkB;EAClB,UAAU;EACV,eAAe;EACf,cAAc;EACd,mBAAmB;EACnB,kBAAkB;EAClB,yCAAyC;EACzC,mBAAmB;AACrB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,aAAa;AACf;;AAEA;;;EAGE,mBAAmB;AACrB;;AAEA;EACE,oBAAoB;EACpB,kBAAkB;EAClB,oBAAoB;EACpB,4BAA4B;EAC5B,cAAc;EACd,eAAe;EACf,aAAa;EACb,gBAAgB;AAClB;;AAEA;;;;;EAKE,WAAW;EACX,eAAe;AACjB;;AAEA;;;;;EAKE,SAAS;AACX;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,UAAU;EACV,SAAS;EACT,YAAY;AACd;;AAEA;;EAEE,eAAe;EACf,gBAAgB;EAChB,aAAa;EACb,OAAO;EACP,MAAM;EACN,SAAS;EACT,QAAQ;AACV;;AAEA;;EAEE,sBAAsB;EACtB,uBAAuB;EACvB,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,cAAc;EACd,oCAAoC;EACpC,cAAc;EACd,kBAAkB;EAClB,WAAW;AACb;;AAEA;;;EAGE,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,kBAAkB;EAClB,MAAM;EACN,UAAU;AACZ;;AAEA;EACE,yBAAyB;EACzB,qBAAqB;EACrB,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,WAAW;EACX,sBAAsB;EACtB,eAAe;EACf,yCAAyC;EACzC,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,gBAAgB;AAClB;;AAEA;;EAEE,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,iBAAiB;EACjB,UAAU;EACV,cAAc;EACd,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;EACf,UAAU;EACV,4BAA4B;EAC5B,yBAAyB;EACzB,uCAAuC;EACvC,oBAAoB;EACpB,oBAAoB;AACtB;AACA;EACE,UAAU;EACV,WAAW;EACX,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,cAAc;EACd,gCAAgC;AAClC;;AAEA;;EAEE,kBAAkB;EAClB,yBAAyB;EACzB,0CAA0C;EAC1C,kBAAkB;AACpB;;AAEA;;;;EAIE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,cAAc;EACd,qBAAqB;EACrB,kBAAkB;EAClB,oBAAoB;EACpB,oBAAoB;EACpB,qBAAqB;EACrB,gBAAgB;EAChB,wBAAwB;OAEnB,gBAAgB;AACvB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,eAAe;EACf,WAAW;EACX,kBAAkB;EAClB,QAAQ;EACR,UAAU;EACV,UAAU;AACZ;AACA;EACE,8BAA8B;EAC9B,+EAA+E;EAC/E,cAAc;AAChB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,cAAc;EACd,UAAU;EACV,SAAS;EACT,yCAAyC;EACzC,cAAc;AAChB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,gBAAgB;EAChB,SAAS;EACT,gBAAgB;EAChB,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;;;EAGE,yBAAyB;EACzB,0CAA0C;AAC5C;;AAEA;;;;EAIE,sBAAsB;EACtB,cAAc;AAChB;AACA;;;;EAIE,aAAa;AACf;;AAEA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,yBAAyB;EACzB,cAAc;EACd,gBAAgB;EAChB,UAAU;EACV,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,UAAU;EACV,WAAW;EACX,oBAAoB;EACpB,uCAAuC;AACzC;;AAEA;EACE,WAAW;EACX,UAAU;AACZ;;AAEA;EACE,yBAAyB;EACzB,uCAAuC;EACvC,kBAAkB;EAClB,WAAW;EACX,aAAa;EACb,gBAAgB;AAClB;;AAEA;;EAEE,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;EAGE,gBAAgB;AAClB;;AAEA;;EAEE,cAAc;AAChB;;AAEA;EACE,oBAAoB;EACpB,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;AACtB;;AAEA;;;EAGE,WAAW;AACb;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,SAAS;EACT,MAAM;EACN,UAAU;EACV,SAAS;EACT,oBAAoB;AACtB;;AAEA;;;EAGE,cAAc;EACd,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,QAAQ;EACR,WAAW;EACX,yBAAyB;EACzB,uCAAuC;AACzC;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;;EAEE,aAAa;EACb,mBAAmB;EACnB,UAAU;EACV,yCAAyC;AAC3C;;AAEA;EACE,mBAAmB;EACnB,UAAU;EACV,oBAAoB;EACpB,qCAAqC;AACvC;;AAEA;;;EAGE,wBAAwB;AAC1B;;AAEA;;EAEE,UAAU;EACV,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,UAAU;EACV,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;;;EAGE,8BAA8B;AAChC;;AAEA;EACE,SAAS;EACT,mBAAmB;EACnB,WAAW;EACX,gBAAgB;EAChB,UAAU;EACV,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;EACf,UAAU;EACV,aAAa;EACb,mBAAmB;EACnB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,oBAAoB;EACpB,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,cAAc;AAChB;;AAEA;;;EAGE,kBAAkB;EAClB,cAAc;EACd,YAAY;EACZ,SAAS;EACT,UAAU;EACV,QAAQ;AACV;;AAEA;EACE,sBAAsB;AACxB;AACA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,qCAAqC;AACvC;;AAEA;EACE,sBAAsB;EACtB,0CAA0C;EAC1C,oBAAoB;EACpB,WAAW;EACX,YAAY;EACZ,yCAAyC;EACzC,cAAc;EACd,wBAAwB;EACxB,oBAAoB;EACpB,kBAAkB;EAClB,WAAW;EACX,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,cAAc;EACd,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,UAAU;EACV,YAAY;EACZ,sBAAsB;EACtB,UAAU;AACZ;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,qCAAqC;AACvC;;AAEA;EACE,WAAW;EACX,sBAAsB;EACtB,oCAAoC;AACtC;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,UAAU;EACV,yBAAyB;EACzB,eAAe;EACf,2BAA2B;EAC3B,0BAA0B;EAC1B,yBAAyB;EACzB,kEAAkE;OAE7D,qBAAiB;MAAjB,iBAAiB;EACtB,yBAAyB;EACzB,0CAA0C;AAC5C;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,8BAA8B;EAC9B,wBAAwB;AAC1B;;AAEA;EACE,eAAe;EACf,UAAU;AACZ;AACA;EACE,eAAe;EACf,iBAAiB;EACjB,aAAa;AACf;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,UAAU;EACV,UAAU;EACV,WAAW;EACX,iBAAiB;AACnB;;AAEA;EACE,oBAAoB;AACtB;AACA;EACE,mBAAmB;EACnB,UAAU;EACV,kBAAkB;EAClB,mFAAmF;AACrF;AACA;EACE,UAAU;EACV,WAAW;EACX,eAAe;AACjB;AACA;EACE,YAAY;EACZ,mBAAmB;AACrB;AACA;EACE,WAAW;EACX,sBAAsB;AACxB;AACA;EACE,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,UAAU;EACV,aAAa;EACb,uFAAuF;AACzF;;AAEA;EACE,oFAAoF;AACtF;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,UAAU;EACV,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;AACA;EACE,WAAW;EACX,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;AACA;EACE,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,2BAA2B;AAC7B;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,UAAU;EACV,WAAW;EACX,WAAW;EACX,yBAAyB;EACzB,uCAAuC;AACzC;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,sBAAsB;EACtB,0CAA0C;EAC1C,oBAAoB;EACpB,WAAW;EACX,YAAY;EACZ,yCAAyC;EACzC,cAAc;EACd,wBAAwB;EACxB,oBAAoB;EACpB,kBAAkB;EAClB,WAAW;EACX,kBAAkB;EAClB,UAAU;AACZ;;AAEA;;EAEE,cAAc;EACd,cAAc;EACd,mBAAmB;AACrB;;AAEA;;EAEE,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,WAAW;EACX,WAAW;EACX,sBAAsB;EACtB,UAAU;AACZ;;AAEA;EACE,UAAU;EACV,YAAY;AACd;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,qCAAqC;AACvC;;AAEA;EACE,WAAW;EACX,sBAAsB;EACtB,oCAAoC;AACtC;;AAEA;EACE,qBAAqB;EACrB,sBAAsB;EACtB,eAAe;EACf,SAAS;EACT,UAAU;EACV,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,YAAY;AACd;;AAEA;;EAEE,aAAa;AACf;;AAEA;;;EAGE,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,YAAY;EAET,mBAAmB;AACxB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,UAAU;EACV,cAAc;EACd,gBAAgB;AAClB;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,eAAe;EACf,UAAU;EACV,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,oBAAoB;EACpB,cAAc;EACd,gBAAgB;EAChB,WAAW;EACX,cAAc;AAChB;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,UAAU;EACV,WAAW;EACX,oBAAoB;EACpB,aAAa;AACf;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,UAAU;EACV,cAAc;EACd,gBAAgB;EAChB,cAAc;EACd,WAAW;EACX,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;;;;EAIE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,OAAO;EACP,QAAQ;EACR,MAAM;EACN,oBAAoB;AACtB;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;;EAEE,6BAA6B;AAC/B;;AAEA;EACE,6BAA6B;EAC7B,qBAAqB;AACvB;;AAEA;EACE,eAAe;EACf,UAAU;AACZ;AACA;;EAEE,aAAa;AACf;;AAEA;EACE,eAAe;EACf,UAAU;AACZ;AACA;;EAEE,aAAa;AACf;;AAEA;;EAEE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;AACd;;AAEA;EACE,oBAAoB;EACpB,gBAAgB;EAChB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,SAAS;AACX;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,gBAAgB;EAChB,yCAAyC;EACzC,sBAAsB;EACtB,4BAA4B;EAC5B,UAAU;EACV,WAAW;EACX,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;;EAEE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,mDAAmD;AACrD;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,WAAW;EACX,kBAAkB;EAClB,mBAAmB;EACnB,cAAc;EACd,eAAe;EACf,sBAAsB;EACtB,UAAU;EACV,eAAe;EACf,yBAAyB;EACzB,uBAAuB;AACzB;;AAEA;;;;EAIE,+GAA+G;AACjH;;AAEA;;EAEE,oCAAoC;AACtC;;AAEA;;EAEE,oCAAoC;EACpC,sBAAsB;AACxB;;AAEA;EACE;IACE,mBAAmB;EACrB;AACF;AACA;EACE;IACE,yBAAyB;EAC3B;AACF;AACA;EACE;IACE,yBAAyB;EAC3B;EACA;IACE,yBAAyB;EAC3B;EACA;IACE,uBAAuB;EACzB;EACA;IACE,yBAAyB;EAC3B;EACA;IACE,yBAAyB;EAC3B;AACF;AACA;EACE,aAAa;AACf;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,sBAAsB;EACtB,qBAAqB;EACrB,qBAAqB;AACvB;;AAEA;EACE,oBAAoB;EACpB,gBAAgB;EAChB,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,sBAAsB;EACtB,qBAAqB;EACrB,qBAAqB;AACvB;;AAEA;;EAEE,oBAAoB;EACpB,iBAAiB;EACjB,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;;;;;;;;;;;;;;;;EAgBE,aAAa;AACf;AACA;EACE,WAAW;EACX,cAAc;AAChB;AACA;EACE,aAAa;AACf;AACA;EACE,UAAU;EACV,cAAc;AAChB;;AAEA;EACE,yBAAyB;EACzB,wCAAwC;EACxC,WAAW;EACX,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;;;EAGE,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,sBAAsB;AACxB;;AAEA;EACE;IACE,aAAa;IACb,8BAA8B;IAC9B,uBAAuB;IACvB,2BAA2B;EAC7B;EACA;IACE,mBAAmB;EACrB;EACA;IACE,iBAAiB;EACnB;EACA;;;IAGE,0BAA0B;EAC5B;AACF;AACA;EACE,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,qBAAqB;EACrB,sBAAsB;AACxB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;;EAEE,oBAAoB;EACpB,qBAAqB;EACrB,+DAA+D;AACjE;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,sBAAsB;EACtB,kEAAkE;EAClE,cAAc;EACd,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,8BAA8B;EAC9B,yGAAyG;EACzG,gBAAgB;EAChB,gBAAgB;EAChB,wBAAwB;EACxB,4BAA4B;EAC5B,oBAAoB;EACpB,kBAAkB;EAClB,MAAM;EACN,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,SAAS;EACT,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,sBAAsB;AACxB;;AAEA;EACE,UAAU;EACV,sBAAsB;AACxB;;AAEA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE;IACE,kBAAkB;EACpB;AACF;AACA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,cAAc;AAChB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;AACf",sourcesContent:[`.vjs-svg-icon {
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
  src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAABUgAAsAAAAAItAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAAPgAAAFZRiV33Y21hcAAAAYQAAAEJAAAD5p42+VxnbHlmAAACkAAADwwAABdk9R/WHmhlYWQAABGcAAAAKwAAADYn8kSnaGhlYQAAEcgAAAAdAAAAJA+RCL1obXR4AAAR6AAAABMAAAC8Q44AAGxvY2EAABH8AAAAYAAAAGB7SIHGbWF4cAAAElwAAAAfAAAAIAFAAI9uYW1lAAASfAAAASUAAAIK1cf1oHBvc3QAABOkAAABfAAAAnXdFqh1eJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGR7xDiBgZWBgaWQ5RkDA8MvCM0cwxDOeI6BgYmBlZkBKwhIc01hcPjI+FGPHcRdyA4RZgQRADbZCycAAHic7dPXbcMwAEXRK1vuvffem749XAbKV3bjBA6fXsaIgMMLEWoQJaAEFKNnlELyQ4K27zib5PNF6vl8yld+TKr5kH0+cUw0xv00Hwvx2DResUyFKrV4XoMmLdp06NKjz4AhI8ZMmDJjzoIlK9Zs2LJjz4EjJ85cuHLjziPe/0UWL17mf2tqKLz/9jK9f8tXpGCoRdPKhtS0RqFkWvVQNtSKoVYNtWaoddPXEBqG2jQ9XWgZattQO4baNdSeofYNdWCoQ0MdGerYUCeGOjXUmaHODXVhqEtDXRnq2lA3hro11J2h7g31YKhHQz0Z6tlQL4Z6NdSbod4N9WGoT9MfHF6GmhnZLxyDcRMAAAB4nJ1YC1gUV5auc6urCmxEGrq6VRD6ATQP5dHPKK8GRIyoKApoEBUDAiGzGmdUfKNRM4qLZrUZdGKcGN/GZJKd0SyOWTbfbmZ2NxqzM5IxRtNZd78vwYlJdtREoO7sudVNq6PmmxmKqrqPU+eee173P80Bh39Cu9DOEY4DHZBK3i20D/QRLcfxbE5sEVtwLpZzclw4ibFIkSCJUcZ4MBpMnnzwuKNsGWBL5i3qy6kO2dVpvUpKbkAP9fq62rdeGJ+TM/7C1nbIutfuWrWk5ci4zMxxR1qW/N+9JsmCGXj9VKWhFx/6tr/nz78INDm2C9yPF/fDcxLuyKxLBZ1ZBz2QTi+RSkiH5RrDQJ/GgGQadX9m0YSURs7GpSG905Zsk41uj14yul1OtieZ7QUk5GRG/YiS7PYYPSAZNRed9sq3+bOpz00rKb7pe/ZEZvbALxZAHT3AFoH8GXP3rt67QFn40kt8W13FjLTDb48c+fSi5/7h0P4dL5yz7DPtbmgmYxfQA9RL2+EOfTcvdp+1vmuBpvOll1As1S6ak0IvJzC7sKWJFtJgBd2uWcg+0Zyg7dzQfhcjXRgXGZRf5/a4A58IDU777Nl252AUk4m2ByRRjqTNqIDCEJeAnU3iCFwrkrNwXEzg4yFevBwypzxkcX+AIfk3VEKl3XmWbT8788SzvpvFJaiOezL6QyuSr9VNf97csNu0z3LuhR0wATUxZAfVBwVOy+nQFhxYdWaXlXe4HC4zWGWzzsrLDtmhI9pOWOHv7PTT7XybH1Z0+v2d5Abd3kmG+TsH23CS/KwTxx/JkzEwx6jcQOUc42LLwHJ/J93uZ9ygh3HuZGwqsY9dWDHQ58dxNqyqKRQTYdxwTubiOSs3FiMDkq0WSZQgCT0GBDOg2lxOAd1FlPVGs4AKBAcYHHaP2wPkHaivmLF5zYqnIZrvcHx5gN4k/6tchNW1DtdgNL2KrxEkS/kfnIHoVnp1VjmjpTf5r0lTzLj0mdS28tX+XGorU364eMPmnWVl8J36nlKGw3CZhjEiuMw8h8mKvhGD+4/lElBWjAhLJMg6fTw4zPZ8cOmcGQBm2Qxml1nAm13CpYGq1JKUlJJUzQn1PTAO0mgv6VMMpA/DuRfSWEu4lDIxdbAtdWIKvnn2Vk766CWfz9fpY0sH/UpdP50rfszaVpdVRmvIejEdLMk45s4Bu0EWHjeOySmFyZSiMahvZdNSn29peoI/YexYfKQTLeurTXXwEVLeSfInTWHkkMaeUx7sBvOCSTSj3AlcKjfueyS36tCrXDlgRtF0etFq9jhc1kfKuBT/OwMr0F4UUTTh1AN0g20+H/ScPcsIEsYu9d/zN5PmjprPtNwI1ZZcDK6iC97Mcjp2y2aX36f+QbpGHrgRuHlXJ+Zf6PFRL2uQSp8vxHeF2IoRb8Rd2rhMzsNxSRmEuKK4JFnkojhMcx6jzqHzGMGFcW+MhBj0bhf6cowN+45I4LHvwT6fteu7M42wGRI/pxcg6/MZdEvt1U1XaulHFXuLmqov/MukvRVL35/b3ODM1+4aPjtzeK7zmUkV2h3DN54HaQ9GzJvxHRb6Ks2gB81fwqraT+A7GvZJrRLRofU6G0urNL+zFw3v0FaVDFxsKEZW56F31r6ip6vOL+FCObBPuIMRiXld9RaMdLzRIOGhPey2T9vA/35DmZPK9IWaT9d/WgOGMieYqJ/dzjLIhZU118gbysxrNUGefxD6UO/hyNNllpFTOIbx32kSFQctnweV5PxTMHLjRqiAN+fQE9gL+Xy5WB6MOS4GJJuYbDUHhcKDhHGRbLzOpjsjdM1+iwAZLGeieehACX2hhI7SjK/ZUTNrvVje31TxJiFBGYViWFkCn9PMeX9fS6qVbzfCj4fOCTzDnuWy2c4xA7mdNkA3RS9FH2VeqzdCBlixxbzXjvkHU1I8BOYFb1pZvPIHSSIj4svT8xpzcxtXN+ZKyjdDvbz08niiF3PqV9Tn5NST8vg48MTaY8E5xqSSIsWoWHo+LtAzxdH/GDUyp37CBEYfso04F/NlMTcDJUTpECLY0HFGQHImE8xsEUdgnrQlixIvGhJA1BvxpDHGxEMBYFeNOHcBJlSjwe2JcSfbBEsGOPPBHg/6SBBOCsLLw0SpUxod0Z1bFMfLkbQ3UiZxEyd0Dx8t+SRBu18Q9msFbI4e3p1THEfkSEh7kEJ5orR10qTWDvbgPWn5aWvCYyOAjwgXyjJi34uMjo58L25cmRAeQZWI2PA1QQLsPESAH8WGFwZZ4SPoR73BHPzIPMJj9AreBzKUmrH4todT18ANvi1oc3YGjUT/0j+ExUwq8PI9BLaCQIpvewwYu2evAG/Vo/5avPdY7o+BemLLXw3y+AdkzP9bpIxB1wm5EYq8fesHbPEPtm6HrHvtx4jcGPR8fDDpkZBefIjB46QnlUNRltv4Z/pO/J6dxEjhYAtmoMeq+GozvUVvNYOW3m6GCIhoprcfr97B8AcIQYsfD8ljUvGNjvkrpj0ETA48ZMIxCeqsRIsQALE0gi2GB+glSOfbOjW3GSBM9yPq8/rpJXrJDz0BPxV6xdN4uiCGDQed3WhgFkBUZEFsmeyyBpzXrm7UGTBZG8Lh5aubFufk5eUsbrrFGr7McYdbltxa0nKYqRKbQjvikXYkTGM0f2xuyM3Ly21oXnWfvf6I1BmZwfh7EWWIYsg2nHhsDhOnczhJcmI6eBAmy3jZ3RiJmKQR/JA99FcwsfaVbNDDyi1rL9NPj9hfo61wjM6BjzOLijLpeTgk/pL+ip6tfYWupzeOgPny2tcUu9J/9mhxJlgyi985NFRbvCVewXUNXLJaW0RxZqtRYtnfYdcYomXQWdnJHQA3jiEEkeTQWcWxdDP9IvvVWvo2TK553XEMEq+s69/QDU1Q7p0zxwsm9qS379whr8NI2PJqLUyGyfNeX3eFfnJU2U+uHR9cVV1IqgurqwuV44XVp0h2qN55X5XJwtk59yP0IZuHrqBOBIuIYhkcoT6Kx79Pu2HS/IPZIMOqLWs/pteOOk4NPgEb6QAIdAPsyZk5Mwd+wVaHMexJv719W7xCu2l37UG6lvYdBcvHa08p89741zd63phTRGqL5ggo6SlvdbWXzCqsPq78NnSu7wnKy2HNZbVoRCI7UJEOyRj+sPE002tOOY7Qa5fXboFWkLNeqYUSZRocp9XwSUZxcQZ9Hw6LV2pOoVmvHQEDbGIENEG5i6bLgMSM4n8+FNLTtAds99DaWEvgcf4o5SyYe9x+kF6/tGoTPAdRmS/XQIEy//QxKC2oqioAI3tS5auvxCtzT6y6RK8fhChYcwCJaMJhxc0vqSxQ/qmgsrKAlBZUHlauheTpvd9uj5DnLzJct6qfq5fXbYHVIGcfrIVJihbaVLu1wW7Vbs8zK0A8e9Jvb91S9cVMjPrazD6gpfeZTXzYbCFMcppVRsGMpp55OWgx1/3JeAxW1Y7AORgM/m3rWrsdLkQVmEVSU16cX/e7uvkvpqRiQsG06XJ0t64Tf+l0nG1dt025gyOIZlvq5u9KSU1N2TW/rsWnnMRPyTDkctbhvIcNvYIXWyLzdwYLoYesUbaQG4iK2cWO2gdpeUYLqDD0MUTOPhDIGnZEs58yArR86FznuWEsU4YDi2x26dA4klkn8Qa6vhk2QUfX4Jxm/ngX9r7ogn1dmlmwqZmuhxtdg9XN/DEcUgqb+9hMyNansfaQET2mcROCmGEMVqxm5u+h6kN2MOwgqykV2wH9yQG9DvVFU38Pogaf4FVuE62KI/oJ02RDdWW2w5dqQwU/8+N1q1DlvsL863u61KLE7x/o8w0VJQM/Y/SQ3unIrqxueEa1BqT5VFNsO7p39/UC771a77RowpaKe9nvJQIT1Pog5LGx8XblBKmCNGTf3xMogAQvPnz9PYKX/08sVDTG1OKUlOLUgS/UaZtm1NAaYTsl7i9ZQ+L6O4Rl0OGa577LuWvc+C+x96/vYh0lLBuM+7XwI/dTLtdT7v4d6rRTWDnku0IBrqFnZ5bVIqKP8lasJlithWnaLhTsr8qFJBulF/70p4undou36HeTJ5+jv1fCybeQ8nH3+Xv6aENczmOFlab+hqMDg1rLOt12A+tiUFrYDwQ6c3RUJp601nzegTNX6WlYAI2zSUV945F6zU56ZmZVQaWspWcIADxJ9GmljQUnL2p2Dpr5T8H+5KJFu+vqBq8qvyHRzStLHPEO5SPYCV9nZe0yZT2RcH0oHvegSzNEJ0oGWU8iQWM12dgPEugngVceGIwZgPFp0BiT1a0a3R5Rcot7ihfA1J/20v96jX7zmTX9s583H0kwx6WnLd09cXrR9LGroOa9sHNbdyz8wcKk5lqhaVFJZNwmqtw884MXNdvJujpBa3xzuSaZH9sxa06Z7x+HJSduPbdYHv/DgmEhfbehvlmGN7JUkcG78GDM12CeyFFTPNqVeNxC1gzjz+c2nVo63Xxs8rKJWXoBJM0tmEbfGm4qzpoOH3xpzQfyxLzW1gnE9NHo6tol1eMEic4ZVPrjnVi0kqAe2sQ2bgqupScaq8WGlUWgWHI51SKJl/UYT6zccNsCSkBtiVZLsiefuFSDYT3Fi8Zk7EUnmjTRYtsFeuDDJS05MW79M3mr3mla+d8dzac31KTPmBYfFiYSUef48PhPjm9ryZsSGZZkdNvzq0Y9rdNcwDq5Dg5C3QW+7UN64IKptvS3tvHbvu5c9pv1Exau21rc9LIpwpQwUjTq8576yeVDz5+4WZ1nXT43wV60rPLJbDp/UksNrP3iQ2SA63Pst058gOYDbhRnRUw8l/sRt4HbxPzO4WYpInCpuVgSbVh6JXuwnnJngKTTCwaPWmG5Xbhpm1U0Yt3FyBGpGYemPM77p2TD904JjgJ2QFpFLeYpGx8X15Qx1Zk31p5ki9ZLUuXE0lmuJlcakJMVLeFS1iIvrB8drY0aloilakqCZwzwRORtxlgwxS4IThggJd4TDxoiaAIT80fFPGrCPPru+puFn504P/ybr4ihA/6dKASLshEJic7xE8tmzu3KzA7TABBe8y5fNbWo3ilQn/SuFKM16b2l5bOeayqfGhYmhIulU+fVNDdWVv4NMzX10MBHyPR5uhWUu8D9P1VnIMt4nGNgZGBgAOJ/1bf64vltvjJwszOAwAOlmqvINEc/WJyDgQlEAQA+dgnjAHicY2BkYGBnAAGOPgaG//85+hkYGVCBPgBGJwNkAAAAeJxjYGBgYB/EmKMPtxwAhg4B0gAAAAAAAA4AaAB+AMwA4AECAUIBbAGYAe4CLgKKAtAC/ANiA4wDqAPgBDAEsATaBQgFWgXABggGLgZwBqwG9gdOB4oH0ggqCHAIhgicCMgJJAlWCYgJrAnyCkAKdgrkC7J4nGNgZGBg0GdoZmBnAAEmIOYCQgaG/2A+AwAaqwHQAHicXZBNaoNAGIZfE5PQCKFQ2lUps2oXBfOzzAESyDKBQJdGR2NQR3QSSE/QE/QEPUUPUHqsvsrXjTMw83zPvPMNCuAWP3DQDAejdm1GjzwS7pMmwi75XngAD4/CQ/oX4TFe4Qt7uMMbOzjuDc0EmXCP/C7cJ38Iu+RP4QEe8CU8pP8WHmOPX2EPz87TPo202ey2OjlnQSXV/6arOjWFmvszMWtd6CqwOlKHq6ovycLaWMWVydXKFFZnmVFlZU46tP7R2nI5ncbi/dDkfDtFBA2DDXbYkhKc+V0Bqs5Zt9JM1HQGBRTm/EezTmZNKtpcAMs9Yu6AK9caF76zoLWIWcfMGOSkVduvSWechqZsz040Ib2PY3urxBJTzriT95lipz+TN1fmAAAAeJxtkXlT2zAQxf1C4thJAwRajt4HRy8VMwwfSJHXsQZZcnUQ+PYoTtwpM+wf2t9brWZ2n5JBsol58nJcYYAdDDFCijEy5JhgileYYRd72MccBzjEa7zBEY5xglO8xTu8xwd8xCd8xhd8xTec4RwXuMR3/MBP/MJvMPzBFYpk2Cr+OF0fTEgrFI1aHhxN740KDbEmeJpsWZlVj40s+45aLuv9KijlhCXSjLQnu/d/4UH6sWul1mRzFxZeekUuE7z10mg3qMtM1FGQddPSrLQyvJR6OaukItYXDp6pCJrmz0umqkau5pZ2hFmm7m+ImG5W2t0kZoJXUtPhVnYTbbdOBdeCVGqpJe7XKTqSbRK7zbdwXfR0U+SVsStuS3Y76em6+Ic3xYiHUppc04Nn0lMzay3dSxNcp8auDlWlaCi48yetFD7Y9USsx87G45cuop1ZxQUtjLnL4j53FO0a+5X08UXqQ7NQNo92R0XOz7sxWEnxN2TneJI8Acttu4Q=) format("woff");
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
  -o-object-fit: contain;
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

.video-js .vjs-audio-button + .vjs-menu .vjs-description-menu-item .vjs-menu-item-text .vjs-icon-placeholder,
.video-js .vjs-audio-button + .vjs-menu .vjs-main-desc-menu-item .vjs-menu-item-text .vjs-icon-placeholder {
  vertical-align: middle;
  display: inline-block;
  margin-bottom: -0.1em;
}

.video-js .vjs-audio-button + .vjs-menu .vjs-description-menu-item .vjs-menu-item-text .vjs-icon-placeholder:before,
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
`],sourceRoot:""}]),ee.A=he},4417:function(xe){"use strict";xe.exports=function(ee,z){return z||(z={}),ee&&(ee=String(ee.__esModule?ee.default:ee),/^['"].*['"]$/.test(ee)&&(ee=ee.slice(1,-1)),z.hash&&(ee+=z.hash),/["'() \t\n]|(%20)/.test(ee)||z.needQuotes?'"'.concat(ee.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):ee)}},2916:function(xe,ee,z){"use strict";var Y=z(4994);Object.defineProperty(ee,"__esModule",{value:!0}),ee.default=void 0;var A=Y(z(6540)),G=function(U){var de=U.children;return A.default.createElement("div",{style:{width:"100%",minHeight:"calc(100vh - 232px)"}},de)},O=ee.default=G},7049:function(xe,ee,z){"use strict";var Y=z(4994);Object.defineProperty(ee,"__esModule",{value:!0}),ee.default=ee.VideoJS=void 0;var A=Y(z(6540)),G=Y(z(576));z(8692);var O=ee.VideoJS=function(de){var he=A.default.useRef(null),fe=A.default.useRef(null),se=de.options,Pe=de.onReady;return A.default.useEffect(function(){if(fe.current){var be=fe.current;be.autoplay(se.autoplay),be.src(se.sources)}else{var Q=document.createElement("video-js");Q.classList.add("vjs-big-play-centered"),he.current.appendChild(Q);var _e=fe.current=(0,G.default)(Q,se,function(){G.default.log("player is ready"),Pe&&Pe(_e)})}},[se,he]),A.default.useEffect(function(){var Q=fe.current;return function(){Q&&!Q.isDisposed()&&(Q.dispose(),fe.current=null)}},[fe]),A.default.createElement("div",{"data-vjs-player":!0},A.default.createElement("div",{ref:he}))},J=ee.default=O},9676:function(xe,ee,z){"use strict";var Y=z(4994);Object.defineProperty(ee,"__esModule",{value:!0}),ee.default=void 0;var A=Y(z(6540)),G=Y(z(2916)),O=Y(z(7049)),J=function(){var he=A.default.useRef(null),fe={autoplay:!0,controls:!0,responsive:!0,fluid:!0,sources:[{src:"https://placehold.co/1920x1080.mp4",type:"video/mp4"}]},se=function(Q){he.current=Q,Q.on("waiting",function(){}),Q.on("dispose",function(){})};return A.default.createElement(G.default,null,A.default.createElement("div",{style:{width:900}},A.default.createElement(O.default,{options:fe,onReady:se})))},U=ee.default=J},9697:function(xe,ee,z){var Y=typeof z.g!="undefined"?z.g:typeof window!="undefined"?window:{},A=z(542),G;typeof document!="undefined"?G=document:(G=Y["__GLOBAL_DOCUMENT_CACHE@4"],G||(G=Y["__GLOBAL_DOCUMENT_CACHE@4"]=A)),xe.exports=G},9840:function(xe,ee,z){var Y;typeof window!="undefined"?Y=window:typeof z.g!="undefined"?Y=z.g:typeof self!="undefined"?Y=self:Y={},xe.exports=Y},4675:function(xe){xe.exports=z;var ee=Object.prototype.toString;function z(Y){if(!Y)return!1;var A=ee.call(Y);return A==="[object Function]"||typeof Y=="function"&&A!=="[object RegExp]"||typeof window!="undefined"&&(Y===window.setTimeout||Y===window.alert||Y===window.confirm||Y===window.prompt)}},6545:function(xe,ee){function z(U){if(U&&typeof U=="object"){var de=U.which||U.keyCode||U.charCode;de&&(U=de)}if(typeof U=="number")return O[U];var he=String(U),fe=Y[he.toLowerCase()];if(fe)return fe;var fe=A[he.toLowerCase()];if(fe)return fe;if(he.length===1)return he.charCodeAt(0)}z.isEventKey=function(de,he){if(de&&typeof de=="object"){var fe=de.which||de.keyCode||de.charCode;if(fe==null)return!1;if(typeof he=="string"){var se=Y[he.toLowerCase()];if(se)return se===fe;var se=A[he.toLowerCase()];if(se)return se===fe}else if(typeof he=="number")return he===fe;return!1}},ee=xe.exports=z;var Y=ee.code=ee.codes={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,"pause/break":19,"caps lock":20,esc:27,space:32,"page up":33,"page down":34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,delete:46,command:91,"left command":91,"right command":93,"numpad *":106,"numpad +":107,"numpad -":109,"numpad .":110,"numpad /":111,"num lock":144,"scroll lock":145,"my computer":182,"my calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},A=ee.aliases={windows:91,"\u21E7":16,"\u2325":18,"\u2303":17,"\u2318":91,ctl:17,control:17,option:18,pause:19,break:19,caps:20,return:13,escape:27,spc:32,spacebar:32,pgup:33,pgdn:34,ins:45,del:46,cmd:91};/*!
 * Programatically add the following
 */for(G=97;G<123;G++)Y[String.fromCharCode(G)]=G-32;for(var G=48;G<58;G++)Y[G-48]=G;for(G=1;G<13;G++)Y["f"+G]=G+111;for(G=0;G<10;G++)Y["numpad "+G]=G+96;var O=ee.names=ee.title={};for(G in Y)O[Y[G]]=G;for(var J in A)Y[J]=A[J]},8962:function(xe,ee,z){var Y=z(3626).getUint64,A=function(G){var O=new DataView(G.buffer,G.byteOffset,G.byteLength),J={version:G[0],flags:new Uint8Array(G.subarray(1,4)),references:[],referenceId:O.getUint32(4),timescale:O.getUint32(8)},U=12;J.version===0?(J.earliestPresentationTime=O.getUint32(U),J.firstOffset=O.getUint32(U+4),U+=8):(J.earliestPresentationTime=Y(G.subarray(U)),J.firstOffset=Y(G.subarray(U+8)),U+=16),U+=2;var de=O.getUint16(U);for(U+=2;de>0;U+=12,de--)J.references.push({referenceType:(G[U]&128)>>>7,referencedSize:O.getUint32(U)&2147483647,subsegmentDuration:O.getUint32(U+4),startsWithSap:!!(G[U+8]&128),sapType:(G[U+8]&112)>>>4,sapDeltaTime:O.getUint32(U+8)&268435455});return J};xe.exports=A},9622:function(xe){var ee=9e4,z,Y,A,G,O,J,U;z=function(de){return de*ee},Y=function(de,he){return de*he},A=function(de){return de/ee},G=function(de,he){return de/he},O=function(de,he){return z(G(de,he))},J=function(de,he){return Y(A(de),he)},U=function(de,he,fe){return A(fe?de:de-he)},xe.exports={ONE_SECOND_IN_TS:ee,secondsToVideoTs:z,secondsToAudioTs:Y,videoTsToSeconds:A,audioTsToSeconds:G,audioTsToVideoTs:O,videoTsToAudioTs:J,metadataTsToSeconds:U}},3626:function(xe){var ee=Math.pow(2,32),z=function(Y){var A=new DataView(Y.buffer,Y.byteOffset,Y.byteLength),G;return A.getBigUint64?(G=A.getBigUint64(0),G<Number.MAX_SAFE_INTEGER?Number(G):G):A.getUint32(0)*ee+A.getUint32(4)};xe.exports={getUint64:z,MAX_UINT32:ee}},8865:function(xe){xe.exports=ee;function ee(z,Y){var A,G=null;try{A=JSON.parse(z,Y)}catch(O){G=O}return[G,A]}},8692:function(xe,ee,z){"use strict";z.r(ee);var Y=z(5072),A=z.n(Y),G=z(7825),O=z.n(G),J=z(7659),U=z.n(J),de=z(5056),he=z.n(de),fe=z(540),se=z.n(fe),Pe=z(1113),Q=z.n(Pe),_e=z(5175),be={};be.styleTagTransform=Q(),be.setAttributes=he(),be.insert=U().bind(null,"head"),be.domAPI=O(),be.insertStyleElement=se();var We=A()(_e.A,be);ee.default=_e.A&&_e.A.locals?_e.A.locals:void 0},7842:function(xe){(function(ee){var z=/^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/,Y=/^(?=([^\/?#]*))\1([^]*)$/,A=/(?:\/|^)\.(?=\/)/g,G=/(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g,O={buildAbsoluteURL:function(J,U,de){if(de=de||{},J=J.trim(),U=U.trim(),!U){if(!de.alwaysNormalize)return J;var he=O.parseURL(J);if(!he)throw new Error("Error trying to parse base URL.");return he.path=O.normalizePath(he.path),O.buildURLFromParts(he)}var fe=O.parseURL(U);if(!fe)throw new Error("Error trying to parse relative URL.");if(fe.scheme)return de.alwaysNormalize?(fe.path=O.normalizePath(fe.path),O.buildURLFromParts(fe)):U;var se=O.parseURL(J);if(!se)throw new Error("Error trying to parse base URL.");if(!se.netLoc&&se.path&&se.path[0]!=="/"){var Pe=Y.exec(se.path);se.netLoc=Pe[1],se.path=Pe[2]}se.netLoc&&!se.path&&(se.path="/");var Q={scheme:se.scheme,netLoc:fe.netLoc,path:null,params:fe.params,query:fe.query,fragment:fe.fragment};if(!fe.netLoc&&(Q.netLoc=se.netLoc,fe.path[0]!=="/"))if(!fe.path)Q.path=se.path,fe.params||(Q.params=se.params,fe.query||(Q.query=se.query));else{var _e=se.path,be=_e.substring(0,_e.lastIndexOf("/")+1)+fe.path;Q.path=O.normalizePath(be)}return Q.path===null&&(Q.path=de.alwaysNormalize?O.normalizePath(fe.path):fe.path),O.buildURLFromParts(Q)},parseURL:function(J){var U=z.exec(J);return U?{scheme:U[1]||"",netLoc:U[2]||"",path:U[3]||"",params:U[4]||"",query:U[5]||"",fragment:U[6]||""}:null},normalizePath:function(J){for(J=J.split("").reverse().join("").replace(A,"");J.length!==(J=J.replace(G,"")).length;);return J.split("").reverse().join("")},buildURLFromParts:function(J){return J.scheme+J.netLoc+J.path+J.params+J.query+J.fragment}};xe.exports=O})(this)},576:function(xe,ee,z){"use strict";z.r(ee),z.d(ee,{default:function(){return M}});var Y=z(9840),A=z.n(Y),G=z(9697),O=z.n(G),J=z(6545),U=z.n(J),de=z(8865),he=z.n(de),fe=z(1036),se=z.n(fe),Pe=z(4784),Q=z.n(Pe),_e=z(8168),be=z(7842),We=z.n(be),vt="http://example.com",et=function(e,t){if(/^[a-z]+:/i.test(t))return t;/^data:/.test(e)&&(e=A().location&&A().location.href||"");var i=typeof A().URL=="function",s=/^\/\//.test(e),r=!A().location&&!/\/\//i.test(e);if(i?e=new(A()).URL(e,A().location||vt):/\/\//i.test(e)||(e=We().buildAbsoluteURL(A().location&&A().location.href||"",e)),i){var a=new URL(t,e);return r?a.href.slice(vt.length):s?a.href.slice(a.protocol.length):a.href}return We().buildAbsoluteURL(e,t)},ne=et,ge=function(){function n(){this.listeners={}}var e=n.prototype;return e.on=function(i,s){this.listeners[i]||(this.listeners[i]=[]),this.listeners[i].push(s)},e.off=function(i,s){if(!this.listeners[i])return!1;var r=this.listeners[i].indexOf(s);return this.listeners[i]=this.listeners[i].slice(0),this.listeners[i].splice(r,1),r>-1},e.trigger=function(i){var s=this.listeners[i];if(s)if(arguments.length===2)for(var r=s.length,a=0;a<r;++a)s[a].call(this,arguments[1]);else for(var l=Array.prototype.slice.call(arguments,1),h=s.length,p=0;p<h;++p)s[p].apply(this,l)},e.dispose=function(){this.listeners={}},e.pipe=function(i){this.on("data",function(s){i.push(s)})},n}(),Ce=z(8287).hp,Oe=function(e){return A().atob?A().atob(e):Ce.from(e,"base64").toString("binary")};function ve(n){for(var e=Oe(n),t=new Uint8Array(e.length),i=0;i<e.length;i++)t[i]=e.charCodeAt(i);return t}/*! @name m3u8-parser @version 7.1.0 @license Apache-2.0 */class Ue extends ge{constructor(){super(),this.buffer=""}push(e){let t;for(this.buffer+=e,t=this.buffer.indexOf(`
`);t>-1;t=this.buffer.indexOf(`
`))this.trigger("data",this.buffer.substring(0,t)),this.buffer=this.buffer.substring(t+1)}}const Ne="	",we=function(n){const e=/([0-9.]*)?@?([0-9.]*)?/.exec(n||""),t={};return e[1]&&(t.length=parseInt(e[1],10)),e[2]&&(t.offset=parseInt(e[2],10)),t},T=function(){const t="(?:"+"[^=]*"+")=(?:"+'"[^"]*"|[^,]*'+")";return new RegExp("(?:^|,)("+t+")")},x=function(n){const e={};if(!n)return e;const t=n.split(T());let i=t.length,s;for(;i--;)t[i]!==""&&(s=/([^=]*)=(.*)/.exec(t[i]).slice(1),s[0]=s[0].replace(/^\s+|\s+$/g,""),s[1]=s[1].replace(/^\s+|\s+$/g,""),s[1]=s[1].replace(/^['"](.*)['"]$/g,"$1"),e[s[0]]=s[1]);return e};class N extends ge{constructor(){super(),this.customParsers=[],this.tagMappers=[]}push(e){let t,i;if(e=e.trim(),e.length===0)return;if(e[0]!=="#"){this.trigger("data",{type:"uri",uri:e});return}this.tagMappers.reduce((r,a)=>{const l=a(e);return l===e?r:r.concat([l])},[e]).forEach(r=>{for(let a=0;a<this.customParsers.length;a++)if(this.customParsers[a].call(this,r))return;if(r.indexOf("#EXT")!==0){this.trigger("data",{type:"comment",text:r.slice(1)});return}if(r=r.replace("\r",""),t=/^#EXTM3U/.exec(r),t){this.trigger("data",{type:"tag",tagType:"m3u"});return}if(t=/^#EXTINF:([0-9\.]*)?,?(.*)?$/.exec(r),t){i={type:"tag",tagType:"inf"},t[1]&&(i.duration=parseFloat(t[1])),t[2]&&(i.title=t[2]),this.trigger("data",i);return}if(t=/^#EXT-X-TARGETDURATION:([0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"targetduration"},t[1]&&(i.duration=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-VERSION:([0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"version"},t[1]&&(i.version=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-MEDIA-SEQUENCE:(\-?[0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"media-sequence"},t[1]&&(i.number=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-DISCONTINUITY-SEQUENCE:(\-?[0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"discontinuity-sequence"},t[1]&&(i.number=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-PLAYLIST-TYPE:(.*)?$/.exec(r),t){i={type:"tag",tagType:"playlist-type"},t[1]&&(i.playlistType=t[1]),this.trigger("data",i);return}if(t=/^#EXT-X-BYTERANGE:(.*)?$/.exec(r),t){i=(0,_e.A)(we(t[1]),{type:"tag",tagType:"byterange"}),this.trigger("data",i);return}if(t=/^#EXT-X-ALLOW-CACHE:(YES|NO)?/.exec(r),t){i={type:"tag",tagType:"allow-cache"},t[1]&&(i.allowed=!/NO/.test(t[1])),this.trigger("data",i);return}if(t=/^#EXT-X-MAP:(.*)$/.exec(r),t){if(i={type:"tag",tagType:"map"},t[1]){const a=x(t[1]);a.URI&&(i.uri=a.URI),a.BYTERANGE&&(i.byterange=we(a.BYTERANGE))}this.trigger("data",i);return}if(t=/^#EXT-X-STREAM-INF:(.*)$/.exec(r),t){if(i={type:"tag",tagType:"stream-inf"},t[1]){if(i.attributes=x(t[1]),i.attributes.RESOLUTION){const a=i.attributes.RESOLUTION.split("x"),l={};a[0]&&(l.width=parseInt(a[0],10)),a[1]&&(l.height=parseInt(a[1],10)),i.attributes.RESOLUTION=l}i.attributes.BANDWIDTH&&(i.attributes.BANDWIDTH=parseInt(i.attributes.BANDWIDTH,10)),i.attributes["FRAME-RATE"]&&(i.attributes["FRAME-RATE"]=parseFloat(i.attributes["FRAME-RATE"])),i.attributes["PROGRAM-ID"]&&(i.attributes["PROGRAM-ID"]=parseInt(i.attributes["PROGRAM-ID"],10))}this.trigger("data",i);return}if(t=/^#EXT-X-MEDIA:(.*)$/.exec(r),t){i={type:"tag",tagType:"media"},t[1]&&(i.attributes=x(t[1])),this.trigger("data",i);return}if(t=/^#EXT-X-ENDLIST/.exec(r),t){this.trigger("data",{type:"tag",tagType:"endlist"});return}if(t=/^#EXT-X-DISCONTINUITY/.exec(r),t){this.trigger("data",{type:"tag",tagType:"discontinuity"});return}if(t=/^#EXT-X-PROGRAM-DATE-TIME:(.*)$/.exec(r),t){i={type:"tag",tagType:"program-date-time"},t[1]&&(i.dateTimeString=t[1],i.dateTimeObject=new Date(t[1])),this.trigger("data",i);return}if(t=/^#EXT-X-KEY:(.*)$/.exec(r),t){i={type:"tag",tagType:"key"},t[1]&&(i.attributes=x(t[1]),i.attributes.IV&&(i.attributes.IV.substring(0,2).toLowerCase()==="0x"&&(i.attributes.IV=i.attributes.IV.substring(2)),i.attributes.IV=i.attributes.IV.match(/.{8}/g),i.attributes.IV[0]=parseInt(i.attributes.IV[0],16),i.attributes.IV[1]=parseInt(i.attributes.IV[1],16),i.attributes.IV[2]=parseInt(i.attributes.IV[2],16),i.attributes.IV[3]=parseInt(i.attributes.IV[3],16),i.attributes.IV=new Uint32Array(i.attributes.IV))),this.trigger("data",i);return}if(t=/^#EXT-X-START:(.*)$/.exec(r),t){i={type:"tag",tagType:"start"},t[1]&&(i.attributes=x(t[1]),i.attributes["TIME-OFFSET"]=parseFloat(i.attributes["TIME-OFFSET"]),i.attributes.PRECISE=/YES/.test(i.attributes.PRECISE)),this.trigger("data",i);return}if(t=/^#EXT-X-CUE-OUT-CONT:(.*)?$/.exec(r),t){i={type:"tag",tagType:"cue-out-cont"},t[1]?i.data=t[1]:i.data="",this.trigger("data",i);return}if(t=/^#EXT-X-CUE-OUT:(.*)?$/.exec(r),t){i={type:"tag",tagType:"cue-out"},t[1]?i.data=t[1]:i.data="",this.trigger("data",i);return}if(t=/^#EXT-X-CUE-IN:(.*)?$/.exec(r),t){i={type:"tag",tagType:"cue-in"},t[1]?i.data=t[1]:i.data="",this.trigger("data",i);return}if(t=/^#EXT-X-SKIP:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"skip"},i.attributes=x(t[1]),i.attributes.hasOwnProperty("SKIPPED-SEGMENTS")&&(i.attributes["SKIPPED-SEGMENTS"]=parseInt(i.attributes["SKIPPED-SEGMENTS"],10)),i.attributes.hasOwnProperty("RECENTLY-REMOVED-DATERANGES")&&(i.attributes["RECENTLY-REMOVED-DATERANGES"]=i.attributes["RECENTLY-REMOVED-DATERANGES"].split(Ne)),this.trigger("data",i);return}if(t=/^#EXT-X-PART:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"part"},i.attributes=x(t[1]),["DURATION"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseFloat(i.attributes[a]))}),["INDEPENDENT","GAP"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=/YES/.test(i.attributes[a]))}),i.attributes.hasOwnProperty("BYTERANGE")&&(i.attributes.byterange=we(i.attributes.BYTERANGE)),this.trigger("data",i);return}if(t=/^#EXT-X-SERVER-CONTROL:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"server-control"},i.attributes=x(t[1]),["CAN-SKIP-UNTIL","PART-HOLD-BACK","HOLD-BACK"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseFloat(i.attributes[a]))}),["CAN-SKIP-DATERANGES","CAN-BLOCK-RELOAD"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=/YES/.test(i.attributes[a]))}),this.trigger("data",i);return}if(t=/^#EXT-X-PART-INF:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"part-inf"},i.attributes=x(t[1]),["PART-TARGET"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseFloat(i.attributes[a]))}),this.trigger("data",i);return}if(t=/^#EXT-X-PRELOAD-HINT:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"preload-hint"},i.attributes=x(t[1]),["BYTERANGE-START","BYTERANGE-LENGTH"].forEach(function(a){if(i.attributes.hasOwnProperty(a)){i.attributes[a]=parseInt(i.attributes[a],10);const l=a==="BYTERANGE-LENGTH"?"length":"offset";i.attributes.byterange=i.attributes.byterange||{},i.attributes.byterange[l]=i.attributes[a],delete i.attributes[a]}}),this.trigger("data",i);return}if(t=/^#EXT-X-RENDITION-REPORT:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"rendition-report"},i.attributes=x(t[1]),["LAST-MSN","LAST-PART"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseInt(i.attributes[a],10))}),this.trigger("data",i);return}if(t=/^#EXT-X-DATERANGE:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"daterange"},i.attributes=x(t[1]),["ID","CLASS"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=String(i.attributes[l]))}),["START-DATE","END-DATE"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=new Date(i.attributes[l]))}),["DURATION","PLANNED-DURATION"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=parseFloat(i.attributes[l]))}),["END-ON-NEXT"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=/YES/i.test(i.attributes[l]))}),["SCTE35-CMD"," SCTE35-OUT","SCTE35-IN"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=i.attributes[l].toString(16))});const a=/^X-([A-Z]+-)+[A-Z]+$/;for(const l in i.attributes){if(!a.test(l))continue;const h=/[0-9A-Fa-f]{6}/g.test(i.attributes[l]),p=/^\d+(\.\d+)?$/.test(i.attributes[l]);i.attributes[l]=h?i.attributes[l].toString(16):p?parseFloat(i.attributes[l]):String(i.attributes[l])}this.trigger("data",i);return}if(t=/^#EXT-X-INDEPENDENT-SEGMENTS/.exec(r),t){this.trigger("data",{type:"tag",tagType:"independent-segments"});return}if(t=/^#EXT-X-CONTENT-STEERING:(.*)$/.exec(r),t){i={type:"tag",tagType:"content-steering"},i.attributes=x(t[1]),this.trigger("data",i);return}this.trigger("data",{type:"tag",data:r.slice(4)})})}addParser({expression:e,customType:t,dataParser:i,segment:s}){typeof i!="function"&&(i=r=>r),this.customParsers.push(r=>{if(e.exec(r))return this.trigger("data",{type:"custom",data:i(r),customType:t,segment:s}),!0})}addTagMapper({expression:e,map:t}){const i=s=>e.test(s)?t(s):s;this.tagMappers.push(i)}}const te=n=>n.toLowerCase().replace(/-(\w)/g,e=>e[1].toUpperCase()),K=function(n){const e={};return Object.keys(n).forEach(function(t){e[te(t)]=n[t]}),e},oe=function(n){const{serverControl:e,targetDuration:t,partTargetDuration:i}=n;if(!e)return;const s="#EXT-X-SERVER-CONTROL",r="holdBack",a="partHoldBack",l=t&&t*3,h=i&&i*2;t&&!e.hasOwnProperty(r)&&(e[r]=l,this.trigger("info",{message:`${s} defaulting HOLD-BACK to targetDuration * 3 (${l}).`})),l&&e[r]<l&&(this.trigger("warn",{message:`${s} clamping HOLD-BACK (${e[r]}) to targetDuration * 3 (${l})`}),e[r]=l),i&&!e.hasOwnProperty(a)&&(e[a]=i*3,this.trigger("info",{message:`${s} defaulting PART-HOLD-BACK to partTargetDuration * 3 (${e[a]}).`})),i&&e[a]<h&&(this.trigger("warn",{message:`${s} clamping PART-HOLD-BACK (${e[a]}) to partTargetDuration * 2 (${h}).`}),e[a]=h)};class ue extends ge{constructor(){super(),this.lineStream=new Ue,this.parseStream=new N,this.lineStream.pipe(this.parseStream),this.lastProgramDateTime=null;const e=this,t=[];let i={},s,r,a=!1;const l=function(){},h={AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},p="urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed";let g=0;this.manifest={allowCache:!0,discontinuityStarts:[],dateRanges:[],segments:[]};let _=0,w=0;const D={};this.on("end",()=>{i.uri||!i.parts&&!i.preloadHints||(!i.map&&s&&(i.map=s),!i.key&&r&&(i.key=r),!i.timeline&&typeof g=="number"&&(i.timeline=g),this.manifest.preloadSegment=i)}),this.parseStream.on("data",function(C){let I,R;({tag(){({version(){C.version&&(this.manifest.version=C.version)},"allow-cache"(){this.manifest.allowCache=C.allowed,"allowed"in C||(this.trigger("info",{message:"defaulting allowCache to YES"}),this.manifest.allowCache=!0)},byterange(){const q={};"length"in C&&(i.byterange=q,q.length=C.length,"offset"in C||(C.offset=_)),"offset"in C&&(i.byterange=q,q.offset=C.offset),_=q.offset+q.length},endlist(){this.manifest.endList=!0},inf(){"mediaSequence"in this.manifest||(this.manifest.mediaSequence=0,this.trigger("info",{message:"defaulting media sequence to zero"})),"discontinuitySequence"in this.manifest||(this.manifest.discontinuitySequence=0,this.trigger("info",{message:"defaulting discontinuity sequence to zero"})),C.title&&(i.title=C.title),C.duration>0&&(i.duration=C.duration),C.duration===0&&(i.duration=.01,this.trigger("info",{message:"updating zero segment duration to a small value"})),this.manifest.segments=t},key(){if(!C.attributes){this.trigger("warn",{message:"ignoring key declaration without attribute list"});return}if(C.attributes.METHOD==="NONE"){r=null;return}if(!C.attributes.URI){this.trigger("warn",{message:"ignoring key declaration without URI"});return}if(C.attributes.KEYFORMAT==="com.apple.streamingkeydelivery"){this.manifest.contentProtection=this.manifest.contentProtection||{},this.manifest.contentProtection["com.apple.fps.1_0"]={attributes:C.attributes};return}if(C.attributes.KEYFORMAT==="com.microsoft.playready"){this.manifest.contentProtection=this.manifest.contentProtection||{},this.manifest.contentProtection["com.microsoft.playready"]={uri:C.attributes.URI};return}if(C.attributes.KEYFORMAT===p){if(["SAMPLE-AES","SAMPLE-AES-CTR","SAMPLE-AES-CENC"].indexOf(C.attributes.METHOD)===-1){this.trigger("warn",{message:"invalid key method provided for Widevine"});return}if(C.attributes.METHOD==="SAMPLE-AES-CENC"&&this.trigger("warn",{message:"SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead"}),C.attributes.URI.substring(0,23)!=="data:text/plain;base64,"){this.trigger("warn",{message:"invalid key URI provided for Widevine"});return}if(!(C.attributes.KEYID&&C.attributes.KEYID.substring(0,2)==="0x")){this.trigger("warn",{message:"invalid key ID provided for Widevine"});return}this.manifest.contentProtection=this.manifest.contentProtection||{},this.manifest.contentProtection["com.widevine.alpha"]={attributes:{schemeIdUri:C.attributes.KEYFORMAT,keyId:C.attributes.KEYID.substring(2)},pssh:ve(C.attributes.URI.split(",")[1])};return}C.attributes.METHOD||this.trigger("warn",{message:"defaulting key method to AES-128"}),r={method:C.attributes.METHOD||"AES-128",uri:C.attributes.URI},typeof C.attributes.IV!="undefined"&&(r.iv=C.attributes.IV)},"media-sequence"(){if(!isFinite(C.number)){this.trigger("warn",{message:"ignoring invalid media sequence: "+C.number});return}this.manifest.mediaSequence=C.number},"discontinuity-sequence"(){if(!isFinite(C.number)){this.trigger("warn",{message:"ignoring invalid discontinuity sequence: "+C.number});return}this.manifest.discontinuitySequence=C.number,g=C.number},"playlist-type"(){if(!/VOD|EVENT/.test(C.playlistType)){this.trigger("warn",{message:"ignoring unknown playlist type: "+C.playlist});return}this.manifest.playlistType=C.playlistType},map(){s={},C.uri&&(s.uri=C.uri),C.byterange&&(s.byterange=C.byterange),r&&(s.key=r)},"stream-inf"(){if(this.manifest.playlists=t,this.manifest.mediaGroups=this.manifest.mediaGroups||h,!C.attributes){this.trigger("warn",{message:"ignoring empty stream-inf attributes"});return}i.attributes||(i.attributes={}),(0,_e.A)(i.attributes,C.attributes)},media(){if(this.manifest.mediaGroups=this.manifest.mediaGroups||h,!(C.attributes&&C.attributes.TYPE&&C.attributes["GROUP-ID"]&&C.attributes.NAME)){this.trigger("warn",{message:"ignoring incomplete or missing media group"});return}const q=this.manifest.mediaGroups[C.attributes.TYPE];q[C.attributes["GROUP-ID"]]=q[C.attributes["GROUP-ID"]]||{},I=q[C.attributes["GROUP-ID"]],R={default:/yes/i.test(C.attributes.DEFAULT)},R.default?R.autoselect=!0:R.autoselect=/yes/i.test(C.attributes.AUTOSELECT),C.attributes.LANGUAGE&&(R.language=C.attributes.LANGUAGE),C.attributes.URI&&(R.uri=C.attributes.URI),C.attributes["INSTREAM-ID"]&&(R.instreamId=C.attributes["INSTREAM-ID"]),C.attributes.CHARACTERISTICS&&(R.characteristics=C.attributes.CHARACTERISTICS),C.attributes.FORCED&&(R.forced=/yes/i.test(C.attributes.FORCED)),I[C.attributes.NAME]=R},discontinuity(){g+=1,i.discontinuity=!0,this.manifest.discontinuityStarts.push(t.length)},"program-date-time"(){typeof this.manifest.dateTimeString=="undefined"&&(this.manifest.dateTimeString=C.dateTimeString,this.manifest.dateTimeObject=C.dateTimeObject),i.dateTimeString=C.dateTimeString,i.dateTimeObject=C.dateTimeObject;const{lastProgramDateTime:q}=this;this.lastProgramDateTime=new Date(C.dateTimeString).getTime(),q===null&&this.manifest.segments.reduceRight((L,X)=>(X.programDateTime=L-X.duration*1e3,X.programDateTime),this.lastProgramDateTime)},targetduration(){if(!isFinite(C.duration)||C.duration<0){this.trigger("warn",{message:"ignoring invalid target duration: "+C.duration});return}this.manifest.targetDuration=C.duration,oe.call(this,this.manifest)},start(){if(!C.attributes||isNaN(C.attributes["TIME-OFFSET"])){this.trigger("warn",{message:"ignoring start declaration without appropriate attribute list"});return}this.manifest.start={timeOffset:C.attributes["TIME-OFFSET"],precise:C.attributes.PRECISE}},"cue-out"(){i.cueOut=C.data},"cue-out-cont"(){i.cueOutCont=C.data},"cue-in"(){i.cueIn=C.data},skip(){this.manifest.skip=K(C.attributes),this.warnOnMissingAttributes_("#EXT-X-SKIP",C.attributes,["SKIPPED-SEGMENTS"])},part(){a=!0;const q=this.manifest.segments.length,L=K(C.attributes);i.parts=i.parts||[],i.parts.push(L),L.byterange&&(L.byterange.hasOwnProperty("offset")||(L.byterange.offset=w),w=L.byterange.offset+L.byterange.length);const X=i.parts.length-1;this.warnOnMissingAttributes_(`#EXT-X-PART #${X} for segment #${q}`,C.attributes,["URI","DURATION"]),this.manifest.renditionReports&&this.manifest.renditionReports.forEach((H,P)=>{H.hasOwnProperty("lastPart")||this.trigger("warn",{message:`#EXT-X-RENDITION-REPORT #${P} lacks required attribute(s): LAST-PART`})})},"server-control"(){const q=this.manifest.serverControl=K(C.attributes);q.hasOwnProperty("canBlockReload")||(q.canBlockReload=!1,this.trigger("info",{message:"#EXT-X-SERVER-CONTROL defaulting CAN-BLOCK-RELOAD to false"})),oe.call(this,this.manifest),q.canSkipDateranges&&!q.hasOwnProperty("canSkipUntil")&&this.trigger("warn",{message:"#EXT-X-SERVER-CONTROL lacks required attribute CAN-SKIP-UNTIL which is required when CAN-SKIP-DATERANGES is set"})},"preload-hint"(){const q=this.manifest.segments.length,L=K(C.attributes),X=L.type&&L.type==="PART";i.preloadHints=i.preloadHints||[],i.preloadHints.push(L),L.byterange&&(L.byterange.hasOwnProperty("offset")||(L.byterange.offset=X?w:0,X&&(w=L.byterange.offset+L.byterange.length)));const H=i.preloadHints.length-1;if(this.warnOnMissingAttributes_(`#EXT-X-PRELOAD-HINT #${H} for segment #${q}`,C.attributes,["TYPE","URI"]),!!L.type)for(let P=0;P<i.preloadHints.length-1;P++){const ce=i.preloadHints[P];ce.type&&ce.type===L.type&&this.trigger("warn",{message:`#EXT-X-PRELOAD-HINT #${H} for segment #${q} has the same TYPE ${L.type} as preload hint #${P}`})}},"rendition-report"(){const q=K(C.attributes);this.manifest.renditionReports=this.manifest.renditionReports||[],this.manifest.renditionReports.push(q);const L=this.manifest.renditionReports.length-1,X=["LAST-MSN","URI"];a&&X.push("LAST-PART"),this.warnOnMissingAttributes_(`#EXT-X-RENDITION-REPORT #${L}`,C.attributes,X)},"part-inf"(){this.manifest.partInf=K(C.attributes),this.warnOnMissingAttributes_("#EXT-X-PART-INF",C.attributes,["PART-TARGET"]),this.manifest.partInf.partTarget&&(this.manifest.partTargetDuration=this.manifest.partInf.partTarget),oe.call(this,this.manifest)},daterange(){this.manifest.dateRanges.push(K(C.attributes));const q=this.manifest.dateRanges.length-1;this.warnOnMissingAttributes_(`#EXT-X-DATERANGE #${q}`,C.attributes,["ID","START-DATE"]);const L=this.manifest.dateRanges[q];L.endDate&&L.startDate&&new Date(L.endDate)<new Date(L.startDate)&&this.trigger("warn",{message:"EXT-X-DATERANGE END-DATE must be equal to or later than the value of the START-DATE"}),L.duration&&L.duration<0&&this.trigger("warn",{message:"EXT-X-DATERANGE DURATION must not be negative"}),L.plannedDuration&&L.plannedDuration<0&&this.trigger("warn",{message:"EXT-X-DATERANGE PLANNED-DURATION must not be negative"});const X=!!L.endOnNext;if(X&&!L.class&&this.trigger("warn",{message:"EXT-X-DATERANGE with an END-ON-NEXT=YES attribute must have a CLASS attribute"}),X&&(L.duration||L.endDate)&&this.trigger("warn",{message:"EXT-X-DATERANGE with an END-ON-NEXT=YES attribute must not contain DURATION or END-DATE attributes"}),L.duration&&L.endDate){const P=L.startDate.getTime()+L.duration*1e3;this.manifest.dateRanges[q].endDate=new Date(P)}if(!D[L.id])D[L.id]=L;else{for(const P in D[L.id])if(L[P]&&JSON.stringify(D[L.id][P])!==JSON.stringify(L[P])){this.trigger("warn",{message:"EXT-X-DATERANGE tags with the same ID in a playlist must have the same attributes values"});break}const H=this.manifest.dateRanges.findIndex(P=>P.id===L.id);this.manifest.dateRanges[H]=(0,_e.A)(this.manifest.dateRanges[H],L),D[L.id]=(0,_e.A)(D[L.id],L),this.manifest.dateRanges.pop()}},"independent-segments"(){this.manifest.independentSegments=!0},"content-steering"(){this.manifest.contentSteering=K(C.attributes),this.warnOnMissingAttributes_("#EXT-X-CONTENT-STEERING",C.attributes,["SERVER-URI"])}}[C.tagType]||l).call(e)},uri(){i.uri=C.uri,t.push(i),this.manifest.targetDuration&&!("duration"in i)&&(this.trigger("warn",{message:"defaulting segment duration to the target duration"}),i.duration=this.manifest.targetDuration),r&&(i.key=r),i.timeline=g,s&&(i.map=s),w=0,this.lastProgramDateTime!==null&&(i.programDateTime=this.lastProgramDateTime,this.lastProgramDateTime+=i.duration*1e3),i={}},comment(){},custom(){C.segment?(i.custom=i.custom||{},i.custom[C.customType]=C.data):(this.manifest.custom=this.manifest.custom||{},this.manifest.custom[C.customType]=C.data)}})[C.type].call(e)})}warnOnMissingAttributes_(e,t,i){const s=[];i.forEach(function(r){t.hasOwnProperty(r)||s.push(r)}),s.length&&this.trigger("warn",{message:`${e} lacks required attribute(s): ${s.join(", ")}`})}push(e){this.lineStream.push(e)}end(){this.lineStream.push(`
`),this.manifest.dateRanges.length&&this.lastProgramDateTime===null&&this.trigger("warn",{message:"A playlist with EXT-X-DATERANGE tag must contain atleast one EXT-X-PROGRAM-DATE-TIME tag"}),this.lastProgramDateTime=null,this.trigger("end")}addParser(e){this.parseStream.addParser(e)}addTagMapper(e){this.parseStream.addTagMapper(e)}}var me={mp4:/^(av0?1|avc0?[1234]|vp0?9|flac|opus|mp3|mp4a|mp4v|stpp.ttml.im1t)/,webm:/^(vp0?[89]|av0?1|opus|vorbis)/,ogg:/^(vp0?[89]|theora|flac|opus|vorbis)/,video:/^(av0?1|avc0?[1234]|vp0?[89]|hvc1|hev1|theora|mp4v)/,audio:/^(mp4a|flac|vorbis|opus|ac-[34]|ec-3|alac|mp3|speex|aac)/,text:/^(stpp.ttml.im1t)/,muxerVideo:/^(avc0?1)/,muxerAudio:/^(mp4a)/,muxerText:/a^/},ie=["video","audio","text"],re=["Video","Audio","Text"],Z=function(e){return e&&e.replace(/avc1\.(\d+)\.(\d+)/i,function(t,i,s){var r=("00"+Number(i).toString(16)).slice(-2),a=("00"+Number(s).toString(16)).slice(-2);return"avc1."+r+"00"+a})},ae=function(e){return e.map(Z)},Te=function(e){return e.replace(/avc1\.(\d+)\.(\d+)/i,function(t){return ae([t])[0]})},Ie=function(e){e===void 0&&(e="");var t=e.split(","),i=[];return t.forEach(function(s){s=s.trim();var r;ie.forEach(function(a){var l=me[a].exec(s.toLowerCase());if(!(!l||l.length<=1)){r=a;var h=s.substring(0,l[1].length),p=s.replace(h,"");i.push({type:h,details:p,mediaType:a})}}),r||i.push({type:s,details:"",mediaType:"unknown"})}),i},qe=function(e,t){if(!e.mediaGroups.AUDIO||!t)return null;var i=e.mediaGroups.AUDIO[t];if(!i)return null;for(var s in i){var r=i[s];if(r.default&&r.playlists)return Ie(r.playlists[0].attributes.CODECS)}return null},Se=function(e){return e===void 0&&(e=""),me.video.test(e.trim().toLowerCase())},je=function(e){return e===void 0&&(e=""),me.audio.test(e.trim().toLowerCase())},_t=function(e){return e===void 0&&(e=""),me.text.test(e.trim().toLowerCase())},bt=function(e){if(!(!e||typeof e!="string")){var t=e.toLowerCase().split(",").map(function(r){return Z(r.trim())}),i="video";t.length===1&&je(t[0])?i="audio":t.length===1&&_t(t[0])&&(i="application");var s="mp4";return t.every(function(r){return me.mp4.test(r)})?s="mp4":t.every(function(r){return me.webm.test(r)})?s="webm":t.every(function(r){return me.ogg.test(r)})&&(s="ogg"),i+"/"+s+';codecs="'+e+'"'}},nt=function(e){return e===void 0&&(e=""),A().MediaSource&&A().MediaSource.isTypeSupported&&A().MediaSource.isTypeSupported(bt(e))||!1},Tt=function(e){return e===void 0&&(e=""),e.toLowerCase().split(",").every(function(t){t=t.trim();for(var i=0;i<re.length;i++){var s=re[i];if(me["muxer"+s].test(t))return!0}return!1})},Ut="mp4a.40.2",fi="avc1.4d400d",En=/^(audio|video|application)\/(x-|vnd\.apple\.)?mpegurl/i,ze=/^application\/dash\+xml/i,Ct=function(e){return En.test(e)?"hls":ze.test(e)?"dash":e==="application/vnd.videojs.vhs+json"?"vhs-json":null},ai=function(e,t){for(var i="";t--;)i+=e;return i},ut=function(e){return e.toString(2).length},Tn=function(e){return Math.ceil(ut(e)/8)},Ji=function(e,t,i){return i===void 0&&(i=" "),(ai(i,t)+e.toString()).slice(-t)},pi=function(e){return ArrayBuffer.isView==="function"?ArrayBuffer.isView(e):e&&e.buffer instanceof ArrayBuffer},Zi=function(e){return pi(e)},pe=function(e){return e instanceof Uint8Array?e:(!Array.isArray(e)&&!Zi(e)&&!(e instanceof ArrayBuffer)&&(typeof e!="number"||typeof e=="number"&&e!==e?e=0:e=[e]),new Uint8Array(e&&e.buffer||e,e&&e.byteOffset||0,e&&e.byteLength||0))},It=function(e){e=pe(e);for(var t="",i=0;i<e.length;i++)t+=Ji(e[i].toString(16),2,"0");return t},Qt=function(e){e=pe(e);for(var t="",i=0;i<e.length;i++)t+=Ji(e[i].toString(2),8,"0");return t},Ke=A().BigInt||Number,en=[Ke("0x1"),Ke("0x100"),Ke("0x10000"),Ke("0x1000000"),Ke("0x100000000"),Ke("0x10000000000"),Ke("0x1000000000000"),Ke("0x100000000000000"),Ke("0x10000000000000000")],rs=function(){var n=new Uint16Array([65484]),e=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);return e[0]===255?"big":e[0]===204?"little":"unknown"}(),pa=rs==="big",pl=rs==="little",ma=function(e,t){var i=t===void 0?{}:t,s=i.signed,r=s===void 0?!1:s,a=i.le,l=a===void 0?!1:a;e=pe(e);var h=l?"reduce":"reduceRight",p=e[h]?e[h]:Array.prototype[h],g=p.call(e,function(w,D,C){var I=l?C:Math.abs(C+1-e.length);return w+Ke(D)*en[I]},Ke(0));if(r){var _=en[e.length]/Ke(2)-Ke(1);g=Ke(g),g>_&&(g-=_,g-=_,g-=Ke(2))}return Number(g)},Hs=function(e,t){var i=t===void 0?{}:t,s=i.le,r=s===void 0?!1:s;(typeof e!="bigint"&&typeof e!="number"||typeof e=="number"&&e!==e)&&(e=0),e=Ke(e);for(var a=Tn(e),l=new Uint8Array(new ArrayBuffer(a)),h=0;h<a;h++){var p=r?h:Math.abs(h+1-l.length);l[p]=Number(e/en[h]&Ke(255)),e<0&&(l[p]=Math.abs(~l[p]),l[p]-=h===0?1:2)}return l},Cn=function(e){if(!e)return"";e=Array.prototype.slice.call(e);var t=String.fromCharCode.apply(null,pe(e));try{return decodeURIComponent(escape(t))}catch(i){}return t},Ws=function(e,t){if(typeof e!="string"&&e&&typeof e.toString=="function"&&(e=e.toString()),typeof e!="string")return new Uint8Array;t||(e=unescape(encodeURIComponent(e)));for(var i=new Uint8Array(e.length),s=0;s<e.length;s++)i[s]=e.charCodeAt(s);return i},Bi=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];if(t=t.filter(function(l){return l&&(l.byteLength||l.length)&&typeof l!="string"}),t.length<=1)return pe(t[0]);var s=t.reduce(function(l,h,p){return l+(h.byteLength||h.length)},0),r=new Uint8Array(s),a=0;return t.forEach(function(l){l=pe(l),r.set(l,a),a+=l.byteLength}),r},$e=function(e,t,i){var s=i===void 0?{}:i,r=s.offset,a=r===void 0?0:r,l=s.mask,h=l===void 0?[]:l;e=pe(e),t=pe(t);var p=t.every?t.every:Array.prototype.every;return t.length&&e.length-a>=t.length&&p.call(t,function(g,_){var w=h[_]?h[_]&e[a+_]:e[a+_];return g===w})},xn=function(e,t,i){return Uint8Array.prototype.slice?Uint8Array.prototype.slice.call(e,t,i):new Uint8Array(Array.prototype.slice.call(e,t,i))},Gs=function(e){return e.reverse?e.reverse():Array.prototype.reverse.call(e)},as=function(e,t,i){t.forEach(function(s){for(var r in e.mediaGroups[s])for(var a in e.mediaGroups[s][r]){var l=e.mediaGroups[s][r][a];i(l,s,r,a)}})},os=z(8287).hp,Sn=function(e){return A().atob?A().atob(e):os.from(e,"base64").toString("binary")};function $s(n){for(var e=Sn(n),t=new Uint8Array(e.length),i=0;i<e.length;i++)t[i]=e.charCodeAt(i);return t}var Xs=z(8978);/*! @name mpd-parser @version 1.3.0 @license Apache-2.0 */var Ys="1.3.0";const tn=n=>!!n&&typeof n=="object",ft=(...n)=>n.reduce((e,t)=>(typeof t!="object"||Object.keys(t).forEach(i=>{Array.isArray(e[i])&&Array.isArray(t[i])?e[i]=e[i].concat(t[i]):tn(e[i])&&tn(t[i])?e[i]=ft(e[i],t[i]):e[i]=t[i]}),e),{}),ls=n=>Object.keys(n).map(e=>n[e]),Ks=(n,e)=>{const t=[];for(let i=n;i<e;i++)t.push(i);return t},wi=n=>n.reduce((e,t)=>e.concat(t),[]),jn=n=>{if(!n.length)return[];const e=[];for(let t=0;t<n.length;t++)e.push(n[t]);return e},Vi=(n,e)=>n.reduce((t,i,s)=>(i[e]&&t.push(s),t),[]),Qs=(n,e)=>ls(n.reduce((t,i)=>(i.forEach(s=>{t[e(s)]=s}),t),{}));var mi={INVALID_NUMBER_OF_PERIOD:"INVALID_NUMBER_OF_PERIOD",INVALID_NUMBER_OF_CONTENT_STEERING:"INVALID_NUMBER_OF_CONTENT_STEERING",DASH_EMPTY_MANIFEST:"DASH_EMPTY_MANIFEST",DASH_INVALID_XML:"DASH_INVALID_XML",NO_BASE_URL:"NO_BASE_URL",MISSING_SEGMENT_INFORMATION:"MISSING_SEGMENT_INFORMATION",SEGMENT_TIME_UNSPECIFIED:"SEGMENT_TIME_UNSPECIFIED",UNSUPPORTED_UTC_TIMING_SCHEME:"UNSUPPORTED_UTC_TIMING_SCHEME"};const qi=({baseUrl:n="",source:e="",range:t="",indexRange:i=""})=>{const s={uri:e,resolvedUri:ne(n||"",e)};if(t||i){const a=(t||i).split("-");let l=A().BigInt?A().BigInt(a[0]):parseInt(a[0],10),h=A().BigInt?A().BigInt(a[1]):parseInt(a[1],10);l<Number.MAX_SAFE_INTEGER&&typeof l=="bigint"&&(l=Number(l)),h<Number.MAX_SAFE_INTEGER&&typeof h=="bigint"&&(h=Number(h));let p;typeof h=="bigint"||typeof l=="bigint"?p=A().BigInt(h)-A().BigInt(l)+A().BigInt(1):p=h-l+1,typeof p=="bigint"&&p<Number.MAX_SAFE_INTEGER&&(p=Number(p)),s.byterange={length:p,offset:l}}return s},ml=n=>{let e;return typeof n.offset=="bigint"||typeof n.length=="bigint"?e=A().BigInt(n.offset)+A().BigInt(n.length)-A().BigInt(1):e=n.offset+n.length-1,`${n.offset}-${e}`},v=n=>(n&&typeof n!="number"&&(n=parseInt(n,10)),isNaN(n)?null:n),y={static(n){const{duration:e,timescale:t=1,sourceDuration:i,periodDuration:s}=n,r=v(n.endNumber),a=e/t;return typeof r=="number"?{start:0,end:r}:typeof s=="number"?{start:0,end:s/a}:{start:0,end:i/a}},dynamic(n){const{NOW:e,clientOffset:t,availabilityStartTime:i,timescale:s=1,duration:r,periodStart:a=0,minimumUpdatePeriod:l=0,timeShiftBufferDepth:h=1/0}=n,p=v(n.endNumber),g=(e+t)/1e3,_=i+a,D=g+l-_,C=Math.ceil(D*s/r),I=Math.floor((g-_-h)*s/r),R=Math.floor((g-_)*s/r);return{start:Math.max(0,I),end:typeof p=="number"?p:Math.min(C,R)}}},B=n=>e=>{const{duration:t,timescale:i=1,periodStart:s,startNumber:r=1}=n;return{number:r+e,duration:t/i,timeline:s,time:e*t}},F=n=>{const{type:e,duration:t,timescale:i=1,periodDuration:s,sourceDuration:r}=n,{start:a,end:l}=y[e](n),h=Ks(a,l).map(B(n));if(e==="static"){const p=h.length-1,g=typeof s=="number"?s:r;h[p].duration=g-t/i*p}return h},le=n=>{const{baseUrl:e,initialization:t={},sourceDuration:i,indexRange:s="",periodStart:r,presentationTime:a,number:l=0,duration:h}=n;if(!e)throw new Error(mi.NO_BASE_URL);const p=qi({baseUrl:e,source:t.sourceURL,range:t.range}),g=qi({baseUrl:e,source:e,indexRange:s});if(g.map=p,h){const _=F(n);_.length&&(g.duration=_[0].duration,g.timeline=_[0].timeline)}else i&&(g.duration=i,g.timeline=r);return g.presentationTime=a||r,g.number=l,[g]},ke=(n,e,t)=>{const i=n.sidx.map?n.sidx.map:null,s=n.sidx.duration,r=n.timeline||0,a=n.sidx.byterange,l=a.offset+a.length,h=e.timescale,p=e.references.filter(R=>R.referenceType!==1),g=[],_=n.endList?"static":"dynamic",w=n.sidx.timeline;let D=w,C=n.mediaSequence||0,I;typeof e.firstOffset=="bigint"?I=A().BigInt(l)+e.firstOffset:I=l+e.firstOffset;for(let R=0;R<p.length;R++){const q=e.references[R],L=q.referencedSize,X=q.subsegmentDuration;let H;typeof I=="bigint"?H=I+A().BigInt(L)-A().BigInt(1):H=I+L-1;const P=`${I}-${H}`,Ee=le({baseUrl:t,timescale:h,timeline:r,periodStart:w,presentationTime:D,number:C,duration:X,sourceDuration:s,indexRange:P,type:_})[0];i&&(Ee.map=i),g.push(Ee),typeof I=="bigint"?I+=A().BigInt(L):I+=L,D+=X/h,C++}return n.segments=g,n},Qe=["AUDIO","SUBTITLES"],Bt=1/60,Jt=n=>Qs(n,({timeline:e})=>e).sort((e,t)=>e.timeline>t.timeline?1:-1),Gt=(n,e)=>{for(let t=0;t<n.length;t++)if(n[t].attributes.NAME===e)return n[t];return null},Zt=n=>{let e=[];return as(n,Qe,(t,i,s,r)=>{e=e.concat(t.playlists||[])}),e},gi=({playlist:n,mediaSequence:e})=>{n.mediaSequence=e,n.segments.forEach((t,i)=>{t.number=n.mediaSequence+i})},Di=({oldPlaylists:n,newPlaylists:e,timelineStarts:t})=>{e.forEach(i=>{i.discontinuitySequence=t.findIndex(function({timeline:h}){return h===i.timeline});const s=Gt(n,i.attributes.NAME);if(!s||i.sidx)return;const r=i.segments[0],a=s.segments.findIndex(function(h){return Math.abs(h.presentationTime-r.presentationTime)<Bt});if(a===-1){gi({playlist:i,mediaSequence:s.mediaSequence+s.segments.length}),i.segments[0].discontinuity=!0,i.discontinuityStarts.unshift(0),(!s.segments.length&&i.timeline>s.timeline||s.segments.length&&i.timeline>s.segments[s.segments.length-1].timeline)&&i.discontinuitySequence--;return}s.segments[a].discontinuity&&!r.discontinuity&&(r.discontinuity=!0,i.discontinuityStarts.unshift(0),i.discontinuitySequence--),gi({playlist:i,mediaSequence:s.segments[a].number})})},ki=({oldManifest:n,newManifest:e})=>{const t=n.playlists.concat(Zt(n)),i=e.playlists.concat(Zt(e));return e.timelineStarts=Jt([n.timelineStarts,e.timelineStarts]),Di({oldPlaylists:t,newPlaylists:i,timelineStarts:e.timelineStarts}),e},Pt=n=>n&&n.uri+"-"+ml(n.byterange),oi=n=>{const e=n.reduce(function(i,s){return i[s.attributes.baseUrl]||(i[s.attributes.baseUrl]=[]),i[s.attributes.baseUrl].push(s),i},{});let t=[];return Object.values(e).forEach(i=>{const s=ls(i.reduce((r,a)=>{const l=a.attributes.id+(a.attributes.lang||"");return r[l]?(a.segments&&(a.segments[0]&&(a.segments[0].discontinuity=!0),r[l].segments.push(...a.segments)),a.attributes.contentProtection&&(r[l].attributes.contentProtection=a.attributes.contentProtection)):(r[l]=a,r[l].attributes.timelineStarts=[]),r[l].attributes.timelineStarts.push({start:a.attributes.periodStart,timeline:a.attributes.periodStart}),r},{}));t=t.concat(s)}),t.map(i=>(i.discontinuityStarts=Vi(i.segments||[],"discontinuity"),i))},Ii=(n,e)=>{const t=Pt(n.sidx),i=t&&e[t]&&e[t].sidx;return i&&ke(n,i,n.sidx.resolvedUri),n},St=(n,e={})=>{if(!Object.keys(e).length)return n;for(const t in n)n[t]=Ii(n[t],e);return n},Js=({attributes:n,segments:e,sidx:t,mediaSequence:i,discontinuitySequence:s,discontinuityStarts:r},a)=>{const l={attributes:{NAME:n.id,BANDWIDTH:n.bandwidth,CODECS:n.codecs,"PROGRAM-ID":1},uri:"",endList:n.type==="static",timeline:n.periodStart,resolvedUri:n.baseUrl||"",targetDuration:n.duration,discontinuitySequence:s,discontinuityStarts:r,timelineStarts:n.timelineStarts,mediaSequence:i,segments:e};return n.contentProtection&&(l.contentProtection=n.contentProtection),n.serviceLocation&&(l.attributes.serviceLocation=n.serviceLocation),t&&(l.sidx=t),a&&(l.attributes.AUDIO="audio",l.attributes.SUBTITLES="subs"),l},zi=({attributes:n,segments:e,mediaSequence:t,discontinuityStarts:i,discontinuitySequence:s})=>{typeof e=="undefined"&&(e=[{uri:n.baseUrl,timeline:n.periodStart,resolvedUri:n.baseUrl||"",duration:n.sourceDuration,number:0}],n.duration=n.sourceDuration);const r={NAME:n.id,BANDWIDTH:n.bandwidth,"PROGRAM-ID":1};n.codecs&&(r.CODECS=n.codecs);const a={attributes:r,uri:"",endList:n.type==="static",timeline:n.periodStart,resolvedUri:n.baseUrl||"",targetDuration:n.duration,timelineStarts:n.timelineStarts,discontinuityStarts:i,discontinuitySequence:s,mediaSequence:t,segments:e};return n.serviceLocation&&(a.attributes.serviceLocation=n.serviceLocation),a},Zs=(n,e={},t=!1)=>{let i;const s=n.reduce((r,a)=>{const l=a.attributes.role&&a.attributes.role.value||"",h=a.attributes.lang||"";let p=a.attributes.label||"main";if(h&&!a.attributes.label){const _=l?` (${l})`:"";p=`${a.attributes.lang}${_}`}r[p]||(r[p]={language:h,autoselect:!0,default:l==="main",playlists:[],uri:""});const g=Ii(Js(a,t),e);return r[p].playlists.push(g),typeof i=="undefined"&&l==="main"&&(i=a,i.default=!0),r},{});if(!i){const r=Object.keys(s)[0];s[r].default=!0}return s},jh=(n,e={})=>n.reduce((t,i)=>{const s=i.attributes.label||i.attributes.lang||"text";return t[s]||(t[s]={language:s,default:!1,autoselect:!1,playlists:[],uri:""}),t[s].playlists.push(Ii(zi(i),e)),t},{}),Bh=n=>n.reduce((e,t)=>(t&&t.forEach(i=>{const{channel:s,language:r}=i;e[r]={autoselect:!1,default:!1,instreamId:s,language:r},i.hasOwnProperty("aspectRatio")&&(e[r].aspectRatio=i.aspectRatio),i.hasOwnProperty("easyReader")&&(e[r].easyReader=i.easyReader),i.hasOwnProperty("3D")&&(e[r]["3D"]=i["3D"])}),e),{}),wh=({attributes:n,segments:e,sidx:t,discontinuityStarts:i})=>{const s={attributes:{NAME:n.id,AUDIO:"audio",SUBTITLES:"subs",RESOLUTION:{width:n.width,height:n.height},CODECS:n.codecs,BANDWIDTH:n.bandwidth,"PROGRAM-ID":1},uri:"",endList:n.type==="static",timeline:n.periodStart,resolvedUri:n.baseUrl||"",targetDuration:n.duration,discontinuityStarts:i,timelineStarts:n.timelineStarts,segments:e};return n.frameRate&&(s.attributes["FRAME-RATE"]=n.frameRate),n.contentProtection&&(s.contentProtection=n.contentProtection),n.serviceLocation&&(s.attributes.serviceLocation=n.serviceLocation),t&&(s.sidx=t),s},Dh=({attributes:n})=>n.mimeType==="video/mp4"||n.mimeType==="video/webm"||n.contentType==="video",kh=({attributes:n})=>n.mimeType==="audio/mp4"||n.mimeType==="audio/webm"||n.contentType==="audio",Ih=({attributes:n})=>n.mimeType==="text/vtt"||n.contentType==="text",Ph=(n,e)=>{n.forEach(t=>{t.mediaSequence=0,t.discontinuitySequence=e.findIndex(function({timeline:i}){return i===t.timeline}),t.segments&&t.segments.forEach((i,s)=>{i.number=s})})},gl=n=>n?Object.keys(n).reduce((e,t)=>{const i=n[t];return e.concat(i.playlists)},[]):[],Oh=({dashPlaylists:n,locations:e,contentSteering:t,sidxMapping:i={},previousManifest:s,eventStream:r})=>{if(!n.length)return{};const{sourceDuration:a,type:l,suggestedPresentationDelay:h,minimumUpdatePeriod:p}=n[0].attributes,g=oi(n.filter(Dh)).map(wh),_=oi(n.filter(kh)),w=oi(n.filter(Ih)),D=n.map(H=>H.attributes.captionServices).filter(Boolean),C={allowCache:!0,discontinuityStarts:[],segments:[],endList:!0,mediaGroups:{AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},uri:"",duration:a,playlists:St(g,i)};p>=0&&(C.minimumUpdatePeriod=p*1e3),e&&(C.locations=e),t&&(C.contentSteering=t),l==="dynamic"&&(C.suggestedPresentationDelay=h),r&&r.length>0&&(C.eventStream=r);const I=C.playlists.length===0,R=_.length?Zs(_,i,I):null,q=w.length?jh(w,i):null,L=g.concat(gl(R),gl(q)),X=L.map(({timelineStarts:H})=>H);return C.timelineStarts=Jt(X),Ph(L,C.timelineStarts),R&&(C.mediaGroups.AUDIO.audio=R),q&&(C.mediaGroups.SUBTITLES.subs=q),D.length&&(C.mediaGroups["CLOSED-CAPTIONS"].cc=Bh(D)),s?ki({oldManifest:s,newManifest:C}):C},Lh=(n,e,t)=>{const{NOW:i,clientOffset:s,availabilityStartTime:r,timescale:a=1,periodStart:l=0,minimumUpdatePeriod:h=0}=n,p=(i+s)/1e3,g=r+l,w=p+h-g;return Math.ceil((w*a-e)/t)},vl=(n,e)=>{const{type:t,minimumUpdatePeriod:i=0,media:s="",sourceDuration:r,timescale:a=1,startNumber:l=1,periodStart:h}=n,p=[];let g=-1;for(let _=0;_<e.length;_++){const w=e[_],D=w.d,C=w.r||0,I=w.t||0;g<0&&(g=I),I&&I>g&&(g=I);let R;if(C<0){const X=_+1;X===e.length?t==="dynamic"&&i>0&&s.indexOf("$Number$")>0?R=Lh(n,g,D):R=(r*a-g)/D:R=(e[X].t-g)/D}else R=C+1;const q=l+p.length+R;let L=l+p.length;for(;L<q;)p.push({number:L,duration:D/a,time:g,timeline:h}),g+=D,L++}return p},Rh=/\$([A-z]*)(?:(%0)([0-9]+)d)?\$/g,Mh=n=>(e,t,i,s)=>{if(e==="$$")return"$";if(typeof n[t]=="undefined")return e;const r=""+n[t];return t==="RepresentationID"||(i?s=parseInt(s,10):s=1,r.length>=s)?r:`${new Array(s-r.length+1).join("0")}${r}`},Al=(n,e)=>n.replace(Rh,Mh(e)),Nh=(n,e)=>!n.duration&&!e?[{number:n.startNumber||1,duration:n.sourceDuration,time:0,timeline:n.periodStart}]:n.duration?F(n):vl(n,e),Uh=(n,e)=>{const t={RepresentationID:n.id,Bandwidth:n.bandwidth||0},{initialization:i={sourceURL:"",range:""}}=n,s=qi({baseUrl:n.baseUrl,source:Al(i.sourceURL,t),range:i.range});return Nh(n,e).map(a=>{t.Number=a.number,t.Time=a.time;const l=Al(n.media||"",t),h=n.timescale||1,p=n.presentationTimeOffset||0,g=n.periodStart+(a.time-p)/h;return{uri:l,timeline:a.timeline,duration:a.duration,resolvedUri:ne(n.baseUrl||"",l),map:s,number:a.number,presentationTime:g}})},Fh=(n,e)=>{const{baseUrl:t,initialization:i={}}=n,s=qi({baseUrl:t,source:i.sourceURL,range:i.range}),r=qi({baseUrl:t,source:e.media,range:e.mediaRange});return r.map=s,r},Vh=(n,e)=>{const{duration:t,segmentUrls:i=[],periodStart:s}=n;if(!t&&!e||t&&e)throw new Error(mi.SEGMENT_TIME_UNSPECIFIED);const r=i.map(h=>Fh(n,h));let a;return t&&(a=F(n)),e&&(a=vl(n,e)),a.map((h,p)=>{if(r[p]){const g=r[p],_=n.timescale||1,w=n.presentationTimeOffset||0;return g.timeline=h.timeline,g.duration=h.duration,g.number=h.number,g.presentationTime=s+(h.time-w)/_,g}}).filter(h=>h)},qh=({attributes:n,segmentInfo:e})=>{let t,i;e.template?(i=Uh,t=ft(n,e.template)):e.base?(i=le,t=ft(n,e.base)):e.list&&(i=Vh,t=ft(n,e.list));const s={attributes:n};if(!i)return s;const r=i(t,e.segmentTimeline);if(t.duration){const{duration:a,timescale:l=1}=t;t.duration=a/l}else r.length?t.duration=r.reduce((a,l)=>Math.max(a,Math.ceil(l.duration)),0):t.duration=0;return s.attributes=t,s.segments=r,e.base&&t.indexRange&&(s.sidx=r[0],s.segments=[]),s},zh=n=>n.map(qh),ot=(n,e)=>jn(n.childNodes).filter(({tagName:t})=>t===e),us=n=>n.textContent.trim(),Hh=n=>parseFloat(n.split("/").reduce((e,t)=>e/t)),Bn=n=>{const l=/P(?:(\d*)Y)?(?:(\d*)M)?(?:(\d*)D)?(?:T(?:(\d*)H)?(?:(\d*)M)?(?:([\d.]*)S)?)?/.exec(n);if(!l)return 0;const[h,p,g,_,w,D]=l.slice(1);return parseFloat(h||0)*31536e3+parseFloat(p||0)*2592e3+parseFloat(g||0)*86400+parseFloat(_||0)*3600+parseFloat(w||0)*60+parseFloat(D||0)},Wh=n=>(/^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/.test(n)&&(n+="Z"),Date.parse(n)),yl={mediaPresentationDuration(n){return Bn(n)},availabilityStartTime(n){return Wh(n)/1e3},minimumUpdatePeriod(n){return Bn(n)},suggestedPresentationDelay(n){return Bn(n)},type(n){return n},timeShiftBufferDepth(n){return Bn(n)},start(n){return Bn(n)},width(n){return parseInt(n,10)},height(n){return parseInt(n,10)},bandwidth(n){return parseInt(n,10)},frameRate(n){return Hh(n)},startNumber(n){return parseInt(n,10)},timescale(n){return parseInt(n,10)},presentationTimeOffset(n){return parseInt(n,10)},duration(n){const e=parseInt(n,10);return isNaN(e)?Bn(n):e},d(n){return parseInt(n,10)},t(n){return parseInt(n,10)},r(n){return parseInt(n,10)},presentationTime(n){return parseInt(n,10)},DEFAULT(n){return n}},Et=n=>n&&n.attributes?jn(n.attributes).reduce((e,t)=>{const i=yl[t.name]||yl.DEFAULT;return e[t.name]=i(t.value),e},{}):{},Gh={"urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b":"org.w3.clearkey","urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed":"com.widevine.alpha","urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95":"com.microsoft.playready","urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb":"com.adobe.primetime","urn:mpeg:dash:mp4protection:2011":"mp4protection"},er=(n,e)=>e.length?wi(n.map(function(t){return e.map(function(i){const s=us(i),r=ne(t.baseUrl,s),a=ft(Et(i),{baseUrl:r});return r!==s&&!a.serviceLocation&&t.serviceLocation&&(a.serviceLocation=t.serviceLocation),a})})):n,ga=n=>{const e=ot(n,"SegmentTemplate")[0],t=ot(n,"SegmentList")[0],i=t&&ot(t,"SegmentURL").map(_=>ft({tag:"SegmentURL"},Et(_))),s=ot(n,"SegmentBase")[0],r=t||e,a=r&&ot(r,"SegmentTimeline")[0],l=t||s||e,h=l&&ot(l,"Initialization")[0],p=e&&Et(e);p&&h?p.initialization=h&&Et(h):p&&p.initialization&&(p.initialization={sourceURL:p.initialization});const g={template:p,segmentTimeline:a&&ot(a,"S").map(_=>Et(_)),list:t&&ft(Et(t),{segmentUrls:i,initialization:Et(h)}),base:s&&ft(Et(s),{initialization:Et(h)})};return Object.keys(g).forEach(_=>{g[_]||delete g[_]}),g},$h=(n,e,t)=>i=>{const s=ot(i,"BaseURL"),r=er(e,s),a=ft(n,Et(i)),l=ga(i);return r.map(h=>({segmentInfo:ft(t,l),attributes:ft(a,h)}))},Xh=n=>n.reduce((e,t)=>{const i=Et(t);i.schemeIdUri&&(i.schemeIdUri=i.schemeIdUri.toLowerCase());const s=Gh[i.schemeIdUri];if(s){e[s]={attributes:i};const r=ot(t,"cenc:pssh")[0];if(r){const a=us(r);e[s].pssh=a&&$s(a)}}return e},{}),Yh=n=>{if(n.schemeIdUri==="urn:scte:dash:cc:cea-608:2015")return(typeof n.value!="string"?[]:n.value.split(";")).map(t=>{let i,s;return s=t,/^CC\d=/.test(t)?[i,s]=t.split("="):/^CC\d$/.test(t)&&(i=t),{channel:i,language:s}});if(n.schemeIdUri==="urn:scte:dash:cc:cea-708:2015")return(typeof n.value!="string"?[]:n.value.split(";")).map(t=>{const i={channel:void 0,language:void 0,aspectRatio:1,easyReader:0,"3D":0};if(/=/.test(t)){const[s,r=""]=t.split("=");i.channel=s,i.language=t,r.split(",").forEach(a=>{const[l,h]=a.split(":");l==="lang"?i.language=h:l==="er"?i.easyReader=Number(h):l==="war"?i.aspectRatio=Number(h):l==="3D"&&(i["3D"]=Number(h))})}else i.language=t;return i.channel&&(i.channel="SERVICE"+i.channel),i})},Kh=n=>wi(ot(n.node,"EventStream").map(e=>{const t=Et(e),i=t.schemeIdUri;return ot(e,"Event").map(s=>{const r=Et(s),a=r.presentationTime||0,l=t.timescale||1,h=r.duration||0,p=a/l+n.attributes.start;return{schemeIdUri:i,value:t.value,id:r.id,start:p,end:p+h/l,messageData:us(s)||r.messageData,contentEncoding:t.contentEncoding,presentationTimeOffset:t.presentationTimeOffset||0}})})),Qh=(n,e,t)=>i=>{const s=Et(i),r=er(e,ot(i,"BaseURL")),a=ot(i,"Role")[0],l={role:Et(a)};let h=ft(n,s,l);const p=ot(i,"Accessibility")[0],g=Yh(Et(p));g&&(h=ft(h,{captionServices:g}));const _=ot(i,"Label")[0];if(_&&_.childNodes.length){const R=_.childNodes[0].nodeValue.trim();h=ft(h,{label:R})}const w=Xh(ot(i,"ContentProtection"));Object.keys(w).length&&(h=ft(h,{contentProtection:w}));const D=ga(i),C=ot(i,"Representation"),I=ft(t,D);return wi(C.map($h(h,r,I)))},Jh=(n,e)=>(t,i)=>{const s=er(e,ot(t.node,"BaseURL")),r=ft(n,{periodStart:t.attributes.start});typeof t.attributes.duration=="number"&&(r.periodDuration=t.attributes.duration);const a=ot(t.node,"AdaptationSet"),l=ga(t.node);return wi(a.map(Qh(r,s,l)))},Zh=(n,e)=>{if(n.length>1&&e({type:"warn",message:"The MPD manifest should contain no more than one ContentSteering tag"}),!n.length)return null;const t=ft({serverURL:us(n[0])},Et(n[0]));return t.queryBeforeStart=t.queryBeforeStart==="true",t},ef=({attributes:n,priorPeriodAttributes:e,mpdType:t})=>typeof n.start=="number"?n.start:e&&typeof e.start=="number"&&typeof e.duration=="number"?e.start+e.duration:!e&&t==="static"?0:null,tf=(n,e={})=>{const{manifestUri:t="",NOW:i=Date.now(),clientOffset:s=0,eventHandler:r=function(){}}=e,a=ot(n,"Period");if(!a.length)throw new Error(mi.INVALID_NUMBER_OF_PERIOD);const l=ot(n,"Location"),h=Et(n),p=er([{baseUrl:t}],ot(n,"BaseURL")),g=ot(n,"ContentSteering");h.type=h.type||"static",h.sourceDuration=h.mediaPresentationDuration||0,h.NOW=i,h.clientOffset=s,l.length&&(h.locations=l.map(us));const _=[];return a.forEach((w,D)=>{const C=Et(w),I=_[D-1];C.start=ef({attributes:C,priorPeriodAttributes:I?I.attributes:null,mpdType:h.type}),_.push({node:w,attributes:C})}),{locations:h.locations,contentSteeringInfo:Zh(g,r),representationInfo:wi(_.map(Jh(h,p))),eventStream:wi(_.map(Kh))}},_l=n=>{if(n==="")throw new Error(mi.DASH_EMPTY_MANIFEST);const e=new Xs.DOMParser;let t,i;try{t=e.parseFromString(n,"application/xml"),i=t&&t.documentElement.tagName==="MPD"?t.documentElement:null}catch(s){}if(!i||i&&i.getElementsByTagName("parsererror").length>0)throw new Error(mi.DASH_INVALID_XML);return i},nf=n=>{const e=ot(n,"UTCTiming")[0];if(!e)return null;const t=Et(e);switch(t.schemeIdUri){case"urn:mpeg:dash:utc:http-head:2014":case"urn:mpeg:dash:utc:http-head:2012":t.method="HEAD";break;case"urn:mpeg:dash:utc:http-xsdate:2014":case"urn:mpeg:dash:utc:http-iso:2014":case"urn:mpeg:dash:utc:http-xsdate:2012":case"urn:mpeg:dash:utc:http-iso:2012":t.method="GET";break;case"urn:mpeg:dash:utc:direct:2014":case"urn:mpeg:dash:utc:direct:2012":t.method="DIRECT",t.value=Date.parse(t.value);break;case"urn:mpeg:dash:utc:http-ntp:2014":case"urn:mpeg:dash:utc:ntp:2014":case"urn:mpeg:dash:utc:sntp:2014":default:throw new Error(mi.UNSUPPORTED_UTC_TIMING_SCHEME)}return t},IA=null,sf=(n,e={})=>{const t=tf(_l(n),e),i=zh(t.representationInfo);return Oh({dashPlaylists:i,locations:t.locations,contentSteering:t.contentSteeringInfo,sidxMapping:e.sidxMapping,previousManifest:e.previousManifest,eventStream:t.eventStream})},rf=n=>nf(_l(n));var af=z(8962),of=z.n(af),lf=pe([73,68,51]),uf=function(e,t){t===void 0&&(t=0),e=pe(e);var i=e[t+5],s=e[t+6]<<21|e[t+7]<<14|e[t+8]<<7|e[t+9],r=(i&16)>>4;return r?s+20:s+10},cs=function n(e,t){return t===void 0&&(t=0),e=pe(e),e.length-t<10||!$e(e,lf,{offset:t})?t:(t+=uf(e,t),n(e,t))},PA=function(e){var t="",i=e[1]>>>3,s=e[1]&31,r=e[2]>>>7,a=(e[2]&64)>>6,l=(e[2]&32)>>5,h=(e[2]&16)>>4,p=(e[2]&8)>>3,g=(e[2]&4)>>2,_=e[2]&3;t+=i+"."+padStart(s,2,"0"),r===0?t+="M":r===1&&(t+="H");var w;return i===2&&a?w=l?12:10:w=a?10:8,t+="."+padStart(w,2,"0"),t+="."+h,t+="."+p+g+_,t},OA=function(e){var t=toHexString(e[1]),i=toHexString(e[2]&252),s=toHexString(e[3]);return""+t+i+s},LA=function(e){var t="",i=e[1]>>6,s=e[1]&31,r=(e[1]&32)>>5,a=e.subarray(2,6),l=e.subarray(6,12),h=e[12];i===1?t+="A":i===2?t+="B":i===3&&(t+="C"),t+=s+".";var p=parseInt(toBinaryString(a).split("").reverse().join(""),2);p>255&&(p=parseInt(toBinaryString(a),2)),t+=p.toString(16)+".",r===0?t+="L":t+="H",t+=h;for(var g="",_=0;_<l.length;_++){var w=l[_];w&&(g&&(g+="."),g+=w.toString(16))}return g&&(t+="."+g),t},RA=new Uint8Array([79,112,117,115,72,101,97,100]),MA=function(e){var t=new DataView(e.buffer,e.byteOffset,e.byteLength),i=t.getUint8(0),s=i!==0,r={version:i,channels:t.getUint8(1),preSkip:t.getUint16(2,s),sampleRate:t.getUint32(4,s),outputGain:t.getUint16(8,s),channelMappingFamily:t.getUint8(10)};if(r.channelMappingFamily>0&&e.length>10){r.streamCount=t.getUint8(11),r.twoChannelStreamCount=t.getUint8(12),r.channelMapping=[];for(var a=0;a<r.channels;a++)r.channelMapping.push(t.getUint8(13+a))}return r},NA=function(e){var t=e.channelMappingFamily<=0?11:12+e.channels,i=new DataView(new ArrayBuffer(t)),s=e.version!==0;return i.setUint8(0,e.version),i.setUint8(1,e.channels),i.setUint16(2,e.preSkip,s),i.setUint32(4,e.sampleRate,s),i.setUint16(8,e.outputGain,s),i.setUint8(10,e.channelMappingFamily),e.channelMappingFamily>0&&(i.setUint8(11,e.streamCount),e.channelMapping.foreach(function(r,a){i.setUint8(12+a,r)})),new Uint8Array(i.buffer)},va=function(e){return typeof e=="string"?Ws(e):e},cf=function(e){return Array.isArray(e)?e.map(function(t){return va(t)}):[va(e)]},Aa,ya=function(e){e=pe(e);for(var t=[],i=0;e.length>i;){var s=e[i],r=0,a=0;a++;var l=e[a];for(a++;l&128;)r=(l&127)<<7,l=e[a],a++;r+=l&127;for(var h=0;h<Aa.length;h++){var p=Aa[h],g=p.id,_=p.parser;if(s===g){t.push(_(e.subarray(a,a+r)));break}}i+=r+a}return t};Aa=[{id:3,parser:function(e){var t={tag:3,id:e[0]<<8|e[1],flags:e[2],size:3,dependsOnEsId:0,ocrEsId:0,descriptors:[],url:""};if(t.flags&128&&(t.dependsOnEsId=e[t.size]<<8|e[t.size+1],t.size+=2),t.flags&64){var i=e[t.size];t.url=Cn(e.subarray(t.size+1,t.size+1+i)),t.size+=i}return t.flags&32&&(t.ocrEsId=e[t.size]<<8|e[t.size+1],t.size+=2),t.descriptors=ya(e.subarray(t.size))||[],t}},{id:4,parser:function(e){var t={tag:4,oti:e[0],streamType:e[1],bufferSize:e[2]<<16|e[3]<<8|e[4],maxBitrate:e[5]<<24|e[6]<<16|e[7]<<8|e[8],avgBitrate:e[9]<<24|e[10]<<16|e[11]<<8|e[12],descriptors:ya(e.subarray(13))};return t}},{id:5,parser:function(e){return{tag:5,bytes:e}}},{id:6,parser:function(e){return{tag:6,bytes:e}}}];var Ft=function n(e,t,i){i===void 0&&(i=!1),t=cf(t),e=pe(e);var s=[];if(!t.length)return s;for(var r=0;r<e.length;){var a=(e[r]<<24|e[r+1]<<16|e[r+2]<<8|e[r+3])>>>0,l=e.subarray(r+4,r+8);if(a===0)break;var h=r+a;if(h>e.length){if(i)break;h=e.length}var p=e.subarray(r+8,h);$e(l,t[0])&&(t.length===1?s.push(p):s.push.apply(s,n(p,t.slice(1),i))),r=h}return s},wn=function(e,t){if(t=va(t),!t.length)return e.subarray(e.length);for(var i=0;i<e.length;){if(bytesMatch(e.subarray(i,i+t.length),t)){var s=(e[i-4]<<24|e[i-3]<<16|e[i-2]<<8|e[i-1])>>>0,r=s>1?i+s:e.byteLength;return e.subarray(i+4,r)}i++}return e.subarray(e.length)},ds=function(e,t,i){t===void 0&&(t=4),i===void 0&&(i=function(h){return bytesToNumber(h)});var s=[];if(!e||!e.length)return s;for(var r=bytesToNumber(e.subarray(4,8)),a=8;r;a+=t,r--)s.push(i(e.subarray(a,a+t)));return s},df=function(e,t){for(var i=ds(Ft(e,["stss"])[0]),s=ds(Ft(e,["stco"])[0]),r=ds(Ft(e,["stts"])[0],8,function(He){return{sampleCount:bytesToNumber(He.subarray(0,4)),sampleDelta:bytesToNumber(He.subarray(4,8))}}),a=ds(Ft(e,["stsc"])[0],12,function(He){return{firstChunk:bytesToNumber(He.subarray(0,4)),samplesPerChunk:bytesToNumber(He.subarray(4,8)),sampleDescriptionIndex:bytesToNumber(He.subarray(8,12))}}),l=Ft(e,["stsz"])[0],h=ds(l&&l.length&&l.subarray(4)||null),p=[],g=0;g<s.length;g++){for(var _=void 0,w=0;w<a.length;w++){var D=a[w],C=g+1>=D.firstChunk&&(w+1>=a.length||g+1<a[w+1].firstChunk);if(C){_=D.samplesPerChunk;break}}for(var I=s[g],R=0;R<_;R++){var q=h[p.length],L=!i.length;i.length&&i.indexOf(p.length+1)!==-1&&(L=!0);for(var X={keyframe:L,start:I,end:I+q},H=0;H<r.length;H++){var P=r[H],ce=P.sampleCount,Ee=P.sampleDelta;if(p.length<=ce){var Ve=p.length?p[p.length-1].timestamp:0;X.timestamp=Ve+Ee/t*1e3,X.duration=Ee;break}}p.push(X),I+=q}}return p},hf=function(e,t){var i=bytesToString(t.subarray(0,4));if(e.type==="video"?(e.info=e.info||{},e.info.width=t[28]<<8|t[29],e.info.height=t[30]<<8|t[31]):e.type==="audio"&&(e.info=e.info||{},e.info.channels=t[20]<<8|t[21],e.info.bitDepth=t[22]<<8|t[23],e.info.sampleRate=t[28]<<8|t[29]),i==="avc1"){var s=wn(t,"avcC");i+="."+getAvcCodec(s),e.info.avcC=s}else if(i==="hvc1"||i==="hev1")i+="."+getHvcCodec(wn(t,"hvcC"));else if(i==="mp4a"||i==="mp4v"){var r=wn(t,"esds"),a=ya(r.subarray(4))[0],l=a&&a.descriptors.filter(function(L){var X=L.tag;return X===4})[0];l?(i+="."+toHexString(l.oti),l.oti===64?i+="."+(l.descriptors[0].bytes[0]>>3).toString():l.oti===32?i+="."+l.descriptors[0].bytes[4].toString():l.oti===221&&(i="vorbis")):e.type==="audio"?i+=".40.2":i+=".20.9"}else if(i==="av01")i+="."+getAv1Codec(wn(t,"av1C"));else if(i==="vp09"){var h=wn(t,"vpcC"),p=h[0],g=h[1],_=h[2]>>4,w=(h[2]&15)>>1,D=(h[2]&15)>>3,C=h[3],I=h[4],R=h[5];i+="."+padStart(p,2,"0"),i+="."+padStart(g,2,"0"),i+="."+padStart(_,2,"0"),i+="."+padStart(w,2,"0"),i+="."+padStart(C,2,"0"),i+="."+padStart(I,2,"0"),i+="."+padStart(R,2,"0"),i+="."+padStart(D,2,"0")}else if(i==="theo")i="theora";else if(i==="spex")i="speex";else if(i===".mp3")i="mp4a.40.34";else if(i==="msVo")i="vorbis";else if(i==="Opus"){i="opus";var q=wn(t,"dOps");e.info.opus=parseOpusHead(q),e.info.codecDelay=65e5}else i=i.toLowerCase();e.codec=i},UA=function(e,t){t===void 0&&(t=!0),e=toUint8(e);var i=Ft(e,["moov","trak"],!0),s=[];return i.forEach(function(r){var a={bytes:r},l=Ft(r,["mdia"])[0],h=Ft(l,["hdlr"])[0],p=bytesToString(h.subarray(8,12));p==="soun"?a.type="audio":p==="vide"?a.type="video":a.type=p;var g=Ft(r,["tkhd"])[0];if(g){var _=new DataView(g.buffer,g.byteOffset,g.byteLength),w=_.getUint8(0);a.number=w===0?_.getUint32(12):_.getUint32(20)}var D=Ft(l,["mdhd"])[0];if(D){var C=D[0],I=C===0?12:20;a.timescale=(D[I]<<24|D[I+1]<<16|D[I+2]<<8|D[I+3])>>>0}for(var R=Ft(l,["minf","stbl"])[0],q=Ft(R,["stsd"])[0],L=bytesToNumber(q.subarray(4,8)),X=8;L--;){var H=bytesToNumber(q.subarray(X,X+4)),P=q.subarray(X+4,X+4+H);hf(a,P),X+=4+H}t&&(a.frameTable=df(R,a.timescale)),s.push(a)}),s},FA=function(e){var t=Ft(e,["moov","mvhd"],!0)[0];if(!(!t||!t.length)){var i={};return t[0]===1?(i.timestampScale=bytesToNumber(t.subarray(20,24)),i.duration=bytesToNumber(t.subarray(24,32))):(i.timestampScale=bytesToNumber(t.subarray(12,16)),i.duration=bytesToNumber(t.subarray(16,20))),i.bytes=t,i}},st={EBML:pe([26,69,223,163]),DocType:pe([66,130]),Segment:pe([24,83,128,103]),SegmentInfo:pe([21,73,169,102]),Tracks:pe([22,84,174,107]),Track:pe([174]),TrackNumber:pe([215]),DefaultDuration:pe([35,227,131]),TrackEntry:pe([174]),TrackType:pe([131]),FlagDefault:pe([136]),CodecID:pe([134]),CodecPrivate:pe([99,162]),VideoTrack:pe([224]),AudioTrack:pe([225]),Cluster:pe([31,67,182,117]),Timestamp:pe([231]),TimestampScale:pe([42,215,177]),BlockGroup:pe([160]),BlockDuration:pe([155]),Block:pe([161]),SimpleBlock:pe([163])},_a=[128,64,32,16,8,4,2,1],ff=function(e){for(var t=1,i=0;i<_a.length&&!(e&_a[i]);i++)t++;return t},nn=function(e,t,i,s){i===void 0&&(i=!0),s===void 0&&(s=!1);var r=ff(e[t]),a=e.subarray(t,t+r);return i&&(a=Array.prototype.slice.call(e,t,t+r),a[0]^=_a[r-1]),{length:r,value:ma(a,{signed:s}),bytes:a}},bl=function n(e){return typeof e=="string"?e.match(/.{1,2}/g).map(function(t){return n(t)}):typeof e=="number"?Hs(e):e},pf=function(e){return Array.isArray(e)?e.map(function(t){return bl(t)}):[bl(e)]},mf=function n(e,t,i){if(i>=t.length)return t.length;var s=nn(t,i,!1);if($e(e.bytes,s.bytes))return i;var r=nn(t,i+s.length);return n(e,t,i+r.length+r.value+s.length)},ct=function n(e,t){t=pf(t),e=pe(e);var i=[];if(!t.length)return i;for(var s=0;s<e.length;){var r=nn(e,s,!1),a=nn(e,s+r.length),l=s+r.length+a.length;a.value===127&&(a.value=mf(r,e,l),a.value!==e.length&&(a.value-=l));var h=l+a.value>e.length?e.length:l+a.value,p=e.subarray(l,h);$e(t[0],r.bytes)&&(t.length===1?i.push(p):i=i.concat(n(p,t.slice(1))));var g=r.length+a.length+p.length;s+=g}return i},gf=function(e,t,i,s){var r;t==="group"&&(r=ct(e,[st.BlockDuration])[0],r&&(r=bytesToNumber(r),r=1/i*r*i/1e3),e=ct(e,[st.Block])[0],t="block");var a=new DataView(e.buffer,e.byteOffset,e.byteLength),l=nn(e,0),h=a.getInt16(l.length,!1),p=e[l.length+2],g=e.subarray(l.length+3),_=1/i*(s+h)*i/1e3,w={duration:r,trackNumber:l.value,keyframe:t==="simple"&&p>>7===1,invisible:(p&8)>>3===1,lacing:(p&6)>>1,discardable:t==="simple"&&(p&1)===1,frames:[],pts:_,dts:_,timestamp:h};if(!w.lacing)return w.frames.push(g),w;var D=g[0]+1,C=[],I=1;if(w.lacing===2)for(var R=(g.length-I)/D,q=0;q<D;q++)C.push(R);if(w.lacing===1)for(var L=0;L<D-1;L++){var X=0;do X+=g[I],I++;while(g[I-1]===255);C.push(X)}if(w.lacing===3)for(var H=0,P=0;P<D-1;P++){var ce=P===0?nn(g,I):nn(g,I,!0,!0);H+=ce.value,C.push(H),I+=ce.length}return C.forEach(function(Ee){w.frames.push(g.subarray(I,I+Ee)),I+=Ee}),w},vf=function(e){for(var t=0,i={};t<e.length;){var s=e[t]&127,r=e[t+1],a=void 0;r===1?a=e[t+2]:a=e.subarray(t+2,t+2+r),s===1?i.profile=a:s===2?i.level=a:s===3?i.bitDepth=a:s===4?i.chromaSubsampling=a:i[s]=a,t+=2+r}return i},Af=function(e){e=toUint8(e);var t=[],i=ct(e,[st.Segment,st.Tracks,st.Track]);return i.length||(i=ct(e,[st.Tracks,st.Track])),i.length||(i=ct(e,[st.Track])),i.length?(i.forEach(function(s){var r=ct(s,st.TrackType)[0];if(!(!r||!r.length)){if(r[0]===1)r="video";else if(r[0]===2)r="audio";else if(r[0]===17)r="subtitle";else return;var a={rawCodec:bytesToString(ct(s,[st.CodecID])[0]),type:r,codecPrivate:ct(s,[st.CodecPrivate])[0],number:bytesToNumber(ct(s,[st.TrackNumber])[0]),defaultDuration:bytesToNumber(ct(s,[st.DefaultDuration])[0]),default:ct(s,[st.FlagDefault])[0],rawData:s},l="";if(/V_MPEG4\/ISO\/AVC/.test(a.rawCodec))l="avc1."+getAvcCodec(a.codecPrivate);else if(/V_MPEGH\/ISO\/HEVC/.test(a.rawCodec))l="hev1."+getHvcCodec(a.codecPrivate);else if(/V_MPEG4\/ISO\/ASP/.test(a.rawCodec))a.codecPrivate?l="mp4v.20."+a.codecPrivate[4].toString():l="mp4v.20.9";else if(/^V_THEORA/.test(a.rawCodec))l="theora";else if(/^V_VP8/.test(a.rawCodec))l="vp8";else if(/^V_VP9/.test(a.rawCodec))if(a.codecPrivate){var h=vf(a.codecPrivate),p=h.profile,g=h.level,_=h.bitDepth,w=h.chromaSubsampling;l="vp09.",l+=padStart(p,2,"0")+".",l+=padStart(g,2,"0")+".",l+=padStart(_,2,"0")+".",l+=""+padStart(w,2,"0");var D=ct(s,[224,[85,176],[85,177]])[0]||[],C=ct(s,[224,[85,176],[85,185]])[0]||[],I=ct(s,[224,[85,176],[85,186]])[0]||[],R=ct(s,[224,[85,176],[85,187]])[0]||[];(D.length||C.length||I.length||R.length)&&(l+="."+padStart(R[0],2,"0"),l+="."+padStart(I[0],2,"0"),l+="."+padStart(D[0],2,"0"),l+="."+padStart(C[0],2,"0"))}else l="vp9";else/^V_AV1/.test(a.rawCodec)?l="av01."+getAv1Codec(a.codecPrivate):/A_ALAC/.test(a.rawCodec)?l="alac":/A_MPEG\/L2/.test(a.rawCodec)?l="mp2":/A_MPEG\/L3/.test(a.rawCodec)?l="mp3":/^A_AAC/.test(a.rawCodec)?a.codecPrivate?l="mp4a.40."+(a.codecPrivate[0]>>>3).toString():l="mp4a.40.2":/^A_AC3/.test(a.rawCodec)?l="ac-3":/^A_PCM/.test(a.rawCodec)?l="pcm":/^A_MS\/ACM/.test(a.rawCodec)?l="speex":/^A_EAC3/.test(a.rawCodec)?l="ec-3":/^A_VORBIS/.test(a.rawCodec)?l="vorbis":/^A_FLAC/.test(a.rawCodec)?l="flac":/^A_OPUS/.test(a.rawCodec)&&(l="opus");a.codec=l,t.push(a)}}),t.sort(function(s,r){return s.number-r.number})):t},VA=function(e,t){var i=[],s=ct(e,[st.Segment])[0],r=ct(s,[st.SegmentInfo,st.TimestampScale])[0];r&&r.length?r=bytesToNumber(r):r=1e6;var a=ct(s,[st.Cluster]);return t||(t=Af(s)),a.forEach(function(l,h){var p=ct(l,[st.SimpleBlock]).map(function(D){return{type:"simple",data:D}}),g=ct(l,[st.BlockGroup]).map(function(D){return{type:"group",data:D}}),_=ct(l,[st.Timestamp])[0]||0;_&&_.length&&(_=bytesToNumber(_));var w=p.concat(g).sort(function(D,C){return D.data.byteOffset-C.data.byteOffset});w.forEach(function(D,C){var I=gf(D.data,D.type,r,_);i.push(I)})}),{tracks:t,blocks:i}},yf=pe([0,0,0,1]),_f=pe([0,0,1]),bf=pe([0,0,3]),Ef=function(e){for(var t=[],i=1;i<e.length-2;)$e(e.subarray(i,i+3),bf)&&(t.push(i+2),i++),i++;if(t.length===0)return e;var s=e.length-t.length,r=new Uint8Array(s),a=0;for(i=0;i<s;a++,i++)a===t[0]&&(a++,t.shift()),r[i]=e[a];return r},El=function(e,t,i,s){s===void 0&&(s=1/0),e=pe(e),i=[].concat(i);for(var r=0,a,l=0;r<e.length&&(l<s||a);){var h=void 0;if($e(e.subarray(r),yf)?h=4:$e(e.subarray(r),_f)&&(h=3),!h){r++;continue}if(l++,a)return Ef(e.subarray(a,r));var p=void 0;t==="h264"?p=e[r+h]&31:t==="h265"&&(p=e[r+h]>>1&63),i.indexOf(p)!==-1&&(a=r+h),r+=h+(t==="h264"?1:2)}return e.subarray(0,0)},Tf=function(e,t,i){return El(e,"h264",t,i)},Cf=function(e,t,i){return El(e,"h265",t,i)},Ot={webm:pe([119,101,98,109]),matroska:pe([109,97,116,114,111,115,107,97]),flac:pe([102,76,97,67]),ogg:pe([79,103,103,83]),ac3:pe([11,119]),riff:pe([82,73,70,70]),avi:pe([65,86,73]),wav:pe([87,65,86,69]),"3gp":pe([102,116,121,112,51,103]),mp4:pe([102,116,121,112]),fmp4:pe([115,116,121,112]),mov:pe([102,116,121,112,113,116]),moov:pe([109,111,111,118]),moof:pe([109,111,111,102])},Dn={aac:function(e){var t=cs(e);return $e(e,[255,16],{offset:t,mask:[255,22]})},mp3:function(e){var t=cs(e);return $e(e,[255,2],{offset:t,mask:[255,6]})},webm:function(e){var t=ct(e,[st.EBML,st.DocType])[0];return $e(t,Ot.webm)},mkv:function(e){var t=ct(e,[st.EBML,st.DocType])[0];return $e(t,Ot.matroska)},mp4:function(e){if(Dn["3gp"](e)||Dn.mov(e))return!1;if($e(e,Ot.mp4,{offset:4})||$e(e,Ot.fmp4,{offset:4})||$e(e,Ot.moof,{offset:4})||$e(e,Ot.moov,{offset:4}))return!0},mov:function(e){return $e(e,Ot.mov,{offset:4})},"3gp":function(e){return $e(e,Ot["3gp"],{offset:4})},ac3:function(e){var t=cs(e);return $e(e,Ot.ac3,{offset:t})},ts:function(e){if(e.length<189&&e.length>=1)return e[0]===71;for(var t=0;t+188<e.length&&t<188;){if(e[t]===71&&e[t+188]===71)return!0;t+=1}return!1},flac:function(e){var t=cs(e);return $e(e,Ot.flac,{offset:t})},ogg:function(e){return $e(e,Ot.ogg)},avi:function(e){return $e(e,Ot.riff)&&$e(e,Ot.avi,{offset:8})},wav:function(e){return $e(e,Ot.riff)&&$e(e,Ot.wav,{offset:8})},h264:function(e){return Tf(e,7,3).length},h265:function(e){return Cf(e,[32,33],3).length}},ba=Object.keys(Dn).filter(function(n){return n!=="ts"&&n!=="h264"&&n!=="h265"}).concat(["ts","h264","h265"]);ba.forEach(function(n){var e=Dn[n];Dn[n]=function(t){return e(pe(t))}});var xf=Dn,Ea=function(e){e=pe(e);for(var t=0;t<ba.length;t++){var i=ba[t];if(xf[i](e))return i}return""},Sf=function(e){return Ft(e,["moof"]).length>0},sn=z(9622);/**
 * @license
 * Video.js 8.12.0 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/main/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/main/LICENSE>
 */var Ta="8.12.0";const Pi={},Hi=function(n,e){return Pi[n]=Pi[n]||[],e&&(Pi[n]=Pi[n].concat(e)),Pi[n]},jf=function(n,e){Hi(n,e)},Tl=function(n,e){const t=Hi(n).indexOf(e);return t<=-1?!1:(Pi[n]=Pi[n].slice(),Pi[n].splice(t,1),!0)},Bf=function(n,e){Hi(n,[].concat(e).map(t=>{const i=(...s)=>(Tl(n,i),t(...s));return i}))},tr={prefixed:!0},ir=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror","fullscreen"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror","-webkit-full-screen"]],Cl=ir[0];let hs;for(let n=0;n<ir.length;n++)if(ir[n][1]in O()){hs=ir[n];break}if(hs){for(let n=0;n<hs.length;n++)tr[Cl[n]]=hs[n];tr.prefixed=hs[0]!==Cl[0]}let Vt=[];const wf=(n,e,t)=>(i,s,r)=>{const a=e.levels[s],l=new RegExp(`^(${a})$`);let h=n;if(i!=="log"&&r.unshift(i.toUpperCase()+":"),t&&(h=`%c${n}`,r.unshift(t)),r.unshift(h+":"),Vt){Vt.push([].concat(r));const g=Vt.length-1e3;Vt.splice(0,g>0?g:0)}if(!A().console)return;let p=A().console[i];!p&&i==="debug"&&(p=A().console.info||A().console.log),!(!p||!a||!l.test(i))&&p[Array.isArray(r)?"apply":"call"](A().console,r)};function Ca(n,e=":",t=""){let i="info",s;const r=function(...a){s("log",i,a)};return s=wf(n,r,t),r.createLogger=(a,l,h)=>{const p=l!==void 0?l:e,g=h!==void 0?h:t,_=`${n} ${p} ${a}`;return Ca(_,p,g)},r.createNewLogger=(a,l,h)=>Ca(a,l,h),r.levels={all:"debug|log|warn|error",off:"",debug:"debug|log|warn|error",info:"log|warn|error",warn:"warn|error",error:"error",DEFAULT:i},r.level=a=>{if(typeof a=="string"){if(!r.levels.hasOwnProperty(a))throw new Error(`"${a}" in not a valid log level`);i=a}return i},r.history=()=>Vt?[].concat(Vt):[],r.history.filter=a=>(Vt||[]).filter(l=>new RegExp(`.*${a}.*`).test(l[0])),r.history.clear=()=>{Vt&&(Vt.length=0)},r.history.disable=()=>{Vt!==null&&(Vt.length=0,Vt=null)},r.history.enable=()=>{Vt===null&&(Vt=[])},r.error=(...a)=>s("error",i,a),r.warn=(...a)=>s("warn",i,a),r.debug=(...a)=>s("debug",i,a),r}const Fe=Ca("VIDEOJS"),xl=Fe.createLogger,Df=Object.prototype.toString,Sl=function(n){return vi(n)?Object.keys(n):[]};function kn(n,e){Sl(n).forEach(t=>e(n[t],t))}function jl(n,e,t=0){return Sl(n).reduce((i,s)=>e(i,n[s],s),t)}function vi(n){return!!n&&typeof n=="object"}function In(n){return vi(n)&&Df.call(n)==="[object Object]"&&n.constructor===Object}function tt(...n){const e={};return n.forEach(t=>{t&&kn(t,(i,s)=>{if(!In(i)){e[s]=i;return}In(e[s])||(e[s]={}),e[s]=tt(e[s],i)})}),e}function Bl(n={}){const e=[];for(const t in n)if(n.hasOwnProperty(t)){const i=n[t];e.push(i)}return e}function nr(n,e,t,i=!0){const s=a=>Object.defineProperty(n,e,{value:a,enumerable:!0,writable:!0}),r={configurable:!0,enumerable:!0,get(){const a=t();return s(a),a}};return i&&(r.set=s),Object.defineProperty(n,e,r)}var kf=Object.freeze({__proto__:null,each:kn,reduce:jl,isObject:vi,isPlain:In,merge:tt,values:Bl,defineLazyProperty:nr});let xa=!1,wl=null,Ai=!1,Dl,kl=!1,Pn=!1,On=!1,yi=!1,Sa=null,sr=null,Il=null,rr=!1,ar=!1,or=!1,lr=!1,ja=!1,Ba=!1,wa=!1;const fs=!!(Ln()&&("ontouchstart"in A()||A().navigator.maxTouchPoints||A().DocumentTouch&&A().document instanceof A().DocumentTouch)),Wi=A().navigator&&A().navigator.userAgentData;if(Wi&&Wi.platform&&Wi.brands&&(Ai=Wi.platform==="Android",Pn=!!Wi.brands.find(n=>n.brand==="Microsoft Edge"),On=!!Wi.brands.find(n=>n.brand==="Chromium"),yi=!Pn&&On,Sa=sr=(Wi.brands.find(n=>n.brand==="Chromium")||{}).version||null,ar=Wi.platform==="Windows"),!On){const n=A().navigator&&A().navigator.userAgent||"";xa=/iPod/i.test(n),wl=function(){const e=n.match(/OS (\d+)_/i);return e&&e[1]?e[1]:null}(),Ai=/Android/i.test(n),Dl=function(){const e=n.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if(!e)return null;const t=e[1]&&parseFloat(e[1]),i=e[2]&&parseFloat(e[2]);return t&&i?parseFloat(e[1]+"."+e[2]):t||null}(),kl=/Firefox/i.test(n),Pn=/Edg/i.test(n),On=/Chrome/i.test(n)||/CriOS/i.test(n),yi=!Pn&&On,Sa=sr=function(){const e=n.match(/(Chrome|CriOS)\/(\d+)/);return e&&e[2]?parseFloat(e[2]):null}(),Il=function(){const e=/MSIE\s(\d+)\.\d/.exec(n);let t=e&&parseFloat(e[1]);return!t&&/Trident\/7.0/i.test(n)&&/rv:11.0/.test(n)&&(t=11),t}(),ja=/Tizen/i.test(n),Ba=/Web0S/i.test(n),wa=ja||Ba,rr=/Safari/i.test(n)&&!yi&&!Ai&&!Pn&&!wa,ar=/Windows/i.test(n),or=/iPad/i.test(n)||rr&&fs&&!/iPhone/i.test(n),lr=/iPhone/i.test(n)&&!or}const Lt=lr||or||xa,ur=(rr||Lt)&&!yi;var Pl=Object.freeze({__proto__:null,get IS_IPOD(){return xa},get IOS_VERSION(){return wl},get IS_ANDROID(){return Ai},get ANDROID_VERSION(){return Dl},get IS_FIREFOX(){return kl},get IS_EDGE(){return Pn},get IS_CHROMIUM(){return On},get IS_CHROME(){return yi},get CHROMIUM_VERSION(){return Sa},get CHROME_VERSION(){return sr},get IE_VERSION(){return Il},get IS_SAFARI(){return rr},get IS_WINDOWS(){return ar},get IS_IPAD(){return or},get IS_IPHONE(){return lr},get IS_TIZEN(){return ja},get IS_WEBOS(){return Ba},get IS_SMART_TV(){return wa},TOUCH_ENABLED:fs,IS_IOS:Lt,IS_ANY_SAFARI:ur});function Ol(n){return typeof n=="string"&&!!n.trim()}function If(n){if(n.indexOf(" ")>=0)throw new Error("class has illegal whitespace characters")}function Ln(){return O()===A().document}function Rn(n){return vi(n)&&n.nodeType===1}function Ll(){try{return A().parent!==A().self}catch(n){return!0}}function Rl(n){return function(e,t){if(!Ol(e))return O()[n](null);Ol(t)&&(t=O().querySelector(t));const i=Rn(t)?t:O();return i[n]&&i[n](e)}}function Me(n="div",e={},t={},i){const s=O().createElement(n);return Object.getOwnPropertyNames(e).forEach(function(r){const a=e[r];r==="textContent"?Gi(s,a):(s[r]!==a||r==="tabIndex")&&(s[r]=a)}),Object.getOwnPropertyNames(t).forEach(function(r){s.setAttribute(r,t[r])}),i&&ka(s,i),s}function Gi(n,e){return typeof n.textContent=="undefined"?n.innerText=e:n.textContent=e,n}function Da(n,e){e.firstChild?e.insertBefore(n,e.firstChild):e.appendChild(n)}function ps(n,e){return If(e),n.classList.contains(e)}function rn(n,...e){return n.classList.add(...e.reduce((t,i)=>t.concat(i.split(/\s+/)),[])),n}function cr(n,...e){return n?(n.classList.remove(...e.reduce((t,i)=>t.concat(i.split(/\s+/)),[])),n):(Fe.warn("removeClass was called with an element that doesn't exist"),null)}function Ml(n,e,t){return typeof t=="function"&&(t=t(n,e)),typeof t!="boolean"&&(t=void 0),e.split(/\s+/).forEach(i=>n.classList.toggle(i,t)),n}function Nl(n,e){Object.getOwnPropertyNames(e).forEach(function(t){const i=e[t];i===null||typeof i=="undefined"||i===!1?n.removeAttribute(t):n.setAttribute(t,i===!0?"":i)})}function $i(n){const e={},t=["autoplay","controls","playsinline","loop","muted","default","defaultMuted"];if(n&&n.attributes&&n.attributes.length>0){const i=n.attributes;for(let s=i.length-1;s>=0;s--){const r=i[s].name;let a=i[s].value;t.includes(r)&&(a=a!==null),e[r]=a}}return e}function Ul(n,e){return n.getAttribute(e)}function Mn(n,e,t){n.setAttribute(e,t)}function dr(n,e){n.removeAttribute(e)}function Fl(){O().body.focus(),O().onselectstart=function(){return!1}}function Vl(){O().onselectstart=function(){return!0}}function Nn(n){if(n&&n.getBoundingClientRect&&n.parentNode){const e=n.getBoundingClientRect(),t={};return["bottom","height","left","right","top","width"].forEach(i=>{e[i]!==void 0&&(t[i]=e[i])}),t.height||(t.height=parseFloat(Un(n,"height"))),t.width||(t.width=parseFloat(Un(n,"width"))),t}}function ms(n){if(!n||n&&!n.offsetParent)return{left:0,top:0,width:0,height:0};const e=n.offsetWidth,t=n.offsetHeight;let i=0,s=0;for(;n.offsetParent&&n!==O()[tr.fullscreenElement];)i+=n.offsetLeft,s+=n.offsetTop,n=n.offsetParent;return{left:i,top:s,width:e,height:t}}function hr(n,e){const t={x:0,y:0};if(Lt){let g=n;for(;g&&g.nodeName.toLowerCase()!=="html";){const _=Un(g,"transform");if(/^matrix/.test(_)){const w=_.slice(7,-1).split(/,\s/).map(Number);t.x+=w[4],t.y+=w[5]}else if(/^matrix3d/.test(_)){const w=_.slice(9,-1).split(/,\s/).map(Number);t.x+=w[12],t.y+=w[13]}g=g.parentNode}}const i={},s=ms(e.target),r=ms(n),a=r.width,l=r.height;let h=e.offsetY-(r.top-s.top),p=e.offsetX-(r.left-s.left);return e.changedTouches&&(p=e.changedTouches[0].pageX-r.left,h=e.changedTouches[0].pageY+r.top,Lt&&(p-=t.x,h-=t.y)),i.y=1-Math.max(0,Math.min(1,h/l)),i.x=Math.max(0,Math.min(1,p/a)),i}function ql(n){return vi(n)&&n.nodeType===3}function fr(n){for(;n.firstChild;)n.removeChild(n.firstChild);return n}function zl(n){return typeof n=="function"&&(n=n()),(Array.isArray(n)?n:[n]).map(e=>{if(typeof e=="function"&&(e=e()),Rn(e)||ql(e))return e;if(typeof e=="string"&&/\S/.test(e))return O().createTextNode(e)}).filter(e=>e)}function ka(n,e){return zl(e).forEach(t=>n.appendChild(t)),n}function Hl(n,e){return ka(fr(n),e)}function gs(n){return n.button===void 0&&n.buttons===void 0||n.button===0&&n.buttons===void 0||n.type==="mouseup"&&n.button===0&&n.buttons===0?!0:!(n.button!==0||n.buttons!==1)}const Xi=Rl("querySelector"),Wl=Rl("querySelectorAll");function Un(n,e){if(!n||!e)return"";if(typeof A().getComputedStyle=="function"){let t;try{t=A().getComputedStyle(n)}catch(i){return""}return t?t.getPropertyValue(e)||t[e]:""}return""}function Gl(n){[...O().styleSheets].forEach(e=>{try{const t=[...e.cssRules].map(s=>s.cssText).join(""),i=O().createElement("style");i.textContent=t,n.document.head.appendChild(i)}catch(t){const i=O().createElement("link");i.rel="stylesheet",i.type=e.type,i.media=e.media.mediaText,i.href=e.href,n.document.head.appendChild(i)}})}var $l=Object.freeze({__proto__:null,isReal:Ln,isEl:Rn,isInFrame:Ll,createEl:Me,textContent:Gi,prependTo:Da,hasClass:ps,addClass:rn,removeClass:cr,toggleClass:Ml,setAttributes:Nl,getAttributes:$i,getAttribute:Ul,setAttribute:Mn,removeAttribute:dr,blockTextSelection:Fl,unblockTextSelection:Vl,getBoundingClientRect:Nn,findPosition:ms,getPointerPosition:hr,isTextNode:ql,emptyEl:fr,normalizeContent:zl,appendContent:ka,insertContent:Hl,isSingleLeftClick:gs,$:Xi,$$:Wl,computedStyle:Un,copyStyleSheetsToWindow:Gl});let Xl=!1,Ia;const Pf=function(){if(Ia.options.autoSetup===!1)return;const n=Array.prototype.slice.call(O().getElementsByTagName("video")),e=Array.prototype.slice.call(O().getElementsByTagName("audio")),t=Array.prototype.slice.call(O().getElementsByTagName("video-js")),i=n.concat(e,t);if(i&&i.length>0)for(let s=0,r=i.length;s<r;s++){const a=i[s];if(a&&a.getAttribute)a.player===void 0&&a.getAttribute("data-setup")!==null&&Ia(a);else{Pa(1);break}}else Xl||Pa(1)};function Pa(n,e){Ln()&&(e&&(Ia=e),A().setTimeout(Pf,n))}function Oa(){Xl=!0,A().removeEventListener("load",Oa)}Ln()&&(O().readyState==="complete"?Oa():A().addEventListener("load",Oa));const Yl=function(n){const e=O().createElement("style");return e.className=n,e},Kl=function(n,e){n.styleSheet?n.styleSheet.cssText=e:n.textContent=e};var Rt=new WeakMap;let Of=3;function li(){return Of++}function Ql(n,e){if(!Rt.has(n))return;const t=Rt.get(n);t.handlers[e].length===0&&(delete t.handlers[e],n.removeEventListener?n.removeEventListener(e,t.dispatcher,!1):n.detachEvent&&n.detachEvent("on"+e,t.dispatcher)),Object.getOwnPropertyNames(t.handlers).length<=0&&(delete t.handlers,delete t.dispatcher,delete t.disabled),Object.getOwnPropertyNames(t).length===0&&Rt.delete(n)}function La(n,e,t,i){t.forEach(function(s){n(e,s,i)})}function pr(n){if(n.fixed_)return n;function e(){return!0}function t(){return!1}if(!n||!n.isPropagationStopped||!n.isImmediatePropagationStopped){const i=n||A().event;n={};for(const s in i)s!=="layerX"&&s!=="layerY"&&s!=="keyLocation"&&s!=="webkitMovementX"&&s!=="webkitMovementY"&&s!=="path"&&(s==="returnValue"&&i.preventDefault||(n[s]=i[s]));if(n.target||(n.target=n.srcElement||O()),n.relatedTarget||(n.relatedTarget=n.fromElement===n.target?n.toElement:n.fromElement),n.preventDefault=function(){i.preventDefault&&i.preventDefault(),n.returnValue=!1,i.returnValue=!1,n.defaultPrevented=!0},n.defaultPrevented=!1,n.stopPropagation=function(){i.stopPropagation&&i.stopPropagation(),n.cancelBubble=!0,i.cancelBubble=!0,n.isPropagationStopped=e},n.isPropagationStopped=t,n.stopImmediatePropagation=function(){i.stopImmediatePropagation&&i.stopImmediatePropagation(),n.isImmediatePropagationStopped=e,n.stopPropagation()},n.isImmediatePropagationStopped=t,n.clientX!==null&&n.clientX!==void 0){const s=O().documentElement,r=O().body;n.pageX=n.clientX+(s&&s.scrollLeft||r&&r.scrollLeft||0)-(s&&s.clientLeft||r&&r.clientLeft||0),n.pageY=n.clientY+(s&&s.scrollTop||r&&r.scrollTop||0)-(s&&s.clientTop||r&&r.clientTop||0)}n.which=n.charCode||n.keyCode,n.button!==null&&n.button!==void 0&&(n.button=n.button&1?0:n.button&4?1:n.button&2?2:0)}return n.fixed_=!0,n}let mr;const Lf=function(){if(typeof mr!="boolean"){mr=!1;try{const n=Object.defineProperty({},"passive",{get(){mr=!0}});A().addEventListener("test",null,n),A().removeEventListener("test",null,n)}catch(n){}}return mr},Rf=["touchstart","touchmove"];function $t(n,e,t){if(Array.isArray(e))return La($t,n,e,t);Rt.has(n)||Rt.set(n,{});const i=Rt.get(n);if(i.handlers||(i.handlers={}),i.handlers[e]||(i.handlers[e]=[]),t.guid||(t.guid=li()),i.handlers[e].push(t),i.dispatcher||(i.disabled=!1,i.dispatcher=function(s,r){if(i.disabled)return;s=pr(s);const a=i.handlers[s.type];if(a){const l=a.slice(0);for(let h=0,p=l.length;h<p&&!s.isImmediatePropagationStopped();h++)try{l[h].call(n,s,r)}catch(g){Fe.error(g)}}}),i.handlers[e].length===1)if(n.addEventListener){let s=!1;Lf()&&Rf.indexOf(e)>-1&&(s={passive:!0}),n.addEventListener(e,i.dispatcher,s)}else n.attachEvent&&n.attachEvent("on"+e,i.dispatcher)}function wt(n,e,t){if(!Rt.has(n))return;const i=Rt.get(n);if(!i.handlers)return;if(Array.isArray(e))return La(wt,n,e,t);const s=function(a,l){i.handlers[l]=[],Ql(a,l)};if(e===void 0){for(const a in i.handlers)Object.prototype.hasOwnProperty.call(i.handlers||{},a)&&s(n,a);return}const r=i.handlers[e];if(r){if(!t){s(n,e);return}if(t.guid)for(let a=0;a<r.length;a++)r[a].guid===t.guid&&r.splice(a--,1);Ql(n,e)}}function Fn(n,e,t){const i=Rt.has(n)?Rt.get(n):{},s=n.parentNode||n.ownerDocument;if(typeof e=="string"?e={type:e,target:n}:e.target||(e.target=n),e=pr(e),i.dispatcher&&i.dispatcher.call(n,e,t),s&&!e.isPropagationStopped()&&e.bubbles===!0)Fn.call(null,s,e,t);else if(!s&&!e.defaultPrevented&&e.target&&e.target[e.type]){Rt.has(e.target)||Rt.set(e.target,{});const r=Rt.get(e.target);e.target[e.type]&&(r.disabled=!0,typeof e.target[e.type]=="function"&&e.target[e.type](),r.disabled=!1)}return!e.defaultPrevented}function gr(n,e,t){if(Array.isArray(e))return La(gr,n,e,t);const i=function(){wt(n,e,i),t.apply(this,arguments)};i.guid=t.guid=t.guid||li(),$t(n,e,i)}function Ra(n,e,t){const i=function(){wt(n,e,i),t.apply(this,arguments)};i.guid=t.guid=t.guid||li(),$t(n,e,i)}var Mf=Object.freeze({__proto__:null,fixEvent:pr,on:$t,off:wt,trigger:Fn,one:gr,any:Ra});const ei=30,it=function(n,e,t){e.guid||(e.guid=li());const i=e.bind(n);return i.guid=t?t+"_"+e.guid:e.guid,i},_i=function(n,e){let t=A().performance.now();return function(...s){const r=A().performance.now();r-t>=e&&(n(...s),t=r)}},Jl=function(n,e,t,i=A()){let s;const r=()=>{i.clearTimeout(s),s=null},a=function(){const l=this,h=arguments;let p=function(){s=null,p=null,t||n.apply(l,h)};!s&&t&&n.apply(l,h),i.clearTimeout(s),s=i.setTimeout(p,e)};return a.cancel=r,a};var Nf=Object.freeze({__proto__:null,UPDATE_REFRESH_INTERVAL:ei,bind_:it,throttle:_i,debounce:Jl});let vs;class ti{on(e,t){const i=this.addEventListener;this.addEventListener=()=>{},$t(this,e,t),this.addEventListener=i}off(e,t){wt(this,e,t)}one(e,t){const i=this.addEventListener;this.addEventListener=()=>{},gr(this,e,t),this.addEventListener=i}any(e,t){const i=this.addEventListener;this.addEventListener=()=>{},Ra(this,e,t),this.addEventListener=i}trigger(e){const t=e.type||e;typeof e=="string"&&(e={type:t}),e=pr(e),this.allowedEvents_[t]&&this["on"+t]&&this["on"+t](e),Fn(this,e)}queueTrigger(e){vs||(vs=new Map);const t=e.type||e;let i=vs.get(this);i||(i=new Map,vs.set(this,i));const s=i.get(t);i.delete(t),A().clearTimeout(s);const r=A().setTimeout(()=>{i.delete(t),i.size===0&&(i=null,vs.delete(this)),this.trigger(e)},0);i.set(t,r)}}ti.prototype.allowedEvents_={},ti.prototype.addEventListener=ti.prototype.on,ti.prototype.removeEventListener=ti.prototype.off,ti.prototype.dispatchEvent=ti.prototype.trigger;const vr=n=>typeof n.name=="function"?n.name():typeof n.name=="string"?n.name:n.name_?n.name_:n.constructor&&n.constructor.name?n.constructor.name:typeof n,Oi=n=>n instanceof ti||!!n.eventBusEl_&&["on","one","off","trigger"].every(e=>typeof n[e]=="function"),Uf=(n,e)=>{Oi(n)?e():(n.eventedCallbacks||(n.eventedCallbacks=[]),n.eventedCallbacks.push(e))},Ma=n=>typeof n=="string"&&/\S/.test(n)||Array.isArray(n)&&!!n.length,Ar=(n,e,t)=>{if(!n||!n.nodeName&&!Oi(n))throw new Error(`Invalid target for ${vr(e)}#${t}; must be a DOM node or evented object.`)},Zl=(n,e,t)=>{if(!Ma(n))throw new Error(`Invalid event type for ${vr(e)}#${t}; must be a non-empty string or array.`)},eu=(n,e,t)=>{if(typeof n!="function")throw new Error(`Invalid listener for ${vr(e)}#${t}; must be a function.`)},Na=(n,e,t)=>{const i=e.length<3||e[0]===n||e[0]===n.eventBusEl_;let s,r,a;return i?(s=n.eventBusEl_,e.length>=3&&e.shift(),[r,a]=e):[s,r,a]=e,Ar(s,n,t),Zl(r,n,t),eu(a,n,t),a=it(n,a),{isTargetingSelf:i,target:s,type:r,listener:a}},an=(n,e,t,i)=>{Ar(n,n,e),n.nodeName?Mf[e](n,t,i):n[e](t,i)},Ff={on(...n){const{isTargetingSelf:e,target:t,type:i,listener:s}=Na(this,n,"on");if(an(t,"on",i,s),!e){const r=()=>this.off(t,i,s);r.guid=s.guid;const a=()=>this.off("dispose",r);a.guid=s.guid,an(this,"on","dispose",r),an(t,"on","dispose",a)}},one(...n){const{isTargetingSelf:e,target:t,type:i,listener:s}=Na(this,n,"one");if(e)an(t,"one",i,s);else{const r=(...a)=>{this.off(t,i,r),s.apply(null,a)};r.guid=s.guid,an(t,"one",i,r)}},any(...n){const{isTargetingSelf:e,target:t,type:i,listener:s}=Na(this,n,"any");if(e)an(t,"any",i,s);else{const r=(...a)=>{this.off(t,i,r),s.apply(null,a)};r.guid=s.guid,an(t,"any",i,r)}},off(n,e,t){if(!n||Ma(n))wt(this.eventBusEl_,n,e);else{const i=n,s=e;Ar(i,this,"off"),Zl(s,this,"off"),eu(t,this,"off"),t=it(this,t),this.off("dispose",t),i.nodeName?(wt(i,s,t),wt(i,"dispose",t)):Oi(i)&&(i.off(s,t),i.off("dispose",t))}},trigger(n,e){Ar(this.eventBusEl_,this,"trigger");const t=n&&typeof n!="string"?n.type:n;if(!Ma(t))throw new Error(`Invalid event type for ${vr(this)}#trigger; must be a non-empty string or object with a type key that has a non-empty value.`);return Fn(this.eventBusEl_,n,e)}};function Ua(n,e={}){const{eventBusKey:t}=e;if(t){if(!n[t].nodeName)throw new Error(`The eventBusKey "${t}" does not refer to an element.`);n.eventBusEl_=n[t]}else n.eventBusEl_=Me("span",{className:"vjs-event-bus"});return Object.assign(n,Ff),n.eventedCallbacks&&n.eventedCallbacks.forEach(i=>{i()}),n.on("dispose",()=>{n.off(),[n,n.el_,n.eventBusEl_].forEach(function(i){i&&Rt.has(i)&&Rt.delete(i)}),A().setTimeout(()=>{n.eventBusEl_=null},0)}),n}const Vf={state:{},setState(n){typeof n=="function"&&(n=n());let e;return kn(n,(t,i)=>{this.state[i]!==t&&(e=e||{},e[i]={from:this.state[i],to:t}),this.state[i]=t}),e&&Oi(this)&&this.trigger({changes:e,type:"statechanged"}),e}};function tu(n,e){return Object.assign(n,Vf),n.state=Object.assign({},n.state,e),typeof n.handleStateChanged=="function"&&Oi(n)&&n.on("statechanged",n.handleStateChanged),n}const As=function(n){return typeof n!="string"?n:n.replace(/./,e=>e.toLowerCase())},pt=function(n){return typeof n!="string"?n:n.replace(/./,e=>e.toUpperCase())},iu=function(n,e){return pt(n)===pt(e)};var qf=Object.freeze({__proto__:null,toLowerCase:As,toTitleCase:pt,titleCaseEquals:iu});class W{constructor(e,t,i){if(!e&&this.play?this.player_=e=this:this.player_=e,this.isDisposed_=!1,this.parentComponent_=null,this.options_=tt({},this.options_),t=this.options_=tt(this.options_,t),this.id_=t.id||t.el&&t.el.id,!this.id_){const s=e&&e.id&&e.id()||"no_player";this.id_=`${s}_component_${li()}`}this.name_=t.name||null,t.el?this.el_=t.el:t.createEl!==!1&&(this.el_=this.createEl()),t.className&&this.el_&&t.className.split(" ").forEach(s=>this.addClass(s)),["on","off","one","any","trigger"].forEach(s=>{this[s]=void 0}),t.evented!==!1&&(Ua(this,{eventBusKey:this.el_?"el_":null}),this.handleLanguagechange=this.handleLanguagechange.bind(this),this.on(this.player_,"languagechange",this.handleLanguagechange)),tu(this,this.constructor.defaultState),this.children_=[],this.childIndex_={},this.childNameIndex_={},this.setTimeoutIds_=new Set,this.setIntervalIds_=new Set,this.rafIds_=new Set,this.namedRafs_=new Map,this.clearingTimersOnDispose_=!1,t.initChildren!==!1&&this.initChildren(),this.ready(i),t.reportTouchActivity!==!1&&this.enableTouchActivity()}on(e,t){}off(e,t){}one(e,t){}any(e,t){}trigger(e,t){}dispose(e={}){if(!this.isDisposed_){if(this.readyQueue_&&(this.readyQueue_.length=0),this.trigger({type:"dispose",bubbles:!1}),this.isDisposed_=!0,this.children_)for(let t=this.children_.length-1;t>=0;t--)this.children_[t].dispose&&this.children_[t].dispose();this.children_=null,this.childIndex_=null,this.childNameIndex_=null,this.parentComponent_=null,this.el_&&(this.el_.parentNode&&(e.restoreEl?this.el_.parentNode.replaceChild(e.restoreEl,this.el_):this.el_.parentNode.removeChild(this.el_)),this.el_=null),this.player_=null}}isDisposed(){return!!this.isDisposed_}player(){return this.player_}options(e){return e?(this.options_=tt(this.options_,e),this.options_):this.options_}el(){return this.el_}createEl(e,t,i){return Me(e,t,i)}localize(e,t,i=e){const s=this.player_.language&&this.player_.language(),r=this.player_.languages&&this.player_.languages(),a=r&&r[s],l=s&&s.split("-")[0],h=r&&r[l];let p=i;return a&&a[e]?p=a[e]:h&&h[e]&&(p=h[e]),t&&(p=p.replace(/\{(\d+)\}/g,function(g,_){const w=t[_-1];let D=w;return typeof w=="undefined"&&(D=g),D})),p}handleLanguagechange(){}contentEl(){return this.contentEl_||this.el_}id(){return this.id_}name(){return this.name_}children(){return this.children_}getChildById(e){return this.childIndex_[e]}getChild(e){if(e)return this.childNameIndex_[e]}getDescendant(...e){e=e.reduce((i,s)=>i.concat(s),[]);let t=this;for(let i=0;i<e.length;i++)if(t=t.getChild(e[i]),!t||!t.getChild)return;return t}setIcon(e,t=this.el()){if(!this.player_.options_.experimentalSvgIcons)return;const i="http://www.w3.org/2000/svg",s=Me("span",{className:"vjs-icon-placeholder vjs-svg-icon"},{"aria-hidden":"true"}),r=O().createElementNS(i,"svg");r.setAttributeNS(null,"viewBox","0 0 512 512");const a=O().createElementNS(i,"use");return r.appendChild(a),a.setAttributeNS(null,"href",`#vjs-icon-${e}`),s.appendChild(r),this.iconIsSet_?t.replaceChild(s,t.querySelector(".vjs-icon-placeholder")):t.appendChild(s),this.iconIsSet_=!0,s}addChild(e,t={},i=this.children_.length){let s,r;if(typeof e=="string"){r=pt(e);const a=t.componentClass||r;t.name=r;const l=W.getComponent(a);if(!l)throw new Error(`Component ${a} does not exist`);if(typeof l!="function")return null;s=new l(this.player_||this,t)}else s=e;if(s.parentComponent_&&s.parentComponent_.removeChild(s),this.children_.splice(i,0,s),s.parentComponent_=this,typeof s.id=="function"&&(this.childIndex_[s.id()]=s),r=r||s.name&&pt(s.name()),r&&(this.childNameIndex_[r]=s,this.childNameIndex_[As(r)]=s),typeof s.el=="function"&&s.el()){let a=null;this.children_[i+1]&&(this.children_[i+1].el_?a=this.children_[i+1].el_:Rn(this.children_[i+1])&&(a=this.children_[i+1])),this.contentEl().insertBefore(s.el(),a)}return s}removeChild(e){if(typeof e=="string"&&(e=this.getChild(e)),!e||!this.children_)return;let t=!1;for(let s=this.children_.length-1;s>=0;s--)if(this.children_[s]===e){t=!0,this.children_.splice(s,1);break}if(!t)return;e.parentComponent_=null,this.childIndex_[e.id()]=null,this.childNameIndex_[pt(e.name())]=null,this.childNameIndex_[As(e.name())]=null;const i=e.el();i&&i.parentNode===this.contentEl()&&this.contentEl().removeChild(e.el())}initChildren(){const e=this.options_.children;if(e){const t=this.options_,i=a=>{const l=a.name;let h=a.opts;if(t[l]!==void 0&&(h=t[l]),h===!1)return;h===!0&&(h={}),h.playerOptions=this.options_.playerOptions;const p=this.addChild(l,h);p&&(this[l]=p)};let s;const r=W.getComponent("Tech");Array.isArray(e)?s=e:s=Object.keys(e),s.concat(Object.keys(this.options_).filter(function(a){return!s.some(function(l){return typeof l=="string"?a===l:a===l.name})})).map(a=>{let l,h;return typeof a=="string"?(l=a,h=e[l]||this.options_[l]||{}):(l=a.name,h=a),{name:l,opts:h}}).filter(a=>{const l=W.getComponent(a.opts.componentClass||pt(a.name));return l&&!r.isTech(l)}).forEach(i)}}buildCSSClass(){return""}ready(e,t=!1){if(e){if(!this.isReady_){this.readyQueue_=this.readyQueue_||[],this.readyQueue_.push(e);return}t?e.call(this):this.setTimeout(e,1)}}triggerReady(){this.isReady_=!0,this.setTimeout(function(){const e=this.readyQueue_;this.readyQueue_=[],e&&e.length>0&&e.forEach(function(t){t.call(this)},this),this.trigger("ready")},1)}$(e,t){return Xi(e,t||this.contentEl())}$$(e,t){return Wl(e,t||this.contentEl())}hasClass(e){return ps(this.el_,e)}addClass(...e){rn(this.el_,...e)}removeClass(...e){cr(this.el_,...e)}toggleClass(e,t){Ml(this.el_,e,t)}show(){this.removeClass("vjs-hidden")}hide(){this.addClass("vjs-hidden")}lockShowing(){this.addClass("vjs-lock-showing")}unlockShowing(){this.removeClass("vjs-lock-showing")}getAttribute(e){return Ul(this.el_,e)}setAttribute(e,t){Mn(this.el_,e,t)}removeAttribute(e){dr(this.el_,e)}width(e,t){return this.dimension("width",e,t)}height(e,t){return this.dimension("height",e,t)}dimensions(e,t){this.width(e,!0),this.height(t)}dimension(e,t,i){if(t!==void 0){(t===null||t!==t)&&(t=0),(""+t).indexOf("%")!==-1||(""+t).indexOf("px")!==-1?this.el_.style[e]=t:t==="auto"?this.el_.style[e]="":this.el_.style[e]=t+"px",i||this.trigger("componentresize");return}if(!this.el_)return 0;const s=this.el_.style[e],r=s.indexOf("px");return parseInt(r!==-1?s.slice(0,r):this.el_["offset"+pt(e)],10)}currentDimension(e){let t=0;if(e!=="width"&&e!=="height")throw new Error("currentDimension only accepts width or height value");if(t=Un(this.el_,e),t=parseFloat(t),t===0||isNaN(t)){const i=`offset${pt(e)}`;t=this.el_[i]}return t}currentDimensions(){return{width:this.currentDimension("width"),height:this.currentDimension("height")}}currentWidth(){return this.currentDimension("width")}currentHeight(){return this.currentDimension("height")}focus(){this.el_.focus()}blur(){this.el_.blur()}handleKeyDown(e){this.player_&&(U().isEventKey(e,"Tab")||e.stopPropagation(),this.player_.handleKeyDown(e))}handleKeyPress(e){this.handleKeyDown(e)}emitTapEvents(){let e=0,t=null;const i=10,s=200;let r;this.on("touchstart",function(l){l.touches.length===1&&(t={pageX:l.touches[0].pageX,pageY:l.touches[0].pageY},e=A().performance.now(),r=!0)}),this.on("touchmove",function(l){if(l.touches.length>1)r=!1;else if(t){const h=l.touches[0].pageX-t.pageX,p=l.touches[0].pageY-t.pageY;Math.sqrt(h*h+p*p)>i&&(r=!1)}});const a=function(){r=!1};this.on("touchleave",a),this.on("touchcancel",a),this.on("touchend",function(l){t=null,r===!0&&A().performance.now()-e<s&&(l.preventDefault(),this.trigger("tap"))})}enableTouchActivity(){if(!this.player()||!this.player().reportUserActivity)return;const e=it(this.player(),this.player().reportUserActivity);let t;this.on("touchstart",function(){e(),this.clearInterval(t),t=this.setInterval(e,250)});const i=function(s){e(),this.clearInterval(t)};this.on("touchmove",e),this.on("touchend",i),this.on("touchcancel",i)}setTimeout(e,t){var i;return e=it(this,e),this.clearTimersOnDispose_(),i=A().setTimeout(()=>{this.setTimeoutIds_.has(i)&&this.setTimeoutIds_.delete(i),e()},t),this.setTimeoutIds_.add(i),i}clearTimeout(e){return this.setTimeoutIds_.has(e)&&(this.setTimeoutIds_.delete(e),A().clearTimeout(e)),e}setInterval(e,t){e=it(this,e),this.clearTimersOnDispose_();const i=A().setInterval(e,t);return this.setIntervalIds_.add(i),i}clearInterval(e){return this.setIntervalIds_.has(e)&&(this.setIntervalIds_.delete(e),A().clearInterval(e)),e}requestAnimationFrame(e){this.clearTimersOnDispose_();var t;return e=it(this,e),t=A().requestAnimationFrame(()=>{this.rafIds_.has(t)&&this.rafIds_.delete(t),e()}),this.rafIds_.add(t),t}requestNamedAnimationFrame(e,t){if(this.namedRafs_.has(e))return;this.clearTimersOnDispose_(),t=it(this,t);const i=this.requestAnimationFrame(()=>{t(),this.namedRafs_.has(e)&&this.namedRafs_.delete(e)});return this.namedRafs_.set(e,i),e}cancelNamedAnimationFrame(e){this.namedRafs_.has(e)&&(this.cancelAnimationFrame(this.namedRafs_.get(e)),this.namedRafs_.delete(e))}cancelAnimationFrame(e){return this.rafIds_.has(e)&&(this.rafIds_.delete(e),A().cancelAnimationFrame(e)),e}clearTimersOnDispose_(){this.clearingTimersOnDispose_||(this.clearingTimersOnDispose_=!0,this.one("dispose",()=>{[["namedRafs_","cancelNamedAnimationFrame"],["rafIds_","cancelAnimationFrame"],["setTimeoutIds_","clearTimeout"],["setIntervalIds_","clearInterval"]].forEach(([e,t])=>{this[e].forEach((i,s)=>this[t](s))}),this.clearingTimersOnDispose_=!1}))}static registerComponent(e,t){if(typeof e!="string"||!e)throw new Error(`Illegal component name, "${e}"; must be a non-empty string.`);const i=W.getComponent("Tech"),s=i&&i.isTech(t),r=W===t||W.prototype.isPrototypeOf(t.prototype);if(s||!r){let l;throw s?l="techs must be registered using Tech.registerTech()":l="must be a Component subclass",new Error(`Illegal component, "${e}"; ${l}.`)}e=pt(e),W.components_||(W.components_={});const a=W.getComponent("Player");if(e==="Player"&&a&&a.players){const l=a.players,h=Object.keys(l);if(l&&h.length>0&&h.map(p=>l[p]).every(Boolean))throw new Error("Can not register Player component after player has been created.")}return W.components_[e]=t,W.components_[As(e)]=t,t}static getComponent(e){if(!(!e||!W.components_))return W.components_[e]}}W.registerComponent("Component",W);function zf(n,e,t){if(typeof e!="number"||e<0||e>t)throw new Error(`Failed to execute '${n}' on 'TimeRanges': The index provided (${e}) is non-numeric or out of bounds (0-${t}).`)}function nu(n,e,t,i){return zf(n,i,t.length-1),t[i][e]}function Fa(n){let e;return n===void 0||n.length===0?e={length:0,start(){throw new Error("This TimeRanges object is empty")},end(){throw new Error("This TimeRanges object is empty")}}:e={length:n.length,start:nu.bind(null,"start",0,n),end:nu.bind(null,"end",1,n)},A().Symbol&&A().Symbol.iterator&&(e[A().Symbol.iterator]=()=>(n||[]).values()),e}function ui(n,e){return Array.isArray(n)?Fa(n):n===void 0||e===void 0?Fa():Fa([[n,e]])}const su=function(n,e){n=n<0?0:n;let t=Math.floor(n%60),i=Math.floor(n/60%60),s=Math.floor(n/3600);const r=Math.floor(e/60%60),a=Math.floor(e/3600);return(isNaN(n)||n===1/0)&&(s=i=t="-"),s=s>0||a>0?s+":":"",i=((s||r>=10)&&i<10?"0"+i:i)+":",t=t<10?"0"+t:t,s+i+t};let Va=su;function ru(n){Va=n}function au(){Va=su}function on(n,e=n){return Va(n,e)}var Hf=Object.freeze({__proto__:null,createTimeRanges:ui,createTimeRange:ui,setFormatTime:ru,resetFormatTime:au,formatTime:on});function ou(n,e){let t=0,i,s;if(!e)return 0;(!n||!n.length)&&(n=ui(0,0));for(let r=0;r<n.length;r++)i=n.start(r),s=n.end(r),s>e&&(s=e),t+=s-i;return t/e}function dt(n){if(n instanceof dt)return n;typeof n=="number"?this.code=n:typeof n=="string"?this.message=n:vi(n)&&(typeof n.code=="number"&&(this.code=n.code),Object.assign(this,n)),this.message||(this.message=dt.defaultMessages[this.code]||"")}dt.prototype.code=0,dt.prototype.message="",dt.prototype.status=null,dt.prototype.metadata=null,dt.errorTypes=["MEDIA_ERR_CUSTOM","MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_ERR_ENCRYPTED"],dt.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail part-way.",3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",4:"The media could not be loaded, either because the server or network failed or because the format is not supported.",5:"The media is encrypted and we do not have the keys to decrypt it."},dt.MEDIA_ERR_CUSTOM=0,dt.prototype.MEDIA_ERR_CUSTOM=0,dt.MEDIA_ERR_ABORTED=1,dt.prototype.MEDIA_ERR_ABORTED=1,dt.MEDIA_ERR_NETWORK=2,dt.prototype.MEDIA_ERR_NETWORK=2,dt.MEDIA_ERR_DECODE=3,dt.prototype.MEDIA_ERR_DECODE=3,dt.MEDIA_ERR_SRC_NOT_SUPPORTED=4,dt.prototype.MEDIA_ERR_SRC_NOT_SUPPORTED=4,dt.MEDIA_ERR_ENCRYPTED=5,dt.prototype.MEDIA_ERR_ENCRYPTED=5;function ys(n){return n!=null&&typeof n.then=="function"}function bi(n){ys(n)&&n.then(null,e=>{})}const qa=function(n){return["kind","label","language","id","inBandMetadataTrackDispatchType","mode","src"].reduce((t,i,s)=>(n[i]&&(t[i]=n[i]),t),{cues:n.cues&&Array.prototype.map.call(n.cues,function(t){return{startTime:t.startTime,endTime:t.endTime,text:t.text,id:t.id}})})};var lu={textTracksToJson:function(n){const e=n.$$("track"),t=Array.prototype.map.call(e,s=>s.track);return Array.prototype.map.call(e,function(s){const r=qa(s.track);return s.src&&(r.src=s.src),r}).concat(Array.prototype.filter.call(n.textTracks(),function(s){return t.indexOf(s)===-1}).map(qa))},jsonToTextTracks:function(n,e){return n.forEach(function(t){const i=e.addRemoteTextTrack(t).track;!t.src&&t.cues&&t.cues.forEach(s=>i.addCue(s))}),e.textTracks()},trackToJson_:qa};const za="vjs-modal-dialog";class Vn extends W{constructor(e,t){super(e,t),this.handleKeyDown_=i=>this.handleKeyDown(i),this.close_=i=>this.close(i),this.opened_=this.hasBeenOpened_=this.hasBeenFilled_=!1,this.closeable(!this.options_.uncloseable),this.content(this.options_.content),this.contentEl_=Me("div",{className:`${za}-content`},{role:"document"}),this.descEl_=Me("p",{className:`${za}-description vjs-control-text`,id:this.el().getAttribute("aria-describedby")}),Gi(this.descEl_,this.description()),this.el_.appendChild(this.descEl_),this.el_.appendChild(this.contentEl_)}createEl(){return super.createEl("div",{className:this.buildCSSClass(),tabIndex:-1},{"aria-describedby":`${this.id()}_description`,"aria-hidden":"true","aria-label":this.label(),role:"dialog","aria-live":"polite"})}dispose(){this.contentEl_=null,this.descEl_=null,this.previouslyActiveEl_=null,super.dispose()}buildCSSClass(){return`${za} vjs-hidden ${super.buildCSSClass()}`}label(){return this.localize(this.options_.label||"Modal Window")}description(){let e=this.options_.description||this.localize("This is a modal window.");return this.closeable()&&(e+=" "+this.localize("This modal can be closed by pressing the Escape key or activating the close button.")),e}open(){if(this.opened_){this.options_.fillAlways&&this.fill();return}const e=this.player();this.trigger("beforemodalopen"),this.opened_=!0,(this.options_.fillAlways||!this.hasBeenOpened_&&!this.hasBeenFilled_)&&this.fill(),this.wasPlaying_=!e.paused(),this.options_.pauseOnOpen&&this.wasPlaying_&&e.pause(),this.on("keydown",this.handleKeyDown_),this.hadControls_=e.controls(),e.controls(!1),this.show(),this.conditionalFocus_(),this.el().setAttribute("aria-hidden","false"),this.trigger("modalopen"),this.hasBeenOpened_=!0}opened(e){return typeof e=="boolean"&&this[e?"open":"close"](),this.opened_}close(){if(!this.opened_)return;const e=this.player();this.trigger("beforemodalclose"),this.opened_=!1,this.wasPlaying_&&this.options_.pauseOnOpen&&e.play(),this.off("keydown",this.handleKeyDown_),this.hadControls_&&e.controls(!0),this.hide(),this.el().setAttribute("aria-hidden","true"),this.trigger("modalclose"),this.conditionalBlur_(),this.options_.temporary&&this.dispose()}closeable(e){if(typeof e=="boolean"){const t=this.closeable_=!!e;let i=this.getChild("closeButton");if(t&&!i){const s=this.contentEl_;this.contentEl_=this.el_,i=this.addChild("closeButton",{controlText:"Close Modal Dialog"}),this.contentEl_=s,this.on(i,"close",this.close_)}!t&&i&&(this.off(i,"close",this.close_),this.removeChild(i),i.dispose())}return this.closeable_}fill(){this.fillWith(this.content())}fillWith(e){const t=this.contentEl(),i=t.parentNode,s=t.nextSibling;this.trigger("beforemodalfill"),this.hasBeenFilled_=!0,i.removeChild(t),this.empty(),Hl(t,e),this.trigger("modalfill"),s?i.insertBefore(t,s):i.appendChild(t);const r=this.getChild("closeButton");r&&i.appendChild(r.el_)}empty(){this.trigger("beforemodalempty"),fr(this.contentEl()),this.trigger("modalempty")}content(e){return typeof e!="undefined"&&(this.content_=e),this.content_}conditionalFocus_(){const e=O().activeElement,t=this.player_.el_;this.previouslyActiveEl_=null,(t.contains(e)||t===e)&&(this.previouslyActiveEl_=e,this.focus())}conditionalBlur_(){this.previouslyActiveEl_&&(this.previouslyActiveEl_.focus(),this.previouslyActiveEl_=null)}handleKeyDown(e){if(e.stopPropagation(),U().isEventKey(e,"Escape")&&this.closeable()){e.preventDefault(),this.close();return}if(!U().isEventKey(e,"Tab"))return;const t=this.focusableEls_(),i=this.el_.querySelector(":focus");let s;for(let r=0;r<t.length;r++)if(i===t[r]){s=r;break}O().activeElement===this.el_&&(s=0),e.shiftKey&&s===0?(t[t.length-1].focus(),e.preventDefault()):!e.shiftKey&&s===t.length-1&&(t[0].focus(),e.preventDefault())}focusableEls_(){const e=this.el_.querySelectorAll("*");return Array.prototype.filter.call(e,t=>(t instanceof A().HTMLAnchorElement||t instanceof A().HTMLAreaElement)&&t.hasAttribute("href")||(t instanceof A().HTMLInputElement||t instanceof A().HTMLSelectElement||t instanceof A().HTMLTextAreaElement||t instanceof A().HTMLButtonElement)&&!t.hasAttribute("disabled")||t instanceof A().HTMLIFrameElement||t instanceof A().HTMLObjectElement||t instanceof A().HTMLEmbedElement||t.hasAttribute("tabindex")&&t.getAttribute("tabindex")!==-1||t.hasAttribute("contenteditable"))}}Vn.prototype.options_={pauseOnOpen:!0,temporary:!0},W.registerComponent("ModalDialog",Vn);class qn extends ti{constructor(e=[]){super(),this.tracks_=[],Object.defineProperty(this,"length",{get(){return this.tracks_.length}});for(let t=0;t<e.length;t++)this.addTrack(e[t])}addTrack(e){const t=this.tracks_.length;""+t in this||Object.defineProperty(this,t,{get(){return this.tracks_[t]}}),this.tracks_.indexOf(e)===-1&&(this.tracks_.push(e),this.trigger({track:e,type:"addtrack",target:this})),e.labelchange_=()=>{this.trigger({track:e,type:"labelchange",target:this})},Oi(e)&&e.addEventListener("labelchange",e.labelchange_)}removeTrack(e){let t;for(let i=0,s=this.length;i<s;i++)if(this[i]===e){t=this[i],t.off&&t.off(),this.tracks_.splice(i,1);break}t&&this.trigger({track:t,type:"removetrack",target:this})}getTrackById(e){let t=null;for(let i=0,s=this.length;i<s;i++){const r=this[i];if(r.id===e){t=r;break}}return t}}qn.prototype.allowedEvents_={change:"change",addtrack:"addtrack",removetrack:"removetrack",labelchange:"labelchange"};for(const n in qn.prototype.allowedEvents_)qn.prototype["on"+n]=null;const Ha=function(n,e){for(let t=0;t<n.length;t++)!Object.keys(n[t]).length||e.id===n[t].id||(n[t].enabled=!1)};class Wf extends qn{constructor(e=[]){for(let t=e.length-1;t>=0;t--)if(e[t].enabled){Ha(e,e[t]);break}super(e),this.changing_=!1}addTrack(e){e.enabled&&Ha(this,e),super.addTrack(e),e.addEventListener&&(e.enabledChange_=()=>{this.changing_||(this.changing_=!0,Ha(this,e),this.changing_=!1,this.trigger("change"))},e.addEventListener("enabledchange",e.enabledChange_))}removeTrack(e){super.removeTrack(e),e.removeEventListener&&e.enabledChange_&&(e.removeEventListener("enabledchange",e.enabledChange_),e.enabledChange_=null)}}const Wa=function(n,e){for(let t=0;t<n.length;t++)!Object.keys(n[t]).length||e.id===n[t].id||(n[t].selected=!1)};class Gf extends qn{constructor(e=[]){for(let t=e.length-1;t>=0;t--)if(e[t].selected){Wa(e,e[t]);break}super(e),this.changing_=!1,Object.defineProperty(this,"selectedIndex",{get(){for(let t=0;t<this.length;t++)if(this[t].selected)return t;return-1},set(){}})}addTrack(e){e.selected&&Wa(this,e),super.addTrack(e),e.addEventListener&&(e.selectedChange_=()=>{this.changing_||(this.changing_=!0,Wa(this,e),this.changing_=!1,this.trigger("change"))},e.addEventListener("selectedchange",e.selectedChange_))}removeTrack(e){super.removeTrack(e),e.removeEventListener&&e.selectedChange_&&(e.removeEventListener("selectedchange",e.selectedChange_),e.selectedChange_=null)}}class uu extends qn{addTrack(e){super.addTrack(e),this.queueChange_||(this.queueChange_=()=>this.queueTrigger("change")),this.triggerSelectedlanguagechange||(this.triggerSelectedlanguagechange_=()=>this.trigger("selectedlanguagechange")),e.addEventListener("modechange",this.queueChange_),["metadata","chapters"].indexOf(e.kind)===-1&&e.addEventListener("modechange",this.triggerSelectedlanguagechange_)}removeTrack(e){super.removeTrack(e),e.removeEventListener&&(this.queueChange_&&e.removeEventListener("modechange",this.queueChange_),this.selectedlanguagechange_&&e.removeEventListener("modechange",this.triggerSelectedlanguagechange_))}}class $f{constructor(e=[]){this.trackElements_=[],Object.defineProperty(this,"length",{get(){return this.trackElements_.length}});for(let t=0,i=e.length;t<i;t++)this.addTrackElement_(e[t])}addTrackElement_(e){const t=this.trackElements_.length;""+t in this||Object.defineProperty(this,t,{get(){return this.trackElements_[t]}}),this.trackElements_.indexOf(e)===-1&&this.trackElements_.push(e)}getTrackElementByTrack_(e){let t;for(let i=0,s=this.trackElements_.length;i<s;i++)if(e===this.trackElements_[i].track){t=this.trackElements_[i];break}return t}removeTrackElement_(e){for(let t=0,i=this.trackElements_.length;t<i;t++)if(e===this.trackElements_[t]){this.trackElements_[t].track&&typeof this.trackElements_[t].track.off=="function"&&this.trackElements_[t].track.off(),typeof this.trackElements_[t].off=="function"&&this.trackElements_[t].off(),this.trackElements_.splice(t,1);break}}}class yr{constructor(e){yr.prototype.setCues_.call(this,e),Object.defineProperty(this,"length",{get(){return this.length_}})}setCues_(e){const t=this.length||0;let i=0;const s=e.length;this.cues_=e,this.length_=e.length;const r=function(a){""+a in this||Object.defineProperty(this,""+a,{get(){return this.cues_[a]}})};if(t<s)for(i=t;i<s;i++)r.call(this,i)}getCueById(e){let t=null;for(let i=0,s=this.length;i<s;i++){const r=this[i];if(r.id===e){t=r;break}}return t}}const Xf={alternative:"alternative",captions:"captions",main:"main",sign:"sign",subtitles:"subtitles",commentary:"commentary"},Yf={alternative:"alternative",descriptions:"descriptions",main:"main","main-desc":"main-desc",translation:"translation",commentary:"commentary"},Kf={subtitles:"subtitles",captions:"captions",descriptions:"descriptions",chapters:"chapters",metadata:"metadata"},cu={disabled:"disabled",hidden:"hidden",showing:"showing"};class Ga extends ti{constructor(e={}){super();const t={id:e.id||"vjs_track_"+li(),kind:e.kind||"",language:e.language||""};let i=e.label||"";for(const s in t)Object.defineProperty(this,s,{get(){return t[s]},set(){}});Object.defineProperty(this,"label",{get(){return i},set(s){s!==i&&(i=s,this.trigger("labelchange"))}})}}const $a=function(n){const e=["protocol","hostname","port","pathname","search","hash","host"],t=O().createElement("a");t.href=n;const i={};for(let s=0;s<e.length;s++)i[e[s]]=t[e[s]];return i.protocol==="http:"&&(i.host=i.host.replace(/:80$/,"")),i.protocol==="https:"&&(i.host=i.host.replace(/:443$/,"")),i.protocol||(i.protocol=A().location.protocol),i.host||(i.host=A().location.host),i},du=function(n){if(!n.match(/^https?:\/\//)){const e=O().createElement("a");e.href=n,n=e.href}return n},Xa=function(n){if(typeof n=="string"){const t=/^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/.exec(n);if(t)return t.pop().toLowerCase()}return""},_r=function(n,e=A().location){const t=$a(n);return(t.protocol===":"?e.protocol:t.protocol)+t.host!==e.protocol+e.host};var Qf=Object.freeze({__proto__:null,parseUrl:$a,getAbsoluteURL:du,getFileExtension:Xa,isCrossOrigin:_r});const hu=function(n,e){const t=new(A()).WebVTT.Parser(A(),A().vttjs,A().WebVTT.StringDecoder()),i=[];t.oncue=function(s){e.addCue(s)},t.onparsingerror=function(s){i.push(s)},t.onflush=function(){e.trigger({type:"loadeddata",target:e})},t.parse(n),i.length>0&&(A().console&&A().console.groupCollapsed&&A().console.groupCollapsed(`Text Track parsing errors for ${e.src}`),i.forEach(s=>Fe.error(s)),A().console&&A().console.groupEnd&&A().console.groupEnd()),t.flush()},fu=function(n,e){const t={uri:n},i=_r(n);i&&(t.cors=i);const s=e.tech_.crossOrigin()==="use-credentials";s&&(t.withCredentials=s),se()(t,it(this,function(r,a,l){if(r)return Fe.error(r,a);e.loaded_=!0,typeof A().WebVTT!="function"?e.tech_&&e.tech_.any(["vttjsloaded","vttjserror"],h=>{if(h.type==="vttjserror"){Fe.error(`vttjs failed to load, stopping trying to process ${e.src}`);return}return hu(l,e)}):hu(l,e)}))};class _s extends Ga{constructor(e={}){if(!e.tech)throw new Error("A tech was not provided.");const t=tt(e,{kind:Kf[e.kind]||"subtitles",language:e.language||e.srclang||""});let i=cu[t.mode]||"disabled";const s=t.default;(t.kind==="metadata"||t.kind==="chapters")&&(i="hidden"),super(t),this.tech_=t.tech,this.cues_=[],this.activeCues_=[],this.preload_=this.tech_.preloadTextTracks!==!1;const r=new yr(this.cues_),a=new yr(this.activeCues_);let l=!1;this.timeupdateHandler=it(this,function(p={}){if(!this.tech_.isDisposed()){if(!this.tech_.isReady_){p.type!=="timeupdate"&&(this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler));return}this.activeCues=this.activeCues,l&&(this.trigger("cuechange"),l=!1),p.type!=="timeupdate"&&(this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler))}});const h=()=>{this.stopTracking()};this.tech_.one("dispose",h),i!=="disabled"&&this.startTracking(),Object.defineProperties(this,{default:{get(){return s},set(){}},mode:{get(){return i},set(p){cu[p]&&i!==p&&(i=p,!this.preload_&&i!=="disabled"&&this.cues.length===0&&fu(this.src,this),this.stopTracking(),i!=="disabled"&&this.startTracking(),this.trigger("modechange"))}},cues:{get(){return this.loaded_?r:null},set(){}},activeCues:{get(){if(!this.loaded_)return null;if(this.cues.length===0)return a;const p=this.tech_.currentTime(),g=[];for(let _=0,w=this.cues.length;_<w;_++){const D=this.cues[_];D.startTime<=p&&D.endTime>=p&&g.push(D)}if(l=!1,g.length!==this.activeCues_.length)l=!0;else for(let _=0;_<g.length;_++)this.activeCues_.indexOf(g[_])===-1&&(l=!0);return this.activeCues_=g,a.setCues_(this.activeCues_),a},set(){}}}),t.src?(this.src=t.src,this.preload_||(this.loaded_=!0),(this.preload_||t.kind!=="subtitles"&&t.kind!=="captions")&&fu(this.src,this)):this.loaded_=!0}startTracking(){this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler),this.tech_.on("timeupdate",this.timeupdateHandler)}stopTracking(){this.rvf_&&(this.tech_.cancelVideoFrameCallback(this.rvf_),this.rvf_=void 0),this.tech_.off("timeupdate",this.timeupdateHandler)}addCue(e){let t=e;if(!("getCueAsHTML"in t)){t=new(A()).vttjs.VTTCue(e.startTime,e.endTime,e.text);for(const s in e)s in t||(t[s]=e[s]);t.id=e.id,t.originalCue_=e}const i=this.tech_.textTracks();for(let s=0;s<i.length;s++)i[s]!==this&&i[s].removeCue(t);this.cues_.push(t),this.cues.setCues_(this.cues_)}removeCue(e){let t=this.cues_.length;for(;t--;){const i=this.cues_[t];if(i===e||i.originalCue_&&i.originalCue_===e){this.cues_.splice(t,1),this.cues.setCues_(this.cues_);break}}}}_s.prototype.allowedEvents_={cuechange:"cuechange"};class pu extends Ga{constructor(e={}){const t=tt(e,{kind:Yf[e.kind]||""});super(t);let i=!1;Object.defineProperty(this,"enabled",{get(){return i},set(s){typeof s!="boolean"||s===i||(i=s,this.trigger("enabledchange"))}}),t.enabled&&(this.enabled=t.enabled),this.loaded_=!0}}class mu extends Ga{constructor(e={}){const t=tt(e,{kind:Xf[e.kind]||""});super(t);let i=!1;Object.defineProperty(this,"selected",{get(){return i},set(s){typeof s!="boolean"||s===i||(i=s,this.trigger("selectedchange"))}}),t.selected&&(this.selected=t.selected)}}class Li extends ti{constructor(e={}){super();let t;const i=new _s(e);this.kind=i.kind,this.src=i.src,this.srclang=i.language,this.label=i.label,this.default=i.default,Object.defineProperties(this,{readyState:{get(){return t}},track:{get(){return i}}}),t=Li.NONE,i.addEventListener("loadeddata",()=>{t=Li.LOADED,this.trigger({type:"load",target:this})})}}Li.prototype.allowedEvents_={load:"load"},Li.NONE=0,Li.LOADING=1,Li.LOADED=2,Li.ERROR=3;const ii={audio:{ListClass:Wf,TrackClass:pu,capitalName:"Audio"},video:{ListClass:Gf,TrackClass:mu,capitalName:"Video"},text:{ListClass:uu,TrackClass:_s,capitalName:"Text"}};Object.keys(ii).forEach(function(n){ii[n].getterName=`${n}Tracks`,ii[n].privateName=`${n}Tracks_`});const zn={remoteText:{ListClass:uu,TrackClass:_s,capitalName:"RemoteText",getterName:"remoteTextTracks",privateName:"remoteTextTracks_"},remoteTextEl:{ListClass:$f,TrackClass:Li,capitalName:"RemoteTextTrackEls",getterName:"remoteTextTrackEls",privateName:"remoteTextTrackEls_"}},Mt=Object.assign({},ii,zn);zn.names=Object.keys(zn),ii.names=Object.keys(ii),Mt.names=[].concat(zn.names).concat(ii.names);function Jf(n,e,t,i,s={}){const r=n.textTracks();s.kind=e,t&&(s.label=t),i&&(s.language=i),s.tech=n;const a=new Mt.text.TrackClass(s);return r.addTrack(a),a}class Re extends W{constructor(e={},t=function(){}){e.reportTouchActivity=!1,super(null,e,t),this.onDurationChange_=i=>this.onDurationChange(i),this.trackProgress_=i=>this.trackProgress(i),this.trackCurrentTime_=i=>this.trackCurrentTime(i),this.stopTrackingCurrentTime_=i=>this.stopTrackingCurrentTime(i),this.disposeSourceHandler_=i=>this.disposeSourceHandler(i),this.queuedHanders_=new Set,this.hasStarted_=!1,this.on("playing",function(){this.hasStarted_=!0}),this.on("loadstart",function(){this.hasStarted_=!1}),Mt.names.forEach(i=>{const s=Mt[i];e&&e[s.getterName]&&(this[s.privateName]=e[s.getterName])}),this.featuresProgressEvents||this.manualProgressOn(),this.featuresTimeupdateEvents||this.manualTimeUpdatesOn(),["Text","Audio","Video"].forEach(i=>{e[`native${i}Tracks`]===!1&&(this[`featuresNative${i}Tracks`]=!1)}),e.nativeCaptions===!1||e.nativeTextTracks===!1?this.featuresNativeTextTracks=!1:(e.nativeCaptions===!0||e.nativeTextTracks===!0)&&(this.featuresNativeTextTracks=!0),this.featuresNativeTextTracks||this.emulateTextTracks(),this.preloadTextTracks=e.preloadTextTracks!==!1,this.autoRemoteTextTracks_=new Mt.text.ListClass,this.initTrackListeners(),e.nativeControlsForTouch||this.emitTapEvents(),this.constructor&&(this.name_=this.constructor.name||"Unknown Tech")}triggerSourceset(e){this.isReady_||this.one("ready",()=>this.setTimeout(()=>this.triggerSourceset(e),1)),this.trigger({src:e,type:"sourceset"})}manualProgressOn(){this.on("durationchange",this.onDurationChange_),this.manualProgress=!0,this.one("ready",this.trackProgress_)}manualProgressOff(){this.manualProgress=!1,this.stopTrackingProgress(),this.off("durationchange",this.onDurationChange_)}trackProgress(e){this.stopTrackingProgress(),this.progressInterval=this.setInterval(it(this,function(){const t=this.bufferedPercent();this.bufferedPercent_!==t&&this.trigger("progress"),this.bufferedPercent_=t,t===1&&this.stopTrackingProgress()}),500)}onDurationChange(e){this.duration_=this.duration()}buffered(){return ui(0,0)}bufferedPercent(){return ou(this.buffered(),this.duration_)}stopTrackingProgress(){this.clearInterval(this.progressInterval)}manualTimeUpdatesOn(){this.manualTimeUpdates=!0,this.on("play",this.trackCurrentTime_),this.on("pause",this.stopTrackingCurrentTime_)}manualTimeUpdatesOff(){this.manualTimeUpdates=!1,this.stopTrackingCurrentTime(),this.off("play",this.trackCurrentTime_),this.off("pause",this.stopTrackingCurrentTime_)}trackCurrentTime(){this.currentTimeInterval&&this.stopTrackingCurrentTime(),this.currentTimeInterval=this.setInterval(function(){this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},250)}stopTrackingCurrentTime(){this.clearInterval(this.currentTimeInterval),this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})}dispose(){this.clearTracks(ii.names),this.manualProgress&&this.manualProgressOff(),this.manualTimeUpdates&&this.manualTimeUpdatesOff(),super.dispose()}clearTracks(e){e=[].concat(e),e.forEach(t=>{const i=this[`${t}Tracks`]()||[];let s=i.length;for(;s--;){const r=i[s];t==="text"&&this.removeRemoteTextTrack(r),i.removeTrack(r)}})}cleanupAutoTextTracks(){const e=this.autoRemoteTextTracks_||[];let t=e.length;for(;t--;){const i=e[t];this.removeRemoteTextTrack(i)}}reset(){}crossOrigin(){}setCrossOrigin(){}error(e){return e!==void 0&&(this.error_=new dt(e),this.trigger("error")),this.error_}played(){return this.hasStarted_?ui(0,0):ui()}play(){}setScrubbing(e){}scrubbing(){}setCurrentTime(e){this.manualTimeUpdates&&this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})}initTrackListeners(){ii.names.forEach(e=>{const t=ii[e],i=()=>{this.trigger(`${e}trackchange`)},s=this[t.getterName]();s.addEventListener("removetrack",i),s.addEventListener("addtrack",i),this.on("dispose",()=>{s.removeEventListener("removetrack",i),s.removeEventListener("addtrack",i)})})}addWebVttScript_(){if(!A().WebVTT)if(O().body.contains(this.el())){if(!this.options_["vtt.js"]&&In(Q())&&Object.keys(Q()).length>0){this.trigger("vttjsloaded");return}const e=O().createElement("script");e.src=this.options_["vtt.js"]||"https://vjs.zencdn.net/vttjs/0.14.1/vtt.min.js",e.onload=()=>{this.trigger("vttjsloaded")},e.onerror=()=>{this.trigger("vttjserror")},this.on("dispose",()=>{e.onload=null,e.onerror=null}),A().WebVTT=!0,this.el().parentNode.appendChild(e)}else this.ready(this.addWebVttScript_)}emulateTextTracks(){const e=this.textTracks(),t=this.remoteTextTracks(),i=l=>e.addTrack(l.track),s=l=>e.removeTrack(l.track);t.on("addtrack",i),t.on("removetrack",s),this.addWebVttScript_();const r=()=>this.trigger("texttrackchange"),a=()=>{r();for(let l=0;l<e.length;l++){const h=e[l];h.removeEventListener("cuechange",r),h.mode==="showing"&&h.addEventListener("cuechange",r)}};a(),e.addEventListener("change",a),e.addEventListener("addtrack",a),e.addEventListener("removetrack",a),this.on("dispose",function(){t.off("addtrack",i),t.off("removetrack",s),e.removeEventListener("change",a),e.removeEventListener("addtrack",a),e.removeEventListener("removetrack",a);for(let l=0;l<e.length;l++)e[l].removeEventListener("cuechange",r)})}addTextTrack(e,t,i){if(!e)throw new Error("TextTrack kind is required but was not provided");return Jf(this,e,t,i)}createRemoteTextTrack(e){const t=tt(e,{tech:this});return new zn.remoteTextEl.TrackClass(t)}addRemoteTextTrack(e={},t){const i=this.createRemoteTextTrack(e);return typeof t!="boolean"&&(t=!1),this.remoteTextTrackEls().addTrackElement_(i),this.remoteTextTracks().addTrack(i.track),t===!1&&this.ready(()=>this.autoRemoteTextTracks_.addTrack(i.track)),i}removeRemoteTextTrack(e){const t=this.remoteTextTrackEls().getTrackElementByTrack_(e);this.remoteTextTrackEls().removeTrackElement_(t),this.remoteTextTracks().removeTrack(e),this.autoRemoteTextTracks_.removeTrack(e)}getVideoPlaybackQuality(){return{}}requestPictureInPicture(){return Promise.reject()}disablePictureInPicture(){return!0}setDisablePictureInPicture(){}requestVideoFrameCallback(e){const t=li();return!this.isReady_||this.paused()?(this.queuedHanders_.add(t),this.one("playing",()=>{this.queuedHanders_.has(t)&&(this.queuedHanders_.delete(t),e())})):this.requestNamedAnimationFrame(t,e),t}cancelVideoFrameCallback(e){this.queuedHanders_.has(e)?this.queuedHanders_.delete(e):this.cancelNamedAnimationFrame(e)}setPoster(){}playsinline(){}setPlaysinline(){}overrideNativeAudioTracks(e){}overrideNativeVideoTracks(e){}canPlayType(e){return""}static canPlayType(e){return""}static canPlaySource(e,t){return Re.canPlayType(e.type)}static isTech(e){return e.prototype instanceof Re||e instanceof Re||e===Re}static registerTech(e,t){if(Re.techs_||(Re.techs_={}),!Re.isTech(t))throw new Error(`Tech ${e} must be a Tech`);if(!Re.canPlayType)throw new Error("Techs must have a static canPlayType method on them");if(!Re.canPlaySource)throw new Error("Techs must have a static canPlaySource method on them");return e=pt(e),Re.techs_[e]=t,Re.techs_[As(e)]=t,e!=="Tech"&&Re.defaultTechOrder_.push(e),t}static getTech(e){if(e){if(Re.techs_&&Re.techs_[e])return Re.techs_[e];if(e=pt(e),A()&&A().videojs&&A().videojs[e])return Fe.warn(`The ${e} tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)`),A().videojs[e]}}}Mt.names.forEach(function(n){const e=Mt[n];Re.prototype[e.getterName]=function(){return this[e.privateName]=this[e.privateName]||new e.ListClass,this[e.privateName]}}),Re.prototype.featuresVolumeControl=!0,Re.prototype.featuresMuteControl=!0,Re.prototype.featuresFullscreenResize=!1,Re.prototype.featuresPlaybackRate=!1,Re.prototype.featuresProgressEvents=!1,Re.prototype.featuresSourceset=!1,Re.prototype.featuresTimeupdateEvents=!1,Re.prototype.featuresNativeTextTracks=!1,Re.prototype.featuresVideoFrameCallback=!1,Re.withSourceHandlers=function(n){n.registerSourceHandler=function(t,i){let s=n.sourceHandlers;s||(s=n.sourceHandlers=[]),i===void 0&&(i=s.length),s.splice(i,0,t)},n.canPlayType=function(t){const i=n.sourceHandlers||[];let s;for(let r=0;r<i.length;r++)if(s=i[r].canPlayType(t),s)return s;return""},n.selectSourceHandler=function(t,i){const s=n.sourceHandlers||[];let r;for(let a=0;a<s.length;a++)if(r=s[a].canHandleSource(t,i),r)return s[a];return null},n.canPlaySource=function(t,i){const s=n.selectSourceHandler(t,i);return s?s.canHandleSource(t,i):""},["seekable","seeking","duration"].forEach(function(t){const i=this[t];typeof i=="function"&&(this[t]=function(){return this.sourceHandler_&&this.sourceHandler_[t]?this.sourceHandler_[t].apply(this.sourceHandler_,arguments):i.apply(this,arguments)})},n.prototype),n.prototype.setSource=function(t){let i=n.selectSourceHandler(t,this.options_);i||(n.nativeSourceHandler?i=n.nativeSourceHandler:Fe.error("No source handler found for the current source.")),this.disposeSourceHandler(),this.off("dispose",this.disposeSourceHandler_),i!==n.nativeSourceHandler&&(this.currentSource_=t),this.sourceHandler_=i.handleSource(t,this,this.options_),this.one("dispose",this.disposeSourceHandler_)},n.prototype.disposeSourceHandler=function(){this.currentSource_&&(this.clearTracks(["audio","video"]),this.currentSource_=null),this.cleanupAutoTextTracks(),this.sourceHandler_&&(this.sourceHandler_.dispose&&this.sourceHandler_.dispose(),this.sourceHandler_=null)}},W.registerComponent("Tech",Re),Re.registerTech("Tech",Re),Re.defaultTechOrder_=[];const ln={},Ya={},br={};function Zf(n,e){ln[n]=ln[n]||[],ln[n].push(e)}function ep(n,e,t){n.setTimeout(()=>un(e,ln[e.type],t,n),1)}function tp(n,e){n.forEach(t=>t.setTech&&t.setTech(e))}function ip(n,e,t){return n.reduceRight(Ka(t),e[t]())}function np(n,e,t,i){return e[t](n.reduce(Ka(t),i))}function gu(n,e,t,i=null){const s="call"+pt(t),r=n.reduce(Ka(s),i),a=r===br,l=a?null:e[t](r);return ap(n,t,l,a),l}const sp={buffered:1,currentTime:1,duration:1,muted:1,played:1,paused:1,seekable:1,volume:1,ended:1},rp={setCurrentTime:1,setMuted:1,setVolume:1},vu={play:1,pause:1};function Ka(n){return(e,t)=>e===br?br:t[n]?t[n](e):e}function ap(n,e,t,i){for(let s=n.length-1;s>=0;s--){const r=n[s];r[e]&&r[e](i,t)}}function op(n){Ya[n.id()]=null}function lp(n,e){const t=Ya[n.id()];let i=null;if(t==null)return i=e(n),Ya[n.id()]=[[e,i]],i;for(let s=0;s<t.length;s++){const[r,a]=t[s];r===e&&(i=a)}return i===null&&(i=e(n),t.push([e,i])),i}function un(n={},e=[],t,i,s=[],r=!1){const[a,...l]=e;if(typeof a=="string")un(n,ln[a],t,i,s,r);else if(a){const h=lp(i,a);if(!h.setSource)return s.push(h),un(n,l,t,i,s,r);h.setSource(Object.assign({},n),function(p,g){if(p)return un(n,l,t,i,s,r);s.push(h),un(g,n.type===g.type?l:ln[g.type],t,i,s,r)})}else l.length?un(n,l,t,i,s,r):r?t(n,s):un(n,ln["*"],t,i,s,!0)}const up={opus:"video/ogg",ogv:"video/ogg",mp4:"video/mp4",mov:"video/mp4",m4v:"video/mp4",mkv:"video/x-matroska",m4a:"audio/mp4",mp3:"audio/mpeg",aac:"audio/aac",caf:"audio/x-caf",flac:"audio/flac",oga:"audio/ogg",wav:"audio/wav",m3u8:"application/x-mpegURL",mpd:"application/dash+xml",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",png:"image/png",svg:"image/svg+xml",webp:"image/webp"},Er=function(n=""){const e=Xa(n);return up[e.toLowerCase()]||""},cp=(n,e)=>{if(!e)return"";if(n.cache_.source.src===e&&n.cache_.source.type)return n.cache_.source.type;const t=n.cache_.sources.filter(s=>s.src===e);if(t.length)return t[0].type;const i=n.$$("source");for(let s=0;s<i.length;s++){const r=i[s];if(r.type&&r.src&&r.src===e)return r.type}return Er(e)},Au=function(n){if(Array.isArray(n)){let e=[];n.forEach(function(t){t=Au(t),Array.isArray(t)?e=e.concat(t):vi(t)&&e.push(t)}),n=e}else typeof n=="string"&&n.trim()?n=[yu({src:n})]:vi(n)&&typeof n.src=="string"&&n.src&&n.src.trim()?n=[yu(n)]:n=[];return n};function yu(n){if(!n.type){const e=Er(n.src);e&&(n.type=e)}return n}var dp=`<svg xmlns="http://www.w3.org/2000/svg">
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
    <symbol viewBox="0 0 1792 1792" id="vjs-icon-twitter">
      <path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5T1369.5 1125 1185 1335.5t-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5T285 1033q33 5 61 5 43 0 85-11-112-23-185.5-111.5T172 710v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5T884 653q-8-38-8-74 0-134 94.5-228.5T1199 256q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"></path>
    </symbol>
    <symbol viewBox="0 0 1792 1792" id="vjs-icon-tumblr">
      <path d="M1328 1329l80 237q-23 35-111 66t-177 32q-104 2-190.5-26T787 1564t-95-106-55.5-120-16.5-118V676H452V461q72-26 129-69.5t91-90 58-102 34-99T779 12q1-5 4.5-8.5T791 0h244v424h333v252h-334v518q0 30 6.5 56t22.5 52.5 49.5 41.5 81.5 14q78-2 134-29z"></path>
    </symbol>
    <symbol viewBox="0 0 1792 1792" id="vjs-icon-pinterest">
      <path d="M1664 896q0 209-103 385.5T1281.5 1561 896 1664q-111 0-218-32 59-93 78-164 9-34 54-211 20 39 73 67.5t114 28.5q121 0 216-68.5t147-188.5 52-270q0-114-59.5-214T1180 449t-255-63q-105 0-196 29t-154.5 77-109 110.5-67 129.5T377 866q0 104 40 183t117 111q30 12 38-20 2-7 8-31t8-30q6-23-11-43-51-61-51-151 0-151 104.5-259.5T904 517q151 0 235.5 82t84.5 213q0 170-68.5 289T980 1220q-61 0-98-43.5T859 1072q8-35 26.5-93.5t30-103T927 800q0-50-27-83t-77-33q-62 0-105 57t-43 142q0 73 25 122l-99 418q-17 70-13 177-206-91-333-281T128 896q0-209 103-385.5T510.5 231 896 128t385.5 103T1561 510.5 1664 896z"></path>
    </symbol>
  </defs>
</svg>`;class hp extends W{constructor(e,t,i){const s=tt({createEl:!1},t);if(super(e,s,i),!t.playerOptions.sources||t.playerOptions.sources.length===0)for(let r=0,a=t.playerOptions.techOrder;r<a.length;r++){const l=pt(a[r]);let h=Re.getTech(l);if(l||(h=W.getComponent(l)),h&&h.isSupported()){e.loadTech_(l);break}}else e.src(t.playerOptions.sources)}}W.registerComponent("MediaLoader",hp);class Tr extends W{constructor(e,t){super(e,t),this.options_.controlText&&this.controlText(this.options_.controlText),this.handleMouseOver_=i=>this.handleMouseOver(i),this.handleMouseOut_=i=>this.handleMouseOut(i),this.handleClick_=i=>this.handleClick(i),this.handleKeyDown_=i=>this.handleKeyDown(i),this.emitTapEvents(),this.enable()}createEl(e="div",t={},i={}){t=Object.assign({className:this.buildCSSClass(),tabIndex:0},t),e==="button"&&Fe.error(`Creating a ClickableComponent with an HTML element of ${e} is not supported; use a Button instead.`),i=Object.assign({role:"button"},i),this.tabIndex_=t.tabIndex;const s=Me(e,t,i);return this.player_.options_.experimentalSvgIcons||s.appendChild(Me("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),this.createControlTextEl(s),s}dispose(){this.controlTextEl_=null,super.dispose()}createControlTextEl(e){return this.controlTextEl_=Me("span",{className:"vjs-control-text"},{"aria-live":"polite"}),e&&e.appendChild(this.controlTextEl_),this.controlText(this.controlText_,e),this.controlTextEl_}controlText(e,t=this.el()){if(e===void 0)return this.controlText_||"Need Text";const i=this.localize(e);this.controlText_=e,Gi(this.controlTextEl_,i),!this.nonIconControl&&!this.player_.options_.noUITitleAttributes&&t.setAttribute("title",i)}buildCSSClass(){return`vjs-control vjs-button ${super.buildCSSClass()}`}enable(){this.enabled_||(this.enabled_=!0,this.removeClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","false"),typeof this.tabIndex_!="undefined"&&this.el_.setAttribute("tabIndex",this.tabIndex_),this.on(["tap","click"],this.handleClick_),this.on("keydown",this.handleKeyDown_))}disable(){this.enabled_=!1,this.addClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","true"),typeof this.tabIndex_!="undefined"&&this.el_.removeAttribute("tabIndex"),this.off("mouseover",this.handleMouseOver_),this.off("mouseout",this.handleMouseOut_),this.off(["tap","click"],this.handleClick_),this.off("keydown",this.handleKeyDown_)}handleLanguagechange(){this.controlText(this.controlText_)}handleClick(e){this.options_.clickHandler&&this.options_.clickHandler.call(this,arguments)}handleKeyDown(e){U().isEventKey(e,"Space")||U().isEventKey(e,"Enter")?(e.preventDefault(),e.stopPropagation(),this.trigger("click")):super.handleKeyDown(e)}}W.registerComponent("ClickableComponent",Tr);class Qa extends Tr{constructor(e,t){super(e,t),this.update(),this.update_=i=>this.update(i),e.on("posterchange",this.update_)}dispose(){this.player().off("posterchange",this.update_),super.dispose()}createEl(){return Me("div",{className:"vjs-poster"})}crossOrigin(e){if(typeof e=="undefined")return this.$("img")?this.$("img").crossOrigin:this.player_.tech_&&this.player_.tech_.isReady_?this.player_.crossOrigin():this.player_.options_.crossOrigin||this.player_.options_.crossorigin||null;if(e!==null&&e!=="anonymous"&&e!=="use-credentials"){this.player_.log.warn(`crossOrigin must be null,  "anonymous" or "use-credentials", given "${e}"`);return}this.$("img")&&(this.$("img").crossOrigin=e)}update(e){const t=this.player().poster();this.setSrc(t),t?this.show():this.hide()}setSrc(e){if(!e){this.el_.textContent="";return}this.$("img")||this.el_.appendChild(Me("picture",{className:"vjs-poster",tabIndex:-1},{},Me("img",{loading:"lazy",crossOrigin:this.crossOrigin()},{alt:""}))),this.$("img").src=e}handleClick(e){this.player_.controls()&&(this.player_.tech(!0)&&this.player_.tech(!0).focus(),this.player_.paused()?bi(this.player_.play()):this.player_.pause())}}Qa.prototype.crossorigin=Qa.prototype.crossOrigin,W.registerComponent("PosterImage",Qa);const ni="#222",_u="#ccc",fp={monospace:"monospace",sansSerif:"sans-serif",serif:"serif",monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace',monospaceSerif:'"Courier New", monospace',proportionalSansSerif:"sans-serif",proportionalSerif:"serif",casual:'"Comic Sans MS", Impact, fantasy',script:'"Monotype Corsiva", cursive',smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'};function Ja(n,e){let t;if(n.length===4)t=n[1]+n[1]+n[2]+n[2]+n[3]+n[3];else if(n.length===7)t=n.slice(1);else throw new Error("Invalid color code provided, "+n+"; must be formatted as e.g. #f0e or #f604e2.");return"rgba("+parseInt(t.slice(0,2),16)+","+parseInt(t.slice(2,4),16)+","+parseInt(t.slice(4,6),16)+","+e+")"}function bs(n,e,t){try{n.style[e]=t}catch(i){return}}function bu(n){return n?`${n}px`:""}class pp extends W{constructor(e,t,i){super(e,t,i);const s=a=>this.updateDisplay(a),r=a=>{this.updateDisplayOverlay(),this.updateDisplay(a)};e.on("loadstart",a=>this.toggleDisplay(a)),e.on("texttrackchange",s),e.on("loadedmetadata",a=>{this.updateDisplayOverlay(),this.preselectTrack(a)}),e.ready(it(this,function(){if(e.tech_&&e.tech_.featuresNativeTextTracks){this.hide();return}e.on("fullscreenchange",r),e.on("playerresize",r);const a=A().screen.orientation||A(),l=A().screen.orientation?"change":"orientationchange";a.addEventListener(l,r),e.on("dispose",()=>a.removeEventListener(l,r));const h=this.options_.playerOptions.tracks||[];for(let p=0;p<h.length;p++)this.player_.addRemoteTextTrack(h[p],!0);this.preselectTrack()}))}preselectTrack(){const e={captions:1,subtitles:1},t=this.player_.textTracks(),i=this.player_.cache_.selectedLanguage;let s,r,a;for(let l=0;l<t.length;l++){const h=t[l];i&&i.enabled&&i.language&&i.language===h.language&&h.kind in e?h.kind===i.kind?a=h:a||(a=h):i&&!i.enabled?(a=null,s=null,r=null):h.default&&(h.kind==="descriptions"&&!s?s=h:h.kind in e&&!r&&(r=h))}a?a.mode="showing":r?r.mode="showing":s&&(s.mode="showing")}toggleDisplay(){this.player_.tech_&&this.player_.tech_.featuresNativeTextTracks?this.hide():this.show()}createEl(){return super.createEl("div",{className:"vjs-text-track-display"},{translate:"yes","aria-live":"off","aria-atomic":"true"})}clearDisplay(){typeof A().WebVTT=="function"&&A().WebVTT.processCues(A(),[],this.el_)}updateDisplay(){const e=this.player_.textTracks(),t=this.options_.allowMultipleShowingTracks;if(this.clearDisplay(),t){const a=[];for(let l=0;l<e.length;++l){const h=e[l];h.mode==="showing"&&a.push(h)}this.updateForTrack(a);return}let i=null,s=null,r=e.length;for(;r--;){const a=e[r];a.mode==="showing"&&(a.kind==="descriptions"?i=a:s=a)}s?(this.getAttribute("aria-live")!=="off"&&this.setAttribute("aria-live","off"),this.updateForTrack(s)):i&&(this.getAttribute("aria-live")!=="assertive"&&this.setAttribute("aria-live","assertive"),this.updateForTrack(i))}updateDisplayOverlay(){if(!this.player_.videoHeight()||!A().CSS.supports("inset-inline: 10px"))return;const e=this.player_.currentWidth(),t=this.player_.currentHeight(),i=e/t,s=this.player_.videoWidth()/this.player_.videoHeight();let r=0,a=0;Math.abs(i-s)>.1&&(i>s?r=Math.round((e-t*s)/2):a=Math.round((t-e/s)/2)),bs(this.el_,"insetInline",bu(r)),bs(this.el_,"insetBlock",bu(a))}updateDisplayState(e){const t=this.player_.textTrackSettings.getValues(),i=e.activeCues;let s=i.length;for(;s--;){const r=i[s];if(!r)continue;const a=r.displayState;if(t.color&&(a.firstChild.style.color=t.color),t.textOpacity&&bs(a.firstChild,"color",Ja(t.color||"#fff",t.textOpacity)),t.backgroundColor&&(a.firstChild.style.backgroundColor=t.backgroundColor),t.backgroundOpacity&&bs(a.firstChild,"backgroundColor",Ja(t.backgroundColor||"#000",t.backgroundOpacity)),t.windowColor&&(t.windowOpacity?bs(a,"backgroundColor",Ja(t.windowColor,t.windowOpacity)):a.style.backgroundColor=t.windowColor),t.edgeStyle&&(t.edgeStyle==="dropshadow"?a.firstChild.style.textShadow=`2px 2px 3px ${ni}, 2px 2px 4px ${ni}, 2px 2px 5px ${ni}`:t.edgeStyle==="raised"?a.firstChild.style.textShadow=`1px 1px ${ni}, 2px 2px ${ni}, 3px 3px ${ni}`:t.edgeStyle==="depressed"?a.firstChild.style.textShadow=`1px 1px ${_u}, 0 1px ${_u}, -1px -1px ${ni}, 0 -1px ${ni}`:t.edgeStyle==="uniform"&&(a.firstChild.style.textShadow=`0 0 4px ${ni}, 0 0 4px ${ni}, 0 0 4px ${ni}, 0 0 4px ${ni}`)),t.fontPercent&&t.fontPercent!==1){const l=A().parseFloat(a.style.fontSize);a.style.fontSize=l*t.fontPercent+"px",a.style.height="auto",a.style.top="auto"}t.fontFamily&&t.fontFamily!=="default"&&(t.fontFamily==="small-caps"?a.firstChild.style.fontVariant="small-caps":a.firstChild.style.fontFamily=fp[t.fontFamily])}}updateForTrack(e){if(Array.isArray(e)||(e=[e]),typeof A().WebVTT!="function"||e.every(i=>!i.activeCues))return;const t=[];for(let i=0;i<e.length;++i){const s=e[i];for(let r=0;r<s.activeCues.length;++r)t.push(s.activeCues[r])}A().WebVTT.processCues(A(),t,this.el_);for(let i=0;i<e.length;++i){const s=e[i];for(let r=0;r<s.activeCues.length;++r){const a=s.activeCues[r].displayState;rn(a,"vjs-text-track-cue","vjs-text-track-cue-"+(s.language?s.language:i)),s.language&&Mn(a,"lang",s.language)}this.player_.textTrackSettings&&this.updateDisplayState(s)}}}W.registerComponent("TextTrackDisplay",pp);class mp extends W{createEl(){const e=this.player_.isAudio(),t=this.localize(e?"Audio Player":"Video Player"),i=Me("span",{className:"vjs-control-text",textContent:this.localize("{1} is loading.",[t])}),s=super.createEl("div",{className:"vjs-loading-spinner",dir:"ltr"});return s.appendChild(i),s}handleLanguagechange(){this.$(".vjs-control-text").textContent=this.localize("{1} is loading.",[this.player_.isAudio()?"Audio Player":"Video Player"])}}W.registerComponent("LoadingSpinner",mp);class Xt extends Tr{createEl(e,t={},i={}){e="button",t=Object.assign({className:this.buildCSSClass()},t),i=Object.assign({type:"button"},i);const s=Me(e,t,i);return this.player_.options_.experimentalSvgIcons||s.appendChild(Me("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),this.createControlTextEl(s),s}addChild(e,t={}){const i=this.constructor.name;return Fe.warn(`Adding an actionable (user controllable) child to a Button (${i}) is not supported; use a ClickableComponent instead.`),W.prototype.addChild.call(this,e,t)}enable(){super.enable(),this.el_.removeAttribute("disabled")}disable(){super.disable(),this.el_.setAttribute("disabled","disabled")}handleKeyDown(e){if(U().isEventKey(e,"Space")||U().isEventKey(e,"Enter")){e.stopPropagation();return}super.handleKeyDown(e)}}W.registerComponent("Button",Xt);class Eu extends Xt{constructor(e,t){super(e,t),this.mouseused_=!1,this.setIcon("play"),this.on("mousedown",i=>this.handleMouseDown(i))}buildCSSClass(){return"vjs-big-play-button"}handleClick(e){const t=this.player_.play();if(this.mouseused_&&"clientX"in e&&"clientY"in e){bi(t),this.player_.tech(!0)&&this.player_.tech(!0).focus();return}const i=this.player_.getChild("controlBar"),s=i&&i.getChild("playToggle");if(!s){this.player_.tech(!0).focus();return}const r=()=>s.focus();ys(t)?t.then(r,()=>{}):this.setTimeout(r,1)}handleKeyDown(e){this.mouseused_=!1,super.handleKeyDown(e)}handleMouseDown(e){this.mouseused_=!0}}Eu.prototype.controlText_="Play Video",W.registerComponent("BigPlayButton",Eu);class gp extends Xt{constructor(e,t){super(e,t),this.setIcon("cancel"),this.controlText(t&&t.controlText||this.localize("Close"))}buildCSSClass(){return`vjs-close-button ${super.buildCSSClass()}`}handleClick(e){this.trigger({type:"close",bubbles:!1})}handleKeyDown(e){U().isEventKey(e,"Esc")?(e.preventDefault(),e.stopPropagation(),this.trigger("click")):super.handleKeyDown(e)}}W.registerComponent("CloseButton",gp);class Tu extends Xt{constructor(e,t={}){super(e,t),t.replay=t.replay===void 0||t.replay,this.setIcon("play"),this.on(e,"play",i=>this.handlePlay(i)),this.on(e,"pause",i=>this.handlePause(i)),t.replay&&this.on(e,"ended",i=>this.handleEnded(i))}buildCSSClass(){return`vjs-play-control ${super.buildCSSClass()}`}handleClick(e){this.player_.paused()?bi(this.player_.play()):this.player_.pause()}handleSeeked(e){this.removeClass("vjs-ended"),this.player_.paused()?this.handlePause(e):this.handlePlay(e)}handlePlay(e){this.removeClass("vjs-ended","vjs-paused"),this.addClass("vjs-playing"),this.setIcon("pause"),this.controlText("Pause")}handlePause(e){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.setIcon("play"),this.controlText("Play")}handleEnded(e){this.removeClass("vjs-playing"),this.addClass("vjs-ended"),this.setIcon("replay"),this.controlText("Replay"),this.one(this.player_,"seeked",t=>this.handleSeeked(t))}}Tu.prototype.controlText_="Play",W.registerComponent("PlayToggle",Tu);class Hn extends W{constructor(e,t){super(e,t),this.on(e,["timeupdate","ended","seeking"],i=>this.update(i)),this.updateTextNode_()}createEl(){const e=this.buildCSSClass(),t=super.createEl("div",{className:`${e} vjs-time-control vjs-control`}),i=Me("span",{className:"vjs-control-text",textContent:`${this.localize(this.labelText_)}\xA0`},{role:"presentation"});return t.appendChild(i),this.contentEl_=Me("span",{className:`${e}-display`},{role:"presentation"}),t.appendChild(this.contentEl_),t}dispose(){this.contentEl_=null,this.textNode_=null,super.dispose()}update(e){!this.player_.options_.enableSmoothSeeking&&e.type==="seeking"||this.updateContent(e)}updateTextNode_(e=0){e=on(e),this.formattedTime_!==e&&(this.formattedTime_=e,this.requestNamedAnimationFrame("TimeDisplay#updateTextNode_",()=>{if(!this.contentEl_)return;let t=this.textNode_;t&&this.contentEl_.firstChild!==t&&(t=null,Fe.warn("TimeDisplay#updateTextnode_: Prevented replacement of text node element since it was no longer a child of this node. Appending a new node instead.")),this.textNode_=O().createTextNode(this.formattedTime_),this.textNode_&&(t?this.contentEl_.replaceChild(this.textNode_,t):this.contentEl_.appendChild(this.textNode_))}))}updateContent(e){}}Hn.prototype.labelText_="Time",Hn.prototype.controlText_="Time",W.registerComponent("TimeDisplay",Hn);class Za extends Hn{buildCSSClass(){return"vjs-current-time"}updateContent(e){let t;this.player_.ended()?t=this.player_.duration():t=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime(),this.updateTextNode_(t)}}Za.prototype.labelText_="Current Time",Za.prototype.controlText_="Current Time",W.registerComponent("CurrentTimeDisplay",Za);class eo extends Hn{constructor(e,t){super(e,t);const i=s=>this.updateContent(s);this.on(e,"durationchange",i),this.on(e,"loadstart",i),this.on(e,"loadedmetadata",i)}buildCSSClass(){return"vjs-duration"}updateContent(e){const t=this.player_.duration();this.updateTextNode_(t)}}eo.prototype.labelText_="Duration",eo.prototype.controlText_="Duration",W.registerComponent("DurationDisplay",eo);class vp extends W{createEl(){const e=super.createEl("div",{className:"vjs-time-control vjs-time-divider"},{"aria-hidden":!0}),t=super.createEl("div"),i=super.createEl("span",{textContent:"/"});return t.appendChild(i),e.appendChild(t),e}}W.registerComponent("TimeDivider",vp);class to extends Hn{constructor(e,t){super(e,t),this.on(e,"durationchange",i=>this.updateContent(i))}buildCSSClass(){return"vjs-remaining-time"}createEl(){const e=super.createEl();return this.options_.displayNegative!==!1&&e.insertBefore(Me("span",{},{"aria-hidden":!0},"-"),this.contentEl_),e}updateContent(e){if(typeof this.player_.duration()!="number")return;let t;this.player_.ended()?t=0:this.player_.remainingTimeDisplay?t=this.player_.remainingTimeDisplay():t=this.player_.remainingTime(),this.updateTextNode_(t)}}to.prototype.labelText_="Remaining Time",to.prototype.controlText_="Remaining Time",W.registerComponent("RemainingTimeDisplay",to);class Ap extends W{constructor(e,t){super(e,t),this.updateShowing(),this.on(this.player(),"durationchange",i=>this.updateShowing(i))}createEl(){const e=super.createEl("div",{className:"vjs-live-control vjs-control"});return this.contentEl_=Me("div",{className:"vjs-live-display"},{"aria-live":"off"}),this.contentEl_.appendChild(Me("span",{className:"vjs-control-text",textContent:`${this.localize("Stream Type")}\xA0`})),this.contentEl_.appendChild(O().createTextNode(this.localize("LIVE"))),e.appendChild(this.contentEl_),e}dispose(){this.contentEl_=null,super.dispose()}updateShowing(e){this.player().duration()===1/0?this.show():this.hide()}}W.registerComponent("LiveDisplay",Ap);class Cu extends Xt{constructor(e,t){super(e,t),this.updateLiveEdgeStatus(),this.player_.liveTracker&&(this.updateLiveEdgeStatusHandler_=i=>this.updateLiveEdgeStatus(i),this.on(this.player_.liveTracker,"liveedgechange",this.updateLiveEdgeStatusHandler_))}createEl(){const e=super.createEl("button",{className:"vjs-seek-to-live-control vjs-control"});return this.setIcon("circle",e),this.textEl_=Me("span",{className:"vjs-seek-to-live-text",textContent:this.localize("LIVE")},{"aria-hidden":"true"}),e.appendChild(this.textEl_),e}updateLiveEdgeStatus(){!this.player_.liveTracker||this.player_.liveTracker.atLiveEdge()?(this.setAttribute("aria-disabled",!0),this.addClass("vjs-at-live-edge"),this.controlText("Seek to live, currently playing live")):(this.setAttribute("aria-disabled",!1),this.removeClass("vjs-at-live-edge"),this.controlText("Seek to live, currently behind live"))}handleClick(){this.player_.liveTracker.seekToLiveEdge()}dispose(){this.player_.liveTracker&&this.off(this.player_.liveTracker,"liveedgechange",this.updateLiveEdgeStatusHandler_),this.textEl_=null,super.dispose()}}Cu.prototype.controlText_="Seek to live, currently playing live",W.registerComponent("SeekToLive",Cu);function Es(n,e,t){return n=Number(n),Math.min(t,Math.max(e,isNaN(n)?e:n))}var yp=Object.freeze({__proto__:null,clamp:Es});class io extends W{constructor(e,t){super(e,t),this.handleMouseDown_=i=>this.handleMouseDown(i),this.handleMouseUp_=i=>this.handleMouseUp(i),this.handleKeyDown_=i=>this.handleKeyDown(i),this.handleClick_=i=>this.handleClick(i),this.handleMouseMove_=i=>this.handleMouseMove(i),this.update_=i=>this.update(i),this.bar=this.getChild(this.options_.barName),this.vertical(!!this.options_.vertical),this.enable()}enabled(){return this.enabled_}enable(){this.enabled()||(this.on("mousedown",this.handleMouseDown_),this.on("touchstart",this.handleMouseDown_),this.on("keydown",this.handleKeyDown_),this.on("click",this.handleClick_),this.on(this.player_,"controlsvisible",this.update),this.playerEvent&&this.on(this.player_,this.playerEvent,this.update),this.removeClass("disabled"),this.setAttribute("tabindex",0),this.enabled_=!0)}disable(){if(!this.enabled())return;const e=this.bar.el_.ownerDocument;this.off("mousedown",this.handleMouseDown_),this.off("touchstart",this.handleMouseDown_),this.off("keydown",this.handleKeyDown_),this.off("click",this.handleClick_),this.off(this.player_,"controlsvisible",this.update_),this.off(e,"mousemove",this.handleMouseMove_),this.off(e,"mouseup",this.handleMouseUp_),this.off(e,"touchmove",this.handleMouseMove_),this.off(e,"touchend",this.handleMouseUp_),this.removeAttribute("tabindex"),this.addClass("disabled"),this.playerEvent&&this.off(this.player_,this.playerEvent,this.update),this.enabled_=!1}createEl(e,t={},i={}){return t.className=t.className+" vjs-slider",t=Object.assign({tabIndex:0},t),i=Object.assign({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100},i),super.createEl(e,t,i)}handleMouseDown(e){const t=this.bar.el_.ownerDocument;e.type==="mousedown"&&e.preventDefault(),e.type==="touchstart"&&!yi&&e.preventDefault(),Fl(),this.addClass("vjs-sliding"),this.trigger("slideractive"),this.on(t,"mousemove",this.handleMouseMove_),this.on(t,"mouseup",this.handleMouseUp_),this.on(t,"touchmove",this.handleMouseMove_),this.on(t,"touchend",this.handleMouseUp_),this.handleMouseMove(e,!0)}handleMouseMove(e){}handleMouseUp(e){const t=this.bar.el_.ownerDocument;Vl(),this.removeClass("vjs-sliding"),this.trigger("sliderinactive"),this.off(t,"mousemove",this.handleMouseMove_),this.off(t,"mouseup",this.handleMouseUp_),this.off(t,"touchmove",this.handleMouseMove_),this.off(t,"touchend",this.handleMouseUp_),this.update()}update(){if(!this.el_||!this.bar)return;const e=this.getProgress();return e===this.progress_||(this.progress_=e,this.requestNamedAnimationFrame("Slider#update",()=>{const t=this.vertical()?"height":"width";this.bar.el().style[t]=(e*100).toFixed(2)+"%"})),e}getProgress(){return Number(Es(this.getPercent(),0,1).toFixed(4))}calculateDistance(e){const t=hr(this.el_,e);return this.vertical()?t.y:t.x}handleKeyDown(e){U().isEventKey(e,"Left")||U().isEventKey(e,"Down")?(e.preventDefault(),e.stopPropagation(),this.stepBack()):U().isEventKey(e,"Right")||U().isEventKey(e,"Up")?(e.preventDefault(),e.stopPropagation(),this.stepForward()):super.handleKeyDown(e)}handleClick(e){e.stopPropagation(),e.preventDefault()}vertical(e){if(e===void 0)return this.vertical_||!1;this.vertical_=!!e,this.vertical_?this.addClass("vjs-slider-vertical"):this.addClass("vjs-slider-horizontal")}}W.registerComponent("Slider",io);const no=(n,e)=>Es(n/e*100,0,100).toFixed(2)+"%";class _p extends W{constructor(e,t){super(e,t),this.partEls_=[],this.on(e,"progress",i=>this.update(i))}createEl(){const e=super.createEl("div",{className:"vjs-load-progress"}),t=Me("span",{className:"vjs-control-text"}),i=Me("span",{textContent:this.localize("Loaded")}),s=O().createTextNode(": ");return this.percentageEl_=Me("span",{className:"vjs-control-text-loaded-percentage",textContent:"0%"}),e.appendChild(t),t.appendChild(i),t.appendChild(s),t.appendChild(this.percentageEl_),e}dispose(){this.partEls_=null,this.percentageEl_=null,super.dispose()}update(e){this.requestNamedAnimationFrame("LoadProgressBar#update",()=>{const t=this.player_.liveTracker,i=this.player_.buffered(),s=t&&t.isLive()?t.seekableEnd():this.player_.duration(),r=this.player_.bufferedEnd(),a=this.partEls_,l=no(r,s);this.percent_!==l&&(this.el_.style.width=l,Gi(this.percentageEl_,l),this.percent_=l);for(let h=0;h<i.length;h++){const p=i.start(h),g=i.end(h);let _=a[h];_||(_=this.el_.appendChild(Me()),a[h]=_),!(_.dataset.start===p&&_.dataset.end===g)&&(_.dataset.start=p,_.dataset.end=g,_.style.left=no(p,r),_.style.width=no(g-p,r))}for(let h=a.length;h>i.length;h--)this.el_.removeChild(a[h-1]);a.length=i.length})}}W.registerComponent("LoadProgressBar",_p);class bp extends W{constructor(e,t){super(e,t),this.update=_i(it(this,this.update),ei)}createEl(){return super.createEl("div",{className:"vjs-time-tooltip"},{"aria-hidden":"true"})}update(e,t,i){const s=ms(this.el_),r=Nn(this.player_.el()),a=e.width*t;if(!r||!s)return;let l=e.left-r.left+a,h=e.width-a+(r.right-e.right);h||(h=e.width-a,l=a);let p=s.width/2;l<p?p+=p-l:h<p&&(p=h),p<0?p=0:p>s.width&&(p=s.width),p=Math.round(p),this.el_.style.right=`-${p}px`,this.write(i)}write(e){Gi(this.el_,e)}updateTime(e,t,i,s){this.requestNamedAnimationFrame("TimeTooltip#updateTime",()=>{let r;const a=this.player_.duration();if(this.player_.liveTracker&&this.player_.liveTracker.isLive()){const l=this.player_.liveTracker.liveWindow(),h=l-t*l;r=(h<1?"":"-")+on(h,l)}else r=on(i,a);this.update(e,t,r),s&&s()})}}W.registerComponent("TimeTooltip",bp);class so extends W{constructor(e,t){super(e,t),this.setIcon("circle"),this.update=_i(it(this,this.update),ei)}createEl(){return super.createEl("div",{className:"vjs-play-progress vjs-slider-bar"},{"aria-hidden":"true"})}update(e,t){const i=this.getChild("timeTooltip");if(!i)return;const s=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();i.updateTime(e,t,s)}}so.prototype.options_={children:[]},!Lt&&!Ai&&so.prototype.options_.children.push("timeTooltip"),W.registerComponent("PlayProgressBar",so);class xu extends W{constructor(e,t){super(e,t),this.update=_i(it(this,this.update),ei)}createEl(){return super.createEl("div",{className:"vjs-mouse-display"})}update(e,t){const i=t*this.player_.duration();this.getChild("timeTooltip").updateTime(e,t,i,()=>{this.el_.style.left=`${e.width*t}px`})}}xu.prototype.options_={children:["timeTooltip"]},W.registerComponent("MouseTimeDisplay",xu);const Cr=5,Su=12;class ro extends io{constructor(e,t){super(e,t),this.setEventHandlers_()}setEventHandlers_(){this.update_=it(this,this.update),this.update=_i(this.update_,ei),this.on(this.player_,["ended","durationchange","timeupdate"],this.update),this.player_.liveTracker&&this.on(this.player_.liveTracker,"liveedgechange",this.update),this.updateInterval=null,this.enableIntervalHandler_=e=>this.enableInterval_(e),this.disableIntervalHandler_=e=>this.disableInterval_(e),this.on(this.player_,["playing"],this.enableIntervalHandler_),this.on(this.player_,["ended","pause","waiting"],this.disableIntervalHandler_),"hidden"in O()&&"visibilityState"in O()&&this.on(O(),"visibilitychange",this.toggleVisibility_)}toggleVisibility_(e){O().visibilityState==="hidden"?(this.cancelNamedAnimationFrame("SeekBar#update"),this.cancelNamedAnimationFrame("Slider#update"),this.disableInterval_(e)):(!this.player_.ended()&&!this.player_.paused()&&this.enableInterval_(),this.update())}enableInterval_(){this.updateInterval||(this.updateInterval=this.setInterval(this.update,ei))}disableInterval_(e){this.player_.liveTracker&&this.player_.liveTracker.isLive()&&e&&e.type!=="ended"||this.updateInterval&&(this.clearInterval(this.updateInterval),this.updateInterval=null)}createEl(){return super.createEl("div",{className:"vjs-progress-holder"},{"aria-label":this.localize("Progress Bar")})}update(e){if(O().visibilityState==="hidden")return;const t=super.update();return this.requestNamedAnimationFrame("SeekBar#update",()=>{const i=this.player_.ended()?this.player_.duration():this.getCurrentTime_(),s=this.player_.liveTracker;let r=this.player_.duration();s&&s.isLive()&&(r=this.player_.liveTracker.liveCurrentTime()),this.percent_!==t&&(this.el_.setAttribute("aria-valuenow",(t*100).toFixed(2)),this.percent_=t),(this.currentTime_!==i||this.duration_!==r)&&(this.el_.setAttribute("aria-valuetext",this.localize("progress bar timing: currentTime={1} duration={2}",[on(i,r),on(r,r)],"{1} of {2}")),this.currentTime_=i,this.duration_=r),this.bar&&this.bar.update(Nn(this.el()),this.getProgress())}),t}userSeek_(e){this.player_.liveTracker&&this.player_.liveTracker.isLive()&&this.player_.liveTracker.nextSeekedFromUser(),this.player_.currentTime(e)}getCurrentTime_(){return this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime()}getPercent(){const e=this.getCurrentTime_();let t;const i=this.player_.liveTracker;return i&&i.isLive()?(t=(e-i.seekableStart())/i.liveWindow(),i.atLiveEdge()&&(t=1)):t=e/this.player_.duration(),t}handleMouseDown(e){gs(e)&&(e.stopPropagation(),this.videoWasPlaying=!this.player_.paused(),this.player_.pause(),super.handleMouseDown(e))}handleMouseMove(e,t=!1){if(!gs(e)||isNaN(this.player_.duration()))return;!t&&!this.player_.scrubbing()&&this.player_.scrubbing(!0);let i;const s=this.calculateDistance(e),r=this.player_.liveTracker;if(!r||!r.isLive())i=s*this.player_.duration(),i===this.player_.duration()&&(i=i-.1);else{if(s>=.99){r.seekToLiveEdge();return}const a=r.seekableStart(),l=r.liveCurrentTime();if(i=a+s*r.liveWindow(),i>=l&&(i=l),i<=a&&(i=a+.1),i===1/0)return}this.userSeek_(i),this.player_.options_.enableSmoothSeeking&&this.update()}enable(){super.enable();const e=this.getChild("mouseTimeDisplay");e&&e.show()}disable(){super.disable();const e=this.getChild("mouseTimeDisplay");e&&e.hide()}handleMouseUp(e){super.handleMouseUp(e),e&&e.stopPropagation(),this.player_.scrubbing(!1),this.player_.trigger({type:"timeupdate",target:this,manuallyTriggered:!0}),this.videoWasPlaying?bi(this.player_.play()):this.update_()}stepForward(){this.userSeek_(this.player_.currentTime()+Cr)}stepBack(){this.userSeek_(this.player_.currentTime()-Cr)}handleAction(e){this.player_.paused()?this.player_.play():this.player_.pause()}handleKeyDown(e){const t=this.player_.liveTracker;if(U().isEventKey(e,"Space")||U().isEventKey(e,"Enter"))e.preventDefault(),e.stopPropagation(),this.handleAction(e);else if(U().isEventKey(e,"Home"))e.preventDefault(),e.stopPropagation(),this.userSeek_(0);else if(U().isEventKey(e,"End"))e.preventDefault(),e.stopPropagation(),t&&t.isLive()?this.userSeek_(t.liveCurrentTime()):this.userSeek_(this.player_.duration());else if(/^[0-9]$/.test(U()(e))){e.preventDefault(),e.stopPropagation();const i=(U().codes[U()(e)]-U().codes[0])*10/100;t&&t.isLive()?this.userSeek_(t.seekableStart()+t.liveWindow()*i):this.userSeek_(this.player_.duration()*i)}else U().isEventKey(e,"PgDn")?(e.preventDefault(),e.stopPropagation(),this.userSeek_(this.player_.currentTime()-Cr*Su)):U().isEventKey(e,"PgUp")?(e.preventDefault(),e.stopPropagation(),this.userSeek_(this.player_.currentTime()+Cr*Su)):super.handleKeyDown(e)}dispose(){this.disableInterval_(),this.off(this.player_,["ended","durationchange","timeupdate"],this.update),this.player_.liveTracker&&this.off(this.player_.liveTracker,"liveedgechange",this.update),this.off(this.player_,["playing"],this.enableIntervalHandler_),this.off(this.player_,["ended","pause","waiting"],this.disableIntervalHandler_),"hidden"in O()&&"visibilityState"in O()&&this.off(O(),"visibilitychange",this.toggleVisibility_),super.dispose()}}ro.prototype.options_={children:["loadProgressBar","playProgressBar"],barName:"playProgressBar"},!Lt&&!Ai&&ro.prototype.options_.children.splice(1,0,"mouseTimeDisplay"),W.registerComponent("SeekBar",ro);class ju extends W{constructor(e,t){super(e,t),this.handleMouseMove=_i(it(this,this.handleMouseMove),ei),this.throttledHandleMouseSeek=_i(it(this,this.handleMouseSeek),ei),this.handleMouseUpHandler_=i=>this.handleMouseUp(i),this.handleMouseDownHandler_=i=>this.handleMouseDown(i),this.enable()}createEl(){return super.createEl("div",{className:"vjs-progress-control vjs-control"})}handleMouseMove(e){const t=this.getChild("seekBar");if(!t)return;const i=t.getChild("playProgressBar"),s=t.getChild("mouseTimeDisplay");if(!i&&!s)return;const r=t.el(),a=ms(r);let l=hr(r,e).x;l=Es(l,0,1),s&&s.update(a,l),i&&i.update(a,t.getProgress())}handleMouseSeek(e){const t=this.getChild("seekBar");t&&t.handleMouseMove(e)}enabled(){return this.enabled_}disable(){if(this.children().forEach(e=>e.disable&&e.disable()),!!this.enabled()&&(this.off(["mousedown","touchstart"],this.handleMouseDownHandler_),this.off(this.el_,"mousemove",this.handleMouseMove),this.removeListenersAddedOnMousedownAndTouchstart(),this.addClass("disabled"),this.enabled_=!1,this.player_.scrubbing())){const e=this.getChild("seekBar");this.player_.scrubbing(!1),e.videoWasPlaying&&bi(this.player_.play())}}enable(){this.children().forEach(e=>e.enable&&e.enable()),!this.enabled()&&(this.on(["mousedown","touchstart"],this.handleMouseDownHandler_),this.on(this.el_,"mousemove",this.handleMouseMove),this.removeClass("disabled"),this.enabled_=!0)}removeListenersAddedOnMousedownAndTouchstart(){const e=this.el_.ownerDocument;this.off(e,"mousemove",this.throttledHandleMouseSeek),this.off(e,"touchmove",this.throttledHandleMouseSeek),this.off(e,"mouseup",this.handleMouseUpHandler_),this.off(e,"touchend",this.handleMouseUpHandler_)}handleMouseDown(e){const t=this.el_.ownerDocument,i=this.getChild("seekBar");i&&i.handleMouseDown(e),this.on(t,"mousemove",this.throttledHandleMouseSeek),this.on(t,"touchmove",this.throttledHandleMouseSeek),this.on(t,"mouseup",this.handleMouseUpHandler_),this.on(t,"touchend",this.handleMouseUpHandler_)}handleMouseUp(e){const t=this.getChild("seekBar");t&&t.handleMouseUp(e),this.removeListenersAddedOnMousedownAndTouchstart()}}ju.prototype.options_={children:["seekBar"]},W.registerComponent("ProgressControl",ju);class Bu extends Xt{constructor(e,t){super(e,t),this.setIcon("picture-in-picture-enter"),this.on(e,["enterpictureinpicture","leavepictureinpicture"],i=>this.handlePictureInPictureChange(i)),this.on(e,["disablepictureinpicturechanged","loadedmetadata"],i=>this.handlePictureInPictureEnabledChange(i)),this.on(e,["loadedmetadata","audioonlymodechange","audiopostermodechange"],()=>this.handlePictureInPictureAudioModeChange()),this.disable()}buildCSSClass(){return`vjs-picture-in-picture-control vjs-hidden ${super.buildCSSClass()}`}handlePictureInPictureAudioModeChange(){if(!(this.player_.currentType().substring(0,5)==="audio"||this.player_.audioPosterMode()||this.player_.audioOnlyMode())){this.show();return}this.player_.isInPictureInPicture()&&this.player_.exitPictureInPicture(),this.hide()}handlePictureInPictureEnabledChange(){O().pictureInPictureEnabled&&this.player_.disablePictureInPicture()===!1||this.player_.options_.enableDocumentPictureInPicture&&"documentPictureInPicture"in A()?this.enable():this.disable()}handlePictureInPictureChange(e){this.player_.isInPictureInPicture()?(this.setIcon("picture-in-picture-exit"),this.controlText("Exit Picture-in-Picture")):(this.setIcon("picture-in-picture-enter"),this.controlText("Picture-in-Picture")),this.handlePictureInPictureEnabledChange()}handleClick(e){this.player_.isInPictureInPicture()?this.player_.exitPictureInPicture():this.player_.requestPictureInPicture()}show(){typeof O().exitPictureInPicture=="function"&&super.show()}}Bu.prototype.controlText_="Picture-in-Picture",W.registerComponent("PictureInPictureToggle",Bu);class wu extends Xt{constructor(e,t){super(e,t),this.setIcon("fullscreen-enter"),this.on(e,"fullscreenchange",i=>this.handleFullscreenChange(i)),O()[e.fsApi_.fullscreenEnabled]===!1&&this.disable()}buildCSSClass(){return`vjs-fullscreen-control ${super.buildCSSClass()}`}handleFullscreenChange(e){this.player_.isFullscreen()?(this.controlText("Exit Fullscreen"),this.setIcon("fullscreen-exit")):(this.controlText("Fullscreen"),this.setIcon("fullscreen-enter"))}handleClick(e){this.player_.isFullscreen()?this.player_.exitFullscreen():this.player_.requestFullscreen()}}wu.prototype.controlText_="Fullscreen",W.registerComponent("FullscreenToggle",wu);const Ep=function(n,e){e.tech_&&!e.tech_.featuresVolumeControl&&n.addClass("vjs-hidden"),n.on(e,"loadstart",function(){e.tech_.featuresVolumeControl?n.removeClass("vjs-hidden"):n.addClass("vjs-hidden")})};class Tp extends W{createEl(){const e=super.createEl("div",{className:"vjs-volume-level"});return this.setIcon("circle",e),e.appendChild(super.createEl("span",{className:"vjs-control-text"})),e}}W.registerComponent("VolumeLevel",Tp);class Cp extends W{constructor(e,t){super(e,t),this.update=_i(it(this,this.update),ei)}createEl(){return super.createEl("div",{className:"vjs-volume-tooltip"},{"aria-hidden":"true"})}update(e,t,i,s){if(!i){const r=Nn(this.el_),a=Nn(this.player_.el()),l=e.width*t;if(!a||!r)return;const h=e.left-a.left+l,p=e.width-l+(a.right-e.right);let g=r.width/2;h<g?g+=g-h:p<g&&(g=p),g<0?g=0:g>r.width&&(g=r.width),this.el_.style.right=`-${g}px`}this.write(`${s}%`)}write(e){Gi(this.el_,e)}updateVolume(e,t,i,s,r){this.requestNamedAnimationFrame("VolumeLevelTooltip#updateVolume",()=>{this.update(e,t,i,s.toFixed(0)),r&&r()})}}W.registerComponent("VolumeLevelTooltip",Cp);class Du extends W{constructor(e,t){super(e,t),this.update=_i(it(this,this.update),ei)}createEl(){return super.createEl("div",{className:"vjs-mouse-display"})}update(e,t,i){const s=100*t;this.getChild("volumeLevelTooltip").updateVolume(e,t,i,s,()=>{i?this.el_.style.bottom=`${e.height*t}px`:this.el_.style.left=`${e.width*t}px`})}}Du.prototype.options_={children:["volumeLevelTooltip"]},W.registerComponent("MouseVolumeLevelDisplay",Du);class xr extends io{constructor(e,t){super(e,t),this.on("slideractive",i=>this.updateLastVolume_(i)),this.on(e,"volumechange",i=>this.updateARIAAttributes(i)),e.ready(()=>this.updateARIAAttributes())}createEl(){return super.createEl("div",{className:"vjs-volume-bar vjs-slider-bar"},{"aria-label":this.localize("Volume Level"),"aria-live":"polite"})}handleMouseDown(e){gs(e)&&super.handleMouseDown(e)}handleMouseMove(e){const t=this.getChild("mouseVolumeLevelDisplay");if(t){const i=this.el(),s=Nn(i),r=this.vertical();let a=hr(i,e);a=r?a.y:a.x,a=Es(a,0,1),t.update(s,a,r)}gs(e)&&(this.checkMuted(),this.player_.volume(this.calculateDistance(e)))}checkMuted(){this.player_.muted()&&this.player_.muted(!1)}getPercent(){return this.player_.muted()?0:this.player_.volume()}stepForward(){this.checkMuted(),this.player_.volume(this.player_.volume()+.1)}stepBack(){this.checkMuted(),this.player_.volume(this.player_.volume()-.1)}updateARIAAttributes(e){const t=this.player_.muted()?0:this.volumeAsPercentage_();this.el_.setAttribute("aria-valuenow",t),this.el_.setAttribute("aria-valuetext",t+"%")}volumeAsPercentage_(){return Math.round(this.player_.volume()*100)}updateLastVolume_(){const e=this.player_.volume();this.one("sliderinactive",()=>{this.player_.volume()===0&&this.player_.lastVolume_(e)})}}xr.prototype.options_={children:["volumeLevel"],barName:"volumeLevel"},!Lt&&!Ai&&xr.prototype.options_.children.splice(0,0,"mouseVolumeLevelDisplay"),xr.prototype.playerEvent="volumechange",W.registerComponent("VolumeBar",xr);class ku extends W{constructor(e,t={}){t.vertical=t.vertical||!1,(typeof t.volumeBar=="undefined"||In(t.volumeBar))&&(t.volumeBar=t.volumeBar||{},t.volumeBar.vertical=t.vertical),super(e,t),Ep(this,e),this.throttledHandleMouseMove=_i(it(this,this.handleMouseMove),ei),this.handleMouseUpHandler_=i=>this.handleMouseUp(i),this.on("mousedown",i=>this.handleMouseDown(i)),this.on("touchstart",i=>this.handleMouseDown(i)),this.on("mousemove",i=>this.handleMouseMove(i)),this.on(this.volumeBar,["focus","slideractive"],()=>{this.volumeBar.addClass("vjs-slider-active"),this.addClass("vjs-slider-active"),this.trigger("slideractive")}),this.on(this.volumeBar,["blur","sliderinactive"],()=>{this.volumeBar.removeClass("vjs-slider-active"),this.removeClass("vjs-slider-active"),this.trigger("sliderinactive")})}createEl(){let e="vjs-volume-horizontal";return this.options_.vertical&&(e="vjs-volume-vertical"),super.createEl("div",{className:`vjs-volume-control vjs-control ${e}`})}handleMouseDown(e){const t=this.el_.ownerDocument;this.on(t,"mousemove",this.throttledHandleMouseMove),this.on(t,"touchmove",this.throttledHandleMouseMove),this.on(t,"mouseup",this.handleMouseUpHandler_),this.on(t,"touchend",this.handleMouseUpHandler_)}handleMouseUp(e){const t=this.el_.ownerDocument;this.off(t,"mousemove",this.throttledHandleMouseMove),this.off(t,"touchmove",this.throttledHandleMouseMove),this.off(t,"mouseup",this.handleMouseUpHandler_),this.off(t,"touchend",this.handleMouseUpHandler_)}handleMouseMove(e){this.volumeBar.handleMouseMove(e)}}ku.prototype.options_={children:["volumeBar"]},W.registerComponent("VolumeControl",ku);const xp=function(n,e){e.tech_&&!e.tech_.featuresMuteControl&&n.addClass("vjs-hidden"),n.on(e,"loadstart",function(){e.tech_.featuresMuteControl?n.removeClass("vjs-hidden"):n.addClass("vjs-hidden")})};class Iu extends Xt{constructor(e,t){super(e,t),xp(this,e),this.on(e,["loadstart","volumechange"],i=>this.update(i))}buildCSSClass(){return`vjs-mute-control ${super.buildCSSClass()}`}handleClick(e){const t=this.player_.volume(),i=this.player_.lastVolume_();if(t===0){const s=i<.1?.1:i;this.player_.volume(s),this.player_.muted(!1)}else this.player_.muted(!this.player_.muted())}update(e){this.updateIcon_(),this.updateControlText_()}updateIcon_(){const e=this.player_.volume();let t=3;this.setIcon("volume-high"),Lt&&this.player_.tech_&&this.player_.tech_.el_&&this.player_.muted(this.player_.tech_.el_.muted),e===0||this.player_.muted()?(this.setIcon("volume-mute"),t=0):e<.33?(this.setIcon("volume-low"),t=1):e<.67&&(this.setIcon("volume-medium"),t=2),cr(this.el_,[0,1,2,3].reduce((i,s)=>i+`${s?" ":""}vjs-vol-${s}`,"")),rn(this.el_,`vjs-vol-${t}`)}updateControlText_(){const t=this.player_.muted()||this.player_.volume()===0?"Unmute":"Mute";this.controlText()!==t&&this.controlText(t)}}Iu.prototype.controlText_="Mute",W.registerComponent("MuteToggle",Iu);class Pu extends W{constructor(e,t={}){typeof t.inline!="undefined"?t.inline=t.inline:t.inline=!0,(typeof t.volumeControl=="undefined"||In(t.volumeControl))&&(t.volumeControl=t.volumeControl||{},t.volumeControl.vertical=!t.inline),super(e,t),this.handleKeyPressHandler_=i=>this.handleKeyPress(i),this.on(e,["loadstart"],i=>this.volumePanelState_(i)),this.on(this.muteToggle,"keyup",i=>this.handleKeyPress(i)),this.on(this.volumeControl,"keyup",i=>this.handleVolumeControlKeyUp(i)),this.on("keydown",i=>this.handleKeyPress(i)),this.on("mouseover",i=>this.handleMouseOver(i)),this.on("mouseout",i=>this.handleMouseOut(i)),this.on(this.volumeControl,["slideractive"],this.sliderActive_),this.on(this.volumeControl,["sliderinactive"],this.sliderInactive_)}sliderActive_(){this.addClass("vjs-slider-active")}sliderInactive_(){this.removeClass("vjs-slider-active")}volumePanelState_(){this.volumeControl.hasClass("vjs-hidden")&&this.muteToggle.hasClass("vjs-hidden")&&this.addClass("vjs-hidden"),this.volumeControl.hasClass("vjs-hidden")&&!this.muteToggle.hasClass("vjs-hidden")&&this.addClass("vjs-mute-toggle-only")}createEl(){let e="vjs-volume-panel-horizontal";return this.options_.inline||(e="vjs-volume-panel-vertical"),super.createEl("div",{className:`vjs-volume-panel vjs-control ${e}`})}dispose(){this.handleMouseOut(),super.dispose()}handleVolumeControlKeyUp(e){U().isEventKey(e,"Esc")&&this.muteToggle.focus()}handleMouseOver(e){this.addClass("vjs-hover"),$t(O(),"keyup",this.handleKeyPressHandler_)}handleMouseOut(e){this.removeClass("vjs-hover"),wt(O(),"keyup",this.handleKeyPressHandler_)}handleKeyPress(e){U().isEventKey(e,"Esc")&&this.handleMouseOut()}}Pu.prototype.options_={children:["muteToggle","volumeControl"]},W.registerComponent("VolumePanel",Pu);class Ou extends Xt{constructor(e,t){super(e,t),this.validOptions=[5,10,30],this.skipTime=this.getSkipForwardTime(),this.skipTime&&this.validOptions.includes(this.skipTime)?(this.setIcon(`forward-${this.skipTime}`),this.controlText(this.localize("Skip forward {1} seconds",[this.skipTime.toLocaleString(e.language())])),this.show()):this.hide()}getSkipForwardTime(){const e=this.options_.playerOptions;return e.controlBar&&e.controlBar.skipButtons&&e.controlBar.skipButtons.forward}buildCSSClass(){return`vjs-skip-forward-${this.getSkipForwardTime()} ${super.buildCSSClass()}`}handleClick(e){if(isNaN(this.player_.duration()))return;const t=this.player_.currentTime(),i=this.player_.liveTracker,s=i&&i.isLive()?i.seekableEnd():this.player_.duration();let r;t+this.skipTime<=s?r=t+this.skipTime:r=s,this.player_.currentTime(r)}handleLanguagechange(){this.controlText(this.localize("Skip forward {1} seconds",[this.skipTime]))}}Ou.prototype.controlText_="Skip Forward",W.registerComponent("SkipForward",Ou);class Lu extends Xt{constructor(e,t){super(e,t),this.validOptions=[5,10,30],this.skipTime=this.getSkipBackwardTime(),this.skipTime&&this.validOptions.includes(this.skipTime)?(this.setIcon(`replay-${this.skipTime}`),this.controlText(this.localize("Skip backward {1} seconds",[this.skipTime.toLocaleString(e.language())])),this.show()):this.hide()}getSkipBackwardTime(){const e=this.options_.playerOptions;return e.controlBar&&e.controlBar.skipButtons&&e.controlBar.skipButtons.backward}buildCSSClass(){return`vjs-skip-backward-${this.getSkipBackwardTime()} ${super.buildCSSClass()}`}handleClick(e){const t=this.player_.currentTime(),i=this.player_.liveTracker,s=i&&i.isLive()&&i.seekableStart();let r;s&&t-this.skipTime<=s?r=s:t>=this.skipTime?r=t-this.skipTime:r=0,this.player_.currentTime(r)}handleLanguagechange(){this.controlText(this.localize("Skip backward {1} seconds",[this.skipTime]))}}Lu.prototype.controlText_="Skip Backward",W.registerComponent("SkipBackward",Lu);class Ru extends W{constructor(e,t){super(e,t),t&&(this.menuButton_=t.menuButton),this.focusedChild_=-1,this.on("keydown",i=>this.handleKeyDown(i)),this.boundHandleBlur_=i=>this.handleBlur(i),this.boundHandleTapClick_=i=>this.handleTapClick(i)}addEventListenerForItem(e){e instanceof W&&(this.on(e,"blur",this.boundHandleBlur_),this.on(e,["tap","click"],this.boundHandleTapClick_))}removeEventListenerForItem(e){e instanceof W&&(this.off(e,"blur",this.boundHandleBlur_),this.off(e,["tap","click"],this.boundHandleTapClick_))}removeChild(e){typeof e=="string"&&(e=this.getChild(e)),this.removeEventListenerForItem(e),super.removeChild(e)}addItem(e){const t=this.addChild(e);t&&this.addEventListenerForItem(t)}createEl(){const e=this.options_.contentElType||"ul";this.contentEl_=Me(e,{className:"vjs-menu-content"}),this.contentEl_.setAttribute("role","menu");const t=super.createEl("div",{append:this.contentEl_,className:"vjs-menu"});return t.appendChild(this.contentEl_),$t(t,"click",function(i){i.preventDefault(),i.stopImmediatePropagation()}),t}dispose(){this.contentEl_=null,this.boundHandleBlur_=null,this.boundHandleTapClick_=null,super.dispose()}handleBlur(e){const t=e.relatedTarget||O().activeElement;if(!this.children().some(i=>i.el()===t)){const i=this.menuButton_;i&&i.buttonPressed_&&t!==i.el().firstChild&&i.unpressButton()}}handleTapClick(e){if(this.menuButton_){this.menuButton_.unpressButton();const t=this.children();if(!Array.isArray(t))return;const i=t.filter(s=>s.el()===e.target)[0];if(!i)return;i.name()!=="CaptionSettingsMenuItem"&&this.menuButton_.focus()}}handleKeyDown(e){U().isEventKey(e,"Left")||U().isEventKey(e,"Down")?(e.preventDefault(),e.stopPropagation(),this.stepForward()):(U().isEventKey(e,"Right")||U().isEventKey(e,"Up"))&&(e.preventDefault(),e.stopPropagation(),this.stepBack())}stepForward(){let e=0;this.focusedChild_!==void 0&&(e=this.focusedChild_+1),this.focus(e)}stepBack(){let e=0;this.focusedChild_!==void 0&&(e=this.focusedChild_-1),this.focus(e)}focus(e=0){const t=this.children().slice();t.length&&t[0].hasClass("vjs-menu-title")&&t.shift(),t.length>0&&(e<0?e=0:e>=t.length&&(e=t.length-1),this.focusedChild_=e,t[e].el_.focus())}}W.registerComponent("Menu",Ru);class ao extends W{constructor(e,t={}){super(e,t),this.menuButton_=new Xt(e,t),this.menuButton_.controlText(this.controlText_),this.menuButton_.el_.setAttribute("aria-haspopup","true");const i=Xt.prototype.buildCSSClass();this.menuButton_.el_.className=this.buildCSSClass()+" "+i,this.menuButton_.removeClass("vjs-control"),this.addChild(this.menuButton_),this.update(),this.enabled_=!0;const s=r=>this.handleClick(r);this.handleMenuKeyUp_=r=>this.handleMenuKeyUp(r),this.on(this.menuButton_,"tap",s),this.on(this.menuButton_,"click",s),this.on(this.menuButton_,"keydown",r=>this.handleKeyDown(r)),this.on(this.menuButton_,"mouseenter",()=>{this.addClass("vjs-hover"),this.menu.show(),$t(O(),"keyup",this.handleMenuKeyUp_)}),this.on("mouseleave",r=>this.handleMouseLeave(r)),this.on("keydown",r=>this.handleSubmenuKeyDown(r))}update(){const e=this.createMenu();this.menu&&(this.menu.dispose(),this.removeChild(this.menu)),this.menu=e,this.addChild(e),this.buttonPressed_=!1,this.menuButton_.el_.setAttribute("aria-expanded","false"),this.items&&this.items.length<=this.hideThreshold_?(this.hide(),this.menu.contentEl_.removeAttribute("role")):(this.show(),this.menu.contentEl_.setAttribute("role","menu"))}createMenu(){const e=new Ru(this.player_,{menuButton:this});if(this.hideThreshold_=0,this.options_.title){const t=Me("li",{className:"vjs-menu-title",textContent:pt(this.options_.title),tabIndex:-1}),i=new W(this.player_,{el:t});e.addItem(i)}if(this.items=this.createItems(),this.items)for(let t=0;t<this.items.length;t++)e.addItem(this.items[t]);return e}createItems(){}createEl(){return super.createEl("div",{className:this.buildWrapperCSSClass()},{})}setIcon(e){super.setIcon(e,this.menuButton_.el_)}buildWrapperCSSClass(){let e="vjs-menu-button";this.options_.inline===!0?e+="-inline":e+="-popup";const t=Xt.prototype.buildCSSClass();return`vjs-menu-button ${e} ${t} ${super.buildCSSClass()}`}buildCSSClass(){let e="vjs-menu-button";return this.options_.inline===!0?e+="-inline":e+="-popup",`vjs-menu-button ${e} ${super.buildCSSClass()}`}controlText(e,t=this.menuButton_.el()){return this.menuButton_.controlText(e,t)}dispose(){this.handleMouseLeave(),super.dispose()}handleClick(e){this.buttonPressed_?this.unpressButton():this.pressButton()}handleMouseLeave(e){this.removeClass("vjs-hover"),wt(O(),"keyup",this.handleMenuKeyUp_)}focus(){this.menuButton_.focus()}blur(){this.menuButton_.blur()}handleKeyDown(e){U().isEventKey(e,"Esc")||U().isEventKey(e,"Tab")?(this.buttonPressed_&&this.unpressButton(),U().isEventKey(e,"Tab")||(e.preventDefault(),this.menuButton_.focus())):(U().isEventKey(e,"Up")||U().isEventKey(e,"Down"))&&(this.buttonPressed_||(e.preventDefault(),this.pressButton()))}handleMenuKeyUp(e){(U().isEventKey(e,"Esc")||U().isEventKey(e,"Tab"))&&this.removeClass("vjs-hover")}handleSubmenuKeyPress(e){this.handleSubmenuKeyDown(e)}handleSubmenuKeyDown(e){(U().isEventKey(e,"Esc")||U().isEventKey(e,"Tab"))&&(this.buttonPressed_&&this.unpressButton(),U().isEventKey(e,"Tab")||(e.preventDefault(),this.menuButton_.focus()))}pressButton(){if(this.enabled_){if(this.buttonPressed_=!0,this.menu.show(),this.menu.lockShowing(),this.menuButton_.el_.setAttribute("aria-expanded","true"),Lt&&Ll())return;this.menu.focus()}}unpressButton(){this.enabled_&&(this.buttonPressed_=!1,this.menu.unlockShowing(),this.menu.hide(),this.menuButton_.el_.setAttribute("aria-expanded","false"))}disable(){this.unpressButton(),this.enabled_=!1,this.addClass("vjs-disabled"),this.menuButton_.disable()}enable(){this.enabled_=!0,this.removeClass("vjs-disabled"),this.menuButton_.enable()}}W.registerComponent("MenuButton",ao);class oo extends ao{constructor(e,t){const i=t.tracks;if(super(e,t),this.items.length<=1&&this.hide(),!i)return;const s=it(this,this.update);i.addEventListener("removetrack",s),i.addEventListener("addtrack",s),i.addEventListener("labelchange",s),this.player_.on("ready",s),this.player_.on("dispose",function(){i.removeEventListener("removetrack",s),i.removeEventListener("addtrack",s),i.removeEventListener("labelchange",s)})}}W.registerComponent("TrackButton",oo);const Sp=["Tab","Esc","Up","Down","Right","Left"];class Ts extends Tr{constructor(e,t){super(e,t),this.selectable=t.selectable,this.isSelected_=t.selected||!1,this.multiSelectable=t.multiSelectable,this.selected(this.isSelected_),this.selectable?this.multiSelectable?this.el_.setAttribute("role","menuitemcheckbox"):this.el_.setAttribute("role","menuitemradio"):this.el_.setAttribute("role","menuitem")}createEl(e,t,i){this.nonIconControl=!0;const s=super.createEl("li",Object.assign({className:"vjs-menu-item",tabIndex:-1},t),i),r=Me("span",{className:"vjs-menu-item-text",textContent:this.localize(this.options_.label)});return this.player_.options_.experimentalSvgIcons?s.appendChild(r):s.replaceChild(r,s.querySelector(".vjs-icon-placeholder")),s}handleKeyDown(e){Sp.some(t=>U().isEventKey(e,t))||super.handleKeyDown(e)}handleClick(e){this.selected(!0)}selected(e){this.selectable&&(e?(this.addClass("vjs-selected"),this.el_.setAttribute("aria-checked","true"),this.controlText(", selected"),this.isSelected_=!0):(this.removeClass("vjs-selected"),this.el_.setAttribute("aria-checked","false"),this.controlText(""),this.isSelected_=!1))}}W.registerComponent("MenuItem",Ts);class Cs extends Ts{constructor(e,t){const i=t.track,s=e.textTracks();t.label=i.label||i.language||"Unknown",t.selected=i.mode==="showing",super(e,t),this.track=i,this.kinds=(t.kinds||[t.kind||this.track.kind]).filter(Boolean);const r=(...l)=>{this.handleTracksChange.apply(this,l)},a=(...l)=>{this.handleSelectedLanguageChange.apply(this,l)};if(e.on(["loadstart","texttrackchange"],r),s.addEventListener("change",r),s.addEventListener("selectedlanguagechange",a),this.on("dispose",function(){e.off(["loadstart","texttrackchange"],r),s.removeEventListener("change",r),s.removeEventListener("selectedlanguagechange",a)}),s.onchange===void 0){let l;this.on(["tap","click"],function(){if(typeof A().Event!="object")try{l=new(A()).Event("change")}catch(h){}l||(l=O().createEvent("Event"),l.initEvent("change",!0,!0)),s.dispatchEvent(l)})}this.handleTracksChange()}handleClick(e){const t=this.track,i=this.player_.textTracks();if(super.handleClick(e),!!i)for(let s=0;s<i.length;s++){const r=i[s];this.kinds.indexOf(r.kind)!==-1&&(r===t?r.mode!=="showing"&&(r.mode="showing"):r.mode!=="disabled"&&(r.mode="disabled"))}}handleTracksChange(e){const t=this.track.mode==="showing";t!==this.isSelected_&&this.selected(t)}handleSelectedLanguageChange(e){if(this.track.mode==="showing"){const t=this.player_.cache_.selectedLanguage;if(t&&t.enabled&&t.language===this.track.language&&t.kind!==this.track.kind)return;this.player_.cache_.selectedLanguage={enabled:!0,language:this.track.language,kind:this.track.kind}}}dispose(){this.track=null,super.dispose()}}W.registerComponent("TextTrackMenuItem",Cs);class Mu extends Cs{constructor(e,t){t.track={player:e,kind:t.kind,kinds:t.kinds,default:!1,mode:"disabled"},t.kinds||(t.kinds=[t.kind]),t.label?t.track.label=t.label:t.track.label=t.kinds.join(" and ")+" off",t.selectable=!0,t.multiSelectable=!1,super(e,t)}handleTracksChange(e){const t=this.player().textTracks();let i=!0;for(let s=0,r=t.length;s<r;s++){const a=t[s];if(this.options_.kinds.indexOf(a.kind)>-1&&a.mode==="showing"){i=!1;break}}i!==this.isSelected_&&this.selected(i)}handleSelectedLanguageChange(e){const t=this.player().textTracks();let i=!0;for(let s=0,r=t.length;s<r;s++){const a=t[s];if(["captions","descriptions","subtitles"].indexOf(a.kind)>-1&&a.mode==="showing"){i=!1;break}}i&&(this.player_.cache_.selectedLanguage={enabled:!1})}handleLanguagechange(){this.$(".vjs-menu-item-text").textContent=this.player_.localize(this.options_.label),super.handleLanguagechange()}}W.registerComponent("OffTextTrackMenuItem",Mu);class Wn extends oo{constructor(e,t={}){t.tracks=e.textTracks(),super(e,t)}createItems(e=[],t=Cs){let i;this.label_&&(i=`${this.label_} off`),e.push(new Mu(this.player_,{kinds:this.kinds_,kind:this.kind_,label:i})),this.hideThreshold_+=1;const s=this.player_.textTracks();Array.isArray(this.kinds_)||(this.kinds_=[this.kind_]);for(let r=0;r<s.length;r++){const a=s[r];if(this.kinds_.indexOf(a.kind)>-1){const l=new t(this.player_,{track:a,kinds:this.kinds_,kind:this.kind_,selectable:!0,multiSelectable:!1});l.addClass(`vjs-${a.kind}-menu-item`),e.push(l)}}return e}}W.registerComponent("TextTrackButton",Wn);class Nu extends Ts{constructor(e,t){const i=t.track,s=t.cue,r=e.currentTime();t.selectable=!0,t.multiSelectable=!1,t.label=s.text,t.selected=s.startTime<=r&&r<s.endTime,super(e,t),this.track=i,this.cue=s}handleClick(e){super.handleClick(),this.player_.currentTime(this.cue.startTime)}}W.registerComponent("ChaptersTrackMenuItem",Nu);class lo extends Wn{constructor(e,t,i){super(e,t,i),this.setIcon("chapters"),this.selectCurrentItem_=()=>{this.items.forEach(s=>{s.selected(this.track_.activeCues[0]===s.cue)})}}buildCSSClass(){return`vjs-chapters-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-chapters-button ${super.buildWrapperCSSClass()}`}update(e){if(e&&e.track&&e.track.kind!=="chapters")return;const t=this.findChaptersTrack();t!==this.track_?(this.setTrack(t),super.update()):(!this.items||t&&t.cues&&t.cues.length!==this.items.length)&&super.update()}setTrack(e){if(this.track_!==e){if(this.updateHandler_||(this.updateHandler_=this.update.bind(this)),this.track_){const t=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);t&&t.removeEventListener("load",this.updateHandler_),this.track_.removeEventListener("cuechange",this.selectCurrentItem_),this.track_=null}if(this.track_=e,this.track_){this.track_.mode="hidden";const t=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);t&&t.addEventListener("load",this.updateHandler_),this.track_.addEventListener("cuechange",this.selectCurrentItem_)}}}findChaptersTrack(){const e=this.player_.textTracks()||[];for(let t=e.length-1;t>=0;t--){const i=e[t];if(i.kind===this.kind_)return i}}getMenuCaption(){return this.track_&&this.track_.label?this.track_.label:this.localize(pt(this.kind_))}createMenu(){return this.options_.title=this.getMenuCaption(),super.createMenu()}createItems(){const e=[];if(!this.track_)return e;const t=this.track_.cues;if(!t)return e;for(let i=0,s=t.length;i<s;i++){const r=t[i],a=new Nu(this.player_,{track:this.track_,cue:r});e.push(a)}return e}}lo.prototype.kind_="chapters",lo.prototype.controlText_="Chapters",W.registerComponent("ChaptersButton",lo);class uo extends Wn{constructor(e,t,i){super(e,t,i),this.setIcon("audio-description");const s=e.textTracks(),r=it(this,this.handleTracksChange);s.addEventListener("change",r),this.on("dispose",function(){s.removeEventListener("change",r)})}handleTracksChange(e){const t=this.player().textTracks();let i=!1;for(let s=0,r=t.length;s<r;s++){const a=t[s];if(a.kind!==this.kind_&&a.mode==="showing"){i=!0;break}}i?this.disable():this.enable()}buildCSSClass(){return`vjs-descriptions-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-descriptions-button ${super.buildWrapperCSSClass()}`}}uo.prototype.kind_="descriptions",uo.prototype.controlText_="Descriptions",W.registerComponent("DescriptionsButton",uo);class co extends Wn{constructor(e,t,i){super(e,t,i),this.setIcon("subtitles")}buildCSSClass(){return`vjs-subtitles-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-subtitles-button ${super.buildWrapperCSSClass()}`}}co.prototype.kind_="subtitles",co.prototype.controlText_="Subtitles",W.registerComponent("SubtitlesButton",co);class ho extends Cs{constructor(e,t){t.track={player:e,kind:t.kind,label:t.kind+" settings",selectable:!1,default:!1,mode:"disabled"},t.selectable=!1,t.name="CaptionSettingsMenuItem",super(e,t),this.addClass("vjs-texttrack-settings"),this.controlText(", opens "+t.kind+" settings dialog")}handleClick(e){this.player().getChild("textTrackSettings").open()}handleLanguagechange(){this.$(".vjs-menu-item-text").textContent=this.player_.localize(this.options_.kind+" settings"),super.handleLanguagechange()}}W.registerComponent("CaptionSettingsMenuItem",ho);class fo extends Wn{constructor(e,t,i){super(e,t,i),this.setIcon("captions")}buildCSSClass(){return`vjs-captions-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-captions-button ${super.buildWrapperCSSClass()}`}createItems(){const e=[];return!(this.player().tech_&&this.player().tech_.featuresNativeTextTracks)&&this.player().getChild("textTrackSettings")&&(e.push(new ho(this.player_,{kind:this.kind_})),this.hideThreshold_+=1),super.createItems(e)}}fo.prototype.kind_="captions",fo.prototype.controlText_="Captions",W.registerComponent("CaptionsButton",fo);class Uu extends Cs{createEl(e,t,i){const s=super.createEl(e,t,i),r=s.querySelector(".vjs-menu-item-text");return this.options_.track.kind==="captions"&&(this.player_.options_.experimentalSvgIcons?this.setIcon("captions",s):r.appendChild(Me("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),r.appendChild(Me("span",{className:"vjs-control-text",textContent:` ${this.localize("Captions")}`}))),s}}W.registerComponent("SubsCapsMenuItem",Uu);class po extends Wn{constructor(e,t={}){super(e,t),this.label_="subtitles",this.setIcon("subtitles"),["en","en-us","en-ca","fr-ca"].indexOf(this.player_.language_)>-1&&(this.label_="captions",this.setIcon("captions")),this.menuButton_.controlText(pt(this.label_))}buildCSSClass(){return`vjs-subs-caps-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-subs-caps-button ${super.buildWrapperCSSClass()}`}createItems(){let e=[];return!(this.player().tech_&&this.player().tech_.featuresNativeTextTracks)&&this.player().getChild("textTrackSettings")&&(e.push(new ho(this.player_,{kind:this.label_})),this.hideThreshold_+=1),e=super.createItems(e,Uu),e}}po.prototype.kinds_=["captions","subtitles"],po.prototype.controlText_="Subtitles",W.registerComponent("SubsCapsButton",po);class Fu extends Ts{constructor(e,t){const i=t.track,s=e.audioTracks();t.label=i.label||i.language||"Unknown",t.selected=i.enabled,super(e,t),this.track=i,this.addClass(`vjs-${i.kind}-menu-item`);const r=(...a)=>{this.handleTracksChange.apply(this,a)};s.addEventListener("change",r),this.on("dispose",()=>{s.removeEventListener("change",r)})}createEl(e,t,i){const s=super.createEl(e,t,i),r=s.querySelector(".vjs-menu-item-text");return["main-desc","description"].indexOf(this.options_.track.kind)>=0&&(r.appendChild(Me("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),r.appendChild(Me("span",{className:"vjs-control-text",textContent:" "+this.localize("Descriptions")}))),s}handleClick(e){if(super.handleClick(e),this.track.enabled=!0,this.player_.tech_.featuresNativeAudioTracks){const t=this.player_.audioTracks();for(let i=0;i<t.length;i++){const s=t[i];s!==this.track&&(s.enabled=s===this.track)}}}handleTracksChange(e){this.selected(this.track.enabled)}}W.registerComponent("AudioTrackMenuItem",Fu);class Vu extends oo{constructor(e,t={}){t.tracks=e.audioTracks(),super(e,t),this.setIcon("audio")}buildCSSClass(){return`vjs-audio-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-audio-button ${super.buildWrapperCSSClass()}`}createItems(e=[]){this.hideThreshold_=1;const t=this.player_.audioTracks();for(let i=0;i<t.length;i++){const s=t[i];e.push(new Fu(this.player_,{track:s,selectable:!0,multiSelectable:!1}))}return e}}Vu.prototype.controlText_="Audio Track",W.registerComponent("AudioTrackButton",Vu);class mo extends Ts{constructor(e,t){const i=t.rate,s=parseFloat(i,10);t.label=i,t.selected=s===e.playbackRate(),t.selectable=!0,t.multiSelectable=!1,super(e,t),this.label=i,this.rate=s,this.on(e,"ratechange",r=>this.update(r))}handleClick(e){super.handleClick(),this.player().playbackRate(this.rate)}update(e){this.selected(this.player().playbackRate()===this.rate)}}mo.prototype.contentElType="button",W.registerComponent("PlaybackRateMenuItem",mo);class qu extends ao{constructor(e,t){super(e,t),this.menuButton_.el_.setAttribute("aria-describedby",this.labelElId_),this.updateVisibility(),this.updateLabel(),this.on(e,"loadstart",i=>this.updateVisibility(i)),this.on(e,"ratechange",i=>this.updateLabel(i)),this.on(e,"playbackrateschange",i=>this.handlePlaybackRateschange(i))}createEl(){const e=super.createEl();return this.labelElId_="vjs-playback-rate-value-label-"+this.id_,this.labelEl_=Me("div",{className:"vjs-playback-rate-value",id:this.labelElId_,textContent:"1x"}),e.appendChild(this.labelEl_),e}dispose(){this.labelEl_=null,super.dispose()}buildCSSClass(){return`vjs-playback-rate ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-playback-rate ${super.buildWrapperCSSClass()}`}createItems(){const e=this.playbackRates(),t=[];for(let i=e.length-1;i>=0;i--)t.push(new mo(this.player(),{rate:e[i]+"x"}));return t}handlePlaybackRateschange(e){this.update()}playbackRates(){const e=this.player();return e.playbackRates&&e.playbackRates()||[]}playbackRateSupported(){return this.player().tech_&&this.player().tech_.featuresPlaybackRate&&this.playbackRates()&&this.playbackRates().length>0}updateVisibility(e){this.playbackRateSupported()?this.removeClass("vjs-hidden"):this.addClass("vjs-hidden")}updateLabel(e){this.playbackRateSupported()&&(this.labelEl_.textContent=this.player().playbackRate()+"x")}}qu.prototype.controlText_="Playback Rate",W.registerComponent("PlaybackRateMenuButton",qu);class zu extends W{buildCSSClass(){return`vjs-spacer ${super.buildCSSClass()}`}createEl(e="div",t={},i={}){return t.className||(t.className=this.buildCSSClass()),super.createEl(e,t,i)}}W.registerComponent("Spacer",zu);class jp extends zu{buildCSSClass(){return`vjs-custom-control-spacer ${super.buildCSSClass()}`}createEl(){return super.createEl("div",{className:this.buildCSSClass(),textContent:"\xA0"})}}W.registerComponent("CustomControlSpacer",jp);class Hu extends W{createEl(){return super.createEl("div",{className:"vjs-control-bar",dir:"ltr"})}}Hu.prototype.options_={children:["playToggle","skipBackward","skipForward","volumePanel","currentTimeDisplay","timeDivider","durationDisplay","progressControl","liveDisplay","seekToLive","remainingTimeDisplay","customControlSpacer","playbackRateMenuButton","chaptersButton","descriptionsButton","subsCapsButton","audioTrackButton","pictureInPictureToggle","fullscreenToggle"]},W.registerComponent("ControlBar",Hu);class Wu extends Vn{constructor(e,t){super(e,t),this.on(e,"error",i=>{this.open(i)})}buildCSSClass(){return`vjs-error-display ${super.buildCSSClass()}`}content(){const e=this.player().error();return e?this.localize(e.message):""}}Wu.prototype.options_=Object.assign({},Vn.prototype.options_,{pauseOnOpen:!1,fillAlways:!0,temporary:!1,uncloseable:!0}),W.registerComponent("ErrorDisplay",Wu);const go="vjs-text-track-settings",Gu=["#000","Black"],$u=["#00F","Blue"],Xu=["#0FF","Cyan"],Yu=["#0F0","Green"],Ku=["#F0F","Magenta"],Qu=["#F00","Red"],Ju=["#FFF","White"],Zu=["#FF0","Yellow"],vo=["1","Opaque"],Ao=["0.5","Semi-Transparent"],ec=["0","Transparent"],cn={backgroundColor:{selector:".vjs-bg-color > select",id:"captions-background-color-%s",label:"Color",options:[Gu,Ju,Qu,Yu,$u,Zu,Ku,Xu]},backgroundOpacity:{selector:".vjs-bg-opacity > select",id:"captions-background-opacity-%s",label:"Opacity",options:[vo,Ao,ec]},color:{selector:".vjs-text-color > select",id:"captions-foreground-color-%s",label:"Color",options:[Ju,Gu,Qu,Yu,$u,Zu,Ku,Xu]},edgeStyle:{selector:".vjs-edge-style > select",id:"%s",label:"Text Edge Style",options:[["none","None"],["raised","Raised"],["depressed","Depressed"],["uniform","Uniform"],["dropshadow","Drop shadow"]]},fontFamily:{selector:".vjs-font-family > select",id:"captions-font-family-%s",label:"Font Family",options:[["proportionalSansSerif","Proportional Sans-Serif"],["monospaceSansSerif","Monospace Sans-Serif"],["proportionalSerif","Proportional Serif"],["monospaceSerif","Monospace Serif"],["casual","Casual"],["script","Script"],["small-caps","Small Caps"]]},fontPercent:{selector:".vjs-font-percent > select",id:"captions-font-size-%s",label:"Font Size",options:[["0.50","50%"],["0.75","75%"],["1.00","100%"],["1.25","125%"],["1.50","150%"],["1.75","175%"],["2.00","200%"],["3.00","300%"],["4.00","400%"]],default:2,parser:n=>n==="1.00"?null:Number(n)},textOpacity:{selector:".vjs-text-opacity > select",id:"captions-foreground-opacity-%s",label:"Opacity",options:[vo,Ao]},windowColor:{selector:".vjs-window-color > select",id:"captions-window-color-%s",label:"Color"},windowOpacity:{selector:".vjs-window-opacity > select",id:"captions-window-opacity-%s",label:"Opacity",options:[ec,Ao,vo]}};cn.windowColor.options=cn.backgroundColor.options;function tc(n,e){if(e&&(n=e(n)),n&&n!=="none")return n}function Bp(n,e){const t=n.options[n.options.selectedIndex].value;return tc(t,e)}function wp(n,e,t){if(e){for(let i=0;i<n.options.length;i++)if(tc(n.options[i].value,t)===e){n.selectedIndex=i;break}}}class Dp extends Vn{constructor(e,t){t.temporary=!1,super(e,t),this.updateDisplay=this.updateDisplay.bind(this),this.fill(),this.hasBeenOpened_=this.hasBeenFilled_=!0,this.endDialog=Me("p",{className:"vjs-control-text",textContent:this.localize("End of dialog window.")}),this.el().appendChild(this.endDialog),this.setDefaults(),t.persistTextTrackSettings===void 0&&(this.options_.persistTextTrackSettings=this.options_.playerOptions.persistTextTrackSettings),this.on(this.$(".vjs-done-button"),"click",()=>{this.saveSettings(),this.close()}),this.on(this.$(".vjs-default-button"),"click",()=>{this.setDefaults(),this.updateDisplay()}),kn(cn,i=>{this.on(this.$(i.selector),"change",this.updateDisplay)}),this.options_.persistTextTrackSettings&&this.restoreSettings()}dispose(){this.endDialog=null,super.dispose()}createElSelect_(e,t="",i="label"){const s=cn[e],r=s.id.replace("%s",this.id_),a=[t,r].join(" ").trim(),l=`vjs_select_${li()}`;return[`<${i} id="${r}"${i==="label"?` for="${l}" class="vjs-label"`:""}>`,this.localize(s.label),`</${i}>`,`<select aria-labelledby="${a}" id="${l}">`].concat(s.options.map(h=>{const p=r+"-"+h[1].replace(/\W+/g,"");return[`<option id="${p}" value="${h[0]}" `,`aria-labelledby="${a} ${p}">`,this.localize(h[1]),"</option>"].join("")})).concat("</select>").join("")}createElFgColor_(){const e=`captions-text-legend-${this.id_}`;return['<fieldset class="vjs-fg vjs-track-setting">',`<legend id="${e}">`,this.localize("Text"),"</legend>",'<span class="vjs-text-color">',this.createElSelect_("color",e),"</span>",'<span class="vjs-text-opacity vjs-opacity">',this.createElSelect_("textOpacity",e),"</span>","</fieldset>"].join("")}createElBgColor_(){const e=`captions-background-${this.id_}`;return['<fieldset class="vjs-bg vjs-track-setting">',`<legend id="${e}">`,this.localize("Text Background"),"</legend>",'<span class="vjs-bg-color">',this.createElSelect_("backgroundColor",e),"</span>",'<span class="vjs-bg-opacity vjs-opacity">',this.createElSelect_("backgroundOpacity",e),"</span>","</fieldset>"].join("")}createElWinColor_(){const e=`captions-window-${this.id_}`;return['<fieldset class="vjs-window vjs-track-setting">',`<legend id="${e}">`,this.localize("Caption Area Background"),"</legend>",'<span class="vjs-window-color">',this.createElSelect_("windowColor",e),"</span>",'<span class="vjs-window-opacity vjs-opacity">',this.createElSelect_("windowOpacity",e),"</span>","</fieldset>"].join("")}createElColors_(){return Me("div",{className:"vjs-track-settings-colors",innerHTML:[this.createElFgColor_(),this.createElBgColor_(),this.createElWinColor_()].join("")})}createElFont_(){return Me("div",{className:"vjs-track-settings-font",innerHTML:['<fieldset class="vjs-font-percent vjs-track-setting">',this.createElSelect_("fontPercent","","legend"),"</fieldset>",'<fieldset class="vjs-edge-style vjs-track-setting">',this.createElSelect_("edgeStyle","","legend"),"</fieldset>",'<fieldset class="vjs-font-family vjs-track-setting">',this.createElSelect_("fontFamily","","legend"),"</fieldset>"].join("")})}createElControls_(){const e=this.localize("restore all settings to the default values");return Me("div",{className:"vjs-track-settings-controls",innerHTML:[`<button type="button" class="vjs-default-button" title="${e}">`,this.localize("Reset"),`<span class="vjs-control-text"> ${e}</span>`,"</button>",`<button type="button" class="vjs-done-button">${this.localize("Done")}</button>`].join("")})}content(){return[this.createElColors_(),this.createElFont_(),this.createElControls_()]}label(){return this.localize("Caption Settings Dialog")}description(){return this.localize("Beginning of dialog window. Escape will cancel and close the window.")}buildCSSClass(){return super.buildCSSClass()+" vjs-text-track-settings"}getValues(){return jl(cn,(e,t,i)=>{const s=Bp(this.$(t.selector),t.parser);return s!==void 0&&(e[i]=s),e},{})}setValues(e){kn(cn,(t,i)=>{wp(this.$(t.selector),e[i],t.parser)})}setDefaults(){kn(cn,e=>{const t=e.hasOwnProperty("default")?e.default:0;this.$(e.selector).selectedIndex=t})}restoreSettings(){let e;try{e=JSON.parse(A().localStorage.getItem(go))}catch(t){Fe.warn(t)}e&&this.setValues(e)}saveSettings(){if(!this.options_.persistTextTrackSettings)return;const e=this.getValues();try{Object.keys(e).length?A().localStorage.setItem(go,JSON.stringify(e)):A().localStorage.removeItem(go)}catch(t){Fe.warn(t)}}updateDisplay(){const e=this.player_.getChild("textTrackDisplay");e&&e.updateDisplay()}conditionalBlur_(){this.previouslyActiveEl_=null;const e=this.player_.controlBar,t=e&&e.subsCapsButton,i=e&&e.captionsButton;t?t.focus():i&&i.focus()}handleLanguagechange(){this.fill()}}W.registerComponent("TextTrackSettings",Dp);class kp extends W{constructor(e,t){let i=t.ResizeObserver||A().ResizeObserver;t.ResizeObserver===null&&(i=!1);const s=tt({createEl:!i,reportTouchActivity:!1},t);super(e,s),this.ResizeObserver=t.ResizeObserver||A().ResizeObserver,this.loadListener_=null,this.resizeObserver_=null,this.debouncedHandler_=Jl(()=>{this.resizeHandler()},100,!1,this),i?(this.resizeObserver_=new this.ResizeObserver(this.debouncedHandler_),this.resizeObserver_.observe(e.el())):(this.loadListener_=()=>{if(!this.el_||!this.el_.contentWindow)return;const r=this.debouncedHandler_;let a=this.unloadListener_=function(){wt(this,"resize",r),wt(this,"unload",a),a=null};$t(this.el_.contentWindow,"unload",a),$t(this.el_.contentWindow,"resize",r)},this.one("load",this.loadListener_))}createEl(){return super.createEl("iframe",{className:"vjs-resize-manager",tabIndex:-1,title:this.localize("No content")},{"aria-hidden":"true"})}resizeHandler(){!this.player_||!this.player_.trigger||this.player_.trigger("playerresize")}dispose(){this.debouncedHandler_&&this.debouncedHandler_.cancel(),this.resizeObserver_&&(this.player_.el()&&this.resizeObserver_.unobserve(this.player_.el()),this.resizeObserver_.disconnect()),this.loadListener_&&this.off("load",this.loadListener_),this.el_&&this.el_.contentWindow&&this.unloadListener_&&this.unloadListener_.call(this.el_.contentWindow),this.ResizeObserver=null,this.resizeObserver=null,this.debouncedHandler_=null,this.loadListener_=null,super.dispose()}}W.registerComponent("ResizeManager",kp);const Ip={trackingThreshold:20,liveTolerance:15};class Pp extends W{constructor(e,t){const i=tt(Ip,t,{createEl:!1});super(e,i),this.trackLiveHandler_=()=>this.trackLive_(),this.handlePlay_=s=>this.handlePlay(s),this.handleFirstTimeupdate_=s=>this.handleFirstTimeupdate(s),this.handleSeeked_=s=>this.handleSeeked(s),this.seekToLiveEdge_=s=>this.seekToLiveEdge(s),this.reset_(),this.on(this.player_,"durationchange",s=>this.handleDurationchange(s)),this.on(this.player_,"canplay",()=>this.toggleTracking())}trackLive_(){const e=this.player_.seekable();if(!e||!e.length)return;const t=Number(A().performance.now().toFixed(4)),i=this.lastTime_===-1?0:(t-this.lastTime_)/1e3;this.lastTime_=t,this.pastSeekEnd_=this.pastSeekEnd()+i;const s=this.liveCurrentTime(),r=this.player_.currentTime();let a=this.player_.paused()||this.seekedBehindLive_||Math.abs(s-r)>this.options_.liveTolerance;(!this.timeupdateSeen_||s===1/0)&&(a=!1),a!==this.behindLiveEdge_&&(this.behindLiveEdge_=a,this.trigger("liveedgechange"))}handleDurationchange(){this.toggleTracking()}toggleTracking(){this.player_.duration()===1/0&&this.liveWindow()>=this.options_.trackingThreshold?(this.player_.options_.liveui&&this.player_.addClass("vjs-liveui"),this.startTracking()):(this.player_.removeClass("vjs-liveui"),this.stopTracking())}startTracking(){this.isTracking()||(this.timeupdateSeen_||(this.timeupdateSeen_=this.player_.hasStarted()),this.trackingInterval_=this.setInterval(this.trackLiveHandler_,ei),this.trackLive_(),this.on(this.player_,["play","pause"],this.trackLiveHandler_),this.timeupdateSeen_?this.on(this.player_,"seeked",this.handleSeeked_):(this.one(this.player_,"play",this.handlePlay_),this.one(this.player_,"timeupdate",this.handleFirstTimeupdate_)))}handleFirstTimeupdate(){this.timeupdateSeen_=!0,this.on(this.player_,"seeked",this.handleSeeked_)}handleSeeked(){const e=Math.abs(this.liveCurrentTime()-this.player_.currentTime());this.seekedBehindLive_=this.nextSeekedFromUser_&&e>2,this.nextSeekedFromUser_=!1,this.trackLive_()}handlePlay(){this.one(this.player_,"timeupdate",this.seekToLiveEdge_)}reset_(){this.lastTime_=-1,this.pastSeekEnd_=0,this.lastSeekEnd_=-1,this.behindLiveEdge_=!0,this.timeupdateSeen_=!1,this.seekedBehindLive_=!1,this.nextSeekedFromUser_=!1,this.clearInterval(this.trackingInterval_),this.trackingInterval_=null,this.off(this.player_,["play","pause"],this.trackLiveHandler_),this.off(this.player_,"seeked",this.handleSeeked_),this.off(this.player_,"play",this.handlePlay_),this.off(this.player_,"timeupdate",this.handleFirstTimeupdate_),this.off(this.player_,"timeupdate",this.seekToLiveEdge_)}nextSeekedFromUser(){this.nextSeekedFromUser_=!0}stopTracking(){this.isTracking()&&(this.reset_(),this.trigger("liveedgechange"))}seekableEnd(){const e=this.player_.seekable(),t=[];let i=e?e.length:0;for(;i--;)t.push(e.end(i));return t.length?t.sort()[t.length-1]:1/0}seekableStart(){const e=this.player_.seekable(),t=[];let i=e?e.length:0;for(;i--;)t.push(e.start(i));return t.length?t.sort()[0]:0}liveWindow(){const e=this.liveCurrentTime();return e===1/0?0:e-this.seekableStart()}isLive(){return this.isTracking()}atLiveEdge(){return!this.behindLiveEdge()}liveCurrentTime(){return this.pastSeekEnd()+this.seekableEnd()}pastSeekEnd(){const e=this.seekableEnd();return this.lastSeekEnd_!==-1&&e!==this.lastSeekEnd_&&(this.pastSeekEnd_=0),this.lastSeekEnd_=e,this.pastSeekEnd_}behindLiveEdge(){return this.behindLiveEdge_}isTracking(){return typeof this.trackingInterval_=="number"}seekToLiveEdge(){this.seekedBehindLive_=!1,!this.atLiveEdge()&&(this.nextSeekedFromUser_=!1,this.player_.currentTime(this.liveCurrentTime()))}dispose(){this.stopTracking(),super.dispose()}}W.registerComponent("LiveTracker",Pp);class Op extends W{constructor(e,t){super(e,t),this.on("statechanged",i=>this.updateDom_()),this.updateDom_()}createEl(){return this.els={title:Me("div",{className:"vjs-title-bar-title",id:`vjs-title-bar-title-${li()}`}),description:Me("div",{className:"vjs-title-bar-description",id:`vjs-title-bar-description-${li()}`})},Me("div",{className:"vjs-title-bar"},{},Bl(this.els))}updateDom_(){const e=this.player_.tech_,t=e&&e.el_,i={title:"aria-labelledby",description:"aria-describedby"};["title","description"].forEach(s=>{const r=this.state[s],a=this.els[s],l=i[s];fr(a),r&&Gi(a,r),t&&(t.removeAttribute(l),r&&t.setAttribute(l,a.id))}),this.state.title||this.state.description?this.show():this.hide()}update(e){this.setState(e)}dispose(){const e=this.player_.tech_,t=e&&e.el_;t&&(t.removeAttribute("aria-labelledby"),t.removeAttribute("aria-describedby")),super.dispose(),this.els=null}}W.registerComponent("TitleBar",Op);const yo=n=>{const e=n.el();if(e.hasAttribute("src"))return n.triggerSourceset(e.src),!0;const t=n.$$("source"),i=[];let s="";if(!t.length)return!1;for(let r=0;r<t.length;r++){const a=t[r].src;a&&i.indexOf(a)===-1&&i.push(a)}return i.length?(i.length===1&&(s=i[0]),n.triggerSourceset(s),!0):!1},Lp=Object.defineProperty({},"innerHTML",{get(){return this.cloneNode(!0).innerHTML},set(n){const e=O().createElement(this.nodeName.toLowerCase());e.innerHTML=n;const t=O().createDocumentFragment();for(;e.childNodes.length;)t.appendChild(e.childNodes[0]);return this.innerText="",A().Element.prototype.appendChild.call(this,t),this.innerHTML}}),ic=(n,e)=>{let t={};for(let i=0;i<n.length&&(t=Object.getOwnPropertyDescriptor(n[i],e),!(t&&t.set&&t.get));i++);return t.enumerable=!0,t.configurable=!0,t},Rp=n=>ic([n.el(),A().HTMLMediaElement.prototype,A().Element.prototype,Lp],"innerHTML"),nc=function(n){const e=n.el();if(e.resetSourceWatch_)return;const t={},i=Rp(n),s=r=>(...a)=>{const l=r.apply(e,a);return yo(n),l};["append","appendChild","insertAdjacentHTML"].forEach(r=>{e[r]&&(t[r]=e[r],e[r]=s(t[r]))}),Object.defineProperty(e,"innerHTML",tt(i,{set:s(i.set)})),e.resetSourceWatch_=()=>{e.resetSourceWatch_=null,Object.keys(t).forEach(r=>{e[r]=t[r]}),Object.defineProperty(e,"innerHTML",i)},n.one("sourceset",e.resetSourceWatch_)},Mp=Object.defineProperty({},"src",{get(){return this.hasAttribute("src")?du(A().Element.prototype.getAttribute.call(this,"src")):""},set(n){return A().Element.prototype.setAttribute.call(this,"src",n),n}}),Np=n=>ic([n.el(),A().HTMLMediaElement.prototype,Mp],"src"),Up=function(n){if(!n.featuresSourceset)return;const e=n.el();if(e.resetSourceset_)return;const t=Np(n),i=e.setAttribute,s=e.load;Object.defineProperty(e,"src",tt(t,{set:r=>{const a=t.set.call(e,r);return n.triggerSourceset(e.src),a}})),e.setAttribute=(r,a)=>{const l=i.call(e,r,a);return/src/i.test(r)&&n.triggerSourceset(e.src),l},e.load=()=>{const r=s.call(e);return yo(n)||(n.triggerSourceset(""),nc(n)),r},e.currentSrc?n.triggerSourceset(e.currentSrc):yo(n)||nc(n),e.resetSourceset_=()=>{e.resetSourceset_=null,e.load=s,e.setAttribute=i,Object.defineProperty(e,"src",t),e.resetSourceWatch_&&e.resetSourceWatch_()}};class ye extends Re{constructor(e,t){super(e,t);const i=e.source;let s=!1;if(this.featuresVideoFrameCallback=this.featuresVideoFrameCallback&&this.el_.tagName==="VIDEO",i&&(this.el_.currentSrc!==i.src||e.tag&&e.tag.initNetworkState_===3)?this.setSource(i):this.handleLateInit_(this.el_),e.enableSourceset&&this.setupSourcesetHandling_(),this.isScrubbing_=!1,this.el_.hasChildNodes()){const r=this.el_.childNodes;let a=r.length;const l=[];for(;a--;){const h=r[a];h.nodeName.toLowerCase()==="track"&&(this.featuresNativeTextTracks?(this.remoteTextTrackEls().addTrackElement_(h),this.remoteTextTracks().addTrack(h.track),this.textTracks().addTrack(h.track),!s&&!this.el_.hasAttribute("crossorigin")&&_r(h.src)&&(s=!0)):l.push(h))}for(let h=0;h<l.length;h++)this.el_.removeChild(l[h])}this.proxyNativeTracks_(),this.featuresNativeTextTracks&&s&&Fe.warn(`Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.
This may prevent text tracks from loading.`),this.restoreMetadataTracksInIOSNativePlayer_(),(fs||lr)&&e.nativeControlsForTouch===!0&&this.setControls(!0),this.proxyWebkitFullscreen_(),this.triggerReady()}dispose(){this.el_&&this.el_.resetSourceset_&&this.el_.resetSourceset_(),ye.disposeMediaElement(this.el_),this.options_=null,super.dispose()}setupSourcesetHandling_(){Up(this)}restoreMetadataTracksInIOSNativePlayer_(){const e=this.textTracks();let t;const i=()=>{t=[];for(let r=0;r<e.length;r++){const a=e[r];a.kind==="metadata"&&t.push({track:a,storedMode:a.mode})}};i(),e.addEventListener("change",i),this.on("dispose",()=>e.removeEventListener("change",i));const s=()=>{for(let r=0;r<t.length;r++){const a=t[r];a.track.mode==="disabled"&&a.track.mode!==a.storedMode&&(a.track.mode=a.storedMode)}e.removeEventListener("change",s)};this.on("webkitbeginfullscreen",()=>{e.removeEventListener("change",i),e.removeEventListener("change",s),e.addEventListener("change",s)}),this.on("webkitendfullscreen",()=>{e.removeEventListener("change",i),e.addEventListener("change",i),e.removeEventListener("change",s)})}overrideNative_(e,t){if(t!==this[`featuresNative${e}Tracks`])return;const i=e.toLowerCase();this[`${i}TracksListeners_`]&&Object.keys(this[`${i}TracksListeners_`]).forEach(s=>{this.el()[`${i}Tracks`].removeEventListener(s,this[`${i}TracksListeners_`][s])}),this[`featuresNative${e}Tracks`]=!t,this[`${i}TracksListeners_`]=null,this.proxyNativeTracksForType_(i)}overrideNativeAudioTracks(e){this.overrideNative_("Audio",e)}overrideNativeVideoTracks(e){this.overrideNative_("Video",e)}proxyNativeTracksForType_(e){const t=ii[e],i=this.el()[t.getterName],s=this[t.getterName]();if(!this[`featuresNative${t.capitalName}Tracks`]||!i||!i.addEventListener)return;const r={change:l=>{const h={type:"change",target:s,currentTarget:s,srcElement:s};s.trigger(h),e==="text"&&this[zn.remoteText.getterName]().trigger(h)},addtrack(l){s.addTrack(l.track)},removetrack(l){s.removeTrack(l.track)}},a=function(){const l=[];for(let h=0;h<s.length;h++){let p=!1;for(let g=0;g<i.length;g++)if(i[g]===s[h]){p=!0;break}p||l.push(s[h])}for(;l.length;)s.removeTrack(l.shift())};this[t.getterName+"Listeners_"]=r,Object.keys(r).forEach(l=>{const h=r[l];i.addEventListener(l,h),this.on("dispose",p=>i.removeEventListener(l,h))}),this.on("loadstart",a),this.on("dispose",l=>this.off("loadstart",a))}proxyNativeTracks_(){ii.names.forEach(e=>{this.proxyNativeTracksForType_(e)})}createEl(){let e=this.options_.tag;if(!e||!(this.options_.playerElIngest||this.movingMediaElementInDOM)){if(e){const i=e.cloneNode(!0);e.parentNode&&e.parentNode.insertBefore(i,e),ye.disposeMediaElement(e),e=i}else{e=O().createElement("video");const i=this.options_.tag&&$i(this.options_.tag),s=tt({},i);(!fs||this.options_.nativeControlsForTouch!==!0)&&delete s.controls,Nl(e,Object.assign(s,{id:this.options_.techId,class:"vjs-tech"}))}e.playerId=this.options_.playerId}typeof this.options_.preload!="undefined"&&Mn(e,"preload",this.options_.preload),this.options_.disablePictureInPicture!==void 0&&(e.disablePictureInPicture=this.options_.disablePictureInPicture);const t=["loop","muted","playsinline","autoplay"];for(let i=0;i<t.length;i++){const s=t[i],r=this.options_[s];typeof r!="undefined"&&(r?Mn(e,s,s):dr(e,s),e[s]=r)}return e}handleLateInit_(e){if(e.networkState===0||e.networkState===3)return;if(e.readyState===0){let i=!1;const s=function(){i=!0};this.on("loadstart",s);const r=function(){i||this.trigger("loadstart")};this.on("loadedmetadata",r),this.ready(function(){this.off("loadstart",s),this.off("loadedmetadata",r),i||this.trigger("loadstart")});return}const t=["loadstart"];t.push("loadedmetadata"),e.readyState>=2&&t.push("loadeddata"),e.readyState>=3&&t.push("canplay"),e.readyState>=4&&t.push("canplaythrough"),this.ready(function(){t.forEach(function(i){this.trigger(i)},this)})}setScrubbing(e){this.isScrubbing_=e}scrubbing(){return this.isScrubbing_}setCurrentTime(e){try{this.isScrubbing_&&this.el_.fastSeek&&ur?this.el_.fastSeek(e):this.el_.currentTime=e}catch(t){Fe(t,"Video is not ready. (Video.js)")}}duration(){if(this.el_.duration===1/0&&Ai&&yi&&this.el_.currentTime===0){const e=()=>{this.el_.currentTime>0&&(this.el_.duration===1/0&&this.trigger("durationchange"),this.off("timeupdate",e))};return this.on("timeupdate",e),NaN}return this.el_.duration||NaN}width(){return this.el_.offsetWidth}height(){return this.el_.offsetHeight}proxyWebkitFullscreen_(){if(!("webkitDisplayingFullscreen"in this.el_))return;const e=function(){this.trigger("fullscreenchange",{isFullscreen:!1}),this.el_.controls&&!this.options_.nativeControlsForTouch&&this.controls()&&(this.el_.controls=!1)},t=function(){"webkitPresentationMode"in this.el_&&this.el_.webkitPresentationMode!=="picture-in-picture"&&(this.one("webkitendfullscreen",e),this.trigger("fullscreenchange",{isFullscreen:!0,nativeIOSFullscreen:!0}))};this.on("webkitbeginfullscreen",t),this.on("dispose",()=>{this.off("webkitbeginfullscreen",t),this.off("webkitendfullscreen",e)})}supportsFullScreen(){return typeof this.el_.webkitEnterFullScreen=="function"}enterFullScreen(){const e=this.el_;if(e.paused&&e.networkState<=e.HAVE_METADATA)bi(this.el_.play()),this.setTimeout(function(){e.pause();try{e.webkitEnterFullScreen()}catch(t){this.trigger("fullscreenerror",t)}},0);else try{e.webkitEnterFullScreen()}catch(t){this.trigger("fullscreenerror",t)}}exitFullScreen(){if(!this.el_.webkitDisplayingFullscreen){this.trigger("fullscreenerror",new Error("The video is not fullscreen"));return}this.el_.webkitExitFullScreen()}requestPictureInPicture(){return this.el_.requestPictureInPicture()}requestVideoFrameCallback(e){return this.featuresVideoFrameCallback&&!this.el_.webkitKeys?this.el_.requestVideoFrameCallback(e):super.requestVideoFrameCallback(e)}cancelVideoFrameCallback(e){this.featuresVideoFrameCallback&&!this.el_.webkitKeys?this.el_.cancelVideoFrameCallback(e):super.cancelVideoFrameCallback(e)}src(e){if(e===void 0)return this.el_.src;this.setSrc(e)}reset(){ye.resetMediaElement(this.el_)}currentSrc(){return this.currentSource_?this.currentSource_.src:this.el_.currentSrc}setControls(e){this.el_.controls=!!e}addTextTrack(e,t,i){return this.featuresNativeTextTracks?this.el_.addTextTrack(e,t,i):super.addTextTrack(e,t,i)}createRemoteTextTrack(e){if(!this.featuresNativeTextTracks)return super.createRemoteTextTrack(e);const t=O().createElement("track");return e.kind&&(t.kind=e.kind),e.label&&(t.label=e.label),(e.language||e.srclang)&&(t.srclang=e.language||e.srclang),e.default&&(t.default=e.default),e.id&&(t.id=e.id),e.src&&(t.src=e.src),t}addRemoteTextTrack(e,t){const i=super.addRemoteTextTrack(e,t);return this.featuresNativeTextTracks&&this.el().appendChild(i),i}removeRemoteTextTrack(e){if(super.removeRemoteTextTrack(e),this.featuresNativeTextTracks){const t=this.$$("track");let i=t.length;for(;i--;)(e===t[i]||e===t[i].track)&&this.el().removeChild(t[i])}}getVideoPlaybackQuality(){if(typeof this.el().getVideoPlaybackQuality=="function")return this.el().getVideoPlaybackQuality();const e={};return typeof this.el().webkitDroppedFrameCount!="undefined"&&typeof this.el().webkitDecodedFrameCount!="undefined"&&(e.droppedVideoFrames=this.el().webkitDroppedFrameCount,e.totalVideoFrames=this.el().webkitDecodedFrameCount),A().performance&&(e.creationTime=A().performance.now()),e}}nr(ye,"TEST_VID",function(){if(!Ln())return;const n=O().createElement("video"),e=O().createElement("track");return e.kind="captions",e.srclang="en",e.label="English",n.appendChild(e),n}),ye.isSupported=function(){try{ye.TEST_VID.volume=.5}catch(n){return!1}return!!(ye.TEST_VID&&ye.TEST_VID.canPlayType)},ye.canPlayType=function(n){return ye.TEST_VID.canPlayType(n)},ye.canPlaySource=function(n,e){return ye.canPlayType(n.type)},ye.canControlVolume=function(){try{const n=ye.TEST_VID.volume;ye.TEST_VID.volume=n/2+.1;const e=n!==ye.TEST_VID.volume;return e&&Lt?(A().setTimeout(()=>{ye&&ye.prototype&&(ye.prototype.featuresVolumeControl=n!==ye.TEST_VID.volume)}),!1):e}catch(n){return!1}},ye.canMuteVolume=function(){try{const n=ye.TEST_VID.muted;return ye.TEST_VID.muted=!n,ye.TEST_VID.muted?Mn(ye.TEST_VID,"muted","muted"):dr(ye.TEST_VID,"muted","muted"),n!==ye.TEST_VID.muted}catch(n){return!1}},ye.canControlPlaybackRate=function(){if(Ai&&yi&&sr<58)return!1;try{const n=ye.TEST_VID.playbackRate;return ye.TEST_VID.playbackRate=n/2+.1,n!==ye.TEST_VID.playbackRate}catch(n){return!1}},ye.canOverrideAttributes=function(){try{const n=()=>{};Object.defineProperty(O().createElement("video"),"src",{get:n,set:n}),Object.defineProperty(O().createElement("audio"),"src",{get:n,set:n}),Object.defineProperty(O().createElement("video"),"innerHTML",{get:n,set:n}),Object.defineProperty(O().createElement("audio"),"innerHTML",{get:n,set:n})}catch(n){return!1}return!0},ye.supportsNativeTextTracks=function(){return ur||Lt&&yi},ye.supportsNativeVideoTracks=function(){return!!(ye.TEST_VID&&ye.TEST_VID.videoTracks)},ye.supportsNativeAudioTracks=function(){return!!(ye.TEST_VID&&ye.TEST_VID.audioTracks)},ye.Events=["loadstart","suspend","abort","error","emptied","stalled","loadedmetadata","loadeddata","canplay","canplaythrough","playing","waiting","seeking","seeked","ended","durationchange","timeupdate","progress","play","pause","ratechange","resize","volumechange"],[["featuresMuteControl","canMuteVolume"],["featuresPlaybackRate","canControlPlaybackRate"],["featuresSourceset","canOverrideAttributes"],["featuresNativeTextTracks","supportsNativeTextTracks"],["featuresNativeVideoTracks","supportsNativeVideoTracks"],["featuresNativeAudioTracks","supportsNativeAudioTracks"]].forEach(function([n,e]){nr(ye.prototype,n,()=>ye[e](),!0)}),ye.prototype.featuresVolumeControl=ye.canControlVolume(),ye.prototype.movingMediaElementInDOM=!Lt,ye.prototype.featuresFullscreenResize=!0,ye.prototype.featuresProgressEvents=!0,ye.prototype.featuresTimeupdateEvents=!0,ye.prototype.featuresVideoFrameCallback=!!(ye.TEST_VID&&ye.TEST_VID.requestVideoFrameCallback),ye.disposeMediaElement=function(n){if(n){for(n.parentNode&&n.parentNode.removeChild(n);n.hasChildNodes();)n.removeChild(n.firstChild);n.removeAttribute("src"),typeof n.load=="function"&&function(){try{n.load()}catch(e){}}()}},ye.resetMediaElement=function(n){if(!n)return;const e=n.querySelectorAll("source");let t=e.length;for(;t--;)n.removeChild(e[t]);n.removeAttribute("src"),typeof n.load=="function"&&function(){try{n.load()}catch(i){}}()},["muted","defaultMuted","autoplay","controls","loop","playsinline"].forEach(function(n){ye.prototype[n]=function(){return this.el_[n]||this.el_.hasAttribute(n)}}),["muted","defaultMuted","autoplay","loop","playsinline"].forEach(function(n){ye.prototype["set"+pt(n)]=function(e){this.el_[n]=e,e?this.el_.setAttribute(n,n):this.el_.removeAttribute(n)}}),["paused","currentTime","buffered","volume","poster","preload","error","seeking","seekable","ended","playbackRate","defaultPlaybackRate","disablePictureInPicture","played","networkState","readyState","videoWidth","videoHeight","crossOrigin"].forEach(function(n){ye.prototype[n]=function(){return this.el_[n]}}),["volume","src","poster","preload","playbackRate","defaultPlaybackRate","disablePictureInPicture","crossOrigin"].forEach(function(n){ye.prototype["set"+pt(n)]=function(e){this.el_[n]=e}}),["pause","load","play"].forEach(function(n){ye.prototype[n]=function(){return this.el_[n]()}}),Re.withSourceHandlers(ye),ye.nativeSourceHandler={},ye.nativeSourceHandler.canPlayType=function(n){try{return ye.TEST_VID.canPlayType(n)}catch(e){return""}},ye.nativeSourceHandler.canHandleSource=function(n,e){if(n.type)return ye.nativeSourceHandler.canPlayType(n.type);if(n.src){const t=Xa(n.src);return ye.nativeSourceHandler.canPlayType(`video/${t}`)}return""},ye.nativeSourceHandler.handleSource=function(n,e,t){e.setSrc(n.src)},ye.nativeSourceHandler.dispose=function(){},ye.registerSourceHandler(ye.nativeSourceHandler),Re.registerTech("Html5",ye);const sc=["progress","abort","suspend","emptied","stalled","loadedmetadata","loadeddata","timeupdate","resize","volumechange","texttrackchange"],_o={canplay:"CanPlay",canplaythrough:"CanPlayThrough",playing:"Playing",seeked:"Seeked"},bo=["tiny","xsmall","small","medium","large","xlarge","huge"],Sr={};bo.forEach(n=>{const e=n.charAt(0)==="x"?`x-${n.substring(1)}`:n;Sr[n]=`vjs-layout-${e}`});const Fp={tiny:210,xsmall:320,small:425,medium:768,large:1440,xlarge:2560,huge:1/0};class rt extends W{constructor(e,t,i){if(e.id=e.id||t.id||`vjs_video_${li()}`,t=Object.assign(rt.getTagSettings(e),t),t.initChildren=!1,t.createEl=!1,t.evented=!1,t.reportTouchActivity=!1,!t.language){const a=e.closest("[lang]");a&&(t.language=a.getAttribute("lang"))}if(super(null,t,i),this.boundDocumentFullscreenChange_=a=>this.documentFullscreenChange_(a),this.boundFullWindowOnEscKey_=a=>this.fullWindowOnEscKey(a),this.boundUpdateStyleEl_=a=>this.updateStyleEl_(a),this.boundApplyInitTime_=a=>this.applyInitTime_(a),this.boundUpdateCurrentBreakpoint_=a=>this.updateCurrentBreakpoint_(a),this.boundHandleTechClick_=a=>this.handleTechClick_(a),this.boundHandleTechDoubleClick_=a=>this.handleTechDoubleClick_(a),this.boundHandleTechTouchStart_=a=>this.handleTechTouchStart_(a),this.boundHandleTechTouchMove_=a=>this.handleTechTouchMove_(a),this.boundHandleTechTouchEnd_=a=>this.handleTechTouchEnd_(a),this.boundHandleTechTap_=a=>this.handleTechTap_(a),this.isFullscreen_=!1,this.log=xl(this.id_),this.fsApi_=tr,this.isPosterFromTech_=!1,this.queuedCallbacks_=[],this.isReady_=!1,this.hasStarted_=!1,this.userActive_=!1,this.debugEnabled_=!1,this.audioOnlyMode_=!1,this.audioPosterMode_=!1,this.audioOnlyCache_={playerHeight:null,hiddenChildren:[]},!this.options_||!this.options_.techOrder||!this.options_.techOrder.length)throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");if(this.tag=e,this.tagAttributes=e&&$i(e),this.language(this.options_.language),t.languages){const a={};Object.getOwnPropertyNames(t.languages).forEach(function(l){a[l.toLowerCase()]=t.languages[l]}),this.languages_=a}else this.languages_=rt.prototype.options_.languages;this.resetCache_(),this.poster_=t.poster||"",this.controls_=!!t.controls,e.controls=!1,e.removeAttribute("controls"),this.changingSrc_=!1,this.playCallbacks_=[],this.playTerminatedQueue_=[],e.hasAttribute("autoplay")?this.autoplay(!0):this.autoplay(this.options_.autoplay),t.plugins&&Object.keys(t.plugins).forEach(a=>{if(typeof this[a]!="function")throw new Error(`plugin "${a}" does not exist`)}),this.scrubbing_=!1,this.el_=this.createEl(),Ua(this,{eventBusKey:"el_"}),this.fsApi_.requestFullscreen&&($t(O(),this.fsApi_.fullscreenchange,this.boundDocumentFullscreenChange_),this.on(this.fsApi_.fullscreenchange,this.boundDocumentFullscreenChange_)),this.fluid_&&this.on(["playerreset","resize"],this.boundUpdateStyleEl_);const s=tt(this.options_);if(t.plugins&&Object.keys(t.plugins).forEach(a=>{this[a](t.plugins[a])}),t.debug&&this.debug(!0),this.options_.playerOptions=s,this.middleware_=[],this.playbackRates(t.playbackRates),t.experimentalSvgIcons){const l=new(A()).DOMParser().parseFromString(dp,"image/svg+xml");if(l.querySelector("parsererror"))Fe.warn("Failed to load SVG Icons. Falling back to Font Icons."),this.options_.experimentalSvgIcons=null;else{const p=l.documentElement;p.style.display="none",this.el_.appendChild(p),this.addClass("vjs-svg-icons-enabled")}}this.initChildren(),this.isAudio(e.nodeName.toLowerCase()==="audio"),this.controls()?this.addClass("vjs-controls-enabled"):this.addClass("vjs-controls-disabled"),this.el_.setAttribute("role","region"),this.isAudio()?this.el_.setAttribute("aria-label",this.localize("Audio Player")):this.el_.setAttribute("aria-label",this.localize("Video Player")),this.isAudio()&&this.addClass("vjs-audio"),fs&&this.addClass("vjs-touch-enabled"),Lt||this.addClass("vjs-workinghover"),rt.players[this.id_]=this;const r=Ta.split(".")[0];this.addClass(`vjs-v${r}`),this.userActive(!0),this.reportUserActivity(),this.one("play",a=>this.listenForUserActivity_(a)),this.on("keydown",a=>this.handleKeyDown(a)),this.on("languagechange",a=>this.handleLanguagechange(a)),this.breakpoints(this.options_.breakpoints),this.responsive(this.options_.responsive),this.on("ready",()=>{this.audioPosterMode(this.options_.audioPosterMode),this.audioOnlyMode(this.options_.audioOnlyMode)})}dispose(){this.trigger("dispose"),this.off("dispose"),wt(O(),this.fsApi_.fullscreenchange,this.boundDocumentFullscreenChange_),wt(O(),"keydown",this.boundFullWindowOnEscKey_),this.styleEl_&&this.styleEl_.parentNode&&(this.styleEl_.parentNode.removeChild(this.styleEl_),this.styleEl_=null),rt.players[this.id_]=null,this.tag&&this.tag.player&&(this.tag.player=null),this.el_&&this.el_.player&&(this.el_.player=null),this.tech_&&(this.tech_.dispose(),this.isPosterFromTech_=!1,this.poster_=""),this.playerElIngest_&&(this.playerElIngest_=null),this.tag&&(this.tag=null),op(this),Mt.names.forEach(e=>{const t=Mt[e],i=this[t.getterName]();i&&i.off&&i.off()}),super.dispose({restoreEl:this.options_.restoreEl})}createEl(){let e=this.tag,t,i=this.playerElIngest_=e.parentNode&&e.parentNode.hasAttribute&&e.parentNode.hasAttribute("data-vjs-player");const s=this.tag.tagName.toLowerCase()==="video-js";i?t=this.el_=e.parentNode:s||(t=this.el_=super.createEl("div"));const r=$i(e);if(s){for(t=this.el_=e,e=this.tag=O().createElement("video");t.children.length;)e.appendChild(t.firstChild);ps(t,"video-js")||rn(t,"video-js"),t.appendChild(e),i=this.playerElIngest_=t,Object.keys(t).forEach(h=>{try{e[h]=t[h]}catch(p){}})}e.setAttribute("tabindex","-1"),r.tabindex="-1",yi&&ar&&(e.setAttribute("role","application"),r.role="application"),e.removeAttribute("width"),e.removeAttribute("height"),"width"in r&&delete r.width,"height"in r&&delete r.height,Object.getOwnPropertyNames(r).forEach(function(h){s&&h==="class"||t.setAttribute(h,r[h]),s&&e.setAttribute(h,r[h])}),e.playerId=e.id,e.id+="_html5_api",e.className="vjs-tech",e.player=t.player=this,this.addClass("vjs-paused");const a=["IS_SMART_TV","IS_TIZEN","IS_WEBOS","IS_ANDROID","IS_IPAD","IS_IPHONE"].filter(h=>Pl[h]).map(h=>"vjs-device-"+h.substring(3).toLowerCase().replace(/\_/g,"-"));if(this.addClass(...a),A().VIDEOJS_NO_DYNAMIC_STYLE!==!0){this.styleEl_=Yl("vjs-styles-dimensions");const h=Xi(".vjs-styles-defaults"),p=Xi("head");p.insertBefore(this.styleEl_,h?h.nextSibling:p.firstChild)}this.fill_=!1,this.fluid_=!1,this.width(this.options_.width),this.height(this.options_.height),this.fill(this.options_.fill),this.fluid(this.options_.fluid),this.aspectRatio(this.options_.aspectRatio),this.crossOrigin(this.options_.crossOrigin||this.options_.crossorigin);const l=e.getElementsByTagName("a");for(let h=0;h<l.length;h++){const p=l.item(h);rn(p,"vjs-hidden"),p.setAttribute("hidden","hidden")}return e.initNetworkState_=e.networkState,e.parentNode&&!i&&e.parentNode.insertBefore(t,e),Da(e,t),this.children_.unshift(e),this.el_.setAttribute("lang",this.language_),this.el_.setAttribute("translate","no"),this.el_=t,t}crossOrigin(e){if(typeof e=="undefined")return this.techGet_("crossOrigin");if(e!==null&&e!=="anonymous"&&e!=="use-credentials"){Fe.warn(`crossOrigin must be null,  "anonymous" or "use-credentials", given "${e}"`);return}this.techCall_("setCrossOrigin",e),this.posterImage&&this.posterImage.crossOrigin(e)}width(e){return this.dimension("width",e)}height(e){return this.dimension("height",e)}dimension(e,t){const i=e+"_";if(t===void 0)return this[i]||0;if(t===""||t==="auto"){this[i]=void 0,this.updateStyleEl_();return}const s=parseFloat(t);if(isNaN(s)){Fe.error(`Improper value "${t}" supplied for for ${e}`);return}this[i]=s,this.updateStyleEl_()}fluid(e){if(e===void 0)return!!this.fluid_;this.fluid_=!!e,Oi(this)&&this.off(["playerreset","resize"],this.boundUpdateStyleEl_),e?(this.addClass("vjs-fluid"),this.fill(!1),Uf(this,()=>{this.on(["playerreset","resize"],this.boundUpdateStyleEl_)})):this.removeClass("vjs-fluid"),this.updateStyleEl_()}fill(e){if(e===void 0)return!!this.fill_;this.fill_=!!e,e?(this.addClass("vjs-fill"),this.fluid(!1)):this.removeClass("vjs-fill")}aspectRatio(e){if(e===void 0)return this.aspectRatio_;if(!/^\d+\:\d+$/.test(e))throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");this.aspectRatio_=e,this.fluid(!0),this.updateStyleEl_()}updateStyleEl_(){if(A().VIDEOJS_NO_DYNAMIC_STYLE===!0){const l=typeof this.width_=="number"?this.width_:this.options_.width,h=typeof this.height_=="number"?this.height_:this.options_.height,p=this.tech_&&this.tech_.el();p&&(l>=0&&(p.width=l),h>=0&&(p.height=h));return}let e,t,i,s;this.aspectRatio_!==void 0&&this.aspectRatio_!=="auto"?i=this.aspectRatio_:this.videoWidth()>0?i=this.videoWidth()+":"+this.videoHeight():i="16:9";const r=i.split(":"),a=r[1]/r[0];this.width_!==void 0?e=this.width_:this.height_!==void 0?e=this.height_/a:e=this.videoWidth()||300,this.height_!==void 0?t=this.height_:t=e*a,/^[^a-zA-Z]/.test(this.id())?s="dimensions-"+this.id():s=this.id()+"-dimensions",this.addClass(s),Kl(this.styleEl_,`
      .${s} {
        width: ${e}px;
        height: ${t}px;
      }

      .${s}.vjs-fluid:not(.vjs-audio-only-mode) {
        padding-top: ${a*100}%;
      }
    `)}loadTech_(e,t){this.tech_&&this.unloadTech_();const i=pt(e),s=e.charAt(0).toLowerCase()+e.slice(1);i!=="Html5"&&this.tag&&(Re.getTech("Html5").disposeMediaElement(this.tag),this.tag.player=null,this.tag=null),this.techName_=i,this.isReady_=!1;let r=this.autoplay();(typeof this.autoplay()=="string"||this.autoplay()===!0&&this.options_.normalizeAutoplay)&&(r=!1);const a={source:t,autoplay:r,nativeControlsForTouch:this.options_.nativeControlsForTouch,playerId:this.id(),techId:`${this.id()}_${s}_api`,playsinline:this.options_.playsinline,preload:this.options_.preload,loop:this.options_.loop,disablePictureInPicture:this.options_.disablePictureInPicture,muted:this.options_.muted,poster:this.poster(),language:this.language(),playerElIngest:this.playerElIngest_||!1,"vtt.js":this.options_["vtt.js"],canOverridePoster:!!this.options_.techCanOverridePoster,enableSourceset:this.options_.enableSourceset};Mt.names.forEach(h=>{const p=Mt[h];a[p.getterName]=this[p.privateName]}),Object.assign(a,this.options_[i]),Object.assign(a,this.options_[s]),Object.assign(a,this.options_[e.toLowerCase()]),this.tag&&(a.tag=this.tag),t&&t.src===this.cache_.src&&this.cache_.currentTime>0&&(a.startTime=this.cache_.currentTime);const l=Re.getTech(e);if(!l)throw new Error(`No Tech named '${i}' exists! '${i}' should be registered using videojs.registerTech()'`);this.tech_=new l(a),this.tech_.ready(it(this,this.handleTechReady_),!0),lu.jsonToTextTracks(this.textTracksJson_||[],this.tech_),sc.forEach(h=>{this.on(this.tech_,h,p=>this[`handleTech${pt(h)}_`](p))}),Object.keys(_o).forEach(h=>{this.on(this.tech_,h,p=>{if(this.tech_.playbackRate()===0&&this.tech_.seeking()){this.queuedCallbacks_.push({callback:this[`handleTech${_o[h]}_`].bind(this),event:p});return}this[`handleTech${_o[h]}_`](p)})}),this.on(this.tech_,"loadstart",h=>this.handleTechLoadStart_(h)),this.on(this.tech_,"sourceset",h=>this.handleTechSourceset_(h)),this.on(this.tech_,"waiting",h=>this.handleTechWaiting_(h)),this.on(this.tech_,"ended",h=>this.handleTechEnded_(h)),this.on(this.tech_,"seeking",h=>this.handleTechSeeking_(h)),this.on(this.tech_,"play",h=>this.handleTechPlay_(h)),this.on(this.tech_,"pause",h=>this.handleTechPause_(h)),this.on(this.tech_,"durationchange",h=>this.handleTechDurationChange_(h)),this.on(this.tech_,"fullscreenchange",(h,p)=>this.handleTechFullscreenChange_(h,p)),this.on(this.tech_,"fullscreenerror",(h,p)=>this.handleTechFullscreenError_(h,p)),this.on(this.tech_,"enterpictureinpicture",h=>this.handleTechEnterPictureInPicture_(h)),this.on(this.tech_,"leavepictureinpicture",h=>this.handleTechLeavePictureInPicture_(h)),this.on(this.tech_,"error",h=>this.handleTechError_(h)),this.on(this.tech_,"posterchange",h=>this.handleTechPosterChange_(h)),this.on(this.tech_,"textdata",h=>this.handleTechTextData_(h)),this.on(this.tech_,"ratechange",h=>this.handleTechRateChange_(h)),this.on(this.tech_,"loadedmetadata",this.boundUpdateStyleEl_),this.usingNativeControls(this.techGet_("controls")),this.controls()&&!this.usingNativeControls()&&this.addTechControlsListeners_(),this.tech_.el().parentNode!==this.el()&&(i!=="Html5"||!this.tag)&&Da(this.tech_.el(),this.el()),this.tag&&(this.tag.player=null,this.tag=null)}unloadTech_(){Mt.names.forEach(e=>{const t=Mt[e];this[t.privateName]=this[t.getterName]()}),this.textTracksJson_=lu.textTracksToJson(this.tech_),this.isReady_=!1,this.tech_.dispose(),this.tech_=!1,this.isPosterFromTech_&&(this.poster_="",this.trigger("posterchange")),this.isPosterFromTech_=!1}tech(e){return e===void 0&&Fe.warn(`Using the tech directly can be dangerous. I hope you know what you're doing.
See https://github.com/videojs/video.js/issues/2617 for more info.
`),this.tech_}version(){return{"video.js":Ta}}addTechControlsListeners_(){this.removeTechControlsListeners_(),this.on(this.tech_,"click",this.boundHandleTechClick_),this.on(this.tech_,"dblclick",this.boundHandleTechDoubleClick_),this.on(this.tech_,"touchstart",this.boundHandleTechTouchStart_),this.on(this.tech_,"touchmove",this.boundHandleTechTouchMove_),this.on(this.tech_,"touchend",this.boundHandleTechTouchEnd_),this.on(this.tech_,"tap",this.boundHandleTechTap_)}removeTechControlsListeners_(){this.off(this.tech_,"tap",this.boundHandleTechTap_),this.off(this.tech_,"touchstart",this.boundHandleTechTouchStart_),this.off(this.tech_,"touchmove",this.boundHandleTechTouchMove_),this.off(this.tech_,"touchend",this.boundHandleTechTouchEnd_),this.off(this.tech_,"click",this.boundHandleTechClick_),this.off(this.tech_,"dblclick",this.boundHandleTechDoubleClick_)}handleTechReady_(){this.triggerReady(),this.cache_.volume&&this.techCall_("setVolume",this.cache_.volume),this.handleTechPosterChange_(),this.handleTechDurationChange_()}handleTechLoadStart_(){this.removeClass("vjs-ended","vjs-seeking"),this.error(null),this.handleTechDurationChange_(),this.paused()?(this.hasStarted(!1),this.trigger("loadstart")):this.trigger("loadstart"),this.manualAutoplay_(this.autoplay()===!0&&this.options_.normalizeAutoplay?"play":this.autoplay())}manualAutoplay_(e){if(!this.tech_||typeof e!="string")return;const t=()=>{const s=this.muted();this.muted(!0);const r=()=>{this.muted(s)};this.playTerminatedQueue_.push(r);const a=this.play();if(ys(a))return a.catch(l=>{throw r(),new Error(`Rejection at manualAutoplay. Restoring muted value. ${l||""}`)})};let i;if(e==="any"&&!this.muted()?(i=this.play(),ys(i)&&(i=i.catch(t))):e==="muted"&&!this.muted()?i=t():i=this.play(),!!ys(i))return i.then(()=>{this.trigger({type:"autoplay-success",autoplay:e})}).catch(()=>{this.trigger({type:"autoplay-failure",autoplay:e})})}updateSourceCaches_(e=""){let t=e,i="";typeof t!="string"&&(t=e.src,i=e.type),this.cache_.source=this.cache_.source||{},this.cache_.sources=this.cache_.sources||[],t&&!i&&(i=cp(this,t)),this.cache_.source=tt({},e,{src:t,type:i});const s=this.cache_.sources.filter(h=>h.src&&h.src===t),r=[],a=this.$$("source"),l=[];for(let h=0;h<a.length;h++){const p=$i(a[h]);r.push(p),p.src&&p.src===t&&l.push(p.src)}l.length&&!s.length?this.cache_.sources=r:s.length||(this.cache_.sources=[this.cache_.source]),this.cache_.src=t}handleTechSourceset_(e){if(!this.changingSrc_){let t=r=>this.updateSourceCaches_(r);const i=this.currentSource().src,s=e.src;i&&!/^blob:/.test(i)&&/^blob:/.test(s)&&(!this.lastSource_||this.lastSource_.tech!==s&&this.lastSource_.player!==i)&&(t=()=>{}),t(s),e.src||this.tech_.any(["sourceset","loadstart"],r=>{if(r.type==="sourceset")return;const a=this.techGet_("currentSrc");this.lastSource_.tech=a,this.updateSourceCaches_(a)})}this.lastSource_={player:this.currentSource().src,tech:e.src},this.trigger({src:e.src,type:"sourceset"})}hasStarted(e){if(e===void 0)return this.hasStarted_;e!==this.hasStarted_&&(this.hasStarted_=e,this.hasStarted_?this.addClass("vjs-has-started"):this.removeClass("vjs-has-started"))}handleTechPlay_(){this.removeClass("vjs-ended","vjs-paused"),this.addClass("vjs-playing"),this.hasStarted(!0),this.trigger("play")}handleTechRateChange_(){this.tech_.playbackRate()>0&&this.cache_.lastPlaybackRate===0&&(this.queuedCallbacks_.forEach(e=>e.callback(e.event)),this.queuedCallbacks_=[]),this.cache_.lastPlaybackRate=this.tech_.playbackRate(),this.trigger("ratechange")}handleTechWaiting_(){this.addClass("vjs-waiting"),this.trigger("waiting");const e=this.currentTime(),t=()=>{e!==this.currentTime()&&(this.removeClass("vjs-waiting"),this.off("timeupdate",t))};this.on("timeupdate",t)}handleTechCanPlay_(){this.removeClass("vjs-waiting"),this.trigger("canplay")}handleTechCanPlayThrough_(){this.removeClass("vjs-waiting"),this.trigger("canplaythrough")}handleTechPlaying_(){this.removeClass("vjs-waiting"),this.trigger("playing")}handleTechSeeking_(){this.addClass("vjs-seeking"),this.trigger("seeking")}handleTechSeeked_(){this.removeClass("vjs-seeking","vjs-ended"),this.trigger("seeked")}handleTechPause_(){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.trigger("pause")}handleTechEnded_(){this.addClass("vjs-ended"),this.removeClass("vjs-waiting"),this.options_.loop?(this.currentTime(0),this.play()):this.paused()||this.pause(),this.trigger("ended")}handleTechDurationChange_(){this.duration(this.techGet_("duration"))}handleTechClick_(e){this.controls_&&(this.options_===void 0||this.options_.userActions===void 0||this.options_.userActions.click===void 0||this.options_.userActions.click!==!1)&&(this.options_!==void 0&&this.options_.userActions!==void 0&&typeof this.options_.userActions.click=="function"?this.options_.userActions.click.call(this,e):this.paused()?bi(this.play()):this.pause())}handleTechDoubleClick_(e){if(!this.controls_)return;Array.prototype.some.call(this.$$(".vjs-control-bar, .vjs-modal-dialog"),i=>i.contains(e.target))||(this.options_===void 0||this.options_.userActions===void 0||this.options_.userActions.doubleClick===void 0||this.options_.userActions.doubleClick!==!1)&&(this.options_!==void 0&&this.options_.userActions!==void 0&&typeof this.options_.userActions.doubleClick=="function"?this.options_.userActions.doubleClick.call(this,e):this.isFullscreen()?this.exitFullscreen():this.requestFullscreen())}handleTechTap_(){this.userActive(!this.userActive())}handleTechTouchStart_(){this.userWasActive=this.userActive()}handleTechTouchMove_(){this.userWasActive&&this.reportUserActivity()}handleTechTouchEnd_(e){e.cancelable&&e.preventDefault()}toggleFullscreenClass_(){this.isFullscreen()?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen")}documentFullscreenChange_(e){const t=e.target.player;if(t&&t!==this)return;const i=this.el();let s=O()[this.fsApi_.fullscreenElement]===i;!s&&i.matches&&(s=i.matches(":"+this.fsApi_.fullscreen)),this.isFullscreen(s)}handleTechFullscreenChange_(e,t){t&&(t.nativeIOSFullscreen&&(this.addClass("vjs-ios-native-fs"),this.tech_.one("webkitendfullscreen",()=>{this.removeClass("vjs-ios-native-fs")})),this.isFullscreen(t.isFullscreen))}handleTechFullscreenError_(e,t){this.trigger("fullscreenerror",t)}togglePictureInPictureClass_(){this.isInPictureInPicture()?this.addClass("vjs-picture-in-picture"):this.removeClass("vjs-picture-in-picture")}handleTechEnterPictureInPicture_(e){this.isInPictureInPicture(!0)}handleTechLeavePictureInPicture_(e){this.isInPictureInPicture(!1)}handleTechError_(){const e=this.tech_.error();e&&this.error(e)}handleTechTextData_(){let e=null;arguments.length>1&&(e=arguments[1]),this.trigger("textdata",e)}getCache(){return this.cache_}resetCache_(){this.cache_={currentTime:0,initTime:0,inactivityTimeout:this.options_.inactivityTimeout,duration:NaN,lastVolume:1,lastPlaybackRate:this.defaultPlaybackRate(),media:null,src:"",source:{},sources:[],playbackRates:[],volume:1}}techCall_(e,t){this.ready(function(){if(e in rp)return np(this.middleware_,this.tech_,e,t);if(e in vu)return gu(this.middleware_,this.tech_,e,t);try{this.tech_&&this.tech_[e](t)}catch(i){throw Fe(i),i}},!0)}techGet_(e){if(!(!this.tech_||!this.tech_.isReady_)){if(e in sp)return ip(this.middleware_,this.tech_,e);if(e in vu)return gu(this.middleware_,this.tech_,e);try{return this.tech_[e]()}catch(t){throw this.tech_[e]===void 0?(Fe(`Video.js: ${e} method not defined for ${this.techName_} playback technology.`,t),t):t.name==="TypeError"?(Fe(`Video.js: ${e} unavailable on ${this.techName_} playback technology element.`,t),this.tech_.isReady_=!1,t):(Fe(t),t)}}}play(){return new Promise(e=>{this.play_(e)})}play_(e=bi){this.playCallbacks_.push(e);const t=!!(!this.changingSrc_&&(this.src()||this.currentSrc())),i=!!(ur||Lt);if(this.waitToPlay_&&(this.off(["ready","loadstart"],this.waitToPlay_),this.waitToPlay_=null),!this.isReady_||!t){this.waitToPlay_=a=>{this.play_()},this.one(["ready","loadstart"],this.waitToPlay_),!t&&i&&this.load();return}const s=this.techGet_("play");i&&this.hasClass("vjs-ended")&&this.resetProgressBar_(),s===null?this.runPlayTerminatedQueue_():this.runPlayCallbacks_(s)}runPlayTerminatedQueue_(){const e=this.playTerminatedQueue_.slice(0);this.playTerminatedQueue_=[],e.forEach(function(t){t()})}runPlayCallbacks_(e){const t=this.playCallbacks_.slice(0);this.playCallbacks_=[],this.playTerminatedQueue_=[],t.forEach(function(i){i(e)})}pause(){this.techCall_("pause")}paused(){return this.techGet_("paused")!==!1}played(){return this.techGet_("played")||ui(0,0)}scrubbing(e){if(typeof e=="undefined")return this.scrubbing_;this.scrubbing_=!!e,this.techCall_("setScrubbing",this.scrubbing_),e?this.addClass("vjs-scrubbing"):this.removeClass("vjs-scrubbing")}currentTime(e){if(e===void 0)return this.cache_.currentTime=this.techGet_("currentTime")||0,this.cache_.currentTime;if(e<0&&(e=0),!this.isReady_||this.changingSrc_||!this.tech_||!this.tech_.isReady_){this.cache_.initTime=e,this.off("canplay",this.boundApplyInitTime_),this.one("canplay",this.boundApplyInitTime_);return}this.techCall_("setCurrentTime",e),this.cache_.initTime=0,isFinite(e)&&(this.cache_.currentTime=Number(e))}applyInitTime_(){this.currentTime(this.cache_.initTime)}duration(e){if(e===void 0)return this.cache_.duration!==void 0?this.cache_.duration:NaN;e=parseFloat(e),e<0&&(e=1/0),e!==this.cache_.duration&&(this.cache_.duration=e,e===1/0?this.addClass("vjs-live"):this.removeClass("vjs-live"),isNaN(e)||this.trigger("durationchange"))}remainingTime(){return this.duration()-this.currentTime()}remainingTimeDisplay(){return Math.floor(this.duration())-Math.floor(this.currentTime())}buffered(){let e=this.techGet_("buffered");return(!e||!e.length)&&(e=ui(0,0)),e}seekable(){let e=this.techGet_("seekable");return(!e||!e.length)&&(e=ui(0,0)),e}seeking(){return this.techGet_("seeking")}ended(){return this.techGet_("ended")}networkState(){return this.techGet_("networkState")}readyState(){return this.techGet_("readyState")}bufferedPercent(){return ou(this.buffered(),this.duration())}bufferedEnd(){const e=this.buffered(),t=this.duration();let i=e.end(e.length-1);return i>t&&(i=t),i}volume(e){let t;if(e!==void 0){t=Math.max(0,Math.min(1,e)),this.cache_.volume=t,this.techCall_("setVolume",t),t>0&&this.lastVolume_(t);return}return t=parseFloat(this.techGet_("volume")),isNaN(t)?1:t}muted(e){if(e!==void 0){this.techCall_("setMuted",e);return}return this.techGet_("muted")||!1}defaultMuted(e){return e!==void 0&&this.techCall_("setDefaultMuted",e),this.techGet_("defaultMuted")||!1}lastVolume_(e){if(e!==void 0&&e!==0){this.cache_.lastVolume=e;return}return this.cache_.lastVolume}supportsFullScreen(){return this.techGet_("supportsFullScreen")||!1}isFullscreen(e){if(e!==void 0){const t=this.isFullscreen_;this.isFullscreen_=!!e,this.isFullscreen_!==t&&this.fsApi_.prefixed&&this.trigger("fullscreenchange"),this.toggleFullscreenClass_();return}return this.isFullscreen_}requestFullscreen(e){this.isInPictureInPicture()&&this.exitPictureInPicture();const t=this;return new Promise((i,s)=>{function r(){t.off("fullscreenerror",l),t.off("fullscreenchange",a)}function a(){r(),i()}function l(p,g){r(),s(g)}t.one("fullscreenchange",a),t.one("fullscreenerror",l);const h=t.requestFullscreenHelper_(e);h&&(h.then(r,r),h.then(i,s))})}requestFullscreenHelper_(e){let t;if(this.fsApi_.prefixed||(t=this.options_.fullscreen&&this.options_.fullscreen.options||{},e!==void 0&&(t=e)),this.fsApi_.requestFullscreen){const i=this.el_[this.fsApi_.requestFullscreen](t);return i&&i.then(()=>this.isFullscreen(!0),()=>this.isFullscreen(!1)),i}else this.tech_.supportsFullScreen()&&!this.options_.preferFullWindow?this.techCall_("enterFullScreen"):this.enterFullWindow()}exitFullscreen(){const e=this;return new Promise((t,i)=>{function s(){e.off("fullscreenerror",a),e.off("fullscreenchange",r)}function r(){s(),t()}function a(h,p){s(),i(p)}e.one("fullscreenchange",r),e.one("fullscreenerror",a);const l=e.exitFullscreenHelper_();l&&(l.then(s,s),l.then(t,i))})}exitFullscreenHelper_(){if(this.fsApi_.requestFullscreen){const e=O()[this.fsApi_.exitFullscreen]();return e&&bi(e.then(()=>this.isFullscreen(!1))),e}else this.tech_.supportsFullScreen()&&!this.options_.preferFullWindow?this.techCall_("exitFullScreen"):this.exitFullWindow()}enterFullWindow(){this.isFullscreen(!0),this.isFullWindow=!0,this.docOrigOverflow=O().documentElement.style.overflow,$t(O(),"keydown",this.boundFullWindowOnEscKey_),O().documentElement.style.overflow="hidden",rn(O().body,"vjs-full-window"),this.trigger("enterFullWindow")}fullWindowOnEscKey(e){U().isEventKey(e,"Esc")&&this.isFullscreen()===!0&&(this.isFullWindow?this.exitFullWindow():this.exitFullscreen())}exitFullWindow(){this.isFullscreen(!1),this.isFullWindow=!1,wt(O(),"keydown",this.boundFullWindowOnEscKey_),O().documentElement.style.overflow=this.docOrigOverflow,cr(O().body,"vjs-full-window"),this.trigger("exitFullWindow")}disablePictureInPicture(e){if(e===void 0)return this.techGet_("disablePictureInPicture");this.techCall_("setDisablePictureInPicture",e),this.options_.disablePictureInPicture=e,this.trigger("disablepictureinpicturechanged")}isInPictureInPicture(e){if(e!==void 0){this.isInPictureInPicture_=!!e,this.togglePictureInPictureClass_();return}return!!this.isInPictureInPicture_}requestPictureInPicture(){if(this.options_.enableDocumentPictureInPicture&&A().documentPictureInPicture){const e=O().createElement(this.el().tagName);return e.classList=this.el().classList,e.classList.add("vjs-pip-container"),this.posterImage&&e.appendChild(this.posterImage.el().cloneNode(!0)),this.titleBar&&e.appendChild(this.titleBar.el().cloneNode(!0)),e.appendChild(Me("p",{className:"vjs-pip-text"},{},this.localize("Playing in picture-in-picture"))),A().documentPictureInPicture.requestWindow({width:this.videoWidth(),height:this.videoHeight()}).then(t=>(Gl(t),this.el_.parentNode.insertBefore(e,this.el_),t.document.body.appendChild(this.el_),t.document.body.classList.add("vjs-pip-window"),this.player_.isInPictureInPicture(!0),this.player_.trigger({type:"enterpictureinpicture",pipWindow:t}),t.addEventListener("pagehide",i=>{const s=i.target.querySelector(".video-js");e.parentNode.replaceChild(s,e),this.player_.isInPictureInPicture(!1),this.player_.trigger("leavepictureinpicture")}),t))}return"pictureInPictureEnabled"in O()&&this.disablePictureInPicture()===!1?this.techGet_("requestPictureInPicture"):Promise.reject("No PiP mode is available")}exitPictureInPicture(){if(A().documentPictureInPicture&&A().documentPictureInPicture.window)return A().documentPictureInPicture.window.close(),Promise.resolve();if("pictureInPictureEnabled"in O())return O().exitPictureInPicture()}handleKeyDown(e){const{userActions:t}=this.options_;!t||!t.hotkeys||(s=>{const r=s.tagName.toLowerCase();if(s.isContentEditable)return!0;const a=["button","checkbox","hidden","radio","reset","submit"];return r==="input"?a.indexOf(s.type)===-1:["textarea"].indexOf(r)!==-1})(this.el_.ownerDocument.activeElement)||(typeof t.hotkeys=="function"?t.hotkeys.call(this,e):this.handleHotkeys(e))}handleHotkeys(e){const t=this.options_.userActions?this.options_.userActions.hotkeys:{},{fullscreenKey:i=a=>U().isEventKey(a,"f"),muteKey:s=a=>U().isEventKey(a,"m"),playPauseKey:r=a=>U().isEventKey(a,"k")||U().isEventKey(a,"Space")}=t;if(i.call(this,e)){e.preventDefault(),e.stopPropagation();const a=W.getComponent("FullscreenToggle");O()[this.fsApi_.fullscreenEnabled]!==!1&&a.prototype.handleClick.call(this,e)}else s.call(this,e)?(e.preventDefault(),e.stopPropagation(),W.getComponent("MuteToggle").prototype.handleClick.call(this,e)):r.call(this,e)&&(e.preventDefault(),e.stopPropagation(),W.getComponent("PlayToggle").prototype.handleClick.call(this,e))}canPlayType(e){let t;for(let i=0,s=this.options_.techOrder;i<s.length;i++){const r=s[i];let a=Re.getTech(r);if(a||(a=W.getComponent(r)),!a){Fe.error(`The "${r}" tech is undefined. Skipped browser support check for that tech.`);continue}if(a.isSupported()&&(t=a.canPlayType(e),t))return t}return""}selectSource(e){const t=this.options_.techOrder.map(l=>[l,Re.getTech(l)]).filter(([l,h])=>h?h.isSupported():(Fe.error(`The "${l}" tech is undefined. Skipped browser support check for that tech.`),!1)),i=function(l,h,p){let g;return l.some(_=>h.some(w=>{if(g=p(_,w),g)return!0})),g};let s;const r=l=>(h,p)=>l(p,h),a=([l,h],p)=>{if(h.canPlaySource(p,this.options_[l.toLowerCase()]))return{source:p,tech:l}};return this.options_.sourceOrder?s=i(e,t,r(a)):s=i(t,e,a),s||!1}handleSrc_(e,t){if(typeof e=="undefined")return this.cache_.src||"";this.resetRetryOnError_&&this.resetRetryOnError_();const i=Au(e);if(!i.length){this.setTimeout(function(){this.error({code:4,message:this.options_.notSupportedMessage})},0);return}if(this.changingSrc_=!0,t||(this.cache_.sources=i),this.updateSourceCaches_(i[0]),ep(this,i[0],(s,r)=>{if(this.middleware_=r,t||(this.cache_.sources=i),this.updateSourceCaches_(s),this.src_(s)){if(i.length>1)return this.handleSrc_(i.slice(1));this.changingSrc_=!1,this.setTimeout(function(){this.error({code:4,message:this.options_.notSupportedMessage})},0),this.triggerReady();return}tp(r,this.tech_)}),i.length>1){const s=()=>{this.error(null),this.handleSrc_(i.slice(1),!0)},r=()=>{this.off("error",s)};this.one("error",s),this.one("playing",r),this.resetRetryOnError_=()=>{this.off("error",s),this.off("playing",r)}}}src(e){return this.handleSrc_(e,!1)}src_(e){const t=this.selectSource([e]);return t?iu(t.tech,this.techName_)?(this.ready(function(){this.tech_.constructor.prototype.hasOwnProperty("setSource")?this.techCall_("setSource",e):this.techCall_("src",e.src),this.changingSrc_=!1},!0),!1):(this.changingSrc_=!0,this.loadTech_(t.tech,t.source),this.tech_.ready(()=>{this.changingSrc_=!1}),!1):!0}load(){if(this.tech_&&this.tech_.vhs){this.src(this.currentSource());return}this.techCall_("load")}reset(){if(this.paused())this.doReset_();else{const e=this.play();bi(e.then(()=>this.doReset_()))}}doReset_(){this.tech_&&this.tech_.clearTracks("text"),this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.resetCache_(),this.poster(""),this.loadTech_(this.options_.techOrder[0],null),this.techCall_("reset"),this.resetControlBarUI_(),this.error(null),this.titleBar&&this.titleBar.update({title:void 0,description:void 0}),Oi(this)&&this.trigger("playerreset")}resetControlBarUI_(){this.resetProgressBar_(),this.resetPlaybackRate_(),this.resetVolumeBar_()}resetProgressBar_(){this.currentTime(0);const{currentTimeDisplay:e,durationDisplay:t,progressControl:i,remainingTimeDisplay:s}=this.controlBar||{},{seekBar:r}=i||{};e&&e.updateContent(),t&&t.updateContent(),s&&s.updateContent(),r&&(r.update(),r.loadProgressBar&&r.loadProgressBar.update())}resetPlaybackRate_(){this.playbackRate(this.defaultPlaybackRate()),this.handleTechRateChange_()}resetVolumeBar_(){this.volume(1),this.trigger("volumechange")}currentSources(){const e=this.currentSource(),t=[];return Object.keys(e).length!==0&&t.push(e),this.cache_.sources||t}currentSource(){return this.cache_.source||{}}currentSrc(){return this.currentSource()&&this.currentSource().src||""}currentType(){return this.currentSource()&&this.currentSource().type||""}preload(e){if(e!==void 0){this.techCall_("setPreload",e),this.options_.preload=e;return}return this.techGet_("preload")}autoplay(e){if(e===void 0)return this.options_.autoplay||!1;let t;typeof e=="string"&&/(any|play|muted)/.test(e)||e===!0&&this.options_.normalizeAutoplay?(this.options_.autoplay=e,this.manualAutoplay_(typeof e=="string"?e:"play"),t=!1):e?this.options_.autoplay=!0:this.options_.autoplay=!1,t=typeof t=="undefined"?this.options_.autoplay:t,this.tech_&&this.techCall_("setAutoplay",t)}playsinline(e){return e!==void 0&&(this.techCall_("setPlaysinline",e),this.options_.playsinline=e),this.techGet_("playsinline")}loop(e){if(e!==void 0){this.techCall_("setLoop",e),this.options_.loop=e;return}return this.techGet_("loop")}poster(e){if(e===void 0)return this.poster_;e||(e=""),e!==this.poster_&&(this.poster_=e,this.techCall_("setPoster",e),this.isPosterFromTech_=!1,this.trigger("posterchange"))}handleTechPosterChange_(){if((!this.poster_||this.options_.techCanOverridePoster)&&this.tech_&&this.tech_.poster){const e=this.tech_.poster()||"";e!==this.poster_&&(this.poster_=e,this.isPosterFromTech_=!0,this.trigger("posterchange"))}}controls(e){if(e===void 0)return!!this.controls_;e=!!e,this.controls_!==e&&(this.controls_=e,this.usingNativeControls()&&this.techCall_("setControls",e),this.controls_?(this.removeClass("vjs-controls-disabled"),this.addClass("vjs-controls-enabled"),this.trigger("controlsenabled"),this.usingNativeControls()||this.addTechControlsListeners_()):(this.removeClass("vjs-controls-enabled"),this.addClass("vjs-controls-disabled"),this.trigger("controlsdisabled"),this.usingNativeControls()||this.removeTechControlsListeners_()))}usingNativeControls(e){if(e===void 0)return!!this.usingNativeControls_;e=!!e,this.usingNativeControls_!==e&&(this.usingNativeControls_=e,this.usingNativeControls_?(this.addClass("vjs-using-native-controls"),this.trigger("usingnativecontrols")):(this.removeClass("vjs-using-native-controls"),this.trigger("usingcustomcontrols")))}error(e){if(e===void 0)return this.error_||null;if(Hi("beforeerror").forEach(t=>{const i=t(this,e);if(!(vi(i)&&!Array.isArray(i)||typeof i=="string"||typeof i=="number"||i===null)){this.log.error("please return a value that MediaError expects in beforeerror hooks");return}e=i}),this.options_.suppressNotSupportedError&&e&&e.code===4){const t=function(){this.error(e)};this.options_.suppressNotSupportedError=!1,this.any(["click","touchstart"],t),this.one("loadstart",function(){this.off(["click","touchstart"],t)});return}if(e===null){this.error_=null,this.removeClass("vjs-error"),this.errorDisplay&&this.errorDisplay.close();return}this.error_=new dt(e),this.addClass("vjs-error"),Fe.error(`(CODE:${this.error_.code} ${dt.errorTypes[this.error_.code]})`,this.error_.message,this.error_),this.trigger("error"),Hi("error").forEach(t=>t(this,this.error_))}reportUserActivity(e){this.userActivity_=!0}userActive(e){if(e===void 0)return this.userActive_;if(e=!!e,e!==this.userActive_){if(this.userActive_=e,this.userActive_){this.userActivity_=!0,this.removeClass("vjs-user-inactive"),this.addClass("vjs-user-active"),this.trigger("useractive");return}this.tech_&&this.tech_.one("mousemove",function(t){t.stopPropagation(),t.preventDefault()}),this.userActivity_=!1,this.removeClass("vjs-user-active"),this.addClass("vjs-user-inactive"),this.trigger("userinactive")}}listenForUserActivity_(){let e,t,i;const s=it(this,this.reportUserActivity),r=function(_){(_.screenX!==t||_.screenY!==i)&&(t=_.screenX,i=_.screenY,s())},a=function(){s(),this.clearInterval(e),e=this.setInterval(s,250)},l=function(_){s(),this.clearInterval(e)};this.on("mousedown",a),this.on("mousemove",r),this.on("mouseup",l),this.on("mouseleave",l);const h=this.getChild("controlBar");h&&!Lt&&!Ai&&(h.on("mouseenter",function(_){this.player().options_.inactivityTimeout!==0&&(this.player().cache_.inactivityTimeout=this.player().options_.inactivityTimeout),this.player().options_.inactivityTimeout=0}),h.on("mouseleave",function(_){this.player().options_.inactivityTimeout=this.player().cache_.inactivityTimeout})),this.on("keydown",s),this.on("keyup",s);let p;const g=function(){if(!this.userActivity_)return;this.userActivity_=!1,this.userActive(!0),this.clearTimeout(p);const _=this.options_.inactivityTimeout;_<=0||(p=this.setTimeout(function(){this.userActivity_||this.userActive(!1)},_))};this.setInterval(g,250)}playbackRate(e){if(e!==void 0){this.techCall_("setPlaybackRate",e);return}return this.tech_&&this.tech_.featuresPlaybackRate?this.cache_.lastPlaybackRate||this.techGet_("playbackRate"):1}defaultPlaybackRate(e){return e!==void 0?this.techCall_("setDefaultPlaybackRate",e):this.tech_&&this.tech_.featuresPlaybackRate?this.techGet_("defaultPlaybackRate"):1}isAudio(e){if(e!==void 0){this.isAudio_=!!e;return}return!!this.isAudio_}enableAudioOnlyUI_(){this.addClass("vjs-audio-only-mode");const e=this.children(),t=this.getChild("ControlBar"),i=t&&t.currentHeight();e.forEach(s=>{s!==t&&s.el_&&!s.hasClass("vjs-hidden")&&(s.hide(),this.audioOnlyCache_.hiddenChildren.push(s))}),this.audioOnlyCache_.playerHeight=this.currentHeight(),this.height(i),this.trigger("audioonlymodechange")}disableAudioOnlyUI_(){this.removeClass("vjs-audio-only-mode"),this.audioOnlyCache_.hiddenChildren.forEach(e=>e.show()),this.height(this.audioOnlyCache_.playerHeight),this.trigger("audioonlymodechange")}audioOnlyMode(e){if(typeof e!="boolean"||e===this.audioOnlyMode_)return this.audioOnlyMode_;if(this.audioOnlyMode_=e,e){const t=[];return this.isInPictureInPicture()&&t.push(this.exitPictureInPicture()),this.isFullscreen()&&t.push(this.exitFullscreen()),this.audioPosterMode()&&t.push(this.audioPosterMode(!1)),Promise.all(t).then(()=>this.enableAudioOnlyUI_())}return Promise.resolve().then(()=>this.disableAudioOnlyUI_())}enablePosterModeUI_(){(this.tech_&&this.tech_).hide(),this.addClass("vjs-audio-poster-mode"),this.trigger("audiopostermodechange")}disablePosterModeUI_(){(this.tech_&&this.tech_).show(),this.removeClass("vjs-audio-poster-mode"),this.trigger("audiopostermodechange")}audioPosterMode(e){return typeof e!="boolean"||e===this.audioPosterMode_?this.audioPosterMode_:(this.audioPosterMode_=e,e?this.audioOnlyMode()?this.audioOnlyMode(!1).then(()=>{this.enablePosterModeUI_()}):Promise.resolve().then(()=>{this.enablePosterModeUI_()}):Promise.resolve().then(()=>{this.disablePosterModeUI_()}))}addTextTrack(e,t,i){if(this.tech_)return this.tech_.addTextTrack(e,t,i)}addRemoteTextTrack(e,t){if(this.tech_)return this.tech_.addRemoteTextTrack(e,t)}removeRemoteTextTrack(e={}){let{track:t}=e;if(t||(t=e),this.tech_)return this.tech_.removeRemoteTextTrack(t)}getVideoPlaybackQuality(){return this.techGet_("getVideoPlaybackQuality")}videoWidth(){return this.tech_&&this.tech_.videoWidth&&this.tech_.videoWidth()||0}videoHeight(){return this.tech_&&this.tech_.videoHeight&&this.tech_.videoHeight()||0}language(e){if(e===void 0)return this.language_;this.language_!==String(e).toLowerCase()&&(this.language_=String(e).toLowerCase(),Oi(this)&&this.trigger("languagechange"))}languages(){return tt(rt.prototype.options_.languages,this.languages_)}toJSON(){const e=tt(this.options_),t=e.tracks;e.tracks=[];for(let i=0;i<t.length;i++){let s=t[i];s=tt(s),s.player=void 0,e.tracks[i]=s}return e}createModal(e,t){t=t||{},t.content=e||"";const i=new Vn(this,t);return this.addChild(i),i.on("dispose",()=>{this.removeChild(i)}),i.open(),i}updateCurrentBreakpoint_(){if(!this.responsive())return;const e=this.currentBreakpoint(),t=this.currentWidth();for(let i=0;i<bo.length;i++){const s=bo[i],r=this.breakpoints_[s];if(t<=r){if(e===s)return;e&&this.removeClass(Sr[e]),this.addClass(Sr[s]),this.breakpoint_=s;break}}}removeCurrentBreakpoint_(){const e=this.currentBreakpointClass();this.breakpoint_="",e&&this.removeClass(e)}breakpoints(e){return e===void 0?Object.assign(this.breakpoints_):(this.breakpoint_="",this.breakpoints_=Object.assign({},Fp,e),this.updateCurrentBreakpoint_(),Object.assign(this.breakpoints_))}responsive(e){if(e===void 0)return this.responsive_;e=!!e;const t=this.responsive_;if(e!==t)return this.responsive_=e,e?(this.on("playerresize",this.boundUpdateCurrentBreakpoint_),this.updateCurrentBreakpoint_()):(this.off("playerresize",this.boundUpdateCurrentBreakpoint_),this.removeCurrentBreakpoint_()),e}currentBreakpoint(){return this.breakpoint_}currentBreakpointClass(){return Sr[this.breakpoint_]||""}loadMedia(e,t){if(!e||typeof e!="object")return;const i=this.crossOrigin();this.reset(),this.cache_.media=tt(e);const{artist:s,artwork:r,description:a,poster:l,src:h,textTracks:p,title:g}=this.cache_.media;!r&&l&&(this.cache_.media.artwork=[{src:l,type:Er(l)}]),i&&this.crossOrigin(i),h&&this.src(h),l&&this.poster(l),Array.isArray(p)&&p.forEach(_=>this.addRemoteTextTrack(_,!1)),this.titleBar&&this.titleBar.update({title:g,description:a||s||""}),this.ready(t)}getMedia(){if(!this.cache_.media){const e=this.poster(),t=this.currentSources(),i=Array.prototype.map.call(this.remoteTextTracks(),r=>({kind:r.kind,label:r.label,language:r.language,src:r.src})),s={src:t,textTracks:i};return e&&(s.poster=e,s.artwork=[{src:s.poster,type:Er(s.poster)}]),s}return tt(this.cache_.media)}static getTagSettings(e){const t={sources:[],tracks:[]},i=$i(e),s=i["data-setup"];if(ps(e,"vjs-fill")&&(i.fill=!0),ps(e,"vjs-fluid")&&(i.fluid=!0),s!==null){const[r,a]=he()(s||"{}");r&&Fe.error(r),Object.assign(i,a)}if(Object.assign(t,i),e.hasChildNodes()){const r=e.childNodes;for(let a=0,l=r.length;a<l;a++){const h=r[a],p=h.nodeName.toLowerCase();p==="source"?t.sources.push($i(h)):p==="track"&&t.tracks.push($i(h))}}return t}debug(e){if(e===void 0)return this.debugEnabled_;e?(this.trigger("debugon"),this.previousLogLevel_=this.log.level,this.log.level("debug"),this.debugEnabled_=!0):(this.trigger("debugoff"),this.log.level(this.previousLogLevel_),this.previousLogLevel_=void 0,this.debugEnabled_=!1)}playbackRates(e){if(e===void 0)return this.cache_.playbackRates;Array.isArray(e)&&e.every(t=>typeof t=="number")&&(this.cache_.playbackRates=e,this.trigger("playbackrateschange"))}}Mt.names.forEach(function(n){const e=Mt[n];rt.prototype[e.getterName]=function(){return this.tech_?this.tech_[e.getterName]():(this[e.privateName]=this[e.privateName]||new e.ListClass,this[e.privateName])}}),rt.prototype.crossorigin=rt.prototype.crossOrigin,rt.players={};const xs=A().navigator;rt.prototype.options_={techOrder:Re.defaultTechOrder_,html5:{},enableSourceset:!0,inactivityTimeout:2e3,playbackRates:[],liveui:!1,children:["mediaLoader","posterImage","titleBar","textTrackDisplay","loadingSpinner","bigPlayButton","liveTracker","controlBar","errorDisplay","textTrackSettings","resizeManager"],language:xs&&(xs.languages&&xs.languages[0]||xs.userLanguage||xs.language)||"en",languages:{},notSupportedMessage:"No compatible source was found for this media.",normalizeAutoplay:!1,fullscreen:{options:{navigationUI:"hide"}},breakpoints:{},responsive:!1,audioOnlyMode:!1,audioPosterMode:!1,enableSmoothSeeking:!1},sc.forEach(function(n){rt.prototype[`handleTech${pt(n)}_`]=function(){return this.trigger(n)}}),W.registerComponent("Player",rt);const jr="plugin",Gn="activePlugins_",$n={},Br=n=>$n.hasOwnProperty(n),wr=n=>Br(n)?$n[n]:void 0,rc=(n,e)=>{n[Gn]=n[Gn]||{},n[Gn][e]=!0},Dr=(n,e,t)=>{const i=(t?"before":"")+"pluginsetup";n.trigger(i,e),n.trigger(i+":"+e.name,e)},Vp=function(n,e){const t=function(){Dr(this,{name:n,plugin:e,instance:null},!0);const i=e.apply(this,arguments);return rc(this,n),Dr(this,{name:n,plugin:e,instance:i}),i};return Object.keys(e).forEach(function(i){t[i]=e[i]}),t},ac=(n,e)=>(e.prototype.name=n,function(...t){Dr(this,{name:n,plugin:e,instance:null},!0);const i=new e(this,...t);return this[n]=()=>i,Dr(this,i.getEventHash()),i});class qt{constructor(e){if(this.constructor===qt)throw new Error("Plugin must be sub-classed; not directly instantiated.");this.player=e,this.log||(this.log=this.player.log.createLogger(this.name)),Ua(this),delete this.trigger,tu(this,this.constructor.defaultState),rc(e,this.name),this.dispose=this.dispose.bind(this),e.on("dispose",this.dispose)}version(){return this.constructor.VERSION}getEventHash(e={}){return e.name=this.name,e.plugin=this.constructor,e.instance=this,e}trigger(e,t={}){return Fn(this.eventBusEl_,e,this.getEventHash(t))}handleStateChanged(e){}dispose(){const{name:e,player:t}=this;this.trigger("dispose"),this.off(),t.off("dispose",this.dispose),t[Gn][e]=!1,this.player=this.state=null,t[e]=ac(e,$n[e])}static isBasic(e){const t=typeof e=="string"?wr(e):e;return typeof t=="function"&&!qt.prototype.isPrototypeOf(t.prototype)}static registerPlugin(e,t){if(typeof e!="string")throw new Error(`Illegal plugin name, "${e}", must be a string, was ${typeof e}.`);if(Br(e))Fe.warn(`A plugin named "${e}" already exists. You may want to avoid re-registering plugins!`);else if(rt.prototype.hasOwnProperty(e))throw new Error(`Illegal plugin name, "${e}", cannot share a name with an existing player method!`);if(typeof t!="function")throw new Error(`Illegal plugin for "${e}", must be a function, was ${typeof t}.`);return $n[e]=t,e!==jr&&(qt.isBasic(t)?rt.prototype[e]=Vp(e,t):rt.prototype[e]=ac(e,t)),t}static deregisterPlugin(e){if(e===jr)throw new Error("Cannot de-register base plugin.");Br(e)&&(delete $n[e],delete rt.prototype[e])}static getPlugins(e=Object.keys($n)){let t;return e.forEach(i=>{const s=wr(i);s&&(t=t||{},t[i]=s)}),t}static getPluginVersion(e){const t=wr(e);return t&&t.VERSION||""}}qt.getPlugin=wr,qt.BASE_PLUGIN_NAME=jr,qt.registerPlugin(jr,qt),rt.prototype.usingPlugin=function(n){return!!this[Gn]&&this[Gn][n]===!0},rt.prototype.hasPlugin=function(n){return!!Br(n)};function qp(n,e){let t=!1;return function(...i){return t||Fe.warn(n),t=!0,e.apply(this,i)}}function ci(n,e,t,i){return qp(`${e} is deprecated and will be removed in ${n}.0; please use ${t} instead.`,i)}var zp={UnsupportedSidxContainer:"unsupported-sidx-container-error",DashManifestSidxParsingError:"dash-manifest-sidx-parsing-error",HlsPlaylistRequestError:"hls-playlist-request-error",SegmentUnsupportedMediaFormat:"segment-unsupported-media-format-error",UnsupportedMediaInitialization:"unsupported-media-initialization-error",SegmentSwitchError:"segment-switch-error",SegmentExceedsSourceBufferQuota:"segment-exceeds-source-buffer-quota-error",SegmentAppendError:"segment-append-error",VttLoadError:"vtt-load-error",VttCueParsingError:"vtt-cue-parsing-error",AdsBeforePrerollError:"ads-before-preroll-error",AdsPrerollError:"ads-preroll-error",AdsMidrollError:"ads-midroll-error",AdsPostrollError:"ads-postroll-error",AdsMacroReplacementFailed:"ads-macro-replacement-failed",AdsResumeContentFailed:"ads-resume-content-failed",EMEFailedToRequestMediaKeySystemAccess:"eme-failed-request-media-key-system-access",EMEFailedToCreateMediaKeys:"eme-failed-create-media-keys",EMEFailedToAttachMediaKeysToVideoElement:"eme-failed-attach-media-keys-to-video",EMEFailedToCreateMediaKeySession:"eme-failed-create-media-key-session",EMEFailedToSetServerCertificate:"eme-failed-set-server-certificate",EMEFailedToGenerateLicenseRequest:"eme-failed-generate-license-request",EMEFailedToUpdateSessionWithReceivedLicenseKeys:"eme-failed-update-session",EMEFailedToCloseSession:"eme-failed-close-session",EMEFailedToRemoveKeysFromSession:"eme-failed-remove-keys",EMEFailedToLoadSessionBySessionId:"eme-failed-load-session"};const oc=n=>n.indexOf("#")===0?n.slice(1):n;function M(n,e,t){let i=M.getPlayer(n);if(i)return e&&Fe.warn(`Player "${n}" is already initialised. Options will not be applied.`),t&&i.ready(t),i;const s=typeof n=="string"?Xi("#"+oc(n)):n;if(!Rn(s))throw new TypeError("The element or ID supplied is not valid. (videojs)");const a=("getRootNode"in s?s.getRootNode()instanceof A().ShadowRoot:!1)?s.getRootNode():s.ownerDocument.body;(!s.ownerDocument.defaultView||!a.contains(s))&&Fe.warn("The element supplied is not included in the DOM"),e=e||{},e.restoreEl===!0&&(e.restoreEl=(s.parentNode&&s.parentNode.hasAttribute("data-vjs-player")?s.parentNode:s).cloneNode(!0)),Hi("beforesetup").forEach(h=>{const p=h(s,tt(e));if(!vi(p)||Array.isArray(p)){Fe.error("please return an object in beforesetup hooks");return}e=tt(e,p)});const l=W.getComponent("Player");return i=new l(s,e,t),Hi("setup").forEach(h=>h(i)),i}if(M.hooks_=Pi,M.hooks=Hi,M.hook=jf,M.hookOnce=Bf,M.removeHook=Tl,A().VIDEOJS_NO_DYNAMIC_STYLE!==!0&&Ln()){let n=Xi(".vjs-styles-defaults");if(!n){n=Yl("vjs-styles-defaults");const e=Xi("head");e&&e.insertBefore(n,e.firstChild),Kl(n,`
      .video-js {
        width: 300px;
        height: 150px;
      }

      .vjs-fluid:not(.vjs-audio-only-mode) {
        padding-top: 56.25%
      }
    `)}}Pa(1,M),M.VERSION=Ta,M.options=rt.prototype.options_,M.getPlayers=()=>rt.players,M.getPlayer=n=>{const e=rt.players;let t;if(typeof n=="string"){const i=oc(n),s=e[i];if(s)return s;t=Xi("#"+i)}else t=n;if(Rn(t)){const{player:i,playerId:s}=t;if(i||e[s])return i||e[s]}},M.getAllPlayers=()=>Object.keys(rt.players).map(n=>rt.players[n]).filter(Boolean),M.players=rt.players,M.getComponent=W.getComponent,M.registerComponent=(n,e)=>(Re.isTech(e)&&Fe.warn(`The ${n} tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)`),W.registerComponent.call(W,n,e)),M.getTech=Re.getTech,M.registerTech=Re.registerTech,M.use=Zf,Object.defineProperty(M,"middleware",{value:{},writeable:!1,enumerable:!0}),Object.defineProperty(M.middleware,"TERMINATOR",{value:br,writeable:!1,enumerable:!0}),M.browser=Pl,M.obj=kf,M.mergeOptions=ci(9,"videojs.mergeOptions","videojs.obj.merge",tt),M.defineLazyProperty=ci(9,"videojs.defineLazyProperty","videojs.obj.defineLazyProperty",nr),M.bind=ci(9,"videojs.bind","native Function.prototype.bind",it),M.registerPlugin=qt.registerPlugin,M.deregisterPlugin=qt.deregisterPlugin,M.plugin=(n,e)=>(Fe.warn("videojs.plugin() is deprecated; use videojs.registerPlugin() instead"),qt.registerPlugin(n,e)),M.getPlugins=qt.getPlugins,M.getPlugin=qt.getPlugin,M.getPluginVersion=qt.getPluginVersion,M.addLanguage=function(n,e){return n=(""+n).toLowerCase(),M.options.languages=tt(M.options.languages,{[n]:e}),M.options.languages[n]},M.log=Fe,M.createLogger=xl,M.time=Hf,M.createTimeRange=ci(9,"videojs.createTimeRange","videojs.time.createTimeRanges",ui),M.createTimeRanges=ci(9,"videojs.createTimeRanges","videojs.time.createTimeRanges",ui),M.formatTime=ci(9,"videojs.formatTime","videojs.time.formatTime",on),M.setFormatTime=ci(9,"videojs.setFormatTime","videojs.time.setFormatTime",ru),M.resetFormatTime=ci(9,"videojs.resetFormatTime","videojs.time.resetFormatTime",au),M.parseUrl=ci(9,"videojs.parseUrl","videojs.url.parseUrl",$a),M.isCrossOrigin=ci(9,"videojs.isCrossOrigin","videojs.url.isCrossOrigin",_r),M.EventTarget=ti,M.any=Ra,M.on=$t,M.one=gr,M.off=wt,M.trigger=Fn,M.xhr=se(),M.TextTrack=_s,M.AudioTrack=pu,M.VideoTrack=mu,["isEl","isTextNode","createEl","hasClass","addClass","removeClass","toggleClass","setAttributes","getAttributes","emptyEl","appendContent","insertContent"].forEach(n=>{M[n]=function(){return Fe.warn(`videojs.${n}() is deprecated; use videojs.dom.${n}() instead`),$l[n].apply(null,arguments)}}),M.computedStyle=ci(9,"videojs.computedStyle","videojs.dom.computedStyle",Un),M.dom=$l,M.fn=Nf,M.num=yp,M.str=qf,M.url=Qf,M.Error=zp;/*! @name videojs-contrib-quality-levels @version 4.1.0 @license Apache-2.0 */class Hp{constructor(e){let t=this;return t.id=e.id,t.label=t.id,t.width=e.width,t.height=e.height,t.bitrate=e.bandwidth,t.frameRate=e.frameRate,t.enabled_=e.enabled,Object.defineProperty(t,"enabled",{get(){return t.enabled_()},set(i){t.enabled_(i)}}),t}}class kr extends M.EventTarget{constructor(){super();let e=this;return e.levels_=[],e.selectedIndex_=-1,Object.defineProperty(e,"selectedIndex",{get(){return e.selectedIndex_}}),Object.defineProperty(e,"length",{get(){return e.levels_.length}}),e[Symbol.iterator]=()=>e.levels_.values(),e}addQualityLevel(e){let t=this.getQualityLevelById(e.id);if(t)return t;const i=this.levels_.length;return t=new Hp(e),""+i in this||Object.defineProperty(this,i,{get(){return this.levels_[i]}}),this.levels_.push(t),this.trigger({qualityLevel:t,type:"addqualitylevel"}),t}removeQualityLevel(e){let t=null;for(let i=0,s=this.length;i<s;i++)if(this[i]===e){t=this.levels_.splice(i,1)[0],this.selectedIndex_===i?this.selectedIndex_=-1:this.selectedIndex_>i&&this.selectedIndex_--;break}return t&&this.trigger({qualityLevel:e,type:"removequalitylevel"}),t}getQualityLevelById(e){for(let t=0,i=this.length;t<i;t++){const s=this[t];if(s.id===e)return s}return null}dispose(){this.selectedIndex_=-1,this.levels_.length=0}}kr.prototype.allowedEvents_={change:"change",addqualitylevel:"addqualitylevel",removequalitylevel:"removequalitylevel"};for(const n in kr.prototype.allowedEvents_)kr.prototype["on"+n]=null;var lc="4.1.0";const Wp=function(n,e){const t=n.qualityLevels,i=new kr,s=function(){i.dispose(),n.qualityLevels=t,n.off("dispose",s)};return n.on("dispose",s),n.qualityLevels=()=>i,n.qualityLevels.VERSION=lc,i},uc=function(n){return Wp(this,M.obj.merge({},n))};M.registerPlugin("qualityLevels",uc),uc.VERSION=lc;/*! @name @videojs/http-streaming @version 3.12.1 @license Apache-2.0 */const zt=ne,Ir=(n,e)=>e&&e.responseURL&&n!==e.responseURL?e.responseURL:n,si=n=>M.log.debug?M.log.debug.bind(M,"VHS:",`${n} >`):function(){};function Ge(...n){const e=M.obj||M;return(e.merge||e.mergeOptions).apply(e,n)}function Dt(...n){const e=M.time||M;return(e.createTimeRanges||e.createTimeRanges).apply(e,n)}function Gp(n){if(n.length===0)return"Buffered Ranges are empty";let e=`Buffered Ranges: 
`;for(let t=0;t<n.length;t++){const i=n.start(t),s=n.end(t);e+=`${i} --> ${s}. Duration (${s-i})
`}return e}const Ei=1/30,Ti=Ei*3,cc=function(n,e){const t=[];let i;if(n&&n.length)for(i=0;i<n.length;i++)e(n.start(i),n.end(i))&&t.push([n.start(i),n.end(i)]);return Dt(t)},Xn=function(n,e){return cc(n,function(t,i){return t-Ti<=e&&i+Ti>=e})},Pr=function(n,e){return cc(n,function(t){return t-Ei>=e})},$p=function(n){if(n.length<2)return Dt();const e=[];for(let t=1;t<n.length;t++){const i=n.end(t-1),s=n.start(t);e.push([i,s])}return Dt(e)},Xp=function(n,e){let t=null,i=null,s=0;const r=[],a=[];if(!n||!n.length||!e||!e.length)return Dt();let l=n.length;for(;l--;)r.push({time:n.start(l),type:"start"}),r.push({time:n.end(l),type:"end"});for(l=e.length;l--;)r.push({time:e.start(l),type:"start"}),r.push({time:e.end(l),type:"end"});for(r.sort(function(h,p){return h.time-p.time}),l=0;l<r.length;l++)r[l].type==="start"?(s++,s===2&&(t=r[l].time)):r[l].type==="end"&&(s--,s===1&&(i=r[l].time)),t!==null&&i!==null&&(a.push([t,i]),t=null,i=null);return Dt(a)},dc=n=>{const e=[];if(!n||!n.length)return"";for(let t=0;t<n.length;t++)e.push(n.start(t)+" => "+n.end(t));return e.join(", ")},Yp=function(n,e,t=1){return((n.length?n.end(n.length-1):0)-e)/t},dn=n=>{const e=[];for(let t=0;t<n.length;t++)e.push({start:n.start(t),end:n.end(t)});return e},Kp=function(n,e){if(n===e)return!1;if(!n&&e||!e&&n||n.length!==e.length)return!0;for(let t=0;t<n.length;t++)if(n.start(t)!==e.start(t)||n.end(t)!==e.end(t))return!0;return!1},Eo=function(n){if(!(!n||!n.length||!n.end))return n.end(n.length-1)},To=function(n,e){let t=0;if(!n||!n.length)return t;for(let i=0;i<n.length;i++){const s=n.start(i),r=n.end(i);if(!(e>r)){if(e>s&&e<=r){t+=r-e;continue}t+=r-s}}return t},Co=(n,e)=>{if(!e.preload)return e.duration;let t=0;return(e.parts||[]).forEach(function(i){t+=i.duration}),(e.preloadHints||[]).forEach(function(i){i.type==="PART"&&(t+=n.partTargetDuration)}),t},xo=n=>(n.segments||[]).reduce((e,t,i)=>(t.parts?t.parts.forEach(function(s,r){e.push({duration:s.duration,segmentIndex:i,partIndex:r,part:s,segment:t})}):e.push({duration:t.duration,segmentIndex:i,partIndex:null,segment:t,part:null}),e),[]),hc=n=>{const e=n.segments&&n.segments.length&&n.segments[n.segments.length-1];return e&&e.parts||[]},fc=({preloadSegment:n})=>{if(!n)return;const{parts:e,preloadHints:t}=n;let i=(t||[]).reduce((s,r)=>s+(r.type==="PART"?1:0),0);return i+=e&&e.length?e.length:0,i},pc=(n,e)=>{if(e.endList)return 0;if(n&&n.suggestedPresentationDelay)return n.suggestedPresentationDelay;const t=hc(e).length>0;return t&&e.serverControl&&e.serverControl.partHoldBack?e.serverControl.partHoldBack:t&&e.partTargetDuration?e.partTargetDuration*3:e.serverControl&&e.serverControl.holdBack?e.serverControl.holdBack:e.targetDuration?e.targetDuration*3:0},Qp=function(n,e){let t=0,i=e-n.mediaSequence,s=n.segments[i];if(s){if(typeof s.start!="undefined")return{result:s.start,precise:!0};if(typeof s.end!="undefined")return{result:s.end-s.duration,precise:!0}}for(;i--;){if(s=n.segments[i],typeof s.end!="undefined")return{result:t+s.end,precise:!0};if(t+=Co(n,s),typeof s.start!="undefined")return{result:t+s.start,precise:!0}}return{result:t,precise:!1}},Jp=function(n,e){let t=0,i,s=e-n.mediaSequence;for(;s<n.segments.length;s++){if(i=n.segments[s],typeof i.start!="undefined")return{result:i.start-t,precise:!0};if(t+=Co(n,i),typeof i.end!="undefined")return{result:i.end-t,precise:!0}}return{result:-1,precise:!1}},mc=function(n,e,t){if(typeof e=="undefined"&&(e=n.mediaSequence+n.segments.length),e<n.mediaSequence)return 0;const i=Qp(n,e);if(i.precise)return i.result;const s=Jp(n,e);return s.precise?s.result:i.result+t},gc=function(n,e,t){if(!n)return 0;if(typeof t!="number"&&(t=0),typeof e=="undefined"){if(n.totalDuration)return n.totalDuration;if(!n.endList)return A()[1/0]}return mc(n,e,t)},Ss=function({defaultDuration:n,durationList:e,startIndex:t,endIndex:i}){let s=0;if(t>i&&([t,i]=[i,t]),t<0){for(let r=t;r<Math.min(0,i);r++)s+=n;t=0}for(let r=t;r<i;r++)s+=e[r].duration;return s},vc=function(n,e,t,i){if(!n||!n.segments)return null;if(n.endList)return gc(n);if(e===null)return null;e=e||0;let s=mc(n,n.mediaSequence+n.segments.length,e);return t&&(i=typeof i=="number"?i:pc(null,n),s-=i),Math.max(0,s)},Zp=function(n,e,t){const s=e||0;let r=vc(n,e,!0,t);return r===null?Dt():(r<s&&(r=s),Dt(s,r))},em=function({playlist:n,currentTime:e,startingSegmentIndex:t,startingPartIndex:i,startTime:s,exactManifestTimings:r}){let a=e-s;const l=xo(n);let h=0;for(let p=0;p<l.length;p++){const g=l[p];if(t===g.segmentIndex&&!(typeof i=="number"&&typeof g.partIndex=="number"&&i!==g.partIndex)){h=p;break}}if(a<0){if(h>0)for(let p=h-1;p>=0;p--){const g=l[p];if(a+=g.duration,r){if(a<0)continue}else if(a+Ei<=0)continue;return{partIndex:g.partIndex,segmentIndex:g.segmentIndex,startTime:s-Ss({defaultDuration:n.targetDuration,durationList:l,startIndex:h,endIndex:p})}}return{partIndex:l[0]&&l[0].partIndex||null,segmentIndex:l[0]&&l[0].segmentIndex||0,startTime:e}}if(h<0){for(let p=h;p<0;p++)if(a-=n.targetDuration,a<0)return{partIndex:l[0]&&l[0].partIndex||null,segmentIndex:l[0]&&l[0].segmentIndex||0,startTime:e};h=0}for(let p=h;p<l.length;p++){const g=l[p];a-=g.duration;const _=g.duration>Ei,w=a===0,D=_&&a+Ei>=0;if(!((w||D)&&p!==l.length-1)){if(r){if(a>0)continue}else if(a-Ei>=0)continue;return{partIndex:g.partIndex,segmentIndex:g.segmentIndex,startTime:s+Ss({defaultDuration:n.targetDuration,durationList:l,startIndex:h,endIndex:p})}}}return{segmentIndex:l[l.length-1].segmentIndex,partIndex:l[l.length-1].partIndex,startTime:e}},Ac=function(n){return n.excludeUntil&&n.excludeUntil>Date.now()},So=function(n){return n.excludeUntil&&n.excludeUntil===1/0},Or=function(n){const e=Ac(n);return!n.disabled&&!e},tm=function(n){return n.disabled},im=function(n){for(let e=0;e<n.segments.length;e++)if(n.segments[e].key)return!0;return!1},yc=function(n,e){return e.attributes&&e.attributes[n]},nm=function(n,e,t,i=0){return yc("BANDWIDTH",t)?(n*t.attributes.BANDWIDTH-i*8)/e:NaN},jo=(n,e)=>{if(n.playlists.length===1)return!0;const t=e.attributes.BANDWIDTH||Number.MAX_VALUE;return n.playlists.filter(i=>Or(i)?(i.attributes.BANDWIDTH||0)<t:!1).length===0},Bo=(n,e)=>!n&&!e||!n&&e||n&&!e?!1:!!(n===e||n.id&&e.id&&n.id===e.id||n.resolvedUri&&e.resolvedUri&&n.resolvedUri===e.resolvedUri||n.uri&&e.uri&&n.uri===e.uri),_c=function(n,e){const t=n&&n.mediaGroups&&n.mediaGroups.AUDIO||{};let i=!1;for(const s in t){for(const r in t[s])if(i=e(t[s][r]),i)break;if(i)break}return!!i},js=n=>{if(!n||!n.playlists||!n.playlists.length)return _c(n,t=>t.playlists&&t.playlists.length||t.uri);for(let e=0;e<n.playlists.length;e++){const t=n.playlists[e],i=t.attributes&&t.attributes.CODECS;if(!(i&&i.split(",").every(r=>je(r))||_c(n,r=>Bo(t,r))))return!1}return!0};var Ht={liveEdgeDelay:pc,duration:gc,seekable:Zp,getMediaInfoForTime:em,isEnabled:Or,isDisabled:tm,isExcluded:Ac,isIncompatible:So,playlistEnd:vc,isAes:im,hasAttribute:yc,estimateSegmentRequestTime:nm,isLowestEnabledRendition:jo,isAudioOnly:js,playlistMatch:Bo,segmentDurationWithParts:Co};const{log:bc}=M,Yn=(n,e)=>`${n}-${e}`,Ec=(n,e,t)=>`placeholder-uri-${n}-${e}-${t}`,sm=({onwarn:n,oninfo:e,manifestString:t,customTagParsers:i=[],customTagMappers:s=[],llhls:r})=>{const a=new ue;n&&a.on("warn",n),e&&a.on("info",e),i.forEach(p=>a.addParser(p)),s.forEach(p=>a.addTagMapper(p)),a.push(t),a.end();const l=a.manifest;if(r||(["preloadSegment","skip","serverControl","renditionReports","partInf","partTargetDuration"].forEach(function(p){l.hasOwnProperty(p)&&delete l[p]}),l.segments&&l.segments.forEach(function(p){["parts","preloadHints"].forEach(function(g){p.hasOwnProperty(g)&&delete p[g]})})),!l.targetDuration){let p=10;l.segments&&l.segments.length&&(p=l.segments.reduce((g,_)=>Math.max(g,_.duration),0)),n&&n({message:`manifest has no targetDuration defaulting to ${p}`}),l.targetDuration=p}const h=hc(l);if(h.length&&!l.partTargetDuration){const p=h.reduce((g,_)=>Math.max(g,_.duration),0);n&&(n({message:`manifest has no partTargetDuration defaulting to ${p}`}),bc.error("LL-HLS manifest has parts but lacks required #EXT-X-PART-INF:PART-TARGET value. See https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-09#section-4.4.3.7. Playback is not guaranteed.")),l.partTargetDuration=p}return l},Kn=(n,e)=>{n.mediaGroups&&["AUDIO","SUBTITLES"].forEach(t=>{if(n.mediaGroups[t])for(const i in n.mediaGroups[t])for(const s in n.mediaGroups[t][i]){const r=n.mediaGroups[t][i][s];e(r,t,i,s)}})},Tc=({playlist:n,uri:e,id:t})=>{n.id=t,n.playlistErrors_=0,e&&(n.uri=e),n.attributes=n.attributes||{}},rm=n=>{let e=n.playlists.length;for(;e--;){const t=n.playlists[e];Tc({playlist:t,id:Yn(e,t.uri)}),t.resolvedUri=zt(n.uri,t.uri),n.playlists[t.id]=t,n.playlists[t.uri]=t,t.attributes.BANDWIDTH||bc.warn("Invalid playlist STREAM-INF detected. Missing BANDWIDTH attribute.")}},am=n=>{Kn(n,e=>{e.uri&&(e.resolvedUri=zt(n.uri,e.uri))})},om=(n,e)=>{const t=Yn(0,e),i={mediaGroups:{AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},uri:A().location.href,resolvedUri:A().location.href,playlists:[{uri:e,id:t,resolvedUri:e,attributes:{}}]};return i.playlists[t]=i.playlists[0],i.playlists[e]=i.playlists[0],i},Cc=(n,e,t=Ec)=>{n.uri=e;for(let s=0;s<n.playlists.length;s++)if(!n.playlists[s].uri){const r=`placeholder-uri-${s}`;n.playlists[s].uri=r}const i=js(n);Kn(n,(s,r,a,l)=>{if(!s.playlists||!s.playlists.length){if(i&&r==="AUDIO"&&!s.uri)for(let h=0;h<n.playlists.length;h++){const p=n.playlists[h];if(p.attributes&&p.attributes.AUDIO&&p.attributes.AUDIO===a)return}s.playlists=[(0,_e.A)({},s)]}s.playlists.forEach(function(h,p){const g=t(r,a,l,h),_=Yn(p,g);h.uri?h.resolvedUri=h.resolvedUri||zt(n.uri,h.uri):(h.uri=p===0?g:_,h.resolvedUri=h.uri),h.id=h.id||_,h.attributes=h.attributes||{},n.playlists[h.id]=h,n.playlists[h.uri]=h})}),rm(n),am(n)};class xc{constructor(){this.offset_=null,this.pendingDateRanges_=new Map,this.processedDateRanges_=new Map}setOffset(e=[]){if(this.offset_!==null||!e.length)return;const[t]=e;t.programDateTime!==void 0&&(this.offset_=t.programDateTime/1e3)}setPendingDateRanges(e=[]){if(!e.length)return;const[t]=e,i=t.startDate.getTime();this.trimProcessedDateRanges_(i),this.pendingDateRanges_=e.reduce((s,r)=>(s.set(r.id,r),s),new Map)}processDateRange(e){this.pendingDateRanges_.delete(e.id),this.processedDateRanges_.set(e.id,e)}getDateRangesToProcess(){if(this.offset_===null)return[];const e={},t=[];this.pendingDateRanges_.forEach((i,s)=>{if(!this.processedDateRanges_.has(s)&&(i.startTime=i.startDate.getTime()/1e3-this.offset_,i.processDateRange=()=>this.processDateRange(i),t.push(i),!!i.class))if(e[i.class]){const r=e[i.class].push(i);i.classListIndex=r-1}else e[i.class]=[i],i.classListIndex=0});for(const i of t){const s=e[i.class]||[];i.endDate?i.endTime=i.endDate.getTime()/1e3-this.offset_:i.endOnNext&&s[i.classListIndex+1]?i.endTime=s[i.classListIndex+1].startTime:i.duration?i.endTime=i.startTime+i.duration:i.plannedDuration?i.endTime=i.startTime+i.plannedDuration:i.endTime=i.startTime}return t}trimProcessedDateRanges_(e){new Map(this.processedDateRanges_).forEach((i,s)=>{i.startDate.getTime()<e&&this.processedDateRanges_.delete(s)})}}const{EventTarget:lm}=M,um=(n,e)=>{if(e.endList||!e.serverControl)return n;const t={};if(e.serverControl.canBlockReload){const{preloadSegment:i}=e;let s=e.mediaSequence+e.segments.length;if(i){const r=i.parts||[],a=fc(e)-1;a>-1&&a!==r.length-1&&(t._HLS_part=a),(a>-1||r.length)&&s--}t._HLS_msn=s}if(e.serverControl&&e.serverControl.canSkipUntil&&(t._HLS_skip=e.serverControl.canSkipDateranges?"v2":"YES"),Object.keys(t).length){const i=new(A()).URL(n);["_HLS_skip","_HLS_msn","_HLS_part"].forEach(function(s){t.hasOwnProperty(s)&&i.searchParams.set(s,t[s])}),n=i.toString()}return n},cm=(n,e)=>{if(!n)return e;const t=Ge(n,e);if(n.preloadHints&&!e.preloadHints&&delete t.preloadHints,n.parts&&!e.parts)delete t.parts;else if(n.parts&&e.parts)for(let i=0;i<e.parts.length;i++)n.parts&&n.parts[i]&&(t.parts[i]=Ge(n.parts[i],e.parts[i]));return!n.skipped&&e.skipped&&(t.skipped=!1),n.preload&&!e.preload&&(t.preload=!1),t},dm=(n,e,t)=>{const i=n.slice(),s=e.slice();t=t||0;const r=[];let a;for(let l=0;l<s.length;l++){const h=i[l+t],p=s[l];h?(a=h.map||a,r.push(cm(h,p))):(a&&!p.map&&(p.map=a),r.push(p))}return r},Sc=(n,e)=>{!n.resolvedUri&&n.uri&&(n.resolvedUri=zt(e,n.uri)),n.key&&!n.key.resolvedUri&&(n.key.resolvedUri=zt(e,n.key.uri)),n.map&&!n.map.resolvedUri&&(n.map.resolvedUri=zt(e,n.map.uri)),n.map&&n.map.key&&!n.map.key.resolvedUri&&(n.map.key.resolvedUri=zt(e,n.map.key.uri)),n.parts&&n.parts.length&&n.parts.forEach(t=>{t.resolvedUri||(t.resolvedUri=zt(e,t.uri))}),n.preloadHints&&n.preloadHints.length&&n.preloadHints.forEach(t=>{t.resolvedUri||(t.resolvedUri=zt(e,t.uri))})},jc=function(n){const e=n.segments||[],t=n.preloadSegment;if(t&&t.parts&&t.parts.length){if(t.preloadHints){for(let i=0;i<t.preloadHints.length;i++)if(t.preloadHints[i].type==="MAP")return e}t.duration=n.targetDuration,t.preload=!0,e.push(t)}return e},Bc=(n,e)=>n===e||n.segments&&e.segments&&n.segments.length===e.segments.length&&n.endList===e.endList&&n.mediaSequence===e.mediaSequence&&n.preloadSegment===e.preloadSegment,wo=(n,e,t=Bc)=>{const i=Ge(n,{}),s=i.playlists[e.id];if(!s||t(s,e))return null;e.segments=jc(e);const r=Ge(s,e);if(r.preloadSegment&&!e.preloadSegment&&delete r.preloadSegment,s.segments){if(e.skip){e.segments=e.segments||[];for(let a=0;a<e.skip.skippedSegments;a++)e.segments.unshift({skipped:!0})}r.segments=dm(s.segments,e.segments,e.mediaSequence-s.mediaSequence)}r.segments.forEach(a=>{Sc(a,r.resolvedUri)});for(let a=0;a<i.playlists.length;a++)i.playlists[a].id===e.id&&(i.playlists[a]=r);return i.playlists[e.id]=r,i.playlists[e.uri]=r,Kn(n,(a,l,h,p)=>{if(a.playlists)for(let g=0;g<a.playlists.length;g++)e.id===a.playlists[g].id&&(a.playlists[g]=r)}),i},Do=(n,e)=>{const t=n.segments||[],i=t[t.length-1],s=i&&i.parts&&i.parts[i.parts.length-1],r=s&&s.duration||i&&i.duration;return e&&r?r*1e3:(n.partTargetDuration||n.targetDuration||10)*500};class Qn extends lm{constructor(e,t,i={}){if(super(),!e)throw new Error("A non-empty playlist URL or object is required");this.logger_=si("PlaylistLoader");const{withCredentials:s=!1}=i;this.src=e,this.vhs_=t,this.withCredentials=s,this.addDateRangesToTextTrack_=i.addDateRangesToTextTrack;const r=t.options_;this.customTagParsers=r&&r.customTagParsers||[],this.customTagMappers=r&&r.customTagMappers||[],this.llhls=r&&r.llhls,this.dateRangesStorage_=new xc,this.state="HAVE_NOTHING",this.handleMediaupdatetimeout_=this.handleMediaupdatetimeout_.bind(this),this.on("mediaupdatetimeout",this.handleMediaupdatetimeout_),this.on("loadedplaylist",this.handleLoadedPlaylist_.bind(this))}handleLoadedPlaylist_(){const e=this.media();if(!e)return;this.dateRangesStorage_.setOffset(e.segments),this.dateRangesStorage_.setPendingDateRanges(e.dateRanges);const t=this.dateRangesStorage_.getDateRangesToProcess();!t.length||!this.addDateRangesToTextTrack_||this.addDateRangesToTextTrack_(t)}handleMediaupdatetimeout_(){if(this.state!=="HAVE_METADATA")return;const e=this.media();let t=zt(this.main.uri,e.uri);this.llhls&&(t=um(t,e)),this.state="HAVE_CURRENT_METADATA",this.request=this.vhs_.xhr({uri:t,withCredentials:this.withCredentials,requestType:"hls-playlist"},(i,s)=>{if(this.request){if(i)return this.playlistRequestError(this.request,this.media(),"HAVE_METADATA");this.haveMetadata({playlistString:this.request.responseText,url:this.media().uri,id:this.media().id})}})}playlistRequestError(e,t,i){const{uri:s,id:r}=t;this.request=null,i&&(this.state=i),this.error={playlist:this.main.playlists[r],status:e.status,message:`HLS playlist request error at URL: ${s}.`,responseText:e.responseText,code:e.status>=500?4:2,metadata:{errorType:M.Error.HlsPlaylistRequestError}},this.trigger("error")}parseManifest_({url:e,manifestString:t}){return sm({onwarn:({message:i})=>this.logger_(`m3u8-parser warn for ${e}: ${i}`),oninfo:({message:i})=>this.logger_(`m3u8-parser info for ${e}: ${i}`),manifestString:t,customTagParsers:this.customTagParsers,customTagMappers:this.customTagMappers,llhls:this.llhls})}haveMetadata({playlistString:e,playlistObject:t,url:i,id:s}){this.request=null,this.state="HAVE_METADATA";const r=t||this.parseManifest_({url:i,manifestString:e});r.lastRequest=Date.now(),Tc({playlist:r,uri:i,id:s});const a=wo(this.main,r);this.targetDuration=r.partTargetDuration||r.targetDuration,this.pendingMedia_=null,a?(this.main=a,this.media_=this.main.playlists[s]):this.trigger("playlistunchanged"),this.updateMediaUpdateTimeout_(Do(this.media(),!!a)),this.trigger("loadedplaylist")}dispose(){this.trigger("dispose"),this.stopRequest(),A().clearTimeout(this.mediaUpdateTimeout),A().clearTimeout(this.finalRenditionTimeout),this.dateRangesStorage_=new xc,this.off()}stopRequest(){if(this.request){const e=this.request;this.request=null,e.onreadystatechange=null,e.abort()}}media(e,t){if(!e)return this.media_;if(this.state==="HAVE_NOTHING")throw new Error("Cannot switch media playlist from "+this.state);if(typeof e=="string"){if(!this.main.playlists[e])throw new Error("Unknown playlist URI: "+e);e=this.main.playlists[e]}if(A().clearTimeout(this.finalRenditionTimeout),t){const a=(e.partTargetDuration||e.targetDuration)/2*1e3||5e3;this.finalRenditionTimeout=A().setTimeout(this.media.bind(this,e,!1),a);return}const i=this.state,s=!this.media_||e.id!==this.media_.id,r=this.main.playlists[e.id];if(r&&r.endList||e.endList&&e.segments.length){this.request&&(this.request.onreadystatechange=null,this.request.abort(),this.request=null),this.state="HAVE_METADATA",this.media_=e,s&&(this.trigger("mediachanging"),i==="HAVE_MAIN_MANIFEST"?this.trigger("loadedmetadata"):this.trigger("mediachange"));return}if(this.updateMediaUpdateTimeout_(Do(e,!0)),!!s){if(this.state="SWITCHING_MEDIA",this.request){if(e.resolvedUri===this.request.url)return;this.request.onreadystatechange=null,this.request.abort(),this.request=null}this.media_&&this.trigger("mediachanging"),this.pendingMedia_=e,this.request=this.vhs_.xhr({uri:e.resolvedUri,withCredentials:this.withCredentials,requestType:"hls-playlist"},(a,l)=>{if(this.request){if(e.lastRequest=Date.now(),e.resolvedUri=Ir(e.resolvedUri,l),a)return this.playlistRequestError(this.request,e,i);this.haveMetadata({playlistString:l.responseText,url:e.uri,id:e.id}),i==="HAVE_MAIN_MANIFEST"?this.trigger("loadedmetadata"):this.trigger("mediachange")}})}}pause(){this.mediaUpdateTimeout&&(A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null),this.stopRequest(),this.state==="HAVE_NOTHING"&&(this.started=!1),this.state==="SWITCHING_MEDIA"?this.media_?this.state="HAVE_METADATA":this.state="HAVE_MAIN_MANIFEST":this.state==="HAVE_CURRENT_METADATA"&&(this.state="HAVE_METADATA")}load(e){this.mediaUpdateTimeout&&(A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null);const t=this.media();if(e){const i=t?(t.partTargetDuration||t.targetDuration)/2*1e3:5e3;this.mediaUpdateTimeout=A().setTimeout(()=>{this.mediaUpdateTimeout=null,this.load()},i);return}if(!this.started){this.start();return}t&&!t.endList?this.trigger("mediaupdatetimeout"):this.trigger("loadedplaylist")}updateMediaUpdateTimeout_(e){this.mediaUpdateTimeout&&(A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null),!(!this.media()||this.media().endList)&&(this.mediaUpdateTimeout=A().setTimeout(()=>{this.mediaUpdateTimeout=null,this.trigger("mediaupdatetimeout"),this.updateMediaUpdateTimeout_(e)},e))}start(){if(this.started=!0,typeof this.src=="object"){this.src.uri||(this.src.uri=A().location.href),this.src.resolvedUri=this.src.uri,setTimeout(()=>{this.setupInitialPlaylist(this.src)},0);return}this.request=this.vhs_.xhr({uri:this.src,withCredentials:this.withCredentials,requestType:"hls-playlist"},(e,t)=>{if(!this.request)return;if(this.request=null,e)return this.error={status:t.status,message:`HLS playlist request error at URL: ${this.src}.`,responseText:t.responseText,code:2,metadata:{errorType:M.Error.HlsPlaylistRequestError}},this.state==="HAVE_NOTHING"&&(this.started=!1),this.trigger("error");this.src=Ir(this.src,t);const i=this.parseManifest_({manifestString:t.responseText,url:this.src});this.setupInitialPlaylist(i)})}srcUri(){return typeof this.src=="string"?this.src:this.src.uri}setupInitialPlaylist(e){if(this.state="HAVE_MAIN_MANIFEST",e.playlists){this.main=e,Cc(this.main,this.srcUri()),e.playlists.forEach(i=>{i.segments=jc(i),i.segments.forEach(s=>{Sc(s,i.resolvedUri)})}),this.trigger("loadedplaylist"),this.request||this.media(this.main.playlists[0]);return}const t=this.srcUri()||A().location.href;this.main=om(e,t),this.haveMetadata({playlistObject:e,url:t,id:this.main.playlists[0].id}),this.trigger("loadedmetadata")}updateOrDeleteClone(e,t){const i=this.main,s=e.ID;let r=i.playlists.length;for(;r--;){const a=i.playlists[r];if(a.attributes["PATHWAY-ID"]===s){const l=a.resolvedUri,h=a.id;if(t){const p=this.createCloneURI_(a.resolvedUri,e),g=Yn(s,p),_=this.createCloneAttributes_(s,a.attributes),w=this.createClonePlaylist_(a,g,e,_);i.playlists[r]=w,i.playlists[g]=w,i.playlists[p]=w}else i.playlists.splice(r,1);delete i.playlists[h],delete i.playlists[l]}}this.updateOrDeleteCloneMedia(e,t)}updateOrDeleteCloneMedia(e,t){const i=this.main,s=e.ID;["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(r=>{if(!(!i.mediaGroups[r]||!i.mediaGroups[r][s])){for(const a in i.mediaGroups[r])if(a===s){for(const l in i.mediaGroups[r][a])i.mediaGroups[r][a][l].playlists.forEach((p,g)=>{const _=i.playlists[p.id],w=_.id,D=_.resolvedUri;delete i.playlists[w],delete i.playlists[D]});delete i.mediaGroups[r][a]}}}),t&&this.createClonedMediaGroups_(e)}addClonePathway(e,t={}){const i=this.main,s=i.playlists.length,r=this.createCloneURI_(t.resolvedUri,e),a=Yn(e.ID,r),l=this.createCloneAttributes_(e.ID,t.attributes),h=this.createClonePlaylist_(t,a,e,l);i.playlists[s]=h,i.playlists[a]=h,i.playlists[r]=h,this.createClonedMediaGroups_(e)}createClonedMediaGroups_(e){const t=e.ID,i=e["BASE-ID"],s=this.main;["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(r=>{if(!(!s.mediaGroups[r]||s.mediaGroups[r][t]))for(const a in s.mediaGroups[r]){if(a===i)s.mediaGroups[r][t]={};else continue;for(const l in s.mediaGroups[r][a]){const h=s.mediaGroups[r][a][l];s.mediaGroups[r][t][l]=(0,_e.A)({},h);const p=s.mediaGroups[r][t][l],g=this.createCloneURI_(h.resolvedUri,e);p.resolvedUri=g,p.uri=g,p.playlists=[],h.playlists.forEach((_,w)=>{const D=s.playlists[_.id],C=Ec(r,t,l),I=Yn(t,C);if(D&&!s.playlists[I]){const R=this.createClonePlaylist_(D,I,e),q=R.resolvedUri;s.playlists[I]=R,s.playlists[q]=R}p.playlists[w]=this.createClonePlaylist_(_,I,e)})}}})}createClonePlaylist_(e,t,i,s){const r=this.createCloneURI_(e.resolvedUri,i),a={resolvedUri:r,uri:r,id:t};return e.segments&&(a.segments=[]),s&&(a.attributes=s),Ge(e,a)}createCloneURI_(e,t){const i=new URL(e);i.hostname=t["URI-REPLACEMENT"].HOST;const s=t["URI-REPLACEMENT"].PARAMS;for(const r of Object.keys(s))i.searchParams.set(r,s[r]);return i.href}createCloneAttributes_(e,t){const i={"PATHWAY-ID":e};return["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(s=>{t[s]&&(i[s]=e)}),i}getKeyIdSet(e){if(e.contentProtection){const t=new Set;for(const i in e.contentProtection){const s=e.contentProtection[i].attributes.keyId;s&&t.add(s.toLowerCase())}return t}}}const ko=function(n,e,t,i){const s=n.responseType==="arraybuffer"?n.response:n.responseText;!e&&s&&(n.responseTime=Date.now(),n.roundTripTime=n.responseTime-n.requestTime,n.bytesReceived=s.byteLength||s.length,n.bandwidth||(n.bandwidth=Math.floor(n.bytesReceived/n.roundTripTime*8*1e3))),t.headers&&(n.responseHeaders=t.headers),e&&e.code==="ETIMEDOUT"&&(n.timedout=!0),!e&&!n.aborted&&t.statusCode!==200&&t.statusCode!==206&&t.statusCode!==0&&(e=new Error("XHR Failed with a response of: "+(n&&(s||n.responseText)))),i(e,n)},hm=(n,e)=>{if(!n||!n.size)return;let t=e;return n.forEach(i=>{t=i(t)}),t},fm=(n,e,t,i)=>{!n||!n.size||n.forEach(s=>{s(e,t,i)})},wc=function(){const n=function e(t,i){t=Ge({timeout:45e3},t);const s=e.beforeRequest||M.Vhs.xhr.beforeRequest,r=e._requestCallbackSet||M.Vhs.xhr._requestCallbackSet||new Set,a=e._responseCallbackSet||M.Vhs.xhr._responseCallbackSet;s&&typeof s=="function"&&(M.log.warn("beforeRequest is deprecated, use onRequest instead."),r.add(s));const l=M.Vhs.xhr.original===!0?M.xhr:M.Vhs.xhr,h=hm(r,t);r.delete(s);const p=l(h||t,function(_,w){return fm(a,p,_,w),ko(p,_,w,i)}),g=p.abort;return p.abort=function(){return p.aborted=!0,g.apply(p,arguments)},p.uri=t.uri,p.requestTime=Date.now(),p};return n.original=!0,n},pm=function(n){let e;const t=n.offset;return typeof n.offset=="bigint"||typeof n.length=="bigint"?e=A().BigInt(n.offset)+A().BigInt(n.length)-A().BigInt(1):e=n.offset+n.length-1,"bytes="+t+"-"+e},Io=function(n){const e={};return n.byterange&&(e.Range=pm(n.byterange)),e},mm=function(n,e){return n.start(e)+"-"+n.end(e)},gm=function(n,e){const t=n.toString(16);return"00".substring(0,2-t.length)+t+(e%2?" ":"")},vm=function(n){return n>=32&&n<126?String.fromCharCode(n):"."},Dc=function(n){const e={};return Object.keys(n).forEach(t=>{const i=n[t];pi(i)?e[t]={bytes:i.buffer,byteOffset:i.byteOffset,byteLength:i.byteLength}:e[t]=i}),e},Lr=function(n){const e=n.byterange||{length:1/0,offset:0};return[e.length,e.offset,n.resolvedUri].join(",")},kc=function(n){return n.resolvedUri},Ic=n=>{const e=Array.prototype.slice.call(n),t=16;let i="",s,r;for(let a=0;a<e.length/t;a++)s=e.slice(a*t,a*t+t).map(gm).join(""),r=e.slice(a*t,a*t+t).map(vm).join(""),i+=s+" "+r+`
`;return i};var Am=Object.freeze({__proto__:null,createTransferableMessage:Dc,initSegmentId:Lr,segmentKeyId:kc,hexDump:Ic,tagDump:({bytes:n})=>Ic(n),textRanges:n=>{let e="",t;for(t=0;t<n.length;t++)e+=mm(n,t)+" ";return e}});const Pc=.25,ym=(n,e)=>{if(!e.dateTimeObject)return null;const t=e.videoTimingInfo.transmuxerPrependedSeconds,s=e.videoTimingInfo.transmuxedPresentationStart+t,r=n-s;return new Date(e.dateTimeObject.getTime()+r*1e3)},_m=n=>n.transmuxedPresentationEnd-n.transmuxedPresentationStart-n.transmuxerPrependedSeconds,bm=(n,e)=>{let t;try{t=new Date(n)}catch(h){return null}if(!e||!e.segments||e.segments.length===0)return null;let i=e.segments[0];if(t<new Date(i.dateTimeObject))return null;for(let h=0;h<e.segments.length-1;h++){i=e.segments[h];const p=new Date(e.segments[h+1].dateTimeObject);if(t<p)break}const s=e.segments[e.segments.length-1],r=s.dateTimeObject,a=s.videoTimingInfo?_m(s.videoTimingInfo):s.duration+s.duration*Pc,l=new Date(r.getTime()+a*1e3);return t>l?null:(t>new Date(r)&&(i=s),{segment:i,estimatedStart:i.videoTimingInfo?i.videoTimingInfo.transmuxedPresentationStart:Ht.duration(e,e.mediaSequence+e.segments.indexOf(i)),type:i.videoTimingInfo?"accurate":"estimate"})},Em=(n,e)=>{if(!e||!e.segments||e.segments.length===0)return null;let t=0,i;for(let r=0;r<e.segments.length&&(i=e.segments[r],t=i.videoTimingInfo?i.videoTimingInfo.transmuxedPresentationEnd:t+i.duration,!(n<=t));r++);const s=e.segments[e.segments.length-1];if(s.videoTimingInfo&&s.videoTimingInfo.transmuxedPresentationEnd<n)return null;if(n>t){if(n>t+s.duration*Pc)return null;i=s}return{segment:i,estimatedStart:i.videoTimingInfo?i.videoTimingInfo.transmuxedPresentationStart:t-i.duration,type:i.videoTimingInfo?"accurate":"estimate"}},Tm=(n,e)=>{let t,i;try{t=new Date(n),i=new Date(e)}catch(a){}const s=t.getTime();return(i.getTime()-s)/1e3},Cm=n=>{if(!n.segments||n.segments.length===0)return!1;for(let e=0;e<n.segments.length;e++)if(!n.segments[e].dateTimeObject)return!1;return!0},xm=({playlist:n,time:e=void 0,callback:t})=>{if(!t)throw new Error("getProgramTime: callback must be provided");if(!n||e===void 0)return t({message:"getProgramTime: playlist and time must be provided"});const i=Em(e,n);if(!i)return t({message:"valid programTime was not found"});if(i.type==="estimate")return t({message:"Accurate programTime could not be determined. Please seek to e.seekTime and try again",seekTime:i.estimatedStart});const s={mediaSeconds:e},r=ym(e,i.segment);return r&&(s.programDateTime=r.toISOString()),t(null,s)},Oc=({programTime:n,playlist:e,retryCount:t=2,seekTo:i,pauseAfterSeek:s=!0,tech:r,callback:a})=>{if(!a)throw new Error("seekToProgramTime: callback must be provided");if(typeof n=="undefined"||!e||!i)return a({message:"seekToProgramTime: programTime, seekTo and playlist must be provided"});if(!e.endList&&!r.hasStarted_)return a({message:"player must be playing a live stream to start buffering"});if(!Cm(e))return a({message:"programDateTime tags must be provided in the manifest "+e.resolvedUri});const l=bm(n,e);if(!l)return a({message:`${n} was not found in the stream`});const h=l.segment,p=Tm(h.dateTimeObject,n);if(l.type==="estimate"){if(t===0)return a({message:`${n} is not buffered yet. Try again`});i(l.estimatedStart+p),r.one("seeked",()=>{Oc({programTime:n,playlist:e,retryCount:t-1,seekTo:i,pauseAfterSeek:s,tech:r,callback:a})});return}const g=h.start+p,_=()=>a(null,r.currentTime());r.one("seeked",_),s&&r.pause(),i(g)},Po=(n,e)=>{if(n.readyState===4)return e()},Sm=(n,e,t)=>{let i=[],s,r=!1;const a=function(g,_,w,D){return _.abort(),r=!0,t(g,_,w,D)},l=function(g,_){if(r)return;if(g)return a(g,_,"",i);const w=_.responseText.substring(i&&i.byteLength||0,_.responseText.length);if(i=Bi(i,Ws(w,!0)),s=s||cs(i),i.length<10||s&&i.length<s+2)return Po(_,()=>a(g,_,"",i));const D=Ea(i);return D==="ts"&&i.length<188?Po(_,()=>a(g,_,"",i)):!D&&i.length<376?Po(_,()=>a(g,_,"",i)):a(null,_,D,i)},p=e({uri:n,beforeSend(g){g.overrideMimeType("text/plain; charset=x-user-defined"),g.addEventListener("progress",function({total:_,loaded:w}){return ko(g,null,{statusCode:g.status},l)})}},function(g,_){return ko(p,g,_,l)});return p},{EventTarget:jm}=M,Lc=function(n,e){if(!Bc(n,e)||n.sidx&&e.sidx&&(n.sidx.offset!==e.sidx.offset||n.sidx.length!==e.sidx.length))return!1;if(!n.sidx&&e.sidx||n.sidx&&!e.sidx||n.segments&&!e.segments||!n.segments&&e.segments)return!1;if(!n.segments&&!e.segments)return!0;for(let t=0;t<n.segments.length;t++){const i=n.segments[t],s=e.segments[t];if(i.uri!==s.uri)return!1;if(!i.byterange&&!s.byterange)continue;const r=i.byterange,a=s.byterange;if(r&&!a||!r&&a||r.offset!==a.offset||r.length!==a.length)return!1}return!0},Bm=(n,e,t,i)=>{const s=i.attributes.NAME||t;return`placeholder-uri-${n}-${e}-${s}`},wm=({mainXml:n,srcUrl:e,clientOffset:t,sidxMapping:i,previousManifest:s})=>{const r=sf(n,{manifestUri:e,clientOffset:t,sidxMapping:i,previousManifest:s});return Cc(r,e,Bm),r},Dm=(n,e)=>{Kn(n,(t,i,s,r)=>{r in e.mediaGroups[i][s]||delete n.mediaGroups[i][s][r]})},km=(n,e,t)=>{let i=!0,s=Ge(n,{duration:e.duration,minimumUpdatePeriod:e.minimumUpdatePeriod,timelineStarts:e.timelineStarts});for(let r=0;r<e.playlists.length;r++){const a=e.playlists[r];if(a.sidx){const h=Pt(a.sidx);t&&t[h]&&t[h].sidx&&ke(a,t[h].sidx,a.sidx.resolvedUri)}const l=wo(s,a,Lc);l&&(s=l,i=!1)}return Kn(e,(r,a,l,h)=>{if(r.playlists&&r.playlists.length){const p=r.playlists[0].id,g=wo(s,r.playlists[0],Lc);g&&(s=g,h in s.mediaGroups[a][l]||(s.mediaGroups[a][l][h]=r),s.mediaGroups[a][l][h].playlists[0]=s.playlists[p],i=!1)}}),Dm(s,e),e.minimumUpdatePeriod!==n.minimumUpdatePeriod&&(i=!1),i?null:s},Im=(n,e)=>(!n.map&&!e.map||!!(n.map&&e.map&&n.map.byterange.offset===e.map.byterange.offset&&n.map.byterange.length===e.map.byterange.length))&&n.uri===e.uri&&n.byterange.offset===e.byterange.offset&&n.byterange.length===e.byterange.length,Rc=(n,e)=>{const t={};for(const i in n){const r=n[i].sidx;if(r){const a=Pt(r);if(!e[a])break;const l=e[a].sidxInfo;Im(l,r)&&(t[a]=e[a])}}return t},Pm=(n,e)=>{let i=Rc(n.playlists,e);return Kn(n,(s,r,a,l)=>{if(s.playlists&&s.playlists.length){const h=s.playlists;i=Ge(i,Rc(h,e))}}),i};class Oo extends jm{constructor(e,t,i={},s){super(),this.mainPlaylistLoader_=s||this,s||(this.isMain_=!0);const{withCredentials:r=!1}=i;if(this.vhs_=t,this.withCredentials=r,this.addMetadataToTextTrack=i.addMetadataToTextTrack,!e)throw new Error("A non-empty playlist URL or object is required");this.on("minimumUpdatePeriod",()=>{this.refreshXml_()}),this.on("mediaupdatetimeout",()=>{this.refreshMedia_(this.media().id)}),this.state="HAVE_NOTHING",this.loadedPlaylists_={},this.logger_=si("DashPlaylistLoader"),this.isMain_?(this.mainPlaylistLoader_.srcUrl=e,this.mainPlaylistLoader_.sidxMapping_={}):this.childPlaylist_=e}requestErrored_(e,t,i){if(!this.request)return!0;if(this.request=null,e)return this.error=typeof e=="object"&&!(e instanceof Error)?e:{status:t.status,message:"DASH request error at URL: "+t.uri,response:t.response,code:2,metadata:e.metadata},i&&(this.state=i),this.trigger("error"),!0}addSidxSegments_(e,t,i){const s=e.sidx&&Pt(e.sidx);if(!e.sidx||!s||this.mainPlaylistLoader_.sidxMapping_[s]){this.mediaRequest_=A().setTimeout(()=>i(!1),0);return}const r=Ir(e.sidx.resolvedUri),a=(l,h)=>{if(this.requestErrored_(l,h,t))return;const p=this.mainPlaylistLoader_.sidxMapping_;let g;try{g=of()(pe(h.response).subarray(8))}catch(_){_.metadata={errorType:M.Error.DashManifestSidxParsingError},this.requestErrored_(_,h,t);return}return p[s]={sidxInfo:e.sidx,sidx:g},ke(e,g,e.sidx.resolvedUri),i(!0)};this.request=Sm(r,this.vhs_.xhr,(l,h,p,g)=>{if(l)return a(l,h);if(!p||p!=="mp4"){const D=p||"unknown";return a({status:h.status,message:`Unsupported ${D} container type for sidx segment at URL: ${r}`,response:"",playlist:e,internal:!0,playlistExclusionDuration:1/0,code:2,metadata:{errorType:M.Error.UnsupportedSidxContainer,sidxContainer:D}},h)}const{offset:_,length:w}=e.sidx.byterange;if(g.length>=w+_)return a(l,{response:g.subarray(_,_+w),status:h.status,uri:h.uri});this.request=this.vhs_.xhr({uri:r,responseType:"arraybuffer",headers:Io({byterange:e.sidx.byterange})},a)})}dispose(){this.trigger("dispose"),this.stopRequest(),this.loadedPlaylists_={},A().clearTimeout(this.minimumUpdatePeriodTimeout_),A().clearTimeout(this.mediaRequest_),A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null,this.mediaRequest_=null,this.minimumUpdatePeriodTimeout_=null,this.mainPlaylistLoader_.createMupOnMedia_&&(this.off("loadedmetadata",this.mainPlaylistLoader_.createMupOnMedia_),this.mainPlaylistLoader_.createMupOnMedia_=null),this.off()}hasPendingRequest(){return this.request||this.mediaRequest_}stopRequest(){if(this.request){const e=this.request;this.request=null,e.onreadystatechange=null,e.abort()}}media(e){if(!e)return this.media_;if(this.state==="HAVE_NOTHING")throw new Error("Cannot switch media playlist from "+this.state);const t=this.state;if(typeof e=="string"){if(!this.mainPlaylistLoader_.main.playlists[e])throw new Error("Unknown playlist URI: "+e);e=this.mainPlaylistLoader_.main.playlists[e]}const i=!this.media_||e.id!==this.media_.id;if(i&&this.loadedPlaylists_[e.id]&&this.loadedPlaylists_[e.id].endList){this.state="HAVE_METADATA",this.media_=e,i&&(this.trigger("mediachanging"),this.trigger("mediachange"));return}i&&(this.media_&&this.trigger("mediachanging"),this.addSidxSegments_(e,t,s=>{this.haveMetadata({startingState:t,playlist:e})}))}haveMetadata({startingState:e,playlist:t}){this.state="HAVE_METADATA",this.loadedPlaylists_[t.id]=t,this.mediaRequest_=null,this.refreshMedia_(t.id),e==="HAVE_MAIN_MANIFEST"?this.trigger("loadedmetadata"):this.trigger("mediachange")}pause(){this.mainPlaylistLoader_.createMupOnMedia_&&(this.off("loadedmetadata",this.mainPlaylistLoader_.createMupOnMedia_),this.mainPlaylistLoader_.createMupOnMedia_=null),this.stopRequest(),A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null,this.isMain_&&(A().clearTimeout(this.mainPlaylistLoader_.minimumUpdatePeriodTimeout_),this.mainPlaylistLoader_.minimumUpdatePeriodTimeout_=null),this.state==="HAVE_NOTHING"&&(this.started=!1)}load(e){A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null;const t=this.media();if(e){const i=t?t.targetDuration/2*1e3:5e3;this.mediaUpdateTimeout=A().setTimeout(()=>this.load(),i);return}if(!this.started){this.start();return}t&&!t.endList?(this.isMain_&&!this.minimumUpdatePeriodTimeout_&&(this.trigger("minimumUpdatePeriod"),this.updateMinimumUpdatePeriodTimeout_()),this.trigger("mediaupdatetimeout")):this.trigger("loadedplaylist")}start(){if(this.started=!0,!this.isMain_){this.mediaRequest_=A().setTimeout(()=>this.haveMain_(),0);return}this.requestMain_((e,t)=>{this.haveMain_(),!this.hasPendingRequest()&&!this.media_&&this.media(this.mainPlaylistLoader_.main.playlists[0])})}requestMain_(e){this.request=this.vhs_.xhr({uri:this.mainPlaylistLoader_.srcUrl,withCredentials:this.withCredentials,requestType:"dash-manifest"},(t,i)=>{if(this.requestErrored_(t,i)){this.state==="HAVE_NOTHING"&&(this.started=!1);return}const s=i.responseText!==this.mainPlaylistLoader_.mainXml_;if(this.mainPlaylistLoader_.mainXml_=i.responseText,i.responseHeaders&&i.responseHeaders.date?this.mainLoaded_=Date.parse(i.responseHeaders.date):this.mainLoaded_=Date.now(),this.mainPlaylistLoader_.srcUrl=Ir(this.mainPlaylistLoader_.srcUrl,i),s){this.handleMain_(),this.syncClientServerClock_(()=>e(i,s));return}return e(i,s)})}syncClientServerClock_(e){const t=rf(this.mainPlaylistLoader_.mainXml_);if(t===null)return this.mainPlaylistLoader_.clientOffset_=this.mainLoaded_-Date.now(),e();if(t.method==="DIRECT")return this.mainPlaylistLoader_.clientOffset_=t.value-Date.now(),e();this.request=this.vhs_.xhr({uri:zt(this.mainPlaylistLoader_.srcUrl,t.value),method:t.method,withCredentials:this.withCredentials,requestType:"dash-clock-sync"},(i,s)=>{if(!this.request)return;if(i)return this.mainPlaylistLoader_.clientOffset_=this.mainLoaded_-Date.now(),e();let r;t.method==="HEAD"?!s.responseHeaders||!s.responseHeaders.date?r=this.mainLoaded_:r=Date.parse(s.responseHeaders.date):r=Date.parse(s.responseText),this.mainPlaylistLoader_.clientOffset_=r-Date.now(),e()})}haveMain_(){this.state="HAVE_MAIN_MANIFEST",this.isMain_?this.trigger("loadedplaylist"):this.media_||this.media(this.childPlaylist_)}handleMain_(){this.mediaRequest_=null;const e=this.mainPlaylistLoader_.main;let t=wm({mainXml:this.mainPlaylistLoader_.mainXml_,srcUrl:this.mainPlaylistLoader_.srcUrl,clientOffset:this.mainPlaylistLoader_.clientOffset_,sidxMapping:this.mainPlaylistLoader_.sidxMapping_,previousManifest:e});e&&(t=km(e,t,this.mainPlaylistLoader_.sidxMapping_)),this.mainPlaylistLoader_.main=t||e;const i=this.mainPlaylistLoader_.main.locations&&this.mainPlaylistLoader_.main.locations[0];return i&&i!==this.mainPlaylistLoader_.srcUrl&&(this.mainPlaylistLoader_.srcUrl=i),(!e||t&&t.minimumUpdatePeriod!==e.minimumUpdatePeriod)&&this.updateMinimumUpdatePeriodTimeout_(),this.addEventStreamToMetadataTrack_(t),!!t}updateMinimumUpdatePeriodTimeout_(){const e=this.mainPlaylistLoader_;e.createMupOnMedia_&&(e.off("loadedmetadata",e.createMupOnMedia_),e.createMupOnMedia_=null),e.minimumUpdatePeriodTimeout_&&(A().clearTimeout(e.minimumUpdatePeriodTimeout_),e.minimumUpdatePeriodTimeout_=null);let t=e.main&&e.main.minimumUpdatePeriod;if(t===0&&(e.media()?t=e.media().targetDuration*1e3:(e.createMupOnMedia_=e.updateMinimumUpdatePeriodTimeout_,e.one("loadedmetadata",e.createMupOnMedia_))),typeof t!="number"||t<=0){t<0&&this.logger_(`found invalid minimumUpdatePeriod of ${t}, not setting a timeout`);return}this.createMUPTimeout_(t)}createMUPTimeout_(e){const t=this.mainPlaylistLoader_;t.minimumUpdatePeriodTimeout_=A().setTimeout(()=>{t.minimumUpdatePeriodTimeout_=null,t.trigger("minimumUpdatePeriod"),t.createMUPTimeout_(e)},e)}refreshXml_(){this.requestMain_((e,t)=>{t&&(this.media_&&(this.media_=this.mainPlaylistLoader_.main.playlists[this.media_.id]),this.mainPlaylistLoader_.sidxMapping_=Pm(this.mainPlaylistLoader_.main,this.mainPlaylistLoader_.sidxMapping_),this.addSidxSegments_(this.media(),this.state,i=>{this.refreshMedia_(this.media().id)}))})}refreshMedia_(e){if(!e)throw new Error("refreshMedia_ must take a media id");this.media_&&this.isMain_&&this.handleMain_();const t=this.mainPlaylistLoader_.main.playlists,i=!this.media_||this.media_!==t[e];if(i?this.media_=t[e]:this.trigger("playlistunchanged"),!this.mediaUpdateTimeout){const s=()=>{this.media().endList||(this.mediaUpdateTimeout=A().setTimeout(()=>{this.trigger("mediaupdatetimeout"),s()},Do(this.media(),!!i)))};s()}this.trigger("loadedplaylist")}addEventStreamToMetadataTrack_(e){if(e&&this.mainPlaylistLoader_.main.eventStream){const t=this.mainPlaylistLoader_.main.eventStream.map(i=>({cueTime:i.start,frames:[{data:i.messageData}]}));this.addMetadataToTextTrack("EventStream",t,this.mainPlaylistLoader_.main.duration)}}getKeyIdSet(e){if(e.contentProtection){const t=new Set;for(const i in e.contentProtection){const s=e.contentProtection[i].attributes["cenc:default_KID"];s&&t.add(s.replace(/-/g,"").toLowerCase())}return t}}}var jt={GOAL_BUFFER_LENGTH:30,MAX_GOAL_BUFFER_LENGTH:60,BACK_BUFFER_LENGTH:30,GOAL_BUFFER_LENGTH_RATE:1,INITIAL_BANDWIDTH:4194304,BANDWIDTH_VARIANCE:1.2,BUFFER_LOW_WATER_LINE:0,MAX_BUFFER_LOW_WATER_LINE:30,EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE:16,BUFFER_LOW_WATER_LINE_RATE:1,BUFFER_HIGH_WATER_LINE:30};const Om=n=>{const e=new Uint8Array(new ArrayBuffer(n.length));for(let t=0;t<n.length;t++)e[t]=n.charCodeAt(t);return e.buffer},Mc=function(n){return n.on=n.addEventListener,n.off=n.removeEventListener,n},Lm=function(n){try{return URL.createObjectURL(new Blob([n],{type:"application/javascript"}))}catch(e){const t=new BlobBuilder;return t.append(n),URL.createObjectURL(t.getBlob())}},Nc=function(n){return function(){const e=Lm(n),t=Mc(new Worker(e));t.objURL=e;const i=t.terminate;return t.on=t.addEventListener,t.off=t.removeEventListener,t.terminate=function(){return URL.revokeObjectURL(e),i.call(this)},t}},Uc=function(n){return`var browserWorkerPolyFill = ${Mc.toString()};
browserWorkerPolyFill(self);
`+n},Fc=function(n){return n.toString().replace(/^function.+?{/,"").slice(0,-1)},Rm=Uc(Fc(function(){var n=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof z.g!="undefined"?z.g:typeof self!="undefined"?self:{},e=function(){this.init=function(){var o={};this.on=function(u,d){o[u]||(o[u]=[]),o[u]=o[u].concat(d)},this.off=function(u,d){var c;return o[u]?(c=o[u].indexOf(d),o[u]=o[u].slice(),o[u].splice(c,1),c>-1):!1},this.trigger=function(u){var d,c,f,m;if(d=o[u],!!d)if(arguments.length===2)for(f=d.length,c=0;c<f;++c)d[c].call(this,arguments[1]);else{for(m=[],c=arguments.length,c=1;c<arguments.length;++c)m.push(arguments[c]);for(f=d.length,c=0;c<f;++c)d[c].apply(this,m)}},this.dispose=function(){o={}}}};e.prototype.pipe=function(o){return this.on("data",function(u){o.push(u)}),this.on("done",function(u){o.flush(u)}),this.on("partialdone",function(u){o.partialFlush(u)}),this.on("endedtimeline",function(u){o.endTimeline(u)}),this.on("reset",function(u){o.reset(u)}),o},e.prototype.push=function(o){this.trigger("data",o)},e.prototype.flush=function(o){this.trigger("done",o)},e.prototype.partialFlush=function(o){this.trigger("partialdone",o)},e.prototype.endTimeline=function(o){this.trigger("endedtimeline",o)},e.prototype.reset=function(o){this.trigger("reset",o)};var t=e,i=Math.pow(2,32),s=function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),d;return u.getBigUint64?(d=u.getBigUint64(0),d<Number.MAX_SAFE_INTEGER?Number(d):d):u.getUint32(0)*i+u.getUint32(4)},r={getUint64:s,MAX_UINT32:i},a=r.MAX_UINT32,l,h,p,g,_,w,D,C,I,R,q,L,X,H,P,ce,Ee,Ve,He,mt,kt,gt,Be,Je,Si,Ni,Yi,hn,fn,pn,mn,gn,qr,Dd,kd,Id;(function(){var o;if(Be={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],mvex:[],mvhd:[],pasp:[],sdtp:[],smhd:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],styp:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[]},typeof Uint8Array!="undefined"){for(o in Be)Be.hasOwnProperty(o)&&(Be[o]=[o.charCodeAt(0),o.charCodeAt(1),o.charCodeAt(2),o.charCodeAt(3)]);Je=new Uint8Array([105,115,111,109]),Ni=new Uint8Array([97,118,99,49]),Si=new Uint8Array([0,0,0,1]),Yi=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),hn=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0]),fn={video:Yi,audio:hn},gn=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),mn=new Uint8Array([0,0,0,0,0,0,0,0]),qr=new Uint8Array([0,0,0,0,0,0,0,0]),Dd=qr,kd=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),Id=qr,pn=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0])}})(),l=function(o){var u=[],d=0,c,f,m;for(c=1;c<arguments.length;c++)u.push(arguments[c]);for(c=u.length;c--;)d+=u[c].byteLength;for(f=new Uint8Array(d+8),m=new DataView(f.buffer,f.byteOffset,f.byteLength),m.setUint32(0,f.byteLength),f.set(o,4),c=0,d=8;c<u.length;c++)f.set(u[c],d),d+=u[c].byteLength;return f},h=function(){return l(Be.dinf,l(Be.dref,gn))},p=function(o){return l(Be.esds,new Uint8Array([0,0,0,0,3,25,0,0,0,4,17,64,21,0,6,0,0,0,218,192,0,0,218,192,5,2,o.audioobjecttype<<3|o.samplingfrequencyindex>>>1,o.samplingfrequencyindex<<7|o.channelcount<<3,6,1,2]))},g=function(){return l(Be.ftyp,Je,Si,Je,Ni)},ce=function(o){return l(Be.hdlr,fn[o])},_=function(o){return l(Be.mdat,o)},P=function(o){var u=new Uint8Array([0,0,0,0,0,0,0,2,0,0,0,3,0,1,95,144,o.duration>>>24&255,o.duration>>>16&255,o.duration>>>8&255,o.duration&255,85,196,0,0]);return o.samplerate&&(u[12]=o.samplerate>>>24&255,u[13]=o.samplerate>>>16&255,u[14]=o.samplerate>>>8&255,u[15]=o.samplerate&255),l(Be.mdhd,u)},H=function(o){return l(Be.mdia,P(o),ce(o.type),D(o))},w=function(o){return l(Be.mfhd,new Uint8Array([0,0,0,0,(o&4278190080)>>24,(o&16711680)>>16,(o&65280)>>8,o&255]))},D=function(o){return l(Be.minf,o.type==="video"?l(Be.vmhd,pn):l(Be.smhd,mn),h(),Ve(o))},C=function(o,u){for(var d=[],c=u.length;c--;)d[c]=mt(u[c]);return l.apply(null,[Be.moof,w(o)].concat(d))},I=function(o){for(var u=o.length,d=[];u--;)d[u]=L(o[u]);return l.apply(null,[Be.moov,q(4294967295)].concat(d).concat(R(o)))},R=function(o){for(var u=o.length,d=[];u--;)d[u]=kt(o[u]);return l.apply(null,[Be.mvex].concat(d))},q=function(o){var u=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,2,0,1,95,144,(o&4278190080)>>24,(o&16711680)>>16,(o&65280)>>8,o&255,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255]);return l(Be.mvhd,u)},Ee=function(o){var u=o.samples||[],d=new Uint8Array(4+u.length),c,f;for(f=0;f<u.length;f++)c=u[f].flags,d[f+4]=c.dependsOn<<4|c.isDependedOn<<2|c.hasRedundancy;return l(Be.sdtp,d)},Ve=function(o){return l(Be.stbl,He(o),l(Be.stts,Id),l(Be.stsc,Dd),l(Be.stsz,kd),l(Be.stco,qr))},function(){var o,u;He=function(d){return l(Be.stsd,new Uint8Array([0,0,0,0,0,0,0,1]),d.type==="video"?o(d):u(d))},o=function(d){var c=d.sps||[],f=d.pps||[],m=[],b=[],E,S;for(E=0;E<c.length;E++)m.push((c[E].byteLength&65280)>>>8),m.push(c[E].byteLength&255),m=m.concat(Array.prototype.slice.call(c[E]));for(E=0;E<f.length;E++)b.push((f[E].byteLength&65280)>>>8),b.push(f[E].byteLength&255),b=b.concat(Array.prototype.slice.call(f[E]));if(S=[Be.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,(d.width&65280)>>8,d.width&255,(d.height&65280)>>8,d.height&255,0,72,0,0,0,72,0,0,0,0,0,0,0,1,19,118,105,100,101,111,106,115,45,99,111,110,116,114,105,98,45,104,108,115,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),l(Be.avcC,new Uint8Array([1,d.profileIdc,d.profileCompatibility,d.levelIdc,255].concat([c.length],m,[f.length],b))),l(Be.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192]))],d.sarRatio){var j=d.sarRatio[0],k=d.sarRatio[1];S.push(l(Be.pasp,new Uint8Array([(j&4278190080)>>24,(j&16711680)>>16,(j&65280)>>8,j&255,(k&4278190080)>>24,(k&16711680)>>16,(k&65280)>>8,k&255])))}return l.apply(null,S)},u=function(d){return l(Be.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,(d.channelcount&65280)>>8,d.channelcount&255,(d.samplesize&65280)>>8,d.samplesize&255,0,0,0,0,(d.samplerate&65280)>>8,d.samplerate&255,0,0]),p(d))}}(),X=function(o){var u=new Uint8Array([0,0,0,7,0,0,0,0,0,0,0,0,(o.id&4278190080)>>24,(o.id&16711680)>>16,(o.id&65280)>>8,o.id&255,0,0,0,0,(o.duration&4278190080)>>24,(o.duration&16711680)>>16,(o.duration&65280)>>8,o.duration&255,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,(o.width&65280)>>8,o.width&255,0,0,(o.height&65280)>>8,o.height&255,0,0]);return l(Be.tkhd,u)},mt=function(o){var u,d,c,f,m,b,E;return u=l(Be.tfhd,new Uint8Array([0,0,0,58,(o.id&4278190080)>>24,(o.id&16711680)>>16,(o.id&65280)>>8,o.id&255,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0])),b=Math.floor(o.baseMediaDecodeTime/a),E=Math.floor(o.baseMediaDecodeTime%a),d=l(Be.tfdt,new Uint8Array([1,0,0,0,b>>>24&255,b>>>16&255,b>>>8&255,b&255,E>>>24&255,E>>>16&255,E>>>8&255,E&255])),m=92,o.type==="audio"?(c=gt(o,m),l(Be.traf,u,d,c)):(f=Ee(o),c=gt(o,f.length+m),l(Be.traf,u,d,c,f))},L=function(o){return o.duration=o.duration||4294967295,l(Be.trak,X(o),H(o))},kt=function(o){var u=new Uint8Array([0,0,0,0,(o.id&4278190080)>>24,(o.id&16711680)>>16,(o.id&65280)>>8,o.id&255,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]);return o.type!=="video"&&(u[u.length-1]=0),l(Be.trex,u)},function(){var o,u,d;d=function(c,f){var m=0,b=0,E=0,S=0;return c.length&&(c[0].duration!==void 0&&(m=1),c[0].size!==void 0&&(b=2),c[0].flags!==void 0&&(E=4),c[0].compositionTimeOffset!==void 0&&(S=8)),[0,0,m|b|E|S,1,(c.length&4278190080)>>>24,(c.length&16711680)>>>16,(c.length&65280)>>>8,c.length&255,(f&4278190080)>>>24,(f&16711680)>>>16,(f&65280)>>>8,f&255]},u=function(c,f){var m,b,E,S,j,k;for(S=c.samples||[],f+=20+16*S.length,E=d(S,f),b=new Uint8Array(E.length+S.length*16),b.set(E),m=E.length,k=0;k<S.length;k++)j=S[k],b[m++]=(j.duration&4278190080)>>>24,b[m++]=(j.duration&16711680)>>>16,b[m++]=(j.duration&65280)>>>8,b[m++]=j.duration&255,b[m++]=(j.size&4278190080)>>>24,b[m++]=(j.size&16711680)>>>16,b[m++]=(j.size&65280)>>>8,b[m++]=j.size&255,b[m++]=j.flags.isLeading<<2|j.flags.dependsOn,b[m++]=j.flags.isDependedOn<<6|j.flags.hasRedundancy<<4|j.flags.paddingValue<<1|j.flags.isNonSyncSample,b[m++]=j.flags.degradationPriority&61440,b[m++]=j.flags.degradationPriority&15,b[m++]=(j.compositionTimeOffset&4278190080)>>>24,b[m++]=(j.compositionTimeOffset&16711680)>>>16,b[m++]=(j.compositionTimeOffset&65280)>>>8,b[m++]=j.compositionTimeOffset&255;return l(Be.trun,b)},o=function(c,f){var m,b,E,S,j,k;for(S=c.samples||[],f+=20+8*S.length,E=d(S,f),m=new Uint8Array(E.length+S.length*8),m.set(E),b=E.length,k=0;k<S.length;k++)j=S[k],m[b++]=(j.duration&4278190080)>>>24,m[b++]=(j.duration&16711680)>>>16,m[b++]=(j.duration&65280)>>>8,m[b++]=j.duration&255,m[b++]=(j.size&4278190080)>>>24,m[b++]=(j.size&16711680)>>>16,m[b++]=(j.size&65280)>>>8,m[b++]=j.size&255;return l(Be.trun,m)},gt=function(c,f){return c.type==="audio"?o(c,f):u(c,f)}}();var y0={ftyp:g,mdat:_,moof:C,moov:I,initSegment:function(o){var u=g(),d=I(o),c;return c=new Uint8Array(u.byteLength+d.byteLength),c.set(u),c.set(d,u.byteLength),c}},_0=function(o){var u,d,c=[],f=[];for(f.byteLength=0,f.nalCount=0,f.duration=0,c.byteLength=0,u=0;u<o.length;u++)d=o[u],d.nalUnitType==="access_unit_delimiter_rbsp"?(c.length&&(c.duration=d.dts-c.dts,f.byteLength+=c.byteLength,f.nalCount+=c.length,f.duration+=c.duration,f.push(c)),c=[d],c.byteLength=d.data.byteLength,c.pts=d.pts,c.dts=d.dts):(d.nalUnitType==="slice_layer_without_partitioning_rbsp_idr"&&(c.keyFrame=!0),c.duration=d.dts-c.dts,c.byteLength+=d.data.byteLength,c.push(d));return f.length&&(!c.duration||c.duration<=0)&&(c.duration=f[f.length-1].duration),f.byteLength+=c.byteLength,f.nalCount+=c.length,f.duration+=c.duration,f.push(c),f},b0=function(o){var u,d,c=[],f=[];for(c.byteLength=0,c.nalCount=0,c.duration=0,c.pts=o[0].pts,c.dts=o[0].dts,f.byteLength=0,f.nalCount=0,f.duration=0,f.pts=o[0].pts,f.dts=o[0].dts,u=0;u<o.length;u++)d=o[u],d.keyFrame?(c.length&&(f.push(c),f.byteLength+=c.byteLength,f.nalCount+=c.nalCount,f.duration+=c.duration),c=[d],c.nalCount=d.length,c.byteLength=d.byteLength,c.pts=d.pts,c.dts=d.dts,c.duration=d.duration):(c.duration+=d.duration,c.nalCount+=d.length,c.byteLength+=d.byteLength,c.push(d));return f.length&&c.duration<=0&&(c.duration=f[f.length-1].duration),f.byteLength+=c.byteLength,f.nalCount+=c.nalCount,f.duration+=c.duration,f.push(c),f},E0=function(o){var u;return!o[0][0].keyFrame&&o.length>1&&(u=o.shift(),o.byteLength-=u.byteLength,o.nalCount-=u.nalCount,o[0][0].dts=u.dts,o[0][0].pts=u.pts,o[0][0].duration+=u.duration),o},T0=function(){return{size:0,flags:{isLeading:0,dependsOn:1,isDependedOn:0,hasRedundancy:0,degradationPriority:0,isNonSyncSample:1}}},Pd=function(o,u){var d=T0();return d.dataOffset=u,d.compositionTimeOffset=o.pts-o.dts,d.duration=o.duration,d.size=4*o.length,d.size+=o.byteLength,o.keyFrame&&(d.flags.dependsOn=2,d.flags.isNonSyncSample=0),d},C0=function(o,u){var d,c,f,m,b,E=u||0,S=[];for(d=0;d<o.length;d++)for(m=o[d],c=0;c<m.length;c++)b=m[c],f=Pd(b,E),E+=f.size,S.push(f);return S},x0=function(o){var u,d,c,f,m,b,E=0,S=o.byteLength,j=o.nalCount,k=S+4*j,V=new Uint8Array(k),Ae=new DataView(V.buffer);for(u=0;u<o.length;u++)for(f=o[u],d=0;d<f.length;d++)for(m=f[d],c=0;c<m.length;c++)b=m[c],Ae.setUint32(E,b.data.byteLength),E+=4,V.set(b.data,E),E+=b.data.byteLength;return V},S0=function(o,u){var d,c=u||0,f=[];return d=Pd(o,c),f.push(d),f},j0=function(o){var u,d,c=0,f=o.byteLength,m=o.length,b=f+4*m,E=new Uint8Array(b),S=new DataView(E.buffer);for(u=0;u<o.length;u++)d=o[u],S.setUint32(c,d.data.byteLength),c+=4,E.set(d.data,c),c+=d.data.byteLength;return E},B0={groupNalsIntoFrames:_0,groupFramesIntoGops:b0,extendFirstKeyFrame:E0,generateSampleTable:C0,concatenateNalData:x0,generateSampleTableForFrame:S0,concatenateNalDataForFrame:j0},Ki=[33,16,5,32,164,27],Ho=[33,65,108,84,1,2,4,8,168,2,4,8,17,191,252],Xe=function(o){for(var u=[];o--;)u.push(0);return u},w0=function(o){return Object.keys(o).reduce(function(u,d){return u[d]=new Uint8Array(o[d].reduce(function(c,f){return c.concat(f)},[])),u},{})},Wo,D0=function(){if(!Wo){var o={96e3:[Ki,[227,64],Xe(154),[56]],88200:[Ki,[231],Xe(170),[56]],64e3:[Ki,[248,192],Xe(240),[56]],48e3:[Ki,[255,192],Xe(268),[55,148,128],Xe(54),[112]],44100:[Ki,[255,192],Xe(268),[55,163,128],Xe(84),[112]],32e3:[Ki,[255,192],Xe(268),[55,234],Xe(226),[112]],24e3:[Ki,[255,192],Xe(268),[55,255,128],Xe(268),[111,112],Xe(126),[224]],16e3:[Ki,[255,192],Xe(268),[55,255,128],Xe(268),[111,255],Xe(269),[223,108],Xe(195),[1,192]],12e3:[Ho,Xe(268),[3,127,248],Xe(268),[6,255,240],Xe(268),[13,255,224],Xe(268),[27,253,128],Xe(259),[56]],11025:[Ho,Xe(268),[3,127,248],Xe(268),[6,255,240],Xe(268),[13,255,224],Xe(268),[27,255,192],Xe(268),[55,175,128],Xe(108),[112]],8e3:[Ho,Xe(268),[3,121,16],Xe(47),[7]]};Wo=w0(o)}return Wo},Go=9e4,$o,Xo,zr,Yo,Od,Ld,Rd;$o=function(o){return o*Go},Xo=function(o,u){return o*u},zr=function(o){return o/Go},Yo=function(o,u){return o/u},Od=function(o,u){return $o(Yo(o,u))},Ld=function(o,u){return Xo(zr(o),u)},Rd=function(o,u,d){return zr(d?o:o-u)};var at={ONE_SECOND_IN_TS:Go,secondsToVideoTs:$o,secondsToAudioTs:Xo,videoTsToSeconds:zr,audioTsToSeconds:Yo,audioTsToVideoTs:Od,videoTsToAudioTs:Ld,metadataTsToSeconds:Rd},k0=D0,Hr=at,I0=function(o){var u,d,c=0;for(u=0;u<o.length;u++)d=o[u],c+=d.data.byteLength;return c},P0=function(o,u,d,c){var f,m=0,b=0,E=0,S=0,j,k,V;if(u.length&&(f=Hr.audioTsToVideoTs(o.baseMediaDecodeTime,o.samplerate),m=Math.ceil(Hr.ONE_SECOND_IN_TS/(o.samplerate/1024)),d&&c&&(b=f-Math.max(d,c),E=Math.floor(b/m),S=E*m),!(E<1||S>Hr.ONE_SECOND_IN_TS/2))){for(j=k0()[o.samplerate],j||(j=u[0].data),k=0;k<E;k++)V=u[0],u.splice(0,0,{data:j,dts:V.dts-m,pts:V.pts-m});return o.baseMediaDecodeTime-=Math.floor(Hr.videoTsToAudioTs(S,o.samplerate)),S}},O0=function(o,u,d){return u.minSegmentDts>=d?o:(u.minSegmentDts=1/0,o.filter(function(c){return c.dts>=d?(u.minSegmentDts=Math.min(u.minSegmentDts,c.dts),u.minSegmentPts=u.minSegmentDts,!0):!1}))},L0=function(o){var u,d,c=[];for(u=0;u<o.length;u++)d=o[u],c.push({size:d.data.byteLength,duration:1024});return c},R0=function(o){var u,d,c=0,f=new Uint8Array(I0(o));for(u=0;u<o.length;u++)d=o[u],f.set(d.data,c),c+=d.data.byteLength;return f},M0={prefixWithSilence:P0,trimAdtsFramesByEarliestDts:O0,generateSampleTable:L0,concatenateFrameData:R0},N0=at.ONE_SECOND_IN_TS,U0=function(o,u){typeof u.pts=="number"&&(o.timelineStartInfo.pts===void 0&&(o.timelineStartInfo.pts=u.pts),o.minSegmentPts===void 0?o.minSegmentPts=u.pts:o.minSegmentPts=Math.min(o.minSegmentPts,u.pts),o.maxSegmentPts===void 0?o.maxSegmentPts=u.pts:o.maxSegmentPts=Math.max(o.maxSegmentPts,u.pts)),typeof u.dts=="number"&&(o.timelineStartInfo.dts===void 0&&(o.timelineStartInfo.dts=u.dts),o.minSegmentDts===void 0?o.minSegmentDts=u.dts:o.minSegmentDts=Math.min(o.minSegmentDts,u.dts),o.maxSegmentDts===void 0?o.maxSegmentDts=u.dts:o.maxSegmentDts=Math.max(o.maxSegmentDts,u.dts))},F0=function(o){delete o.minSegmentDts,delete o.maxSegmentDts,delete o.minSegmentPts,delete o.maxSegmentPts},V0=function(o,u){var d,c,f=o.minSegmentDts;return u||(f-=o.timelineStartInfo.dts),d=o.timelineStartInfo.baseMediaDecodeTime,d+=f,d=Math.max(0,d),o.type==="audio"&&(c=o.samplerate/N0,d*=c,d=Math.floor(d)),d},q0={clearDtsInfo:F0,calculateTrackBaseMediaDecodeTime:V0,collectDtsInfo:U0},Md=4,z0=128,H0=function(o){for(var u=0,d={payloadType:-1,payloadSize:0},c=0,f=0;u<o.byteLength&&o[u]!==z0;){for(;o[u]===255;)c+=255,u++;for(c+=o[u++];o[u]===255;)f+=255,u++;if(f+=o[u++],!d.payload&&c===Md){var m=String.fromCharCode(o[u+3],o[u+4],o[u+5],o[u+6]);if(m==="GA94"){d.payloadType=c,d.payloadSize=f,d.payload=o.subarray(u,u+f);break}else d.payload=void 0}u+=f,c=0,f=0}return d},W0=function(o){return o.payload[0]!==181||(o.payload[1]<<8|o.payload[2])!==49||String.fromCharCode(o.payload[3],o.payload[4],o.payload[5],o.payload[6])!=="GA94"||o.payload[7]!==3?null:o.payload.subarray(8,o.payload.length-1)},G0=function(o,u){var d=[],c,f,m,b;if(!(u[0]&64))return d;for(f=u[0]&31,c=0;c<f;c++)m=c*3,b={type:u[m+2]&3,pts:o},u[m+2]&4&&(b.ccData=u[m+3]<<8|u[m+4],d.push(b));return d},$0=function(o){for(var u=o.byteLength,d=[],c=1,f,m;c<u-2;)o[c]===0&&o[c+1]===0&&o[c+2]===3?(d.push(c+2),c+=2):c++;if(d.length===0)return o;f=u-d.length,m=new Uint8Array(f);var b=0;for(c=0;c<f;b++,c++)b===d[0]&&(b++,d.shift()),m[c]=o[b];return m},Nd={parseSei:H0,parseUserData:W0,parseCaptionPackets:G0,discardEmulationPreventionBytes:$0,USER_DATA_REGISTERED_ITU_T_T35:Md},Ko=t,Wr=Nd,Wt=function(o){o=o||{},Wt.prototype.init.call(this),this.parse708captions_=typeof o.parse708captions=="boolean"?o.parse708captions:!0,this.captionPackets_=[],this.ccStreams_=[new lt(0,0),new lt(0,1),new lt(1,0),new lt(1,1)],this.parse708captions_&&(this.cc708Stream_=new Ze({captionServices:o.captionServices})),this.reset(),this.ccStreams_.forEach(function(u){u.on("data",this.trigger.bind(this,"data")),u.on("partialdone",this.trigger.bind(this,"partialdone")),u.on("done",this.trigger.bind(this,"done"))},this),this.parse708captions_&&(this.cc708Stream_.on("data",this.trigger.bind(this,"data")),this.cc708Stream_.on("partialdone",this.trigger.bind(this,"partialdone")),this.cc708Stream_.on("done",this.trigger.bind(this,"done")))};Wt.prototype=new Ko,Wt.prototype.push=function(o){var u,d,c;if(o.nalUnitType==="sei_rbsp"&&(u=Wr.parseSei(o.escapedRBSP),!!u.payload&&u.payloadType===Wr.USER_DATA_REGISTERED_ITU_T_T35&&(d=Wr.parseUserData(u),!!d))){if(o.dts<this.latestDts_){this.ignoreNextEqualDts_=!0;return}else if(o.dts===this.latestDts_&&this.ignoreNextEqualDts_){this.numSameDts_--,this.numSameDts_||(this.ignoreNextEqualDts_=!1);return}c=Wr.parseCaptionPackets(o.pts,d),this.captionPackets_=this.captionPackets_.concat(c),this.latestDts_!==o.dts&&(this.numSameDts_=0),this.numSameDts_++,this.latestDts_=o.dts}},Wt.prototype.flushCCStreams=function(o){this.ccStreams_.forEach(function(u){return o==="flush"?u.flush():u.partialFlush()},this)},Wt.prototype.flushStream=function(o){if(!this.captionPackets_.length){this.flushCCStreams(o);return}this.captionPackets_.forEach(function(u,d){u.presortIndex=d}),this.captionPackets_.sort(function(u,d){return u.pts===d.pts?u.presortIndex-d.presortIndex:u.pts-d.pts}),this.captionPackets_.forEach(function(u){u.type<2?this.dispatchCea608Packet(u):this.dispatchCea708Packet(u)},this),this.captionPackets_.length=0,this.flushCCStreams(o)},Wt.prototype.flush=function(){return this.flushStream("flush")},Wt.prototype.partialFlush=function(){return this.flushStream("partialFlush")},Wt.prototype.reset=function(){this.latestDts_=null,this.ignoreNextEqualDts_=!1,this.numSameDts_=0,this.activeCea608Channel_=[null,null],this.ccStreams_.forEach(function(o){o.reset()})},Wt.prototype.dispatchCea608Packet=function(o){this.setsTextOrXDSActive(o)?this.activeCea608Channel_[o.type]=null:this.setsChannel1Active(o)?this.activeCea608Channel_[o.type]=0:this.setsChannel2Active(o)&&(this.activeCea608Channel_[o.type]=1),this.activeCea608Channel_[o.type]!==null&&this.ccStreams_[(o.type<<1)+this.activeCea608Channel_[o.type]].push(o)},Wt.prototype.setsChannel1Active=function(o){return(o.ccData&30720)===4096},Wt.prototype.setsChannel2Active=function(o){return(o.ccData&30720)===6144},Wt.prototype.setsTextOrXDSActive=function(o){return(o.ccData&28928)===256||(o.ccData&30974)===4138||(o.ccData&30974)===6186},Wt.prototype.dispatchCea708Packet=function(o){this.parse708captions_&&this.cc708Stream_.push(o)};var X0={127:9834,4128:32,4129:160,4133:8230,4138:352,4140:338,4144:9608,4145:8216,4146:8217,4147:8220,4148:8221,4149:8226,4153:8482,4154:353,4156:339,4157:8480,4159:376,4214:8539,4215:8540,4216:8541,4217:8542,4218:9168,4219:9124,4220:9123,4221:9135,4222:9126,4223:9121,4256:12600},Y0=function(o){var u=X0[o]||o;return o&4096&&o===u?"":String.fromCharCode(u)},Gr=function(o){return 32<=o&&o<=127||160<=o&&o<=255},Ui=function(o){this.windowNum=o,this.reset()};Ui.prototype.reset=function(){this.clearText(),this.pendingNewLine=!1,this.winAttr={},this.penAttr={},this.penLoc={},this.penColor={},this.visible=0,this.rowLock=0,this.columnLock=0,this.priority=0,this.relativePositioning=0,this.anchorVertical=0,this.anchorHorizontal=0,this.anchorPoint=0,this.rowCount=1,this.virtualRowCount=this.rowCount+1,this.columnCount=41,this.windowStyle=0,this.penStyle=0},Ui.prototype.getText=function(){return this.rows.join(`
`)},Ui.prototype.clearText=function(){this.rows=[""],this.rowIdx=0},Ui.prototype.newLine=function(o){for(this.rows.length>=this.virtualRowCount&&typeof this.beforeRowOverflow=="function"&&this.beforeRowOverflow(o),this.rows.length>0&&(this.rows.push(""),this.rowIdx++);this.rows.length>this.virtualRowCount;)this.rows.shift(),this.rowIdx--},Ui.prototype.isEmpty=function(){return this.rows.length===0?!0:this.rows.length===1?this.rows[0]==="":!1},Ui.prototype.addText=function(o){this.rows[this.rowIdx]+=o},Ui.prototype.backspace=function(){if(!this.isEmpty()){var o=this.rows[this.rowIdx];this.rows[this.rowIdx]=o.substr(0,o.length-1)}};var $r=function(o,u,d){this.serviceNum=o,this.text="",this.currentWindow=new Ui(-1),this.windows=[],this.stream=d,typeof u=="string"&&this.createTextDecoder(u)};$r.prototype.init=function(o,u){this.startPts=o;for(var d=0;d<8;d++)this.windows[d]=new Ui(d),typeof u=="function"&&(this.windows[d].beforeRowOverflow=u)},$r.prototype.setCurrentWindow=function(o){this.currentWindow=this.windows[o]},$r.prototype.createTextDecoder=function(o){if(typeof TextDecoder=="undefined")this.stream.trigger("log",{level:"warn",message:"The `encoding` option is unsupported without TextDecoder support"});else try{this.textDecoder_=new TextDecoder(o)}catch(u){this.stream.trigger("log",{level:"warn",message:"TextDecoder could not be created with "+o+" encoding. "+u})}};var Ze=function(o){o=o||{},Ze.prototype.init.call(this);var u=this,d=o.captionServices||{},c={},f;Object.keys(d).forEach(m=>{f=d[m],/^SERVICE/.test(m)&&(c[m]=f.encoding)}),this.serviceEncodings=c,this.current708Packet=null,this.services={},this.push=function(m){m.type===3?(u.new708Packet(),u.add708Bytes(m)):(u.current708Packet===null&&u.new708Packet(),u.add708Bytes(m))}};Ze.prototype=new Ko,Ze.prototype.new708Packet=function(){this.current708Packet!==null&&this.push708Packet(),this.current708Packet={data:[],ptsVals:[]}},Ze.prototype.add708Bytes=function(o){var u=o.ccData,d=u>>>8,c=u&255;this.current708Packet.ptsVals.push(o.pts),this.current708Packet.data.push(d),this.current708Packet.data.push(c)},Ze.prototype.push708Packet=function(){var o=this.current708Packet,u=o.data,d=null,c=null,f=0,m=u[f++];for(o.seq=m>>6,o.sizeCode=m&63;f<u.length;f++)m=u[f++],d=m>>5,c=m&31,d===7&&c>0&&(m=u[f++],d=m),this.pushServiceBlock(d,f,c),c>0&&(f+=c-1)},Ze.prototype.pushServiceBlock=function(o,u,d){var c,f=u,m=this.current708Packet.data,b=this.services[o];for(b||(b=this.initService(o,f));f<u+d&&f<m.length;f++)c=m[f],Gr(c)?f=this.handleText(f,b):c===24?f=this.multiByteCharacter(f,b):c===16?f=this.extendedCommands(f,b):128<=c&&c<=135?f=this.setCurrentWindow(f,b):152<=c&&c<=159?f=this.defineWindow(f,b):c===136?f=this.clearWindows(f,b):c===140?f=this.deleteWindows(f,b):c===137?f=this.displayWindows(f,b):c===138?f=this.hideWindows(f,b):c===139?f=this.toggleWindows(f,b):c===151?f=this.setWindowAttributes(f,b):c===144?f=this.setPenAttributes(f,b):c===145?f=this.setPenColor(f,b):c===146?f=this.setPenLocation(f,b):c===143?b=this.reset(f,b):c===8?b.currentWindow.backspace():c===12?b.currentWindow.clearText():c===13?b.currentWindow.pendingNewLine=!0:c===14?b.currentWindow.clearText():c===141&&f++},Ze.prototype.extendedCommands=function(o,u){var d=this.current708Packet.data,c=d[++o];return Gr(c)&&(o=this.handleText(o,u,{isExtended:!0})),o},Ze.prototype.getPts=function(o){return this.current708Packet.ptsVals[Math.floor(o/2)]},Ze.prototype.initService=function(o,u){var c="SERVICE"+o,d=this,c,f;return c in this.serviceEncodings&&(f=this.serviceEncodings[c]),this.services[o]=new $r(o,f,d),this.services[o].init(this.getPts(u),function(m){d.flushDisplayed(m,d.services[o])}),this.services[o]},Ze.prototype.handleText=function(o,u,d){var c=d&&d.isExtended,f=d&&d.isMultiByte,m=this.current708Packet.data,b=c?4096:0,E=m[o],S=m[o+1],j=u.currentWindow,k,V;function Ae($){return $.map(De=>("0"+(De&255).toString(16)).slice(-2)).join("")}if(f?(V=[E,S],o++):V=[E],u.textDecoder_&&!c)k=u.textDecoder_.decode(new Uint8Array(V));else if(f){const $=Ae(V);k=String.fromCharCode(parseInt($,16))}else k=Y0(b|E);return j.pendingNewLine&&!j.isEmpty()&&j.newLine(this.getPts(o)),j.pendingNewLine=!1,j.addText(k),o},Ze.prototype.multiByteCharacter=function(o,u){var d=this.current708Packet.data,c=d[o+1],f=d[o+2];return Gr(c)&&Gr(f)&&(o=this.handleText(++o,u,{isMultiByte:!0})),o},Ze.prototype.setCurrentWindow=function(o,u){var d=this.current708Packet.data,c=d[o],f=c&7;return u.setCurrentWindow(f),o},Ze.prototype.defineWindow=function(o,u){var d=this.current708Packet.data,c=d[o],f=c&7;u.setCurrentWindow(f);var m=u.currentWindow;return c=d[++o],m.visible=(c&32)>>5,m.rowLock=(c&16)>>4,m.columnLock=(c&8)>>3,m.priority=c&7,c=d[++o],m.relativePositioning=(c&128)>>7,m.anchorVertical=c&127,c=d[++o],m.anchorHorizontal=c,c=d[++o],m.anchorPoint=(c&240)>>4,m.rowCount=c&15,c=d[++o],m.columnCount=c&63,c=d[++o],m.windowStyle=(c&56)>>3,m.penStyle=c&7,m.virtualRowCount=m.rowCount+1,o},Ze.prototype.setWindowAttributes=function(o,u){var d=this.current708Packet.data,c=d[o],f=u.currentWindow.winAttr;return c=d[++o],f.fillOpacity=(c&192)>>6,f.fillRed=(c&48)>>4,f.fillGreen=(c&12)>>2,f.fillBlue=c&3,c=d[++o],f.borderType=(c&192)>>6,f.borderRed=(c&48)>>4,f.borderGreen=(c&12)>>2,f.borderBlue=c&3,c=d[++o],f.borderType+=(c&128)>>5,f.wordWrap=(c&64)>>6,f.printDirection=(c&48)>>4,f.scrollDirection=(c&12)>>2,f.justify=c&3,c=d[++o],f.effectSpeed=(c&240)>>4,f.effectDirection=(c&12)>>2,f.displayEffect=c&3,o},Ze.prototype.flushDisplayed=function(o,u){for(var d=[],c=0;c<8;c++)u.windows[c].visible&&!u.windows[c].isEmpty()&&d.push(u.windows[c].getText());u.endPts=o,u.text=d.join(`

`),this.pushCaption(u),u.startPts=o},Ze.prototype.pushCaption=function(o){o.text!==""&&(this.trigger("data",{startPts:o.startPts,endPts:o.endPts,text:o.text,stream:"cc708_"+o.serviceNum}),o.text="",o.startPts=o.endPts)},Ze.prototype.displayWindows=function(o,u){var d=this.current708Packet.data,c=d[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)c&1<<m&&(u.windows[m].visible=1);return o},Ze.prototype.hideWindows=function(o,u){var d=this.current708Packet.data,c=d[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)c&1<<m&&(u.windows[m].visible=0);return o},Ze.prototype.toggleWindows=function(o,u){var d=this.current708Packet.data,c=d[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)c&1<<m&&(u.windows[m].visible^=1);return o},Ze.prototype.clearWindows=function(o,u){var d=this.current708Packet.data,c=d[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)c&1<<m&&u.windows[m].clearText();return o},Ze.prototype.deleteWindows=function(o,u){var d=this.current708Packet.data,c=d[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var m=0;m<8;m++)c&1<<m&&u.windows[m].reset();return o},Ze.prototype.setPenAttributes=function(o,u){var d=this.current708Packet.data,c=d[o],f=u.currentWindow.penAttr;return c=d[++o],f.textTag=(c&240)>>4,f.offset=(c&12)>>2,f.penSize=c&3,c=d[++o],f.italics=(c&128)>>7,f.underline=(c&64)>>6,f.edgeType=(c&56)>>3,f.fontStyle=c&7,o},Ze.prototype.setPenColor=function(o,u){var d=this.current708Packet.data,c=d[o],f=u.currentWindow.penColor;return c=d[++o],f.fgOpacity=(c&192)>>6,f.fgRed=(c&48)>>4,f.fgGreen=(c&12)>>2,f.fgBlue=c&3,c=d[++o],f.bgOpacity=(c&192)>>6,f.bgRed=(c&48)>>4,f.bgGreen=(c&12)>>2,f.bgBlue=c&3,c=d[++o],f.edgeRed=(c&48)>>4,f.edgeGreen=(c&12)>>2,f.edgeBlue=c&3,o},Ze.prototype.setPenLocation=function(o,u){var d=this.current708Packet.data,c=d[o],f=u.currentWindow.penLoc;return u.currentWindow.pendingNewLine=!0,c=d[++o],f.row=c&15,c=d[++o],f.column=c&63,o},Ze.prototype.reset=function(o,u){var d=this.getPts(o);return this.flushDisplayed(d,u),this.initService(u.serviceNum,o)};var K0={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608,304:174,305:176,306:189,307:191,308:8482,309:162,310:163,311:9834,312:224,313:160,314:232,315:226,316:234,317:238,318:244,319:251,544:193,545:201,546:211,547:218,548:220,549:252,550:8216,551:161,552:42,553:39,554:8212,555:169,556:8480,557:8226,558:8220,559:8221,560:192,561:194,562:199,563:200,564:202,565:203,566:235,567:206,568:207,569:239,570:212,571:217,572:249,573:219,574:171,575:187,800:195,801:227,802:205,803:204,804:236,805:210,806:242,807:213,808:245,809:123,810:125,811:92,812:94,813:95,814:124,815:126,816:196,817:228,818:214,819:246,820:223,821:165,822:164,823:9474,824:197,825:229,826:216,827:248,828:9484,829:9488,830:9492,831:9496},Xr=function(o){return o===null?"":(o=K0[o]||o,String.fromCharCode(o))},Yr=14,Q0=[4352,4384,4608,4640,5376,5408,5632,5664,5888,5920,4096,4864,4896,5120,5152],vn=function(){for(var o=[],u=Yr+1;u--;)o.push({text:"",indent:0,offset:0});return o},lt=function(o,u){lt.prototype.init.call(this),this.field_=o||0,this.dataChannel_=u||0,this.name_="CC"+((this.field_<<1|this.dataChannel_)+1),this.setConstants(),this.reset(),this.push=function(d){var c,f,m,b,E;if(c=d.ccData&32639,c===this.lastControlCode_){this.lastControlCode_=null;return}if((c&61440)===4096?this.lastControlCode_=c:c!==this.PADDING_&&(this.lastControlCode_=null),m=c>>>8,b=c&255,c!==this.PADDING_)if(c===this.RESUME_CAPTION_LOADING_)this.mode_="popOn";else if(c===this.END_OF_CAPTION_)this.mode_="popOn",this.clearFormatting(d.pts),this.flushDisplayed(d.pts),f=this.displayed_,this.displayed_=this.nonDisplayed_,this.nonDisplayed_=f,this.startPts_=d.pts;else if(c===this.ROLL_UP_2_ROWS_)this.rollUpRows_=2,this.setRollUp(d.pts);else if(c===this.ROLL_UP_3_ROWS_)this.rollUpRows_=3,this.setRollUp(d.pts);else if(c===this.ROLL_UP_4_ROWS_)this.rollUpRows_=4,this.setRollUp(d.pts);else if(c===this.CARRIAGE_RETURN_)this.clearFormatting(d.pts),this.flushDisplayed(d.pts),this.shiftRowsUp_(),this.startPts_=d.pts;else if(c===this.BACKSPACE_)this.mode_==="popOn"?this.nonDisplayed_[this.row_].text=this.nonDisplayed_[this.row_].text.slice(0,-1):this.displayed_[this.row_].text=this.displayed_[this.row_].text.slice(0,-1);else if(c===this.ERASE_DISPLAYED_MEMORY_)this.flushDisplayed(d.pts),this.displayed_=vn();else if(c===this.ERASE_NON_DISPLAYED_MEMORY_)this.nonDisplayed_=vn();else if(c===this.RESUME_DIRECT_CAPTIONING_)this.mode_!=="paintOn"&&(this.flushDisplayed(d.pts),this.displayed_=vn()),this.mode_="paintOn",this.startPts_=d.pts;else if(this.isSpecialCharacter(m,b))m=(m&3)<<8,E=Xr(m|b),this[this.mode_](d.pts,E),this.column_++;else if(this.isExtCharacter(m,b))this.mode_==="popOn"?this.nonDisplayed_[this.row_].text=this.nonDisplayed_[this.row_].text.slice(0,-1):this.displayed_[this.row_].text=this.displayed_[this.row_].text.slice(0,-1),m=(m&3)<<8,E=Xr(m|b),this[this.mode_](d.pts,E),this.column_++;else if(this.isMidRowCode(m,b))this.clearFormatting(d.pts),this[this.mode_](d.pts," "),this.column_++,(b&14)===14&&this.addFormatting(d.pts,["i"]),(b&1)===1&&this.addFormatting(d.pts,["u"]);else if(this.isOffsetControlCode(m,b)){const j=b&3;this.nonDisplayed_[this.row_].offset=j,this.column_+=j}else if(this.isPAC(m,b)){var S=Q0.indexOf(c&7968);if(this.mode_==="rollUp"&&(S-this.rollUpRows_+1<0&&(S=this.rollUpRows_-1),this.setRollUp(d.pts,S)),S!==this.row_&&S>=0&&S<=14&&(this.clearFormatting(d.pts),this.row_=S),b&1&&this.formatting_.indexOf("u")===-1&&this.addFormatting(d.pts,["u"]),(c&16)===16){const j=(c&14)>>1;this.column_=j*4,this.nonDisplayed_[this.row_].indent+=j}this.isColorPAC(b)&&(b&14)===14&&this.addFormatting(d.pts,["i"])}else this.isNormalChar(m)&&(b===0&&(b=null),E=Xr(m),E+=Xr(b),this[this.mode_](d.pts,E),this.column_+=E.length)}};lt.prototype=new Ko,lt.prototype.flushDisplayed=function(o){const u=c=>{this.trigger("log",{level:"warn",message:"Skipping a malformed 608 caption at index "+c+"."})},d=[];this.displayed_.forEach((c,f)=>{if(c&&c.text&&c.text.length){try{c.text=c.text.trim()}catch(m){u(f)}c.text.length&&d.push({text:c.text,line:f+1,position:10+Math.min(70,c.indent*10)+c.offset*2.5})}else c==null&&u(f)}),d.length&&this.trigger("data",{startPts:this.startPts_,endPts:o,content:d,stream:this.name_})},lt.prototype.reset=function(){this.mode_="popOn",this.topRow_=0,this.startPts_=0,this.displayed_=vn(),this.nonDisplayed_=vn(),this.lastControlCode_=null,this.column_=0,this.row_=Yr,this.rollUpRows_=2,this.formatting_=[]},lt.prototype.setConstants=function(){this.dataChannel_===0?(this.BASE_=16,this.EXT_=17,this.CONTROL_=(20|this.field_)<<8,this.OFFSET_=23):this.dataChannel_===1&&(this.BASE_=24,this.EXT_=25,this.CONTROL_=(28|this.field_)<<8,this.OFFSET_=31),this.PADDING_=0,this.RESUME_CAPTION_LOADING_=this.CONTROL_|32,this.END_OF_CAPTION_=this.CONTROL_|47,this.ROLL_UP_2_ROWS_=this.CONTROL_|37,this.ROLL_UP_3_ROWS_=this.CONTROL_|38,this.ROLL_UP_4_ROWS_=this.CONTROL_|39,this.CARRIAGE_RETURN_=this.CONTROL_|45,this.RESUME_DIRECT_CAPTIONING_=this.CONTROL_|41,this.BACKSPACE_=this.CONTROL_|33,this.ERASE_DISPLAYED_MEMORY_=this.CONTROL_|44,this.ERASE_NON_DISPLAYED_MEMORY_=this.CONTROL_|46},lt.prototype.isSpecialCharacter=function(o,u){return o===this.EXT_&&u>=48&&u<=63},lt.prototype.isExtCharacter=function(o,u){return(o===this.EXT_+1||o===this.EXT_+2)&&u>=32&&u<=63},lt.prototype.isMidRowCode=function(o,u){return o===this.EXT_&&u>=32&&u<=47},lt.prototype.isOffsetControlCode=function(o,u){return o===this.OFFSET_&&u>=33&&u<=35},lt.prototype.isPAC=function(o,u){return o>=this.BASE_&&o<this.BASE_+8&&u>=64&&u<=127},lt.prototype.isColorPAC=function(o){return o>=64&&o<=79||o>=96&&o<=127},lt.prototype.isNormalChar=function(o){return o>=32&&o<=127},lt.prototype.setRollUp=function(o,u){if(this.mode_!=="rollUp"&&(this.row_=Yr,this.mode_="rollUp",this.flushDisplayed(o),this.nonDisplayed_=vn(),this.displayed_=vn()),u!==void 0&&u!==this.row_)for(var d=0;d<this.rollUpRows_;d++)this.displayed_[u-d]=this.displayed_[this.row_-d],this.displayed_[this.row_-d]={text:"",indent:0,offset:0};u===void 0&&(u=this.row_),this.topRow_=u-this.rollUpRows_+1},lt.prototype.addFormatting=function(o,u){this.formatting_=this.formatting_.concat(u);var d=u.reduce(function(c,f){return c+"<"+f+">"},"");this[this.mode_](o,d)},lt.prototype.clearFormatting=function(o){if(this.formatting_.length){var u=this.formatting_.reverse().reduce(function(d,c){return d+"</"+c+">"},"");this.formatting_=[],this[this.mode_](o,u)}},lt.prototype.popOn=function(o,u){var d=this.nonDisplayed_[this.row_].text;d+=u,this.nonDisplayed_[this.row_].text=d},lt.prototype.rollUp=function(o,u){var d=this.displayed_[this.row_].text;d+=u,this.displayed_[this.row_].text=d},lt.prototype.shiftRowsUp_=function(){var o;for(o=0;o<this.topRow_;o++)this.displayed_[o]={text:"",indent:0,offset:0};for(o=this.row_+1;o<Yr+1;o++)this.displayed_[o]={text:"",indent:0,offset:0};for(o=this.topRow_;o<this.row_;o++)this.displayed_[o]=this.displayed_[o+1];this.displayed_[this.row_]={text:"",indent:0,offset:0}},lt.prototype.paintOn=function(o,u){var d=this.displayed_[this.row_].text;d+=u,this.displayed_[this.row_].text=d};var Ud={CaptionStream:Wt,Cea608Stream:lt,Cea708Stream:Ze},Kr={H264_STREAM_TYPE:27,ADTS_STREAM_TYPE:15,METADATA_STREAM_TYPE:21},J0=t,Z0=8589934592,ev=4294967296,Fd="shared",Qo=function(o,u){var d=1;for(o>u&&(d=-1);Math.abs(u-o)>ev;)o+=d*Z0;return o},Jo=function(o){var u,d;Jo.prototype.init.call(this),this.type_=o||Fd,this.push=function(c){if(c.type==="metadata"){this.trigger("data",c);return}this.type_!==Fd&&c.type!==this.type_||(d===void 0&&(d=c.dts),c.dts=Qo(c.dts,d),c.pts=Qo(c.pts,d),u=c.dts,this.trigger("data",c))},this.flush=function(){d=u,this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")},this.discontinuity=function(){d=void 0,u=void 0},this.reset=function(){this.discontinuity(),this.trigger("reset")}};Jo.prototype=new J0;var Vd={TimestampRolloverStream:Jo,handleRollover:Qo},tv=(o,u,d)=>{if(!o)return-1;for(var c=d;c<o.length;c++)if(o[c]===u)return c;return-1},iv={typedArrayIndexOf:tv},Qr=iv.typedArrayIndexOf,Jr={Iso88591:0,Utf16:1,Utf16be:2,Utf8:3},qd=function(o,u,d){var c,f="";for(c=u;c<d;c++)f+="%"+("00"+o[c].toString(16)).slice(-2);return f},Is=function(o,u,d){return decodeURIComponent(qd(o,u,d))},Ps=function(o,u,d){return unescape(qd(o,u,d))},Os=function(o){return o[0]<<21|o[1]<<14|o[2]<<7|o[3]},Ls={APIC:function(o){var u=1,d,c,f="-->";o.data[0]===Jr.Utf8&&(d=Qr(o.data,0,u),!(d<0)&&(o.mimeType=Ps(o.data,u,d),u=d+1,o.pictureType=o.data[u],u++,c=Qr(o.data,0,u),!(c<0)&&(o.description=Is(o.data,u,c),u=c+1,o.mimeType===f?o.url=Ps(o.data,u,o.data.length):o.pictureData=o.data.subarray(u,o.data.length))))},"T*":function(o){o.data[0]===Jr.Utf8&&(o.value=Is(o.data,1,o.data.length).replace(/\0*$/,""),o.values=o.value.split("\0"))},TXXX:function(o){var u;o.data[0]===Jr.Utf8&&(u=Qr(o.data,0,1),u!==-1&&(o.description=Is(o.data,1,u),o.value=Is(o.data,u+1,o.data.length).replace(/\0*$/,""),o.data=o.value))},"W*":function(o){o.url=Ps(o.data,0,o.data.length).replace(/\0.*$/,"")},WXXX:function(o){var u;o.data[0]===Jr.Utf8&&(u=Qr(o.data,0,1),u!==-1&&(o.description=Is(o.data,1,u),o.url=Ps(o.data,u+1,o.data.length).replace(/\0.*$/,"")))},PRIV:function(o){var u;for(u=0;u<o.data.length;u++)if(o.data[u]===0){o.owner=Ps(o.data,0,u);break}o.privateData=o.data.subarray(u+1),o.data=o.privateData}},nv=function(o){var u,d,c=10,f=0,m=[];if(!(o.length<10||o[0]!==73||o[1]!==68||o[2]!==51)){f=Os(o.subarray(6,10)),f+=10;var b=o[5]&64;b&&(c+=4,c+=Os(o.subarray(10,14)),f-=Os(o.subarray(16,20)));do{if(u=Os(o.subarray(c+4,c+8)),u<1)break;d=String.fromCharCode(o[c],o[c+1],o[c+2],o[c+3]);var E={id:d,data:o.subarray(c+10,c+u+10)};E.key=E.id,Ls[E.id]?Ls[E.id](E):E.id[0]==="T"?Ls["T*"](E):E.id[0]==="W"&&Ls["W*"](E),m.push(E),c+=10,c+=u}while(c<f);return m}},zd={parseId3Frames:nv,parseSyncSafeInteger:Os,frameParsers:Ls},sv=t,rv=Kr,Qi=zd,Zr;Zr=function(o){var u={descriptor:o&&o.descriptor},d=0,c=[],f=0,m;if(Zr.prototype.init.call(this),this.dispatchType=rv.METADATA_STREAM_TYPE.toString(16),u.descriptor)for(m=0;m<u.descriptor.length;m++)this.dispatchType+=("00"+u.descriptor[m].toString(16)).slice(-2);this.push=function(b){var E,S,j,k,V,Ae;if(b.type==="timed-metadata"){if(b.dataAlignmentIndicator&&(f=0,c.length=0),c.length===0&&(b.data.length<10||b.data[0]!==73||b.data[1]!==68||b.data[2]!==51)){this.trigger("log",{level:"warn",message:"Skipping unrecognized metadata packet"});return}if(c.push(b),f+=b.data.byteLength,c.length===1&&(d=Qi.parseSyncSafeInteger(b.data.subarray(6,10)),d+=10),!(f<d)){for(E={data:new Uint8Array(d),frames:[],pts:c[0].pts,dts:c[0].dts},V=0;V<d;)E.data.set(c[0].data.subarray(0,d-V),V),V+=c[0].data.byteLength,f-=c[0].data.byteLength,c.shift();S=10,E.data[5]&64&&(S+=4,S+=Qi.parseSyncSafeInteger(E.data.subarray(10,14)),d-=Qi.parseSyncSafeInteger(E.data.subarray(16,20)));do{if(j=Qi.parseSyncSafeInteger(E.data.subarray(S+4,S+8)),j<1){this.trigger("log",{level:"warn",message:"Malformed ID3 frame encountered. Skipping remaining metadata parsing."});break}if(Ae=String.fromCharCode(E.data[S],E.data[S+1],E.data[S+2],E.data[S+3]),k={id:Ae,data:E.data.subarray(S+10,S+j+10)},k.key=k.id,Qi.frameParsers[k.id]?Qi.frameParsers[k.id](k):k.id[0]==="T"?Qi.frameParsers["T*"](k):k.id[0]==="W"&&Qi.frameParsers["W*"](k),k.owner==="com.apple.streaming.transportStreamTimestamp"){var $=k.data,De=($[3]&1)<<30|$[4]<<22|$[5]<<14|$[6]<<6|$[7]>>>2;De*=4,De+=$[7]&3,k.timeStamp=De,E.pts===void 0&&E.dts===void 0&&(E.pts=k.timeStamp,E.dts=k.timeStamp),this.trigger("timestamp",k)}E.frames.push(k),S+=10,S+=j}while(S<d);this.trigger("data",E)}}}},Zr.prototype=new sv;var av=Zr,Zo=t,el=Ud,di=Kr,ov=Vd.TimestampRolloverStream,ea,Rs,ta,ts=188,tl=71;ea=function(){var o=new Uint8Array(ts),u=0;ea.prototype.init.call(this),this.push=function(d){var c=0,f=ts,m;for(u?(m=new Uint8Array(d.byteLength+u),m.set(o.subarray(0,u)),m.set(d,u),u=0):m=d;f<m.byteLength;){if(m[c]===tl&&m[f]===tl){this.trigger("data",m.subarray(c,f)),c+=ts,f+=ts;continue}c++,f++}c<m.byteLength&&(o.set(m.subarray(c),0),u=m.byteLength-c)},this.flush=function(){u===ts&&o[0]===tl&&(this.trigger("data",o),u=0),this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")},this.reset=function(){u=0,this.trigger("reset")}},ea.prototype=new Zo,Rs=function(){var o,u,d,c;Rs.prototype.init.call(this),c=this,this.packetsWaitingForPmt=[],this.programMapTable=void 0,o=function(f,m){var b=0;m.payloadUnitStartIndicator&&(b+=f[b]+1),m.type==="pat"?u(f.subarray(b),m):d(f.subarray(b),m)},u=function(f,m){m.section_number=f[7],m.last_section_number=f[8],c.pmtPid=(f[10]&31)<<8|f[11],m.pmtPid=c.pmtPid},d=function(f,m){var b,E,S,j;if(f[5]&1){for(c.programMapTable={video:null,audio:null,"timed-metadata":{}},b=(f[1]&15)<<8|f[2],E=3+b-4,S=(f[10]&15)<<8|f[11],j=12+S;j<E;){var k=f[j],V=(f[j+1]&31)<<8|f[j+2];k===di.H264_STREAM_TYPE&&c.programMapTable.video===null?c.programMapTable.video=V:k===di.ADTS_STREAM_TYPE&&c.programMapTable.audio===null?c.programMapTable.audio=V:k===di.METADATA_STREAM_TYPE&&(c.programMapTable["timed-metadata"][V]=k),j+=((f[j+3]&15)<<8|f[j+4])+5}m.programMapTable=c.programMapTable}},this.push=function(f){var m={},b=4;if(m.payloadUnitStartIndicator=!!(f[1]&64),m.pid=f[1]&31,m.pid<<=8,m.pid|=f[2],(f[3]&48)>>>4>1&&(b+=f[b]+1),m.pid===0)m.type="pat",o(f.subarray(b),m),this.trigger("data",m);else if(m.pid===this.pmtPid)for(m.type="pmt",o(f.subarray(b),m),this.trigger("data",m);this.packetsWaitingForPmt.length;)this.processPes_.apply(this,this.packetsWaitingForPmt.shift());else this.programMapTable===void 0?this.packetsWaitingForPmt.push([f,b,m]):this.processPes_(f,b,m)},this.processPes_=function(f,m,b){b.pid===this.programMapTable.video?b.streamType=di.H264_STREAM_TYPE:b.pid===this.programMapTable.audio?b.streamType=di.ADTS_STREAM_TYPE:b.streamType=this.programMapTable["timed-metadata"][b.pid],b.type="pes",b.data=f.subarray(m),this.trigger("data",b)}},Rs.prototype=new Zo,Rs.STREAM_TYPES={h264:27,adts:15},ta=function(){var o=this,u=!1,d={data:[],size:0},c={data:[],size:0},f={data:[],size:0},m,b=function(S,j){var k;const V=S[0]<<16|S[1]<<8|S[2];j.data=new Uint8Array,V===1&&(j.packetLength=6+(S[4]<<8|S[5]),j.dataAlignmentIndicator=(S[6]&4)!==0,k=S[7],k&192&&(j.pts=(S[9]&14)<<27|(S[10]&255)<<20|(S[11]&254)<<12|(S[12]&255)<<5|(S[13]&254)>>>3,j.pts*=4,j.pts+=(S[13]&6)>>>1,j.dts=j.pts,k&64&&(j.dts=(S[14]&14)<<27|(S[15]&255)<<20|(S[16]&254)<<12|(S[17]&255)<<5|(S[18]&254)>>>3,j.dts*=4,j.dts+=(S[18]&6)>>>1)),j.data=S.subarray(9+S[8]))},E=function(S,j,k){var V=new Uint8Array(S.size),Ae={type:j},$=0,De=0,Le=!1,xt;if(!(!S.data.length||S.size<9)){for(Ae.trackId=S.data[0].pid,$=0;$<S.data.length;$++)xt=S.data[$],V.set(xt.data,De),De+=xt.data.byteLength;b(V,Ae),Le=j==="video"||Ae.packetLength<=S.size,(k||Le)&&(S.size=0,S.data.length=0),Le&&o.trigger("data",Ae)}};ta.prototype.init.call(this),this.push=function(S){({pat:function(){},pes:function(){var j,k;switch(S.streamType){case di.H264_STREAM_TYPE:j=d,k="video";break;case di.ADTS_STREAM_TYPE:j=c,k="audio";break;case di.METADATA_STREAM_TYPE:j=f,k="timed-metadata";break;default:return}S.payloadUnitStartIndicator&&E(j,k,!0),j.data.push(S),j.size+=S.data.byteLength},pmt:function(){var j={type:"metadata",tracks:[]};m=S.programMapTable,m.video!==null&&j.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+m.video,codec:"avc",type:"video"}),m.audio!==null&&j.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+m.audio,codec:"adts",type:"audio"}),u=!0,o.trigger("data",j)}})[S.type]()},this.reset=function(){d.size=0,d.data.length=0,c.size=0,c.data.length=0,this.trigger("reset")},this.flushStreams_=function(){E(d,"video"),E(c,"audio"),E(f,"timed-metadata")},this.flush=function(){if(!u&&m){var S={type:"metadata",tracks:[]};m.video!==null&&S.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+m.video,codec:"avc",type:"video"}),m.audio!==null&&S.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+m.audio,codec:"adts",type:"audio"}),o.trigger("data",S)}u=!1,this.flushStreams_(),this.trigger("done")}},ta.prototype=new Zo;var Hd={PAT_PID:0,MP2T_PACKET_LENGTH:ts,TransportPacketStream:ea,TransportParseStream:Rs,ElementaryStream:ta,TimestampRolloverStream:ov,CaptionStream:el.CaptionStream,Cea608Stream:el.Cea608Stream,Cea708Stream:el.Cea708Stream,MetadataStream:av};for(var il in di)di.hasOwnProperty(il)&&(Hd[il]=di[il]);var lv=Hd,uv=t,cv=at.ONE_SECOND_IN_TS,ia,Wd=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];ia=function(o){var u,d=0;ia.prototype.init.call(this),this.skipWarn_=function(c,f){this.trigger("log",{level:"warn",message:`adts skiping bytes ${c} to ${f} in frame ${d} outside syncword`})},this.push=function(c){var f=0,m,b,E,S,j;if(o||(d=0),c.type==="audio"){u&&u.length?(E=u,u=new Uint8Array(E.byteLength+c.data.byteLength),u.set(E),u.set(c.data,E.byteLength)):u=c.data;for(var k;f+7<u.length;){if(u[f]!==255||(u[f+1]&246)!==240){typeof k!="number"&&(k=f),f++;continue}if(typeof k=="number"&&(this.skipWarn_(k,f),k=null),b=(~u[f+1]&1)*2,m=(u[f+3]&3)<<11|u[f+4]<<3|(u[f+5]&224)>>5,S=((u[f+6]&3)+1)*1024,j=S*cv/Wd[(u[f+2]&60)>>>2],u.byteLength-f<m)break;this.trigger("data",{pts:c.pts+d*j,dts:c.dts+d*j,sampleCount:S,audioobjecttype:(u[f+2]>>>6&3)+1,channelcount:(u[f+2]&1)<<2|(u[f+3]&192)>>>6,samplerate:Wd[(u[f+2]&60)>>>2],samplingfrequencyindex:(u[f+2]&60)>>>2,samplesize:16,data:u.subarray(f+7+b,f+m)}),d++,f+=m}typeof k=="number"&&(this.skipWarn_(k,f),k=null),u=u.subarray(f)}},this.flush=function(){d=0,this.trigger("done")},this.reset=function(){u=void 0,this.trigger("reset")},this.endTimeline=function(){u=void 0,this.trigger("endedtimeline")}},ia.prototype=new uv;var dv=ia,Gd;Gd=function(o){var u=o.byteLength,d=0,c=0;this.length=function(){return 8*u},this.bitsAvailable=function(){return 8*u+c},this.loadWord=function(){var f=o.byteLength-u,m=new Uint8Array(4),b=Math.min(4,u);if(b===0)throw new Error("no bytes available");m.set(o.subarray(f,f+b)),d=new DataView(m.buffer).getUint32(0),c=b*8,u-=b},this.skipBits=function(f){var m;c>f?(d<<=f,c-=f):(f-=c,m=Math.floor(f/8),f-=m*8,u-=m,this.loadWord(),d<<=f,c-=f)},this.readBits=function(f){var m=Math.min(c,f),b=d>>>32-m;return c-=m,c>0?d<<=m:u>0&&this.loadWord(),m=f-m,m>0?b<<m|this.readBits(m):b},this.skipLeadingZeros=function(){var f;for(f=0;f<c;++f)if(d&2147483648>>>f)return d<<=f,c-=f,f;return this.loadWord(),f+this.skipLeadingZeros()},this.skipUnsignedExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.skipExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.readUnsignedExpGolomb=function(){var f=this.skipLeadingZeros();return this.readBits(f+1)-1},this.readExpGolomb=function(){var f=this.readUnsignedExpGolomb();return 1&f?1+f>>>1:-1*(f>>>1)},this.readBoolean=function(){return this.readBits(1)===1},this.readUnsignedByte=function(){return this.readBits(8)},this.loadWord()};var hv=Gd,$d=t,fv=hv,na,Ms,Xd;Ms=function(){var o=0,u,d;Ms.prototype.init.call(this),this.push=function(c){var f;d?(f=new Uint8Array(d.byteLength+c.data.byteLength),f.set(d),f.set(c.data,d.byteLength),d=f):d=c.data;for(var m=d.byteLength;o<m-3;o++)if(d[o+2]===1){u=o+5;break}for(;u<m;)switch(d[u]){case 0:if(d[u-1]!==0){u+=2;break}else if(d[u-2]!==0){u++;break}o+3!==u-2&&this.trigger("data",d.subarray(o+3,u-2));do u++;while(d[u]!==1&&u<m);o=u-2,u+=3;break;case 1:if(d[u-1]!==0||d[u-2]!==0){u+=3;break}this.trigger("data",d.subarray(o+3,u-2)),o=u-2,u+=3;break;default:u+=3;break}d=d.subarray(o),u-=o,o=0},this.reset=function(){d=null,o=0,this.trigger("reset")},this.flush=function(){d&&d.byteLength>3&&this.trigger("data",d.subarray(o+3)),d=null,o=0,this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")}},Ms.prototype=new $d,Xd={100:!0,110:!0,122:!0,244:!0,44:!0,83:!0,86:!0,118:!0,128:!0,138:!0,139:!0,134:!0},na=function(){var o=new Ms,u,d,c,f,m,b,E;na.prototype.init.call(this),u=this,this.push=function(S){S.type==="video"&&(d=S.trackId,c=S.pts,f=S.dts,o.push(S))},o.on("data",function(S){var j={trackId:d,pts:c,dts:f,data:S,nalUnitTypeCode:S[0]&31};switch(j.nalUnitTypeCode){case 5:j.nalUnitType="slice_layer_without_partitioning_rbsp_idr";break;case 6:j.nalUnitType="sei_rbsp",j.escapedRBSP=m(S.subarray(1));break;case 7:j.nalUnitType="seq_parameter_set_rbsp",j.escapedRBSP=m(S.subarray(1)),j.config=b(j.escapedRBSP);break;case 8:j.nalUnitType="pic_parameter_set_rbsp";break;case 9:j.nalUnitType="access_unit_delimiter_rbsp";break}u.trigger("data",j)}),o.on("done",function(){u.trigger("done")}),o.on("partialdone",function(){u.trigger("partialdone")}),o.on("reset",function(){u.trigger("reset")}),o.on("endedtimeline",function(){u.trigger("endedtimeline")}),this.flush=function(){o.flush()},this.partialFlush=function(){o.partialFlush()},this.reset=function(){o.reset()},this.endTimeline=function(){o.endTimeline()},E=function(S,j){var k=8,V=8,Ae,$;for(Ae=0;Ae<S;Ae++)V!==0&&($=j.readExpGolomb(),V=(k+$+256)%256),k=V===0?k:V},m=function(S){for(var j=S.byteLength,k=[],V=1,Ae,$;V<j-2;)S[V]===0&&S[V+1]===0&&S[V+2]===3?(k.push(V+2),V+=2):V++;if(k.length===0)return S;Ae=j-k.length,$=new Uint8Array(Ae);var De=0;for(V=0;V<Ae;De++,V++)De===k[0]&&(De++,k.shift()),$[V]=S[De];return $},b=function(S){var j=0,k=0,V=0,Ae=0,$,De,Le,xt,ri,_n,Eh,Th,Ch,fl,xh,yt=[1,1],Sh,bn;if($=new fv(S),De=$.readUnsignedByte(),xt=$.readUnsignedByte(),Le=$.readUnsignedByte(),$.skipUnsignedExpGolomb(),Xd[De]&&(ri=$.readUnsignedExpGolomb(),ri===3&&$.skipBits(1),$.skipUnsignedExpGolomb(),$.skipUnsignedExpGolomb(),$.skipBits(1),$.readBoolean()))for(xh=ri!==3?8:12,bn=0;bn<xh;bn++)$.readBoolean()&&(bn<6?E(16,$):E(64,$));if($.skipUnsignedExpGolomb(),_n=$.readUnsignedExpGolomb(),_n===0)$.readUnsignedExpGolomb();else if(_n===1)for($.skipBits(1),$.skipExpGolomb(),$.skipExpGolomb(),Eh=$.readUnsignedExpGolomb(),bn=0;bn<Eh;bn++)$.skipExpGolomb();if($.skipUnsignedExpGolomb(),$.skipBits(1),Th=$.readUnsignedExpGolomb(),Ch=$.readUnsignedExpGolomb(),fl=$.readBits(1),fl===0&&$.skipBits(1),$.skipBits(1),$.readBoolean()&&(j=$.readUnsignedExpGolomb(),k=$.readUnsignedExpGolomb(),V=$.readUnsignedExpGolomb(),Ae=$.readUnsignedExpGolomb()),$.readBoolean()&&$.readBoolean()){switch(Sh=$.readUnsignedByte(),Sh){case 1:yt=[1,1];break;case 2:yt=[12,11];break;case 3:yt=[10,11];break;case 4:yt=[16,11];break;case 5:yt=[40,33];break;case 6:yt=[24,11];break;case 7:yt=[20,11];break;case 8:yt=[32,11];break;case 9:yt=[80,33];break;case 10:yt=[18,11];break;case 11:yt=[15,11];break;case 12:yt=[64,33];break;case 13:yt=[160,99];break;case 14:yt=[4,3];break;case 15:yt=[3,2];break;case 16:yt=[2,1];break;case 255:{yt=[$.readUnsignedByte()<<8|$.readUnsignedByte(),$.readUnsignedByte()<<8|$.readUnsignedByte()];break}}yt&&yt[0]/yt[1]}return{profileIdc:De,levelIdc:Le,profileCompatibility:xt,width:(Th+1)*16-j*2-k*2,height:(2-fl)*(Ch+1)*16-V*2-Ae*2,sarRatio:yt}}},na.prototype=new $d;var pv={H264Stream:na,NalByteStream:Ms},mv=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],Yd=function(o,u){var d=o[u+6]<<21|o[u+7]<<14|o[u+8]<<7|o[u+9],c=o[u+5],f=(c&16)>>4;return d=d>=0?d:0,f?d+20:d+10},Kd=function(o,u){return o.length-u<10||o[u]!==73||o[u+1]!==68||o[u+2]!==51?u:(u+=Yd(o,u),Kd(o,u))},gv=function(o){var u=Kd(o,0);return o.length>=u+2&&(o[u]&255)===255&&(o[u+1]&240)===240&&(o[u+1]&22)===16},Qd=function(o){return o[0]<<21|o[1]<<14|o[2]<<7|o[3]},vv=function(o,u,d){var c,f="";for(c=u;c<d;c++)f+="%"+("00"+o[c].toString(16)).slice(-2);return f},Av=function(o,u,d){return unescape(vv(o,u,d))},yv=function(o,u){var d=(o[u+5]&224)>>5,c=o[u+4]<<3,f=o[u+3]&6144;return f|c|d},_v=function(o,u){return o[u]===73&&o[u+1]===68&&o[u+2]===51?"timed-metadata":o[u]&!0&&(o[u+1]&240)===240?"audio":null},bv=function(o){for(var u=0;u+5<o.length;){if(o[u]!==255||(o[u+1]&246)!==240){u++;continue}return mv[(o[u+2]&60)>>>2]}return null},Ev=function(o){var u,d,c,f;u=10,o[5]&64&&(u+=4,u+=Qd(o.subarray(10,14)));do{if(d=Qd(o.subarray(u+4,u+8)),d<1)return null;if(f=String.fromCharCode(o[u],o[u+1],o[u+2],o[u+3]),f==="PRIV"){c=o.subarray(u+10,u+d+10);for(var m=0;m<c.byteLength;m++)if(c[m]===0){var b=Av(c,0,m);if(b==="com.apple.streaming.transportStreamTimestamp"){var E=c.subarray(m+1),S=(E[3]&1)<<30|E[4]<<22|E[5]<<14|E[6]<<6|E[7]>>>2;return S*=4,S+=E[7]&3,S}break}}u+=10,u+=d}while(u<o.byteLength);return null},nl={isLikelyAacData:gv,parseId3TagSize:Yd,parseAdtsSize:yv,parseType:_v,parseSampleRate:bv,parseAacTimestamp:Ev},Tv=t,Jd=nl,sa;sa=function(){var o=new Uint8Array,u=0;sa.prototype.init.call(this),this.setTimestamp=function(d){u=d},this.push=function(d){var c=0,f=0,m,b,E,S;for(o.length?(S=o.length,o=new Uint8Array(d.byteLength+S),o.set(o.subarray(0,S)),o.set(d,S)):o=d;o.length-f>=3;){if(o[f]===73&&o[f+1]===68&&o[f+2]===51){if(o.length-f<10||(c=Jd.parseId3TagSize(o,f),f+c>o.length))break;b={type:"timed-metadata",data:o.subarray(f,f+c)},this.trigger("data",b),f+=c;continue}else if((o[f]&255)===255&&(o[f+1]&240)===240){if(o.length-f<7||(c=Jd.parseAdtsSize(o,f),f+c>o.length))break;E={type:"audio",data:o.subarray(f,f+c),pts:u,dts:u},this.trigger("data",E),f+=c;continue}f++}m=o.length-f,m>0?o=o.subarray(f):o=new Uint8Array},this.reset=function(){o=new Uint8Array,this.trigger("reset")},this.endTimeline=function(){o=new Uint8Array,this.trigger("endedtimeline")}},sa.prototype=new Tv;var Cv=sa,xv=["audioobjecttype","channelcount","samplerate","samplingfrequencyindex","samplesize"],Sv=xv,jv=["width","height","profileIdc","levelIdc","profileCompatibility","sarRatio"],Bv=jv,ra=t,Ns=y0,Us=B0,aa=M0,hi=q0,Fi=lv,oa=at,Zd=dv,wv=pv.H264Stream,Dv=Cv,kv=nl.isLikelyAacData,Iv=at.ONE_SECOND_IN_TS,sl=Sv,rl=Bv,Fs,is,la,An,Pv=function(o,u){u.stream=o,this.trigger("log",u)},eh=function(o,u){for(var d=Object.keys(u),c=0;c<d.length;c++){var f=d[c];f==="headOfPipeline"||!u[f].on||u[f].on("log",Pv.bind(o,f))}},th=function(o,u){var d;if(o.length!==u.length)return!1;for(d=0;d<o.length;d++)if(o[d]!==u[d])return!1;return!0},al=function(o,u,d,c,f,m){var b=d-u,E=c-u,S=f-d;return{start:{dts:o,pts:o+b},end:{dts:o+E,pts:o+S},prependedContentDuration:m,baseMediaDecodeTime:o}};is=function(o,u){var d=[],c,f=0,m=0,b=1/0;u=u||{},c=u.firstSequenceNumber||0,is.prototype.init.call(this),this.push=function(E){hi.collectDtsInfo(o,E),o&&sl.forEach(function(S){o[S]=E[S]}),d.push(E)},this.setEarliestDts=function(E){f=E},this.setVideoBaseMediaDecodeTime=function(E){b=E},this.setAudioAppendStart=function(E){m=E},this.flush=function(){var E,S,j,k,V,Ae,$;if(d.length===0){this.trigger("done","AudioSegmentStream");return}E=aa.trimAdtsFramesByEarliestDts(d,o,f),o.baseMediaDecodeTime=hi.calculateTrackBaseMediaDecodeTime(o,u.keepOriginalTimestamps),$=aa.prefixWithSilence(o,E,m,b),o.samples=aa.generateSampleTable(E),j=Ns.mdat(aa.concatenateFrameData(E)),d=[],S=Ns.moof(c,[o]),k=new Uint8Array(S.byteLength+j.byteLength),c++,k.set(S),k.set(j,S.byteLength),hi.clearDtsInfo(o),V=Math.ceil(Iv*1024/o.samplerate),E.length&&(Ae=E.length*V,this.trigger("segmentTimingInfo",al(oa.audioTsToVideoTs(o.baseMediaDecodeTime,o.samplerate),E[0].dts,E[0].pts,E[0].dts+Ae,E[0].pts+Ae,$||0)),this.trigger("timingInfo",{start:E[0].pts,end:E[0].pts+Ae})),this.trigger("data",{track:o,boxes:k}),this.trigger("done","AudioSegmentStream")},this.reset=function(){hi.clearDtsInfo(o),d=[],this.trigger("reset")}},is.prototype=new ra,Fs=function(o,u){var d,c=[],f=[],m,b;u=u||{},d=u.firstSequenceNumber||0,Fs.prototype.init.call(this),delete o.minPTS,this.gopCache_=[],this.push=function(E){hi.collectDtsInfo(o,E),E.nalUnitType==="seq_parameter_set_rbsp"&&!m&&(m=E.config,o.sps=[E.data],rl.forEach(function(S){o[S]=m[S]},this)),E.nalUnitType==="pic_parameter_set_rbsp"&&!b&&(b=E.data,o.pps=[E.data]),c.push(E)},this.flush=function(){for(var E,S,j,k,V,Ae,$=0,De,Le;c.length&&c[0].nalUnitType!=="access_unit_delimiter_rbsp";)c.shift();if(c.length===0){this.resetStream_(),this.trigger("done","VideoSegmentStream");return}if(E=Us.groupNalsIntoFrames(c),j=Us.groupFramesIntoGops(E),j[0][0].keyFrame||(S=this.getGopForFusion_(c[0],o),S?($=S.duration,j.unshift(S),j.byteLength+=S.byteLength,j.nalCount+=S.nalCount,j.pts=S.pts,j.dts=S.dts,j.duration+=S.duration):j=Us.extendFirstKeyFrame(j)),f.length){var xt;if(u.alignGopsAtEnd?xt=this.alignGopsAtEnd_(j):xt=this.alignGopsAtStart_(j),!xt){this.gopCache_.unshift({gop:j.pop(),pps:o.pps,sps:o.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),c=[],this.resetStream_(),this.trigger("done","VideoSegmentStream");return}hi.clearDtsInfo(o),j=xt}hi.collectDtsInfo(o,j),o.samples=Us.generateSampleTable(j),V=Ns.mdat(Us.concatenateNalData(j)),o.baseMediaDecodeTime=hi.calculateTrackBaseMediaDecodeTime(o,u.keepOriginalTimestamps),this.trigger("processedGopsInfo",j.map(function(ri){return{pts:ri.pts,dts:ri.dts,byteLength:ri.byteLength}})),De=j[0],Le=j[j.length-1],this.trigger("segmentTimingInfo",al(o.baseMediaDecodeTime,De.dts,De.pts,Le.dts+Le.duration,Le.pts+Le.duration,$)),this.trigger("timingInfo",{start:j[0].pts,end:j[j.length-1].pts+j[j.length-1].duration}),this.gopCache_.unshift({gop:j.pop(),pps:o.pps,sps:o.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),c=[],this.trigger("baseMediaDecodeTime",o.baseMediaDecodeTime),this.trigger("timelineStartInfo",o.timelineStartInfo),k=Ns.moof(d,[o]),Ae=new Uint8Array(k.byteLength+V.byteLength),d++,Ae.set(k),Ae.set(V,k.byteLength),this.trigger("data",{track:o,boxes:Ae}),this.resetStream_(),this.trigger("done","VideoSegmentStream")},this.reset=function(){this.resetStream_(),c=[],this.gopCache_.length=0,f.length=0,this.trigger("reset")},this.resetStream_=function(){hi.clearDtsInfo(o),m=void 0,b=void 0},this.getGopForFusion_=function(E){var S=45e3,j=1e4,k=1/0,V,Ae,$,De,Le;for(Le=0;Le<this.gopCache_.length;Le++)De=this.gopCache_[Le],$=De.gop,!(!(o.pps&&th(o.pps[0],De.pps[0]))||!(o.sps&&th(o.sps[0],De.sps[0])))&&($.dts<o.timelineStartInfo.dts||(V=E.dts-$.dts-$.duration,V>=-j&&V<=S&&(!Ae||k>V)&&(Ae=De,k=V)));return Ae?Ae.gop:null},this.alignGopsAtStart_=function(E){var S,j,k,V,Ae,$,De,Le;for(Ae=E.byteLength,$=E.nalCount,De=E.duration,S=j=0;S<f.length&&j<E.length&&(k=f[S],V=E[j],k.pts!==V.pts);){if(V.pts>k.pts){S++;continue}j++,Ae-=V.byteLength,$-=V.nalCount,De-=V.duration}return j===0?E:j===E.length?null:(Le=E.slice(j),Le.byteLength=Ae,Le.duration=De,Le.nalCount=$,Le.pts=Le[0].pts,Le.dts=Le[0].dts,Le)},this.alignGopsAtEnd_=function(E){var S,j,k,V,Ae,$;for(S=f.length-1,j=E.length-1,Ae=null,$=!1;S>=0&&j>=0;){if(k=f[S],V=E[j],k.pts===V.pts){$=!0;break}if(k.pts>V.pts){S--;continue}S===f.length-1&&(Ae=j),j--}if(!$&&Ae===null)return null;var De;if($?De=j:De=Ae,De===0)return E;var Le=E.slice(De),xt=Le.reduce(function(ri,_n){return ri.byteLength+=_n.byteLength,ri.duration+=_n.duration,ri.nalCount+=_n.nalCount,ri},{byteLength:0,duration:0,nalCount:0});return Le.byteLength=xt.byteLength,Le.duration=xt.duration,Le.nalCount=xt.nalCount,Le.pts=Le[0].pts,Le.dts=Le[0].dts,Le},this.alignGopsWith=function(E){f=E}},Fs.prototype=new ra,An=function(o,u){this.numberOfTracks=0,this.metadataStream=u,o=o||{},typeof o.remux!="undefined"?this.remuxTracks=!!o.remux:this.remuxTracks=!0,typeof o.keepOriginalTimestamps=="boolean"?this.keepOriginalTimestamps=o.keepOriginalTimestamps:this.keepOriginalTimestamps=!1,this.pendingTracks=[],this.videoTrack=null,this.pendingBoxes=[],this.pendingCaptions=[],this.pendingMetadata=[],this.pendingBytes=0,this.emittedTracks=0,An.prototype.init.call(this),this.push=function(d){if(d.content||d.text)return this.pendingCaptions.push(d);if(d.frames)return this.pendingMetadata.push(d);this.pendingTracks.push(d.track),this.pendingBytes+=d.boxes.byteLength,d.track.type==="video"&&(this.videoTrack=d.track,this.pendingBoxes.push(d.boxes)),d.track.type==="audio"&&(this.audioTrack=d.track,this.pendingBoxes.unshift(d.boxes))}},An.prototype=new ra,An.prototype.flush=function(o){var u=0,d={captions:[],captionStreams:{},metadata:[],info:{}},c,f,m,b=0,E;if(this.pendingTracks.length<this.numberOfTracks){if(o!=="VideoSegmentStream"&&o!=="AudioSegmentStream")return;if(this.remuxTracks)return;if(this.pendingTracks.length===0){this.emittedTracks++,this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0);return}}if(this.videoTrack?(b=this.videoTrack.timelineStartInfo.pts,rl.forEach(function(S){d.info[S]=this.videoTrack[S]},this)):this.audioTrack&&(b=this.audioTrack.timelineStartInfo.pts,sl.forEach(function(S){d.info[S]=this.audioTrack[S]},this)),this.videoTrack||this.audioTrack){for(this.pendingTracks.length===1?d.type=this.pendingTracks[0].type:d.type="combined",this.emittedTracks+=this.pendingTracks.length,m=Ns.initSegment(this.pendingTracks),d.initSegment=new Uint8Array(m.byteLength),d.initSegment.set(m),d.data=new Uint8Array(this.pendingBytes),E=0;E<this.pendingBoxes.length;E++)d.data.set(this.pendingBoxes[E],u),u+=this.pendingBoxes[E].byteLength;for(E=0;E<this.pendingCaptions.length;E++)c=this.pendingCaptions[E],c.startTime=oa.metadataTsToSeconds(c.startPts,b,this.keepOriginalTimestamps),c.endTime=oa.metadataTsToSeconds(c.endPts,b,this.keepOriginalTimestamps),d.captionStreams[c.stream]=!0,d.captions.push(c);for(E=0;E<this.pendingMetadata.length;E++)f=this.pendingMetadata[E],f.cueTime=oa.metadataTsToSeconds(f.pts,b,this.keepOriginalTimestamps),d.metadata.push(f);for(d.metadata.dispatchType=this.metadataStream.dispatchType,this.pendingTracks.length=0,this.videoTrack=null,this.pendingBoxes.length=0,this.pendingCaptions.length=0,this.pendingBytes=0,this.pendingMetadata.length=0,this.trigger("data",d),E=0;E<d.captions.length;E++)c=d.captions[E],this.trigger("caption",c);for(E=0;E<d.metadata.length;E++)f=d.metadata[E],this.trigger("id3Frame",f)}this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0)},An.prototype.setRemux=function(o){this.remuxTracks=o},la=function(o){var u=this,d=!0,c,f;la.prototype.init.call(this),o=o||{},this.baseMediaDecodeTime=o.baseMediaDecodeTime||0,this.transmuxPipeline_={},this.setupAacPipeline=function(){var m={};this.transmuxPipeline_=m,m.type="aac",m.metadataStream=new Fi.MetadataStream,m.aacStream=new Dv,m.audioTimestampRolloverStream=new Fi.TimestampRolloverStream("audio"),m.timedMetadataTimestampRolloverStream=new Fi.TimestampRolloverStream("timed-metadata"),m.adtsStream=new Zd,m.coalesceStream=new An(o,m.metadataStream),m.headOfPipeline=m.aacStream,m.aacStream.pipe(m.audioTimestampRolloverStream).pipe(m.adtsStream),m.aacStream.pipe(m.timedMetadataTimestampRolloverStream).pipe(m.metadataStream).pipe(m.coalesceStream),m.metadataStream.on("timestamp",function(b){m.aacStream.setTimestamp(b.timeStamp)}),m.aacStream.on("data",function(b){b.type!=="timed-metadata"&&b.type!=="audio"||m.audioSegmentStream||(f=f||{timelineStartInfo:{baseMediaDecodeTime:u.baseMediaDecodeTime},codec:"adts",type:"audio"},m.coalesceStream.numberOfTracks++,m.audioSegmentStream=new is(f,o),m.audioSegmentStream.on("log",u.getLogTrigger_("audioSegmentStream")),m.audioSegmentStream.on("timingInfo",u.trigger.bind(u,"audioTimingInfo")),m.adtsStream.pipe(m.audioSegmentStream).pipe(m.coalesceStream),u.trigger("trackinfo",{hasAudio:!!f,hasVideo:!!c}))}),m.coalesceStream.on("data",this.trigger.bind(this,"data")),m.coalesceStream.on("done",this.trigger.bind(this,"done")),eh(this,m)},this.setupTsPipeline=function(){var m={};this.transmuxPipeline_=m,m.type="ts",m.metadataStream=new Fi.MetadataStream,m.packetStream=new Fi.TransportPacketStream,m.parseStream=new Fi.TransportParseStream,m.elementaryStream=new Fi.ElementaryStream,m.timestampRolloverStream=new Fi.TimestampRolloverStream,m.adtsStream=new Zd,m.h264Stream=new wv,m.captionStream=new Fi.CaptionStream(o),m.coalesceStream=new An(o,m.metadataStream),m.headOfPipeline=m.packetStream,m.packetStream.pipe(m.parseStream).pipe(m.elementaryStream).pipe(m.timestampRolloverStream),m.timestampRolloverStream.pipe(m.h264Stream),m.timestampRolloverStream.pipe(m.adtsStream),m.timestampRolloverStream.pipe(m.metadataStream).pipe(m.coalesceStream),m.h264Stream.pipe(m.captionStream).pipe(m.coalesceStream),m.elementaryStream.on("data",function(b){var E;if(b.type==="metadata"){for(E=b.tracks.length;E--;)!c&&b.tracks[E].type==="video"?(c=b.tracks[E],c.timelineStartInfo.baseMediaDecodeTime=u.baseMediaDecodeTime):!f&&b.tracks[E].type==="audio"&&(f=b.tracks[E],f.timelineStartInfo.baseMediaDecodeTime=u.baseMediaDecodeTime);c&&!m.videoSegmentStream&&(m.coalesceStream.numberOfTracks++,m.videoSegmentStream=new Fs(c,o),m.videoSegmentStream.on("log",u.getLogTrigger_("videoSegmentStream")),m.videoSegmentStream.on("timelineStartInfo",function(S){f&&!o.keepOriginalTimestamps&&(f.timelineStartInfo=S,m.audioSegmentStream.setEarliestDts(S.dts-u.baseMediaDecodeTime))}),m.videoSegmentStream.on("processedGopsInfo",u.trigger.bind(u,"gopInfo")),m.videoSegmentStream.on("segmentTimingInfo",u.trigger.bind(u,"videoSegmentTimingInfo")),m.videoSegmentStream.on("baseMediaDecodeTime",function(S){f&&m.audioSegmentStream.setVideoBaseMediaDecodeTime(S)}),m.videoSegmentStream.on("timingInfo",u.trigger.bind(u,"videoTimingInfo")),m.h264Stream.pipe(m.videoSegmentStream).pipe(m.coalesceStream)),f&&!m.audioSegmentStream&&(m.coalesceStream.numberOfTracks++,m.audioSegmentStream=new is(f,o),m.audioSegmentStream.on("log",u.getLogTrigger_("audioSegmentStream")),m.audioSegmentStream.on("timingInfo",u.trigger.bind(u,"audioTimingInfo")),m.audioSegmentStream.on("segmentTimingInfo",u.trigger.bind(u,"audioSegmentTimingInfo")),m.adtsStream.pipe(m.audioSegmentStream).pipe(m.coalesceStream)),u.trigger("trackinfo",{hasAudio:!!f,hasVideo:!!c})}}),m.coalesceStream.on("data",this.trigger.bind(this,"data")),m.coalesceStream.on("id3Frame",function(b){b.dispatchType=m.metadataStream.dispatchType,u.trigger("id3Frame",b)}),m.coalesceStream.on("caption",this.trigger.bind(this,"caption")),m.coalesceStream.on("done",this.trigger.bind(this,"done")),eh(this,m)},this.setBaseMediaDecodeTime=function(m){var b=this.transmuxPipeline_;o.keepOriginalTimestamps||(this.baseMediaDecodeTime=m),f&&(f.timelineStartInfo.dts=void 0,f.timelineStartInfo.pts=void 0,hi.clearDtsInfo(f),b.audioTimestampRolloverStream&&b.audioTimestampRolloverStream.discontinuity()),c&&(b.videoSegmentStream&&(b.videoSegmentStream.gopCache_=[]),c.timelineStartInfo.dts=void 0,c.timelineStartInfo.pts=void 0,hi.clearDtsInfo(c),b.captionStream.reset()),b.timestampRolloverStream&&b.timestampRolloverStream.discontinuity()},this.setAudioAppendStart=function(m){f&&this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(m)},this.setRemux=function(m){var b=this.transmuxPipeline_;o.remux=m,b&&b.coalesceStream&&b.coalesceStream.setRemux(m)},this.alignGopsWith=function(m){c&&this.transmuxPipeline_.videoSegmentStream&&this.transmuxPipeline_.videoSegmentStream.alignGopsWith(m)},this.getLogTrigger_=function(m){var b=this;return function(E){E.stream=m,b.trigger("log",E)}},this.push=function(m){if(d){var b=kv(m);b&&this.transmuxPipeline_.type!=="aac"?this.setupAacPipeline():!b&&this.transmuxPipeline_.type!=="ts"&&this.setupTsPipeline(),d=!1}this.transmuxPipeline_.headOfPipeline.push(m)},this.flush=function(){d=!0,this.transmuxPipeline_.headOfPipeline.flush()},this.endTimeline=function(){this.transmuxPipeline_.headOfPipeline.endTimeline()},this.reset=function(){this.transmuxPipeline_.headOfPipeline&&this.transmuxPipeline_.headOfPipeline.reset()},this.resetCaptions=function(){this.transmuxPipeline_.captionStream&&this.transmuxPipeline_.captionStream.reset()}},la.prototype=new ra;var Ov={Transmuxer:la,VideoSegmentStream:Fs,AudioSegmentStream:is,AUDIO_PROPERTIES:sl,VIDEO_PROPERTIES:rl,generateSegmentTimingInfo:al},Lv=function(o){return o>>>0},Rv=function(o){return("00"+o.toString(16)).slice(-2)},ua={toUnsigned:Lv,toHexString:Rv},Mv=function(o){var u="";return u+=String.fromCharCode(o[0]),u+=String.fromCharCode(o[1]),u+=String.fromCharCode(o[2]),u+=String.fromCharCode(o[3]),u},ih=Mv,Nv=ua.toUnsigned,Uv=ih,nh=function(o,u){var d=[],c,f,m,b,E;if(!u.length)return null;for(c=0;c<o.byteLength;)f=Nv(o[c]<<24|o[c+1]<<16|o[c+2]<<8|o[c+3]),m=Uv(o.subarray(c+4,c+8)),b=f>1?c+f:o.byteLength,m===u[0]&&(u.length===1?d.push(o.subarray(c+8,b)):(E=nh(o.subarray(c+8,b),u.slice(1)),E.length&&(d=d.concat(E)))),c=b;return d},sh=nh,Fv=ua.toUnsigned,Vv=r.getUint64,qv=function(o){var u={version:o[0],flags:new Uint8Array(o.subarray(1,4))};return u.version===1?u.baseMediaDecodeTime=Vv(o.subarray(4)):u.baseMediaDecodeTime=Fv(o[4]<<24|o[5]<<16|o[6]<<8|o[7]),u},rh=qv,zv=function(o){return{isLeading:(o[0]&12)>>>2,dependsOn:o[0]&3,isDependedOn:(o[1]&192)>>>6,hasRedundancy:(o[1]&48)>>>4,paddingValue:(o[1]&14)>>>1,isNonSyncSample:o[1]&1,degradationPriority:o[2]<<8|o[3]}},Hv=zv,ah=Hv,Wv=function(o){var u={version:o[0],flags:new Uint8Array(o.subarray(1,4)),samples:[]},d=new DataView(o.buffer,o.byteOffset,o.byteLength),c=u.flags[2]&1,f=u.flags[2]&4,m=u.flags[1]&1,b=u.flags[1]&2,E=u.flags[1]&4,S=u.flags[1]&8,j=d.getUint32(4),k=8,V;for(c&&(u.dataOffset=d.getInt32(k),k+=4),f&&j&&(V={flags:ah(o.subarray(k,k+4))},k+=4,m&&(V.duration=d.getUint32(k),k+=4),b&&(V.size=d.getUint32(k),k+=4),S&&(u.version===1?V.compositionTimeOffset=d.getInt32(k):V.compositionTimeOffset=d.getUint32(k),k+=4),u.samples.push(V),j--);j--;)V={},m&&(V.duration=d.getUint32(k),k+=4),b&&(V.size=d.getUint32(k),k+=4),E&&(V.flags=ah(o.subarray(k,k+4)),k+=4),S&&(u.version===1?V.compositionTimeOffset=d.getInt32(k):V.compositionTimeOffset=d.getUint32(k),k+=4),u.samples.push(V);return u},oh=Wv,Gv=function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),d={version:o[0],flags:new Uint8Array(o.subarray(1,4)),trackId:u.getUint32(4)},c=d.flags[2]&1,f=d.flags[2]&2,m=d.flags[2]&8,b=d.flags[2]&16,E=d.flags[2]&32,S=d.flags[0]&65536,j=d.flags[0]&131072,k;return k=8,c&&(k+=4,d.baseDataOffset=u.getUint32(12),k+=4),f&&(d.sampleDescriptionIndex=u.getUint32(k),k+=4),m&&(d.defaultSampleDuration=u.getUint32(k),k+=4),b&&(d.defaultSampleSize=u.getUint32(k),k+=4),E&&(d.defaultSampleFlags=u.getUint32(k)),S&&(d.durationIsEmpty=!0),!c&&j&&(d.baseDataOffsetIsMoof=!0),d},lh=Gv,Vs;typeof window!="undefined"?Vs=window:typeof n!="undefined"?Vs=n:typeof self!="undefined"?Vs=self:Vs={};var uh=Vs,$v=Nd.discardEmulationPreventionBytes,Xv=Ud.CaptionStream,qs=sh,Yv=rh,Kv=oh,Qv=lh,ch=uh,Jv=function(o,u){for(var d=o,c=0;c<u.length;c++){var f=u[c];if(d<f.size)return f;d-=f.size}return null},Zv=function(o,u,d){var c=new DataView(o.buffer,o.byteOffset,o.byteLength),f={logs:[],seiNals:[]},m,b,E,S;for(b=0;b+4<o.length;b+=E)if(E=c.getUint32(b),b+=4,!(E<=0))switch(o[b]&31){case 6:var j=o.subarray(b+1,b+1+E),k=Jv(b,u);if(m={nalUnitType:"sei_rbsp",size:E,data:j,escapedRBSP:$v(j),trackId:d},k)m.pts=k.pts,m.dts=k.dts,S=k;else if(S)m.pts=S.pts,m.dts=S.dts;else{f.logs.push({level:"warn",message:"We've encountered a nal unit without data at "+b+" for trackId "+d+". See mux.js#223."});break}f.seiNals.push(m);break}return f},eA=function(o,u,d){var c=u,f=d.defaultSampleDuration||0,m=d.defaultSampleSize||0,b=d.trackId,E=[];return o.forEach(function(S){var j=Kv(S),k=j.samples;k.forEach(function(V){V.duration===void 0&&(V.duration=f),V.size===void 0&&(V.size=m),V.trackId=b,V.dts=c,V.compositionTimeOffset===void 0&&(V.compositionTimeOffset=0),typeof c=="bigint"?(V.pts=c+ch.BigInt(V.compositionTimeOffset),c+=ch.BigInt(V.duration)):(V.pts=c+V.compositionTimeOffset,c+=V.duration)}),E=E.concat(k)}),E},tA=function(o,u){var d=qs(o,["moof","traf"]),c=qs(o,["mdat"]),f={},m=[];return c.forEach(function(b,E){var S=d[E];m.push({mdat:b,traf:S})}),m.forEach(function(b){var E=b.mdat,S=b.traf,j=qs(S,["tfhd"]),k=Qv(j[0]),V=k.trackId,Ae=qs(S,["tfdt"]),$=Ae.length>0?Yv(Ae[0]).baseMediaDecodeTime:0,De=qs(S,["trun"]),Le,xt;u===V&&De.length>0&&(Le=eA(De,$,k),xt=Zv(E,Le,V),f[V]||(f[V]={seiNals:[],logs:[]}),f[V].seiNals=f[V].seiNals.concat(xt.seiNals),f[V].logs=f[V].logs.concat(xt.logs))}),f},iA=function(o,u,d){var c;if(u===null)return null;c=tA(o,u);var f=c[u]||{};return{seiNals:f.seiNals,logs:f.logs,timescale:d}},nA=function(){var o=!1,u,d,c,f,m,b;this.isInitialized=function(){return o},this.init=function(E){u=new Xv,o=!0,b=E?E.isPartial:!1,u.on("data",function(S){S.startTime=S.startPts/f,S.endTime=S.endPts/f,m.captions.push(S),m.captionStreams[S.stream]=!0}),u.on("log",function(S){m.logs.push(S)})},this.isNewInit=function(E,S){return E&&E.length===0||S&&typeof S=="object"&&Object.keys(S).length===0?!1:c!==E[0]||f!==S[c]},this.parse=function(E,S,j){var k;if(this.isInitialized()){if(!S||!j)return null;if(this.isNewInit(S,j))c=S[0],f=j[c];else if(c===null||!f)return d.push(E),null}else return null;for(;d.length>0;){var V=d.shift();this.parse(V,S,j)}return k=iA(E,c,f),k&&k.logs&&(m.logs=m.logs.concat(k.logs)),k===null||!k.seiNals?m.logs.length?{logs:m.logs,captions:[],captionStreams:[]}:null:(this.pushNals(k.seiNals),this.flushStream(),m)},this.pushNals=function(E){if(!this.isInitialized()||!E||E.length===0)return null;E.forEach(function(S){u.push(S)})},this.flushStream=function(){if(!this.isInitialized())return null;b?u.partialFlush():u.flush()},this.clearParsedCaptions=function(){m.captions=[],m.captionStreams={},m.logs=[]},this.resetCaptionStream=function(){if(!this.isInitialized())return null;u.reset()},this.clearAllCaptions=function(){this.clearParsedCaptions(),this.resetCaptionStream()},this.reset=function(){d=[],c=null,f=null,m?this.clearParsedCaptions():m={captions:[],captionStreams:{},logs:[]},this.resetCaptionStream()},this.reset()},sA=nA,rA=function(o){for(var u=0,d=String.fromCharCode(o[u]),c="";d!=="\0";)c+=d,u++,d=String.fromCharCode(o[u]);return c+=d,c},aA={uint8ToCString:rA},ca=aA.uint8ToCString,oA=r.getUint64,lA=function(o){var u=4,d=o[0],c,f,m,b,E,S,j,k;if(d===0){c=ca(o.subarray(u)),u+=c.length,f=ca(o.subarray(u)),u+=f.length;var V=new DataView(o.buffer);m=V.getUint32(u),u+=4,E=V.getUint32(u),u+=4,S=V.getUint32(u),u+=4,j=V.getUint32(u),u+=4}else if(d===1){var V=new DataView(o.buffer);m=V.getUint32(u),u+=4,b=oA(o.subarray(u)),u+=8,S=V.getUint32(u),u+=4,j=V.getUint32(u),u+=4,c=ca(o.subarray(u)),u+=c.length,f=ca(o.subarray(u)),u+=f.length}k=new Uint8Array(o.subarray(u,o.byteLength));var Ae={scheme_id_uri:c,value:f,timescale:m||1,presentation_time:b,presentation_time_delta:E,event_duration:S,id:j,message_data:k};return cA(d,Ae)?Ae:void 0},uA=function(o,u,d,c){return o||o===0?o/u:c+d/u},cA=function(o,u){var d=u.scheme_id_uri!=="\0",c=o===0&&dh(u.presentation_time_delta)&&d,f=o===1&&dh(u.presentation_time)&&d;return!(o>1)&&c||f},dh=function(o){return o!==void 0||o!==null},dA={parseEmsgBox:lA,scaleTime:uA},da=ua.toUnsigned,zs=ua.toHexString,At=sh,ns=ih,ol=dA,hA=lh,fA=oh,pA=rh,mA=r.getUint64,hh,fh,ph,mh,gh,ll,vh,ul=uh,gA=zd.parseId3Frames;hh=function(o){var u={},d=At(o,["moov","trak"]);return d.reduce(function(c,f){var m,b,E,S,j;return m=At(f,["tkhd"])[0],!m||(b=m[0],E=b===0?12:20,S=da(m[E]<<24|m[E+1]<<16|m[E+2]<<8|m[E+3]),j=At(f,["mdia","mdhd"])[0],!j)?null:(b=j[0],E=b===0?12:20,c[S]=da(j[E]<<24|j[E+1]<<16|j[E+2]<<8|j[E+3]),c)},u)},fh=function(o,u){var d;d=At(u,["moof","traf"]);var c=d.reduce(function(f,m){var b=At(m,["tfhd"])[0],E=da(b[4]<<24|b[5]<<16|b[6]<<8|b[7]),S=o[E]||9e4,j=At(m,["tfdt"])[0],k=new DataView(j.buffer,j.byteOffset,j.byteLength),V;j[0]===1?V=mA(j.subarray(4,12)):V=k.getUint32(4);let Ae;return typeof V=="bigint"?Ae=V/ul.BigInt(S):typeof V=="number"&&!isNaN(V)&&(Ae=V/S),Ae<Number.MAX_SAFE_INTEGER&&(Ae=Number(Ae)),Ae<f&&(f=Ae),f},1/0);return typeof c=="bigint"||isFinite(c)?c:0},ph=function(o,u){var d=At(u,["moof","traf"]),c=0,f=0,m;if(d&&d.length){var b=At(d[0],["tfhd"])[0],E=At(d[0],["trun"])[0],S=At(d[0],["tfdt"])[0];if(b){var j=hA(b);m=j.trackId}if(S){var k=pA(S);c=k.baseMediaDecodeTime}if(E){var V=fA(E);V.samples&&V.samples.length&&(f=V.samples[0].compositionTimeOffset||0)}}var Ae=o[m]||9e4;typeof c=="bigint"&&(f=ul.BigInt(f),Ae=ul.BigInt(Ae));var $=(c+f)/Ae;return typeof $=="bigint"&&$<Number.MAX_SAFE_INTEGER&&($=Number($)),$},mh=function(o){var u=At(o,["moov","trak"]),d=[];return u.forEach(function(c){var f=At(c,["mdia","hdlr"]),m=At(c,["tkhd"]);f.forEach(function(b,E){var S=ns(b.subarray(8,12)),j=m[E],k,V,Ae;S==="vide"&&(k=new DataView(j.buffer,j.byteOffset,j.byteLength),V=k.getUint8(0),Ae=V===0?k.getUint32(12):k.getUint32(20),d.push(Ae))})}),d},ll=function(o){var u=o[0],d=u===0?12:20;return da(o[d]<<24|o[d+1]<<16|o[d+2]<<8|o[d+3])},gh=function(o){var u=At(o,["moov","trak"]),d=[];return u.forEach(function(c){var f={},m=At(c,["tkhd"])[0],b,E;m&&(b=new DataView(m.buffer,m.byteOffset,m.byteLength),E=b.getUint8(0),f.id=E===0?b.getUint32(12):b.getUint32(20));var S=At(c,["mdia","hdlr"])[0];if(S){var j=ns(S.subarray(8,12));j==="vide"?f.type="video":j==="soun"?f.type="audio":f.type=j}var k=At(c,["mdia","minf","stbl","stsd"])[0];if(k){var V=k.subarray(8);f.codec=ns(V.subarray(4,8));var Ae=At(V,[f.codec])[0],$,De;Ae&&(/^[asm]vc[1-9]$/i.test(f.codec)?($=Ae.subarray(78),De=ns($.subarray(4,8)),De==="avcC"&&$.length>11?(f.codec+=".",f.codec+=zs($[9]),f.codec+=zs($[10]),f.codec+=zs($[11])):f.codec="avc1.4d400d"):/^mp4[a,v]$/i.test(f.codec)?($=Ae.subarray(28),De=ns($.subarray(4,8)),De==="esds"&&$.length>20&&$[19]!==0?(f.codec+="."+zs($[19]),f.codec+="."+zs($[20]>>>2&63).replace(/^0/,"")):f.codec="mp4a.40.2"):f.codec=f.codec.toLowerCase())}var Le=At(c,["mdia","mdhd"])[0];Le&&(f.timescale=ll(Le)),d.push(f)}),d},vh=function(o,u=0){var d=At(o,["emsg"]);return d.map(c=>{var f=ol.parseEmsgBox(new Uint8Array(c)),m=gA(f.message_data);return{cueTime:ol.scaleTime(f.presentation_time,f.timescale,f.presentation_time_delta,u),duration:ol.scaleTime(f.event_duration,f.timescale),frames:m}})};var cl={findBox:At,parseType:ns,timescale:hh,startTime:fh,compositionStartTime:ph,videoTrackIds:mh,tracks:gh,getTimescaleFromMediaHeader:ll,getEmsgID3:vh},dl=Kr,Ah=function(o){var u=o[1]&31;return u<<=8,u|=o[2],u},ha=function(o){return!!(o[1]&64)},fa=function(o){var u=0;return(o[3]&48)>>>4>1&&(u+=o[4]+1),u},vA=function(o,u){var d=Ah(o);return d===0?"pat":d===u?"pmt":u?"pes":null},AA=function(o){var u=ha(o),d=4+fa(o);return u&&(d+=o[d]+1),(o[d+10]&31)<<8|o[d+11]},yA=function(o){var u={},d=ha(o),c=4+fa(o);if(d&&(c+=o[c]+1),!!(o[c+5]&1)){var f,m,b;f=(o[c+1]&15)<<8|o[c+2],m=3+f-4,b=(o[c+10]&15)<<8|o[c+11];for(var E=12+b;E<m;){var S=c+E;u[(o[S+1]&31)<<8|o[S+2]]=o[S],E+=((o[S+3]&15)<<8|o[S+4])+5}return u}},_A=function(o,u){var d=Ah(o),c=u[d];switch(c){case dl.H264_STREAM_TYPE:return"video";case dl.ADTS_STREAM_TYPE:return"audio";case dl.METADATA_STREAM_TYPE:return"timed-metadata";default:return null}},bA=function(o){var u=ha(o);if(!u)return null;var d=4+fa(o);if(d>=o.byteLength)return null;var c=null,f;return f=o[d+7],f&192&&(c={},c.pts=(o[d+9]&14)<<27|(o[d+10]&255)<<20|(o[d+11]&254)<<12|(o[d+12]&255)<<5|(o[d+13]&254)>>>3,c.pts*=4,c.pts+=(o[d+13]&6)>>>1,c.dts=c.pts,f&64&&(c.dts=(o[d+14]&14)<<27|(o[d+15]&255)<<20|(o[d+16]&254)<<12|(o[d+17]&255)<<5|(o[d+18]&254)>>>3,c.dts*=4,c.dts+=(o[d+18]&6)>>>1)),c},hl=function(o){switch(o){case 5:return"slice_layer_without_partitioning_rbsp_idr";case 6:return"sei_rbsp";case 7:return"seq_parameter_set_rbsp";case 8:return"pic_parameter_set_rbsp";case 9:return"access_unit_delimiter_rbsp";default:return null}},EA=function(o){for(var u=4+fa(o),d=o.subarray(u),c=0,f=0,m=!1,b;f<d.byteLength-3;f++)if(d[f+2]===1){c=f+5;break}for(;c<d.byteLength;)switch(d[c]){case 0:if(d[c-1]!==0){c+=2;break}else if(d[c-2]!==0){c++;break}f+3!==c-2&&(b=hl(d[f+3]&31),b==="slice_layer_without_partitioning_rbsp_idr"&&(m=!0));do c++;while(d[c]!==1&&c<d.length);f=c-2,c+=3;break;case 1:if(d[c-1]!==0||d[c-2]!==0){c+=3;break}b=hl(d[f+3]&31),b==="slice_layer_without_partitioning_rbsp_idr"&&(m=!0),f=c-2,c+=3;break;default:c+=3;break}return d=d.subarray(f),c-=f,f=0,d&&d.byteLength>3&&(b=hl(d[f+3]&31),b==="slice_layer_without_partitioning_rbsp_idr"&&(m=!0)),m},TA={parseType:vA,parsePat:AA,parsePmt:yA,parsePayloadUnitStartIndicator:ha,parsePesType:_A,parsePesTime:bA,videoPacketContainsKeyFrame:EA},yh=Kr,ss=Vd.handleRollover,Ye={};Ye.ts=TA,Ye.aac=nl;var yn=at.ONE_SECOND_IN_TS,Nt=188,ji=71,CA=function(o,u){for(var d=0,c=Nt,f,m;c<o.byteLength;){if(o[d]===ji&&o[c]===ji){switch(f=o.subarray(d,c),m=Ye.ts.parseType(f,u.pid),m){case"pat":u.pid=Ye.ts.parsePat(f);break;case"pmt":var b=Ye.ts.parsePmt(f);u.table=u.table||{},Object.keys(b).forEach(function(E){u.table[E]=b[E]});break}d+=Nt,c+=Nt;continue}d++,c++}},_h=function(o,u,d){for(var c=0,f=Nt,m,b,E,S,j,k=!1;f<=o.byteLength;){if(o[c]===ji&&(o[f]===ji||f===o.byteLength)){switch(m=o.subarray(c,f),b=Ye.ts.parseType(m,u.pid),b){case"pes":E=Ye.ts.parsePesType(m,u.table),S=Ye.ts.parsePayloadUnitStartIndicator(m),E==="audio"&&S&&(j=Ye.ts.parsePesTime(m),j&&(j.type="audio",d.audio.push(j),k=!0));break}if(k)break;c+=Nt,f+=Nt;continue}c++,f++}for(f=o.byteLength,c=f-Nt,k=!1;c>=0;){if(o[c]===ji&&(o[f]===ji||f===o.byteLength)){switch(m=o.subarray(c,f),b=Ye.ts.parseType(m,u.pid),b){case"pes":E=Ye.ts.parsePesType(m,u.table),S=Ye.ts.parsePayloadUnitStartIndicator(m),E==="audio"&&S&&(j=Ye.ts.parsePesTime(m),j&&(j.type="audio",d.audio.push(j),k=!0));break}if(k)break;c-=Nt,f-=Nt;continue}c--,f--}},xA=function(o,u,d){for(var c=0,f=Nt,m,b,E,S,j,k,V,Ae,$=!1,De={data:[],size:0};f<o.byteLength;){if(o[c]===ji&&o[f]===ji){switch(m=o.subarray(c,f),b=Ye.ts.parseType(m,u.pid),b){case"pes":if(E=Ye.ts.parsePesType(m,u.table),S=Ye.ts.parsePayloadUnitStartIndicator(m),E==="video"&&(S&&!$&&(j=Ye.ts.parsePesTime(m),j&&(j.type="video",d.video.push(j),$=!0)),!d.firstKeyFrame)){if(S&&De.size!==0){for(k=new Uint8Array(De.size),V=0;De.data.length;)Ae=De.data.shift(),k.set(Ae,V),V+=Ae.byteLength;if(Ye.ts.videoPacketContainsKeyFrame(k)){var Le=Ye.ts.parsePesTime(k);Le?(d.firstKeyFrame=Le,d.firstKeyFrame.type="video"):console.warn("Failed to extract PTS/DTS from PES at first keyframe. This could be an unusual TS segment, or else mux.js did not parse your TS segment correctly. If you know your TS segments do contain PTS/DTS on keyframes please file a bug report! You can try ffprobe to double check for yourself.")}De.size=0}De.data.push(m),De.size+=m.byteLength}break}if($&&d.firstKeyFrame)break;c+=Nt,f+=Nt;continue}c++,f++}for(f=o.byteLength,c=f-Nt,$=!1;c>=0;){if(o[c]===ji&&o[f]===ji){switch(m=o.subarray(c,f),b=Ye.ts.parseType(m,u.pid),b){case"pes":E=Ye.ts.parsePesType(m,u.table),S=Ye.ts.parsePayloadUnitStartIndicator(m),E==="video"&&S&&(j=Ye.ts.parsePesTime(m),j&&(j.type="video",d.video.push(j),$=!0));break}if($)break;c-=Nt,f-=Nt;continue}c--,f--}},SA=function(o,u){if(o.audio&&o.audio.length){var d=u;(typeof d=="undefined"||isNaN(d))&&(d=o.audio[0].dts),o.audio.forEach(function(m){m.dts=ss(m.dts,d),m.pts=ss(m.pts,d),m.dtsTime=m.dts/yn,m.ptsTime=m.pts/yn})}if(o.video&&o.video.length){var c=u;if((typeof c=="undefined"||isNaN(c))&&(c=o.video[0].dts),o.video.forEach(function(m){m.dts=ss(m.dts,c),m.pts=ss(m.pts,c),m.dtsTime=m.dts/yn,m.ptsTime=m.pts/yn}),o.firstKeyFrame){var f=o.firstKeyFrame;f.dts=ss(f.dts,c),f.pts=ss(f.pts,c),f.dtsTime=f.dts/yn,f.ptsTime=f.pts/yn}}},jA=function(o){for(var u=!1,d=0,c=null,f=null,m=0,b=0,E;o.length-b>=3;){var S=Ye.aac.parseType(o,b);switch(S){case"timed-metadata":if(o.length-b<10){u=!0;break}if(m=Ye.aac.parseId3TagSize(o,b),m>o.length){u=!0;break}f===null&&(E=o.subarray(b,b+m),f=Ye.aac.parseAacTimestamp(E)),b+=m;break;case"audio":if(o.length-b<7){u=!0;break}if(m=Ye.aac.parseAdtsSize(o,b),m>o.length){u=!0;break}c===null&&(E=o.subarray(b,b+m),c=Ye.aac.parseSampleRate(E)),d++,b+=m;break;default:b++;break}if(u)return null}if(c===null||f===null)return null;var j=yn/c,k={audio:[{type:"audio",dts:f,pts:f},{type:"audio",dts:f+d*1024*j,pts:f+d*1024*j}]};return k},BA=function(o){var u={pid:null,table:null},d={};CA(o,u);for(var c in u.table)if(u.table.hasOwnProperty(c)){var f=u.table[c];switch(f){case yh.H264_STREAM_TYPE:d.video=[],xA(o,u,d),d.video.length===0&&delete d.video;break;case yh.ADTS_STREAM_TYPE:d.audio=[],_h(o,u,d),d.audio.length===0&&delete d.audio;break}}return d},wA=function(o,u){var d=Ye.aac.isLikelyAacData(o),c;return d?c=jA(o):c=BA(o),!c||!c.audio&&!c.video?null:(SA(c,u),c)},DA={inspect:wA,parseAudioPes_:_h};const kA=function(o,u){u.on("data",function(d){const c=d.initSegment;d.initSegment={data:c.buffer,byteOffset:c.byteOffset,byteLength:c.byteLength};const f=d.data;d.data=f.buffer,o.postMessage({action:"data",segment:d,byteOffset:f.byteOffset,byteLength:f.byteLength},[d.data])}),u.on("done",function(d){o.postMessage({action:"done"})}),u.on("gopInfo",function(d){o.postMessage({action:"gopInfo",gopInfo:d})}),u.on("videoSegmentTimingInfo",function(d){const c={start:{decode:at.videoTsToSeconds(d.start.dts),presentation:at.videoTsToSeconds(d.start.pts)},end:{decode:at.videoTsToSeconds(d.end.dts),presentation:at.videoTsToSeconds(d.end.pts)},baseMediaDecodeTime:at.videoTsToSeconds(d.baseMediaDecodeTime)};d.prependedContentDuration&&(c.prependedContentDuration=at.videoTsToSeconds(d.prependedContentDuration)),o.postMessage({action:"videoSegmentTimingInfo",videoSegmentTimingInfo:c})}),u.on("audioSegmentTimingInfo",function(d){const c={start:{decode:at.videoTsToSeconds(d.start.dts),presentation:at.videoTsToSeconds(d.start.pts)},end:{decode:at.videoTsToSeconds(d.end.dts),presentation:at.videoTsToSeconds(d.end.pts)},baseMediaDecodeTime:at.videoTsToSeconds(d.baseMediaDecodeTime)};d.prependedContentDuration&&(c.prependedContentDuration=at.videoTsToSeconds(d.prependedContentDuration)),o.postMessage({action:"audioSegmentTimingInfo",audioSegmentTimingInfo:c})}),u.on("id3Frame",function(d){o.postMessage({action:"id3Frame",id3Frame:d})}),u.on("caption",function(d){o.postMessage({action:"caption",caption:d})}),u.on("trackinfo",function(d){o.postMessage({action:"trackinfo",trackInfo:d})}),u.on("audioTimingInfo",function(d){o.postMessage({action:"audioTimingInfo",audioTimingInfo:{start:at.videoTsToSeconds(d.start),end:at.videoTsToSeconds(d.end)}})}),u.on("videoTimingInfo",function(d){o.postMessage({action:"videoTimingInfo",videoTimingInfo:{start:at.videoTsToSeconds(d.start),end:at.videoTsToSeconds(d.end)}})}),u.on("log",function(d){o.postMessage({action:"log",log:d})})};class bh{constructor(u,d){this.options=d||{},this.self=u,this.init()}init(){this.transmuxer&&this.transmuxer.dispose(),this.transmuxer=new Ov.Transmuxer(this.options),kA(this.self,this.transmuxer)}pushMp4Captions(u){this.captionParser||(this.captionParser=new sA,this.captionParser.init());const d=new Uint8Array(u.data,u.byteOffset,u.byteLength),c=this.captionParser.parse(d,u.trackIds,u.timescales);this.self.postMessage({action:"mp4Captions",captions:c&&c.captions||[],logs:c&&c.logs||[],data:d.buffer},[d.buffer])}probeMp4StartTime({timescales:u,data:d}){const c=cl.startTime(u,d);this.self.postMessage({action:"probeMp4StartTime",startTime:c,data:d},[d.buffer])}probeMp4Tracks({data:u}){const d=cl.tracks(u);this.self.postMessage({action:"probeMp4Tracks",tracks:d,data:u},[u.buffer])}probeEmsgID3({data:u,offset:d}){const c=cl.getEmsgID3(u,d);this.self.postMessage({action:"probeEmsgID3",id3Frames:c,emsgData:u},[u.buffer])}probeTs({data:u,baseStartTime:d}){const c=typeof d=="number"&&!isNaN(d)?d*at.ONE_SECOND_IN_TS:void 0,f=DA.inspect(u,c);let m=null;f&&(m={hasVideo:f.video&&f.video.length===2||!1,hasAudio:f.audio&&f.audio.length===2||!1},m.hasVideo&&(m.videoStart=f.video[0].ptsTime),m.hasAudio&&(m.audioStart=f.audio[0].ptsTime)),this.self.postMessage({action:"probeTs",result:m,data:u},[u.buffer])}clearAllMp4Captions(){this.captionParser&&this.captionParser.clearAllCaptions()}clearParsedMp4Captions(){this.captionParser&&this.captionParser.clearParsedCaptions()}push(u){const d=new Uint8Array(u.data,u.byteOffset,u.byteLength);this.transmuxer.push(d)}reset(){this.transmuxer.reset()}setTimestampOffset(u){const d=u.timestampOffset||0;this.transmuxer.setBaseMediaDecodeTime(Math.round(at.secondsToVideoTs(d)))}setAudioAppendStart(u){this.transmuxer.setAudioAppendStart(Math.ceil(at.secondsToVideoTs(u.appendStart)))}setRemux(u){this.transmuxer.setRemux(u.remux)}flush(u){this.transmuxer.flush(),self.postMessage({action:"done",type:"transmuxed"})}endTimeline(){this.transmuxer.endTimeline(),self.postMessage({action:"endedtimeline",type:"transmuxed"})}alignGopsWith(u){this.transmuxer.alignGopsWith(u.gopsToAlignWith.slice())}}self.onmessage=function(o){if(o.data.action==="init"&&o.data.options){this.messageHandlers=new bh(self,o.data.options);return}this.messageHandlers||(this.messageHandlers=new bh(self)),o.data&&o.data.action&&o.data.action!=="init"&&this.messageHandlers[o.data.action]&&this.messageHandlers[o.data.action](o.data)}}));var Mm=Nc(Rm);const Nm=(n,e,t)=>{const{type:i,initSegment:s,captions:r,captionStreams:a,metadata:l,videoFrameDtsTime:h,videoFramePtsTime:p}=n.data.segment;e.buffer.push({captions:r,captionStreams:a,metadata:l});const g=n.data.segment.boxes||{data:n.data.segment.data},_={type:i,data:new Uint8Array(g.data,g.data.byteOffset,g.data.byteLength),initSegment:new Uint8Array(s.data,s.byteOffset,s.byteLength)};typeof h!="undefined"&&(_.videoFrameDtsTime=h),typeof p!="undefined"&&(_.videoFramePtsTime=p),t(_)},Um=({transmuxedData:n,callback:e})=>{n.buffer=[],e(n)},Fm=(n,e)=>{e.gopInfo=n.data.gopInfo},Vc=n=>{const{transmuxer:e,bytes:t,audioAppendStart:i,gopsToAlignWith:s,remux:r,onData:a,onTrackInfo:l,onAudioTimingInfo:h,onVideoTimingInfo:p,onVideoSegmentTimingInfo:g,onAudioSegmentTimingInfo:_,onId3:w,onCaptions:D,onDone:C,onEndedTimeline:I,onTransmuxerLog:R,isEndOfTimeline:q}=n,L={buffer:[]};let X=q;const H=P=>{e.currentTransmux===n&&(P.data.action==="data"&&Nm(P,L,a),P.data.action==="trackinfo"&&l(P.data.trackInfo),P.data.action==="gopInfo"&&Fm(P,L),P.data.action==="audioTimingInfo"&&h(P.data.audioTimingInfo),P.data.action==="videoTimingInfo"&&p(P.data.videoTimingInfo),P.data.action==="videoSegmentTimingInfo"&&g(P.data.videoSegmentTimingInfo),P.data.action==="audioSegmentTimingInfo"&&_(P.data.audioSegmentTimingInfo),P.data.action==="id3Frame"&&w([P.data.id3Frame],P.data.id3Frame.dispatchType),P.data.action==="caption"&&D(P.data.caption),P.data.action==="endedtimeline"&&(X=!1,I()),P.data.action==="log"&&R(P.data.log),P.data.type==="transmuxed"&&(X||(e.onmessage=null,Um({transmuxedData:L,callback:C}),qc(e))))};if(e.onmessage=H,i&&e.postMessage({action:"setAudioAppendStart",appendStart:i}),Array.isArray(s)&&e.postMessage({action:"alignGopsWith",gopsToAlignWith:s}),typeof r!="undefined"&&e.postMessage({action:"setRemux",remux:r}),t.byteLength){const P=t instanceof ArrayBuffer?t:t.buffer,ce=t instanceof ArrayBuffer?0:t.byteOffset;e.postMessage({action:"push",data:P,byteOffset:ce,byteLength:t.byteLength},[P])}q&&e.postMessage({action:"endTimeline"}),e.postMessage({action:"flush"})},qc=n=>{n.currentTransmux=null,n.transmuxQueue.length&&(n.currentTransmux=n.transmuxQueue.shift(),typeof n.currentTransmux=="function"?n.currentTransmux():Vc(n.currentTransmux))},zc=(n,e)=>{n.postMessage({action:e}),qc(n)},Hc=(n,e)=>{if(!e.currentTransmux){e.currentTransmux=n,zc(e,n);return}e.transmuxQueue.push(zc.bind(null,e,n))},Vm=n=>{Hc("reset",n)},qm=n=>{Hc("endTimeline",n)},Wc=n=>{if(!n.transmuxer.currentTransmux){n.transmuxer.currentTransmux=n,Vc(n);return}n.transmuxer.transmuxQueue.push(n)};var Lo={reset:Vm,endTimeline:qm,transmux:Wc,createTransmuxer:n=>{const e=new Mm;e.currentTransmux=null,e.transmuxQueue=[];const t=e.terminate;return e.terminate=()=>(e.currentTransmux=null,e.transmuxQueue.length=0,t.call(e)),e.postMessage({action:"init",options:n}),e}};const Bs=function(n){const e=n.transmuxer,t=n.endAction||n.action,i=n.callback,s=(0,_e.A)({},n,{endAction:null,transmuxer:null,callback:null}),r=a=>{a.data.action===t&&(e.removeEventListener("message",r),a.data.data&&(a.data.data=new Uint8Array(a.data.data,n.byteOffset||0,n.byteLength||a.data.data.byteLength),n.data&&(n.data=a.data.data)),i(a.data))};if(e.addEventListener("message",r),n.data){const a=n.data instanceof ArrayBuffer;s.byteOffset=a?0:n.data.byteOffset,s.byteLength=n.data.byteLength;const l=[a?n.data:n.data.buffer];e.postMessage(s,l)}else e.postMessage(s)},Ci={FAILURE:2,TIMEOUT:-101,ABORTED:-102},Ro=n=>{n.forEach(e=>{e.abort()})},zm=n=>({bandwidth:n.bandwidth,bytesReceived:n.bytesReceived||0,roundTripTime:n.roundTripTime||0}),Hm=n=>{const e=n.target,i={bandwidth:1/0,bytesReceived:0,roundTripTime:Date.now()-e.requestTime||0};return i.bytesReceived=n.loaded,i.bandwidth=Math.floor(i.bytesReceived/i.roundTripTime*8*1e3),i},Mo=(n,e)=>e.timedout?{status:e.status,message:"HLS request timed-out at URL: "+e.uri,code:Ci.TIMEOUT,xhr:e}:e.aborted?{status:e.status,message:"HLS request aborted at URL: "+e.uri,code:Ci.ABORTED,xhr:e}:n?{status:e.status,message:"HLS request errored at URL: "+e.uri,code:Ci.FAILURE,xhr:e}:e.responseType==="arraybuffer"&&e.response.byteLength===0?{status:e.status,message:"Empty HLS response at URL: "+e.uri,code:Ci.FAILURE,xhr:e}:null,Gc=(n,e,t)=>(i,s)=>{const r=s.response,a=Mo(i,s);if(a)return t(a,n);if(r.byteLength!==16)return t({status:s.status,message:"Invalid HLS key at URL: "+s.uri,code:Ci.FAILURE,xhr:s},n);const l=new DataView(r),h=new Uint32Array([l.getUint32(0),l.getUint32(4),l.getUint32(8),l.getUint32(12)]);for(let p=0;p<e.length;p++)e[p].bytes=h;return t(null,n)},$c=(n,e)=>{const t=Ea(n.map.bytes);if(t!=="mp4"){const i=n.map.resolvedUri||n.map.uri,s=t||"unknown";return e({internal:!0,message:`Found unsupported ${s} container for initialization segment at URL: ${i}`,code:Ci.FAILURE,metadata:{errorType:M.Error.UnsupportedMediaInitialization,mediaType:s}})}Bs({action:"probeMp4Tracks",data:n.map.bytes,transmuxer:n.transmuxer,callback:({tracks:i,data:s})=>(n.map.bytes=s,i.forEach(function(r){n.map.tracks=n.map.tracks||{},!n.map.tracks[r.type]&&(n.map.tracks[r.type]=r,typeof r.id=="number"&&r.timescale&&(n.map.timescales=n.map.timescales||{},n.map.timescales[r.id]=r.timescale))}),e(null))})},Wm=({segment:n,finishProcessingFn:e})=>(t,i)=>{const s=Mo(t,i);if(s)return e(s,n);const r=new Uint8Array(i.response);if(n.map.key)return n.map.encryptedBytes=r,e(null,n);n.map.bytes=r,$c(n,function(a){if(a)return a.xhr=i,a.status=i.status,e(a,n);e(null,n)})},Gm=({segment:n,finishProcessingFn:e,responseType:t})=>(i,s)=>{const r=Mo(i,s);if(r)return e(r,n);const a=t==="arraybuffer"||!s.responseText?s.response:Om(s.responseText.substring(n.lastReachedChar||0));return n.stats=zm(s),n.key?n.encryptedBytes=new Uint8Array(a):n.bytes=new Uint8Array(a),e(null,n)},$m=({segment:n,bytes:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:_,onTransmuxerLog:w})=>{const D=n.map&&n.map.tracks||{},C=!!(D.audio&&D.video);let I=i.bind(null,n,"audio","start");const R=i.bind(null,n,"audio","end");let q=i.bind(null,n,"video","start");const L=i.bind(null,n,"video","end"),X=()=>Wc({bytes:e,transmuxer:n.transmuxer,audioAppendStart:n.audioAppendStart,gopsToAlignWith:n.gopsToAlignWith,remux:C,onData:H=>{H.type=H.type==="combined"?"video":H.type,g(n,H)},onTrackInfo:H=>{t&&(C&&(H.isMuxed=!0),t(n,H))},onAudioTimingInfo:H=>{I&&typeof H.start!="undefined"&&(I(H.start),I=null),R&&typeof H.end!="undefined"&&R(H.end)},onVideoTimingInfo:H=>{q&&typeof H.start!="undefined"&&(q(H.start),q=null),L&&typeof H.end!="undefined"&&L(H.end)},onVideoSegmentTimingInfo:H=>{s(H)},onAudioSegmentTimingInfo:H=>{r(H)},onId3:(H,P)=>{a(n,H,P)},onCaptions:H=>{l(n,[H])},isEndOfTimeline:h,onEndedTimeline:()=>{p()},onTransmuxerLog:w,onDone:H=>{_&&(H.type=H.type==="combined"?"video":H.type,_(null,n,H))}});Bs({action:"probeTs",transmuxer:n.transmuxer,data:e,baseStartTime:n.baseStartTime,callback:H=>{n.bytes=e=H.data;const P=H.result;P&&(t(n,{hasAudio:P.hasAudio,hasVideo:P.hasVideo,isMuxed:C}),t=null),X()}})},Xc=({segment:n,bytes:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:_,onTransmuxerLog:w})=>{let D=new Uint8Array(e);if(Sf(D)){n.isFmp4=!0;const{tracks:C}=n.map,I={isFmp4:!0,hasVideo:!!C.video,hasAudio:!!C.audio};C.audio&&C.audio.codec&&C.audio.codec!=="enca"&&(I.audioCodec=C.audio.codec),C.video&&C.video.codec&&C.video.codec!=="encv"&&(I.videoCodec=C.video.codec),C.video&&C.audio&&(I.isMuxed=!0),t(n,I);const R=(q,L)=>{g(n,{data:D,type:I.hasAudio&&!I.isMuxed?"audio":"video"}),L&&L.length&&a(n,L),q&&q.length&&l(n,q),_(null,n,{})};Bs({action:"probeMp4StartTime",timescales:n.map.timescales,data:D,transmuxer:n.transmuxer,callback:({data:q,startTime:L})=>{e=q.buffer,n.bytes=D=q,I.hasAudio&&!I.isMuxed&&i(n,"audio","start",L),I.hasVideo&&i(n,"video","start",L),Bs({action:"probeEmsgID3",data:D,transmuxer:n.transmuxer,offset:L,callback:({emsgData:X,id3Frames:H})=>{if(e=X.buffer,n.bytes=D=X,!C.video||!X.byteLength||!n.transmuxer){R(void 0,H);return}Bs({action:"pushMp4Captions",endAction:"mp4Captions",transmuxer:n.transmuxer,data:D,timescales:n.map.timescales,trackIds:[C.video.id],callback:P=>{e=P.data.buffer,n.bytes=D=P.data,P.logs.forEach(function(ce){w(Ge(ce,{stream:"mp4CaptionParser"}))}),R(P.captions,H)}})}})}});return}if(!n.transmuxer){_(null,n,{});return}if(typeof n.container=="undefined"&&(n.container=Ea(D)),n.container!=="ts"&&n.container!=="aac"){t(n,{hasAudio:!1,hasVideo:!1}),_(null,n,{});return}$m({segment:n,bytes:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:_,onTransmuxerLog:w})},Yc=function({id:n,key:e,encryptedBytes:t,decryptionWorker:i},s){const r=l=>{if(l.data.source===n){i.removeEventListener("message",r);const h=l.data.decrypted;s(new Uint8Array(h.bytes,h.byteOffset,h.byteLength))}};i.addEventListener("message",r);let a;e.bytes.slice?a=e.bytes.slice():a=new Uint32Array(Array.prototype.slice.call(e.bytes)),i.postMessage(Dc({source:n,encrypted:t,key:a,iv:e.iv}),[t.buffer,a.buffer])},Xm=({decryptionWorker:n,segment:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:_,onTransmuxerLog:w})=>{Yc({id:e.requestId,key:e.key,encryptedBytes:e.encryptedBytes,decryptionWorker:n},D=>{e.bytes=D,Xc({segment:e,bytes:e.bytes,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:_,onTransmuxerLog:w})})},Ym=({activeXhrs:n,decryptionWorker:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:_,onTransmuxerLog:w})=>{let D=0,C=!1;return(I,R)=>{if(!C){if(I)return C=!0,Ro(n),_(I,R);if(D+=1,D===n.length){const q=function(){if(R.encryptedBytes)return Xm({decryptionWorker:e,segment:R,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:_,onTransmuxerLog:w});Xc({segment:R,bytes:R.bytes,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g,doneFn:_,onTransmuxerLog:w})};if(R.endOfAllRequests=Date.now(),R.map&&R.map.encryptedBytes&&!R.map.bytes)return Yc({decryptionWorker:e,id:R.requestId+"-init",encryptedBytes:R.map.encryptedBytes,key:R.map.key},L=>{R.map.bytes=L,$c(R,X=>{if(X)return Ro(n),_(X,R);q()})});q()}}}},Km=({loadendState:n,abortFn:e})=>t=>{t.target.aborted&&e&&!n.calledAbortFn&&(e(),n.calledAbortFn=!0)},Qm=({segment:n,progressFn:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:p,dataFn:g})=>_=>{if(!_.target.aborted)return n.stats=Ge(n.stats,Hm(_)),!n.stats.firstBytesReceivedAt&&n.stats.bytesReceived&&(n.stats.firstBytesReceivedAt=Date.now()),e(_,n)},Jm=({xhr:n,xhrOptions:e,decryptionWorker:t,segment:i,abortFn:s,progressFn:r,trackInfoFn:a,timingInfoFn:l,videoSegmentTimingInfoFn:h,audioSegmentTimingInfoFn:p,id3Fn:g,captionsFn:_,isEndOfTimeline:w,endedTimelineFn:D,dataFn:C,doneFn:I,onTransmuxerLog:R})=>{const q=[],L=Ym({activeXhrs:q,decryptionWorker:t,trackInfoFn:a,timingInfoFn:l,videoSegmentTimingInfoFn:h,audioSegmentTimingInfoFn:p,id3Fn:g,captionsFn:_,isEndOfTimeline:w,endedTimelineFn:D,dataFn:C,doneFn:I,onTransmuxerLog:R});if(i.key&&!i.key.bytes){const Ee=[i.key];i.map&&!i.map.bytes&&i.map.key&&i.map.key.resolvedUri===i.key.resolvedUri&&Ee.push(i.map.key);const Ve=Ge(e,{uri:i.key.resolvedUri,responseType:"arraybuffer",requestType:"segment-key"}),He=Gc(i,Ee,L),mt=n(Ve,He);q.push(mt)}if(i.map&&!i.map.bytes){if(i.map.key&&(!i.key||i.key.resolvedUri!==i.map.key.resolvedUri)){const kt=Ge(e,{uri:i.map.key.resolvedUri,responseType:"arraybuffer",requestType:"segment-key"}),gt=Gc(i,[i.map.key],L),Be=n(kt,gt);q.push(Be)}const Ve=Ge(e,{uri:i.map.resolvedUri,responseType:"arraybuffer",headers:Io(i.map),requestType:"segment-media-initialization"}),He=Wm({segment:i,finishProcessingFn:L}),mt=n(Ve,He);q.push(mt)}const X=Ge(e,{uri:i.part&&i.part.resolvedUri||i.resolvedUri,responseType:"arraybuffer",headers:Io(i),requestType:"segment"}),H=Gm({segment:i,finishProcessingFn:L,responseType:X.responseType}),P=n(X,H);P.addEventListener("progress",Qm({segment:i,progressFn:r,trackInfoFn:a,timingInfoFn:l,videoSegmentTimingInfoFn:h,audioSegmentTimingInfoFn:p,id3Fn:g,captionsFn:_,isEndOfTimeline:w,endedTimelineFn:D,dataFn:C})),q.push(P);const ce={};return q.forEach(Ee=>{Ee.addEventListener("loadend",Km({loadendState:ce,abortFn:s}))}),()=>Ro(q)},Zm=si("CodecUtils"),eg=function(n){const e=n.attributes||{};if(e.CODECS)return Ie(e.CODECS)},Kc=(n,e)=>{const t=e.attributes||{};return n&&n.mediaGroups&&n.mediaGroups.AUDIO&&t.AUDIO&&n.mediaGroups.AUDIO[t.AUDIO]},tg=(n,e)=>{if(!Kc(n,e))return!0;const t=e.attributes||{},i=n.mediaGroups.AUDIO[t.AUDIO];for(const s in i)if(!i[s].uri&&!i[s].playlists)return!0;return!1},Rr=function(n){const e={};return n.forEach(({mediaType:t,type:i,details:s})=>{e[t]=e[t]||[],e[t].push(Z(`${i}${s}`))}),Object.keys(e).forEach(function(t){if(e[t].length>1){Zm(`multiple ${t} codecs found as attributes: ${e[t].join(", ")}. Setting playlist codecs to null so that we wait for mux.js to probe segments for real codecs.`),e[t]=null;return}e[t]=e[t][0]}),e},Qc=function(n){let e=0;return n.audio&&e++,n.video&&e++,e},ws=function(n,e){const t=e.attributes||{},i=Rr(eg(e)||[]);if(Kc(n,e)&&!i.audio&&!tg(n,e)){const s=Rr(qe(n,t.AUDIO)||[]);s.audio&&(i.audio=s.audio)}return i},Mr=si("PlaylistSelector"),Jc=function(n){if(!n||!n.playlist)return;const e=n.playlist;return JSON.stringify({id:e.id,bandwidth:n.bandwidth,width:n.width,height:n.height,codecs:e.attributes&&e.attributes.CODECS||""})},Nr=function(n,e){if(!n)return"";const t=A().getComputedStyle(n);return t?t[e]:""},Jn=function(n,e){const t=n.slice();n.sort(function(i,s){const r=e(i,s);return r===0?t.indexOf(i)-t.indexOf(s):r})},No=function(n,e){let t,i;return n.attributes.BANDWIDTH&&(t=n.attributes.BANDWIDTH),t=t||A().Number.MAX_VALUE,e.attributes.BANDWIDTH&&(i=e.attributes.BANDWIDTH),i=i||A().Number.MAX_VALUE,t-i},ig=function(n,e){let t,i;return n.attributes.RESOLUTION&&n.attributes.RESOLUTION.width&&(t=n.attributes.RESOLUTION.width),t=t||A().Number.MAX_VALUE,e.attributes.RESOLUTION&&e.attributes.RESOLUTION.width&&(i=e.attributes.RESOLUTION.width),i=i||A().Number.MAX_VALUE,t===i&&n.attributes.BANDWIDTH&&e.attributes.BANDWIDTH?n.attributes.BANDWIDTH-e.attributes.BANDWIDTH:t-i};let Zc=function(n,e,t,i,s,r){if(!n)return;const a={bandwidth:e,width:t,height:i,limitRenditionByPlayerDimensions:s};let l=n.playlists;Ht.isAudioOnly(n)&&(l=r.getAudioTrackPlaylists_(),a.audioOnly=!0);let h=l.map(P=>{let ce;const Ee=P.attributes&&P.attributes.RESOLUTION&&P.attributes.RESOLUTION.width,Ve=P.attributes&&P.attributes.RESOLUTION&&P.attributes.RESOLUTION.height;return ce=P.attributes&&P.attributes.BANDWIDTH,ce=ce||A().Number.MAX_VALUE,{bandwidth:ce,width:Ee,height:Ve,playlist:P}});Jn(h,(P,ce)=>P.bandwidth-ce.bandwidth),h=h.filter(P=>!Ht.isIncompatible(P.playlist));let p=h.filter(P=>Ht.isEnabled(P.playlist));p.length||(p=h.filter(P=>!Ht.isDisabled(P.playlist)));const g=p.filter(P=>P.bandwidth*jt.BANDWIDTH_VARIANCE<e);let _=g[g.length-1];const w=g.filter(P=>P.bandwidth===_.bandwidth)[0];if(s===!1){const P=w||p[0]||h[0];if(P&&P.playlist){let ce="sortedPlaylistReps";return w&&(ce="bandwidthBestRep"),p[0]&&(ce="enabledPlaylistReps"),Mr(`choosing ${Jc(P)} using ${ce} with options`,a),P.playlist}return Mr("could not choose a playlist with options",a),null}const D=g.filter(P=>P.width&&P.height);Jn(D,(P,ce)=>P.width-ce.width);const C=D.filter(P=>P.width===t&&P.height===i);_=C[C.length-1];const I=C.filter(P=>P.bandwidth===_.bandwidth)[0];let R,q,L;I||(R=D.filter(P=>P.width>t||P.height>i),q=R.filter(P=>P.width===R[0].width&&P.height===R[0].height),_=q[q.length-1],L=q.filter(P=>P.bandwidth===_.bandwidth)[0]);let X;if(r.leastPixelDiffSelector){const P=D.map(ce=>(ce.pixelDiff=Math.abs(ce.width-t)+Math.abs(ce.height-i),ce));Jn(P,(ce,Ee)=>ce.pixelDiff===Ee.pixelDiff?Ee.bandwidth-ce.bandwidth:ce.pixelDiff-Ee.pixelDiff),X=P[0]}const H=X||L||I||w||p[0]||h[0];if(H&&H.playlist){let P="sortedPlaylistReps";return X?P="leastPixelDiffRep":L?P="resolutionPlusOneRep":I?P="resolutionBestRep":w?P="bandwidthBestRep":p[0]&&(P="enabledPlaylistReps"),Mr(`choosing ${Jc(H)} using ${P} with options`,a),H.playlist}return Mr("could not choose a playlist with options",a),null};const ed=function(){let n=this.useDevicePixelRatio&&A().devicePixelRatio||1;return isNaN(this.customPixelRatio)||(n=this.customPixelRatio),Zc(this.playlists.main,this.systemBandwidth,parseInt(Nr(this.tech_.el(),"width"),10)*n,parseInt(Nr(this.tech_.el(),"height"),10)*n,this.limitRenditionByPlayerDimensions,this.playlistController_)},ng=function(n){let e=-1,t=-1;if(n<0||n>1)throw new Error("Moving average bandwidth decay must be between 0 and 1.");return function(){let i=this.useDevicePixelRatio&&A().devicePixelRatio||1;return isNaN(this.customPixelRatio)||(i=this.customPixelRatio),e<0&&(e=this.systemBandwidth,t=this.systemBandwidth),this.systemBandwidth>0&&this.systemBandwidth!==t&&(e=n*this.systemBandwidth+(1-n)*e,t=this.systemBandwidth),Zc(this.playlists.main,e,parseInt(Nr(this.tech_.el(),"width"),10)*i,parseInt(Nr(this.tech_.el(),"height"),10)*i,this.limitRenditionByPlayerDimensions,this.playlistController_)}},sg=function(n){const{main:e,currentTime:t,bandwidth:i,duration:s,segmentDuration:r,timeUntilRebuffer:a,currentTimeline:l,syncController:h}=n,p=e.playlists.filter(C=>!Ht.isIncompatible(C));let g=p.filter(Ht.isEnabled);g.length||(g=p.filter(C=>!Ht.isDisabled(C)));const w=g.filter(Ht.hasAttribute.bind(null,"BANDWIDTH")).map(C=>{const R=h.getSyncPoint(C,s,l,t)?1:2,L=Ht.estimateSegmentRequestTime(r,i,C)*R-a;return{playlist:C,rebufferingImpact:L}}),D=w.filter(C=>C.rebufferingImpact<=0);return Jn(D,(C,I)=>No(I.playlist,C.playlist)),D.length?D[0]:(Jn(w,(C,I)=>C.rebufferingImpact-I.rebufferingImpact),w[0]||null)},rg=function(){const n=this.playlists.main.playlists.filter(Ht.isEnabled);return Jn(n,(t,i)=>No(t,i)),n.filter(t=>!!ws(this.playlists.main,t).video)[0]||null},ag=n=>{let e=0,t;return n.bytes&&(t=new Uint8Array(n.bytes),n.segments.forEach(i=>{t.set(i,e),e+=i.byteLength})),t};function td(n){try{return new URL(n).pathname.split("/").slice(-2).join("/")}catch(e){return""}}const og=function(n,e,t){if(!n[t]){e.trigger({type:"usage",name:"vhs-608"});let i=t;/^cc708_/.test(t)&&(i="SERVICE"+t.split("_")[1]);const s=e.textTracks().getTrackById(i);if(s)n[t]=s;else{const r=e.options_.vhs&&e.options_.vhs.captionServices||{};let a=t,l=t,h=!1;const p=r[i];p&&(a=p.label,l=p.language,h=p.default),n[t]=e.addRemoteTextTrack({kind:"captions",id:i,default:h,label:a,language:l},!1).track}}},lg=function({inbandTextTracks:n,captionArray:e,timestampOffset:t}){if(!e)return;const i=A().WebKitDataCue||A().VTTCue;e.forEach(s=>{const r=s.stream;s.content?s.content.forEach(a=>{const l=new i(s.startTime+t,s.endTime+t,a.text);l.line=a.line,l.align="left",l.position=a.position,l.positionAlign="line-left",n[r].addCue(l)}):n[r].addCue(new i(s.startTime+t,s.endTime+t,s.text))})},ug=function(n){Object.defineProperties(n.frame,{id:{get(){return M.log.warn("cue.frame.id is deprecated. Use cue.value.key instead."),n.value.key}},value:{get(){return M.log.warn("cue.frame.value is deprecated. Use cue.value.data instead."),n.value.data}},privateData:{get(){return M.log.warn("cue.frame.privateData is deprecated. Use cue.value.data instead."),n.value.data}}})},cg=({inbandTextTracks:n,metadataArray:e,timestampOffset:t,videoDuration:i})=>{if(!e)return;const s=A().WebKitDataCue||A().VTTCue,r=n.metadataTrack_;if(!r||(e.forEach(g=>{const _=g.cueTime+t;typeof _!="number"||A().isNaN(_)||_<0||!(_<1/0)||!g.frames||!g.frames.length||g.frames.forEach(w=>{const D=new s(_,_,w.value||w.url||w.data||"");D.frame=w,D.value=w,ug(D),r.addCue(D)})}),!r.cues||!r.cues.length))return;const a=r.cues,l=[];for(let g=0;g<a.length;g++)a[g]&&l.push(a[g]);const h=l.reduce((g,_)=>{const w=g[_.startTime]||[];return w.push(_),g[_.startTime]=w,g},{}),p=Object.keys(h).sort((g,_)=>Number(g)-Number(_));p.forEach((g,_)=>{const w=h[g],D=isFinite(i)?i:g,C=Number(p[_+1])||D;w.forEach(I=>{I.endTime=C})})},dg={id:"ID",class:"CLASS",startDate:"START-DATE",duration:"DURATION",endDate:"END-DATE",endOnNext:"END-ON-NEXT",plannedDuration:"PLANNED-DURATION",scte35Out:"SCTE35-OUT",scte35In:"SCTE35-IN"},hg=new Set(["id","class","startDate","duration","endDate","endOnNext","startTime","endTime","processDateRange"]),fg=({inbandTextTracks:n,dateRanges:e})=>{const t=n.metadataTrack_;if(!t)return;const i=A().WebKitDataCue||A().VTTCue;e.forEach(s=>{for(const r of Object.keys(s)){if(hg.has(r))continue;const a=new i(s.startTime,s.endTime,"");a.id=s.id,a.type="com.apple.quicktime.HLS",a.value={key:dg[r],data:s[r]},(r==="scte35Out"||r==="scte35In")&&(a.value.data=new Uint8Array(a.value.data.match(/[\da-f]{2}/gi)).buffer),t.addCue(a)}s.processDateRange()})},id=(n,e,t)=>{n.metadataTrack_||(n.metadataTrack_=t.addRemoteTextTrack({kind:"metadata",label:"Timed Metadata"},!1).track,M.browser.IS_ANY_SAFARI||(n.metadataTrack_.inBandMetadataTrackDispatchType=e))},Ds=function(n,e,t){let i,s;if(t&&t.cues)for(i=t.cues.length;i--;)s=t.cues[i],s.startTime>=n&&s.endTime<=e&&t.removeCue(s)},pg=function(n){const e=n.cues;if(!e)return;const t={};for(let i=e.length-1;i>=0;i--){const s=e[i],r=`${s.startTime}-${s.endTime}-${s.text}`;t[r]?n.removeCue(s):t[r]=s}},mg=(n,e,t)=>{if(typeof e=="undefined"||e===null||!n.length)return[];const i=Math.ceil((e-t+3)*sn.ONE_SECOND_IN_TS);let s;for(s=0;s<n.length&&!(n[s].pts>i);s++);return n.slice(s)},gg=(n,e,t)=>{if(!e.length)return n;if(t)return e.slice();const i=e[0].pts;let s=0;for(s;s<n.length&&!(n[s].pts>=i);s++);return n.slice(0,s).concat(e)},vg=(n,e,t,i)=>{const s=Math.ceil((e-i)*sn.ONE_SECOND_IN_TS),r=Math.ceil((t-i)*sn.ONE_SECOND_IN_TS),a=n.slice();let l=n.length;for(;l--&&!(n[l].pts<=r););if(l===-1)return a;let h=l+1;for(;h--&&!(n[h].pts<=s););return h=Math.max(h,0),a.splice(h,l-h+1),a},Ag=function(n,e){if(!n&&!e||!n&&e||n&&!e)return!1;if(n===e)return!0;const t=Object.keys(n).sort(),i=Object.keys(e).sort();if(t.length!==i.length)return!1;for(let s=0;s<t.length;s++){const r=t[s];if(r!==i[s]||n[r]!==e[r])return!1}return!0},nd=22,yg=function(n,e,t){e=e||[];const i=[];let s=0;for(let r=0;r<e.length;r++){const a=e[r];if(n===a.timeline&&(i.push(r),s+=a.duration,s>t))return r}return i.length===0?0:i[i.length-1]},ks=1,_g=500,sd=n=>typeof n=="number"&&isFinite(n),Ur=1/60,bg=(n,e,t)=>n!=="main"||!e||!t?null:!t.hasAudio&&!t.hasVideo?"Neither audio nor video found in segment.":e.hasVideo&&!t.hasVideo?"Only audio found in segment when we expected video. We can't switch to audio only from a stream that had video. To get rid of this message, please add codec information to the manifest.":!e.hasVideo&&t.hasVideo?"Video found in segment when we expected only audio. We can't switch to a stream with video from an audio only stream. To get rid of this message, please add codec information to the manifest.":null,Eg=(n,e,t)=>{let i=e-jt.BACK_BUFFER_LENGTH;n.length&&(i=Math.max(i,n.start(0)));const s=e-t;return Math.min(s,i)},Zn=n=>{const{startOfSegment:e,duration:t,segment:i,part:s,playlist:{mediaSequence:r,id:a,segments:l=[]},mediaIndex:h,partIndex:p,timeline:g}=n,_=l.length-1;let w="mediaIndex/partIndex increment";n.getMediaInfoForTime?w=`getMediaInfoForTime (${n.getMediaInfoForTime})`:n.isSyncRequest&&(w="getSyncSegmentCandidate (isSyncRequest)"),n.independent&&(w+=` with independent ${n.independent}`);const D=typeof p=="number",C=n.segment.uri?"segment":"pre-segment",I=D?fc({preloadSegment:i})-1:0;return`${C} [${r+h}/${r+_}]`+(D?` part [${p}/${I}]`:"")+` segment start/end [${i.start} => ${i.end}]`+(D?` part start/end [${s.start} => ${s.end}]`:"")+` startOfSegment [${e}] duration [${t}] timeline [${g}] selected by [${w}] playlist [${a}]`},rd=n=>`${n}TimingInfo`,Tg=({segmentTimeline:n,currentTimeline:e,startOfSegment:t,buffered:i,overrideCheck:s})=>!s&&n===e?null:n<e?t:i.length?i.end(i.length-1):t,ad=({timelineChangeController:n,currentTimeline:e,segmentTimeline:t,loaderType:i,audioDisabled:s})=>{if(e===t)return!1;if(i==="audio"){const r=n.lastTimelineChange({type:"main"});return!r||r.to!==t}if(i==="main"&&s){const r=n.pendingTimelineChange({type:"audio"});return!(r&&r.to===t)}return!1},Cg=n=>{let e=0;return["video","audio"].forEach(function(t){const i=n[`${t}TimingInfo`];if(!i)return;const{start:s,end:r}=i;let a;typeof s=="bigint"||typeof r=="bigint"?a=A().BigInt(r)-A().BigInt(s):typeof s=="number"&&typeof r=="number"&&(a=r-s),typeof a!="undefined"&&a>e&&(e=a)}),typeof e=="bigint"&&e<Number.MAX_SAFE_INTEGER&&(e=Number(e)),e},od=({segmentDuration:n,maxDuration:e})=>n?Math.round(n)>e+Ei:!1,xg=(n,e)=>{if(e!=="hls")return null;const t=Cg({audioTimingInfo:n.audioTimingInfo,videoTimingInfo:n.videoTimingInfo});if(!t)return null;const i=n.playlist.targetDuration,s=od({segmentDuration:t,maxDuration:i*2}),r=od({segmentDuration:t,maxDuration:i}),a=`Segment with index ${n.mediaIndex} from playlist ${n.playlist.id} has a duration of ${t} when the reported duration is ${n.duration} and the target duration is ${i}. For HLS content, a duration in excess of the target duration may result in playback issues. See the HLS specification section on EXT-X-TARGETDURATION for more details: https://tools.ietf.org/html/draft-pantos-http-live-streaming-23#section-4.3.3.1`;return s||r?{severity:s?"warn":"info",message:a}:null};class Uo extends M.EventTarget{constructor(e,t={}){if(super(),!e)throw new TypeError("Initialization settings are required");if(typeof e.currentTime!="function")throw new TypeError("No currentTime getter specified");if(!e.mediaSource)throw new TypeError("No MediaSource specified");this.bandwidth=e.bandwidth,this.throughput={rate:0,count:0},this.roundTrip=NaN,this.resetStats_(),this.mediaIndex=null,this.partIndex=null,this.hasPlayed_=e.hasPlayed,this.currentTime_=e.currentTime,this.seekable_=e.seekable,this.seeking_=e.seeking,this.duration_=e.duration,this.mediaSource_=e.mediaSource,this.vhs_=e.vhs,this.loaderType_=e.loaderType,this.currentMediaInfo_=void 0,this.startingMediaInfo_=void 0,this.segmentMetadataTrack_=e.segmentMetadataTrack,this.goalBufferLength_=e.goalBufferLength,this.sourceType_=e.sourceType,this.sourceUpdater_=e.sourceUpdater,this.inbandTextTracks_=e.inbandTextTracks,this.state_="INIT",this.timelineChangeController_=e.timelineChangeController,this.shouldSaveSegmentTimingInfo_=!0,this.parse708captions_=e.parse708captions,this.useDtsForTimestampOffset_=e.useDtsForTimestampOffset,this.captionServices_=e.captionServices,this.exactManifestTimings=e.exactManifestTimings,this.addMetadataToTextTrack=e.addMetadataToTextTrack,this.checkBufferTimeout_=null,this.error_=void 0,this.currentTimeline_=-1,this.shouldForceTimestampOffsetAfterResync_=!1,this.pendingSegment_=null,this.xhrOptions_=null,this.pendingSegments_=[],this.audioDisabled_=!1,this.isPendingTimestampOffset_=!1,this.gopBuffer_=[],this.timeMapping_=0,this.safeAppend_=!1,this.appendInitSegment_={audio:!0,video:!0},this.playlistOfLastInitSegment_={audio:null,video:null},this.callQueue_=[],this.loadQueue_=[],this.metadataQueue_={id3:[],caption:[]},this.waitingOnRemove_=!1,this.quotaExceededErrorRetryTimeout_=null,this.activeInitSegmentId_=null,this.initSegments_={},this.cacheEncryptionKeys_=e.cacheEncryptionKeys,this.keyCache_={},this.decrypter_=e.decrypter,this.syncController_=e.syncController,this.syncPoint_={segmentIndex:0,time:0},this.transmuxer_=this.createTransmuxer_(),this.triggerSyncInfoUpdate_=()=>this.trigger("syncinfoupdate"),this.syncController_.on("syncinfoupdate",this.triggerSyncInfoUpdate_),this.mediaSource_.addEventListener("sourceopen",()=>{this.isEndOfStream_()||(this.ended_=!1)}),this.fetchAtBuffer_=!1,this.logger_=si(`SegmentLoader[${this.loaderType_}]`),Object.defineProperty(this,"state",{get(){return this.state_},set(i){i!==this.state_&&(this.logger_(`${this.state_} -> ${i}`),this.state_=i,this.trigger("statechange"))}}),this.sourceUpdater_.on("ready",()=>{this.hasEnoughInfoToAppend_()&&this.processCallQueue_()}),this.loaderType_==="main"&&this.timelineChangeController_.on("pendingtimelinechange",()=>{this.hasEnoughInfoToAppend_()&&this.processCallQueue_()}),this.loaderType_==="audio"&&this.timelineChangeController_.on("timelinechange",()=>{this.hasEnoughInfoToLoad_()&&this.processLoadQueue_(),this.hasEnoughInfoToAppend_()&&this.processCallQueue_()})}get mediaSequenceSync_(){return this.syncController_.getMediaSequenceSync(this.loaderType_)}createTransmuxer_(){return Lo.createTransmuxer({remux:!1,alignGopsAtEnd:this.safeAppend_,keepOriginalTimestamps:!0,parse708captions:this.parse708captions_,captionServices:this.captionServices_})}resetStats_(){this.mediaBytesTransferred=0,this.mediaRequests=0,this.mediaRequestsAborted=0,this.mediaRequestsTimedout=0,this.mediaRequestsErrored=0,this.mediaTransferDuration=0,this.mediaSecondsLoaded=0,this.mediaAppends=0}dispose(){this.trigger("dispose"),this.state="DISPOSED",this.pause(),this.abort_(),this.transmuxer_&&this.transmuxer_.terminate(),this.resetStats_(),this.checkBufferTimeout_&&A().clearTimeout(this.checkBufferTimeout_),this.syncController_&&this.triggerSyncInfoUpdate_&&this.syncController_.off("syncinfoupdate",this.triggerSyncInfoUpdate_),this.off()}setAudio(e){this.audioDisabled_=!e,e?this.appendInitSegment_.audio=!0:this.sourceUpdater_.removeAudio(0,this.duration_())}abort(){if(this.state!=="WAITING"){this.pendingSegment_&&(this.pendingSegment_=null);return}this.abort_(),this.state="READY",this.paused()||this.monitorBuffer_()}abort_(){this.pendingSegment_&&this.pendingSegment_.abortRequests&&this.pendingSegment_.abortRequests(),this.pendingSegment_=null,this.callQueue_=[],this.loadQueue_=[],this.metadataQueue_.id3=[],this.metadataQueue_.caption=[],this.timelineChangeController_.clearPendingTimelineChange(this.loaderType_),this.waitingOnRemove_=!1,A().clearTimeout(this.quotaExceededErrorRetryTimeout_),this.quotaExceededErrorRetryTimeout_=null}checkForAbort_(e){return this.state==="APPENDING"&&!this.pendingSegment_?(this.state="READY",!0):!this.pendingSegment_||this.pendingSegment_.requestId!==e}error(e){return typeof e!="undefined"&&(this.logger_("error occurred:",e),this.error_=e),this.pendingSegment_=null,this.error_}endOfStream(){this.ended_=!0,this.transmuxer_&&Lo.reset(this.transmuxer_),this.gopBuffer_.length=0,this.pause(),this.trigger("ended")}buffered_(){const e=this.getMediaInfo_();if(!this.sourceUpdater_||!e)return Dt();if(this.loaderType_==="main"){const{hasAudio:t,hasVideo:i,isMuxed:s}=e;if(i&&t&&!this.audioDisabled_&&!s)return this.sourceUpdater_.buffered();if(i)return this.sourceUpdater_.videoBuffered()}return this.sourceUpdater_.audioBuffered()}initSegmentForMap(e,t=!1){if(!e)return null;const i=Lr(e);let s=this.initSegments_[i];return t&&!s&&e.bytes&&(this.initSegments_[i]=s={resolvedUri:e.resolvedUri,byterange:e.byterange,bytes:e.bytes,tracks:e.tracks,timescales:e.timescales}),s||e}segmentKey(e,t=!1){if(!e)return null;const i=kc(e);let s=this.keyCache_[i];this.cacheEncryptionKeys_&&t&&!s&&e.bytes&&(this.keyCache_[i]=s={resolvedUri:e.resolvedUri,bytes:e.bytes});const r={resolvedUri:(s||e).resolvedUri};return s&&(r.bytes=s.bytes),r}couldBeginLoading_(){return this.playlist_&&!this.paused()}load(){if(this.monitorBuffer_(),!!this.playlist_){if(this.state==="INIT"&&this.couldBeginLoading_())return this.init_();!this.couldBeginLoading_()||this.state!=="READY"&&this.state!=="INIT"||(this.state="READY")}}init_(){return this.state="READY",this.resetEverything(),this.monitorBuffer_()}playlist(e,t={}){if(!e)return;const i=this.playlist_,s=this.pendingSegment_;this.playlist_=e,this.xhrOptions_=t,this.state==="INIT"&&(e.syncInfo={mediaSequence:e.mediaSequence,time:0},this.loaderType_==="main"&&this.syncController_.setDateTimeMappingForStart(e));let r=null;if(i&&(i.id?r=i.id:i.uri&&(r=i.uri)),this.logger_(`playlist update [${r} => ${e.id||e.uri}]`),this.mediaSequenceSync_&&(this.mediaSequenceSync_.update(e,this.currentTime_()),this.logger_(`Playlist update:
currentTime: ${this.currentTime_()}
bufferedEnd: ${Eo(this.buffered_())}
`,this.mediaSequenceSync_.diagnostics)),this.trigger("syncinfoupdate"),this.state==="INIT"&&this.couldBeginLoading_())return this.init_();if(!i||i.uri!==e.uri){this.mediaIndex!==null&&(!e.endList&&typeof e.partTargetDuration=="number"?this.resetLoader():this.resyncLoader()),this.currentMediaInfo_=void 0,this.trigger("playlistupdate");return}const a=e.mediaSequence-i.mediaSequence;if(this.logger_(`live window shift [${a}]`),this.mediaIndex!==null)if(this.mediaIndex-=a,this.mediaIndex<0)this.mediaIndex=null,this.partIndex=null;else{const l=this.playlist_.segments[this.mediaIndex];if(this.partIndex&&(!l.parts||!l.parts.length||!l.parts[this.partIndex])){const h=this.mediaIndex;this.logger_(`currently processing part (index ${this.partIndex}) no longer exists.`),this.resetLoader(),this.mediaIndex=h}}s&&(s.mediaIndex-=a,s.mediaIndex<0?(s.mediaIndex=null,s.partIndex=null):(s.mediaIndex>=0&&(s.segment=e.segments[s.mediaIndex]),s.partIndex>=0&&s.segment.parts&&(s.part=s.segment.parts[s.partIndex]))),this.syncController_.saveExpiredSegmentInfo(i,e)}pause(){this.checkBufferTimeout_&&(A().clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=null)}paused(){return this.checkBufferTimeout_===null}resetEverything(e){this.ended_=!1,this.activeInitSegmentId_=null,this.appendInitSegment_={audio:!0,video:!0},this.resetLoader(),this.remove(0,1/0,e),this.transmuxer_&&(this.transmuxer_.postMessage({action:"clearAllMp4Captions"}),this.transmuxer_.postMessage({action:"reset"}))}resetLoader(){this.fetchAtBuffer_=!1,this.mediaSequenceSync_&&this.mediaSequenceSync_.resetAppendedStatus(),this.resyncLoader()}resyncLoader(){this.transmuxer_&&Lo.reset(this.transmuxer_),this.mediaIndex=null,this.partIndex=null,this.syncPoint_=null,this.isPendingTimestampOffset_=!1;const e=this.currentMediaInfo_&&this.currentMediaInfo_.isFmp4;this.sourceType_==="hls"&&!e&&(this.shouldForceTimestampOffsetAfterResync_=!0),this.callQueue_=[],this.loadQueue_=[],this.metadataQueue_.id3=[],this.metadataQueue_.caption=[],this.abort(),this.transmuxer_&&this.transmuxer_.postMessage({action:"clearParsedMp4Captions"})}remove(e,t,i=()=>{},s=!1){if(t===1/0&&(t=this.duration_()),t<=e){this.logger_("skipping remove because end ${end} is <= start ${start}");return}if(!this.sourceUpdater_||!this.getMediaInfo_()){this.logger_("skipping remove because no source updater or starting media info");return}let r=1;const a=()=>{r--,r===0&&i()};(s||!this.audioDisabled_)&&(r++,this.sourceUpdater_.removeAudio(e,t,a)),(s||this.loaderType_==="main")&&(this.gopBuffer_=vg(this.gopBuffer_,e,t,this.timeMapping_),r++,this.sourceUpdater_.removeVideo(e,t,a));for(const l in this.inbandTextTracks_)Ds(e,t,this.inbandTextTracks_[l]);Ds(e,t,this.segmentMetadataTrack_),a()}monitorBuffer_(){this.checkBufferTimeout_&&A().clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=A().setTimeout(this.monitorBufferTick_.bind(this),1)}monitorBufferTick_(){this.state==="READY"&&this.fillBuffer_(),this.checkBufferTimeout_&&A().clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=A().setTimeout(this.monitorBufferTick_.bind(this),_g)}fillBuffer_(){if(this.sourceUpdater_.updating())return;const e=this.chooseNextRequest_();e&&(typeof e.timestampOffset=="number"&&(this.isPendingTimestampOffset_=!1,this.timelineChangeController_.pendingTimelineChange({type:this.loaderType_,from:this.currentTimeline_,to:e.timeline})),this.loadSegment_(e))}isEndOfStream_(e=this.mediaIndex,t=this.playlist_,i=this.partIndex){if(!t||!this.mediaSource_)return!1;const s=typeof e=="number"&&t.segments[e],r=e+1===t.segments.length,a=!s||!s.parts||i+1===s.parts.length;return t.endList&&this.mediaSource_.readyState==="open"&&r&&a}chooseNextRequest_(){const e=this.buffered_(),t=Eo(e)||0,i=To(e,this.currentTime_()),s=!this.hasPlayed_()&&i>=1,r=i>=this.goalBufferLength_(),a=this.playlist_.segments;if(!a.length||s||r)return null;this.syncPoint_=this.syncPoint_||this.syncController_.getSyncPoint(this.playlist_,this.duration_(),this.currentTimeline_,this.currentTime_(),this.loaderType_);const l={partIndex:null,mediaIndex:null,startOfSegment:null,playlist:this.playlist_,isSyncRequest:!this.syncPoint_};if(l.isSyncRequest)l.mediaIndex=yg(this.currentTimeline_,a,t),this.logger_(`choose next request. Can not find sync point. Fallback to media Index: ${l.mediaIndex}`);else if(this.mediaIndex!==null){const w=a[this.mediaIndex],D=typeof this.partIndex=="number"?this.partIndex:-1;l.startOfSegment=w.end?w.end:t,w.parts&&w.parts[D+1]?(l.mediaIndex=this.mediaIndex,l.partIndex=D+1):l.mediaIndex=this.mediaIndex+1}else{let w,D,C;const I=this.fetchAtBuffer_?t:this.currentTime_();if(this.mediaSequenceSync_&&this.logger_(`chooseNextRequest_ request after Quality Switch:
For TargetTime: ${I}.
CurrentTime: ${this.currentTime_()}
BufferedEnd: ${t}
Fetch At Buffer: ${this.fetchAtBuffer_}
`,this.mediaSequenceSync_.diagnostics),this.mediaSequenceSync_&&this.mediaSequenceSync_.isReliable){const R=this.getSyncInfoFromMediaSequenceSync_(I);if(!R)return this.logger_("chooseNextRequest_ - no sync info found using media sequence sync"),null;this.logger_(`chooseNextRequest_ mediaSequence syncInfo (${R.start} --> ${R.end})`),w=R.segmentIndex,D=R.partIndex,C=R.start}else{this.logger_("chooseNextRequest_ - fallback to a regular segment selection algorithm, based on a syncPoint.");const R=Ht.getMediaInfoForTime({exactManifestTimings:this.exactManifestTimings,playlist:this.playlist_,currentTime:I,startingPartIndex:this.syncPoint_.partIndex,startingSegmentIndex:this.syncPoint_.segmentIndex,startTime:this.syncPoint_.time});w=R.segmentIndex,D=R.partIndex,C=R.startTime}l.getMediaInfoForTime=this.fetchAtBuffer_?`bufferedEnd ${I}`:`currentTime ${I}`,l.mediaIndex=w,l.startOfSegment=C,l.partIndex=D,this.logger_(`choose next request. Playlist switched and we have a sync point. Media Index: ${l.mediaIndex} `)}const h=a[l.mediaIndex];let p=h&&typeof l.partIndex=="number"&&h.parts&&h.parts[l.partIndex];if(!h||typeof l.partIndex=="number"&&!p)return null;typeof l.partIndex!="number"&&h.parts&&(l.partIndex=0,p=h.parts[0]);const g=this.vhs_.playlists&&this.vhs_.playlists.main&&this.vhs_.playlists.main.independentSegments||this.playlist_.independentSegments;if(!i&&p&&!g&&!p.independent)if(l.partIndex===0){const w=a[l.mediaIndex-1],D=w.parts&&w.parts.length&&w.parts[w.parts.length-1];D&&D.independent&&(l.mediaIndex-=1,l.partIndex=w.parts.length-1,l.independent="previous segment")}else h.parts[l.partIndex-1].independent&&(l.partIndex-=1,l.independent="previous part");const _=this.mediaSource_&&this.mediaSource_.readyState==="ended";return l.mediaIndex>=a.length-1&&_&&!this.seeking_()?null:(this.shouldForceTimestampOffsetAfterResync_&&(this.shouldForceTimestampOffsetAfterResync_=!1,l.forceTimestampOffset=!0,this.logger_("choose next request. Force timestamp offset after loader resync")),this.generateSegmentInfo_(l))}getSyncInfoFromMediaSequenceSync_(e){if(!this.mediaSequenceSync_)return null;const t=Math.max(e,this.mediaSequenceSync_.start);e!==t&&this.logger_(`getSyncInfoFromMediaSequenceSync_. Pulled target time from ${e} to ${t}`);const i=this.mediaSequenceSync_.getSyncInfoForTime(t);if(!i)return null;if(!i.isAppended)return i;const s=this.mediaSequenceSync_.getSyncInfoForTime(i.end);return s?(s.isAppended&&this.logger_("getSyncInfoFromMediaSequenceSync_: We encounter unexpected scenario where next media sequence sync info is also appended!"),s):null}generateSegmentInfo_(e){const{independent:t,playlist:i,mediaIndex:s,startOfSegment:r,isSyncRequest:a,partIndex:l,forceTimestampOffset:h,getMediaInfoForTime:p}=e,g=i.segments[s],_=typeof l=="number"&&g.parts[l],w={requestId:"segment-loader-"+Math.random(),uri:_&&_.resolvedUri||g.resolvedUri,mediaIndex:s,partIndex:_?l:null,isSyncRequest:a,startOfSegment:r,playlist:i,bytes:null,encryptedBytes:null,timestampOffset:null,timeline:g.timeline,duration:_&&_.duration||g.duration,segment:g,part:_,byteLength:0,transmuxer:this.transmuxer_,getMediaInfoForTime:p,independent:t},D=typeof h!="undefined"?h:this.isPendingTimestampOffset_;w.timestampOffset=this.timestampOffsetForSegment_({segmentTimeline:g.timeline,currentTimeline:this.currentTimeline_,startOfSegment:r,buffered:this.buffered_(),overrideCheck:D});const C=Eo(this.sourceUpdater_.audioBuffered());return typeof C=="number"&&(w.audioAppendStart=C-this.sourceUpdater_.audioTimestampOffset()),this.sourceUpdater_.videoBuffered().length&&(w.gopsToAlignWith=mg(this.gopBuffer_,this.currentTime_()-this.sourceUpdater_.videoTimestampOffset(),this.timeMapping_)),w}timestampOffsetForSegment_(e){return Tg(e)}earlyAbortWhenNeeded_(e){if(this.vhs_.tech_.paused()||!this.xhrOptions_.timeout||!this.playlist_.attributes.BANDWIDTH||Date.now()-(e.firstBytesReceivedAt||Date.now())<1e3)return;const t=this.currentTime_(),i=e.bandwidth,s=this.pendingSegment_.duration,r=Ht.estimateSegmentRequestTime(s,i,this.playlist_,e.bytesReceived),a=Yp(this.buffered_(),t,this.vhs_.tech_.playbackRate())-1;if(r<=a)return;const l=sg({main:this.vhs_.playlists.main,currentTime:t,bandwidth:i,duration:this.duration_(),segmentDuration:s,timeUntilRebuffer:a,currentTimeline:this.currentTimeline_,syncController:this.syncController_});if(!l)return;const p=r-a-l.rebufferingImpact;let g=.5;a<=Ei&&(g=1),!(!l.playlist||l.playlist.uri===this.playlist_.uri||p<g)&&(this.bandwidth=l.playlist.attributes.BANDWIDTH*jt.BANDWIDTH_VARIANCE+1,this.trigger("earlyabort"))}handleAbort_(e){this.logger_(`Aborting ${Zn(e)}`),this.mediaRequestsAborted+=1}handleProgress_(e,t){this.earlyAbortWhenNeeded_(t.stats),!this.checkForAbort_(t.requestId)&&this.trigger("progress")}handleTrackInfo_(e,t){this.earlyAbortWhenNeeded_(e.stats),!this.checkForAbort_(e.requestId)&&(this.checkForIllegalMediaSwitch(t)||(t=t||{},Ag(this.currentMediaInfo_,t)||(this.appendInitSegment_={audio:!0,video:!0},this.startingMediaInfo_=t,this.currentMediaInfo_=t,this.logger_("trackinfo update",t),this.trigger("trackinfo")),!this.checkForAbort_(e.requestId)&&(this.pendingSegment_.trackInfo=t,this.hasEnoughInfoToAppend_()&&this.processCallQueue_())))}handleTimingInfo_(e,t,i,s){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;const r=this.pendingSegment_,a=rd(t);r[a]=r[a]||{},r[a][i]=s,this.logger_(`timinginfo: ${t} - ${i} - ${s}`),this.hasEnoughInfoToAppend_()&&this.processCallQueue_()}handleCaptions_(e,t){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;if(t.length===0){this.logger_("SegmentLoader received no captions from a caption event");return}if(!this.pendingSegment_.hasAppendedData_){this.metadataQueue_.caption.push(this.handleCaptions_.bind(this,e,t));return}const s=this.sourceUpdater_.videoTimestampOffset()===null?this.sourceUpdater_.audioTimestampOffset():this.sourceUpdater_.videoTimestampOffset(),r={};t.forEach(a=>{r[a.stream]=r[a.stream]||{startTime:1/0,captions:[],endTime:0};const l=r[a.stream];l.startTime=Math.min(l.startTime,a.startTime+s),l.endTime=Math.max(l.endTime,a.endTime+s),l.captions.push(a)}),Object.keys(r).forEach(a=>{const{startTime:l,endTime:h,captions:p}=r[a],g=this.inbandTextTracks_;this.logger_(`adding cues from ${l} -> ${h} for ${a}`),og(g,this.vhs_.tech_,a),Ds(l,h,g[a]),lg({captionArray:p,inbandTextTracks:g,timestampOffset:s})}),this.transmuxer_&&this.transmuxer_.postMessage({action:"clearParsedMp4Captions"})}handleId3_(e,t,i){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;if(!this.pendingSegment_.hasAppendedData_){this.metadataQueue_.id3.push(this.handleId3_.bind(this,e,t,i));return}this.addMetadataToTextTrack(i,t,this.duration_())}processMetadataQueue_(){this.metadataQueue_.id3.forEach(e=>e()),this.metadataQueue_.caption.forEach(e=>e()),this.metadataQueue_.id3=[],this.metadataQueue_.caption=[]}processCallQueue_(){const e=this.callQueue_;this.callQueue_=[],e.forEach(t=>t())}processLoadQueue_(){const e=this.loadQueue_;this.loadQueue_=[],e.forEach(t=>t())}hasEnoughInfoToLoad_(){if(this.loaderType_!=="audio")return!0;const e=this.pendingSegment_;return e?this.getCurrentMediaInfo_()?!ad({timelineChangeController:this.timelineChangeController_,currentTimeline:this.currentTimeline_,segmentTimeline:e.timeline,loaderType:this.loaderType_,audioDisabled:this.audioDisabled_}):!0:!1}getCurrentMediaInfo_(e=this.pendingSegment_){return e&&e.trackInfo||this.currentMediaInfo_}getMediaInfo_(e=this.pendingSegment_){return this.getCurrentMediaInfo_(e)||this.startingMediaInfo_}getPendingSegmentPlaylist(){return this.pendingSegment_?this.pendingSegment_.playlist:null}hasEnoughInfoToAppend_(){if(!this.sourceUpdater_.ready()||this.waitingOnRemove_||this.quotaExceededErrorRetryTimeout_)return!1;const e=this.pendingSegment_,t=this.getCurrentMediaInfo_();if(!e||!t)return!1;const{hasAudio:i,hasVideo:s,isMuxed:r}=t;return!(s&&!e.videoTimingInfo||i&&!this.audioDisabled_&&!r&&!e.audioTimingInfo||ad({timelineChangeController:this.timelineChangeController_,currentTimeline:this.currentTimeline_,segmentTimeline:e.timeline,loaderType:this.loaderType_,audioDisabled:this.audioDisabled_}))}handleData_(e,t){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;if(this.callQueue_.length||!this.hasEnoughInfoToAppend_()){this.callQueue_.push(this.handleData_.bind(this,e,t));return}const i=this.pendingSegment_;if(this.setTimeMapping_(i.timeline),this.updateMediaSecondsLoaded_(i.part||i.segment),this.mediaSource_.readyState!=="closed"){if(e.map&&(e.map=this.initSegmentForMap(e.map,!0),i.segment.map=e.map),e.key&&this.segmentKey(e.key,!0),i.isFmp4=e.isFmp4,i.timingInfo=i.timingInfo||{},i.isFmp4)this.trigger("fmp4"),i.timingInfo.start=i[rd(t.type)].start;else{const s=this.getCurrentMediaInfo_(),r=this.loaderType_==="main"&&s&&s.hasVideo;let a;r&&(a=i.videoTimingInfo.start),i.timingInfo.start=this.trueSegmentStart_({currentStart:i.timingInfo.start,playlist:i.playlist,mediaIndex:i.mediaIndex,currentVideoTimestampOffset:this.sourceUpdater_.videoTimestampOffset(),useVideoTimingInfo:r,firstVideoFrameTimeForData:a,videoTimingInfo:i.videoTimingInfo,audioTimingInfo:i.audioTimingInfo})}if(this.updateAppendInitSegmentStatus(i,t.type),this.updateSourceBufferTimestampOffset_(i),i.isSyncRequest){this.updateTimingInfoEnd_(i),this.syncController_.saveSegmentTimingInfo({segmentInfo:i,shouldSaveTimelineMapping:this.loaderType_==="main"});const s=this.chooseNextRequest_();if(s.mediaIndex!==i.mediaIndex||s.partIndex!==i.partIndex){this.logger_("sync segment was incorrect, not appending");return}this.logger_("sync segment was correct, appending")}i.hasAppendedData_=!0,this.processMetadataQueue_(),this.appendData_(i,t)}}updateAppendInitSegmentStatus(e,t){this.loaderType_==="main"&&typeof e.timestampOffset=="number"&&!e.changedTimestampOffset&&(this.appendInitSegment_={audio:!0,video:!0}),this.playlistOfLastInitSegment_[t]!==e.playlist&&(this.appendInitSegment_[t]=!0)}getInitSegmentAndUpdateState_({type:e,initSegment:t,map:i,playlist:s}){if(i){const r=Lr(i);if(this.activeInitSegmentId_===r)return null;t=this.initSegmentForMap(i,!0).bytes,this.activeInitSegmentId_=r}return t&&this.appendInitSegment_[e]?(this.playlistOfLastInitSegment_[e]=s,this.appendInitSegment_[e]=!1,this.activeInitSegmentId_=null,t):null}handleQuotaExceededError_({segmentInfo:e,type:t,bytes:i},s){const r=this.sourceUpdater_.audioBuffered(),a=this.sourceUpdater_.videoBuffered();r.length>1&&this.logger_("On QUOTA_EXCEEDED_ERR, found gaps in the audio buffer: "+dn(r).join(", ")),a.length>1&&this.logger_("On QUOTA_EXCEEDED_ERR, found gaps in the video buffer: "+dn(a).join(", "));const l=r.length?r.start(0):0,h=r.length?r.end(r.length-1):0,p=a.length?a.start(0):0,g=a.length?a.end(a.length-1):0;if(h-l<=ks&&g-p<=ks){this.logger_(`On QUOTA_EXCEEDED_ERR, single segment too large to append to buffer, triggering an error. Appended byte length: ${i.byteLength}, audio buffer: ${dn(r).join(", ")}, video buffer: ${dn(a).join(", ")}, `),this.error({message:"Quota exceeded error with append of a single segment of content",excludeUntil:1/0,metadata:{errorType:M.Error.SegmentExceedsSourceBufferQuota}}),this.trigger("error");return}this.waitingOnRemove_=!0,this.callQueue_.push(this.appendToSourceBuffer_.bind(this,{segmentInfo:e,type:t,bytes:i}));const w=this.currentTime_()-ks;this.logger_(`On QUOTA_EXCEEDED_ERR, removing audio/video from 0 to ${w}`),this.remove(0,w,()=>{this.logger_(`On QUOTA_EXCEEDED_ERR, retrying append in ${ks}s`),this.waitingOnRemove_=!1,this.quotaExceededErrorRetryTimeout_=A().setTimeout(()=>{this.logger_("On QUOTA_EXCEEDED_ERR, re-processing call queue"),this.quotaExceededErrorRetryTimeout_=null,this.processCallQueue_()},ks*1e3)},!0)}handleAppendError_({segmentInfo:e,type:t,bytes:i},s){if(s){if(s.code===nd){this.handleQuotaExceededError_({segmentInfo:e,type:t,bytes:i});return}this.logger_("Received non QUOTA_EXCEEDED_ERR on append",s),this.error({message:`${t} append of ${i.length}b failed for segment #${e.mediaIndex} in playlist ${e.playlist.id}`,metadata:{errorType:M.Error.SegmentAppendError}}),this.trigger("appenderror")}}appendToSourceBuffer_({segmentInfo:e,type:t,initSegment:i,data:s,bytes:r}){if(!r){const a=[s];let l=s.byteLength;i&&(a.unshift(i),l+=i.byteLength),r=ag({bytes:l,segments:a})}this.sourceUpdater_.appendBuffer({segmentInfo:e,type:t,bytes:r},this.handleAppendError_.bind(this,{segmentInfo:e,type:t,bytes:r}))}handleSegmentTimingInfo_(e,t,i){if(!this.pendingSegment_||t!==this.pendingSegment_.requestId)return;const s=this.pendingSegment_.segment,r=`${e}TimingInfo`;s[r]||(s[r]={}),s[r].transmuxerPrependedSeconds=i.prependedContentDuration||0,s[r].transmuxedPresentationStart=i.start.presentation,s[r].transmuxedDecodeStart=i.start.decode,s[r].transmuxedPresentationEnd=i.end.presentation,s[r].transmuxedDecodeEnd=i.end.decode,s[r].baseMediaDecodeTime=i.baseMediaDecodeTime}appendData_(e,t){const{type:i,data:s}=t;if(!s||!s.byteLength||i==="audio"&&this.audioDisabled_)return;const r=this.getInitSegmentAndUpdateState_({type:i,initSegment:t.initSegment,playlist:e.playlist,map:e.isFmp4?e.segment.map:null});this.appendToSourceBuffer_({segmentInfo:e,type:i,initSegment:r,data:s})}loadSegment_(e){if(this.state="WAITING",this.pendingSegment_=e,this.trimBackBuffer_(e),typeof e.timestampOffset=="number"&&this.transmuxer_&&this.transmuxer_.postMessage({action:"clearAllMp4Captions"}),!this.hasEnoughInfoToLoad_()){this.loadQueue_.push(()=>{const t=(0,_e.A)({},e,{forceTimestampOffset:!0});(0,_e.A)(e,this.generateSegmentInfo_(t)),this.isPendingTimestampOffset_=!1,this.updateTransmuxerAndRequestSegment_(e)});return}this.updateTransmuxerAndRequestSegment_(e)}updateTransmuxerAndRequestSegment_(e){this.shouldUpdateTransmuxerTimestampOffset_(e.timestampOffset)&&(this.gopBuffer_.length=0,e.gopsToAlignWith=[],this.timeMapping_=0,this.transmuxer_.postMessage({action:"reset"}),this.transmuxer_.postMessage({action:"setTimestampOffset",timestampOffset:e.timestampOffset}));const t=this.createSimplifiedSegmentObj_(e),i=this.isEndOfStream_(e.mediaIndex,e.playlist,e.partIndex),s=this.mediaIndex!==null,r=e.timeline!==this.currentTimeline_&&e.timeline>0,a=i||s&&r;this.logger_(`Requesting
${td(e.uri)}
${Zn(e)}`),t.map&&!t.map.bytes&&(this.logger_("going to request init segment."),this.appendInitSegment_={video:!0,audio:!0}),e.abortRequests=Jm({xhr:this.vhs_.xhr,xhrOptions:this.xhrOptions_,decryptionWorker:this.decrypter_,segment:t,abortFn:this.handleAbort_.bind(this,e),progressFn:this.handleProgress_.bind(this),trackInfoFn:this.handleTrackInfo_.bind(this),timingInfoFn:this.handleTimingInfo_.bind(this),videoSegmentTimingInfoFn:this.handleSegmentTimingInfo_.bind(this,"video",e.requestId),audioSegmentTimingInfoFn:this.handleSegmentTimingInfo_.bind(this,"audio",e.requestId),captionsFn:this.handleCaptions_.bind(this),isEndOfTimeline:a,endedTimelineFn:()=>{this.logger_("received endedtimeline callback")},id3Fn:this.handleId3_.bind(this),dataFn:this.handleData_.bind(this),doneFn:this.segmentRequestFinished_.bind(this),onTransmuxerLog:({message:l,level:h,stream:p})=>{this.logger_(`${Zn(e)} logged from transmuxer stream ${p} as a ${h}: ${l}`)}})}trimBackBuffer_(e){const t=Eg(this.seekable_(),this.currentTime_(),this.playlist_.targetDuration||10);t>0&&this.remove(0,t)}createSimplifiedSegmentObj_(e){const t=e.segment,i=e.part,s={resolvedUri:i?i.resolvedUri:t.resolvedUri,byterange:i?i.byterange:t.byterange,requestId:e.requestId,transmuxer:e.transmuxer,audioAppendStart:e.audioAppendStart,gopsToAlignWith:e.gopsToAlignWith,part:e.part},r=e.playlist.segments[e.mediaIndex-1];if(r&&r.timeline===t.timeline&&(r.videoTimingInfo?s.baseStartTime=r.videoTimingInfo.transmuxedDecodeEnd:r.audioTimingInfo&&(s.baseStartTime=r.audioTimingInfo.transmuxedDecodeEnd)),t.key){const a=t.key.iv||new Uint32Array([0,0,0,e.mediaIndex+e.playlist.mediaSequence]);s.key=this.segmentKey(t.key),s.key.iv=a}return t.map&&(s.map=this.initSegmentForMap(t.map)),s}saveTransferStats_(e){this.mediaRequests+=1,e&&(this.mediaBytesTransferred+=e.bytesReceived,this.mediaTransferDuration+=e.roundTripTime)}saveBandwidthRelatedStats_(e,t){if(this.pendingSegment_.byteLength=t.bytesReceived,e<Ur){this.logger_(`Ignoring segment's bandwidth because its duration of ${e} is less than the min to record ${Ur}`);return}this.bandwidth=t.bandwidth,this.roundTrip=t.roundTripTime}handleTimeout_(){this.mediaRequestsTimedout+=1,this.bandwidth=1,this.roundTrip=NaN,this.trigger("bandwidthupdate"),this.trigger("timeout")}segmentRequestFinished_(e,t,i){if(this.callQueue_.length){this.callQueue_.push(this.segmentRequestFinished_.bind(this,e,t,i));return}if(this.saveTransferStats_(t.stats),!this.pendingSegment_||t.requestId!==this.pendingSegment_.requestId)return;if(e){if(this.pendingSegment_=null,this.state="READY",e.code===Ci.ABORTED)return;if(this.pause(),e.code===Ci.TIMEOUT){this.handleTimeout_();return}this.mediaRequestsErrored+=1,this.error(e),this.trigger("error");return}const s=this.pendingSegment_;this.saveBandwidthRelatedStats_(s.duration,t.stats),s.endOfAllRequests=t.endOfAllRequests,i.gopInfo&&(this.gopBuffer_=gg(this.gopBuffer_,i.gopInfo,this.safeAppend_)),this.state="APPENDING",this.trigger("appending"),this.waitForAppendsToComplete_(s)}setTimeMapping_(e){const t=this.syncController_.mappingForTimeline(e);t!==null&&(this.timeMapping_=t)}updateMediaSecondsLoaded_(e){typeof e.start=="number"&&typeof e.end=="number"?this.mediaSecondsLoaded+=e.end-e.start:this.mediaSecondsLoaded+=e.duration}shouldUpdateTransmuxerTimestampOffset_(e){return e===null?!1:this.loaderType_==="main"&&e!==this.sourceUpdater_.videoTimestampOffset()||!this.audioDisabled_&&e!==this.sourceUpdater_.audioTimestampOffset()}trueSegmentStart_({currentStart:e,playlist:t,mediaIndex:i,firstVideoFrameTimeForData:s,currentVideoTimestampOffset:r,useVideoTimingInfo:a,videoTimingInfo:l,audioTimingInfo:h}){if(typeof e!="undefined")return e;if(!a)return h.start;const p=t.segments[i-1];return i===0||!p||typeof p.start=="undefined"||p.end!==s+r?s:l.start}waitForAppendsToComplete_(e){const t=this.getCurrentMediaInfo_(e);if(!t){this.error({message:"No starting media returned, likely due to an unsupported media format.",playlistExclusionDuration:1/0,metadata:{errorType:M.Error.SegmentUnsupportedMediaFormat}}),this.trigger("error");return}const{hasAudio:i,hasVideo:s,isMuxed:r}=t,a=this.loaderType_==="main"&&s,l=!this.audioDisabled_&&i&&!r;if(e.waitingOnAppends=0,!e.hasAppendedData_){!e.timingInfo&&typeof e.timestampOffset=="number"&&(this.isPendingTimestampOffset_=!0),e.timingInfo={start:0},e.waitingOnAppends++,this.isPendingTimestampOffset_||(this.updateSourceBufferTimestampOffset_(e),this.processMetadataQueue_()),this.checkAppendsDone_(e);return}a&&e.waitingOnAppends++,l&&e.waitingOnAppends++,a&&this.sourceUpdater_.videoQueueCallback(this.checkAppendsDone_.bind(this,e)),l&&this.sourceUpdater_.audioQueueCallback(this.checkAppendsDone_.bind(this,e))}checkAppendsDone_(e){this.checkForAbort_(e.requestId)||(e.waitingOnAppends--,e.waitingOnAppends===0&&this.handleAppendsDone_())}checkForIllegalMediaSwitch(e){const t=bg(this.loaderType_,this.getCurrentMediaInfo_(),e);return t?(this.error({message:t,playlistExclusionDuration:1/0,metadata:{errorType:M.Error.SegmentSwitchError}}),this.trigger("error"),!0):!1}updateSourceBufferTimestampOffset_(e){if(e.timestampOffset===null||typeof e.timingInfo.start!="number"||e.changedTimestampOffset||this.loaderType_!=="main")return;let t=!1;e.timestampOffset-=this.getSegmentStartTimeForTimestampOffsetCalculation_({videoTimingInfo:e.segment.videoTimingInfo,audioTimingInfo:e.segment.audioTimingInfo,timingInfo:e.timingInfo}),e.changedTimestampOffset=!0,e.timestampOffset!==this.sourceUpdater_.videoTimestampOffset()&&(this.sourceUpdater_.videoTimestampOffset(e.timestampOffset),t=!0),e.timestampOffset!==this.sourceUpdater_.audioTimestampOffset()&&(this.sourceUpdater_.audioTimestampOffset(e.timestampOffset),t=!0),t&&this.trigger("timestampoffset")}getSegmentStartTimeForTimestampOffsetCalculation_({videoTimingInfo:e,audioTimingInfo:t,timingInfo:i}){return this.useDtsForTimestampOffset_?e&&typeof e.transmuxedDecodeStart=="number"?e.transmuxedDecodeStart:t&&typeof t.transmuxedDecodeStart=="number"?t.transmuxedDecodeStart:i.start:i.start}updateTimingInfoEnd_(e){e.timingInfo=e.timingInfo||{};const t=this.getMediaInfo_(),s=this.loaderType_==="main"&&t&&t.hasVideo&&e.videoTimingInfo?e.videoTimingInfo:e.audioTimingInfo;s&&(e.timingInfo.end=typeof s.end=="number"?s.end:s.start+e.duration)}handleAppendsDone_(){if(this.pendingSegment_&&this.trigger("appendsdone"),!this.pendingSegment_){this.state="READY",this.paused()||this.monitorBuffer_();return}const e=this.pendingSegment_;e.part&&e.part.syncInfo?e.part.syncInfo.markAppended():e.segment.syncInfo&&e.segment.syncInfo.markAppended(),this.updateTimingInfoEnd_(e),this.shouldSaveSegmentTimingInfo_&&this.syncController_.saveSegmentTimingInfo({segmentInfo:e,shouldSaveTimelineMapping:this.loaderType_==="main"});const t=xg(e,this.sourceType_);if(t&&(t.severity==="warn"?M.log.warn(t.message):this.logger_(t.message)),this.recordThroughput_(e),this.pendingSegment_=null,this.state="READY",e.isSyncRequest&&(this.trigger("syncinfoupdate"),!e.hasAppendedData_)){this.logger_(`Throwing away un-appended sync request ${Zn(e)}`);return}this.logger_(`Appended ${Zn(e)}`),this.addSegmentMetadataCue_(e),this.fetchAtBuffer_=!0,this.currentTimeline_!==e.timeline&&(this.timelineChangeController_.lastTimelineChange({type:this.loaderType_,from:this.currentTimeline_,to:e.timeline}),this.loaderType_==="main"&&!this.audioDisabled_&&this.timelineChangeController_.lastTimelineChange({type:"audio",from:this.currentTimeline_,to:e.timeline})),this.currentTimeline_=e.timeline,this.trigger("syncinfoupdate");const i=e.segment,s=e.part,r=i.end&&this.currentTime_()-i.end>e.playlist.targetDuration*3,a=s&&s.end&&this.currentTime_()-s.end>e.playlist.partTargetDuration*3;if(r||a){this.logger_(`bad ${r?"segment":"part"} ${Zn(e)}`),this.resetEverything();return}this.mediaIndex!==null&&this.trigger("bandwidthupdate"),this.trigger("progress"),this.mediaIndex=e.mediaIndex,this.partIndex=e.partIndex,this.isEndOfStream_(e.mediaIndex,e.playlist,e.partIndex)&&this.endOfStream(),this.trigger("appended"),e.hasAppendedData_&&this.mediaAppends++,this.paused()||this.monitorBuffer_()}recordThroughput_(e){if(e.duration<Ur){this.logger_(`Ignoring segment's throughput because its duration of ${e.duration} is less than the min to record ${Ur}`);return}const t=this.throughput.rate,i=Date.now()-e.endOfAllRequests+1,s=Math.floor(e.byteLength/i*8*1e3);this.throughput.rate+=(s-t)/++this.throughput.count}addSegmentMetadataCue_(e){if(!this.segmentMetadataTrack_)return;const t=e.segment,i=t.start,s=t.end;if(!sd(i)||!sd(s))return;Ds(i,s,this.segmentMetadataTrack_);const r=A().WebKitDataCue||A().VTTCue,a={custom:t.custom,dateTimeObject:t.dateTimeObject,dateTimeString:t.dateTimeString,programDateTime:t.programDateTime,bandwidth:e.playlist.attributes.BANDWIDTH,resolution:e.playlist.attributes.RESOLUTION,codecs:e.playlist.attributes.CODECS,byteLength:e.byteLength,uri:e.uri,timeline:e.timeline,playlist:e.playlist.id,start:i,end:s},l=JSON.stringify(a),h=new r(i,s,l);h.value=a,this.segmentMetadataTrack_.addCue(h)}}function Ri(){}const ld=function(n){return typeof n!="string"?n:n.replace(/./,e=>e.toUpperCase())},Sg=["video","audio"],Fo=(n,e)=>{const t=e[`${n}Buffer`];return t&&t.updating||e.queuePending[n]},jg=(n,e)=>{for(let t=0;t<e.length;t++){const i=e[t];if(i.type==="mediaSource")return null;if(i.type===n)return t}return null},es=(n,e)=>{if(e.queue.length===0)return;let t=0,i=e.queue[t];if(i.type==="mediaSource"){!e.updating()&&e.mediaSource.readyState!=="closed"&&(e.queue.shift(),i.action(e),i.doneFn&&i.doneFn(),es("audio",e),es("video",e));return}if(n!=="mediaSource"&&!(!e.ready()||e.mediaSource.readyState==="closed"||Fo(n,e))){if(i.type!==n){if(t=jg(n,e.queue),t===null)return;i=e.queue[t]}if(e.queue.splice(t,1),e.queuePending[n]=i,i.action(n,e),!i.doneFn){e.queuePending[n]=null,es(n,e);return}}},ud=(n,e)=>{const t=e[`${n}Buffer`],i=ld(n);t&&(t.removeEventListener("updateend",e[`on${i}UpdateEnd_`]),t.removeEventListener("error",e[`on${i}Error_`]),e.codecs[n]=null,e[`${n}Buffer`]=null)},xi=(n,e)=>n&&e&&Array.prototype.indexOf.call(n.sourceBuffers,e)!==-1,Yt={appendBuffer:(n,e,t)=>(i,s)=>{const r=s[`${i}Buffer`];if(xi(s.mediaSource,r)){s.logger_(`Appending segment ${e.mediaIndex}'s ${n.length} bytes to ${i}Buffer`);try{r.appendBuffer(n)}catch(a){s.logger_(`Error with code ${a.code} `+(a.code===nd?"(QUOTA_EXCEEDED_ERR) ":"")+`when appending segment ${e.mediaIndex} to ${i}Buffer`),s.queuePending[i]=null,t(a)}}},remove:(n,e)=>(t,i)=>{const s=i[`${t}Buffer`];if(xi(i.mediaSource,s)){i.logger_(`Removing ${n} to ${e} from ${t}Buffer`);try{s.remove(n,e)}catch(r){i.logger_(`Remove ${n} to ${e} from ${t}Buffer failed`)}}},timestampOffset:n=>(e,t)=>{const i=t[`${e}Buffer`];xi(t.mediaSource,i)&&(t.logger_(`Setting ${e}timestampOffset to ${n}`),i.timestampOffset=n)},callback:n=>(e,t)=>{n()},endOfStream:n=>e=>{if(e.mediaSource.readyState==="open"){e.logger_(`Calling mediaSource endOfStream(${n||""})`);try{e.mediaSource.endOfStream(n)}catch(t){M.log.warn("Failed to call media source endOfStream",t)}}},duration:n=>e=>{e.logger_(`Setting mediaSource duration to ${n}`);try{e.mediaSource.duration=n}catch(t){M.log.warn("Failed to set media source duration",t)}},abort:()=>(n,e)=>{if(e.mediaSource.readyState!=="open")return;const t=e[`${n}Buffer`];if(xi(e.mediaSource,t)){e.logger_(`calling abort on ${n}Buffer`);try{t.abort()}catch(i){M.log.warn(`Failed to abort on ${n}Buffer`,i)}}},addSourceBuffer:(n,e)=>t=>{const i=ld(n),s=bt(e);t.logger_(`Adding ${n}Buffer with codec ${e} to mediaSource`);const r=t.mediaSource.addSourceBuffer(s);r.addEventListener("updateend",t[`on${i}UpdateEnd_`]),r.addEventListener("error",t[`on${i}Error_`]),t.codecs[n]=e,t[`${n}Buffer`]=r},removeSourceBuffer:n=>e=>{const t=e[`${n}Buffer`];if(ud(n,e),!!xi(e.mediaSource,t)){e.logger_(`Removing ${n}Buffer with codec ${e.codecs[n]} from mediaSource`);try{e.mediaSource.removeSourceBuffer(t)}catch(i){M.log.warn(`Failed to removeSourceBuffer ${n}Buffer`,i)}}},changeType:n=>(e,t)=>{const i=t[`${e}Buffer`],s=bt(n);if(!xi(t.mediaSource,i))return;const r=n.substring(0,n.indexOf(".")),a=t.codecs[e];if(a.substring(0,a.indexOf("."))!==r){t.logger_(`changing ${e}Buffer codec from ${t.codecs[e]} to ${n}`);try{i.changeType(s),t.codecs[e]=n}catch(h){M.log.warn(`Failed to changeType on ${e}Buffer`,h)}}}},Kt=({type:n,sourceUpdater:e,action:t,doneFn:i,name:s})=>{e.queue.push({type:n,action:t,doneFn:i,name:s}),es(n,e)},cd=(n,e)=>t=>{const i=e[`${n}Buffered`](),s=Gp(i);if(e.logger_(`received "updateend" event for ${n} Source Buffer: `,s),e.queuePending[n]){const r=e.queuePending[n].doneFn;e.queuePending[n]=null,r&&r(e[`${n}Error_`])}es(n,e)};class dd extends M.EventTarget{constructor(e){super(),this.mediaSource=e,this.sourceopenListener_=()=>es("mediaSource",this),this.mediaSource.addEventListener("sourceopen",this.sourceopenListener_),this.logger_=si("SourceUpdater"),this.audioTimestampOffset_=0,this.videoTimestampOffset_=0,this.queue=[],this.queuePending={audio:null,video:null},this.delayedAudioAppendQueue_=[],this.videoAppendQueued_=!1,this.codecs={},this.onVideoUpdateEnd_=cd("video",this),this.onAudioUpdateEnd_=cd("audio",this),this.onVideoError_=t=>{this.videoError_=t},this.onAudioError_=t=>{this.audioError_=t},this.createdSourceBuffers_=!1,this.initializedEme_=!1,this.triggeredReady_=!1}initializedEme(){this.initializedEme_=!0,this.triggerReady()}hasCreatedSourceBuffers(){return this.createdSourceBuffers_}hasInitializedAnyEme(){return this.initializedEme_}ready(){return this.hasCreatedSourceBuffers()&&this.hasInitializedAnyEme()}createSourceBuffers(e){this.hasCreatedSourceBuffers()||(this.addOrChangeSourceBuffers(e),this.createdSourceBuffers_=!0,this.trigger("createdsourcebuffers"),this.triggerReady())}triggerReady(){this.ready()&&!this.triggeredReady_&&(this.triggeredReady_=!0,this.trigger("ready"))}addSourceBuffer(e,t){Kt({type:"mediaSource",sourceUpdater:this,action:Yt.addSourceBuffer(e,t),name:"addSourceBuffer"})}abort(e){Kt({type:e,sourceUpdater:this,action:Yt.abort(e),name:"abort"})}removeSourceBuffer(e){if(!this.canRemoveSourceBuffer()){M.log.error("removeSourceBuffer is not supported!");return}Kt({type:"mediaSource",sourceUpdater:this,action:Yt.removeSourceBuffer(e),name:"removeSourceBuffer"})}canRemoveSourceBuffer(){return!M.browser.IS_FIREFOX&&A().MediaSource&&A().MediaSource.prototype&&typeof A().MediaSource.prototype.removeSourceBuffer=="function"}static canChangeType(){return A().SourceBuffer&&A().SourceBuffer.prototype&&typeof A().SourceBuffer.prototype.changeType=="function"}canChangeType(){return this.constructor.canChangeType()}changeType(e,t){if(!this.canChangeType()){M.log.error("changeType is not supported!");return}Kt({type:e,sourceUpdater:this,action:Yt.changeType(t),name:"changeType"})}addOrChangeSourceBuffers(e){if(!e||typeof e!="object"||Object.keys(e).length===0)throw new Error("Cannot addOrChangeSourceBuffers to undefined codecs");Object.keys(e).forEach(t=>{const i=e[t];if(!this.hasCreatedSourceBuffers())return this.addSourceBuffer(t,i);this.canChangeType()&&this.changeType(t,i)})}appendBuffer(e,t){const{segmentInfo:i,type:s,bytes:r}=e;if(this.processedAppend_=!0,s==="audio"&&this.videoBuffer&&!this.videoAppendQueued_){this.delayedAudioAppendQueue_.push([e,t]),this.logger_(`delayed audio append of ${r.length} until video append`);return}const a=t;if(Kt({type:s,sourceUpdater:this,action:Yt.appendBuffer(r,i||{mediaIndex:-1},a),doneFn:t,name:"appendBuffer"}),s==="video"){if(this.videoAppendQueued_=!0,!this.delayedAudioAppendQueue_.length)return;const l=this.delayedAudioAppendQueue_.slice();this.logger_(`queuing delayed audio ${l.length} appendBuffers`),this.delayedAudioAppendQueue_.length=0,l.forEach(h=>{this.appendBuffer.apply(this,h)})}}audioBuffered(){return xi(this.mediaSource,this.audioBuffer)&&this.audioBuffer.buffered?this.audioBuffer.buffered:Dt()}videoBuffered(){return xi(this.mediaSource,this.videoBuffer)&&this.videoBuffer.buffered?this.videoBuffer.buffered:Dt()}buffered(){const e=xi(this.mediaSource,this.videoBuffer)?this.videoBuffer:null,t=xi(this.mediaSource,this.audioBuffer)?this.audioBuffer:null;return t&&!e?this.audioBuffered():e&&!t?this.videoBuffered():Xp(this.audioBuffered(),this.videoBuffered())}setDuration(e,t=Ri){Kt({type:"mediaSource",sourceUpdater:this,action:Yt.duration(e),name:"duration",doneFn:t})}endOfStream(e=null,t=Ri){typeof e!="string"&&(e=void 0),Kt({type:"mediaSource",sourceUpdater:this,action:Yt.endOfStream(e),name:"endOfStream",doneFn:t})}removeAudio(e,t,i=Ri){if(!this.audioBuffered().length||this.audioBuffered().end(0)===0){i();return}Kt({type:"audio",sourceUpdater:this,action:Yt.remove(e,t),doneFn:i,name:"remove"})}removeVideo(e,t,i=Ri){if(!this.videoBuffered().length||this.videoBuffered().end(0)===0){i();return}Kt({type:"video",sourceUpdater:this,action:Yt.remove(e,t),doneFn:i,name:"remove"})}updating(){return!!(Fo("audio",this)||Fo("video",this))}audioTimestampOffset(e){return typeof e!="undefined"&&this.audioBuffer&&this.audioTimestampOffset_!==e&&(Kt({type:"audio",sourceUpdater:this,action:Yt.timestampOffset(e),name:"timestampOffset"}),this.audioTimestampOffset_=e),this.audioTimestampOffset_}videoTimestampOffset(e){return typeof e!="undefined"&&this.videoBuffer&&this.videoTimestampOffset!==e&&(Kt({type:"video",sourceUpdater:this,action:Yt.timestampOffset(e),name:"timestampOffset"}),this.videoTimestampOffset_=e),this.videoTimestampOffset_}audioQueueCallback(e){this.audioBuffer&&Kt({type:"audio",sourceUpdater:this,action:Yt.callback(e),name:"callback"})}videoQueueCallback(e){this.videoBuffer&&Kt({type:"video",sourceUpdater:this,action:Yt.callback(e),name:"callback"})}dispose(){this.trigger("dispose"),Sg.forEach(e=>{this.abort(e),this.canRemoveSourceBuffer()?this.removeSourceBuffer(e):this[`${e}QueueCallback`](()=>ud(e,this))}),this.videoAppendQueued_=!1,this.delayedAudioAppendQueue_.length=0,this.sourceopenListener_&&this.mediaSource.removeEventListener("sourceopen",this.sourceopenListener_),this.off()}}const hd=n=>decodeURIComponent(escape(String.fromCharCode.apply(null,n))),Bg=n=>{const e=new Uint8Array(n);return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")},fd=new Uint8Array(`

`.split("").map(n=>n.charCodeAt(0)));class wg extends Error{constructor(){super("Trying to parse received VTT cues, but there is no WebVTT. Make sure vtt.js is loaded.")}}class Dg extends Uo{constructor(e,t={}){super(e,t),this.mediaSource_=null,this.subtitlesTrack_=null,this.featuresNativeTextTracks_=e.featuresNativeTextTracks,this.loadVttJs=e.loadVttJs,this.shouldSaveSegmentTimingInfo_=!1}createTransmuxer_(){return null}buffered_(){if(!this.subtitlesTrack_||!this.subtitlesTrack_.cues||!this.subtitlesTrack_.cues.length)return Dt();const e=this.subtitlesTrack_.cues,t=e[0].startTime,i=e[e.length-1].startTime;return Dt([[t,i]])}initSegmentForMap(e,t=!1){if(!e)return null;const i=Lr(e);let s=this.initSegments_[i];if(t&&!s&&e.bytes){const r=fd.byteLength+e.bytes.byteLength,a=new Uint8Array(r);a.set(e.bytes),a.set(fd,e.bytes.byteLength),this.initSegments_[i]=s={resolvedUri:e.resolvedUri,byterange:e.byterange,bytes:a}}return s||e}couldBeginLoading_(){return this.playlist_&&this.subtitlesTrack_&&!this.paused()}init_(){return this.state="READY",this.resetEverything(),this.monitorBuffer_()}track(e){return typeof e=="undefined"?this.subtitlesTrack_:(this.subtitlesTrack_=e,this.state==="INIT"&&this.couldBeginLoading_()&&this.init_(),this.subtitlesTrack_)}remove(e,t){Ds(e,t,this.subtitlesTrack_)}fillBuffer_(){const e=this.chooseNextRequest_();if(e){if(this.syncController_.timestampOffsetForTimeline(e.timeline)===null){const t=()=>{this.state="READY",this.paused()||this.monitorBuffer_()};this.syncController_.one("timestampoffset",t),this.state="WAITING_ON_TIMELINE";return}this.loadSegment_(e)}}timestampOffsetForSegment_(){return null}chooseNextRequest_(){return this.skipEmptySegments_(super.chooseNextRequest_())}skipEmptySegments_(e){for(;e&&e.segment.empty;){if(e.mediaIndex+1>=e.playlist.segments.length){e=null;break}e=this.generateSegmentInfo_({playlist:e.playlist,mediaIndex:e.mediaIndex+1,startOfSegment:e.startOfSegment+e.duration,isSyncRequest:e.isSyncRequest})}return e}stopForError(e){this.error(e),this.state="READY",this.pause(),this.trigger("error")}segmentRequestFinished_(e,t,i){if(!this.subtitlesTrack_){this.state="READY";return}if(this.saveTransferStats_(t.stats),!this.pendingSegment_){this.state="READY",this.mediaRequestsAborted+=1;return}if(e){e.code===Ci.TIMEOUT&&this.handleTimeout_(),e.code===Ci.ABORTED?this.mediaRequestsAborted+=1:this.mediaRequestsErrored+=1,this.stopForError(e);return}const s=this.pendingSegment_;this.saveBandwidthRelatedStats_(s.duration,t.stats),t.key&&this.segmentKey(t.key,!0),this.state="APPENDING",this.trigger("appending");const r=s.segment;if(r.map&&(r.map.bytes=t.map.bytes),s.bytes=t.bytes,typeof A().WebVTT!="function"&&typeof this.loadVttJs=="function"){this.state="WAITING_ON_VTTJS",this.loadVttJs().then(()=>this.segmentRequestFinished_(e,t,i),()=>this.stopForError({message:"Error loading vtt.js",metadata:{errorType:M.Error.VttLoadError}}));return}r.requested=!0;try{this.parseVTTCues_(s)}catch(a){this.stopForError({message:a.message,metadata:{errorType:M.Error.VttCueParsingError}});return}if(this.updateTimeMapping_(s,this.syncController_.timelines[s.timeline],this.playlist_),s.cues.length?s.timingInfo={start:s.cues[0].startTime,end:s.cues[s.cues.length-1].endTime}:s.timingInfo={start:s.startOfSegment,end:s.startOfSegment+s.duration},s.isSyncRequest){this.trigger("syncinfoupdate"),this.pendingSegment_=null,this.state="READY";return}s.byteLength=s.bytes.byteLength,this.mediaSecondsLoaded+=r.duration,s.cues.forEach(a=>{this.subtitlesTrack_.addCue(this.featuresNativeTextTracks_?new(A()).VTTCue(a.startTime,a.endTime,a.text):a)}),pg(this.subtitlesTrack_),this.handleAppendsDone_()}handleData_(){}updateTimingInfoEnd_(){}parseVTTCues_(e){let t,i=!1;if(typeof A().WebVTT!="function")throw new wg;typeof A().TextDecoder=="function"?t=new(A()).TextDecoder("utf8"):(t=A().WebVTT.StringDecoder(),i=!0);const s=new(A()).WebVTT.Parser(A(),A().vttjs,t);if(e.cues=[],e.timestampmap={MPEGTS:0,LOCAL:0},s.oncue=e.cues.push.bind(e.cues),s.ontimestampmap=a=>{e.timestampmap=a},s.onparsingerror=a=>{M.log.warn("Error encountered when parsing cues: "+a.message)},e.segment.map){let a=e.segment.map.bytes;i&&(a=hd(a)),s.parse(a)}let r=e.bytes;i&&(r=hd(r)),s.parse(r),s.flush()}updateTimeMapping_(e,t,i){const s=e.segment;if(!t)return;if(!e.cues.length){s.empty=!0;return}const{MPEGTS:r,LOCAL:a}=e.timestampmap,h=r/sn.ONE_SECOND_IN_TS-a+t.mapping;if(e.cues.forEach(p=>{const g=p.endTime-p.startTime,_=r===0?p.startTime+h:this.handleRollover_(p.startTime+h,t.time);p.startTime=Math.max(_,0),p.endTime=Math.max(_+g,0)}),!i.syncInfo){const p=e.cues[0].startTime,g=e.cues[e.cues.length-1].startTime;i.syncInfo={mediaSequence:i.mediaSequence+e.mediaIndex,time:Math.min(p,g-s.duration)}}}handleRollover_(e,t){if(t===null)return e;let i=e*sn.ONE_SECOND_IN_TS;const s=t*sn.ONE_SECOND_IN_TS;let r;for(s<i?r=-8589934592:r=8589934592;Math.abs(i-s)>4294967296;)i+=r;return i/sn.ONE_SECOND_IN_TS}}const kg=function(n,e){const t=n.cues;for(let i=0;i<t.length;i++){const s=t[i];if(e>=s.adStartTime&&e<=s.adEndTime)return s}return null},Ig=function(n,e,t=0){if(!n.segments)return;let i=t,s;for(let r=0;r<n.segments.length;r++){const a=n.segments[r];if(s||(s=kg(e,i+a.duration/2)),s){if("cueIn"in a){s.endTime=i,s.adEndTime=i,i+=a.duration,s=null;continue}if(i<s.endTime){i+=a.duration;continue}s.endTime+=a.duration}else if("cueOut"in a&&(s=new(A()).VTTCue(i,i+a.duration,a.cueOut),s.adStartTime=i,s.adEndTime=i+parseFloat(a.cueOut),e.addCue(s)),"cueOutCont"in a){const[l,h]=a.cueOutCont.split("/").map(parseFloat);s=new(A()).VTTCue(i,i+a.duration,""),s.adStartTime=i-l,s.adEndTime=s.adStartTime+h,e.addCue(s)}i+=a.duration}};class pd{constructor({start:e,end:t,segmentIndex:i,partIndex:s=null,appended:r=!1}){this.start_=e,this.end_=t,this.segmentIndex_=i,this.partIndex_=s,this.appended_=r}isInRange(e){return e>=this.start&&e<this.end}markAppended(){this.appended_=!0}resetAppendedStatus(){this.appended_=!1}get isAppended(){return this.appended_}get start(){return this.start_}get end(){return this.end_}get segmentIndex(){return this.segmentIndex_}get partIndex(){return this.partIndex_}}class Pg{constructor(e,t=[]){this.segmentSyncInfo_=e,this.partsSyncInfo_=t}get segmentSyncInfo(){return this.segmentSyncInfo_}get partsSyncInfo(){return this.partsSyncInfo_}get hasPartsSyncInfo(){return this.partsSyncInfo_.length>0}resetAppendStatus(){this.segmentSyncInfo_.resetAppendedStatus(),this.partsSyncInfo_.forEach(e=>e.resetAppendedStatus())}}class Vo{constructor(){this.storage_=new Map,this.diagnostics_="",this.isReliable_=!1,this.start_=-1/0,this.end_=1/0}get start(){return this.start_}get end(){return this.end_}get diagnostics(){return this.diagnostics_}get isReliable(){return this.isReliable_}resetAppendedStatus(){this.storage_.forEach(e=>e.resetAppendStatus())}update(e,t){const{mediaSequence:i,segments:s}=e;if(this.isReliable_=this.isReliablePlaylist_(i,s),!!this.isReliable_)return this.updateStorage_(s,i,this.calculateBaseTime_(i,t))}getSyncInfoForTime(e){for(const{segmentSyncInfo:t,partsSyncInfo:i}of this.storage_.values())if(i.length){for(const s of i)if(s.isInRange(e))return s}else if(t.isInRange(e))return t;return null}updateStorage_(e,t,i){const s=new Map;let r=`
`,a=i,l=t;this.start_=a,e.forEach((h,p)=>{const g=this.storage_.get(l),_=a,w=_+h.duration,D=!!(g&&g.segmentSyncInfo&&g.segmentSyncInfo.isAppended),C=new pd({start:_,end:w,appended:D,segmentIndex:p});h.syncInfo=C;let I=a;const R=(h.parts||[]).map((q,L)=>{const X=I,H=I+q.duration,P=!!(g&&g.partsSyncInfo&&g.partsSyncInfo[L]&&g.partsSyncInfo[L].isAppended),ce=new pd({start:X,end:H,appended:P,segmentIndex:p,partIndex:L});return I=H,r+=`Media Sequence: ${l}.${L} | Range: ${X} --> ${H} | Appended: ${P}
`,q.syncInfo=ce,ce});s.set(l,new Pg(C,R)),r+=`${td(h.resolvedUri)} | Media Sequence: ${l} | Range: ${_} --> ${w} | Appended: ${D}
`,l++,a=w}),this.end_=a,this.storage_=s,this.diagnostics_=r}calculateBaseTime_(e,t){return this.storage_.size?this.storage_.has(e)?this.storage_.get(e).segmentSyncInfo.start:t:0}isReliablePlaylist_(e,t){return e!=null&&Array.isArray(t)&&t.length}}const Og=86400,qo=[{name:"VOD",run:(n,e,t,i,s)=>t!==1/0?{time:0,segmentIndex:0,partIndex:null}:null},{name:"MediaSequence",run:(n,e,t,i,s,r)=>{const a=n.getMediaSequenceSync(r);if(!a||!a.isReliable)return null;const l=a.getSyncInfoForTime(s);return l?{time:l.start,partIndex:l.partIndex,segmentIndex:l.segmentIndex}:null}},{name:"ProgramDateTime",run:(n,e,t,i,s)=>{if(!Object.keys(n.timelineToDatetimeMappings).length)return null;let r=null,a=null;const l=xo(e);s=s||0;for(let h=0;h<l.length;h++){const p=e.endList||s===0?h:l.length-(h+1),g=l[p],_=g.segment,w=n.timelineToDatetimeMappings[_.timeline];if(!w||!_.dateTimeObject)continue;let C=_.dateTimeObject.getTime()/1e3+w;if(_.parts&&typeof g.partIndex=="number")for(let R=0;R<g.partIndex;R++)C+=_.parts[R].duration;const I=Math.abs(s-C);if(a!==null&&(I===0||a<I))break;a=I,r={time:C,segmentIndex:g.segmentIndex,partIndex:g.partIndex}}return r}},{name:"Segment",run:(n,e,t,i,s)=>{let r=null,a=null;s=s||0;const l=xo(e);for(let h=0;h<l.length;h++){const p=e.endList||s===0?h:l.length-(h+1),g=l[p],_=g.segment,w=g.part&&g.part.start||_&&_.start;if(_.timeline===i&&typeof w!="undefined"){const D=Math.abs(s-w);if(a!==null&&a<D)break;(!r||a===null||a>=D)&&(a=D,r={time:w,segmentIndex:g.segmentIndex,partIndex:g.partIndex})}}return r}},{name:"Discontinuity",run:(n,e,t,i,s)=>{let r=null;if(s=s||0,e.discontinuityStarts&&e.discontinuityStarts.length){let a=null;for(let l=0;l<e.discontinuityStarts.length;l++){const h=e.discontinuityStarts[l],p=e.discontinuitySequence+l+1,g=n.discontinuities[p];if(g){const _=Math.abs(s-g.time);if(a!==null&&a<_)break;(!r||a===null||a>=_)&&(a=_,r={time:g.time,segmentIndex:h,partIndex:null})}}}return r}},{name:"Playlist",run:(n,e,t,i,s)=>e.syncInfo?{time:e.syncInfo.time,segmentIndex:e.syncInfo.mediaSequence-e.mediaSequence,partIndex:null}:null}];class Lg extends M.EventTarget{constructor(e={}){super(),this.timelines=[],this.discontinuities=[],this.timelineToDatetimeMappings={},this.mediaSequenceStorage_={main:new Vo,audio:new Vo,vtt:new Vo},this.logger_=si("SyncController")}getMediaSequenceSync(e){return this.mediaSequenceStorage_[e]||null}getSyncPoint(e,t,i,s,r){if(t!==1/0)return qo.find(({name:h})=>h==="VOD").run(this,e,t);const a=this.runStrategies_(e,t,i,s,r);if(!a.length)return null;for(const l of a){const{syncPoint:h,strategy:p}=l,{segmentIndex:g,time:_}=h;if(g<0)continue;const w=e.segments[g],D=_,C=D+w.duration;if(this.logger_(`Strategy: ${p}. Current time: ${s}. selected segment: ${g}. Time: [${D} -> ${C}]}`),s>=D&&s<C)return this.logger_("Found sync point with exact match: ",h),h}return this.selectSyncPoint_(a,{key:"time",value:s})}getExpiredTime(e,t){if(!e||!e.segments)return null;const i=this.runStrategies_(e,t,e.discontinuitySequence,0);if(!i.length)return null;const s=this.selectSyncPoint_(i,{key:"segmentIndex",value:0});return s.segmentIndex>0&&(s.time*=-1),Math.abs(s.time+Ss({defaultDuration:e.targetDuration,durationList:e.segments,startIndex:s.segmentIndex,endIndex:0}))}runStrategies_(e,t,i,s,r){const a=[];for(let l=0;l<qo.length;l++){const h=qo[l],p=h.run(this,e,t,i,s,r);p&&(p.strategy=h.name,a.push({strategy:h.name,syncPoint:p}))}return a}selectSyncPoint_(e,t){let i=e[0].syncPoint,s=Math.abs(e[0].syncPoint[t.key]-t.value),r=e[0].strategy;for(let a=1;a<e.length;a++){const l=Math.abs(e[a].syncPoint[t.key]-t.value);l<s&&(s=l,i=e[a].syncPoint,r=e[a].strategy)}return this.logger_(`syncPoint for [${t.key}: ${t.value}] chosen with strategy [${r}]: [time:${i.time}, segmentIndex:${i.segmentIndex}`+(typeof i.partIndex=="number"?`,partIndex:${i.partIndex}`:"")+"]"),i}saveExpiredSegmentInfo(e,t){const i=t.mediaSequence-e.mediaSequence;if(i>Og){M.log.warn(`Not saving expired segment info. Media sequence gap ${i} is too large.`);return}for(let s=i-1;s>=0;s--){const r=e.segments[s];if(r&&typeof r.start!="undefined"){t.syncInfo={mediaSequence:e.mediaSequence+s,time:r.start},this.logger_(`playlist refresh sync: [time:${t.syncInfo.time}, mediaSequence: ${t.syncInfo.mediaSequence}]`),this.trigger("syncinfoupdate");break}}}setDateTimeMappingForStart(e){if(this.timelineToDatetimeMappings={},e.segments&&e.segments.length&&e.segments[0].dateTimeObject){const t=e.segments[0],i=t.dateTimeObject.getTime()/1e3;this.timelineToDatetimeMappings[t.timeline]=-i}}saveSegmentTimingInfo({segmentInfo:e,shouldSaveTimelineMapping:t}){const i=this.calculateSegmentTimeMapping_(e,e.timingInfo,t),s=e.segment;i&&(this.saveDiscontinuitySyncInfo_(e),e.playlist.syncInfo||(e.playlist.syncInfo={mediaSequence:e.playlist.mediaSequence+e.mediaIndex,time:s.start}));const r=s.dateTimeObject;s.discontinuity&&t&&r&&(this.timelineToDatetimeMappings[s.timeline]=-(r.getTime()/1e3))}timestampOffsetForTimeline(e){return typeof this.timelines[e]=="undefined"?null:this.timelines[e].time}mappingForTimeline(e){return typeof this.timelines[e]=="undefined"?null:this.timelines[e].mapping}calculateSegmentTimeMapping_(e,t,i){const s=e.segment,r=e.part;let a=this.timelines[e.timeline],l,h;if(typeof e.timestampOffset=="number")a={time:e.startOfSegment,mapping:e.startOfSegment-t.start},i&&(this.timelines[e.timeline]=a,this.trigger("timestampoffset"),this.logger_(`time mapping for timeline ${e.timeline}: [time: ${a.time}] [mapping: ${a.mapping}]`)),l=e.startOfSegment,h=t.end+a.mapping;else if(a)l=t.start+a.mapping,h=t.end+a.mapping;else return!1;return r&&(r.start=l,r.end=h),(!s.start||l<s.start)&&(s.start=l),s.end=h,!0}saveDiscontinuitySyncInfo_(e){const t=e.playlist,i=e.segment;if(i.discontinuity)this.discontinuities[i.timeline]={time:i.start,accuracy:0};else if(t.discontinuityStarts&&t.discontinuityStarts.length)for(let s=0;s<t.discontinuityStarts.length;s++){const r=t.discontinuityStarts[s],a=t.discontinuitySequence+s+1,l=r-e.mediaIndex,h=Math.abs(l);if(!this.discontinuities[a]||this.discontinuities[a].accuracy>h){let p;l<0?p=i.start-Ss({defaultDuration:t.targetDuration,durationList:t.segments,startIndex:e.mediaIndex,endIndex:r}):p=i.end+Ss({defaultDuration:t.targetDuration,durationList:t.segments,startIndex:e.mediaIndex+1,endIndex:r}),this.discontinuities[a]={time:p,accuracy:h}}}}dispose(){this.trigger("dispose"),this.off()}}class Rg extends M.EventTarget{constructor(){super(),this.pendingTimelineChanges_={},this.lastTimelineChanges_={}}clearPendingTimelineChange(e){this.pendingTimelineChanges_[e]=null,this.trigger("pendingtimelinechange")}pendingTimelineChange({type:e,from:t,to:i}){return typeof t=="number"&&typeof i=="number"&&(this.pendingTimelineChanges_[e]={type:e,from:t,to:i},this.trigger("pendingtimelinechange")),this.pendingTimelineChanges_[e]}lastTimelineChange({type:e,from:t,to:i}){return typeof t=="number"&&typeof i=="number"&&(this.lastTimelineChanges_[e]={type:e,from:t,to:i},delete this.pendingTimelineChanges_[e],this.trigger("timelinechange")),this.lastTimelineChanges_[e]}dispose(){this.trigger("dispose"),this.pendingTimelineChanges_={},this.lastTimelineChanges_={},this.off()}}const Mg=Uc(Fc(function(){var n=function(){function I(){this.listeners={}}var R=I.prototype;return R.on=function(L,X){this.listeners[L]||(this.listeners[L]=[]),this.listeners[L].push(X)},R.off=function(L,X){if(!this.listeners[L])return!1;var H=this.listeners[L].indexOf(X);return this.listeners[L]=this.listeners[L].slice(0),this.listeners[L].splice(H,1),H>-1},R.trigger=function(L){var X=this.listeners[L];if(X)if(arguments.length===2)for(var H=X.length,P=0;P<H;++P)X[P].call(this,arguments[1]);else for(var ce=Array.prototype.slice.call(arguments,1),Ee=X.length,Ve=0;Ve<Ee;++Ve)X[Ve].apply(this,ce)},R.dispose=function(){this.listeners={}},R.pipe=function(L){this.on("data",function(X){L.push(X)})},I}();/*! @name pkcs7 @version 1.0.4 @license Apache-2.0 */function e(I){return I.subarray(0,I.byteLength-I[I.byteLength-1])}/*! @name aes-decrypter @version 4.0.1 @license Apache-2.0 */const t=function(){const I=[[[],[],[],[],[]],[[],[],[],[],[]]],R=I[0],q=I[1],L=R[4],X=q[4];let H,P,ce;const Ee=[],Ve=[];let He,mt,kt,gt,Be,Je;for(H=0;H<256;H++)Ve[(Ee[H]=H<<1^(H>>7)*283)^H]=H;for(P=ce=0;!L[P];P^=He||1,ce=Ve[ce]||1)for(gt=ce^ce<<1^ce<<2^ce<<3^ce<<4,gt=gt>>8^gt&255^99,L[P]=gt,X[gt]=P,kt=Ee[mt=Ee[He=Ee[P]]],Je=kt*16843009^mt*65537^He*257^P*16843008,Be=Ee[gt]*257^gt*16843008,H=0;H<4;H++)R[H][P]=Be=Be<<24^Be>>>8,q[H][gt]=Je=Je<<24^Je>>>8;for(H=0;H<5;H++)R[H]=R[H].slice(0),q[H]=q[H].slice(0);return I};let i=null;class s{constructor(R){i||(i=t()),this._tables=[[i[0][0].slice(),i[0][1].slice(),i[0][2].slice(),i[0][3].slice(),i[0][4].slice()],[i[1][0].slice(),i[1][1].slice(),i[1][2].slice(),i[1][3].slice(),i[1][4].slice()]];let q,L,X;const H=this._tables[0][4],P=this._tables[1],ce=R.length;let Ee=1;if(ce!==4&&ce!==6&&ce!==8)throw new Error("Invalid aes key size");const Ve=R.slice(0),He=[];for(this._key=[Ve,He],q=ce;q<4*ce+28;q++)X=Ve[q-1],(q%ce===0||ce===8&&q%ce===4)&&(X=H[X>>>24]<<24^H[X>>16&255]<<16^H[X>>8&255]<<8^H[X&255],q%ce===0&&(X=X<<8^X>>>24^Ee<<24,Ee=Ee<<1^(Ee>>7)*283)),Ve[q]=Ve[q-ce]^X;for(L=0;q;L++,q--)X=Ve[L&3?q:q-4],q<=4||L<4?He[L]=X:He[L]=P[0][H[X>>>24]]^P[1][H[X>>16&255]]^P[2][H[X>>8&255]]^P[3][H[X&255]]}decrypt(R,q,L,X,H,P){const ce=this._key[1];let Ee=R^ce[0],Ve=X^ce[1],He=L^ce[2],mt=q^ce[3],kt,gt,Be;const Je=ce.length/4-2;let Si,Ni=4;const Yi=this._tables[1],hn=Yi[0],fn=Yi[1],pn=Yi[2],mn=Yi[3],gn=Yi[4];for(Si=0;Si<Je;Si++)kt=hn[Ee>>>24]^fn[Ve>>16&255]^pn[He>>8&255]^mn[mt&255]^ce[Ni],gt=hn[Ve>>>24]^fn[He>>16&255]^pn[mt>>8&255]^mn[Ee&255]^ce[Ni+1],Be=hn[He>>>24]^fn[mt>>16&255]^pn[Ee>>8&255]^mn[Ve&255]^ce[Ni+2],mt=hn[mt>>>24]^fn[Ee>>16&255]^pn[Ve>>8&255]^mn[He&255]^ce[Ni+3],Ni+=4,Ee=kt,Ve=gt,He=Be;for(Si=0;Si<4;Si++)H[(3&-Si)+P]=gn[Ee>>>24]<<24^gn[Ve>>16&255]<<16^gn[He>>8&255]<<8^gn[mt&255]^ce[Ni++],kt=Ee,Ee=Ve,Ve=He,He=mt,mt=kt}}class r extends n{constructor(){super(n),this.jobs=[],this.delay=1,this.timeout_=null}processJob_(){this.jobs.shift()(),this.jobs.length?this.timeout_=setTimeout(this.processJob_.bind(this),this.delay):this.timeout_=null}push(R){this.jobs.push(R),this.timeout_||(this.timeout_=setTimeout(this.processJob_.bind(this),this.delay))}}const a=function(I){return I<<24|(I&65280)<<8|(I&16711680)>>8|I>>>24},l=function(I,R,q){const L=new Int32Array(I.buffer,I.byteOffset,I.byteLength>>2),X=new s(Array.prototype.slice.call(R)),H=new Uint8Array(I.byteLength),P=new Int32Array(H.buffer);let ce,Ee,Ve,He,mt,kt,gt,Be,Je;for(ce=q[0],Ee=q[1],Ve=q[2],He=q[3],Je=0;Je<L.length;Je+=4)mt=a(L[Je]),kt=a(L[Je+1]),gt=a(L[Je+2]),Be=a(L[Je+3]),X.decrypt(mt,kt,gt,Be,P,Je),P[Je]=a(P[Je]^ce),P[Je+1]=a(P[Je+1]^Ee),P[Je+2]=a(P[Je+2]^Ve),P[Je+3]=a(P[Je+3]^He),ce=mt,Ee=kt,Ve=gt,He=Be;return H};class h{constructor(R,q,L,X){const H=h.STEP,P=new Int32Array(R.buffer),ce=new Uint8Array(R.byteLength);let Ee=0;for(this.asyncStream_=new r,this.asyncStream_.push(this.decryptChunk_(P.subarray(Ee,Ee+H),q,L,ce)),Ee=H;Ee<P.length;Ee+=H)L=new Uint32Array([a(P[Ee-4]),a(P[Ee-3]),a(P[Ee-2]),a(P[Ee-1])]),this.asyncStream_.push(this.decryptChunk_(P.subarray(Ee,Ee+H),q,L,ce));this.asyncStream_.push(function(){X(null,e(ce))})}static get STEP(){return 32e3}decryptChunk_(R,q,L,X){return function(){const H=l(R,q,L);X.set(H,R.byteOffset)}}}var p=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof z.g!="undefined"?z.g:typeof self!="undefined"?self:{},g;typeof window!="undefined"?g=window:typeof p!="undefined"?g=p:typeof self!="undefined"?g=self:g={};var _=g,w=function(R){return ArrayBuffer.isView==="function"?ArrayBuffer.isView(R):R&&R.buffer instanceof ArrayBuffer},D=_.BigInt||Number;D("0x1"),D("0x100"),D("0x10000"),D("0x1000000"),D("0x100000000"),D("0x10000000000"),D("0x1000000000000"),D("0x100000000000000"),D("0x10000000000000000"),function(){var I=new Uint16Array([65484]),R=new Uint8Array(I.buffer,I.byteOffset,I.byteLength);return R[0]===255?"big":R[0]===204?"little":"unknown"}();const C=function(I){const R={};return Object.keys(I).forEach(q=>{const L=I[q];w(L)?R[q]={bytes:L.buffer,byteOffset:L.byteOffset,byteLength:L.byteLength}:R[q]=L}),R};self.onmessage=function(I){const R=I.data,q=new Uint8Array(R.encrypted.bytes,R.encrypted.byteOffset,R.encrypted.byteLength),L=new Uint32Array(R.key.bytes,R.key.byteOffset,R.key.byteLength/4),X=new Uint32Array(R.iv.bytes,R.iv.byteOffset,R.iv.byteLength/4);new h(q,L,X,function(H,P){self.postMessage(C({source:R.source,decrypted:P}),[P.buffer])})}}));var Ng=Nc(Mg);const Ug=n=>{let e=n.default?"main":"alternative";return n.characteristics&&n.characteristics.indexOf("public.accessibility.describes-video")>=0&&(e="main-desc"),e},md=(n,e)=>{n.abort(),n.pause(),e&&e.activePlaylistLoader&&(e.activePlaylistLoader.pause(),e.activePlaylistLoader=null)},zo=(n,e)=>{e.activePlaylistLoader=n,n.load()},Fg=(n,e)=>()=>{const{segmentLoaders:{[n]:t,main:i},mediaTypes:{[n]:s}}=e,r=s.activeTrack(),a=s.getActiveGroup(),l=s.activePlaylistLoader,h=s.lastGroup_;if(!(a&&h&&a.id===h.id)&&(s.lastGroup_=a,s.lastTrack_=r,md(t,s),!(!a||a.isMainPlaylist))){if(!a.playlistLoader){l&&i.resetEverything();return}t.resyncLoader(),zo(a.playlistLoader,s)}},Vg=(n,e)=>()=>{const{segmentLoaders:{[n]:t},mediaTypes:{[n]:i}}=e;i.lastGroup_=null,t.abort(),t.pause()},qg=(n,e)=>()=>{const{mainPlaylistLoader:t,segmentLoaders:{[n]:i,main:s},mediaTypes:{[n]:r}}=e,a=r.activeTrack(),l=r.getActiveGroup(),h=r.activePlaylistLoader,p=r.lastTrack_;if(!(p&&a&&p.id===a.id)&&(r.lastGroup_=l,r.lastTrack_=a,md(i,r),!!l)){if(l.isMainPlaylist){if(!a||!p||a.id===p.id)return;const g=e.vhs.playlistController_,_=g.selectPlaylist();if(g.media()===_)return;r.logger_(`track change. Switching main audio from ${p.id} to ${a.id}`),t.pause(),s.resetEverything(),g.fastQualityChange_(_);return}if(n==="AUDIO"){if(!l.playlistLoader){s.setAudio(!0),s.resetEverything();return}i.setAudio(!0),s.setAudio(!1)}if(h===l.playlistLoader){zo(l.playlistLoader,r);return}i.track&&i.track(a),i.resetEverything(),zo(l.playlistLoader,r)}},Fr={AUDIO:(n,e)=>()=>{const{mediaTypes:{[n]:t},excludePlaylist:i}=e,s=t.activeTrack(),r=t.activeGroup(),a=(r.filter(h=>h.default)[0]||r[0]).id,l=t.tracks[a];if(s===l){i({error:{message:"Problem encountered loading the default audio track."}});return}M.log.warn("Problem encountered loading the alternate audio track.Switching back to default.");for(const h in t.tracks)t.tracks[h].enabled=t.tracks[h]===l;t.onTrackChanged()},SUBTITLES:(n,e)=>()=>{const{mediaTypes:{[n]:t}}=e;M.log.warn("Problem encountered loading the subtitle track.Disabling subtitle track.");const i=t.activeTrack();i&&(i.mode="disabled"),t.onTrackChanged()}},gd={AUDIO:(n,e,t)=>{if(!e)return;const{tech:i,requestOptions:s,segmentLoaders:{[n]:r}}=t;e.on("loadedmetadata",()=>{const a=e.media();r.playlist(a,s),(!i.paused()||a.endList&&i.preload()!=="none")&&r.load()}),e.on("loadedplaylist",()=>{r.playlist(e.media(),s),i.paused()||r.load()}),e.on("error",Fr[n](n,t))},SUBTITLES:(n,e,t)=>{const{tech:i,requestOptions:s,segmentLoaders:{[n]:r},mediaTypes:{[n]:a}}=t;e.on("loadedmetadata",()=>{const l=e.media();r.playlist(l,s),r.track(a.activeTrack()),(!i.paused()||l.endList&&i.preload()!=="none")&&r.load()}),e.on("loadedplaylist",()=>{r.playlist(e.media(),s),i.paused()||r.load()}),e.on("error",Fr[n](n,t))}},zg={AUDIO:(n,e)=>{const{vhs:t,sourceType:i,segmentLoaders:{[n]:s},requestOptions:r,main:{mediaGroups:a},mediaTypes:{[n]:{groups:l,tracks:h,logger_:p}},mainPlaylistLoader:g}=e,_=js(g.main);(!a[n]||Object.keys(a[n]).length===0)&&(a[n]={main:{default:{default:!0}}},_&&(a[n].main.default.playlists=g.main.playlists));for(const w in a[n]){l[w]||(l[w]=[]);for(const D in a[n][w]){let C=a[n][w][D],I;if(_?(p(`AUDIO group '${w}' label '${D}' is a main playlist`),C.isMainPlaylist=!0,I=null):i==="vhs-json"&&C.playlists?I=new Qn(C.playlists[0],t,r):C.resolvedUri?I=new Qn(C.resolvedUri,t,r):C.playlists&&i==="dash"?I=new Oo(C.playlists[0],t,r,g):I=null,C=Ge({id:D,playlistLoader:I},C),gd[n](n,C.playlistLoader,e),l[w].push(C),typeof h[D]=="undefined"){const R=new M.AudioTrack({id:D,kind:Ug(C),enabled:!1,language:C.language,default:C.default,label:D});h[D]=R}}}s.on("error",Fr[n](n,e))},SUBTITLES:(n,e)=>{const{tech:t,vhs:i,sourceType:s,segmentLoaders:{[n]:r},requestOptions:a,main:{mediaGroups:l},mediaTypes:{[n]:{groups:h,tracks:p}},mainPlaylistLoader:g}=e;for(const _ in l[n]){h[_]||(h[_]=[]);for(const w in l[n][_]){if(!i.options_.useForcedSubtitles&&l[n][_][w].forced)continue;let D=l[n][_][w],C;if(s==="hls")C=new Qn(D.resolvedUri,i,a);else if(s==="dash"){if(!D.playlists.filter(R=>R.excludeUntil!==1/0).length)return;C=new Oo(D.playlists[0],i,a,g)}else s==="vhs-json"&&(C=new Qn(D.playlists?D.playlists[0]:D.resolvedUri,i,a));if(D=Ge({id:w,playlistLoader:C},D),gd[n](n,D.playlistLoader,e),h[_].push(D),typeof p[w]=="undefined"){const I=t.addRemoteTextTrack({id:w,kind:"subtitles",default:D.default&&D.autoselect,language:D.language,label:w},!1).track;p[w]=I}}}r.on("error",Fr[n](n,e))},"CLOSED-CAPTIONS":(n,e)=>{const{tech:t,main:{mediaGroups:i},mediaTypes:{[n]:{groups:s,tracks:r}}}=e;for(const a in i[n]){s[a]||(s[a]=[]);for(const l in i[n][a]){const h=i[n][a][l];if(!/^(?:CC|SERVICE)/.test(h.instreamId))continue;const p=t.options_.vhs&&t.options_.vhs.captionServices||{};let g={label:l,language:h.language,instreamId:h.instreamId,default:h.default&&h.autoselect};if(p[g.instreamId]&&(g=Ge(g,p[g.instreamId])),g.default===void 0&&delete g.default,s[a].push(Ge({id:l},h)),typeof r[l]=="undefined"){const _=t.addRemoteTextTrack({id:g.instreamId,kind:"captions",default:g.default,language:g.language,label:g.label},!1).track;r[l]=_}}}}},vd=(n,e)=>{for(let t=0;t<n.length;t++)if(Bo(e,n[t])||n[t].playlists&&vd(n[t].playlists,e))return!0;return!1},Hg=(n,e)=>t=>{const{mainPlaylistLoader:i,mediaTypes:{[n]:{groups:s}}}=e,r=i.media();if(!r)return null;let a=null;r.attributes[n]&&(a=s[r.attributes[n]]);const l=Object.keys(s);if(!a)if(n==="AUDIO"&&l.length>1&&js(e.main))for(let h=0;h<l.length;h++){const p=s[l[h]];if(vd(p,r)){a=p;break}}else s.main?a=s.main:l.length===1&&(a=s[l[0]]);return typeof t=="undefined"?a:t===null||!a?null:a.filter(h=>h.id===t.id)[0]||null},Wg={AUDIO:(n,e)=>()=>{const{mediaTypes:{[n]:{tracks:t}}}=e;for(const i in t)if(t[i].enabled)return t[i];return null},SUBTITLES:(n,e)=>()=>{const{mediaTypes:{[n]:{tracks:t}}}=e;for(const i in t)if(t[i].mode==="showing"||t[i].mode==="hidden")return t[i];return null}},Gg=(n,{mediaTypes:e})=>()=>{const t=e[n].activeTrack();return t?e[n].activeGroup(t):null},$g=n=>{["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(p=>{zg[p](p,n)});const{mediaTypes:e,mainPlaylistLoader:t,tech:i,vhs:s,segmentLoaders:{["AUDIO"]:r,main:a}}=n;["AUDIO","SUBTITLES"].forEach(p=>{e[p].activeGroup=Hg(p,n),e[p].activeTrack=Wg[p](p,n),e[p].onGroupChanged=Fg(p,n),e[p].onGroupChanging=Vg(p,n),e[p].onTrackChanged=qg(p,n),e[p].getActiveGroup=Gg(p,n)});const l=e.AUDIO.activeGroup();if(l){const p=(l.filter(_=>_.default)[0]||l[0]).id;e.AUDIO.tracks[p].enabled=!0,e.AUDIO.onGroupChanged(),e.AUDIO.onTrackChanged(),e.AUDIO.getActiveGroup().playlistLoader?(a.setAudio(!1),r.setAudio(!0)):a.setAudio(!0)}t.on("mediachange",()=>{["AUDIO","SUBTITLES"].forEach(p=>e[p].onGroupChanged())}),t.on("mediachanging",()=>{["AUDIO","SUBTITLES"].forEach(p=>e[p].onGroupChanging())});const h=()=>{e.AUDIO.onTrackChanged(),i.trigger({type:"usage",name:"vhs-audio-change"})};i.audioTracks().addEventListener("change",h),i.remoteTextTracks().addEventListener("change",e.SUBTITLES.onTrackChanged),s.on("dispose",()=>{i.audioTracks().removeEventListener("change",h),i.remoteTextTracks().removeEventListener("change",e.SUBTITLES.onTrackChanged)}),i.clearTracks("audio");for(const p in e.AUDIO.tracks)i.audioTracks().addTrack(e.AUDIO.tracks[p])},Xg=()=>{const n={};return["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(e=>{n[e]={groups:{},tracks:{},activePlaylistLoader:null,activeGroup:Ri,activeTrack:Ri,getActiveGroup:Ri,onGroupChanged:Ri,onTrackChanged:Ri,lastTrack_:null,logger_:si(`MediaGroups[${e}]`)}}),n};class Ad{constructor(){this.priority_=[],this.pathwayClones_=new Map}set version(e){e===1&&(this.version_=e)}set ttl(e){this.ttl_=e||300}set reloadUri(e){e&&(this.reloadUri_=zt(this.reloadUri_,e))}set priority(e){e&&e.length&&(this.priority_=e)}set pathwayClones(e){e&&e.length&&(this.pathwayClones_=new Map(e.map(t=>[t.ID,t])))}get version(){return this.version_}get ttl(){return this.ttl_}get reloadUri(){return this.reloadUri_}get priority(){return this.priority_}get pathwayClones(){return this.pathwayClones_}}class Yg extends M.EventTarget{constructor(e,t){super(),this.currentPathway=null,this.defaultPathway=null,this.queryBeforeStart=!1,this.availablePathways_=new Set,this.steeringManifest=new Ad,this.proxyServerUrl_=null,this.manifestType_=null,this.ttlTimeout_=null,this.request_=null,this.currentPathwayClones=new Map,this.nextPathwayClones=new Map,this.excludedSteeringManifestURLs=new Set,this.logger_=si("Content Steering"),this.xhr_=e,this.getBandwidth_=t}assignTagProperties(e,t){this.manifestType_=t.serverUri?"HLS":"DASH";const i=t.serverUri||t.serverURL;if(!i){this.logger_(`steering manifest URL is ${i}, cannot request steering manifest.`),this.trigger("error");return}if(i.startsWith("data:")){this.decodeDataUriManifest_(i.substring(i.indexOf(",")+1));return}this.steeringManifest.reloadUri=zt(e,i),this.defaultPathway=t.pathwayId||t.defaultServiceLocation,this.queryBeforeStart=t.queryBeforeStart,this.proxyServerUrl_=t.proxyServerURL,this.defaultPathway&&!this.queryBeforeStart&&this.trigger("content-steering")}requestSteeringManifest(e){const t=this.steeringManifest.reloadUri;if(!t)return;const i=e?t:this.getRequestURI(t);if(!i){this.logger_("No valid content steering manifest URIs. Stopping content steering."),this.trigger("error"),this.dispose();return}this.request_=this.xhr_({uri:i,requestType:"content-steering-manifest"},(s,r)=>{if(s){if(r.status===410){this.logger_(`manifest request 410 ${s}.`),this.logger_(`There will be no more content steering requests to ${i} this session.`),this.excludedSteeringManifestURLs.add(i);return}if(r.status===429){const l=r.responseHeaders["retry-after"];this.logger_(`manifest request 429 ${s}.`),this.logger_(`content steering will retry in ${l} seconds.`),this.startTTLTimeout_(parseInt(l,10));return}this.logger_(`manifest failed to load ${s}.`),this.startTTLTimeout_();return}const a=JSON.parse(this.request_.responseText);this.assignSteeringProperties_(a),this.startTTLTimeout_()})}setProxyServerUrl_(e){const t=new(A()).URL(e),i=new(A()).URL(this.proxyServerUrl_);return i.searchParams.set("url",encodeURI(t.toString())),this.setSteeringParams_(i.toString())}decodeDataUriManifest_(e){const t=JSON.parse(A().atob(e));this.assignSteeringProperties_(t)}setSteeringParams_(e){const t=new(A()).URL(e),i=this.getPathway(),s=this.getBandwidth_();if(i){const r=`_${this.manifestType_}_pathway`;t.searchParams.set(r,i)}if(s){const r=`_${this.manifestType_}_throughput`;t.searchParams.set(r,s)}return t.toString()}assignSteeringProperties_(e){if(this.steeringManifest.version=e.VERSION,!this.steeringManifest.version){this.logger_(`manifest version is ${e.VERSION}, which is not supported.`),this.trigger("error");return}this.steeringManifest.ttl=e.TTL,this.steeringManifest.reloadUri=e["RELOAD-URI"],this.steeringManifest.priority=e["PATHWAY-PRIORITY"]||e["SERVICE-LOCATION-PRIORITY"],this.steeringManifest.pathwayClones=e["PATHWAY-CLONES"],this.nextPathwayClones=this.steeringManifest.pathwayClones,this.availablePathways_.size||(this.logger_("There are no available pathways for content steering. Ending content steering."),this.trigger("error"),this.dispose());const i=(s=>{for(const r of s)if(this.availablePathways_.has(r))return r;return[...this.availablePathways_][0]})(this.steeringManifest.priority);this.currentPathway!==i&&(this.currentPathway=i,this.trigger("content-steering"))}getPathway(){return this.currentPathway||this.defaultPathway}getRequestURI(e){if(!e)return null;const t=s=>this.excludedSteeringManifestURLs.has(s);if(this.proxyServerUrl_){const s=this.setProxyServerUrl_(e);if(!t(s))return s}const i=this.setSteeringParams_(e);return t(i)?null:i}startTTLTimeout_(e=this.steeringManifest.ttl){const t=e*1e3;this.ttlTimeout_=A().setTimeout(()=>{this.requestSteeringManifest()},t)}clearTTLTimeout_(){A().clearTimeout(this.ttlTimeout_),this.ttlTimeout_=null}abort(){this.request_&&this.request_.abort(),this.request_=null}dispose(){this.off("content-steering"),this.off("error"),this.abort(),this.clearTTLTimeout_(),this.currentPathway=null,this.defaultPathway=null,this.queryBeforeStart=null,this.proxyServerUrl_=null,this.manifestType_=null,this.ttlTimeout_=null,this.request_=null,this.excludedSteeringManifestURLs=new Set,this.availablePathways_=new Set,this.steeringManifest=new Ad}addAvailablePathway(e){e&&this.availablePathways_.add(e)}clearAvailablePathways(){this.availablePathways_.clear()}excludePathway(e){return this.availablePathways_.delete(e)}didDASHTagChange(e,t){return!t&&this.steeringManifest.reloadUri||t&&(zt(e,t.serverURL)!==this.steeringManifest.reloadUri||t.defaultServiceLocation!==this.defaultPathway||t.queryBeforeStart!==this.queryBeforeStart||t.proxyServerURL!==this.proxyServerUrl_)}getAvailablePathways(){return this.availablePathways_}}const Kg=10;let Mi;const Qg=["mediaRequests","mediaRequestsAborted","mediaRequestsTimedout","mediaRequestsErrored","mediaTransferDuration","mediaBytesTransferred","mediaAppends"],Jg=function(n){return this.audioSegmentLoader_[n]+this.mainSegmentLoader_[n]},Zg=function({currentPlaylist:n,buffered:e,currentTime:t,nextPlaylist:i,bufferLowWaterLine:s,bufferHighWaterLine:r,duration:a,bufferBasedABR:l,log:h}){if(!i)return M.log.warn("We received no playlist to switch to. Please check your stream."),!1;const p=`allowing switch ${n&&n.id||"null"} -> ${i.id}`;if(!n)return h(`${p} as current playlist is not set`),!0;if(i.id===n.id)return!1;const g=!!Xn(e,t).length;if(!n.endList)return!g&&typeof n.partTargetDuration=="number"?(h(`not ${p} as current playlist is live llhls, but currentTime isn't in buffered.`),!1):(h(`${p} as current playlist is live`),!0);const _=To(e,t),w=l?jt.EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE:jt.MAX_BUFFER_LOW_WATER_LINE;if(a<w)return h(`${p} as duration < max low water line (${a} < ${w})`),!0;const D=i.attributes.BANDWIDTH,C=n.attributes.BANDWIDTH;if(D<C&&(!l||_<r)){let I=`${p} as next bandwidth < current bandwidth (${D} < ${C})`;return l&&(I+=` and forwardBuffer < bufferHighWaterLine (${_} < ${r})`),h(I),!0}if((!l||D>C)&&_>=s){let I=`${p} as forwardBuffer >= bufferLowWaterLine (${_} >= ${s})`;return l&&(I+=` and next bandwidth > current bandwidth (${D} > ${C})`),h(I),!0}return h(`not ${p} as no switching criteria met`),!1};class e0 extends M.EventTarget{constructor(e){super();const{src:t,withCredentials:i,tech:s,bandwidth:r,externVhs:a,useCueTags:l,playlistExclusionDuration:h,enableLowInitialPlaylist:p,sourceType:g,cacheEncryptionKeys:_,bufferBasedABR:w,leastPixelDiffSelector:D,captionServices:C}=e;if(!t)throw new Error("A non-empty playlist URL or JSON manifest string is required");let{maxPlaylistRetries:I}=e;(I===null||typeof I=="undefined")&&(I=1/0),Mi=a,this.bufferBasedABR=!!w,this.leastPixelDiffSelector=!!D,this.withCredentials=i,this.tech_=s,this.vhs_=s.vhs,this.sourceType_=g,this.useCueTags_=l,this.playlistExclusionDuration=h,this.maxPlaylistRetries=I,this.enableLowInitialPlaylist=p,this.useCueTags_&&(this.cueTagsTrack_=this.tech_.addTextTrack("metadata","ad-cues"),this.cueTagsTrack_.inBandMetadataTrackDispatchType=""),this.requestOptions_={withCredentials:i,maxPlaylistRetries:I,timeout:null},this.on("error",this.pauseLoading),this.mediaTypes_=Xg(),this.mediaSource=new(A()).MediaSource,this.handleDurationChange_=this.handleDurationChange_.bind(this),this.handleSourceOpen_=this.handleSourceOpen_.bind(this),this.handleSourceEnded_=this.handleSourceEnded_.bind(this),this.mediaSource.addEventListener("durationchange",this.handleDurationChange_),this.mediaSource.addEventListener("sourceopen",this.handleSourceOpen_),this.mediaSource.addEventListener("sourceended",this.handleSourceEnded_),this.seekable_=Dt(),this.hasPlayed_=!1,this.syncController_=new Lg(e),this.segmentMetadataTrack_=s.addRemoteTextTrack({kind:"metadata",label:"segment-metadata"},!1).track,this.decrypter_=new Ng,this.sourceUpdater_=new dd(this.mediaSource),this.inbandTextTracks_={},this.timelineChangeController_=new Rg,this.keyStatusMap_=new Map;const R={vhs:this.vhs_,parse708captions:e.parse708captions,useDtsForTimestampOffset:e.useDtsForTimestampOffset,captionServices:C,mediaSource:this.mediaSource,currentTime:this.tech_.currentTime.bind(this.tech_),seekable:()=>this.seekable(),seeking:()=>this.tech_.seeking(),duration:()=>this.duration(),hasPlayed:()=>this.hasPlayed_,goalBufferLength:()=>this.goalBufferLength(),bandwidth:r,syncController:this.syncController_,decrypter:this.decrypter_,sourceType:this.sourceType_,inbandTextTracks:this.inbandTextTracks_,cacheEncryptionKeys:_,sourceUpdater:this.sourceUpdater_,timelineChangeController:this.timelineChangeController_,exactManifestTimings:e.exactManifestTimings,addMetadataToTextTrack:this.addMetadataToTextTrack.bind(this)};this.mainPlaylistLoader_=this.sourceType_==="dash"?new Oo(t,this.vhs_,Ge(this.requestOptions_,{addMetadataToTextTrack:this.addMetadataToTextTrack.bind(this)})):new Qn(t,this.vhs_,Ge(this.requestOptions_,{addDateRangesToTextTrack:this.addDateRangesToTextTrack_.bind(this)})),this.setupMainPlaylistLoaderListeners_(),this.mainSegmentLoader_=new Uo(Ge(R,{segmentMetadataTrack:this.segmentMetadataTrack_,loaderType:"main"}),e),this.audioSegmentLoader_=new Uo(Ge(R,{loaderType:"audio"}),e),this.subtitleSegmentLoader_=new Dg(Ge(R,{loaderType:"vtt",featuresNativeTextTracks:this.tech_.featuresNativeTextTracks,loadVttJs:()=>new Promise((X,H)=>{function P(){s.off("vttjserror",ce),X()}function ce(){s.off("vttjsloaded",P),H()}s.one("vttjsloaded",P),s.one("vttjserror",ce),s.addWebVttScript_()})}),e);const q=()=>this.mainSegmentLoader_.bandwidth;this.contentSteeringController_=new Yg(this.vhs_.xhr,q),this.setupSegmentLoaderListeners_(),this.bufferBasedABR&&(this.mainPlaylistLoader_.one("loadedplaylist",()=>this.startABRTimer_()),this.tech_.on("pause",()=>this.stopABRTimer_()),this.tech_.on("play",()=>this.startABRTimer_())),Qg.forEach(X=>{this[X+"_"]=Jg.bind(this,X)}),this.logger_=si("pc"),this.triggeredFmp4Usage=!1,this.tech_.preload()==="none"?(this.loadOnPlay_=()=>{this.loadOnPlay_=null,this.mainPlaylistLoader_.load()},this.tech_.one("play",this.loadOnPlay_)):this.mainPlaylistLoader_.load(),this.timeToLoadedData__=-1,this.mainAppendsToLoadedData__=-1,this.audioAppendsToLoadedData__=-1;const L=this.tech_.preload()==="none"?"play":"loadstart";this.tech_.one(L,()=>{const X=Date.now();this.tech_.one("loadeddata",()=>{this.timeToLoadedData__=Date.now()-X,this.mainAppendsToLoadedData__=this.mainSegmentLoader_.mediaAppends,this.audioAppendsToLoadedData__=this.audioSegmentLoader_.mediaAppends})})}mainAppendsToLoadedData_(){return this.mainAppendsToLoadedData__}audioAppendsToLoadedData_(){return this.audioAppendsToLoadedData__}appendsToLoadedData_(){const e=this.mainAppendsToLoadedData_(),t=this.audioAppendsToLoadedData_();return e===-1||t===-1?-1:e+t}timeToLoadedData_(){return this.timeToLoadedData__}checkABR_(e="abr"){const t=this.selectPlaylist();t&&this.shouldSwitchToMedia_(t)&&this.switchMedia_(t,e)}switchMedia_(e,t,i){const s=this.media(),r=s&&(s.id||s.uri),a=e&&(e.id||e.uri);r&&r!==a&&(this.logger_(`switch media ${r} -> ${a} from ${t}`),this.tech_.trigger({type:"usage",name:`vhs-rendition-change-${t}`})),this.mainPlaylistLoader_.media(e,i)}switchMediaForDASHContentSteering_(){["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(e=>{const t=this.mediaTypes_[e],i=t?t.activeGroup():null,s=this.contentSteeringController_.getPathway();if(i&&s){const a=(i.length?i[0].playlists:i.playlists).filter(l=>l.attributes.serviceLocation===s);a.length&&this.mediaTypes_[e].activePlaylistLoader.media(a[0])}})}startABRTimer_(){this.stopABRTimer_(),this.abrTimer_=A().setInterval(()=>this.checkABR_(),250)}stopABRTimer_(){this.tech_.scrubbing&&this.tech_.scrubbing()||(A().clearInterval(this.abrTimer_),this.abrTimer_=null)}getAudioTrackPlaylists_(){const e=this.main(),t=e&&e.playlists||[];if(!e||!e.mediaGroups||!e.mediaGroups.AUDIO)return t;const i=e.mediaGroups.AUDIO,s=Object.keys(i);let r;if(Object.keys(this.mediaTypes_.AUDIO.groups).length)r=this.mediaTypes_.AUDIO.activeTrack();else{const l=i.main||s.length&&i[s[0]];for(const h in l)if(l[h].default){r={label:h};break}}if(!r)return t;const a=[];for(const l in i)if(i[l][r.label]){const h=i[l][r.label];if(h.playlists&&h.playlists.length)a.push.apply(a,h.playlists);else if(h.uri)a.push(h);else if(e.playlists.length)for(let p=0;p<e.playlists.length;p++){const g=e.playlists[p];g.attributes&&g.attributes.AUDIO&&g.attributes.AUDIO===l&&a.push(g)}}return a.length?a:t}setupMainPlaylistLoaderListeners_(){this.mainPlaylistLoader_.on("loadedmetadata",()=>{const e=this.mainPlaylistLoader_.media(),t=e.targetDuration*1.5*1e3;jo(this.mainPlaylistLoader_.main,this.mainPlaylistLoader_.media())?this.requestOptions_.timeout=0:this.requestOptions_.timeout=t,e.endList&&this.tech_.preload()!=="none"&&(this.mainSegmentLoader_.playlist(e,this.requestOptions_),this.mainSegmentLoader_.load()),$g({sourceType:this.sourceType_,segmentLoaders:{AUDIO:this.audioSegmentLoader_,SUBTITLES:this.subtitleSegmentLoader_,main:this.mainSegmentLoader_},tech:this.tech_,requestOptions:this.requestOptions_,mainPlaylistLoader:this.mainPlaylistLoader_,vhs:this.vhs_,main:this.main(),mediaTypes:this.mediaTypes_,excludePlaylist:this.excludePlaylist.bind(this)}),this.triggerPresenceUsage_(this.main(),e),this.setupFirstPlay(),!this.mediaTypes_.AUDIO.activePlaylistLoader||this.mediaTypes_.AUDIO.activePlaylistLoader.media()?this.trigger("selectedinitialmedia"):this.mediaTypes_.AUDIO.activePlaylistLoader.one("loadedmetadata",()=>{this.trigger("selectedinitialmedia")})}),this.mainPlaylistLoader_.on("loadedplaylist",()=>{this.loadOnPlay_&&this.tech_.off("play",this.loadOnPlay_);let e=this.mainPlaylistLoader_.media();if(!e){this.attachContentSteeringListeners_(),this.initContentSteeringController_(),this.excludeUnsupportedVariants_();let t;if(this.enableLowInitialPlaylist&&(t=this.selectInitialPlaylist()),t||(t=this.selectPlaylist()),!t||!this.shouldSwitchToMedia_(t)||(this.initialMedia_=t,this.switchMedia_(this.initialMedia_,"initial"),!(this.sourceType_==="vhs-json"&&this.initialMedia_.segments)))return;e=this.initialMedia_}this.handleUpdatedMediaPlaylist(e)}),this.mainPlaylistLoader_.on("error",()=>{const e=this.mainPlaylistLoader_.error;this.excludePlaylist({playlistToExclude:e.playlist,error:e})}),this.mainPlaylistLoader_.on("mediachanging",()=>{this.mainSegmentLoader_.abort(),this.mainSegmentLoader_.pause()}),this.mainPlaylistLoader_.on("mediachange",()=>{const e=this.mainPlaylistLoader_.media(),t=e.targetDuration*1.5*1e3;jo(this.mainPlaylistLoader_.main,this.mainPlaylistLoader_.media())?this.requestOptions_.timeout=0:this.requestOptions_.timeout=t,this.sourceType_==="dash"&&this.mainPlaylistLoader_.load(),this.mainSegmentLoader_.pause(),this.mainSegmentLoader_.playlist(e,this.requestOptions_),this.waitingForFastQualityPlaylistReceived_?this.runFastQualitySwitch_():this.mainSegmentLoader_.load(),this.tech_.trigger({type:"mediachange",bubbles:!0})}),this.mainPlaylistLoader_.on("playlistunchanged",()=>{const e=this.mainPlaylistLoader_.media();if(e.lastExcludeReason_==="playlist-unchanged")return;this.stuckAtPlaylistEnd_(e)&&(this.excludePlaylist({error:{message:"Playlist no longer updating.",reason:"playlist-unchanged"}}),this.tech_.trigger("playliststuck"))}),this.mainPlaylistLoader_.on("renditiondisabled",()=>{this.tech_.trigger({type:"usage",name:"vhs-rendition-disabled"})}),this.mainPlaylistLoader_.on("renditionenabled",()=>{this.tech_.trigger({type:"usage",name:"vhs-rendition-enabled"})})}handleUpdatedMediaPlaylist(e){this.useCueTags_&&this.updateAdCues_(e),this.mainSegmentLoader_.pause(),this.mainSegmentLoader_.playlist(e,this.requestOptions_),this.waitingForFastQualityPlaylistReceived_&&this.runFastQualitySwitch_(),this.updateDuration(!e.endList),this.tech_.paused()||(this.mainSegmentLoader_.load(),this.audioSegmentLoader_&&this.audioSegmentLoader_.load())}triggerPresenceUsage_(e,t){const i=e.mediaGroups||{};let s=!0;const r=Object.keys(i.AUDIO);for(const a in i.AUDIO)for(const l in i.AUDIO[a])i.AUDIO[a][l].uri||(s=!1);s&&this.tech_.trigger({type:"usage",name:"vhs-demuxed"}),Object.keys(i.SUBTITLES).length&&this.tech_.trigger({type:"usage",name:"vhs-webvtt"}),Mi.Playlist.isAes(t)&&this.tech_.trigger({type:"usage",name:"vhs-aes"}),r.length&&Object.keys(i.AUDIO[r[0]]).length>1&&this.tech_.trigger({type:"usage",name:"vhs-alternate-audio"}),this.useCueTags_&&this.tech_.trigger({type:"usage",name:"vhs-playlist-cue-tags"})}shouldSwitchToMedia_(e){const t=this.mainPlaylistLoader_.media()||this.mainPlaylistLoader_.pendingMedia_,i=this.tech_.currentTime(),s=this.bufferLowWaterLine(),r=this.bufferHighWaterLine(),a=this.tech_.buffered();return Zg({buffered:a,currentTime:i,currentPlaylist:t,nextPlaylist:e,bufferLowWaterLine:s,bufferHighWaterLine:r,duration:this.duration(),bufferBasedABR:this.bufferBasedABR,log:this.logger_})}setupSegmentLoaderListeners_(){this.mainSegmentLoader_.on("bandwidthupdate",()=>{this.checkABR_("bandwidthupdate"),this.tech_.trigger("bandwidthupdate")}),this.mainSegmentLoader_.on("timeout",()=>{this.bufferBasedABR&&this.mainSegmentLoader_.load()}),this.bufferBasedABR||this.mainSegmentLoader_.on("progress",()=>{this.trigger("progress")}),this.mainSegmentLoader_.on("error",()=>{const t=this.mainSegmentLoader_.error();this.excludePlaylist({playlistToExclude:t.playlist,error:t})}),this.mainSegmentLoader_.on("appenderror",()=>{this.error=this.mainSegmentLoader_.error_,this.trigger("error")}),this.mainSegmentLoader_.on("syncinfoupdate",()=>{this.onSyncInfoUpdate_()}),this.mainSegmentLoader_.on("timestampoffset",()=>{this.tech_.trigger({type:"usage",name:"vhs-timestamp-offset"})}),this.audioSegmentLoader_.on("syncinfoupdate",()=>{this.onSyncInfoUpdate_()}),this.audioSegmentLoader_.on("appenderror",()=>{this.error=this.audioSegmentLoader_.error_,this.trigger("error")}),this.mainSegmentLoader_.on("ended",()=>{this.logger_("main segment loader ended"),this.onEndOfStream()}),this.mainSegmentLoader_.on("earlyabort",t=>{this.bufferBasedABR||(this.delegateLoaders_("all",["abort"]),this.excludePlaylist({error:{message:"Aborted early because there isn't enough bandwidth to complete the request without rebuffering."},playlistExclusionDuration:Kg}))});const e=()=>{if(!this.sourceUpdater_.hasCreatedSourceBuffers())return this.tryToCreateSourceBuffers_();const t=this.getCodecsOrExclude_();t&&this.sourceUpdater_.addOrChangeSourceBuffers(t)};this.mainSegmentLoader_.on("trackinfo",e),this.audioSegmentLoader_.on("trackinfo",e),this.mainSegmentLoader_.on("fmp4",()=>{this.triggeredFmp4Usage||(this.tech_.trigger({type:"usage",name:"vhs-fmp4"}),this.triggeredFmp4Usage=!0)}),this.audioSegmentLoader_.on("fmp4",()=>{this.triggeredFmp4Usage||(this.tech_.trigger({type:"usage",name:"vhs-fmp4"}),this.triggeredFmp4Usage=!0)}),this.audioSegmentLoader_.on("ended",()=>{this.logger_("audioSegmentLoader ended"),this.onEndOfStream()})}mediaSecondsLoaded_(){return Math.max(this.audioSegmentLoader_.mediaSecondsLoaded+this.mainSegmentLoader_.mediaSecondsLoaded)}load(){this.mainSegmentLoader_.load(),this.mediaTypes_.AUDIO.activePlaylistLoader&&this.audioSegmentLoader_.load(),this.mediaTypes_.SUBTITLES.activePlaylistLoader&&this.subtitleSegmentLoader_.load()}fastQualityChange_(e=this.selectPlaylist()){if(e&&e===this.mainPlaylistLoader_.media()){this.logger_("skipping fastQualityChange because new media is same as old");return}this.switchMedia_(e,"fast-quality"),this.waitingForFastQualityPlaylistReceived_=!0}runFastQualitySwitch_(){this.waitingForFastQualityPlaylistReceived_=!1,this.mainSegmentLoader_.pause(),this.mainSegmentLoader_.resetEverything(()=>{this.tech_.setCurrentTime(this.tech_.currentTime())})}play(){if(this.setupFirstPlay())return;this.tech_.ended()&&this.tech_.setCurrentTime(0),this.hasPlayed_&&this.load();const e=this.tech_.seekable();if(this.tech_.duration()===1/0&&this.tech_.currentTime()<e.start(0))return this.tech_.setCurrentTime(e.end(e.length-1))}setupFirstPlay(){const e=this.mainPlaylistLoader_.media();if(!e||this.tech_.paused()||this.hasPlayed_)return!1;if(!e.endList||e.start){const t=this.seekable();if(!t.length)return!1;const i=t.end(0);let s=i;if(e.start){const r=e.start.timeOffset;r<0?s=Math.max(i+r,t.start(0)):s=Math.min(i,r)}this.trigger("firstplay"),this.tech_.setCurrentTime(s)}return this.hasPlayed_=!0,this.load(),!0}handleSourceOpen_(){if(this.tryToCreateSourceBuffers_(),this.tech_.autoplay()){const e=this.tech_.play();typeof e!="undefined"&&typeof e.then=="function"&&e.then(null,t=>{})}this.trigger("sourceopen")}handleSourceEnded_(){if(!this.inbandTextTracks_.metadataTrack_)return;const e=this.inbandTextTracks_.metadataTrack_.cues;if(!e||!e.length)return;const t=this.duration();e[e.length-1].endTime=isNaN(t)||Math.abs(t)===1/0?Number.MAX_VALUE:t}handleDurationChange_(){this.tech_.trigger("durationchange")}onEndOfStream(){let e=this.mainSegmentLoader_.ended_;if(this.mediaTypes_.AUDIO.activePlaylistLoader){const t=this.mainSegmentLoader_.getCurrentMediaInfo_();!t||t.hasVideo?e=e&&this.audioSegmentLoader_.ended_:e=this.audioSegmentLoader_.ended_}e&&(this.stopABRTimer_(),this.sourceUpdater_.endOfStream())}stuckAtPlaylistEnd_(e){if(!this.seekable().length)return!1;const i=this.syncController_.getExpiredTime(e,this.duration());if(i===null)return!1;const s=Mi.Playlist.playlistEnd(e,i),r=this.tech_.currentTime(),a=this.tech_.buffered();if(!a.length)return s-r<=Ti;const l=a.end(a.length-1);return l-r<=Ti&&s-l<=Ti}excludePlaylist({playlistToExclude:e=this.mainPlaylistLoader_.media(),error:t={},playlistExclusionDuration:i}){if(e=e||this.mainPlaylistLoader_.media(),i=i||t.playlistExclusionDuration||this.playlistExclusionDuration,!e){this.error=t,this.mediaSource.readyState!=="open"?this.trigger("error"):this.sourceUpdater_.endOfStream("network");return}e.playlistErrors_++;const s=this.mainPlaylistLoader_.main.playlists,r=s.filter(Or),a=r.length===1&&r[0]===e;if(s.length===1&&i!==1/0)return M.log.warn(`Problem encountered with playlist ${e.id}. Trying again since it is the only playlist.`),this.tech_.trigger("retryplaylist"),this.mainPlaylistLoader_.load(a);if(a){if(this.main().contentSteering){const C=this.pathwayAttribute_(e),I=this.contentSteeringController_.steeringManifest.ttl*1e3;this.contentSteeringController_.excludePathway(C),this.excludeThenChangePathway_(),setTimeout(()=>{this.contentSteeringController_.addAvailablePathway(C)},I);return}let D=!1;s.forEach(C=>{if(C===e)return;const I=C.excludeUntil;typeof I!="undefined"&&I!==1/0&&(D=!0,delete C.excludeUntil)}),D&&(M.log.warn("Removing other playlists from the exclusion list because the last rendition is about to be excluded."),this.tech_.trigger("retryplaylist"))}let l;e.playlistErrors_>this.maxPlaylistRetries?l=1/0:l=Date.now()+i*1e3,e.excludeUntil=l,t.reason&&(e.lastExcludeReason_=t.reason),this.tech_.trigger("excludeplaylist"),this.tech_.trigger({type:"usage",name:"vhs-rendition-excluded"});const h=this.selectPlaylist();if(!h){this.error="Playback cannot continue. No available working or supported playlists.",this.trigger("error");return}const p=t.internal?this.logger_:M.log.warn,g=t.message?" "+t.message:"";p(`${t.internal?"Internal problem":"Problem"} encountered with playlist ${e.id}.${g} Switching to playlist ${h.id}.`),h.attributes.AUDIO!==e.attributes.AUDIO&&this.delegateLoaders_("audio",["abort","pause"]),h.attributes.SUBTITLES!==e.attributes.SUBTITLES&&this.delegateLoaders_("subtitle",["abort","pause"]),this.delegateLoaders_("main",["abort","pause"]);const _=h.targetDuration/2*1e3||5*1e3,w=typeof h.lastRequest=="number"&&Date.now()-h.lastRequest<=_;return this.switchMedia_(h,"exclude",a||w)}pauseLoading(){this.delegateLoaders_("all",["abort","pause"]),this.stopABRTimer_()}delegateLoaders_(e,t){const i=[],s=e==="all";(s||e==="main")&&i.push(this.mainPlaylistLoader_);const r=[];(s||e==="audio")&&r.push("AUDIO"),(s||e==="subtitle")&&(r.push("CLOSED-CAPTIONS"),r.push("SUBTITLES")),r.forEach(a=>{const l=this.mediaTypes_[a]&&this.mediaTypes_[a].activePlaylistLoader;l&&i.push(l)}),["main","audio","subtitle"].forEach(a=>{const l=this[`${a}SegmentLoader_`];l&&(e===a||e==="all")&&i.push(l)}),i.forEach(a=>t.forEach(l=>{typeof a[l]=="function"&&a[l]()}))}setCurrentTime(e){const t=Xn(this.tech_.buffered(),e);if(!(this.mainPlaylistLoader_&&this.mainPlaylistLoader_.media())||!this.mainPlaylistLoader_.media().segments)return 0;if(t&&t.length)return e;this.mainSegmentLoader_.pause(),this.mainSegmentLoader_.resetEverything(),this.mediaTypes_.AUDIO.activePlaylistLoader&&(this.audioSegmentLoader_.pause(),this.audioSegmentLoader_.resetEverything()),this.mediaTypes_.SUBTITLES.activePlaylistLoader&&(this.subtitleSegmentLoader_.pause(),this.subtitleSegmentLoader_.resetEverything()),this.load()}duration(){if(!this.mainPlaylistLoader_)return 0;const e=this.mainPlaylistLoader_.media();return e?e.endList?this.mediaSource?this.mediaSource.duration:Mi.Playlist.duration(e):1/0:0}seekable(){return this.seekable_}onSyncInfoUpdate_(){let e;if(!this.mainPlaylistLoader_)return;let t=this.mainPlaylistLoader_.media();if(!t)return;let i=this.syncController_.getExpiredTime(t,this.duration());if(i===null)return;const s=this.mainPlaylistLoader_.main,r=Mi.Playlist.seekable(t,i,Mi.Playlist.liveEdgeDelay(s,t));if(r.length===0||this.mediaTypes_.AUDIO.activePlaylistLoader&&(t=this.mediaTypes_.AUDIO.activePlaylistLoader.media(),i=this.syncController_.getExpiredTime(t,this.duration()),i===null||(e=Mi.Playlist.seekable(t,i,Mi.Playlist.liveEdgeDelay(s,t)),e.length===0)))return;let a,l;this.seekable_&&this.seekable_.length&&(a=this.seekable_.end(0),l=this.seekable_.start(0)),e?e.start(0)>r.end(0)||r.start(0)>e.end(0)?this.seekable_=r:this.seekable_=Dt([[e.start(0)>r.start(0)?e.start(0):r.start(0),e.end(0)<r.end(0)?e.end(0):r.end(0)]]):this.seekable_=r,!(this.seekable_&&this.seekable_.length&&this.seekable_.end(0)===a&&this.seekable_.start(0)===l)&&(this.logger_(`seekable updated [${dc(this.seekable_)}]`),this.tech_.trigger("seekablechanged"))}updateDuration(e){if(this.updateDuration_&&(this.mediaSource.removeEventListener("sourceopen",this.updateDuration_),this.updateDuration_=null),this.mediaSource.readyState!=="open"){this.updateDuration_=this.updateDuration.bind(this,e),this.mediaSource.addEventListener("sourceopen",this.updateDuration_);return}if(e){const s=this.seekable();if(!s.length)return;(isNaN(this.mediaSource.duration)||this.mediaSource.duration<s.end(s.length-1))&&this.sourceUpdater_.setDuration(s.end(s.length-1));return}const t=this.tech_.buffered();let i=Mi.Playlist.duration(this.mainPlaylistLoader_.media());t.length>0&&(i=Math.max(i,t.end(t.length-1))),this.mediaSource.duration!==i&&this.sourceUpdater_.setDuration(i)}dispose(){this.trigger("dispose"),this.decrypter_.terminate(),this.mainPlaylistLoader_.dispose(),this.mainSegmentLoader_.dispose(),this.contentSteeringController_.dispose(),this.keyStatusMap_.clear(),this.loadOnPlay_&&this.tech_.off("play",this.loadOnPlay_),["AUDIO","SUBTITLES"].forEach(e=>{const t=this.mediaTypes_[e].groups;for(const i in t)t[i].forEach(s=>{s.playlistLoader&&s.playlistLoader.dispose()})}),this.audioSegmentLoader_.dispose(),this.subtitleSegmentLoader_.dispose(),this.sourceUpdater_.dispose(),this.timelineChangeController_.dispose(),this.stopABRTimer_(),this.updateDuration_&&this.mediaSource.removeEventListener("sourceopen",this.updateDuration_),this.mediaSource.removeEventListener("durationchange",this.handleDurationChange_),this.mediaSource.removeEventListener("sourceopen",this.handleSourceOpen_),this.mediaSource.removeEventListener("sourceended",this.handleSourceEnded_),this.off()}main(){return this.mainPlaylistLoader_.main}media(){return this.mainPlaylistLoader_.media()||this.initialMedia_}areMediaTypesKnown_(){const e=!!this.mediaTypes_.AUDIO.activePlaylistLoader,t=!!this.mainSegmentLoader_.getCurrentMediaInfo_(),i=e?!!this.audioSegmentLoader_.getCurrentMediaInfo_():!0;return!(!t||!i)}getCodecsOrExclude_(){const e={main:this.mainSegmentLoader_.getCurrentMediaInfo_()||{},audio:this.audioSegmentLoader_.getCurrentMediaInfo_()||{}},t=this.mainSegmentLoader_.getPendingSegmentPlaylist()||this.media();e.video=e.main;const i=ws(this.main(),t),s={},r=!!this.mediaTypes_.AUDIO.activePlaylistLoader;if(e.main.hasVideo&&(s.video=i.video||e.main.videoCodec||fi),e.main.isMuxed&&(s.video+=`,${i.audio||e.main.audioCodec||Ut}`),(e.main.hasAudio&&!e.main.isMuxed||e.audio.hasAudio||r)&&(s.audio=i.audio||e.main.audioCodec||e.audio.audioCodec||Ut,e.audio.isFmp4=e.main.hasAudio&&!e.main.isMuxed?e.main.isFmp4:e.audio.isFmp4),!s.audio&&!s.video){this.excludePlaylist({playlistToExclude:t,error:{message:"Could not determine codecs for playlist."},playlistExclusionDuration:1/0});return}const a=(p,g)=>p?nt(g):Tt(g),l={};let h;if(["video","audio"].forEach(function(p){if(s.hasOwnProperty(p)&&!a(e[p].isFmp4,s[p])){const g=e[p].isFmp4?"browser":"muxer";l[g]=l[g]||[],l[g].push(s[p]),p==="audio"&&(h=g)}}),r&&h&&t.attributes.AUDIO){const p=t.attributes.AUDIO;this.main().playlists.forEach(g=>{(g.attributes&&g.attributes.AUDIO)===p&&g!==t&&(g.excludeUntil=1/0)}),this.logger_(`excluding audio group ${p} as ${h} does not support codec(s): "${s.audio}"`)}if(Object.keys(l).length){const p=Object.keys(l).reduce((g,_)=>(g&&(g+=", "),g+=`${_} does not support codec(s): "${l[_].join(",")}"`,g),"")+".";this.excludePlaylist({playlistToExclude:t,error:{internal:!0,message:p},playlistExclusionDuration:1/0});return}if(this.sourceUpdater_.hasCreatedSourceBuffers()&&!this.sourceUpdater_.canChangeType()){const p=[];if(["video","audio"].forEach(g=>{const _=(Ie(this.sourceUpdater_.codecs[g]||"")[0]||{}).type,w=(Ie(s[g]||"")[0]||{}).type;_&&w&&_.toLowerCase()!==w.toLowerCase()&&p.push(`"${this.sourceUpdater_.codecs[g]}" -> "${s[g]}"`)}),p.length){this.excludePlaylist({playlistToExclude:t,error:{message:`Codec switching not supported: ${p.join(", ")}.`,internal:!0},playlistExclusionDuration:1/0});return}}return s}tryToCreateSourceBuffers_(){if(this.mediaSource.readyState!=="open"||this.sourceUpdater_.hasCreatedSourceBuffers()||!this.areMediaTypesKnown_())return;const e=this.getCodecsOrExclude_();if(!e)return;this.sourceUpdater_.createSourceBuffers(e);const t=[e.video,e.audio].filter(Boolean).join(",");this.excludeIncompatibleVariants_(t)}excludeUnsupportedVariants_(){const e=this.main().playlists,t=[];Object.keys(e).forEach(i=>{const s=e[i];if(t.indexOf(s.id)!==-1)return;t.push(s.id);const r=ws(this.main,s),a=[];r.audio&&!Tt(r.audio)&&!nt(r.audio)&&a.push(`audio codec ${r.audio}`),r.video&&!Tt(r.video)&&!nt(r.video)&&a.push(`video codec ${r.video}`),r.text&&r.text==="stpp.ttml.im1t"&&a.push(`text codec ${r.text}`),a.length&&(s.excludeUntil=1/0,this.logger_(`excluding ${s.id} for unsupported: ${a.join(", ")}`))})}excludeIncompatibleVariants_(e){const t=[],i=this.main().playlists,s=Rr(Ie(e)),r=Qc(s),a=s.video&&Ie(s.video)[0]||null,l=s.audio&&Ie(s.audio)[0]||null;Object.keys(i).forEach(h=>{const p=i[h];if(t.indexOf(p.id)!==-1||p.excludeUntil===1/0)return;t.push(p.id);const g=[],_=ws(this.mainPlaylistLoader_.main,p),w=Qc(_);if(!(!_.audio&&!_.video)){if(w!==r&&g.push(`codec count "${w}" !== "${r}"`),!this.sourceUpdater_.canChangeType()){const D=_.video&&Ie(_.video)[0]||null,C=_.audio&&Ie(_.audio)[0]||null;D&&a&&D.type.toLowerCase()!==a.type.toLowerCase()&&g.push(`video codec "${D.type}" !== "${a.type}"`),C&&l&&C.type.toLowerCase()!==l.type.toLowerCase()&&g.push(`audio codec "${C.type}" !== "${l.type}"`)}g.length&&(p.excludeUntil=1/0,this.logger_(`excluding ${p.id}: ${g.join(" && ")}`))}})}updateAdCues_(e){let t=0;const i=this.seekable();i.length&&(t=i.start(0)),Ig(e,this.cueTagsTrack_,t)}goalBufferLength(){const e=this.tech_.currentTime(),t=jt.GOAL_BUFFER_LENGTH,i=jt.GOAL_BUFFER_LENGTH_RATE,s=Math.max(t,jt.MAX_GOAL_BUFFER_LENGTH);return Math.min(t+e*i,s)}bufferLowWaterLine(){const e=this.tech_.currentTime(),t=jt.BUFFER_LOW_WATER_LINE,i=jt.BUFFER_LOW_WATER_LINE_RATE,s=Math.max(t,jt.MAX_BUFFER_LOW_WATER_LINE),r=Math.max(t,jt.EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE);return Math.min(t+e*i,this.bufferBasedABR?r:s)}bufferHighWaterLine(){return jt.BUFFER_HIGH_WATER_LINE}addDateRangesToTextTrack_(e){id(this.inbandTextTracks_,"com.apple.streaming",this.tech_),fg({inbandTextTracks:this.inbandTextTracks_,dateRanges:e})}addMetadataToTextTrack(e,t,i){const s=this.sourceUpdater_.videoBuffer?this.sourceUpdater_.videoTimestampOffset():this.sourceUpdater_.audioTimestampOffset();id(this.inbandTextTracks_,e,this.tech_),cg({inbandTextTracks:this.inbandTextTracks_,metadataArray:t,timestampOffset:s,videoDuration:i})}pathwayAttribute_(e){return e.attributes["PATHWAY-ID"]||e.attributes.serviceLocation}initContentSteeringController_(){const e=this.main();if(e.contentSteering){for(const t of e.playlists)this.contentSteeringController_.addAvailablePathway(this.pathwayAttribute_(t));if(this.contentSteeringController_.assignTagProperties(e.uri,e.contentSteering),this.contentSteeringController_.queryBeforeStart){this.contentSteeringController_.requestSteeringManifest(!0);return}this.tech_.one("canplay",()=>{this.contentSteeringController_.requestSteeringManifest()})}}resetContentSteeringController_(){this.contentSteeringController_.clearAvailablePathways(),this.contentSteeringController_.dispose(),this.initContentSteeringController_()}attachContentSteeringListeners_(){this.contentSteeringController_.on("content-steering",this.excludeThenChangePathway_.bind(this)),this.sourceType_==="dash"&&this.mainPlaylistLoader_.on("loadedplaylist",()=>{const e=this.main();(this.contentSteeringController_.didDASHTagChange(e.uri,e.contentSteering)||(()=>{const s=this.contentSteeringController_.getAvailablePathways(),r=[];for(const a of e.playlists){const l=a.attributes.serviceLocation;if(l&&(r.push(l),!s.has(l)))return!0}return!!(!r.length&&s.size)})())&&this.resetContentSteeringController_()})}excludeThenChangePathway_(){const e=this.contentSteeringController_.getPathway();if(!e)return;this.handlePathwayClones_();const i=this.main().playlists,s=new Set;let r=!1;Object.keys(i).forEach(a=>{const l=i[a],h=this.pathwayAttribute_(l),p=h&&e!==h;l.excludeUntil===1/0&&l.lastExcludeReason_==="content-steering"&&!p&&(delete l.excludeUntil,delete l.lastExcludeReason_,r=!0);const _=!l.excludeUntil&&l.excludeUntil!==1/0;!s.has(l.id)&&p&&_&&(s.add(l.id),l.excludeUntil=1/0,l.lastExcludeReason_="content-steering",this.logger_(`excluding ${l.id} for ${l.lastExcludeReason_}`))}),this.contentSteeringController_.manifestType_==="DASH"&&Object.keys(this.mediaTypes_).forEach(a=>{const l=this.mediaTypes_[a];if(l.activePlaylistLoader){const h=l.activePlaylistLoader.media_;h&&h.attributes.serviceLocation!==e&&(r=!0)}}),r&&this.changeSegmentPathway_()}handlePathwayClones_(){const t=this.main().playlists,i=this.contentSteeringController_.currentPathwayClones,s=this.contentSteeringController_.nextPathwayClones;if(i&&i.size||s&&s.size){for(const[a,l]of i.entries())s.get(a)||(this.mainPlaylistLoader_.updateOrDeleteClone(l),this.contentSteeringController_.excludePathway(a));for(const[a,l]of s.entries()){const h=i.get(a);if(!h){t.filter(g=>g.attributes["PATHWAY-ID"]===l["BASE-ID"]).forEach(g=>{this.mainPlaylistLoader_.addClonePathway(l,g)}),this.contentSteeringController_.addAvailablePathway(a);continue}this.equalPathwayClones_(h,l)||(this.mainPlaylistLoader_.updateOrDeleteClone(l,!0),this.contentSteeringController_.addAvailablePathway(a))}this.contentSteeringController_.currentPathwayClones=new Map(JSON.parse(JSON.stringify([...s])))}}equalPathwayClones_(e,t){if(e["BASE-ID"]!==t["BASE-ID"]||e.ID!==t.ID||e["URI-REPLACEMENT"].HOST!==t["URI-REPLACEMENT"].HOST)return!1;const i=e["URI-REPLACEMENT"].PARAMS,s=t["URI-REPLACEMENT"].PARAMS;for(const r in i)if(i[r]!==s[r])return!1;for(const r in s)if(i[r]!==s[r])return!1;return!0}changeSegmentPathway_(){const e=this.selectPlaylist();this.pauseLoading(),this.contentSteeringController_.manifestType_==="DASH"&&this.switchMediaForDASHContentSteering_(),this.switchMedia_(e,"content-steering")}excludeNonUsablePlaylistsByKeyId_(){if(!this.mainPlaylistLoader_||!this.mainPlaylistLoader_.main)return;let e=0;const t="non-usable";this.mainPlaylistLoader_.main.playlists.forEach(i=>{const s=this.mainPlaylistLoader_.getKeyIdSet(i);!s||!s.size||s.forEach(r=>{const a="usable",l=this.keyStatusMap_.has(r)&&this.keyStatusMap_.get(r)===a,h=i.lastExcludeReason_===t&&i.excludeUntil===1/0;l?l&&h&&(delete i.excludeUntil,delete i.lastExcludeReason_,this.logger_(`enabling playlist ${i.id} because key ID ${r} is ${a}`)):(i.excludeUntil!==1/0&&i.lastExcludeReason_!==t&&(i.excludeUntil=1/0,i.lastExcludeReason_=t,this.logger_(`excluding playlist ${i.id} because the key ID ${r} doesn't exist in the keyStatusMap or is not ${a}`)),e++)})}),e>=this.mainPlaylistLoader_.main.playlists.length&&this.mainPlaylistLoader_.main.playlists.forEach(i=>{const s=i&&i.attributes&&i.attributes.RESOLUTION&&i.attributes.RESOLUTION.height<720,r=i.excludeUntil===1/0&&i.lastExcludeReason_===t;s&&r&&(delete i.excludeUntil,M.log.warn(`enabling non-HD playlist ${i.id} because all playlists were excluded due to ${t} key IDs`))})}addKeyStatus_(e,t){const r=(typeof e=="string"?e:Bg(e)).slice(0,32).toLowerCase();this.logger_(`KeyStatus '${t}' with key ID ${r} added to the keyStatusMap`),this.keyStatusMap_.set(r,t)}updatePlaylistByKeyStatus(e,t){this.addKeyStatus_(e,t),this.waitingForFastQualityPlaylistReceived_||this.excludeNonUsableThenChangePlaylist_(),this.mainPlaylistLoader_.off("loadedplaylist",this.excludeNonUsableThenChangePlaylist_.bind(this)),this.mainPlaylistLoader_.on("loadedplaylist",this.excludeNonUsableThenChangePlaylist_.bind(this))}excludeNonUsableThenChangePlaylist_(){this.excludeNonUsablePlaylistsByKeyId_(),this.fastQualityChange_()}}const t0=(n,e,t)=>i=>{const s=n.main.playlists[e],r=So(s),a=Or(s);return typeof i=="undefined"?a:(i?delete s.disabled:s.disabled=!0,i!==a&&!r&&(t(s),i?n.trigger("renditionenabled"):n.trigger("renditiondisabled")),i)};class i0{constructor(e,t,i){const{playlistController_:s}=e,r=s.fastQualityChange_.bind(s);if(t.attributes){const a=t.attributes.RESOLUTION;this.width=a&&a.width,this.height=a&&a.height,this.bandwidth=t.attributes.BANDWIDTH,this.frameRate=t.attributes["FRAME-RATE"]}this.codecs=ws(s.main(),t),this.playlist=t,this.id=i,this.enabled=t0(e.playlists,t.id,r)}}const n0=function(n){n.representations=()=>{const e=n.playlistController_.main(),t=js(e)?n.playlistController_.getAudioTrackPlaylists_():e.playlists;return t?t.filter(i=>!So(i)).map((i,s)=>new i0(n,i,i.id)):[]}},yd=["seeking","seeked","pause","playing","error"];class s0{constructor(e){this.playlistController_=e.playlistController,this.tech_=e.tech,this.seekable=e.seekable,this.allowSeeksWithinUnsafeLiveWindow=e.allowSeeksWithinUnsafeLiveWindow,this.liveRangeSafeTimeDelta=e.liveRangeSafeTimeDelta,this.media=e.media,this.consecutiveUpdates=0,this.lastRecordedTime=null,this.checkCurrentTimeTimeout_=null,this.logger_=si("PlaybackWatcher"),this.logger_("initialize");const t=()=>this.monitorCurrentTime_(),i=()=>this.monitorCurrentTime_(),s=()=>this.techWaiting_(),r=()=>this.resetTimeUpdate_(),a=this.playlistController_,l=["main","subtitle","audio"],h={};l.forEach(g=>{h[g]={reset:()=>this.resetSegmentDownloads_(g),updateend:()=>this.checkSegmentDownloads_(g)},a[`${g}SegmentLoader_`].on("appendsdone",h[g].updateend),a[`${g}SegmentLoader_`].on("playlistupdate",h[g].reset),this.tech_.on(["seeked","seeking"],h[g].reset)});const p=g=>{["main","audio"].forEach(_=>{a[`${_}SegmentLoader_`][g]("appended",this.seekingAppendCheck_)})};this.seekingAppendCheck_=()=>{this.fixesBadSeeks_()&&(this.consecutiveUpdates=0,this.lastRecordedTime=this.tech_.currentTime(),p("off"))},this.clearSeekingAppendCheck_=()=>p("off"),this.watchForBadSeeking_=()=>{this.clearSeekingAppendCheck_(),p("on")},this.tech_.on("seeked",this.clearSeekingAppendCheck_),this.tech_.on("seeking",this.watchForBadSeeking_),this.tech_.on("waiting",s),this.tech_.on(yd,r),this.tech_.on("canplay",i),this.tech_.one("play",t),this.dispose=()=>{this.clearSeekingAppendCheck_(),this.logger_("dispose"),this.tech_.off("waiting",s),this.tech_.off(yd,r),this.tech_.off("canplay",i),this.tech_.off("play",t),this.tech_.off("seeking",this.watchForBadSeeking_),this.tech_.off("seeked",this.clearSeekingAppendCheck_),l.forEach(g=>{a[`${g}SegmentLoader_`].off("appendsdone",h[g].updateend),a[`${g}SegmentLoader_`].off("playlistupdate",h[g].reset),this.tech_.off(["seeked","seeking"],h[g].reset)}),this.checkCurrentTimeTimeout_&&A().clearTimeout(this.checkCurrentTimeTimeout_),this.resetTimeUpdate_()}}monitorCurrentTime_(){this.checkCurrentTime_(),this.checkCurrentTimeTimeout_&&A().clearTimeout(this.checkCurrentTimeTimeout_),this.checkCurrentTimeTimeout_=A().setTimeout(this.monitorCurrentTime_.bind(this),250)}resetSegmentDownloads_(e){const t=this.playlistController_[`${e}SegmentLoader_`];this[`${e}StalledDownloads_`]>0&&this.logger_(`resetting possible stalled download count for ${e} loader`),this[`${e}StalledDownloads_`]=0,this[`${e}Buffered_`]=t.buffered_()}checkSegmentDownloads_(e){const t=this.playlistController_,i=t[`${e}SegmentLoader_`],s=i.buffered_(),r=Kp(this[`${e}Buffered_`],s);if(this[`${e}Buffered_`]=s,r){this.resetSegmentDownloads_(e);return}this[`${e}StalledDownloads_`]++,this.logger_(`found #${this[`${e}StalledDownloads_`]} ${e} appends that did not increase buffer (possible stalled download)`,{playlistId:i.playlist_&&i.playlist_.id,buffered:dn(s)}),!(this[`${e}StalledDownloads_`]<10)&&(this.logger_(`${e} loader stalled download exclusion`),this.resetSegmentDownloads_(e),this.tech_.trigger({type:"usage",name:`vhs-${e}-download-exclusion`}),e!=="subtitle"&&t.excludePlaylist({error:{message:`Excessive ${e} segment downloading detected.`},playlistExclusionDuration:1/0}))}checkCurrentTime_(){if(this.tech_.paused()||this.tech_.seeking())return;const e=this.tech_.currentTime(),t=this.tech_.buffered();if(this.lastRecordedTime===e&&(!t.length||e+Ti>=t.end(t.length-1)))return this.techWaiting_();this.consecutiveUpdates>=5&&e===this.lastRecordedTime?(this.consecutiveUpdates++,this.waiting_()):e===this.lastRecordedTime?this.consecutiveUpdates++:(this.consecutiveUpdates=0,this.lastRecordedTime=e)}resetTimeUpdate_(){this.consecutiveUpdates=0}fixesBadSeeks_(){if(!this.tech_.seeking())return!1;const t=this.seekable(),i=this.tech_.currentTime(),s=this.afterSeekableWindow_(t,i,this.media(),this.allowSeeksWithinUnsafeLiveWindow);let r;if(s&&(r=t.end(t.length-1)),this.beforeSeekableWindow_(t,i)){const C=t.start(0);r=C+(C===t.end(0)?0:Ti)}if(typeof r!="undefined")return this.logger_(`Trying to seek outside of seekable at time ${i} with seekable range ${dc(t)}. Seeking to ${r}.`),this.tech_.setCurrentTime(r),!0;const a=this.playlistController_.sourceUpdater_,l=this.tech_.buffered(),h=a.audioBuffer?a.audioBuffered():null,p=a.videoBuffer?a.videoBuffered():null,g=this.media(),_=g.partTargetDuration?g.partTargetDuration:(g.targetDuration-Ei)*2,w=[h,p];for(let C=0;C<w.length;C++){if(!w[C])continue;if(To(w[C],i)<_)return!1}const D=Pr(l,i);return D.length===0?!1:(r=D.start(0)+Ti,this.logger_(`Buffered region starts (${D.start(0)})  just beyond seek point (${i}). Seeking to ${r}.`),this.tech_.setCurrentTime(r),!0)}waiting_(){if(this.techWaiting_())return;const e=this.tech_.currentTime(),t=this.tech_.buffered(),i=Xn(t,e);if(i.length&&e+3<=i.end(0)){this.resetTimeUpdate_(),this.tech_.setCurrentTime(e),this.logger_(`Stopped at ${e} while inside a buffered region [${i.start(0)} -> ${i.end(0)}]. Attempting to resume playback by seeking to the current time.`),this.tech_.trigger({type:"usage",name:"vhs-unknown-waiting"});return}}techWaiting_(){const e=this.seekable(),t=this.tech_.currentTime();if(this.tech_.seeking())return!0;if(this.beforeSeekableWindow_(e,t)){const l=e.end(e.length-1);return this.logger_(`Fell out of live window at time ${t}. Seeking to live point (seekable end) ${l}`),this.resetTimeUpdate_(),this.tech_.setCurrentTime(l),this.tech_.trigger({type:"usage",name:"vhs-live-resync"}),!0}const i=this.tech_.vhs.playlistController_.sourceUpdater_,s=this.tech_.buffered();if(this.videoUnderflow_({audioBuffered:i.audioBuffered(),videoBuffered:i.videoBuffered(),currentTime:t}))return this.resetTimeUpdate_(),this.tech_.setCurrentTime(t),this.tech_.trigger({type:"usage",name:"vhs-video-underflow"}),!0;const a=Pr(s,t);return a.length>0?(this.logger_(`Stopped at ${t} and seeking to ${a.start(0)}`),this.resetTimeUpdate_(),this.skipTheGap_(t),!0):!1}afterSeekableWindow_(e,t,i,s=!1){if(!e.length)return!1;let r=e.end(e.length-1)+Ti;const a=!i.endList,l=typeof i.partTargetDuration=="number";return a&&(l||s)&&(r=e.end(e.length-1)+i.targetDuration*3),t>r}beforeSeekableWindow_(e,t){return!!(e.length&&e.start(0)>0&&t<e.start(0)-this.liveRangeSafeTimeDelta)}videoUnderflow_({videoBuffered:e,audioBuffered:t,currentTime:i}){if(!e)return;let s;if(e.length&&t.length){const r=Xn(e,i-3),a=Xn(e,i),l=Xn(t,i);l.length&&!a.length&&r.length&&(s={start:r.end(0),end:l.end(0)})}else Pr(e,i).length||(s=this.gapFromVideoUnderflow_(e,i));return s?(this.logger_(`Encountered a gap in video from ${s.start} to ${s.end}. Seeking to current time ${i}`),!0):!1}skipTheGap_(e){const t=this.tech_.buffered(),i=this.tech_.currentTime(),s=Pr(t,i);this.resetTimeUpdate_(),!(s.length===0||i!==e)&&(this.logger_("skipTheGap_:","currentTime:",i,"scheduled currentTime:",e,"nextRange start:",s.start(0)),this.tech_.setCurrentTime(s.start(0)+Ei),this.tech_.trigger({type:"usage",name:"vhs-gap-skip"}))}gapFromVideoUnderflow_(e,t){const i=$p(e);for(let s=0;s<i.length;s++){const r=i.start(s),a=i.end(s);if(t-r<4&&t-r>2)return{start:r,end:a}}return null}}const r0={errorInterval:30,getSource(n){const t=this.tech({IWillNotUseThisInPlugins:!0}).currentSource_||this.currentSource();return n(t)}},_d=function(n,e){let t=0,i=0;const s=Ge(r0,e);n.ready(()=>{n.trigger({type:"usage",name:"vhs-error-reload-initialized"})});const r=function(){i&&n.currentTime(i)},a=function(g){g!=null&&(i=n.duration()!==1/0&&n.currentTime()||0,n.one("loadedmetadata",r),n.src(g),n.trigger({type:"usage",name:"vhs-error-reload"}),n.play())},l=function(){if(Date.now()-t<s.errorInterval*1e3){n.trigger({type:"usage",name:"vhs-error-reload-canceled"});return}if(!s.getSource||typeof s.getSource!="function"){M.log.error("ERROR: reloadSourceOnError - The option getSource must be a function!");return}return t=Date.now(),s.getSource.call(n,a)},h=function(){n.off("loadedmetadata",r),n.off("error",l),n.off("dispose",h)},p=function(g){h(),_d(n,g)};n.on("error",l),n.on("dispose",h),n.reloadSourceOnError=p},a0=function(n){_d(this,n)};var bd="3.12.1",o0="7.0.3",l0="1.3.0",u0="7.1.0",c0="4.0.1";const ht={PlaylistLoader:Qn,Playlist:Ht,utils:Am,STANDARD_PLAYLIST_SELECTOR:ed,INITIAL_PLAYLIST_SELECTOR:rg,lastBandwidthSelector:ed,movingAverageBandwidthSelector:ng,comparePlaylistBandwidth:No,comparePlaylistResolution:ig,xhr:wc()};Object.keys(jt).forEach(n=>{Object.defineProperty(ht,n,{get(){return M.log.warn(`using Vhs.${n} is UNSAFE be sure you know what you are doing`),jt[n]},set(e){if(M.log.warn(`using Vhs.${n} is UNSAFE be sure you know what you are doing`),typeof e!="number"||e<0){M.log.warn(`value of Vhs.${n} must be greater than or equal to 0`);return}jt[n]=e}})});const Ed="videojs-vhs",Td=function(n,e){const t=e.media();let i=-1;for(let s=0;s<n.length;s++)if(n[s].id===t.id){i=s;break}n.selectedIndex_=i,n.trigger({selectedIndex:i,type:"change"})},d0=function(n,e){e.representations().forEach(t=>{n.addQualityLevel(t)}),Td(n,e.playlists)};ht.canPlaySource=function(){return M.log.warn("VHS is no longer a tech. Please remove it from your player's techOrder.")};const h0=(n,e,t)=>{if(!n)return n;let i={};e&&e.attributes&&e.attributes.CODECS&&(i=Rr(Ie(e.attributes.CODECS))),t&&t.attributes&&t.attributes.CODECS&&(i.audio=t.attributes.CODECS);const s=bt(i.video),r=bt(i.audio),a={};for(const l in n)a[l]={},r&&(a[l].audioContentType=r),s&&(a[l].videoContentType=s),e.contentProtection&&e.contentProtection[l]&&e.contentProtection[l].pssh&&(a[l].pssh=e.contentProtection[l].pssh),typeof n[l]=="string"&&(a[l].url=n[l]);return Ge(n,a)},f0=(n,e)=>n.reduce((t,i)=>{if(!i.contentProtection)return t;const s=e.reduce((r,a)=>{const l=i.contentProtection[a];return l&&l.pssh&&(r[a]={pssh:l.pssh}),r},{});return Object.keys(s).length&&t.push(s),t},[]),p0=({player:n,sourceKeySystems:e,audioMedia:t,mainPlaylists:i})=>{if(!n.eme.initializeMediaKeys)return Promise.resolve();const s=t?i.concat([t]):i,r=f0(s,Object.keys(e)),a=[],l=[];return r.forEach(h=>{l.push(new Promise((p,g)=>{n.tech_.one("keysessioncreated",p)})),a.push(new Promise((p,g)=>{n.eme.initializeMediaKeys({keySystems:h},_=>{if(_){g(_);return}p()})}))}),Promise.race([Promise.all(a),Promise.race(l)])},m0=({player:n,sourceKeySystems:e,media:t,audioMedia:i})=>{const s=h0(e,t,i);return s?(n.currentSource().keySystems=s,s&&!n.eme?(M.log.warn("DRM encrypted source cannot be decrypted without a DRM plugin"),!1):!0):!1},Cd=()=>{if(!A().localStorage)return null;const n=A().localStorage.getItem(Ed);if(!n)return null;try{return JSON.parse(n)}catch(e){return null}},g0=n=>{if(!A().localStorage)return!1;let e=Cd();e=e?Ge(e,n):n;try{A().localStorage.setItem(Ed,JSON.stringify(e))}catch(t){return!1}return e},v0=n=>n.toLowerCase().indexOf("data:application/vnd.videojs.vhs+json,")===0?JSON.parse(n.substring(n.indexOf(",")+1)):n,xd=(n,e)=>{n._requestCallbackSet||(n._requestCallbackSet=new Set),n._requestCallbackSet.add(e)},Sd=(n,e)=>{n._responseCallbackSet||(n._responseCallbackSet=new Set),n._responseCallbackSet.add(e)},jd=(n,e)=>{n._requestCallbackSet&&(n._requestCallbackSet.delete(e),n._requestCallbackSet.size||delete n._requestCallbackSet)},Bd=(n,e)=>{n._responseCallbackSet&&(n._responseCallbackSet.delete(e),n._responseCallbackSet.size||delete n._responseCallbackSet)};ht.supportsNativeHls=function(){if(!O()||!O().createElement)return!1;const n=O().createElement("video");return M.getTech("Html5").isSupported()?["application/vnd.apple.mpegurl","audio/mpegurl","audio/x-mpegurl","application/x-mpegurl","video/x-mpegurl","video/mpegurl","application/mpegurl"].some(function(t){return/maybe|probably/i.test(n.canPlayType(t))}):!1}(),ht.supportsNativeDash=function(){return!O()||!O().createElement||!M.getTech("Html5").isSupported()?!1:/maybe|probably/i.test(O().createElement("video").canPlayType("application/dash+xml"))}(),ht.supportsTypeNatively=n=>n==="hls"?ht.supportsNativeHls:n==="dash"?ht.supportsNativeDash:!1,ht.isSupported=function(){return M.log.warn("VHS is no longer a tech. Please remove it from your player's techOrder.")},ht.xhr.onRequest=function(n){xd(ht.xhr,n)},ht.xhr.onResponse=function(n){Sd(ht.xhr,n)},ht.xhr.offRequest=function(n){jd(ht.xhr,n)},ht.xhr.offResponse=function(n){Bd(ht.xhr,n)};const A0=M.getComponent("Component");class wd extends A0{constructor(e,t,i){if(super(t,i.vhs),typeof i.initialBandwidth=="number"&&(this.options_.bandwidth=i.initialBandwidth),this.logger_=si("VhsHandler"),t.options_&&t.options_.playerId){const s=M.getPlayer(t.options_.playerId);this.player_=s}if(this.tech_=t,this.source_=e,this.stats={},this.ignoreNextSeekingEvent_=!1,this.setOptions_(),this.options_.overrideNative&&t.overrideNativeAudioTracks&&t.overrideNativeVideoTracks)t.overrideNativeAudioTracks(!0),t.overrideNativeVideoTracks(!0);else if(this.options_.overrideNative&&(t.featuresNativeVideoTracks||t.featuresNativeAudioTracks))throw new Error("Overriding native VHS requires emulated tracks. See https://git.io/vMpjB");this.on(O(),["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","MSFullscreenChange"],s=>{const r=O().fullscreenElement||O().webkitFullscreenElement||O().mozFullScreenElement||O().msFullscreenElement;r&&r.contains(this.tech_.el())?this.playlistController_.fastQualityChange_():this.playlistController_.checkABR_()}),this.on(this.tech_,"seeking",function(){if(this.ignoreNextSeekingEvent_){this.ignoreNextSeekingEvent_=!1;return}this.setCurrentTime(this.tech_.currentTime())}),this.on(this.tech_,"error",function(){this.tech_.error()&&this.playlistController_&&this.playlistController_.pauseLoading()}),this.on(this.tech_,"play",this.play)}setOptions_(e={}){if(this.options_=Ge(this.options_,e),this.options_.withCredentials=this.options_.withCredentials||!1,this.options_.limitRenditionByPlayerDimensions=this.options_.limitRenditionByPlayerDimensions!==!1,this.options_.useDevicePixelRatio=this.options_.useDevicePixelRatio||!1,this.options_.useBandwidthFromLocalStorage=typeof this.source_.useBandwidthFromLocalStorage!="undefined"?this.source_.useBandwidthFromLocalStorage:this.options_.useBandwidthFromLocalStorage||!1,this.options_.useForcedSubtitles=this.options_.useForcedSubtitles||!1,this.options_.useNetworkInformationApi=this.options_.useNetworkInformationApi||!1,this.options_.useDtsForTimestampOffset=this.options_.useDtsForTimestampOffset||!1,this.options_.customTagParsers=this.options_.customTagParsers||[],this.options_.customTagMappers=this.options_.customTagMappers||[],this.options_.cacheEncryptionKeys=this.options_.cacheEncryptionKeys||!1,this.options_.llhls=this.options_.llhls!==!1,this.options_.bufferBasedABR=this.options_.bufferBasedABR||!1,typeof this.options_.playlistExclusionDuration!="number"&&(this.options_.playlistExclusionDuration=60),typeof this.options_.bandwidth!="number"&&this.options_.useBandwidthFromLocalStorage){const i=Cd();i&&i.bandwidth&&(this.options_.bandwidth=i.bandwidth,this.tech_.trigger({type:"usage",name:"vhs-bandwidth-from-local-storage"})),i&&i.throughput&&(this.options_.throughput=i.throughput,this.tech_.trigger({type:"usage",name:"vhs-throughput-from-local-storage"}))}typeof this.options_.bandwidth!="number"&&(this.options_.bandwidth=jt.INITIAL_BANDWIDTH),this.options_.enableLowInitialPlaylist=this.options_.enableLowInitialPlaylist&&this.options_.bandwidth===jt.INITIAL_BANDWIDTH,["withCredentials","useDevicePixelRatio","customPixelRatio","limitRenditionByPlayerDimensions","bandwidth","customTagParsers","customTagMappers","cacheEncryptionKeys","playlistSelector","initialPlaylistSelector","bufferBasedABR","liveRangeSafeTimeDelta","llhls","useForcedSubtitles","useNetworkInformationApi","useDtsForTimestampOffset","exactManifestTimings","leastPixelDiffSelector"].forEach(i=>{typeof this.source_[i]!="undefined"&&(this.options_[i]=this.source_[i])}),this.limitRenditionByPlayerDimensions=this.options_.limitRenditionByPlayerDimensions,this.useDevicePixelRatio=this.options_.useDevicePixelRatio;const t=this.options_.customPixelRatio;typeof t=="number"&&t>=0&&(this.customPixelRatio=t)}setOptions(e={}){this.setOptions_(e)}src(e,t){if(!e)return;this.setOptions_(),this.options_.src=v0(this.source_.src),this.options_.tech=this.tech_,this.options_.externVhs=ht,this.options_.sourceType=Ct(t),this.options_.seekTo=r=>{this.tech_.setCurrentTime(r)},this.playlistController_=new e0(this.options_);const i=Ge({liveRangeSafeTimeDelta:Ti},this.options_,{seekable:()=>this.seekable(),media:()=>this.playlistController_.media(),playlistController:this.playlistController_});this.playbackWatcher_=new s0(i),this.playlistController_.on("error",()=>{const r=M.players[this.tech_.options_.playerId];let a=this.playlistController_.error;typeof a=="object"&&!a.code?a.code=3:typeof a=="string"&&(a={message:a,code:3}),r.error(a)});const s=this.options_.bufferBasedABR?ht.movingAverageBandwidthSelector(.55):ht.STANDARD_PLAYLIST_SELECTOR;this.playlistController_.selectPlaylist=this.selectPlaylist?this.selectPlaylist.bind(this):s.bind(this),this.playlistController_.selectInitialPlaylist=ht.INITIAL_PLAYLIST_SELECTOR.bind(this),this.playlists=this.playlistController_.mainPlaylistLoader_,this.mediaSource=this.playlistController_.mediaSource,Object.defineProperties(this,{selectPlaylist:{get(){return this.playlistController_.selectPlaylist},set(r){this.playlistController_.selectPlaylist=r.bind(this)}},throughput:{get(){return this.playlistController_.mainSegmentLoader_.throughput.rate},set(r){this.playlistController_.mainSegmentLoader_.throughput.rate=r,this.playlistController_.mainSegmentLoader_.throughput.count=1}},bandwidth:{get(){let r=this.playlistController_.mainSegmentLoader_.bandwidth;const a=A().navigator.connection||A().navigator.mozConnection||A().navigator.webkitConnection,l=1e7;if(this.options_.useNetworkInformationApi&&a){const h=a.downlink*1e3*1e3;h>=l&&r>=l?r=Math.max(r,h):r=h}return r},set(r){this.playlistController_.mainSegmentLoader_.bandwidth=r,this.playlistController_.mainSegmentLoader_.throughput={rate:0,count:0}}},systemBandwidth:{get(){const r=1/(this.bandwidth||1);let a;return this.throughput>0?a=1/this.throughput:a=0,Math.floor(1/(r+a))},set(){M.log.error('The "systemBandwidth" property is read-only')}}}),this.options_.bandwidth&&(this.bandwidth=this.options_.bandwidth),this.options_.throughput&&(this.throughput=this.options_.throughput),Object.defineProperties(this.stats,{bandwidth:{get:()=>this.bandwidth||0,enumerable:!0},mediaRequests:{get:()=>this.playlistController_.mediaRequests_()||0,enumerable:!0},mediaRequestsAborted:{get:()=>this.playlistController_.mediaRequestsAborted_()||0,enumerable:!0},mediaRequestsTimedout:{get:()=>this.playlistController_.mediaRequestsTimedout_()||0,enumerable:!0},mediaRequestsErrored:{get:()=>this.playlistController_.mediaRequestsErrored_()||0,enumerable:!0},mediaTransferDuration:{get:()=>this.playlistController_.mediaTransferDuration_()||0,enumerable:!0},mediaBytesTransferred:{get:()=>this.playlistController_.mediaBytesTransferred_()||0,enumerable:!0},mediaSecondsLoaded:{get:()=>this.playlistController_.mediaSecondsLoaded_()||0,enumerable:!0},mediaAppends:{get:()=>this.playlistController_.mediaAppends_()||0,enumerable:!0},mainAppendsToLoadedData:{get:()=>this.playlistController_.mainAppendsToLoadedData_()||0,enumerable:!0},audioAppendsToLoadedData:{get:()=>this.playlistController_.audioAppendsToLoadedData_()||0,enumerable:!0},appendsToLoadedData:{get:()=>this.playlistController_.appendsToLoadedData_()||0,enumerable:!0},timeToLoadedData:{get:()=>this.playlistController_.timeToLoadedData_()||0,enumerable:!0},buffered:{get:()=>dn(this.tech_.buffered()),enumerable:!0},currentTime:{get:()=>this.tech_.currentTime(),enumerable:!0},currentSource:{get:()=>this.tech_.currentSource_,enumerable:!0},currentTech:{get:()=>this.tech_.name_,enumerable:!0},duration:{get:()=>this.tech_.duration(),enumerable:!0},main:{get:()=>this.playlists.main,enumerable:!0},playerDimensions:{get:()=>this.tech_.currentDimensions(),enumerable:!0},seekable:{get:()=>dn(this.tech_.seekable()),enumerable:!0},timestamp:{get:()=>Date.now(),enumerable:!0},videoPlaybackQuality:{get:()=>this.tech_.getVideoPlaybackQuality(),enumerable:!0}}),this.tech_.one("canplay",this.playlistController_.setupFirstPlay.bind(this.playlistController_)),this.tech_.on("bandwidthupdate",()=>{this.options_.useBandwidthFromLocalStorage&&g0({bandwidth:this.bandwidth,throughput:Math.round(this.throughput)})}),this.playlistController_.on("selectedinitialmedia",()=>{n0(this)}),this.playlistController_.sourceUpdater_.on("createdsourcebuffers",()=>{this.setupEme_()}),this.on(this.playlistController_,"progress",function(){this.tech_.trigger("progress")}),this.on(this.playlistController_,"firstplay",function(){this.ignoreNextSeekingEvent_=!0}),this.setupQualityLevels_(),this.tech_.el()&&(this.mediaSourceUrl_=A().URL.createObjectURL(this.playlistController_.mediaSource),this.tech_.src(this.mediaSourceUrl_))}createKeySessions_(){const e=this.playlistController_.mediaTypes_.AUDIO.activePlaylistLoader;this.logger_("waiting for EME key session creation"),p0({player:this.player_,sourceKeySystems:this.source_.keySystems,audioMedia:e&&e.media(),mainPlaylists:this.playlists.main.playlists}).then(()=>{this.logger_("created EME key session"),this.playlistController_.sourceUpdater_.initializedEme()}).catch(t=>{this.logger_("error while creating EME key session",t),this.player_.error({message:"Failed to initialize media keys for EME",code:3,metadata:{errorType:M.Error.EMEKeySessionCreationError}})})}handleWaitingForKey_(){this.logger_("waitingforkey fired, attempting to create any new key sessions"),this.createKeySessions_()}setupEme_(){const e=this.playlistController_.mediaTypes_.AUDIO.activePlaylistLoader,t=m0({player:this.player_,sourceKeySystems:this.source_.keySystems,media:this.playlists.media(),audioMedia:e&&e.media()});if(this.player_.tech_.on("keystatuschange",i=>{this.playlistController_.updatePlaylistByKeyStatus(i.keyId,i.status)}),this.handleWaitingForKey_=this.handleWaitingForKey_.bind(this),this.player_.tech_.on("waitingforkey",this.handleWaitingForKey_),!t){this.playlistController_.sourceUpdater_.initializedEme();return}this.createKeySessions_()}setupQualityLevels_(){const e=M.players[this.tech_.options_.playerId];!e||!e.qualityLevels||this.qualityLevels_||(this.qualityLevels_=e.qualityLevels(),this.playlistController_.on("selectedinitialmedia",()=>{d0(this.qualityLevels_,this)}),this.playlists.on("mediachange",()=>{Td(this.qualityLevels_,this.playlists)}))}static version(){return{"@videojs/http-streaming":bd,"mux.js":o0,"mpd-parser":l0,"m3u8-parser":u0,"aes-decrypter":c0}}version(){return this.constructor.version()}canChangeType(){return dd.canChangeType()}play(){this.playlistController_.play()}setCurrentTime(e){this.playlistController_.setCurrentTime(e)}duration(){return this.playlistController_.duration()}seekable(){return this.playlistController_.seekable()}dispose(){this.playbackWatcher_&&this.playbackWatcher_.dispose(),this.playlistController_&&this.playlistController_.dispose(),this.qualityLevels_&&this.qualityLevels_.dispose(),this.tech_&&this.tech_.vhs&&delete this.tech_.vhs,this.mediaSourceUrl_&&A().URL.revokeObjectURL&&(A().URL.revokeObjectURL(this.mediaSourceUrl_),this.mediaSourceUrl_=null),this.tech_&&this.tech_.off("waitingforkey",this.handleWaitingForKey_),super.dispose()}convertToProgramTime(e,t){return xm({playlist:this.playlistController_.media(),time:e,callback:t})}seekToProgramTime(e,t,i=!0,s=2){return Oc({programTime:e,playlist:this.playlistController_.media(),retryCount:s,pauseAfterSeek:i,seekTo:this.options_.seekTo,tech:this.options_.tech,callback:t})}setupXhrHooks_(){this.xhr.onRequest=e=>{xd(this.xhr,e)},this.xhr.onResponse=e=>{Sd(this.xhr,e)},this.xhr.offRequest=e=>{jd(this.xhr,e)},this.xhr.offResponse=e=>{Bd(this.xhr,e)},this.player_.trigger("xhr-hooks-ready")}}const Vr={name:"videojs-http-streaming",VERSION:bd,canHandleSource(n,e={}){const t=Ge(M.options,e);return Vr.canPlayType(n.type,t)},handleSource(n,e,t={}){const i=Ge(M.options,t);return e.vhs=new wd(n,e,i),e.vhs.xhr=wc(),e.vhs.setupXhrHooks_(),e.vhs.src(n.src,n.type),e.vhs},canPlayType(n,e){const t=Ct(n);if(!t)return"";const i=Vr.getOverrideNative(e);return!ht.supportsTypeNatively(t)||i?"maybe":""},getOverrideNative(n={}){const{vhs:e={}}=n,t=!(M.browser.IS_ANY_SAFARI||M.browser.IS_IOS),{overrideNative:i=t}=e;return i}};nt("avc1.4d400d,mp4a.40.2")&&M.getTech("Html5").registerSourceHandler(Vr,0),M.VhsHandler=wd,M.VhsSourceHandler=Vr,M.Vhs=ht,M.use||M.registerComponent("Vhs",ht),M.options.vhs=M.options.vhs||{},(!M.getPlugin||!M.getPlugin("reloadSourceOnError"))&&M.registerPlugin("reloadSourceOnError",a0)},4784:function(xe,ee,z){var Y=z(9840),A=xe.exports={WebVTT:z(6311),VTTCue:z(184),VTTRegion:z(5891)};Y.vttjs=A,Y.WebVTT=A.WebVTT;var G=A.VTTCue,O=A.VTTRegion,J=Y.VTTCue,U=Y.VTTRegion;A.shim=function(){Y.VTTCue=G,Y.VTTRegion=O},A.restore=function(){Y.VTTCue=J,Y.VTTRegion=U},Y.VTTCue||A.shim()},6311:function(xe,ee,z){var Y=z(9697),A=Object.create||function(){function T(){}return function(x){if(arguments.length!==1)throw new Error("Object.create shim only accepts one parameter.");return T.prototype=x,new T}}();function G(T,x){this.name="ParsingError",this.code=T.code,this.message=x||T.message}G.prototype=A(Error.prototype),G.prototype.constructor=G,G.Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}};function O(T){function x(te,K,oe,ue){return(te|0)*3600+(K|0)*60+(oe|0)+(ue|0)/1e3}var N=T.match(/^(\d+):(\d{1,2})(:\d{1,2})?\.(\d{3})/);return N?N[3]?x(N[1],N[2],N[3].replace(":",""),N[4]):N[1]>59?x(N[1],N[2],0,N[4]):x(0,N[1],N[2],N[4]):null}function J(){this.values=A(null)}J.prototype={set:function(T,x){!this.get(T)&&x!==""&&(this.values[T]=x)},get:function(T,x,N){return N?this.has(T)?this.values[T]:x[N]:this.has(T)?this.values[T]:x},has:function(T){return T in this.values},alt:function(T,x,N){for(var te=0;te<N.length;++te)if(x===N[te]){this.set(T,x);break}},integer:function(T,x){/^-?\d+$/.test(x)&&this.set(T,parseInt(x,10))},percent:function(T,x){var N;return(N=x.match(/^([\d]{1,3})(\.[\d]*)?%$/))&&(x=parseFloat(x),x>=0&&x<=100)?(this.set(T,x),!0):!1}};function U(T,x,N,te){var K=te?T.split(te):[T];for(var oe in K)if(typeof K[oe]=="string"){var ue=K[oe].split(N);if(ue.length===2){var me=ue[0].trim(),ie=ue[1].trim();x(me,ie)}}}function de(T,x,N){var te=T;function K(){var me=O(T);if(me===null)throw new G(G.Errors.BadTimeStamp,"Malformed timestamp: "+te);return T=T.replace(/^[^\sa-zA-Z-]+/,""),me}function oe(me,ie){var re=new J;U(me,function(Z,ae){switch(Z){case"region":for(var Te=N.length-1;Te>=0;Te--)if(N[Te].id===ae){re.set(Z,N[Te].region);break}break;case"vertical":re.alt(Z,ae,["rl","lr"]);break;case"line":var Ie=ae.split(","),qe=Ie[0];re.integer(Z,qe),re.percent(Z,qe)&&re.set("snapToLines",!1),re.alt(Z,qe,["auto"]),Ie.length===2&&re.alt("lineAlign",Ie[1],["start","center","end"]);break;case"position":Ie=ae.split(","),re.percent(Z,Ie[0]),Ie.length===2&&re.alt("positionAlign",Ie[1],["start","center","end"]);break;case"size":re.percent(Z,ae);break;case"align":re.alt(Z,ae,["start","center","end","left","right"]);break}},/:/,/\s/),ie.region=re.get("region",null),ie.vertical=re.get("vertical","");try{ie.line=re.get("line","auto")}catch(Z){}ie.lineAlign=re.get("lineAlign","start"),ie.snapToLines=re.get("snapToLines",!0),ie.size=re.get("size",100);try{ie.align=re.get("align","center")}catch(Z){ie.align=re.get("align","middle")}try{ie.position=re.get("position","auto")}catch(Z){ie.position=re.get("position",{start:0,left:0,center:50,middle:50,end:100,right:100},ie.align)}ie.positionAlign=re.get("positionAlign",{start:"start",left:"start",center:"center",middle:"center",end:"end",right:"end"},ie.align)}function ue(){T=T.replace(/^\s+/,"")}if(ue(),x.startTime=K(),ue(),T.substr(0,3)!=="-->")throw new G(G.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '-->'): "+te);T=T.substr(3),ue(),x.endTime=K(),ue(),oe(T,x)}var he=Y.createElement&&Y.createElement("textarea"),fe={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},se={white:"rgba(255,255,255,1)",lime:"rgba(0,255,0,1)",cyan:"rgba(0,255,255,1)",red:"rgba(255,0,0,1)",yellow:"rgba(255,255,0,1)",magenta:"rgba(255,0,255,1)",blue:"rgba(0,0,255,1)",black:"rgba(0,0,0,1)"},Pe={v:"title",lang:"lang"},Q={rt:"ruby"};function _e(T,x){function N(){if(!x)return null;function qe(je){return x=x.substr(je.length),je}var Se=x.match(/^([^<]*)(<[^>]*>?)?/);return qe(Se[1]?Se[1]:Se[2])}function te(qe){return he.innerHTML=qe,qe=he.textContent,he.textContent="",qe}function K(qe,Se){return!Q[Se.localName]||Q[Se.localName]===qe.localName}function oe(qe,Se){var je=fe[qe];if(!je)return null;var _t=T.document.createElement(je),bt=Pe[qe];return bt&&Se&&(_t[bt]=Se.trim()),_t}for(var ue=T.document.createElement("div"),me=ue,ie,re=[];(ie=N())!==null;){if(ie[0]==="<"){if(ie[1]==="/"){re.length&&re[re.length-1]===ie.substr(2).replace(">","")&&(re.pop(),me=me.parentNode);continue}var Z=O(ie.substr(1,ie.length-2)),ae;if(Z){ae=T.document.createProcessingInstruction("timestamp",Z),me.appendChild(ae);continue}var Te=ie.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);if(!Te||(ae=oe(Te[1],Te[3]),!ae)||!K(me,ae))continue;if(Te[2]){var Ie=Te[2].split(".");Ie.forEach(function(qe){var Se=/^bg_/.test(qe),je=Se?qe.slice(3):qe;if(se.hasOwnProperty(je)){var _t=Se?"background-color":"color",bt=se[je];ae.style[_t]=bt}}),ae.className=Ie.join(" ")}re.push(Te[1]),me.appendChild(ae),me=ae;continue}me.appendChild(T.document.createTextNode(te(ie)))}return ue}var be=[[1470,1470],[1472,1472],[1475,1475],[1478,1478],[1488,1514],[1520,1524],[1544,1544],[1547,1547],[1549,1549],[1563,1563],[1566,1610],[1645,1647],[1649,1749],[1765,1766],[1774,1775],[1786,1805],[1807,1808],[1810,1839],[1869,1957],[1969,1969],[1984,2026],[2036,2037],[2042,2042],[2048,2069],[2074,2074],[2084,2084],[2088,2088],[2096,2110],[2112,2136],[2142,2142],[2208,2208],[2210,2220],[8207,8207],[64285,64285],[64287,64296],[64298,64310],[64312,64316],[64318,64318],[64320,64321],[64323,64324],[64326,64449],[64467,64829],[64848,64911],[64914,64967],[65008,65020],[65136,65140],[65142,65276],[67584,67589],[67592,67592],[67594,67637],[67639,67640],[67644,67644],[67647,67669],[67671,67679],[67840,67867],[67872,67897],[67903,67903],[67968,68023],[68030,68031],[68096,68096],[68112,68115],[68117,68119],[68121,68147],[68160,68167],[68176,68184],[68192,68223],[68352,68405],[68416,68437],[68440,68466],[68472,68479],[68608,68680],[126464,126467],[126469,126495],[126497,126498],[126500,126500],[126503,126503],[126505,126514],[126516,126519],[126521,126521],[126523,126523],[126530,126530],[126535,126535],[126537,126537],[126539,126539],[126541,126543],[126545,126546],[126548,126548],[126551,126551],[126553,126553],[126555,126555],[126557,126557],[126559,126559],[126561,126562],[126564,126564],[126567,126570],[126572,126578],[126580,126583],[126585,126588],[126590,126590],[126592,126601],[126603,126619],[126625,126627],[126629,126633],[126635,126651],[1114109,1114109]];function We(T){for(var x=0;x<be.length;x++){var N=be[x];if(T>=N[0]&&T<=N[1])return!0}return!1}function vt(T){var x=[],N="",te;if(!T||!T.childNodes)return"ltr";function K(me,ie){for(var re=ie.childNodes.length-1;re>=0;re--)me.push(ie.childNodes[re])}function oe(me){if(!me||!me.length)return null;var ie=me.pop(),re=ie.textContent||ie.innerText;if(re){var Z=re.match(/^.*(\n|\r)/);return Z?(me.length=0,Z[0]):re}if(ie.tagName==="ruby")return oe(me);if(ie.childNodes)return K(me,ie),oe(me)}for(K(x,T);N=oe(x);)for(var ue=0;ue<N.length;ue++)if(te=N.charCodeAt(ue),We(te))return"rtl";return"ltr"}function et(T){if(typeof T.line=="number"&&(T.snapToLines||T.line>=0&&T.line<=100))return T.line;if(!T.track||!T.track.textTrackList||!T.track.textTrackList.mediaElement)return-1;for(var x=T.track,N=x.textTrackList,te=0,K=0;K<N.length&&N[K]!==x;K++)N[K].mode==="showing"&&te++;return++te*-1}function ne(){}ne.prototype.applyStyles=function(T,x){x=x||this.div;for(var N in T)T.hasOwnProperty(N)&&(x.style[N]=T[N])},ne.prototype.formatStyle=function(T,x){return T===0?0:T+x};function ge(T,x,N){ne.call(this),this.cue=x,this.cueDiv=_e(T,x.text);var te={color:"rgba(255, 255, 255, 1)",backgroundColor:"rgba(0, 0, 0, 0.8)",position:"relative",left:0,right:0,top:0,bottom:0,display:"inline",writingMode:x.vertical===""?"horizontal-tb":x.vertical==="lr"?"vertical-lr":"vertical-rl",unicodeBidi:"plaintext"};this.applyStyles(te,this.cueDiv),this.div=T.document.createElement("div"),te={direction:vt(this.cueDiv),writingMode:x.vertical===""?"horizontal-tb":x.vertical==="lr"?"vertical-lr":"vertical-rl",unicodeBidi:"plaintext",textAlign:x.align==="middle"?"center":x.align,font:N.font,whiteSpace:"pre-line",position:"absolute"},this.applyStyles(te),this.div.appendChild(this.cueDiv);var K=0;switch(x.positionAlign){case"start":case"line-left":K=x.position;break;case"center":K=x.position-x.size/2;break;case"end":case"line-right":K=x.position-x.size;break}x.vertical===""?this.applyStyles({left:this.formatStyle(K,"%"),width:this.formatStyle(x.size,"%")}):this.applyStyles({top:this.formatStyle(K,"%"),height:this.formatStyle(x.size,"%")}),this.move=function(oe){this.applyStyles({top:this.formatStyle(oe.top,"px"),bottom:this.formatStyle(oe.bottom,"px"),left:this.formatStyle(oe.left,"px"),right:this.formatStyle(oe.right,"px"),height:this.formatStyle(oe.height,"px"),width:this.formatStyle(oe.width,"px")})}}ge.prototype=A(ne.prototype),ge.prototype.constructor=ge;function Ce(T){var x,N,te,K;if(T.div){N=T.div.offsetHeight,te=T.div.offsetWidth,K=T.div.offsetTop;var oe=(oe=T.div.childNodes)&&(oe=oe[0])&&oe.getClientRects&&oe.getClientRects();T=T.div.getBoundingClientRect(),x=oe?Math.max(oe[0]&&oe[0].height||0,T.height/oe.length):0}this.left=T.left,this.right=T.right,this.top=T.top||K,this.height=T.height||N,this.bottom=T.bottom||K+(T.height||N),this.width=T.width||te,this.lineHeight=x!==void 0?x:T.lineHeight}Ce.prototype.move=function(T,x){switch(x=x!==void 0?x:this.lineHeight,T){case"+x":this.left+=x,this.right+=x;break;case"-x":this.left-=x,this.right-=x;break;case"+y":this.top+=x,this.bottom+=x;break;case"-y":this.top-=x,this.bottom-=x;break}},Ce.prototype.overlaps=function(T){return this.left<T.right&&this.right>T.left&&this.top<T.bottom&&this.bottom>T.top},Ce.prototype.overlapsAny=function(T){for(var x=0;x<T.length;x++)if(this.overlaps(T[x]))return!0;return!1},Ce.prototype.within=function(T){return this.top>=T.top&&this.bottom<=T.bottom&&this.left>=T.left&&this.right<=T.right},Ce.prototype.overlapsOppositeAxis=function(T,x){switch(x){case"+x":return this.left<T.left;case"-x":return this.right>T.right;case"+y":return this.top<T.top;case"-y":return this.bottom>T.bottom}},Ce.prototype.intersectPercentage=function(T){var x=Math.max(0,Math.min(this.right,T.right)-Math.max(this.left,T.left)),N=Math.max(0,Math.min(this.bottom,T.bottom)-Math.max(this.top,T.top)),te=x*N;return te/(this.height*this.width)},Ce.prototype.toCSSCompatValues=function(T){return{top:this.top-T.top,bottom:T.bottom-this.bottom,left:this.left-T.left,right:T.right-this.right,height:this.height,width:this.width}},Ce.getSimpleBoxPosition=function(T){var x=T.div?T.div.offsetHeight:T.tagName?T.offsetHeight:0,N=T.div?T.div.offsetWidth:T.tagName?T.offsetWidth:0,te=T.div?T.div.offsetTop:T.tagName?T.offsetTop:0;T=T.div?T.div.getBoundingClientRect():T.tagName?T.getBoundingClientRect():T;var K={left:T.left,right:T.right,top:T.top||te,height:T.height||x,bottom:T.bottom||te+(T.height||x),width:T.width||N};return K};function Oe(T,x,N,te){function K(je,_t){for(var bt,nt=new Ce(je),Tt=1,Ut=0;Ut<_t.length;Ut++){for(;je.overlapsOppositeAxis(N,_t[Ut])||je.within(N)&&je.overlapsAny(te);)je.move(_t[Ut]);if(je.within(N))return je;var fi=je.intersectPercentage(N);Tt>fi&&(bt=new Ce(je),Tt=fi),je=new Ce(nt)}return bt||nt}var oe=new Ce(x),ue=x.cue,me=et(ue),ie=[];if(ue.snapToLines){var re;switch(ue.vertical){case"":ie=["+y","-y"],re="height";break;case"rl":ie=["+x","-x"],re="width";break;case"lr":ie=["-x","+x"],re="width";break}var Z=oe.lineHeight,ae=Z*Math.round(me),Te=N[re]+Z,Ie=ie[0];Math.abs(ae)>Te&&(ae=ae<0?-1:1,ae*=Math.ceil(Te/Z)*Z),me<0&&(ae+=ue.vertical===""?N.height:N.width,ie=ie.reverse()),oe.move(Ie,ae)}else{var qe=oe.lineHeight/N.height*100;switch(ue.lineAlign){case"center":me-=qe/2;break;case"end":me-=qe;break}switch(ue.vertical){case"":x.applyStyles({top:x.formatStyle(me,"%")});break;case"rl":x.applyStyles({left:x.formatStyle(me,"%")});break;case"lr":x.applyStyles({right:x.formatStyle(me,"%")});break}ie=["+y","-x","+x","-y"],oe=new Ce(x)}var Se=K(oe,ie);x.move(Se.toCSSCompatValues(N))}function ve(){}ve.StringDecoder=function(){return{decode:function(T){if(!T)return"";if(typeof T!="string")throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(T))}}},ve.convertCueToDOMTree=function(T,x){return!T||!x?null:_e(T,x)};var Ue=.05,Ne="sans-serif",we="1.5%";ve.processCues=function(T,x,N){if(!T||!x||!N)return null;for(;N.firstChild;)N.removeChild(N.firstChild);var te=T.document.createElement("div");te.style.position="absolute",te.style.left="0",te.style.right="0",te.style.top="0",te.style.bottom="0",te.style.margin=we,N.appendChild(te);function K(Z){for(var ae=0;ae<Z.length;ae++)if(Z[ae].hasBeenReset||!Z[ae].displayState)return!0;return!1}if(!K(x)){for(var oe=0;oe<x.length;oe++)te.appendChild(x[oe].displayState);return}var ue=[],me=Ce.getSimpleBoxPosition(te),ie=Math.round(me.height*Ue*100)/100,re={font:ie+"px "+Ne};(function(){for(var Z,ae,Te=0;Te<x.length;Te++)ae=x[Te],Z=new ge(T,ae,re),te.appendChild(Z.div),Oe(T,Z,me,ue),ae.displayState=Z.div,ue.push(Ce.getSimpleBoxPosition(Z))})()},ve.Parser=function(T,x,N){N||(N=x,x={}),x||(x={}),this.window=T,this.vttjs=x,this.state="INITIAL",this.buffer="",this.decoder=N||new TextDecoder("utf8"),this.regionList=[]},ve.Parser.prototype={reportOrThrowError:function(T){if(T instanceof G)this.onparsingerror&&this.onparsingerror(T);else throw T},parse:function(T){var x=this;T&&(x.buffer+=x.decoder.decode(T,{stream:!0}));function N(){for(var Z=x.buffer,ae=0;ae<Z.length&&Z[ae]!=="\r"&&Z[ae]!==`
`;)++ae;var Te=Z.substr(0,ae);return Z[ae]==="\r"&&++ae,Z[ae]===`
`&&++ae,x.buffer=Z.substr(ae),Te}function te(Z){var ae=new J;if(U(Z,function(Ie,qe){switch(Ie){case"id":ae.set(Ie,qe);break;case"width":ae.percent(Ie,qe);break;case"lines":ae.integer(Ie,qe);break;case"regionanchor":case"viewportanchor":var Se=qe.split(",");if(Se.length!==2)break;var je=new J;if(je.percent("x",Se[0]),je.percent("y",Se[1]),!je.has("x")||!je.has("y"))break;ae.set(Ie+"X",je.get("x")),ae.set(Ie+"Y",je.get("y"));break;case"scroll":ae.alt(Ie,qe,["up"]);break}},/=/,/\s/),ae.has("id")){var Te=new(x.vttjs.VTTRegion||x.window.VTTRegion);Te.width=ae.get("width",100),Te.lines=ae.get("lines",3),Te.regionAnchorX=ae.get("regionanchorX",0),Te.regionAnchorY=ae.get("regionanchorY",100),Te.viewportAnchorX=ae.get("viewportanchorX",0),Te.viewportAnchorY=ae.get("viewportanchorY",100),Te.scroll=ae.get("scroll",""),x.onregion&&x.onregion(Te),x.regionList.push({id:ae.get("id"),region:Te})}}function K(Z){var ae=new J;U(Z,function(Te,Ie){switch(Te){case"MPEGT":ae.integer(Te+"S",Ie);break;case"LOCA":ae.set(Te+"L",O(Ie));break}},/[^\d]:/,/,/),x.ontimestampmap&&x.ontimestampmap({MPEGTS:ae.get("MPEGTS"),LOCAL:ae.get("LOCAL")})}function oe(Z){Z.match(/X-TIMESTAMP-MAP/)?U(Z,function(ae,Te){switch(ae){case"X-TIMESTAMP-MAP":K(Te);break}},/=/):U(Z,function(ae,Te){switch(ae){case"Region":te(Te);break}},/:/)}try{var ue;if(x.state==="INITIAL"){if(!/\r\n|\n/.test(x.buffer))return this;ue=N();var me=ue.match(/^WEBVTT([ \t].*)?$/);if(!me||!me[0])throw new G(G.Errors.BadSignature);x.state="HEADER"}for(var ie=!1;x.buffer;){if(!/\r\n|\n/.test(x.buffer))return this;switch(ie?ie=!1:ue=N(),x.state){case"HEADER":/:/.test(ue)?oe(ue):ue||(x.state="ID");continue;case"NOTE":ue||(x.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(ue)){x.state="NOTE";break}if(!ue)continue;x.cue=new(x.vttjs.VTTCue||x.window.VTTCue)(0,0,"");try{x.cue.align="center"}catch(Z){x.cue.align="middle"}if(x.state="CUE",ue.indexOf("-->")===-1){x.cue.id=ue;continue}case"CUE":try{de(ue,x.cue,x.regionList)}catch(Z){x.reportOrThrowError(Z),x.cue=null,x.state="BADCUE";continue}x.state="CUETEXT";continue;case"CUETEXT":var re=ue.indexOf("-->")!==-1;if(!ue||re&&(ie=!0)){x.oncue&&x.oncue(x.cue),x.cue=null,x.state="ID";continue}x.cue.text&&(x.cue.text+=`
`),x.cue.text+=ue.replace(/\u2028/g,`
`).replace(/u2029/g,`
`);continue;case"BADCUE":ue||(x.state="ID");continue}}}catch(Z){x.reportOrThrowError(Z),x.state==="CUETEXT"&&x.cue&&x.oncue&&x.oncue(x.cue),x.cue=null,x.state=x.state==="INITIAL"?"BADWEBVTT":"BADCUE"}return this},flush:function(){var T=this;try{if(T.buffer+=T.decoder.decode(),(T.cue||T.state==="HEADER")&&(T.buffer+=`

`,T.parse()),T.state==="INITIAL")throw new G(G.Errors.BadSignature)}catch(x){T.reportOrThrowError(x)}return T.onflush&&T.onflush(),this}},xe.exports=ve},184:function(xe){var ee="auto",z={"":1,lr:1,rl:1},Y={start:1,center:1,end:1,left:1,right:1,auto:1,"line-left":1,"line-right":1};function A(J){if(typeof J!="string")return!1;var U=z[J.toLowerCase()];return U?J.toLowerCase():!1}function G(J){if(typeof J!="string")return!1;var U=Y[J.toLowerCase()];return U?J.toLowerCase():!1}function O(J,U,de){this.hasBeenReset=!1;var he="",fe=!1,se=J,Pe=U,Q=de,_e=null,be="",We=!0,vt="auto",et="start",ne="auto",ge="auto",Ce=100,Oe="center";Object.defineProperties(this,{id:{enumerable:!0,get:function(){return he},set:function(ve){he=""+ve}},pauseOnExit:{enumerable:!0,get:function(){return fe},set:function(ve){fe=!!ve}},startTime:{enumerable:!0,get:function(){return se},set:function(ve){if(typeof ve!="number")throw new TypeError("Start time must be set to a number.");se=ve,this.hasBeenReset=!0}},endTime:{enumerable:!0,get:function(){return Pe},set:function(ve){if(typeof ve!="number")throw new TypeError("End time must be set to a number.");Pe=ve,this.hasBeenReset=!0}},text:{enumerable:!0,get:function(){return Q},set:function(ve){Q=""+ve,this.hasBeenReset=!0}},region:{enumerable:!0,get:function(){return _e},set:function(ve){_e=ve,this.hasBeenReset=!0}},vertical:{enumerable:!0,get:function(){return be},set:function(ve){var Ue=A(ve);if(Ue===!1)throw new SyntaxError("Vertical: an invalid or illegal direction string was specified.");be=Ue,this.hasBeenReset=!0}},snapToLines:{enumerable:!0,get:function(){return We},set:function(ve){We=!!ve,this.hasBeenReset=!0}},line:{enumerable:!0,get:function(){return vt},set:function(ve){if(typeof ve!="number"&&ve!==ee)throw new SyntaxError("Line: an invalid number or illegal string was specified.");vt=ve,this.hasBeenReset=!0}},lineAlign:{enumerable:!0,get:function(){return et},set:function(ve){var Ue=G(ve);Ue?(et=Ue,this.hasBeenReset=!0):console.warn("lineAlign: an invalid or illegal string was specified.")}},position:{enumerable:!0,get:function(){return ne},set:function(ve){if(ve<0||ve>100)throw new Error("Position must be between 0 and 100.");ne=ve,this.hasBeenReset=!0}},positionAlign:{enumerable:!0,get:function(){return ge},set:function(ve){var Ue=G(ve);Ue?(ge=Ue,this.hasBeenReset=!0):console.warn("positionAlign: an invalid or illegal string was specified.")}},size:{enumerable:!0,get:function(){return Ce},set:function(ve){if(ve<0||ve>100)throw new Error("Size must be between 0 and 100.");Ce=ve,this.hasBeenReset=!0}},align:{enumerable:!0,get:function(){return Oe},set:function(ve){var Ue=G(ve);if(!Ue)throw new SyntaxError("align: an invalid or illegal alignment string was specified.");Oe=Ue,this.hasBeenReset=!0}}}),this.displayState=void 0}O.prototype.getCueAsHTML=function(){return WebVTT.convertCueToDOMTree(window,this.text)},xe.exports=O},5891:function(xe){var ee={"":!0,up:!0};function z(G){if(typeof G!="string")return!1;var O=ee[G.toLowerCase()];return O?G.toLowerCase():!1}function Y(G){return typeof G=="number"&&G>=0&&G<=100}function A(){var G=100,O=3,J=0,U=100,de=0,he=100,fe="";Object.defineProperties(this,{width:{enumerable:!0,get:function(){return G},set:function(se){if(!Y(se))throw new Error("Width must be between 0 and 100.");G=se}},lines:{enumerable:!0,get:function(){return O},set:function(se){if(typeof se!="number")throw new TypeError("Lines must be set to a number.");O=se}},regionAnchorY:{enumerable:!0,get:function(){return U},set:function(se){if(!Y(se))throw new Error("RegionAnchorX must be between 0 and 100.");U=se}},regionAnchorX:{enumerable:!0,get:function(){return J},set:function(se){if(!Y(se))throw new Error("RegionAnchorY must be between 0 and 100.");J=se}},viewportAnchorY:{enumerable:!0,get:function(){return he},set:function(se){if(!Y(se))throw new Error("ViewportAnchorY must be between 0 and 100.");he=se}},viewportAnchorX:{enumerable:!0,get:function(){return de},set:function(se){if(!Y(se))throw new Error("ViewportAnchorX must be between 0 and 100.");de=se}},scroll:{enumerable:!0,get:function(){return fe},set:function(se){var Pe=z(se);Pe===!1?console.warn("Scroll: an invalid or illegal string was specified."):fe=Pe}}})}xe.exports=A},2141:function(xe){"use strict";xe.exports="data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAABUgAAsAAAAAItAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAAPgAAAFZRiV33Y21hcAAAAYQAAAEJAAAD5p42+VxnbHlmAAACkAAADwwAABdk9R/WHmhlYWQAABGcAAAAKwAAADYn8kSnaGhlYQAAEcgAAAAdAAAAJA+RCL1obXR4AAAR6AAAABMAAAC8Q44AAGxvY2EAABH8AAAAYAAAAGB7SIHGbWF4cAAAElwAAAAfAAAAIAFAAI9uYW1lAAASfAAAASUAAAIK1cf1oHBvc3QAABOkAAABfAAAAnXdFqh1eJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGR7xDiBgZWBgaWQ5RkDA8MvCM0cwxDOeI6BgYmBlZkBKwhIc01hcPjI+FGPHcRdyA4RZgQRADbZCycAAHic7dPXbcMwAEXRK1vuvffem749XAbKV3bjBA6fXsaIgMMLEWoQJaAEFKNnlELyQ4K27zib5PNF6vl8yld+TKr5kH0+cUw0xv00Hwvx2DResUyFKrV4XoMmLdp06NKjz4AhI8ZMmDJjzoIlK9Zs2LJjz4EjJ85cuHLjziPe/0UWL17mf2tqKLz/9jK9f8tXpGCoRdPKhtS0RqFkWvVQNtSKoVYNtWaoddPXEBqG2jQ9XWgZattQO4baNdSeofYNdWCoQ0MdGerYUCeGOjXUmaHODXVhqEtDXRnq2lA3hro11J2h7g31YKhHQz0Z6tlQL4Z6NdSbod4N9WGoT9MfHF6GmhnZLxyDcRMAAAB4nJ1YC1gUV5auc6urCmxEGrq6VRD6ATQP5dHPKK8GRIyoKApoEBUDAiGzGmdUfKNRM4qLZrUZdGKcGN/GZJKd0SyOWTbfbmZ2NxqzM5IxRtNZd78vwYlJdtREoO7sudVNq6PmmxmKqrqPU+eee173P80Bh39Cu9DOEY4DHZBK3i20D/QRLcfxbE5sEVtwLpZzclw4ibFIkSCJUcZ4MBpMnnzwuKNsGWBL5i3qy6kO2dVpvUpKbkAP9fq62rdeGJ+TM/7C1nbIutfuWrWk5ci4zMxxR1qW/N+9JsmCGXj9VKWhFx/6tr/nz78INDm2C9yPF/fDcxLuyKxLBZ1ZBz2QTi+RSkiH5RrDQJ/GgGQadX9m0YSURs7GpSG905Zsk41uj14yul1OtieZ7QUk5GRG/YiS7PYYPSAZNRed9sq3+bOpz00rKb7pe/ZEZvbALxZAHT3AFoH8GXP3rt67QFn40kt8W13FjLTDb48c+fSi5/7h0P4dL5yz7DPtbmgmYxfQA9RL2+EOfTcvdp+1vmuBpvOll1As1S6ak0IvJzC7sKWJFtJgBd2uWcg+0Zyg7dzQfhcjXRgXGZRf5/a4A58IDU777Nl252AUk4m2ByRRjqTNqIDCEJeAnU3iCFwrkrNwXEzg4yFevBwypzxkcX+AIfk3VEKl3XmWbT8788SzvpvFJaiOezL6QyuSr9VNf97csNu0z3LuhR0wATUxZAfVBwVOy+nQFhxYdWaXlXe4HC4zWGWzzsrLDtmhI9pOWOHv7PTT7XybH1Z0+v2d5Abd3kmG+TsH23CS/KwTxx/JkzEwx6jcQOUc42LLwHJ/J93uZ9ygh3HuZGwqsY9dWDHQ58dxNqyqKRQTYdxwTubiOSs3FiMDkq0WSZQgCT0GBDOg2lxOAd1FlPVGs4AKBAcYHHaP2wPkHaivmLF5zYqnIZrvcHx5gN4k/6tchNW1DtdgNL2KrxEkS/kfnIHoVnp1VjmjpTf5r0lTzLj0mdS28tX+XGorU364eMPmnWVl8J36nlKGw3CZhjEiuMw8h8mKvhGD+4/lElBWjAhLJMg6fTw4zPZ8cOmcGQBm2Qxml1nAm13CpYGq1JKUlJJUzQn1PTAO0mgv6VMMpA/DuRfSWEu4lDIxdbAtdWIKvnn2Vk766CWfz9fpY0sH/UpdP50rfszaVpdVRmvIejEdLMk45s4Bu0EWHjeOySmFyZSiMahvZdNSn29peoI/YexYfKQTLeurTXXwEVLeSfInTWHkkMaeUx7sBvOCSTSj3AlcKjfueyS36tCrXDlgRtF0etFq9jhc1kfKuBT/OwMr0F4UUTTh1AN0g20+H/ScPcsIEsYu9d/zN5PmjprPtNwI1ZZcDK6iC97Mcjp2y2aX36f+QbpGHrgRuHlXJ+Zf6PFRL2uQSp8vxHeF2IoRb8Rd2rhMzsNxSRmEuKK4JFnkojhMcx6jzqHzGMGFcW+MhBj0bhf6cowN+45I4LHvwT6fteu7M42wGRI/pxcg6/MZdEvt1U1XaulHFXuLmqov/MukvRVL35/b3ODM1+4aPjtzeK7zmUkV2h3DN54HaQ9GzJvxHRb6Ks2gB81fwqraT+A7GvZJrRLRofU6G0urNL+zFw3v0FaVDFxsKEZW56F31r6ip6vOL+FCObBPuIMRiXld9RaMdLzRIOGhPey2T9vA/35DmZPK9IWaT9d/WgOGMieYqJ/dzjLIhZU118gbysxrNUGefxD6UO/hyNNllpFTOIbx32kSFQctnweV5PxTMHLjRqiAN+fQE9gL+Xy5WB6MOS4GJJuYbDUHhcKDhHGRbLzOpjsjdM1+iwAZLGeieehACX2hhI7SjK/ZUTNrvVje31TxJiFBGYViWFkCn9PMeX9fS6qVbzfCj4fOCTzDnuWy2c4xA7mdNkA3RS9FH2VeqzdCBlixxbzXjvkHU1I8BOYFb1pZvPIHSSIj4svT8xpzcxtXN+ZKyjdDvbz08niiF3PqV9Tn5NST8vg48MTaY8E5xqSSIsWoWHo+LtAzxdH/GDUyp37CBEYfso04F/NlMTcDJUTpECLY0HFGQHImE8xsEUdgnrQlixIvGhJA1BvxpDHGxEMBYFeNOHcBJlSjwe2JcSfbBEsGOPPBHg/6SBBOCsLLw0SpUxod0Z1bFMfLkbQ3UiZxEyd0Dx8t+SRBu18Q9msFbI4e3p1THEfkSEh7kEJ5orR10qTWDvbgPWn5aWvCYyOAjwgXyjJi34uMjo58L25cmRAeQZWI2PA1QQLsPESAH8WGFwZZ4SPoR73BHPzIPMJj9AreBzKUmrH4todT18ANvi1oc3YGjUT/0j+ExUwq8PI9BLaCQIpvewwYu2evAG/Vo/5avPdY7o+BemLLXw3y+AdkzP9bpIxB1wm5EYq8fesHbPEPtm6HrHvtx4jcGPR8fDDpkZBefIjB46QnlUNRltv4Z/pO/J6dxEjhYAtmoMeq+GozvUVvNYOW3m6GCIhoprcfr97B8AcIQYsfD8ljUvGNjvkrpj0ETA48ZMIxCeqsRIsQALE0gi2GB+glSOfbOjW3GSBM9yPq8/rpJXrJDz0BPxV6xdN4uiCGDQed3WhgFkBUZEFsmeyyBpzXrm7UGTBZG8Lh5aubFufk5eUsbrrFGr7McYdbltxa0nKYqRKbQjvikXYkTGM0f2xuyM3Ly21oXnWfvf6I1BmZwfh7EWWIYsg2nHhsDhOnczhJcmI6eBAmy3jZ3RiJmKQR/JA99FcwsfaVbNDDyi1rL9NPj9hfo61wjM6BjzOLijLpeTgk/pL+ip6tfYWupzeOgPny2tcUu9J/9mhxJlgyi985NFRbvCVewXUNXLJaW0RxZqtRYtnfYdcYomXQWdnJHQA3jiEEkeTQWcWxdDP9IvvVWvo2TK553XEMEq+s69/QDU1Q7p0zxwsm9qS379whr8NI2PJqLUyGyfNeX3eFfnJU2U+uHR9cVV1IqgurqwuV44XVp0h2qN55X5XJwtk59yP0IZuHrqBOBIuIYhkcoT6Kx79Pu2HS/IPZIMOqLWs/pteOOk4NPgEb6QAIdAPsyZk5Mwd+wVaHMexJv719W7xCu2l37UG6lvYdBcvHa08p89741zd63phTRGqL5ggo6SlvdbWXzCqsPq78NnSu7wnKy2HNZbVoRCI7UJEOyRj+sPE002tOOY7Qa5fXboFWkLNeqYUSZRocp9XwSUZxcQZ9Hw6LV2pOoVmvHQEDbGIENEG5i6bLgMSM4n8+FNLTtAds99DaWEvgcf4o5SyYe9x+kF6/tGoTPAdRmS/XQIEy//QxKC2oqioAI3tS5auvxCtzT6y6RK8fhChYcwCJaMJhxc0vqSxQ/qmgsrKAlBZUHlauheTpvd9uj5DnLzJct6qfq5fXbYHVIGcfrIVJihbaVLu1wW7Vbs8zK0A8e9Jvb91S9cVMjPrazD6gpfeZTXzYbCFMcppVRsGMpp55OWgx1/3JeAxW1Y7AORgM/m3rWrsdLkQVmEVSU16cX/e7uvkvpqRiQsG06XJ0t64Tf+l0nG1dt025gyOIZlvq5u9KSU1N2TW/rsWnnMRPyTDkctbhvIcNvYIXWyLzdwYLoYesUbaQG4iK2cWO2gdpeUYLqDD0MUTOPhDIGnZEs58yArR86FznuWEsU4YDi2x26dA4klkn8Qa6vhk2QUfX4Jxm/ngX9r7ogn1dmlmwqZmuhxtdg9XN/DEcUgqb+9hMyNansfaQET2mcROCmGEMVqxm5u+h6kN2MOwgqykV2wH9yQG9DvVFU38Pogaf4FVuE62KI/oJ02RDdWW2w5dqQwU/8+N1q1DlvsL863u61KLE7x/o8w0VJQM/Y/SQ3unIrqxueEa1BqT5VFNsO7p39/UC771a77RowpaKe9nvJQIT1Pog5LGx8XblBKmCNGTf3xMogAQvPnz9PYKX/08sVDTG1OKUlOLUgS/UaZtm1NAaYTsl7i9ZQ+L6O4Rl0OGa577LuWvc+C+x96/vYh0lLBuM+7XwI/dTLtdT7v4d6rRTWDnku0IBrqFnZ5bVIqKP8lasJlithWnaLhTsr8qFJBulF/70p4undou36HeTJ5+jv1fCybeQ8nH3+Xv6aENczmOFlab+hqMDg1rLOt12A+tiUFrYDwQ6c3RUJp601nzegTNX6WlYAI2zSUV945F6zU56ZmZVQaWspWcIADxJ9GmljQUnL2p2Dpr5T8H+5KJFu+vqBq8qvyHRzStLHPEO5SPYCV9nZe0yZT2RcH0oHvegSzNEJ0oGWU8iQWM12dgPEugngVceGIwZgPFp0BiT1a0a3R5Rcot7ihfA1J/20v96jX7zmTX9s583H0kwx6WnLd09cXrR9LGroOa9sHNbdyz8wcKk5lqhaVFJZNwmqtw884MXNdvJujpBa3xzuSaZH9sxa06Z7x+HJSduPbdYHv/DgmEhfbehvlmGN7JUkcG78GDM12CeyFFTPNqVeNxC1gzjz+c2nVo63Xxs8rKJWXoBJM0tmEbfGm4qzpoOH3xpzQfyxLzW1gnE9NHo6tol1eMEic4ZVPrjnVi0kqAe2sQ2bgqupScaq8WGlUWgWHI51SKJl/UYT6zccNsCSkBtiVZLsiefuFSDYT3Fi8Zk7EUnmjTRYtsFeuDDJS05MW79M3mr3mla+d8dzac31KTPmBYfFiYSUef48PhPjm9ryZsSGZZkdNvzq0Y9rdNcwDq5Dg5C3QW+7UN64IKptvS3tvHbvu5c9pv1Exau21rc9LIpwpQwUjTq8576yeVDz5+4WZ1nXT43wV60rPLJbDp/UksNrP3iQ2SA63Pst058gOYDbhRnRUw8l/sRt4HbxPzO4WYpInCpuVgSbVh6JXuwnnJngKTTCwaPWmG5Xbhpm1U0Yt3FyBGpGYemPM77p2TD904JjgJ2QFpFLeYpGx8X15Qx1Zk31p5ki9ZLUuXE0lmuJlcakJMVLeFS1iIvrB8drY0aloilakqCZwzwRORtxlgwxS4IThggJd4TDxoiaAIT80fFPGrCPPru+puFn504P/ybr4ihA/6dKASLshEJic7xE8tmzu3KzA7TABBe8y5fNbWo3ilQn/SuFKM16b2l5bOeayqfGhYmhIulU+fVNDdWVv4NMzX10MBHyPR5uhWUu8D9P1VnIMt4nGNgZGBgAOJ/1bf64vltvjJwszOAwAOlmqvINEc/WJyDgQlEAQA+dgnjAHicY2BkYGBnAAGOPgaG//85+hkYGVCBPgBGJwNkAAAAeJxjYGBgYB/EmKMPtxwAhg4B0gAAAAAAAA4AaAB+AMwA4AECAUIBbAGYAe4CLgKKAtAC/ANiA4wDqAPgBDAEsATaBQgFWgXABggGLgZwBqwG9gdOB4oH0ggqCHAIhgicCMgJJAlWCYgJrAnyCkAKdgrkC7J4nGNgZGBg0GdoZmBnAAEmIOYCQgaG/2A+AwAaqwHQAHicXZBNaoNAGIZfE5PQCKFQ2lUps2oXBfOzzAESyDKBQJdGR2NQR3QSSE/QE/QEPUUPUHqsvsrXjTMw83zPvPMNCuAWP3DQDAejdm1GjzwS7pMmwi75XngAD4/CQ/oX4TFe4Qt7uMMbOzjuDc0EmXCP/C7cJ38Iu+RP4QEe8CU8pP8WHmOPX2EPz87TPo202ey2OjlnQSXV/6arOjWFmvszMWtd6CqwOlKHq6ovycLaWMWVydXKFFZnmVFlZU46tP7R2nI5ncbi/dDkfDtFBA2DDXbYkhKc+V0Bqs5Zt9JM1HQGBRTm/EezTmZNKtpcAMs9Yu6AK9caF76zoLWIWcfMGOSkVduvSWechqZsz040Ib2PY3urxBJTzriT95lipz+TN1fmAAAAeJxtkXlT2zAQxf1C4thJAwRajt4HRy8VMwwfSJHXsQZZcnUQ+PYoTtwpM+wf2t9brWZ2n5JBsol58nJcYYAdDDFCijEy5JhgileYYRd72MccBzjEa7zBEY5xglO8xTu8xwd8xCd8xhd8xTec4RwXuMR3/MBP/MJvMPzBFYpk2Cr+OF0fTEgrFI1aHhxN740KDbEmeJpsWZlVj40s+45aLuv9KijlhCXSjLQnu/d/4UH6sWul1mRzFxZeekUuE7z10mg3qMtM1FGQddPSrLQyvJR6OaukItYXDp6pCJrmz0umqkau5pZ2hFmm7m+ImG5W2t0kZoJXUtPhVnYTbbdOBdeCVGqpJe7XKTqSbRK7zbdwXfR0U+SVsStuS3Y76em6+Ic3xYiHUppc04Nn0lMzay3dSxNcp8auDlWlaCi48yetFD7Y9USsx87G45cuop1ZxQUtjLnL4j53FO0a+5X08UXqQ7NQNo92R0XOz7sxWEnxN2TneJI8Acttu4Q="},542:function(){},4634:function(xe){function ee(){return xe.exports=ee=Object.assign?Object.assign.bind():function(z){for(var Y=1;Y<arguments.length;Y++){var A=arguments[Y];for(var G in A)({}).hasOwnProperty.call(A,G)&&(z[G]=A[G])}return z},xe.exports.__esModule=!0,xe.exports.default=xe.exports,ee.apply(null,arguments)}xe.exports=ee,xe.exports.__esModule=!0,xe.exports.default=xe.exports}}]);

//# sourceMappingURL=676.5dd2e34b0548796e9ce9.js.map