import { faker } from "@faker-js/faker";

class TripPage {
  constructor(page) {
    this.page = page;

    // Car select
    this.selectCarTypeBtn = page.getByRole("button", {
      name: "Select Car Type",
    });
    this.sedanPremiumBtn = page.getByRole("button", {
      name: "Sedan Premium 4 Seats",
    });

    // Pickup
    this.pickupInput = page.getByRole("textbox", {
      name: "Enter Pickup Location",
    });
    this.pickupSuggestion = page.getByRole("button", {
      name: "NIKETON , GULSHAN, Road",
    });

    // Drop-off
    this.dropoffInput = page.getByRole("textbox", {
      name: "Enter Drop-off Location",
    });
    this.dropoffSuggestion = page.getByRole("button", {
      name: "Khulna University, Sher-E-",
    });

    // Date & time
    this.dateInput = page.getByRole("textbox", { name: "MM/DD/YYYY 00:00 PM" });
    // this.dateOption = page.getByRole("option", {
    //   name: "Choose Friday, January 30th,",
    // });
    // this.timeOption = page.getByRole("option", { name: "10:00 AM" });

    // Continue button
    this.TripcontinueBtn = page.getByRole("button", {
      name: "Continue button-icon",
    });

    //Add stopage
    this.stopageBtn = page.getByRole("button", { name: "Add Stops" });
    this.stopageLoc = page.getByRole("textbox", {
      name: "Enter Stoppage Location",
    });
    this.searchStopage = page.getByRole("textbox", {
      name: "Enter Stoppage Location",
    });
    this.stopageSelect = page.getByRole("button", {
      name: "Mawa Ghat Fish Market,",
    });

    //trip confirm
    this.confirmTripBtn = page.getByRole("button", {
      name: "Request Your Trip",
    });
    //profile not updated pop up
    this.profileNotUpdatedPopup = page.locator(
      '.swal2-popup:has-text("Profile Not Updated")',
    );
    // profile complete locators
    this.ProfilecontinueButton = page.getByRole("button", { name: "Continue" });
    this.nameTextbox = page.getByRole("textbox", { name: "Name" });
  }

  async createTrip() {
    // Select car type
    await this.selectCarTypeBtn.click();
    await this.sedanPremiumBtn.click();

    // Pickup location
    await this.pickupInput.click();
    await this.pickupInput.fill("niketon");
    await this.pickupSuggestion.click();

    // Drop-off location
    await this.dropoffInput.click();
    await this.dropoffInput.fill("khulna");
    await this.dropoffSuggestion.click();

    // Date & time
    await this.dateInput.click();
    await this.dateInput.fill("2026-02-03 09:00 AM");
    await this.dateInput.press("Enter");
    await this.page.waitForTimeout(2000);

    // Continue
    await this.TripcontinueBtn.click();
  }
  async addStopage() {
    await this.stopageBtn.click();
    await this.stopageLoc.click();
    await this.searchStopage.fill("Mawa ghat");
    await this.stopageSelect.click();
  }
  async confirmTrip() {
    await this.confirmTripBtn.click();
  }
  async checkAndCompleteProfile() {
    if (await this.profileNotUpdatedPopup.isVisible()) {
      await this.ProfilecontinueButton.click();

      await this.profileComplete();
    }
  }
  async profileComplete() {
    // Fill Name
    const name = faker.person.fullName();
    await this.nameTextbox.click();
    await this.nameTextbox.fill(name);

    // Final Continue
    await this.page
      .getByRole("button", { name: "Continue", exact: true })
      .click();
  }
}

export default TripPage;
