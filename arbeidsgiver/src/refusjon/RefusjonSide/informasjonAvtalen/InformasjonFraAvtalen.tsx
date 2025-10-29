import { Alert, Heading, Label, BodyShort, Loader } from '@navikt/ds-react';

import Boks from '~/Boks';
import EksternLenke from '~/EksternLenke/EksternLenke';
import HemmeligAdresseVarsel from '~/HemmeligAdresseVarsel';
import IkonRad from '~/IkonRad/IkonRad';
import KIDInputValidator from '~/KIDInputValidator';
import VerticalSpacer from '~/VerticalSpacer';
import { Aktsomhet, tiltakstypeTekst } from '~/types';
import { Refusjon } from '~/types/refusjon';
import { formatterDato, formatterPeriode } from '~/utils';
import { formatterPenger, visTallMedNorskFormatering } from '~/utils/PengeUtils';
import { useCallback } from 'react';
import { lagreBedriftKID } from '@/services/rest-service';

interface Props {
    aktsomhet?: Aktsomhet;
    refusjon: Refusjon;
    onFeil?: (feil?: string) => void;
}

const InformasjonFraAvtalen = (props: Props) => {
    const { refusjon, aktsomhet, onFeil = (f) => f } = props;
    const avtaleLenke = `http://arbeidsgiver.nav.no/tiltaksgjennomforing/avtale/${refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleId}`;
    const refusjonsnummer = `${refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr}-${refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer}`;

    const settKid = useCallback(
        (kid?: string) => {
            lagreBedriftKID(refusjon.id, refusjon.sistEndret, kid);
        },
        [refusjon.id, refusjon.sistEndret]
    );

    return (
        <Boks variant="grå">
            <Heading level="3" size="small">
                Informasjon hentet fra avtalen
            </Heading>
            <VerticalSpacer rem={1} />
            {aktsomhet?.kreverAktsomhet && <HemmeligAdresseVarsel aktsomhet={aktsomhet} />}
            <IkonRad>
                <EksternLenke href={avtaleLenke}>
                    Avtale om {tiltakstypeTekst[refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}
                </EksternLenke>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Refusjonsnummer: </Label>
                <BodyShort size="small">{refusjonsnummer}</BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Bedriftens navn: </Label>
                <BodyShort size="small">{refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.bedriftNavn}</BodyShort>
            </IkonRad>
            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.arbeidsgiverFornavn && (
                <>
                    <IkonRad>
                        <Label>Arbeidsgiver: </Label>
                        <BodyShort size="small">
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.arbeidsgiverFornavn}{' '}
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.arbeidsgiverEtternavn}
                        </BodyShort>
                        <Label>Mobil: </Label>
                        <BodyShort size="small">
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.arbeidsgiverTlf}
                        </BodyShort>
                    </IkonRad>
                    <VerticalSpacer rem={1} />
                </>
            )}
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Deltaker: </Label>
                <BodyShort size="small">
                    {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerFornavn}{' '}
                    {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerEtternavn}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={0.5} />
            <IkonRad>
                <Label>Periode: </Label>
                <BodyShort size="small">
                    {formatterPeriode(
                        refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                        refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                    )}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype !== 'MENTOR' && (
                <IkonRad>
                    <Label>Frist: </Label>
                    <BodyShort size="small">{formatterDato(refusjon.fristForGodkjenning)}</BodyShort>
                </IkonRad>
            )}
            <VerticalSpacer rem={1} />
            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype === 'MENTOR' && (
                <IkonRad>
                    <Label>Avtalt antall timer med mentor i perioden:</Label>
                    <BodyShort size="small">
                        {visTallMedNorskFormatering(
                            refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.mentorAntallTimer || 0
                        )}
                    </BodyShort>
                </IkonRad>
            )}
            <VerticalSpacer rem={0.5} />
            <IkonRad>
                <Label>Avtalt beløp for perioden:</Label>
                <BodyShort size="small">
                    {formatterPenger(refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddsbeløp)}
                </BodyShort>
            </IkonRad>

            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Kontonummer:</Label>
                {refusjon.refusjonsgrunnlag.bedriftKontonummer === null && !refusjon.åpnetFørsteGang && (
                    <Loader type="L" />
                )}
                {refusjon.refusjonsgrunnlag.bedriftKontonummer && (
                    <BodyShort size="small">{refusjon.refusjonsgrunnlag.bedriftKontonummer}</BodyShort>
                )}
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>KID-nummer:</Label>
                {refusjon.status === 'KLAR_FOR_INNSENDING' ? (
                    <>
                        <KIDInputValidator
                            kid={refusjon.refusjonsgrunnlag.bedriftKid}
                            onEndring={settKid}
                            onFeil={onFeil}
                        />
                        <BodyShort size="small">(Dette feltet er valgfritt)</BodyShort>
                    </>
                ) : (
                    <BodyShort size="small">{refusjon.refusjonsgrunnlag.bedriftKid || 'Ikke oppgitt'}</BodyShort>
                )}
            </IkonRad>
            {refusjon.refusjonsgrunnlag.bedriftKontonummer === null && refusjon.åpnetFørsteGang && (
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

export default InformasjonFraAvtalen;
