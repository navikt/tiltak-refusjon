import { format, parse } from 'date-fns';

export interface ForlengeDatoSkjemaGruppeFeil {
    id: string;
    feilMelding: string;
}

export const MONTHS: string[] = [
    'Januar',
    'Februar',
    'Mars',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Desember',
];

export const WEEKDAYS_SHORT: string[] = ['Lø.', 'Ma.', 'Ti.', 'On.', 'To.', 'Fr.', 'Sø.'];

export const disableAfter = (sisteFristDato: string, antallMnd: number): string => {
    return sisteFristDato
        .split('-')
        .map((dato, index) => (index === 1 ? (parseInt(dato) + antallMnd).toFixed(0) : dato))
        .join('-');
};

const datoTilISOString = (dato: Date): string => {
    return format(dato, 'yyyy-MM-dd');
};

export const datoTilNorskString = (dato: Date): string => {
    return format(dato, 'dd.MM.yyyy');
};

export const parseNorskDato = (date: string): Date => {
    return parse(date, 'dd.MM.yyyy', new Date());
};

export const norskDatoTilISOString = (date: string): string => {
    return datoTilISOString(parse(date, 'dd.MM.yyyy', new Date()));
};

export const erGyldigDato = (dato: Date) => !isNaN(dato.getTime());

export const finnFeilMeldingFraInputDialog = (
    id: string[],
    skjemaGruppeFeilmeldinger: ForlengeDatoSkjemaGruppeFeil[] | []
) => {
    const feilFunnet = skjemaGruppeFeilmeldinger.filter((feil) => id.find((f) => f === feil.id));
    if (feilFunnet.length !== 0) {
        return feilFunnet[0].feilMelding;
    }
    return undefined;
};
