function createPizza(name, price, flavorIds){
    try {
        
        const pizzaTypeMap = {
            "Pizza Pequena": "PEQUENA",
            "Pizza Média": "MEDIA",
            "Pizza Grande": "GRANDE",
            "Pizza Família": "FAMILIA"
        };
        const pizzaType = pizzaTypeMap[name];

        const pizza = {
            name,
            price,
            pizzaType,
            flavorIds
        };

        return pizza;
    } catch (error) {
        console.error("Erro ao criar pizza:", error);
        throw error;
    }
};

export { createPizza };
