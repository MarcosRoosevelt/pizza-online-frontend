import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');

    try {
        const res = await axios.get('18.228.238.255:8082/orders/cliente', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const orders = res.data;
        console.log(orders);

        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            const orderContainer = document.createElement('div');
            orderContainer.classList.add('order-container');
        
            const orderElement = document.createElement('div');
            orderElement.classList.add('order-info');
        
            const dateElement = document.createElement('p');
            dateElement.textContent = `Data do pedido: ${formatDate(order.orderDate)}`;
            orderElement.appendChild(dateElement);
        
            // Iterar sobre as pizzas
            if (order.pizzaResponseDTOS && Array.isArray(order.pizzaResponseDTOS)) {
                for (let j = 0; j < order.pizzaResponseDTOS.length; j++) {
                    const pizza = order.pizzaResponseDTOS[j];
                    const flavorsText = pizza.flavors.map(flavor => flavor.name).join(' / ');
                    const pizzaElement = document.createElement('div');
                    pizzaElement.classList.add('pizza-details');
        
                    const nameElement = document.createElement('p');
                    nameElement.textContent = `${pizza.name} - ${flavorsText}`;
                    pizzaElement.appendChild(nameElement);
        
                    const priceElement = document.createElement('p');
                    priceElement.textContent = `Valor: R$ ${pizza.price.toFixed(2)}`;
                    priceElement.classList.add('right'); // Adiciona uma classe para alinhar à direita
                    pizzaElement.appendChild(priceElement);
        
                    orderElement.appendChild(pizzaElement);
                }
            }
        
            const totalValueElement = document.createElement('p');
            totalValueElement.textContent = `Total do Pedido: R$ ${order.totalValue.toFixed(2)}`;
            totalValueElement.classList.add('total'); // Adiciona uma classe para alinhar o total
            orderElement.appendChild(totalValueElement);
        
            orderContainer.appendChild(orderElement);
            document.getElementById("order-details").appendChild(orderContainer);
        }    
    } catch (error) {
        console.error(`Erro ao obter pedidos anteriores:`, error);
    }
});

function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
}
