import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    const pizzasSelecionadas = JSON.parse(localStorage.getItem('pizzas')) || [];
    console.log(token);

    let totalPedido = 0;

    try {
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
                const flavorDetails = [];
                for (const flavorId of flavorIds) {
                    try {
                        const res = await axios.get(`https://pizzaonline-api.azurewebsites.net/flavors/${flavorId}`, {
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
                const totalPizza = pizza.price || 0;
                totalPedido += totalPizza;
                priceInfo.textContent = `R$ ${totalPizza.toFixed(2)}`;

                pizzaInfo.appendChild(nameAndFlavors);
                pizzaInfo.appendChild(priceInfo);

                document.getElementById("pizza-details").appendChild(pizzaInfo);
            }

            const totalPedidoElement = document.createElement('p');
            totalPedidoElement.classList.add('total');
            totalPedidoElement.textContent = `Total: R$ ${totalPedido.toFixed(2)}`;
            document.getElementById("pizza-details").appendChild(totalPedidoElement);

            const addMoreBtn = document.createElement('button');
            addMoreBtn.id = 'add-more';
            addMoreBtn.classList.add('btn');
            addMoreBtn.textContent = 'Adicionar Mais Itens';

            const concluirPedidoBtn = document.createElement('button');
            concluirPedidoBtn.id = 'concluir-pedido';
            concluirPedidoBtn.classList.add('btn');
            concluirPedidoBtn.textContent = 'Continuar';

            const btnContainer = document.getElementById('btns');
            btnContainer.appendChild(addMoreBtn);
            btnContainer.appendChild(concluirPedidoBtn);
        }
    } catch (error) {
        console.error('Erro ao obter detalhes das pizzas:', error);
    }


    document.getElementById("add-more").addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "../index.html"
    });

    document.getElementById("concluir-pedido").addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "./concluirPedido.html"
    });
});
