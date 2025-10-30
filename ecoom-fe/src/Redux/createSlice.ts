import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AdminState, Upload } from "./types";


const initialState: AdminState = {
    uploads: [],
    loading: false,
    error: null,
}


const adminSlice = createSlice({
    name: "admin",
    initialState,

    reducers: {
        fetchUploadsRequest: (state) => { state.loading = true },

        fetchUploadsSuccess: (state, action: PayloadAction<Upload[]>) => {
            state.loading = false;
            state.uploads = action.payload
        },
        fetchUploadsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },



        uploadImageRequest: (state, _action: PayloadAction<FormData>) => {
            state.loading = true;
        },
        uploadImageSuccess: (state) => { state.loading = false; },
        uploadImageFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },



        deleteUploadRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
        },
        deleteUploadSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.uploads = state.uploads.filter((u) => u._id !== action.payload);
        },
        deleteUploadFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },



        updateUploadRequest: (state, _action: PayloadAction<{ id: string; formData: FormData }>) => {
            state.loading = true;
        },
        updateUploadSuccess: (state) => { state.loading = false; },
        updateUploadFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },



        addCartRequest: (state, _action: PayloadAction<any>) => {
            state.loading = true
        },
        addCartSuccess: (state) => { state.loading = false; },
        addCartFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },



        fetchCartRequest: (state) => {
            state.loading = true
        },
        fetchCartSuccess: (state) => { state.loading = false; },
        fetchCartFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
})


export const {
    fetchUploadsRequest,
    fetchUploadsSuccess,
    fetchUploadsFailure,
    uploadImageRequest,
    uploadImageSuccess,
    uploadImageFailure,
    deleteUploadRequest,
    deleteUploadSuccess,
    deleteUploadFailure,
    updateUploadRequest,
    updateUploadSuccess,
    updateUploadFailure,
    addCartRequest,
    addCartSuccess,
    addCartFailure,
    fetchCartRequest,
    fetchCartSuccess,
    fetchCartFailure


} = adminSlice.actions;

export default adminSlice.reducer;