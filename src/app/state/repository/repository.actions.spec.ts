import { RepositoryActionTypes } from './repository.actions';
import * as RepositoryActions from './repository.actions';
import { GithubRepository } from '../../model/githubRepository';

describe('Repository State Actions', () => {
  it('Load Repositories has correct type', () => {
    const action = RepositoryActions.loadRepositories();

    expect(action.type).toEqual(RepositoryActionTypes.LoadRepositories);
  });

  it('Load Repositories Finished has correct type and payload', () => {
    const repositories = [
      new GithubRepository('id', 'name', "user/name", "", 0)
    ];

    const action = RepositoryActions.loadRepositoriesFinished({ repositories: repositories });

    expect(action.type).toEqual(RepositoryActionTypes.LoadRepositoriesFinished);
    expect(action.repositories).toEqual(repositories);
  });

  it('Filter Repositories should have correct type and payload', () => {
    const action = RepositoryActions.filterRepositories({ searchTerm: 'search' });
    
    expect(action.type).toEqual(RepositoryActionTypes.FilterRepositories);
    expect(action.searchTerm).toEqual('search');
  })
});