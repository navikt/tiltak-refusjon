import { FileObject, FileRejected, FileRejectionReason, FileUpload, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';

const MAKS_FILSTØRRELSE_MB = 50;

const avvisningsmeldinger: Record<FileRejectionReason, string> = {
    fileType: 'Filformatet støttes ikke. Du kan bare laste opp PDF.',
    fileSize: `Filen er større enn ${MAKS_FILSTØRRELSE_MB} MB.`,
};

const lagAvvisningsmelding = (reason: string): string => avvisningsmeldinger[reason as FileRejectionReason] ?? reason;

const Filopplastning = () => {
    const [files, setFiles] = useState<FileObject[]>([]);
    const acceptedFiles = files.filter((f) => !f.error);
    const rejectedFiles = files.filter((f): f is FileRejected => f.error);

    return (
        <VStack gap="space-16" maxWidth="40rem">
            <FileUpload.Dropzone
                label="Last opp dokumentasjon"
                description="Last opp kvittering eller faktura som dokumenterer utgiftene"
                accept=".pdf"
                maxSizeInBytes={MAKS_FILSTØRRELSE_MB * 1024 * 1024}
                fileLimit={{ max: 20, current: acceptedFiles.length }}
                onSelect={(newFiles) => setFiles([...files, ...newFiles])}
                validator={(file: File) => {
                    if (
                        acceptedFiles.some(
                            (f) =>
                                f.file.name === file.name &&
                                f.file.size === file.size &&
                                f.file.lastModified === file.lastModified
                        )
                    ) {
                        return 'Filen eksisterer allerede';
                    }
                    return true;
                }}
            />
            {acceptedFiles.length > 0 && (
                <VStack gap="space-8">
                    <Heading level="2" size="xsmall">
                        Vedlegg ({acceptedFiles.length})
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
    );
};

export default Filopplastning;
