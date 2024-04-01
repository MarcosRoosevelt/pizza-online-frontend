import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const res = await axios.get("18.228.238.255:8082/flavors/ranking");
        const flavors = res.data;

        const flavorsDiv = document.querySelector('.flavors');

        flavors.forEach((flavor, index) => {
            const flavorElement = document.createElement('div');
            flavorElement.classList.add('flavor');
            flavorElement.innerHTML = `${index + 1}°. ${flavor[0]} - Pedidos: ${flavor[1]}`;
            flavorsDiv.appendChild(flavorElement);
        });
    } catch (error) {
        console.error(`Erro ao obter sabores mais pedidos:`, error);
    }
});
