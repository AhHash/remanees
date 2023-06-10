import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import tasksSlice from "./features/tasks/tasksSlice";

export default configureStore({
  reducer: {
    user: userSlice as any,
    tasks: tasksSlice as any,
  },
});
