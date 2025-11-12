import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';

import { RouterProvider } from 'react-router';

import router from '@/router';

import './App.less';

function App() {
    return <RouterProvider router={router} />;
}

export default App;
