import React, { FunctionComponent, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { Alert, Button, ButtonProps } from '@navikt/ds-react';
import { Nettressurs, Status } from '~/nettressurs';
import VerticalSpacer from '~/VerticalSpacer';

type Props = {
    lagreFunksjon: () => Promise<void>;
} & HTMLAttributes<HTMLDivElement>;

const LagreKnapp: FunctionComponent<Props & ButtonProps> = (props) => {
    const [oppslag, setOppslag] = useState<Nettressurs<void>>({ status: Status.IkkeLastet });

    const { lagreFunksjon, ...knappBaseProps } = props;

    const feilRef = useRef<HTMLDivElement>(null);

    const onClick = async () => {
        try {
            setOppslag({ status: Status.LasterInn });
            await lagreFunksjon();
            setOppslag({ status: Status.Sendt });
        } catch (e) {
            const error = e as Error & { feilmelding?: string };
            const feilmelding = error.feilmelding ? error.feilmelding : 'Uventet feil';
            setOppslag({ status: Status.Feil, error: feilmelding });
        }
    };

    useEffect(() => {
        if (oppslag.status === Status.Feil) {
            feilRef.current?.focus();
        }
    }, [oppslag.status]);

    return (
        <div>
            <Button
                loading={oppslag.status === Status.LasterInn}
                disabled={oppslag.status === Status.LasterInn}
                onClick={onClick}
                {...knappBaseProps}
            ></Button>
            {oppslag.status === Status.Feil && (
                <>
                    <VerticalSpacer rem={0.5} />
                    <Alert variant="warning" size="small">
                        <div ref={feilRef} aria-live="polite">
                            {oppslag.error}
                        </div>
                    </Alert>
                </>
            )}
        </div>
    );
};

export default LagreKnapp;
