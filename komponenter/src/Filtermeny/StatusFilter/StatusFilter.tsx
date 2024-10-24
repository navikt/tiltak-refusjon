import React, { FunctionComponent } from 'react';
import { ExpansionCard, RadioGroup, Radio } from '@navikt/ds-react';
import { Filter } from '~/types/filter';
import { RefusjonStatus } from '~/types/status';

interface Props {
    filter: Filter;
    oppdaterFilter: (nyttFilter: Partial<Filter>) => void;
    brukerContext: any;
}

const StatusFilter: FunctionComponent<Props> = ({filter, oppdaterFilter, brukerContext}) => {

    interface OptionProps {
        value: string;
        label?: string;
        hidden?: boolean;
    }
    
    const refusjonFilterStatus: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: RefusjonStatus.FOR_TIDLIG, label: 'For tidlig' },
        { value: RefusjonStatus.KLAR_FOR_INNSENDING, label: 'Klar for Innsending' },
        { value: RefusjonStatus.ANNULLERT, label: 'Annullert' },
        { value: RefusjonStatus.SENDT_KRAV, label: 'Sendt Krav' },
        { value: RefusjonStatus.UTBETALT, label: 'Utbetalt' },
        { value: RefusjonStatus.UTGÅTT, label: 'Frist utgått' },
        { value: RefusjonStatus.UTBETALING_FEILET, label: 'Utbetaling feilet'},
        {
            value: RefusjonStatus.KORRIGERT,
            label: 'Korrigert',
            hidden: !brukerContext.innloggetBruker.harKorreksjonTilgang,
        },
    ];

    return (

<ExpansionCard size="small" aria-label="Small-variant" defaultOpen={true}>
<ExpansionCard.Header>
    <ExpansionCard.Title size="small">Status</ExpansionCard.Title>
</ExpansionCard.Header>
<ExpansionCard.Content>
    <RadioGroup size="small" legend="" value={filter.status === undefined ? '' : filter.status}>
        {refusjonFilterStatus
            .filter((option: OptionProps) => {
                return !option.hidden;
            })
            .map((option: OptionProps, index: number) => (
                <Radio
                    key={index}
                    role="radio"
                    value={option.value}
                    onChange={(event) => {
                        const nyStatus = event.currentTarget.value as RefusjonStatus;
                        oppdaterFilter({ status: nyStatus || undefined });
                    }}
                >
                    {option.value === '' ? 'Alle' : option.label}
                </Radio>
            ))}
    </RadioGroup>
</ExpansionCard.Content>
</ExpansionCard>
    )
}
export default StatusFilter;