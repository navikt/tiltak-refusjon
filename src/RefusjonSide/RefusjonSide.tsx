import * as React from "react";
import BEMHelper from "../utils/bem";
import "./RefusjonSide.less";
import FullforGodkjenningArbeidsgiver from "./FullforGodkjenningArbeidsgiver";
import FullforGodkjenningSaksbehandler from "./FullforGodkjenningSaksbehandler";
import { Undertittel } from "nav-frontend-typografi";
import { VenstreChevron } from "nav-frontend-chevron";
import { useHistory } from "react-router";

const cls = BEMHelper("refusjonside");

const saksbehandler = false;

const RefusjonSide = () => {
  const history = useHistory();
  const tilbakeTilOversikt = () => history.goBack();

  const godkjenningComponent = () => {
    if (saksbehandler) {
      return <FullforGodkjenningSaksbehandler />;
    }
    return <FullforGodkjenningArbeidsgiver />;
  };

  return (
    <div className={cls.element("wrapper")}>
      <div
        className={cls.element("tilbake")}
        role="button"
        onClick={() => tilbakeTilOversikt()}
      >
        <div className={cls.element("chevron")}>
          <VenstreChevron />
        </div>
        <Undertittel>Tilbake til oversikt</Undertittel>
      </div>
      <div className={cls.element("container")}>{godkjenningComponent()}</div>
    </div>
  );
};

export default RefusjonSide;
