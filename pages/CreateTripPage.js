class TripPage {
  constructor(page) {
    this.page = page;

    // Car select
    this.selectCarTypeBtn = page.getByRole('button', { name: 'Select Car Type' });
    this.sedanPremiumBtn = page.getByRole('button', { name: 'Sedan Premium 4 Seats' });

    // Pickup
    this.pickupInput = page.getByRole('textbox', { name: 'Enter Pickup Location' });
    this.pickupSuggestion = page.getByRole('button', { name: 'NIKETON , GULSHAN, Road' });

    // Drop-off
    this.dropoffInput = page.getByRole('textbox', { name: 'Enter Drop-off Location' });
    this.dropoffSuggestion = page.getByRole('button', { name: 'Khulna University, Sher-E-' });

    // Date & time
    this.dateInput = page.getByRole('textbox', { name: 'MM/DD/YYYY 00:00 PM' });
    this.dateOption = page.getByRole('option', { name: 'Choose Tuesday, January 27th,' });
    this.timeOption = page.getByRole('option', { name: '10:00 AM' });

    // Continue button
    this.ContinueBtn = page.getByRole('button', { name: 'Continue', exact: true });
  }

 
  async createTrip() {
    // Select car type
    await this.selectCarTypeBtn.click();
    await this.sedanPremiumBtn.click();

    // Pickup location
    await this.pickupInput.click();
    await this.pickupInput.fill('niketon');
    await this.pickupSuggestion.click();

    // Drop-off location
    await this.dropoffInput.click();
    await this.dropoffInput.fill('khulna');
    await this.dropoffSuggestion.click();

    // Date & time
    await this.dateInput.click();
    await this.dateOption.click();
    await this.timeOption.click();

    // Continue
    await this.continueBtn.click();
   
  }
}

export default TripPage;
