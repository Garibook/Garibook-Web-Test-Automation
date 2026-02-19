import { faker } from "@faker-js/faker";

class AirportTripPage {
  constructor(page) {
    this.page = page;

    // Fixed: Named 'airportRentalBtn' to match your test call
    this.airportRentalBtn = page.getByRole("tab", { name: "Airport Rental" });
    this.selectCarTypeBtn = page.getByRole("button", {
      name: "Select Car Type",
    });
    this.sedanOption = page.getByRole("button", { name: "Sedan 4 Seats" });

    // Inside constructor(page)
    this.fromHomeRadio = page.getByRole("radio", { name: "From Home" });

    // Pickup (Now a textbox for Home address)
    this.pickupInputHome = page.getByRole("textbox", {
      name: "Enter Pickup Location",
    });
    this.pickupSuggestionHome = page.getByRole("button", {
      name: "Mirpur-1, Dhaka, Bangladesh",
    });

    // Drop-off Airport Locators (Fixed)
    this.airportDropdown = page
      .locator(".rs__control")
      .filter({ hasText: "Select Airport" });
    this.airportOption = page.getByRole("option", { name: "Hazrat Shahjalal" });

    this.airportInputContainer = page.locator(".rs__input-container");
    this.selectAirport = page.getByRole("option", { name: "Hazrat Shahjalal" });

    this.fromAirportToggle = page.getByText("From Airport", { exact: true });

    this.dropoffInput = page.getByRole("textbox", {
      name: "Enter Drop-off Location",
    });
    this.dropoffSuggestion = page.getByRole("button", {
      name: "Mirpur-1, Dhaka, Bangladesh",
    });

    this.dateInput = page.getByRole("textbox", { name: "MM/DD/YYYY 00:00 PM" });

    // Updated Continue Button selector to be more specific
    this.tripContinueBtn = page.getByRole("button", {
      name: "Continue button-icon",
    });
    this.confirmTripBtn = page.getByRole("button", {
      name: "Request Your Trip",
    });

    this.profileNotUpdatedPopup = page.locator(
      '.swal2-popup:has-text("Profile Not Updated")',
    );
    this.profileContinueButton = page
      .locator(".swal2-popup")
      .getByRole("button", { name: "Continue" });
    this.nameTextbox = page.getByRole("textbox", { name: "Name" });
  }

  async fillAirportTripFormAirport() {
    await this.airportRentalBtn.click();
    await this.selectCarTypeBtn.click();
    await this.sedanOption.click();

    await this.airportInputContainer.click();
    await this.selectAirport.click();

    await this.fromAirportToggle.click();

    await this.dropoffInput.click();
    await this.dropoffInput.fill("mirpur");
    await this.dropoffSuggestion.click();

    await this.dateInput.click();
    await this.page.keyboard.type("02/20/2026 10:00 AM");
    await this.page.keyboard.press("Enter");

    await this.page.waitForTimeout(1000); // Small pause for the UI to register inputs
    await this.tripContinueBtn.click();
  }

  async fillAirportTripFormHome() {
    await this.airportRentalBtn.click();
    await this.fromHomeRadio.check();
    await this.selectCarTypeBtn.click();
    await this.sedanOption.click();

    // 3. Fill Home Pickup Location
    await this.pickupInputHome.click();
    await this.pickupInputHome.fill("mirpur");
    await this.pickupSuggestionHome.click();

    await this.airportDropdown.click();
    await this.airportOption.waitFor({ state: "visible" });
    await this.airportOption.click();

    await this.dateInput.click();
    await this.page.keyboard.type("02/20/2026 10:00 AM");
    await this.page.keyboard.press("Enter");

    await this.page.waitForTimeout(1000); // Small pause for the UI to register inputs
    await this.tripContinueBtn.click();
  }

  async confirmTrip() {
    await this.confirmTripBtn.waitFor({ state: "visible", timeout: 15000 });
    await this.confirmTripBtn.click();
  }

  // async checkAndCompleteProfile() {
  //   await this.page.waitForTimeout(1500);
  //   if (await this.profileNotUpdatedPopup.isVisible()) {
  //     await this.profileContinueButton.click();
  //     await this.completeProfileDetails();
  //     // Only re-click if it's still there
  //     if (await this.confirmTripBtn.isVisible()) {
  //       await this.confirmTripBtn.click();
  //     }
  //   }
  // }

  async completeProfileDetails() {
    const randomName = faker.person.fullName();
    await this.nameTextbox.fill(randomName);
    await this.page
      .getByRole("button", { name: "Continue", exact: true })
      .click();
  }
}

export default AirportTripPage;
