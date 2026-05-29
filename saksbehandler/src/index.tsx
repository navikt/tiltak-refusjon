import '@navikt/ds-css';
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import './index.css';

const script = document.createElement('script');
script.type = 'module';
script.src = '/internarbeidsflatedecorator/internarbeidsflate-decorator.wc.js';
document.head.appendChild(script);

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container!);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
