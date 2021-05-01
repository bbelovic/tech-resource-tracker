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

  it('should return 400 Bad request when clicked sign in button', () => {
    page.navigateTo();
    const result = page.clickSignInButton();
    expect(result).toEqual('BAD REQUEST');
  })

});
