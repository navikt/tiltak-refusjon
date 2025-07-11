import React, { useCallback } from 'react';

import KvitteringSideVTAO from '~/KvitteringSide/KvitteringSideVTAO';
import { lagreBedriftKID } from '@/services/rest-service';

type Props = Omit<React.ComponentProps<typeof KvitteringSideVTAO>, 'settKid'>;

function KvitteringSideVTAOArbeidsgiver(props: Props) {
    const { refusjon } = props;

    const settKid = useCallback(
        (kid?: string) => {
            lagreBedriftKID(refusjon.id, refusjon.sistEndret, kid);
        },
        [refusjon.id, refusjon.sistEndret]
    );

    return <KvitteringSideVTAO {...props} settKid={settKid} />;
}

export default KvitteringSideVTAOArbeidsgiver;
