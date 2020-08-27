import * as React from 'react';
import BEMHelper from "../utils/bem";
import './RefusjonSide.less'
import FullforGodkjenningArbeidsgiver from "./FullforGodkjenningArbeidsgiver";
import FullforGodkjenningSaksbehandler from "./FullforGodkjenningSaksbehandler";
import Utregning from "./Utregning";
import restService from "../services/rest-service"
import {Refusjon} from "../types/refusjon";
import RefusjonInit from "../types/refusjonInit";

const cls = BEMHelper('refusjonside');

const refusjon: Refusjon = RefusjonInit;

interface State {
    refusjon: Refusjon;
}

const saksbehandler = false;

class RefusjonSide extends React.Component <{},State> {





    godkjenningComponent = () => {
        if(saksbehandler){
            return <FullforGodkjenningSaksbehandler/>
        }
        return <FullforGodkjenningArbeidsgiver/>
    }

    render() {
        return (
            <div className={cls.element('container')}>
                {this.godkjenningComponent()}

            </div>
        );
    }
}

export default RefusjonSide;

