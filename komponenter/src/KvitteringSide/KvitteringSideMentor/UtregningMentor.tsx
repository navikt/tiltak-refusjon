import Bygg from '@/asset/image/bygg.svg?react';
import Endret from '@/asset/image/endret.svg?react';
import ErlikTegn from '@/asset/image/erlikTegn.svg?react';
import MinusTegn from '@/asset/image/minusTegn.svg?react';
import Pengesekken from '@/asset/image/pengesekkdollar.svg?react';
import PlussTegn from '@/asset/image/plussTegn.svg?react';
import Sparegris from '@/asset/image/sparegris.svg?react';
import Stranden from '@/asset/image/strand.svg?react';

import { BodyShort, ExpansionCard, Heading, ReadMore } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';

import { formatterPenger } from '~/utils/PengeUtils';

import Utregningsrad from './Utregningsrad';

import './Utregning.less';
import { Beregning, Inntektsgrunnlag, Tilskuddsgrunnlag } from '~/types/refusjon';
import BEMHelper from '~/utils/bem';
import EksternLenke from '~/EksternLenke/EksternLenke';

interface Props {
    refusjonsnummer: string;
    erKorreksjon: boolean;
    beregning?: Beregning;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    inntektsgrunnlag?: Inntektsgrunnlag;
    sumUtbetaltVarig?: number;
}

