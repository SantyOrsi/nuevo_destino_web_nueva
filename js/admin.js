/* =========================================================
   NUEVO DESTINO VIAJES — js/admin.js
   CRUD de paquetes con Firestore + subida de archivos a Storage.
   Requiere firebase-config.js cargado antes.
   ========================================================= */

/* ---- MODO MOCK: probar sin Firebase conectado -----------
   Poné esto en true para trabajar con datos en memoria
   (no toca Firestore ni Storage para nada). Cuando quieras
   volver a la base real, poné MOCK_MODE = false. --------- */
const MOCK_MODE = true;

let _mockPaquetes = [];   // acá viven los paquetes mientras estás en modo mock
let _mockIdCounter = 1;

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

/* ---- Iniciar el panel ----------------------------------- */
function initPanel() {
  escucharPaquetes();
  initModal();
  initFormulario();
  initPreviews();
}

/* ---- Escuchar cambios en Firestore en tiempo real ------- */
function escucharPaquetes() {
  if (MOCK_MODE) {
    renderizarTabla(_mockPaquetes);
    actualizarStats(_mockPaquetes);
    return;
  }
  PAQUETES_COL.orderBy("createdAt", "desc").onSnapshot(
    (snapshot) => {
      const lista = snapshot.docs.map(doc => ({ firestoreId: doc.id, ...doc.data() }));
      renderizarTabla(lista);
      actualizarStats(lista);
    },
    (err) => console.error("Error Firestore:", err)
  );
}

