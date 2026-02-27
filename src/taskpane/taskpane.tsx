import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import App from './components/App';

initializeIcons();

const render = (Component: React.ComponentType) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  render(App);
});
