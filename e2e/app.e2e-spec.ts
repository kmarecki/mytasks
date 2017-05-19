import { MytasksPage } from './app.po';

describe('mytasks App', () => {
  let page: MytasksPage;

  beforeEach(() => {
    page = new MytasksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
