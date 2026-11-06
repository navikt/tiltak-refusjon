import { z } from 'zod';

export interface AvtaltUtgift {
    id: string;
    navn: string;
    kategori: string;
    avtaltBeløp: number;
}

// Midlertidig: skal hentes fra avtaleinnhold når backend er klar
export const AVTALTE_UTGIFTER: AvtaltUtgift[] = [
    { id: 'gbj1k23j1', navn: 'Kontorstol', kategori: 'c', avtaltBeløp: 3212 },
    { id: 'j8fj98w8d', navn: 'PC', kategori: 'a', avtaltBeløp: 12000 },
    { id: '1j43f8914', navn: 'Photoshop', kategori: 'b', avtaltBeløp: 432 },
];

// Nøkkel er AvtaltUtgift.id
export type UtgiftBeløp = Record<string, number | undefined>;

// PLACEHOLDER: antatt kontrakt mot tiltak-refusjon-api. Justeres når endepunktet finnes.
export const utgiftsberegningRequestSchema = z.object({
    utgifter: z.array(z.object({ navn: z.string(), beløp: z.int().nonnegative() })),
});

export type UtgiftsberegningRequest = z.infer<typeof utgiftsberegningRequestSchema>;

export const utgiftsberegningSchema = z.object({
    sumUtgifter: z.number(),
    fratrekkOverstigendeBeløp: z.number(),
    refusjonsbeløp: z.number(),
});

export type Utgiftsberegning = z.infer<typeof utgiftsberegningSchema>;
