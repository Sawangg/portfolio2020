import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

window.scrollTo(0, 0);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);