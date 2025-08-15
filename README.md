## Invest Portfolio

Frontend SPA (React + TypeScript + Vite) para visualizar y gestionar un portafolio de inversión: autenticación, listado de portafolios, detalle con métricas de performance, agregar assets y ver el rendimiento de cada transacción.

### Funcionalidades Implementadas

Autenticación y Sesión:
- Registro de usuario.
- Login y logout.
- Persistencia de sesión en `localStorage`.
- Protección de rutas privadas con `ProtectedRoute`.
- Obtención y almacenamiento de CSRF token para peticiones seguras.

Gestión de Portafolios:
- Listado de portafolios del usuario.
- Visualización del detalle de un portafolio (nombre, moneda base, fecha de creación).
- Métricas agregadas (cuando el endpoint detallado las provee): costo total, valor actual, ganancia/pérdida total y performance porcentual.

Gestión de Assets dentro de un Portafolio:
- Listado de assets con: símbolo, cantidad, precio promedio, valor, ganancia/pérdida y performance porcentual (si el backend los incluye).
- Modal para agregar nuevos assets (símbolo, cantidad, precio promedio).
- Modal de detalle por asset mostrando métricas y transacciones asociadas con: precio de compra, precio actual, P/L y performance % por transacción.

Mercado / Quotes:
- Consulta de cotización e historial breve por símbolo y periodo configurado.

Manejo de Datos y Estado:
- React Query para caching, refetch e invalidaciones al mutar (crear asset, etc.).
- Axios preconfigurado con interceptores para Authorization y CSRF.

UI / DX:
- Tailwind utility classes para estilos responsivos y dark mode.
- Componentes desacoplados (`AddAssets`, `AssetTransactionsModal`, etc.).

### Endpoints Consumidos Actualmente

Autenticación:
- POST /auth/login/
- POST /auth/register/
- POST /auth/logout/
- GET  /auth/csrf

Portafolios y Assets:
- GET  /portfolios/                (listado)
- GET  /portfolios/:id             (detalle con assets + métricas enriquecidas)
- POST /portfolios/                (crear portafolio)
- PUT  /portfolios/:id             (actualizar portafolio)
- DELETE /portfolios/:id           (eliminar portafolio)
- POST /portfolios/:id/assets/     (agregar asset al portafolio)

Mercado:
- GET /market/quote/?symbol=XXX&period=PERIOD

### Estructura de Carpetas (clave)
```
src/
  components/
    AddAssets.tsx
    AssetTransactionsModal.tsx
    ProtectedRoute.tsx
  context/
    AuthContext.tsx
    useAuth.ts
  hooks/
    usePortfolio.ts (React Query hooks)
  pages/
    auth/Login.tsx
    auth/Register.tsx
    dashboard/Portfolio.tsx
  services/
    api.ts
    auth.ts
    portfolio.ts
```

### Flujo de Datos Principal
1. Usuario inicia sesión -> tokens + usuario en localStorage.
2. Se obtiene y cachea CSRF token antes de mutaciones.
3. React Query carga portafolios y detalle bajo demanda (`usePortfolios`, `usePortfolio`).
4. Al agregar un asset (`useAddAssets`) se invalidan queries relevantes.
5. Modal de asset muestra métricas y transacciones usando los campos enriquecidos.

### Instalación y Scripts
```bash
pnpm install
pnpm dev      # desarrollo
pnpm build    # build producción
pnpm preview  # servir build
```

Variable de entorno:
```
VITE_API_URL=http://localhost:8000/api
```

### Próximas Mejoras Potenciales
- Refresh token automático / manejo de expiración.
- Filtros y ordenamiento de assets.
- Gráficas de evolución del portafolio.
- Tests unitarios e2e.
- Accesibilidad (focus states, ARIA labels adicionales).

### Licencia
Uso libre con fines educativos / demo.