// js.js

document.addEventListener("DOMContentLoaded", () => {
  // Rolagem suave para os links com #
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Botão "Quero me inscrever agora" com rolagem para o final da página
  document.querySelectorAll(".cta, .cta-button").forEach(btn => {
    btn.addEventListener("click", () => {
      console.log("Botão de inscrição clicado!");
    });
  });

    const benefitItems = document.querySelectorAll('.benefits-list li');
  benefitItems.forEach((item, index) => {
    // Adiciona um atraso para criar um efeito sequencial
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('animate-fade-in');
  });

  // Animações leves ao rolar a página
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
    el.classList.add("hidden"); // CSS: opacity: 0; transform: translateY(20px);
    observer.observe(el);
  });

  // Contagem regressiva para a urgência
  const deadline = new Date("2025-06-13T23:00:00");
  const countdownElement = document.querySelector(".urgency p");

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

  if (countdownElement) {
    setInterval(updateCountdown, 1000);
    updateCountdown(); // primeira chamada
  }
});
