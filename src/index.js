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

	successRightDefault.addEventListener('click', () => {
		rightNotification.success({
			message: 'Notificación de éxito con tiempo por defecto de 4 segundos',
		})
	})
	successRightTimeColor.addEventListener('click', () => {
		rightNotification.success({
			message: 'Notificación de éxito con tiempo de 2 segundos y otro color',
			time: 2000,
			color: '#5FAD56',
		})
	})
	infoRightColor.addEventListener('click', () => {
		rightNotification.info({
			message: 'Notificación de información con tiempo por defecto y otro color',
			color: '#57B8FF',
		})
	})
	errorLeftTimeColor.addEventListener('click', () => {
		leftNotification.info({
			color: '#D00000',
			message: 'Notificación de error con tiempo de 2.6 seg y otro color',
			time: 2600,
		})
	})
})
