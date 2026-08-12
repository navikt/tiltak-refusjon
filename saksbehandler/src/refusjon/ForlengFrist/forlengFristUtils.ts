import { format, parse, addDays } from 'date-fns';

const datoTilISOString = (dato: Date): string => {
    return format(dato, 'yyyy-MM-dd');
};

export const datoTilNorskString = (dato: Date): string => {
    return format(dato, 'dd.MM.yyyy');
};

export const norskDatoTilISOString = (date: string): string => {
    return datoTilISOString(parse(date, 'dd.MM.yyyy', new Date()));
};

export const nesteDag = (dato: Date): Date => {
    return addDays(dato, 1);
};
