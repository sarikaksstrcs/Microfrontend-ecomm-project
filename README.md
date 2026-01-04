# Microfrontent (Micro-Frontend)

A small micro-frontend workspace containing a host shell (`container`) and a remote app (`products`). This README explains the repository layout, local development steps, and common commands to run the apps.

**Project Overview**

- **Name**: Miceofrontent (micro-frontend workspace).
- **Purpose**: Demonstrate a micro-frontend setup where `container` acts as the host application (shell) and `products` is a remote/child application.

**Project Structure**

- `container/`: Host/shell application. Responsible for loading and composing remote micro-frontends.
- `products/`: Remote micro-frontend that exposes features (e.g., product listing, product details).

Check each folder for its own `package.json` and scripts.

**Local Development**

1. Install dependencies and start the `container` (host):

```bash
cd container
npm install
npm run dev
```

2. In a separate terminal, install dependencies and start the `products` remote:

```bash
cd products
npm install
npm run dev
```

Notes:
- If you use `pnpm` or `yarn`, substitute `npm install` with `pnpm install` or `yarn`.
- Each package's `package.json` may contain different script names (e.g., `start`, `dev`). If `npm run dev` fails, inspect `package.json` in that folder for the correct script.

**Build & Production**

- To build each package for production, run the build script inside the package folder (if defined):

```bash
cd container
npm run build

cd ../products
npm run build
```

- Deployment depends on your hosting strategy (static host, CDN, or server). Configure the remote modules (e.g., module federation or import maps) to point at production URLs.

**Scripts**

- Check `container/package.json` and `products/package.json` for available scripts.
- Common script names: `dev`, `start`, `build`, `test`.

**Troubleshooting**

- If a remote module does not load in the host, ensure the remote app is running and that ports/URLs match the host configuration.
- If ports conflict, change the port in the remote's dev server configuration.
- If you see 404s for remote entries, verify the built artifacts and the path used by the host to load the remote.

**Contributing**

- Open an issue or submit a pull request with a clear description.
- Follow existing code style in each package and add tests for new features when possible.

**License**

- Add your preferred license (e.g., MIT) by creating a `LICENSE` file at the repository root.

---

If you want, I can:
- Add more detailed `dev`/`build` commands after inspecting each `package.json`.
- Add a `docker` or CI/CD example for deploying the apps.

Created at: project root `README.md`.
