import React from 'react';

import './Rad.less';
import BEMHelper from '~/utils/bem';

interface Props {
    noSpace?: boolean;
    children?: React.ReactNode;
}

const Row: React.FunctionComponent<Props> = ({ children, noSpace }) => {
    const cls = BEMHelper('rad');

    return <div className={cls.className + ' ' + (noSpace ? ' ' : cls.element('space'))}>{children}</div>;
};

export default Row;
