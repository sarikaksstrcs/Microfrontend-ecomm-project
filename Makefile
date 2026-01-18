# ============================================================================
# Makefile for Microfrontend E-Commerce Application
# ============================================================================

# Colors for terminal output
RED=\033[0;31m
GREEN=\033[0;32m
YELLOW=\033[1;33m
BLUE=\033[0;34m
NC=\033[0m # No Color

# Project directories
HOST_DIR=host
PRODUCT_DIR=product-catalog
CART_DIR=cart
PROFILE_DIR=user-profile
SHARED_DIR=shared

# All microfrontend directories
MFE_DIRS=$(HOST_DIR) $(PRODUCT_DIR) $(CART_DIR) $(PROFILE_DIR) $(SHARED_DIR)

# Node package manager (npm or yarn)
PKG_MANAGER=npm

.PHONY: help install clean build dev start stop kill setup init all

# Default target
help:
	@echo "$(BLUE)╔══════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║    Microfrontend E-Commerce - Makefile Commands         ║$(NC)"
	@echo "$(BLUE)╚══════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(GREEN)Setup & Installation:$(NC)"
	@echo "  make init          - Complete setup (install + setup config files)"
	@echo "  make install       - Install dependencies in all microfrontends"
	@echo "  make setup         - Setup all configuration files"
	@echo ""
	@echo "$(GREEN)Development:$(NC)"
	@echo "  make dev           - Start all microfrontends in development mode"
	@echo "  make start         - Start all microfrontends (alias for dev)"
	@echo "  make dev-host      - Start only host application"
	@echo "  make dev-products  - Start only product catalog"
	@echo "  make dev-cart      - Start only shopping cart"
	@echo "  make dev-profile   - Start only user profile"
	@echo "  make dev-shared    - Start only shared library"
	@echo ""
	@echo "$(GREEN)Build & Production:$(NC)"
	@echo "  make build         - Build all microfrontends for production"
	@echo "  make build-host    - Build only host application"
	@echo ""
	@echo "$(GREEN)Cleanup & Maintenance:$(NC)"
	@echo "  make clean         - Remove node_modules and build artifacts"
	@echo "  make stop          - Stop all running dev servers"
	@echo "  make kill          - Force kill all Node processes on MFE ports"
	@echo "  make status        - Check status of all dev servers"
	@echo ""
	@echo "$(GREEN)Quick Start:$(NC)"
	@echo "  make all           - Full setup and start (init + dev)"
	@echo ""

# ============================================================================
# SETUP & INSTALLATION
# ============================================================================

# Complete initialization
init: clean install setup
	@echo "$(GREEN)✓ Initialization complete!$(NC)"
	@echo "$(YELLOW)Run 'make dev' to start all microfrontends$(NC)"

# Install dependencies in all microfrontends
install:
	@echo "$(BLUE)Installing dependencies in all microfrontends...$(NC)"
	@for dir in $(MFE_DIRS); do \
		echo "$(YELLOW)→ Installing in $$dir$(NC)"; \
		cd $$dir && $(PKG_MANAGER) install && cd ..; \
	done
	@echo "$(GREEN)✓ All dependencies installed!$(NC)"

# Setup configuration files
setup:
	@echo "$(BLUE)Setting up configuration files...$(NC)"
	@$(MAKE) setup-config
	@$(MAKE) setup-package-json
	@echo "$(GREEN)✓ Configuration setup complete!$(NC)"

# Create all necessary config files
setup-config:
	@echo "$(YELLOW)Creating configuration files...$(NC)"
	@for dir in $(MFE_DIRS); do \
		echo "→ Setting up $$dir"; \
		mkdir -p $$dir/public $$dir/src; \
		cp -n configs/tailwind.config.js $$dir/ 2>/dev/null || true; \
		cp -n configs/postcss.config.js $$dir/ 2>/dev/null || true; \
		cp -n configs/.babelrc $$dir/ 2>/dev/null || true; \
		cp -n configs/index.css $$dir/src/ 2>/dev/null || true; \
		cp -n configs/index.html $$dir/public/ 2>/dev/null || true; \
	done

# Setup package.json files
setup-package-json:
	@echo "$(YELLOW)Setting up package.json files...$(NC)"
	@# Host
	@cd $(HOST_DIR) && if [ ! -f package.json ]; then \
		echo '{"name":"host","version":"1.0.0","scripts":{"start":"webpack serve --open","build":"webpack --mode production"},"dependencies":{"react":"^18.2.0","react-dom":"^18.2.0","lucide-react":"^0.263.1"},"devDependencies":{"@babel/core":"^7.23.0","@babel/preset-env":"^7.23.0","@babel/preset-react":"^7.22.0","babel-loader":"^9.1.3","css-loader":"^6.8.1","html-webpack-plugin":"^5.5.3","postcss":"^8.4.31","postcss-loader":"^7.3.3","style-loader":"^3.3.3","tailwindcss":"^3.3.5","autoprefixer":"^10.4.16","webpack":"^5.89.0","webpack-cli":"^5.1.4","webpack-dev-server":"^4.15.1"}}' > package.json; \
	fi
	@# Product Catalog
	@cd $(PRODUCT_DIR) && if [ ! -f package.json ]; then \
		echo '{"name":"product-catalog","version":"1.0.0","scripts":{"start":"webpack serve","build":"webpack --mode production"},"dependencies":{"react":"^18.2.0","react-dom":"^18.2.0","lucide-react":"^0.263.1"},"devDependencies":{"@babel/core":"^7.23.0","@babel/preset-env":"^7.23.0","@babel/preset-react":"^7.22.0","babel-loader":"^9.1.3","css-loader":"^6.8.1","html-webpack-plugin":"^5.5.3","postcss":"^8.4.31","postcss-loader":"^7.3.3","style-loader":"^3.3.3","tailwindcss":"^3.3.5","autoprefixer":"^10.4.16","webpack":"^5.89.0","webpack-cli":"^5.1.4","webpack-dev-server":"^4.15.1"}}' > package.json; \
	fi
	@# Similar for other MFEs...

# ============================================================================
# DEVELOPMENT
# ============================================================================

# Start all microfrontends
dev:
	@echo "$(BLUE)╔══════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║  Starting All Microfrontends in Development Mode        ║$(NC)"
	@echo "$(BLUE)╚══════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@$(MAKE) dev-shared & sleep 2
	@$(MAKE) dev-products & sleep 1
	@$(MAKE) dev-cart & sleep 1
	@$(MAKE) dev-profile & sleep 1
	@$(MAKE) dev-host
	@echo ""
	@echo "$(GREEN)✓ All microfrontends started!$(NC)"
	@echo ""
	@echo "$(YELLOW)Access points:$(NC)"
	@echo "  Host Application:    http://localhost:3000"
	@echo "  Product Catalog:     http://localhost:3001"
	@echo "  Shopping Cart:       http://localhost:3002"
	@echo "  User Profile:        http://localhost:3003"
	@echo "  Shared Library:      http://localhost:3004"
	@echo ""
	@echo "$(BLUE)Press Ctrl+C to stop all servers$(NC)"

start: dev

# Start individual microfrontends
dev-host:
	@echo "$(GREEN)→ Starting Host (Port 3000)...$(NC)"
	@cd $(HOST_DIR) && $(PKG_MANAGER) start

dev-products:
	@echo "$(GREEN)→ Starting Product Catalog (Port 3001)...$(NC)"
	@cd $(PRODUCT_DIR) && $(PKG_MANAGER) start

dev-cart:
	@echo "$(GREEN)→ Starting Shopping Cart (Port 3002)...$(NC)"
	@cd $(CART_DIR) && $(PKG_MANAGER) start

dev-profile:
	@echo "$(GREEN)→ Starting User Profile (Port 3003)...$(NC)"
	@cd $(PROFILE_DIR) && $(PKG_MANAGER) start

dev-shared:
	@echo "$(GREEN)→ Starting Shared Library (Port 3004)...$(NC)"
	@cd $(SHARED_DIR) && $(PKG_MANAGER) start

# Start all in background with concurrently
dev-all-bg:
	@echo "$(BLUE)Starting all microfrontends in background...$(NC)"
	@npx concurrently --kill-others --prefix-colors "auto" \
		--names "SHARED,PRODUCTS,CART,PROFILE,HOST" \
		"cd $(SHARED_DIR) && $(PKG_MANAGER) start" \
		"cd $(PRODUCT_DIR) && $(PKG_MANAGER) start" \
		"cd $(CART_DIR) && $(PKG_MANAGER) start" \
		"cd $(PROFILE_DIR) && $(PKG_MANAGER) start" \
		"cd $(HOST_DIR) && $(PKG_MANAGER) start"

# ============================================================================
# BUILD & PRODUCTION
# ============================================================================

# Build all microfrontends
build:
	@echo "$(BLUE)Building all microfrontends for production...$(NC)"
	@for dir in $(MFE_DIRS); do \
		echo "$(YELLOW)→ Building $$dir$(NC)"; \
		cd $$dir && $(PKG_MANAGER) run build && cd ..; \
	done
	@echo "$(GREEN)✓ All microfrontends built successfully!$(NC)"

# Build individual microfrontends
build-host:
	@echo "$(YELLOW)Building host...$(NC)"
	@cd $(HOST_DIR) && $(PKG_MANAGER) run build

build-products:
	@echo "$(YELLOW)Building product catalog...$(NC)"
	@cd $(PRODUCT_DIR) && $(PKG_MANAGER) run build

build-cart:
	@echo "$(YELLOW)Building shopping cart...$(NC)"
	@cd $(CART_DIR) && $(PKG_MANAGER) run build

build-profile:
	@echo "$(YELLOW)Building user profile...$(NC)"
	@cd $(PROFILE_DIR) && $(PKG_MANAGER) run build

build-shared:
	@echo "$(YELLOW)Building shared library...$(NC)"
	@cd $(SHARED_DIR) && $(PKG_MANAGER) run build

# ============================================================================
# CLEANUP & MAINTENANCE
# ============================================================================

# Clean all build artifacts and dependencies
clean:
	@echo "$(RED)Cleaning all microfrontends...$(NC)"
	@for dir in $(MFE_DIRS); do \
		echo "$(YELLOW)→ Cleaning $$dir$(NC)"; \
		rm -rf $$dir/node_modules $$dir/dist $$dir/.cache $$dir/build; \
	done
	@echo "$(GREEN)✓ Cleanup complete!$(NC)"

# Stop all dev servers gracefully
stop:
	@echo "$(YELLOW)Stopping all dev servers...$(NC)"
	@-pkill -f "webpack serve" || true
	@-pkill -f "webpack-dev-server" || true
	@echo "$(GREEN)✓ All servers stopped$(NC)"

# Force kill all processes on MFE ports
kill:
	@echo "$(RED)Force killing all processes on MFE ports...$(NC)"
	@-lsof -ti:3000 | xargs kill -9 2>/dev/null || true
	@-lsof -ti:3001 | xargs kill -9 2>/dev/null || true
	@-lsof -ti:3002 | xargs kill -9 2>/dev/null || true
	@-lsof -ti:3003 | xargs kill -9 2>/dev/null || true
	@-lsof -ti:3004 | xargs kill -9 2>/dev/null || true
	@echo "$(GREEN)✓ All processes killed$(NC)"

# Check status of all dev servers
status:
	@echo "$(BLUE)Checking status of all microfrontends...$(NC)"
	@echo ""
	@echo "Port 3000 (Host):"
	@-lsof -i:3000 | grep LISTEN || echo "  $(RED)Not running$(NC)"
	@echo ""
	@echo "Port 3001 (Product Catalog):"
	@-lsof -i:3001 | grep LISTEN || echo "  $(RED)Not running$(NC)"
	@echo ""
	@echo "Port 3002 (Shopping Cart):"
	@-lsof -i:3002 | grep LISTEN || echo "  $(RED)Not running$(NC)"
	@echo ""
	@echo "Port 3003 (User Profile):"
	@-lsof -i:3003 | grep LISTEN || echo "  $(RED)Not running$(NC)"
	@echo ""
	@echo "Port 3004 (Shared Library):"
	@-lsof -i:3004 | grep LISTEN || echo "  $(RED)Not running$(NC)"

# ============================================================================
# QUICK START
# ============================================================================

# Complete setup and start
all: init dev

# ============================================================================
# UTILITY COMMANDS
# ============================================================================

# Install concurrently for parallel execution
install-concurrently:
	@npm install -g concurrently

# Check Node and npm versions
check-env:
	@echo "$(BLUE)Environment Check:$(NC)"
	@echo "Node version: $$(node --version)"
	@echo "NPM version: $$(npm --version)"
	@echo "Current directory: $$(pwd)"

# Create directory structure
create-dirs:
	@echo "$(YELLOW)Creating directory structure...$(NC)"
	@for dir in $(MFE_DIRS); do \
		mkdir -p $$dir/src $$dir/public; \
	done
	@mkdir -p configs
	@echo "$(GREEN)✓ Directories created$(NC)"

# Lint all microfrontends
lint:
	@echo "$(BLUE)Linting all microfrontends...$(NC)"
	@for dir in $(MFE_DIRS); do \
		if [ -f $$dir/package.json ]; then \
			echo "$(YELLOW)→ Linting $$dir$(NC)"; \
			cd $$dir && $(PKG_MANAGER) run lint 2>/dev/null || echo "No lint script"; \
			cd ..; \
		fi; \
	done

# Update all dependencies
update:
	@echo "$(BLUE)Updating all dependencies...$(NC)"
	@for dir in $(MFE_DIRS); do \
		echo "$(YELLOW)→ Updating $$dir$(NC)"; \
		cd $$dir && $(PKG_MANAGER) update && cd ..; \
	done
	@echo "$(GREEN)✓ All dependencies updated!$(NC)"

# Show logs
logs:
	@echo "$(BLUE)Recent logs:$(NC)"
	@tail -f $(HOST_DIR)/npm-debug.log 2>/dev/null || echo "No logs available"