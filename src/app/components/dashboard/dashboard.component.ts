import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user-service.service';
import { Observable, map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule , MatListModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  constructor(private userService:UserService){

  }
  userItems$: Observable<User[]> = this.userService.fetchUsers().pipe(
    tap(users => console.log("Users", users)),
    map(usersResponse => usersResponse.data)
  );
}
