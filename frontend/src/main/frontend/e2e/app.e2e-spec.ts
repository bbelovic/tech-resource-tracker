import { DummyPage } from './app.po';

describe('dummy App', () => {
  let page: DummyPage;

  beforeEach(() => {
    page = new DummyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    console.log('before');
    page.getParagraphText().then(text => expect(text).toEqual('Tech resource tracker'));
    //console.log('XXX');
  });
});
