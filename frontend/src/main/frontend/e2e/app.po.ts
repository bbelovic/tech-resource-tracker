import { browser, element, by } from 'protractor';

//const { DockerComposeEnvironment } = require("testcontainers")

import { DockerComposeEnvironment } from 'testcontainers'

export class DummyPage {

  getParagraphText(): Promise<string>{    
    return element(by.className('navbar-brand')).getText() as Promise<string>;
  }

  navigateTo(): Promise<unknown> {
    browser.waitForAngularEnabled(false);
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

}
