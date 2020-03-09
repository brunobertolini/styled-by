import test from 'ava'
import styledBy from '.'

const props = {
	margin: true,
	padding: '10px',
	size: 'small',
	corner: 'rounded',
	blocked: true
}

test('passed props', t => {
	const result = styledBy('padding')(props)
	t.is(result, '10px')
})

test('string', t => {
	const padding = styledBy('padding', '15px')(props)
	const margin = styledBy('margin', '25px')(props)

	t.is(padding, '15px')
	t.is(margin, '25px')
})

test('function, passed value', t => {
	const padding = styledBy('padding', val => val)(props)

	t.is(padding, '10px')
})

test('function, passed props', t => {
	const padding = styledBy('padding', (val, props) => props.padding)(props)

	t.is(padding, '10px')
})

test('object with string', t => {
	const options = {
		small: 'font-size: 0.8rem;',
		medium: 'font-size: 1rem;',
		large: 'font-size: 1.2rem;'
	}

	const size = styledBy('size', options)(props)

	t.is(size, options[props.size])
})

test('object with string and no match', t => {
	const options = {
		_: value => `font-size: ${value};`,
		small: 'font-size: 0.8rem;',
		medium: 'font-size: 1rem;',
		large: 'font-size: 1.2rem;'
	}

	const size = styledBy('size', options)({ size: '0.5rem' })

	t.is(size, 'font-size: 0.5rem;')
})

test('object with function', t => {
	const options = {
		default: (val, props) => (val ? 'default blocked' : 'default unblocked'),
		rounded: (val, props) => (val ? 'rounded blocked' : 'rounded unblocked'),
		circle: (val, props) => (val ? 'circle blocked' : 'circle unblocked')
	}

	const corner = styledBy('corner', options)(props)

	t.is(corner, options[props.corner](props))
})
test('object with default function, using passed value', t => {
	const options = {
		_: (val, props) => val
	}

	const corner = styledBy('corner', options)(props)

	t.is(corner, props.corner)
})

test('object with default function, using passed props', t => {
	const options = {
		_: (val, props) => props.corner
	}

	const corner = styledBy('corner', options)(props)

	t.is(corner, props.corner)
})

test('object with options', t => {
	const options = {
		size: {
			small: 'font-size: 0.8rem;',
			medium: 'font-size: 1rem;',
			large: 'font-size: 1.2rem;'
		}
	}

	const size = styledBy(options)(props)

	t.is(size, ` ${options.size[props.size]}`)
})

test('object with many options', t => {
	const options = {
		size: {
			small: 'font-size: 0.8rem;',
			medium: 'font-size: 1rem;',
			large: 'font-size: 1.2rem;'
		},
		corner: {
			square: 'border-radius: 0;',
			rounded: 'border-radius: 5px;'
		}
	}

	const size = styledBy(options)(props)

	t.is(size, ` ${options.size[props.size]} ${options.corner[props.corner]}`)
})

test('object with options with defaults', t => {
	const options = {
		size: {
			small: 'font-size: 0.8rem;',
			medium: 'font-size: 1rem;',
			large: 'font-size: 1.2rem;'
		}
	}

	const size = styledBy(options, { size: 'large' })({})

	t.is(size, ` ${options.size.large}`)
})

test('object with many options with defaults', t => {
	const options = {
		size: {
			small: 'font-size: 0.8rem;',
			medium: 'font-size: 1rem;',
			large: 'font-size: 1.2rem;'
		},
		corner: {
			square: 'border-radius: 0;',
			rounded: 'border-radius: 5px;'
		}
	}

	const size = styledBy(options, { size: 'large' })({ corner: 'rounded' })

	t.is(size, ` ${options.size.large} ${options.corner.rounded}`)
})
