import { BodyShort, Heading, Table, UNSAFE_Combobox, VStack } from '@navikt/ds-react';

import { Refusjon } from '~/types';
import { formaterDato } from '~/utils/datoUtils';
import { formatterPenger } from '~/utils/PengeUtils';
import TallInput from '@/komponenter/tall-input/TallInput';

import { AvtaltUtgift, UtgiftBeløp } from './utgifter';

interface Props {
    refusjon: Refusjon;
    utgifter: AvtaltUtgift[];
    valgteUtgiftsnavn: string[];
    setValgteUtgiftsnavn: (navn: string[]) => void;
    beløp: UtgiftBeløp;
    setBeløp: (id: string, verdi?: number) => void;
}

const DokumenterteUtgifter = ({
    refusjon,
    utgifter,
    valgteUtgiftsnavn,
    setValgteUtgiftsnavn,
    beløp,
    setBeløp,
}: Props) => {
    const valgteUtgifter = utgifter.filter((utgift) => valgteUtgiftsnavn.includes(utgift.navn));
    const sumBeløp = valgteUtgifter.reduce((sum, utgift) => sum + (beløp[utgift.id] ?? 0), 0);

    return (
        <VStack gap="space-48">
            <VStack maxWidth="25rem" gap="space-16">
                <UNSAFE_Combobox
                    label="Utgifter"
                    description="Velg hvilke utgifter dokumentasjonen gjelder for"
                    options={utgifter.map((utgift) => utgift.navn)}
                    isMultiSelect
                    selectedOptions={valgteUtgiftsnavn}
                    onToggleSelected={(selected, isSelected) =>
                        isSelected
                            ? setValgteUtgiftsnavn([...valgteUtgiftsnavn, selected])
                            : setValgteUtgiftsnavn(valgteUtgiftsnavn.filter((navn) => navn !== selected))
                    }
                    allowNewValues={false}
                />
            </VStack>
            <VStack maxWidth="40rem" gap="space-16">
                <Heading level="2" size="small">
                    Dokumenterte utgifter
                </Heading>
                <BodyShort>Fyll ut utgifter slik de fremgår i dokumentasjonen</BodyShort>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Beskrivelse</Table.HeaderCell>
                            <Table.HeaderCell>Periode</Table.HeaderCell>
                            <Table.HeaderCell>Sum</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {valgteUtgifter.map((utgift) => (
                            <Table.Row key={utgift.id}>
                                <Table.DataCell>{utgift.navn}</Table.DataCell>
                                <Table.DataCell>
                                    {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleFom
                                        ? formaterDato(refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleFom, 'yyyy')
                                        : '-'}
                                </Table.DataCell>
                                <Table.DataCell>
                                    <TallInput
                                        name={`utgift-${utgift.id}`}
                                        label={`Sum for ${utgift.navn}`}
                                        hideLabel
                                        size="small"
                                        min={0}
                                        maks={99999999}
                                        verdi={beløp[utgift.id]}
                                        settVerdi={(verdi) => setBeløp(utgift.id, verdi)}
                                    />
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                        <Table.Row>
                            <Table.HeaderCell>Sum utgifter</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>{formatterPenger(sumBeløp)}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </VStack>
        </VStack>
    );
};

export default DokumenterteUtgifter;
