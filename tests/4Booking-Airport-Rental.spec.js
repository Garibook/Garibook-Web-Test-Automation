import { test, expect } from "@playwright/test";
import AirportTripPage from "../pages/AirportCreateTrip"; 
import LoginPage from "../pages/loginPage";
import { getMobile } from "../utils/mobileDataRead";

// 1. Ensure all tests are INSIDE the .serial block so they share the same state/login session logic
test.describe.serial("Login & Airport Rental Flow", () => {
  
  test("Book Airport Rental", async ({ page }) => {
    await page.goto("/");
    const login = new LoginPage(page);
    const mobile = getMobile("mobile3");
    
    await login.getOTP(mobile);
    await login.extractOTPandFill();
    
    // Use a short wait for the page to stabilize
    await page.waitForLoadState('networkidle');

    const tripAirport = new AirportTripPage(page);
    
    // fillAirportTripForm already handles clicking the "Airport Rental" tab
    await tripAirport.fillAirportTripForm();
    
    await tripAirport.confirmTrip();
    
    // The profile check usually triggers after the first 'Request'
    await tripAirport.checkAndCompleteProfile();

   
     await expect(page.locator(".swal2-popup .swal2-html-container")).toHaveText(
      "Trip created successfuly",
   
    );
  });

  test("User should not be able to book if an airport trip already exists", async ({ page }) => {
    await page.goto("/");
    
    const login = new LoginPage(page);
    const mobile = getMobile("mobile3");
    await login.getOTP(mobile);
    await login.extractOTPandFill();

    const tripAirport = new AirportTripPage(page);

    
    await tripAirport.fillAirportTripForm();
    
    await tripAirport.confirmTrip();
    
    
    
    await tripAirport.checkAndCompleteProfile();

    // 3. Assertion for the "Ongoing Trip" error message
    await expect(page.locator(".swal2-popup .swal2-html-container")).toHaveText(
      "You have ongoing trips. Please complete the trips before starting a new one."
    );
  });
});