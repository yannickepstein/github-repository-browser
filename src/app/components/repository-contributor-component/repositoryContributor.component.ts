import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GithubUserUrlPipe } from 'src/app/core/pipes/githubUserUrl.pipe';
import { WebBrowserService } from 'src/app/core/services/webBrowser.service';

import { GithubUser } from '../../model/githubUser';
import * as UserSelectors from '../../state/user/user.selectors';

@Component({
  selector: "repository-contributor",
  templateUrl: "./repositoryContributor.component.html"
})
export class RepositoryContributorComponent implements OnInit {

  @Input() contributingUserId: string;
  @Input() numberOfContributions: number;

  contributingUser$: Observable<GithubUser>;

  constructor(private store: Store<any>,
              private githubUserUrlPipe: GithubUserUrlPipe,
              private webBrowserService: WebBrowserService) {}

  ngOnInit() {
    this.contributingUser$ = this.store.pipe(
      select(UserSelectors.selectUserById, { id: this.contributingUserId })
    );
  }

  openProfileInNewTab(login: string) {
    const profileURL = this.getProfileURL(login);
    this.webBrowserService.openURLInNewTab(profileURL);
  }

  getProfileURL(login: string) {
    return this.githubUserUrlPipe.transform(login);
  }
}