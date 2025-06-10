document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    inicializarBotaoWhatsApp();
    inicializarAnimacoes();
    inicializarCarrosselDepoimentos();
    inicializarRolagemSuave();
});

// 1. Botão Flutuante do WhatsApp
function inicializarBotaoWhatsApp() {
    // Cria o botão flutuante
    const botaoFlutuante = document.createElement("a");
    botaoFlutuante.href = "https://wa.me/SEUNUMERO?text=Olá%2C+quero+garantir+minha+vaga!";
    botaoFlutuante.className = "whatsapp-float";
    botaoFlutuante.innerHTML = '<i class="ri-whatsapp-line"></i> Fale conosco';
    document.body.appendChild(botaoFlutuante);
    
    // Configura os botões fixos de WhatsApp
    document.querySelectorAll(".whatsapp-button").forEach(botao => {
        botao.addEventListener("click", () => {
            window.open(botaoFlutuante.href, "_blank");
            console.log("Clique no WhatsApp registrado");
        });
    });
}

// 2. Animação de Elementos na Tela
function inicializarAnimacoes() {
    const observador = new IntersectionObserver(
        (entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("mostrar");
                }
            });
        },
        { threshold: 0.1 }
    );

    // Observa elementos que devem aparecer com animação
    document.querySelectorAll(".card, .msg, .pricing-list li").forEach(elemento => {
        elemento.classList.add("escondido");
        observador.observe(elemento);
    });
}

// 3. Carrossel de Depoimentos
function inicializarCarrosselDepoimentos() {
    const carrossel = document.getElementById('carrossel');
    const botaoAnterior = document.getElementById('botaoAnterior');
    const botaoProximo = document.getElementById('botaoProximo');
    const containerPontos = document.getElementById('pontos-carrossel');
    const cards = document.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    let indiceAtual = 0;
    
    // Cria os pontos de navegação
    cards.forEach((_, indice) => {
        const ponto = document.createElement('div');
        ponto.classList.add('ponto');
        if (indice === 0) ponto.classList.add('ativo');
        ponto.addEventListener('click', () => irParaSlide(indice));
        containerPontos.appendChild(ponto);
    });
    
    const pontos = document.querySelectorAll('.ponto');
    
    function atualizarCarrossel() {
        const larguraCard = cards[0].offsetWidth + 30; // largura do card + margem
        carrossel.style.transform = `translateX(-${indiceAtual * larguraCard}px)`;
        
        // Atualiza os pontos ativos
        pontos.forEach((ponto, indice) => {
            ponto.classList.toggle('ativo', indice === indiceAtual);
        });
    }
    
    function irParaSlide(indice) {
        indiceAtual = indice;
        atualizarCarrossel();
    }
    
    // Eventos de navegação
    botaoAnterior.addEventListener('click', () => {
        indiceAtual = (indiceAtual > 0) ? indiceAtual - 1 : totalCards - 1;
        atualizarCarrossel();
    });
    
    botaoProximo.addEventListener('click', () => {
        indiceAtual = (indiceAtual < totalCards - 1) ? indiceAtual + 1 : 0;
        atualizarCarrossel();
    });
    
    // Ajuste para redimensionamento da tela
    window.addEventListener('resize', atualizarCarrossel);
}

// 4. Rolagem Suave para Links Internos
function inicializarRolagemSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const alvo = document.querySelector(this.getAttribute("href"));
            if (alvo) {
                alvo.scrollIntoView({ 
                    behavior: "smooth", 
                    block: "start" 
                });
            }
        });
    });
}