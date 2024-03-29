import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    const pizzasSelecionadas = JSON.parse(localStorage.getItem('pizzas')) || [];
    console.log(token);

    let totalPedido = 0;

    try {        
        for (const pizzaData of pizzasSelecionadas) {
            const pizza = pizzaData.pizza || {}; // Verifica se 'pizzaData.pizza' está definido

            const pizzaInfo = document.createElement('div');
            pizzaInfo.classList.add('pizza-info');

            const nameAndFlavors = document.createElement('p');
            nameAndFlavors.textContent = `${pizza.name || 'Pizza'} - `; // Usa 'Pizza' como nome padrão

            const flavorIds = pizza.flavorIds || []; // Verifica se 'pizza.flavorIds' está definido e é um array
            const flavorDetails = [];
            for (const flavorId of flavorIds) {
                try {
                    const res = await axios.get(`http://localhost:8082/flavors/${flavorId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    flavorDetails.push(res.data.name);
                } catch (error) {
                    console.error(`Erro ao obter detalhes do sabor com ID ${flavorId}:`, error);
                }
            }

            const flavorInfo = document.createElement('span');
            flavorInfo.textContent = flavorDetails.join(' / ');

            nameAndFlavors.appendChild(flavorInfo);

            const priceInfo = document.createElement('span');
            const totalPizza = pizza.price || 0; // Usa 0 como preço padrão se não estiver definido
            totalPedido += totalPizza;
            priceInfo.textContent = `R$ ${totalPizza.toFixed(2)}`;

            pizzaInfo.appendChild(nameAndFlavors);
            pizzaInfo.appendChild(priceInfo);

            document.getElementById("pizza-details").appendChild(pizzaInfo);
        }

        // Exibindo o total do pedido
        const totalPedidoElement = document.createElement('p');
        totalPedidoElement.classList.add('total');
        totalPedidoElement.textContent = `Total: R$ ${totalPedido.toFixed(2)}`;
        document.getElementById("pizza-details").appendChild(totalPedidoElement);
    } catch (error) {
        console.error('Erro ao obter detalhes das pizzas:', error);
    }
});
