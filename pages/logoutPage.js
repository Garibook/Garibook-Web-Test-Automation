class Logout {
  constructor(page) {
    this.page = page;
    //Logout selectors
    this.profileDropdown = page.locator("#dropdown-basic");
    this.logoutBtn = page.getByRole("link", { name: "Logout" });
  }

  async performLogout() {
    await this.profileDropdown.click();
    await this.logoutBtn.click();
  }
}
export default Logout;
