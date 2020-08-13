import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GithubContribution } from 'src/app/model/githubContribution';
import * as fromContribution from './contribution.reducer';

export const selectContributionState = createFeatureSelector<fromContribution.ContributionState>('contributions');

export const selectAllContributions = createSelector(
  selectContributionState,
  fromContribution.selectAllContributions
);

export const selectAllContributingUserIdsForRepository = createSelector(
  selectAllContributions,
  (contributions: GithubContribution[], props: { repositoryId: string }) => {
    return contributions
      .filter(contribution => contribution.repositoryId === props.repositoryId)
      .map(contribution => contribution.userId);
  }
);