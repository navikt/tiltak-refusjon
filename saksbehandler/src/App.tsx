import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import router from '@/router';

import './App.css';

function App() {
    return (
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <RouterProvider router={router} />
        </CookiesProvider>
    );
}

export default App;
