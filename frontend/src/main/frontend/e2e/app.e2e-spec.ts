import { DummyPage } from './app.po';

describe('dummy App', () => {
  let page: DummyPage;
  
  beforeEach(() => {
    page = new DummyPage();
  });


  it('should display message saying app works',() => {
     page.navigateTo();

    const text = page.getParagraphText();
    expect(text).toEqual('Tech resource tracker');
  });

  it('should log into application and then logout', () => {
    const username = process.env.OKTA_TEST_USERNAME;
    const passwd = process.env.OKTA_TEST_PASSWORD;
    page.loginIntoApplication(username, passwd);
    const logoutBtnText = page.getLogoutButtonText();
    expect(logoutBtnText).toEqual('Logout');
    page.logoutFromApplication();
    const loginBtnText = page.getLoginButtonText();
    expect(loginBtnText).toEqual('Sign in');
  })
});
