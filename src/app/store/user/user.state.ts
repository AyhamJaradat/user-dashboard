import { User, UserDetails } from '../../models/user.interface';

export interface UserState {
  users: User[];
  userDetails: UserDetails[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
