import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HeaderService } from '../../services/header-service/header.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-details-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
  ],
  templateUrl: './user-details-view.component.html',
  styleUrl: './user-details-view.component.scss',
})
export class UserDetailsViewComponent implements OnInit {
  constructor(
    private userSerive: UserService,
    private activatedRoute: ActivatedRoute,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.showSearchBar(false);
  }
  userId$ = this.activatedRoute.params.pipe(map((p) => p['id']));
  userDetails$ = this.userId$.pipe(
    switchMap((userId) => this.userSerive.fetchUser(userId))
  );
}
