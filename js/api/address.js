const API_URL = 'https://brasilapi.com.br/api/cep/v1';

const getAddressByCEP = async (cepInput) => {
    try {
        const response = await fetch(`${API_URL}/${cepInput}`);
        if (!response.ok) {
            throw new Error('Erro ao obter endereço');
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        const { cep, state, city, neighborhood, street } = data;
        const address = {
            cep,
            state,
            city,
            neighborhood,
            street
        };
        return address;
    } catch (error) {
        alert("CEP inválido!")
        throw error;
    }
};

export default getAddressByCEP;
