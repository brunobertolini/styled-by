import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
	entry: 'src/index.js',
	moduleName: 'styledBy',
	exports: 'named',
	targets: [{
		dest: 'build/styled-by.min.js',
		format: 'umd'
	}],
	plugins: [
		babel(),
		uglify()
	]
}
