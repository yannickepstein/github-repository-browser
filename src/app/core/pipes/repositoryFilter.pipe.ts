import { Pipe, PipeTransform } from '@angular/core';

import { GithubRepository } from 'src/app/model/githubRepository';

@Pipe({ name: 'repositoryFilter' })
export class RepositoryFilterPipe implements PipeTransform {
  transform(repositories: GithubRepository[], searchTerm: string): GithubRepository[] {
    console.log('Filter pipe activated');
    if (!repositories) {
      return [];
    }

    if (!searchTerm) {
      return repositories;
    }

    return repositories.filter(repository => repository.name.includes(searchTerm));
  }
}