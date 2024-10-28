import VerticalSpacer from '../../saksbehandler/src/komponenter/VerticalSpacer';
import { BodyShort, Loader } from '@navikt/ds-react';

import React, { FunctionComponent } from 'react';
import Boks from '~/Boks';

const HenterInntekterBoks: FunctionComponent = () => {
    return (
        <Boks variant='hvit' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Loader type="XL" />
            <VerticalSpacer rem={1} />
            <BodyShort size="small">Henter inntektsopplysninger fra a-meldingen...</BodyShort>
        </Boks>
    );
};

export default HenterInntekterBoks;
