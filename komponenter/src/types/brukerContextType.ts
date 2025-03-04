export interface BrukerContextType {
    innloggetBruker: InnloggetBruker;
}

export type InnloggetRolle = 'BESLUTTER' | 'ARBEIDSGIVER';

export interface InnloggetBruker {
    identifikator: string;
    harKorreksjonTilgang?: boolean;
    rolle: InnloggetRolle;
}
