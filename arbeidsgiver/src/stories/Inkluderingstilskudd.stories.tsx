import type { Meta, StoryObj } from '@storybook/react-vite';

import InkluderingstilskuddRefusjonside from '@/refusjon/RefusjonSide/InkluderingstilskuddRefusjonside';
import { Diskresjonskode } from '~/types';
import { Refusjon } from '~/types/refusjon';
import { RefusjonStatus } from '~/types/status';
import { Tiltak } from '~/types/tiltak';

const meta = {
    title: 'Refusjons Arbeidsgiver/Inkluderingstilskudd',
    component: InkluderingstilskuddRefusjonside,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <div style={{ backgroundColor: '#ECEEF0', minHeight: '100vh' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof InkluderingstilskuddRefusjonside>;

export default meta;
type Story = StoryObj<typeof meta>;

const refusjon: Refusjon = {
    id: '01HMGY26W4BXX44P6EAJNEN99Z',
    bedriftNr: '999999999',
    status: RefusjonStatus.KLAR_FOR_INNSENDING,
    fristForGodkjenning: '2026-12-31',
    forrigeFristForGodkjenning: undefined,
    korreksjonId: undefined,
    utbetaltTidspunkt: undefined,
    unntakOmInntekterFremitid: 0,
    hentInntekterLengerFrem: '',
    åpnetFørsteGang: '2026-10-01T10:00:00.000000Z',
    sistEndret: '2026-10-01T10:00:00.000000Z',
    harTattStillingTilAlleInntektslinjer: true,
    harInntektIAlleMåneder: true,
    senestMuligeGodkjenningsfrist: '2027-02-28',
    diskresjonskode: Diskresjonskode.UGRADERT,
    refusjonsgrunnlag: {
        bruttolonnOpptjentIPerioden: 0,
        ferietrekkIPerioden: 0,
        harFerietrekkForSammeMåned: false,
        bedriftKontonummer: '10000038145',
        bedriftKid: undefined,
        inntektsgrunnlag: undefined,
        beregning: undefined,
        tilskuddsgrunnlag: {
            avtaleId: 'a2d4b23d-91f3-4384-b9e7-b2455586fbe3',
            avtaleFom: '2026-01-01',
            avtaleTom: '2026-12-31',
            tilskuddsperiodeId: '0cd44add-7a3a-4384-b608-6417dc87dcb5',
            deltakerFornavn: 'Bjørnstjerne',
            deltakerEtternavn: 'Bjørnson',
            arbeidsgiverFornavn: 'Arne',
            arbeidsgiverEtternavn: 'Arbeidsgiver',
            arbeidsgiverTlf: '41111111',
            veilederNavIdent: 'X123456',
            bedriftNavn: 'Kiwi Majorstuen',
            bedriftNr: '999999999',
            tilskuddFom: '2026-01-01',
            tilskuddTom: '2026-12-31',
            feriepengerSats: 0,
            otpSats: 0,
            arbeidsgiveravgiftSats: 0,
            tiltakstype: Tiltak.INKLUDERINGSTILSKUDD,
            tilskuddsbeløp: 15644,
            lønnstilskuddsprosent: 0,
            avtaleNr: 4567,
            løpenummer: 1,
            enhet: '1000',
            id: '01HMGY26W4BD9WA745B6541ABC',
        },
    },
};

export const KlarForInnsending: Story = {
    name: 'Klar for innsending',
    args: { refusjon },
};
