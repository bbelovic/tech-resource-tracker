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
    page.loginIntoApplication('hideo.k@seznam.cz', 'Bb85sa!@');
    const logoutBtnText = page.getLogoutButtonText();
    expect(logoutBtnText).toEqual('Logout');
    page.logoutFromApplication();
    const loginBtnText = page.getLoginButtonText();
    expect(loginBtnText).toEqual('Sign in');
  })
});
