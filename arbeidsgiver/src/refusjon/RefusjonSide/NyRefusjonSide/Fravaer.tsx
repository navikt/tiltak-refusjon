import { Refusjon, tiltakstypeTekst } from '~/types';
import React, { useState } from 'react';
import { BodyShort, debounce, Radio, RadioGroup, ReadMore, TextField, VStack } from '@navikt/ds-react';
import { settTidligereRefunderbarBeløp } from '@/services/rest-service';

interface Props {
    refusjon: Refusjon;
}

function Fravaer(props: Props) {
    const {
        refusjon: { id, sistEndret, refusjonsgrunnlag },
    } = props;
    const { fratrekkRefunderbarBeløp, refunderbarBeløp } = refusjonsgrunnlag;
    const [fratrekk, setFratrekk] = useState<boolean | undefined>(fratrekkRefunderbarBeløp);
    const [beløp, setBeløp] = useState(refunderbarBeløp?.toString() ?? '');
    const lagreFravær = debounce(settTidligereRefunderbarBeløp, 100);

    const velgFravær = (verdi: boolean) => {
        setFratrekk(verdi);
        if (!verdi) {
            setBeløp('');
        }
        lagreFravær(id, verdi, sistEndret, verdi ? refunderbarBeløp : undefined);
    };

    return (
        <VStack gap="space-8">
            <RadioGroup
                legend="Har deltaker hatt fravær med lønn som blir refundert av Nav i denne perioden?"
                onChange={velgFravær}
                size="small"
                value={fratrekk}
            >
                <Radio value={true}>Ja</Radio>
                <Radio value={false}>Nei</Radio>
            </RadioGroup>
            {fratrekk && (
                <TextField
                    htmlSize={18}
                    inputMode="numeric"
                    label="Refusjonsbeløpet på grunn av fravær"
                    onBlur={() => lagreFravær(id, true, sistEndret, beløp ? Number(beløp) : undefined)}
                    onChange={(event) => {
                        if (/^\d*$/.test(event.currentTarget.value)) {
                            setBeløp(event.currentTarget.value);
                        }
                    }}
                    size="small"
                    value={beløp}
                />
            )}
            <ReadMore header="Hva betyr dette?" size="small">
                <VStack gap="space-24">
                    <BodyShort>
                        Hvis dere har fått utbetalt refusjon for fravær, som sykepenger, må dette beløpet trekkes fra
                        refusjonen for {tiltakstypeTekst[refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}. Trekket skal
                        være det beløpet dere har fått fra Nav.
                    </BodyShort>
                    <BodyShort>
                        Aktuelle refusjoner fra Nav kan være sykepenger, foreldrepenger, omsorgspenger,
                        svangerskapspenger, opplæringspenger eller pleiepenger.
                    </BodyShort>
                </VStack>
            </ReadMore>
        </VStack>
    );
}

export default Fravaer;
