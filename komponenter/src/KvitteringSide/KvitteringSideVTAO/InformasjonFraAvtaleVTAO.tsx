import React, { FunctionComponent } from 'react';
import { Alert, Heading, Label, BodyShort, Loader } from '@navikt/ds-react';
import moment from 'moment';
import { Tilskuddsgrunnlag } from '~/types/refusjon';
import Boks from '~/Boks';
import VerticalSpacer from '~/VerticalSpacer';
import IkonRad from '~/IkonRad/IkonRad';
import EksternLenke from '~/EksternLenke/EksternLenke';
import { formatterDato, formatterPeriode, NORSK_DATO_OG_TID_FORMAT } from '~/utils';
import { InnloggetRolle } from '~/types/brukerContextType';

interface Props {
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    bedriftKontonummer: string | null | undefined;
    åpnetFørsteGang?: string;
    bedriftKontonummerInnhentetTidspunkt?: string;
    innloggetRolle?: InnloggetRolle;
}

const InformasjonFraAvtalenVTAO: FunctionComponent<Props> = ({
    tilskuddsgrunnlag,
    bedriftKontonummer,
    åpnetFørsteGang,
    bedriftKontonummerInnhentetTidspunkt,
    innloggetRolle,
}) => {
    const avtaleLenke = `http://arbeidsgiver.nav.no/tiltaksgjennomforing/avtale/${tilskuddsgrunnlag.avtaleId}`;

    const erArbeidsgiver = innloggetRolle === 'ARBEIDSGIVER';

    return (
        <Boks variant="grå">
            <Heading level="3" size="small">
                Informasjon hentet fra avtalen
            </Heading>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <EksternLenke href={avtaleLenke}>Avtale om varig tilrettelagt arbeid i ordinær virksomhet</EksternLenke>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Deltaker: </Label>
                <BodyShort size="small">
                    {tilskuddsgrunnlag.deltakerFornavn} {tilskuddsgrunnlag.deltakerEtternavn}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Avtaleperiode: </Label>
                <BodyShort size="small">
                    {formatterPeriode(tilskuddsgrunnlag.avtaleFom || '', tilskuddsgrunnlag.avtaleTom || '')}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Tilskuddsperiode: </Label>
                <BodyShort size="small">
                    {formatterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Forventet utbetalt: </Label>
                <BodyShort size="small">
                    {formatterDato(moment(tilskuddsgrunnlag.tilskuddTom).add(3, 'days').toString())}
                </BodyShort>
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
            <BodyShort size="small">
                Kontonummer hentes automatisk fra Altinn. Hvis kontonummeret ikke stemmer så må dere{' '}
                <EksternLenke href="https://www.altinn.no/skjemaoversikt/arbeids--og-velferdsetaten-nav/bankkontonummer-for-refusjoner-fra-nav-til-arbeidsgiver/">
                    oppdatere det hos Altinn.
                </EksternLenke>
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
