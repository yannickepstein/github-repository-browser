import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

import { RepositoryService } from './core/services/repository.service';
import { RepositoryContributionsService } from './core/services/repositoryContributions.service';
import { GithubRepositoryTranslatorService } from './core/services/githubRepositoryTranslator.service';
import { GithubUserTranslatorService } from './core/services/githubUserTranslator.service';

@NgModule({
  declarations: [
    AppComponent,
    RepositoryBrowserComponent,
    RepositoryDetailsComponent,
    RepositoryContributorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
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
    GithubUserTranslatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
