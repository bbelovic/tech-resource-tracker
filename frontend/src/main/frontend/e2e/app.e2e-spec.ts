import { DummyPage } from './app.po';

describe('dummy App', () => {
  let page: DummyPage;
  
  beforeEach(() => {
    page = new DummyPage();
  });


  it('should display message saying app works', async () => {
     page.navigateTo();

    const text = await page.getParagraphText();
    expect(text).toEqual('Tech resource tracker');
  });

  it('should log into application and then logout', async () => {
    const username = process.env.OKTA_TEST_USERNAME;
    const passwd = process.env.OKTA_TEST_PASSWORD;
    await page.loginIntoApplication(username, passwd);
    //const logoutBtnText = await page.getLogoutButtonText();
    const resText = await page.getResourcesText();
    expect(resText).toContain('Showing');
    //expect(logoutBtnText).toEqual('Logout');
    await page.logoutFromApplication();
    const loginBtnText = await page.getLoginButtonText();
    expect(loginBtnText).toEqual('Sign in');
  })
});
