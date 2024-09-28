import { IUser } from "./user.model";

export interface ITodo {
    id: string,
    title: string,
    completed: boolean,
    deadline: string,
    associatedUsers: Array<number>,
    users?: Array<IUser>,
}