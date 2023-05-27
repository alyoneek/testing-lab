const Page = require('./page');

class HomePage extends Page {
  get btnRedirect() {
    return $('#go-button');
  }

  async ClickRedirectButton() {
    await this.btnRedirect.click();
  }

  open() {
    return super.open('/');
  }
}

module.exports = new HomePage();