/* ---- Stats ---------------------------------------------- */
function actualizarStats(lista) {
  const activos = lista.filter(p => p.estado === "activo").length;
  setText("statTotal",         activos);
  setText("statInternacional", lista.filter(p => p.categoria === "internacional").length);
  setText("statNacional",      lista.filter(p => p.categoria === "nacional").length);
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ---- Renderizar tabla ----------------------------------- */
function renderizarTabla(lista) {
  const body = document.getElementById("packagesBody");
  if (!body) return;

  if (lista.length === 0) {
    body.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--gray-500)">
      Sin paquetes todavía. Creá el primero con el botón de arriba.
    </td></tr>`;
    return;
  }

  body.innerHTML = lista.map(pkg => `
    <tr>
      <td class="adm-table__name">
        ${pkg.imagenUrl ? `<img src="${pkg.imagenUrl}" style="width:40px;height:40px;object-fit:cover;border-radius:6px;margin-right:8px;vertical-align:middle;">` : ""}
        ${escHtml(pkg.nombre)}
      </td>
      <td><span class="adm-cat-badge adm-cat-badge--${pkg.categoria}">${pkg.categoria}</span></td>
      <td>${escHtml(pkg.duracion || "—")}</td>
      <td class="adm-table__price">${escHtml(pkg.precio)}</td>
      <td>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <span class="adm-status adm-status--${pkg.estado}">${pkg.estado === "activo" ? "Activo" : "Inactivo"}</span>
          ${pkg.imagenUrl ? `<span class="adm-file-badge">📷</span>` : ""}
          ${pkg.pdfUrl    ? `<span class="adm-file-badge">📄</span>` : ""}
          ${pkg.flyerUrl  ? `<span class="adm-file-badge">🗺️</span>` : ""}
        </div>
      </td>
      <td>
        <div class="adm-table__actions">
          <button class="adm-icon-btn" onclick="editarPaquete('${pkg.firestoreId}')" title="Editar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button class="adm-icon-btn adm-icon-btn--delete" onclick="eliminarPaquete('${pkg.firestoreId}', '${escHtml(pkg.nombre)}')" title="Eliminar">
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

/* ---- Subir archivo a Firebase Storage ------------------- */
async function subirArchivo(archivo, ruta) {
  if (!archivo) return null;
  if (MOCK_MODE) {
    // En modo mock no tocamos Storage: usamos una URL local temporal
    // solo para poder previsualizar el archivo durante la prueba.
    return URL.createObjectURL(archivo);
  }
  const ref = storage.ref(ruta);
  await ref.put(archivo);
  return await ref.getDownloadURL();
}

/* ---- Guardar paquete (crear o actualizar) --------------- */
async function guardarPaquete(e) {
  e.preventDefault();

  const firestoreId = document.getElementById("pkgFirestoreId").value.trim();
  const nombre      = document.getElementById("pkgNombre").value.trim();
  const categoria   = document.getElementById("pkgCategoria").value;
  const precio      = document.getElementById("pkgPrecio").value.trim();

  if (!nombre || !categoria || !precio) {
    mostrarToast("Completá los campos obligatorios (*).", "error");
    return;
  }

  // Cambiar texto del botón mientras guarda
  const submitLabel = document.getElementById("submitLabel");
  const textoOriginal = submitLabel.textContent;
  submitLabel.textContent = "Guardando...";

  try {
    // Obtener archivos seleccionados
    const archivoImagen  = document.getElementById("pkgImagen").files[0];
    const archivoPdf     = document.getElementById("pkgPdf").files[0];
    const archivoFlyer   = document.getElementById("pkgFlyer").files[0];
    const urlImagenManual = document.getElementById("pkgImagenUrl").value.trim();

    // ID temporal para la ruta en Storage
    const idStorage = firestoreId || `temp_${Date.now()}`;

    // Subir archivos en paralelo (más rápido que uno atrás del otro)
    submitLabel.textContent = "Subiendo archivos...";

    const [imagenUrlSubida, pdfUrl, flyerUrl] = await Promise.all([
      archivoImagen ? subirArchivo(archivoImagen, `paquetes/${idStorage}/imagen`) : Promise.resolve(null),
      archivoPdf    ? subirArchivo(archivoPdf,    `paquetes/${idStorage}/itinerario`) : Promise.resolve(null),
      archivoFlyer  ? subirArchivo(archivoFlyer,  `paquetes/${idStorage}/flyer`) : Promise.resolve(null),
    ]);

    // La imagen tiene dos posibles fuentes: el archivo subido o la URL pegada a mano.
    // Si se subió un archivo, ese manda; si no, se usa la URL manual (si había).
    let imagenUrl = null;
    if (archivoImagen) {
      imagenUrl = imagenUrlSubida;
    } else if (urlImagenManual) {
      imagenUrl = urlImagenManual;
    }

    // Armar objeto con los datos (solo incluir URLs si se subieron archivos nuevos)
    const datos = {
      nombre,
      categoria,
      duracion:    document.getElementById("pkgDuracion").value.trim(),
      precio,
      descripcion: document.getElementById("pkgDesc").value.trim(),
      incluye:     document.getElementById("pkgIncluye").value.trim(),
      estado:      document.getElementById("pkgEstado").value,
      updatedAt:   MOCK_MODE ? new Date() : firebase.firestore.FieldValue.serverTimestamp(),
    };

    if (imagenUrl) datos.imagenUrl = imagenUrl;
    if (pdfUrl)    datos.pdfUrl    = pdfUrl;
    if (flyerUrl)  datos.flyerUrl  = flyerUrl;

    if (MOCK_MODE) {
      if (firestoreId) {
        // Actualizar paquete existente en la lista mock
        const idx = _mockPaquetes.findIndex(p => p.firestoreId === firestoreId);
        if (idx !== -1) _mockPaquetes[idx] = { ..._mockPaquetes[idx], ...datos };
        mostrarToast("Paquete actualizado ✓ (mock)");
      } else {
        // Crear paquete nuevo en la lista mock
        _mockPaquetes.unshift({
          firestoreId: `mock_${_mockIdCounter++}`,
          ...datos,
          createdAt: new Date(),
        });
        mostrarToast("Paquete creado ✓ (mock)");
      }
      renderizarTabla(_mockPaquetes);
      actualizarStats(_mockPaquetes);
    } else if (firestoreId) {
      // Actualizar paquete existente
      await PAQUETES_COL.doc(firestoreId).update(datos);
      mostrarToast("Paquete actualizado ✓");
    } else {
      // Crear paquete nuevo
      await PAQUETES_COL.add({
        ...datos,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      mostrarToast("Paquete creado ✓");
    }

    cerrarModal();

  } catch (err) {
    console.error("Error al guardar:", err);
    mostrarToast("Error al guardar. Intentá de nuevo.", "error");
    submitLabel.textContent = textoOriginal;
  }
}

/* ---- Editar paquete ------------------------------------- */
window.editarPaquete = async function(firestoreId) {
  try {
    let pkg;
    if (MOCK_MODE) {
      pkg = _mockPaquetes.find(p => p.firestoreId === firestoreId);
      if (!pkg) return;
    } else {
      const doc = await PAQUETES_COL.doc(firestoreId).get();
      if (!doc.exists) return;
      pkg = doc.data();
    }

    document.getElementById("pkgFirestoreId").value = firestoreId;
    document.getElementById("pkgNombre").value      = pkg.nombre       || "";
    document.getElementById("pkgCategoria").value   = pkg.categoria    || "";
    document.getElementById("pkgDuracion").value    = pkg.duracion     || "";
    document.getElementById("pkgPrecio").value      = pkg.precio       || "";
    document.getElementById("pkgDesc").value        = pkg.descripcion  || "";
    document.getElementById("pkgIncluye").value     = pkg.incluye      || "";
    document.getElementById("pkgEstado").value      = pkg.estado       || "activo";
    document.getElementById("pkgImagenUrl").value   = pkg.imagenUrl    || "";

    // Mostrar previews de archivos existentes
    mostrarPreviewUrl("previewImagen", pkg.imagenUrl, "imagen");
    mostrarPreviewUrl("previewPdf",    pkg.pdfUrl,    "pdf");
    mostrarPreviewUrl("previewFlyer",  pkg.flyerUrl,  "flyer");

    abrirModal("Editar paquete", "Actualizar");
  } catch (err) {
    console.error("Error al cargar paquete:", err);
    mostrarToast("Error al cargar el paquete.", "error");
  }
};

/* ---- Eliminar paquete ----------------------------------- */
window.eliminarPaquete = async function(firestoreId, nombre) {
  if (!confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return;
  try {
    if (MOCK_MODE) {
      _mockPaquetes = _mockPaquetes.filter(p => p.firestoreId !== firestoreId);
      renderizarTabla(_mockPaquetes);
      actualizarStats(_mockPaquetes);
      mostrarToast("Paquete eliminado. (mock)");
      return;
    }
    await PAQUETES_COL.doc(firestoreId).delete();
    mostrarToast("Paquete eliminado.");
  } catch (err) {
    console.error("Error al eliminar:", err);
    mostrarToast("Error al eliminar el paquete.", "error");
  }
};

/* ---- Preview de archivos seleccionados ------------------ */
function initPreviews() {
  configurarPreview("pkgImagen", "previewImagen", "imagen");
  configurarPreview("pkgPdf",    "previewPdf",    "pdf");
  configurarPreview("pkgFlyer",  "previewFlyer",  "flyer");
  configurarPreviewUrlManual();
}

/* ---- Preview en vivo de la URL de imagen pegada manualmente ---- */
function configurarPreviewUrlManual() {
  const input = document.getElementById("pkgImagenUrl");
  if (!input) return;

  input.addEventListener("input", () => {
    const url = input.value.trim();
    const preview = document.getElementById("previewImagen");
    if (!preview) return;

    // Si hay un archivo seleccionado, ese preview manda; no lo pisamos.
    if (document.getElementById("pkgImagen").files[0]) return;

    if (url) {
      preview.innerHTML = `<img src="${url}" alt="preview" style="max-height:80px;border-radius:6px;margin-top:6px;" onerror="this.style.display='none'">`;
    } else {
      preview.innerHTML = "";
    }
  });
}

function configurarPreview(inputId, previewId, tipo) {
  const input = document.getElementById(inputId);
  if (!input) return;

  // Actualizar label con el nombre del archivo
  input.addEventListener("change", () => {
    const archivo = input.files[0];
    if (!archivo) return;

    const label = input.nextElementSibling;
    if (label) label.textContent = archivo.name;

    const preview = document.getElementById(previewId);
    if (!preview) return;

    if (tipo === "imagen" || (tipo === "flyer" && archivo.type.startsWith("image/"))) {
      const url = URL.createObjectURL(archivo);
      preview.innerHTML = `<img src="${url}" alt="preview" style="max-height:80px;border-radius:6px;margin-top:6px;">`;
    } else if (tipo === "pdf" || archivo.type === "application/pdf") {
      preview.innerHTML = `<span class="adm-file-ok">📄 ${archivo.name}</span>`;
    }
  });
}

function mostrarPreviewUrl(previewId, url, tipo) {
  const preview = document.getElementById(previewId);
  if (!preview || !url) return;

  if (tipo === "imagen" || tipo === "flyer") {
    preview.innerHTML = `<img src="${url}" alt="preview" style="max-height:80px;border-radius:6px;margin-top:6px;">
      <a href="${url}" target="_blank" style="font-size:12px;display:block;margin-top:4px;color:var(--gray-500)">Ver archivo actual</a>`;
  } else if (tipo === "pdf") {
    preview.innerHTML = `<a href="${url}" target="_blank" class="adm-file-ok">📄 Ver PDF actual</a>`;
  }
}

/* ---- Modal ---------------------------------------------- */
function initModal() {
  document.getElementById("newPackageBtn")?.addEventListener("click", () => {
    document.getElementById("packageForm").reset();
    document.getElementById("pkgFirestoreId").value = "";
    limpiarPreviews();
    abrirModal("Nuevo paquete", "Guardar paquete");
  });

  document.getElementById("modalClose")?.addEventListener("click",     cerrarModal);
  document.getElementById("packageBackdrop")?.addEventListener("click", cerrarModal);
  document.getElementById("cancelPackage")?.addEventListener("click",   cerrarModal);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !document.getElementById("packageModal").hidden) cerrarModal();
  });
}

function abrirModal(titulo, textoSubmit) {
  document.getElementById("modalTitle").textContent  = titulo;
  document.getElementById("submitLabel").textContent = textoSubmit;
  document.getElementById("packageModal").hidden     = false;
  document.body.style.overflow = "hidden";
  document.getElementById("pkgNombre").focus();
}

function cerrarModal() {
  document.getElementById("packageModal").hidden = true;
  document.body.style.overflow = "";
  document.getElementById("packageForm").reset();
  document.getElementById("pkgFirestoreId").value = "";
  limpiarPreviews();
}

function limpiarPreviews() {
  ["previewImagen", "previewPdf", "previewFlyer"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });
  ["wrapImagen", "wrapFlyer", "wrapPdf"].forEach(id => {
    const wrap = document.getElementById(id);
    if (wrap) {
      const label = wrap.querySelector(".adm-file-label");
      if (label) label.textContent = "Seleccionar archivo";
    }
  });
}

function initFormulario() {
  document.getElementById("packageForm")?.addEventListener("submit", guardarPaquete);
}

/* ---- Toast ---------------------------------------------- */
function mostrarToast(msg, tipo = "success") {
  const existente = document.querySelector(".adm-toast");
  if (existente) existente.remove();

  const toast = document.createElement("div");
  toast.className = `adm-toast adm-toast--${tipo}`;
  toast.textContent = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("is-visible"));
  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

/* ---- Helper --------------------------------------------- */
function escHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
