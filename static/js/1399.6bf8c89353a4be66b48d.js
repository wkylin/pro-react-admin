"use strict";(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[1399],{3958:function(mt,rt,B){B.d(rt,{S:function(){return J}});const f=[];for(let k=0;k<256;++k)f.push((k+256).toString(16).slice(1));function J(k,R=0){return f[k[R+0]]+f[k[R+1]]+f[k[R+2]]+f[k[R+3]]+"-"+f[k[R+4]]+f[k[R+5]]+"-"+f[k[R+6]]+f[k[R+7]]+"-"+f[k[R+8]]+f[k[R+9]]+"-"+f[k[R+10]]+f[k[R+11]]+f[k[R+12]]+f[k[R+13]]+f[k[R+14]]+f[k[R+15]]}function G(k,R=0){const q=J(k,R);if(!validate(q))throw TypeError("Stringified UUID is invalid");return q}var ht=null},41399:function(mt,rt,B){B.d(rt,{diagram:function(){return Ht}});var f=B(438),J=B(45625),G=B(74812),ht=B(33771),k=B(3958),R=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function q(t){return typeof t=="string"&&R.test(t)}var gt=q;function kt(t){if(!gt(t))throw TypeError("Invalid UUID");let r;const e=new Uint8Array(16);return e[0]=(r=parseInt(t.slice(0,8),16))>>>24,e[1]=r>>>16&255,e[2]=r>>>8&255,e[3]=r&255,e[4]=(r=parseInt(t.slice(9,13),16))>>>8,e[5]=r&255,e[6]=(r=parseInt(t.slice(14,18),16))>>>8,e[7]=r&255,e[8]=(r=parseInt(t.slice(19,23),16))>>>8,e[9]=r&255,e[10]=(r=parseInt(t.slice(24,36),16))/1099511627776&255,e[11]=r/4294967296&255,e[12]=r>>>24&255,e[13]=r>>>16&255,e[14]=r>>>8&255,e[15]=r&255,e}var xt=kt;function Rt(t){t=unescape(encodeURIComponent(t));const r=[];for(let e=0;e<t.length;++e)r.push(t.charCodeAt(e));return r}const Ot="6ba7b810-9dad-11d1-80b4-00c04fd430c8",bt="6ba7b811-9dad-11d1-80b4-00c04fd430c8";function Nt(t,r,e){function u(l,_,y,o){var h;if(typeof l=="string"&&(l=Rt(l)),typeof _=="string"&&(_=xt(_)),((h=_)===null||h===void 0?void 0:h.length)!==16)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let E=new Uint8Array(16+l.length);if(E.set(_),E.set(l,_.length),E=e(E),E[6]=E[6]&15|r,E[8]=E[8]&63|128,y){o=o||0;for(let g=0;g<16;++g)y[o+g]=E[g];return y}return(0,k.S)(E)}try{u.name=t}catch(l){}return u.DNS=Ot,u.URL=bt,u}function Tt(t,r,e,u){switch(t){case 0:return r&e^~r&u;case 1:return r^e^u;case 2:return r&e^r&u^e&u;case 3:return r^e^u}}function it(t,r){return t<<r|t>>>32-r}function At(t){const r=[1518500249,1859775393,2400959708,3395469782],e=[1732584193,4023233417,2562383102,271733878,3285377520];if(typeof t=="string"){const y=unescape(encodeURIComponent(t));t=[];for(let o=0;o<y.length;++o)t.push(y.charCodeAt(o))}else Array.isArray(t)||(t=Array.prototype.slice.call(t));t.push(128);const u=t.length/4+2,l=Math.ceil(u/16),_=new Array(l);for(let y=0;y<l;++y){const o=new Uint32Array(16);for(let h=0;h<16;++h)o[h]=t[y*64+h*4]<<24|t[y*64+h*4+1]<<16|t[y*64+h*4+2]<<8|t[y*64+h*4+3];_[y]=o}_[l-1][14]=(t.length-1)*8/Math.pow(2,32),_[l-1][14]=Math.floor(_[l-1][14]),_[l-1][15]=(t.length-1)*8&4294967295;for(let y=0;y<l;++y){const o=new Uint32Array(80);for(let p=0;p<16;++p)o[p]=_[y][p];for(let p=16;p<80;++p)o[p]=it(o[p-3]^o[p-8]^o[p-14]^o[p-16],1);let h=e[0],E=e[1],g=e[2],x=e[3],N=e[4];for(let p=0;p<80;++p){const O=Math.floor(p/20),D=it(h,5)+Tt(O,E,g,x)+N+r[O]+o[p]>>>0;N=x,x=g,g=it(E,30)>>>0,E=h,h=D}e[0]=e[0]+h>>>0,e[1]=e[1]+E>>>0,e[2]=e[2]+g>>>0,e[3]=e[3]+x>>>0,e[4]=e[4]+N>>>0}return[e[0]>>24&255,e[0]>>16&255,e[0]>>8&255,e[0]&255,e[1]>>24&255,e[1]>>16&255,e[1]>>8&255,e[1]&255,e[2]>>24&255,e[2]>>16&255,e[2]>>8&255,e[2]&255,e[3]>>24&255,e[3]>>16&255,e[3]>>8&255,e[3]&255,e[4]>>24&255,e[4]>>16&255,e[4]>>8&255,e[4]&255]}var Mt=At,vt=Nt("v5",80,Mt),jt=B(27484),Jt=B(17967),qt=B(27856),at=function(){var t=function(w,a,n,c){for(n=n||{},c=w.length;c--;n[w[c]]=a);return n},r=[6,8,10,20,22,24,26,27,28],e=[1,10],u=[1,11],l=[1,12],_=[1,13],y=[1,14],o=[1,15],h=[1,21],E=[1,22],g=[1,23],x=[1,24],N=[1,25],p=[6,8,10,13,15,18,19,20,22,24,26,27,28,41,42,43,44,45],O=[1,34],D=[27,28,46,47],K=[41,42,43,44,45],H=[17,34],Z=[1,54],v=[1,53],S=[17,34,36,38],T={trace:function(){},yy:{},symbols_:{error:2,start:3,ER_DIAGRAM:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,entityName:11,relSpec:12,":":13,role:14,BLOCK_START:15,attributes:16,BLOCK_STOP:17,SQS:18,SQE:19,title:20,title_value:21,acc_title:22,acc_title_value:23,acc_descr:24,acc_descr_value:25,acc_descr_multiline_value:26,ALPHANUM:27,ENTITY_NAME:28,attribute:29,attributeType:30,attributeName:31,attributeKeyTypeList:32,attributeComment:33,ATTRIBUTE_WORD:34,attributeKeyType:35,COMMA:36,ATTRIBUTE_KEY:37,COMMENT:38,cardinality:39,relType:40,ZERO_OR_ONE:41,ZERO_OR_MORE:42,ONE_OR_MORE:43,ONLY_ONE:44,MD_PARENT:45,NON_IDENTIFYING:46,IDENTIFYING:47,WORD:48,$accept:0,$end:1},terminals_:{2:"error",4:"ER_DIAGRAM",6:"EOF",8:"SPACE",10:"NEWLINE",13:":",15:"BLOCK_START",17:"BLOCK_STOP",18:"SQS",19:"SQE",20:"title",21:"title_value",22:"acc_title",23:"acc_title_value",24:"acc_descr",25:"acc_descr_value",26:"acc_descr_multiline_value",27:"ALPHANUM",28:"ENTITY_NAME",34:"ATTRIBUTE_WORD",36:"COMMA",37:"ATTRIBUTE_KEY",38:"COMMENT",41:"ZERO_OR_ONE",42:"ZERO_OR_MORE",43:"ONE_OR_MORE",44:"ONLY_ONE",45:"MD_PARENT",46:"NON_IDENTIFYING",47:"IDENTIFYING",48:"WORD"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,5],[9,4],[9,3],[9,1],[9,7],[9,6],[9,4],[9,2],[9,2],[9,2],[9,1],[11,1],[11,1],[16,1],[16,2],[29,2],[29,3],[29,3],[29,4],[30,1],[31,1],[32,1],[32,3],[35,1],[33,1],[12,3],[39,1],[39,1],[39,1],[39,1],[39,1],[40,1],[40,1],[14,1],[14,1],[14,1]],performAction:function(a,n,c,d,m,i,j){var s=i.length-1;switch(m){case 1:break;case 2:this.$=[];break;case 3:i[s-1].push(i[s]),this.$=i[s-1];break;case 4:case 5:this.$=i[s];break;case 6:case 7:this.$=[];break;case 8:d.addEntity(i[s-4]),d.addEntity(i[s-2]),d.addRelationship(i[s-4],i[s],i[s-2],i[s-3]);break;case 9:d.addEntity(i[s-3]),d.addAttributes(i[s-3],i[s-1]);break;case 10:d.addEntity(i[s-2]);break;case 11:d.addEntity(i[s]);break;case 12:d.addEntity(i[s-6],i[s-4]),d.addAttributes(i[s-6],i[s-1]);break;case 13:d.addEntity(i[s-5],i[s-3]);break;case 14:d.addEntity(i[s-3],i[s-1]);break;case 15:case 16:this.$=i[s].trim(),d.setAccTitle(this.$);break;case 17:case 18:this.$=i[s].trim(),d.setAccDescription(this.$);break;case 19:case 43:this.$=i[s];break;case 20:case 41:case 42:this.$=i[s].replace(/"/g,"");break;case 21:case 29:this.$=[i[s]];break;case 22:i[s].push(i[s-1]),this.$=i[s];break;case 23:this.$={attributeType:i[s-1],attributeName:i[s]};break;case 24:this.$={attributeType:i[s-2],attributeName:i[s-1],attributeKeyTypeList:i[s]};break;case 25:this.$={attributeType:i[s-2],attributeName:i[s-1],attributeComment:i[s]};break;case 26:this.$={attributeType:i[s-3],attributeName:i[s-2],attributeKeyTypeList:i[s-1],attributeComment:i[s]};break;case 27:case 28:case 31:this.$=i[s];break;case 30:i[s-2].push(i[s]),this.$=i[s-2];break;case 32:this.$=i[s].replace(/"/g,"");break;case 33:this.$={cardA:i[s],relType:i[s-1],cardB:i[s-2]};break;case 34:this.$=d.Cardinality.ZERO_OR_ONE;break;case 35:this.$=d.Cardinality.ZERO_OR_MORE;break;case 36:this.$=d.Cardinality.ONE_OR_MORE;break;case 37:this.$=d.Cardinality.ONLY_ONE;break;case 38:this.$=d.Cardinality.MD_PARENT;break;case 39:this.$=d.Identification.NON_IDENTIFYING;break;case 40:this.$=d.Identification.IDENTIFYING;break}},table:[{3:1,4:[1,2]},{1:[3]},t(r,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:9,20:e,22:u,24:l,26:_,27:y,28:o},t(r,[2,7],{1:[2,1]}),t(r,[2,3]),{9:16,11:9,20:e,22:u,24:l,26:_,27:y,28:o},t(r,[2,5]),t(r,[2,6]),t(r,[2,11],{12:17,39:20,15:[1,18],18:[1,19],41:h,42:E,43:g,44:x,45:N}),{21:[1,26]},{23:[1,27]},{25:[1,28]},t(r,[2,18]),t(p,[2,19]),t(p,[2,20]),t(r,[2,4]),{11:29,27:y,28:o},{16:30,17:[1,31],29:32,30:33,34:O},{11:35,27:y,28:o},{40:36,46:[1,37],47:[1,38]},t(D,[2,34]),t(D,[2,35]),t(D,[2,36]),t(D,[2,37]),t(D,[2,38]),t(r,[2,15]),t(r,[2,16]),t(r,[2,17]),{13:[1,39]},{17:[1,40]},t(r,[2,10]),{16:41,17:[2,21],29:32,30:33,34:O},{31:42,34:[1,43]},{34:[2,27]},{19:[1,44]},{39:45,41:h,42:E,43:g,44:x,45:N},t(K,[2,39]),t(K,[2,40]),{14:46,27:[1,49],28:[1,48],48:[1,47]},t(r,[2,9]),{17:[2,22]},t(H,[2,23],{32:50,33:51,35:52,37:Z,38:v}),t([17,34,37,38],[2,28]),t(r,[2,14],{15:[1,55]}),t([27,28],[2,33]),t(r,[2,8]),t(r,[2,41]),t(r,[2,42]),t(r,[2,43]),t(H,[2,24],{33:56,36:[1,57],38:v}),t(H,[2,25]),t(S,[2,29]),t(H,[2,32]),t(S,[2,31]),{16:58,17:[1,59],29:32,30:33,34:O},t(H,[2,26]),{35:60,37:Z},{17:[1,61]},t(r,[2,13]),t(S,[2,30]),t(r,[2,12])],defaultActions:{34:[2,27],41:[2,22]},parseError:function(a,n){if(n.recoverable)this.trace(a);else{var c=new Error(a);throw c.hash=n,c}},parse:function(a){var n=this,c=[0],d=[],m=[null],i=[],j=this.table,s="",$=0,pt=0,Vt=2,_t=1,zt=i.slice.call(arguments,1),M=Object.create(this.lexer),V={yy:{}};for(var st in this.yy)Object.prototype.hasOwnProperty.call(this.yy,st)&&(V.yy[st]=this.yy[st]);M.setInput(a,V.yy),V.yy.lexer=M,V.yy.parser=this,typeof M.yylloc=="undefined"&&(M.yylloc={});var ot=M.yylloc;i.push(ot);var Gt=M.options&&M.options.ranges;typeof V.yy.parseError=="function"?this.parseError=V.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Xt(){var W;return W=d.pop()||M.lex()||_t,typeof W!="number"&&(W instanceof Array&&(d=W,W=d.pop()),W=n.symbols_[W]||W),W}for(var I,z,L,lt,X={},tt,F,Et,et;;){if(z=c[c.length-1],this.defaultActions[z]?L=this.defaultActions[z]:((I===null||typeof I=="undefined")&&(I=Xt()),L=j[z]&&j[z][I]),typeof L=="undefined"||!L.length||!L[0]){var ct="";et=[];for(tt in j[z])this.terminals_[tt]&&tt>Vt&&et.push("'"+this.terminals_[tt]+"'");M.showPosition?ct="Parse error on line "+($+1)+`:
`+M.showPosition()+`
Expecting `+et.join(", ")+", got '"+(this.terminals_[I]||I)+"'":ct="Parse error on line "+($+1)+": Unexpected "+(I==_t?"end of input":"'"+(this.terminals_[I]||I)+"'"),this.parseError(ct,{text:M.match,token:this.terminals_[I]||I,line:M.yylineno,loc:ot,expected:et})}if(L[0]instanceof Array&&L.length>1)throw new Error("Parse Error: multiple actions possible at state: "+z+", token: "+I);switch(L[0]){case 1:c.push(I),m.push(M.yytext),i.push(M.yylloc),c.push(L[1]),I=null,pt=M.yyleng,s=M.yytext,$=M.yylineno,ot=M.yylloc;break;case 2:if(F=this.productions_[L[1]][1],X.$=m[m.length-F],X._$={first_line:i[i.length-(F||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(F||1)].first_column,last_column:i[i.length-1].last_column},Gt&&(X._$.range=[i[i.length-(F||1)].range[0],i[i.length-1].range[1]]),lt=this.performAction.apply(X,[s,pt,$,V.yy,L[1],m,i].concat(zt)),typeof lt!="undefined")return lt;F&&(c=c.slice(0,-1*F*2),m=m.slice(0,-1*F),i=i.slice(0,-1*F)),c.push(this.productions_[L[1]][0]),m.push(X.$),i.push(X._$),Et=j[c[c.length-2]][c[c.length-1]],c.push(Et);break;case 3:return!0}}return!0}},A=function(){var w={EOF:1,parseError:function(n,c){if(this.yy.parser)this.yy.parser.parseError(n,c);else throw new Error(n)},setInput:function(a,n){return this.yy=n||this.yy||{},this._input=a,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var a=this._input[0];this.yytext+=a,this.yyleng++,this.offset++,this.match+=a,this.matched+=a;var n=a.match(/(?:\r\n?|\n).*/g);return n?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),a},unput:function(a){var n=a.length,c=a.split(/(?:\r\n?|\n)/g);this._input=a+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-n),this.offset-=n;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),c.length-1&&(this.yylineno-=c.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:c?(c.length===d.length?this.yylloc.first_column:0)+d[d.length-c.length].length-c[0].length:this.yylloc.first_column-n},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-n]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(a){this.unput(this.match.slice(a))},pastInput:function(){var a=this.matched.substr(0,this.matched.length-this.match.length);return(a.length>20?"...":"")+a.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var a=this.match;return a.length<20&&(a+=this._input.substr(0,20-a.length)),(a.substr(0,20)+(a.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var a=this.pastInput(),n=new Array(a.length+1).join("-");return a+this.upcomingInput()+`
`+n+"^"},test_match:function(a,n){var c,d,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),d=a[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+a[0].length},this.yytext+=a[0],this.match+=a[0],this.matches=a,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(a[0].length),this.matched+=a[0],c=this.performAction.call(this,this.yy,this,n,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),c)return c;if(this._backtrack){for(var i in m)this[i]=m[i];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var a,n,c,d;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),i=0;i<m.length;i++)if(c=this._input.match(this.rules[m[i]]),c&&(!n||c[0].length>n[0].length)){if(n=c,d=i,this.options.backtrack_lexer){if(a=this.test_match(c,m[i]),a!==!1)return a;if(this._backtrack){n=!1;continue}else return!1}else if(!this.options.flex)break}return n?(a=this.test_match(n,m[d]),a!==!1?a:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var n=this.next();return n||this.lex()},begin:function(n){this.conditionStack.push(n)},popState:function(){var n=this.conditionStack.length-1;return n>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(n){return n=this.conditionStack.length-1-Math.abs(n||0),n>=0?this.conditionStack[n]:"INITIAL"},pushState:function(n){this.begin(n)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(n,c,d,m){switch(d){case 0:return this.begin("acc_title"),22;case 1:return this.popState(),"acc_title_value";case 2:return this.begin("acc_descr"),24;case 3:return this.popState(),"acc_descr_value";case 4:this.begin("acc_descr_multiline");break;case 5:this.popState();break;case 6:return"acc_descr_multiline_value";case 7:return 10;case 8:break;case 9:return 8;case 10:return 28;case 11:return 48;case 12:return 4;case 13:return this.begin("block"),15;case 14:return 36;case 15:break;case 16:return 37;case 17:return 34;case 18:return 34;case 19:return 38;case 20:break;case 21:return this.popState(),17;case 22:return c.yytext[0];case 23:return 18;case 24:return 19;case 25:return 41;case 26:return 43;case 27:return 43;case 28:return 43;case 29:return 41;case 30:return 41;case 31:return 42;case 32:return 42;case 33:return 42;case 34:return 42;case 35:return 42;case 36:return 43;case 37:return 42;case 38:return 43;case 39:return 44;case 40:return 44;case 41:return 44;case 42:return 44;case 43:return 41;case 44:return 42;case 45:return 43;case 46:return 45;case 47:return 46;case 48:return 47;case 49:return 47;case 50:return 46;case 51:return 46;case 52:return 46;case 53:return 27;case 54:return c.yytext[0];case 55:return 6}},rules:[/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:[\s]+)/i,/^(?:"[^"%\r\n\v\b\\]+")/i,/^(?:"[^"]*")/i,/^(?:erDiagram\b)/i,/^(?:\{)/i,/^(?:,)/i,/^(?:\s+)/i,/^(?:\b((?:PK)|(?:FK)|(?:UK))\b)/i,/^(?:(.*?)[~](.*?)*[~])/i,/^(?:[\*A-Za-z_][A-Za-z0-9\-_\[\]\(\)]*)/i,/^(?:"[^"]*")/i,/^(?:[\n]+)/i,/^(?:\})/i,/^(?:.)/i,/^(?:\[)/i,/^(?:\])/i,/^(?:one or zero\b)/i,/^(?:one or more\b)/i,/^(?:one or many\b)/i,/^(?:1\+)/i,/^(?:\|o\b)/i,/^(?:zero or one\b)/i,/^(?:zero or more\b)/i,/^(?:zero or many\b)/i,/^(?:0\+)/i,/^(?:\}o\b)/i,/^(?:many\(0\))/i,/^(?:many\(1\))/i,/^(?:many\b)/i,/^(?:\}\|)/i,/^(?:one\b)/i,/^(?:only one\b)/i,/^(?:1\b)/i,/^(?:\|\|)/i,/^(?:o\|)/i,/^(?:o\{)/i,/^(?:\|\{)/i,/^(?:\s*u\b)/i,/^(?:\.\.)/i,/^(?:--)/i,/^(?:to\b)/i,/^(?:optionally to\b)/i,/^(?:\.-)/i,/^(?:-\.)/i,/^(?:[A-Za-z_][A-Za-z0-9\-_]*)/i,/^(?:.)/i,/^(?:$)/i],conditions:{acc_descr_multiline:{rules:[5,6],inclusive:!1},acc_descr:{rules:[3],inclusive:!1},acc_title:{rules:[1],inclusive:!1},block:{rules:[14,15,16,17,18,19,20,21,22],inclusive:!1},INITIAL:{rules:[0,2,4,7,8,9,10,11,12,13,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55],inclusive:!0}}};return w}();T.lexer=A;function Y(){this.yy={}}return Y.prototype=T,T.Parser=Y,new Y}();at.parser=at;const St=at;let U={},nt=[];const wt={ZERO_OR_ONE:"ZERO_OR_ONE",ZERO_OR_MORE:"ZERO_OR_MORE",ONE_OR_MORE:"ONE_OR_MORE",ONLY_ONE:"ONLY_ONE",MD_PARENT:"MD_PARENT"},It={NON_IDENTIFYING:"NON_IDENTIFYING",IDENTIFYING:"IDENTIFYING"},dt=function(t,r=void 0){return U[t]===void 0?(U[t]={attributes:[],alias:r},f.l.info("Added new entity :",t)):U[t]&&!U[t].alias&&r&&(U[t].alias=r,f.l.info(`Add alias '${r}' to entity '${t}'`)),U[t]},Dt={Cardinality:wt,Identification:It,getConfig:()=>(0,f.c)().er,addEntity:dt,addAttributes:function(t,r){let e=dt(t),u;for(u=r.length-1;u>=0;u--)e.attributes.push(r[u]),f.l.debug("Added attribute ",r[u].attributeName)},getEntities:()=>U,addRelationship:function(t,r,e,u){let l={entityA:t,roleA:r,entityB:e,relSpec:u};nt.push(l),f.l.debug("Added new relationship :",l)},getRelationships:()=>nt,clear:function(){U={},nt=[],(0,f.t)()},setAccTitle:f.s,getAccTitle:f.g,setAccDescription:f.b,getAccDescription:f.a,setDiagramTitle:f.q,getDiagramTitle:f.r},C={ONLY_ONE_START:"ONLY_ONE_START",ONLY_ONE_END:"ONLY_ONE_END",ZERO_OR_ONE_START:"ZERO_OR_ONE_START",ZERO_OR_ONE_END:"ZERO_OR_ONE_END",ONE_OR_MORE_START:"ONE_OR_MORE_START",ONE_OR_MORE_END:"ONE_OR_MORE_END",ZERO_OR_MORE_START:"ZERO_OR_MORE_START",ZERO_OR_MORE_END:"ZERO_OR_MORE_END",MD_PARENT_END:"MD_PARENT_END",MD_PARENT_START:"MD_PARENT_START"},P={ERMarkers:C,insertMarkers:function(t,r){let e;t.append("defs").append("marker").attr("id",C.MD_PARENT_START).attr("refX",0).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),t.append("defs").append("marker").attr("id",C.MD_PARENT_END).attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),t.append("defs").append("marker").attr("id",C.ONLY_ONE_START).attr("refX",0).attr("refY",9).attr("markerWidth",18).attr("markerHeight",18).attr("orient","auto").append("path").attr("stroke",r.stroke).attr("fill","none").attr("d","M9,0 L9,18 M15,0 L15,18"),t.append("defs").append("marker").attr("id",C.ONLY_ONE_END).attr("refX",18).attr("refY",9).attr("markerWidth",18).attr("markerHeight",18).attr("orient","auto").append("path").attr("stroke",r.stroke).attr("fill","none").attr("d","M3,0 L3,18 M9,0 L9,18"),e=t.append("defs").append("marker").attr("id",C.ZERO_OR_ONE_START).attr("refX",0).attr("refY",9).attr("markerWidth",30).attr("markerHeight",18).attr("orient","auto"),e.append("circle").attr("stroke",r.stroke).attr("fill","white").attr("cx",21).attr("cy",9).attr("r",6),e.append("path").attr("stroke",r.stroke).attr("fill","none").attr("d","M9,0 L9,18"),e=t.append("defs").append("marker").attr("id",C.ZERO_OR_ONE_END).attr("refX",30).attr("refY",9).attr("markerWidth",30).attr("markerHeight",18).attr("orient","auto"),e.append("circle").attr("stroke",r.stroke).attr("fill","white").attr("cx",9).attr("cy",9).attr("r",6),e.append("path").attr("stroke",r.stroke).attr("fill","none").attr("d","M21,0 L21,18"),t.append("defs").append("marker").attr("id",C.ONE_OR_MORE_START).attr("refX",18).attr("refY",18).attr("markerWidth",45).attr("markerHeight",36).attr("orient","auto").append("path").attr("stroke",r.stroke).attr("fill","none").attr("d","M0,18 Q 18,0 36,18 Q 18,36 0,18 M42,9 L42,27"),t.append("defs").append("marker").attr("id",C.ONE_OR_MORE_END).attr("refX",27).attr("refY",18).attr("markerWidth",45).attr("markerHeight",36).attr("orient","auto").append("path").attr("stroke",r.stroke).attr("fill","none").attr("d","M3,9 L3,27 M9,18 Q27,0 45,18 Q27,36 9,18"),e=t.append("defs").append("marker").attr("id",C.ZERO_OR_MORE_START).attr("refX",18).attr("refY",18).attr("markerWidth",57).attr("markerHeight",36).attr("orient","auto"),e.append("circle").attr("stroke",r.stroke).attr("fill","white").attr("cx",48).attr("cy",18).attr("r",6),e.append("path").attr("stroke",r.stroke).attr("fill","none").attr("d","M0,18 Q18,0 36,18 Q18,36 0,18"),e=t.append("defs").append("marker").attr("id",C.ZERO_OR_MORE_END).attr("refX",39).attr("refY",18).attr("markerWidth",57).attr("markerHeight",36).attr("orient","auto"),e.append("circle").attr("stroke",r.stroke).attr("fill","white").attr("cx",9).attr("cy",18).attr("r",6),e.append("path").attr("stroke",r.stroke).attr("fill","none").attr("d","M21,18 Q39,0 57,18 Q39,36 21,18")}},Lt=/[^\dA-Za-z](\W)*/g;let b={},Q=new Map;const Bt=function(t){const r=Object.keys(t);for(const e of r)b[e]=t[e]},Ct=(t,r,e)=>{const u=b.entityPadding/3,l=b.entityPadding/3,_=b.fontSize*.85,y=r.node().getBBox(),o=[];let h=!1,E=!1,g=0,x=0,N=0,p=0,O=y.height+u*2,D=1;e.forEach(v=>{v.attributeKeyTypeList!==void 0&&v.attributeKeyTypeList.length>0&&(h=!0),v.attributeComment!==void 0&&(E=!0)}),e.forEach(v=>{const S=`${r.node().id}-attr-${D}`;let T=0;const A=(0,f.v)(v.attributeType),Y=t.append("text").classed("er entityLabel",!0).attr("id",`${S}-type`).attr("x",0).attr("y",0).style("dominant-baseline","middle").style("text-anchor","left").style("font-family",(0,f.c)().fontFamily).style("font-size",_+"px").text(A),w=t.append("text").classed("er entityLabel",!0).attr("id",`${S}-name`).attr("x",0).attr("y",0).style("dominant-baseline","middle").style("text-anchor","left").style("font-family",(0,f.c)().fontFamily).style("font-size",_+"px").text(v.attributeName),a={};a.tn=Y,a.nn=w;const n=Y.node().getBBox(),c=w.node().getBBox();if(g=Math.max(g,n.width),x=Math.max(x,c.width),T=Math.max(n.height,c.height),h){const d=v.attributeKeyTypeList!==void 0?v.attributeKeyTypeList.join(","):"",m=t.append("text").classed("er entityLabel",!0).attr("id",`${S}-key`).attr("x",0).attr("y",0).style("dominant-baseline","middle").style("text-anchor","left").style("font-family",(0,f.c)().fontFamily).style("font-size",_+"px").text(d);a.kn=m;const i=m.node().getBBox();N=Math.max(N,i.width),T=Math.max(T,i.height)}if(E){const d=t.append("text").classed("er entityLabel",!0).attr("id",`${S}-comment`).attr("x",0).attr("y",0).style("dominant-baseline","middle").style("text-anchor","left").style("font-family",(0,f.c)().fontFamily).style("font-size",_+"px").text(v.attributeComment||"");a.cn=d;const m=d.node().getBBox();p=Math.max(p,m.width),T=Math.max(T,m.height)}a.height=T,o.push(a),O+=T+u*2,D+=1});let K=4;h&&(K+=2),E&&(K+=2);const H=g+x+N+p,Z={width:Math.max(b.minEntityWidth,Math.max(y.width+b.entityPadding*2,H+l*K)),height:e.length>0?O:Math.max(b.minEntityHeight,y.height+b.entityPadding*2)};if(e.length>0){const v=Math.max(0,(Z.width-H-l*K)/(K/2));r.attr("transform","translate("+Z.width/2+","+(u+y.height/2)+")");let S=y.height+u*2,T="attributeBoxOdd";o.forEach(A=>{const Y=S+u+A.height/2;A.tn.attr("transform","translate("+l+","+Y+")");const w=t.insert("rect","#"+A.tn.node().id).classed(`er ${T}`,!0).attr("x",0).attr("y",S).attr("width",g+l*2+v).attr("height",A.height+u*2),a=parseFloat(w.attr("x"))+parseFloat(w.attr("width"));A.nn.attr("transform","translate("+(a+l)+","+Y+")");const n=t.insert("rect","#"+A.nn.node().id).classed(`er ${T}`,!0).attr("x",a).attr("y",S).attr("width",x+l*2+v).attr("height",A.height+u*2);let c=parseFloat(n.attr("x"))+parseFloat(n.attr("width"));if(h){A.kn.attr("transform","translate("+(c+l)+","+Y+")");const d=t.insert("rect","#"+A.kn.node().id).classed(`er ${T}`,!0).attr("x",c).attr("y",S).attr("width",N+l*2+v).attr("height",A.height+u*2);c=parseFloat(d.attr("x"))+parseFloat(d.attr("width"))}E&&(A.cn.attr("transform","translate("+(c+l)+","+Y+")"),t.insert("rect","#"+A.cn.node().id).classed(`er ${T}`,"true").attr("x",c).attr("y",S).attr("width",p+l*2+v).attr("height",A.height+u*2)),S+=A.height+u*2,T=T==="attributeBoxOdd"?"attributeBoxEven":"attributeBoxOdd"})}else Z.height=Math.max(b.minEntityHeight,O),r.attr("transform","translate("+Z.width/2+","+Z.height/2+")");return Z},Pt=function(t,r,e){const u=Object.keys(r);let l;return u.forEach(function(_){var O;const y=Kt(_,"entity");Q.set(_,y);const o=t.append("g").attr("id",y);l=l===void 0?y:l;const h="text-"+y,E=o.append("text").classed("er entityLabel",!0).attr("id",h).attr("x",0).attr("y",0).style("dominant-baseline","middle").style("text-anchor","middle").style("font-family",(0,f.c)().fontFamily).style("font-size",b.fontSize+"px").text((O=r[_].alias)!=null?O:_),{width:g,height:x}=Ct(o,E,r[_].attributes),p=o.insert("rect","#"+h).classed("er entityBox",!0).attr("x",0).attr("y",0).attr("width",g).attr("height",x).node().getBBox();e.setNode(y,{width:p.width,height:p.height,shape:"rect",id:y})}),l},Yt=function(t,r){r.nodes().forEach(function(e){e!==void 0&&r.node(e)!==void 0&&t.select("#"+e).attr("transform","translate("+(r.node(e).x-r.node(e).width/2)+","+(r.node(e).y-r.node(e).height/2)+" )")})},ut=function(t){return(t.entityA+t.roleA+t.entityB).replace(/\s/g,"")},Zt=function(t,r){return t.forEach(function(e){r.setEdge(Q.get(e.entityA),Q.get(e.entityB),{relationship:e},ut(e))}),t};let ft=0;const Ft=function(t,r,e,u,l){ft++;const _=e.edge(Q.get(r.entityA),Q.get(r.entityB),ut(r)),y=(0,G.jvg)().x(function(O){return O.x}).y(function(O){return O.y}).curve(G.$0Z),o=t.insert("path","#"+u).classed("er relationshipLine",!0).attr("d",y(_.points)).style("stroke",b.stroke).style("fill","none");r.relSpec.relType===l.db.Identification.NON_IDENTIFYING&&o.attr("stroke-dasharray","8,8");let h="";switch(b.arrowMarkerAbsolute&&(h=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,h=h.replace(/\(/g,"\\("),h=h.replace(/\)/g,"\\)")),r.relSpec.cardA){case l.db.Cardinality.ZERO_OR_ONE:o.attr("marker-end","url("+h+"#"+P.ERMarkers.ZERO_OR_ONE_END+")");break;case l.db.Cardinality.ZERO_OR_MORE:o.attr("marker-end","url("+h+"#"+P.ERMarkers.ZERO_OR_MORE_END+")");break;case l.db.Cardinality.ONE_OR_MORE:o.attr("marker-end","url("+h+"#"+P.ERMarkers.ONE_OR_MORE_END+")");break;case l.db.Cardinality.ONLY_ONE:o.attr("marker-end","url("+h+"#"+P.ERMarkers.ONLY_ONE_END+")");break;case l.db.Cardinality.MD_PARENT:o.attr("marker-end","url("+h+"#"+P.ERMarkers.MD_PARENT_END+")");break}switch(r.relSpec.cardB){case l.db.Cardinality.ZERO_OR_ONE:o.attr("marker-start","url("+h+"#"+P.ERMarkers.ZERO_OR_ONE_START+")");break;case l.db.Cardinality.ZERO_OR_MORE:o.attr("marker-start","url("+h+"#"+P.ERMarkers.ZERO_OR_MORE_START+")");break;case l.db.Cardinality.ONE_OR_MORE:o.attr("marker-start","url("+h+"#"+P.ERMarkers.ONE_OR_MORE_START+")");break;case l.db.Cardinality.ONLY_ONE:o.attr("marker-start","url("+h+"#"+P.ERMarkers.ONLY_ONE_START+")");break;case l.db.Cardinality.MD_PARENT:o.attr("marker-start","url("+h+"#"+P.ERMarkers.MD_PARENT_START+")");break}const E=o.node().getTotalLength(),g=o.node().getPointAtLength(E*.5),x="rel"+ft,p=t.append("text").classed("er relationshipLabel",!0).attr("id",x).attr("x",g.x).attr("y",g.y).style("text-anchor","middle").style("dominant-baseline","middle").style("font-family",(0,f.c)().fontFamily).style("font-size",b.fontSize+"px").text(r.roleA).node().getBBox();t.insert("rect","#"+x).classed("er relationshipLabelBox",!0).attr("x",g.x-p.width/2).attr("y",g.y-p.height/2).attr("width",p.width).attr("height",p.height)},Wt=function(t,r,e,u){b=(0,f.c)().er,f.l.info("Drawing ER diagram");const l=(0,f.c)().securityLevel;let _;l==="sandbox"&&(_=(0,G.Ys)("#i"+r));const o=(l==="sandbox"?(0,G.Ys)(_.nodes()[0].contentDocument.body):(0,G.Ys)("body")).select(`[id='${r}']`);P.insertMarkers(o,b);let h;h=new J.k({multigraph:!0,directed:!0,compound:!1}).setGraph({rankdir:b.layoutDirection,marginx:20,marginy:20,nodesep:100,edgesep:100,ranksep:100}).setDefaultEdgeLabel(function(){return{}});const E=Pt(o,u.db.getEntities(),h),g=Zt(u.db.getRelationships(),h);(0,ht.bK)(h),Yt(o,h),g.forEach(function(D){Ft(o,D,h,E,u)});const x=b.diagramPadding;f.u.insertTitle(o,"entityTitleText",b.titleTopMargin,u.db.getDiagramTitle());const N=o.node().getBBox(),p=N.width+x*2,O=N.height+x*2;(0,f.i)(o,O,p,b.useMaxWidth),o.attr("viewBox",`${N.x-x} ${N.y-x} ${p} ${O}`)},Ut="28e9f9db-3c8d-5aa5-9faf-44286ae5937c";function Kt(t="",r=""){const e=t.replace(Lt,"");return`${yt(r)}${yt(e)}${vt(t,Ut)}`}function yt(t=""){return t.length>0?`${t}-`:""}const Ht={parser:St,db:Dt,renderer:{setConf:Bt,draw:Wt},styles:t=>`
  .entityBox {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
  }

  .attributeBoxOdd {
    fill: ${t.attributeBackgroundColorOdd};
    stroke: ${t.nodeBorder};
  }

  .attributeBoxEven {
    fill:  ${t.attributeBackgroundColorEven};
    stroke: ${t.nodeBorder};
  }

  .relationshipLabelBox {
    fill: ${t.tertiaryColor};
    opacity: 0.7;
    background-color: ${t.tertiaryColor};
      rect {
        opacity: 0.5;
      }
  }

    .relationshipLine {
      stroke: ${t.lineColor};
    }

  .entityTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor};
  }    
  #MD_PARENT_START {
    fill: #f5f5f5 !important;
    stroke: ${t.lineColor} !important;
    stroke-width: 1;
  }
  #MD_PARENT_END {
    fill: #f5f5f5 !important;
    stroke: ${t.lineColor} !important;
    stroke-width: 1;
  }
  
`}}}]);

//# sourceMappingURL=1399.6bf8c89353a4be66b48d.js.map