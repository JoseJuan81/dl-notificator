import { setNewProperty, mergeObjects } from 'functionallibrary';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Notification = /*#__PURE__*/function () {
  /*
  * @params {object} opts - opciones
  * @params {number} opts.duration - duración animación. por defecto 4000 (ms)
  * @params {object} opts.errorOptions - opciones de configuración para notificación de error
  * @params {object} opts.infoOptions - opciones de configuración para notificación de información
  * @params {boolean} opts.left - lado por el que aparece la notificación. Por defecto false porque se muestra por la derecha
  * @params {object} opts.success - opciones de configuración para notificación de éxito
  * @params {number} opts.top - valor de desfase de la primera notificación respecto a la ventana del navegador. Por defecto es 1 (rem);
  * @params {object} opts.warning - opciones de configuración para notificación de advertencia
  */
  function Notification() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Notification);

    var duration = opts.duration,
        errorOptions = opts.errorOptions,
        infoOptions = opts.infoOptions,
        left = opts.left,
        successOptions = opts.successOptions,
        top = opts.top,
        warningOptions = opts.warningOptions,
        zIndex = opts.zIndex;

    var _ref = errorOptions || {},
        errorBg = _ref.backgroundColor,
        errorColor = _ref.color,
        errorTime = _ref.duration,
        errorClose = _ref.closeBtn;

    var _ref2 = infoOptions || {},
        infoBg = _ref2.backgroundColor,
        infoColor = _ref2.color,
        infoTime = _ref2.duration,
        infoClose = _ref2.closeBtn;

    var _ref3 = successOptions || {},
        successBg = _ref3.backgroundColor,
        successColor = _ref3.color,
        successTime = _ref3.duration,
        successClose = _ref3.closeBtn;

    var _ref4 = warningOptions || {},
        warningBg = _ref4.backgroundColor,
        warningColor = _ref4.color,
        warningTime = _ref4.duration,
        warningClose = _ref4.closeBtn;
    /**
     * Identificador único de cada instancia generada
     */


    this.uuid = Math.random().toString(32).slice(2);
    this.top = top;
    /**
     * contenedor principal agregado en el body
     */

    var mainNotificationContainer = document.createElement('div');
    mainNotificationContainer.classList.add("notification-container-".concat(this.uuid));

    var _document$getElements = document.getElementsByTagName('body'),
        _document$getElements2 = _slicedToArray(_document$getElements, 1),
        body = _document$getElements2[0];

    body.appendChild(mainNotificationContainer);
    /**
     * Configurar y agregar estilos en el head
     */

    var showingSide = left ? 'left:0' : 'right:0';
    var style = document.createElement('style');
    style.innerHTML = "\n      .notification-container-".concat(this.uuid, " {\n        position: fixed;\n\t\t\t\t").concat(showingSide, ";\n\t\t\t\ttop: ").concat(this.top || 10, "px;\n        width: fit-content;\n        z-index: ").concat(zIndex || 999, "\n      }\n      .notification-").concat(this.uuid, " {\n        animation-name: entering-").concat(this.uuid, ";\n        border-radius: 5px;\n        color: white;\n        margin: 0.5rem 1rem;\n        max-width: 15rem;\n        min-width: 12rem;\n\t\t\t\tpadding: 1rem;\n\t\t\t\tposition: relative;\n\t\t\t}\n      @keyframes entering-").concat(this.uuid, " {\n        0% {\n            transform: translateX(").concat(left ? -150 : 150, "%);\n        }\n        50% {\n          transform: translateX(").concat(left ? 15 : -15, "%);\n        }\n        100% {\n          transform: translateX(").concat(left ? 1 : -1, "%);\n        }\n\t\t\t}\n\t\t\t@keyframes active-").concat(this.uuid, " {\n\t\t\t\tfrom {\n\t\t\t\t\ttransform: translateX(").concat(left ? 1 : -1, "%);\n\t\t\t\t}\n\t\t\t\tto {\n\t\t\t\t\ttransform: translateX(").concat(left ? 1 : -1, "%);\n\t\t\t\t}\n\t\t\t}\n\t\t\t@keyframes outgoing-").concat(this.uuid, " {\n\t\t\t\t0% {\n\t\t\t\t\ttransform: translateX(").concat(left ? 1 : -1, "%);\n\t\t\t\t}\n\t\t\t\t50% {\n\t\t\t\t\ttransform: translateX(").concat(left ? 15 : -15, "%);\n\t\t\t\t}\n\t\t\t\t100% {\n\t\t\t\t\ttransform: translateX(").concat(left ? -150 : 150, "%);\n\t\t\t\t}\n\t\t\t}\n\t\t\t.close-btn-").concat(this.uuid, " {\n\t\t\t\tbackground-color: transparent;\n\t\t\t\tborder: none;\n\t\t\t\tcursor: pointer;\n\t\t\t\tpadding: 0.25rem;\n\t\t\t\tposition: absolute;\n\t\t\t\tright: .1rem;\n\t\t\t\ttop: 0;\n\t\t\t\ttransition-duration: 150ms;\n\t\t\t}\n\t\t\t.close-btn-").concat(this.uuid, ":focus {\n\t\t\t\toutline: none;\n\t\t\t}\n\t\t\t.close-btn-").concat(this.uuid, ":hover {\n\t\t\t\ttransform: scale(1.5);\n\t\t\t}\n      ");
    document.head.appendChild(style);
    this.container = mainNotificationContainer;
    this.enteringDuration = 250;
    this.outgoingDuration = 350;
    this.duration = duration || 4000 - 250 - 350;
    this.errorOpts = {
      backgroundColor: errorBg || '#EC0B43',
      color: errorColor || 'white',
      closeBtn: !!errorClose,
      duration: errorTime || this.duration
    }, this.infoOpts = {
      backgroundColor: infoBg || '#06f',
      color: infoColor || 'white',
      closeBtn: !!infoClose,
      duration: infoTime || this.duration
    };
    this.successOpts = {
      backgroundColor: successBg || '#2EDC76',
      color: successColor || 'white',
      closeBtn: !!successClose,
      duration: successTime || this.duration
    };
    this.warningOpts = {
      backgroundColor: warningBg || '#FFBC42',
      color: warningColor || 'white',
      closeBtn: !!warningClose,
      duration: warningTime || this.duration
    };
  }
  /**
   *
   * @param {string} message - Mensaje a mostrar en la notificación
   * @param {string} color - Color a usar en la notificación
   * @param {time} time - Tiempo de duración de la notificación
   */


  _createClass(Notification, [{
    key: "add",
    value: function add(notiOptions, cb) {
      var firstChild = this.container.firstChild;
      var div = this.createNotificationElement(notiOptions, cb);
      this.container.insertBefore(div, firstChild);
    }
  }, {
    key: "createNotificationElement",
    value: function createNotificationElement(notiOptions, cb) {
      var _this = this;

      var backgroundColor = notiOptions.backgroundColor,
          closeBtn = notiOptions.closeBtn,
          color = notiOptions.color,
          message = notiOptions.message,
          duration = notiOptions.duration;
      var newDuration = duration - (this.enteringDuration + this.outgoingDuration);
      var div = document.createElement('div');
      div.addEventListener('animationend', function (ev) {
        var animationName = ev.detail || ev.animationName;

        if (animationName === "entering-".concat(_this.uuid)) {
          div.style.animationName = "active-".concat(_this.uuid);
          div.style.animationDuration = "".concat(newDuration, "ms");
        } else if (animationName === "active-".concat(_this.uuid)) {
          div.style.animationName = "outgoing-".concat(_this.uuid);
          div.style.animationDuration = "".concat(_this.outgoingDuration, "ms");
        } else if (animationName === "outgoing-".concat(_this.uuid)) {
          _this.removeNotification.call(_this, div, cb);
        }
      });
      div.style.animationDuration = "".concat(this.enteringDuration, "ms");
      div.style.backgroundColor = backgroundColor;
      div.style.color = color;
      div.innerText = message;
      div.classList.add("notification-".concat(this.uuid));

      if (closeBtn) {
        var closeButton = this.createCloseButton.call(this, div, color);
        div.appendChild(closeButton);
      }

      return div;
    }
  }, {
    key: "createCloseButton",
    value: function createCloseButton(notificationEl, color) {
      var button = document.createElement('button');
      button.addEventListener('click', this.removeActiveAnimation.bind(this, notificationEl));
      button.innerHTML = "\u2715";
      button.style.color = color;
      button.classList.add("close-btn-".concat(this.uuid));
      return button;
    }
    /**
     *
     * @param {string} message - Mensaje de error a mostrar.
     * @param {string | null} errorColor - Color de la notificación. Si no existe se usa el color por defecto.
     * @param {number} time - tiempo de duración de la notificación. Si no existe se usa la duración por defecto.
     */

  }, {
    key: "error",
    value: function error() {
      var errorOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cb = arguments.length > 1 ? arguments[1] : undefined;
      var errorOpt = typeof errorOptions === 'string' ? setNewProperty('message', errorOptions, this.errorOpts) : mergeObjects(this.errorOpts, errorOptions);
      this.add(errorOpt, cb);
    }
    /**
     *
     * @param {string} message - Mensaje de información a mostrar.
     * @param {string | null} infoColor - Color de la notificación. Si no existe se usa el color por defecto.
     * @param {number} time - tiempo de duración de la notificación. Si no existe se usa la duración por defecto.
     */

  }, {
    key: "info",
    value: function info() {
      var infoOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cb = arguments.length > 1 ? arguments[1] : undefined;
      var infoOpt = typeof infoOptions === 'string' ? setNewProperty('message', infoOptions, this.infoOpts) : mergeObjects(this.infoOpts, infoOptions);
      this.add(infoOpt, cb);
    }
  }, {
    key: "removeActiveAnimation",
    value: function removeActiveAnimation(notificationEl) {
      var animationEnd = new CustomEvent('animationend', {
        detail: "active-".concat(this.uuid)
      });
      notificationEl.dispatchEvent(animationEnd);
    }
  }, {
    key: "removeNotification",
    value: function removeNotification(el, cb) {
      this.container.removeChild(el);

      if (cb && typeof cb === 'function') {
        cb();
      }
    }
    /**
     *
     * @param {string} message - Mensaje de éxito a mostrar.
     * @param {string | null} successColor - Color de la notificación. Si no existe se usa el color por defecto.
     * @param {number} time - tiempo de duración en `ms` de la notificación. Si no existe se usa la duración por defecto.
     */

  }, {
    key: "success",
    value: function success() {
      var successOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cb = arguments.length > 1 ? arguments[1] : undefined;
      var successOpt = typeof successOptions === 'string' ? setNewProperty('message', successOptions, this.successOpts) : mergeObjects(this.successOpts, successOptions);
      this.add(successOpt, cb);
    }
    /**
     *
     * @param {string} message - Mensaje de advertencia a mostrar.
     * @param {string | null} infoColor - Color de la notificación. Si no existe se usa el color por defecto.
     * @param {number} time - tiempo de duración de la notificación. Si no existe se usa la duración por defecto.
     */

  }, {
    key: "warning",
    value: function warning() {
      var warningOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cb = arguments.length > 1 ? arguments[1] : undefined;
      var warningOpt = typeof warningOptions === 'string' ? setNewProperty('message', warningOptions, this.warningOpts) : mergeObjects(this.warningOpts, warningOptions);
      this.add(warningOpt, cb);
    }
  }]);

  return Notification;
}();

export default Notification;
`pe.dominguezjosejuan@gmail.com`
