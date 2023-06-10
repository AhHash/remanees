import apiFetch from "../../utils/apiFetch";

export const loginUserThunk = async <T extends object>(
  url: string,
  user: T,
  thunkAPI: any
) => {
  try {
    const { data } = (await apiFetch.post(url, user)) as any;
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};

export const regiserUserThunk = async <T extends object>(
  url: string,
  user: T,
  thunkAPI: any
) => {
  try {
    const { data } = await apiFetch.post(url, user);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};

export const getUserThunk = async (url: string, thunkAPI: any) => {
  try {
    const { data } = await apiFetch.get(url);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};
