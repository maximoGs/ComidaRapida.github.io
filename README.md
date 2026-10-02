# 🍔 FUEGO BURGER • Tienda Web de Comida Rápida & Delivery

Plataforma digital moderna, ultra rápida, visualmente llamativa y 100% responsive diseñada específicamente para **locales de comida rápida, hamburgueserías smash, lomiterías y delivery de fast food**. 

Desarrollada con **paleta cromática en rojo fuego, queso cheddar fundido y carbón**, arquitectura desacoplada de **costo de hosting $0** (Cloudflare Pages, Netlify o Vercel) y **checkout directo por WhatsApp** formateado con emojis de comida rápida.

---

## 🎨 Identidad Visual & Diseño "Llamativo y Simple"

- **Paleta de Colores Fast Food:**
  - **Rojo Primario Fuego:** `#E11D48` / `#FF2A4B` (Botones de acción, bordes activos, promociones y acentos de brasa).
  - **Dorado Cheddar / Mostaza:** `#F59E0B` / `#FBBF24` (Badges de ofertas, precios destacados, estrellas de calificación).
  - **Carbón Profundo & Superficies Oscuras:** `#0D0A0C` / `#161113` (Fondo de alto contraste que hace resaltar el color de las carnes y el pan brioche).
- **Logotipo SVG Exclusivo ([`assets/logo.svg`](assets/logo.svg)):**
  - Emblema circular con hamburguesa smash doble con cheddar fundido chorreante, semillas de sésamo, lechuga crocante y llamas de fuego.
- **Tipografía Dinámica:**
  - **Encabezados:** `Outfit` (fuente sans-serif geométrica moderna y contundente).
  - **Cuerpo y lectura:** `Plus Jakarta Sans` (alta legibilidad en móviles).

---

## 🚀 Funcionalidades de la Tienda de Comida Rápida

1. **⚡ Catálogo por Pestañas & Subcategorías Dinámicas:**
   - **🍔 Hamburguesas:** Doble Smash, Triple Bacon Cheese Monster, Oklahoma Fried Onion, Crispy Chicken Royale, Blue Cheese Gourmet, Veggie NotBurger.
   - **🔥 Combos & Promos:** Combo Individual con papas y gaseosa, Mega Combo Dúo para 2, Box Cuarteto Amigos, Crispy Tenders Box.
   - **🍟 Papas & Acompañamientos:** Papas Volcán con Cheddar & Bacon, Papas Rústicas con Alioli, Mozzarella Sticks, Aros de Cebolla, Nuggets.
   - **🌭 Hot Dogs & Sandwiches:** Hot Dog Americano XL con papas pay, Hot Dog Tex-Mex con jalapeños, Lomito Completo Argentino, Sándwich de Milanesa.
   - **🥤 Bebidas & Shakes:** Milkshake de Dulce de Leche y Oreo, Frutilla a la Crema, Coca-Cola fría, Cerveza Andes helada y Vaso Chocotorta.

2. **🛒 Carrito Lateral & 1-Click Fast Ordering:**
   - Contador de productos y cálculo automático de subtotal en tiempo real.
   - Descuento automático en efectivo (10% OFF configurable) o cupones de promoción (`FUEGO10`, `BURGERAMIGOS`).
   - Cálculo automático de envío en moto o retiro en mostrador gratuito.

3. **📲 Checkout Directo por WhatsApp:**
   - Genera un mensaje formateado y prolijo directo al WhatsApp de cocina con cliente, dirección, método de entrega, medio de pago y detalle de cada ítem con notas adicionales.

4. **📱 Experiencia Mobile First (Estilo App Nativa):**
   - **Barra de navegación inferior fija:** Acceso en un toque a Burgers, Combos, Papas, Bebidas y Carrito.
   - Buscador táctil en cabecera móvil.
   - Conmutador de vista Cuadrícula (Grid) / Lista rápida (List).

5. **🛠️ Módulo de Configuración Central ([`config.js`](config.js)):**
   - Modificá precios, número de WhatsApp, costo de cadetería, dirección del local y promociones desde un único archivo sin tocar HTML ni CSS.

---

## 📁 Estructura del Proyecto

```text
comidarapidaweb/
│
├── index.html                 # Estructura principal con diseño de comida rápida
├── styles.css                 # Sistema de estilos y variables CSS (Rojo, Cheddar y Carbón)
├── app.js                     # Motor dinámico de catálogo, filtros, carrito y WhatsApp
├── config.js                  # ⚡ Configuración central del local (Marca, colores, horarios, envíos)
│
├── data/
│   └── products.js            # Catálogo oficial de hamburguesas, combos, papas y bebidas
│
├── assets/
│   └── logo.svg               # Logotipo vectorial de Fuego Burger Fast Food
│
├── configurador.html          # Asistente visual interactivo para modificar el local
├── _headers                   # Reglas de seguridad y caché para Cloudflare / Netlify
├── _redirects                 # Reglas SPA
└── README.md                  # Este documento
```

---

## ⚡ ¿Cómo Probar y Desplegar?

1. **Abrir localmente:**
   - Podés abrir `index.html` con doble clic o con la extensión Live Server de VS Code.
   - O mediante consola ejecutando:
     ```bash
     npx serve .
     # o
     python -m http.server 8080
     ```
2. **Personalizar para tu propio negocio:**
   - Abrí `config.js` y cambiá `contact.whatsappNumber` por tu número oficial de WhatsApp con código de país (ej: `5492612586004`).
   - Cambiá la dirección en `logistics.pickupAddress`.
