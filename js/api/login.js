import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

document.addEventListener('DOMContentLoaded', async function () {

    async function Login(e) {
        e.preventDefault();

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        const email = emailInput.value;
        const password = passwordInput.value;

        const credentials = {
            email: email,
            password: password,
        }

        console.log(credentials);

        try {
            const response = await axios.post(
                "https://pizzaonline-cdbnfabqbgdcasa9.brazilsouth-01.azurewebsites.net/auth/login",
                JSON.stringify(credentials),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            const token = response.data.token;
            localStorage.setItem("token", token);

            console.log("Login successful. Token:", token);
            window.location.href = "../index.html";
        } catch (e) {
            console.error("Login failed:", e);
        }
    }
    document.getElementById("form-login").addEventListener("submit", Login);
});
