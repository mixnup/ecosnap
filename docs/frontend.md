# Frontend Architecture

This document outlines the Domain-Driven Design (DDD) architecture and folder structure of the BrandSheet frontend.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Language** | TypeScript |
| **Styling** | TailwindCSS 4 |
| **Routing** | React Router DOM v7 |
| **State Management** | React Context (Auth, Workspace) |

---

## 📂 Domain-Driven Structure

The frontend is organized into isolated **Domains** (e.g., Dashboard, Client View, Landing). Each domain is self-contained and follows a recursive sub-folder pattern to maintain strict encapsulation.

### Recursive Domain Pattern
Every primary domain folder in `src/` implements the following structure:

```
src/[domain]/
├── pages/          # Entry points for routes within this domain
├── components/     # Reusable UI elements unique to this domain
├── sections/       # Complex, multi-component UI blocks (e.g., ColorGrid, HeroSection)
└── layouts/        # Domain-specific structural wrappers (Sidebar, Nav, Footer)
```

### Directory Map

| Directory | Scope | Responsibility |
| :--- | :--- | :--- |
| `src/auth/` | **Domain** | Login, registration, and password recovery flows. |
| `src/client/` | **Domain** | The public-facing, read-only brand sheet view. |
| `src/dashboard/` | **Domain** | The private editor, management, and settings interface. |
| `src/landing/` | **Domain** | Marketing pages and sales funnel. |
| `src/components/` | **Global** | Shared UI primitives (Buttons, Modals, Inputs) — the "Design System". |
| `src/services/` | **Global** | Firebase SDK wrappers and business logic (cross-domain). |
| `src/hooks/` | **Global** | Universal React hooks (e.g., `useAuth`, `useLocalStorage`). |
| `src/context/` | **Global** | Global state providers (Auth, Theme, Workspace). |
| `src/router/` | **Global** | Centralized route definitions and protection logic. |

---

## 🏗 Core Patterns

### 1. Domain Encapsulation
If a component or section is only used within the Dashboard, it **must** live in `src/dashboard/components` or `src/dashboard/sections`. We only move components to the global `src/components/` directory if they are truly generic primitives used across multiple domains.

### 2. "Standard" Signature Components
The global `src/components/` directory acts as our internal design system. These are "dumb" components that focus on visual consistency. Domain-specific components often compose these primitives with business logic.

### 3. Service-First Logic
Components should never interact with Firestore or Firebase Auth directly. All external side effects are encapsulated in `src/services/`, ensuring the UI layer remains clean and focused on rendering state.

### 4. Layout Composition
Pages in `src/[domain]/pages` should be wrapped in a layout from `src/[domain]/layouts`. This allows the dashboard to have a persistent sidebar while the landing page has a different navigation structure, without repeating code.

---

## 🚦 Naming Conventions

*   **Components**: PascalCase (e.g., `ColorCard.tsx`)
*   **Pages**: PascalCase (e.g., `EditorPage.tsx`)
*   **Hooks**: camelCase with `use` prefix (e.g., `useBrandData.ts`)
*   **Services**: camelCase (e.g., `brandsheetService.ts`)
