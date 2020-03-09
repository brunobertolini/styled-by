<h1 align="center">
  <img src="logo.png" alt="StyledBy" />
</h1>

[![Build Status](https://travis-ci.org/brunobertolini/styled-by.svg?branch=master)](https://travis-ci.org/brunobertolini/styled-by) [![codecov](https://codecov.io/gh/brunobertolini/styled-by/badge.svg?branch=master)](https://codecov.io/gh/brunobertolini/styled-by?branch=master)

> Simple and powerful lib to handle styled props in your components

## Install

```
yarn add styled-by
```

## Basic usage

```js
import React from 'react';
import styled from 'styled-components';
import styledBy from 'styled-by';

const Button = styled.button`
  background: ${styledBy('background')};
  color: ${styledBy('color')};
  padding: 10px;
  border-radius: 10px;
`;

export default function App() {
  return (
    <Button background="#FFF" color="rgba(0,0,0,0.5)">
      Ok
    </Button>
  );
}
```

## Options

Basicaly, if you use `styledBy('prop')`, it returns prop value. But, if you want do more, use options.

Options can be:
- string;
- function;
- object (and object value can be string or function)

### String

Option as string, will be applied when prop is present.

```js
const Button = styled.button`
  ${styledBy('disabled', 'background: #CCC;')}
`

<Button disabled />
```

### Function

Option as function, always will be called passing `(value props)`.

```js
const Button = styled.button`
  ${styledBy('disabled', value => `background: ${value ? '#CCC' : '#FFF'};`)}
`

<Button disabled />
```

Function arguments allow for code reuse and chaining (via `_.flow`, `R.pipe`, etc.):

```js
const getThemeSize = size => themeSizes[size] || themeColors["m"];
const pxToRem = px => px / 16 + "rem";

const Box = styled.div`
	padding: ${styledBy("padding", _.flow(getThemeSize, pxToRem))};
`;
```

```js
const byHue = (s, l) => h => `hsl(${h}, ${s}, ${l})`;

const Button = styled.button`
	color: ${styledBy("hue", byHue(0.5, 0.75))};
	background-color: ${styledBy("hue", byHue(0.75, 0.5))};
	border-color: ${styledBy("hue", byHue(1, 0.25))};
`;
```

### Object String

Option as object string, will be handled by prop value

```js
const Button = styled.button`
  ${styledBy('corner', {
    rounded: `border-radius: 5px;`,
    circle: `border-radius: 100px;`
  })}
`

<Button corner="rounded" />
```

When option is a object, and styledBy don't find passed option, and if `_` option is defined as a function, call it.

```js
const Button = styled.button`
  ${styledBy('corner', {
    _: (value) => `border-radius: ${value};`,
    rounded: `border-radius: 5px;`,
    circle: `border-radius: 100px;`
  })}
`

<Button corner="square" />
```

### Object Function

Option as object function, will be handled by prop value, and call function as prop param

```js
const Button = styled.button`
  ${styledBy('kind', {
    default: ({ theme, color }) => `
      background: ${theme.colors[color].base};
      color: ${theme.colors[color].contrast};
      border: none;
    `,
    outline: ({ theme, color }) => `
      background: transparent;
      color: ${theme.colors[color].base};
      border: 1px solid ${theme.colors[color].base};
    `,
    clean: ({ theme, color }) => `
      background: transparent;
      color: ${theme.colors[color].base};
      border: none;
    `
  })}
`

<Button color="primary" kind="outline" />
```

### Options list

Instead of prop name in firts param, you can pass many options as a object

```js
const Button = styled.button`
  ${styledBy({
    disabled: `background: #CCC;`,
    corner: {
      square: 'border-radius: 0;',
      rounded: 'border-radius: 5px;',
      circle: 'border-radius: 50px;'
    }
  })}
`
```

This works like many styledBy props declarations

## License

MIT © [Bruno Bertolini](http://brunobertolini.com)
