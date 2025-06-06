import React, { FunctionComponent } from 'react';

import Boks from '~/Boks';
import VerticalSpacer from '~/VerticalSpacer';
import sortBy from 'lodash.sortby';
import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import { Inntektsgrunnlag } from '~/types/refusjon';
import { formatterDato, formatterPeriode, NORSK_DATO_OG_TID_FORMAT, NORSK_MÅNEDÅR_FORMAT } from '~/utils';
import { formatterPenger } from '@/utils/PengeUtils';
import { lønnsbeskrivelseTekst } from '~/types/messages';

import styles from './InntekterFraAmeldingenGammel.module.less';

const inntektBeskrivelse = (beskrivelse: string | undefined) => {
    if (beskrivelse === undefined) {
        return '';
    } else if (beskrivelse === '') {
        return 'Inntekt';
    } else {
        return lønnsbeskrivelseTekst[beskrivelse] ?? 'Inntekt: ' + beskrivelse;
    }
};

const InntekterFraAMeldingenGammel: FunctionComponent<{
    inntektsgrunnlag: Inntektsgrunnlag | undefined;
}> = (props) => {
    const antallInntekterSomErMedIGrunnlag = props.inntektsgrunnlag?.inntekter.filter(
        (inntekt) => inntekt.erMedIInntektsgrunnlag
    ).length;

    const ingenInntekter = !props.inntektsgrunnlag || props.inntektsgrunnlag?.inntekter.length === 0;

    const ingenRefunderbareInntekter: boolean =
        !!props.inntektsgrunnlag &&
        props.inntektsgrunnlag.inntekter.length > 0 &&
        antallInntekterSomErMedIGrunnlag === 0;

    return (
        <Boks variant="grå">
            <div className={styles.fle}>
                <Heading size="small" style={{ marginBottom: '1rem' }}>
                    Inntekter hentet fra a-meldingen
                </Heading>
                {props.inntektsgrunnlag && (
                    <BodyShort size="small">
                        Sist hentet:{' '}
                        {formatterDato(props.inntektsgrunnlag.innhentetTidspunkt, NORSK_DATO_OG_TID_FORMAT)}
                    </BodyShort>
                )}
            </div>
            {props.inntektsgrunnlag?.bruttoLønn !== undefined && props.inntektsgrunnlag?.bruttoLønn !== null && (
                <i>Her hentes inntekter rapportert inn til a-meldingen i tilskuddsperioden og en måned etter.</i>
            )}
            {props.inntektsgrunnlag &&
                props.inntektsgrunnlag.inntekter.find((inntekt) => inntekt.erMedIInntektsgrunnlag) && (
                    <>
                        <VerticalSpacer rem={1} />
                        <table className={styles.inntekterTabell}>
                            <thead>
                                <tr>
                                    <th>Beskriv&shy;else</th>
                                    <th>År/mnd</th>
                                    <th>Opptjenings&shy;periode</th>
                                    <th>Beløp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortBy(
                                    props.inntektsgrunnlag.inntekter.filter(
                                        (inntekt) => inntekt.erMedIInntektsgrunnlag
                                    ),
                                    ['måned', 'opptjeningsperiodeFom', 'opptjeningsperiodeTom', 'beskrivelse', 'id']
                                ).map((inntekt) => (
                                    <tr key={inntekt.id}>
                                        <td>{inntektBeskrivelse(inntekt.beskrivelse)}</td>
                                        <td>{formatterDato(inntekt.måned, NORSK_MÅNEDÅR_FORMAT)}</td>

                                        <td>
                                            {inntekt.opptjeningsperiodeFom && inntekt.opptjeningsperiodeTom ? (
                                                formatterPeriode(
                                                    inntekt.opptjeningsperiodeFom,
                                                    inntekt.opptjeningsperiodeTom,
                                                    'DD.MM'
                                                )
                                            ) : (
                                                <em>Ikke rapportert opptjenings&shy;periode</em>
                                            )}
                                        </td>

                                        <td>{formatterPenger(inntekt.beløp)}</td>
                                    </tr>
                                ))}
                                {props.inntektsgrunnlag?.bruttoLønn && (
                                    <tr>
                                        <td colSpan={3}>
                                            <b>Sum</b>
                                        </td>
                                        <td>
                                            <b style={{ whiteSpace: 'nowrap' }}>
                                                {formatterPenger(props.inntektsgrunnlag.bruttoLønn)}
                                            </b>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                )}
            {ingenInntekter && (
                <>
                    <VerticalSpacer rem={1} />
                    <Alert variant="warning" size="small">
                        Vi kan ikke finne inntekter fra a-meldingen for denne perioden. Når a-meldingen er oppdatert vil
                        inntektsopplysningene vises her automatisk.
                    </Alert>
                    <VerticalSpacer rem={1} />
                </>
            )}
            {ingenRefunderbareInntekter && (
                <>
                    <VerticalSpacer rem={1} />
                    <Alert variant="warning" size="small">
                        Vi kan ikke finne noen lønnsinntekter for denne perioden. Når a-meldingen er oppdatert vil
                        inntektsopplysningene vises her automatisk.
                    </Alert>
                    <VerticalSpacer rem={1} />
                </>
            )}
        </Boks>
    );
};

export default InntekterFraAMeldingenGammel;
