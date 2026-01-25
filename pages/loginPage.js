class LoginPage{
    constructor (page) {
        this.page= page;
         
    // Locators
    this.loginBtn = page.getByRole('link', { name: 'login' });
        
    this.mobileInput = page.locator('input[name="mobile"]');
    this.sendCodeButton = page.getByRole('button', { name: 'Send code' });
    this.otpInfoText = page.locator('.alert-info');
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    }
    
    async getOTP(mobileNumber) {

    await this.loginBtn.click();
    // Enter mobile number
    await this.mobileInput.fill(mobileNumber);

    // Send OTP
    await this.sendCodeButton.click();
    await this.page.waitForTimeout(2000);
    }
    
    async extractOTPandFill(){
    // Extract OTP from alert text
    const text = await this.otpInfoText.innerText();
    const otp = text.match(/\d+/)[0];

    console.log('OTP:', otp);

    // Fill OTP inputs
    for (let i = 0; i < otp.length; i++) {
      await this.page.fill(`#otp${i + 1}`, otp[i]);
    }

    // Continue
    await this.continueButton.click();

  }
}


export default LoginPage;