import React from "react";
import { Element, Normaltekst, Systemtittel } from "nav-frontend-typografi";
import { Refusjon } from "../../types/refusjon";
import BEMHelper from "../../utils/bem";

interface Props {
  refusjon: Refusjon;
}

const cls = BEMHelper("visUtregningenPanel");
const labels = [
  "Tiltak:",
  "Periode:",
  "Deltaker:",
  "Veileder:",
  "Arbeidsgiver:",
];

const DeltakerInfo = (props: Props) => {
  return (
    <>
      <Systemtittel className={cls.element("title")}>Om tiltaket</Systemtittel>
      <div className={cls.element("kolonner")}>
        <div className={cls.element("labels")}>
          {labels.map((label) => (
            <Element>{label}</Element>
          ))}
        </div>
        <div className={cls.element("info")}>
          <Normaltekst>{props.refusjon.tiltakstype}</Normaltekst>
          <Normaltekst>
            {props.refusjon.varighet.fraDato} -{" "}
            {props.refusjon.varighet.tilDato} (
            {props.refusjon.varighet.maaneder} måneder)
          </Normaltekst>
          <Normaltekst>{props.refusjon.deltakerNavn}</Normaltekst>
          <Normaltekst>{props.refusjon.veilederNavn}</Normaltekst>
          <Normaltekst>{props.refusjon.bedriftNavn}</Normaltekst>
        </div>
      </div>
    </>
  );
};

export default DeltakerInfo;
