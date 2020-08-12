import { ReducerRepositoryState, repositoryReducer } from './repository.reducer';
import { loadRepositories, loadRepositoriesError, loadRepositoriesFinished } from './repository.actions';
import { GithubRepository } from 'src/app/model/githubRepository';

describe('Repository State Reducer', () => {
  it('Sets loading status of state to true, if loadRepositories is dispatched', () => {
    const initialState: ReducerRepositoryState = {
      items: [],
      loading: false,
      error: null
    };

    const state = repositoryReducer(initialState, loadRepositories());
    const expectedState: ReducerRepositoryState = {
      items: [],
      loading: true,
      error: null
    };

    expect(state).toEqual(expectedState);
  });

  it('Adds the dispatched repositories to the state, clears errors, and resets loading flag', () => {
    const repository1 = new GithubRepository('id1', 'name1');
    const repository2 = new GithubRepository('id2', 'name2');
    const repository3 = new GithubRepository('id3', 'name3');
    const initialState: ReducerRepositoryState = {
      items: [
        repository1
      ],
      loading: true,
      error: 'Error'
    };
    const loadedRepositories = [
      repository2,
      repository3
    ];

    const state = repositoryReducer(initialState, loadRepositoriesFinished({ repositories: loadedRepositories }));
    const expectedState: ReducerRepositoryState = {
      items: [
        repository1,
        repository2,
        repository3
      ],
      loading: false,
      error: null
    };

    expect(state).toEqual(expectedState);
  });

  it('Sets the error message and stops the loading', () => {
    const initialState: ReducerRepositoryState = {
      items: [],
      loading: true,
      error: null
    };
    const errorMessage = 'Loading failed'

    const state = repositoryReducer(initialState, loadRepositoriesError({ errorMessage: errorMessage}));
    const expectedState: ReducerRepositoryState = {
      items: [],
      loading: false,
      error: errorMessage
    };

    expect(state).toEqual(expectedState);
  })
});