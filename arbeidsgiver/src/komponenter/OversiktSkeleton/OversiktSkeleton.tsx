import React from 'react';
import { Skeleton, Table } from '@navikt/ds-react';
import OversiktTabell from '~/OversiktTabell';
import ArbeidsgiverTableHeader from '~/OversiktTabell/TableHeader/ArbeidsgiverTableHeader';

import BEMHelper from '~/utils/bem';
import { useFilter } from '@/refusjon/oversikt/FilterContext';

const cls = BEMHelper('oversikt');

export default function OversiktSkeleton() {
    const { filter, oppdaterFilter } = useFilter();
    return (
        <div className={cls.className}>
            <OversiktTabell
                tableHeader={<ArbeidsgiverTableHeader filter={filter} oppdaterFilter={oppdaterFilter} />}
                tableBody={
                    <Table.Body>
                        {[1, 2, 3].map((value) => (
                            <Table.Row key={value}>
                                <Table.DataCell colSpan={100}>
                                    <Skeleton height={30} variant="rectangle"></Skeleton>
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                }
            />
        </div>
    );
}
