import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

const uri = 'https://api.github.com/graphql';
const token = '';

const authTokenMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
  });
  return forward(operation);
});

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpLinkModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: authTokenMiddleware.concat(httpLink.create({uri}))
      }
    },
    deps: [HttpLink]
  }],
})
export class GraphQLModule {}
