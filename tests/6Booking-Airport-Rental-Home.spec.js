import { test, expect } from "@playwright/test";
import AirportTripPage from "../pages/AirportCreateTrip";
import LoginPage from "../pages/loginPage";
import { getMobile } from "../utils/mobileDataRead";
import TripPage from "../pages/CreateTripPage";

test.describe.serial("Login & Airport Rental Flow from Home", () => {
  test.only("Book Airport Rental", async ({ page }) => {
    await page.goto("/");
    const login = new LoginPage(page);
    const mobile = getMobile("mobile6");

    await login.getOTP(mobile);
    // await login.extractOTPandFill();
    await login.getOTPfromManualTyping();

    const tripAirport = new AirportTripPage(page);
    const trip = new TripPage(page);
    await tripAirport.fillAirportTripFormHome();

    await tripAirport.confirmTrip();

    await trip.checkAndCompleteProfile();

    await expect(page.locator(".swal2-popup .swal2-html-container")).toHaveText(
      "Trip created successfuly",
    );
  });

  test("User should not be able to book if an airport trip from Home already exists", async ({
    page,
  }) => {
    await page.goto("/");

    const login = new LoginPage(page);
    const mobile = getMobile("mobile6");
    await login.getOTP(mobile);
    // await login.extractOTPandFill();
    await login.getOTPfromManualTyping();

    const tripAirport = new AirportTripPage(page);

    await tripAirport.fillAirportTripFormHome();

    await tripAirport.confirmTrip();

    await tripAirport.checkAndCompleteProfile();

    await expect(page.locator(".swal2-popup .swal2-html-container")).toHaveText(
      "You have ongoing trips. Please complete the trips before starting a new one.",
    );
  });
});
