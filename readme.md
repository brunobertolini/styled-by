# styled-by [![Build Status](https://travis-ci.org/brunobertolini/styled-by.svg?branch=master)](https://travis-ci.org/brunobertolini/styled-by) [![codecov](https://codecov.io/gh/brunobertolini/styled-by/badge.svg?branch=master)](https://codecov.io/gh/brunobertolini/styled-by?branch=master)

> Simple and powerful lib to handle styled props in your components

## Install

```
$ npm install styled-by
```

## Usage

Basic usage

```js
import styled from 'styled-components';
import styledBy from 'styled-by';

const Button = styled.button`
  background: ${styledBy('background')};
  color: ${styledBy('color')};
  padding: 10px;
  border-radius: 10px;  
`;

const Wrapper = props => (
  <Button background="#FFF" color="rgba(0,0,0,0.5)">Ok</Button>
);

export default Wrapper;
```

## License

MIT © [Bruno Bertolini](http://brunobertolini.com)
