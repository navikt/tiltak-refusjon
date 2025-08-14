import React, { FunctionComponent } from 'react';

import './Banner.less';
import { Heading } from '@navikt/ds-react';
import { useFilter } from './FilterContext';
import { useHentRefusjoner } from '@/services/rest-service';
import BEMHelper from '~/utils/bem';

const cls = BEMHelper('Banner');

const Banner: FunctionComponent = () => {
    const { filter } = useFilter();

    const refusjonerPage = useHentRefusjoner(filter, { suspense: false });

    return (
        <div className={cls.className}>
            <Heading size="medium">
                Refusjonsoversikt{refusjonerPage && <> ({refusjonerPage?.totalItems ?? 0})</>}
            </Heading>
        </div>
    );
};

export default Banner;
