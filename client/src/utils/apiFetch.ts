import axios from "axios";

const apiFetch = axios.create({
  baseURL: "/api/v1",
});

// export const checkForAuthorization = async (err: any, thunkAPI: any) => {
//     if (err.response.status === 401) {

//     }
// }

export default apiFetch;
