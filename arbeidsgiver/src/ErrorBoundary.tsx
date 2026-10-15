import { FunctionComponent, PropsWithChildren, Component, ReactNode } from 'react';
import VerticalSpacer from '~/VerticalSpacer';
import { Alert, BodyShort, Heading } from '@navikt/ds-react';

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

const ErrorBoundary: FunctionComponent<PropsWithChildren> = (props) => (
    <ReactErrorBoundary
        fallback={({ error }: { error?: unknown }) => (
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
        {props.children}
    </ReactErrorBoundary>
);

export default ErrorBoundary;
