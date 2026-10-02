/**
 * ============================================================================
 * MOTOR DINÁMICO DE TIENDA Y COMERCIO (app.js)
 * Adaptable a cualquier tipo de negocio mediante config.js
 * ============================================================================
 */

// Resuelve la configuración activa desde config.js o valores de respaldo seguros
const ACTIVE_CONFIG = (typeof STORE_CONFIG !== "undefined") ? STORE_CONFIG : {
  brand: {
    name: "Paisana Bebidas",
    tagline: "Vinos de Autor & Bebidas Selectas",
    shortDescription: "Catálogo exclusivo de vinos, bebidas destiladas, mixers y snacks con entrega rápida. Hacé tu pedido directo por WhatsApp.",
    logoUrl: "assets/logo.svg",
    logoText: "PAISANA",
    logoSubtext: "BEBIDAS SELECTAS",
    businessType: "vinoteca"
  },
  theme: {
    primary: "#3ca1a4",
    primaryLight: "#58c6c9",
    accent: "#e5aa38",
    accentLight: "#f6be4e"
  },
  contact: {
    whatsappNumber: "5492612586004",
    whatsappDisplay: "+54 9 2612 58-6004",
    email: "ventas@paisanabebidas.com",
    instagram: "https://instagram.com"
  },
  logistics: {
    enableDelivery: true,
    deliveryFee: 2500,
    enablePickup: true,
    pickupAddress: "C. Tapón Moyano 1745, M5523 Mendoza",
    pickupMapsUrl: "https://maps.app.goo.gl/JSEvWcQvFY8zpxcH9",
    deliveryEstimateText: "Entrega Express 45'"
  },
  payments: {
    currencySymbol: "$",
    locale: "es-AR",
    methods: [
      "Transferencia Bancaria / Mercado Pago (Alias)",
      "Efectivo contra entrega (10% OFF)",
      "Tarjeta de Débito / Crédito al recibir"
    ]
  },
  schedule: {
    weekdays: "Lunes a Sábados: 10:00 a 00:00 hs",
    weekends: "Domingos: 17:00 a 23:00 hs"
  },
  modules: {
    enableAgeGate: true,
    enableRegretButton: true,
    enablePrivacyModal: true,
    enableAnnouncementBar: true,
    enableHeroSection: true,
    enableFeaturedBanner: true
  },
  categories: [
    {
      id: "vinos",
      name: "Vinos",
      icon: "fa-solid fa-wine-glass",
      title: "Vinos de Autor",
      subtitle: "Explorá nuestras mejores etiquetas seleccionadas por varietal",
      subcategories: [
        { id: "all", label: "🍷 Todos los Vinos" },
        { id: "malbec", label: "🍇 Malbec" },
        { id: "cabernet-sauvignon", label: "🍷 Cabernet Sauvignon" },
        { id: "blends", label: "✨ Blends & Cortes" },
        { id: "blancos-chardonnay", label: "🥂 Blancos & Chardonnay" },
        { id: "rosados", label: "🌸 Rosados" },
        { id: "espumantes", label: "🍾 Espumantes" }
      ]
    },
    {
      id: "bebidas",
      name: "Cervezas & Bebidas",
      icon: "fa-solid fa-beer-mug-empty",
      title: "Cervezas & Destilados",
      subtitle: "Cervezas con lúpulos seleccionados, aperitivos, gin premium y espirituosas",
      subcategories: [
        { id: "all", label: "🍺 Todas las Bebidas" },
        { id: "cervezas", label: "🌿 Cervezas & Lúpulos" },
        { id: "fernet-aperitivos", label: "🦅 Fernet & Aperitivos" },
        { id: "gin", label: "🌿 Gin Premium" },
        { id: "vodka", label: "🧊 Vodka" },
        { id: "whisky", label: "🥃 Whisky" }
      ]
    },
    {
      id: "sin-alcohol",
      name: "Bebidas sin Alcohol",
      icon: "fa-solid fa-bottle-water",
      title: "Bebidas sin Alcohol",
      subtitle: "Gaseosas, mixers especiales, tónicas, energizantes y aguas",
      subcategories: [
        { id: "all", label: "🥤 Todo Sin Alcohol" },
        { id: "gaseosas", label: "🥤 Gaseosas" },
        { id: "tonicas-mixers", label: "🫧 Tónicas & Mixers" },
        { id: "energizantes", label: "⚡ Energizantes" },
        { id: "aguas-jugos", label: "💧 Aguas & Jugos" }
      ]
    },
    {
      id: "snacks",
      name: "Snacks y Varios",
      icon: "fa-solid fa-bowl-food",
      title: "Snacks & Varios",
      subtitle: "Snacks crocantes, chocolates, hielo, descartables y super combos",
      subcategories: [
        { id: "all", label: "🍿 Todos los Snacks" },
        { id: "promos-combos", label: "🔥 Combos & Promos" },
        { id: "snacks-salados", label: "🥨 Snacks Salados" },
        { id: "chocolates-dulces", label: "🍫 Chocolates & Dulces" },
        { id: "hielo-descartables", label: "🧊 Hielo & Descartables" }
      ]
    }
  ]
};

// Generar mapa dinámico de subcategorías
function buildSubcategoriesMap(config) {
  const map = {};
  if (config.categories && Array.isArray(config.categories)) {
    config.categories.forEach((cat) => {
      map[cat.id] = {
        title: cat.title || cat.name,
        icon: cat.icon || "fa-solid fa-tag",
        subtitle: cat.subtitle || `Catálogo de ${cat.name}`,
        subchips: cat.subcategories || [{ id: "all", label: `✨ Todo en ${cat.name}` }]
      };
    });
  }
  return map;
}

const SUBCATEGORIES_MAP = buildSubcategoriesMap(ACTIVE_CONFIG);

// Categoría inicial: primera categoría de la lista o fallback
const initialCategory = (ACTIVE_CONFIG.categories && ACTIVE_CONFIG.categories.length > 0)
  ? ACTIVE_CONFIG.categories[0].id
  : "vinos";

// ==========================================================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ==========================================================================
const AppState = {
  currentCategory: initialCategory,
  currentSubcategory: "all",
  searchQuery: "",
  currentSort: "default",
  cart: [],
  deliveryMethod: "envio", // 'envio' o 'retiro'
  viewMode: localStorage.getItem("store_view_mode") || localStorage.getItem("paisana_view_mode") || "grid",
  referralCode: null,
  referralData: null
};

