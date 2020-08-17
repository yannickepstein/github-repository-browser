import { createAction, props } from "@ngrx/store";
import { GithubContribution } from '../../model/githubContribution';

export enum CachingActionTypes {
  CacheRepositoryContributions = '[Caching] Cache Repository Contributions'
}

export const cacheRepositoryContributions = createAction(
  CachingActionTypes.CacheRepositoryContributions,
  props<{ contributions: GithubContribution[] }>()
);