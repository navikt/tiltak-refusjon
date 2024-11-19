import { FunctionComponent } from 'react';
import { Alert, Heading, Label, BodyShort, Loader } from '@navikt/ds-react';
import moment from 'moment';
import { Tilskuddsgrunnlag } from '~/types/refusjon';
import Boks from '~/Boks';
import VerticalSpacer from '~/VerticalSpacer';
import IkonRad from '~/IkonRad/IkonRad';
import EksternLenke from '~/EksternLenke/EksternLenke';
import { formatterDato, formatterPeriode } from '~/utils';

interface Props {
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    bedriftKontonummer: string | null | undefined;
    åpnetFørsteGang?: string;
}

const InformasjonFraAvtalenVTAO: FunctionComponent<Props> = ({
    tilskuddsgrunnlag,
    bedriftKontonummer,
    åpnetFørsteGang,
}) => {
    const avtaleLenke = `http://arbeidsgiver.nav.no/tiltaksgjennomforing/avtale/${tilskuddsgrunnlag.avtaleId}`;
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
                {bedriftKontonummer === null && !åpnetFørsteGang && <Loader type="L" />}
                {bedriftKontonummer && (
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
