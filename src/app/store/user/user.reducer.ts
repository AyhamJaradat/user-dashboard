import { createReducer, on } from '@ngrx/store';
import { UserState } from './user.state';
import {
  getUserDetailsAction,
  getUserDetailsFaliureAction,
  getUserDetailsSuccessAction,
  getUsersAction,
  getUsersFaliureAction,
  getUsersSuccessAction,
} from './user.action';

export const initialState: UserState = {
  users: [],
  userDetails: [],
  page: 1,
  per_page: 5,
  total: 0,
  total_pages: 0,
};

export const UserReducer = createReducer(
  initialState,
  on(getUsersAction, (state, { page, perPage }) => ({
    ...state,
  })),
  on(getUsersSuccessAction, (state, { users, page, per_page, total }) => ({
    ...state,
    users: state.users.concat(
      users.filter(
        (u) => !state.users.map((stateUser) => stateUser.id).includes(u.id)
      )
    ),
    // Update page, pageSize, total, totalPages if sent
    ...(page > 0 && { page, per_page, total }),
  })),
  on(getUsersFaliureAction, (state) => ({
    ...state,
  })),

  on(getUserDetailsAction, (state, { userId }) => ({
    ...state,
  })),
  on(getUserDetailsSuccessAction, (state, { userDetails }) => {
    const isExistsAlready =
      state.userDetails.findIndex((user) => user.id == userDetails.id) > -1;
    return {
      ...state,
      userDetails: isExistsAlready
        ? state.userDetails
        : [...state.userDetails, userDetails],
    };
  }),
  on(getUserDetailsFaliureAction, (state) => ({
    ...state,
  }))
);
