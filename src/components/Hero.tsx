import { personalInfo } from "@/config/personal-info";

export function Hero() {
  return (
    <section className="py-20 flex flex-col items-center justify-center text-center">
      <h1 className="mb-6 bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent animate-gradient">
        {personalInfo.name}
      </h1>
      <h2 className="mb-8 text-secondary font-normal relative inline-flex items-center gap-2">
        <span className="bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent">
          {personalInfo.currentRole}
        </span>
        <span className="inline-block w-2 h-6 bg-primary/80 animate-pulse" />
      </h2>
      <p className="max-w-2xl mx-auto text-muted">
        {personalInfo.introduction}
      </p>
    </section>
  );
} 