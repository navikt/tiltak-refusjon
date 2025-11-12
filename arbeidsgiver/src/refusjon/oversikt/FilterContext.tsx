import React, { FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { RefusjonStatus } from '~/types/status';
import { Tiltak } from '~/types/tiltak';
import { Filter, SortingOrder } from '~/types/filter';

type FilterContextType = { filter: Filter; oppdaterFilter: (nyttFilter: Partial<Filter>) => void };

const FilterContext = React.createContext<FilterContextType | undefined>(undefined);

// Egen hook fordi det sjekkes at den blir brukt riktig, og kan ha undefined som defaultValue
export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('Kan kun brukes innenfor FilterProvider');
    }
    return context;
};

const searchParamsToFilter = (searchParams: URLSearchParams): Filter => {
    return {
        status: (searchParams.get('status') || undefined) as RefusjonStatus | undefined,
        tiltakstype: (searchParams.get('tiltakstype') || undefined) as Tiltak | undefined,
        sorting: (searchParams.get('sorting') || undefined) as SortingOrder | undefined,
        page: searchParams.has('page') ? parseInt(searchParams.get('page') || '') : undefined,
        size: searchParams.has('size') ? parseInt(searchParams.get('size') || '') : 10,
    };
};

// Alle oppdateringer av søkefilter går først veien via adresselinjen, før filteret til slutt oppdateres.
// Slik sikrer vi at adresselinjen er sannhetskilden for filtre og paginering, og sparer oss forhåpentligvis for synkroniseringsproblemer.
export const FilterProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState<Filter>(searchParamsToFilter(searchParams));

    useEffect(() => {
        setFilter(searchParamsToFilter(searchParams));
    }, [searchParams]);

    // Lite elegant og høyst manuell måte å oppdatere adresselinjen på når vi setter nye filterverdier
    const oppdaterSearchParams = (searchParams: URLSearchParams, nyttFilter: Partial<Filter>) => {
        const newSearchParams = new URLSearchParams(searchParams);
        // Hvis vi bytter status eller tiltakstype, gå til page 0 (status='Alle' er undefined, så vi bruker hasOwnProperty)
        if (
            Object.prototype.hasOwnProperty.call(nyttFilter, 'status') ||
            Object.prototype.hasOwnProperty.call(nyttFilter, 'tiltakstype')
        ) {
            newSearchParams.delete('page');
        }
        // Hvis vi "nuller ut" status, slett parameteren fra URL
        if (Object.prototype.hasOwnProperty.call(nyttFilter, 'status') && nyttFilter.status === undefined)
            newSearchParams.delete('status');
        if (nyttFilter.status) newSearchParams.set('status', nyttFilter.status);
        // Hvis vi "nuller ut" tiltakstype, slett parameteren fra URL
        if (Object.prototype.hasOwnProperty.call(nyttFilter, 'tiltakstype') && nyttFilter.tiltakstype === undefined)
            newSearchParams.delete('tiltakstype');
        if (nyttFilter.tiltakstype) newSearchParams.set('tiltakstype', nyttFilter.tiltakstype);
        if (nyttFilter.sorting) newSearchParams.set('sorting', nyttFilter.sorting);
        // Sneaky javascript-logikk: side 0 vil tolkes som false, så vi må sjekke det også
        if (
            Object.prototype.hasOwnProperty.call(nyttFilter, 'page') &&
            (nyttFilter.page === undefined || nyttFilter.page === 0)
        )
            newSearchParams.delete('page');
        if (nyttFilter.page) newSearchParams.set('page', `${nyttFilter.page}`);
        if (nyttFilter.size) newSearchParams.set('size', `${nyttFilter.size}`);

        setSearchParams(newSearchParams);
    };

    const oppdaterFilter = (nyttFilter: Partial<Filter>) => {
        oppdaterSearchParams(searchParams, nyttFilter);
    };

    return (
        <FilterContext.Provider
            value={{
                filter,
                oppdaterFilter,
            }}
        >
            {props.children}
        </FilterContext.Provider>
    );
};
