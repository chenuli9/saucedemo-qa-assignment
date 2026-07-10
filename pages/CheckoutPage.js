export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.finishBtn = page.locator('[data-test="finish"]');
    this.itemNames = page.locator('.inventory_item_name');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.confirmationHeader = page.locator('[data-test="complete-header"]');
  }

  async fillInfo(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueBtn.click();
  }

  async finish() {
    await this.finishBtn.click();
  }
}