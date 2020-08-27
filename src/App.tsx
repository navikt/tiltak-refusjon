import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Forside from "./Forside/Forside";
import Innloggingslinje from "./InnloggingBoundary/Innloggingslinje";
import { basePath } from "./paths.json";
import RefusjonSide from "./RefusjonSide/RefusjonSide";
import { InternDekorator } from "./InternDekorator/InternDekorator";

const innloggetSom = {
  identifikator: "t115435",
  erNavAnsatt: true,
  organisasjoner: [
    {
      bedriftNavn: "NAV",
      bedriftNr: "12345",
    },
  ],
};

function App() {
  return (
    <Router basename={basePath}>
      <InternDekorator />
      <Innloggingslinje innloggetBruker={innloggetSom} />
      <Route exact path="/">
        <Forside />
      </Route>
      <Route exact path="/refusjon">
        <RefusjonSide />
      </Route>
    </Router>
  );
}

export default App;
