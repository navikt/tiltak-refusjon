import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { InnloggetBruker } from '../bruker/BrukerContextType';
import { Feature } from '../featureToggles/features';
import { Filter, useFilter } from '../refusjon/oversikt/FilterContext';
import { Beregning, Hendelse, Korreksjon, Korreksjonsgrunn, PageableRefusjon, Refusjon } from '../refusjon/refusjon';
import { ApiError, FeilkodeError } from '../types/errors';

const api = axios.create({
    baseURL: '/api/saksbehandler',
    timeout: 30000,
    withCredentials: true,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
    validateStatus: (status) => status < 400,
});

const axiosFetcher = (url: string) => api.get(url).then((res) => res.data);

const swrConfig = {
    fetcher: axiosFetcher,
    suspense: true,
    revalidateOnFocus: false,
    refreshInterval: 120000,
};

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 400 && error.response?.headers.feilkode) {
            throw new FeilkodeError(error.response?.headers.feilkode);
        }
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Uinnlogget - vil ikke skje i miljø da appen er beskyttet
            return Promise.reject(error);
        }
        throw new ApiError('Feil ved kontakt mot baksystem.');
    }
);

export const hentInnloggetBruker = async () => {
    const response = await api.get<InnloggetBruker>(`/innlogget-bruker`);
    return response.data;
};

export const useHentRefusjoner = (filter: Filter) => {
    const { sjekkForOnsketRefusjonAktør } = useFilter();
    const manglerSøkekriterier = !Object.entries(filter).filter(([key, value]) =>
        sjekkForOnsketRefusjonAktør(key, value)
    ).length;
    const urlSearchParams = new URLSearchParams(removeEmpty(filter));
    const { data } = useSWR<PageableRefusjon>(manglerSøkekriterier ? null : `/refusjon?${urlSearchParams}`, swrConfig);
    return data;
};

const removeEmpty = (obj: any) => {
    Object.keys(obj).forEach((k) => !obj[k] && delete obj[k]);
    return obj;
};

export const useHentRefusjon = (refusjonId: string) => {
    const { data } = useSWR<Refusjon>(`/refusjon/${refusjonId}`, swrConfig);
    return data!;
};

export const hentHendelser = async (refusjonId: string) => {
    const response = await api.get<Hendelse[]>(`/refusjon/${refusjonId}/hendelselogg`);
    return response.data;
};

export const useHentKorreksjon = (korreksjonId?: string) => {
    const { data } = useSWR<Korreksjon>(`/korreksjon/${korreksjonId}`, swrConfig);
    return data!;
};

export const endreBruttolønn = async (korreksjonId: string, inntekterKunFraTiltaket: boolean, bruttoLønn?: number) => {
    const response = await api.post(`/korreksjon/${korreksjonId}/endre-bruttolønn`, {
        inntekterKunFraTiltaket,
        bruttoLønn,
    });

    await mutate(`/korreksjon/${korreksjonId}`);
    return response.data;
};

export const hentFeatureToggles = async (featureToggles: Feature[]) => {
    const response = await api.get('/feature?' + featureToggles.map((feature) => `feature=${feature}`).join('&'));
    return response.data;
};

export interface ForlengFristRequest {
    nyFrist: string;
    årsak: string;
}

export const forlengFrist = async (refusjonId: string, nyFristValue: ForlengFristRequest) => {
    const response = await api.post<Refusjon>(`/refusjon/${refusjonId}/forleng-frist`, nyFristValue);
    await mutate(`/refusjon/${refusjonId}`);
    return response.data;
};

export const merkForUnntakOmInntekterToMånederFrem = async (refusjonId: string, merking: number) => {
    const response = await api.post<Refusjon>(`/refusjon/${refusjonId}/merk-for-unntak-om-inntekter-to-mnd-frem`, {
        merking,
    });
    await mutate(`/refusjon/${refusjonId}`);
    return response.data;
};

