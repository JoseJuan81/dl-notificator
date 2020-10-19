class Notification {
  /*
  * @params {object} opts - opciones
  * @params {number} opts.duration - duración animación. por defecto 4000 (ms)
  * @params {string} opts.error - color para mensajes de error
  * @params {string} opts.info - color para mensajes de información
  * @params {boolean} opts.left - lado por el que aparece la notificación. Por defecto false porque se muestra por la derecha
  * @params {string} opts.success - color para mensajes de éxito
  * @params {number} opts.top - valor de desfase de la primera notificación respecto a la ventana del navegador. Por defecto es 1 (rem);
  * @params {string} opts.warning - color para mensajes de advertencia
  */
    constructor(opts = {}) {
			const { duration, error, info, left, success, top, warning, zIndex } = opts;
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
			 * Configurar y agregar estilos en el headc
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
      this.errorColor = error || 'red';
      this.infoColor = info || 'blue';
      this.successColor = success || 'green';
			this.warningColor = warning || 'orange';
  }

	/**
	 *
	 * @param {string} message - Mensaje a mostrar en la notificación
	 * @param {string} color - Color a usar en la notificación
	 * @param {time} time - Tiempo de duración de la notificación
	 */
  add(message, color, time) {
    const { firstChild } = this.container;
    const div = this.createNotificationContainer(message, color, time);
    this.container.insertBefore(div, firstChild);
	}

  createNotificationContainer(message, color, time) {
    const div = document.createElement('div');
    div.addEventListener('animationend', this.removeIt.bind(this, div));
    div.style.animationDuration = `${time}ms`;
		div.style.backgroundColor = color;
		div.style.color = 'white';
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
  error({ message, color, time }) {
		const errorColor = color || this.errorColor;
		const errorTime = time || this.duration;
    this.add(message, errorColor, errorTime);
	}

	/**
	 *
	 * @param {string} message - Mensaje de información a mostrar.
	 * @param {string | null} infoColor - Color de la notificación. Si no existe se usa el color por defecto.
	 * @param {number} time - tiempo de duración de la notificación. Si no existe se usa la duración por defecto.
	 */
  info({ message, color, time }) {
		const infoColor = color || this.infoColor;
		const infoTime = time || this.duration;
    this.add(message, infoColor, infoTime);
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
  success({ message, color, time }) {
		const successColor = color || this.successColor;
		const successTime = time || this.duration;
    this.add(message, successColor, successTime);
	}

	/**
	 *
	 * @param {string} message - Mensaje de advertencia a mostrar.
	 * @param {string | null} infoColor - Color de la notificación. Si no existe se usa el color por defecto.
	 * @param {number} time - tiempo de duración de la notificación. Si no existe se usa la duración por defecto.
	 */
  warning({ message, color, time }) {
		const warningColor = color || this.warningColor;
		const warningTime = time || this.duration;
    this.add(message, warningColor, warningTime);
  }
}

export default Notification;
