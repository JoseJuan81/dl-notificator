import babel from '@rollup/plugin-babel';

export default [
	{
		input: 'src/Notificator.js',
		external: ['functionallibrary'],
		output: {
			exports: 'named',
			file: 'lib/umd.js',
			format: 'umd',
			globals: {
				functionallibrary: 'functionallibrary',
			},
			name: 'DlNotificator',
			footer: '`pe.dominguezjosejuan@gmail.com`',
		},
		plugins: [
			babel({
				babelHelpers: 'bundled',
				exclude: 'node_modules/**',
			}),
		],
	},
	{
		input: 'src/Notificator.js',
		external: ['functionallibrary'],
		output: {
			file: 'lib/es.js',
			format: 'es',
			name: 'DlNotificator',
			footer: '`pe.dominguezjosejuan@gmail.com`',
		},
		plugins: [
			babel({
				babelHelpers: 'bundled',
				exclude: 'node_modules/**',
			}),
		],
	},
]
