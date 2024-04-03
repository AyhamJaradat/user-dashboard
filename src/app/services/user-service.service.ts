import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User, UsersResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public fetchAllUsers(): Observable<UsersResponse> {
    return this.httpClient.get<UsersResponse>(
      'https://reqres.in/api/users?page=1'
    );
  }

  public fetchUser(userId:number): Observable<User> {
    return this.httpClient.get<User>(
      `https://reqres.in/api/users/${userId}`
    ).pipe(
      map((resp:any) => resp.data)
    );
  }
}
