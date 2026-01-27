class CancelTrip {
  constructor(page) {
    this.cancelTripBtn = page.getByRole("button", {
      name: "Cancel Trip",
    });
    this.cancelReasons = page
      .locator("label.single-cancel-reason", {
        hasText: "Other",
      })
      .getByText("Other", { exact: true });
    this.finalCancelBtn = page.locator("button.theme-danger-btn span", {
      hasText: "Cancel Trip",
    });
  }
  async doCancel() {
    await this.cancelTripBtn.click();
    await this.cancelReasons.click();
    await this.finalCancelBtn.waitFor({ state: "visible" });
    await this.finalCancelBtn.click();
  }
}
export default CancelTrip;
