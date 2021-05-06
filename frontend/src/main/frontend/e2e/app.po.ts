import { browser, element, by, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class DummyPage {

  getParagraphText(): Promise<string> {    
    return element(by.className('navbar-brand')).getText() as Promise<string>;
  }

  getLoginButtonText(): Promise<string> {
    return element(by.className('btn-default')).getText() as Promise<string>;
  }

  clickSignInButton(): Promise<string>  {
    element(by.className('btn-default')).click();
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains('https://dev-775522.okta.com'), 20000, 'URL console: ' + browser.driver.getCurrentUrl().then((url) => console.log(url)) );
    browser.sleep(7000);
    browser.wait(EC.urlIs('https://dev-775522.okta.com/'), 20000, 'URL console: ' + browser.driver.getCurrentUrl().then((url) => console.log(url)) );
    return this.getLoginForm();
  }

  loginIntoApplication(username: string, password: string) {
    element(by.className('btn-default')).click();
    const EC = protractor.ExpectedConditions;
   // browser.wait(EC.urlContains('https://dev-775522.okta.com'), 20000, '' + browser.driver.getCurrentUrl().then((url) => console.log(url)));
   // browser.sleep(5000);
    browser.wait(EC.urlIs('https://dev-775522.okta.com/'), 20000, ' ' + browser.driver.getCurrentUrl().then((url) => console.log(url)));

    element(by.id('okta-signin-username')).sendKeys(username);
    element(by.id('okta-signin-password')).sendKeys(password);
    element(by.id('okta-signin-submit')).click();
   // browser.sleep(3000);
    browser.wait(EC.urlIs('http://tech-resource-tracker-be:8080/'), 20000, ' ' + browser.driver.getCurrentUrl().then((url) => console.log(url)));
  }

  getLogoutButtonText(): Promise<string> {
    return element(by.className('btn-default')).getText() as Promise<string>
  }

  logoutFromApplication() {
    //browser.getCurrentUrl().then((url) => console.log(`Current url: ${url}`));
    //console.log(`Logout button: ${element(by.className('btn-default')).getText()}`);
    element(by.className('btn-default')).click();
    //browser.sleep(5000);
    //browser.getCurrentUrl().then((url) => console.log(`Current url: ${url}`));
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlIs('http://tech-resource-tracker-be:8080/'), 20000, ' ' + browser.driver.getCurrentUrl().then((url) => console.log(url)));
  }

  navigateTo(): Promise<unknown> {
    browser.waitForAngularEnabled(false);
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  private getLoginForm(): Promise<string> {
    return element(by.id('okta-signin-username')).getTagName() as Promise<string>;
  }
}
