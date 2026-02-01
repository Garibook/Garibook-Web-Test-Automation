class Profile {
  constructor(page) {
    this.page = page;
    this.imageUploadInput = page.getByRole("button").filter({ hasText: /^$/ });
    this.fileInput = page.locator('input[type="file"]');
    this.modalOkBtn = page.getByRole("button", { name: "OK" });
    this.nameInput = page.getByRole("textbox", { name: "Full Name" });
    this.dateofBirthInput = page.getByPlaceholder("YYYY-MM-DD");
    this.emailInput = page.getByRole("textbox", { name: "Type your mail" });
    this.genderRadioMale = page.getByRole("radio", {
      name: "Male",
      exact: true,
    });
    this.updateBtn = page.getByRole("button", { name: "Update" });
  }

  async uploadProfileImage(image) {
    await this.imageUploadInput.click();
    //await this.fileInput.imageUploadInput.setInputFiles(image);
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.waitFor({ state: "attached" });

    await fileInput.setInputFiles(image);
    await this.modalOkBtn.click();
  }
  async updateProfileDetails(name, dob, email) {
    await this.nameInput.fill(name);
    await this.dateofBirthInput.fill(dob);
    await this.emailInput.fill(email);
    await this.genderRadioMale.check();
    await this.updateBtn.click();
  }
}
export default Profile;
