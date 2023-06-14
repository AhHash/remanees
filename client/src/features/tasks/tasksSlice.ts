import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTaskThunk,
  getTasksThunk,
  removeTaskThunk,
  updateTaskThunk,
} from "./taskThunk";

const initialState = {
  tasksLoading: false,
  tasksError: false,
  thisWeek: [],
  today: [],
  todayCompleted: [],
  past: [],
  completed: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDueTasks.pending, (state) => {
        state.tasksLoading = true;
        state.tasksError = false;
      })
      .addCase(getDueTasks.fulfilled, (state, { payload }: any) => {
        state.thisWeek = payload.thisWeekTasks;
        state.past = payload.previousTasks;
        state.today = payload.thisWeekTasks.filter((task: any) => {
          return (
            new Date(task.lastUpdated).getUTCDate() == new Date().getUTCDate()
          );
        });
      })
      .addCase(getDueTasks.rejected, (state) => {
        state.tasksLoading = false;
        state.tasksError = true;
      })
      .addCase(getCompletedTasks.pending, (state) => {
        state.tasksLoading = true;
        state.tasksError = false;
      })
      .addCase(getCompletedTasks.fulfilled, (state, { payload }: any) => {
        state.tasksLoading = false;
        state.completed = payload.tasks;
        state.todayCompleted = payload.tasks.filter((task: any) => {
          return (
            new Date(task.lastUpdated).getUTCDate() == new Date().getUTCDate()
          );
        });
      })
      .addCase(getCompletedTasks.rejected, (state) => {
        state.tasksLoading = false;
        state.tasksError = true;
      })
      .addCase(addTask.pending, (state) => {
        state.tasksLoading = true;
        state.tasksError = false;
      })
      .addCase(addTask.rejected, (state) => {
        state.tasksLoading = false;
        state.tasksError = true;
      })
      .addCase(updateTask.pending, (state) => {
        state.tasksLoading = true;
        state.tasksError = false;
      })
      .addCase(updateTask.rejected, (state) => {
        state.tasksLoading = false;
        state.tasksError = true;
      })
      .addCase(removeTask.pending, (state) => {
        state.tasksLoading = true;
        state.tasksError = false;
      })
      .addCase(removeTask.rejected, (state) => {
        state.tasksLoading = false;
        state.tasksError = true;
      });
  },
});

export default taskSlice.reducer;

export const getDueTasks = createAsyncThunk(
  "tasks/getDueTasks",
  async (_, thunkAPI) => {
    return getTasksThunk("tasks/", thunkAPI);
  }
);

export const getCompletedTasks = createAsyncThunk(
  "tasks/getCompletedTasks",
  async (_, thunkAPI) => {
    return getTasksThunk("tasks/completed", thunkAPI);
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: any, thunkAPI) => {
    try {
      Number(task.day);
    } catch {
      task.day = 0;
    }

    if (task.day > 7) {
      task.day = 0;
    }

    return addTaskThunk("tasks/", task, thunkAPI);
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: any, thunkAPI) => {
    console.log(task);
    return updateTaskThunk(`tasks/${task._id}`, task, thunkAPI);
  }
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (task: any, thunkAPI) => {
    return removeTaskThunk(`tasks/${task._id}`, thunkAPI);
  }
);
