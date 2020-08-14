export interface IGithubUserContributionResponse {
  login: string;
  id: string;
  avatar_url: string;
  url: string;
  contributions: number;
}

export interface GithubContribution {
  id: string;
  repositoryId: string;
  userId: string;
  number: number;
}