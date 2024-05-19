import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    const pizzasSelecionadas = JSON.parse(localStorage.getItem('pizzas')) || [];

    let totalPedido = 0;

    if (pizzasSelecionadas.length === 0) {
        const messageElement = document.createElement('p');
        messageElement.textContent = 'Nenhuma pizza adicionada.';
        messageElement.style.color = "#22333B"
        document.getElementById("pizza-details").appendChild(messageElement);
    } else {
        for (const pizzaData of pizzasSelecionadas) {
            const pizza = pizzaData.pizza || {};

            const pizzaInfo = document.createElement('div');
            pizzaInfo.classList.add('pizza-info');

            const nameAndFlavors = document.createElement('p');
            nameAndFlavors.textContent = `${pizza.name || 'Pizza'} - `;

            const flavorIds = pizza.flavorIds || [];
            const flavors = [];
            for (const flavorId of flavorIds) {
                try {
                    const res = await axios.get(`http://pizzaonline-api.azurewebsites.net/flavors/${flavorId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    flavors.push(res.data);
                } catch (error) {
                    console.error(`Erro ao obter detalhes do sabor com ID ${flavorId}:`, error);
                }
            }

            const flavorInfo = document.createElement('span');
            flavorInfo.textContent = flavors.map(flavor => flavor.name).join(' / ');

            nameAndFlavors.appendChild(flavorInfo);

            const priceInfo = document.createElement('span');
            const totalPizza = pizza.price || 0;
            totalPedido += totalPizza;
            priceInfo.textContent = `R$ ${totalPizza.toFixed(2)}`;

            pizzaInfo.appendChild(nameAndFlavors);
            pizzaInfo.appendChild(priceInfo);

            document.getElementById("pizza-details").appendChild(pizzaInfo);
        }

        const user = await getUser(token);
        console.log(user);
        if (user && user.address) {
            const enderecoElement = document.createElement('p');
            enderecoElement.textContent = `Endereço de entrega: ${user.address.street}, ${user.address.neighborhood}`;
            enderecoElement.style.color = "#22333B"
            document.getElementById("pizza-details").appendChild(enderecoElement);
        }

        const totalPedidoElement = document.createElement('p');
        totalPedidoElement.classList.add('total');
        totalPedidoElement.textContent = `Total: R$ ${totalPedido.toFixed(2)}`;
        document.getElementById("pizza-details").appendChild(totalPedidoElement);

        const concluirPedidoBtn = document.createElement('button');
        concluirPedidoBtn.id = 'concluir-pedido';
        concluirPedidoBtn.classList.add('btn');
        concluirPedidoBtn.textContent = 'Realizar Pedido';

        const btnContainer = document.getElementById('btn-div');
        btnContainer.appendChild(concluirPedidoBtn);

        const pizzasJSON = await Promise.all(pizzasSelecionadas.map(async pizzaData => {
            const pizza = pizzaData.pizza;
            const flavorIds = pizza.flavorIds || [];
            const flavors = [];
            for (const flavorId of flavorIds) {
                try {
                    const res = await axios.get(`http://pizzaonline-api.azurewebsites.net/flavors/${flavorId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log(res.data)
                    flavors.push(res.data);
                } catch (error) {
                    console.error(`Erro ao obter detalhes do sabor com ID ${flavorId}:`, error);
                }
            }
            return {
                name: pizza.name,
                price: pizza.price,
                pizzaType: pizza.pizzaType,
                flavors
            };
        }));

        concluirPedidoBtn.addEventListener('click', async function () {
            try {
                const res = await axios.post('http://pizzaonline-api.azurewebsites.net/orders', {
                    pizzas: pizzasJSON
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(res);
                alert("Pedido Realizado com sucesso!")
                window.location.href = 'pedidosAnteriores.html';
                localStorage.removeItem("pizzas");
            } catch (error) {
                console.error(`Erro ao realizar pedido:`, error);
            }
        });
    }
});

async function getUser(token) {
    try {
        const res = await axios.get('http://pizzaonline-api.azurewebsites.net/clientes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error(`Erro ao obter detalhes do usuário:`, error);
        return null;
    }
}
