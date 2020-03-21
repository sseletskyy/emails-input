/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/emails-input/emails-input.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/astroturf/css-loader.js!./src/emails-input/styles-styles.css":
/*!***********************************************************************************!*\
  !*** ./node_modules/astroturf/css-loader.js!./src/emails-input/styles-styles.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n  .VJoGQvmonbDCV3wHF7sHL {\n    font-family: Open Sans, sans-serif;\n  }\n\n  ._9B0GX6LCiEUSyWryJdr- {\n    width: 100%;\n    min-height: 96px;\n    max-height: 180px;\n    overflow-y: auto;\n    background: #ffffff;\n    border: 1px solid #c3c2cf;\n    box-sizing: border-box;\n    border-radius: 4px;\n    padding: 8px 7px;\n  }\n\n  ._2C1BcEOhYfmwgdcN5dYQT_ {\n    display: inline-block;\n    margin: 2px 0;\n    padding: 5px 10px 5px 12px;\n    font-style: normal;\n    font-weight: normal;\n    font-size: 14px;\n    line-height: 24px;\n    text-align: right;\n    color: #050038;\n  }\n  ._1I_qY_l9WknjFI9kuqUq60 {\n    margin-left: 8px;\n    cursor: pointer;\n  }\n  ._1pRwVBqmpReENc0ViM_iW- {\n    border-radius: 100px;\n    background: rgba(102, 153, 255, 0.2);\n  }\n  ._214j1aRdfa-5IKr8XM3G4h {\n    background: #ffffff;\n  }\n\n  ._1QNGeiLVV0wlGIMM7PQhVi {\n    border: none;\n    padding-left: 8px;\n    text-align: left;\n  }\n  ._1QNGeiLVV0wlGIMM7PQhVi::-webkit-input-placeholder {\n    text-align: left;\n    color: #c3c2cf;\n  }\n  ._1QNGeiLVV0wlGIMM7PQhVi::-moz-placeholder {\n    text-align: left;\n    color: #c3c2cf;\n  }\n  ._1QNGeiLVV0wlGIMM7PQhVi:-ms-input-placeholder {\n    text-align: left;\n    color: #c3c2cf;\n  }\n  ._1QNGeiLVV0wlGIMM7PQhVi:focus {\n    box-shadow: none;\n    border: none;\n    outline: none;\n    text-align: left;\n  }\n", ""]);
// Exports
exports.locals = {
	"fontFamily": "VJoGQvmonbDCV3wHF7sHL",
	"emailsInput": "_9B0GX6LCiEUSyWryJdr-",
	"email": "_2C1BcEOhYfmwgdcN5dYQT_ VJoGQvmonbDCV3wHF7sHL",
	"delete": "_1I_qY_l9WknjFI9kuqUq60",
	"emailStateValid": "_1pRwVBqmpReENc0ViM_iW- _2C1BcEOhYfmwgdcN5dYQT_ VJoGQvmonbDCV3wHF7sHL",
	"emailStateInvalid": "_214j1aRdfa-5IKr8XM3G4h _2C1BcEOhYfmwgdcN5dYQT_ VJoGQvmonbDCV3wHF7sHL",
	"input": "_1QNGeiLVV0wlGIMM7PQhVi _2C1BcEOhYfmwgdcN5dYQT_ VJoGQvmonbDCV3wHF7sHL"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/emails-input/email-node.ts":
/*!****************************************!*\
  !*** ./src/emails-input/email-node.ts ***!
  \****************************************/
/*! exports provided: EmailNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailNode", function() { return EmailNode; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/emails-input/utils.ts");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ "./src/emails-input/styles.ts");


var EmailNodeFn = function () {
    var _validateString = function (email) {
        if (typeof email !== 'string') {
            throw new Error('EmailNode : create method expects a string as an argument');
        }
    };
    /**
     * generates a new html element
     * parent component should be responsible for appending to DOM
     * and adding event listeners
     * returns an object with keys div: HTMLDivElement, email: string
     * email can be used in parent component to update the email list
     */
    var create = function (email) {
        // TODO optimise creation with a template to be cloned
        _validateString(email);
        // remove trailing comma
        var noEndingComma = email.split(',')[0];
        var div = document.createElement('div');
        var t = document.createTextNode(noEndingComma);
        div.appendChild(t);
        // check email and decide which css class to use
        var isValid = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["validateEmail"])(noEndingComma);
        var stateClass = isValid ? 'emailStateValid' : 'emailStateInvalid';
        div.className = _styles__WEBPACK_IMPORTED_MODULE_1__["default"][stateClass];
        // set data attributes for re-usage
        div.setAttribute('data-email', noEndingComma);
        div.setAttribute('data-valid', String(isValid));
        var span = document.createElement('span');
        span.innerHTML = '&#10005';
        span.className = _styles__WEBPACK_IMPORTED_MODULE_1__["default"].delete;
        div.appendChild(span);
        return { div: div, email: noEndingComma };
    };
    /**
     * helps to check if clicked element is indeed a delete btn (<span> X </span>)
     * is used in the parent component, cause parent is responsible for handling events
     */
    var isDeleteButton = function (target) {
        return target.tagName.toLowerCase() === 'span' &&
            target.classList.contains(_styles__WEBPACK_IMPORTED_MODULE_1__["default"].delete);
    };
    return {
        create: create,
        isDeleteButton: isDeleteButton,
    };
};
var EmailNode = EmailNodeFn();


