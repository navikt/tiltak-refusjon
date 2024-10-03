import React from 'react';
import { Filter, RefusjonsAktor } from './FilterContext';
import { SøkeInput } from './SøkeInput';
import { AktivSøk, tomtSøkeInput } from './VisRefusjonerFilter';

interface SøkeValg {
    value: keyof RefusjonsAktor;
    label: string;
    input: React.ReactNode;
}

interface Props {
    inputKey: number;
    aktivSøketype: AktivSøk | undefined;
    oppdaterFilter: (nyttFilter: Partial<Filter>) => void;
}

export const søkevalg = (props: Props): SøkeValg[] => {
    const { inputKey, aktivSøketype, oppdaterFilter } = props;

    return [
        {
            value: 'veilederNavIdent',
            label: 'På en veileder',
            input: (
                <SøkeInput
                    key={inputKey}
                    utførSøk={(søkeord) => {
                        oppdaterFilter({
                            ...tomtSøkeInput,
                            veilederNavIdent: søkeord,
                        });
                    }}
                    feiletSøk={() => oppdaterFilter(tomtSøkeInput)}
                    valider={(verdi: string) =>
                        verdi.search(/^[A-Z]\d{6}$/) === -1 ? 'Ikke gyldig NAV-ident' : undefined
                    }
                    textFieldProps={{ placeholder: 'NAV-ident', maxLength: 7, label: '' }}
                    tidligereSok={aktivSøketype?.søkeVerdi}
                />
            ),
        },
        {
            value: 'deltakerFnr',
            label: 'På en deltaker',
            input: (
                <SøkeInput
                    key={inputKey}
                    utførSøk={(søkeord) => {
                        oppdaterFilter({ ...tomtSøkeInput, deltakerFnr: søkeord });
                    }}
                    feiletSøk={() => oppdaterFilter(tomtSøkeInput)}
                    valider={(verdi: string) =>
                        verdi.search(/^\d{11}$/) === -1 ? 'Ikke gyldig fødselsnummer' : undefined
                    }
                    textFieldProps={{ placeholder: 'Fødselsnummer', maxLength: 11, label: '' }}
                    tidligereSok={aktivSøketype?.søkeVerdi}
                />
            ),
        },
        {
            value: 'bedriftNr',
            label: 'På en virksomhet',
            input: (
                <SøkeInput
                    key={inputKey}
                    utførSøk={(søkeord) => {
                        oppdaterFilter({ ...tomtSøkeInput, bedriftNr: søkeord });
                    }}
                    feiletSøk={() => oppdaterFilter(tomtSøkeInput)}
                    valider={(verdi: string) =>
                        verdi.search(/^\d{9}$/) === -1 ? 'Ikke gyldig virksomhetsnummer' : undefined
                    }
                    textFieldProps={{ placeholder: 'Virksomhetsnummer', maxLength: 9, label: '' }}
                    tidligereSok={aktivSøketype?.søkeVerdi}
                />
            ),
        },
        {
            value: 'enhet',
            label: 'På en enhet',
            input: (
                <SøkeInput
                    key={inputKey}
                    utførSøk={(søkeord) => {
                        oppdaterFilter({ ...tomtSøkeInput, enhet: søkeord });
                    }}
                    feiletSøk={() => oppdaterFilter(tomtSøkeInput)}
                    valider={(verdi: string) =>
                        verdi.search(/^\d{4}$/) === -1 ? 'Ikke gyldig enhetsnummer' : undefined
                    }
                    textFieldProps={{ placeholder: 'Enhet (4 siffer)', maxLength: 4, label: '' }}
                    tidligereSok={aktivSøketype?.søkeVerdi}
                />
            ),
        },
        {
            value: 'avtaleNr',
            label: 'På et avtalenummer',
            input: (
                <SøkeInput
                    key={inputKey}
                    utførSøk={(søkeord) => {
                        oppdaterFilter({ ...tomtSøkeInput, avtaleNr: søkeord });
                    }}
                    feiletSøk={() => oppdaterFilter(tomtSøkeInput)}
                    valider={(verdi: string) =>
                        verdi.search('^[0-9]*$') === -1 ? 'Ikke gyldig avtalenummer' : undefined
                    }
                    textFieldProps={{ placeholder: 'Avtalenummer', maxLength: 7, label: '' }}
                    tidligereSok={aktivSøketype?.søkeVerdi}
                />
            ),
        },
    ];
};
