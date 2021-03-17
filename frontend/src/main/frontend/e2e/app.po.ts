import { browser, element, by } from 'protractor';

//const { DockerComposeEnvironment } = require("testcontainers")

import { DockerComposeEnvironment } from 'testcontainers'

export class DummyPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
