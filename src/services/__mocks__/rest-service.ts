import {Refusjon} from "../../types/refusjon";
import refusjonMock from "./refusjon-mock";


const API_URL = 'localhost:8091/tiltak-refusjon-api/refusjon';


const hentRefusjon = async (): Promise<Refusjon> => {
    return refusjonMock;
};


export default hentRefusjon;
