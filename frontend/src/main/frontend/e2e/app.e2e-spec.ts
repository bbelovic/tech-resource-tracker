import { by, element } from 'protractor';
import { DummyPage } from './app.po';

describe('dummy App', () => {
  let page: DummyPage;

  beforeEach(() => {
    page = new DummyPage();
  });

  it('should display message saying app works', (done) => {
    page.navigateTo();

    /*
    var foo = element(by.id('foo'));
    expect(foo.getText()).toEqual('Inner text');

    expect(element(by.binding('person.email')).getText()).toBe('foo@bar.com');
    

    element(by.binding('person.name')).getText().then(function(name) {
      expect(name).toBe('Foo');
    });*/

    const text = page.getParagraphText();
    expect(text).toEqual('Tech resource tracker');
    //page.getParagraphText().then(text => expect(text).toEqual('Tech resource tracker'));
    //console.log('XXX');
    // done();
  });
});
