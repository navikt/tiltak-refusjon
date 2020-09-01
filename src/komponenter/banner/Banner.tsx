import React from "react";
import { Systemtittel } from "nav-frontend-typografi";
import BEMHelper from "../../utils/bem";
import "./banner.less";

const cls = BEMHelper("banner");

export const Banner = () => (
  <div className={cls.className}>
    <Systemtittel>Tiltak-Refusjon</Systemtittel>
  </div>
);
