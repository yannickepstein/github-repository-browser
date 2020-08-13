import { ActionReducerMap } from '@ngrx/store';

import * as repository from './repository/repository.reducer';
import * as user from './user/user.redcuer';
import * as contribution from './contribution/contribution.reducer';

export interface State {
  repositories: repository.RepositoryState,
  users: user.UserState,
  contributions: contribution.ContributionState
}

export const reducers: ActionReducerMap<State> = {
  repositories: repository.repositoryReducer,
  users: user.userReducer,
  contributions: contribution.contributionReducer
}