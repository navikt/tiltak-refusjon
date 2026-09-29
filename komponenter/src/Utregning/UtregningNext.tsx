import {
    BankNoteIcon,
    Buildings2Icon,
    EqualsIcon,
    MinusIcon,
    MultiplyIcon,
    ParasolBeachIcon,
    PercentIcon,
    PencilIcon,
    PlusIcon,
    SackKronerIcon,
} from '@navikt/aksel-icons';

import { BodyShort, ExpansionCard, Heading, ReadMore } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';

import UtregningsradNext from './UtregningsradNext';

import {
    Tilskuddsgrunnlag,
    Utregning,
    Utregningslinje,
    UtregningsLinjeType,
    Inntektsgrunnlag,
    UtgårÅrsak,
    Fortegn,
} from '~/types/refusjon';
import { erNil } from '~/utils/predicates';
import EksternLenke from '~/EksternLenke/EksternLenke';
import UtregningsradHvaInngårIDette from './UtregningsradHvaInngårIDette';
import style from './UtregningNext.module.css';

interface Props {
    utregning?: Utregning;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    inntektsgrunnlag?: Inntektsgrunnlag;
}

const konverterFortegn = (fortegn?: Fortegn) => {
    switch (fortegn) {
        case Fortegn.PLUSS:
            return <PlusIcon />;
        case Fortegn.MINUS:
            return <MinusIcon />;
        case Fortegn.ER_LIK:
            return <EqualsIcon />;
        case Fortegn.MULTIPLISER:
            return <MultiplyIcon />;
        default:
            return null;
    }
};

const ikonForType = (type: UtregningsLinjeType) => {
    switch (type) {
        case UtregningsLinjeType.FERIEPENGER:
            return <ParasolBeachIcon />;
        case UtregningsLinjeType.OBLIGATORISK_TJENESTEPENSJON:
            return <Buildings2Icon />;
        case UtregningsLinjeType.TILSKUDDSPROSENT:
            return <PercentIcon />;
        case UtregningsLinjeType.REFUSJONSBELØP_TIL_UTBETALING:
            return <BankNoteIcon />;
        case UtregningsLinjeType.TIMELONN_X_TIMER:
            return <SackKronerIcon />;
        case UtregningsLinjeType.RESTERENDE_FRATREKK_FOR_FERIE_FRA_TIDLIGERE_REFUSJONER:
            return <PencilIcon />;
        default:
            return null;
    }
};

const UtregningNext: FunctionComponent<Props> = (props) => {
    const [ekspandert, setEkspandert] = useState(true);

    const { tilskuddsgrunnlag, utregning, inntektsgrunnlag } = props;

    if (erNil(utregning)) {
        return;
    }

    const bruttoLønnsInntekter = inntektsgrunnlag?.inntekter.filter(
        (inntekt) => inntekt.erMedIInntektsgrunnlag && inntekt.erOpptjentIPeriode === true
    );
    const ferietrekkInntekter = props.inntektsgrunnlag?.inntekter.filter(
        (inntekt) => inntekt.beskrivelse === 'trekkILoennForFerie'
    );

    const ekstraInformasjon = (rad: Utregningslinje) => {
        if (rad.type === UtregningsLinjeType.BRUTTOLONN_I_PERIODEN) {
            return (
                <UtregningsradHvaInngårIDette
                    inntekter={bruttoLønnsInntekter ?? []}
                    tilskuddsgrunnlag={tilskuddsgrunnlag}
                />
            );
        }
        if (rad.type === UtregningsLinjeType.FERIETREKK) {
            return (
                <UtregningsradHvaInngårIDette
                    inntekter={ferietrekkInntekter ?? []}
                    tilskuddsgrunnlag={props.tilskuddsgrunnlag}
                />
            );
        }
        if (rad.utgårFordi) {
            return (
                <ReadMore size="small" header="Hva betyr dette?" defaultOpen={true}>
                    {rad.utgårFordi === UtgårÅrsak.FEM_GRUNNBELOP && (
                        <>
                            <BodyShort size="small">
                                Avtalen har nå oversteget fem ganger grunnbeløpet per år. Refusjoner for resten av året
                                vil settes til 0 kr, men dere må fortsatt sende inn refusjoner hver måned.
                            </BodyShort>
                            <BodyShort size="small">
                                <EksternLenke href="https://lovdata.no/forskrift/2015-12-11-1598/§10-7">
                                    Forskrift om arbeidsmarkedstiltak (tiltaksforskriften) - Kapittel 10. Varig
                                    lønnstilskudd
                                </EksternLenke>
                            </BodyShort>
                        </>
                    )}
                    {rad.utgårFordi === UtgårÅrsak.AVTALT_TILSKUDD && (
                        <BodyShort size="small">
                            Beregnet beløp er høyere enn refusjonsbeløpet. Lønn i denne refusjonsperioden kan ikke
                            endres og dere vil få utbetalt maks av avtalt beløp.
                        </BodyShort>
                    )}
                </ReadMore>
            );
        }
    };

    return (
        <ExpansionCard aria-label="Beregning av tilskudd" open={ekspandert} onToggle={setEkspandert} size="small">
            <ExpansionCard.Header>
                <Heading level="3" size="medium">
                    Beregning av tilskudd
                </Heading>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                {utregning.grupperinger.map((gruppe, index) => (
                    <div className={style.gruppe} key={index}>
                        {gruppe.rader.map((rad, radIndex) => (
                            <UtregningsradNext
                                graaBakgrunn={radIndex === 0 && rad.fortegn === Fortegn.ER_LIK}
                                uthevet={
                                    radIndex === gruppe.rader.length - 1 && index === utregning.grupperinger.length - 1
                                }
                                key={radIndex}
                                labelTekst={rad.label}
                                verdi={rad.verdi.formatertVerdi}
                                verdiOperator={konverterFortegn(rad.fortegn)}
                                labelSats={rad.utledning?.formatertVerdi}
                                labelIkon={ikonForType(rad.type)}
                                utgår={rad.utgårFordi}
                            >
                                {ekstraInformasjon(rad)}
                            </UtregningsradNext>
                        ))}
                    </div>
                ))}
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default UtregningNext;
