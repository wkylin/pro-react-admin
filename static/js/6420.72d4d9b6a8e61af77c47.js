"use strict";(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[6420],{26420:function(gt,H,S){S.d(H,{diagram:function(){return At}});var k=S(65950),V=S(80812),R=S(28259),nt=S(74353),st=S(16750),rt=S(42838),z=function(){var t=function(g,n,i,a){for(i=i||{},a=g.length;a--;i[g[a]]=n);return i},e=[6,8,10,11,12,14,16,17,18],r=[1,9],l=[1,10],s=[1,11],u=[1,12],c=[1,13],f=[1,14],d={trace:function(){},yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:function(n,i,a,y,p,o,C){var w=o.length-1;switch(p){case 1:return o[w-1];case 2:this.$=[];break;case 3:o[w-1].push(o[w]),this.$=o[w-1];break;case 4:case 5:this.$=o[w];break;case 6:case 7:this.$=[];break;case 8:y.setDiagramTitle(o[w].substr(6)),this.$=o[w].substr(6);break;case 9:this.$=o[w].trim(),y.setAccTitle(this.$);break;case 10:case 11:this.$=o[w].trim(),y.setAccDescription(this.$);break;case 12:y.addSection(o[w].substr(8)),this.$=o[w].substr(8);break;case 13:y.addTask(o[w-1],o[w]),this.$="task";break}},table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:r,12:l,14:s,16:u,17:c,18:f},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:r,12:l,14:s,16:u,17:c,18:f},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:function(n,i){if(i.recoverable)this.trace(n);else{var a=new Error(n);throw a.hash=i,a}},parse:function(n){var i=this,a=[0],y=[],p=[null],o=[],C=this.table,w="",Y=0,dt=0,Lt=2,ft=1,Rt=o.slice.call(arguments,1),b=Object.create(this.lexer),F={yy:{}};for(var q in this.yy)Object.prototype.hasOwnProperty.call(this.yy,q)&&(F.yy[q]=this.yy[q]);b.setInput(n,F.yy),F.yy.lexer=b,F.yy.parser=this,typeof b.yylloc=="undefined"&&(b.yylloc={});var D=b.yylloc;o.push(D);var Ot=b.options&&b.options.ranges;typeof F.yy.parseError=="function"?this.parseError=F.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Vt(){var L;return L=y.pop()||b.lex()||ft,typeof L!="number"&&(L instanceof Array&&(y=L,L=y.pop()),L=i.symbols_[L]||L),L}for(var M,j,$,tt,N={},G,A,pt,X;;){if(j=a[a.length-1],this.defaultActions[j]?$=this.defaultActions[j]:((M===null||typeof M=="undefined")&&(M=Vt()),$=C[j]&&C[j][M]),typeof $=="undefined"||!$.length||!$[0]){var et="";X=[];for(G in C[j])this.terminals_[G]&&G>Lt&&X.push("'"+this.terminals_[G]+"'");b.showPosition?et="Parse error on line "+(Y+1)+`:
`+b.showPosition()+`
Expecting `+X.join(", ")+", got '"+(this.terminals_[M]||M)+"'":et="Parse error on line "+(Y+1)+": Unexpected "+(M==ft?"end of input":"'"+(this.terminals_[M]||M)+"'"),this.parseError(et,{text:b.match,token:this.terminals_[M]||M,line:b.yylineno,loc:D,expected:X})}if($[0]instanceof Array&&$.length>1)throw new Error("Parse Error: multiple actions possible at state: "+j+", token: "+M);switch($[0]){case 1:a.push(M),p.push(b.yytext),o.push(b.yylloc),a.push($[1]),M=null,dt=b.yyleng,w=b.yytext,Y=b.yylineno,D=b.yylloc;break;case 2:if(A=this.productions_[$[1]][1],N.$=p[p.length-A],N._$={first_line:o[o.length-(A||1)].first_line,last_line:o[o.length-1].last_line,first_column:o[o.length-(A||1)].first_column,last_column:o[o.length-1].last_column},Ot&&(N._$.range=[o[o.length-(A||1)].range[0],o[o.length-1].range[1]]),tt=this.performAction.apply(N,[w,dt,Y,F.yy,$[1],p,o].concat(Rt)),typeof tt!="undefined")return tt;A&&(a=a.slice(0,-1*A*2),p=p.slice(0,-1*A),o=o.slice(0,-1*A)),a.push(this.productions_[$[1]][0]),p.push(N.$),o.push(N._$),pt=C[a[a.length-2]][a[a.length-1]],a.push(pt);break;case 3:return!0}}return!0}},_=function(){var g={EOF:1,parseError:function(i,a){if(this.yy.parser)this.yy.parser.parseError(i,a);else throw new Error(i)},setInput:function(n,i){return this.yy=i||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var n=this._input[0];this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n;var i=n.match(/(?:\r\n?|\n).*/g);return i?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},unput:function(n){var i=n.length,a=n.split(/(?:\r\n?|\n)/g);this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-i),this.offset-=i;var y=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),a.length-1&&(this.yylineno-=a.length-1);var p=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:a?(a.length===y.length?this.yylloc.first_column:0)+y[y.length-a.length].length-a[0].length:this.yylloc.first_column-i},this.options.ranges&&(this.yylloc.range=[p[0],p[0]+this.yyleng-i]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(n){this.unput(this.match.slice(n))},pastInput:function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var n=this.pastInput(),i=new Array(n.length+1).join("-");return n+this.upcomingInput()+`
`+i+"^"},test_match:function(n,i){var a,y,p;if(this.options.backtrack_lexer&&(p={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(p.yylloc.range=this.yylloc.range.slice(0))),y=n[0].match(/(?:\r\n?|\n).*/g),y&&(this.yylineno+=y.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:y?y[y.length-1].length-y[y.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],a=this.performAction.call(this,this.yy,this,i,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),a)return a;if(this._backtrack){for(var o in p)this[o]=p[o];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var n,i,a,y;this._more||(this.yytext="",this.match="");for(var p=this._currentRules(),o=0;o<p.length;o++)if(a=this._input.match(this.rules[p[o]]),a&&(!i||a[0].length>i[0].length)){if(i=a,y=o,this.options.backtrack_lexer){if(n=this.test_match(a,p[o]),n!==!1)return n;if(this._backtrack){i=!1;continue}else return!1}else if(!this.options.flex)break}return i?(n=this.test_match(i,p[y]),n!==!1?n:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var i=this.next();return i||this.lex()},begin:function(i){this.conditionStack.push(i)},popState:function(){var i=this.conditionStack.length-1;return i>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(i){return i=this.conditionStack.length-1-Math.abs(i||0),i>=0?this.conditionStack[i]:"INITIAL"},pushState:function(i){this.begin(i)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(i,a,y,p){switch(y){case 0:break;case 1:break;case 2:return 10;case 3:break;case 4:break;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};return g}();d.lexer=_;function x(){this.yy={}}return x.prototype=d,d.Parser=x,new x}();z.parser=z;const J=z;let O="";const E=[],h=[],m=[],v=function(){E.length=0,h.length=0,O="",m.length=0,(0,k.v)()},T=function(t){O=t,E.push(t)},W=function(){return E},mt=function(){let t=it();const e=100;let r=0;for(;!t&&r<e;)t=it(),r++;return h.push(...m),h},xt=function(){const t=[];return h.forEach(r=>{r.people&&t.push(...r.people)}),[...new Set(t)].sort()},_t=function(t,e){const r=e.substr(1).split(":");let l=0,s=[];r.length===1?(l=Number(r[0]),s=[]):(l=Number(r[0]),s=r[1].split(","));const u=s.map(f=>f.trim()),c={section:O,type:O,people:u,task:t,score:l};m.push(c)},kt=function(t){const e={section:O,type:O,description:t,task:t,classes:[]};h.push(e)},it=function(){const t=function(r){return m[r].processed};let e=!0;for(const[r,l]of m.entries())t(r),e=e&&l.processed;return e},bt=function(){return xt()},at={getConfig:()=>(0,k.c)().journey,clear:v,setDiagramTitle:k.q,getDiagramTitle:k.t,setAccTitle:k.s,getAccTitle:k.g,setAccDescription:k.b,getAccDescription:k.a,addSection:T,getSections:W,getTasks:mt,addTask:_t,addTaskOrg:kt,getActors:bt},vt=t=>`.label {
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
`,Z=function(t,e){return(0,R.d)(t,e)},wt=function(t,e){const l=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),s=t.append("g");s.append("circle").attr("cx",e.cx-15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),s.append("circle").attr("cx",e.cx+15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function u(d){const _=(0,V.arc)().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);d.append("path").attr("class","mouth").attr("d",_).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}function c(d){const _=(0,V.arc)().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);d.append("path").attr("class","mouth").attr("d",_).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}function f(d){d.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return e.score>3?u(s):e.score<3?c(s):f(s),l},ot=function(t,e){const r=t.append("circle");return r.attr("cx",e.cx),r.attr("cy",e.cy),r.attr("class","actor-"+e.pos),r.attr("fill",e.fill),r.attr("stroke",e.stroke),r.attr("r",e.r),r.class!==void 0&&r.attr("class",r.class),e.title!==void 0&&r.append("title").text(e.title),r},lt=function(t,e){return(0,R.f)(t,e)},Et=function(t,e){function r(s,u,c,f,d){return s+","+u+" "+(s+c)+","+u+" "+(s+c)+","+(u+f-d)+" "+(s+c-d*1.2)+","+(u+f)+" "+s+","+(u+f)}const l=t.append("polygon");l.attr("points",r(e.x,e.y,50,20,7)),l.attr("class","labelBox"),e.y=e.y+e.labelMargin,e.x=e.x+.5*e.labelMargin,lt(t,e)},Mt=function(t,e,r){const l=t.append("g"),s=(0,R.g)();s.x=e.x,s.y=e.y,s.fill=e.fill,s.width=r.width*e.taskCount+r.diagramMarginX*(e.taskCount-1),s.height=r.height,s.class="journey-section section-type-"+e.num,s.rx=3,s.ry=3,Z(l,s),ht(r)(e.text,l,s.x,s.y,s.width,s.height,{class:"journey-section section-type-"+e.num},r,e.colour)};let ct=-1;const Tt=function(t,e,r){const l=e.x+r.width/2,s=t.append("g");ct++;const u=300+5*30;s.append("line").attr("id","task"+ct).attr("x1",l).attr("y1",e.y).attr("x2",l).attr("y2",u).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),wt(s,{cx:l,cy:300+(5-e.score)*30,score:e.score});const c=(0,R.g)();c.x=e.x,c.y=e.y,c.fill=e.fill,c.width=r.width,c.height=r.height,c.class="task task-type-"+e.num,c.rx=3,c.ry=3,Z(s,c);let f=e.x+14;e.people.forEach(d=>{const _=e.actors[d].color,x={cx:f,cy:e.y,r:7,fill:_,stroke:"#000",title:d,pos:e.actors[d].position};ot(s,x),f+=10}),ht(r)(e.task,s,c.x,c.y,c.width,c.height,{class:"task"},r,e.colour)},Pt=function(t,e){(0,R.a)(t,e)},ht=function(){function t(s,u,c,f,d,_,x,g){const n=u.append("text").attr("x",c+d/2).attr("y",f+_/2+5).style("font-color",g).style("text-anchor","middle").text(s);l(n,x)}function e(s,u,c,f,d,_,x,g,n){const{taskFontSize:i,taskFontFamily:a}=g,y=s.split(/<br\s*\/?>/gi);for(let p=0;p<y.length;p++){const o=p*i-i*(y.length-1)/2,C=u.append("text").attr("x",c+d/2).attr("y",f).attr("fill",n).style("text-anchor","middle").style("font-size",i).style("font-family",a);C.append("tspan").attr("x",c+d/2).attr("dy",o).text(y[p]),C.attr("y",f+_/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),l(C,x)}}function r(s,u,c,f,d,_,x,g){const n=u.append("switch"),a=n.append("foreignObject").attr("x",c).attr("y",f).attr("width",d).attr("height",_).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");a.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(s),e(s,n,c,f,d,_,x,g),l(a,x)}function l(s,u){for(const c in u)c in u&&s.attr(c,u[c])}return function(s){return s.textPlacement==="fo"?r:s.textPlacement==="old"?t:e}}(),U={drawRect:Z,drawCircle:ot,drawSection:Mt,drawText:lt,drawLabel:Et,drawTask:Tt,drawBackgroundRect:Pt,initGraphics:function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")}},$t=function(t){Object.keys(t).forEach(function(r){K[r]=t[r]})},I={};function St(t){const e=(0,k.c)().journey;let r=60;Object.keys(I).forEach(l=>{const s=I[l].color,u={cx:20,cy:r,r:7,fill:s,stroke:"#000",pos:I[l].position};U.drawCircle(t,u);const c={x:40,y:r+7,fill:"#666",text:l,textMargin:e.boxTextMargin|5};U.drawText(t,c),r+=20})}const K=(0,k.c)().journey,B=K.leftMargin,It=function(t,e,r,l){const s=(0,k.c)().journey,u=(0,k.c)().securityLevel;let c;u==="sandbox"&&(c=(0,V.select)("#i"+e));const f=u==="sandbox"?(0,V.select)(c.nodes()[0].contentDocument.body):(0,V.select)("body");P.init();const d=f.select("#"+e);U.initGraphics(d);const _=l.db.getTasks(),x=l.db.getDiagramTitle(),g=l.db.getActors();for(const o in I)delete I[o];let n=0;g.forEach(o=>{I[o]={color:s.actorColours[n%s.actorColours.length],position:n},n++}),St(d),P.insert(0,0,B,Object.keys(I).length*50),Ct(d,_,0);const i=P.getBounds();x&&d.append("text").text(x).attr("x",B).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);const a=i.stopy-i.starty+2*s.diagramMarginY,y=B+i.stopx+2*s.diagramMarginX;(0,k.i)(d,a,y,s.useMaxWidth),d.append("line").attr("x1",B).attr("y1",s.height*4).attr("x2",y-B-4).attr("y2",s.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");const p=x?70:0;d.attr("viewBox",`${i.startx} -25 ${y} ${a+p}`),d.attr("preserveAspectRatio","xMinYMin meet"),d.attr("height",a+p+25)},P={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},updateVal:function(t,e,r,l){t[e]===void 0?t[e]=r:t[e]=l(r,t[e])},updateBounds:function(t,e,r,l){const s=(0,k.c)().journey,u=this;let c=0;function f(d){return function(x){c++;const g=u.sequenceItems.length-c+1;u.updateVal(x,"starty",e-g*s.boxMargin,Math.min),u.updateVal(x,"stopy",l+g*s.boxMargin,Math.max),u.updateVal(P.data,"startx",t-g*s.boxMargin,Math.min),u.updateVal(P.data,"stopx",r+g*s.boxMargin,Math.max),d!=="activation"&&(u.updateVal(x,"startx",t-g*s.boxMargin,Math.min),u.updateVal(x,"stopx",r+g*s.boxMargin,Math.max),u.updateVal(P.data,"starty",e-g*s.boxMargin,Math.min),u.updateVal(P.data,"stopy",l+g*s.boxMargin,Math.max))}}this.sequenceItems.forEach(f())},insert:function(t,e,r,l){const s=Math.min(t,r),u=Math.max(t,r),c=Math.min(e,l),f=Math.max(e,l);this.updateVal(P.data,"startx",s,Math.min),this.updateVal(P.data,"starty",c,Math.min),this.updateVal(P.data,"stopx",u,Math.max),this.updateVal(P.data,"stopy",f,Math.max),this.updateBounds(s,c,u,f)},bumpVerticalPos:function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},getVerticalPos:function(){return this.verticalPos},getBounds:function(){return this.data}},Q=K.sectionFills,ut=K.sectionColours,Ct=function(t,e,r){const l=(0,k.c)().journey;let s="";const u=l.height*2+l.diagramMarginY,c=r+u;let f=0,d="#CCC",_="black",x=0;for(const[g,n]of e.entries()){if(s!==n.section){d=Q[f%Q.length],x=f%Q.length,_=ut[f%ut.length];let a=0;const y=n.section;for(let o=g;o<e.length&&e[o].section==y;o++)a=a+1;const p={x:g*l.taskMargin+g*l.width+B,y:50,text:n.section,fill:d,num:x,colour:_,taskCount:a};U.drawSection(t,p,l),s=n.section,f++}const i=n.people.reduce((a,y)=>(I[y]&&(a[y]=I[y]),a),{});n.x=g*l.taskMargin+g*l.width+B,n.y=c,n.width=l.diagramMarginX,n.height=l.diagramMarginY,n.colour=_,n.fill=d,n.num=x,n.actors=i,U.drawTask(t,n,l),P.insert(n.x,n.y,n.x+n.width+l.taskMargin,300+5*30)}},yt={setConf:$t,draw:It},At={parser:J,db:at,renderer:yt,styles:vt,init:t=>{yt.setConf(t.journey),at.clear()}}},28259:function(gt,H,S){S.d(H,{a:function(){return nt},b:function(){return z},c:function(){return rt},d:function(){return R},e:function(){return O},f:function(){return st},g:function(){return J}});var k=S(16750),V=S(65950);const R=(E,h)=>{const m=E.append("rect");if(m.attr("x",h.x),m.attr("y",h.y),m.attr("fill",h.fill),m.attr("stroke",h.stroke),m.attr("width",h.width),m.attr("height",h.height),h.name&&m.attr("name",h.name),h.rx!==void 0&&m.attr("rx",h.rx),h.ry!==void 0&&m.attr("ry",h.ry),h.attrs!==void 0)for(const v in h.attrs)m.attr(v,h.attrs[v]);return h.class!==void 0&&m.attr("class",h.class),m},nt=(E,h)=>{const m={x:h.startx,y:h.starty,width:h.stopx-h.startx,height:h.stopy-h.starty,fill:h.fill,stroke:h.stroke,class:"rect"};R(E,m).lower()},st=(E,h)=>{const m=h.text.replace(V.J," "),v=E.append("text");v.attr("x",h.x),v.attr("y",h.y),v.attr("class","legend"),v.style("text-anchor",h.anchor),h.class!==void 0&&v.attr("class",h.class);const T=v.append("tspan");return T.attr("x",h.x+h.textMargin*2),T.text(m),v},rt=(E,h,m,v)=>{const T=E.append("image");T.attr("x",h),T.attr("y",m);const W=(0,k.Jf)(v);T.attr("xlink:href",W)},z=(E,h,m,v)=>{const T=E.append("use");T.attr("x",h),T.attr("y",m);const W=(0,k.Jf)(v);T.attr("xlink:href",`#${W}`)},J=()=>({x:0,y:0,width:100,height:100,fill:"#EDF2AE",stroke:"#666",anchor:"start",rx:0,ry:0}),O=()=>({x:0,y:0,width:100,height:100,"text-anchor":"start",style:"#666",textMargin:0,rx:0,ry:0,tspan:!0})}}]);

//# sourceMappingURL=6420.72d4d9b6a8e61af77c47.js.map