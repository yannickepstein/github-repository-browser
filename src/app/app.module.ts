import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { spinnerReducer } from './state/spinner/spinner.reducer';

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
    StoreModule.forRoot({ spinner: spinnerReducer })
  ],
  providers: [
    RepositoryService,
    GithubRepositoryTranslatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
