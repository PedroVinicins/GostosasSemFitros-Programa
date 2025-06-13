document.addEventListener('DOMContentLoaded', function() {

    inicializarAnimacoes();
    inicializarCarrosselDepoimentos();
    inicializarRolagemSuave();
});
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

function inicializarBotaoTopo() {
    const botaoTopo = document.createElement("button");
    botaoTopo.className = "btn-topo";
    botaoTopo.textContent = "↑";
    document.body.appendChild(botaoTopo);

    window.addEventListener("scroll", () => {
        botaoTopo.style.display = window.scrollY > 300 ? "block" : "none";
    });

    botaoTopo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function solicitarPermissaoNotificacao() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Bem-vindo ao nosso site!", {
                    body: "Fique de olho nas promoções exclusivas!",
                    icon: "/favicon.ico"
                });
            }
        });
    }
}

function inicializarConfetes() {
  function soltarConfetes() {
    const confeteCount = 100;
    for(let i=0; i<confeteCount; i++) {
      const confete = document.createElement('div');
      confete.className = 'confete';
      confete.style.left = `${Math.random() * window.innerWidth}px`;
      confete.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confete.style.backgroundColor = `hsl(${Math.random()*360}, 70%, 60%)`;
      document.body.appendChild(confete);

      setTimeout(() => confete.remove(), 5000);
    }
  }
  document.getElementById('botao-confetes')?.addEventListener('click', soltarConfetes);
}

inicializarConfetes();

 solicitarPermissaoNotificacao();

inicializarBotaoTopo();