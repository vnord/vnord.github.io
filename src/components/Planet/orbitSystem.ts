import type { OrbitIconName } from "./OrbitIcon";

export const ORBIT_ORDER = [
  "experience",
  "skills",
  "education",
  "projects",
  "personal",
  "contact",
  "reading",
] as const;

export type OrbitId = (typeof ORBIT_ORDER)[number];

export type OrbitMeta = {
  name: string;
  navLabel: string;
  icon: OrbitIconName;
  accent: string;
  solid: string;
  catalogCode: string;
};

export const ORBIT_META: Record<OrbitId, OrbitMeta> = {
  experience: {
    name: "Experience",
    navLabel: "Experience",
    icon: "experience",
    accent: "#f4c76b",
    solid: "#9d6827",
    catalogCode: "EXP",
  },
  skills: {
    name: "Skills & Tech",
    navLabel: "Skills & tech",
    icon: "skills",
    accent: "#9ea8ff",
    solid: "#626bd0",
    catalogCode: "SKL",
  },
  education: {
    name: "Education",
    navLabel: "Education",
    icon: "education",
    accent: "#69d6b4",
    solid: "#318f74",
    catalogCode: "EDU",
  },
  projects: {
    name: "Projects",
    navLabel: "Projects",
    icon: "projects",
    accent: "#f08db8",
    solid: "#af4e79",
    catalogCode: "PRJ",
  },
  personal: {
    name: "About Me",
    navLabel: "About me",
    icon: "personal",
    accent: "#f59b68",
    solid: "#a85f38",
    catalogCode: "BIO",
  },
  contact: {
    name: "Contact",
    navLabel: "Contact",
    icon: "contact",
    accent: "#66d4e8",
    solid: "#2b8fa5",
    catalogCode: "COM",
  },
  reading: {
    name: "Reading",
    navLabel: "Reading",
    icon: "reading",
    accent: "#b59af7",
    solid: "#7357bd",
    catalogCode: "LIB",
  },
};

export function isOrbitId(value: string): value is OrbitId {
  return Object.prototype.hasOwnProperty.call(ORBIT_META, value);
}
