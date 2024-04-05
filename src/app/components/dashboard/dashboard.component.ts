import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.interface';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  map,
  of,
  switchMap,
  takeUntil,
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
import { selectUsersPage } from '../../store/user/user.selector';
import { getUsersAction } from '../../store/user/user.action';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalNumberOfItems: number = 0;
  pageSize: number = 5;
  currentPageIndex: number = 0;
  isLoading: boolean = true;

  private distroy$ = new Subject<void>();
  private searchChange$ = this.headerService.searchChange$.pipe(
    debounceTime(250)
  );

  private pagination$ = new BehaviorSubject<Paginator>({
    pageIndex: 1,
    pageSize: 5,
  });

  constructor(
    private headerService: HeaderService,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.headerService.showSearchBar(true);
    this.pagination$.pipe(takeUntil(this.distroy$)).subscribe((paginator) => {
      this.fetchUsersPage(paginator.pageIndex, paginator.pageSize);
    });
  }

  ngOnDestroy(): void {
    this.distroy$.next();
    this.distroy$.complete();
  }

  usersInPage$: Observable<User[]> = this.pagination$.pipe(
    tap((paginator) => {
      this.pageSize = paginator.pageSize;
      this.currentPageIndex = paginator.pageIndex - 1;
      this.isLoading = true;
    }),
    switchMap((paginator) =>
      this.store
        .pipe(select(selectUsersPage(paginator.pageIndex, paginator.pageSize)))
        .pipe(
          switchMap((resp) => combineLatest([of(resp), this.searchChange$])),
          map(([usersResponse, searchValue]) => {
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
          }),
          tap(() => (this.isLoading = false))
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
