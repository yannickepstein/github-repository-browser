import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RepositoryEffects } from './state/repository/repository.effects';
import { ContributionEffects } from './state/contribution/contribution.effects';
import { reducers } from './state/index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { RepositoryBrowserComponent } from './components/respository-browser-component/repositoryBrowser.component';
import { RepositoryDetailsComponent } from './components/repository-details-component/repositoryDetails.component';
import { RepositoryContributorComponent } from './components/repository-contributor-component/repositoryContributor.component';
import { RepositoryCardComponent } from './components/repository-card-component/repositoryCard.component';
import { RepositorySearchComponent } from './components/repository-search-component/repositorySearch.component';
import { RepostioryDetailsNavbarComponent } from './components/repository-details-navbar-component/repositoryDetailsNavbar.component';
import { LoadingIndicatorComponent } from './components/loading-indicator-component/loadingIndicator.component';

import { GithubUserUrlPipe } from './core/pipes/githubUserUrl.pipe';
import { RepositoryFilterPipe } from './core/pipes/repositoryFilter.pipe';

import { RepositoryService } from './core/services/repository.service';
import { RepositoryContributionsService } from './core/services/repositoryContributions.service';
import { GithubRepositoryTranslatorService } from './core/services/githubRepositoryTranslator.service';
import { GithubUserContributionTranslatorService } from './core/services/githubUserContributionTranslator.service';
import { WebBrowserService } from './core/services/webBrowser.service';

@NgModule({
  declarations: [
    AppComponent,
    RepositoryBrowserComponent,
    RepositoryDetailsComponent,
    RepositoryContributorComponent,
    RepositoryCardComponent,
    RepositorySearchComponent,
    RepostioryDetailsNavbarComponent,
    LoadingIndicatorComponent,
    GithubUserUrlPipe,
    RepositoryFilterPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([RepositoryEffects, ContributionEffects]),
    StoreDevtoolsModule
  ],
  providers: [
    RepositoryService,
    RepositoryContributionsService,
    GithubRepositoryTranslatorService,
    GithubUserContributionTranslatorService,
    GithubUserUrlPipe,
    WebBrowserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
