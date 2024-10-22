import React from 'react';

import SaksbehandlerTableHeader from '~/OversiktTabell/TableHeader/SaksbehandlerTableHeader';
import OversiktTabell from '~/OversiktTabell/OversiktTabell';
import BEMHelper from '~/utils/bem';
import { Skeleton, Table } from '@navikt/ds-react';

const cls = BEMHelper('oversikt');

export default function OversiktSkeleton() {
    return (
        <div className={cls.className}>
            <OversiktTabell
                tableHeader={<SaksbehandlerTableHeader />}
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
