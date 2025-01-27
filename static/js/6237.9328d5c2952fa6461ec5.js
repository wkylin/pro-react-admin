"use strict";(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[6237],{83814:function(_t,Z,R){R.d(Z,{CP:function(){return U},HT:function(){return F},PB:function(){return L},aC:function(){return B},lC:function(){return W},m:function(){return Q},tk:function(){return V}});var T=R(69502),r=R(16750),V=(0,T.K2)((E,y)=>{const k=E.append("rect");if(k.attr("x",y.x),k.attr("y",y.y),k.attr("fill",y.fill),k.attr("stroke",y.stroke),k.attr("width",y.width),k.attr("height",y.height),y.name&&k.attr("name",y.name),y.rx&&k.attr("rx",y.rx),y.ry&&k.attr("ry",y.ry),y.attrs!==void 0)for(const b in y.attrs)k.attr(b,y.attrs[b]);return y.class&&k.attr("class",y.class),k},"drawRect"),W=(0,T.K2)((E,y)=>{const k={x:y.startx,y:y.starty,width:y.stopx-y.startx,height:y.stopy-y.starty,fill:y.fill,stroke:y.stroke,class:"rect"};V(E,k).lower()},"drawBackgroundRect"),Q=(0,T.K2)((E,y)=>{const k=y.text.replace(T.H1," "),b=E.append("text");b.attr("x",y.x),b.attr("y",y.y),b.attr("class","legend"),b.style("text-anchor",y.anchor),y.class&&b.attr("class",y.class);const P=b.append("tspan");return P.attr("x",y.x+y.textMargin*2),P.text(k),b},"drawText"),B=(0,T.K2)((E,y,k,b)=>{const P=E.append("image");P.attr("x",y),P.attr("y",k);const Y=(0,r.J)(b);P.attr("xlink:href",Y)},"drawImage"),U=(0,T.K2)((E,y,k,b)=>{const P=E.append("use");P.attr("x",y),P.attr("y",k);const Y=(0,r.J)(b);P.attr("xlink:href",`#${Y}`)},"drawEmbeddedImage"),L=(0,T.K2)(()=>({x:0,y:0,width:100,height:100,fill:"#EDF2AE",stroke:"#666",anchor:"start",rx:0,ry:0}),"getNoteRect"),F=(0,T.K2)(()=>({x:0,y:0,width:100,height:100,"text-anchor":"start",style:"#666",textMargin:0,rx:0,ry:0,tspan:!0}),"getTextObj")},26237:function(_t,Z,R){R.d(Z,{diagram:function(){return Rt}});var T=R(83814),r=R(69502),V=R(9365),W=function(){var t=(0,r.K2)(function(m,n,a,l){for(a=a||{},l=m.length;l--;a[m[l]]=n);return a},"o"),e=[6,8,10,11,12,14,16,17,18],i=[1,9],c=[1,10],s=[1,11],u=[1,12],h=[1,13],g=[1,14],f={trace:(0,r.K2)(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:(0,r.K2)(function(n,a,l,d,p,o,C){var w=o.length-1;switch(p){case 1:return o[w-1];case 2:this.$=[];break;case 3:o[w-1].push(o[w]),this.$=o[w-1];break;case 4:case 5:this.$=o[w];break;case 6:case 7:this.$=[];break;case 8:d.setDiagramTitle(o[w].substr(6)),this.$=o[w].substr(6);break;case 9:this.$=o[w].trim(),d.setAccTitle(this.$);break;case 10:case 11:this.$=o[w].trim(),d.setAccDescription(this.$);break;case 12:d.addSection(o[w].substr(8)),this.$=o[w].substr(8);break;case 13:d.addTask(o[w-1],o[w]),this.$="task";break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:i,12:c,14:s,16:u,17:h,18:g},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:i,12:c,14:s,16:u,17:h,18:g},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:(0,r.K2)(function(n,a){if(a.recoverable)this.trace(n);else{var l=new Error(n);throw l.hash=a,l}},"parseError"),parse:(0,r.K2)(function(n){var a=this,l=[0],d=[],p=[null],o=[],C=this.table,w="",X=0,pt=0,gt=0,Vt=2,mt=1,Bt=o.slice.call(arguments,1),v=Object.create(this.lexer),j={yy:{}};for(var et in this.yy)Object.prototype.hasOwnProperty.call(this.yy,et)&&(j.yy[et]=this.yy[et]);v.setInput(n,j.yy),j.yy.lexer=v,j.yy.parser=this,typeof v.yylloc=="undefined"&&(v.yylloc={});var rt=v.yylloc;o.push(rt);var Lt=v.options&&v.options.ranges;typeof j.yy.parseError=="function"?this.parseError=j.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Ft(M){l.length=l.length-2*M,p.length=p.length-M,o.length=o.length-M}(0,r.K2)(Ft,"popStack");function xt(){var M;return M=d.pop()||v.lex()||mt,typeof M!="number"&&(M instanceof Array&&(d=M,M=d.pop()),M=a.symbols_[M]||M),M}(0,r.K2)(xt,"lex");for(var K,nt,N,I,Ot,st,z={},J,A,kt,q;;){if(N=l[l.length-1],this.defaultActions[N]?I=this.defaultActions[N]:((K===null||typeof K=="undefined")&&(K=xt()),I=C[N]&&C[N][K]),typeof I=="undefined"||!I.length||!I[0]){var it="";q=[];for(J in C[N])this.terminals_[J]&&J>Vt&&q.push("'"+this.terminals_[J]+"'");v.showPosition?it="Parse error on line "+(X+1)+`:
`+v.showPosition()+`
Expecting `+q.join(", ")+", got '"+(this.terminals_[K]||K)+"'":it="Parse error on line "+(X+1)+": Unexpected "+(K==mt?"end of input":"'"+(this.terminals_[K]||K)+"'"),this.parseError(it,{text:v.match,token:this.terminals_[K]||K,line:v.yylineno,loc:rt,expected:q})}if(I[0]instanceof Array&&I.length>1)throw new Error("Parse Error: multiple actions possible at state: "+N+", token: "+K);switch(I[0]){case 1:l.push(K),p.push(v.yytext),o.push(v.yylloc),l.push(I[1]),K=null,nt?(K=nt,nt=null):(pt=v.yyleng,w=v.yytext,X=v.yylineno,rt=v.yylloc,gt>0&&gt--);break;case 2:if(A=this.productions_[I[1]][1],z.$=p[p.length-A],z._$={first_line:o[o.length-(A||1)].first_line,last_line:o[o.length-1].last_line,first_column:o[o.length-(A||1)].first_column,last_column:o[o.length-1].last_column},Lt&&(z._$.range=[o[o.length-(A||1)].range[0],o[o.length-1].range[1]]),st=this.performAction.apply(z,[w,pt,X,j.yy,I[1],p,o].concat(Bt)),typeof st!="undefined")return st;A&&(l=l.slice(0,-1*A*2),p=p.slice(0,-1*A),o=o.slice(0,-1*A)),l.push(this.productions_[I[1]][0]),p.push(z.$),o.push(z._$),kt=C[l[l.length-2]][l[l.length-1]],l.push(kt);break;case 3:return!0}}return!0},"parse")},_=function(){var m={EOF:1,parseError:(0,r.K2)(function(a,l){if(this.yy.parser)this.yy.parser.parseError(a,l);else throw new Error(a)},"parseError"),setInput:(0,r.K2)(function(n,a){return this.yy=a||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:(0,r.K2)(function(){var n=this._input[0];this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n;var a=n.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},"input"),unput:(0,r.K2)(function(n){var a=n.length,l=n.split(/(?:\r\n?|\n)/g);this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),l.length-1&&(this.yylineno-=l.length-1);var p=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:l?(l.length===d.length?this.yylloc.first_column:0)+d[d.length-l.length].length-l[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[p[0],p[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},"unput"),more:(0,r.K2)(function(){return this._more=!0,this},"more"),reject:(0,r.K2)(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:(0,r.K2)(function(n){this.unput(this.match.slice(n))},"less"),pastInput:(0,r.K2)(function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:(0,r.K2)(function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:(0,r.K2)(function(){var n=this.pastInput(),a=new Array(n.length+1).join("-");return n+this.upcomingInput()+`
`+a+"^"},"showPosition"),test_match:(0,r.K2)(function(n,a){var l,d,p;if(this.options.backtrack_lexer&&(p={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(p.yylloc.range=this.yylloc.range.slice(0))),d=n[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],l=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),l)return l;if(this._backtrack){for(var o in p)this[o]=p[o];return!1}return!1},"test_match"),next:(0,r.K2)(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var n,a,l,d;this._more||(this.yytext="",this.match="");for(var p=this._currentRules(),o=0;o<p.length;o++)if(l=this._input.match(this.rules[p[o]]),l&&(!a||l[0].length>a[0].length)){if(a=l,d=o,this.options.backtrack_lexer){if(n=this.test_match(l,p[o]),n!==!1)return n;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(n=this.test_match(a,p[d]),n!==!1?n:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:(0,r.K2)(function(){var a=this.next();return a||this.lex()},"lex"),begin:(0,r.K2)(function(a){this.conditionStack.push(a)},"begin"),popState:(0,r.K2)(function(){var a=this.conditionStack.length-1;return a>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:(0,r.K2)(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:(0,r.K2)(function(a){return a=this.conditionStack.length-1-Math.abs(a||0),a>=0?this.conditionStack[a]:"INITIAL"},"topState"),pushState:(0,r.K2)(function(a){this.begin(a)},"pushState"),stateStackSize:(0,r.K2)(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,r.K2)(function(a,l,d,p){var o=p;switch(d){case 0:break;case 1:break;case 2:return 10;case 3:break;case 4:break;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;break;case 8:return this.popState(),"acc_title_value";break;case 9:return this.begin("acc_descr"),14;break;case 10:return this.popState(),"acc_descr_value";break;case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};return m}();f.lexer=_;function x(){this.yy={}}return(0,r.K2)(x,"Parser"),x.prototype=f,f.Parser=x,new x}();W.parser=W;var Q=W,B="",U=[],L=[],F=[],E=(0,r.K2)(function(){U.length=0,L.length=0,B="",F.length=0,(0,r.IU)()},"clear"),y=(0,r.K2)(function(t){B=t,U.push(t)},"addSection"),k=(0,r.K2)(function(){return U},"getSections"),b=(0,r.K2)(function(){let t=at();const e=100;let i=0;for(;!t&&i<e;)t=at(),i++;return L.push(...F),L},"getTasks"),P=(0,r.K2)(function(){const t=[];return L.forEach(i=>{i.people&&t.push(...i.people)}),[...new Set(t)].sort()},"updateActors"),Y=(0,r.K2)(function(t,e){const i=e.substr(1).split(":");let c=0,s=[];i.length===1?(c=Number(i[0]),s=[]):(c=Number(i[0]),s=i[1].split(","));const u=s.map(g=>g.trim()),h={section:B,type:B,people:u,task:t,score:c};F.push(h)},"addTask"),vt=(0,r.K2)(function(t){const e={section:B,type:B,description:t,task:t,classes:[]};L.push(e)},"addTaskOrg"),at=(0,r.K2)(function(){const t=(0,r.K2)(function(i){return F[i].processed},"compileTask");let e=!0;for(const[i,c]of F.entries())t(i),e=e&&c.processed;return e},"compileTasks"),bt=(0,r.K2)(function(){return P()},"getActors"),lt={getConfig:(0,r.K2)(()=>(0,r.D7)().journey,"getConfig"),clear:E,setDiagramTitle:r.ke,getDiagramTitle:r.ab,setAccTitle:r.SV,getAccTitle:r.iN,setAccDescription:r.EI,getAccDescription:r.m7,addSection:y,getSections:k,getTasks:b,addTask:Y,addTaskOrg:vt,getActors:bt},wt=(0,r.K2)(t=>`.label {
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
`,"getStyles"),Kt=wt,D=(0,r.K2)(function(t,e){return(0,T.tk)(t,e)},"drawRect"),Tt=(0,r.K2)(function(t,e){const c=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),s=t.append("g");s.append("circle").attr("cx",e.cx-15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),s.append("circle").attr("cx",e.cx+15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function u(f){const _=(0,V.arc)().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);f.append("path").attr("class","mouth").attr("d",_).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}(0,r.K2)(u,"smile");function h(f){const _=(0,V.arc)().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);f.append("path").attr("class","mouth").attr("d",_).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}(0,r.K2)(h,"sad");function g(f){f.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return(0,r.K2)(g,"ambivalent"),e.score>3?u(s):e.score<3?h(s):g(s),c},"drawFace"),ot=(0,r.K2)(function(t,e){const i=t.append("circle");return i.attr("cx",e.cx),i.attr("cy",e.cy),i.attr("class","actor-"+e.pos),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("r",e.r),i.class!==void 0&&i.attr("class",i.class),e.title!==void 0&&i.append("title").text(e.title),i},"drawCircle"),ct=(0,r.K2)(function(t,e){return(0,T.m)(t,e)},"drawText"),Et=(0,r.K2)(function(t,e){function i(s,u,h,g,f){return s+","+u+" "+(s+h)+","+u+" "+(s+h)+","+(u+g-f)+" "+(s+h-f*1.2)+","+(u+g)+" "+s+","+(u+g)}(0,r.K2)(i,"genPoints");const c=t.append("polygon");c.attr("points",i(e.x,e.y,50,20,7)),c.attr("class","labelBox"),e.y=e.y+e.labelMargin,e.x=e.x+.5*e.labelMargin,ct(t,e)},"drawLabel"),Mt=(0,r.K2)(function(t,e,i){const c=t.append("g"),s=(0,T.PB)();s.x=e.x,s.y=e.y,s.fill=e.fill,s.width=i.width*e.taskCount+i.diagramMarginX*(e.taskCount-1),s.height=i.height,s.class="journey-section section-type-"+e.num,s.rx=3,s.ry=3,D(c,s),ut(i)(e.text,c,s.x,s.y,s.width,s.height,{class:"journey-section section-type-"+e.num},i,e.colour)},"drawSection"),ht=-1,Pt=(0,r.K2)(function(t,e,i){const c=e.x+i.width/2,s=t.append("g");ht++;const u=300+5*30;s.append("line").attr("id","task"+ht).attr("x1",c).attr("y1",e.y).attr("x2",c).attr("y2",u).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),Tt(s,{cx:c,cy:300+(5-e.score)*30,score:e.score});const h=(0,T.PB)();h.x=e.x,h.y=e.y,h.fill=e.fill,h.width=i.width,h.height=i.height,h.class="task task-type-"+e.num,h.rx=3,h.ry=3,D(s,h);let g=e.x+14;e.people.forEach(f=>{const _=e.actors[f].color,x={cx:g,cy:e.y,r:7,fill:_,stroke:"#000",title:f,pos:e.actors[f].position};ot(s,x),g+=10}),ut(i)(e.task,s,h.x,h.y,h.width,h.height,{class:"task"},i,e.colour)},"drawTask"),St=(0,r.K2)(function(t,e){(0,T.lC)(t,e)},"drawBackgroundRect"),ut=function(){function t(s,u,h,g,f,_,x,m){const n=u.append("text").attr("x",h+f/2).attr("y",g+_/2+5).style("font-color",m).style("text-anchor","middle").text(s);c(n,x)}(0,r.K2)(t,"byText");function e(s,u,h,g,f,_,x,m,n){const{taskFontSize:a,taskFontFamily:l}=m,d=s.split(/<br\s*\/?>/gi);for(let p=0;p<d.length;p++){const o=p*a-a*(d.length-1)/2,C=u.append("text").attr("x",h+f/2).attr("y",g).attr("fill",n).style("text-anchor","middle").style("font-size",a).style("font-family",l);C.append("tspan").attr("x",h+f/2).attr("dy",o).text(d[p]),C.attr("y",g+_/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),c(C,x)}}(0,r.K2)(e,"byTspan");function i(s,u,h,g,f,_,x,m){const n=u.append("switch"),l=n.append("foreignObject").attr("x",h).attr("y",g).attr("width",f).attr("height",_).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");l.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(s),e(s,n,h,g,f,_,x,m),c(l,x)}(0,r.K2)(i,"byFo");function c(s,u){for(const h in u)h in u&&s.attr(h,u[h])}return(0,r.K2)(c,"_setTextAttrs"),function(s){return s.textPlacement==="fo"?i:s.textPlacement==="old"?t:e}}(),It=(0,r.K2)(function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),H={drawRect:D,drawCircle:ot,drawSection:Mt,drawText:ct,drawLabel:Et,drawTask:Pt,drawBackgroundRect:St,initGraphics:It},$t=(0,r.K2)(function(t){Object.keys(t).forEach(function(i){G[i]=t[i]})},"setConf"),$={};function yt(t){const e=(0,r.D7)().journey;let i=60;Object.keys($).forEach(c=>{const s=$[c].color,u={cx:20,cy:i,r:7,fill:s,stroke:"#000",pos:$[c].position};H.drawCircle(t,u);const h={x:40,y:i+7,fill:"#666",text:c,textMargin:e.boxTextMargin|5};H.drawText(t,h),i+=20})}(0,r.K2)(yt,"drawActorLegend");var G=(0,r.D7)().journey,O=G.leftMargin,Ct=(0,r.K2)(function(t,e,i,c){const s=(0,r.D7)().journey,u=(0,r.D7)().securityLevel;let h;u==="sandbox"&&(h=(0,V.select)("#i"+e));const g=u==="sandbox"?(0,V.select)(h.nodes()[0].contentDocument.body):(0,V.select)("body");S.init();const f=g.select("#"+e);H.initGraphics(f);const _=c.db.getTasks(),x=c.db.getDiagramTitle(),m=c.db.getActors();for(const o in $)delete $[o];let n=0;m.forEach(o=>{$[o]={color:s.actorColours[n%s.actorColours.length],position:n},n++}),yt(f),S.insert(0,0,O,Object.keys($).length*50),At(f,_,0);const a=S.getBounds();x&&f.append("text").text(x).attr("x",O).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);const l=a.stopy-a.starty+2*s.diagramMarginY,d=O+a.stopx+2*s.diagramMarginX;(0,r.a$)(f,l,d,s.useMaxWidth),f.append("line").attr("x1",O).attr("y1",s.height*4).attr("x2",d-O-4).attr("y2",s.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");const p=x?70:0;f.attr("viewBox",`${a.startx} -25 ${d} ${l+p}`),f.attr("preserveAspectRatio","xMinYMin meet"),f.attr("height",l+p+25)},"draw"),S={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:(0,r.K2)(function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},"init"),updateVal:(0,r.K2)(function(t,e,i,c){t[e]===void 0?t[e]=i:t[e]=c(i,t[e])},"updateVal"),updateBounds:(0,r.K2)(function(t,e,i,c){const s=(0,r.D7)().journey,u=this;let h=0;function g(f){return(0,r.K2)(function(x){h++;const m=u.sequenceItems.length-h+1;u.updateVal(x,"starty",e-m*s.boxMargin,Math.min),u.updateVal(x,"stopy",c+m*s.boxMargin,Math.max),u.updateVal(S.data,"startx",t-m*s.boxMargin,Math.min),u.updateVal(S.data,"stopx",i+m*s.boxMargin,Math.max),f!=="activation"&&(u.updateVal(x,"startx",t-m*s.boxMargin,Math.min),u.updateVal(x,"stopx",i+m*s.boxMargin,Math.max),u.updateVal(S.data,"starty",e-m*s.boxMargin,Math.min),u.updateVal(S.data,"stopy",c+m*s.boxMargin,Math.max))},"updateItemBounds")}(0,r.K2)(g,"updateFn"),this.sequenceItems.forEach(g())},"updateBounds"),insert:(0,r.K2)(function(t,e,i,c){const s=Math.min(t,i),u=Math.max(t,i),h=Math.min(e,c),g=Math.max(e,c);this.updateVal(S.data,"startx",s,Math.min),this.updateVal(S.data,"starty",h,Math.min),this.updateVal(S.data,"stopx",u,Math.max),this.updateVal(S.data,"stopy",g,Math.max),this.updateBounds(s,h,u,g)},"insert"),bumpVerticalPos:(0,r.K2)(function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},"bumpVerticalPos"),getVerticalPos:(0,r.K2)(function(){return this.verticalPos},"getVerticalPos"),getBounds:(0,r.K2)(function(){return this.data},"getBounds")},tt=G.sectionFills,dt=G.sectionColours,At=(0,r.K2)(function(t,e,i){const c=(0,r.D7)().journey;let s="";const u=c.height*2+c.diagramMarginY,h=i+u;let g=0,f="#CCC",_="black",x=0;for(const[m,n]of e.entries()){if(s!==n.section){f=tt[g%tt.length],x=g%tt.length,_=dt[g%dt.length];let l=0;const d=n.section;for(let o=m;o<e.length&&e[o].section==d;o++)l=l+1;const p={x:m*c.taskMargin+m*c.width+O,y:50,text:n.section,fill:f,num:x,colour:_,taskCount:l};H.drawSection(t,p,c),s=n.section,g++}const a=n.people.reduce((l,d)=>($[d]&&(l[d]=$[d]),l),{});n.x=m*c.taskMargin+m*c.width+O,n.y=h,n.width=c.diagramMarginX,n.height=c.diagramMarginY,n.colour=_,n.fill=f,n.num=x,n.actors=a,H.drawTask(t,n,c),S.insert(n.x,n.y,n.x+n.width+c.taskMargin,300+5*30)}},"drawTasks"),ft={setConf:$t,draw:Ct},Rt={parser:Q,db:lt,renderer:ft,styles:Kt,init:(0,r.K2)(t=>{ft.setConf(t.journey),lt.clear()},"init")}}}]);
