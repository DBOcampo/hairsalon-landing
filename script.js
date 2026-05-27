const phoneNumber = "5491123456789";
const whatsappLinks = document.querySelectorAll(".whatsapp-link");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

whatsappLinks.forEach((link) => {
  const message = link.dataset.message || "Hola, quiero reservar un turno.";
  link.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noopener";
});

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    mobileMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});
