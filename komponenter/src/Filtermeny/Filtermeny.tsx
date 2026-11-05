import React, { FunctionComponent } from 'react';
import { Filter } from '~/types/filter';
import TiltakFilter from './TiltakFilter/TiltakFilter';
import StatusFilter from './StatusFilter/StatusFilter';

interface Props {
    filter: Filter;
    oppdaterFilter: (nyttFilter: Partial<Filter>) => void;
    options: { erArbeidsgiver: boolean; harKorreksjonTilgang: boolean };
    visInkluderingstilskudd?: boolean;
}

const Filtermeny: FunctionComponent<Props> = ({ filter, oppdaterFilter, options, visInkluderingstilskudd }) => {
    return (
        <div>
            <StatusFilter filter={filter} oppdaterFilter={oppdaterFilter} options={options} />
            <div style={{ marginTop: '0.75rem' }} />
            <TiltakFilter
                filter={filter}
                oppdaterFilter={oppdaterFilter}
                visInkluderingstilskudd={visInkluderingstilskudd}
            />
        </div>
    );
};

export default Filtermeny;
