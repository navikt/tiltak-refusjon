import React, { FunctionComponent, PropsWithChildren, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { BodyLong, Button, Loader, Modal } from '@navikt/ds-react';
import { Locked } from '@navikt/ds-icons';

import { useRefusjonKreverAktsomhet } from '@/services/rest-service';

import styles from './RefusjonKontroll.module.less';

const RefusjonKontroll: FunctionComponent<PropsWithChildren> = (props) => {
    const { refusjonId } = useParams<{ refusjonId: string }>();
    const { isLoading, data } = useRefusjonKreverAktsomhet(refusjonId);

    const navigate = useNavigate();
    const ref = useRef<HTMLDialogElement>(null);
    const [isGodkjent, setGodkjent] = useState<boolean>(false);

    if (isLoading) {
        return (
            <div className={styles.container}>
                <Loader variant="neutral" size="xlarge" />
            </div>
        );
    }

    if (!data?.kreverAktsomhet || isGodkjent) {
        return props.children;
    }

    return (
        <>
            <Modal
                ref={ref}
                open={true}
                header={{
                    icon: <Locked title="Lås" />,
                    heading: 'Deltaker har adressebeskyttelse',
                }}
                onClose={() => {
                    if (window.history.state.idx > 1) {
                        navigate(-1);
                    } else {
                        navigate('/refusjon');
                    }
                }}
            >
                <Modal.Body>
                    <BodyLong>
                        Denne personen har hemmelig adresse og du må derfor utvise aktsomhet. Du skal kun gjøre oppslag
                        dersom det er nødvendig for å levere tjenesten til denne personen. Nav logger ditt navn og
                        tidspunkt for oppslaget.
                    </BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        onClick={() => {
                            setGodkjent(true);
                        }}
                    >
                        Vis refusjon
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                            if (window.history.state.idx > 1) {
                                navigate(-1);
                            } else {
                                navigate('/refusjon');
                            }
                        }}
                    >
                        Avslutt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RefusjonKontroll;
