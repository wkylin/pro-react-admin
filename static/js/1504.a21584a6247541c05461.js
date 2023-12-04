"use strict";(self.webpackChunkpro_react_admin=self.webpackChunkpro_react_admin||[]).push([[1504],{41504:function(Se,Yt,xt){xt.d(Yt,{D:function(){return G},S:function(){return ut},a:function(){return Dt},b:function(){return Y},c:function(){return Ut},d:function(){return ue},p:function(){return Gt},s:function(){return fe}});var u=xt(438),ht=function(){var t=function(C,r,n,i){for(n=n||{},i=C.length;i--;n[C[i]]=r);return n},s=[1,2],a=[1,3],h=[1,4],d=[2,4],p=[1,9],y=[1,11],E=[1,15],f=[1,16],b=[1,17],k=[1,18],$=[1,30],H=[1,19],K=[1,20],W=[1,21],X=[1,22],J=[1,23],q=[1,25],Q=[1,26],Z=[1,27],tt=[1,28],et=[1,29],st=[1,32],it=[1,33],rt=[1,34],nt=[1,35],P=[1,31],l=[1,4,5,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],at=[1,4,5,13,14,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],Ft=[4,5,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],_t={trace:function(){},yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,cssClassStatement:11,idStatement:12,DESCR:13,"-->":14,HIDE_EMPTY:15,scale:16,WIDTH:17,COMPOSIT_STATE:18,STRUCT_START:19,STRUCT_STOP:20,STATE_DESCR:21,AS:22,ID:23,FORK:24,JOIN:25,CHOICE:26,CONCURRENT:27,note:28,notePosition:29,NOTE_TEXT:30,direction:31,acc_title:32,acc_title_value:33,acc_descr:34,acc_descr_value:35,acc_descr_multiline_value:36,classDef:37,CLASSDEF_ID:38,CLASSDEF_STYLEOPTS:39,DEFAULT:40,class:41,CLASSENTITY_IDS:42,STYLECLASS:43,direction_tb:44,direction_bt:45,direction_rl:46,direction_lr:47,eol:48,";":49,EDGE_STATE:50,STYLE_SEPARATOR:51,left_of:52,right_of:53,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",13:"DESCR",14:"-->",15:"HIDE_EMPTY",16:"scale",17:"WIDTH",18:"COMPOSIT_STATE",19:"STRUCT_START",20:"STRUCT_STOP",21:"STATE_DESCR",22:"AS",23:"ID",24:"FORK",25:"JOIN",26:"CHOICE",27:"CONCURRENT",28:"note",30:"NOTE_TEXT",32:"acc_title",33:"acc_title_value",34:"acc_descr",35:"acc_descr_value",36:"acc_descr_multiline_value",37:"classDef",38:"CLASSDEF_ID",39:"CLASSDEF_STYLEOPTS",40:"DEFAULT",41:"class",42:"CLASSENTITY_IDS",43:"STYLECLASS",44:"direction_tb",45:"direction_bt",46:"direction_rl",47:"direction_lr",49:";",50:"EDGE_STATE",51:"STYLE_SEPARATOR",52:"left_of",53:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[10,3],[10,3],[11,3],[31,1],[31,1],[31,1],[31,1],[48,1],[48,1],[12,1],[12,1],[12,3],[12,3],[29,1],[29,1]],performAction:function(r,n,i,o,S,e,F){var c=e.length-1;switch(S){case 3:return o.setRootDoc(e[c]),e[c];case 4:this.$=[];break;case 5:e[c]!="nl"&&(e[c-1].push(e[c]),this.$=e[c-1]);break;case 6:case 7:this.$=e[c];break;case 8:this.$="nl";break;case 11:this.$=e[c];break;case 12:const V=e[c-1];V.description=o.trimColon(e[c]),this.$=V;break;case 13:this.$={stmt:"relation",state1:e[c-2],state2:e[c]};break;case 14:const mt=o.trimColon(e[c]);this.$={stmt:"relation",state1:e[c-3],state2:e[c-1],description:mt};break;case 18:this.$={stmt:"state",id:e[c-3],type:"default",description:"",doc:e[c-1]};break;case 19:var A=e[c],O=e[c-2].trim();if(e[c].match(":")){var ct=e[c].split(":");A=ct[0],O=[O,ct[1]]}this.$={stmt:"state",id:A,type:"default",description:O};break;case 20:this.$={stmt:"state",id:e[c-3],type:"default",description:e[c-5],doc:e[c-1]};break;case 21:this.$={stmt:"state",id:e[c],type:"fork"};break;case 22:this.$={stmt:"state",id:e[c],type:"join"};break;case 23:this.$={stmt:"state",id:e[c],type:"choice"};break;case 24:this.$={stmt:"state",id:o.getDividerId(),type:"divider"};break;case 25:this.$={stmt:"state",id:e[c-1].trim(),note:{position:e[c-2].trim(),text:e[c].trim()}};break;case 28:this.$=e[c].trim(),o.setAccTitle(this.$);break;case 29:case 30:this.$=e[c].trim(),o.setAccDescription(this.$);break;case 31:case 32:this.$={stmt:"classDef",id:e[c-1].trim(),classes:e[c].trim()};break;case 33:this.$={stmt:"applyClass",id:e[c-1].trim(),styleClass:e[c].trim()};break;case 34:o.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 35:o.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 36:o.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 37:o.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 40:case 41:this.$={stmt:"state",id:e[c].trim(),type:"default",description:""};break;case 42:this.$={stmt:"state",id:e[c-2].trim(),classes:[e[c].trim()],type:"default",description:""};break;case 43:this.$={stmt:"state",id:e[c-2].trim(),classes:[e[c].trim()],type:"default",description:""};break}},table:[{3:1,4:s,5:a,6:h},{1:[3]},{3:5,4:s,5:a,6:h},{3:6,4:s,5:a,6:h},t([1,4,5,15,16,18,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],d,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:p,5:y,8:8,9:10,10:12,11:13,12:14,15:E,16:f,18:b,21:k,23:$,24:H,25:K,26:W,27:X,28:J,31:24,32:q,34:Q,36:Z,37:tt,41:et,44:st,45:it,46:rt,47:nt,50:P},t(l,[2,5]),{9:36,10:12,11:13,12:14,15:E,16:f,18:b,21:k,23:$,24:H,25:K,26:W,27:X,28:J,31:24,32:q,34:Q,36:Z,37:tt,41:et,44:st,45:it,46:rt,47:nt,50:P},t(l,[2,7]),t(l,[2,8]),t(l,[2,9]),t(l,[2,10]),t(l,[2,11],{13:[1,37],14:[1,38]}),t(l,[2,15]),{17:[1,39]},t(l,[2,17],{19:[1,40]}),{22:[1,41]},t(l,[2,21]),t(l,[2,22]),t(l,[2,23]),t(l,[2,24]),{29:42,30:[1,43],52:[1,44],53:[1,45]},t(l,[2,27]),{33:[1,46]},{35:[1,47]},t(l,[2,30]),{38:[1,48],40:[1,49]},{42:[1,50]},t(at,[2,40],{51:[1,51]}),t(at,[2,41],{51:[1,52]}),t(l,[2,34]),t(l,[2,35]),t(l,[2,36]),t(l,[2,37]),t(l,[2,6]),t(l,[2,12]),{12:53,23:$,50:P},t(l,[2,16]),t(Ft,d,{7:54}),{23:[1,55]},{23:[1,56]},{22:[1,57]},{23:[2,44]},{23:[2,45]},t(l,[2,28]),t(l,[2,29]),{39:[1,58]},{39:[1,59]},{43:[1,60]},{23:[1,61]},{23:[1,62]},t(l,[2,13],{13:[1,63]}),{4:p,5:y,8:8,9:10,10:12,11:13,12:14,15:E,16:f,18:b,20:[1,64],21:k,23:$,24:H,25:K,26:W,27:X,28:J,31:24,32:q,34:Q,36:Z,37:tt,41:et,44:st,45:it,46:rt,47:nt,50:P},t(l,[2,19],{19:[1,65]}),{30:[1,66]},{23:[1,67]},t(l,[2,31]),t(l,[2,32]),t(l,[2,33]),t(at,[2,42]),t(at,[2,43]),t(l,[2,14]),t(l,[2,18]),t(Ft,d,{7:68}),t(l,[2,25]),t(l,[2,26]),{4:p,5:y,8:8,9:10,10:12,11:13,12:14,15:E,16:f,18:b,20:[1,69],21:k,23:$,24:H,25:K,26:W,27:X,28:J,31:24,32:q,34:Q,36:Z,37:tt,41:et,44:st,45:it,46:rt,47:nt,50:P},t(l,[2,20])],defaultActions:{5:[2,1],6:[2,2],44:[2,44],45:[2,45]},parseError:function(r,n){if(n.recoverable)this.trace(r);else{var i=new Error(r);throw i.hash=n,i}},parse:function(r){var n=this,i=[0],o=[],S=[null],e=[],F=this.table,c="",A=0,O=0,ct=2,V=1,mt=e.slice.call(arguments,1),_=Object.create(this.lexer),L={yy:{}};for(var Tt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Tt)&&(L.yy[Tt]=this.yy[Tt]);_.setInput(r,L.yy),L.yy.lexer=_,L.yy.parser=this,typeof _.yylloc=="undefined"&&(_.yylloc={});var kt=_.yylloc;e.push(kt);var pe=_.options&&_.options.ranges;typeof L.yy.parseError=="function"?this.parseError=L.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function ye(){var D;return D=o.pop()||_.lex()||V,typeof D!="number"&&(D instanceof Array&&(o=D,D=o.pop()),D=n.symbols_[D]||D),D}for(var m,I,T,Et,N={},lt,x,Vt,ot;;){if(I=i[i.length-1],this.defaultActions[I]?T=this.defaultActions[I]:((m===null||typeof m=="undefined")&&(m=ye()),T=F[I]&&F[I][m]),typeof T=="undefined"||!T.length||!T[0]){var bt="";ot=[];for(lt in F[I])this.terminals_[lt]&&lt>ct&&ot.push("'"+this.terminals_[lt]+"'");_.showPosition?bt="Parse error on line "+(A+1)+`:
`+_.showPosition()+`
Expecting `+ot.join(", ")+", got '"+(this.terminals_[m]||m)+"'":bt="Parse error on line "+(A+1)+": Unexpected "+(m==V?"end of input":"'"+(this.terminals_[m]||m)+"'"),this.parseError(bt,{text:_.match,token:this.terminals_[m]||m,line:_.yylineno,loc:kt,expected:ot})}if(T[0]instanceof Array&&T.length>1)throw new Error("Parse Error: multiple actions possible at state: "+I+", token: "+m);switch(T[0]){case 1:i.push(m),S.push(_.yytext),e.push(_.yylloc),i.push(T[1]),m=null,O=_.yyleng,c=_.yytext,A=_.yylineno,kt=_.yylloc;break;case 2:if(x=this.productions_[T[1]][1],N.$=S[S.length-x],N._$={first_line:e[e.length-(x||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(x||1)].first_column,last_column:e[e.length-1].last_column},pe&&(N._$.range=[e[e.length-(x||1)].range[0],e[e.length-1].range[1]]),Et=this.performAction.apply(N,[c,O,A,L.yy,T[1],S,e].concat(mt)),typeof Et!="undefined")return Et;x&&(i=i.slice(0,-1*x*2),S=S.slice(0,-1*x),e=e.slice(0,-1*x)),i.push(this.productions_[T[1]][0]),S.push(N.$),e.push(N._$),Vt=F[i[i.length-2]][i[i.length-1]],i.push(Vt);break;case 3:return!0}}return!0}},de=function(){var C={EOF:1,parseError:function(n,i){if(this.yy.parser)this.yy.parser.parseError(n,i);else throw new Error(n)},setInput:function(r,n){return this.yy=n||this.yy||{},this._input=r,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var r=this._input[0];this.yytext+=r,this.yyleng++,this.offset++,this.match+=r,this.matched+=r;var n=r.match(/(?:\r\n?|\n).*/g);return n?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),r},unput:function(r){var n=r.length,i=r.split(/(?:\r\n?|\n)/g);this._input=r+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-n),this.offset-=n;var o=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var S=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===o.length?this.yylloc.first_column:0)+o[o.length-i.length].length-i[0].length:this.yylloc.first_column-n},this.options.ranges&&(this.yylloc.range=[S[0],S[0]+this.yyleng-n]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(r){this.unput(this.match.slice(r))},pastInput:function(){var r=this.matched.substr(0,this.matched.length-this.match.length);return(r.length>20?"...":"")+r.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var r=this.match;return r.length<20&&(r+=this._input.substr(0,20-r.length)),(r.substr(0,20)+(r.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var r=this.pastInput(),n=new Array(r.length+1).join("-");return r+this.upcomingInput()+`
`+n+"^"},test_match:function(r,n){var i,o,S;if(this.options.backtrack_lexer&&(S={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(S.yylloc.range=this.yylloc.range.slice(0))),o=r[0].match(/(?:\r\n?|\n).*/g),o&&(this.yylineno+=o.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:o?o[o.length-1].length-o[o.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length},this.yytext+=r[0],this.match+=r[0],this.matches=r,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(r[0].length),this.matched+=r[0],i=this.performAction.call(this,this.yy,this,n,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack){for(var e in S)this[e]=S[e];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var r,n,i,o;this._more||(this.yytext="",this.match="");for(var S=this._currentRules(),e=0;e<S.length;e++)if(i=this._input.match(this.rules[S[e]]),i&&(!n||i[0].length>n[0].length)){if(n=i,o=e,this.options.backtrack_lexer){if(r=this.test_match(i,S[e]),r!==!1)return r;if(this._backtrack){n=!1;continue}else return!1}else if(!this.options.flex)break}return n?(r=this.test_match(n,S[o]),r!==!1?r:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var n=this.next();return n||this.lex()},begin:function(n){this.conditionStack.push(n)},popState:function(){var n=this.conditionStack.length-1;return n>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(n){return n=this.conditionStack.length-1-Math.abs(n||0),n>=0?this.conditionStack[n]:"INITIAL"},pushState:function(n){this.begin(n)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(n,i,o,S){switch(o){case 0:return 40;case 1:return 44;case 2:return 45;case 3:return 46;case 4:return 47;case 5:break;case 6:break;case 7:return 5;case 8:break;case 9:break;case 10:break;case 11:break;case 12:return this.pushState("SCALE"),16;case 13:return 17;case 14:this.popState();break;case 15:return this.begin("acc_title"),32;case 16:return this.popState(),"acc_title_value";case 17:return this.begin("acc_descr"),34;case 18:return this.popState(),"acc_descr_value";case 19:this.begin("acc_descr_multiline");break;case 20:this.popState();break;case 21:return"acc_descr_multiline_value";case 22:return this.pushState("CLASSDEF"),37;case 23:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 24:return this.popState(),this.pushState("CLASSDEFID"),38;case 25:return this.popState(),39;case 26:return this.pushState("CLASS"),41;case 27:return this.popState(),this.pushState("CLASS_STYLE"),42;case 28:return this.popState(),43;case 29:return this.pushState("SCALE"),16;case 30:return 17;case 31:this.popState();break;case 32:this.pushState("STATE");break;case 33:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),24;case 34:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),25;case 35:return this.popState(),i.yytext=i.yytext.slice(0,-10).trim(),26;case 36:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),24;case 37:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),25;case 38:return this.popState(),i.yytext=i.yytext.slice(0,-10).trim(),26;case 39:return 44;case 40:return 45;case 41:return 46;case 42:return 47;case 43:this.pushState("STATE_STRING");break;case 44:return this.pushState("STATE_ID"),"AS";case 45:return this.popState(),"ID";case 46:this.popState();break;case 47:return"STATE_DESCR";case 48:return 18;case 49:this.popState();break;case 50:return this.popState(),this.pushState("struct"),19;case 51:break;case 52:return this.popState(),20;case 53:break;case 54:return this.begin("NOTE"),28;case 55:return this.popState(),this.pushState("NOTE_ID"),52;case 56:return this.popState(),this.pushState("NOTE_ID"),53;case 57:this.popState(),this.pushState("FLOATING_NOTE");break;case 58:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 59:break;case 60:return"NOTE_TEXT";case 61:return this.popState(),"ID";case 62:return this.popState(),this.pushState("NOTE_TEXT"),23;case 63:return this.popState(),i.yytext=i.yytext.substr(2).trim(),30;case 64:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),30;case 65:return 6;case 66:return 6;case 67:return 15;case 68:return 50;case 69:return 23;case 70:return i.yytext=i.yytext.trim(),13;case 71:return 14;case 72:return 27;case 73:return 51;case 74:return 5;case 75:return"INVALID"}},rules:[/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[9,10],inclusive:!1},struct:{rules:[9,10,22,26,32,39,40,41,42,51,52,53,54,68,69,70,71,72],inclusive:!1},FLOATING_NOTE_ID:{rules:[61],inclusive:!1},FLOATING_NOTE:{rules:[58,59,60],inclusive:!1},NOTE_TEXT:{rules:[63,64],inclusive:!1},NOTE_ID:{rules:[62],inclusive:!1},NOTE:{rules:[55,56,57],inclusive:!1},CLASS_STYLE:{rules:[28],inclusive:!1},CLASS:{rules:[27],inclusive:!1},CLASSDEFID:{rules:[25],inclusive:!1},CLASSDEF:{rules:[23,24],inclusive:!1},acc_descr_multiline:{rules:[20,21],inclusive:!1},acc_descr:{rules:[18],inclusive:!1},acc_title:{rules:[16],inclusive:!1},SCALE:{rules:[13,14,30,31],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[45],inclusive:!1},STATE_STRING:{rules:[46,47],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[9,10,33,34,35,36,37,38,43,44,48,49,50],inclusive:!1},ID:{rules:[9,10],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,10,11,12,15,17,19,22,26,29,32,50,54,65,66,67,68,69,70,71,73,74,75],inclusive:!0}}};return C}();_t.lexer=de;function gt(){this.yy={}}return gt.prototype=_t,_t.Parser=gt,new gt}();ht.parser=ht;const Gt=ht,jt="LR",Ut="TB",Y="state",ut="relation",Mt="classDef",zt="applyClass",G="default",Dt="divider",ft="[*]",Ct="start",vt=ft,At="end",Lt="color",It="fill",Ht="bgFill",Kt=",";function Ot(){return{}}let Nt=jt,j=[],R=Ot();const Rt=()=>({relations:[],states:{},documents:{}});let U={root:Rt()},g=U.root,w=0,wt=0;const Wt={LINE:0,DOTTED_LINE:1},Xt={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},M=t=>JSON.parse(JSON.stringify(t)),Jt=t=>{u.l.info("Setting root doc",t),j=t},qt=()=>j,z=(t,s,a)=>{if(s.stmt===ut)z(t,s.state1,!0),z(t,s.state2,!1);else if(s.stmt===Y&&(s.id==="[*]"?(s.id=a?t.id+"_start":t.id+"_end",s.start=a):s.id=s.id.trim()),s.doc){const h=[];let d=[],p;for(p=0;p<s.doc.length;p++)if(s.doc[p].type===Dt){const y=M(s.doc[p]);y.doc=M(d),h.push(y),d=[]}else d.push(s.doc[p]);if(h.length>0&&d.length>0){const y={stmt:Y,id:(0,u.G)(),type:"divider",doc:M(d)};h.push(M(y)),s.doc=h}s.doc.forEach(y=>z(s,y,!0))}},Qt=()=>(z({id:"root"},{id:"root",doc:j},!0),{id:"root",doc:j}),Zt=t=>{let s;t.doc?s=t.doc:s=t,u.l.info(s),Bt(!0),u.l.info("Extract",s),s.forEach(a=>{switch(a.stmt){case Y:v(a.id.trim(),a.type,a.doc,a.description,a.note,a.classes,a.styles,a.textStyles);break;case ut:$t(a.state1,a.state2,a.description);break;case Mt:Pt(a.id.trim(),a.classes);break;case zt:St(a.id.trim(),a.styleClass);break}})},v=function(t,s=G,a=null,h=null,d=null,p=null,y=null,E=null){const f=t==null?void 0:t.trim();g.states[f]===void 0?(u.l.info("Adding state ",f,h),g.states[f]={id:f,descriptions:[],type:s,doc:a,note:d,classes:[],styles:[],textStyles:[]}):(g.states[f].doc||(g.states[f].doc=a),g.states[f].type||(g.states[f].type=s)),h&&(u.l.info("Setting state description",f,h),typeof h=="string"&&yt(f,h.trim()),typeof h=="object"&&h.forEach(b=>yt(f,b.trim()))),d&&(g.states[f].note=d,g.states[f].note.text=u.e.sanitizeText(g.states[f].note.text,(0,u.c)())),p&&(u.l.info("Setting state classes",f,p),(typeof p=="string"?[p]:p).forEach(k=>St(f,k.trim()))),y&&(u.l.info("Setting state styles",f,y),(typeof y=="string"?[y]:y).forEach(k=>oe(f,k.trim()))),E&&(u.l.info("Setting state styles",f,y),(typeof E=="string"?[E]:E).forEach(k=>he(f,k.trim())))},Bt=function(t){U={root:Rt()},g=U.root,w=0,R=Ot(),t||(0,u.t)()},B=function(t){return g.states[t]},te=function(){return g.states},ee=function(){u.l.info("Documents = ",U)},se=function(){return g.relations};function dt(t=""){let s=t;return t===ft&&(w++,s=`${Ct}${w}`),s}function pt(t="",s=G){return t===ft?Ct:s}function ie(t=""){let s=t;return t===vt&&(w++,s=`${At}${w}`),s}function re(t="",s=G){return t===vt?At:s}function ne(t,s,a){let h=dt(t.id.trim()),d=pt(t.id.trim(),t.type),p=dt(s.id.trim()),y=pt(s.id.trim(),s.type);v(h,d,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),v(p,y,s.doc,s.description,s.note,s.classes,s.styles,s.textStyles),g.relations.push({id1:h,id2:p,relationTitle:u.e.sanitizeText(a,(0,u.c)())})}const $t=function(t,s,a){if(typeof t=="object")ne(t,s,a);else{const h=dt(t.trim()),d=pt(t),p=ie(s.trim()),y=re(s);v(h,d),v(p,y),g.relations.push({id1:h,id2:p,title:u.e.sanitizeText(a,(0,u.c)())})}},yt=function(t,s){const a=g.states[t],h=s.startsWith(":")?s.replace(":","").trim():s;a.descriptions.push(u.e.sanitizeText(h,(0,u.c)()))},ae=function(t){return t.substring(0,1)===":"?t.substr(2).trim():t.trim()},ce=()=>(wt++,"divider-id-"+wt),Pt=function(t,s=""){R[t]===void 0&&(R[t]={id:t,styles:[],textStyles:[]});const a=R[t];s!=null&&s.split(Kt).forEach(h=>{const d=h.replace(/([^;]*);/,"$1").trim();if(h.match(Lt)){const y=d.replace(It,Ht).replace(Lt,It);a.textStyles.push(y)}a.styles.push(d)})},le=function(){return R},St=function(t,s){t.split(",").forEach(function(a){let h=B(a);if(h===void 0){const d=a.trim();v(d),h=B(d)}h.classes.push(s)})},oe=function(t,s){const a=B(t);a!==void 0&&a.textStyles.push(s)},he=function(t,s){const a=B(t);a!==void 0&&a.textStyles.push(s)},ue={getConfig:()=>(0,u.c)().state,addState:v,clear:Bt,getState:B,getStates:te,getRelations:se,getClasses:le,getDirection:()=>Nt,addRelation:$t,getDividerId:ce,setDirection:t=>{Nt=t},cleanupLabel:ae,lineType:Wt,relationType:Xt,logDocuments:ee,getRootDoc:qt,setRootDoc:Jt,getRootDocV2:Qt,extract:Zt,trimColon:t=>t&&t[0]===":"?t.substr(1).trim():t.trim(),getAccTitle:u.g,setAccTitle:u.s,getAccDescription:u.a,setAccDescription:u.b,addStyleClass:Pt,setCssClass:St,addDescription:yt,setDiagramTitle:u.q,getDiagramTitle:u.r},fe=t=>`
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

//# sourceMappingURL=1504.a21584a6247541c05461.js.map