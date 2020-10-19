import Notificator from './Notificator';

const rightNotification = new Notificator();
const leftNotification = new Notificator({
	left: true,
});

window.addEventListener('load', () => {
	const successRightDefault = document.getElementById('success-right-default');
	const successRightTimeColor = document.getElementById('success-right-time-color');
	const infoRightColor = document.getElementById('info-right-color');
	const errorLeftTimeColor = document.getElementById('error-left-time-color');
	const warningLeftTimeColor = document.getElementById('warning-left-time-color');

	successRightDefault.addEventListener('click', () => {
		rightNotification.success({
			message: 'Notificación de éxito con tiempo por defecto de 4 segundos',
		})
	})
	successRightTimeColor.addEventListener('click', () => {
		rightNotification.success({
			message: 'Notificación de éxito con tiempo de 2 segundos y otro color',
			time: 2000,
			backgroundColor: '#5FAD56',
		})
	})
	infoRightColor.addEventListener('click', () => {
		rightNotification.info({
			message: 'Notificación de información con tiempo por defecto y otro color',
			backgroundColor: '#57B8FF',
			color: '#D23751',
		})
	})
	errorLeftTimeColor.addEventListener('click', () => {
		leftNotification.error({
			backgroundColor: '#D00000',
			message: 'Notificación de error con tiempo de 2.6 seg y otro color',
			time: 2600,
		})
	})
	warningLeftTimeColor.addEventListener('click', () => {
		leftNotification.error({
			backgroundColor: '#F9C22E',
			message: 'Notificación de advertencia con tiempo de 5.6 seg y otro color',
			time: 5600,
		})
	})
})
