import { RepositoryState, repositoryReducer } from './repository.reducer';
import * as RepositoryActions from './repository.actions';
import { GithubRepository } from 'src/app/model/githubRepository';

describe('Repository State Reducer', () => {
  function getRepositoryEntities(repositories: GithubRepository[]): any {
    const entities = {};
    repositories.forEach(repository => {
      entities[repository.id] = repository;
    });
    return entities;
  }

  it('Reducing Load Action does not modify state', () => {
    const initialState: RepositoryState = {
      ids: [],
      entities: {}
    };

    const state = repositoryReducer(initialState, RepositoryActions.loadRepositories());
    const expectedState: RepositoryState = initialState; 

    expect(state).toEqual(expectedState);
  });

  it('Reducing Load Finished updates items in state', () => {
    const repository1 = new GithubRepository('id1', 'name1', "user/name1", "", 0);
    const repository2 = new GithubRepository('id2', 'name2', "user/name2", "", 0);
    const repository3 = new GithubRepository('id3', 'name3', "user/name3", "", 0);
    const initialEntities = {};
    initialEntities[repository1.id] = repository1;
    const initialState: RepositoryState = {
      ids: [repository1.id],
      entities: getRepositoryEntities([repository1])
    };
    const loadedRepositories = [
      repository2,
      repository3
    ];

    const state = repositoryReducer(initialState, RepositoryActions.loadRepositoriesFinished({ repositories: loadedRepositories }));
    const expectedState: RepositoryState = {
      ids: [repository1.id, repository2.id, repository3.id],
      entities: getRepositoryEntities([repository1, repository2, repository3])
    };

    expect(state.ids).toEqual(expectedState.ids);
    expect(state.entities).toEqual(expectedState.entities);
  });
});