import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

// Get complete state of the Users
export const selectUserState = createFeatureSelector<UserState>('users');

// get All users
export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectUsersDetail = createSelector(
  selectUserState,
  (state: UserState) => state.userDetails
);

export const selectTotalUsersNumber = createSelector(
  selectUserState,
  (state: UserState) => state.total
);

// Get one User by user Id
export const selectUserById = (userId: number) =>
  createSelector(selectUsersDetail, (userDetails) => {
    return userDetails.find((user) => user.id === userId);
  });

// Get a page of Users
export const selectUsersPage = (page: number, perPage: number) =>
  createSelector(selectUserState, (userState: UserState) => {
    const startIndex = perPage * (page - 1);
    const endIndex = page * perPage - 1;
    return {
      ...userState,
      data: userState.users.slice(startIndex, endIndex + 1),
    };
  });
