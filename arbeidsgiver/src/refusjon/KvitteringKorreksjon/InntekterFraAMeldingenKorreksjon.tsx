import React, { Fragment, FunctionComponent } from 'react';
import VerticalSpacer from '~/VerticalSpacer';

import { formatterPenger } from '~/utils/PengeUtils';
import { Alert, Heading } from '@navikt/ds-react';

import '../RefusjonSide/InntekterFraAMeldingen.less';
import Boks from '~/Boks';

import InntektsMeldingHeader from '../RefusjonSide/inntektsmelding/InntektsMeldingHeader';
import groupBy from 'lodash.groupby';
import sortBy from 'lodash.sortby';
import { lønnsbeskrivelseTekst } from '~/types/messages';
import { Korreksjon } from '~/types/refusjon';
import BEMHelper from '~/utils/bem';
import { formaterDato, formaterPeriode, månedsNavn, NORSK_DATO_MÅNED_FORMAT, NORSK_MÅNEDÅR_FORMAT } from '~/utils';

const inntektBeskrivelse = (beskrivelse: string | undefined) => {
    if (beskrivelse === undefined) {
        return '';
    } else if (beskrivelse === '') {
        return 'Inntekt';
    } else {
        return lønnsbeskrivelseTekst[beskrivelse] ?? 'Inntekt: ' + beskrivelse;
    }
};

type Props = {
    korreksjon: Korreksjon;
    kvitteringVisning: boolean;
};

const InntekterFraAMeldingenKorreksjon: FunctionComponent<Props> = ({ korreksjon }) => {
    const cls = BEMHelper('inntekterFraAMeldingen');

    const antallInntekterSomErMedIGrunnlag = korreksjon.refusjonsgrunnlag.inntektsgrunnlag?.inntekter.filter(
        (inntekt) => inntekt.erMedIInntektsgrunnlag
    ).length;

    const ingenInntekter =
        !korreksjon.refusjonsgrunnlag.inntektsgrunnlag ||
        korreksjon.refusjonsgrunnlag.inntektsgrunnlag?.inntekter.length === 0;

    const ingenRefunderbareInntekter: boolean =
        !!korreksjon.refusjonsgrunnlag.inntektsgrunnlag &&
        korreksjon.refusjonsgrunnlag.inntektsgrunnlag.inntekter.length > 0 &&
        antallInntekterSomErMedIGrunnlag === 0;

    const inntektGrupperObjekt = groupBy(
        korreksjon.refusjonsgrunnlag.inntektsgrunnlag?.inntekter,
        (inntekt) => inntekt.måned
    );
    const inntektGrupperListe = Object.entries(inntektGrupperObjekt);
    const inntektGrupperListeSortert = sortBy(inntektGrupperListe, [(i) => i[0]]);

    const månedNavn = månedsNavn(korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom);

    return (
        <Boks variant="grå">
            <InntektsMeldingHeader
                refusjonsgrunnlag={korreksjon.refusjonsgrunnlag}
                unntakOmInntekterFremitid={korreksjon.unntakOmInntekterFremitid}
            />
            {korreksjon.refusjonsgrunnlag.inntektsgrunnlag?.bruttoLønn !== undefined &&
                korreksjon.refusjonsgrunnlag.inntektsgrunnlag?.bruttoLønn !== null && (
                    <i>
                        Her hentes inntekter i form av fastlønn, timelønn, faste tillegg, uregelmessige tillegg knyttet
                        til arbeidet tid og inntekt fra veldedige eller allmennyttige organisasjoner som er rapportert
                        inn i A-meldingen for måneden refusjonen gjelder for.
                    </i>
                )}
            {korreksjon.refusjonsgrunnlag.inntektsgrunnlag &&
                korreksjon.refusjonsgrunnlag.inntektsgrunnlag.inntekter.find(
                    (inntekt) => inntekt.erMedIInntektsgrunnlag
                ) && (
                    <>
                        <VerticalSpacer rem={1} />
                        {inntektGrupperListeSortert
                            .filter(([, inntektslinjer]) =>
                                inntektslinjer.some((inntekt) => inntekt.erMedIInntektsgrunnlag)
                            )
                            .map(([aarManed, inntektslinjer]) => (
                                <Fragment key={aarManed}>
                                    <Heading
                                        level="3"
                                        size="small"
                                        style={{ display: 'flex', justifyContent: 'center' }}
                                    >
                                        Inntekt rapportert for {månedsNavn(aarManed)} ({aarManed})
                                    </Heading>
                                    <div style={{ borderTop: '1px solid #06893b' }}>
                                        <table className={cls.element('inntekterTabell')}>
                                            <thead>
                                                <tr>
                                                    <th>Beskriv&shy;else</th>
                                                    <th>År/mnd</th>
                                                    <th>Opptjenings&shy;periode</th>
                                                    <th>Opptjent i {månedNavn}?</th>
                                                    <th>Beløp</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortBy(
                                                    inntektslinjer.filter((inntekt) => inntekt.erMedIInntektsgrunnlag),
                                                    [
                                                        'opptjeningsperiodeFom',
                                                        'opptjeningsperiodeTom',
                                                        'beskrivelse',
                                                        'id',
                                                    ]
                                                ).map((inntekt) => {
                                                    return (
                                                        <tr key={inntekt.id}>
                                                            <td>{inntektBeskrivelse(inntekt.beskrivelse)}</td>
                                                            <td>{formaterDato(inntekt.måned, NORSK_MÅNEDÅR_FORMAT)}</td>
                                                            <td>
                                                                {inntekt.opptjeningsperiodeFom &&
                                                                inntekt.opptjeningsperiodeTom ? (
                                                                    formaterPeriode(
                                                                        inntekt.opptjeningsperiodeFom,
                                                                        inntekt.opptjeningsperiodeTom,
                                                                        NORSK_DATO_MÅNED_FORMAT
                                                                    )
                                                                ) : (
                                                                    <em>Ikke rapportert opptjenings&shy;periode</em>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {inntekt.erOpptjentIPeriode && (<label>Ja</label>)}
                                                                {inntekt.erOpptjentIPeriode === false && (<label>Nei</label>)}
                                                                {!inntekt.erOpptjentIPeriode && inntekt.erOpptjentIPeriode !== false && (<label>Ikke satt</label>)}
                                                            </td>
                                                            <td>{formatterPenger(inntekt.beløp)}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <VerticalSpacer rem={1} />
                                </Fragment>
                            ))}
                        {korreksjon.refusjonsgrunnlag.inntektsgrunnlag?.bruttoLønn !== undefined &&
                            korreksjon.refusjonsgrunnlag.inntektsgrunnlag?.bruttoLønn !== null && (
                            <table className={cls.element('inntekterTabell')}>
                                <tbody>
                                    <tr>
                                        <td colSpan={4}>
                                            <b>Sum</b>
                                        </td>
                                        <td>
                                            <b style={{ whiteSpace: 'nowrap' }}>
                                                {formatterPenger(
                                                    korreksjon.refusjonsgrunnlag.inntektsgrunnlag.bruttoLønn
                                                )}
                                            </b>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
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
export default InntekterFraAMeldingenKorreksjon;
