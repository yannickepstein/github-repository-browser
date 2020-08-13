import { GithubRepository } from '../../model/githubRepository';
import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as RepositoryActions from './repository.actions';

export const repositoryAdapter = createEntityAdapter<GithubRepository>();

export interface RepositoryState extends EntityState<GithubRepository> { }

const initialState: RepositoryState = repositoryAdapter.getInitialState();

export const repositoryReducer = createReducer(
  initialState,
  on(RepositoryActions.loadRepositories, state => state),
  on(RepositoryActions.loadRepositoriesFinished, (state, { repositories }) => {
    return repositoryAdapter.addMany(repositories, state);
  })
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = repositoryAdapter.getSelectors();

export const selectRepositoryIds = selectIds;
export const selectRepositoryEntities = selectEntities;
export const selectAllRepositories = selectAll;
export const selectRepositoriesTotal = selectTotal;