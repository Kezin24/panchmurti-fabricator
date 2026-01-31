# Panchmurti Fabricator Website - Modular Structure

## 📁 Project Structure

```
panchmurti-project/
├── index.html              # Main entry point (loads all sections dynamically)
├── README.md              # This file
│
├── css/                   # All CSS files organized by section
│   ├── base.css          # Variables, resets, common styles
│   ├── navigation.css    # Navigation bar & hamburger menu
│   ├── hero.css          # Hero section
│   ├── services.css      # Services grid
│   ├── features.css      # Why choose us / Features
│   ├── industries.css    # Industries section
│   ├── clients.css       # Client cards & logos
│   ├── case-studies.css  # Case studies
│   ├── quality.css       # Quality & safety
│   ├── certificates.css  # Certificates & modal
│   ├── gallery.css       # Gallery & lightbox
│   ├── contact.css       # Contact form
│   ├── footer.css        # Footer styles
│   └── responsive.css    # All media queries
│
├── pages/                 # Complete standalone HTML pages
│   ├── navigation.html   # Navigation page with linked CSS
│   ├── hero.html         # Hero page with linked CSS
│   ├── why-choose-us.html # Why choose us page with linked CSS
│   ├── services.html     # Services page with linked CSS
│   ├── industries.html   # Industries page with linked CSS
│   ├── quality-safety.html # Quality page with linked CSS
│   ├── case-studies.html # Case studies page with linked CSS
│   ├── clients.html      # Clients page with linked CSS
│   ├── gallery.html      # Gallery page with linked CSS
│   ├── certificates.html # Certificates page with linked CSS
│   ├── contact.html      # Contact page with linked CSS
│   └── footer.html       # Footer page with linked CSS
│
├── sections/              # HTML sections (fragments without <html> tags)
│   ├── navigation.html
│   ├── hero.html
│   ├── why-choose-us.html
│   ├── services.html
│   ├── industries.html
│   ├── quality-safety.html
│   ├── case-studies.html
│   ├── clients.html
│   ├── gallery.html
│   ├── lightbox.html
│   ├── certificates.html
│   ├── contact.html
│   └── footer.html
│
└── js/
    └── main.js            # All JavaScript functions
```

## 🎯 How to Use

### Option 1: Main Site (Recommended)
Open `index.html` - This is the main entry point that loads all sections dynamically using JavaScript.

### Option 2: Individual Pages
Each page in the `pages/` folder is a complete standalone HTML file with:
- Full HTML structure
- Linked CSS files
- Independent functionality

You can open any page directly:
- `pages/navigation.html`
- `pages/hero.html`
- `pages/services.html`
- etc.

### Option 3: Section Fragments
The `sections/` folder contains HTML fragments (without `<html>`, `<head>`, `<body>` tags) that can be:
- Included in PHP: `<?php include 'sections/hero.html'; ?>`
- Loaded via JavaScript (as done in main `index.html`)
- Used with build tools or frameworks

## 📝 CSS Organization

Each CSS file corresponds to a specific section:
- `base.css` - Load this first (contains variables and global styles)
- Other CSS files - Load in any order, they're independent

**In the standalone pages:** Each page links only to the CSS it needs
**In the main index:** All CSS files are loaded for all sections

## 🔧 JavaScript

All JavaScript is in `js/main.js` and includes:
- Menu toggle functions
- Smooth scrolling
- Form handling
- Gallery/lightbox functionality
- Modal functions
- Active navigation highlighting

## 🚀 Development Workflow

**For editing a specific section:**
1. Edit the section HTML in `sections/` folder
2. Edit corresponding CSS in `css/` folder
3. Changes will reflect in both `index.html` and individual `pages/`

**For standalone page development:**
1. Edit pages directly in `pages/` folder
2. Each page has its own CSS linked

## 📦 Deployment Options

1. **Single Page Site**: Use `index.html` (loads sections dynamically)
2. **Multi-Page Site**: Use individual files from `pages/` folder
3. **PHP/Server-Side**: Use sections from `sections/` folder with includes
4. **Framework**: Convert to React/Vue/etc. components

## 🔗 File Connections

```
index.html
    ├─→ css/base.css
    ├─→ css/navigation.css
    ├─→ css/hero.css
    ├─→ ... (all CSS files)
    ├─→ sections/navigation.html (loaded via JS)
    ├─→ sections/hero.html (loaded via JS)
    └─→ js/main.js

pages/hero.html
    ├─→ css/base.css
    ├─→ css/hero.css
    └─→ css/responsive.css
```

Each standalone page in `pages/` is completely independent and can be used separately!
