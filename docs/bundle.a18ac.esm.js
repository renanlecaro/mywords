!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(t){return e[t]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/mywords/",t(t.s="mdyV")}({"+E3a":function(){},"/s/C":function(e,t,n){"use strict";function r(e,t){return o(e)==o(t)}function o(e){return e.toLowerCase().trim()}n.d(t,"a",(function(){return r}))},"0u3c":function(e,t,n){"use strict";function r(){}function o(e,t,n,r,o){for(var i=0,s=t.length,l=0,u=0;i<s;i++){var a=t[i];if(a.removed){if(a.value=e.join(r.slice(u,u+a.count)),u+=a.count,i&&t[i-1].added){var c=t[i-1];t[i-1]=t[i],t[i]=c}}else{if(!a.added&&o){var f=n.slice(l,l+a.count);f=f.map((function(e,t){var n=r[u+t];return n.length>e.length?n:e})),a.value=e.join(f)}else a.value=e.join(n.slice(l,l+a.count));l+=a.count,a.added||(u+=a.count)}}var d=t[s-1];return s>1&&"string"==typeof d.value&&(d.added||d.removed)&&e.equals("",d.value)&&(t[s-2].value+=d.value,t.pop()),t}function i(e){return{newPos:e.newPos,components:e.components.slice(0)}}function s(e,t,n){return q.diff(e,t,n)}function l(e,t){if("function"==typeof e)t.callback=e;else if(e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function u(e,t,n){return n=l(n,{ignoreWhitespace:!0}),G.diff(e,t,n)}function a(e,t,n){return G.diff(e,t,n)}function c(e,t,n){return K.diff(e,t,n)}function f(e,t,n){var r=l(n,{ignoreWhitespace:!0});return K.diff(e,t,r)}function d(e,t,n){return X.diff(e,t,n)}function h(e,t,n){return Q.diff(e,t,n)}function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function v(e,t,n){return Y.diff(e,t,n)}function _(e,t,n,r,o){var i,s;for(t=t||[],n=n||[],r&&(e=r(o,e)),i=0;i<t.length;i+=1)if(t[i]===e)return n[i];if("[object Array]"===Z.call(e)){for(t.push(e),s=new Array(e.length),n.push(s),i=0;i<e.length;i+=1)s[i]=_(e[i],t,n,r,o);return t.pop(),n.pop(),s}if(e&&e.toJSON&&(e=e.toJSON()),"object"===p(e)&&null!==e){t.push(e),n.push(s={});var l,u=[];for(l in e)e.hasOwnProperty(l)&&u.push(l);for(u.sort(),i=0;i<u.length;i+=1)s[l=u[i]]=_(e[l],t,n,r,l);t.pop(),n.pop()}else s=e;return s}function g(e,t,n){return ee.diff(e,t,n)}function y(e){function t(){var e={};for(l.push(e);u<i.length;){var t=i[u];if(/^(\-\-\-|\+\+\+|@@)\s/.test(t))break;var s=/^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(t);s&&(e.index=s[1]),u++}for(n(e),n(e),e.hunks=[];u<i.length;){var a=i[u];if(/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(a))break;if(/^@@/.test(a))e.hunks.push(r());else{if(a&&o.strict)throw new Error("Unknown line "+(u+1)+" "+JSON.stringify(a));u++}}}function n(e){var t=/^(---|\+\+\+)\s+(.*)$/.exec(i[u]);if(t){var n="---"===t[1]?"old":"new",r=t[2].split("\t",2),o=r[0].replace(/\\\\/g,"\\");/^".*"$/.test(o)&&(o=o.substr(1,o.length-2)),e[n+"FileName"]=o,e[n+"Header"]=(r[1]||"").trim(),u++}}function r(){for(var e=u,t=i[u++].split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/),n={oldStart:+t[1],oldLines:+t[2]||1,newStart:+t[3],newLines:+t[4]||1,lines:[],linedelimiters:[]},r=0,l=0;u<i.length&&!(0===i[u].indexOf("--- ")&&u+2<i.length&&0===i[u+1].indexOf("+++ ")&&0===i[u+2].indexOf("@@"));u++){var a=0==i[u].length&&u!=i.length-1?" ":i[u][0];if("+"!==a&&"-"!==a&&" "!==a&&"\\"!==a)break;n.lines.push(i[u]),n.linedelimiters.push(s[u]||"\n"),"+"===a?r++:"-"===a?l++:" "===a&&(r++,l++)}if(r||1!==n.newLines||(n.newLines=0),l||1!==n.oldLines||(n.oldLines=0),o.strict){if(r!==n.newLines)throw new Error("Added line count did not match for hunk at line "+(e+1));if(l!==n.oldLines)throw new Error("Removed line count did not match for hunk at line "+(e+1))}return n}for(var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=e.split(/\r\n|[\n\v\f\r\x85]/),s=e.match(/\r\n|[\n\v\f\r\x85]/g)||[],l=[],u=0;u<i.length;)t();return l}function w(e,t,n){var r=!0,o=!1,i=!1,s=1;return function l(){if(r&&!i){if(o?s++:r=!1,e+s<=n)return s;i=!0}if(!o)return i||(r=!0),t<=e-s?-s++:(o=!0,l())}}function b(e,t){function n(e,t){for(var n=0;n<e.lines.length;n++){var r=e.lines[n],o=r.length>0?r[0]:" ",i=r.length>0?r.substr(1):r;if(" "===o||"-"===o){if(!a(t+1,s[t],o,i)&&++c>f)return!1;t++}}return!0}var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"==typeof t&&(t=y(t)),Array.isArray(t)){if(t.length>1)throw new Error("applyPatch only works with a single input.");t=t[0]}for(var o,i,s=e.split(/\r\n|[\n\v\f\r\x85]/),l=e.match(/\r\n|[\n\v\f\r\x85]/g)||[],u=t.hunks,a=r.compareLine||function(e,t,n,r){return t===r},c=0,f=r.fuzzFactor||0,d=0,h=0,p=0;p<u.length;p++){for(var m=u[p],v=s.length-m.oldLines,_=0,g=h+m.oldStart-1,b=w(g,d,v);void 0!==_;_=b())if(n(m,g+_)){m.offset=h+=_;break}if(void 0===_)return!1;d=m.offset+m.oldStart+m.oldLines}for(var k=0,S=0;S<u.length;S++){var x=u[S],j=x.oldStart+x.offset+k-1;k+=x.newLines-x.oldLines,j<0&&(j=0);for(var O=0;O<x.lines.length;O++){var L=x.lines[O],C=L.length>0?L[0]:" ",N=L.length>0?L.substr(1):L,P=x.linedelimiters[O];if(" "===C)j++;else if("-"===C)s.splice(j,1),l.splice(j,1);else if("+"===C)s.splice(j,0,N),l.splice(j,0,P),j++;else if("\\"===C){var F=x.lines[O-1]?x.lines[O-1][0]:null;"+"===F?o=!0:"-"===F&&(i=!0)}}}if(o)for(;!s[s.length-1];)s.pop(),l.pop();else i&&(s.push(""),l.push("\n"));for(var A=0;A<s.length-1;A++)s[A]=s[A]+l[A];return s.join("")}function k(e,t){"string"==typeof e&&(e=y(e));var n=0;!function r(){var o=e[n++];if(!o)return t.complete();t.loadFile(o,(function(e,n){if(e)return t.complete(e);var i=b(n,o,t);t.patched(o,i,(function(e){if(e)return t.complete(e);r()}))}))}()}function S(e,t,n,r,o,i,s){function l(e){return e.map((function(e){return" "+e}))}s||(s={}),void 0===s.context&&(s.context=4);var u=c(n,r,s);u.push({value:"",lines:[]});for(var a=[],f=0,d=0,h=[],p=1,v=1,_=function(e){var t=u[e],o=t.lines||t.value.replace(/\n$/,"").split("\n");if(t.lines=o,t.added||t.removed){var i;if(!f){var c=u[e-1];f=p,d=v,c&&(h=s.context>0?l(c.lines.slice(-s.context)):[],f-=h.length,d-=h.length)}(i=h).push.apply(i,m(o.map((function(e){return(t.added?"+":"-")+e})))),t.added?v+=o.length:p+=o.length}else{if(f)if(o.length<=2*s.context&&e<u.length-2){var _;(_=h).push.apply(_,m(l(o)))}else{var g,y=Math.min(o.length,s.context);(g=h).push.apply(g,m(l(o.slice(0,y))));var w={oldStart:f,oldLines:p-f+y,newStart:d,newLines:v-d+y,lines:h};if(e>=u.length-2&&o.length<=s.context){var b=/\n$/.test(n),k=/\n$/.test(r),S=0==o.length&&h.length>w.oldLines;!b&&S&&h.splice(w.oldLines,0,"\\ No newline at end of file"),(b||S)&&k||h.push("\\ No newline at end of file")}a.push(w),f=0,d=0,h=[]}p+=o.length,v+=o.length}},g=0;g<u.length;g++)_(g);return{oldFileName:e,newFileName:t,oldHeader:o,newHeader:i,hunks:a}}function x(e,t,n,r,o,i,s){var l=S(e,t,n,r,o,i,s),u=[];e==t&&u.push("Index: "+e),u.push("==================================================================="),u.push("--- "+l.oldFileName+(void 0===l.oldHeader?"":"\t"+l.oldHeader)),u.push("+++ "+l.newFileName+(void 0===l.newHeader?"":"\t"+l.newHeader));for(var a=0;a<l.hunks.length;a++){var c=l.hunks[a];u.push("@@ -"+c.oldStart+","+c.oldLines+" +"+c.newStart+","+c.newLines+" @@"),u.push.apply(u,c.lines)}return u.join("\n")+"\n"}function j(e,t,n,r,o,i){return x(e,e,t,n,r,o,i)}function O(e,t){if(t.length>e.length)return!1;for(var n=0;n<t.length;n++)if(t[n]!==e[n])return!1;return!0}function L(e,t,n){e=C(e,n),t=C(t,n);var r={};(e.index||t.index)&&(r.index=e.index||t.index),(e.newFileName||t.newFileName)&&(N(e)?N(t)?(r.oldFileName=P(r,e.oldFileName,t.oldFileName),r.newFileName=P(r,e.newFileName,t.newFileName),r.oldHeader=P(r,e.oldHeader,t.oldHeader),r.newHeader=P(r,e.newHeader,t.newHeader)):(r.oldFileName=e.oldFileName,r.newFileName=e.newFileName,r.oldHeader=e.oldHeader,r.newHeader=e.newHeader):(r.oldFileName=t.oldFileName||e.oldFileName,r.newFileName=t.newFileName||e.newFileName,r.oldHeader=t.oldHeader||e.oldHeader,r.newHeader=t.newHeader||e.newHeader)),r.hunks=[];for(var o=0,i=0,s=0,l=0;o<e.hunks.length||i<t.hunks.length;){var u=e.hunks[o]||{oldStart:1/0},a=t.hunks[i]||{oldStart:1/0};if(F(u,a))r.hunks.push(A(u,s)),o++,l+=u.newLines-u.oldLines;else if(F(a,u))r.hunks.push(A(a,l)),i++,s+=a.newLines-a.oldLines;else{var c={oldStart:Math.min(u.oldStart,a.oldStart),oldLines:0,newStart:Math.min(u.newStart+s,a.oldStart+l),newLines:0,lines:[]};E(c,u.oldStart,u.lines,a.oldStart,a.lines),i++,o++,r.hunks.push(c)}}return r}function C(e,t){if("string"==typeof e){if(/^@@/m.test(e)||/^Index:/m.test(e))return y(e)[0];if(!t)throw new Error("Must provide a base reference or pass in a patch");return S(void 0,void 0,t,e)}return e}function N(e){return e.newFileName&&e.newFileName!==e.oldFileName}function P(e,t,n){return t===n?t:(e.conflict=!0,{mine:t,theirs:n})}function F(e,t){return e.oldStart<t.oldStart&&e.oldStart+e.oldLines<t.oldStart}function A(e,t){return{oldStart:e.oldStart,oldLines:e.oldLines,newStart:e.newStart+t,newLines:e.newLines,lines:e.lines}}function E(e,t,n,r,o){var i={offset:t,lines:n,index:0},s={offset:r,lines:o,index:0};for(H(e,i,s),H(e,s,i);i.index<i.lines.length&&s.index<s.lines.length;){var l=i.lines[i.index],u=s.lines[s.index];if("-"!==l[0]&&"+"!==l[0]||"-"!==u[0]&&"+"!==u[0])if("+"===l[0]&&" "===u[0]){var a;(a=e.lines).push.apply(a,m(I(i)))}else if("+"===u[0]&&" "===l[0]){var c;(c=e.lines).push.apply(c,m(I(s)))}else"-"===l[0]&&" "===u[0]?T(e,i,s):"-"===u[0]&&" "===l[0]?T(e,s,i,!0):l===u?(e.lines.push(l),i.index++,s.index++):W(e,I(i),I(s));else D(e,i,s)}M(e,i),M(e,s),function(e){var t=function e(t){var n=0,r=0;return t.forEach((function(t){if("string"!=typeof t){var o=e(t.mine),i=e(t.theirs);void 0!==n&&(o.oldLines===i.oldLines?n+=o.oldLines:n=void 0),void 0!==r&&(o.newLines===i.newLines?r+=o.newLines:r=void 0)}else void 0===r||"+"!==t[0]&&" "!==t[0]||r++,void 0===n||"-"!==t[0]&&" "!==t[0]||n++})),{oldLines:n,newLines:r}}(e.lines),n=t.oldLines,r=t.newLines;void 0!==n?e.oldLines=n:delete e.oldLines,void 0!==r?e.newLines=r:delete e.newLines}(e)}function D(e,t,n){var r,o,i=I(t),s=I(n);if(U(i)&&U(s)){var l,u;if(O(i,s)&&z(n,i,i.length-s.length))return void(l=e.lines).push.apply(l,m(i));if(O(s,i)&&z(t,s,s.length-i.length))return void(u=e.lines).push.apply(u,m(s))}else if((r=i).length===(o=s).length&&O(r,o)){var a;return void(a=e.lines).push.apply(a,m(i))}W(e,i,s)}function T(e,t,n,r){var o,i=I(t),s=function(e,t){for(var n=[],r=[],o=0,i=!1,s=!1;o<t.length&&e.index<e.lines.length;){var l=e.lines[e.index],u=t[o];if("+"===u[0])break;if(i=i||" "!==l[0],r.push(u),o++,"+"===l[0])for(s=!0;"+"===l[0];)n.push(l),l=e.lines[++e.index];u.substr(1)===l.substr(1)?(n.push(l),e.index++):s=!0}if("+"===(t[o]||"")[0]&&i&&(s=!0),s)return n;for(;o<t.length;)r.push(t[o++]);return{merged:r,changes:n}}(n,i);s.merged?(o=e.lines).push.apply(o,m(s.merged)):W(e,r?s:i,r?i:s)}function W(e,t,n){e.conflict=!0,e.lines.push({conflict:!0,mine:t,theirs:n})}function H(e,t,n){for(;t.offset<n.offset&&t.index<t.lines.length;){var r=t.lines[t.index++];e.lines.push(r),t.offset++}}function M(e,t){for(;t.index<t.lines.length;){var n=t.lines[t.index++];e.lines.push(n)}}function I(e){for(var t=[],n=e.lines[e.index][0];e.index<e.lines.length;){var r=e.lines[e.index];if("-"===n&&"+"===r[0]&&(n="+"),n!==r[0])break;t.push(r),e.index++}return t}function U(e){return e.reduce((function(e,t){return e&&"-"===t[0]}),!0)}function z(e,t,n){for(var r=0;r<n;r++){var o=t[t.length-n+r].substr(1);if(e.lines[e.index+r]!==" "+o)return!1}return e.index+=n,!0}function R(e){for(var t,n=[],r=0;r<e.length;r++)n.push([(t=e[r]).added?1:t.removed?-1:0,t.value]);return n}function $(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];r.added?t.push("<ins>"):r.removed&&t.push("<del>"),t.push(J(r.value)),r.added?t.push("</ins>"):r.removed&&t.push("</del>")}return t.join("")}function J(e){var t=e;return(t=(t=(t=t.replace(/&/g,"&amp;")).replace(/</g,"&lt;")).replace(/>/g,"&gt;")).replace(/"/g,"&quot;")}n.r(t),n.d(t,"Diff",(function(){return r})),n.d(t,"diffChars",(function(){return s})),n.d(t,"diffWords",(function(){return u})),n.d(t,"diffWordsWithSpace",(function(){return a})),n.d(t,"diffLines",(function(){return c})),n.d(t,"diffTrimmedLines",(function(){return f})),n.d(t,"diffSentences",(function(){return d})),n.d(t,"diffCss",(function(){return h})),n.d(t,"diffJson",(function(){return v})),n.d(t,"diffArrays",(function(){return g})),n.d(t,"structuredPatch",(function(){return S})),n.d(t,"createTwoFilesPatch",(function(){return x})),n.d(t,"createPatch",(function(){return j})),n.d(t,"applyPatch",(function(){return b})),n.d(t,"applyPatches",(function(){return k})),n.d(t,"parsePatch",(function(){return y})),n.d(t,"merge",(function(){return L})),n.d(t,"convertChangesToDMP",(function(){return R})),n.d(t,"convertChangesToXML",(function(){return $})),n.d(t,"canonicalize",(function(){return _})),r.prototype={diff:function(e,t){function n(e){return l?(setTimeout((function(){l(void 0,e)}),0),!0):e}function r(){for(var r=-1*f;r<=f;r+=2){var s=void 0,l=h[r-1],d=h[r+1],p=(d?d.newPos:0)-r;l&&(h[r-1]=void 0);var m=l&&l.newPos+1<a,v=d&&0<=p&&p<c;if(m||v){if(!m||v&&l.newPos<d.newPos?(s=i(d),u.pushComponent(s.components,void 0,!0)):((s=l).newPos++,u.pushComponent(s.components,!0,void 0)),p=u.extractCommon(s,t,e,r),s.newPos+1>=a&&p+1>=c)return n(o(u,s.components,t,e,u.useLongestToken));h[r]=s}else h[r]=void 0}f++}var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},l=s.callback;"function"==typeof s&&(l=s,s={}),this.options=s;var u=this;e=this.castInput(e),t=this.castInput(t),e=this.removeEmpty(this.tokenize(e));var a=(t=this.removeEmpty(this.tokenize(t))).length,c=e.length,f=1,d=a+c,h=[{newPos:-1,components:[]}],p=this.extractCommon(h[0],t,e,0);if(h[0].newPos+1>=a&&p+1>=c)return n([{value:this.join(t),count:t.length}]);if(l)!function e(){setTimeout((function(){if(f>d)return l();r()||e()}),0)}();else for(;f<=d;){var m=r();if(m)return m}},pushComponent:function(e,t,n){var r=e[e.length-1];r&&r.added===t&&r.removed===n?e[e.length-1]={count:r.count+1,added:t,removed:n}:e.push({count:1,added:t,removed:n})},extractCommon:function(e,t,n,r){for(var o=t.length,i=n.length,s=e.newPos,l=s-r,u=0;s+1<o&&l+1<i&&this.equals(t[s+1],n[l+1]);)s++,l++,u++;return u&&e.components.push({count:u}),e.newPos=s,l},equals:function(e,t){return this.options.comparator?this.options.comparator(e,t):e===t||this.options.ignoreCase&&e.toLowerCase()===t.toLowerCase()},removeEmpty:function(e){for(var t=[],n=0;n<e.length;n++)e[n]&&t.push(e[n]);return t},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}};var q=new r,B=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,V=/\S/,G=new r;G.equals=function(e,t){return this.options.ignoreCase&&(e=e.toLowerCase(),t=t.toLowerCase()),e===t||this.options.ignoreWhitespace&&!V.test(e)&&!V.test(t)},G.tokenize=function(e){for(var t=e.split(/(\s+|[()[\]{}'"]|\b)/),n=0;n<t.length-1;n++)!t[n+1]&&t[n+2]&&B.test(t[n])&&B.test(t[n+2])&&(t[n]+=t[n+2],t.splice(n+1,2),n--);return t};var K=new r;K.tokenize=function(e){var t=[],n=e.split(/(\n|\r\n)/);n[n.length-1]||n.pop();for(var r=0;r<n.length;r++){var o=n[r];r%2&&!this.options.newlineIsToken?t[t.length-1]+=o:(this.options.ignoreWhitespace&&(o=o.trim()),t.push(o))}return t};var X=new r;X.tokenize=function(e){return e.split(/(\S.+?[.!?])(?=\s+|$)/)};var Q=new r;Q.tokenize=function(e){return e.split(/([{}:;,]|\s+)/)};var Z=Object.prototype.toString,Y=new r;Y.useLongestToken=!0,Y.tokenize=K.tokenize,Y.castInput=function(e){var t=this.options,n=t.undefinedReplacement,r=t.stringifyReplacer,o=void 0===r?function(e,t){return void 0===t?n:t}:r;return"string"==typeof e?e:JSON.stringify(_(e,null,null,o),o,"  ")},Y.equals=function(e,t){return r.prototype.equals.call(Y,e.replace(/,([\r\n])/g,"$1"),t.replace(/,([\r\n])/g,"$1"))};var ee=new r;ee.tokenize=function(e){return e.slice()},ee.join=ee.removeEmpty=function(e){return e}},"7IeX":function(e,t,n){"use strict";function r(){s=i.getVoices().filter(e=>e.lang.startsWith("ru"))[0]}function o(e){if(!s)return;const t=new SpeechSynthesisUtterance(e);console.log(s),t.voice=s,i.speak(t)}n.d(t,"a",(function(){return o}));const i=window.speechSynthesis;let s=null;r(),i.addEventListener("voiceschanged",r)},FcuA:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return l}));var r=n("hosL"),o=n("d39J"),i=n("7IeX"),s=n("/s/C");class l extends r.Component{constructor(...e){super(...e),this.state={from:"",to:"",comment:"",list:[]},this.onSubmit=e=>{if(e.preventDefault(),this.problem())return alert(this.problem());Object(o.a)(this.state),Object(i.a)(this.state.to),this.setState({from:"",to:"",comment:""})},this.problem=()=>{const{from:e,to:t,list:n}=this.state;return e&&t?Object(s.a)(e,t)?"Both words are the same ! ":n.filter(n=>Object(s.a)(e,n.from)||Object(s.a)(t,n.to)).length?"Word already in your list":void 0:"Please write a word and its translation"},this.backToEdit=e=>{e.preventDefault(),this.props.go("edit")}}componentDidMount(){this.clearListener=Object(o.c)(e=>this.setState({list:e.reverse()}))}componentWillUnmount(){this.clearListener()}render(t,{from:n,to:r,list:o}){return e("div",null,e("button",{onClick:this.backToEdit},"‹ wordlist (",o.length," words)"),e("form",{onSubmit:this.onSubmit,className:"add-word"},e("h1",null,"Add a word"),e("label",{htmlFor:"enterEnglish"},"English word"),e("input",{id:"enterEnglish",type:"text",placeholder:"English",value:n,onKeyUp:e=>this.setState({from:e.target.value})}),e("label",{htmlFor:"enterRussian"},"Russian translation to learn"),e("input",{id:"enterRussian",type:"text",placeholder:"Russian",value:r,onKeyUp:e=>this.setState({to:e.target.value})}),e("button",{className:"primary float-bottom",id:"submitWord"},"Add")))}}}).call(this,n("hosL").h)},QfWi:function(e,t,n){"use strict";function r({data:e,columns:t}){return Object(i.h)("table",{className:"mw-table"},Object(i.h)("thead",null,Object(i.h)("tr",null,t.map(e=>Object(i.h)("th",null,e.name)))),Object(i.h)("tbody",null,e.map(e=>Object(i.h)("tr",null,t.map(t=>Object(i.h)("td",null,t.value(e)))))))}function o({answer:e,to:t}){return Object(i.h)("span",null,c.diffChars(e,t,{ignoreCase:!0}).map(({added:e,removed:t,value:n})=>e&&Object(i.h)("ins",null,n)||t&&Object(i.h)("del",null,n)||Object(i.h)("span",null,n)))}n.r(t),n("+E3a");var i=n("hosL"),s=n("d39J"),l=n("/s/C"),u=n("7IeX");class a extends i.Component{constructor(...e){super(...e),this.state={list:null},this.goToTraining=e=>{e.preventDefault(),this.props.go("train")},this.goToAdd=e=>{e.preventDefault(),this.props.go("add")}}componentDidMount(){this.clearListener=Object(s.c)(e=>this.setState({list:e.reverse()}))}componentWillUnmount(){this.clearListener()}render(e,{list:t}){return t?Object(i.h)("div",null,Object(i.h)("h1",null,"My ",t.length," words",Object(i.h)("button",{className:"primary inline",onClick:this.goToAdd},"Add")),Object(i.h)(r,{data:t,columns:[{name:"English",value:e=>e.from},{name:"Russian",value:e=>e.to}]}),Object(i.h)("button",{className:"float-bottom primary",onClick:this.goToTraining},"Start learning ›")):"loading"}}const c=n("0u3c");class f extends i.Component{constructor(...e){super(...e),this.state={},this.onSubmitAnswer=e=>{e.preventDefault();const{word:t,answer:n}=this.state;Object(u.a)(t.to),Object(l.a)(t.to,n)?this.setState({mode:"correct"}):this.setState({mode:"incorrect"})},this.validateSuccess=e=>{e.preventDefault();const{word:t}=this.state;this.setNewWord(Object(s.d)({id:t.id,guessed:!0}))},this.validateFailure=e=>{e.preventDefault();const{word:t}=this.state;this.setNewWord(Object(s.d)({id:t.id,guessed:!1}))},this.setAnswer=e=>{this.setState({answer:e.target.value})},this.backToEdit=e=>{e.preventDefault(),this.props.go("edit")}}setNewWord(e){this.setState({word:e,mode:"ask",answer:""})}componentDidMount(){this.setNewWord(Object(s.b)())}renderByMode(){const{word:e,answer:t,mode:n}=this.state;return e?"correct"===n?Object(i.h)(h,{confirm:this.validateSuccess}):"incorrect"===n?Object(i.h)(p,{answer:t,word:e,confirm:this.validateFailure}):Object(i.h)(d,{word:e,answer:t,setAnswer:this.setAnswer,onSubmitAnswer:this.onSubmitAnswer}):"loading"}render({}){return Object(i.h)("div",null,Object(i.h)("button",{onClick:this.backToEdit},"‹ wordlist"),this.renderByMode())}}class d extends i.Component{componentDidMount(){this.input.focus()}render(){let{word:e,answer:t,setAnswer:n,onSubmitAnswer:r}=this.props;return Object(i.h)("div",null,Object(i.h)("h1",{className:"centered"}," How do you say",Object(i.h)("strong",null,e.from),"in russian ?"),Object(i.h)("form",{onSubmit:r},Object(i.h)("label",null,"Please type the russian word below"),Object(i.h)("input",{type:"text",ref:e=>this.input=e,value:t,onKeyUp:n}),Object(i.h)("button",{className:"primary float-bottom",type:"submit"},t?"Check":"I don't know")))}}class h extends i.Component{componentDidMount(){this.input.focus()}render({confirm:e}){return Object(i.h)("div",null,Object(i.h)("h1",{className:"centered"},"Correct ! "),Object(i.h)("button",{className:"primary float-bottom",ref:e=>this.input=e,onClick:e},"Next word"))}}class p extends i.Component{constructor(...e){super(...e),this.state={check:""},this.checkCorrectAnswerGiven=e=>{e.preventDefault(),this.isCorrect()&&this.props.confirm(e)}}componentDidMount(){this.input.focus()}isCorrect(){return Object(l.a)(this.state.check,this.props.word.to)}render({answer:e,word:t},{check:n}){return Object(i.h)("form",{onSubmit:this.checkCorrectAnswerGiven},e&&Object(i.h)("p",null,"Sorry, there was a mistake : ",Object(i.h)(o,{answer:e,to:t.to})),Object(i.h)("h1",{className:"centered"},t.from,"  is",Object(i.h)("strong",null,t.to)," in russian "),Object(i.h)("label",null,"Please type the correct answer below"),Object(i.h)("input",{type:"text",ref:e=>this.input=e,value:n,placeholder:t.to,onKeyUp:e=>this.setState({check:e.target.value})}),Object(i.h)("button",{className:"primary float-bottom",disabled:!this.isCorrect()},"Next word"))}}var m=n("FcuA");t.default=class extends i.Component{constructor(...e){super(...e),this.state={page:"train"},this.go=e=>{this.setState({page:e})}}page(){switch(this.state.page){case"edit":return a;case"train":return f;case"add":return m.a}}render(){const e=this.page();return Object(i.h)("div",{id:"app"},Object(i.h)(e,{go:this.go}))}}},d39J:function(e,t,n){"use strict";function r(e){return e(l),c.push(e),function(){c=c.filter(t=>t!==e)}}function o({from:e,to:t}){l.push({from:e,to:t,id:Math.max(0,...l.map(e=>e.id))+1}),c.forEach(e=>e(l)),localStorage.setItem("wordlist",JSON.stringify(l))}function i(){return l[a.length%l.length]}function s({id:e,guessed:t}){return a.push({time:new Date,id:e,guessed:t}),i()}n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return i})),n.d(t,"d",(function(){return s}));let l=[];const u=[{to:"легко",from:"easy"},{to:"кран",from:"tap"},{to:"буква",from:"letter (character)"},{to:"открытка",from:"postcard"},{to:"событие",from:"event"},{to:"чашка",from:"cup"},{to:"гласные",from:"vowels"},{to:"согласные",from:"consonants"},{to:"рыба",from:"fish"},{to:"вы голодны?",from:"Are you hungry? (formal)"},{to:"писовать",from:"to draw"},{to:"искусство",from:"art"},{to:"общежите",from:"dormitory"},{to:"это трудно читать",from:"this is difficult to read"},{to:"нога",from:"leg"},{to:"шкаф",from:"cupboard"},{to:"ошибка",from:"mistake"},{to:"трудно",from:"difficult"},{to:"написать на доске",from:"write on the blackboard"},{to:"тебе холодно?",from:"Are you cold? (informal)"},{to:"брат",from:"brother"},{to:"Япония",from:"japan"},{to:"квартира",from:"apartment"},{to:"бумага",from:"paper"},{to:"мост",from:"bridge"},{to:"зонт",from:"umbrella"},{to:"звук",from:"sound"},{to:"торт",from:"cake"},{to:"марка",from:"stamp"},{to:"рука",from:"hand, arm"},{to:"урок",from:"lesson"},{to:"полка",from:"shelf"},{to:"лампа",from:"lamp"},{to:"глаз",from:"eye"},{to:"окно",from:"window"},{to:"вопрос",from:"question"},{to:"доска",from:"blackboard"},{to:"подруга",from:"friend (female)"},{to:"дорога",from:"road"},{to:"карандаш",from:"pencil"},{to:"рубашка",from:"shirt"},{to:"шапка",from:"hat"},{to:"шарф",from:"scarf"},{to:"направление",from:"direction"},{to:"сегодня",from:"today"},{to:"сыр",from:"cheese"},{to:"карта",from:"map"},{to:"страна",from:"country"},{to:"друг",from:"friend"},{to:"стул",from:"chair"},{to:"стол",from:"table"},{to:"ложка",from:"spoon"},{to:"Видить",from:"to see"},{to:"смотреть",from:"watch"},{to:"вода",from:"water"}].map(({from:e,to:t},n)=>({from:e,to:t,id:n}));try{l=JSON.parse(localStorage.getItem("wordlist"))||u}catch(e){console.debug(e,"No saved word list"),l=u}let a=[{time:new Date,id:0,guessed:!1}],c=[]},hosL:function(e,t,n){"use strict";function r(e,t){for(var n in t)e[n]=t[n];return e}function o(e){var t=e.parentNode;t&&t.removeChild(e)}function i(e,t,n){var r,o=arguments,i={};for(r in t)"key"!==r&&"ref"!==r&&(i[r]=t[r]);if(arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(o[r]);if(null!=n&&(i.children=n),"function"==typeof e&&null!=e.defaultProps)for(r in e.defaultProps)void 0===i[r]&&(i[r]=e.defaultProps[r]);return s(e,i,t&&t.key,t&&t.ref)}function s(e,t,n,r){var o={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0};return N.vnode&&N.vnode(o),o}function l(){return{}}function u(e){return e.children}function a(e,t){this.props=e,this.context=t}function c(e,t){if(null==t)return e.__?c(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?c(e):null}function f(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return f(e)}}function d(e){(!e.__d&&(e.__d=!0)&&1===F.push(e)||E!==N.debounceRendering)&&((E=N.debounceRendering)||A)(h)}function h(){var e,t,n,o,i,s,l;for(F.sort((function(e,t){return t.__v.__b-e.__v.__b}));e=F.pop();)e.__d&&(n=void 0,o=void 0,s=(i=(t=e).__v).__e,(l=t.__P)&&(n=[],o=y(l,i,r({},i),t.__n,void 0!==l.ownerSVGElement,null,n,null==s?c(i):s),w(n,i),o!=s&&f(i)))}function p(e,t,n,r,i,s,l,u,a){var f,d,h,p,v,_,g,w=n&&n.__k||H,b=w.length;if(u==W&&(u=null!=s?s[0]:b?c(n,0):null),f=0,t.__k=m(t.__k,(function(n){if(null!=n){if(n.__=t,n.__b=t.__b+1,null===(h=w[f])||h&&n.key==h.key&&n.type===h.type)w[f]=void 0;else for(d=0;d<b;d++){if((h=w[d])&&n.key==h.key&&n.type===h.type){w[d]=void 0;break}h=null}if(p=y(e,n,h=h||W,r,i,s,l,u,a),(d=n.ref)&&h.ref!=d&&(g||(g=[]),h.ref&&g.push(h.ref,null,n),g.push(d,n.__c||p,n)),null!=p){var o;if(null==_&&(_=p),void 0!==n.__d)o=n.__d,n.__d=void 0;else if(s==h||p!=u||null==p.parentNode){e:if(null==u||u.parentNode!==e)e.appendChild(p),o=null;else{for(v=u,d=0;(v=v.nextSibling)&&d<b;d+=2)if(v==p)break e;e.insertBefore(p,u),o=u}"option"==t.type&&(e.value="")}u=void 0!==o?o:p.nextSibling,"function"==typeof t.type&&(t.__d=u)}else u&&h.__e==u&&u.parentNode!=e&&(u=c(h))}return f++,n})),t.__e=_,null!=s&&"function"!=typeof t.type)for(f=s.length;f--;)null!=s[f]&&o(s[f]);for(f=b;f--;)null!=w[f]&&S(w[f],w[f]);if(g)for(f=0;f<g.length;f++)k(g[f],g[++f],g[++f])}function m(e,t,n){if(null==n&&(n=[]),null==e||"boolean"==typeof e)t&&n.push(t(null));else if(Array.isArray(e))for(var r=0;r<e.length;r++)m(e[r],t,n);else n.push(t?t("string"==typeof e||"number"==typeof e?s(null,e,null,null):null!=e.__e||null!=e.__c?s(e.type,e.props,e.key,null):e):e);return n}function v(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]="number"==typeof n&&!1===M.test(t)?n+"px":null==n?"":n}function _(e,t,n,r,o){var i,s,l,u,a;if(o?"className"===t&&(t="class"):"class"===t&&(t="className"),"key"===t||"children"===t);else if("style"===t)if(i=e.style,"string"==typeof n)i.cssText=n;else{if("string"==typeof r&&(i.cssText="",r=null),r)for(s in r)n&&s in n||v(i,s,"");if(n)for(l in n)r&&n[l]===r[l]||v(i,l,n[l])}else"o"===t[0]&&"n"===t[1]?(u=t!==(t=t.replace(/Capture$/,"")),a=t.toLowerCase(),t=(a in e?a:t).slice(2),n?(r||e.addEventListener(t,g,u),(e.l||(e.l={}))[t]=n):e.removeEventListener(t,g,u)):"list"!==t&&"tagName"!==t&&"form"!==t&&"type"!==t&&"size"!==t&&!o&&t in e?e[t]=null==n?"":n:"function"!=typeof n&&"dangerouslySetInnerHTML"!==t&&(t!==(t=t.replace(/^xlink:?/,""))?null==n||!1===n?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),n):null==n||!1===n&&!/^ar/.test(t)?e.removeAttribute(t):e.setAttribute(t,n))}function g(e){this.l[e.type](N.event?N.event(e):e)}function y(e,t,n,o,i,s,l,c,f){var d,h,m,v,_,g,y,w,k,S,j=t.type;if(void 0!==t.constructor)return null;(d=N.__b)&&d(t);try{e:if("function"==typeof j){if(w=t.props,k=(d=j.contextType)&&o[d.__c],S=d?k?k.props.value:d.__:o,n.__c?y=(h=t.__c=n.__c).__=h.__E:("prototype"in j&&j.prototype.render?t.__c=h=new j(w,S):(t.__c=h=new a(w,S),h.constructor=j,h.render=x),k&&k.sub(h),h.props=w,h.state||(h.state={}),h.context=S,h.__n=o,m=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=j.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=r({},h.__s)),r(h.__s,j.getDerivedStateFromProps(w,h.__s))),v=h.props,_=h.state,m)null==j.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else{if(null==j.getDerivedStateFromProps&&w!==v&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(w,S),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(w,h.__s,S)){for(h.props=w,h.state=h.__s,h.__d=!1,h.__v=t,t.__e=n.__e,t.__k=n.__k,h.__h.length&&l.push(h),d=0;d<t.__k.length;d++)t.__k[d]&&(t.__k[d].__=t);break e}null!=h.componentWillUpdate&&h.componentWillUpdate(w,h.__s,S),null!=h.componentDidUpdate&&h.__h.push((function(){h.componentDidUpdate(v,_,g)}))}h.context=S,h.props=w,h.state=h.__s,(d=N.__r)&&d(t),h.__d=!1,h.__v=t,h.__P=e,d=h.render(h.props,h.state,h.context),t.__k=null!=d&&d.type==u&&null==d.key?d.props.children:Array.isArray(d)?d:[d],null!=h.getChildContext&&(o=r(r({},o),h.getChildContext())),m||null==h.getSnapshotBeforeUpdate||(g=h.getSnapshotBeforeUpdate(v,_)),p(e,t,n,o,i,s,l,c,f),h.base=t.__e,h.__h.length&&l.push(h),y&&(h.__E=h.__=null),h.__e=!1}else t.__e=b(n.__e,t,n,o,i,s,l,f);(d=N.diffed)&&d(t)}catch(e){N.__e(e,t,n)}return t.__e}function w(e,t){N.__c&&N.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){N.__e(e,t.__v)}}))}function b(e,t,n,r,o,i,s,l){var u,a,c,f,d,h=n.props,m=t.props;if(o="svg"===t.type||o,null!=i)for(u=0;u<i.length;u++)if(null!=(a=i[u])&&((null===t.type?3===a.nodeType:a.localName===t.type)||e==a)){e=a,i[u]=null;break}if(null==e){if(null===t.type)return document.createTextNode(m);e=o?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type,m.is&&{is:m.is}),i=null}if(null===t.type)h!==m&&e.data!=m&&(e.data=m);else if(t!==n){if(null!=i&&(i=H.slice.call(e.childNodes)),c=(h=n.props||W).dangerouslySetInnerHTML,f=m.dangerouslySetInnerHTML,!l){if(h===W)for(h={},d=0;d<e.attributes.length;d++)h[e.attributes[d].name]=e.attributes[d].value;(f||c)&&(f&&c&&f.__html==c.__html||(e.innerHTML=f&&f.__html||""))}(function(e,t,n,r,o){var i;for(i in n)i in t||_(e,i,null,n[i],r);for(i in t)o&&"function"!=typeof t[i]||"value"===i||"checked"===i||n[i]===t[i]||_(e,i,t[i],n[i],r)})(e,m,h,o,l),t.__k=t.props.children,f||p(e,t,n,r,"foreignObject"!==t.type&&o,i,s,W,l),l||("value"in m&&void 0!==m.value&&m.value!==e.value&&(e.value=null==m.value?"":m.value),"checked"in m&&void 0!==m.checked&&m.checked!==e.checked&&(e.checked=m.checked))}return e}function k(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){N.__e(e,n)}}function S(e,t,n){var r,i,s;if(N.unmount&&N.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||k(r,null,t)),n||"function"==typeof e.type||(n=null!=(i=e.__e)),e.__e=e.__d=void 0,null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){N.__e(e,t)}r.base=r.__P=null}if(r=e.__k)for(s=0;s<r.length;s++)r[s]&&S(r[s],t,n);null!=i&&o(i)}function x(e,t,n){return this.constructor(e,n)}function j(e,t,n){var r,o,s;N.__&&N.__(e,t),o=(r=n===D)?null:n&&n.__k||t.__k,e=i(u,null,[e]),s=[],y(t,(r?t:n||t).__k=e,o||W,W,void 0!==t.ownerSVGElement,n&&!r?[n]:o?null:H.slice.call(t.childNodes),s,n||W,r),w(s,e)}function O(e,t){j(e,t,D)}function L(e,t){return t=r(r({},e.props),t),arguments.length>2&&(t.children=H.slice.call(arguments,2)),s(e.type,t,t.key||e.key,t.ref||e.ref)}function C(e){var t={},n={__c:"__cC"+T++,__:e,Consumer:function(e,t){return e.children(t)},Provider:function(e){var r,o=this;return this.getChildContext||(r=[],this.getChildContext=function(){return t[n.__c]=o,t},this.shouldComponentUpdate=function(t){e.value!==t.value&&r.some((function(e){e.context=t.value,d(e)}))},this.sub=function(e){r.push(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){r.splice(r.indexOf(e),1),t&&t.call(e)}}),e.children}};return n.Consumer.contextType=n,n}n.r(t),n.d(t,"render",(function(){return j})),n.d(t,"hydrate",(function(){return O})),n.d(t,"createElement",(function(){return i})),n.d(t,"h",(function(){return i})),n.d(t,"Fragment",(function(){return u})),n.d(t,"createRef",(function(){return l})),n.d(t,"isValidElement",(function(){return P})),n.d(t,"Component",(function(){return a})),n.d(t,"cloneElement",(function(){return L})),n.d(t,"createContext",(function(){return C})),n.d(t,"toChildArray",(function(){return m})),n.d(t,"_unmount",(function(){return S})),n.d(t,"options",(function(){return N}));var N,P,F,A,E,D,T,W={},H=[],M=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;N={__e:function(e,t){for(var n,r;t=t.__;)if((n=t.__c)&&!n.__)try{if(n.constructor&&null!=n.constructor.getDerivedStateFromError&&(r=!0,n.setState(n.constructor.getDerivedStateFromError(e))),null!=n.componentDidCatch&&(r=!0,n.componentDidCatch(e)),r)return d(n.__E=n)}catch(t){e=t}throw e}},P=function(e){return null!=e&&void 0===e.constructor},a.prototype.setState=function(e,t){var n;n=this.__s!==this.state?this.__s:this.__s=r({},this.state),"function"==typeof e&&(e=e(n,this.props)),e&&r(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),d(this))},a.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),d(this))},a.prototype.render=u,F=[],A="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,D=W,T=0},mdyV:function(e,t,n){"use strict";n.r(t);var r=n("hosL");const{h:o,render:i,hydrate:s}=r,l=e=>e&&e.default?e.default:e;if("serviceWorker"in navigator&&navigator.serviceWorker.register(n.p+"sw-esm.js"),"function"==typeof l(n("QfWi"))){let e=document.getElementById("preact_root")||document.body.firstElementChild;(()=>{let t=l(n("QfWi")),r={};const u=document.querySelector('[type="__PREACT_CLI_DATA__"]');u&&(r=JSON.parse(u.innerHTML).preRenderData),e=("script"!==e.tagName&&s?s:i)(o(t,{CLI_DATA:{preRenderData:r}}),document.body,e)})()}}});
//# sourceMappingURL=bundle.a18ac.esm.js.map