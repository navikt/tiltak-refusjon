import {
    Accordion,
    BodyShort,
    FileObject,
    FileRejected,
    FileRejectionReason,
    FileUpload,
    Heading,
    Table,
    TextField,
    UNSAFE_Combobox,
    VStack,
} from '@navikt/ds-react';
import { useState } from 'react';
import EksternLenke from '~/EksternLenke/EksternLenke';
import { Refusjon } from '~/types';
import { avtaleLenke } from '~/utils/lenkeUtils';
import VerticalSpacer from '~/VerticalSpacer';
import { formatterPenger } from '~/utils/PengeUtils';

import { AvtaltUtgift, beløpFeilmelding, UtgiftBeløp } from './utgifter';
import { formaterDato } from '~/utils/datoUtils';

const MAKS_FILSTØRRELSE_MB = 50;

const avvisningsmeldinger: Record<FileRejectionReason, string> = {
    fileType: 'Filformatet støttes ikke. Du kan bare laste opp PDF.',
    fileSize: `Filen er større enn ${MAKS_FILSTØRRELSE_MB} MB.`,
};

const lagAvvisningsmelding = (reason: string): string => avvisningsmeldinger[reason as FileRejectionReason] ?? reason;

interface Props {
    refusjon: Refusjon;
    utgifter: AvtaltUtgift[];
    valgteUtgiftsnavn: string[];
    setValgteUtgiftsnavn: (navn: string[]) => void;
    beløp: UtgiftBeløp;
    setBeløp: (navn: string, verdi: string) => void;
    sumUtgifter: number;
}

const Filopplastning = ({
    refusjon,
    utgifter,
    valgteUtgiftsnavn,
    setValgteUtgiftsnavn,
    beløp,
    setBeløp,
    sumUtgifter,
}: Props) => {
    const valgteUtgifter = utgifter.filter((utgift) => valgteUtgiftsnavn.includes(utgift.navn));

    const [files, setFiles] = useState<FileObject[]>([]);
    const acceptedFiles = files.filter((f) => !f.error);
    const rejectedFiles = files.filter((f): f is FileRejected => f.error);

    return (
        <VStack gap="space-48" maxWidth="60rem">
            <VStack gap="space-16" maxWidth="40rem">
                <FileUpload.Dropzone
                    label="Last opp dokumentasjon"
                    description="Last opp kvittering eller faktura som dokumenterer utgiftene"
                    accept=".pdf"
                    maxSizeInBytes={MAKS_FILSTØRRELSE_MB * 1024 * 1024}
                    fileLimit={{ max: 20, current: acceptedFiles.length }}
                    onSelect={(newFiles) => setFiles([...files, ...newFiles])}
                    validator={(file: File) => {
                        if (acceptedFiles.some((f) => f.file.name === file.name)) {
                            return 'Filen eksisterer allerede';
                        }
                        return true;
                    }}
                />
                {acceptedFiles.length > 0 && (
                    <VStack gap="space-8">
                        <Heading level="2" size="xsmall">
                            {`Vedlegg (${acceptedFiles.length})`}
                        </Heading>
                        <VStack as="ul" gap="space-12">
                            {acceptedFiles.map((file) => (
                                <FileUpload.Item
                                    as="li"
                                    key={`${file.file.name}-${file.file.size}-${file.file.lastModified}`}
                                    file={file.file}
                                    button={{
                                        action: 'delete',
                                        onClick: () => setFiles(files.filter((f) => f !== file)),
                                    }}
                                />
                            ))}
                        </VStack>
                    </VStack>
                )}
                {rejectedFiles.length > 0 && (
                    <VStack gap="space-8">
                        <Heading level="2" size="xsmall">
                            Vedlegg med feil
                        </Heading>
                        <VStack as="ul" gap="space-12">
                            {rejectedFiles.map((rejected) => (
                                <FileUpload.Item
                                    as="li"
                                    key={`${rejected.file.name}-${rejected.file.size}-${rejected.file.lastModified}`}
                                    file={rejected.file}
                                    error={lagAvvisningsmelding(rejected.reasons[0])}
                                    button={{
                                        action: 'delete',
                                        onClick: () => setFiles(files.filter((file) => file !== rejected)),
                                    }}
                                />
                            ))}
                        </VStack>
                    </VStack>
                )}
            </VStack>
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
                            <Table.Row key={utgift.navn}>
                                <Table.DataCell>{utgift.navn}</Table.DataCell>
                                <Table.DataCell>
                                    {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleFom
                                        ? formaterDato(refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleFom, 'yyyy')
                                        : '-'}
                                </Table.DataCell>
                                <Table.DataCell>
                                    <TextField
                                        label={`Sum for ${utgift.navn}`}
                                        hideLabel
                                        size="small"
                                        inputMode="decimal"
                                        value={beløp[utgift.navn] ?? ''}
                                        onChange={(e) => setBeløp(utgift.navn, e.target.value)}
                                        error={beløpFeilmelding(beløp[utgift.navn], 99999999)}
                                    />
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                        <Table.Row>
                            <Table.HeaderCell>Sum utgifter</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>{formatterPenger(sumUtgifter)}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </VStack>
            <VStack>
                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header>Jeg finner ikke utgiftene jeg leter etter</Accordion.Header>
                        <Accordion.Content>
                            Detaljer om hvilke utgifter som dekkes av tilskuddet, finnes i{' '}
                            <EksternLenke
                                href={avtaleLenke(
                                    refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleId,
                                    'ARBEIDSGIVER'
                                )}
                            >
                                avtalen om inkluderingstilskudd.
                            </EksternLenke>
                            <VerticalSpacer rem={1} />
                            Dersom du ønsker refusjon for utgifter som ikke er avtalt på forhånd, må du ta kontakt med
                            Nav for å inkludere disse i avtalen før det evt. kan søkes om refusjon.
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>Hva menes med “ferdigstilt”?</Accordion.Header>
                        <Accordion.Content>
                            Dersom det ikke skal legges til flere utgifter på en post i fremtiden (feks. at det er kjøpt
                            inn en stol på posten “kontorstol”), merkes posten som “ferdigstilt”. Slik at resterende
                            midler fristilles.
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </VStack>
        </VStack>
    );
};

export default Filopplastning;
