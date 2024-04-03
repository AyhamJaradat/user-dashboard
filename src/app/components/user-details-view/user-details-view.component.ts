import { Component } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-user-details-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatListModule],
  templateUrl: './user-details-view.component.html',
  styleUrl: './user-details-view.component.scss'
})
export class UserDetailsViewComponent {

  constructor(private userSerive: UserService, private activatedRoute: ActivatedRoute){

  }
  userId$ = this.activatedRoute.params.pipe(map((p) => p['id']));
  userDetails$ = this.userId$.pipe(
    switchMap(userId => this.userSerive.fetchUser(userId))
  )
  

}
