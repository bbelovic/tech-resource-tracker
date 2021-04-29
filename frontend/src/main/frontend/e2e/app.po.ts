import { browser, element, by, ElementFinder } from 'protractor';

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
    browser.wait(browser.getCurrentUrl()
    .then((url) => {console.log('@@@ url='+ (url === 'https://dev-775522')); return url ==='https://dev-775522'} ), 40000);
        //browser.getCurrentUrl()
    //browser.wait()
    //#okta-signin-username

    //dev-775522.okta.com

   // https://dev-775522.okta.com/


    return element(by.id('#okta-signin-username')).getTagName() as Promise<string>;
  }



  navigateTo(): Promise<unknown> {
    browser.waitForAngularEnabled(false);
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

}
