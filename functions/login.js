export async function login(username, password, continueBtn, signInBtn){
    await username.fill(process.env.username_amazon);
    await continueBtn.first().click();
    await password.fill(process.env.password_amazon);
    await signInBtn.click();
}