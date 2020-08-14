import { GithubRepositoryTranslatorService } from './githubRepositoryTranslator.service';
import { GithubRepository } from 'src/app/model/githubRepository';

describe('GithubRepositoryTranslatorService', () => {
  let githubRepositoryTranslatorService: GithubRepositoryTranslatorService;

  beforeEach(() => {
    githubRepositoryTranslatorService = new GithubRepositoryTranslatorService();
  })

  it('Translates a single repository node into a GithubRepository object', () => {
    const repositoryNode = {
      "id": "MDEwOlJlcG9zaXRvcnkxMzI0NjQzOTU=",
      "name": "JavaGuide",
      "nameWithOwner": "user/JavaGuide"
    };

    const translatedRepository = githubRepositoryTranslatorService.translateRepositoryNode(repositoryNode);
    const expectedGithubRepository = new GithubRepository("MDEwOlJlcG9zaXRvcnkxMzI0NjQzOTU=", "JavaGuide", "user/JavaGuide", '');

    expect(translatedRepository).toEqual(expectedGithubRepository);
  });

  it('Translates a edge to a repository node into a GithubRepository', () => {
    const repositoryEdge = {
      "node": {
        "id": "MDEwOlJlcG9zaXRvcnkxMzI0NjQzOTU=",
        "name": "JavaGuide",
        "nameWithOwner": "user/JavaGuide"
      }
    };

    const translatedRepository = githubRepositoryTranslatorService.translateRepositoryEdge(repositoryEdge);
    const expectedGithubRepository = new GithubRepository("MDEwOlJlcG9zaXRvcnkxMzI0NjQzOTU=", "JavaGuide", "user/JavaGuide", '');

    expect(translatedRepository).toEqual(expectedGithubRepository);
  });

  it('Translates a list of edges to repository nodes into a list of GithubRepositories', () => {
    const repositoryEdges = [
      {
        "node": {
          "id": "MDEwOlJlcG9zaXRvcnkxMzI0NjQzOTU=",
          "name": "JavaGuide",
          "nameWithOwner": "user/JavaGuide",
          "url": "projectUrl1"
        }
      },
      {
        "node": {
          "id": "MDEwOlJlcG9zaXRvcnk1MTExNzgzNw==",
          "name": "models",
          "nameWithOwner": "user/models",
          "url": "projectUrl2"
        }
      }
    ];

    const translatedRepositories = githubRepositoryTranslatorService.translateRepositoryEdges(repositoryEdges);
    const expectedGithubRepositories = [
      new GithubRepository("MDEwOlJlcG9zaXRvcnkxMzI0NjQzOTU=", "JavaGuide", "user/JavaGuide", 'projectUrl2'),
      new GithubRepository("MDEwOlJlcG9zaXRvcnk1MTExNzgzNw==", "models", "user/models", 'projectUrl1')
    ];

    expect(translatedRepositories).toEqual(expectedGithubRepositories);
  })
});