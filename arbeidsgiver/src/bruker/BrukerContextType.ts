import { Organisasjon } from '@navikt/bedriftsmeny/lib/types/organisasjon';
import { Bedriftvalg } from './bedriftsmenyRefusjon/api/api';
import { Dispatch, SetStateAction } from 'react';
import { InnloggetBruker as FellesInnloggetBruker } from '~/types/brukerContextType';

export type Bedrift = string;

export interface BrukerContextType {
    innloggetBruker: InnloggetBruker;
    valgtBedrift: Bedriftvalg;
    setValgtBedrift: Dispatch<SetStateAction<Bedriftvalg>>;
}

export interface InnloggetBruker extends FellesInnloggetBruker {
    organisasjoner: Organisasjon[];
    tilganger: Bedrift[];
}
