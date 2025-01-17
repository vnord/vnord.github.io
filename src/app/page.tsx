import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <Hero />
      <Timeline />
      <Contact />
    </div>
  );
}
