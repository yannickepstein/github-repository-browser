import { Pipe, PipeTransform } from '@angular/core';
import { UrlHandlingStrategy } from '@angular/router';

@Pipe({ name: 'githubUserUrl' })
export class GithubUserUrlPipe implements PipeTransform {

  transform(username: string): string {
    const hostUrl = new URL('https://github.com');
    return new URL(username, hostUrl).href;
  }
}
