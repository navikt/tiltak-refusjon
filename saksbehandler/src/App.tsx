import { RouterProvider } from 'react-router';
import { CookiesProvider } from 'react-cookie';

import router from '@/router';
import InnblikkSporing from '@/sporing/InnblikkSporing';

import './App.css';

function App() {
    return (
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <InnblikkSporing />
            <RouterProvider router={router} />
        </CookiesProvider>
    );
}

export default App;
