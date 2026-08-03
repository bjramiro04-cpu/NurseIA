import type { ComponentType, SVGProps } from "react";
import {
  LightBulbIcon,
  MapIcon as HeroMapIcon,
  ChatIcon as HeroChatIcon,
  ClockIcon as HeroClockIcon,
  MoonIcon as HeroMoonIcon,
  SunIcon as HeroSunIcon,
  TranslateIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ExclamationIcon,
  DocumentTextIcon,
  SaveIcon as HeroSaveIcon,
  DuplicateIcon,
  CheckIcon as HeroCheckIcon,
  CogIcon,
  XIcon,
  PencilAltIcon,
  TrashIcon as HeroTrashIcon,
  PaperAirplaneIcon,
  HeartIcon,
  UserIcon,
  ClipboardIcon,
  RefreshIcon,
} from "@heroicons/react/outline";

export type IconProps = SVGProps<SVGSVGElement>;

/** Envuelve un ícono de Heroicons (outline) aplicando nuestro tamaño default si no se pasa className. */
function withDefaultClassName(Icon: ComponentType<IconProps>, defaultClassName: string) {
  return function WrappedIcon({ className = defaultClassName, ...rest }: IconProps) {
    return <Icon className={className} {...rest} />;
  };
}

const DEFAULT = "h-5 w-5 flex-shrink-0";

// Nav / sidebar
export const BrainIcon = withDefaultClassName(LightBulbIcon, DEFAULT);
export const MapIcon = withDefaultClassName(HeroMapIcon, DEFAULT);
export const ChatIcon = withDefaultClassName(HeroChatIcon, DEFAULT);
export const ClockIcon = withDefaultClassName(HeroClockIcon, DEFAULT);
export const MoonIcon = withDefaultClassName(HeroMoonIcon, DEFAULT);
export const SunIcon = withDefaultClassName(HeroSunIcon, DEFAULT);
export const GlobeIcon = withDefaultClassName(TranslateIcon, DEFAULT);
export const CollapseIcon = withDefaultClassName(ChevronDoubleLeftIcon, DEFAULT);
export const ExpandIcon = withDefaultClassName(ChevronDoubleRightIcon, DEFAULT);

// Análisis clínico
export const AlertTriangleIcon = withDefaultClassName(ExclamationIcon, DEFAULT);
export const DocumentIcon = withDefaultClassName(DocumentTextIcon, DEFAULT);
export const SaveIcon = withDefaultClassName(HeroSaveIcon, DEFAULT);
export const CopyIcon = withDefaultClassName(DuplicateIcon, DEFAULT);
export const CheckIcon = withDefaultClassName(HeroCheckIcon, DEFAULT);

// Triaje
export const GearIcon = withDefaultClassName(CogIcon, DEFAULT);
export const CloseIcon = withDefaultClassName(XIcon, DEFAULT);
export const EditIcon = withDefaultClassName(PencilAltIcon, DEFAULT);
export const TrashIcon = withDefaultClassName(HeroTrashIcon, DEFAULT);

// Asistente IA
export const SendIcon = withDefaultClassName(PaperAirplaneIcon, DEFAULT);
export const AiAvatarIcon = withDefaultClassName(HeartIcon, DEFAULT);
export const UserAvatarIcon = withDefaultClassName(UserIcon, DEFAULT);

// Historial
export const TagIcon = withDefaultClassName(ClipboardIcon, DEFAULT);

// Loading
export const SpinnerIcon = withDefaultClassName(RefreshIcon, "h-4 w-4 animate-spin");
