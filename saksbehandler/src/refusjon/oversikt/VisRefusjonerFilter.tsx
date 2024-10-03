import React, { FunctionComponent, useState, Fragment, useEffect } from 'react';
import { ExpansionCard, RadioGroup, Radio } from '@navikt/ds-react';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { Filter, RefusjonsAktor, useFilter } from './FilterContext';
import { søkevalg } from './søkeValg';

export interface AktivSøk {
    type: keyof RefusjonsAktor;
    søkeVerdi?: string;
}

export const tomtSøkeInput: Partial<Filter> = {
    veilederNavIdent: undefined,
    deltakerFnr: undefined,
    bedriftNr: undefined,
    enhet: undefined,
    avtaleNr: undefined,
};

const VisRefusjonerFilter: FunctionComponent = () => {
    const { filter, oppdaterFilter, sjekkFilterContextForSøkeVerdier } = useFilter();
    const [aktivSøketype, setAktivSøketype] = useState<AktivSøk | undefined>(sjekkFilterContextForSøkeVerdier(filter));
    const [inputKey, setInputKey] = useState(0); // Brukes for å unmounte søkeinput ved endring av søkevalg, slik at søkeord tømmes

    useEffect(() => {
        const søketreff = sjekkFilterContextForSøkeVerdier(filter);
        if (søketreff) {
            setAktivSøketype(søketreff);
        }
    }, [filter, sjekkFilterContextForSøkeVerdier]);

    return (
        <>
            <ExpansionCard size="small" aria-label="Small-variant" defaultOpen={true}>
                <ExpansionCard.Header>
                    <ExpansionCard.Title size="small">Vis refusjoner</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <RadioGroup
                        size="small"
                        legend=""
                        value={
                            aktivSøketype === undefined
                                ? setAktivSøketype({ type: 'veilederNavIdent', søkeVerdi: undefined })
                                : aktivSøketype.type
                        }
                    >
                        {søkevalg({ inputKey, aktivSøketype, oppdaterFilter }).map((it) => (
                            <Radio
                                key={it.value}
                                name="aktivSøketype"
                                value={it.value}
                                onChange={() => {
                                    setAktivSøketype({ type: it.value, søkeVerdi: undefined });
                                    setInputKey(inputKey + 1); // Brukes for å unmounte søkeinput, slik at søkeord tømmes
                                    oppdaterFilter(tomtSøkeInput);
                                }}
                                role="radio"
                                style={{ marginBottom: '1rem' }}
                            >
                                {it.label}
                            </Radio>
                        ))}
                    </RadioGroup>
                    <VerticalSpacer rem={1} />
                    {
                        søkevalg({ inputKey, aktivSøketype, oppdaterFilter }).find(
                            (it) => it.value === aktivSøketype?.type
                        )?.input
                    }
                </ExpansionCard.Content>
            </ExpansionCard>
        </>
    );
};

export default VisRefusjonerFilter;
