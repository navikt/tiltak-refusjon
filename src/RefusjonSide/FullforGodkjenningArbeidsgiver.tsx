import * as React from 'react';
import {Element, Normaltekst, Sidetittel, Undertittel} from "nav-frontend-typografi";
import PanelBase, {Panel} from 'nav-frontend-paneler';
import {Hovedknapp, Knapp} from 'nav-frontend-knapper';
import {Checkbox, CheckboxGruppe, TextareaControlled} from 'nav-frontend-skjema';
import './FullforGodkjenning.less';
import restService from "../services/rest-service"
import BEMHelper from "../utils/bem";
import {Column, Container, Row} from "nav-frontend-grid";
import {Refusjon} from "../types/refusjon";

const cls = BEMHelper('fullforGodkjenning');

interface Props {
    refusjon: Refusjon;
}

class FullforGodkjenningArbeidsgiver extends React.Component<Props> {

    state = {
        erSaksbehandler: false,
        visEndreFeriedager: false,
        visOppgiUtregningsfeil: false,
        feriedager: 0
    };

    endreFeriedager = () => {
        return (this.state.visEndreFeriedager &&
            <div>
                <CheckboxGruppe className={cls.element('margintopbottom')} legend="Hva mener du er feil?">
                    <Checkbox label={'Stillingprosent'}/>
                </CheckboxGruppe>
                <TextareaControlled label="Oppgi begrunnelse for hvorfor dette er feil" maxLength={1000}
                                    defaultValue={""}/>
            </div>);
    };

    oppgiUtregningsfeil = () => {
        return (this.state.visOppgiUtregningsfeil &&
            <div>
                <CheckboxGruppe className={cls.element('margintopbottom')} legend="Hva mener du er feil?">
                    <Checkbox label={'Stillingprosent'}/>
                    <Checkbox label={'Månedslønn'}/>
                    <Checkbox label={'Sykepenger'}/>
                    <Checkbox label={'Feriepenger'}/>
                    <Checkbox label={'Obligatorisk tjenestepensjon'}/>
                    <Checkbox label={'Arbeidsgiveravgift'}/>
                    <Checkbox label={'Fastsatt refusjon'}/>
                </CheckboxGruppe>
                <TextareaControlled label="Oppgi begrunnelse for hvorfor dette er feil" maxLength={1000}
                                    defaultValue={""}/>
            </div>);
    };

    visPeriode = () => {
        const maaneder: number = this.props.refusjon.varighet.maaneder;
        const dager: number = this.props.refusjon.varighet.dager;

        if (maaneder !== 0) {
            return "(" + maaneder + " måneder" + (dager !== 0 ? " og " + dager + " dager)" : ")");
        }
        return dager !== 0 && "(" + dager + " dager)";
    };

    sendRefusjonsForslag = () => {

    };

    oppdaterRefusjon = () => {
        return restService.lagreRefusjon(this.props.refusjon);
    };

