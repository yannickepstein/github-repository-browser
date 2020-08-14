import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'githubUserUrl' })
export class GithubUserUrlPipe implements PipeTransform {

  hostUrl: URL = new URL('https://github.com');

  transform(login: string): string {
    return new URL(login, this.hostUrl).href;
  }
}
