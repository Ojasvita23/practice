import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "@/components/UsersList/types";

interface UsersState {
  data: UserInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  // users: [],
  data: [],
  loading: false,
  error: null,
};

// thunk for fetching users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://dummyjson.com/users");
  const data = await response.json();
  return data.users;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export default usersSlice.reducer;
