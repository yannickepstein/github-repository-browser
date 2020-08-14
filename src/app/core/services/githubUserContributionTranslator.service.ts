import { Injectable } from '@angular/core';

import { IGithubUserContributionResponse } from '../../model/githubContribution';
import { GithubUser } from '../../model/githubUser';

@Injectable()
export class GithubUserContributionTranslatorService {

  translateGithubUserContributionToUser(response: IGithubUserContributionResponse): GithubUser {
    return new GithubUser(
      response.id,
      response.login,
      response.avatar_url,
      response.url,
    );
  }
}