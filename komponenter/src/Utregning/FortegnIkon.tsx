import { EqualsIcon, MinusIcon, MultiplyIcon, PlusIcon } from '@navikt/aksel-icons';
import { Fortegn } from '~/types/utregning';

const FortegnIkon = ({ fortegn }: { fortegn: Fortegn }) => {
    switch (fortegn) {
        case Fortegn.PLUSS:
            return <PlusIcon title="pluss" />;
        case Fortegn.MINUS:
            return <MinusIcon title="minus" />;
        case Fortegn.ER_LIK:
            return <EqualsIcon title="er lik" />;
        case Fortegn.MULTIPLISER:
            return <MultiplyIcon title="ganger" />;
    }
};

export default FortegnIkon;
