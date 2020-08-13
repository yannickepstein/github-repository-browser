export interface IGithubUserResponse {
  login: string;
  id: string;
  avatar_url: string;
  url: string;
}

export class GithubUser {
  constructor(
    public id: string,
    public login: string,
    public avatarUrl: string,
    public url: string,
  ) {}
}