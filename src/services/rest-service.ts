import {Refusjon} from "../types/refusjon";
import refusjonMock from "../mock/refusjon-mock";

export const API_URL = '/refusjon/api';

export interface RestService {
     hentRefusjon: (id: string) => Promise<Refusjon>;
}

const hentRefusjon = async (): Promise<Refusjon> => {
    return refusjonMock;
};

const restService: RestService = {
    hentRefusjon
};

export default restService;
