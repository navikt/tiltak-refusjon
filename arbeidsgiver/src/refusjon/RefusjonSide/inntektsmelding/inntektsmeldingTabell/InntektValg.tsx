import React, { ChangeEvent, FunctionComponent } from 'react';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { FeilkodeError, setInntektslinjeOpptjentIPeriode } from '../../../../services/rest-service';

import { mutate } from 'swr';
import { Inntektslinje } from '~/types/refusjon';

interface Props {
    inntekt: Inntektslinje;
    refusjonId: string;
    kvitteringVisning: boolean;
    sistEndret: string;
}

const InntektValg: FunctionComponent<Props> = ({ inntekt, kvitteringVisning, refusjonId, sistEndret }: Props) => {
    const setInntektslinje = (
        refusjonId: string,
        inntektslinjeId: string,
        erOpptjentIPeriode: boolean,
        sistEndret: string
    ): Promise<void> =>
        setInntektslinjeOpptjentIPeriode(refusjonId, inntektslinjeId, erOpptjentIPeriode, sistEndret).catch(
            (err: FeilkodeError) => {
                if (err.message === 'SAMTIDIGE_ENDRINGER') {
                    mutate(`/refusjon/${refusjonId}`);
                }
                console.error('err ', err.message);
            }
        );

    let inntektValg = 'Ikke valgt';
    if (inntekt.erOpptjentIPeriode) inntektValg = 'Ja';
    if (inntekt.erOpptjentIPeriode === false) inntektValg = 'Nei';

    return (
        <td>
            {!kvitteringVisning && (
                <RadioGroup legend="" className="inntektsmelding__inntektsvalg" value={inntektValg}>
                    <Radio
                        value="Ja"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            event.preventDefault();
                            return setInntektslinje(refusjonId, inntekt.id, true, sistEndret);
                        }}
                        name={inntekt.id}
                    >
                        Ja
                    </Radio>
                    <Radio
                        value="Nei"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            event.preventDefault();
                            return setInntektslinje(refusjonId, inntekt.id, false, sistEndret);
                        }}
                        name={inntekt.id}
                    >
                        Nei
                    </Radio>
                </RadioGroup>
            )}
            {kvitteringVisning && (
                <div className="inntektsmelding__valgtInntekt">
                    <label>{inntektValg}</label>
                </div>
            )}
        </td>
    );
};
export default InntektValg;
