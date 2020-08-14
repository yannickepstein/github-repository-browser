import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class RepositoryService {

  githubRestApiUrl = 'https://api.github.com/repos';

  constructor(
    private apollo: Apollo
  ) {}

  getTopStarredRepositoriesLimitedTo(limit: number) {
    return this.apollo.query<any>({
      query: gql`
        {
          search(query: "is:public stars:>1600", type: REPOSITORY, first: ${limit}) {
            edges {
              node {
                ... on Repository {
                  id,
                  name,
                  nameWithOwner,
                  url,
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }
        }
      `
    });
  }
}