import React, { FunctionComponent } from 'react';
import EksternLenke from '../../komponenter/EksternLenke/EksternLenke';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { formatterDato, formatterPeriode, NORSK_DATO_OG_TID_FORMAT } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';
import { Tilskuddsgrunnlag } from '../refusjon';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
import Rad from '@/komponenter/Rad/Rad';
import Boks from '@/komponenter/Boks/Boks';


const InformasjonFraAvtalen: FunctionComponent<{
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    fristForGodkjenning?: string;
    forrigeFristForGodkjenning?: string;
    bedriftKid: string | null | undefined;
    bedriftKontonummer: string | null | undefined;
    bedriftKontonummerInnhentetTidspunkt: string | null | undefined;
}> = (props) => {
    const avtaleLenke = `https://tiltaksgjennomforing.intern.nav.no/tiltaksgjennomforing/avtale/${props.tilskuddsgrunnlag.avtaleId}`;
    const refusjonsnummer = `${props.tilskuddsgrunnlag.avtaleNr}-${props.tilskuddsgrunnlag.løpenummer}`;

    return (
        <Boks variant='grå'>
            <Heading size="small">Informasjon hentet fra avtalen</Heading>
            <VerticalSpacer rem={1} />
            <Rad>
                <EksternLenke href={avtaleLenke}>
                        Avtale om {tiltakstypeTekst[props.tilskuddsgrunnlag.tiltakstype]}
                </EksternLenke>
            </Rad>
            <Rad noSpace={true}>
                <Label>Bedriftsnavn: </Label>
                <BodyShort size="small">{props.tilskuddsgrunnlag.bedriftNavn}</BodyShort>
            </Rad>
            <Rad>    
                <Label>Virksomhetsnummer: </Label>
                <BodyShort size="small">{props.tilskuddsgrunnlag.bedriftNr}</BodyShort>
            </Rad>
            <Rad>
                <Label>Refusjonsnummer: </Label>
                <BodyShort size="small">{refusjonsnummer}</BodyShort>
            </Rad>
            <Rad>
                <Label>Deltaker: </Label>
                <BodyShort size="small">
                    {props.tilskuddsgrunnlag.deltakerFornavn} {props.tilskuddsgrunnlag.deltakerEtternavn}
                </BodyShort>
            </Rad>
            <Rad>
                <Label>Periode: </Label>
                <BodyShort size="small">
                    {formatterPeriode(props.tilskuddsgrunnlag.tilskuddFom, props.tilskuddsgrunnlag.tilskuddTom)}
                </BodyShort>
            </Rad>
            {props.fristForGodkjenning && (
                <Rad>
                    <Label>Frist: </Label>
                    <BodyShort size="small">
                        {formatterDato(props.fristForGodkjenning)}
                        {props.forrigeFristForGodkjenning
                            ? `  (tidligere frist: ${formatterDato(props.forrigeFristForGodkjenning)})`
                            : ''}
                    </BodyShort>
                </Rad>
            )}
            <Rad>
                <Label>Avtalt beløp for perioden:</Label>
                <BodyShort size="small">Inntil {formatterPenger(props.tilskuddsgrunnlag.tilskuddsbeløp)}</BodyShort>
            </Rad>
            <Rad>
                <Label>Kontonummer:</Label>
                <BodyShort size="small">
                    {props.bedriftKontonummerInnhentetTidspunkt ? (
                        <>
                            {props.bedriftKontonummer ?? 'Ikke funnet'} (hentet{' '}
                            {formatterDato(props.bedriftKontonummerInnhentetTidspunkt, NORSK_DATO_OG_TID_FORMAT)})
                        </>
                    ) : (
                        'Ikke oppgitt'
                    )}
                </BodyShort>
            </Rad>
            <Rad noSpace={true}>
                <Label>KID:</Label>
                <BodyShort size="small">{props.bedriftKid ? props.bedriftKid : 'Ikke oppgitt'}</BodyShort>
            </Rad>
        </Boks>
    );
};

export default InformasjonFraAvtalen;
