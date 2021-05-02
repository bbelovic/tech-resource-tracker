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
    browser.wait(EC.urlContains('https://dev-775522.okta.com'), 20000, 'URL console: ' + browser.driver.getCurrentUrl().then((url) => console.log(url)) );
    browser.sleep(7000);
    browser.wait(EC.urlIs('https://dev-775522.okta.com/'), 20000, 'URL console: ' + browser.driver.getCurrentUrl().then((url) => console.log(url)) );
    //return element(by.className('error-title')).getText() as Promise<string>;
    return this.getLoginForm();
    //#okta-signin-username
  }

  loginIntoApplication(username: string, password: string) {
    element(by.className('btn-default')).click();
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains('https://dev-775522.okta.com'), 20000, '' + browser.driver.getCurrentUrl().then((url) => console.log(url)));
    browser.sleep(5000);
    browser.wait(EC.urlIs('https://dev-775522.okta.com/'), 20000, ' ' + browser.driver.getCurrentUrl().then((url) => console.log(url)));

    // password, submit
    element(by.id('okta-signin-username')).sendKeys(username);
    element(by.id('okta-signin-password')).sendKeys(password);
    element(by.id('okta-signin-submit')).click();
  }


  navigateTo(): Promise<unknown> {
    browser.waitForAngularEnabled(false);
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  private getLoginForm(): Promise<string> {
    //return element(by.className('okta-form-title')).getText() as Promise<string>;
    return element(by.id('okta-signin-username')).getTagName() as Promise<string>;
  }
}
