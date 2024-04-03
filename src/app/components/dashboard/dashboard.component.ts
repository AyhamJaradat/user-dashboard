import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user-service.service';
import { Observable, map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule , MatCardModule, RouterModule , MatButtonModule, MatDividerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  constructor(private userService:UserService){

  }
  userItems$: Observable<User[]> = this.userService.fetchAllUsers().pipe(
    tap(users => console.log("Users", users)),
    map(usersResponse => usersResponse.data)
  );
}
