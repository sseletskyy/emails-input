!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=13)}([function(e,t,n){"use strict";var i=n(7);t.a=i},function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return a}));var i=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,r=function(e){return i.test(e)},o=function(e){return e.split(",").reduce((function(e,t){var n=t.trim(),i=n.match(/<([^>]*)>/);return i&&i[1]&&(n=i[1].trim()),n&&e.push(n),e}),[])},a=function(e){return e&&e.constructor&&e.call&&e.apply}},function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var i=n(1),r=n(0),o={create:function(e){!function(e){if("string"!=typeof e)throw new Error("EmailNode : create method expects a string as an argument")}(e);var t=e.split(",")[0],n=document.createElement("div"),o=document.createTextNode(t);n.appendChild(o);var a=Object(i.c)(t),s=a?"emailStateValid":"emailStateInvalid";n.className=r.a[s],n.setAttribute("data-email",t),n.setAttribute("data-valid",String(a));var c=document.createElement("span");return c.innerHTML="&#10005",c.className=r.a.delete,n.appendChild(c),{div:n,email:t}},isDeleteButton:function(e){return"span"===e.tagName.toLowerCase()&&e.classList.contains(r.a.delete)}}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var i=n(0),r={create:function(){var e=document.createElement("input");return e.placeholder="add more people...",e.className=i.a.input,e}}},function(e,t,n){"use strict";var i,r=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},o=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function s(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function c(e,t){for(var n={},i=[],r=0;r<e.length;r++){var o=e[r],c=t.base?o[0]+t.base:o[0],l=n[c]||0,u="".concat(c," ").concat(l);n[c]=l+1;var d=s(u),p={css:o[1],media:o[2],sourceMap:o[3]};-1!==d?(a[d].references++,a[d].updater(p)):a.push({identifier:u,updater:v(p,t),references:1}),i.push(u)}return i}function l(e){var t=document.createElement("style"),i=e.attributes||{};if(void 0===i.nonce){var r=n.nc;r&&(i.nonce=r)}if(Object.keys(i).forEach((function(e){t.setAttribute(e,i[e])})),"function"==typeof e.insert)e.insert(t);else{var a=o(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var u,d=(u=[],function(e,t){return u[e]=t,u.filter(Boolean).join("\n")});function p(e,t,n,i){var r=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(e.styleSheet)e.styleSheet.cssText=d(t,r);else{var o=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function f(e,t,n){var i=n.css,r=n.media,o=n.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),o&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var h=null,m=0;function v(e,t){var n,i,r;if(t.singleton){var o=m++;n=h||(h=l(t)),i=p.bind(null,n,o,!1),r=p.bind(null,n,o,!0)}else n=l(t),i=f.bind(null,n,t),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else r()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=r());var n=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var i=0;i<n.length;i++){var r=s(n[i]);a[r].references--}for(var o=c(e,t),l=0;l<n.length;l++){var u=s(n[l]);0===a[u].references&&(a[u].updater(),a.splice(u,1))}n=o}}}},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var r=(a=i,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),o=i.sources.map((function(e){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(e," */")}));return[n].concat(o).concat([r]).join("\n")}var a,s,c;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,i){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(i)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(r[a]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);i&&r[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},function(e,t,n){"use strict";function i(){if("function"==typeof window.CustomEvent)return!1;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e}n.d(t,"a",(function(){return i}))},function(e,t,n){var i=n(4),r=n(8);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var o={insert:"head",singleton:!1},a=(i(r,o),r.locals?r.locals:{});e.exports=a},function(e,t,n){(t=n(5)(!1)).push([e.i,"\n  .VJoGQvmonbDCV3wHF7sHL {\n    font-family: Open Sans, sans-serif;\n    font-size: 14px;\n  }\n\n  ._9B0GX6LCiEUSyWryJdr- {\n    width: 100%;\n    height: 100%;\n    box-sizing: border-box;\n    overflow-y: auto;\n    background: #ffffff;\n    border: 1px solid #c3c2cf;\n    border-radius: 4px;\n    padding: 8px 7px;\n  }\n\n  ._2C1BcEOhYfmwgdcN5dYQT_ {\n    display: inline-block;\n    margin: 2px 4px;\n    padding: 0 10px;\n    font-style: normal;\n    font-weight: normal;\n    line-height: 24px;\n    text-align: right;\n    color: #050038;\n  }\n  ._1I_qY_l9WknjFI9kuqUq60 {\n    margin-left: 8px;\n    cursor: pointer;\n    font-size: 12px;\n  }\n  ._1pRwVBqmpReENc0ViM_iW- {\n    border-radius: 100px;\n    background: rgba(102, 153, 255, 0.2);\n  }\n  ._214j1aRdfa-5IKr8XM3G4h {\n    background: #ffffff;\n  }\n\n  ._1QNGeiLVV0wlGIMM7PQhVi {\n    border: none;\n    padding-left: 8px;\n    text-align: left;\n  }\n  ._1QNGeiLVV0wlGIMM7PQhVi::-webkit-input-placeholder {\n    text-align: left;\n    color: #c3c2cf;\n  }\n  ._1QNGeiLVV0wlGIMM7PQhVi::-moz-placeholder {\n    text-align: left;\n    color: #c3c2cf;\n  }\n  ._1QNGeiLVV0wlGIMM7PQhVi:-ms-input-placeholder {\n    text-align: left;\n    color: #c3c2cf;\n  }\n  ._1QNGeiLVV0wlGIMM7PQhVi:focus {\n    box-shadow: none;\n    border: none;\n    outline: none;\n    text-align: left;\n  }\n",""]),t.locals={fontFamily:"VJoGQvmonbDCV3wHF7sHL",emailsInput:"_9B0GX6LCiEUSyWryJdr-",email:"_2C1BcEOhYfmwgdcN5dYQT_ VJoGQvmonbDCV3wHF7sHL",delete:"_1I_qY_l9WknjFI9kuqUq60",emailStateValid:"_1pRwVBqmpReENc0ViM_iW- _2C1BcEOhYfmwgdcN5dYQT_ VJoGQvmonbDCV3wHF7sHL",emailStateInvalid:"_214j1aRdfa-5IKr8XM3G4h _2C1BcEOhYfmwgdcN5dYQT_ VJoGQvmonbDCV3wHF7sHL",input:"_1QNGeiLVV0wlGIMM7PQhVi _2C1BcEOhYfmwgdcN5dYQT_ VJoGQvmonbDCV3wHF7sHL"},e.exports=t},,,,,function(e,t,n){"use strict";n.r(t),n.d(t,"COMPLETE_INPUT",(function(){return c})),n.d(t,"DELETE_EMAIL_NODE",(function(){return l})),n.d(t,"EmailsInput",(function(){return d}));var i=n(6),r=n(0),o=n(2),a=n(3),s=n(1);Object(i.a)();var c="emails-input--complete-input-node",l="emails-input--delete-email-node",u=function(){function e(t,n){void 0===n&&(n={}),this.emailsChangeObservers=new Set,e._validateFirstArgument(t),e._validateSecondArgument(n),this.emailList=[],this.eventListenersMap={},this.destroyed=!1,this.containerNode=t,this.containerNode.innerHTML="",this.rootNode=document.createElement("div"),t.appendChild(this.rootNode),this._addInputNode(),this._applyConfig(n),this.rootNode.classList.add(r.a.emailsInput),this._setEventListeners()}return e._throwError=function(e){throw new Error("EmailsInput : "+e)},e._validateFirstArgument=function(t){t instanceof HTMLElement||e._throwError("constructor expects HTMLElement as the first argument")},e._validateSecondArgument=function(t){t instanceof Object||e._throwError("constructor expects Object as the second argument");var n=t.defaultEmails,i=t.maxHeight,r=t.minHeight;(void 0!==n&&!Array.isArray(n)||Array.isArray(n)&&(null==n?void 0:n.length)>0&&(null==n?void 0:n.filter((function(e){return"string"!=typeof e})).length)>0)&&e._throwError("config.defaultEmails should be a type of string[]"),void 0!==i&&"string"!=typeof i&&e._throwError("config.maxHeight should be a type of string"),void 0!==r&&"string"!=typeof r&&e._throwError("config.minHeight should be a type of string")},e.prototype._addInputNode=function(){this.rootNode.appendChild(a.a.create())},e.prototype._fireOnEmailsChange=function(){var e=this;this.emailsChangeObservers.forEach((function(t){t.call(null,e.emailList)}))},e.prototype._dispatchCompleteInput=function(e){var t=new CustomEvent(c,{bubbles:!0});return e.dispatchEvent(t)},e.prototype._dispatchDeleteEmailNode=function(e){var t=e.target,n=new CustomEvent(l,{bubbles:!0});return t.dispatchEvent(n)},e.prototype._convertInputToNode=function(e){var t,n=e.target,i=null===(t=n.value)||void 0===t?void 0:t.replace(/,/g,"");if(i){var r=o.a.create(i).div;n.parentNode.insertBefore(r,n),this.emailList.push(i),n.value="",this._fireOnEmailsChange()}},e.prototype._deleteTargetEmail=function(e){var t=e.target.parentElement,n=t.getAttribute("data-email"),i=this.emailList.indexOf(n);i>=0&&this.emailList.splice(i,1),t.parentElement.removeChild(t),this._fireOnEmailsChange()},e.prototype._onKeyUp=function(e){var t=e.key||e.keyCode;"Enter"!==t&&13!==t&&","!==t&&188!==t||this._dispatchCompleteInput(e.target)},e.prototype._onFocusout=function(e){this._dispatchCompleteInput(e.target)},e.prototype._onClick=function(e){var t=e.target;o.a.isDeleteButton(t)&&this._dispatchDeleteEmailNode(e)},e.prototype._onPaste=function(e){var t=this;e.preventDefault();var n=(e.clipboardData||window.clipboardData).getData("text"),i=Object(s.b)(n),r=this.rootNode.lastChild;i.length<2?i[0]&&(r.value=i[0]):i.forEach((function(e){var n=o.a.create(e),i=n.div,a=n.email;t.rootNode.insertBefore(i,r),t.emailList.push(a)}))},e.prototype._setEventListeners=function(){this.eventListenersMap.keyup=this._onKeyUp.bind(this),this.eventListenersMap.focusout=this._onFocusout.bind(this),this.eventListenersMap[c]=this._convertInputToNode.bind(this),this.eventListenersMap.click=this._onClick.bind(this),this.eventListenersMap[l]=this._deleteTargetEmail.bind(this),this.eventListenersMap.paste=this._onPaste.bind(this),this.rootNode.addEventListener("keyup",this.eventListenersMap.keyup),this.rootNode.addEventListener("focusout",this.eventListenersMap.focusout),this.rootNode.addEventListener(c,this.eventListenersMap[c]),this.rootNode.addEventListener("click",this.eventListenersMap.click),this.rootNode.addEventListener(l,this.eventListenersMap[l]),this.rootNode.addEventListener("paste",this.eventListenersMap.paste,!0)},e.prototype._removeEventListeners=function(){this.rootNode.removeEventListener("paste",this.eventListenersMap.paste,!0),this.rootNode.removeEventListener(l,this.eventListenersMap[l]),this.rootNode.removeEventListener("click",this.eventListenersMap.click),this.rootNode.removeEventListener(c,this.eventListenersMap[c]),this.rootNode.removeEventListener("focusout",this.eventListenersMap.focusout),this.rootNode.removeEventListener("keyup",this.eventListenersMap.keyup)},e._validateIncomingEmails=function(t){Array.isArray(t)&&!t.filter((function(e){return"string"!=typeof e}))[0]||e._throwError("setEmails method expects an array of strings as an argument")},e.prototype._clearChildren=function(){this.rootNode.innerHTML=""},e.prototype._applyConfig=function(e){var t=e.defaultEmails,n=e.maxHeight,i=e.minHeight;t&&this.setEmails(t),n&&(this.rootNode.style.maxHeight=n),i&&(this.rootNode.style.minHeight=i)},e.prototype.getEmails=function(){return Array.apply({},this.emailList)},e.prototype.setEmails=function(t){var n=this;this.destroyed||(e._validateIncomingEmails(t),this._clearChildren(),this.emailList=[],t.forEach((function(e){var t=o.a.create(e),i=t.div,r=t.email;n.rootNode.appendChild(i),n.emailList.push(r)})),this.rootNode.appendChild(a.a.create()),this._fireOnEmailsChange())},e.prototype.onEmailsChange=function(t){var n=this;return Object(s.a)(t)||e._throwError("onEmailsChange method expects a function as an argument"),this.emailsChangeObservers.add(t),function(){n.emailsChangeObservers.delete(t)}},e.prototype.isEmailValid=function(e){return Object(s.c)(e)},e.prototype.destroy=function(){return!this.destroyed&&(this.destroyed=!0,this._removeEventListeners(),this.emailsChangeObservers.clear(),this.containerNode.innerHTML="",this.emailList=[],!0)},e}();function d(e,t){void 0===t&&(t={});var n=new u(e,t);return{getEmails:n.getEmails.bind(n),setEmails:n.setEmails.bind(n),destroy:n.destroy.bind(n),isEmailValid:n.isEmailValid.bind(n),onEmailsChange:n.onEmailsChange.bind(n)}}window.EmailsInputClass=d}]);