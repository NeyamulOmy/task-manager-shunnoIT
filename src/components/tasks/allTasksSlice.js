import axiosInstance from '../../api/axios'

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')
const baseURL = process.env.REACT_APP_baseURL;
export const fetchAllTasks = createAsyncThunk('allTasks/fetchAllTasks',
    async () => {
        const res = await axiosInstance.get(`${baseURL}/task/selectTask`)
        return res.data;
    })
const allTasksSlice = createSlice(
    {
        name: 'allTasks',
        initialState: {
            isLoading: false,
            allTasks: [],
            error: null
        },
        extraReducers: builder => {
            builder.addCase(fetchAllTasks.pending, (state) => {
                state.isLoading = true;
            })
            builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allTasks = action.payload;
                state.error = null;
            })
            builder.addCase(fetchAllTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.allTasks = [];
                state.error = action.error.message
            })
        }
    }
)

export default allTasksSlice.reducer;