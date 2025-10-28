import { useRouteError } from 'react-router';

import { IkkeFunnetError, IkkeTilgangError } from '~/types';

import { Path } from '@/router/Router';
import IkkeTilgang403 from '~/IkkeTilgang403';
import IkkeFunnet404 from '~/IkkeFunnet404';

function OversiktRouteError() {
    const error = useRouteError();

    if (error instanceof IkkeTilgangError) {
        return <IkkeTilgang403 feilmelding={error.message} pathTilForside={Path.OVERSIKT} />;
    }
    if (error instanceof IkkeFunnetError) {
        return <IkkeFunnet404 pathTilForside={Path.OVERSIKT} />;
    }

    throw error;
}

export default OversiktRouteError;
