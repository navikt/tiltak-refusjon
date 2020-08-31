import {Refusjon} from "../../types/refusjon";
import refusjonMock from "./refusjon-mock";

const hentRefusjon = async (): Promise<Refusjon> => {
    return refusjonMock;
};

export default hentRefusjon;
