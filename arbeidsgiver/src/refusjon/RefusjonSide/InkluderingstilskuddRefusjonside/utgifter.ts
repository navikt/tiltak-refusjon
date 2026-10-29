import { z } from 'zod';

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

export type UtgiftBeløp = Record<string, number | undefined>;

// PLACEHOLDER: antatt kontrakt mot tiltak-refusjon-api. Justeres når endepunktet finnes.
export const utgiftsberegningRequestSchema = z.object({
    utgifter: z.array(z.object({ navn: z.string(), beløp: z.number().nonnegative() })),
});

export type UtgiftsberegningRequest = z.infer<typeof utgiftsberegningRequestSchema>;

export const utgiftsberegningSchema = z.object({
    sumUtgifter: z.number(),
    fratrekkOverstigendeBeløp: z.number(),
    refusjonsbeløp: z.number(),
});

export type Utgiftsberegning = z.infer<typeof utgiftsberegningSchema>;
