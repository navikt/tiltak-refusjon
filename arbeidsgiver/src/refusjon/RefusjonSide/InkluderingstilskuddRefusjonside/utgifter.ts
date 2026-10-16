export interface AvtaltUtgift {
    navn: string;
    kategori: string;
    avtaltBeløp: number;
}

// Midlertidig: skal hentes fra avtaleinnhold når backend er klar
export const AVTALTE_UTGIFTER: AvtaltUtgift[] = [
    { navn: 'Kontorstol', kategori: 'c', avtaltBeløp: 3212 },
    { navn: 'PC', kategori: 'a', avtaltBeløp: 12000 },
    { navn: 'Photoshop', kategori: 'b', avtaltBeløp: 432 },
];

export type UtgiftBeløp = Record<string, string>;

export const parseBeløp = (verdi: string | undefined): number | undefined => {
    if (verdi === undefined || verdi.trim() === '') return undefined;
    const normalisert = verdi.replace(/\s/g, '').replace(',', '.');
    if (!/^\d+(\.\d{1,2})?$/.test(normalisert)) return undefined;
    return Number(normalisert);
};

export const beløpFeilmelding = (verdi: string | undefined): string | undefined => {
    if (verdi === undefined || verdi.trim() === '') return undefined;
    return parseBeløp(verdi) === undefined ? 'Beløpet må være et positivt tall med maks to desimaler' : undefined;
};

export interface Utgiftsberegning {
    sumUtgifter: number;
    fratrekkOverstigendeBeløp: number;
    refusjonsbeløp: number;
}

const avrund = (beløp: number) => Math.round(beløp * 100) / 100;

export const beregnUtgifter = (utgifter: AvtaltUtgift[], beløp: UtgiftBeløp): Utgiftsberegning => {
    const linjer = utgifter.map((utgift) => {
        const brukt = parseBeløp(beløp[utgift.navn]) ?? 0;
        return { brukt, fratrekk: Math.max(0, brukt - utgift.avtaltBeløp) };
    });
    const sumUtgifter = avrund(linjer.reduce((sum, linje) => sum + linje.brukt, 0));
    const fratrekkOverstigendeBeløp = avrund(linjer.reduce((sum, linje) => sum + linje.fratrekk, 0));
    return {
        sumUtgifter,
        fratrekkOverstigendeBeløp,
        refusjonsbeløp: avrund(sumUtgifter - fratrekkOverstigendeBeløp),
    };
};
