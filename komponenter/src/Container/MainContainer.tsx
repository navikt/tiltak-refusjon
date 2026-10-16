import { PropsWithChildren, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { HStack } from '@navikt/ds-react';

import styles from './MainContainer.module.less';
import { useInnhold, InnholdBredde } from './InnholdContext';
import InnholdContainer from './InnholdContainer';

interface Props {
    bredde?: InnholdBredde;
    rolle?: 'saksbehandler' | 'arbeidsgiver';
}

function MainContainer(props: PropsWithChildren<Props>) {
    const { children, bredde = 'xl', rolle } = props;
    const { setInnholdBredde } = useInnhold();

    useEffect(() => {
        setInnholdBredde(bredde);
    }, [bredde, setInnholdBredde]);

    return (
        <InnholdContainer as="main">
            {!!rolle && (
                <HStack asChild gap="space-1" align="center" width="fit-content" marginBlock="space-0 space-8">
                    <Link
                        to={{ pathname: rolle === 'arbeidsgiver' ? '/refusjon' : '/', search: window.location.search }}
                        className={styles.lenke}
                    >
                        <ChevronLeftIcon aria-hidden={true} />
                        Tilbake til oversikt
                    </Link>
                </HStack>
            )}
            {children}
        </InnholdContainer>
    );
}

export default MainContainer;
