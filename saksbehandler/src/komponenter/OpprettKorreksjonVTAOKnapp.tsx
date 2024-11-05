import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button } from '@navikt/ds-react';
import { Korreksjonsgrunn } from '~/types/refusjon';
import { opprettKorreksjonsutkast } from '../services/rest-service';

interface Props {
    setFeilmelding: (feilmelding: string) => void;
}

const OpprettKorreksjonVTAOKnapp: FunctionComponent<Props> = ({ setFeilmelding }) => {
    const { refusjonId } = useParams<{ refusjonId: string }>();
    const navigate = useNavigate();

    return (
        <Button
            variant="secondary"
            onClick={async () => {
                try {
                    const oppdatertRefusjon = await opprettKorreksjonsutkast(
                        refusjonId!,
                        [Korreksjonsgrunn.DELTAKER_HAR_IKKE_VÆRT_TILSTEDE_I_PERIODEN],
                        undefined,
                        undefined
                    );
                    navigate('/korreksjon/' + oppdatertRefusjon.korreksjonId);
                } catch (error) {
                    setFeilmelding('Feil ved oppretting av korreksjonsutkast');
                }
            }}
        >
            Opprett korreksjonsutkast
        </Button>
    );
};

export default OpprettKorreksjonVTAOKnapp;
