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
      "nameWithOwner": "user/JavaGuide",
      "url": "url",
      "stargazers": {
        "totalCount": 1000
      }
    };

    const translatedRepository = githubRepositoryTranslatorService.translateRepositoryNode(repositoryNode);
    const expectedGithubRepository = new GithubRepository("MDEwOlJlcG9zaXRvcnkxMzI0NjQzOTU=", "JavaGuide", "user/JavaGuide", "url", 1000);

    expect(translatedRepository).toEqual(expectedGithubRepository);
  });

  it('Translates a edge to a repository node into a GithubRepository', () => {
    const repositoryEdge = {
      "node": {
        "id": "MDEwOlJlcG9zaXRvcnkxMzI0NjQzOTU=",
        "name": "JavaGuide",
        "nameWithOwner": "user/JavaGuide",
        "url": "url",
        "stargazers": {
          "totalCount": 1000
        }
      }
    };

    const translatedRepository = githubRepositoryTranslatorService.translateRepositoryEdge(repositoryEdge);
    const expectedGithubRepository = new GithubRepository("MDEwOlJlcG9zaXRvcnkxMzI0NjQzOTU=", "JavaGuide", "user/JavaGuide", "url", 1000);

    expect(translatedRepository).toEqual(expectedGithubRepository);
  });

  it('Translates a list of edges to repository nodes into a list of GithubRepositories', () => {
    const repositoryEdges = [
      {
        "node": {
          "id": "MDEwOlJlcG9zaXRvcnkxMzI0NjQzOTU=",
          "name": "JavaGuide",
          "nameWithOwner": "user/JavaGuide",
          "url": "projectUrl1",
          "stargazers": {
            "totalCount": 1000
          }
        }
      },
      {
        "node": {
          "id": "MDEwOlJlcG9zaXRvcnk1MTExNzgzNw==",
          "name": "models",
          "nameWithOwner": "user/models",
          "url": "projectUrl2",
          "stargazers": {
            "totalCount": 5000
          }
        }
      }
    ];

    const translatedRepositories = githubRepositoryTranslatorService.translateRepositoryEdges(repositoryEdges);
    const expectedGithubRepositories = [
      new GithubRepository("MDEwOlJlcG9zaXRvcnkxMzI0NjQzOTU=", "JavaGuide", "user/JavaGuide", 'projectUrl1', 1000),
      new GithubRepository("MDEwOlJlcG9zaXRvcnk1MTExNzgzNw==", "models", "user/models", 'projectUrl2', 5000)
    ];

    expect(translatedRepositories).toEqual(expectedGithubRepositories);
  })
});