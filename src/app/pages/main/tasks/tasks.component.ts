import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskModalComponent } from './create-task-modal/create-task-modal.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTodosList, selectTodosListLoading } from 'src/app/states/todos/todo.selector';
import { changeTodoAction, deleteTodoAction, loadTodosAction } from 'src/app/states/todos/todo.action';
import { changeUserAction } from 'src/app/states/users/user.action';
import { ITodo } from 'src/app/models/todo.model';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  todos$: Observable<ITodo[]> = this.store.select(selectTodosList);
  isLoading$: Observable<boolean> = this.store.select(selectTodosListLoading);

  constructor(public dialog: MatDialog, private store: Store) {
    this.store.dispatch(loadTodosAction({params: undefined}));
  }

  deleteTodo (todoId: string) {
    this.store.dispatch(deleteTodoAction({todoId}));
  }

  openTaskCreationDialog(): void {
    this.dialog.open(CreateTaskModalComponent, {
      data: {},
    });
  }

  addSkill(nameInput: HTMLInputElement, user: IUser) {
    const val = nameInput.value;
    if (val) {
      const changes = {
        skills: [...user.skills, val]
      };
      this.store.dispatch(changeUserAction({changes, userId: user.id}));
    }
  }

  removeSkill (index: number, user: IUser) {
    const newSkill = [...user.skills];
    newSkill.splice(index, 1);
    const changes = {
      skills: newSkill,
    };
    this.store.dispatch(changeUserAction({changes, userId: user.id}));
  }

  filterTodosByStatus(status?: boolean) {
    const filter = {
      completed: status
    }

    this.store.dispatch(loadTodosAction({params: typeof(status) === 'boolean' ? filter : undefined}));
  }

  completeTodo(user: ITodo) {
    const changes = {
      completed: true
    }
    this.store.dispatch(changeTodoAction({changes, todoId: user.id}));
  }

  removeUser(todo: ITodo, user: IUser) {
    const newAssignedUsers = todo.associatedUsers.filter(userId => userId !== Number(user.id));
    const changes = {
      associatedUsers: newAssignedUsers,
    }
    this.store.dispatch(changeTodoAction({changes, todoId: todo.id}));
  }

}
