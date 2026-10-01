import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import TilbakeTilOversikt from 'tiltak-refusjon-arbeidsgiver/src/komponenter/TilbakeTilOversikt';

import styles from './MainWrapper.module.less';

interface Props {
    bredde?: 'smal' | 'bred';
}

function MainWrapper(props: PropsWithChildren<Props>) {
    const { children, bredde = 'bred' } = props;

    return (
        <main
            className={classNames(styles.main, {
                [styles.mainSmal]: bredde === 'smal',
                [styles.mainBred]: bredde === 'bred',
            })}
        >
            <TilbakeTilOversikt />
            {children}
        </main>
    );
}

export default MainWrapper;
