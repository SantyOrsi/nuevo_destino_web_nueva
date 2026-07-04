/* =========================================================
   NUEVO DESTINO VIAJES — js/admin.js
   CRUD de paquetes con Firestore.
   firebase-config.js debe cargarse antes que este script.
   ========================================================= */

/* ---- Auth: DESACTIVADO temporalmente para desarrollo ----
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "agencia.html";
  } else {
    document.getElementById("adm-username-display").textContent =
      user.email || "Administrador";
    initPanel();
  }
});
*/

// MODO DESARROLLO: entrar directo sin login
initPanel();

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  auth.signOut().then(() => { window.location.href = "agencia.html"; });
});

/* ---- Init panel ----------------------------------------- */
function initPanel() {
  listenPackages();
  initModal();
  initForm();
}

/* ---- Render en tiempo real (onSnapshot) ------------------ */
function listenPackages() {
  PAQUETES_COL.orderBy("createdAt", "desc").onSnapshot(
    (snapshot) => {
      const list = snapshot.docs.map(doc => ({ firestoreId: doc.id, ...doc.data() }));
      renderTable(list);
      updateStats(list);
    },
    (err) => console.error("Firestore error:", err)
  );
}

/* ---- Stats ----------------------------------------------- */
function updateStats(list) {
  const activos       = list.filter(p => p.estado === "activo");
  const internacionales = list.filter(p => p.categoria === "internacional").length;
  const nacionales    = list.filter(p => p.categoria === "nacional").length;

  setText("statTotal",          activos.length);
  setText("statInternacional",  internacionales);
  setText("statNacional",       nacionales);
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ---- Render table ---------------------------------------- */
function renderTable(list) {
  const body = document.getElementById("packagesBody");
  if (!body) return;

  if (list.length === 0) {
    body.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--gray-500)">
      Sin paquetes todavía. Creá el primero con el botón de arriba.
    </td></tr>`;
    return;
  }

  body.innerHTML = list.map(pkg => `
    <tr>
      <td class="adm-table__name">${escHtml(pkg.nombre)}</td>
      <td><span class="adm-cat-badge adm-cat-badge--${pkg.categoria}">${pkg.categoria}</span></td>
      <td>${escHtml(pkg.duracion || "—")}</td>
      <td class="adm-table__price">${escHtml(pkg.precio)}</td>
      <td><span class="adm-status adm-status--${pkg.estado}">
        ${pkg.estado === "activo" ? "Activo" : "Inactivo"}
      </span></td>
      <td>
        <div class="adm-table__actions">
          <button class="adm-icon-btn" onclick="editPackage('${pkg.firestoreId}')" title="Editar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button class="adm-icon-btn adm-icon-btn--delete" onclick="deletePackage('${pkg.firestoreId}', '${escHtml(pkg.nombre)}')" title="Eliminar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

/* ---- Edit ------------------------------------------------ */
window.editPackage = async function(firestoreId) {
  try {
    const doc = await PAQUETES_COL.doc(firestoreId).get();
    if (!doc.exists) return;
    const pkg = doc.data();

    document.getElementById("pkgFirestoreId").value  = firestoreId;
    document.getElementById("pkgNombre").value        = pkg.nombre       || "";
    document.getElementById("pkgCategoria").value     = pkg.categoria    || "";
    document.getElementById("pkgDuracion").value      = pkg.duracion     || "";
    document.getElementById("pkgPrecio").value        = pkg.precio       || "";
    document.getElementById("pkgDesc").value          = pkg.descripcion  || "";
    document.getElementById("pkgIncluye").value       = pkg.incluye      || "";
    document.getElementById("pkgEstado").value        = pkg.estado       || "activo";

    openModal("Editar paquete", "Actualizar");
  } catch (err) {
    console.error("Error al cargar paquete:", err);
    showToast("Error al cargar el paquete.", "error");
  }
};

/* ---- Delete ---------------------------------------------- */
window.deletePackage = async function(firestoreId, nombre) {
  if (!confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return;
  try {
    await PAQUETES_COL.doc(firestoreId).delete();
    showToast("Paquete eliminado.");
  } catch (err) {
    console.error("Error al eliminar:", err);
    showToast("Error al eliminar el paquete.", "error");
  }
};

/* ---- Modal ----------------------------------------------- */
function initModal() {
  document.getElementById("newPackageBtn")?.addEventListener("click", () => {
    document.getElementById("packageForm").reset();
    document.getElementById("pkgFirestoreId").value = "";
    openModal("Nuevo paquete", "Guardar paquete");
  });

  document.getElementById("modalClose")?.addEventListener("click",    closeModal);
  document.getElementById("packageBackdrop")?.addEventListener("click", closeModal);
  document.getElementById("cancelPackage")?.addEventListener("click",  closeModal);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !document.getElementById("packageModal").hidden) closeModal();
  });
}

function openModal(title, submitText) {
  document.getElementById("modalTitle").textContent   = title;
  document.getElementById("submitLabel").textContent  = submitText;
  document.getElementById("packageModal").hidden      = false;
  document.body.style.overflow = "hidden";
  document.getElementById("pkgNombre").focus();
}

function closeModal() {
  document.getElementById("packageModal").hidden = true;
  document.body.style.overflow = "";
  document.getElementById("packageForm").reset();
  document.getElementById("pkgFirestoreId").value = "";
}

/* ---- Form submit ----------------------------------------- */
function initForm() {
  document.getElementById("packageForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firestoreId = document.getElementById("pkgFirestoreId").value.trim();
    const nombre      = document.getElementById("pkgNombre").value.trim();
    const categoria   = document.getElementById("pkgCategoria").value;
    const precio      = document.getElementById("pkgPrecio").value.trim();

    if (!nombre || !categoria || !precio) {
      showToast("Completá los campos obligatorios (*).", "error");
      return;
    }

    const submitBtn   = document.getElementById("submitLabel");
    const original    = submitBtn.textContent;
    submitBtn.textContent = "Guardando...";

    const data = {
      nombre,
      categoria,
      duracion:    document.getElementById("pkgDuracion").value.trim(),
      precio,
      descripcion: document.getElementById("pkgDesc").value.trim(),
      incluye:     document.getElementById("pkgIncluye").value.trim(),
      estado:      document.getElementById("pkgEstado").value,
    };

    try {
      if (firestoreId) {
        // Actualizar existente
        await PAQUETES_COL.doc(firestoreId).update({
          ...data,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        showToast("Paquete actualizado ✓");
      } else {
        // Crear nuevo
        await PAQUETES_COL.add({
          ...data,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        showToast("Paquete creado ✓");
      }
      closeModal();
    } catch (err) {
      console.error("Error al guardar:", err);
      showToast("Error al guardar. Intentá de nuevo.", "error");
      submitBtn.textContent = original;
    }
  });
}

/* ---- Toast feedback -------------------------------------- */
function showToast(msg, type = "success") {
  const existing = document.querySelector(".adm-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `adm-toast adm-toast--${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("is-visible"));
  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

/* ---- Helpers --------------------------------------------- */
function escHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
