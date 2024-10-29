import { FunctionComponent } from 'react';


import { Alert, Heading, Label, BodyShort, Loader } from '@navikt/ds-react';

import moment from 'moment';
import { Refusjon } from '~/types/refusjon';
import Boks from '~/Boks';
import VerticalSpacer from '~/VerticalSpacer';
import IkonRad from '~/IkonRad/IkonRad';
import EksternLenke from '~/EksternLenke/EksternLenke';
import { formatterDato, formatterPeriode } from '~/utils';

type Props = {
    refusjon: Refusjon;
};

const InformasjonFraAvtalenVTAO: FunctionComponent<Props> = ({ refusjon }) => {
    const avtaleLenke = `http://arbeidsgiver.nav.no/tiltaksgjennomforing/avtale/${refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleId}`;

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
                    {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerFornavn}{' '}
                    {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerEtternavn}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Avtaleperiode: </Label>
                <BodyShort size="small">
                    {formatterPeriode(
                        refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleFom || '',
                        refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleTom || ''
                    )}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Tilskuddsperiode: </Label>
                <BodyShort size="small">
                    {formatterPeriode(
                        refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                        refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                    )}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Forventet utbetalt: </Label>
                <BodyShort size="small">
                    {formatterDato(
                        moment(refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom).add(3, 'days').toString()
                    )}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Label>Kontonummer:</Label>
                {refusjon.refusjonsgrunnlag.bedriftKontonummer === null && !refusjon.åpnetFørsteGang && (
                    <Loader type="L" />
                )}
                {refusjon.refusjonsgrunnlag.bedriftKontonummer && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <BodyShort size="small">{refusjon.refusjonsgrunnlag.bedriftKontonummer}</BodyShort>
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

export default InformasjonFraAvtalenVTAO;