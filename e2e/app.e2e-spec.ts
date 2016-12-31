import { ANDlinkedPage } from './app.po';

describe('andlinked App', function() {
  let page: ANDlinkedPage;

  beforeEach(() => {
    page = new ANDlinkedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
