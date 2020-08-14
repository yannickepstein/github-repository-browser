import { Injectable } from '@angular/core';

import { GithubRepository } from '../../model/githubRepository';

@Injectable()
export class GithubRepositoryTranslatorService {

  translateRepositoryEdges(edges: any): GithubRepository[] {
    return edges.map(edge => this.translateRepositoryEdge(edge));
  }

  translateRepositoryEdge(edge: any): GithubRepository {
    return this.translateRepositoryNode(edge.node);
  }

  translateRepositoryNode(node: any): GithubRepository {
    return new GithubRepository(node.id, node.name, node.nameWithOwner, node.url);
  }
}