import React, { FunctionComponent } from 'react';
import { Filter } from '~/types/filter';
import { useMediaQuery } from 'react-responsive';
import TiltakFilter from './TiltakFilter/TiltakFilter';
import StatusFilter from './StatusFilter/StatusFilter';
import { brukerflate } from '~/utils/amplitude-utils';

interface Props {
    filter: Filter;
    oppdaterFilter: (nyttFilter: Partial<Filter>) => void;
    options: { erArbeidsgiver: boolean; harKorreksjonTilgang: boolean; featureToggleVTAO: boolean};
}

const Filtermeny: FunctionComponent<Props> = ({ filter, oppdaterFilter, options }) => {
    const erDesktopStorrelse = useMediaQuery({ minWidth: 768 });
    brukerflate(erDesktopStorrelse);
    return (
        <div>
            <StatusFilter filter={filter} oppdaterFilter={oppdaterFilter} options={options} />
            <div style={{ marginTop: '0.75rem' }} />
            <TiltakFilter filter={filter} oppdaterFilter={oppdaterFilter} options={options} />
        </div>
    );
};

export default Filtermeny;
