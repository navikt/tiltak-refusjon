import { Bedriftvalg, BedriftvalgType, Organisasjon, Organisasjonlist } from './api';
import { History } from 'history';

const ORGNUMMER_PARAMETER = 'bedrift';
const ENKELT_BEDRIFT_URL = 1;

export const appendUrl = (orgnummer: string, history: History): void => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set(ORGNUMMER_PARAMETER, orgnummer);
    const { search } = currentUrl;
    history.replace({ search });
};

export const hentUnderenheter = (organisasjonstre: Organisasjonlist): Organisasjon[] =>
    organisasjonstre.list.reduce(
        (organisasjoner: Organisasjon[], parentOrg) => [...organisasjoner, ...parentOrg.Underenheter],
        []
    );

export const hentOrgnummerFraUrl = (): string | null =>
    new URL(window.location.href).searchParams.get(ORGNUMMER_PARAMETER);

export const altinnOrganisasjonerErInitialisertMedEnIkkeTomList = (orgtre: Organisasjonlist): boolean =>
    orgtre?.list?.length > 0;

export const filtrerOrgMatchUrl = (orgtre: Organisasjonlist, orgnummerFraUrl: string | null): Organisasjon[] =>
    hentUnderenheter(orgtre).filter((org) => orgnummerFraUrl?.split(',').includes(org.OrganizationNumber));

export const definerDefaultBedriftvalgType = (
    orgnummerFraUrl: string | null,
    valgtBedrift: Bedriftvalg | undefined
): BedriftvalgType => {
    if (orgnummerFraUrl) {
        switch (true) {
            case orgnummerFraUrl === BedriftvalgType.ALLEBEDRIFTER:
                return BedriftvalgType.ALLEBEDRIFTER;
            case orgnummerFraUrl.split(',').length > ENKELT_BEDRIFT_URL:
                return BedriftvalgType.FLEREBEDRIFTER;
            default:
                return BedriftvalgType.ENKELBEDRIFT;
        }
    }
    return valgtBedrift?.type ?? BedriftvalgType.ALLEBEDRIFTER;
};

const serializeOrgNr = (valgtOrg: Array<Organisasjon> | undefined): string | undefined =>
    valgtOrg?.map((o) => o.OrganizationNumber).join(',');

export const bedriftContextInitialisert = (
    valgtBedrift: Bedriftvalg | undefined,
    bedriftvalg: Bedriftvalg | undefined,
    orgnummerFraUrl: string | null
): boolean => {
    const valgtOrganisasjoner: string | undefined = serializeOrgNr(valgtBedrift?.valgtOrg);
    return (
        valgtOrganisasjoner === serializeOrgNr(bedriftvalg?.valgtOrg) ||
        (valgtOrganisasjoner === orgnummerFraUrl && orgnummerFraUrl?.length > 0)
    );
};