const Utregning: FunctionComponent<Props> = (props) => {
    const [ekspandert, setEkspandert] = useState(true);
    const cls = BEMHelper('utregning');

    const { beregning, tilskuddsgrunnlag } = props;

    const beløpOver5G = beregning?.overFemGrunnbeløp;
    const beløpOverMaks = beregning && (beregning.overTilskuddsbeløp || beløpOver5G);
    const erKorreksjon = props.erKorreksjon;

    const tilUtbetaling = () => (
        <Utregningsrad
            labelTekst={<b>Refusjonsbeløp til utbetaling</b>}
            verdiOperator={<ErlikTegn />}
            verdi={(beregning?.refusjonsbeløp || 0) ?? 'kan ikke beregne'}
            ikkePenger={beregning === undefined}
        />
    );

    return (
        <ExpansionCard aria-label="Beregning av tilskudd" open={ekspandert} onToggle={setEkspandert} size="small">
            <ExpansionCard.Header>
                <Heading level="3" size="medium">
                    Beregning av tilskudd
                </Heading>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Utregningsrad
                    labelIkon={<Pengesekken />}
                    labelTekst={'Timelønn × antall timer'}
                    verdi={beregning?.lønn || 0}
                />
                {beregning && beregning.fratrekkLønnFerie !== 0 && (
                    <Utregningsrad
                        labelIkon={<Stranden />}
                        labelTekst="Fratrekk for ferie (hentet fra A-meldingen)"
                        verdiOperator={beregning.fratrekkLønnFerie < 0 ? <MinusTegn /> : <PlussTegn />}
                        verdi={
                            beregning.fratrekkLønnFerie < 0
                                ? beregning.fratrekkLønnFerie * -1
                                : beregning.fratrekkLønnFerie
                        }
                    />
                )}

                <>
                    <Utregningsrad
                        labelIkon={<Stranden />}
                        labelTekst="Feriepenger"
                        labelSats={tilskuddsgrunnlag.feriepengerSats}
                        verdiOperator={(beregning?.feriepenger || 0) >= 0 ? <PlussTegn /> : <MinusTegn />}
                        verdi={Math.abs(beregning?.feriepenger || 0)}
                    />
                    <Utregningsrad
                        labelIkon={<Sparegris />}
                        labelTekst="Obligatorisk tjenestepensjon"
                        labelSats={tilskuddsgrunnlag.otpSats}
                        verdiOperator={(beregning?.tjenestepensjon || 0) >= 0 ? <PlussTegn /> : <MinusTegn />}
                        verdi={Math.abs(beregning?.tjenestepensjon || 0)}
                    />
                    <Utregningsrad
                        labelIkon={<Bygg />}
                        labelTekst="Arbeidsgiveravgift"
                        labelSats={tilskuddsgrunnlag.arbeidsgiveravgiftSats}
                        verdiOperator={(beregning?.arbeidsgiveravgift || 0) >= 0 ? <PlussTegn /> : <MinusTegn />}
                        verdi={Math.abs(beregning?.arbeidsgiveravgift || 0)}
                        border={beregning && beregning?.tidligereRefundertBeløp > 0 ? 'TYKK' : undefined}
                    />
                    {beregning && beregning?.tidligereRefundertBeløp > 0 && (
                        <>
                            <Utregningsrad
                                labelIkon={<Pengesekken />}
                                labelTekst="Sum brutto lønnsutgifter"
                                verdiOperator={<ErlikTegn />}
                                verdi={beregning?.sumUtgifter || 0}
                            />
                            <Utregningsrad
                                labelIkon={<Endret />}
                                labelTekst="Refunderbar lønn"
                                verdiOperator={<MinusTegn />}
                                verdi={beregning?.tidligereRefundertBeløp}
                            />
                        </>
                    )}
                </>
                {beregning && (beløpOverMaks || erKorreksjon) && (
                    <Utregningsrad
                        utgår={beløpOverMaks}
                        labelTekst={'Beregning basert på innhentede inntekter'}
                        verdiOperator={<ErlikTegn />}
                        border={erKorreksjon ? 'INGEN' : 'NORMAL'}
                        verdi={beregning.beregnetBeløp}
                    >
                        {beløpOverMaks && (
                            <ReadMore size="small" header="Hva betyr dette?" defaultOpen={true}>
                                {beløpOver5G && (
                                    <>
                                        <BodyShort size="small">
                                            Avtalen har nå oversteget fem ganger grunnbeløpet per år.{' '}
                                            <b>
                                                Det vil bli utbetalt {formatterPenger(beregning?.refusjonsbeløp)} for
                                                denne perioden.
                                            </b>{' '}
                                            Refusjoner for resten av året vil settes til 0 kr, men dere må fortsatt
                                            sende inn refusjoner hver måned.
                                        </BodyShort>
                                        <BodyShort size="small">
                                            <EksternLenke href="https://lovdata.no/forskrift/2015-12-11-1598/§10-7">
                                                Forskrift om arbeidsmarkedstiltak (tiltaksforskriften) - Kapittel 10.
                                                Varig lønnstilskudd
                                            </EksternLenke>
                                        </BodyShort>
                                    </>
                                )}
                                {!beløpOver5G && (
                                    <BodyShort size="small">
                                        Beregnet beløp er høyere enn refusjonsbeløpet.{' '}
                                        <b>
                                            Avtalt beløp er inntil {formatterPenger(tilskuddsgrunnlag.tilskuddsbeløp)}{' '}
                                            for denne perioden.
                                        </b>{' '}
                                        Lønn i denne refusjonsperioden kan ikke endres og dere vil få utbetalt maks av
                                        avtalt beløp.
                                    </BodyShort>
                                )}
                            </ReadMore>
                        )}
                    </Utregningsrad>
                )}
                {erKorreksjon && (
                    <div className={beløpOverMaks ? cls.element('korreksjons-oppsummering') : ''}>
                        {beløpOverMaks && beregning && (
                            <Utregningsrad
                                labelIkon={<Pengesekken />}
                                labelTekst="Avtalt tilskuddsbeløp brukes som beregningsgrunnlag"
                                verdiOperator={<ErlikTegn />}
                                verdi={tilskuddsgrunnlag.tilskuddsbeløp}
                                border="INGEN"
                            />
                        )}
                        {props.beregning?.tidligereUtbetalt != null && erKorreksjon && (
                            <Utregningsrad
                                labelTekst={'Opprinnelig refusjonsbeløp fra refusjonsnummer ' + props.refusjonsnummer}
                                verdiOperator={props.beregning?.tidligereUtbetalt > 0 ? <MinusTegn /> : <PlussTegn />}
                                verdi={Math.abs(props.beregning?.tidligereUtbetalt)}
                                ikkePenger={props.beregning === undefined}
                                border="INGEN"
                            >
                                {props.beregning?.tidligereUtbetalt < 0 && (
                                    <ReadMore size="small" header="Hva betyr dette?" defaultOpen={true}>
                                        <BodyShort size="small">
                                            Den opprinnelige refusjonen medførte et trekk på{' '}
                                            {formatterPenger(Math.abs(props.beregning?.tidligereUtbetalt))}; dette
                                            kompenseres for i denne beregningen.
                                        </BodyShort>
                                    </ReadMore>
                                )}
                                {props.beregning?.tidligereUtbetalt >= 0 && (
                                    <ReadMore size="small" header="Hva betyr dette?" defaultOpen={true}>
                                        <BodyShort size="small">
                                            Den opprinnelige refusjonen medførte en utbetaling på{' '}
                                            {formatterPenger(Math.abs(props.beregning?.tidligereUtbetalt))}; dette
                                            trekkes fra denne beregningen.
                                        </BodyShort>
                                    </ReadMore>
                                )}
                            </Utregningsrad>
                        )}
                        {tilUtbetaling()}
                    </div>
                )}
                {!erKorreksjon && tilUtbetaling()}
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default Utregning;
