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

  })

  /*
  it('should return 400 Bad request when clicked sign in button', () => {
    page.navigateTo();
    const result = page.clickSignInButton();
    expect(result).toEqual('Sign In');
  })
  */

});
