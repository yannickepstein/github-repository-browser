import { Injectable } from '@angular/core';

import { GithubUser, IGithubUserResponse } from '../../model/githubUser';

@Injectable()
export class GithubUserTranslatorService {

  translateGithubUser(user: IGithubUserResponse): GithubUser {
    return new GithubUser(
      user.id,
      user.login,
      user.avatar_url,
      user.url,
    );
  }
}