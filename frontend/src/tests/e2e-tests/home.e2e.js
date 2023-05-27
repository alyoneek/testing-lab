const HomePage = require('./pages/home.page');

describe('Home page', () => {
  it('when click button should redirect to main page', async () => {
    await HomePage.open();
    await HomePage.ClickRedirectButton();
    const pageUrl = await browser.getUrl();
    await expect(pageUrl.indexOf('main')).toBeGreaterThan(-1);
  });
});
