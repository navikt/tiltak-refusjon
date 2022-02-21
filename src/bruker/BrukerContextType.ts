import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { Bedriftvalg } from './bedriftsmenyRefusjon/api/organisasjon';
import { Dispatch, SetStateAction } from 'react';

export type Bedrift = string;

export type Bedriftliste = Array<Bedrift> | undefined;

export interface BrukerContextType {
    innloggetBruker: InnloggetBruker;
    valgtBedrift: Bedriftvalg;
    setValgtBedrift: Dispatch<SetStateAction<Bedriftvalg | undefined>>;
}

export interface InnloggetBruker {
    identifikator: string;
    organisasjoner: Organisasjon[];
    tilganger: Bedrift[];
}
