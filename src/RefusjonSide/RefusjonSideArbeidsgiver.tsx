import * as React from "react";
import BEMHelper from "../utils/bem";
import "./RefusjonSideArbeidsgiver.less";
import FullforGodkjenningArbeidsgiver from "./FullforGodkjenningArbeidsgiver";
import { Undertittel } from "nav-frontend-typografi";
import { VenstreChevron } from "nav-frontend-chevron";
import { useHistory } from "react-router";
import {useState} from "react";
import {Refusjon} from "../types/refusjon";
import {useEffect} from "react";
import {hentRefusjon} from "../services/rest-service";
import { useParams } from 'react-router-dom';

const cls = BEMHelper("refusjonside");

const saksbehandler = false;

const RefusjonSideArbeidsgiver = () => {
  const history = useHistory();
  const { refusjonId } = useParams();
  const tilbakeTilOversikt = () => history.goBack();

  return (
    <div className={cls.element("wrapper")}>
      <div
        className={cls.element("tilbake")}
        role="button"
        onClick={() => tilbakeTilOversikt()}
      >
        <div className={cls.element("chevron")}>
          <VenstreChevron />
        </div>
        <Undertittel>Tilbake til oversikt</Undertittel>
      </div>
      <div className={cls.element("container")}>{<FullforGodkjenningArbeidsgiver refusjonId={refusjonId} />}</div>
    </div>
  );
};

export default RefusjonSideArbeidsgiver;
