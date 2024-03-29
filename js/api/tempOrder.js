import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    const pizzasSelecionadas = JSON.parse(localStorage.getItem('pizzas')) || [];
    console.log(token);

    let totalPedido = 0;

    try {        
        for (const pizza of pizzasSelecionadas) {
            const pizzaInfo = document.createElement('div');
            pizzaInfo.classList.add('pizza-info');

            const nameAndFlavors = document.createElement('p');
            nameAndFlavors.textContent = `${pizza.name} - `;

            const flavorDetails = [];
            for (const flavorId of pizza.flavorIds) {
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
            const totalPizza = pizza.price;
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
