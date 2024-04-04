import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User, UsersResponse } from '../../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_BASE_URL = 'https://reqres.in/api/';
  constructor(private httpClient: HttpClient) {}

  public fetchAllUsers(
    page: number = 1,
    perPage = 10
  ): Observable<UsersResponse> {
    return this.httpClient.get<UsersResponse>(
      `${this.API_BASE_URL}users?page=${page}&per_page=${perPage}`
    );
  }

  public fetchUser(userId: number): Observable<User> {
    return this.httpClient
      .get<User>(`${this.API_BASE_URL}users/${userId}`)
      .pipe(map((resp: any) => resp.data));
  }
}
