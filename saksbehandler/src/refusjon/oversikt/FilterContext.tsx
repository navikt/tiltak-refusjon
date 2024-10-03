import React, { FunctionComponent, useContext, useEffect, useState, PropsWithChildren } from 'react';
import { RefusjonStatus, Tiltak } from '../refusjon';
import { useOversiktCookie } from './OversiktCookie/OversiktCookie';
import { AktivSøk } from './VisRefusjonerFilter';

export interface Filter extends RefusjonsAktor {
    status?: RefusjonStatus;
    tiltakstype?: Tiltak;
    page?: number;
}

export interface RefusjonsAktor {
    veilederNavIdent?: string;
    deltakerFnr?: string;
    bedriftNr?: string;
    enhet?: string;
    avtaleNr?: string;
}

interface FilterContextType {
    filter: Filter;
    oppdaterFilter: (nyttFilter: Partial<Filter>) => void;
    sjekkFilterContextForSøkeVerdier: (filter: Filter) => AktivSøk | undefined;
    sjekkForOnsketRefusjonAktør: (key?: string, value?: string | keyof RefusjonStatus | keyof Tiltak) => boolean;
}

const FilterContext = React.createContext<FilterContextType | undefined>(undefined);

// Egen hook fordi det sjekkes at den blir brukt riktig, og kan ha undefined som defaultValue
export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('Kan kun brukes innenfor FilterProvider');
    }
    return context;
};

export const FilterProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const [filter, setFilter] = useState<Filter>({});
    const filterCookie = useOversiktCookie();

    useEffect(() => {
        if (
            Object.keys(filter ?? {}).length === 0 &&
            Object.keys(filterCookie?.oversiktTreffCookie ?? {}).length !== 0
        ) {
            setFilter({ ...filterCookie.oversiktTreffCookie });
        }
    }, [filter, filterCookie]);

    const sjekkFilterContextForSøkeVerdier = (filter: Filter): AktivSøk | undefined => {
        const treff = Object.entries(filter)
            .find((n) => sjekkForOnsketRefusjonAktør(n?.[0], n?.[1]))
            ?.flatMap((e) => e);
        if (treff) {
            return { type: treff?.[0], søkeVerdi: treff?.[1] };
        }
        return undefined;
    };

    const sjekkForOnsketRefusjonAktør = (
        key: string = '',
        value?: string | keyof RefusjonStatus | keyof Tiltak
    ): boolean => {
        if (value) {
            switch (key) {
                case 'veilederNavIdent':
                case 'deltakerFnr':
                case 'bedriftNr':
                case 'enhet':
                case 'avtaleNr':
                    return true;
                default:
                    return false;
            }
        }
        return false;
    };

    const oppdaterFilter = (nyttFilter: Partial<Filter>) => {
        // Ved å sette inn "page: 0" i midten av objektet oppnår vi at alle andre endringer
        // i filter fører til at paginering nullstilles, med mindre endringen ER paginering
        // (da overstyres "page: 0" av den valgte siden i stedet)
        const nyttMergedFilter = { ...filter, page: 0, ...nyttFilter };
        setFilter(nyttMergedFilter);
        filterCookie.oppdatereSokeVerdiCookie({ ...nyttMergedFilter });
    };

    return (
        <FilterContext.Provider
            value={{
                filter,
                oppdaterFilter,
                sjekkFilterContextForSøkeVerdier,
                sjekkForOnsketRefusjonAktør,
            }}
        >
            {props.children}
        </FilterContext.Provider>
    );
};
