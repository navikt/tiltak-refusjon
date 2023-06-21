import { Radio } from 'nav-frontend-skjema';
import { ChangeEvent, FunctionComponent } from 'react';
import { setInntektslinjeOpptjentIPeriode } from '../../../../services/rest-service';
import { Inntektslinje } from '../../../refusjon';

interface Props {
    inntekt: Inntektslinje;
    refusjonId: string;
    kvitteringVisning: boolean;
}

const InntektValg: FunctionComponent<Props> = ({ inntekt, kvitteringVisning, refusjonId }: Props) => {
    const { erOpptjentIPeriode } = inntekt;

    const setInntektslinje = (
        refusjonId: string,
        inntektslinjeId: string,
        erOpptjentIPeriode: boolean
    ): Promise<void> =>
        setInntektslinjeOpptjentIPeriode(refusjonId, inntektslinjeId, erOpptjentIPeriode).catch((err) =>
            console.error('err ', err)
        );

    const inntektValg = () => {
        switch (inntekt.erOpptjentIPeriode) {
            case true:
                return 'Ja';
            case false:
                return 'Nei';
            default:
                return 'Ikke valgt';
        }
    };

    return (
        <td>
            {!kvitteringVisning && (
                <div className="inntektsmelding__inntektsvalg">
                    <Radio
                        label="Ja"
                        checked={erOpptjentIPeriode}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            event.preventDefault();
                            return setInntektslinje(refusjonId, inntekt.id, true);
                        }}
                        name={inntekt.id}
                    />
                    <Radio
                        label="Nei"
                        checked={typeof erOpptjentIPeriode === 'boolean' && !erOpptjentIPeriode}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            event.preventDefault();
                            return setInntektslinje(refusjonId, inntekt.id, false);
                        }}
                        name={inntekt.id}
                    />
                </div>
            )}
            {kvitteringVisning && (
                <div className="inntektsmelding__valgtInntekt">
                    <label>{inntektValg()}</label>
                </div>
            )}
        </td>
    );
};
export default InntektValg;
