import { GithubRepository } from '../../model/githubRepository';
import { createReducer, on } from '@ngrx/store';
import { loadRepositories, loadRepositoriesError, loadRepositoriesFinished } from './repository.actions';

export interface ReducerRepositoryState {
  items: GithubRepository[],
  loading: boolean,
  error: string
}

export const initialState: ReducerRepositoryState = {
  items: [],
  loading: false,
  error: null
}

export const repositoryReducer = createReducer(
  initialState,
  on(loadRepositories, state => ({
    ...state,
    loading: true
  })),
  on(loadRepositoriesFinished, (state, { repositories }) => ({
    ...state,
    items: state.items.concat(repositories),
    loading: false,
    error: null
  })),
  on(loadRepositoriesError, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    error: errorMessage
  }))
);