export class GithubRepository {
  constructor(
    public id: string,
    public name: string,
    public nameWithOwner: string,
    public url: string,
    public stars: number
  ) {}
}