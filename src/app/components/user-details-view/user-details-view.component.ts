import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HeaderService } from '../../services/header-service/header.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserState } from '../../store/user/user.state';
import { Store, select } from '@ngrx/store';
import { getUserDetailsAction } from '../../store/user/user.action';
import { selectUserById } from '../../store/user/user.selector';

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
    private activatedRoute: ActivatedRoute,
    private headerService: HeaderService,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.headerService.showSearchBar(false);
  }
  userId$ = this.activatedRoute.params.pipe(
    map((p) => p['id']),
    map((userId) => +userId)
  );
  userDetails$ = this.userId$.pipe(
    tap((userId) => {
      this.store.dispatch(getUserDetailsAction({ userId }));
    }),
    switchMap((userId) => this.store.pipe(select(selectUserById(userId))))
  );
}
