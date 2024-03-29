import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
import { verificarAutenticacao } from './auth.js';
import { createPizza } from './api/pizza.js';


var modal = document.getElementById("myModal");
var buttons = document.querySelectorAll(".botao");

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

buttons.forEach(function (button) {
    button.addEventListener('click', openModal);
});

modal.addEventListener("click", function (event) {
    if (event.target.classList.contains("close")) {
        closeModal();
    }
});

window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

document.querySelectorAll(".botao").forEach(async function (button) {
    button.addEventListener("click", async function (e) {
        e.preventDefault();

        let item = this.closest('.item');
        let name = item.dataset.tipo;
        let price = parseFloat(item.dataset.valor);

        try {
            const response = await axios.get("http://localhost:8082/flavors");
            const flavors = response.data;

            const flavorButtons = flavors.map(flavor => `
                <div class="flavor" data-sabor-id="${flavor.id}">
                    <span>${flavor.name}</span>
                    <div class="quantity-controls">
                        <button class="remove">-</button>
                        <span class="quantity">0</span>
                        <button class="add">+</button>
                    </div>
                </div>
            `).join('');

            const finalizeButton = '<button class="finalize">Finalizar Pedido</button>';

            const modalContent = document.querySelector(".modal-content");
            modalContent.innerHTML = `
                <span class="close">&times;</span>
                <h2>Escolha os Sabores de Pizza</h2>
                <p>(Máximo 2)</p>
                <div class="flavor-list">${flavorButtons}</div>
            `;
            modalContent.insertAdjacentHTML('beforeend', finalizeButton);

            document.querySelectorAll(".add").forEach(button => {
                button.addEventListener("click", function () {
                    const quantityElement = button.parentElement.querySelector('.quantity');
                    let quantity = parseInt(quantityElement.textContent);
                    if (quantity < 2 && getTotalQuantity() < 2) {
                        quantity++;
                        quantityElement.textContent = quantity;
                    }
                });
            });

            document.querySelectorAll(".remove").forEach(button => {
                button.addEventListener("click", function () {
                    const quantityElement = button.parentElement.querySelector('.quantity');
                    let quantity = parseInt(quantityElement.textContent);
                    if (quantity > 0) {
                        quantity--;
                        quantityElement.textContent = quantity;
                    }
                });
            });



            document.querySelector(".finalize").addEventListener("click", async function () {
                const usuarioAutenticado = verificarAutenticacao();

                if (!usuarioAutenticado) {
                    alert("Você precisa estar logado para finalizar o pedido. Por favor, faça o login.");
                    return;
                }

                const flavorIds = [];

                document.querySelectorAll(".flavor").forEach(flavor => {
                    const quantity = parseInt(flavor.querySelector(".quantity").textContent);
                    if (quantity > 0) {
                        const flavorId = flavor.dataset.saborId;
                        flavorIds.push(flavorId);
                    }
                });


                const pizza = createPizza(name, price, flavorIds);
                let pizzasSelecionadas = JSON.parse(localStorage.getItem('pizzas')) || [];
                pizzasSelecionadas.push(pizza);
                localStorage.setItem('pizzas', JSON.stringify(pizzasSelecionadas));
                location.href = "../pages/visualizarPedidos.html";
                console.log("Pizza:", pizza);
            });

        } catch (e) {
            console.error("Erro ao obter sabores. ", e);
        }
    });
});

function getTotalQuantity() {
    let total = 0;
    document.querySelectorAll('.quantity').forEach(quantityElement => {
        total += parseInt(quantityElement.textContent);
    });
    return total;
}
