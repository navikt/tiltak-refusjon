import { Table } from '@navikt/ds-react';
import { Suspense } from 'react';
import { BegrensetRefusjon, Filter } from '~/types';
import OversiktsTabellHeader from './OversiktsTabellHeader';
import OversiktsTabellBody from './OversiktsTabellBody';
import styles from './OversiktsTabell.module.less';
import OversiktsTabellSkeleton from './OversiktsTabellSkeleton';

export type Avtalepart = 'saksbehandler' | 'arbeidsgiver';

interface Props {
    filter: Filter;
    oppdaterFilter: (nyttFilter: Partial<Filter>) => void;
    refusjoner: BegrensetRefusjon[];
    avtalepart: Avtalepart;
}

const OversiktsTabell = (props: Props) => {
    const { filter, oppdaterFilter, refusjoner, avtalepart } = props;
    return (
        <Suspense fallback={<OversiktsTabellSkeleton avtalepart={avtalepart} />}>
            <Table role="list" className={styles.oversiktTabell}>
                <OversiktsTabellHeader filter={filter} oppdaterFilter={oppdaterFilter} avtalepart={avtalepart} />
                <OversiktsTabellBody refusjoner={refusjoner} avtalepart={avtalepart} />
            </Table>
        </Suspense>
    );
};

export default OversiktsTabell;
