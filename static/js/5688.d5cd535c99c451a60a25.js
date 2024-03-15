"use strict";var Ee=(Xt,dt,m)=>new Promise((h,G)=>{var z=L=>{try{X(m.next(L))}catch(V){G(V)}},D=L=>{try{X(m.throw(L))}catch(V){G(V)}},X=L=>L.done?h(L.value):Promise.resolve(L.value).then(z,D);X((m=m.apply(Xt,dt)).next())});(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[5688],{45688:function(Xt,dt,m){m.d(dt,{diagram:function(){return ne}});var h=m(26292),G=m(697),z=m(66439),D=m(85010),X=m(92746),L=m(74353),V=m(16750),de=m(42838),fe=m(30944),ft=m(14075);const J="rect",Q="rectWithTitle",Dt="start",mt="end",kt="divider",xt="roundedWithTitle",At="note",Jt="noteGroup",U="statediagram",Ct=`${U}-state`,Z="transition",q="note",at=`${Z} note-edge`,k=`${U}-${q}`,Lt=`${U}-cluster`,qt=`${U}-cluster-alt`,tt="parent",vt="note",te="state",F="----",ee=`${F}${vt}`,Ot=`${F}${tt}`,$="fill:none",_t="fill: #333",Y="c",Rt="text",It="normal";let ct={},R=0;const yt=function(c){const E=Object.keys(c);for(const u of E)c[u]},se=function(c,E){return E.db.extract(E.db.getRootDocV2()),E.db.getClasses()};function ie(c){return c==null?"":c.classes?c.classes.join(" "):""}function pt(c="",E=0,u="",g=F){const A=u!==null&&u.length>0?`${g}${u}`:"";return`${te}-${c}${A}-${E}`}const j=(c,E,u,g,A,v)=>{const d=u.id,lt=ie(g[d]);if(d!=="root"){let W=J;u.start===!0&&(W=Dt),u.start===!1&&(W=mt),u.type!==h.D&&(W=u.type),ct[d]||(ct[d]={id:d,shape:W,description:D.e.sanitizeText(d,(0,D.c)()),classes:`${lt} ${Ct}`});const t=ct[d];u.description&&(Array.isArray(t.description)?(t.shape=Q,t.description.push(u.description)):t.description.length>0?(t.shape=Q,t.description===d?t.description=[u.description]:t.description=[t.description,u.description]):(t.shape=J,t.description=u.description),t.description=D.e.sanitizeTextOrArray(t.description,(0,D.c)())),t.description.length===1&&t.shape===Q&&(t.shape=J),!t.type&&u.doc&&(D.l.info("Setting cluster for ",d,Et(u)),t.type="group",t.dir=Et(u),t.shape=u.type===h.a?kt:xt,t.classes=t.classes+" "+Lt+" "+(v?qt:""));const e={labelStyle:"",shape:t.shape,labelText:t.description,classes:t.classes,style:"",id:d,dir:t.dir,domId:pt(d,R),type:t.type,padding:15};if(e.centerLabel=!0,u.note){const r={labelStyle:"",shape:At,labelText:u.note.text,classes:k,style:"",id:d+ee+"-"+R,domId:pt(d,R,vt),type:t.type,padding:15},l={labelStyle:"",shape:Jt,labelText:u.note.text,classes:t.classes,style:"",id:d+Ot,domId:pt(d,R,tt),type:"group",padding:0};R++;const p=d+Ot;c.setNode(p,l),c.setNode(r.id,r),c.setNode(d,e),c.setParent(d,p),c.setParent(r.id,p);let y=d,S=r.id;u.note.position==="left of"&&(y=r.id,S=d),c.setEdge(y,S,{arrowhead:"none",arrowType:"",style:$,labelStyle:"",classes:at,arrowheadStyle:_t,labelpos:Y,labelType:Rt,thickness:It})}else c.setNode(d,e)}E&&E.id!=="root"&&(D.l.trace("Setting node ",d," to be child of its parent ",E.id),c.setParent(d,E.id)),u.doc&&(D.l.trace("Adding nodes children "),St(c,u,u.doc,g,A,!v))},St=(c,E,u,g,A,v)=>{D.l.trace("items",u),u.forEach(d=>{switch(d.stmt){case h.b:j(c,E,d,g,A,v);break;case h.D:j(c,E,d,g,A,v);break;case h.S:{j(c,E,d.state1,g,A,v),j(c,E,d.state2,g,A,v);const lt={id:"edge"+R,arrowhead:"normal",arrowTypeEnd:"arrow_barb",style:$,labelStyle:"",label:D.e.sanitizeText(d.description,(0,D.c)()),arrowheadStyle:_t,labelpos:Y,labelType:Rt,thickness:It,classes:Z};c.setEdge(d.state1.id,d.state2.id,lt,R),R++}break}})},Et=(c,E=h.c)=>{let u=E;if(c.doc)for(let g=0;g<c.doc.length;g++){const A=c.doc[g];A.stmt==="dir"&&(u=A.value)}return u},Nt={setConf:yt,getClasses:se,draw:function(c,E,u,g){return Ee(this,null,function*(){D.l.info("Drawing state diagram (v2)",E),ct={},g.db.getDirection();const{securityLevel:A,state:v}=(0,D.c)(),d=v.nodeSpacing||50,lt=v.rankSpacing||50;D.l.info(g.db.getRootDocV2()),g.db.extract(g.db.getRootDocV2()),D.l.info(g.db.getRootDocV2());const W=g.db.getStates(),t=new G.T({multigraph:!0,compound:!0}).setGraph({rankdir:Et(g.db.getRootDocV2()),nodesep:d,ranksep:lt,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}});j(t,void 0,g.db.getRootDocV2(),W,g.db,!0);let e;A==="sandbox"&&(e=(0,z.Ltv)("#i"+E));const r=A==="sandbox"?(0,z.Ltv)(e.nodes()[0].contentDocument.body):(0,z.Ltv)("body"),l=r.select(`[id="${E}"]`),p=r.select("#"+E+" g");yield(0,X.r)(p,t,["barb"],U,E);const y=8;D.u.insertTitle(l,"statediagramTitleText",v.titleTopMargin,g.db.getDiagramTitle());const S=l.node().getBBox(),I=S.width+y*2,T=S.height+y*2;l.attr("class",U);const N=l.node().getBBox();(0,D.i)(l,T,I,v.useMaxWidth);const O=`${N.x-y} ${N.y-y} ${I} ${T}`;D.l.debug(`viewBox ${O}`),l.attr("viewBox",O);const et=document.querySelectorAll('[id="'+E+'"] .edgeLabel .label');for(const H of et){const st=H.getBBox(),w=document.createElementNS("http://www.w3.org/2000/svg",J);w.setAttribute("rx",0),w.setAttribute("ry",0),w.setAttribute("width",st.width),w.setAttribute("height",st.height),H.insertBefore(w,H.firstChild)}})}},ne={parser:h.p,db:h.d,renderer:Nt,styles:h.s,init:c=>{c.state||(c.state={}),c.state.arrowMarkerAbsolute=c.arrowMarkerAbsolute,h.d.clear()}}},26292:function(Xt,dt,m){m.d(dt,{D:function(){return ft},S:function(){return V},a:function(){return J},b:function(){return L},c:function(){return X},d:function(){return d},p:function(){return z},s:function(){return W}});var h=m(85010),G=function(){var t=function(K,n,a,i){for(a=a||{},i=K.length;i--;a[K[i]]=n);return a},e=[1,2],r=[1,3],l=[1,4],p=[2,4],y=[1,9],S=[1,11],I=[1,15],T=[1,16],N=[1,17],O=[1,18],et=[1,30],H=[1,19],st=[1,20],w=[1,21],Pt=[1,22],$t=[1,23],wt=[1,25],Bt=[1,26],Mt=[1,27],Gt=[1,28],Vt=[1,29],Ut=[1,32],Ft=[1,33],Yt=[1,34],jt=[1,35],Tt=[1,31],f=[1,4,5,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],Wt=[1,4,5,13,14,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],pe=[4,5,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],re={trace:function(){},yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,cssClassStatement:11,idStatement:12,DESCR:13,"-->":14,HIDE_EMPTY:15,scale:16,WIDTH:17,COMPOSIT_STATE:18,STRUCT_START:19,STRUCT_STOP:20,STATE_DESCR:21,AS:22,ID:23,FORK:24,JOIN:25,CHOICE:26,CONCURRENT:27,note:28,notePosition:29,NOTE_TEXT:30,direction:31,acc_title:32,acc_title_value:33,acc_descr:34,acc_descr_value:35,acc_descr_multiline_value:36,classDef:37,CLASSDEF_ID:38,CLASSDEF_STYLEOPTS:39,DEFAULT:40,class:41,CLASSENTITY_IDS:42,STYLECLASS:43,direction_tb:44,direction_bt:45,direction_rl:46,direction_lr:47,eol:48,";":49,EDGE_STATE:50,STYLE_SEPARATOR:51,left_of:52,right_of:53,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",13:"DESCR",14:"-->",15:"HIDE_EMPTY",16:"scale",17:"WIDTH",18:"COMPOSIT_STATE",19:"STRUCT_START",20:"STRUCT_STOP",21:"STATE_DESCR",22:"AS",23:"ID",24:"FORK",25:"JOIN",26:"CHOICE",27:"CONCURRENT",28:"note",30:"NOTE_TEXT",32:"acc_title",33:"acc_title_value",34:"acc_descr",35:"acc_descr_value",36:"acc_descr_multiline_value",37:"classDef",38:"CLASSDEF_ID",39:"CLASSDEF_STYLEOPTS",40:"DEFAULT",41:"class",42:"CLASSENTITY_IDS",43:"STYLECLASS",44:"direction_tb",45:"direction_bt",46:"direction_rl",47:"direction_lr",49:";",50:"EDGE_STATE",51:"STYLE_SEPARATOR",52:"left_of",53:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[10,3],[10,3],[11,3],[31,1],[31,1],[31,1],[31,1],[48,1],[48,1],[12,1],[12,1],[12,3],[12,3],[29,1],[29,1]],performAction:function(n,a,i,_,b,s,gt){var o=s.length-1;switch(b){case 3:return _.setRootDoc(s[o]),s[o];case 4:this.$=[];break;case 5:s[o]!="nl"&&(s[o-1].push(s[o]),this.$=s[o-1]);break;case 6:case 7:this.$=s[o];break;case 8:this.$="nl";break;case 11:this.$=s[o];break;case 12:const bt=s[o-1];bt.description=_.trimColon(s[o]),this.$=bt;break;case 13:this.$={stmt:"relation",state1:s[o-2],state2:s[o]};break;case 14:const oe=_.trimColon(s[o]);this.$={stmt:"relation",state1:s[o-3],state2:s[o-1],description:oe};break;case 18:this.$={stmt:"state",id:s[o-3],type:"default",description:"",doc:s[o-1]};break;case 19:var it=s[o],ht=s[o-2].trim();if(s[o].match(":")){var Ht=s[o].split(":");it=Ht[0],ht=[ht,Ht[1]]}this.$={stmt:"state",id:it,type:"default",description:ht};break;case 20:this.$={stmt:"state",id:s[o-3],type:"default",description:s[o-5],doc:s[o-1]};break;case 21:this.$={stmt:"state",id:s[o],type:"fork"};break;case 22:this.$={stmt:"state",id:s[o],type:"join"};break;case 23:this.$={stmt:"state",id:s[o],type:"choice"};break;case 24:this.$={stmt:"state",id:_.getDividerId(),type:"divider"};break;case 25:this.$={stmt:"state",id:s[o-1].trim(),note:{position:s[o-2].trim(),text:s[o].trim()}};break;case 28:this.$=s[o].trim(),_.setAccTitle(this.$);break;case 29:case 30:this.$=s[o].trim(),_.setAccDescription(this.$);break;case 31:case 32:this.$={stmt:"classDef",id:s[o-1].trim(),classes:s[o].trim()};break;case 33:this.$={stmt:"applyClass",id:s[o-1].trim(),styleClass:s[o].trim()};break;case 34:_.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 35:_.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 36:_.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 37:_.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 40:case 41:this.$={stmt:"state",id:s[o].trim(),type:"default",description:""};break;case 42:this.$={stmt:"state",id:s[o-2].trim(),classes:[s[o].trim()],type:"default",description:""};break;case 43:this.$={stmt:"state",id:s[o-2].trim(),classes:[s[o].trim()],type:"default",description:""};break}},table:[{3:1,4:e,5:r,6:l},{1:[3]},{3:5,4:e,5:r,6:l},{3:6,4:e,5:r,6:l},t([1,4,5,15,16,18,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],p,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:y,5:S,8:8,9:10,10:12,11:13,12:14,15:I,16:T,18:N,21:O,23:et,24:H,25:st,26:w,27:Pt,28:$t,31:24,32:wt,34:Bt,36:Mt,37:Gt,41:Vt,44:Ut,45:Ft,46:Yt,47:jt,50:Tt},t(f,[2,5]),{9:36,10:12,11:13,12:14,15:I,16:T,18:N,21:O,23:et,24:H,25:st,26:w,27:Pt,28:$t,31:24,32:wt,34:Bt,36:Mt,37:Gt,41:Vt,44:Ut,45:Ft,46:Yt,47:jt,50:Tt},t(f,[2,7]),t(f,[2,8]),t(f,[2,9]),t(f,[2,10]),t(f,[2,11],{13:[1,37],14:[1,38]}),t(f,[2,15]),{17:[1,39]},t(f,[2,17],{19:[1,40]}),{22:[1,41]},t(f,[2,21]),t(f,[2,22]),t(f,[2,23]),t(f,[2,24]),{29:42,30:[1,43],52:[1,44],53:[1,45]},t(f,[2,27]),{33:[1,46]},{35:[1,47]},t(f,[2,30]),{38:[1,48],40:[1,49]},{42:[1,50]},t(Wt,[2,40],{51:[1,51]}),t(Wt,[2,41],{51:[1,52]}),t(f,[2,34]),t(f,[2,35]),t(f,[2,36]),t(f,[2,37]),t(f,[2,6]),t(f,[2,12]),{12:53,23:et,50:Tt},t(f,[2,16]),t(pe,p,{7:54}),{23:[1,55]},{23:[1,56]},{22:[1,57]},{23:[2,44]},{23:[2,45]},t(f,[2,28]),t(f,[2,29]),{39:[1,58]},{39:[1,59]},{43:[1,60]},{23:[1,61]},{23:[1,62]},t(f,[2,13],{13:[1,63]}),{4:y,5:S,8:8,9:10,10:12,11:13,12:14,15:I,16:T,18:N,20:[1,64],21:O,23:et,24:H,25:st,26:w,27:Pt,28:$t,31:24,32:wt,34:Bt,36:Mt,37:Gt,41:Vt,44:Ut,45:Ft,46:Yt,47:jt,50:Tt},t(f,[2,19],{19:[1,65]}),{30:[1,66]},{23:[1,67]},t(f,[2,31]),t(f,[2,32]),t(f,[2,33]),t(Wt,[2,42]),t(Wt,[2,43]),t(f,[2,14]),t(f,[2,18]),t(pe,p,{7:68}),t(f,[2,25]),t(f,[2,26]),{4:y,5:S,8:8,9:10,10:12,11:13,12:14,15:I,16:T,18:N,20:[1,69],21:O,23:et,24:H,25:st,26:w,27:Pt,28:$t,31:24,32:wt,34:Bt,36:Mt,37:Gt,41:Vt,44:Ut,45:Ft,46:Yt,47:jt,50:Tt},t(f,[2,20])],defaultActions:{5:[2,1],6:[2,2],44:[2,44],45:[2,45]},parseError:function(n,a){if(a.recoverable)this.trace(n);else{var i=new Error(n);throw i.hash=a,i}},parse:function(n){var a=this,i=[0],_=[],b=[null],s=[],gt=this.table,o="",it=0,ht=0,Ht=2,bt=1,oe=s.slice.call(arguments,1),x=Object.create(this.lexer),nt={yy:{}};for(var ce in this.yy)Object.prototype.hasOwnProperty.call(this.yy,ce)&&(nt.yy[ce]=this.yy[ce]);x.setInput(n,nt.yy),nt.yy.lexer=x,nt.yy.parser=this,typeof x.yylloc=="undefined"&&(x.yylloc={});var le=x.yylloc;s.push(le);var ge=x.options&&x.options.ranges;typeof nt.yy.parseError=="function"?this.parseError=nt.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function be(){var M;return M=_.pop()||x.lex()||bt,typeof M!="number"&&(M instanceof Array&&(_=M,M=_.pop()),M=a.symbols_[M]||M),M}for(var C,rt,P,he,ut={},Kt,B,Se,zt;;){if(rt=i[i.length-1],this.defaultActions[rt]?P=this.defaultActions[rt]:((C===null||typeof C=="undefined")&&(C=be()),P=gt[rt]&&gt[rt][C]),typeof P=="undefined"||!P.length||!P[0]){var ue="";zt=[];for(Kt in gt[rt])this.terminals_[Kt]&&Kt>Ht&&zt.push("'"+this.terminals_[Kt]+"'");x.showPosition?ue="Parse error on line "+(it+1)+`:
`+x.showPosition()+`
Expecting `+zt.join(", ")+", got '"+(this.terminals_[C]||C)+"'":ue="Parse error on line "+(it+1)+": Unexpected "+(C==bt?"end of input":"'"+(this.terminals_[C]||C)+"'"),this.parseError(ue,{text:x.match,token:this.terminals_[C]||C,line:x.yylineno,loc:le,expected:zt})}if(P[0]instanceof Array&&P.length>1)throw new Error("Parse Error: multiple actions possible at state: "+rt+", token: "+C);switch(P[0]){case 1:i.push(C),b.push(x.yytext),s.push(x.yylloc),i.push(P[1]),C=null,ht=x.yyleng,o=x.yytext,it=x.yylineno,le=x.yylloc;break;case 2:if(B=this.productions_[P[1]][1],ut.$=b[b.length-B],ut._$={first_line:s[s.length-(B||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(B||1)].first_column,last_column:s[s.length-1].last_column},ge&&(ut._$.range=[s[s.length-(B||1)].range[0],s[s.length-1].range[1]]),he=this.performAction.apply(ut,[o,ht,it,nt.yy,P[1],b,s].concat(oe)),typeof he!="undefined")return he;B&&(i=i.slice(0,-1*B*2),b=b.slice(0,-1*B),s=s.slice(0,-1*B)),i.push(this.productions_[P[1]][0]),b.push(ut.$),s.push(ut._$),Se=gt[i[i.length-2]][i[i.length-1]],i.push(Se);break;case 3:return!0}}return!0}},Te=function(){var K={EOF:1,parseError:function(a,i){if(this.yy.parser)this.yy.parser.parseError(a,i);else throw new Error(a)},setInput:function(n,a){return this.yy=a||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var n=this._input[0];this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n;var a=n.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},unput:function(n){var a=n.length,i=n.split(/(?:\r\n?|\n)/g);this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var _=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var b=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===_.length?this.yylloc.first_column:0)+_[_.length-i.length].length-i[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[b[0],b[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(n){this.unput(this.match.slice(n))},pastInput:function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var n=this.pastInput(),a=new Array(n.length+1).join("-");return n+this.upcomingInput()+`
`+a+"^"},test_match:function(n,a){var i,_,b;if(this.options.backtrack_lexer&&(b={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(b.yylloc.range=this.yylloc.range.slice(0))),_=n[0].match(/(?:\r\n?|\n).*/g),_&&(this.yylineno+=_.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:_?_[_.length-1].length-_[_.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],i=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack){for(var s in b)this[s]=b[s];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var n,a,i,_;this._more||(this.yytext="",this.match="");for(var b=this._currentRules(),s=0;s<b.length;s++)if(i=this._input.match(this.rules[b[s]]),i&&(!a||i[0].length>a[0].length)){if(a=i,_=s,this.options.backtrack_lexer){if(n=this.test_match(i,b[s]),n!==!1)return n;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(n=this.test_match(a,b[_]),n!==!1?n:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var a=this.next();return a||this.lex()},begin:function(a){this.conditionStack.push(a)},popState:function(){var a=this.conditionStack.length-1;return a>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(a){return a=this.conditionStack.length-1-Math.abs(a||0),a>=0?this.conditionStack[a]:"INITIAL"},pushState:function(a){this.begin(a)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(a,i,_,b){switch(_){case 0:return 40;case 1:return 44;case 2:return 45;case 3:return 46;case 4:return 47;case 5:break;case 6:break;case 7:return 5;case 8:break;case 9:break;case 10:break;case 11:break;case 12:return this.pushState("SCALE"),16;case 13:return 17;case 14:this.popState();break;case 15:return this.begin("acc_title"),32;case 16:return this.popState(),"acc_title_value";case 17:return this.begin("acc_descr"),34;case 18:return this.popState(),"acc_descr_value";case 19:this.begin("acc_descr_multiline");break;case 20:this.popState();break;case 21:return"acc_descr_multiline_value";case 22:return this.pushState("CLASSDEF"),37;case 23:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 24:return this.popState(),this.pushState("CLASSDEFID"),38;case 25:return this.popState(),39;case 26:return this.pushState("CLASS"),41;case 27:return this.popState(),this.pushState("CLASS_STYLE"),42;case 28:return this.popState(),43;case 29:return this.pushState("SCALE"),16;case 30:return 17;case 31:this.popState();break;case 32:this.pushState("STATE");break;case 33:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),24;case 34:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),25;case 35:return this.popState(),i.yytext=i.yytext.slice(0,-10).trim(),26;case 36:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),24;case 37:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),25;case 38:return this.popState(),i.yytext=i.yytext.slice(0,-10).trim(),26;case 39:return 44;case 40:return 45;case 41:return 46;case 42:return 47;case 43:this.pushState("STATE_STRING");break;case 44:return this.pushState("STATE_ID"),"AS";case 45:return this.popState(),"ID";case 46:this.popState();break;case 47:return"STATE_DESCR";case 48:return 18;case 49:this.popState();break;case 50:return this.popState(),this.pushState("struct"),19;case 51:break;case 52:return this.popState(),20;case 53:break;case 54:return this.begin("NOTE"),28;case 55:return this.popState(),this.pushState("NOTE_ID"),52;case 56:return this.popState(),this.pushState("NOTE_ID"),53;case 57:this.popState(),this.pushState("FLOATING_NOTE");break;case 58:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 59:break;case 60:return"NOTE_TEXT";case 61:return this.popState(),"ID";case 62:return this.popState(),this.pushState("NOTE_TEXT"),23;case 63:return this.popState(),i.yytext=i.yytext.substr(2).trim(),30;case 64:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),30;case 65:return 6;case 66:return 6;case 67:return 15;case 68:return 50;case 69:return 23;case 70:return i.yytext=i.yytext.trim(),13;case 71:return 14;case 72:return 27;case 73:return 51;case 74:return 5;case 75:return"INVALID"}},rules:[/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[9,10],inclusive:!1},struct:{rules:[9,10,22,26,32,39,40,41,42,51,52,53,54,68,69,70,71,72],inclusive:!1},FLOATING_NOTE_ID:{rules:[61],inclusive:!1},FLOATING_NOTE:{rules:[58,59,60],inclusive:!1},NOTE_TEXT:{rules:[63,64],inclusive:!1},NOTE_ID:{rules:[62],inclusive:!1},NOTE:{rules:[55,56,57],inclusive:!1},CLASS_STYLE:{rules:[28],inclusive:!1},CLASS:{rules:[27],inclusive:!1},CLASSDEFID:{rules:[25],inclusive:!1},CLASSDEF:{rules:[23,24],inclusive:!1},acc_descr_multiline:{rules:[20,21],inclusive:!1},acc_descr:{rules:[18],inclusive:!1},acc_title:{rules:[16],inclusive:!1},SCALE:{rules:[13,14,30,31],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[45],inclusive:!1},STATE_STRING:{rules:[46,47],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[9,10,33,34,35,36,37,38,43,44,48,49,50],inclusive:!1},ID:{rules:[9,10],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,10,11,12,15,17,19,22,26,29,32,50,54,65,66,67,68,69,70,71,73,74,75],inclusive:!0}}};return K}();re.lexer=Te;function ae(){this.yy={}}return ae.prototype=re,re.Parser=ae,new ae}();G.parser=G;const z=G,D="LR",X="TB",L="state",V="relation",de="classDef",fe="applyClass",ft="default",J="divider",Q="[*]",Dt="start",mt=Q,kt="end",xt="color",At="fill",Jt="bgFill",U=",";function Qt(){return{}}let Ct=D,Z=[],q=Qt();const Zt=()=>({relations:[],states:{},documents:{}});let at={root:Zt()},k=at.root,ot=0,Lt=0;const _e={LINE:0,DOTTED_LINE:1},qt={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},tt=t=>JSON.parse(JSON.stringify(t)),vt=t=>{h.l.info("Setting root doc",t),Z=t},te=()=>Z,F=(t,e,r)=>{if(e.stmt===V)F(t,e.state1,!0),F(t,e.state2,!1);else if(e.stmt===L&&(e.id==="[*]"?(e.id=r?t.id+"_start":t.id+"_end",e.start=r):e.id=e.id.trim()),e.doc){const l=[];let p=[],y;for(y=0;y<e.doc.length;y++)if(e.doc[y].type===J){const S=tt(e.doc[y]);S.doc=tt(p),l.push(S),p=[]}else p.push(e.doc[y]);if(l.length>0&&p.length>0){const S={stmt:L,id:(0,h.I)(),type:"divider",doc:tt(p)};l.push(tt(S)),e.doc=l}e.doc.forEach(S=>F(e,S,!0))}},ee=()=>(F({id:"root"},{id:"root",doc:Z},!0),{id:"root",doc:Z}),Ot=t=>{let e;t.doc?e=t.doc:e=t,h.l.info(e),_t(!0),h.l.info("Extract",e),e.forEach(r=>{switch(r.stmt){case L:$(r.id.trim(),r.type,r.doc,r.description,r.note,r.classes,r.styles,r.textStyles);break;case V:j(r.state1,r.state2,r.description);break;case de:Nt(r.id.trim(),r.classes);break;case fe:c(r.id.trim(),r.styleClass);break}})},$=function(t,e=ft,r=null,l=null,p=null,y=null,S=null,I=null){const T=t==null?void 0:t.trim();k.states[T]===void 0?(h.l.info("Adding state ",T,l),k.states[T]={id:T,descriptions:[],type:e,doc:r,note:p,classes:[],styles:[],textStyles:[]}):(k.states[T].doc||(k.states[T].doc=r),k.states[T].type||(k.states[T].type=e)),l&&(h.l.info("Setting state description",T,l),typeof l=="string"&&St(T,l.trim()),typeof l=="object"&&l.forEach(N=>St(T,N.trim()))),p&&(k.states[T].note=p,k.states[T].note.text=h.e.sanitizeText(k.states[T].note.text,(0,h.c)())),y&&(h.l.info("Setting state classes",T,y),(typeof y=="string"?[y]:y).forEach(O=>c(T,O.trim()))),S&&(h.l.info("Setting state styles",T,S),(typeof S=="string"?[S]:S).forEach(O=>E(T,O.trim()))),I&&(h.l.info("Setting state styles",T,S),(typeof I=="string"?[I]:I).forEach(O=>u(T,O.trim())))},_t=function(t){at={root:Zt()},k=at.root,ot=0,q=Qt(),t||(0,h.v)()},Y=function(t){return k.states[t]},Rt=function(){return k.states},It=function(){h.l.info("Documents = ",at)},ct=function(){return k.relations};function R(t=""){let e=t;return t===Q&&(ot++,e=`${Dt}${ot}`),e}function yt(t="",e=ft){return t===Q?Dt:e}function se(t=""){let e=t;return t===mt&&(ot++,e=`${kt}${ot}`),e}function ie(t="",e=ft){return t===mt?kt:e}function pt(t,e,r){let l=R(t.id.trim()),p=yt(t.id.trim(),t.type),y=R(e.id.trim()),S=yt(e.id.trim(),e.type);$(l,p,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),$(y,S,e.doc,e.description,e.note,e.classes,e.styles,e.textStyles),k.relations.push({id1:l,id2:y,relationTitle:h.e.sanitizeText(r,(0,h.c)())})}const j=function(t,e,r){if(typeof t=="object")pt(t,e,r);else{const l=R(t.trim()),p=yt(t),y=se(e.trim()),S=ie(e);$(l,p),$(y,S),k.relations.push({id1:l,id2:y,title:h.e.sanitizeText(r,(0,h.c)())})}},St=function(t,e){const r=k.states[t],l=e.startsWith(":")?e.replace(":","").trim():e;r.descriptions.push(h.e.sanitizeText(l,(0,h.c)()))},Et=function(t){return t.substring(0,1)===":"?t.substr(2).trim():t.trim()},ye=()=>(Lt++,"divider-id-"+Lt),Nt=function(t,e=""){q[t]===void 0&&(q[t]={id:t,styles:[],textStyles:[]});const r=q[t];e!=null&&e.split(U).forEach(l=>{const p=l.replace(/([^;]*);/,"$1").trim();if(l.match(xt)){const S=p.replace(At,Jt).replace(xt,At);r.textStyles.push(S)}r.styles.push(p)})},ne=function(){return q},c=function(t,e){t.split(",").forEach(function(r){let l=Y(r);if(l===void 0){const p=r.trim();$(p),l=Y(p)}l.classes.push(e)})},E=function(t,e){const r=Y(t);r!==void 0&&r.textStyles.push(e)},u=function(t,e){const r=Y(t);r!==void 0&&r.textStyles.push(e)},d={getConfig:()=>(0,h.c)().state,addState:$,clear:_t,getState:Y,getStates:Rt,getRelations:ct,getClasses:ne,getDirection:()=>Ct,addRelation:j,getDividerId:ye,setDirection:t=>{Ct=t},cleanupLabel:Et,lineType:_e,relationType:qt,logDocuments:It,getRootDoc:te,setRootDoc:vt,getRootDocV2:ee,extract:Ot,trimColon:t=>t&&t[0]===":"?t.substr(1).trim():t.trim(),getAccTitle:h.g,setAccTitle:h.s,getAccDescription:h.a,setAccDescription:h.b,addStyleClass:Nt,setCssClass:c,addDescription:St,setDiagramTitle:h.q,getDiagramTitle:h.t},W=t=>`
defs #statediagram-barbEnd {
    fill: ${t.transitionColor};
    stroke: ${t.transitionColor};
  }
g.stateGroup text {
  fill: ${t.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${t.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${t.stateLabelColor};
}

g.stateGroup rect {
  fill: ${t.mainBkg};
  stroke: ${t.nodeBorder};
}

g.stateGroup line {
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: 1;
  fill: none;
}

.stateGroup .composit {
  fill: ${t.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${t.noteBorderColor};
  fill: ${t.noteBkgColor};

  text {
    fill: ${t.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${t.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${t.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel .label text {
  fill: ${t.transitionLabelColor||t.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${t.transitionLabelColor||t.tertiaryTextColor};
}

.stateLabel text {
  fill: ${t.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node .fork-join {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node circle.state-end {
  fill: ${t.innerEndBackground};
  stroke: ${t.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${t.compositeBackground||t.background};
  // stroke: ${t.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${t.stateBkg||t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: 1px;
}
#statediagram-barbEnd {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}

.cluster-label, .nodeLabel {
  color: ${t.stateLabelColor};
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${t.stateBorder||t.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${t.compositeBackground||t.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${t.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${t.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${t.noteTextColor};
}

#dependencyStart, #dependencyEnd {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}
`}}]);

//# sourceMappingURL=5688.d5cd535c99c451a60a25.js.map