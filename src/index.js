const mapOpt = {
	function: ({ options, props, prop }) => options[props[prop]](props),
	string: ({ options, props, prop }) => options[props[prop]],
	undefined: ({ options, props }) =>
		typeof options._ === 'function' ? options._(props) : null
}

const mapOptions = {
	string: ({ options }) => options,
	function: ({ options, props }) => options(props),
	object: ({ options, props, prop }) =>
		mapOpt[typeof options[props[prop]]]({ options, props, prop }),
	undefined: () => {}
}

const styledProp = (prop, options) => props =>
	props[prop]
		? options
			? mapOptions[typeof options]({ prop, options, props })
			: props[prop]
		: ''

const styledOptions = (options, defaultProps = {}) => props =>
	Object.keys(options).reduce(
		(memo, prop) =>
			`${memo} ${styledProp(prop, options[prop])({
				...defaultProps,
				...props
			})}`,
		''
	)

const styledBy = (prop, options) =>
	typeof prop === 'string'
		? styledProp(prop, options)
		: styledOptions(prop, options)

module.exports = styledBy
