import { Alert, Loader, BodyShort, Heading } from '@navikt/ds-react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { Suspense } from 'react';
import * as Sentry from '@sentry/react';

const ErrorBoundary: FunctionComponent<PropsWithChildren> = (props) => {
    return (
        <Sentry.ErrorBoundary
            fallback={({ error }: { error: unknown }) => (
                <>
                    <Alert variant="warning">
                        <Heading size="small" style={{ margin: '0.5rem' }}>
                            Det har oppstått en uventet feil. Forsøk å laste siden på nytt.
                        </Heading>
                        <BodyShort size="small">
                            Teknisk feilkode: <i>{(error as Error).toString()}</i>
                        </BodyShort>
                    </Alert>
                </>
            )}
        >
            <Suspense
                fallback={
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Loader variant="neutral" size="xlarge" />
                    </div>
                }
            >
                {props.children}
            </Suspense>
        </Sentry.ErrorBoundary>
    );
};

export default ErrorBoundary;
