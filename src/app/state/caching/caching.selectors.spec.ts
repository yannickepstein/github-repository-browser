import { State } from "../index";
import { RepositoryState } from '../repository/repository.reducer';
import { UserState } from '../user/user.redcuer';
import { ContributionState } from '../contribution/contribution.reducer';
import { CachingState } from './caching.reducer';
import * as CachingSelectors from './caching.selectors';

describe('Test Caching Selectors', () => {
  let state: State;

  beforeEach(() => {
    const repositoryState: RepositoryState = {
      ids: [],
      entities: {},
      searchTerm: undefined,
      selectedRepositoryId: undefined
    };
    const userState: UserState = {
      ids: [],
      entities: {}
    };
    const contributionState: ContributionState = {
      ids: [],
      entities: {}
    };
    const cachingState: CachingState = {
      repositoryIdsWithCachedContributions: new Set(['id1', 'id2'])
    };

    state = {
      repositories: repositoryState,
      users: userState,
      contributions: contributionState,
      caching: cachingState
    };
  });

  it('Selection of repository ids with cached contributions returns the corresponding set', () => {
    expect(CachingSelectors.selectRepositoryIdsWithCacheContributions(state))
      .toEqual(state.caching.repositoryIdsWithCachedContributions);
  });
});