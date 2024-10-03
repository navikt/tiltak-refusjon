import React, { FunctionComponent } from 'react';
import BEMHelper from '../../utils/bem';
import './Banner.less';
import { Heading } from '@navikt/ds-react';

const cls = BEMHelper('Banner');

const BannerLaster: FunctionComponent = () => {
    return (
        <div className={cls.className}>
            <Heading size="medium">Refusjonsoversikt</Heading>
        </div>
    );
};

export default BannerLaster;
