import { configureStore } from "@reduxjs/toolkit";
import allTasksReducer from "../tasks/allTasksSlice";
import cancelledTasksReducer from "../tasks/cancelledTasksSlice";
import completeTasksSlice from "../tasks/completeTasksSlice";
import newTasksReducer from "../tasks/newTasksSlice";
import pendingTasksSlice from "../tasks/pendingTasksSlice";

const store = configureStore(
    {
        reducer: {
            allTasks: allTasksReducer,
            cancelledTasks: cancelledTasksReducer,
            newTasks: newTasksReducer,
            pendingTasks: pendingTasksSlice,
            completeTasks: completeTasksSlice,
        }
    }
)

export default store;