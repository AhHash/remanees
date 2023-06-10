import apiFetch from "../../utils/apiFetch";
import { getCompletedTasks, getDueTasks } from "./tasksSlice";

export const getTasksThunk = async (url: string, thunkAPI: any) => {
  try {
    const { data } = (await apiFetch.get(url)) as any;
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};

export const addTaskThunk = async <T extends object>(
  url: string,
  task: T,
  thunkAPI: any
) => {
  try {
    const { data } = await apiFetch.post(url, task);
    thunkAPI.dispatch(getDueTasks());
    thunkAPI.dispatch(getCompletedTasks());
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};

export const updateTaskThunk = async <T extends object>(
  url: string,
  task: T,
  thunkAPI: any
) => {
  console.log("data");

  try {
    const { data } = await apiFetch.patch(url, task);
    thunkAPI.dispatch(getDueTasks());
    thunkAPI.dispatch(getCompletedTasks());

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};

export const removeTaskThunk = async (url: string, thunkAPI: any) => {
  try {
    const { data } = await apiFetch.delete(url);
    thunkAPI.dispatch(getDueTasks());
    thunkAPI.dispatch(getCompletedTasks());
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as any).response.data.msg);
  }
};
