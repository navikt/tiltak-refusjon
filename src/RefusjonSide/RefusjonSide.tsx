import * as React from "react";
import BEMHelper from "../utils/bem";
import "./RefusjonSide.less";
import FullforGodkjenningArbeidsgiver from "./FullforGodkjenningArbeidsgiver";
import FullforGodkjenningSaksbehandler from "./FullforGodkjenningSaksbehandler";
import { Refusjon } from "../types/refusjon";

const cls = BEMHelper("refusjonside");



interface State {
  refusjon: Refusjon;
}

const saksbehandler = false;

class RefusjonSide extends React.Component<{}, State> {
  godkjenningComponent = () => {
    if (saksbehandler) {
      return <FullforGodkjenningSaksbehandler />;
    }
    return <FullforGodkjenningArbeidsgiver />;
  };

  render() {
    return (
      <div className={cls.element("container")}>
        {this.godkjenningComponent()}
      </div>
    );
  }
}

export default RefusjonSide;
