import React from 'react';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
import Boks from '~/Boks';
import EksternLenke from '~/EksternLenke/EksternLenke';
import HemmeligAdresseVarsel from '~/HemmeligAdresseVarsel';
import Rad from '@/komponenter/Rad/Rad';
import VerticalSpacer from '~/VerticalSpacer';
import { Aktsomhet, tiltakstypeTekst } from '~/types';
import { Tilskuddsgrunnlag } from '~/types/refusjon';
import { formatterDato, formatterPeriode, NORSK_DATO_OG_TID_FORMAT } from '~/utils';
import { formatterPenger } from '@/utils/PengeUtils';

interface Props {
    aktsomhet?: Aktsomhet;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    fristForGodkjenning?: string;
    forrigeFristForGodkjenning?: string;
    bedriftKid: string | null | undefined;
    bedriftKontonummer: string | null | undefined;
    bedriftKontonummerInnhentetTidspunkt: string | null | undefined;
}

const InformasjonFraAvtalen = (props: Props) => {
    const {
        aktsomhet,
        tilskuddsgrunnlag,
        fristForGodkjenning,
        forrigeFristForGodkjenning,
        bedriftKid,
        bedriftKontonummer,
        bedriftKontonummerInnhentetTidspunkt,
    } = props;
    const avtaleLenke = `https://tiltaksgjennomforing.intern.nav.no/tiltaksgjennomforing/avtale/${tilskuddsgrunnlag.avtaleId}`;
    const refusjonsnummer = `${tilskuddsgrunnlag.avtaleNr}-${tilskuddsgrunnlag.løpenummer}`;

    return (
        <Boks variant="grå">
            <Heading size="small">Informasjon hentet fra avtalen</Heading>
            <VerticalSpacer rem={1} />
            {aktsomhet?.kreverAktsomhet && <HemmeligAdresseVarsel aktsomhet={aktsomhet} />}
            <Rad>
                <EksternLenke href={avtaleLenke}>
                    Avtale om {tiltakstypeTekst[tilskuddsgrunnlag.tiltakstype]}
                </EksternLenke>
            </Rad>
            <Rad noSpace={true}>
                <Label>Bedriftsnavn: </Label>
                <BodyShort size="small">{tilskuddsgrunnlag.bedriftNavn}</BodyShort>
            </Rad>
            <Rad>
                <Label>Virksomhetsnummer: </Label>
                <BodyShort size="small">{tilskuddsgrunnlag.bedriftNr}</BodyShort>
            </Rad>
            <Rad>
                <Label>Refusjonsnummer: </Label>
                <BodyShort size="small">{refusjonsnummer}</BodyShort>
            </Rad>
            <Rad>
                <Label>Deltaker: </Label>
                <BodyShort size="small">
                    {tilskuddsgrunnlag.deltakerFornavn} {tilskuddsgrunnlag.deltakerEtternavn}
                </BodyShort>
            </Rad>
            <Rad>
                <Label>Periode: </Label>
                <BodyShort size="small">
                    {formatterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)}
                </BodyShort>
            </Rad>
            {fristForGodkjenning && (
                <Rad>
                    <Label>Frist: </Label>
                    <BodyShort size="small">
                        {formatterDato(fristForGodkjenning)}
                        {forrigeFristForGodkjenning
                            ? `  (tidligere frist: ${formatterDato(forrigeFristForGodkjenning)})`
                            : ''}
                    </BodyShort>
                </Rad>
            )}
            <Rad>
                <Label>Avtalt beløp for perioden:</Label>
                <BodyShort size="small">Inntil {formatterPenger(tilskuddsgrunnlag.tilskuddsbeløp)}</BodyShort>
            </Rad>
            <Rad>
                <Label>Kontonummer:</Label>
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
            </Rad>
            <Rad noSpace={true}>
                <Label>KID:</Label>
                <BodyShort size="small">{bedriftKid ? bedriftKid : 'Ikke oppgitt'}</BodyShort>
            </Rad>
        </Boks>
    );
};

export default InformasjonFraAvtalen;
