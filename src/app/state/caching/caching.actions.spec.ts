import * as CachingActions from './caching.actions';
import { GithubContribution } from 'src/app/model/githubContribution';

describe('Test Caching Actions', () => {

  it('Caching repository contributions action has correct type and paylod', () => {
    const contributions: GithubContribution[] = [
      { id: 'id', repositoryId: 'repoId', userId: 'userId', number: 10 }
    ];

    const action = CachingActions.cacheRepositoryContributions({ contributions: contributions });

    expect(action.type).toEqual(CachingActions.CachingActionTypes.CacheRepositoryContributions);
    expect(action.contributions).toEqual(contributions);
  });
});