import React, { CSSProperties, FunctionComponent, PropsWithChildren } from 'react';
import { Modal, Heading } from '@navikt/ds-react';
import './bekreftelseModal.less';
import BEMHelper from '~/utils/bem';
import LagreOgAvbrytKnapp from '~/knapp/LagreOgAvbrytKnapp';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
    bekreft: () => Promise<void>;
    tittel: string;
    containerStyle?: CSSProperties;
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
                {/* Rydder feilmeldinger fra api-kall i LagreOgAvbrytKnapp når modal lukkes */}
                {props.isOpen && (
                    <>
                        <Modal.Header>
                            <Heading size="large" className={cls.element('tittel')}>
                                {props.tittel}
                            </Heading>
                        </Modal.Header>
                        <Modal.Body>{props.children}</Modal.Body>
                        <Modal.Footer>
                            <LagreOgAvbrytKnapp lagreFunksjon={props.bekreft} avbryt={() => props.lukkModal()}>
                                OK
                            </LagreOgAvbrytKnapp>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default BekreftelseModal;
