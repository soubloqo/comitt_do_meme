let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

async function iniciarBusca() {
    // Carrega os dados do JSON apenas uma vez
    if (dados.length === 0) {
        try {
            const resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            cardContainer.innerHTML = "<p>Erro ao carregar os memes. Tente novamente mais tarde.</p>";
            return;
        }
    }

    const termoBusca = campoBusca.value.trim();
    if (!termoBusca) {
        cardContainer.innerHTML = "<p>Digite um ano válido para buscar os memes.</p>";
        return;
    }

    // Filtra os dados pelo ano digitado
    const dadosFiltrados = dados.filter(dado => dado.ano === termoBusca);

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa cards anteriores

    if (dados.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum meme encontrado para este ano.</p>";
        return;
    }

    dados.forEach(dado => {
        const article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p><strong>Ano:</strong> ${dado.ano}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.video}" target="_blank">Assista ao vídeo</a>
        `;
        cardContainer.appendChild(article);
    });
}
