import React, {
    createContext,
    useState,
    useContext,
    type Dispatch,
    type SetStateAction,
    PropsWithChildren,
    useMemo,
} from 'react';
import { PageBlockProps, VStack } from '@navikt/ds-react';

export type InnholdBredde = Pick<PageBlockProps, 'width'>['width'];

type InnholdContext = {
    innholdBredde: InnholdBredde;
    setInnholdBredde: Dispatch<SetStateAction<InnholdBredde>>;
};

const InnholdContext = createContext<InnholdContext>({ innholdBredde: 'xl', setInnholdBredde: () => {} });

export const useInnhold = () => useContext(InnholdContext);

export const InnholdProvider = (props: PropsWithChildren) => {
    const { children } = props;
    const [innholdBredde, setInnholdBredde] = useState<InnholdBredde>('xl');

    const value = useMemo(
        () => ({
            innholdBredde,
            setInnholdBredde,
        }),
        [innholdBredde, setInnholdBredde]
    );

    return (
        <InnholdContext value={value}>
            <VStack gap="space-12">{children}</VStack>
        </InnholdContext>
    );
};
