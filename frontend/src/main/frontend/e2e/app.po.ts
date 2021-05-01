import { browser, element, by, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';

//const { DockerComposeEnvironment } = require("testcontainers")

import { DockerComposeEnvironment } from 'testcontainers'

export class DummyPage {

  getParagraphText(): Promise<string> {    
    return element(by.className('navbar-brand')).getText() as Promise<string>;
  }

  getSignInButton(): Promise<string> {
    return element(by.className('btn-default')).getText() as Promise<string>;

  }

  clickSignInButton(): Promise<string>  {
    element(by.className('btn-default')).click();
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains('https://dev-775522.okta.com'), 20000);
    return element(by.className('error-title')).getText() as Promise<string>;
  }



  navigateTo(): Promise<unknown> {
    browser.waitForAngularEnabled(false);
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

}
