import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';

import { RouterProvider } from 'react-router';

import router from '@/router';
import InnblikkSporing from '@/sporing/InnblikkSporing';

import './App.less';

function App() {
    return (
        <>
            <InnblikkSporing />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
