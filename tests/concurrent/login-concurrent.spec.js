import { test } from "@playwright/test";

function generateRandomMobile() {
  return "013" + Math.floor(10000000 + Math.random() * 90000000);
}

test.describe("Concurrent Login Request Test", () => {
  test("Send login requests concurrently with random mobile numbers", async ({
    request,
  }) => {
    const numberOfRequests = 50;

    const requests = Array.from(
      { length: numberOfRequests },
      async (_, index) => {
        const mobile = generateRandomMobile();

        console.log(`\n========== Request ${index + 1} ==========`);
        console.log(`Mobile: ${mobile}`);

        const response = await request.post(
          "https://test.garibookadmin.com/api/v4/user/login",
          {
            data: {
              mobile: mobile,
              recaptcha_token: "garibookcaptcha",
            },
          },
        );

        const responseBody = await response.text();

        console.log(`Status: ${response.status()}`);
        console.log(`Response: ${responseBody}`);
        console.log(`========================================`);

        return {
          index: index + 1,
          mobile,
          status: response.status(),
          response: responseBody,
        };
      },
    );

    const results = await Promise.all(requests);

    console.log("\n\n========== ALL REQUEST RESULTS ==========");

    results.forEach((result) => {
      console.log(
        `Request ${result.index} | Mobile: ${result.mobile} | Status: ${result.status}`,
      );
      console.log(`Response: ${result.response}`);
    });

    console.log("=========================================");
  });
});
