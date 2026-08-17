import { Alert, BodyShort, Heading, Loader } from '@navikt/ds-react';
import { Component, type FunctionComponent, type PropsWithChildren, type ReactNode, Suspense } from 'react';

type ErrorBoundaryState = { error?: unknown };

class ReactErrorBoundary extends Component<
    PropsWithChildren<{ fallback: (props: { error?: unknown }) => ReactNode }>,
    ErrorBoundaryState
> {
    constructor(props: PropsWithChildren<{ fallback: (props: { error?: unknown }) => ReactNode }>) {
        super(props);
        this.state = { error: undefined };
    }

    static getDerivedStateFromError(error: unknown) {
        return { error };
    }

    render() {
        if (this.state.error !== undefined) {
            return this.props.fallback({ error: this.state.error });
        }
        return this.props.children;
    }
}

const ErrorBoundary: FunctionComponent<PropsWithChildren> = (props) => {
    return (
        <ReactErrorBoundary
            fallback={({ error }: { error?: unknown }) => (
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
        </ReactErrorBoundary>
    );
};

export default ErrorBoundary;
