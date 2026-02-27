import { Skeleton, Table } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import OversiktsTabellHeader from './OversiktsTabellHeader';
import styles from './OversiktsTabell.module.less';
import { Avtalepart } from './OversiktsTabell';

interface Props {
    avtalepart: Avtalepart;
}

const OversiktsTabellSkeleton: FunctionComponent<Props> = ({ avtalepart }) => {
    return (
        <Table role="list" className={styles.oversiktTabell}>
            <OversiktsTabellHeader filter={{}} oppdaterFilter={() => {}} avtalepart={avtalepart} />
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
