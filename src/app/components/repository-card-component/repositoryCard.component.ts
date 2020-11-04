import { Component, Input } from '@angular/core';
import { WebBrowserService } from 'src/app/core/services/webBrowser.service';

import { GithubRepository } from '../../model/githubRepository';

@Component({
  selector: "repository-card",
  templateUrl: "./repositoryCard.component.html"
})
export class RepositoryCardComponent {

  @Input() repository: GithubRepository;

  constructor(private webBrowserService: WebBrowserService) {}

  openRepositoryInNewTab(repositoryURL: string) {
    this.webBrowserService.openURLInNewTab(repositoryURL);
  }
}