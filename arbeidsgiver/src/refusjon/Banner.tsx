import { History } from 'history';
import { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';
import { Location, useLocation, useNavigate } from 'react-router';
import BedriftsmenyRefusjon from '../bruker/bedriftsmenyRefusjon/BedriftsmenyRefusjon';
import { Bedriftvalg, Organisasjon, OrganisasjonNy } from '../bruker/bedriftsmenyRefusjon/api/api';

interface Properties {
    organisasjoner: Organisasjon[];
    organisasjonerNy: OrganisasjonNy[];
    valgtBedrift: Bedriftvalg | undefined;
    setValgtBedrift: (org: Bedriftvalg) => void;
}

const Banner: FunctionComponent<Properties> = (props: PropsWithChildren<Properties>) => {
    const location = useLocation();
    const [listener, setListener] = useState<(props: { action: string; location: Location }) => void>();

    useEffect(() => {
        if (listener) {
            listener({ action: 'REPLACE', location });
        }
    }, [location, listener]);

    const navigate = useNavigate();

    const customHistory: Pick<History, 'listen' | 'replace'> = {
        replace: (to) => {
            navigate(to, { replace: true });
        },
        listen: (nyListener) => () => {
            setListener(() => nyListener);
        },
    };

    const organisasjonerAltinn3: Organisasjon[] = props.organisasjonerNy.flatMap((org: OrganisasjonNy) => {
        const overOgUnderEnheter: Organisasjon[] = [];

        if (org.underenheter.length > 0) {
            org.underenheter.forEach((underenhet) => {
                const underenhetObj: Organisasjon = {
                    OrganizationNumber: underenhet.orgnr,
                    Name: underenhet.navn,
                    OrganizationForm: underenhet.organisasjonsform,
                    Type: underenhet.organisasjonsform === 'BEDR' ? 'Business' : 'Enterprise',
                    Status: 'Active', // Assuming all organizations are active
                    ParentOrganizationNumber: org.orgnr,
                };
                overOgUnderEnheter.push(underenhetObj);
            });
            // overOgUnderEnheter.push(...org.underenheter);
        }

        const parent: Organisasjon = {
            OrganizationNumber: org.orgnr,
            Name: org.navn,
            OrganizationForm: org.organisasjonsform,
            Type: org.organisasjonsform === 'BEDR' ? 'Business' : 'Enterprise',
            Status: 'Active', // Assuming all organizations are active
            ParentOrganizationNumber:
                props.organisasjonerNy.find((parentOrg) =>
                    parentOrg.underenheter?.some((underenhet) => underenhet.orgnr === org.orgnr)
                )?.orgnr || '',
        };
        overOgUnderEnheter.push(parent);
        return overOgUnderEnheter;
    });

    // const isLeaf = (organisasjon: OrganisasjonNy) => {
    //     return organisasjon.underenheter.length === 0;
    // };
    // const split = <T extends OrganisasjonNy>(predicate: (o: T) => boolean, liste: T[]): T[][] => {
    //     const children = liste.filter(predicate);
    //     const otherParents = liste.filter((e) => !predicate(e));
    //     return [children, otherParents];
    // };
    // const flatUtHierarki = (organisasjonstre: OrganisasjonNy[]): OrganisasjonNy[] => {
    //     const mapR = (parent: OrganisasjonNy): OrganisasjonNy[] => {
    //         const [children, otherParents] = split(isLeaf, parent.underenheter);
    //         return [
    //             ...(children.length > 0
    //                 ? [
    //                       {
    //                           ...parent,
    //                           underenheter: children,
    //                       },
    //                   ]
    //                 : []),
    //             ...otherParents.flatMap(mapR),
    //         ];
    //     };
    //     return organisasjonstre.flatMap((o) => mapR(o)).sort((a, b) => a.navn.localeCompare(b.navn));
    // };

    console.log('organisasjonerAltinn3', organisasjonerAltinn3);
    // console.log('flatUtHierarki', flatUtHierarki(props.organisasjonerNy));

    return (
        <BedriftsmenyRefusjon
            //organisasjoner={props.organisasjoner}
            organisasjoner={organisasjonerAltinn3}
            valgtBedrift={props.valgtBedrift}
            setValgtBedrift={props.setValgtBedrift}
            history={customHistory as History}
            sendCallbackAlleClick={true}
        />
    );
};

export default Banner;
