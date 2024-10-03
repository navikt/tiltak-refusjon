import Pengesedler from '@/asset/image/pengesedler.svg?react';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { formatterPeriode } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';
import { Refusjonsgrunnlag, Tilskuddsgrunnlag } from '../refusjon';
import { BodyShort, Label } from '@navikt/ds-react';

const Boks = styled.div`
    display: flex;
    flex-direction: row;
    border: 3px solid #cce1f3;
    border-radius: 4px;
    padding: 1.75rem;
`;

type Props = {
    refusjonsgrunnlag: Refusjonsgrunnlag;
    enhet: string;
};

// Dersom vi vet at dette er siste tilskuddsperiode så vil vi vise alternativ tekst
// som indikerer at man ikke behøver å tilbakebetale beløpet man skylder (med mindre avtale forlenges)
const erSisteTilskuddsperiodeIAvtalen = (tilskuddsgrunnlag: Tilskuddsgrunnlag) =>
    tilskuddsgrunnlag.avtaleTom === tilskuddsgrunnlag.tilskuddTom;

const SummeringBoks: FunctionComponent<Props> = (props) => {
    if (props.refusjonsgrunnlag.beregning?.refusjonsbeløp === undefined) {
        return null;
    }

    return (
        <Boks>
            <div style={{ paddingRight: '1.5rem' }}>
                <Pengesedler />
            </div>
            {props.refusjonsgrunnlag.beregning?.refusjonsbeløp > 0 && (
                <div>
                    <Label>Dere får utbetalt</Label>
                    <VerticalSpacer rem={0.5} />
                    <BodyShort size="small">
                        <b>{formatterPenger(props.refusjonsgrunnlag.beregning?.refusjonsbeløp || 0)}</b> for perioden{' '}
                        {formatterPeriode(
                            props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                            props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                        )}{' '}
                        til kontonummer {props.refusjonsgrunnlag.bedriftKontonummer}
                    </BodyShort>
                </div>
            )}

            {props.refusjonsgrunnlag.beregning?.refusjonsbeløp === 0 && (
                <div>
                    <VerticalSpacer rem={0.5} />
                    <BodyShort size="small">
                        <Label>
                            Refusjonen er godtatt med {formatterPenger(0)} for perioden{' '}
                            {formatterPeriode(
                                props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                                props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                            )}
                        </Label>
                    </BodyShort>
                </div>
            )}

            {props.refusjonsgrunnlag.beregning?.refusjonsbeløp < 0 && (
                <div>
                    {props.refusjonsgrunnlag.beregning.lønnFratrukketFerie < 0 && (
                        <>
                            {erSisteTilskuddsperiodeIAvtalen(props.refusjonsgrunnlag.tilskuddsgrunnlag) ? (
                                <BodyShort size="small">
                                    Fratrekk for ferie er større enn bruttolønn i perioden. Ettersom tiltaket er
                                    avsluttet vil dette beløpet bli sett bort fra.
                                    <br />
                                    Dersom tiltaket forlenges vil beløpet trekkes fra neste periode.
                                </BodyShort>
                            ) : (
                                <BodyShort size="small">
                                    Siden fratrekk for ferie er større enn bruttolønn i perioden vil det negative
                                    refusjonsbeløpet overføres til neste periode.
                                </BodyShort>
                            )}
                            <VerticalSpacer rem={0.5} />
                            <BodyShort size="small">
                                {props.refusjonsgrunnlag.beregning.sumUtgifter !==
                                    props.refusjonsgrunnlag.beregning?.sumUtgifterFratrukketRefundertBeløp && (
                                    <>
                                        Vi tar ikke hensyn til oppgitt refunderbar lønn (
                                        {formatterPenger(props.refusjonsgrunnlag.beregning?.tidligereRefundertBeløp)})
                                        ved negativt refusjonsbeløp. Dette er altså ikke med i beregnet refusjonsbeløp.{' '}
                                    </>
                                )}
                            </BodyShort>
                        </>
                    )}
                    <VerticalSpacer rem={0.5} />
                    <BodyShort size="small">
                        Dere skylder{' '}
                        <b>{formatterPenger(Math.abs(props.refusjonsgrunnlag.beregning?.refusjonsbeløp || 0))}</b> for
                        perioden{' '}
                        {formatterPeriode(
                            props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                            props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                        )}
                        . Dette vil trekkes fra neste refusjon.
                    </BodyShort>
                </div>
            )}
        </Boks>
    );
};

export default SummeringBoks;
