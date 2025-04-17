import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserDetails = createAsyncThunk(
  "userDetails/fetchUserDetails",
  async (id: string) => {
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }
    return response.json();
  }
);

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: { data: null, loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default userDetailsSlice.reducer;
