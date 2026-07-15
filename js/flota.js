/* =========================================================
   NUEVO DESTINO VIAJES — js/flota.js
   Datos de cada vehículo y lógica del modal de detalle.
   ========================================================= */

// Base de datos de vehículos con toda la info del catálogo
var VEHICULOS = {

  corolla: {
    tipo:    "Auto ejecutivo",
    nombre:  "Toyota Corolla SEG HEV",
    clase:   "flota-card__img--corolla",
    fotos: [
      "assets/img/flota/corolla/01.jpg",
      "assets/img/flota/corolla/02.jpg",
      "assets/img/flota/corolla/03.jpg",
      "assets/img/flota/corolla/04.jpg",
      "assets/img/flota/corolla/05.jpg"
    ],
    specs:   ["👥 Hasta 3 pasajeros", "🌿 Motor híbrido", "⭐ Línea SEG"],
    desc:    "Combina el máximo lujo de la línea SEG con tecnología híbrida. Garantiza un viaje silencioso, suave y amigable con el medio ambiente. Ideal para traslados ejecutivos, corporativos o privados donde la distinción y la sustentabilidad son prioridad.",
    features: [
      "Asientos de cuero premium",
      "Climatizador automático bizona",
      "Máxima insonorización de cabina",
      "Tecnología de seguridad de vanguardia",
      "Motor híbrido de bajo consumo"
    ]
  },

  mercedes_c: {
    tipo:    "Auto VIP",
    nombre:  "Mercedes-Benz Clase C",
    clase:   "flota-card__img--mercedes-c",
    fotos: [
      "assets/img/flota/mercedes/01.jpg",
      "assets/img/flota/mercedes/02.jpg",
      "assets/img/flota/mercedes/03.jpg",
      "assets/img/flota/mercedes/04.jpg",
      "assets/img/flota/mercedes05.jpg"
    ],
    specs:   ["👥 Hasta 3 pasajeros", "⭐ Alta gama", "🏆 VIP Premium"],
    desc:    "El estándar definitivo de elegancia y prestigio. Sedán de lujo ideal para pasajeros VIP, directivos o eventos especiales. Ofrece una experiencia de viaje superior con el inconfundible confort de Mercedes-Benz.",
    features: [
      "Interior premium con terminaciones de alta gama",
      "Climatización bizona",
      "Marcha de máximo confort",
      "Espacio y privacidad para el pasajero"
    ]
  },

  hiace: {
    tipo:    "Van ejecutiva",
    nombre:  "Toyota Hiace Wagon",
    clase:   "flota-card__img--hiace",
    fotos: [
      "assets/img/flota/hiace/01.jpg",
      "assets/img/flota/hiace/02.jpg",
      "assets/img/flota/hiace/03.jpg",
      "assets/img/flota/hiace/04.jpg",
      "assets/img/flota/hiace04.jpg"
    ],
    specs:   ["👥 7 pasajeros", "🎯 Grupos reducidos", "💼 Turismo VIP"],
    desc:    "Diseñada para el transporte VIP de grupos pequeños. Redefine el espacio interior ofreciendo butacas amplias y un andar excepcionalmente suave. Ideal para delegaciones, turismo receptivo o familias que buscan viajar en primera clase.",
    features: [
      "Amplio espacio entre butacas",
      "Climatización integral",
      "Fácil acceso para todos los pasajeros",
      "Ideal para aeropuertos y hoteles",
      "Maniobrabilidad en zonas urbanas"
    ]
  },

  transit: {
    tipo:    "Minibús 15 pasajeros",
    nombre:  "Ford Transit",
    clase:   "flota-card__img--transit",
    fotos: [
      "assets/img/flota/transit/01.jpg",
      "assets/img/flota/transit/02.jpg",
      "assets/img/flota/transit/03.jpg",
      "assets/img/flota/transit/04.jpg",
      "assets/img/flota/transit/05.jpg"
    ],
    specs:   ["👥 15 pasajeros", "✈️ Transfers", "🛣️ Media distancia"],
    desc:    "La opción más ágil y confiable para excursiones, traslados a aeropuertos y turismo regional. Interior optimizado para el confort de los pasajeros en trayectos cortos y medianos.",
    features: [
      "Asientos reclinables",
      "Aire acondicionado central",
      "Portaequipaje interior",
      "Ideal para grupos escolares y corporativos"
    ]
  },

  sprinter: {
    tipo:    "Minibús 19 pasajeros",
    nombre:  "Mercedes-Benz Sprinter",
    clase:   "flota-card__img--sprinter",
      fotos: [
      "assets/img/flota/sprinter/01.jpg",
      "assets/img/flota/sprinter/02.jpg",
      "assets/img/flota/sprinter/03.jpg",
      "assets/img/flota/sprinter/04.jpg",
      "assets/img/flota/sprinter/05.jpg"
    ],
    specs:   ["👥 19 pasajeros", "🏢 Corporativo", "🗺️ Media distancia"],
    desc:    "Un paso más en capacidad sin perder la agilidad de un minibús. Excelente para viajes corporativos, eventos y turismo de media distancia. Su chasis reforzado garantiza un viaje estable y placentero para contingentes medianos.",
    features: [
      "Asientos reclinables",
      "Portaequipajes interior",
      "Climatización optimizada",
      "Chasis reforzado Mercedes-Benz"
    ]
  },

  saldivia: {
    tipo:    "Minibús 24 pasajeros",
    nombre:  "Saldivia Minibús",
    clase:   "flota-card__img--saldivia",
      fotos: [
      "assets/img/flota/saldivia/01.jpg",
      "assets/img/flota/saldivia/02.jpg",
      "assets/img/flota/saldivia/03.jpg",
      "assets/img/flota/saldivia/04.jpg",
      "assets/img/flota/saldivia/05.jpg"
    ],
    specs:   ["👥 24 pasajeros", "🧳 Bodega amplia", "🔧 Mercedes-Benz"],
    desc:    "La combinación perfecta entre la mecánica confiable de Mercedes-Benz y el diseño de carrocerías Saldivia. Ideal para viajes de media distancia y excursiones turísticas, ofreciendo mayor amplitud y capacidad de bodega.",
    features: [
      "Butacas reclinables",
      "Pasillo amplio",
      "Bodega para equipaje",
      "Climatización frío/calor",
      "Mecánica Mercedes-Benz"
    ]
  },

  metalsur: {
    tipo:    "Bus interurbano",
    nombre:  "Carrocería Metalsur",
    clase:   "flota-card__img--metalsur",
      fotos: [
      "assets/img/flota/metalsur/01.jpg",
      "assets/img/flota/metalsur/02.jpg",
      "assets/img/flota/metalsur/03.jpg",
      "assets/img/flota/metalsur/04.jpg",
      "assets/img/flota/metalsur/05.jpg"
    ],
    specs:   ["👥 41 a 50 pasajeros", "🏫 Escolar/Institucional", "🛡️ Máxima seguridad"],
    desc:    "Diseñado especialmente para escuelas, clubes e instituciones. Ideal para salidas didácticas, excursiones escolares, traslados deportivos o eventos institucionales. Permite mover grandes grupos cuidando el presupuesto sin resignar confort.",
    features: [
      "Asientos reclinables",
      "Climatización integral frío/calor",
      "Cinturones de seguridad individuales en todos los asientos",
      "Configuraciones disponibles de 41 a 50 pasajeros"
    ]
  },

  comil: {
    tipo:    "Bus piso elevado",
    nombre:  "Carrocería Comil",
    clase:   "flota-card__img--comil",
      fotos: [
      "assets/img/flota/comil/01.jpg",
      "assets/img/flota/comil/02.jpg",
      "assets/img/flota/comil/03.jpg",
      "assets/img/flota/comil/04.jpg",
      "assets/img/flota/comil/05.jpg"
    ],
    specs:   ["👥 48 pasajeros", "💺 Semicama", "🛣️ Larga distancia"],
    desc:    "Pensado exclusivamente para disfrutar el trayecto en viajes de media y larga distancia. Ofrece todas las comodidades para que el pasajero se relaje por completo desde el punto de partida hasta el destino final.",
    features: [
      "Asientos semicama",
      "Baño a bordo",
      "Bar/cafetería a bordo",
      "Sistema de audio y video",
      "Climatización integral",
      "Amplias bodegas para equipaje"
    ]
  },

  marcopolo: {
    tipo:    "Bus doble piso 60 Mix",
    nombre:  "Marcopolo / Niccolo",
    clase:   "flota-card__img--marcopolo",
      fotos: [
      "assets/img/flota/marcopolo/01jpg",
      "assets/img/flota/marcopolo/02.jpg",
      "assets/img/flota/marcopolo/03.jpg",
      "assets/img/flota/marcopolo/04.jpg",
      "assets/img/flota/marcopolo/05.jpg"
    ],
    specs:   ["👥 60 pasajeros", "🛏️ Cama + Semicama", "🏆 Alta gama"],
    desc:    "El gigante de nuestra flota. Su configuración Mix permite ofrecer dos niveles de confort en un mismo vehículo (Cama y Semicama), siendo la solución definitiva para viajes largos de grandes contingentes, viajes de estudio o turismo masivo.",
    features: [
      "Doble piso con butacas Cama y Semicama",
      "Baño a bordo",
      "Servicio de bar",
      "Climatización frío/calor",
      "Sistema completo de audio y video",
      "Máximo espacio en bodegas"
    ]
  }

};

