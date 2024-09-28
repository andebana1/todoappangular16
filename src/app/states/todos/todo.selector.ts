import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ITodo } from "src/app/models/todo.model";
import { IUser } from "src/app/models/user.model";

const selectTodos = createFeatureSelector<{todoList: Array<ITodo>, loading: boolean}>('todos');
const selectUsers = createFeatureSelector<{users: Array<IUser>, loading: boolean}>('users');

export const selectTodosList = createSelector(
    selectTodos,
    selectUsers,
    (todos, users) => {
        return todos.todoList.map(todo => ({
            ...todo,
            users: users.users.filter(user => todo.associatedUsers.includes(Number(user.id)))
        }))
    },
);



export const selectTodosListLoading = createSelector(
    selectTodos,
    selectUsers,
    (todos, users) => todos.loading && users.loading,
);