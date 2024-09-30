(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[8869],{68313:function(Rt){(function(J,P){Rt.exports=P()})(this,function(){"use strict";var J="day";return function(P,vt,I){var ot=function(b){return b.add(4-b.isoWeekday(),J)},H=vt.prototype;H.isoWeekYear=function(){return ot(this).year()},H.isoWeek=function(b){if(!this.$utils().u(b))return this.add(7*(b-this.isoWeek()),J);var p,Q,z,et,W=ot(this),st=(p=this.isoWeekYear(),Q=this.$u,z=(Q?I.utc:I)().year(p).startOf("year"),et=4-z.isoWeekday(),z.isoWeekday()>4&&(et+=7),z.add(et,J));return W.diff(st,"week")+1},H.isoWeekday=function(b){return this.$utils().u(b)?this.day()||7:this.day(this.day()%7?b:b-7)};var _t=H.startOf;H.startOf=function(b,p){var Q=this.$utils(),z=!!Q.u(p)||p;return Q.p(b)==="isoweek"?z?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):_t.bind(this)(b,p)}}})},8869:function(Rt,J,P){"use strict";P.d(J,{diagram:function(){return Oe}});var vt=P(16750),I=P(74353),ot=P(68313),H=P(90445),_t=P(97375),b=P(65950),p=P(80812),Q=P(42838),z=function(){var t=function(g,i,u,d){for(u=u||{},d=g.length;d--;u[g[d]]=i);return u},s=[6,8,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30,32,33,35,37],n=[1,25],r=[1,26],a=[1,27],h=[1,28],f=[1,29],F=[1,30],Y=[1,31],N=[1,9],S=[1,10],M=[1,11],j=[1,12],R=[1,13],V=[1,14],w=[1,15],ft=[1,16],ht=[1,18],kt=[1,19],mt=[1,20],yt=[1,21],gt=[1,22],pt=[1,24],Tt=[1,32],k={trace:function(){},yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,dateFormat:19,inclusiveEndDates:20,topAxis:21,axisFormat:22,tickInterval:23,excludes:24,includes:25,todayMarker:26,title:27,acc_title:28,acc_title_value:29,acc_descr:30,acc_descr_value:31,acc_descr_multiline_value:32,section:33,clickStatement:34,taskTxt:35,taskData:36,click:37,callbackname:38,callbackargs:39,href:40,clickStatementDebug:41,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",19:"dateFormat",20:"inclusiveEndDates",21:"topAxis",22:"axisFormat",23:"tickInterval",24:"excludes",25:"includes",26:"todayMarker",27:"title",28:"acc_title",29:"acc_title_value",30:"acc_descr",31:"acc_descr_value",32:"acc_descr_multiline_value",33:"section",35:"taskTxt",36:"taskData",37:"click",38:"callbackname",39:"callbackargs",40:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[34,2],[34,3],[34,3],[34,4],[34,3],[34,4],[34,2],[41,2],[41,3],[41,3],[41,4],[41,3],[41,4],[41,2]],performAction:function(i,u,d,c,m,e,L){var l=e.length-1;switch(m){case 1:return e[l-1];case 2:this.$=[];break;case 3:e[l-1].push(e[l]),this.$=e[l-1];break;case 4:case 5:this.$=e[l];break;case 6:case 7:this.$=[];break;case 8:c.setWeekday("monday");break;case 9:c.setWeekday("tuesday");break;case 10:c.setWeekday("wednesday");break;case 11:c.setWeekday("thursday");break;case 12:c.setWeekday("friday");break;case 13:c.setWeekday("saturday");break;case 14:c.setWeekday("sunday");break;case 15:c.setDateFormat(e[l].substr(11)),this.$=e[l].substr(11);break;case 16:c.enableInclusiveEndDates(),this.$=e[l].substr(18);break;case 17:c.TopAxis(),this.$=e[l].substr(8);break;case 18:c.setAxisFormat(e[l].substr(11)),this.$=e[l].substr(11);break;case 19:c.setTickInterval(e[l].substr(13)),this.$=e[l].substr(13);break;case 20:c.setExcludes(e[l].substr(9)),this.$=e[l].substr(9);break;case 21:c.setIncludes(e[l].substr(9)),this.$=e[l].substr(9);break;case 22:c.setTodayMarker(e[l].substr(12)),this.$=e[l].substr(12);break;case 24:c.setDiagramTitle(e[l].substr(6)),this.$=e[l].substr(6);break;case 25:this.$=e[l].trim(),c.setAccTitle(this.$);break;case 26:case 27:this.$=e[l].trim(),c.setAccDescription(this.$);break;case 28:c.addSection(e[l].substr(8)),this.$=e[l].substr(8);break;case 30:c.addTask(e[l-1],e[l]),this.$="task";break;case 31:this.$=e[l-1],c.setClickEvent(e[l-1],e[l],null);break;case 32:this.$=e[l-2],c.setClickEvent(e[l-2],e[l-1],e[l]);break;case 33:this.$=e[l-2],c.setClickEvent(e[l-2],e[l-1],null),c.setLink(e[l-2],e[l]);break;case 34:this.$=e[l-3],c.setClickEvent(e[l-3],e[l-2],e[l-1]),c.setLink(e[l-3],e[l]);break;case 35:this.$=e[l-2],c.setClickEvent(e[l-2],e[l],null),c.setLink(e[l-2],e[l-1]);break;case 36:this.$=e[l-3],c.setClickEvent(e[l-3],e[l-1],e[l]),c.setLink(e[l-3],e[l-2]);break;case 37:this.$=e[l-1],c.setLink(e[l-1],e[l]);break;case 38:case 44:this.$=e[l-1]+" "+e[l];break;case 39:case 40:case 42:this.$=e[l-2]+" "+e[l-1]+" "+e[l];break;case 41:case 43:this.$=e[l-3]+" "+e[l-2]+" "+e[l-1]+" "+e[l];break}},table:[{3:1,4:[1,2]},{1:[3]},t(s,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:n,13:r,14:a,15:h,16:f,17:F,18:Y,19:N,20:S,21:M,22:j,23:R,24:V,25:w,26:ft,27:ht,28:kt,30:mt,32:yt,33:gt,34:23,35:pt,37:Tt},t(s,[2,7],{1:[2,1]}),t(s,[2,3]),{9:33,11:17,12:n,13:r,14:a,15:h,16:f,17:F,18:Y,19:N,20:S,21:M,22:j,23:R,24:V,25:w,26:ft,27:ht,28:kt,30:mt,32:yt,33:gt,34:23,35:pt,37:Tt},t(s,[2,5]),t(s,[2,6]),t(s,[2,15]),t(s,[2,16]),t(s,[2,17]),t(s,[2,18]),t(s,[2,19]),t(s,[2,20]),t(s,[2,21]),t(s,[2,22]),t(s,[2,23]),t(s,[2,24]),{29:[1,34]},{31:[1,35]},t(s,[2,27]),t(s,[2,28]),t(s,[2,29]),{36:[1,36]},t(s,[2,8]),t(s,[2,9]),t(s,[2,10]),t(s,[2,11]),t(s,[2,12]),t(s,[2,13]),t(s,[2,14]),{38:[1,37],40:[1,38]},t(s,[2,4]),t(s,[2,25]),t(s,[2,26]),t(s,[2,30]),t(s,[2,31],{39:[1,39],40:[1,40]}),t(s,[2,37],{38:[1,41]}),t(s,[2,32],{40:[1,42]}),t(s,[2,33]),t(s,[2,35],{39:[1,43]}),t(s,[2,34]),t(s,[2,36])],defaultActions:{},parseError:function(i,u){if(u.recoverable)this.trace(i);else{var d=new Error(i);throw d.hash=u,d}},parse:function(i){var u=this,d=[0],c=[],m=[null],e=[],L=this.table,l="",o=0,y=0,D=2,_=1,E=e.slice.call(arguments,1),v=Object.create(this.lexer),C={yy:{}};for(var at in this.yy)Object.prototype.hasOwnProperty.call(this.yy,at)&&(C.yy[at]=this.yy[at]);v.setInput(i,C.yy),C.yy.lexer=v,C.yy.parser=this,typeof v.yylloc=="undefined"&&(v.yylloc={});var ct=v.yylloc;e.push(ct);var Fe=v.options&&v.options.ranges;typeof C.yy.parseError=="function"?this.parseError=C.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Pe(){var X;return X=c.pop()||v.lex()||_,typeof X!="number"&&(X instanceof Array&&(c=X,X=c.pop()),X=u.symbols_[X]||X),X}for(var O,q,B,Pt,tt={},bt,K,qt,xt;;){if(q=d[d.length-1],this.defaultActions[q]?B=this.defaultActions[q]:((O===null||typeof O=="undefined")&&(O=Pe()),B=L[q]&&L[q][O]),typeof B=="undefined"||!B.length||!B[0]){var Wt="";xt=[];for(bt in L[q])this.terminals_[bt]&&bt>D&&xt.push("'"+this.terminals_[bt]+"'");v.showPosition?Wt="Parse error on line "+(o+1)+`:
`+v.showPosition()+`
Expecting `+xt.join(", ")+", got '"+(this.terminals_[O]||O)+"'":Wt="Parse error on line "+(o+1)+": Unexpected "+(O==_?"end of input":"'"+(this.terminals_[O]||O)+"'"),this.parseError(Wt,{text:v.match,token:this.terminals_[O]||O,line:v.yylineno,loc:ct,expected:xt})}if(B[0]instanceof Array&&B.length>1)throw new Error("Parse Error: multiple actions possible at state: "+q+", token: "+O);switch(B[0]){case 1:d.push(O),m.push(v.yytext),e.push(v.yylloc),d.push(B[1]),O=null,y=v.yyleng,l=v.yytext,o=v.yylineno,ct=v.yylloc;break;case 2:if(K=this.productions_[B[1]][1],tt.$=m[m.length-K],tt._$={first_line:e[e.length-(K||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(K||1)].first_column,last_column:e[e.length-1].last_column},Fe&&(tt._$.range=[e[e.length-(K||1)].range[0],e[e.length-1].range[1]]),Pt=this.performAction.apply(tt,[l,y,o,C.yy,B[1],m,e].concat(E)),typeof Pt!="undefined")return Pt;K&&(d=d.slice(0,-1*K*2),m=m.slice(0,-1*K),e=e.slice(0,-1*K)),d.push(this.productions_[B[1]][0]),m.push(tt.$),e.push(tt._$),qt=L[d[d.length-2]][d[d.length-1]],d.push(qt);break;case 3:return!0}}return!0}},x=function(){var g={EOF:1,parseError:function(u,d){if(this.yy.parser)this.yy.parser.parseError(u,d);else throw new Error(u)},setInput:function(i,u){return this.yy=u||this.yy||{},this._input=i,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var i=this._input[0];this.yytext+=i,this.yyleng++,this.offset++,this.match+=i,this.matched+=i;var u=i.match(/(?:\r\n?|\n).*/g);return u?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),i},unput:function(i){var u=i.length,d=i.split(/(?:\r\n?|\n)/g);this._input=i+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-u),this.offset-=u;var c=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),d.length-1&&(this.yylineno-=d.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:d?(d.length===c.length?this.yylloc.first_column:0)+c[c.length-d.length].length-d[0].length:this.yylloc.first_column-u},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-u]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(i){this.unput(this.match.slice(i))},pastInput:function(){var i=this.matched.substr(0,this.matched.length-this.match.length);return(i.length>20?"...":"")+i.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var i=this.match;return i.length<20&&(i+=this._input.substr(0,20-i.length)),(i.substr(0,20)+(i.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var i=this.pastInput(),u=new Array(i.length+1).join("-");return i+this.upcomingInput()+`
`+u+"^"},test_match:function(i,u){var d,c,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),c=i[0].match(/(?:\r\n?|\n).*/g),c&&(this.yylineno+=c.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:c?c[c.length-1].length-c[c.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+i[0].length},this.yytext+=i[0],this.match+=i[0],this.matches=i,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(i[0].length),this.matched+=i[0],d=this.performAction.call(this,this.yy,this,u,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),d)return d;if(this._backtrack){for(var e in m)this[e]=m[e];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var i,u,d,c;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),e=0;e<m.length;e++)if(d=this._input.match(this.rules[m[e]]),d&&(!u||d[0].length>u[0].length)){if(u=d,c=e,this.options.backtrack_lexer){if(i=this.test_match(d,m[e]),i!==!1)return i;if(this._backtrack){u=!1;continue}else return!1}else if(!this.options.flex)break}return u?(i=this.test_match(u,m[c]),i!==!1?i:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var u=this.next();return u||this.lex()},begin:function(u){this.conditionStack.push(u)},popState:function(){var u=this.conditionStack.length-1;return u>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(u){return u=this.conditionStack.length-1-Math.abs(u||0),u>=0?this.conditionStack[u]:"INITIAL"},pushState:function(u){this.begin(u)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(u,d,c,m){switch(c){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),28;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),30;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 40;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 38;case 21:this.popState();break;case 22:return 39;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 37;case 26:return 4;case 27:return 19;case 28:return 20;case 29:return 21;case 30:return 22;case 31:return 23;case 32:return 25;case 33:return 24;case 34:return 26;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return"date";case 43:return 27;case 44:return"accDescription";case 45:return 33;case 46:return 35;case 47:return 36;case 48:return":";case 49:return 6;case 50:return"INVALID"}},rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],inclusive:!0}}};return g}();k.lexer=x;function T(){this.yy={}}return T.prototype=k,k.Parser=T,new T}();z.parser=z;const et=z;I.extend(ot),I.extend(H),I.extend(_t);let W="",st="",wt,Et="",it=[],nt=[],Ct={},Dt=[],lt=[],Z="",St="";const Vt=["active","done","crit","milestone"];let At=[],rt=!1,It=!1,Lt="sunday",Mt=0;const Jt=function(){Dt=[],lt=[],Z="",At=[],ut=0,Ft=void 0,dt=void 0,A=[],W="",st="",St="",wt=void 0,Et="",it=[],nt=[],rt=!1,It=!1,Mt=0,Ct={},(0,b.v)(),Lt="sunday"},Qt=function(t){st=t},Zt=function(){return st},$t=function(t){wt=t},te=function(){return wt},ee=function(t){Et=t},se=function(){return Et},ie=function(t){W=t},ne=function(){rt=!0},re=function(){return rt},ae=function(){It=!0},ce=function(){return It},oe=function(t){St=t},le=function(){return St},ue=function(){return W},de=function(t){it=t.toLowerCase().split(/[\s,]+/)},fe=function(){return it},he=function(t){nt=t.toLowerCase().split(/[\s,]+/)},ke=function(){return nt},me=function(){return Ct},ye=function(t){Z=t,Dt.push(t)},ge=function(){return Dt},pe=function(){let t=jt();const s=10;let n=0;for(;!t&&n<s;)t=jt(),n++;return lt=A,lt},Bt=function(t,s,n,r){return r.includes(t.format(s.trim()))?!1:t.isoWeekday()>=6&&n.includes("weekends")||n.includes(t.format("dddd").toLowerCase())?!0:n.includes(t.format(s.trim()))},Te=function(t){Lt=t},be=function(){return Lt},Yt=function(t,s,n,r){if(!n.length||t.manualEndTime)return;let a;t.startTime instanceof Date?a=I(t.startTime):a=I(t.startTime,s,!0),a=a.add(1,"d");let h;t.endTime instanceof Date?h=I(t.endTime):h=I(t.endTime,s,!0);const[f,F]=xe(a,h,s,n,r);t.endTime=f.toDate(),t.renderEndTime=F},xe=function(t,s,n,r,a){let h=!1,f=null;for(;t<=s;)h||(f=s.toDate()),h=Bt(t,n,r,a),h&&(s=s.add(1,"d")),t=t.add(1,"d");return[s,f]},Ot=function(t,s,n){n=n.trim();const a=new RegExp("^after\\s+(?<ids>[\\d\\w- ]+)").exec(n);if(a!==null){let f=null;for(const Y of a.groups.ids.split(" ")){let N=G(Y);N!==void 0&&(!f||N.endTime>f.endTime)&&(f=N)}if(f)return f.endTime;const F=new Date;return F.setHours(0,0,0,0),F}let h=I(n,s.trim(),!0);if(h.isValid())return h.toDate();{b.l.debug("Invalid date:"+n),b.l.debug("With date format:"+s.trim());const f=new Date(n);if(f===void 0||isNaN(f.getTime())||f.getFullYear()<-1e4||f.getFullYear()>1e4)throw new Error("Invalid date:"+n);return f}},Nt=function(t){const s=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return s!==null?[Number.parseFloat(s[1]),s[2]]:[NaN,"ms"]},zt=function(t,s,n,r=!1){n=n.trim();const h=new RegExp("^until\\s+(?<ids>[\\d\\w- ]+)").exec(n);if(h!==null){let S=null;for(const j of h.groups.ids.split(" ")){let R=G(j);R!==void 0&&(!S||R.startTime<S.startTime)&&(S=R)}if(S)return S.startTime;const M=new Date;return M.setHours(0,0,0,0),M}let f=I(n,s.trim(),!0);if(f.isValid())return r&&(f=f.add(1,"d")),f.toDate();let F=I(t);const[Y,N]=Nt(n);if(!Number.isNaN(Y)){const S=F.add(Y,N);S.isValid()&&(F=S)}return F.toDate()};let ut=0;const $=function(t){return t===void 0?(ut=ut+1,"task"+ut):t},ve=function(t,s){let n;s.substr(0,1)===":"?n=s.substr(1,s.length):n=s;const r=n.split(","),a={};Ht(r,a,Vt);for(let f=0;f<r.length;f++)r[f]=r[f].trim();let h="";switch(r.length){case 1:a.id=$(),a.startTime=t.endTime,h=r[0];break;case 2:a.id=$(),a.startTime=Ot(void 0,W,r[0]),h=r[1];break;case 3:a.id=$(r[0]),a.startTime=Ot(void 0,W,r[1]),h=r[2];break}return h&&(a.endTime=zt(a.startTime,W,h,rt),a.manualEndTime=I(h,"YYYY-MM-DD",!0).isValid(),Yt(a,W,nt,it)),a},_e=function(t,s){let n;s.substr(0,1)===":"?n=s.substr(1,s.length):n=s;const r=n.split(","),a={};Ht(r,a,Vt);for(let h=0;h<r.length;h++)r[h]=r[h].trim();switch(r.length){case 1:a.id=$(),a.startTime={type:"prevTaskEnd",id:t},a.endTime={data:r[0]};break;case 2:a.id=$(),a.startTime={type:"getStartDate",startData:r[0]},a.endTime={data:r[1]};break;case 3:a.id=$(r[0]),a.startTime={type:"getStartDate",startData:r[1]},a.endTime={data:r[2]};break}return a};let Ft,dt,A=[];const Ut={},we=function(t,s){const n={section:Z,type:Z,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:s},task:t,classes:[]},r=_e(dt,s);n.raw.startTime=r.startTime,n.raw.endTime=r.endTime,n.id=r.id,n.prevTaskId=dt,n.active=r.active,n.done=r.done,n.crit=r.crit,n.milestone=r.milestone,n.order=Mt,Mt++;const a=A.push(n);dt=n.id,Ut[n.id]=a-1},G=function(t){const s=Ut[t];return A[s]},Ee=function(t,s){const n={section:Z,type:Z,description:t,task:t,classes:[]},r=ve(Ft,s);n.startTime=r.startTime,n.endTime=r.endTime,n.id=r.id,n.active=r.active,n.done=r.done,n.crit=r.crit,n.milestone=r.milestone,Ft=n,lt.push(n)},jt=function(){const t=function(n){const r=A[n];let a="";switch(A[n].raw.startTime.type){case"prevTaskEnd":{const h=G(r.prevTaskId);r.startTime=h.endTime;break}case"getStartDate":a=Ot(void 0,W,A[n].raw.startTime.startData),a&&(A[n].startTime=a);break}return A[n].startTime&&(A[n].endTime=zt(A[n].startTime,W,A[n].raw.endTime.data,rt),A[n].endTime&&(A[n].processed=!0,A[n].manualEndTime=I(A[n].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),Yt(A[n],W,nt,it))),A[n].processed};let s=!0;for(const[n,r]of A.entries())t(n),s=s&&r.processed;return s},Ce=function(t,s){let n=s;(0,b.c)().securityLevel!=="loose"&&(n=(0,vt.Jf)(s)),t.split(",").forEach(function(r){G(r)!==void 0&&(Xt(r,()=>{window.open(n,"_self")}),Ct[r]=n)}),Kt(t,"clickable")},Kt=function(t,s){t.split(",").forEach(function(n){let r=G(n);r!==void 0&&r.classes.push(s)})},De=function(t,s,n){if((0,b.c)().securityLevel!=="loose"||s===void 0)return;let r=[];if(typeof n=="string"){r=n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let h=0;h<r.length;h++){let f=r[h].trim();f.charAt(0)==='"'&&f.charAt(f.length-1)==='"'&&(f=f.substr(1,f.length-2)),r[h]=f}}r.length===0&&r.push(t),G(t)!==void 0&&Xt(t,()=>{b.u.runFunc(s,...r)})},Xt=function(t,s){At.push(function(){const n=document.querySelector(`[id="${t}"]`);n!==null&&n.addEventListener("click",function(){s()})},function(){const n=document.querySelector(`[id="${t}-text"]`);n!==null&&n.addEventListener("click",function(){s()})})},Se=function(t,s,n){t.split(",").forEach(function(r){De(r,s,n)}),Kt(t,"clickable")},Ae=function(t){At.forEach(function(s){s(t)})},Ie={getConfig:()=>(0,b.c)().gantt,clear:Jt,setDateFormat:ie,getDateFormat:ue,enableInclusiveEndDates:ne,endDatesAreInclusive:re,enableTopAxis:ae,topAxisEnabled:ce,setAxisFormat:Qt,getAxisFormat:Zt,setTickInterval:$t,getTickInterval:te,setTodayMarker:ee,getTodayMarker:se,setAccTitle:b.s,getAccTitle:b.g,setDiagramTitle:b.q,getDiagramTitle:b.t,setDisplayMode:oe,getDisplayMode:le,setAccDescription:b.b,getAccDescription:b.a,addSection:ye,getSections:ge,getTasks:pe,addTask:we,findTaskById:G,addTaskOrg:Ee,setIncludes:de,getIncludes:fe,setExcludes:he,getExcludes:ke,setClickEvent:Se,setLink:Ce,getLinks:me,bindFunctions:Ae,parseDuration:Nt,isInvalidDate:Bt,setWeekday:Te,getWeekday:be};function Ht(t,s,n){let r=!0;for(;r;)r=!1,n.forEach(function(a){const h="^\\s*"+a+"\\s*$",f=new RegExp(h);t[0].match(f)&&(s[a]=!0,t.shift(1),r=!0)})}const Le=function(){b.l.debug("Something is calling, setConf, remove the call")},Gt={monday:p.timeMonday,tuesday:p.timeTuesday,wednesday:p.timeWednesday,thursday:p.timeThursday,friday:p.timeFriday,saturday:p.timeSaturday,sunday:p.timeSunday},Me=(t,s)=>{let n=[...t].map(()=>-1/0),r=[...t].sort((h,f)=>h.startTime-f.startTime||h.order-f.order),a=0;for(const h of r)for(let f=0;f<n.length;f++)if(h.startTime>=n[f]){n[f]=h.endTime,h.order=f+s,f>a&&(a=f);break}return a};let U;const Oe={parser:et,db:Ie,renderer:{setConf:Le,draw:function(t,s,n,r){const a=(0,b.c)().gantt,h=(0,b.c)().securityLevel;let f;h==="sandbox"&&(f=(0,p.select)("#i"+s));const F=h==="sandbox"?(0,p.select)(f.nodes()[0].contentDocument.body):(0,p.select)("body"),Y=h==="sandbox"?f.nodes()[0].contentDocument:document,N=Y.getElementById(s);U=N.parentElement.offsetWidth,U===void 0&&(U=1200),a.useWidth!==void 0&&(U=a.useWidth);const S=r.db.getTasks();let M=[];for(const k of S)M.push(k.type);M=Tt(M);const j={};let R=2*a.topPadding;if(r.db.getDisplayMode()==="compact"||a.displayMode==="compact"){const k={};for(const T of S)k[T.section]===void 0?k[T.section]=[T]:k[T.section].push(T);let x=0;for(const T of Object.keys(k)){const g=Me(k[T],x)+1;x+=g,R+=g*(a.barHeight+a.barGap),j[T]=g}}else{R+=S.length*(a.barHeight+a.barGap);for(const k of M)j[k]=S.filter(x=>x.type===k).length}N.setAttribute("viewBox","0 0 "+U+" "+R);const V=F.select(`[id="${s}"]`),w=(0,p.scaleTime)().domain([(0,p.min)(S,function(k){return k.startTime}),(0,p.max)(S,function(k){return k.endTime})]).rangeRound([0,U-a.leftPadding-a.rightPadding]);function ft(k,x){const T=k.startTime,g=x.startTime;let i=0;return T>g?i=1:T<g&&(i=-1),i}S.sort(ft),ht(S,U,R),(0,b.i)(V,R,U,a.useMaxWidth),V.append("text").text(r.db.getDiagramTitle()).attr("x",U/2).attr("y",a.titleTopMargin).attr("class","titleText");function ht(k,x,T){const g=a.barHeight,i=g+a.barGap,u=a.topPadding,d=a.leftPadding,c=(0,p.scaleLinear)().domain([0,M.length]).range(["#00B9FA","#F95002"]).interpolate(p.interpolateHcl);mt(i,u,d,x,T,k,r.db.getExcludes(),r.db.getIncludes()),yt(d,u,x,T),kt(k,i,u,d,g,c,x),gt(i,u),pt(d,u,x,T)}function kt(k,x,T,g,i,u,d){const m=[...new Set(k.map(o=>o.order))].map(o=>k.find(y=>y.order===o));V.append("g").selectAll("rect").data(m).enter().append("rect").attr("x",0).attr("y",function(o,y){return y=o.order,y*x+T-2}).attr("width",function(){return d-a.rightPadding/2}).attr("height",x).attr("class",function(o){for(const[y,D]of M.entries())if(o.type===D)return"section section"+y%a.numberSectionStyles;return"section section0"});const e=V.append("g").selectAll("rect").data(k).enter(),L=r.db.getLinks();if(e.append("rect").attr("id",function(o){return o.id}).attr("rx",3).attr("ry",3).attr("x",function(o){return o.milestone?w(o.startTime)+g+.5*(w(o.endTime)-w(o.startTime))-.5*i:w(o.startTime)+g}).attr("y",function(o,y){return y=o.order,y*x+T}).attr("width",function(o){return o.milestone?i:w(o.renderEndTime||o.endTime)-w(o.startTime)}).attr("height",i).attr("transform-origin",function(o,y){return y=o.order,(w(o.startTime)+g+.5*(w(o.endTime)-w(o.startTime))).toString()+"px "+(y*x+T+.5*i).toString()+"px"}).attr("class",function(o){const y="task";let D="";o.classes.length>0&&(D=o.classes.join(" "));let _=0;for(const[v,C]of M.entries())o.type===C&&(_=v%a.numberSectionStyles);let E="";return o.active?o.crit?E+=" activeCrit":E=" active":o.done?o.crit?E=" doneCrit":E=" done":o.crit&&(E+=" crit"),E.length===0&&(E=" task"),o.milestone&&(E=" milestone "+E),E+=_,E+=" "+D,y+E}),e.append("text").attr("id",function(o){return o.id+"-text"}).text(function(o){return o.task}).attr("font-size",a.fontSize).attr("x",function(o){let y=w(o.startTime),D=w(o.renderEndTime||o.endTime);o.milestone&&(y+=.5*(w(o.endTime)-w(o.startTime))-.5*i),o.milestone&&(D=y+i);const _=this.getBBox().width;return _>D-y?D+_+1.5*a.leftPadding>d?y+g-5:D+g+5:(D-y)/2+y+g}).attr("y",function(o,y){return y=o.order,y*x+a.barHeight/2+(a.fontSize/2-2)+T}).attr("text-height",i).attr("class",function(o){const y=w(o.startTime);let D=w(o.endTime);o.milestone&&(D=y+i);const _=this.getBBox().width;let E="";o.classes.length>0&&(E=o.classes.join(" "));let v=0;for(const[at,ct]of M.entries())o.type===ct&&(v=at%a.numberSectionStyles);let C="";return o.active&&(o.crit?C="activeCritText"+v:C="activeText"+v),o.done?o.crit?C=C+" doneCritText"+v:C=C+" doneText"+v:o.crit&&(C=C+" critText"+v),o.milestone&&(C+=" milestoneText"),_>D-y?D+_+1.5*a.leftPadding>d?E+" taskTextOutsideLeft taskTextOutside"+v+" "+C:E+" taskTextOutsideRight taskTextOutside"+v+" "+C+" width-"+_:E+" taskText taskText"+v+" "+C+" width-"+_}),(0,b.c)().securityLevel==="sandbox"){let o;o=(0,p.select)("#i"+s);const y=o.nodes()[0].contentDocument;e.filter(function(D){return L[D.id]!==void 0}).each(function(D){var _=y.querySelector("#"+D.id),E=y.querySelector("#"+D.id+"-text");const v=_.parentNode;var C=y.createElement("a");C.setAttribute("xlink:href",L[D.id]),C.setAttribute("target","_top"),v.appendChild(C),C.appendChild(_),C.appendChild(E)})}}function mt(k,x,T,g,i,u,d,c){if(d.length===0&&c.length===0)return;let m,e;for(const{startTime:_,endTime:E}of u)(m===void 0||_<m)&&(m=_),(e===void 0||E>e)&&(e=E);if(!m||!e)return;if(I(e).diff(I(m),"year")>5){b.l.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const L=r.db.getDateFormat(),l=[];let o=null,y=I(m);for(;y.valueOf()<=e;)r.db.isInvalidDate(y,L,d,c)?o?o.end=y:o={start:y,end:y}:o&&(l.push(o),o=null),y=y.add(1,"d");V.append("g").selectAll("rect").data(l).enter().append("rect").attr("id",function(_){return"exclude-"+_.start.format("YYYY-MM-DD")}).attr("x",function(_){return w(_.start)+T}).attr("y",a.gridLineStartPadding).attr("width",function(_){const E=_.end.add(1,"day");return w(E)-w(_.start)}).attr("height",i-x-a.gridLineStartPadding).attr("transform-origin",function(_,E){return(w(_.start)+T+.5*(w(_.end)-w(_.start))).toString()+"px "+(E*k+.5*i).toString()+"px"}).attr("class","exclude-range")}function yt(k,x,T,g){let i=(0,p.axisBottom)(w).tickSize(-g+x+a.gridLineStartPadding).tickFormat((0,p.timeFormat)(r.db.getAxisFormat()||a.axisFormat||"%Y-%m-%d"));const d=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(r.db.getTickInterval()||a.tickInterval);if(d!==null){const c=d[1],m=d[2],e=r.db.getWeekday()||a.weekday;switch(m){case"millisecond":i.ticks(p.timeMillisecond.every(c));break;case"second":i.ticks(p.timeSecond.every(c));break;case"minute":i.ticks(p.timeMinute.every(c));break;case"hour":i.ticks(p.timeHour.every(c));break;case"day":i.ticks(p.timeDay.every(c));break;case"week":i.ticks(Gt[e].every(c));break;case"month":i.ticks(p.timeMonth.every(c));break}}if(V.append("g").attr("class","grid").attr("transform","translate("+k+", "+(g-50)+")").call(i).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),r.db.topAxisEnabled()||a.topAxis){let c=(0,p.axisTop)(w).tickSize(-g+x+a.gridLineStartPadding).tickFormat((0,p.timeFormat)(r.db.getAxisFormat()||a.axisFormat||"%Y-%m-%d"));if(d!==null){const m=d[1],e=d[2],L=r.db.getWeekday()||a.weekday;switch(e){case"millisecond":c.ticks(p.timeMillisecond.every(m));break;case"second":c.ticks(p.timeSecond.every(m));break;case"minute":c.ticks(p.timeMinute.every(m));break;case"hour":c.ticks(p.timeHour.every(m));break;case"day":c.ticks(p.timeDay.every(m));break;case"week":c.ticks(Gt[L].every(m));break;case"month":c.ticks(p.timeMonth.every(m));break}}V.append("g").attr("class","grid").attr("transform","translate("+k+", "+x+")").call(c).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}function gt(k,x){let T=0;const g=Object.keys(j).map(i=>[i,j[i]]);V.append("g").selectAll("text").data(g).enter().append(function(i){const u=i[0].split(b.e.lineBreakRegex),d=-(u.length-1)/2,c=Y.createElementNS("http://www.w3.org/2000/svg","text");c.setAttribute("dy",d+"em");for(const[m,e]of u.entries()){const L=Y.createElementNS("http://www.w3.org/2000/svg","tspan");L.setAttribute("alignment-baseline","central"),L.setAttribute("x","10"),m>0&&L.setAttribute("dy","1em"),L.textContent=e,c.appendChild(L)}return c}).attr("x",10).attr("y",function(i,u){if(u>0)for(let d=0;d<u;d++)return T+=g[u-1][1],i[1]*k/2+T*k+x;else return i[1]*k/2+x}).attr("font-size",a.sectionFontSize).attr("class",function(i){for(const[u,d]of M.entries())if(i[0]===d)return"sectionTitle sectionTitle"+u%a.numberSectionStyles;return"sectionTitle"})}function pt(k,x,T,g){const i=r.db.getTodayMarker();if(i==="off")return;const u=V.append("g").attr("class","today"),d=new Date,c=u.append("line");c.attr("x1",w(d)+k).attr("x2",w(d)+k).attr("y1",a.titleTopMargin).attr("y2",g-a.titleTopMargin).attr("class","today"),i!==""&&c.attr("style",i.replace(/,/g,";"))}function Tt(k){const x={},T=[];for(let g=0,i=k.length;g<i;++g)Object.prototype.hasOwnProperty.call(x,k[g])||(x[k[g]]=!0,T.push(k[g]));return T}}},styles:t=>`
  .mermaid-main-font {
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }
`}}}]);

//# sourceMappingURL=8869.bbdf83e6d5b359aa4cef.js.map