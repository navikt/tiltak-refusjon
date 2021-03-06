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
import { Refusjon } from "../types/refusjon";
import BEMHelper from "../utils/bem";
import "./FullforGodkjenningArbeidsgiver.less";
import Utregning, { formaterDato } from "./Utregning";
import refusjonInit from "../types/refusjonInit";
import {hentRefusjon,lagreRefusjon} from "../services/rest-service";

const cls = BEMHelper("fullforGodkjenning");

interface State {
  refusjon: Refusjon;
  visEndreFeriedager: boolean;
  visOppgiUtregningsfeil: boolean;
}

class FullforGodkjenningArbeidsgiver extends React.Component<{refusjonId: string}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      refusjon: refusjonInit,
      visEndreFeriedager: false,
      visOppgiUtregningsfeil: false,
    };
    if (props.refusjonId) {
      this.refusjonMedId(props.refusjonId);
    }
  }

  refusjonMedId = (id: string) => {
    return hentRefusjon(id).then((promise: Refusjon) => {
      this.setState({ refusjon: promise }, () => {
        this.setState({
          visEndreFeriedager: this.state.refusjon.feriedager > 0,
        });
      });
    });
  };

  oppdaterRefusjon = (oppdatertRefusjon: Refusjon) => {
    return lagreRefusjon(oppdatertRefusjon)
      .then((promise: Refusjon) => {
        this.setState({ refusjon: promise });
      });
  };

  visBunntekstFeriedager = () => {
    if (this.state.refusjon.feriedager > 0) {
      return (
        <Normaltekst className={cls.element("marginbottom")}>
          Siden deltakeren har hatt {this.state.refusjon.feriedager} feriedager,
          blir utgiften for disse dagene fjernet i grunnlaget for refusjon.
        </Normaltekst>
      );
    }
  };

  oppdatereFerieDager = (antallFeriedager: number) => {
    let oppdatertRefusjon: Refusjon = this.state.refusjon;
    oppdatertRefusjon.feriedager = antallFeriedager;
    this.oppdaterRefusjon(oppdatertRefusjon);
  };

  endreFeriedager = () => {
    return (
      this.state.visEndreFeriedager && (
        <div>
          <p />
          <Input
            description="Hvor mange dager har deltakeren hatt ferie i perioden?"
            inputMode="numeric"
            pattern="[0-9]*"
            bredde="S"
            value={
              this.state.refusjon.feriedager === 0
                ? ""
                : this.state.refusjon.feriedager
            }
            onChange={(ev) => this.oppdatereFerieDager(+ev.target.value)}
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

  render() {
    return (
      <>
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
              {formaterDato(this.state.refusjon.fraDato)} -{" "}
              {formaterDato(this.state.refusjon.tilDato)}?
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
                  this.setState({ visEndreFeriedager: false });
                  this.oppdatereFerieDager(0);
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
                Nei, alt ser riktig ut
              </Knapp>
            </div>
            {this.oppgiUtregningsfeil()}
          </Panel>

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

export default FullforGodkjenningArbeidsgiver;
