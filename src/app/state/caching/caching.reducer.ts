import { createReducer, on } from '@ngrx/store';

import * as CachingActions from './caching.actions';

export interface CachingState {
  repositoryIdsWithCachedContributions: Set<String>;
}

const initialState: CachingState = {
  repositoryIdsWithCachedContributions: new Set<String>()
};

export const cachingReducer = createReducer(
  initialState,
  on(CachingActions.cacheRepositoryContributions, (state, { contributions }) => {
    return {
      ...state,
      repositoryIdsWithCachedContributions: new Set([
        ...state.repositoryIdsWithCachedContributions,
        ...new Set(contributions.map(contribution => contribution.repositoryId))
      ])
    }
  })
);