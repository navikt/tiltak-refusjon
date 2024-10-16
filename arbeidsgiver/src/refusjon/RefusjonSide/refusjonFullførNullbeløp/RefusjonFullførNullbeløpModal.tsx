import React, { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction } from 'react';
import GodkjennModal from '../GodkjennModal';
import { Alert } from '@navikt/ds-react';

import { formatterPenger } from '../../../utils/PengeUtils';
import { Refusjon } from '~/types/refusjon';
import { formatterPeriode } from '~/utils';

interface Properties {
    refusjon: Refusjon;
    visGodkjennModal: boolean;
    setVisGodkjennModal: Dispatch<SetStateAction<boolean>>;
    godkjennRefusjonen: () => Promise<void>;
}

const RefusjonFullførNullbeløpModal: FunctionComponent<Properties> = ({
    refusjon,
    visGodkjennModal,
    setVisGodkjennModal,
    godkjennRefusjonen,
}: PropsWithChildren<Properties>) => {
    const { tilskuddsgrunnlag } = refusjon.refusjonsgrunnlag;

    return (
        <GodkjennModal
            isOpen={visGodkjennModal}
            lukkModal={() => setVisGodkjennModal(false)}
            godkjenn={godkjennRefusjonen}
            tittel="Godta beløp"
        >
            <Alert variant="warning">
                Ved å fullføre denne refusjonen for den avtalte perioden{' '}
                <b>{formatterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)}.</b> godkjenner du
                at refusjonsbeløpet er {formatterPenger(0)}
            </Alert>
        </GodkjennModal>
    );
};
export default RefusjonFullførNullbeløpModal;
