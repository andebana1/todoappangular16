import { createReducer, on } from "@ngrx/store"
import { loadUsersActionSuccess, searchUsersAction } from "./user.action"
import { IUser } from "src/app/models/user.model"

export const initialUsersState : {users: Array<IUser>, loading: boolean} = {
    users: [],
    loading: false,
}

export const usersReducer = createReducer(
    initialUsersState,
    on(loadUsersActionSuccess, (state, {users}) => ({...state, users: users})),
    on(searchUsersAction, (state, { isSearching }) => ({ ...state, loading: isSearching })),
)