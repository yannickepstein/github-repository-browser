import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepositoryBrowserComponent } from './components/respository-browser-component/repositoryBrowser.component';

const routes: Routes = [
  { path: '', component: RepositoryBrowserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
