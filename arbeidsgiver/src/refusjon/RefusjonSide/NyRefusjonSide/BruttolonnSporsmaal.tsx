import { Refusjon, tiltakstypeTekst } from '~/types';
import React, { useState } from 'react';
import { debounce, Radio, RadioGroup, TextField, VStack } from '@navikt/ds-react';
import { endreBruttolønn } from '@/services/rest-service';
import { sumInntekterOpptjentIPeriode } from '@/utils/inntekterUtiles';
import { formatterPenger } from '~/utils/PengeUtils';

interface Props {
    refusjon: Refusjon;
    setVisRefusjonInnsending: (vis: boolean) => void;
}

const BruttolonnSporsmaal = (props: Props) => {
    const {
        refusjon: { id, sistEndret, refusjonsgrunnlag, harTattStillingTilAlleInntektslinjer },
        setVisRefusjonInnsending,
    } = props;
    const { inntektsgrunnlag, inntekterKunFraTiltaket, endretBruttoLønn } = refusjonsgrunnlag;

    const [harAndreRefusjoner, setHarAndreRefusjoner] = useState<boolean | undefined>(
        typeof inntekterKunFraTiltaket === 'boolean' ? !inntekterKunFraTiltaket : undefined
    );
    const [bruttolønnErKorrekt, setBruttolønnErKorrekt] = useState<boolean | undefined>(
        inntekterKunFraTiltaket === undefined ? undefined : endretBruttoLønn === undefined
    );
    const [bruttolønn, setBruttolønn] = useState(endretBruttoLønn?.toString() ?? '');
    const lagreBruttolønn = debounce(endreBruttolønn, 100);
    const maksBruttolønn = inntektsgrunnlag ? sumInntekterOpptjentIPeriode(inntektsgrunnlag) : 0;

    if (!inntektsgrunnlag || harTattStillingTilAlleInntektslinjer) {
        return null;
    }

    return (
        <VStack gap="space-12">
            <RadioGroup
                legend={`Er noen av de valgte inntektene tilknyttet andre refusjoner for ${
                    tiltakstypeTekst[refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]
                }?`}
                onChange={(verdi: boolean) => {
                    setHarAndreRefusjoner(verdi);
                    setBruttolønnErKorrekt(undefined);
                    setVisRefusjonInnsending(false);
                }}
                size="small"
                value={harAndreRefusjoner}
            >
                <Radio value={true}>Ja</Radio>
                <Radio value={false}>Nei</Radio>
            </RadioGroup>
            {typeof harAndreRefusjoner === 'boolean' && (
                <RadioGroup
                    legend="Er utregnet bruttolønn korrekt?"
                    onChange={(verdi: boolean) => {
                        setBruttolønnErKorrekt(verdi);
                        if (verdi) {
                            setBruttolønn('');
                            lagreBruttolønn(id, !harAndreRefusjoner, sistEndret, undefined);
                            setVisRefusjonInnsending(true);
                        } else {
                            setVisRefusjonInnsending(false);
                        }
                    }}
                    size="small"
                    value={bruttolønnErKorrekt}
                >
                    <Radio value={true}>Ja</Radio>
                    <Radio value={false}>Nei</Radio>
                </RadioGroup>
            )}
            {bruttolønnErKorrekt === false && (
                <TextField
                    error={
                        bruttolønn && Number(bruttolønn) > maksBruttolønn
                            ? `Beløpet må være ${formatterPenger(maksBruttolønn)} eller lavere.`
                            : undefined
                    }
                    htmlSize={18}
                    inputMode="numeric"
                    label="Skriv inn korrekt bruttolønn for perioden"
                    onBlur={() => {
                        if (bruttolønn && Number(bruttolønn) <= maksBruttolønn) {
                            lagreBruttolønn(id, !harAndreRefusjoner, sistEndret, Number(bruttolønn));
                            setVisRefusjonInnsending(true);
                        }
                    }}
                    onChange={(event) => {
                        if (/^\d*$/.test(event.currentTarget.value)) {
                            setBruttolønn(event.currentTarget.value);
                            setVisRefusjonInnsending(false);
                        }
                    }}
                    size="small"
                    value={bruttolønn}
                />
            )}
        </VStack>
    );
};
export default BruttolonnSporsmaal;
