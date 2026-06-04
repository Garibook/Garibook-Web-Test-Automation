import { test, expect } from "@playwright/test";
import AirportTripPage from "../pages/AirportCreateTrip";
import LoginPage from "../pages/loginPage";
import { getMobile } from "../utils/mobileDataRead";
import TripPage from "../pages/CreateTripPage";
import CancelTrip from "../pages/cancelTrip";
test.describe.serial("Login & Airport Rental Flow", () => {
  test.only("Book Airport Rental", async ({ page }) => {
    await page.goto("/");
    const login = new LoginPage(page);
    const mobile = getMobile("mobile5");

    await login.getOTP(mobile);
    await login.extractOTPandFill();
    //await login.getOTPfromManualTyping();

    const tripAirport = new AirportTripPage(page);
    const trip = new TripPage(page);
    await page.waitForTimeout(7000);
    await tripAirport.fillAirportTripFormAirport();

    await tripAirport.confirmTrip();

    await trip.checkAndCompleteProfile();

    await expect(page.locator(".swal2-popup .swal2-html-container")).toHaveText(
      "Trip created successfuly",
    );
    //cancel Trip after creating successfully
    await page.waitForTimeout(3000);
    await page.goto("/trip/ongoing-bidding");
    const cancel = new CancelTrip(page);
    await cancel.doCancel();
    await page.waitForTimeout(2000);
    await expect(page.locator(".swal2-popup #swal2-title")).toHaveText(
      "Trip Cancellation Successful",
    );
  });

  test("User should not be able to book if an airport trip already exists", async ({
    page,
  }) => {
    await page.goto("/");

    const login = new LoginPage(page);
    const mobile = getMobile("mobile5");
    await login.getOTP(mobile);
    await login.extractOTPandFill();

    const tripAirport = new AirportTripPage(page);
    const trip = new TripPage(page);
    await tripAirport.fillAirportTripFormAirport();

    await tripAirport.confirmTrip();

    await trip.checkAndCompleteProfile();

    await expect(page.locator(".swal2-popup .swal2-html-container")).toHaveText(
      "You have ongoing trips. Please complete the trips before starting a new one.",
    );
  });
});
