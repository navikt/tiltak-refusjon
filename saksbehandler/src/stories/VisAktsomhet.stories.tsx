import InformasjonFraAvtalen from '@/refusjon/RefusjonSide/InformasjonFraAvtalen';
import type { Meta, StoryObj } from '@storybook/react';
import { Aktsomhet, Diskresjonskode } from '~/types';
import { Tiltak } from '~/types/tiltak';
import { http, HttpResponse } from 'msw';

const meta = {
    title: 'Refusjons Saksbehandler/KvitteringSide/InformasjonFraAvtalen',
    component: InformasjonFraAvtalen,
    parameters: {
        msw: {
            handlers: {
                aktsomhet: [
                    http.get('api/saksbehandler/refusjon/REFUSJON_ID_KODE6_UTLAND/aktsomhet', () => {
                        return HttpResponse.json<Aktsomhet>({
                            kreverAktsomhet: true,
                            diskresjonskode: Diskresjonskode.STRENGT_FORTROLIG_UTLAND,
                        });
                    }),
                    http.get('api/saksbehandler/refusjon/REFUSJON_ID_KODE6/aktsomhet', () => {
                        return HttpResponse.json<Aktsomhet>({
                            kreverAktsomhet: true,
                            diskresjonskode: Diskresjonskode.STRENGT_FORTROLIG,
                        });
                    }),
                    http.get('api/saksbehandler/refusjon/REFUSJON_ID_KODE7/aktsomhet', () => {
                        return HttpResponse.json<Aktsomhet>({
                            kreverAktsomhet: true,
                            diskresjonskode: Diskresjonskode.FORTROLIG,
                        });
                    }),
                ],
            },
        },
        layout: 'fullscreen',
    },
} satisfies Meta<typeof InformasjonFraAvtalen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InformasjonFraAvtalenKode6: Story = {
    name: 'InformasjonFraAvtalen - Strengt fortrolig adresse',
    args: {
        bedriftKid: null,
        bedriftKontonummer: '123456789',
        refusjonId: 'REFUSJON_ID_KODE6',
        bedriftKontonummerInnhentetTidspunkt: '2025-01-01',
        tilskuddsgrunnlag: {
            avtaleId: '1c299899-a306-4585-8ca8-b8a6ad504f0f',
            tilskuddsperiodeId: '56d6b753-5a4d-4d64-98b4-8d0d0be0b9a3',
            deltakerFornavn: 'Bjørnstjerne',
            deltakerEtternavn: 'Bjørnson',
            deltakerFnr: '28128521498',
            arbeidsgiverFornavn: 'Arne',
            arbeidsgiverEtternavn: 'Arbeidsgiver',
            arbeidsgiverTlf: '41111111',
            veilederNavIdent: 'X123456',
            bedriftNavn: 'Kiwi Majorstuen',
            bedriftNr: '999999999',
            tilskuddFom: '2023-12-01',
            tilskuddTom: '2023-12-31',
            feriepengerSats: 0.12,
            otpSats: 0.02,
            arbeidsgiveravgiftSats: 0.141,
            tiltakstype: Tiltak.SOMMERJOBB,
            tilskuddsbeløp: 20579,
            lønnstilskuddsprosent: 40,
            avtaleNr: 3456,
            løpenummer: 3,
            enhet: '1000',
            id: '01HMGST2JDDEAKMFE585F0WYCT',
        },
    },
};

