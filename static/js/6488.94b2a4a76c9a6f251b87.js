"use strict";(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[6488],{66488:function(Jt,_t,V){V.d(_t,{diagram:function(){return Zt}});var T=V(438),U=V(74812);function at(t,i){let s;if(i===void 0)for(const a of t)a!=null&&(s>a||s===void 0&&a>=a)&&(s=a);else{let a=-1;for(let u of t)(u=i(u,++a,t))!=null&&(s>u||s===void 0&&u>=u)&&(s=u)}return s}function xt(t){return t.target.depth}function vt(t){return t.depth}function bt(t,i){return i-1-t.height}function ct(t,i){return t.sourceLinks.length?t.depth:i-1}function wt(t){return t.targetLinks.length?t.depth:t.sourceLinks.length?at(t.sourceLinks,xt)-1:0}function q(t,i){let s=0;if(i===void 0)for(let a of t)(a=+a)&&(s+=a);else{let a=-1;for(let u of t)(u=+i(u,++a,t))&&(s+=u)}return s}function ut(t,i){let s;if(i===void 0)for(const a of t)a!=null&&(s<a||s===void 0&&a>=a)&&(s=a);else{let a=-1;for(let u of t)(u=i(u,++a,t))!=null&&(s<u||s===void 0&&u>=u)&&(s=u)}return s}function K(t){return function(){return t}}function ht(t,i){return X(t.source,i.source)||t.index-i.index}function ft(t,i){return X(t.target,i.target)||t.index-i.index}function X(t,i){return t.y0-i.y0}function tt(t){return t.value}function St(t){return t.index}function Lt(t){return t.nodes}function Et(t){return t.links}function yt(t,i){const s=t.get(i);if(!s)throw new Error("missing: "+i);return s}function dt({nodes:t}){for(const i of t){let s=i.y0,a=s;for(const u of i.sourceLinks)u.y0=s+u.width/2,s+=u.width;for(const u of i.targetLinks)u.y1=a+u.width/2,a+=u.width}}function At(){let t=0,i=0,s=1,a=1,u=24,m=8,y,p=St,r=ct,l,h,g=Lt,v=Et,d=6;function _(){const n={nodes:g.apply(null,arguments),links:v.apply(null,arguments)};return E(n),L(n),A(n),C(n),b(n),dt(n),n}_.update=function(n){return dt(n),n},_.nodeId=function(n){return arguments.length?(p=typeof n=="function"?n:K(n),_):p},_.nodeAlign=function(n){return arguments.length?(r=typeof n=="function"?n:K(n),_):r},_.nodeSort=function(n){return arguments.length?(l=n,_):l},_.nodeWidth=function(n){return arguments.length?(u=+n,_):u},_.nodePadding=function(n){return arguments.length?(m=y=+n,_):m},_.nodes=function(n){return arguments.length?(g=typeof n=="function"?n:K(n),_):g},_.links=function(n){return arguments.length?(v=typeof n=="function"?n:K(n),_):v},_.linkSort=function(n){return arguments.length?(h=n,_):h},_.size=function(n){return arguments.length?(t=i=0,s=+n[0],a=+n[1],_):[s-t,a-i]},_.extent=function(n){return arguments.length?(t=+n[0][0],s=+n[1][0],i=+n[0][1],a=+n[1][1],_):[[t,i],[s,a]]},_.iterations=function(n){return arguments.length?(d=+n,_):d};function E({nodes:n,links:f}){for(const[c,o]of n.entries())o.index=c,o.sourceLinks=[],o.targetLinks=[];const e=new Map(n.map((c,o)=>[p(c,o,n),c]));for(const[c,o]of f.entries()){o.index=c;let{source:k,target:x}=o;typeof k!="object"&&(k=o.source=yt(e,k)),typeof x!="object"&&(x=o.target=yt(e,x)),k.sourceLinks.push(o),x.targetLinks.push(o)}if(h!=null)for(const{sourceLinks:c,targetLinks:o}of n)c.sort(h),o.sort(h)}function L({nodes:n}){for(const f of n)f.value=f.fixedValue===void 0?Math.max(q(f.sourceLinks,tt),q(f.targetLinks,tt)):f.fixedValue}function A({nodes:n}){const f=n.length;let e=new Set(n),c=new Set,o=0;for(;e.size;){for(const k of e){k.depth=o;for(const{target:x}of k.sourceLinks)c.add(x)}if(++o>f)throw new Error("circular link");e=c,c=new Set}}function C({nodes:n}){const f=n.length;let e=new Set(n),c=new Set,o=0;for(;e.size;){for(const k of e){k.height=o;for(const{source:x}of k.targetLinks)c.add(x)}if(++o>f)throw new Error("circular link");e=c,c=new Set}}function P({nodes:n}){const f=ut(n,o=>o.depth)+1,e=(s-t-u)/(f-1),c=new Array(f);for(const o of n){const k=Math.max(0,Math.min(f-1,Math.floor(r.call(null,o,f))));o.layer=k,o.x0=t+k*e,o.x1=o.x0+u,c[k]?c[k].push(o):c[k]=[o]}if(l)for(const o of c)o.sort(l);return c}function D(n){const f=at(n,e=>(a-i-(e.length-1)*y)/q(e,tt));for(const e of n){let c=i;for(const o of e){o.y0=c,o.y1=c+o.value*f,c=o.y1+y;for(const k of o.sourceLinks)k.width=k.value*f}c=(a-c+y)/(e.length+1);for(let o=0;o<e.length;++o){const k=e[o];k.y0+=c*(o+1),k.y1+=c*(o+1)}M(e)}}function b(n){const f=P(n);y=Math.min(m,(a-i)/(ut(f,e=>e.length)-1)),D(f);for(let e=0;e<d;++e){const c=Math.pow(.99,e),o=Math.max(1-c,(e+1)/d);z(f,c,o),N(f,c,o)}}function N(n,f,e){for(let c=1,o=n.length;c<o;++c){const k=n[c];for(const x of k){let F=0,B=0;for(const{source:G,value:ot}of x.targetLinks){let H=ot*(x.layer-G.layer);F+=S(G,x)*H,B+=H}if(!(B>0))continue;let W=(F/B-x.y0)*f;x.y0+=W,x.y1+=W,w(x)}l===void 0&&k.sort(X),I(k,e)}}function z(n,f,e){for(let c=n.length,o=c-2;o>=0;--o){const k=n[o];for(const x of k){let F=0,B=0;for(const{target:G,value:ot}of x.sourceLinks){let H=ot*(G.layer-x.layer);F+=$(x,G)*H,B+=H}if(!(B>0))continue;let W=(F/B-x.y0)*f;x.y0+=W,x.y1+=W,w(x)}l===void 0&&k.sort(X),I(k,e)}}function I(n,f){const e=n.length>>1,c=n[e];R(n,c.y0-y,e-1,f),O(n,c.y1+y,e+1,f),R(n,a,n.length-1,f),O(n,i,0,f)}function O(n,f,e,c){for(;e<n.length;++e){const o=n[e],k=(f-o.y0)*c;k>1e-6&&(o.y0+=k,o.y1+=k),f=o.y1+y}}function R(n,f,e,c){for(;e>=0;--e){const o=n[e],k=(o.y1-f)*c;k>1e-6&&(o.y0-=k,o.y1-=k),f=o.y0-y}}function w({sourceLinks:n,targetLinks:f}){if(h===void 0){for(const{source:{sourceLinks:e}}of f)e.sort(ft);for(const{target:{targetLinks:e}}of n)e.sort(ht)}}function M(n){if(h===void 0)for(const{sourceLinks:f,targetLinks:e}of n)f.sort(ft),e.sort(ht)}function S(n,f){let e=n.y0-(n.sourceLinks.length-1)*y/2;for(const{target:c,width:o}of n.sourceLinks){if(c===f)break;e+=o+y}for(const{source:c,width:o}of f.targetLinks){if(c===n)break;e-=o}return e}function $(n,f){let e=f.y0-(f.targetLinks.length-1)*y/2;for(const{source:c,width:o}of f.targetLinks){if(c===n)break;e+=o+y}for(const{target:c,width:o}of n.sourceLinks){if(c===f)break;e-=o}return e}return _}var et=Math.PI,nt=2*et,j=1e-6,Tt=nt-j;function it(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function pt(){return new it}it.prototype=pt.prototype={constructor:it,moveTo:function(t,i){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+i)},closePath:function(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,i){this._+="L"+(this._x1=+t)+","+(this._y1=+i)},quadraticCurveTo:function(t,i,s,a){this._+="Q"+ +t+","+ +i+","+(this._x1=+s)+","+(this._y1=+a)},bezierCurveTo:function(t,i,s,a,u,m){this._+="C"+ +t+","+ +i+","+ +s+","+ +a+","+(this._x1=+u)+","+(this._y1=+m)},arcTo:function(t,i,s,a,u){t=+t,i=+i,s=+s,a=+a,u=+u;var m=this._x1,y=this._y1,p=s-t,r=a-i,l=m-t,h=y-i,g=l*l+h*h;if(u<0)throw new Error("negative radius: "+u);if(this._x1===null)this._+="M"+(this._x1=t)+","+(this._y1=i);else if(g>j)if(!(Math.abs(h*p-r*l)>j)||!u)this._+="L"+(this._x1=t)+","+(this._y1=i);else{var v=s-m,d=a-y,_=p*p+r*r,E=v*v+d*d,L=Math.sqrt(_),A=Math.sqrt(g),C=u*Math.tan((et-Math.acos((_+g-E)/(2*L*A)))/2),P=C/A,D=C/L;Math.abs(P-1)>j&&(this._+="L"+(t+P*l)+","+(i+P*h)),this._+="A"+u+","+u+",0,0,"+ +(h*v>l*d)+","+(this._x1=t+D*p)+","+(this._y1=i+D*r)}},arc:function(t,i,s,a,u,m){t=+t,i=+i,s=+s,m=!!m;var y=s*Math.cos(a),p=s*Math.sin(a),r=t+y,l=i+p,h=1^m,g=m?a-u:u-a;if(s<0)throw new Error("negative radius: "+s);this._x1===null?this._+="M"+r+","+l:(Math.abs(this._x1-r)>j||Math.abs(this._y1-l)>j)&&(this._+="L"+r+","+l),s&&(g<0&&(g=g%nt+nt),g>Tt?this._+="A"+s+","+s+",0,1,"+h+","+(t-y)+","+(i-p)+"A"+s+","+s+",0,1,"+h+","+(this._x1=r)+","+(this._y1=l):g>j&&(this._+="A"+s+","+s+",0,"+ +(g>=et)+","+h+","+(this._x1=t+s*Math.cos(u))+","+(this._y1=i+s*Math.sin(u))))},rect:function(t,i,s,a){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+i)+"h"+ +s+"v"+ +a+"h"+-s+"Z"},toString:function(){return this._}};var Mt=pt,Nt=Array.prototype.slice;function gt(t){return function(){return t}}function Ct(t){return t[0]}function Pt(t){return t[1]}function It(t){return t.source}function Ot(t){return t.target}function st(t){var i=It,s=Ot,a=Ct,u=Pt,m=null;function y(){var p,r=Nt.call(arguments),l=i.apply(this,r),h=s.apply(this,r);if(m||(m=p=Mt()),t(m,+a.apply(this,(r[0]=l,r)),+u.apply(this,r),+a.apply(this,(r[0]=h,r)),+u.apply(this,r)),p)return m=null,p+""||null}return y.source=function(p){return arguments.length?(i=p,y):i},y.target=function(p){return arguments.length?(s=p,y):s},y.x=function(p){return arguments.length?(a=typeof p=="function"?p:gt(+p),y):a},y.y=function(p){return arguments.length?(u=typeof p=="function"?p:gt(+p),y):u},y.context=function(p){return arguments.length?(m=p==null?null:p,y):m},y}function zt(t,i,s,a,u){t.moveTo(i,s),t.bezierCurveTo(i=(i+a)/2,s,i,u,a,u)}function $t(t,i,s,a,u){t.moveTo(i,s),t.bezierCurveTo(i,s=(s+u)/2,a,s,a,u)}function jt(t,i,s,a,u){var m=pointRadial(i,s),y=pointRadial(i,s=(s+u)/2),p=pointRadial(a,s),r=pointRadial(a,u);t.moveTo(m[0],m[1]),t.bezierCurveTo(y[0],y[1],p[0],p[1],r[0],r[1])}function Dt(){return st(zt)}function qt(){return st($t)}function te(){var t=st(jt);return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t}function Rt(t){return[t.source.x1,t.y0]}function Bt(t){return[t.target.x0,t.y1]}function Vt(){return Dt().source(Rt).target(Bt)}var ee=V(27484),ne=V(17967),ie=V(27856),rt=function(){var t=function(p,r,l,h){for(l=l||{},h=p.length;h--;l[p[h]]=r);return l},i=[1,9],s=[1,10],a=[1,5,10,12],u={trace:function(){},yy:{},symbols_:{error:2,start:3,SANKEY:4,NEWLINE:5,csv:6,opt_eof:7,record:8,csv_tail:9,EOF:10,"field[source]":11,COMMA:12,"field[target]":13,"field[value]":14,field:15,escaped:16,non_escaped:17,DQUOTE:18,ESCAPED_TEXT:19,NON_ESCAPED_TEXT:20,$accept:0,$end:1},terminals_:{2:"error",4:"SANKEY",5:"NEWLINE",10:"EOF",11:"field[source]",12:"COMMA",13:"field[target]",14:"field[value]",18:"DQUOTE",19:"ESCAPED_TEXT",20:"NON_ESCAPED_TEXT"},productions_:[0,[3,4],[6,2],[9,2],[9,0],[7,1],[7,0],[8,5],[15,1],[15,1],[16,3],[17,1]],performAction:function(r,l,h,g,v,d,_){var E=d.length-1;switch(v){case 7:const L=g.findOrCreateNode(d[E-4].trim().replaceAll('""','"')),A=g.findOrCreateNode(d[E-2].trim().replaceAll('""','"')),C=parseFloat(d[E].trim());g.addLink(L,A,C);break;case 8:case 9:case 11:this.$=d[E];break;case 10:this.$=d[E-1];break}},table:[{3:1,4:[1,2]},{1:[3]},{5:[1,3]},{6:4,8:5,15:6,16:7,17:8,18:i,20:s},{1:[2,6],7:11,10:[1,12]},t(s,[2,4],{9:13,5:[1,14]}),{12:[1,15]},t(a,[2,8]),t(a,[2,9]),{19:[1,16]},t(a,[2,11]),{1:[2,1]},{1:[2,5]},t(s,[2,2]),{6:17,8:5,15:6,16:7,17:8,18:i,20:s},{15:18,16:7,17:8,18:i,20:s},{18:[1,19]},t(s,[2,3]),{12:[1,20]},t(a,[2,10]),{15:21,16:7,17:8,18:i,20:s},t([1,5,10],[2,7])],defaultActions:{11:[2,1],12:[2,5]},parseError:function(r,l){if(l.recoverable)this.trace(r);else{var h=new Error(r);throw h.hash=l,h}},parse:function(r){var l=this,h=[0],g=[],v=[null],d=[],_=this.table,E="",L=0,A=0,C=2,P=1,D=d.slice.call(arguments,1),b=Object.create(this.lexer),N={yy:{}};for(var z in this.yy)Object.prototype.hasOwnProperty.call(this.yy,z)&&(N.yy[z]=this.yy[z]);b.setInput(r,N.yy),N.yy.lexer=b,N.yy.parser=this,typeof b.yylloc=="undefined"&&(b.yylloc={});var I=b.yylloc;d.push(I);var O=b.options&&b.options.ranges;typeof N.yy.parseError=="function"?this.parseError=N.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function R(){var x;return x=g.pop()||b.lex()||P,typeof x!="number"&&(x instanceof Array&&(g=x,x=g.pop()),x=l.symbols_[x]||x),x}for(var w,M,S,$,n={},f,e,c,o;;){if(M=h[h.length-1],this.defaultActions[M]?S=this.defaultActions[M]:((w===null||typeof w=="undefined")&&(w=R()),S=_[M]&&_[M][w]),typeof S=="undefined"||!S.length||!S[0]){var k="";o=[];for(f in _[M])this.terminals_[f]&&f>C&&o.push("'"+this.terminals_[f]+"'");b.showPosition?k="Parse error on line "+(L+1)+`:
`+b.showPosition()+`
Expecting `+o.join(", ")+", got '"+(this.terminals_[w]||w)+"'":k="Parse error on line "+(L+1)+": Unexpected "+(w==P?"end of input":"'"+(this.terminals_[w]||w)+"'"),this.parseError(k,{text:b.match,token:this.terminals_[w]||w,line:b.yylineno,loc:I,expected:o})}if(S[0]instanceof Array&&S.length>1)throw new Error("Parse Error: multiple actions possible at state: "+M+", token: "+w);switch(S[0]){case 1:h.push(w),v.push(b.yytext),d.push(b.yylloc),h.push(S[1]),w=null,A=b.yyleng,E=b.yytext,L=b.yylineno,I=b.yylloc;break;case 2:if(e=this.productions_[S[1]][1],n.$=v[v.length-e],n._$={first_line:d[d.length-(e||1)].first_line,last_line:d[d.length-1].last_line,first_column:d[d.length-(e||1)].first_column,last_column:d[d.length-1].last_column},O&&(n._$.range=[d[d.length-(e||1)].range[0],d[d.length-1].range[1]]),$=this.performAction.apply(n,[E,A,L,N.yy,S[1],v,d].concat(D)),typeof $!="undefined")return $;e&&(h=h.slice(0,-1*e*2),v=v.slice(0,-1*e),d=d.slice(0,-1*e)),h.push(this.productions_[S[1]][0]),v.push(n.$),d.push(n._$),c=_[h[h.length-2]][h[h.length-1]],h.push(c);break;case 3:return!0}}return!0}},m=function(){var p={EOF:1,parseError:function(l,h){if(this.yy.parser)this.yy.parser.parseError(l,h);else throw new Error(l)},setInput:function(r,l){return this.yy=l||this.yy||{},this._input=r,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var r=this._input[0];this.yytext+=r,this.yyleng++,this.offset++,this.match+=r,this.matched+=r;var l=r.match(/(?:\r\n?|\n).*/g);return l?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),r},unput:function(r){var l=r.length,h=r.split(/(?:\r\n?|\n)/g);this._input=r+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-l),this.offset-=l;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),h.length-1&&(this.yylineno-=h.length-1);var v=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:h?(h.length===g.length?this.yylloc.first_column:0)+g[g.length-h.length].length-h[0].length:this.yylloc.first_column-l},this.options.ranges&&(this.yylloc.range=[v[0],v[0]+this.yyleng-l]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(r){this.unput(this.match.slice(r))},pastInput:function(){var r=this.matched.substr(0,this.matched.length-this.match.length);return(r.length>20?"...":"")+r.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var r=this.match;return r.length<20&&(r+=this._input.substr(0,20-r.length)),(r.substr(0,20)+(r.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var r=this.pastInput(),l=new Array(r.length+1).join("-");return r+this.upcomingInput()+`
`+l+"^"},test_match:function(r,l){var h,g,v;if(this.options.backtrack_lexer&&(v={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(v.yylloc.range=this.yylloc.range.slice(0))),g=r[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length},this.yytext+=r[0],this.match+=r[0],this.matches=r,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(r[0].length),this.matched+=r[0],h=this.performAction.call(this,this.yy,this,l,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),h)return h;if(this._backtrack){for(var d in v)this[d]=v[d];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var r,l,h,g;this._more||(this.yytext="",this.match="");for(var v=this._currentRules(),d=0;d<v.length;d++)if(h=this._input.match(this.rules[v[d]]),h&&(!l||h[0].length>l[0].length)){if(l=h,g=d,this.options.backtrack_lexer){if(r=this.test_match(h,v[d]),r!==!1)return r;if(this._backtrack){l=!1;continue}else return!1}else if(!this.options.flex)break}return l?(r=this.test_match(l,v[g]),r!==!1?r:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var l=this.next();return l||this.lex()},begin:function(l){this.conditionStack.push(l)},popState:function(){var l=this.conditionStack.length-1;return l>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(l){return l=this.conditionStack.length-1-Math.abs(l||0),l>=0?this.conditionStack[l]:"INITIAL"},pushState:function(l){this.begin(l)},stateStackSize:function(){return this.conditionStack.length},options:{easy_keword_rules:!0},performAction:function(l,h,g,v){switch(g){case 0:return this.pushState("csv"),4;case 1:return 10;case 2:return 5;case 3:return 12;case 4:return this.pushState("escaped_text"),18;case 5:return 20;case 6:return this.popState("escaped_text"),18;case 7:return 19}},rules:[/^(?:sankey-beta\b)/,/^(?:$)/,/^(?:((\u000D\u000A)|(\u000A)))/,/^(?:(\u002C))/,/^(?:(\u0022))/,/^(?:([\u0020-\u0021\u0023-\u002B\u002D-\u007E])*)/,/^(?:(\u0022)(?!(\u0022)))/,/^(?:(([\u0020-\u0021\u0023-\u002B\u002D-\u007E])|(\u002C)|(\u000D)|(\u000A)|(\u0022)(\u0022))*)/],conditions:{csv:{rules:[1,2,3,4,5,6,7],inclusive:!1},escaped_text:{rules:[6,7],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7],inclusive:!0}}};return p}();u.lexer=m;function y(){this.yy={}}return y.prototype=u,u.Parser=y,new y}();rt.parser=rt;const Q=rt;let Z=[],J=[],Y={};const Ut=()=>{Z=[],J=[],Y={},(0,T.t)()};class Yt{constructor(i,s,a=0){this.source=i,this.target=s,this.value=a}}const Ft=(t,i,s)=>{Z.push(new Yt(t,i,s))};class Wt{constructor(i){this.ID=i}}const Gt={nodesMap:Y,getConfig:()=>(0,T.c)().sankey,getNodes:()=>J,getLinks:()=>Z,getGraph:()=>({nodes:J.map(t=>({id:t.ID})),links:Z.map(t=>({source:t.source.ID,target:t.target.ID,value:t.value}))}),addLink:Ft,findOrCreateNode:t=>(t=T.e.sanitizeText(t,(0,T.c)()),Y[t]||(Y[t]=new Wt(t),J.push(Y[t])),Y[t]),getAccTitle:T.g,setAccTitle:T.s,getAccDescription:T.a,setAccDescription:T.b,getDiagramTitle:T.r,setDiagramTitle:T.q,clear:Ut},mt=class lt{static next(i){return new lt(i+ ++lt.count)}constructor(i){this.id=i,this.href=`#${i}`}toString(){return"url("+this.href+")"}};mt.count=0;let kt=mt;const Ht={left:vt,right:bt,center:wt,justify:ct},Kt={draw:function(t,i,s,a){var R,w,M,S,$,n,f;const{securityLevel:u,sankey:m}=(0,T.c)(),y=T.I.sankey;let p;u==="sandbox"&&(p=(0,U.Ys)("#i"+i));const r=u==="sandbox"?(0,U.Ys)(p.nodes()[0].contentDocument.body):(0,U.Ys)("body"),l=u==="sandbox"?r.select(`[id="${i}"]`):(0,U.Ys)(`[id="${i}"]`),h=(R=m==null?void 0:m.width)!=null?R:y.width,g=(w=m==null?void 0:m.height)!=null?w:y.width,v=(M=m==null?void 0:m.useMaxWidth)!=null?M:y.useMaxWidth,d=(S=m==null?void 0:m.nodeAlignment)!=null?S:y.nodeAlignment,_=($=m==null?void 0:m.prefix)!=null?$:y.prefix,E=(n=m==null?void 0:m.suffix)!=null?n:y.suffix,L=(f=m==null?void 0:m.showValues)!=null?f:y.showValues;(0,T.i)(l,g,h,v);const A=a.db.getGraph(),C=Ht[d],P=10;At().nodeId(e=>e.id).nodeWidth(P).nodePadding(10+(L?15:0)).nodeAlign(C).extent([[0,0],[h,g]])(A);const b=(0,U.PKp)(U.K2I);l.append("g").attr("class","nodes").selectAll(".node").data(A.nodes).join("g").attr("class","node").attr("id",e=>(e.uid=kt.next("node-")).id).attr("transform",function(e){return"translate("+e.x0+","+e.y0+")"}).attr("x",e=>e.x0).attr("y",e=>e.y0).append("rect").attr("height",e=>e.y1-e.y0).attr("width",e=>e.x1-e.x0).attr("fill",e=>b(e.id));const N=({id:e,value:c})=>L?`${e}
${_}${Math.round(c*100)/100}${E}`:e;l.append("g").attr("class","node-labels").attr("font-family","sans-serif").attr("font-size",14).selectAll("text").data(A.nodes).join("text").attr("x",e=>e.x0<h/2?e.x1+6:e.x0-6).attr("y",e=>(e.y1+e.y0)/2).attr("dy",`${L?"0":"0.35"}em`).attr("text-anchor",e=>e.x0<h/2?"start":"end").text(N);const z=l.append("g").attr("class","links").attr("fill","none").attr("stroke-opacity",.5).selectAll(".link").data(A.links).join("g").attr("class","link").style("mix-blend-mode","multiply"),I=(m==null?void 0:m.linkColor)||"gradient";if(I==="gradient"){const e=z.append("linearGradient").attr("id",c=>(c.uid=kt.next("linearGradient-")).id).attr("gradientUnits","userSpaceOnUse").attr("x1",c=>c.source.x1).attr("x2",c=>c.target.x0);e.append("stop").attr("offset","0%").attr("stop-color",c=>b(c.source.id)),e.append("stop").attr("offset","100%").attr("stop-color",c=>b(c.target.id))}let O;switch(I){case"gradient":O=e=>e.uid;break;case"source":O=e=>b(e.source.id);break;case"target":O=e=>b(e.target.id);break;default:O=I}z.append("path").attr("d",Vt()).attr("stroke",O).attr("stroke-width",e=>Math.max(1,e.width))}},Xt=t=>t.replaceAll(/^[^\S\n\r]+|[^\S\n\r]+$/g,"").replaceAll(/([\n\r])+/g,`
`).trim(),Qt=Q.parse.bind(Q);Q.parse=t=>Qt(Xt(t));const Zt={parser:Q,db:Gt,renderer:Kt}}}]);

//# sourceMappingURL=6488.94b2a4a76c9a6f251b87.js.map