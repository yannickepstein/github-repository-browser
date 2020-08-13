import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUser from './user.redcuer';
import { GithubUser } from '../../model/githubUser';

export const selectUserState = createFeatureSelector<fromUser.UserState>('users');

export const selectUserEntities = createSelector(selectUserState, fromUser.selectUserEntities)

export const selectUserById = createSelector(
  selectUserEntities,
  (entities: { [id: string]: GithubUser }, props: { id: string }) => {
    return entities[props.id];
  }
);