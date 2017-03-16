import { CapstoneProjectPage } from './app.po';

describe('capstone-project App', () => {
  let page: CapstoneProjectPage;

  beforeEach(() => {
    page = new CapstoneProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
