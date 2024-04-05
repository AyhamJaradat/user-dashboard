import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  UserDetails,
  UserDetailsResponse,
  UsersResponse,
} from '../../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_BASE_URL = 'https://reqres.in/api/';
  constructor(private httpClient: HttpClient) {}

  public fetchAllUsers(
    page: number = 1,
    perPage = 5
  ): Observable<UsersResponse> {
    return this.httpClient.get<UsersResponse>(
      `${this.API_BASE_URL}users?page=${page}&per_page=${perPage}`
    );
  }

  public fetchUser(userId: number): Observable<UserDetails> {
    return this.httpClient
      .get<UserDetailsResponse>(`${this.API_BASE_URL}users/${userId}`)
      .pipe(
        map((resp: UserDetailsResponse) => ({
          ...resp.data,
          support: resp.support,
        }))
      );
  }
}
