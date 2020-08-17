import { RepositoryFilterPipe } from './repositoryFilter.pipe';
import { GithubRepository } from 'src/app/model/githubRepository';

describe('Test Repository Search Pipe', () => {
  let repositoryFilterPipe: RepositoryFilterPipe;

  beforeAll(() => {
    repositoryFilterPipe = new RepositoryFilterPipe();
  });

  it('Filter undefined repositories correctly', () => {
    const repositories: GithubRepository[] = undefined;
    const searchTerm: string = undefined;

    const filteredRepositories = repositoryFilterPipe.transform(repositories, searchTerm);

    expect(filteredRepositories).toEqual([]);
  });

  it('should perform no filtering, if search term is undefined', () => {
    const repositories: GithubRepository[] = [
      new GithubRepository('id', 'name', 'owner/name', 'url', 10)
    ];
    const searchTerm: string = undefined;

    const filteredRepositories = repositoryFilterPipe.transform(repositories, searchTerm);

    expect(filteredRepositories).toEqual(repositories);
  });

  it('should return all repositories for which the searchTerm is an infix', () => {
    const repositories: GithubRepository[] = [
      new GithubRepository('id1', 'name-javascript-more', 'owner/name', 'url', 10),
      new GithubRepository('id2', 'hello-javascript', 'owner/name', 'url', 200),
      new GithubRepository('id3', 'java-script', 'owner/name', 'url', 12)
    ];
    const searchTerm = 'javascript';

    const filteredRepositories = repositoryFilterPipe.transform(repositories, searchTerm);
    const expectedRepositories = repositories.slice(0, 2);

    expect(filteredRepositories).toEqual(expectedRepositories);
  });
});