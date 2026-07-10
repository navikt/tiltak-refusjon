import { FunctionComponent, PropsWithChildren } from 'react';

const UtgråetTekst: FunctionComponent<PropsWithChildren<{ grå: boolean; title?: string }>> = ({
    children,
    grå,
    title,
}) => (
    <span title={title} style={{ color: grå ? 'grey' : undefined, whiteSpace: 'pre-wrap' }}>
        {children}
    </span>
);

export default UtgråetTekst;
