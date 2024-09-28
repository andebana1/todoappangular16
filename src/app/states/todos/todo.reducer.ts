import { createReducer, on } from "@ngrx/store"
import { loadTodosAction, loadTodosActionSuccess, searchTodoAction } from "./todo.action"

export const initialTodosState : {todoList: any[], loading: boolean} = {
    todoList: [],
    loading: false,
}

export const todosReducer = createReducer(
    initialTodosState,
    on(loadTodosActionSuccess, (state, {todos}) => ({...state, todoList: todos})),
    on(searchTodoAction, (state, { isSearching }) => ({ ...state, loading: isSearching })),
)