/***/ }),

/***/ "./src/emails-input/emails-input.ts":
/*!******************************************!*\
  !*** ./src/emails-input/emails-input.ts ***!
  \******************************************/
/*! exports provided: COMPLETE_INPUT, DELETE_EMAIL_NODE, EmailsInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPLETE_INPUT", function() { return COMPLETE_INPUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_EMAIL_NODE", function() { return DELETE_EMAIL_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailsInput", function() { return EmailsInput; });
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills */ "./src/emails-input/polyfills.ts");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ "./src/emails-input/styles.ts");
/* harmony import */ var _email_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./email-node */ "./src/emails-input/email-node.ts");
/* harmony import */ var _input_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./input-node */ "./src/emails-input/input-node.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/emails-input/utils.ts");





Object(_polyfills__WEBPACK_IMPORTED_MODULE_0__["default"])(); // support IE11
// custom events
var COMPLETE_INPUT = 'emails-input--complete-input-node';
var DELETE_EMAIL_NODE = 'emails-input--delete-email-node';
function EmailsInput(containerNode) {
    var emailList;
    var _constructor = function () {
        emailList = [];
        // set style to container
        containerNode.classList.add(_styles__WEBPACK_IMPORTED_MODULE_1__["default"].emailsInput);
        _addInputNode();
        _setEventListeners();
    };
    var _addInputNode = function () {
        containerNode.appendChild(_input_node__WEBPACK_IMPORTED_MODULE_3__["InputNode"].create());
    };
    var getEmails = function () {
        // return a cloned array, no way to impact on the list outside
        return Array.apply({}, emailList);
    };
    var _dispatchCompleteInput = function (target) {
        var customEvent = new CustomEvent(COMPLETE_INPUT, {
            bubbles: true,
        });
        return target.dispatchEvent(customEvent);
    };
    var _dispatchDeleteEmailNode = function (event) {
        var targetSpan = event.target;
        var customEvent = new CustomEvent(DELETE_EMAIL_NODE, {
            bubbles: true,
        });
        return targetSpan.dispatchEvent(customEvent);
    };
    // this is a listener of the custom event COMPLETE_INPUT
    var _convertInputToNode = function (event) {
        var _a;
        // console.log('CustomEventListener :: ', event);
        var target = event.target;
        var email = (_a = target.value) === null || _a === void 0 ? void 0 : _a.replace(/,/g, '');
        // early return if email is empty or just comma
        if (!email) {
            // do nothing;
            return;
        }
        // create new email node and add it before input
        var newEmailNode = _email_node__WEBPACK_IMPORTED_MODULE_2__["EmailNode"].create(email).div;
        target.parentNode.insertBefore(newEmailNode, target);
        // add email to local list
        emailList.push(email);
        // clean un value in input
        target.value = '';
    };
    var _deleteTargetEmail = function (event) {
        var target = event.target;
        var emailNode = target.parentElement;
        // remove email from emailList
        var email = emailNode.getAttribute('data-email');
        var emailIndex = emailList.indexOf(email);
        if (emailIndex >= 0) {
            emailList.splice(emailIndex, 1);
        }
        // remove email node; IE11 does not support .remove method; so using removeChild instead
        emailNode.parentElement.removeChild(emailNode);
    };
    var _onKeyUp = function (event) {
        // keyCode and comparison with numbers are for backward compatibility with IE
        // noinspection JSDeprecatedSymbols
        var key = event.key || event.keyCode;
        if (key === 'Enter' || key === 13 || key === ',' || key === 188) {
            _dispatchCompleteInput(event.target);
        }
    };
    var _onFocusout = function (event) {
        _dispatchCompleteInput(event.target);
    };
    var _onClick = function (event) {
        // call custom event only if clicked on cross character in email-node
        var target = event.target;
        if (_email_node__WEBPACK_IMPORTED_MODULE_2__["EmailNode"].isDeleteButton(target)) {
            _dispatchDeleteEmailNode(event);
        }
    };
    // this method is not covered with tests cause js-dom does not support ClipboardEvent
    // so the logic of parsing is moved to utils :: parsePastedText and covered with unit tests
    var _onPaste = function (event) {
        event.preventDefault();
        // @ts-ignore
        var text = (event.clipboardData || window.clipboardData).getData('text');
        var parsed = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["parsePastedText"])(text);
        var input = containerNode.lastChild;
        // if only one email in clipboard then put the value in input
        if (parsed.length < 2) {
            parsed[0] && (input.value = parsed[0]);
            return;
        }
        // otherwise add them all immediately
        // add new emails without re-rendering existing ones
        parsed.forEach(function (item) {
            var _a = _email_node__WEBPACK_IMPORTED_MODULE_2__["EmailNode"].create(item), div = _a.div, email = _a.email;
            containerNode.insertBefore(div, input);
            // add email to local list
            emailList.push(email);
        });
        // const selection = window.getSelection();
        // if (!selection.rangeCount) return false;
        // selection.deleteFromDocument();
        // selection.getRangeAt(0).insertNode(document.createTextNode(paste));
        //
        // event.preventDefault();
    };
    var _setEventListeners = function () {
        // keyup -> _onKeyUp -> if (comma|Enter) -> _dispatchCompleteInput -> _convertInputToNode
        containerNode.addEventListener('keyup', _onKeyUp);
        // focusout -> _onFocusout -> _dispatchCompleteInput -> _convertInputToNode
        containerNode.addEventListener('focusout', _onFocusout);
        containerNode.addEventListener(COMPLETE_INPUT, _convertInputToNode);
        // click -> _onClick -> check it is a delete element -> _dispatchDeleteEmailNode -> _deleteTargetEmail
        containerNode.addEventListener('click', _onClick);
        containerNode.addEventListener(DELETE_EMAIL_NODE, _deleteTargetEmail);
        // clipboard
        containerNode.addEventListener('paste', _onPaste, true);
    };
    var _validateIncomingEmails = function (emails) {
        if (!Array.isArray(emails) ||
            emails.filter(function (email) { return typeof email !== 'string'; })[0]) {
            throw new Error('EmailsInput : setEmails method expects an array of strings as an argument');
        }
    };
    var _clearChildren = function () {
        containerNode.innerHTML = '';
    };
    var setEmails = function (emails) {
        _validateIncomingEmails(emails);
        _clearChildren();
        emailList = [];
        emails.forEach(function (email) {
            var _a = _email_node__WEBPACK_IMPORTED_MODULE_2__["EmailNode"].create(email), item = _a.div, finalEmailString = _a.email;
            containerNode.appendChild(item);
            // add the same email string (as it is in email node) to emailList
            emailList.push(finalEmailString);
        });
        containerNode
            .appendChild(_input_node__WEBPACK_IMPORTED_MODULE_3__["InputNode"].create())
            .scrollIntoView();
    };
    // call constructor before returning API
    _constructor();
    return {
        getEmails: getEmails,
        setEmails: setEmails,
        isEmailValid: _utils__WEBPACK_IMPORTED_MODULE_4__["validateEmail"],
    };
}
// @ts-ignore
window['EmailsInput'] = EmailsInput;


