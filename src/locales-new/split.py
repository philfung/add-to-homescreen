import re
import json
import os

def split_locales(input_file, output_dir='locales'):
    """
    Splits a file containing multiple locale translations into separate JSON files.
    Each file will be named according to its locale code (e.g., en.json, es.json).
    """
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Read the entire file content
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split content by locale markers
    locale_blocks = re.split(r'\s*//(\w+)\s*\n', content)
    # Remove the first empty element
    locale_blocks = locale_blocks[1:]
    
    # Process pairs of locale code and content
    processed_count = 0
    for i in range(0, len(locale_blocks), 2):
        if i + 1 >= len(locale_blocks):
            break
            
        locale_code = locale_blocks[i]
        json_content = locale_blocks[i + 1].strip()
        
        # Skip empty blocks
        if not json_content:
            continue
            
        try:
            # Parse the JSON content
            translations = json.loads(json_content)
            
            # Create output file path
            output_file = os.path.join(output_dir, f'{locale_code}.json')
            
            # Write to individual JSON file
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(translations, f, ensure_ascii=False, indent=2)
            
            print(f"Created {output_file}")
            processed_count += 1
            
        except json.JSONDecodeError as e:
            print(f"Error processing locale {locale_code}: {str(e)}")
            print(f"Problematic content start: {json_content[:100]}...")
        except Exception as e:
            print(f"Unexpected error processing locale {locale_code}: {str(e)}")

    print(f"\nTotal locales processed: {processed_count}")

def main():
    input_file = "translations.json"
    output_dir = "locales"
    
    print(f"Processing {input_file}...")
    split_locales(input_file, output_dir)
    print("Done!")

if __name__ == "__main__":
    main()
