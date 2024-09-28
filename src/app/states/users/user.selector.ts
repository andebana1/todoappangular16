import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUser } from "src/app/models/user.model";

export const selectUsers = createFeatureSelector<{users: Array<IUser>, loading: boolean}>('users');

export const selectUsersList = createSelector(
    selectUsers,
    (state) => state.users,
);

export const selectTodosListLoading = createSelector(
    selectUsers,
    (state) => state.loading,
);