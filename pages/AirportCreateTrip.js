import { faker } from "@faker-js/faker";

class AirportTripPage {
  constructor(page) {
    this.page = page;
     
    // Fixed: Named 'airportRentalBtn' to match your test call
    this.airportRentalBtn = page.getByRole("tab", { name: "Airport Rental" });
    this.selectCarTypeBtn = page.getByRole("button", { name: "Select Car Type" });
    this.sedanOption = page.getByRole("button", { name: "Sedan 4 Seats" });

    this.airportInputContainer = page.locator('.rs__input-container');
    this.selectAirport = page.getByRole("option", { name: "Hazrat Shahjalal" });

    this.fromAirportToggle = page.getByText('From Airport', { exact: true });

    this.dropoffInput = page.getByRole("textbox", { name: "Enter Drop-off Location" });
    this.dropoffSuggestion = page.getByRole("button", { name: "Mirpur-1, Dhaka, Bangladesh" });

    this.dateInput = page.getByRole("textbox", { name: "MM/DD/YYYY 00:00 PM" });
    
    // Updated Continue Button selector to be more specific
    this.tripContinueBtn = page.getByRole("button", { name: "Continue button-icon" });
    this.confirmTripBtn = page.getByRole("button", { name: "Request Your Trip" });
    
    this.profileNotUpdatedPopup = page.locator('.swal2-popup:has-text("Profile Not Updated")');
    this.profileContinueButton = page.locator(".swal2-popup").getByRole("button", { name: "Continue" });
    this.nameTextbox = page.getByRole("textbox", { name: "Name" });
  }

  async fillAirportTripForm() {
    await this.airportRentalBtn.click();
    await this.selectCarTypeBtn.click();
    await this.sedanOption.click();

    await this.airportInputContainer.click();
    await this.selectAirport.click();

    await this.fromAirportToggle.click();

    await this.dropoffInput.click();
    await this.dropoffInput.fill("mirpur");
    await this.dropoffSuggestion.click();

    // --- Robust Date Handling ---
    await this.dateInput.click();
    // Instead of just filling, we click a date to ensure the calendar triggers
    // This selects "Today" or the first available date if fill is blocked
    await this.page.keyboard.type("02/20/2026 10:00 AM");
    await this.page.keyboard.press("Enter");
    
    await this.page.waitForTimeout(1000); // Small pause for the UI to register inputs
    await this.tripContinueBtn.click();
  }
  
  async confirmTrip() {
    // Wait up to 15 seconds as calculations/pricing might take a moment
    await this.confirmTripBtn.waitFor({ state: 'visible', timeout: 15000 });
    await this.confirmTripBtn.click();
  }

  async checkAndCompleteProfile() {
    await this.page.waitForTimeout(1500); 
    if (await this.profileNotUpdatedPopup.isVisible()) {
      await this.profileContinueButton.click();
      await this.completeProfileDetails();
      // Only re-click if it's still there
      if(await this.confirmTripBtn.isVisible()) {
          await this.confirmTripBtn.click();
      }
    }
  }

  async completeProfileDetails() {
    const randomName = faker.person.fullName();
    await this.nameTextbox.fill(randomName);
    await this.page.getByRole("button", { name: "Continue", exact: true }).click();
  }
}

export default AirportTripPage;