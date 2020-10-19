class Notification {
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
    constructor(opts = {}) {
			const { duration, errorOptions, infoOptions, left, successOptions, top, warningOptions, zIndex } = opts;

			const { bg: errorBg, color: errorColor, time: errorTime, closeBtn: errorClose } = errorOptions || {};
			const { bg: infoBg, color: infoColor, time: infoTime, closeBtn: infoClose } = infoOptions || {};
			const { bg: successBg, color: successColor, time: successTime, closeBtn: successClose } = successOptions || {};
			const { bg: warningBg, color: warningColor, time: warningTime, closeBtn: warningClose } = warningOptions || {};

			/**
			 * Identificador único de cada instancia generada
			 */
			this.uuid = Math.random().toString(32).slice(2);
			this.top = top;
			/**
			 * contenedor principal agregado en el body
			 */
      const mainNotificationContainer = document.createElement('div');
			mainNotificationContainer.classList.add(`notification-container-${this.uuid}`);
      const [body] = document.getElementsByTagName('body');
			body.appendChild(mainNotificationContainer);

			/**
			 * Configurar y agregar estilos en el head
			 */
      const showingSide = left ? 'left:0' : 'right:0'
      var style = document.createElement('style');
      style.innerHTML = `
      .notification-container-${this.uuid} {
        position: fixed;
				${showingSide};
				top: ${this.top || 10}px;
        width: fit-content;
        z-index: ${zIndex || 999}
      }
      .notification-${this.uuid} {
        animation-name: entering-${this.uuid};
        border-radius: 5px;
        color: white;
        margin: 0.5rem 1rem;
        max-width: 15rem;
        min-width: 12rem;
        padding: 1rem;
      }
      @keyframes entering-${this.uuid} {
        0% {
            transform: translateX(${left ? -20 : 20}rem);
            opacity: 0;
        }
        5% {
          transform: translateX(${left ? 3.5 : -3.5}rem);
          opacity: 1
        }
        10% {
          transform: translateX(${left ? 0.25 : -0.25}rem);
        }
        90% {
          transform: translateX(${left ? 0.25 : -0.25}rem);
        }
        95% {
          transform: translateX(${left ? 3.5 : -3.5}rem);
        }
        100% {
            transform: translateX(${left ? -20 : 20}rem);
        }
      }
      `;
      document.head.appendChild(style);

      this.container = mainNotificationContainer;
      this.duration = duration || 4000;
      this.errorOpts = {
				backgroundColor: errorBg || 'red',
				color: errorColor || 'white',
				closeBtn: !!errorClose,
				time: errorTime || this.duration,
			},
      this.infoOpts = {
				backgroundColor: infoBg || 'blue',
				color: infoColor || 'white',
				closeBtn: !!infoClose,
				time: infoTime || this.duration,
			};
      this.successOpts = {
				backgroundColor: successBg || 'green',
				color: successColor || 'white',
				closeBtn: !!successClose,
				time: successTime || this.duration,
			};
			this.warningOpts = {
				backgroundColor: warningBg || 'orange',
				color: warningColor || 'white',
				closeBtn: !!warningClose,
				time: warningTime || this.duration,
			};
  }

	/**
	 *
	 * @param {string} message - Mensaje a mostrar en la notificación
	 * @param {string} color - Color a usar en la notificación
	 * @param {time} time - Tiempo de duración de la notificación
	 */
  add(notiOptions) {
    const { firstChild } = this.container;
    const div = this.createNotificationContainer(notiOptions);
    this.container.insertBefore(div, firstChild);
	}

  createNotificationContainer(notiOptions) {
		const { message, backgroundColor, color, time } = notiOptions;
    const div = document.createElement('div');
    div.addEventListener('animationend', this.removeIt.bind(this, div));
    div.style.animationDuration = `${time}ms`;
		div.style.backgroundColor = backgroundColor;
		div.style.color = color;
    div.innerText = message;
    div.classList.add(`notification-${this.uuid}`);
    return div;
	}

	/**
	 *
	 * @param {string} message - Mensaje de error a mostrar.
	 * @param {string | null} errorColor - Color de la notificación. Si no existe se usa el color por defecto.
	 * @param {number} time - tiempo de duración de la notificación. Si no existe se usa la duración por defecto.
	 */
  error(errorOptions) {
		const errorOpt = Object.assign({}, this.errorOpts, errorOptions);
    this.add(errorOpt);
	}

	/**
	 *
	 * @param {string} message - Mensaje de información a mostrar.
	 * @param {string | null} infoColor - Color de la notificación. Si no existe se usa el color por defecto.
	 * @param {number} time - tiempo de duración de la notificación. Si no existe se usa la duración por defecto.
	 */
  info(infoOptions) {
		const infoOpt = Object.assign({}, this.infoOpts, infoOptions);
    this.add(infoOpt);
	}
  removeIt(el) {
    this.container.removeChild(el);
	}

	/**
	 *
	 * @param {string} message - Mensaje de éxito a mostrar.
	 * @param {string | null} successColor - Color de la notificación. Si no existe se usa el color por defecto.
	 * @param {number} time - tiempo de duración en `ms` de la notificación. Si no existe se usa la duración por defecto.
	 */
  success(successOptions = {}) {
		const successOpt = Object.assign({}, this.successOpts, successOptions);
    this.add(successOpt);
	}

	/**
	 *
	 * @param {string} message - Mensaje de advertencia a mostrar.
	 * @param {string | null} infoColor - Color de la notificación. Si no existe se usa el color por defecto.
	 * @param {number} time - tiempo de duración de la notificación. Si no existe se usa la duración por defecto.
	 */
  warning(warningOptions = {}) {
		const warningOpt = Object.assign({}, this.warningOpts, warningOptions);
    this.add(warningOpt);
  }
}

export default Notification;
