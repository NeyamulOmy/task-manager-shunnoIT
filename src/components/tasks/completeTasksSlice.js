import axiosInstance from '../../api/axios'

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')
const baseURL = process.env.REACT_APP_baseURL;
export const fetchCompleteTasks = createAsyncThunk('completeTasks/selectTaskByStatus/fetchCompleteTasks',
    async () => {
        const res = await axiosInstance.get(`${baseURL}/task/selectTaskByStatus/complate`)
        return res.data;
    })
const completeTasksSlice = createSlice(
    {
        name: 'completeTasks',
        initialState: {
            isLoading: false,
            completeTasks: [],
            error: null
        },
        extraReducers: builder => {
            builder.addCase(fetchCompleteTasks.pending, (state) => {
                state.isLoading = true;
            })
            builder.addCase(fetchCompleteTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.completeTasks = action.payload;
                state.error = null;
            })
            builder.addCase(fetchCompleteTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.completeTasks = [];
                state.error = action.error.message
            })
        }
    }
)

export default completeTasksSlice.reducer;