// ==========================================================================
// APLICACIÓN DE COLORES Y VARIABLES CSS DINÁMICAS
// ==========================================================================
function applyThemeColors() {
  if (!ACTIVE_CONFIG.theme) return;
  const root = document.documentElement;
  const t = ACTIVE_CONFIG.theme;
  if (t.primary) {
    root.style.setProperty("--teal-primary", t.primary);
    root.style.setProperty("--border-teal", t.primary + "59");
    root.style.setProperty("--teal-glow", t.primary + "66");
  }
  if (t.primaryLight) {
    root.style.setProperty("--teal-light", t.primaryLight);
  }
  if (t.accent) {
    root.style.setProperty("--gold-primary", t.accent);
    root.style.setProperty("--border-active", t.accent + "80");
    root.style.setProperty("--gold-glow", t.accent + "59");
  }
  if (t.accentLight) {
    root.style.setProperty("--gold-light", t.accentLight);
  }
  if (t.background) {
    root.style.setProperty("--bg-main", t.background);
  }
  if (t.backgroundCard) {
    root.style.setProperty("--bg-card", t.backgroundCard);
  }
  if (t.textColor) {
    root.style.setProperty("--text-main", t.textColor);
  }
}

// ==========================================================================
// INYECCIÓN DINÁMICA DE CONFIGURACIÓN EN EL DOM
// ==========================================================================
function applyStoreConfigToDOM() {
  const c = ACTIVE_CONFIG;
  const brand = c.brand || {};
  const contact = c.contact || {};
  const logistics = c.logistics || {};
  const modules = c.modules || {};

  // 1. Título y Metadatos
  if (brand.name) {
    document.title = `${brand.name} | ${brand.tagline || "Tienda Online"}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && brand.shortDescription) {
      metaDesc.setAttribute("content", brand.shortDescription);
    }
  }

  // 2. Barra Superior de Anuncios
  const announcementBar = document.getElementById("announcementBar");
  if (announcementBar) {
    if (modules.enableAnnouncementBar === false) {
      announcementBar.style.display = "none";
    } else {
      announcementBar.style.display = "";
      const addrEl = document.getElementById("announcementAddressText");
      if (addrEl && (logistics.pickupAddressShort || logistics.pickupAddress)) {
        addrEl.innerHTML = `<i class="fa-solid fa-location-dot" style="color: var(--gold-primary);"></i> ${escapeHTML(logistics.pickupAddressShort || logistics.pickupAddress)}`;
      }
      const mapLinkEl = document.getElementById("announcementMapsLink");
      if (mapLinkEl && logistics.pickupMapsUrl) {
        mapLinkEl.href = logistics.pickupMapsUrl;
      }
      const badgeEl = document.getElementById("announcementBadge");
      if (badgeEl && modules.announcementBadge) {
        badgeEl.textContent = modules.announcementBadge;
      }
    }
  }

  // 3. Encabezado de Marca & Logo
  const brandTitleEl = document.getElementById("headerBrandTitle");
  if (brandTitleEl) brandTitleEl.textContent = brand.logoText || brand.name || "TIENDA";
  const brandSubtitleEl = document.getElementById("headerBrandSubtitle");
  if (brandSubtitleEl) brandSubtitleEl.textContent = brand.logoSubtext || brand.tagline || "CATÁLOGO OFICIAL";
  const logoImgEl = document.getElementById("headerLogoImg");
  if (logoImgEl && brand.logoUrl) logoImgEl.src = brand.logoUrl;

  const headerWaBtn = document.getElementById("headerWaBtn");
  if (headerWaBtn && contact.whatsappNumber) {
    headerWaBtn.href = `https://wa.me/${contact.whatsappNumber}`;
  }

  // 4. Hero Section
  const heroSection = document.getElementById("inicio");
  if (heroSection) {
    if (modules.enableHeroSection === false) {
      heroSection.style.display = "none";
    } else if (c.hero) {
      heroSection.style.display = "";
      const heroTag = document.querySelector(".hero-tag");
      if (heroTag && c.hero.tag) {
        heroTag.innerHTML = `<img src="${brand.logoUrl || 'assets/logo.svg'}" alt="Icon" class="hero-tag-icon"> ${escapeHTML(c.hero.tag)}`;
      }
      const heroTitle = document.querySelector(".hero-title");
      if (heroTitle && c.hero.titleHighlight) {
        heroTitle.innerHTML = `${escapeHTML(c.hero.titlePrefix || '')} <span>${escapeHTML(c.hero.titleHighlight)}</span> ${escapeHTML(c.hero.titleSuffix || '')}`;
      }
      const heroDesc = document.querySelector(".hero-desc");
      if (heroDesc && c.hero.description) {
        heroDesc.textContent = c.hero.description;
      }
    }
  }

  // 5. Banner Destacado / Alianza
  const featuredBanner = document.getElementById("bodegaAmiga");
  if (featuredBanner) {
    if (modules.enableFeaturedBanner === false) {
      featuredBanner.style.display = "none";
    } else {
      featuredBanner.style.display = "";
      const fb = c.featuredBanner;
      if (fb) {
        const titleEl = featuredBanner.querySelector(".bodega-title");
        if (titleEl && fb.title) titleEl.textContent = fb.title;
        const descEl = featuredBanner.querySelector(".bodega-desc");
        if (descEl && fb.description) descEl.textContent = fb.description;
        const btnEl = document.getElementById("btnReservarMartino");
        if (btnEl) {
          if (fb.whatsappLink) btnEl.href = fb.whatsappLink;
          if (fb.btnText) btnEl.innerHTML = `<i class="fa-brands fa-whatsapp"></i> ${escapeHTML(fb.btnText)}`;
        }
      }
    }
  }

  // 6. Checkout: Punto de Retiro y Métodos de Pago
  const pickupStoreEl = document.getElementById("pickupStoreName");
  if (pickupStoreEl) pickupStoreEl.textContent = brand.name || "Local";
  const pickupAddrEl = document.getElementById("pickupAddressText");
  if (pickupAddrEl && logistics.pickupAddress) pickupAddrEl.textContent = logistics.pickupAddress;
  const pickupMapsBtn = document.getElementById("pickupMapsBtn");
  if (pickupMapsBtn && logistics.pickupMapsUrl) pickupMapsBtn.href = logistics.pickupMapsUrl;

  const paymentSelect = document.getElementById("paymentMethod");
  if (paymentSelect && c.payments && Array.isArray(c.payments.methods) && c.payments.methods.length > 0) {
    paymentSelect.innerHTML = c.payments.methods.map((m) => `<option value="${escapeHTML(m)}">${escapeHTML(m)}</option>`).join("");
  }

  // 7. Pie de Página (Footer)
  const fLogoImg = document.getElementById("footerLogoImg");
  if (fLogoImg && brand.logoUrl) fLogoImg.src = brand.logoUrl;
  const fBrandTitle = document.getElementById("footerBrandTitle");
  if (fBrandTitle) fBrandTitle.textContent = (brand.name || "TIENDA").toUpperCase();
  const fBrandTagline = document.getElementById("footerBrandTagline");
  if (fBrandTagline) fBrandTagline.textContent = brand.tagline || "";
  const fBrandDesc = document.getElementById("footerBrandDesc");
  if (fBrandDesc) fBrandDesc.textContent = brand.shortDescription || "";

  const fIgLink = document.getElementById("footerIgLink");
  if (fIgLink) {
    if (contact.instagram) {
      fIgLink.href = contact.instagram.startsWith("http") ? contact.instagram : `https://instagram.com/${contact.instagram}`;
      fIgLink.style.display = "inline-flex";
    } else {
      fIgLink.style.display = "none";
    }
  }
  const fWaLink = document.getElementById("footerWaLink");
  if (fWaLink && contact.whatsappNumber) {
    fWaLink.href = `https://wa.me/${contact.whatsappNumber}`;
  }
  const fMailLink = document.getElementById("footerMailLink");
  if (fMailLink) {
    if (contact.email) {
      fMailLink.href = `mailto:${contact.email}`;
      fMailLink.style.display = "inline-flex";
    } else {
      fMailLink.style.display = "none";
    }
  }

  const fScheduleWeekdays = document.getElementById("footerScheduleWeekdays");
  if (fScheduleWeekdays && c.schedule && c.schedule.weekdays) {
    fScheduleWeekdays.innerHTML = `<i class="fa-regular fa-clock" style="color: var(--teal-light);"></i> ${escapeHTML(c.schedule.weekdays)}`;
  }
  const fScheduleWeekends = document.getElementById("footerScheduleWeekends");
  if (fScheduleWeekends && c.schedule && c.schedule.weekends) {
    fScheduleWeekends.innerHTML = `<i class="fa-regular fa-clock" style="color: var(--teal-light);"></i> ${escapeHTML(c.schedule.weekends)}`;
  }
  const fAddressSpan = document.getElementById("footerAddressSpan");
  if (fAddressSpan && logistics.pickupAddress) {
    fAddressSpan.innerHTML = `<strong>Local:</strong> ${escapeHTML(logistics.pickupAddress)}`;
  }
  const fMapsLink = document.getElementById("footerMapsLink");
  if (fMapsLink && logistics.pickupMapsUrl) {
    fMapsLink.href = logistics.pickupMapsUrl;
  }

  const fRegretItem = document.getElementById("footerRegretItem");
  if (fRegretItem && modules.enableRegretButton === false) {
    fRegretItem.style.display = "none";
  }
  const fPrivacyItem = document.getElementById("footerPrivacyItem");
  if (fPrivacyItem && modules.enablePrivacyModal === false) {
    fPrivacyItem.style.display = "none";
  }
  const fAgeLegalBadge = document.getElementById("footerAgeLegalBadge");
  if (fAgeLegalBadge && modules.enableAgeGate === false) {
    fAgeLegalBadge.style.display = "none";
  }

  const fCopyright = document.getElementById("footerCopyright");
  if (fCopyright) {
    const year = new Date().getFullYear();
    const legalNotice = (modules.enableAgeGate !== false)
      ? " Beber con moderación. Prohibida la venta a menores de 18 años (Ley Nacional 24.788)."
      : "";
    fCopyright.textContent = `© ${year} ${brand.name || "Tienda"}. Catálogo digital interactivo.${legalNotice}`;
  }
  const fTaglineBottom = document.getElementById("footerTaglineBottom");
  if (fTaglineBottom) {
    fTaglineBottom.textContent = `Plataforma de E-Commerce para ${brand.name || "Comercios"}`;
  }
}

