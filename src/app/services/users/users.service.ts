import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly baseUrl = 'http://localhost:3000'
  constructor (
    private http: HttpClient
  ) { }

  getUsers (): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(`${this.baseUrl}/users`);
  }

  createUser (user: IUser) {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  changeUser (changes: any, userId: string) {
    return this.http.patch(`${this.baseUrl}/users/${userId}`, changes);
  }
}
