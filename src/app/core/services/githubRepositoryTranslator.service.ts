import { Injectable } from '@angular/core';

import { GithubRepository } from '../../model/githubRepository';

@Injectable()
export class GithubRepositoryTranslatorService {

  translateToGithubRepositories(edges: any): GithubRepository[] {
    return edges.map(edge => this.translateEdgeToGithubRepository(edge));
  }

  translateEdgeToGithubRepository(edge: any): GithubRepository {
    return this.translateNodeToGithubRepository(edge.node);
  }

  translateNodeToGithubRepository(node: any): GithubRepository {
    return new GithubRepository(node.id, node.name, node.nameWithOwner, node.url, node.stargazers.totalCount);
  }
}