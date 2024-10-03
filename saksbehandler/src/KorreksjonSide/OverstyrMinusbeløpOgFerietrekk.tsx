import { Alert, Switch, TextField } from '@navikt/ds-react';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFeatureToggles } from '../featureToggles/FeatureToggleProvider';
import { Feature } from '../featureToggles/features';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import { settHarFerietrekkForSammeMåned, settMinusbeløpManuelt } from '../services/rest-service';

type Props = {
    harFerietrekkForSammeMåned: boolean;
};

const OverstyrMinusbeløpOgFerietrekk: FunctionComponent<Props> = (props) => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const [belop, setBelop] = useState<string>('');
    const featureToggles = useFeatureToggles();

    if (!featureToggles[Feature.ManueltMinusbelop]) {
        return null;
    } else {
        return (
            <>
                <VerticalSpacer rem={1} />
                <div>
                    <Alert variant="warning">
                        <TextField
                            style={{ width: '12rem' }}
                            size="small"
                            label="Manuelt minusbeløp"
                            description="Skriv inn manuelt minusbeløp her. Dette vil bli lagt til i utregningen som om det hadde ligget i minusbeløptabellen"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const verdi: string = event.currentTarget.value;
                                if (verdi.match(/^-\d*$/)) {
                                    setBelop(verdi);
                                }
                                if (!verdi) {
                                    setBelop('');
                                }
                            }}
                            onBlur={() => settMinusbeløpManuelt(korreksjonId!, parseInt(belop, 10))}
                            value={belop}
                        />

                        <VerticalSpacer rem={1} />
                        <Switch
                            description="Huk av her hvis det allerde er trukket feriepenger for samme måned. Da vil ingen ferietrekk bli regnet med her."
                            checked={props.harFerietrekkForSammeMåned}
                            onChange={(e) => settHarFerietrekkForSammeMåned(korreksjonId!, e.currentTarget.checked)}
                        >
                            Har ferietrekk for samme måned?
                        </Switch>
                    </Alert>
                </div>
                <VerticalSpacer rem={1} />
            </>
        );
    }
};

export default OverstyrMinusbeløpOgFerietrekk;
