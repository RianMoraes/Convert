//cotação de valores diario
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

// Obtendo os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")


// manipulando o input amount para receber somente numeros
amount.addEventListener("input", () => {

    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")

})

//Capturando o evento de submit do formulário.
form.onsubmit = (event) => {
    event.preventDefault()

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break;
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break;
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break;
    }
}
//Função para converter a moeda
function convertCurrency(amount, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        //caçulando o valor total
        let total = amount * price

        //verifica se o valor total não é um número
        if(isNaN(total)){
            return alert("Por favor insira um valor válido")
        }

        //formatar o valor total
        total = formatCurrencyBRL(total).replace("R$", "")

        //exibe o total
        result.textContent = `${total} Reais`

        // aplica a classe que exibe o footer para mostrar o resultado
        footer.classList.add("show-result")

    } catch (error) {
        //remove a classe do footer removendo ele da tela
        footer.classList.remove("show-result")

        console.error("Erro ao converter a moeda:", error);
        alert("Erro ao converter tente novamente mais tarde")
    }
}

//Formata a moeda em Real Brasileiro
function formatCurrencyBRL(value) {

    //number tolocalstring
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}
