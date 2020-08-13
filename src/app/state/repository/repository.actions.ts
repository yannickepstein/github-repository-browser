import { createAction, props } from "@ngrx/store";
import { GithubRepository } from 'src/app/model/githubRepository';

export enum RepositoryActionTypes {
  LoadRepositories = '[Repository] Load Repositories',
  LoadRepositoriesFinished = '[Repository] Load Repositories Finished',
}

export const loadRepositories = createAction(
  RepositoryActionTypes.LoadRepositories
);

export const loadRepositoriesFinished = createAction(
  RepositoryActionTypes.LoadRepositoriesFinished,
  props<{ repositories: GithubRepository[] }>()
);