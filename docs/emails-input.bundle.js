!function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=7)}([function(e,n,t){"use strict";var r,i=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},a=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),o=[];function c(e){for(var n=-1,t=0;t<o.length;t++)if(o[t].identifier===e){n=t;break}return n}function l(e,n){for(var t={},r=[],i=0;i<e.length;i++){var a=e[i],l=n.base?a[0]+n.base:a[0],u=t[l]||0,s="".concat(l," ").concat(u);t[l]=u+1;var d=c(s),f={css:a[1],media:a[2],sourceMap:a[3]};-1!==d?(o[d].references++,o[d].updater(f)):o.push({identifier:s,updater:h(f,n),references:1}),r.push(s)}return r}function u(e){var n=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var i=t.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(e){n.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(n);else{var o=a(e.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}return n}var s,d=(s=[],function(e,n){return s[e]=n,s.filter(Boolean).join("\n")});function f(e,n,t,r){var i=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=d(n,i);else{var a=document.createTextNode(i),o=e.childNodes;o[n]&&e.removeChild(o[n]),o.length?e.insertBefore(a,o[n]):e.appendChild(a)}}function p(e,n,t){var r=t.css,i=t.media,a=t.sourceMap;if(i?e.setAttribute("media",i):e.removeAttribute("media"),a&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var m=null,v=0;function h(e,n){var t,r,i;if(n.singleton){var a=v++;t=m||(m=u(n)),r=f.bind(null,t,a,!1),i=f.bind(null,t,a,!0)}else t=u(n),r=p.bind(null,t,n),i=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return r(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;r(e=n)}else i()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=i());var t=l(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<t.length;r++){var i=c(t[r]);o[i].references--}for(var a=l(e,n),u=0;u<t.length;u++){var s=c(t[u]);0===o[s].references&&(o[s].updater(),o.splice(s,1))}t=a}}}},function(e,n,t){"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=function(e,n){var t=e[1]||"",r=e[3];if(!r)return t;if(n&&"function"==typeof btoa){var i=(o=r,c=btoa(unescape(encodeURIComponent(JSON.stringify(o)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(l," */")),a=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[t].concat(a).concat([i]).join("\n")}var o,c,l;return[t].join("\n")}(n,e);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,r){"string"==typeof e&&(e=[[null,e,""]]);var i={};if(r)for(var a=0;a<this.length;a++){var o=this[a][0];null!=o&&(i[o]=!0)}for(var c=0;c<e.length;c++){var l=[].concat(e[c]);r&&i[l[0]]||(t&&(l[2]?l[2]="".concat(t," and ").concat(l[2]):l[2]=t),n.push(l))}},n}},,,,function(e,n,t){var r=t(0),i=t(6);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var a={insert:"head",singleton:!1},o=(r(i,a),i.locals?i.locals:{});e.exports=o},function(e,n,t){(n=t(1)(!1)).push([e.i,"\n  .VJoGQvmonbDCV3wHF7sHL {\n    font-family: Open Sans, sans-serif;\n  }\n\n  ._9B0GX6LCiEUSyWryJdr- {\n    width: 100%;\n    min-height: 96px;\n    max-height: 180px;\n    overflow-y: auto;\n    background: #ffffff;\n    border: 1px solid #c3c2cf;\n    box-sizing: border-box;\n    border-radius: 4px;\n    padding: 8px 7px;\n  }\n\n  ._2C1BcEOhYfmwgdcN5dYQT_ {\n    display: inline-block;\n    margin: 2px 0;\n    padding: 5px 10px 5px 12px;\n    font-style: normal;\n    font-weight: normal;\n    font-size: 14px;\n    line-height: 24px;\n    text-align: right;\n    color: #050038;\n  }\n  ._1I_qY_l9WknjFI9kuqUq60 {\n    margin-left: 8px;\n    cursor: pointer;\n  }\n  ._1pRwVBqmpReENc0ViM_iW- {\n    border-radius: 100px;\n    background: rgba(102, 153, 255, 0.2);\n  }\n  ._214j1aRdfa-5IKr8XM3G4h {\n    background: #ffffff;\n  }\n\n  ._1QNGeiLVV0wlGIMM7PQhVi {\n    border: none;\n    padding-left: 8px;\n    text-align: left;\n  }\n  ._1QNGeiLVV0wlGIMM7PQhVi::-webkit-input-placeholder {\n    text-align: left;\n    color: #c3c2cf;\n  }\n  ._1QNGeiLVV0wlGIMM7PQhVi::-moz-placeholder {\n    text-align: left;\n    color: #c3c2cf;\n  }\n  ._1QNGeiLVV0wlGIMM7PQhVi:-ms-input-placeholder {\n    text-align: left;\n    color: #c3c2cf;\n  }\n  ._1QNGeiLVV0wlGIMM7PQhVi:focus {\n    box-shadow: none;\n    border: none;\n    outline: none;\n    text-align: left;\n  }\n",""]),n.locals={fontFamily:"VJoGQvmonbDCV3wHF7sHL",emailsInput:"_9B0GX6LCiEUSyWryJdr-",email:"_2C1BcEOhYfmwgdcN5dYQT_ VJoGQvmonbDCV3wHF7sHL",delete:"_1I_qY_l9WknjFI9kuqUq60",emailStateValid:"_1pRwVBqmpReENc0ViM_iW- _2C1BcEOhYfmwgdcN5dYQT_ VJoGQvmonbDCV3wHF7sHL",emailStateInvalid:"_214j1aRdfa-5IKr8XM3G4h _2C1BcEOhYfmwgdcN5dYQT_ VJoGQvmonbDCV3wHF7sHL",input:"_1QNGeiLVV0wlGIMM7PQhVi _2C1BcEOhYfmwgdcN5dYQT_ VJoGQvmonbDCV3wHF7sHL"},e.exports=n},function(e,n,t){"use strict";t.r(n),t.d(n,"COMPLETE_INPUT",(function(){return l})),t.d(n,"DELETE_EMAIL_NODE",(function(){return u})),t.d(n,"EmailsInput",(function(){return s}));var r=t(5),i=/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,a=function(e){return i.test(e)},o={create:function(e){!function(e){if("string"!=typeof e)throw new Error("EmailNode : create method expects a string as an argument")}(e);var n=e.split(",")[0],t=document.createElement("div"),i=document.createTextNode(n);t.appendChild(i);var o=a(n),c=o?"emailStateValid":"emailStateInvalid";t.className=r[c],t.setAttribute("data-email",n),t.setAttribute("data-valid",String(o));var l=document.createElement("span");return l.innerHTML="&#10005",l.className=r.delete,t.appendChild(l),{div:t,email:n}},isDeleteButton:function(e){return"span"===e.tagName.toLowerCase()&&e.classList.contains(r.delete)}},c={create:function(){var e=document.createElement("input");return e.placeholder="add more people...",e.className=r.input,e}};!function(){if("function"==typeof window.CustomEvent)return!1;function e(e,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var t=document.createEvent("CustomEvent");return t.initCustomEvent(e,n.bubbles,n.cancelable,n.detail),t}e.prototype=window.Event.prototype,window.CustomEvent=e}();var l="emails-input--complete-input-node",u="emails-input--delete-email-node";function s(e,n){var t;void 0===n&&(n={});var i=[],s=function(e){throw new Error("EmailsInput : "+e)},d=function(){i.forEach((function(e){e.call(null,t)}))},f=function(e){var n=new CustomEvent(l,{bubbles:!0});return e.dispatchEvent(n)},p=function(e){var n,r=e.target,i=null===(n=r.value)||void 0===n?void 0:n.replace(/,/g,"");if(i){var a=o.create(i).div;r.parentNode.insertBefore(a,r),t.push(i),r.value="",d()}},m=function(e){var n=e.target.parentElement,r=n.getAttribute("data-email"),i=t.indexOf(r);i>=0&&t.splice(i,1),n.parentElement.removeChild(n),d()},v=function(e){var n=e.key||e.keyCode;"Enter"!==n&&13!==n&&","!==n&&188!==n||f(e.target)},h=function(e){f(e.target)},g=function(e){var n=e.target;o.isDeleteButton(n)&&function(e){var n=e.target,t=new CustomEvent(u,{bubbles:!0});n.dispatchEvent(t)}(e)},b=function(n){n.preventDefault();var r=function(e){return e.split(",").reduce((function(e,n){var t=n.trim(),r=t.match(/<([^>]*)>/);return r&&r[1]&&(t=r[1].trim()),t&&e.push(t),e}),[])}((n.clipboardData||window.clipboardData).getData("text")),i=e.lastChild;r.length<2?r[0]&&(i.value=r[0]):r.forEach((function(n){var r=o.create(n),a=r.div,c=r.email;e.insertBefore(a,i),t.push(c)}))},y=function(n){!function(e){Array.isArray(e)&&!e.filter((function(e){return"string"!=typeof e}))[0]||s("setEmails method expects an array of strings as an argument")}(n),e.innerHTML="",t=[],n.forEach((function(n){var r=o.create(n),i=r.div,a=r.email;e.appendChild(i),t.push(a)})),e.appendChild(c.create()).scrollIntoView(),d()};return t=[],e instanceof HTMLElement||s("constructor expects HTMLElement as the first argument"),function(e){var n,t;e instanceof Object||s("constructor expects Object as the second argument");var r=e.defaultEmails,i=e.maxHeight,a=e.minHeight;(void 0!==r&&!Array.isArray(r)||Array.isArray(r)&&(null===(n=r)||void 0===n?void 0:n.length)>0&&(null===(t=r)||void 0===t?void 0:t.filter((function(e){return"string"!=typeof e})).length)>0)&&s("config.defaultEmails should be a type of string[]"),void 0!==i&&"string"!=typeof i&&s("config.maxHeight should be a type of string"),void 0!==a&&"string"!=typeof a&&s("config.minHeight should be a type of string")}(n),e.appendChild(c.create()),function(n){var t=n.defaultEmails,r=n.maxHeight,i=n.minHeight;t&&y(t),r&&(e.style.maxHeight=r),i&&(e.style.minHeight=i)}(n),e.classList.add(r.emailsInput),e.addEventListener("keyup",v),e.addEventListener("focusout",h),e.addEventListener(l,p),e.addEventListener("click",g),e.addEventListener(u,m),e.addEventListener("paste",b,!0),{getEmails:function(){return Array.apply({},t)},setEmails:y,onEmailsChange:function(e){var n;return(n=e)&&n.constructor&&n.call&&n.apply||s("onEmailsChange method expects a function as an argument"),i.push(e),function(){var n=i.indexOf(e);n>-1&&i.splice(n,1)}},isEmailValid:a}}window.EmailsInput=s}]);
//# sourceMappingURL=emails-input.bundle.js.map