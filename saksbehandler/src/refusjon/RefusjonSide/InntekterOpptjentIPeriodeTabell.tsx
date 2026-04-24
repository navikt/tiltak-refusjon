import { Label } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import sumBy from 'lodash.sumby';
import sortBy from 'lodash.sortby';

import { inntektBeskrivelse } from './InntekterFraAMeldingen/InntekterFraAMeldingen';
import { Inntektslinje } from '~/types/refusjon';
import { formaterDato, formaterPeriode, NORSK_DATO_MÅNED_FORMAT, NORSK_MÅNEDÅR_FORMAT } from '~/utils';

import styles from './InntekterOpptjentIPeriodeTabell.module.less';

type Props = {
    inntekter: Inntektslinje[];
    månedsNavn: string;
};

const InntekterOpptjentIPeriodeTabell: FunctionComponent<Props> = (props) => {
    const inntekterHuketAvForOpptjentIPeriode = props.inntekter.filter((inntekt) => inntekt.erOpptjentIPeriode);
    const sumInntekterOpptjentIPeriode = sumBy(inntekterHuketAvForOpptjentIPeriode, 'beløp');

    const sorterInntektslinjer = (inntektslinjer: Inntektslinje[]) =>
        sortBy(inntektslinjer, [
            'måned',
            'opptjeningsperiodeFom',
            'opptjeningsperiodeTom',
            'opptjent',
            'beskrivelse',
            'id',
        ]);

    return (
        <div>
            <table className={styles.inntekterTabell}>
                <thead>
                    <tr>
                        <th>Beskriv&shy;else</th>
                        <th>År/mnd</th>
                        <th>Opptjeningsperiode</th>
                        <th>Opptjent i {props.månedsNavn}?</th>
                        <th>Beløp</th>
                    </tr>
                </thead>
                <tbody>
                    {sorterInntektslinjer(inntekterHuketAvForOpptjentIPeriode).map((inntekt) => (
                        <tr key={inntekt.id}>
                            <td>{inntektBeskrivelse(inntekt.beskrivelse)}</td>
                            <td>{formaterDato(inntekt.måned, NORSK_MÅNEDÅR_FORMAT)}</td>
                            <td>
                                {inntekt.opptjeningsperiodeFom && inntekt.opptjeningsperiodeTom ? (
                                    formaterPeriode(
                                        inntekt.opptjeningsperiodeFom,
                                        inntekt.opptjeningsperiodeTom,
                                        NORSK_DATO_MÅNED_FORMAT
                                    )
                                ) : (
                                    <em>Ikke rapportert opptjenings&shy;periode</em>
                                )}
                            </td>
                            <td>{inntekt.erOpptjentIPeriode ? 'Ja' : 'Nei'}</td>
                            <td>{inntekt.beløp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Label>Sum bruttolønn</Label>
                <Label>{inntekterHuketAvForOpptjentIPeriode.length >= 1 && sumInntekterOpptjentIPeriode}</Label>
            </div>
        </div>
    );
};

export default InntekterOpptjentIPeriodeTabell;
