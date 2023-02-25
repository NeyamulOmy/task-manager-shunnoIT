import axiosInstance from '../../api/axios'

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')
const baseURL = process.env.REACT_APP_baseURL;
export const fetchPendingTasks = createAsyncThunk('pendingTasks/selectTaskByStatus/fetchPendingTasks',
    async () => {
        const res = await axiosInstance.get(`${baseURL}/task/selectTaskByStatus/pending`)
        return res.data;
    })
const pendingTasksSlice = createSlice(
    {
        name: 'pendingTasks',
        initialState: {
            isLoading: false,
            pendingTasks: [],
            error: null
        },
        extraReducers: builder => {
            builder.addCase(fetchPendingTasks.pending, (state) => {
                state.isLoading = true;
            })
            builder.addCase(fetchPendingTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pendingTasks = action.payload;
                state.error = null;
            })
            builder.addCase(fetchPendingTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.pendingTasks = [];
                state.error = action.error.message
            })
        }
    }
)

export default pendingTasksSlice.reducer;