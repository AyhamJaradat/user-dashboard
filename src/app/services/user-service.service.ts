import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UsersResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  public fetchUsers(): Observable<UsersResponse>{
    return this.httpClient.get<UsersResponse>("https://reqres.in/api/users?page=1");
  }
}
