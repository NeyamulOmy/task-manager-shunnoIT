import axiosInstance from '../../api/axios'

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')
const baseURL = process.env.REACT_APP_baseURL;
export const fetchNewTasks = createAsyncThunk('newsTasks/selectTaskByStatus/fetchNewTasks',
    async () => {
        const res = await axiosInstance.get(`${baseURL}/task/selectTaskByStatus/new`)
        return res.data;
    })
const newTasksSlice = createSlice(
    {
        name: 'newTasks',
        initialState: {
            isLoading: false,
            newTasks: [],
            error: null
        },
        extraReducers: builder => {
            builder.addCase(fetchNewTasks.pending, (state) => {
                state.isLoading = true;
            })
            builder.addCase(fetchNewTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.newTasks = action.payload;
                state.error = null;
            })
            builder.addCase(fetchNewTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.newTasks = [];
                state.error = action.error.message
            })
        }
    }
)

export default newTasksSlice.reducer;