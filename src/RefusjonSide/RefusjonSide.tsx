import * as React from 'react';
import BEMHelper from "../utils/bem";
import './RefusjonSide.less'
import FullforGodkjenning from "./FullforGodkjenning";
import Utregning from "./Utregning";
import RestService from "../services/rest-service"
import {Refusjon} from "../types/refusjon";
import refusjonMock from "../mock/refusjon-mock";

const cls = BEMHelper('refusjonside');

class RefusjonSide extends React.Component  {

    render() {
        const refusjon = refusjonMock;

        return (
            <div className={cls.element('container')}>
                <FullforGodkjenning refusjon={refusjon} />
                <Utregning/>
            </div>
        );
    }
}

async function hentrefusjon() {
    const response:Refusjon = await RestService.hentRefusjon("enId");
    return response;
}

export default RefusjonSide;

