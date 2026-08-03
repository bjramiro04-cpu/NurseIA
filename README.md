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
en `localStorage` del navegador — no hay backend ni base de datos todavía.

> **Nota sobre la IA**: la llamada a la API de Claude se hace directo desde
> el navegador y **sin API key** (por diseño: nunca hay que exponer una key
> en código de cliente). Esto significa que la generación con IA real
> siempre va a fallar y la app va a usar el fallback estático — es el
> comportamiento esperado hasta que exista un backend propio que guarde la
> key del lado del servidor y la app le pegue a ese endpoint en vez de a
> Anthropic directamente.

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

No hay backend propio: la persistencia es 100% `localStorage` y la IA se
llama directo a la API pública de Anthropic (ver nota arriba).

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

## Estructura de carpetas

```
├── public/                  # assets estáticos (logo, etc.)
├── src/
│   ├── app/                 # App Router de Next.js
│   │   ├── layout.tsx       # layout raíz: fuentes (Inter, DM Serif Display), <Toaster/>
│   │   ├── page.tsx         # única ruta de la app: monta <AppShell/>
│   │   └── globals.css      # Tailwind + clases @layer reutilizables (btn, pills, cama, modal...)
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
│   │   ├── claudeApi.ts          # llamadas a la API de Claude (evolución PAC + chat)
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

- Backend propio (ver [Stack](#stack) y la nota sobre la IA): un route
  handler en `src/app/api/` que guarde la `ANTHROPIC_API_KEY` en el servidor
  y exponga endpoints para generar evoluciones y chatear, en vez de pegarle
  directo a Anthropic desde el navegador.
- Persistencia de pacientes en una base de datos real en lugar de
  `localStorage`, para que el piso/historial no dependa del navegador de
  cada enfermero.
