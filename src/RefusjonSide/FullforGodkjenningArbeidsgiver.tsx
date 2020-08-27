import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import { Panel } from "nav-frontend-paneler";
import {
  Checkbox,
  CheckboxGruppe,
  Input,
  TextareaControlled,
} from "nav-frontend-skjema";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import * as React from "react";
import restService from "../services/rest-service";
import { Refusjon } from "../types/refusjon";
import BEMHelper from "../utils/bem";
import "./FullforGodkjenningArbeidsgiver.less";

const cls = BEMHelper("fullforGodkjenning");

interface Props {
  refusjon: Refusjon;
}

class FullforGodkjenningArbeidsgiver extends React.Component<Props> {
  state = {
    visEndreFeriedager: false,
    visOppgiUtregningsfeil: false,
    feriedager: 0,
  };

  visBunntekstFeriedager = () => {
    if (this.state.feriedager > 0) {
      return (
        <Normaltekst className={cls.element("marginbottom")}>
          Siden deltakeren har hatt {this.state.feriedager} feriedager, blir
          utgiften for disse dagene fjernet i grunnlaget for refusjon.
        </Normaltekst>
      );
    }
  };

  endreFeriedager = () => {
    return (
      (this.state.visEndreFeriedager || this.state.feriedager > 0) && (
        <div>
          <p />
          <Input
            description="Hvor mange dager har deltakeren hatt ferie i perioden?"
            inputMode="numeric"
            pattern="[0-9]*"
            bredde="S"
            // feil="Skriv feriedagene som tall"
            value={this.state.feriedager}
            onChange={(ev) => {
              this.setState({ feriedager: ev.target.value }); //TODO beregne på nytt i api'et
            }}
          />
          <p />
          {this.visBunntekstFeriedager()}
        </div>
      )
    );
  };

  oppgiUtregningsfeil = () => {
    return (
      this.state.visOppgiUtregningsfeil && (
        <div>
          <CheckboxGruppe
            className={cls.element("margintopbottom")}
            legend="Hva mener du er feil?"
          >
            <Checkbox label={"Stillingprosent"} />
            <Checkbox label={"Månedslønn"} />
            <Checkbox label={"Sykepenger"} />
            <Checkbox label={"Feriepenger"} />
            <Checkbox label={"Obligatorisk tjenestepensjon"} />
            <Checkbox label={"Arbeidsgiveravgift"} />
            <Checkbox label={"Fastsatt refusjon"} />
          </CheckboxGruppe>
          <TextareaControlled
            label="Oppgi begrunnelse for hvorfor dette er feil"
            maxLength={1000}
            defaultValue={""}
          />
        </div>
      )
    );
  };

  oppdaterRefusjon = () => {
    return restService.lagreRefusjon(this.props.refusjon);
  };

  render() {
    return (
      <div className={cls.element("container")}>
        <Sidetittel className={cls.element("marginbottom")}>
          Refusjon
        </Sidetittel>
        <Normaltekst className={cls.element("marginbottom")}>
          Før din bedrift får utbetalt pengene dere har rett til, må vi stille
          noen spørsmål:
        </Normaltekst>

        {/* ENDRE FERIEDAGER */}
        <Panel border className={cls.element("marginbottom")}>
          <Normaltekst className={cls.element("marginbottom")}>
            Har deltakeren hatt ferie i peroden{" "}
            {this.props.refusjon.varighet.fraDato} -{" "}
            {this.props.refusjon.varighet.tilDato}?
          </Normaltekst>
          <div className={cls.element("knapprad")}>
            <Knapp
              mini
              className={cls.element("knapp")}
              onClick={() => {
                this.setState({ visEndreFeriedager: true });
              }}
            >
              Ja
            </Knapp>
            <Knapp
              mini
              className={cls.element("knapp")}
              onClick={() => {
                this.setState({ visEndreFeriedager: false, feriedager: 0 });
                this.props.refusjon.feriedager = this.state.feriedager;
                //this.oppdaterRefusjon();
              }}
            >
              Nei
            </Knapp>
          </div>
          {this.endreFeriedager()}
        </Panel>

        {/* OPPGI REGNEFEIL */}
        <Panel border className={cls.element("marginbottom")}>
          <Normaltekst className={cls.element("marginbottom")}>
            Er det noe du mener er feil i vår utregning?
          </Normaltekst>
          <div className={cls.element("knapprad")}>
            <Knapp
              mini
              className={cls.element("knapp")}
              onClick={() => {
                this.setState({ visOppgiUtregningsfeil: true });
              }}
            >
              Ja
            </Knapp>
            <Knapp
              mini
              className={cls.element("knapp")}
              onClick={() => {
                this.setState({ visOppgiUtregningsfeil: false });
              }}
            >
              Nei
            </Knapp>
          </div>
          {this.oppgiUtregningsfeil()}
        </Panel>

        <Hovedknapp
          className={cls.element("fullfoerknapp")}
          htmlType="submit"
          onClick={() => this.oppdaterRefusjon()}
        >
          Behandle refusjon
        </Hovedknapp>
      </div>
    );
  }
}

export default FullforGodkjenningArbeidsgiver;
