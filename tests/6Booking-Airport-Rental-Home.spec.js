import { test, expect } from "@playwright/test";
import AirportTripPage from "../pages/AirportCreateTrip";
import LoginPage from "../pages/loginPage";
import { getMobile } from "../utils/mobileDataRead";


test.describe.serial("Login & Airport Rental Flow from Home", () => {
  test("Book Airport Rental", async ({ page }) => {
    await page.goto("/");
    const login = new LoginPage(page);
    const mobile = getMobile("mobile5");

    await login.getOTP(mobile);
    await login.extractOTPandFill();

    
    await page.waitForLoadState("networkidle");

    const tripAirport = new AirportTripPage(page);

<<<<<<< Updated upstream
<<<<<<<< Updated upstream:tests/6Booking-Airport-Rental-Home.spec.js
<<<<<<<< Updated upstream:tests/6Booking-Airport-Rental-Home.spec.js
    
    await tripAirport.fillAirportTripFormHome();
========
   
    await tripAirport.fillAirportTripFormAirport();
>>>>>>>> Stashed changes:tests/5Booking-Airport-Rental-airport.spec.js
========
   
    await tripAirport.fillAirportTripFormAirport();
>>>>>>>> Stashed changes:tests/5Booking-Airport-Rental-airport.spec.js
=======
    
    await tripAirport.fillAirportTripFormHome();
>>>>>>> Stashed changes

    await tripAirport.confirmTrip();

    
    await tripAirport.checkAndCompleteProfile();

    await expect(page.locator(".swal2-popup .swal2-html-container")).toHaveText(
      "Trip created successfuly",
    );
  });

  test("User should not be able to book if an airport trip from Home already exists", async ({
    page,
  }) => {

    await page.goto("/");

    const login = new LoginPage(page);
    const mobile = getMobile("mobile5");
    await login.getOTP(mobile);
    await login.extractOTPandFill();

    const tripAirport = new AirportTripPage(page);

<<<<<<< Updated upstream
<<<<<<<< Updated upstream:tests/6Booking-Airport-Rental-Home.spec.js
<<<<<<<< Updated upstream:tests/6Booking-Airport-Rental-Home.spec.js
    await tripAirport.fillAirportTripFormHome();
========
    await tripAirport.fillAirportTripFormAirport();
>>>>>>>> Stashed changes:tests/5Booking-Airport-Rental-airport.spec.js
========
    await tripAirport.fillAirportTripFormAirport();
>>>>>>>> Stashed changes:tests/5Booking-Airport-Rental-airport.spec.js
=======
    await tripAirport.fillAirportTripFormHome();
>>>>>>> Stashed changes

    await tripAirport.confirmTrip();

    await tripAirport.checkAndCompleteProfile();

  
    await expect(page.locator(".swal2-popup .swal2-html-container")).toHaveText(
      "You have ongoing trips. Please complete the trips before starting a new one.",
    );
  });
});
