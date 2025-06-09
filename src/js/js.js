function initWhatsAppButton() {
  const floatBtn = document.createElement("a");
  floatBtn.href = "https://wa.me/SEUNUMERO?text=Olá%2C+quero+garantir+minha+vaga!";
  floatBtn.className = "whatsapp-float";
  floatBtn.innerHTML = ' <i class="ri-whatsapp-line">Fale conosco</i>'; 
  document.body.appendChild(floatBtn);
  
  document.querySelectorAll(".whatsapp-button").forEach(btn => {
    btn.addEventListener("click", () => {
      window.open(floatBtn.href, "_blank");
      console.log("Clique no WhatsApp registrado");
    });
  })};

  initWhatsAppButton()
