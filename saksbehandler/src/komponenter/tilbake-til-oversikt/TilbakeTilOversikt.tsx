import { FunctionComponent } from 'react';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Link } from 'react-router';

import './tilbaketTilOversikt.less';
import BEMHelper from '~/utils/bem';

const TilbakeTilOversikt: FunctionComponent = () => {
    const cls = BEMHelper('tilbake-til-oversikt');
    return (
        <div className={cls.className}>
            <Link to={{ pathname: '/', search: window.location.search }} className={cls.element('lenke')}>
                <ChevronLeftIcon aria-hidden={true} className={cls.element('chevron')} />
                Tilbake til oversikt
            </Link>
        </div>
    );
};

export default TilbakeTilOversikt;