/* ---- Carrusel ------------------------------------------- */
var carouselIndex = 0;
var carouselFotos = [];

function iniciarCarrusel(fotos) {
  carouselFotos = fotos;
  carouselIndex = 0;

  var track = document.getElementById("carouselTrack");
  var dots  = document.getElementById("carouselDots");

  // Generar slides usando background-image (maneja mejor fotos portrait y landscape)
  track.innerHTML = fotos.map(function(src) {
    return '<div class="flota-carousel__slide" style="background-image:url(\'' + src + '\');background-size:cover;background-position:center;"></div>';
  }).join("");
  

  // Generar puntos
  dots.innerHTML = fotos.map(function(_, i) {
    return '<button class="flota-carousel__dot' + (i === 0 ? " is-active" : "") + '" onclick="irASlide(' + i + ')"></button>';
  }).join("");

  // Mostrar u ocultar botones si hay solo 1 foto
  var btnPrev = document.getElementById("carouselPrev");
  var btnNext = document.getElementById("carouselNext");
  btnPrev.style.display = fotos.length > 1 ? "" : "none";
  btnNext.style.display = fotos.length > 1 ? "" : "none";
  dots.style.display    = fotos.length > 1 ? "" : "none";

  actualizarCarrusel();
}

function actualizarCarrusel() {
  var track = document.getElementById("carouselTrack");
  track.style.transform = "translateX(-" + (carouselIndex * 100) + "%)";

  // Actualizar puntos activos
  document.querySelectorAll(".flota-carousel__dot").forEach(function(dot, i) {
    dot.classList.toggle("is-active", i === carouselIndex);
  });
}

