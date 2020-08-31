import * as React from "react";
import { Normaltekst, Element, Sidetittel } from "nav-frontend-typografi";
import PanelBase from "nav-frontend-paneler";
import { Hovedknapp } from "nav-frontend-knapper";
import { Checkbox, CheckboxGruppe } from "nav-frontend-skjema";
import "./FullforGodkjenningSaksbehandler.less";
import restService from "../services/rest-service";
import BEMHelper from "../utils/bem";
import { Refusjon } from "../types/refusjon";
import refusjonInit from "../types/refusjonInit";
import Utregning from "./Utregning";


const cls = BEMHelper("fullforGodkjenning");

interface State {
  refusjon: Refusjon;
  visEndreFeriedager: boolean;
  visOppgiUtregningsfeil: boolean;
}

class FullforGodkjenningSaksbehandler extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      refusjon: refusjonInit,
      visEndreFeriedager: false,
      visOppgiUtregningsfeil: false,
    };
    this.refusjonMedId("2");
  }

  refusjonMedId = (id: String) => {
    return restService.hentRefusjon(id.toString()).then((promise: Refusjon) => {
      this.setState({ refusjon: promise });
    });
  };

  oppdaterRefusjon = (oppdatertRefusjon: Refusjon) => {
    return restService.lagreRefusjon(oppdatertRefusjon).then((promise: Refusjon) => {
      this.setState({ refusjon: promise });
    });
  };

  render() {
    return (
      <>
        <div className={cls.element("container")}>
        <Sidetittel className={cls.element("marginbottom")}>
          Refusjon
        </Sidetittel>
        <Normaltekst className={cls.element("marginbottom")}>
          Vi har hentet følgende data fra Ainntekt for tiltaksperioden:
        </Normaltekst>

        <div className={cls.element("kolonner")}>
          <div className={cls.element("marginright_5pst")}>
            <Normaltekst className={cls.element("marginbottom")}>
              Feriepenger utbetalt:
            </Normaltekst>
            <Normaltekst className={cls.element("marginbottom")}>
              Sykepenger utbetalt:
            </Normaltekst>
          </div>
          <div className={cls.element("marginright_5pst")}>
            <Element className={cls.element("marginbottom")}>
              {this.state.refusjon.feriepenger} kr
            </Element>
            <Element className={cls.element("marginbottom")}>
              {this.state.refusjon.sykepenger} kr
            </Element>
          </div>
          <div>
            <Normaltekst className={cls.element("marginbottom")}>
              {this.state.refusjon.feriedager} feriedager i perioden.
            </Normaltekst>
            <Normaltekst className={cls.element("marginbottom")}>
              {this.state.refusjon.feriedager} sykedager som NAV må dekke.
            </Normaltekst>
          </div>
        </div>

        {/* OPPGI FEIL */}
        <div>
          <CheckboxGruppe
            className={cls.element("margintopbottom")}
            legend="Er det noe du mener er feil i utregning av refusjonen?"
          >
            <Checkbox label={"Månedslønn"} />
            <Checkbox label={"Trekk for feriepenger"} />
            <Checkbox label={"Sykepenger"} />
          </CheckboxGruppe>
        </div>

        <PanelBase border className={cls.element("bluepanel")}>
          <Normaltekst>
            Kiwi Majorstuen får utbetalt{" "}
            <b>{this.state.refusjon.refusjonPrMåned} kr</b> i refusjon for denne
            tiltaksperioden.
          </Normaltekst>
        </PanelBase>

        <Hovedknapp
          className={cls.element("fullfoerknapp")}
          htmlType="submit"
          onClick={() => this.oppdaterRefusjon(this.state.refusjon)}
        >
          Behandle refusjon
        </Hovedknapp>
      </div>
        <Utregning refusjon={this.state.refusjon} />
      </>
    );
  }
}

export default FullforGodkjenningSaksbehandler;
