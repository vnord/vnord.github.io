import { personalInfo } from "@/config/personal-info";
import Image from "next/image";

export function Hero() {
  return (
    <section className="py-12 max-w-4xl mx-auto px-4">
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 rounded-full overflow-hidden ring-2 ring-primary/20 flex-shrink-0 mb-6">
          <Image
            src="/images/profile.jpg"
            alt="Profile photo"
            fill
            className="object-cover scale-[1.8] -translate-y-3"
            sizes="(max-width: 768px) 192px, 192px"
            priority
          />
        </div>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent animate-gradient">
            {personalInfo.name}
          </h1>
          <h2 className="text-xl sm:text-2xl font-normal relative inline-flex items-center gap-2 mb-2">
            <span className="bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent">
              {personalInfo.currentRole}
            </span>
            <span className="inline-block w-2 h-6 bg-primary/80 animate-pulse" />
          </h2>
          <p className="text-base sm:text-lg text-muted max-w-2xl font-body font-light">
            {personalInfo.introduction}
          </p>
        </div>
      </div>
    </section>
  );
} 