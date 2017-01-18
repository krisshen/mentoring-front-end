import { MentoringFrontendPage } from './app.po';

describe('mentoring-frontend App', function() {
  let page: MentoringFrontendPage;

  beforeEach(() => {
    page = new MentoringFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
