"use strict";var F=(A,m,a)=>new Promise((f,o)=>{var s=r=>{try{p(a.next(r))}catch(l){o(l)}},t=r=>{try{p(a.throw(r))}catch(l){o(l)}},p=r=>r.done?f(r.value):Promise.resolve(r.value).then(s,t);p((a=a.apply(A,m)).next())});(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[1825],{63933:function(A,m,a){a.d(m,{S:function(){return o}});var f=a(69502);function o(s,t){var p,r,l;s.accDescr&&((p=t.setAccDescription)==null||p.call(t,s.accDescr)),s.accTitle&&((r=t.setAccTitle)==null||r.call(t,s.accTitle)),s.title&&((l=t.setDiagramTitle)==null||l.call(t,s.title))}(0,f.K2)(o,"populateCommonDb")},61825:function(A,m,a){a.d(m,{diagram:function(){return et}});var f=a(63933),o=a(8159),s=a(77286),t=a(69502),p=a(78731),r=a(9365),l=t.UI.pie,P={sections:new Map,showData:!1,config:l},E=P.sections,w=P.showData,G=structuredClone(l),z=(0,t.K2)(()=>structuredClone(G),"getConfig"),j=(0,t.K2)(()=>{E=new Map,w=P.showData,(0,t.IU)()},"clear"),N=(0,t.K2)(({label:e,value:n})=>{E.has(e)||(E.set(e,n),t.Rm.debug(`added new section: ${e}, with value: ${n}`))},"addSection"),H=(0,t.K2)(()=>E,"getSections"),Z=(0,t.K2)(e=>{w=e},"setShowData"),V=(0,t.K2)(()=>w,"getShowData"),M={getConfig:z,clear:j,setDiagramTitle:t.ke,getDiagramTitle:t.ab,setAccTitle:t.SV,getAccTitle:t.iN,setAccDescription:t.EI,getAccDescription:t.m7,addSection:N,getSections:H,setShowData:Z,getShowData:V},J=(0,t.K2)((e,n)=>{(0,f.S)(e,n),n.setShowData(e.showData),e.sections.map(n.addSection)},"populateDb"),X={parse:(0,t.K2)(e=>F(this,null,function*(){const n=yield(0,p.qg)("pie",e);t.Rm.debug(n),J(n,M)}),"parse")},Q=(0,t.K2)(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),Y=Q,b=(0,t.K2)(e=>{const n=[...e.entries()].map(d=>({label:d[0],value:d[1]})).sort((d,g)=>g.value-d.value);return(0,r.pie)().value(d=>d.value)(n)},"createPieArcs"),q=(0,t.K2)((e,n,at,d)=>{t.Rm.debug(`rendering pie chart
`+e);const g=d.db,I=(0,t.D7)(),R=(0,o.$t)(g.getConfig(),I.pie),k=40,_=18,C=4,D=450,y=D,O=(0,s.D)(n),h=O.append("g");h.attr("transform","translate("+y/2+","+D/2+")");const{themeVariables:c}=I;let[T]=(0,o.I5)(c.pieOuterStrokeWidth);T!=null||(T=2);const W=R.textPosition,S=Math.min(y,D)/2-k,rt=(0,r.arc)().innerRadius(0).outerRadius(S),it=(0,r.arc)().innerRadius(S*W).outerRadius(S*W);h.append("circle").attr("cx",0).attr("cy",0).attr("r",S+T/2).attr("class","pieOuterCircle");const L=g.getSections(),$=b(L),nt=[c.pie1,c.pie2,c.pie3,c.pie4,c.pie5,c.pie6,c.pie7,c.pie8,c.pie9,c.pie10,c.pie11,c.pie12],v=(0,r.scaleOrdinal)(nt);h.selectAll("mySlices").data($).enter().append("path").attr("d",rt).attr("fill",i=>v(i.data.label)).attr("class","pieCircle");let B=0;L.forEach(i=>{B+=i}),h.selectAll("mySlices").data($).enter().append("text").text(i=>(i.data.value/B*100).toFixed(0)+"%").attr("transform",i=>"translate("+it.centroid(i)+")").style("text-anchor","middle").attr("class","slice"),h.append("text").text(g.getDiagramTitle()).attr("x",0).attr("y",-(D-50)/2).attr("class","pieTitleText");const K=h.selectAll(".legend").data(v.domain()).enter().append("g").attr("class","legend").attr("transform",(i,u)=>{const x=_+C,st=x*v.domain().length/2,lt=12*_,ot=u*x-st;return"translate("+lt+","+ot+")"});K.append("rect").attr("width",_).attr("height",_).style("fill",v).style("stroke",v),K.data($).append("text").attr("x",_+C).attr("y",_-C).text(i=>{const{label:u,value:x}=i.data;return g.getShowData()?`${u} [${x}]`:u});const ct=Math.max(...K.selectAll("text").nodes().map(i=>{var u;return(u=i==null?void 0:i.getBoundingClientRect().width)!=null?u:0})),U=y+k+_+C+ct;O.attr("viewBox",`0 0 ${U} ${D}`),(0,t.a$)(O,D,U,R.useMaxWidth)},"draw"),tt={draw:q},et={parser:X,db:M,renderer:tt,styles:Y}}}]);
