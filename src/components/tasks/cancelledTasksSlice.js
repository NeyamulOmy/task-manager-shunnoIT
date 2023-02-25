import axiosInstance from '../../api/axios'

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')
const baseURL = process.env.REACT_APP_baseURL;
export const fetchCancelledTasks = createAsyncThunk('canceledTasks/fetchCancelledTasks',
    async () => {
        const res = await axiosInstance.get(`${baseURL}/task/selectTaskByStatus/canceled`)
        return res.data;
    })
const cancelledTasksSlice = createSlice(
    {
        name: 'cancelledTasks',
        initialState: {
            isLoading: false,
            cancelledTasks: [],
            error: null
        },
        extraReducers: builder => {
            builder.addCase(fetchCancelledTasks.pending, (state) => {
                state.isLoading = true;
            })
            builder.addCase(fetchCancelledTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cancelledTasks = action.payload;
                state.error = null;
            })
            builder.addCase(fetchCancelledTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.cancelledTasks = [];
                state.error = action.error.message
            })
        }
    }
)

export default cancelledTasksSlice.reducer;