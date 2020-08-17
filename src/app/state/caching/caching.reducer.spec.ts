import { cachingReducer, CachingState } from './caching.reducer';
import * as CachingActions from './caching.actions';
import { GithubContribution } from 'src/app/model/githubContribution';

describe('Test Caching Reducer', () => {

  let initialState: CachingState;

  beforeEach(() => {
    initialState = {
      repositoryIdsWithCachedContributions: new Set<string>()
    }
  });

  it('Reducing Caching Repository Contributions adds repository id to the set of repositoriesWithCachedContributions', () => {
    initialState.repositoryIdsWithCachedContributions = new Set(['repoId2']);
    const contributions: GithubContribution[] = [
      { id: 'id1', repositoryId: 'repoId1', userId: 'user1', number: 200 },
      { id: 'id2', repositoryId: 'repoId1', userId: 'user2', number: 100 },
      { id: 'id3', repositoryId: 'repoId2', userId: 'user3', number: 100 }
    ];

    const state = cachingReducer(initialState, CachingActions.cacheRepositoryContributions({ contributions: contributions }));

    expect(state.repositoryIdsWithCachedContributions).toEqual(new Set(['repoId1', 'repoId2']));
  });
});