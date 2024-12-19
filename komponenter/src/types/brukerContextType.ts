export type Bedrift = string;

export interface BrukerContextType {
    innloggetBruker: InnloggetBruker;
    // valgtBedrift: Bedrift;
}

export interface InnloggetBruker {
    identifikator: string;
    harKorreksjonTilgang: boolean;
    rolle: 'BESLUTTER' | 'ARBEIDSGIVER';
    // organisasjoner: Organisasjon[];
    // tilganger: Bedrift[];
}
