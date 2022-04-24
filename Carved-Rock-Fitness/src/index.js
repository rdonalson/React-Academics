import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';

// ReactDOM.render(<App />, document.getElementById('root'));

const container = document.getElementById('root');
// Create a root.
const root = ReactDOM.createRoot(container);
// Initial render
root.render(
	<ErrorBoundary>
		<BrowserRouter>
			<App name='Carved Rock Fitness' />
		</BrowserRouter>
	</ErrorBoundary>
);
