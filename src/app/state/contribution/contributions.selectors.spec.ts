import { State } from '../index';
import { RepositoryState } from '../repository/repository.reducer';
import { UserState } from '../user/user.redcuer';
import { ContributionState } from '../contribution/contribution.reducer';
import { GithubUser } from 'src/app/model/githubUser';
import { GithubRepository } from 'src/app/model/githubRepository';
import { GithubContribution } from 'src/app/model/githubContribution';
import * as ContributionSelectors from './contribution.selectors';

describe('Test User Selectors', () => {
  let state: State;
  const repositories: GithubRepository[] = [
    new GithubRepository('repoId1', 'name1', 'owner1/name1'),
    new GithubRepository('repoId2', 'name2', 'owner1/name2')
  ];
  const users: GithubUser[] = [
    new GithubUser('userId1', 'login1', 'avatarUrl1', 'url1'),
    new GithubUser('userId2', 'login2', 'avatarUrl2', 'url2')
  ];
  const contributions: GithubContribution[] = [
    { id: 'contribId1', repositoryId: 'repoId1', userId: 'userId2' }
  ];

  beforeEach(() => {
    const repositoryState: RepositoryState = {
      ids: ['repoId1', 'repoId2'],
      entities: {}
    };
    const userState: UserState = {
      ids: ['userId1', 'usersId2'],
      entities: {
        id1: users[0],
        id2: users[1]
      }
    };
    const contributionState: ContributionState = {
      ids: ['contribId1'],
      entities: {
        contribId1: contributions[0]
      }
    };
    state = {
      repositories: repositoryState,
      users: userState,
      contributions: contributionState
    };
  });

  it('Should return all contributions', () => {
    expect(ContributionSelectors.selectAllContributions(state)).toEqual(contributions);
  });

  it('Shoud select all contributions belonging to the given repository-ID', () => {
    expect(ContributionSelectors.selectAllContributingUserIdsForRepository(state, { repositoryId: 'repoId1' }))
      .toEqual([users[1].id]);
    expect(ContributionSelectors.selectAllContributingUserIdsForRepository(state, { repositoryId: 'repoId2' }))
      .toEqual([]);
  });
});