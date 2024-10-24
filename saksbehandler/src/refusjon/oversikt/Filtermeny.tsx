import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import VisRefusjonerFilter from './VisRefusjonerFilter';
import StatusFilter from '~/Filtermeny/StatusFilter/StatusFilter';
import TiltakFilter from '~/Filtermeny/TiltakFilter/TiltakFilter';
import { Filter } from '~/types/filter';

interface Props {
    filter: Filter;
    oppdaterFilter: (nyttFilter: Partial<Filter>) => void;
    brukerContext: any;
}

const Filtermeny: FunctionComponent<Props> = ({filter, oppdaterFilter, brukerContext}) => {

    return (
        <div role="menubar" aria-label="meny for filtrering av refusjoner">
            <VisRefusjonerFilter />
            <VerticalSpacer rem={1.25} />
            <StatusFilter filter={filter} oppdaterFilter={oppdaterFilter} brukerContext={brukerContext}/>
            <VerticalSpacer rem={1.25} />
            <TiltakFilter filter={filter} oppdaterFilter={oppdaterFilter}  />
            <VerticalSpacer rem={1.25} />
        </div>
    );
};

export default Filtermeny;
