import React, { FunctionComponent } from 'react';
import Info from './Info';
import { Pagination, Select } from '@navikt/ds-react';
import { useHentRefusjoner } from '@/services/rest-service';

import { useFilter } from './FilterContext';
import OversiktTabell from '~/OversiktTabell';
import TabellBodySaksbehandler from '~/OversiktTabell/TableBody/TableBodySaksbehandler';
import SaksbehanderTableHeader from '~/OversiktTabell/TableHeader/SaksbehandlerTableHeader';
import './Oversikt.less';
import LenkePanel from '~/LenkePanel/LenkePanel';
import BEMHelper from '~/utils/bem';

const cls = BEMHelper('oversikt');
const clsPagination = BEMHelper('avtaleoversikt-pagination');

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
        <nav className={cls.className} aria-label="Main" role={'list'}>
            <LenkePanel refusjoner={refusjonerPage.refusjoner} />
            <OversiktTabell
                tableHeader={<SaksbehanderTableHeader />}
                tableBody={<TabellBodySaksbehandler refusjoner={refusjonerPage.refusjoner} />}
            />
            <div className={clsPagination.className}>
                <Pagination
                    className={clsPagination.element('pagination')}
                    page={refusjonerPage.currentPage + 1}
                    onPageChange={(x) => oppdaterFilter({ page: x - 1 })}
                    count={refusjonerPage.totalPages}
                    boundaryCount={1}
                    siblingCount={1}
                />
                <Select
                    label="Gå til side"
                    hideLabel={true}
                    className={clsPagination.element('page-select')}
                    onChange={(e) => oppdaterFilter({ page: parseInt(e.target.value, 10) })}
                    value={refusjonerPage.currentPage}
                >
                    {[...Array(refusjonerPage.totalPages)].map((_, i) => (
                        <option value={i} key={i}>
                            {i + 1}
                        </option>
                    ))}
                </Select>
            </div>
        </nav>
    );
};

export default Oversikt;
