(()=>{var __webpack_modules__={890:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.lexer=void 0;const s=r(n(271));t.lexer=s.default.compile({ws:/[ \t]+/,nl:{match:/[\n\s]/,lineBreaks:!0},comment:{match:/\/\/[^\n]*/,value:e=>e.substring(1)},string_literal:{match:/"(?:[^\n\\"]|\\["\\ntbfr])*"/,value:e=>JSON.parse(e)},number_literal:{match:/[0-9]+(?:\.[0-9]+)?/,value:e=>Number(e)},intrinsic:{match:/\+|\-|\*|divmod|max|print|over|swap|dup|mod|drop|!8|@8|!16|@16|!64|@64|shl|shr|or|and|ge|le|ne|not|rot|!32|@32|here|stop|>=|<=|!=|!|cast\(ptr\)|cast\(bool\)|cast\(int\)|\=|\>|\</,type:s.default.keywords({plus:"+",minus:"-",times:"*",divmod:"divmod",max:"max",mod:"mod",print:"print",eq:"=",gt:">",lt:"<",over:"over",swap:"swap",dup:"dup",drop:"drop",store8:"!8",load8:"@8",store16:"!16",load16:"@16",store64:"!64",load64:"@64",shl:"shl",shr:"shr",or:"or",and:"and",ge:">=",le:"<=",ne:"!=",not:"!",rot:"rot",load32:"@32",store32:"!32",cast_ptr:"cast(ptr)",cast_int:"cast(int)",cast_bool:"cast(bool)",here:"here",stop:"stop"})},identifier:{match:/[^\s \t]+/,type:s.default.keywords({ifStatement:"if",elseStatement:"else",whileStatement:"while",doStatement:"do",include:"include",memory:"memory",proc:"proc",constStatement:"const",end:"end",offset:"offset",reset:"reset",assert:"assert",in:"in"})}}),t.default=t.lexer},548:(e,t,n)=>{!function(){function t(e){return e[0]}const{lexer:r}=n(890);function s(e){return{line:e.line,col:e.col-1}}function o(e){if(-1!==e.text.lastIndexOf("\n"))throw new Error("Unsupported case: token with line breaks");return{line:e.line,col:e.col+e.text.length-1}}function i(e){return{type:(t=e[0]).type,value:t.value,start:s(t),end:o(t)};var t}var a={Lexer:r,ParserRules:[{name:"program",symbols:["__ml","statements","__ml"],postprocess:e=>e[1]},{name:"statements",symbols:["statement","_ml","statements"],postprocess:e=>[e[0],...e[2]]},{name:"statements",symbols:["statement"],postprocess:e=>e},{name:"statement",symbols:["number"],postprocess:t},{name:"statement",symbols:["intrinsic"],postprocess:t},{name:"statement",symbols:["identifier"],postprocess:t},{name:"statement",symbols:["macro"],postprocess:t},{name:"statement",symbols:["proc"],postprocess:t},{name:"statement",symbols:["memory"],postprocess:t},{name:"statement",symbols:["constStatement"],postprocess:t},{name:"statement",symbols:["include"],postprocess:t},{name:"statement",symbols:["conditional"],postprocess:t},{name:"statement",symbols:["whileStatement"],postprocess:t},{name:"statement",symbols:["string_literal"],postprocess:t},{name:"statement",symbols:["line_comment"],postprocess:t},{name:"whileStatement",symbols:[r.has("whileStatement")?{type:"whileStatement"}:whileStatement,"_ml","statements","_ml",r.has("doStatement")?{type:"doStatement"}:doStatement,"_ml","statements","_ml",r.has("end")?{type:"end"}:end],postprocess:e=>({type:"while",condition:e[2],body:e[6]})},{name:"conditional",symbols:["ifStatement"],postprocess:t},{name:"conditional",symbols:["ifElse"],postprocess:t},{name:"ifElse",symbols:[r.has("ifStatement")?{type:"ifStatement"}:ifStatement,"_ml","statements","_ml",r.has("elseStatement")?{type:"elseStatement"}:elseStatement,"_ml","statements","_ml",r.has("end")?{type:"end"}:end],postprocess:e=>({type:"ifElse",body:e[2],elseBranch:e[6]})},{name:"ifElse",symbols:[r.has("ifStatement")?{type:"ifStatement"}:ifStatement,"_ml","statements","_ml",r.has("elseStatement")?{type:"elseStatement"}:elseStatement,"_ml","statements","_ml","conditional"],postprocess:e=>({type:"ifElse",elseCondition:e[6],body:e[2],elseBranch:[e[8]]})},{name:"ifStatement",symbols:[r.has("ifStatement")?{type:"ifStatement"}:ifStatement,"_ml","statements","_ml",r.has("end")?{type:"end"}:end],postprocess:e=>({type:"if",body:e[2]})},{name:"macro",symbols:[r.has("macro")?{type:"macro"}:macro,"_ml","identifier","_ml","statements","_ml",r.has("end")?{type:"end"}:end],postprocess:e=>({type:"macro",name:e[2].value,body:e[4]})},{name:"memory",symbols:[r.has("memory")?{type:"memory"}:memory,"_ml","identifier","_ml","statements","_ml",r.has("end")?{type:"end"}:end],postprocess:e=>({type:"memory",name:e[2].value,body:e[4]})},{name:"proc",symbols:[r.has("proc")?{type:"proc"}:proc,"_ml","identifier","_ml","statements","_ml",r.has("end")?{type:"end"}:end],postprocess:e=>({type:"proc",name:e[2].value,body:e[4]})},{name:"constStatement",symbols:[r.has("constStatement")?{type:"constStatement"}:constStatement,"_ml","identifier","_ml","statements","_ml",r.has("end")?{type:"end"}:end],postprocess:e=>({type:"const",name:e[2].value,body:e[4]})},{name:"include",symbols:[r.has("include")?{type:"include"}:include,"_ml","string_literal"],postprocess:e=>({type:"include",file:e[2]})},{name:"line_comment",symbols:[r.has("comment")?{type:"comment"}:comment],postprocess:i},{name:"string_literal",symbols:[r.has("string_literal")?{type:"string_literal"}:string_literal],postprocess:i},{name:"number",symbols:[r.has("number_literal")?{type:"number_literal"}:number_literal],postprocess:i},{name:"intrinsic",symbols:[r.has("plus")?{type:"plus"}:plus],postprocess:i},{name:"intrinsic",symbols:[r.has("print")?{type:"print"}:print],postprocess:i},{name:"intrinsic",symbols:[r.has("minus")?{type:"minus"}:minus],postprocess:i},{name:"intrinsic",symbols:[r.has("timed")?{type:"timed"}:timed],postprocess:i},{name:"intrinsic",symbols:[r.has("divmod")?{type:"divmod"}:divmod],postprocess:i},{name:"intrinsic",symbols:[r.has("mod")?{type:"mod"}:mod],postprocess:i},{name:"intrinsic",symbols:[r.has("max")?{type:"max"}:max],postprocess:i},{name:"intrinsic",symbols:[r.has("eq")?{type:"eq"}:eq],postprocess:i},{name:"intrinsic",symbols:[r.has("gt")?{type:"gt"}:gt],postprocess:i},{name:"intrinsic",symbols:[r.has("lt")?{type:"lt"}:lt],postprocess:i},{name:"intrinsic",symbols:[r.has("over")?{type:"over"}:over],postprocess:i},{name:"intrinsic",symbols:[r.has("swap")?{type:"swap"}:swap],postprocess:i},{name:"intrinsic",symbols:[r.has("dup")?{type:"dup"}:dup],postprocess:i},{name:"intrinsic",symbols:[r.has("drop")?{type:"drop"}:drop],postprocess:i},{name:"intrinsic",symbols:[r.has("store8")?{type:"store8"}:store8],postprocess:i},{name:"intrinsic",symbols:[r.has("load8")?{type:"load8"}:load8],postprocess:i},{name:"intrinsic",symbols:[r.has("store16")?{type:"store16"}:store16],postprocess:i},{name:"intrinsic",symbols:[r.has("load16")?{type:"load16"}:load16],postprocess:i},{name:"intrinsic",symbols:[r.has("store64")?{type:"store64"}:store64],postprocess:i},{name:"intrinsic",symbols:[r.has("load64")?{type:"load64"}:load64],postprocess:i},{name:"intrinsic",symbols:[r.has("shl")?{type:"shl"}:shl],postprocess:i},{name:"intrinsic",symbols:[r.has("shr")?{type:"shr"}:shr],postprocess:i},{name:"intrinsic",symbols:[r.has("or")?{type:"or"}:or],postprocess:i},{name:"intrinsic",symbols:[r.has("and")?{type:"and"}:and],postprocess:i},{name:"intrinsic",symbols:[r.has("ge")?{type:"ge"}:ge],postprocess:i},{name:"intrinsic",symbols:[r.has("le")?{type:"le"}:le],postprocess:i},{name:"intrinsic",symbols:[r.has("ne")?{type:"ne"}:ne],postprocess:i},{name:"intrinsic",symbols:[r.has("not")?{type:"not"}:not],postprocess:i},{name:"intrinsic",symbols:[r.has("rot")?{type:"rot"}:rot],postprocess:i},{name:"intrinsic",symbols:[r.has("load32")?{type:"load32"}:load32],postprocess:i},{name:"intrinsic",symbols:[r.has("store32")?{type:"store32"}:store32],postprocess:i},{name:"intrinsic",symbols:[r.has("cast_ptr")?{type:"cast_ptr"}:cast_ptr],postprocess:i},{name:"intrinsic",symbols:[r.has("cast_int")?{type:"cast_int"}:cast_int],postprocess:i},{name:"intrinsic",symbols:[r.has("cast_bool")?{type:"cast_bool"}:cast_bool],postprocess:i},{name:"intrinsic",symbols:[r.has("here")?{type:"here"}:here],postprocess:i},{name:"intrinsic",symbols:[r.has("stop")?{type:"stop"}:stop],postprocess:i},{name:"identifier",symbols:[r.has("identifier")?{type:"identifier"}:identifier],postprocess:i},{name:"__ml$ebnf$1",symbols:[]},{name:"__ml$ebnf$1",symbols:["__ml$ebnf$1","multi_line_ws_char"],postprocess:function(e){return e[0].concat([e[1]])}},{name:"__ml",symbols:["__ml$ebnf$1"]},{name:"_ml$ebnf$1",symbols:["multi_line_ws_char"]},{name:"_ml$ebnf$1",symbols:["_ml$ebnf$1","multi_line_ws_char"],postprocess:function(e){return e[0].concat([e[1]])}},{name:"_ml",symbols:["_ml$ebnf$1"]},{name:"multi_line_ws_char",symbols:[r.has("ws")?{type:"ws"}:ws]},{name:"multi_line_ws_char",symbols:[{literal:"\n"}]},{name:"multi_line_ws_char",symbols:[{literal:"\t"}]},{name:"__$ebnf$1",symbols:[r.has("ws")?{type:"ws"}:ws]},{name:"__$ebnf$1",symbols:["__$ebnf$1",r.has("ws")?{type:"ws"}:ws],postprocess:function(e){return e[0].concat([e[1]])}},{name:"__",symbols:["__$ebnf$1"]},{name:"_$ebnf$1",symbols:[]},{name:"_$ebnf$1",symbols:["_$ebnf$1",r.has("ws")?{type:"ws"}:ws],postprocess:function(e){return e[0].concat([e[1]])}},{name:"_",symbols:["_$ebnf$1"]}],ParserStart:"program"};void 0!==e.exports?e.exports=a:window.grammar=a}()},271:function(e,t){var n,r;void 0===(r="function"==typeof(n=function(){"use strict";var e=Object.prototype.hasOwnProperty,t=Object.prototype.toString,n="boolean"==typeof(new RegExp).sticky;function r(e){return e&&"[object RegExp]"===t.call(e)}function s(e){return e&&"object"==typeof e&&!r(e)&&!Array.isArray(e)}function o(e){return"("+e+")"}function i(e){return e.length?"(?:"+e.map((function(e){return"(?:"+e+")"})).join("|")+")":"(?!)"}function a(e){if("string"==typeof e)return"(?:"+(e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")+")");if(r(e)){if(e.ignoreCase)throw new Error("RegExp /i flag not allowed");if(e.global)throw new Error("RegExp /g flag is implied");if(e.sticky)throw new Error("RegExp /y flag is implied");if(e.multiline)throw new Error("RegExp /m flag is implied");return e.source}throw new Error("Not a pattern: "+e)}function l(t,n){if(s(n)||(n={match:n}),n.include)throw new Error("Matching rules cannot also include states");var o={defaultType:t,lineBreaks:!!n.error||!!n.fallback,pop:!1,next:null,push:null,error:!1,fallback:!1,value:null,type:null,shouldThrow:!1};for(var i in n)e.call(n,i)&&(o[i]=n[i]);if("string"==typeof o.type&&t!==o.type)throw new Error("Type transform cannot be a string (type '"+o.type+"' for token '"+t+"')");var a=o.match;return o.match=Array.isArray(a)?a:a?[a]:[],o.match.sort((function(e,t){return r(e)&&r(t)?0:r(t)?-1:r(e)?1:t.length-e.length})),o}function p(e){return Array.isArray(e)?function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];if(r.include)for(var s=[].concat(r.include),o=0;o<s.length;o++)t.push({include:s[o]});else{if(!r.type)throw new Error("Rule has no type: "+JSON.stringify(r));t.push(l(r.type,r))}}return t}(e):function(e){for(var t=Object.getOwnPropertyNames(e),n=[],r=0;r<t.length;r++){var o=t[r],i=e[o],a=[].concat(i);if("include"!==o){var p=[];a.forEach((function(e){s(e)?(p.length&&n.push(l(o,p)),n.push(l(o,e)),p=[]):p.push(e)})),p.length&&n.push(l(o,p))}else for(var c=0;c<a.length;c++)n.push({include:a[c]})}return n}(e)}var c=l("error",{lineBreaks:!0,shouldThrow:!0});function u(e,t){for(var s=null,l=Object.create(null),p=!0,u=null,h=[],m=[],f=0;f<e.length;f++)e[f].fallback&&(p=!1);for(f=0;f<e.length;f++){var d=e[f];if(d.include)throw new Error("Inheritance is not allowed in stateless lexers");if(d.error||d.fallback){if(s)throw!d.fallback==!s.fallback?new Error("Multiple "+(d.fallback?"fallback":"error")+" rules not allowed (for token '"+d.defaultType+"')"):new Error("fallback and error are mutually exclusive (for token '"+d.defaultType+"')");s=d}var y=d.match.slice();if(p)for(;y.length&&"string"==typeof y[0]&&1===y[0].length;)l[y.shift().charCodeAt(0)]=d;if(d.pop||d.push||d.next){if(!t)throw new Error("State-switching options are not allowed in stateless lexers (for token '"+d.defaultType+"')");if(d.fallback)throw new Error("State-switching options are not allowed on fallback tokens (for token '"+d.defaultType+"')")}if(0!==y.length){p=!1,h.push(d);for(var b=0;b<y.length;b++){var g=y[b];if(r(g))if(null===u)u=g.unicode;else if(u!==g.unicode&&!1===d.fallback)throw new Error("If one rule is /u then all must be")}var w=i(y.map(a)),v=new RegExp(w);if(v.test(""))throw new Error("RegExp matches empty string: "+v);if(new RegExp("|"+w).exec("").length-1>0)throw new Error("RegExp has capture groups: "+v+"\nUse (?: … ) instead");if(!d.lineBreaks&&v.test("\n"))throw new Error("Rule should declare lineBreaks: "+v);m.push(o(w))}}var _=s&&s.fallback,k=n&&!_?"ym":"gm",x=n||_?"":"|";return!0===u&&(k+="u"),{regexp:new RegExp(i(m)+x,k),groups:h,fast:l,error:s||c}}function h(e,t,n){var r=e&&(e.push||e.next);if(r&&!n[r])throw new Error("Missing state '"+r+"' (in token '"+e.defaultType+"' of state '"+t+"')");if(e&&e.pop&&1!=+e.pop)throw new Error("pop must be 1 (in token '"+e.defaultType+"' of state '"+t+"')")}var m=function(e,t){this.startState=t,this.states=e,this.buffer="",this.stack=[],this.reset()};m.prototype.reset=function(e,t){return this.buffer=e||"",this.index=0,this.line=t?t.line:1,this.col=t?t.col:1,this.queuedToken=t?t.queuedToken:null,this.queuedThrow=t?t.queuedThrow:null,this.setState(t?t.state:this.startState),this.stack=t&&t.stack?t.stack.slice():[],this},m.prototype.save=function(){return{line:this.line,col:this.col,state:this.state,stack:this.stack.slice(),queuedToken:this.queuedToken,queuedThrow:this.queuedThrow}},m.prototype.setState=function(e){if(e&&this.state!==e){this.state=e;var t=this.states[e];this.groups=t.groups,this.error=t.error,this.re=t.regexp,this.fast=t.fast}},m.prototype.popState=function(){this.setState(this.stack.pop())},m.prototype.pushState=function(e){this.stack.push(this.state),this.setState(e)};var f=n?function(e,t){return e.exec(t)}:function(e,t){var n=e.exec(t);return 0===n[0].length?null:n};function d(){return this.value}if(m.prototype._getGroup=function(e){for(var t=this.groups.length,n=0;n<t;n++)if(void 0!==e[n+1])return this.groups[n];throw new Error("Cannot find token type for matched text")},m.prototype.next=function(){var e=this.index;if(this.queuedGroup){var t=this._token(this.queuedGroup,this.queuedText,e);return this.queuedGroup=null,this.queuedText="",t}var n=this.buffer;if(e!==n.length){if(i=this.fast[n.charCodeAt(e)])return this._token(i,n.charAt(e),e);var r=this.re;r.lastIndex=e;var s=f(r,n),o=this.error;if(null==s)return this._token(o,n.slice(e,n.length),e);var i=this._getGroup(s),a=s[0];return o.fallback&&s.index!==e?(this.queuedGroup=i,this.queuedText=a,this._token(o,n.slice(e,s.index),e)):this._token(i,a,e)}},m.prototype._token=function(e,t,n){var r=0;if(e.lineBreaks){var s=/\n/g,o=1;if("\n"===t)r=1;else for(;s.exec(t);)r++,o=s.lastIndex}var i={type:"function"==typeof e.type&&e.type(t)||e.defaultType,value:"function"==typeof e.value?e.value(t):t,text:t,toString:d,offset:n,lineBreaks:r,line:this.line,col:this.col},a=t.length;if(this.index+=a,this.line+=r,0!==r?this.col=a-o+1:this.col+=a,e.shouldThrow)throw new Error(this.formatError(i,"invalid syntax"));return e.pop?this.popState():e.push?this.pushState(e.push):e.next&&this.setState(e.next),i},"undefined"!=typeof Symbol&&Symbol.iterator){var y=function(e){this.lexer=e};y.prototype.next=function(){var e=this.lexer.next();return{value:e,done:!e}},y.prototype[Symbol.iterator]=function(){return this},m.prototype[Symbol.iterator]=function(){return new y(this)}}return m.prototype.formatError=function(e,t){if(null==e){var n=this.buffer.slice(this.index);e={text:n,offset:this.index,lineBreaks:-1===n.indexOf("\n")?0:1,line:this.line,col:this.col}}var r=Math.max(0,e.offset-e.col+1),s=e.lineBreaks?e.text.indexOf("\n"):e.text.length,o=this.buffer.substring(r,e.offset+s);return t+=" at line "+e.line+" col "+e.col+":\n\n",(t+="  "+o+"\n")+"  "+Array(e.col).join(" ")+"^"},m.prototype.clone=function(){return new m(this.states,this.state)},m.prototype.has=function(e){return!0},{compile:function(e){var t=u(p(e));return new m({start:t},"start")},states:function(e,t){var n=e.$all?p(e.$all):[];delete e.$all;var r=Object.getOwnPropertyNames(e);t||(t=r[0]);for(var s=Object.create(null),o=0;o<r.length;o++)s[w=r[o]]=p(e[w]).concat(n);for(o=0;o<r.length;o++)for(var i=s[w=r[o]],a=Object.create(null),l=0;l<i.length;l++){var c=i[l];if(c.include){var f=[l,1];if(c.include!==w&&!a[c.include]){a[c.include]=!0;var d=s[c.include];if(!d)throw new Error("Cannot include nonexistent state '"+c.include+"' (in state '"+w+"')");for(var y=0;y<d.length;y++){var b=d[y];-1===i.indexOf(b)&&f.push(b)}}i.splice.apply(i,f),l--}}var g=Object.create(null);for(o=0;o<r.length;o++){var w;g[w=r[o]]=u(s[w],!0)}for(o=0;o<r.length;o++){var v=r[o],_=g[v],k=_.groups;for(l=0;l<k.length;l++)h(k[l],v,g);var x=Object.getOwnPropertyNames(_.fast);for(l=0;l<x.length;l++)h(_.fast[x[l]],v,g)}return new m(g,t)},error:Object.freeze({error:!0}),fallback:Object.freeze({fallback:!0}),keywords:function(e){for(var t=Object.create(null),n=Object.create(null),r=Object.getOwnPropertyNames(e),s=0;s<r.length;s++){var o=r[s],i=e[o];(Array.isArray(i)?i:[i]).forEach((function(e){if((n[e.length]=n[e.length]||[]).push(e),"string"!=typeof e)throw new Error("keyword must be string (in keyword '"+o+"')");t[e]=o}))}function a(e){return JSON.stringify(e)}var l="";for(var p in l+="switch (value.length) {\n",n){var c=n[p];l+="case "+p+":\n",l+="switch (value) {\n",c.forEach((function(e){var n=t[e];l+="case "+a(e)+": return "+a(n)+"\n"})),l+="}\n"}return l+="}\n",Function("value",l)}}})?n.apply(t,[]):n)||(e.exports=r)},654:function(e){var t;t=function(){function e(t,n,r){return this.id=++e.highestId,this.name=t,this.symbols=n,this.postprocess=r,this}function t(e,t,n,r){this.rule=e,this.dot=t,this.reference=n,this.data=[],this.wantedBy=r,this.isComplete=this.dot===e.symbols.length}function n(e,t){this.grammar=e,this.index=t,this.states=[],this.wants={},this.scannable=[],this.completed={}}function r(e,t){this.rules=e,this.start=t||this.rules[0].name;var n=this.byName={};this.rules.forEach((function(e){n.hasOwnProperty(e.name)||(n[e.name]=[]),n[e.name].push(e)}))}function s(){this.reset("")}function o(e,t,o){if(e instanceof r){var i=e;o=t}else i=r.fromCompiled(e,t);for(var a in this.grammar=i,this.options={keepHistory:!1,lexer:i.lexer||new s},o||{})this.options[a]=o[a];this.lexer=this.options.lexer,this.lexerState=void 0;var l=new n(i,0);this.table=[l],l.wants[i.start]=[],l.predict(i.start),l.process(),this.current=0}function i(e){var t=typeof e;if("string"===t)return e;if("object"===t){if(e.literal)return JSON.stringify(e.literal);if(e instanceof RegExp)return e.toString();if(e.type)return"%"+e.type;if(e.test)return"<"+String(e.test)+">";throw new Error("Unknown symbol type: "+e)}}return e.highestId=0,e.prototype.toString=function(e){var t=void 0===e?this.symbols.map(i).join(" "):this.symbols.slice(0,e).map(i).join(" ")+" ● "+this.symbols.slice(e).map(i).join(" ");return this.name+" → "+t},t.prototype.toString=function(){return"{"+this.rule.toString(this.dot)+"}, from: "+(this.reference||0)},t.prototype.nextState=function(e){var n=new t(this.rule,this.dot+1,this.reference,this.wantedBy);return n.left=this,n.right=e,n.isComplete&&(n.data=n.build(),n.right=void 0),n},t.prototype.build=function(){var e=[],t=this;do{e.push(t.right.data),t=t.left}while(t.left);return e.reverse(),e},t.prototype.finish=function(){this.rule.postprocess&&(this.data=this.rule.postprocess(this.data,this.reference,o.fail))},n.prototype.process=function(e){for(var t=this.states,n=this.wants,r=this.completed,s=0;s<t.length;s++){var i=t[s];if(i.isComplete){if(i.finish(),i.data!==o.fail){for(var a=i.wantedBy,l=a.length;l--;){var p=a[l];this.complete(p,i)}if(i.reference===this.index){var c=i.rule.name;(this.completed[c]=this.completed[c]||[]).push(i)}}}else{if("string"!=typeof(c=i.rule.symbols[i.dot])){this.scannable.push(i);continue}if(n[c]){if(n[c].push(i),r.hasOwnProperty(c)){var u=r[c];for(l=0;l<u.length;l++){var h=u[l];this.complete(i,h)}}}else n[c]=[i],this.predict(c)}}},n.prototype.predict=function(e){for(var n=this.grammar.byName[e]||[],r=0;r<n.length;r++){var s=n[r],o=this.wants[e],i=new t(s,0,this.index,o);this.states.push(i)}},n.prototype.complete=function(e,t){var n=e.nextState(t);this.states.push(n)},r.fromCompiled=function(t,n){var s=t.Lexer;t.ParserStart&&(n=t.ParserStart,t=t.ParserRules);var o=new r(t=t.map((function(t){return new e(t.name,t.symbols,t.postprocess)})),n);return o.lexer=s,o},s.prototype.reset=function(e,t){this.buffer=e,this.index=0,this.line=t?t.line:1,this.lastLineBreak=t?-t.col:0},s.prototype.next=function(){if(this.index<this.buffer.length){var e=this.buffer[this.index++];return"\n"===e&&(this.line+=1,this.lastLineBreak=this.index),{value:e}}},s.prototype.save=function(){return{line:this.line,col:this.index-this.lastLineBreak}},s.prototype.formatError=function(e,t){var n=this.buffer;if("string"==typeof n){var r=n.split("\n").slice(Math.max(0,this.line-5),this.line),s=n.indexOf("\n",this.index);-1===s&&(s=n.length);var o=this.index-this.lastLineBreak,i=String(this.line).length;return t+=" at line "+this.line+" col "+o+":\n\n",(t+=r.map((function(e,t){return a(this.line-r.length+t+1,i)+" "+e}),this).join("\n"))+"\n"+a("",i+o)+"^\n"}return t+" at index "+(this.index-1);function a(e,t){var n=String(e);return Array(t-n.length+1).join(" ")+n}},o.fail={},o.prototype.feed=function(e){var t,r=this.lexer;for(r.reset(e,this.lexerState);;){try{if(!(t=r.next()))break}catch(e){var o=new n(this.grammar,this.current+1);throw this.table.push(o),(l=new Error(this.reportLexerError(e))).offset=this.current,l.token=e.token,l}var i=this.table[this.current];this.options.keepHistory||delete this.table[this.current-1];var a=this.current+1;o=new n(this.grammar,a),this.table.push(o);for(var l,p=void 0!==t.text?t.text:t.value,c=r.constructor===s?t.value:t,u=i.scannable,h=u.length;h--;){var m=u[h],f=m.rule.symbols[m.dot];if(f.test?f.test(c):f.type?f.type===t.type:f.literal===p){var d=m.nextState({data:c,token:t,isToken:!0,reference:a-1});o.states.push(d)}}if(o.process(),0===o.states.length)throw(l=new Error(this.reportError(t))).offset=this.current,l.token=t,l;this.options.keepHistory&&(i.lexerState=r.save()),this.current++}return i&&(this.lexerState=r.save()),this.results=this.finish(),this},o.prototype.reportLexerError=function(e){var t,n,r=e.token;return r?(t="input "+JSON.stringify(r.text[0])+" (lexer error)",n=this.lexer.formatError(r,"Syntax error")):(t="input (lexer error)",n=e.message),this.reportErrorCommon(n,t)},o.prototype.reportError=function(e){var t=(e.type?e.type+" token: ":"")+JSON.stringify(void 0!==e.value?e.value:e),n=this.lexer.formatError(e,"Syntax error");return this.reportErrorCommon(n,t)},o.prototype.reportErrorCommon=function(e,t){var n=[];n.push(e);var r=this.table.length-2,s=this.table[r],o=s.states.filter((function(e){var t=e.rule.symbols[e.dot];return t&&"string"!=typeof t}));return 0===o.length?(n.push("Unexpected "+t+". I did not expect any more input. Here is the state of my parse table:\n"),this.displayStateStack(s.states,n)):(n.push("Unexpected "+t+". Instead, I was expecting to see one of the following:\n"),o.map((function(e){return this.buildFirstStateStack(e,[])||[e]}),this).forEach((function(e){var t=e[0],r=t.rule.symbols[t.dot],s=this.getSymbolDisplay(r);n.push("A "+s+" based on:"),this.displayStateStack(e,n)}),this)),n.push(""),n.join("\n")},o.prototype.displayStateStack=function(e,t){for(var n,r=0,s=0;s<e.length;s++){var o=e[s],i=o.rule.toString(o.dot);i===n?r++:(r>0&&t.push("    ^ "+r+" more lines identical to this"),r=0,t.push("    "+i)),n=i}},o.prototype.getSymbolDisplay=function(e){return function(e){var t=typeof e;if("string"===t)return e;if("object"===t){if(e.literal)return JSON.stringify(e.literal);if(e instanceof RegExp)return"character matching "+e;if(e.type)return e.type+" token";if(e.test)return"token matching "+String(e.test);throw new Error("Unknown symbol type: "+e)}}(e)},o.prototype.buildFirstStateStack=function(e,t){if(-1!==t.indexOf(e))return null;if(0===e.wantedBy.length)return[e];var n=e.wantedBy[0],r=[e].concat(t),s=this.buildFirstStateStack(n,r);return null===s?null:[e].concat(s)},o.prototype.save=function(){var e=this.table[this.current];return e.lexerState=this.lexerState,e},o.prototype.restore=function(e){var t=e.index;this.current=t,this.table[t]=e,this.table.splice(t+1),this.lexerState=e.lexerState,this.results=this.finish()},o.prototype.rewind=function(e){if(!this.options.keepHistory)throw new Error("set option `keepHistory` to enable rewinding");this.restore(this.table[e])},o.prototype.finish=function(){var e=[],t=this.grammar.start;return this.table[this.table.length-1].states.forEach((function(n){n.rule.name===t&&n.dot===n.rule.symbols.length&&0===n.reference&&n.data!==o.fail&&e.push(n)})),e.map((function(e){return e.data}))},{Parser:o,Grammar:r,Rule:e}},e.exports?e.exports=t():this.nearley=t()},607:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.main=exports.captureEval=void 0;const nearley_1=__importDefault(__webpack_require__(654)),grammar=__webpack_require__(548),left=e=>({type:"fail",value:e}),right=e=>({type:"success",value:e});function parse(e){const t=new nearley_1.default.Parser(nearley_1.default.Grammar.fromCompiled(grammar));try{if(t.feed(e),t.results.length>1){for(let e=0;e<t.results.length;e++)console.log("ambiguous parser");return left("ambiguous parser")}return 0===t.results.length?left("no parse found"):right(t.results[0])}catch(e){return left(e)}}const getContext=async e=>{let t={procs:{},consts:{},memories:{},memorySize:0};for(const n of e)"const"===n.type&&(t.consts[n.name]=evalStatements(n.body,t)),"proc"===n.type&&(t.procs[n.name]=genCodeAux(n.body,t)),"memory"===n.type&&(t.memories[n.name]=t.memorySize,t.memorySize+=evalStatements(n.body,t));let n=e.length;for(let r=0;r<n;r++){let s=e[r];if("identifier"===s.type)if(s.value in t.consts);else if(s.value in t.memories);else if(!(s.value in t.procs))throw new Error(`no value found for the idenfitifer: ${s.value}`);if("const"===s.type&&(e.splice(r,1),n--),"proc"===s.type&&(e.splice(r,1),n--),"memory"===s.type&&(e.splice(r,1),n--),"include"===s.type)try{let o=await fetch(s.file.value);const i=await o.text();console.log("text is",i);const a=await parseAndProcess(i);e.splice(r,1),t={consts:Object.assign(Object.assign({},t.consts),a.context.consts),procs:Object.assign(Object.assign({},t.procs),a.context.procs),memories:Object.assign(Object.assign({},t.memories),a.context.memories),memorySize:t.memorySize+a.context.memorySize},e.splice(r,0,...a.ast),n+=a.ast.length-1}catch(e){throw console.log("error is",e),new Error("cannot include file (it doesn't exist)")}}return{ast:e,context:t}};function evalStatements(e,t){const n=`${genCode(e,t)};\n\n    if(typeof stack[0] === "string"){\n     return JSON.stringify(stack[0]);\n    }else{\n        return stack[0]\n    }\n     `;return new Function(n)()}function assertUnreachable(e){throw new Error(` ${JSON.stringify(e,null,4)} Didn't expect to get here`)}function genCodeAux(e,t){return e.map((e=>{let n="";switch(n+=`// generated code for ${e.type} operation \n`,e.type){case"number_literal":n+=`stack.push(${e.value})`;break;case"string_literal":n+=`stack.push(${JSON.stringify(e.value)})`;break;case"plus":n+="stack.plus()";break;case"minus":n+="stack.minus()";break;case"print":n+="stack.print()";break;case"const":n+=`stack.push(${t.consts[e.name]})`;break;case"while":n+=`\n// while loop\nwhile (\n    ((stack) => { ${genCodeAux(e.condition,t)}; return stack.pop() })(stack)) { ${genCodeAux(e.body,t)} } `;break;case"swap":n+="stack.swap()";break;case"over":n+="stack.over()";break;case"dup":n+="stack.dup()";break;case"mod":n+="stack.mod()";break;case"drop":n+="stack.drop()";break;case"lt":n+="stack.lt(); ";break;case"gt":n+="stack.gt(); ";break;case"identifier":if(n+=`//identifier ${e.value} \n`,e.value in t.consts)n+=`stack.push(${t.consts[e.value]})`;else if(e.value in t.procs)n+=`${e.value}()`;else{if(!(e.value in t.memories))throw new Error(`undefined indentifier ${e.value}`);n+=`stack.push(${t.memories[e.value]})`}break;case"eq":n+="stack.eq()";break;case"macro":throw new Error("should not occur at this stage of compilation");case"memory":n+=`stack.push(${t.memories[e.name]})`;break;case"if":n+=`if(stack.pop()){\n\t${genCodeAux(e.body,t)}}`;break;case"ifElse":n+=`if(stack.pop()){\n\t${genCodeAux(e.body,t)}}else{\n\t${e.elseCondition?genCodeAux(e.elseCondition,t):""}; ${genCodeAux(e.elseBranch,t)}}`;break;case"proc":throw new Error("proc should not occur here this is a bug in parsing.");case"comment":n+=`//${e.value} \n`;break;case"load8":n+="stack.load8()";break;case"store8":n+="stack.store8()";break;case"load16":n+="stack.load16()";break;case"store16":n+="stack.store16()";break;case"load64":n+="stack.load64()";break;case"store64":n+="stack.store64()";break;case"shl":n+="stack.shr()";break;case"shr":n+="stack.shl()";break;case"or":n+="stack.or()";break;case"and":case"le":n+="stack.and()";break;case"load32":n+="stack.load32()";break;case"store32":n+="stack.store32()";break;case"not":n+="stack.not()";break;case"ge":n+="stack.ge()";break;case"here":n+=`stack.push("${e.start}-${e.end}")`;break;case"stop":n+='throw new Error("program stopping")';break;case"rot":n+="stack.rot()";break;case"ne":n+="stack.ne()";break;case"include":n+="// include file \n";break;default:return assertUnreachable(e)}return n})).join(";\n")}function genCode(e,t){const n=genCodeAux(e,t);return`let stack = []; \n\nlet memory  = new Uint8Array(${t.memorySize});   \nArray.prototype.rot = function(){\n    let a = this.pop()\n    let b = this.pop()\n    let c = this.pop()\n    this.push(b)\n    this.push(a)\n    this.push(c)\n\n}\nArray.prototype.store32 = function() {\n    let a = this.pop()\n    let b = this.pop()\n    if (a === undefined || b===undefined) throw new Error("not enough arguments for store32 intrinsic")\n    memory[a] = b;\n}\nArray.prototype.load32 = function() {\n    let a = this.pop()\n    if (a === undefined) throw new Error("not enough arguments for load32 intrinsic")\n    this.push(memory[a])\n}\nArray.prototype.lt = function () {\n    let a = this.pop();\n    let b = this.pop();\n    if(a===undefined || b===undefined) throw new Error("not enough arguments for lt")\n    return this.push(b < a)\n}\nArray.prototype.ge = function () {\n    let a = this.pop();\n    let b = this.pop();\n    if(a===undefined || b===undefined) throw new Error("not enough arguments for ge")\n    return this.push(b >= a)\n}\nArray.prototype.le = function () {\n    let a = this.pop();\n    let b = this.pop();\n    if(a===undefined || b===undefined) throw new Error("not enough arguments for le")\n    return this.push(b <= a)\n}\nArray.prototype.not = function () {\n    let a = this.pop();\n    if(a===undefined) throw new Error("not enough arguments for not")\n    return this.push(!a)\n}\n\nArray.prototype.gt = function () {\n    let a = this.pop();\n    let b = this.pop();\n    if(a===undefined || b===undefined) throw new Error("not enough arguments for lt")\n    return this.push(b > a)\n}\nArray.prototype.eq = function () {\n    let a = this.pop();\n    let b = this.pop();\n    if(a===undefined || b===undefined) throw new Error("not enough arguments for eq")\n    return this.push(a === b)\n}\nArray.prototype.ne = function () {\n    let a = this.pop();\n    let b = this.pop();\n    if(a===undefined || b===undefined) throw new Error("not enough arguments for ne")\n    return this.push(a !== b)\n}\nArray.prototype.mod = function () {\n    let a = this.pop()\n    let b=  this.pop()\n    if(a===undefined || b===undefined) throw new Error("not enough arguments for mod")\n    return this.push(b % a )\n}\nArray.prototype.shl = function () {\n    let a = this.pop()\n    let b=  this.pop()\n    if(a===undefined || b===undefined) throw new Error("not enough arguments for shl")\n    return this.push(b >> a )\n};\nArray.prototype.shr = function () {\n    let a = this.pop()\n    let b=  this.pop()\n    if(a===undefined || b===undefined) throw new Error("not enough arguments for shr")\n    return this.push(b << a )\n}\nArray.prototype.or = function () {\n    let a = this.pop()\n    let b=  this.pop()\n    if(a===undefined || b===undefined) throw new Error("not enough arguments for or")\n    return this.push(b || a )\n};\nArray.prototype.and = function () {\n    let a = this.pop()\n    let b=  this.pop()\n    if(a===undefined || b===undefined) throw new Error("not enough arguments for and")\n    return this.push(b && a )\n}\nArray.prototype.over = function () {\n    let a = this.pop()\n    let b = this.pop()\n    if (a === undefined || b === undefined) {\n        throw new Error("not enough arguments for over intrinsic")\n    }\n    this.push(b)\n    this.push(a)\n    this.push(b)\n}\nArray.prototype.dup = function () {\n    let a = this.pop()\n    if(a===undefined) throw new Error("not enough arguments for dup")\n    this.push(a)\n    this.push(a)\n}\nArray.prototype.drop = function () {\n    let a= this.pop()\n    if(a===undefined) throw new Error("not enough arguments for drop")\n}\nArray.prototype.plus = function () {\n    let a = this.pop();\n    let b = this.pop();\n    if(a===undefined || b===undefined) throw new Error("not enough arguments for plus")\n    this.push(a+b)\n}\nArray.prototype.minus = function () {\n    let a = this.pop();\n    let b = this.pop();\n    if(a===undefined || b===undefined) throw new Error("not enough arguments for minus")\n    this.push(a-b)\n}\nArray.prototype.print = function () {\n    let a =this.pop()\n    if(a===undefined) throw new Error("not enough arguments for print")\n    console.log(a)\n}\nArray.prototype.swap = function () {\n    let a = this.pop()\n    let b = this.pop()\n    if (a === undefined || b === undefined) {\n        throw new Error("not enough arguments for swap intrinsic")\n    }\n    this.push(a)\n    this.push(b)\n}\nArray.prototype.store8 = function () {\n    let a = this.pop()\n    let b = this.pop()\n    if (a === undefined || b===undefined) throw new Error("not enough arguments for store8 intrinsic")\n    memory[a] = b;\n}\nArray.prototype.load8 = function () {\n    let a = this.pop()\n    if (a === undefined ) throw new Error("not enough arguments for load8 intrinsic")\n    this.push(memory[a])\n}\nArray.prototype.store16 = function () {\n    let a = this.pop()\n    let b = this.pop()\n    if (a === undefined || b===undefined) throw new Error("not enough arguments for store8 intrinsic")\n    memory[a] = b;\n}\nArray.prototype.load16 = function () {\n    let a = this.pop()\n    if (a === undefined ) throw new Error("not enough arguments for load8 intrinsic")\n    this.push(memory[a])\n}\nArray.prototype.store64 = function () {\n    let a = this.pop()\n    let b = this.pop()\n    if (a === undefined || b===undefined) throw new Error("not enough arguments for store8 intrinsic")\n    memory[a] = b;\n}\nArray.prototype.load64 = function () {\n    let a = this.pop()\n    if (a === undefined ) throw new Error("not enough arguments for load8 intrinsic")\n    this.push(memory[a])\n}`+Object.entries(t.procs).map((([e,t])=>`function ${e}(){\n           ${t}\n        };\n`))+n}async function parseAndProcess(e){const t=parse(e);if("fail"===t.type)throw new Error(t.value);return await getContext(t.value)}const captureEval=code=>{try{let stdout="",tmp=console.log;return console.log=(...e)=>{stdout+=`${e.join(" ")}\n`,tmp(...e)},eval(code),console.log=tmp,stdout}catch(e){return`${e}`}};async function main(e){console.log("prog is",e);const t=parse(e);if("fail"===t.type)return t.value;try{const{ast:e,context:n}=await getContext(t.value);return genCode(e,n)}catch(e){return`throw new Error("Compiler error: ${e}")`}}exports.captureEval=captureEval,exports.main=main}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e].call(n.exports,n,n.exports,__webpack_require__),n.exports}var __webpack_exports__={};(()=>{"use strict";const e=__webpack_require__(607),t=document.getElementById("input"),n=document.getElementById("output"),r=document.getElementById("outputjs"),s=document.getElementById("run"),o=document.getElementById("autorun"),i=async()=>{console.log("input changed");const s=await(0,e.main)(t.value);r.innerText=s,n.innerText=(0,e.captureEval)(s)};s.onclick=()=>{i()},t.onchange=()=>{o.checked&&i()},t.oninput=()=>{o.checked&&i()},i(),console.log("build loaded")})()})();