# Nuevo Destino Viajes — Sitio Web

Sitio web institucional de **Grupo Nuevo Destino Viajes** (Rosario, Argentina).  
Stack: HTML5 · CSS3 · Vanilla JS · sin dependencias externas.

---

## Estructura del proyecto

```
nuevo-destino-viajes/
├── index.html              # Home
├── traslado.html           # Sección Traslado
├── agencia.html            # Sección Agencia (turismo)
├── admin.html              # Panel administrador (paquetes CRUD)
│
├── assets/
│   └── img/
│       ├── hero-flota.jpg              # Foto flota (hero)
│       └── logo-nuevo-destino.png      # Logo con fondo transparente
│
├── css/
│   ├── main.css                # Variables, reset, componentes globales
│   └── pages/
│       ├── home.css            # Estilos exclusivos de index.html
│       ├── traslado.css        # Estilos exclusivos de traslado.html
│       ├── agencia.css         # Estilos exclusivos de agencia.html
│       └── admin.css           # Estilos del panel admin
│
└── js/
    ├── i18n.js                 # Traducción ES / EN
    ├── main.js                 # Navbar, ticker, comportamientos globales
    ├── agencia.js              # Filtro paquetes, modal login, form consulta
    └── admin.js                # CRUD paquetes con localStorage
```

---

## Páginas

| Página | URL | Descripción |
|---|---|---|
| Home | `/index.html` | Landing principal con hero, quiénes somos y cards de áreas |
| Traslado | `/traslado.html` | Servicios de traslado corporativo y especiales |
| Agencia | `/agencia.html` | Paquetes turísticos con filtros y form de consulta |
| Admin | `/admin.html` | Panel privado para cargar/editar paquetes |

---

## Acceso admin (demo)

Desde cualquier página de **Agencia** → botón **Admin** (topbar izquierda).

```
Usuario : admin@nuevodestino.com
Password: NuevoDestino2026!
```

> ⚠️ Cambiar estas credenciales y conectar con un backend real antes del deploy en producción.  
> Los paquetes se persisten en `localStorage` del navegador (solo frontend).

---

## Deploy

El proyecto es estático — funciona en cualquier hosting:

- **Cloudflare Pages**: conectar repo GitHub → branch `main` → build command vacío → output `/`
- **Netlify**: drag & drop de la carpeta o conectar repo
- **GitHub Pages**: Settings → Pages → `main` branch → `/root`

---

## Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| `--yellow` | `#F5C400` | Acento principal |
| `--yellow-dark` | `#D9AE00` | Hover / textos sobre amarillo |
| `--black` | `#1A1A1A` | Texto base |
| `--ink` | `#0E0E0E` | Fondos oscuros, navbar |
| `--gray-50` | `#F7F7F5` | Fondos sección |
| `--gray-700` | `#4A4A47` | Texto secundario |

---

## Tipografías (Google Fonts)

- **Barlow Condensed** 500/600/700/800 — Titulares, nav, badges
- **Barlow** 400/500/600 — Cuerpo de texto
- **Playfair Display** 700 (regular + italic) — Cards premium, agencia hero

---

## Roadmap

- [ ] Backend real para paquetes (Firebase / Supabase)
- [ ] Autenticación segura para admin (JWT / Firebase Auth)
- [ ] Página de paquete individual (`paquete.html?id=X`)
- [ ] Integración Mercado Pago para reservas online
- [ ] SEO: Open Graph, sitemap.xml, schema.org

---

**Desarrollo**: DEF UX Team — SantyOrsi  
**Cliente**: Grupo Nuevo Destino Viajes, Rosario, Santa Fe, Argentina
