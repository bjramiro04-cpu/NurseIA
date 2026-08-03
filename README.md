# nurseIA

Copiloto clínico para enfermería: detecta diagnósticos NANDA a partir de una
descripción clínica en texto libre, prioriza según el esquema ABCDE, genera
evoluciones de enfermería en formato PAC, mantiene un mapa de triaje visual
del piso y ofrece un asistente de chat con IA para consultas clínicas.

## Qué hace la app

La app tiene 4 secciones (pestañas en la barra lateral):

- **Análisis Clínico** — el enfermero escribe una descripción del paciente
  (signos vitales, síntomas, observaciones). El motor de matching detecta
  diagnósticos NANDA por palabras clave, los prioriza (Alta/Media/Baja +
  categoría ABCDE), muestra una alerta si hay compromiso vital (A-B, C o D),
  y genera una evolución PAC (Valoración / Diagnóstico / NOC / NIC /
  Evaluación) usando IA. Si la IA no responde, cae a un texto de evolución
  estático precargado por diagnóstico. Las evoluciones se pueden copiar o
  guardar en el historial.
- **Mapa de Triaje** — vista de habitaciones/camas del piso con estado
  (crítico/alerta/estable/vacía), datos del paciente, alertas NANDA activas y
  una nota para el próximo turno. Es totalmente configurable: agregar/quitar
  habitaciones y camas, editar pacientes. Al escribir una valoración en el
  editor de cama, el mismo motor NANDA recalcula automáticamente el estado
  de la cama.
- **Asistente IA** — chat libre con un asistente entrenado para responder
  dudas de enfermería (diagnósticos, NIC/NOC, farmacología, cálculos de
  dosis, protocolos).
- **Historial** — evoluciones guardadas durante el turno, con opción de
  restaurarlas en el módulo de Análisis, copiarlas o borrarlas.

Todo el estado (dark mode, idioma, configuración del piso, historial) persiste
en `localStorage` del navegador — no hay base de datos todavía, pero la IA sí
tiene un backend propio (ver abajo).

