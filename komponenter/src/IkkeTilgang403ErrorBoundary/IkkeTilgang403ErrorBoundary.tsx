import React from 'react';

import IkkeTilgang403 from '~/IkkeTilgang403';
import { Filter, IkkeTilgangError } from '~/types';

interface Props extends React.PropsWithChildren {
    filter?: Filter;
    pathTilForside?: string;
}

type State = { error?: Error };

class IkkeTilgang403ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { error: undefined };
    }

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.filter !== this.props.filter) {
            this.setState({ error: undefined });
        }
    }

    render() {
        const { pathTilForside } = this.props;
        const { error } = this.state;

        if (error instanceof IkkeTilgangError) {
            return <IkkeTilgang403 feilmelding={error.message} pathTilForside={pathTilForside} enkelVisning />;
        }
        if (error) {
            throw error;
        }

        return this.props.children;
    }
}

export default IkkeTilgang403ErrorBoundary;
