import React, { FunctionComponent } from 'react';
import { ExpansionCard, RadioGroup, Radio } from '@navikt/ds-react';
import { Tiltak } from '~/types/tiltak';
import { Filter } from '~/types/filter';

interface OptionProps {
    value: string;
    label?: string;
    hidden?: boolean;
}

interface Props {
    filter: Filter;
    oppdaterFilter: (nyttFilter: Partial<Filter>) => void;
    options: { erArbeidsgiver: boolean; harKorreksjonTilgang: boolean; skjulVTAO: boolean };
}

const TiltakFilter: FunctionComponent<Props> = ({ filter, oppdaterFilter, options }) => {
    const refusjonFilterTiltak: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: Tiltak.MIDLERTIDIG_LØNNSTILSKUDD, label: 'Midlertidig lønnstilskudd' },
        { value: Tiltak.VARIG_LØNNSTILSKUDD, label: 'Varig lønnstilskudd' },
        { value: Tiltak.SOMMERJOBB, label: 'Sommerjobb' },
        {
            value: Tiltak.VTAO,
            label: 'Varig tilrettelagt arbeid i ordinær virksomhet (VTA-O)',
            hidden: options.skjulVTAO,
        },
    ];

    return (
        <div role="menubar" aria-label="meny for filtrering av refusjoner">
            <ExpansionCard size="small" aria-label="Small-variant" defaultOpen={true}>
                <ExpansionCard.Header>
                    <ExpansionCard.Title size="small">Tiltakstype</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <RadioGroup
                        size="small"
                        legend=""
                        value={filter.tiltakstype === undefined ? '' : filter.tiltakstype}
                    >
                        {refusjonFilterTiltak
                            .filter((option: OptionProps) => {
                                return !option.hidden;
                            })
                            .map((option: OptionProps, index: number) => (
                                <Radio
                                    key={index}
                                    role="radio"
                                    value={option.value}
                                    onChange={(event) => {
                                        const nyTiltaktype = event.currentTarget.value as Tiltak;
                                        oppdaterFilter({ tiltakstype: nyTiltaktype || undefined });
                                    }}
                                >
                                    {option.value === '' ? 'Alle' : option.label}
                                </Radio>
                            ))}
                    </RadioGroup>
                </ExpansionCard.Content>
            </ExpansionCard>
        </div>
    );
};

export default TiltakFilter;
