"use strict";var W=(O,D,a)=>new Promise((h,c)=>{var r=s=>{try{g(a.next(s))}catch(k){c(k)}},C=s=>{try{g(a.throw(s))}catch(k){c(k)}},g=s=>s.done?h(s.value):Promise.resolve(s.value).then(r,C);g((a=a.apply(O,D)).next())});(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[2453],{10646:function(O,D,a){a.d(D,{H:function(){return c}});var h=a(82933);function c(r,C){var g=r.append("foreignObject").attr("width","100000"),s=g.append("xhtml:div");s.attr("xmlns","http://www.w3.org/1999/xhtml");var k=C.label;switch(typeof k){case"function":s.insert(k);break;case"object":s.insert(function(){return k});break;default:s.html(k)}h.AV(s,C.labelStyle),s.style("display","inline-block"),s.style("white-space","nowrap");var L=s.node().getBoundingClientRect();return g.attr("width",L.width).attr("height",L.height),g}},82933:function(O,D,a){a.d(D,{AV:function(){return k},De:function(){return r},c$:function(){return $},gh:function(){return C},nh:function(){return L}});var h=a(34963),c=a(89610);function r(d,w){return!!d.children(w).length}function C(d){return s(d.v)+":"+s(d.w)+":"+s(d.name)}var g=/:/g;function s(d){return d?String(d).replace(g,"\\:"):""}function k(d,w){w&&d.attr("style",w)}function L(d,w,x){w&&d.attr("class",w).attr("class",x+" "+d.attr("class"))}function $(d,w){var x=w.graph();if(h.A(x)){var K=x.transition;if(c.A(K))return K(d)}return d}},75937:function(O,D,a){var h=a(86309),c=a(51931);const r=(C,g)=>h.A.lang.round(c.A.parse(C)[g]);D.A=r},22453:function(O,D,a){a.d(D,{diagram:function(){return w}});var h=a(32548),c=a(65382),r=a(27553),C=a(66439),g=a(697),s=a(30944),k=a(14075),L=a(74353),$=a(16750),d=a(42838);const w={parser:h.p,db:h.f,renderer:c.f,styles:c.a,init:x=>{x.flowchart||(x.flowchart={}),x.flowchart.arrowMarkerAbsolute=x.arrowMarkerAbsolute,(0,r.p)({flowchart:{arrowMarkerAbsolute:x.arrowMarkerAbsolute}}),c.f.setConf(x.flowchart),h.f.clear(),h.f.setGen("gen-2")}}},65382:function(O,D,a){a.d(D,{a:function(){return F},f:function(){return V}});var h=a(697),c=a(66439),r=a(27553),C=a(12983),g=a(10646),s=a(75937),k=a(25582);const L={},$=function(t){const _=Object.keys(t);for(const A of _)L[A]=t[A]},d=function(t,_,A,b,f,y){return W(this,null,function*(){const E=b.select(`[id="${A}"]`),n=Object.keys(t);for(const u of n){const l=t[u];let S="default";l.classes.length>0&&(S=l.classes.join(" ")),S=S+" flowchart-label";const m=(0,r.k)(l.styles);let e=l.text!==void 0?l.text:l.id,i;if(r.l.info("vertex",l,l.labelType),l.labelType==="markdown")r.l.info("vertex",l,l.labelType);else if((0,r.m)((0,r.c)().flowchart.htmlLabels)){const M={label:e};i=(0,g.H)(E,M).node(),i.parentNode.removeChild(i)}else{const M=f.createElementNS("http://www.w3.org/2000/svg","text");M.setAttribute("style",m.labelStyle.replace("color:","fill:"));const R=e.split(r.e.lineBreakRegex);for(const N of R){const I=f.createElementNS("http://www.w3.org/2000/svg","tspan");I.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),I.setAttribute("dy","1em"),I.setAttribute("x","1"),I.textContent=N,M.appendChild(I)}i=M}let p=0,o="";switch(l.type){case"round":p=5,o="rect";break;case"square":o="rect";break;case"diamond":o="question";break;case"hexagon":o="hexagon";break;case"odd":o="rect_left_inv_arrow";break;case"lean_right":o="lean_right";break;case"lean_left":o="lean_left";break;case"trapezoid":o="trapezoid";break;case"inv_trapezoid":o="inv_trapezoid";break;case"odd_right":o="rect_left_inv_arrow";break;case"circle":o="circle";break;case"ellipse":o="ellipse";break;case"stadium":o="stadium";break;case"subroutine":o="subroutine";break;case"cylinder":o="cylinder";break;case"group":o="rect";break;case"doublecircle":o="doublecircle";break;default:o="rect"}const U=yield(0,r.r)(e,(0,r.c)());_.setNode(l.id,{labelStyle:m.labelStyle,shape:o,labelText:U,labelType:l.labelType,rx:p,ry:p,class:S,style:m.style,id:l.id,link:l.link,linkTarget:l.linkTarget,tooltip:y.db.getTooltip(l.id)||"",domId:y.db.lookUpDomId(l.id),haveCallback:l.haveCallback,width:l.type==="group"?500:void 0,dir:l.dir,type:l.type,props:l.props,padding:(0,r.c)().flowchart.padding}),r.l.info("setNode",{labelStyle:m.labelStyle,labelType:l.labelType,shape:o,labelText:U,rx:p,ry:p,class:S,style:m.style,id:l.id,domId:y.db.lookUpDomId(l.id),width:l.type==="group"?500:void 0,type:l.type,dir:l.dir,props:l.props,padding:(0,r.c)().flowchart.padding})}})},w=function(t,_,A){return W(this,null,function*(){r.l.info("abc78 edges = ",t);let b=0,f={},y,E;if(t.defaultStyle!==void 0){const n=(0,r.k)(t.defaultStyle);y=n.style,E=n.labelStyle}for(const n of t){b++;const u="L-"+n.start+"-"+n.end;f[u]===void 0?(f[u]=0,r.l.info("abc78 new entry",u,f[u])):(f[u]++,r.l.info("abc78 new entry",u,f[u]));let l=u+"-"+f[u];r.l.info("abc78 new link id to be used is",u,l,f[u]);const S="LS-"+n.start,m="LE-"+n.end,e={style:"",labelStyle:""};switch(e.minlen=n.length||1,n.type==="arrow_open"?e.arrowhead="none":e.arrowhead="normal",e.arrowTypeStart="arrow_open",e.arrowTypeEnd="arrow_open",n.type){case"double_arrow_cross":e.arrowTypeStart="arrow_cross";case"arrow_cross":e.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":e.arrowTypeStart="arrow_point";case"arrow_point":e.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":e.arrowTypeStart="arrow_circle";case"arrow_circle":e.arrowTypeEnd="arrow_circle";break}let i="",p="";switch(n.stroke){case"normal":i="fill:none;",y!==void 0&&(i=y),E!==void 0&&(p=E),e.thickness="normal",e.pattern="solid";break;case"dotted":e.thickness="normal",e.pattern="dotted",e.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":e.thickness="thick",e.pattern="solid",e.style="stroke-width: 3.5px;fill:none;";break;case"invisible":e.thickness="invisible",e.pattern="solid",e.style="stroke-width: 0;fill:none;";break}if(n.style!==void 0){const o=(0,r.k)(n.style);i=o.style,p=o.labelStyle}e.style=e.style+=i,e.labelStyle=e.labelStyle+=p,n.interpolate!==void 0?e.curve=(0,r.n)(n.interpolate,c.lUB):t.defaultInterpolate!==void 0?e.curve=(0,r.n)(t.defaultInterpolate,c.lUB):e.curve=(0,r.n)(L.curve,c.lUB),n.text===void 0?n.style!==void 0&&(e.arrowheadStyle="fill: #333"):(e.arrowheadStyle="fill: #333",e.labelpos="c"),e.labelType=n.labelType,e.label=yield(0,r.r)(n.text.replace(r.e.lineBreakRegex,`
`),(0,r.c)()),n.style===void 0&&(e.style=e.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),e.labelStyle=e.labelStyle.replace("color:","fill:"),e.id=l,e.classes="flowchart-link "+S+" "+m,_.setEdge(n.start,n.end,e,b)}})},V={setConf:$,addVertices:d,addEdges:w,getClasses:function(t,_){return _.db.getClasses()},draw:function(t,_,A,b){return W(this,null,function*(){r.l.info("Drawing flowchart");let f=b.db.getDirection();f===void 0&&(f="TD");const{securityLevel:y,flowchart:E}=(0,r.c)(),n=E.nodeSpacing||50,u=E.rankSpacing||50;let l;y==="sandbox"&&(l=(0,c.Ltv)("#i"+_));const S=y==="sandbox"?(0,c.Ltv)(l.nodes()[0].contentDocument.body):(0,c.Ltv)("body"),m=y==="sandbox"?l.nodes()[0].contentDocument:document,e=new h.T({multigraph:!0,compound:!0}).setGraph({rankdir:f,nodesep:n,ranksep:u,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}});let i;const p=b.db.getSubGraphs();r.l.info("Subgraphs - ",p);for(let v=p.length-1;v>=0;v--)i=p[v],r.l.info("Subgraph - ",i),b.db.addVertex(i.id,{text:i.title,type:i.labelType},"group",void 0,i.classes,i.dir);const o=b.db.getVertices(),U=b.db.getEdges();r.l.info("Edges",U);let M=0;for(M=p.length-1;M>=0;M--){i=p[M],(0,c.Ubm)("cluster").append("text");for(let v=0;v<i.nodes.length;v++)r.l.info("Setting up subgraphs",i.nodes[v],i.id),e.setParent(i.nodes[v],i.id)}yield d(o,e,_,S,m,b),yield w(U,e);const R=S.select(`[id="${_}"]`),N=S.select("#"+_+" g");if(yield(0,C.r)(N,e,["point","circle","cross"],"flowchart",_),r.u.insertTitle(R,"flowchartTitleText",E.titleTopMargin,b.db.getDiagramTitle()),(0,r.o)(e,R,E.diagramPadding,E.useMaxWidth),b.db.indexNodes("subGraph"+M),!E.htmlLabels){const v=m.querySelectorAll('[id="'+_+'"] .edgeLabel .label');for(const P of v){const B=P.getBBox(),T=m.createElementNS("http://www.w3.org/2000/svg","rect");T.setAttribute("rx",0),T.setAttribute("ry",0),T.setAttribute("width",B.width),T.setAttribute("height",B.height),P.insertBefore(T,P.firstChild)}}Object.keys(o).forEach(function(v){const P=o[v];if(P.link){const B=(0,c.Ltv)("#"+_+' [id="'+v+'"]');if(B){const T=m.createElementNS("http://www.w3.org/2000/svg","a");T.setAttributeNS("http://www.w3.org/2000/svg","class",P.classes.join(" ")),T.setAttributeNS("http://www.w3.org/2000/svg","href",P.link),T.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),y==="sandbox"?T.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):P.linkTarget&&T.setAttributeNS("http://www.w3.org/2000/svg","target",P.linkTarget);const j=B.insert(function(){return T},":first-child"),z=B.select(".label-container");z&&j.append(function(){return z.node()});const G=B.select(".label");G&&j.append(function(){return G.node()})}}})})}},H=(t,_)=>{const A=s.A,b=A(t,"r"),f=A(t,"g"),y=A(t,"b");return k.A(b,f,y,_)},F=t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.nodeTextColor||t.textColor};
  }
  .cluster-label text {
    fill: ${t.titleColor};
  }
  .cluster-label span,p {
    color: ${t.titleColor};
  }

  .label text,span,p {
    fill: ${t.nodeTextColor||t.textColor};
    color: ${t.nodeTextColor||t.textColor};
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
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .katex path {
    fill: #000;
    stroke: #000;
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
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${t.edgeLabelBackground};
      fill: ${t.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${H(t.edgeLabelBackground,.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${t.clusterBkg};
    stroke: ${t.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  .cluster span,p {
    color: ${t.titleColor};
  }
  /* .cluster div {
    color: ${t.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor};
  }
`}}]);

//# sourceMappingURL=2453.6e743aade1916fdf5cd5.js.map