import { State } from '../index';
import { RepositoryState } from './repository.reducer';
import { GithubRepository } from 'src/app/model/githubRepository';
import { UserState } from '../user/user.redcuer';
import { ContributionState } from '../contribution/contribution.reducer';
import * as RepositorySelectors from './repository.selectors';
import { CachingState } from '../caching/caching.reducer';

describe('Test Repository Selectors', () => {
  let state: State;
  const repositories: GithubRepository[] = [
    new GithubRepository('id1', 'name1', 'owner1/name1', '', 0),
    new GithubRepository('id2', 'name2', 'owner1/name2', '', 0)
  ];

  beforeEach(() => {
    const repositoryState: RepositoryState = {
      ids: ['id1', 'id2'],
      entities: {
        id1: repositories[0],
        id2: repositories[1] 
      },
      searchTerm: 'abc',
      selectedRepositoryId: 'id'
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
      repositoryIdsWithCachedContributions: new Set<string>()
    };
    state = {
      repositories: repositoryState,
      users: userState,
      contributions: contributionState,
      caching: cachingState
    };
  });

  it('should select all repositories from the state', () => {
    expect(RepositorySelectors.selectAllRepositories(state)).toEqual(repositories);
  });

  it('selects the searchterm for repositories', () => {
    expect(RepositorySelectors.selectRepositorySearchTerm(state)).toEqual('abc');
  });

  it('Should return the currently selected repository id', () => {
    expect(RepositorySelectors.selectSelectedRepositoryId(state)).toEqual('id');
  })
});