"""
============================================================================
IMPORTADOR UNIVERSAL DE PRODUCTOS (import_products.py)
============================================================================
Este script permite convertir una planilla CSV o Excel en el archivo
'data/products.js' listo para ser utilizado por la tienda web.

Uso:
  python import_products.py [archivo.csv o archivo.xlsx]

Por defecto busca 'plantilla_inventario.csv' en la raíz.
"""

import sys
import os
import json
import csv
import re

def slugify(text):
    text = str(text or "").lower().strip()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def clean_price(val):
    if val is None or val == "":
        return 0
    if isinstance(val, (int, float)):
        return int(round(val))
    # String
    cleaned = str(val).replace("$", "").replace(".", "").replace(",", ".").strip()
    try:
        return int(round(float(cleaned)))
    except ValueError:
        return 0

def import_csv(file_path):
    products = []
    with open(file_path, mode="r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        idx = 1
        for row in reader:
            name = row.get("nombre") or row.get("name") or f"Producto {idx}"
            cat = slugify(row.get("categoria") or row.get("category") or "general")
            subcat = slugify(row.get("subcategoria") or row.get("subcategory") or "all")
            price = clean_price(row.get("precio") or row.get("price"))
            old_price_raw = row.get("precio_anterior") or row.get("old_price") or row.get("oldPrice")
            old_price = clean_price(old_price_raw) if old_price_raw else None
            desc = row.get("descripcion") or row.get("description") or f"{name} disponible para entrega inmediata."
            vol = row.get("presentacion") or row.get("volume") or row.get("unidad") or "Unidad estándar"
            img = row.get("imagen") or row.get("image") or "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
            badge = row.get("badge") or row.get("etiqueta") or ""

            prod = {
                "id": f"prod-{idx:03d}-{slugify(name)[:16]}",
                "code": f"ITEM-{idx:03d}",
                "name": name.strip(),
                "category": cat,
                "subcategory": subcat,
                "price": price,
                "oldPrice": old_price,
                "volume": vol.strip(),
                "rating": 4.9,
                "badge": badge.strip() if badge else None,
                "image": img.strip(),
                "description": desc.strip(),
                "pairing": "Recomendado para disfrutar en cualquier momento."
            }
            products.append(prod)
            idx += 1

    return products

def save_products_js(products, output_path="data/products.js"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    content = "// Catálogo oficial de productos generado automáticamente\n"
    content += "const PRODUCTS_DATA = " + json.dumps(products, indent=2, ensure_ascii=False) + ";\n\n"
    content += "if (typeof module !== 'undefined' && module.exports) {\n"
    content += "  module.exports = PRODUCTS_DATA;\n"
    content += "}\n"

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"✅ ¡Éxito! Se exportaron {len(products)} productos a '{output_path}'.")

def main():
    target_file = sys.argv[1] if len(sys.argv) > 1 else "plantilla_inventario.csv"

    if not os.path.exists(target_file):
        print(f"❌ Error: No se encontró el archivo '{target_file}'.")
        print("💡 Podés usar 'plantilla_inventario.csv' como modelo.")
        sys.exit(1)

    print(f"📂 Leyendo productos desde '{target_file}'...")
    if target_file.endswith(".csv"):
        products = import_csv(target_file)
    else:
        # Fallback pandas si es .xlsx
        try:
            import pandas as pd
            df = pd.read_excel(target_file)
            temp_csv = "_temp_import.csv"
            df.to_csv(temp_csv, index=False)
            products = import_csv(temp_csv)
            if os.path.exists(temp_csv):
                os.remove(temp_csv)
        except ImportError:
            print("⚠️ Para leer archivos .xlsx se requiere pandas y openpyxl ('pip install pandas openpyxl').")
            print("💡 Como alternativa, guardá tu archivo como CSV UTF-8 y ejecutá 'python import_products.py archivo.csv'.")
            sys.exit(1)

    save_products_js(products)

if __name__ == "__main__":
    main()
