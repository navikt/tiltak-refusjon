import { Skeleton, Table } from '@navikt/ds-react';
import OversiktsTabellHeader from './OversiktsTabellHeader';
import styles from './OversiktsTabell.module.less';
import { tableHeaders } from './OversiktsTabell';
import React, { PropsWithChildren, Suspense } from 'react';

const OversiktsTabellSuspense = (props: PropsWithChildren) => {
    const { children } = props;

    return (
        <Suspense
            fallback={
                <Table role="list" className={styles.oversiktTabell}>
                    <OversiktsTabellHeader headers={tableHeaders} />
                    <Table.Body>
                        {[1, 2, 3].map((value) => (
                            <Table.Row key={value}>
                                <Table.DataCell colSpan={100}>
                                    <Skeleton height={30} variant="rectangle"></Skeleton>
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            }
        >
            {children}
        </Suspense>
    );
};

export default OversiktsTabellSuspense;
