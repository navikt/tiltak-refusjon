import * as Sentry from '@sentry/react';
import { FunctionComponent, PropsWithChildren, Suspense } from 'react';
import VerticalSpacer from '~/VerticalSpacer';
import { Alert, BodyShort, Heading, Loader } from '@navikt/ds-react';
import Boks from '~/Boks';

const ErrorOgSuspenseHandlerMain: FunctionComponent<PropsWithChildren> = (props) => (
    <Sentry.ErrorBoundary
        fallback={({ error }) => (
            <>
                <Alert variant="warning" size="small">
                    <Heading size="small">Det har oppstått en uventet feil. Forsøk å laste siden på nytt.</Heading>
                    <VerticalSpacer rem={0.5} />
                    <BodyShort size="small">
                        Teknisk feilkode: <i>{(error as Error)?.message}</i>
                    </BodyShort>
                </Alert>
            </>
        )}
    >
        <Suspense
            fallback={
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <Boks variant="hvit" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Loader type="XL" />
                    </Boks>
                </div>
            }
        >
            {props.children}
        </Suspense>
    </Sentry.ErrorBoundary>
);

export default ErrorOgSuspenseHandlerMain;
