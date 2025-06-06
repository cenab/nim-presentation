# NIM Presentation Project

This project contains a Marp-based presentation for Network Identity Management (NIM), with advanced diagram rendering (including Mermaid diagrams via Kroki).

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

## Installation

1. **Clone the repository** (if you haven't already):
   ```sh
   git clone <your-repo-url>
   cd nim-backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

## Building the Presentation

### HTML Output
To build the HTML version of the presentation (with Mermaid diagrams rendered via Kroki):
```sh
npm run build:html
```
- Output: `presentations/nim-presentation.html`

### PDF Output
To build the PDF version:
```sh
npm run build:pdf
```
- Output: `presentations/nim-presentation.pdf`

## How Mermaid Diagrams Work
- Mermaid and other Kroki-supported diagrams are rendered automatically using a custom Marp plugin and the [Kroki](https://kroki.io/) service.
- No extra steps are needed—just use fenced code blocks with `mermaid` in your Markdown.

## Directory Structure
- `presentations/nim-presentation.md` — Main presentation source (Markdown)
- `themes/` — Custom Marp themes
- `assets/` — Images and video assets
- `diagrams/marp-diagrams/` — Kroki plugin and Marp config for diagram rendering

## Troubleshooting
- If diagrams do not render, ensure you are connected to the internet (Kroki is a web service).
- For local-only rendering or advanced diagramming, see `diagrams/marp-diagrams/` for more options.

## License
See individual files for license information. 