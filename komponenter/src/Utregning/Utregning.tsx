import {
    BankNoteIcon,
    PencilIcon,
    PercentIcon,
    Buildings2Icon,
    MultiplyIcon,
    EqualsIcon,
    MinusIcon,
    PlusIcon,
    ParasolBeachIcon,
    PiggybankIcon,
    SackKronerIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Heading, ReadMore } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import VerticalSpacer from '~/VerticalSpacer';
import { formatterPenger } from '../utils/PengeUtils';
import Utregningsrad from './Utregningsrad';
import styles from './Utregning.module.less';
import UtregningsradHvaInngårIDette from './UtregningsradHvaInngårIDette';
import { Beregning, Inntektsgrunnlag, Tilskuddsgrunnlag } from '~/types/refusjon';
import EksternLenke from '~/EksternLenke/EksternLenke';

interface Props {
    refusjonsnummer: {
        avtalenr: number;
        løpenummer: number;
    };
    erKorreksjon: boolean;
    beregning: Beregning;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    forrigeRefusjonMinusBeløp?: number;
    inntektsgrunnlag?: Inntektsgrunnlag;
}

const Utregning: FunctionComponent<Props> = (props) => {
    const { beregning, tilskuddsgrunnlag, erKorreksjon, inntektsgrunnlag, forrigeRefusjonMinusBeløp } = props;
    const bruttoLønnsInntekter =
        inntektsgrunnlag?.inntekter.filter(
            (inntekt) => inntekt.erMedIInntektsgrunnlag && inntekt.erOpptjentIPeriode === true
        ) ?? [];
    const ferietrekkInntekter =
        inntektsgrunnlag?.inntekter.filter((inntekt) => inntekt.beskrivelse === 'trekkILoennForFerie') ?? [];

    const refusjonsbeløp = beregning.refusjonsbeløp;
    const tidligereRefundertBeløp = beregning.tidligereRefundertBeløp;
    const sumUtgifterFratrukketRefundertBeløp = beregning.sumUtgifterFratrukketRefundertBeløp;

    const harMinusBeløp = forrigeRefusjonMinusBeløp != null && forrigeRefusjonMinusBeløp < 0;
    const refusjonsnummer = props.refusjonsnummer.avtalenr + '-' + props.refusjonsnummer.løpenummer;
    const beløpOver5G = beregning.overFemGrunnbeløp;
    const beløpOverMaks = beregning.overTilskuddsbeløp || beløpOver5G;

    return (
        <div className={styles.utregning}>
            <Heading level="3" size="medium">
                Utregningen
            </Heading>
            <VerticalSpacer rem={1} />
            <Utregningsrad labelTekst={'Bruttolønn i perioden'} verdi={beregning.lønn}>
                <UtregningsradHvaInngårIDette inntekter={bruttoLønnsInntekter} tilskuddsgrunnlag={tilskuddsgrunnlag} />
            </Utregningsrad>
            {beregning && beregning.fratrekkLønnFerie !== 0 && (
                <Utregningsrad
                    labelIkon={<ParasolBeachIcon />}
                    labelTekst="Fratrekk for ferie (hentet fra A-meldingen)"
                    verdiOperator={beregning.fratrekkLønnFerie < 0 ? <MinusIcon /> : <PlusIcon />}
                    verdi={
                        beregning.fratrekkLønnFerie < 0 ? beregning.fratrekkLønnFerie * -1 : beregning.fratrekkLønnFerie
                    }
                >
                    <UtregningsradHvaInngårIDette
                        inntekter={ferietrekkInntekter}
                        tilskuddsgrunnlag={tilskuddsgrunnlag}
                    />
                </Utregningsrad>
            )}

            <Utregningsrad
                labelIkon={<ParasolBeachIcon />}
                labelTekst="Feriepenger"
                labelSats={tilskuddsgrunnlag.feriepengerSats}
                verdiOperator={beregning.feriepenger >= 0 ? <PlusIcon /> : <MinusIcon />}
                verdi={Math.abs(beregning.feriepenger)}
            />
            <Utregningsrad
                labelIkon={<PiggybankIcon />}
                labelTekst="Innskudd obligatorisk tjenestepensjon"
                labelSats={tilskuddsgrunnlag.otpSats}
                verdiOperator={beregning.tjenestepensjon >= 0 ? <PlusIcon /> : <MinusIcon />}
                verdi={Math.abs(beregning.tjenestepensjon)}
            />
            <Utregningsrad
                labelIkon={<Buildings2Icon />}
                labelTekst="Arbeidsgiveravgift"
                labelSats={tilskuddsgrunnlag.arbeidsgiveravgiftSats}
                verdiOperator={beregning.arbeidsgiveravgift >= 0 ? <PlusIcon /> : <MinusIcon />}
                verdi={Math.abs(beregning.arbeidsgiveravgift)}
                border={tidligereRefundertBeløp > 0 ? 'TYKK' : undefined}
            />
            {tidligereRefundertBeløp > 0 && (
                <>
                    <Utregningsrad
                        labelIkon={<SackKronerIcon />}
                        labelTekst="Sum brutto lønnsutgifter"
                        verdiOperator={<EqualsIcon />}
                        verdi={beregning.sumUtgifter}
                    />
                    <Utregningsrad
                        labelIkon={<PencilIcon />}
                        labelTekst="Refunderbar lønn på grunn av fravær"
                        verdiOperator={<MinusIcon />}
                        verdi={tidligereRefundertBeløp}
                        border="TYKK"
                    />
                </>
            )}
            <Utregningsrad
                className={styles.gråUtregningsrad}
                labelTekst="Refusjonsgrunnlag"
                verdiOperator={<EqualsIcon />}
                verdi={sumUtgifterFratrukketRefundertBeløp}
            />

            <Utregningsrad
                labelIkon={<PercentIcon />}
                labelTekst="Tilskuddsprosent"
                verdiOperator={<MultiplyIcon />}
                ikkePenger
                verdi={tilskuddsgrunnlag.lønnstilskuddsprosent + ' %'}
                border="TYKK"
            />

            <VerticalSpacer rem={2} />
            {beregning && (beløpOverMaks || erKorreksjon || harMinusBeløp) && (
                <Utregningsrad
                    utgår={beløpOverMaks}
                    labelTekst={<>Beregning basert på innhentede inntekter</>}
                    verdiOperator={<EqualsIcon />}
                    border={erKorreksjon ? 'INGEN' : 'NORMAL'}
                    verdi={beregning.beregnetBeløp}
                >
                    {beløpOverMaks && (
                        <ReadMore size="small" header="Hva betyr dette?" defaultOpen={true}>
                            {beløpOver5G && (
                                <>
                                    <BodyShort size="small">
                                        Avtalen har nå oversteget fem ganger grunnbeløpet per år. Refusjoner for resten
                                        av året vil settes til 0 kr, men dere må fortsatt sende inn refusjoner hver
                                        måned.
                                    </BodyShort>
                                    <BodyShort size="small">
                                        <EksternLenke href="https://lovdata.no/forskrift/2015-12-11-1598/§10-7">
                                            Les mer i tiltaksforskriften
                                        </EksternLenke>
                                    </BodyShort>
                                </>
                            )}
                            {!beløpOver5G && (
                                <BodyShort size="small">
                                    Avtalt tilskuddsbeløp for refusjonsperioden kan ikke overstiges, og det vil bli
                                    utbetalt maks av avtalt beløp.
                                </BodyShort>
                            )}
                        </ReadMore>
                    )}
                </Utregningsrad>
            )}
            <div className={erKorreksjon ? styles.korreksjonsOppsummering : ''}>
                {beregning.overTilskuddsbeløp && !beløpOver5G && (
                    <Utregningsrad
                        labelIkon={<SackKronerIcon />}
                        labelTekst="Avtalt tilskuddsbeløp"
                        verdi={tilskuddsgrunnlag.tilskuddsbeløp}
                        border="INGEN"
                    />
                )}
                {harMinusBeløp && !beløpOver5G && (
                    <Utregningsrad
                        labelIkon={<PencilIcon />}
                        labelTekst={'Ferietrekk fra tidligere refusjoner'}
                        verdiOperator={<MinusIcon />}
                        verdi={Math.abs(forrigeRefusjonMinusBeløp)}
                        border="INGEN"
                    />
                )}
                {beløpOver5G && (
                    <Utregningsrad
                        labelIkon={<SackKronerIcon />}
                        labelTekst="Avtalt tilskuddsbeløp (gjenstående etter 5G)"
                        verdi={refusjonsbeløp + beregning.tidligereUtbetalt}
                        border="INGEN"
                    />
                )}
                {beregning.tidligereUtbetalt !== 0 && (
                    <Utregningsrad
                        labelTekst={'Allerede utbetalt for refusjon ' + refusjonsnummer}
                        verdiOperator={beregning.tidligereUtbetalt > 0 ? <MinusIcon /> : <PlusIcon />}
                        verdi={Math.abs(beregning.tidligereUtbetalt)}
                        border="INGEN"
                    >
                        {beregning.tidligereUtbetalt < 0 && (
                            <ReadMore size="small" header="Hva betyr dette?" defaultOpen={true}>
                                <BodyShort size="small">
                                    Den opprinnelige refusjonen medførte et trekk på{' '}
                                    {formatterPenger(Math.abs(beregning.tidligereUtbetalt))}.
                                </BodyShort>
                                <BodyShort size="small">Dette kompenseres for i denne beregningen.</BodyShort>
                            </ReadMore>
                        )}
                        {beregning.tidligereUtbetalt >= 0 && (
                            <ReadMore size="small" header="Hva betyr dette?" defaultOpen={true}>
                                <BodyShort size="small">
                                    Den opprinnelige refusjonen medførte en utbetaling på{' '}
                                    {formatterPenger(Math.abs(beregning.tidligereUtbetalt))}. Beløpet trekkes fra denne
                                    beregningen.
                                </BodyShort>
                            </ReadMore>
                        )}
                    </Utregningsrad>
                )}
                <Utregningsrad
                    labelIkon={<BankNoteIcon />}
                    labelTekst={'Refusjonsbeløp til utbetaling'}
                    verdiOperator={<EqualsIcon />}
                    verdi={refusjonsbeløp}
                    border="INGEN"
                />
            </div>
        </div>
    );
};

export default Utregning;
