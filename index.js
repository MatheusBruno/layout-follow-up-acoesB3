const app = document.getElementById("app")
const arrumar = document.getElementById("arrumar")

function dados2() {
    return fetch('https://brapi.dev/api/quote/PETR4%2CKLBN11%2CITSA4%2CBRSR6%2CCSNA3%2CTAEE4%2CTASA4?range=1d&interval=1d&fundamental=true&dividends=true').then(resultado => resultado.json()).then(resultado => resultado['results'])
}

function htmlcompleto(dados){
    return `
    <div id="arrumar">
    <img src="${dados.logourl}">
    <h1>${dados.longName}</h1>
    <h2>${dados.symbol}</h2>
    <p>R$ ${dados.regularMarketPrice}</p>
    ${ dados.dividendsData.cashDividends.map(resultado => {
        
        return `<div class="dividendos">
        <h3>${resultado.label}</h3>
        <p>R$ ${resultado.rate.toFixed(2)}</p>
        <p>Data de Pagamento: ${resultado.paymentDate.replace("T00:00:00.000Z","")}</p>
        <p>Ultimo dia par entrar: ${resultado.lastDatePrior.replace("T00:00:00.000Z","")}</p>
        </div>`


    }).join('') }

    </div>
    `
}

console.log(dados2().then(resultado => {
    resultado.map(dados => {
        app.innerHTML += htmlcompleto(dados)
    })
}))