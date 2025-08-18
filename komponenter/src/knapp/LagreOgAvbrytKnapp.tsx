import React, { FunctionComponent, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { Alert, Button, ButtonProps } from '@navikt/ds-react';
import VerticalSpacer from '~/VerticalSpacer';
import { Nettressurs, Status } from '~/nettressurs';
import { handterFeil } from '~/utils/apiFeilUtils';

type Props = { lagreFunksjon: () => Promise<void>; avbryt: () => void } & HTMLAttributes<HTMLDivElement>;

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
        } catch (error: unknown) {
            if (error instanceof Error) {
                handterFeil(error, (melding) => {
                    setOppslag({ status: Status.Feil, error: melding });
                    setFeilmelding(melding);
                });
            } else {
                const feilmelding = error as string;
                setOppslag({ status: Status.Feil, error: feilmelding });
                setFeilmelding(feilmelding);
            }
        }
    };

    useEffect(() => {
        if (oppslag.status === Status.Feil) {
            feilRef.current?.focus();
        }
    }, [oppslag.status]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button style={{ padding: '0.5rem 3rem', marginRight: '0.5rem' }} variant="secondary" onClick={avbryt}>
                    Avbryt
                </Button>
                <Button
                    style={{ padding: '0.5rem 2.5rem' }}
                    loading={oppslag.status === Status.LasterInn}
                    disabled={oppslag.status === Status.LasterInn}
                    onClick={onClick}
                    {...knappBaseProps}
                ></Button>
            </div>
            {oppslag.status === Status.Feil && (
                <>
                    <VerticalSpacer rem={0.5} />
                    <Alert variant="warning" size="small">
                        <div ref={feilRef} aria-live="polite">
                            {feilmelding}
                        </div>
                    </Alert>
                </>
            )}
        </div>
    );
};

export default LagreOgAvbrytKnapp;
