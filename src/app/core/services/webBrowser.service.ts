import { Injectable } from '@angular/core';

@Injectable()
export class WebBrowserService {

  constructor() {}

  openURLInNewTab(url: string) {
    window.open(url, "_blank");
  }
}