import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
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

  constructor(
    private userService: UserService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.showSearchBar(true);
  }

  private pagination$ = new BehaviorSubject<Paginator>({
    pageIndex: 1,
    pageSize: 5,
  });

  searchChange$ = this.headerService.searchChange$.pipe(debounceTime(250));

  userItems$: Observable<User[]> = this.pagination$.pipe(
    tap(paginator => {
      this.pageSize = paginator.pageSize
    }),
    switchMap((paginator) =>
      this.userService
        .fetchAllUsers(paginator.pageIndex, paginator.pageSize)
        .pipe(
          switchMap((resp) => combineLatest([of(resp), this.searchChange$])),
          tap(([usersResponse, searchValue]) =>
            console.log('Users', usersResponse, searchValue)
          ),
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
          })
        )
    )
  );

  handlePageEvent(e: PageEvent) {
    console.log('page', e);
    this.pagination$.next({
      pageIndex: e.pageIndex + 1,
      pageSize: e.pageSize,
    });
  }
}
