import { Dispatch, SetStateAction } from 'react';
import { InnloggetBruker as FellesInnloggetBruker } from '~/types/brukerContextType';
import { Bedriftvalg, Organisasjon, OrganisasjonNy } from './bedriftsmenyRefusjon/api/api';

export type Bedrift = string;

export interface BrukerContextType {
    innloggetBruker: InnloggetBruker;
    valgtBedrift: Bedriftvalg;
    setValgtBedrift: Dispatch<SetStateAction<Bedriftvalg>>;
}

export interface InnloggetBruker extends FellesInnloggetBruker {
    organisasjoner: Organisasjon[];
    organisasjonerNy: OrganisasjonNy[];  
    tilganger: Bedrift[];
}
