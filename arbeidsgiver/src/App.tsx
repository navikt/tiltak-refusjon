import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';

import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { registrereBesok } from './utils/amplitude-utils';

import router from '@/router';

import './App.less';

function App() {
    useEffect(() => {
        registrereBesok();
    });
    return <RouterProvider router={router} />;
}

export default App;