// ==========================================================================
// RENDERIZADO DINÁMICO DE NAVEGACIÓN DE CATEGORÍAS
// ==========================================================================
function renderCategoryNavigation() {
  const categories = ACTIVE_CONFIG.categories;
  if (!categories || !Array.isArray(categories) || categories.length === 0) return;

  // 1. Pestañas Desktop / Sticky
  const tabsContainer = document.getElementById("categoryTabs");
  if (tabsContainer) {
    tabsContainer.innerHTML = categories
      .map((cat) => {
        const isActive = cat.id === AppState.currentCategory ? "active" : "";
        return `
        <button class="category-tab-btn ${isActive}" data-category="${cat.id}" id="tab-${cat.id}">
          <i class="${cat.icon || "fa-solid fa-tag"}"></i>
          <span>${cat.name}</span>
        </button>
      `;
      })
      .join("");

    tabsContainer.querySelectorAll(".category-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-category");
        switchCategory(cat);
      });
    });
  }

  // 2. Barra Móvil Inferior
  const bottomNav = document.getElementById("mobileBottomNav") || document.querySelector(".mobile-bottom-nav");
  if (bottomNav) {
    const catButtons = categories.slice(0, 4).map((cat) => {
      const isActive = cat.id === AppState.currentCategory ? "active" : "";
      return `
        <button class="bottom-nav-item ${isActive}" onclick="switchCategory('${cat.id}')" id="bnav-${cat.id}">
          <i class="${cat.icon || "fa-solid fa-tag"}"></i>
          <span>${cat.name}</span>
        </button>
      `;
    }).join("");

    bottomNav.innerHTML = `
      ${catButtons}
      <button class="bottom-nav-item" id="mobileCartBtn" aria-label="Ver Carrito">
        <i class="fa-solid fa-bag-shopping"></i>
        <span class="bottom-nav-badge" id="mobileCartBadge">0</span>
        <span>Carrito</span>
      </button>
    `;

    const mCart = document.getElementById("mobileCartBtn");
    if (mCart) mCart.addEventListener("click", openCart);
  }
}

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  applyThemeColors();
  applyStoreConfigToDOM();
  initReferralSystem();
  renderCategoryNavigation();
  initAgeGate();
  loadCartFromStorage();
  setupEventListeners();
  renderSubcategoryChips();
  renderProducts();
  updateCartUI();
});

// ==========================================================================
// SISTEMA DE PROMOCIÓN REFERIDA & AFILIADOS
// ==========================================================================
function initReferralSystem() {
  if (!ACTIVE_CONFIG.referrals || ACTIVE_CONFIG.referrals.enabled === false) return;

  const storageKey = ACTIVE_CONFIG.referrals.storageKey || "tienda_referral_code";
  const urlParam = ACTIVE_CONFIG.referrals.urlParam || "ref";

  let foundCode = null;
  try {
    const urlParams = new URLSearchParams(window.location.search);
    foundCode = urlParams.get(urlParam) || urlParams.get("promo") || urlParams.get("afiliado") || urlParams.get("nodo");
  } catch (e) {}

  if (foundCode) {
    const cleanCode = foundCode.trim().toUpperCase();
    try {
      localStorage.setItem(storageKey, cleanCode);
    } catch (e) {}
  }

  const activeCode = localStorage.getItem(storageKey);
  if (activeCode) {
    AppState.referralCode = activeCode;
    const configuredCodes = ACTIVE_CONFIG.referrals.activeCodes || {};
    if (configuredCodes[activeCode]) {
      AppState.referralData = configuredCodes[activeCode];
    } else {
      AppState.referralData = {
        label: `Promoción ${activeCode}`,
        discount: ACTIVE_CONFIG.referrals.defaultDiscountPercent || 0,
        promoter: "Promotor Registrado"
      };
    }

    if (foundCode) {
      setTimeout(() => {
        showToast(`🎁 ¡Beneficio activado con código ${activeCode}! (${AppState.referralData.label})`);
      }, 700);
    }
  }
}

