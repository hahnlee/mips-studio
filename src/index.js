import * as React from 'react';
import { render } from 'react-dom';

import { App } from 'container';

import './index.css';

window.require(['vs/editor/editor.main'], () => {
  render(
    <App/>,
    document.getElementById('root')
  );
});
