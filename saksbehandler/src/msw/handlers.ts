import { http, HttpResponse } from 'msw';
import { Aktsomhet, Diskresjonskode } from '~/types';

const ugradertRespons: Aktsomhet = {
    kreverAktsomhet: false,
    diskresjonskode: Diskresjonskode.UGRADERT,
};

export const mswHandlers = [
    http.get('api/saksbehandler/refusjon/REFUSJON_ID/aktsomhet', () => {
        return HttpResponse.json({
            data: ugradertRespons,
        });
    }),
];
