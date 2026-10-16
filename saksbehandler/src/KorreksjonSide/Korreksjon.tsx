import React, { FunctionComponent } from 'react';
import { Alert } from '@navikt/ds-react';
import { useParams } from 'react-router';
import { Link } from 'react-router';

import KorreksjonKvitteringSide from '@/KorreksjonKvitteringSide/KorreksjonKvitteringSide';
import KorreksjonKvitteringSideVTAO from '@/KorreksjonKvitteringSideVTAO/KorreksjonKvitteringSideVTAO';
import KorreksjonSide from './KorreksjonSide';
import KorreksjonSideVTAO from '@/KorreksjonSideVTAO/KorreksjonSideVTAO';
import VerticalSpacer from '~/VerticalSpacer';
import { korreksjonsgrunnTekst, KorreksjonStatus } from '~/types';
import { useHentKorreksjon, useRefusjonKreverAktsomhet } from '@/services/rest-service';
import { InnholdContainer } from '~/Container';

const Advarsler: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const korreksjon = useHentKorreksjon(korreksjonId!);

    return (
        <InnholdContainer>
            <Alert variant="info" size="small">
                Dette er en korreksjon av tidligere utbetalt refusjon. Årsak til korreksjon:
                <br />
                <ul>
                    {korreksjon.korreksjonsgrunner.map((kg) => (
                        <li key={kg}>{korreksjonsgrunnTekst[kg]}</li>
                    ))}
                </ul>
                <Link to={`/refusjon/${korreksjon.korrigererRefusjonId}`}>
                    Klikk her for å åpne refusjonen som korrigeres.
                </Link>
            </Alert>
            <VerticalSpacer rem={1} />
        </InnholdContainer>
    );
};

const Komponent: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const korreksjon = useHentKorreksjon(korreksjonId!);
    const { data: aktsomhet } = useRefusjonKreverAktsomhet(korreksjon.korrigererRefusjonId);

    switch (korreksjon.status) {
        case KorreksjonStatus.UTKAST:
            return korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype === 'VTAO' ? (
                <KorreksjonSideVTAO aktsomhet={aktsomhet} refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} />
            ) : (
                <KorreksjonSide aktsomhet={aktsomhet} korreksjon={korreksjon} />
            );
        case KorreksjonStatus.TILBAKEKREVING:
        case KorreksjonStatus.OPPGJORT:
        case KorreksjonStatus.TILLEGSUTBETALING:
        case KorreksjonStatus.TILLEGGSUTBETALING_UTBETALT:
        case KorreksjonStatus.TILLEGGSUTBETALING_FEILET:
            return korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype === 'VTAO' ? (
                <KorreksjonKvitteringSideVTAO aktsomhet={aktsomhet} korreksjon={korreksjon} />
            ) : (
                <KorreksjonKvitteringSide aktsomhet={aktsomhet} korreksjon={korreksjon} />
            );
    }
};

const Refusjon: FunctionComponent = () => {
    return (
        <>
            <Advarsler />
            <Komponent />
        </>
    );
};

export default Refusjon;
