import { ContributionState, contributionReducer } from "./contribution.reducer";
import * as ContributonActions from './contribution.actions';
import { GithubContribution } from 'src/app/model/githubContribution';

describe('Test Contribution Reducer', () => {
  let initialState: ContributionState;
  
  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {}
    };
  });

  it('Load contributions of respository should not affect the state', () => {
    const state = contributionReducer(initialState, ContributonActions.loadContributionsOfRepository({ repositoryId: 'id', repositoryNameAndOwner: 'owner/name' }));

    expect(state).toEqual(initialState);
  });

  it('Load contribution of repository finished should add all contribution entities', () => {
    const contributions: GithubContribution[] = [
      { id: 'id1', repositoryId: 'repoId1', userId: 'user1', number: 200 },
      { id: 'id2', repositoryId: 'repoId1', userId: 'user2', number: 300 }
    ];

    const state = contributionReducer(initialState, ContributonActions.loadContributionsOfRepositoryFinished({ contributions: contributions }));

    expect(state.ids).toEqual(contributions.map(contribution => contribution.id));
    expect(state.entities).toEqual({
      id1: contributions[0],
      id2: contributions[1]
    });
  })
});