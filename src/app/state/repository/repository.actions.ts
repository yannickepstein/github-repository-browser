import { createAction, props } from "@ngrx/store";
import { GithubRepository } from 'src/app/model/githubRepository';

export enum RepositoryActionTypes {
  LoadRepositories = '[Repository] Load Repositories',
  LoadRepositoriesFinished = '[Repository] Load Repositories Finished',
  FilterRepositories = '[Repository] Filter Repositories',
  ViewRepositoryDetails = '[Repository] View Repository Details'
}

export const loadRepositories = createAction(
  RepositoryActionTypes.LoadRepositories
);

export const loadRepositoriesFinished = createAction(
  RepositoryActionTypes.LoadRepositoriesFinished,
  props<{ repositories: GithubRepository[] }>()
);

export const filterRepositories = createAction(
  RepositoryActionTypes.FilterRepositories,
  props<{ searchTerm: string }>()
);

export const viewRepositoryDetails = createAction(
  RepositoryActionTypes.ViewRepositoryDetails,
  props<{ repositoryId: string }>()
);