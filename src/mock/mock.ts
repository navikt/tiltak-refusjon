
import fetchMock from "jest-fetch-mock";
import refusjonMock from "../services/__mocks__/refusjon-mock";

fetchMock.mockResponse(JSON.stringify(refusjonMock));




