import { RepositoryState, repositoryReducer } from './repository.reducer';
import * as RepositoryActions from './repository.actions';
import { GithubRepository } from 'src/app/model/githubRepository';

describe('Test Repository State Reducer', () => {
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
      entities: {},
      searchTerm: undefined,
      selectedRepositoryId: undefined
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
      entities: getRepositoryEntities([repository1]),
      searchTerm: undefined,
      selectedRepositoryId: undefined
    };
    const loadedRepositories = [
      repository2,
      repository3
    ];

    const state = repositoryReducer(initialState, RepositoryActions.loadRepositoriesFinished({ repositories: loadedRepositories }));
    const expectedState: RepositoryState = {
      ids: [repository1.id, repository2.id, repository3.id],
      entities: getRepositoryEntities([repository1, repository2, repository3]),
      searchTerm: undefined,
      selectedRepositoryId: undefined
    };

    expect(state.ids).toEqual(expectedState.ids);
    expect(state.entities).toEqual(expectedState.entities);
  });

  it('Does not have a defined search term, if searchTerm is empty', () => {
    const initialState: RepositoryState = {
      ids: [],
      entities: {},
      searchTerm: undefined,
      selectedRepositoryId: undefined
    };

    const state = repositoryReducer(initialState, RepositoryActions.filterRepositories({ searchTerm: '' }));

    expect(state.searchTerm).toEqual(undefined);
  });

  it('Sets search term correctly, if search term is not empty', () => {
    const initialState: RepositoryState = {
      ids: [],
      entities: {},
      searchTerm: undefined,
      selectedRepositoryId: undefined
    };

    const state = repositoryReducer(initialState, RepositoryActions.filterRepositories({ searchTerm: 'search' }));

    expect(state.searchTerm).toEqual('search');
    expect(state.selectedRepositoryId).toEqual(initialState.selectedRepositoryId);
    expect(state.ids).toEqual(initialState.ids);
    expect(state.entities).toEqual(initialState.entities);
  });

  it('Selecting a repository should add the corresponding id to the state', () => {
    const initialState: RepositoryState = {
      ids: [],
      entities: {},
      searchTerm: undefined,
      selectedRepositoryId: undefined
    };

    const state = repositoryReducer(initialState, RepositoryActions.viewRepositoryDetails({ repositoryId: 'id' }));

    expect(state.selectedRepositoryId).toEqual('id');
    expect(state.ids).toEqual(initialState.ids);
    expect(state.entities).toEqual(initialState.entities);
    expect(state.searchTerm).toEqual(initialState.searchTerm);
  });
});