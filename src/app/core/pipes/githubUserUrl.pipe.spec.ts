import { GithubUserUrlPipe } from './githubUserUrl.pipe';

describe('Github User URL Pipe', () => {
  let githubUserUrlPipe: GithubUserUrlPipe;

  beforeEach(() => {
    githubUserUrlPipe = new GithubUserUrlPipe();
  });

  it('should transform user login to corresponding github profile url', () => {
    const login = 'username';

    const profileUrl = githubUserUrlPipe.transform(login);
    const expectedProfileUrl = `https://github.com/${login}`;

    expect(profileUrl).toEqual(expectedProfileUrl);
  });
});