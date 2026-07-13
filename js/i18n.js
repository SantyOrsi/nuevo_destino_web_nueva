/* =========================================================
   NUEVO DESTINO VIAJES — i18n.js
   Diccionario y lógica de traducción ES / EN
   Los textos se aplican via innerHTML para permitir
   resaltados (<span class="accent">) dentro de la traducción.
   ========================================================= */

const i18n = {
  es: {
    topbar_schedule: "Lunes a viernes de 09 a 17 hs | Sábado de 09 a 13 hs · Línea de contacto (0341) 334-1317 / 307-9587",
    topbar_address: "Blvd. 27 de Febrero 2265, S2001 Rosario, Santa Fe",

    nav_empresa: "La empresa",
    nav_empresa_quienes: "Quiénes somos",
    nav_empresa_flota: "Nuestra flota",
    nav_empresa_trabaja: "Trabajá con nosotros",
    nav_traslado: "Traslados",
    nav_agencia: "Agencia",
    nav_contacto: "Contacto",
    nav_cta: "Datos",

    hero_badge: "Grupo argentino · más de 15 años",
    hero_line1: "Más de 56.000 viajes.",
    hero_line2: "Una sola promesa:",
    hero_line3: "Llevarte bien.",
    hero_quote: "“Vos lo elegís, nosotros te llevamos.”",
    hero_btn_traslados: "Ver traslados",
    hero_btn_paquetes: "Ver paquetes →",

    stat1_label: "Clientes contentos",
    stat2_label: "Unidades",
    stat3_label: "Viajes realizados",

    ticker_1: "Turismo nacional",
    ticker_2: "Turismo internacional",
    ticker_3: "Traslado empresarial",
    ticker_4: "Eventos & sociales",
    ticker_5: "Logística empresarial",
    ticker_6: "Flota propia",
    ticker_7: "Monitoreo satelital 24/7",

    about_eyebrow: "Quiénes somos",
    about_title: 'Una empresa <span class="accent">familiar</span> que creció sin perder sus valores.',
    about_text: "Grupo Nuevo Destino nació en Rosario como una idea familiar y hoy es una organización profesional con infraestructura propia, tecnología de monitoreo y un equipo comprometido con cada servicio.<br><br>Dos áreas especializadas —traslados y turismo— que comparten la misma filosofía: hacer bien lo que hacemos, con la persona en el centro de cada decisión.",

    about_item1_title: "Compromiso con el servicio",
    about_item1_text: "Cada traslado es una responsabilidad. Experiencias seguras y puntuales en cada viaje, sin excepciones.",
    about_item2_title: "Seguridad y confiabilidad",
    about_item2_text: "Operamos bajo altos estándares, priorizando la seguridad en cada servicio que brindamos.",
    about_item3_title: "Cercanía y trato humano",
    about_item3_text: "Espíritu familiar, vínculos genuinos y atención personalizada. Nos importa quién viaja.",
    about_item4_title: "Profesionalismo operativo",
    about_item4_text: "Infraestructura propia, tecnología y experiencia para soluciones eficientes y escalables.",

    branch1_eyebrow_small: "Área 01 — Movilidad",
    branch1_title: "Nuevo Destino Traslados",
    branch1_subtitle: "Traslado corporativo",
    branch1_text: "Transporte corporativo, ejecutivo y grupal. Flota propia, monitoreo satelital y soporte 24/7.",
    branch1_tag1: "Corporativo",
    branch1_tag2: "VIP Premium",
    branch1_tag3: "Grupos",
    branch1_tag4: "Eventos",
    branch1_cta: "Ver todos los traslados →",

    branch2_eyebrow_big: "Agencia",
    branch2_eyebrow_small: "Área 02 — Turismo",
    branch2_title: "Nuevo Destino Viajes",
    branch2_text: "Agencia tradicional. Paquetes nacionales e internacionales, agencia y viajes grupales.",
    branch2_tag1: "Nacional",
    branch2_tag2: "Internacional",
    branch2_tag3: "Grupal",
    branch2_cta: "Ver todos los paquetes →",

    footer_desc: "Una empresa familiar de Rosario dedicada a traslados y turismo, con infraestructura propia y un equipo comprometido con cada viaje.",
    footer_col1_title: "Empresa",
    footer_col2_title: "Servicios",
    footer_col3_title: "Contacto",

    // --- Agencia ---
    ag_badge:         "Agencia habilitada · Turismo nacional e internacional",
    ag_line1:         "Viajá con",
    ag_line2:         "<em>quienes saben</em>",
    ag_line3:         "hacerlo.",
    ag_desc:          "Paquetes nacionales e internacionales y viajes grupales.<br>Armamos cada itinerario a medida, con el respaldo de más de 15 años de experiencia.",
    ag_btn_paquetes:  "Ver paquetes",
    ag_btn_consultar: "Consultar un viaje",
    ag_pill_intl:     "Internacional",
    ag_pill_nac:      "Nacional",
    ag_pill_grp:      "Grupal",
    ag_paq_eyebrow:   "Nuestros destinos",
    ag_paq_title:     "Paquetes",
    ag_paq_title2:    "disponibles",
    ag_tab_todos:     "Todos",
    ag_tab_nac:       "Nacional",
    ag_tab_intl:      "Internacional",
    ag_tab_grp:       "Grupal",
    ag_form_eyebrow:  "Armamos tu viaje",
    ag_form_title:    "¿Tenés un destino",
    ag_form_title2:   "en mente?",
    ag_form_desc:     "Contanos a dónde querés ir y te armamos un itinerario a medida. Sin costo y sin compromiso.",
    ag_ph_nombre:     "Tu nombre",
    ag_ph_email:      "Tu email",
    ag_ph_tel:        "Teléfono (opcional)",
    ag_ph_msg:        "Contanos tu idea de viaje, fechas, destino...",
    ag_sel_tipo:      "Tipo de viaje",
    ag_form_submit:   "Enviar consulta",
    footer_rights: "© 2026 Nuevo Destino Viajes. Todos los derechos reservados.",
    footer_madeby: "Rosario, Santa Fe, Argentina",
    whatsapp_aria: "Escribinos por WhatsApp al +54 9 3413 34-1317",
  },

  en: {
    topbar_schedule: "Monday to Friday 9 am – 7 pm | Saturday 9 am – 12 pm · Phone (0341) 334-1317 / 507-9587",
    topbar_address: "Blvd. 27 de Febrero 2265, S2001 Rosario, Santa Fe",

    nav_empresa: "Company",
    nav_empresa_quienes: "About us",
    nav_empresa_flota: "Our fleet",
    nav_empresa_trabaja: "Work with us",
    nav_traslado: "Transfers",
    nav_agencia: "Travel agency",
    nav_contacto: "Contact",
    nav_cta: "Get in touch",

    hero_badge: "Argentine group · 15+ years",
    hero_line1: "Over 56,000 trips.",
    hero_line2: "Just one promise:",
    hero_line3: "Getting you there well.",
    hero_quote: "“You choose where, we take you there.”",
    hero_btn_traslados: "View transfers",
    hero_btn_paquetes: "View packages →",

    stat1_label: "Happy clients",
    stat2_label: "Vehicles",
    stat3_label: "Trips completed",

    ticker_1: "Domestic tourism",
    ticker_2: "International tourism",
    ticker_3: "Corporate transfers",
    ticker_4: "Events & social trips",
    ticker_5: "Corporate logistics",
    ticker_6: "Own fleet",
    ticker_7: "24/7 satellite tracking",

    about_eyebrow: "About us",
    about_title: 'A <span class="accent">family</span> business that grew without losing its values.',
    about_text: "Grupo Nuevo Destino started in Rosario as a family idea and is now a professional organization with its own infrastructure, tracking technology and a team committed to every service.<br><br>Two specialized areas —transfers and tourism— that share the same philosophy: doing things right, with the traveler at the center of every decision.",

    about_item1_title: "Commitment to service",
    about_item1_text: "Every transfer is a responsibility. Safe, on-time experiences on every trip, no exceptions.",
    about_item2_title: "Safety and reliability",
    about_item2_text: "We operate under high standards, prioritizing safety in every service we provide.",
    about_item3_title: "Closeness and human touch",
    about_item3_text: "Family spirit, genuine relationships and personalized attention. Who's traveling matters to us.",
    about_item4_title: "Operational professionalism",
    about_item4_text: "Our own infrastructure, technology and experience for efficient, scalable solutions.",

    branch1_eyebrow_small: "Area 01 — Mobility",
    branch1_title: "Nuevo Destino Transfers",
    branch1_subtitle: "Corporate transfers",
    branch1_text: "Corporate, executive and group transportation. Own fleet, satellite tracking and 24/7 support.",
    branch1_tag1: "Corporate",
    branch1_tag2: "VIP Premium",
    branch1_tag3: "Groups",
    branch1_tag4: "Events",
    branch1_cta: "View all transfers →",

    branch2_eyebrow_big: "Travel agency",
    branch2_eyebrow_small: "Area 02 — Tourism",
    branch2_title: "Nuevo Destino Viajes",
    branch2_text: "Traditional travel agency. Domestic and international packages, agency bookings and group trips.",
    branch2_tag1: "Domestic",
    branch2_tag2: "International",
    branch2_tag3: "Group",
    branch2_cta: "View all packages →",

    footer_desc: "A family business from Rosario dedicated to transfers and tourism, with its own infrastructure and a team committed to every trip.",
    footer_col1_title: "Company",
    footer_col2_title: "Services",
    footer_col3_title: "Contact",

    // --- Agencia ---
    ag_badge:         "Licensed Agency · National and International Tourism",
    ag_line1:         "Travel with",
    ag_line2:         "<em>those who know how.</em>",
    ag_line3:         "",
    ag_desc:          "National and international packages and group trips.<br>We craft every itinerary to fit you, backed by over 15 years of experience.",
    ag_btn_paquetes:  "View packages",
    ag_btn_consultar: "Plan a trip",
    ag_pill_intl:     "International",
    ag_pill_nac:      "National",
    ag_pill_grp:      "Group",
    ag_paq_eyebrow:   "Our destinations",
    ag_paq_title:     "Available",
    ag_paq_title2:    "packages",
    ag_tab_todos:     "All",
    ag_tab_nac:       "National",
    ag_tab_intl:      "International",
    ag_tab_grp:       "Group",
    ag_form_eyebrow:  "We'll plan your trip",
    ag_form_title:    "Got a destination",
    ag_form_title2:   "in mind?",
    ag_form_desc:     "Tell us where you want to go and we'll build a custom itinerary. No cost, no commitment.",
    ag_ph_nombre:     "Your name",
    ag_ph_email:      "Your email",
    ag_ph_tel:        "Phone (optional)",
    ag_ph_msg:        "Tell us your trip idea, dates, destination...",
    ag_sel_tipo:      "Trip type",
    ag_form_submit:   "Send inquiry",
    footer_rights: "© 2026 Nuevo Destino Viajes. All rights reserved.",
    footer_madeby: "Rosario, Santa Fe, Argentina",
    whatsapp_aria: "Message us on WhatsApp at +54 9 3413 34-1317",
  }
};

const STORAGE_KEY = "ndv_lang";

function applyLanguage(lang) {
  const dict = i18n[lang] || i18n.es;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (dict[key] !== undefined) {
      el.setAttribute("aria-label", dict[key]);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] !== undefined) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  document.documentElement.setAttribute("lang", lang === "en" ? "en" : "es");

  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-lang-btn") === lang);
  });

  try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* almacenamiento no disponible */ }
}

function initLanguage() {
  let saved = "es";
  try { saved = localStorage.getItem(STORAGE_KEY) || "es"; } catch (e) { /* almacenamiento no disponible */ }

  applyLanguage(saved);

  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang-btn");
      applyLanguage(lang);
    });
  });
}

document.addEventListener("DOMContentLoaded", initLanguage);
