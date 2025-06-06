import { HelpText, ReadMore, Table } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { inntektBeskrivelse } from '../refusjon/RefusjonSide/inntektsmelding/InntekterFraAMeldingen';

import { formatterPenger } from '~/utils/PengeUtils';
import { Inntektslinje, Tilskuddsgrunnlag } from '~/types/refusjon';
import { formatterDato, getMåned, NORSK_MÅNEDÅR_FORMAT } from '~/utils';

type Props = {
    inntekter: Inntektslinje[];
    tilskuddsgrunnlag?: Tilskuddsgrunnlag;
};

const UtregningsradHvaInngårIDette: FunctionComponent<Props> = (props) => {
    return (
        <ReadMore size="small" header="Hva inngår i dette?">
            <div>
                <Table size="small">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col">Beskrivelse</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Måned</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Beløp</Table.HeaderCell>
                            <Table.HeaderCell scope="col"></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {props.inntekter.map((inntekt) => {
                            const erFerietrekkForAnnenMåned =
                                inntekt.beskrivelse === 'trekkILoennForFerie' &&
                                getMåned(inntekt.måned) !== getMåned(props.tilskuddsgrunnlag?.tilskuddFom || '');
                            return (
                                <Table.Row
                                    key={inntekt.id}
                                    style={{ textDecoration: erFerietrekkForAnnenMåned ? 'line-through' : '' }}
                                >
                                    <Table.DataCell style={{ maxWidth: '10rem' }}>
                                        {inntektBeskrivelse(inntekt.beskrivelse)}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {formatterDato(inntekt.måned, NORSK_MÅNEDÅR_FORMAT)}
                                    </Table.DataCell>
                                    <Table.DataCell>{formatterPenger(inntekt.beløp)}</Table.DataCell>
                                    <Table.DataCell>
                                        {erFerietrekkForAnnenMåned && (
                                            <HelpText>
                                                Dette ferietrekket hører til en annen måned enn refusjonen og vil ikke
                                                bli trukket her.
                                            </HelpText>
                                        )}
                                    </Table.DataCell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </div>
        </ReadMore>
    );
};

export default UtregningsradHvaInngårIDette;
