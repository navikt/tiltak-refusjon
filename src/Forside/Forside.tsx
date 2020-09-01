import React, { FunctionComponent, useEffect, useState } from "react";
import restService from "../services/rest-service";
import { Refusjon } from "../types/refusjon";
import refusjonInit from "../types/refusjonInit";
import BEMHelper from "../utils/bem";
import { Normaltekst, UndertekstBold } from "nav-frontend-typografi";
import { HoyreChevron } from "nav-frontend-chevron";
import { formaterDato } from "../RefusjonSide/Utregning";
import { Banner } from "../komponenter/banner/Banner";
import { refusjon } from "../paths.json";
import { useHistory } from "react-router";
import "./forside.less";

const Forside: FunctionComponent<{}> = () => {
  const cls = BEMHelper("forside");
  const [refusjoner, setRefusjoner] = useState<Refusjon[]>([refusjonInit]);
  const history = useHistory();

  useEffect(() => {
    restService.hentRefusjoner().then((refusjon) => {
      setRefusjoner(refusjon);
    });
  }, []);

  const onSelected = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
    const path = refusjon.toString().replace(":id", id);
    history.push("/tiltak-refusjon" + path);
  };

  const getOversiktLabels = () => [
    "Bedrift",
    "Deltaker",
    "Veileder",
    "Opprettet",
  ];

  const getColumnRow = (txt: string) => (
    <Normaltekst className={cls.element("column")}>{txt}</Normaltekst>
  );

  return (
    <div className={cls.className}>
      <Banner />
      <div className={cls.element("content")}>
        <div className={cls.element("wrapper")}>
          <div className={cls.element("oversikt desktop-view")}>
            {getOversiktLabels().map((elem, index) => (
              <UndertekstBold className={cls.element("column")} key={index}>
                {elem}
              </UndertekstBold>
            ))}
            <div className={cls.element("column-chevron")} />
          </div>
          <div className={cls.element("oversikt mobil-view")}>
            <UndertekstBold>Refusjoner</UndertekstBold>
          </div>
          {refusjoner.map((refusjon, index) => {
            return (
              <div
                className={cls.element("refusjonsrad")}
                key={index}
                onClick={(e) => onSelected(e, refusjon.id)}
              >
                <div className={cls.element("column-wrapper")}>
                  {getColumnRow(refusjon.bedrift)}
                  {getColumnRow(refusjon.deltaker)}
                  {getColumnRow(refusjon.veileder)}
                  {getColumnRow(formaterDato(refusjon.opprettet_tidspunkt))}
                </div>
                <div className={cls.element("column-chevron")}>
                  <div className={cls.element("chevron-wrapper")}>
                    <HoyreChevron />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Forside;