> **Nota sobre la IA**: el navegador nunca le habla a Anthropic directamente
> ni conoce ninguna API key. El cliente le pega a nuestros propios endpoints
> (`/api/evolution` y `/api/chat`), que corren en el servidor de Next.js y
> son los únicos que usan `ANTHROPIC_API_KEY` (ver
> [Configurar la API key de Claude](#configurar-la-api-key-de-claude)). Si no
> configuraste la key, esos endpoints devuelven un error claro y la app cae
> automáticamente al texto de evolución estático — no se rompe nada, solo no
> hay generación con IA real.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Estilos | [Tailwind CSS 3](https://tailwindcss.com/) |
| Estado global | [Zustand](https://github.com/pmndrs/zustand) |
| Íconos | [@heroicons/react](https://github.com/tailwindlabs/heroicons) (outline v1) |
| Notificaciones | [react-hot-toast](https://react-hot-toast.com/) |
| IDs únicos | [nanoid](https://github.com/ai/nanoid) |
| Utilidad de clases | [clsx](https://github.com/lukeed/clsx) |
| Tests | [Vitest](https://vitest.dev/) + [jsdom](https://github.com/jsdom/jsdom) |
| Backend IA | Route Handlers de Next.js (`src/app/api/`) — proxy server-side hacia la API de Anthropic |

La persistencia de datos (historial, piso, config) es 100% `localStorage`
(no hay base de datos todavía). La IA sí corre server-side, ver abajo.

## Cómo iniciar el proyecto

Requiere Node.js 18.18+ (recomendado 20+) y npm.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

Otros comandos:

```bash
npm run build   # build de producción (Next.js)
npm run start   # sirve el build de producción (requiere haber corrido build antes)
npm run lint    # ESLint
npm test        # corre los tests con Vitest
```

## Configurar la API key de Claude

Sin esto la app funciona igual, pero la evolución PAC y el chat del
Asistente IA van a usar el fallback estático en vez de generar contenido
real. Para habilitar la IA:

```bash
cp .env.local.example .env.local
```

Y completá tu key en `.env.local`:

```
ANTHROPIC_API_KEY=sk-ant-...
```

`.env.local` nunca se commitea (está en `.gitignore`). La key solo se lee en
`src/services/anthropicServer.ts`, que se importa exclusivamente desde los
route handlers en `src/app/api/evolution/route.ts` y `src/app/api/chat/route.ts`
— nunca llega al bundle del navegador. Reiniciá `npm run dev` después de crear
o modificar `.env.local`.

## Estructura de carpetas

```
├── public/                  # assets estáticos (logo, etc.)
├── src/
│   ├── app/                 # App Router de Next.js
│   │   ├── layout.tsx       # layout raíz: fuentes (Inter, DM Serif Display), <Toaster/>
│   │   ├── page.tsx         # única ruta de la app: monta <AppShell/>
│   │   ├── globals.css      # Tailwind + clases @layer reutilizables (btn, pills, cama, modal...)
│   │   └── api/             # Route Handlers server-side (el único lugar con la API key)
│   │       ├── evolution/route.ts  # genera la evolución PAC vía Claude
│   │       └── chat/route.ts       # responde al Asistente IA vía Claude
│   │
│   ├── components/          # UI, organizada por feature — ningún .tsx supera 250 líneas
│   │   ├── layout/          # AppShell (shell + tabs), Sidebar, Header
│   │   ├── analisis/        # Tab de Análisis Clínico (input, diagnósticos, evolución PAC)
│   │   ├── triage/          # Tab de Mapa de Triaje (mapa, panel de detalle, modales)
│   │   ├── asistente/       # Tab de chat con IA
│   │   ├── historial/       # Tab de historial de evoluciones
│   │   └── icons/           # Re-exports tipados de @heroicons/react con nombres semánticos
│   │
│   ├── hooks/                # Estado global (stores de Zustand) + hooks de utilidad
│   │   ├── useUiStore.ts        # tab activo, dark mode, idioma, sidebar (persistido)
│   │   ├── useAnalysisStore.ts  # estado del análisis clínico + llamada a IA
│   │   ├── useTriageStore.ts    # habitaciones/camas del piso + todas sus mutaciones
│   │   ├── useHistoryStore.ts   # historial de evoluciones guardadas
│   │   ├── useChatStore.ts      # mensajes del Asistente IA
│   │   ├── useHydrateStores.ts  # hidrata todos los stores desde localStorage al montar
│   │   └── useApplyDarkMode.ts  # sincroniza la clase `dark` del <html>
│   │
│   ├── services/              # Lógica de negocio pura (sin React, testeable)
│   │   ├── nandaEngine.ts        # matching/orden/porcentaje de diagnósticos, alerta ABCDE
│   │   ├── text.ts               # normalización de texto y matching tolerante de keywords
│   │   ├── triageAssessment.ts   # analiza una valoración y recalcula estado de cama
│   │   ├── triageStyles.ts       # clases/colores/badge según estado de cama
│   │   ├── evolutionFormatter.ts # parsea el texto de la evolución PAC en secciones
│   │   ├── claudeApi.ts          # cliente: llama a /api/evolution y /api/chat (sin key)
│   │   ├── anthropicServer.ts    # server-only: arma los prompts y llama a Anthropic con la key
│   │   ├── storage.ts            # wrapper tipado de localStorage
│   │   ├── clipboard.ts          # copiar al portapapeles con fallback
│   │   └── date.ts               # formateo de fechas (es-AR)
│   │
│   ├── mocks/                # Datos de dominio / seed data
│   │   ├── nanda.ts              # catálogo completo de diagnósticos NANDA (58 entradas)
│   │   └── triageDefault.ts      # datos demo del mapa de triaje (primera carga)
│   │
│   └── types/                # Tipos TypeScript compartidos (NANDA, triaje, chat, historial...)
│
├── tests/                   # Tests con Vitest (lógica de services/)
├── tailwind.config.ts        # paleta de marca, animaciones, keyframes custom
├── next.config.ts
└── vitest.config.ts
```

### Por qué esta organización

- **`services/` no importa React**: toda la lógica de negocio (matching NANDA,
  formateo, llamadas a API) es testeable de forma aislada y no depende del
  ciclo de vida de componentes.
- **`hooks/` concentra el estado global** en stores de Zustand — reemplaza lo
  que en la versión anterior (vanilla JS) era un objeto `window.nurseIA`
  gigante. Cualquier componente puede leer/mutar estado sin prop-drilling.
- **`mocks/`** guarda los datos semilla (catálogo NANDA y el piso de demo)
  separados del código que los consume, listos para el día que se reemplacen
  por llamadas a un backend real.
- **`components/`** está organizado por feature (una carpeta por tab), no por
  tipo de archivo — todo lo de "Análisis Clínico" vive junto.

## Próximos pasos sugeridos

- Persistencia de pacientes en una base de datos real en lugar de
  `localStorage`, para que el piso/historial no dependa del navegador de
  cada enfermero.
- Autenticación de enfermeros/turnos, ahora que ya existe backend propio
  (`src/app/api/`) donde agregar sesión/middleware.
