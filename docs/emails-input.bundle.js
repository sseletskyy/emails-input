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
        var stateClass = isValid ? 'email--state-valid' : 'email--state-invalid';
        div.className = "email " + stateClass;
        // set data attributes for re-usage
        div.setAttribute('data-email', noEndingComma);
        div.setAttribute('data-valid', String(isValid));
        var span = document.createElement('span');
        span.innerHTML = '&#10005';
        span.className = 'delete';
        div.appendChild(span);
        return { div: div, email: noEndingComma };
    };
    /**
     * helps to check if clicked element is indeed a delete btn (<span> X </span>)
     * is used in the parent component, cause parent is responsible for handling events
     */
    var isDeleteButton = function (target) {
        return target.tagName.toLowerCase() === 'span' &&
            target.classList.contains('delete');
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
/* harmony import */ var _email_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./email-node */ "./src/emails-input/email-node.ts");
/* harmony import */ var _input_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input-node */ "./src/emails-input/input-node.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/emails-input/utils.ts");




Object(_polyfills__WEBPACK_IMPORTED_MODULE_0__["default"])(); // support IE11
// custom events
var COMPLETE_INPUT = 'emails-input--complete-input-node';
var DELETE_EMAIL_NODE = 'emails-input--delete-email-node';
function EmailsInput(containerNode) {
    var emailList;
    var _constructor = function () {
        emailList = [];
        _addInputNode();
        _setEventListeners();
    };
    var _addInputNode = function () {
        containerNode.appendChild(_input_node__WEBPACK_IMPORTED_MODULE_2__["InputNode"].create());
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
        // console.log('CustomEventListener :: ', event);
        var target = event.target;
        var email = target.value.replace(/,/g, '');
        // early return if email is empty or just comma
        if (!email) {
            // do nothing;
            return;
        }
        // create new email node and add it before input
        var newEmailNode = _email_node__WEBPACK_IMPORTED_MODULE_1__["EmailNode"].create(email).div;
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
        // remove email node
        target.parentElement.remove();
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
        if (_email_node__WEBPACK_IMPORTED_MODULE_1__["EmailNode"].isDeleteButton(target)) {
            _dispatchDeleteEmailNode(event);
        }
    };
    // this method is not covered with tests cause js-dom does not support ClipboardEvent
    // so the logic of parsing is moved to utils :: parsePastedText and covered with unit tests
    var _onPaste = function (event) {
        event.preventDefault();
        // @ts-ignore
        var text = (event.clipboardData || window.clipboardData).getData('text');
        var parsed = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parsePastedText"])(text);
        var input = containerNode.lastChild;
        // if only one email in clipboard then put the value in input
        if (parsed.length < 2) {
            parsed[0] && (input.value = parsed[0]);
            return;
        }
        // otherwise add them all immediately
        // add new emails without re-rendering existing ones
        parsed.forEach(function (item) {
            var _a = _email_node__WEBPACK_IMPORTED_MODULE_1__["EmailNode"].create(item), div = _a.div, email = _a.email;
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
            var _a = _email_node__WEBPACK_IMPORTED_MODULE_1__["EmailNode"].create(email), item = _a.div, finalEmailString = _a.email;
            containerNode.appendChild(item);
            // add the same email string (as it is in email node) to emailList
            emailList.push(finalEmailString);
        });
        containerNode
            .appendChild(_input_node__WEBPACK_IMPORTED_MODULE_2__["InputNode"].create())
            .scrollIntoView();
    };
    // call constructor before returning API
    _constructor();
    return {
        getEmails: getEmails,
        setEmails: setEmails,
        isEmailValid: _utils__WEBPACK_IMPORTED_MODULE_3__["validateEmail"],
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
var InputNodeFn = function () {
    var create = function () {
        // TODO optimise creation with a template to be cloned
        var input = document.createElement('input');
        input.placeholder = 'add more people...';
        input.className = 'email email--state-input';
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