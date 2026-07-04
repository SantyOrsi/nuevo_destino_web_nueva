/* =========================================================
   NUEVO DESTINO VIAJES — js/agencia.js
   Carga paquetes desde Firestore en tiempo real.
   firebase-config.js debe cargarse antes que este script.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---- Admin modal login con Firebase Auth -------------- */
  const adminTrigger  = document.getElementById("adminTrigger");
  const adminModal    = document.getElementById("adminModal");
  const adminClose    = document.getElementById("adminClose");
  const adminBackdrop = document.getElementById("adminBackdrop");
  const adminForm     = document.getElementById("adminForm");
  const adminError    = document.getElementById("adminError");
  const togglePass    = document.querySelector(".admin-form__toggle-pass");
  const passInput     = document.getElementById("adminPass");

  // Si ya está logueado, redirigir directo al panel
  auth.onAuthStateChanged((user) => {
    if (user) {
      const btn = document.querySelector(".admin-link span");
      if (btn) btn.textContent = "Panel";
      adminTrigger?.setAttribute("href", "admin.html");
    }
  });

  function openModal()  {
    adminModal.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("adminUser").focus();
  }
  function closeModal() {
    adminModal.hidden = true;
    document.body.style.overflow = "";
    adminError.hidden = true;
    adminForm.reset();
  }

  adminTrigger?.addEventListener("click", (e) => {
    // Si ya está autenticado, ir directo al panel
    if (auth.currentUser) { window.location.href = "admin.html"; return; }
    e.preventDefault();
    openModal();
  });

  adminClose?.addEventListener("click", closeModal);
  adminBackdrop?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !adminModal.hidden) closeModal();
  });

  togglePass?.addEventListener("click", () => {
    const isPass = passInput.type === "password";
    passInput.type = isPass ? "text" : "password";
  });

  /* Login con Firebase Auth */
  adminForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email    = document.getElementById("adminUser").value.trim();
    const password = passInput.value;
    const submitSpan = adminForm.querySelector(".admin-form__submit span");

    if (!email || !password) {
      showError("Completá usuario y contraseña.");
      return;
    }

    submitSpan.textContent = "Ingresando...";
    adminError.hidden = true;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      window.location.href = "admin.html";
    } catch (err) {
      submitSpan.textContent = "Ingresar";
      showError("Usuario o contraseña incorrectos.");
      passInput.value = "";
      passInput.focus();
    }
  });

  function showError(msg) {
    adminError.textContent = msg;
    adminError.hidden = false;
  }

  /* ---- Cargar paquetes desde Firestore en tiempo real --- */
  const grid = document.getElementById("packageGrid");

  PAQUETES_COL
    .where("estado", "==", "activo")
    .orderBy("createdAt", "desc")
    .onSnapshot(
      (snapshot) => {
        const paquetes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderCards(paquetes);
        updateStats(paquetes);
      },
      (err) => {
        console.error("Error cargando paquetes:", err);
        if (grid) grid.innerHTML = `
          <div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--gray-500)">
            <p>No se pudieron cargar los paquetes. Intentá recargar la página.</p>
          </div>`;
      }
    );

  /* ---- Render cards -------------------------------------- */
  const GRADIENTS = [
    "linear-gradient(135deg,#1a3a5c 0%,#2d7d9a 40%,#4a9abe 100%)",
    "linear-gradient(135deg,#2c1654 0%,#874eca 40%,#b07ee4 100%)",
    "linear-gradient(135deg,#0d4a2f 0%,#1a8a4a 40%,#2fb96d 100%)",
    "linear-gradient(135deg,#6b1a1a 0%,#c93030 40%,#e87070 100%)",
    "linear-gradient(135deg,#5a3500 0%,#c47a00 40%,#f5a623 100%)",
    "linear-gradient(135deg,#1a2a6c 0%,#b21f1f 50%,#fdbb2d 100%)",
  ];

  function renderCards(paquetes) {
    if (!grid) return;

    if (paquetes.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--gray-500)">
          <p style="font-size:16px">Próximamente nuevos paquetes. ¡Consultanos!</p>
          <a href="#consulta" class="ag-btn ag-btn--yellow" style="display:inline-flex;margin-top:20px">
            Consultar un viaje
          </a>
        </div>`;
      return;
    }

    grid.innerHTML = paquetes.map((pkg, i) => `
      <article class="ag-card" data-category="${pkg.categoria}">
        <div class="ag-card__img" style="background:${GRADIENTS[i % GRADIENTS.length]}">
          <span class="ag-card__tag">${capFirst(pkg.categoria)}</span>
        </div>
        <div class="ag-card__body">
          <div class="ag-card__meta">
            ${pkg.duracion ? `<span>🗓 ${pkg.duracion}</span>` : ""}
            ${pkg.incluye  ? `<span>${pkg.incluye.split("·")[0].trim()}</span>` : ""}
          </div>
          <h3>${escHtml(pkg.nombre)}</h3>
          <p>${escHtml(pkg.descripcion || "")}</p>
          <div class="ag-card__footer">
            <span class="ag-card__price">Desde <strong>${escHtml(pkg.precio)}</strong></span>
            <a href="#consulta" class="ag-card__cta">Consultar</a>
          </div>
        </div>
      </article>
    `).join("");

    // Re-aplicar IntersectionObserver a las nuevas cards
    applyEntranceAnim();
    // Re-aplicar filtro activo
    const activeTab = document.querySelector(".ag-tab.is-active");
    if (activeTab) filterCards(activeTab.dataset.tab);
  }

  /* ---- Stats contador ------------------------------------ */
  function updateStats(paquetes) {
    const intl  = paquetes.filter(p => p.categoria === "internacional").length;
    const nac   = paquetes.filter(p => p.categoria === "nacional").length;
    const grp   = paquetes.filter(p => p.categoria === "grupal").length;
    // Podés mostrar estos en badges de las pills si querés
    _ = [intl, nac, grp]; // suprimir warning
  }

  /* ---- Filter tabs + pills ------------------------------ */
  function filterCards(category) {
    document.querySelectorAll(".ag-card").forEach((card) => {
      card.style.display = category === "todos" || card.dataset.category === category ? "" : "none";
    });
    document.querySelectorAll(".ag-tab").forEach((t) =>
      t.classList.toggle("is-active", t.dataset.tab === category));
    document.querySelectorAll(".ag-pill").forEach((p) =>
      p.classList.toggle("is-active", p.dataset.filter === category));
  }

  document.querySelectorAll(".ag-tab").forEach((tab) => {
    tab.addEventListener("click", () => filterCards(tab.dataset.tab));
  });

  document.querySelectorAll(".ag-pill").forEach((pill) => {
    pill.addEventListener("click", (e) => {
      e.preventDefault();
      filterCards(pill.dataset.filter);
      document.getElementById("paquetes")?.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---- Consulta form ------------------------------------ */
  const consultaForm = document.getElementById("consultaForm");
  consultaForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = consultaForm.querySelector("[name='nombre']").value.trim();
    const email  = consultaForm.querySelector("[name='email']").value.trim();
    if (!nombre || !email) return;

    const btn = consultaForm.querySelector(".ag-form__submit");
    btn.innerHTML = "¡Consulta enviada! ✓";
    btn.style.background = "#25D366";
    btn.disabled = true;

    setTimeout(() => {
      consultaForm.reset();
      btn.innerHTML = `Enviar consulta <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      btn.style.background = "";
      btn.disabled = false;
    }, 3500);
  });

  /* ---- Entrance animation -------------------------------- */
  function applyEntranceAnim() {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = "1";
          entry.target.style.transform = "translateY(0)";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".ag-card").forEach((card, i) => {
      card.style.opacity    = "0";
      card.style.transform  = "translateY(24px)";
      card.style.transition = `opacity .5s var(--ease) ${i * 0.07}s, transform .5s var(--ease) ${i * 0.07}s, box-shadow .25s var(--ease)`;
      io.observe(card);
    });
  }

  /* ---- Helpers ------------------------------------------ */
  function escHtml(str = "") {
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function capFirst(str = "") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

});
