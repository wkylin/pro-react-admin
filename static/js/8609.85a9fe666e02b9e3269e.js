"use strict";(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[8609],{58609:function(fe,jt,z){z.d(jt,{diagram:function(){return se}});var p=z(26292),j=z(66439),Kt=z(30944),Xt=z(697),e=z(85010),ft=z(74353),mt=z(16750),de=z(42838);const pt={},nt=(a,o)=>{pt[a]=o},Et=a=>pt[a],rt=()=>Object.keys(pt),Tt={get:Et,set:nt,keys:rt,size:()=>rt().length},bt=a=>a.append("circle").attr("class","start-state").attr("r",(0,e.c)().state.sizeUnit).attr("cx",(0,e.c)().state.padding+(0,e.c)().state.sizeUnit).attr("cy",(0,e.c)().state.padding+(0,e.c)().state.sizeUnit),kt=a=>a.append("line").style("stroke","grey").style("stroke-dasharray","3").attr("x1",(0,e.c)().state.textHeight).attr("class","divider").attr("x2",(0,e.c)().state.textHeight*2).attr("y1",0).attr("y2",0),Dt=(a,o)=>{const y=a.append("text").attr("x",2*(0,e.c)().state.padding).attr("y",(0,e.c)().state.textHeight+2*(0,e.c)().state.padding).attr("font-size",(0,e.c)().state.fontSize).attr("class","state-title").text(o.id),g=y.node().getBBox();return a.insert("rect",":first-child").attr("x",(0,e.c)().state.padding).attr("y",(0,e.c)().state.padding).attr("width",g.width+2*(0,e.c)().state.padding).attr("height",g.height+2*(0,e.c)().state.padding).attr("rx",(0,e.c)().state.radius),y},Zt=(a,o)=>{const y=function(E,M,$){const Y=E.append("tspan").attr("x",2*(0,e.c)().state.padding).text(M);$||Y.attr("dy",(0,e.c)().state.textHeight)},S=a.append("text").attr("x",2*(0,e.c)().state.padding).attr("y",(0,e.c)().state.textHeight+1.3*(0,e.c)().state.padding).attr("font-size",(0,e.c)().state.fontSize).attr("class","state-title").text(o.descriptions[0]).node().getBBox(),b=S.height,D=a.append("text").attr("x",(0,e.c)().state.padding).attr("y",b+(0,e.c)().state.padding*.4+(0,e.c)().state.dividerMargin+(0,e.c)().state.textHeight).attr("class","state-description");let c=!0,f=!0;o.descriptions.forEach(function(E){c||(y(D,E,f),f=!1),c=!1});const P=a.append("line").attr("x1",(0,e.c)().state.padding).attr("y1",(0,e.c)().state.padding+b+(0,e.c)().state.dividerMargin/2).attr("y2",(0,e.c)().state.padding+b+(0,e.c)().state.dividerMargin/2).attr("class","descr-divider"),L=D.node().getBBox(),_=Math.max(L.width,S.width);return P.attr("x2",_+3*(0,e.c)().state.padding),a.insert("rect",":first-child").attr("x",(0,e.c)().state.padding).attr("y",(0,e.c)().state.padding).attr("width",_+2*(0,e.c)().state.padding).attr("height",L.height+b+2*(0,e.c)().state.padding).attr("rx",(0,e.c)().state.radius),a},Qt=(a,o,y)=>{const g=(0,e.c)().state.padding,S=2*(0,e.c)().state.padding,b=a.node().getBBox(),D=b.width,c=b.x,f=a.append("text").attr("x",0).attr("y",(0,e.c)().state.titleShift).attr("font-size",(0,e.c)().state.fontSize).attr("class","state-title").text(o.id),L=f.node().getBBox().width+S;let _=Math.max(L,D);_===D&&(_=_+S);let E;const M=a.node().getBBox();o.doc,E=c-g,L>D&&(E=(D-_)/2+g),Math.abs(c-M.x)<g&&L>D&&(E=c-(L-D)/2);const $=1-(0,e.c)().state.textHeight;return a.insert("rect",":first-child").attr("x",E).attr("y",$).attr("class",y?"alt-composit":"composit").attr("width",_).attr("height",M.height+(0,e.c)().state.textHeight+(0,e.c)().state.titleShift+1).attr("rx","0"),f.attr("x",E+g),L<=D&&f.attr("x",c+(_-S)/2-L/2+g),a.insert("rect",":first-child").attr("x",E).attr("y",(0,e.c)().state.titleShift-(0,e.c)().state.textHeight-(0,e.c)().state.padding).attr("width",_).attr("height",(0,e.c)().state.textHeight*3).attr("rx",(0,e.c)().state.radius),a.insert("rect",":first-child").attr("x",E).attr("y",(0,e.c)().state.titleShift-(0,e.c)().state.textHeight-(0,e.c)().state.padding).attr("width",_).attr("height",M.height+3+2*(0,e.c)().state.textHeight).attr("rx",(0,e.c)().state.radius),a},Lt=a=>(a.append("circle").attr("class","end-state-outer").attr("r",(0,e.c)().state.sizeUnit+(0,e.c)().state.miniPadding).attr("cx",(0,e.c)().state.padding+(0,e.c)().state.sizeUnit+(0,e.c)().state.miniPadding).attr("cy",(0,e.c)().state.padding+(0,e.c)().state.sizeUnit+(0,e.c)().state.miniPadding),a.append("circle").attr("class","end-state-inner").attr("r",(0,e.c)().state.sizeUnit).attr("cx",(0,e.c)().state.padding+(0,e.c)().state.sizeUnit+2).attr("cy",(0,e.c)().state.padding+(0,e.c)().state.sizeUnit+2)),Ct=(a,o)=>{let y=(0,e.c)().state.forkWidth,g=(0,e.c)().state.forkHeight;if(o.parentId){let S=y;y=g,g=S}return a.append("rect").style("stroke","black").style("fill","black").attr("width",y).attr("height",g).attr("x",(0,e.c)().state.padding).attr("y",(0,e.c)().state.padding)},at=(a,o,y,g)=>{let S=0;const b=g.append("text");b.style("text-anchor","start"),b.attr("class","noteText");let D=a.replace(/\r\n/g,"<br/>");D=D.replace(/\n/g,"<br/>");const c=D.split(e.e.lineBreakRegex);let f=1.25*(0,e.c)().state.noteMargin;for(const P of c){const L=P.trim();if(L.length>0){const _=b.append("tspan");if(_.text(L),f===0){const E=_.node().getBBox();f+=E.height}S+=f,_.attr("x",o+(0,e.c)().state.noteMargin),_.attr("y",y+S+1.25*(0,e.c)().state.noteMargin)}}return{textWidth:b.node().getBBox().width,textHeight:S}},q=(a,o)=>{o.attr("class","state-note");const y=o.append("rect").attr("x",0).attr("y",(0,e.c)().state.padding),g=o.append("g"),{textWidth:S,textHeight:b}=at(a,0,0,g);return y.attr("height",b+2*(0,e.c)().state.noteMargin),y.attr("width",S+(0,e.c)().state.noteMargin*2),y},gt=function(a,o){const y=o.id,g={id:y,label:o.id,width:0,height:0},S=a.append("g").attr("id",y).attr("class","stateGroup");o.type==="start"&&bt(S),o.type==="end"&&Lt(S),(o.type==="fork"||o.type==="join")&&Ct(S,o),o.type==="note"&&q(o.note.text,S),o.type==="divider"&&kt(S),o.type==="default"&&o.descriptions.length===0&&Dt(S,o),o.type==="default"&&o.descriptions.length>0&&Zt(S,o);const b=S.node().getBBox();return g.width=b.width+2*(0,e.c)().state.padding,g.height=b.height+2*(0,e.c)().state.padding,Tt.set(y,g),g};let tt=0;const R=function(a,o,y){const g=function(f){switch(f){case p.d.relationType.AGGREGATION:return"aggregation";case p.d.relationType.EXTENSION:return"extension";case p.d.relationType.COMPOSITION:return"composition";case p.d.relationType.DEPENDENCY:return"dependency"}};o.points=o.points.filter(f=>!Number.isNaN(f.y));const S=o.points,b=(0,j.n8j)().x(function(f){return f.x}).y(function(f){return f.y}).curve(j.qrM),D=a.append("path").attr("d",b(S)).attr("id","edge"+tt).attr("class","transition");let c="";if((0,e.c)().state.arrowMarkerAbsolute&&(c=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,c=c.replace(/\(/g,"\\("),c=c.replace(/\)/g,"\\)")),D.attr("marker-end","url("+c+"#"+g(p.d.relationType.DEPENDENCY)+"End)"),y.title!==void 0){const f=a.append("g").attr("class","stateLabel"),{x:P,y:L}=e.u.calcLabelPosition(o.points),_=e.e.getRows(y.title);let E=0;const M=[];let $=0,Y=0;for(let v=0;v<=_.length;v++){const k=f.append("text").attr("text-anchor","middle").text(_[v]).attr("x",P).attr("y",L+E),N=k.node().getBBox();$=Math.max($,N.width),Y=Math.min(Y,N.x),e.l.info(N.x,P,L+E),E===0&&(E=k.node().getBBox().height,e.l.info("Title height",E,L)),M.push(k)}let G=E*_.length;if(_.length>1){const v=(_.length-1)*E*.5;M.forEach((k,N)=>k.attr("y",L+N*E-v)),G=E*_.length}const u=f.node().getBBox();f.insert("rect",":first-child").attr("class","box").attr("x",P-$/2-(0,e.c)().state.padding/2).attr("y",L-G/2-(0,e.c)().state.padding/2-3.5).attr("width",$+(0,e.c)().state.padding).attr("height",G+(0,e.c)().state.padding),e.l.info(u)}tt++};let O;const ot={},qt=function(){},te=function(a){a.append("defs").append("marker").attr("id","dependencyEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 19,7 L9,13 L14,7 L9,1 Z")},ct=function(a,o,y,g){O=(0,e.c)().state;const S=(0,e.c)().securityLevel;let b;S==="sandbox"&&(b=(0,j.Ltv)("#i"+o));const D=S==="sandbox"?(0,j.Ltv)(b.nodes()[0].contentDocument.body):(0,j.Ltv)("body"),c=S==="sandbox"?b.nodes()[0].contentDocument:document;e.l.debug("Rendering diagram "+a);const f=D.select(`[id='${o}']`);te(f);const P=g.db.getRootDoc();vt(P,f,void 0,!1,D,c,g);const L=O.padding,_=f.node().getBBox(),E=_.width+L*2,M=_.height+L*2,$=E*1.75;(0,e.i)(f,M,$,O.useMaxWidth),f.attr("viewBox",`${_.x-O.padding}  ${_.y-O.padding} `+E+" "+M)},ee=a=>a?a.length*O.fontSizeFactor:1,vt=(a,o,y,g,S,b,D)=>{const c=new Xt.T({compound:!0,multigraph:!0});let f,P=!0;for(f=0;f<a.length;f++)if(a[f].stmt==="relation"){P=!1;break}y?c.setGraph({rankdir:"LR",multigraph:!0,compound:!0,ranker:"tight-tree",ranksep:P?1:O.edgeLengthFactor,nodeSep:P?1:50,isMultiGraph:!0}):c.setGraph({rankdir:"TB",multigraph:!0,compound:!0,ranksep:P?1:O.edgeLengthFactor,nodeSep:P?1:50,ranker:"tight-tree",isMultiGraph:!0}),c.setDefaultEdgeLabel(function(){return{}}),D.db.extract(a);const L=D.db.getStates(),_=D.db.getRelations(),E=Object.keys(L);for(const u of E){const v=L[u];y&&(v.parentId=y);let k;if(v.doc){let N=o.append("g").attr("id",v.id).attr("class","stateGroup");k=vt(v.doc,N,v.id,!g,S,b,D);{N=Qt(N,v,g);let H=N.node().getBBox();k.width=H.width,k.height=H.height+O.padding/2,ot[v.id]={y:O.compositTitleSize}}}else k=gt(o,v);if(v.note){const N={descriptions:[],id:v.id+"-note",note:v.note,type:"note"},H=gt(o,N);v.note.position==="left of"?(c.setNode(k.id+"-note",H),c.setNode(k.id,k)):(c.setNode(k.id,k),c.setNode(k.id+"-note",H)),c.setParent(k.id,k.id+"-group"),c.setParent(k.id+"-note",k.id+"-group")}else c.setNode(k.id,k)}e.l.debug("Count=",c.nodeCount(),c);let M=0;_.forEach(function(u){M++,e.l.debug("Setting edge",u),c.setEdge(u.id1,u.id2,{relation:u,width:ee(u.title),height:O.labelHeight*e.e.getRows(u.title).length,labelpos:"c"},"id"+M)}),(0,Kt.Zp)(c),e.l.debug("Graph after layout",c.nodes());const $=o.node();c.nodes().forEach(function(u){u!==void 0&&c.node(u)!==void 0?(e.l.warn("Node "+u+": "+JSON.stringify(c.node(u))),S.select("#"+$.id+" #"+u).attr("transform","translate("+(c.node(u).x-c.node(u).width/2)+","+(c.node(u).y+(ot[u]?ot[u].y:0)-c.node(u).height/2)+" )"),S.select("#"+$.id+" #"+u).attr("data-x-shift",c.node(u).x-c.node(u).width/2),b.querySelectorAll("#"+$.id+" #"+u+" .divider").forEach(k=>{const N=k.parentElement;let H=0,dt=0;N&&(N.parentElement&&(H=N.parentElement.getBBox().width),dt=parseInt(N.getAttribute("data-x-shift"),10),Number.isNaN(dt)&&(dt=0)),k.setAttribute("x1",0-dt+8),k.setAttribute("x2",H-dt-8)})):e.l.debug("No Node "+u+": "+JSON.stringify(c.node(u)))});let Y=$.getBBox();c.edges().forEach(function(u){u!==void 0&&c.edge(u)!==void 0&&(e.l.debug("Edge "+u.v+" -> "+u.w+": "+JSON.stringify(c.edge(u))),R(o,c.edge(u),c.edge(u).relation))}),Y=$.getBBox();const G={id:y||"root",label:y||"root",width:0,height:0};return G.width=Y.width+2*O.padding,G.height=Y.height+2*O.padding,e.l.debug("Doc rendered",G,c),G},lt={setConf:qt,draw:ct},se={parser:p.p,db:p.d,renderer:lt,styles:p.s,init:a=>{a.state||(a.state={}),a.state.arrowMarkerAbsolute=a.arrowMarkerAbsolute,p.d.clear()}}},26292:function(fe,jt,z){z.d(jt,{D:function(){return nt},S:function(){return mt},a:function(){return Et},b:function(){return ft},c:function(){return e},d:function(){return pe},p:function(){return Kt},s:function(){return ge}});var p=z(85010),j=function(){var t=function(Q,r,l,n){for(l=l||{},n=Q.length;n--;l[Q[n]]=r);return l},i=[1,2],d=[1,3],T=[1,4],A=[2,4],w=[1,9],I=[1,11],K=[1,15],C=[1,16],X=[1,17],W=[1,18],yt=[1,30],At=[1,19],wt=[1,20],It=[1,21],Bt=[1,22],Ot=[1,23],Nt=[1,25],Rt=[1,26],Pt=[1,27],Mt=[1,28],$t=[1,29],Ft=[1,32],Ut=[1,33],zt=[1,34],Vt=[1,35],St=[1,31],x=[1,4,5,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],Gt=[1,4,5,13,14,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],he=[4,5,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],ie={trace:function(){},yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,cssClassStatement:11,idStatement:12,DESCR:13,"-->":14,HIDE_EMPTY:15,scale:16,WIDTH:17,COMPOSIT_STATE:18,STRUCT_START:19,STRUCT_STOP:20,STATE_DESCR:21,AS:22,ID:23,FORK:24,JOIN:25,CHOICE:26,CONCURRENT:27,note:28,notePosition:29,NOTE_TEXT:30,direction:31,acc_title:32,acc_title_value:33,acc_descr:34,acc_descr_value:35,acc_descr_multiline_value:36,classDef:37,CLASSDEF_ID:38,CLASSDEF_STYLEOPTS:39,DEFAULT:40,class:41,CLASSENTITY_IDS:42,STYLECLASS:43,direction_tb:44,direction_bt:45,direction_rl:46,direction_lr:47,eol:48,";":49,EDGE_STATE:50,STYLE_SEPARATOR:51,left_of:52,right_of:53,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",13:"DESCR",14:"-->",15:"HIDE_EMPTY",16:"scale",17:"WIDTH",18:"COMPOSIT_STATE",19:"STRUCT_START",20:"STRUCT_STOP",21:"STATE_DESCR",22:"AS",23:"ID",24:"FORK",25:"JOIN",26:"CHOICE",27:"CONCURRENT",28:"note",30:"NOTE_TEXT",32:"acc_title",33:"acc_title_value",34:"acc_descr",35:"acc_descr_value",36:"acc_descr_multiline_value",37:"classDef",38:"CLASSDEF_ID",39:"CLASSDEF_STYLEOPTS",40:"DEFAULT",41:"class",42:"CLASSENTITY_IDS",43:"STYLECLASS",44:"direction_tb",45:"direction_bt",46:"direction_rl",47:"direction_lr",49:";",50:"EDGE_STATE",51:"STYLE_SEPARATOR",52:"left_of",53:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[10,3],[10,3],[11,3],[31,1],[31,1],[31,1],[31,1],[48,1],[48,1],[12,1],[12,1],[12,3],[12,3],[29,1],[29,1]],performAction:function(r,l,n,m,B,s,xt){var h=s.length-1;switch(B){case 3:return m.setRootDoc(s[h]),s[h];case 4:this.$=[];break;case 5:s[h]!="nl"&&(s[h-1].push(s[h]),this.$=s[h-1]);break;case 6:case 7:this.$=s[h];break;case 8:this.$="nl";break;case 11:this.$=s[h];break;case 12:const _t=s[h-1];_t.description=m.trimColon(s[h]),this.$=_t;break;case 13:this.$={stmt:"relation",state1:s[h-2],state2:s[h]};break;case 14:const re=m.trimColon(s[h]);this.$={stmt:"relation",state1:s[h-3],state2:s[h-1],description:re};break;case 18:this.$={stmt:"state",id:s[h-3],type:"default",description:"",doc:s[h-1]};break;case 19:var et=s[h],ht=s[h-2].trim();if(s[h].match(":")){var Yt=s[h].split(":");et=Yt[0],ht=[ht,Yt[1]]}this.$={stmt:"state",id:et,type:"default",description:ht};break;case 20:this.$={stmt:"state",id:s[h-3],type:"default",description:s[h-5],doc:s[h-1]};break;case 21:this.$={stmt:"state",id:s[h],type:"fork"};break;case 22:this.$={stmt:"state",id:s[h],type:"join"};break;case 23:this.$={stmt:"state",id:s[h],type:"choice"};break;case 24:this.$={stmt:"state",id:m.getDividerId(),type:"divider"};break;case 25:this.$={stmt:"state",id:s[h-1].trim(),note:{position:s[h-2].trim(),text:s[h].trim()}};break;case 28:this.$=s[h].trim(),m.setAccTitle(this.$);break;case 29:case 30:this.$=s[h].trim(),m.setAccDescription(this.$);break;case 31:case 32:this.$={stmt:"classDef",id:s[h-1].trim(),classes:s[h].trim()};break;case 33:this.$={stmt:"applyClass",id:s[h-1].trim(),styleClass:s[h].trim()};break;case 34:m.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 35:m.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 36:m.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 37:m.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 40:case 41:this.$={stmt:"state",id:s[h].trim(),type:"default",description:""};break;case 42:this.$={stmt:"state",id:s[h-2].trim(),classes:[s[h].trim()],type:"default",description:""};break;case 43:this.$={stmt:"state",id:s[h-2].trim(),classes:[s[h].trim()],type:"default",description:""};break}},table:[{3:1,4:i,5:d,6:T},{1:[3]},{3:5,4:i,5:d,6:T},{3:6,4:i,5:d,6:T},t([1,4,5,15,16,18,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],A,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:w,5:I,8:8,9:10,10:12,11:13,12:14,15:K,16:C,18:X,21:W,23:yt,24:At,25:wt,26:It,27:Bt,28:Ot,31:24,32:Nt,34:Rt,36:Pt,37:Mt,41:$t,44:Ft,45:Ut,46:zt,47:Vt,50:St},t(x,[2,5]),{9:36,10:12,11:13,12:14,15:K,16:C,18:X,21:W,23:yt,24:At,25:wt,26:It,27:Bt,28:Ot,31:24,32:Nt,34:Rt,36:Pt,37:Mt,41:$t,44:Ft,45:Ut,46:zt,47:Vt,50:St},t(x,[2,7]),t(x,[2,8]),t(x,[2,9]),t(x,[2,10]),t(x,[2,11],{13:[1,37],14:[1,38]}),t(x,[2,15]),{17:[1,39]},t(x,[2,17],{19:[1,40]}),{22:[1,41]},t(x,[2,21]),t(x,[2,22]),t(x,[2,23]),t(x,[2,24]),{29:42,30:[1,43],52:[1,44],53:[1,45]},t(x,[2,27]),{33:[1,46]},{35:[1,47]},t(x,[2,30]),{38:[1,48],40:[1,49]},{42:[1,50]},t(Gt,[2,40],{51:[1,51]}),t(Gt,[2,41],{51:[1,52]}),t(x,[2,34]),t(x,[2,35]),t(x,[2,36]),t(x,[2,37]),t(x,[2,6]),t(x,[2,12]),{12:53,23:yt,50:St},t(x,[2,16]),t(he,A,{7:54}),{23:[1,55]},{23:[1,56]},{22:[1,57]},{23:[2,44]},{23:[2,45]},t(x,[2,28]),t(x,[2,29]),{39:[1,58]},{39:[1,59]},{43:[1,60]},{23:[1,61]},{23:[1,62]},t(x,[2,13],{13:[1,63]}),{4:w,5:I,8:8,9:10,10:12,11:13,12:14,15:K,16:C,18:X,20:[1,64],21:W,23:yt,24:At,25:wt,26:It,27:Bt,28:Ot,31:24,32:Nt,34:Rt,36:Pt,37:Mt,41:$t,44:Ft,45:Ut,46:zt,47:Vt,50:St},t(x,[2,19],{19:[1,65]}),{30:[1,66]},{23:[1,67]},t(x,[2,31]),t(x,[2,32]),t(x,[2,33]),t(Gt,[2,42]),t(Gt,[2,43]),t(x,[2,14]),t(x,[2,18]),t(he,A,{7:68}),t(x,[2,25]),t(x,[2,26]),{4:w,5:I,8:8,9:10,10:12,11:13,12:14,15:K,16:C,18:X,20:[1,69],21:W,23:yt,24:At,25:wt,26:It,27:Bt,28:Ot,31:24,32:Nt,34:Rt,36:Pt,37:Mt,41:$t,44:Ft,45:Ut,46:zt,47:Vt,50:St},t(x,[2,20])],defaultActions:{5:[2,1],6:[2,2],44:[2,44],45:[2,45]},parseError:function(r,l){if(l.recoverable)this.trace(r);else{var n=new Error(r);throw n.hash=l,n}},parse:function(r){var l=this,n=[0],m=[],B=[null],s=[],xt=this.table,h="",et=0,ht=0,Yt=2,_t=1,re=s.slice.call(arguments,1),F=Object.create(this.lexer),st={yy:{}};for(var ae in this.yy)Object.prototype.hasOwnProperty.call(this.yy,ae)&&(st.yy[ae]=this.yy[ae]);F.setInput(r,st.yy),st.yy.lexer=F,st.yy.parser=this,typeof F.yylloc=="undefined"&&(F.yylloc={});var oe=F.yylloc;s.push(oe);var Se=F.options&&F.options.ranges;typeof st.yy.parseError=="function"?this.parseError=st.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function xe(){var Z;return Z=m.pop()||F.lex()||_t,typeof Z!="number"&&(Z instanceof Array&&(m=Z,Z=m.pop()),Z=l.symbols_[Z]||Z),Z}for(var U,it,V,ce,ut={},Ht,J,ue,Wt;;){if(it=n[n.length-1],this.defaultActions[it]?V=this.defaultActions[it]:((U===null||typeof U=="undefined")&&(U=xe()),V=xt[it]&&xt[it][U]),typeof V=="undefined"||!V.length||!V[0]){var le="";Wt=[];for(Ht in xt[it])this.terminals_[Ht]&&Ht>Yt&&Wt.push("'"+this.terminals_[Ht]+"'");F.showPosition?le="Parse error on line "+(et+1)+`:
`+F.showPosition()+`
Expecting `+Wt.join(", ")+", got '"+(this.terminals_[U]||U)+"'":le="Parse error on line "+(et+1)+": Unexpected "+(U==_t?"end of input":"'"+(this.terminals_[U]||U)+"'"),this.parseError(le,{text:F.match,token:this.terminals_[U]||U,line:F.yylineno,loc:oe,expected:Wt})}if(V[0]instanceof Array&&V.length>1)throw new Error("Parse Error: multiple actions possible at state: "+it+", token: "+U);switch(V[0]){case 1:n.push(U),B.push(F.yytext),s.push(F.yylloc),n.push(V[1]),U=null,ht=F.yyleng,h=F.yytext,et=F.yylineno,oe=F.yylloc;break;case 2:if(J=this.productions_[V[1]][1],ut.$=B[B.length-J],ut._$={first_line:s[s.length-(J||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(J||1)].first_column,last_column:s[s.length-1].last_column},Se&&(ut._$.range=[s[s.length-(J||1)].range[0],s[s.length-1].range[1]]),ce=this.performAction.apply(ut,[h,ht,et,st.yy,V[1],B,s].concat(re)),typeof ce!="undefined")return ce;J&&(n=n.slice(0,-1*J*2),B=B.slice(0,-1*J),s=s.slice(0,-1*J)),n.push(this.productions_[V[1]][0]),B.push(ut.$),s.push(ut._$),ue=xt[n[n.length-2]][n[n.length-1]],n.push(ue);break;case 3:return!0}}return!0}},ye=function(){var Q={EOF:1,parseError:function(l,n){if(this.yy.parser)this.yy.parser.parseError(l,n);else throw new Error(l)},setInput:function(r,l){return this.yy=l||this.yy||{},this._input=r,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var r=this._input[0];this.yytext+=r,this.yyleng++,this.offset++,this.match+=r,this.matched+=r;var l=r.match(/(?:\r\n?|\n).*/g);return l?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),r},unput:function(r){var l=r.length,n=r.split(/(?:\r\n?|\n)/g);this._input=r+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-l),this.offset-=l;var m=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),n.length-1&&(this.yylineno-=n.length-1);var B=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:n?(n.length===m.length?this.yylloc.first_column:0)+m[m.length-n.length].length-n[0].length:this.yylloc.first_column-l},this.options.ranges&&(this.yylloc.range=[B[0],B[0]+this.yyleng-l]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(r){this.unput(this.match.slice(r))},pastInput:function(){var r=this.matched.substr(0,this.matched.length-this.match.length);return(r.length>20?"...":"")+r.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var r=this.match;return r.length<20&&(r+=this._input.substr(0,20-r.length)),(r.substr(0,20)+(r.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var r=this.pastInput(),l=new Array(r.length+1).join("-");return r+this.upcomingInput()+`
`+l+"^"},test_match:function(r,l){var n,m,B;if(this.options.backtrack_lexer&&(B={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(B.yylloc.range=this.yylloc.range.slice(0))),m=r[0].match(/(?:\r\n?|\n).*/g),m&&(this.yylineno+=m.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:m?m[m.length-1].length-m[m.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length},this.yytext+=r[0],this.match+=r[0],this.matches=r,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(r[0].length),this.matched+=r[0],n=this.performAction.call(this,this.yy,this,l,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),n)return n;if(this._backtrack){for(var s in B)this[s]=B[s];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var r,l,n,m;this._more||(this.yytext="",this.match="");for(var B=this._currentRules(),s=0;s<B.length;s++)if(n=this._input.match(this.rules[B[s]]),n&&(!l||n[0].length>l[0].length)){if(l=n,m=s,this.options.backtrack_lexer){if(r=this.test_match(n,B[s]),r!==!1)return r;if(this._backtrack){l=!1;continue}else return!1}else if(!this.options.flex)break}return l?(r=this.test_match(l,B[m]),r!==!1?r:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var l=this.next();return l||this.lex()},begin:function(l){this.conditionStack.push(l)},popState:function(){var l=this.conditionStack.length-1;return l>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(l){return l=this.conditionStack.length-1-Math.abs(l||0),l>=0?this.conditionStack[l]:"INITIAL"},pushState:function(l){this.begin(l)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(l,n,m,B){switch(m){case 0:return 40;case 1:return 44;case 2:return 45;case 3:return 46;case 4:return 47;case 5:break;case 6:break;case 7:return 5;case 8:break;case 9:break;case 10:break;case 11:break;case 12:return this.pushState("SCALE"),16;case 13:return 17;case 14:this.popState();break;case 15:return this.begin("acc_title"),32;case 16:return this.popState(),"acc_title_value";case 17:return this.begin("acc_descr"),34;case 18:return this.popState(),"acc_descr_value";case 19:this.begin("acc_descr_multiline");break;case 20:this.popState();break;case 21:return"acc_descr_multiline_value";case 22:return this.pushState("CLASSDEF"),37;case 23:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 24:return this.popState(),this.pushState("CLASSDEFID"),38;case 25:return this.popState(),39;case 26:return this.pushState("CLASS"),41;case 27:return this.popState(),this.pushState("CLASS_STYLE"),42;case 28:return this.popState(),43;case 29:return this.pushState("SCALE"),16;case 30:return 17;case 31:this.popState();break;case 32:this.pushState("STATE");break;case 33:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),24;case 34:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),25;case 35:return this.popState(),n.yytext=n.yytext.slice(0,-10).trim(),26;case 36:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),24;case 37:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),25;case 38:return this.popState(),n.yytext=n.yytext.slice(0,-10).trim(),26;case 39:return 44;case 40:return 45;case 41:return 46;case 42:return 47;case 43:this.pushState("STATE_STRING");break;case 44:return this.pushState("STATE_ID"),"AS";case 45:return this.popState(),"ID";case 46:this.popState();break;case 47:return"STATE_DESCR";case 48:return 18;case 49:this.popState();break;case 50:return this.popState(),this.pushState("struct"),19;case 51:break;case 52:return this.popState(),20;case 53:break;case 54:return this.begin("NOTE"),28;case 55:return this.popState(),this.pushState("NOTE_ID"),52;case 56:return this.popState(),this.pushState("NOTE_ID"),53;case 57:this.popState(),this.pushState("FLOATING_NOTE");break;case 58:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 59:break;case 60:return"NOTE_TEXT";case 61:return this.popState(),"ID";case 62:return this.popState(),this.pushState("NOTE_TEXT"),23;case 63:return this.popState(),n.yytext=n.yytext.substr(2).trim(),30;case 64:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),30;case 65:return 6;case 66:return 6;case 67:return 15;case 68:return 50;case 69:return 23;case 70:return n.yytext=n.yytext.trim(),13;case 71:return 14;case 72:return 27;case 73:return 51;case 74:return 5;case 75:return"INVALID"}},rules:[/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[9,10],inclusive:!1},struct:{rules:[9,10,22,26,32,39,40,41,42,51,52,53,54,68,69,70,71,72],inclusive:!1},FLOATING_NOTE_ID:{rules:[61],inclusive:!1},FLOATING_NOTE:{rules:[58,59,60],inclusive:!1},NOTE_TEXT:{rules:[63,64],inclusive:!1},NOTE_ID:{rules:[62],inclusive:!1},NOTE:{rules:[55,56,57],inclusive:!1},CLASS_STYLE:{rules:[28],inclusive:!1},CLASS:{rules:[27],inclusive:!1},CLASSDEFID:{rules:[25],inclusive:!1},CLASSDEF:{rules:[23,24],inclusive:!1},acc_descr_multiline:{rules:[20,21],inclusive:!1},acc_descr:{rules:[18],inclusive:!1},acc_title:{rules:[16],inclusive:!1},SCALE:{rules:[13,14,30,31],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[45],inclusive:!1},STATE_STRING:{rules:[46,47],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[9,10,33,34,35,36,37,38,43,44,48,49,50],inclusive:!1},ID:{rules:[9,10],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,10,11,12,15,17,19,22,26,29,32,50,54,65,66,67,68,69,70,71,73,74,75],inclusive:!0}}};return Q}();ie.lexer=ye;function ne(){this.yy={}}return ne.prototype=ie,ie.Parser=ne,new ne}();j.parser=j;const Kt=j,Xt="LR",e="TB",ft="state",mt="relation",de="classDef",pt="applyClass",nt="default",Et="divider",rt="[*]",Jt="start",Tt=rt,bt="end",kt="color",Dt="fill",Zt="bgFill",Qt=",";function Lt(){return{}}let Ct=Xt,at=[],q=Lt();const gt=()=>({relations:[],states:{},documents:{}});let tt={root:gt()},R=tt.root,O=0,ot=0;const qt={LINE:0,DOTTED_LINE:1},te={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},ct=t=>JSON.parse(JSON.stringify(t)),ee=t=>{p.l.info("Setting root doc",t),at=t},vt=()=>at,lt=(t,i,d)=>{if(i.stmt===mt)lt(t,i.state1,!0),lt(t,i.state2,!1);else if(i.stmt===ft&&(i.id==="[*]"?(i.id=d?t.id+"_start":t.id+"_end",i.start=d):i.id=i.id.trim()),i.doc){const T=[];let A=[],w;for(w=0;w<i.doc.length;w++)if(i.doc[w].type===Et){const I=ct(i.doc[w]);I.doc=ct(A),T.push(I),A=[]}else A.push(i.doc[w]);if(T.length>0&&A.length>0){const I={stmt:ft,id:(0,p.I)(),type:"divider",doc:ct(A)};T.push(ct(I)),i.doc=T}i.doc.forEach(I=>lt(i,I,!0))}},se=()=>(lt({id:"root"},{id:"root",doc:at},!0),{id:"root",doc:at}),a=t=>{let i;t.doc?i=t.doc:i=t,p.l.info(i),y(!0),p.l.info("Extract",i),i.forEach(d=>{switch(d.stmt){case ft:o(d.id.trim(),d.type,d.doc,d.description,d.note,d.classes,d.styles,d.textStyles);break;case mt:E(d.state1,d.state2,d.description);break;case de:G(d.id.trim(),d.classes);break;case pt:v(d.id.trim(),d.styleClass);break}})},o=function(t,i=nt,d=null,T=null,A=null,w=null,I=null,K=null){const C=t==null?void 0:t.trim();R.states[C]===void 0?(p.l.info("Adding state ",C,T),R.states[C]={id:C,descriptions:[],type:i,doc:d,note:A,classes:[],styles:[],textStyles:[]}):(R.states[C].doc||(R.states[C].doc=d),R.states[C].type||(R.states[C].type=i)),T&&(p.l.info("Setting state description",C,T),typeof T=="string"&&M(C,T.trim()),typeof T=="object"&&T.forEach(X=>M(C,X.trim()))),A&&(R.states[C].note=A,R.states[C].note.text=p.e.sanitizeText(R.states[C].note.text,(0,p.c)())),w&&(p.l.info("Setting state classes",C,w),(typeof w=="string"?[w]:w).forEach(W=>v(C,W.trim()))),I&&(p.l.info("Setting state styles",C,I),(typeof I=="string"?[I]:I).forEach(W=>k(C,W.trim()))),K&&(p.l.info("Setting state styles",C,I),(typeof K=="string"?[K]:K).forEach(W=>N(C,W.trim())))},y=function(t){tt={root:gt()},R=tt.root,O=0,q=Lt(),t||(0,p.v)()},g=function(t){return R.states[t]},S=function(){return R.states},b=function(){p.l.info("Documents = ",tt)},D=function(){return R.relations};function c(t=""){let i=t;return t===rt&&(O++,i=`${Jt}${O}`),i}function f(t="",i=nt){return t===rt?Jt:i}function P(t=""){let i=t;return t===Tt&&(O++,i=`${bt}${O}`),i}function L(t="",i=nt){return t===Tt?bt:i}function _(t,i,d){let T=c(t.id.trim()),A=f(t.id.trim(),t.type),w=c(i.id.trim()),I=f(i.id.trim(),i.type);o(T,A,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),o(w,I,i.doc,i.description,i.note,i.classes,i.styles,i.textStyles),R.relations.push({id1:T,id2:w,relationTitle:p.e.sanitizeText(d,(0,p.c)())})}const E=function(t,i,d){if(typeof t=="object")_(t,i,d);else{const T=c(t.trim()),A=f(t),w=P(i.trim()),I=L(i);o(T,A),o(w,I),R.relations.push({id1:T,id2:w,title:p.e.sanitizeText(d,(0,p.c)())})}},M=function(t,i){const d=R.states[t],T=i.startsWith(":")?i.replace(":","").trim():i;d.descriptions.push(p.e.sanitizeText(T,(0,p.c)()))},$=function(t){return t.substring(0,1)===":"?t.substr(2).trim():t.trim()},Y=()=>(ot++,"divider-id-"+ot),G=function(t,i=""){q[t]===void 0&&(q[t]={id:t,styles:[],textStyles:[]});const d=q[t];i!=null&&i.split(Qt).forEach(T=>{const A=T.replace(/([^;]*);/,"$1").trim();if(T.match(kt)){const I=A.replace(Dt,Zt).replace(kt,Dt);d.textStyles.push(I)}d.styles.push(A)})},u=function(){return q},v=function(t,i){t.split(",").forEach(function(d){let T=g(d);if(T===void 0){const A=d.trim();o(A),T=g(A)}T.classes.push(i)})},k=function(t,i){const d=g(t);d!==void 0&&d.textStyles.push(i)},N=function(t,i){const d=g(t);d!==void 0&&d.textStyles.push(i)},pe={getConfig:()=>(0,p.c)().state,addState:o,clear:y,getState:g,getStates:S,getRelations:D,getClasses:u,getDirection:()=>Ct,addRelation:E,getDividerId:Y,setDirection:t=>{Ct=t},cleanupLabel:$,lineType:qt,relationType:te,logDocuments:b,getRootDoc:vt,setRootDoc:ee,getRootDocV2:se,extract:a,trimColon:t=>t&&t[0]===":"?t.substr(1).trim():t.trim(),getAccTitle:p.g,setAccTitle:p.s,getAccDescription:p.a,setAccDescription:p.b,addStyleClass:G,setCssClass:v,addDescription:M,setDiagramTitle:p.q,getDiagramTitle:p.t},ge=t=>`
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

//# sourceMappingURL=8609.85a9fe666e02b9e3269e.js.map