import { createAction, props } from "@ngrx/store";
import { GithubContribution } from '../../model/githubContribution';

export enum ContributionActionTypes {
  LoadContributionsOfRepository = '[Contribution] Load Contributions of Repository',
  LoadContributionsOfRepositoryFinished = '[Contribution] Load Contributions of Repository Finished'
}

export const loadContributionsOfRepository = createAction(
  ContributionActionTypes.LoadContributionsOfRepository,
  props<{ repositoryId: string, repositoryNameAndOwner: string }>()
);

export const loadContributionsOfRepositoryFinished = createAction(
  ContributionActionTypes.LoadContributionsOfRepositoryFinished,
  props<{ contributions: GithubContribution[] }>()
);