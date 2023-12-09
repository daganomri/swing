const BASE_ID = "appoviWcNhlMROcSq";
const BASE_LINDY_HOP_ID = "tblaTUauHih9arRFk";

type Fetch = (...args: Parameters<typeof fetch>) => Promise<any>;

const baseFetch: Fetch = (path, options) =>
  fetch(`https://api.airtable.com/v0${path}`, {
    ...options,
    headers: {
      ...options?.headers,
      Accept: "application/json",
      Authorization: `Bearer ${import.meta.env.AIRTABLE_TOKEN}`,
    },
  }).then((res) => res.json());

export const lindyFetch: Fetch = (path, options) =>
  baseFetch(`/${BASE_ID}/${BASE_LINDY_HOP_ID}${path}`, options);

export const getTables = (): Promise<{ name: string; id: string }[]> =>
  baseFetch(`/meta/bases/${BASE_ID}/tables`).then((x) => x.tables);

export const getDance = (id: string, options?: Partial<RequestInit>) =>
  baseFetch(`/${BASE_ID}/${id}?sort%5B0%5D%5Bfield%5D=move`, options).then(
    ({ records }) => records
  );
