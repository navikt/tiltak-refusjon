import React, { FunctionComponent } from 'react';
import Info from './Info';
import { useHentRefusjoner } from '@/services/rest-service';
import { useFilter } from './FilterContext';
import OversiktTabell from '~/OversiktTabell';
import './Oversikt.less';
import LenkePanel from '~/LenkePanel/LenkePanel';
import BEMHelper from '~/utils/bem';
import Paginering from '~/OversiktTabell/Pagination/paginering';

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
        <nav className={cls.className} aria-label="Main" role={'list'}>
            <LenkePanel refusjoner={refusjonerPage.refusjoner} />
            <OversiktTabell
                avtalepart="saksbehandler"
                oppdaterFilter={oppdaterFilter}
                refusjoner={refusjonerPage.refusjoner}
            />
            <Paginering pageable={refusjonerPage} oppdaterFilter={oppdaterFilter} />
        </nav>
    );
};

export default Oversikt;
