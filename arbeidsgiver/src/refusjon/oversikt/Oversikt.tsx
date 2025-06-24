import React, { FunctionComponent } from 'react';
import { useInnloggetBruker } from '@/bruker/BrukerContext';
import { useHentRefusjoner } from '@/services/rest-service';
import { antallRefusjoner } from '@/utils/amplitude-utils';
import FinnerIngenRefusjoner from './FinnerIngenRefusjon/FinnerIngenRefusjoner';
import { BrukerContextType } from '@/bruker/BrukerContextType';
import useOppdaterPagedata from '@/bruker/bedriftsmenyRefusjon/useOppdaterPagedata';
import OversiktTabell from '~/OversiktTabell';
import ArbeidsgiverTableBody from '~/OversiktTabell/TableBody/ArbeidsgiverTableBody';
import ArbeidsgiverTableHeader from '~/OversiktTabell/TableHeader/ArbeidsgiverTableHeader';
import './oversikt.less';
import LenkePanel from '~/LenkePanel/LenkePanel';
import { useFilter } from './FilterContext';
import BEMHelper from '~/utils/bem';
import Paginering from '~/OversiktTabell/Pagination/paginering';

const cls = BEMHelper('oversikt');

const Oversikt: FunctionComponent = () => {
    const brukerContext: BrukerContextType = useInnloggetBruker();
    const { setValgtBedrift, valgtBedrift } = brukerContext;
    const { filter, oppdaterFilter } = useFilter();
    const pageable = useHentRefusjoner(brukerContext, filter);
    const { refusjoner } = pageable;

    useOppdaterPagedata(pageable, valgtBedrift, setValgtBedrift);
    antallRefusjoner(refusjoner.length > 0 ? refusjoner.length : 0);

    return (
        <nav className={cls.className} aria-label="Main">
            {refusjoner.length > 0 ? (
                <>
                    <LenkePanel refusjoner={pageable.refusjoner} />
                    <OversiktTabell
                        tableHeader={<ArbeidsgiverTableHeader filter={filter} oppdaterFilter={oppdaterFilter} />}
                        tableBody={<ArbeidsgiverTableBody refusjoner={pageable.refusjoner} />}
                    />
                    <Paginering pageable={pageable} oppdaterFilter={oppdaterFilter} />
                </>
            ) : (
                <FinnerIngenRefusjoner orgnr={brukerContext.valgtBedrift.valgtOrg?.[0].OrganizationNumber} />
            )}
        </nav>
    );
};

export default Oversikt;
