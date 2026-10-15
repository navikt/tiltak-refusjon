import React, { FunctionComponent } from 'react';
import { BodyShort, Loader } from '@navikt/ds-react';
import Boks from '~/Boks';
import VerticalSpacer from '~/VerticalSpacer';

const LasterBoks: FunctionComponent = () => {
    return (
        <Boks variant="hvit" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Loader type="XL" />
            <VerticalSpacer rem={1} />
            <BodyShort size="small">Laster...</BodyShort>
        </Boks>
    );
};

export default LasterBoks;