export const merkForUnntakOmInntekterFremITid = async (refusjonId: string, merking: number) => {
    const response = await api.post<Refusjon>(`/refusjon/${refusjonId}/merk-for-unntak-om-inntekter-frem-i-tid`, {
        merking,
    });
    await mutate(`/refusjon/${refusjonId}`);
    return response.data;
};


export const opprettKorreksjonsutkast = async (
    refusjonId: string,
    korreksjonsgrunner: Korreksjonsgrunn[],
    unntakOmInntekterFremitid?: number,
    annenKorreksjonsGrunn?: string
) => {
    const response = await api.post<Refusjon>(`/korreksjon/opprett-korreksjonsutkast`, {
        korreksjonsgrunner,
        refusjonId,
        unntakOmInntekterFremitid,
        annenKorreksjonsGrunn,
    });
    await mutate(`/refusjon/${refusjonId}`);
    return response.data;
};

export const slettKorreksjonsutkast = async (korreksjonId: string) => {
    const response = await api.post<Refusjon>(`/korreksjon/${korreksjonId}/slett-korreksjonsutkast`);
    return response.data;
};

export const utbetalKorreksjon = async (korreksjonId: string) => {
    const response = await api.post<Refusjon>(`/korreksjon/${korreksjonId}/utbetal-korreksjon`);
    await mutate(`/korreksjon/${korreksjonId}`);
    return response.data;
};
export const fullførKorreksjonVedOppgjort = async (korreksjonId: string) => {
    const response = await api.post<Refusjon>(`/korreksjon/${korreksjonId}/fullfør-korreksjon-ved-oppgjort`);
    await mutate(`/korreksjon/${korreksjonId}`);
    return response.data;
};
export const fullførKorreksjonVedTilbakekreving = async (korreksjonId: string) => {
    const response = await api.post<Refusjon>(`/korreksjon/${korreksjonId}/fullfør-korreksjon-ved-tilbakekreving`);
    await mutate(`/korreksjon/${korreksjonId}`);
    return response.data;
};

export const setInntektslinjeOpptjentIPeriode = async (
    korreksjonId: string,
    inntektslinjeId: string,
    erOpptjentIPeriode: boolean
) => {
    const response = await api.post(`/korreksjon/${korreksjonId}/set-inntektslinje-opptjent-i-periode`, {
        inntektslinjeId,
        erOpptjentIPeriode,
    });
    await mutate(`/korreksjon/${korreksjonId}`);
    return response.data;
};

export const settTidligereRefunderbarBeløp = async (
    korreksjonId: string,
    fratrekkRefunderbarBeløp: boolean | null,
    refunderbarBeløp?: number | null
): Promise<any> => {
    const response = await api.post(`/korreksjon/${korreksjonId}/fratrekk-sykepenger`, {
        fratrekkRefunderbarBeløp,
        refunderbarBeløp,
    });
    await mutate(`/korreksjon/${korreksjonId}`);
    return response.data;
};

export const hentEnhet = async (enhet: string, korreksjonId: string) => {
    const response = await api.get<string>(`/korreksjon/${korreksjonId}/hent-enhet/${enhet}`);
    return response.data;
};

export const sjekkReberegning = async (refusjonId: string, harFerietrekkForSammeMåned: boolean, minusBeløp: number) => {
    const response = await api.post<Beregning>(`/refusjon/reberegn-dry/${refusjonId}`, {
        harFerietrekkForSammeMåned,
        minusBeløp,
    });
    return response.data;
};

export const settMinusbeløpManuelt = async (korreksjonId: string, beløp: number) => {
    const response = await api.put(`/korreksjon/${korreksjonId}/sett-manuelt-minusbelop`, { minusbeløp: beløp });
    await mutate(`/korreksjon/${korreksjonId}`);
    return response.data;
};

export const settHarFerietrekkForSammeMåned = async (korreksjonId: string, harFerietrekkForSammeMåned: boolean) => {
    const response = await api.put(`/korreksjon/${korreksjonId}/har-ferietrekk-for-samme-maaned`, {
        harFerietrekkForSammeMåned,
    });
    await mutate(`/korreksjon/${korreksjonId}`);
    return response.data;
};