    oppsummeringTilSaksbehandler = () => {
        return (
            <div>
                <Undertittel>Om tiltaket</Undertittel>
                <Panel border={false} className={cls.element('marginbottom')}>
                    <Container fluid>
                        <Row>
                            <Column md="4" sm="4" xs="4">
                                <Element>Tiltak:</Element>
                            </Column>
                            <Column md="8" sm="8" xs="8">
                                {this.props.refusjon.tiltakstype}
                            </Column>
                        </Row>
                        <Row className={cls.element('rad')}>
                            <Column md="4" sm="4" xs="4">
                                <Element>Periode:</Element>
                            </Column>
                            <Column md="8" sm="8" xs="8">
                                {this.props.refusjon.varighet.fraDato} - {this.props.refusjon.varighet.tilDato} {this.visPeriode()}
                            </Column>
                        </Row>
                        <Row className={cls.element('rad')}>
                            <Column md="4" sm="4" xs="4">
                                <Element>Deltaker:</Element>
                            </Column>
                            <Column md="8" sm="8" xs="8">
                                {this.props.refusjon.deltakerNavn}
                            </Column>
                        </Row>
                        <Row className={cls.element('rad')}>
                            <Column md="4" sm="4" xs="4">
                                <Element>Veileder:</Element>
                            </Column>
                            <Column md="8" sm="8" xs="8">
                                {this.props.refusjon.veilederNavn}
                            </Column>
                        </Row>
                        <Row className={cls.element('rad')}>
                            <Column md="4" sm="4" xs="4">
                                <Element>Arbeidsgiver:</Element>
                            </Column>
                            <Column md="8" sm="8" xs="8">
                                {this.props.refusjon.bedriftNavn} v/{this.props.refusjon.bedriftKontaktperson}.
                            </Column>
                        </Row>
                    </Container>
                </Panel>

                <Undertittel className={cls.element('marginTopBottom')}>A-inntekt</Undertittel>
                <Normaltekst className={cls.element('marginTop')}> Vi har hentet følgende data fra a-inntekt for
                    tiltaksperioden:</Normaltekst>
                <Panel border={false} className={cls.element('marginbottom')}>
                    <Container fluid>
                        <Row>
                            <Column md="4" sm="4" xs="4">
                                Feriepenger utbetalt:
                            </Column>
                            <Column md="2" sm="2" xs="2">
                                <Element>{this.props.refusjon.feriepenger} kr</Element>
                            </Column>
                            <Column md="6" sm="6" xs="6">
                                {this.props.refusjon.feriedager} dager ferie i perioden
                            </Column>
                        </Row>
                        <Row className={cls.element('rad')}>
                            <Column md="4" sm="4" xs="4">
                                Sykepenger utbetalt:
                            </Column>
                            <Column md="2" sm="2" xs="2">
                                <Element>{this.props.refusjon.sykepenger} kr</Element>
                            </Column>
                            <Column md="6" sm="6" xs="6">
                                {this.props.refusjon.sykedager} dager med sykefravær som NAV må dekke
                            </Column>
                        </Row>
                    </Container>
                </Panel>
            </div>
        );
    };

    render() {

        return (
            <div className={cls.element('container')}>
                <Sidetittel className={cls.element('marginbottom')}>Refusjon</Sidetittel>


                <Normaltekst className={cls.element('marginbottom')}>Før din bedrift får utbetalt pengene dere har rett
                    til, må vi stille noen spørsmål:</Normaltekst>

                {/* ENDRE FERIEDAGER */}
                <Panel border className={cls.element('marginbottom')}>
                    <Normaltekst className={cls.element('marginbottom')}>Har deltakeren hatt ferie i peroden (fra) -
                        (til)?</Normaltekst>
                    <div className={cls.element('knapprad')}>
                        <Knapp
                            mini
                            className={cls.element('knapp')}
                            onClick={() => {
                                this.setState({visEndreFeriedager: true})
                            }}
                        >Ja</Knapp>
                        <Knapp
                            mini
                            className={cls.element('knapp')}
                            onClick={() => {
                                this.setState({visEndreFeriedager: false})
                            }}
                        >Nei</Knapp>
                    </div>
                    {this.endreFeriedager()}
                </Panel>

                {/* OPPGI REGNEFEIL */}
                <Panel border className={cls.element('marginbottom')}>
                    <Normaltekst className={cls.element('marginbottom')}>Er det noe du mener er feil i vår
                        utregning?</Normaltekst>
                    <div className={cls.element('knapprad')}>
                        <Knapp
                            mini
                            className={cls.element('knapp')}
                            onClick={() => {
                                this.setState({visOppgiUtregningsfeil: true})
                            }}
                        >Ja</Knapp>
                        <Knapp
                            mini
                            className={cls.element('knapp')}
                            onClick={() => {
                                this.setState({visOppgiUtregningsfeil: false})
                            }}
                        >Nei, alt ser riktig ut</Knapp>
                    </div>
                    {this.oppgiUtregningsfeil()}
                </Panel>

                <PanelBase border className={cls.element('bluepanel')}>
                    <Normaltekst>Kiwi Majorstuen får utbetalt <b>{this.props.refusjon.refusjonsBelop} kr</b> i refusjon
                        for denne tiltaksperioden.</Normaltekst>
                </PanelBase>

                <Hovedknapp className={cls.element('fullfoerknapp')}
                            htmlType="submit"
                            onClick={() => this.oppdaterRefusjon()}
                >Fullfør refusjon</Hovedknapp>
            </div>
        );
    }
}

export default FullforGodkjenningArbeidsgiver;