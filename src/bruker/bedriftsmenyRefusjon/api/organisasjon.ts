import { History } from 'history';
import { Dispatch, SetStateAction } from 'react';

export enum ClsBedriftsmeny {
    BEDRIFTSMENY_REFUSJON = 'bedriftsmeny-refusjon',
    BEDRIFTSMENY = 'bedriftsmenyen',
    MENYINNHOLD = 'menyInnhold',
    SOK_ETTER_BEDRIFTER = 'sok-etter-bedrifter',
}

export enum PageSizeOption {
    FIVE = 5,
    SEVEN = 7,
    TEN = 10,
}

export interface Organisasjon {
    Name: string;
    Type: string;
    OrganizationNumber: string;
    OrganizationForm: string;
    Status: string;
    ParentOrganizationNumber: string;
}

export interface Juridiskenhet {
    JuridiskEnhet: Organisasjon;
    Underenheter: Array<Organisasjon>;
    SokeresultatKunUnderenhet?: boolean;
}

export enum Feilstatus {
    JURIDISK_MANGLER_UNDERENHET = 'JURIDISK_MANGLER_UNDERENHET',
    UNDERENHET_MANGLET_JURIDISK = '',
}

export enum BedriftvalgType {
    ENKELBEDRIFT = 'ENKELBEDRIFT',
    FLEREBEDRIFTER = 'FLEREBEDRIFTER',
    ALLEBEDRIFTER = 'ALLEBEDRIFTER',
}

export interface Bedriftvalg {
    type: BedriftvalgType;
    valgtOrg: Array<Organisasjon>;
    pageData: PageData;
    feilstatus: Feilstatus | undefined;
}

export type BedriftListe = Array<{ index: number; apnet: boolean }> | undefined;

export interface MenyContextType {
    valgtBedrift: Bedriftvalg | undefined;
    setValgtBedrift: (org: Bedriftvalg) => void;
    organisasjoner: Organisasjon[];
    history: History;
    organisasjonstre: Array<Juridiskenhet> | undefined;
    setOrganisasjonstre: Dispatch<SetStateAction<Array<Juridiskenhet> | undefined>>;
    menyApen: boolean;
    setMenyApen: Dispatch<SetStateAction<boolean>>;
    bedriftvalg: Bedriftvalg;
    setBedriftvalg: Dispatch<SetStateAction<Bedriftvalg>>;
    bedriftListe: BedriftListe;
    setBedriftListe: Dispatch<SetStateAction<BedriftListe>>;
    desktopview: boolean;
}

export const initPageData: PageData = {
    page: 0,
    pagesize: 7,
    currentPage: 0,
    size: 0,
    totalItems: 0,
    totalPages: 0,
};

export const initBedriftvalg: Bedriftvalg = {
    type: BedriftvalgType.ENKELBEDRIFT,
    valgtOrg: [] as Array<Organisasjon>,
    pageData: initPageData,
    feilstatus: undefined,
};

export interface PageData {
    page: number;
    pagesize: number;
    currentPage: number;
    size: number;
    totalItems: number;
    totalPages: number;
}
export const initOrganisasjon: Organisasjon = {
    Name: '',
    Type: '',
    OrganizationNumber: '',
    OrganizationForm: '',
    Status: '',
    ParentOrganizationNumber: '',
};

export interface OrganisasjonEnhetsregisteret {
    organisasjonsnummer: string;
    navn: string;
    organisasjonsform: {
        kode: string;
        beskrivelse: string;
    };
    overordnetEnhet: string;
}

export const initEnhetsregOrg: OrganisasjonEnhetsregisteret = {
    organisasjonsnummer: '',
    navn: '',
    organisasjonsform: {
        kode: '',
        beskrivelse: '',
    },
    overordnetEnhet: '',
};

export interface ListeJuridiskeEnheter {
    _embedded: {
        enheter: OrganisasjonEnhetsregisteret[];
    };
    _links: {
        self: {
            href: string;
        };
    };
    page: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: 0;
    };
}
