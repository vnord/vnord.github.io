import type { SVGProps } from "react";

export type OrbitIconName =
  | "experience"
  | "skills"
  | "education"
  | "projects"
  | "personal"
  | "contact"
  | "reading"
  | "volunteering"
  | "target"
  | "code"
  | "ai"
  | "tools"
  | "location"
  | "family"
  | "interests"
  | "languages"
  | "arrow"
  | "close"
  | "external";

type OrbitIconProps = SVGProps<SVGSVGElement> & {
  name: OrbitIconName;
  size?: number;
};

const paths: Record<OrbitIconName, React.ReactNode> = {
  experience: (
    <>
      <path d="M8 7V5.8A1.8 1.8 0 0 1 9.8 4h4.4A1.8 1.8 0 0 1 16 5.8V7" />
      <rect x="3" y="7" width="18" height="13" rx="2.2" />
      <path d="M3 12h6m6 0h6M9 10.5h6v3H9z" />
    </>
  ),
  skills: (
    <>
      <path d="M12.2 2h-.4a2 2 0 0 0-2 2v.2a2 2 0 0 1-1 1.7l-.4.3a2 2 0 0 1-2 0l-.2-.1a2 2 0 0 0-2.7.7l-.2.4a2 2 0 0 0 .7 2.7l.2.1a2 2 0 0 1 1 1.7v.6a2 2 0 0 1-1 1.7l-.2.1a2 2 0 0 0-.7 2.7l.2.4a2 2 0 0 0 2.7.7l.2-.1a2 2 0 0 1 2 0l.4.3a2 2 0 0 1 1 1.7v.2a2 2 0 0 0 2 2h.4a2 2 0 0 0 2-2v-.2a2 2 0 0 1 1-1.7l.4-.3a2 2 0 0 1 2 0l.2.1a2 2 0 0 0 2.7-.7l.2-.4a2 2 0 0 0-.7-2.7l-.2-.1a2 2 0 0 1-1-1.7v-.6a2 2 0 0 1 1-1.7l.2-.1a2 2 0 0 0 .7-2.7l-.2-.4a2 2 0 0 0-2.7-.7l-.2.1a2 2 0 0 1-2 0l-.4-.3a2 2 0 0 1-1-1.7V4a2 2 0 0 0-2-2Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  education: (
    <>
      <path d="m2.5 9 9.5-5 9.5 5-9.5 5-9.5-5Z" />
      <path d="M6 11.2v4.3c3.6 2.7 8.4 2.7 12 0v-4.3M21.5 9v6" />
    </>
  ),
  projects: (
    <>
      <path d="M14.8 4.1c2.2-1.4 4.1-1.5 5.1-1.3.2 1 .1 2.9-1.3 5.1l-5.2 7.7-5-5 6.4-6.5Z" />
      <path d="m9 10-4.3 1.1-2 3.8 5.7-.3m5-5 1.5 5.7-3.8 2-1.1-4.3" />
      <circle cx="15.7" cy="7" r="1.7" />
      <path d="M6.7 17.3c-2.4.4-3.6 1.6-4 4 2.4-.4 3.6-1.6 4-4Z" />
    </>
  ),
  personal: (
    <>
      <path d="m3 11 9-7 9 7" />
      <path d="M5.5 9.5V20h13V9.5M9.5 20v-6h5v6" />
      <path d="M15.5 7V4.8h2.2v4" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  reading: (
    <>
      <path d="M3.5 5.5A9.8 9.8 0 0 1 12 7.8v12a9.8 9.8 0 0 0-8.5-2.3v-12Z" />
      <path d="M20.5 5.5A9.8 9.8 0 0 0 12 7.8v12a9.8 9.8 0 0 1 8.5-2.3v-12Z" />
    </>
  ),
  volunteering: (
    <>
      <path d="M12 20s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7.4 4.2 4.2 0 0 1 19.5 10C19.5 15.6 12 20 12 20Z" />
      <path d="M9 12h6m-3-3v6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
    </>
  ),
  code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-2-12-4 14" />,
  ai: (
    <>
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3m-2.6-7.4-2.1 2.1M7.7 16.3l-2.1 2.1m0-13.8 2.1 2.1m8.6 9.6 2.1 2.1" />
      <circle cx="12" cy="12" r="4" />
      <path d="m10.5 12 1 1 2.2-2.3" />
    </>
  ),
  tools: (
    <>
      <path d="M14.5 6.5a4.2 4.2 0 0 0-5.2 5.2L3.8 17.2a2.1 2.1 0 0 0 3 3l5.5-5.5a4.2 4.2 0 0 0 5.2-5.2l-2.6 2.1-2.5-2.5 2.1-2.6Z" />
      <path d="m15.5 15.5 4.7 4.7" />
    </>
  ),
  location: (
    <>
      <path d="M19 10c0 5.2-7 11-7 11S5 15.2 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  family: (
    <>
      <circle cx="12" cy="8" r="3" />
      <circle cx="5.5" cy="10" r="2" />
      <circle cx="18.5" cy="10" r="2" />
      <path d="M6.5 20v-1.3A5.5 5.5 0 0 1 12 13.2a5.5 5.5 0 0 1 5.5 5.5V20M2.5 19v-.8a3 3 0 0 1 3-3m16 3.8v-.8a3 3 0 0 0-3-3" />
    </>
  ),
  interests: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  languages: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.2 2.5 3.2 5.5 3.2 9S14.2 18.5 12 21c-2.2-2.5-3.2-5.5-3.2-9S9.8 5.5 12 3Z" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h13" />
      <path d="m14 8 4 4-4 4" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  external: (
    <>
      <path d="M14 5h5v5" />
      <path d="m19 5-8 8" />
      <path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>
  ),
};

export function OrbitIcon({ name, size = 20, className, ...props }: OrbitIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
