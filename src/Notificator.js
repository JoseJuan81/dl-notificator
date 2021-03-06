import { mergeObjects, setNewProperty } from 'functionallibrary';

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

			const { backgroundColor: errorBg, color: errorColor, duration: errorTime, closeBtn: errorClose } = errorOptions || {};
			const { backgroundColor: infoBg, color: infoColor, duration: infoTime, closeBtn: infoClose } = infoOptions || {};
			const { backgroundColor: successBg, color: successColor, duration: successTime, closeBtn: successClose } = successOptions || {};
			const { backgroundColor: warningBg, color: warningColor, duration: warningTime, closeBtn: warningClose } = warningOptions || {};

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
				position: relative;
			}
      @keyframes entering-${this.uuid} {
        0% {
            transform: translateX(${left ? -150 : 150}%);
        }
        50% {
          transform: translateX(${left ? 15 : -15}%);
        }
        100% {
          transform: translateX(${left ? 1 : -1}%);
        }
			}
			@keyframes active-${this.uuid} {
				from {
					transform: translateX(${left ? 1 : -1}%);
				}
				to {
					transform: translateX(${left ? 1 : -1}%);
				}
			}
			@keyframes outgoing-${this.uuid} {
				0% {
					transform: translateX(${left ? 1 : -1}%);
				}
				50% {
					transform: translateX(${left ? 15 : -15}%);
				}
				100% {
					transform: translateX(${left ? -150 : 150}%);
				}
			}
			.close-btn-${this.uuid} {
				background-color: transparent;
				border: none;
				cursor: pointer;
				padding: 0.25rem;
				position: absolute;
				right: .1rem;
				top: 0;
				transition-duration: 150ms;
			}
			.close-btn-${this.uuid}:focus {
				outline: none;
			}
			.close-btn-${this.uuid}:hover {
				transform: scale(1.5);
			}
      `;
      document.head.appendChild(style);

			this.container = mainNotificationContainer;
			this.enteringDuration = 250;
			this.outgoingDuration = 350;
      this.duration = duration || (4000 - 250 - 350);
      this.errorOpts = {
				backgroundColor: errorBg || '#EC0B43',
				color: errorColor || 'white',
				closeBtn: !!errorClose,
				duration: errorTime || this.duration,
			},
      this.infoOpts = {
				backgroundColor: infoBg || '#06f',
				color: infoColor || 'white',
				closeBtn: !!infoClose,
				duration: infoTime || this.duration,
			};
      this.successOpts = {
				backgroundColor: successBg || '#2EDC76',
				color: successColor || 'white',
				closeBtn: !!successClose,
				duration: successTime || this.duration,
			};
			this.warningOpts = {
				backgroundColor: warningBg || '#FFBC42',
				color: warningColor || 'white',
				closeBtn: !!warningClose,
				duration: warningTime || this.duration,
			};
  }

	/**
	 *
	 * @param {string} message - Mensaje a mostrar en la notificación
	 * @param {string} color - Color a usar en la notificación
	 * @param {time} time - Tiempo de duración de la notificación
	 */
  add(notiOptions, cb) {
    const { firstChild } = this.container;
    const div = this.createNotificationElement(notiOptions, cb);
    this.container.insertBefore(div, firstChild);
	}

  createNotificationElement(notiOptions, cb) {
		const { backgroundColor, closeBtn, color, message, duration } = notiOptions;
		const newDuration = duration - (this.enteringDuration + this.outgoingDuration);
		const div = document.createElement('div');
    div.addEventListener('animationend', (ev) => {
			const animationName = ev.detail || ev.animationName;
			if (animationName === `entering-${this.uuid}`) {
				div.style.animationName = `active-${this.uuid}`;
				div.style.animationDuration = `${newDuration}ms`;
			} else if (animationName === `active-${this.uuid}`) {
				div.style.animationName = `outgoing-${this.uuid}`;
				div.style.animationDuration = `${this.outgoingDuration}ms`;
			} else if (animationName === `outgoing-${this.uuid}`) {
				this.removeNotification.call(this, div, cb);
			}
		});
		div.style.animationDuration = `${this.enteringDuration}ms`;
		div.style.backgroundColor = backgroundColor;
		div.style.color = color;
    div.innerText = message;
		div.classList.add(`notification-${this.uuid}`);
		if (closeBtn) {
			const closeButton = this.createCloseButton.call(this, div, color);
			div.appendChild(closeButton);
		}
    return div;
	}

	createCloseButton(notificationEl, color) {
		const button = document.createElement('button');
		button.addEventListener(
			'click',
			this.removeActiveAnimation.bind(this, notificationEl),
		);
		button.innerHTML = '\u2715';
		button.style.color = color;
		button.classList.add(`close-btn-${this.uuid}`);
		return button;
	}

	/**
	 *
	 * @param {string} message - Mensaje de error a mostrar.
	 * @param {string | null} errorColor - Color de la notificación. Si no existe se usa el color por defecto.
	 * @param {number} time - tiempo de duración de la notificación. Si no existe se usa la duración por defecto.
	 */
  error(errorOptions = {}, cb) {
		const errorOpt = typeof errorOptions === 'string'
			? setNewProperty('message', errorOptions, this.errorOpts)
			: mergeObjects(this.errorOpts, errorOptions);
    this.add(errorOpt, cb);
	}

	/**
	 *
	 * @param {string} message - Mensaje de información a mostrar.
	 * @param {string | null} infoColor - Color de la notificación. Si no existe se usa el color por defecto.
	 * @param {number} time - tiempo de duración de la notificación. Si no existe se usa la duración por defecto.
	 */
  info(infoOptions = {}, cb) {
		const infoOpt = typeof infoOptions === 'string'
			? setNewProperty('message', infoOptions, this.infoOpts)
			: mergeObjects(this.infoOpts, infoOptions);
    this.add(infoOpt, cb);
	}
	removeActiveAnimation(notificationEl) {
		const animationEnd = new CustomEvent('animationend', { detail: `active-${this.uuid}` });
		notificationEl.dispatchEvent(animationEnd);
	}
  removeNotification(el, cb) {
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
  success(successOptions = {}, cb) {
		const successOpt = typeof successOptions === 'string'
			? setNewProperty('message', successOptions, this.successOpts)
			: mergeObjects(this.successOpts, successOptions);
    this.add(successOpt, cb);
	}

	/**
	 *
	 * @param {string} message - Mensaje de advertencia a mostrar.
	 * @param {string | null} infoColor - Color de la notificación. Si no existe se usa el color por defecto.
	 * @param {number} time - tiempo de duración de la notificación. Si no existe se usa la duración por defecto.
	 */
  warning(warningOptions = {}, cb) {
		const warningOpt = typeof warningOptions === 'string'
			? setNewProperty('message', warningOptions, this.warningOpts)
			: mergeObjects(this.warningOpts, warningOptions);
    this.add(warningOpt, cb);
  }
}

export default Notification;
