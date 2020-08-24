import * as React from 'react';
import MediaQuery from 'react-responsive';
import {Panel} from 'nav-frontend-paneler';
import {Column, Container, Row} from 'nav-frontend-grid';
import classNames from 'classnames';
import {ReactComponent as StillingProsentIkon} from '@/assets/ikoner/stillingsprosent.svg';
import {ReactComponent as ManedsLonnIkon} from '@/assets/ikoner/manedsLonn.svg';
import {ReactComponent as FerieIkon} from '@/assets/ikoner/feriepenger.svg';
import {ReactComponent as SykepengerIkon} from '@/assets/ikoner/syk.svg';
import {ReactComponent as PensjonIkon} from '@/assets/ikoner/obligTjenestepensjon.svg';
import {ReactComponent as ArbeidIkon} from '@/assets/ikoner/arbeidsgiveravgift.svg';
import { ReactComponent as GraphRefusjonAvLonnIkon } from '@/assets/ikoner/graphRefusjonAvLønn.svg';
import BEMHelper from "../utils/bem";
import './Utregning.less';
import {Element, Normaltekst, Systemtittel, Undertittel} from "nav-frontend-typografi";
import { Refusjon } from "../types/refusjon";

const cls = BEMHelper('visUtregningenPanel');
const visTalletEller0 = (tallet?: number) => (tallet === 0 || tallet ? tallet : 0);
const visSatsMedEttDesimal = (sats?: number) => (sats ? sats * 100 : 0).toFixed(1);
const visAntallFeriedager = (feriedager?: number) => (feriedager === 1 ? ' 1 feriedag' : feriedager + ' feriedager');

