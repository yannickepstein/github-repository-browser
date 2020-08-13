import { GithubUser } from '../../model/githubUser';
import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as UserActions from './user.actions';

export const userAdapter = createEntityAdapter<GithubUser>();

export interface UserState extends EntityState<GithubUser> { }

const initialState: UserState = userAdapter.getInitialState();

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersFinished, (state, { users }) => {
    return userAdapter.addMany(users, state); 
  })
);

const {
  selectIds,
  selectEntities,
  selectAll
} = userAdapter.getSelectors();

export const selectUserIds = selectIds;
export const selectUserEntities = selectEntities;
export const selectAllUsers = selectAll;