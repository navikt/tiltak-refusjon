import { Radio, RadioGroup } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { setInntektslinjeOpptjentIPeriode } from '../../../../services/rest-service';
import { Inntektslinje } from '../../../refusjon';

interface Props {
    inntekt: Inntektslinje;
    korreksjonId?: string;
    kvitteringVisning: boolean;
}

const InntektValg: FunctionComponent<Props> = (props) => {
    let inntektValg = 'Ikke valgt';
    if (props.inntekt.erOpptjentIPeriode) inntektValg = 'ja';
    if (props.inntekt.erOpptjentIPeriode === false) inntektValg = 'nei';

    return (
        <td>
            {!props.kvitteringVisning && (
                <RadioGroup legend="" className="inntektsmelding__Inntekt_valg_radio_group" value={inntektValg}>
                    <Radio
                        value="ja"
                        checked={props.inntekt.erOpptjentIPeriode}
                        onChange={() => {
                            setInntektslinjeOpptjentIPeriode(props.korreksjonId!!, props.inntekt.id, true);
                        }}
                        name={props.inntekt.id}
                    >
                        Ja
                    </Radio>
                    <Radio
                        value="nei"
                        checked={
                            typeof props.inntekt.erOpptjentIPeriode === 'boolean' && !props.inntekt.erOpptjentIPeriode
                        }
                        onChange={() => {
                            setInntektslinjeOpptjentIPeriode(props.korreksjonId!!, props.inntekt.id, false);
                        }}
                        name={props.inntekt.id}
                    >
                        Nei
                    </Radio>
                </RadioGroup>
            )}
            {props.kvitteringVisning && (
                <div className="inntektsmelding__valgtInntekt">
                    {props.inntekt.erOpptjentIPeriode && <label>Ja</label>}
                    {props.inntekt.erOpptjentIPeriode === false && <label>Nei</label>}
                    {(props.inntekt.erOpptjentIPeriode === undefined || props.inntekt.erOpptjentIPeriode === null) && (
                        <label>Ikke valgt</label>
                    )}
                </div>
            )}
        </td>
    );
};
export default InntektValg;
