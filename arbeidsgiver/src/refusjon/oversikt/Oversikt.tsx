import React, { FunctionComponent } from 'react';
import { useInnloggetBruker } from '@/bruker/BrukerContext';
import { useHentRefusjoner } from '@/services/rest-service';
import { antallRefusjoner } from '@/utils/amplitude-utils';
import FinnerIngenRefusjoner from './FinnerIngenRefusjon/FinnerIngenRefusjoner';
import { BrukerContextType } from '@/bruker/BrukerContextType';
import useOppdaterPagedata from '../../bruker/bedriftsmenyRefusjon/useOppdaterPagedata';
import OversiktTabell from '~/OversiktTabell';
import ArbeidsgiverTableBody from '~/OversiktTabell/TableBody/ArbeidsgiverTableBody';
import ArbeidsgiverTableHeader from '~/OversiktTabell/TableHeader/ArbeidsgiverTableHeader';

import { Pagination, Select } from '@navikt/ds-react';
import './Oversikt.less';
import LenkePanel from '~/LenkePanel/LenkePanel';
import { useFilter } from './FilterContext';
import BEMHelper from '~/utils/bem';

const cls = BEMHelper('oversikt');
const clsPagination = BEMHelper('avtaleoversikt-pagination');

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
                    <div className={clsPagination.className}>
                        <Pagination
                            className={clsPagination.element("pagination")}
                            page={pageable.currentPage + 1}
                            onPageChange={(x) => oppdaterFilter({ page: x - 1 })}
                            count={pageable.totalPages}
                            boundaryCount={1}
                            siblingCount={1}
                        />
                        <Select
                            label="Gå til side"
                            hideLabel={true}
                            className={clsPagination.element("page-select")}
                            onChange={(e) => oppdaterFilter({ page: parseInt(e.target.value, 10) })}
                            value={pageable.currentPage}
                        >
                            {[...Array(pageable.totalPages)].map((_, i) => (
                                <option value={i} key={i}>
                                    {i + 1}
                                </option>
                            ))}
                        </Select>
                    </div>
                </>
            ) : (
                <FinnerIngenRefusjoner orgnr={brukerContext.valgtBedrift.valgtOrg?.[0].OrganizationNumber} />
            )}
        </nav>
    );
};

export default Oversikt;