window.irASlide = function(i) {
  carouselIndex = i;
  actualizarCarrusel();
};

document.getElementById("carouselPrev")?.addEventListener("click", function() {
  carouselIndex = (carouselIndex - 1 + carouselFotos.length) % carouselFotos.length;
  actualizarCarrusel();
});

document.getElementById("carouselNext")?.addEventListener("click", function() {
  carouselIndex = (carouselIndex + 1) % carouselFotos.length;
  actualizarCarrusel();
});

// Swipe táctil
var touchStartX = 0;
document.getElementById("flotaCarousel")?.addEventListener("touchstart", function(e) {
  touchStartX = e.changedTouches[0].screenX;
});
document.getElementById("flotaCarousel")?.addEventListener("touchend", function(e) {
  var diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 40) {
    if (diff > 0) {
      carouselIndex = (carouselIndex + 1) % carouselFotos.length;
    } else {
      carouselIndex = (carouselIndex - 1 + carouselFotos.length) % carouselFotos.length;
    }
    actualizarCarrusel();
  }
});

/* ---- Abrir modal ---------------------------------------- */
window.abrirModal = function(id) {
  var v = VEHICULOS[id];
  if (!v) return;

  var modal = document.getElementById("flotaModal");

  // Iniciar carrusel: si tiene fotos propias las usamos, sino mostramos el gradiente como imagen
  if (v.fotos && v.fotos.length > 0) {
    document.getElementById("flotaCarousel").className = "flota-carousel";
    iniciarCarrusel(v.fotos);
  } else {
    // Sin fotos: mostrar gradiente de color como fondo único slide
    document.getElementById("flotaCarousel").className = "flota-carousel flota-carousel--gradient " + v.clase;
    document.getElementById("carouselTrack").innerHTML = '<div class="flota-carousel__slide flota-carousel__slide--gradient"></div>';
    document.getElementById("carouselDots").innerHTML  = "";
    document.getElementById("carouselPrev").style.display = "none";
    document.getElementById("carouselNext").style.display = "none";
  }

  // Contenido del modal
  document.getElementById("modalTipo").textContent  = v.tipo;
  document.getElementById("modalTitle").textContent = v.nombre;
  document.getElementById("modalDesc").textContent  = v.desc;

  // Specs como pills
  document.getElementById("modalSpecs").innerHTML =
    v.specs.map(function(s) { return "<span>" + s + "</span>"; }).join("");

  // Lista de equipamiento
  document.getElementById("modalFeatures").innerHTML =
    v.features.map(function(f) { return "<li>• " + f + "</li>"; }).join("");

  // Link de WhatsApp con nombre del vehículo
  var mensaje = "Hola, quiero más información acerca de este vehículo: " + v.nombre;
  document.getElementById("modalCta").href =
    "https://wa.me/5493413341317?text=" + encodeURIComponent(mensaje);

  modal.hidden = false;
  document.body.style.overflow = "hidden";
};

/* ---- Cerrar modal --------------------------------------- */
function cerrarModal() {
  document.getElementById("flotaModal").hidden = true;
  document.body.style.overflow = "";
}

document.getElementById("modalClose")?.addEventListener("click", cerrarModal);
document.getElementById("modalBackdrop")?.addEventListener("click", cerrarModal);
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") cerrarModal();
});
