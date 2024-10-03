import React, { FunctionComponent } from 'react';
import Info from './Info';
import { Pagination } from '@navikt/ds-react';
import { useHentRefusjoner } from '../../services/rest-service';
import BEMHelper from '../../utils/bem';
import { useFilter } from './FilterContext';
import LabelRad from './LabelRad';
import OversiktTabell from './OversiktTabell';
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
        <nav className={cls.className} aria-label="Main">
            <div role="list">
                <LabelRad />
                <OversiktTabell refusjoner={refusjonerPage.refusjoner} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    page={refusjonerPage.currentPage + 1}
                    onPageChange={(x) => oppdaterFilter({ page: x - 1 })}
                    count={refusjonerPage.totalPages}
                    boundaryCount={1}
                    siblingCount={1}
                />
            </div>
        </nav>
    );
};

export default Oversikt;
