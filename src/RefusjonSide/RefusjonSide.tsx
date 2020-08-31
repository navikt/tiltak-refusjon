import * as React from "react";
import BEMHelper from "../utils/bem";
import "./RefusjonSide.less";
import FullforGodkjenningArbeidsgiver from "./FullforGodkjenningArbeidsgiver";
import FullforGodkjenningSaksbehandler from "./FullforGodkjenningSaksbehandler";

const cls = BEMHelper("refusjonside");

const saksbehandler = false;

class RefusjonSide extends React.Component {

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
