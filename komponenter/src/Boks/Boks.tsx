import './Boks.less';
import { CSSProperties, FunctionComponent, PropsWithChildren } from 'react';
import BEMHelper from '~/utils/bem';

type Props = {
    className?: string;
    style?: CSSProperties;
    variant: 'blå' | 'grønn' | 'grå' | 'hvit';
};
const cls = BEMHelper('boks');

const Boks: FunctionComponent<PropsWithChildren<Props>> = ({ children, className, style, variant }) => {
    return (
        <div className={`${cls.element(variant)} ${className || ''}`} style={style}>
            {children}
        </div>
    );
};
export default Boks;
