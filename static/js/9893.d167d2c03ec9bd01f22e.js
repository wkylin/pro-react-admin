"use strict";var G=(O,D,a)=>new Promise((v,c)=>{var r=s=>{try{x(a.next(s))}catch(g){c(g)}},M=s=>{try{x(a.throw(s))}catch(g){c(g)}},x=s=>s.done?v(s.value):Promise.resolve(s.value).then(r,M);x((a=a.apply(O,D)).next())});(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[9893],{43349:function(O,D,a){a.d(D,{a:function(){return c}});var v=a(96225);function c(r,M){var x=r.append("foreignObject").attr("width","100000"),s=x.append("xhtml:div");s.attr("xmlns","http://www.w3.org/1999/xhtml");var g=M.label;switch(typeof g){case"function":s.insert(g);break;case"object":s.insert(function(){return g});break;default:s.html(g)}v.bg(s,M.labelStyle),s.style("display","inline-block"),s.style("white-space","nowrap");var I=s.node().getBoundingClientRect();return x.attr("width",I.width).attr("height",I.height),x}},96225:function(O,D,a){a.d(D,{$p:function(){return I},O1:function(){return M},WR:function(){return R},bF:function(){return r},bg:function(){return g}});var v=a(37514),c=a(73234);function r(d,w){return!!d.children(w).length}function M(d){return s(d.v)+":"+s(d.w)+":"+s(d.name)}var x=/:/g;function s(d){return d?String(d).replace(x,"\\:"):""}function g(d,w){w&&d.attr("style",w)}function I(d,w,_){w&&d.attr("class",w).attr("class",_+" "+d.attr("class"))}function R(d,w){var _=w.graph();if(v.Z(_)){var N=_.transition;if(c.Z(N))return N(d)}return d}},19893:function(O,D,a){a.d(D,{diagram:function(){return w}});var v=a(88955),c=a(88544),r=a(438),M=a(74812),x=a(45625),s=a(33771),g=a(69368),I=a(27484),R=a(17967),d=a(27856);const w={parser:v.p,db:v.f,renderer:c.f,styles:c.a,init:_=>{_.flowchart||(_.flowchart={}),_.flowchart.arrowMarkerAbsolute=_.arrowMarkerAbsolute,(0,r.p)({flowchart:{arrowMarkerAbsolute:_.arrowMarkerAbsolute}}),c.f.setConf(_.flowchart),v.f.clear(),v.f.setGen("gen-2")}}},88544:function(O,D,a){a.d(D,{a:function(){return Y},f:function(){return Z}});var v=a(45625),c=a(74812),r=a(438),M=a(87936),x=a(43349),s=a(75971),g=a(91767),R=(t,f)=>s.Z.lang.round(g.Z.parse(t)[f]),d=a(51117);const w={},_=function(t){const f=Object.keys(t);for(const C of f)w[C]=t[C]},N=function(t,f,C,u,b,y){const m=u.select(`[id="${C}"]`);Object.keys(t).forEach(function(p){const l=t[p];let T="default";l.classes.length>0&&(T=l.classes.join(" ")),T=T+" flowchart-label";const E=(0,r.k)(l.styles);let e=l.text!==void 0?l.text:l.id,i;if(r.l.info("vertex",l,l.labelType),l.labelType==="markdown")r.l.info("vertex",l,l.labelType);else if((0,r.m)((0,r.c)().flowchart.htmlLabels)){const P={label:e.replace(/fa[blrs]?:fa-[\w-]+/g,A=>`<i class='${A.replace(":"," ")}'></i>`)};i=(0,x.a)(m,P).node(),i.parentNode.removeChild(i)}else{const P=b.createElementNS("http://www.w3.org/2000/svg","text");P.setAttribute("style",E.labelStyle.replace("color:","fill:"));const A=e.split(r.e.lineBreakRegex);for(const U of A){const B=b.createElementNS("http://www.w3.org/2000/svg","tspan");B.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),B.setAttribute("dy","1em"),B.setAttribute("x","1"),B.textContent=U,P.appendChild(B)}i=P}let h=0,o="";switch(l.type){case"round":h=5,o="rect";break;case"square":o="rect";break;case"diamond":o="question";break;case"hexagon":o="hexagon";break;case"odd":o="rect_left_inv_arrow";break;case"lean_right":o="lean_right";break;case"lean_left":o="lean_left";break;case"trapezoid":o="trapezoid";break;case"inv_trapezoid":o="inv_trapezoid";break;case"odd_right":o="rect_left_inv_arrow";break;case"circle":o="circle";break;case"ellipse":o="ellipse";break;case"stadium":o="stadium";break;case"subroutine":o="subroutine";break;case"cylinder":o="cylinder";break;case"group":o="rect";break;case"doublecircle":o="doublecircle";break;default:o="rect"}f.setNode(l.id,{labelStyle:E.labelStyle,shape:o,labelText:e,labelType:l.labelType,rx:h,ry:h,class:T,style:E.style,id:l.id,link:l.link,linkTarget:l.linkTarget,tooltip:y.db.getTooltip(l.id)||"",domId:y.db.lookUpDomId(l.id),haveCallback:l.haveCallback,width:l.type==="group"?500:void 0,dir:l.dir,type:l.type,props:l.props,padding:(0,r.c)().flowchart.padding}),r.l.info("setNode",{labelStyle:E.labelStyle,labelType:l.labelType,shape:o,labelText:e,rx:h,ry:h,class:T,style:E.style,id:l.id,domId:y.db.lookUpDomId(l.id),width:l.type==="group"?500:void 0,type:l.type,dir:l.dir,props:l.props,padding:(0,r.c)().flowchart.padding})})},W=function(t,f,C){r.l.info("abc78 edges = ",t);let u=0,b={},y,m;if(t.defaultStyle!==void 0){const n=(0,r.k)(t.defaultStyle);y=n.style,m=n.labelStyle}t.forEach(function(n){u++;const p="L-"+n.start+"-"+n.end;b[p]===void 0?(b[p]=0,r.l.info("abc78 new entry",p,b[p])):(b[p]++,r.l.info("abc78 new entry",p,b[p]));let l=p+"-"+b[p];r.l.info("abc78 new link id to be used is",p,l,b[p]);const T="LS-"+n.start,E="LE-"+n.end,e={style:"",labelStyle:""};switch(e.minlen=n.length||1,n.type==="arrow_open"?e.arrowhead="none":e.arrowhead="normal",e.arrowTypeStart="arrow_open",e.arrowTypeEnd="arrow_open",n.type){case"double_arrow_cross":e.arrowTypeStart="arrow_cross";case"arrow_cross":e.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":e.arrowTypeStart="arrow_point";case"arrow_point":e.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":e.arrowTypeStart="arrow_circle";case"arrow_circle":e.arrowTypeEnd="arrow_circle";break}let i="",h="";switch(n.stroke){case"normal":i="fill:none;",y!==void 0&&(i=y),m!==void 0&&(h=m),e.thickness="normal",e.pattern="solid";break;case"dotted":e.thickness="normal",e.pattern="dotted",e.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":e.thickness="thick",e.pattern="solid",e.style="stroke-width: 3.5px;fill:none;";break;case"invisible":e.thickness="invisible",e.pattern="solid",e.style="stroke-width: 0;fill:none;";break}if(n.style!==void 0){const o=(0,r.k)(n.style);i=o.style,h=o.labelStyle}e.style=e.style+=i,e.labelStyle=e.labelStyle+=h,n.interpolate!==void 0?e.curve=(0,r.n)(n.interpolate,c.c_6):t.defaultInterpolate!==void 0?e.curve=(0,r.n)(t.defaultInterpolate,c.c_6):e.curve=(0,r.n)(w.curve,c.c_6),n.text===void 0?n.style!==void 0&&(e.arrowheadStyle="fill: #333"):(e.arrowheadStyle="fill: #333",e.labelpos="c"),e.labelType=n.labelType,e.label=n.text.replace(r.e.lineBreakRegex,`
`),n.style===void 0&&(e.style=e.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),e.labelStyle=e.labelStyle.replace("color:","fill:"),e.id=l,e.classes="flowchart-link "+T+" "+E,f.setEdge(n.start,n.end,e,u)})},Z={setConf:_,addVertices:N,addEdges:W,getClasses:function(t,f){return f.db.getClasses()},draw:function(t,f,C,u){return G(this,null,function*(){r.l.info("Drawing flowchart");let b=u.db.getDirection();b===void 0&&(b="TD");const{securityLevel:y,flowchart:m}=(0,r.c)(),n=m.nodeSpacing||50,p=m.rankSpacing||50;let l;y==="sandbox"&&(l=(0,c.Ys)("#i"+f));const T=y==="sandbox"?(0,c.Ys)(l.nodes()[0].contentDocument.body):(0,c.Ys)("body"),E=y==="sandbox"?l.nodes()[0].contentDocument:document,e=new v.k({multigraph:!0,compound:!0}).setGraph({rankdir:b,nodesep:n,ranksep:p,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}});let i;const h=u.db.getSubGraphs();r.l.info("Subgraphs - ",h);for(let k=h.length-1;k>=0;k--)i=h[k],r.l.info("Subgraph - ",i),u.db.addVertex(i.id,{text:i.title,type:i.labelType},"group",void 0,i.classes,i.dir);const o=u.db.getVertices(),P=u.db.getEdges();r.l.info("Edges",P);let A=0;for(A=h.length-1;A>=0;A--){i=h[A],(0,c.td_)("cluster").append("text");for(let k=0;k<i.nodes.length;k++)r.l.info("Setting up subgraphs",i.nodes[k],i.id),e.setParent(i.nodes[k],i.id)}N(o,e,f,T,E,u),W(P,e);const U=T.select(`[id="${f}"]`),B=T.select("#"+f+" g");if(yield(0,M.r)(B,e,["point","circle","cross"],"flowchart",f),r.u.insertTitle(U,"flowchartTitleText",m.titleTopMargin,u.db.getDiagramTitle()),(0,r.o)(e,U,m.diagramPadding,m.useMaxWidth),u.db.indexNodes("subGraph"+A),!m.htmlLabels){const k=E.querySelectorAll('[id="'+f+'"] .edgeLabel .label');for(const L of k){const $=L.getBBox(),S=E.createElementNS("http://www.w3.org/2000/svg","rect");S.setAttribute("rx",0),S.setAttribute("ry",0),S.setAttribute("width",$.width),S.setAttribute("height",$.height),L.insertBefore(S,L.firstChild)}}Object.keys(o).forEach(function(k){const L=o[k];if(L.link){const $=(0,c.Ys)("#"+f+' [id="'+k+'"]');if($){const S=E.createElementNS("http://www.w3.org/2000/svg","a");S.setAttributeNS("http://www.w3.org/2000/svg","class",L.classes.join(" ")),S.setAttributeNS("http://www.w3.org/2000/svg","href",L.link),S.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),y==="sandbox"?S.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):L.linkTarget&&S.setAttributeNS("http://www.w3.org/2000/svg","target",L.linkTarget);const K=$.insert(function(){return S},":first-child"),j=$.select(".label-container");j&&K.append(function(){return j.node()});const z=$.select(".label");z&&K.append(function(){return z.node()})}}})})}},V=(t,f)=>{const C=R,u=C(t,"r"),b=C(t,"g"),y=C(t,"b");return d.Z(u,b,y,f)},Y=t=>`.label {
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
    background-color: ${V(t.edgeLabelBackground,.5)};
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

//# sourceMappingURL=9893.d167d2c03ec9bd01f22e.js.map