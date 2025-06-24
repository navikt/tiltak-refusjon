import { Pagination as AkselPagination, Select } from '@navikt/ds-react';
import React from 'react';
import styles from './pagination.module.less';
import { PageableRefusjon } from '~/types';

interface Props {
    pageable: PageableRefusjon;
    oppdaterFilter: (filter: { page: number }) => void;
}

const Paginering = ({ pageable, oppdaterFilter }: Props) => {
    console.log(styles);
    return (
        <div className={styles.pagination}>
            <AkselPagination
                className={styles.paginationPagination}
                page={pageable.currentPage + 1}
                onPageChange={(x) => oppdaterFilter({ page: x - 1 })}
                count={pageable.totalPages}
                boundaryCount={1}
                siblingCount={1}
            />
            <Select
                label="Gå til side"
                hideLabel={true}
                className={styles.paginationPageSelect}
                onChange={(e) => oppdaterFilter({ page: parseInt(e.target.value, 10) })}
                value={pageable.currentPage}
            >
                {[...Array(pageable.totalPages)].map((_, i) => (
                    <option value={i} key={i}>
                        {i + 1}
                    </option>
                ))}
            </Select>
        </div>
    );
};

export default Paginering;
