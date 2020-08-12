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
    this.repositoryService.getFirstRepositoriesLimitedTo(20).subscribe(repositories => {
      this.repositories = repositories;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.error = error;
    });
  }
}