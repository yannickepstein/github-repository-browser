import { RepositoryActionTypes, loadRepositories, loadRepositoriesFinished, loadRepositoriesError } from './repository.actions';
import { GithubRepository } from '../../model/githubRepository';

describe('Repository State Actions', () => {
  it('Load Repositories has correct type', () => {
    const action = loadRepositories();
    const expectedType = RepositoryActionTypes.LoadRepositories;

    expect(action.type).toEqual(expectedType);
  });

  it('Load Repositories Finished has correct type and payload', () => {
    const repositories = [
      new GithubRepository('id', 'name')
    ];

    const action = loadRepositoriesFinished({ repositories: repositories });
    const expectedType = RepositoryActionTypes.LoadRepositoriesFinished;

    expect(action.type).toEqual(expectedType);
    expect(action.repositories).toEqual(repositories);
  });

  it('Load Repositories Error has correct type and payload', () => {
    const errorMessage = 'Fetching of repositories has failed!';

    const action = loadRepositoriesError({ errorMessage: errorMessage });
    const expectedType = RepositoryActionTypes.LoadRepositoriesError;

    expect(action.type).toEqual(expectedType);
    expect(action.errorMessage).toEqual(errorMessage);
  });
});