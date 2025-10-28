import { useRouteError } from 'react-router';

import { IkkeFunnetError, IkkeTilgangError } from '~/types';

import { Path } from '@/router/Router';
import IkkeTilgang403 from '~/IkkeTilgang403';
import IkkeFunnet404 from '~/IkkeFunnet404';

function OversiktRouteError() {
    const error = useRouteError();

    if (error instanceof IkkeTilgangError) {
        return <IkkeTilgang403 feilmelding={error.message} pathTilForside={Path.REFUSJON_OVERSIKT} arbeidsgiver />;
    }
    if (error instanceof IkkeFunnetError) {
        return <IkkeFunnet404 pathTilForside={Path.REFUSJON_OVERSIKT} arbeidsgiver />;
    }

    throw error;
}

export default OversiktRouteError;
