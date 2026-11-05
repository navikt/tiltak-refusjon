import React, { FunctionComponent } from 'react';
import VerticalSpacer from '~/VerticalSpacer';
import VisRefusjonerFilter from './VisRefusjonerFilter';
import StatusFilter from '~/Filtermeny/StatusFilter/StatusFilter';
import TiltakFilter from '~/Filtermeny/TiltakFilter/TiltakFilter';
import { Filter } from '~/types/filter';
import { useFeatureToggles } from '@/featureToggles/FeatureToggleProvider';
import { Feature } from '@/featureToggles/features';

interface Props {
    filter: Filter;
    oppdaterFilter: (nyttFilter: Partial<Filter>) => void;
    options: { erArbeidsgiver: boolean; harKorreksjonTilgang: boolean };
}

const Filtermeny: FunctionComponent<Props> = ({ filter, oppdaterFilter, options }) => {
    const featureToggles = useFeatureToggles();

    return (
        <div role="menubar" aria-label="meny for filtrering av refusjoner">
            <VisRefusjonerFilter />
            <VerticalSpacer rem={1.25} />
            <StatusFilter filter={filter} oppdaterFilter={oppdaterFilter} options={options} />
            <VerticalSpacer rem={1.25} />
            <TiltakFilter
                filter={filter}
                oppdaterFilter={oppdaterFilter}
                visInkluderingstilskudd={featureToggles[Feature.InkluderingstilskuddRefusjon] ?? false}
            />
            <VerticalSpacer rem={1.25} />
        </div>
    );
};

export default Filtermeny;
