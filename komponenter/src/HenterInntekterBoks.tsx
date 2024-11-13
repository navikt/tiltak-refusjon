import React, { FunctionComponent } from 'react';
import { BodyShort, Loader } from '@navikt/ds-react';
import Boks from '~/Boks';
import VerticalSpacer from '~/VerticalSpacer';

const HenterInntekterBoks: FunctionComponent = () => {
    return (
        <Boks variant="hvit" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Loader type="XL" />
            <VerticalSpacer rem={1} />
            <BodyShort size="small">Henter inntektsopplysninger fra a-meldingen...</BodyShort>
        </Boks>
    );
};

export default HenterInntekterBoks;
