import { createAction, props } from '@ngrx/store';
import { User, UserDetails } from '../../models/user.interface';

export const getUsersAction = createAction(
  '[User] fetch Users',
  props<{ page: number; perPage: number }>()
);
export const getUsersSuccessAction = createAction(
  '[User] get Users Success',
  props<{ users: User[]; page: number; per_page: number; total: number }>()
);
export const getUsersFaliureAction = createAction('[User] get Users Faliure');

export const getUserDetailsAction = createAction(
  '[User] fetch User Details',
  props<{ userId: number }>()
);
export const getUserDetailsSuccessAction = createAction(
  '[User] get User Details Success',
  props<{ userDetails: UserDetails }>()
);
export const getUserDetailsFaliureAction = createAction(
  '[User] get User Details Faliure'
);
