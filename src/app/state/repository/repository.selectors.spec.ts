import { State } from '../index';
import { RepositoryState } from './repository.reducer';
import { GithubRepository } from 'src/app/model/githubRepository';
import { UserState } from '../user/user.redcuer';
import { ContributionState } from '../contribution/contribution.reducer';
import * as RepositorySelectors from './repository.selectors';

describe('Test Repository Selectors', () => {
  let state: State;
  const repositories: GithubRepository[] = [
    new GithubRepository('id1', 'name1', 'owner1/name1', ''),
    new GithubRepository('id2', 'name2', 'owner1/name2', '')
  ];

  beforeEach(() => {
    const repositoryState: RepositoryState = {
      ids: ['id1', 'id2'],
      entities: {
        id1: repositories[0],
        id2: repositories[1] 
      }
    };
    const userState: UserState = {
      ids: [],
      entities: {}
    };
    const contributionState: ContributionState = {
      ids: [],
      entities: {}
    };
    state = {
      repositories: repositoryState,
      users: userState,
      contributions: contributionState
    };
  });

  it('should select all repositories from the state', () => {
    expect(RepositorySelectors.selectAllRepositories(state)).toEqual(repositories);
  });
});