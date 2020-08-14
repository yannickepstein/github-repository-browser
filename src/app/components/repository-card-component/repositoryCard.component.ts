import { Component, Input } from '@angular/core';

import { GithubRepository } from '../../model/githubRepository';

@Component({
  selector: "repository-card",
  templateUrl: "./repositoryCard.component.html"
})
export class RepositoryCardComponent {

  @Input() repository: GithubRepository;
}