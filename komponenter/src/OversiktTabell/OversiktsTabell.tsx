import { SortState, Table } from '@navikt/ds-react';
import { Suspense, useEffect, useState } from 'react';
import { BegrensetRefusjon, Filter, SortingOrder } from '~/types';
import OversiktsTabellHeader from './OversiktsTabellHeader';
import OversiktsTabellBody from './OversiktsTabellBody';
import styles from './OversiktsTabell.module.less';
import OversiktsTabellSkeleton from './OversiktsTabellSkeleton';

export type Avtalepart = 'saksbehandler' | 'arbeidsgiver';

interface Props {
    oppdaterFilter: (nyttFilter: Partial<Filter>) => void;
    refusjoner: BegrensetRefusjon[];
    avtalepart: Avtalepart;
}

export type TableHeaderType = {
    navn: string;
    beskrivelse: string;
};

const tableHeaders: TableHeaderType[] = [
    { navn: 'Refusjon', beskrivelse: 'Refusjonsnummer' },
    { navn: 'Tiltakstype', beskrivelse: 'Tiltakstype' },
    { navn: 'Bedrift', beskrivelse: 'Bedrift' },
    { navn: 'Deltaker', beskrivelse: 'Deltaker' },
    { navn: 'Periode', beskrivelse: 'Periode' },
    { navn: 'Status', beskrivelse: 'Status' },
    { navn: 'Frist', beskrivelse: 'Frist for godkjenning' },
];

export interface RefusjonSortState extends SortState {
    orderBy: (typeof tableHeaders)[number]['navn'];
}

const getSortingOrder = (sort?: RefusjonSortState): SortingOrder | undefined => {
    if (!sort || sort.direction === 'none') {
        return undefined;
    }
    switch (sort.orderBy) {
        case 'Refusjon':
            return sort.direction === 'ascending'
                ? SortingOrder.REFUSJONSNUMMER_ASC
                : SortingOrder.REFUSJONSNUMMER_DESC;
        case 'Tiltakstype':
            return sort.direction === 'ascending' ? SortingOrder.TILTAKSTYPE_ASC : SortingOrder.TILTAKSTYPE_DESC;
        case 'Bedrift':
            return sort.direction === 'ascending' ? SortingOrder.BEDRIFT_ASC : SortingOrder.BEDRIFT_DESC;
        case 'Deltaker':
            return sort.direction === 'ascending' ? SortingOrder.DELTAKER_ASC : SortingOrder.DELTAKER_DESC;
        case 'Periode':
            return sort.direction === 'ascending' ? SortingOrder.PERIODE_ASC : SortingOrder.PERIODE_DESC;
        case 'Status':
            return sort.direction === 'ascending' ? SortingOrder.STATUS_ASC : SortingOrder.STATUS_DESC;
        case 'Frist':
            return sort.direction === 'ascending'
                ? SortingOrder.FRISTFORGODKJENNING_ASC
                : SortingOrder.FRISTFORGODKJENNING_DESC;
        default:
            return undefined;
    }
};

const OversiktsTabell = (props: Props) => {
    const { oppdaterFilter, refusjoner, avtalepart } = props;
    const [sort, setSort] = useState<RefusjonSortState | undefined>();

    useEffect(() => {
        oppdaterFilter({ sorting: getSortingOrder(sort) });
    }, [sort]);

    const handleSort = (sortkey: string) => {
        if (sort?.orderBy !== sortkey) {
            setSort({ orderBy: sortkey, direction: 'ascending' });
        } else {
            switch (sort?.direction) {
                case undefined:
                case 'none':
                    setSort({ orderBy: sortkey, direction: 'ascending' });
                    break;
                case 'ascending':
                    setSort({ orderBy: sortkey, direction: 'descending' });
                    break;
                case 'descending':
                default:
                    setSort(undefined);
            }
        }
    };

    return (
        <Suspense fallback={<OversiktsTabellSkeleton headers={tableHeaders} />}>
            <Table role="list" className={styles.oversiktTabell} sort={sort} onSortChange={handleSort}>
                <OversiktsTabellHeader headers={tableHeaders} sort={sort} />
                <OversiktsTabellBody refusjoner={refusjoner} avtalepart={avtalepart} />
            </Table>
        </Suspense>
    );
};

export default OversiktsTabell;
