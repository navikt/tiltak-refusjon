import KIDInputValidator from '../../../komponenter/KIDInputValidator/KIDInputValidator';
import { FunctionComponent } from 'react';

import VerticalSpacer from '../../../../../komponenter/src/VerticalSpacer';

import { formatterPenger } from '../../../../../komponenter/src/utils/PengeUtils';
import { Alert, Heading, Label, BodyShort, Loader } from '@navikt/ds-react';
import IkonRad from '../../../../../komponenter/src/IkonRad/IkonRad';
import Boks from '~/Boks';
import { tiltakstypeTekst } from '~/types/messages';
import { formatterDato, formatterPeriode } from '~/utils';
import { Refusjon } from '~/types/refusjon';
import EksternLenke from '~/EksternLenke/EksternLenke';

type Props = {
    refusjon: Refusjon;
};

const InformasjonFraAvtalen: FunctionComponent<Props> = ({ refusjon }) => {
    const avtaleLenke = `http://arbeidsgiver.nav.no/tiltaksgjennomforing/avtale/${refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleId}`;

    const refusjonsnummer = `${refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr}-${refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer}`;

    return (
        <Boks variant="grå">
            <Heading level="3" size="small">
                Informasjon hentet fra avtalen
            </Heading>
            <VerticalSpacer rem={1} />
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
            <IkonRad>
                <Label>Bedriftens navn: </Label>
                <BodyShort size="small">{refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.bedriftNavn}</BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Deltaker: </Label>
                <BodyShort size="small">
                    {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerFornavn}{' '}
                    {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerEtternavn}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
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
            <IkonRad>
                <Label>Frist: </Label>
                <BodyShort size="small">{formatterDato(refusjon.fristForGodkjenning)}</BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Avtalt beløp for perioden:</Label>
                <BodyShort size="small">
                    Inntil {formatterPenger(refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddsbeløp)}
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
            {(!refusjon.refusjonsgrunnlag.bedriftKid || refusjon.refusjonsgrunnlag.bedriftKid.trim().length === 0) &&
            refusjon.status !== 'KLAR_FOR_INNSENDING' ? (
                <></>
            ) : (
                <>
                    <VerticalSpacer rem={1} />
                    <IkonRad>
                        <Label>KID:</Label>
                        {refusjon.status === 'KLAR_FOR_INNSENDING' ? (
                            <>
                                <KIDInputValidator />
                                <BodyShort size="small">(Dette feltet er valgfritt)</BodyShort>
                            </>
                        ) : (
                            <BodyShort size="small">{refusjon.refusjonsgrunnlag.bedriftKid}</BodyShort>
                        )}
                    </IkonRad>
                </>
            )}
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
