import { browser, element, by } from 'protractor';

//const { DockerComposeEnvironment } = require("testcontainers")

import { DockerComposeEnvironment } from 'testcontainers'

export class DummyPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    // by.className
    return element(by.className('navbar-brand')).getText();
  }
}
