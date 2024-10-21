import React, { FunctionComponent } from 'react';
import Info from './Info';
import { Pagination } from '@navikt/ds-react';
import { useHentRefusjoner } from '../../services/rest-service';

import { useFilter } from './FilterContext';
import OversiktTabell from '~/OversiktTabell';
import TabellBodySaksbehandler from '~/OversiktTabell/TableBodySaksbehandler';
import SaksbehanderTableHeader from '~/OversiktTabell/TableHeader/SaksbehandlerTableHeader';

import './Oversikt.less';
import BEMHelper from '~/utils/bem';
import LenkePanel from '~/LenkePanel/LenkePanel';
const cls = BEMHelper('oversikt');

const Oversikt: FunctionComponent = () => {
    const { filter, oppdaterFilter } = useFilter();

    const refusjonerPage = useHentRefusjoner(filter);

    if (refusjonerPage === undefined) {
        return <Info tekst="Oppgi søkekriterier for å finne refusjoner" />;
    }

    if (refusjonerPage.totalItems === 0) {
        return <Info tekst="Finner ingen refusjoner" />;
    }

    return (
        <nav className={cls.className} aria-label="Main" role={"list"} >
            <LenkePanel refusjoner={refusjonerPage.refusjoner} />
            <OversiktTabell tableHeader={<SaksbehanderTableHeader/>} tableBody={<TabellBodySaksbehandler refusjoner={refusjonerPage.refusjoner}/>}/>
            <Pagination className={cls.element('pagination')}
                page={refusjonerPage.currentPage + 1}
                onPageChange={(x) => oppdaterFilter({ page: x - 1 })}
                count={refusjonerPage.totalPages}
                boundaryCount={1}
                siblingCount={1}
            />
        </nav>
    );
};

export default Oversikt;
