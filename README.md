# E-Commerce Microfrontend Application

A scalable e-commerce platform built with **Microfrontend Architecture** using **Webpack Module Federation**.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Webpack](https://img.shields.io/badge/Webpack-5.89.0-brightgreen)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.5-38B2AC)

---
## Dashboard
<img width="1457" height="751" alt="image" src="https://github.com/user-attachments/assets/52c58166-35e2-4ec1-902e-f5b834be4f65" />

## Product Listing
<img width="1451" height="742" alt="image" src="https://github.com/user-attachments/assets/de8d08f6-69be-4871-bb0a-8e5572a1b821" />

## Carts
<img width="1451" height="742" alt="image" src="https://github.com/user-attachments/assets/7f0b7695-26dd-4f73-9bba-7f9600ac5df6" />

## User Profile
<img width="1451" height="738" alt="image" src="https://github.com/user-attachments/assets/cc339697-00f8-43f3-944d-06c029a714ae" />


## Overview

Independent frontend applications working together seamlessly - Product Catalog, Shopping Cart, User Profile, and Shared utilities.

### Application URLs

| Application | Port | URL |
|------------|------|-----|
| Host | 3000 | http://localhost:3000 |
| Product Catalog | 3001 | http://localhost:3001 |
| Shopping Cart | 3002 | http://localhost:3002 |
| User Profile | 3003 | http://localhost:3003 |
| Shared Library | 3004 | http://localhost:3004 |

---

## Features

- **Module Federation** - Independent deployment of each microfrontend
- **Event-Driven Communication** - Decoupled MFE interaction
- **Mock Data** - No backend required (uses Faker.js)
- **Responsive Design** - Mobile-first approach
- **Hot Reload** - Fast development workflow

---

## Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/ecommerce-mfe.git
cd ecommerce-mfe

# Initialize and start
make init
make dev

# Or manually
npm install  # in each directory
npm start    # in each directory
```

**Access:** http://localhost:3000

---

## Project Structure

```
ecommerce-mfe/
├── host/                 # Main shell (3000)
├── product-catalog/      # Products MFE (3001)
├── shopping-cart/        # Cart MFE (3002)
├── user-profile/         # Profile MFE (3003)
├── shared/              # Utilities (3004)
├── Makefile             # Build automation
└── README.md
```

---

## Commands

### Makefile (Recommended)
```bash
make help          # Show all commands
make dev           # Start all MFEs
make build         # Build for production
make clean         # Clean dependencies
make stop          # Stop servers
make kill          # Force kill processes
```

### Manual
```bash
npm start          # Development
npm run build      # Production build
```

---

## Configuration

### Webpack Module Federation

**Host (Consumer):**
```javascript
remotes: {
  productCatalog: 'productCatalog@http://localhost:3001/remoteEntry.js',
  shoppingCart: 'shoppingCart@http://localhost:3002/remoteEntry.js',
  userProfile: 'userProfile@http://localhost:3003/remoteEntry.js',
}
```

**MFE (Provider):**
```javascript
exposes: {
  './ProductCatalog': './src/ProductCatalog',
}
```

### Event Bus Communication
```javascript
// Publish
eventBus.emit('cart:add', product);

// Subscribe
eventBus.on('cart:add', (product) => { /* handle */ });
```

---

## Production Build

```bash
make build  # Build all MFEs
```

Output in `dist/` directory of each MFE.

---

## Troubleshooting

```bash
make kill          # Port in use
make clean         # Module errors
make status        # Check running servers
```

---

## Deployment

**Netlify/Vercel:**
```bash
cd host && netlify deploy --prod
cd product-catalog && netlify deploy --prod
```

**Docker:**
```bash
docker-compose up -d
```

---

## Tech Stack

- React 18.2
- Webpack 5 + Module Federation
- Tailwind CSS
- Babel
- Faker.js

---

