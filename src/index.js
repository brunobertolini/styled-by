const mapOpt = {
	function: ({options, props, prop}) => options[props[prop]](props),
	string: ({options, props, prop}) => options[props[prop]]
}

const mapOptions = {
	string: ({options}) => options,
	function: ({options, props}) => options(props),
	object: ({options, props, prop}) => mapOpt[typeof options[props[prop]]]({options, props, prop})
}

const styledBy = (prop, options) => props =>
	options ? mapOptions[typeof options]({prop, options, props}) : props[prop]

module.exports = styledBy
