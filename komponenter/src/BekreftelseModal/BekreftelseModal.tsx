import React, { CSSProperties, FunctionComponent, PropsWithChildren } from 'react';
import { Modal, Heading } from '@navikt/ds-react';
import './bekreftelseModal.less';
import BEMHelper from '~/utils/bem';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
    bekreft: () => Promise<any>;
    tittel: string;
    containerStyle?: CSSProperties;
    lagreKnapp: React.ReactNode;
}

const BekreftelseModal: FunctionComponent<Props & PropsWithChildren> = (props) => {
    const cls = BEMHelper('bekreftelse-modal');
    return (
        <div className={cls.className}>
            <Modal
                open={props.isOpen}
                onClose={() => props.lukkModal()}
                aria-label="modal"
                className={cls.element('container')}
                style={props.containerStyle}
            >
                <Modal.Header>
                    <Heading size="large" className={cls.element('tittel')}>
                        {props.tittel}
                    </Heading>
                </Modal.Header>
                <Modal.Body>{props.children}</Modal.Body>
                <Modal.Footer>
                    <Modal.Footer>{props.lagreKnapp}</Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BekreftelseModal;
