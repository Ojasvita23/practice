// src/lib/features/users/userSelectors.ts
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";

export const selectUsersState = (state: RootState) => state.users;

export const selectUsersData = createSelector(
  [selectUsersState],
  (usersState) => ({
    data: usersState.data,
    loading: usersState.loading,
    error: usersState.error,
  })
);

export const selectUserDetailState = (state: RootState) => state.userDetail;

export const selectUserDetailData = createSelector(
  [selectUserDetailState],
  (detailState) => ({
    data: detailState.data,
    loading: detailState.loading,
    error: detailState.error,
  })
);
