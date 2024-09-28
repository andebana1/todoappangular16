import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodosService } from "src/app/services/todos/todos.service";
import { changeTodoAction, createTodoAction, deleteTodoAction, loadTodosAction, loadTodosActionSuccess, searchTodoAction } from "./todo.action";
import { endWith, map, mergeMap, startWith, switchMap } from "rxjs";

@Injectable()
export class TodoEffect {
    constructor (
        private $actions: Actions,
        private todoService: TodosService,
    ) {}

    loadTodos$ = createEffect(() => this.$actions.pipe(
        ofType(loadTodosAction),
        mergeMap(
            (data) => this.todoService.getTodos(data.params)
                .pipe(
                    map(data => loadTodosActionSuccess({todos: data})),
                    startWith(searchTodoAction({isSearching: true})),
                    endWith(searchTodoAction({isSearching: false}))
                )
        )
    ));

    deleteTodo$ = createEffect(() => this.$actions.pipe(
        ofType(deleteTodoAction),
        mergeMap(
            (data) => this.todoService.deleteTodo(data.todoId)
                .pipe(
                    startWith(searchTodoAction({isSearching: true}))
                )
        ),
        switchMap(
            _ => this.todoService.getTodos()
                .pipe(
                    map(data => loadTodosActionSuccess({todos: data})),
                    endWith(searchTodoAction({isSearching: false}))
                )
        )
    ));

    createTodo$ = createEffect(() => this.$actions.pipe(
        ofType(createTodoAction),
        mergeMap(
            (data) => this.todoService.createTodo(data.todo)
                .pipe(startWith(searchTodoAction({isSearching: true}))),
        ),
        switchMap(
            _ => this.todoService.getTodos()
                .pipe(
                    map(data => loadTodosActionSuccess({todos: data})),
                    endWith(searchTodoAction({isSearching: false}))
                )
        )
    ));

    changeTodo$ = createEffect(() => this.$actions.pipe(
        ofType(changeTodoAction),
        mergeMap(
            (data) => this.todoService.changeTodo(data.changes, data.todoId)
                .pipe(startWith(searchTodoAction({isSearching: true}))),
        ),
        switchMap(
            _ => this.todoService.getTodos()
                .pipe(
                    map(data => loadTodosActionSuccess({todos: data})),
                    endWith(searchTodoAction({isSearching: false}))
                )
        )
    ));
}