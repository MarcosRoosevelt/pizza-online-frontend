import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
import getAddressByCEP from "./address.js";

document.addEventListener("DOMContentLoaded", async function () {

  async function RegisterCliente(e) {
    e.preventDefault();

    const cepInput = document.getElementById("cep");

    if (cepInput !== null) {
        let cep = cepInput.value;
        let tempCep = cep.trim();
        tempCep = tempCep.replace(/[^0-9]/g, '');

        if (tempCep.length === 9 && tempCep.charAt(5) === "-") {
          tempCep = tempCep.slice(0, 5) + tempCep.slice(6);
        }

        cepInput.value = tempCep; 

        const address = await getAddressByCEP(tempCep); 

        const userData = {
          name: document.getElementById("name").value,
          phoneNumber: document.getElementById("phone_number").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
          role: "USER",
          address
        }

        console.log(userData);

        try {
          const response = await axios.post(
            "http://pizzaonline-api.azurewebsites.net/auth/register",
            JSON.stringify(userData),
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          
          window.location.href = "login.html";
          console.log(response.data);
        } catch (error) {
          console.error('Erro ao registrar:', error);
          cepInput.value = '';
        }
    } else {
        console.error('Elemento com id "cep" não encontrado.');
    }
  }
  document.getElementById("form-cadastro").addEventListener("submit", RegisterCliente);
});
