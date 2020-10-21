import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Forside from "./Forside/Forside";
import { basePath } from "./paths.json";
import RefusjonSideArbeidsgiver from "./RefusjonSide/RefusjonSideArbeidsgiver";

function App() {
  return (
    <Router basename={basePath}>
      <Route exact path="/">
        <Forside />
      </Route>
      <Route exact path="/refusjon/:refusjonId">
        <RefusjonSideArbeidsgiver />
      </Route>
    </Router>
  );
}

export default App;
