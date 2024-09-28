import { createAction, props } from "@ngrx/store";
import { ITodo } from "src/app/models/todo.model";

export const loadTodosAction = createAction('[Todos List] Load Items', props<{ params?: Object }>());
export const loadTodosActionSuccess = createAction('[Todos List] Load Items Success', props<{ todos: Array<ITodo> }>());
export const searchTodoAction = createAction('[Todos List] Changing Todos Search State', props<{ isSearching: boolean }>());

export const deleteTodoAction = createAction('[Todo Delete] Start Deleting', props<{ todoId: string }>());
export const createTodoAction = createAction('[Todo Create] Start Creation', props<{ todo: ITodo }>())
export const changeTodoAction = createAction('[Todo Update] Change To Do', props<{ changes: any, todoId: string }>());