export const InformasjonFraAvtalenKode6Utland: Story = {
    name: 'InformasjonFraAvtalen - Strengt fortrolig adresse utland',
    args: {
        bedriftKid: null,
        bedriftKontonummer: '123456789',
        refusjonId: 'REFUSJON_ID_KODE6_UTLAND',
        bedriftKontonummerInnhentetTidspunkt: '2025-01-01',
        tilskuddsgrunnlag: {
            avtaleId: '1c299899-a306-4585-8ca8-b8a6ad504f0f',
            tilskuddsperiodeId: '56d6b753-5a4d-4d64-98b4-8d0d0be0b9a3',
            deltakerFornavn: 'Bjørnstjerne',
            deltakerEtternavn: 'Bjørnson',
            deltakerFnr: '28128521498',
            arbeidsgiverFornavn: 'Arne',
            arbeidsgiverEtternavn: 'Arbeidsgiver',
            arbeidsgiverTlf: '41111111',
            veilederNavIdent: 'X123456',
            bedriftNavn: 'Kiwi Majorstuen',
            bedriftNr: '999999999',
            tilskuddFom: '2023-12-01',
            tilskuddTom: '2023-12-31',
            feriepengerSats: 0.12,
            otpSats: 0.02,
            arbeidsgiveravgiftSats: 0.141,
            tiltakstype: Tiltak.SOMMERJOBB,
            tilskuddsbeløp: 20579,
            lønnstilskuddsprosent: 40,
            avtaleNr: 3456,
            løpenummer: 3,
            enhet: '1000',
            id: '01HMGST2JDDEAKMFE585F0WYCT',
        },
    },
};

export const InformasjonFraAvtalenKode7: Story = {
    name: 'InformasjonFraAvtalen - Fortrolig adresse',
    args: {
        bedriftKid: null,
        bedriftKontonummer: '123456789',
        refusjonId: 'REFUSJON_ID_KODE7',
        bedriftKontonummerInnhentetTidspunkt: '2025-01-01',
        tilskuddsgrunnlag: {
            avtaleId: '1c299899-a306-4585-8ca8-b8a6ad504f0f',
            tilskuddsperiodeId: '56d6b753-5a4d-4d64-98b4-8d0d0be0b9a3',
            deltakerFornavn: 'Bjørnstjerne',
            deltakerEtternavn: 'Bjørnson',
            deltakerFnr: '28128521498',
            arbeidsgiverFornavn: 'Arne',
            arbeidsgiverEtternavn: 'Arbeidsgiver',
            arbeidsgiverTlf: '41111111',
            veilederNavIdent: 'X123456',
            bedriftNavn: 'Kiwi Majorstuen',
            bedriftNr: '999999999',
            tilskuddFom: '2023-12-01',
            tilskuddTom: '2023-12-31',
            feriepengerSats: 0.12,
            otpSats: 0.02,
            arbeidsgiveravgiftSats: 0.141,
            tiltakstype: Tiltak.SOMMERJOBB,
            tilskuddsbeløp: 20579,
            lønnstilskuddsprosent: 40,
            avtaleNr: 3456,
            løpenummer: 3,
            enhet: '1000',
            id: '01HMGST2JDDEAKMFE585F0WYCT',
        },
    },
};

export const InformasjonFraAvtalenUgradert: Story = {
    name: 'InformasjonFraAvtalen - Ugradert',
    args: {
        bedriftKid: null,
        bedriftKontonummer: '123456789',
        refusjonId: 'REFUSJON_ID',
        bedriftKontonummerInnhentetTidspunkt: '2025-01-01',
        tilskuddsgrunnlag: {
            avtaleId: '1c299899-a306-4585-8ca8-b8a6ad504f0f',
            tilskuddsperiodeId: '56d6b753-5a4d-4d64-98b4-8d0d0be0b9a3',
            deltakerFornavn: 'Bjørnstjerne',
            deltakerEtternavn: 'Bjørnson',
            deltakerFnr: '28128521498',
            arbeidsgiverFornavn: 'Arne',
            arbeidsgiverEtternavn: 'Arbeidsgiver',
            arbeidsgiverTlf: '41111111',
            veilederNavIdent: 'X123456',
            bedriftNavn: 'Kiwi Majorstuen',
            bedriftNr: '999999999',
            tilskuddFom: '2023-12-01',
            tilskuddTom: '2023-12-31',
            feriepengerSats: 0.12,
            otpSats: 0.02,
            arbeidsgiveravgiftSats: 0.141,
            tiltakstype: Tiltak.SOMMERJOBB,
            tilskuddsbeløp: 20579,
            lønnstilskuddsprosent: 40,
            avtaleNr: 3456,
            løpenummer: 3,
            enhet: '1000',
            id: '01HMGST2JDDEAKMFE585F0WYCT',
        },
    },
};
