import { PropsWithChildren } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import styles from './MainWrapper.module.less';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { HStack } from '@navikt/ds-react';

interface Props {
    bredde?: 'smal' | 'bred';
    rolle: 'saksbehandler' | 'arbeidsgiver';
}

function MainWrapper(props: PropsWithChildren<Props>) {
    const { children, bredde = 'bred', rolle } = props;

    return (
        <main
            className={classNames(styles.main, {
                [styles.mainSmal]: bredde === 'smal',
                [styles.mainBred]: bredde === 'bred',
            })}
        >
            <HStack asChild gap="space-1" align="center" width="fit-content" marginBlock="space-0 space-8">
                <Link
                    to={{ pathname: rolle === 'arbeidsgiver' ? '/refusjon' : '/', search: window.location.search }}
                    className={styles.lenke}
                >
                    <ChevronLeftIcon aria-hidden={true} />
                    Tilbake til oversikt
                </Link>
            </HStack>
            {children}
        </main>
    );
}

export default MainWrapper;
