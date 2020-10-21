# Notificator
Componente que permite realizar notificaciones en la pantalla para brindarle al usuario información importante, por ejemplo: cuando una operación es exitosa o cuando ocurrió un error o simplemente para advertirle algo o cualquier otra cosa.

## Cómo funciona
Este componente manipula el **DOM** directamente con javascript para ***agregar / eliminar*** las notificaciones.

## Demo
[Presiona aquí](https://josejuan81.github.io/dl-notificator/)

## Cómo usarlo

#### 1.- Instalar componente
`npm install dl-notificator`

#### 2.- Configuración global
> Solo en la configuración global se define si la notificación sale por la derecha o izquierda.

> El valor de `z-index` también es definido en la configuración global
```js
import Notificator from 'dl-notificator';

const notification = new Notificator({
	duration: number, // milisegundos, por defecto 4000 ms
	errorOptions: {
		backgroundColor string, // por defecto #EC0B43
		color: string, // por defecto white
		closeBtn: boolean, // por defecto false
		duration: number, // por defecto 4000ms
	},
	infoOptions: {
		backgroundColor string, // por defecto #06f
		color: string, // por defecto white
		closeBtn: boolean, // por defecto false
		duration: number, // por defecto 4000ms
	},
	left: true,
	successOptions: {
		backgroundColor string, // por defecto #2EDC76
		color: string, // por defecto white
		closeBtn: boolean, // por defecto false
		duration: number, // por defecto 4000ms
	},
	top: number, // px, por defecto 10
	warningOptions: {
		backgroundColor string, // por defecto #FFBC42
		color: string, // por defecto white
		closeBtn: boolean, // por defecto false
		duration: number, // por defecto 4000ms
	},
	zIndex: number, // por defecto 999
});
...
...
try {
	await http...
	notification.success('Usuario creado con éxito');
} catch (error) {
	notification.error('Usuario ya registrado');
}
```
#### 3.- Configuración específica
```js
import Notificator from 'dl-notificator';

const notification = new Notificator();
...
...
await http...
	notification.success({
		backgroundColor: '#4CB944',
		message: 'Usuario creado con éxito',
		time: 1600,
	});
} catch (error) {
	notification.error({
		color: '#F5EE9E',
		closeBtn: true,
		message: 'Usuario ya existe',
		time: 5600,
	});
}
```

## Jerarquía
Es importante indicar que existe jerarquía en las propiedades que se definen para una notificación.

**Nivel Base General**

Propiedades definidas de forma general en la configuración global o cuando se instancia la clase ***new Notificator***:
```js
const notification = new Notificator({
	duration: 3000,
})
```
En este caso todas las notificaciones tendrán la misma duración de `3000ms`

**Nivel Base Específica**

Propiedades definidas de forma específica para cada tipo de notificación cuando se instancia la clase ***new Notificator***.
```js
const notification = new Notificator({
	duration: 3000,
	successOptions: {
		...
		duration: 5000,
		...
	},
})
```
En este caso solo la notificación de tipo **success** tendrá una duración de `5000ms` mientras que las demás `3000ms`.

**Nivel Específico**

Propiedades definidas justo antes de mostrar la notificación.
```js
const notification = new Notificator({
	duration: 3000,
	successOptions: {
		...
		duration: 5000,
		...
	},
});
...
...
...
// A
notification.success({
	message: 'Texto de la notificación',
	duration: 1500,
});

//B
notification.success('Texto de la notificación');
```
En este caso la notificación ***A*** del tipo **success** tendrá un tiempo de duración de `1500ms` mientras que la ***B*** durará `5000ms`. Las otras (error, info y warning) tendrán `3000ms` de duración.
