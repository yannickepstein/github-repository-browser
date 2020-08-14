import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class RepositoryService {

  githubRestApiUrl = 'https://api.github.com/repos';

  constructor(
    private apollo: Apollo
  ) {}

  getFirstRepositoriesLimitedTo(limit: number) {
    return this.apollo.query<any>({
      query: gql`
        {
          search(query: "is:public", type: REPOSITORY, first: ${limit}) {
            edges {
              node {
                ... on Repository {
                  id,
                  name,
                  nameWithOwner,
                  url
                }
              }
            }
          }
        }
      `
    });
  }
}