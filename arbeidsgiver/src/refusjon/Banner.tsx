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
                    Type: underenhet.organisasjonsform === 'BEDR' ? 'Business' : 'Enterprise', // TODO: Verifiser dette med fager.
                    Status: 'Active', // Assuming all organizations are active // TODO: Verifiser dette med fager.
                    ParentOrganizationNumber: org.orgnr,
                };
                overOgUnderEnheter.push(underenhetObj);
            });
        }

        const parent: Organisasjon = {
            OrganizationNumber: org.orgnr,
            Name: org.navn,
            OrganizationForm: org.organisasjonsform,
            Type: org.organisasjonsform === 'BEDR' ? 'Business' : 'Enterprise', // TODO: Verifser dette med fager.
            Status: 'Active', // Assuming all organizations are active // TODO: Verifiser dette med fager.
            ParentOrganizationNumber:
                props.organisasjonerNy.find((parentOrg) =>
                    parentOrg.underenheter?.some((underenhet) => underenhet.orgnr === org.orgnr)
                )?.orgnr || '',
        };
        overOgUnderEnheter.push(parent);
        return overOgUnderEnheter;
    });

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
