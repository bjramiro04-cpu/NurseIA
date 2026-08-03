"use client";

import Image from "next/image";
import clsx from "clsx";
import { useUiStore, type TabId } from "@/hooks/useUiStore";
import {
  BrainIcon,
  ChatIcon,
  ClockIcon,
  CollapseIcon,
  ExpandIcon,
  GlobeIcon,
  MapIcon,
  MoonIcon,
  SunIcon,
} from "@/components/icons/Icons";

const NAV_ITEMS: { tab: TabId; label: string; Icon: typeof BrainIcon }[] = [
  { tab: "analisis", label: "Análisis Clínico", Icon: BrainIcon },
  { tab: "triage", label: "Mapa de Triaje", Icon: MapIcon },
  { tab: "asistente", label: "Asistente IA", Icon: ChatIcon },
  { tab: "historial", label: "Historial", Icon: ClockIcon },
];

export default function Sidebar() {
  const activeTab = useUiStore((s) => s.activeTab);
  const setActiveTab = useUiStore((s) => s.setActiveTab);
  const dark = useUiStore((s) => s.dark);
  const toggleDark = useUiStore((s) => s.toggleDark);
  const isSpanish = useUiStore((s) => s.isSpanish);
  const toggleLanguage = useUiStore((s) => s.toggleLanguage);
  const expanded = useUiStore((s) => s.sidebarExpanded);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  return (
    <aside
      className="z-40 flex h-screen flex-shrink-0 flex-col overflow-hidden bg-gradient-to-b from-brand-600 via-brand-400 to-brand-200 transition-[width] duration-300 ease-out"
      style={{ width: expanded ? 240 : 72 }}
    >
      {/* Logo */}
      <div className="flex h-16 flex-shrink-0 items-center gap-3 border-b border-white/15 px-5">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/90 shadow-sm ring-1 ring-violet-200">
          <Image src="/logo.png" alt="nurseIA" width={22} height={22} className="rounded-sm" />
        </div>
        {expanded && (
          <span className="truncate font-display text-xl font-semibold tracking-wide text-white drop-shadow-sm">
            Nurse IA
          </span>
        )}
      </div>

      {/* Nav principal */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map(({ tab, label, Icon }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/90",
              "transition-all hover:translate-x-[3px] hover:bg-white/10",
              activeTab === tab && "bg-white/20 font-semibold shadow-md",
            )}
          >
            <Icon />
            {expanded && <span className="truncate">{label}</span>}
          </button>
        ))}
      </nav>

      {/* Controles globales */}
      <div className="flex-shrink-0 space-y-1 border-t border-white/15 p-3">
        <button
          onClick={toggleDark}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10"
        >
          {dark ? <SunIcon /> : <MoonIcon />}
          {expanded && <span>Modo oscuro</span>}
        </button>

        <button
          onClick={toggleLanguage}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10"
        >
          <GlobeIcon />
          {expanded && <span>{isSpanish ? "Español" : "English"}</span>}
        </button>

        <button
          onClick={toggleSidebar}
          title={expanded ? "Contraer barra lateral" : "Expandir barra lateral"}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10"
        >
          {expanded ? <CollapseIcon /> : <ExpandIcon />}
          {expanded && <span>Contraer</span>}
        </button>
      </div>
    </aside>
  );
}
