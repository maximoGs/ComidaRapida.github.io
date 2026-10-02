/**
 * ============================================================================
 * PLANTILLA DE PRODUCTOS (products_template.js)
 * ============================================================================
 * Utilizá esta estructura para cargar productos de cualquier tipo de negocio.
 * 
 * Campos esenciales:
 * - id: Identificador único alfanumérico (ej: 'prod-001')
 * - name: Nombre del producto
 * - category: Debe coincidir exactamente con el 'id' de una categoría en config.js
 * - subcategory: Debe coincidir con el 'id' de una subcategoría en config.js
 * - price: Precio numérico actual de venta
 * - oldPrice: Precio anterior tachado (null si no está en descuento)
 * - image: URL pública de la imagen (Unsplash, Cloudinary, Imgur, o ruta local assets/...)
 * - description: Descripción detallada para el modal
 * - volume / variant: Presentación o unidad (ej: '250 g', 'Talle M', '500 ml', 'Porción individual')
 * - rating: Calificación numérica (ej: 4.9)
 * - badge: Etiqueta destacada opcional (ej: 'Más Vendido', 'Nuevo', 'Promo', 'Veggie')
 * - origin / details: Datos extra para la ficha técnica
 */

const PRODUCTS_DATA = [
  {
    "id": "prod-ejemplo-1",
    "code": "ITEM-01",
    "name": "Producto Estrella Destacado",
    "category": "categoria-1",
    "subcategory": "subcategoria-1",
    "price": 12500,
    "oldPrice": 14000,
    "cost": 8000,
    "stock": 25,
    "volume": "Presentación Estándar",
    "origin": "Fabricación Propia / Calidad Premium",
    "rating": 5.0,
    "badge": "Más Vendido 🔥",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
    "description": "Descripción completa del producto resaltando sus beneficios, materiales, ingredientes y propuesta de valor única para tus clientes.",
    "pairing": "Recomendación de uso, acompañamiento o sugerencia de consumo."
  },
  {
    "id": "prod-ejemplo-2",
    "code": "ITEM-02",
    "name": "Combo / Opción Especial",
    "category": "categoria-1",
    "subcategory": "subcategoria-2",
    "price": 9800,
    "oldPrice": null,
    "cost": 6000,
    "stock": 15,
    "volume": "Pack x 2 u.",
    "origin": "Línea Oficial",
    "rating": 4.8,
    "badge": "Recomendado ✨",
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
    "description": "Excelente opción para regalar o compartir. Elaborado con materias primas seleccionadas y garantía de satisfacción.",
    "pairing": "Ideal para complementar con cualquier artículo de nuestra línea."
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = PRODUCTS_DATA;
}
