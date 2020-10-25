import Notificator from './../lib/es';

const rightNotification = new Notificator();
const leftNotification = new Notificator({
	left: true,
});
const configNotification = new Notificator({
	duration: 1500,
	infoOptions: {
		backgroundColor: '#D7D9D7',
		closeBtn: true,
		color: '#FF6542',
		duration: 7500,
	},
})

window.addEventListener('load', () => {
	const successRightDefault = document.getElementById('success-right-default');
	const successRightTimeColor = document.getElementById('success-right-time-color');
	const infoRightColor = document.getElementById('info-right-color');
	const errorLeftTimeColor = document.getElementById('error-left-time-color');
	const warningLeftTimeColor = document.getElementById('warning-left-time-color');
	const infoConfigColor = document.getElementById('info-config');

	successRightDefault.addEventListener('click', () => {
		rightNotification.success({
			message: 'Notificación de éxito con tiempo y color por defecto (4 segundos)',
			closeBtn: true,
		})
	})
	successRightTimeColor.addEventListener('click', () => {
		rightNotification.success({
			message: 'Notificación de éxito con tiempo de 2 segundos y color personalizado',
			duration: 2000,
			backgroundColor: '#5FAD56',
		})
	})
	infoRightColor.addEventListener('click', () => {
		rightNotification.info({
			message: 'Notificación de información con tiempo por defecto y otro color',
			color: '#F5EE9E',
		})
	})
	errorLeftTimeColor.addEventListener('click', () => {
		leftNotification.error({
			backgroundColor: '#D00000',
			message: 'Notificación de error con tiempo de 2.6 seg y otro color',
			duration: 2600,
		})
	})
	warningLeftTimeColor.addEventListener('click', () => {
		leftNotification.warning('Notificación de advertencia')
	})
	infoConfigColor.addEventListener('click', () => {
		configNotification.info('Notificación con colores personalizados');
	})
})
