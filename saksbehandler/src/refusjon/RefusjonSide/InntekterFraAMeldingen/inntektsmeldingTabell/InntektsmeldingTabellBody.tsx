import { FunctionComponent } from 'react';
import { formatterPenger } from '../../../../utils/PengeUtils';
import { NORSK_MÅNEDÅR_FORMAT, formatterDato, formatterPeriode } from '../../../../utils/datoUtils';
import { Inntektslinje } from '../../../refusjon';
import { inntektBeskrivelse } from '../InntekterFraAMeldingen';
import InntektValg from './InntektValg';
import sortBy from 'lodash.sortby';

type Props = {
    inntektslinjer: Inntektslinje[];
    kvitteringVisning: boolean;
    korreksjonId?: string;
};

const valgtBruttoLønn = (inntekter: Inntektslinje[]) =>
    inntekter
        .filter((inntekt) => inntekt.erOpptjentIPeriode)
        .map((el) => el.beløp)
        .reduce((el, el2) => el + el2, 0);

const InntektsmeldingTabellBody: FunctionComponent<Props> = (props) => {
    return (
        <tbody>
            {sortBy(
                props.inntektslinjer.filter((i) => i.erMedIInntektsgrunnlag),
                ['måned', 'opptjeningsperiodeFom', 'opptjeningsperiodeTom', 'opptjent', 'beskrivelse', 'id']
            ).map((inntekt) => (
                <tr key={inntekt.id}>
                    <td>{inntektBeskrivelse(inntekt.beskrivelse)}</td>
                    <td>{formatterDato(inntekt.måned, NORSK_MÅNEDÅR_FORMAT)}</td>
                    <td>
                        {inntekt.opptjeningsperiodeFom && inntekt.opptjeningsperiodeTom ? (
                            formatterPeriode(inntekt.opptjeningsperiodeFom, inntekt.opptjeningsperiodeTom, 'DD.MM')
                        ) : (
                            <em>Ikke rapportert opptjenings&shy;periode</em>
                        )}
                    </td>
                    <InntektValg
                        inntekt={inntekt}
                        korreksjonId={props.korreksjonId}
                        kvitteringVisning={props.kvitteringVisning}
                    />
                    <td>{formatterPenger(inntekt.beløp)}</td>
                </tr>
            ))}
            <tr>
                <td colSpan={4}>
                    <b>Sum</b>
                </td>
                <td>
                    <b>{formatterPenger(valgtBruttoLønn(props.inntektslinjer))}</b>
                </td>
            </tr>
        </tbody>
    );
};

export default InntektsmeldingTabellBody;
