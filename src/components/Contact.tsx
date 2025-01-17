import { personalInfo } from "@/config/personal-info";

export function Contact() {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
      <div className="flex justify-center gap-6">
        <a 
          href={personalInfo.social.github} 
          className="hover:underline transition-all duration-300 hover:text-primary"
        >
          GitHub
        </a>
        <a 
          href={personalInfo.social.linkedin} 
          className="hover:underline transition-all duration-300 hover:text-primary"
        >
          LinkedIn
        </a>
        <a 
          href={`mailto:${personalInfo.social.email}`} 
          className="hover:underline transition-all duration-300 hover:text-primary"
        >
          Email
        </a>
      </div>
    </section>
  );
} 