#!/bin/bash

# Compile NIM presentation to PDF and HTML

echo "Compiling NIM presentation..."

# Navigate to marp-recipes-master directory for themes
cd marp-recipes-master

echo ""
echo "Generating PDF file (without notes)..."
npx @marp-team/marp-cli ../nim-presentation.md --html --pdf --allow-local-files --theme-set ./themes/

echo ""
echo "Generating HTML file (without notes)..."
npx @marp-team/marp-cli ../nim-presentation.md --html --theme-set ./themes/

echo ""
echo "Generating PDF file (with speaker notes)..."
npx @marp-team/marp-cli ../nim-presentation-with-notes.md --html --pdf --allow-local-files --theme-set ./themes/

echo ""
echo "Generating HTML file (with speaker notes)..."
npx @marp-team/marp-cli ../nim-presentation-with-notes.md --html --theme-set ./themes/

echo ""
echo "Compilation completed!"
echo "Files generated:"
echo "  - nim-presentation.pdf"
echo "  - nim-presentation.html"
echo "  - nim-presentation-with-notes.pdf"
echo "  - nim-presentation-with-notes.html" 