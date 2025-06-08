// js.js

document.addEventListener("DOMContentLoaded", () => {
  // Inicializa todas as funcionalidades
  initSmoothScrolling();
  initTestimonialHoverEffects();
  initCTAButtonTracking();
  initBenefitsListAnimation();
  initScrollAnimations();
  initCountdownTimer();
  initFakeSalesNotifications();
  initWhatsAppButton();
  initHeadlineABTest();
  initExitIntentCapture();
});

// 1. Rolagem Suave
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// 2. Efeitos de Hover nos Depoimentos
function initTestimonialHoverEffects() {
  const testimonialCards = document.querySelectorAll('.testimonials .card');
  testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
    });
  });
}

// 3. Rastreamento de Botões CTA
function initCTAButtonTracking() {
  document.querySelectorAll(".cta, .cta-button").forEach(btn => {
    btn.addEventListener("click", () => {
      console.log("Botão de inscrição clicado!");
      // Aqui você pode adicionar tracking do Google Analytics ou Facebook Pixel
    });
  });
}

// 4. Animação da Lista de Benefícios
function initBenefitsListAnimation() {
  const benefitItems = document.querySelectorAll('.benefits-list li');
  benefitItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('animate-fade-in');
  });
}

// 5. Animações ao Rolar a Página
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".card, .msg, .pricing-list li").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });
}

// 6. Contagem Regressiva para Oferta
function initCountdownTimer() {
  const deadline = new Date("2025-06-13T23:00:00");
  const countdownElement = document.querySelector(".urgency p");

  if (!countdownElement) return;

  function updateCountdown() {
    const now = new Date();
    const timeLeft = deadline - now;

    if (timeLeft <= 0) {
      countdownElement.innerHTML = "Inscrições encerradas!";
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

    countdownElement.innerHTML = `
      Inscrições com esse valor só até <strong>${days}d ${hours}h ${minutes}m ${seconds}s</strong>.<br>
      Depois, o valor volta para R$ 69,90/mês.<br>
      <strong>50 vagas por turma.</strong> Perdeu? Só na próxima edição.
    `;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
}

// 7. Notificações de Compra Falsas (Social Proof)
function initFakeSalesNotifications() {
  const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Curitiba", "Porto Alegre", "Salvador", "Fortaleza", "Recife", "Manaus"];
  
  function showFakeSale() {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const notification = document.createElement("div");
    notification.className = "sale-popup";
    notification.innerHTML = `
      <span>🔥</span> Alguém de ${randomCity} acabou de se inscrever!
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add("fade-out");
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  }

  // Mostra a primeira notificação após 15 segundos
  setTimeout(showFakeSale, 15000);
  // Depois mostra a cada 25-45 segundos aleatoriamente
  setInterval(showFakeSale, Math.random() * 20000 + 35000);
}

// 8. Botão Flutuante do WhatsApp
function initWhatsAppButton() {
  // Cria o botão flutuante
  const floatBtn = document.createElement("a");
  floatBtn.href = "https://wa.me/SEUNUMERO?text=Olá%2C+quero+garantir+minha+vaga!";
  floatBtn.className = "whatsapp-float";
  floatBtn.innerHTML = ' <i class="ri-whatsapp-line">Fale conosco</i>'; // Adicione um ícone se desejar
  document.body.appendChild(floatBtn);
  

  // Configura todos os botões do WhatsApp
  document.querySelectorAll(".whatsapp-button").forEach(btn => {
    btn.addEventListener("click", () => {
      window.open(floatBtn.href, "_blank");
      console.log("Clique no WhatsApp registrado");
    });
  });
}