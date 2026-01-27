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
    this.noah7SeatsBtn = page.getByRole("button", {
      name: "Noah 7 Seats",
    });

    this.hiAce11SeatsBtn = page.getByRole("button", {
      name: "HiAce 11 Seats",
    });

    this.sedanEconomy4SeatsBtn = page.getByRole("button", {
      name: "Sedan Economy 4 Seats",
    });

    this.chanderGari8SeatsBtn = page.getByRole("button", {
      name: "Chander Gari 8 Seats",
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
      name: "Bagura Mistanno Vandar, Bakshiganj, Bangladesh",
    });

    // Date & time
    this.dateInput = page.getByRole("textbox", { name: "MM/DD/YYYY 00:00 PM" });
    //Return date & time for Round way
    this.pickupDateTime = page
      .getByRole("tabpanel", { name: "Car Rental" })
      .locator('input[name="pickup_date_time"]');
    this.returnDateTime = page.locator('input[name="return_date_time"]');

    //radio button
    this.roundTripRadio = page.getByRole("radio", { name: "Round Way" });
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
      name: "Tangail Bypass, Tangail, Bangladesh",
    });

    //trip confirm
    this.confirmTripBtn = page.getByRole("button", {
      name: "Request Your Trip",
    });
    //profile not updated pop up
    this.profileNotUpdatedPopup = page.locator(
      '.swal2-popup:has-text("Profile Not Updated")',
    );
    this.ProfilecontinueButton = page
      .locator(".swal2-popup")
      .getByRole("button", { name: "Continue" });
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
    await this.dropoffInput.fill("Bagura");
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
    await this.searchStopage.fill("tangail");
    await this.stopageSelect.click();
  }
  async confirmTrip() {
    await this.confirmTripBtn.click();
  }
  async checkAndCompleteProfile() {
    if (await this.profileNotUpdatedPopup.isVisible()) {
      await this.ProfilecontinueButton.click();

      await this.profileComplete();
      await this.confirmTripBtn.click();
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
  async createRoundTrip() {
    await this.roundTripRadio.check();
  }
}

export default TripPage;
