import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodosService } from "src/app/services/todos/todos.service";
import { endWith, map, mergeMap, startWith, switchMap } from "rxjs";
import { UsersService } from "src/app/services/users/users.service";
import { loadTodosAction } from "../todos/todo.action";
import { changeUserAction, createUserAction, loadUsersActionSuccess, searchUsersAction } from "./user.action";

@Injectable()
export class UsersEffect {
    constructor (
        private $actions: Actions,
        private userService: UsersService,
    ) {}

    loadUsers$ = createEffect(() => this.$actions.pipe(
        ofType(loadTodosAction),
        mergeMap(
            (data) => this.userService.getUsers()
                .pipe(
                    map(data => loadUsersActionSuccess({users: data})),
                    startWith(searchUsersAction({isSearching: true})),
                    endWith(searchUsersAction({isSearching: false}))
                )
        )
    ));

    createUser$ = createEffect(() => this.$actions.pipe(
        ofType(createUserAction),
        mergeMap(
            (data) => this.userService.createUser(data.user)
                .pipe(
                    startWith(searchUsersAction({isSearching: true})),
                )
        ),
        switchMap(
            _ => this.userService.getUsers()
                .pipe(
                    map(data => loadUsersActionSuccess({users: data})),
                    endWith(searchUsersAction({isSearching: false}))
                )
        )
    ));

    changeUser$ = createEffect(() => this.$actions.pipe(
        ofType(changeUserAction),
        mergeMap(
            (data) => this.userService.changeUser(data.changes, data.userId)
                .pipe(
                    startWith(searchUsersAction({isSearching: true})),
                )
        ),
        switchMap(
            _ => this.userService.getUsers()
                .pipe(
                    map(data => loadUsersActionSuccess({users: data})),
                    endWith(searchUsersAction({isSearching: false}))
                )
        )
    ));
}