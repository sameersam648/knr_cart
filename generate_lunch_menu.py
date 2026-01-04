"""
CSV to TypeScript Menu Parser
Generates complete lunch menu items from CSV files for the user app
"""

import re
import csv
from pathlib import Path

def clean_price(price_str):
    """Extract numeric price from string"""
    match = re.search(r'[\d.]+', price_str.replace(',', ''))
    return float(match.group()) if match else 0


def parse_gani_veg_line(line):
    """Parse a Gani Veg menu item line: Name – Price – Description"""
    # format is: Name – ₹Price – Description
    parts = line.split('–')
    if len(parts) >= 3:
        name = parts[0].strip()
        price_str = parts[1].strip()
        price = clean_price(price_str)
        description = parts[2].strip()
        return name, price, description
    return None, None, None

def generate_gani_veg_items():
    """Generate Gani Veg lunch menu items"""
    csv_path = Path(r"c:\Users\Admin\Desktop\projects\knr cart\gani veg lunch.csv")
    
    items = []
    current_category = "Veg Items" # Default
    item_id = 1
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            
            # Category detection: lines with emojis or no separators
            if '–' not in line:
                current_category = line.strip()
                # Clean emoji if present for cleaner category name in code? 
                # Actually keeping it might be nice for display, or strip it.
                # Let's keep it as is first, or maybe strip the emoji for the ID but keep for display?
                # The categories in Udupi were just text. Let's clean the emoji for consistency if needed, 
                # but "🍚 RICE ITEMS" looks fine as a category string.
                continue
            
            # Parse menu item
            name, price, description = parse_gani_veg_line(line)
            if name and price:
                # Assign food image
                image = "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop" # Default
                
                cat_upper = current_category.upper()
                name_upper = name.upper()
                
                if "RICE" in cat_upper or "RICE" in name_upper or "PULAO" in name_upper:
                     image = "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=400&h=300&fit=crop"
                elif "SOUP" in cat_upper:
                     image = "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop"
                elif "PANEER" in name_upper:
                     image = "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
                elif "MUSHROOM" in name_upper:
                     image = "https://images.unsplash.com/photo-1595855709915-d7659687e35b?w=400&h=300&fit=crop"
                elif "ROTI" in name_upper or "NAAN" in name_upper or "KULCHA" in name_upper:
                     image = "https://images.unsplash.com/photo-1626074353765-517a65ffe5c5?w=400&h=300&fit=crop"
                elif "GOBI" in name_upper:
                     image = "https://images.unsplash.com/photo-1645474640107-1647990b7677?w=400&h=300&fit=crop"
                
                # Clean category name for the object property (remove emojis maybe?)
                # Actually let's just use it as is, it's a string.
                clean_cat = current_category.replace('🥦', '').replace('🍚', '').replace('🫓', '').strip()
                
                # Generate item object
                item = f'''      {{ id: "gvl-{item_id}", name: "{name}", price: {int(price)}, description: "{description}", image: "{image}", category: "{clean_cat}" }},'''
                items.append(item)
                item_id += 1
    
    return items


def parse_gowda_lines(files_lines):
    """Parse Gowda menu items handling multi-line entries"""
    items = []
    buffer = ""
    
    for line in files_lines:
        line = line.strip()
        if not line:
            continue
            
        if '–' in line:
            # This line has the price/separator, so it completes the item
            full_text = (buffer + " " + line).strip()
            buffer = "" # Reset
            
            # Parse: Name - Price
            # Example: Chicken Pulao – ₹120 / ₹70
            parts = full_text.split('–')
            if len(parts) >= 2:
                name = parts[0].strip()
                price_part = parts[1].strip()
                
                # Extract first price (Full)
                # ₹120 / ₹70 -> 120
                price = clean_price(price_part.split('/')[0])
                
                description = name # Use name as description
                
                # Handle specific description in parenthesis if present in name?
                # e.g. "Country Chicken (Nati Koli) Pulao (Available only...)"
                
                items.append((name, price, description))
        else:
            # Line without separator, likely part of the name of the next item
            buffer += line + " "
            
    return items

def generate_gowda_items():
    """Generate Gowda lunch menu items"""
    csv_path = Path(r"c:\Users\Admin\Desktop\projects\knr cart\gowda pala lunch.csv")
    
    raw_lines = []
    with open(csv_path, 'r', encoding='utf-8') as f:
        raw_lines = f.readlines()
        
    parsed_data = parse_gowda_lines(raw_lines)
    
    items = []
    item_id = 1
    
    for name, price, description in parsed_data:
        # Category
        category = "GOWDA SPECIALS"
        
        # Image logic
        image = "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop" # Default non-veg
        name_upper = name.upper()
        
        if "CHICKEN" in name_upper or "KEBAB" in name_upper:
             image = "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop"
        elif "MUTTON" in name_upper or "MEAT" in name_upper or "KEEMA" in name_upper:
             image = "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop" # Generic meat curry look
        elif "EGG" in name_upper:
             image = "https://images.unsplash.com/photo-1504113882835-1a7eb443c988?w=400&h=300&fit=crop"
        elif "SOUP" in name_upper:
             image = "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop"
             
        item = f'''      {{ id: "gl-{item_id}", name: "{name}", price: {int(price)}, description: "{description}", image: "{image}", category: "{category}" }},'''
        items.append(item)
        item_id += 1
        
    return items


