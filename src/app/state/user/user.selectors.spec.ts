import { State } from '../index';
import { RepositoryState } from '../repository/repository.reducer';
import { UserState } from './user.redcuer';
import { ContributionState } from '../contribution/contribution.reducer';
import { GithubUser } from 'src/app/model/githubUser';
import * as UserSelectors from './user.selectors';
import { CachingState } from '../caching/caching.reducer';

describe('Test User Selectors', () => {
  let state: State;
  const users: GithubUser[] = [
    new GithubUser('id1', 'login1', 'avatarUrl1', 'url1'),
    new GithubUser('id2', 'login2', 'avatarUrl2', 'url2')
  ];

  beforeEach(() => {
    const repositoryState: RepositoryState = {
      ids: [],
      entities: {},
      searchTerm: undefined,
      selectedRepositoryId: undefined
    };
    const userState: UserState = {
      ids: ['id1', 'id2'],
      entities: {
        id1: users[0],
        id2: users[1]
      }
    };
    const contributionState: ContributionState = {
      ids: [],
      entities: {}
    };
    const cachingState: CachingState = {
      repositoryIdsWithCachedContributions: new Set<string>()
    };
    state = {
      repositories: repositoryState,
      users: userState,
      contributions: contributionState,
      caching: cachingState
    };
  });

  it('should select a user by id from the state', () => {
    expect(UserSelectors.selectUserById(state, { id: 'id1' })).toEqual(users[0]);
  });
});