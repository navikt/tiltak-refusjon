import { Skeleton, Table } from '@navikt/ds-react';
import OversiktsTabellHeader from './OversiktsTabellHeader';
import styles from './OversiktsTabell.module.less';
import { TableHeaderType } from './OversiktsTabell';

interface Props {
    headers: TableHeaderType[];
}

const OversiktsTabellSkeleton = (props: Props) => {
    const { headers } = props;
    return (
        <Table role="list" className={styles.oversiktTabell}>
            <OversiktsTabellHeader headers={headers} />
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
    );
};

export default OversiktsTabellSkeleton;
