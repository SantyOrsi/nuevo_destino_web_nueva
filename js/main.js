/* =========================================================
   NUEVO DESTINO VIAJES — main.js
   Menú mobile + ticker infinito + scroll del botón DATOS
   ========================================================= */

(function () {
  "use strict";

  // ---------- Menú mobile ----------
  const toggle = document.querySelector(".navbar__toggle");
  const menu = document.querySelector(".navbar__menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Ticker infinito ----------
  // Duplicamos el contenido una vez para lograr el loop continuo sin saltos.
  const track = document.querySelector(".ticker__track");
  if (track) {
    track.innerHTML += track.innerHTML;
  }

})();
