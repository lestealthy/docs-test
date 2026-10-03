#!/usr/bin/env python3
"""
Simple PDF to Text Converter
A more robust version that handles errors gracefully
"""

import os
import sys
from pathlib import Path
import PyPDF2
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def convert_pdf_to_text(pdf_path, output_path):
    """Convert a single PDF to text using PyPDF2"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            
            logger.info(f"Processing {len(pdf_reader.pages)} pages...")
            
            for page_num in range(len(pdf_reader.pages)):
                try:
                    page = pdf_reader.pages[page_num]
                    page_text = page.extract_text()
                    
                    if page_text.strip():
                        text += f"\n--- Page {page_num + 1} ---\n"
                        text += page_text
                        text += "\n"
                    else:
                        text += f"\n--- Page {page_num + 1} (No text found) ---\n"
                        
                except Exception as e:
                    logger.warning(f"Error processing page {page_num + 1}: {e}")
                    text += f"\n--- Page {page_num + 1} (Error: {e}) ---\n"
                    
        # Write to file
        with open(output_path, 'w', encoding='utf-8', errors='ignore') as f:
            f.write(text)
            
        return True
        
    except Exception as e:
        logger.error(f"Failed to convert {pdf_path}: {e}")
        return False

def main():
    """Main function"""
    print("Simple PDF to Text Converter")
    print("===========================")
    
    # Setup paths
    input_dir = Path("_docs/pdfs")
    output_dir = Path("docs/txt")
    
    if not input_dir.exists():
        print(f"Error: Input directory '{input_dir}' not found!")
        return
    
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Get all PDF files
    pdf_files = list(input_dir.glob("*.pdf"))
    if not pdf_files:
        print(f"No PDF files found in {input_dir}")
        return
    
    print(f"Found {len(pdf_files)} PDF files to convert")
    
    successful = 0
    failed = 0
    
    for i, pdf_file in enumerate(pdf_files, 1):
        print(f"\n[{i}/{len(pdf_files)}] Converting: {pdf_file.name}")
        
        output_file = output_dir / f"{pdf_file.stem}.txt"
        
        if convert_pdf_to_text(pdf_file, output_file):
            print(f"✓ Success: {output_file.name}")
            successful += 1
        else:
            print(f"✗ Failed: {pdf_file.name}")
            failed += 1
    
    print(f"\n=== Conversion Summary ===")
    print(f"Total files: {len(pdf_files)}")
    print(f"Successful: {successful}")
    print(f"Failed: {failed}")
    print(f"Output directory: {output_dir}")

if __name__ == "__main__":
    main()

