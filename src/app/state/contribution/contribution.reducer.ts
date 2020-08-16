import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { GithubContribution } from '../../model/githubContribution';
import * as ContributionActions from './contribution.actions';

export const contributionAdapter = createEntityAdapter<GithubContribution>();

export interface ContributionState extends EntityState<GithubContribution> { }

const initialState: ContributionState = contributionAdapter.getInitialState();

export const contributionReducer = createReducer(
  initialState,
  on(ContributionActions.loadContributionsOfRepository, state => state),
  on(ContributionActions.loadContributionsOfRepositoryFinished, (state, { contributions }) => {
    return contributionAdapter.addMany(contributions, state);
  })
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = contributionAdapter.getSelectors();

export const selectContributionIds = selectIds;
export const selectContributionEntities = selectEntities;
export const selectAllContributions = selectAll;