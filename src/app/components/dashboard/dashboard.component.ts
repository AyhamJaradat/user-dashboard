import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user-service/user.service';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  debounceTime,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Paginator } from '../../models/paginator.interface';
import { HeaderService } from '../../services/header-service/header.service';
import { Store, select } from '@ngrx/store';
import { UserState } from '../../store/user/user.state';
import { selectUsers, selectUsersPage } from '../../store/user/user.selector';
import { getUsersAction } from '../../store/user/user.action';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatPaginatorModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  totalNumberOfItems: number = 0;
  pageSize: number = 5;
  currentPageIndex: number = 0;

  allUsers$: Observable<Array<User>> = this.store.pipe(select(selectUsers));

  constructor(
    private headerService: HeaderService,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.headerService.showSearchBar(true);
    this.pagination$.subscribe((paginator) => {
      this.fetchUsersPage(paginator.pageIndex, paginator.pageSize);
    });
  }

  private pagination$ = new BehaviorSubject<Paginator>({
    pageIndex: 1,
    pageSize: 5,
  });

  searchChange$ = this.headerService.searchChange$.pipe(debounceTime(250));

  usersInPage$: Observable<User[]> = this.pagination$.pipe(
    tap((paginator) => {
      this.pageSize = paginator.pageSize;
      this.currentPageIndex = paginator.pageIndex - 1;
    }),
    switchMap((paginator) =>
      this.store
        .pipe(select(selectUsersPage(paginator.pageIndex, paginator.pageSize)))
        .pipe(
          switchMap((resp) => combineLatest([of(resp), this.searchChange$])),
          map(([usersResponse, searchValue]) => {
            console.log('usersResponse', usersResponse);
            if (searchValue !== '') {
              // Hide paginator when displaying the filtered results
              this.totalNumberOfItems = 0;
              return usersResponse.data.filter(
                (item) => searchValue && item.id.toString() === searchValue
              );
            } else {
              this.totalNumberOfItems = usersResponse.total;
              return usersResponse.data;
            }
          })
        )
    )
  );

  fetchUsersPage(page: number, perPage: number) {
    this.store.dispatch(getUsersAction({ page, perPage }));
  }

  handlePageEvent(e: PageEvent) {
    this.pagination$.next({
      pageIndex: e.pageIndex + 1,
      pageSize: e.pageSize,
    });
  }
}
