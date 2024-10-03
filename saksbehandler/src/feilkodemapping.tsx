export type Feilkode =
    | 'TEKNISK_FEIL_INNTEKTSOPPSLAG'
    | 'INNTEKT_HENTET_FOR_TIDLIG'
    | 'UGYLDIG_STATUS'
    | 'ETTER_FRIST'
    | 'INGEN_INNTEKTER'
    | 'INGEN_BEDRIFTKONTONUMMER'
    | 'INGEN_KORREKSJONSGRUNNER'
    | 'KORREKSJONSBELOP_NEGATIVT'
    | 'SAMME_SAKSBEHANDLER_OG_BESLUTTER'
    | 'INGEN_BESLUTTER'
    | 'KOSTNADSSTED_MANGLER'
    | 'FOR_LANG_FORLENGELSE_AV_FRIST'
    | 'HAR_ALLERDE_UNNTAK_OM_INNTEKTER_1_MND_FREM'
    | 'KORREKSJON_KOSTNADSSTED_ANNET_FYLKE';

export const Feilmeldinger: { [key in Feilkode]: string } = {
    TEKNISK_FEIL_INNTEKTSOPPSLAG: 'Feil ved inntektsoppslag.',
    INNTEKT_HENTET_FOR_TIDLIG: 'Refusjonen kan ikke startes før tilskuddsperioden har utløpt.',
    UGYLDIG_STATUS: 'Handlingen kan ikke utføres fordi refusjonen har ugyldig status.',
    ETTER_FRIST: 'Fristen for å be om refusjon er utgått (2 måneder etter sluttdato for perioden).',
    INGEN_INNTEKTER: 'Ingen inntekter for perioden ble funnet.',
    INGEN_BEDRIFTKONTONUMMER: 'Mangler kontonummer for bedriften',
    KORREKSJONSBELOP_NEGATIVT: 'Korreksjon kan kun sendes til utbetaling om restbeløpet er positivt.',
    SAMME_SAKSBEHANDLER_OG_BESLUTTER: 'Kan ikke beslutte egne korreksjoner',
    INGEN_KORREKSJONSGRUNNER: 'Manger korreksjonsgrunn',
    INGEN_BESLUTTER: 'Du må oppgi en beslutter',
    KOSTNADSSTED_MANGLER: 'Du må oppgi kostnadssted',
    FOR_LANG_FORLENGELSE_AV_FRIST: 'For lang forlengelse av frist',
    HAR_ALLERDE_UNNTAK_OM_INNTEKTER_1_MND_FREM:
        'Arbeidsgiver har allerede merket refusjonen for å hente 1 eksta måned.',
    KORREKSJON_KOSTNADSSTED_ANNET_FYLKE: 'Kostnadsstedet må være i samme fylke som refusjonen',
};
