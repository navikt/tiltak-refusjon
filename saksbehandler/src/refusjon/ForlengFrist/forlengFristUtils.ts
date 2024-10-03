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

export const getDateStringFraDatoVelger = (datoFraDatoVelger: Date): string => {
    return datoFraDatoVelger
        .toLocaleDateString('no-No')
        .split('.')
        .map((d, i) => (d.length === 1 ? '0'.concat(d) : d))
        .join('.');
};

export const formatDateToIsoDateFormat = (date: string): string => {
    const d = date
        .split('.')
        .map((d, i) => (d.length === 1 ? '0'.concat(d) : d))
        .join('.')
        .split('.');
    return d.length === 3 ? d[2].concat('-').concat(d[1]).concat('-').concat(d[0]) : date;
};

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
