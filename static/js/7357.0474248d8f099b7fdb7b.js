"use strict";var X=Object.defineProperty;var y=Object.getOwnPropertySymbols;var Z=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable;var w=(s,n,r)=>n in s?X(s,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[n]=r,$=(s,n)=>{for(var r in n||(n={}))Z.call(n,r)&&w(s,r,n[r]);if(y)for(var r of y(n))J.call(n,r)&&w(s,r,n[r]);return s};var K=(s,n,r)=>new Promise((b,u)=>{var p=c=>{try{h(r.next(c))}catch(k){u(k)}},t=c=>{try{h(r.throw(c))}catch(k){u(k)}},h=c=>c.done?b(c.value):Promise.resolve(c.value).then(p,t);h((r=r.apply(s,n)).next())});(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[7357],{63933:function(s,n,r){r.d(n,{S:function(){return u}});var b=r(69502);function u(p,t){var h,c,k;p.accDescr&&((h=t.setAccDescription)==null||h.call(t,p.accDescr)),p.accTitle&&((c=t.setAccTitle)==null||c.call(t,p.accTitle)),p.title&&((k=t.setDiagramTitle)==null||k.call(t,p.title))}(0,b.K2)(u,"populateCommonDb")},57357:function(s,n,r){r.d(n,{diagram:function(){return H}});var b=r(63933),u=r(8159),p=r(77286),t=r(69502),h=r(78731),c={packet:[]},k=structuredClone(c),T=t.UI.packet,W=(0,t.K2)(()=>{const e=(0,u.$t)($($({},T),(0,t.zj)().packet));return e.showBits&&(e.paddingY+=10),e},"getConfig"),F=(0,t.K2)(()=>k.packet,"getPacket"),S=(0,t.K2)(e=>{e.length>0&&k.packet.push(e)},"pushWord"),A=(0,t.K2)(()=>{(0,t.IU)(),k=structuredClone(c)},"clear"),x={pushWord:S,getPacket:F,getConfig:W,clear:A,setAccTitle:t.SV,getAccTitle:t.iN,setDiagramTitle:t.ke,getDiagramTitle:t.ab,getAccDescription:t.m7,setAccDescription:t.EI},M=1e4,O=(0,t.K2)(e=>{(0,b.S)(e,x);let a=-1,i=[],_=1;const{bitsPerRow:g}=x.getConfig();for(let{start:l,end:o,label:v}of e.blocks){if(o&&o<l)throw new Error(`Packet block ${l} - ${o} is invalid. End must be greater than start.`);if(l!==a+1)throw new Error(`Packet block ${l} - ${o!=null?o:l} is not contiguous. It should start from ${a+1}.`);for(a=o!=null?o:l,t.Rm.debug(`Packet block ${l} - ${a} with label ${v}`);i.length<=g+1&&x.getPacket().length<M;){const[B,f]=I({start:l,end:o,label:v},_,g);if(i.push(B),B.end+1===_*g&&(x.pushWord(i),i=[],_++),!f)break;({start:l,end:o,label:v}=f)}}x.pushWord(i)},"populate"),I=(0,t.K2)((e,a,i)=>{if(e.end===void 0&&(e.end=e.start),e.start>e.end)throw new Error(`Block start ${e.start} is greater than block end ${e.end}.`);return e.end+1<=a*i?[e,void 0]:[{start:e.start,end:a*i-1,label:e.label},{start:a*i,end:e.end,label:e.label}]},"getNextFittingBlock"),z={parse:(0,t.K2)(e=>K(this,null,function*(){const a=yield(0,h.qg)("packet",e);t.Rm.debug(a),O(a)}),"parse")},L=(0,t.K2)((e,a,i,_)=>{const g=_.db,l=g.getConfig(),{rowHeight:o,paddingY:v,bitWidth:B,bitsPerRow:f}=l,P=g.getPacket(),d=g.getDiagramTitle(),C=o+v,m=C*(P.length+1)-(d?0:o),D=B*f+2,E=(0,p.D)(a);E.attr("viewbox",`0 0 ${D} ${m}`),(0,t.a$)(E,m,D,l.useMaxWidth);for(const[Y,G]of P.entries())R(E,G,Y,l);E.append("text").text(d).attr("x",D/2).attr("y",m-C/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),R=(0,t.K2)((e,a,i,{rowHeight:_,paddingX:g,paddingY:l,bitWidth:o,bitsPerRow:v,showBits:B})=>{const f=e.append("g"),P=i*(_+l)+l;for(const d of a){const C=d.start%v*o+1,m=(d.end-d.start+1)*o-g;if(f.append("rect").attr("x",C).attr("y",P).attr("width",m).attr("height",_).attr("class","packetBlock"),f.append("text").attr("x",C+m/2).attr("y",P+_/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(d.label),!B)continue;const D=d.end===d.start,E=P-2;f.append("text").attr("x",C+(D?m/2:0)).attr("y",E).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",D?"middle":"start").text(d.start),D||f.append("text").attr("x",C+m).attr("y",E).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(d.end)}},"drawWord"),U={draw:L},j={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},N=(0,t.K2)(({packet:e}={})=>{const a=(0,u.$t)(j,e);return`
	.packetByte {
		font-size: ${a.byteFontSize};
	}
	.packetByte.start {
		fill: ${a.startByteColor};
	}
	.packetByte.end {
		fill: ${a.endByteColor};
	}
	.packetLabel {
		fill: ${a.labelColor};
		font-size: ${a.labelFontSize};
	}
	.packetTitle {
		fill: ${a.titleColor};
		font-size: ${a.titleFontSize};
	}
	.packetBlock {
		stroke: ${a.blockStrokeColor};
		stroke-width: ${a.blockStrokeWidth};
		fill: ${a.blockFillColor};
	}
	`},"styles"),H={parser:z,db:x,renderer:U,styles:N}}}]);
