import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from 'src/app/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private readonly baseUrl = 'http://localhost:3000'

  constructor (
    private http: HttpClient
  ) { }

  getTodos (params?: any): Observable<Array<ITodo>> {
    let httpParams = {};
    if (params) {
      httpParams = new HttpParams({fromObject: params});
    }
    return this.http.get<Array<ITodo>>(`${this.baseUrl}/todos`, {params: httpParams});
  }

  deleteTodo (todoId: string) {
    return this.http.delete(`${this.baseUrl}/todos/${todoId}`);
  }

  createTodo (todo: ITodo) {
    return this.http.post(`${this.baseUrl}/todos`, todo);
  }

  changeTodo (changes: any, todoId: string) {
    return this.http.patch(`${this.baseUrl}/todos/${todoId}`, changes);
  }
}
