import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../core/services/repository.service';

@Component({
  selector: "repository-browser",
  templateUrl: "./repositoryBrowser.component.html"
})
export class RepositoryBrowserComponent implements OnInit {
  repositories: any[];
  loading = true;
  error: any;

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit() {
    this.repositoryService.getFirstRepositoriesLimitedTo(20).subscribe( ({ data, loading }) => {
      this.repositories = data && data.search.edges;
      this.loading = loading;
    }, error => {
      this.loading = false;
      this.error = error;
    });
  }
}