import { GithubUser } from './githubUser';

export class GithubRepository {
  constructor(
    public id: string,
    public name: string,
    public nameWithOwner: string
  ) {}
}