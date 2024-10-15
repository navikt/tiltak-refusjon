import React, { FunctionComponent } from 'react';
import { useInnloggetBruker } from '../../bruker/BrukerContext';
import { useHentRefusjoner } from '../../services/rest-service';
import { antallRefusjoner } from '../../utils/amplitude-utils';
import { useFilter } from './FilterContext';
import FinnerIngenRefusjoner from './FinnerIngenRefusjon/FinnerIngenRefusjoner';
import { BrukerContextType } from '../../bruker/BrukerContextType';
import useOppdaterPagedata from '../../bruker/bedriftsmenyRefusjon/useOppdaterPagedata';
import OversiktTabell from '~/OversiktTabell';
import ArbeidsgiverTableBody from '~/OversiktTabell/ArbeidsgiverTableBody';
import ArbeidsgiverOversiktHeaders from '~/OversiktTabell/TableHeader/ArbeidsgiverTableHeader';

import BEMHelper from '../../utils/bem';
import { Pagination } from '@navikt/ds-react';


import './Oversikt.less';
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
                        <OversiktTabell role="list" tableHeader={<ArbeidsgiverOversiktHeaders filter={filter} oppdaterFilter={oppdaterFilter} />} tableBody={<ArbeidsgiverTableBody refusjoner={pageable.refusjoner}/>} />
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                            <Pagination className={cls.element('pagination')}
                                page={pageable.currentPage + 1}
                                onPageChange={(x) => oppdaterFilter({ page: x - 1 })}
                                count={pageable.totalPages}
                                boundaryCount={1}
                                siblingCount={1}
                            />
                        </div>
                    </>
                ) : (
                    <FinnerIngenRefusjoner orgnr={brukerContext.valgtBedrift.valgtOrg?.[0].OrganizationNumber} />
                )}
        </nav>
    );
};

export default Oversikt;
