import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { repositoryReducer } from './state/repository/repository.reducer';
import { RepositoryEffects } from './state/repository/repository.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { RepositoryBrowserComponent } from './components/respository-browser-component/repositoryBrowser.component';

import { RepositoryService } from './core/services/repository.service';
import { GithubRepositoryTranslatorService } from './core/services/githubRepositoryTranslator.service';

@NgModule({
  declarations: [
    AppComponent,
    RepositoryBrowserComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    StoreModule.forRoot({ repositories: repositoryReducer }),
    EffectsModule.forRoot([RepositoryEffects]),
    StoreDevtoolsModule
  ],
  providers: [
    RepositoryService,
    GithubRepositoryTranslatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
