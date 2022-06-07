import { browser, element, by, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class DummyPage {

  getParagraphText(): Promise<string> {    
    return element(by.className('navbar-brand')).getText() as Promise<string>;
  }

  getLoginButtonText(): Promise<string> {
    return element(by.className('btn-default')).getText() as Promise<string>;
  }

  async clickSignInButton(): Promise<string>  {
    element(by.className('btn-default')).click();
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains('https://dev-775522.okta.com'), 20000, 'URL console: ' + browser.driver.getCurrentUrl().then((url) => console.log(url)) );
    browser.sleep(7000);
    browser.wait(EC.urlIs('https://dev-775522.okta.com/'), 20000, 'URL console: ' + browser.driver.getCurrentUrl().then((url) => console.log(url)) );
    return this.getLoginForm();
  }

  async loginIntoApplication(username: string, password: string) {
    element(by.className('btn-default')).click();
    const EC = protractor.ExpectedConditions;
    await browser.wait(EC.urlIs('https://dev-775522.okta.com/'), 20000, ' ' + browser.driver.getCurrentUrl().then((url) => console.log(url)));

    element(by.id('okta-signin-username')).sendKeys(username);
    element(by.id('okta-signin-password')).sendKeys(password);
    element(by.id('okta-signin-submit')).click();
    await browser.wait(EC.urlIs('http://tech-resource-tracker-be:8080/'), 20000, ' ' + browser.driver.getCurrentUrl().then((url) => console.log(url)));
  }

  async getLogoutButtonText(): Promise<string> {
    return element(by.id('btn-logout')).getText() as Promise<string>
  }

  async getResourcesText(): Promise<string> {
    console.log('Looking for h4');
    return element(by.tagName('h4')).getText() as Promise<string>
  }

  async logoutFromApplication() {
    console.log('logout from app');
    element(by.className('btn-default')).click();
    const EC = protractor.ExpectedConditions;
    await browser.wait(EC.urlIs('http://tech-resource-tracker-be:8080/'), 20000, ' ' + browser.driver.getCurrentUrl().then((url) => console.log(url)));
  }

  async navigateTo(): Promise<unknown> {
    browser.waitForAngularEnabled(false);
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  private async getLoginForm(): Promise<string> {
    return element(by.id('okta-signin-username')).getTagName() as Promise<string>;
  }
}
