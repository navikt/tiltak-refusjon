import React, { FunctionComponent, PropsWithChildren } from 'react';

import './IkonRad.less';
import BEMHelper from '~/utils/bem';

const cls = BEMHelper('ikonRad');

const IkonRad: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <div className={cls.className}>{children}</div>;
};
export default IkonRad;
