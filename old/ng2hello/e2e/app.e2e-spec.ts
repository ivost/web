import { Ng2helloPage } from './app.po';

describe('ng2hello App', function() {
  let page: Ng2helloPage;

  beforeEach(() => {
    page = new Ng2helloPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
