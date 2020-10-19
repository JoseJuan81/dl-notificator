/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Notificator.js":
/*!****************************!*\
  !*** ./src/Notificator.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nclass Notification {\n  /*\n  * @params {object} opts - opciones\n  * @params {number} opts.duration - duración animación. por defecto 4000 (ms)\n  * @params {string} opts.error - color para mensajes de error\n  * @params {string} opts.info - color para mensajes de información\n  * @params {boolean} opts.left - lado por el que aparece la notificación. Por defecto false porque se muestra por la derecha\n  * @params {string} opts.success - color para mensajes de éxito\n  * @params {number} opts.top - valor de desfase de la primera notificación respecto a la ventana del navegador. Por defecto es 1 (rem);\n  * @params {string} opts.warning - color para mensajes de advertencia\n  */\n    constructor(opts = {}) {\n\t\t\tconst { duration, error, info, left, success, top, warning, zIndex } = opts;\n\t\t\tthis.uuid = Math.random().toString(32).slice(2);\n\t\t\tthis.top = top;\n\t\t\t/**\n\t\t\t * contenedor principal agregado en el body\n\t\t\t */\n      const mainNotificationContainer = document.createElement('div');\n\t\t\tmainNotificationContainer.classList.add(`notification-container-${this.uuid}`);\n      const [body] = document.getElementsByTagName('body');\n\t\t\tbody.appendChild(mainNotificationContainer);\n\n\t\t\t/**\n\t\t\t * Configurar y agregar estilos en el headc\n\t\t\t */\n      const showingSide = left ? 'left:0' : 'right:0'\n      var style = document.createElement('style');\n      style.innerHTML = `\n      .notification-container-${this.uuid} {\n        position: fixed;\n\t\t\t\t${showingSide};\n\t\t\t\ttop: ${this.top || 10}px;\n        width: fit-content;\n        z-index: ${zIndex || 999}\n      }\n      .notification-${this.uuid} {\n        animation-name: entering-${this.uuid};\n        border-radius: 5px;\n        color: white;\n        margin: 0.5rem 1rem;\n        max-width: 15rem;\n        min-width: 12rem;\n        padding: 1rem;\n      }\n      @keyframes entering-${this.uuid} {\n        0% {\n            transform: translateX(${left ? -20 : 20}rem);\n            opacity: 0;\n        }\n        5% {\n          transform: translateX(${left ? 3.5 : -3.5}rem);\n          opacity: 1\n        }\n        10% {\n          transform: translateX(${left ? 0.25 : -0.25}rem);\n        }\n        90% {\n          transform: translateX(${left ? 0.25 : -0.25}rem);\n        }\n        95% {\n          transform: translateX(${left ? 3.5 : -3.5}rem);\n        }\n        100% {\n            transform: translateX(${left ? -20 : 20}rem);\n        }\n      }\n      `;\n      document.head.appendChild(style);\n\n      this.container = mainNotificationContainer;\n      this.duration = duration || 4000;\n      this.errorColor = error || 'red';\n      this.infoColor = info || 'blue';\n      this.successColor = success || 'green';\n\t\t\tthis.warningColor = warning || 'orange';\n  }\n\n\t/**\n\t *\n\t * @param {string} message - Mensaje a mostrar en la notificación\n\t * @param {string} color - Color a usar en la notificación\n\t * @param {time} time - Tiempo de duración de la notificación\n\t */\n  add(message, color, time) {\n    const { firstChild } = this.container;\n    const div = this.createNotificationContainer(message, color, time);\n    this.container.insertBefore(div, firstChild);\n\t}\n\n  createNotificationContainer(message, color, time) {\n    const div = document.createElement('div');\n    div.addEventListener('animationend', this.removeIt.bind(this, div));\n    div.style.animationDuration = `${time}ms`;\n\t\tdiv.style.backgroundColor = color;\n\t\tdiv.style.color = 'white';\n    div.innerText = message;\n    div.classList.add(`notification-${this.uuid}`);\n    return div;\n\t}\n\n\t/**\n\t *\n\t * @param {string} message - Mensaje de error a mostrar.\n\t * @param {string | null} errorColor - Color de la notificación. Si no existe se usa el color por defecto.\n\t * @param {number} time - tiempo de duración de la notificación. Si no existe se usa la duración por defecto.\n\t */\n  error({ message, color, time }) {\n\t\tconst errorColor = color || this.errorColor;\n\t\tconst errorTime = time || this.duration;\n    this.add(message, errorColor, errorTime);\n\t}\n\n\t/**\n\t *\n\t * @param {string} message - Mensaje de información a mostrar.\n\t * @param {string | null} infoColor - Color de la notificación. Si no existe se usa el color por defecto.\n\t * @param {number} time - tiempo de duración de la notificación. Si no existe se usa la duración por defecto.\n\t */\n  info({ message, color, time }) {\n\t\tconst infoColor = color || this.infoColor;\n\t\tconst infoTime = time || this.duration;\n    this.add(message, infoColor, infoTime);\n\t}\n  removeIt(el) {\n    this.container.removeChild(el);\n\t}\n\n\t/**\n\t *\n\t * @param {string} message - Mensaje de éxito a mostrar.\n\t * @param {string | null} successColor - Color de la notificación. Si no existe se usa el color por defecto.\n\t * @param {number} time - tiempo de duración en `ms` de la notificación. Si no existe se usa la duración por defecto.\n\t */\n  success({ message, color, time }) {\n\t\tconst successColor = color || this.successColor;\n\t\tconst successTime = time || this.duration;\n    this.add(message, successColor, successTime);\n\t}\n\n\t/**\n\t *\n\t * @param {string} message - Mensaje de advertencia a mostrar.\n\t * @param {string | null} infoColor - Color de la notificación. Si no existe se usa el color por defecto.\n\t * @param {number} time - tiempo de duración de la notificación. Si no existe se usa la duración por defecto.\n\t */\n  warning({ message, color, time }) {\n\t\tconst warningColor = color || this.warningColor;\n\t\tconst warningTime = time || this.duration;\n    this.add(message, warningColor, warningTime);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Notification);\n\n\n//# sourceURL=webpack://notificator/./src/Notificator.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Notificator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Notificator */ \"./src/Notificator.js\");\n\n\nconst rightNotification = new _Notificator__WEBPACK_IMPORTED_MODULE_0__.default();\nconst leftNotification = new _Notificator__WEBPACK_IMPORTED_MODULE_0__.default({\n\tleft: true,\n});\n\nwindow.addEventListener('load', () => {\n\tconst successRightDefault = document.getElementById('success-right-default');\n\tconst successRightTimeColor = document.getElementById('success-right-time-color');\n\tconst infoRightColor = document.getElementById('info-right-color');\n\tconst errorLeftTimeColor = document.getElementById('error-left-time-color');\n\n\tsuccessRightDefault.addEventListener('click', () => {\n\t\trightNotification.success({\n\t\t\tmessage: 'Notificación de éxito con tiempo por defecto de 4 segundos',\n\t\t})\n\t})\n\tsuccessRightTimeColor.addEventListener('click', () => {\n\t\trightNotification.success({\n\t\t\tmessage: 'Notificación de éxito con tiempo de 2 segundos y otro color',\n\t\t\ttime: 2000,\n\t\t\tcolor: '#5FAD56',\n\t\t})\n\t})\n\tinfoRightColor.addEventListener('click', () => {\n\t\trightNotification.info({\n\t\t\tmessage: 'Notificación de información con tiempo por defecto y otro color',\n\t\t\tcolor: '#57B8FF',\n\t\t})\n\t})\n\terrorLeftTimeColor.addEventListener('click', () => {\n\t\tleftNotification.info({\n\t\t\tcolor: '#D00000',\n\t\t\tmessage: 'Notificación de error con tiempo de 2.6 seg y otro color',\n\t\t\ttime: 2600,\n\t\t})\n\t})\n})\n\n\n//# sourceURL=webpack://notificator/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;