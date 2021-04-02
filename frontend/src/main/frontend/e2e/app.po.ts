import { browser, element, by } from 'protractor';

//const { DockerComposeEnvironment } = require("testcontainers")

import { DockerComposeEnvironment } from 'testcontainers'

export class DummyPage {
  navigateTo() {
    //browser.waitForAngularEnabled(false);
    return browser.get('/');
  }

  getParagraphText() {    
    return element(by.className('navbar-brand')).getText();
  }
}
