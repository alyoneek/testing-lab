const Page = require('./page');

class MainPage extends Page {
  get inputString() {
    return $('#string');
  }

  get inputPattern() {
    return $('#pattern');
  }

  get btnSubmit() {
    return $('button[type="submit"]');
  }

  get table() {
    return $('table');
  }

  get tableRows() {
    return $$('.test-row');
  }

  get errorMessage() {
    return $('#error-message');
  }

  get validationMessages() {
    return $$('.invalid-feedback');
  }

  get loadingMessage() {
    return $('#loading-message');
  }

  async LoadData() {
    try {
      await this.open();
      await this.loadingMessage.waitForDisplayed({ timeout: 5000 });
      await this.table.waitForDisplayed({ timeout: 5000 });
    } catch (e) {
      throw new Error(e);
    }
  }

  async CreateRegularTest(string, pattern) {
    await this.inputString.setValue(string);
    await this.inputPattern.setValue(pattern);
    await this.btnSubmit.click();
  }

  open() {
    return super.open('/main');
  }
}

module.exports = new MainPage();
