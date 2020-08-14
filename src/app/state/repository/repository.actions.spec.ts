import { RepositoryActionTypes } from './repository.actions';
import * as RepositoryActions from './repository.actions';
import { GithubRepository } from '../../model/githubRepository';

describe('Repository State Actions', () => {
  it('Load Repositories has correct type', () => {
    const action = RepositoryActions.loadRepositories();
    const expectedType = RepositoryActionTypes.LoadRepositories;

    expect(action.type).toEqual(expectedType);
  });

  it('Load Repositories Finished has correct type and payload', () => {
    const repositories = [
      new GithubRepository('id', 'name', "user/name", "", 0)
    ];

    const action = RepositoryActions.loadRepositoriesFinished({ repositories: repositories });
    const expectedType = RepositoryActionTypes.LoadRepositoriesFinished;

    expect(action.type).toEqual(expectedType);
    expect(action.repositories).toEqual(repositories);
  });
});