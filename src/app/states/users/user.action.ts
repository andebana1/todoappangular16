import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/models/user.model";

export const loadUsersAction = createAction('[Users] Load Users');
export const loadUsersActionSuccess = createAction('[Users] Load Users Success', props<{ users: Array<IUser> }>());
export const searchUsersAction = createAction('[Users] Changing Users Search State', props<{ isSearching: boolean }>());

export const createUserAction = createAction('[Users] Create User', props<{ user: IUser }>());
export const changeUserAction = createAction('[Users] Change User', props<{ changes: any, userId: string }>());