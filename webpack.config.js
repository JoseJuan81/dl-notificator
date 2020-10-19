/* eslint-disable no-undef */
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	entry: './src/index.js',
	mode: isDev ? 'development' : 'production',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'public/js'),
	},
}