const Utregning: React.FunctionComponent<{ refusjon: Refusjon; }> = (props) => (

    <div className={cls.element('panel')}>

        <Systemtittel>Om tiltaket</Systemtittel>
        <p/>
        <div className={cls.element('kolonner')}>
            <div className={cls.element('marginright_5pst')}>
                <Element className={cls.element('marginbottom')}>Tiltak:</Element>
                <Element className={cls.element('marginbottom')}>Periode:</Element>
                <Element className={cls.element('marginbottom')}>Deltaker:</Element>
                <Element className={cls.element('marginbottom')}>Veileder:</Element>
                <Element className={cls.element('marginbottom')}>Arbeidsgiver:</Element>
            </div>
            <div className={cls.element('marginright_5pst')}>
                <Normaltekst className={cls.element('marginbottom')}>{props.refusjon.tiltakstype}</Normaltekst>
                <Normaltekst className={cls.element('marginbottom')}>
                    {props.refusjon.varighet.fraDato} - {props.refusjon.varighet.tilDato} ({props.refusjon.varighet.maaneder} måneder)
                </Normaltekst>
                <Normaltekst className={cls.element('marginbottom')}>{props.refusjon.deltakerNavn}</Normaltekst>
                <Normaltekst className={cls.element('marginbottom')}>{props.refusjon.veilederNavn}</Normaltekst>
                <Normaltekst className={cls.element('marginbottom')}>{props.refusjon.bedriftNavn}</Normaltekst>
            </div>
        </div>
        <div className={cls.element('marginbottom')}/>

        <Systemtittel>Vår utregning</Systemtittel>
        <Panel border={false}>
        <Container fluid>
            <Row className={cls.element('rad')}>
                <Column md="6" sm="6" xs="6" className={cls.element('tittel')}>
                    <div className={cls.element('tittel')}>
                        <MediaQuery minWidth={700}>
                            <StillingProsentIkon className={cls.element('ikon')}/>
                        </MediaQuery>
                        Stillingsprosent
                    </div>
                </Column>
                <Column md="6" sm="6" xs="6" className={cls.element('column__siste')}>
                    {visTalletEller0(props.refusjon.stillingsprosent)}
                </Column>
            </Row>
            <Row className={cls.element('rad')}>
                <Column md="6" sm="6" xs="6">
                    {' '}
                    <div className={cls.element('tittel')}>
                        <MediaQuery minWidth={700}>
                            <ManedsLonnIkon className={cls.element('ikon')}/>
                        </MediaQuery>
                        Månedslønn
                    </div>
                </Column>
                <Column md="6" sm="6" xs="6" className={cls.element('column__siste')}>
                    {visTalletEller0(props.refusjon.manedslonn)} kr
                </Column>
            </Row>
            <Row className={cls.element('rad')}>
                <Column md="8" sm="8" xs="8">
                    {' '}
                    <div className={cls.element('tittel')}>
                        <MediaQuery minWidth={700}>
                            <FerieIkon className={cls.element('ikon')}/>
                        </MediaQuery>
                        Fratrekk for {visAntallFeriedager(props.refusjon.feriedager)}
                    </div>
                </Column>
                <Column md="1" sm="1" xs="1">
                    -
                </Column>
                <Column md="3" sm="3" xs="3" className={cls.element('column__siste')}>
                    {visTalletEller0(props.refusjon.trekkFeriedager)} kr
                </Column>
            </Row>
            <Row className={cls.element('rad')}>
                <Column md="8" sm="8" xs="8">
                    {' '}
                    <div className={cls.element('tittel')}>
                        <MediaQuery minWidth={700}>
                            <SykepengerIkon className={cls.element('ikon')}/>
                        </MediaQuery>
                        Sykepenger utbetalt
                    </div>
                </Column>
                <Column md="1" sm="1" xs="1">
                    -
                </Column>
                <Column md="3" sm="3" xs="3" className={cls.element('column__siste')}>
                    {visTalletEller0(props.refusjon.sykepenger)} kr
                </Column>
            </Row>
            <Row className={cls.element('rad')}>
                <Column md="6" sm="6" xs="6">
                    {' '}
                    <div className={cls.element('tittel')}>
                    </div>
                </Column>
                <Column md="6" sm="6" xs="6" className={cls.element('column__siste')}>
                    {visTalletEller0(props.refusjon.nettoManedslonn)} kr
                </Column>
            </Row>
            <Row className={cls.element('rad')}>
                <Column md="6" sm="6" xs="6">
                    {' '}
                    <div className={cls.element('tittel')}>
                        <MediaQuery minWidth={700}>
                            <FerieIkon className={cls.element('ikon')}/>
                        </MediaQuery>
                        Feriepenger
                    </div>
                </Column>
                <Column md="2" sm="2" xs="2">
                    ({visSatsMedEttDesimal(props.refusjon.satsArbgiverAvgift)}%)
                </Column>
                <Column md="1" sm="1" xs="1">
                    +
                </Column>
                <Column md="3" sm="3" xs="3" className={cls.element('column__siste')}>
                    {visTalletEller0(props.refusjon.feriepenger)} kr
                </Column>
            </Row>
            <Row className={cls.element('rad')}>
                <Column md="6" sm="6" xs="6">
                    {' '}
                    <div className={cls.element('tittel')}>
                        <MediaQuery minWidth={700}>
                            <PensjonIkon className={cls.element('ikon')}/>
                        </MediaQuery>
                        Obligatorisk tjenestepensjon
                    </div>
                </Column>
                <Column md="2" sm="2" xs="2">
                    ({visSatsMedEttDesimal(props.refusjon.satsOtp)}%)
                </Column>
                <Column md="1" sm="1" xs="1">
                    +
                </Column>
                <Column md="3" sm="3" xs="3" className={cls.element('column__siste')}>
                    {visTalletEller0(props.refusjon.otpBelop)} kr
                </Column>
            </Row>
            <Row className={cls.element('rad')}>
                <Column md="6" sm="6" xs="6">
                    {' '}
                    <div className={cls.element('tittel')}>
                        <MediaQuery minWidth={700}>
                            <ArbeidIkon className={cls.element('ikon')}/>
                        </MediaQuery>
                        Arbeidsgiveravgift
                    </div>
                </Column>
                <Column md="2" sm="2" xs="2">
                    ({visSatsMedEttDesimal(props.refusjon.satsArbgiverAvgift)}%)
                </Column>
                <Column md="1" sm="1" xs="1">
                    +
                </Column>
                <Column md="3" sm="3" xs="3" className={cls.element('column__siste')}>
                    {visTalletEller0(props.refusjon.arbgiverAvgift)} kr
                </Column>
            </Row>
            <Row className={cls.element('rad')}>
                <Column md="8" sm="8" xs="8">
                    {' '}
                    <div className={classNames(cls.element('tittel'), cls.element('orienter__sum__tittel'))}>
                        Sum utgifter for arbeidsgiver
                    </div>
                </Column>
                <Column md="1" sm="1" xs="1">
                    =
                </Column>
                <Column md="3" sm="3" xs="3" className={cls.element('column__siste')}>
                    {visTalletEller0(props.refusjon.totalArbgiverUtgift)} kr
                </Column>
            </Row>
            <Row className={classNames(cls.element('rad'), cls.element('rad__siste'))}>
                <Column md="6" sm="9" xs="6" className={cls.element('tittel')}>
                    <MediaQuery minWidth={700}>
                        <GraphRefusjonAvLonnIkon className={cls.element('ikon')} />
                    </MediaQuery>
                    <div>Fastsatt refusjon av lønn</div>
                </Column>
                <Column md="6" sm="3" xs="6" className={cls.element('column__siste')}>
                    {props.refusjon.refusjonsProsent || 0} %
                </Column>
            </Row>
            <Row className={classNames(cls.element('rad'), cls.element('rad__oppsummering'))}>
                <Column md="9" sm="9" xs="6" className={cls.element('tittel')}>
                    <Undertittel> Refusjon per måned:</Undertittel>
                </Column>
                <Column md="3" sm="3" xs="6" className={cls.element('column__siste')}>
                    <Undertittel>{visTalletEller0(props.refusjon.refusjonsBelop)} kr</Undertittel>
                </Column>
            </Row>
        </Container>
        </Panel>
    </div>
);

export default Utregning;