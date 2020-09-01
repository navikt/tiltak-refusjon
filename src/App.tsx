import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Forside from "./Forside/Forside";
import { basePath } from "./paths.json";
import RefusjonSide from "./RefusjonSide/RefusjonSide";

function App() {
  return (
    <Router basename={basePath}>
      <Route exact path="/tiltak-refusjon/">
        <Forside />
      </Route>
      <Route exact path="/tiltak-refusjon/refusjon/:id">
        <RefusjonSide />
      </Route>
    </Router>
  );
}

export default App;
