import { apiPath } from "../paths.json";
import { Refusjon } from "../types/refusjon";

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const hentRefusjon = async (id: String): Promise<Refusjon> => {
  return await fetch(`${apiPath}/refusjon/` + id, {
    method: "GET",
    headers: HEADERS,
  })
    .then((response) => {
      if (!response.ok) {
        console.error("error: ", response);
        throw new Error(response.statusText);
      }
      return response.json() as Promise<Refusjon>;
    })
    .catch((error) => {
      console.error("error2: ", error);
      throw error;
    });
};

export const hentRefusjoner = async (): Promise<Refusjon[]> =>
  await fetch(`${apiPath}/refusjon`, {
    method: "GET",
    headers: HEADERS,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.error("fetch failed", err);
    });

export const lagreRefusjon = async (refusjon: Refusjon): Promise<Refusjon> => {
  return await fetch(`${apiPath}/refusjon/`, {
    method: "PUT",
    body: JSON.stringify(refusjon),
    headers: HEADERS,
  })
    .then((response) => {
      if (!response.ok) {
        console.error("error: ", response);
        throw new Error(response.statusText);
      }
      return response.json() as Promise<Refusjon>;
    })
    .catch((error) => {
      console.error("error2: ", error);
      throw error;
    });
};

