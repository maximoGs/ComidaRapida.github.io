/**
 * ============================================================================
 * ARCHIVO MAESTRO DE CONFIGURACIÓN CENTRAL DE LA TIENDA (config.js)
 * FUEGO BURGER • FAST FOOD, SMASH BURGERS & CRISPY CHICKEN
 * ============================================================================
 */

const STORE_CONFIG = {
  // --------------------------------------------------------------------------
  // 1. IDENTIDAD DE MARCA Y COMERCIO
  // --------------------------------------------------------------------------
  brand: {
    name: "Fuego Burger",
    tagline: "Smash Burgers, Crispy Chicken & Loaded Fries",
    shortDescription: "Hamburguesas smash artesanales de doble cocción, papas volcán cheddar & bacon, tiras de crispy chicken y combos explosivos. ¡Pedí directo por WhatsApp y te llega al instante!",
    logoUrl: "assets/logo.svg",
    logoText: "FUEGO",
    logoSubtext: "BURGER & FAST FOOD",
    businessType: "gastronomia",
    metaKeywords: "hamburguesas, smash burgers, comida rapida, papas con cheddar, delivery mendoza, pedidos whatsapp, burger gourmet, crispy chicken, combos burgers"
  },

  // --------------------------------------------------------------------------
  // 2. PALETA DE COLORES Y SISTEMA VISUAL (Rojos de comida rápida + Queso fundido)
  // --------------------------------------------------------------------------
  theme: {
    primary: "#e11d48",        // Rojo vibrante de comida rápida
    primaryLight: "#ff2a4b",   // Rojo fuego brillante (hover y acentos)
    accent: "#f59e0b",         // Amarillo dorado cheddar / mostaza
    accentLight: "#fbbf24",    // Acento dorado claro
    background: "#0d0a0c",     // Fondo general oscuro carbón / noche
    backgroundCard: "#161113", // Fondo de tarjetas de producto
    textColor: "#fff5f5",      // Texto principal de alto contraste
    textMuted: "#a89ca0"       // Texto secundario
  },

  // --------------------------------------------------------------------------
  // 3. DATOS DE CONTACTO Y VENTA DIRECTA POR WHATSAPP
  // --------------------------------------------------------------------------
  contact: {
    whatsappNumber: "5492612586004",
    whatsappDisplay: "+54 9 2612 58-6004",
    phoneDisplay: "0261 258-6004",
    email: "pedidos@fuegoburger.com",
    instagram: "https://instagram.com/fuegoburger.mendoza",
    facebook: "",
    tiktok: ""
  },

  // --------------------------------------------------------------------------
  // 4. LOGÍSTICA, ENVÍOS Y PUNTOS DE RETIRO
  // --------------------------------------------------------------------------
  logistics: {
    enableDelivery: true,
    deliveryFee: 1800,
    deliveryFeeLabel: "Cadetería en moto express (caliente)",
    freeDeliveryThreshold: 22000, // Envío gratis superando este monto
    enablePickup: true,
    pickupAddress: "Av. San Martín 1420, M5500 Mendoza",
    pickupAddressShort: "Av. San Martín 1420, Mendoza",
    pickupMapsUrl: "https://maps.app.goo.gl/JSEvWcQvFY8zpxcH9",
    deliveryEstimateText: "Llega Caliente en 30-40'"
  },

  // --------------------------------------------------------------------------
  // 5. MEDIOS DE PAGO Y MONEDA
  // --------------------------------------------------------------------------
  payments: {
    currencySymbol: "$",
    currencyCode: "ARS",
    locale: "es-AR",
    cashDiscountPercent: 10,
    methods: [
      "Efectivo contra entrega (10% OFF en efectivo)",
      "Transferencia Bancaria / Mercado Pago (Alias al recibir)",
      "Tarjeta de Débito / Crédito al recibir (Posnet inalámbrico)"
    ]
  },

  // --------------------------------------------------------------------------
  // 6. HORARIOS DE ATENCIÓN (Turno noche y fines de semana)
  // --------------------------------------------------------------------------
  schedule: {
    weekdays: "Martes a Jueves: 19:30 a 00:30 hs",
    weekends: "Viernes a Domingos: 19:00 a 01:30 hs (Lunes cerrado por descanso)"
  },

  // --------------------------------------------------------------------------
  // 7. MÓDULOS ACTIVOS Y CUMPLIMIENTO LEGAL
  // --------------------------------------------------------------------------
  modules: {
    // Comida rápida es apta para todo público:
    enableAgeGate: false,
    
    // Botón de arrepentimiento obligatorio para e-commerce (Res. 424/2020):
    enableRegretButton: true,
    
    // Modal de términos y política de datos locales (Ley 25.326):
    enablePrivacyModal: true,
    
    // Barra superior de anuncios:
    enableAnnouncementBar: true,
    announcementText: "Av. San Martín 1420, Mendoza • Cocina Abierta",
    announcementBadge: "🔥 Delivery Caliente en 30-40 min",
    
    // Banner principal de portada (Hero):
    enableHeroSection: true,
    
    // Banner de promo destacada:
    enableFeaturedBanner: true
  },

  // --------------------------------------------------------------------------
  // 8. TEXTOS DEL BANNER PRINCIPAL (HERO)
  // --------------------------------------------------------------------------
  hero: {
    tag: "🔥 100% CARNE PREMIUM & PAN BRIOCHE ARTESANAL",
    titlePrefix: "Smash Burgers,",
    titleHighlight: "Papas Cheddar",
    titleSuffix: "& Combos Explosivos",
    description: "Carne de novillo smashada al punto exacto, crocante por fuera y jugosa por dentro, con abundante queso cheddar fundido y panceta ahumada. ¡Hacé tu pedido directo al WhatsApp y te llega al instante!",
    feature1Icon: "fa-solid fa-fire",
    feature1Text: "Smash a la Plancha",
    feature2Icon: "fa-solid fa-motorcycle",
    feature2Text: "Llega Caliente 35'",
    feature3Icon: "fa-solid fa-cheese",
    feature3Text: "Cheddar Real Fundido",
    primaryCtaText: "Ver Menú & Pedir",
    secondaryCtaText: "Combos en Promo 🔥",
    featuredCard: {
      tag: "LA MÁS PEDIDA 🔥",
      title: "Fuego Doble Smash",
      price: "$8.900",
      oldPrice: "$10.500",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80"
    }
  },

  // --------------------------------------------------------------------------
  // 9. BANNER DESTACADO / PROMO DE LA CASA
  // --------------------------------------------------------------------------
  featuredBanner: {
    badge: "💥 MEGA PROMO DE LA CASA",
    location: "Cocina Fuego • Mendoza",
    title: "Combo Fuego Box para 2 (Burger + Papas + Bebida)",
    description: "Incluye 2 Hamburguesas Doble Smash a elección + 1 Porción Mega de Papas Volcán bañadas en Cheddar & Bacon + 2 Bebidas heladas de 500ml. Ahorrá un 25% y disfrutá la mejor noche de burgers.",
    noticeIcon: "fa-solid fa-clock-rotate-left",
    noticeTitle: "Tiempo récord de elaboración:",
    noticeText: "Sale de la plancha en menos de 20 minutos con empaque térmico para que llegue crujiente.",
    whatsappLink: "https://wa.me/5492612586004?text=Hola%20Fuego%20Burger!%20Quiero%20pedir%20la%20Mega%20Promo%20Combo%20Box%20para%202.",
    btnText: "Pedir Combo Dúo por WhatsApp",
    btnHint: "Válido para delivery o retiro en mostrador"
  },

  // --------------------------------------------------------------------------
  // 10. CATEGORÍAS Y SUBCATEGORÍAS DINÁMICAS
  // --------------------------------------------------------------------------
  categories: [
    {
      id: "burgers",
      name: "Hamburguesas",
      icon: "fa-solid fa-burger",
      title: "Hamburguesas & Smash Gourmet",
      subtitle: "Medallones 100% novillo seleccionados, pan brioche suave y combinaciones épicas",
      subcategories: [
        { id: "all", label: "🍔 Todas las Burgers" },
        { id: "smash", label: "🔥 Doble Smash" },
        { id: "bacon-cheese", label: "🥓 Bacon & Cheddar" },
        { id: "pollo-crispy", label: "🍗 Crispy Chicken" },
        { id: "veggie", label: "🌱 Veggie & Not Burger" }
      ]
    },
    {
      id: "combos",
      name: "Combos & Promos",
      icon: "fa-solid fa-fire-flame-curved",
      title: "Combos con Papas y Bebida",
      subtitle: "Ahorrá hasta un 25% en nuestros combos individuales, dúos y cajas para amigos",
      subcategories: [
        { id: "all", label: "⚡ Todos los Combos" },
        { id: "individuales", label: "🍔 Combos Individuales" },
        { id: "para-compartir", label: "👫 Dúos & Para Compartir" },
        { id: "boxes", label: "📦 Mega Boxes" }
      ]
    },
    {
      id: "papas-snacks",
      name: "Papas & Snacks",
      icon: "fa-solid fa-bowl-food",
      title: "Papas Fritas & Snacks Crocantes",
      subtitle: "Papas bastón doble cocción, aros de cebolla rebozados, mozzarella sticks y nuggets",
      subcategories: [
        { id: "all", label: "🍟 Todos los Acompañamientos" },
        { id: "papas-cargadas", label: "🧀 Papas con Cheddar & Bacon" },
        { id: "clasicas-rusticas", label: "🥔 Clásicas & Rústicas" },
        { id: "snack-bites", label: "🍗 Nuggets, Aros & Sticks" }
      ]
    },
    {
      id: "hotdogs-lomitos",
      name: "Hot Dogs & Lomos",
      icon: "fa-solid fa-hotdog",
      title: "Hot Dogs XL & Sandwiches",
      subtitle: "Panchos alemanes con toppings abundantes, lomitos completos y milanesas gourmet",
      subcategories: [
        { id: "all", label: "🌭 Todos los Sandwiches" },
        { id: "hotdogs", label: "🌭 Hot Dogs Gourmet" },
        { id: "lomitos", label: "🥩 Lomitos & Milanesas" }
      ]
    },
    {
      id: "bebidas-postres",
      name: "Bebidas & Shakes",
      icon: "fa-solid fa-cup-straw",
      title: "Bebidas Heladas & Milkshakes",
      subtitle: "Gaseosas bien frías, cervezas artesanales, milkshakes cremosos y chocotortas",
      subcategories: [
        { id: "all", label: "🥤 Todas las Bebidas" },
        { id: "gaseosas-aguas", label: "🥤 Gaseosas & Cervezas" },
        { id: "shakes-postres", label: "🍦 Milkshakes & Postres" }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 11. SISTEMA DE PROMOCIÓN REFERIDA & CUPONES
  // --------------------------------------------------------------------------
  referrals: {
    enabled: true,
    urlParam: "ref",
    storageKey: "tienda_referral_code",
    defaultDiscountPercent: 5,
    activeCodes: {
      "FUEGO10": { label: "10% OFF Bienvenida", discount: 10, promoter: "Promo Apertura Fuego" },
      "BURGERAMIGOS": { label: "5% OFF Amigos", discount: 5, promoter: "Club de Amigos Fuego" },
      "DELIVERYYA": { label: "5% OFF Delivery Express", discount: 5, promoter: "Promo Directa Web" }
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = STORE_CONFIG;
}