// ==========================================================================
// CONTROL DE EDAD (+18)
// ==========================================================================
function initAgeGate() {
  // Si el comercio no vende alcohol o productos para adultos, omitir modal
  if (ACTIVE_CONFIG.modules && ACTIVE_CONFIG.modules.enableAgeGate === false) {
    const ageModal = document.getElementById("ageGateModal");
    if (ageModal) ageModal.style.display = "none";
    return;
  }

  const isVerified = sessionStorage.getItem("store_age_verified") || sessionStorage.getItem("paisana_age_verified");
  const ageModal = document.getElementById("ageGateModal");
  const confirmBtn = document.getElementById("confirmAgeBtn");

  if (!isVerified && ageModal) {
    ageModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  if (confirmBtn && ageModal) {
    confirmBtn.addEventListener("click", () => {
      sessionStorage.setItem("store_age_verified", "true");
      sessionStorage.setItem("paisana_age_verified", "true");
      ageModal.classList.remove("active");
      document.body.style.overflow = "";
      showToast("Acceso verificado: Mayor de 18 años");
    });
  }
}

// ==========================================================================
// CONFIGURACIÓN DE LISTENERS
// ==========================================================================
function setupEventListeners() {
  // Pestañas principales de categoría (si existen en markup)
  document.querySelectorAll(".category-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-category");
      switchCategory(cat);
    });
  });

  // Buscador Desktop
  const desktopInput = document.getElementById("desktopSearchInput");
  const desktopClear = document.getElementById("desktopSearchClear");
  if (desktopInput) {
    desktopInput.addEventListener("input", (e) => {
      handleSearch(e.target.value);
      syncSearchInputs(e.target.value, "desktop");
    });
  }
  if (desktopClear) {
    desktopClear.addEventListener("click", () => {
      handleSearch("");
      syncSearchInputs("", "none");
    });
  }

  // Buscador Móvil
  const mobileInput = document.getElementById("mobileSearchInput");
  const mobileClear = document.getElementById("mobileSearchClear");
  if (mobileInput) {
    mobileInput.addEventListener("input", (e) => {
      handleSearch(e.target.value);
      syncSearchInputs(e.target.value, "mobile");
    });
  }
  if (mobileClear) {
    mobileClear.addEventListener("click", () => {
      handleSearch("");
      syncSearchInputs("", "none");
    });
  }

  // Ordenamiento
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      AppState.currentSort = e.target.value;
      renderProducts();
    });
  }

  // Conmutador de vista (Grid vs List)
  const viewGridBtn = document.getElementById("viewGridBtn");
  const viewListBtn = document.getElementById("viewListBtn");
  if (viewGridBtn) {
    viewGridBtn.addEventListener("click", () => setViewMode("grid"));
  }
  if (viewListBtn) {
    viewListBtn.addEventListener("click", () => setViewMode("list"));
  }
  applyViewModeUI();

  // Carrito Drawer Trigger (Desktop & Mobile)
  const desktopCartBtn = document.getElementById("desktopCartBtn");
  const mobileCartBtn = document.getElementById("mobileCartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartBackdrop = document.getElementById("cartBackdrop");

  if (desktopCartBtn) desktopCartBtn.addEventListener("click", openCart);
  if (mobileCartBtn) mobileCartBtn.addEventListener("click", openCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);

  // Modal Detalle de Producto
  const productModal = document.getElementById("productModal");
  const closeProductModalBtn = document.getElementById("closeProductModalBtn");
  if (closeProductModalBtn) {
    closeProductModalBtn.addEventListener("click", closeProductModal);
  }
  if (productModal) {
    productModal.addEventListener("click", (e) => {
      if (e.target === productModal) closeProductModal();
    });
  }

  // Modal Checkout
  const openCheckoutModalBtn = document.getElementById("openCheckoutModalBtn");
  const closeCheckoutModalBtn = document.getElementById("closeCheckoutModalBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutForm = document.getElementById("checkoutForm");

  if (openCheckoutModalBtn) {
    openCheckoutModalBtn.addEventListener("click", () => {
      if (AppState.cart.length === 0) {
        showToast("Tu carrito está vacío 🛒");
        return;
      }
      closeCart();
      openCheckoutModal();
    });
  }

  if (closeCheckoutModalBtn) {
    closeCheckoutModalBtn.addEventListener("click", closeCheckoutModal);
  }
  if (checkoutModal) {
    checkoutModal.addEventListener("click", (e) => {
      if (e.target === checkoutModal) closeCheckoutModal();
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleCheckoutSubmit);
  }

  // Modal Botón de Arrepentimiento (Res. 424/2020)
  const openRegretBtn = document.getElementById("openRegretBtn");
  const closeRegretModalBtn = document.getElementById("closeRegretModalBtn");
  const regretModal = document.getElementById("regretModal");
  const regretForm = document.getElementById("regretForm");

  if (openRegretBtn) {
    openRegretBtn.addEventListener("click", openRegretModal);
  }
  if (closeRegretModalBtn) {
    closeRegretModalBtn.addEventListener("click", closeRegretModal);
  }
  if (regretModal) {
    regretModal.addEventListener("click", (e) => {
      if (e.target === regretModal) closeRegretModal();
    });
  }
  if (regretForm) {
    regretForm.addEventListener("submit", handleRegretSubmit);
  }

  // Modal Términos y Privacidad (Ley 25.326)
  const openPrivacyBtn = document.getElementById("openPrivacyBtn");
  const closePrivacyModalBtn = document.getElementById("closePrivacyModalBtn");
  const privacyModal = document.getElementById("privacyModal");

  if (openPrivacyBtn) {
    openPrivacyBtn.addEventListener("click", openPrivacyModal);
  }
  if (closePrivacyModalBtn) {
    closePrivacyModalBtn.addEventListener("click", closePrivacyModal);
  }
  if (privacyModal) {
    privacyModal.addEventListener("click", (e) => {
      if (e.target === privacyModal) closePrivacyModal();
    });
  }

  // Efecto Header Scroll
  window.addEventListener("scroll", () => {
    const header = document.getElementById("mainHeader");
    if (header) {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });
}

// Sincronizar inputs de búsqueda
function syncSearchInputs(value, source) {
  const desktopInput = document.getElementById("desktopSearchInput");
  const mobileInput = document.getElementById("mobileSearchInput");
  const desktopClear = document.getElementById("desktopSearchClear");
  const mobileClear = document.getElementById("mobileSearchClear");

  if (source !== "desktop" && desktopInput) desktopInput.value = value;
  if (source !== "mobile" && mobileInput) mobileInput.value = value;

  if (desktopClear) desktopClear.style.display = value ? "block" : "none";
  if (mobileClear) mobileClear.style.display = value ? "block" : "none";
}

function handleSearch(query) {
  AppState.searchQuery = query.trim().toLowerCase();
  renderProducts();
}

// ==========================================================================
// CAMBIO DE CATEGORÍAS & SUB-VARIETALES
// ==========================================================================
function switchCategory(categoryKey) {
  if (!SUBCATEGORIES_MAP[categoryKey]) {
    const firstCat = Object.keys(SUBCATEGORIES_MAP)[0];
    if (firstCat) categoryKey = firstCat;
    else return;
  }

  AppState.currentCategory = categoryKey;
  AppState.currentSubcategory = "all";

  // Actualizar Tabs Header
  document.querySelectorAll(".category-tab-btn").forEach((btn) => {
    if (btn.getAttribute("data-category") === categoryKey) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Actualizar Bottom Nav Móvil
  document.querySelectorAll(".bottom-nav-item").forEach((btn) => {
    btn.classList.remove("active");
  });
  const activeBnav = document.getElementById(`bnav-${categoryKey}`);
  if (activeBnav) activeBnav.classList.add("active");

  // Actualizar Títulos de Sección
  const meta = SUBCATEGORIES_MAP[categoryKey];
  const titleEl = document.getElementById("currentSectionTitle");
  const subEl = document.getElementById("currentSectionSubtitle");
  if (titleEl && meta) {
    titleEl.innerHTML = `<i class="${meta.icon || 'fa-solid fa-tag'}" style="color: var(--gold-primary);"></i> ${escapeHTML(meta.title)}`;
  }
  if (subEl && meta) {
    subEl.textContent = meta.subtitle || "";
  }

  renderSubcategoryChips();
  renderProducts();

  // Scroll suave al catálogo si está arriba
  const catalogoEl = document.getElementById("catalogo");
  if (catalogoEl && window.scrollY > 300) {
    catalogoEl.scrollIntoView({ behavior: "smooth" });
  }
}

function filterBySubcategory(subcatId) {
  AppState.currentSubcategory = subcatId;

  document.querySelectorAll(".subchip-btn").forEach((chip) => {
    if (chip.getAttribute("data-subcat") === subcatId) {
      chip.classList.add("active");
    } else {
      chip.classList.remove("active");
    }
  });

  renderProducts();
}

function filterByPromoCombos() {
  // Buscar inteligentemente una categoría o subcategoría con 'combo' o 'promo'
  let targetCat = Object.keys(SUBCATEGORIES_MAP).find((k) => {
    return SUBCATEGORIES_MAP[k].subchips && SUBCATEGORIES_MAP[k].subchips.some((s) => s.id.includes("combo") || s.id.includes("promo"));
  });

  if (targetCat) {
    const sub = SUBCATEGORIES_MAP[targetCat].subchips.find((s) => s.id.includes("combo") || s.id.includes("promo"));
    switchCategory(targetCat);
    if (sub) {
      setTimeout(() => filterBySubcategory(sub.id), 60);
    }
  } else {
    AppState.searchQuery = "promo";
    syncSearchInputs("promo", "desktop");
    renderProducts();
  }
}

// Renderizar Sub-pestañas / Chips
function renderSubcategoryChips() {
  const container = document.getElementById("subcategoryChips");
  if (!container) return;

  const currentMap = SUBCATEGORIES_MAP[AppState.currentCategory];
  if (!currentMap) return;

  container.innerHTML = currentMap.subchips
    .map(
      (chip) => `
    <button class="subchip-btn ${AppState.currentSubcategory === chip.id ? "active" : ""}" 
            data-subcat="${chip.id}" 
            onclick="filterBySubcategory('${chip.id}')">
      ${chip.label}
    </button>
  `
    )
    .join("");
}

// ==========================================================================
// RENDERIZADO DE PRODUCTOS
// ==========================================================================
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const countEl = document.getElementById("itemsCount");
  if (!grid) return;

  // Filtrado
  let filtered = PRODUCTS_DATA.filter((item) => {
    // Si hay búsqueda global, busca en todo el catálogo
    if (AppState.searchQuery) {
      const matchSearch =
        item.name.toLowerCase().includes(AppState.searchQuery) ||
        item.description.toLowerCase().includes(AppState.searchQuery) ||
        item.origin.toLowerCase().includes(AppState.searchQuery) ||
        item.subcategory.toLowerCase().includes(AppState.searchQuery);
      return matchSearch;
    }

    // Filtro por categoría principal
    if (item.category !== AppState.currentCategory) {
      return false;
    }

    // Filtro por subcategoría / varietal
    if (AppState.currentSubcategory !== "all" && item.subcategory !== AppState.currentSubcategory) {
      return false;
    }

    return true;
  });

  // Ordenamiento
  if (AppState.currentSort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (AppState.currentSort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (AppState.currentSort === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Actualizar Contador
  if (countEl) {
    countEl.textContent = `${filtered.length} producto${filtered.length !== 1 ? "s" : ""}`;
  }

  // Estado Vacío
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-catalog">
        <i class="fa-solid fa-burger" style="color: var(--teal-primary); font-size: 3rem; margin-bottom: 12px;"></i>
        <h3>No encontramos productos</h3>
        <p>Probá con otro término de búsqueda o seleccioná otra categoría.</p>
        <button class="btn-primary" onclick="resetFilters()">
          <i class="fa-solid fa-arrow-rotate-left"></i> Restablecer menú
        </button>
      </div>
    `;
    return;
  }

  // Renderizar tarjetas
  grid.innerHTML = filtered
    .map((product) => {
      const formatPrice = formatMoney(product.price);
      const formatOldPrice = product.oldPrice ? formatMoney(product.oldPrice) : null;

      let badgeHtml = "";
      if (product.badge) {
        const isOffer = product.badge.toLowerCase().includes("oferta") || product.badge.toLowerCase().includes("promo");
        badgeHtml = `<span class="badge-tag ${isOffer ? "offer" : ""}">${product.badge}</span>`;
      }

      return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-media" onclick="openProductModal('${product.id}')">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" onerror="handleProductImgError(this, '${product.category}')">
          <div class="product-badges-wrap">
            ${badgeHtml}
          </div>
          <button class="quick-view-trigger" title="Ver detalles" aria-label="Ver detalles">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>

        <div class="product-body">
          <div class="product-info-col">
            <div class="product-meta-row">
              <span class="product-category-tag">${product.subcategory.replace("-", " ")}</span>
              <span class="product-vol-tag">${product.volume}</span>
            </div>

            <h3 class="product-name" onclick="openProductModal('${product.id}')" title="${product.name}">
              ${product.name}
            </h3>

            <p class="product-details-brief">${escapeHTML(product.origin || "")}${product.alcohol ? ` • ${escapeHTML(product.alcohol)}` : ""}</p>
          </div>

          <div class="product-footer">
            <div class="price-box">
              ${formatOldPrice ? `<span class="old-price">${formatOldPrice}</span>` : ""}
              <span class="current-price">${formatPrice}</span>
            </div>

            <button class="btn-add-cart" onclick="addToCart('${product.id}', 1)" title="Agregar al pedido" aria-label="Agregar ${escapeHTML(product.name)}">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </article>
    `;
    })
    .join("");

  applyViewModeUI();
}

function resetFilters() {
  AppState.searchQuery = "";
  AppState.currentSubcategory = "all";
  AppState.currentSort = "default";
  syncSearchInputs("", "none");
  const sortEl = document.getElementById("sortSelect");
  if (sortEl) sortEl.value = "default";
  renderSubcategoryChips();
  renderProducts();
}

// ==========================================================================
// MODAL DE DETALLE DE PRODUCTO
// ==========================================================================
let modalQuantity = 1;

function openProductModal(productId) {
  const product = PRODUCTS_DATA.find((p) => p.id === productId);
  if (!product) return;

  modalQuantity = 1;
  const modalBody = document.getElementById("modalProductBody");
  const modal = document.getElementById("productModal");
  if (!modalBody || !modal) return;

  const formatPrice = formatMoney(product.price);
  const formatOldPrice = product.oldPrice ? formatMoney(product.oldPrice) : null;

  modalBody.innerHTML = `
    <div class="modal-image-col">
      <img src="${product.image}" alt="${product.name}" onerror="handleProductImgError(this, '${product.category}')">
      ${product.badge ? `<div style="position: absolute; top: 14px; left: 14px;"><span class="badge-tag">${product.badge}</span></div>` : ""}
    </div>

    <div class="modal-info-col">
      <div class="modal-category-badge">${product.category.toUpperCase()} • ${product.subcategory.toUpperCase()}</div>
      <h2 class="modal-product-title">${product.name}</h2>
      
      <div class="price-box" style="margin-bottom: 12px;">
        ${formatOldPrice ? `<span class="old-price" style="font-size: 0.85rem;">${formatOldPrice}</span>` : ""}
        <span class="current-price" style="font-size: 1.4rem;">${formatPrice}</span>
      </div>

      <p class="modal-description">${product.description}</p>

      <div class="modal-specs-list">
        ${product.origin ? `
        <div class="spec-item">
          <span class="spec-label">Elaboración</span>
          <span class="spec-val">${product.origin}</span>
        </div>` : ""}
        ${product.volume ? `
        <div class="spec-item">
          <span class="spec-label">Porción / Presentación</span>
          <span class="spec-val">${product.volume}</span>
        </div>` : ""}
        ${product.alcohol ? `
        <div class="spec-item">
          <span class="spec-label">Graduación</span>
          <span class="spec-val">${product.alcohol}</span>
        </div>` : ""}
        <div class="spec-item">
          <span class="spec-label">Calificación</span>
          <span class="spec-val">⭐ ${product.rating || 5.0} / 5.0</span>
        </div>
      </div>

      ${
        product.pairing
          ? `
        <div class="modal-pairing-box">
          <i class="fa-solid fa-fire" style="color: var(--teal-primary);"></i> <strong>Sugerencia de la casa:</strong> ${product.pairing}
        </div>
      `
          : ""
      }

      <div class="modal-action-row">
        <div class="quantity-controller">
          <button class="qty-btn" onclick="changeModalQty(-1)"><i class="fa-solid fa-minus"></i></button>
          <span class="qty-display" id="modalQtyDisplay">1</span>
          <button class="qty-btn" onclick="changeModalQty(1)"><i class="fa-solid fa-plus"></i></button>
        </div>

        <button class="btn-primary" style="flex: 1; justify-content: center;" onclick="addModalProductToCart('${product.id}')">
          <i class="fa-solid fa-cart-shopping"></i> Agregar al Pedido
        </button>
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function changeModalQty(delta) {
  modalQuantity += delta;
  if (modalQuantity < 1) modalQuantity = 1;
  if (modalQuantity > 99) modalQuantity = 99;

  const display = document.getElementById("modalQtyDisplay");
  if (display) display.textContent = modalQuantity;
}

function addModalProductToCart(productId) {
  addToCart(productId, modalQuantity);
  closeProductModal();
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

// ==========================================================================
// CARRITO DE COMPRAS & STORAGE
// ==========================================================================
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("paisana_cart");
    if (saved) {
      AppState.cart = JSON.parse(saved);
    }
  } catch (err) {
    AppState.cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem("paisana_cart", JSON.stringify(AppState.cart));
  } catch (err) {
    console.error("Error al guardar carrito", err);
  }
}

function addToCart(productId, quantity = 1) {
  const product = PRODUCTS_DATA.find((p) => p.id === productId);
  if (!product) return;

  const existing = AppState.cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    AppState.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      volume: product.volume,
      quantity: quantity
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`¡${product.name} agregado! 🍷`);
}

function updateCartQuantity(productId, delta) {
  const item = AppState.cart.find((i) => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCartToStorage();
  updateCartUI();
}

function removeFromCart(productId) {
  AppState.cart = AppState.cart.filter((i) => i.id !== productId);
  saveCartToStorage();
  updateCartUI();
}

function clearCart() {
  AppState.cart = [];
  saveCartToStorage();
  updateCartUI();
}

function openCart() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  if (drawer) drawer.classList.add("active");
  if (backdrop) backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
  updateCartUI();
}

function closeCart() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  if (drawer) drawer.classList.remove("active");
  if (backdrop) backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

function updateCartUI() {
  const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = AppState.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Header badges & Mobile badges
  const headerBadge = document.getElementById("headerCartBadge");
  const mobileBadge = document.getElementById("mobileCartBadge");
  const headerTotal = document.getElementById("headerCartTotal");

  if (headerBadge) headerBadge.textContent = totalItems;
  if (mobileBadge) mobileBadge.textContent = totalItems;
  if (headerTotal) headerTotal.textContent = formatMoney(subtotal);

  // Drawer list
  const cartList = document.getElementById("cartItemsList");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartShippingFeeEl = document.getElementById("cartShippingFee");
  const cartTotalSumEl = document.getElementById("cartTotalSum");

  // Lista de items en Drawer
  if (cartList) {
    if (AppState.cart.length === 0) {
      const storeName = escapeHTML(ACTIVE_CONFIG.brand?.name || "nuestro kiosco");
      cartList.innerHTML = `
        <div class="cart-empty-view">
          <i class="fa-solid fa-basket-shopping"></i>
          <h4>Tu carrito está vacío</h4>
          <p style="font-size: 0.8rem; margin-top: 4px;">Explorá los productos de ${storeName} para comenzar tu pedido.</p>
        </div>
      `;
    } else {
      cartList.innerHTML = AppState.cart
        .map((item) => {
          return `
          <div class="cart-item-row">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="handleProductImgError(this, '')">
            <div class="cart-item-info">
              <span class="cart-item-title">${item.name}</span>
              <span class="cart-item-price">${formatMoney(item.price * item.quantity)}</span>
              
              <div class="cart-item-actions">
                <div class="cart-qty-ctrl">
                  <button class="cart-qty-btn" onclick="updateCartQuantity('${item.id}', -1)">-</button>
                  <span>${item.quantity}</span>
                  <button class="cart-qty-btn" onclick="updateCartQuantity('${item.id}', 1)">+</button>
                </div>
              </div>
            </div>

            <button class="cart-delete-item" onclick="removeFromCart('${item.id}')" title="Eliminar">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `;
        })
        .join("");
    }
  }

  // Totales y Costo de Envío / Retiro
  const isDelivery = AppState.deliveryMethod === "envio";
  const defaultFee = (ACTIVE_CONFIG.logistics && typeof ACTIVE_CONFIG.logistics.deliveryFee === "number") 
    ? ACTIVE_CONFIG.logistics.deliveryFee 
    : 1800;
  
  const freeThreshold = (ACTIVE_CONFIG.logistics && ACTIVE_CONFIG.logistics.freeDeliveryThreshold) || 0;
  const isFreeDelivery = freeThreshold > 0 && subtotal >= freeThreshold;
  const shippingCost = isDelivery && subtotal > 0 ? (isFreeDelivery ? 0 : defaultFee) : 0;

  // Descuento por referido / promoción
  let referralDiscount = 0;
  if (AppState.referralData && AppState.referralData.discount > 0 && subtotal > 0) {
    referralDiscount = Math.round(subtotal * (AppState.referralData.discount / 100));
  }

  const finalTotal = Math.max(0, subtotal - referralDiscount + shippingCost);

  if (cartSubtotalEl) cartSubtotalEl.textContent = formatMoney(subtotal);

  // Fila de descuento por referido
  const discountRow = document.getElementById("cartReferralDiscountRow");
  const discountLabel = document.getElementById("cartReferralLabel");
  const discountVal = document.getElementById("cartReferralDiscount");
  if (discountRow) {
    if (referralDiscount > 0) {
      discountRow.style.display = "flex";
      if (discountLabel) {
        discountLabel.innerHTML = `<i class="fa-solid fa-gift"></i> ${escapeHTML(AppState.referralData.label || "Descuento Promoción")}`;
      }
      if (discountVal) {
        discountVal.textContent = `-${formatMoney(referralDiscount)}`;
      }
    } else {
      discountRow.style.display = "none";
    }
  }

  if (cartShippingFeeEl) {
    if (AppState.deliveryMethod === "retiro") {
      cartShippingFeeEl.textContent = "Retiro en mostrador ($0)";
    } else if (subtotal === 0) {
      cartShippingFeeEl.textContent = "$0";
    } else if (isFreeDelivery) {
      cartShippingFeeEl.textContent = "¡Envío Gratis! ($0)";
    } else {
      const feeLabel = (ACTIVE_CONFIG.logistics && ACTIVE_CONFIG.logistics.deliveryFeeLabel) || "Cadetería";
      cartShippingFeeEl.textContent = `${formatMoney(shippingCost)} (${feeLabel})`;
    }
  }
  if (cartTotalSumEl) cartTotalSumEl.textContent = formatMoney(finalTotal);
}

// Control de Vista (Grilla vs Lista)
function setViewMode(mode) {
  AppState.viewMode = mode;
  try {
    localStorage.setItem("store_view_mode", mode);
    localStorage.setItem("paisana_view_mode", mode);
  } catch (e) {}
  applyViewModeUI();
}

function applyViewModeUI() {
  const gridEl = document.getElementById("productsGrid");
  const gridBtn = document.getElementById("viewGridBtn");
  const listBtn = document.getElementById("viewListBtn");

  if (gridEl) {
    if (AppState.viewMode === "list") {
      gridEl.classList.add("list-view");
    } else {
      gridEl.classList.remove("list-view");
    }
  }

  if (gridBtn && listBtn) {
    if (AppState.viewMode === "list") {
      listBtn.classList.add("active");
      gridBtn.classList.remove("active");
    } else {
      gridBtn.classList.add("active");
      listBtn.classList.remove("active");
    }
  }
}

// Fallback de imagen para productos que no posean foto específica
function handleProductImgError(img, category) {
  img.onerror = null;
  img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><rect width="160" height="160" fill="%23161113"/><circle cx="80" cy="80" r="50" fill="%2322181c"/><path d="M50 70c0-16 14-26 30-26s30 10 30 26z" fill="%23f59e0b"/><path d="M46 76h68v10H46z" fill="%236b2718"/><path d="M48 88h64v8c0 6-8 12-32 12s-32-6-32-12z" fill="%23f59e0b"/><path d="M52 74l8 6 12-4 12 5 12-5 8 5" fill="none" stroke="%23fbbf24" stroke-width="4"/><path d="M44 72h72" stroke="%2322c55e" stroke-width="3"/></svg>';
}

// ==========================================================================
// CHECKOUT & GENERACIÓN DE PEDIDO WHATSAPP
// ==========================================================================
function openCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

function toggleDeliveryMethod(method) {
  AppState.deliveryMethod = method;
  const addressGroup = document.getElementById("addressFieldGroup");
  const addressInput = document.getElementById("customerAddress");
  const radioDelivery = document.getElementById("radioDeliveryLabel");
  const radioPickup = document.getElementById("radioPickupLabel");
  const pickupBox = document.getElementById("pickupLocationBox");

  if (method === "retiro") {
    if (addressGroup) addressGroup.style.display = "none";
    if (addressInput) addressInput.required = false;
    if (pickupBox) pickupBox.style.display = "block";
    if (radioDelivery) radioDelivery.classList.remove("selected");
    if (radioPickup) radioPickup.classList.add("selected");
  } else {
    if (addressGroup) addressGroup.style.display = "block";
    if (addressInput) addressInput.required = true;
    if (pickupBox) pickupBox.style.display = "none";
    if (radioDelivery) radioDelivery.classList.add("selected");
    if (radioPickup) radioPickup.classList.remove("selected");
  }

  updateCartUI();
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  if (AppState.cart.length === 0) {
    showToast("Tu carrito está vacío");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const address = document.getElementById("customerAddress") ? document.getElementById("customerAddress").value.trim() : "";
  const payment = document.getElementById("paymentMethod").value;
  const notes = document.getElementById("orderNotes").value.trim();

  const subtotal = AppState.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isDelivery = AppState.deliveryMethod === "envio";
  const defaultFee = (ACTIVE_CONFIG.logistics && typeof ACTIVE_CONFIG.logistics.deliveryFee === "number")
    ? ACTIVE_CONFIG.logistics.deliveryFee
    : 1800;
  const freeThreshold = (ACTIVE_CONFIG.logistics && ACTIVE_CONFIG.logistics.freeDeliveryThreshold) || 0;
  const isFreeDelivery = freeThreshold > 0 && subtotal >= freeThreshold;
  const shippingCost = isDelivery ? (isFreeDelivery ? 0 : defaultFee) : 0;

  // Descuento por referido
  let referralDiscount = 0;
  if (AppState.referralData && AppState.referralData.discount > 0 && subtotal > 0) {
    referralDiscount = Math.round(subtotal * (AppState.referralData.discount / 100));
  }
  const total = Math.max(0, subtotal - referralDiscount + shippingCost);
  const inquiryCode = `PED-${Date.now().toString().slice(-5)}`;
  const storeName = ACTIVE_CONFIG.brand?.name || "Tienda Online";
  const isAdult = ACTIVE_CONFIG.modules && ACTIVE_CONFIG.modules.enableAgeGate !== false;

  // Armar Mensaje para WhatsApp estructurado y profesional
  let message = `🛒 *SOLICITUD DE PEDIDO*\n`;
  message += `*${storeName}* | Ref: #${inquiryCode}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `👤 *Cliente:* ${name}\n`;
  message += `🛵 *Modalidad:* ${isDelivery ? "Envío a Domicilio" : "Retiro en Local"}\n`;

  if (isDelivery) {
    message += `📍 *Dirección de Entrega:* ${address}\n`;
  }
  message += `💳 *Medio de Pago Propuesto:* ${payment}\n`;
  if (notes) {
    message += `📝 *Aclaraciones:* ${notes}\n`;
  }
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📋 *PRODUCTOS SELECCIONADOS:*\n\n`;

  AppState.cart.forEach((item, index) => {
    const vol = item.volume ? ` (${item.volume})` : "";
    message += `${index + 1}. *${item.name}*${vol}\n`;
    message += `   ${item.quantity} un. x ${formatMoney(item.price)} = *${formatMoney(item.price * item.quantity)}*\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *Subtotal:* ${formatMoney(subtotal)}\n`;

  if (AppState.referralCode) {
    const promoLabel = AppState.referralData?.label || AppState.referralCode;
    const promoPromoter = AppState.referralData?.promoter ? ` (${AppState.referralData.promoter})` : "";
    message += `🤝 *Promoción / Referido:* ${AppState.referralCode} - ${promoLabel}${promoPromoter}\n`;
    if (referralDiscount > 0) {
      message += `🎁 *Descuento Aplicado:* -${formatMoney(referralDiscount)}\n`;
    }
  }

  if (isDelivery) {
    const feeLabel = (ACTIVE_CONFIG.logistics && ACTIVE_CONFIG.logistics.deliveryFeeLabel) || "Cadetería";
    if (shippingCost === 0) {
      message += `🚚 *Envío a Domicilio:* ¡Gratis! (Supera compra mínima)\n`;
    } else {
      message += `🚚 *Envío a Domicilio:* ${formatMoney(shippingCost)} (${feeLabel})\n`;
    }
  } else {
    message += `🏪 *Retiro en Local:* Sin costo\n`;
    if (ACTIVE_CONFIG.logistics?.pickupAddress) {
      message += `📍 *Punto de Retiro:* ${ACTIVE_CONFIG.logistics.pickupAddress}\n`;
    }
    if (ACTIVE_CONFIG.logistics?.pickupMapsUrl) {
      message += `🗺️ *Ubicación Maps:* ${ACTIVE_CONFIG.logistics.pickupMapsUrl}\n`;
    }
  }
  message += `💎 *TOTAL ESTIMADO:* ${formatMoney(total)}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  
  if (isAdult) {
    message += `⚖️ *Aviso Legal:* Solicitud generada desde catálogo web informativo. Operación y entrega sujeta a confirmación de stock y acreditación de mayoría de edad (+18) según Ley Nac. 24.788. Beber con moderación.`;
  } else {
    message += `⚖️ *Aviso:* Solicitud generada desde catálogo web. Operación y entrega sujeta a confirmación final de stock y disponibilidad.`;
  }

  // Abrir WhatsApp con número configurado
  const phone = ACTIVE_CONFIG.contact?.whatsappNumber || "5492612586004";
  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encoded}`;

  window.open(whatsappUrl, "_blank");

  // Limpiar y cerrar
  clearCart();
  closeCheckoutModal();
  showToast("¡Pedido enviado por WhatsApp! 📲");
}

// ==========================================================================
// CONTROLADORES: BOTÓN DE ARREPENTIMIENTO (Res. 424/2020)
// ==========================================================================
function openRegretModal() {
  const modal = document.getElementById("regretModal");
  if (modal) modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeRegretModal() {
  const modal = document.getElementById("regretModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

function handleRegretSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("regretCustomerName").value.trim();
  const contact = document.getElementById("regretContact").value.trim();
  const orderCode = document.getElementById("regretOrderCode").value.trim();
  const reason = document.getElementById("regretReason").value.trim();
  const revocationCode = `REV-${Date.now().toString().slice(-6)}`;

  let message = `🔄 *NOTIFICACIÓN DE REVOCACIÓN / ARREPENTIMIENTO*\n`;
  message += `*Conforme Art. 34 Ley 24.240 y Res. 424/2020*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🎫 *Código de Trámite:* ${revocationCode}\n`;
  message += `👤 *Titular:* ${name}\n`;
  message += `📞 *Contacto:* ${contact}\n`;
  message += `📦 *Referencia/Pedido:* ${orderCode}\n`;
  if (reason) {
    message += `💬 *Motivo:* ${reason}\n`;
  }
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Solicito la revocación formal de la solicitud/compra conforme al plazo legal establecido por la normativa vigente.`;

  const phone = ACTIVE_CONFIG.contact?.whatsappNumber || "5492612586004";
  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encoded}`;

  window.open(whatsappUrl, "_blank");

  closeRegretModal();
  const form = document.getElementById("regretForm");
  if (form) form.reset();
  showToast(`Revocación generada: Código ${revocationCode}`);
}

// ==========================================================================
// CONTROLADORES: TÉRMINOS Y PRIVACIDAD (Ley 25.326)
// ==========================================================================
function openPrivacyModal() {
  const modal = document.getElementById("privacyModal");
  if (modal) modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePrivacyModal() {
  const modal = document.getElementById("privacyModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

// ==========================================================================
// UTILIDADES, SEGURIDAD & TOAST
// ==========================================================================
function formatMoney(amount) {
  const symbol = (ACTIVE_CONFIG.payments && ACTIVE_CONFIG.payments.currencySymbol) || "$";
  const locale = (ACTIVE_CONFIG.payments && ACTIVE_CONFIG.payments.locale) || "es-AR";
  return `${symbol}${Number(amount || 0).toLocaleString(locale)}`;
}

function escapeHTML(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-msg";
  
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-circle-check";
  
  const textSpan = document.createElement("span");
  textSpan.textContent = String(message);
  
  toast.appendChild(icon);
  toast.appendChild(textSpan);
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