/***/ }),

/***/ "./src/emails-input/input-node.ts":
/*!****************************************!*\
  !*** ./src/emails-input/input-node.ts ***!
  \****************************************/
/*! exports provided: InputNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputNode", function() { return InputNode; });
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles */ "./src/emails-input/styles.ts");
// @ts-ignore

var InputNodeFn = function () {
    var create = function () {
        // TODO optimise creation with a template to be cloned
        var input = document.createElement('input');
        input.placeholder = 'add more people...';
        input.className = _styles__WEBPACK_IMPORTED_MODULE_0__["default"].input;
        return input;
    };
    return {
        create: create,
    };
};
var InputNode = InputNodeFn();


/***/ }),

/***/ "./src/emails-input/polyfills.ts":
/*!***************************************!*\
  !*** ./src/emails-input/polyfills.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return main; });
function main() {
    if (typeof window.CustomEvent === 'function')
        return false;
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    // @ts-ignore
    window.CustomEvent = CustomEvent;
}


/***/ }),

/***/ "./src/emails-input/styles-styles.css":
/*!********************************************!*\
  !*** ./src/emails-input/styles-styles.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/astroturf/css-loader.js!./styles-styles.css */ "./node_modules/astroturf/css-loader.js!./src/emails-input/styles-styles.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./src/emails-input/styles.ts":
/*!************************************!*\
  !*** ./src/emails-input/styles.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var styles = __webpack_require__(/*! ./styles-styles.css */ "./src/emails-input/styles-styles.css");
/* harmony default export */ __webpack_exports__["default"] = (styles);


/***/ }),

/***/ "./src/emails-input/utils.ts":
/*!***********************************!*\
  !*** ./src/emails-input/utils.ts ***!
  \***********************************/
/*! exports provided: validateEmail, parsePastedText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateEmail", function() { return validateEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePastedText", function() { return parsePastedText; });
var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
/**
 * Returns true of email is considered a valid email address
 * @param email String
 * @return boolean
 */
var validateEmail = function (email) {
    return EMAIL_REGEX.test(email);
};
var parsePastedText = function (text) {
    var ary = text.split(',');
    return ary.reduce(function (acc, next) {
        var email = next.trim();
        var angleBrackets = email.match(/<([^>]*)>/);
        if (angleBrackets && angleBrackets[1]) {
            email = angleBrackets[1].trim();
        }
        if (!!email) {
            acc.push(email);
        }
        return acc;
    }, []);
};


/***/ })

/******/ });
//# sourceMappingURL=emails-input.bundle.js.map