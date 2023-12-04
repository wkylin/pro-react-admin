(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[827],{13490:function(xe,ne,z){"use strict";var J=z(58908),A=function(te,O){return O===void 0&&(O=!1),function(ce,se,fe){if(ce){te(ce);return}if(se.statusCode>=400&&se.statusCode<=599){var be=fe;if(O)if(J.TextDecoder){var ke=$(se.headers&&se.headers["content-type"]);try{be=new TextDecoder(ke).decode(fe)}catch(X){}}else be=String.fromCharCode.apply(null,new Uint8Array(fe));te({cause:be});return}te(null,fe)}};function $(I){return I===void 0&&(I=""),I.toLowerCase().split(";").reduce(function(te,O){var ce=O.split("="),se=ce[0],fe=ce[1];return se.trim()==="charset"?fe.trim():te},"utf-8")}xe.exports=A},9603:function(xe,ne,z){"use strict";var J=z(58908),A=z(10434),$=z(27376);se.httpHandler=z(13490);/**
 * @license
 * slighly modified parse-headers 2.0.2 <https://github.com/kesla/parse-headers/>
 * Copyright (c) 2014 David Björklund
 * Available under the MIT license
 * <https://github.com/kesla/parse-headers/blob/master/LICENCE>
 */var I=function(me){var ye={};return me&&me.trim().split(`
`).forEach(function(Fe){var vt=Fe.indexOf(":"),nt=Fe.slice(0,vt).trim().toLowerCase(),We=Fe.slice(vt+1).trim();typeof ye[nt]=="undefined"?ye[nt]=We:Array.isArray(ye[nt])?ye[nt].push(We):ye[nt]=[ye[nt],We]}),ye};xe.exports=se,xe.exports.default=se,se.XMLHttpRequest=J.XMLHttpRequest||ke,se.XDomainRequest="withCredentials"in new se.XMLHttpRequest?se.XMLHttpRequest:J.XDomainRequest,te(["get","put","post","patch","head","delete"],function(X){se[X==="delete"?"del":X]=function(me,ye,Fe){return ye=ce(me,ye,Fe),ye.method=X.toUpperCase(),fe(ye)}});function te(X,me){for(var ye=0;ye<X.length;ye++)me(X[ye])}function O(X){for(var me in X)if(X.hasOwnProperty(me))return!1;return!0}function ce(X,me,ye){var Fe=X;return $(me)?(ye=me,typeof X=="string"&&(Fe={uri:X})):Fe=A({},me,{uri:X}),Fe.callback=ye,Fe}function se(X,me,ye){return me=ce(X,me,ye),fe(me)}function fe(X){if(typeof X.callback=="undefined")throw new Error("callback argument missing");var me=!1,ye=function(ae,oe,ge){me||(me=!0,X.callback(ae,oe,ge))};function Fe(){G.readyState===4&&setTimeout(We,0)}function vt(){var Q=void 0;if(G.response?Q=G.response:Q=G.responseText||be(G),C)try{Q=JSON.parse(Q)}catch(ae){}return Q}function nt(Q){return clearTimeout(N),Q instanceof Error||(Q=new Error(""+(Q||"Unknown XMLHttpRequest Error"))),Q.statusCode=0,ye(Q,K)}function We(){if(!Le){var Q;clearTimeout(N),X.useXDR&&G.status===void 0?Q=200:Q=G.status===1223?204:G.status;var ae=K,oe=null;return Q!==0?(ae={body:vt(),statusCode:Q,method:Ne,headers:{},url:we,rawRequest:G},G.getAllResponseHeaders&&(ae.headers=I(G.getAllResponseHeaders()))):oe=new Error("Internal XMLHttpRequest Error"),ye(oe,ae,ae.body)}}var G=X.xhr||null;G||(X.cors||X.useXDR?G=new se.XDomainRequest:G=new se.XMLHttpRequest);var Ce,Le,we=G.url=X.uri||X.url,Ne=G.method=X.method||"GET",Ze=X.body||X.data,pe=G.headers=X.headers||{},y=!!X.sync,C=!1,N,K={body:void 0,headers:{},statusCode:0,method:Ne,url:we,rawRequest:G};if("json"in X&&X.json!==!1&&(C=!0,pe.accept||pe.Accept||(pe.Accept="application/json"),Ne!=="GET"&&Ne!=="HEAD"&&(pe["content-type"]||pe["Content-Type"]||(pe["Content-Type"]="application/json"),Ze=JSON.stringify(X.json===!0?Ze:X.json))),G.onreadystatechange=Fe,G.onload=We,G.onerror=nt,G.onprogress=function(){},G.onabort=function(){Le=!0},G.ontimeout=nt,G.open(Ne,we,!y,X.username,X.password),y||(G.withCredentials=!!X.withCredentials),!y&&X.timeout>0&&(N=setTimeout(function(){if(!Le){Le=!0,G.abort("timeout");var Q=new Error("XMLHttpRequest timeout");Q.code="ETIMEDOUT",nt(Q)}},X.timeout)),G.setRequestHeader)for(Ce in pe)pe.hasOwnProperty(Ce)&&G.setRequestHeader(Ce,pe[Ce]);else if(X.headers&&!O(X.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in X&&(G.responseType=X.responseType),"beforeSend"in X&&typeof X.beforeSend=="function"&&X.beforeSend(G),G.send(Ze||null),G}function be(X){try{if(X.responseType==="document")return X.responseXML;var me=X.responseXML&&X.responseXML.documentElement.nodeName==="parsererror";if(X.responseType===""&&!me)return X.responseXML}catch(ye){}return null}function ke(){}},72167:function(xe,ne){"use strict";function z(te,O,ce){if(ce===void 0&&(ce=Array.prototype),te&&typeof ce.find=="function")return ce.find.call(te,O);for(var se=0;se<te.length;se++)if(Object.prototype.hasOwnProperty.call(te,se)){var fe=te[se];if(O.call(void 0,fe,se,te))return fe}}function J(te,O){return O===void 0&&(O=Object),O&&typeof O.freeze=="function"?O.freeze(te):te}function A(te,O){if(te===null||typeof te!="object")throw new TypeError("target is not an object");for(var ce in O)Object.prototype.hasOwnProperty.call(O,ce)&&(te[ce]=O[ce]);return te}var $=J({HTML:"text/html",isHTML:function(te){return te===$.HTML},XML_APPLICATION:"application/xml",XML_TEXT:"text/xml",XML_XHTML_APPLICATION:"application/xhtml+xml",XML_SVG_IMAGE:"image/svg+xml"}),I=J({HTML:"http://www.w3.org/1999/xhtml",isHTML:function(te){return te===I.HTML},SVG:"http://www.w3.org/2000/svg",XML:"http://www.w3.org/XML/1998/namespace",XMLNS:"http://www.w3.org/2000/xmlns/"});ne.assign=A,ne.find=z,ne.freeze=J,ne.MIME_TYPE=$,ne.NAMESPACE=I},86129:function(xe,ne,z){var J,A=z(25108),$=z(72167),I=z(41146),te=z(31045),O=z(76925),ce=I.DOMImplementation,se=$.NAMESPACE,fe=O.ParseError,be=O.XMLReader;function ke(G){return G.replace(/\r[\n\u0085]/g,`
`).replace(/[\r\u0085\u2028]/g,`
`)}function X(G){this.options=G||{locator:{}}}X.prototype.parseFromString=function(G,Ce){var Le=this.options,we=new be,Ne=Le.domBuilder||new ye,Ze=Le.errorHandler,pe=Le.locator,y=Le.xmlns||{},C=/\/x?html?$/.test(Ce),N=C?te.HTML_ENTITIES:te.XML_ENTITIES;pe&&Ne.setDocumentLocator(pe),we.errorHandler=me(Ze,Ne,pe),we.domBuilder=Le.domBuilder||Ne,C&&(y[""]=se.HTML),y.xml=y.xml||se.XML;var K=Le.normalizeLineEndings||ke;return G&&typeof G=="string"?we.parse(K(G),y,N):we.errorHandler.error("invalid doc source"),Ne.doc};function me(G,Ce,Le){if(!G){if(Ce instanceof ye)return Ce;G=Ce}var we={},Ne=G instanceof Function;Le=Le||{};function Ze(pe){var y=G[pe];!y&&Ne&&(y=G.length==2?function(C){G(pe,C)}:G),we[pe]=y&&function(C){y("[xmldom "+pe+"]	"+C+vt(Le))}||function(){}}return Ze("warning"),Ze("error"),Ze("fatalError"),we}function ye(){this.cdata=!1}function Fe(G,Ce){Ce.lineNumber=G.lineNumber,Ce.columnNumber=G.columnNumber}ye.prototype={startDocument:function(){this.doc=new ce().createDocument(null,null,null),this.locator&&(this.doc.documentURI=this.locator.systemId)},startElement:function(G,Ce,Le,we){var Ne=this.doc,Ze=Ne.createElementNS(G,Le||Ce),pe=we.length;We(this,Ze),this.currentElement=Ze,this.locator&&Fe(this.locator,Ze);for(var y=0;y<pe;y++){var G=we.getURI(y),C=we.getValue(y),Le=we.getQName(y),N=Ne.createAttributeNS(G,Le);this.locator&&Fe(we.getLocator(y),N),N.value=N.nodeValue=C,Ze.setAttributeNode(N)}},endElement:function(G,Ce,Le){var we=this.currentElement,Ne=we.tagName;this.currentElement=we.parentNode},startPrefixMapping:function(G,Ce){},endPrefixMapping:function(G){},processingInstruction:function(G,Ce){var Le=this.doc.createProcessingInstruction(G,Ce);this.locator&&Fe(this.locator,Le),We(this,Le)},ignorableWhitespace:function(G,Ce,Le){},characters:function(G,Ce,Le){if(G=nt.apply(this,arguments),G){if(this.cdata)var we=this.doc.createCDATASection(G);else var we=this.doc.createTextNode(G);this.currentElement?this.currentElement.appendChild(we):/^\s*$/.test(G)&&this.doc.appendChild(we),this.locator&&Fe(this.locator,we)}},skippedEntity:function(G){},endDocument:function(){this.doc.normalize()},setDocumentLocator:function(G){(this.locator=G)&&(G.lineNumber=0)},comment:function(G,Ce,Le){G=nt.apply(this,arguments);var we=this.doc.createComment(G);this.locator&&Fe(this.locator,we),We(this,we)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(G,Ce,Le){var we=this.doc.implementation;if(we&&we.createDocumentType){var Ne=we.createDocumentType(G,Ce,Le);this.locator&&Fe(this.locator,Ne),We(this,Ne),this.doc.doctype=Ne}},warning:function(G){A.warn("[xmldom warning]	"+G,vt(this.locator))},error:function(G){A.error("[xmldom error]	"+G,vt(this.locator))},fatalError:function(G){throw new fe(G,this.locator)}};function vt(G){if(G)return`
@`+(G.systemId||"")+"#[line:"+G.lineNumber+",col:"+G.columnNumber+"]"}function nt(G,Ce,Le){return typeof G=="string"?G.substr(Ce,Le):G.length>=Ce+Le||Ce?new java.lang.String(G,Ce,Le)+"":G}"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(G){ye.prototype[G]=function(){return null}});function We(G,Ce){G.currentElement?G.currentElement.appendChild(Ce):G.doc.appendChild(Ce)}J=ye,J=ke,ne.DOMParser=X},41146:function(xe,ne,z){var J=z(25108),A=z(72167),$=A.find,I=A.NAMESPACE;function te(v){return v!==""}function O(v){return v?v.split(/[\t\n\f\r ]+/).filter(te):[]}function ce(v,_){return v.hasOwnProperty(_)||(v[_]=!0),v}function se(v){if(!v)return[];var _=O(v);return Object.keys(_.reduce(ce,{}))}function fe(v){return function(_){return v&&v.indexOf(_)!==-1}}function be(v,_){for(var B in v)Object.prototype.hasOwnProperty.call(v,B)&&(_[B]=v[B])}function ke(v,_){var B=v.prototype;if(!(B instanceof _)){let ue=function(){};var U=ue;ue.prototype=_.prototype,ue=new ue,be(B,ue),v.prototype=B=ue}B.constructor!=v&&(typeof v!="function"&&J.error("unknown Class:"+v),B.constructor=v)}var X={},me=X.ELEMENT_NODE=1,ye=X.ATTRIBUTE_NODE=2,Fe=X.TEXT_NODE=3,vt=X.CDATA_SECTION_NODE=4,nt=X.ENTITY_REFERENCE_NODE=5,We=X.ENTITY_NODE=6,G=X.PROCESSING_INSTRUCTION_NODE=7,Ce=X.COMMENT_NODE=8,Le=X.DOCUMENT_NODE=9,we=X.DOCUMENT_TYPE_NODE=10,Ne=X.DOCUMENT_FRAGMENT_NODE=11,Ze=X.NOTATION_NODE=12,pe={},y={},C=pe.INDEX_SIZE_ERR=(y[1]="Index size error",1),N=pe.DOMSTRING_SIZE_ERR=(y[2]="DOMString size error",2),K=pe.HIERARCHY_REQUEST_ERR=(y[3]="Hierarchy request error",3),Q=pe.WRONG_DOCUMENT_ERR=(y[4]="Wrong document",4),ae=pe.INVALID_CHARACTER_ERR=(y[5]="Invalid character",5),oe=pe.NO_DATA_ALLOWED_ERR=(y[6]="No data allowed",6),ge=pe.NO_MODIFICATION_ALLOWED_ERR=(y[7]="No modification allowed",7),ie=pe.NOT_FOUND_ERR=(y[8]="Not found",8),le=pe.NOT_SUPPORTED_ERR=(y[9]="Not supported",9),ee=pe.INUSE_ATTRIBUTE_ERR=(y[10]="Attribute in use",10),re=pe.INVALID_STATE_ERR=(y[11]="Invalid state",11),Te=pe.SYNTAX_ERR=(y[12]="Syntax error",12),De=pe.INVALID_MODIFICATION_ERR=(y[13]="Invalid modification",13),ze=pe.NAMESPACE_ERR=(y[14]="Invalid namespace",14),Ve=pe.INVALID_ACCESS_ERR=(y[15]="Invalid access",15);function _e(v,_){if(_ instanceof Error)var B=_;else B=this,Error.call(this,y[v]),this.message=y[v],Error.captureStackTrace&&Error.captureStackTrace(this,_e);return B.code=v,_&&(this.message=this.message+": "+_),B}_e.prototype=Error.prototype,be(pe,_e);function ut(){}ut.prototype={length:0,item:function(v){return v>=0&&v<this.length?this[v]:null},toString:function(v,_){for(var B=[],U=0;U<this.length;U++)qt(this[U],B,v,_);return B.join("")},filter:function(v){return Array.prototype.filter.call(this,v)},indexOf:function(v){return Array.prototype.indexOf.call(this,v)}};function ct(v,_){this._node=v,this._refresh=_,at(this)}function at(v){var _=v._node._inc||v._node.ownerDocument._inc;if(v._inc!==_){var B=v._refresh(v._node);if(Ks(v,"length",B.length),!v.$$length||B.length<v.$$length)for(var U=B.length;U in v;U++)Object.prototype.hasOwnProperty.call(v,U)&&delete v[U];be(B,v),v._inc=_}}ct.prototype.item=function(v){return at(this),this[v]||null},ke(ct,ut);function At(){}function Nt(v,_){for(var B=v.length;B--;)if(v[B]===_)return B}function ui(v,_,B,U){if(U?_[Nt(_,U)]=B:_[_.length++]=B,v){B.ownerElement=v;var ue=v.ownerDocument;ue&&(U&&Si(ue,v,U),An(ue,v,B))}}function vn(v,_,B){var U=Nt(_,B);if(U>=0){for(var ue=_.length-1;U<ue;)_[U]=_[++U];if(_.length=ue,v){var Be=v.ownerDocument;Be&&(Si(Be,v,B),B.ownerElement=null)}}else throw new _e(ie,new Error(v.tagName+"@"+B))}At.prototype={length:0,item:ut.prototype.item,getNamedItem:function(v){for(var _=this.length;_--;){var B=this[_];if(B.nodeName==v)return B}},setNamedItem:function(v){var _=v.ownerElement;if(_&&_!=this._ownerElement)throw new _e(ee);var B=this.getNamedItem(v.nodeName);return ui(this._ownerElement,this,v,B),B},setNamedItemNS:function(v){var _=v.ownerElement,B;if(_&&_!=this._ownerElement)throw new _e(ee);return B=this.getNamedItemNS(v.namespaceURI,v.localName),ui(this._ownerElement,this,v,B),B},removeNamedItem:function(v){var _=this.getNamedItem(v);return vn(this._ownerElement,this,_),_},removeNamedItemNS:function(v,_){var B=this.getNamedItemNS(v,_);return vn(this._ownerElement,this,B),B},getNamedItemNS:function(v,_){for(var B=this.length;B--;){var U=this[B];if(U.localName==_&&U.namespaceURI==v)return U}return null}};function Xi(){}Xi.prototype={hasFeature:function(v,_){return!0},createDocument:function(v,_,B){var U=new ci;if(U.implementation=this,U.childNodes=new ut,U.doctype=B||null,B&&U.appendChild(B),_){var ue=U.createElementNS(v,_);U.appendChild(ue)}return U},createDocumentType:function(v,_,B){var U=new En;return U.name=v,U.nodeName=v,U.publicId=_||"",U.systemId=B||"",U}};function Ie(){}Ie.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,attributes:null,parentNode:null,childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,insertBefore:function(v,_){return Yi(this,v,_)},replaceChild:function(v,_){Yi(this,v,_,Gs),_&&this.removeChild(_)},removeChild:function(v){return he(this,v)},appendChild:function(v){return this.insertBefore(v,null)},hasChildNodes:function(){return this.firstChild!=null},cloneNode:function(v){return us(this.ownerDocument||this,this,v)},normalize:function(){for(var v=this.firstChild;v;){var _=v.nextSibling;_&&_.nodeType==Fe&&v.nodeType==Fe?(this.removeChild(_),v.appendData(_.data)):(v.normalize(),v=_)}},isSupported:function(v,_){return this.ownerDocument.implementation.hasFeature(v,_)},hasAttributes:function(){return this.attributes.length>0},lookupPrefix:function(v){for(var _=this;_;){var B=_._nsMap;if(B){for(var U in B)if(Object.prototype.hasOwnProperty.call(B,U)&&B[U]===v)return U}_=_.nodeType==ye?_.ownerDocument:_.parentNode}return null},lookupNamespaceURI:function(v){for(var _=this;_;){var B=_._nsMap;if(B&&Object.prototype.hasOwnProperty.call(B,v))return B[v];_=_.nodeType==ye?_.ownerDocument:_.parentNode}return null},isDefaultNamespace:function(v){var _=this.lookupPrefix(v);return _==null}};function Ni(v){return v=="<"&&"&lt;"||v==">"&&"&gt;"||v=="&"&&"&amp;"||v=='"'&&"&quot;"||"&#"+v.charCodeAt()+";"}be(X,Ie),be(X,Ie.prototype);function dt(v,_){if(_(v))return!0;if(v=v.firstChild)do if(dt(v,_))return!0;while(v=v.nextSibling)}function ci(){this.ownerDocument=this}function An(v,_,B){v&&v._inc++;var U=B.namespaceURI;U===I.XMLNS&&(_._nsMap[B.prefix?B.localName:""]=B.value)}function Si(v,_,B,U){v&&v._inc++;var ue=B.namespaceURI;ue===I.XMLNS&&delete _._nsMap[B.prefix?B.localName:""]}function Mi(v,_,B){if(v&&v._inc){v._inc++;var U=_.childNodes;if(B)U[U.length++]=B;else{for(var ue=_.firstChild,Be=0;ue;)U[Be++]=ue,ue=ue.nextSibling;U.length=Be,delete U[U.length]}}}function he(v,_){var B=_.previousSibling,U=_.nextSibling;return B?B.nextSibling=U:v.firstChild=U,U?U.previousSibling=B:v.lastChild=B,_.parentNode=null,_.previousSibling=null,_.nextSibling=null,Mi(v.ownerDocument,v),_}function Dt(v){return v&&(v.nodeType===Ie.DOCUMENT_NODE||v.nodeType===Ie.DOCUMENT_FRAGMENT_NODE||v.nodeType===Ie.ELEMENT_NODE)}function Ws(v){return v&&(Mt(v)||yn(v)||Ke(v)||v.nodeType===Ie.DOCUMENT_FRAGMENT_NODE||v.nodeType===Ie.COMMENT_NODE||v.nodeType===Ie.PROCESSING_INSTRUCTION_NODE)}function Ke(v){return v&&v.nodeType===Ie.DOCUMENT_TYPE_NODE}function Mt(v){return v&&v.nodeType===Ie.ELEMENT_NODE}function yn(v){return v&&v.nodeType===Ie.TEXT_NODE}function fa(v,_){var B=v.childNodes||[];if($(B,Mt)||Ke(_))return!1;var U=$(B,Ke);return!(_&&U&&B.indexOf(U)>B.indexOf(_))}function pa(v,_){var B=v.childNodes||[];function U(Be){return Mt(Be)&&Be!==_}if($(B,U))return!1;var ue=$(B,Ke);return!(_&&ue&&B.indexOf(ue)>B.indexOf(_))}function ma(v,_,B){if(!Dt(v))throw new _e(K,"Unexpected parent node type "+v.nodeType);if(B&&B.parentNode!==v)throw new _e(ie,"child not in parent");if(!Ws(_)||Ke(_)&&v.nodeType!==Ie.DOCUMENT_NODE)throw new _e(K,"Unexpected node type "+_.nodeType+" for parent node type "+v.nodeType)}function ga(v,_,B){var U=v.childNodes||[],ue=_.childNodes||[];if(_.nodeType===Ie.DOCUMENT_FRAGMENT_NODE){var Be=ue.filter(Mt);if(Be.length>1||$(ue,yn))throw new _e(K,"More than one element or text in fragment");if(Be.length===1&&!fa(v,B))throw new _e(K,"Element in fragment can not be inserted before doctype")}if(Mt(_)&&!fa(v,B))throw new _e(K,"Only one element can be added and only after doctype");if(Ke(_)){if($(U,Ke))throw new _e(K,"Only one doctype is allowed");var Xe=$(U,Mt);if(B&&U.indexOf(Xe)<U.indexOf(B))throw new _e(K,"Doctype can only be inserted before an element");if(!B&&Xe)throw new _e(K,"Doctype can not be appended since element is present")}}function Gs(v,_,B){var U=v.childNodes||[],ue=_.childNodes||[];if(_.nodeType===Ie.DOCUMENT_FRAGMENT_NODE){var Be=ue.filter(Mt);if(Be.length>1||$(ue,yn))throw new _e(K,"More than one element or text in fragment");if(Be.length===1&&!pa(v,B))throw new _e(K,"Element in fragment can not be inserted before doctype")}if(Mt(_)&&!pa(v,B))throw new _e(K,"Only one element can be added and only after doctype");if(Ke(_)){let ri=function(Wt){return Ke(Wt)&&Wt!==B};var xt=ri;if($(U,ri))throw new _e(K,"Only one doctype is allowed");var Xe=$(U,Mt);if(B&&U.indexOf(Xe)<U.indexOf(B))throw new _e(K,"Doctype can only be inserted before an element")}}function Yi(v,_,B,U){ma(v,_,B),v.nodeType===Ie.DOCUMENT_NODE&&(U||ga)(v,_,B);var ue=_.parentNode;if(ue&&ue.removeChild(_),_.nodeType===Ne){var Be=_.firstChild;if(Be==null)return _;var Xe=_.lastChild}else Be=Xe=_;var xt=B?B.previousSibling:v.lastChild;Be.previousSibling=xt,Xe.nextSibling=B,xt?xt.nextSibling=Be:v.firstChild=Be,B==null?v.lastChild=Xe:B.previousSibling=Xe;do Be.parentNode=v;while(Be!==Xe&&(Be=Be.nextSibling));return Mi(v.ownerDocument||v,v),_.nodeType==Ne&&(_.firstChild=_.lastChild=null),_}function va(v,_){return _.parentNode&&_.parentNode.removeChild(_),_.parentNode=v,_.previousSibling=v.lastChild,_.nextSibling=null,_.previousSibling?_.previousSibling.nextSibling=_:v.firstChild=_,v.lastChild=_,Mi(v.ownerDocument,v,_),_}ci.prototype={nodeName:"#document",nodeType:Le,doctype:null,documentElement:null,_inc:1,insertBefore:function(v,_){if(v.nodeType==Ne){for(var B=v.firstChild;B;){var U=B.nextSibling;this.insertBefore(B,_),B=U}return v}return Yi(this,v,_),v.ownerDocument=this,this.documentElement===null&&v.nodeType===me&&(this.documentElement=v),v},removeChild:function(v){return this.documentElement==v&&(this.documentElement=null),he(this,v)},replaceChild:function(v,_){Yi(this,v,_,Gs),v.ownerDocument=this,_&&this.removeChild(_),Mt(v)&&(this.documentElement=v)},importNode:function(v,_){return ls(this,v,_)},getElementById:function(v){var _=null;return dt(this.documentElement,function(B){if(B.nodeType==me&&B.getAttribute("id")==v)return _=B,!0}),_},getElementsByClassName:function(v){var _=se(v);return new ct(this,function(B){var U=[];return _.length>0&&dt(B.documentElement,function(ue){if(ue!==B&&ue.nodeType===me){var Be=ue.getAttribute("class");if(Be){var Xe=v===Be;if(!Xe){var xt=se(Be);Xe=_.every(fe(xt))}Xe&&U.push(ue)}}}),U})},createElement:function(v){var _=new qe;_.ownerDocument=this,_.nodeName=v,_.tagName=v,_.localName=v,_.childNodes=new ut;var B=_.attributes=new At;return B._ownerElement=_,_},createDocumentFragment:function(){var v=new Tn;return v.ownerDocument=this,v.childNodes=new ut,v},createTextNode:function(v){var _=new bn;return _.ownerDocument=this,_.appendData(v),_},createComment:function(v){var _=new ns;return _.ownerDocument=this,_.appendData(v),_},createCDATASection:function(v){var _=new Ki;return _.ownerDocument=this,_.appendData(v),_},createProcessingInstruction:function(v,_){var B=new Ys;return B.ownerDocument=this,B.tagName=B.nodeName=B.target=v,B.nodeValue=B.data=_,B},createAttribute:function(v){var _=new is;return _.ownerDocument=this,_.name=v,_.nodeName=v,_.localName=v,_.specified=!0,_},createEntityReference:function(v){var _=new ss;return _.ownerDocument=this,_.nodeName=v,_},createElementNS:function(v,_){var B=new qe,U=_.split(":"),ue=B.attributes=new At;return B.childNodes=new ut,B.ownerDocument=this,B.nodeName=_,B.tagName=_,B.namespaceURI=v,U.length==2?(B.prefix=U[0],B.localName=U[1]):B.localName=_,ue._ownerElement=B,B},createAttributeNS:function(v,_){var B=new is,U=_.split(":");return B.ownerDocument=this,B.nodeName=_,B.name=_,B.namespaceURI=v,B.specified=!0,U.length==2?(B.prefix=U[0],B.localName=U[1]):B.localName=_,B}},ke(ci,Ie);function qe(){this._nsMap={}}qe.prototype={nodeType:me,hasAttribute:function(v){return this.getAttributeNode(v)!=null},getAttribute:function(v){var _=this.getAttributeNode(v);return _&&_.value||""},getAttributeNode:function(v){return this.attributes.getNamedItem(v)},setAttribute:function(v,_){var B=this.ownerDocument.createAttribute(v);B.value=B.nodeValue=""+_,this.setAttributeNode(B)},removeAttribute:function(v){var _=this.getAttributeNode(v);_&&this.removeAttributeNode(_)},appendChild:function(v){return v.nodeType===Ne?this.insertBefore(v,null):va(this,v)},setAttributeNode:function(v){return this.attributes.setNamedItem(v)},setAttributeNodeNS:function(v){return this.attributes.setNamedItemNS(v)},removeAttributeNode:function(v){return this.attributes.removeNamedItem(v.nodeName)},removeAttributeNS:function(v,_){var B=this.getAttributeNodeNS(v,_);B&&this.removeAttributeNode(B)},hasAttributeNS:function(v,_){return this.getAttributeNodeNS(v,_)!=null},getAttributeNS:function(v,_){var B=this.getAttributeNodeNS(v,_);return B&&B.value||""},setAttributeNS:function(v,_,B){var U=this.ownerDocument.createAttributeNS(v,_);U.value=U.nodeValue=""+B,this.setAttributeNode(U)},getAttributeNodeNS:function(v,_){return this.attributes.getNamedItemNS(v,_)},getElementsByTagName:function(v){return new ct(this,function(_){var B=[];return dt(_,function(U){U!==_&&U.nodeType==me&&(v==="*"||U.tagName==v)&&B.push(U)}),B})},getElementsByTagNameNS:function(v,_){return new ct(this,function(B){var U=[];return dt(B,function(ue){ue!==B&&ue.nodeType===me&&(v==="*"||ue.namespaceURI===v)&&(_==="*"||ue.localName==_)&&U.push(ue)}),U})}},ci.prototype.getElementsByTagName=qe.prototype.getElementsByTagName,ci.prototype.getElementsByTagNameNS=qe.prototype.getElementsByTagNameNS,ke(qe,Ie);function is(){}is.prototype.nodeType=ye,ke(is,Ie);function _n(){}_n.prototype={data:"",substringData:function(v,_){return this.data.substring(v,v+_)},appendData:function(v){v=this.data+v,this.nodeValue=this.data=v,this.length=v.length},insertData:function(v,_){this.replaceData(v,0,_)},appendChild:function(v){throw new Error(y[K])},deleteData:function(v,_){this.replaceData(v,_,"")},replaceData:function(v,_,B){var U=this.data.substring(0,v),ue=this.data.substring(v+_);B=U+B+ue,this.nodeValue=this.data=B,this.length=B.length}},ke(_n,Ie);function bn(){}bn.prototype={nodeName:"#text",nodeType:Fe,splitText:function(v){var _=this.data,B=_.substring(v);_=_.substring(0,v),this.data=this.nodeValue=_,this.length=_.length;var U=this.ownerDocument.createTextNode(B);return this.parentNode&&this.parentNode.insertBefore(U,this.nextSibling),U}},ke(bn,_n);function ns(){}ns.prototype={nodeName:"#comment",nodeType:Ce},ke(ns,_n);function Ki(){}Ki.prototype={nodeName:"#cdata-section",nodeType:vt},ke(Ki,_n);function En(){}En.prototype.nodeType=we,ke(En,Ie);function $s(){}$s.prototype.nodeType=Ze,ke($s,Ie);function Xs(){}Xs.prototype.nodeType=We,ke(Xs,Ie);function ss(){}ss.prototype.nodeType=nt,ke(ss,Ie);function Tn(){}Tn.prototype.nodeName="#document-fragment",Tn.prototype.nodeType=Ne,ke(Tn,Ie);function Ys(){}Ys.prototype.nodeType=G,ke(Ys,Ie);function rs(){}rs.prototype.serializeToString=function(v,_,B){return yt.call(v,_,B)},Ie.prototype.toString=yt;function yt(v,_){var B=[],U=this.nodeType==9&&this.documentElement||this,ue=U.prefix,Be=U.namespaceURI;if(Be&&ue==null){var ue=U.lookupPrefix(Be);if(ue==null)var Xe=[{namespace:Be,prefix:null}]}return qt(this,B,v,_,Xe),B.join("")}function as(v,_,B){var U=v.prefix||"",ue=v.namespaceURI;if(!ue||U==="xml"&&ue===I.XML||ue===I.XMLNS)return!1;for(var Be=B.length;Be--;){var Xe=B[Be];if(Xe.prefix===U)return Xe.namespace!==ue}return!0}function os(v,_,B){v.push(" ",_,'="',B.replace(/[<>&"\t\n\r]/g,Ni),'"')}function qt(v,_,B,U,ue){if(ue||(ue=[]),U)if(v=U(v),v){if(typeof v=="string"){_.push(v);return}}else return;switch(v.nodeType){case me:var Be=v.attributes,Xe=Be.length,Et=v.firstChild,xt=v.tagName;B=I.isHTML(v.namespaceURI)||B;var ri=xt;if(!B&&!v.prefix&&v.namespaceURI){for(var Wt,Qt=0;Qt<Be.length;Qt++)if(Be.item(Qt).name==="xmlns"){Wt=Be.item(Qt).value;break}if(!Wt)for(var ji=ue.length-1;ji>=0;ji--){var di=ue[ji];if(di.prefix===""&&di.namespace===v.namespaceURI){Wt=di.namespace;break}}if(Wt!==v.namespaceURI)for(var ji=ue.length-1;ji>=0;ji--){var di=ue[ji];if(di.namespace===v.namespaceURI){di.prefix&&(ri=di.prefix+":"+xt);break}}}_.push("<",ri);for(var hi=0;hi<Xe;hi++){var Jt=Be.item(hi);Jt.prefix=="xmlns"?ue.push({prefix:Jt.localName,namespace:Jt.value}):Jt.nodeName=="xmlns"&&ue.push({prefix:"",namespace:Jt.value})}for(var hi=0;hi<Xe;hi++){var Jt=Be.item(hi);if(as(Jt,B,ue)){var Bi=Jt.prefix||"",fi=Jt.namespaceURI;os(_,Bi?"xmlns:"+Bi:"xmlns",fi),ue.push({prefix:Bi,namespace:fi})}qt(Jt,_,B,U,ue)}if(xt===ri&&as(v,B,ue)){var Bi=v.prefix||"",fi=v.namespaceURI;os(_,Bi?"xmlns:"+Bi:"xmlns",fi),ue.push({prefix:Bi,namespace:fi})}if(Et||B&&!/^(?:meta|link|img|br|hr|input)$/i.test(xt)){if(_.push(">"),B&&/^script$/i.test(xt))for(;Et;)Et.data?_.push(Et.data):qt(Et,_,B,U,ue.slice()),Et=Et.nextSibling;else for(;Et;)qt(Et,_,B,U,ue.slice()),Et=Et.nextSibling;_.push("</",ri,">")}else _.push("/>");return;case Le:case Ne:for(var Et=v.firstChild;Et;)qt(Et,_,B,U,ue.slice()),Et=Et.nextSibling;return;case ye:return os(_,v.name,v.value);case Fe:return _.push(v.data.replace(/[<&>]/g,Ni));case vt:return _.push("<![CDATA[",v.data,"]]>");case Ce:return _.push("<!--",v.data,"-->");case we:var Cn=v.publicId,Ui=v.systemId;if(_.push("<!DOCTYPE ",v.name),Cn)_.push(" PUBLIC ",Cn),Ui&&Ui!="."&&_.push(" ",Ui),_.push(">");else if(Ui&&Ui!=".")_.push(" SYSTEM ",Ui,">");else{var Qs=v.internalSubset;Qs&&_.push(" [",Qs,"]"),_.push(">")}return;case G:return _.push("<?",v.target," ",v.data,"?>");case nt:return _.push("&",v.nodeName,";");default:_.push("??",v.nodeName)}}function ls(v,_,B){var U;switch(_.nodeType){case me:U=_.cloneNode(!1),U.ownerDocument=v;case Ne:break;case ye:B=!0;break}if(U||(U=_.cloneNode(!1)),U.ownerDocument=v,U.parentNode=null,B)for(var ue=_.firstChild;ue;)U.appendChild(ls(v,ue,B)),ue=ue.nextSibling;return U}function us(v,_,B){var U=new _.constructor;for(var ue in _)if(Object.prototype.hasOwnProperty.call(_,ue)){var Be=_[ue];typeof Be!="object"&&Be!=U[ue]&&(U[ue]=Be)}switch(_.childNodes&&(U.childNodes=new ut),U.ownerDocument=v,U.nodeType){case me:var Xe=_.attributes,xt=U.attributes=new At,ri=Xe.length;xt._ownerElement=U;for(var Wt=0;Wt<ri;Wt++)U.setAttributeNode(us(v,Xe.item(Wt),!0));break;case ye:B=!0}if(B)for(var Qt=_.firstChild;Qt;)U.appendChild(us(v,Qt,B)),Qt=Qt.nextSibling;return U}function Ks(v,_,B){v[_]=B}try{if(Object.defineProperty){let v=function(_){switch(_.nodeType){case me:case Ne:var B=[];for(_=_.firstChild;_;)_.nodeType!==7&&_.nodeType!==8&&B.push(v(_)),_=_.nextSibling;return B.join("");default:return _.nodeValue}};var Qi=v;Object.defineProperty(ct.prototype,"length",{get:function(){return at(this),this.$$length}}),Object.defineProperty(Ie.prototype,"textContent",{get:function(){return v(this)},set:function(_){switch(this.nodeType){case me:case Ne:for(;this.firstChild;)this.removeChild(this.firstChild);(_||String(_))&&this.appendChild(this.ownerDocument.createTextNode(_));break;default:this.data=_,this.value=_,this.nodeValue=_}}}),Ks=function(_,B,U){_["$$"+B]=U}}}catch(v){}ne.DocumentType=En,ne.DOMException=_e,ne.DOMImplementation=Xi,ne.Element=qe,ne.Node=Ie,ne.NodeList=ut,ne.XMLSerializer=rs},31045:function(xe,ne,z){"use strict";var J=z(72167).freeze;ne.XML_ENTITIES=J({amp:"&",apos:"'",gt:">",lt:"<",quot:'"'}),ne.HTML_ENTITIES=J({Aacute:"\xC1",aacute:"\xE1",Abreve:"\u0102",abreve:"\u0103",ac:"\u223E",acd:"\u223F",acE:"\u223E\u0333",Acirc:"\xC2",acirc:"\xE2",acute:"\xB4",Acy:"\u0410",acy:"\u0430",AElig:"\xC6",aelig:"\xE6",af:"\u2061",Afr:"\u{1D504}",afr:"\u{1D51E}",Agrave:"\xC0",agrave:"\xE0",alefsym:"\u2135",aleph:"\u2135",Alpha:"\u0391",alpha:"\u03B1",Amacr:"\u0100",amacr:"\u0101",amalg:"\u2A3F",AMP:"&",amp:"&",And:"\u2A53",and:"\u2227",andand:"\u2A55",andd:"\u2A5C",andslope:"\u2A58",andv:"\u2A5A",ang:"\u2220",ange:"\u29A4",angle:"\u2220",angmsd:"\u2221",angmsdaa:"\u29A8",angmsdab:"\u29A9",angmsdac:"\u29AA",angmsdad:"\u29AB",angmsdae:"\u29AC",angmsdaf:"\u29AD",angmsdag:"\u29AE",angmsdah:"\u29AF",angrt:"\u221F",angrtvb:"\u22BE",angrtvbd:"\u299D",angsph:"\u2222",angst:"\xC5",angzarr:"\u237C",Aogon:"\u0104",aogon:"\u0105",Aopf:"\u{1D538}",aopf:"\u{1D552}",ap:"\u2248",apacir:"\u2A6F",apE:"\u2A70",ape:"\u224A",apid:"\u224B",apos:"'",ApplyFunction:"\u2061",approx:"\u2248",approxeq:"\u224A",Aring:"\xC5",aring:"\xE5",Ascr:"\u{1D49C}",ascr:"\u{1D4B6}",Assign:"\u2254",ast:"*",asymp:"\u2248",asympeq:"\u224D",Atilde:"\xC3",atilde:"\xE3",Auml:"\xC4",auml:"\xE4",awconint:"\u2233",awint:"\u2A11",backcong:"\u224C",backepsilon:"\u03F6",backprime:"\u2035",backsim:"\u223D",backsimeq:"\u22CD",Backslash:"\u2216",Barv:"\u2AE7",barvee:"\u22BD",Barwed:"\u2306",barwed:"\u2305",barwedge:"\u2305",bbrk:"\u23B5",bbrktbrk:"\u23B6",bcong:"\u224C",Bcy:"\u0411",bcy:"\u0431",bdquo:"\u201E",becaus:"\u2235",Because:"\u2235",because:"\u2235",bemptyv:"\u29B0",bepsi:"\u03F6",bernou:"\u212C",Bernoullis:"\u212C",Beta:"\u0392",beta:"\u03B2",beth:"\u2136",between:"\u226C",Bfr:"\u{1D505}",bfr:"\u{1D51F}",bigcap:"\u22C2",bigcirc:"\u25EF",bigcup:"\u22C3",bigodot:"\u2A00",bigoplus:"\u2A01",bigotimes:"\u2A02",bigsqcup:"\u2A06",bigstar:"\u2605",bigtriangledown:"\u25BD",bigtriangleup:"\u25B3",biguplus:"\u2A04",bigvee:"\u22C1",bigwedge:"\u22C0",bkarow:"\u290D",blacklozenge:"\u29EB",blacksquare:"\u25AA",blacktriangle:"\u25B4",blacktriangledown:"\u25BE",blacktriangleleft:"\u25C2",blacktriangleright:"\u25B8",blank:"\u2423",blk12:"\u2592",blk14:"\u2591",blk34:"\u2593",block:"\u2588",bne:"=\u20E5",bnequiv:"\u2261\u20E5",bNot:"\u2AED",bnot:"\u2310",Bopf:"\u{1D539}",bopf:"\u{1D553}",bot:"\u22A5",bottom:"\u22A5",bowtie:"\u22C8",boxbox:"\u29C9",boxDL:"\u2557",boxDl:"\u2556",boxdL:"\u2555",boxdl:"\u2510",boxDR:"\u2554",boxDr:"\u2553",boxdR:"\u2552",boxdr:"\u250C",boxH:"\u2550",boxh:"\u2500",boxHD:"\u2566",boxHd:"\u2564",boxhD:"\u2565",boxhd:"\u252C",boxHU:"\u2569",boxHu:"\u2567",boxhU:"\u2568",boxhu:"\u2534",boxminus:"\u229F",boxplus:"\u229E",boxtimes:"\u22A0",boxUL:"\u255D",boxUl:"\u255C",boxuL:"\u255B",boxul:"\u2518",boxUR:"\u255A",boxUr:"\u2559",boxuR:"\u2558",boxur:"\u2514",boxV:"\u2551",boxv:"\u2502",boxVH:"\u256C",boxVh:"\u256B",boxvH:"\u256A",boxvh:"\u253C",boxVL:"\u2563",boxVl:"\u2562",boxvL:"\u2561",boxvl:"\u2524",boxVR:"\u2560",boxVr:"\u255F",boxvR:"\u255E",boxvr:"\u251C",bprime:"\u2035",Breve:"\u02D8",breve:"\u02D8",brvbar:"\xA6",Bscr:"\u212C",bscr:"\u{1D4B7}",bsemi:"\u204F",bsim:"\u223D",bsime:"\u22CD",bsol:"\\",bsolb:"\u29C5",bsolhsub:"\u27C8",bull:"\u2022",bullet:"\u2022",bump:"\u224E",bumpE:"\u2AAE",bumpe:"\u224F",Bumpeq:"\u224E",bumpeq:"\u224F",Cacute:"\u0106",cacute:"\u0107",Cap:"\u22D2",cap:"\u2229",capand:"\u2A44",capbrcup:"\u2A49",capcap:"\u2A4B",capcup:"\u2A47",capdot:"\u2A40",CapitalDifferentialD:"\u2145",caps:"\u2229\uFE00",caret:"\u2041",caron:"\u02C7",Cayleys:"\u212D",ccaps:"\u2A4D",Ccaron:"\u010C",ccaron:"\u010D",Ccedil:"\xC7",ccedil:"\xE7",Ccirc:"\u0108",ccirc:"\u0109",Cconint:"\u2230",ccups:"\u2A4C",ccupssm:"\u2A50",Cdot:"\u010A",cdot:"\u010B",cedil:"\xB8",Cedilla:"\xB8",cemptyv:"\u29B2",cent:"\xA2",CenterDot:"\xB7",centerdot:"\xB7",Cfr:"\u212D",cfr:"\u{1D520}",CHcy:"\u0427",chcy:"\u0447",check:"\u2713",checkmark:"\u2713",Chi:"\u03A7",chi:"\u03C7",cir:"\u25CB",circ:"\u02C6",circeq:"\u2257",circlearrowleft:"\u21BA",circlearrowright:"\u21BB",circledast:"\u229B",circledcirc:"\u229A",circleddash:"\u229D",CircleDot:"\u2299",circledR:"\xAE",circledS:"\u24C8",CircleMinus:"\u2296",CirclePlus:"\u2295",CircleTimes:"\u2297",cirE:"\u29C3",cire:"\u2257",cirfnint:"\u2A10",cirmid:"\u2AEF",cirscir:"\u29C2",ClockwiseContourIntegral:"\u2232",CloseCurlyDoubleQuote:"\u201D",CloseCurlyQuote:"\u2019",clubs:"\u2663",clubsuit:"\u2663",Colon:"\u2237",colon:":",Colone:"\u2A74",colone:"\u2254",coloneq:"\u2254",comma:",",commat:"@",comp:"\u2201",compfn:"\u2218",complement:"\u2201",complexes:"\u2102",cong:"\u2245",congdot:"\u2A6D",Congruent:"\u2261",Conint:"\u222F",conint:"\u222E",ContourIntegral:"\u222E",Copf:"\u2102",copf:"\u{1D554}",coprod:"\u2210",Coproduct:"\u2210",COPY:"\xA9",copy:"\xA9",copysr:"\u2117",CounterClockwiseContourIntegral:"\u2233",crarr:"\u21B5",Cross:"\u2A2F",cross:"\u2717",Cscr:"\u{1D49E}",cscr:"\u{1D4B8}",csub:"\u2ACF",csube:"\u2AD1",csup:"\u2AD0",csupe:"\u2AD2",ctdot:"\u22EF",cudarrl:"\u2938",cudarrr:"\u2935",cuepr:"\u22DE",cuesc:"\u22DF",cularr:"\u21B6",cularrp:"\u293D",Cup:"\u22D3",cup:"\u222A",cupbrcap:"\u2A48",CupCap:"\u224D",cupcap:"\u2A46",cupcup:"\u2A4A",cupdot:"\u228D",cupor:"\u2A45",cups:"\u222A\uFE00",curarr:"\u21B7",curarrm:"\u293C",curlyeqprec:"\u22DE",curlyeqsucc:"\u22DF",curlyvee:"\u22CE",curlywedge:"\u22CF",curren:"\xA4",curvearrowleft:"\u21B6",curvearrowright:"\u21B7",cuvee:"\u22CE",cuwed:"\u22CF",cwconint:"\u2232",cwint:"\u2231",cylcty:"\u232D",Dagger:"\u2021",dagger:"\u2020",daleth:"\u2138",Darr:"\u21A1",dArr:"\u21D3",darr:"\u2193",dash:"\u2010",Dashv:"\u2AE4",dashv:"\u22A3",dbkarow:"\u290F",dblac:"\u02DD",Dcaron:"\u010E",dcaron:"\u010F",Dcy:"\u0414",dcy:"\u0434",DD:"\u2145",dd:"\u2146",ddagger:"\u2021",ddarr:"\u21CA",DDotrahd:"\u2911",ddotseq:"\u2A77",deg:"\xB0",Del:"\u2207",Delta:"\u0394",delta:"\u03B4",demptyv:"\u29B1",dfisht:"\u297F",Dfr:"\u{1D507}",dfr:"\u{1D521}",dHar:"\u2965",dharl:"\u21C3",dharr:"\u21C2",DiacriticalAcute:"\xB4",DiacriticalDot:"\u02D9",DiacriticalDoubleAcute:"\u02DD",DiacriticalGrave:"`",DiacriticalTilde:"\u02DC",diam:"\u22C4",Diamond:"\u22C4",diamond:"\u22C4",diamondsuit:"\u2666",diams:"\u2666",die:"\xA8",DifferentialD:"\u2146",digamma:"\u03DD",disin:"\u22F2",div:"\xF7",divide:"\xF7",divideontimes:"\u22C7",divonx:"\u22C7",DJcy:"\u0402",djcy:"\u0452",dlcorn:"\u231E",dlcrop:"\u230D",dollar:"$",Dopf:"\u{1D53B}",dopf:"\u{1D555}",Dot:"\xA8",dot:"\u02D9",DotDot:"\u20DC",doteq:"\u2250",doteqdot:"\u2251",DotEqual:"\u2250",dotminus:"\u2238",dotplus:"\u2214",dotsquare:"\u22A1",doublebarwedge:"\u2306",DoubleContourIntegral:"\u222F",DoubleDot:"\xA8",DoubleDownArrow:"\u21D3",DoubleLeftArrow:"\u21D0",DoubleLeftRightArrow:"\u21D4",DoubleLeftTee:"\u2AE4",DoubleLongLeftArrow:"\u27F8",DoubleLongLeftRightArrow:"\u27FA",DoubleLongRightArrow:"\u27F9",DoubleRightArrow:"\u21D2",DoubleRightTee:"\u22A8",DoubleUpArrow:"\u21D1",DoubleUpDownArrow:"\u21D5",DoubleVerticalBar:"\u2225",DownArrow:"\u2193",Downarrow:"\u21D3",downarrow:"\u2193",DownArrowBar:"\u2913",DownArrowUpArrow:"\u21F5",DownBreve:"\u0311",downdownarrows:"\u21CA",downharpoonleft:"\u21C3",downharpoonright:"\u21C2",DownLeftRightVector:"\u2950",DownLeftTeeVector:"\u295E",DownLeftVector:"\u21BD",DownLeftVectorBar:"\u2956",DownRightTeeVector:"\u295F",DownRightVector:"\u21C1",DownRightVectorBar:"\u2957",DownTee:"\u22A4",DownTeeArrow:"\u21A7",drbkarow:"\u2910",drcorn:"\u231F",drcrop:"\u230C",Dscr:"\u{1D49F}",dscr:"\u{1D4B9}",DScy:"\u0405",dscy:"\u0455",dsol:"\u29F6",Dstrok:"\u0110",dstrok:"\u0111",dtdot:"\u22F1",dtri:"\u25BF",dtrif:"\u25BE",duarr:"\u21F5",duhar:"\u296F",dwangle:"\u29A6",DZcy:"\u040F",dzcy:"\u045F",dzigrarr:"\u27FF",Eacute:"\xC9",eacute:"\xE9",easter:"\u2A6E",Ecaron:"\u011A",ecaron:"\u011B",ecir:"\u2256",Ecirc:"\xCA",ecirc:"\xEA",ecolon:"\u2255",Ecy:"\u042D",ecy:"\u044D",eDDot:"\u2A77",Edot:"\u0116",eDot:"\u2251",edot:"\u0117",ee:"\u2147",efDot:"\u2252",Efr:"\u{1D508}",efr:"\u{1D522}",eg:"\u2A9A",Egrave:"\xC8",egrave:"\xE8",egs:"\u2A96",egsdot:"\u2A98",el:"\u2A99",Element:"\u2208",elinters:"\u23E7",ell:"\u2113",els:"\u2A95",elsdot:"\u2A97",Emacr:"\u0112",emacr:"\u0113",empty:"\u2205",emptyset:"\u2205",EmptySmallSquare:"\u25FB",emptyv:"\u2205",EmptyVerySmallSquare:"\u25AB",emsp:"\u2003",emsp13:"\u2004",emsp14:"\u2005",ENG:"\u014A",eng:"\u014B",ensp:"\u2002",Eogon:"\u0118",eogon:"\u0119",Eopf:"\u{1D53C}",eopf:"\u{1D556}",epar:"\u22D5",eparsl:"\u29E3",eplus:"\u2A71",epsi:"\u03B5",Epsilon:"\u0395",epsilon:"\u03B5",epsiv:"\u03F5",eqcirc:"\u2256",eqcolon:"\u2255",eqsim:"\u2242",eqslantgtr:"\u2A96",eqslantless:"\u2A95",Equal:"\u2A75",equals:"=",EqualTilde:"\u2242",equest:"\u225F",Equilibrium:"\u21CC",equiv:"\u2261",equivDD:"\u2A78",eqvparsl:"\u29E5",erarr:"\u2971",erDot:"\u2253",Escr:"\u2130",escr:"\u212F",esdot:"\u2250",Esim:"\u2A73",esim:"\u2242",Eta:"\u0397",eta:"\u03B7",ETH:"\xD0",eth:"\xF0",Euml:"\xCB",euml:"\xEB",euro:"\u20AC",excl:"!",exist:"\u2203",Exists:"\u2203",expectation:"\u2130",ExponentialE:"\u2147",exponentiale:"\u2147",fallingdotseq:"\u2252",Fcy:"\u0424",fcy:"\u0444",female:"\u2640",ffilig:"\uFB03",fflig:"\uFB00",ffllig:"\uFB04",Ffr:"\u{1D509}",ffr:"\u{1D523}",filig:"\uFB01",FilledSmallSquare:"\u25FC",FilledVerySmallSquare:"\u25AA",fjlig:"fj",flat:"\u266D",fllig:"\uFB02",fltns:"\u25B1",fnof:"\u0192",Fopf:"\u{1D53D}",fopf:"\u{1D557}",ForAll:"\u2200",forall:"\u2200",fork:"\u22D4",forkv:"\u2AD9",Fouriertrf:"\u2131",fpartint:"\u2A0D",frac12:"\xBD",frac13:"\u2153",frac14:"\xBC",frac15:"\u2155",frac16:"\u2159",frac18:"\u215B",frac23:"\u2154",frac25:"\u2156",frac34:"\xBE",frac35:"\u2157",frac38:"\u215C",frac45:"\u2158",frac56:"\u215A",frac58:"\u215D",frac78:"\u215E",frasl:"\u2044",frown:"\u2322",Fscr:"\u2131",fscr:"\u{1D4BB}",gacute:"\u01F5",Gamma:"\u0393",gamma:"\u03B3",Gammad:"\u03DC",gammad:"\u03DD",gap:"\u2A86",Gbreve:"\u011E",gbreve:"\u011F",Gcedil:"\u0122",Gcirc:"\u011C",gcirc:"\u011D",Gcy:"\u0413",gcy:"\u0433",Gdot:"\u0120",gdot:"\u0121",gE:"\u2267",ge:"\u2265",gEl:"\u2A8C",gel:"\u22DB",geq:"\u2265",geqq:"\u2267",geqslant:"\u2A7E",ges:"\u2A7E",gescc:"\u2AA9",gesdot:"\u2A80",gesdoto:"\u2A82",gesdotol:"\u2A84",gesl:"\u22DB\uFE00",gesles:"\u2A94",Gfr:"\u{1D50A}",gfr:"\u{1D524}",Gg:"\u22D9",gg:"\u226B",ggg:"\u22D9",gimel:"\u2137",GJcy:"\u0403",gjcy:"\u0453",gl:"\u2277",gla:"\u2AA5",glE:"\u2A92",glj:"\u2AA4",gnap:"\u2A8A",gnapprox:"\u2A8A",gnE:"\u2269",gne:"\u2A88",gneq:"\u2A88",gneqq:"\u2269",gnsim:"\u22E7",Gopf:"\u{1D53E}",gopf:"\u{1D558}",grave:"`",GreaterEqual:"\u2265",GreaterEqualLess:"\u22DB",GreaterFullEqual:"\u2267",GreaterGreater:"\u2AA2",GreaterLess:"\u2277",GreaterSlantEqual:"\u2A7E",GreaterTilde:"\u2273",Gscr:"\u{1D4A2}",gscr:"\u210A",gsim:"\u2273",gsime:"\u2A8E",gsiml:"\u2A90",Gt:"\u226B",GT:">",gt:">",gtcc:"\u2AA7",gtcir:"\u2A7A",gtdot:"\u22D7",gtlPar:"\u2995",gtquest:"\u2A7C",gtrapprox:"\u2A86",gtrarr:"\u2978",gtrdot:"\u22D7",gtreqless:"\u22DB",gtreqqless:"\u2A8C",gtrless:"\u2277",gtrsim:"\u2273",gvertneqq:"\u2269\uFE00",gvnE:"\u2269\uFE00",Hacek:"\u02C7",hairsp:"\u200A",half:"\xBD",hamilt:"\u210B",HARDcy:"\u042A",hardcy:"\u044A",hArr:"\u21D4",harr:"\u2194",harrcir:"\u2948",harrw:"\u21AD",Hat:"^",hbar:"\u210F",Hcirc:"\u0124",hcirc:"\u0125",hearts:"\u2665",heartsuit:"\u2665",hellip:"\u2026",hercon:"\u22B9",Hfr:"\u210C",hfr:"\u{1D525}",HilbertSpace:"\u210B",hksearow:"\u2925",hkswarow:"\u2926",hoarr:"\u21FF",homtht:"\u223B",hookleftarrow:"\u21A9",hookrightarrow:"\u21AA",Hopf:"\u210D",hopf:"\u{1D559}",horbar:"\u2015",HorizontalLine:"\u2500",Hscr:"\u210B",hscr:"\u{1D4BD}",hslash:"\u210F",Hstrok:"\u0126",hstrok:"\u0127",HumpDownHump:"\u224E",HumpEqual:"\u224F",hybull:"\u2043",hyphen:"\u2010",Iacute:"\xCD",iacute:"\xED",ic:"\u2063",Icirc:"\xCE",icirc:"\xEE",Icy:"\u0418",icy:"\u0438",Idot:"\u0130",IEcy:"\u0415",iecy:"\u0435",iexcl:"\xA1",iff:"\u21D4",Ifr:"\u2111",ifr:"\u{1D526}",Igrave:"\xCC",igrave:"\xEC",ii:"\u2148",iiiint:"\u2A0C",iiint:"\u222D",iinfin:"\u29DC",iiota:"\u2129",IJlig:"\u0132",ijlig:"\u0133",Im:"\u2111",Imacr:"\u012A",imacr:"\u012B",image:"\u2111",ImaginaryI:"\u2148",imagline:"\u2110",imagpart:"\u2111",imath:"\u0131",imof:"\u22B7",imped:"\u01B5",Implies:"\u21D2",in:"\u2208",incare:"\u2105",infin:"\u221E",infintie:"\u29DD",inodot:"\u0131",Int:"\u222C",int:"\u222B",intcal:"\u22BA",integers:"\u2124",Integral:"\u222B",intercal:"\u22BA",Intersection:"\u22C2",intlarhk:"\u2A17",intprod:"\u2A3C",InvisibleComma:"\u2063",InvisibleTimes:"\u2062",IOcy:"\u0401",iocy:"\u0451",Iogon:"\u012E",iogon:"\u012F",Iopf:"\u{1D540}",iopf:"\u{1D55A}",Iota:"\u0399",iota:"\u03B9",iprod:"\u2A3C",iquest:"\xBF",Iscr:"\u2110",iscr:"\u{1D4BE}",isin:"\u2208",isindot:"\u22F5",isinE:"\u22F9",isins:"\u22F4",isinsv:"\u22F3",isinv:"\u2208",it:"\u2062",Itilde:"\u0128",itilde:"\u0129",Iukcy:"\u0406",iukcy:"\u0456",Iuml:"\xCF",iuml:"\xEF",Jcirc:"\u0134",jcirc:"\u0135",Jcy:"\u0419",jcy:"\u0439",Jfr:"\u{1D50D}",jfr:"\u{1D527}",jmath:"\u0237",Jopf:"\u{1D541}",jopf:"\u{1D55B}",Jscr:"\u{1D4A5}",jscr:"\u{1D4BF}",Jsercy:"\u0408",jsercy:"\u0458",Jukcy:"\u0404",jukcy:"\u0454",Kappa:"\u039A",kappa:"\u03BA",kappav:"\u03F0",Kcedil:"\u0136",kcedil:"\u0137",Kcy:"\u041A",kcy:"\u043A",Kfr:"\u{1D50E}",kfr:"\u{1D528}",kgreen:"\u0138",KHcy:"\u0425",khcy:"\u0445",KJcy:"\u040C",kjcy:"\u045C",Kopf:"\u{1D542}",kopf:"\u{1D55C}",Kscr:"\u{1D4A6}",kscr:"\u{1D4C0}",lAarr:"\u21DA",Lacute:"\u0139",lacute:"\u013A",laemptyv:"\u29B4",lagran:"\u2112",Lambda:"\u039B",lambda:"\u03BB",Lang:"\u27EA",lang:"\u27E8",langd:"\u2991",langle:"\u27E8",lap:"\u2A85",Laplacetrf:"\u2112",laquo:"\xAB",Larr:"\u219E",lArr:"\u21D0",larr:"\u2190",larrb:"\u21E4",larrbfs:"\u291F",larrfs:"\u291D",larrhk:"\u21A9",larrlp:"\u21AB",larrpl:"\u2939",larrsim:"\u2973",larrtl:"\u21A2",lat:"\u2AAB",lAtail:"\u291B",latail:"\u2919",late:"\u2AAD",lates:"\u2AAD\uFE00",lBarr:"\u290E",lbarr:"\u290C",lbbrk:"\u2772",lbrace:"{",lbrack:"[",lbrke:"\u298B",lbrksld:"\u298F",lbrkslu:"\u298D",Lcaron:"\u013D",lcaron:"\u013E",Lcedil:"\u013B",lcedil:"\u013C",lceil:"\u2308",lcub:"{",Lcy:"\u041B",lcy:"\u043B",ldca:"\u2936",ldquo:"\u201C",ldquor:"\u201E",ldrdhar:"\u2967",ldrushar:"\u294B",ldsh:"\u21B2",lE:"\u2266",le:"\u2264",LeftAngleBracket:"\u27E8",LeftArrow:"\u2190",Leftarrow:"\u21D0",leftarrow:"\u2190",LeftArrowBar:"\u21E4",LeftArrowRightArrow:"\u21C6",leftarrowtail:"\u21A2",LeftCeiling:"\u2308",LeftDoubleBracket:"\u27E6",LeftDownTeeVector:"\u2961",LeftDownVector:"\u21C3",LeftDownVectorBar:"\u2959",LeftFloor:"\u230A",leftharpoondown:"\u21BD",leftharpoonup:"\u21BC",leftleftarrows:"\u21C7",LeftRightArrow:"\u2194",Leftrightarrow:"\u21D4",leftrightarrow:"\u2194",leftrightarrows:"\u21C6",leftrightharpoons:"\u21CB",leftrightsquigarrow:"\u21AD",LeftRightVector:"\u294E",LeftTee:"\u22A3",LeftTeeArrow:"\u21A4",LeftTeeVector:"\u295A",leftthreetimes:"\u22CB",LeftTriangle:"\u22B2",LeftTriangleBar:"\u29CF",LeftTriangleEqual:"\u22B4",LeftUpDownVector:"\u2951",LeftUpTeeVector:"\u2960",LeftUpVector:"\u21BF",LeftUpVectorBar:"\u2958",LeftVector:"\u21BC",LeftVectorBar:"\u2952",lEg:"\u2A8B",leg:"\u22DA",leq:"\u2264",leqq:"\u2266",leqslant:"\u2A7D",les:"\u2A7D",lescc:"\u2AA8",lesdot:"\u2A7F",lesdoto:"\u2A81",lesdotor:"\u2A83",lesg:"\u22DA\uFE00",lesges:"\u2A93",lessapprox:"\u2A85",lessdot:"\u22D6",lesseqgtr:"\u22DA",lesseqqgtr:"\u2A8B",LessEqualGreater:"\u22DA",LessFullEqual:"\u2266",LessGreater:"\u2276",lessgtr:"\u2276",LessLess:"\u2AA1",lesssim:"\u2272",LessSlantEqual:"\u2A7D",LessTilde:"\u2272",lfisht:"\u297C",lfloor:"\u230A",Lfr:"\u{1D50F}",lfr:"\u{1D529}",lg:"\u2276",lgE:"\u2A91",lHar:"\u2962",lhard:"\u21BD",lharu:"\u21BC",lharul:"\u296A",lhblk:"\u2584",LJcy:"\u0409",ljcy:"\u0459",Ll:"\u22D8",ll:"\u226A",llarr:"\u21C7",llcorner:"\u231E",Lleftarrow:"\u21DA",llhard:"\u296B",lltri:"\u25FA",Lmidot:"\u013F",lmidot:"\u0140",lmoust:"\u23B0",lmoustache:"\u23B0",lnap:"\u2A89",lnapprox:"\u2A89",lnE:"\u2268",lne:"\u2A87",lneq:"\u2A87",lneqq:"\u2268",lnsim:"\u22E6",loang:"\u27EC",loarr:"\u21FD",lobrk:"\u27E6",LongLeftArrow:"\u27F5",Longleftarrow:"\u27F8",longleftarrow:"\u27F5",LongLeftRightArrow:"\u27F7",Longleftrightarrow:"\u27FA",longleftrightarrow:"\u27F7",longmapsto:"\u27FC",LongRightArrow:"\u27F6",Longrightarrow:"\u27F9",longrightarrow:"\u27F6",looparrowleft:"\u21AB",looparrowright:"\u21AC",lopar:"\u2985",Lopf:"\u{1D543}",lopf:"\u{1D55D}",loplus:"\u2A2D",lotimes:"\u2A34",lowast:"\u2217",lowbar:"_",LowerLeftArrow:"\u2199",LowerRightArrow:"\u2198",loz:"\u25CA",lozenge:"\u25CA",lozf:"\u29EB",lpar:"(",lparlt:"\u2993",lrarr:"\u21C6",lrcorner:"\u231F",lrhar:"\u21CB",lrhard:"\u296D",lrm:"\u200E",lrtri:"\u22BF",lsaquo:"\u2039",Lscr:"\u2112",lscr:"\u{1D4C1}",Lsh:"\u21B0",lsh:"\u21B0",lsim:"\u2272",lsime:"\u2A8D",lsimg:"\u2A8F",lsqb:"[",lsquo:"\u2018",lsquor:"\u201A",Lstrok:"\u0141",lstrok:"\u0142",Lt:"\u226A",LT:"<",lt:"<",ltcc:"\u2AA6",ltcir:"\u2A79",ltdot:"\u22D6",lthree:"\u22CB",ltimes:"\u22C9",ltlarr:"\u2976",ltquest:"\u2A7B",ltri:"\u25C3",ltrie:"\u22B4",ltrif:"\u25C2",ltrPar:"\u2996",lurdshar:"\u294A",luruhar:"\u2966",lvertneqq:"\u2268\uFE00",lvnE:"\u2268\uFE00",macr:"\xAF",male:"\u2642",malt:"\u2720",maltese:"\u2720",Map:"\u2905",map:"\u21A6",mapsto:"\u21A6",mapstodown:"\u21A7",mapstoleft:"\u21A4",mapstoup:"\u21A5",marker:"\u25AE",mcomma:"\u2A29",Mcy:"\u041C",mcy:"\u043C",mdash:"\u2014",mDDot:"\u223A",measuredangle:"\u2221",MediumSpace:"\u205F",Mellintrf:"\u2133",Mfr:"\u{1D510}",mfr:"\u{1D52A}",mho:"\u2127",micro:"\xB5",mid:"\u2223",midast:"*",midcir:"\u2AF0",middot:"\xB7",minus:"\u2212",minusb:"\u229F",minusd:"\u2238",minusdu:"\u2A2A",MinusPlus:"\u2213",mlcp:"\u2ADB",mldr:"\u2026",mnplus:"\u2213",models:"\u22A7",Mopf:"\u{1D544}",mopf:"\u{1D55E}",mp:"\u2213",Mscr:"\u2133",mscr:"\u{1D4C2}",mstpos:"\u223E",Mu:"\u039C",mu:"\u03BC",multimap:"\u22B8",mumap:"\u22B8",nabla:"\u2207",Nacute:"\u0143",nacute:"\u0144",nang:"\u2220\u20D2",nap:"\u2249",napE:"\u2A70\u0338",napid:"\u224B\u0338",napos:"\u0149",napprox:"\u2249",natur:"\u266E",natural:"\u266E",naturals:"\u2115",nbsp:"\xA0",nbump:"\u224E\u0338",nbumpe:"\u224F\u0338",ncap:"\u2A43",Ncaron:"\u0147",ncaron:"\u0148",Ncedil:"\u0145",ncedil:"\u0146",ncong:"\u2247",ncongdot:"\u2A6D\u0338",ncup:"\u2A42",Ncy:"\u041D",ncy:"\u043D",ndash:"\u2013",ne:"\u2260",nearhk:"\u2924",neArr:"\u21D7",nearr:"\u2197",nearrow:"\u2197",nedot:"\u2250\u0338",NegativeMediumSpace:"\u200B",NegativeThickSpace:"\u200B",NegativeThinSpace:"\u200B",NegativeVeryThinSpace:"\u200B",nequiv:"\u2262",nesear:"\u2928",nesim:"\u2242\u0338",NestedGreaterGreater:"\u226B",NestedLessLess:"\u226A",NewLine:`
`,nexist:"\u2204",nexists:"\u2204",Nfr:"\u{1D511}",nfr:"\u{1D52B}",ngE:"\u2267\u0338",nge:"\u2271",ngeq:"\u2271",ngeqq:"\u2267\u0338",ngeqslant:"\u2A7E\u0338",nges:"\u2A7E\u0338",nGg:"\u22D9\u0338",ngsim:"\u2275",nGt:"\u226B\u20D2",ngt:"\u226F",ngtr:"\u226F",nGtv:"\u226B\u0338",nhArr:"\u21CE",nharr:"\u21AE",nhpar:"\u2AF2",ni:"\u220B",nis:"\u22FC",nisd:"\u22FA",niv:"\u220B",NJcy:"\u040A",njcy:"\u045A",nlArr:"\u21CD",nlarr:"\u219A",nldr:"\u2025",nlE:"\u2266\u0338",nle:"\u2270",nLeftarrow:"\u21CD",nleftarrow:"\u219A",nLeftrightarrow:"\u21CE",nleftrightarrow:"\u21AE",nleq:"\u2270",nleqq:"\u2266\u0338",nleqslant:"\u2A7D\u0338",nles:"\u2A7D\u0338",nless:"\u226E",nLl:"\u22D8\u0338",nlsim:"\u2274",nLt:"\u226A\u20D2",nlt:"\u226E",nltri:"\u22EA",nltrie:"\u22EC",nLtv:"\u226A\u0338",nmid:"\u2224",NoBreak:"\u2060",NonBreakingSpace:"\xA0",Nopf:"\u2115",nopf:"\u{1D55F}",Not:"\u2AEC",not:"\xAC",NotCongruent:"\u2262",NotCupCap:"\u226D",NotDoubleVerticalBar:"\u2226",NotElement:"\u2209",NotEqual:"\u2260",NotEqualTilde:"\u2242\u0338",NotExists:"\u2204",NotGreater:"\u226F",NotGreaterEqual:"\u2271",NotGreaterFullEqual:"\u2267\u0338",NotGreaterGreater:"\u226B\u0338",NotGreaterLess:"\u2279",NotGreaterSlantEqual:"\u2A7E\u0338",NotGreaterTilde:"\u2275",NotHumpDownHump:"\u224E\u0338",NotHumpEqual:"\u224F\u0338",notin:"\u2209",notindot:"\u22F5\u0338",notinE:"\u22F9\u0338",notinva:"\u2209",notinvb:"\u22F7",notinvc:"\u22F6",NotLeftTriangle:"\u22EA",NotLeftTriangleBar:"\u29CF\u0338",NotLeftTriangleEqual:"\u22EC",NotLess:"\u226E",NotLessEqual:"\u2270",NotLessGreater:"\u2278",NotLessLess:"\u226A\u0338",NotLessSlantEqual:"\u2A7D\u0338",NotLessTilde:"\u2274",NotNestedGreaterGreater:"\u2AA2\u0338",NotNestedLessLess:"\u2AA1\u0338",notni:"\u220C",notniva:"\u220C",notnivb:"\u22FE",notnivc:"\u22FD",NotPrecedes:"\u2280",NotPrecedesEqual:"\u2AAF\u0338",NotPrecedesSlantEqual:"\u22E0",NotReverseElement:"\u220C",NotRightTriangle:"\u22EB",NotRightTriangleBar:"\u29D0\u0338",NotRightTriangleEqual:"\u22ED",NotSquareSubset:"\u228F\u0338",NotSquareSubsetEqual:"\u22E2",NotSquareSuperset:"\u2290\u0338",NotSquareSupersetEqual:"\u22E3",NotSubset:"\u2282\u20D2",NotSubsetEqual:"\u2288",NotSucceeds:"\u2281",NotSucceedsEqual:"\u2AB0\u0338",NotSucceedsSlantEqual:"\u22E1",NotSucceedsTilde:"\u227F\u0338",NotSuperset:"\u2283\u20D2",NotSupersetEqual:"\u2289",NotTilde:"\u2241",NotTildeEqual:"\u2244",NotTildeFullEqual:"\u2247",NotTildeTilde:"\u2249",NotVerticalBar:"\u2224",npar:"\u2226",nparallel:"\u2226",nparsl:"\u2AFD\u20E5",npart:"\u2202\u0338",npolint:"\u2A14",npr:"\u2280",nprcue:"\u22E0",npre:"\u2AAF\u0338",nprec:"\u2280",npreceq:"\u2AAF\u0338",nrArr:"\u21CF",nrarr:"\u219B",nrarrc:"\u2933\u0338",nrarrw:"\u219D\u0338",nRightarrow:"\u21CF",nrightarrow:"\u219B",nrtri:"\u22EB",nrtrie:"\u22ED",nsc:"\u2281",nsccue:"\u22E1",nsce:"\u2AB0\u0338",Nscr:"\u{1D4A9}",nscr:"\u{1D4C3}",nshortmid:"\u2224",nshortparallel:"\u2226",nsim:"\u2241",nsime:"\u2244",nsimeq:"\u2244",nsmid:"\u2224",nspar:"\u2226",nsqsube:"\u22E2",nsqsupe:"\u22E3",nsub:"\u2284",nsubE:"\u2AC5\u0338",nsube:"\u2288",nsubset:"\u2282\u20D2",nsubseteq:"\u2288",nsubseteqq:"\u2AC5\u0338",nsucc:"\u2281",nsucceq:"\u2AB0\u0338",nsup:"\u2285",nsupE:"\u2AC6\u0338",nsupe:"\u2289",nsupset:"\u2283\u20D2",nsupseteq:"\u2289",nsupseteqq:"\u2AC6\u0338",ntgl:"\u2279",Ntilde:"\xD1",ntilde:"\xF1",ntlg:"\u2278",ntriangleleft:"\u22EA",ntrianglelefteq:"\u22EC",ntriangleright:"\u22EB",ntrianglerighteq:"\u22ED",Nu:"\u039D",nu:"\u03BD",num:"#",numero:"\u2116",numsp:"\u2007",nvap:"\u224D\u20D2",nVDash:"\u22AF",nVdash:"\u22AE",nvDash:"\u22AD",nvdash:"\u22AC",nvge:"\u2265\u20D2",nvgt:">\u20D2",nvHarr:"\u2904",nvinfin:"\u29DE",nvlArr:"\u2902",nvle:"\u2264\u20D2",nvlt:"<\u20D2",nvltrie:"\u22B4\u20D2",nvrArr:"\u2903",nvrtrie:"\u22B5\u20D2",nvsim:"\u223C\u20D2",nwarhk:"\u2923",nwArr:"\u21D6",nwarr:"\u2196",nwarrow:"\u2196",nwnear:"\u2927",Oacute:"\xD3",oacute:"\xF3",oast:"\u229B",ocir:"\u229A",Ocirc:"\xD4",ocirc:"\xF4",Ocy:"\u041E",ocy:"\u043E",odash:"\u229D",Odblac:"\u0150",odblac:"\u0151",odiv:"\u2A38",odot:"\u2299",odsold:"\u29BC",OElig:"\u0152",oelig:"\u0153",ofcir:"\u29BF",Ofr:"\u{1D512}",ofr:"\u{1D52C}",ogon:"\u02DB",Ograve:"\xD2",ograve:"\xF2",ogt:"\u29C1",ohbar:"\u29B5",ohm:"\u03A9",oint:"\u222E",olarr:"\u21BA",olcir:"\u29BE",olcross:"\u29BB",oline:"\u203E",olt:"\u29C0",Omacr:"\u014C",omacr:"\u014D",Omega:"\u03A9",omega:"\u03C9",Omicron:"\u039F",omicron:"\u03BF",omid:"\u29B6",ominus:"\u2296",Oopf:"\u{1D546}",oopf:"\u{1D560}",opar:"\u29B7",OpenCurlyDoubleQuote:"\u201C",OpenCurlyQuote:"\u2018",operp:"\u29B9",oplus:"\u2295",Or:"\u2A54",or:"\u2228",orarr:"\u21BB",ord:"\u2A5D",order:"\u2134",orderof:"\u2134",ordf:"\xAA",ordm:"\xBA",origof:"\u22B6",oror:"\u2A56",orslope:"\u2A57",orv:"\u2A5B",oS:"\u24C8",Oscr:"\u{1D4AA}",oscr:"\u2134",Oslash:"\xD8",oslash:"\xF8",osol:"\u2298",Otilde:"\xD5",otilde:"\xF5",Otimes:"\u2A37",otimes:"\u2297",otimesas:"\u2A36",Ouml:"\xD6",ouml:"\xF6",ovbar:"\u233D",OverBar:"\u203E",OverBrace:"\u23DE",OverBracket:"\u23B4",OverParenthesis:"\u23DC",par:"\u2225",para:"\xB6",parallel:"\u2225",parsim:"\u2AF3",parsl:"\u2AFD",part:"\u2202",PartialD:"\u2202",Pcy:"\u041F",pcy:"\u043F",percnt:"%",period:".",permil:"\u2030",perp:"\u22A5",pertenk:"\u2031",Pfr:"\u{1D513}",pfr:"\u{1D52D}",Phi:"\u03A6",phi:"\u03C6",phiv:"\u03D5",phmmat:"\u2133",phone:"\u260E",Pi:"\u03A0",pi:"\u03C0",pitchfork:"\u22D4",piv:"\u03D6",planck:"\u210F",planckh:"\u210E",plankv:"\u210F",plus:"+",plusacir:"\u2A23",plusb:"\u229E",pluscir:"\u2A22",plusdo:"\u2214",plusdu:"\u2A25",pluse:"\u2A72",PlusMinus:"\xB1",plusmn:"\xB1",plussim:"\u2A26",plustwo:"\u2A27",pm:"\xB1",Poincareplane:"\u210C",pointint:"\u2A15",Popf:"\u2119",popf:"\u{1D561}",pound:"\xA3",Pr:"\u2ABB",pr:"\u227A",prap:"\u2AB7",prcue:"\u227C",prE:"\u2AB3",pre:"\u2AAF",prec:"\u227A",precapprox:"\u2AB7",preccurlyeq:"\u227C",Precedes:"\u227A",PrecedesEqual:"\u2AAF",PrecedesSlantEqual:"\u227C",PrecedesTilde:"\u227E",preceq:"\u2AAF",precnapprox:"\u2AB9",precneqq:"\u2AB5",precnsim:"\u22E8",precsim:"\u227E",Prime:"\u2033",prime:"\u2032",primes:"\u2119",prnap:"\u2AB9",prnE:"\u2AB5",prnsim:"\u22E8",prod:"\u220F",Product:"\u220F",profalar:"\u232E",profline:"\u2312",profsurf:"\u2313",prop:"\u221D",Proportion:"\u2237",Proportional:"\u221D",propto:"\u221D",prsim:"\u227E",prurel:"\u22B0",Pscr:"\u{1D4AB}",pscr:"\u{1D4C5}",Psi:"\u03A8",psi:"\u03C8",puncsp:"\u2008",Qfr:"\u{1D514}",qfr:"\u{1D52E}",qint:"\u2A0C",Qopf:"\u211A",qopf:"\u{1D562}",qprime:"\u2057",Qscr:"\u{1D4AC}",qscr:"\u{1D4C6}",quaternions:"\u210D",quatint:"\u2A16",quest:"?",questeq:"\u225F",QUOT:'"',quot:'"',rAarr:"\u21DB",race:"\u223D\u0331",Racute:"\u0154",racute:"\u0155",radic:"\u221A",raemptyv:"\u29B3",Rang:"\u27EB",rang:"\u27E9",rangd:"\u2992",range:"\u29A5",rangle:"\u27E9",raquo:"\xBB",Rarr:"\u21A0",rArr:"\u21D2",rarr:"\u2192",rarrap:"\u2975",rarrb:"\u21E5",rarrbfs:"\u2920",rarrc:"\u2933",rarrfs:"\u291E",rarrhk:"\u21AA",rarrlp:"\u21AC",rarrpl:"\u2945",rarrsim:"\u2974",Rarrtl:"\u2916",rarrtl:"\u21A3",rarrw:"\u219D",rAtail:"\u291C",ratail:"\u291A",ratio:"\u2236",rationals:"\u211A",RBarr:"\u2910",rBarr:"\u290F",rbarr:"\u290D",rbbrk:"\u2773",rbrace:"}",rbrack:"]",rbrke:"\u298C",rbrksld:"\u298E",rbrkslu:"\u2990",Rcaron:"\u0158",rcaron:"\u0159",Rcedil:"\u0156",rcedil:"\u0157",rceil:"\u2309",rcub:"}",Rcy:"\u0420",rcy:"\u0440",rdca:"\u2937",rdldhar:"\u2969",rdquo:"\u201D",rdquor:"\u201D",rdsh:"\u21B3",Re:"\u211C",real:"\u211C",realine:"\u211B",realpart:"\u211C",reals:"\u211D",rect:"\u25AD",REG:"\xAE",reg:"\xAE",ReverseElement:"\u220B",ReverseEquilibrium:"\u21CB",ReverseUpEquilibrium:"\u296F",rfisht:"\u297D",rfloor:"\u230B",Rfr:"\u211C",rfr:"\u{1D52F}",rHar:"\u2964",rhard:"\u21C1",rharu:"\u21C0",rharul:"\u296C",Rho:"\u03A1",rho:"\u03C1",rhov:"\u03F1",RightAngleBracket:"\u27E9",RightArrow:"\u2192",Rightarrow:"\u21D2",rightarrow:"\u2192",RightArrowBar:"\u21E5",RightArrowLeftArrow:"\u21C4",rightarrowtail:"\u21A3",RightCeiling:"\u2309",RightDoubleBracket:"\u27E7",RightDownTeeVector:"\u295D",RightDownVector:"\u21C2",RightDownVectorBar:"\u2955",RightFloor:"\u230B",rightharpoondown:"\u21C1",rightharpoonup:"\u21C0",rightleftarrows:"\u21C4",rightleftharpoons:"\u21CC",rightrightarrows:"\u21C9",rightsquigarrow:"\u219D",RightTee:"\u22A2",RightTeeArrow:"\u21A6",RightTeeVector:"\u295B",rightthreetimes:"\u22CC",RightTriangle:"\u22B3",RightTriangleBar:"\u29D0",RightTriangleEqual:"\u22B5",RightUpDownVector:"\u294F",RightUpTeeVector:"\u295C",RightUpVector:"\u21BE",RightUpVectorBar:"\u2954",RightVector:"\u21C0",RightVectorBar:"\u2953",ring:"\u02DA",risingdotseq:"\u2253",rlarr:"\u21C4",rlhar:"\u21CC",rlm:"\u200F",rmoust:"\u23B1",rmoustache:"\u23B1",rnmid:"\u2AEE",roang:"\u27ED",roarr:"\u21FE",robrk:"\u27E7",ropar:"\u2986",Ropf:"\u211D",ropf:"\u{1D563}",roplus:"\u2A2E",rotimes:"\u2A35",RoundImplies:"\u2970",rpar:")",rpargt:"\u2994",rppolint:"\u2A12",rrarr:"\u21C9",Rrightarrow:"\u21DB",rsaquo:"\u203A",Rscr:"\u211B",rscr:"\u{1D4C7}",Rsh:"\u21B1",rsh:"\u21B1",rsqb:"]",rsquo:"\u2019",rsquor:"\u2019",rthree:"\u22CC",rtimes:"\u22CA",rtri:"\u25B9",rtrie:"\u22B5",rtrif:"\u25B8",rtriltri:"\u29CE",RuleDelayed:"\u29F4",ruluhar:"\u2968",rx:"\u211E",Sacute:"\u015A",sacute:"\u015B",sbquo:"\u201A",Sc:"\u2ABC",sc:"\u227B",scap:"\u2AB8",Scaron:"\u0160",scaron:"\u0161",sccue:"\u227D",scE:"\u2AB4",sce:"\u2AB0",Scedil:"\u015E",scedil:"\u015F",Scirc:"\u015C",scirc:"\u015D",scnap:"\u2ABA",scnE:"\u2AB6",scnsim:"\u22E9",scpolint:"\u2A13",scsim:"\u227F",Scy:"\u0421",scy:"\u0441",sdot:"\u22C5",sdotb:"\u22A1",sdote:"\u2A66",searhk:"\u2925",seArr:"\u21D8",searr:"\u2198",searrow:"\u2198",sect:"\xA7",semi:";",seswar:"\u2929",setminus:"\u2216",setmn:"\u2216",sext:"\u2736",Sfr:"\u{1D516}",sfr:"\u{1D530}",sfrown:"\u2322",sharp:"\u266F",SHCHcy:"\u0429",shchcy:"\u0449",SHcy:"\u0428",shcy:"\u0448",ShortDownArrow:"\u2193",ShortLeftArrow:"\u2190",shortmid:"\u2223",shortparallel:"\u2225",ShortRightArrow:"\u2192",ShortUpArrow:"\u2191",shy:"\xAD",Sigma:"\u03A3",sigma:"\u03C3",sigmaf:"\u03C2",sigmav:"\u03C2",sim:"\u223C",simdot:"\u2A6A",sime:"\u2243",simeq:"\u2243",simg:"\u2A9E",simgE:"\u2AA0",siml:"\u2A9D",simlE:"\u2A9F",simne:"\u2246",simplus:"\u2A24",simrarr:"\u2972",slarr:"\u2190",SmallCircle:"\u2218",smallsetminus:"\u2216",smashp:"\u2A33",smeparsl:"\u29E4",smid:"\u2223",smile:"\u2323",smt:"\u2AAA",smte:"\u2AAC",smtes:"\u2AAC\uFE00",SOFTcy:"\u042C",softcy:"\u044C",sol:"/",solb:"\u29C4",solbar:"\u233F",Sopf:"\u{1D54A}",sopf:"\u{1D564}",spades:"\u2660",spadesuit:"\u2660",spar:"\u2225",sqcap:"\u2293",sqcaps:"\u2293\uFE00",sqcup:"\u2294",sqcups:"\u2294\uFE00",Sqrt:"\u221A",sqsub:"\u228F",sqsube:"\u2291",sqsubset:"\u228F",sqsubseteq:"\u2291",sqsup:"\u2290",sqsupe:"\u2292",sqsupset:"\u2290",sqsupseteq:"\u2292",squ:"\u25A1",Square:"\u25A1",square:"\u25A1",SquareIntersection:"\u2293",SquareSubset:"\u228F",SquareSubsetEqual:"\u2291",SquareSuperset:"\u2290",SquareSupersetEqual:"\u2292",SquareUnion:"\u2294",squarf:"\u25AA",squf:"\u25AA",srarr:"\u2192",Sscr:"\u{1D4AE}",sscr:"\u{1D4C8}",ssetmn:"\u2216",ssmile:"\u2323",sstarf:"\u22C6",Star:"\u22C6",star:"\u2606",starf:"\u2605",straightepsilon:"\u03F5",straightphi:"\u03D5",strns:"\xAF",Sub:"\u22D0",sub:"\u2282",subdot:"\u2ABD",subE:"\u2AC5",sube:"\u2286",subedot:"\u2AC3",submult:"\u2AC1",subnE:"\u2ACB",subne:"\u228A",subplus:"\u2ABF",subrarr:"\u2979",Subset:"\u22D0",subset:"\u2282",subseteq:"\u2286",subseteqq:"\u2AC5",SubsetEqual:"\u2286",subsetneq:"\u228A",subsetneqq:"\u2ACB",subsim:"\u2AC7",subsub:"\u2AD5",subsup:"\u2AD3",succ:"\u227B",succapprox:"\u2AB8",succcurlyeq:"\u227D",Succeeds:"\u227B",SucceedsEqual:"\u2AB0",SucceedsSlantEqual:"\u227D",SucceedsTilde:"\u227F",succeq:"\u2AB0",succnapprox:"\u2ABA",succneqq:"\u2AB6",succnsim:"\u22E9",succsim:"\u227F",SuchThat:"\u220B",Sum:"\u2211",sum:"\u2211",sung:"\u266A",Sup:"\u22D1",sup:"\u2283",sup1:"\xB9",sup2:"\xB2",sup3:"\xB3",supdot:"\u2ABE",supdsub:"\u2AD8",supE:"\u2AC6",supe:"\u2287",supedot:"\u2AC4",Superset:"\u2283",SupersetEqual:"\u2287",suphsol:"\u27C9",suphsub:"\u2AD7",suplarr:"\u297B",supmult:"\u2AC2",supnE:"\u2ACC",supne:"\u228B",supplus:"\u2AC0",Supset:"\u22D1",supset:"\u2283",supseteq:"\u2287",supseteqq:"\u2AC6",supsetneq:"\u228B",supsetneqq:"\u2ACC",supsim:"\u2AC8",supsub:"\u2AD4",supsup:"\u2AD6",swarhk:"\u2926",swArr:"\u21D9",swarr:"\u2199",swarrow:"\u2199",swnwar:"\u292A",szlig:"\xDF",Tab:"	",target:"\u2316",Tau:"\u03A4",tau:"\u03C4",tbrk:"\u23B4",Tcaron:"\u0164",tcaron:"\u0165",Tcedil:"\u0162",tcedil:"\u0163",Tcy:"\u0422",tcy:"\u0442",tdot:"\u20DB",telrec:"\u2315",Tfr:"\u{1D517}",tfr:"\u{1D531}",there4:"\u2234",Therefore:"\u2234",therefore:"\u2234",Theta:"\u0398",theta:"\u03B8",thetasym:"\u03D1",thetav:"\u03D1",thickapprox:"\u2248",thicksim:"\u223C",ThickSpace:"\u205F\u200A",thinsp:"\u2009",ThinSpace:"\u2009",thkap:"\u2248",thksim:"\u223C",THORN:"\xDE",thorn:"\xFE",Tilde:"\u223C",tilde:"\u02DC",TildeEqual:"\u2243",TildeFullEqual:"\u2245",TildeTilde:"\u2248",times:"\xD7",timesb:"\u22A0",timesbar:"\u2A31",timesd:"\u2A30",tint:"\u222D",toea:"\u2928",top:"\u22A4",topbot:"\u2336",topcir:"\u2AF1",Topf:"\u{1D54B}",topf:"\u{1D565}",topfork:"\u2ADA",tosa:"\u2929",tprime:"\u2034",TRADE:"\u2122",trade:"\u2122",triangle:"\u25B5",triangledown:"\u25BF",triangleleft:"\u25C3",trianglelefteq:"\u22B4",triangleq:"\u225C",triangleright:"\u25B9",trianglerighteq:"\u22B5",tridot:"\u25EC",trie:"\u225C",triminus:"\u2A3A",TripleDot:"\u20DB",triplus:"\u2A39",trisb:"\u29CD",tritime:"\u2A3B",trpezium:"\u23E2",Tscr:"\u{1D4AF}",tscr:"\u{1D4C9}",TScy:"\u0426",tscy:"\u0446",TSHcy:"\u040B",tshcy:"\u045B",Tstrok:"\u0166",tstrok:"\u0167",twixt:"\u226C",twoheadleftarrow:"\u219E",twoheadrightarrow:"\u21A0",Uacute:"\xDA",uacute:"\xFA",Uarr:"\u219F",uArr:"\u21D1",uarr:"\u2191",Uarrocir:"\u2949",Ubrcy:"\u040E",ubrcy:"\u045E",Ubreve:"\u016C",ubreve:"\u016D",Ucirc:"\xDB",ucirc:"\xFB",Ucy:"\u0423",ucy:"\u0443",udarr:"\u21C5",Udblac:"\u0170",udblac:"\u0171",udhar:"\u296E",ufisht:"\u297E",Ufr:"\u{1D518}",ufr:"\u{1D532}",Ugrave:"\xD9",ugrave:"\xF9",uHar:"\u2963",uharl:"\u21BF",uharr:"\u21BE",uhblk:"\u2580",ulcorn:"\u231C",ulcorner:"\u231C",ulcrop:"\u230F",ultri:"\u25F8",Umacr:"\u016A",umacr:"\u016B",uml:"\xA8",UnderBar:"_",UnderBrace:"\u23DF",UnderBracket:"\u23B5",UnderParenthesis:"\u23DD",Union:"\u22C3",UnionPlus:"\u228E",Uogon:"\u0172",uogon:"\u0173",Uopf:"\u{1D54C}",uopf:"\u{1D566}",UpArrow:"\u2191",Uparrow:"\u21D1",uparrow:"\u2191",UpArrowBar:"\u2912",UpArrowDownArrow:"\u21C5",UpDownArrow:"\u2195",Updownarrow:"\u21D5",updownarrow:"\u2195",UpEquilibrium:"\u296E",upharpoonleft:"\u21BF",upharpoonright:"\u21BE",uplus:"\u228E",UpperLeftArrow:"\u2196",UpperRightArrow:"\u2197",Upsi:"\u03D2",upsi:"\u03C5",upsih:"\u03D2",Upsilon:"\u03A5",upsilon:"\u03C5",UpTee:"\u22A5",UpTeeArrow:"\u21A5",upuparrows:"\u21C8",urcorn:"\u231D",urcorner:"\u231D",urcrop:"\u230E",Uring:"\u016E",uring:"\u016F",urtri:"\u25F9",Uscr:"\u{1D4B0}",uscr:"\u{1D4CA}",utdot:"\u22F0",Utilde:"\u0168",utilde:"\u0169",utri:"\u25B5",utrif:"\u25B4",uuarr:"\u21C8",Uuml:"\xDC",uuml:"\xFC",uwangle:"\u29A7",vangrt:"\u299C",varepsilon:"\u03F5",varkappa:"\u03F0",varnothing:"\u2205",varphi:"\u03D5",varpi:"\u03D6",varpropto:"\u221D",vArr:"\u21D5",varr:"\u2195",varrho:"\u03F1",varsigma:"\u03C2",varsubsetneq:"\u228A\uFE00",varsubsetneqq:"\u2ACB\uFE00",varsupsetneq:"\u228B\uFE00",varsupsetneqq:"\u2ACC\uFE00",vartheta:"\u03D1",vartriangleleft:"\u22B2",vartriangleright:"\u22B3",Vbar:"\u2AEB",vBar:"\u2AE8",vBarv:"\u2AE9",Vcy:"\u0412",vcy:"\u0432",VDash:"\u22AB",Vdash:"\u22A9",vDash:"\u22A8",vdash:"\u22A2",Vdashl:"\u2AE6",Vee:"\u22C1",vee:"\u2228",veebar:"\u22BB",veeeq:"\u225A",vellip:"\u22EE",Verbar:"\u2016",verbar:"|",Vert:"\u2016",vert:"|",VerticalBar:"\u2223",VerticalLine:"|",VerticalSeparator:"\u2758",VerticalTilde:"\u2240",VeryThinSpace:"\u200A",Vfr:"\u{1D519}",vfr:"\u{1D533}",vltri:"\u22B2",vnsub:"\u2282\u20D2",vnsup:"\u2283\u20D2",Vopf:"\u{1D54D}",vopf:"\u{1D567}",vprop:"\u221D",vrtri:"\u22B3",Vscr:"\u{1D4B1}",vscr:"\u{1D4CB}",vsubnE:"\u2ACB\uFE00",vsubne:"\u228A\uFE00",vsupnE:"\u2ACC\uFE00",vsupne:"\u228B\uFE00",Vvdash:"\u22AA",vzigzag:"\u299A",Wcirc:"\u0174",wcirc:"\u0175",wedbar:"\u2A5F",Wedge:"\u22C0",wedge:"\u2227",wedgeq:"\u2259",weierp:"\u2118",Wfr:"\u{1D51A}",wfr:"\u{1D534}",Wopf:"\u{1D54E}",wopf:"\u{1D568}",wp:"\u2118",wr:"\u2240",wreath:"\u2240",Wscr:"\u{1D4B2}",wscr:"\u{1D4CC}",xcap:"\u22C2",xcirc:"\u25EF",xcup:"\u22C3",xdtri:"\u25BD",Xfr:"\u{1D51B}",xfr:"\u{1D535}",xhArr:"\u27FA",xharr:"\u27F7",Xi:"\u039E",xi:"\u03BE",xlArr:"\u27F8",xlarr:"\u27F5",xmap:"\u27FC",xnis:"\u22FB",xodot:"\u2A00",Xopf:"\u{1D54F}",xopf:"\u{1D569}",xoplus:"\u2A01",xotime:"\u2A02",xrArr:"\u27F9",xrarr:"\u27F6",Xscr:"\u{1D4B3}",xscr:"\u{1D4CD}",xsqcup:"\u2A06",xuplus:"\u2A04",xutri:"\u25B3",xvee:"\u22C1",xwedge:"\u22C0",Yacute:"\xDD",yacute:"\xFD",YAcy:"\u042F",yacy:"\u044F",Ycirc:"\u0176",ycirc:"\u0177",Ycy:"\u042B",ycy:"\u044B",yen:"\xA5",Yfr:"\u{1D51C}",yfr:"\u{1D536}",YIcy:"\u0407",yicy:"\u0457",Yopf:"\u{1D550}",yopf:"\u{1D56A}",Yscr:"\u{1D4B4}",yscr:"\u{1D4CE}",YUcy:"\u042E",yucy:"\u044E",Yuml:"\u0178",yuml:"\xFF",Zacute:"\u0179",zacute:"\u017A",Zcaron:"\u017D",zcaron:"\u017E",Zcy:"\u0417",zcy:"\u0437",Zdot:"\u017B",zdot:"\u017C",zeetrf:"\u2128",ZeroWidthSpace:"\u200B",Zeta:"\u0396",zeta:"\u03B6",Zfr:"\u2128",zfr:"\u{1D537}",ZHcy:"\u0416",zhcy:"\u0436",zigrarr:"\u21DD",Zopf:"\u2124",zopf:"\u{1D56B}",Zscr:"\u{1D4B5}",zscr:"\u{1D4CF}",zwj:"\u200D",zwnj:"\u200C"}),ne.entityMap=ne.HTML_ENTITIES},3969:function(xe,ne,z){var J,A=z(41146);J=A.DOMImplementation,J=A.XMLSerializer,ne.DOMParser=z(86129).DOMParser},76925:function(xe,ne,z){var J=z(72167).NAMESPACE,A=/[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,$=new RegExp("[\\-\\.0-9"+A.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),I=new RegExp("^"+A.source+$.source+"*(?::"+A.source+$.source+"*)?$"),te=0,O=1,ce=2,se=3,fe=4,be=5,ke=6,X=7;function me(y,C){this.message=y,this.locator=C,Error.captureStackTrace&&Error.captureStackTrace(this,me)}me.prototype=new Error,me.prototype.name=me.name;function ye(){}ye.prototype={parse:function(y,C,N){var K=this.domBuilder;K.startDocument(),Le(C,C={}),Fe(y,C,N,K,this.errorHandler),K.endDocument()}};function Fe(y,C,N,K,Q){function ae(he){if(he>65535){he-=65536;var Dt=55296+(he>>10),Ws=56320+(he&1023);return String.fromCharCode(Dt,Ws)}else return String.fromCharCode(he)}function oe(he){var Dt=he.slice(1,-1);return Object.hasOwnProperty.call(N,Dt)?N[Dt]:Dt.charAt(0)==="#"?ae(parseInt(Dt.substr(1).replace("x","0x"))):(Q.error("entity not found:"+he),he)}function ge(he){if(he>Ve){var Dt=y.substring(Ve,he).replace(/&#?\w+;/g,oe);Te&&ie(Ve),K.characters(Dt,0,he-Ve),Ve=he}}function ie(he,Dt){for(;he>=ee&&(Dt=re.exec(y));)le=Dt.index,ee=le+Dt[0].length,Te.lineNumber++;Te.columnNumber=he-le+1}for(var le=0,ee=0,re=/.*(?:\r\n?|\n)|.*$/g,Te=K.locator,De=[{currentNSMap:C}],ze={},Ve=0;;){try{var _e=y.indexOf("<",Ve);if(_e<0){if(!y.substr(Ve).match(/^\s*$/)){var ut=K.doc,ct=ut.createTextNode(y.substr(Ve));ut.appendChild(ct),K.currentElement=ct}return}switch(_e>Ve&&ge(_e),y.charAt(_e+1)){case"/":var dt=y.indexOf(">",_e+3),at=y.substring(_e+2,dt).replace(/[ \t\n\r]+$/g,""),At=De.pop();dt<0?(at=y.substring(_e+2).replace(/[\s<].*/,""),Q.error("end tag name: "+at+" is not complete:"+At.tagName),dt=_e+1+at.length):at.match(/\s</)&&(at=at.replace(/[\s<].*/,""),Q.error("end tag name: "+at+" maybe not complete"),dt=_e+1+at.length);var Nt=At.localNSMap,ui=At.tagName==at,vn=ui||At.tagName&&At.tagName.toLowerCase()==at.toLowerCase();if(vn){if(K.endElement(At.uri,At.localName,at),Nt)for(var Xi in Nt)Object.prototype.hasOwnProperty.call(Nt,Xi)&&K.endPrefixMapping(Xi);ui||Q.fatalError("end tag name: "+at+" is not match the current start tagName:"+At.tagName)}else De.push(At);dt++;break;case"?":Te&&ie(_e),dt=Ne(y,_e,K);break;case"!":Te&&ie(_e),dt=we(y,_e,K,Q);break;default:Te&&ie(_e);var Ie=new Ze,Ni=De[De.length-1].currentNSMap,dt=nt(y,_e,Ie,Ni,oe,Q),ci=Ie.length;if(!Ie.closed&&Ce(y,dt,Ie.tagName,ze)&&(Ie.closed=!0,N.nbsp||Q.warning("unclosed xml attribute")),Te&&ci){for(var An=vt(Te,{}),Si=0;Si<ci;Si++){var Mi=Ie[Si];ie(Mi.offset),Mi.locator=vt(Te,{})}K.locator=An,We(Ie,K,Ni)&&De.push(Ie),K.locator=Te}else We(Ie,K,Ni)&&De.push(Ie);J.isHTML(Ie.uri)&&!Ie.closed?dt=G(y,dt,Ie.tagName,oe,K):dt++}}catch(he){if(he instanceof me)throw he;Q.error("element parse error: "+he),dt=-1}dt>Ve?Ve=dt:ge(Math.max(_e,Ve)+1)}}function vt(y,C){return C.lineNumber=y.lineNumber,C.columnNumber=y.columnNumber,C}function nt(y,C,N,K,Q,ae){function oe(De,ze,Ve){N.attributeNames.hasOwnProperty(De)&&ae.fatalError("Attribute "+De+" redefined"),N.addValue(De,ze.replace(/[\t\n\r]/g," ").replace(/&#?\w+;/g,Q),Ve)}for(var ge,ie,le=++C,ee=te;;){var re=y.charAt(le);switch(re){case"=":if(ee===O)ge=y.slice(C,le),ee=se;else if(ee===ce)ee=se;else throw new Error("attribute equal must after attrName");break;case"'":case'"':if(ee===se||ee===O)if(ee===O&&(ae.warning('attribute value must after "="'),ge=y.slice(C,le)),C=le+1,le=y.indexOf(re,C),le>0)ie=y.slice(C,le),oe(ge,ie,C-1),ee=be;else throw new Error("attribute value no end '"+re+"' match");else if(ee==fe)ie=y.slice(C,le),oe(ge,ie,C),ae.warning('attribute "'+ge+'" missed start quot('+re+")!!"),C=le+1,ee=be;else throw new Error('attribute value must after "="');break;case"/":switch(ee){case te:N.setTagName(y.slice(C,le));case be:case ke:case X:ee=X,N.closed=!0;case fe:case O:break;case ce:N.closed=!0;break;default:throw new Error("attribute invalid close char('/')")}break;case"":return ae.error("unexpected end of input"),ee==te&&N.setTagName(y.slice(C,le)),le;case">":switch(ee){case te:N.setTagName(y.slice(C,le));case be:case ke:case X:break;case fe:case O:ie=y.slice(C,le),ie.slice(-1)==="/"&&(N.closed=!0,ie=ie.slice(0,-1));case ce:ee===ce&&(ie=ge),ee==fe?(ae.warning('attribute "'+ie+'" missed quot(")!'),oe(ge,ie,C)):((!J.isHTML(K[""])||!ie.match(/^(?:disabled|checked|selected)$/i))&&ae.warning('attribute "'+ie+'" missed value!! "'+ie+'" instead!!'),oe(ie,ie,C));break;case se:throw new Error("attribute value missed!!")}return le;case"\x80":re=" ";default:if(re<=" ")switch(ee){case te:N.setTagName(y.slice(C,le)),ee=ke;break;case O:ge=y.slice(C,le),ee=ce;break;case fe:var ie=y.slice(C,le);ae.warning('attribute "'+ie+'" missed quot(")!!'),oe(ge,ie,C);case be:ee=ke;break}else switch(ee){case ce:var Te=N.tagName;(!J.isHTML(K[""])||!ge.match(/^(?:disabled|checked|selected)$/i))&&ae.warning('attribute "'+ge+'" missed value!! "'+ge+'" instead2!!'),oe(ge,ge,C),C=le,ee=O;break;case be:ae.warning('attribute space is required"'+ge+'"!!');case ke:ee=O,C=le;break;case se:ee=fe,C=le;break;case X:throw new Error("elements closed character '/' and '>' must be connected to")}}le++}}function We(y,C,N){for(var K=y.tagName,Q=null,re=y.length;re--;){var ae=y[re],oe=ae.qName,ge=ae.value,Te=oe.indexOf(":");if(Te>0)var ie=ae.prefix=oe.slice(0,Te),le=oe.slice(Te+1),ee=ie==="xmlns"&&le;else le=oe,ie=null,ee=oe==="xmlns"&&"";ae.localName=le,ee!==!1&&(Q==null&&(Q={},Le(N,N={})),N[ee]=Q[ee]=ge,ae.uri=J.XMLNS,C.startPrefixMapping(ee,ge))}for(var re=y.length;re--;){ae=y[re];var ie=ae.prefix;ie&&(ie==="xml"&&(ae.uri=J.XML),ie!=="xmlns"&&(ae.uri=N[ie||""]))}var Te=K.indexOf(":");Te>0?(ie=y.prefix=K.slice(0,Te),le=y.localName=K.slice(Te+1)):(ie=null,le=y.localName=K);var De=y.uri=N[ie||""];if(C.startElement(De,le,K,y),y.closed){if(C.endElement(De,le,K),Q)for(ie in Q)Object.prototype.hasOwnProperty.call(Q,ie)&&C.endPrefixMapping(ie)}else return y.currentNSMap=N,y.localNSMap=Q,!0}function G(y,C,N,K,Q){if(/^(?:script|textarea)$/i.test(N)){var ae=y.indexOf("</"+N+">",C),oe=y.substring(C+1,ae);if(/[&<]/.test(oe))return/^script$/i.test(N)?(Q.characters(oe,0,oe.length),ae):(oe=oe.replace(/&#?\w+;/g,K),Q.characters(oe,0,oe.length),ae)}return C+1}function Ce(y,C,N,K){var Q=K[N];return Q==null&&(Q=y.lastIndexOf("</"+N+">"),Q<C&&(Q=y.lastIndexOf("</"+N)),K[N]=Q),Q<C}function Le(y,C){for(var N in y)Object.prototype.hasOwnProperty.call(y,N)&&(C[N]=y[N])}function we(y,C,N,K){var Q=y.charAt(C+2);switch(Q){case"-":if(y.charAt(C+3)==="-"){var ae=y.indexOf("-->",C+4);return ae>C?(N.comment(y,C+4,ae-C-4),ae+3):(K.error("Unclosed comment"),-1)}else return-1;default:if(y.substr(C+3,6)=="CDATA["){var ae=y.indexOf("]]>",C+9);return N.startCDATA(),N.characters(y,C+9,ae-C-9),N.endCDATA(),ae+3}var oe=pe(y,C),ge=oe.length;if(ge>1&&/!doctype/i.test(oe[0][0])){var ie=oe[1][0],le=!1,ee=!1;ge>3&&(/^public$/i.test(oe[2][0])?(le=oe[3][0],ee=ge>4&&oe[4][0]):/^system$/i.test(oe[2][0])&&(ee=oe[3][0]));var re=oe[ge-1];return N.startDTD(ie,le,ee),N.endDTD(),re.index+re[0].length}}return-1}function Ne(y,C,N){var K=y.indexOf("?>",C);if(K){var Q=y.substring(C,K).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);if(Q){var ae=Q[0].length;return N.processingInstruction(Q[1],Q[2]),K+2}else return-1}return-1}function Ze(){this.attributeNames={}}Ze.prototype={setTagName:function(y){if(!I.test(y))throw new Error("invalid tagName:"+y);this.tagName=y},addValue:function(y,C,N){if(!I.test(y))throw new Error("invalid attribute:"+y);this.attributeNames[y]=this.length,this[this.length++]={qName:y,value:C,offset:N}},length:0,getLocalName:function(y){return this[y].localName},getLocator:function(y){return this[y].locator},getQName:function(y){return this[y].qName},getURI:function(y){return this[y].uri},getValue:function(y){return this[y].value}};function pe(y,C){var N,K=[],Q=/'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;for(Q.lastIndex=C,Q.exec(y);N=Q.exec(y);)if(K.push(N),N[1])return K}ne.XMLReader=ye,ne.ParseError=me},43571:function(xe,ne,z){"use strict";var J=z(87537),A=z.n(J),$=z(23645),I=z.n($),te=z(61667),O=z.n(te),ce=new URL(z(14763),z.b),se=I()(A()),fe=O()(ce);se.push([xe.id,`.vjs-svg-icon {
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

.vjs-has-started.vjs-paused.vjs-show-big-play-button-on-pause .vjs-big-play-button {
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

.vjs-error .vjs-error-display:before {
  color: #fff;
  content: "X";
  font-family: Arial, Helvetica, sans-serif;
  font-size: 4em;
  left: 0;
  line-height: 1;
  margin-top: -0.5em;
  position: absolute;
  text-shadow: 0.05em 0.05em 0.1em #000;
  text-align: center;
  top: 50%;
  vertical-align: middle;
  width: 100%;
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
  display: block;
  animation: vjs-spinner-show 0s linear 0.3s forwards;
}

.vjs-error .vjs-loading-spinner {
  display: none;
}

.vjs-loading-spinner:before,
.vjs-loading-spinner:after {
  content: "";
  position: absolute;
  margin: -0.6em;
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
`,"",{version:3,sources:["webpack://./node_modules/video.js/dist/video-js.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,4BAA4B;EAC5B,2BAA2B;EAC3B,kBAAkB;EAClB,aAAa;EACb,YAAY;AACd;AACA;EACE,wBAAwB;AAC1B;;AAEA;;EAEE,oCAAoC;AACtC;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;EACpB,2DAAqnO;EACrnO,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;;;;;EAKE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;;;;;EAKE,gBAAgB;AAClB;;AAEA;;EAEE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,sBAAsB;EACtB,WAAW;EACX,sBAAsB;EACtB,kBAAkB;EAClB,UAAU;EACV,eAAe;EACf,cAAc;EACd,mBAAmB;EACnB,kBAAkB;EAClB,yCAAyC;EACzC,mBAAmB;AACrB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,aAAa;AACf;;AAEA;;;EAGE,mBAAmB;AACrB;;AAEA;EACE,oBAAoB;EACpB,kBAAkB;EAClB,oBAAoB;EACpB,4BAA4B;EAC5B,cAAc;EACd,eAAe;EACf,aAAa;EACb,gBAAgB;AAClB;;AAEA;;;;;EAKE,WAAW;EACX,eAAe;AACjB;;AAEA;;;;;EAKE,SAAS;AACX;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,UAAU;EACV,SAAS;EACT,YAAY;AACd;;AAEA;;EAEE,eAAe;EACf,gBAAgB;EAChB,aAAa;EACb,OAAO;EACP,MAAM;EACN,SAAS;EACT,QAAQ;AACV;;AAEA;;EAEE,sBAAsB;EACtB,uBAAuB;EACvB,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,cAAc;EACd,oCAAoC;EACpC,cAAc;EACd,kBAAkB;EAClB,WAAW;AACb;;AAEA;;;EAGE,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,kBAAkB;EAClB,MAAM;EACN,UAAU;AACZ;;AAEA;EACE,yBAAyB;EACzB,qBAAqB;EACrB,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,WAAW;EACX,sBAAsB;EACtB,eAAe;EACf,yCAAyC;EACzC,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,gBAAgB;AAClB;;AAEA;;EAEE,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,iBAAiB;EACjB,UAAU;EACV,cAAc;EACd,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;EACf,UAAU;EACV,4BAA4B;EAC5B,yBAAyB;EACzB,uCAAuC;EACvC,oBAAoB;EACpB,oBAAoB;AACtB;AACA;EACE,UAAU;EACV,WAAW;EACX,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,cAAc;EACd,gCAAgC;AAClC;;AAEA;;EAEE,kBAAkB;EAClB,yBAAyB;EACzB,0CAA0C;EAC1C,kBAAkB;AACpB;;AAEA;;;;EAIE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,cAAc;EACd,qBAAqB;EACrB,kBAAkB;EAClB,oBAAoB;EACpB,oBAAoB;EACpB,qBAAqB;EACrB,gBAAgB;EAChB,wBAAwB;OAEnB,gBAAgB;AACvB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,eAAe;EACf,WAAW;EACX,kBAAkB;EAClB,QAAQ;EACR,UAAU;EACV,UAAU;AACZ;AACA;EACE,8BAA8B;EAC9B,+EAA+E;EAC/E,cAAc;AAChB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,cAAc;EACd,UAAU;EACV,SAAS;EACT,yCAAyC;EACzC,cAAc;AAChB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,gBAAgB;EAChB,SAAS;EACT,gBAAgB;EAChB,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;;;EAGE,yBAAyB;EACzB,0CAA0C;AAC5C;;AAEA;;;;EAIE,sBAAsB;EACtB,cAAc;AAChB;AACA;;;;EAIE,aAAa;AACf;;AAEA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,yBAAyB;EACzB,cAAc;EACd,gBAAgB;EAChB,UAAU;EACV,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,UAAU;EACV,WAAW;EACX,oBAAoB;EACpB,uCAAuC;AACzC;;AAEA;EACE,WAAW;EACX,UAAU;AACZ;;AAEA;EACE,yBAAyB;EACzB,uCAAuC;EACvC,kBAAkB;EAClB,WAAW;EACX,aAAa;EACb,gBAAgB;AAClB;;AAEA;;EAEE,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;EAGE,gBAAgB;AAClB;;AAEA;;EAEE,cAAc;AAChB;;AAEA;EACE,oBAAoB;EACpB,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;AACtB;;AAEA;;;EAGE,WAAW;AACb;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,SAAS;EACT,MAAM;EACN,UAAU;EACV,SAAS;EACT,oBAAoB;AACtB;;AAEA;;;EAGE,cAAc;EACd,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,QAAQ;EACR,WAAW;EACX,yBAAyB;EACzB,uCAAuC;AACzC;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;;EAEE,aAAa;EACb,mBAAmB;EACnB,UAAU;EACV,yCAAyC;AAC3C;;AAEA;EACE,mBAAmB;EACnB,UAAU;EACV,oBAAoB;EACpB,qCAAqC;AACvC;;AAEA;;;EAGE,wBAAwB;AAC1B;;AAEA;;EAEE,UAAU;EACV,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,UAAU;EACV,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;;;EAGE,8BAA8B;AAChC;;AAEA;EACE,SAAS;EACT,mBAAmB;EACnB,WAAW;EACX,gBAAgB;EAChB,UAAU;EACV,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;EACf,UAAU;EACV,aAAa;EACb,mBAAmB;EACnB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,oBAAoB;EACpB,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,cAAc;AAChB;;AAEA;;;EAGE,kBAAkB;EAClB,cAAc;EACd,YAAY;EACZ,SAAS;EACT,UAAU;EACV,QAAQ;AACV;;AAEA;EACE,sBAAsB;AACxB;AACA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,qCAAqC;AACvC;;AAEA;EACE,sBAAsB;EACtB,0CAA0C;EAC1C,oBAAoB;EACpB,WAAW;EACX,YAAY;EACZ,yCAAyC;EACzC,cAAc;EACd,wBAAwB;EACxB,oBAAoB;EACpB,kBAAkB;EAClB,WAAW;EACX,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,cAAc;EACd,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,UAAU;EACV,YAAY;EACZ,sBAAsB;EACtB,UAAU;AACZ;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,qCAAqC;AACvC;;AAEA;EACE,WAAW;EACX,sBAAsB;EACtB,oCAAoC;AACtC;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,UAAU;EACV,yBAAyB;EACzB,eAAe;EACf,2BAA2B;EAC3B,0BAA0B;EAC1B,yBAAyB;EACzB,kEAAkE;OAE7D,qBAAiB;MAAjB,iBAAiB;EACtB,yBAAyB;EACzB,0CAA0C;AAC5C;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,8BAA8B;EAC9B,wBAAwB;AAC1B;;AAEA;EACE,eAAe;EACf,UAAU;AACZ;AACA;EACE,eAAe;EACf,iBAAiB;EACjB,aAAa;AACf;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,UAAU;EACV,UAAU;EACV,WAAW;EACX,iBAAiB;AACnB;;AAEA;EACE,oBAAoB;AACtB;AACA;EACE,mBAAmB;EACnB,UAAU;EACV,kBAAkB;EAClB,mFAAmF;AACrF;AACA;EACE,UAAU;EACV,WAAW;EACX,eAAe;AACjB;AACA;EACE,YAAY;EACZ,mBAAmB;AACrB;AACA;EACE,WAAW;EACX,sBAAsB;AACxB;AACA;EACE,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,UAAU;EACV,aAAa;EACb,uFAAuF;AACzF;;AAEA;EACE,oFAAoF;AACtF;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,UAAU;EACV,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;AACA;EACE,WAAW;EACX,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;AACA;EACE,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,2BAA2B;AAC7B;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,UAAU;EACV,WAAW;EACX,WAAW;EACX,yBAAyB;EACzB,uCAAuC;AACzC;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,sBAAsB;EACtB,0CAA0C;EAC1C,oBAAoB;EACpB,WAAW;EACX,YAAY;EACZ,yCAAyC;EACzC,cAAc;EACd,wBAAwB;EACxB,oBAAoB;EACpB,kBAAkB;EAClB,WAAW;EACX,kBAAkB;EAClB,UAAU;AACZ;;AAEA;;EAEE,cAAc;EACd,cAAc;EACd,mBAAmB;AACrB;;AAEA;;EAEE,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,WAAW;EACX,WAAW;EACX,sBAAsB;EACtB,UAAU;AACZ;;AAEA;EACE,UAAU;EACV,YAAY;AACd;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,qCAAqC;AACvC;;AAEA;EACE,WAAW;EACX,sBAAsB;EACtB,oCAAoC;AACtC;;AAEA;EACE,qBAAqB;EACrB,sBAAsB;EACtB,eAAe;EACf,SAAS;EACT,UAAU;EACV,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,YAAY;AACd;;AAEA;;EAEE,aAAa;AACf;;AAEA;;;EAGE,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,YAAY;EAET,mBAAmB;AACxB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,UAAU;EACV,cAAc;EACd,gBAAgB;AAClB;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,eAAe;EACf,UAAU;EACV,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,oBAAoB;EACpB,cAAc;EACd,gBAAgB;EAChB,WAAW;EACX,cAAc;AAChB;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,UAAU;EACV,WAAW;EACX,oBAAoB;EACpB,aAAa;AACf;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,UAAU;EACV,cAAc;EACd,gBAAgB;EAChB,cAAc;EACd,WAAW;EACX,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;;;;EAIE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,OAAO;EACP,QAAQ;EACR,MAAM;EACN,oBAAoB;AACtB;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;;EAEE,6BAA6B;AAC/B;;AAEA;EACE,eAAe;EACf,UAAU;AACZ;AACA;;EAEE,aAAa;AACf;;AAEA;EACE,eAAe;EACf,UAAU;AACZ;AACA;;EAEE,aAAa;AACf;;AAEA;;EAEE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;AACd;;AAEA;EACE,oBAAoB;EACpB,gBAAgB;EAChB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,SAAS;AACX;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,yCAAyC;EACzC,cAAc;EACd,OAAO;EACP,cAAc;EACd,kBAAkB;EAClB,kBAAkB;EAClB,qCAAqC;EACrC,kBAAkB;EAClB,QAAQ;EACR,sBAAsB;EACtB,WAAW;AACb;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,gBAAgB;EAChB,yCAAyC;EACzC,sBAAsB;EACtB,4BAA4B;EAC5B,UAAU;EACV,WAAW;EACX,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;;EAEE,cAAc;EACd,mDAAmD;AACrD;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,WAAW;EACX,kBAAkB;EAClB,cAAc;EACd,mBAAmB;EACnB,cAAc;EACd,eAAe;EACf,sBAAsB;EACtB,UAAU;EACV,eAAe;EACf,yBAAyB;EACzB,uBAAuB;AACzB;;AAEA;;;;EAIE,+GAA+G;AACjH;;AAEA;;EAEE,oCAAoC;AACtC;;AAEA;;EAEE,oCAAoC;EACpC,sBAAsB;AACxB;;AAEA;EACE;IACE,mBAAmB;EACrB;AACF;AACA;EACE;IACE,yBAAyB;EAC3B;AACF;AACA;EACE;IACE,yBAAyB;EAC3B;EACA;IACE,yBAAyB;EAC3B;EACA;IACE,uBAAuB;EACzB;EACA;IACE,yBAAyB;EAC3B;EACA;IACE,yBAAyB;EAC3B;AACF;AACA;EACE,aAAa;AACf;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,sBAAsB;EACtB,qBAAqB;EACrB,qBAAqB;AACvB;;AAEA;EACE,oBAAoB;EACpB,gBAAgB;EAChB,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,sBAAsB;EACtB,qBAAqB;EACrB,qBAAqB;AACvB;;AAEA;;EAEE,oBAAoB;EACpB,iBAAiB;EACjB,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;;;;;;;;;;;;;;;;EAgBE,aAAa;AACf;AACA;EACE,WAAW;EACX,cAAc;AAChB;AACA;EACE,aAAa;AACf;AACA;EACE,UAAU;EACV,cAAc;AAChB;;AAEA;EACE,yBAAyB;EACzB,wCAAwC;EACxC,WAAW;EACX,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;;;EAGE,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,sBAAsB;AACxB;;AAEA;EACE;IACE,aAAa;IACb,8BAA8B;IAC9B,uBAAuB;IACvB,2BAA2B;EAC7B;EACA;IACE,mBAAmB;EACrB;EACA;IACE,iBAAiB;EACnB;EACA;;;IAGE,0BAA0B;EAC5B;AACF;AACA;EACE,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,qBAAqB;EACrB,sBAAsB;AACxB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;;EAEE,oBAAoB;EACpB,qBAAqB;EACrB,+DAA+D;AACjE;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,sBAAsB;EACtB,kEAAkE;EAClE,cAAc;EACd,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,8BAA8B;EAC9B,yGAAyG;EACzG,gBAAgB;EAChB,gBAAgB;EAChB,wBAAwB;EACxB,4BAA4B;EAC5B,oBAAoB;EACpB,kBAAkB;EAClB,MAAM;EACN,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,SAAS;EACT,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,sBAAsB;AACxB;;AAEA;EACE,UAAU;EACV,sBAAsB;AACxB;;AAEA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;AACA;EACE;IACE,kBAAkB;EACpB;AACF;AACA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,cAAc;AAChB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;AACf",sourcesContent:[`.vjs-svg-icon {
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

.vjs-has-started.vjs-paused.vjs-show-big-play-button-on-pause .vjs-big-play-button {
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

.vjs-error .vjs-error-display:before {
  color: #fff;
  content: "X";
  font-family: Arial, Helvetica, sans-serif;
  font-size: 4em;
  left: 0;
  line-height: 1;
  margin-top: -0.5em;
  position: absolute;
  text-shadow: 0.05em 0.05em 0.1em #000;
  text-align: center;
  top: 50%;
  vertical-align: middle;
  width: 100%;
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
  display: block;
  animation: vjs-spinner-show 0s linear 0.3s forwards;
}

.vjs-error .vjs-loading-spinner {
  display: none;
}

.vjs-loading-spinner:before,
.vjs-loading-spinner:after {
  content: "";
  position: absolute;
  margin: -0.6em;
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
`],sourceRoot:""}]),ne.Z=se},61667:function(xe){"use strict";xe.exports=function(ne,z){return z||(z={}),ne&&(ne=String(ne.__esModule?ne.default:ne),/^['"].*['"]$/.test(ne)&&(ne=ne.slice(1,-1)),z.hash&&(ne+=z.hash),/["'() \t\n]|(%20)/.test(ne)||z.needQuotes?'"'.concat(ne.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):ne)}},18722:function(xe,ne,z){"use strict";var J=z(64836);Object.defineProperty(ne,"__esModule",{value:!0}),ne.default=void 0;var A=J(z(67294)),$=function(O){var ce=O.children;return A.default.createElement("div",{style:{width:"100%",minHeight:"calc(100vh - 232px)"}},ce)},I=ne.default=$},50872:function(xe,ne,z){"use strict";var J=z(64836);Object.defineProperty(ne,"__esModule",{value:!0}),ne.default=ne.VideoJS=void 0;var A=J(z(67294)),$=J(z(5178));z(18754);var I=ne.VideoJS=function(ce){var se=A.default.useRef(null),fe=A.default.useRef(null),be=ce.options,ke=ce.onReady;return A.default.useEffect(function(){if(fe.current){var ye=fe.current;ye.autoplay(be.autoplay),ye.src(be.sources)}else{var X=document.createElement("video-js");X.classList.add("vjs-big-play-centered"),se.current.appendChild(X);var me=fe.current=(0,$.default)(X,be,function(){$.default.log("player is ready"),ke&&ke(me)})}},[be,se]),A.default.useEffect(function(){var X=fe.current;return function(){X&&!X.isDisposed()&&(X.dispose(),fe.current=null)}},[fe]),A.default.createElement("div",{"data-vjs-player":!0},A.default.createElement("div",{ref:se}))},te=ne.default=I},80827:function(xe,ne,z){"use strict";var J=z(64836);Object.defineProperty(ne,"__esModule",{value:!0}),ne.default=void 0;var A=J(z(67294)),$=J(z(18722)),I=J(z(50872)),te=function(){var se=A.default.useRef(null),fe={autoplay:!0,controls:!0,responsive:!0,fluid:!0,sources:[{src:"https://placehold.co/1920x1080.mp4",type:"video/mp4"}]},be=function(X){se.current=X,X.on("waiting",function(){}),X.on("dispose",function(){})};return A.default.createElement($.default,null,A.default.createElement("div",{style:{width:900}},A.default.createElement(I.default,{options:fe,onReady:be})))},O=ne.default=te},89144:function(xe,ne,z){var J=typeof z.g!="undefined"?z.g:typeof window!="undefined"?window:{},A=z(25893),$;typeof document!="undefined"?$=document:($=J["__GLOBAL_DOCUMENT_CACHE@4"],$||($=J["__GLOBAL_DOCUMENT_CACHE@4"]=A)),xe.exports=$},58908:function(xe,ne,z){var J;typeof window!="undefined"?J=window:typeof z.g!="undefined"?J=z.g:typeof self!="undefined"?J=self:J={},xe.exports=J},27376:function(xe){xe.exports=z;var ne=Object.prototype.toString;function z(J){if(!J)return!1;var A=ne.call(J);return A==="[object Function]"||typeof J=="function"&&A!=="[object RegExp]"||typeof window!="undefined"&&(J===window.setTimeout||J===window.alert||J===window.confirm||J===window.prompt)}},27537:function(xe,ne){function z(O){if(O&&typeof O=="object"){var ce=O.which||O.keyCode||O.charCode;ce&&(O=ce)}if(typeof O=="number")return I[O];var se=String(O),fe=J[se.toLowerCase()];if(fe)return fe;var fe=A[se.toLowerCase()];if(fe)return fe;if(se.length===1)return se.charCodeAt(0)}z.isEventKey=function(ce,se){if(ce&&typeof ce=="object"){var fe=ce.which||ce.keyCode||ce.charCode;if(fe==null)return!1;if(typeof se=="string"){var be=J[se.toLowerCase()];if(be)return be===fe;var be=A[se.toLowerCase()];if(be)return be===fe}else if(typeof se=="number")return se===fe;return!1}},ne=xe.exports=z;var J=ne.code=ne.codes={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,"pause/break":19,"caps lock":20,esc:27,space:32,"page up":33,"page down":34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,delete:46,command:91,"left command":91,"right command":93,"numpad *":106,"numpad +":107,"numpad -":109,"numpad .":110,"numpad /":111,"num lock":144,"scroll lock":145,"my computer":182,"my calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},A=ne.aliases={windows:91,"\u21E7":16,"\u2325":18,"\u2303":17,"\u2318":91,ctl:17,control:17,option:18,pause:19,break:19,caps:20,return:13,escape:27,spc:32,spacebar:32,pgup:33,pgdn:34,ins:45,del:46,cmd:91};/*!
 * Programatically add the following
 */for($=97;$<123;$++)J[String.fromCharCode($)]=$-32;for(var $=48;$<58;$++)J[$-48]=$;for($=1;$<13;$++)J["f"+$]=$+111;for($=0;$<10;$++)J["numpad "+$]=$+96;var I=ne.names=ne.title={};for($ in J)I[J[$]]=$;for(var te in A)J[te]=A[te]},84221:function(xe,ne,z){var J=z(46894).getUint64,A=function($){var I=new DataView($.buffer,$.byteOffset,$.byteLength),te={version:$[0],flags:new Uint8Array($.subarray(1,4)),references:[],referenceId:I.getUint32(4),timescale:I.getUint32(8)},O=12;te.version===0?(te.earliestPresentationTime=I.getUint32(O),te.firstOffset=I.getUint32(O+4),O+=8):(te.earliestPresentationTime=J($.subarray(O)),te.firstOffset=J($.subarray(O+8)),O+=16),O+=2;var ce=I.getUint16(O);for(O+=2;ce>0;O+=12,ce--)te.references.push({referenceType:($[O]&128)>>>7,referencedSize:I.getUint32(O)&2147483647,subsegmentDuration:I.getUint32(O+4),startsWithSap:!!($[O+8]&128),sapType:($[O+8]&112)>>>4,sapDeltaTime:I.getUint32(O+8)&268435455});return te};xe.exports=A},51489:function(xe){var ne=9e4,z,J,A,$,I,te,O;z=function(ce){return ce*ne},J=function(ce,se){return ce*se},A=function(ce){return ce/ne},$=function(ce,se){return ce/se},I=function(ce,se){return z($(ce,se))},te=function(ce,se){return J(A(ce),se)},O=function(ce,se,fe){return A(fe?ce:ce-se)},xe.exports={ONE_SECOND_IN_TS:ne,secondsToVideoTs:z,secondsToAudioTs:J,videoTsToSeconds:A,audioTsToSeconds:$,audioTsToVideoTs:I,videoTsToAudioTs:te,metadataTsToSeconds:O}},46894:function(xe){var ne=Math.pow(2,32),z=function(J){var A=new DataView(J.buffer,J.byteOffset,J.byteLength),$;return A.getBigUint64?($=A.getBigUint64(0),$<Number.MAX_SAFE_INTEGER?Number($):$):A.getUint32(0)*ne+A.getUint32(4)};xe.exports={getUint64:z,MAX_UINT32:ne}},75974:function(xe){xe.exports=ne;function ne(z,J){var A,$=null;try{A=JSON.parse(z,J)}catch(I){$=I}return[$,A]}},18754:function(xe,ne,z){"use strict";z.r(ne);var J=z(93379),A=z.n(J),$=z(7795),I=z.n($),te=z(90569),O=z.n(te),ce=z(3565),se=z.n(ce),fe=z(19216),be=z.n(fe),ke=z(44589),X=z.n(ke),me=z(43571),ye={};ye.styleTagTransform=X(),ye.setAttributes=se(),ye.insert=O().bind(null,"head"),ye.domAPI=I(),ye.insertStyleElement=be();var Fe=A()(me.Z,ye);ne.default=me.Z&&me.Z.locals?me.Z.locals:void 0},49945:function(xe){(function(ne){var z=/^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/,J=/^(?=([^\/?#]*))\1([^]*)$/,A=/(?:\/|^)\.(?=\/)/g,$=/(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g,I={buildAbsoluteURL:function(te,O,ce){if(ce=ce||{},te=te.trim(),O=O.trim(),!O){if(!ce.alwaysNormalize)return te;var se=I.parseURL(te);if(!se)throw new Error("Error trying to parse base URL.");return se.path=I.normalizePath(se.path),I.buildURLFromParts(se)}var fe=I.parseURL(O);if(!fe)throw new Error("Error trying to parse relative URL.");if(fe.scheme)return ce.alwaysNormalize?(fe.path=I.normalizePath(fe.path),I.buildURLFromParts(fe)):O;var be=I.parseURL(te);if(!be)throw new Error("Error trying to parse base URL.");if(!be.netLoc&&be.path&&be.path[0]!=="/"){var ke=J.exec(be.path);be.netLoc=ke[1],be.path=ke[2]}be.netLoc&&!be.path&&(be.path="/");var X={scheme:be.scheme,netLoc:fe.netLoc,path:null,params:fe.params,query:fe.query,fragment:fe.fragment};if(!fe.netLoc&&(X.netLoc=be.netLoc,fe.path[0]!=="/"))if(!fe.path)X.path=be.path,fe.params||(X.params=be.params,fe.query||(X.query=be.query));else{var me=be.path,ye=me.substring(0,me.lastIndexOf("/")+1)+fe.path;X.path=I.normalizePath(ye)}return X.path===null&&(X.path=ce.alwaysNormalize?I.normalizePath(fe.path):fe.path),I.buildURLFromParts(X)},parseURL:function(te){var O=z.exec(te);return O?{scheme:O[1]||"",netLoc:O[2]||"",path:O[3]||"",params:O[4]||"",query:O[5]||"",fragment:O[6]||""}:null},normalizePath:function(te){for(te=te.split("").reverse().join("").replace(A,"");te.length!==(te=te.replace($,"")).length;);return te.split("").reverse().join("")},buildURLFromParts:function(te){return te.scheme+te.netLoc+te.path+te.params+te.query+te.fragment}};xe.exports=I})(this)},5178:function(xe,ne,z){"use strict";z.r(ne),z.d(ne,{default:function(){return F}});var J=z(58908),A=z.n(J),$=z(89144),I=z.n($),te=z(27537),O=z.n(te),ce=z(75974),se=z.n(ce),fe=z(9603),be=z.n(fe),ke=z(13407),X=z.n(ke),me=z(49945),ye=z.n(me),Fe="http://example.com",vt=function(e,t){if(/^[a-z]+:/i.test(t))return t;/^data:/.test(e)&&(e=A().location&&A().location.href||"");var i=typeof A().URL=="function",s=/^\/\//.test(e),r=!A().location&&!/\/\//i.test(e);if(i?e=new(A()).URL(e,A().location||Fe):/\/\//i.test(e)||(e=ye().buildAbsoluteURL(A().location&&A().location.href||"",e)),i){var a=new URL(t,e);return r?a.href.slice(Fe.length):s?a.href.slice(a.protocol.length):a.href}return ye().buildAbsoluteURL(e,t)},nt=vt,We=z(87462),G=function(){function n(){this.listeners={}}var e=n.prototype;return e.on=function(i,s){this.listeners[i]||(this.listeners[i]=[]),this.listeners[i].push(s)},e.off=function(i,s){if(!this.listeners[i])return!1;var r=this.listeners[i].indexOf(s);return this.listeners[i]=this.listeners[i].slice(0),this.listeners[i].splice(r,1),r>-1},e.trigger=function(i){var s=this.listeners[i];if(s)if(arguments.length===2)for(var r=s.length,a=0;a<r;++a)s[a].call(this,arguments[1]);else for(var l=Array.prototype.slice.call(arguments,1),h=s.length,m=0;m<h;++m)s[m].apply(this,l)},e.dispose=function(){this.listeners={}},e.pipe=function(i){this.on("data",function(s){i.push(s)})},n}(),Ce=z(48764).lW,Le=function(e){return A().atob?A().atob(e):Ce.from(e,"base64").toString("binary")};function we(n){for(var e=Le(n),t=new Uint8Array(e.length),i=0;i<e.length;i++)t[i]=e.charCodeAt(i);return t}/*! @name m3u8-parser @version 6.2.0 @license Apache-2.0 */class Ne extends G{constructor(){super(),this.buffer=""}push(e){let t;for(this.buffer+=e,t=this.buffer.indexOf(`
`);t>-1;t=this.buffer.indexOf(`
`))this.trigger("data",this.buffer.substring(0,t)),this.buffer=this.buffer.substring(t+1)}}const Ze="	",pe=function(n){const e=/([0-9.]*)?@?([0-9.]*)?/.exec(n||""),t={};return e[1]&&(t.length=parseInt(e[1],10)),e[2]&&(t.offset=parseInt(e[2],10)),t},y=function(){const n="[^=]*",e='"[^"]*"|[^,]*',t="(?:"+n+")=(?:"+e+")";return new RegExp("(?:^|,)("+t+")")},C=function(n){const e={};if(!n)return e;const t=n.split(y());let i=t.length,s;for(;i--;)t[i]!==""&&(s=/([^=]*)=(.*)/.exec(t[i]).slice(1),s[0]=s[0].replace(/^\s+|\s+$/g,""),s[1]=s[1].replace(/^\s+|\s+$/g,""),s[1]=s[1].replace(/^['"](.*)['"]$/g,"$1"),e[s[0]]=s[1]);return e};class N extends G{constructor(){super(),this.customParsers=[],this.tagMappers=[]}push(e){let t,i;if(e=e.trim(),e.length===0)return;if(e[0]!=="#"){this.trigger("data",{type:"uri",uri:e});return}this.tagMappers.reduce((r,a)=>{const l=a(e);return l===e?r:r.concat([l])},[e]).forEach(r=>{for(let a=0;a<this.customParsers.length;a++)if(this.customParsers[a].call(this,r))return;if(r.indexOf("#EXT")!==0){this.trigger("data",{type:"comment",text:r.slice(1)});return}if(r=r.replace("\r",""),t=/^#EXTM3U/.exec(r),t){this.trigger("data",{type:"tag",tagType:"m3u"});return}if(t=/^#EXTINF:([0-9\.]*)?,?(.*)?$/.exec(r),t){i={type:"tag",tagType:"inf"},t[1]&&(i.duration=parseFloat(t[1])),t[2]&&(i.title=t[2]),this.trigger("data",i);return}if(t=/^#EXT-X-TARGETDURATION:([0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"targetduration"},t[1]&&(i.duration=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-VERSION:([0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"version"},t[1]&&(i.version=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-MEDIA-SEQUENCE:(\-?[0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"media-sequence"},t[1]&&(i.number=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-DISCONTINUITY-SEQUENCE:(\-?[0-9.]*)?/.exec(r),t){i={type:"tag",tagType:"discontinuity-sequence"},t[1]&&(i.number=parseInt(t[1],10)),this.trigger("data",i);return}if(t=/^#EXT-X-PLAYLIST-TYPE:(.*)?$/.exec(r),t){i={type:"tag",tagType:"playlist-type"},t[1]&&(i.playlistType=t[1]),this.trigger("data",i);return}if(t=/^#EXT-X-BYTERANGE:(.*)?$/.exec(r),t){i=(0,We.Z)(pe(t[1]),{type:"tag",tagType:"byterange"}),this.trigger("data",i);return}if(t=/^#EXT-X-ALLOW-CACHE:(YES|NO)?/.exec(r),t){i={type:"tag",tagType:"allow-cache"},t[1]&&(i.allowed=!/NO/.test(t[1])),this.trigger("data",i);return}if(t=/^#EXT-X-MAP:(.*)$/.exec(r),t){if(i={type:"tag",tagType:"map"},t[1]){const a=C(t[1]);a.URI&&(i.uri=a.URI),a.BYTERANGE&&(i.byterange=pe(a.BYTERANGE))}this.trigger("data",i);return}if(t=/^#EXT-X-STREAM-INF:(.*)$/.exec(r),t){if(i={type:"tag",tagType:"stream-inf"},t[1]){if(i.attributes=C(t[1]),i.attributes.RESOLUTION){const a=i.attributes.RESOLUTION.split("x"),l={};a[0]&&(l.width=parseInt(a[0],10)),a[1]&&(l.height=parseInt(a[1],10)),i.attributes.RESOLUTION=l}i.attributes.BANDWIDTH&&(i.attributes.BANDWIDTH=parseInt(i.attributes.BANDWIDTH,10)),i.attributes["FRAME-RATE"]&&(i.attributes["FRAME-RATE"]=parseFloat(i.attributes["FRAME-RATE"])),i.attributes["PROGRAM-ID"]&&(i.attributes["PROGRAM-ID"]=parseInt(i.attributes["PROGRAM-ID"],10))}this.trigger("data",i);return}if(t=/^#EXT-X-MEDIA:(.*)$/.exec(r),t){i={type:"tag",tagType:"media"},t[1]&&(i.attributes=C(t[1])),this.trigger("data",i);return}if(t=/^#EXT-X-ENDLIST/.exec(r),t){this.trigger("data",{type:"tag",tagType:"endlist"});return}if(t=/^#EXT-X-DISCONTINUITY/.exec(r),t){this.trigger("data",{type:"tag",tagType:"discontinuity"});return}if(t=/^#EXT-X-PROGRAM-DATE-TIME:(.*)$/.exec(r),t){i={type:"tag",tagType:"program-date-time"},t[1]&&(i.dateTimeString=t[1],i.dateTimeObject=new Date(t[1])),this.trigger("data",i);return}if(t=/^#EXT-X-KEY:(.*)$/.exec(r),t){i={type:"tag",tagType:"key"},t[1]&&(i.attributes=C(t[1]),i.attributes.IV&&(i.attributes.IV.substring(0,2).toLowerCase()==="0x"&&(i.attributes.IV=i.attributes.IV.substring(2)),i.attributes.IV=i.attributes.IV.match(/.{8}/g),i.attributes.IV[0]=parseInt(i.attributes.IV[0],16),i.attributes.IV[1]=parseInt(i.attributes.IV[1],16),i.attributes.IV[2]=parseInt(i.attributes.IV[2],16),i.attributes.IV[3]=parseInt(i.attributes.IV[3],16),i.attributes.IV=new Uint32Array(i.attributes.IV))),this.trigger("data",i);return}if(t=/^#EXT-X-START:(.*)$/.exec(r),t){i={type:"tag",tagType:"start"},t[1]&&(i.attributes=C(t[1]),i.attributes["TIME-OFFSET"]=parseFloat(i.attributes["TIME-OFFSET"]),i.attributes.PRECISE=/YES/.test(i.attributes.PRECISE)),this.trigger("data",i);return}if(t=/^#EXT-X-CUE-OUT-CONT:(.*)?$/.exec(r),t){i={type:"tag",tagType:"cue-out-cont"},t[1]?i.data=t[1]:i.data="",this.trigger("data",i);return}if(t=/^#EXT-X-CUE-OUT:(.*)?$/.exec(r),t){i={type:"tag",tagType:"cue-out"},t[1]?i.data=t[1]:i.data="",this.trigger("data",i);return}if(t=/^#EXT-X-CUE-IN:(.*)?$/.exec(r),t){i={type:"tag",tagType:"cue-in"},t[1]?i.data=t[1]:i.data="",this.trigger("data",i);return}if(t=/^#EXT-X-SKIP:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"skip"},i.attributes=C(t[1]),i.attributes.hasOwnProperty("SKIPPED-SEGMENTS")&&(i.attributes["SKIPPED-SEGMENTS"]=parseInt(i.attributes["SKIPPED-SEGMENTS"],10)),i.attributes.hasOwnProperty("RECENTLY-REMOVED-DATERANGES")&&(i.attributes["RECENTLY-REMOVED-DATERANGES"]=i.attributes["RECENTLY-REMOVED-DATERANGES"].split(Ze)),this.trigger("data",i);return}if(t=/^#EXT-X-PART:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"part"},i.attributes=C(t[1]),["DURATION"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseFloat(i.attributes[a]))}),["INDEPENDENT","GAP"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=/YES/.test(i.attributes[a]))}),i.attributes.hasOwnProperty("BYTERANGE")&&(i.attributes.byterange=pe(i.attributes.BYTERANGE)),this.trigger("data",i);return}if(t=/^#EXT-X-SERVER-CONTROL:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"server-control"},i.attributes=C(t[1]),["CAN-SKIP-UNTIL","PART-HOLD-BACK","HOLD-BACK"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseFloat(i.attributes[a]))}),["CAN-SKIP-DATERANGES","CAN-BLOCK-RELOAD"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=/YES/.test(i.attributes[a]))}),this.trigger("data",i);return}if(t=/^#EXT-X-PART-INF:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"part-inf"},i.attributes=C(t[1]),["PART-TARGET"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseFloat(i.attributes[a]))}),this.trigger("data",i);return}if(t=/^#EXT-X-PRELOAD-HINT:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"preload-hint"},i.attributes=C(t[1]),["BYTERANGE-START","BYTERANGE-LENGTH"].forEach(function(a){if(i.attributes.hasOwnProperty(a)){i.attributes[a]=parseInt(i.attributes[a],10);const l=a==="BYTERANGE-LENGTH"?"length":"offset";i.attributes.byterange=i.attributes.byterange||{},i.attributes.byterange[l]=i.attributes[a],delete i.attributes[a]}}),this.trigger("data",i);return}if(t=/^#EXT-X-RENDITION-REPORT:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"rendition-report"},i.attributes=C(t[1]),["LAST-MSN","LAST-PART"].forEach(function(a){i.attributes.hasOwnProperty(a)&&(i.attributes[a]=parseInt(i.attributes[a],10))}),this.trigger("data",i);return}if(t=/^#EXT-X-DATERANGE:(.*)$/.exec(r),t&&t[1]){i={type:"tag",tagType:"daterange"},i.attributes=C(t[1]),["ID","CLASS"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=String(i.attributes[l]))}),["START-DATE","END-DATE"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=new Date(i.attributes[l]))}),["DURATION","PLANNED-DURATION"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=parseFloat(i.attributes[l]))}),["END-ON-NEXT"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=/YES/i.test(i.attributes[l]))}),["SCTE35-CMD"," SCTE35-OUT","SCTE35-IN"].forEach(function(l){i.attributes.hasOwnProperty(l)&&(i.attributes[l]=i.attributes[l].toString(16))});const a=/^X-([A-Z]+-)+[A-Z]+$/;for(const l in i.attributes){if(!a.test(l))continue;const h=/[0-9A-Fa-f]{6}/g.test(i.attributes[l]),m=/^\d+(\.\d+)?$/.test(i.attributes[l]);i.attributes[l]=h?i.attributes[l].toString(16):m?parseFloat(i.attributes[l]):String(i.attributes[l])}this.trigger("data",i);return}if(t=/^#EXT-X-INDEPENDENT-SEGMENTS/.exec(r),t){this.trigger("data",{type:"tag",tagType:"independent-segments"});return}this.trigger("data",{type:"tag",data:r.slice(4)})})}addParser({expression:e,customType:t,dataParser:i,segment:s}){typeof i!="function"&&(i=r=>r),this.customParsers.push(r=>{if(e.exec(r))return this.trigger("data",{type:"custom",data:i(r),customType:t,segment:s}),!0})}addTagMapper({expression:e,map:t}){const i=s=>e.test(s)?t(s):s;this.tagMappers.push(i)}}const K=n=>n.toLowerCase().replace(/-(\w)/g,e=>e[1].toUpperCase()),Q=function(n){const e={};return Object.keys(n).forEach(function(t){e[K(t)]=n[t]}),e},ae=function(n){const{serverControl:e,targetDuration:t,partTargetDuration:i}=n;if(!e)return;const s="#EXT-X-SERVER-CONTROL",r="holdBack",a="partHoldBack",l=t&&t*3,h=i&&i*2;t&&!e.hasOwnProperty(r)&&(e[r]=l,this.trigger("info",{message:`${s} defaulting HOLD-BACK to targetDuration * 3 (${l}).`})),l&&e[r]<l&&(this.trigger("warn",{message:`${s} clamping HOLD-BACK (${e[r]}) to targetDuration * 3 (${l})`}),e[r]=l),i&&!e.hasOwnProperty(a)&&(e[a]=i*3,this.trigger("info",{message:`${s} defaulting PART-HOLD-BACK to partTargetDuration * 3 (${e[a]}).`})),i&&e[a]<h&&(this.trigger("warn",{message:`${s} clamping PART-HOLD-BACK (${e[a]}) to partTargetDuration * 2 (${h}).`}),e[a]=h)};class oe extends G{constructor(){super(),this.lineStream=new Ne,this.parseStream=new N,this.lineStream.pipe(this.parseStream);const e=this,t=[];let i={},s,r,a=!1;const l=function(){},h={AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},m="urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed";let g=0;this.manifest={allowCache:!0,discontinuityStarts:[],segments:[]};let E=0,w=0;const k={};this.on("end",()=>{i.uri||!i.parts&&!i.preloadHints||(!i.map&&s&&(i.map=s),!i.key&&r&&(i.key=r),!i.timeline&&typeof g=="number"&&(i.timeline=g),this.manifest.preloadSegment=i)}),this.parseStream.on("data",function(x){let L,V;({tag(){({version(){x.version&&(this.manifest.version=x.version)},"allow-cache"(){this.manifest.allowCache=x.allowed,"allowed"in x||(this.trigger("info",{message:"defaulting allowCache to YES"}),this.manifest.allowCache=!0)},byterange(){const H={};"length"in x&&(i.byterange=H,H.length=x.length,"offset"in x||(x.offset=E)),"offset"in x&&(i.byterange=H,H.offset=x.offset),E=H.offset+H.length},endlist(){this.manifest.endList=!0},inf(){"mediaSequence"in this.manifest||(this.manifest.mediaSequence=0,this.trigger("info",{message:"defaulting media sequence to zero"})),"discontinuitySequence"in this.manifest||(this.manifest.discontinuitySequence=0,this.trigger("info",{message:"defaulting discontinuity sequence to zero"})),x.duration>0&&(i.duration=x.duration),x.duration===0&&(i.duration=.01,this.trigger("info",{message:"updating zero segment duration to a small value"})),this.manifest.segments=t},key(){if(!x.attributes){this.trigger("warn",{message:"ignoring key declaration without attribute list"});return}if(x.attributes.METHOD==="NONE"){r=null;return}if(!x.attributes.URI){this.trigger("warn",{message:"ignoring key declaration without URI"});return}if(x.attributes.KEYFORMAT==="com.apple.streamingkeydelivery"){this.manifest.contentProtection=this.manifest.contentProtection||{},this.manifest.contentProtection["com.apple.fps.1_0"]={attributes:x.attributes};return}if(x.attributes.KEYFORMAT==="com.microsoft.playready"){this.manifest.contentProtection=this.manifest.contentProtection||{},this.manifest.contentProtection["com.microsoft.playready"]={uri:x.attributes.URI};return}if(x.attributes.KEYFORMAT===m){if(["SAMPLE-AES","SAMPLE-AES-CTR","SAMPLE-AES-CENC"].indexOf(x.attributes.METHOD)===-1){this.trigger("warn",{message:"invalid key method provided for Widevine"});return}if(x.attributes.METHOD==="SAMPLE-AES-CENC"&&this.trigger("warn",{message:"SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead"}),x.attributes.URI.substring(0,23)!=="data:text/plain;base64,"){this.trigger("warn",{message:"invalid key URI provided for Widevine"});return}if(!(x.attributes.KEYID&&x.attributes.KEYID.substring(0,2)==="0x")){this.trigger("warn",{message:"invalid key ID provided for Widevine"});return}this.manifest.contentProtection=this.manifest.contentProtection||{},this.manifest.contentProtection["com.widevine.alpha"]={attributes:{schemeIdUri:x.attributes.KEYFORMAT,keyId:x.attributes.KEYID.substring(2)},pssh:we(x.attributes.URI.split(",")[1])};return}x.attributes.METHOD||this.trigger("warn",{message:"defaulting key method to AES-128"}),r={method:x.attributes.METHOD||"AES-128",uri:x.attributes.URI},typeof x.attributes.IV!="undefined"&&(r.iv=x.attributes.IV)},"media-sequence"(){if(!isFinite(x.number)){this.trigger("warn",{message:"ignoring invalid media sequence: "+x.number});return}this.manifest.mediaSequence=x.number},"discontinuity-sequence"(){if(!isFinite(x.number)){this.trigger("warn",{message:"ignoring invalid discontinuity sequence: "+x.number});return}this.manifest.discontinuitySequence=x.number,g=x.number},"playlist-type"(){if(!/VOD|EVENT/.test(x.playlistType)){this.trigger("warn",{message:"ignoring unknown playlist type: "+x.playlist});return}this.manifest.playlistType=x.playlistType},map(){s={},x.uri&&(s.uri=x.uri),x.byterange&&(s.byterange=x.byterange),r&&(s.key=r)},"stream-inf"(){if(this.manifest.playlists=t,this.manifest.mediaGroups=this.manifest.mediaGroups||h,!x.attributes){this.trigger("warn",{message:"ignoring empty stream-inf attributes"});return}i.attributes||(i.attributes={}),(0,We.Z)(i.attributes,x.attributes)},media(){if(this.manifest.mediaGroups=this.manifest.mediaGroups||h,!(x.attributes&&x.attributes.TYPE&&x.attributes["GROUP-ID"]&&x.attributes.NAME)){this.trigger("warn",{message:"ignoring incomplete or missing media group"});return}const H=this.manifest.mediaGroups[x.attributes.TYPE];H[x.attributes["GROUP-ID"]]=H[x.attributes["GROUP-ID"]]||{},L=H[x.attributes["GROUP-ID"]],V={default:/yes/i.test(x.attributes.DEFAULT)},V.default?V.autoselect=!0:V.autoselect=/yes/i.test(x.attributes.AUTOSELECT),x.attributes.LANGUAGE&&(V.language=x.attributes.LANGUAGE),x.attributes.URI&&(V.uri=x.attributes.URI),x.attributes["INSTREAM-ID"]&&(V.instreamId=x.attributes["INSTREAM-ID"]),x.attributes.CHARACTERISTICS&&(V.characteristics=x.attributes.CHARACTERISTICS),x.attributes.FORCED&&(V.forced=/yes/i.test(x.attributes.FORCED)),L[x.attributes.NAME]=V},discontinuity(){g+=1,i.discontinuity=!0,this.manifest.discontinuityStarts.push(t.length)},"program-date-time"(){typeof this.manifest.dateTimeString=="undefined"&&(this.manifest.dateTimeString=x.dateTimeString,this.manifest.dateTimeObject=x.dateTimeObject),i.dateTimeString=x.dateTimeString,i.dateTimeObject=x.dateTimeObject},targetduration(){if(!isFinite(x.duration)||x.duration<0){this.trigger("warn",{message:"ignoring invalid target duration: "+x.duration});return}this.manifest.targetDuration=x.duration,ae.call(this,this.manifest)},start(){if(!x.attributes||isNaN(x.attributes["TIME-OFFSET"])){this.trigger("warn",{message:"ignoring start declaration without appropriate attribute list"});return}this.manifest.start={timeOffset:x.attributes["TIME-OFFSET"],precise:x.attributes.PRECISE}},"cue-out"(){i.cueOut=x.data},"cue-out-cont"(){i.cueOutCont=x.data},"cue-in"(){i.cueIn=x.data},skip(){this.manifest.skip=Q(x.attributes),this.warnOnMissingAttributes_("#EXT-X-SKIP",x.attributes,["SKIPPED-SEGMENTS"])},part(){a=!0;const H=this.manifest.segments.length,R=Q(x.attributes);i.parts=i.parts||[],i.parts.push(R),R.byterange&&(R.byterange.hasOwnProperty("offset")||(R.byterange.offset=w),w=R.byterange.offset+R.byterange.length);const Z=i.parts.length-1;this.warnOnMissingAttributes_(`#EXT-X-PART #${Z} for segment #${H}`,x.attributes,["URI","DURATION"]),this.manifest.renditionReports&&this.manifest.renditionReports.forEach((q,P)=>{q.hasOwnProperty("lastPart")||this.trigger("warn",{message:`#EXT-X-RENDITION-REPORT #${P} lacks required attribute(s): LAST-PART`})})},"server-control"(){const H=this.manifest.serverControl=Q(x.attributes);H.hasOwnProperty("canBlockReload")||(H.canBlockReload=!1,this.trigger("info",{message:"#EXT-X-SERVER-CONTROL defaulting CAN-BLOCK-RELOAD to false"})),ae.call(this,this.manifest),H.canSkipDateranges&&!H.hasOwnProperty("canSkipUntil")&&this.trigger("warn",{message:"#EXT-X-SERVER-CONTROL lacks required attribute CAN-SKIP-UNTIL which is required when CAN-SKIP-DATERANGES is set"})},"preload-hint"(){const H=this.manifest.segments.length,R=Q(x.attributes),Z=R.type&&R.type==="PART";i.preloadHints=i.preloadHints||[],i.preloadHints.push(R),R.byterange&&(R.byterange.hasOwnProperty("offset")||(R.byterange.offset=Z?w:0,Z&&(w=R.byterange.offset+R.byterange.length)));const q=i.preloadHints.length-1;if(this.warnOnMissingAttributes_(`#EXT-X-PRELOAD-HINT #${q} for segment #${H}`,x.attributes,["TYPE","URI"]),!!R.type)for(let P=0;P<i.preloadHints.length-1;P++){const de=i.preloadHints[P];de.type&&de.type===R.type&&this.trigger("warn",{message:`#EXT-X-PRELOAD-HINT #${q} for segment #${H} has the same TYPE ${R.type} as preload hint #${P}`})}},"rendition-report"(){const H=Q(x.attributes);this.manifest.renditionReports=this.manifest.renditionReports||[],this.manifest.renditionReports.push(H);const R=this.manifest.renditionReports.length-1,Z=["LAST-MSN","URI"];a&&Z.push("LAST-PART"),this.warnOnMissingAttributes_(`#EXT-X-RENDITION-REPORT #${R}`,x.attributes,Z)},"part-inf"(){this.manifest.partInf=Q(x.attributes),this.warnOnMissingAttributes_("#EXT-X-PART-INF",x.attributes,["PART-TARGET"]),this.manifest.partInf.partTarget&&(this.manifest.partTargetDuration=this.manifest.partInf.partTarget),ae.call(this,this.manifest)},daterange(){this.manifest.daterange=this.manifest.daterange||[],this.manifest.daterange.push(Q(x.attributes));const H=this.manifest.daterange.length-1;this.warnOnMissingAttributes_(`#EXT-X-DATERANGE #${H}`,x.attributes,["ID","START-DATE"]);const R=this.manifest.daterange[H];R.endDate&&R.startDate&&new Date(R.endDate)<new Date(R.startDate)&&this.trigger("warn",{message:"EXT-X-DATERANGE END-DATE must be equal to or later than the value of the START-DATE"}),R.duration&&R.duration<0&&this.trigger("warn",{message:"EXT-X-DATERANGE DURATION must not be negative"}),R.plannedDuration&&R.plannedDuration<0&&this.trigger("warn",{message:"EXT-X-DATERANGE PLANNED-DURATION must not be negative"});const Z=!!R.endOnNext;if(Z&&!R.class&&this.trigger("warn",{message:"EXT-X-DATERANGE with an END-ON-NEXT=YES attribute must have a CLASS attribute"}),Z&&(R.duration||R.endDate)&&this.trigger("warn",{message:"EXT-X-DATERANGE with an END-ON-NEXT=YES attribute must not contain DURATION or END-DATE attributes"}),R.duration&&R.endDate){const q=R.startDate,P=q.setSeconds(q.getSeconds()+R.duration);this.manifest.daterange[H].endDate=new Date(P)}if(R&&!this.manifest.dateTimeString&&this.trigger("warn",{message:"A playlist with EXT-X-DATERANGE tag must contain atleast one EXT-X-PROGRAM-DATE-TIME tag"}),!k[R.id])k[R.id]=R;else for(const q in k[R.id])if(k[R.id][q]!==R[q]){this.trigger("warn",{message:"EXT-X-DATERANGE tags with the same ID in a playlist must have the same attributes and same attribute values"});break}},"independent-segments"(){this.manifest.independentSegments=!0}}[x.tagType]||l).call(e)},uri(){i.uri=x.uri,t.push(i),this.manifest.targetDuration&&!("duration"in i)&&(this.trigger("warn",{message:"defaulting segment duration to the target duration"}),i.duration=this.manifest.targetDuration),r&&(i.key=r),i.timeline=g,s&&(i.map=s),w=0,i={}},comment(){},custom(){x.segment?(i.custom=i.custom||{},i.custom[x.customType]=x.data):(this.manifest.custom=this.manifest.custom||{},this.manifest.custom[x.customType]=x.data)}})[x.type].call(e)})}warnOnMissingAttributes_(e,t,i){const s=[];i.forEach(function(r){t.hasOwnProperty(r)||s.push(r)}),s.length&&this.trigger("warn",{message:`${e} lacks required attribute(s): ${s.join(", ")}`})}push(e){this.lineStream.push(e)}end(){this.lineStream.push(`
`),this.trigger("end")}addParser(e){this.parseStream.addParser(e)}addTagMapper(e){this.parseStream.addTagMapper(e)}}var ge={mp4:/^(av0?1|avc0?[1234]|vp0?9|flac|opus|mp3|mp4a|mp4v|stpp.ttml.im1t)/,webm:/^(vp0?[89]|av0?1|opus|vorbis)/,ogg:/^(vp0?[89]|theora|flac|opus|vorbis)/,video:/^(av0?1|avc0?[1234]|vp0?[89]|hvc1|hev1|theora|mp4v)/,audio:/^(mp4a|flac|vorbis|opus|ac-[34]|ec-3|alac|mp3|speex|aac)/,text:/^(stpp.ttml.im1t)/,muxerVideo:/^(avc0?1)/,muxerAudio:/^(mp4a)/,muxerText:/a^/},ie=["video","audio","text"],le=["Video","Audio","Text"],ee=function(e){return e&&e.replace(/avc1\.(\d+)\.(\d+)/i,function(t,i,s){var r=("00"+Number(i).toString(16)).slice(-2),a=("00"+Number(s).toString(16)).slice(-2);return"avc1."+r+"00"+a})},re=function(e){return e.map(ee)},Te=function(e){return e.replace(/avc1\.(\d+)\.(\d+)/i,function(t){return re([t])[0]})},De=function(e){e===void 0&&(e="");var t=e.split(","),i=[];return t.forEach(function(s){s=s.trim();var r;ie.forEach(function(a){var l=ge[a].exec(s.toLowerCase());if(!(!l||l.length<=1)){r=a;var h=s.substring(0,l[1].length),m=s.replace(h,"");i.push({type:h,details:m,mediaType:a})}}),r||i.push({type:s,details:"",mediaType:"unknown"})}),i},ze=function(e,t){if(!e.mediaGroups.AUDIO||!t)return null;var i=e.mediaGroups.AUDIO[t];if(!i)return null;for(var s in i){var r=i[s];if(r.default&&r.playlists)return De(r.playlists[0].attributes.CODECS)}return null},Ve=function(e){return e===void 0&&(e=""),ge.video.test(e.trim().toLowerCase())},_e=function(e){return e===void 0&&(e=""),ge.audio.test(e.trim().toLowerCase())},ut=function(e){return e===void 0&&(e=""),ge.text.test(e.trim().toLowerCase())},ct=function(e){if(!(!e||typeof e!="string")){var t=e.toLowerCase().split(",").map(function(r){return ee(r.trim())}),i="video";t.length===1&&_e(t[0])?i="audio":t.length===1&&ut(t[0])&&(i="application");var s="mp4";return t.every(function(r){return ge.mp4.test(r)})?s="mp4":t.every(function(r){return ge.webm.test(r)})?s="webm":t.every(function(r){return ge.ogg.test(r)})&&(s="ogg"),i+"/"+s+';codecs="'+e+'"'}},at=function(e){return e===void 0&&(e=""),A().MediaSource&&A().MediaSource.isTypeSupported&&A().MediaSource.isTypeSupported(ct(e))||!1},At=function(e){return e===void 0&&(e=""),e.toLowerCase().split(",").every(function(t){t=t.trim();for(var i=0;i<le.length;i++){var s=le[i];if(ge["muxer"+s].test(t))return!0}return!1})},Nt="mp4a.40.2",ui="avc1.4d400d",vn=/^(audio|video|application)\/(x-|vnd\.apple\.)?mpegurl/i,Xi=/^application\/dash\+xml/i,Ie=function(e){return vn.test(e)?"hls":Xi.test(e)?"dash":e==="application/vnd.videojs.vhs+json"?"vhs-json":null},Ni=function(e,t){for(var i="";t--;)i+=e;return i},dt=function(e){return e.toString(2).length},ci=function(e){return Math.ceil(dt(e)/8)},An=function(e,t,i){return i===void 0&&(i=" "),(Ni(i,t)+e.toString()).slice(-t)},Si=function(e){return ArrayBuffer.isView==="function"?ArrayBuffer.isView(e):e&&e.buffer instanceof ArrayBuffer},Mi=function(e){return Si(e)},he=function(e){return e instanceof Uint8Array?e:(!Array.isArray(e)&&!Mi(e)&&!(e instanceof ArrayBuffer)&&(typeof e!="number"||typeof e=="number"&&e!==e?e=0:e=[e]),new Uint8Array(e&&e.buffer||e,e&&e.byteOffset||0,e&&e.byteLength||0))},Dt=function(e){e=he(e);for(var t="",i=0;i<e.length;i++)t+=An(e[i].toString(16),2,"0");return t},Ws=function(e){e=he(e);for(var t="",i=0;i<e.length;i++)t+=An(e[i].toString(2),8,"0");return t},Ke=A().BigInt||Number,Mt=[Ke("0x1"),Ke("0x100"),Ke("0x10000"),Ke("0x1000000"),Ke("0x100000000"),Ke("0x10000000000"),Ke("0x1000000000000"),Ke("0x100000000000000"),Ke("0x10000000000000000")],yn=function(){var n=new Uint16Array([65484]),e=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);return e[0]===255?"big":e[0]===204?"little":"unknown"}(),fa=yn==="big",pa=yn==="little",ma=function(e,t){var i=t===void 0?{}:t,s=i.signed,r=s===void 0?!1:s,a=i.le,l=a===void 0?!1:a;e=he(e);var h=l?"reduce":"reduceRight",m=e[h]?e[h]:Array.prototype[h],g=m.call(e,function(w,k,x){var L=l?x:Math.abs(x+1-e.length);return w+Ke(k)*Mt[L]},Ke(0));if(r){var E=Mt[e.length]/Ke(2)-Ke(1);g=Ke(g),g>E&&(g-=E,g-=E,g-=Ke(2))}return Number(g)},ga=function(e,t){var i=t===void 0?{}:t,s=i.le,r=s===void 0?!1:s;(typeof e!="bigint"&&typeof e!="number"||typeof e=="number"&&e!==e)&&(e=0),e=Ke(e);for(var a=ci(e),l=new Uint8Array(new ArrayBuffer(a)),h=0;h<a;h++){var m=r?h:Math.abs(h+1-l.length);l[m]=Number(e/Mt[h]&Ke(255)),e<0&&(l[m]=Math.abs(~l[m]),l[m]-=h===0?1:2)}return l},Gs=function(e){if(!e)return"";e=Array.prototype.slice.call(e);var t=String.fromCharCode.apply(null,he(e));try{return decodeURIComponent(escape(t))}catch(i){}return t},Yi=function(e,t){if(typeof e!="string"&&e&&typeof e.toString=="function"&&(e=e.toString()),typeof e!="string")return new Uint8Array;t||(e=unescape(encodeURIComponent(e)));for(var i=new Uint8Array(e.length),s=0;s<e.length;s++)i[s]=e.charCodeAt(s);return i},va=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];if(t=t.filter(function(l){return l&&(l.byteLength||l.length)&&typeof l!="string"}),t.length<=1)return he(t[0]);var s=t.reduce(function(l,h,m){return l+(h.byteLength||h.length)},0),r=new Uint8Array(s),a=0;return t.forEach(function(l){l=he(l),r.set(l,a),a+=l.byteLength}),r},qe=function(e,t,i){var s=i===void 0?{}:i,r=s.offset,a=r===void 0?0:r,l=s.mask,h=l===void 0?[]:l;e=he(e),t=he(t);var m=t.every?t.every:Array.prototype.every;return t.length&&e.length-a>=t.length&&m.call(t,function(g,E){var w=h[E]?h[E]&e[a+E]:e[a+E];return g===w})},is=function(e,t,i){return Uint8Array.prototype.slice?Uint8Array.prototype.slice.call(e,t,i):new Uint8Array(Array.prototype.slice.call(e,t,i))},_n=function(e){return e.reverse?e.reverse():Array.prototype.reverse.call(e)},bn="http://example.com",ns=function(e,t){if(/^[a-z]+:/i.test(t))return t;/^data:/.test(e)&&(e=A().location&&A().location.href||"");var i=typeof A().URL=="function",s=/^\/\//.test(e),r=!A().location&&!/\/\//i.test(e);if(i?e=new(A()).URL(e,A().location||bn):/\/\//i.test(e)||(e=ye().buildAbsoluteURL(A().location&&A().location.href||"",e)),i){var a=new URL(t,e);return r?a.href.slice(bn.length):s?a.href.slice(a.protocol.length):a.href}return ye().buildAbsoluteURL(e,t)},Ki=ns,En=function(e,t,i){t.forEach(function(s){for(var r in e.mediaGroups[s])for(var a in e.mediaGroups[s][r]){var l=e.mediaGroups[s][r][a];i(l,s,r,a)}})},$s=z(48764).lW,Xs=function(e){return A().atob?A().atob(e):$s.from(e,"base64").toString("binary")};function ss(n){for(var e=Xs(n),t=new Uint8Array(e.length),i=0;i<e.length;i++)t[i]=e.charCodeAt(i);return t}var Tn=z(3969);/*! @name mpd-parser @version 1.2.2 @license Apache-2.0 */var Ys="1.2.2";const rs=n=>!!n&&typeof n=="object",yt=(...n)=>n.reduce((e,t)=>(typeof t!="object"||Object.keys(t).forEach(i=>{Array.isArray(e[i])&&Array.isArray(t[i])?e[i]=e[i].concat(t[i]):rs(e[i])&&rs(t[i])?e[i]=yt(e[i],t[i]):e[i]=t[i]}),e),{}),as=n=>Object.keys(n).map(e=>n[e]),os=(n,e)=>{const t=[];for(let i=n;i<e;i++)t.push(i);return t},qt=n=>n.reduce((e,t)=>e.concat(t),[]),ls=n=>{if(!n.length)return[];const e=[];for(let t=0;t<n.length;t++)e.push(n[t]);return e},us=(n,e)=>n.reduce((t,i,s)=>(i[e]&&t.push(s),t),[]),Ks=(n,e)=>as(n.reduce((t,i)=>(i.forEach(s=>{t[e(s)]=s}),t),{}));var Qi={INVALID_NUMBER_OF_PERIOD:"INVALID_NUMBER_OF_PERIOD",INVALID_NUMBER_OF_CONTENT_STEERING:"INVALID_NUMBER_OF_CONTENT_STEERING",DASH_EMPTY_MANIFEST:"DASH_EMPTY_MANIFEST",DASH_INVALID_XML:"DASH_INVALID_XML",NO_BASE_URL:"NO_BASE_URL",MISSING_SEGMENT_INFORMATION:"MISSING_SEGMENT_INFORMATION",SEGMENT_TIME_UNSPECIFIED:"SEGMENT_TIME_UNSPECIFIED",UNSUPPORTED_UTC_TIMING_SCHEME:"UNSUPPORTED_UTC_TIMING_SCHEME"};const v=({baseUrl:n="",source:e="",range:t="",indexRange:i=""})=>{const s={uri:e,resolvedUri:Ki(n||"",e)};if(t||i){const a=(t||i).split("-");let l=A().BigInt?A().BigInt(a[0]):parseInt(a[0],10),h=A().BigInt?A().BigInt(a[1]):parseInt(a[1],10);l<Number.MAX_SAFE_INTEGER&&typeof l=="bigint"&&(l=Number(l)),h<Number.MAX_SAFE_INTEGER&&typeof h=="bigint"&&(h=Number(h));let m;typeof h=="bigint"||typeof l=="bigint"?m=A().BigInt(h)-A().BigInt(l)+A().BigInt(1):m=h-l+1,typeof m=="bigint"&&m<Number.MAX_SAFE_INTEGER&&(m=Number(m)),s.byterange={length:m,offset:l}}return s},_=n=>{let e;return typeof n.offset=="bigint"||typeof n.length=="bigint"?e=A().BigInt(n.offset)+A().BigInt(n.length)-A().BigInt(1):e=n.offset+n.length-1,`${n.offset}-${e}`},B=n=>(n&&typeof n!="number"&&(n=parseInt(n,10)),isNaN(n)?null:n),U={static(n){const{duration:e,timescale:t=1,sourceDuration:i,periodDuration:s}=n,r=B(n.endNumber),a=e/t;return typeof r=="number"?{start:0,end:r}:typeof s=="number"?{start:0,end:s/a}:{start:0,end:i/a}},dynamic(n){const{NOW:e,clientOffset:t,availabilityStartTime:i,timescale:s=1,duration:r,periodStart:a=0,minimumUpdatePeriod:l=0,timeShiftBufferDepth:h=1/0}=n,m=B(n.endNumber),g=(e+t)/1e3,E=i+a,k=g+l-E,x=Math.ceil(k*s/r),L=Math.floor((g-E-h)*s/r),V=Math.floor((g-E)*s/r);return{start:Math.max(0,L),end:typeof m=="number"?m:Math.min(x,V)}}},ue=n=>e=>{const{duration:t,timescale:i=1,periodStart:s,startNumber:r=1}=n;return{number:r+e,duration:t/i,timeline:s,time:e*t}},Be=n=>{const{type:e,duration:t,timescale:i=1,periodDuration:s,sourceDuration:r}=n,{start:a,end:l}=U[e](n),h=os(a,l).map(ue(n));if(e==="static"){const m=h.length-1,g=typeof s=="number"?s:r;h[m].duration=g-t/i*m}return h},Xe=n=>{const{baseUrl:e,initialization:t={},sourceDuration:i,indexRange:s="",periodStart:r,presentationTime:a,number:l=0,duration:h}=n;if(!e)throw new Error(Qi.NO_BASE_URL);const m=v({baseUrl:e,source:t.sourceURL,range:t.range}),g=v({baseUrl:e,source:e,indexRange:s});if(g.map=m,h){const E=Be(n);E.length&&(g.duration=E[0].duration,g.timeline=E[0].timeline)}else i&&(g.duration=i,g.timeline=r);return g.presentationTime=a||r,g.number=l,[g]},xt=(n,e,t)=>{const i=n.sidx.map?n.sidx.map:null,s=n.sidx.duration,r=n.timeline||0,a=n.sidx.byterange,l=a.offset+a.length,h=e.timescale,m=e.references.filter(V=>V.referenceType!==1),g=[],E=n.endList?"static":"dynamic",w=n.sidx.timeline;let k=w,x=n.mediaSequence||0,L;typeof e.firstOffset=="bigint"?L=A().BigInt(l)+e.firstOffset:L=l+e.firstOffset;for(let V=0;V<m.length;V++){const H=e.references[V],R=H.referencedSize,Z=H.subsegmentDuration;let q;typeof L=="bigint"?q=L+A().BigInt(R)-A().BigInt(1):q=L+R-1;const P=`${L}-${q}`,Ee=Xe({baseUrl:t,timescale:h,timeline:r,periodStart:w,presentationTime:k,number:x,duration:Z,sourceDuration:s,indexRange:P,type:E})[0];i&&(Ee.map=i),g.push(Ee),typeof L=="bigint"?L+=A().BigInt(R):L+=R,k+=Z/h,x++}return n.segments=g,n},ri=["AUDIO","SUBTITLES"],Wt=1/60,Qt=n=>Ks(n,({timeline:e})=>e).sort((e,t)=>e.timeline>t.timeline?1:-1),ji=(n,e)=>{for(let t=0;t<n.length;t++)if(n[t].attributes.NAME===e)return n[t];return null},di=n=>{let e=[];return En(n,ri,(t,i,s,r)=>{e=e.concat(t.playlists||[])}),e},hi=({playlist:n,mediaSequence:e})=>{n.mediaSequence=e,n.segments.forEach((t,i)=>{t.number=n.mediaSequence+i})},Jt=({oldPlaylists:n,newPlaylists:e,timelineStarts:t})=>{e.forEach(i=>{i.discontinuitySequence=t.findIndex(function({timeline:h}){return h===i.timeline});const s=ji(n,i.attributes.NAME);if(!s||i.sidx)return;const r=i.segments[0],a=s.segments.findIndex(function(h){return Math.abs(h.presentationTime-r.presentationTime)<Wt});if(a===-1){hi({playlist:i,mediaSequence:s.mediaSequence+s.segments.length}),i.segments[0].discontinuity=!0,i.discontinuityStarts.unshift(0),(!s.segments.length&&i.timeline>s.timeline||s.segments.length&&i.timeline>s.segments[s.segments.length-1].timeline)&&i.discontinuitySequence--;return}s.segments[a].discontinuity&&!r.discontinuity&&(r.discontinuity=!0,i.discontinuityStarts.unshift(0),i.discontinuitySequence--),hi({playlist:i,mediaSequence:s.segments[a].number})})},Bi=({oldManifest:n,newManifest:e})=>{const t=n.playlists.concat(di(n)),i=e.playlists.concat(di(e));return e.timelineStarts=Qt([n.timelineStarts,e.timelineStarts]),Jt({oldPlaylists:t,newPlaylists:i,timelineStarts:e.timelineStarts}),e},fi=n=>n&&n.uri+"-"+_(n.byterange),Et=n=>{const e=n.reduce(function(i,s){return i[s.attributes.baseUrl]||(i[s.attributes.baseUrl]=[]),i[s.attributes.baseUrl].push(s),i},{});let t=[];return Object.values(e).forEach(i=>{const s=as(i.reduce((r,a)=>{const l=a.attributes.id+(a.attributes.lang||"");return r[l]?(a.segments&&(a.segments[0]&&(a.segments[0].discontinuity=!0),r[l].segments.push(...a.segments)),a.attributes.contentProtection&&(r[l].attributes.contentProtection=a.attributes.contentProtection)):(r[l]=a,r[l].attributes.timelineStarts=[]),r[l].attributes.timelineStarts.push({start:a.attributes.periodStart,timeline:a.attributes.periodStart}),r},{}));t=t.concat(s)}),t.map(i=>(i.discontinuityStarts=us(i.segments||[],"discontinuity"),i))},Cn=(n,e)=>{const t=fi(n.sidx),i=t&&e[t]&&e[t].sidx;return i&&xt(n,i,n.sidx.resolvedUri),n},Ui=(n,e={})=>{if(!Object.keys(e).length)return n;for(const t in n)n[t]=Cn(n[t],e);return n},Qs=({attributes:n,segments:e,sidx:t,mediaSequence:i,discontinuitySequence:s,discontinuityStarts:r},a)=>{const l={attributes:{NAME:n.id,BANDWIDTH:n.bandwidth,CODECS:n.codecs,"PROGRAM-ID":1},uri:"",endList:n.type==="static",timeline:n.periodStart,resolvedUri:n.baseUrl||"",targetDuration:n.duration,discontinuitySequence:s,discontinuityStarts:r,timelineStarts:n.timelineStarts,mediaSequence:i,segments:e};return n.contentProtection&&(l.contentProtection=n.contentProtection),n.serviceLocation&&(l.attributes.serviceLocation=n.serviceLocation),t&&(l.sidx=t),a&&(l.attributes.AUDIO="audio",l.attributes.SUBTITLES="subs"),l},_h=({attributes:n,segments:e,mediaSequence:t,discontinuityStarts:i,discontinuitySequence:s})=>{typeof e=="undefined"&&(e=[{uri:n.baseUrl,timeline:n.periodStart,resolvedUri:n.baseUrl||"",duration:n.sourceDuration,number:0}],n.duration=n.sourceDuration);const r={NAME:n.id,BANDWIDTH:n.bandwidth,"PROGRAM-ID":1};n.codecs&&(r.CODECS=n.codecs);const a={attributes:r,uri:"",endList:n.type==="static",timeline:n.periodStart,resolvedUri:n.baseUrl||"",targetDuration:n.duration,timelineStarts:n.timelineStarts,discontinuityStarts:i,discontinuitySequence:s,mediaSequence:t,segments:e};return n.serviceLocation&&(a.attributes.serviceLocation=n.serviceLocation),a},bh=(n,e={},t=!1)=>{let i;const s=n.reduce((r,a)=>{const l=a.attributes.role&&a.attributes.role.value||"",h=a.attributes.lang||"";let m=a.attributes.label||"main";if(h&&!a.attributes.label){const E=l?` (${l})`:"";m=`${a.attributes.lang}${E}`}r[m]||(r[m]={language:h,autoselect:!0,default:l==="main",playlists:[],uri:""});const g=Cn(Qs(a,t),e);return r[m].playlists.push(g),typeof i=="undefined"&&l==="main"&&(i=a,i.default=!0),r},{});if(!i){const r=Object.keys(s)[0];s[r].default=!0}return s},Eh=(n,e={})=>n.reduce((t,i)=>{const s=i.attributes.label||i.attributes.lang||"text";return t[s]||(t[s]={language:s,default:!1,autoselect:!1,playlists:[],uri:""}),t[s].playlists.push(Cn(_h(i),e)),t},{}),Th=n=>n.reduce((e,t)=>(t&&t.forEach(i=>{const{channel:s,language:r}=i;e[r]={autoselect:!1,default:!1,instreamId:s,language:r},i.hasOwnProperty("aspectRatio")&&(e[r].aspectRatio=i.aspectRatio),i.hasOwnProperty("easyReader")&&(e[r].easyReader=i.easyReader),i.hasOwnProperty("3D")&&(e[r]["3D"]=i["3D"])}),e),{}),Ch=({attributes:n,segments:e,sidx:t,discontinuityStarts:i})=>{const s={attributes:{NAME:n.id,AUDIO:"audio",SUBTITLES:"subs",RESOLUTION:{width:n.width,height:n.height},CODECS:n.codecs,BANDWIDTH:n.bandwidth,"PROGRAM-ID":1},uri:"",endList:n.type==="static",timeline:n.periodStart,resolvedUri:n.baseUrl||"",targetDuration:n.duration,discontinuityStarts:i,timelineStarts:n.timelineStarts,segments:e};return n.frameRate&&(s.attributes["FRAME-RATE"]=n.frameRate),n.contentProtection&&(s.contentProtection=n.contentProtection),n.serviceLocation&&(s.attributes.serviceLocation=n.serviceLocation),t&&(s.sidx=t),s},xh=({attributes:n})=>n.mimeType==="video/mp4"||n.mimeType==="video/webm"||n.contentType==="video",Sh=({attributes:n})=>n.mimeType==="audio/mp4"||n.mimeType==="audio/webm"||n.contentType==="audio",jh=({attributes:n})=>n.mimeType==="text/vtt"||n.contentType==="text",Bh=(n,e)=>{n.forEach(t=>{t.mediaSequence=0,t.discontinuitySequence=e.findIndex(function({timeline:i}){return i===t.timeline}),t.segments&&t.segments.forEach((i,s)=>{i.number=s})})},cl=n=>n?Object.keys(n).reduce((e,t)=>{const i=n[t];return e.concat(i.playlists)},[]):[],wh=({dashPlaylists:n,locations:e,contentSteering:t,sidxMapping:i={},previousManifest:s,eventStream:r})=>{if(!n.length)return{};const{sourceDuration:a,type:l,suggestedPresentationDelay:h,minimumUpdatePeriod:m}=n[0].attributes,g=Et(n.filter(xh)).map(Ch),E=Et(n.filter(Sh)),w=Et(n.filter(jh)),k=n.map(q=>q.attributes.captionServices).filter(Boolean),x={allowCache:!0,discontinuityStarts:[],segments:[],endList:!0,mediaGroups:{AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},uri:"",duration:a,playlists:Ui(g,i)};m>=0&&(x.minimumUpdatePeriod=m*1e3),e&&(x.locations=e),t&&(x.contentSteering=t),l==="dynamic"&&(x.suggestedPresentationDelay=h),r&&r.length>0&&(x.eventStream=r);const L=x.playlists.length===0,V=E.length?bh(E,i,L):null,H=w.length?Eh(w,i):null,R=g.concat(cl(V),cl(H)),Z=R.map(({timelineStarts:q})=>q);return x.timelineStarts=Qt(Z),Bh(R,x.timelineStarts),V&&(x.mediaGroups.AUDIO.audio=V),H&&(x.mediaGroups.SUBTITLES.subs=H),k.length&&(x.mediaGroups["CLOSED-CAPTIONS"].cc=Th(k)),s?Bi({oldManifest:s,newManifest:x}):x},Dh=(n,e,t)=>{const{NOW:i,clientOffset:s,availabilityStartTime:r,timescale:a=1,periodStart:l=0,minimumUpdatePeriod:h=0}=n,m=(i+s)/1e3,g=r+l,w=m+h-g;return Math.ceil((w*a-e)/t)},dl=(n,e)=>{const{type:t,minimumUpdatePeriod:i=0,media:s="",sourceDuration:r,timescale:a=1,startNumber:l=1,periodStart:h}=n,m=[];let g=-1;for(let E=0;E<e.length;E++){const w=e[E],k=w.d,x=w.r||0,L=w.t||0;g<0&&(g=L),L&&L>g&&(g=L);let V;if(x<0){const Z=E+1;Z===e.length?t==="dynamic"&&i>0&&s.indexOf("$Number$")>0?V=Dh(n,g,k):V=(r*a-g)/k:V=(e[Z].t-g)/k}else V=x+1;const H=l+m.length+V;let R=l+m.length;for(;R<H;)m.push({number:R,duration:k/a,time:g,timeline:h}),g+=k,R++}return m},kh=/\$([A-z]*)(?:(%0)([0-9]+)d)?\$/g,Ih=n=>(e,t,i,s)=>{if(e==="$$")return"$";if(typeof n[t]=="undefined")return e;const r=""+n[t];return t==="RepresentationID"||(i?s=parseInt(s,10):s=1,r.length>=s)?r:`${new Array(s-r.length+1).join("0")}${r}`},hl=(n,e)=>n.replace(kh,Ih(e)),Ph=(n,e)=>!n.duration&&!e?[{number:n.startNumber||1,duration:n.sourceDuration,time:0,timeline:n.periodStart}]:n.duration?Be(n):dl(n,e),Lh=(n,e)=>{const t={RepresentationID:n.id,Bandwidth:n.bandwidth||0},{initialization:i={sourceURL:"",range:""}}=n,s=v({baseUrl:n.baseUrl,source:hl(i.sourceURL,t),range:i.range});return Ph(n,e).map(a=>{t.Number=a.number,t.Time=a.time;const l=hl(n.media||"",t),h=n.timescale||1,m=n.presentationTimeOffset||0,g=n.periodStart+(a.time-m)/h;return{uri:l,timeline:a.timeline,duration:a.duration,resolvedUri:Ki(n.baseUrl||"",l),map:s,number:a.number,presentationTime:g}})},Oh=(n,e)=>{const{baseUrl:t,initialization:i={}}=n,s=v({baseUrl:t,source:i.sourceURL,range:i.range}),r=v({baseUrl:t,source:e.media,range:e.mediaRange});return r.map=s,r},Rh=(n,e)=>{const{duration:t,segmentUrls:i=[],periodStart:s}=n;if(!t&&!e||t&&e)throw new Error(Qi.SEGMENT_TIME_UNSPECIFIED);const r=i.map(h=>Oh(n,h));let a;return t&&(a=Be(n)),e&&(a=dl(n,e)),a.map((h,m)=>{if(r[m]){const g=r[m],E=n.timescale||1,w=n.presentationTimeOffset||0;return g.timeline=h.timeline,g.duration=h.duration,g.number=h.number,g.presentationTime=s+(h.time-w)/E,g}}).filter(h=>h)},Nh=({attributes:n,segmentInfo:e})=>{let t,i;e.template?(i=Lh,t=yt(n,e.template)):e.base?(i=Xe,t=yt(n,e.base)):e.list&&(i=Rh,t=yt(n,e.list));const s={attributes:n};if(!i)return s;const r=i(t,e.segmentTimeline);if(t.duration){const{duration:a,timescale:l=1}=t;t.duration=a/l}else r.length?t.duration=r.reduce((a,l)=>Math.max(a,Math.ceil(l.duration)),0):t.duration=0;return s.attributes=t,s.segments=r,e.base&&t.indexRange&&(s.sidx=r[0],s.segments=[]),s},Mh=n=>n.map(Nh),ot=(n,e)=>ls(n.childNodes).filter(({tagName:t})=>t===e),cs=n=>n.textContent.trim(),Uh=n=>parseFloat(n.split("/").reduce((e,t)=>e/t)),xn=n=>{const l=/P(?:(\d*)Y)?(?:(\d*)M)?(?:(\d*)D)?(?:T(?:(\d*)H)?(?:(\d*)M)?(?:([\d.]*)S)?)?/.exec(n);if(!l)return 0;const[h,m,g,E,w,k]=l.slice(1);return parseFloat(h||0)*31536e3+parseFloat(m||0)*2592e3+parseFloat(g||0)*86400+parseFloat(E||0)*3600+parseFloat(w||0)*60+parseFloat(k||0)},Fh=n=>(/^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/.test(n)&&(n+="Z"),Date.parse(n)),fl={mediaPresentationDuration(n){return xn(n)},availabilityStartTime(n){return Fh(n)/1e3},minimumUpdatePeriod(n){return xn(n)},suggestedPresentationDelay(n){return xn(n)},type(n){return n},timeShiftBufferDepth(n){return xn(n)},start(n){return xn(n)},width(n){return parseInt(n,10)},height(n){return parseInt(n,10)},bandwidth(n){return parseInt(n,10)},frameRate(n){return Uh(n)},startNumber(n){return parseInt(n,10)},timescale(n){return parseInt(n,10)},presentationTimeOffset(n){return parseInt(n,10)},duration(n){const e=parseInt(n,10);return isNaN(e)?xn(n):e},d(n){return parseInt(n,10)},t(n){return parseInt(n,10)},r(n){return parseInt(n,10)},presentationTime(n){return parseInt(n,10)},DEFAULT(n){return n}},Tt=n=>n&&n.attributes?ls(n.attributes).reduce((e,t)=>{const i=fl[t.name]||fl.DEFAULT;return e[t.name]=i(t.value),e},{}):{},Vh={"urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b":"org.w3.clearkey","urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed":"com.widevine.alpha","urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95":"com.microsoft.playready","urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb":"com.adobe.primetime"},Js=(n,e)=>e.length?qt(n.map(function(t){return e.map(function(i){const s=cs(i),r=Ki(t.baseUrl,s),a=yt(Tt(i),{baseUrl:r});return r!==s&&!a.serviceLocation&&t.serviceLocation&&(a.serviceLocation=t.serviceLocation),a})})):n,Aa=n=>{const e=ot(n,"SegmentTemplate")[0],t=ot(n,"SegmentList")[0],i=t&&ot(t,"SegmentURL").map(E=>yt({tag:"SegmentURL"},Tt(E))),s=ot(n,"SegmentBase")[0],r=t||e,a=r&&ot(r,"SegmentTimeline")[0],l=t||s||e,h=l&&ot(l,"Initialization")[0],m=e&&Tt(e);m&&h?m.initialization=h&&Tt(h):m&&m.initialization&&(m.initialization={sourceURL:m.initialization});const g={template:m,segmentTimeline:a&&ot(a,"S").map(E=>Tt(E)),list:t&&yt(Tt(t),{segmentUrls:i,initialization:Tt(h)}),base:s&&yt(Tt(s),{initialization:Tt(h)})};return Object.keys(g).forEach(E=>{g[E]||delete g[E]}),g},zh=(n,e,t)=>i=>{const s=ot(i,"BaseURL"),r=Js(e,s),a=yt(n,Tt(i)),l=Aa(i);return r.map(h=>({segmentInfo:yt(t,l),attributes:yt(a,h)}))},Hh=n=>n.reduce((e,t)=>{const i=Tt(t);i.schemeIdUri&&(i.schemeIdUri=i.schemeIdUri.toLowerCase());const s=Vh[i.schemeIdUri];if(s){e[s]={attributes:i};const r=ot(t,"cenc:pssh")[0];if(r){const a=cs(r);e[s].pssh=a&&ss(a)}}return e},{}),qh=n=>{if(n.schemeIdUri==="urn:scte:dash:cc:cea-608:2015")return(typeof n.value!="string"?[]:n.value.split(";")).map(t=>{let i,s;return s=t,/^CC\d=/.test(t)?[i,s]=t.split("="):/^CC\d$/.test(t)&&(i=t),{channel:i,language:s}});if(n.schemeIdUri==="urn:scte:dash:cc:cea-708:2015")return(typeof n.value!="string"?[]:n.value.split(";")).map(t=>{const i={channel:void 0,language:void 0,aspectRatio:1,easyReader:0,"3D":0};if(/=/.test(t)){const[s,r=""]=t.split("=");i.channel=s,i.language=t,r.split(",").forEach(a=>{const[l,h]=a.split(":");l==="lang"?i.language=h:l==="er"?i.easyReader=Number(h):l==="war"?i.aspectRatio=Number(h):l==="3D"&&(i["3D"]=Number(h))})}else i.language=t;return i.channel&&(i.channel="SERVICE"+i.channel),i})},Wh=n=>qt(ot(n.node,"EventStream").map(e=>{const t=Tt(e),i=t.schemeIdUri;return ot(e,"Event").map(s=>{const r=Tt(s),a=r.presentationTime||0,l=t.timescale||1,h=r.duration||0,m=a/l+n.attributes.start;return{schemeIdUri:i,value:t.value,id:r.id,start:m,end:m+h/l,messageData:cs(s)||r.messageData,contentEncoding:t.contentEncoding,presentationTimeOffset:t.presentationTimeOffset||0}})})),Gh=(n,e,t)=>i=>{const s=Tt(i),r=Js(e,ot(i,"BaseURL")),a=ot(i,"Role")[0],l={role:Tt(a)};let h=yt(n,s,l);const m=ot(i,"Accessibility")[0],g=qh(Tt(m));g&&(h=yt(h,{captionServices:g}));const E=ot(i,"Label")[0];if(E&&E.childNodes.length){const V=E.childNodes[0].nodeValue.trim();h=yt(h,{label:V})}const w=Hh(ot(i,"ContentProtection"));Object.keys(w).length&&(h=yt(h,{contentProtection:w}));const k=Aa(i),x=ot(i,"Representation"),L=yt(t,k);return qt(x.map(zh(h,r,L)))},$h=(n,e)=>(t,i)=>{const s=Js(e,ot(t.node,"BaseURL")),r=yt(n,{periodStart:t.attributes.start});typeof t.attributes.duration=="number"&&(r.periodDuration=t.attributes.duration);const a=ot(t.node,"AdaptationSet"),l=Aa(t.node);return qt(a.map(Gh(r,s,l)))},Xh=(n,e)=>{if(n.length>1&&e({type:"warn",message:"The MPD manifest should contain no more than one ContentSteering tag"}),!n.length)return null;const t=yt({serverURL:cs(n[0])},Tt(n[0]));return t.queryBeforeStart=t.queryBeforeStart==="true",t},Yh=({attributes:n,priorPeriodAttributes:e,mpdType:t})=>typeof n.start=="number"?n.start:e&&typeof e.start=="number"&&typeof e.duration=="number"?e.start+e.duration:!e&&t==="static"?0:null,Kh=(n,e={})=>{const{manifestUri:t="",NOW:i=Date.now(),clientOffset:s=0,eventHandler:r=function(){}}=e,a=ot(n,"Period");if(!a.length)throw new Error(Qi.INVALID_NUMBER_OF_PERIOD);const l=ot(n,"Location"),h=Tt(n),m=Js([{baseUrl:t}],ot(n,"BaseURL")),g=ot(n,"ContentSteering");h.type=h.type||"static",h.sourceDuration=h.mediaPresentationDuration||0,h.NOW=i,h.clientOffset=s,l.length&&(h.locations=l.map(cs));const E=[];return a.forEach((w,k)=>{const x=Tt(w),L=E[k-1];x.start=Yh({attributes:x,priorPeriodAttributes:L?L.attributes:null,mpdType:h.type}),E.push({node:w,attributes:x})}),{locations:h.locations,contentSteeringInfo:Xh(g,r),representationInfo:qt(E.map($h(h,m))),eventStream:qt(E.map(Wh))}},pl=n=>{if(n==="")throw new Error(Qi.DASH_EMPTY_MANIFEST);const e=new Tn.DOMParser;let t,i;try{t=e.parseFromString(n,"application/xml"),i=t&&t.documentElement.tagName==="MPD"?t.documentElement:null}catch(s){}if(!i||i&&i.getElementsByTagName("parsererror").length>0)throw new Error(Qi.DASH_INVALID_XML);return i},Qh=n=>{const e=ot(n,"UTCTiming")[0];if(!e)return null;const t=Tt(e);switch(t.schemeIdUri){case"urn:mpeg:dash:utc:http-head:2014":case"urn:mpeg:dash:utc:http-head:2012":t.method="HEAD";break;case"urn:mpeg:dash:utc:http-xsdate:2014":case"urn:mpeg:dash:utc:http-iso:2014":case"urn:mpeg:dash:utc:http-xsdate:2012":case"urn:mpeg:dash:utc:http-iso:2012":t.method="GET";break;case"urn:mpeg:dash:utc:direct:2014":case"urn:mpeg:dash:utc:direct:2012":t.method="DIRECT",t.value=Date.parse(t.value);break;case"urn:mpeg:dash:utc:http-ntp:2014":case"urn:mpeg:dash:utc:ntp:2014":case"urn:mpeg:dash:utc:sntp:2014":default:throw new Error(Qi.UNSUPPORTED_UTC_TIMING_SCHEME)}return t},wA=null,Jh=(n,e={})=>{const t=Kh(pl(n),e),i=Mh(t.representationInfo);return wh({dashPlaylists:i,locations:t.locations,contentSteering:t.contentSteeringInfo,sidxMapping:e.sidxMapping,previousManifest:e.previousManifest,eventStream:t.eventStream})},Zh=n=>Qh(pl(n));var ef=z(84221),tf=z.n(ef),nf=he([73,68,51]),sf=function(e,t){t===void 0&&(t=0),e=he(e);var i=e[t+5],s=e[t+6]<<21|e[t+7]<<14|e[t+8]<<7|e[t+9],r=(i&16)>>4;return r?s+20:s+10},ds=function n(e,t){return t===void 0&&(t=0),e=he(e),e.length-t<10||!qe(e,nf,{offset:t})?t:(t+=sf(e,t),n(e,t))},DA=function(e){var t="",i=e[1]>>>3,s=e[1]&31,r=e[2]>>>7,a=(e[2]&64)>>6,l=(e[2]&32)>>5,h=(e[2]&16)>>4,m=(e[2]&8)>>3,g=(e[2]&4)>>2,E=e[2]&3;t+=i+"."+padStart(s,2,"0"),r===0?t+="M":r===1&&(t+="H");var w;return i===2&&a?w=l?12:10:w=a?10:8,t+="."+padStart(w,2,"0"),t+="."+h,t+="."+m+g+E,t},kA=function(e){var t=toHexString(e[1]),i=toHexString(e[2]&252),s=toHexString(e[3]);return""+t+i+s},IA=function(e){var t="",i=e[1]>>6,s=e[1]&31,r=(e[1]&32)>>5,a=e.subarray(2,6),l=e.subarray(6,12),h=e[12];i===1?t+="A":i===2?t+="B":i===3&&(t+="C"),t+=s+".";var m=parseInt(toBinaryString(a).split("").reverse().join(""),2);m>255&&(m=parseInt(toBinaryString(a),2)),t+=m.toString(16)+".",r===0?t+="L":t+="H",t+=h;for(var g="",E=0;E<l.length;E++){var w=l[E];w&&(g&&(g+="."),g+=w.toString(16))}return g&&(t+="."+g),t},PA=new Uint8Array([79,112,117,115,72,101,97,100]),LA=function(e){var t=new DataView(e.buffer,e.byteOffset,e.byteLength),i=t.getUint8(0),s=i!==0,r={version:i,channels:t.getUint8(1),preSkip:t.getUint16(2,s),sampleRate:t.getUint32(4,s),outputGain:t.getUint16(8,s),channelMappingFamily:t.getUint8(10)};if(r.channelMappingFamily>0&&e.length>10){r.streamCount=t.getUint8(11),r.twoChannelStreamCount=t.getUint8(12),r.channelMapping=[];for(var a=0;a<r.channels;a++)r.channelMapping.push(t.getUint8(13+a))}return r},OA=function(e){var t=e.channelMappingFamily<=0?11:12+e.channels,i=new DataView(new ArrayBuffer(t)),s=e.version!==0;return i.setUint8(0,e.version),i.setUint8(1,e.channels),i.setUint16(2,e.preSkip,s),i.setUint32(4,e.sampleRate,s),i.setUint16(8,e.outputGain,s),i.setUint8(10,e.channelMappingFamily),e.channelMappingFamily>0&&(i.setUint8(11,e.streamCount),e.channelMapping.foreach(function(r,a){i.setUint8(12+a,r)})),new Uint8Array(i.buffer)},ya=function(e){return typeof e=="string"?Yi(e):e},rf=function(e){return Array.isArray(e)?e.map(function(t){return ya(t)}):[ya(e)]},_a,ba=function(e){e=he(e);for(var t=[],i=0;e.length>i;){var s=e[i],r=0,a=0;a++;var l=e[a];for(a++;l&128;)r=(l&127)<<7,l=e[a],a++;r+=l&127;for(var h=0;h<_a.length;h++){var m=_a[h],g=m.id,E=m.parser;if(s===g){t.push(E(e.subarray(a,a+r)));break}}i+=r+a}return t};_a=[{id:3,parser:function(e){var t={tag:3,id:e[0]<<8|e[1],flags:e[2],size:3,dependsOnEsId:0,ocrEsId:0,descriptors:[],url:""};if(t.flags&128&&(t.dependsOnEsId=e[t.size]<<8|e[t.size+1],t.size+=2),t.flags&64){var i=e[t.size];t.url=Gs(e.subarray(t.size+1,t.size+1+i)),t.size+=i}return t.flags&32&&(t.ocrEsId=e[t.size]<<8|e[t.size+1],t.size+=2),t.descriptors=ba(e.subarray(t.size))||[],t}},{id:4,parser:function(e){var t={tag:4,oti:e[0],streamType:e[1],bufferSize:e[2]<<16|e[3]<<8|e[4],maxBitrate:e[5]<<24|e[6]<<16|e[7]<<8|e[8],avgBitrate:e[9]<<24|e[10]<<16|e[11]<<8|e[12],descriptors:ba(e.subarray(13))};return t}},{id:5,parser:function(e){return{tag:5,bytes:e}}},{id:6,parser:function(e){return{tag:6,bytes:e}}}];var Ut=function n(e,t,i){i===void 0&&(i=!1),t=rf(t),e=he(e);var s=[];if(!t.length)return s;for(var r=0;r<e.length;){var a=(e[r]<<24|e[r+1]<<16|e[r+2]<<8|e[r+3])>>>0,l=e.subarray(r+4,r+8);if(a===0)break;var h=r+a;if(h>e.length){if(i)break;h=e.length}var m=e.subarray(r+8,h);qe(l,t[0])&&(t.length===1?s.push(m):s.push.apply(s,n(m,t.slice(1),i))),r=h}return s},Sn=function(e,t){if(t=ya(t),!t.length)return e.subarray(e.length);for(var i=0;i<e.length;){if(bytesMatch(e.subarray(i,i+t.length),t)){var s=(e[i-4]<<24|e[i-3]<<16|e[i-2]<<8|e[i-1])>>>0,r=s>1?i+s:e.byteLength;return e.subarray(i+4,r)}i++}return e.subarray(e.length)},hs=function(e,t,i){t===void 0&&(t=4),i===void 0&&(i=function(h){return bytesToNumber(h)});var s=[];if(!e||!e.length)return s;for(var r=bytesToNumber(e.subarray(4,8)),a=8;r;a+=t,r--)s.push(i(e.subarray(a,a+t)));return s},af=function(e,t){for(var i=hs(Ut(e,["stss"])[0]),s=hs(Ut(e,["stco"])[0]),r=hs(Ut(e,["stts"])[0],8,function(He){return{sampleCount:bytesToNumber(He.subarray(0,4)),sampleDelta:bytesToNumber(He.subarray(4,8))}}),a=hs(Ut(e,["stsc"])[0],12,function(He){return{firstChunk:bytesToNumber(He.subarray(0,4)),samplesPerChunk:bytesToNumber(He.subarray(4,8)),sampleDescriptionIndex:bytesToNumber(He.subarray(8,12))}}),l=Ut(e,["stsz"])[0],h=hs(l&&l.length&&l.subarray(4)||null),m=[],g=0;g<s.length;g++){for(var E=void 0,w=0;w<a.length;w++){var k=a[w],x=g+1>=k.firstChunk&&(w+1>=a.length||g+1<a[w+1].firstChunk);if(x){E=k.samplesPerChunk;break}}for(var L=s[g],V=0;V<E;V++){var H=h[m.length],R=!i.length;i.length&&i.indexOf(m.length+1)!==-1&&(R=!0);for(var Z={keyframe:R,start:L,end:L+H},q=0;q<r.length;q++){var P=r[q],de=P.sampleCount,Ee=P.sampleDelta;if(m.length<=de){var Ue=m.length?m[m.length-1].timestamp:0;Z.timestamp=Ue+Ee/t*1e3,Z.duration=Ee;break}}m.push(Z),L+=H}}return m},of=function(e,t){var i=bytesToString(t.subarray(0,4));if(e.type==="video"?(e.info=e.info||{},e.info.width=t[28]<<8|t[29],e.info.height=t[30]<<8|t[31]):e.type==="audio"&&(e.info=e.info||{},e.info.channels=t[20]<<8|t[21],e.info.bitDepth=t[22]<<8|t[23],e.info.sampleRate=t[28]<<8|t[29]),i==="avc1"){var s=Sn(t,"avcC");i+="."+getAvcCodec(s),e.info.avcC=s}else if(i==="hvc1"||i==="hev1")i+="."+getHvcCodec(Sn(t,"hvcC"));else if(i==="mp4a"||i==="mp4v"){var r=Sn(t,"esds"),a=ba(r.subarray(4))[0],l=a&&a.descriptors.filter(function(R){var Z=R.tag;return Z===4})[0];l?(i+="."+toHexString(l.oti),l.oti===64?i+="."+(l.descriptors[0].bytes[0]>>3).toString():l.oti===32?i+="."+l.descriptors[0].bytes[4].toString():l.oti===221&&(i="vorbis")):e.type==="audio"?i+=".40.2":i+=".20.9"}else if(i==="av01")i+="."+getAv1Codec(Sn(t,"av1C"));else if(i==="vp09"){var h=Sn(t,"vpcC"),m=h[0],g=h[1],E=h[2]>>4,w=(h[2]&15)>>1,k=(h[2]&15)>>3,x=h[3],L=h[4],V=h[5];i+="."+padStart(m,2,"0"),i+="."+padStart(g,2,"0"),i+="."+padStart(E,2,"0"),i+="."+padStart(w,2,"0"),i+="."+padStart(x,2,"0"),i+="."+padStart(L,2,"0"),i+="."+padStart(V,2,"0"),i+="."+padStart(k,2,"0")}else if(i==="theo")i="theora";else if(i==="spex")i="speex";else if(i===".mp3")i="mp4a.40.34";else if(i==="msVo")i="vorbis";else if(i==="Opus"){i="opus";var H=Sn(t,"dOps");e.info.opus=parseOpusHead(H),e.info.codecDelay=65e5}else i=i.toLowerCase();e.codec=i},RA=function(e,t){t===void 0&&(t=!0),e=toUint8(e);var i=Ut(e,["moov","trak"],!0),s=[];return i.forEach(function(r){var a={bytes:r},l=Ut(r,["mdia"])[0],h=Ut(l,["hdlr"])[0],m=bytesToString(h.subarray(8,12));m==="soun"?a.type="audio":m==="vide"?a.type="video":a.type=m;var g=Ut(r,["tkhd"])[0];if(g){var E=new DataView(g.buffer,g.byteOffset,g.byteLength),w=E.getUint8(0);a.number=w===0?E.getUint32(12):E.getUint32(20)}var k=Ut(l,["mdhd"])[0];if(k){var x=k[0],L=x===0?12:20;a.timescale=(k[L]<<24|k[L+1]<<16|k[L+2]<<8|k[L+3])>>>0}for(var V=Ut(l,["minf","stbl"])[0],H=Ut(V,["stsd"])[0],R=bytesToNumber(H.subarray(4,8)),Z=8;R--;){var q=bytesToNumber(H.subarray(Z,Z+4)),P=H.subarray(Z+4,Z+4+q);of(a,P),Z+=4+q}t&&(a.frameTable=af(V,a.timescale)),s.push(a)}),s},NA=function(e){var t=Ut(e,["moov","mvhd"],!0)[0];if(!(!t||!t.length)){var i={};return t[0]===1?(i.timestampScale=bytesToNumber(t.subarray(20,24)),i.duration=bytesToNumber(t.subarray(24,32))):(i.timestampScale=bytesToNumber(t.subarray(12,16)),i.duration=bytesToNumber(t.subarray(16,20))),i.bytes=t,i}},st={EBML:he([26,69,223,163]),DocType:he([66,130]),Segment:he([24,83,128,103]),SegmentInfo:he([21,73,169,102]),Tracks:he([22,84,174,107]),Track:he([174]),TrackNumber:he([215]),DefaultDuration:he([35,227,131]),TrackEntry:he([174]),TrackType:he([131]),FlagDefault:he([136]),CodecID:he([134]),CodecPrivate:he([99,162]),VideoTrack:he([224]),AudioTrack:he([225]),Cluster:he([31,67,182,117]),Timestamp:he([231]),TimestampScale:he([42,215,177]),BlockGroup:he([160]),BlockDuration:he([155]),Block:he([161]),SimpleBlock:he([163])},Ea=[128,64,32,16,8,4,2,1],lf=function(e){for(var t=1,i=0;i<Ea.length&&!(e&Ea[i]);i++)t++;return t},Ji=function(e,t,i,s){i===void 0&&(i=!0),s===void 0&&(s=!1);var r=lf(e[t]),a=e.subarray(t,t+r);return i&&(a=Array.prototype.slice.call(e,t,t+r),a[0]^=Ea[r-1]),{length:r,value:ma(a,{signed:s}),bytes:a}},ml=function n(e){return typeof e=="string"?e.match(/.{1,2}/g).map(function(t){return n(t)}):typeof e=="number"?ga(e):e},uf=function(e){return Array.isArray(e)?e.map(function(t){return ml(t)}):[ml(e)]},cf=function n(e,t,i){if(i>=t.length)return t.length;var s=Ji(t,i,!1);if(qe(e.bytes,s.bytes))return i;var r=Ji(t,i+s.length);return n(e,t,i+r.length+r.value+s.length)},ht=function n(e,t){t=uf(t),e=he(e);var i=[];if(!t.length)return i;for(var s=0;s<e.length;){var r=Ji(e,s,!1),a=Ji(e,s+r.length),l=s+r.length+a.length;a.value===127&&(a.value=cf(r,e,l),a.value!==e.length&&(a.value-=l));var h=l+a.value>e.length?e.length:l+a.value,m=e.subarray(l,h);qe(t[0],r.bytes)&&(t.length===1?i.push(m):i=i.concat(n(m,t.slice(1))));var g=r.length+a.length+m.length;s+=g}return i},df=function(e,t,i,s){var r;t==="group"&&(r=ht(e,[st.BlockDuration])[0],r&&(r=bytesToNumber(r),r=1/i*r*i/1e3),e=ht(e,[st.Block])[0],t="block");var a=new DataView(e.buffer,e.byteOffset,e.byteLength),l=Ji(e,0),h=a.getInt16(l.length,!1),m=e[l.length+2],g=e.subarray(l.length+3),E=1/i*(s+h)*i/1e3,w={duration:r,trackNumber:l.value,keyframe:t==="simple"&&m>>7===1,invisible:(m&8)>>3===1,lacing:(m&6)>>1,discardable:t==="simple"&&(m&1)===1,frames:[],pts:E,dts:E,timestamp:h};if(!w.lacing)return w.frames.push(g),w;var k=g[0]+1,x=[],L=1;if(w.lacing===2)for(var V=(g.length-L)/k,H=0;H<k;H++)x.push(V);if(w.lacing===1)for(var R=0;R<k-1;R++){var Z=0;do Z+=g[L],L++;while(g[L-1]===255);x.push(Z)}if(w.lacing===3)for(var q=0,P=0;P<k-1;P++){var de=P===0?Ji(g,L):Ji(g,L,!0,!0);q+=de.value,x.push(q),L+=de.length}return x.forEach(function(Ee){w.frames.push(g.subarray(L,L+Ee)),L+=Ee}),w},hf=function(e){for(var t=0,i={};t<e.length;){var s=e[t]&127,r=e[t+1],a=void 0;r===1?a=e[t+2]:a=e.subarray(t+2,t+2+r),s===1?i.profile=a:s===2?i.level=a:s===3?i.bitDepth=a:s===4?i.chromaSubsampling=a:i[s]=a,t+=2+r}return i},ff=function(e){e=toUint8(e);var t=[],i=ht(e,[st.Segment,st.Tracks,st.Track]);return i.length||(i=ht(e,[st.Tracks,st.Track])),i.length||(i=ht(e,[st.Track])),i.length?(i.forEach(function(s){var r=ht(s,st.TrackType)[0];if(!(!r||!r.length)){if(r[0]===1)r="video";else if(r[0]===2)r="audio";else if(r[0]===17)r="subtitle";else return;var a={rawCodec:bytesToString(ht(s,[st.CodecID])[0]),type:r,codecPrivate:ht(s,[st.CodecPrivate])[0],number:bytesToNumber(ht(s,[st.TrackNumber])[0]),defaultDuration:bytesToNumber(ht(s,[st.DefaultDuration])[0]),default:ht(s,[st.FlagDefault])[0],rawData:s},l="";if(/V_MPEG4\/ISO\/AVC/.test(a.rawCodec))l="avc1."+getAvcCodec(a.codecPrivate);else if(/V_MPEGH\/ISO\/HEVC/.test(a.rawCodec))l="hev1."+getHvcCodec(a.codecPrivate);else if(/V_MPEG4\/ISO\/ASP/.test(a.rawCodec))a.codecPrivate?l="mp4v.20."+a.codecPrivate[4].toString():l="mp4v.20.9";else if(/^V_THEORA/.test(a.rawCodec))l="theora";else if(/^V_VP8/.test(a.rawCodec))l="vp8";else if(/^V_VP9/.test(a.rawCodec))if(a.codecPrivate){var h=hf(a.codecPrivate),m=h.profile,g=h.level,E=h.bitDepth,w=h.chromaSubsampling;l="vp09.",l+=padStart(m,2,"0")+".",l+=padStart(g,2,"0")+".",l+=padStart(E,2,"0")+".",l+=""+padStart(w,2,"0");var k=ht(s,[224,[85,176],[85,177]])[0]||[],x=ht(s,[224,[85,176],[85,185]])[0]||[],L=ht(s,[224,[85,176],[85,186]])[0]||[],V=ht(s,[224,[85,176],[85,187]])[0]||[];(k.length||x.length||L.length||V.length)&&(l+="."+padStart(V[0],2,"0"),l+="."+padStart(L[0],2,"0"),l+="."+padStart(k[0],2,"0"),l+="."+padStart(x[0],2,"0"))}else l="vp9";else/^V_AV1/.test(a.rawCodec)?l="av01."+getAv1Codec(a.codecPrivate):/A_ALAC/.test(a.rawCodec)?l="alac":/A_MPEG\/L2/.test(a.rawCodec)?l="mp2":/A_MPEG\/L3/.test(a.rawCodec)?l="mp3":/^A_AAC/.test(a.rawCodec)?a.codecPrivate?l="mp4a.40."+(a.codecPrivate[0]>>>3).toString():l="mp4a.40.2":/^A_AC3/.test(a.rawCodec)?l="ac-3":/^A_PCM/.test(a.rawCodec)?l="pcm":/^A_MS\/ACM/.test(a.rawCodec)?l="speex":/^A_EAC3/.test(a.rawCodec)?l="ec-3":/^A_VORBIS/.test(a.rawCodec)?l="vorbis":/^A_FLAC/.test(a.rawCodec)?l="flac":/^A_OPUS/.test(a.rawCodec)&&(l="opus");a.codec=l,t.push(a)}}),t.sort(function(s,r){return s.number-r.number})):t},MA=function(e,t){var i=[],s=ht(e,[st.Segment])[0],r=ht(s,[st.SegmentInfo,st.TimestampScale])[0];r&&r.length?r=bytesToNumber(r):r=1e6;var a=ht(s,[st.Cluster]);return t||(t=ff(s)),a.forEach(function(l,h){var m=ht(l,[st.SimpleBlock]).map(function(k){return{type:"simple",data:k}}),g=ht(l,[st.BlockGroup]).map(function(k){return{type:"group",data:k}}),E=ht(l,[st.Timestamp])[0]||0;E&&E.length&&(E=bytesToNumber(E));var w=m.concat(g).sort(function(k,x){return k.data.byteOffset-x.data.byteOffset});w.forEach(function(k,x){var L=df(k.data,k.type,r,E);i.push(L)})}),{tracks:t,blocks:i}},pf=he([0,0,0,1]),mf=he([0,0,1]),gf=he([0,0,3]),vf=function(e){for(var t=[],i=1;i<e.length-2;)qe(e.subarray(i,i+3),gf)&&(t.push(i+2),i++),i++;if(t.length===0)return e;var s=e.length-t.length,r=new Uint8Array(s),a=0;for(i=0;i<s;a++,i++)a===t[0]&&(a++,t.shift()),r[i]=e[a];return r},gl=function(e,t,i,s){s===void 0&&(s=1/0),e=he(e),i=[].concat(i);for(var r=0,a,l=0;r<e.length&&(l<s||a);){var h=void 0;if(qe(e.subarray(r),pf)?h=4:qe(e.subarray(r),mf)&&(h=3),!h){r++;continue}if(l++,a)return vf(e.subarray(a,r));var m=void 0;t==="h264"?m=e[r+h]&31:t==="h265"&&(m=e[r+h]>>1&63),i.indexOf(m)!==-1&&(a=r+h),r+=h+(t==="h264"?1:2)}return e.subarray(0,0)},Af=function(e,t,i){return gl(e,"h264",t,i)},yf=function(e,t,i){return gl(e,"h265",t,i)},kt={webm:he([119,101,98,109]),matroska:he([109,97,116,114,111,115,107,97]),flac:he([102,76,97,67]),ogg:he([79,103,103,83]),ac3:he([11,119]),riff:he([82,73,70,70]),avi:he([65,86,73]),wav:he([87,65,86,69]),"3gp":he([102,116,121,112,51,103]),mp4:he([102,116,121,112]),fmp4:he([115,116,121,112]),mov:he([102,116,121,112,113,116]),moov:he([109,111,111,118]),moof:he([109,111,111,102])},jn={aac:function(e){var t=ds(e);return qe(e,[255,16],{offset:t,mask:[255,22]})},mp3:function(e){var t=ds(e);return qe(e,[255,2],{offset:t,mask:[255,6]})},webm:function(e){var t=ht(e,[st.EBML,st.DocType])[0];return qe(t,kt.webm)},mkv:function(e){var t=ht(e,[st.EBML,st.DocType])[0];return qe(t,kt.matroska)},mp4:function(e){if(jn["3gp"](e)||jn.mov(e))return!1;if(qe(e,kt.mp4,{offset:4})||qe(e,kt.fmp4,{offset:4})||qe(e,kt.moof,{offset:4})||qe(e,kt.moov,{offset:4}))return!0},mov:function(e){return qe(e,kt.mov,{offset:4})},"3gp":function(e){return qe(e,kt["3gp"],{offset:4})},ac3:function(e){var t=ds(e);return qe(e,kt.ac3,{offset:t})},ts:function(e){if(e.length<189&&e.length>=1)return e[0]===71;for(var t=0;t+188<e.length&&t<188;){if(e[t]===71&&e[t+188]===71)return!0;t+=1}return!1},flac:function(e){var t=ds(e);return qe(e,kt.flac,{offset:t})},ogg:function(e){return qe(e,kt.ogg)},avi:function(e){return qe(e,kt.riff)&&qe(e,kt.avi,{offset:8})},wav:function(e){return qe(e,kt.riff)&&qe(e,kt.wav,{offset:8})},h264:function(e){return Af(e,7,3).length},h265:function(e){return yf(e,[32,33],3).length}},Ta=Object.keys(jn).filter(function(n){return n!=="ts"&&n!=="h264"&&n!=="h265"}).concat(["ts","h264","h265"]);Ta.forEach(function(n){var e=jn[n];jn[n]=function(t){return e(he(t))}});var _f=jn,Ca=function(e){e=he(e);for(var t=0;t<Ta.length;t++){var i=Ta[t];if(_f[i](e))return i}return""},bf=function(e){return Ut(e,["moof"]).length>0},Zs=z(51489),Ef=z(25108);/**
 * @license
 * Video.js 8.6.1 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/main/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/main/LICENSE>
 */var vl="8.6.1";const wi={},Fi=function(n,e){return wi[n]=wi[n]||[],e&&(wi[n]=wi[n].concat(e)),wi[n]},Tf=function(n,e){Fi(n,e)},Al=function(n,e){const t=Fi(n).indexOf(e);return t<=-1?!1:(wi[n]=wi[n].slice(),wi[n].splice(t,1),!0)},Cf=function(n,e){Fi(n,[].concat(e).map(t=>{const i=(...s)=>(Al(n,i),t(...s));return i}))},er={prefixed:!0},tr=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror","fullscreen"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror","-webkit-full-screen"]],yl=tr[0];let fs;for(let n=0;n<tr.length;n++)if(tr[n][1]in I()){fs=tr[n];break}if(fs){for(let n=0;n<fs.length;n++)er[yl[n]]=fs[n];er.prefixed=fs[0]!==yl[0]}let Ft=[];const xf=(n,e,t)=>(i,s,r)=>{const a=e.levels[s],l=new RegExp(`^(${a})$`);let h=n;if(i!=="log"&&r.unshift(i.toUpperCase()+":"),t&&(h=`%c${n}`,r.unshift(t)),r.unshift(h+":"),Ft){Ft.push([].concat(r));const g=Ft.length-1e3;Ft.splice(0,g>0?g:0)}if(!A().console)return;let m=A().console[i];!m&&i==="debug"&&(m=A().console.info||A().console.log),!(!m||!a||!l.test(i))&&m[Array.isArray(r)?"apply":"call"](A().console,r)};function xa(n,e=":",t=""){let i="info",s;const r=function(...a){s("log",i,a)};return s=xf(n,r,t),r.createLogger=(a,l,h)=>{const m=l!==void 0?l:e,g=h!==void 0?h:t,E=`${n} ${m} ${a}`;return xa(E,m,g)},r.createNewLogger=(a,l,h)=>xa(a,l,h),r.levels={all:"debug|log|warn|error",off:"",debug:"debug|log|warn|error",info:"log|warn|error",warn:"warn|error",error:"error",DEFAULT:i},r.level=a=>{if(typeof a=="string"){if(!r.levels.hasOwnProperty(a))throw new Error(`"${a}" in not a valid log level`);i=a}return i},r.history=()=>Ft?[].concat(Ft):[],r.history.filter=a=>(Ft||[]).filter(l=>new RegExp(`.*${a}.*`).test(l[0])),r.history.clear=()=>{Ft&&(Ft.length=0)},r.history.disable=()=>{Ft!==null&&(Ft.length=0,Ft=null)},r.history.enable=()=>{Ft===null&&(Ft=[])},r.error=(...a)=>s("error",i,a),r.warn=(...a)=>s("warn",i,a),r.debug=(...a)=>s("debug",i,a),r}const Me=xa("VIDEOJS"),_l=Me.createLogger,Sf=Object.prototype.toString,bl=function(n){return pi(n)?Object.keys(n):[]};function Bn(n,e){bl(n).forEach(t=>e(n[t],t))}function El(n,e,t=0){return bl(n).reduce((i,s)=>e(i,n[s],s),t)}function pi(n){return!!n&&typeof n=="object"}function wn(n){return pi(n)&&Sf.call(n)==="[object Object]"&&n.constructor===Object}function et(...n){const e={};return n.forEach(t=>{t&&Bn(t,(i,s)=>{if(!wn(i)){e[s]=i;return}wn(e[s])||(e[s]={}),e[s]=et(e[s],i)})}),e}function Tl(n={}){const e=[];for(const t in n)if(n.hasOwnProperty(t)){const i=n[t];e.push(i)}return e}function ir(n,e,t,i=!0){const s=a=>Object.defineProperty(n,e,{value:a,enumerable:!0,writable:!0}),r={configurable:!0,enumerable:!0,get(){const a=t();return s(a),a}};return i&&(r.set=s),Object.defineProperty(n,e,r)}var jf=Object.freeze({__proto__:null,each:Bn,reduce:El,isObject:pi,isPlain:wn,merge:et,values:Tl,defineLazyProperty:ir});let Sa=!1,Cl=null,mi=!1,xl,Sl=!1,Dn=!1,kn=!1,gi=!1,ja=null,nr=null,jl=null,sr=!1,rr=!1,ar=!1,or=!1;const ps=!!(Pn()&&("ontouchstart"in A()||A().navigator.maxTouchPoints||A().DocumentTouch&&A().document instanceof A().DocumentTouch)),In=A().navigator&&A().navigator.userAgentData;if(In&&(mi=In.platform==="Android",Dn=!!In.brands.find(n=>n.brand==="Microsoft Edge"),kn=!!In.brands.find(n=>n.brand==="Chromium"),gi=!Dn&&kn,ja=nr=(In.brands.find(n=>n.brand==="Chromium")||{}).version||null,rr=In.platform==="Windows"),!kn){const n=A().navigator&&A().navigator.userAgent||"";Sa=/iPod/i.test(n),Cl=function(){const e=n.match(/OS (\d+)_/i);return e&&e[1]?e[1]:null}(),mi=/Android/i.test(n),xl=function(){const e=n.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if(!e)return null;const t=e[1]&&parseFloat(e[1]),i=e[2]&&parseFloat(e[2]);return t&&i?parseFloat(e[1]+"."+e[2]):t||null}(),Sl=/Firefox/i.test(n),Dn=/Edg/i.test(n),kn=/Chrome/i.test(n)||/CriOS/i.test(n),gi=!Dn&&kn,ja=nr=function(){const e=n.match(/(Chrome|CriOS)\/(\d+)/);return e&&e[2]?parseFloat(e[2]):null}(),jl=function(){const e=/MSIE\s(\d+)\.\d/.exec(n);let t=e&&parseFloat(e[1]);return!t&&/Trident\/7.0/i.test(n)&&/rv:11.0/.test(n)&&(t=11),t}(),sr=/Safari/i.test(n)&&!gi&&!mi&&!Dn,rr=/Windows/i.test(n),ar=/iPad/i.test(n)||sr&&ps&&!/iPhone/i.test(n),or=/iPhone/i.test(n)&&!ar}const It=or||ar||Sa,lr=(sr||It)&&!gi;var Bf=Object.freeze({__proto__:null,get IS_IPOD(){return Sa},get IOS_VERSION(){return Cl},get IS_ANDROID(){return mi},get ANDROID_VERSION(){return xl},get IS_FIREFOX(){return Sl},get IS_EDGE(){return Dn},get IS_CHROMIUM(){return kn},get IS_CHROME(){return gi},get CHROMIUM_VERSION(){return ja},get CHROME_VERSION(){return nr},get IE_VERSION(){return jl},get IS_SAFARI(){return sr},get IS_WINDOWS(){return rr},get IS_IPAD(){return ar},get IS_IPHONE(){return or},TOUCH_ENABLED:ps,IS_IOS:It,IS_ANY_SAFARI:lr});function Bl(n){return typeof n=="string"&&!!n.trim()}function wf(n){if(n.indexOf(" ")>=0)throw new Error("class has illegal whitespace characters")}function Pn(){return I()===A().document}function Ln(n){return pi(n)&&n.nodeType===1}function wl(){try{return A().parent!==A().self}catch(n){return!0}}function Dl(n){return function(e,t){if(!Bl(e))return I()[n](null);Bl(t)&&(t=I().querySelector(t));const i=Ln(t)?t:I();return i[n]&&i[n](e)}}function Re(n="div",e={},t={},i){const s=I().createElement(n);return Object.getOwnPropertyNames(e).forEach(function(r){const a=e[r];r==="textContent"?Vi(s,a):(s[r]!==a||r==="tabIndex")&&(s[r]=a)}),Object.getOwnPropertyNames(t).forEach(function(r){s.setAttribute(r,t[r])}),i&&wa(s,i),s}function Vi(n,e){return typeof n.textContent=="undefined"?n.innerText=e:n.textContent=e,n}function Ba(n,e){e.firstChild?e.insertBefore(n,e.firstChild):e.appendChild(n)}function ms(n,e){return wf(e),n.classList.contains(e)}function Zi(n,...e){return n.classList.add(...e.reduce((t,i)=>t.concat(i.split(/\s+/)),[])),n}function ur(n,...e){return n?(n.classList.remove(...e.reduce((t,i)=>t.concat(i.split(/\s+/)),[])),n):(Me.warn("removeClass was called with an element that doesn't exist"),null)}function kl(n,e,t){return typeof t=="function"&&(t=t(n,e)),typeof t!="boolean"&&(t=void 0),e.split(/\s+/).forEach(i=>n.classList.toggle(i,t)),n}function Il(n,e){Object.getOwnPropertyNames(e).forEach(function(t){const i=e[t];i===null||typeof i=="undefined"||i===!1?n.removeAttribute(t):n.setAttribute(t,i===!0?"":i)})}function zi(n){const e={},t=["autoplay","controls","playsinline","loop","muted","default","defaultMuted"];if(n&&n.attributes&&n.attributes.length>0){const i=n.attributes;for(let s=i.length-1;s>=0;s--){const r=i[s].name;let a=i[s].value;t.includes(r)&&(a=a!==null),e[r]=a}}return e}function Pl(n,e){return n.getAttribute(e)}function On(n,e,t){n.setAttribute(e,t)}function cr(n,e){n.removeAttribute(e)}function Ll(){I().body.focus(),I().onselectstart=function(){return!1}}function Ol(){I().onselectstart=function(){return!0}}function Rn(n){if(n&&n.getBoundingClientRect&&n.parentNode){const e=n.getBoundingClientRect(),t={};return["bottom","height","left","right","top","width"].forEach(i=>{e[i]!==void 0&&(t[i]=e[i])}),t.height||(t.height=parseFloat(Nn(n,"height"))),t.width||(t.width=parseFloat(Nn(n,"width"))),t}}function gs(n){if(!n||n&&!n.offsetParent)return{left:0,top:0,width:0,height:0};const e=n.offsetWidth,t=n.offsetHeight;let i=0,s=0;for(;n.offsetParent&&n!==I()[er.fullscreenElement];)i+=n.offsetLeft,s+=n.offsetTop,n=n.offsetParent;return{left:i,top:s,width:e,height:t}}function dr(n,e){const t={x:0,y:0};if(It){let g=n;for(;g&&g.nodeName.toLowerCase()!=="html";){const E=Nn(g,"transform");if(/^matrix/.test(E)){const w=E.slice(7,-1).split(/,\s/).map(Number);t.x+=w[4],t.y+=w[5]}else if(/^matrix3d/.test(E)){const w=E.slice(9,-1).split(/,\s/).map(Number);t.x+=w[12],t.y+=w[13]}g=g.parentNode}}const i={},s=gs(e.target),r=gs(n),a=r.width,l=r.height;let h=e.offsetY-(r.top-s.top),m=e.offsetX-(r.left-s.left);return e.changedTouches&&(m=e.changedTouches[0].pageX-r.left,h=e.changedTouches[0].pageY+r.top,It&&(m-=t.x,h-=t.y)),i.y=1-Math.max(0,Math.min(1,h/l)),i.x=Math.max(0,Math.min(1,m/a)),i}function Rl(n){return pi(n)&&n.nodeType===3}function hr(n){for(;n.firstChild;)n.removeChild(n.firstChild);return n}function Nl(n){return typeof n=="function"&&(n=n()),(Array.isArray(n)?n:[n]).map(e=>{if(typeof e=="function"&&(e=e()),Ln(e)||Rl(e))return e;if(typeof e=="string"&&/\S/.test(e))return I().createTextNode(e)}).filter(e=>e)}function wa(n,e){return Nl(e).forEach(t=>n.appendChild(t)),n}function Ml(n,e){return wa(hr(n),e)}function vs(n){return n.button===void 0&&n.buttons===void 0||n.button===0&&n.buttons===void 0||n.type==="mouseup"&&n.button===0&&n.buttons===0?!0:!(n.button!==0||n.buttons!==1)}const Hi=Dl("querySelector"),Ul=Dl("querySelectorAll");function Nn(n,e){if(!n||!e)return"";if(typeof A().getComputedStyle=="function"){let t;try{t=A().getComputedStyle(n)}catch(i){return""}return t?t.getPropertyValue(e)||t[e]:""}return""}function Fl(n){[...I().styleSheets].forEach(e=>{try{const t=[...e.cssRules].map(s=>s.cssText).join(""),i=I().createElement("style");i.textContent=t,n.document.head.appendChild(i)}catch(t){const i=I().createElement("link");i.rel="stylesheet",i.type=e.type,i.media=e.media.mediaText,i.href=e.href,n.document.head.appendChild(i)}})}var Vl=Object.freeze({__proto__:null,isReal:Pn,isEl:Ln,isInFrame:wl,createEl:Re,textContent:Vi,prependTo:Ba,hasClass:ms,addClass:Zi,removeClass:ur,toggleClass:kl,setAttributes:Il,getAttributes:zi,getAttribute:Pl,setAttribute:On,removeAttribute:cr,blockTextSelection:Ll,unblockTextSelection:Ol,getBoundingClientRect:Rn,findPosition:gs,getPointerPosition:dr,isTextNode:Rl,emptyEl:hr,normalizeContent:Nl,appendContent:wa,insertContent:Ml,isSingleLeftClick:vs,$:Hi,$$:Ul,computedStyle:Nn,copyStyleSheetsToWindow:Fl});let zl=!1,Da;const Df=function(){if(Da.options.autoSetup===!1)return;const n=Array.prototype.slice.call(I().getElementsByTagName("video")),e=Array.prototype.slice.call(I().getElementsByTagName("audio")),t=Array.prototype.slice.call(I().getElementsByTagName("video-js")),i=n.concat(e,t);if(i&&i.length>0)for(let s=0,r=i.length;s<r;s++){const a=i[s];if(a&&a.getAttribute)a.player===void 0&&a.getAttribute("data-setup")!==null&&Da(a);else{ka(1);break}}else zl||ka(1)};function ka(n,e){Pn()&&(e&&(Da=e),A().setTimeout(Df,n))}function Ia(){zl=!0,A().removeEventListener("load",Ia)}Pn()&&(I().readyState==="complete"?Ia():A().addEventListener("load",Ia));const Hl=function(n){const e=I().createElement("style");return e.className=n,e},ql=function(n,e){n.styleSheet?n.styleSheet.cssText=e:n.textContent=e};var Pt=new WeakMap;let kf=3;function vi(){return kf++}function Wl(n,e){if(!Pt.has(n))return;const t=Pt.get(n);t.handlers[e].length===0&&(delete t.handlers[e],n.removeEventListener?n.removeEventListener(e,t.dispatcher,!1):n.detachEvent&&n.detachEvent("on"+e,t.dispatcher)),Object.getOwnPropertyNames(t.handlers).length<=0&&(delete t.handlers,delete t.dispatcher,delete t.disabled),Object.getOwnPropertyNames(t).length===0&&Pt.delete(n)}function Pa(n,e,t,i){t.forEach(function(s){n(e,s,i)})}function fr(n){if(n.fixed_)return n;function e(){return!0}function t(){return!1}if(!n||!n.isPropagationStopped||!n.isImmediatePropagationStopped){const i=n||A().event;n={};for(const s in i)s!=="layerX"&&s!=="layerY"&&s!=="keyLocation"&&s!=="webkitMovementX"&&s!=="webkitMovementY"&&s!=="path"&&(s==="returnValue"&&i.preventDefault||(n[s]=i[s]));if(n.target||(n.target=n.srcElement||I()),n.relatedTarget||(n.relatedTarget=n.fromElement===n.target?n.toElement:n.fromElement),n.preventDefault=function(){i.preventDefault&&i.preventDefault(),n.returnValue=!1,i.returnValue=!1,n.defaultPrevented=!0},n.defaultPrevented=!1,n.stopPropagation=function(){i.stopPropagation&&i.stopPropagation(),n.cancelBubble=!0,i.cancelBubble=!0,n.isPropagationStopped=e},n.isPropagationStopped=t,n.stopImmediatePropagation=function(){i.stopImmediatePropagation&&i.stopImmediatePropagation(),n.isImmediatePropagationStopped=e,n.stopPropagation()},n.isImmediatePropagationStopped=t,n.clientX!==null&&n.clientX!==void 0){const s=I().documentElement,r=I().body;n.pageX=n.clientX+(s&&s.scrollLeft||r&&r.scrollLeft||0)-(s&&s.clientLeft||r&&r.clientLeft||0),n.pageY=n.clientY+(s&&s.scrollTop||r&&r.scrollTop||0)-(s&&s.clientTop||r&&r.clientTop||0)}n.which=n.charCode||n.keyCode,n.button!==null&&n.button!==void 0&&(n.button=n.button&1?0:n.button&4?1:n.button&2?2:0)}return n.fixed_=!0,n}let pr;const If=function(){if(typeof pr!="boolean"){pr=!1;try{const n=Object.defineProperty({},"passive",{get(){pr=!0}});A().addEventListener("test",null,n),A().removeEventListener("test",null,n)}catch(n){}}return pr},Pf=["touchstart","touchmove"];function Gt(n,e,t){if(Array.isArray(e))return Pa(Gt,n,e,t);Pt.has(n)||Pt.set(n,{});const i=Pt.get(n);if(i.handlers||(i.handlers={}),i.handlers[e]||(i.handlers[e]=[]),t.guid||(t.guid=vi()),i.handlers[e].push(t),i.dispatcher||(i.disabled=!1,i.dispatcher=function(s,r){if(i.disabled)return;s=fr(s);const a=i.handlers[s.type];if(a){const l=a.slice(0);for(let h=0,m=l.length;h<m&&!s.isImmediatePropagationStopped();h++)try{l[h].call(n,s,r)}catch(g){Me.error(g)}}}),i.handlers[e].length===1)if(n.addEventListener){let s=!1;If()&&Pf.indexOf(e)>-1&&(s={passive:!0}),n.addEventListener(e,i.dispatcher,s)}else n.attachEvent&&n.attachEvent("on"+e,i.dispatcher)}function jt(n,e,t){if(!Pt.has(n))return;const i=Pt.get(n);if(!i.handlers)return;if(Array.isArray(e))return Pa(jt,n,e,t);const s=function(a,l){i.handlers[l]=[],Wl(a,l)};if(e===void 0){for(const a in i.handlers)Object.prototype.hasOwnProperty.call(i.handlers||{},a)&&s(n,a);return}const r=i.handlers[e];if(r){if(!t){s(n,e);return}if(t.guid)for(let a=0;a<r.length;a++)r[a].guid===t.guid&&r.splice(a--,1);Wl(n,e)}}function Mn(n,e,t){const i=Pt.has(n)?Pt.get(n):{},s=n.parentNode||n.ownerDocument;if(typeof e=="string"?e={type:e,target:n}:e.target||(e.target=n),e=fr(e),i.dispatcher&&i.dispatcher.call(n,e,t),s&&!e.isPropagationStopped()&&e.bubbles===!0)Mn.call(null,s,e,t);else if(!s&&!e.defaultPrevented&&e.target&&e.target[e.type]){Pt.has(e.target)||Pt.set(e.target,{});const r=Pt.get(e.target);e.target[e.type]&&(r.disabled=!0,typeof e.target[e.type]=="function"&&e.target[e.type](),r.disabled=!1)}return!e.defaultPrevented}function mr(n,e,t){if(Array.isArray(e))return Pa(mr,n,e,t);const i=function(){jt(n,e,i),t.apply(this,arguments)};i.guid=t.guid=t.guid||vi(),Gt(n,e,i)}function La(n,e,t){const i=function(){jt(n,e,i),t.apply(this,arguments)};i.guid=t.guid=t.guid||vi(),Gt(n,e,i)}var Lf=Object.freeze({__proto__:null,fixEvent:fr,on:Gt,off:jt,trigger:Mn,one:mr,any:La});const Zt=30,tt=function(n,e,t){e.guid||(e.guid=vi());const i=e.bind(n);return i.guid=t?t+"_"+e.guid:e.guid,i},Ai=function(n,e){let t=A().performance.now();return function(...s){const r=A().performance.now();r-t>=e&&(n(...s),t=r)}},Gl=function(n,e,t,i=A()){let s;const r=()=>{i.clearTimeout(s),s=null},a=function(){const l=this,h=arguments;let m=function(){s=null,m=null,t||n.apply(l,h)};!s&&t&&n.apply(l,h),i.clearTimeout(s),s=i.setTimeout(m,e)};return a.cancel=r,a};var Of=Object.freeze({__proto__:null,UPDATE_REFRESH_INTERVAL:Zt,bind_:tt,throttle:Ai,debounce:Gl});let As;class ei{on(e,t){const i=this.addEventListener;this.addEventListener=()=>{},Gt(this,e,t),this.addEventListener=i}off(e,t){jt(this,e,t)}one(e,t){const i=this.addEventListener;this.addEventListener=()=>{},mr(this,e,t),this.addEventListener=i}any(e,t){const i=this.addEventListener;this.addEventListener=()=>{},La(this,e,t),this.addEventListener=i}trigger(e){const t=e.type||e;typeof e=="string"&&(e={type:t}),e=fr(e),this.allowedEvents_[t]&&this["on"+t]&&this["on"+t](e),Mn(this,e)}queueTrigger(e){As||(As=new Map);const t=e.type||e;let i=As.get(this);i||(i=new Map,As.set(this,i));const s=i.get(t);i.delete(t),A().clearTimeout(s);const r=A().setTimeout(()=>{i.delete(t),i.size===0&&(i=null,As.delete(this)),this.trigger(e)},0);i.set(t,r)}}ei.prototype.allowedEvents_={},ei.prototype.addEventListener=ei.prototype.on,ei.prototype.removeEventListener=ei.prototype.off,ei.prototype.dispatchEvent=ei.prototype.trigger;const gr=n=>typeof n.name=="function"?n.name():typeof n.name=="string"?n.name:n.name_?n.name_:n.constructor&&n.constructor.name?n.constructor.name:typeof n,Di=n=>n instanceof ei||!!n.eventBusEl_&&["on","one","off","trigger"].every(e=>typeof n[e]=="function"),Rf=(n,e)=>{Di(n)?e():(n.eventedCallbacks||(n.eventedCallbacks=[]),n.eventedCallbacks.push(e))},Oa=n=>typeof n=="string"&&/\S/.test(n)||Array.isArray(n)&&!!n.length,vr=(n,e,t)=>{if(!n||!n.nodeName&&!Di(n))throw new Error(`Invalid target for ${gr(e)}#${t}; must be a DOM node or evented object.`)},$l=(n,e,t)=>{if(!Oa(n))throw new Error(`Invalid event type for ${gr(e)}#${t}; must be a non-empty string or array.`)},Xl=(n,e,t)=>{if(typeof n!="function")throw new Error(`Invalid listener for ${gr(e)}#${t}; must be a function.`)},Ra=(n,e,t)=>{const i=e.length<3||e[0]===n||e[0]===n.eventBusEl_;let s,r,a;return i?(s=n.eventBusEl_,e.length>=3&&e.shift(),[r,a]=e):[s,r,a]=e,vr(s,n,t),$l(r,n,t),Xl(a,n,t),a=tt(n,a),{isTargetingSelf:i,target:s,type:r,listener:a}},en=(n,e,t,i)=>{vr(n,n,e),n.nodeName?Lf[e](n,t,i):n[e](t,i)},Nf={on(...n){const{isTargetingSelf:e,target:t,type:i,listener:s}=Ra(this,n,"on");if(en(t,"on",i,s),!e){const r=()=>this.off(t,i,s);r.guid=s.guid;const a=()=>this.off("dispose",r);a.guid=s.guid,en(this,"on","dispose",r),en(t,"on","dispose",a)}},one(...n){const{isTargetingSelf:e,target:t,type:i,listener:s}=Ra(this,n,"one");if(e)en(t,"one",i,s);else{const r=(...a)=>{this.off(t,i,r),s.apply(null,a)};r.guid=s.guid,en(t,"one",i,r)}},any(...n){const{isTargetingSelf:e,target:t,type:i,listener:s}=Ra(this,n,"any");if(e)en(t,"any",i,s);else{const r=(...a)=>{this.off(t,i,r),s.apply(null,a)};r.guid=s.guid,en(t,"any",i,r)}},off(n,e,t){if(!n||Oa(n))jt(this.eventBusEl_,n,e);else{const i=n,s=e;vr(i,this,"off"),$l(s,this,"off"),Xl(t,this,"off"),t=tt(this,t),this.off("dispose",t),i.nodeName?(jt(i,s,t),jt(i,"dispose",t)):Di(i)&&(i.off(s,t),i.off("dispose",t))}},trigger(n,e){vr(this.eventBusEl_,this,"trigger");const t=n&&typeof n!="string"?n.type:n;if(!Oa(t))throw new Error(`Invalid event type for ${gr(this)}#trigger; must be a non-empty string or object with a type key that has a non-empty value.`);return Mn(this.eventBusEl_,n,e)}};function Na(n,e={}){const{eventBusKey:t}=e;if(t){if(!n[t].nodeName)throw new Error(`The eventBusKey "${t}" does not refer to an element.`);n.eventBusEl_=n[t]}else n.eventBusEl_=Re("span",{className:"vjs-event-bus"});return Object.assign(n,Nf),n.eventedCallbacks&&n.eventedCallbacks.forEach(i=>{i()}),n.on("dispose",()=>{n.off(),[n,n.el_,n.eventBusEl_].forEach(function(i){i&&Pt.has(i)&&Pt.delete(i)}),A().setTimeout(()=>{n.eventBusEl_=null},0)}),n}const Mf={state:{},setState(n){typeof n=="function"&&(n=n());let e;return Bn(n,(t,i)=>{this.state[i]!==t&&(e=e||{},e[i]={from:this.state[i],to:t}),this.state[i]=t}),e&&Di(this)&&this.trigger({changes:e,type:"statechanged"}),e}};function Yl(n,e){return Object.assign(n,Mf),n.state=Object.assign({},n.state,e),typeof n.handleStateChanged=="function"&&Di(n)&&n.on("statechanged",n.handleStateChanged),n}const ys=function(n){return typeof n!="string"?n:n.replace(/./,e=>e.toLowerCase())},pt=function(n){return typeof n!="string"?n:n.replace(/./,e=>e.toUpperCase())},Kl=function(n,e){return pt(n)===pt(e)};var Uf=Object.freeze({__proto__:null,toLowerCase:ys,toTitleCase:pt,titleCaseEquals:Kl});class W{constructor(e,t,i){if(!e&&this.play?this.player_=e=this:this.player_=e,this.isDisposed_=!1,this.parentComponent_=null,this.options_=et({},this.options_),t=this.options_=et(this.options_,t),this.id_=t.id||t.el&&t.el.id,!this.id_){const s=e&&e.id&&e.id()||"no_player";this.id_=`${s}_component_${vi()}`}this.name_=t.name||null,t.el?this.el_=t.el:t.createEl!==!1&&(this.el_=this.createEl()),t.className&&this.el_&&t.className.split(" ").forEach(s=>this.addClass(s)),["on","off","one","any","trigger"].forEach(s=>{this[s]=void 0}),t.evented!==!1&&(Na(this,{eventBusKey:this.el_?"el_":null}),this.handleLanguagechange=this.handleLanguagechange.bind(this),this.on(this.player_,"languagechange",this.handleLanguagechange)),Yl(this,this.constructor.defaultState),this.children_=[],this.childIndex_={},this.childNameIndex_={},this.setTimeoutIds_=new Set,this.setIntervalIds_=new Set,this.rafIds_=new Set,this.namedRafs_=new Map,this.clearingTimersOnDispose_=!1,t.initChildren!==!1&&this.initChildren(),this.ready(i),t.reportTouchActivity!==!1&&this.enableTouchActivity()}on(e,t){}off(e,t){}one(e,t){}any(e,t){}trigger(e,t){}dispose(e={}){if(!this.isDisposed_){if(this.readyQueue_&&(this.readyQueue_.length=0),this.trigger({type:"dispose",bubbles:!1}),this.isDisposed_=!0,this.children_)for(let t=this.children_.length-1;t>=0;t--)this.children_[t].dispose&&this.children_[t].dispose();this.children_=null,this.childIndex_=null,this.childNameIndex_=null,this.parentComponent_=null,this.el_&&(this.el_.parentNode&&(e.restoreEl?this.el_.parentNode.replaceChild(e.restoreEl,this.el_):this.el_.parentNode.removeChild(this.el_)),this.el_=null),this.player_=null}}isDisposed(){return!!this.isDisposed_}player(){return this.player_}options(e){return e?(this.options_=et(this.options_,e),this.options_):this.options_}el(){return this.el_}createEl(e,t,i){return Re(e,t,i)}localize(e,t,i=e){const s=this.player_.language&&this.player_.language(),r=this.player_.languages&&this.player_.languages(),a=r&&r[s],l=s&&s.split("-")[0],h=r&&r[l];let m=i;return a&&a[e]?m=a[e]:h&&h[e]&&(m=h[e]),t&&(m=m.replace(/\{(\d+)\}/g,function(g,E){const w=t[E-1];let k=w;return typeof w=="undefined"&&(k=g),k})),m}handleLanguagechange(){}contentEl(){return this.contentEl_||this.el_}id(){return this.id_}name(){return this.name_}children(){return this.children_}getChildById(e){return this.childIndex_[e]}getChild(e){if(e)return this.childNameIndex_[e]}getDescendant(...e){e=e.reduce((i,s)=>i.concat(s),[]);let t=this;for(let i=0;i<e.length;i++)if(t=t.getChild(e[i]),!t||!t.getChild)return;return t}setIcon(e,t=this.el()){if(!this.player_.options_.experimentalSvgIcons)return;const i="http://www.w3.org/2000/svg",s=Re("span",{className:"vjs-icon-placeholder vjs-svg-icon"},{"aria-hidden":"true"}),r=I().createElementNS(i,"svg");r.setAttributeNS(null,"viewBox","0 0 512 512");const a=I().createElementNS(i,"use");return r.appendChild(a),a.setAttributeNS(null,"href",`#vjs-icon-${e}`),s.appendChild(r),this.iconIsSet_?t.replaceChild(s,t.querySelector(".vjs-icon-placeholder")):t.appendChild(s),this.iconIsSet_=!0,s}addChild(e,t={},i=this.children_.length){let s,r;if(typeof e=="string"){r=pt(e);const a=t.componentClass||r;t.name=r;const l=W.getComponent(a);if(!l)throw new Error(`Component ${a} does not exist`);if(typeof l!="function")return null;s=new l(this.player_||this,t)}else s=e;if(s.parentComponent_&&s.parentComponent_.removeChild(s),this.children_.splice(i,0,s),s.parentComponent_=this,typeof s.id=="function"&&(this.childIndex_[s.id()]=s),r=r||s.name&&pt(s.name()),r&&(this.childNameIndex_[r]=s,this.childNameIndex_[ys(r)]=s),typeof s.el=="function"&&s.el()){let a=null;this.children_[i+1]&&(this.children_[i+1].el_?a=this.children_[i+1].el_:Ln(this.children_[i+1])&&(a=this.children_[i+1])),this.contentEl().insertBefore(s.el(),a)}return s}removeChild(e){if(typeof e=="string"&&(e=this.getChild(e)),!e||!this.children_)return;let t=!1;for(let s=this.children_.length-1;s>=0;s--)if(this.children_[s]===e){t=!0,this.children_.splice(s,1);break}if(!t)return;e.parentComponent_=null,this.childIndex_[e.id()]=null,this.childNameIndex_[pt(e.name())]=null,this.childNameIndex_[ys(e.name())]=null;const i=e.el();i&&i.parentNode===this.contentEl()&&this.contentEl().removeChild(e.el())}initChildren(){const e=this.options_.children;if(e){const t=this.options_,i=a=>{const l=a.name;let h=a.opts;if(t[l]!==void 0&&(h=t[l]),h===!1)return;h===!0&&(h={}),h.playerOptions=this.options_.playerOptions;const m=this.addChild(l,h);m&&(this[l]=m)};let s;const r=W.getComponent("Tech");Array.isArray(e)?s=e:s=Object.keys(e),s.concat(Object.keys(this.options_).filter(function(a){return!s.some(function(l){return typeof l=="string"?a===l:a===l.name})})).map(a=>{let l,h;return typeof a=="string"?(l=a,h=e[l]||this.options_[l]||{}):(l=a.name,h=a),{name:l,opts:h}}).filter(a=>{const l=W.getComponent(a.opts.componentClass||pt(a.name));return l&&!r.isTech(l)}).forEach(i)}}buildCSSClass(){return""}ready(e,t=!1){if(e){if(!this.isReady_){this.readyQueue_=this.readyQueue_||[],this.readyQueue_.push(e);return}t?e.call(this):this.setTimeout(e,1)}}triggerReady(){this.isReady_=!0,this.setTimeout(function(){const e=this.readyQueue_;this.readyQueue_=[],e&&e.length>0&&e.forEach(function(t){t.call(this)},this),this.trigger("ready")},1)}$(e,t){return Hi(e,t||this.contentEl())}$$(e,t){return Ul(e,t||this.contentEl())}hasClass(e){return ms(this.el_,e)}addClass(...e){Zi(this.el_,...e)}removeClass(...e){ur(this.el_,...e)}toggleClass(e,t){kl(this.el_,e,t)}show(){this.removeClass("vjs-hidden")}hide(){this.addClass("vjs-hidden")}lockShowing(){this.addClass("vjs-lock-showing")}unlockShowing(){this.removeClass("vjs-lock-showing")}getAttribute(e){return Pl(this.el_,e)}setAttribute(e,t){On(this.el_,e,t)}removeAttribute(e){cr(this.el_,e)}width(e,t){return this.dimension("width",e,t)}height(e,t){return this.dimension("height",e,t)}dimensions(e,t){this.width(e,!0),this.height(t)}dimension(e,t,i){if(t!==void 0){(t===null||t!==t)&&(t=0),(""+t).indexOf("%")!==-1||(""+t).indexOf("px")!==-1?this.el_.style[e]=t:t==="auto"?this.el_.style[e]="":this.el_.style[e]=t+"px",i||this.trigger("componentresize");return}if(!this.el_)return 0;const s=this.el_.style[e],r=s.indexOf("px");return parseInt(r!==-1?s.slice(0,r):this.el_["offset"+pt(e)],10)}currentDimension(e){let t=0;if(e!=="width"&&e!=="height")throw new Error("currentDimension only accepts width or height value");if(t=Nn(this.el_,e),t=parseFloat(t),t===0||isNaN(t)){const i=`offset${pt(e)}`;t=this.el_[i]}return t}currentDimensions(){return{width:this.currentDimension("width"),height:this.currentDimension("height")}}currentWidth(){return this.currentDimension("width")}currentHeight(){return this.currentDimension("height")}focus(){this.el_.focus()}blur(){this.el_.blur()}handleKeyDown(e){this.player_&&(O().isEventKey(e,"Tab")||e.stopPropagation(),this.player_.handleKeyDown(e))}handleKeyPress(e){this.handleKeyDown(e)}emitTapEvents(){let e=0,t=null;const i=10,s=200;let r;this.on("touchstart",function(l){l.touches.length===1&&(t={pageX:l.touches[0].pageX,pageY:l.touches[0].pageY},e=A().performance.now(),r=!0)}),this.on("touchmove",function(l){if(l.touches.length>1)r=!1;else if(t){const h=l.touches[0].pageX-t.pageX,m=l.touches[0].pageY-t.pageY;Math.sqrt(h*h+m*m)>i&&(r=!1)}});const a=function(){r=!1};this.on("touchleave",a),this.on("touchcancel",a),this.on("touchend",function(l){t=null,r===!0&&A().performance.now()-e<s&&(l.preventDefault(),this.trigger("tap"))})}enableTouchActivity(){if(!this.player()||!this.player().reportUserActivity)return;const e=tt(this.player(),this.player().reportUserActivity);let t;this.on("touchstart",function(){e(),this.clearInterval(t),t=this.setInterval(e,250)});const i=function(s){e(),this.clearInterval(t)};this.on("touchmove",e),this.on("touchend",i),this.on("touchcancel",i)}setTimeout(e,t){var i;return e=tt(this,e),this.clearTimersOnDispose_(),i=A().setTimeout(()=>{this.setTimeoutIds_.has(i)&&this.setTimeoutIds_.delete(i),e()},t),this.setTimeoutIds_.add(i),i}clearTimeout(e){return this.setTimeoutIds_.has(e)&&(this.setTimeoutIds_.delete(e),A().clearTimeout(e)),e}setInterval(e,t){e=tt(this,e),this.clearTimersOnDispose_();const i=A().setInterval(e,t);return this.setIntervalIds_.add(i),i}clearInterval(e){return this.setIntervalIds_.has(e)&&(this.setIntervalIds_.delete(e),A().clearInterval(e)),e}requestAnimationFrame(e){this.clearTimersOnDispose_();var t;return e=tt(this,e),t=A().requestAnimationFrame(()=>{this.rafIds_.has(t)&&this.rafIds_.delete(t),e()}),this.rafIds_.add(t),t}requestNamedAnimationFrame(e,t){if(this.namedRafs_.has(e))return;this.clearTimersOnDispose_(),t=tt(this,t);const i=this.requestAnimationFrame(()=>{t(),this.namedRafs_.has(e)&&this.namedRafs_.delete(e)});return this.namedRafs_.set(e,i),e}cancelNamedAnimationFrame(e){this.namedRafs_.has(e)&&(this.cancelAnimationFrame(this.namedRafs_.get(e)),this.namedRafs_.delete(e))}cancelAnimationFrame(e){return this.rafIds_.has(e)&&(this.rafIds_.delete(e),A().cancelAnimationFrame(e)),e}clearTimersOnDispose_(){this.clearingTimersOnDispose_||(this.clearingTimersOnDispose_=!0,this.one("dispose",()=>{[["namedRafs_","cancelNamedAnimationFrame"],["rafIds_","cancelAnimationFrame"],["setTimeoutIds_","clearTimeout"],["setIntervalIds_","clearInterval"]].forEach(([e,t])=>{this[e].forEach((i,s)=>this[t](s))}),this.clearingTimersOnDispose_=!1}))}static registerComponent(e,t){if(typeof e!="string"||!e)throw new Error(`Illegal component name, "${e}"; must be a non-empty string.`);const i=W.getComponent("Tech"),s=i&&i.isTech(t),r=W===t||W.prototype.isPrototypeOf(t.prototype);if(s||!r){let l;throw s?l="techs must be registered using Tech.registerTech()":l="must be a Component subclass",new Error(`Illegal component, "${e}"; ${l}.`)}e=pt(e),W.components_||(W.components_={});const a=W.getComponent("Player");if(e==="Player"&&a&&a.players){const l=a.players,h=Object.keys(l);if(l&&h.length>0&&h.map(m=>l[m]).every(Boolean))throw new Error("Can not register Player component after player has been created.")}return W.components_[e]=t,W.components_[ys(e)]=t,t}static getComponent(e){if(!(!e||!W.components_))return W.components_[e]}}W.registerComponent("Component",W);function Ff(n,e,t){if(typeof e!="number"||e<0||e>t)throw new Error(`Failed to execute '${n}' on 'TimeRanges': The index provided (${e}) is non-numeric or out of bounds (0-${t}).`)}function Ql(n,e,t,i){return Ff(n,i,t.length-1),t[i][e]}function Ma(n){let e;return n===void 0||n.length===0?e={length:0,start(){throw new Error("This TimeRanges object is empty")},end(){throw new Error("This TimeRanges object is empty")}}:e={length:n.length,start:Ql.bind(null,"start",0,n),end:Ql.bind(null,"end",1,n)},A().Symbol&&A().Symbol.iterator&&(e[A().Symbol.iterator]=()=>(n||[]).values()),e}function yi(n,e){return Array.isArray(n)?Ma(n):n===void 0||e===void 0?Ma():Ma([[n,e]])}const Jl=function(n,e){n=n<0?0:n;let t=Math.floor(n%60),i=Math.floor(n/60%60),s=Math.floor(n/3600);const r=Math.floor(e/60%60),a=Math.floor(e/3600);return(isNaN(n)||n===1/0)&&(s=i=t="-"),s=s>0||a>0?s+":":"",i=((s||r>=10)&&i<10?"0"+i:i)+":",t=t<10?"0"+t:t,s+i+t};let Ua=Jl;function Zl(n){Ua=n}function eu(){Ua=Jl}function tn(n,e=n){return Ua(n,e)}var Vf=Object.freeze({__proto__:null,createTimeRanges:yi,createTimeRange:yi,setFormatTime:Zl,resetFormatTime:eu,formatTime:tn});function tu(n,e){let t=0,i,s;if(!e)return 0;(!n||!n.length)&&(n=yi(0,0));for(let r=0;r<n.length;r++)i=n.start(r),s=n.end(r),s>e&&(s=e),t+=s-i;return t/e}function Lt(n){if(n instanceof Lt)return n;typeof n=="number"?this.code=n:typeof n=="string"?this.message=n:pi(n)&&(typeof n.code=="number"&&(this.code=n.code),Object.assign(this,n)),this.message||(this.message=Lt.defaultMessages[this.code]||"")}Lt.prototype.code=0,Lt.prototype.message="",Lt.prototype.status=null,Lt.errorTypes=["MEDIA_ERR_CUSTOM","MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_ERR_ENCRYPTED"],Lt.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail part-way.",3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",4:"The media could not be loaded, either because the server or network failed or because the format is not supported.",5:"The media is encrypted and we do not have the keys to decrypt it."};for(let n=0;n<Lt.errorTypes.length;n++)Lt[Lt.errorTypes[n]]=n,Lt.prototype[Lt.errorTypes[n]]=n;function _s(n){return n!=null&&typeof n.then=="function"}function _i(n){_s(n)&&n.then(null,e=>{})}const Fa=function(n){return["kind","label","language","id","inBandMetadataTrackDispatchType","mode","src"].reduce((t,i,s)=>(n[i]&&(t[i]=n[i]),t),{cues:n.cues&&Array.prototype.map.call(n.cues,function(t){return{startTime:t.startTime,endTime:t.endTime,text:t.text,id:t.id}})})};var iu={textTracksToJson:function(n){const e=n.$$("track"),t=Array.prototype.map.call(e,s=>s.track);return Array.prototype.map.call(e,function(s){const r=Fa(s.track);return s.src&&(r.src=s.src),r}).concat(Array.prototype.filter.call(n.textTracks(),function(s){return t.indexOf(s)===-1}).map(Fa))},jsonToTextTracks:function(n,e){return n.forEach(function(t){const i=e.addRemoteTextTrack(t).track;!t.src&&t.cues&&t.cues.forEach(s=>i.addCue(s))}),e.textTracks()},trackToJson_:Fa};const Va="vjs-modal-dialog";class Un extends W{constructor(e,t){super(e,t),this.handleKeyDown_=i=>this.handleKeyDown(i),this.close_=i=>this.close(i),this.opened_=this.hasBeenOpened_=this.hasBeenFilled_=!1,this.closeable(!this.options_.uncloseable),this.content(this.options_.content),this.contentEl_=Re("div",{className:`${Va}-content`},{role:"document"}),this.descEl_=Re("p",{className:`${Va}-description vjs-control-text`,id:this.el().getAttribute("aria-describedby")}),Vi(this.descEl_,this.description()),this.el_.appendChild(this.descEl_),this.el_.appendChild(this.contentEl_)}createEl(){return super.createEl("div",{className:this.buildCSSClass(),tabIndex:-1},{"aria-describedby":`${this.id()}_description`,"aria-hidden":"true","aria-label":this.label(),role:"dialog"})}dispose(){this.contentEl_=null,this.descEl_=null,this.previouslyActiveEl_=null,super.dispose()}buildCSSClass(){return`${Va} vjs-hidden ${super.buildCSSClass()}`}label(){return this.localize(this.options_.label||"Modal Window")}description(){let e=this.options_.description||this.localize("This is a modal window.");return this.closeable()&&(e+=" "+this.localize("This modal can be closed by pressing the Escape key or activating the close button.")),e}open(){if(!this.opened_){const e=this.player();this.trigger("beforemodalopen"),this.opened_=!0,(this.options_.fillAlways||!this.hasBeenOpened_&&!this.hasBeenFilled_)&&this.fill(),this.wasPlaying_=!e.paused(),this.options_.pauseOnOpen&&this.wasPlaying_&&e.pause(),this.on("keydown",this.handleKeyDown_),this.hadControls_=e.controls(),e.controls(!1),this.show(),this.conditionalFocus_(),this.el().setAttribute("aria-hidden","false"),this.trigger("modalopen"),this.hasBeenOpened_=!0}}opened(e){return typeof e=="boolean"&&this[e?"open":"close"](),this.opened_}close(){if(!this.opened_)return;const e=this.player();this.trigger("beforemodalclose"),this.opened_=!1,this.wasPlaying_&&this.options_.pauseOnOpen&&e.play(),this.off("keydown",this.handleKeyDown_),this.hadControls_&&e.controls(!0),this.hide(),this.el().setAttribute("aria-hidden","true"),this.trigger("modalclose"),this.conditionalBlur_(),this.options_.temporary&&this.dispose()}closeable(e){if(typeof e=="boolean"){const t=this.closeable_=!!e;let i=this.getChild("closeButton");if(t&&!i){const s=this.contentEl_;this.contentEl_=this.el_,i=this.addChild("closeButton",{controlText:"Close Modal Dialog"}),this.contentEl_=s,this.on(i,"close",this.close_)}!t&&i&&(this.off(i,"close",this.close_),this.removeChild(i),i.dispose())}return this.closeable_}fill(){this.fillWith(this.content())}fillWith(e){const t=this.contentEl(),i=t.parentNode,s=t.nextSibling;this.trigger("beforemodalfill"),this.hasBeenFilled_=!0,i.removeChild(t),this.empty(),Ml(t,e),this.trigger("modalfill"),s?i.insertBefore(t,s):i.appendChild(t);const r=this.getChild("closeButton");r&&i.appendChild(r.el_)}empty(){this.trigger("beforemodalempty"),hr(this.contentEl()),this.trigger("modalempty")}content(e){return typeof e!="undefined"&&(this.content_=e),this.content_}conditionalFocus_(){const e=I().activeElement,t=this.player_.el_;this.previouslyActiveEl_=null,(t.contains(e)||t===e)&&(this.previouslyActiveEl_=e,this.focus())}conditionalBlur_(){this.previouslyActiveEl_&&(this.previouslyActiveEl_.focus(),this.previouslyActiveEl_=null)}handleKeyDown(e){if(e.stopPropagation(),O().isEventKey(e,"Escape")&&this.closeable()){e.preventDefault(),this.close();return}if(!O().isEventKey(e,"Tab"))return;const t=this.focusableEls_(),i=this.el_.querySelector(":focus");let s;for(let r=0;r<t.length;r++)if(i===t[r]){s=r;break}I().activeElement===this.el_&&(s=0),e.shiftKey&&s===0?(t[t.length-1].focus(),e.preventDefault()):!e.shiftKey&&s===t.length-1&&(t[0].focus(),e.preventDefault())}focusableEls_(){const e=this.el_.querySelectorAll("*");return Array.prototype.filter.call(e,t=>(t instanceof A().HTMLAnchorElement||t instanceof A().HTMLAreaElement)&&t.hasAttribute("href")||(t instanceof A().HTMLInputElement||t instanceof A().HTMLSelectElement||t instanceof A().HTMLTextAreaElement||t instanceof A().HTMLButtonElement)&&!t.hasAttribute("disabled")||t instanceof A().HTMLIFrameElement||t instanceof A().HTMLObjectElement||t instanceof A().HTMLEmbedElement||t.hasAttribute("tabindex")&&t.getAttribute("tabindex")!==-1||t.hasAttribute("contenteditable"))}}Un.prototype.options_={pauseOnOpen:!0,temporary:!0},W.registerComponent("ModalDialog",Un);class Fn extends ei{constructor(e=[]){super(),this.tracks_=[],Object.defineProperty(this,"length",{get(){return this.tracks_.length}});for(let t=0;t<e.length;t++)this.addTrack(e[t])}addTrack(e){const t=this.tracks_.length;""+t in this||Object.defineProperty(this,t,{get(){return this.tracks_[t]}}),this.tracks_.indexOf(e)===-1&&(this.tracks_.push(e),this.trigger({track:e,type:"addtrack",target:this})),e.labelchange_=()=>{this.trigger({track:e,type:"labelchange",target:this})},Di(e)&&e.addEventListener("labelchange",e.labelchange_)}removeTrack(e){let t;for(let i=0,s=this.length;i<s;i++)if(this[i]===e){t=this[i],t.off&&t.off(),this.tracks_.splice(i,1);break}t&&this.trigger({track:t,type:"removetrack",target:this})}getTrackById(e){let t=null;for(let i=0,s=this.length;i<s;i++){const r=this[i];if(r.id===e){t=r;break}}return t}}Fn.prototype.allowedEvents_={change:"change",addtrack:"addtrack",removetrack:"removetrack",labelchange:"labelchange"};for(const n in Fn.prototype.allowedEvents_)Fn.prototype["on"+n]=null;const za=function(n,e){for(let t=0;t<n.length;t++)!Object.keys(n[t]).length||e.id===n[t].id||(n[t].enabled=!1)};class zf extends Fn{constructor(e=[]){for(let t=e.length-1;t>=0;t--)if(e[t].enabled){za(e,e[t]);break}super(e),this.changing_=!1}addTrack(e){e.enabled&&za(this,e),super.addTrack(e),e.addEventListener&&(e.enabledChange_=()=>{this.changing_||(this.changing_=!0,za(this,e),this.changing_=!1,this.trigger("change"))},e.addEventListener("enabledchange",e.enabledChange_))}removeTrack(e){super.removeTrack(e),e.removeEventListener&&e.enabledChange_&&(e.removeEventListener("enabledchange",e.enabledChange_),e.enabledChange_=null)}}const Ha=function(n,e){for(let t=0;t<n.length;t++)!Object.keys(n[t]).length||e.id===n[t].id||(n[t].selected=!1)};class Hf extends Fn{constructor(e=[]){for(let t=e.length-1;t>=0;t--)if(e[t].selected){Ha(e,e[t]);break}super(e),this.changing_=!1,Object.defineProperty(this,"selectedIndex",{get(){for(let t=0;t<this.length;t++)if(this[t].selected)return t;return-1},set(){}})}addTrack(e){e.selected&&Ha(this,e),super.addTrack(e),e.addEventListener&&(e.selectedChange_=()=>{this.changing_||(this.changing_=!0,Ha(this,e),this.changing_=!1,this.trigger("change"))},e.addEventListener("selectedchange",e.selectedChange_))}removeTrack(e){super.removeTrack(e),e.removeEventListener&&e.selectedChange_&&(e.removeEventListener("selectedchange",e.selectedChange_),e.selectedChange_=null)}}class nu extends Fn{addTrack(e){super.addTrack(e),this.queueChange_||(this.queueChange_=()=>this.queueTrigger("change")),this.triggerSelectedlanguagechange||(this.triggerSelectedlanguagechange_=()=>this.trigger("selectedlanguagechange")),e.addEventListener("modechange",this.queueChange_),["metadata","chapters"].indexOf(e.kind)===-1&&e.addEventListener("modechange",this.triggerSelectedlanguagechange_)}removeTrack(e){super.removeTrack(e),e.removeEventListener&&(this.queueChange_&&e.removeEventListener("modechange",this.queueChange_),this.selectedlanguagechange_&&e.removeEventListener("modechange",this.triggerSelectedlanguagechange_))}}class qf{constructor(e=[]){this.trackElements_=[],Object.defineProperty(this,"length",{get(){return this.trackElements_.length}});for(let t=0,i=e.length;t<i;t++)this.addTrackElement_(e[t])}addTrackElement_(e){const t=this.trackElements_.length;""+t in this||Object.defineProperty(this,t,{get(){return this.trackElements_[t]}}),this.trackElements_.indexOf(e)===-1&&this.trackElements_.push(e)}getTrackElementByTrack_(e){let t;for(let i=0,s=this.trackElements_.length;i<s;i++)if(e===this.trackElements_[i].track){t=this.trackElements_[i];break}return t}removeTrackElement_(e){for(let t=0,i=this.trackElements_.length;t<i;t++)if(e===this.trackElements_[t]){this.trackElements_[t].track&&typeof this.trackElements_[t].track.off=="function"&&this.trackElements_[t].track.off(),typeof this.trackElements_[t].off=="function"&&this.trackElements_[t].off(),this.trackElements_.splice(t,1);break}}}class Ar{constructor(e){Ar.prototype.setCues_.call(this,e),Object.defineProperty(this,"length",{get(){return this.length_}})}setCues_(e){const t=this.length||0;let i=0;const s=e.length;this.cues_=e,this.length_=e.length;const r=function(a){""+a in this||Object.defineProperty(this,""+a,{get(){return this.cues_[a]}})};if(t<s)for(i=t;i<s;i++)r.call(this,i)}getCueById(e){let t=null;for(let i=0,s=this.length;i<s;i++){const r=this[i];if(r.id===e){t=r;break}}return t}}const Wf={alternative:"alternative",captions:"captions",main:"main",sign:"sign",subtitles:"subtitles",commentary:"commentary"},Gf={alternative:"alternative",descriptions:"descriptions",main:"main","main-desc":"main-desc",translation:"translation",commentary:"commentary"},$f={subtitles:"subtitles",captions:"captions",descriptions:"descriptions",chapters:"chapters",metadata:"metadata"},su={disabled:"disabled",hidden:"hidden",showing:"showing"};class qa extends ei{constructor(e={}){super();const t={id:e.id||"vjs_track_"+vi(),kind:e.kind||"",language:e.language||""};let i=e.label||"";for(const s in t)Object.defineProperty(this,s,{get(){return t[s]},set(){}});Object.defineProperty(this,"label",{get(){return i},set(s){s!==i&&(i=s,this.trigger("labelchange"))}})}}const Wa=function(n){const e=["protocol","hostname","port","pathname","search","hash","host"],t=I().createElement("a");t.href=n;const i={};for(let s=0;s<e.length;s++)i[e[s]]=t[e[s]];return i.protocol==="http:"&&(i.host=i.host.replace(/:80$/,"")),i.protocol==="https:"&&(i.host=i.host.replace(/:443$/,"")),i.protocol||(i.protocol=A().location.protocol),i.host||(i.host=A().location.host),i},ru=function(n){if(!n.match(/^https?:\/\//)){const e=I().createElement("a");e.href=n,n=e.href}return n},Ga=function(n){if(typeof n=="string"){const t=/^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/.exec(n);if(t)return t.pop().toLowerCase()}return""},yr=function(n,e=A().location){const t=Wa(n);return(t.protocol===":"?e.protocol:t.protocol)+t.host!==e.protocol+e.host};var Xf=Object.freeze({__proto__:null,parseUrl:Wa,getAbsoluteURL:ru,getFileExtension:Ga,isCrossOrigin:yr});const au=function(n,e){const t=new(A()).WebVTT.Parser(A(),A().vttjs,A().WebVTT.StringDecoder()),i=[];t.oncue=function(s){e.addCue(s)},t.onparsingerror=function(s){i.push(s)},t.onflush=function(){e.trigger({type:"loadeddata",target:e})},t.parse(n),i.length>0&&(A().console&&A().console.groupCollapsed&&A().console.groupCollapsed(`Text Track parsing errors for ${e.src}`),i.forEach(s=>Me.error(s)),A().console&&A().console.groupEnd&&A().console.groupEnd()),t.flush()},ou=function(n,e){const t={uri:n},i=yr(n);i&&(t.cors=i);const s=e.tech_.crossOrigin()==="use-credentials";s&&(t.withCredentials=s),be()(t,tt(this,function(r,a,l){if(r)return Me.error(r,a);e.loaded_=!0,typeof A().WebVTT!="function"?e.tech_&&e.tech_.any(["vttjsloaded","vttjserror"],h=>{if(h.type==="vttjserror"){Me.error(`vttjs failed to load, stopping trying to process ${e.src}`);return}return au(l,e)}):au(l,e)}))};class bs extends qa{constructor(e={}){if(!e.tech)throw new Error("A tech was not provided.");const t=et(e,{kind:$f[e.kind]||"subtitles",language:e.language||e.srclang||""});let i=su[t.mode]||"disabled";const s=t.default;(t.kind==="metadata"||t.kind==="chapters")&&(i="hidden"),super(t),this.tech_=t.tech,this.cues_=[],this.activeCues_=[],this.preload_=this.tech_.preloadTextTracks!==!1;const r=new Ar(this.cues_),a=new Ar(this.activeCues_);let l=!1;this.timeupdateHandler=tt(this,function(m={}){if(!this.tech_.isDisposed()){if(!this.tech_.isReady_){m.type!=="timeupdate"&&(this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler));return}this.activeCues=this.activeCues,l&&(this.trigger("cuechange"),l=!1),m.type!=="timeupdate"&&(this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler))}});const h=()=>{this.stopTracking()};this.tech_.one("dispose",h),i!=="disabled"&&this.startTracking(),Object.defineProperties(this,{default:{get(){return s},set(){}},mode:{get(){return i},set(m){su[m]&&i!==m&&(i=m,!this.preload_&&i!=="disabled"&&this.cues.length===0&&ou(this.src,this),this.stopTracking(),i!=="disabled"&&this.startTracking(),this.trigger("modechange"))}},cues:{get(){return this.loaded_?r:null},set(){}},activeCues:{get(){if(!this.loaded_)return null;if(this.cues.length===0)return a;const m=this.tech_.currentTime(),g=[];for(let E=0,w=this.cues.length;E<w;E++){const k=this.cues[E];k.startTime<=m&&k.endTime>=m&&g.push(k)}if(l=!1,g.length!==this.activeCues_.length)l=!0;else for(let E=0;E<g.length;E++)this.activeCues_.indexOf(g[E])===-1&&(l=!0);return this.activeCues_=g,a.setCues_(this.activeCues_),a},set(){}}}),t.src?(this.src=t.src,this.preload_||(this.loaded_=!0),(this.preload_||t.kind!=="subtitles"&&t.kind!=="captions")&&ou(this.src,this)):this.loaded_=!0}startTracking(){this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler),this.tech_.on("timeupdate",this.timeupdateHandler)}stopTracking(){this.rvf_&&(this.tech_.cancelVideoFrameCallback(this.rvf_),this.rvf_=void 0),this.tech_.off("timeupdate",this.timeupdateHandler)}addCue(e){let t=e;if(!("getCueAsHTML"in t)){t=new(A()).vttjs.VTTCue(e.startTime,e.endTime,e.text);for(const s in e)s in t||(t[s]=e[s]);t.id=e.id,t.originalCue_=e}const i=this.tech_.textTracks();for(let s=0;s<i.length;s++)i[s]!==this&&i[s].removeCue(t);this.cues_.push(t),this.cues.setCues_(this.cues_)}removeCue(e){let t=this.cues_.length;for(;t--;){const i=this.cues_[t];if(i===e||i.originalCue_&&i.originalCue_===e){this.cues_.splice(t,1),this.cues.setCues_(this.cues_);break}}}}bs.prototype.allowedEvents_={cuechange:"cuechange"};class lu extends qa{constructor(e={}){const t=et(e,{kind:Gf[e.kind]||""});super(t);let i=!1;Object.defineProperty(this,"enabled",{get(){return i},set(s){typeof s!="boolean"||s===i||(i=s,this.trigger("enabledchange"))}}),t.enabled&&(this.enabled=t.enabled),this.loaded_=!0}}class uu extends qa{constructor(e={}){const t=et(e,{kind:Wf[e.kind]||""});super(t);let i=!1;Object.defineProperty(this,"selected",{get(){return i},set(s){typeof s!="boolean"||s===i||(i=s,this.trigger("selectedchange"))}}),t.selected&&(this.selected=t.selected)}}class ki extends ei{constructor(e={}){super();let t;const i=new bs(e);this.kind=i.kind,this.src=i.src,this.srclang=i.language,this.label=i.label,this.default=i.default,Object.defineProperties(this,{readyState:{get(){return t}},track:{get(){return i}}}),t=ki.NONE,i.addEventListener("loadeddata",()=>{t=ki.LOADED,this.trigger({type:"load",target:this})})}}ki.prototype.allowedEvents_={load:"load"},ki.NONE=0,ki.LOADING=1,ki.LOADED=2,ki.ERROR=3;const ti={audio:{ListClass:zf,TrackClass:lu,capitalName:"Audio"},video:{ListClass:Hf,TrackClass:uu,capitalName:"Video"},text:{ListClass:nu,TrackClass:bs,capitalName:"Text"}};Object.keys(ti).forEach(function(n){ti[n].getterName=`${n}Tracks`,ti[n].privateName=`${n}Tracks_`});const Vn={remoteText:{ListClass:nu,TrackClass:bs,capitalName:"RemoteText",getterName:"remoteTextTracks",privateName:"remoteTextTracks_"},remoteTextEl:{ListClass:qf,TrackClass:ki,capitalName:"RemoteTextTrackEls",getterName:"remoteTextTrackEls",privateName:"remoteTextTrackEls_"}},Ot=Object.assign({},ti,Vn);Vn.names=Object.keys(Vn),ti.names=Object.keys(ti),Ot.names=[].concat(Vn.names).concat(ti.names);function Yf(n,e,t,i,s={}){const r=n.textTracks();s.kind=e,t&&(s.label=t),i&&(s.language=i),s.tech=n;const a=new Ot.text.TrackClass(s);return r.addTrack(a),a}class Oe extends W{constructor(e={},t=function(){}){e.reportTouchActivity=!1,super(null,e,t),this.onDurationChange_=i=>this.onDurationChange(i),this.trackProgress_=i=>this.trackProgress(i),this.trackCurrentTime_=i=>this.trackCurrentTime(i),this.stopTrackingCurrentTime_=i=>this.stopTrackingCurrentTime(i),this.disposeSourceHandler_=i=>this.disposeSourceHandler(i),this.queuedHanders_=new Set,this.hasStarted_=!1,this.on("playing",function(){this.hasStarted_=!0}),this.on("loadstart",function(){this.hasStarted_=!1}),Ot.names.forEach(i=>{const s=Ot[i];e&&e[s.getterName]&&(this[s.privateName]=e[s.getterName])}),this.featuresProgressEvents||this.manualProgressOn(),this.featuresTimeupdateEvents||this.manualTimeUpdatesOn(),["Text","Audio","Video"].forEach(i=>{e[`native${i}Tracks`]===!1&&(this[`featuresNative${i}Tracks`]=!1)}),e.nativeCaptions===!1||e.nativeTextTracks===!1?this.featuresNativeTextTracks=!1:(e.nativeCaptions===!0||e.nativeTextTracks===!0)&&(this.featuresNativeTextTracks=!0),this.featuresNativeTextTracks||this.emulateTextTracks(),this.preloadTextTracks=e.preloadTextTracks!==!1,this.autoRemoteTextTracks_=new Ot.text.ListClass,this.initTrackListeners(),e.nativeControlsForTouch||this.emitTapEvents(),this.constructor&&(this.name_=this.constructor.name||"Unknown Tech")}triggerSourceset(e){this.isReady_||this.one("ready",()=>this.setTimeout(()=>this.triggerSourceset(e),1)),this.trigger({src:e,type:"sourceset"})}manualProgressOn(){this.on("durationchange",this.onDurationChange_),this.manualProgress=!0,this.one("ready",this.trackProgress_)}manualProgressOff(){this.manualProgress=!1,this.stopTrackingProgress(),this.off("durationchange",this.onDurationChange_)}trackProgress(e){this.stopTrackingProgress(),this.progressInterval=this.setInterval(tt(this,function(){const t=this.bufferedPercent();this.bufferedPercent_!==t&&this.trigger("progress"),this.bufferedPercent_=t,t===1&&this.stopTrackingProgress()}),500)}onDurationChange(e){this.duration_=this.duration()}buffered(){return yi(0,0)}bufferedPercent(){return tu(this.buffered(),this.duration_)}stopTrackingProgress(){this.clearInterval(this.progressInterval)}manualTimeUpdatesOn(){this.manualTimeUpdates=!0,this.on("play",this.trackCurrentTime_),this.on("pause",this.stopTrackingCurrentTime_)}manualTimeUpdatesOff(){this.manualTimeUpdates=!1,this.stopTrackingCurrentTime(),this.off("play",this.trackCurrentTime_),this.off("pause",this.stopTrackingCurrentTime_)}trackCurrentTime(){this.currentTimeInterval&&this.stopTrackingCurrentTime(),this.currentTimeInterval=this.setInterval(function(){this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},250)}stopTrackingCurrentTime(){this.clearInterval(this.currentTimeInterval),this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})}dispose(){this.clearTracks(ti.names),this.manualProgress&&this.manualProgressOff(),this.manualTimeUpdates&&this.manualTimeUpdatesOff(),super.dispose()}clearTracks(e){e=[].concat(e),e.forEach(t=>{const i=this[`${t}Tracks`]()||[];let s=i.length;for(;s--;){const r=i[s];t==="text"&&this.removeRemoteTextTrack(r),i.removeTrack(r)}})}cleanupAutoTextTracks(){const e=this.autoRemoteTextTracks_||[];let t=e.length;for(;t--;){const i=e[t];this.removeRemoteTextTrack(i)}}reset(){}crossOrigin(){}setCrossOrigin(){}error(e){return e!==void 0&&(this.error_=new Lt(e),this.trigger("error")),this.error_}played(){return this.hasStarted_?yi(0,0):yi()}play(){}setScrubbing(e){}scrubbing(){}setCurrentTime(e){this.manualTimeUpdates&&this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})}initTrackListeners(){ti.names.forEach(e=>{const t=ti[e],i=()=>{this.trigger(`${e}trackchange`)},s=this[t.getterName]();s.addEventListener("removetrack",i),s.addEventListener("addtrack",i),this.on("dispose",()=>{s.removeEventListener("removetrack",i),s.removeEventListener("addtrack",i)})})}addWebVttScript_(){if(!A().WebVTT)if(I().body.contains(this.el())){if(!this.options_["vtt.js"]&&wn(X())&&Object.keys(X()).length>0){this.trigger("vttjsloaded");return}const e=I().createElement("script");e.src=this.options_["vtt.js"]||"https://vjs.zencdn.net/vttjs/0.14.1/vtt.min.js",e.onload=()=>{this.trigger("vttjsloaded")},e.onerror=()=>{this.trigger("vttjserror")},this.on("dispose",()=>{e.onload=null,e.onerror=null}),A().WebVTT=!0,this.el().parentNode.appendChild(e)}else this.ready(this.addWebVttScript_)}emulateTextTracks(){const e=this.textTracks(),t=this.remoteTextTracks(),i=l=>e.addTrack(l.track),s=l=>e.removeTrack(l.track);t.on("addtrack",i),t.on("removetrack",s),this.addWebVttScript_();const r=()=>this.trigger("texttrackchange"),a=()=>{r();for(let l=0;l<e.length;l++){const h=e[l];h.removeEventListener("cuechange",r),h.mode==="showing"&&h.addEventListener("cuechange",r)}};a(),e.addEventListener("change",a),e.addEventListener("addtrack",a),e.addEventListener("removetrack",a),this.on("dispose",function(){t.off("addtrack",i),t.off("removetrack",s),e.removeEventListener("change",a),e.removeEventListener("addtrack",a),e.removeEventListener("removetrack",a);for(let l=0;l<e.length;l++)e[l].removeEventListener("cuechange",r)})}addTextTrack(e,t,i){if(!e)throw new Error("TextTrack kind is required but was not provided");return Yf(this,e,t,i)}createRemoteTextTrack(e){const t=et(e,{tech:this});return new Vn.remoteTextEl.TrackClass(t)}addRemoteTextTrack(e={},t){const i=this.createRemoteTextTrack(e);return typeof t!="boolean"&&(t=!1),this.remoteTextTrackEls().addTrackElement_(i),this.remoteTextTracks().addTrack(i.track),t===!1&&this.ready(()=>this.autoRemoteTextTracks_.addTrack(i.track)),i}removeRemoteTextTrack(e){const t=this.remoteTextTrackEls().getTrackElementByTrack_(e);this.remoteTextTrackEls().removeTrackElement_(t),this.remoteTextTracks().removeTrack(e),this.autoRemoteTextTracks_.removeTrack(e)}getVideoPlaybackQuality(){return{}}requestPictureInPicture(){return Promise.reject()}disablePictureInPicture(){return!0}setDisablePictureInPicture(){}requestVideoFrameCallback(e){const t=vi();return!this.isReady_||this.paused()?(this.queuedHanders_.add(t),this.one("playing",()=>{this.queuedHanders_.has(t)&&(this.queuedHanders_.delete(t),e())})):this.requestNamedAnimationFrame(t,e),t}cancelVideoFrameCallback(e){this.queuedHanders_.has(e)?this.queuedHanders_.delete(e):this.cancelNamedAnimationFrame(e)}setPoster(){}playsinline(){}setPlaysinline(){}overrideNativeAudioTracks(e){}overrideNativeVideoTracks(e){}canPlayType(e){return""}static canPlayType(e){return""}static canPlaySource(e,t){return Oe.canPlayType(e.type)}static isTech(e){return e.prototype instanceof Oe||e instanceof Oe||e===Oe}static registerTech(e,t){if(Oe.techs_||(Oe.techs_={}),!Oe.isTech(t))throw new Error(`Tech ${e} must be a Tech`);if(!Oe.canPlayType)throw new Error("Techs must have a static canPlayType method on them");if(!Oe.canPlaySource)throw new Error("Techs must have a static canPlaySource method on them");return e=pt(e),Oe.techs_[e]=t,Oe.techs_[ys(e)]=t,e!=="Tech"&&Oe.defaultTechOrder_.push(e),t}static getTech(e){if(e){if(Oe.techs_&&Oe.techs_[e])return Oe.techs_[e];if(e=pt(e),A()&&A().videojs&&A().videojs[e])return Me.warn(`The ${e} tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)`),A().videojs[e]}}}Ot.names.forEach(function(n){const e=Ot[n];Oe.prototype[e.getterName]=function(){return this[e.privateName]=this[e.privateName]||new e.ListClass,this[e.privateName]}}),Oe.prototype.featuresVolumeControl=!0,Oe.prototype.featuresMuteControl=!0,Oe.prototype.featuresFullscreenResize=!1,Oe.prototype.featuresPlaybackRate=!1,Oe.prototype.featuresProgressEvents=!1,Oe.prototype.featuresSourceset=!1,Oe.prototype.featuresTimeupdateEvents=!1,Oe.prototype.featuresNativeTextTracks=!1,Oe.prototype.featuresVideoFrameCallback=!1,Oe.withSourceHandlers=function(n){n.registerSourceHandler=function(t,i){let s=n.sourceHandlers;s||(s=n.sourceHandlers=[]),i===void 0&&(i=s.length),s.splice(i,0,t)},n.canPlayType=function(t){const i=n.sourceHandlers||[];let s;for(let r=0;r<i.length;r++)if(s=i[r].canPlayType(t),s)return s;return""},n.selectSourceHandler=function(t,i){const s=n.sourceHandlers||[];let r;for(let a=0;a<s.length;a++)if(r=s[a].canHandleSource(t,i),r)return s[a];return null},n.canPlaySource=function(t,i){const s=n.selectSourceHandler(t,i);return s?s.canHandleSource(t,i):""},["seekable","seeking","duration"].forEach(function(t){const i=this[t];typeof i=="function"&&(this[t]=function(){return this.sourceHandler_&&this.sourceHandler_[t]?this.sourceHandler_[t].apply(this.sourceHandler_,arguments):i.apply(this,arguments)})},n.prototype),n.prototype.setSource=function(t){let i=n.selectSourceHandler(t,this.options_);i||(n.nativeSourceHandler?i=n.nativeSourceHandler:Me.error("No source handler found for the current source.")),this.disposeSourceHandler(),this.off("dispose",this.disposeSourceHandler_),i!==n.nativeSourceHandler&&(this.currentSource_=t),this.sourceHandler_=i.handleSource(t,this,this.options_),this.one("dispose",this.disposeSourceHandler_)},n.prototype.disposeSourceHandler=function(){this.currentSource_&&(this.clearTracks(["audio","video"]),this.currentSource_=null),this.cleanupAutoTextTracks(),this.sourceHandler_&&(this.sourceHandler_.dispose&&this.sourceHandler_.dispose(),this.sourceHandler_=null)}},W.registerComponent("Tech",Oe),Oe.registerTech("Tech",Oe),Oe.defaultTechOrder_=[];const nn={},$a={},_r={};function Kf(n,e){nn[n]=nn[n]||[],nn[n].push(e)}function Qf(n,e,t){n.setTimeout(()=>sn(e,nn[e.type],t,n),1)}function Jf(n,e){n.forEach(t=>t.setTech&&t.setTech(e))}function Zf(n,e,t){return n.reduceRight(Xa(t),e[t]())}function ep(n,e,t,i){return e[t](n.reduce(Xa(t),i))}function cu(n,e,t,i=null){const s="call"+pt(t),r=n.reduce(Xa(s),i),a=r===_r,l=a?null:e[t](r);return np(n,t,l,a),l}const tp={buffered:1,currentTime:1,duration:1,muted:1,played:1,paused:1,seekable:1,volume:1,ended:1},ip={setCurrentTime:1,setMuted:1,setVolume:1},du={play:1,pause:1};function Xa(n){return(e,t)=>e===_r?_r:t[n]?t[n](e):e}function np(n,e,t,i){for(let s=n.length-1;s>=0;s--){const r=n[s];r[e]&&r[e](i,t)}}function sp(n){$a[n.id()]=null}function rp(n,e){const t=$a[n.id()];let i=null;if(t==null)return i=e(n),$a[n.id()]=[[e,i]],i;for(let s=0;s<t.length;s++){const[r,a]=t[s];r===e&&(i=a)}return i===null&&(i=e(n),t.push([e,i])),i}function sn(n={},e=[],t,i,s=[],r=!1){const[a,...l]=e;if(typeof a=="string")sn(n,nn[a],t,i,s,r);else if(a){const h=rp(i,a);if(!h.setSource)return s.push(h),sn(n,l,t,i,s,r);h.setSource(Object.assign({},n),function(m,g){if(m)return sn(n,l,t,i,s,r);s.push(h),sn(g,n.type===g.type?l:nn[g.type],t,i,s,r)})}else l.length?sn(n,l,t,i,s,r):r?t(n,s):sn(n,nn["*"],t,i,s,!0)}const ap={opus:"video/ogg",ogv:"video/ogg",mp4:"video/mp4",mov:"video/mp4",m4v:"video/mp4",mkv:"video/x-matroska",m4a:"audio/mp4",mp3:"audio/mpeg",aac:"audio/aac",caf:"audio/x-caf",flac:"audio/flac",oga:"audio/ogg",wav:"audio/wav",m3u8:"application/x-mpegURL",mpd:"application/dash+xml",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",png:"image/png",svg:"image/svg+xml",webp:"image/webp"},br=function(n=""){const e=Ga(n);return ap[e.toLowerCase()]||""},op=(n,e)=>{if(!e)return"";if(n.cache_.source.src===e&&n.cache_.source.type)return n.cache_.source.type;const t=n.cache_.sources.filter(s=>s.src===e);if(t.length)return t[0].type;const i=n.$$("source");for(let s=0;s<i.length;s++){const r=i[s];if(r.type&&r.src&&r.src===e)return r.type}return br(e)},hu=function(n){if(Array.isArray(n)){let e=[];n.forEach(function(t){t=hu(t),Array.isArray(t)?e=e.concat(t):pi(t)&&e.push(t)}),n=e}else typeof n=="string"&&n.trim()?n=[fu({src:n})]:pi(n)&&typeof n.src=="string"&&n.src&&n.src.trim()?n=[fu(n)]:n=[];return n};function fu(n){if(!n.type){const e=br(n.src);e&&(n.type=e)}return n}var lp=`<svg xmlns="http://www.w3.org/2000/svg">
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
</svg>`;class up extends W{constructor(e,t,i){const s=et({createEl:!1},t);if(super(e,s,i),!t.playerOptions.sources||t.playerOptions.sources.length===0)for(let r=0,a=t.playerOptions.techOrder;r<a.length;r++){const l=pt(a[r]);let h=Oe.getTech(l);if(l||(h=W.getComponent(l)),h&&h.isSupported()){e.loadTech_(l);break}}else e.src(t.playerOptions.sources)}}W.registerComponent("MediaLoader",up);class Er extends W{constructor(e,t){super(e,t),this.options_.controlText&&this.controlText(this.options_.controlText),this.handleMouseOver_=i=>this.handleMouseOver(i),this.handleMouseOut_=i=>this.handleMouseOut(i),this.handleClick_=i=>this.handleClick(i),this.handleKeyDown_=i=>this.handleKeyDown(i),this.emitTapEvents(),this.enable()}createEl(e="div",t={},i={}){t=Object.assign({className:this.buildCSSClass(),tabIndex:0},t),e==="button"&&Me.error(`Creating a ClickableComponent with an HTML element of ${e} is not supported; use a Button instead.`),i=Object.assign({role:"button"},i),this.tabIndex_=t.tabIndex;const s=Re(e,t,i);return this.player_.options_.experimentalSvgIcons||s.appendChild(Re("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),this.createControlTextEl(s),s}dispose(){this.controlTextEl_=null,super.dispose()}createControlTextEl(e){return this.controlTextEl_=Re("span",{className:"vjs-control-text"},{"aria-live":"polite"}),e&&e.appendChild(this.controlTextEl_),this.controlText(this.controlText_,e),this.controlTextEl_}controlText(e,t=this.el()){if(e===void 0)return this.controlText_||"Need Text";const i=this.localize(e);this.controlText_=e,Vi(this.controlTextEl_,i),!this.nonIconControl&&!this.player_.options_.noUITitleAttributes&&t.setAttribute("title",i)}buildCSSClass(){return`vjs-control vjs-button ${super.buildCSSClass()}`}enable(){this.enabled_||(this.enabled_=!0,this.removeClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","false"),typeof this.tabIndex_!="undefined"&&this.el_.setAttribute("tabIndex",this.tabIndex_),this.on(["tap","click"],this.handleClick_),this.on("keydown",this.handleKeyDown_))}disable(){this.enabled_=!1,this.addClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","true"),typeof this.tabIndex_!="undefined"&&this.el_.removeAttribute("tabIndex"),this.off("mouseover",this.handleMouseOver_),this.off("mouseout",this.handleMouseOut_),this.off(["tap","click"],this.handleClick_),this.off("keydown",this.handleKeyDown_)}handleLanguagechange(){this.controlText(this.controlText_)}handleClick(e){this.options_.clickHandler&&this.options_.clickHandler.call(this,arguments)}handleKeyDown(e){O().isEventKey(e,"Space")||O().isEventKey(e,"Enter")?(e.preventDefault(),e.stopPropagation(),this.trigger("click")):super.handleKeyDown(e)}}W.registerComponent("ClickableComponent",Er);class Ya extends Er{constructor(e,t){super(e,t),this.update(),this.update_=i=>this.update(i),e.on("posterchange",this.update_)}dispose(){this.player().off("posterchange",this.update_),super.dispose()}createEl(){return Re("div",{className:"vjs-poster"})}crossOrigin(e){if(typeof e=="undefined")return this.$("img")?this.$("img").crossOrigin:this.player_.tech_&&this.player_.tech_.isReady_?this.player_.crossOrigin():this.player_.options_.crossOrigin||this.player_.options_.crossorigin||null;if(e!==null&&e!=="anonymous"&&e!=="use-credentials"){this.player_.log.warn(`crossOrigin must be null,  "anonymous" or "use-credentials", given "${e}"`);return}this.$("img")&&(this.$("img").crossOrigin=e)}update(e){const t=this.player().poster();this.setSrc(t),t?this.show():this.hide()}setSrc(e){if(!e){this.el_.textContent="";return}this.$("img")||this.el_.appendChild(Re("picture",{className:"vjs-poster",tabIndex:-1},{},Re("img",{loading:"lazy",crossOrigin:this.crossOrigin()},{alt:""}))),this.$("img").src=e}handleClick(e){this.player_.controls()&&(this.player_.tech(!0)&&this.player_.tech(!0).focus(),this.player_.paused()?_i(this.player_.play()):this.player_.pause())}}Ya.prototype.crossorigin=Ya.prototype.crossOrigin,W.registerComponent("PosterImage",Ya);const ii="#222",pu="#ccc",cp={monospace:"monospace",sansSerif:"sans-serif",serif:"serif",monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace',monospaceSerif:'"Courier New", monospace',proportionalSansSerif:"sans-serif",proportionalSerif:"serif",casual:'"Comic Sans MS", Impact, fantasy',script:'"Monotype Corsiva", cursive',smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'};function Ka(n,e){let t;if(n.length===4)t=n[1]+n[1]+n[2]+n[2]+n[3]+n[3];else if(n.length===7)t=n.slice(1);else throw new Error("Invalid color code provided, "+n+"; must be formatted as e.g. #f0e or #f604e2.");return"rgba("+parseInt(t.slice(0,2),16)+","+parseInt(t.slice(2,4),16)+","+parseInt(t.slice(4,6),16)+","+e+")"}function Es(n,e,t){try{n.style[e]=t}catch(i){return}}function mu(n){return n?`${n}px`:""}class dp extends W{constructor(e,t,i){super(e,t,i);const s=a=>this.updateDisplay(a),r=a=>{this.updateDisplayOverlay(),this.updateDisplay(a)};e.on("loadstart",a=>this.toggleDisplay(a)),e.on("texttrackchange",s),e.on("loadedmetadata",a=>{this.updateDisplayOverlay(),this.preselectTrack(a)}),e.ready(tt(this,function(){if(e.tech_&&e.tech_.featuresNativeTextTracks){this.hide();return}e.on("fullscreenchange",r),e.on("playerresize",r);const a=A().screen.orientation||A(),l=A().screen.orientation?"change":"orientationchange";a.addEventListener(l,r),e.on("dispose",()=>a.removeEventListener(l,r));const h=this.options_.playerOptions.tracks||[];for(let m=0;m<h.length;m++)this.player_.addRemoteTextTrack(h[m],!0);this.preselectTrack()}))}preselectTrack(){const e={captions:1,subtitles:1},t=this.player_.textTracks(),i=this.player_.cache_.selectedLanguage;let s,r,a;for(let l=0;l<t.length;l++){const h=t[l];i&&i.enabled&&i.language&&i.language===h.language&&h.kind in e?h.kind===i.kind?a=h:a||(a=h):i&&!i.enabled?(a=null,s=null,r=null):h.default&&(h.kind==="descriptions"&&!s?s=h:h.kind in e&&!r&&(r=h))}a?a.mode="showing":r?r.mode="showing":s&&(s.mode="showing")}toggleDisplay(){this.player_.tech_&&this.player_.tech_.featuresNativeTextTracks?this.hide():this.show()}createEl(){return super.createEl("div",{className:"vjs-text-track-display"},{translate:"yes","aria-live":"off","aria-atomic":"true"})}clearDisplay(){typeof A().WebVTT=="function"&&A().WebVTT.processCues(A(),[],this.el_)}updateDisplay(){const e=this.player_.textTracks(),t=this.options_.allowMultipleShowingTracks;if(this.clearDisplay(),t){const a=[];for(let l=0;l<e.length;++l){const h=e[l];h.mode==="showing"&&a.push(h)}this.updateForTrack(a);return}let i=null,s=null,r=e.length;for(;r--;){const a=e[r];a.mode==="showing"&&(a.kind==="descriptions"?i=a:s=a)}s?(this.getAttribute("aria-live")!=="off"&&this.setAttribute("aria-live","off"),this.updateForTrack(s)):i&&(this.getAttribute("aria-live")!=="assertive"&&this.setAttribute("aria-live","assertive"),this.updateForTrack(i))}updateDisplayOverlay(){if(!this.player_.videoHeight()||!A().CSS.supports("inset-inline: 10px"))return;const e=this.player_.currentWidth(),t=this.player_.currentHeight(),i=e/t,s=this.player_.videoWidth()/this.player_.videoHeight();let r=0,a=0;Math.abs(i-s)>.1&&(i>s?r=Math.round((e-t*s)/2):a=Math.round((t-e/s)/2)),Es(this.el_,"insetInline",mu(r)),Es(this.el_,"insetBlock",mu(a))}updateDisplayState(e){const t=this.player_.textTrackSettings.getValues(),i=e.activeCues;let s=i.length;for(;s--;){const r=i[s];if(!r)continue;const a=r.displayState;if(t.color&&(a.firstChild.style.color=t.color),t.textOpacity&&Es(a.firstChild,"color",Ka(t.color||"#fff",t.textOpacity)),t.backgroundColor&&(a.firstChild.style.backgroundColor=t.backgroundColor),t.backgroundOpacity&&Es(a.firstChild,"backgroundColor",Ka(t.backgroundColor||"#000",t.backgroundOpacity)),t.windowColor&&(t.windowOpacity?Es(a,"backgroundColor",Ka(t.windowColor,t.windowOpacity)):a.style.backgroundColor=t.windowColor),t.edgeStyle&&(t.edgeStyle==="dropshadow"?a.firstChild.style.textShadow=`2px 2px 3px ${ii}, 2px 2px 4px ${ii}, 2px 2px 5px ${ii}`:t.edgeStyle==="raised"?a.firstChild.style.textShadow=`1px 1px ${ii}, 2px 2px ${ii}, 3px 3px ${ii}`:t.edgeStyle==="depressed"?a.firstChild.style.textShadow=`1px 1px ${pu}, 0 1px ${pu}, -1px -1px ${ii}, 0 -1px ${ii}`:t.edgeStyle==="uniform"&&(a.firstChild.style.textShadow=`0 0 4px ${ii}, 0 0 4px ${ii}, 0 0 4px ${ii}, 0 0 4px ${ii}`)),t.fontPercent&&t.fontPercent!==1){const l=A().parseFloat(a.style.fontSize);a.style.fontSize=l*t.fontPercent+"px",a.style.height="auto",a.style.top="auto"}t.fontFamily&&t.fontFamily!=="default"&&(t.fontFamily==="small-caps"?a.firstChild.style.fontVariant="small-caps":a.firstChild.style.fontFamily=cp[t.fontFamily])}}updateForTrack(e){if(Array.isArray(e)||(e=[e]),typeof A().WebVTT!="function"||e.every(i=>!i.activeCues))return;const t=[];for(let i=0;i<e.length;++i){const s=e[i];for(let r=0;r<s.activeCues.length;++r)t.push(s.activeCues[r])}A().WebVTT.processCues(A(),t,this.el_);for(let i=0;i<e.length;++i){const s=e[i];for(let r=0;r<s.activeCues.length;++r){const a=s.activeCues[r].displayState;Zi(a,"vjs-text-track-cue","vjs-text-track-cue-"+(s.language?s.language:i)),s.language&&On(a,"lang",s.language)}this.player_.textTrackSettings&&this.updateDisplayState(s)}}}W.registerComponent("TextTrackDisplay",dp);class hp extends W{createEl(){const e=this.player_.isAudio(),t=this.localize(e?"Audio Player":"Video Player"),i=Re("span",{className:"vjs-control-text",textContent:this.localize("{1} is loading.",[t])}),s=super.createEl("div",{className:"vjs-loading-spinner",dir:"ltr"});return s.appendChild(i),s}handleLanguagechange(){this.$(".vjs-control-text").textContent=this.localize("{1} is loading.",[this.player_.isAudio()?"Audio Player":"Video Player"])}}W.registerComponent("LoadingSpinner",hp);class $t extends Er{createEl(e,t={},i={}){e="button",t=Object.assign({className:this.buildCSSClass()},t),i=Object.assign({type:"button"},i);const s=Re(e,t,i);return this.player_.options_.experimentalSvgIcons||s.appendChild(Re("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),this.createControlTextEl(s),s}addChild(e,t={}){const i=this.constructor.name;return Me.warn(`Adding an actionable (user controllable) child to a Button (${i}) is not supported; use a ClickableComponent instead.`),W.prototype.addChild.call(this,e,t)}enable(){super.enable(),this.el_.removeAttribute("disabled")}disable(){super.disable(),this.el_.setAttribute("disabled","disabled")}handleKeyDown(e){if(O().isEventKey(e,"Space")||O().isEventKey(e,"Enter")){e.stopPropagation();return}super.handleKeyDown(e)}}W.registerComponent("Button",$t);class gu extends $t{constructor(e,t){super(e,t),this.mouseused_=!1,this.setIcon("play"),this.on("mousedown",i=>this.handleMouseDown(i))}buildCSSClass(){return"vjs-big-play-button"}handleClick(e){const t=this.player_.play();if(this.mouseused_&&"clientX"in e&&"clientY"in e){_i(t),this.player_.tech(!0)&&this.player_.tech(!0).focus();return}const i=this.player_.getChild("controlBar"),s=i&&i.getChild("playToggle");if(!s){this.player_.tech(!0).focus();return}const r=()=>s.focus();_s(t)?t.then(r,()=>{}):this.setTimeout(r,1)}handleKeyDown(e){this.mouseused_=!1,super.handleKeyDown(e)}handleMouseDown(e){this.mouseused_=!0}}gu.prototype.controlText_="Play Video",W.registerComponent("BigPlayButton",gu);class fp extends $t{constructor(e,t){super(e,t),this.setIcon("cancel"),this.controlText(t&&t.controlText||this.localize("Close"))}buildCSSClass(){return`vjs-close-button ${super.buildCSSClass()}`}handleClick(e){this.trigger({type:"close",bubbles:!1})}handleKeyDown(e){O().isEventKey(e,"Esc")?(e.preventDefault(),e.stopPropagation(),this.trigger("click")):super.handleKeyDown(e)}}W.registerComponent("CloseButton",fp);class vu extends $t{constructor(e,t={}){super(e,t),t.replay=t.replay===void 0||t.replay,this.setIcon("play"),this.on(e,"play",i=>this.handlePlay(i)),this.on(e,"pause",i=>this.handlePause(i)),t.replay&&this.on(e,"ended",i=>this.handleEnded(i))}buildCSSClass(){return`vjs-play-control ${super.buildCSSClass()}`}handleClick(e){this.player_.paused()?_i(this.player_.play()):this.player_.pause()}handleSeeked(e){this.removeClass("vjs-ended"),this.player_.paused()?this.handlePause(e):this.handlePlay(e)}handlePlay(e){this.removeClass("vjs-ended","vjs-paused"),this.addClass("vjs-playing"),this.setIcon("pause"),this.controlText("Pause")}handlePause(e){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.setIcon("play"),this.controlText("Play")}handleEnded(e){this.removeClass("vjs-playing"),this.addClass("vjs-ended"),this.setIcon("replay"),this.controlText("Replay"),this.one(this.player_,"seeked",t=>this.handleSeeked(t))}}vu.prototype.controlText_="Play",W.registerComponent("PlayToggle",vu);class zn extends W{constructor(e,t){super(e,t),this.on(e,["timeupdate","ended"],i=>this.updateContent(i)),this.updateTextNode_()}createEl(){const e=this.buildCSSClass(),t=super.createEl("div",{className:`${e} vjs-time-control vjs-control`}),i=Re("span",{className:"vjs-control-text",textContent:`${this.localize(this.labelText_)}\xA0`},{role:"presentation"});return t.appendChild(i),this.contentEl_=Re("span",{className:`${e}-display`},{role:"presentation"}),t.appendChild(this.contentEl_),t}dispose(){this.contentEl_=null,this.textNode_=null,super.dispose()}updateTextNode_(e=0){e=tn(e),this.formattedTime_!==e&&(this.formattedTime_=e,this.requestNamedAnimationFrame("TimeDisplay#updateTextNode_",()=>{if(!this.contentEl_)return;let t=this.textNode_;t&&this.contentEl_.firstChild!==t&&(t=null,Me.warn("TimeDisplay#updateTextnode_: Prevented replacement of text node element since it was no longer a child of this node. Appending a new node instead.")),this.textNode_=I().createTextNode(this.formattedTime_),this.textNode_&&(t?this.contentEl_.replaceChild(this.textNode_,t):this.contentEl_.appendChild(this.textNode_))}))}updateContent(e){}}zn.prototype.labelText_="Time",zn.prototype.controlText_="Time",W.registerComponent("TimeDisplay",zn);class Qa extends zn{buildCSSClass(){return"vjs-current-time"}updateContent(e){let t;this.player_.ended()?t=this.player_.duration():t=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime(),this.updateTextNode_(t)}}Qa.prototype.labelText_="Current Time",Qa.prototype.controlText_="Current Time",W.registerComponent("CurrentTimeDisplay",Qa);class Ja extends zn{constructor(e,t){super(e,t);const i=s=>this.updateContent(s);this.on(e,"durationchange",i),this.on(e,"loadstart",i),this.on(e,"loadedmetadata",i)}buildCSSClass(){return"vjs-duration"}updateContent(e){const t=this.player_.duration();this.updateTextNode_(t)}}Ja.prototype.labelText_="Duration",Ja.prototype.controlText_="Duration",W.registerComponent("DurationDisplay",Ja);class pp extends W{createEl(){const e=super.createEl("div",{className:"vjs-time-control vjs-time-divider"},{"aria-hidden":!0}),t=super.createEl("div"),i=super.createEl("span",{textContent:"/"});return t.appendChild(i),e.appendChild(t),e}}W.registerComponent("TimeDivider",pp);class Za extends zn{constructor(e,t){super(e,t),this.on(e,"durationchange",i=>this.updateContent(i))}buildCSSClass(){return"vjs-remaining-time"}createEl(){const e=super.createEl();return this.options_.displayNegative!==!1&&e.insertBefore(Re("span",{},{"aria-hidden":!0},"-"),this.contentEl_),e}updateContent(e){if(typeof this.player_.duration()!="number")return;let t;this.player_.ended()?t=0:this.player_.remainingTimeDisplay?t=this.player_.remainingTimeDisplay():t=this.player_.remainingTime(),this.updateTextNode_(t)}}Za.prototype.labelText_="Remaining Time",Za.prototype.controlText_="Remaining Time",W.registerComponent("RemainingTimeDisplay",Za);class mp extends W{constructor(e,t){super(e,t),this.updateShowing(),this.on(this.player(),"durationchange",i=>this.updateShowing(i))}createEl(){const e=super.createEl("div",{className:"vjs-live-control vjs-control"});return this.contentEl_=Re("div",{className:"vjs-live-display"},{"aria-live":"off"}),this.contentEl_.appendChild(Re("span",{className:"vjs-control-text",textContent:`${this.localize("Stream Type")}\xA0`})),this.contentEl_.appendChild(I().createTextNode(this.localize("LIVE"))),e.appendChild(this.contentEl_),e}dispose(){this.contentEl_=null,super.dispose()}updateShowing(e){this.player().duration()===1/0?this.show():this.hide()}}W.registerComponent("LiveDisplay",mp);class Au extends $t{constructor(e,t){super(e,t),this.updateLiveEdgeStatus(),this.player_.liveTracker&&(this.updateLiveEdgeStatusHandler_=i=>this.updateLiveEdgeStatus(i),this.on(this.player_.liveTracker,"liveedgechange",this.updateLiveEdgeStatusHandler_))}createEl(){const e=super.createEl("button",{className:"vjs-seek-to-live-control vjs-control"});return this.setIcon("circle",e),this.textEl_=Re("span",{className:"vjs-seek-to-live-text",textContent:this.localize("LIVE")},{"aria-hidden":"true"}),e.appendChild(this.textEl_),e}updateLiveEdgeStatus(){!this.player_.liveTracker||this.player_.liveTracker.atLiveEdge()?(this.setAttribute("aria-disabled",!0),this.addClass("vjs-at-live-edge"),this.controlText("Seek to live, currently playing live")):(this.setAttribute("aria-disabled",!1),this.removeClass("vjs-at-live-edge"),this.controlText("Seek to live, currently behind live"))}handleClick(){this.player_.liveTracker.seekToLiveEdge()}dispose(){this.player_.liveTracker&&this.off(this.player_.liveTracker,"liveedgechange",this.updateLiveEdgeStatusHandler_),this.textEl_=null,super.dispose()}}Au.prototype.controlText_="Seek to live, currently playing live",W.registerComponent("SeekToLive",Au);function Ts(n,e,t){return n=Number(n),Math.min(t,Math.max(e,isNaN(n)?e:n))}var gp=Object.freeze({__proto__:null,clamp:Ts});class eo extends W{constructor(e,t){super(e,t),this.handleMouseDown_=i=>this.handleMouseDown(i),this.handleMouseUp_=i=>this.handleMouseUp(i),this.handleKeyDown_=i=>this.handleKeyDown(i),this.handleClick_=i=>this.handleClick(i),this.handleMouseMove_=i=>this.handleMouseMove(i),this.update_=i=>this.update(i),this.bar=this.getChild(this.options_.barName),this.vertical(!!this.options_.vertical),this.enable()}enabled(){return this.enabled_}enable(){this.enabled()||(this.on("mousedown",this.handleMouseDown_),this.on("touchstart",this.handleMouseDown_),this.on("keydown",this.handleKeyDown_),this.on("click",this.handleClick_),this.on(this.player_,"controlsvisible",this.update),this.playerEvent&&this.on(this.player_,this.playerEvent,this.update),this.removeClass("disabled"),this.setAttribute("tabindex",0),this.enabled_=!0)}disable(){if(!this.enabled())return;const e=this.bar.el_.ownerDocument;this.off("mousedown",this.handleMouseDown_),this.off("touchstart",this.handleMouseDown_),this.off("keydown",this.handleKeyDown_),this.off("click",this.handleClick_),this.off(this.player_,"controlsvisible",this.update_),this.off(e,"mousemove",this.handleMouseMove_),this.off(e,"mouseup",this.handleMouseUp_),this.off(e,"touchmove",this.handleMouseMove_),this.off(e,"touchend",this.handleMouseUp_),this.removeAttribute("tabindex"),this.addClass("disabled"),this.playerEvent&&this.off(this.player_,this.playerEvent,this.update),this.enabled_=!1}createEl(e,t={},i={}){return t.className=t.className+" vjs-slider",t=Object.assign({tabIndex:0},t),i=Object.assign({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100},i),super.createEl(e,t,i)}handleMouseDown(e){const t=this.bar.el_.ownerDocument;e.type==="mousedown"&&e.preventDefault(),e.type==="touchstart"&&!gi&&e.preventDefault(),Ll(),this.addClass("vjs-sliding"),this.trigger("slideractive"),this.on(t,"mousemove",this.handleMouseMove_),this.on(t,"mouseup",this.handleMouseUp_),this.on(t,"touchmove",this.handleMouseMove_),this.on(t,"touchend",this.handleMouseUp_),this.handleMouseMove(e,!0)}handleMouseMove(e){}handleMouseUp(e){const t=this.bar.el_.ownerDocument;Ol(),this.removeClass("vjs-sliding"),this.trigger("sliderinactive"),this.off(t,"mousemove",this.handleMouseMove_),this.off(t,"mouseup",this.handleMouseUp_),this.off(t,"touchmove",this.handleMouseMove_),this.off(t,"touchend",this.handleMouseUp_),this.update()}update(){if(!this.el_||!this.bar)return;const e=this.getProgress();return e===this.progress_||(this.progress_=e,this.requestNamedAnimationFrame("Slider#update",()=>{const t=this.vertical()?"height":"width";this.bar.el().style[t]=(e*100).toFixed(2)+"%"})),e}getProgress(){return Number(Ts(this.getPercent(),0,1).toFixed(4))}calculateDistance(e){const t=dr(this.el_,e);return this.vertical()?t.y:t.x}handleKeyDown(e){O().isEventKey(e,"Left")||O().isEventKey(e,"Down")?(e.preventDefault(),e.stopPropagation(),this.stepBack()):O().isEventKey(e,"Right")||O().isEventKey(e,"Up")?(e.preventDefault(),e.stopPropagation(),this.stepForward()):super.handleKeyDown(e)}handleClick(e){e.stopPropagation(),e.preventDefault()}vertical(e){if(e===void 0)return this.vertical_||!1;this.vertical_=!!e,this.vertical_?this.addClass("vjs-slider-vertical"):this.addClass("vjs-slider-horizontal")}}W.registerComponent("Slider",eo);const to=(n,e)=>Ts(n/e*100,0,100).toFixed(2)+"%";class vp extends W{constructor(e,t){super(e,t),this.partEls_=[],this.on(e,"progress",i=>this.update(i))}createEl(){const e=super.createEl("div",{className:"vjs-load-progress"}),t=Re("span",{className:"vjs-control-text"}),i=Re("span",{textContent:this.localize("Loaded")}),s=I().createTextNode(": ");return this.percentageEl_=Re("span",{className:"vjs-control-text-loaded-percentage",textContent:"0%"}),e.appendChild(t),t.appendChild(i),t.appendChild(s),t.appendChild(this.percentageEl_),e}dispose(){this.partEls_=null,this.percentageEl_=null,super.dispose()}update(e){this.requestNamedAnimationFrame("LoadProgressBar#update",()=>{const t=this.player_.liveTracker,i=this.player_.buffered(),s=t&&t.isLive()?t.seekableEnd():this.player_.duration(),r=this.player_.bufferedEnd(),a=this.partEls_,l=to(r,s);this.percent_!==l&&(this.el_.style.width=l,Vi(this.percentageEl_,l),this.percent_=l);for(let h=0;h<i.length;h++){const m=i.start(h),g=i.end(h);let E=a[h];E||(E=this.el_.appendChild(Re()),a[h]=E),!(E.dataset.start===m&&E.dataset.end===g)&&(E.dataset.start=m,E.dataset.end=g,E.style.left=to(m,r),E.style.width=to(g-m,r))}for(let h=a.length;h>i.length;h--)this.el_.removeChild(a[h-1]);a.length=i.length})}}W.registerComponent("LoadProgressBar",vp);class Ap extends W{constructor(e,t){super(e,t),this.update=Ai(tt(this,this.update),Zt)}createEl(){return super.createEl("div",{className:"vjs-time-tooltip"},{"aria-hidden":"true"})}update(e,t,i){const s=gs(this.el_),r=Rn(this.player_.el()),a=e.width*t;if(!r||!s)return;const l=e.left-r.left+a,h=e.width-a+(r.right-e.right);let m=s.width/2;l<m?m+=m-l:h<m&&(m=h),m<0?m=0:m>s.width&&(m=s.width),m=Math.round(m),this.el_.style.right=`-${m}px`,this.write(i)}write(e){Vi(this.el_,e)}updateTime(e,t,i,s){this.requestNamedAnimationFrame("TimeTooltip#updateTime",()=>{let r;const a=this.player_.duration();if(this.player_.liveTracker&&this.player_.liveTracker.isLive()){const l=this.player_.liveTracker.liveWindow(),h=l-t*l;r=(h<1?"":"-")+tn(h,l)}else r=tn(i,a);this.update(e,t,r),s&&s()})}}W.registerComponent("TimeTooltip",Ap);class io extends W{constructor(e,t){super(e,t),this.setIcon("circle"),this.update=Ai(tt(this,this.update),Zt)}createEl(){return super.createEl("div",{className:"vjs-play-progress vjs-slider-bar"},{"aria-hidden":"true"})}update(e,t){const i=this.getChild("timeTooltip");if(!i)return;const s=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();i.updateTime(e,t,s)}}io.prototype.options_={children:[]},!It&&!mi&&io.prototype.options_.children.push("timeTooltip"),W.registerComponent("PlayProgressBar",io);class yu extends W{constructor(e,t){super(e,t),this.update=Ai(tt(this,this.update),Zt)}createEl(){return super.createEl("div",{className:"vjs-mouse-display"})}update(e,t){const i=t*this.player_.duration();this.getChild("timeTooltip").updateTime(e,t,i,()=>{this.el_.style.left=`${e.width*t}px`})}}yu.prototype.options_={children:["timeTooltip"]},W.registerComponent("MouseTimeDisplay",yu);const Tr=5,_u=12;class no extends eo{constructor(e,t){super(e,t),this.setEventHandlers_()}setEventHandlers_(){this.update_=tt(this,this.update),this.update=Ai(this.update_,Zt),this.on(this.player_,["ended","durationchange","timeupdate"],this.update),this.player_.liveTracker&&this.on(this.player_.liveTracker,"liveedgechange",this.update),this.updateInterval=null,this.enableIntervalHandler_=e=>this.enableInterval_(e),this.disableIntervalHandler_=e=>this.disableInterval_(e),this.on(this.player_,["playing"],this.enableIntervalHandler_),this.on(this.player_,["ended","pause","waiting"],this.disableIntervalHandler_),"hidden"in I()&&"visibilityState"in I()&&this.on(I(),"visibilitychange",this.toggleVisibility_)}toggleVisibility_(e){I().visibilityState==="hidden"?(this.cancelNamedAnimationFrame("SeekBar#update"),this.cancelNamedAnimationFrame("Slider#update"),this.disableInterval_(e)):(!this.player_.ended()&&!this.player_.paused()&&this.enableInterval_(),this.update())}enableInterval_(){this.updateInterval||(this.updateInterval=this.setInterval(this.update,Zt))}disableInterval_(e){this.player_.liveTracker&&this.player_.liveTracker.isLive()&&e&&e.type!=="ended"||this.updateInterval&&(this.clearInterval(this.updateInterval),this.updateInterval=null)}createEl(){return super.createEl("div",{className:"vjs-progress-holder"},{"aria-label":this.localize("Progress Bar")})}update(e){if(I().visibilityState==="hidden")return;const t=super.update();return this.requestNamedAnimationFrame("SeekBar#update",()=>{const i=this.player_.ended()?this.player_.duration():this.getCurrentTime_(),s=this.player_.liveTracker;let r=this.player_.duration();s&&s.isLive()&&(r=this.player_.liveTracker.liveCurrentTime()),this.percent_!==t&&(this.el_.setAttribute("aria-valuenow",(t*100).toFixed(2)),this.percent_=t),(this.currentTime_!==i||this.duration_!==r)&&(this.el_.setAttribute("aria-valuetext",this.localize("progress bar timing: currentTime={1} duration={2}",[tn(i,r),tn(r,r)],"{1} of {2}")),this.currentTime_=i,this.duration_=r),this.bar&&this.bar.update(Rn(this.el()),this.getProgress())}),t}userSeek_(e){this.player_.liveTracker&&this.player_.liveTracker.isLive()&&this.player_.liveTracker.nextSeekedFromUser(),this.player_.currentTime(e)}getCurrentTime_(){return this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime()}getPercent(){const e=this.getCurrentTime_();let t;const i=this.player_.liveTracker;return i&&i.isLive()?(t=(e-i.seekableStart())/i.liveWindow(),i.atLiveEdge()&&(t=1)):t=e/this.player_.duration(),t}handleMouseDown(e){vs(e)&&(e.stopPropagation(),this.videoWasPlaying=!this.player_.paused(),this.player_.pause(),super.handleMouseDown(e))}handleMouseMove(e,t=!1){if(!vs(e)||isNaN(this.player_.duration()))return;!t&&!this.player_.scrubbing()&&this.player_.scrubbing(!0);let i;const s=this.calculateDistance(e),r=this.player_.liveTracker;if(!r||!r.isLive())i=s*this.player_.duration(),i===this.player_.duration()&&(i=i-.1);else{if(s>=.99){r.seekToLiveEdge();return}const a=r.seekableStart(),l=r.liveCurrentTime();if(i=a+s*r.liveWindow(),i>=l&&(i=l),i<=a&&(i=a+.1),i===1/0)return}this.userSeek_(i)}enable(){super.enable();const e=this.getChild("mouseTimeDisplay");e&&e.show()}disable(){super.disable();const e=this.getChild("mouseTimeDisplay");e&&e.hide()}handleMouseUp(e){super.handleMouseUp(e),e&&e.stopPropagation(),this.player_.scrubbing(!1),this.player_.trigger({type:"timeupdate",target:this,manuallyTriggered:!0}),this.videoWasPlaying?_i(this.player_.play()):this.update_()}stepForward(){this.userSeek_(this.player_.currentTime()+Tr)}stepBack(){this.userSeek_(this.player_.currentTime()-Tr)}handleAction(e){this.player_.paused()?this.player_.play():this.player_.pause()}handleKeyDown(e){const t=this.player_.liveTracker;if(O().isEventKey(e,"Space")||O().isEventKey(e,"Enter"))e.preventDefault(),e.stopPropagation(),this.handleAction(e);else if(O().isEventKey(e,"Home"))e.preventDefault(),e.stopPropagation(),this.userSeek_(0);else if(O().isEventKey(e,"End"))e.preventDefault(),e.stopPropagation(),t&&t.isLive()?this.userSeek_(t.liveCurrentTime()):this.userSeek_(this.player_.duration());else if(/^[0-9]$/.test(O()(e))){e.preventDefault(),e.stopPropagation();const i=(O().codes[O()(e)]-O().codes[0])*10/100;t&&t.isLive()?this.userSeek_(t.seekableStart()+t.liveWindow()*i):this.userSeek_(this.player_.duration()*i)}else O().isEventKey(e,"PgDn")?(e.preventDefault(),e.stopPropagation(),this.userSeek_(this.player_.currentTime()-Tr*_u)):O().isEventKey(e,"PgUp")?(e.preventDefault(),e.stopPropagation(),this.userSeek_(this.player_.currentTime()+Tr*_u)):super.handleKeyDown(e)}dispose(){this.disableInterval_(),this.off(this.player_,["ended","durationchange","timeupdate"],this.update),this.player_.liveTracker&&this.off(this.player_.liveTracker,"liveedgechange",this.update),this.off(this.player_,["playing"],this.enableIntervalHandler_),this.off(this.player_,["ended","pause","waiting"],this.disableIntervalHandler_),"hidden"in I()&&"visibilityState"in I()&&this.off(I(),"visibilitychange",this.toggleVisibility_),super.dispose()}}no.prototype.options_={children:["loadProgressBar","playProgressBar"],barName:"playProgressBar"},!It&&!mi&&no.prototype.options_.children.splice(1,0,"mouseTimeDisplay"),W.registerComponent("SeekBar",no);class bu extends W{constructor(e,t){super(e,t),this.handleMouseMove=Ai(tt(this,this.handleMouseMove),Zt),this.throttledHandleMouseSeek=Ai(tt(this,this.handleMouseSeek),Zt),this.handleMouseUpHandler_=i=>this.handleMouseUp(i),this.handleMouseDownHandler_=i=>this.handleMouseDown(i),this.enable()}createEl(){return super.createEl("div",{className:"vjs-progress-control vjs-control"})}handleMouseMove(e){const t=this.getChild("seekBar");if(!t)return;const i=t.getChild("playProgressBar"),s=t.getChild("mouseTimeDisplay");if(!i&&!s)return;const r=t.el(),a=gs(r);let l=dr(r,e).x;l=Ts(l,0,1),s&&s.update(a,l),i&&i.update(a,t.getProgress())}handleMouseSeek(e){const t=this.getChild("seekBar");t&&t.handleMouseMove(e)}enabled(){return this.enabled_}disable(){if(this.children().forEach(e=>e.disable&&e.disable()),!!this.enabled()&&(this.off(["mousedown","touchstart"],this.handleMouseDownHandler_),this.off(this.el_,"mousemove",this.handleMouseMove),this.removeListenersAddedOnMousedownAndTouchstart(),this.addClass("disabled"),this.enabled_=!1,this.player_.scrubbing())){const e=this.getChild("seekBar");this.player_.scrubbing(!1),e.videoWasPlaying&&_i(this.player_.play())}}enable(){this.children().forEach(e=>e.enable&&e.enable()),!this.enabled()&&(this.on(["mousedown","touchstart"],this.handleMouseDownHandler_),this.on(this.el_,"mousemove",this.handleMouseMove),this.removeClass("disabled"),this.enabled_=!0)}removeListenersAddedOnMousedownAndTouchstart(){const e=this.el_.ownerDocument;this.off(e,"mousemove",this.throttledHandleMouseSeek),this.off(e,"touchmove",this.throttledHandleMouseSeek),this.off(e,"mouseup",this.handleMouseUpHandler_),this.off(e,"touchend",this.handleMouseUpHandler_)}handleMouseDown(e){const t=this.el_.ownerDocument,i=this.getChild("seekBar");i&&i.handleMouseDown(e),this.on(t,"mousemove",this.throttledHandleMouseSeek),this.on(t,"touchmove",this.throttledHandleMouseSeek),this.on(t,"mouseup",this.handleMouseUpHandler_),this.on(t,"touchend",this.handleMouseUpHandler_)}handleMouseUp(e){const t=this.getChild("seekBar");t&&t.handleMouseUp(e),this.removeListenersAddedOnMousedownAndTouchstart()}}bu.prototype.options_={children:["seekBar"]},W.registerComponent("ProgressControl",bu);class Eu extends $t{constructor(e,t){super(e,t),this.setIcon("picture-in-picture-enter"),this.on(e,["enterpictureinpicture","leavepictureinpicture"],i=>this.handlePictureInPictureChange(i)),this.on(e,["disablepictureinpicturechanged","loadedmetadata"],i=>this.handlePictureInPictureEnabledChange(i)),this.on(e,["loadedmetadata","audioonlymodechange","audiopostermodechange"],()=>this.handlePictureInPictureAudioModeChange()),this.disable()}buildCSSClass(){return`vjs-picture-in-picture-control vjs-hidden ${super.buildCSSClass()}`}handlePictureInPictureAudioModeChange(){if(!(this.player_.currentType().substring(0,5)==="audio"||this.player_.audioPosterMode()||this.player_.audioOnlyMode())){this.show();return}this.player_.isInPictureInPicture()&&this.player_.exitPictureInPicture(),this.hide()}handlePictureInPictureEnabledChange(){I().pictureInPictureEnabled&&this.player_.disablePictureInPicture()===!1||this.player_.options_.enableDocumentPictureInPicture&&"documentPictureInPicture"in A()?this.enable():this.disable()}handlePictureInPictureChange(e){this.player_.isInPictureInPicture()?(this.setIcon("picture-in-picture-exit"),this.controlText("Exit Picture-in-Picture")):(this.setIcon("picture-in-picture-enter"),this.controlText("Picture-in-Picture")),this.handlePictureInPictureEnabledChange()}handleClick(e){this.player_.isInPictureInPicture()?this.player_.exitPictureInPicture():this.player_.requestPictureInPicture()}show(){typeof I().exitPictureInPicture=="function"&&super.show()}}Eu.prototype.controlText_="Picture-in-Picture",W.registerComponent("PictureInPictureToggle",Eu);class Tu extends $t{constructor(e,t){super(e,t),this.setIcon("fullscreen-enter"),this.on(e,"fullscreenchange",i=>this.handleFullscreenChange(i)),I()[e.fsApi_.fullscreenEnabled]===!1&&this.disable()}buildCSSClass(){return`vjs-fullscreen-control ${super.buildCSSClass()}`}handleFullscreenChange(e){this.player_.isFullscreen()?(this.controlText("Exit Fullscreen"),this.setIcon("fullscreen-exit")):(this.controlText("Fullscreen"),this.setIcon("fullscreen-enter"))}handleClick(e){this.player_.isFullscreen()?this.player_.exitFullscreen():this.player_.requestFullscreen()}}Tu.prototype.controlText_="Fullscreen",W.registerComponent("FullscreenToggle",Tu);const yp=function(n,e){e.tech_&&!e.tech_.featuresVolumeControl&&n.addClass("vjs-hidden"),n.on(e,"loadstart",function(){e.tech_.featuresVolumeControl?n.removeClass("vjs-hidden"):n.addClass("vjs-hidden")})};class _p extends W{createEl(){const e=super.createEl("div",{className:"vjs-volume-level"});return this.setIcon("circle",e),e.appendChild(super.createEl("span",{className:"vjs-control-text"})),e}}W.registerComponent("VolumeLevel",_p);class bp extends W{constructor(e,t){super(e,t),this.update=Ai(tt(this,this.update),Zt)}createEl(){return super.createEl("div",{className:"vjs-volume-tooltip"},{"aria-hidden":"true"})}update(e,t,i,s){if(!i){const r=Rn(this.el_),a=Rn(this.player_.el()),l=e.width*t;if(!a||!r)return;const h=e.left-a.left+l,m=e.width-l+(a.right-e.right);let g=r.width/2;h<g?g+=g-h:m<g&&(g=m),g<0?g=0:g>r.width&&(g=r.width),this.el_.style.right=`-${g}px`}this.write(`${s}%`)}write(e){Vi(this.el_,e)}updateVolume(e,t,i,s,r){this.requestNamedAnimationFrame("VolumeLevelTooltip#updateVolume",()=>{this.update(e,t,i,s.toFixed(0)),r&&r()})}}W.registerComponent("VolumeLevelTooltip",bp);class Cu extends W{constructor(e,t){super(e,t),this.update=Ai(tt(this,this.update),Zt)}createEl(){return super.createEl("div",{className:"vjs-mouse-display"})}update(e,t,i){const s=100*t;this.getChild("volumeLevelTooltip").updateVolume(e,t,i,s,()=>{i?this.el_.style.bottom=`${e.height*t}px`:this.el_.style.left=`${e.width*t}px`})}}Cu.prototype.options_={children:["volumeLevelTooltip"]},W.registerComponent("MouseVolumeLevelDisplay",Cu);class Cr extends eo{constructor(e,t){super(e,t),this.on("slideractive",i=>this.updateLastVolume_(i)),this.on(e,"volumechange",i=>this.updateARIAAttributes(i)),e.ready(()=>this.updateARIAAttributes())}createEl(){return super.createEl("div",{className:"vjs-volume-bar vjs-slider-bar"},{"aria-label":this.localize("Volume Level"),"aria-live":"polite"})}handleMouseDown(e){vs(e)&&super.handleMouseDown(e)}handleMouseMove(e){const t=this.getChild("mouseVolumeLevelDisplay");if(t){const i=this.el(),s=Rn(i),r=this.vertical();let a=dr(i,e);a=r?a.y:a.x,a=Ts(a,0,1),t.update(s,a,r)}vs(e)&&(this.checkMuted(),this.player_.volume(this.calculateDistance(e)))}checkMuted(){this.player_.muted()&&this.player_.muted(!1)}getPercent(){return this.player_.muted()?0:this.player_.volume()}stepForward(){this.checkMuted(),this.player_.volume(this.player_.volume()+.1)}stepBack(){this.checkMuted(),this.player_.volume(this.player_.volume()-.1)}updateARIAAttributes(e){const t=this.player_.muted()?0:this.volumeAsPercentage_();this.el_.setAttribute("aria-valuenow",t),this.el_.setAttribute("aria-valuetext",t+"%")}volumeAsPercentage_(){return Math.round(this.player_.volume()*100)}updateLastVolume_(){const e=this.player_.volume();this.one("sliderinactive",()=>{this.player_.volume()===0&&this.player_.lastVolume_(e)})}}Cr.prototype.options_={children:["volumeLevel"],barName:"volumeLevel"},!It&&!mi&&Cr.prototype.options_.children.splice(0,0,"mouseVolumeLevelDisplay"),Cr.prototype.playerEvent="volumechange",W.registerComponent("VolumeBar",Cr);class xu extends W{constructor(e,t={}){t.vertical=t.vertical||!1,(typeof t.volumeBar=="undefined"||wn(t.volumeBar))&&(t.volumeBar=t.volumeBar||{},t.volumeBar.vertical=t.vertical),super(e,t),yp(this,e),this.throttledHandleMouseMove=Ai(tt(this,this.handleMouseMove),Zt),this.handleMouseUpHandler_=i=>this.handleMouseUp(i),this.on("mousedown",i=>this.handleMouseDown(i)),this.on("touchstart",i=>this.handleMouseDown(i)),this.on("mousemove",i=>this.handleMouseMove(i)),this.on(this.volumeBar,["focus","slideractive"],()=>{this.volumeBar.addClass("vjs-slider-active"),this.addClass("vjs-slider-active"),this.trigger("slideractive")}),this.on(this.volumeBar,["blur","sliderinactive"],()=>{this.volumeBar.removeClass("vjs-slider-active"),this.removeClass("vjs-slider-active"),this.trigger("sliderinactive")})}createEl(){let e="vjs-volume-horizontal";return this.options_.vertical&&(e="vjs-volume-vertical"),super.createEl("div",{className:`vjs-volume-control vjs-control ${e}`})}handleMouseDown(e){const t=this.el_.ownerDocument;this.on(t,"mousemove",this.throttledHandleMouseMove),this.on(t,"touchmove",this.throttledHandleMouseMove),this.on(t,"mouseup",this.handleMouseUpHandler_),this.on(t,"touchend",this.handleMouseUpHandler_)}handleMouseUp(e){const t=this.el_.ownerDocument;this.off(t,"mousemove",this.throttledHandleMouseMove),this.off(t,"touchmove",this.throttledHandleMouseMove),this.off(t,"mouseup",this.handleMouseUpHandler_),this.off(t,"touchend",this.handleMouseUpHandler_)}handleMouseMove(e){this.volumeBar.handleMouseMove(e)}}xu.prototype.options_={children:["volumeBar"]},W.registerComponent("VolumeControl",xu);const Ep=function(n,e){e.tech_&&!e.tech_.featuresMuteControl&&n.addClass("vjs-hidden"),n.on(e,"loadstart",function(){e.tech_.featuresMuteControl?n.removeClass("vjs-hidden"):n.addClass("vjs-hidden")})};class Su extends $t{constructor(e,t){super(e,t),Ep(this,e),this.on(e,["loadstart","volumechange"],i=>this.update(i))}buildCSSClass(){return`vjs-mute-control ${super.buildCSSClass()}`}handleClick(e){const t=this.player_.volume(),i=this.player_.lastVolume_();if(t===0){const s=i<.1?.1:i;this.player_.volume(s),this.player_.muted(!1)}else this.player_.muted(!this.player_.muted())}update(e){this.updateIcon_(),this.updateControlText_()}updateIcon_(){const e=this.player_.volume();let t=3;this.setIcon("volume-high"),It&&this.player_.tech_&&this.player_.tech_.el_&&this.player_.muted(this.player_.tech_.el_.muted),e===0||this.player_.muted()?(this.setIcon("volume-mute"),t=0):e<.33?(this.setIcon("volume-low"),t=1):e<.67&&(this.setIcon("volume-medium"),t=2),ur(this.el_,[0,1,2,3].reduce((i,s)=>i+`${s?" ":""}vjs-vol-${s}`,"")),Zi(this.el_,`vjs-vol-${t}`)}updateControlText_(){const t=this.player_.muted()||this.player_.volume()===0?"Unmute":"Mute";this.controlText()!==t&&this.controlText(t)}}Su.prototype.controlText_="Mute",W.registerComponent("MuteToggle",Su);class ju extends W{constructor(e,t={}){typeof t.inline!="undefined"?t.inline=t.inline:t.inline=!0,(typeof t.volumeControl=="undefined"||wn(t.volumeControl))&&(t.volumeControl=t.volumeControl||{},t.volumeControl.vertical=!t.inline),super(e,t),this.handleKeyPressHandler_=i=>this.handleKeyPress(i),this.on(e,["loadstart"],i=>this.volumePanelState_(i)),this.on(this.muteToggle,"keyup",i=>this.handleKeyPress(i)),this.on(this.volumeControl,"keyup",i=>this.handleVolumeControlKeyUp(i)),this.on("keydown",i=>this.handleKeyPress(i)),this.on("mouseover",i=>this.handleMouseOver(i)),this.on("mouseout",i=>this.handleMouseOut(i)),this.on(this.volumeControl,["slideractive"],this.sliderActive_),this.on(this.volumeControl,["sliderinactive"],this.sliderInactive_)}sliderActive_(){this.addClass("vjs-slider-active")}sliderInactive_(){this.removeClass("vjs-slider-active")}volumePanelState_(){this.volumeControl.hasClass("vjs-hidden")&&this.muteToggle.hasClass("vjs-hidden")&&this.addClass("vjs-hidden"),this.volumeControl.hasClass("vjs-hidden")&&!this.muteToggle.hasClass("vjs-hidden")&&this.addClass("vjs-mute-toggle-only")}createEl(){let e="vjs-volume-panel-horizontal";return this.options_.inline||(e="vjs-volume-panel-vertical"),super.createEl("div",{className:`vjs-volume-panel vjs-control ${e}`})}dispose(){this.handleMouseOut(),super.dispose()}handleVolumeControlKeyUp(e){O().isEventKey(e,"Esc")&&this.muteToggle.focus()}handleMouseOver(e){this.addClass("vjs-hover"),Gt(I(),"keyup",this.handleKeyPressHandler_)}handleMouseOut(e){this.removeClass("vjs-hover"),jt(I(),"keyup",this.handleKeyPressHandler_)}handleKeyPress(e){O().isEventKey(e,"Esc")&&this.handleMouseOut()}}ju.prototype.options_={children:["muteToggle","volumeControl"]},W.registerComponent("VolumePanel",ju);class Tp extends $t{constructor(e,t){super(e,t),this.validOptions=[5,10,30],this.skipTime=this.getSkipForwardTime(),this.skipTime&&this.validOptions.includes(this.skipTime)?(this.setIcon(`forward-${this.skipTime}`),this.controlText(this.localize("Skip forward {1} seconds",[this.skipTime])),this.show()):this.hide()}getSkipForwardTime(){const e=this.options_.playerOptions;return e.controlBar&&e.controlBar.skipButtons&&e.controlBar.skipButtons.forward}buildCSSClass(){return`vjs-skip-forward-${this.getSkipForwardTime()} ${super.buildCSSClass()}`}handleClick(e){if(isNaN(this.player_.duration()))return;const t=this.player_.currentTime(),i=this.player_.liveTracker,s=i&&i.isLive()?i.seekableEnd():this.player_.duration();let r;t+this.skipTime<=s?r=t+this.skipTime:r=s,this.player_.currentTime(r)}handleLanguagechange(){this.controlText(this.localize("Skip forward {1} seconds",[this.skipTime]))}}W.registerComponent("SkipForward",Tp);class Bu extends $t{constructor(e,t){super(e,t),this.validOptions=[5,10,30],this.skipTime=this.getSkipBackwardTime(),this.skipTime&&this.validOptions.includes(this.skipTime)?(this.setIcon(`replay-${this.skipTime}`),this.controlText(this.localize("Skip backward {1} seconds",[this.skipTime])),this.show()):this.hide()}getSkipBackwardTime(){const e=this.options_.playerOptions;return e.controlBar&&e.controlBar.skipButtons&&e.controlBar.skipButtons.backward}buildCSSClass(){return`vjs-skip-backward-${this.getSkipBackwardTime()} ${super.buildCSSClass()}`}handleClick(e){const t=this.player_.currentTime(),i=this.player_.liveTracker,s=i&&i.isLive()&&i.seekableStart();let r;s&&t-this.skipTime<=s?r=s:t>=this.skipTime?r=t-this.skipTime:r=0,this.player_.currentTime(r)}handleLanguagechange(){this.controlText(this.localize("Skip backward {1} seconds",[this.skipTime]))}}Bu.prototype.controlText_="Skip Backward",W.registerComponent("SkipBackward",Bu);class wu extends W{constructor(e,t){super(e,t),t&&(this.menuButton_=t.menuButton),this.focusedChild_=-1,this.on("keydown",i=>this.handleKeyDown(i)),this.boundHandleBlur_=i=>this.handleBlur(i),this.boundHandleTapClick_=i=>this.handleTapClick(i)}addEventListenerForItem(e){e instanceof W&&(this.on(e,"blur",this.boundHandleBlur_),this.on(e,["tap","click"],this.boundHandleTapClick_))}removeEventListenerForItem(e){e instanceof W&&(this.off(e,"blur",this.boundHandleBlur_),this.off(e,["tap","click"],this.boundHandleTapClick_))}removeChild(e){typeof e=="string"&&(e=this.getChild(e)),this.removeEventListenerForItem(e),super.removeChild(e)}addItem(e){const t=this.addChild(e);t&&this.addEventListenerForItem(t)}createEl(){const e=this.options_.contentElType||"ul";this.contentEl_=Re(e,{className:"vjs-menu-content"}),this.contentEl_.setAttribute("role","menu");const t=super.createEl("div",{append:this.contentEl_,className:"vjs-menu"});return t.appendChild(this.contentEl_),Gt(t,"click",function(i){i.preventDefault(),i.stopImmediatePropagation()}),t}dispose(){this.contentEl_=null,this.boundHandleBlur_=null,this.boundHandleTapClick_=null,super.dispose()}handleBlur(e){const t=e.relatedTarget||I().activeElement;if(!this.children().some(i=>i.el()===t)){const i=this.menuButton_;i&&i.buttonPressed_&&t!==i.el().firstChild&&i.unpressButton()}}handleTapClick(e){if(this.menuButton_){this.menuButton_.unpressButton();const t=this.children();if(!Array.isArray(t))return;const i=t.filter(s=>s.el()===e.target)[0];if(!i)return;i.name()!=="CaptionSettingsMenuItem"&&this.menuButton_.focus()}}handleKeyDown(e){O().isEventKey(e,"Left")||O().isEventKey(e,"Down")?(e.preventDefault(),e.stopPropagation(),this.stepForward()):(O().isEventKey(e,"Right")||O().isEventKey(e,"Up"))&&(e.preventDefault(),e.stopPropagation(),this.stepBack())}stepForward(){let e=0;this.focusedChild_!==void 0&&(e=this.focusedChild_+1),this.focus(e)}stepBack(){let e=0;this.focusedChild_!==void 0&&(e=this.focusedChild_-1),this.focus(e)}focus(e=0){const t=this.children().slice();t.length&&t[0].hasClass("vjs-menu-title")&&t.shift(),t.length>0&&(e<0?e=0:e>=t.length&&(e=t.length-1),this.focusedChild_=e,t[e].el_.focus())}}W.registerComponent("Menu",wu);class so extends W{constructor(e,t={}){super(e,t),this.menuButton_=new $t(e,t),this.menuButton_.controlText(this.controlText_),this.menuButton_.el_.setAttribute("aria-haspopup","true");const i=$t.prototype.buildCSSClass();this.menuButton_.el_.className=this.buildCSSClass()+" "+i,this.menuButton_.removeClass("vjs-control"),this.addChild(this.menuButton_),this.update(),this.enabled_=!0;const s=r=>this.handleClick(r);this.handleMenuKeyUp_=r=>this.handleMenuKeyUp(r),this.on(this.menuButton_,"tap",s),this.on(this.menuButton_,"click",s),this.on(this.menuButton_,"keydown",r=>this.handleKeyDown(r)),this.on(this.menuButton_,"mouseenter",()=>{this.addClass("vjs-hover"),this.menu.show(),Gt(I(),"keyup",this.handleMenuKeyUp_)}),this.on("mouseleave",r=>this.handleMouseLeave(r)),this.on("keydown",r=>this.handleSubmenuKeyDown(r))}update(){const e=this.createMenu();this.menu&&(this.menu.dispose(),this.removeChild(this.menu)),this.menu=e,this.addChild(e),this.buttonPressed_=!1,this.menuButton_.el_.setAttribute("aria-expanded","false"),this.items&&this.items.length<=this.hideThreshold_?(this.hide(),this.menu.contentEl_.removeAttribute("role")):(this.show(),this.menu.contentEl_.setAttribute("role","menu"))}createMenu(){const e=new wu(this.player_,{menuButton:this});if(this.hideThreshold_=0,this.options_.title){const t=Re("li",{className:"vjs-menu-title",textContent:pt(this.options_.title),tabIndex:-1}),i=new W(this.player_,{el:t});e.addItem(i)}if(this.items=this.createItems(),this.items)for(let t=0;t<this.items.length;t++)e.addItem(this.items[t]);return e}createItems(){}createEl(){return super.createEl("div",{className:this.buildWrapperCSSClass()},{})}setIcon(e){super.setIcon(e,this.menuButton_.el_)}buildWrapperCSSClass(){let e="vjs-menu-button";this.options_.inline===!0?e+="-inline":e+="-popup";const t=$t.prototype.buildCSSClass();return`vjs-menu-button ${e} ${t} ${super.buildCSSClass()}`}buildCSSClass(){let e="vjs-menu-button";return this.options_.inline===!0?e+="-inline":e+="-popup",`vjs-menu-button ${e} ${super.buildCSSClass()}`}controlText(e,t=this.menuButton_.el()){return this.menuButton_.controlText(e,t)}dispose(){this.handleMouseLeave(),super.dispose()}handleClick(e){this.buttonPressed_?this.unpressButton():this.pressButton()}handleMouseLeave(e){this.removeClass("vjs-hover"),jt(I(),"keyup",this.handleMenuKeyUp_)}focus(){this.menuButton_.focus()}blur(){this.menuButton_.blur()}handleKeyDown(e){O().isEventKey(e,"Esc")||O().isEventKey(e,"Tab")?(this.buttonPressed_&&this.unpressButton(),O().isEventKey(e,"Tab")||(e.preventDefault(),this.menuButton_.focus())):(O().isEventKey(e,"Up")||O().isEventKey(e,"Down"))&&(this.buttonPressed_||(e.preventDefault(),this.pressButton()))}handleMenuKeyUp(e){(O().isEventKey(e,"Esc")||O().isEventKey(e,"Tab"))&&this.removeClass("vjs-hover")}handleSubmenuKeyPress(e){this.handleSubmenuKeyDown(e)}handleSubmenuKeyDown(e){(O().isEventKey(e,"Esc")||O().isEventKey(e,"Tab"))&&(this.buttonPressed_&&this.unpressButton(),O().isEventKey(e,"Tab")||(e.preventDefault(),this.menuButton_.focus()))}pressButton(){if(this.enabled_){if(this.buttonPressed_=!0,this.menu.show(),this.menu.lockShowing(),this.menuButton_.el_.setAttribute("aria-expanded","true"),It&&wl())return;this.menu.focus()}}unpressButton(){this.enabled_&&(this.buttonPressed_=!1,this.menu.unlockShowing(),this.menu.hide(),this.menuButton_.el_.setAttribute("aria-expanded","false"))}disable(){this.unpressButton(),this.enabled_=!1,this.addClass("vjs-disabled"),this.menuButton_.disable()}enable(){this.enabled_=!0,this.removeClass("vjs-disabled"),this.menuButton_.enable()}}W.registerComponent("MenuButton",so);class ro extends so{constructor(e,t){const i=t.tracks;if(super(e,t),this.items.length<=1&&this.hide(),!i)return;const s=tt(this,this.update);i.addEventListener("removetrack",s),i.addEventListener("addtrack",s),i.addEventListener("labelchange",s),this.player_.on("ready",s),this.player_.on("dispose",function(){i.removeEventListener("removetrack",s),i.removeEventListener("addtrack",s),i.removeEventListener("labelchange",s)})}}W.registerComponent("TrackButton",ro);const Cp=["Tab","Esc","Up","Down","Right","Left"];class Cs extends Er{constructor(e,t){super(e,t),this.selectable=t.selectable,this.isSelected_=t.selected||!1,this.multiSelectable=t.multiSelectable,this.selected(this.isSelected_),this.selectable?this.multiSelectable?this.el_.setAttribute("role","menuitemcheckbox"):this.el_.setAttribute("role","menuitemradio"):this.el_.setAttribute("role","menuitem")}createEl(e,t,i){this.nonIconControl=!0;const s=super.createEl("li",Object.assign({className:"vjs-menu-item",tabIndex:-1},t),i),r=Re("span",{className:"vjs-menu-item-text",textContent:this.localize(this.options_.label)});return this.player_.options_.experimentalSvgIcons?s.appendChild(r):s.replaceChild(r,s.querySelector(".vjs-icon-placeholder")),s}handleKeyDown(e){Cp.some(t=>O().isEventKey(e,t))||super.handleKeyDown(e)}handleClick(e){this.selected(!0)}selected(e){this.selectable&&(e?(this.addClass("vjs-selected"),this.el_.setAttribute("aria-checked","true"),this.controlText(", selected"),this.isSelected_=!0):(this.removeClass("vjs-selected"),this.el_.setAttribute("aria-checked","false"),this.controlText(""),this.isSelected_=!1))}}W.registerComponent("MenuItem",Cs);class xs extends Cs{constructor(e,t){const i=t.track,s=e.textTracks();t.label=i.label||i.language||"Unknown",t.selected=i.mode==="showing",super(e,t),this.track=i,this.kinds=(t.kinds||[t.kind||this.track.kind]).filter(Boolean);const r=(...l)=>{this.handleTracksChange.apply(this,l)},a=(...l)=>{this.handleSelectedLanguageChange.apply(this,l)};if(e.on(["loadstart","texttrackchange"],r),s.addEventListener("change",r),s.addEventListener("selectedlanguagechange",a),this.on("dispose",function(){e.off(["loadstart","texttrackchange"],r),s.removeEventListener("change",r),s.removeEventListener("selectedlanguagechange",a)}),s.onchange===void 0){let l;this.on(["tap","click"],function(){if(typeof A().Event!="object")try{l=new(A()).Event("change")}catch(h){}l||(l=I().createEvent("Event"),l.initEvent("change",!0,!0)),s.dispatchEvent(l)})}this.handleTracksChange()}handleClick(e){const t=this.track,i=this.player_.textTracks();if(super.handleClick(e),!!i)for(let s=0;s<i.length;s++){const r=i[s];this.kinds.indexOf(r.kind)!==-1&&(r===t?r.mode!=="showing"&&(r.mode="showing"):r.mode!=="disabled"&&(r.mode="disabled"))}}handleTracksChange(e){const t=this.track.mode==="showing";t!==this.isSelected_&&this.selected(t)}handleSelectedLanguageChange(e){if(this.track.mode==="showing"){const t=this.player_.cache_.selectedLanguage;if(t&&t.enabled&&t.language===this.track.language&&t.kind!==this.track.kind)return;this.player_.cache_.selectedLanguage={enabled:!0,language:this.track.language,kind:this.track.kind}}}dispose(){this.track=null,super.dispose()}}W.registerComponent("TextTrackMenuItem",xs);class Du extends xs{constructor(e,t){t.track={player:e,kind:t.kind,kinds:t.kinds,default:!1,mode:"disabled"},t.kinds||(t.kinds=[t.kind]),t.label?t.track.label=t.label:t.track.label=t.kinds.join(" and ")+" off",t.selectable=!0,t.multiSelectable=!1,super(e,t)}handleTracksChange(e){const t=this.player().textTracks();let i=!0;for(let s=0,r=t.length;s<r;s++){const a=t[s];if(this.options_.kinds.indexOf(a.kind)>-1&&a.mode==="showing"){i=!1;break}}i!==this.isSelected_&&this.selected(i)}handleSelectedLanguageChange(e){const t=this.player().textTracks();let i=!0;for(let s=0,r=t.length;s<r;s++){const a=t[s];if(["captions","descriptions","subtitles"].indexOf(a.kind)>-1&&a.mode==="showing"){i=!1;break}}i&&(this.player_.cache_.selectedLanguage={enabled:!1})}handleLanguagechange(){this.$(".vjs-menu-item-text").textContent=this.player_.localize(this.options_.label),super.handleLanguagechange()}}W.registerComponent("OffTextTrackMenuItem",Du);class Hn extends ro{constructor(e,t={}){t.tracks=e.textTracks(),super(e,t)}createItems(e=[],t=xs){let i;this.label_&&(i=`${this.label_} off`),e.push(new Du(this.player_,{kinds:this.kinds_,kind:this.kind_,label:i})),this.hideThreshold_+=1;const s=this.player_.textTracks();Array.isArray(this.kinds_)||(this.kinds_=[this.kind_]);for(let r=0;r<s.length;r++){const a=s[r];if(this.kinds_.indexOf(a.kind)>-1){const l=new t(this.player_,{track:a,kinds:this.kinds_,kind:this.kind_,selectable:!0,multiSelectable:!1});l.addClass(`vjs-${a.kind}-menu-item`),e.push(l)}}return e}}W.registerComponent("TextTrackButton",Hn);class ku extends Cs{constructor(e,t){const i=t.track,s=t.cue,r=e.currentTime();t.selectable=!0,t.multiSelectable=!1,t.label=s.text,t.selected=s.startTime<=r&&r<s.endTime,super(e,t),this.track=i,this.cue=s}handleClick(e){super.handleClick(),this.player_.currentTime(this.cue.startTime)}}W.registerComponent("ChaptersTrackMenuItem",ku);class ao extends Hn{constructor(e,t,i){super(e,t,i),this.setIcon("chapters"),this.selectCurrentItem_=()=>{this.items.forEach(s=>{s.selected(this.track_.activeCues[0]===s.cue)})}}buildCSSClass(){return`vjs-chapters-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-chapters-button ${super.buildWrapperCSSClass()}`}update(e){if(e&&e.track&&e.track.kind!=="chapters")return;const t=this.findChaptersTrack();t!==this.track_?(this.setTrack(t),super.update()):(!this.items||t&&t.cues&&t.cues.length!==this.items.length)&&super.update()}setTrack(e){if(this.track_!==e){if(this.updateHandler_||(this.updateHandler_=this.update.bind(this)),this.track_){const t=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);t&&t.removeEventListener("load",this.updateHandler_),this.track_.removeEventListener("cuechange",this.selectCurrentItem_),this.track_=null}if(this.track_=e,this.track_){this.track_.mode="hidden";const t=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);t&&t.addEventListener("load",this.updateHandler_),this.track_.addEventListener("cuechange",this.selectCurrentItem_)}}}findChaptersTrack(){const e=this.player_.textTracks()||[];for(let t=e.length-1;t>=0;t--){const i=e[t];if(i.kind===this.kind_)return i}}getMenuCaption(){return this.track_&&this.track_.label?this.track_.label:this.localize(pt(this.kind_))}createMenu(){return this.options_.title=this.getMenuCaption(),super.createMenu()}createItems(){const e=[];if(!this.track_)return e;const t=this.track_.cues;if(!t)return e;for(let i=0,s=t.length;i<s;i++){const r=t[i],a=new ku(this.player_,{track:this.track_,cue:r});e.push(a)}return e}}ao.prototype.kind_="chapters",ao.prototype.controlText_="Chapters",W.registerComponent("ChaptersButton",ao);class oo extends Hn{constructor(e,t,i){super(e,t,i),this.setIcon("audio-description");const s=e.textTracks(),r=tt(this,this.handleTracksChange);s.addEventListener("change",r),this.on("dispose",function(){s.removeEventListener("change",r)})}handleTracksChange(e){const t=this.player().textTracks();let i=!1;for(let s=0,r=t.length;s<r;s++){const a=t[s];if(a.kind!==this.kind_&&a.mode==="showing"){i=!0;break}}i?this.disable():this.enable()}buildCSSClass(){return`vjs-descriptions-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-descriptions-button ${super.buildWrapperCSSClass()}`}}oo.prototype.kind_="descriptions",oo.prototype.controlText_="Descriptions",W.registerComponent("DescriptionsButton",oo);class lo extends Hn{constructor(e,t,i){super(e,t,i),this.setIcon("subtitles")}buildCSSClass(){return`vjs-subtitles-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-subtitles-button ${super.buildWrapperCSSClass()}`}}lo.prototype.kind_="subtitles",lo.prototype.controlText_="Subtitles",W.registerComponent("SubtitlesButton",lo);class uo extends xs{constructor(e,t){t.track={player:e,kind:t.kind,label:t.kind+" settings",selectable:!1,default:!1,mode:"disabled"},t.selectable=!1,t.name="CaptionSettingsMenuItem",super(e,t),this.addClass("vjs-texttrack-settings"),this.controlText(", opens "+t.kind+" settings dialog")}handleClick(e){this.player().getChild("textTrackSettings").open()}handleLanguagechange(){this.$(".vjs-menu-item-text").textContent=this.player_.localize(this.options_.kind+" settings"),super.handleLanguagechange()}}W.registerComponent("CaptionSettingsMenuItem",uo);class co extends Hn{constructor(e,t,i){super(e,t,i),this.setIcon("captions")}buildCSSClass(){return`vjs-captions-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-captions-button ${super.buildWrapperCSSClass()}`}createItems(){const e=[];return!(this.player().tech_&&this.player().tech_.featuresNativeTextTracks)&&this.player().getChild("textTrackSettings")&&(e.push(new uo(this.player_,{kind:this.kind_})),this.hideThreshold_+=1),super.createItems(e)}}co.prototype.kind_="captions",co.prototype.controlText_="Captions",W.registerComponent("CaptionsButton",co);class Iu extends xs{createEl(e,t,i){const s=super.createEl(e,t,i),r=s.querySelector(".vjs-menu-item-text");return this.options_.track.kind==="captions"&&(this.player_.options_.experimentalSvgIcons?this.setIcon("captions",s):r.appendChild(Re("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),r.appendChild(Re("span",{className:"vjs-control-text",textContent:` ${this.localize("Captions")}`}))),s}}W.registerComponent("SubsCapsMenuItem",Iu);class ho extends Hn{constructor(e,t={}){super(e,t),this.label_="subtitles",this.setIcon("subtitles"),["en","en-us","en-ca","fr-ca"].indexOf(this.player_.language_)>-1&&(this.label_="captions",this.setIcon("captions")),this.menuButton_.controlText(pt(this.label_))}buildCSSClass(){return`vjs-subs-caps-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-subs-caps-button ${super.buildWrapperCSSClass()}`}createItems(){let e=[];return!(this.player().tech_&&this.player().tech_.featuresNativeTextTracks)&&this.player().getChild("textTrackSettings")&&(e.push(new uo(this.player_,{kind:this.label_})),this.hideThreshold_+=1),e=super.createItems(e,Iu),e}}ho.prototype.kinds_=["captions","subtitles"],ho.prototype.controlText_="Subtitles",W.registerComponent("SubsCapsButton",ho);class Pu extends Cs{constructor(e,t){const i=t.track,s=e.audioTracks();t.label=i.label||i.language||"Unknown",t.selected=i.enabled,super(e,t),this.track=i,this.addClass(`vjs-${i.kind}-menu-item`);const r=(...a)=>{this.handleTracksChange.apply(this,a)};s.addEventListener("change",r),this.on("dispose",()=>{s.removeEventListener("change",r)})}createEl(e,t,i){const s=super.createEl(e,t,i),r=s.querySelector(".vjs-menu-item-text");return["main-desc","description"].indexOf(this.options_.track.kind)>=0&&(r.appendChild(Re("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0})),r.appendChild(Re("span",{className:"vjs-control-text",textContent:" "+this.localize("Descriptions")}))),s}handleClick(e){if(super.handleClick(e),this.track.enabled=!0,this.player_.tech_.featuresNativeAudioTracks){const t=this.player_.audioTracks();for(let i=0;i<t.length;i++){const s=t[i];s!==this.track&&(s.enabled=s===this.track)}}}handleTracksChange(e){this.selected(this.track.enabled)}}W.registerComponent("AudioTrackMenuItem",Pu);class Lu extends ro{constructor(e,t={}){t.tracks=e.audioTracks(),super(e,t),this.setIcon("audio")}buildCSSClass(){return`vjs-audio-button ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-audio-button ${super.buildWrapperCSSClass()}`}createItems(e=[]){this.hideThreshold_=1;const t=this.player_.audioTracks();for(let i=0;i<t.length;i++){const s=t[i];e.push(new Pu(this.player_,{track:s,selectable:!0,multiSelectable:!1}))}return e}}Lu.prototype.controlText_="Audio Track",W.registerComponent("AudioTrackButton",Lu);class fo extends Cs{constructor(e,t){const i=t.rate,s=parseFloat(i,10);t.label=i,t.selected=s===e.playbackRate(),t.selectable=!0,t.multiSelectable=!1,super(e,t),this.label=i,this.rate=s,this.on(e,"ratechange",r=>this.update(r))}handleClick(e){super.handleClick(),this.player().playbackRate(this.rate)}update(e){this.selected(this.player().playbackRate()===this.rate)}}fo.prototype.contentElType="button",W.registerComponent("PlaybackRateMenuItem",fo);class Ou extends so{constructor(e,t){super(e,t),this.menuButton_.el_.setAttribute("aria-describedby",this.labelElId_),this.updateVisibility(),this.updateLabel(),this.on(e,"loadstart",i=>this.updateVisibility(i)),this.on(e,"ratechange",i=>this.updateLabel(i)),this.on(e,"playbackrateschange",i=>this.handlePlaybackRateschange(i))}createEl(){const e=super.createEl();return this.labelElId_="vjs-playback-rate-value-label-"+this.id_,this.labelEl_=Re("div",{className:"vjs-playback-rate-value",id:this.labelElId_,textContent:"1x"}),e.appendChild(this.labelEl_),e}dispose(){this.labelEl_=null,super.dispose()}buildCSSClass(){return`vjs-playback-rate ${super.buildCSSClass()}`}buildWrapperCSSClass(){return`vjs-playback-rate ${super.buildWrapperCSSClass()}`}createItems(){const e=this.playbackRates(),t=[];for(let i=e.length-1;i>=0;i--)t.push(new fo(this.player(),{rate:e[i]+"x"}));return t}handlePlaybackRateschange(e){this.update()}playbackRates(){const e=this.player();return e.playbackRates&&e.playbackRates()||[]}playbackRateSupported(){return this.player().tech_&&this.player().tech_.featuresPlaybackRate&&this.playbackRates()&&this.playbackRates().length>0}updateVisibility(e){this.playbackRateSupported()?this.removeClass("vjs-hidden"):this.addClass("vjs-hidden")}updateLabel(e){this.playbackRateSupported()&&(this.labelEl_.textContent=this.player().playbackRate()+"x")}}Ou.prototype.controlText_="Playback Rate",W.registerComponent("PlaybackRateMenuButton",Ou);class Ru extends W{buildCSSClass(){return`vjs-spacer ${super.buildCSSClass()}`}createEl(e="div",t={},i={}){return t.className||(t.className=this.buildCSSClass()),super.createEl(e,t,i)}}W.registerComponent("Spacer",Ru);class xp extends Ru{buildCSSClass(){return`vjs-custom-control-spacer ${super.buildCSSClass()}`}createEl(){return super.createEl("div",{className:this.buildCSSClass(),textContent:"\xA0"})}}W.registerComponent("CustomControlSpacer",xp);class Nu extends W{createEl(){return super.createEl("div",{className:"vjs-control-bar",dir:"ltr"})}}Nu.prototype.options_={children:["playToggle","skipBackward","skipForward","volumePanel","currentTimeDisplay","timeDivider","durationDisplay","progressControl","liveDisplay","seekToLive","remainingTimeDisplay","customControlSpacer","playbackRateMenuButton","chaptersButton","descriptionsButton","subsCapsButton","audioTrackButton","pictureInPictureToggle","fullscreenToggle"]},W.registerComponent("ControlBar",Nu);class Mu extends Un{constructor(e,t){super(e,t),this.on(e,"error",i=>this.open(i))}buildCSSClass(){return`vjs-error-display ${super.buildCSSClass()}`}content(){const e=this.player().error();return e?this.localize(e.message):""}}Mu.prototype.options_=Object.assign({},Un.prototype.options_,{pauseOnOpen:!1,fillAlways:!0,temporary:!1,uncloseable:!0}),W.registerComponent("ErrorDisplay",Mu);const po="vjs-text-track-settings",Uu=["#000","Black"],Fu=["#00F","Blue"],Vu=["#0FF","Cyan"],zu=["#0F0","Green"],Hu=["#F0F","Magenta"],qu=["#F00","Red"],Wu=["#FFF","White"],Gu=["#FF0","Yellow"],mo=["1","Opaque"],go=["0.5","Semi-Transparent"],$u=["0","Transparent"],rn={backgroundColor:{selector:".vjs-bg-color > select",id:"captions-background-color-%s",label:"Color",options:[Uu,Wu,qu,zu,Fu,Gu,Hu,Vu]},backgroundOpacity:{selector:".vjs-bg-opacity > select",id:"captions-background-opacity-%s",label:"Opacity",options:[mo,go,$u]},color:{selector:".vjs-text-color > select",id:"captions-foreground-color-%s",label:"Color",options:[Wu,Uu,qu,zu,Fu,Gu,Hu,Vu]},edgeStyle:{selector:".vjs-edge-style > select",id:"%s",label:"Text Edge Style",options:[["none","None"],["raised","Raised"],["depressed","Depressed"],["uniform","Uniform"],["dropshadow","Drop shadow"]]},fontFamily:{selector:".vjs-font-family > select",id:"captions-font-family-%s",label:"Font Family",options:[["proportionalSansSerif","Proportional Sans-Serif"],["monospaceSansSerif","Monospace Sans-Serif"],["proportionalSerif","Proportional Serif"],["monospaceSerif","Monospace Serif"],["casual","Casual"],["script","Script"],["small-caps","Small Caps"]]},fontPercent:{selector:".vjs-font-percent > select",id:"captions-font-size-%s",label:"Font Size",options:[["0.50","50%"],["0.75","75%"],["1.00","100%"],["1.25","125%"],["1.50","150%"],["1.75","175%"],["2.00","200%"],["3.00","300%"],["4.00","400%"]],default:2,parser:n=>n==="1.00"?null:Number(n)},textOpacity:{selector:".vjs-text-opacity > select",id:"captions-foreground-opacity-%s",label:"Opacity",options:[mo,go]},windowColor:{selector:".vjs-window-color > select",id:"captions-window-color-%s",label:"Color"},windowOpacity:{selector:".vjs-window-opacity > select",id:"captions-window-opacity-%s",label:"Opacity",options:[$u,go,mo]}};rn.windowColor.options=rn.backgroundColor.options;function Xu(n,e){if(e&&(n=e(n)),n&&n!=="none")return n}function Sp(n,e){const t=n.options[n.options.selectedIndex].value;return Xu(t,e)}function jp(n,e,t){if(e){for(let i=0;i<n.options.length;i++)if(Xu(n.options[i].value,t)===e){n.selectedIndex=i;break}}}class Bp extends Un{constructor(e,t){t.temporary=!1,super(e,t),this.updateDisplay=this.updateDisplay.bind(this),this.fill(),this.hasBeenOpened_=this.hasBeenFilled_=!0,this.endDialog=Re("p",{className:"vjs-control-text",textContent:this.localize("End of dialog window.")}),this.el().appendChild(this.endDialog),this.setDefaults(),t.persistTextTrackSettings===void 0&&(this.options_.persistTextTrackSettings=this.options_.playerOptions.persistTextTrackSettings),this.on(this.$(".vjs-done-button"),"click",()=>{this.saveSettings(),this.close()}),this.on(this.$(".vjs-default-button"),"click",()=>{this.setDefaults(),this.updateDisplay()}),Bn(rn,i=>{this.on(this.$(i.selector),"change",this.updateDisplay)}),this.options_.persistTextTrackSettings&&this.restoreSettings()}dispose(){this.endDialog=null,super.dispose()}createElSelect_(e,t="",i="label"){const s=rn[e],r=s.id.replace("%s",this.id_),a=[t,r].join(" ").trim();return[`<${i} id="${r}" class="${i==="label"?"vjs-label":""}">`,this.localize(s.label),`</${i}>`,`<select aria-labelledby="${a}">`].concat(s.options.map(l=>{const h=r+"-"+l[1].replace(/\W+/g,"");return[`<option id="${h}" value="${l[0]}" `,`aria-labelledby="${a} ${h}">`,this.localize(l[1]),"</option>"].join("")})).concat("</select>").join("")}createElFgColor_(){const e=`captions-text-legend-${this.id_}`;return['<fieldset class="vjs-fg vjs-track-setting">',`<legend id="${e}">`,this.localize("Text"),"</legend>",'<span class="vjs-text-color">',this.createElSelect_("color",e),"</span>",'<span class="vjs-text-opacity vjs-opacity">',this.createElSelect_("textOpacity",e),"</span>","</fieldset>"].join("")}createElBgColor_(){const e=`captions-background-${this.id_}`;return['<fieldset class="vjs-bg vjs-track-setting">',`<legend id="${e}">`,this.localize("Text Background"),"</legend>",'<span class="vjs-bg-color">',this.createElSelect_("backgroundColor",e),"</span>",'<span class="vjs-bg-opacity vjs-opacity">',this.createElSelect_("backgroundOpacity",e),"</span>","</fieldset>"].join("")}createElWinColor_(){const e=`captions-window-${this.id_}`;return['<fieldset class="vjs-window vjs-track-setting">',`<legend id="${e}">`,this.localize("Caption Area Background"),"</legend>",'<span class="vjs-window-color">',this.createElSelect_("windowColor",e),"</span>",'<span class="vjs-window-opacity vjs-opacity">',this.createElSelect_("windowOpacity",e),"</span>","</fieldset>"].join("")}createElColors_(){return Re("div",{className:"vjs-track-settings-colors",innerHTML:[this.createElFgColor_(),this.createElBgColor_(),this.createElWinColor_()].join("")})}createElFont_(){return Re("div",{className:"vjs-track-settings-font",innerHTML:['<fieldset class="vjs-font-percent vjs-track-setting">',this.createElSelect_("fontPercent","","legend"),"</fieldset>",'<fieldset class="vjs-edge-style vjs-track-setting">',this.createElSelect_("edgeStyle","","legend"),"</fieldset>",'<fieldset class="vjs-font-family vjs-track-setting">',this.createElSelect_("fontFamily","","legend"),"</fieldset>"].join("")})}createElControls_(){const e=this.localize("restore all settings to the default values");return Re("div",{className:"vjs-track-settings-controls",innerHTML:[`<button type="button" class="vjs-default-button" title="${e}">`,this.localize("Reset"),`<span class="vjs-control-text"> ${e}</span>`,"</button>",`<button type="button" class="vjs-done-button">${this.localize("Done")}</button>`].join("")})}content(){return[this.createElColors_(),this.createElFont_(),this.createElControls_()]}label(){return this.localize("Caption Settings Dialog")}description(){return this.localize("Beginning of dialog window. Escape will cancel and close the window.")}buildCSSClass(){return super.buildCSSClass()+" vjs-text-track-settings"}getValues(){return El(rn,(e,t,i)=>{const s=Sp(this.$(t.selector),t.parser);return s!==void 0&&(e[i]=s),e},{})}setValues(e){Bn(rn,(t,i)=>{jp(this.$(t.selector),e[i],t.parser)})}setDefaults(){Bn(rn,e=>{const t=e.hasOwnProperty("default")?e.default:0;this.$(e.selector).selectedIndex=t})}restoreSettings(){let e;try{e=JSON.parse(A().localStorage.getItem(po))}catch(t){Me.warn(t)}e&&this.setValues(e)}saveSettings(){if(!this.options_.persistTextTrackSettings)return;const e=this.getValues();try{Object.keys(e).length?A().localStorage.setItem(po,JSON.stringify(e)):A().localStorage.removeItem(po)}catch(t){Me.warn(t)}}updateDisplay(){const e=this.player_.getChild("textTrackDisplay");e&&e.updateDisplay()}conditionalBlur_(){this.previouslyActiveEl_=null;const e=this.player_.controlBar,t=e&&e.subsCapsButton,i=e&&e.captionsButton;t?t.focus():i&&i.focus()}handleLanguagechange(){this.fill()}}W.registerComponent("TextTrackSettings",Bp);class wp extends W{constructor(e,t){let i=t.ResizeObserver||A().ResizeObserver;t.ResizeObserver===null&&(i=!1);const s=et({createEl:!i,reportTouchActivity:!1},t);super(e,s),this.ResizeObserver=t.ResizeObserver||A().ResizeObserver,this.loadListener_=null,this.resizeObserver_=null,this.debouncedHandler_=Gl(()=>{this.resizeHandler()},100,!1,this),i?(this.resizeObserver_=new this.ResizeObserver(this.debouncedHandler_),this.resizeObserver_.observe(e.el())):(this.loadListener_=()=>{if(!this.el_||!this.el_.contentWindow)return;const r=this.debouncedHandler_;let a=this.unloadListener_=function(){jt(this,"resize",r),jt(this,"unload",a),a=null};Gt(this.el_.contentWindow,"unload",a),Gt(this.el_.contentWindow,"resize",r)},this.one("load",this.loadListener_))}createEl(){return super.createEl("iframe",{className:"vjs-resize-manager",tabIndex:-1,title:this.localize("No content")},{"aria-hidden":"true"})}resizeHandler(){!this.player_||!this.player_.trigger||this.player_.trigger("playerresize")}dispose(){this.debouncedHandler_&&this.debouncedHandler_.cancel(),this.resizeObserver_&&(this.player_.el()&&this.resizeObserver_.unobserve(this.player_.el()),this.resizeObserver_.disconnect()),this.loadListener_&&this.off("load",this.loadListener_),this.el_&&this.el_.contentWindow&&this.unloadListener_&&this.unloadListener_.call(this.el_.contentWindow),this.ResizeObserver=null,this.resizeObserver=null,this.debouncedHandler_=null,this.loadListener_=null,super.dispose()}}W.registerComponent("ResizeManager",wp);const Dp={trackingThreshold:20,liveTolerance:15};class kp extends W{constructor(e,t){const i=et(Dp,t,{createEl:!1});super(e,i),this.trackLiveHandler_=()=>this.trackLive_(),this.handlePlay_=s=>this.handlePlay(s),this.handleFirstTimeupdate_=s=>this.handleFirstTimeupdate(s),this.handleSeeked_=s=>this.handleSeeked(s),this.seekToLiveEdge_=s=>this.seekToLiveEdge(s),this.reset_(),this.on(this.player_,"durationchange",s=>this.handleDurationchange(s)),this.on(this.player_,"canplay",()=>this.toggleTracking())}trackLive_(){const e=this.player_.seekable();if(!e||!e.length)return;const t=Number(A().performance.now().toFixed(4)),i=this.lastTime_===-1?0:(t-this.lastTime_)/1e3;this.lastTime_=t,this.pastSeekEnd_=this.pastSeekEnd()+i;const s=this.liveCurrentTime(),r=this.player_.currentTime();let a=this.player_.paused()||this.seekedBehindLive_||Math.abs(s-r)>this.options_.liveTolerance;(!this.timeupdateSeen_||s===1/0)&&(a=!1),a!==this.behindLiveEdge_&&(this.behindLiveEdge_=a,this.trigger("liveedgechange"))}handleDurationchange(){this.toggleTracking()}toggleTracking(){this.player_.duration()===1/0&&this.liveWindow()>=this.options_.trackingThreshold?(this.player_.options_.liveui&&this.player_.addClass("vjs-liveui"),this.startTracking()):(this.player_.removeClass("vjs-liveui"),this.stopTracking())}startTracking(){this.isTracking()||(this.timeupdateSeen_||(this.timeupdateSeen_=this.player_.hasStarted()),this.trackingInterval_=this.setInterval(this.trackLiveHandler_,Zt),this.trackLive_(),this.on(this.player_,["play","pause"],this.trackLiveHandler_),this.timeupdateSeen_?this.on(this.player_,"seeked",this.handleSeeked_):(this.one(this.player_,"play",this.handlePlay_),this.one(this.player_,"timeupdate",this.handleFirstTimeupdate_)))}handleFirstTimeupdate(){this.timeupdateSeen_=!0,this.on(this.player_,"seeked",this.handleSeeked_)}handleSeeked(){const e=Math.abs(this.liveCurrentTime()-this.player_.currentTime());this.seekedBehindLive_=this.nextSeekedFromUser_&&e>2,this.nextSeekedFromUser_=!1,this.trackLive_()}handlePlay(){this.one(this.player_,"timeupdate",this.seekToLiveEdge_)}reset_(){this.lastTime_=-1,this.pastSeekEnd_=0,this.lastSeekEnd_=-1,this.behindLiveEdge_=!0,this.timeupdateSeen_=!1,this.seekedBehindLive_=!1,this.nextSeekedFromUser_=!1,this.clearInterval(this.trackingInterval_),this.trackingInterval_=null,this.off(this.player_,["play","pause"],this.trackLiveHandler_),this.off(this.player_,"seeked",this.handleSeeked_),this.off(this.player_,"play",this.handlePlay_),this.off(this.player_,"timeupdate",this.handleFirstTimeupdate_),this.off(this.player_,"timeupdate",this.seekToLiveEdge_)}nextSeekedFromUser(){this.nextSeekedFromUser_=!0}stopTracking(){this.isTracking()&&(this.reset_(),this.trigger("liveedgechange"))}seekableEnd(){const e=this.player_.seekable(),t=[];let i=e?e.length:0;for(;i--;)t.push(e.end(i));return t.length?t.sort()[t.length-1]:1/0}seekableStart(){const e=this.player_.seekable(),t=[];let i=e?e.length:0;for(;i--;)t.push(e.start(i));return t.length?t.sort()[0]:0}liveWindow(){const e=this.liveCurrentTime();return e===1/0?0:e-this.seekableStart()}isLive(){return this.isTracking()}atLiveEdge(){return!this.behindLiveEdge()}liveCurrentTime(){return this.pastSeekEnd()+this.seekableEnd()}pastSeekEnd(){const e=this.seekableEnd();return this.lastSeekEnd_!==-1&&e!==this.lastSeekEnd_&&(this.pastSeekEnd_=0),this.lastSeekEnd_=e,this.pastSeekEnd_}behindLiveEdge(){return this.behindLiveEdge_}isTracking(){return typeof this.trackingInterval_=="number"}seekToLiveEdge(){this.seekedBehindLive_=!1,!this.atLiveEdge()&&(this.nextSeekedFromUser_=!1,this.player_.currentTime(this.liveCurrentTime()))}dispose(){this.stopTracking(),super.dispose()}}W.registerComponent("LiveTracker",kp);class Ip extends W{constructor(e,t){super(e,t),this.on("statechanged",i=>this.updateDom_()),this.updateDom_()}createEl(){return this.els={title:Re("div",{className:"vjs-title-bar-title",id:`vjs-title-bar-title-${vi()}`}),description:Re("div",{className:"vjs-title-bar-description",id:`vjs-title-bar-description-${vi()}`})},Re("div",{className:"vjs-title-bar"},{},Tl(this.els))}updateDom_(){const e=this.player_.tech_,t=e&&e.el_,i={title:"aria-labelledby",description:"aria-describedby"};["title","description"].forEach(s=>{const r=this.state[s],a=this.els[s],l=i[s];hr(a),r&&Vi(a,r),t&&(t.removeAttribute(l),r&&t.setAttribute(l,a.id))}),this.state.title||this.state.description?this.show():this.hide()}update(e){this.setState(e)}dispose(){const e=this.player_.tech_,t=e&&e.el_;t&&(t.removeAttribute("aria-labelledby"),t.removeAttribute("aria-describedby")),super.dispose(),this.els=null}}W.registerComponent("TitleBar",Ip);const vo=n=>{const e=n.el();if(e.hasAttribute("src"))return n.triggerSourceset(e.src),!0;const t=n.$$("source"),i=[];let s="";if(!t.length)return!1;for(let r=0;r<t.length;r++){const a=t[r].src;a&&i.indexOf(a)===-1&&i.push(a)}return i.length?(i.length===1&&(s=i[0]),n.triggerSourceset(s),!0):!1},Pp=Object.defineProperty({},"innerHTML",{get(){return this.cloneNode(!0).innerHTML},set(n){const e=I().createElement(this.nodeName.toLowerCase());e.innerHTML=n;const t=I().createDocumentFragment();for(;e.childNodes.length;)t.appendChild(e.childNodes[0]);return this.innerText="",A().Element.prototype.appendChild.call(this,t),this.innerHTML}}),Yu=(n,e)=>{let t={};for(let i=0;i<n.length&&(t=Object.getOwnPropertyDescriptor(n[i],e),!(t&&t.set&&t.get));i++);return t.enumerable=!0,t.configurable=!0,t},Lp=n=>Yu([n.el(),A().HTMLMediaElement.prototype,A().Element.prototype,Pp],"innerHTML"),Ku=function(n){const e=n.el();if(e.resetSourceWatch_)return;const t={},i=Lp(n),s=r=>(...a)=>{const l=r.apply(e,a);return vo(n),l};["append","appendChild","insertAdjacentHTML"].forEach(r=>{e[r]&&(t[r]=e[r],e[r]=s(t[r]))}),Object.defineProperty(e,"innerHTML",et(i,{set:s(i.set)})),e.resetSourceWatch_=()=>{e.resetSourceWatch_=null,Object.keys(t).forEach(r=>{e[r]=t[r]}),Object.defineProperty(e,"innerHTML",i)},n.one("sourceset",e.resetSourceWatch_)},Op=Object.defineProperty({},"src",{get(){return this.hasAttribute("src")?ru(A().Element.prototype.getAttribute.call(this,"src")):""},set(n){return A().Element.prototype.setAttribute.call(this,"src",n),n}}),Rp=n=>Yu([n.el(),A().HTMLMediaElement.prototype,Op],"src"),Np=function(n){if(!n.featuresSourceset)return;const e=n.el();if(e.resetSourceset_)return;const t=Rp(n),i=e.setAttribute,s=e.load;Object.defineProperty(e,"src",et(t,{set:r=>{const a=t.set.call(e,r);return n.triggerSourceset(e.src),a}})),e.setAttribute=(r,a)=>{const l=i.call(e,r,a);return/src/i.test(r)&&n.triggerSourceset(e.src),l},e.load=()=>{const r=s.call(e);return vo(n)||(n.triggerSourceset(""),Ku(n)),r},e.currentSrc?n.triggerSourceset(e.currentSrc):vo(n)||Ku(n),e.resetSourceset_=()=>{e.resetSourceset_=null,e.load=s,e.setAttribute=i,Object.defineProperty(e,"src",t),e.resetSourceWatch_&&e.resetSourceWatch_()}};class Ae extends Oe{constructor(e,t){super(e,t);const i=e.source;let s=!1;if(this.featuresVideoFrameCallback=this.featuresVideoFrameCallback&&this.el_.tagName==="VIDEO",i&&(this.el_.currentSrc!==i.src||e.tag&&e.tag.initNetworkState_===3)?this.setSource(i):this.handleLateInit_(this.el_),e.enableSourceset&&this.setupSourcesetHandling_(),this.isScrubbing_=!1,this.el_.hasChildNodes()){const r=this.el_.childNodes;let a=r.length;const l=[];for(;a--;){const h=r[a];h.nodeName.toLowerCase()==="track"&&(this.featuresNativeTextTracks?(this.remoteTextTrackEls().addTrackElement_(h),this.remoteTextTracks().addTrack(h.track),this.textTracks().addTrack(h.track),!s&&!this.el_.hasAttribute("crossorigin")&&yr(h.src)&&(s=!0)):l.push(h))}for(let h=0;h<l.length;h++)this.el_.removeChild(l[h])}this.proxyNativeTracks_(),this.featuresNativeTextTracks&&s&&Me.warn(`Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.
This may prevent text tracks from loading.`),this.restoreMetadataTracksInIOSNativePlayer_(),(ps||or)&&e.nativeControlsForTouch===!0&&this.setControls(!0),this.proxyWebkitFullscreen_(),this.triggerReady()}dispose(){this.el_&&this.el_.resetSourceset_&&this.el_.resetSourceset_(),Ae.disposeMediaElement(this.el_),this.options_=null,super.dispose()}setupSourcesetHandling_(){Np(this)}restoreMetadataTracksInIOSNativePlayer_(){const e=this.textTracks();let t;const i=()=>{t=[];for(let r=0;r<e.length;r++){const a=e[r];a.kind==="metadata"&&t.push({track:a,storedMode:a.mode})}};i(),e.addEventListener("change",i),this.on("dispose",()=>e.removeEventListener("change",i));const s=()=>{for(let r=0;r<t.length;r++){const a=t[r];a.track.mode==="disabled"&&a.track.mode!==a.storedMode&&(a.track.mode=a.storedMode)}e.removeEventListener("change",s)};this.on("webkitbeginfullscreen",()=>{e.removeEventListener("change",i),e.removeEventListener("change",s),e.addEventListener("change",s)}),this.on("webkitendfullscreen",()=>{e.removeEventListener("change",i),e.addEventListener("change",i),e.removeEventListener("change",s)})}overrideNative_(e,t){if(t!==this[`featuresNative${e}Tracks`])return;const i=e.toLowerCase();this[`${i}TracksListeners_`]&&Object.keys(this[`${i}TracksListeners_`]).forEach(s=>{this.el()[`${i}Tracks`].removeEventListener(s,this[`${i}TracksListeners_`][s])}),this[`featuresNative${e}Tracks`]=!t,this[`${i}TracksListeners_`]=null,this.proxyNativeTracksForType_(i)}overrideNativeAudioTracks(e){this.overrideNative_("Audio",e)}overrideNativeVideoTracks(e){this.overrideNative_("Video",e)}proxyNativeTracksForType_(e){const t=ti[e],i=this.el()[t.getterName],s=this[t.getterName]();if(!this[`featuresNative${t.capitalName}Tracks`]||!i||!i.addEventListener)return;const r={change:l=>{const h={type:"change",target:s,currentTarget:s,srcElement:s};s.trigger(h),e==="text"&&this[Vn.remoteText.getterName]().trigger(h)},addtrack(l){s.addTrack(l.track)},removetrack(l){s.removeTrack(l.track)}},a=function(){const l=[];for(let h=0;h<s.length;h++){let m=!1;for(let g=0;g<i.length;g++)if(i[g]===s[h]){m=!0;break}m||l.push(s[h])}for(;l.length;)s.removeTrack(l.shift())};this[t.getterName+"Listeners_"]=r,Object.keys(r).forEach(l=>{const h=r[l];i.addEventListener(l,h),this.on("dispose",m=>i.removeEventListener(l,h))}),this.on("loadstart",a),this.on("dispose",l=>this.off("loadstart",a))}proxyNativeTracks_(){ti.names.forEach(e=>{this.proxyNativeTracksForType_(e)})}createEl(){let e=this.options_.tag;if(!e||!(this.options_.playerElIngest||this.movingMediaElementInDOM)){if(e){const i=e.cloneNode(!0);e.parentNode&&e.parentNode.insertBefore(i,e),Ae.disposeMediaElement(e),e=i}else{e=I().createElement("video");const i=this.options_.tag&&zi(this.options_.tag),s=et({},i);(!ps||this.options_.nativeControlsForTouch!==!0)&&delete s.controls,Il(e,Object.assign(s,{id:this.options_.techId,class:"vjs-tech"}))}e.playerId=this.options_.playerId}typeof this.options_.preload!="undefined"&&On(e,"preload",this.options_.preload),this.options_.disablePictureInPicture!==void 0&&(e.disablePictureInPicture=this.options_.disablePictureInPicture);const t=["loop","muted","playsinline","autoplay"];for(let i=0;i<t.length;i++){const s=t[i],r=this.options_[s];typeof r!="undefined"&&(r?On(e,s,s):cr(e,s),e[s]=r)}return e}handleLateInit_(e){if(e.networkState===0||e.networkState===3)return;if(e.readyState===0){let i=!1;const s=function(){i=!0};this.on("loadstart",s);const r=function(){i||this.trigger("loadstart")};this.on("loadedmetadata",r),this.ready(function(){this.off("loadstart",s),this.off("loadedmetadata",r),i||this.trigger("loadstart")});return}const t=["loadstart"];t.push("loadedmetadata"),e.readyState>=2&&t.push("loadeddata"),e.readyState>=3&&t.push("canplay"),e.readyState>=4&&t.push("canplaythrough"),this.ready(function(){t.forEach(function(i){this.trigger(i)},this)})}setScrubbing(e){this.isScrubbing_=e}scrubbing(){return this.isScrubbing_}setCurrentTime(e){try{this.isScrubbing_&&this.el_.fastSeek&&lr?this.el_.fastSeek(e):this.el_.currentTime=e}catch(t){Me(t,"Video is not ready. (Video.js)")}}duration(){if(this.el_.duration===1/0&&mi&&gi&&this.el_.currentTime===0){const e=()=>{this.el_.currentTime>0&&(this.el_.duration===1/0&&this.trigger("durationchange"),this.off("timeupdate",e))};return this.on("timeupdate",e),NaN}return this.el_.duration||NaN}width(){return this.el_.offsetWidth}height(){return this.el_.offsetHeight}proxyWebkitFullscreen_(){if(!("webkitDisplayingFullscreen"in this.el_))return;const e=function(){this.trigger("fullscreenchange",{isFullscreen:!1}),this.el_.controls&&!this.options_.nativeControlsForTouch&&this.controls()&&(this.el_.controls=!1)},t=function(){"webkitPresentationMode"in this.el_&&this.el_.webkitPresentationMode!=="picture-in-picture"&&(this.one("webkitendfullscreen",e),this.trigger("fullscreenchange",{isFullscreen:!0,nativeIOSFullscreen:!0}))};this.on("webkitbeginfullscreen",t),this.on("dispose",()=>{this.off("webkitbeginfullscreen",t),this.off("webkitendfullscreen",e)})}supportsFullScreen(){return typeof this.el_.webkitEnterFullScreen=="function"}enterFullScreen(){const e=this.el_;if(e.paused&&e.networkState<=e.HAVE_METADATA)_i(this.el_.play()),this.setTimeout(function(){e.pause();try{e.webkitEnterFullScreen()}catch(t){this.trigger("fullscreenerror",t)}},0);else try{e.webkitEnterFullScreen()}catch(t){this.trigger("fullscreenerror",t)}}exitFullScreen(){if(!this.el_.webkitDisplayingFullscreen){this.trigger("fullscreenerror",new Error("The video is not fullscreen"));return}this.el_.webkitExitFullScreen()}requestPictureInPicture(){return this.el_.requestPictureInPicture()}requestVideoFrameCallback(e){return this.featuresVideoFrameCallback&&!this.el_.webkitKeys?this.el_.requestVideoFrameCallback(e):super.requestVideoFrameCallback(e)}cancelVideoFrameCallback(e){this.featuresVideoFrameCallback&&!this.el_.webkitKeys?this.el_.cancelVideoFrameCallback(e):super.cancelVideoFrameCallback(e)}src(e){if(e===void 0)return this.el_.src;this.setSrc(e)}reset(){Ae.resetMediaElement(this.el_)}currentSrc(){return this.currentSource_?this.currentSource_.src:this.el_.currentSrc}setControls(e){this.el_.controls=!!e}addTextTrack(e,t,i){return this.featuresNativeTextTracks?this.el_.addTextTrack(e,t,i):super.addTextTrack(e,t,i)}createRemoteTextTrack(e){if(!this.featuresNativeTextTracks)return super.createRemoteTextTrack(e);const t=I().createElement("track");return e.kind&&(t.kind=e.kind),e.label&&(t.label=e.label),(e.language||e.srclang)&&(t.srclang=e.language||e.srclang),e.default&&(t.default=e.default),e.id&&(t.id=e.id),e.src&&(t.src=e.src),t}addRemoteTextTrack(e,t){const i=super.addRemoteTextTrack(e,t);return this.featuresNativeTextTracks&&this.el().appendChild(i),i}removeRemoteTextTrack(e){if(super.removeRemoteTextTrack(e),this.featuresNativeTextTracks){const t=this.$$("track");let i=t.length;for(;i--;)(e===t[i]||e===t[i].track)&&this.el().removeChild(t[i])}}getVideoPlaybackQuality(){if(typeof this.el().getVideoPlaybackQuality=="function")return this.el().getVideoPlaybackQuality();const e={};return typeof this.el().webkitDroppedFrameCount!="undefined"&&typeof this.el().webkitDecodedFrameCount!="undefined"&&(e.droppedVideoFrames=this.el().webkitDroppedFrameCount,e.totalVideoFrames=this.el().webkitDecodedFrameCount),A().performance&&(e.creationTime=A().performance.now()),e}}ir(Ae,"TEST_VID",function(){if(!Pn())return;const n=I().createElement("video"),e=I().createElement("track");return e.kind="captions",e.srclang="en",e.label="English",n.appendChild(e),n}),Ae.isSupported=function(){try{Ae.TEST_VID.volume=.5}catch(n){return!1}return!!(Ae.TEST_VID&&Ae.TEST_VID.canPlayType)},Ae.canPlayType=function(n){return Ae.TEST_VID.canPlayType(n)},Ae.canPlaySource=function(n,e){return Ae.canPlayType(n.type)},Ae.canControlVolume=function(){try{const n=Ae.TEST_VID.volume;Ae.TEST_VID.volume=n/2+.1;const e=n!==Ae.TEST_VID.volume;return e&&It?(A().setTimeout(()=>{Ae&&Ae.prototype&&(Ae.prototype.featuresVolumeControl=n!==Ae.TEST_VID.volume)}),!1):e}catch(n){return!1}},Ae.canMuteVolume=function(){try{const n=Ae.TEST_VID.muted;return Ae.TEST_VID.muted=!n,Ae.TEST_VID.muted?On(Ae.TEST_VID,"muted","muted"):cr(Ae.TEST_VID,"muted","muted"),n!==Ae.TEST_VID.muted}catch(n){return!1}},Ae.canControlPlaybackRate=function(){if(mi&&gi&&nr<58)return!1;try{const n=Ae.TEST_VID.playbackRate;return Ae.TEST_VID.playbackRate=n/2+.1,n!==Ae.TEST_VID.playbackRate}catch(n){return!1}},Ae.canOverrideAttributes=function(){try{const n=()=>{};Object.defineProperty(I().createElement("video"),"src",{get:n,set:n}),Object.defineProperty(I().createElement("audio"),"src",{get:n,set:n}),Object.defineProperty(I().createElement("video"),"innerHTML",{get:n,set:n}),Object.defineProperty(I().createElement("audio"),"innerHTML",{get:n,set:n})}catch(n){return!1}return!0},Ae.supportsNativeTextTracks=function(){return lr||It&&gi},Ae.supportsNativeVideoTracks=function(){return!!(Ae.TEST_VID&&Ae.TEST_VID.videoTracks)},Ae.supportsNativeAudioTracks=function(){return!!(Ae.TEST_VID&&Ae.TEST_VID.audioTracks)},Ae.Events=["loadstart","suspend","abort","error","emptied","stalled","loadedmetadata","loadeddata","canplay","canplaythrough","playing","waiting","seeking","seeked","ended","durationchange","timeupdate","progress","play","pause","ratechange","resize","volumechange"],[["featuresMuteControl","canMuteVolume"],["featuresPlaybackRate","canControlPlaybackRate"],["featuresSourceset","canOverrideAttributes"],["featuresNativeTextTracks","supportsNativeTextTracks"],["featuresNativeVideoTracks","supportsNativeVideoTracks"],["featuresNativeAudioTracks","supportsNativeAudioTracks"]].forEach(function([n,e]){ir(Ae.prototype,n,()=>Ae[e](),!0)}),Ae.prototype.featuresVolumeControl=Ae.canControlVolume(),Ae.prototype.movingMediaElementInDOM=!It,Ae.prototype.featuresFullscreenResize=!0,Ae.prototype.featuresProgressEvents=!0,Ae.prototype.featuresTimeupdateEvents=!0,Ae.prototype.featuresVideoFrameCallback=!!(Ae.TEST_VID&&Ae.TEST_VID.requestVideoFrameCallback),Ae.disposeMediaElement=function(n){if(n){for(n.parentNode&&n.parentNode.removeChild(n);n.hasChildNodes();)n.removeChild(n.firstChild);n.removeAttribute("src"),typeof n.load=="function"&&function(){try{n.load()}catch(e){}}()}},Ae.resetMediaElement=function(n){if(!n)return;const e=n.querySelectorAll("source");let t=e.length;for(;t--;)n.removeChild(e[t]);n.removeAttribute("src"),typeof n.load=="function"&&function(){try{n.load()}catch(i){}}()},["muted","defaultMuted","autoplay","controls","loop","playsinline"].forEach(function(n){Ae.prototype[n]=function(){return this.el_[n]||this.el_.hasAttribute(n)}}),["muted","defaultMuted","autoplay","loop","playsinline"].forEach(function(n){Ae.prototype["set"+pt(n)]=function(e){this.el_[n]=e,e?this.el_.setAttribute(n,n):this.el_.removeAttribute(n)}}),["paused","currentTime","buffered","volume","poster","preload","error","seeking","seekable","ended","playbackRate","defaultPlaybackRate","disablePictureInPicture","played","networkState","readyState","videoWidth","videoHeight","crossOrigin"].forEach(function(n){Ae.prototype[n]=function(){return this.el_[n]}}),["volume","src","poster","preload","playbackRate","defaultPlaybackRate","disablePictureInPicture","crossOrigin"].forEach(function(n){Ae.prototype["set"+pt(n)]=function(e){this.el_[n]=e}}),["pause","load","play"].forEach(function(n){Ae.prototype[n]=function(){return this.el_[n]()}}),Oe.withSourceHandlers(Ae),Ae.nativeSourceHandler={},Ae.nativeSourceHandler.canPlayType=function(n){try{return Ae.TEST_VID.canPlayType(n)}catch(e){return""}},Ae.nativeSourceHandler.canHandleSource=function(n,e){if(n.type)return Ae.nativeSourceHandler.canPlayType(n.type);if(n.src){const t=Ga(n.src);return Ae.nativeSourceHandler.canPlayType(`video/${t}`)}return""},Ae.nativeSourceHandler.handleSource=function(n,e,t){e.setSrc(n.src)},Ae.nativeSourceHandler.dispose=function(){},Ae.registerSourceHandler(Ae.nativeSourceHandler),Oe.registerTech("Html5",Ae);const Qu=["progress","abort","suspend","emptied","stalled","loadedmetadata","loadeddata","timeupdate","resize","volumechange","texttrackchange"],Ao={canplay:"CanPlay",canplaythrough:"CanPlayThrough",playing:"Playing",seeked:"Seeked"},yo=["tiny","xsmall","small","medium","large","xlarge","huge"],xr={};yo.forEach(n=>{const e=n.charAt(0)==="x"?`x-${n.substring(1)}`:n;xr[n]=`vjs-layout-${e}`});const Mp={tiny:210,xsmall:320,small:425,medium:768,large:1440,xlarge:2560,huge:1/0};class it extends W{constructor(e,t,i){if(e.id=e.id||t.id||`vjs_video_${vi()}`,t=Object.assign(it.getTagSettings(e),t),t.initChildren=!1,t.createEl=!1,t.evented=!1,t.reportTouchActivity=!1,!t.language){const a=e.closest("[lang]");a&&(t.language=a.getAttribute("lang"))}if(super(null,t,i),this.boundDocumentFullscreenChange_=a=>this.documentFullscreenChange_(a),this.boundFullWindowOnEscKey_=a=>this.fullWindowOnEscKey(a),this.boundUpdateStyleEl_=a=>this.updateStyleEl_(a),this.boundApplyInitTime_=a=>this.applyInitTime_(a),this.boundUpdateCurrentBreakpoint_=a=>this.updateCurrentBreakpoint_(a),this.boundHandleTechClick_=a=>this.handleTechClick_(a),this.boundHandleTechDoubleClick_=a=>this.handleTechDoubleClick_(a),this.boundHandleTechTouchStart_=a=>this.handleTechTouchStart_(a),this.boundHandleTechTouchMove_=a=>this.handleTechTouchMove_(a),this.boundHandleTechTouchEnd_=a=>this.handleTechTouchEnd_(a),this.boundHandleTechTap_=a=>this.handleTechTap_(a),this.isFullscreen_=!1,this.log=_l(this.id_),this.fsApi_=er,this.isPosterFromTech_=!1,this.queuedCallbacks_=[],this.isReady_=!1,this.hasStarted_=!1,this.userActive_=!1,this.debugEnabled_=!1,this.audioOnlyMode_=!1,this.audioPosterMode_=!1,this.audioOnlyCache_={playerHeight:null,hiddenChildren:[]},!this.options_||!this.options_.techOrder||!this.options_.techOrder.length)throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");if(this.tag=e,this.tagAttributes=e&&zi(e),this.language(this.options_.language),t.languages){const a={};Object.getOwnPropertyNames(t.languages).forEach(function(l){a[l.toLowerCase()]=t.languages[l]}),this.languages_=a}else this.languages_=it.prototype.options_.languages;this.resetCache_(),this.poster_=t.poster||"",this.controls_=!!t.controls,e.controls=!1,e.removeAttribute("controls"),this.changingSrc_=!1,this.playCallbacks_=[],this.playTerminatedQueue_=[],e.hasAttribute("autoplay")?this.autoplay(!0):this.autoplay(this.options_.autoplay),t.plugins&&Object.keys(t.plugins).forEach(a=>{if(typeof this[a]!="function")throw new Error(`plugin "${a}" does not exist`)}),this.scrubbing_=!1,this.el_=this.createEl(),Na(this,{eventBusKey:"el_"}),this.fsApi_.requestFullscreen&&(Gt(I(),this.fsApi_.fullscreenchange,this.boundDocumentFullscreenChange_),this.on(this.fsApi_.fullscreenchange,this.boundDocumentFullscreenChange_)),this.fluid_&&this.on(["playerreset","resize"],this.boundUpdateStyleEl_);const s=et(this.options_);if(t.plugins&&Object.keys(t.plugins).forEach(a=>{this[a](t.plugins[a])}),t.debug&&this.debug(!0),this.options_.playerOptions=s,this.middleware_=[],this.playbackRates(t.playbackRates),t.experimentalSvgIcons){const l=new(A()).DOMParser().parseFromString(lp,"image/svg+xml");if(l.querySelector("parsererror"))Me.warn("Failed to load SVG Icons. Falling back to Font Icons."),this.options_.experimentalSvgIcons=null;else{const m=l.documentElement;m.style.display="none",this.el_.appendChild(m),this.addClass("vjs-svg-icons-enabled")}}this.initChildren(),this.isAudio(e.nodeName.toLowerCase()==="audio"),this.controls()?this.addClass("vjs-controls-enabled"):this.addClass("vjs-controls-disabled"),this.el_.setAttribute("role","region"),this.isAudio()?this.el_.setAttribute("aria-label",this.localize("Audio Player")):this.el_.setAttribute("aria-label",this.localize("Video Player")),this.isAudio()&&this.addClass("vjs-audio"),ps&&this.addClass("vjs-touch-enabled"),It||this.addClass("vjs-workinghover"),it.players[this.id_]=this;const r=vl.split(".")[0];this.addClass(`vjs-v${r}`),this.userActive(!0),this.reportUserActivity(),this.one("play",a=>this.listenForUserActivity_(a)),this.on("keydown",a=>this.handleKeyDown(a)),this.on("languagechange",a=>this.handleLanguagechange(a)),this.breakpoints(this.options_.breakpoints),this.responsive(this.options_.responsive),this.on("ready",()=>{this.audioPosterMode(this.options_.audioPosterMode),this.audioOnlyMode(this.options_.audioOnlyMode)})}dispose(){this.trigger("dispose"),this.off("dispose"),jt(I(),this.fsApi_.fullscreenchange,this.boundDocumentFullscreenChange_),jt(I(),"keydown",this.boundFullWindowOnEscKey_),this.styleEl_&&this.styleEl_.parentNode&&(this.styleEl_.parentNode.removeChild(this.styleEl_),this.styleEl_=null),it.players[this.id_]=null,this.tag&&this.tag.player&&(this.tag.player=null),this.el_&&this.el_.player&&(this.el_.player=null),this.tech_&&(this.tech_.dispose(),this.isPosterFromTech_=!1,this.poster_=""),this.playerElIngest_&&(this.playerElIngest_=null),this.tag&&(this.tag=null),sp(this),Ot.names.forEach(e=>{const t=Ot[e],i=this[t.getterName]();i&&i.off&&i.off()}),super.dispose({restoreEl:this.options_.restoreEl})}createEl(){let e=this.tag,t,i=this.playerElIngest_=e.parentNode&&e.parentNode.hasAttribute&&e.parentNode.hasAttribute("data-vjs-player");const s=this.tag.tagName.toLowerCase()==="video-js";i?t=this.el_=e.parentNode:s||(t=this.el_=super.createEl("div"));const r=zi(e);if(s){for(t=this.el_=e,e=this.tag=I().createElement("video");t.children.length;)e.appendChild(t.firstChild);ms(t,"video-js")||Zi(t,"video-js"),t.appendChild(e),i=this.playerElIngest_=t,Object.keys(t).forEach(l=>{try{e[l]=t[l]}catch(h){}})}if(e.setAttribute("tabindex","-1"),r.tabindex="-1",gi&&rr&&(e.setAttribute("role","application"),r.role="application"),e.removeAttribute("width"),e.removeAttribute("height"),"width"in r&&delete r.width,"height"in r&&delete r.height,Object.getOwnPropertyNames(r).forEach(function(l){s&&l==="class"||t.setAttribute(l,r[l]),s&&e.setAttribute(l,r[l])}),e.playerId=e.id,e.id+="_html5_api",e.className="vjs-tech",e.player=t.player=this,this.addClass("vjs-paused"),A().VIDEOJS_NO_DYNAMIC_STYLE!==!0){this.styleEl_=Hl("vjs-styles-dimensions");const l=Hi(".vjs-styles-defaults"),h=Hi("head");h.insertBefore(this.styleEl_,l?l.nextSibling:h.firstChild)}this.fill_=!1,this.fluid_=!1,this.width(this.options_.width),this.height(this.options_.height),this.fill(this.options_.fill),this.fluid(this.options_.fluid),this.aspectRatio(this.options_.aspectRatio),this.crossOrigin(this.options_.crossOrigin||this.options_.crossorigin);const a=e.getElementsByTagName("a");for(let l=0;l<a.length;l++){const h=a.item(l);Zi(h,"vjs-hidden"),h.setAttribute("hidden","hidden")}return e.initNetworkState_=e.networkState,e.parentNode&&!i&&e.parentNode.insertBefore(t,e),Ba(e,t),this.children_.unshift(e),this.el_.setAttribute("lang",this.language_),this.el_.setAttribute("translate","no"),this.el_=t,t}crossOrigin(e){if(typeof e=="undefined")return this.techGet_("crossOrigin");if(e!==null&&e!=="anonymous"&&e!=="use-credentials"){Me.warn(`crossOrigin must be null,  "anonymous" or "use-credentials", given "${e}"`);return}this.techCall_("setCrossOrigin",e),this.posterImage&&this.posterImage.crossOrigin(e)}width(e){return this.dimension("width",e)}height(e){return this.dimension("height",e)}dimension(e,t){const i=e+"_";if(t===void 0)return this[i]||0;if(t===""||t==="auto"){this[i]=void 0,this.updateStyleEl_();return}const s=parseFloat(t);if(isNaN(s)){Me.error(`Improper value "${t}" supplied for for ${e}`);return}this[i]=s,this.updateStyleEl_()}fluid(e){if(e===void 0)return!!this.fluid_;this.fluid_=!!e,Di(this)&&this.off(["playerreset","resize"],this.boundUpdateStyleEl_),e?(this.addClass("vjs-fluid"),this.fill(!1),Rf(this,()=>{this.on(["playerreset","resize"],this.boundUpdateStyleEl_)})):this.removeClass("vjs-fluid"),this.updateStyleEl_()}fill(e){if(e===void 0)return!!this.fill_;this.fill_=!!e,e?(this.addClass("vjs-fill"),this.fluid(!1)):this.removeClass("vjs-fill")}aspectRatio(e){if(e===void 0)return this.aspectRatio_;if(!/^\d+\:\d+$/.test(e))throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");this.aspectRatio_=e,this.fluid(!0),this.updateStyleEl_()}updateStyleEl_(){if(A().VIDEOJS_NO_DYNAMIC_STYLE===!0){const l=typeof this.width_=="number"?this.width_:this.options_.width,h=typeof this.height_=="number"?this.height_:this.options_.height,m=this.tech_&&this.tech_.el();m&&(l>=0&&(m.width=l),h>=0&&(m.height=h));return}let e,t,i,s;this.aspectRatio_!==void 0&&this.aspectRatio_!=="auto"?i=this.aspectRatio_:this.videoWidth()>0?i=this.videoWidth()+":"+this.videoHeight():i="16:9";const r=i.split(":"),a=r[1]/r[0];this.width_!==void 0?e=this.width_:this.height_!==void 0?e=this.height_/a:e=this.videoWidth()||300,this.height_!==void 0?t=this.height_:t=e*a,/^[^a-zA-Z]/.test(this.id())?s="dimensions-"+this.id():s=this.id()+"-dimensions",this.addClass(s),ql(this.styleEl_,`
      .${s} {
        width: ${e}px;
        height: ${t}px;
      }

      .${s}.vjs-fluid:not(.vjs-audio-only-mode) {
        padding-top: ${a*100}%;
      }
    `)}loadTech_(e,t){this.tech_&&this.unloadTech_();const i=pt(e),s=e.charAt(0).toLowerCase()+e.slice(1);i!=="Html5"&&this.tag&&(Oe.getTech("Html5").disposeMediaElement(this.tag),this.tag.player=null,this.tag=null),this.techName_=i,this.isReady_=!1;let r=this.autoplay();(typeof this.autoplay()=="string"||this.autoplay()===!0&&this.options_.normalizeAutoplay)&&(r=!1);const a={source:t,autoplay:r,nativeControlsForTouch:this.options_.nativeControlsForTouch,playerId:this.id(),techId:`${this.id()}_${s}_api`,playsinline:this.options_.playsinline,preload:this.options_.preload,loop:this.options_.loop,disablePictureInPicture:this.options_.disablePictureInPicture,muted:this.options_.muted,poster:this.poster(),language:this.language(),playerElIngest:this.playerElIngest_||!1,"vtt.js":this.options_["vtt.js"],canOverridePoster:!!this.options_.techCanOverridePoster,enableSourceset:this.options_.enableSourceset};Ot.names.forEach(h=>{const m=Ot[h];a[m.getterName]=this[m.privateName]}),Object.assign(a,this.options_[i]),Object.assign(a,this.options_[s]),Object.assign(a,this.options_[e.toLowerCase()]),this.tag&&(a.tag=this.tag),t&&t.src===this.cache_.src&&this.cache_.currentTime>0&&(a.startTime=this.cache_.currentTime);const l=Oe.getTech(e);if(!l)throw new Error(`No Tech named '${i}' exists! '${i}' should be registered using videojs.registerTech()'`);this.tech_=new l(a),this.tech_.ready(tt(this,this.handleTechReady_),!0),iu.jsonToTextTracks(this.textTracksJson_||[],this.tech_),Qu.forEach(h=>{this.on(this.tech_,h,m=>this[`handleTech${pt(h)}_`](m))}),Object.keys(Ao).forEach(h=>{this.on(this.tech_,h,m=>{if(this.tech_.playbackRate()===0&&this.tech_.seeking()){this.queuedCallbacks_.push({callback:this[`handleTech${Ao[h]}_`].bind(this),event:m});return}this[`handleTech${Ao[h]}_`](m)})}),this.on(this.tech_,"loadstart",h=>this.handleTechLoadStart_(h)),this.on(this.tech_,"sourceset",h=>this.handleTechSourceset_(h)),this.on(this.tech_,"waiting",h=>this.handleTechWaiting_(h)),this.on(this.tech_,"ended",h=>this.handleTechEnded_(h)),this.on(this.tech_,"seeking",h=>this.handleTechSeeking_(h)),this.on(this.tech_,"play",h=>this.handleTechPlay_(h)),this.on(this.tech_,"pause",h=>this.handleTechPause_(h)),this.on(this.tech_,"durationchange",h=>this.handleTechDurationChange_(h)),this.on(this.tech_,"fullscreenchange",(h,m)=>this.handleTechFullscreenChange_(h,m)),this.on(this.tech_,"fullscreenerror",(h,m)=>this.handleTechFullscreenError_(h,m)),this.on(this.tech_,"enterpictureinpicture",h=>this.handleTechEnterPictureInPicture_(h)),this.on(this.tech_,"leavepictureinpicture",h=>this.handleTechLeavePictureInPicture_(h)),this.on(this.tech_,"error",h=>this.handleTechError_(h)),this.on(this.tech_,"posterchange",h=>this.handleTechPosterChange_(h)),this.on(this.tech_,"textdata",h=>this.handleTechTextData_(h)),this.on(this.tech_,"ratechange",h=>this.handleTechRateChange_(h)),this.on(this.tech_,"loadedmetadata",this.boundUpdateStyleEl_),this.usingNativeControls(this.techGet_("controls")),this.controls()&&!this.usingNativeControls()&&this.addTechControlsListeners_(),this.tech_.el().parentNode!==this.el()&&(i!=="Html5"||!this.tag)&&Ba(this.tech_.el(),this.el()),this.tag&&(this.tag.player=null,this.tag=null)}unloadTech_(){Ot.names.forEach(e=>{const t=Ot[e];this[t.privateName]=this[t.getterName]()}),this.textTracksJson_=iu.textTracksToJson(this.tech_),this.isReady_=!1,this.tech_.dispose(),this.tech_=!1,this.isPosterFromTech_&&(this.poster_="",this.trigger("posterchange")),this.isPosterFromTech_=!1}tech(e){return e===void 0&&Me.warn(`Using the tech directly can be dangerous. I hope you know what you're doing.
See https://github.com/videojs/video.js/issues/2617 for more info.
`),this.tech_}addTechControlsListeners_(){this.removeTechControlsListeners_(),this.on(this.tech_,"click",this.boundHandleTechClick_),this.on(this.tech_,"dblclick",this.boundHandleTechDoubleClick_),this.on(this.tech_,"touchstart",this.boundHandleTechTouchStart_),this.on(this.tech_,"touchmove",this.boundHandleTechTouchMove_),this.on(this.tech_,"touchend",this.boundHandleTechTouchEnd_),this.on(this.tech_,"tap",this.boundHandleTechTap_)}removeTechControlsListeners_(){this.off(this.tech_,"tap",this.boundHandleTechTap_),this.off(this.tech_,"touchstart",this.boundHandleTechTouchStart_),this.off(this.tech_,"touchmove",this.boundHandleTechTouchMove_),this.off(this.tech_,"touchend",this.boundHandleTechTouchEnd_),this.off(this.tech_,"click",this.boundHandleTechClick_),this.off(this.tech_,"dblclick",this.boundHandleTechDoubleClick_)}handleTechReady_(){this.triggerReady(),this.cache_.volume&&this.techCall_("setVolume",this.cache_.volume),this.handleTechPosterChange_(),this.handleTechDurationChange_()}handleTechLoadStart_(){this.removeClass("vjs-ended","vjs-seeking"),this.error(null),this.handleTechDurationChange_(),this.paused()?(this.hasStarted(!1),this.trigger("loadstart")):this.trigger("loadstart"),this.manualAutoplay_(this.autoplay()===!0&&this.options_.normalizeAutoplay?"play":this.autoplay())}manualAutoplay_(e){if(!this.tech_||typeof e!="string")return;const t=()=>{const s=this.muted();this.muted(!0);const r=()=>{this.muted(s)};this.playTerminatedQueue_.push(r);const a=this.play();if(_s(a))return a.catch(l=>{throw r(),new Error(`Rejection at manualAutoplay. Restoring muted value. ${l||""}`)})};let i;if(e==="any"&&!this.muted()?(i=this.play(),_s(i)&&(i=i.catch(t))):e==="muted"&&!this.muted()?i=t():i=this.play(),!!_s(i))return i.then(()=>{this.trigger({type:"autoplay-success",autoplay:e})}).catch(()=>{this.trigger({type:"autoplay-failure",autoplay:e})})}updateSourceCaches_(e=""){let t=e,i="";typeof t!="string"&&(t=e.src,i=e.type),this.cache_.source=this.cache_.source||{},this.cache_.sources=this.cache_.sources||[],t&&!i&&(i=op(this,t)),this.cache_.source=et({},e,{src:t,type:i});const s=this.cache_.sources.filter(h=>h.src&&h.src===t),r=[],a=this.$$("source"),l=[];for(let h=0;h<a.length;h++){const m=zi(a[h]);r.push(m),m.src&&m.src===t&&l.push(m.src)}l.length&&!s.length?this.cache_.sources=r:s.length||(this.cache_.sources=[this.cache_.source]),this.cache_.src=t}handleTechSourceset_(e){if(!this.changingSrc_){let t=r=>this.updateSourceCaches_(r);const i=this.currentSource().src,s=e.src;i&&!/^blob:/.test(i)&&/^blob:/.test(s)&&(!this.lastSource_||this.lastSource_.tech!==s&&this.lastSource_.player!==i)&&(t=()=>{}),t(s),e.src||this.tech_.any(["sourceset","loadstart"],r=>{if(r.type==="sourceset")return;const a=this.techGet_("currentSrc");this.lastSource_.tech=a,this.updateSourceCaches_(a)})}this.lastSource_={player:this.currentSource().src,tech:e.src},this.trigger({src:e.src,type:"sourceset"})}hasStarted(e){if(e===void 0)return this.hasStarted_;e!==this.hasStarted_&&(this.hasStarted_=e,this.hasStarted_?this.addClass("vjs-has-started"):this.removeClass("vjs-has-started"))}handleTechPlay_(){this.removeClass("vjs-ended","vjs-paused"),this.addClass("vjs-playing"),this.hasStarted(!0),this.trigger("play")}handleTechRateChange_(){this.tech_.playbackRate()>0&&this.cache_.lastPlaybackRate===0&&(this.queuedCallbacks_.forEach(e=>e.callback(e.event)),this.queuedCallbacks_=[]),this.cache_.lastPlaybackRate=this.tech_.playbackRate(),this.trigger("ratechange")}handleTechWaiting_(){this.addClass("vjs-waiting"),this.trigger("waiting");const e=this.currentTime(),t=()=>{e!==this.currentTime()&&(this.removeClass("vjs-waiting"),this.off("timeupdate",t))};this.on("timeupdate",t)}handleTechCanPlay_(){this.removeClass("vjs-waiting"),this.trigger("canplay")}handleTechCanPlayThrough_(){this.removeClass("vjs-waiting"),this.trigger("canplaythrough")}handleTechPlaying_(){this.removeClass("vjs-waiting"),this.trigger("playing")}handleTechSeeking_(){this.addClass("vjs-seeking"),this.trigger("seeking")}handleTechSeeked_(){this.removeClass("vjs-seeking","vjs-ended"),this.trigger("seeked")}handleTechPause_(){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.trigger("pause")}handleTechEnded_(){this.addClass("vjs-ended"),this.removeClass("vjs-waiting"),this.options_.loop?(this.currentTime(0),this.play()):this.paused()||this.pause(),this.trigger("ended")}handleTechDurationChange_(){this.duration(this.techGet_("duration"))}handleTechClick_(e){this.controls_&&(this.options_===void 0||this.options_.userActions===void 0||this.options_.userActions.click===void 0||this.options_.userActions.click!==!1)&&(this.options_!==void 0&&this.options_.userActions!==void 0&&typeof this.options_.userActions.click=="function"?this.options_.userActions.click.call(this,e):this.paused()?_i(this.play()):this.pause())}handleTechDoubleClick_(e){if(!this.controls_)return;Array.prototype.some.call(this.$$(".vjs-control-bar, .vjs-modal-dialog"),i=>i.contains(e.target))||(this.options_===void 0||this.options_.userActions===void 0||this.options_.userActions.doubleClick===void 0||this.options_.userActions.doubleClick!==!1)&&(this.options_!==void 0&&this.options_.userActions!==void 0&&typeof this.options_.userActions.doubleClick=="function"?this.options_.userActions.doubleClick.call(this,e):this.isFullscreen()?this.exitFullscreen():this.requestFullscreen())}handleTechTap_(){this.userActive(!this.userActive())}handleTechTouchStart_(){this.userWasActive=this.userActive()}handleTechTouchMove_(){this.userWasActive&&this.reportUserActivity()}handleTechTouchEnd_(e){e.cancelable&&e.preventDefault()}toggleFullscreenClass_(){this.isFullscreen()?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen")}documentFullscreenChange_(e){const t=e.target.player;if(t&&t!==this)return;const i=this.el();let s=I()[this.fsApi_.fullscreenElement]===i;!s&&i.matches&&(s=i.matches(":"+this.fsApi_.fullscreen)),this.isFullscreen(s)}handleTechFullscreenChange_(e,t){t&&(t.nativeIOSFullscreen&&(this.addClass("vjs-ios-native-fs"),this.tech_.one("webkitendfullscreen",()=>{this.removeClass("vjs-ios-native-fs")})),this.isFullscreen(t.isFullscreen))}handleTechFullscreenError_(e,t){this.trigger("fullscreenerror",t)}togglePictureInPictureClass_(){this.isInPictureInPicture()?this.addClass("vjs-picture-in-picture"):this.removeClass("vjs-picture-in-picture")}handleTechEnterPictureInPicture_(e){this.isInPictureInPicture(!0)}handleTechLeavePictureInPicture_(e){this.isInPictureInPicture(!1)}handleTechError_(){const e=this.tech_.error();e&&this.error(e)}handleTechTextData_(){let e=null;arguments.length>1&&(e=arguments[1]),this.trigger("textdata",e)}getCache(){return this.cache_}resetCache_(){this.cache_={currentTime:0,initTime:0,inactivityTimeout:this.options_.inactivityTimeout,duration:NaN,lastVolume:1,lastPlaybackRate:this.defaultPlaybackRate(),media:null,src:"",source:{},sources:[],playbackRates:[],volume:1}}techCall_(e,t){this.ready(function(){if(e in ip)return ep(this.middleware_,this.tech_,e,t);if(e in du)return cu(this.middleware_,this.tech_,e,t);try{this.tech_&&this.tech_[e](t)}catch(i){throw Me(i),i}},!0)}techGet_(e){if(!(!this.tech_||!this.tech_.isReady_)){if(e in tp)return Zf(this.middleware_,this.tech_,e);if(e in du)return cu(this.middleware_,this.tech_,e);try{return this.tech_[e]()}catch(t){throw this.tech_[e]===void 0?(Me(`Video.js: ${e} method not defined for ${this.techName_} playback technology.`,t),t):t.name==="TypeError"?(Me(`Video.js: ${e} unavailable on ${this.techName_} playback technology element.`,t),this.tech_.isReady_=!1,t):(Me(t),t)}}}play(){return new Promise(e=>{this.play_(e)})}play_(e=_i){this.playCallbacks_.push(e);const t=!!(!this.changingSrc_&&(this.src()||this.currentSrc())),i=!!(lr||It);if(this.waitToPlay_&&(this.off(["ready","loadstart"],this.waitToPlay_),this.waitToPlay_=null),!this.isReady_||!t){this.waitToPlay_=a=>{this.play_()},this.one(["ready","loadstart"],this.waitToPlay_),!t&&i&&this.load();return}const s=this.techGet_("play");i&&this.hasClass("vjs-ended")&&this.resetProgressBar_(),s===null?this.runPlayTerminatedQueue_():this.runPlayCallbacks_(s)}runPlayTerminatedQueue_(){const e=this.playTerminatedQueue_.slice(0);this.playTerminatedQueue_=[],e.forEach(function(t){t()})}runPlayCallbacks_(e){const t=this.playCallbacks_.slice(0);this.playCallbacks_=[],this.playTerminatedQueue_=[],t.forEach(function(i){i(e)})}pause(){this.techCall_("pause")}paused(){return this.techGet_("paused")!==!1}played(){return this.techGet_("played")||yi(0,0)}scrubbing(e){if(typeof e=="undefined")return this.scrubbing_;this.scrubbing_=!!e,this.techCall_("setScrubbing",this.scrubbing_),e?this.addClass("vjs-scrubbing"):this.removeClass("vjs-scrubbing")}currentTime(e){if(e===void 0)return this.cache_.currentTime=this.techGet_("currentTime")||0,this.cache_.currentTime;if(e<0&&(e=0),!this.isReady_||this.changingSrc_||!this.tech_||!this.tech_.isReady_){this.cache_.initTime=e,this.off("canplay",this.boundApplyInitTime_),this.one("canplay",this.boundApplyInitTime_);return}this.techCall_("setCurrentTime",e),this.cache_.initTime=0,isFinite(e)&&(this.cache_.currentTime=Number(e))}applyInitTime_(){this.currentTime(this.cache_.initTime)}duration(e){if(e===void 0)return this.cache_.duration!==void 0?this.cache_.duration:NaN;e=parseFloat(e),e<0&&(e=1/0),e!==this.cache_.duration&&(this.cache_.duration=e,e===1/0?this.addClass("vjs-live"):this.removeClass("vjs-live"),isNaN(e)||this.trigger("durationchange"))}remainingTime(){return this.duration()-this.currentTime()}remainingTimeDisplay(){return Math.floor(this.duration())-Math.floor(this.currentTime())}buffered(){let e=this.techGet_("buffered");return(!e||!e.length)&&(e=yi(0,0)),e}bufferedPercent(){return tu(this.buffered(),this.duration())}bufferedEnd(){const e=this.buffered(),t=this.duration();let i=e.end(e.length-1);return i>t&&(i=t),i}volume(e){let t;if(e!==void 0){t=Math.max(0,Math.min(1,e)),this.cache_.volume=t,this.techCall_("setVolume",t),t>0&&this.lastVolume_(t);return}return t=parseFloat(this.techGet_("volume")),isNaN(t)?1:t}muted(e){if(e!==void 0){this.techCall_("setMuted",e);return}return this.techGet_("muted")||!1}defaultMuted(e){return e!==void 0&&this.techCall_("setDefaultMuted",e),this.techGet_("defaultMuted")||!1}lastVolume_(e){if(e!==void 0&&e!==0){this.cache_.lastVolume=e;return}return this.cache_.lastVolume}supportsFullScreen(){return this.techGet_("supportsFullScreen")||!1}isFullscreen(e){if(e!==void 0){const t=this.isFullscreen_;this.isFullscreen_=!!e,this.isFullscreen_!==t&&this.fsApi_.prefixed&&this.trigger("fullscreenchange"),this.toggleFullscreenClass_();return}return this.isFullscreen_}requestFullscreen(e){this.isInPictureInPicture()&&this.exitPictureInPicture();const t=this;return new Promise((i,s)=>{function r(){t.off("fullscreenerror",l),t.off("fullscreenchange",a)}function a(){r(),i()}function l(m,g){r(),s(g)}t.one("fullscreenchange",a),t.one("fullscreenerror",l);const h=t.requestFullscreenHelper_(e);h&&(h.then(r,r),h.then(i,s))})}requestFullscreenHelper_(e){let t;if(this.fsApi_.prefixed||(t=this.options_.fullscreen&&this.options_.fullscreen.options||{},e!==void 0&&(t=e)),this.fsApi_.requestFullscreen){const i=this.el_[this.fsApi_.requestFullscreen](t);return i&&i.then(()=>this.isFullscreen(!0),()=>this.isFullscreen(!1)),i}else this.tech_.supportsFullScreen()&&!this.options_.preferFullWindow?this.techCall_("enterFullScreen"):this.enterFullWindow()}exitFullscreen(){const e=this;return new Promise((t,i)=>{function s(){e.off("fullscreenerror",a),e.off("fullscreenchange",r)}function r(){s(),t()}function a(h,m){s(),i(m)}e.one("fullscreenchange",r),e.one("fullscreenerror",a);const l=e.exitFullscreenHelper_();l&&(l.then(s,s),l.then(t,i))})}exitFullscreenHelper_(){if(this.fsApi_.requestFullscreen){const e=I()[this.fsApi_.exitFullscreen]();return e&&_i(e.then(()=>this.isFullscreen(!1))),e}else this.tech_.supportsFullScreen()&&!this.options_.preferFullWindow?this.techCall_("exitFullScreen"):this.exitFullWindow()}enterFullWindow(){this.isFullscreen(!0),this.isFullWindow=!0,this.docOrigOverflow=I().documentElement.style.overflow,Gt(I(),"keydown",this.boundFullWindowOnEscKey_),I().documentElement.style.overflow="hidden",Zi(I().body,"vjs-full-window"),this.trigger("enterFullWindow")}fullWindowOnEscKey(e){O().isEventKey(e,"Esc")&&this.isFullscreen()===!0&&(this.isFullWindow?this.exitFullWindow():this.exitFullscreen())}exitFullWindow(){this.isFullscreen(!1),this.isFullWindow=!1,jt(I(),"keydown",this.boundFullWindowOnEscKey_),I().documentElement.style.overflow=this.docOrigOverflow,ur(I().body,"vjs-full-window"),this.trigger("exitFullWindow")}disablePictureInPicture(e){if(e===void 0)return this.techGet_("disablePictureInPicture");this.techCall_("setDisablePictureInPicture",e),this.options_.disablePictureInPicture=e,this.trigger("disablepictureinpicturechanged")}isInPictureInPicture(e){if(e!==void 0){this.isInPictureInPicture_=!!e,this.togglePictureInPictureClass_();return}return!!this.isInPictureInPicture_}requestPictureInPicture(){if(this.options_.enableDocumentPictureInPicture&&A().documentPictureInPicture){const e=I().createElement(this.el().tagName);return e.classList=this.el().classList,e.classList.add("vjs-pip-container"),this.posterImage&&e.appendChild(this.posterImage.el().cloneNode(!0)),this.titleBar&&e.appendChild(this.titleBar.el().cloneNode(!0)),e.appendChild(Re("p",{className:"vjs-pip-text"},{},this.localize("Playing in picture-in-picture"))),A().documentPictureInPicture.requestWindow({width:this.videoWidth(),height:this.videoHeight()}).then(t=>(Fl(t),this.el_.parentNode.insertBefore(e,this.el_),t.document.body.appendChild(this.el_),t.document.body.classList.add("vjs-pip-window"),this.player_.isInPictureInPicture(!0),this.player_.trigger("enterpictureinpicture"),t.addEventListener("pagehide",i=>{const s=i.target.querySelector(".video-js");e.parentNode.replaceChild(s,e),this.player_.isInPictureInPicture(!1),this.player_.trigger("leavepictureinpicture")}),t))}return"pictureInPictureEnabled"in I()&&this.disablePictureInPicture()===!1?this.techGet_("requestPictureInPicture"):Promise.reject("No PiP mode is available")}exitPictureInPicture(){if(A().documentPictureInPicture&&A().documentPictureInPicture.window)return A().documentPictureInPicture.window.close(),Promise.resolve();if("pictureInPictureEnabled"in I())return I().exitPictureInPicture()}handleKeyDown(e){const{userActions:t}=this.options_;!t||!t.hotkeys||(s=>{const r=s.tagName.toLowerCase();if(s.isContentEditable)return!0;const a=["button","checkbox","hidden","radio","reset","submit"];return r==="input"?a.indexOf(s.type)===-1:["textarea"].indexOf(r)!==-1})(this.el_.ownerDocument.activeElement)||(typeof t.hotkeys=="function"?t.hotkeys.call(this,e):this.handleHotkeys(e))}handleHotkeys(e){const t=this.options_.userActions?this.options_.userActions.hotkeys:{},{fullscreenKey:i=a=>O().isEventKey(a,"f"),muteKey:s=a=>O().isEventKey(a,"m"),playPauseKey:r=a=>O().isEventKey(a,"k")||O().isEventKey(a,"Space")}=t;if(i.call(this,e)){e.preventDefault(),e.stopPropagation();const a=W.getComponent("FullscreenToggle");I()[this.fsApi_.fullscreenEnabled]!==!1&&a.prototype.handleClick.call(this,e)}else s.call(this,e)?(e.preventDefault(),e.stopPropagation(),W.getComponent("MuteToggle").prototype.handleClick.call(this,e)):r.call(this,e)&&(e.preventDefault(),e.stopPropagation(),W.getComponent("PlayToggle").prototype.handleClick.call(this,e))}canPlayType(e){let t;for(let i=0,s=this.options_.techOrder;i<s.length;i++){const r=s[i];let a=Oe.getTech(r);if(a||(a=W.getComponent(r)),!a){Me.error(`The "${r}" tech is undefined. Skipped browser support check for that tech.`);continue}if(a.isSupported()&&(t=a.canPlayType(e),t))return t}return""}selectSource(e){const t=this.options_.techOrder.map(l=>[l,Oe.getTech(l)]).filter(([l,h])=>h?h.isSupported():(Me.error(`The "${l}" tech is undefined. Skipped browser support check for that tech.`),!1)),i=function(l,h,m){let g;return l.some(E=>h.some(w=>{if(g=m(E,w),g)return!0})),g};let s;const r=l=>(h,m)=>l(m,h),a=([l,h],m)=>{if(h.canPlaySource(m,this.options_[l.toLowerCase()]))return{source:m,tech:l}};return this.options_.sourceOrder?s=i(e,t,r(a)):s=i(t,e,a),s||!1}handleSrc_(e,t){if(typeof e=="undefined")return this.cache_.src||"";this.resetRetryOnError_&&this.resetRetryOnError_();const i=hu(e);if(!i.length){this.setTimeout(function(){this.error({code:4,message:this.options_.notSupportedMessage})},0);return}if(this.changingSrc_=!0,t||(this.cache_.sources=i),this.updateSourceCaches_(i[0]),Qf(this,i[0],(s,r)=>{if(this.middleware_=r,t||(this.cache_.sources=i),this.updateSourceCaches_(s),this.src_(s)){if(i.length>1)return this.handleSrc_(i.slice(1));this.changingSrc_=!1,this.setTimeout(function(){this.error({code:4,message:this.options_.notSupportedMessage})},0),this.triggerReady();return}Jf(r,this.tech_)}),i.length>1){const s=()=>{this.error(null),this.handleSrc_(i.slice(1),!0)},r=()=>{this.off("error",s)};this.one("error",s),this.one("playing",r),this.resetRetryOnError_=()=>{this.off("error",s),this.off("playing",r)}}}src(e){return this.handleSrc_(e,!1)}src_(e){const t=this.selectSource([e]);return t?Kl(t.tech,this.techName_)?(this.ready(function(){this.tech_.constructor.prototype.hasOwnProperty("setSource")?this.techCall_("setSource",e):this.techCall_("src",e.src),this.changingSrc_=!1},!0),!1):(this.changingSrc_=!0,this.loadTech_(t.tech,t.source),this.tech_.ready(()=>{this.changingSrc_=!1}),!1):!0}load(){if(this.tech_&&this.tech_.vhs){this.src(this.currentSource());return}this.techCall_("load")}reset(){if(this.paused())this.doReset_();else{const e=this.play();_i(e.then(()=>this.doReset_()))}}doReset_(){this.tech_&&this.tech_.clearTracks("text"),this.resetCache_(),this.poster(""),this.loadTech_(this.options_.techOrder[0],null),this.techCall_("reset"),this.resetControlBarUI_(),Di(this)&&this.trigger("playerreset")}resetControlBarUI_(){this.resetProgressBar_(),this.resetPlaybackRate_(),this.resetVolumeBar_()}resetProgressBar_(){this.currentTime(0);const{currentTimeDisplay:e,durationDisplay:t,progressControl:i,remainingTimeDisplay:s}=this.controlBar||{},{seekBar:r}=i||{};e&&e.updateContent(),t&&t.updateContent(),s&&s.updateContent(),r&&(r.update(),r.loadProgressBar&&r.loadProgressBar.update())}resetPlaybackRate_(){this.playbackRate(this.defaultPlaybackRate()),this.handleTechRateChange_()}resetVolumeBar_(){this.volume(1),this.trigger("volumechange")}currentSources(){const e=this.currentSource(),t=[];return Object.keys(e).length!==0&&t.push(e),this.cache_.sources||t}currentSource(){return this.cache_.source||{}}currentSrc(){return this.currentSource()&&this.currentSource().src||""}currentType(){return this.currentSource()&&this.currentSource().type||""}preload(e){if(e!==void 0){this.techCall_("setPreload",e),this.options_.preload=e;return}return this.techGet_("preload")}autoplay(e){if(e===void 0)return this.options_.autoplay||!1;let t;typeof e=="string"&&/(any|play|muted)/.test(e)||e===!0&&this.options_.normalizeAutoplay?(this.options_.autoplay=e,this.manualAutoplay_(typeof e=="string"?e:"play"),t=!1):e?this.options_.autoplay=!0:this.options_.autoplay=!1,t=typeof t=="undefined"?this.options_.autoplay:t,this.tech_&&this.techCall_("setAutoplay",t)}playsinline(e){return e!==void 0&&(this.techCall_("setPlaysinline",e),this.options_.playsinline=e),this.techGet_("playsinline")}loop(e){if(e!==void 0){this.techCall_("setLoop",e),this.options_.loop=e;return}return this.techGet_("loop")}poster(e){if(e===void 0)return this.poster_;e||(e=""),e!==this.poster_&&(this.poster_=e,this.techCall_("setPoster",e),this.isPosterFromTech_=!1,this.trigger("posterchange"))}handleTechPosterChange_(){if((!this.poster_||this.options_.techCanOverridePoster)&&this.tech_&&this.tech_.poster){const e=this.tech_.poster()||"";e!==this.poster_&&(this.poster_=e,this.isPosterFromTech_=!0,this.trigger("posterchange"))}}controls(e){if(e===void 0)return!!this.controls_;e=!!e,this.controls_!==e&&(this.controls_=e,this.usingNativeControls()&&this.techCall_("setControls",e),this.controls_?(this.removeClass("vjs-controls-disabled"),this.addClass("vjs-controls-enabled"),this.trigger("controlsenabled"),this.usingNativeControls()||this.addTechControlsListeners_()):(this.removeClass("vjs-controls-enabled"),this.addClass("vjs-controls-disabled"),this.trigger("controlsdisabled"),this.usingNativeControls()||this.removeTechControlsListeners_()))}usingNativeControls(e){if(e===void 0)return!!this.usingNativeControls_;e=!!e,this.usingNativeControls_!==e&&(this.usingNativeControls_=e,this.usingNativeControls_?(this.addClass("vjs-using-native-controls"),this.trigger("usingnativecontrols")):(this.removeClass("vjs-using-native-controls"),this.trigger("usingcustomcontrols")))}error(e){if(e===void 0)return this.error_||null;if(Fi("beforeerror").forEach(t=>{const i=t(this,e);if(!(pi(i)&&!Array.isArray(i)||typeof i=="string"||typeof i=="number"||i===null)){this.log.error("please return a value that MediaError expects in beforeerror hooks");return}e=i}),this.options_.suppressNotSupportedError&&e&&e.code===4){const t=function(){this.error(e)};this.options_.suppressNotSupportedError=!1,this.any(["click","touchstart"],t),this.one("loadstart",function(){this.off(["click","touchstart"],t)});return}if(e===null){this.error_=null,this.removeClass("vjs-error"),this.errorDisplay&&this.errorDisplay.close();return}this.error_=new Lt(e),this.addClass("vjs-error"),Me.error(`(CODE:${this.error_.code} ${Lt.errorTypes[this.error_.code]})`,this.error_.message,this.error_),this.trigger("error"),Fi("error").forEach(t=>t(this,this.error_))}reportUserActivity(e){this.userActivity_=!0}userActive(e){if(e===void 0)return this.userActive_;if(e=!!e,e!==this.userActive_){if(this.userActive_=e,this.userActive_){this.userActivity_=!0,this.removeClass("vjs-user-inactive"),this.addClass("vjs-user-active"),this.trigger("useractive");return}this.tech_&&this.tech_.one("mousemove",function(t){t.stopPropagation(),t.preventDefault()}),this.userActivity_=!1,this.removeClass("vjs-user-active"),this.addClass("vjs-user-inactive"),this.trigger("userinactive")}}listenForUserActivity_(){let e,t,i;const s=tt(this,this.reportUserActivity),r=function(E){(E.screenX!==t||E.screenY!==i)&&(t=E.screenX,i=E.screenY,s())},a=function(){s(),this.clearInterval(e),e=this.setInterval(s,250)},l=function(E){s(),this.clearInterval(e)};this.on("mousedown",a),this.on("mousemove",r),this.on("mouseup",l),this.on("mouseleave",l);const h=this.getChild("controlBar");h&&!It&&!mi&&(h.on("mouseenter",function(E){this.player().options_.inactivityTimeout!==0&&(this.player().cache_.inactivityTimeout=this.player().options_.inactivityTimeout),this.player().options_.inactivityTimeout=0}),h.on("mouseleave",function(E){this.player().options_.inactivityTimeout=this.player().cache_.inactivityTimeout})),this.on("keydown",s),this.on("keyup",s);let m;const g=function(){if(!this.userActivity_)return;this.userActivity_=!1,this.userActive(!0),this.clearTimeout(m);const E=this.options_.inactivityTimeout;E<=0||(m=this.setTimeout(function(){this.userActivity_||this.userActive(!1)},E))};this.setInterval(g,250)}playbackRate(e){if(e!==void 0){this.techCall_("setPlaybackRate",e);return}return this.tech_&&this.tech_.featuresPlaybackRate?this.cache_.lastPlaybackRate||this.techGet_("playbackRate"):1}defaultPlaybackRate(e){return e!==void 0?this.techCall_("setDefaultPlaybackRate",e):this.tech_&&this.tech_.featuresPlaybackRate?this.techGet_("defaultPlaybackRate"):1}isAudio(e){if(e!==void 0){this.isAudio_=!!e;return}return!!this.isAudio_}enableAudioOnlyUI_(){this.addClass("vjs-audio-only-mode");const e=this.children(),t=this.getChild("ControlBar"),i=t&&t.currentHeight();e.forEach(s=>{s!==t&&s.el_&&!s.hasClass("vjs-hidden")&&(s.hide(),this.audioOnlyCache_.hiddenChildren.push(s))}),this.audioOnlyCache_.playerHeight=this.currentHeight(),this.height(i),this.trigger("audioonlymodechange")}disableAudioOnlyUI_(){this.removeClass("vjs-audio-only-mode"),this.audioOnlyCache_.hiddenChildren.forEach(e=>e.show()),this.height(this.audioOnlyCache_.playerHeight),this.trigger("audioonlymodechange")}audioOnlyMode(e){if(typeof e!="boolean"||e===this.audioOnlyMode_)return this.audioOnlyMode_;if(this.audioOnlyMode_=e,e){const t=[];return this.isInPictureInPicture()&&t.push(this.exitPictureInPicture()),this.isFullscreen()&&t.push(this.exitFullscreen()),this.audioPosterMode()&&t.push(this.audioPosterMode(!1)),Promise.all(t).then(()=>this.enableAudioOnlyUI_())}return Promise.resolve().then(()=>this.disableAudioOnlyUI_())}enablePosterModeUI_(){(this.tech_&&this.tech_).hide(),this.addClass("vjs-audio-poster-mode"),this.trigger("audiopostermodechange")}disablePosterModeUI_(){(this.tech_&&this.tech_).show(),this.removeClass("vjs-audio-poster-mode"),this.trigger("audiopostermodechange")}audioPosterMode(e){return typeof e!="boolean"||e===this.audioPosterMode_?this.audioPosterMode_:(this.audioPosterMode_=e,e?this.audioOnlyMode()?this.audioOnlyMode(!1).then(()=>{this.enablePosterModeUI_()}):Promise.resolve().then(()=>{this.enablePosterModeUI_()}):Promise.resolve().then(()=>{this.disablePosterModeUI_()}))}addTextTrack(e,t,i){if(this.tech_)return this.tech_.addTextTrack(e,t,i)}addRemoteTextTrack(e,t){if(this.tech_)return this.tech_.addRemoteTextTrack(e,t)}removeRemoteTextTrack(e={}){let{track:t}=e;if(t||(t=e),this.tech_)return this.tech_.removeRemoteTextTrack(t)}getVideoPlaybackQuality(){return this.techGet_("getVideoPlaybackQuality")}videoWidth(){return this.tech_&&this.tech_.videoWidth&&this.tech_.videoWidth()||0}videoHeight(){return this.tech_&&this.tech_.videoHeight&&this.tech_.videoHeight()||0}language(e){if(e===void 0)return this.language_;this.language_!==String(e).toLowerCase()&&(this.language_=String(e).toLowerCase(),Di(this)&&this.trigger("languagechange"))}languages(){return et(it.prototype.options_.languages,this.languages_)}toJSON(){const e=et(this.options_),t=e.tracks;e.tracks=[];for(let i=0;i<t.length;i++){let s=t[i];s=et(s),s.player=void 0,e.tracks[i]=s}return e}createModal(e,t){t=t||{},t.content=e||"";const i=new Un(this,t);return this.addChild(i),i.on("dispose",()=>{this.removeChild(i)}),i.open(),i}updateCurrentBreakpoint_(){if(!this.responsive())return;const e=this.currentBreakpoint(),t=this.currentWidth();for(let i=0;i<yo.length;i++){const s=yo[i],r=this.breakpoints_[s];if(t<=r){if(e===s)return;e&&this.removeClass(xr[e]),this.addClass(xr[s]),this.breakpoint_=s;break}}}removeCurrentBreakpoint_(){const e=this.currentBreakpointClass();this.breakpoint_="",e&&this.removeClass(e)}breakpoints(e){return e===void 0?Object.assign(this.breakpoints_):(this.breakpoint_="",this.breakpoints_=Object.assign({},Mp,e),this.updateCurrentBreakpoint_(),Object.assign(this.breakpoints_))}responsive(e){if(e===void 0)return this.responsive_;e=!!e;const t=this.responsive_;if(e!==t)return this.responsive_=e,e?(this.on("playerresize",this.boundUpdateCurrentBreakpoint_),this.updateCurrentBreakpoint_()):(this.off("playerresize",this.boundUpdateCurrentBreakpoint_),this.removeCurrentBreakpoint_()),e}currentBreakpoint(){return this.breakpoint_}currentBreakpointClass(){return xr[this.breakpoint_]||""}loadMedia(e,t){if(!e||typeof e!="object")return;const i=this.crossOrigin();this.reset(),this.cache_.media=et(e);const{artist:s,artwork:r,description:a,poster:l,src:h,textTracks:m,title:g}=this.cache_.media;!r&&l&&(this.cache_.media.artwork=[{src:l,type:br(l)}]),i&&this.crossOrigin(i),h&&this.src(h),l&&this.poster(l),Array.isArray(m)&&m.forEach(E=>this.addRemoteTextTrack(E,!1)),this.titleBar&&this.titleBar.update({title:g,description:a||s||""}),this.ready(t)}getMedia(){if(!this.cache_.media){const e=this.poster(),t=this.currentSources(),i=Array.prototype.map.call(this.remoteTextTracks(),r=>({kind:r.kind,label:r.label,language:r.language,src:r.src})),s={src:t,textTracks:i};return e&&(s.poster=e,s.artwork=[{src:s.poster,type:br(s.poster)}]),s}return et(this.cache_.media)}static getTagSettings(e){const t={sources:[],tracks:[]},i=zi(e),s=i["data-setup"];if(ms(e,"vjs-fill")&&(i.fill=!0),ms(e,"vjs-fluid")&&(i.fluid=!0),s!==null){const[r,a]=se()(s||"{}");r&&Me.error(r),Object.assign(i,a)}if(Object.assign(t,i),e.hasChildNodes()){const r=e.childNodes;for(let a=0,l=r.length;a<l;a++){const h=r[a],m=h.nodeName.toLowerCase();m==="source"?t.sources.push(zi(h)):m==="track"&&t.tracks.push(zi(h))}}return t}debug(e){if(e===void 0)return this.debugEnabled_;e?(this.trigger("debugon"),this.previousLogLevel_=this.log.level,this.log.level("debug"),this.debugEnabled_=!0):(this.trigger("debugoff"),this.log.level(this.previousLogLevel_),this.previousLogLevel_=void 0,this.debugEnabled_=!1)}playbackRates(e){if(e===void 0)return this.cache_.playbackRates;Array.isArray(e)&&e.every(t=>typeof t=="number")&&(this.cache_.playbackRates=e,this.trigger("playbackrateschange"))}}Ot.names.forEach(function(n){const e=Ot[n];it.prototype[e.getterName]=function(){return this.tech_?this.tech_[e.getterName]():(this[e.privateName]=this[e.privateName]||new e.ListClass,this[e.privateName])}}),it.prototype.crossorigin=it.prototype.crossOrigin,it.players={};const Ss=A().navigator;it.prototype.options_={techOrder:Oe.defaultTechOrder_,html5:{},enableSourceset:!0,inactivityTimeout:2e3,playbackRates:[],liveui:!1,children:["mediaLoader","posterImage","titleBar","textTrackDisplay","loadingSpinner","bigPlayButton","liveTracker","controlBar","errorDisplay","textTrackSettings","resizeManager"],language:Ss&&(Ss.languages&&Ss.languages[0]||Ss.userLanguage||Ss.language)||"en",languages:{},notSupportedMessage:"No compatible source was found for this media.",normalizeAutoplay:!1,fullscreen:{options:{navigationUI:"hide"}},breakpoints:{},responsive:!1,audioOnlyMode:!1,audioPosterMode:!1},["ended","seeking","seekable","networkState","readyState"].forEach(function(n){it.prototype[n]=function(){return this.techGet_(n)}}),Qu.forEach(function(n){it.prototype[`handleTech${pt(n)}_`]=function(){return this.trigger(n)}}),W.registerComponent("Player",it);const Sr="plugin",qn="activePlugins_",Wn={},jr=n=>Wn.hasOwnProperty(n),Br=n=>jr(n)?Wn[n]:void 0,Ju=(n,e)=>{n[qn]=n[qn]||{},n[qn][e]=!0},wr=(n,e,t)=>{const i=(t?"before":"")+"pluginsetup";n.trigger(i,e),n.trigger(i+":"+e.name,e)},Up=function(n,e){const t=function(){wr(this,{name:n,plugin:e,instance:null},!0);const i=e.apply(this,arguments);return Ju(this,n),wr(this,{name:n,plugin:e,instance:i}),i};return Object.keys(e).forEach(function(i){t[i]=e[i]}),t},Zu=(n,e)=>(e.prototype.name=n,function(...t){wr(this,{name:n,plugin:e,instance:null},!0);const i=new e(this,...t);return this[n]=()=>i,wr(this,i.getEventHash()),i});class Vt{constructor(e){if(this.constructor===Vt)throw new Error("Plugin must be sub-classed; not directly instantiated.");this.player=e,this.log||(this.log=this.player.log.createLogger(this.name)),Na(this),delete this.trigger,Yl(this,this.constructor.defaultState),Ju(e,this.name),this.dispose=this.dispose.bind(this),e.on("dispose",this.dispose)}version(){return this.constructor.VERSION}getEventHash(e={}){return e.name=this.name,e.plugin=this.constructor,e.instance=this,e}trigger(e,t={}){return Mn(this.eventBusEl_,e,this.getEventHash(t))}handleStateChanged(e){}dispose(){const{name:e,player:t}=this;this.trigger("dispose"),this.off(),t.off("dispose",this.dispose),t[qn][e]=!1,this.player=this.state=null,t[e]=Zu(e,Wn[e])}static isBasic(e){const t=typeof e=="string"?Br(e):e;return typeof t=="function"&&!Vt.prototype.isPrototypeOf(t.prototype)}static registerPlugin(e,t){if(typeof e!="string")throw new Error(`Illegal plugin name, "${e}", must be a string, was ${typeof e}.`);if(jr(e))Me.warn(`A plugin named "${e}" already exists. You may want to avoid re-registering plugins!`);else if(it.prototype.hasOwnProperty(e))throw new Error(`Illegal plugin name, "${e}", cannot share a name with an existing player method!`);if(typeof t!="function")throw new Error(`Illegal plugin for "${e}", must be a function, was ${typeof t}.`);return Wn[e]=t,e!==Sr&&(Vt.isBasic(t)?it.prototype[e]=Up(e,t):it.prototype[e]=Zu(e,t)),t}static deregisterPlugin(e){if(e===Sr)throw new Error("Cannot de-register base plugin.");jr(e)&&(delete Wn[e],delete it.prototype[e])}static getPlugins(e=Object.keys(Wn)){let t;return e.forEach(i=>{const s=Br(i);s&&(t=t||{},t[i]=s)}),t}static getPluginVersion(e){const t=Br(e);return t&&t.VERSION||""}}Vt.getPlugin=Br,Vt.BASE_PLUGIN_NAME=Sr,Vt.registerPlugin(Sr,Vt),it.prototype.usingPlugin=function(n){return!!this[qn]&&this[qn][n]===!0},it.prototype.hasPlugin=function(n){return!!jr(n)};function Fp(n,e){let t=!1;return function(...i){return t||Me.warn(n),t=!0,e.apply(this,i)}}function ai(n,e,t,i){return Fp(`${e} is deprecated and will be removed in ${n}.0; please use ${t} instead.`,i)}const ec=n=>n.indexOf("#")===0?n.slice(1):n;function F(n,e,t){let i=F.getPlayer(n);if(i)return e&&Me.warn(`Player "${n}" is already initialised. Options will not be applied.`),t&&i.ready(t),i;const s=typeof n=="string"?Hi("#"+ec(n)):n;if(!Ln(s))throw new TypeError("The element or ID supplied is not valid. (videojs)");const a=("getRootNode"in s?s.getRootNode()instanceof A().ShadowRoot:!1)?s.getRootNode():s.ownerDocument.body;(!s.ownerDocument.defaultView||!a.contains(s))&&Me.warn("The element supplied is not included in the DOM"),e=e||{},e.restoreEl===!0&&(e.restoreEl=(s.parentNode&&s.parentNode.hasAttribute("data-vjs-player")?s.parentNode:s).cloneNode(!0)),Fi("beforesetup").forEach(h=>{const m=h(s,et(e));if(!pi(m)||Array.isArray(m)){Me.error("please return an object in beforesetup hooks");return}e=et(e,m)});const l=W.getComponent("Player");return i=new l(s,e,t),Fi("setup").forEach(h=>h(i)),i}if(F.hooks_=wi,F.hooks=Fi,F.hook=Tf,F.hookOnce=Cf,F.removeHook=Al,A().VIDEOJS_NO_DYNAMIC_STYLE!==!0&&Pn()){let n=Hi(".vjs-styles-defaults");if(!n){n=Hl("vjs-styles-defaults");const e=Hi("head");e&&e.insertBefore(n,e.firstChild),ql(n,`
      .video-js {
        width: 300px;
        height: 150px;
      }

      .vjs-fluid:not(.vjs-audio-only-mode) {
        padding-top: 56.25%
      }
    `)}}ka(1,F),F.VERSION=vl,F.options=it.prototype.options_,F.getPlayers=()=>it.players,F.getPlayer=n=>{const e=it.players;let t;if(typeof n=="string"){const i=ec(n),s=e[i];if(s)return s;t=Hi("#"+i)}else t=n;if(Ln(t)){const{player:i,playerId:s}=t;if(i||e[s])return i||e[s]}},F.getAllPlayers=()=>Object.keys(it.players).map(n=>it.players[n]).filter(Boolean),F.players=it.players,F.getComponent=W.getComponent,F.registerComponent=(n,e)=>(Oe.isTech(e)&&Me.warn(`The ${n} tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)`),W.registerComponent.call(W,n,e)),F.getTech=Oe.getTech,F.registerTech=Oe.registerTech,F.use=Kf,Object.defineProperty(F,"middleware",{value:{},writeable:!1,enumerable:!0}),Object.defineProperty(F.middleware,"TERMINATOR",{value:_r,writeable:!1,enumerable:!0}),F.browser=Bf,F.obj=jf,F.mergeOptions=ai(9,"videojs.mergeOptions","videojs.obj.merge",et),F.defineLazyProperty=ai(9,"videojs.defineLazyProperty","videojs.obj.defineLazyProperty",ir),F.bind=ai(9,"videojs.bind","native Function.prototype.bind",tt),F.registerPlugin=Vt.registerPlugin,F.deregisterPlugin=Vt.deregisterPlugin,F.plugin=(n,e)=>(Me.warn("videojs.plugin() is deprecated; use videojs.registerPlugin() instead"),Vt.registerPlugin(n,e)),F.getPlugins=Vt.getPlugins,F.getPlugin=Vt.getPlugin,F.getPluginVersion=Vt.getPluginVersion,F.addLanguage=function(n,e){return n=(""+n).toLowerCase(),F.options.languages=et(F.options.languages,{[n]:e}),F.options.languages[n]},F.log=Me,F.createLogger=_l,F.time=Vf,F.createTimeRange=ai(9,"videojs.createTimeRange","videojs.time.createTimeRanges",yi),F.createTimeRanges=ai(9,"videojs.createTimeRanges","videojs.time.createTimeRanges",yi),F.formatTime=ai(9,"videojs.formatTime","videojs.time.formatTime",tn),F.setFormatTime=ai(9,"videojs.setFormatTime","videojs.time.setFormatTime",Zl),F.resetFormatTime=ai(9,"videojs.resetFormatTime","videojs.time.resetFormatTime",eu),F.parseUrl=ai(9,"videojs.parseUrl","videojs.url.parseUrl",Wa),F.isCrossOrigin=ai(9,"videojs.isCrossOrigin","videojs.url.isCrossOrigin",yr),F.EventTarget=ei,F.any=La,F.on=Gt,F.one=mr,F.off=jt,F.trigger=Mn,F.xhr=be(),F.TextTrack=bs,F.AudioTrack=lu,F.VideoTrack=uu,["isEl","isTextNode","createEl","hasClass","addClass","removeClass","toggleClass","setAttributes","getAttributes","emptyEl","appendContent","insertContent"].forEach(n=>{F[n]=function(){return Me.warn(`videojs.${n}() is deprecated; use videojs.dom.${n}() instead`),Vl[n].apply(null,arguments)}}),F.computedStyle=ai(9,"videojs.computedStyle","videojs.dom.computedStyle",Nn),F.dom=Vl,F.fn=Of,F.num=gp,F.str=Uf,F.url=Xf;/*! @name videojs-contrib-quality-levels @version 4.0.0 @license Apache-2.0 */class Vp{constructor(e){let t=this;return t.id=e.id,t.label=t.id,t.width=e.width,t.height=e.height,t.bitrate=e.bandwidth,t.frameRate=e.frameRate,t.enabled_=e.enabled,Object.defineProperty(t,"enabled",{get(){return t.enabled_()},set(i){t.enabled_(i)}}),t}}class Dr extends F.EventTarget{constructor(){super();let e=this;return e.levels_=[],e.selectedIndex_=-1,Object.defineProperty(e,"selectedIndex",{get(){return e.selectedIndex_}}),Object.defineProperty(e,"length",{get(){return e.levels_.length}}),e[Symbol.iterator]=()=>e.levels_.values(),e}addQualityLevel(e){let t=this.getQualityLevelById(e.id);if(t)return t;const i=this.levels_.length;return t=new Vp(e),""+i in this||Object.defineProperty(this,i,{get(){return this.levels_[i]}}),this.levels_.push(t),this.trigger({qualityLevel:t,type:"addqualitylevel"}),t}removeQualityLevel(e){let t=null;for(let i=0,s=this.length;i<s;i++)if(this[i]===e){t=this.levels_.splice(i,1)[0],this.selectedIndex_===i?this.selectedIndex_=-1:this.selectedIndex_>i&&this.selectedIndex_--;break}return t&&this.trigger({qualityLevel:e,type:"removequalitylevel"}),t}getQualityLevelById(e){for(let t=0,i=this.length;t<i;t++){const s=this[t];if(s.id===e)return s}return null}dispose(){this.selectedIndex_=-1,this.levels_.length=0}}Dr.prototype.allowedEvents_={change:"change",addqualitylevel:"addqualitylevel",removequalitylevel:"removequalitylevel"};for(const n in Dr.prototype.allowedEvents_)Dr.prototype["on"+n]=null;var tc="4.0.0";const zp=function(n,e){const t=n.qualityLevels,i=new Dr,s=function(){i.dispose(),n.qualityLevels=t,n.off("dispose",s)};return n.on("dispose",s),n.qualityLevels=()=>i,n.qualityLevels.VERSION=tc,i},ic=function(n){return zp(this,F.obj.merge({},n))};F.registerPlugin("qualityLevels",ic),ic.VERSION=tc;/*! @name @videojs/http-streaming @version 3.7.0 @license Apache-2.0 */const Xt=nt,kr=(n,e)=>e&&e.responseURL&&n!==e.responseURL?e.responseURL:n,ni=n=>F.log.debug?F.log.debug.bind(F,"VHS:",`${n} >`):function(){};function Ye(...n){const e=F.obj||F;return(e.merge||e.mergeOptions).apply(e,n)}function Bt(...n){const e=F.time||F;return(e.createTimeRanges||e.createTimeRanges).apply(e,n)}function Hp(n){let e="";for(let t=0;t<n.length;t++){const i=n.start(t),s=n.end(t),r=s-i;e.length&&(e+=`
`),e+=`[${r}](${i} -> ${s})`}return e||"empty"}const qi=1/30,bi=qi*3,nc=function(n,e){const t=[];let i;if(n&&n.length)for(i=0;i<n.length;i++)e(n.start(i),n.end(i))&&t.push([n.start(i),n.end(i)]);return Bt(t)},Gn=function(n,e){return nc(n,function(t,i){return t-bi<=e&&i+bi>=e})},Ir=function(n,e){return nc(n,function(t){return t-qi>=e})},qp=function(n){if(n.length<2)return Bt();const e=[];for(let t=1;t<n.length;t++){const i=n.end(t-1),s=n.start(t);e.push([i,s])}return Bt(e)},Wp=function(n,e){let t=null,i=null,s=0;const r=[],a=[];if(!n||!n.length||!e||!e.length)return Bt();let l=n.length;for(;l--;)r.push({time:n.start(l),type:"start"}),r.push({time:n.end(l),type:"end"});for(l=e.length;l--;)r.push({time:e.start(l),type:"start"}),r.push({time:e.end(l),type:"end"});for(r.sort(function(h,m){return h.time-m.time}),l=0;l<r.length;l++)r[l].type==="start"?(s++,s===2&&(t=r[l].time)):r[l].type==="end"&&(s--,s===1&&(i=r[l].time)),t!==null&&i!==null&&(a.push([t,i]),t=null,i=null);return Bt(a)},sc=n=>{const e=[];if(!n||!n.length)return"";for(let t=0;t<n.length;t++)e.push(n.start(t)+" => "+n.end(t));return e.join(", ")},Gp=function(n,e,t=1){return((n.length?n.end(n.length-1):0)-e)/t},an=n=>{const e=[];for(let t=0;t<n.length;t++)e.push({start:n.start(t),end:n.end(t)});return e},$p=function(n,e){if(n===e)return!1;if(!n&&e||!e&&n||n.length!==e.length)return!0;for(let t=0;t<n.length;t++)if(n.start(t)!==e.start(t)||n.end(t)!==e.end(t))return!0;return!1},rc=function(n){if(!(!n||!n.length||!n.end))return n.end(n.length-1)},_o=function(n,e){let t=0;if(!n||!n.length)return t;for(let i=0;i<n.length;i++){const s=n.start(i),r=n.end(i);if(!(e>r)){if(e>s&&e<=r){t+=r-e;continue}t+=r-s}}return t},bo=(n,e)=>{if(!e.preload)return e.duration;let t=0;return(e.parts||[]).forEach(function(i){t+=i.duration}),(e.preloadHints||[]).forEach(function(i){i.type==="PART"&&(t+=n.partTargetDuration)}),t},Eo=n=>(n.segments||[]).reduce((e,t,i)=>(t.parts?t.parts.forEach(function(s,r){e.push({duration:s.duration,segmentIndex:i,partIndex:r,part:s,segment:t})}):e.push({duration:t.duration,segmentIndex:i,partIndex:null,segment:t,part:null}),e),[]),ac=n=>{const e=n.segments&&n.segments.length&&n.segments[n.segments.length-1];return e&&e.parts||[]},oc=({preloadSegment:n})=>{if(!n)return;const{parts:e,preloadHints:t}=n;let i=(t||[]).reduce((s,r)=>s+(r.type==="PART"?1:0),0);return i+=e&&e.length?e.length:0,i},lc=(n,e)=>{if(e.endList)return 0;if(n&&n.suggestedPresentationDelay)return n.suggestedPresentationDelay;const t=ac(e).length>0;return t&&e.serverControl&&e.serverControl.partHoldBack?e.serverControl.partHoldBack:t&&e.partTargetDuration?e.partTargetDuration*3:e.serverControl&&e.serverControl.holdBack?e.serverControl.holdBack:e.targetDuration?e.targetDuration*3:0},Xp=function(n,e){let t=0,i=e-n.mediaSequence,s=n.segments[i];if(s){if(typeof s.start!="undefined")return{result:s.start,precise:!0};if(typeof s.end!="undefined")return{result:s.end-s.duration,precise:!0}}for(;i--;){if(s=n.segments[i],typeof s.end!="undefined")return{result:t+s.end,precise:!0};if(t+=bo(n,s),typeof s.start!="undefined")return{result:t+s.start,precise:!0}}return{result:t,precise:!1}},Yp=function(n,e){let t=0,i,s=e-n.mediaSequence;for(;s<n.segments.length;s++){if(i=n.segments[s],typeof i.start!="undefined")return{result:i.start-t,precise:!0};if(t+=bo(n,i),typeof i.end!="undefined")return{result:i.end-t,precise:!0}}return{result:-1,precise:!1}},uc=function(n,e,t){if(typeof e=="undefined"&&(e=n.mediaSequence+n.segments.length),e<n.mediaSequence)return 0;const i=Xp(n,e);if(i.precise)return i.result;const s=Yp(n,e);return s.precise?s.result:i.result+t},cc=function(n,e,t){if(!n)return 0;if(typeof t!="number"&&(t=0),typeof e=="undefined"){if(n.totalDuration)return n.totalDuration;if(!n.endList)return A()[1/0]}return uc(n,e,t)},js=function({defaultDuration:n,durationList:e,startIndex:t,endIndex:i}){let s=0;if(t>i&&([t,i]=[i,t]),t<0){for(let r=t;r<Math.min(0,i);r++)s+=n;t=0}for(let r=t;r<i;r++)s+=e[r].duration;return s},dc=function(n,e,t,i){if(!n||!n.segments)return null;if(n.endList)return cc(n);if(e===null)return null;e=e||0;let s=uc(n,n.mediaSequence+n.segments.length,e);return t&&(i=typeof i=="number"?i:lc(null,n),s-=i),Math.max(0,s)},Kp=function(n,e,t){const s=e||0;let r=dc(n,e,!0,t);return r===null?Bt():(r<s&&(r=s),Bt(s,r))},Qp=function({playlist:n,currentTime:e,startingSegmentIndex:t,startingPartIndex:i,startTime:s,exactManifestTimings:r}){let a=e-s;const l=Eo(n);let h=0;for(let m=0;m<l.length;m++){const g=l[m];if(t===g.segmentIndex&&!(typeof i=="number"&&typeof g.partIndex=="number"&&i!==g.partIndex)){h=m;break}}if(a<0){if(h>0)for(let m=h-1;m>=0;m--){const g=l[m];if(a+=g.duration,r){if(a<0)continue}else if(a+qi<=0)continue;return{partIndex:g.partIndex,segmentIndex:g.segmentIndex,startTime:s-js({defaultDuration:n.targetDuration,durationList:l,startIndex:h,endIndex:m})}}return{partIndex:l[0]&&l[0].partIndex||null,segmentIndex:l[0]&&l[0].segmentIndex||0,startTime:e}}if(h<0){for(let m=h;m<0;m++)if(a-=n.targetDuration,a<0)return{partIndex:l[0]&&l[0].partIndex||null,segmentIndex:l[0]&&l[0].segmentIndex||0,startTime:e};h=0}for(let m=h;m<l.length;m++){const g=l[m];if(a-=g.duration,r){if(a>0)continue}else if(a-qi>=0)continue;return{partIndex:g.partIndex,segmentIndex:g.segmentIndex,startTime:s+js({defaultDuration:n.targetDuration,durationList:l,startIndex:h,endIndex:m})}}return{segmentIndex:l[l.length-1].segmentIndex,partIndex:l[l.length-1].partIndex,startTime:e}},hc=function(n){return n.excludeUntil&&n.excludeUntil>Date.now()},To=function(n){return n.excludeUntil&&n.excludeUntil===1/0},Pr=function(n){const e=hc(n);return!n.disabled&&!e},Jp=function(n){return n.disabled},Zp=function(n){for(let e=0;e<n.segments.length;e++)if(n.segments[e].key)return!0;return!1},fc=function(n,e){return e.attributes&&e.attributes[n]},em=function(n,e,t,i=0){return fc("BANDWIDTH",t)?(n*t.attributes.BANDWIDTH-i*8)/e:NaN},Co=(n,e)=>{if(n.playlists.length===1)return!0;const t=e.attributes.BANDWIDTH||Number.MAX_VALUE;return n.playlists.filter(i=>Pr(i)?(i.attributes.BANDWIDTH||0)<t:!1).length===0},xo=(n,e)=>!n&&!e||!n&&e||n&&!e?!1:!!(n===e||n.id&&e.id&&n.id===e.id||n.resolvedUri&&e.resolvedUri&&n.resolvedUri===e.resolvedUri||n.uri&&e.uri&&n.uri===e.uri),pc=function(n,e){const t=n&&n.mediaGroups&&n.mediaGroups.AUDIO||{};let i=!1;for(const s in t){for(const r in t[s])if(i=e(t[s][r]),i)break;if(i)break}return!!i},Bs=n=>{if(!n||!n.playlists||!n.playlists.length)return pc(n,t=>t.playlists&&t.playlists.length||t.uri);for(let e=0;e<n.playlists.length;e++){const t=n.playlists[e],i=t.attributes&&t.attributes.CODECS;if(!(i&&i.split(",").every(r=>_e(r))||pc(n,r=>xo(t,r))))return!1}return!0};var zt={liveEdgeDelay:lc,duration:cc,seekable:Kp,getMediaInfoForTime:Qp,isEnabled:Pr,isDisabled:Jp,isExcluded:hc,isIncompatible:To,playlistEnd:dc,isAes:Zp,hasAttribute:fc,estimateSegmentRequestTime:em,isLowestEnabledRendition:Co,isAudioOnly:Bs,playlistMatch:xo,segmentDurationWithParts:bo};const{log:mc}=F,So=(n,e)=>`${n}-${e}`,tm=(n,e,t)=>`placeholder-uri-${n}-${e}-${t}`,im=({onwarn:n,oninfo:e,manifestString:t,customTagParsers:i=[],customTagMappers:s=[],llhls:r})=>{const a=new oe;n&&a.on("warn",n),e&&a.on("info",e),i.forEach(m=>a.addParser(m)),s.forEach(m=>a.addTagMapper(m)),a.push(t),a.end();const l=a.manifest;if(r||(["preloadSegment","skip","serverControl","renditionReports","partInf","partTargetDuration"].forEach(function(m){l.hasOwnProperty(m)&&delete l[m]}),l.segments&&l.segments.forEach(function(m){["parts","preloadHints"].forEach(function(g){m.hasOwnProperty(g)&&delete m[g]})})),!l.targetDuration){let m=10;l.segments&&l.segments.length&&(m=l.segments.reduce((g,E)=>Math.max(g,E.duration),0)),n&&n(`manifest has no targetDuration defaulting to ${m}`),l.targetDuration=m}const h=ac(l);if(h.length&&!l.partTargetDuration){const m=h.reduce((g,E)=>Math.max(g,E.duration),0);n&&(n(`manifest has no partTargetDuration defaulting to ${m}`),mc.error("LL-HLS manifest has parts but lacks required #EXT-X-PART-INF:PART-TARGET value. See https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-09#section-4.4.3.7. Playback is not guaranteed.")),l.partTargetDuration=m}return l},$n=(n,e)=>{n.mediaGroups&&["AUDIO","SUBTITLES"].forEach(t=>{if(n.mediaGroups[t])for(const i in n.mediaGroups[t])for(const s in n.mediaGroups[t][i]){const r=n.mediaGroups[t][i][s];e(r,t,i,s)}})},gc=({playlist:n,uri:e,id:t})=>{n.id=t,n.playlistErrors_=0,e&&(n.uri=e),n.attributes=n.attributes||{}},nm=n=>{let e=n.playlists.length;for(;e--;){const t=n.playlists[e];gc({playlist:t,id:So(e,t.uri)}),t.resolvedUri=Xt(n.uri,t.uri),n.playlists[t.id]=t,n.playlists[t.uri]=t,t.attributes.BANDWIDTH||mc.warn("Invalid playlist STREAM-INF detected. Missing BANDWIDTH attribute.")}},sm=n=>{$n(n,e=>{e.uri&&(e.resolvedUri=Xt(n.uri,e.uri))})},rm=(n,e)=>{const t=So(0,e),i={mediaGroups:{AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},uri:A().location.href,resolvedUri:A().location.href,playlists:[{uri:e,id:t,resolvedUri:e,attributes:{}}]};return i.playlists[t]=i.playlists[0],i.playlists[e]=i.playlists[0],i},vc=(n,e,t=tm)=>{n.uri=e;for(let s=0;s<n.playlists.length;s++)if(!n.playlists[s].uri){const r=`placeholder-uri-${s}`;n.playlists[s].uri=r}const i=Bs(n);$n(n,(s,r,a,l)=>{if(!s.playlists||!s.playlists.length){if(i&&r==="AUDIO"&&!s.uri)for(let h=0;h<n.playlists.length;h++){const m=n.playlists[h];if(m.attributes&&m.attributes.AUDIO&&m.attributes.AUDIO===a)return}s.playlists=[(0,We.Z)({},s)]}s.playlists.forEach(function(h,m){const g=t(r,a,l,h),E=So(m,g);h.uri?h.resolvedUri=h.resolvedUri||Xt(n.uri,h.uri):(h.uri=m===0?g:E,h.resolvedUri=h.uri),h.id=h.id||E,h.attributes=h.attributes||{},n.playlists[h.id]=h,n.playlists[h.uri]=h})}),nm(n),sm(n)};class Ac{constructor(){this.offset_=null,this.pendingDateRanges_=new Map,this.processedDateRanges_=new Map}setOffset(e=[]){if(this.offset_!==null||!e.length)return;const[t]=e;t.programDateTime!==void 0&&(this.offset_=t.programDateTime/1e3)}setPendingDateRanges(e=[]){if(!e.length)return;const[t]=e,i=t.startDate.getTime();this.trimProcessedDateRanges_(i),this.pendingDateRanges_=e.reduce((s,r)=>(s.set(r.id,r),s),new Map)}processDateRange(e){this.pendingDateRanges_.delete(e.id),this.processedDateRanges_.set(e.id,e)}getDateRangesToProcess(){if(this.offset_===null)return[];const e={},t=[];this.pendingDateRanges_.forEach((i,s)=>{if(!this.processedDateRanges_.has(s)&&(i.startTime=i.startDate.getTime()/1e3-this.offset_,i.processDateRange=()=>this.processDateRange(i),t.push(i),!!i.class))if(e[i.class]){const r=e[i.class].push(i);i.classListIndex=r-1}else e[i.class]=[i],i.classListIndex=0});for(const i of t){const s=e[i.class]||[];i.endDate?i.endTime=i.endDate.getTime()/1e3-this.offset_:i.endOnNext&&s[i.classListIndex+1]?i.endTime=s[i.classListIndex+1].startTime:i.duration?i.endTime=i.startTime+i.duration:i.plannedDuration?i.endTime=i.startTime+i.plannedDuration:i.endTime=i.startTime}return t}trimProcessedDateRanges_(e){new Map(this.processedDateRanges_).forEach((i,s)=>{i.startDate.getTime()<e&&this.processedDateRanges_.delete(s)})}}const{EventTarget:am}=F,om=(n,e)=>{if(e.endList||!e.serverControl)return n;const t={};if(e.serverControl.canBlockReload){const{preloadSegment:i}=e;let s=e.mediaSequence+e.segments.length;if(i){const r=i.parts||[],a=oc(e)-1;a>-1&&a!==r.length-1&&(t._HLS_part=a),(a>-1||r.length)&&s--}t._HLS_msn=s}if(e.serverControl&&e.serverControl.canSkipUntil&&(t._HLS_skip=e.serverControl.canSkipDateranges?"v2":"YES"),Object.keys(t).length){const i=new(A()).URL(n);["_HLS_skip","_HLS_msn","_HLS_part"].forEach(function(s){t.hasOwnProperty(s)&&i.searchParams.set(s,t[s])}),n=i.toString()}return n},lm=(n,e)=>{if(!n)return e;const t=Ye(n,e);if(n.preloadHints&&!e.preloadHints&&delete t.preloadHints,n.parts&&!e.parts)delete t.parts;else if(n.parts&&e.parts)for(let i=0;i<e.parts.length;i++)n.parts&&n.parts[i]&&(t.parts[i]=Ye(n.parts[i],e.parts[i]));return!n.skipped&&e.skipped&&(t.skipped=!1),n.preload&&!e.preload&&(t.preload=!1),t},um=(n,e,t)=>{const i=n.slice(),s=e.slice();t=t||0;const r=[];let a;for(let l=0;l<s.length;l++){const h=i[l+t],m=s[l];h?(a=h.map||a,r.push(lm(h,m))):(a&&!m.map&&(m.map=a),r.push(m))}return r},yc=(n,e)=>{!n.resolvedUri&&n.uri&&(n.resolvedUri=Xt(e,n.uri)),n.key&&!n.key.resolvedUri&&(n.key.resolvedUri=Xt(e,n.key.uri)),n.map&&!n.map.resolvedUri&&(n.map.resolvedUri=Xt(e,n.map.uri)),n.map&&n.map.key&&!n.map.key.resolvedUri&&(n.map.key.resolvedUri=Xt(e,n.map.key.uri)),n.parts&&n.parts.length&&n.parts.forEach(t=>{t.resolvedUri||(t.resolvedUri=Xt(e,t.uri))}),n.preloadHints&&n.preloadHints.length&&n.preloadHints.forEach(t=>{t.resolvedUri||(t.resolvedUri=Xt(e,t.uri))})},_c=function(n){const e=n.segments||[],t=n.preloadSegment;if(t&&t.parts&&t.parts.length){if(t.preloadHints){for(let i=0;i<t.preloadHints.length;i++)if(t.preloadHints[i].type==="MAP")return e}t.duration=n.targetDuration,t.preload=!0,e.push(t)}return e},bc=(n,e)=>n===e||n.segments&&e.segments&&n.segments.length===e.segments.length&&n.endList===e.endList&&n.mediaSequence===e.mediaSequence&&n.preloadSegment===e.preloadSegment,jo=(n,e,t=bc)=>{const i=Ye(n,{}),s=i.playlists[e.id];if(!s||t(s,e))return null;e.segments=_c(e);const r=Ye(s,e);if(r.preloadSegment&&!e.preloadSegment&&delete r.preloadSegment,s.segments){if(e.skip){e.segments=e.segments||[];for(let a=0;a<e.skip.skippedSegments;a++)e.segments.unshift({skipped:!0})}r.segments=um(s.segments,e.segments,e.mediaSequence-s.mediaSequence)}r.segments.forEach(a=>{yc(a,r.resolvedUri)});for(let a=0;a<i.playlists.length;a++)i.playlists[a].id===e.id&&(i.playlists[a]=r);return i.playlists[e.id]=r,i.playlists[e.uri]=r,$n(n,(a,l,h,m)=>{if(a.playlists)for(let g=0;g<a.playlists.length;g++)e.id===a.playlists[g].id&&(a.playlists[g]=r)}),i},Bo=(n,e)=>{const t=n.segments||[],i=t[t.length-1],s=i&&i.parts&&i.parts[i.parts.length-1],r=s&&s.duration||i&&i.duration;return e&&r?r*1e3:(n.partTargetDuration||n.targetDuration||10)*500};class Xn extends am{constructor(e,t,i={}){if(super(),!e)throw new Error("A non-empty playlist URL or object is required");this.logger_=ni("PlaylistLoader");const{withCredentials:s=!1}=i;this.src=e,this.vhs_=t,this.withCredentials=s,this.addDateRangesToTextTrack_=i.addDateRangesToTextTrack;const r=t.options_;this.customTagParsers=r&&r.customTagParsers||[],this.customTagMappers=r&&r.customTagMappers||[],this.llhls=r&&r.llhls,this.dateRangesStorage_=new Ac,this.state="HAVE_NOTHING",this.handleMediaupdatetimeout_=this.handleMediaupdatetimeout_.bind(this),this.on("mediaupdatetimeout",this.handleMediaupdatetimeout_),this.on("loadedplaylist",this.handleLoadedPlaylist_.bind(this))}handleLoadedPlaylist_(){const e=this.media();if(!e)return;this.dateRangesStorage_.setOffset(e.segments),this.dateRangesStorage_.setPendingDateRanges(e.dateRanges);const t=this.dateRangesStorage_.getDateRangesToProcess();!t.length||!this.addDateRangesToTextTrack_||this.addDateRangesToTextTrack_(t)}handleMediaupdatetimeout_(){if(this.state!=="HAVE_METADATA")return;const e=this.media();let t=Xt(this.main.uri,e.uri);this.llhls&&(t=om(t,e)),this.state="HAVE_CURRENT_METADATA",this.request=this.vhs_.xhr({uri:t,withCredentials:this.withCredentials},(i,s)=>{if(this.request){if(i)return this.playlistRequestError(this.request,this.media(),"HAVE_METADATA");this.haveMetadata({playlistString:this.request.responseText,url:this.media().uri,id:this.media().id})}})}playlistRequestError(e,t,i){const{uri:s,id:r}=t;this.request=null,i&&(this.state=i),this.error={playlist:this.main.playlists[r],status:e.status,message:`HLS playlist request error at URL: ${s}.`,responseText:e.responseText,code:e.status>=500?4:2},this.trigger("error")}parseManifest_({url:e,manifestString:t}){return im({onwarn:({message:i})=>this.logger_(`m3u8-parser warn for ${e}: ${i}`),oninfo:({message:i})=>this.logger_(`m3u8-parser info for ${e}: ${i}`),manifestString:t,customTagParsers:this.customTagParsers,customTagMappers:this.customTagMappers,llhls:this.llhls})}haveMetadata({playlistString:e,playlistObject:t,url:i,id:s}){this.request=null,this.state="HAVE_METADATA";const r=t||this.parseManifest_({url:i,manifestString:e});r.lastRequest=Date.now(),gc({playlist:r,uri:i,id:s});const a=jo(this.main,r);this.targetDuration=r.partTargetDuration||r.targetDuration,this.pendingMedia_=null,a?(this.main=a,this.media_=this.main.playlists[s]):this.trigger("playlistunchanged"),this.updateMediaUpdateTimeout_(Bo(this.media(),!!a)),this.trigger("loadedplaylist")}dispose(){this.trigger("dispose"),this.stopRequest(),A().clearTimeout(this.mediaUpdateTimeout),A().clearTimeout(this.finalRenditionTimeout),this.dateRangesStorage_=new Ac,this.off()}stopRequest(){if(this.request){const e=this.request;this.request=null,e.onreadystatechange=null,e.abort()}}media(e,t){if(!e)return this.media_;if(this.state==="HAVE_NOTHING")throw new Error("Cannot switch media playlist from "+this.state);if(typeof e=="string"){if(!this.main.playlists[e])throw new Error("Unknown playlist URI: "+e);e=this.main.playlists[e]}if(A().clearTimeout(this.finalRenditionTimeout),t){const a=(e.partTargetDuration||e.targetDuration)/2*1e3||5e3;this.finalRenditionTimeout=A().setTimeout(this.media.bind(this,e,!1),a);return}const i=this.state,s=!this.media_||e.id!==this.media_.id,r=this.main.playlists[e.id];if(r&&r.endList||e.endList&&e.segments.length){this.request&&(this.request.onreadystatechange=null,this.request.abort(),this.request=null),this.state="HAVE_METADATA",this.media_=e,s&&(this.trigger("mediachanging"),i==="HAVE_MAIN_MANIFEST"?this.trigger("loadedmetadata"):this.trigger("mediachange"));return}if(this.updateMediaUpdateTimeout_(Bo(e,!0)),!!s){if(this.state="SWITCHING_MEDIA",this.request){if(e.resolvedUri===this.request.url)return;this.request.onreadystatechange=null,this.request.abort(),this.request=null}this.media_&&this.trigger("mediachanging"),this.pendingMedia_=e,this.request=this.vhs_.xhr({uri:e.resolvedUri,withCredentials:this.withCredentials},(a,l)=>{if(this.request){if(e.lastRequest=Date.now(),e.resolvedUri=kr(e.resolvedUri,l),a)return this.playlistRequestError(this.request,e,i);this.haveMetadata({playlistString:l.responseText,url:e.uri,id:e.id}),i==="HAVE_MAIN_MANIFEST"?this.trigger("loadedmetadata"):this.trigger("mediachange")}})}}pause(){this.mediaUpdateTimeout&&(A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null),this.stopRequest(),this.state==="HAVE_NOTHING"&&(this.started=!1),this.state==="SWITCHING_MEDIA"?this.media_?this.state="HAVE_METADATA":this.state="HAVE_MAIN_MANIFEST":this.state==="HAVE_CURRENT_METADATA"&&(this.state="HAVE_METADATA")}load(e){this.mediaUpdateTimeout&&(A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null);const t=this.media();if(e){const i=t?(t.partTargetDuration||t.targetDuration)/2*1e3:5e3;this.mediaUpdateTimeout=A().setTimeout(()=>{this.mediaUpdateTimeout=null,this.load()},i);return}if(!this.started){this.start();return}t&&!t.endList?this.trigger("mediaupdatetimeout"):this.trigger("loadedplaylist")}updateMediaUpdateTimeout_(e){this.mediaUpdateTimeout&&(A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null),!(!this.media()||this.media().endList)&&(this.mediaUpdateTimeout=A().setTimeout(()=>{this.mediaUpdateTimeout=null,this.trigger("mediaupdatetimeout"),this.updateMediaUpdateTimeout_(e)},e))}start(){if(this.started=!0,typeof this.src=="object"){this.src.uri||(this.src.uri=A().location.href),this.src.resolvedUri=this.src.uri,setTimeout(()=>{this.setupInitialPlaylist(this.src)},0);return}this.request=this.vhs_.xhr({uri:this.src,withCredentials:this.withCredentials},(e,t)=>{if(!this.request)return;if(this.request=null,e)return this.error={status:t.status,message:`HLS playlist request error at URL: ${this.src}.`,responseText:t.responseText,code:2},this.state==="HAVE_NOTHING"&&(this.started=!1),this.trigger("error");this.src=kr(this.src,t);const i=this.parseManifest_({manifestString:t.responseText,url:this.src});this.setupInitialPlaylist(i)})}srcUri(){return typeof this.src=="string"?this.src:this.src.uri}setupInitialPlaylist(e){if(this.state="HAVE_MAIN_MANIFEST",e.playlists){this.main=e,vc(this.main,this.srcUri()),e.playlists.forEach(i=>{i.segments=_c(i),i.segments.forEach(s=>{yc(s,i.resolvedUri)})}),this.trigger("loadedplaylist"),this.request||this.media(this.main.playlists[0]);return}const t=this.srcUri()||A().location.href;this.main=rm(e,t),this.haveMetadata({playlistObject:e,url:t,id:this.main.playlists[0].id}),this.trigger("loadedmetadata")}}const{xhr:cm}=F,wo=function(n,e,t,i){const s=n.responseType==="arraybuffer"?n.response:n.responseText;!e&&s&&(n.responseTime=Date.now(),n.roundTripTime=n.responseTime-n.requestTime,n.bytesReceived=s.byteLength||s.length,n.bandwidth||(n.bandwidth=Math.floor(n.bytesReceived/n.roundTripTime*8*1e3))),t.headers&&(n.responseHeaders=t.headers),e&&e.code==="ETIMEDOUT"&&(n.timedout=!0),!e&&!n.aborted&&t.statusCode!==200&&t.statusCode!==206&&t.statusCode!==0&&(e=new Error("XHR Failed with a response of: "+(n&&(s||n.responseText)))),i(e,n)},dm=(n,e)=>{if(!n||!n.size)return;let t=e;return n.forEach(i=>{t=i(t)}),t},hm=(n,e,t,i)=>{!n||!n.size||n.forEach(s=>{s(e,t,i)})},Ec=function(){const n=function e(t,i){t=Ye({timeout:45e3},t);const s=e.beforeRequest||F.Vhs.xhr.beforeRequest,r=e._requestCallbackSet||F.Vhs.xhr._requestCallbackSet||new Set,a=e._responseCallbackSet||F.Vhs.xhr._responseCallbackSet;s&&typeof s=="function"&&(F.log.warn("beforeRequest is deprecated, use onRequest instead."),r.add(s));const l=F.Vhs.xhr.original===!0?cm:F.Vhs.xhr,h=dm(r,t);r.delete(s);const m=l(h||t,function(E,w){return hm(a,m,E,w),wo(m,E,w,i)}),g=m.abort;return m.abort=function(){return m.aborted=!0,g.apply(m,arguments)},m.uri=t.uri,m.requestTime=Date.now(),m};return n.original=!0,n},fm=function(n){let e;const t=n.offset;return typeof n.offset=="bigint"||typeof n.length=="bigint"?e=A().BigInt(n.offset)+A().BigInt(n.length)-A().BigInt(1):e=n.offset+n.length-1,"bytes="+t+"-"+e},Do=function(n){const e={};return n.byterange&&(e.Range=fm(n.byterange)),e},pm=function(n,e){return n.start(e)+"-"+n.end(e)},mm=function(n,e){const t=n.toString(16);return"00".substring(0,2-t.length)+t+(e%2?" ":"")},gm=function(n){return n>=32&&n<126?String.fromCharCode(n):"."},Tc=function(n){const e={};return Object.keys(n).forEach(t=>{const i=n[t];Si(i)?e[t]={bytes:i.buffer,byteOffset:i.byteOffset,byteLength:i.byteLength}:e[t]=i}),e},Lr=function(n){const e=n.byterange||{length:1/0,offset:0};return[e.length,e.offset,n.resolvedUri].join(",")},Cc=function(n){return n.resolvedUri},xc=n=>{const e=Array.prototype.slice.call(n),t=16;let i="",s,r;for(let a=0;a<e.length/t;a++)s=e.slice(a*t,a*t+t).map(mm).join(""),r=e.slice(a*t,a*t+t).map(gm).join(""),i+=s+" "+r+`
`;return i};var vm=Object.freeze({__proto__:null,createTransferableMessage:Tc,initSegmentId:Lr,segmentKeyId:Cc,hexDump:xc,tagDump:({bytes:n})=>xc(n),textRanges:n=>{let e="",t;for(t=0;t<n.length;t++)e+=pm(n,t)+" ";return e}});const Sc=.25,Am=(n,e)=>{if(!e.dateTimeObject)return null;const t=e.videoTimingInfo.transmuxerPrependedSeconds,s=e.videoTimingInfo.transmuxedPresentationStart+t,r=n-s;return new Date(e.dateTimeObject.getTime()+r*1e3)},ym=n=>n.transmuxedPresentationEnd-n.transmuxedPresentationStart-n.transmuxerPrependedSeconds,_m=(n,e)=>{let t;try{t=new Date(n)}catch(h){return null}if(!e||!e.segments||e.segments.length===0)return null;let i=e.segments[0];if(t<new Date(i.dateTimeObject))return null;for(let h=0;h<e.segments.length-1;h++){i=e.segments[h];const m=new Date(e.segments[h+1].dateTimeObject);if(t<m)break}const s=e.segments[e.segments.length-1],r=s.dateTimeObject,a=s.videoTimingInfo?ym(s.videoTimingInfo):s.duration+s.duration*Sc,l=new Date(r.getTime()+a*1e3);return t>l?null:(t>new Date(r)&&(i=s),{segment:i,estimatedStart:i.videoTimingInfo?i.videoTimingInfo.transmuxedPresentationStart:zt.duration(e,e.mediaSequence+e.segments.indexOf(i)),type:i.videoTimingInfo?"accurate":"estimate"})},bm=(n,e)=>{if(!e||!e.segments||e.segments.length===0)return null;let t=0,i;for(let r=0;r<e.segments.length&&(i=e.segments[r],t=i.videoTimingInfo?i.videoTimingInfo.transmuxedPresentationEnd:t+i.duration,!(n<=t));r++);const s=e.segments[e.segments.length-1];if(s.videoTimingInfo&&s.videoTimingInfo.transmuxedPresentationEnd<n)return null;if(n>t){if(n>t+s.duration*Sc)return null;i=s}return{segment:i,estimatedStart:i.videoTimingInfo?i.videoTimingInfo.transmuxedPresentationStart:t-i.duration,type:i.videoTimingInfo?"accurate":"estimate"}},Em=(n,e)=>{let t,i;try{t=new Date(n),i=new Date(e)}catch(a){}const s=t.getTime();return(i.getTime()-s)/1e3},Tm=n=>{if(!n.segments||n.segments.length===0)return!1;for(let e=0;e<n.segments.length;e++)if(!n.segments[e].dateTimeObject)return!1;return!0},Cm=({playlist:n,time:e=void 0,callback:t})=>{if(!t)throw new Error("getProgramTime: callback must be provided");if(!n||e===void 0)return t({message:"getProgramTime: playlist and time must be provided"});const i=bm(e,n);if(!i)return t({message:"valid programTime was not found"});if(i.type==="estimate")return t({message:"Accurate programTime could not be determined. Please seek to e.seekTime and try again",seekTime:i.estimatedStart});const s={mediaSeconds:e},r=Am(e,i.segment);return r&&(s.programDateTime=r.toISOString()),t(null,s)},jc=({programTime:n,playlist:e,retryCount:t=2,seekTo:i,pauseAfterSeek:s=!0,tech:r,callback:a})=>{if(!a)throw new Error("seekToProgramTime: callback must be provided");if(typeof n=="undefined"||!e||!i)return a({message:"seekToProgramTime: programTime, seekTo and playlist must be provided"});if(!e.endList&&!r.hasStarted_)return a({message:"player must be playing a live stream to start buffering"});if(!Tm(e))return a({message:"programDateTime tags must be provided in the manifest "+e.resolvedUri});const l=_m(n,e);if(!l)return a({message:`${n} was not found in the stream`});const h=l.segment,m=Em(h.dateTimeObject,n);if(l.type==="estimate"){if(t===0)return a({message:`${n} is not buffered yet. Try again`});i(l.estimatedStart+m),r.one("seeked",()=>{jc({programTime:n,playlist:e,retryCount:t-1,seekTo:i,pauseAfterSeek:s,tech:r,callback:a})});return}const g=h.start+m,E=()=>a(null,r.currentTime());r.one("seeked",E),s&&r.pause(),i(g)},ko=(n,e)=>{if(n.readyState===4)return e()},xm=(n,e,t)=>{let i=[],s,r=!1;const a=function(g,E,w,k){return E.abort(),r=!0,t(g,E,w,k)},l=function(g,E){if(r)return;if(g)return a(g,E,"",i);const w=E.responseText.substring(i&&i.byteLength||0,E.responseText.length);if(i=va(i,Yi(w,!0)),s=s||ds(i),i.length<10||s&&i.length<s+2)return ko(E,()=>a(g,E,"",i));const k=Ca(i);return k==="ts"&&i.length<188?ko(E,()=>a(g,E,"",i)):!k&&i.length<376?ko(E,()=>a(g,E,"",i)):a(null,E,k,i)},m=e({uri:n,beforeSend(g){g.overrideMimeType("text/plain; charset=x-user-defined"),g.addEventListener("progress",function({total:E,loaded:w}){return wo(g,null,{statusCode:g.status},l)})}},function(g,E){return wo(m,g,E,l)});return m},{EventTarget:Sm}=F,Bc=function(n,e){if(!bc(n,e)||n.sidx&&e.sidx&&(n.sidx.offset!==e.sidx.offset||n.sidx.length!==e.sidx.length))return!1;if(!n.sidx&&e.sidx||n.sidx&&!e.sidx||n.segments&&!e.segments||!n.segments&&e.segments)return!1;if(!n.segments&&!e.segments)return!0;for(let t=0;t<n.segments.length;t++){const i=n.segments[t],s=e.segments[t];if(i.uri!==s.uri)return!1;if(!i.byterange&&!s.byterange)continue;const r=i.byterange,a=s.byterange;if(r&&!a||!r&&a||r.offset!==a.offset||r.length!==a.length)return!1}return!0},jm=(n,e,t,i)=>{const s=i.attributes.NAME||t;return`placeholder-uri-${n}-${e}-${s}`},Bm=({mainXml:n,srcUrl:e,clientOffset:t,sidxMapping:i,previousManifest:s})=>{const r=Jh(n,{manifestUri:e,clientOffset:t,sidxMapping:i,previousManifest:s});return vc(r,e,jm),r},wm=(n,e)=>{$n(n,(t,i,s,r)=>{r in e.mediaGroups[i][s]||delete n.mediaGroups[i][s][r]})},Dm=(n,e,t)=>{let i=!0,s=Ye(n,{duration:e.duration,minimumUpdatePeriod:e.minimumUpdatePeriod,timelineStarts:e.timelineStarts});for(let r=0;r<e.playlists.length;r++){const a=e.playlists[r];if(a.sidx){const h=fi(a.sidx);t&&t[h]&&t[h].sidx&&xt(a,t[h].sidx,a.sidx.resolvedUri)}const l=jo(s,a,Bc);l&&(s=l,i=!1)}return $n(e,(r,a,l,h)=>{if(r.playlists&&r.playlists.length){const m=r.playlists[0].id,g=jo(s,r.playlists[0],Bc);g&&(s=g,h in s.mediaGroups[a][l]||(s.mediaGroups[a][l][h]=r),s.mediaGroups[a][l][h].playlists[0]=s.playlists[m],i=!1)}}),wm(s,e),e.minimumUpdatePeriod!==n.minimumUpdatePeriod&&(i=!1),i?null:s},km=(n,e)=>(!n.map&&!e.map||!!(n.map&&e.map&&n.map.byterange.offset===e.map.byterange.offset&&n.map.byterange.length===e.map.byterange.length))&&n.uri===e.uri&&n.byterange.offset===e.byterange.offset&&n.byterange.length===e.byterange.length,wc=(n,e)=>{const t={};for(const i in n){const r=n[i].sidx;if(r){const a=fi(r);if(!e[a])break;const l=e[a].sidxInfo;km(l,r)&&(t[a]=e[a])}}return t},Im=(n,e)=>{let i=wc(n.playlists,e);return $n(n,(s,r,a,l)=>{if(s.playlists&&s.playlists.length){const h=s.playlists;i=Ye(i,wc(h,e))}}),i};class Io extends Sm{constructor(e,t,i={},s){super(),this.mainPlaylistLoader_=s||this,s||(this.isMain_=!0);const{withCredentials:r=!1}=i;if(this.vhs_=t,this.withCredentials=r,this.addMetadataToTextTrack=i.addMetadataToTextTrack,!e)throw new Error("A non-empty playlist URL or object is required");this.on("minimumUpdatePeriod",()=>{this.refreshXml_()}),this.on("mediaupdatetimeout",()=>{this.media().attributes.serviceLocation||this.refreshMedia_(this.media().id)}),this.state="HAVE_NOTHING",this.loadedPlaylists_={},this.logger_=ni("DashPlaylistLoader"),this.isMain_?(this.mainPlaylistLoader_.srcUrl=e,this.mainPlaylistLoader_.sidxMapping_={}):this.childPlaylist_=e}requestErrored_(e,t,i){if(!this.request)return!0;if(this.request=null,e)return this.error=typeof e=="object"&&!(e instanceof Error)?e:{status:t.status,message:"DASH request error at URL: "+t.uri,response:t.response,code:2},i&&(this.state=i),this.trigger("error"),!0}addSidxSegments_(e,t,i){const s=e.sidx&&fi(e.sidx);if(!e.sidx||!s||this.mainPlaylistLoader_.sidxMapping_[s]){this.mediaRequest_=A().setTimeout(()=>i(!1),0);return}const r=kr(e.sidx.resolvedUri),a=(l,h)=>{if(this.requestErrored_(l,h,t))return;const m=this.mainPlaylistLoader_.sidxMapping_;let g;try{g=tf()(he(h.response).subarray(8))}catch(E){this.requestErrored_(E,h,t);return}return m[s]={sidxInfo:e.sidx,sidx:g},xt(e,g,e.sidx.resolvedUri),i(!0)};this.request=xm(r,this.vhs_.xhr,(l,h,m,g)=>{if(l)return a(l,h);if(!m||m!=="mp4")return a({status:h.status,message:`Unsupported ${m||"unknown"} container type for sidx segment at URL: ${r}`,response:"",playlist:e,internal:!0,playlistExclusionDuration:1/0,code:2},h);const{offset:E,length:w}=e.sidx.byterange;if(g.length>=w+E)return a(l,{response:g.subarray(E,E+w),status:h.status,uri:h.uri});this.request=this.vhs_.xhr({uri:r,responseType:"arraybuffer",headers:Do({byterange:e.sidx.byterange})},a)})}dispose(){this.trigger("dispose"),this.stopRequest(),this.loadedPlaylists_={},A().clearTimeout(this.minimumUpdatePeriodTimeout_),A().clearTimeout(this.mediaRequest_),A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null,this.mediaRequest_=null,this.minimumUpdatePeriodTimeout_=null,this.mainPlaylistLoader_.createMupOnMedia_&&(this.off("loadedmetadata",this.mainPlaylistLoader_.createMupOnMedia_),this.mainPlaylistLoader_.createMupOnMedia_=null),this.off()}hasPendingRequest(){return this.request||this.mediaRequest_}stopRequest(){if(this.request){const e=this.request;this.request=null,e.onreadystatechange=null,e.abort()}}media(e){if(!e)return this.media_;if(this.state==="HAVE_NOTHING")throw new Error("Cannot switch media playlist from "+this.state);const t=this.state;if(typeof e=="string"){if(!this.mainPlaylistLoader_.main.playlists[e])throw new Error("Unknown playlist URI: "+e);e=this.mainPlaylistLoader_.main.playlists[e]}const i=!this.media_||e.id!==this.media_.id;if(i&&this.loadedPlaylists_[e.id]&&this.loadedPlaylists_[e.id].endList){this.state="HAVE_METADATA",this.media_=e,i&&(this.trigger("mediachanging"),this.trigger("mediachange"));return}i&&(this.media_&&this.trigger("mediachanging"),this.addSidxSegments_(e,t,s=>{this.haveMetadata({startingState:t,playlist:e})}))}haveMetadata({startingState:e,playlist:t}){this.state="HAVE_METADATA",this.loadedPlaylists_[t.id]=t,this.mediaRequest_=null,this.refreshMedia_(t.id),e==="HAVE_MAIN_MANIFEST"?this.trigger("loadedmetadata"):this.trigger("mediachange")}pause(){this.mainPlaylistLoader_.createMupOnMedia_&&(this.off("loadedmetadata",this.mainPlaylistLoader_.createMupOnMedia_),this.mainPlaylistLoader_.createMupOnMedia_=null),this.stopRequest(),A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null,this.isMain_&&(A().clearTimeout(this.mainPlaylistLoader_.minimumUpdatePeriodTimeout_),this.mainPlaylistLoader_.minimumUpdatePeriodTimeout_=null),this.state==="HAVE_NOTHING"&&(this.started=!1)}load(e){A().clearTimeout(this.mediaUpdateTimeout),this.mediaUpdateTimeout=null;const t=this.media();if(e){const i=t?t.targetDuration/2*1e3:5e3;this.mediaUpdateTimeout=A().setTimeout(()=>this.load(),i);return}if(!this.started){this.start();return}t&&!t.endList?(this.isMain_&&!this.minimumUpdatePeriodTimeout_&&(this.trigger("minimumUpdatePeriod"),this.updateMinimumUpdatePeriodTimeout_()),this.trigger("mediaupdatetimeout")):this.trigger("loadedplaylist")}start(){if(this.started=!0,!this.isMain_){this.mediaRequest_=A().setTimeout(()=>this.haveMain_(),0);return}this.requestMain_((e,t)=>{this.haveMain_(),!this.hasPendingRequest()&&!this.media_&&this.media(this.mainPlaylistLoader_.main.playlists[0])})}requestMain_(e){this.request=this.vhs_.xhr({uri:this.mainPlaylistLoader_.srcUrl,withCredentials:this.withCredentials},(t,i)=>{if(this.requestErrored_(t,i)){this.state==="HAVE_NOTHING"&&(this.started=!1);return}const s=i.responseText!==this.mainPlaylistLoader_.mainXml_;if(this.mainPlaylistLoader_.mainXml_=i.responseText,i.responseHeaders&&i.responseHeaders.date?this.mainLoaded_=Date.parse(i.responseHeaders.date):this.mainLoaded_=Date.now(),this.mainPlaylistLoader_.srcUrl=kr(this.mainPlaylistLoader_.srcUrl,i),s){this.handleMain_(),this.syncClientServerClock_(()=>e(i,s));return}return e(i,s)})}syncClientServerClock_(e){const t=Zh(this.mainPlaylistLoader_.mainXml_);if(t===null)return this.mainPlaylistLoader_.clientOffset_=this.mainLoaded_-Date.now(),e();if(t.method==="DIRECT")return this.mainPlaylistLoader_.clientOffset_=t.value-Date.now(),e();this.request=this.vhs_.xhr({uri:Xt(this.mainPlaylistLoader_.srcUrl,t.value),method:t.method,withCredentials:this.withCredentials},(i,s)=>{if(!this.request)return;if(i)return this.mainPlaylistLoader_.clientOffset_=this.mainLoaded_-Date.now(),e();let r;t.method==="HEAD"?!s.responseHeaders||!s.responseHeaders.date?r=this.mainLoaded_:r=Date.parse(s.responseHeaders.date):r=Date.parse(s.responseText),this.mainPlaylistLoader_.clientOffset_=r-Date.now(),e()})}haveMain_(){this.state="HAVE_MAIN_MANIFEST",this.isMain_?this.trigger("loadedplaylist"):this.media_||this.media(this.childPlaylist_)}handleMain_(){this.mediaRequest_=null;const e=this.mainPlaylistLoader_.main;let t=Bm({mainXml:this.mainPlaylistLoader_.mainXml_,srcUrl:this.mainPlaylistLoader_.srcUrl,clientOffset:this.mainPlaylistLoader_.clientOffset_,sidxMapping:this.mainPlaylistLoader_.sidxMapping_,previousManifest:e});e&&(t=Dm(e,t,this.mainPlaylistLoader_.sidxMapping_)),this.mainPlaylistLoader_.main=t||e;const i=this.mainPlaylistLoader_.main.locations&&this.mainPlaylistLoader_.main.locations[0];return i&&i!==this.mainPlaylistLoader_.srcUrl&&(this.mainPlaylistLoader_.srcUrl=i),(!e||t&&t.minimumUpdatePeriod!==e.minimumUpdatePeriod)&&this.updateMinimumUpdatePeriodTimeout_(),this.addEventStreamToMetadataTrack_(t),!!t}updateMinimumUpdatePeriodTimeout_(){const e=this.mainPlaylistLoader_;e.createMupOnMedia_&&(e.off("loadedmetadata",e.createMupOnMedia_),e.createMupOnMedia_=null),e.minimumUpdatePeriodTimeout_&&(A().clearTimeout(e.minimumUpdatePeriodTimeout_),e.minimumUpdatePeriodTimeout_=null);let t=e.main&&e.main.minimumUpdatePeriod;if(t===0&&(e.media()?t=e.media().targetDuration*1e3:(e.createMupOnMedia_=e.updateMinimumUpdatePeriodTimeout_,e.one("loadedmetadata",e.createMupOnMedia_))),typeof t!="number"||t<=0){t<0&&this.logger_(`found invalid minimumUpdatePeriod of ${t}, not setting a timeout`);return}this.createMUPTimeout_(t)}createMUPTimeout_(e){const t=this.mainPlaylistLoader_;t.minimumUpdatePeriodTimeout_=A().setTimeout(()=>{t.minimumUpdatePeriodTimeout_=null,t.trigger("minimumUpdatePeriod"),t.createMUPTimeout_(e)},e)}refreshXml_(){this.requestMain_((e,t)=>{t&&(this.media_&&(this.media_=this.mainPlaylistLoader_.main.playlists[this.media_.id]),this.mainPlaylistLoader_.sidxMapping_=Im(this.mainPlaylistLoader_.main,this.mainPlaylistLoader_.sidxMapping_),this.addSidxSegments_(this.media(),this.state,i=>{this.refreshMedia_(this.media().id)}))})}refreshMedia_(e){if(!e)throw new Error("refreshMedia_ must take a media id");this.media_&&this.isMain_&&this.handleMain_();const t=this.mainPlaylistLoader_.main.playlists,i=!this.media_||this.media_!==t[e];if(i?this.media_=t[e]:this.trigger("playlistunchanged"),!this.mediaUpdateTimeout){const s=()=>{this.media().endList||(this.mediaUpdateTimeout=A().setTimeout(()=>{this.trigger("mediaupdatetimeout"),s()},Bo(this.media(),!!i)))};s()}this.trigger("loadedplaylist")}addEventStreamToMetadataTrack_(e){if(e&&this.mainPlaylistLoader_.main.eventStream){const t=this.mainPlaylistLoader_.main.eventStream.map(i=>({cueTime:i.start,frames:[{data:i.messageData}]}));this.addMetadataToTextTrack("EventStream",t,this.mainPlaylistLoader_.main.duration)}}}var St={GOAL_BUFFER_LENGTH:30,MAX_GOAL_BUFFER_LENGTH:60,BACK_BUFFER_LENGTH:30,GOAL_BUFFER_LENGTH_RATE:1,INITIAL_BANDWIDTH:4194304,BANDWIDTH_VARIANCE:1.2,BUFFER_LOW_WATER_LINE:0,MAX_BUFFER_LOW_WATER_LINE:30,EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE:16,BUFFER_LOW_WATER_LINE_RATE:1,BUFFER_HIGH_WATER_LINE:30};const Pm=n=>{const e=new Uint8Array(new ArrayBuffer(n.length));for(let t=0;t<n.length;t++)e[t]=n.charCodeAt(t);return e.buffer},Dc=function(n){return n.on=n.addEventListener,n.off=n.removeEventListener,n},Lm=function(n){try{return URL.createObjectURL(new Blob([n],{type:"application/javascript"}))}catch(e){const t=new BlobBuilder;return t.append(n),URL.createObjectURL(t.getBlob())}},kc=function(n){return function(){const e=Lm(n),t=Dc(new Worker(e));t.objURL=e;const i=t.terminate;return t.on=t.addEventListener,t.off=t.removeEventListener,t.terminate=function(){return URL.revokeObjectURL(e),i.call(this)},t}},Ic=function(n){return`var browserWorkerPolyFill = ${Dc.toString()};
browserWorkerPolyFill(self);
`+n},Pc=function(n){return n.toString().replace(/^function.+?{/,"").slice(0,-1)},Om=Ic(Pc(function(){var n=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof z.g!="undefined"?z.g:typeof self!="undefined"?self:{},e=function(){this.init=function(){var o={};this.on=function(u,d){o[u]||(o[u]=[]),o[u]=o[u].concat(d)},this.off=function(u,d){var c;return o[u]?(c=o[u].indexOf(d),o[u]=o[u].slice(),o[u].splice(c,1),c>-1):!1},this.trigger=function(u){var d,c,f,p;if(d=o[u],!!d)if(arguments.length===2)for(f=d.length,c=0;c<f;++c)d[c].call(this,arguments[1]);else{for(p=[],c=arguments.length,c=1;c<arguments.length;++c)p.push(arguments[c]);for(f=d.length,c=0;c<f;++c)d[c].apply(this,p)}},this.dispose=function(){o={}}}};e.prototype.pipe=function(o){return this.on("data",function(u){o.push(u)}),this.on("done",function(u){o.flush(u)}),this.on("partialdone",function(u){o.partialFlush(u)}),this.on("endedtimeline",function(u){o.endTimeline(u)}),this.on("reset",function(u){o.reset(u)}),o},e.prototype.push=function(o){this.trigger("data",o)},e.prototype.flush=function(o){this.trigger("done",o)},e.prototype.partialFlush=function(o){this.trigger("partialdone",o)},e.prototype.endTimeline=function(o){this.trigger("endedtimeline",o)},e.prototype.reset=function(o){this.trigger("reset",o)};var t=e,i=Math.pow(2,32),s=function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),d;return u.getBigUint64?(d=u.getBigUint64(0),d<Number.MAX_SAFE_INTEGER?Number(d):d):u.getUint32(0)*i+u.getUint32(4)},r={getUint64:s,MAX_UINT32:i},a=r.MAX_UINT32,l,h,m,g,E,w,k,x,L,V,H,R,Z,q,P,de,Ee,Ue,He,mt,wt,gt,Se,Qe,Ci,Li,Wi,on,ln,un,cn,dn,Vr,Td,Cd,xd;(function(){var o;if(Se={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],mvex:[],mvhd:[],pasp:[],sdtp:[],smhd:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],styp:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[]},typeof Uint8Array!="undefined"){for(o in Se)Se.hasOwnProperty(o)&&(Se[o]=[o.charCodeAt(0),o.charCodeAt(1),o.charCodeAt(2),o.charCodeAt(3)]);Qe=new Uint8Array([105,115,111,109]),Li=new Uint8Array([97,118,99,49]),Ci=new Uint8Array([0,0,0,1]),Wi=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),on=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0]),ln={video:Wi,audio:on},dn=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),cn=new Uint8Array([0,0,0,0,0,0,0,0]),Vr=new Uint8Array([0,0,0,0,0,0,0,0]),Td=Vr,Cd=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),xd=Vr,un=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0])}})(),l=function(o){var u=[],d=0,c,f,p;for(c=1;c<arguments.length;c++)u.push(arguments[c]);for(c=u.length;c--;)d+=u[c].byteLength;for(f=new Uint8Array(d+8),p=new DataView(f.buffer,f.byteOffset,f.byteLength),p.setUint32(0,f.byteLength),f.set(o,4),c=0,d=8;c<u.length;c++)f.set(u[c],d),d+=u[c].byteLength;return f},h=function(){return l(Se.dinf,l(Se.dref,dn))},m=function(o){return l(Se.esds,new Uint8Array([0,0,0,0,3,25,0,0,0,4,17,64,21,0,6,0,0,0,218,192,0,0,218,192,5,2,o.audioobjecttype<<3|o.samplingfrequencyindex>>>1,o.samplingfrequencyindex<<7|o.channelcount<<3,6,1,2]))},g=function(){return l(Se.ftyp,Qe,Ci,Qe,Li)},de=function(o){return l(Se.hdlr,ln[o])},E=function(o){return l(Se.mdat,o)},P=function(o){var u=new Uint8Array([0,0,0,0,0,0,0,2,0,0,0,3,0,1,95,144,o.duration>>>24&255,o.duration>>>16&255,o.duration>>>8&255,o.duration&255,85,196,0,0]);return o.samplerate&&(u[12]=o.samplerate>>>24&255,u[13]=o.samplerate>>>16&255,u[14]=o.samplerate>>>8&255,u[15]=o.samplerate&255),l(Se.mdhd,u)},q=function(o){return l(Se.mdia,P(o),de(o.type),k(o))},w=function(o){return l(Se.mfhd,new Uint8Array([0,0,0,0,(o&4278190080)>>24,(o&16711680)>>16,(o&65280)>>8,o&255]))},k=function(o){return l(Se.minf,o.type==="video"?l(Se.vmhd,un):l(Se.smhd,cn),h(),Ue(o))},x=function(o,u){for(var d=[],c=u.length;c--;)d[c]=mt(u[c]);return l.apply(null,[Se.moof,w(o)].concat(d))},L=function(o){for(var u=o.length,d=[];u--;)d[u]=R(o[u]);return l.apply(null,[Se.moov,H(4294967295)].concat(d).concat(V(o)))},V=function(o){for(var u=o.length,d=[];u--;)d[u]=wt(o[u]);return l.apply(null,[Se.mvex].concat(d))},H=function(o){var u=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,2,0,1,95,144,(o&4278190080)>>24,(o&16711680)>>16,(o&65280)>>8,o&255,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255]);return l(Se.mvhd,u)},Ee=function(o){var u=o.samples||[],d=new Uint8Array(4+u.length),c,f;for(f=0;f<u.length;f++)c=u[f].flags,d[f+4]=c.dependsOn<<4|c.isDependedOn<<2|c.hasRedundancy;return l(Se.sdtp,d)},Ue=function(o){return l(Se.stbl,He(o),l(Se.stts,xd),l(Se.stsc,Td),l(Se.stsz,Cd),l(Se.stco,Vr))},function(){var o,u;He=function(d){return l(Se.stsd,new Uint8Array([0,0,0,0,0,0,0,1]),d.type==="video"?o(d):u(d))},o=function(d){var c=d.sps||[],f=d.pps||[],p=[],b=[],T,S;for(T=0;T<c.length;T++)p.push((c[T].byteLength&65280)>>>8),p.push(c[T].byteLength&255),p=p.concat(Array.prototype.slice.call(c[T]));for(T=0;T<f.length;T++)b.push((f[T].byteLength&65280)>>>8),b.push(f[T].byteLength&255),b=b.concat(Array.prototype.slice.call(f[T]));if(S=[Se.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,(d.width&65280)>>8,d.width&255,(d.height&65280)>>8,d.height&255,0,72,0,0,0,72,0,0,0,0,0,0,0,1,19,118,105,100,101,111,106,115,45,99,111,110,116,114,105,98,45,104,108,115,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),l(Se.avcC,new Uint8Array([1,d.profileIdc,d.profileCompatibility,d.levelIdc,255].concat([c.length],p,[f.length],b))),l(Se.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192]))],d.sarRatio){var j=d.sarRatio[0],D=d.sarRatio[1];S.push(l(Se.pasp,new Uint8Array([(j&4278190080)>>24,(j&16711680)>>16,(j&65280)>>8,j&255,(D&4278190080)>>24,(D&16711680)>>16,(D&65280)>>8,D&255])))}return l.apply(null,S)},u=function(d){return l(Se.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,(d.channelcount&65280)>>8,d.channelcount&255,(d.samplesize&65280)>>8,d.samplesize&255,0,0,0,0,(d.samplerate&65280)>>8,d.samplerate&255,0,0]),m(d))}}(),Z=function(o){var u=new Uint8Array([0,0,0,7,0,0,0,0,0,0,0,0,(o.id&4278190080)>>24,(o.id&16711680)>>16,(o.id&65280)>>8,o.id&255,0,0,0,0,(o.duration&4278190080)>>24,(o.duration&16711680)>>16,(o.duration&65280)>>8,o.duration&255,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,(o.width&65280)>>8,o.width&255,0,0,(o.height&65280)>>8,o.height&255,0,0]);return l(Se.tkhd,u)},mt=function(o){var u,d,c,f,p,b,T;return u=l(Se.tfhd,new Uint8Array([0,0,0,58,(o.id&4278190080)>>24,(o.id&16711680)>>16,(o.id&65280)>>8,o.id&255,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0])),b=Math.floor(o.baseMediaDecodeTime/a),T=Math.floor(o.baseMediaDecodeTime%a),d=l(Se.tfdt,new Uint8Array([1,0,0,0,b>>>24&255,b>>>16&255,b>>>8&255,b&255,T>>>24&255,T>>>16&255,T>>>8&255,T&255])),p=92,o.type==="audio"?(c=gt(o,p),l(Se.traf,u,d,c)):(f=Ee(o),c=gt(o,f.length+p),l(Se.traf,u,d,c,f))},R=function(o){return o.duration=o.duration||4294967295,l(Se.trak,Z(o),q(o))},wt=function(o){var u=new Uint8Array([0,0,0,0,(o.id&4278190080)>>24,(o.id&16711680)>>16,(o.id&65280)>>8,o.id&255,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]);return o.type!=="video"&&(u[u.length-1]=0),l(Se.trex,u)},function(){var o,u,d;d=function(c,f){var p=0,b=0,T=0,S=0;return c.length&&(c[0].duration!==void 0&&(p=1),c[0].size!==void 0&&(b=2),c[0].flags!==void 0&&(T=4),c[0].compositionTimeOffset!==void 0&&(S=8)),[0,0,p|b|T|S,1,(c.length&4278190080)>>>24,(c.length&16711680)>>>16,(c.length&65280)>>>8,c.length&255,(f&4278190080)>>>24,(f&16711680)>>>16,(f&65280)>>>8,f&255]},u=function(c,f){var p,b,T,S,j,D;for(S=c.samples||[],f+=20+16*S.length,T=d(S,f),b=new Uint8Array(T.length+S.length*16),b.set(T),p=T.length,D=0;D<S.length;D++)j=S[D],b[p++]=(j.duration&4278190080)>>>24,b[p++]=(j.duration&16711680)>>>16,b[p++]=(j.duration&65280)>>>8,b[p++]=j.duration&255,b[p++]=(j.size&4278190080)>>>24,b[p++]=(j.size&16711680)>>>16,b[p++]=(j.size&65280)>>>8,b[p++]=j.size&255,b[p++]=j.flags.isLeading<<2|j.flags.dependsOn,b[p++]=j.flags.isDependedOn<<6|j.flags.hasRedundancy<<4|j.flags.paddingValue<<1|j.flags.isNonSyncSample,b[p++]=j.flags.degradationPriority&61440,b[p++]=j.flags.degradationPriority&15,b[p++]=(j.compositionTimeOffset&4278190080)>>>24,b[p++]=(j.compositionTimeOffset&16711680)>>>16,b[p++]=(j.compositionTimeOffset&65280)>>>8,b[p++]=j.compositionTimeOffset&255;return l(Se.trun,b)},o=function(c,f){var p,b,T,S,j,D;for(S=c.samples||[],f+=20+8*S.length,T=d(S,f),p=new Uint8Array(T.length+S.length*8),p.set(T),b=T.length,D=0;D<S.length;D++)j=S[D],p[b++]=(j.duration&4278190080)>>>24,p[b++]=(j.duration&16711680)>>>16,p[b++]=(j.duration&65280)>>>8,p[b++]=j.duration&255,p[b++]=(j.size&4278190080)>>>24,p[b++]=(j.size&16711680)>>>16,p[b++]=(j.size&65280)>>>8,p[b++]=j.size&255;return l(Se.trun,p)},gt=function(c,f){return c.type==="audio"?o(c,f):u(c,f)}}();var g0={ftyp:g,mdat:E,moof:x,moov:L,initSegment:function(o){var u=g(),d=L(o),c;return c=new Uint8Array(u.byteLength+d.byteLength),c.set(u),c.set(d,u.byteLength),c}},v0=function(o){var u,d,c=[],f=[];for(f.byteLength=0,f.nalCount=0,f.duration=0,c.byteLength=0,u=0;u<o.length;u++)d=o[u],d.nalUnitType==="access_unit_delimiter_rbsp"?(c.length&&(c.duration=d.dts-c.dts,f.byteLength+=c.byteLength,f.nalCount+=c.length,f.duration+=c.duration,f.push(c)),c=[d],c.byteLength=d.data.byteLength,c.pts=d.pts,c.dts=d.dts):(d.nalUnitType==="slice_layer_without_partitioning_rbsp_idr"&&(c.keyFrame=!0),c.duration=d.dts-c.dts,c.byteLength+=d.data.byteLength,c.push(d));return f.length&&(!c.duration||c.duration<=0)&&(c.duration=f[f.length-1].duration),f.byteLength+=c.byteLength,f.nalCount+=c.length,f.duration+=c.duration,f.push(c),f},A0=function(o){var u,d,c=[],f=[];for(c.byteLength=0,c.nalCount=0,c.duration=0,c.pts=o[0].pts,c.dts=o[0].dts,f.byteLength=0,f.nalCount=0,f.duration=0,f.pts=o[0].pts,f.dts=o[0].dts,u=0;u<o.length;u++)d=o[u],d.keyFrame?(c.length&&(f.push(c),f.byteLength+=c.byteLength,f.nalCount+=c.nalCount,f.duration+=c.duration),c=[d],c.nalCount=d.length,c.byteLength=d.byteLength,c.pts=d.pts,c.dts=d.dts,c.duration=d.duration):(c.duration+=d.duration,c.nalCount+=d.length,c.byteLength+=d.byteLength,c.push(d));return f.length&&c.duration<=0&&(c.duration=f[f.length-1].duration),f.byteLength+=c.byteLength,f.nalCount+=c.nalCount,f.duration+=c.duration,f.push(c),f},y0=function(o){var u;return!o[0][0].keyFrame&&o.length>1&&(u=o.shift(),o.byteLength-=u.byteLength,o.nalCount-=u.nalCount,o[0][0].dts=u.dts,o[0][0].pts=u.pts,o[0][0].duration+=u.duration),o},_0=function(){return{size:0,flags:{isLeading:0,dependsOn:1,isDependedOn:0,hasRedundancy:0,degradationPriority:0,isNonSyncSample:1}}},Sd=function(o,u){var d=_0();return d.dataOffset=u,d.compositionTimeOffset=o.pts-o.dts,d.duration=o.duration,d.size=4*o.length,d.size+=o.byteLength,o.keyFrame&&(d.flags.dependsOn=2,d.flags.isNonSyncSample=0),d},b0=function(o,u){var d,c,f,p,b,T=u||0,S=[];for(d=0;d<o.length;d++)for(p=o[d],c=0;c<p.length;c++)b=p[c],f=Sd(b,T),T+=f.size,S.push(f);return S},E0=function(o){var u,d,c,f,p,b,T=0,S=o.byteLength,j=o.nalCount,D=S+4*j,M=new Uint8Array(D),ve=new DataView(M.buffer);for(u=0;u<o.length;u++)for(f=o[u],d=0;d<f.length;d++)for(p=f[d],c=0;c<p.length;c++)b=p[c],ve.setUint32(T,b.data.byteLength),T+=4,M.set(b.data,T),T+=b.data.byteLength;return M},T0=function(o,u){var d,c=u||0,f=[];return d=Sd(o,c),f.push(d),f},C0=function(o){var u,d,c=0,f=o.byteLength,p=o.length,b=f+4*p,T=new Uint8Array(b),S=new DataView(T.buffer);for(u=0;u<o.length;u++)d=o[u],S.setUint32(c,d.data.byteLength),c+=4,T.set(d.data,c),c+=d.data.byteLength;return T},x0={groupNalsIntoFrames:v0,groupFramesIntoGops:A0,extendFirstKeyFrame:y0,generateSampleTable:b0,concatenateNalData:E0,generateSampleTableForFrame:T0,concatenateNalDataForFrame:C0},Gi=[33,16,5,32,164,27],Fo=[33,65,108,84,1,2,4,8,168,2,4,8,17,191,252],Ge=function(o){for(var u=[];o--;)u.push(0);return u},S0=function(o){return Object.keys(o).reduce(function(u,d){return u[d]=new Uint8Array(o[d].reduce(function(c,f){return c.concat(f)},[])),u},{})},Vo,j0=function(){if(!Vo){var o={96e3:[Gi,[227,64],Ge(154),[56]],88200:[Gi,[231],Ge(170),[56]],64e3:[Gi,[248,192],Ge(240),[56]],48e3:[Gi,[255,192],Ge(268),[55,148,128],Ge(54),[112]],44100:[Gi,[255,192],Ge(268),[55,163,128],Ge(84),[112]],32e3:[Gi,[255,192],Ge(268),[55,234],Ge(226),[112]],24e3:[Gi,[255,192],Ge(268),[55,255,128],Ge(268),[111,112],Ge(126),[224]],16e3:[Gi,[255,192],Ge(268),[55,255,128],Ge(268),[111,255],Ge(269),[223,108],Ge(195),[1,192]],12e3:[Fo,Ge(268),[3,127,248],Ge(268),[6,255,240],Ge(268),[13,255,224],Ge(268),[27,253,128],Ge(259),[56]],11025:[Fo,Ge(268),[3,127,248],Ge(268),[6,255,240],Ge(268),[13,255,224],Ge(268),[27,255,192],Ge(268),[55,175,128],Ge(108),[112]],8e3:[Fo,Ge(268),[3,121,16],Ge(47),[7]]};Vo=S0(o)}return Vo},zo=9e4,Ho,qo,zr,Wo,jd,Bd,wd;Ho=function(o){return o*zo},qo=function(o,u){return o*u},zr=function(o){return o/zo},Wo=function(o,u){return o/u},jd=function(o,u){return Ho(Wo(o,u))},Bd=function(o,u){return qo(zr(o),u)},wd=function(o,u,d){return zr(d?o:o-u)};var rt={ONE_SECOND_IN_TS:zo,secondsToVideoTs:Ho,secondsToAudioTs:qo,videoTsToSeconds:zr,audioTsToSeconds:Wo,audioTsToVideoTs:jd,videoTsToAudioTs:Bd,metadataTsToSeconds:wd},B0=j0,Hr=rt,w0=function(o){var u,d,c=0;for(u=0;u<o.length;u++)d=o[u],c+=d.data.byteLength;return c},D0=function(o,u,d,c){var f,p=0,b=0,T=0,S=0,j,D,M;if(u.length&&(f=Hr.audioTsToVideoTs(o.baseMediaDecodeTime,o.samplerate),p=Math.ceil(Hr.ONE_SECOND_IN_TS/(o.samplerate/1024)),d&&c&&(b=f-Math.max(d,c),T=Math.floor(b/p),S=T*p),!(T<1||S>Hr.ONE_SECOND_IN_TS/2))){for(j=B0()[o.samplerate],j||(j=u[0].data),D=0;D<T;D++)M=u[0],u.splice(0,0,{data:j,dts:M.dts-p,pts:M.pts-p});return o.baseMediaDecodeTime-=Math.floor(Hr.videoTsToAudioTs(S,o.samplerate)),S}},k0=function(o,u,d){return u.minSegmentDts>=d?o:(u.minSegmentDts=1/0,o.filter(function(c){return c.dts>=d?(u.minSegmentDts=Math.min(u.minSegmentDts,c.dts),u.minSegmentPts=u.minSegmentDts,!0):!1}))},I0=function(o){var u,d,c=[];for(u=0;u<o.length;u++)d=o[u],c.push({size:d.data.byteLength,duration:1024});return c},P0=function(o){var u,d,c=0,f=new Uint8Array(w0(o));for(u=0;u<o.length;u++)d=o[u],f.set(d.data,c),c+=d.data.byteLength;return f},L0={prefixWithSilence:D0,trimAdtsFramesByEarliestDts:k0,generateSampleTable:I0,concatenateFrameData:P0},O0=rt.ONE_SECOND_IN_TS,R0=function(o,u){typeof u.pts=="number"&&(o.timelineStartInfo.pts===void 0&&(o.timelineStartInfo.pts=u.pts),o.minSegmentPts===void 0?o.minSegmentPts=u.pts:o.minSegmentPts=Math.min(o.minSegmentPts,u.pts),o.maxSegmentPts===void 0?o.maxSegmentPts=u.pts:o.maxSegmentPts=Math.max(o.maxSegmentPts,u.pts)),typeof u.dts=="number"&&(o.timelineStartInfo.dts===void 0&&(o.timelineStartInfo.dts=u.dts),o.minSegmentDts===void 0?o.minSegmentDts=u.dts:o.minSegmentDts=Math.min(o.minSegmentDts,u.dts),o.maxSegmentDts===void 0?o.maxSegmentDts=u.dts:o.maxSegmentDts=Math.max(o.maxSegmentDts,u.dts))},N0=function(o){delete o.minSegmentDts,delete o.maxSegmentDts,delete o.minSegmentPts,delete o.maxSegmentPts},M0=function(o,u){var d,c,f=o.minSegmentDts;return u||(f-=o.timelineStartInfo.dts),d=o.timelineStartInfo.baseMediaDecodeTime,d+=f,d=Math.max(0,d),o.type==="audio"&&(c=o.samplerate/O0,d*=c,d=Math.floor(d)),d},U0={clearDtsInfo:N0,calculateTrackBaseMediaDecodeTime:M0,collectDtsInfo:R0},Dd=4,F0=128,V0=function(o){for(var u=0,d={payloadType:-1,payloadSize:0},c=0,f=0;u<o.byteLength&&o[u]!==F0;){for(;o[u]===255;)c+=255,u++;for(c+=o[u++];o[u]===255;)f+=255,u++;if(f+=o[u++],!d.payload&&c===Dd){var p=String.fromCharCode(o[u+3],o[u+4],o[u+5],o[u+6]);if(p==="GA94"){d.payloadType=c,d.payloadSize=f,d.payload=o.subarray(u,u+f);break}else d.payload=void 0}u+=f,c=0,f=0}return d},z0=function(o){return o.payload[0]!==181||(o.payload[1]<<8|o.payload[2])!==49||String.fromCharCode(o.payload[3],o.payload[4],o.payload[5],o.payload[6])!=="GA94"||o.payload[7]!==3?null:o.payload.subarray(8,o.payload.length-1)},H0=function(o,u){var d=[],c,f,p,b;if(!(u[0]&64))return d;for(f=u[0]&31,c=0;c<f;c++)p=c*3,b={type:u[p+2]&3,pts:o},u[p+2]&4&&(b.ccData=u[p+3]<<8|u[p+4],d.push(b));return d},q0=function(o){for(var u=o.byteLength,d=[],c=1,f,p;c<u-2;)o[c]===0&&o[c+1]===0&&o[c+2]===3?(d.push(c+2),c+=2):c++;if(d.length===0)return o;f=u-d.length,p=new Uint8Array(f);var b=0;for(c=0;c<f;b++,c++)b===d[0]&&(b++,d.shift()),p[c]=o[b];return p},kd={parseSei:V0,parseUserData:z0,parseCaptionPackets:H0,discardEmulationPreventionBytes:q0,USER_DATA_REGISTERED_ITU_T_T35:Dd},Go=t,qr=kd,Ht=function(o){o=o||{},Ht.prototype.init.call(this),this.parse708captions_=typeof o.parse708captions=="boolean"?o.parse708captions:!0,this.captionPackets_=[],this.ccStreams_=[new lt(0,0),new lt(0,1),new lt(1,0),new lt(1,1)],this.parse708captions_&&(this.cc708Stream_=new Je({captionServices:o.captionServices})),this.reset(),this.ccStreams_.forEach(function(u){u.on("data",this.trigger.bind(this,"data")),u.on("partialdone",this.trigger.bind(this,"partialdone")),u.on("done",this.trigger.bind(this,"done"))},this),this.parse708captions_&&(this.cc708Stream_.on("data",this.trigger.bind(this,"data")),this.cc708Stream_.on("partialdone",this.trigger.bind(this,"partialdone")),this.cc708Stream_.on("done",this.trigger.bind(this,"done")))};Ht.prototype=new Go,Ht.prototype.push=function(o){var u,d,c;if(o.nalUnitType==="sei_rbsp"&&(u=qr.parseSei(o.escapedRBSP),!!u.payload&&u.payloadType===qr.USER_DATA_REGISTERED_ITU_T_T35&&(d=qr.parseUserData(u),!!d))){if(o.dts<this.latestDts_){this.ignoreNextEqualDts_=!0;return}else if(o.dts===this.latestDts_&&this.ignoreNextEqualDts_){this.numSameDts_--,this.numSameDts_||(this.ignoreNextEqualDts_=!1);return}c=qr.parseCaptionPackets(o.pts,d),this.captionPackets_=this.captionPackets_.concat(c),this.latestDts_!==o.dts&&(this.numSameDts_=0),this.numSameDts_++,this.latestDts_=o.dts}},Ht.prototype.flushCCStreams=function(o){this.ccStreams_.forEach(function(u){return o==="flush"?u.flush():u.partialFlush()},this)},Ht.prototype.flushStream=function(o){if(!this.captionPackets_.length){this.flushCCStreams(o);return}this.captionPackets_.forEach(function(u,d){u.presortIndex=d}),this.captionPackets_.sort(function(u,d){return u.pts===d.pts?u.presortIndex-d.presortIndex:u.pts-d.pts}),this.captionPackets_.forEach(function(u){u.type<2?this.dispatchCea608Packet(u):this.dispatchCea708Packet(u)},this),this.captionPackets_.length=0,this.flushCCStreams(o)},Ht.prototype.flush=function(){return this.flushStream("flush")},Ht.prototype.partialFlush=function(){return this.flushStream("partialFlush")},Ht.prototype.reset=function(){this.latestDts_=null,this.ignoreNextEqualDts_=!1,this.numSameDts_=0,this.activeCea608Channel_=[null,null],this.ccStreams_.forEach(function(o){o.reset()})},Ht.prototype.dispatchCea608Packet=function(o){this.setsTextOrXDSActive(o)?this.activeCea608Channel_[o.type]=null:this.setsChannel1Active(o)?this.activeCea608Channel_[o.type]=0:this.setsChannel2Active(o)&&(this.activeCea608Channel_[o.type]=1),this.activeCea608Channel_[o.type]!==null&&this.ccStreams_[(o.type<<1)+this.activeCea608Channel_[o.type]].push(o)},Ht.prototype.setsChannel1Active=function(o){return(o.ccData&30720)===4096},Ht.prototype.setsChannel2Active=function(o){return(o.ccData&30720)===6144},Ht.prototype.setsTextOrXDSActive=function(o){return(o.ccData&28928)===256||(o.ccData&30974)===4138||(o.ccData&30974)===6186},Ht.prototype.dispatchCea708Packet=function(o){this.parse708captions_&&this.cc708Stream_.push(o)};var W0={127:9834,4128:32,4129:160,4133:8230,4138:352,4140:338,4144:9608,4145:8216,4146:8217,4147:8220,4148:8221,4149:8226,4153:8482,4154:353,4156:339,4157:8480,4159:376,4214:8539,4215:8540,4216:8541,4217:8542,4218:9168,4219:9124,4220:9123,4221:9135,4222:9126,4223:9121,4256:12600},G0=function(o){var u=W0[o]||o;return o&4096&&o===u?"":String.fromCharCode(u)},Wr=function(o){return 32<=o&&o<=127||160<=o&&o<=255},Oi=function(o){this.windowNum=o,this.reset()};Oi.prototype.reset=function(){this.clearText(),this.pendingNewLine=!1,this.winAttr={},this.penAttr={},this.penLoc={},this.penColor={},this.visible=0,this.rowLock=0,this.columnLock=0,this.priority=0,this.relativePositioning=0,this.anchorVertical=0,this.anchorHorizontal=0,this.anchorPoint=0,this.rowCount=1,this.virtualRowCount=this.rowCount+1,this.columnCount=41,this.windowStyle=0,this.penStyle=0},Oi.prototype.getText=function(){return this.rows.join(`
`)},Oi.prototype.clearText=function(){this.rows=[""],this.rowIdx=0},Oi.prototype.newLine=function(o){for(this.rows.length>=this.virtualRowCount&&typeof this.beforeRowOverflow=="function"&&this.beforeRowOverflow(o),this.rows.length>0&&(this.rows.push(""),this.rowIdx++);this.rows.length>this.virtualRowCount;)this.rows.shift(),this.rowIdx--},Oi.prototype.isEmpty=function(){return this.rows.length===0?!0:this.rows.length===1?this.rows[0]==="":!1},Oi.prototype.addText=function(o){this.rows[this.rowIdx]+=o},Oi.prototype.backspace=function(){if(!this.isEmpty()){var o=this.rows[this.rowIdx];this.rows[this.rowIdx]=o.substr(0,o.length-1)}};var Gr=function(o,u,d){this.serviceNum=o,this.text="",this.currentWindow=new Oi(-1),this.windows=[],this.stream=d,typeof u=="string"&&this.createTextDecoder(u)};Gr.prototype.init=function(o,u){this.startPts=o;for(var d=0;d<8;d++)this.windows[d]=new Oi(d),typeof u=="function"&&(this.windows[d].beforeRowOverflow=u)},Gr.prototype.setCurrentWindow=function(o){this.currentWindow=this.windows[o]},Gr.prototype.createTextDecoder=function(o){if(typeof TextDecoder=="undefined")this.stream.trigger("log",{level:"warn",message:"The `encoding` option is unsupported without TextDecoder support"});else try{this.textDecoder_=new TextDecoder(o)}catch(u){this.stream.trigger("log",{level:"warn",message:"TextDecoder could not be created with "+o+" encoding. "+u})}};var Je=function(o){o=o||{},Je.prototype.init.call(this);var u=this,d=o.captionServices||{},c={},f;Object.keys(d).forEach(p=>{f=d[p],/^SERVICE/.test(p)&&(c[p]=f.encoding)}),this.serviceEncodings=c,this.current708Packet=null,this.services={},this.push=function(p){p.type===3?(u.new708Packet(),u.add708Bytes(p)):(u.current708Packet===null&&u.new708Packet(),u.add708Bytes(p))}};Je.prototype=new Go,Je.prototype.new708Packet=function(){this.current708Packet!==null&&this.push708Packet(),this.current708Packet={data:[],ptsVals:[]}},Je.prototype.add708Bytes=function(o){var u=o.ccData,d=u>>>8,c=u&255;this.current708Packet.ptsVals.push(o.pts),this.current708Packet.data.push(d),this.current708Packet.data.push(c)},Je.prototype.push708Packet=function(){var o=this.current708Packet,u=o.data,d=null,c=null,f=0,p=u[f++];for(o.seq=p>>6,o.sizeCode=p&63;f<u.length;f++)p=u[f++],d=p>>5,c=p&31,d===7&&c>0&&(p=u[f++],d=p),this.pushServiceBlock(d,f,c),c>0&&(f+=c-1)},Je.prototype.pushServiceBlock=function(o,u,d){var c,f=u,p=this.current708Packet.data,b=this.services[o];for(b||(b=this.initService(o,f));f<u+d&&f<p.length;f++)c=p[f],Wr(c)?f=this.handleText(f,b):c===24?f=this.multiByteCharacter(f,b):c===16?f=this.extendedCommands(f,b):128<=c&&c<=135?f=this.setCurrentWindow(f,b):152<=c&&c<=159?f=this.defineWindow(f,b):c===136?f=this.clearWindows(f,b):c===140?f=this.deleteWindows(f,b):c===137?f=this.displayWindows(f,b):c===138?f=this.hideWindows(f,b):c===139?f=this.toggleWindows(f,b):c===151?f=this.setWindowAttributes(f,b):c===144?f=this.setPenAttributes(f,b):c===145?f=this.setPenColor(f,b):c===146?f=this.setPenLocation(f,b):c===143?b=this.reset(f,b):c===8?b.currentWindow.backspace():c===12?b.currentWindow.clearText():c===13?b.currentWindow.pendingNewLine=!0:c===14?b.currentWindow.clearText():c===141&&f++},Je.prototype.extendedCommands=function(o,u){var d=this.current708Packet.data,c=d[++o];return Wr(c)&&(o=this.handleText(o,u,{isExtended:!0})),o},Je.prototype.getPts=function(o){return this.current708Packet.ptsVals[Math.floor(o/2)]},Je.prototype.initService=function(o,u){var c="SERVICE"+o,d=this,c,f;return c in this.serviceEncodings&&(f=this.serviceEncodings[c]),this.services[o]=new Gr(o,f,d),this.services[o].init(this.getPts(u),function(p){d.flushDisplayed(p,d.services[o])}),this.services[o]},Je.prototype.handleText=function(o,u,d){var c=d&&d.isExtended,f=d&&d.isMultiByte,p=this.current708Packet.data,b=c?4096:0,T=p[o],S=p[o+1],j=u.currentWindow,D,M;function ve(Y){return Y.map(je=>("0"+(je&255).toString(16)).slice(-2)).join("")}if(f?(M=[T,S],o++):M=[T],u.textDecoder_&&!c)D=u.textDecoder_.decode(new Uint8Array(M));else if(f){const Y=ve(M);D=String.fromCharCode(parseInt(Y,16))}else D=G0(b|T);return j.pendingNewLine&&!j.isEmpty()&&j.newLine(this.getPts(o)),j.pendingNewLine=!1,j.addText(D),o},Je.prototype.multiByteCharacter=function(o,u){var d=this.current708Packet.data,c=d[o+1],f=d[o+2];return Wr(c)&&Wr(f)&&(o=this.handleText(++o,u,{isMultiByte:!0})),o},Je.prototype.setCurrentWindow=function(o,u){var d=this.current708Packet.data,c=d[o],f=c&7;return u.setCurrentWindow(f),o},Je.prototype.defineWindow=function(o,u){var d=this.current708Packet.data,c=d[o],f=c&7;u.setCurrentWindow(f);var p=u.currentWindow;return c=d[++o],p.visible=(c&32)>>5,p.rowLock=(c&16)>>4,p.columnLock=(c&8)>>3,p.priority=c&7,c=d[++o],p.relativePositioning=(c&128)>>7,p.anchorVertical=c&127,c=d[++o],p.anchorHorizontal=c,c=d[++o],p.anchorPoint=(c&240)>>4,p.rowCount=c&15,c=d[++o],p.columnCount=c&63,c=d[++o],p.windowStyle=(c&56)>>3,p.penStyle=c&7,p.virtualRowCount=p.rowCount+1,o},Je.prototype.setWindowAttributes=function(o,u){var d=this.current708Packet.data,c=d[o],f=u.currentWindow.winAttr;return c=d[++o],f.fillOpacity=(c&192)>>6,f.fillRed=(c&48)>>4,f.fillGreen=(c&12)>>2,f.fillBlue=c&3,c=d[++o],f.borderType=(c&192)>>6,f.borderRed=(c&48)>>4,f.borderGreen=(c&12)>>2,f.borderBlue=c&3,c=d[++o],f.borderType+=(c&128)>>5,f.wordWrap=(c&64)>>6,f.printDirection=(c&48)>>4,f.scrollDirection=(c&12)>>2,f.justify=c&3,c=d[++o],f.effectSpeed=(c&240)>>4,f.effectDirection=(c&12)>>2,f.displayEffect=c&3,o},Je.prototype.flushDisplayed=function(o,u){for(var d=[],c=0;c<8;c++)u.windows[c].visible&&!u.windows[c].isEmpty()&&d.push(u.windows[c].getText());u.endPts=o,u.text=d.join(`

`),this.pushCaption(u),u.startPts=o},Je.prototype.pushCaption=function(o){o.text!==""&&(this.trigger("data",{startPts:o.startPts,endPts:o.endPts,text:o.text,stream:"cc708_"+o.serviceNum}),o.text="",o.startPts=o.endPts)},Je.prototype.displayWindows=function(o,u){var d=this.current708Packet.data,c=d[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var p=0;p<8;p++)c&1<<p&&(u.windows[p].visible=1);return o},Je.prototype.hideWindows=function(o,u){var d=this.current708Packet.data,c=d[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var p=0;p<8;p++)c&1<<p&&(u.windows[p].visible=0);return o},Je.prototype.toggleWindows=function(o,u){var d=this.current708Packet.data,c=d[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var p=0;p<8;p++)c&1<<p&&(u.windows[p].visible^=1);return o},Je.prototype.clearWindows=function(o,u){var d=this.current708Packet.data,c=d[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var p=0;p<8;p++)c&1<<p&&u.windows[p].clearText();return o},Je.prototype.deleteWindows=function(o,u){var d=this.current708Packet.data,c=d[++o],f=this.getPts(o);this.flushDisplayed(f,u);for(var p=0;p<8;p++)c&1<<p&&u.windows[p].reset();return o},Je.prototype.setPenAttributes=function(o,u){var d=this.current708Packet.data,c=d[o],f=u.currentWindow.penAttr;return c=d[++o],f.textTag=(c&240)>>4,f.offset=(c&12)>>2,f.penSize=c&3,c=d[++o],f.italics=(c&128)>>7,f.underline=(c&64)>>6,f.edgeType=(c&56)>>3,f.fontStyle=c&7,o},Je.prototype.setPenColor=function(o,u){var d=this.current708Packet.data,c=d[o],f=u.currentWindow.penColor;return c=d[++o],f.fgOpacity=(c&192)>>6,f.fgRed=(c&48)>>4,f.fgGreen=(c&12)>>2,f.fgBlue=c&3,c=d[++o],f.bgOpacity=(c&192)>>6,f.bgRed=(c&48)>>4,f.bgGreen=(c&12)>>2,f.bgBlue=c&3,c=d[++o],f.edgeRed=(c&48)>>4,f.edgeGreen=(c&12)>>2,f.edgeBlue=c&3,o},Je.prototype.setPenLocation=function(o,u){var d=this.current708Packet.data,c=d[o],f=u.currentWindow.penLoc;return u.currentWindow.pendingNewLine=!0,c=d[++o],f.row=c&15,c=d[++o],f.column=c&63,o},Je.prototype.reset=function(o,u){var d=this.getPts(o);return this.flushDisplayed(d,u),this.initService(u.serviceNum,o)};var $0={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608,304:174,305:176,306:189,307:191,308:8482,309:162,310:163,311:9834,312:224,313:160,314:232,315:226,316:234,317:238,318:244,319:251,544:193,545:201,546:211,547:218,548:220,549:252,550:8216,551:161,552:42,553:39,554:8212,555:169,556:8480,557:8226,558:8220,559:8221,560:192,561:194,562:199,563:200,564:202,565:203,566:235,567:206,568:207,569:239,570:212,571:217,572:249,573:219,574:171,575:187,800:195,801:227,802:205,803:204,804:236,805:210,806:242,807:213,808:245,809:123,810:125,811:92,812:94,813:95,814:124,815:126,816:196,817:228,818:214,819:246,820:223,821:165,822:164,823:9474,824:197,825:229,826:216,827:248,828:9484,829:9488,830:9492,831:9496},$r=function(o){return o===null?"":(o=$0[o]||o,String.fromCharCode(o))},Xr=14,X0=[4352,4384,4608,4640,5376,5408,5632,5664,5888,5920,4096,4864,4896,5120,5152],hn=function(){for(var o=[],u=Xr+1;u--;)o.push({text:"",indent:0,offset:0});return o},lt=function(o,u){lt.prototype.init.call(this),this.field_=o||0,this.dataChannel_=u||0,this.name_="CC"+((this.field_<<1|this.dataChannel_)+1),this.setConstants(),this.reset(),this.push=function(d){var c,f,p,b,T;if(c=d.ccData&32639,c===this.lastControlCode_){this.lastControlCode_=null;return}if((c&61440)===4096?this.lastControlCode_=c:c!==this.PADDING_&&(this.lastControlCode_=null),p=c>>>8,b=c&255,c!==this.PADDING_)if(c===this.RESUME_CAPTION_LOADING_)this.mode_="popOn";else if(c===this.END_OF_CAPTION_)this.mode_="popOn",this.clearFormatting(d.pts),this.flushDisplayed(d.pts),f=this.displayed_,this.displayed_=this.nonDisplayed_,this.nonDisplayed_=f,this.startPts_=d.pts;else if(c===this.ROLL_UP_2_ROWS_)this.rollUpRows_=2,this.setRollUp(d.pts);else if(c===this.ROLL_UP_3_ROWS_)this.rollUpRows_=3,this.setRollUp(d.pts);else if(c===this.ROLL_UP_4_ROWS_)this.rollUpRows_=4,this.setRollUp(d.pts);else if(c===this.CARRIAGE_RETURN_)this.clearFormatting(d.pts),this.flushDisplayed(d.pts),this.shiftRowsUp_(),this.startPts_=d.pts;else if(c===this.BACKSPACE_)this.mode_==="popOn"?this.nonDisplayed_[this.row_].text=this.nonDisplayed_[this.row_].text.slice(0,-1):this.displayed_[this.row_].text=this.displayed_[this.row_].text.slice(0,-1);else if(c===this.ERASE_DISPLAYED_MEMORY_)this.flushDisplayed(d.pts),this.displayed_=hn();else if(c===this.ERASE_NON_DISPLAYED_MEMORY_)this.nonDisplayed_=hn();else if(c===this.RESUME_DIRECT_CAPTIONING_)this.mode_!=="paintOn"&&(this.flushDisplayed(d.pts),this.displayed_=hn()),this.mode_="paintOn",this.startPts_=d.pts;else if(this.isSpecialCharacter(p,b))p=(p&3)<<8,T=$r(p|b),this[this.mode_](d.pts,T),this.column_++;else if(this.isExtCharacter(p,b))this.mode_==="popOn"?this.nonDisplayed_[this.row_].text=this.nonDisplayed_[this.row_].text.slice(0,-1):this.displayed_[this.row_].text=this.displayed_[this.row_].text.slice(0,-1),p=(p&3)<<8,T=$r(p|b),this[this.mode_](d.pts,T),this.column_++;else if(this.isMidRowCode(p,b))this.clearFormatting(d.pts),this[this.mode_](d.pts," "),this.column_++,(b&14)===14&&this.addFormatting(d.pts,["i"]),(b&1)===1&&this.addFormatting(d.pts,["u"]);else if(this.isOffsetControlCode(p,b)){const j=b&3;this.nonDisplayed_[this.row_].offset=j,this.column_+=j}else if(this.isPAC(p,b)){var S=X0.indexOf(c&7968);if(this.mode_==="rollUp"&&(S-this.rollUpRows_+1<0&&(S=this.rollUpRows_-1),this.setRollUp(d.pts,S)),S!==this.row_&&(this.clearFormatting(d.pts),this.row_=S),b&1&&this.formatting_.indexOf("u")===-1&&this.addFormatting(d.pts,["u"]),(c&16)===16){const j=(c&14)>>1;this.column_=j*4,this.nonDisplayed_[this.row_].indent+=j}this.isColorPAC(b)&&(b&14)===14&&this.addFormatting(d.pts,["i"])}else this.isNormalChar(p)&&(b===0&&(b=null),T=$r(p),T+=$r(b),this[this.mode_](d.pts,T),this.column_+=T.length)}};lt.prototype=new Go,lt.prototype.flushDisplayed=function(o){const u=c=>{this.trigger("log",{level:"warn",message:"Skipping a malformed 608 caption at index "+c+"."})},d=[];this.displayed_.forEach((c,f)=>{if(c&&c.text&&c.text.length){try{c.text=c.text.trim()}catch(p){u(f)}c.text.length&&d.push({text:c.text,line:f+1,position:10+Math.min(70,c.indent*10)+c.offset*2.5})}else c==null&&u(f)}),d.length&&this.trigger("data",{startPts:this.startPts_,endPts:o,content:d,stream:this.name_})},lt.prototype.reset=function(){this.mode_="popOn",this.topRow_=0,this.startPts_=0,this.displayed_=hn(),this.nonDisplayed_=hn(),this.lastControlCode_=null,this.column_=0,this.row_=Xr,this.rollUpRows_=2,this.formatting_=[]},lt.prototype.setConstants=function(){this.dataChannel_===0?(this.BASE_=16,this.EXT_=17,this.CONTROL_=(20|this.field_)<<8,this.OFFSET_=23):this.dataChannel_===1&&(this.BASE_=24,this.EXT_=25,this.CONTROL_=(28|this.field_)<<8,this.OFFSET_=31),this.PADDING_=0,this.RESUME_CAPTION_LOADING_=this.CONTROL_|32,this.END_OF_CAPTION_=this.CONTROL_|47,this.ROLL_UP_2_ROWS_=this.CONTROL_|37,this.ROLL_UP_3_ROWS_=this.CONTROL_|38,this.ROLL_UP_4_ROWS_=this.CONTROL_|39,this.CARRIAGE_RETURN_=this.CONTROL_|45,this.RESUME_DIRECT_CAPTIONING_=this.CONTROL_|41,this.BACKSPACE_=this.CONTROL_|33,this.ERASE_DISPLAYED_MEMORY_=this.CONTROL_|44,this.ERASE_NON_DISPLAYED_MEMORY_=this.CONTROL_|46},lt.prototype.isSpecialCharacter=function(o,u){return o===this.EXT_&&u>=48&&u<=63},lt.prototype.isExtCharacter=function(o,u){return(o===this.EXT_+1||o===this.EXT_+2)&&u>=32&&u<=63},lt.prototype.isMidRowCode=function(o,u){return o===this.EXT_&&u>=32&&u<=47},lt.prototype.isOffsetControlCode=function(o,u){return o===this.OFFSET_&&u>=33&&u<=35},lt.prototype.isPAC=function(o,u){return o>=this.BASE_&&o<this.BASE_+8&&u>=64&&u<=127},lt.prototype.isColorPAC=function(o){return o>=64&&o<=79||o>=96&&o<=127},lt.prototype.isNormalChar=function(o){return o>=32&&o<=127},lt.prototype.setRollUp=function(o,u){if(this.mode_!=="rollUp"&&(this.row_=Xr,this.mode_="rollUp",this.flushDisplayed(o),this.nonDisplayed_=hn(),this.displayed_=hn()),u!==void 0&&u!==this.row_)for(var d=0;d<this.rollUpRows_;d++)this.displayed_[u-d]=this.displayed_[this.row_-d],this.displayed_[this.row_-d]={text:"",indent:0,offset:0};u===void 0&&(u=this.row_),this.topRow_=u-this.rollUpRows_+1},lt.prototype.addFormatting=function(o,u){this.formatting_=this.formatting_.concat(u);var d=u.reduce(function(c,f){return c+"<"+f+">"},"");this[this.mode_](o,d)},lt.prototype.clearFormatting=function(o){if(this.formatting_.length){var u=this.formatting_.reverse().reduce(function(d,c){return d+"</"+c+">"},"");this.formatting_=[],this[this.mode_](o,u)}},lt.prototype.popOn=function(o,u){var d=this.nonDisplayed_[this.row_].text;d+=u,this.nonDisplayed_[this.row_].text=d},lt.prototype.rollUp=function(o,u){var d=this.displayed_[this.row_].text;d+=u,this.displayed_[this.row_].text=d},lt.prototype.shiftRowsUp_=function(){var o;for(o=0;o<this.topRow_;o++)this.displayed_[o]={text:"",indent:0,offset:0};for(o=this.row_+1;o<Xr+1;o++)this.displayed_[o]={text:"",indent:0,offset:0};for(o=this.topRow_;o<this.row_;o++)this.displayed_[o]=this.displayed_[o+1];this.displayed_[this.row_]={text:"",indent:0,offset:0}},lt.prototype.paintOn=function(o,u){var d=this.displayed_[this.row_].text;d+=u,this.displayed_[this.row_].text=d};var Id={CaptionStream:Ht,Cea608Stream:lt,Cea708Stream:Je},Yr={H264_STREAM_TYPE:27,ADTS_STREAM_TYPE:15,METADATA_STREAM_TYPE:21},Y0=t,K0=8589934592,Q0=4294967296,Pd="shared",$o=function(o,u){var d=1;for(o>u&&(d=-1);Math.abs(u-o)>Q0;)o+=d*K0;return o},Xo=function(o){var u,d;Xo.prototype.init.call(this),this.type_=o||Pd,this.push=function(c){this.type_!==Pd&&c.type!==this.type_||(d===void 0&&(d=c.dts),c.dts=$o(c.dts,d),c.pts=$o(c.pts,d),u=c.dts,this.trigger("data",c))},this.flush=function(){d=u,this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")},this.discontinuity=function(){d=void 0,u=void 0},this.reset=function(){this.discontinuity(),this.trigger("reset")}};Xo.prototype=new Y0;var Ld={TimestampRolloverStream:Xo,handleRollover:$o},J0=(o,u,d)=>{if(!o)return-1;for(var c=d;c<o.length;c++)if(o[c]===u)return c;return-1},Z0={typedArrayIndexOf:J0},Kr=Z0.typedArrayIndexOf,Qr={Iso88591:0,Utf16:1,Utf16be:2,Utf8:3},Od=function(o,u,d){var c,f="";for(c=u;c<d;c++)f+="%"+("00"+o[c].toString(16)).slice(-2);return f},Ps=function(o,u,d){return decodeURIComponent(Od(o,u,d))},Ls=function(o,u,d){return unescape(Od(o,u,d))},Os=function(o){return o[0]<<21|o[1]<<14|o[2]<<7|o[3]},Rs={APIC:function(o){var u=1,d,c,f="-->";o.data[0]===Qr.Utf8&&(d=Kr(o.data,0,u),!(d<0)&&(o.mimeType=Ls(o.data,u,d),u=d+1,o.pictureType=o.data[u],u++,c=Kr(o.data,0,u),!(c<0)&&(o.description=Ps(o.data,u,c),u=c+1,o.mimeType===f?o.url=Ls(o.data,u,o.data.length):o.pictureData=o.data.subarray(u,o.data.length))))},"T*":function(o){o.data[0]===Qr.Utf8&&(o.value=Ps(o.data,1,o.data.length).replace(/\0*$/,""),o.values=o.value.split("\0"))},TXXX:function(o){var u;o.data[0]===Qr.Utf8&&(u=Kr(o.data,0,1),u!==-1&&(o.description=Ps(o.data,1,u),o.value=Ps(o.data,u+1,o.data.length).replace(/\0*$/,""),o.data=o.value))},"W*":function(o){o.url=Ls(o.data,0,o.data.length).replace(/\0.*$/,"")},WXXX:function(o){var u;o.data[0]===Qr.Utf8&&(u=Kr(o.data,0,1),u!==-1&&(o.description=Ps(o.data,1,u),o.url=Ls(o.data,u+1,o.data.length).replace(/\0.*$/,"")))},PRIV:function(o){var u;for(u=0;u<o.data.length;u++)if(o.data[u]===0){o.owner=Ls(o.data,0,u);break}o.privateData=o.data.subarray(u+1),o.data=o.privateData}},ev=function(o){var u,d,c=10,f=0,p=[];if(!(o.length<10||o[0]!==73||o[1]!==68||o[2]!==51)){f=Os(o.subarray(6,10)),f+=10;var b=o[5]&64;b&&(c+=4,c+=Os(o.subarray(10,14)),f-=Os(o.subarray(16,20)));do{if(u=Os(o.subarray(c+4,c+8)),u<1)break;d=String.fromCharCode(o[c],o[c+1],o[c+2],o[c+3]);var T={id:d,data:o.subarray(c+10,c+u+10)};T.key=T.id,Rs[T.id]?Rs[T.id](T):T.id[0]==="T"?Rs["T*"](T):T.id[0]==="W"&&Rs["W*"](T),p.push(T),c+=10,c+=u}while(c<f);return p}},Rd={parseId3Frames:ev,parseSyncSafeInteger:Os,frameParsers:Rs},tv=t,iv=Yr,$i=Rd,Jr;Jr=function(o){var u={descriptor:o&&o.descriptor},d=0,c=[],f=0,p;if(Jr.prototype.init.call(this),this.dispatchType=iv.METADATA_STREAM_TYPE.toString(16),u.descriptor)for(p=0;p<u.descriptor.length;p++)this.dispatchType+=("00"+u.descriptor[p].toString(16)).slice(-2);this.push=function(b){var T,S,j,D,M,ve;if(b.type==="timed-metadata"){if(b.dataAlignmentIndicator&&(f=0,c.length=0),c.length===0&&(b.data.length<10||b.data[0]!==73||b.data[1]!==68||b.data[2]!==51)){this.trigger("log",{level:"warn",message:"Skipping unrecognized metadata packet"});return}if(c.push(b),f+=b.data.byteLength,c.length===1&&(d=$i.parseSyncSafeInteger(b.data.subarray(6,10)),d+=10),!(f<d)){for(T={data:new Uint8Array(d),frames:[],pts:c[0].pts,dts:c[0].dts},M=0;M<d;)T.data.set(c[0].data.subarray(0,d-M),M),M+=c[0].data.byteLength,f-=c[0].data.byteLength,c.shift();S=10,T.data[5]&64&&(S+=4,S+=$i.parseSyncSafeInteger(T.data.subarray(10,14)),d-=$i.parseSyncSafeInteger(T.data.subarray(16,20)));do{if(j=$i.parseSyncSafeInteger(T.data.subarray(S+4,S+8)),j<1){this.trigger("log",{level:"warn",message:"Malformed ID3 frame encountered. Skipping remaining metadata parsing."});break}if(ve=String.fromCharCode(T.data[S],T.data[S+1],T.data[S+2],T.data[S+3]),D={id:ve,data:T.data.subarray(S+10,S+j+10)},D.key=D.id,$i.frameParsers[D.id]?$i.frameParsers[D.id](D):D.id[0]==="T"?$i.frameParsers["T*"](D):D.id[0]==="W"&&$i.frameParsers["W*"](D),D.owner==="com.apple.streaming.transportStreamTimestamp"){var Y=D.data,je=(Y[3]&1)<<30|Y[4]<<22|Y[5]<<14|Y[6]<<6|Y[7]>>>2;je*=4,je+=Y[7]&3,D.timeStamp=je,T.pts===void 0&&T.dts===void 0&&(T.pts=D.timeStamp,T.dts=D.timeStamp),this.trigger("timestamp",D)}T.frames.push(D),S+=10,S+=j}while(S<d);this.trigger("data",T)}}}},Jr.prototype=new tv;var nv=Jr,Yo=t,Ko=Id,oi=Yr,sv=Ld.TimestampRolloverStream,Zr,Ns,ea,Jn=188,Qo=71;Zr=function(){var o=new Uint8Array(Jn),u=0;Zr.prototype.init.call(this),this.push=function(d){var c=0,f=Jn,p;for(u?(p=new Uint8Array(d.byteLength+u),p.set(o.subarray(0,u)),p.set(d,u),u=0):p=d;f<p.byteLength;){if(p[c]===Qo&&p[f]===Qo){this.trigger("data",p.subarray(c,f)),c+=Jn,f+=Jn;continue}c++,f++}c<p.byteLength&&(o.set(p.subarray(c),0),u=p.byteLength-c)},this.flush=function(){u===Jn&&o[0]===Qo&&(this.trigger("data",o),u=0),this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")},this.reset=function(){u=0,this.trigger("reset")}},Zr.prototype=new Yo,Ns=function(){var o,u,d,c;Ns.prototype.init.call(this),c=this,this.packetsWaitingForPmt=[],this.programMapTable=void 0,o=function(f,p){var b=0;p.payloadUnitStartIndicator&&(b+=f[b]+1),p.type==="pat"?u(f.subarray(b),p):d(f.subarray(b),p)},u=function(f,p){p.section_number=f[7],p.last_section_number=f[8],c.pmtPid=(f[10]&31)<<8|f[11],p.pmtPid=c.pmtPid},d=function(f,p){var b,T,S,j;if(f[5]&1){for(c.programMapTable={video:null,audio:null,"timed-metadata":{}},b=(f[1]&15)<<8|f[2],T=3+b-4,S=(f[10]&15)<<8|f[11],j=12+S;j<T;){var D=f[j],M=(f[j+1]&31)<<8|f[j+2];D===oi.H264_STREAM_TYPE&&c.programMapTable.video===null?c.programMapTable.video=M:D===oi.ADTS_STREAM_TYPE&&c.programMapTable.audio===null?c.programMapTable.audio=M:D===oi.METADATA_STREAM_TYPE&&(c.programMapTable["timed-metadata"][M]=D),j+=((f[j+3]&15)<<8|f[j+4])+5}p.programMapTable=c.programMapTable}},this.push=function(f){var p={},b=4;if(p.payloadUnitStartIndicator=!!(f[1]&64),p.pid=f[1]&31,p.pid<<=8,p.pid|=f[2],(f[3]&48)>>>4>1&&(b+=f[b]+1),p.pid===0)p.type="pat",o(f.subarray(b),p),this.trigger("data",p);else if(p.pid===this.pmtPid)for(p.type="pmt",o(f.subarray(b),p),this.trigger("data",p);this.packetsWaitingForPmt.length;)this.processPes_.apply(this,this.packetsWaitingForPmt.shift());else this.programMapTable===void 0?this.packetsWaitingForPmt.push([f,b,p]):this.processPes_(f,b,p)},this.processPes_=function(f,p,b){b.pid===this.programMapTable.video?b.streamType=oi.H264_STREAM_TYPE:b.pid===this.programMapTable.audio?b.streamType=oi.ADTS_STREAM_TYPE:b.streamType=this.programMapTable["timed-metadata"][b.pid],b.type="pes",b.data=f.subarray(p),this.trigger("data",b)}},Ns.prototype=new Yo,Ns.STREAM_TYPES={h264:27,adts:15},ea=function(){var o=this,u=!1,d={data:[],size:0},c={data:[],size:0},f={data:[],size:0},p,b=function(S,j){var D;const M=S[0]<<16|S[1]<<8|S[2];j.data=new Uint8Array,M===1&&(j.packetLength=6+(S[4]<<8|S[5]),j.dataAlignmentIndicator=(S[6]&4)!==0,D=S[7],D&192&&(j.pts=(S[9]&14)<<27|(S[10]&255)<<20|(S[11]&254)<<12|(S[12]&255)<<5|(S[13]&254)>>>3,j.pts*=4,j.pts+=(S[13]&6)>>>1,j.dts=j.pts,D&64&&(j.dts=(S[14]&14)<<27|(S[15]&255)<<20|(S[16]&254)<<12|(S[17]&255)<<5|(S[18]&254)>>>3,j.dts*=4,j.dts+=(S[18]&6)>>>1)),j.data=S.subarray(9+S[8]))},T=function(S,j,D){var M=new Uint8Array(S.size),ve={type:j},Y=0,je=0,Pe=!1,Ct;if(!(!S.data.length||S.size<9)){for(ve.trackId=S.data[0].pid,Y=0;Y<S.data.length;Y++)Ct=S.data[Y],M.set(Ct.data,je),je+=Ct.data.byteLength;b(M,ve),Pe=j==="video"||ve.packetLength<=S.size,(D||Pe)&&(S.size=0,S.data.length=0),Pe&&o.trigger("data",ve)}};ea.prototype.init.call(this),this.push=function(S){({pat:function(){},pes:function(){var j,D;switch(S.streamType){case oi.H264_STREAM_TYPE:j=d,D="video";break;case oi.ADTS_STREAM_TYPE:j=c,D="audio";break;case oi.METADATA_STREAM_TYPE:j=f,D="timed-metadata";break;default:return}S.payloadUnitStartIndicator&&T(j,D,!0),j.data.push(S),j.size+=S.data.byteLength},pmt:function(){var j={type:"metadata",tracks:[]};p=S.programMapTable,p.video!==null&&j.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+p.video,codec:"avc",type:"video"}),p.audio!==null&&j.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+p.audio,codec:"adts",type:"audio"}),u=!0,o.trigger("data",j)}})[S.type]()},this.reset=function(){d.size=0,d.data.length=0,c.size=0,c.data.length=0,this.trigger("reset")},this.flushStreams_=function(){T(d,"video"),T(c,"audio"),T(f,"timed-metadata")},this.flush=function(){if(!u&&p){var S={type:"metadata",tracks:[]};p.video!==null&&S.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+p.video,codec:"avc",type:"video"}),p.audio!==null&&S.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+p.audio,codec:"adts",type:"audio"}),o.trigger("data",S)}u=!1,this.flushStreams_(),this.trigger("done")}},ea.prototype=new Yo;var Nd={PAT_PID:0,MP2T_PACKET_LENGTH:Jn,TransportPacketStream:Zr,TransportParseStream:Ns,ElementaryStream:ea,TimestampRolloverStream:sv,CaptionStream:Ko.CaptionStream,Cea608Stream:Ko.Cea608Stream,Cea708Stream:Ko.Cea708Stream,MetadataStream:nv};for(var Jo in oi)oi.hasOwnProperty(Jo)&&(Nd[Jo]=oi[Jo]);var rv=Nd,av=t,ov=rt.ONE_SECOND_IN_TS,ta,Md=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];ta=function(o){var u,d=0;ta.prototype.init.call(this),this.skipWarn_=function(c,f){this.trigger("log",{level:"warn",message:`adts skiping bytes ${c} to ${f} in frame ${d} outside syncword`})},this.push=function(c){var f=0,p,b,T,S,j;if(o||(d=0),c.type==="audio"){u&&u.length?(T=u,u=new Uint8Array(T.byteLength+c.data.byteLength),u.set(T),u.set(c.data,T.byteLength)):u=c.data;for(var D;f+7<u.length;){if(u[f]!==255||(u[f+1]&246)!==240){typeof D!="number"&&(D=f),f++;continue}if(typeof D=="number"&&(this.skipWarn_(D,f),D=null),b=(~u[f+1]&1)*2,p=(u[f+3]&3)<<11|u[f+4]<<3|(u[f+5]&224)>>5,S=((u[f+6]&3)+1)*1024,j=S*ov/Md[(u[f+2]&60)>>>2],u.byteLength-f<p)break;this.trigger("data",{pts:c.pts+d*j,dts:c.dts+d*j,sampleCount:S,audioobjecttype:(u[f+2]>>>6&3)+1,channelcount:(u[f+2]&1)<<2|(u[f+3]&192)>>>6,samplerate:Md[(u[f+2]&60)>>>2],samplingfrequencyindex:(u[f+2]&60)>>>2,samplesize:16,data:u.subarray(f+7+b,f+p)}),d++,f+=p}typeof D=="number"&&(this.skipWarn_(D,f),D=null),u=u.subarray(f)}},this.flush=function(){d=0,this.trigger("done")},this.reset=function(){u=void 0,this.trigger("reset")},this.endTimeline=function(){u=void 0,this.trigger("endedtimeline")}},ta.prototype=new av;var lv=ta,Ud;Ud=function(o){var u=o.byteLength,d=0,c=0;this.length=function(){return 8*u},this.bitsAvailable=function(){return 8*u+c},this.loadWord=function(){var f=o.byteLength-u,p=new Uint8Array(4),b=Math.min(4,u);if(b===0)throw new Error("no bytes available");p.set(o.subarray(f,f+b)),d=new DataView(p.buffer).getUint32(0),c=b*8,u-=b},this.skipBits=function(f){var p;c>f?(d<<=f,c-=f):(f-=c,p=Math.floor(f/8),f-=p*8,u-=p,this.loadWord(),d<<=f,c-=f)},this.readBits=function(f){var p=Math.min(c,f),b=d>>>32-p;return c-=p,c>0?d<<=p:u>0&&this.loadWord(),p=f-p,p>0?b<<p|this.readBits(p):b},this.skipLeadingZeros=function(){var f;for(f=0;f<c;++f)if(d&2147483648>>>f)return d<<=f,c-=f,f;return this.loadWord(),f+this.skipLeadingZeros()},this.skipUnsignedExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.skipExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.readUnsignedExpGolomb=function(){var f=this.skipLeadingZeros();return this.readBits(f+1)-1},this.readExpGolomb=function(){var f=this.readUnsignedExpGolomb();return 1&f?1+f>>>1:-1*(f>>>1)},this.readBoolean=function(){return this.readBits(1)===1},this.readUnsignedByte=function(){return this.readBits(8)},this.loadWord()};var uv=Ud,Fd=t,cv=uv,ia,Ms,Vd;Ms=function(){var o=0,u,d;Ms.prototype.init.call(this),this.push=function(c){var f;d?(f=new Uint8Array(d.byteLength+c.data.byteLength),f.set(d),f.set(c.data,d.byteLength),d=f):d=c.data;for(var p=d.byteLength;o<p-3;o++)if(d[o+2]===1){u=o+5;break}for(;u<p;)switch(d[u]){case 0:if(d[u-1]!==0){u+=2;break}else if(d[u-2]!==0){u++;break}o+3!==u-2&&this.trigger("data",d.subarray(o+3,u-2));do u++;while(d[u]!==1&&u<p);o=u-2,u+=3;break;case 1:if(d[u-1]!==0||d[u-2]!==0){u+=3;break}this.trigger("data",d.subarray(o+3,u-2)),o=u-2,u+=3;break;default:u+=3;break}d=d.subarray(o),u-=o,o=0},this.reset=function(){d=null,o=0,this.trigger("reset")},this.flush=function(){d&&d.byteLength>3&&this.trigger("data",d.subarray(o+3)),d=null,o=0,this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")}},Ms.prototype=new Fd,Vd={100:!0,110:!0,122:!0,244:!0,44:!0,83:!0,86:!0,118:!0,128:!0,138:!0,139:!0,134:!0},ia=function(){var o=new Ms,u,d,c,f,p,b,T;ia.prototype.init.call(this),u=this,this.push=function(S){S.type==="video"&&(d=S.trackId,c=S.pts,f=S.dts,o.push(S))},o.on("data",function(S){var j={trackId:d,pts:c,dts:f,data:S,nalUnitTypeCode:S[0]&31};switch(j.nalUnitTypeCode){case 5:j.nalUnitType="slice_layer_without_partitioning_rbsp_idr";break;case 6:j.nalUnitType="sei_rbsp",j.escapedRBSP=p(S.subarray(1));break;case 7:j.nalUnitType="seq_parameter_set_rbsp",j.escapedRBSP=p(S.subarray(1)),j.config=b(j.escapedRBSP);break;case 8:j.nalUnitType="pic_parameter_set_rbsp";break;case 9:j.nalUnitType="access_unit_delimiter_rbsp";break}u.trigger("data",j)}),o.on("done",function(){u.trigger("done")}),o.on("partialdone",function(){u.trigger("partialdone")}),o.on("reset",function(){u.trigger("reset")}),o.on("endedtimeline",function(){u.trigger("endedtimeline")}),this.flush=function(){o.flush()},this.partialFlush=function(){o.partialFlush()},this.reset=function(){o.reset()},this.endTimeline=function(){o.endTimeline()},T=function(S,j){var D=8,M=8,ve,Y;for(ve=0;ve<S;ve++)M!==0&&(Y=j.readExpGolomb(),M=(D+Y+256)%256),D=M===0?D:M},p=function(S){for(var j=S.byteLength,D=[],M=1,ve,Y;M<j-2;)S[M]===0&&S[M+1]===0&&S[M+2]===3?(D.push(M+2),M+=2):M++;if(D.length===0)return S;ve=j-D.length,Y=new Uint8Array(ve);var je=0;for(M=0;M<ve;je++,M++)je===D[0]&&(je++,D.shift()),Y[M]=S[je];return Y},b=function(S){var j=0,D=0,M=0,ve=0,Y,je,Pe,Ct,si,mn,mh,gh,vh,ul,Ah,bt=[1,1],yh,gn;if(Y=new cv(S),je=Y.readUnsignedByte(),Ct=Y.readUnsignedByte(),Pe=Y.readUnsignedByte(),Y.skipUnsignedExpGolomb(),Vd[je]&&(si=Y.readUnsignedExpGolomb(),si===3&&Y.skipBits(1),Y.skipUnsignedExpGolomb(),Y.skipUnsignedExpGolomb(),Y.skipBits(1),Y.readBoolean()))for(Ah=si!==3?8:12,gn=0;gn<Ah;gn++)Y.readBoolean()&&(gn<6?T(16,Y):T(64,Y));if(Y.skipUnsignedExpGolomb(),mn=Y.readUnsignedExpGolomb(),mn===0)Y.readUnsignedExpGolomb();else if(mn===1)for(Y.skipBits(1),Y.skipExpGolomb(),Y.skipExpGolomb(),mh=Y.readUnsignedExpGolomb(),gn=0;gn<mh;gn++)Y.skipExpGolomb();if(Y.skipUnsignedExpGolomb(),Y.skipBits(1),gh=Y.readUnsignedExpGolomb(),vh=Y.readUnsignedExpGolomb(),ul=Y.readBits(1),ul===0&&Y.skipBits(1),Y.skipBits(1),Y.readBoolean()&&(j=Y.readUnsignedExpGolomb(),D=Y.readUnsignedExpGolomb(),M=Y.readUnsignedExpGolomb(),ve=Y.readUnsignedExpGolomb()),Y.readBoolean()&&Y.readBoolean()){switch(yh=Y.readUnsignedByte(),yh){case 1:bt=[1,1];break;case 2:bt=[12,11];break;case 3:bt=[10,11];break;case 4:bt=[16,11];break;case 5:bt=[40,33];break;case 6:bt=[24,11];break;case 7:bt=[20,11];break;case 8:bt=[32,11];break;case 9:bt=[80,33];break;case 10:bt=[18,11];break;case 11:bt=[15,11];break;case 12:bt=[64,33];break;case 13:bt=[160,99];break;case 14:bt=[4,3];break;case 15:bt=[3,2];break;case 16:bt=[2,1];break;case 255:{bt=[Y.readUnsignedByte()<<8|Y.readUnsignedByte(),Y.readUnsignedByte()<<8|Y.readUnsignedByte()];break}}bt&&bt[0]/bt[1]}return{profileIdc:je,levelIdc:Pe,profileCompatibility:Ct,width:(gh+1)*16-j*2-D*2,height:(2-ul)*(vh+1)*16-M*2-ve*2,sarRatio:bt}}},ia.prototype=new Fd;var dv={H264Stream:ia,NalByteStream:Ms},hv=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],zd=function(o,u){var d=o[u+6]<<21|o[u+7]<<14|o[u+8]<<7|o[u+9],c=o[u+5],f=(c&16)>>4;return d=d>=0?d:0,f?d+20:d+10},Hd=function(o,u){return o.length-u<10||o[u]!==73||o[u+1]!==68||o[u+2]!==51?u:(u+=zd(o,u),Hd(o,u))},fv=function(o){var u=Hd(o,0);return o.length>=u+2&&(o[u]&255)===255&&(o[u+1]&240)===240&&(o[u+1]&22)===16},qd=function(o){return o[0]<<21|o[1]<<14|o[2]<<7|o[3]},pv=function(o,u,d){var c,f="";for(c=u;c<d;c++)f+="%"+("00"+o[c].toString(16)).slice(-2);return f},mv=function(o,u,d){return unescape(pv(o,u,d))},gv=function(o,u){var d=(o[u+5]&224)>>5,c=o[u+4]<<3,f=o[u+3]&6144;return f|c|d},vv=function(o,u){return o[u]===73&&o[u+1]===68&&o[u+2]===51?"timed-metadata":o[u]&!0&&(o[u+1]&240)===240?"audio":null},Av=function(o){for(var u=0;u+5<o.length;){if(o[u]!==255||(o[u+1]&246)!==240){u++;continue}return hv[(o[u+2]&60)>>>2]}return null},yv=function(o){var u,d,c,f;u=10,o[5]&64&&(u+=4,u+=qd(o.subarray(10,14)));do{if(d=qd(o.subarray(u+4,u+8)),d<1)return null;if(f=String.fromCharCode(o[u],o[u+1],o[u+2],o[u+3]),f==="PRIV"){c=o.subarray(u+10,u+d+10);for(var p=0;p<c.byteLength;p++)if(c[p]===0){var b=mv(c,0,p);if(b==="com.apple.streaming.transportStreamTimestamp"){var T=c.subarray(p+1),S=(T[3]&1)<<30|T[4]<<22|T[5]<<14|T[6]<<6|T[7]>>>2;return S*=4,S+=T[7]&3,S}break}}u+=10,u+=d}while(u<o.byteLength);return null},Zo={isLikelyAacData:fv,parseId3TagSize:zd,parseAdtsSize:gv,parseType:vv,parseSampleRate:Av,parseAacTimestamp:yv},_v=t,Wd=Zo,na;na=function(){var o=new Uint8Array,u=0;na.prototype.init.call(this),this.setTimestamp=function(d){u=d},this.push=function(d){var c=0,f=0,p,b,T,S;for(o.length?(S=o.length,o=new Uint8Array(d.byteLength+S),o.set(o.subarray(0,S)),o.set(d,S)):o=d;o.length-f>=3;){if(o[f]===73&&o[f+1]===68&&o[f+2]===51){if(o.length-f<10||(c=Wd.parseId3TagSize(o,f),f+c>o.length))break;b={type:"timed-metadata",data:o.subarray(f,f+c)},this.trigger("data",b),f+=c;continue}else if((o[f]&255)===255&&(o[f+1]&240)===240){if(o.length-f<7||(c=Wd.parseAdtsSize(o,f),f+c>o.length))break;T={type:"audio",data:o.subarray(f,f+c),pts:u,dts:u},this.trigger("data",T),f+=c;continue}f++}p=o.length-f,p>0?o=o.subarray(f):o=new Uint8Array},this.reset=function(){o=new Uint8Array,this.trigger("reset")},this.endTimeline=function(){o=new Uint8Array,this.trigger("endedtimeline")}},na.prototype=new _v;var bv=na,Ev=["audioobjecttype","channelcount","samplerate","samplingfrequencyindex","samplesize"],Tv=Ev,Cv=["width","height","profileIdc","levelIdc","profileCompatibility","sarRatio"],xv=Cv,sa=t,Us=g0,Fs=x0,ra=L0,li=U0,Ri=rv,aa=rt,Gd=lv,Sv=dv.H264Stream,jv=bv,Bv=Zo.isLikelyAacData,wv=rt.ONE_SECOND_IN_TS,el=Tv,tl=xv,Vs,Zn,oa,fn,Dv=function(o,u){u.stream=o,this.trigger("log",u)},$d=function(o,u){for(var d=Object.keys(u),c=0;c<d.length;c++){var f=d[c];f==="headOfPipeline"||!u[f].on||u[f].on("log",Dv.bind(o,f))}},Xd=function(o,u){var d;if(o.length!==u.length)return!1;for(d=0;d<o.length;d++)if(o[d]!==u[d])return!1;return!0},il=function(o,u,d,c,f,p){var b=d-u,T=c-u,S=f-d;return{start:{dts:o,pts:o+b},end:{dts:o+T,pts:o+S},prependedContentDuration:p,baseMediaDecodeTime:o}};Zn=function(o,u){var d=[],c,f=0,p=0,b=1/0;u=u||{},c=u.firstSequenceNumber||0,Zn.prototype.init.call(this),this.push=function(T){li.collectDtsInfo(o,T),o&&el.forEach(function(S){o[S]=T[S]}),d.push(T)},this.setEarliestDts=function(T){f=T},this.setVideoBaseMediaDecodeTime=function(T){b=T},this.setAudioAppendStart=function(T){p=T},this.flush=function(){var T,S,j,D,M,ve,Y;if(d.length===0){this.trigger("done","AudioSegmentStream");return}T=ra.trimAdtsFramesByEarliestDts(d,o,f),o.baseMediaDecodeTime=li.calculateTrackBaseMediaDecodeTime(o,u.keepOriginalTimestamps),Y=ra.prefixWithSilence(o,T,p,b),o.samples=ra.generateSampleTable(T),j=Us.mdat(ra.concatenateFrameData(T)),d=[],S=Us.moof(c,[o]),D=new Uint8Array(S.byteLength+j.byteLength),c++,D.set(S),D.set(j,S.byteLength),li.clearDtsInfo(o),M=Math.ceil(wv*1024/o.samplerate),T.length&&(ve=T.length*M,this.trigger("segmentTimingInfo",il(aa.audioTsToVideoTs(o.baseMediaDecodeTime,o.samplerate),T[0].dts,T[0].pts,T[0].dts+ve,T[0].pts+ve,Y||0)),this.trigger("timingInfo",{start:T[0].pts,end:T[0].pts+ve})),this.trigger("data",{track:o,boxes:D}),this.trigger("done","AudioSegmentStream")},this.reset=function(){li.clearDtsInfo(o),d=[],this.trigger("reset")}},Zn.prototype=new sa,Vs=function(o,u){var d,c=[],f=[],p,b;u=u||{},d=u.firstSequenceNumber||0,Vs.prototype.init.call(this),delete o.minPTS,this.gopCache_=[],this.push=function(T){li.collectDtsInfo(o,T),T.nalUnitType==="seq_parameter_set_rbsp"&&!p&&(p=T.config,o.sps=[T.data],tl.forEach(function(S){o[S]=p[S]},this)),T.nalUnitType==="pic_parameter_set_rbsp"&&!b&&(b=T.data,o.pps=[T.data]),c.push(T)},this.flush=function(){for(var T,S,j,D,M,ve,Y=0,je,Pe;c.length&&c[0].nalUnitType!=="access_unit_delimiter_rbsp";)c.shift();if(c.length===0){this.resetStream_(),this.trigger("done","VideoSegmentStream");return}if(T=Fs.groupNalsIntoFrames(c),j=Fs.groupFramesIntoGops(T),j[0][0].keyFrame||(S=this.getGopForFusion_(c[0],o),S?(Y=S.duration,j.unshift(S),j.byteLength+=S.byteLength,j.nalCount+=S.nalCount,j.pts=S.pts,j.dts=S.dts,j.duration+=S.duration):j=Fs.extendFirstKeyFrame(j)),f.length){var Ct;if(u.alignGopsAtEnd?Ct=this.alignGopsAtEnd_(j):Ct=this.alignGopsAtStart_(j),!Ct){this.gopCache_.unshift({gop:j.pop(),pps:o.pps,sps:o.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),c=[],this.resetStream_(),this.trigger("done","VideoSegmentStream");return}li.clearDtsInfo(o),j=Ct}li.collectDtsInfo(o,j),o.samples=Fs.generateSampleTable(j),M=Us.mdat(Fs.concatenateNalData(j)),o.baseMediaDecodeTime=li.calculateTrackBaseMediaDecodeTime(o,u.keepOriginalTimestamps),this.trigger("processedGopsInfo",j.map(function(si){return{pts:si.pts,dts:si.dts,byteLength:si.byteLength}})),je=j[0],Pe=j[j.length-1],this.trigger("segmentTimingInfo",il(o.baseMediaDecodeTime,je.dts,je.pts,Pe.dts+Pe.duration,Pe.pts+Pe.duration,Y)),this.trigger("timingInfo",{start:j[0].pts,end:j[j.length-1].pts+j[j.length-1].duration}),this.gopCache_.unshift({gop:j.pop(),pps:o.pps,sps:o.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),c=[],this.trigger("baseMediaDecodeTime",o.baseMediaDecodeTime),this.trigger("timelineStartInfo",o.timelineStartInfo),D=Us.moof(d,[o]),ve=new Uint8Array(D.byteLength+M.byteLength),d++,ve.set(D),ve.set(M,D.byteLength),this.trigger("data",{track:o,boxes:ve}),this.resetStream_(),this.trigger("done","VideoSegmentStream")},this.reset=function(){this.resetStream_(),c=[],this.gopCache_.length=0,f.length=0,this.trigger("reset")},this.resetStream_=function(){li.clearDtsInfo(o),p=void 0,b=void 0},this.getGopForFusion_=function(T){var S=45e3,j=1e4,D=1/0,M,ve,Y,je,Pe;for(Pe=0;Pe<this.gopCache_.length;Pe++)je=this.gopCache_[Pe],Y=je.gop,!(!(o.pps&&Xd(o.pps[0],je.pps[0]))||!(o.sps&&Xd(o.sps[0],je.sps[0])))&&(Y.dts<o.timelineStartInfo.dts||(M=T.dts-Y.dts-Y.duration,M>=-j&&M<=S&&(!ve||D>M)&&(ve=je,D=M)));return ve?ve.gop:null},this.alignGopsAtStart_=function(T){var S,j,D,M,ve,Y,je,Pe;for(ve=T.byteLength,Y=T.nalCount,je=T.duration,S=j=0;S<f.length&&j<T.length&&(D=f[S],M=T[j],D.pts!==M.pts);){if(M.pts>D.pts){S++;continue}j++,ve-=M.byteLength,Y-=M.nalCount,je-=M.duration}return j===0?T:j===T.length?null:(Pe=T.slice(j),Pe.byteLength=ve,Pe.duration=je,Pe.nalCount=Y,Pe.pts=Pe[0].pts,Pe.dts=Pe[0].dts,Pe)},this.alignGopsAtEnd_=function(T){var S,j,D,M,ve,Y;for(S=f.length-1,j=T.length-1,ve=null,Y=!1;S>=0&&j>=0;){if(D=f[S],M=T[j],D.pts===M.pts){Y=!0;break}if(D.pts>M.pts){S--;continue}S===f.length-1&&(ve=j),j--}if(!Y&&ve===null)return null;var je;if(Y?je=j:je=ve,je===0)return T;var Pe=T.slice(je),Ct=Pe.reduce(function(si,mn){return si.byteLength+=mn.byteLength,si.duration+=mn.duration,si.nalCount+=mn.nalCount,si},{byteLength:0,duration:0,nalCount:0});return Pe.byteLength=Ct.byteLength,Pe.duration=Ct.duration,Pe.nalCount=Ct.nalCount,Pe.pts=Pe[0].pts,Pe.dts=Pe[0].dts,Pe},this.alignGopsWith=function(T){f=T}},Vs.prototype=new sa,fn=function(o,u){this.numberOfTracks=0,this.metadataStream=u,o=o||{},typeof o.remux!="undefined"?this.remuxTracks=!!o.remux:this.remuxTracks=!0,typeof o.keepOriginalTimestamps=="boolean"?this.keepOriginalTimestamps=o.keepOriginalTimestamps:this.keepOriginalTimestamps=!1,this.pendingTracks=[],this.videoTrack=null,this.pendingBoxes=[],this.pendingCaptions=[],this.pendingMetadata=[],this.pendingBytes=0,this.emittedTracks=0,fn.prototype.init.call(this),this.push=function(d){if(d.content||d.text)return this.pendingCaptions.push(d);if(d.frames)return this.pendingMetadata.push(d);this.pendingTracks.push(d.track),this.pendingBytes+=d.boxes.byteLength,d.track.type==="video"&&(this.videoTrack=d.track,this.pendingBoxes.push(d.boxes)),d.track.type==="audio"&&(this.audioTrack=d.track,this.pendingBoxes.unshift(d.boxes))}},fn.prototype=new sa,fn.prototype.flush=function(o){var u=0,d={captions:[],captionStreams:{},metadata:[],info:{}},c,f,p,b=0,T;if(this.pendingTracks.length<this.numberOfTracks){if(o!=="VideoSegmentStream"&&o!=="AudioSegmentStream")return;if(this.remuxTracks)return;if(this.pendingTracks.length===0){this.emittedTracks++,this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0);return}}if(this.videoTrack?(b=this.videoTrack.timelineStartInfo.pts,tl.forEach(function(S){d.info[S]=this.videoTrack[S]},this)):this.audioTrack&&(b=this.audioTrack.timelineStartInfo.pts,el.forEach(function(S){d.info[S]=this.audioTrack[S]},this)),this.videoTrack||this.audioTrack){for(this.pendingTracks.length===1?d.type=this.pendingTracks[0].type:d.type="combined",this.emittedTracks+=this.pendingTracks.length,p=Us.initSegment(this.pendingTracks),d.initSegment=new Uint8Array(p.byteLength),d.initSegment.set(p),d.data=new Uint8Array(this.pendingBytes),T=0;T<this.pendingBoxes.length;T++)d.data.set(this.pendingBoxes[T],u),u+=this.pendingBoxes[T].byteLength;for(T=0;T<this.pendingCaptions.length;T++)c=this.pendingCaptions[T],c.startTime=aa.metadataTsToSeconds(c.startPts,b,this.keepOriginalTimestamps),c.endTime=aa.metadataTsToSeconds(c.endPts,b,this.keepOriginalTimestamps),d.captionStreams[c.stream]=!0,d.captions.push(c);for(T=0;T<this.pendingMetadata.length;T++)f=this.pendingMetadata[T],f.cueTime=aa.metadataTsToSeconds(f.pts,b,this.keepOriginalTimestamps),d.metadata.push(f);for(d.metadata.dispatchType=this.metadataStream.dispatchType,this.pendingTracks.length=0,this.videoTrack=null,this.pendingBoxes.length=0,this.pendingCaptions.length=0,this.pendingBytes=0,this.pendingMetadata.length=0,this.trigger("data",d),T=0;T<d.captions.length;T++)c=d.captions[T],this.trigger("caption",c);for(T=0;T<d.metadata.length;T++)f=d.metadata[T],this.trigger("id3Frame",f)}this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0)},fn.prototype.setRemux=function(o){this.remuxTracks=o},oa=function(o){var u=this,d=!0,c,f;oa.prototype.init.call(this),o=o||{},this.baseMediaDecodeTime=o.baseMediaDecodeTime||0,this.transmuxPipeline_={},this.setupAacPipeline=function(){var p={};this.transmuxPipeline_=p,p.type="aac",p.metadataStream=new Ri.MetadataStream,p.aacStream=new jv,p.audioTimestampRolloverStream=new Ri.TimestampRolloverStream("audio"),p.timedMetadataTimestampRolloverStream=new Ri.TimestampRolloverStream("timed-metadata"),p.adtsStream=new Gd,p.coalesceStream=new fn(o,p.metadataStream),p.headOfPipeline=p.aacStream,p.aacStream.pipe(p.audioTimestampRolloverStream).pipe(p.adtsStream),p.aacStream.pipe(p.timedMetadataTimestampRolloverStream).pipe(p.metadataStream).pipe(p.coalesceStream),p.metadataStream.on("timestamp",function(b){p.aacStream.setTimestamp(b.timeStamp)}),p.aacStream.on("data",function(b){b.type!=="timed-metadata"&&b.type!=="audio"||p.audioSegmentStream||(f=f||{timelineStartInfo:{baseMediaDecodeTime:u.baseMediaDecodeTime},codec:"adts",type:"audio"},p.coalesceStream.numberOfTracks++,p.audioSegmentStream=new Zn(f,o),p.audioSegmentStream.on("log",u.getLogTrigger_("audioSegmentStream")),p.audioSegmentStream.on("timingInfo",u.trigger.bind(u,"audioTimingInfo")),p.adtsStream.pipe(p.audioSegmentStream).pipe(p.coalesceStream),u.trigger("trackinfo",{hasAudio:!!f,hasVideo:!!c}))}),p.coalesceStream.on("data",this.trigger.bind(this,"data")),p.coalesceStream.on("done",this.trigger.bind(this,"done")),$d(this,p)},this.setupTsPipeline=function(){var p={};this.transmuxPipeline_=p,p.type="ts",p.metadataStream=new Ri.MetadataStream,p.packetStream=new Ri.TransportPacketStream,p.parseStream=new Ri.TransportParseStream,p.elementaryStream=new Ri.ElementaryStream,p.timestampRolloverStream=new Ri.TimestampRolloverStream,p.adtsStream=new Gd,p.h264Stream=new Sv,p.captionStream=new Ri.CaptionStream(o),p.coalesceStream=new fn(o,p.metadataStream),p.headOfPipeline=p.packetStream,p.packetStream.pipe(p.parseStream).pipe(p.elementaryStream).pipe(p.timestampRolloverStream),p.timestampRolloverStream.pipe(p.h264Stream),p.timestampRolloverStream.pipe(p.adtsStream),p.timestampRolloverStream.pipe(p.metadataStream).pipe(p.coalesceStream),p.h264Stream.pipe(p.captionStream).pipe(p.coalesceStream),p.elementaryStream.on("data",function(b){var T;if(b.type==="metadata"){for(T=b.tracks.length;T--;)!c&&b.tracks[T].type==="video"?(c=b.tracks[T],c.timelineStartInfo.baseMediaDecodeTime=u.baseMediaDecodeTime):!f&&b.tracks[T].type==="audio"&&(f=b.tracks[T],f.timelineStartInfo.baseMediaDecodeTime=u.baseMediaDecodeTime);c&&!p.videoSegmentStream&&(p.coalesceStream.numberOfTracks++,p.videoSegmentStream=new Vs(c,o),p.videoSegmentStream.on("log",u.getLogTrigger_("videoSegmentStream")),p.videoSegmentStream.on("timelineStartInfo",function(S){f&&!o.keepOriginalTimestamps&&(f.timelineStartInfo=S,p.audioSegmentStream.setEarliestDts(S.dts-u.baseMediaDecodeTime))}),p.videoSegmentStream.on("processedGopsInfo",u.trigger.bind(u,"gopInfo")),p.videoSegmentStream.on("segmentTimingInfo",u.trigger.bind(u,"videoSegmentTimingInfo")),p.videoSegmentStream.on("baseMediaDecodeTime",function(S){f&&p.audioSegmentStream.setVideoBaseMediaDecodeTime(S)}),p.videoSegmentStream.on("timingInfo",u.trigger.bind(u,"videoTimingInfo")),p.h264Stream.pipe(p.videoSegmentStream).pipe(p.coalesceStream)),f&&!p.audioSegmentStream&&(p.coalesceStream.numberOfTracks++,p.audioSegmentStream=new Zn(f,o),p.audioSegmentStream.on("log",u.getLogTrigger_("audioSegmentStream")),p.audioSegmentStream.on("timingInfo",u.trigger.bind(u,"audioTimingInfo")),p.audioSegmentStream.on("segmentTimingInfo",u.trigger.bind(u,"audioSegmentTimingInfo")),p.adtsStream.pipe(p.audioSegmentStream).pipe(p.coalesceStream)),u.trigger("trackinfo",{hasAudio:!!f,hasVideo:!!c})}}),p.coalesceStream.on("data",this.trigger.bind(this,"data")),p.coalesceStream.on("id3Frame",function(b){b.dispatchType=p.metadataStream.dispatchType,u.trigger("id3Frame",b)}),p.coalesceStream.on("caption",this.trigger.bind(this,"caption")),p.coalesceStream.on("done",this.trigger.bind(this,"done")),$d(this,p)},this.setBaseMediaDecodeTime=function(p){var b=this.transmuxPipeline_;o.keepOriginalTimestamps||(this.baseMediaDecodeTime=p),f&&(f.timelineStartInfo.dts=void 0,f.timelineStartInfo.pts=void 0,li.clearDtsInfo(f),b.audioTimestampRolloverStream&&b.audioTimestampRolloverStream.discontinuity()),c&&(b.videoSegmentStream&&(b.videoSegmentStream.gopCache_=[]),c.timelineStartInfo.dts=void 0,c.timelineStartInfo.pts=void 0,li.clearDtsInfo(c),b.captionStream.reset()),b.timestampRolloverStream&&b.timestampRolloverStream.discontinuity()},this.setAudioAppendStart=function(p){f&&this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(p)},this.setRemux=function(p){var b=this.transmuxPipeline_;o.remux=p,b&&b.coalesceStream&&b.coalesceStream.setRemux(p)},this.alignGopsWith=function(p){c&&this.transmuxPipeline_.videoSegmentStream&&this.transmuxPipeline_.videoSegmentStream.alignGopsWith(p)},this.getLogTrigger_=function(p){var b=this;return function(T){T.stream=p,b.trigger("log",T)}},this.push=function(p){if(d){var b=Bv(p);b&&this.transmuxPipeline_.type!=="aac"?this.setupAacPipeline():!b&&this.transmuxPipeline_.type!=="ts"&&this.setupTsPipeline(),d=!1}this.transmuxPipeline_.headOfPipeline.push(p)},this.flush=function(){d=!0,this.transmuxPipeline_.headOfPipeline.flush()},this.endTimeline=function(){this.transmuxPipeline_.headOfPipeline.endTimeline()},this.reset=function(){this.transmuxPipeline_.headOfPipeline&&this.transmuxPipeline_.headOfPipeline.reset()},this.resetCaptions=function(){this.transmuxPipeline_.captionStream&&this.transmuxPipeline_.captionStream.reset()}},oa.prototype=new sa;var kv={Transmuxer:oa,VideoSegmentStream:Vs,AudioSegmentStream:Zn,AUDIO_PROPERTIES:el,VIDEO_PROPERTIES:tl,generateSegmentTimingInfo:il},Iv=function(o){return o>>>0},Pv=function(o){return("00"+o.toString(16)).slice(-2)},la={toUnsigned:Iv,toHexString:Pv},Lv=function(o){var u="";return u+=String.fromCharCode(o[0]),u+=String.fromCharCode(o[1]),u+=String.fromCharCode(o[2]),u+=String.fromCharCode(o[3]),u},Yd=Lv,Ov=la.toUnsigned,Rv=Yd,Kd=function(o,u){var d=[],c,f,p,b,T;if(!u.length)return null;for(c=0;c<o.byteLength;)f=Ov(o[c]<<24|o[c+1]<<16|o[c+2]<<8|o[c+3]),p=Rv(o.subarray(c+4,c+8)),b=f>1?c+f:o.byteLength,p===u[0]&&(u.length===1?d.push(o.subarray(c+8,b)):(T=Kd(o.subarray(c+8,b),u.slice(1)),T.length&&(d=d.concat(T)))),c=b;return d},Qd=Kd,Nv=la.toUnsigned,Mv=r.getUint64,Uv=function(o){var u={version:o[0],flags:new Uint8Array(o.subarray(1,4))};return u.version===1?u.baseMediaDecodeTime=Mv(o.subarray(4)):u.baseMediaDecodeTime=Nv(o[4]<<24|o[5]<<16|o[6]<<8|o[7]),u},Jd=Uv,Fv=function(o){return{isLeading:(o[0]&12)>>>2,dependsOn:o[0]&3,isDependedOn:(o[1]&192)>>>6,hasRedundancy:(o[1]&48)>>>4,paddingValue:(o[1]&14)>>>1,isNonSyncSample:o[1]&1,degradationPriority:o[2]<<8|o[3]}},Vv=Fv,Zd=Vv,zv=function(o){var u={version:o[0],flags:new Uint8Array(o.subarray(1,4)),samples:[]},d=new DataView(o.buffer,o.byteOffset,o.byteLength),c=u.flags[2]&1,f=u.flags[2]&4,p=u.flags[1]&1,b=u.flags[1]&2,T=u.flags[1]&4,S=u.flags[1]&8,j=d.getUint32(4),D=8,M;for(c&&(u.dataOffset=d.getInt32(D),D+=4),f&&j&&(M={flags:Zd(o.subarray(D,D+4))},D+=4,p&&(M.duration=d.getUint32(D),D+=4),b&&(M.size=d.getUint32(D),D+=4),S&&(u.version===1?M.compositionTimeOffset=d.getInt32(D):M.compositionTimeOffset=d.getUint32(D),D+=4),u.samples.push(M),j--);j--;)M={},p&&(M.duration=d.getUint32(D),D+=4),b&&(M.size=d.getUint32(D),D+=4),T&&(M.flags=Zd(o.subarray(D,D+4)),D+=4),S&&(u.version===1?M.compositionTimeOffset=d.getInt32(D):M.compositionTimeOffset=d.getUint32(D),D+=4),u.samples.push(M);return u},eh=zv,Hv=function(o){var u=new DataView(o.buffer,o.byteOffset,o.byteLength),d={version:o[0],flags:new Uint8Array(o.subarray(1,4)),trackId:u.getUint32(4)},c=d.flags[2]&1,f=d.flags[2]&2,p=d.flags[2]&8,b=d.flags[2]&16,T=d.flags[2]&32,S=d.flags[0]&65536,j=d.flags[0]&131072,D;return D=8,c&&(D+=4,d.baseDataOffset=u.getUint32(12),D+=4),f&&(d.sampleDescriptionIndex=u.getUint32(D),D+=4),p&&(d.defaultSampleDuration=u.getUint32(D),D+=4),b&&(d.defaultSampleSize=u.getUint32(D),D+=4),T&&(d.defaultSampleFlags=u.getUint32(D)),S&&(d.durationIsEmpty=!0),!c&&j&&(d.baseDataOffsetIsMoof=!0),d},th=Hv,zs;typeof window!="undefined"?zs=window:typeof n!="undefined"?zs=n:typeof self!="undefined"?zs=self:zs={};var ih=zs,qv=kd.discardEmulationPreventionBytes,Wv=Id.CaptionStream,Hs=Qd,Gv=Jd,$v=eh,Xv=th,nh=ih,Yv=function(o,u){for(var d=o,c=0;c<u.length;c++){var f=u[c];if(d<f.size)return f;d-=f.size}return null},Kv=function(o,u,d){var c=new DataView(o.buffer,o.byteOffset,o.byteLength),f={logs:[],seiNals:[]},p,b,T,S;for(b=0;b+4<o.length;b+=T)if(T=c.getUint32(b),b+=4,!(T<=0))switch(o[b]&31){case 6:var j=o.subarray(b+1,b+1+T),D=Yv(b,u);if(p={nalUnitType:"sei_rbsp",size:T,data:j,escapedRBSP:qv(j),trackId:d},D)p.pts=D.pts,p.dts=D.dts,S=D;else if(S)p.pts=S.pts,p.dts=S.dts;else{f.logs.push({level:"warn",message:"We've encountered a nal unit without data at "+b+" for trackId "+d+". See mux.js#223."});break}f.seiNals.push(p);break}return f},Qv=function(o,u,d){var c=u,f=d.defaultSampleDuration||0,p=d.defaultSampleSize||0,b=d.trackId,T=[];return o.forEach(function(S){var j=$v(S),D=j.samples;D.forEach(function(M){M.duration===void 0&&(M.duration=f),M.size===void 0&&(M.size=p),M.trackId=b,M.dts=c,M.compositionTimeOffset===void 0&&(M.compositionTimeOffset=0),typeof c=="bigint"?(M.pts=c+nh.BigInt(M.compositionTimeOffset),c+=nh.BigInt(M.duration)):(M.pts=c+M.compositionTimeOffset,c+=M.duration)}),T=T.concat(D)}),T},Jv=function(o,u){var d=Hs(o,["moof","traf"]),c=Hs(o,["mdat"]),f={},p=[];return c.forEach(function(b,T){var S=d[T];p.push({mdat:b,traf:S})}),p.forEach(function(b){var T=b.mdat,S=b.traf,j=Hs(S,["tfhd"]),D=Xv(j[0]),M=D.trackId,ve=Hs(S,["tfdt"]),Y=ve.length>0?Gv(ve[0]).baseMediaDecodeTime:0,je=Hs(S,["trun"]),Pe,Ct;u===M&&je.length>0&&(Pe=Qv(je,Y,D),Ct=Kv(T,Pe,M),f[M]||(f[M]={seiNals:[],logs:[]}),f[M].seiNals=f[M].seiNals.concat(Ct.seiNals),f[M].logs=f[M].logs.concat(Ct.logs))}),f},Zv=function(o,u,d){var c;if(u===null)return null;c=Jv(o,u);var f=c[u]||{};return{seiNals:f.seiNals,logs:f.logs,timescale:d}},eA=function(){var o=!1,u,d,c,f,p,b;this.isInitialized=function(){return o},this.init=function(T){u=new Wv,o=!0,b=T?T.isPartial:!1,u.on("data",function(S){S.startTime=S.startPts/f,S.endTime=S.endPts/f,p.captions.push(S),p.captionStreams[S.stream]=!0}),u.on("log",function(S){p.logs.push(S)})},this.isNewInit=function(T,S){return T&&T.length===0||S&&typeof S=="object"&&Object.keys(S).length===0?!1:c!==T[0]||f!==S[c]},this.parse=function(T,S,j){var D;if(this.isInitialized()){if(!S||!j)return null;if(this.isNewInit(S,j))c=S[0],f=j[c];else if(c===null||!f)return d.push(T),null}else return null;for(;d.length>0;){var M=d.shift();this.parse(M,S,j)}return D=Zv(T,c,f),D&&D.logs&&(p.logs=p.logs.concat(D.logs)),D===null||!D.seiNals?p.logs.length?{logs:p.logs,captions:[],captionStreams:[]}:null:(this.pushNals(D.seiNals),this.flushStream(),p)},this.pushNals=function(T){if(!this.isInitialized()||!T||T.length===0)return null;T.forEach(function(S){u.push(S)})},this.flushStream=function(){if(!this.isInitialized())return null;b?u.partialFlush():u.flush()},this.clearParsedCaptions=function(){p.captions=[],p.captionStreams={},p.logs=[]},this.resetCaptionStream=function(){if(!this.isInitialized())return null;u.reset()},this.clearAllCaptions=function(){this.clearParsedCaptions(),this.resetCaptionStream()},this.reset=function(){d=[],c=null,f=null,p?this.clearParsedCaptions():p={captions:[],captionStreams:{},logs:[]},this.resetCaptionStream()},this.reset()},tA=eA,iA=function(o){for(var u=0,d=String.fromCharCode(o[u]),c="";d!=="\0";)c+=d,u++,d=String.fromCharCode(o[u]);return c+=d,c},nA={uint8ToCString:iA},ua=nA.uint8ToCString,sA=r.getUint64,rA=function(o){var u=4,d=o[0],c,f,p,b,T,S,j,D;if(d===0){c=ua(o.subarray(u)),u+=c.length,f=ua(o.subarray(u)),u+=f.length;var M=new DataView(o.buffer);p=M.getUint32(u),u+=4,T=M.getUint32(u),u+=4,S=M.getUint32(u),u+=4,j=M.getUint32(u),u+=4}else if(d===1){var M=new DataView(o.buffer);p=M.getUint32(u),u+=4,b=sA(o.subarray(u)),u+=8,S=M.getUint32(u),u+=4,j=M.getUint32(u),u+=4,c=ua(o.subarray(u)),u+=c.length,f=ua(o.subarray(u)),u+=f.length}D=new Uint8Array(o.subarray(u,o.byteLength));var ve={scheme_id_uri:c,value:f,timescale:p||1,presentation_time:b,presentation_time_delta:T,event_duration:S,id:j,message_data:D};return oA(d,ve)?ve:void 0},aA=function(o,u,d,c){return o||o===0?o/u:c+d/u},oA=function(o,u){var d=u.scheme_id_uri!=="\0",c=o===0&&sh(u.presentation_time_delta)&&d,f=o===1&&sh(u.presentation_time)&&d;return!(o>1)&&c||f},sh=function(o){return o!==void 0||o!==null},lA={parseEmsgBox:rA,scaleTime:aA},ca=la.toUnsigned,qs=la.toHexString,_t=Qd,es=Yd,nl=lA,uA=th,cA=eh,dA=Jd,hA=r.getUint64,rh,ah,oh,lh,uh,sl,ch,rl=ih,fA=Rd.parseId3Frames;rh=function(o){var u={},d=_t(o,["moov","trak"]);return d.reduce(function(c,f){var p,b,T,S,j;return p=_t(f,["tkhd"])[0],!p||(b=p[0],T=b===0?12:20,S=ca(p[T]<<24|p[T+1]<<16|p[T+2]<<8|p[T+3]),j=_t(f,["mdia","mdhd"])[0],!j)?null:(b=j[0],T=b===0?12:20,c[S]=ca(j[T]<<24|j[T+1]<<16|j[T+2]<<8|j[T+3]),c)},u)},ah=function(o,u){var d;d=_t(u,["moof","traf"]);var c=d.reduce(function(f,p){var b=_t(p,["tfhd"])[0],T=ca(b[4]<<24|b[5]<<16|b[6]<<8|b[7]),S=o[T]||9e4,j=_t(p,["tfdt"])[0],D=new DataView(j.buffer,j.byteOffset,j.byteLength),M;j[0]===1?M=hA(j.subarray(4,12)):M=D.getUint32(4);let ve;return typeof M=="bigint"?ve=M/rl.BigInt(S):typeof M=="number"&&!isNaN(M)&&(ve=M/S),ve<Number.MAX_SAFE_INTEGER&&(ve=Number(ve)),ve<f&&(f=ve),f},1/0);return typeof c=="bigint"||isFinite(c)?c:0},oh=function(o,u){var d=_t(u,["moof","traf"]),c=0,f=0,p;if(d&&d.length){var b=_t(d[0],["tfhd"])[0],T=_t(d[0],["trun"])[0],S=_t(d[0],["tfdt"])[0];if(b){var j=uA(b);p=j.trackId}if(S){var D=dA(S);c=D.baseMediaDecodeTime}if(T){var M=cA(T);M.samples&&M.samples.length&&(f=M.samples[0].compositionTimeOffset||0)}}var ve=o[p]||9e4;typeof c=="bigint"&&(f=rl.BigInt(f),ve=rl.BigInt(ve));var Y=(c+f)/ve;return typeof Y=="bigint"&&Y<Number.MAX_SAFE_INTEGER&&(Y=Number(Y)),Y},lh=function(o){var u=_t(o,["moov","trak"]),d=[];return u.forEach(function(c){var f=_t(c,["mdia","hdlr"]),p=_t(c,["tkhd"]);f.forEach(function(b,T){var S=es(b.subarray(8,12)),j=p[T],D,M,ve;S==="vide"&&(D=new DataView(j.buffer,j.byteOffset,j.byteLength),M=D.getUint8(0),ve=M===0?D.getUint32(12):D.getUint32(20),d.push(ve))})}),d},sl=function(o){var u=o[0],d=u===0?12:20;return ca(o[d]<<24|o[d+1]<<16|o[d+2]<<8|o[d+3])},uh=function(o){var u=_t(o,["moov","trak"]),d=[];return u.forEach(function(c){var f={},p=_t(c,["tkhd"])[0],b,T;p&&(b=new DataView(p.buffer,p.byteOffset,p.byteLength),T=b.getUint8(0),f.id=T===0?b.getUint32(12):b.getUint32(20));var S=_t(c,["mdia","hdlr"])[0];if(S){var j=es(S.subarray(8,12));j==="vide"?f.type="video":j==="soun"?f.type="audio":f.type=j}var D=_t(c,["mdia","minf","stbl","stsd"])[0];if(D){var M=D.subarray(8);f.codec=es(M.subarray(4,8));var ve=_t(M,[f.codec])[0],Y,je;ve&&(/^[asm]vc[1-9]$/i.test(f.codec)?(Y=ve.subarray(78),je=es(Y.subarray(4,8)),je==="avcC"&&Y.length>11?(f.codec+=".",f.codec+=qs(Y[9]),f.codec+=qs(Y[10]),f.codec+=qs(Y[11])):f.codec="avc1.4d400d"):/^mp4[a,v]$/i.test(f.codec)?(Y=ve.subarray(28),je=es(Y.subarray(4,8)),je==="esds"&&Y.length>20&&Y[19]!==0?(f.codec+="."+qs(Y[19]),f.codec+="."+qs(Y[20]>>>2&63).replace(/^0/,"")):f.codec="mp4a.40.2"):f.codec=f.codec.toLowerCase())}var Pe=_t(c,["mdia","mdhd"])[0];Pe&&(f.timescale=sl(Pe)),d.push(f)}),d},ch=function(o,u=0){var d=_t(o,["emsg"]);return d.map(c=>{var f=nl.parseEmsgBox(new Uint8Array(c)),p=fA(f.message_data);return{cueTime:nl.scaleTime(f.presentation_time,f.timescale,f.presentation_time_delta,u),duration:nl.scaleTime(f.event_duration,f.timescale),frames:p}})};var al={findBox:_t,parseType:es,timescale:rh,startTime:ah,compositionStartTime:oh,videoTrackIds:lh,tracks:uh,getTimescaleFromMediaHeader:sl,getEmsgID3:ch},ol=Yr,dh=function(o){var u=o[1]&31;return u<<=8,u|=o[2],u},da=function(o){return!!(o[1]&64)},ha=function(o){var u=0;return(o[3]&48)>>>4>1&&(u+=o[4]+1),u},pA=function(o,u){var d=dh(o);return d===0?"pat":d===u?"pmt":u?"pes":null},mA=function(o){var u=da(o),d=4+ha(o);return u&&(d+=o[d]+1),(o[d+10]&31)<<8|o[d+11]},gA=function(o){var u={},d=da(o),c=4+ha(o);if(d&&(c+=o[c]+1),!!(o[c+5]&1)){var f,p,b;f=(o[c+1]&15)<<8|o[c+2],p=3+f-4,b=(o[c+10]&15)<<8|o[c+11];for(var T=12+b;T<p;){var S=c+T;u[(o[S+1]&31)<<8|o[S+2]]=o[S],T+=((o[S+3]&15)<<8|o[S+4])+5}return u}},vA=function(o,u){var d=dh(o),c=u[d];switch(c){case ol.H264_STREAM_TYPE:return"video";case ol.ADTS_STREAM_TYPE:return"audio";case ol.METADATA_STREAM_TYPE:return"timed-metadata";default:return null}},AA=function(o){var u=da(o);if(!u)return null;var d=4+ha(o);if(d>=o.byteLength)return null;var c=null,f;return f=o[d+7],f&192&&(c={},c.pts=(o[d+9]&14)<<27|(o[d+10]&255)<<20|(o[d+11]&254)<<12|(o[d+12]&255)<<5|(o[d+13]&254)>>>3,c.pts*=4,c.pts+=(o[d+13]&6)>>>1,c.dts=c.pts,f&64&&(c.dts=(o[d+14]&14)<<27|(o[d+15]&255)<<20|(o[d+16]&254)<<12|(o[d+17]&255)<<5|(o[d+18]&254)>>>3,c.dts*=4,c.dts+=(o[d+18]&6)>>>1)),c},ll=function(o){switch(o){case 5:return"slice_layer_without_partitioning_rbsp_idr";case 6:return"sei_rbsp";case 7:return"seq_parameter_set_rbsp";case 8:return"pic_parameter_set_rbsp";case 9:return"access_unit_delimiter_rbsp";default:return null}},yA=function(o){for(var u=4+ha(o),d=o.subarray(u),c=0,f=0,p=!1,b;f<d.byteLength-3;f++)if(d[f+2]===1){c=f+5;break}for(;c<d.byteLength;)switch(d[c]){case 0:if(d[c-1]!==0){c+=2;break}else if(d[c-2]!==0){c++;break}f+3!==c-2&&(b=ll(d[f+3]&31),b==="slice_layer_without_partitioning_rbsp_idr"&&(p=!0));do c++;while(d[c]!==1&&c<d.length);f=c-2,c+=3;break;case 1:if(d[c-1]!==0||d[c-2]!==0){c+=3;break}b=ll(d[f+3]&31),b==="slice_layer_without_partitioning_rbsp_idr"&&(p=!0),f=c-2,c+=3;break;default:c+=3;break}return d=d.subarray(f),c-=f,f=0,d&&d.byteLength>3&&(b=ll(d[f+3]&31),b==="slice_layer_without_partitioning_rbsp_idr"&&(p=!0)),p},_A={parseType:pA,parsePat:mA,parsePmt:gA,parsePayloadUnitStartIndicator:da,parsePesType:vA,parsePesTime:AA,videoPacketContainsKeyFrame:yA},hh=Yr,ts=Ld.handleRollover,$e={};$e.ts=_A,$e.aac=Zo;var pn=rt.ONE_SECOND_IN_TS,Rt=188,xi=71,bA=function(o,u){for(var d=0,c=Rt,f,p;c<o.byteLength;){if(o[d]===xi&&o[c]===xi){switch(f=o.subarray(d,c),p=$e.ts.parseType(f,u.pid),p){case"pat":u.pid=$e.ts.parsePat(f);break;case"pmt":var b=$e.ts.parsePmt(f);u.table=u.table||{},Object.keys(b).forEach(function(T){u.table[T]=b[T]});break}d+=Rt,c+=Rt;continue}d++,c++}},fh=function(o,u,d){for(var c=0,f=Rt,p,b,T,S,j,D=!1;f<=o.byteLength;){if(o[c]===xi&&(o[f]===xi||f===o.byteLength)){switch(p=o.subarray(c,f),b=$e.ts.parseType(p,u.pid),b){case"pes":T=$e.ts.parsePesType(p,u.table),S=$e.ts.parsePayloadUnitStartIndicator(p),T==="audio"&&S&&(j=$e.ts.parsePesTime(p),j&&(j.type="audio",d.audio.push(j),D=!0));break}if(D)break;c+=Rt,f+=Rt;continue}c++,f++}for(f=o.byteLength,c=f-Rt,D=!1;c>=0;){if(o[c]===xi&&(o[f]===xi||f===o.byteLength)){switch(p=o.subarray(c,f),b=$e.ts.parseType(p,u.pid),b){case"pes":T=$e.ts.parsePesType(p,u.table),S=$e.ts.parsePayloadUnitStartIndicator(p),T==="audio"&&S&&(j=$e.ts.parsePesTime(p),j&&(j.type="audio",d.audio.push(j),D=!0));break}if(D)break;c-=Rt,f-=Rt;continue}c--,f--}},EA=function(o,u,d){for(var c=0,f=Rt,p,b,T,S,j,D,M,ve,Y=!1,je={data:[],size:0};f<o.byteLength;){if(o[c]===xi&&o[f]===xi){switch(p=o.subarray(c,f),b=$e.ts.parseType(p,u.pid),b){case"pes":if(T=$e.ts.parsePesType(p,u.table),S=$e.ts.parsePayloadUnitStartIndicator(p),T==="video"&&(S&&!Y&&(j=$e.ts.parsePesTime(p),j&&(j.type="video",d.video.push(j),Y=!0)),!d.firstKeyFrame)){if(S&&je.size!==0){for(D=new Uint8Array(je.size),M=0;je.data.length;)ve=je.data.shift(),D.set(ve,M),M+=ve.byteLength;if($e.ts.videoPacketContainsKeyFrame(D)){var Pe=$e.ts.parsePesTime(D);Pe?(d.firstKeyFrame=Pe,d.firstKeyFrame.type="video"):Ef.warn("Failed to extract PTS/DTS from PES at first keyframe. This could be an unusual TS segment, or else mux.js did not parse your TS segment correctly. If you know your TS segments do contain PTS/DTS on keyframes please file a bug report! You can try ffprobe to double check for yourself.")}je.size=0}je.data.push(p),je.size+=p.byteLength}break}if(Y&&d.firstKeyFrame)break;c+=Rt,f+=Rt;continue}c++,f++}for(f=o.byteLength,c=f-Rt,Y=!1;c>=0;){if(o[c]===xi&&o[f]===xi){switch(p=o.subarray(c,f),b=$e.ts.parseType(p,u.pid),b){case"pes":T=$e.ts.parsePesType(p,u.table),S=$e.ts.parsePayloadUnitStartIndicator(p),T==="video"&&S&&(j=$e.ts.parsePesTime(p),j&&(j.type="video",d.video.push(j),Y=!0));break}if(Y)break;c-=Rt,f-=Rt;continue}c--,f--}},TA=function(o,u){if(o.audio&&o.audio.length){var d=u;(typeof d=="undefined"||isNaN(d))&&(d=o.audio[0].dts),o.audio.forEach(function(p){p.dts=ts(p.dts,d),p.pts=ts(p.pts,d),p.dtsTime=p.dts/pn,p.ptsTime=p.pts/pn})}if(o.video&&o.video.length){var c=u;if((typeof c=="undefined"||isNaN(c))&&(c=o.video[0].dts),o.video.forEach(function(p){p.dts=ts(p.dts,c),p.pts=ts(p.pts,c),p.dtsTime=p.dts/pn,p.ptsTime=p.pts/pn}),o.firstKeyFrame){var f=o.firstKeyFrame;f.dts=ts(f.dts,c),f.pts=ts(f.pts,c),f.dtsTime=f.dts/pn,f.ptsTime=f.pts/pn}}},CA=function(o){for(var u=!1,d=0,c=null,f=null,p=0,b=0,T;o.length-b>=3;){var S=$e.aac.parseType(o,b);switch(S){case"timed-metadata":if(o.length-b<10){u=!0;break}if(p=$e.aac.parseId3TagSize(o,b),p>o.length){u=!0;break}f===null&&(T=o.subarray(b,b+p),f=$e.aac.parseAacTimestamp(T)),b+=p;break;case"audio":if(o.length-b<7){u=!0;break}if(p=$e.aac.parseAdtsSize(o,b),p>o.length){u=!0;break}c===null&&(T=o.subarray(b,b+p),c=$e.aac.parseSampleRate(T)),d++,b+=p;break;default:b++;break}if(u)return null}if(c===null||f===null)return null;var j=pn/c,D={audio:[{type:"audio",dts:f,pts:f},{type:"audio",dts:f+d*1024*j,pts:f+d*1024*j}]};return D},xA=function(o){var u={pid:null,table:null},d={};bA(o,u);for(var c in u.table)if(u.table.hasOwnProperty(c)){var f=u.table[c];switch(f){case hh.H264_STREAM_TYPE:d.video=[],EA(o,u,d),d.video.length===0&&delete d.video;break;case hh.ADTS_STREAM_TYPE:d.audio=[],fh(o,u,d),d.audio.length===0&&delete d.audio;break}}return d},SA=function(o,u){var d=$e.aac.isLikelyAacData(o),c;return d?c=CA(o):c=xA(o),!c||!c.audio&&!c.video?null:(TA(c,u),c)},jA={inspect:SA,parseAudioPes_:fh};const BA=function(o,u){u.on("data",function(d){const c=d.initSegment;d.initSegment={data:c.buffer,byteOffset:c.byteOffset,byteLength:c.byteLength};const f=d.data;d.data=f.buffer,o.postMessage({action:"data",segment:d,byteOffset:f.byteOffset,byteLength:f.byteLength},[d.data])}),u.on("done",function(d){o.postMessage({action:"done"})}),u.on("gopInfo",function(d){o.postMessage({action:"gopInfo",gopInfo:d})}),u.on("videoSegmentTimingInfo",function(d){const c={start:{decode:rt.videoTsToSeconds(d.start.dts),presentation:rt.videoTsToSeconds(d.start.pts)},end:{decode:rt.videoTsToSeconds(d.end.dts),presentation:rt.videoTsToSeconds(d.end.pts)},baseMediaDecodeTime:rt.videoTsToSeconds(d.baseMediaDecodeTime)};d.prependedContentDuration&&(c.prependedContentDuration=rt.videoTsToSeconds(d.prependedContentDuration)),o.postMessage({action:"videoSegmentTimingInfo",videoSegmentTimingInfo:c})}),u.on("audioSegmentTimingInfo",function(d){const c={start:{decode:rt.videoTsToSeconds(d.start.dts),presentation:rt.videoTsToSeconds(d.start.pts)},end:{decode:rt.videoTsToSeconds(d.end.dts),presentation:rt.videoTsToSeconds(d.end.pts)},baseMediaDecodeTime:rt.videoTsToSeconds(d.baseMediaDecodeTime)};d.prependedContentDuration&&(c.prependedContentDuration=rt.videoTsToSeconds(d.prependedContentDuration)),o.postMessage({action:"audioSegmentTimingInfo",audioSegmentTimingInfo:c})}),u.on("id3Frame",function(d){o.postMessage({action:"id3Frame",id3Frame:d})}),u.on("caption",function(d){o.postMessage({action:"caption",caption:d})}),u.on("trackinfo",function(d){o.postMessage({action:"trackinfo",trackInfo:d})}),u.on("audioTimingInfo",function(d){o.postMessage({action:"audioTimingInfo",audioTimingInfo:{start:rt.videoTsToSeconds(d.start),end:rt.videoTsToSeconds(d.end)}})}),u.on("videoTimingInfo",function(d){o.postMessage({action:"videoTimingInfo",videoTimingInfo:{start:rt.videoTsToSeconds(d.start),end:rt.videoTsToSeconds(d.end)}})}),u.on("log",function(d){o.postMessage({action:"log",log:d})})};class ph{constructor(u,d){this.options=d||{},this.self=u,this.init()}init(){this.transmuxer&&this.transmuxer.dispose(),this.transmuxer=new kv.Transmuxer(this.options),BA(this.self,this.transmuxer)}pushMp4Captions(u){this.captionParser||(this.captionParser=new tA,this.captionParser.init());const d=new Uint8Array(u.data,u.byteOffset,u.byteLength),c=this.captionParser.parse(d,u.trackIds,u.timescales);this.self.postMessage({action:"mp4Captions",captions:c&&c.captions||[],logs:c&&c.logs||[],data:d.buffer},[d.buffer])}probeMp4StartTime({timescales:u,data:d}){const c=al.startTime(u,d);this.self.postMessage({action:"probeMp4StartTime",startTime:c,data:d},[d.buffer])}probeMp4Tracks({data:u}){const d=al.tracks(u);this.self.postMessage({action:"probeMp4Tracks",tracks:d,data:u},[u.buffer])}probeEmsgID3({data:u,offset:d}){const c=al.getEmsgID3(u,d);this.self.postMessage({action:"probeEmsgID3",id3Frames:c,emsgData:u},[u.buffer])}probeTs({data:u,baseStartTime:d}){const c=typeof d=="number"&&!isNaN(d)?d*rt.ONE_SECOND_IN_TS:void 0,f=jA.inspect(u,c);let p=null;f&&(p={hasVideo:f.video&&f.video.length===2||!1,hasAudio:f.audio&&f.audio.length===2||!1},p.hasVideo&&(p.videoStart=f.video[0].ptsTime),p.hasAudio&&(p.audioStart=f.audio[0].ptsTime)),this.self.postMessage({action:"probeTs",result:p,data:u},[u.buffer])}clearAllMp4Captions(){this.captionParser&&this.captionParser.clearAllCaptions()}clearParsedMp4Captions(){this.captionParser&&this.captionParser.clearParsedCaptions()}push(u){const d=new Uint8Array(u.data,u.byteOffset,u.byteLength);this.transmuxer.push(d)}reset(){this.transmuxer.reset()}setTimestampOffset(u){const d=u.timestampOffset||0;this.transmuxer.setBaseMediaDecodeTime(Math.round(rt.secondsToVideoTs(d)))}setAudioAppendStart(u){this.transmuxer.setAudioAppendStart(Math.ceil(rt.secondsToVideoTs(u.appendStart)))}setRemux(u){this.transmuxer.setRemux(u.remux)}flush(u){this.transmuxer.flush(),self.postMessage({action:"done",type:"transmuxed"})}endTimeline(){this.transmuxer.endTimeline(),self.postMessage({action:"endedtimeline",type:"transmuxed"})}alignGopsWith(u){this.transmuxer.alignGopsWith(u.gopsToAlignWith.slice())}}self.onmessage=function(o){if(o.data.action==="init"&&o.data.options){this.messageHandlers=new ph(self,o.data.options);return}this.messageHandlers||(this.messageHandlers=new ph(self)),o.data&&o.data.action&&o.data.action!=="init"&&this.messageHandlers[o.data.action]&&this.messageHandlers[o.data.action](o.data)}}));var Rm=kc(Om);const Nm=(n,e,t)=>{const{type:i,initSegment:s,captions:r,captionStreams:a,metadata:l,videoFrameDtsTime:h,videoFramePtsTime:m}=n.data.segment;e.buffer.push({captions:r,captionStreams:a,metadata:l});const g=n.data.segment.boxes||{data:n.data.segment.data},E={type:i,data:new Uint8Array(g.data,g.data.byteOffset,g.data.byteLength),initSegment:new Uint8Array(s.data,s.byteOffset,s.byteLength)};typeof h!="undefined"&&(E.videoFrameDtsTime=h),typeof m!="undefined"&&(E.videoFramePtsTime=m),t(E)},Mm=({transmuxedData:n,callback:e})=>{n.buffer=[],e(n)},Um=(n,e)=>{e.gopInfo=n.data.gopInfo},Lc=n=>{const{transmuxer:e,bytes:t,audioAppendStart:i,gopsToAlignWith:s,remux:r,onData:a,onTrackInfo:l,onAudioTimingInfo:h,onVideoTimingInfo:m,onVideoSegmentTimingInfo:g,onAudioSegmentTimingInfo:E,onId3:w,onCaptions:k,onDone:x,onEndedTimeline:L,onTransmuxerLog:V,isEndOfTimeline:H}=n,R={buffer:[]};let Z=H;const q=P=>{e.currentTransmux===n&&(P.data.action==="data"&&Nm(P,R,a),P.data.action==="trackinfo"&&l(P.data.trackInfo),P.data.action==="gopInfo"&&Um(P,R),P.data.action==="audioTimingInfo"&&h(P.data.audioTimingInfo),P.data.action==="videoTimingInfo"&&m(P.data.videoTimingInfo),P.data.action==="videoSegmentTimingInfo"&&g(P.data.videoSegmentTimingInfo),P.data.action==="audioSegmentTimingInfo"&&E(P.data.audioSegmentTimingInfo),P.data.action==="id3Frame"&&w([P.data.id3Frame],P.data.id3Frame.dispatchType),P.data.action==="caption"&&k(P.data.caption),P.data.action==="endedtimeline"&&(Z=!1,L()),P.data.action==="log"&&V(P.data.log),P.data.type==="transmuxed"&&(Z||(e.onmessage=null,Mm({transmuxedData:R,callback:x}),Oc(e))))};if(e.onmessage=q,i&&e.postMessage({action:"setAudioAppendStart",appendStart:i}),Array.isArray(s)&&e.postMessage({action:"alignGopsWith",gopsToAlignWith:s}),typeof r!="undefined"&&e.postMessage({action:"setRemux",remux:r}),t.byteLength){const P=t instanceof ArrayBuffer?t:t.buffer,de=t instanceof ArrayBuffer?0:t.byteOffset;e.postMessage({action:"push",data:P,byteOffset:de,byteLength:t.byteLength},[P])}H&&e.postMessage({action:"endTimeline"}),e.postMessage({action:"flush"})},Oc=n=>{n.currentTransmux=null,n.transmuxQueue.length&&(n.currentTransmux=n.transmuxQueue.shift(),typeof n.currentTransmux=="function"?n.currentTransmux():Lc(n.currentTransmux))},Rc=(n,e)=>{n.postMessage({action:e}),Oc(n)},Nc=(n,e)=>{if(!e.currentTransmux){e.currentTransmux=n,Rc(e,n);return}e.transmuxQueue.push(Rc.bind(null,e,n))},Fm=n=>{Nc("reset",n)},Vm=n=>{Nc("endTimeline",n)},Mc=n=>{if(!n.transmuxer.currentTransmux){n.transmuxer.currentTransmux=n,Lc(n);return}n.transmuxer.transmuxQueue.push(n)};var Po={reset:Fm,endTimeline:Vm,transmux:Mc,createTransmuxer:n=>{const e=new Rm;e.currentTransmux=null,e.transmuxQueue=[];const t=e.terminate;return e.terminate=()=>(e.currentTransmux=null,e.transmuxQueue.length=0,t.call(e)),e.postMessage({action:"init",options:n}),e}};const ws=function(n){const e=n.transmuxer,t=n.endAction||n.action,i=n.callback,s=(0,We.Z)({},n,{endAction:null,transmuxer:null,callback:null}),r=a=>{a.data.action===t&&(e.removeEventListener("message",r),a.data.data&&(a.data.data=new Uint8Array(a.data.data,n.byteOffset||0,n.byteLength||a.data.data.byteLength),n.data&&(n.data=a.data.data)),i(a.data))};if(e.addEventListener("message",r),n.data){const a=n.data instanceof ArrayBuffer;s.byteOffset=a?0:n.data.byteOffset,s.byteLength=n.data.byteLength;const l=[a?n.data:n.data.buffer];e.postMessage(s,l)}else e.postMessage(s)},Ei={FAILURE:2,TIMEOUT:-101,ABORTED:-102},Lo=n=>{n.forEach(e=>{e.abort()})},zm=n=>({bandwidth:n.bandwidth,bytesReceived:n.bytesReceived||0,roundTripTime:n.roundTripTime||0}),Hm=n=>{const e=n.target,i={bandwidth:1/0,bytesReceived:0,roundTripTime:Date.now()-e.requestTime||0};return i.bytesReceived=n.loaded,i.bandwidth=Math.floor(i.bytesReceived/i.roundTripTime*8*1e3),i},Oo=(n,e)=>e.timedout?{status:e.status,message:"HLS request timed-out at URL: "+e.uri,code:Ei.TIMEOUT,xhr:e}:e.aborted?{status:e.status,message:"HLS request aborted at URL: "+e.uri,code:Ei.ABORTED,xhr:e}:n?{status:e.status,message:"HLS request errored at URL: "+e.uri,code:Ei.FAILURE,xhr:e}:e.responseType==="arraybuffer"&&e.response.byteLength===0?{status:e.status,message:"Empty HLS response at URL: "+e.uri,code:Ei.FAILURE,xhr:e}:null,Uc=(n,e,t)=>(i,s)=>{const r=s.response,a=Oo(i,s);if(a)return t(a,n);if(r.byteLength!==16)return t({status:s.status,message:"Invalid HLS key at URL: "+s.uri,code:Ei.FAILURE,xhr:s},n);const l=new DataView(r),h=new Uint32Array([l.getUint32(0),l.getUint32(4),l.getUint32(8),l.getUint32(12)]);for(let m=0;m<e.length;m++)e[m].bytes=h;return t(null,n)},Fc=(n,e)=>{const t=Ca(n.map.bytes);if(t!=="mp4"){const i=n.map.resolvedUri||n.map.uri;return e({internal:!0,message:`Found unsupported ${t||"unknown"} container for initialization segment at URL: ${i}`,code:Ei.FAILURE})}ws({action:"probeMp4Tracks",data:n.map.bytes,transmuxer:n.transmuxer,callback:({tracks:i,data:s})=>(n.map.bytes=s,i.forEach(function(r){n.map.tracks=n.map.tracks||{},!n.map.tracks[r.type]&&(n.map.tracks[r.type]=r,typeof r.id=="number"&&r.timescale&&(n.map.timescales=n.map.timescales||{},n.map.timescales[r.id]=r.timescale))}),e(null))})},qm=({segment:n,finishProcessingFn:e})=>(t,i)=>{const s=Oo(t,i);if(s)return e(s,n);const r=new Uint8Array(i.response);if(n.map.key)return n.map.encryptedBytes=r,e(null,n);n.map.bytes=r,Fc(n,function(a){if(a)return a.xhr=i,a.status=i.status,e(a,n);e(null,n)})},Wm=({segment:n,finishProcessingFn:e,responseType:t})=>(i,s)=>{const r=Oo(i,s);if(r)return e(r,n);const a=t==="arraybuffer"||!s.responseText?s.response:Pm(s.responseText.substring(n.lastReachedChar||0));return n.stats=zm(s),n.key?n.encryptedBytes=new Uint8Array(a):n.bytes=new Uint8Array(a),e(null,n)},Gm=({segment:n,bytes:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:m,dataFn:g,doneFn:E,onTransmuxerLog:w})=>{const k=n.map&&n.map.tracks||{},x=!!(k.audio&&k.video);let L=i.bind(null,n,"audio","start");const V=i.bind(null,n,"audio","end");let H=i.bind(null,n,"video","start");const R=i.bind(null,n,"video","end"),Z=()=>Mc({bytes:e,transmuxer:n.transmuxer,audioAppendStart:n.audioAppendStart,gopsToAlignWith:n.gopsToAlignWith,remux:x,onData:q=>{q.type=q.type==="combined"?"video":q.type,g(n,q)},onTrackInfo:q=>{t&&(x&&(q.isMuxed=!0),t(n,q))},onAudioTimingInfo:q=>{L&&typeof q.start!="undefined"&&(L(q.start),L=null),V&&typeof q.end!="undefined"&&V(q.end)},onVideoTimingInfo:q=>{H&&typeof q.start!="undefined"&&(H(q.start),H=null),R&&typeof q.end!="undefined"&&R(q.end)},onVideoSegmentTimingInfo:q=>{s(q)},onAudioSegmentTimingInfo:q=>{r(q)},onId3:(q,P)=>{a(n,q,P)},onCaptions:q=>{l(n,[q])},isEndOfTimeline:h,onEndedTimeline:()=>{m()},onTransmuxerLog:w,onDone:q=>{E&&(q.type=q.type==="combined"?"video":q.type,E(null,n,q))}});ws({action:"probeTs",transmuxer:n.transmuxer,data:e,baseStartTime:n.baseStartTime,callback:q=>{n.bytes=e=q.data;const P=q.result;P&&(t(n,{hasAudio:P.hasAudio,hasVideo:P.hasVideo,isMuxed:x}),t=null),Z()}})},Vc=({segment:n,bytes:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:m,dataFn:g,doneFn:E,onTransmuxerLog:w})=>{let k=new Uint8Array(e);if(bf(k)){n.isFmp4=!0;const{tracks:x}=n.map,L={isFmp4:!0,hasVideo:!!x.video,hasAudio:!!x.audio};x.audio&&x.audio.codec&&x.audio.codec!=="enca"&&(L.audioCodec=x.audio.codec),x.video&&x.video.codec&&x.video.codec!=="encv"&&(L.videoCodec=x.video.codec),x.video&&x.audio&&(L.isMuxed=!0),t(n,L);const V=(H,R)=>{g(n,{data:k,type:L.hasAudio&&!L.isMuxed?"audio":"video"}),R&&R.length&&a(n,R),H&&H.length&&l(n,H),E(null,n,{})};ws({action:"probeMp4StartTime",timescales:n.map.timescales,data:k,transmuxer:n.transmuxer,callback:({data:H,startTime:R})=>{e=H.buffer,n.bytes=k=H,L.hasAudio&&!L.isMuxed&&i(n,"audio","start",R),L.hasVideo&&i(n,"video","start",R),ws({action:"probeEmsgID3",data:k,transmuxer:n.transmuxer,offset:R,callback:({emsgData:Z,id3Frames:q})=>{if(e=Z.buffer,n.bytes=k=Z,!x.video||!Z.byteLength||!n.transmuxer){V(void 0,q);return}ws({action:"pushMp4Captions",endAction:"mp4Captions",transmuxer:n.transmuxer,data:k,timescales:n.map.timescales,trackIds:[x.video.id],callback:P=>{e=P.data.buffer,n.bytes=k=P.data,P.logs.forEach(function(de){w(Ye(de,{stream:"mp4CaptionParser"}))}),V(P.captions,q)}})}})}});return}if(!n.transmuxer){E(null,n,{});return}if(typeof n.container=="undefined"&&(n.container=Ca(k)),n.container!=="ts"&&n.container!=="aac"){t(n,{hasAudio:!1,hasVideo:!1}),E(null,n,{});return}Gm({segment:n,bytes:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:m,dataFn:g,doneFn:E,onTransmuxerLog:w})},zc=function({id:n,key:e,encryptedBytes:t,decryptionWorker:i},s){const r=l=>{if(l.data.source===n){i.removeEventListener("message",r);const h=l.data.decrypted;s(new Uint8Array(h.bytes,h.byteOffset,h.byteLength))}};i.addEventListener("message",r);let a;e.bytes.slice?a=e.bytes.slice():a=new Uint32Array(Array.prototype.slice.call(e.bytes)),i.postMessage(Tc({source:n,encrypted:t,key:a,iv:e.iv}),[t.buffer,a.buffer])},$m=({decryptionWorker:n,segment:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:m,dataFn:g,doneFn:E,onTransmuxerLog:w})=>{zc({id:e.requestId,key:e.key,encryptedBytes:e.encryptedBytes,decryptionWorker:n},k=>{e.bytes=k,Vc({segment:e,bytes:e.bytes,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:m,dataFn:g,doneFn:E,onTransmuxerLog:w})})},Xm=({activeXhrs:n,decryptionWorker:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:m,dataFn:g,doneFn:E,onTransmuxerLog:w})=>{let k=0,x=!1;return(L,V)=>{if(!x){if(L)return x=!0,Lo(n),E(L,V);if(k+=1,k===n.length){const H=function(){if(V.encryptedBytes)return $m({decryptionWorker:e,segment:V,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:m,dataFn:g,doneFn:E,onTransmuxerLog:w});Vc({segment:V,bytes:V.bytes,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:m,dataFn:g,doneFn:E,onTransmuxerLog:w})};if(V.endOfAllRequests=Date.now(),V.map&&V.map.encryptedBytes&&!V.map.bytes)return zc({decryptionWorker:e,id:V.requestId+"-init",encryptedBytes:V.map.encryptedBytes,key:V.map.key},R=>{V.map.bytes=R,Fc(V,Z=>{if(Z)return Lo(n),E(Z,V);H()})});H()}}}},Ym=({loadendState:n,abortFn:e})=>t=>{t.target.aborted&&e&&!n.calledAbortFn&&(e(),n.calledAbortFn=!0)},Km=({segment:n,progressFn:e,trackInfoFn:t,timingInfoFn:i,videoSegmentTimingInfoFn:s,audioSegmentTimingInfoFn:r,id3Fn:a,captionsFn:l,isEndOfTimeline:h,endedTimelineFn:m,dataFn:g})=>E=>{if(!E.target.aborted)return n.stats=Ye(n.stats,Hm(E)),!n.stats.firstBytesReceivedAt&&n.stats.bytesReceived&&(n.stats.firstBytesReceivedAt=Date.now()),e(E,n)},Qm=({xhr:n,xhrOptions:e,decryptionWorker:t,segment:i,abortFn:s,progressFn:r,trackInfoFn:a,timingInfoFn:l,videoSegmentTimingInfoFn:h,audioSegmentTimingInfoFn:m,id3Fn:g,captionsFn:E,isEndOfTimeline:w,endedTimelineFn:k,dataFn:x,doneFn:L,onTransmuxerLog:V})=>{const H=[],R=Xm({activeXhrs:H,decryptionWorker:t,trackInfoFn:a,timingInfoFn:l,videoSegmentTimingInfoFn:h,audioSegmentTimingInfoFn:m,id3Fn:g,captionsFn:E,isEndOfTimeline:w,endedTimelineFn:k,dataFn:x,doneFn:L,onTransmuxerLog:V});if(i.key&&!i.key.bytes){const Ee=[i.key];i.map&&!i.map.bytes&&i.map.key&&i.map.key.resolvedUri===i.key.resolvedUri&&Ee.push(i.map.key);const Ue=Ye(e,{uri:i.key.resolvedUri,responseType:"arraybuffer"}),He=Uc(i,Ee,R),mt=n(Ue,He);H.push(mt)}if(i.map&&!i.map.bytes){if(i.map.key&&(!i.key||i.key.resolvedUri!==i.map.key.resolvedUri)){const wt=Ye(e,{uri:i.map.key.resolvedUri,responseType:"arraybuffer"}),gt=Uc(i,[i.map.key],R),Se=n(wt,gt);H.push(Se)}const Ue=Ye(e,{uri:i.map.resolvedUri,responseType:"arraybuffer",headers:Do(i.map)}),He=qm({segment:i,finishProcessingFn:R}),mt=n(Ue,He);H.push(mt)}const Z=Ye(e,{uri:i.part&&i.part.resolvedUri||i.resolvedUri,responseType:"arraybuffer",headers:Do(i)}),q=Wm({segment:i,finishProcessingFn:R,responseType:Z.responseType}),P=n(Z,q);P.addEventListener("progress",Km({segment:i,progressFn:r,trackInfoFn:a,timingInfoFn:l,videoSegmentTimingInfoFn:h,audioSegmentTimingInfoFn:m,id3Fn:g,captionsFn:E,isEndOfTimeline:w,endedTimelineFn:k,dataFn:x})),H.push(P);const de={};return H.forEach(Ee=>{Ee.addEventListener("loadend",Ym({loadendState:de,abortFn:s}))}),()=>Lo(H)},Jm=ni("CodecUtils"),Zm=function(n){const e=n.attributes||{};if(e.CODECS)return De(e.CODECS)},Hc=(n,e)=>{const t=e.attributes||{};return n&&n.mediaGroups&&n.mediaGroups.AUDIO&&t.AUDIO&&n.mediaGroups.AUDIO[t.AUDIO]},eg=(n,e)=>{if(!Hc(n,e))return!0;const t=e.attributes||{},i=n.mediaGroups.AUDIO[t.AUDIO];for(const s in i)if(!i[s].uri&&!i[s].playlists)return!0;return!1},Or=function(n){const e={};return n.forEach(({mediaType:t,type:i,details:s})=>{e[t]=e[t]||[],e[t].push(ee(`${i}${s}`))}),Object.keys(e).forEach(function(t){if(e[t].length>1){Jm(`multiple ${t} codecs found as attributes: ${e[t].join(", ")}. Setting playlist codecs to null so that we wait for mux.js to probe segments for real codecs.`),e[t]=null;return}e[t]=e[t][0]}),e},qc=function(n){let e=0;return n.audio&&e++,n.video&&e++,e},Ds=function(n,e){const t=e.attributes||{},i=Or(Zm(e)||[]);if(Hc(n,e)&&!i.audio&&!eg(n,e)){const s=Or(ze(n,t.AUDIO)||[]);s.audio&&(i.audio=s.audio)}return i},Rr=ni("PlaylistSelector"),Wc=function(n){if(!n||!n.playlist)return;const e=n.playlist;return JSON.stringify({id:e.id,bandwidth:n.bandwidth,width:n.width,height:n.height,codecs:e.attributes&&e.attributes.CODECS||""})},Nr=function(n,e){if(!n)return"";const t=A().getComputedStyle(n);return t?t[e]:""},Yn=function(n,e){const t=n.slice();n.sort(function(i,s){const r=e(i,s);return r===0?t.indexOf(i)-t.indexOf(s):r})},Ro=function(n,e){let t,i;return n.attributes.BANDWIDTH&&(t=n.attributes.BANDWIDTH),t=t||A().Number.MAX_VALUE,e.attributes.BANDWIDTH&&(i=e.attributes.BANDWIDTH),i=i||A().Number.MAX_VALUE,t-i},tg=function(n,e){let t,i;return n.attributes.RESOLUTION&&n.attributes.RESOLUTION.width&&(t=n.attributes.RESOLUTION.width),t=t||A().Number.MAX_VALUE,e.attributes.RESOLUTION&&e.attributes.RESOLUTION.width&&(i=e.attributes.RESOLUTION.width),i=i||A().Number.MAX_VALUE,t===i&&n.attributes.BANDWIDTH&&e.attributes.BANDWIDTH?n.attributes.BANDWIDTH-e.attributes.BANDWIDTH:t-i};let Gc=function(n,e,t,i,s,r){if(!n)return;const a={bandwidth:e,width:t,height:i,limitRenditionByPlayerDimensions:s};let l=n.playlists;zt.isAudioOnly(n)&&(l=r.getAudioTrackPlaylists_(),a.audioOnly=!0);let h=l.map(P=>{let de;const Ee=P.attributes&&P.attributes.RESOLUTION&&P.attributes.RESOLUTION.width,Ue=P.attributes&&P.attributes.RESOLUTION&&P.attributes.RESOLUTION.height;return de=P.attributes&&P.attributes.BANDWIDTH,de=de||A().Number.MAX_VALUE,{bandwidth:de,width:Ee,height:Ue,playlist:P}});Yn(h,(P,de)=>P.bandwidth-de.bandwidth),h=h.filter(P=>!zt.isIncompatible(P.playlist));let m=h.filter(P=>zt.isEnabled(P.playlist));m.length||(m=h.filter(P=>!zt.isDisabled(P.playlist)));const g=m.filter(P=>P.bandwidth*St.BANDWIDTH_VARIANCE<e);let E=g[g.length-1];const w=g.filter(P=>P.bandwidth===E.bandwidth)[0];if(s===!1){const P=w||m[0]||h[0];if(P&&P.playlist){let de="sortedPlaylistReps";return w&&(de="bandwidthBestRep"),m[0]&&(de="enabledPlaylistReps"),Rr(`choosing ${Wc(P)} using ${de} with options`,a),P.playlist}return Rr("could not choose a playlist with options",a),null}const k=g.filter(P=>P.width&&P.height);Yn(k,(P,de)=>P.width-de.width);const x=k.filter(P=>P.width===t&&P.height===i);E=x[x.length-1];const L=x.filter(P=>P.bandwidth===E.bandwidth)[0];let V,H,R;L||(V=k.filter(P=>P.width>t||P.height>i),H=V.filter(P=>P.width===V[0].width&&P.height===V[0].height),E=H[H.length-1],R=H.filter(P=>P.bandwidth===E.bandwidth)[0]);let Z;if(r.leastPixelDiffSelector){const P=k.map(de=>(de.pixelDiff=Math.abs(de.width-t)+Math.abs(de.height-i),de));Yn(P,(de,Ee)=>de.pixelDiff===Ee.pixelDiff?Ee.bandwidth-de.bandwidth:de.pixelDiff-Ee.pixelDiff),Z=P[0]}const q=Z||R||L||w||m[0]||h[0];if(q&&q.playlist){let P="sortedPlaylistReps";return Z?P="leastPixelDiffRep":R?P="resolutionPlusOneRep":L?P="resolutionBestRep":w?P="bandwidthBestRep":m[0]&&(P="enabledPlaylistReps"),Rr(`choosing ${Wc(q)} using ${P} with options`,a),q.playlist}return Rr("could not choose a playlist with options",a),null};const $c=function(){const n=this.useDevicePixelRatio&&A().devicePixelRatio||1;return Gc(this.playlists.main,this.systemBandwidth,parseInt(Nr(this.tech_.el(),"width"),10)*n,parseInt(Nr(this.tech_.el(),"height"),10)*n,this.limitRenditionByPlayerDimensions,this.playlistController_)},ig=function(n){let e=-1,t=-1;if(n<0||n>1)throw new Error("Moving average bandwidth decay must be between 0 and 1.");return function(){const i=this.useDevicePixelRatio&&A().devicePixelRatio||1;return e<0&&(e=this.systemBandwidth,t=this.systemBandwidth),this.systemBandwidth>0&&this.systemBandwidth!==t&&(e=n*this.systemBandwidth+(1-n)*e,t=this.systemBandwidth),Gc(this.playlists.main,e,parseInt(Nr(this.tech_.el(),"width"),10)*i,parseInt(Nr(this.tech_.el(),"height"),10)*i,this.limitRenditionByPlayerDimensions,this.playlistController_)}},ng=function(n){const{main:e,currentTime:t,bandwidth:i,duration:s,segmentDuration:r,timeUntilRebuffer:a,currentTimeline:l,syncController:h}=n,m=e.playlists.filter(x=>!zt.isIncompatible(x));let g=m.filter(zt.isEnabled);g.length||(g=m.filter(x=>!zt.isDisabled(x)));const w=g.filter(zt.hasAttribute.bind(null,"BANDWIDTH")).map(x=>{const V=h.getSyncPoint(x,s,l,t)?1:2,R=zt.estimateSegmentRequestTime(r,i,x)*V-a;return{playlist:x,rebufferingImpact:R}}),k=w.filter(x=>x.rebufferingImpact<=0);return Yn(k,(x,L)=>Ro(L.playlist,x.playlist)),k.length?k[0]:(Yn(w,(x,L)=>x.rebufferingImpact-L.rebufferingImpact),w[0]||null)},sg=function(){const n=this.playlists.main.playlists.filter(zt.isEnabled);return Yn(n,(t,i)=>Ro(t,i)),n.filter(t=>!!Ds(this.playlists.main,t).video)[0]||null},rg=n=>{let e=0,t;return n.bytes&&(t=new Uint8Array(n.bytes),n.segments.forEach(i=>{t.set(i,e),e+=i.byteLength})),t},ag=function(n,e,t){if(!n[t]){e.trigger({type:"usage",name:"vhs-608"});let i=t;/^cc708_/.test(t)&&(i="SERVICE"+t.split("_")[1]);const s=e.textTracks().getTrackById(i);if(s)n[t]=s;else{const r=e.options_.vhs&&e.options_.vhs.captionServices||{};let a=t,l=t,h=!1;const m=r[i];m&&(a=m.label,l=m.language,h=m.default),n[t]=e.addRemoteTextTrack({kind:"captions",id:i,default:h,label:a,language:l},!1).track}}},og=function({inbandTextTracks:n,captionArray:e,timestampOffset:t}){if(!e)return;const i=A().WebKitDataCue||A().VTTCue;e.forEach(s=>{const r=s.stream;s.content?s.content.forEach(a=>{const l=new i(s.startTime+t,s.endTime+t,a.text);l.line=a.line,l.align="left",l.position=a.position,l.positionAlign="line-left",n[r].addCue(l)}):n[r].addCue(new i(s.startTime+t,s.endTime+t,s.text))})},lg=function(n){Object.defineProperties(n.frame,{id:{get(){return F.log.warn("cue.frame.id is deprecated. Use cue.value.key instead."),n.value.key}},value:{get(){return F.log.warn("cue.frame.value is deprecated. Use cue.value.data instead."),n.value.data}},privateData:{get(){return F.log.warn("cue.frame.privateData is deprecated. Use cue.value.data instead."),n.value.data}}})},ug=({inbandTextTracks:n,metadataArray:e,timestampOffset:t,videoDuration:i})=>{if(!e)return;const s=A().WebKitDataCue||A().VTTCue,r=n.metadataTrack_;if(!r||(e.forEach(g=>{const E=g.cueTime+t;typeof E!="number"||A().isNaN(E)||E<0||!(E<1/0)||!g.frames||!g.frames.length||g.frames.forEach(w=>{const k=new s(E,E,w.value||w.url||w.data||"");k.frame=w,k.value=w,lg(k),r.addCue(k)})}),!r.cues||!r.cues.length))return;const a=r.cues,l=[];for(let g=0;g<a.length;g++)a[g]&&l.push(a[g]);const h=l.reduce((g,E)=>{const w=g[E.startTime]||[];return w.push(E),g[E.startTime]=w,g},{}),m=Object.keys(h).sort((g,E)=>Number(g)-Number(E));m.forEach((g,E)=>{const w=h[g],k=isFinite(i)?i:0,x=Number(m[E+1])||k;w.forEach(L=>{L.endTime=x})})},cg={id:"ID",class:"CLASS",startDate:"START-DATE",duration:"DURATION",endDate:"END-DATE",endOnNext:"END-ON-NEXT",plannedDuration:"PLANNED-DURATION",scte35Out:"SCTE35-OUT",scte35In:"SCTE35-IN"},dg=new Set(["id","class","startDate","duration","endDate","endOnNext","startTime","endTime","processDateRange"]),hg=({inbandTextTracks:n,dateRanges:e})=>{const t=n.metadataTrack_;if(!t)return;const i=A().WebKitDataCue||A().VTTCue;e.forEach(s=>{for(const r of Object.keys(s)){if(dg.has(r))continue;const a=new i(s.startTime,s.endTime,"");a.id=s.id,a.type="com.apple.quicktime.HLS",a.value={key:cg[r],data:s[r]},(r==="scte35Out"||r==="scte35In")&&(a.value.data=new Uint8Array(a.value.data.match(/[\da-f]{2}/gi)).buffer),t.addCue(a)}s.processDateRange()})},Xc=(n,e,t)=>{n.metadataTrack_||(n.metadataTrack_=t.addRemoteTextTrack({kind:"metadata",label:"Timed Metadata"},!1).track,F.browser.IS_ANY_SAFARI||(n.metadataTrack_.inBandMetadataTrackDispatchType=e))},ks=function(n,e,t){let i,s;if(t&&t.cues)for(i=t.cues.length;i--;)s=t.cues[i],s.startTime>=n&&s.endTime<=e&&t.removeCue(s)},fg=function(n){const e=n.cues;if(!e)return;const t={};for(let i=e.length-1;i>=0;i--){const s=e[i],r=`${s.startTime}-${s.endTime}-${s.text}`;t[r]?n.removeCue(s):t[r]=s}},pg=(n,e,t)=>{if(typeof e=="undefined"||e===null||!n.length)return[];const i=Math.ceil((e-t+3)*Zs.ONE_SECOND_IN_TS);let s;for(s=0;s<n.length&&!(n[s].pts>i);s++);return n.slice(s)},mg=(n,e,t)=>{if(!e.length)return n;if(t)return e.slice();const i=e[0].pts;let s=0;for(s;s<n.length&&!(n[s].pts>=i);s++);return n.slice(0,s).concat(e)},gg=(n,e,t,i)=>{const s=Math.ceil((e-i)*Zs.ONE_SECOND_IN_TS),r=Math.ceil((t-i)*Zs.ONE_SECOND_IN_TS),a=n.slice();let l=n.length;for(;l--&&!(n[l].pts<=r););if(l===-1)return a;let h=l+1;for(;h--&&!(n[h].pts<=s););return h=Math.max(h,0),a.splice(h,l-h+1),a},vg=function(n,e){if(!n&&!e||!n&&e||n&&!e)return!1;if(n===e)return!0;const t=Object.keys(n).sort(),i=Object.keys(e).sort();if(t.length!==i.length)return!1;for(let s=0;s<t.length;s++){const r=t[s];if(r!==i[s]||n[r]!==e[r])return!1}return!0},Yc=22,Ag=function(n,e,t){e=e||[];const i=[];let s=0;for(let r=0;r<e.length;r++){const a=e[r];if(n===a.timeline&&(i.push(r),s+=a.duration,s>t))return r}return i.length===0?0:i[i.length-1]},Is=1,yg=500,Kc=n=>typeof n=="number"&&isFinite(n),Mr=1/60,_g=(n,e,t)=>n!=="main"||!e||!t?null:!t.hasAudio&&!t.hasVideo?"Neither audio nor video found in segment.":e.hasVideo&&!t.hasVideo?"Only audio found in segment when we expected video. We can't switch to audio only from a stream that had video. To get rid of this message, please add codec information to the manifest.":!e.hasVideo&&t.hasVideo?"Video found in segment when we expected only audio. We can't switch to a stream with video from an audio only stream. To get rid of this message, please add codec information to the manifest.":null,bg=(n,e,t)=>{let i=e-St.BACK_BUFFER_LENGTH;n.length&&(i=Math.max(i,n.start(0)));const s=e-t;return Math.min(s,i)},Kn=n=>{const{startOfSegment:e,duration:t,segment:i,part:s,playlist:{mediaSequence:r,id:a,segments:l=[]},mediaIndex:h,partIndex:m,timeline:g}=n,E=l.length-1;let w="mediaIndex/partIndex increment";n.getMediaInfoForTime?w=`getMediaInfoForTime (${n.getMediaInfoForTime})`:n.isSyncRequest&&(w="getSyncSegmentCandidate (isSyncRequest)"),n.independent&&(w+=` with independent ${n.independent}`);const k=typeof m=="number",x=n.segment.uri?"segment":"pre-segment",L=k?oc({preloadSegment:i})-1:0;return`${x} [${r+h}/${r+E}]`+(k?` part [${m}/${L}]`:"")+` segment start/end [${i.start} => ${i.end}]`+(k?` part start/end [${s.start} => ${s.end}]`:"")+` startOfSegment [${e}] duration [${t}] timeline [${g}] selected by [${w}] playlist [${a}]`},Qc=n=>`${n}TimingInfo`,Jc=(n,e)=>n.length?n.end(n.length-1):e,Eg=({segmentTimeline:n,currentTimeline:e,startOfSegment:t,buffered:i,calculateTimestampOffsetForEachSegment:s,overrideCheck:r})=>s?Jc(i,t):!r&&n===e?null:n<e?t:Jc(i,t),Zc=({timelineChangeController:n,currentTimeline:e,segmentTimeline:t,loaderType:i,audioDisabled:s})=>{if(e===t)return!1;if(i==="audio"){const r=n.lastTimelineChange({type:"main"});return!r||r.to!==t}if(i==="main"&&s){const r=n.pendingTimelineChange({type:"audio"});return!(r&&r.to===t)}return!1},Tg=n=>{let e=0;return["video","audio"].forEach(function(t){const i=n[`${t}TimingInfo`];if(!i)return;const{start:s,end:r}=i;let a;typeof s=="bigint"||typeof r=="bigint"?a=A().BigInt(r)-A().BigInt(s):typeof s=="number"&&typeof r=="number"&&(a=r-s),typeof a!="undefined"&&a>e&&(e=a)}),typeof e=="bigint"&&e<Number.MAX_SAFE_INTEGER&&(e=Number(e)),e},ed=({segmentDuration:n,maxDuration:e})=>n?Math.round(n)>e+qi:!1,Cg=(n,e)=>{if(e!=="hls")return null;const t=Tg({audioTimingInfo:n.audioTimingInfo,videoTimingInfo:n.videoTimingInfo});if(!t)return null;const i=n.playlist.targetDuration,s=ed({segmentDuration:t,maxDuration:i*2}),r=ed({segmentDuration:t,maxDuration:i}),a=`Segment with index ${n.mediaIndex} from playlist ${n.playlist.id} has a duration of ${t} when the reported duration is ${n.duration} and the target duration is ${i}. For HLS content, a duration in excess of the target duration may result in playback issues. See the HLS specification section on EXT-X-TARGETDURATION for more details: https://tools.ietf.org/html/draft-pantos-http-live-streaming-23#section-4.3.3.1`;return s||r?{severity:s?"warn":"info",message:a}:null};class No extends F.EventTarget{constructor(e,t={}){if(super(),!e)throw new TypeError("Initialization settings are required");if(typeof e.currentTime!="function")throw new TypeError("No currentTime getter specified");if(!e.mediaSource)throw new TypeError("No MediaSource specified");this.bandwidth=e.bandwidth,this.throughput={rate:0,count:0},this.roundTrip=NaN,this.resetStats_(),this.mediaIndex=null,this.partIndex=null,this.hasPlayed_=e.hasPlayed,this.currentTime_=e.currentTime,this.seekable_=e.seekable,this.seeking_=e.seeking,this.duration_=e.duration,this.mediaSource_=e.mediaSource,this.vhs_=e.vhs,this.loaderType_=e.loaderType,this.currentMediaInfo_=void 0,this.startingMediaInfo_=void 0,this.segmentMetadataTrack_=e.segmentMetadataTrack,this.goalBufferLength_=e.goalBufferLength,this.sourceType_=e.sourceType,this.sourceUpdater_=e.sourceUpdater,this.inbandTextTracks_=e.inbandTextTracks,this.state_="INIT",this.timelineChangeController_=e.timelineChangeController,this.shouldSaveSegmentTimingInfo_=!0,this.parse708captions_=e.parse708captions,this.useDtsForTimestampOffset_=e.useDtsForTimestampOffset,this.calculateTimestampOffsetForEachSegment_=e.calculateTimestampOffsetForEachSegment,this.captionServices_=e.captionServices,this.exactManifestTimings=e.exactManifestTimings,this.addMetadataToTextTrack=e.addMetadataToTextTrack,this.checkBufferTimeout_=null,this.error_=void 0,this.currentTimeline_=-1,this.pendingSegment_=null,this.xhrOptions_=null,this.pendingSegments_=[],this.audioDisabled_=!1,this.isPendingTimestampOffset_=!1,this.gopBuffer_=[],this.timeMapping_=0,this.safeAppend_=!1,this.appendInitSegment_={audio:!0,video:!0},this.playlistOfLastInitSegment_={audio:null,video:null},this.callQueue_=[],this.loadQueue_=[],this.metadataQueue_={id3:[],caption:[]},this.waitingOnRemove_=!1,this.quotaExceededErrorRetryTimeout_=null,this.activeInitSegmentId_=null,this.initSegments_={},this.cacheEncryptionKeys_=e.cacheEncryptionKeys,this.keyCache_={},this.decrypter_=e.decrypter,this.syncController_=e.syncController,this.syncPoint_={segmentIndex:0,time:0},this.transmuxer_=this.createTransmuxer_(),this.triggerSyncInfoUpdate_=()=>this.trigger("syncinfoupdate"),this.syncController_.on("syncinfoupdate",this.triggerSyncInfoUpdate_),this.mediaSource_.addEventListener("sourceopen",()=>{this.isEndOfStream_()||(this.ended_=!1)}),this.fetchAtBuffer_=!1,this.replaceSegmentsUntil_=-1,this.logger_=ni(`SegmentLoader[${this.loaderType_}]`),Object.defineProperty(this,"state",{get(){return this.state_},set(i){i!==this.state_&&(this.logger_(`${this.state_} -> ${i}`),this.state_=i,this.trigger("statechange"))}}),this.sourceUpdater_.on("ready",()=>{this.hasEnoughInfoToAppend_()&&this.processCallQueue_()}),this.loaderType_==="main"&&this.timelineChangeController_.on("pendingtimelinechange",()=>{this.hasEnoughInfoToAppend_()&&this.processCallQueue_()}),this.loaderType_==="audio"&&this.timelineChangeController_.on("timelinechange",()=>{this.hasEnoughInfoToLoad_()&&this.processLoadQueue_(),this.hasEnoughInfoToAppend_()&&this.processCallQueue_()})}createTransmuxer_(){return Po.createTransmuxer({remux:!1,alignGopsAtEnd:this.safeAppend_,keepOriginalTimestamps:!0,parse708captions:this.parse708captions_,captionServices:this.captionServices_})}resetStats_(){this.mediaBytesTransferred=0,this.mediaRequests=0,this.mediaRequestsAborted=0,this.mediaRequestsTimedout=0,this.mediaRequestsErrored=0,this.mediaTransferDuration=0,this.mediaSecondsLoaded=0,this.mediaAppends=0}dispose(){this.trigger("dispose"),this.state="DISPOSED",this.pause(),this.abort_(),this.transmuxer_&&this.transmuxer_.terminate(),this.resetStats_(),this.checkBufferTimeout_&&A().clearTimeout(this.checkBufferTimeout_),this.syncController_&&this.triggerSyncInfoUpdate_&&this.syncController_.off("syncinfoupdate",this.triggerSyncInfoUpdate_),this.off()}setAudio(e){this.audioDisabled_=!e,e?this.appendInitSegment_.audio=!0:this.sourceUpdater_.removeAudio(0,this.duration_())}abort(){if(this.state!=="WAITING"){this.pendingSegment_&&(this.pendingSegment_=null);return}this.abort_(),this.state="READY",this.paused()||this.monitorBuffer_()}abort_(){this.pendingSegment_&&this.pendingSegment_.abortRequests&&this.pendingSegment_.abortRequests(),this.pendingSegment_=null,this.callQueue_=[],this.loadQueue_=[],this.metadataQueue_.id3=[],this.metadataQueue_.caption=[],this.timelineChangeController_.clearPendingTimelineChange(this.loaderType_),this.waitingOnRemove_=!1,A().clearTimeout(this.quotaExceededErrorRetryTimeout_),this.quotaExceededErrorRetryTimeout_=null}checkForAbort_(e){return this.state==="APPENDING"&&!this.pendingSegment_?(this.state="READY",!0):!this.pendingSegment_||this.pendingSegment_.requestId!==e}error(e){return typeof e!="undefined"&&(this.logger_("error occurred:",e),this.error_=e),this.pendingSegment_=null,this.error_}endOfStream(){this.ended_=!0,this.transmuxer_&&Po.reset(this.transmuxer_),this.gopBuffer_.length=0,this.pause(),this.trigger("ended")}buffered_(){const e=this.getMediaInfo_();if(!this.sourceUpdater_||!e)return Bt();if(this.loaderType_==="main"){const{hasAudio:t,hasVideo:i,isMuxed:s}=e;if(i&&t&&!this.audioDisabled_&&!s)return this.sourceUpdater_.buffered();if(i)return this.sourceUpdater_.videoBuffered()}return this.sourceUpdater_.audioBuffered()}initSegmentForMap(e,t=!1){if(!e)return null;const i=Lr(e);let s=this.initSegments_[i];return t&&!s&&e.bytes&&(this.initSegments_[i]=s={resolvedUri:e.resolvedUri,byterange:e.byterange,bytes:e.bytes,tracks:e.tracks,timescales:e.timescales}),s||e}segmentKey(e,t=!1){if(!e)return null;const i=Cc(e);let s=this.keyCache_[i];this.cacheEncryptionKeys_&&t&&!s&&e.bytes&&(this.keyCache_[i]=s={resolvedUri:e.resolvedUri,bytes:e.bytes});const r={resolvedUri:(s||e).resolvedUri};return s&&(r.bytes=s.bytes),r}couldBeginLoading_(){return this.playlist_&&!this.paused()}load(){if(this.monitorBuffer_(),!!this.playlist_){if(this.state==="INIT"&&this.couldBeginLoading_())return this.init_();!this.couldBeginLoading_()||this.state!=="READY"&&this.state!=="INIT"||(this.state="READY")}}init_(){return this.state="READY",this.resetEverything(),this.monitorBuffer_()}playlist(e,t={}){if(!e)return;const i=this.playlist_,s=this.pendingSegment_;this.playlist_=e,this.xhrOptions_=t,this.state==="INIT"&&(e.syncInfo={mediaSequence:e.mediaSequence,time:0},this.loaderType_==="main"&&this.syncController_.setDateTimeMappingForStart(e));let r=null;if(i&&(i.id?r=i.id:i.uri&&(r=i.uri)),this.logger_(`playlist update [${r} => ${e.id||e.uri}]`),this.trigger("syncinfoupdate"),this.state==="INIT"&&this.couldBeginLoading_())return this.init_();if(!i||i.uri!==e.uri){this.mediaIndex!==null&&(!e.endList&&typeof e.partTargetDuration=="number"?this.resetLoader():this.resyncLoader()),this.currentMediaInfo_=void 0,this.trigger("playlistupdate");return}const a=e.mediaSequence-i.mediaSequence;if(this.logger_(`live window shift [${a}]`),this.mediaIndex!==null)if(this.mediaIndex-=a,this.mediaIndex<0)this.mediaIndex=null,this.partIndex=null;else{const l=this.playlist_.segments[this.mediaIndex];if(this.partIndex&&(!l.parts||!l.parts.length||!l.parts[this.partIndex])){const h=this.mediaIndex;this.logger_(`currently processing part (index ${this.partIndex}) no longer exists.`),this.resetLoader(),this.mediaIndex=h}}s&&(s.mediaIndex-=a,s.mediaIndex<0?(s.mediaIndex=null,s.partIndex=null):(s.mediaIndex>=0&&(s.segment=e.segments[s.mediaIndex]),s.partIndex>=0&&s.segment.parts&&(s.part=s.segment.parts[s.partIndex]))),this.syncController_.saveExpiredSegmentInfo(i,e)}pause(){this.checkBufferTimeout_&&(A().clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=null)}paused(){return this.checkBufferTimeout_===null}resetLoaderProperties(){this.ended_=!1,this.activeInitSegmentId_=null,this.appendInitSegment_={audio:!0,video:!0}}resetEverything(e){this.resetLoaderProperties(),this.resetLoader(),this.remove(0,1/0,e),this.transmuxer_&&(this.transmuxer_.postMessage({action:"clearAllMp4Captions"}),this.transmuxer_.postMessage({action:"reset"}))}resetLoader(){this.fetchAtBuffer_=!1,this.resyncLoader()}resyncLoader(){this.transmuxer_&&Po.reset(this.transmuxer_),this.mediaIndex=null,this.partIndex=null,this.syncPoint_=null,this.isPendingTimestampOffset_=!1,this.callQueue_=[],this.loadQueue_=[],this.metadataQueue_.id3=[],this.metadataQueue_.caption=[],this.abort(),this.transmuxer_&&this.transmuxer_.postMessage({action:"clearParsedMp4Captions"})}remove(e,t,i=()=>{},s=!1){if(t===1/0&&(t=this.duration_()),t<=e){this.logger_("skipping remove because end ${end} is <= start ${start}");return}if(!this.sourceUpdater_||!this.getMediaInfo_()){this.logger_("skipping remove because no source updater or starting media info");return}let r=1;const a=()=>{r--,r===0&&i()};(s||!this.audioDisabled_)&&(r++,this.sourceUpdater_.removeAudio(e,t,a)),(s||this.loaderType_==="main")&&(this.gopBuffer_=gg(this.gopBuffer_,e,t,this.timeMapping_),r++,this.sourceUpdater_.removeVideo(e,t,a));for(const l in this.inbandTextTracks_)ks(e,t,this.inbandTextTracks_[l]);ks(e,t,this.segmentMetadataTrack_),a()}monitorBuffer_(){this.checkBufferTimeout_&&A().clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=A().setTimeout(this.monitorBufferTick_.bind(this),1)}monitorBufferTick_(){this.state==="READY"&&this.fillBuffer_(),this.checkBufferTimeout_&&A().clearTimeout(this.checkBufferTimeout_),this.checkBufferTimeout_=A().setTimeout(this.monitorBufferTick_.bind(this),yg)}fillBuffer_(){if(this.sourceUpdater_.updating())return;const e=this.chooseNextRequest_();e&&(typeof e.timestampOffset=="number"&&(this.isPendingTimestampOffset_=!1,this.timelineChangeController_.pendingTimelineChange({type:this.loaderType_,from:this.currentTimeline_,to:e.timeline})),this.loadSegment_(e))}isEndOfStream_(e=this.mediaIndex,t=this.playlist_,i=this.partIndex){if(!t||!this.mediaSource_)return!1;const s=typeof e=="number"&&t.segments[e],r=e+1===t.segments.length,a=!s||!s.parts||i+1===s.parts.length;return t.endList&&this.mediaSource_.readyState==="open"&&r&&a}chooseNextRequest_(){const e=this.buffered_(),t=rc(e)||0,i=_o(e,this.currentTime_()),s=!this.hasPlayed_()&&i>=1,r=i>=this.goalBufferLength_(),a=this.playlist_.segments;if(!a.length||s||r)return null;this.syncPoint_=this.syncPoint_||this.syncController_.getSyncPoint(this.playlist_,this.duration_(),this.currentTimeline_,this.currentTime_());const l={partIndex:null,mediaIndex:null,startOfSegment:null,playlist:this.playlist_,isSyncRequest:!this.syncPoint_};if(l.isSyncRequest)l.mediaIndex=Ag(this.currentTimeline_,a,t);else if(this.mediaIndex!==null){const w=a[this.mediaIndex],k=typeof this.partIndex=="number"?this.partIndex:-1;l.startOfSegment=w.end?w.end:t,w.parts&&w.parts[k+1]?(l.mediaIndex=this.mediaIndex,l.partIndex=k+1):l.mediaIndex=this.mediaIndex+1}else{const{segmentIndex:w,startTime:k,partIndex:x}=zt.getMediaInfoForTime({exactManifestTimings:this.exactManifestTimings,playlist:this.playlist_,currentTime:this.fetchAtBuffer_?t:this.currentTime_(),startingPartIndex:this.syncPoint_.partIndex,startingSegmentIndex:this.syncPoint_.segmentIndex,startTime:this.syncPoint_.time});l.getMediaInfoForTime=this.fetchAtBuffer_?`bufferedEnd ${t}`:`currentTime ${this.currentTime_()}`,l.mediaIndex=w,l.startOfSegment=k,l.partIndex=x}const h=a[l.mediaIndex];let m=h&&typeof l.partIndex=="number"&&h.parts&&h.parts[l.partIndex];if(!h||typeof l.partIndex=="number"&&!m)return null;typeof l.partIndex!="number"&&h.parts&&(l.partIndex=0,m=h.parts[0]);const g=this.vhs_.playlists&&this.vhs_.playlists.main&&this.vhs_.playlists.main.independentSegments||this.playlist_.independentSegments;if(!i&&m&&!g&&!m.independent)if(l.partIndex===0){const w=a[l.mediaIndex-1],k=w.parts&&w.parts.length&&w.parts[w.parts.length-1];k&&k.independent&&(l.mediaIndex-=1,l.partIndex=w.parts.length-1,l.independent="previous segment")}else h.parts[l.partIndex-1].independent&&(l.partIndex-=1,l.independent="previous part");const E=this.mediaSource_&&this.mediaSource_.readyState==="ended";return l.mediaIndex>=a.length-1&&E&&!this.seeking_()?null:this.generateSegmentInfo_(l)}generateSegmentInfo_(e){const{independent:t,playlist:i,mediaIndex:s,startOfSegment:r,isSyncRequest:a,partIndex:l,forceTimestampOffset:h,getMediaInfoForTime:m}=e,g=i.segments[s],E=typeof l=="number"&&g.parts[l],w={requestId:"segment-loader-"+Math.random(),uri:E&&E.resolvedUri||g.resolvedUri,mediaIndex:s,partIndex:E?l:null,isSyncRequest:a,startOfSegment:r,playlist:i,bytes:null,encryptedBytes:null,timestampOffset:null,timeline:g.timeline,duration:E&&E.duration||g.duration,segment:g,part:E,byteLength:0,transmuxer:this.transmuxer_,getMediaInfoForTime:m,independent:t},k=typeof h!="undefined"?h:this.isPendingTimestampOffset_;w.timestampOffset=this.timestampOffsetForSegment_({segmentTimeline:g.timeline,currentTimeline:this.currentTimeline_,startOfSegment:r,buffered:this.buffered_(),calculateTimestampOffsetForEachSegment:this.calculateTimestampOffsetForEachSegment_,overrideCheck:k});const x=rc(this.sourceUpdater_.audioBuffered());return typeof x=="number"&&(w.audioAppendStart=x-this.sourceUpdater_.audioTimestampOffset()),this.sourceUpdater_.videoBuffered().length&&(w.gopsToAlignWith=pg(this.gopBuffer_,this.currentTime_()-this.sourceUpdater_.videoTimestampOffset(),this.timeMapping_)),w}timestampOffsetForSegment_(e){return Eg(e)}earlyAbortWhenNeeded_(e){if(this.vhs_.tech_.paused()||!this.xhrOptions_.timeout||!this.playlist_.attributes.BANDWIDTH||Date.now()-(e.firstBytesReceivedAt||Date.now())<1e3)return;const t=this.currentTime_(),i=e.bandwidth,s=this.pendingSegment_.duration,r=zt.estimateSegmentRequestTime(s,i,this.playlist_,e.bytesReceived),a=Gp(this.buffered_(),t,this.vhs_.tech_.playbackRate())-1;if(r<=a)return;const l=ng({main:this.vhs_.playlists.main,currentTime:t,bandwidth:i,duration:this.duration_(),segmentDuration:s,timeUntilRebuffer:a,currentTimeline:this.currentTimeline_,syncController:this.syncController_});if(!l)return;const m=r-a-l.rebufferingImpact;let g=.5;a<=qi&&(g=1),!(!l.playlist||l.playlist.uri===this.playlist_.uri||m<g)&&(this.bandwidth=l.playlist.attributes.BANDWIDTH*St.BANDWIDTH_VARIANCE+1,this.trigger("earlyabort"))}handleAbort_(e){this.logger_(`Aborting ${Kn(e)}`),this.mediaRequestsAborted+=1}handleProgress_(e,t){this.earlyAbortWhenNeeded_(t.stats),!this.checkForAbort_(t.requestId)&&this.trigger("progress")}handleTrackInfo_(e,t){this.earlyAbortWhenNeeded_(e.stats),!this.checkForAbort_(e.requestId)&&(this.checkForIllegalMediaSwitch(t)||(t=t||{},vg(this.currentMediaInfo_,t)||(this.appendInitSegment_={audio:!0,video:!0},this.startingMediaInfo_=t,this.currentMediaInfo_=t,this.logger_("trackinfo update",t),this.trigger("trackinfo")),!this.checkForAbort_(e.requestId)&&(this.pendingSegment_.trackInfo=t,this.hasEnoughInfoToAppend_()&&this.processCallQueue_())))}handleTimingInfo_(e,t,i,s){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;const r=this.pendingSegment_,a=Qc(t);r[a]=r[a]||{},r[a][i]=s,this.logger_(`timinginfo: ${t} - ${i} - ${s}`),this.hasEnoughInfoToAppend_()&&this.processCallQueue_()}handleCaptions_(e,t){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;if(t.length===0){this.logger_("SegmentLoader received no captions from a caption event");return}if(!this.pendingSegment_.hasAppendedData_){this.metadataQueue_.caption.push(this.handleCaptions_.bind(this,e,t));return}const s=this.sourceUpdater_.videoTimestampOffset()===null?this.sourceUpdater_.audioTimestampOffset():this.sourceUpdater_.videoTimestampOffset(),r={};t.forEach(a=>{r[a.stream]=r[a.stream]||{startTime:1/0,captions:[],endTime:0};const l=r[a.stream];l.startTime=Math.min(l.startTime,a.startTime+s),l.endTime=Math.max(l.endTime,a.endTime+s),l.captions.push(a)}),Object.keys(r).forEach(a=>{const{startTime:l,endTime:h,captions:m}=r[a],g=this.inbandTextTracks_;this.logger_(`adding cues from ${l} -> ${h} for ${a}`),ag(g,this.vhs_.tech_,a),ks(l,h,g[a]),og({captionArray:m,inbandTextTracks:g,timestampOffset:s})}),this.transmuxer_&&this.transmuxer_.postMessage({action:"clearParsedMp4Captions"})}handleId3_(e,t,i){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;if(!this.pendingSegment_.hasAppendedData_){this.metadataQueue_.id3.push(this.handleId3_.bind(this,e,t,i));return}this.addMetadataToTextTrack(i,t,this.duration_())}processMetadataQueue_(){this.metadataQueue_.id3.forEach(e=>e()),this.metadataQueue_.caption.forEach(e=>e()),this.metadataQueue_.id3=[],this.metadataQueue_.caption=[]}processCallQueue_(){const e=this.callQueue_;this.callQueue_=[],e.forEach(t=>t())}processLoadQueue_(){const e=this.loadQueue_;this.loadQueue_=[],e.forEach(t=>t())}hasEnoughInfoToLoad_(){if(this.loaderType_!=="audio")return!0;const e=this.pendingSegment_;return e?this.getCurrentMediaInfo_()?!Zc({timelineChangeController:this.timelineChangeController_,currentTimeline:this.currentTimeline_,segmentTimeline:e.timeline,loaderType:this.loaderType_,audioDisabled:this.audioDisabled_}):!0:!1}getCurrentMediaInfo_(e=this.pendingSegment_){return e&&e.trackInfo||this.currentMediaInfo_}getMediaInfo_(e=this.pendingSegment_){return this.getCurrentMediaInfo_(e)||this.startingMediaInfo_}getPendingSegmentPlaylist(){return this.pendingSegment_?this.pendingSegment_.playlist:null}hasEnoughInfoToAppend_(){if(!this.sourceUpdater_.ready()||this.waitingOnRemove_||this.quotaExceededErrorRetryTimeout_)return!1;const e=this.pendingSegment_,t=this.getCurrentMediaInfo_();if(!e||!t)return!1;const{hasAudio:i,hasVideo:s,isMuxed:r}=t;return!(s&&!e.videoTimingInfo||i&&!this.audioDisabled_&&!r&&!e.audioTimingInfo||Zc({timelineChangeController:this.timelineChangeController_,currentTimeline:this.currentTimeline_,segmentTimeline:e.timeline,loaderType:this.loaderType_,audioDisabled:this.audioDisabled_}))}handleData_(e,t){if(this.earlyAbortWhenNeeded_(e.stats),this.checkForAbort_(e.requestId))return;if(this.callQueue_.length||!this.hasEnoughInfoToAppend_()){this.callQueue_.push(this.handleData_.bind(this,e,t));return}const i=this.pendingSegment_;if(this.setTimeMapping_(i.timeline),this.updateMediaSecondsLoaded_(i.part||i.segment),this.mediaSource_.readyState!=="closed"){if(e.map&&(e.map=this.initSegmentForMap(e.map,!0),i.segment.map=e.map),e.key&&this.segmentKey(e.key,!0),i.isFmp4=e.isFmp4,i.timingInfo=i.timingInfo||{},i.isFmp4)this.trigger("fmp4"),i.timingInfo.start=i[Qc(t.type)].start;else{const s=this.getCurrentMediaInfo_(),r=this.loaderType_==="main"&&s&&s.hasVideo;let a;r&&(a=i.videoTimingInfo.start),i.timingInfo.start=this.trueSegmentStart_({currentStart:i.timingInfo.start,playlist:i.playlist,mediaIndex:i.mediaIndex,currentVideoTimestampOffset:this.sourceUpdater_.videoTimestampOffset(),useVideoTimingInfo:r,firstVideoFrameTimeForData:a,videoTimingInfo:i.videoTimingInfo,audioTimingInfo:i.audioTimingInfo})}if(this.updateAppendInitSegmentStatus(i,t.type),this.updateSourceBufferTimestampOffset_(i),i.isSyncRequest){this.updateTimingInfoEnd_(i),this.syncController_.saveSegmentTimingInfo({segmentInfo:i,shouldSaveTimelineMapping:this.loaderType_==="main"});const s=this.chooseNextRequest_();if(s.mediaIndex!==i.mediaIndex||s.partIndex!==i.partIndex){this.logger_("sync segment was incorrect, not appending");return}this.logger_("sync segment was correct, appending")}i.hasAppendedData_=!0,this.processMetadataQueue_(),this.appendData_(i,t)}}updateAppendInitSegmentStatus(e,t){this.loaderType_==="main"&&typeof e.timestampOffset=="number"&&!e.changedTimestampOffset&&(this.appendInitSegment_={audio:!0,video:!0}),this.playlistOfLastInitSegment_[t]!==e.playlist&&(this.appendInitSegment_[t]=!0)}getInitSegmentAndUpdateState_({type:e,initSegment:t,map:i,playlist:s}){if(i){const r=Lr(i);if(this.activeInitSegmentId_===r)return null;t=this.initSegmentForMap(i,!0).bytes,this.activeInitSegmentId_=r}return t&&this.appendInitSegment_[e]?(this.playlistOfLastInitSegment_[e]=s,this.appendInitSegment_[e]=!1,this.activeInitSegmentId_=null,t):null}handleQuotaExceededError_({segmentInfo:e,type:t,bytes:i},s){const r=this.sourceUpdater_.audioBuffered(),a=this.sourceUpdater_.videoBuffered();r.length>1&&this.logger_("On QUOTA_EXCEEDED_ERR, found gaps in the audio buffer: "+an(r).join(", ")),a.length>1&&this.logger_("On QUOTA_EXCEEDED_ERR, found gaps in the video buffer: "+an(a).join(", "));const l=r.length?r.start(0):0,h=r.length?r.end(r.length-1):0,m=a.length?a.start(0):0,g=a.length?a.end(a.length-1):0;if(h-l<=Is&&g-m<=Is){this.logger_(`On QUOTA_EXCEEDED_ERR, single segment too large to append to buffer, triggering an error. Appended byte length: ${i.byteLength}, audio buffer: ${an(r).join(", ")}, video buffer: ${an(a).join(", ")}, `),this.error({message:"Quota exceeded error with append of a single segment of content",excludeUntil:1/0}),this.trigger("error");return}this.waitingOnRemove_=!0,this.callQueue_.push(this.appendToSourceBuffer_.bind(this,{segmentInfo:e,type:t,bytes:i}));const w=this.currentTime_()-Is;this.logger_(`On QUOTA_EXCEEDED_ERR, removing audio/video from 0 to ${w}`),this.remove(0,w,()=>{this.logger_(`On QUOTA_EXCEEDED_ERR, retrying append in ${Is}s`),this.waitingOnRemove_=!1,this.quotaExceededErrorRetryTimeout_=A().setTimeout(()=>{this.logger_("On QUOTA_EXCEEDED_ERR, re-processing call queue"),this.quotaExceededErrorRetryTimeout_=null,this.processCallQueue_()},Is*1e3)},!0)}handleAppendError_({segmentInfo:e,type:t,bytes:i},s){if(s){if(s.code===Yc){this.handleQuotaExceededError_({segmentInfo:e,type:t,bytes:i});return}this.logger_("Received non QUOTA_EXCEEDED_ERR on append",s),this.error(`${t} append of ${i.length}b failed for segment #${e.mediaIndex} in playlist ${e.playlist.id}`),this.trigger("appenderror")}}appendToSourceBuffer_({segmentInfo:e,type:t,initSegment:i,data:s,bytes:r}){if(!r){const a=[s];let l=s.byteLength;i&&(a.unshift(i),l+=i.byteLength),r=rg({bytes:l,segments:a})}this.sourceUpdater_.appendBuffer({segmentInfo:e,type:t,bytes:r},this.handleAppendError_.bind(this,{segmentInfo:e,type:t,bytes:r}))}handleSegmentTimingInfo_(e,t,i){if(!this.pendingSegment_||t!==this.pendingSegment_.requestId)return;const s=this.pendingSegment_.segment,r=`${e}TimingInfo`;s[r]||(s[r]={}),s[r].transmuxerPrependedSeconds=i.prependedContentDuration||0,s[r].transmuxedPresentationStart=i.start.presentation,s[r].transmuxedDecodeStart=i.start.decode,s[r].transmuxedPresentationEnd=i.end.presentation,s[r].transmuxedDecodeEnd=i.end.decode,s[r].baseMediaDecodeTime=i.baseMediaDecodeTime}appendData_(e,t){const{type:i,data:s}=t;if(!s||!s.byteLength||i==="audio"&&this.audioDisabled_)return;const r=this.getInitSegmentAndUpdateState_({type:i,initSegment:t.initSegment,playlist:e.playlist,map:e.isFmp4?e.segment.map:null});this.appendToSourceBuffer_({segmentInfo:e,type:i,initSegment:r,data:s})}loadSegment_(e){if(this.state="WAITING",this.pendingSegment_=e,this.trimBackBuffer_(e),typeof e.timestampOffset=="number"&&this.transmuxer_&&this.transmuxer_.postMessage({action:"clearAllMp4Captions"}),!this.hasEnoughInfoToLoad_()){this.loadQueue_.push(()=>{const t=(0,We.Z)({},e,{forceTimestampOffset:!0});(0,We.Z)(e,this.generateSegmentInfo_(t)),this.isPendingTimestampOffset_=!1,this.updateTransmuxerAndRequestSegment_(e)});return}this.updateTransmuxerAndRequestSegment_(e)}updateTransmuxerAndRequestSegment_(e){this.shouldUpdateTransmuxerTimestampOffset_(e.timestampOffset)&&(this.gopBuffer_.length=0,e.gopsToAlignWith=[],this.timeMapping_=0,this.transmuxer_.postMessage({action:"reset"}),this.transmuxer_.postMessage({action:"setTimestampOffset",timestampOffset:e.timestampOffset}));const t=this.createSimplifiedSegmentObj_(e),i=this.isEndOfStream_(e.mediaIndex,e.playlist,e.partIndex),s=this.mediaIndex!==null,r=e.timeline!==this.currentTimeline_&&e.timeline>0,a=i||s&&r;this.logger_(`Requesting ${Kn(e)}`),t.map&&!t.map.bytes&&(this.logger_("going to request init segment."),this.appendInitSegment_={video:!0,audio:!0}),e.abortRequests=Qm({xhr:this.vhs_.xhr,xhrOptions:this.xhrOptions_,decryptionWorker:this.decrypter_,segment:t,abortFn:this.handleAbort_.bind(this,e),progressFn:this.handleProgress_.bind(this),trackInfoFn:this.handleTrackInfo_.bind(this),timingInfoFn:this.handleTimingInfo_.bind(this),videoSegmentTimingInfoFn:this.handleSegmentTimingInfo_.bind(this,"video",e.requestId),audioSegmentTimingInfoFn:this.handleSegmentTimingInfo_.bind(this,"audio",e.requestId),captionsFn:this.handleCaptions_.bind(this),isEndOfTimeline:a,endedTimelineFn:()=>{this.logger_("received endedtimeline callback")},id3Fn:this.handleId3_.bind(this),dataFn:this.handleData_.bind(this),doneFn:this.segmentRequestFinished_.bind(this),onTransmuxerLog:({message:l,level:h,stream:m})=>{this.logger_(`${Kn(e)} logged from transmuxer stream ${m} as a ${h}: ${l}`)}})}trimBackBuffer_(e){const t=bg(this.seekable_(),this.currentTime_(),this.playlist_.targetDuration||10);t>0&&this.remove(0,t)}createSimplifiedSegmentObj_(e){const t=e.segment,i=e.part,s={resolvedUri:i?i.resolvedUri:t.resolvedUri,byterange:i?i.byterange:t.byterange,requestId:e.requestId,transmuxer:e.transmuxer,audioAppendStart:e.audioAppendStart,gopsToAlignWith:e.gopsToAlignWith,part:e.part},r=e.playlist.segments[e.mediaIndex-1];if(r&&r.timeline===t.timeline&&(r.videoTimingInfo?s.baseStartTime=r.videoTimingInfo.transmuxedDecodeEnd:r.audioTimingInfo&&(s.baseStartTime=r.audioTimingInfo.transmuxedDecodeEnd)),t.key){const a=t.key.iv||new Uint32Array([0,0,0,e.mediaIndex+e.playlist.mediaSequence]);s.key=this.segmentKey(t.key),s.key.iv=a}return t.map&&(s.map=this.initSegmentForMap(t.map)),s}saveTransferStats_(e){this.mediaRequests+=1,e&&(this.mediaBytesTransferred+=e.bytesReceived,this.mediaTransferDuration+=e.roundTripTime)}saveBandwidthRelatedStats_(e,t){if(this.pendingSegment_.byteLength=t.bytesReceived,e<Mr){this.logger_(`Ignoring segment's bandwidth because its duration of ${e} is less than the min to record ${Mr}`);return}this.bandwidth=t.bandwidth,this.roundTrip=t.roundTripTime}handleTimeout_(){this.mediaRequestsTimedout+=1,this.bandwidth=1,this.roundTrip=NaN,this.trigger("bandwidthupdate"),this.trigger("timeout")}segmentRequestFinished_(e,t,i){if(this.callQueue_.length){this.callQueue_.push(this.segmentRequestFinished_.bind(this,e,t,i));return}if(this.saveTransferStats_(t.stats),!this.pendingSegment_||t.requestId!==this.pendingSegment_.requestId)return;if(e){if(this.pendingSegment_=null,this.state="READY",e.code===Ei.ABORTED)return;if(this.pause(),e.code===Ei.TIMEOUT){this.handleTimeout_();return}this.mediaRequestsErrored+=1,this.error(e),this.trigger("error");return}const s=this.pendingSegment_;this.saveBandwidthRelatedStats_(s.duration,t.stats),s.endOfAllRequests=t.endOfAllRequests,i.gopInfo&&(this.gopBuffer_=mg(this.gopBuffer_,i.gopInfo,this.safeAppend_)),this.state="APPENDING",this.trigger("appending"),this.waitForAppendsToComplete_(s)}setTimeMapping_(e){const t=this.syncController_.mappingForTimeline(e);t!==null&&(this.timeMapping_=t)}updateMediaSecondsLoaded_(e){typeof e.start=="number"&&typeof e.end=="number"?this.mediaSecondsLoaded+=e.end-e.start:this.mediaSecondsLoaded+=e.duration}shouldUpdateTransmuxerTimestampOffset_(e){return e===null?!1:this.loaderType_==="main"&&e!==this.sourceUpdater_.videoTimestampOffset()||!this.audioDisabled_&&e!==this.sourceUpdater_.audioTimestampOffset()}trueSegmentStart_({currentStart:e,playlist:t,mediaIndex:i,firstVideoFrameTimeForData:s,currentVideoTimestampOffset:r,useVideoTimingInfo:a,videoTimingInfo:l,audioTimingInfo:h}){if(typeof e!="undefined")return e;if(!a)return h.start;const m=t.segments[i-1];return i===0||!m||typeof m.start=="undefined"||m.end!==s+r?s:l.start}waitForAppendsToComplete_(e){const t=this.getCurrentMediaInfo_(e);if(!t){this.error({message:"No starting media returned, likely due to an unsupported media format.",playlistExclusionDuration:1/0}),this.trigger("error");return}const{hasAudio:i,hasVideo:s,isMuxed:r}=t,a=this.loaderType_==="main"&&s,l=!this.audioDisabled_&&i&&!r;if(e.waitingOnAppends=0,!e.hasAppendedData_){!e.timingInfo&&typeof e.timestampOffset=="number"&&(this.isPendingTimestampOffset_=!0),e.timingInfo={start:0},e.waitingOnAppends++,this.isPendingTimestampOffset_||(this.updateSourceBufferTimestampOffset_(e),this.processMetadataQueue_()),this.checkAppendsDone_(e);return}a&&e.waitingOnAppends++,l&&e.waitingOnAppends++,a&&this.sourceUpdater_.videoQueueCallback(this.checkAppendsDone_.bind(this,e)),l&&this.sourceUpdater_.audioQueueCallback(this.checkAppendsDone_.bind(this,e))}checkAppendsDone_(e){this.checkForAbort_(e.requestId)||(e.waitingOnAppends--,e.waitingOnAppends===0&&this.handleAppendsDone_())}checkForIllegalMediaSwitch(e){const t=_g(this.loaderType_,this.getCurrentMediaInfo_(),e);return t?(this.error({message:t,playlistExclusionDuration:1/0}),this.trigger("error"),!0):!1}updateSourceBufferTimestampOffset_(e){if(e.timestampOffset===null||typeof e.timingInfo.start!="number"||e.changedTimestampOffset||this.loaderType_!=="main")return;let t=!1;e.timestampOffset-=this.getSegmentStartTimeForTimestampOffsetCalculation_({videoTimingInfo:e.segment.videoTimingInfo,audioTimingInfo:e.segment.audioTimingInfo,timingInfo:e.timingInfo}),e.changedTimestampOffset=!0,e.timestampOffset!==this.sourceUpdater_.videoTimestampOffset()&&(this.sourceUpdater_.videoTimestampOffset(e.timestampOffset),t=!0),e.timestampOffset!==this.sourceUpdater_.audioTimestampOffset()&&(this.sourceUpdater_.audioTimestampOffset(e.timestampOffset),t=!0),t&&this.trigger("timestampoffset")}getSegmentStartTimeForTimestampOffsetCalculation_({videoTimingInfo:e,audioTimingInfo:t,timingInfo:i}){return this.useDtsForTimestampOffset_?e&&typeof e.transmuxedDecodeStart=="number"?e.transmuxedDecodeStart:t&&typeof t.transmuxedDecodeStart=="number"?t.transmuxedDecodeStart:i.start:i.start}updateTimingInfoEnd_(e){e.timingInfo=e.timingInfo||{};const t=this.getMediaInfo_(),s=this.loaderType_==="main"&&t&&t.hasVideo&&e.videoTimingInfo?e.videoTimingInfo:e.audioTimingInfo;s&&(e.timingInfo.end=typeof s.end=="number"?s.end:s.start+e.duration)}handleAppendsDone_(){if(this.pendingSegment_&&this.trigger("appendsdone"),!this.pendingSegment_){this.state="READY",this.paused()||this.monitorBuffer_();return}const e=this.pendingSegment_;this.updateTimingInfoEnd_(e),this.shouldSaveSegmentTimingInfo_&&this.syncController_.saveSegmentTimingInfo({segmentInfo:e,shouldSaveTimelineMapping:this.loaderType_==="main"});const t=Cg(e,this.sourceType_);if(t&&(t.severity==="warn"?F.log.warn(t.message):this.logger_(t.message)),this.recordThroughput_(e),this.pendingSegment_=null,this.state="READY",e.isSyncRequest&&(this.trigger("syncinfoupdate"),!e.hasAppendedData_)){this.logger_(`Throwing away un-appended sync request ${Kn(e)}`);return}this.logger_(`Appended ${Kn(e)}`),this.addSegmentMetadataCue_(e),this.currentTime_()>=this.replaceSegmentsUntil_&&(this.replaceSegmentsUntil_=-1,this.fetchAtBuffer_=!0),this.currentTimeline_!==e.timeline&&(this.timelineChangeController_.lastTimelineChange({type:this.loaderType_,from:this.currentTimeline_,to:e.timeline}),this.loaderType_==="main"&&!this.audioDisabled_&&this.timelineChangeController_.lastTimelineChange({type:"audio",from:this.currentTimeline_,to:e.timeline})),this.currentTimeline_=e.timeline,this.trigger("syncinfoupdate");const i=e.segment,s=e.part,r=i.end&&this.currentTime_()-i.end>e.playlist.targetDuration*3,a=s&&s.end&&this.currentTime_()-s.end>e.playlist.partTargetDuration*3;if(r||a){this.logger_(`bad ${r?"segment":"part"} ${Kn(e)}`),this.resetEverything();return}this.mediaIndex!==null&&this.trigger("bandwidthupdate"),this.trigger("progress"),this.mediaIndex=e.mediaIndex,this.partIndex=e.partIndex,this.isEndOfStream_(e.mediaIndex,e.playlist,e.partIndex)&&this.endOfStream(),this.trigger("appended"),e.hasAppendedData_&&this.mediaAppends++,this.paused()||this.monitorBuffer_()}recordThroughput_(e){if(e.duration<Mr){this.logger_(`Ignoring segment's throughput because its duration of ${e.duration} is less than the min to record ${Mr}`);return}const t=this.throughput.rate,i=Date.now()-e.endOfAllRequests+1,s=Math.floor(e.byteLength/i*8*1e3);this.throughput.rate+=(s-t)/++this.throughput.count}addSegmentMetadataCue_(e){if(!this.segmentMetadataTrack_)return;const t=e.segment,i=t.start,s=t.end;if(!Kc(i)||!Kc(s))return;ks(i,s,this.segmentMetadataTrack_);const r=A().WebKitDataCue||A().VTTCue,a={custom:t.custom,dateTimeObject:t.dateTimeObject,dateTimeString:t.dateTimeString,programDateTime:t.programDateTime,bandwidth:e.playlist.attributes.BANDWIDTH,resolution:e.playlist.attributes.RESOLUTION,codecs:e.playlist.attributes.CODECS,byteLength:e.byteLength,uri:e.uri,timeline:e.timeline,playlist:e.playlist.id,start:i,end:s},l=JSON.stringify(a),h=new r(i,s,l);h.value=a,this.segmentMetadataTrack_.addCue(h)}set replaceSegmentsUntil(e){this.logger_(`Replacing currently buffered segments until ${e}`),this.replaceSegmentsUntil_=e}}function Ii(){}const td=function(n){return typeof n!="string"?n:n.replace(/./,e=>e.toUpperCase())},xg=["video","audio"],Mo=(n,e)=>{const t=e[`${n}Buffer`];return t&&t.updating||e.queuePending[n]},Sg=(n,e)=>{for(let t=0;t<e.length;t++){const i=e[t];if(i.type==="mediaSource")return null;if(i.type===n)return t}return null},Qn=(n,e)=>{if(e.queue.length===0)return;let t=0,i=e.queue[t];if(i.type==="mediaSource"){!e.updating()&&e.mediaSource.readyState!=="closed"&&(e.queue.shift(),i.action(e),i.doneFn&&i.doneFn(),Qn("audio",e),Qn("video",e));return}if(n!=="mediaSource"&&!(!e.ready()||e.mediaSource.readyState==="closed"||Mo(n,e))){if(i.type!==n){if(t=Sg(n,e.queue),t===null)return;i=e.queue[t]}if(e.queue.splice(t,1),e.queuePending[n]=i,i.action(n,e),!i.doneFn){e.queuePending[n]=null,Qn(n,e);return}}},id=(n,e)=>{const t=e[`${n}Buffer`],i=td(n);t&&(t.removeEventListener("updateend",e[`on${i}UpdateEnd_`]),t.removeEventListener("error",e[`on${i}Error_`]),e.codecs[n]=null,e[`${n}Buffer`]=null)},Ti=(n,e)=>n&&e&&Array.prototype.indexOf.call(n.sourceBuffers,e)!==-1,Yt={appendBuffer:(n,e,t)=>(i,s)=>{const r=s[`${i}Buffer`];if(Ti(s.mediaSource,r)){s.logger_(`Appending segment ${e.mediaIndex}'s ${n.length} bytes to ${i}Buffer`);try{r.appendBuffer(n)}catch(a){s.logger_(`Error with code ${a.code} `+(a.code===Yc?"(QUOTA_EXCEEDED_ERR) ":"")+`when appending segment ${e.mediaIndex} to ${i}Buffer`),s.queuePending[i]=null,t(a)}}},remove:(n,e)=>(t,i)=>{const s=i[`${t}Buffer`];if(Ti(i.mediaSource,s)){i.logger_(`Removing ${n} to ${e} from ${t}Buffer`);try{s.remove(n,e)}catch(r){i.logger_(`Remove ${n} to ${e} from ${t}Buffer failed`)}}},timestampOffset:n=>(e,t)=>{const i=t[`${e}Buffer`];Ti(t.mediaSource,i)&&(t.logger_(`Setting ${e}timestampOffset to ${n}`),i.timestampOffset=n)},callback:n=>(e,t)=>{n()},endOfStream:n=>e=>{if(e.mediaSource.readyState==="open"){e.logger_(`Calling mediaSource endOfStream(${n||""})`);try{e.mediaSource.endOfStream(n)}catch(t){F.log.warn("Failed to call media source endOfStream",t)}}},duration:n=>e=>{e.logger_(`Setting mediaSource duration to ${n}`);try{e.mediaSource.duration=n}catch(t){F.log.warn("Failed to set media source duration",t)}},abort:()=>(n,e)=>{if(e.mediaSource.readyState!=="open")return;const t=e[`${n}Buffer`];if(Ti(e.mediaSource,t)){e.logger_(`calling abort on ${n}Buffer`);try{t.abort()}catch(i){F.log.warn(`Failed to abort on ${n}Buffer`,i)}}},addSourceBuffer:(n,e)=>t=>{const i=td(n),s=ct(e);t.logger_(`Adding ${n}Buffer with codec ${e} to mediaSource`);const r=t.mediaSource.addSourceBuffer(s);r.addEventListener("updateend",t[`on${i}UpdateEnd_`]),r.addEventListener("error",t[`on${i}Error_`]),t.codecs[n]=e,t[`${n}Buffer`]=r},removeSourceBuffer:n=>e=>{const t=e[`${n}Buffer`];if(id(n,e),!!Ti(e.mediaSource,t)){e.logger_(`Removing ${n}Buffer with codec ${e.codecs[n]} from mediaSource`);try{e.mediaSource.removeSourceBuffer(t)}catch(i){F.log.warn(`Failed to removeSourceBuffer ${n}Buffer`,i)}}},changeType:n=>(e,t)=>{const i=t[`${e}Buffer`],s=ct(n);Ti(t.mediaSource,i)&&t.codecs[e]!==n&&(t.logger_(`changing ${e}Buffer codec from ${t.codecs[e]} to ${n}`),i.changeType(s),t.codecs[e]=n)}},Kt=({type:n,sourceUpdater:e,action:t,doneFn:i,name:s})=>{e.queue.push({type:n,action:t,doneFn:i,name:s}),Qn(n,e)},nd=(n,e)=>t=>{const i=e[`${n}Buffered`](),s=Hp(i);if(e.logger_(`${n} source buffer update end. Buffered: 
`,s),e.queuePending[n]){const r=e.queuePending[n].doneFn;e.queuePending[n]=null,r&&r(e[`${n}Error_`])}Qn(n,e)};class sd extends F.EventTarget{constructor(e){super(),this.mediaSource=e,this.sourceopenListener_=()=>Qn("mediaSource",this),this.mediaSource.addEventListener("sourceopen",this.sourceopenListener_),this.logger_=ni("SourceUpdater"),this.audioTimestampOffset_=0,this.videoTimestampOffset_=0,this.queue=[],this.queuePending={audio:null,video:null},this.delayedAudioAppendQueue_=[],this.videoAppendQueued_=!1,this.codecs={},this.onVideoUpdateEnd_=nd("video",this),this.onAudioUpdateEnd_=nd("audio",this),this.onVideoError_=t=>{this.videoError_=t},this.onAudioError_=t=>{this.audioError_=t},this.createdSourceBuffers_=!1,this.initializedEme_=!1,this.triggeredReady_=!1}initializedEme(){this.initializedEme_=!0,this.triggerReady()}hasCreatedSourceBuffers(){return this.createdSourceBuffers_}hasInitializedAnyEme(){return this.initializedEme_}ready(){return this.hasCreatedSourceBuffers()&&this.hasInitializedAnyEme()}createSourceBuffers(e){this.hasCreatedSourceBuffers()||(this.addOrChangeSourceBuffers(e),this.createdSourceBuffers_=!0,this.trigger("createdsourcebuffers"),this.triggerReady())}triggerReady(){this.ready()&&!this.triggeredReady_&&(this.triggeredReady_=!0,this.trigger("ready"))}addSourceBuffer(e,t){Kt({type:"mediaSource",sourceUpdater:this,action:Yt.addSourceBuffer(e,t),name:"addSourceBuffer"})}abort(e){Kt({type:e,sourceUpdater:this,action:Yt.abort(e),name:"abort"})}removeSourceBuffer(e){if(!this.canRemoveSourceBuffer()){F.log.error("removeSourceBuffer is not supported!");return}Kt({type:"mediaSource",sourceUpdater:this,action:Yt.removeSourceBuffer(e),name:"removeSourceBuffer"})}canRemoveSourceBuffer(){return!F.browser.IS_FIREFOX&&A().MediaSource&&A().MediaSource.prototype&&typeof A().MediaSource.prototype.removeSourceBuffer=="function"}static canChangeType(){return A().SourceBuffer&&A().SourceBuffer.prototype&&typeof A().SourceBuffer.prototype.changeType=="function"}canChangeType(){return this.constructor.canChangeType()}changeType(e,t){if(!this.canChangeType()){F.log.error("changeType is not supported!");return}Kt({type:e,sourceUpdater:this,action:Yt.changeType(t),name:"changeType"})}addOrChangeSourceBuffers(e){if(!e||typeof e!="object"||Object.keys(e).length===0)throw new Error("Cannot addOrChangeSourceBuffers to undefined codecs");Object.keys(e).forEach(t=>{const i=e[t];if(!this.hasCreatedSourceBuffers())return this.addSourceBuffer(t,i);this.canChangeType()&&this.changeType(t,i)})}appendBuffer(e,t){const{segmentInfo:i,type:s,bytes:r}=e;if(this.processedAppend_=!0,s==="audio"&&this.videoBuffer&&!this.videoAppendQueued_){this.delayedAudioAppendQueue_.push([e,t]),this.logger_(`delayed audio append of ${r.length} until video append`);return}const a=t;if(Kt({type:s,sourceUpdater:this,action:Yt.appendBuffer(r,i||{mediaIndex:-1},a),doneFn:t,name:"appendBuffer"}),s==="video"){if(this.videoAppendQueued_=!0,!this.delayedAudioAppendQueue_.length)return;const l=this.delayedAudioAppendQueue_.slice();this.logger_(`queuing delayed audio ${l.length} appendBuffers`),this.delayedAudioAppendQueue_.length=0,l.forEach(h=>{this.appendBuffer.apply(this,h)})}}audioBuffered(){return Ti(this.mediaSource,this.audioBuffer)&&this.audioBuffer.buffered?this.audioBuffer.buffered:Bt()}videoBuffered(){return Ti(this.mediaSource,this.videoBuffer)&&this.videoBuffer.buffered?this.videoBuffer.buffered:Bt()}buffered(){const e=Ti(this.mediaSource,this.videoBuffer)?this.videoBuffer:null,t=Ti(this.mediaSource,this.audioBuffer)?this.audioBuffer:null;return t&&!e?this.audioBuffered():e&&!t?this.videoBuffered():Wp(this.audioBuffered(),this.videoBuffered())}setDuration(e,t=Ii){Kt({type:"mediaSource",sourceUpdater:this,action:Yt.duration(e),name:"duration",doneFn:t})}endOfStream(e=null,t=Ii){typeof e!="string"&&(e=void 0),Kt({type:"mediaSource",sourceUpdater:this,action:Yt.endOfStream(e),name:"endOfStream",doneFn:t})}removeAudio(e,t,i=Ii){if(!this.audioBuffered().length||this.audioBuffered().end(0)===0){i();return}Kt({type:"audio",sourceUpdater:this,action:Yt.remove(e,t),doneFn:i,name:"remove"})}removeVideo(e,t,i=Ii){if(!this.videoBuffered().length||this.videoBuffered().end(0)===0){i();return}Kt({type:"video",sourceUpdater:this,action:Yt.remove(e,t),doneFn:i,name:"remove"})}updating(){return!!(Mo("audio",this)||Mo("video",this))}audioTimestampOffset(e){return typeof e!="undefined"&&this.audioBuffer&&this.audioTimestampOffset_!==e&&(Kt({type:"audio",sourceUpdater:this,action:Yt.timestampOffset(e),name:"timestampOffset"}),this.audioTimestampOffset_=e),this.audioTimestampOffset_}videoTimestampOffset(e){return typeof e!="undefined"&&this.videoBuffer&&this.videoTimestampOffset!==e&&(Kt({type:"video",sourceUpdater:this,action:Yt.timestampOffset(e),name:"timestampOffset"}),this.videoTimestampOffset_=e),this.videoTimestampOffset_}audioQueueCallback(e){this.audioBuffer&&Kt({type:"audio",sourceUpdater:this,action:Yt.callback(e),name:"callback"})}videoQueueCallback(e){this.videoBuffer&&Kt({type:"video",sourceUpdater:this,action:Yt.callback(e),name:"callback"})}dispose(){this.trigger("dispose"),xg.forEach(e=>{this.abort(e),this.canRemoveSourceBuffer()?this.removeSourceBuffer(e):this[`${e}QueueCallback`](()=>id(e,this))}),this.videoAppendQueued_=!1,this.delayedAudioAppendQueue_.length=0,this.sourceopenListener_&&this.mediaSource.removeEventListener("sourceopen",this.sourceopenListener_),this.off()}}const rd=n=>decodeURIComponent(escape(String.fromCharCode.apply(null,n))),ad=new Uint8Array(`

`.split("").map(n=>n.charCodeAt(0)));class jg extends Error{constructor(){super("Trying to parse received VTT cues, but there is no WebVTT. Make sure vtt.js is loaded.")}}class Bg extends No{constructor(e,t={}){super(e,t),this.mediaSource_=null,this.subtitlesTrack_=null,this.loaderType_="subtitle",this.featuresNativeTextTracks_=e.featuresNativeTextTracks,this.loadVttJs=e.loadVttJs,this.shouldSaveSegmentTimingInfo_=!1}createTransmuxer_(){return null}buffered_(){if(!this.subtitlesTrack_||!this.subtitlesTrack_.cues||!this.subtitlesTrack_.cues.length)return Bt();const e=this.subtitlesTrack_.cues,t=e[0].startTime,i=e[e.length-1].startTime;return Bt([[t,i]])}initSegmentForMap(e,t=!1){if(!e)return null;const i=Lr(e);let s=this.initSegments_[i];if(t&&!s&&e.bytes){const r=ad.byteLength+e.bytes.byteLength,a=new Uint8Array(r);a.set(e.bytes),a.set(ad,e.bytes.byteLength),this.initSegments_[i]=s={resolvedUri:e.resolvedUri,byterange:e.byterange,bytes:a}}return s||e}couldBeginLoading_(){return this.playlist_&&this.subtitlesTrack_&&!this.paused()}init_(){return this.state="READY",this.resetEverything(),this.monitorBuffer_()}track(e){return typeof e=="undefined"?this.subtitlesTrack_:(this.subtitlesTrack_=e,this.state==="INIT"&&this.couldBeginLoading_()&&this.init_(),this.subtitlesTrack_)}remove(e,t){ks(e,t,this.subtitlesTrack_)}fillBuffer_(){const e=this.chooseNextRequest_();if(e){if(this.syncController_.timestampOffsetForTimeline(e.timeline)===null){const t=()=>{this.state="READY",this.paused()||this.monitorBuffer_()};this.syncController_.one("timestampoffset",t),this.state="WAITING_ON_TIMELINE";return}this.loadSegment_(e)}}timestampOffsetForSegment_(){return null}chooseNextRequest_(){return this.skipEmptySegments_(super.chooseNextRequest_())}skipEmptySegments_(e){for(;e&&e.segment.empty;){if(e.mediaIndex+1>=e.playlist.segments.length){e=null;break}e=this.generateSegmentInfo_({playlist:e.playlist,mediaIndex:e.mediaIndex+1,startOfSegment:e.startOfSegment+e.duration,isSyncRequest:e.isSyncRequest})}return e}stopForError(e){this.error(e),this.state="READY",this.pause(),this.trigger("error")}segmentRequestFinished_(e,t,i){if(!this.subtitlesTrack_){this.state="READY";return}if(this.saveTransferStats_(t.stats),!this.pendingSegment_){this.state="READY",this.mediaRequestsAborted+=1;return}if(e){e.code===Ei.TIMEOUT&&this.handleTimeout_(),e.code===Ei.ABORTED?this.mediaRequestsAborted+=1:this.mediaRequestsErrored+=1,this.stopForError(e);return}const s=this.pendingSegment_;this.saveBandwidthRelatedStats_(s.duration,t.stats),t.key&&this.segmentKey(t.key,!0),this.state="APPENDING",this.trigger("appending");const r=s.segment;if(r.map&&(r.map.bytes=t.map.bytes),s.bytes=t.bytes,typeof A().WebVTT!="function"&&typeof this.loadVttJs=="function"){this.state="WAITING_ON_VTTJS",this.loadVttJs().then(()=>this.segmentRequestFinished_(e,t,i),()=>this.stopForError({message:"Error loading vtt.js"}));return}r.requested=!0;try{this.parseVTTCues_(s)}catch(a){this.stopForError({message:a.message});return}if(this.updateTimeMapping_(s,this.syncController_.timelines[s.timeline],this.playlist_),s.cues.length?s.timingInfo={start:s.cues[0].startTime,end:s.cues[s.cues.length-1].endTime}:s.timingInfo={start:s.startOfSegment,end:s.startOfSegment+s.duration},s.isSyncRequest){this.trigger("syncinfoupdate"),this.pendingSegment_=null,this.state="READY";return}s.byteLength=s.bytes.byteLength,this.mediaSecondsLoaded+=r.duration,s.cues.forEach(a=>{this.subtitlesTrack_.addCue(this.featuresNativeTextTracks_?new(A()).VTTCue(a.startTime,a.endTime,a.text):a)}),fg(this.subtitlesTrack_),this.handleAppendsDone_()}handleData_(){}updateTimingInfoEnd_(){}parseVTTCues_(e){let t,i=!1;if(typeof A().WebVTT!="function")throw new jg;typeof A().TextDecoder=="function"?t=new(A()).TextDecoder("utf8"):(t=A().WebVTT.StringDecoder(),i=!0);const s=new(A()).WebVTT.Parser(A(),A().vttjs,t);if(e.cues=[],e.timestampmap={MPEGTS:0,LOCAL:0},s.oncue=e.cues.push.bind(e.cues),s.ontimestampmap=a=>{e.timestampmap=a},s.onparsingerror=a=>{F.log.warn("Error encountered when parsing cues: "+a.message)},e.segment.map){let a=e.segment.map.bytes;i&&(a=rd(a)),s.parse(a)}let r=e.bytes;i&&(r=rd(r)),s.parse(r),s.flush()}updateTimeMapping_(e,t,i){const s=e.segment;if(!t)return;if(!e.cues.length){s.empty=!0;return}const r=e.timestampmap,a=r.MPEGTS/Zs.ONE_SECOND_IN_TS-r.LOCAL+t.mapping;if(e.cues.forEach(l=>{l.startTime+=a,l.endTime+=a}),!i.syncInfo){const l=e.cues[0].startTime,h=e.cues[e.cues.length-1].startTime;i.syncInfo={mediaSequence:i.mediaSequence+e.mediaIndex,time:Math.min(l,h-s.duration)}}}}const wg=function(n,e){const t=n.cues;for(let i=0;i<t.length;i++){const s=t[i];if(e>=s.adStartTime&&e<=s.adEndTime)return s}return null},Dg=function(n,e,t=0){if(!n.segments)return;let i=t,s;for(let r=0;r<n.segments.length;r++){const a=n.segments[r];if(s||(s=wg(e,i+a.duration/2)),s){if("cueIn"in a){s.endTime=i,s.adEndTime=i,i+=a.duration,s=null;continue}if(i<s.endTime){i+=a.duration;continue}s.endTime+=a.duration}else if("cueOut"in a&&(s=new(A()).VTTCue(i,i+a.duration,a.cueOut),s.adStartTime=i,s.adEndTime=i+parseFloat(a.cueOut),e.addCue(s)),"cueOutCont"in a){const[l,h]=a.cueOutCont.split("/").map(parseFloat);s=new(A()).VTTCue(i,i+a.duration,""),s.adStartTime=i-l,s.adEndTime=s.adStartTime+h,e.addCue(s)}i+=a.duration}},kg=86400,od=[{name:"VOD",run:(n,e,t,i,s)=>t!==1/0?{time:0,segmentIndex:0,partIndex:null}:null},{name:"ProgramDateTime",run:(n,e,t,i,s)=>{if(!Object.keys(n.timelineToDatetimeMappings).length)return null;let r=null,a=null;const l=Eo(e);s=s||0;for(let h=0;h<l.length;h++){const m=e.endList||s===0?h:l.length-(h+1),g=l[m],E=g.segment,w=n.timelineToDatetimeMappings[E.timeline];if(!w||!E.dateTimeObject)continue;let x=E.dateTimeObject.getTime()/1e3+w;if(E.parts&&typeof g.partIndex=="number")for(let V=0;V<g.partIndex;V++)x+=E.parts[V].duration;const L=Math.abs(s-x);if(a!==null&&(L===0||a<L))break;a=L,r={time:x,segmentIndex:g.segmentIndex,partIndex:g.partIndex}}return r}},{name:"Segment",run:(n,e,t,i,s)=>{let r=null,a=null;s=s||0;const l=Eo(e);for(let h=0;h<l.length;h++){const m=e.endList||s===0?h:l.length-(h+1),g=l[m],E=g.segment,w=g.part&&g.part.start||E&&E.start;if(E.timeline===i&&typeof w!="undefined"){const k=Math.abs(s-w);if(a!==null&&a<k)break;(!r||a===null||a>=k)&&(a=k,r={time:w,segmentIndex:g.segmentIndex,partIndex:g.partIndex})}}return r}},{name:"Discontinuity",run:(n,e,t,i,s)=>{let r=null;if(s=s||0,e.discontinuityStarts&&e.discontinuityStarts.length){let a=null;for(let l=0;l<e.discontinuityStarts.length;l++){const h=e.discontinuityStarts[l],m=e.discontinuitySequence+l+1,g=n.discontinuities[m];if(g){const E=Math.abs(s-g.time);if(a!==null&&a<E)break;(!r||a===null||a>=E)&&(a=E,r={time:g.time,segmentIndex:h,partIndex:null})}}}return r}},{name:"Playlist",run:(n,e,t,i,s)=>e.syncInfo?{time:e.syncInfo.time,segmentIndex:e.syncInfo.mediaSequence-e.mediaSequence,partIndex:null}:null}];class Ig extends F.EventTarget{constructor(e={}){super(),this.timelines=[],this.discontinuities=[],this.timelineToDatetimeMappings={},this.logger_=ni("SyncController")}getSyncPoint(e,t,i,s){const r=this.runStrategies_(e,t,i,s);return r.length?this.selectSyncPoint_(r,{key:"time",value:s}):null}getExpiredTime(e,t){if(!e||!e.segments)return null;const i=this.runStrategies_(e,t,e.discontinuitySequence,0);if(!i.length)return null;const s=this.selectSyncPoint_(i,{key:"segmentIndex",value:0});return s.segmentIndex>0&&(s.time*=-1),Math.abs(s.time+js({defaultDuration:e.targetDuration,durationList:e.segments,startIndex:s.segmentIndex,endIndex:0}))}runStrategies_(e,t,i,s){const r=[];for(let a=0;a<od.length;a++){const l=od[a],h=l.run(this,e,t,i,s);h&&(h.strategy=l.name,r.push({strategy:l.name,syncPoint:h}))}return r}selectSyncPoint_(e,t){let i=e[0].syncPoint,s=Math.abs(e[0].syncPoint[t.key]-t.value),r=e[0].strategy;for(let a=1;a<e.length;a++){const l=Math.abs(e[a].syncPoint[t.key]-t.value);l<s&&(s=l,i=e[a].syncPoint,r=e[a].strategy)}return this.logger_(`syncPoint for [${t.key}: ${t.value}] chosen with strategy [${r}]: [time:${i.time}, segmentIndex:${i.segmentIndex}`+(typeof i.partIndex=="number"?`,partIndex:${i.partIndex}`:"")+"]"),i}saveExpiredSegmentInfo(e,t){const i=t.mediaSequence-e.mediaSequence;if(i>kg){F.log.warn(`Not saving expired segment info. Media sequence gap ${i} is too large.`);return}for(let s=i-1;s>=0;s--){const r=e.segments[s];if(r&&typeof r.start!="undefined"){t.syncInfo={mediaSequence:e.mediaSequence+s,time:r.start},this.logger_(`playlist refresh sync: [time:${t.syncInfo.time}, mediaSequence: ${t.syncInfo.mediaSequence}]`),this.trigger("syncinfoupdate");break}}}setDateTimeMappingForStart(e){if(this.timelineToDatetimeMappings={},e.segments&&e.segments.length&&e.segments[0].dateTimeObject){const t=e.segments[0],i=t.dateTimeObject.getTime()/1e3;this.timelineToDatetimeMappings[t.timeline]=-i}}saveSegmentTimingInfo({segmentInfo:e,shouldSaveTimelineMapping:t}){const i=this.calculateSegmentTimeMapping_(e,e.timingInfo,t),s=e.segment;i&&(this.saveDiscontinuitySyncInfo_(e),e.playlist.syncInfo||(e.playlist.syncInfo={mediaSequence:e.playlist.mediaSequence+e.mediaIndex,time:s.start}));const r=s.dateTimeObject;s.discontinuity&&t&&r&&(this.timelineToDatetimeMappings[s.timeline]=-(r.getTime()/1e3))}timestampOffsetForTimeline(e){return typeof this.timelines[e]=="undefined"?null:this.timelines[e].time}mappingForTimeline(e){return typeof this.timelines[e]=="undefined"?null:this.timelines[e].mapping}calculateSegmentTimeMapping_(e,t,i){const s=e.segment,r=e.part;let a=this.timelines[e.timeline],l,h;if(typeof e.timestampOffset=="number")a={time:e.startOfSegment,mapping:e.startOfSegment-t.start},i&&(this.timelines[e.timeline]=a,this.trigger("timestampoffset"),this.logger_(`time mapping for timeline ${e.timeline}: [time: ${a.time}] [mapping: ${a.mapping}]`)),l=e.startOfSegment,h=t.end+a.mapping;else if(a)l=t.start+a.mapping,h=t.end+a.mapping;else return!1;return r&&(r.start=l,r.end=h),(!s.start||l<s.start)&&(s.start=l),s.end=h,!0}saveDiscontinuitySyncInfo_(e){const t=e.playlist,i=e.segment;if(i.discontinuity)this.discontinuities[i.timeline]={time:i.start,accuracy:0};else if(t.discontinuityStarts&&t.discontinuityStarts.length)for(let s=0;s<t.discontinuityStarts.length;s++){const r=t.discontinuityStarts[s],a=t.discontinuitySequence+s+1,l=r-e.mediaIndex,h=Math.abs(l);if(!this.discontinuities[a]||this.discontinuities[a].accuracy>h){let m;l<0?m=i.start-js({defaultDuration:t.targetDuration,durationList:t.segments,startIndex:e.mediaIndex,endIndex:r}):m=i.end+js({defaultDuration:t.targetDuration,durationList:t.segments,startIndex:e.mediaIndex+1,endIndex:r}),this.discontinuities[a]={time:m,accuracy:h}}}}dispose(){this.trigger("dispose"),this.off()}}class Pg extends F.EventTarget{constructor(){super(),this.pendingTimelineChanges_={},this.lastTimelineChanges_={}}clearPendingTimelineChange(e){this.pendingTimelineChanges_[e]=null,this.trigger("pendingtimelinechange")}pendingTimelineChange({type:e,from:t,to:i}){return typeof t=="number"&&typeof i=="number"&&(this.pendingTimelineChanges_[e]={type:e,from:t,to:i},this.trigger("pendingtimelinechange")),this.pendingTimelineChanges_[e]}lastTimelineChange({type:e,from:t,to:i}){return typeof t=="number"&&typeof i=="number"&&(this.lastTimelineChanges_[e]={type:e,from:t,to:i},delete this.pendingTimelineChanges_[e],this.trigger("timelinechange")),this.lastTimelineChanges_[e]}dispose(){this.trigger("dispose"),this.pendingTimelineChanges_={},this.lastTimelineChanges_={},this.off()}}const Lg=Ic(Pc(function(){var n=function(){function L(){this.listeners={}}var V=L.prototype;return V.on=function(R,Z){this.listeners[R]||(this.listeners[R]=[]),this.listeners[R].push(Z)},V.off=function(R,Z){if(!this.listeners[R])return!1;var q=this.listeners[R].indexOf(Z);return this.listeners[R]=this.listeners[R].slice(0),this.listeners[R].splice(q,1),q>-1},V.trigger=function(R){var Z=this.listeners[R];if(Z)if(arguments.length===2)for(var q=Z.length,P=0;P<q;++P)Z[P].call(this,arguments[1]);else for(var de=Array.prototype.slice.call(arguments,1),Ee=Z.length,Ue=0;Ue<Ee;++Ue)Z[Ue].apply(this,de)},V.dispose=function(){this.listeners={}},V.pipe=function(R){this.on("data",function(Z){R.push(Z)})},L}();/*! @name pkcs7 @version 1.0.4 @license Apache-2.0 */function e(L){return L.subarray(0,L.byteLength-L[L.byteLength-1])}/*! @name aes-decrypter @version 4.0.1 @license Apache-2.0 */const t=function(){const L=[[[],[],[],[],[]],[[],[],[],[],[]]],V=L[0],H=L[1],R=V[4],Z=H[4];let q,P,de;const Ee=[],Ue=[];let He,mt,wt,gt,Se,Qe;for(q=0;q<256;q++)Ue[(Ee[q]=q<<1^(q>>7)*283)^q]=q;for(P=de=0;!R[P];P^=He||1,de=Ue[de]||1)for(gt=de^de<<1^de<<2^de<<3^de<<4,gt=gt>>8^gt&255^99,R[P]=gt,Z[gt]=P,wt=Ee[mt=Ee[He=Ee[P]]],Qe=wt*16843009^mt*65537^He*257^P*16843008,Se=Ee[gt]*257^gt*16843008,q=0;q<4;q++)V[q][P]=Se=Se<<24^Se>>>8,H[q][gt]=Qe=Qe<<24^Qe>>>8;for(q=0;q<5;q++)V[q]=V[q].slice(0),H[q]=H[q].slice(0);return L};let i=null;class s{constructor(V){i||(i=t()),this._tables=[[i[0][0].slice(),i[0][1].slice(),i[0][2].slice(),i[0][3].slice(),i[0][4].slice()],[i[1][0].slice(),i[1][1].slice(),i[1][2].slice(),i[1][3].slice(),i[1][4].slice()]];let H,R,Z;const q=this._tables[0][4],P=this._tables[1],de=V.length;let Ee=1;if(de!==4&&de!==6&&de!==8)throw new Error("Invalid aes key size");const Ue=V.slice(0),He=[];for(this._key=[Ue,He],H=de;H<4*de+28;H++)Z=Ue[H-1],(H%de===0||de===8&&H%de===4)&&(Z=q[Z>>>24]<<24^q[Z>>16&255]<<16^q[Z>>8&255]<<8^q[Z&255],H%de===0&&(Z=Z<<8^Z>>>24^Ee<<24,Ee=Ee<<1^(Ee>>7)*283)),Ue[H]=Ue[H-de]^Z;for(R=0;H;R++,H--)Z=Ue[R&3?H:H-4],H<=4||R<4?He[R]=Z:He[R]=P[0][q[Z>>>24]]^P[1][q[Z>>16&255]]^P[2][q[Z>>8&255]]^P[3][q[Z&255]]}decrypt(V,H,R,Z,q,P){const de=this._key[1];let Ee=V^de[0],Ue=Z^de[1],He=R^de[2],mt=H^de[3],wt,gt,Se;const Qe=de.length/4-2;let Ci,Li=4;const Wi=this._tables[1],on=Wi[0],ln=Wi[1],un=Wi[2],cn=Wi[3],dn=Wi[4];for(Ci=0;Ci<Qe;Ci++)wt=on[Ee>>>24]^ln[Ue>>16&255]^un[He>>8&255]^cn[mt&255]^de[Li],gt=on[Ue>>>24]^ln[He>>16&255]^un[mt>>8&255]^cn[Ee&255]^de[Li+1],Se=on[He>>>24]^ln[mt>>16&255]^un[Ee>>8&255]^cn[Ue&255]^de[Li+2],mt=on[mt>>>24]^ln[Ee>>16&255]^un[Ue>>8&255]^cn[He&255]^de[Li+3],Li+=4,Ee=wt,Ue=gt,He=Se;for(Ci=0;Ci<4;Ci++)q[(3&-Ci)+P]=dn[Ee>>>24]<<24^dn[Ue>>16&255]<<16^dn[He>>8&255]<<8^dn[mt&255]^de[Li++],wt=Ee,Ee=Ue,Ue=He,He=mt,mt=wt}}class r extends n{constructor(){super(n),this.jobs=[],this.delay=1,this.timeout_=null}processJob_(){this.jobs.shift()(),this.jobs.length?this.timeout_=setTimeout(this.processJob_.bind(this),this.delay):this.timeout_=null}push(V){this.jobs.push(V),this.timeout_||(this.timeout_=setTimeout(this.processJob_.bind(this),this.delay))}}const a=function(L){return L<<24|(L&65280)<<8|(L&16711680)>>8|L>>>24},l=function(L,V,H){const R=new Int32Array(L.buffer,L.byteOffset,L.byteLength>>2),Z=new s(Array.prototype.slice.call(V)),q=new Uint8Array(L.byteLength),P=new Int32Array(q.buffer);let de,Ee,Ue,He,mt,wt,gt,Se,Qe;for(de=H[0],Ee=H[1],Ue=H[2],He=H[3],Qe=0;Qe<R.length;Qe+=4)mt=a(R[Qe]),wt=a(R[Qe+1]),gt=a(R[Qe+2]),Se=a(R[Qe+3]),Z.decrypt(mt,wt,gt,Se,P,Qe),P[Qe]=a(P[Qe]^de),P[Qe+1]=a(P[Qe+1]^Ee),P[Qe+2]=a(P[Qe+2]^Ue),P[Qe+3]=a(P[Qe+3]^He),de=mt,Ee=wt,Ue=gt,He=Se;return q};class h{constructor(V,H,R,Z){const q=h.STEP,P=new Int32Array(V.buffer),de=new Uint8Array(V.byteLength);let Ee=0;for(this.asyncStream_=new r,this.asyncStream_.push(this.decryptChunk_(P.subarray(Ee,Ee+q),H,R,de)),Ee=q;Ee<P.length;Ee+=q)R=new Uint32Array([a(P[Ee-4]),a(P[Ee-3]),a(P[Ee-2]),a(P[Ee-1])]),this.asyncStream_.push(this.decryptChunk_(P.subarray(Ee,Ee+q),H,R,de));this.asyncStream_.push(function(){Z(null,e(de))})}static get STEP(){return 32e3}decryptChunk_(V,H,R,Z){return function(){const q=l(V,H,R);Z.set(q,V.byteOffset)}}}var m=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof z.g!="undefined"?z.g:typeof self!="undefined"?self:{},g;typeof window!="undefined"?g=window:typeof m!="undefined"?g=m:typeof self!="undefined"?g=self:g={};var E=g,w=function(V){return ArrayBuffer.isView==="function"?ArrayBuffer.isView(V):V&&V.buffer instanceof ArrayBuffer},k=E.BigInt||Number;k("0x1"),k("0x100"),k("0x10000"),k("0x1000000"),k("0x100000000"),k("0x10000000000"),k("0x1000000000000"),k("0x100000000000000"),k("0x10000000000000000"),function(){var L=new Uint16Array([65484]),V=new Uint8Array(L.buffer,L.byteOffset,L.byteLength);return V[0]===255?"big":V[0]===204?"little":"unknown"}();const x=function(L){const V={};return Object.keys(L).forEach(H=>{const R=L[H];w(R)?V[H]={bytes:R.buffer,byteOffset:R.byteOffset,byteLength:R.byteLength}:V[H]=R}),V};self.onmessage=function(L){const V=L.data,H=new Uint8Array(V.encrypted.bytes,V.encrypted.byteOffset,V.encrypted.byteLength),R=new Uint32Array(V.key.bytes,V.key.byteOffset,V.key.byteLength/4),Z=new Uint32Array(V.iv.bytes,V.iv.byteOffset,V.iv.byteLength/4);new h(H,R,Z,function(q,P){self.postMessage(x({source:V.source,decrypted:P}),[P.buffer])})}}));var Og=kc(Lg);const Rg=n=>{let e=n.default?"main":"alternative";return n.characteristics&&n.characteristics.indexOf("public.accessibility.describes-video")>=0&&(e="main-desc"),e},ld=(n,e)=>{n.abort(),n.pause(),e&&e.activePlaylistLoader&&(e.activePlaylistLoader.pause(),e.activePlaylistLoader=null)},Uo=(n,e)=>{e.activePlaylistLoader=n,n.load()},Ng=(n,e)=>()=>{const{segmentLoaders:{[n]:t,main:i},mediaTypes:{[n]:s}}=e,r=s.activeTrack(),a=s.getActiveGroup(),l=s.activePlaylistLoader,h=s.lastGroup_;if(!(a&&h&&a.id===h.id)&&(s.lastGroup_=a,s.lastTrack_=r,ld(t,s),!(!a||a.isMainPlaylist))){if(!a.playlistLoader){l&&i.resetEverything();return}t.resyncLoader(),Uo(a.playlistLoader,s)}},Mg=(n,e)=>()=>{const{segmentLoaders:{[n]:t},mediaTypes:{[n]:i}}=e;i.lastGroup_=null,t.abort(),t.pause()},Ug=(n,e)=>()=>{const{mainPlaylistLoader:t,segmentLoaders:{[n]:i,main:s},mediaTypes:{[n]:r}}=e,a=r.activeTrack(),l=r.getActiveGroup(),h=r.activePlaylistLoader,m=r.lastTrack_;if(!(m&&a&&m.id===a.id)&&(r.lastGroup_=l,r.lastTrack_=a,ld(i,r),!!l)){if(l.isMainPlaylist){if(!a||!m||a.id===m.id)return;const g=e.vhs.playlistController_,E=g.selectPlaylist();if(g.media()===E)return;r.logger_(`track change. Switching main audio from ${m.id} to ${a.id}`),t.pause(),s.resetEverything(),g.fastQualityChange_(E);return}if(n==="AUDIO"){if(!l.playlistLoader){s.setAudio(!0),s.resetEverything();return}i.setAudio(!0),s.setAudio(!1)}if(h===l.playlistLoader){Uo(l.playlistLoader,r);return}i.track&&i.track(a),i.resetEverything(),Uo(l.playlistLoader,r)}},Ur={AUDIO:(n,e)=>()=>{const{mediaTypes:{[n]:t},excludePlaylist:i}=e,s=t.activeTrack(),r=t.activeGroup(),a=(r.filter(h=>h.default)[0]||r[0]).id,l=t.tracks[a];if(s===l){i({error:{message:"Problem encountered loading the default audio track."}});return}F.log.warn("Problem encountered loading the alternate audio track.Switching back to default.");for(const h in t.tracks)t.tracks[h].enabled=t.tracks[h]===l;t.onTrackChanged()},SUBTITLES:(n,e)=>()=>{const{mediaTypes:{[n]:t}}=e;F.log.warn("Problem encountered loading the subtitle track.Disabling subtitle track.");const i=t.activeTrack();i&&(i.mode="disabled"),t.onTrackChanged()}},ud={AUDIO:(n,e,t)=>{if(!e)return;const{tech:i,requestOptions:s,segmentLoaders:{[n]:r}}=t;e.on("loadedmetadata",()=>{const a=e.media();r.playlist(a,s),(!i.paused()||a.endList&&i.preload()!=="none")&&r.load()}),e.on("loadedplaylist",()=>{r.playlist(e.media(),s),i.paused()||r.load()}),e.on("error",Ur[n](n,t))},SUBTITLES:(n,e,t)=>{const{tech:i,requestOptions:s,segmentLoaders:{[n]:r},mediaTypes:{[n]:a}}=t;e.on("loadedmetadata",()=>{const l=e.media();r.playlist(l,s),r.track(a.activeTrack()),(!i.paused()||l.endList&&i.preload()!=="none")&&r.load()}),e.on("loadedplaylist",()=>{r.playlist(e.media(),s),i.paused()||r.load()}),e.on("error",Ur[n](n,t))}},Fg={AUDIO:(n,e)=>{const{vhs:t,sourceType:i,segmentLoaders:{[n]:s},requestOptions:r,main:{mediaGroups:a},mediaTypes:{[n]:{groups:l,tracks:h,logger_:m}},mainPlaylistLoader:g}=e,E=Bs(g.main);(!a[n]||Object.keys(a[n]).length===0)&&(a[n]={main:{default:{default:!0}}},E&&(a[n].main.default.playlists=g.main.playlists));for(const w in a[n]){l[w]||(l[w]=[]);for(const k in a[n][w]){let x=a[n][w][k],L;if(E?(m(`AUDIO group '${w}' label '${k}' is a main playlist`),x.isMainPlaylist=!0,L=null):i==="vhs-json"&&x.playlists?L=new Xn(x.playlists[0],t,r):x.resolvedUri?L=new Xn(x.resolvedUri,t,r):x.playlists&&i==="dash"?L=new Io(x.playlists[0],t,r,g):L=null,x=Ye({id:k,playlistLoader:L},x),ud[n](n,x.playlistLoader,e),l[w].push(x),typeof h[k]=="undefined"){const V=new F.AudioTrack({id:k,kind:Rg(x),enabled:!1,language:x.language,default:x.default,label:k});h[k]=V}}}s.on("error",Ur[n](n,e))},SUBTITLES:(n,e)=>{const{tech:t,vhs:i,sourceType:s,segmentLoaders:{[n]:r},requestOptions:a,main:{mediaGroups:l},mediaTypes:{[n]:{groups:h,tracks:m}},mainPlaylistLoader:g}=e;for(const E in l[n]){h[E]||(h[E]=[]);for(const w in l[n][E]){if(!i.options_.useForcedSubtitles&&l[n][E][w].forced)continue;let k=l[n][E][w],x;if(s==="hls")x=new Xn(k.resolvedUri,i,a);else if(s==="dash"){if(!k.playlists.filter(V=>V.excludeUntil!==1/0).length)return;x=new Io(k.playlists[0],i,a,g)}else s==="vhs-json"&&(x=new Xn(k.playlists?k.playlists[0]:k.resolvedUri,i,a));if(k=Ye({id:w,playlistLoader:x},k),ud[n](n,k.playlistLoader,e),h[E].push(k),typeof m[w]=="undefined"){const L=t.addRemoteTextTrack({id:w,kind:"subtitles",default:k.default&&k.autoselect,language:k.language,label:w},!1).track;m[w]=L}}}r.on("error",Ur[n](n,e))},"CLOSED-CAPTIONS":(n,e)=>{const{tech:t,main:{mediaGroups:i},mediaTypes:{[n]:{groups:s,tracks:r}}}=e;for(const a in i[n]){s[a]||(s[a]=[]);for(const l in i[n][a]){const h=i[n][a][l];if(!/^(?:CC|SERVICE)/.test(h.instreamId))continue;const m=t.options_.vhs&&t.options_.vhs.captionServices||{};let g={label:l,language:h.language,instreamId:h.instreamId,default:h.default&&h.autoselect};if(m[g.instreamId]&&(g=Ye(g,m[g.instreamId])),g.default===void 0&&delete g.default,s[a].push(Ye({id:l},h)),typeof r[l]=="undefined"){const E=t.addRemoteTextTrack({id:g.instreamId,kind:"captions",default:g.default,language:g.language,label:g.label},!1).track;r[l]=E}}}}},cd=(n,e)=>{for(let t=0;t<n.length;t++)if(xo(e,n[t])||n[t].playlists&&cd(n[t].playlists,e))return!0;return!1},Vg=(n,e)=>t=>{const{mainPlaylistLoader:i,mediaTypes:{[n]:{groups:s}}}=e,r=i.media();if(!r)return null;let a=null;r.attributes[n]&&(a=s[r.attributes[n]]);const l=Object.keys(s);if(!a)if(n==="AUDIO"&&l.length>1&&Bs(e.main))for(let h=0;h<l.length;h++){const m=s[l[h]];if(cd(m,r)){a=m;break}}else s.main?a=s.main:l.length===1&&(a=s[l[0]]);return typeof t=="undefined"?a:t===null||!a?null:a.filter(h=>h.id===t.id)[0]||null},zg={AUDIO:(n,e)=>()=>{const{mediaTypes:{[n]:{tracks:t}}}=e;for(const i in t)if(t[i].enabled)return t[i];return null},SUBTITLES:(n,e)=>()=>{const{mediaTypes:{[n]:{tracks:t}}}=e;for(const i in t)if(t[i].mode==="showing"||t[i].mode==="hidden")return t[i];return null}},Hg=(n,{mediaTypes:e})=>()=>{const t=e[n].activeTrack();return t?e[n].activeGroup(t):null},qg=n=>{["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(m=>{Fg[m](m,n)});const{mediaTypes:e,mainPlaylistLoader:t,tech:i,vhs:s,segmentLoaders:{["AUDIO"]:r,main:a}}=n;["AUDIO","SUBTITLES"].forEach(m=>{e[m].activeGroup=Vg(m,n),e[m].activeTrack=zg[m](m,n),e[m].onGroupChanged=Ng(m,n),e[m].onGroupChanging=Mg(m,n),e[m].onTrackChanged=Ug(m,n),e[m].getActiveGroup=Hg(m,n)});const l=e.AUDIO.activeGroup();if(l){const m=(l.filter(E=>E.default)[0]||l[0]).id;e.AUDIO.tracks[m].enabled=!0,e.AUDIO.onGroupChanged(),e.AUDIO.onTrackChanged(),e.AUDIO.getActiveGroup().playlistLoader?(a.setAudio(!1),r.setAudio(!0)):a.setAudio(!0)}t.on("mediachange",()=>{["AUDIO","SUBTITLES"].forEach(m=>e[m].onGroupChanged())}),t.on("mediachanging",()=>{["AUDIO","SUBTITLES"].forEach(m=>e[m].onGroupChanging())});const h=()=>{e.AUDIO.onTrackChanged(),i.trigger({type:"usage",name:"vhs-audio-change"})};i.audioTracks().addEventListener("change",h),i.remoteTextTracks().addEventListener("change",e.SUBTITLES.onTrackChanged),s.on("dispose",()=>{i.audioTracks().removeEventListener("change",h),i.remoteTextTracks().removeEventListener("change",e.SUBTITLES.onTrackChanged)}),i.clearTracks("audio");for(const m in e.AUDIO.tracks)i.audioTracks().addTrack(e.AUDIO.tracks[m])},Wg=()=>{const n={};return["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(e=>{n[e]={groups:{},tracks:{},activePlaylistLoader:null,activeGroup:Ii,activeTrack:Ii,getActiveGroup:Ii,onGroupChanged:Ii,onTrackChanged:Ii,lastTrack_:null,logger_:ni(`MediaGroups[${e}]`)}}),n};class dd{constructor(){this.priority_=[]}set version(e){e===1&&(this.version_=e)}set ttl(e){this.ttl_=e||300}set reloadUri(e){e&&(this.reloadUri_=Xt(this.reloadUri_,e))}set priority(e){e&&e.length&&(this.priority_=e)}get version(){return this.version_}get ttl(){return this.ttl_}get reloadUri(){return this.reloadUri_}get priority(){return this.priority_}}class Gg extends F.EventTarget{constructor(e,t){super(),this.currentPathway=null,this.defaultPathway=null,this.queryBeforeStart=null,this.availablePathways_=new Set,this.excludedPathways_=new Set,this.steeringManifest=new dd,this.proxyServerUrl_=null,this.manifestType_=null,this.ttlTimeout_=null,this.request_=null,this.excludedSteeringManifestURLs=new Set,this.logger_=ni("Content Steering"),this.xhr_=e,this.getBandwidth_=t}assignTagProperties(e,t){this.manifestType_=t.serverUri?"HLS":"DASH";const i=t.serverUri||t.serverURL;if(!i){this.logger_(`steering manifest URL is ${i}, cannot request steering manifest.`),this.trigger("error");return}if(i.startsWith("data:")){this.decodeDataUriManifest_(i.substring(i.indexOf(",")+1));return}this.steeringManifest.reloadUri=this.queryBeforeStart?i:Xt(e,i),this.defaultPathway=t.pathwayId||t.defaultServiceLocation,this.queryBeforeStart=t.queryBeforeStart||!1,this.proxyServerUrl_=t.proxyServerURL||null,this.defaultPathway&&!this.queryBeforeStart&&this.trigger("content-steering"),this.queryBeforeStart&&this.requestSteeringManifest(this.steeringManifest.reloadUri)}requestSteeringManifest(e){const t=this.steeringManifest.reloadUri;if(!e&&!t)return;const i=e||this.getRequestURI(t);if(!i){this.logger_("No valid content steering manifest URIs. Stopping content steering."),this.trigger("error"),this.dispose();return}this.request_=this.xhr_({uri:i},(s,r)=>{if(s){if(r.status===410){this.logger_(`manifest request 410 ${s}.`),this.logger_(`There will be no more content steering requests to ${i} this session.`),this.excludedSteeringManifestURLs.add(i);return}if(r.status===429){const l=r.responseHeaders["retry-after"];this.logger_(`manifest request 429 ${s}.`),this.logger_(`content steering will retry in ${l} seconds.`),this.startTTLTimeout_(parseInt(l,10));return}this.logger_(`manifest failed to load ${s}.`),this.startTTLTimeout_();return}const a=JSON.parse(this.request_.responseText);this.startTTLTimeout_(),this.assignSteeringProperties_(a)})}setProxyServerUrl_(e){const t=new(A()).URL(e),i=new(A()).URL(this.proxyServerUrl_);return i.searchParams.set("url",encodeURI(t.toString())),this.setSteeringParams_(i.toString())}decodeDataUriManifest_(e){const t=JSON.parse(A().atob(e));this.assignSteeringProperties_(t)}setSteeringParams_(e){const t=new(A()).URL(e),i=this.getPathway(),s=this.getBandwidth_();if(i){const r=`_${this.manifestType_}_pathway`;t.searchParams.set(r,i)}if(s){const r=`_${this.manifestType_}_throughput`;t.searchParams.set(r,s)}return t.toString()}assignSteeringProperties_(e){if(this.steeringManifest.version=e.VERSION,!this.steeringManifest.version){this.logger_(`manifest version is ${e.VERSION}, which is not supported.`),this.trigger("error");return}this.steeringManifest.ttl=e.TTL,this.steeringManifest.reloadUri=e["RELOAD-URI"],this.steeringManifest.priority=e["PATHWAY-PRIORITY"]||e["SERVICE-LOCATION-PRIORITY"],this.availablePathways_.size||(this.logger_("There are no available pathways for content steering. Ending content steering."),this.trigger("error"),this.dispose());const i=(s=>{for(const r of s)if(this.availablePathways_.has(r))return r;return[...this.availablePathways_][0]})(this.steeringManifest.priority);this.currentPathway!==i&&(this.currentPathway=i,this.trigger("content-steering"))}getPathway(){return this.currentPathway||this.defaultPathway}getRequestURI(e){if(!e)return null;const t=s=>this.excludedSteeringManifestURLs.has(s);if(this.proxyServerUrl_){const s=this.setProxyServerUrl_(e);if(!t(s))return s}const i=this.setSteeringParams_(e);return t(i)?null:i}startTTLTimeout_(e=this.steeringManifest.ttl){const t=e*1e3;this.ttlTimeout_=A().setTimeout(()=>{this.requestSteeringManifest()},t)}clearTTLTimeout_(){A().clearTimeout(this.ttlTimeout_),this.ttlTimeout_=null}abort(){this.request_&&this.request_.abort(),this.request_=null}dispose(){this.off("content-steering"),this.off("error"),this.abort(),this.clearTTLTimeout_(),this.currentPathway=null,this.defaultPathway=null,this.queryBeforeStart=null,this.proxyServerUrl_=null,this.manifestType_=null,this.ttlTimeout_=null,this.request_=null,this.excludedSteeringManifestURLs=new Set,this.availablePathways_=new Set,this.excludedPathways_=new Set,this.steeringManifest=new dd}addAvailablePathway(e){e&&this.availablePathways_.add(e)}clearAvailablePathways(){this.availablePathways_.clear()}excludePathway(e){return this.availablePathways_.delete(e)}}const $g=10;let Pi;const Xg=["mediaRequests","mediaRequestsAborted","mediaRequestsTimedout","mediaRequestsErrored","mediaTransferDuration","mediaBytesTransferred","mediaAppends"],Yg=function(n){return this.audioSegmentLoader_[n]+this.mainSegmentLoader_[n]},Kg=function({currentPlaylist:n,buffered:e,currentTime:t,nextPlaylist:i,bufferLowWaterLine:s,bufferHighWaterLine:r,duration:a,bufferBasedABR:l,log:h}){if(!i)return F.log.warn("We received no playlist to switch to. Please check your stream."),!1;const m=`allowing switch ${n&&n.id||"null"} -> ${i.id}`;if(!n)return h(`${m} as current playlist is not set`),!0;if(i.id===n.id)return!1;const g=!!Gn(e,t).length;if(!n.endList)return!g&&typeof n.partTargetDuration=="number"?(h(`not ${m} as current playlist is live llhls, but currentTime isn't in buffered.`),!1):(h(`${m} as current playlist is live`),!0);const E=_o(e,t),w=l?St.EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE:St.MAX_BUFFER_LOW_WATER_LINE;if(a<w)return h(`${m} as duration < max low water line (${a} < ${w})`),!0;const k=i.attributes.BANDWIDTH,x=n.attributes.BANDWIDTH;if(k<x&&(!l||E<r)){let L=`${m} as next bandwidth < current bandwidth (${k} < ${x})`;return l&&(L+=` and forwardBuffer < bufferHighWaterLine (${E} < ${r})`),h(L),!0}if((!l||k>x)&&E>=s){let L=`${m} as forwardBuffer >= bufferLowWaterLine (${E} >= ${s})`;return l&&(L+=` and next bandwidth > current bandwidth (${k} > ${x})`),h(L),!0}return h(`not ${m} as no switching criteria met`),!1};class Qg extends F.EventTarget{constructor(e){super();const{src:t,withCredentials:i,tech:s,bandwidth:r,externVhs:a,useCueTags:l,playlistExclusionDuration:h,enableLowInitialPlaylist:m,sourceType:g,cacheEncryptionKeys:E,bufferBasedABR:w,leastPixelDiffSelector:k,captionServices:x}=e;if(!t)throw new Error("A non-empty playlist URL or JSON manifest string is required");let{maxPlaylistRetries:L}=e;(L===null||typeof L=="undefined")&&(L=1/0),Pi=a,this.bufferBasedABR=!!w,this.leastPixelDiffSelector=!!k,this.withCredentials=i,this.tech_=s,this.vhs_=s.vhs,this.sourceType_=g,this.useCueTags_=l,this.playlistExclusionDuration=h,this.maxPlaylistRetries=L,this.enableLowInitialPlaylist=m,this.useCueTags_&&(this.cueTagsTrack_=this.tech_.addTextTrack("metadata","ad-cues"),this.cueTagsTrack_.inBandMetadataTrackDispatchType=""),this.requestOptions_={withCredentials:i,maxPlaylistRetries:L,timeout:null},this.on("error",this.pauseLoading),this.mediaTypes_=Wg(),this.mediaSource=new(A()).MediaSource,this.handleDurationChange_=this.handleDurationChange_.bind(this),this.handleSourceOpen_=this.handleSourceOpen_.bind(this),this.handleSourceEnded_=this.handleSourceEnded_.bind(this),this.mediaSource.addEventListener("durationchange",this.handleDurationChange_),this.mediaSource.addEventListener("sourceopen",this.handleSourceOpen_),this.mediaSource.addEventListener("sourceended",this.handleSourceEnded_),this.seekable_=Bt(),this.hasPlayed_=!1,this.syncController_=new Ig(e),this.segmentMetadataTrack_=s.addRemoteTextTrack({kind:"metadata",label:"segment-metadata"},!1).track,this.decrypter_=new Og,this.sourceUpdater_=new sd(this.mediaSource),this.inbandTextTracks_={},this.timelineChangeController_=new Pg;const V={vhs:this.vhs_,parse708captions:e.parse708captions,useDtsForTimestampOffset:e.useDtsForTimestampOffset,calculateTimestampOffsetForEachSegment:e.calculateTimestampOffsetForEachSegment,captionServices:x,mediaSource:this.mediaSource,currentTime:this.tech_.currentTime.bind(this.tech_),seekable:()=>this.seekable(),seeking:()=>this.tech_.seeking(),duration:()=>this.duration(),hasPlayed:()=>this.hasPlayed_,goalBufferLength:()=>this.goalBufferLength(),bandwidth:r,syncController:this.syncController_,decrypter:this.decrypter_,sourceType:this.sourceType_,inbandTextTracks:this.inbandTextTracks_,cacheEncryptionKeys:E,sourceUpdater:this.sourceUpdater_,timelineChangeController:this.timelineChangeController_,exactManifestTimings:e.exactManifestTimings,addMetadataToTextTrack:this.addMetadataToTextTrack.bind(this)};this.mainPlaylistLoader_=this.sourceType_==="dash"?new Io(t,this.vhs_,Ye(this.requestOptions_,{addMetadataToTextTrack:this.addMetadataToTextTrack.bind(this)})):new Xn(t,this.vhs_,Ye(this.requestOptions_,{addDateRangesToTextTrack:this.addDateRangesToTextTrack_.bind(this)})),this.setupMainPlaylistLoaderListeners_(),this.mainSegmentLoader_=new No(Ye(V,{segmentMetadataTrack:this.segmentMetadataTrack_,loaderType:"main"}),e),this.audioSegmentLoader_=new No(Ye(V,{loaderType:"audio"}),e),this.subtitleSegmentLoader_=new Bg(Ye(V,{loaderType:"vtt",featuresNativeTextTracks:this.tech_.featuresNativeTextTracks,loadVttJs:()=>new Promise((Z,q)=>{function P(){s.off("vttjserror",de),Z()}function de(){s.off("vttjsloaded",P),q()}s.one("vttjsloaded",P),s.one("vttjserror",de),s.addWebVttScript_()})}),e);const H=()=>this.mainSegmentLoader_.bandwidth;this.contentSteeringController_=new Gg(this.vhs_.xhr,H),this.setupSegmentLoaderListeners_(),this.bufferBasedABR&&(this.mainPlaylistLoader_.one("loadedplaylist",()=>this.startABRTimer_()),this.tech_.on("pause",()=>this.stopABRTimer_()),this.tech_.on("play",()=>this.startABRTimer_())),Xg.forEach(Z=>{this[Z+"_"]=Yg.bind(this,Z)}),this.logger_=ni("pc"),this.triggeredFmp4Usage=!1,this.tech_.preload()==="none"?(this.loadOnPlay_=()=>{this.loadOnPlay_=null,this.mainPlaylistLoader_.load()},this.tech_.one("play",this.loadOnPlay_)):this.mainPlaylistLoader_.load(),this.timeToLoadedData__=-1,this.mainAppendsToLoadedData__=-1,this.audioAppendsToLoadedData__=-1;const R=this.tech_.preload()==="none"?"play":"loadstart";this.tech_.one(R,()=>{const Z=Date.now();this.tech_.one("loadeddata",()=>{this.timeToLoadedData__=Date.now()-Z,this.mainAppendsToLoadedData__=this.mainSegmentLoader_.mediaAppends,this.audioAppendsToLoadedData__=this.audioSegmentLoader_.mediaAppends})})}mainAppendsToLoadedData_(){return this.mainAppendsToLoadedData__}audioAppendsToLoadedData_(){return this.audioAppendsToLoadedData__}appendsToLoadedData_(){const e=this.mainAppendsToLoadedData_(),t=this.audioAppendsToLoadedData_();return e===-1||t===-1?-1:e+t}timeToLoadedData_(){return this.timeToLoadedData__}checkABR_(e="abr"){const t=this.selectPlaylist();t&&this.shouldSwitchToMedia_(t)&&this.switchMedia_(t,e)}switchMedia_(e,t,i){const s=this.media(),r=s&&(s.id||s.uri),a=e.id||e.uri;r&&r!==a&&(this.logger_(`switch media ${r} -> ${a} from ${t}`),this.tech_.trigger({type:"usage",name:`vhs-rendition-change-${t}`})),this.mainPlaylistLoader_.media(e,i)}switchMediaForDASHContentSteering_(){["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach(e=>{const t=this.mediaTypes_[e],i=t?t.activeGroup():null,s=this.contentSteeringController_.getPathway();if(i&&s){const a=(i.length?i[0].playlists:i.playlists).filter(l=>l.attributes.serviceLocation===s);a.length&&this.mediaTypes_[e].activePlaylistLoader.media(a[0])}})}startABRTimer_(){this.stopABRTimer_(),this.abrTimer_=A().setInterval(()=>this.checkABR_(),250)}stopABRTimer_(){this.tech_.scrubbing&&this.tech_.scrubbing()||(A().clearInterval(this.abrTimer_),this.abrTimer_=null)}getAudioTrackPlaylists_(){const e=this.main(),t=e&&e.playlists||[];if(!e||!e.mediaGroups||!e.mediaGroups.AUDIO)return t;const i=e.mediaGroups.AUDIO,s=Object.keys(i);let r;if(Object.keys(this.mediaTypes_.AUDIO.groups).length)r=this.mediaTypes_.AUDIO.activeTrack();else{const l=i.main||s.length&&i[s[0]];for(const h in l)if(l[h].default){r={label:h};break}}if(!r)return t;const a=[];for(const l in i)if(i[l][r.label]){const h=i[l][r.label];if(h.playlists&&h.playlists.length)a.push.apply(a,h.playlists);else if(h.uri)a.push(h);else if(e.playlists.length)for(let m=0;m<e.playlists.length;m++){const g=e.playlists[m];g.attributes&&g.attributes.AUDIO&&g.attributes.AUDIO===l&&a.push(g)}}return a.length?a:t}setupMainPlaylistLoaderListeners_(){this.mainPlaylistLoader_.on("loadedmetadata",()=>{const e=this.mainPlaylistLoader_.media(),t=e.targetDuration*1.5*1e3;Co(this.mainPlaylistLoader_.main,this.mainPlaylistLoader_.media())?this.requestOptions_.timeout=0:this.requestOptions_.timeout=t,e.endList&&this.tech_.preload()!=="none"&&(this.mainSegmentLoader_.playlist(e,this.requestOptions_),this.mainSegmentLoader_.load()),qg({sourceType:this.sourceType_,segmentLoaders:{AUDIO:this.audioSegmentLoader_,SUBTITLES:this.subtitleSegmentLoader_,main:this.mainSegmentLoader_},tech:this.tech_,requestOptions:this.requestOptions_,mainPlaylistLoader:this.mainPlaylistLoader_,vhs:this.vhs_,main:this.main(),mediaTypes:this.mediaTypes_,excludePlaylist:this.excludePlaylist.bind(this)}),this.triggerPresenceUsage_(this.main(),e),this.setupFirstPlay(),!this.mediaTypes_.AUDIO.activePlaylistLoader||this.mediaTypes_.AUDIO.activePlaylistLoader.media()?this.trigger("selectedinitialmedia"):this.mediaTypes_.AUDIO.activePlaylistLoader.one("loadedmetadata",()=>{this.trigger("selectedinitialmedia")})}),this.mainPlaylistLoader_.on("loadedplaylist",()=>{this.loadOnPlay_&&this.tech_.off("play",this.loadOnPlay_);let e=this.mainPlaylistLoader_.media();if(!e){this.initContentSteeringController_(),this.excludeUnsupportedVariants_();let t;if(this.enableLowInitialPlaylist&&(t=this.selectInitialPlaylist()),t||(t=this.selectPlaylist()),!t||!this.shouldSwitchToMedia_(t)||(this.initialMedia_=t,this.switchMedia_(this.initialMedia_,"initial"),!(this.sourceType_==="vhs-json"&&this.initialMedia_.segments)))return;e=this.initialMedia_}this.handleUpdatedMediaPlaylist(e)}),this.mainPlaylistLoader_.on("error",()=>{const e=this.mainPlaylistLoader_.error;this.excludePlaylist({playlistToExclude:e.playlist,error:e})}),this.mainPlaylistLoader_.on("mediachanging",()=>{this.mainSegmentLoader_.abort(),this.mainSegmentLoader_.pause()}),this.mainPlaylistLoader_.on("mediachange",()=>{const e=this.mainPlaylistLoader_.media(),t=e.targetDuration*1.5*1e3;Co(this.mainPlaylistLoader_.main,this.mainPlaylistLoader_.media())?this.requestOptions_.timeout=0:this.requestOptions_.timeout=t,this.mainPlaylistLoader_.load(),this.mainSegmentLoader_.playlist(e,this.requestOptions_),this.mainSegmentLoader_.load(),this.tech_.trigger({type:"mediachange",bubbles:!0})}),this.mainPlaylistLoader_.on("playlistunchanged",()=>{const e=this.mainPlaylistLoader_.media();if(e.lastExcludeReason_==="playlist-unchanged")return;this.stuckAtPlaylistEnd_(e)&&(this.excludePlaylist({error:{message:"Playlist no longer updating.",reason:"playlist-unchanged"}}),this.tech_.trigger("playliststuck"))}),this.mainPlaylistLoader_.on("renditiondisabled",()=>{this.tech_.trigger({type:"usage",name:"vhs-rendition-disabled"})}),this.mainPlaylistLoader_.on("renditionenabled",()=>{this.tech_.trigger({type:"usage",name:"vhs-rendition-enabled"})})}handleUpdatedMediaPlaylist(e){this.useCueTags_&&this.updateAdCues_(e),this.mainSegmentLoader_.playlist(e,this.requestOptions_),this.updateDuration(!e.endList),this.tech_.paused()||(this.mainSegmentLoader_.load(),this.audioSegmentLoader_&&this.audioSegmentLoader_.load())}triggerPresenceUsage_(e,t){const i=e.mediaGroups||{};let s=!0;const r=Object.keys(i.AUDIO);for(const a in i.AUDIO)for(const l in i.AUDIO[a])i.AUDIO[a][l].uri||(s=!1);s&&this.tech_.trigger({type:"usage",name:"vhs-demuxed"}),Object.keys(i.SUBTITLES).length&&this.tech_.trigger({type:"usage",name:"vhs-webvtt"}),Pi.Playlist.isAes(t)&&this.tech_.trigger({type:"usage",name:"vhs-aes"}),r.length&&Object.keys(i.AUDIO[r[0]]).length>1&&this.tech_.trigger({type:"usage",name:"vhs-alternate-audio"}),this.useCueTags_&&this.tech_.trigger({type:"usage",name:"vhs-playlist-cue-tags"})}shouldSwitchToMedia_(e){const t=this.mainPlaylistLoader_.media()||this.mainPlaylistLoader_.pendingMedia_,i=this.tech_.currentTime(),s=this.bufferLowWaterLine(),r=this.bufferHighWaterLine(),a=this.tech_.buffered();return Kg({buffered:a,currentTime:i,currentPlaylist:t,nextPlaylist:e,bufferLowWaterLine:s,bufferHighWaterLine:r,duration:this.duration(),bufferBasedABR:this.bufferBasedABR,log:this.logger_})}setupSegmentLoaderListeners_(){this.mainSegmentLoader_.on("bandwidthupdate",()=>{this.checkABR_("bandwidthupdate"),this.tech_.trigger("bandwidthupdate")}),this.mainSegmentLoader_.on("timeout",()=>{this.bufferBasedABR&&this.mainSegmentLoader_.load()}),this.bufferBasedABR||this.mainSegmentLoader_.on("progress",()=>{this.trigger("progress")}),this.mainSegmentLoader_.on("error",()=>{const t=this.mainSegmentLoader_.error();this.excludePlaylist({playlistToExclude:t.playlist,error:t})}),this.mainSegmentLoader_.on("appenderror",()=>{this.error=this.mainSegmentLoader_.error_,this.trigger("error")}),this.mainSegmentLoader_.on("syncinfoupdate",()=>{this.onSyncInfoUpdate_()}),this.mainSegmentLoader_.on("timestampoffset",()=>{this.tech_.trigger({type:"usage",name:"vhs-timestamp-offset"})}),this.audioSegmentLoader_.on("syncinfoupdate",()=>{this.onSyncInfoUpdate_()}),this.audioSegmentLoader_.on("appenderror",()=>{this.error=this.audioSegmentLoader_.error_,this.trigger("error")}),this.mainSegmentLoader_.on("ended",()=>{this.logger_("main segment loader ended"),this.onEndOfStream()}),this.mainSegmentLoader_.on("earlyabort",t=>{this.bufferBasedABR||(this.delegateLoaders_("all",["abort"]),this.excludePlaylist({error:{message:"Aborted early because there isn't enough bandwidth to complete the request without rebuffering."},playlistExclusionDuration:$g}))});const e=()=>{if(!this.sourceUpdater_.hasCreatedSourceBuffers())return this.tryToCreateSourceBuffers_();const t=this.getCodecsOrExclude_();t&&this.sourceUpdater_.addOrChangeSourceBuffers(t)};this.mainSegmentLoader_.on("trackinfo",e),this.audioSegmentLoader_.on("trackinfo",e),this.mainSegmentLoader_.on("fmp4",()=>{this.triggeredFmp4Usage||(this.tech_.trigger({type:"usage",name:"vhs-fmp4"}),this.triggeredFmp4Usage=!0)}),this.audioSegmentLoader_.on("fmp4",()=>{this.triggeredFmp4Usage||(this.tech_.trigger({type:"usage",name:"vhs-fmp4"}),this.triggeredFmp4Usage=!0)}),this.audioSegmentLoader_.on("ended",()=>{this.logger_("audioSegmentLoader ended"),this.onEndOfStream()})}mediaSecondsLoaded_(){return Math.max(this.audioSegmentLoader_.mediaSecondsLoaded+this.mainSegmentLoader_.mediaSecondsLoaded)}load(){this.mainSegmentLoader_.load(),this.mediaTypes_.AUDIO.activePlaylistLoader&&this.audioSegmentLoader_.load(),this.mediaTypes_.SUBTITLES.activePlaylistLoader&&this.subtitleSegmentLoader_.load()}fastQualityChange_(e=this.selectPlaylist()){if(e===this.mainPlaylistLoader_.media()){this.logger_("skipping fastQualityChange because new media is same as old");return}this.switchMedia_(e,"fast-quality"),this.resetMainLoaderReplaceSegments()}resetMainLoaderReplaceSegments(){const e=this.tech_.buffered(),t=e.end(e.length-1);this.mainSegmentLoader_.replaceSegmentsUntil=t,this.mainSegmentLoader_.resetLoaderProperties(),this.mainSegmentLoader_.resetLoader()}play(){if(this.setupFirstPlay())return;this.tech_.ended()&&this.tech_.setCurrentTime(0),this.hasPlayed_&&this.load();const e=this.tech_.seekable();if(this.tech_.duration()===1/0&&this.tech_.currentTime()<e.start(0))return this.tech_.setCurrentTime(e.end(e.length-1))}setupFirstPlay(){const e=this.mainPlaylistLoader_.media();if(!e||this.tech_.paused()||this.hasPlayed_)return!1;if(!e.endList||e.start){const t=this.seekable();if(!t.length)return!1;const i=t.end(0);let s=i;if(e.start){const r=e.start.timeOffset;r<0?s=Math.max(i+r,t.start(0)):s=Math.min(i,r)}this.trigger("firstplay"),this.tech_.setCurrentTime(s)}return this.hasPlayed_=!0,this.load(),!0}handleSourceOpen_(){if(this.tryToCreateSourceBuffers_(),this.tech_.autoplay()){const e=this.tech_.play();typeof e!="undefined"&&typeof e.then=="function"&&e.then(null,t=>{})}this.trigger("sourceopen")}handleSourceEnded_(){if(!this.inbandTextTracks_.metadataTrack_)return;const e=this.inbandTextTracks_.metadataTrack_.cues;if(!e||!e.length)return;const t=this.duration();e[e.length-1].endTime=isNaN(t)||Math.abs(t)===1/0?Number.MAX_VALUE:t}handleDurationChange_(){this.tech_.trigger("durationchange")}onEndOfStream(){let e=this.mainSegmentLoader_.ended_;if(this.mediaTypes_.AUDIO.activePlaylistLoader){const t=this.mainSegmentLoader_.getCurrentMediaInfo_();!t||t.hasVideo?e=e&&this.audioSegmentLoader_.ended_:e=this.audioSegmentLoader_.ended_}e&&(this.stopABRTimer_(),this.sourceUpdater_.endOfStream())}stuckAtPlaylistEnd_(e){if(!this.seekable().length)return!1;const i=this.syncController_.getExpiredTime(e,this.duration());if(i===null)return!1;const s=Pi.Playlist.playlistEnd(e,i),r=this.tech_.currentTime(),a=this.tech_.buffered();if(!a.length)return s-r<=bi;const l=a.end(a.length-1);return l-r<=bi&&s-l<=bi}excludePlaylist({playlistToExclude:e=this.mainPlaylistLoader_.media(),error:t={},playlistExclusionDuration:i}){if(e=e||this.mainPlaylistLoader_.media(),i=i||t.playlistExclusionDuration||this.playlistExclusionDuration,!e){this.error=t,this.mediaSource.readyState!=="open"?this.trigger("error"):this.sourceUpdater_.endOfStream("network");return}e.playlistErrors_++;const s=this.mainPlaylistLoader_.main.playlists,r=s.filter(Pr),a=r.length===1&&r[0]===e;if(s.length===1&&i!==1/0)return F.log.warn(`Problem encountered with playlist ${e.id}. Trying again since it is the only playlist.`),this.tech_.trigger("retryplaylist"),this.mainPlaylistLoader_.load(a);if(a){if(this.main().contentSteering){const x=this.pathwayAttribute_(e),L=this.contentSteeringController_.steeringManifest.ttl*1e3;this.contentSteeringController_.excludePathway(x),this.excludeThenChangePathway_(),setTimeout(()=>{this.contentSteeringController_.addAvailablePathway(x)},L);return}let k=!1;s.forEach(x=>{if(x===e)return;const L=x.excludeUntil;typeof L!="undefined"&&L!==1/0&&(k=!0,delete x.excludeUntil)}),k&&(F.log.warn("Removing other playlists from the exclusion list because the last rendition is about to be excluded."),this.tech_.trigger("retryplaylist"))}let l;e.playlistErrors_>this.maxPlaylistRetries?l=1/0:l=Date.now()+i*1e3,e.excludeUntil=l,t.reason&&(e.lastExcludeReason_=t.reason),this.tech_.trigger("excludeplaylist"),this.tech_.trigger({type:"usage",name:"vhs-rendition-excluded"});const h=this.selectPlaylist();if(!h){this.error="Playback cannot continue. No available working or supported playlists.",this.trigger("error");return}const m=t.internal?this.logger_:F.log.warn,g=t.message?" "+t.message:"";m(`${t.internal?"Internal problem":"Problem"} encountered with playlist ${e.id}.${g} Switching to playlist ${h.id}.`),h.attributes.AUDIO!==e.attributes.AUDIO&&this.delegateLoaders_("audio",["abort","pause"]),h.attributes.SUBTITLES!==e.attributes.SUBTITLES&&this.delegateLoaders_("subtitle",["abort","pause"]),this.delegateLoaders_("main",["abort","pause"]);const E=h.targetDuration/2*1e3||5*1e3,w=typeof h.lastRequest=="number"&&Date.now()-h.lastRequest<=E;return this.switchMedia_(h,"exclude",a||w)}pauseLoading(){this.delegateLoaders_("all",["abort","pause"]),this.stopABRTimer_()}delegateLoaders_(e,t){const i=[],s=e==="all";(s||e==="main")&&i.push(this.mainPlaylistLoader_);const r=[];(s||e==="audio")&&r.push("AUDIO"),(s||e==="subtitle")&&(r.push("CLOSED-CAPTIONS"),r.push("SUBTITLES")),r.forEach(a=>{const l=this.mediaTypes_[a]&&this.mediaTypes_[a].activePlaylistLoader;l&&i.push(l)}),["main","audio","subtitle"].forEach(a=>{const l=this[`${a}SegmentLoader_`];l&&(e===a||e==="all")&&i.push(l)}),i.forEach(a=>t.forEach(l=>{typeof a[l]=="function"&&a[l]()}))}setCurrentTime(e){const t=Gn(this.tech_.buffered(),e);if(!(this.mainPlaylistLoader_&&this.mainPlaylistLoader_.media())||!this.mainPlaylistLoader_.media().segments)return 0;if(t&&t.length)return e;this.mainSegmentLoader_.resetEverything(),this.mediaTypes_.AUDIO.activePlaylistLoader&&this.audioSegmentLoader_.resetEverything(),this.mediaTypes_.SUBTITLES.activePlaylistLoader&&this.subtitleSegmentLoader_.resetEverything(),this.load()}duration(){if(!this.mainPlaylistLoader_)return 0;const e=this.mainPlaylistLoader_.media();return e?e.endList?this.mediaSource?this.mediaSource.duration:Pi.Playlist.duration(e):1/0:0}seekable(){return this.seekable_}onSyncInfoUpdate_(){let e;if(!this.mainPlaylistLoader_)return;let t=this.mainPlaylistLoader_.media();if(!t)return;let i=this.syncController_.getExpiredTime(t,this.duration());if(i===null)return;const s=this.mainPlaylistLoader_.main,r=Pi.Playlist.seekable(t,i,Pi.Playlist.liveEdgeDelay(s,t));if(r.length===0||this.mediaTypes_.AUDIO.activePlaylistLoader&&(t=this.mediaTypes_.AUDIO.activePlaylistLoader.media(),i=this.syncController_.getExpiredTime(t,this.duration()),i===null||(e=Pi.Playlist.seekable(t,i,Pi.Playlist.liveEdgeDelay(s,t)),e.length===0)))return;let a,l;this.seekable_&&this.seekable_.length&&(a=this.seekable_.end(0),l=this.seekable_.start(0)),e?e.start(0)>r.end(0)||r.start(0)>e.end(0)?this.seekable_=r:this.seekable_=Bt([[e.start(0)>r.start(0)?e.start(0):r.start(0),e.end(0)<r.end(0)?e.end(0):r.end(0)]]):this.seekable_=r,!(this.seekable_&&this.seekable_.length&&this.seekable_.end(0)===a&&this.seekable_.start(0)===l)&&(this.logger_(`seekable updated [${sc(this.seekable_)}]`),this.tech_.trigger("seekablechanged"))}updateDuration(e){if(this.updateDuration_&&(this.mediaSource.removeEventListener("sourceopen",this.updateDuration_),this.updateDuration_=null),this.mediaSource.readyState!=="open"){this.updateDuration_=this.updateDuration.bind(this,e),this.mediaSource.addEventListener("sourceopen",this.updateDuration_);return}if(e){const s=this.seekable();if(!s.length)return;(isNaN(this.mediaSource.duration)||this.mediaSource.duration<s.end(s.length-1))&&this.sourceUpdater_.setDuration(s.end(s.length-1));return}const t=this.tech_.buffered();let i=Pi.Playlist.duration(this.mainPlaylistLoader_.media());t.length>0&&(i=Math.max(i,t.end(t.length-1))),this.mediaSource.duration!==i&&this.sourceUpdater_.setDuration(i)}dispose(){this.trigger("dispose"),this.decrypter_.terminate(),this.mainPlaylistLoader_.dispose(),this.mainSegmentLoader_.dispose(),this.contentSteeringController_.dispose(),this.loadOnPlay_&&this.tech_.off("play",this.loadOnPlay_),["AUDIO","SUBTITLES"].forEach(e=>{const t=this.mediaTypes_[e].groups;for(const i in t)t[i].forEach(s=>{s.playlistLoader&&s.playlistLoader.dispose()})}),this.audioSegmentLoader_.dispose(),this.subtitleSegmentLoader_.dispose(),this.sourceUpdater_.dispose(),this.timelineChangeController_.dispose(),this.stopABRTimer_(),this.updateDuration_&&this.mediaSource.removeEventListener("sourceopen",this.updateDuration_),this.mediaSource.removeEventListener("durationchange",this.handleDurationChange_),this.mediaSource.removeEventListener("sourceopen",this.handleSourceOpen_),this.mediaSource.removeEventListener("sourceended",this.handleSourceEnded_),this.off()}main(){return this.mainPlaylistLoader_.main}media(){return this.mainPlaylistLoader_.media()||this.initialMedia_}areMediaTypesKnown_(){const e=!!this.mediaTypes_.AUDIO.activePlaylistLoader,t=!!this.mainSegmentLoader_.getCurrentMediaInfo_(),i=e?!!this.audioSegmentLoader_.getCurrentMediaInfo_():!0;return!(!t||!i)}getCodecsOrExclude_(){const e={main:this.mainSegmentLoader_.getCurrentMediaInfo_()||{},audio:this.audioSegmentLoader_.getCurrentMediaInfo_()||{}},t=this.mainSegmentLoader_.getPendingSegmentPlaylist()||this.media();e.video=e.main;const i=Ds(this.main(),t),s={},r=!!this.mediaTypes_.AUDIO.activePlaylistLoader;if(e.main.hasVideo&&(s.video=i.video||e.main.videoCodec||ui),e.main.isMuxed&&(s.video+=`,${i.audio||e.main.audioCodec||Nt}`),(e.main.hasAudio&&!e.main.isMuxed||e.audio.hasAudio||r)&&(s.audio=i.audio||e.main.audioCodec||e.audio.audioCodec||Nt,e.audio.isFmp4=e.main.hasAudio&&!e.main.isMuxed?e.main.isFmp4:e.audio.isFmp4),!s.audio&&!s.video){this.excludePlaylist({playlistToExclude:t,error:{message:"Could not determine codecs for playlist."},playlistExclusionDuration:1/0});return}const a=(m,g)=>m?at(g):At(g),l={};let h;if(["video","audio"].forEach(function(m){if(s.hasOwnProperty(m)&&!a(e[m].isFmp4,s[m])){const g=e[m].isFmp4?"browser":"muxer";l[g]=l[g]||[],l[g].push(s[m]),m==="audio"&&(h=g)}}),r&&h&&t.attributes.AUDIO){const m=t.attributes.AUDIO;this.main().playlists.forEach(g=>{(g.attributes&&g.attributes.AUDIO)===m&&g!==t&&(g.excludeUntil=1/0)}),this.logger_(`excluding audio group ${m} as ${h} does not support codec(s): "${s.audio}"`)}if(Object.keys(l).length){const m=Object.keys(l).reduce((g,E)=>(g&&(g+=", "),g+=`${E} does not support codec(s): "${l[E].join(",")}"`,g),"")+".";this.excludePlaylist({playlistToExclude:t,error:{internal:!0,message:m},playlistExclusionDuration:1/0});return}if(this.sourceUpdater_.hasCreatedSourceBuffers()&&!this.sourceUpdater_.canChangeType()){const m=[];if(["video","audio"].forEach(g=>{const E=(De(this.sourceUpdater_.codecs[g]||"")[0]||{}).type,w=(De(s[g]||"")[0]||{}).type;E&&w&&E.toLowerCase()!==w.toLowerCase()&&m.push(`"${this.sourceUpdater_.codecs[g]}" -> "${s[g]}"`)}),m.length){this.excludePlaylist({playlistToExclude:t,error:{message:`Codec switching not supported: ${m.join(", ")}.`,internal:!0},playlistExclusionDuration:1/0});return}}return s}tryToCreateSourceBuffers_(){if(this.mediaSource.readyState!=="open"||this.sourceUpdater_.hasCreatedSourceBuffers()||!this.areMediaTypesKnown_())return;const e=this.getCodecsOrExclude_();if(!e)return;this.sourceUpdater_.createSourceBuffers(e);const t=[e.video,e.audio].filter(Boolean).join(",");this.excludeIncompatibleVariants_(t)}excludeUnsupportedVariants_(){const e=this.main().playlists,t=[];Object.keys(e).forEach(i=>{const s=e[i];if(t.indexOf(s.id)!==-1)return;t.push(s.id);const r=Ds(this.main,s),a=[];r.audio&&!At(r.audio)&&!at(r.audio)&&a.push(`audio codec ${r.audio}`),r.video&&!At(r.video)&&!at(r.video)&&a.push(`video codec ${r.video}`),r.text&&r.text==="stpp.ttml.im1t"&&a.push(`text codec ${r.text}`),a.length&&(s.excludeUntil=1/0,this.logger_(`excluding ${s.id} for unsupported: ${a.join(", ")}`))})}excludeIncompatibleVariants_(e){const t=[],i=this.main().playlists,s=Or(De(e)),r=qc(s),a=s.video&&De(s.video)[0]||null,l=s.audio&&De(s.audio)[0]||null;Object.keys(i).forEach(h=>{const m=i[h];if(t.indexOf(m.id)!==-1||m.excludeUntil===1/0)return;t.push(m.id);const g=[],E=Ds(this.mainPlaylistLoader_.main,m),w=qc(E);if(!(!E.audio&&!E.video)){if(w!==r&&g.push(`codec count "${w}" !== "${r}"`),!this.sourceUpdater_.canChangeType()){const k=E.video&&De(E.video)[0]||null,x=E.audio&&De(E.audio)[0]||null;k&&a&&k.type.toLowerCase()!==a.type.toLowerCase()&&g.push(`video codec "${k.type}" !== "${a.type}"`),x&&l&&x.type.toLowerCase()!==l.type.toLowerCase()&&g.push(`audio codec "${x.type}" !== "${l.type}"`)}g.length&&(m.excludeUntil=1/0,this.logger_(`excluding ${m.id}: ${g.join(" && ")}`))}})}updateAdCues_(e){let t=0;const i=this.seekable();i.length&&(t=i.start(0)),Dg(e,this.cueTagsTrack_,t)}goalBufferLength(){const e=this.tech_.currentTime(),t=St.GOAL_BUFFER_LENGTH,i=St.GOAL_BUFFER_LENGTH_RATE,s=Math.max(t,St.MAX_GOAL_BUFFER_LENGTH);return Math.min(t+e*i,s)}bufferLowWaterLine(){const e=this.tech_.currentTime(),t=St.BUFFER_LOW_WATER_LINE,i=St.BUFFER_LOW_WATER_LINE_RATE,s=Math.max(t,St.MAX_BUFFER_LOW_WATER_LINE),r=Math.max(t,St.EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE);return Math.min(t+e*i,this.bufferBasedABR?r:s)}bufferHighWaterLine(){return St.BUFFER_HIGH_WATER_LINE}addDateRangesToTextTrack_(e){Xc(this.inbandTextTracks_,"com.apple.streaming",this.tech_),hg({inbandTextTracks:this.inbandTextTracks_,dateRanges:e})}addMetadataToTextTrack(e,t,i){const s=this.sourceUpdater_.videoBuffer?this.sourceUpdater_.videoTimestampOffset():this.sourceUpdater_.audioTimestampOffset();Xc(this.inbandTextTracks_,e,this.tech_),ug({inbandTextTracks:this.inbandTextTracks_,metadataArray:t,timestampOffset:s,videoDuration:i})}pathwayAttribute_(e){return e.attributes["PATHWAY-ID"]||e.attributes.serviceLocation}initContentSteeringController_(){const e=this.main();if(!e.contentSteering)return;const t=i=>{for(const s of i.playlists)this.contentSteeringController_.addAvailablePathway(this.pathwayAttribute_(s));this.contentSteeringController_.assignTagProperties(i.uri,i.contentSteering)};t(e),this.contentSteeringController_.on("content-steering",this.excludeThenChangePathway_.bind(this)),this.sourceType_==="dash"&&this.mainPlaylistLoader_.on("mediaupdatetimeout",()=>{this.mainPlaylistLoader_.refreshMedia_(this.mainPlaylistLoader_.media().id),this.contentSteeringController_.abort(),this.contentSteeringController_.clearTTLTimeout_(),this.contentSteeringController_.clearAvailablePathways(),t(this.main())}),this.contentSteeringController_.queryBeforeStart||this.tech_.one("canplay",()=>{this.contentSteeringController_.requestSteeringManifest()})}excludeThenChangePathway_(){const e=this.contentSteeringController_.getPathway();if(!e)return;const i=this.main().playlists,s=new Set;let r=!1;Object.keys(i).forEach(a=>{const l=i[a],h=this.pathwayAttribute_(l),m=h&&e!==h;l.excludeUntil===1/0&&l.lastExcludeReason_==="content-steering"&&!m&&(delete l.excludeUntil,delete l.lastExcludeReason_,r=!0);const E=!l.excludeUntil&&l.excludeUntil!==1/0;!s.has(l.id)&&m&&E&&(s.add(l.id),l.excludeUntil=1/0,l.lastExcludeReason_="content-steering",this.logger_(`excluding ${l.id} for ${l.lastExcludeReason_}`))}),this.contentSteeringController_.manifestType_==="DASH"&&Object.keys(this.mediaTypes_).forEach(a=>{const l=this.mediaTypes_[a];if(l.activePlaylistLoader){const h=l.activePlaylistLoader.media_;h&&h.attributes.serviceLocation!==e&&(r=!0)}}),r&&this.changeSegmentPathway_()}changeSegmentPathway_(){const e=this.selectPlaylist();this.pauseLoading(),this.contentSteeringController_.manifestType_==="DASH"&&this.switchMediaForDASHContentSteering_(),this.switchMedia_(e,"content-steering")}}const Jg=(n,e,t)=>i=>{const s=n.main.playlists[e],r=To(s),a=Pr(s);return typeof i=="undefined"?a:(i?delete s.disabled:s.disabled=!0,i!==a&&!r&&(t(),i?n.trigger("renditionenabled"):n.trigger("renditiondisabled")),i)};class Zg{constructor(e,t,i){const{playlistController_:s}=e,r=s.fastQualityChange_.bind(s);if(t.attributes){const a=t.attributes.RESOLUTION;this.width=a&&a.width,this.height=a&&a.height,this.bandwidth=t.attributes.BANDWIDTH,this.frameRate=t.attributes["FRAME-RATE"]}this.codecs=Ds(s.main(),t),this.playlist=t,this.id=i,this.enabled=Jg(e.playlists,t.id,r)}}const e0=function(n){n.representations=()=>{const e=n.playlistController_.main(),t=Bs(e)?n.playlistController_.getAudioTrackPlaylists_():e.playlists;return t?t.filter(i=>!To(i)).map((i,s)=>new Zg(n,i,i.id)):[]}},hd=["seeking","seeked","pause","playing","error"];class t0{constructor(e){this.playlistController_=e.playlistController,this.tech_=e.tech,this.seekable=e.seekable,this.allowSeeksWithinUnsafeLiveWindow=e.allowSeeksWithinUnsafeLiveWindow,this.liveRangeSafeTimeDelta=e.liveRangeSafeTimeDelta,this.media=e.media,this.consecutiveUpdates=0,this.lastRecordedTime=null,this.checkCurrentTimeTimeout_=null,this.logger_=ni("PlaybackWatcher"),this.logger_("initialize");const t=()=>this.monitorCurrentTime_(),i=()=>this.monitorCurrentTime_(),s=()=>this.techWaiting_(),r=()=>this.resetTimeUpdate_(),a=this.playlistController_,l=["main","subtitle","audio"],h={};l.forEach(g=>{h[g]={reset:()=>this.resetSegmentDownloads_(g),updateend:()=>this.checkSegmentDownloads_(g)},a[`${g}SegmentLoader_`].on("appendsdone",h[g].updateend),a[`${g}SegmentLoader_`].on("playlistupdate",h[g].reset),this.tech_.on(["seeked","seeking"],h[g].reset)});const m=g=>{["main","audio"].forEach(E=>{a[`${E}SegmentLoader_`][g]("appended",this.seekingAppendCheck_)})};this.seekingAppendCheck_=()=>{this.fixesBadSeeks_()&&(this.consecutiveUpdates=0,this.lastRecordedTime=this.tech_.currentTime(),m("off"))},this.clearSeekingAppendCheck_=()=>m("off"),this.watchForBadSeeking_=()=>{this.clearSeekingAppendCheck_(),m("on")},this.tech_.on("seeked",this.clearSeekingAppendCheck_),this.tech_.on("seeking",this.watchForBadSeeking_),this.tech_.on("waiting",s),this.tech_.on(hd,r),this.tech_.on("canplay",i),this.tech_.one("play",t),this.dispose=()=>{this.clearSeekingAppendCheck_(),this.logger_("dispose"),this.tech_.off("waiting",s),this.tech_.off(hd,r),this.tech_.off("canplay",i),this.tech_.off("play",t),this.tech_.off("seeking",this.watchForBadSeeking_),this.tech_.off("seeked",this.clearSeekingAppendCheck_),l.forEach(g=>{a[`${g}SegmentLoader_`].off("appendsdone",h[g].updateend),a[`${g}SegmentLoader_`].off("playlistupdate",h[g].reset),this.tech_.off(["seeked","seeking"],h[g].reset)}),this.checkCurrentTimeTimeout_&&A().clearTimeout(this.checkCurrentTimeTimeout_),this.resetTimeUpdate_()}}monitorCurrentTime_(){this.checkCurrentTime_(),this.checkCurrentTimeTimeout_&&A().clearTimeout(this.checkCurrentTimeTimeout_),this.checkCurrentTimeTimeout_=A().setTimeout(this.monitorCurrentTime_.bind(this),250)}resetSegmentDownloads_(e){const t=this.playlistController_[`${e}SegmentLoader_`];this[`${e}StalledDownloads_`]>0&&this.logger_(`resetting possible stalled download count for ${e} loader`),this[`${e}StalledDownloads_`]=0,this[`${e}Buffered_`]=t.buffered_()}checkSegmentDownloads_(e){const t=this.playlistController_,i=t[`${e}SegmentLoader_`],s=i.buffered_(),r=$p(this[`${e}Buffered_`],s);if(this[`${e}Buffered_`]=s,r){this.resetSegmentDownloads_(e);return}this[`${e}StalledDownloads_`]++,this.logger_(`found #${this[`${e}StalledDownloads_`]} ${e} appends that did not increase buffer (possible stalled download)`,{playlistId:i.playlist_&&i.playlist_.id,buffered:an(s)}),!(this[`${e}StalledDownloads_`]<10)&&(this.logger_(`${e} loader stalled download exclusion`),this.resetSegmentDownloads_(e),this.tech_.trigger({type:"usage",name:`vhs-${e}-download-exclusion`}),e!=="subtitle"&&t.excludePlaylist({error:{message:`Excessive ${e} segment downloading detected.`},playlistExclusionDuration:1/0}))}checkCurrentTime_(){if(this.tech_.paused()||this.tech_.seeking())return;const e=this.tech_.currentTime(),t=this.tech_.buffered();if(this.lastRecordedTime===e&&(!t.length||e+bi>=t.end(t.length-1)))return this.techWaiting_();this.consecutiveUpdates>=5&&e===this.lastRecordedTime?(this.consecutiveUpdates++,this.waiting_()):e===this.lastRecordedTime?this.consecutiveUpdates++:(this.consecutiveUpdates=0,this.lastRecordedTime=e)}resetTimeUpdate_(){this.consecutiveUpdates=0}fixesBadSeeks_(){if(!this.tech_.seeking())return!1;const t=this.seekable(),i=this.tech_.currentTime(),s=this.afterSeekableWindow_(t,i,this.media(),this.allowSeeksWithinUnsafeLiveWindow);let r;if(s&&(r=t.end(t.length-1)),this.beforeSeekableWindow_(t,i)){const x=t.start(0);r=x+(x===t.end(0)?0:bi)}if(typeof r!="undefined")return this.logger_(`Trying to seek outside of seekable at time ${i} with seekable range ${sc(t)}. Seeking to ${r}.`),this.tech_.setCurrentTime(r),!0;const a=this.playlistController_.sourceUpdater_,l=this.tech_.buffered(),h=a.audioBuffer?a.audioBuffered():null,m=a.videoBuffer?a.videoBuffered():null,g=this.media(),E=g.partTargetDuration?g.partTargetDuration:(g.targetDuration-qi)*2,w=[h,m];for(let x=0;x<w.length;x++){if(!w[x])continue;if(_o(w[x],i)<E)return!1}const k=Ir(l,i);return k.length===0?!1:(r=k.start(0)+bi,this.logger_(`Buffered region starts (${k.start(0)})  just beyond seek point (${i}). Seeking to ${r}.`),this.tech_.setCurrentTime(r),!0)}waiting_(){if(this.techWaiting_())return;const e=this.tech_.currentTime(),t=this.tech_.buffered(),i=Gn(t,e);if(i.length&&e+3<=i.end(0)){this.resetTimeUpdate_(),this.tech_.setCurrentTime(e),this.logger_(`Stopped at ${e} while inside a buffered region [${i.start(0)} -> ${i.end(0)}]. Attempting to resume playback by seeking to the current time.`),this.tech_.trigger({type:"usage",name:"vhs-unknown-waiting"});return}}techWaiting_(){const e=this.seekable(),t=this.tech_.currentTime();if(this.tech_.seeking())return!0;if(this.beforeSeekableWindow_(e,t)){const l=e.end(e.length-1);return this.logger_(`Fell out of live window at time ${t}. Seeking to live point (seekable end) ${l}`),this.resetTimeUpdate_(),this.tech_.setCurrentTime(l),this.tech_.trigger({type:"usage",name:"vhs-live-resync"}),!0}const i=this.tech_.vhs.playlistController_.sourceUpdater_,s=this.tech_.buffered();if(this.videoUnderflow_({audioBuffered:i.audioBuffered(),videoBuffered:i.videoBuffered(),currentTime:t}))return this.resetTimeUpdate_(),this.tech_.setCurrentTime(t),this.tech_.trigger({type:"usage",name:"vhs-video-underflow"}),!0;const a=Ir(s,t);return a.length>0?(this.logger_(`Stopped at ${t} and seeking to ${a.start(0)}`),this.resetTimeUpdate_(),this.skipTheGap_(t),!0):!1}afterSeekableWindow_(e,t,i,s=!1){if(!e.length)return!1;let r=e.end(e.length-1)+bi;const a=!i.endList,l=typeof i.partTargetDuration=="number";return a&&(l||s)&&(r=e.end(e.length-1)+i.targetDuration*3),t>r}beforeSeekableWindow_(e,t){return!!(e.length&&e.start(0)>0&&t<e.start(0)-this.liveRangeSafeTimeDelta)}videoUnderflow_({videoBuffered:e,audioBuffered:t,currentTime:i}){if(!e)return;let s;if(e.length&&t.length){const r=Gn(e,i-3),a=Gn(e,i),l=Gn(t,i);l.length&&!a.length&&r.length&&(s={start:r.end(0),end:l.end(0)})}else Ir(e,i).length||(s=this.gapFromVideoUnderflow_(e,i));return s?(this.logger_(`Encountered a gap in video from ${s.start} to ${s.end}. Seeking to current time ${i}`),!0):!1}skipTheGap_(e){const t=this.tech_.buffered(),i=this.tech_.currentTime(),s=Ir(t,i);this.resetTimeUpdate_(),!(s.length===0||i!==e)&&(this.logger_("skipTheGap_:","currentTime:",i,"scheduled currentTime:",e,"nextRange start:",s.start(0)),this.tech_.setCurrentTime(s.start(0)+qi),this.tech_.trigger({type:"usage",name:"vhs-gap-skip"}))}gapFromVideoUnderflow_(e,t){const i=qp(e);for(let s=0;s<i.length;s++){const r=i.start(s),a=i.end(s);if(t-r<4&&t-r>2)return{start:r,end:a}}return null}}const i0={errorInterval:30,getSource(n){const t=this.tech({IWillNotUseThisInPlugins:!0}).currentSource_||this.currentSource();return n(t)}},fd=function(n,e){let t=0,i=0;const s=Ye(i0,e);n.ready(()=>{n.trigger({type:"usage",name:"vhs-error-reload-initialized"})});const r=function(){i&&n.currentTime(i)},a=function(g){g!=null&&(i=n.duration()!==1/0&&n.currentTime()||0,n.one("loadedmetadata",r),n.src(g),n.trigger({type:"usage",name:"vhs-error-reload"}),n.play())},l=function(){if(Date.now()-t<s.errorInterval*1e3){n.trigger({type:"usage",name:"vhs-error-reload-canceled"});return}if(!s.getSource||typeof s.getSource!="function"){F.log.error("ERROR: reloadSourceOnError - The option getSource must be a function!");return}return t=Date.now(),s.getSource.call(n,a)},h=function(){n.off("loadedmetadata",r),n.off("error",l),n.off("dispose",h)},m=function(g){h(),fd(n,g)};n.on("error",l),n.on("dispose",h),n.reloadSourceOnError=m},n0=function(n){fd(this,n)};var pd="3.7.0",s0="7.0.1",r0="1.2.2",a0="7.1.0",o0="4.0.1";const ft={PlaylistLoader:Xn,Playlist:zt,utils:vm,STANDARD_PLAYLIST_SELECTOR:$c,INITIAL_PLAYLIST_SELECTOR:sg,lastBandwidthSelector:$c,movingAverageBandwidthSelector:ig,comparePlaylistBandwidth:Ro,comparePlaylistResolution:tg,xhr:Ec()};Object.keys(St).forEach(n=>{Object.defineProperty(ft,n,{get(){return F.log.warn(`using Vhs.${n} is UNSAFE be sure you know what you are doing`),St[n]},set(e){if(F.log.warn(`using Vhs.${n} is UNSAFE be sure you know what you are doing`),typeof e!="number"||e<0){F.log.warn(`value of Vhs.${n} must be greater than or equal to 0`);return}St[n]=e}})});const md="videojs-vhs",gd=function(n,e){const t=e.media();let i=-1;for(let s=0;s<n.length;s++)if(n[s].id===t.id){i=s;break}n.selectedIndex_=i,n.trigger({selectedIndex:i,type:"change"})},l0=function(n,e){e.representations().forEach(t=>{n.addQualityLevel(t)}),gd(n,e.playlists)};ft.canPlaySource=function(){return F.log.warn("VHS is no longer a tech. Please remove it from your player's techOrder.")};const u0=(n,e,t)=>{if(!n)return n;let i={};e&&e.attributes&&e.attributes.CODECS&&(i=Or(De(e.attributes.CODECS))),t&&t.attributes&&t.attributes.CODECS&&(i.audio=t.attributes.CODECS);const s=ct(i.video),r=ct(i.audio),a={};for(const l in n)a[l]={},r&&(a[l].audioContentType=r),s&&(a[l].videoContentType=s),e.contentProtection&&e.contentProtection[l]&&e.contentProtection[l].pssh&&(a[l].pssh=e.contentProtection[l].pssh),typeof n[l]=="string"&&(a[l].url=n[l]);return Ye(n,a)},c0=(n,e)=>n.reduce((t,i)=>{if(!i.contentProtection)return t;const s=e.reduce((r,a)=>{const l=i.contentProtection[a];return l&&l.pssh&&(r[a]={pssh:l.pssh}),r},{});return Object.keys(s).length&&t.push(s),t},[]),d0=({player:n,sourceKeySystems:e,audioMedia:t,mainPlaylists:i})=>{if(!n.eme.initializeMediaKeys)return Promise.resolve();const s=t?i.concat([t]):i,r=c0(s,Object.keys(e)),a=[],l=[];return r.forEach(h=>{l.push(new Promise((m,g)=>{n.tech_.one("keysessioncreated",m)})),a.push(new Promise((m,g)=>{n.eme.initializeMediaKeys({keySystems:h},E=>{if(E){g(E);return}m()})}))}),Promise.race([Promise.all(a),Promise.race(l)])},h0=({player:n,sourceKeySystems:e,media:t,audioMedia:i})=>{const s=u0(e,t,i);return s?(n.currentSource().keySystems=s,s&&!n.eme?(F.log.warn("DRM encrypted source cannot be decrypted without a DRM plugin"),!1):!0):!1},vd=()=>{if(!A().localStorage)return null;const n=A().localStorage.getItem(md);if(!n)return null;try{return JSON.parse(n)}catch(e){return null}},f0=n=>{if(!A().localStorage)return!1;let e=vd();e=e?Ye(e,n):n;try{A().localStorage.setItem(md,JSON.stringify(e))}catch(t){return!1}return e},p0=n=>n.toLowerCase().indexOf("data:application/vnd.videojs.vhs+json,")===0?JSON.parse(n.substring(n.indexOf(",")+1)):n,Ad=(n,e)=>{n._requestCallbackSet||(n._requestCallbackSet=new Set),n._requestCallbackSet.add(e)},yd=(n,e)=>{n._responseCallbackSet||(n._responseCallbackSet=new Set),n._responseCallbackSet.add(e)},_d=(n,e)=>{n._requestCallbackSet&&(n._requestCallbackSet.delete(e),n._requestCallbackSet.size||delete n._requestCallbackSet)},bd=(n,e)=>{n._responseCallbackSet&&(n._responseCallbackSet.delete(e),n._responseCallbackSet.size||delete n._responseCallbackSet)};ft.supportsNativeHls=function(){if(!I()||!I().createElement)return!1;const n=I().createElement("video");return F.getTech("Html5").isSupported()?["application/vnd.apple.mpegurl","audio/mpegurl","audio/x-mpegurl","application/x-mpegurl","video/x-mpegurl","video/mpegurl","application/mpegurl"].some(function(t){return/maybe|probably/i.test(n.canPlayType(t))}):!1}(),ft.supportsNativeDash=function(){return!I()||!I().createElement||!F.getTech("Html5").isSupported()?!1:/maybe|probably/i.test(I().createElement("video").canPlayType("application/dash+xml"))}(),ft.supportsTypeNatively=n=>n==="hls"?ft.supportsNativeHls:n==="dash"?ft.supportsNativeDash:!1,ft.isSupported=function(){return F.log.warn("VHS is no longer a tech. Please remove it from your player's techOrder.")},ft.xhr.onRequest=function(n){Ad(ft.xhr,n)},ft.xhr.onResponse=function(n){yd(ft.xhr,n)},ft.xhr.offRequest=function(n){_d(ft.xhr,n)},ft.xhr.offResponse=function(n){bd(ft.xhr,n)};const m0=F.getComponent("Component");class Ed extends m0{constructor(e,t,i){if(super(t,i.vhs),typeof i.initialBandwidth=="number"&&(this.options_.bandwidth=i.initialBandwidth),this.logger_=ni("VhsHandler"),t.options_&&t.options_.playerId){const s=F.getPlayer(t.options_.playerId);this.player_=s}if(this.tech_=t,this.source_=e,this.stats={},this.ignoreNextSeekingEvent_=!1,this.setOptions_(),this.options_.overrideNative&&t.overrideNativeAudioTracks&&t.overrideNativeVideoTracks)t.overrideNativeAudioTracks(!0),t.overrideNativeVideoTracks(!0);else if(this.options_.overrideNative&&(t.featuresNativeVideoTracks||t.featuresNativeAudioTracks))throw new Error("Overriding native VHS requires emulated tracks. See https://git.io/vMpjB");this.on(I(),["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","MSFullscreenChange"],s=>{const r=I().fullscreenElement||I().webkitFullscreenElement||I().mozFullScreenElement||I().msFullscreenElement;r&&r.contains(this.tech_.el())?this.playlistController_.fastQualityChange_():this.playlistController_.checkABR_()}),this.on(this.tech_,"seeking",function(){if(this.ignoreNextSeekingEvent_){this.ignoreNextSeekingEvent_=!1;return}this.setCurrentTime(this.tech_.currentTime())}),this.on(this.tech_,"error",function(){this.tech_.error()&&this.playlistController_&&this.playlistController_.pauseLoading()}),this.on(this.tech_,"play",this.play)}setOptions_(){if(this.options_.withCredentials=this.options_.withCredentials||!1,this.options_.limitRenditionByPlayerDimensions=this.options_.limitRenditionByPlayerDimensions!==!1,this.options_.useDevicePixelRatio=this.options_.useDevicePixelRatio||!1,this.options_.useBandwidthFromLocalStorage=typeof this.source_.useBandwidthFromLocalStorage!="undefined"?this.source_.useBandwidthFromLocalStorage:this.options_.useBandwidthFromLocalStorage||!1,this.options_.useForcedSubtitles=this.options_.useForcedSubtitles||!1,this.options_.useNetworkInformationApi=this.options_.useNetworkInformationApi||!1,this.options_.useDtsForTimestampOffset=this.options_.useDtsForTimestampOffset||!1,this.options_.calculateTimestampOffsetForEachSegment=this.options_.calculateTimestampOffsetForEachSegment||!1,this.options_.customTagParsers=this.options_.customTagParsers||[],this.options_.customTagMappers=this.options_.customTagMappers||[],this.options_.cacheEncryptionKeys=this.options_.cacheEncryptionKeys||!1,this.options_.llhls=this.options_.llhls!==!1,this.options_.bufferBasedABR=this.options_.bufferBasedABR||!1,typeof this.options_.playlistExclusionDuration!="number"&&(this.options_.playlistExclusionDuration=60),typeof this.options_.bandwidth!="number"&&this.options_.useBandwidthFromLocalStorage){const e=vd();e&&e.bandwidth&&(this.options_.bandwidth=e.bandwidth,this.tech_.trigger({type:"usage",name:"vhs-bandwidth-from-local-storage"})),e&&e.throughput&&(this.options_.throughput=e.throughput,this.tech_.trigger({type:"usage",name:"vhs-throughput-from-local-storage"}))}typeof this.options_.bandwidth!="number"&&(this.options_.bandwidth=St.INITIAL_BANDWIDTH),this.options_.enableLowInitialPlaylist=this.options_.enableLowInitialPlaylist&&this.options_.bandwidth===St.INITIAL_BANDWIDTH,["withCredentials","useDevicePixelRatio","limitRenditionByPlayerDimensions","bandwidth","customTagParsers","customTagMappers","cacheEncryptionKeys","playlistSelector","initialPlaylistSelector","bufferBasedABR","liveRangeSafeTimeDelta","llhls","useForcedSubtitles","useNetworkInformationApi","useDtsForTimestampOffset","calculateTimestampOffsetForEachSegment","exactManifestTimings","leastPixelDiffSelector"].forEach(e=>{typeof this.source_[e]!="undefined"&&(this.options_[e]=this.source_[e])}),this.limitRenditionByPlayerDimensions=this.options_.limitRenditionByPlayerDimensions,this.useDevicePixelRatio=this.options_.useDevicePixelRatio}src(e,t){if(!e)return;this.setOptions_(),this.options_.src=p0(this.source_.src),this.options_.tech=this.tech_,this.options_.externVhs=ft,this.options_.sourceType=Ie(t),this.options_.seekTo=r=>{this.tech_.setCurrentTime(r)},this.playlistController_=new Qg(this.options_);const i=Ye({liveRangeSafeTimeDelta:bi},this.options_,{seekable:()=>this.seekable(),media:()=>this.playlistController_.media(),playlistController:this.playlistController_});this.playbackWatcher_=new t0(i),this.playlistController_.on("error",()=>{const r=F.players[this.tech_.options_.playerId];let a=this.playlistController_.error;typeof a=="object"&&!a.code?a.code=3:typeof a=="string"&&(a={message:a,code:3}),r.error(a)});const s=this.options_.bufferBasedABR?ft.movingAverageBandwidthSelector(.55):ft.STANDARD_PLAYLIST_SELECTOR;this.playlistController_.selectPlaylist=this.selectPlaylist?this.selectPlaylist.bind(this):s.bind(this),this.playlistController_.selectInitialPlaylist=ft.INITIAL_PLAYLIST_SELECTOR.bind(this),this.playlists=this.playlistController_.mainPlaylistLoader_,this.mediaSource=this.playlistController_.mediaSource,Object.defineProperties(this,{selectPlaylist:{get(){return this.playlistController_.selectPlaylist},set(r){this.playlistController_.selectPlaylist=r.bind(this)}},throughput:{get(){return this.playlistController_.mainSegmentLoader_.throughput.rate},set(r){this.playlistController_.mainSegmentLoader_.throughput.rate=r,this.playlistController_.mainSegmentLoader_.throughput.count=1}},bandwidth:{get(){let r=this.playlistController_.mainSegmentLoader_.bandwidth;const a=A().navigator.connection||A().navigator.mozConnection||A().navigator.webkitConnection,l=1e7;if(this.options_.useNetworkInformationApi&&a){const h=a.downlink*1e3*1e3;h>=l&&r>=l?r=Math.max(r,h):r=h}return r},set(r){this.playlistController_.mainSegmentLoader_.bandwidth=r,this.playlistController_.mainSegmentLoader_.throughput={rate:0,count:0}}},systemBandwidth:{get(){const r=1/(this.bandwidth||1);let a;return this.throughput>0?a=1/this.throughput:a=0,Math.floor(1/(r+a))},set(){F.log.error('The "systemBandwidth" property is read-only')}}}),this.options_.bandwidth&&(this.bandwidth=this.options_.bandwidth),this.options_.throughput&&(this.throughput=this.options_.throughput),Object.defineProperties(this.stats,{bandwidth:{get:()=>this.bandwidth||0,enumerable:!0},mediaRequests:{get:()=>this.playlistController_.mediaRequests_()||0,enumerable:!0},mediaRequestsAborted:{get:()=>this.playlistController_.mediaRequestsAborted_()||0,enumerable:!0},mediaRequestsTimedout:{get:()=>this.playlistController_.mediaRequestsTimedout_()||0,enumerable:!0},mediaRequestsErrored:{get:()=>this.playlistController_.mediaRequestsErrored_()||0,enumerable:!0},mediaTransferDuration:{get:()=>this.playlistController_.mediaTransferDuration_()||0,enumerable:!0},mediaBytesTransferred:{get:()=>this.playlistController_.mediaBytesTransferred_()||0,enumerable:!0},mediaSecondsLoaded:{get:()=>this.playlistController_.mediaSecondsLoaded_()||0,enumerable:!0},mediaAppends:{get:()=>this.playlistController_.mediaAppends_()||0,enumerable:!0},mainAppendsToLoadedData:{get:()=>this.playlistController_.mainAppendsToLoadedData_()||0,enumerable:!0},audioAppendsToLoadedData:{get:()=>this.playlistController_.audioAppendsToLoadedData_()||0,enumerable:!0},appendsToLoadedData:{get:()=>this.playlistController_.appendsToLoadedData_()||0,enumerable:!0},timeToLoadedData:{get:()=>this.playlistController_.timeToLoadedData_()||0,enumerable:!0},buffered:{get:()=>an(this.tech_.buffered()),enumerable:!0},currentTime:{get:()=>this.tech_.currentTime(),enumerable:!0},currentSource:{get:()=>this.tech_.currentSource_,enumerable:!0},currentTech:{get:()=>this.tech_.name_,enumerable:!0},duration:{get:()=>this.tech_.duration(),enumerable:!0},main:{get:()=>this.playlists.main,enumerable:!0},playerDimensions:{get:()=>this.tech_.currentDimensions(),enumerable:!0},seekable:{get:()=>an(this.tech_.seekable()),enumerable:!0},timestamp:{get:()=>Date.now(),enumerable:!0},videoPlaybackQuality:{get:()=>this.tech_.getVideoPlaybackQuality(),enumerable:!0}}),this.tech_.one("canplay",this.playlistController_.setupFirstPlay.bind(this.playlistController_)),this.tech_.on("bandwidthupdate",()=>{this.options_.useBandwidthFromLocalStorage&&f0({bandwidth:this.bandwidth,throughput:Math.round(this.throughput)})}),this.playlistController_.on("selectedinitialmedia",()=>{e0(this)}),this.playlistController_.sourceUpdater_.on("createdsourcebuffers",()=>{this.setupEme_()}),this.on(this.playlistController_,"progress",function(){this.tech_.trigger("progress")}),this.on(this.playlistController_,"firstplay",function(){this.ignoreNextSeekingEvent_=!0}),this.setupQualityLevels_(),this.tech_.el()&&(this.mediaSourceUrl_=A().URL.createObjectURL(this.playlistController_.mediaSource),this.tech_.src(this.mediaSourceUrl_))}createKeySessions_(){const e=this.playlistController_.mediaTypes_.AUDIO.activePlaylistLoader;this.logger_("waiting for EME key session creation"),d0({player:this.player_,sourceKeySystems:this.source_.keySystems,audioMedia:e&&e.media(),mainPlaylists:this.playlists.main.playlists}).then(()=>{this.logger_("created EME key session"),this.playlistController_.sourceUpdater_.initializedEme()}).catch(t=>{this.logger_("error while creating EME key session",t),this.player_.error({message:"Failed to initialize media keys for EME",code:3})})}handleWaitingForKey_(){this.logger_("waitingforkey fired, attempting to create any new key sessions"),this.createKeySessions_()}setupEme_(){const e=this.playlistController_.mediaTypes_.AUDIO.activePlaylistLoader,t=h0({player:this.player_,sourceKeySystems:this.source_.keySystems,media:this.playlists.media(),audioMedia:e&&e.media()});if(this.player_.tech_.on("keystatuschange",i=>{if(i.status!=="output-restricted")return;const s=this.playlistController_.main();if(!s||!s.playlists)return;const r=[];s.playlists.forEach(a=>{a&&a.attributes&&a.attributes.RESOLUTION&&a.attributes.RESOLUTION.height>=720&&(!a.excludeUntil||a.excludeUntil<1/0)&&(a.excludeUntil=1/0,r.push(a))}),r.length&&(F.log.warn('DRM keystatus changed to "output-restricted." Removing the following HD playlists that will most likely fail to play and clearing the buffer. This may be due to HDCP restrictions on the stream and the capabilities of the current device.',...r),this.playlistController_.mainSegmentLoader_.resetEverything(),this.playlistController_.fastQualityChange_())}),this.handleWaitingForKey_=this.handleWaitingForKey_.bind(this),this.player_.tech_.on("waitingforkey",this.handleWaitingForKey_),!t){this.playlistController_.sourceUpdater_.initializedEme();return}this.createKeySessions_()}setupQualityLevels_(){const e=F.players[this.tech_.options_.playerId];!e||!e.qualityLevels||this.qualityLevels_||(this.qualityLevels_=e.qualityLevels(),this.playlistController_.on("selectedinitialmedia",()=>{l0(this.qualityLevels_,this)}),this.playlists.on("mediachange",()=>{gd(this.qualityLevels_,this.playlists)}))}static version(){return{"@videojs/http-streaming":pd,"mux.js":s0,"mpd-parser":r0,"m3u8-parser":a0,"aes-decrypter":o0}}version(){return this.constructor.version()}canChangeType(){return sd.canChangeType()}play(){this.playlistController_.play()}setCurrentTime(e){this.playlistController_.setCurrentTime(e)}duration(){return this.playlistController_.duration()}seekable(){return this.playlistController_.seekable()}dispose(){this.playbackWatcher_&&this.playbackWatcher_.dispose(),this.playlistController_&&this.playlistController_.dispose(),this.qualityLevels_&&this.qualityLevels_.dispose(),this.tech_&&this.tech_.vhs&&delete this.tech_.vhs,this.mediaSourceUrl_&&A().URL.revokeObjectURL&&(A().URL.revokeObjectURL(this.mediaSourceUrl_),this.mediaSourceUrl_=null),this.tech_&&this.tech_.off("waitingforkey",this.handleWaitingForKey_),super.dispose()}convertToProgramTime(e,t){return Cm({playlist:this.playlistController_.media(),time:e,callback:t})}seekToProgramTime(e,t,i=!0,s=2){return jc({programTime:e,playlist:this.playlistController_.media(),retryCount:s,pauseAfterSeek:i,seekTo:this.options_.seekTo,tech:this.options_.tech,callback:t})}setupXhrHooks_(){this.xhr.onRequest=e=>{Ad(this.xhr,e)},this.xhr.onResponse=e=>{yd(this.xhr,e)},this.xhr.offRequest=e=>{_d(this.xhr,e)},this.xhr.offResponse=e=>{bd(this.xhr,e)},this.player_.trigger("xhr-hooks-ready")}}const Fr={name:"videojs-http-streaming",VERSION:pd,canHandleSource(n,e={}){const t=Ye(F.options,e);return Fr.canPlayType(n.type,t)},handleSource(n,e,t={}){const i=Ye(F.options,t);return e.vhs=new Ed(n,e,i),e.vhs.xhr=Ec(),e.vhs.setupXhrHooks_(),e.vhs.src(n.src,n.type),e.vhs},canPlayType(n,e){const t=Ie(n);if(!t)return"";const i=Fr.getOverrideNative(e);return!ft.supportsTypeNatively(t)||i?"maybe":""},getOverrideNative(n={}){const{vhs:e={}}=n,t=!(F.browser.IS_ANY_SAFARI||F.browser.IS_IOS),{overrideNative:i=t}=e;return i}};at("avc1.4d400d,mp4a.40.2")&&F.getTech("Html5").registerSourceHandler(Fr,0),F.VhsHandler=Ed,F.VhsSourceHandler=Fr,F.Vhs=ft,F.use||F.registerComponent("Vhs",ft),F.options.vhs=F.options.vhs||{},(!F.getPlugin||!F.getPlugin("reloadSourceOnError"))&&F.registerPlugin("reloadSourceOnError",n0)},13407:function(xe,ne,z){var J=z(58908),A=xe.exports={WebVTT:z(63706),VTTCue:z(22230),VTTRegion:z(13710)};J.vttjs=A,J.WebVTT=A.WebVTT;var $=A.VTTCue,I=A.VTTRegion,te=J.VTTCue,O=J.VTTRegion;A.shim=function(){J.VTTCue=$,J.VTTRegion=I},A.restore=function(){J.VTTCue=te,J.VTTRegion=O},J.VTTCue||A.shim()},63706:function(xe,ne,z){var J=z(89144),A=Object.create||function(){function y(){}return function(C){if(arguments.length!==1)throw new Error("Object.create shim only accepts one parameter.");return y.prototype=C,new y}}();function $(y,C){this.name="ParsingError",this.code=y.code,this.message=C||y.message}$.prototype=A(Error.prototype),$.prototype.constructor=$,$.Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}};function I(y){function C(K,Q,ae,oe){return(K|0)*3600+(Q|0)*60+(ae|0)+(oe|0)/1e3}var N=y.match(/^(\d+):(\d{1,2})(:\d{1,2})?\.(\d{3})/);return N?N[3]?C(N[1],N[2],N[3].replace(":",""),N[4]):N[1]>59?C(N[1],N[2],0,N[4]):C(0,N[1],N[2],N[4]):null}function te(){this.values=A(null)}te.prototype={set:function(y,C){!this.get(y)&&C!==""&&(this.values[y]=C)},get:function(y,C,N){return N?this.has(y)?this.values[y]:C[N]:this.has(y)?this.values[y]:C},has:function(y){return y in this.values},alt:function(y,C,N){for(var K=0;K<N.length;++K)if(C===N[K]){this.set(y,C);break}},integer:function(y,C){/^-?\d+$/.test(C)&&this.set(y,parseInt(C,10))},percent:function(y,C){var N;return(N=C.match(/^([\d]{1,3})(\.[\d]*)?%$/))&&(C=parseFloat(C),C>=0&&C<=100)?(this.set(y,C),!0):!1}};function O(y,C,N,K){var Q=K?y.split(K):[y];for(var ae in Q)if(typeof Q[ae]=="string"){var oe=Q[ae].split(N);if(oe.length===2){var ge=oe[0].trim(),ie=oe[1].trim();C(ge,ie)}}}function ce(y,C,N){var K=y;function Q(){var ge=I(y);if(ge===null)throw new $($.Errors.BadTimeStamp,"Malformed timestamp: "+K);return y=y.replace(/^[^\sa-zA-Z-]+/,""),ge}function ae(ge,ie){var le=new te;O(ge,function(ee,re){switch(ee){case"region":for(var Te=N.length-1;Te>=0;Te--)if(N[Te].id===re){le.set(ee,N[Te].region);break}break;case"vertical":le.alt(ee,re,["rl","lr"]);break;case"line":var De=re.split(","),ze=De[0];le.integer(ee,ze),le.percent(ee,ze)&&le.set("snapToLines",!1),le.alt(ee,ze,["auto"]),De.length===2&&le.alt("lineAlign",De[1],["start","center","end"]);break;case"position":De=re.split(","),le.percent(ee,De[0]),De.length===2&&le.alt("positionAlign",De[1],["start","center","end"]);break;case"size":le.percent(ee,re);break;case"align":le.alt(ee,re,["start","center","end","left","right"]);break}},/:/,/\s/),ie.region=le.get("region",null),ie.vertical=le.get("vertical","");try{ie.line=le.get("line","auto")}catch(ee){}ie.lineAlign=le.get("lineAlign","start"),ie.snapToLines=le.get("snapToLines",!0),ie.size=le.get("size",100);try{ie.align=le.get("align","center")}catch(ee){ie.align=le.get("align","middle")}try{ie.position=le.get("position","auto")}catch(ee){ie.position=le.get("position",{start:0,left:0,center:50,middle:50,end:100,right:100},ie.align)}ie.positionAlign=le.get("positionAlign",{start:"start",left:"start",center:"center",middle:"center",end:"end",right:"end"},ie.align)}function oe(){y=y.replace(/^\s+/,"")}if(oe(),C.startTime=Q(),oe(),y.substr(0,3)!=="-->")throw new $($.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '-->'): "+K);y=y.substr(3),oe(),C.endTime=Q(),oe(),ae(y,C)}var se=J.createElement&&J.createElement("textarea"),fe={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},be={white:"rgba(255,255,255,1)",lime:"rgba(0,255,0,1)",cyan:"rgba(0,255,255,1)",red:"rgba(255,0,0,1)",yellow:"rgba(255,255,0,1)",magenta:"rgba(255,0,255,1)",blue:"rgba(0,0,255,1)",black:"rgba(0,0,0,1)"},ke={v:"title",lang:"lang"},X={rt:"ruby"};function me(y,C){function N(){if(!C)return null;function ze(_e){return C=C.substr(_e.length),_e}var Ve=C.match(/^([^<]*)(<[^>]*>?)?/);return ze(Ve[1]?Ve[1]:Ve[2])}function K(ze){return se.innerHTML=ze,ze=se.textContent,se.textContent="",ze}function Q(ze,Ve){return!X[Ve.localName]||X[Ve.localName]===ze.localName}function ae(ze,Ve){var _e=fe[ze];if(!_e)return null;var ut=y.document.createElement(_e),ct=ke[ze];return ct&&Ve&&(ut[ct]=Ve.trim()),ut}for(var oe=y.document.createElement("div"),ge=oe,ie,le=[];(ie=N())!==null;){if(ie[0]==="<"){if(ie[1]==="/"){le.length&&le[le.length-1]===ie.substr(2).replace(">","")&&(le.pop(),ge=ge.parentNode);continue}var ee=I(ie.substr(1,ie.length-2)),re;if(ee){re=y.document.createProcessingInstruction("timestamp",ee),ge.appendChild(re);continue}var Te=ie.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);if(!Te||(re=ae(Te[1],Te[3]),!re)||!Q(ge,re))continue;if(Te[2]){var De=Te[2].split(".");De.forEach(function(ze){var Ve=/^bg_/.test(ze),_e=Ve?ze.slice(3):ze;if(be.hasOwnProperty(_e)){var ut=Ve?"background-color":"color",ct=be[_e];re.style[ut]=ct}}),re.className=De.join(" ")}le.push(Te[1]),ge.appendChild(re),ge=re;continue}ge.appendChild(y.document.createTextNode(K(ie)))}return oe}var ye=[[1470,1470],[1472,1472],[1475,1475],[1478,1478],[1488,1514],[1520,1524],[1544,1544],[1547,1547],[1549,1549],[1563,1563],[1566,1610],[1645,1647],[1649,1749],[1765,1766],[1774,1775],[1786,1805],[1807,1808],[1810,1839],[1869,1957],[1969,1969],[1984,2026],[2036,2037],[2042,2042],[2048,2069],[2074,2074],[2084,2084],[2088,2088],[2096,2110],[2112,2136],[2142,2142],[2208,2208],[2210,2220],[8207,8207],[64285,64285],[64287,64296],[64298,64310],[64312,64316],[64318,64318],[64320,64321],[64323,64324],[64326,64449],[64467,64829],[64848,64911],[64914,64967],[65008,65020],[65136,65140],[65142,65276],[67584,67589],[67592,67592],[67594,67637],[67639,67640],[67644,67644],[67647,67669],[67671,67679],[67840,67867],[67872,67897],[67903,67903],[67968,68023],[68030,68031],[68096,68096],[68112,68115],[68117,68119],[68121,68147],[68160,68167],[68176,68184],[68192,68223],[68352,68405],[68416,68437],[68440,68466],[68472,68479],[68608,68680],[126464,126467],[126469,126495],[126497,126498],[126500,126500],[126503,126503],[126505,126514],[126516,126519],[126521,126521],[126523,126523],[126530,126530],[126535,126535],[126537,126537],[126539,126539],[126541,126543],[126545,126546],[126548,126548],[126551,126551],[126553,126553],[126555,126555],[126557,126557],[126559,126559],[126561,126562],[126564,126564],[126567,126570],[126572,126578],[126580,126583],[126585,126588],[126590,126590],[126592,126601],[126603,126619],[126625,126627],[126629,126633],[126635,126651],[1114109,1114109]];function Fe(y){for(var C=0;C<ye.length;C++){var N=ye[C];if(y>=N[0]&&y<=N[1])return!0}return!1}function vt(y){var C=[],N="",K;if(!y||!y.childNodes)return"ltr";function Q(ge,ie){for(var le=ie.childNodes.length-1;le>=0;le--)ge.push(ie.childNodes[le])}function ae(ge){if(!ge||!ge.length)return null;var ie=ge.pop(),le=ie.textContent||ie.innerText;if(le){var ee=le.match(/^.*(\n|\r)/);return ee?(ge.length=0,ee[0]):le}if(ie.tagName==="ruby")return ae(ge);if(ie.childNodes)return Q(ge,ie),ae(ge)}for(Q(C,y);N=ae(C);)for(var oe=0;oe<N.length;oe++)if(K=N.charCodeAt(oe),Fe(K))return"rtl";return"ltr"}function nt(y){if(typeof y.line=="number"&&(y.snapToLines||y.line>=0&&y.line<=100))return y.line;if(!y.track||!y.track.textTrackList||!y.track.textTrackList.mediaElement)return-1;for(var C=y.track,N=C.textTrackList,K=0,Q=0;Q<N.length&&N[Q]!==C;Q++)N[Q].mode==="showing"&&K++;return++K*-1}function We(){}We.prototype.applyStyles=function(y,C){C=C||this.div;for(var N in y)y.hasOwnProperty(N)&&(C.style[N]=y[N])},We.prototype.formatStyle=function(y,C){return y===0?0:y+C};function G(y,C,N){We.call(this),this.cue=C,this.cueDiv=me(y,C.text);var K={color:"rgba(255, 255, 255, 1)",backgroundColor:"rgba(0, 0, 0, 0.8)",position:"relative",left:0,right:0,top:0,bottom:0,display:"inline",writingMode:C.vertical===""?"horizontal-tb":C.vertical==="lr"?"vertical-lr":"vertical-rl",unicodeBidi:"plaintext"};this.applyStyles(K,this.cueDiv),this.div=y.document.createElement("div"),K={direction:vt(this.cueDiv),writingMode:C.vertical===""?"horizontal-tb":C.vertical==="lr"?"vertical-lr":"vertical-rl",unicodeBidi:"plaintext",textAlign:C.align==="middle"?"center":C.align,font:N.font,whiteSpace:"pre-line",position:"absolute"},this.applyStyles(K),this.div.appendChild(this.cueDiv);var Q=0;switch(C.positionAlign){case"start":case"line-left":Q=C.position;break;case"center":Q=C.position-C.size/2;break;case"end":case"line-right":Q=C.position-C.size;break}C.vertical===""?this.applyStyles({left:this.formatStyle(Q,"%"),width:this.formatStyle(C.size,"%")}):this.applyStyles({top:this.formatStyle(Q,"%"),height:this.formatStyle(C.size,"%")}),this.move=function(ae){this.applyStyles({top:this.formatStyle(ae.top,"px"),bottom:this.formatStyle(ae.bottom,"px"),left:this.formatStyle(ae.left,"px"),right:this.formatStyle(ae.right,"px"),height:this.formatStyle(ae.height,"px"),width:this.formatStyle(ae.width,"px")})}}G.prototype=A(We.prototype),G.prototype.constructor=G;function Ce(y){var C,N,K,Q;if(y.div){N=y.div.offsetHeight,K=y.div.offsetWidth,Q=y.div.offsetTop;var ae=(ae=y.div.childNodes)&&(ae=ae[0])&&ae.getClientRects&&ae.getClientRects();y=y.div.getBoundingClientRect(),C=ae?Math.max(ae[0]&&ae[0].height||0,y.height/ae.length):0}this.left=y.left,this.right=y.right,this.top=y.top||Q,this.height=y.height||N,this.bottom=y.bottom||Q+(y.height||N),this.width=y.width||K,this.lineHeight=C!==void 0?C:y.lineHeight}Ce.prototype.move=function(y,C){switch(C=C!==void 0?C:this.lineHeight,y){case"+x":this.left+=C,this.right+=C;break;case"-x":this.left-=C,this.right-=C;break;case"+y":this.top+=C,this.bottom+=C;break;case"-y":this.top-=C,this.bottom-=C;break}},Ce.prototype.overlaps=function(y){return this.left<y.right&&this.right>y.left&&this.top<y.bottom&&this.bottom>y.top},Ce.prototype.overlapsAny=function(y){for(var C=0;C<y.length;C++)if(this.overlaps(y[C]))return!0;return!1},Ce.prototype.within=function(y){return this.top>=y.top&&this.bottom<=y.bottom&&this.left>=y.left&&this.right<=y.right},Ce.prototype.overlapsOppositeAxis=function(y,C){switch(C){case"+x":return this.left<y.left;case"-x":return this.right>y.right;case"+y":return this.top<y.top;case"-y":return this.bottom>y.bottom}},Ce.prototype.intersectPercentage=function(y){var C=Math.max(0,Math.min(this.right,y.right)-Math.max(this.left,y.left)),N=Math.max(0,Math.min(this.bottom,y.bottom)-Math.max(this.top,y.top)),K=C*N;return K/(this.height*this.width)},Ce.prototype.toCSSCompatValues=function(y){return{top:this.top-y.top,bottom:y.bottom-this.bottom,left:this.left-y.left,right:y.right-this.right,height:this.height,width:this.width}},Ce.getSimpleBoxPosition=function(y){var C=y.div?y.div.offsetHeight:y.tagName?y.offsetHeight:0,N=y.div?y.div.offsetWidth:y.tagName?y.offsetWidth:0,K=y.div?y.div.offsetTop:y.tagName?y.offsetTop:0;y=y.div?y.div.getBoundingClientRect():y.tagName?y.getBoundingClientRect():y;var Q={left:y.left,right:y.right,top:y.top||K,height:y.height||C,bottom:y.bottom||K+(y.height||C),width:y.width||N};return Q};function Le(y,C,N,K){function Q(_e,ut){for(var ct,at=new Ce(_e),At=1,Nt=0;Nt<ut.length;Nt++){for(;_e.overlapsOppositeAxis(N,ut[Nt])||_e.within(N)&&_e.overlapsAny(K);)_e.move(ut[Nt]);if(_e.within(N))return _e;var ui=_e.intersectPercentage(N);At>ui&&(ct=new Ce(_e),At=ui),_e=new Ce(at)}return ct||at}var ae=new Ce(C),oe=C.cue,ge=nt(oe),ie=[];if(oe.snapToLines){var le;switch(oe.vertical){case"":ie=["+y","-y"],le="height";break;case"rl":ie=["+x","-x"],le="width";break;case"lr":ie=["-x","+x"],le="width";break}var ee=ae.lineHeight,re=ee*Math.round(ge),Te=N[le]+ee,De=ie[0];Math.abs(re)>Te&&(re=re<0?-1:1,re*=Math.ceil(Te/ee)*ee),ge<0&&(re+=oe.vertical===""?N.height:N.width,ie=ie.reverse()),ae.move(De,re)}else{var ze=ae.lineHeight/N.height*100;switch(oe.lineAlign){case"center":ge-=ze/2;break;case"end":ge-=ze;break}switch(oe.vertical){case"":C.applyStyles({top:C.formatStyle(ge,"%")});break;case"rl":C.applyStyles({left:C.formatStyle(ge,"%")});break;case"lr":C.applyStyles({right:C.formatStyle(ge,"%")});break}ie=["+y","-x","+x","-y"],ae=new Ce(C)}var Ve=Q(ae,ie);C.move(Ve.toCSSCompatValues(N))}function we(){}we.StringDecoder=function(){return{decode:function(y){if(!y)return"";if(typeof y!="string")throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(y))}}},we.convertCueToDOMTree=function(y,C){return!y||!C?null:me(y,C)};var Ne=.05,Ze="sans-serif",pe="1.5%";we.processCues=function(y,C,N){if(!y||!C||!N)return null;for(;N.firstChild;)N.removeChild(N.firstChild);var K=y.document.createElement("div");K.style.position="absolute",K.style.left="0",K.style.right="0",K.style.top="0",K.style.bottom="0",K.style.margin=pe,N.appendChild(K);function Q(ee){for(var re=0;re<ee.length;re++)if(ee[re].hasBeenReset||!ee[re].displayState)return!0;return!1}if(!Q(C)){for(var ae=0;ae<C.length;ae++)K.appendChild(C[ae].displayState);return}var oe=[],ge=Ce.getSimpleBoxPosition(K),ie=Math.round(ge.height*Ne*100)/100,le={font:ie+"px "+Ze};(function(){for(var ee,re,Te=0;Te<C.length;Te++)re=C[Te],ee=new G(y,re,le),K.appendChild(ee.div),Le(y,ee,ge,oe),re.displayState=ee.div,oe.push(Ce.getSimpleBoxPosition(ee))})()},we.Parser=function(y,C,N){N||(N=C,C={}),C||(C={}),this.window=y,this.vttjs=C,this.state="INITIAL",this.buffer="",this.decoder=N||new TextDecoder("utf8"),this.regionList=[]},we.Parser.prototype={reportOrThrowError:function(y){if(y instanceof $)this.onparsingerror&&this.onparsingerror(y);else throw y},parse:function(y){var C=this;y&&(C.buffer+=C.decoder.decode(y,{stream:!0}));function N(){for(var ee=C.buffer,re=0;re<ee.length&&ee[re]!=="\r"&&ee[re]!==`
`;)++re;var Te=ee.substr(0,re);return ee[re]==="\r"&&++re,ee[re]===`
`&&++re,C.buffer=ee.substr(re),Te}function K(ee){var re=new te;if(O(ee,function(De,ze){switch(De){case"id":re.set(De,ze);break;case"width":re.percent(De,ze);break;case"lines":re.integer(De,ze);break;case"regionanchor":case"viewportanchor":var Ve=ze.split(",");if(Ve.length!==2)break;var _e=new te;if(_e.percent("x",Ve[0]),_e.percent("y",Ve[1]),!_e.has("x")||!_e.has("y"))break;re.set(De+"X",_e.get("x")),re.set(De+"Y",_e.get("y"));break;case"scroll":re.alt(De,ze,["up"]);break}},/=/,/\s/),re.has("id")){var Te=new(C.vttjs.VTTRegion||C.window.VTTRegion);Te.width=re.get("width",100),Te.lines=re.get("lines",3),Te.regionAnchorX=re.get("regionanchorX",0),Te.regionAnchorY=re.get("regionanchorY",100),Te.viewportAnchorX=re.get("viewportanchorX",0),Te.viewportAnchorY=re.get("viewportanchorY",100),Te.scroll=re.get("scroll",""),C.onregion&&C.onregion(Te),C.regionList.push({id:re.get("id"),region:Te})}}function Q(ee){var re=new te;O(ee,function(Te,De){switch(Te){case"MPEGT":re.integer(Te+"S",De);break;case"LOCA":re.set(Te+"L",I(De));break}},/[^\d]:/,/,/),C.ontimestampmap&&C.ontimestampmap({MPEGTS:re.get("MPEGTS"),LOCAL:re.get("LOCAL")})}function ae(ee){ee.match(/X-TIMESTAMP-MAP/)?O(ee,function(re,Te){switch(re){case"X-TIMESTAMP-MAP":Q(Te);break}},/=/):O(ee,function(re,Te){switch(re){case"Region":K(Te);break}},/:/)}try{var oe;if(C.state==="INITIAL"){if(!/\r\n|\n/.test(C.buffer))return this;oe=N();var ge=oe.match(/^WEBVTT([ \t].*)?$/);if(!ge||!ge[0])throw new $($.Errors.BadSignature);C.state="HEADER"}for(var ie=!1;C.buffer;){if(!/\r\n|\n/.test(C.buffer))return this;switch(ie?ie=!1:oe=N(),C.state){case"HEADER":/:/.test(oe)?ae(oe):oe||(C.state="ID");continue;case"NOTE":oe||(C.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(oe)){C.state="NOTE";break}if(!oe)continue;C.cue=new(C.vttjs.VTTCue||C.window.VTTCue)(0,0,"");try{C.cue.align="center"}catch(ee){C.cue.align="middle"}if(C.state="CUE",oe.indexOf("-->")===-1){C.cue.id=oe;continue}case"CUE":try{ce(oe,C.cue,C.regionList)}catch(ee){C.reportOrThrowError(ee),C.cue=null,C.state="BADCUE";continue}C.state="CUETEXT";continue;case"CUETEXT":var le=oe.indexOf("-->")!==-1;if(!oe||le&&(ie=!0)){C.oncue&&C.oncue(C.cue),C.cue=null,C.state="ID";continue}C.cue.text&&(C.cue.text+=`
`),C.cue.text+=oe.replace(/\u2028/g,`
`).replace(/u2029/g,`
`);continue;case"BADCUE":oe||(C.state="ID");continue}}}catch(ee){C.reportOrThrowError(ee),C.state==="CUETEXT"&&C.cue&&C.oncue&&C.oncue(C.cue),C.cue=null,C.state=C.state==="INITIAL"?"BADWEBVTT":"BADCUE"}return this},flush:function(){var y=this;try{if(y.buffer+=y.decoder.decode(),(y.cue||y.state==="HEADER")&&(y.buffer+=`

`,y.parse()),y.state==="INITIAL")throw new $($.Errors.BadSignature)}catch(C){y.reportOrThrowError(C)}return y.onflush&&y.onflush(),this}},xe.exports=we},22230:function(xe,ne,z){var J=z(25108),A="auto",$={"":1,lr:1,rl:1},I={start:1,center:1,end:1,left:1,right:1,auto:1,"line-left":1,"line-right":1};function te(se){if(typeof se!="string")return!1;var fe=$[se.toLowerCase()];return fe?se.toLowerCase():!1}function O(se){if(typeof se!="string")return!1;var fe=I[se.toLowerCase()];return fe?se.toLowerCase():!1}function ce(se,fe,be){this.hasBeenReset=!1;var ke="",X=!1,me=se,ye=fe,Fe=be,vt=null,nt="",We=!0,G="auto",Ce="start",Le="auto",we="auto",Ne=100,Ze="center";Object.defineProperties(this,{id:{enumerable:!0,get:function(){return ke},set:function(pe){ke=""+pe}},pauseOnExit:{enumerable:!0,get:function(){return X},set:function(pe){X=!!pe}},startTime:{enumerable:!0,get:function(){return me},set:function(pe){if(typeof pe!="number")throw new TypeError("Start time must be set to a number.");me=pe,this.hasBeenReset=!0}},endTime:{enumerable:!0,get:function(){return ye},set:function(pe){if(typeof pe!="number")throw new TypeError("End time must be set to a number.");ye=pe,this.hasBeenReset=!0}},text:{enumerable:!0,get:function(){return Fe},set:function(pe){Fe=""+pe,this.hasBeenReset=!0}},region:{enumerable:!0,get:function(){return vt},set:function(pe){vt=pe,this.hasBeenReset=!0}},vertical:{enumerable:!0,get:function(){return nt},set:function(pe){var y=te(pe);if(y===!1)throw new SyntaxError("Vertical: an invalid or illegal direction string was specified.");nt=y,this.hasBeenReset=!0}},snapToLines:{enumerable:!0,get:function(){return We},set:function(pe){We=!!pe,this.hasBeenReset=!0}},line:{enumerable:!0,get:function(){return G},set:function(pe){if(typeof pe!="number"&&pe!==A)throw new SyntaxError("Line: an invalid number or illegal string was specified.");G=pe,this.hasBeenReset=!0}},lineAlign:{enumerable:!0,get:function(){return Ce},set:function(pe){var y=O(pe);y?(Ce=y,this.hasBeenReset=!0):J.warn("lineAlign: an invalid or illegal string was specified.")}},position:{enumerable:!0,get:function(){return Le},set:function(pe){if(pe<0||pe>100)throw new Error("Position must be between 0 and 100.");Le=pe,this.hasBeenReset=!0}},positionAlign:{enumerable:!0,get:function(){return we},set:function(pe){var y=O(pe);y?(we=y,this.hasBeenReset=!0):J.warn("positionAlign: an invalid or illegal string was specified.")}},size:{enumerable:!0,get:function(){return Ne},set:function(pe){if(pe<0||pe>100)throw new Error("Size must be between 0 and 100.");Ne=pe,this.hasBeenReset=!0}},align:{enumerable:!0,get:function(){return Ze},set:function(pe){var y=O(pe);if(!y)throw new SyntaxError("align: an invalid or illegal alignment string was specified.");Ze=y,this.hasBeenReset=!0}}}),this.displayState=void 0}ce.prototype.getCueAsHTML=function(){return WebVTT.convertCueToDOMTree(window,this.text)},xe.exports=ce},13710:function(xe,ne,z){var J=z(25108),A={"":!0,up:!0};function $(O){if(typeof O!="string")return!1;var ce=A[O.toLowerCase()];return ce?O.toLowerCase():!1}function I(O){return typeof O=="number"&&O>=0&&O<=100}function te(){var O=100,ce=3,se=0,fe=100,be=0,ke=100,X="";Object.defineProperties(this,{width:{enumerable:!0,get:function(){return O},set:function(me){if(!I(me))throw new Error("Width must be between 0 and 100.");O=me}},lines:{enumerable:!0,get:function(){return ce},set:function(me){if(typeof me!="number")throw new TypeError("Lines must be set to a number.");ce=me}},regionAnchorY:{enumerable:!0,get:function(){return fe},set:function(me){if(!I(me))throw new Error("RegionAnchorX must be between 0 and 100.");fe=me}},regionAnchorX:{enumerable:!0,get:function(){return se},set:function(me){if(!I(me))throw new Error("RegionAnchorY must be between 0 and 100.");se=me}},viewportAnchorY:{enumerable:!0,get:function(){return ke},set:function(me){if(!I(me))throw new Error("ViewportAnchorY must be between 0 and 100.");ke=me}},viewportAnchorX:{enumerable:!0,get:function(){return be},set:function(me){if(!I(me))throw new Error("ViewportAnchorX must be between 0 and 100.");be=me}},scroll:{enumerable:!0,get:function(){return X},set:function(me){var ye=$(me);ye===!1?J.warn("Scroll: an invalid or illegal string was specified."):X=ye}}})}xe.exports=te},14763:function(xe){"use strict";xe.exports="data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAABUgAAsAAAAAItAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAAPgAAAFZRiV33Y21hcAAAAYQAAAEJAAAD5p42+VxnbHlmAAACkAAADwwAABdk9R/WHmhlYWQAABGcAAAAKwAAADYn8kSnaGhlYQAAEcgAAAAdAAAAJA+RCL1obXR4AAAR6AAAABMAAAC8Q44AAGxvY2EAABH8AAAAYAAAAGB7SIHGbWF4cAAAElwAAAAfAAAAIAFAAI9uYW1lAAASfAAAASUAAAIK1cf1oHBvc3QAABOkAAABfAAAAnXdFqh1eJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGR7xDiBgZWBgaWQ5RkDA8MvCM0cwxDOeI6BgYmBlZkBKwhIc01hcPjI+FGPHcRdyA4RZgQRADbZCycAAHic7dPXbcMwAEXRK1vuvffem749XAbKV3bjBA6fXsaIgMMLEWoQJaAEFKNnlELyQ4K27zib5PNF6vl8yld+TKr5kH0+cUw0xv00Hwvx2DResUyFKrV4XoMmLdp06NKjz4AhI8ZMmDJjzoIlK9Zs2LJjz4EjJ85cuHLjziPe/0UWL17mf2tqKLz/9jK9f8tXpGCoRdPKhtS0RqFkWvVQNtSKoVYNtWaoddPXEBqG2jQ9XWgZattQO4baNdSeofYNdWCoQ0MdGerYUCeGOjXUmaHODXVhqEtDXRnq2lA3hro11J2h7g31YKhHQz0Z6tlQL4Z6NdSbod4N9WGoT9MfHF6GmhnZLxyDcRMAAAB4nJ1YC1gUV5auc6urCmxEGrq6VRD6ATQP5dHPKK8GRIyoKApoEBUDAiGzGmdUfKNRM4qLZrUZdGKcGN/GZJKd0SyOWTbfbmZ2NxqzM5IxRtNZd78vwYlJdtREoO7sudVNq6PmmxmKqrqPU+eee173P80Bh39Cu9DOEY4DHZBK3i20D/QRLcfxbE5sEVtwLpZzclw4ibFIkSCJUcZ4MBpMnnzwuKNsGWBL5i3qy6kO2dVpvUpKbkAP9fq62rdeGJ+TM/7C1nbIutfuWrWk5ci4zMxxR1qW/N+9JsmCGXj9VKWhFx/6tr/nz78INDm2C9yPF/fDcxLuyKxLBZ1ZBz2QTi+RSkiH5RrDQJ/GgGQadX9m0YSURs7GpSG905Zsk41uj14yul1OtieZ7QUk5GRG/YiS7PYYPSAZNRed9sq3+bOpz00rKb7pe/ZEZvbALxZAHT3AFoH8GXP3rt67QFn40kt8W13FjLTDb48c+fSi5/7h0P4dL5yz7DPtbmgmYxfQA9RL2+EOfTcvdp+1vmuBpvOll1As1S6ak0IvJzC7sKWJFtJgBd2uWcg+0Zyg7dzQfhcjXRgXGZRf5/a4A58IDU777Nl252AUk4m2ByRRjqTNqIDCEJeAnU3iCFwrkrNwXEzg4yFevBwypzxkcX+AIfk3VEKl3XmWbT8788SzvpvFJaiOezL6QyuSr9VNf97csNu0z3LuhR0wATUxZAfVBwVOy+nQFhxYdWaXlXe4HC4zWGWzzsrLDtmhI9pOWOHv7PTT7XybH1Z0+v2d5Abd3kmG+TsH23CS/KwTxx/JkzEwx6jcQOUc42LLwHJ/J93uZ9ygh3HuZGwqsY9dWDHQ58dxNqyqKRQTYdxwTubiOSs3FiMDkq0WSZQgCT0GBDOg2lxOAd1FlPVGs4AKBAcYHHaP2wPkHaivmLF5zYqnIZrvcHx5gN4k/6tchNW1DtdgNL2KrxEkS/kfnIHoVnp1VjmjpTf5r0lTzLj0mdS28tX+XGorU364eMPmnWVl8J36nlKGw3CZhjEiuMw8h8mKvhGD+4/lElBWjAhLJMg6fTw4zPZ8cOmcGQBm2Qxml1nAm13CpYGq1JKUlJJUzQn1PTAO0mgv6VMMpA/DuRfSWEu4lDIxdbAtdWIKvnn2Vk766CWfz9fpY0sH/UpdP50rfszaVpdVRmvIejEdLMk45s4Bu0EWHjeOySmFyZSiMahvZdNSn29peoI/YexYfKQTLeurTXXwEVLeSfInTWHkkMaeUx7sBvOCSTSj3AlcKjfueyS36tCrXDlgRtF0etFq9jhc1kfKuBT/OwMr0F4UUTTh1AN0g20+H/ScPcsIEsYu9d/zN5PmjprPtNwI1ZZcDK6iC97Mcjp2y2aX36f+QbpGHrgRuHlXJ+Zf6PFRL2uQSp8vxHeF2IoRb8Rd2rhMzsNxSRmEuKK4JFnkojhMcx6jzqHzGMGFcW+MhBj0bhf6cowN+45I4LHvwT6fteu7M42wGRI/pxcg6/MZdEvt1U1XaulHFXuLmqov/MukvRVL35/b3ODM1+4aPjtzeK7zmUkV2h3DN54HaQ9GzJvxHRb6Ks2gB81fwqraT+A7GvZJrRLRofU6G0urNL+zFw3v0FaVDFxsKEZW56F31r6ip6vOL+FCObBPuIMRiXld9RaMdLzRIOGhPey2T9vA/35DmZPK9IWaT9d/WgOGMieYqJ/dzjLIhZU118gbysxrNUGefxD6UO/hyNNllpFTOIbx32kSFQctnweV5PxTMHLjRqiAN+fQE9gL+Xy5WB6MOS4GJJuYbDUHhcKDhHGRbLzOpjsjdM1+iwAZLGeieehACX2hhI7SjK/ZUTNrvVje31TxJiFBGYViWFkCn9PMeX9fS6qVbzfCj4fOCTzDnuWy2c4xA7mdNkA3RS9FH2VeqzdCBlixxbzXjvkHU1I8BOYFb1pZvPIHSSIj4svT8xpzcxtXN+ZKyjdDvbz08niiF3PqV9Tn5NST8vg48MTaY8E5xqSSIsWoWHo+LtAzxdH/GDUyp37CBEYfso04F/NlMTcDJUTpECLY0HFGQHImE8xsEUdgnrQlixIvGhJA1BvxpDHGxEMBYFeNOHcBJlSjwe2JcSfbBEsGOPPBHg/6SBBOCsLLw0SpUxod0Z1bFMfLkbQ3UiZxEyd0Dx8t+SRBu18Q9msFbI4e3p1THEfkSEh7kEJ5orR10qTWDvbgPWn5aWvCYyOAjwgXyjJi34uMjo58L25cmRAeQZWI2PA1QQLsPESAH8WGFwZZ4SPoR73BHPzIPMJj9AreBzKUmrH4todT18ANvi1oc3YGjUT/0j+ExUwq8PI9BLaCQIpvewwYu2evAG/Vo/5avPdY7o+BemLLXw3y+AdkzP9bpIxB1wm5EYq8fesHbPEPtm6HrHvtx4jcGPR8fDDpkZBefIjB46QnlUNRltv4Z/pO/J6dxEjhYAtmoMeq+GozvUVvNYOW3m6GCIhoprcfr97B8AcIQYsfD8ljUvGNjvkrpj0ETA48ZMIxCeqsRIsQALE0gi2GB+glSOfbOjW3GSBM9yPq8/rpJXrJDz0BPxV6xdN4uiCGDQed3WhgFkBUZEFsmeyyBpzXrm7UGTBZG8Lh5aubFufk5eUsbrrFGr7McYdbltxa0nKYqRKbQjvikXYkTGM0f2xuyM3Ly21oXnWfvf6I1BmZwfh7EWWIYsg2nHhsDhOnczhJcmI6eBAmy3jZ3RiJmKQR/JA99FcwsfaVbNDDyi1rL9NPj9hfo61wjM6BjzOLijLpeTgk/pL+ip6tfYWupzeOgPny2tcUu9J/9mhxJlgyi985NFRbvCVewXUNXLJaW0RxZqtRYtnfYdcYomXQWdnJHQA3jiEEkeTQWcWxdDP9IvvVWvo2TK553XEMEq+s69/QDU1Q7p0zxwsm9qS379whr8NI2PJqLUyGyfNeX3eFfnJU2U+uHR9cVV1IqgurqwuV44XVp0h2qN55X5XJwtk59yP0IZuHrqBOBIuIYhkcoT6Kx79Pu2HS/IPZIMOqLWs/pteOOk4NPgEb6QAIdAPsyZk5Mwd+wVaHMexJv719W7xCu2l37UG6lvYdBcvHa08p89741zd63phTRGqL5ggo6SlvdbWXzCqsPq78NnSu7wnKy2HNZbVoRCI7UJEOyRj+sPE002tOOY7Qa5fXboFWkLNeqYUSZRocp9XwSUZxcQZ9Hw6LV2pOoVmvHQEDbGIENEG5i6bLgMSM4n8+FNLTtAds99DaWEvgcf4o5SyYe9x+kF6/tGoTPAdRmS/XQIEy//QxKC2oqioAI3tS5auvxCtzT6y6RK8fhChYcwCJaMJhxc0vqSxQ/qmgsrKAlBZUHlauheTpvd9uj5DnLzJct6qfq5fXbYHVIGcfrIVJihbaVLu1wW7Vbs8zK0A8e9Jvb91S9cVMjPrazD6gpfeZTXzYbCFMcppVRsGMpp55OWgx1/3JeAxW1Y7AORgM/m3rWrsdLkQVmEVSU16cX/e7uvkvpqRiQsG06XJ0t64Tf+l0nG1dt025gyOIZlvq5u9KSU1N2TW/rsWnnMRPyTDkctbhvIcNvYIXWyLzdwYLoYesUbaQG4iK2cWO2gdpeUYLqDD0MUTOPhDIGnZEs58yArR86FznuWEsU4YDi2x26dA4klkn8Qa6vhk2QUfX4Jxm/ngX9r7ogn1dmlmwqZmuhxtdg9XN/DEcUgqb+9hMyNansfaQET2mcROCmGEMVqxm5u+h6kN2MOwgqykV2wH9yQG9DvVFU38Pogaf4FVuE62KI/oJ02RDdWW2w5dqQwU/8+N1q1DlvsL863u61KLE7x/o8w0VJQM/Y/SQ3unIrqxueEa1BqT5VFNsO7p39/UC771a77RowpaKe9nvJQIT1Pog5LGx8XblBKmCNGTf3xMogAQvPnz9PYKX/08sVDTG1OKUlOLUgS/UaZtm1NAaYTsl7i9ZQ+L6O4Rl0OGa577LuWvc+C+x96/vYh0lLBuM+7XwI/dTLtdT7v4d6rRTWDnku0IBrqFnZ5bVIqKP8lasJlithWnaLhTsr8qFJBulF/70p4undou36HeTJ5+jv1fCybeQ8nH3+Xv6aENczmOFlab+hqMDg1rLOt12A+tiUFrYDwQ6c3RUJp601nzegTNX6WlYAI2zSUV945F6zU56ZmZVQaWspWcIADxJ9GmljQUnL2p2Dpr5T8H+5KJFu+vqBq8qvyHRzStLHPEO5SPYCV9nZe0yZT2RcH0oHvegSzNEJ0oGWU8iQWM12dgPEugngVceGIwZgPFp0BiT1a0a3R5Rcot7ihfA1J/20v96jX7zmTX9s583H0kwx6WnLd09cXrR9LGroOa9sHNbdyz8wcKk5lqhaVFJZNwmqtw884MXNdvJujpBa3xzuSaZH9sxa06Z7x+HJSduPbdYHv/DgmEhfbehvlmGN7JUkcG78GDM12CeyFFTPNqVeNxC1gzjz+c2nVo63Xxs8rKJWXoBJM0tmEbfGm4qzpoOH3xpzQfyxLzW1gnE9NHo6tol1eMEic4ZVPrjnVi0kqAe2sQ2bgqupScaq8WGlUWgWHI51SKJl/UYT6zccNsCSkBtiVZLsiefuFSDYT3Fi8Zk7EUnmjTRYtsFeuDDJS05MW79M3mr3mla+d8dzac31KTPmBYfFiYSUef48PhPjm9ryZsSGZZkdNvzq0Y9rdNcwDq5Dg5C3QW+7UN64IKptvS3tvHbvu5c9pv1Exau21rc9LIpwpQwUjTq8576yeVDz5+4WZ1nXT43wV60rPLJbDp/UksNrP3iQ2SA63Pst058gOYDbhRnRUw8l/sRt4HbxPzO4WYpInCpuVgSbVh6JXuwnnJngKTTCwaPWmG5Xbhpm1U0Yt3FyBGpGYemPM77p2TD904JjgJ2QFpFLeYpGx8X15Qx1Zk31p5ki9ZLUuXE0lmuJlcakJMVLeFS1iIvrB8drY0aloilakqCZwzwRORtxlgwxS4IThggJd4TDxoiaAIT80fFPGrCPPru+puFn504P/ybr4ihA/6dKASLshEJic7xE8tmzu3KzA7TABBe8y5fNbWo3ilQn/SuFKM16b2l5bOeayqfGhYmhIulU+fVNDdWVv4NMzX10MBHyPR5uhWUu8D9P1VnIMt4nGNgZGBgAOJ/1bf64vltvjJwszOAwAOlmqvINEc/WJyDgQlEAQA+dgnjAHicY2BkYGBnAAGOPgaG//85+hkYGVCBPgBGJwNkAAAAeJxjYGBgYB/EmKMPtxwAhg4B0gAAAAAAAA4AaAB+AMwA4AECAUIBbAGYAe4CLgKKAtAC/ANiA4wDqAPgBDAEsATaBQgFWgXABggGLgZwBqwG9gdOB4oH0ggqCHAIhgicCMgJJAlWCYgJrAnyCkAKdgrkC7J4nGNgZGBg0GdoZmBnAAEmIOYCQgaG/2A+AwAaqwHQAHicXZBNaoNAGIZfE5PQCKFQ2lUps2oXBfOzzAESyDKBQJdGR2NQR3QSSE/QE/QEPUUPUHqsvsrXjTMw83zPvPMNCuAWP3DQDAejdm1GjzwS7pMmwi75XngAD4/CQ/oX4TFe4Qt7uMMbOzjuDc0EmXCP/C7cJ38Iu+RP4QEe8CU8pP8WHmOPX2EPz87TPo202ey2OjlnQSXV/6arOjWFmvszMWtd6CqwOlKHq6ovycLaWMWVydXKFFZnmVFlZU46tP7R2nI5ncbi/dDkfDtFBA2DDXbYkhKc+V0Bqs5Zt9JM1HQGBRTm/EezTmZNKtpcAMs9Yu6AK9caF76zoLWIWcfMGOSkVduvSWechqZsz040Ib2PY3urxBJTzriT95lipz+TN1fmAAAAeJxtkXlT2zAQxf1C4thJAwRajt4HRy8VMwwfSJHXsQZZcnUQ+PYoTtwpM+wf2t9brWZ2n5JBsol58nJcYYAdDDFCijEy5JhgileYYRd72MccBzjEa7zBEY5xglO8xTu8xwd8xCd8xhd8xTec4RwXuMR3/MBP/MJvMPzBFYpk2Cr+OF0fTEgrFI1aHhxN740KDbEmeJpsWZlVj40s+45aLuv9KijlhCXSjLQnu/d/4UH6sWul1mRzFxZeekUuE7z10mg3qMtM1FGQddPSrLQyvJR6OaukItYXDp6pCJrmz0umqkau5pZ2hFmm7m+ImG5W2t0kZoJXUtPhVnYTbbdOBdeCVGqpJe7XKTqSbRK7zbdwXfR0U+SVsStuS3Y76em6+Ic3xYiHUppc04Nn0lMzay3dSxNcp8auDlWlaCi48yetFD7Y9USsx87G45cuop1ZxQUtjLnL4j53FO0a+5X08UXqQ7NQNo92R0XOz7sxWEnxN2TneJI8Acttu4Q="},25893:function(){},10434:function(xe){function ne(){return xe.exports=ne=Object.assign?Object.assign.bind():function(z){for(var J=1;J<arguments.length;J++){var A=arguments[J];for(var $ in A)Object.prototype.hasOwnProperty.call(A,$)&&(z[$]=A[$])}return z},xe.exports.__esModule=!0,xe.exports.default=xe.exports,ne.apply(this,arguments)}xe.exports=ne,xe.exports.__esModule=!0,xe.exports.default=xe.exports}}]);

//# sourceMappingURL=827.3ed586590dafd13a8ca0.js.map