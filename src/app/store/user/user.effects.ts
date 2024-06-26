import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  getUserDetailsAction,
  getUserDetailsFaliureAction,
  getUserDetailsSuccessAction,
  getUsersAction,
  getUsersFaliureAction,
  getUsersSuccessAction,
} from './user.action';
import { UserService } from '../../services/user-service/user.service';
import { Store } from '@ngrx/store';
import {
  selectTotalUsersNumber,
  selectUsers,
  selectUsersDetail,
} from './user.selector';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';

@Injectable()
export class UserEffects {
  users$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsersAction),
      withLatestFrom(
        this.store.select(selectUsers),
        this.store.select(selectTotalUsersNumber)
      ),
      switchMap(([{ page, perPage }, users, total]) => {
        const endIndex = page * perPage - 1;
        if (endIndex < users.length || (total > 0 && users.length >= total)) {
          // data already exists in the store
          return of({
            data: [],
            page: -1,
            per_page: -1,
            total: -1,
          });
        } else {
          return this.userService.fetchAllUsers(page, perPage).pipe(
            catchError((error) => {
              return of({
                data: [],
                page: -1,
                per_page: -1,
                total: -10,
              });
            })
          );
        }
      }),
      map((resp) => {
        if (resp.total === -10) {
          return getUsersFaliureAction();
        } else {
          return getUsersSuccessAction({
            users: resp.data,
            page: resp.page,
            per_page: resp.per_page,
            total: resp.total,
          });
        }
      }),
      catchError((error) => of(getUsersFaliureAction()))
    )
  );

  userDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserDetailsAction),
      withLatestFrom(this.store.select(selectUsersDetail)),
      switchMap(([{ userId }, userDetails]) => {
        const user = userDetails.find((u) => u.id === userId);
        if (user) {
          // data already exists in the store
          return of(user);
        } else {
          return this.userService.fetchUser(userId).pipe(
            catchError((error) => {
              return of(null);
            })
          );
        }
      }),
      map((resp) => {
        if (resp === null) {
          return getUserDetailsFaliureAction();
        } else {
          return getUserDetailsSuccessAction({
            userDetails: resp,
          });
        }
      }),
      catchError((error) => of(getUserDetailsFaliureAction()))
    )
  );

  error$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getUsersFaliureAction, getUserDetailsFaliureAction),
        tap(() => {
          this.dialog.open(ErrorDialogComponent);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store,
    public dialog: MatDialog
  ) {}
}
