import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

Sentry.init({
  dsn: 'https://c213b6715025489db9d6e95f88d275e0@o1201301.ingest.sentry.io/6325984',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.unregister();