def parse_gani_nonveg_lines(file_lines):
    """Parse Gani Non-Veg menu items handling headers and multi-line descriptions"""
    items = []
    current_category = "NON-VEG STARTERS" # Default
    
    # Store the last item added to append description if needed
    last_item = None 
    
    for line in file_lines:
        line = line.strip()
        if not line:
            continue
            
        # Category header detection (Emoji start)
        if (line.startswith('🍗') or line.startswith('🍛') or line.startswith('🍱')) and '–' not in line:
            current_category = line.replace('🍗', '').replace('🍛', '').replace('🍱', '').strip()
            continue
            
        # Multi-line description (starts with parenthesis)
        if line.startswith('(') and last_item:
            # Append to last item's description
            last_item['description'] += " " + line
            continue
            
        # Parse Item Line: Name – Price – Description (Kannada)
        if '–' in line:
            parts = line.split('–')
            if len(parts) >= 3:
                name = parts[0].strip()
                price_str = parts[1].strip()
                desc_kannada = parts[2].strip()
                
                # Handle dual price: "159 / 179" -> take first (159)
                if '/' in price_str:
                    price_str = price_str.split('/')[0].strip()
                
                price = clean_price(price_str)
                
                # Use Kannada description, or combine? user app seems to use just description.
                # The CSV has Kannada. Let's stick to using the Kannada description or Name as description?
                # In previous files we used the name or the kannada text.
                # Udupi used Kannada description. Let's use the third part.
                description = desc_kannada
                
                item = {
                    'name': name,
                    'price': price,
                    'description': description,
                    'category': current_category
                }
                items.append(item)
                last_item = item
            elif len(parts) == 2:
                # Name – Price (No desc)
                name = parts[0].strip()
                price = clean_price(parts[1].strip())
                items.append({
                    'name': name,
                    'price': price,
                    'description': name, # Fallback
                    'category': current_category
                })
                
    return items

def generate_gani_non_veg_items():
    """Generate Gani Non-Veg lunch menu items"""
    csv_path = Path(r"c:\Users\Admin\Desktop\projects\knr cart\gani nonveg lunch.csv")
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    parsed_items = parse_gani_nonveg_lines(lines)
    
    ts_items = []
    item_id = 1
    
    for item in parsed_items:
        name = item['name']
        price = item['price']
        description = item['description']
        category = item['category']
        
        # Image Logic
        image = "https://images.unsplash.com/photo-1606471191009-63994c53433b?w=400&h=300&fit=crop" # Default Non-Veg Chicken
        name_upper = name.upper()
        cat_upper = category.upper()
        
        if "MUTTON" in name_upper or "MUTTON" in cat_upper:
             image = "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop"
        elif "FISH" in name_upper:
             image = "https://images.unsplash.com/photo-1535568289456-559d8c9a3a99?w=400&h=300&fit=crop"
        elif "PULAO" in name_upper or "RICE" in name_upper or "MEALS" in name_upper:
             image = "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop"
        elif "KEBAB" in name_upper:
             image = "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop"
        elif "SOUP" in name_upper:
             image = "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop"
        
        # Clean Description (remove newlines if any from appending)
        description = description.replace('\n', ' ').strip()
        
        ts_item = f'''      {{ id: "gnvl-{item_id}", name: "{name}", price: {int(price)}, description: "{description}", image: "{image}", category: "{category}" }},'''
        ts_items.append(ts_item)
        item_id += 1
        
    return ts_items


def parse_gani_egg_lines(file_lines):
    """Parse Gani Egg menu items"""
    items = []
    
    for line in file_lines:
        line = line.strip()
        if not line:
            continue
            
        if '–' in line:
            parts = line.split('–')
            if len(parts) >= 3:
                name = parts[0].strip()
                price = clean_price(parts[1].strip())
                description = parts[2].strip()
                
                items.append({
                    'name': name,
                    'price': price,
                    'description': description,
                    'category': "EGG SPECIALS"
                })
            elif len(parts) == 2:
                 name = parts[0].strip()
                 price = clean_price(parts[1].strip())
                 items.append({
                    'name': name,
                    'price': price,
                    'description': name,
                    'category': "EGG SPECIALS"
                })
                
    return items

def generate_gani_egg_items():
    """Generate Gani Egg lunch menu items"""
    csv_path = Path(r"c:\Users\Admin\Desktop\projects\knr cart\gani egg lunch.csv")
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    parsed_items = parse_gani_egg_lines(lines)
    
    ts_items = []
    item_id = 1
    
    for item in parsed_items:
        name = item['name']
        price = item['price']
        description = item['description']
        category = item['category']
        
        # Image Logic
        image = "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop" # Default Egg Curry
        name_upper = name.upper()
        
        if "PULAO" in name_upper or "RICE" in name_upper:
             image = "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop"
        elif "CHILLY" in name_upper or "MANCHURIAN" in name_upper:
             image = "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop"
        elif "BOILED" in name_upper:
             image = "https://images.unsplash.com/photo-1504113882835-1a7eb443c988?w=400&h=300&fit=crop"
        
        ts_item = f'''      {{ id: "gel-{item_id}", name: "{name}", price: {int(price)}, description: "{description}", image: "{image}", category: "{category}" }},'''
        ts_items.append(ts_item)
        item_id += 1
        
    return ts_items

def main():
    print("Generating Gani Egg lunch menu items...")
    items = generate_gani_egg_items()
    
    output_file = Path(r"c:\Users\Admin\Desktop\projects\knr cart\user\lib\gani-egg-items-generated.ts")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("// AUTO-GENERATED Gani Egg Lunch Menu Items\n")
        f.write("export const ganiEggItems = [\n")
        for item in items:
            f.write(item + "\n")
        f.write("];\n")
    
    print(f"✅ Generated {len(items)} items!")
    print(f"📄 Output saved to: {output_file}")

if __name__ == "__main__":
    main()
