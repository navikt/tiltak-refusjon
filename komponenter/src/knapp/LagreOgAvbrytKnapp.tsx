import React, { FunctionComponent, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { Alert, Button, ButtonProps, HStack, VStack } from '@navikt/ds-react';
import { Nettressurs, Status } from '~/nettressurs';
import { handterFeil } from '~/utils/apiFeilUtils';

type Props = {
    lagreFunksjon: () => Promise<void>;
    avbryt: () => void;
} & HTMLAttributes<HTMLDivElement>;

const LagreOgAvbrytKnapp: FunctionComponent<Props & ButtonProps> = (props) => {
    const [oppslag, setOppslag] = useState<Nettressurs<void>>({ status: Status.IkkeLastet });
    const [feilmelding, setFeilmelding] = useState('');

    // Fungerer i praksis som "omit avbryt og lagrefunksjon"
    const { avbryt, lagreFunksjon, ...knappBaseProps } = props;

    const feilRef = useRef<HTMLDivElement>(null);

    const onClick = async () => {
        try {
            setOppslag({ status: Status.LasterInn });
            await lagreFunksjon();
            setOppslag({ status: Status.Sendt });
        } catch (error) {
            const visFeil = (melding: string) => {
                setOppslag({ status: Status.Feil, error: melding });
                setFeilmelding(melding);
            };
            if (error instanceof Error) {
                try {
                    handterFeil(error, visFeil);
                } catch {
                    visFeil(error.message || 'Det har skjedd en uventet feil');
                }
            } else {
                const melding =
                    !!error && typeof error === 'object' && 'feilmelding' in error
                        ? (error.feilmelding as string)
                        : 'Uventet feil';
                visFeil(melding);
            }
        }
    };

    useEffect(() => {
        if (oppslag.status === Status.Feil) {
            feilRef.current?.focus();
        }
    }, [oppslag.status]);

    return (
        <VStack gap="space-12" align="end">
            <HStack gap="space-12">
                <Button variant="secondary" onClick={avbryt}>
                    Avbryt
                </Button>
                <Button
                    loading={oppslag.status === Status.LasterInn}
                    disabled={oppslag.status === Status.LasterInn}
                    onClick={onClick}
                    {...knappBaseProps}
                ></Button>
            </HStack>
            {oppslag.status === Status.Feil && (
                <Alert variant="warning" size="small">
                    <div ref={feilRef} aria-live="polite">
                        {feilmelding}
                    </div>
                </Alert>
            )}
        </VStack>
    );
};

export default LagreOgAvbrytKnapp;
