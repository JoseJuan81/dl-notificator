import babel from '@rollup/plugin-babel';

export default {
	input: 'src/Notificator.js',
	external: ['functionallibrary'],
	output: {
		exports: 'named',
		file: 'lib/index.js',
		format: 'umd',
		globals: {
			functionallibrary: 'functionallibrary',
		},
		name: 'DlNotificator',
		footer: 'https://github.com/JoseJuan81',
	},
	plugins: [
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
		}),
	],
};
