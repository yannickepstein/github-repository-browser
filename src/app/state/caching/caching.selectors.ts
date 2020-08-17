import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCaching from './caching.reducer';

export const selectCachingState = createFeatureSelector<fromCaching.CachingState>('caching');

export const selectRepositoryIdsWithCachedContributions = createSelector(
  selectCachingState,
  (state: fromCaching.CachingState) => state.repositoryIdsWithCachedContributions
);