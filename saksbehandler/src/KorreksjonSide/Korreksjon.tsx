import React, { FunctionComponent, Suspense } from 'react';
import { Alert } from '@navikt/ds-react';
import { useParams } from 'react-router';
import { useHentKorreksjon, useHentRefusjon } from '../services/rest-service';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import KorreksjonSide from './KorreksjonSide';
import TilbakeTilOversikt from '../komponenter/tilbake-til-oversikt/TilbakeTilOversikt';
import { Link } from 'react-router-dom';
import KorreksjonKvitteringSide from '../KorreksjonKvitteringSide/KorreksjonKvitteringSide';
import { korreksjonsgrunnTekst } from '~/types/messages';
import { KorreksjonStatus } from '~/types/status';
import KorreksjonSideVTAO from './KorreksjonSideVTAO';
import KorreksjonKvitteringSideVTAO from '@/KorreksjonKvitteringSide/KorreksjonKvitteringSideVTAO';

const Advarsler: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const korreksjon = useHentKorreksjon(korreksjonId!);

    return (
        <>
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
        </>
    );
};

const Komponent: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const korreksjon = useHentKorreksjon(korreksjonId!);

    switch (korreksjon.status) {
        case KorreksjonStatus.UTKAST:
            return (
                <>
                    {korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype === 'VTAO' ? (
                        <KorreksjonSideVTAO refusjonsgrunnlag={korreksjon.refusjonsgrunnlag}/>
                    ) : (
                        <KorreksjonSide korreksjon={korreksjon} />
                    )}
                </>
            );
            return;
        case KorreksjonStatus.TILBAKEKREVING:
        case KorreksjonStatus.OPPGJORT:
        case KorreksjonStatus.TILLEGSUTBETALING:
        case KorreksjonStatus.TILLEGGSUTBETALING_UTBETALT:
        case KorreksjonStatus.TILLEGGSUTBETALING_FEILET:
            return (
                <>
                    {korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype === 'VTAO' ? (
                        <KorreksjonKvitteringSideVTAO korreksjon={korreksjon} />
                    ) : (
                        <KorreksjonKvitteringSide korreksjon={korreksjon} />
                    )}
                </>
            );
    }
};

const Refusjon: FunctionComponent = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ flex: '0 0 55rem', flexShrink: 1 }}>
                <TilbakeTilOversikt />
                <Suspense fallback={null}>
                    <Advarsler />
                    <Komponent />
                </Suspense>
            </div>
        </div>
    );
};

export default Refusjon;
