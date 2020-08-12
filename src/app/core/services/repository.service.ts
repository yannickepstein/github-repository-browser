import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { GithubRepositoryTranslatorService } from './githubRepositoryTranslator.service';

@Injectable()
export class RepositoryService {

  constructor(private apollo: Apollo,
              private repositoryTranslatorService: GithubRepositoryTranslatorService) {}

  getFirstRepositoriesLimitedTo(limit: number) {
    return this.apollo.query<any>({
      query: gql`
        {
          search(query: "is:public", type: REPOSITORY, first: ${limit}) {
            edges {
              node {
                ... on Repository {
                  id,
                  name
                }
              }
            }
          }
        }
      `
    })
    .pipe(
      map(({data}) => this.repositoryTranslatorService.translateRepositoryEdges(data.search.edges))
    );
  }
}