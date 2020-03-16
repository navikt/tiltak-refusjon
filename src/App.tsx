import * as React from 'react';
import RefusjonSide from "./RefusjonSide/RefusjonSide";

import BEMHelper from "./utils/bem";
import Innloggingslinje from "./InnloggingBoundary/Innloggingslinje";
import refusjonMock from "./services/__mocks__/refusjon-mock";

const cls = BEMHelper('background');

const innloggetSom = {
    identifikator: "t115435",
    erNavAnsatt: true,
    organisasjoner: [{
        bedriftNavn: "NAV",
        bedriftNr: "12345"
    }]
};


class App extends React.Component {
    render() {
        return (
            <div >
                <Innloggingslinje innloggetBruker={innloggetSom}/>
                <RefusjonSide/>
            </div>
        );
    }
}

export default App;

