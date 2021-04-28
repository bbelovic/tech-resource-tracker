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

  it('should be able to log into application', () => {
    page.navigateTo();
    const btnLabel = page.getSignInButton();
    expect(btnLabel).toEqual('Sign in');
  })

});
