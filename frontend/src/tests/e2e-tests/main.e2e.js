const MainPage = require('./pages/main.page');

describe('Main page with form and tests list', () => {
  it('should fetch data from server', async () => {
    await MainPage.LoadData();
  });

  describe('when inputs are correct', () => {
    it('should add test to a table', async () => {
      await MainPage.LoadData();
      const prevRowsCount = await MainPage.tableRows.length;
      await MainPage.CreateRegularTest('abcd', 'ab.*');
      await MainPage.LoadData();
      const currentRowsCount = await MainPage.tableRows.length;
      await expect(currentRowsCount - prevRowsCount).toBe(1);
    });

    it('should not display any error messages', async () => {
      await MainPage.LoadData();
      await MainPage.CreateRegularTest('abcd', 'ab.*');
      await expect(MainPage.errorMessage).not.toBeExisting();
      await expect(MainPage.validationMessages).not.toBeExisting();
    });

    it('should clear input fields', async () => {
      await MainPage.LoadData();
      await MainPage.CreateRegularTest('abcd', 'ab.*');
      await expect(MainPage.inputPattern).not.toHaveTextContaining();
      await expect(MainPage.inputString).not.toHaveTextContaining();
    });
  });

  describe('when inputs are incorrect', () => {
    it('should not add test to a table', async () => {
      await MainPage.LoadData();
      const prevRowsCount = await MainPage.tableRows.length;
      await MainPage.CreateRegularTest('123', 'ab.*');
      await MainPage.LoadData();
      const currentRowsCount = await MainPage.tableRows.length;
      await expect(prevRowsCount - currentRowsCount).toBe(0);
    });

    it('should display validation message', async () => {
      await MainPage.LoadData();
      await MainPage.CreateRegularTest('123', 'ab.*');
      await expect(MainPage.validationMessages).toBeExisting();
    });
  });
});
