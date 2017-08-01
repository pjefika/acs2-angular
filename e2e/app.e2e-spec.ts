import { Acs2AngularPage } from './app.po';

describe('acs2-angular App', () => {
  let page: Acs2AngularPage;

  beforeEach(() => {
    page = new Acs2AngularPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
