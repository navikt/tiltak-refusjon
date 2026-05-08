import type { FunctionComponent } from 'react';
import { Button } from '@navikt/ds-react';
import { FileIcon } from '@navikt/aksel-icons';

const LagreSomPdfKnapp: FunctionComponent<{ avtaleId: string }> = (props) => {
    const href = `/api/arbeidsgiver/refusjon/${props.avtaleId}/pdf`;
    return (
        <Button
            style={{ minWidth: '12rem' }}
            icon={<FileIcon aria-hidden />}
            variant="secondary"
            onClick={() => {
                window.open(href);
            }}
        >
            Lagre som PDF
        </Button>
    );
};

export default LagreSomPdfKnapp;
