const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

amount.addEventListener("input", () => {

    const hasCharactersRegex = /\D+/g
    
    amount.value = amount.value.replace(hasCharactersRegex, ""); // Quando digita letra, o replace substitui por nada
})

form.onsubmit = async (event) =>{
    event.preventDefault();

    fetch

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$");
            break;
        case "EUR":
            convertCurrency(amount.value, EUR, "€");
            break;
        case "GBP":
            convertCurrency(amount.value, GBP, "£");
            break;
    }
}

function convertCurrency(amount, price, symbol) {
    try {
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

        let total = amount * price;

        if(isNaN(total)) {
            return alert("Valor inválido para conversão.");
        }

        result.textContent = formatCurrencyBRL(total);
        footer.classList.add("show-result");
    } catch (error) {
        footer.classList.remove("show-result");
        
        console.log(error);
        alert("Ocorreu um erro ao converter a moeda. Por favor, tente novamente.");
    }
}

function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}