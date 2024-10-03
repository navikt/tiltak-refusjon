import React, { FunctionComponent } from 'react';
import { ExpansionCard, RadioGroup, Radio } from '@navikt/ds-react';
import { RefusjonStatus, Tiltak } from '../refusjon';
import { useFilter } from './FilterContext';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import VisRefusjonerFilter from './VisRefusjonerFilter';
import { useInnloggetBruker } from '../../bruker/BrukerContext';
import { BrukerContextType } from '../../bruker/BrukerContextType';

interface OptionProps {
    value: string;
    label?: string;
    hidden?: boolean;
}

const Filtermeny: FunctionComponent = () => {
    const { filter, oppdaterFilter } = useFilter();
    const brukerContext: BrukerContextType = useInnloggetBruker();

    const refusjonFilterStatus: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: RefusjonStatus.FOR_TIDLIG, label: 'For tidlig' },
        { value: RefusjonStatus.KLAR_FOR_INNSENDING, label: 'Klar for Innsending' },
        { value: RefusjonStatus.ANNULLERT, label: 'Annullert' },
        { value: RefusjonStatus.SENDT_KRAV, label: 'Sendt Krav' },
        { value: RefusjonStatus.UTBETALT, label: 'Utbetalt' },
        { value: RefusjonStatus.UTGÅTT, label: 'Utgått' },
        {
            value: RefusjonStatus.KORRIGERT,
            label: 'Korrigert',
            hidden: !brukerContext.innloggetBruker.harKorreksjonTilgang,
        },
    ];

    const refusjonFilterTiltak: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: Tiltak.MIDLERTIDIG_LØNNSTILSKUDD, label: 'Midlertidig lønnstilskudd' },
        { value: Tiltak.VARIG_LØNNSTILSKUDD, label: 'Varig lønnstilskudd' },
        { value: Tiltak.SOMMERJOBB, label: 'Sommerjobb' },
    ];

    return (
        <div role="menubar" aria-label="meny for filtrering av refusjoner">
            <VisRefusjonerFilter />
            <VerticalSpacer rem={1.25} />
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
            <VerticalSpacer rem={1.25} />
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
                        {refusjonFilterTiltak.map((option: OptionProps, index: number) => (
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
            <VerticalSpacer rem={1.25} />
        </div>
    );
};

export default Filtermeny;
