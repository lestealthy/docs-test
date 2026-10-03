# PDF to Text Converter

A Python utility to convert PDF files to text files for easier content extraction and analysis.

## Features

- Converts PDF files to plain text format
- Uses multiple PDF processing libraries for better compatibility
- Handles complex layouts and tables
- Progress tracking with tqdm
- Comprehensive error handling and logging
- Automatic fallback between different PDF processing methods

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

## Usage

1. Place your PDF files in the `pdfs/` directory
2. Run the converter:
```bash
python pdf_to_txt_converter.py
```

The converted text files will be saved in `docs/txt/` directory.

## Libraries Used

- **PyPDF2**: Primary PDF text extraction
- **pdfplumber**: Advanced PDF processing with better layout handling
- **tqdm**: Progress bar for better user experience

## Output

- Text files are saved with the same name as the original PDF
- Each page is clearly marked with page numbers
- Tables are converted to pipe-separated format
- A conversion summary is generated

## Error Handling

The converter tries multiple methods:
1. First attempts pdfplumber (better for complex layouts)
2. Falls back to PyPDF2 if pdfplumber fails
3. Logs all errors for debugging

## Requirements

- Python 3.7+
- PDF files in the `pdfs/` directory
- Required Python packages (see requirements.txt)

