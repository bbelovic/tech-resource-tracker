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

});
