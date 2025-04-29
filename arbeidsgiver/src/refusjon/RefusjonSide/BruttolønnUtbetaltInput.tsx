import React, { Dispatch, SetStateAction, useState } from 'react';
import { Alert, TextField } from '@navikt/ds-react';

import { sumInntekterOpptjentIPeriode } from '@/utils/inntekterUtiles';
import VerticalSpacer from '~/VerticalSpacer';
import { Inntektsgrunnlag, Refusjon } from '~/types/refusjon';
import BEMHelper from '~/utils/bem';
import { tiltakstypeTekst } from '~/types/messages';

interface Props {
    refusjon: Refusjon;
    inntektsgrunnlag: Inntektsgrunnlag;
    endreBruttolønn: (value: number) => void;
    setVisRefusjonInnsending: Dispatch<SetStateAction<boolean>>;
}

const BruttolønnUtbetaltInput = (props: Props) => {
    const {
        refusjon,
        inntektsgrunnlag,
        endreBruttolønn,
        setVisRefusjonInnsending,
    } = props;
    const cls = BEMHelper('refusjonside');
    const sumInntekterOpptjent: number = sumInntekterOpptjentIPeriode(inntektsgrunnlag);
    const { tilskuddsgrunnlag } = refusjon.refusjonsgrunnlag;
    const [lokalBruttolønnVerdi, setLokalBruttolønnVerdi] = useState('');
    const [feilmelding, setFeilmelding] = useState('');
    return (
        <>
            <TextField
                className={cls.element('bruttolønn-utbetalt-for-periode')}
                size="small"
                inputMode="numeric"
                style={feilmelding.trim().length > 0 ? { borderColor: 'red', borderWidth: 'thick' } : {}}
                label={`Skriv inn bruttolønn utbetalt for perioden med ${
                    tiltakstypeTekst[tilskuddsgrunnlag.tiltakstype]
                }`}
                onChange={(event) => {
                    const verdi: string = event.currentTarget.value;

                    setLokalBruttolønnVerdi(verdi);

                    if (verdi.trim().length > 0 && !verdi.match(/^\d*$/)) {
                        setLokalBruttolønnVerdi(lokalBruttolønnVerdi);
                        setVisRefusjonInnsending(false);
                        return;
                    }
                    if (verdi.trim().length > 0 && verdi.match(/^\d*$/) && parseInt(verdi, 10) > sumInntekterOpptjent) {
                        setFeilmelding(
                            `Beløpet er høyre enn sum bruttolønn. Det må være det samme eller lavere enn ${sumInntekterOpptjent} kr.`
                        );
                        setVisRefusjonInnsending(false);
                        return;
                    }

                    setFeilmelding('');
                    if (verdi.trim().length === 0) setVisRefusjonInnsending(false);
                }}
                onBlur={(event) => {
                    let verdi: string = event.currentTarget.value;
                    if (feilmelding.trim().length !== 0) {
                        verdi = '0';
                        setVisRefusjonInnsending(false);
                    } else {
                        setVisRefusjonInnsending(true);
                    }
                    endreBruttolønn(parseInt(verdi, 10));
                }}
                value={lokalBruttolønnVerdi}
            />
            {feilmelding.trim().length > 0 && (
                <div>
                    <VerticalSpacer rem={0.5} />
                    <Alert variant="warning" size="small">
                        {feilmelding}
                    </Alert>
                </div>
            )}
        </>
    );
};
export default BruttolønnUtbetaltInput;
