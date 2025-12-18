import React from 'react';
import moment from 'moment';
import { Alert, Heading, Label, BodyShort, Loader } from '@navikt/ds-react';

import Boks from '~/Boks';
import EksternLenke from '~/EksternLenke/EksternLenke';
import HemmeligAdresseVarsel from '~/HemmeligAdresseVarsel';
import IkonRad from '~/IkonRad/IkonRad';
import KIDInputValidator from '~/KIDInputValidator';
import VerticalSpacer from '~/VerticalSpacer';
import { Aktsomhet, Refusjonsgrunnlag, RefusjonStatus } from '~/types';
import { InnloggetRolle } from '~/types/brukerContextType';
import { formatterDato, formatterPeriode, NORSK_DATO_OG_TID_FORMAT } from '~/utils';
import { lagId } from '~/utils/stringUtils';

interface Props {
    aktsomhet?: Aktsomhet;
    innloggetRolle?: InnloggetRolle;
    refusjonStatus?: RefusjonStatus;
    refusjonsgrunnlag: Refusjonsgrunnlag;
    åpnetFørsteGang?: string;
    settKid?: (kid?: string) => void;
}

const InformasjonFraAvtalenVTAO = (props: Props) => {
    const {
        aktsomhet,
        innloggetRolle,
        refusjonStatus = '',
        refusjonsgrunnlag: { bedriftKid, bedriftKontonummer, bedriftKontonummerInnhentetTidspunkt, tilskuddsgrunnlag },
        åpnetFørsteGang,
        settKid,
    } = props;

    const {
        deltakerFornavn,
        deltakerEtternavn,
        avtaleId,
        avtaleNr,
        løpenummer,
        resendingsnummer,
        avtaleFom,
        avtaleTom,
        tilskuddFom,
        tilskuddTom,
    } = tilskuddsgrunnlag;

    const avtaleLenke = `http://arbeidsgiver.nav.no/tiltaksgjennomforing/avtale/${avtaleId}`;
    const erArbeidsgiver = innloggetRolle === 'ARBEIDSGIVER';

    return (
        <Boks variant="grå">
            <Heading level="3" size="small">
                Informasjon hentet fra avtalen
            </Heading>
            <VerticalSpacer rem={1} />
            {aktsomhet?.kreverAktsomhet && <HemmeligAdresseVarsel aktsomhet={aktsomhet} />}
            <IkonRad>
                <EksternLenke href={avtaleLenke}>Avtale om varig tilrettelagt arbeid i ordinær virksomhet</EksternLenke>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Deltaker: </Label>
                <BodyShort size="small">
                    {deltakerFornavn} {deltakerEtternavn}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Refusjonsnummer: </Label>
                <BodyShort size="small">{lagId(avtaleNr, løpenummer, resendingsnummer)}</BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Avtaleperiode: </Label>
                <BodyShort size="small">{formatterPeriode(avtaleFom || '', avtaleTom || '')}</BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Tilskuddsperiode: </Label>
                <BodyShort size="small">{formatterPeriode(tilskuddFom, tilskuddTom)}</BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Forventet utbetalt: </Label>
                <BodyShort size="small">{formatterDato(moment(tilskuddTom).add(3, 'days').toString())}</BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Kontonummer:</Label>
                {bedriftKontonummer === null && erArbeidsgiver && <Loader type="L" />}
                {!erArbeidsgiver && (
                    <BodyShort size="small">
                        {bedriftKontonummerInnhentetTidspunkt ? (
                            <>
                                {bedriftKontonummer ?? 'Ikke funnet'} (hentet{' '}
                                {formatterDato(bedriftKontonummerInnhentetTidspunkt, NORSK_DATO_OG_TID_FORMAT)})
                            </>
                        ) : (
                            'Ikke oppgitt'
                        )}
                    </BodyShort>
                )}
                {bedriftKontonummer && erArbeidsgiver && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <BodyShort size="small">{bedriftKontonummer}</BodyShort>
                    </div>
                )}
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>KID-nummer:</Label>
                {erArbeidsgiver && ['KLAR_FOR_INNSENDING', 'FOR_TIDLIG'].includes(refusjonStatus) ? (
                    <>
                        <KIDInputValidator kid={bedriftKid} onEndring={settKid} />
                        <BodyShort size="small">(Dette feltet er valgfritt)</BodyShort>
                    </>
                ) : (
                    <BodyShort size="small">{bedriftKid || 'Ikke oppgitt'}</BodyShort>
                )}
            </IkonRad>
            <VerticalSpacer rem={1} />
            <BodyShort size="small">
                Kontonummer hentes automatisk. Hvis kontonummeret ikke stemmer så må det oppdateres{' '}
                <EksternLenke href="https://www.nav.no/arbeidsgiver/endre-kontonummer">her.</EksternLenke>
            </BodyShort>
            {bedriftKontonummer === null && åpnetFørsteGang && (
                <>
                    <VerticalSpacer rem={1} />
                    <Alert variant="error" size="small">
                        Vi kan ikke finne noe kontonummer på deres virksomhet. Riktig kontonummer må{' '}
                        <EksternLenke href="https://www.altinn.no/skjemaoversikt/arbeids--og-velferdsetaten-nav/bankkontonummer-for-refusjoner-fra-nav-til-arbeidsgiver/">
                            sendes inn via Altinn.
                        </EksternLenke>
                    </Alert>
                </>
            )}
        </Boks>
    );
};

export default InformasjonFraAvtalenVTAO;
