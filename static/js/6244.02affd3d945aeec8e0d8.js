(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[6244],{66244:function(Ue,$,R){"use strict";R.d($,{diagram:function(){return jt}});var _e=R(8159),i=R(69502),me=R(16750),K=R(74353),we=R(68313),W=R(90445),q=R(97375),p=R(9365),j=function(){var e=(0,i.K2)(function(_,l,u,f){for(u=u||{},f=_.length;f--;u[_[f]]=l);return u},"o"),s=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],a=[1,26],n=[1,27],c=[1,28],m=[1,29],h=[1,30],O=[1,31],z=[1,32],U=[1,33],S=[1,34],M=[1,9],G=[1,10],B=[1,11],Y=[1,12],E=[1,13],ce=[1,14],le=[1,15],oe=[1,16],ue=[1,19],de=[1,20],fe=[1,21],he=[1,22],ke=[1,23],y=[1,25],T=[1,35],v={trace:(0,i.K2)(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:(0,i.K2)(function(l,u,f,d,g,r,o){var t=r.length-1;switch(g){case 1:return r[t-1];case 2:this.$=[];break;case 3:r[t-1].push(r[t]),this.$=r[t-1];break;case 4:case 5:this.$=r[t];break;case 6:case 7:this.$=[];break;case 8:d.setWeekday("monday");break;case 9:d.setWeekday("tuesday");break;case 10:d.setWeekday("wednesday");break;case 11:d.setWeekday("thursday");break;case 12:d.setWeekday("friday");break;case 13:d.setWeekday("saturday");break;case 14:d.setWeekday("sunday");break;case 15:d.setWeekend("friday");break;case 16:d.setWeekend("saturday");break;case 17:d.setDateFormat(r[t].substr(11)),this.$=r[t].substr(11);break;case 18:d.enableInclusiveEndDates(),this.$=r[t].substr(18);break;case 19:d.TopAxis(),this.$=r[t].substr(8);break;case 20:d.setAxisFormat(r[t].substr(11)),this.$=r[t].substr(11);break;case 21:d.setTickInterval(r[t].substr(13)),this.$=r[t].substr(13);break;case 22:d.setExcludes(r[t].substr(9)),this.$=r[t].substr(9);break;case 23:d.setIncludes(r[t].substr(9)),this.$=r[t].substr(9);break;case 24:d.setTodayMarker(r[t].substr(12)),this.$=r[t].substr(12);break;case 27:d.setDiagramTitle(r[t].substr(6)),this.$=r[t].substr(6);break;case 28:this.$=r[t].trim(),d.setAccTitle(this.$);break;case 29:case 30:this.$=r[t].trim(),d.setAccDescription(this.$);break;case 31:d.addSection(r[t].substr(8)),this.$=r[t].substr(8);break;case 33:d.addTask(r[t-1],r[t]),this.$="task";break;case 34:this.$=r[t-1],d.setClickEvent(r[t-1],r[t],null);break;case 35:this.$=r[t-2],d.setClickEvent(r[t-2],r[t-1],r[t]);break;case 36:this.$=r[t-2],d.setClickEvent(r[t-2],r[t-1],null),d.setLink(r[t-2],r[t]);break;case 37:this.$=r[t-3],d.setClickEvent(r[t-3],r[t-2],r[t-1]),d.setLink(r[t-3],r[t]);break;case 38:this.$=r[t-2],d.setClickEvent(r[t-2],r[t],null),d.setLink(r[t-2],r[t-1]);break;case 39:this.$=r[t-3],d.setClickEvent(r[t-3],r[t-1],r[t]),d.setLink(r[t-3],r[t-2]);break;case 40:this.$=r[t-1],d.setLink(r[t-1],r[t]);break;case 41:case 47:this.$=r[t-1]+" "+r[t];break;case 42:case 43:case 45:this.$=r[t-2]+" "+r[t-1]+" "+r[t];break;case 44:case 46:this.$=r[t-3]+" "+r[t-2]+" "+r[t-1]+" "+r[t];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},e(s,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:a,13:n,14:c,15:m,16:h,17:O,18:z,19:18,20:U,21:S,22:M,23:G,24:B,25:Y,26:E,27:ce,28:le,29:oe,30:ue,31:de,33:fe,35:he,36:ke,37:24,38:y,40:T},e(s,[2,7],{1:[2,1]}),e(s,[2,3]),{9:36,11:17,12:a,13:n,14:c,15:m,16:h,17:O,18:z,19:18,20:U,21:S,22:M,23:G,24:B,25:Y,26:E,27:ce,28:le,29:oe,30:ue,31:de,33:fe,35:he,36:ke,37:24,38:y,40:T},e(s,[2,5]),e(s,[2,6]),e(s,[2,17]),e(s,[2,18]),e(s,[2,19]),e(s,[2,20]),e(s,[2,21]),e(s,[2,22]),e(s,[2,23]),e(s,[2,24]),e(s,[2,25]),e(s,[2,26]),e(s,[2,27]),{32:[1,37]},{34:[1,38]},e(s,[2,30]),e(s,[2,31]),e(s,[2,32]),{39:[1,39]},e(s,[2,8]),e(s,[2,9]),e(s,[2,10]),e(s,[2,11]),e(s,[2,12]),e(s,[2,13]),e(s,[2,14]),e(s,[2,15]),e(s,[2,16]),{41:[1,40],43:[1,41]},e(s,[2,4]),e(s,[2,28]),e(s,[2,29]),e(s,[2,33]),e(s,[2,34],{42:[1,42],43:[1,43]}),e(s,[2,40],{41:[1,44]}),e(s,[2,35],{43:[1,45]}),e(s,[2,36]),e(s,[2,38],{42:[1,46]}),e(s,[2,37]),e(s,[2,39])],defaultActions:{},parseError:(0,i.K2)(function(l,u){if(u.recoverable)this.trace(l);else{var f=new Error(l);throw f.hash=u,f}},"parseError"),parse:(0,i.K2)(function(l){var u=this,f=[0],d=[],g=[null],r=[],o=this.table,t="",D=0,x=0,w=0,L=2,C=1,Re=r.slice.call(arguments,1),I=Object.create(this.lexer),Z={yy:{}};for(var Ve in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Ve)&&(Z.yy[Ve]=this.yy[Ve]);I.setInput(l,Z.yy),Z.yy.lexer=I,Z.yy.parser=this,typeof I.yylloc=="undefined"&&(I.yylloc={});var Be=I.yylloc;r.push(Be);var Xt=I.options&&I.options.ranges;typeof Z.yy.parseError=="function"?this.parseError=Z.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Gt(P){f.length=f.length-2*P,g.length=g.length-P,r.length=r.length-P}(0,i.K2)(Gt,"popStack");function tt(){var P;return P=d.pop()||I.lex()||C,typeof P!="number"&&(P instanceof Array&&(d=P,P=d.pop()),P=u.symbols_[P]||P),P}(0,i.K2)(tt,"lex");for(var F,Ye,Q,N,Ht,Ne,ie={},Te,H,it,xe;;){if(Q=f[f.length-1],this.defaultActions[Q]?N=this.defaultActions[Q]:((F===null||typeof F=="undefined")&&(F=tt()),N=o[Q]&&o[Q][F]),typeof N=="undefined"||!N.length||!N[0]){var ze="";xe=[];for(Te in o[Q])this.terminals_[Te]&&Te>L&&xe.push("'"+this.terminals_[Te]+"'");I.showPosition?ze="Parse error on line "+(D+1)+`:
`+I.showPosition()+`
Expecting `+xe.join(", ")+", got '"+(this.terminals_[F]||F)+"'":ze="Parse error on line "+(D+1)+": Unexpected "+(F==C?"end of input":"'"+(this.terminals_[F]||F)+"'"),this.parseError(ze,{text:I.match,token:this.terminals_[F]||F,line:I.yylineno,loc:Be,expected:xe})}if(N[0]instanceof Array&&N.length>1)throw new Error("Parse Error: multiple actions possible at state: "+Q+", token: "+F);switch(N[0]){case 1:f.push(F),g.push(I.yytext),r.push(I.yylloc),f.push(N[1]),F=null,Ye?(F=Ye,Ye=null):(x=I.yyleng,t=I.yytext,D=I.yylineno,Be=I.yylloc,w>0&&w--);break;case 2:if(H=this.productions_[N[1]][1],ie.$=g[g.length-H],ie._$={first_line:r[r.length-(H||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(H||1)].first_column,last_column:r[r.length-1].last_column},Xt&&(ie._$.range=[r[r.length-(H||1)].range[0],r[r.length-1].range[1]]),Ne=this.performAction.apply(ie,[t,x,D,Z.yy,N[1],g,r].concat(Re)),typeof Ne!="undefined")return Ne;H&&(f=f.slice(0,-1*H*2),g=g.slice(0,-1*H),r=r.slice(0,-1*H)),f.push(this.productions_[N[1]][0]),g.push(ie.$),r.push(ie._$),it=o[f[f.length-2]][f[f.length-1]],f.push(it);break;case 3:return!0}}return!0},"parse")},b=function(){var _={EOF:1,parseError:(0,i.K2)(function(u,f){if(this.yy.parser)this.yy.parser.parseError(u,f);else throw new Error(u)},"parseError"),setInput:(0,i.K2)(function(l,u){return this.yy=u||this.yy||{},this._input=l,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:(0,i.K2)(function(){var l=this._input[0];this.yytext+=l,this.yyleng++,this.offset++,this.match+=l,this.matched+=l;var u=l.match(/(?:\r\n?|\n).*/g);return u?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),l},"input"),unput:(0,i.K2)(function(l){var u=l.length,f=l.split(/(?:\r\n?|\n)/g);this._input=l+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-u),this.offset-=u;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),f.length-1&&(this.yylineno-=f.length-1);var g=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:f?(f.length===d.length?this.yylloc.first_column:0)+d[d.length-f.length].length-f[0].length:this.yylloc.first_column-u},this.options.ranges&&(this.yylloc.range=[g[0],g[0]+this.yyleng-u]),this.yyleng=this.yytext.length,this},"unput"),more:(0,i.K2)(function(){return this._more=!0,this},"more"),reject:(0,i.K2)(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:(0,i.K2)(function(l){this.unput(this.match.slice(l))},"less"),pastInput:(0,i.K2)(function(){var l=this.matched.substr(0,this.matched.length-this.match.length);return(l.length>20?"...":"")+l.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:(0,i.K2)(function(){var l=this.match;return l.length<20&&(l+=this._input.substr(0,20-l.length)),(l.substr(0,20)+(l.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:(0,i.K2)(function(){var l=this.pastInput(),u=new Array(l.length+1).join("-");return l+this.upcomingInput()+`
`+u+"^"},"showPosition"),test_match:(0,i.K2)(function(l,u){var f,d,g;if(this.options.backtrack_lexer&&(g={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(g.yylloc.range=this.yylloc.range.slice(0))),d=l[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+l[0].length},this.yytext+=l[0],this.match+=l[0],this.matches=l,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(l[0].length),this.matched+=l[0],f=this.performAction.call(this,this.yy,this,u,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),f)return f;if(this._backtrack){for(var r in g)this[r]=g[r];return!1}return!1},"test_match"),next:(0,i.K2)(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var l,u,f,d;this._more||(this.yytext="",this.match="");for(var g=this._currentRules(),r=0;r<g.length;r++)if(f=this._input.match(this.rules[g[r]]),f&&(!u||f[0].length>u[0].length)){if(u=f,d=r,this.options.backtrack_lexer){if(l=this.test_match(f,g[r]),l!==!1)return l;if(this._backtrack){u=!1;continue}else return!1}else if(!this.options.flex)break}return u?(l=this.test_match(u,g[d]),l!==!1?l:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:(0,i.K2)(function(){var u=this.next();return u||this.lex()},"lex"),begin:(0,i.K2)(function(u){this.conditionStack.push(u)},"begin"),popState:(0,i.K2)(function(){var u=this.conditionStack.length-1;return u>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:(0,i.K2)(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:(0,i.K2)(function(u){return u=this.conditionStack.length-1-Math.abs(u||0),u>=0?this.conditionStack[u]:"INITIAL"},"topState"),pushState:(0,i.K2)(function(u){this.begin(u)},"pushState"),stateStackSize:(0,i.K2)(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,i.K2)(function(u,f,d,g){var r=g;switch(d){case 0:return this.begin("open_directive"),"open_directive";break;case 1:return this.begin("acc_title"),31;break;case 2:return this.popState(),"acc_title_value";break;case 3:return this.begin("acc_descr"),33;break;case 4:return this.popState(),"acc_descr_value";break;case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return _}();v.lexer=b;function k(){this.yy={}}return(0,i.K2)(k,"Parser"),k.prototype=v,v.Parser=k,new k}();j.parser=j;var se=j;K.extend(we),K.extend(W),K.extend(q);var ye={friday:5,saturday:6},V="",Ee="",De=void 0,Ce="",re=[],ae=[],Ke=new Map,Se=[],ge=[],ee="",Ie="",je=["active","done","crit","milestone"],Ae=[],ne=!1,Me=!1,Le="sunday",pe="saturday",Fe=0,st=(0,i.K2)(function(){Se=[],ge=[],ee="",Ae=[],ve=0,Oe=void 0,be=void 0,A=[],V="",Ee="",Ie="",De=void 0,Ce="",re=[],ae=[],ne=!1,Me=!1,Fe=0,Ke=new Map,(0,i.IU)(),Le="sunday",pe="saturday"},"clear"),rt=(0,i.K2)(function(e){Ee=e},"setAxisFormat"),at=(0,i.K2)(function(){return Ee},"getAxisFormat"),nt=(0,i.K2)(function(e){De=e},"setTickInterval"),ct=(0,i.K2)(function(){return De},"getTickInterval"),lt=(0,i.K2)(function(e){Ce=e},"setTodayMarker"),ot=(0,i.K2)(function(){return Ce},"getTodayMarker"),ut=(0,i.K2)(function(e){V=e},"setDateFormat"),dt=(0,i.K2)(function(){ne=!0},"enableInclusiveEndDates"),ft=(0,i.K2)(function(){return ne},"endDatesAreInclusive"),ht=(0,i.K2)(function(){Me=!0},"enableTopAxis"),kt=(0,i.K2)(function(){return Me},"topAxisEnabled"),mt=(0,i.K2)(function(e){Ie=e},"setDisplayMode"),yt=(0,i.K2)(function(){return Ie},"getDisplayMode"),gt=(0,i.K2)(function(){return V},"getDateFormat"),pt=(0,i.K2)(function(e){re=e.toLowerCase().split(/[\s,]+/)},"setIncludes"),vt=(0,i.K2)(function(){return re},"getIncludes"),bt=(0,i.K2)(function(e){ae=e.toLowerCase().split(/[\s,]+/)},"setExcludes"),Tt=(0,i.K2)(function(){return ae},"getExcludes"),xt=(0,i.K2)(function(){return Ke},"getLinks"),_t=(0,i.K2)(function(e){ee=e,Se.push(e)},"addSection"),wt=(0,i.K2)(function(){return Se},"getSections"),Et=(0,i.K2)(function(){let e=Ze();const s=10;let a=0;for(;!e&&a<s;)e=Ze(),a++;return ge=A,ge},"getTasks"),Xe=(0,i.K2)(function(e,s,a,n){return n.includes(e.format(s.trim()))?!1:a.includes("weekends")&&(e.isoWeekday()===ye[pe]||e.isoWeekday()===ye[pe]+1)||a.includes(e.format("dddd").toLowerCase())?!0:a.includes(e.format(s.trim()))},"isInvalidDate"),Dt=(0,i.K2)(function(e){Le=e},"setWeekday"),Ct=(0,i.K2)(function(){return Le},"getWeekday"),Kt=(0,i.K2)(function(e){pe=e},"setWeekend"),Ge=(0,i.K2)(function(e,s,a,n){if(!a.length||e.manualEndTime)return;let c;e.startTime instanceof Date?c=K(e.startTime):c=K(e.startTime,s,!0),c=c.add(1,"d");let m;e.endTime instanceof Date?m=K(e.endTime):m=K(e.endTime,s,!0);const[h,O]=St(c,m,s,a,n);e.endTime=h.toDate(),e.renderEndTime=O},"checkTaskDates"),St=(0,i.K2)(function(e,s,a,n,c){let m=!1,h=null;for(;e<=s;)m||(h=s.toDate()),m=Xe(e,a,n,c),m&&(s=s.add(1,"d")),e=e.add(1,"d");return[s,h]},"fixTaskDates"),We=(0,i.K2)(function(e,s,a){a=a.trim();const c=new RegExp("^after\\s+(?<ids>[\\d\\w- ]+)").exec(a);if(c!==null){let h=null;for(const z of c.groups.ids.split(" ")){let U=J(z);U!==void 0&&(!h||U.endTime>h.endTime)&&(h=U)}if(h)return h.endTime;const O=new Date;return O.setHours(0,0,0,0),O}let m=K(a,s.trim(),!0);if(m.isValid())return m.toDate();{i.Rm.debug("Invalid date:"+a),i.Rm.debug("With date format:"+s.trim());const h=new Date(a);if(h===void 0||isNaN(h.getTime())||h.getFullYear()<-1e4||h.getFullYear()>1e4)throw new Error("Invalid date:"+a);return h}},"getStartDate"),He=(0,i.K2)(function(e){const s=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(e.trim());return s!==null?[Number.parseFloat(s[1]),s[2]]:[NaN,"ms"]},"parseDuration"),qe=(0,i.K2)(function(e,s,a,n=!1){a=a.trim();const m=new RegExp("^until\\s+(?<ids>[\\d\\w- ]+)").exec(a);if(m!==null){let S=null;for(const G of m.groups.ids.split(" ")){let B=J(G);B!==void 0&&(!S||B.startTime<S.startTime)&&(S=B)}if(S)return S.startTime;const M=new Date;return M.setHours(0,0,0,0),M}let h=K(a,s.trim(),!0);if(h.isValid())return n&&(h=h.add(1,"d")),h.toDate();let O=K(e);const[z,U]=He(a);if(!Number.isNaN(z)){const S=O.add(z,U);S.isValid()&&(O=S)}return O.toDate()},"getEndDate"),ve=0,te=(0,i.K2)(function(e){return e===void 0?(ve=ve+1,"task"+ve):e},"parseId"),It=(0,i.K2)(function(e,s){let a;s.substr(0,1)===":"?a=s.substr(1,s.length):a=s;const n=a.split(","),c={};Pe(n,c,je);for(let h=0;h<n.length;h++)n[h]=n[h].trim();let m="";switch(n.length){case 1:c.id=te(),c.startTime=e.endTime,m=n[0];break;case 2:c.id=te(),c.startTime=We(void 0,V,n[0]),m=n[1];break;case 3:c.id=te(n[0]),c.startTime=We(void 0,V,n[1]),m=n[2];break;default:}return m&&(c.endTime=qe(c.startTime,V,m,ne),c.manualEndTime=K(m,"YYYY-MM-DD",!0).isValid(),Ge(c,V,ae,re)),c},"compileData"),At=(0,i.K2)(function(e,s){let a;s.substr(0,1)===":"?a=s.substr(1,s.length):a=s;const n=a.split(","),c={};Pe(n,c,je);for(let m=0;m<n.length;m++)n[m]=n[m].trim();switch(n.length){case 1:c.id=te(),c.startTime={type:"prevTaskEnd",id:e},c.endTime={data:n[0]};break;case 2:c.id=te(),c.startTime={type:"getStartDate",startData:n[0]},c.endTime={data:n[1]};break;case 3:c.id=te(n[0]),c.startTime={type:"getStartDate",startData:n[1]},c.endTime={data:n[2]};break;default:}return c},"parseData"),Oe,be,A=[],Je={},Mt=(0,i.K2)(function(e,s){const a={section:ee,type:ee,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:s},task:e,classes:[]},n=At(be,s);a.raw.startTime=n.startTime,a.raw.endTime=n.endTime,a.id=n.id,a.prevTaskId=be,a.active=n.active,a.done=n.done,a.crit=n.crit,a.milestone=n.milestone,a.order=Fe,Fe++;const c=A.push(a);be=a.id,Je[a.id]=c-1},"addTask"),J=(0,i.K2)(function(e){const s=Je[e];return A[s]},"findTaskById"),Lt=(0,i.K2)(function(e,s){const a={section:ee,type:ee,description:e,task:e,classes:[]},n=It(Oe,s);a.startTime=n.startTime,a.endTime=n.endTime,a.id=n.id,a.active=n.active,a.done=n.done,a.crit=n.crit,a.milestone=n.milestone,Oe=a,ge.push(a)},"addTaskOrg"),Ze=(0,i.K2)(function(){const e=(0,i.K2)(function(a){const n=A[a];let c="";switch(A[a].raw.startTime.type){case"prevTaskEnd":{const m=J(n.prevTaskId);n.startTime=m.endTime;break}case"getStartDate":c=We(void 0,V,A[a].raw.startTime.startData),c&&(A[a].startTime=c);break}return A[a].startTime&&(A[a].endTime=qe(A[a].startTime,V,A[a].raw.endTime.data,ne),A[a].endTime&&(A[a].processed=!0,A[a].manualEndTime=K(A[a].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),Ge(A[a],V,ae,re))),A[a].processed},"compileTask");let s=!0;for(const[a,n]of A.entries())e(a),s=s&&n.processed;return s},"compileTasks"),Ft=(0,i.K2)(function(e,s){let a=s;(0,i.D7)().securityLevel!=="loose"&&(a=(0,me.J)(s)),e.split(",").forEach(function(n){J(n)!==void 0&&($e(n,()=>{window.open(a,"_self")}),Ke.set(n,a))}),Qe(e,"clickable")},"setLink"),Qe=(0,i.K2)(function(e,s){e.split(",").forEach(function(a){let n=J(a);n!==void 0&&n.classes.push(s)})},"setClass"),Wt=(0,i.K2)(function(e,s,a){if((0,i.D7)().securityLevel!=="loose"||s===void 0)return;let n=[];if(typeof a=="string"){n=a.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let m=0;m<n.length;m++){let h=n[m].trim();h.startsWith('"')&&h.endsWith('"')&&(h=h.substr(1,h.length-2)),n[m]=h}}n.length===0&&n.push(e),J(e)!==void 0&&$e(e,()=>{_e._K.runFunc(s,...n)})},"setClickFun"),$e=(0,i.K2)(function(e,s){Ae.push(function(){const a=document.querySelector(`[id="${e}"]`);a!==null&&a.addEventListener("click",function(){s()})},function(){const a=document.querySelector(`[id="${e}-text"]`);a!==null&&a.addEventListener("click",function(){s()})})},"pushFun"),Ot=(0,i.K2)(function(e,s,a){e.split(",").forEach(function(n){Wt(n,s,a)}),Qe(e,"clickable")},"setClickEvent"),Pt=(0,i.K2)(function(e){Ae.forEach(function(s){s(e)})},"bindFunctions"),Rt={getConfig:(0,i.K2)(()=>(0,i.D7)().gantt,"getConfig"),clear:st,setDateFormat:ut,getDateFormat:gt,enableInclusiveEndDates:dt,endDatesAreInclusive:ft,enableTopAxis:ht,topAxisEnabled:kt,setAxisFormat:rt,getAxisFormat:at,setTickInterval:nt,getTickInterval:ct,setTodayMarker:lt,getTodayMarker:ot,setAccTitle:i.SV,getAccTitle:i.iN,setDiagramTitle:i.ke,getDiagramTitle:i.ab,setDisplayMode:mt,getDisplayMode:yt,setAccDescription:i.EI,getAccDescription:i.m7,addSection:_t,getSections:wt,getTasks:Et,addTask:Mt,findTaskById:J,addTaskOrg:Lt,setIncludes:pt,getIncludes:vt,setExcludes:bt,getExcludes:Tt,setClickEvent:Ot,setLink:Ft,getLinks:xt,bindFunctions:Pt,parseDuration:He,isInvalidDate:Xe,setWeekday:Dt,getWeekday:Ct,setWeekend:Kt};function Pe(e,s,a){let n=!0;for(;n;)n=!1,a.forEach(function(c){const m="^\\s*"+c+"\\s*$",h=new RegExp(m);e[0].match(h)&&(s[c]=!0,e.shift(1),n=!0)})}(0,i.K2)(Pe,"getTaskTags");var Vt=(0,i.K2)(function(){i.Rm.debug("Something is calling, setConf, remove the call")},"setConf"),et={monday:p.timeMonday,tuesday:p.timeTuesday,wednesday:p.timeWednesday,thursday:p.timeThursday,friday:p.timeFriday,saturday:p.timeSaturday,sunday:p.timeSunday},Bt=(0,i.K2)((e,s)=>{let a=[...e].map(()=>-1/0),n=[...e].sort((m,h)=>m.startTime-h.startTime||m.order-h.order),c=0;for(const m of n)for(let h=0;h<a.length;h++)if(m.startTime>=a[h]){a[h]=m.endTime,m.order=h+s,h>c&&(c=h);break}return c},"getMaxIntersections"),X,Yt=(0,i.K2)(function(e,s,a,n){const c=(0,i.D7)().gantt,m=(0,i.D7)().securityLevel;let h;m==="sandbox"&&(h=(0,p.select)("#i"+s));const O=m==="sandbox"?(0,p.select)(h.nodes()[0].contentDocument.body):(0,p.select)("body"),z=m==="sandbox"?h.nodes()[0].contentDocument:document,U=z.getElementById(s);X=U.parentElement.offsetWidth,X===void 0&&(X=1200),c.useWidth!==void 0&&(X=c.useWidth);const S=n.db.getTasks();let M=[];for(const y of S)M.push(y.type);M=ke(M);const G={};let B=2*c.topPadding;if(n.db.getDisplayMode()==="compact"||c.displayMode==="compact"){const y={};for(const v of S)y[v.section]===void 0?y[v.section]=[v]:y[v.section].push(v);let T=0;for(const v of Object.keys(y)){const b=Bt(y[v],T)+1;T+=b,B+=b*(c.barHeight+c.barGap),G[v]=b}}else{B+=S.length*(c.barHeight+c.barGap);for(const y of M)G[y]=S.filter(T=>T.type===y).length}U.setAttribute("viewBox","0 0 "+X+" "+B);const Y=O.select(`[id="${s}"]`),E=(0,p.scaleTime)().domain([(0,p.min)(S,function(y){return y.startTime}),(0,p.max)(S,function(y){return y.endTime})]).rangeRound([0,X-c.leftPadding-c.rightPadding]);function ce(y,T){const v=y.startTime,b=T.startTime;let k=0;return v>b?k=1:v<b&&(k=-1),k}(0,i.K2)(ce,"taskCompare"),S.sort(ce),le(S,X,B),(0,i.a$)(Y,B,X,c.useMaxWidth),Y.append("text").text(n.db.getDiagramTitle()).attr("x",X/2).attr("y",c.titleTopMargin).attr("class","titleText");function le(y,T,v){const b=c.barHeight,k=b+c.barGap,_=c.topPadding,l=c.leftPadding,u=(0,p.scaleLinear)().domain([0,M.length]).range(["#00B9FA","#F95002"]).interpolate(p.interpolateHcl);ue(k,_,l,T,v,y,n.db.getExcludes(),n.db.getIncludes()),de(l,_,T,v),oe(y,k,_,l,b,u,T,v),fe(k,_,l,b,u),he(l,_,T,v)}(0,i.K2)(le,"makeGantt");function oe(y,T,v,b,k,_,l){const f=[...new Set(y.map(o=>o.order))].map(o=>y.find(t=>t.order===o));Y.append("g").selectAll("rect").data(f).enter().append("rect").attr("x",0).attr("y",function(o,t){return t=o.order,t*T+v-2}).attr("width",function(){return l-c.rightPadding/2}).attr("height",T).attr("class",function(o){for(const[t,D]of M.entries())if(o.type===D)return"section section"+t%c.numberSectionStyles;return"section section0"});const d=Y.append("g").selectAll("rect").data(y).enter(),g=n.db.getLinks();if(d.append("rect").attr("id",function(o){return o.id}).attr("rx",3).attr("ry",3).attr("x",function(o){return o.milestone?E(o.startTime)+b+.5*(E(o.endTime)-E(o.startTime))-.5*k:E(o.startTime)+b}).attr("y",function(o,t){return t=o.order,t*T+v}).attr("width",function(o){return o.milestone?k:E(o.renderEndTime||o.endTime)-E(o.startTime)}).attr("height",k).attr("transform-origin",function(o,t){return t=o.order,(E(o.startTime)+b+.5*(E(o.endTime)-E(o.startTime))).toString()+"px "+(t*T+v+.5*k).toString()+"px"}).attr("class",function(o){const t="task";let D="";o.classes.length>0&&(D=o.classes.join(" "));let x=0;for(const[L,C]of M.entries())o.type===C&&(x=L%c.numberSectionStyles);let w="";return o.active?o.crit?w+=" activeCrit":w=" active":o.done?o.crit?w=" doneCrit":w=" done":o.crit&&(w+=" crit"),w.length===0&&(w=" task"),o.milestone&&(w=" milestone "+w),w+=x,w+=" "+D,t+w}),d.append("text").attr("id",function(o){return o.id+"-text"}).text(function(o){return o.task}).attr("font-size",c.fontSize).attr("x",function(o){let t=E(o.startTime),D=E(o.renderEndTime||o.endTime);o.milestone&&(t+=.5*(E(o.endTime)-E(o.startTime))-.5*k),o.milestone&&(D=t+k);const x=this.getBBox().width;return x>D-t?D+x+1.5*c.leftPadding>l?t+b-5:D+b+5:(D-t)/2+t+b}).attr("y",function(o,t){return t=o.order,t*T+c.barHeight/2+(c.fontSize/2-2)+v}).attr("text-height",k).attr("class",function(o){const t=E(o.startTime);let D=E(o.endTime);o.milestone&&(D=t+k);const x=this.getBBox().width;let w="";o.classes.length>0&&(w=o.classes.join(" "));let L=0;for(const[Re,I]of M.entries())o.type===I&&(L=Re%c.numberSectionStyles);let C="";return o.active&&(o.crit?C="activeCritText"+L:C="activeText"+L),o.done?o.crit?C=C+" doneCritText"+L:C=C+" doneText"+L:o.crit&&(C=C+" critText"+L),o.milestone&&(C+=" milestoneText"),x>D-t?D+x+1.5*c.leftPadding>l?w+" taskTextOutsideLeft taskTextOutside"+L+" "+C:w+" taskTextOutsideRight taskTextOutside"+L+" "+C+" width-"+x:w+" taskText taskText"+L+" "+C+" width-"+x}),(0,i.D7)().securityLevel==="sandbox"){let o;o=(0,p.select)("#i"+s);const t=o.nodes()[0].contentDocument;d.filter(function(D){return g.has(D.id)}).each(function(D){var x=t.querySelector("#"+D.id),w=t.querySelector("#"+D.id+"-text");const L=x.parentNode;var C=t.createElement("a");C.setAttribute("xlink:href",g.get(D.id)),C.setAttribute("target","_top"),L.appendChild(C),C.appendChild(x),C.appendChild(w)})}}(0,i.K2)(oe,"drawRects");function ue(y,T,v,b,k,_,l,u){if(l.length===0&&u.length===0)return;let f,d;for(const{startTime:x,endTime:w}of _)(f===void 0||x<f)&&(f=x),(d===void 0||w>d)&&(d=w);if(!f||!d)return;if(K(d).diff(K(f),"year")>5){i.Rm.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const g=n.db.getDateFormat(),r=[];let o=null,t=K(f);for(;t.valueOf()<=d;)n.db.isInvalidDate(t,g,l,u)?o?o.end=t:o={start:t,end:t}:o&&(r.push(o),o=null),t=t.add(1,"d");Y.append("g").selectAll("rect").data(r).enter().append("rect").attr("id",function(x){return"exclude-"+x.start.format("YYYY-MM-DD")}).attr("x",function(x){return E(x.start)+v}).attr("y",c.gridLineStartPadding).attr("width",function(x){const w=x.end.add(1,"day");return E(w)-E(x.start)}).attr("height",k-T-c.gridLineStartPadding).attr("transform-origin",function(x,w){return(E(x.start)+v+.5*(E(x.end)-E(x.start))).toString()+"px "+(w*y+.5*k).toString()+"px"}).attr("class","exclude-range")}(0,i.K2)(ue,"drawExcludeDays");function de(y,T,v,b){let k=(0,p.axisBottom)(E).tickSize(-b+T+c.gridLineStartPadding).tickFormat((0,p.timeFormat)(n.db.getAxisFormat()||c.axisFormat||"%Y-%m-%d"));const l=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(n.db.getTickInterval()||c.tickInterval);if(l!==null){const u=l[1],f=l[2],d=n.db.getWeekday()||c.weekday;switch(f){case"millisecond":k.ticks(p.timeMillisecond.every(u));break;case"second":k.ticks(p.timeSecond.every(u));break;case"minute":k.ticks(p.timeMinute.every(u));break;case"hour":k.ticks(p.timeHour.every(u));break;case"day":k.ticks(p.timeDay.every(u));break;case"week":k.ticks(et[d].every(u));break;case"month":k.ticks(p.timeMonth.every(u));break}}if(Y.append("g").attr("class","grid").attr("transform","translate("+y+", "+(b-50)+")").call(k).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),n.db.topAxisEnabled()||c.topAxis){let u=(0,p.axisTop)(E).tickSize(-b+T+c.gridLineStartPadding).tickFormat((0,p.timeFormat)(n.db.getAxisFormat()||c.axisFormat||"%Y-%m-%d"));if(l!==null){const f=l[1],d=l[2],g=n.db.getWeekday()||c.weekday;switch(d){case"millisecond":u.ticks(p.timeMillisecond.every(f));break;case"second":u.ticks(p.timeSecond.every(f));break;case"minute":u.ticks(p.timeMinute.every(f));break;case"hour":u.ticks(p.timeHour.every(f));break;case"day":u.ticks(p.timeDay.every(f));break;case"week":u.ticks(et[g].every(f));break;case"month":u.ticks(p.timeMonth.every(f));break}}Y.append("g").attr("class","grid").attr("transform","translate("+y+", "+T+")").call(u).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}(0,i.K2)(de,"makeGrid");function fe(y,T){let v=0;const b=Object.keys(G).map(k=>[k,G[k]]);Y.append("g").selectAll("text").data(b).enter().append(function(k){const _=k[0].split(i.Y2.lineBreakRegex),l=-(_.length-1)/2,u=z.createElementNS("http://www.w3.org/2000/svg","text");u.setAttribute("dy",l+"em");for(const[f,d]of _.entries()){const g=z.createElementNS("http://www.w3.org/2000/svg","tspan");g.setAttribute("alignment-baseline","central"),g.setAttribute("x","10"),f>0&&g.setAttribute("dy","1em"),g.textContent=d,u.appendChild(g)}return u}).attr("x",10).attr("y",function(k,_){if(_>0)for(let l=0;l<_;l++)return v+=b[_-1][1],k[1]*y/2+v*y+T;else return k[1]*y/2+T}).attr("font-size",c.sectionFontSize).attr("class",function(k){for(const[_,l]of M.entries())if(k[0]===l)return"sectionTitle sectionTitle"+_%c.numberSectionStyles;return"sectionTitle"})}(0,i.K2)(fe,"vertLabels");function he(y,T,v,b){const k=n.db.getTodayMarker();if(k==="off")return;const _=Y.append("g").attr("class","today"),l=new Date,u=_.append("line");u.attr("x1",E(l)+y).attr("x2",E(l)+y).attr("y1",c.titleTopMargin).attr("y2",b-c.titleTopMargin).attr("class","today"),k!==""&&u.attr("style",k.replace(/,/g,";"))}(0,i.K2)(he,"drawToday");function ke(y){const T={},v=[];for(let b=0,k=y.length;b<k;++b)Object.prototype.hasOwnProperty.call(T,y[b])||(T[y[b]]=!0,v.push(y[b]));return v}(0,i.K2)(ke,"checkUnique")},"draw"),Nt={setConf:Vt,draw:Yt},zt=(0,i.K2)(e=>`
  .mermaid-main-font {
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .exclude-range {
    fill: ${e.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${e.sectionBkgColor};
  }

  .section2 {
    fill: ${e.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${e.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${e.titleColor};
  }

  .sectionTitle1 {
    fill: ${e.titleColor};
  }

  .sectionTitle2 {
    fill: ${e.titleColor};
  }

  .sectionTitle3 {
    fill: ${e.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${e.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${e.fontFamily};
    fill: ${e.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${e.todayLineColor};
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
    fill: ${e.taskTextDarkColor};
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideLeft {
    fill: ${e.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${e.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${e.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${e.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${e.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${e.taskBkgColor};
    stroke: ${e.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${e.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${e.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${e.activeTaskBkgColor};
    stroke: ${e.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${e.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${e.doneTaskBorderColor};
    fill: ${e.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${e.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${e.critBorderColor};
    fill: ${e.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${e.critBorderColor};
    fill: ${e.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${e.critBorderColor};
    fill: ${e.doneTaskBkgColor};
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
    fill: ${e.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${e.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.titleColor||e.textColor};
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }
`,"getStyles"),Ut=zt,jt={parser:se,db:Rt,renderer:Nt,styles:Ut}},68313:function(Ue){(function($,R){Ue.exports=R()})(this,function(){"use strict";var $="day";return function(R,_e,i){var me=function(W){return W.add(4-W.isoWeekday(),$)},K=_e.prototype;K.isoWeekYear=function(){return me(this).year()},K.isoWeek=function(W){if(!this.$utils().u(W))return this.add(7*(W-this.isoWeek()),$);var q,p,j,se,ye=me(this),V=(q=this.isoWeekYear(),p=this.$u,j=(p?i.utc:i)().year(q).startOf("year"),se=4-j.isoWeekday(),j.isoWeekday()>4&&(se+=7),j.add(se,$));return ye.diff(V,"week")+1},K.isoWeekday=function(W){return this.$utils().u(W)?this.day()||7:this.day(this.day()%7?W:W-7)};var we=K.startOf;K.startOf=function(W,q){var p=this.$utils(),j=!!p.u(q)||q;return p.p(W)==="isoweek"?j?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):we.bind(this)(W,q)}}})}}]);
