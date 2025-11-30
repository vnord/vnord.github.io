"use client";

import { useEffect, useRef } from "react";

interface InfoPanelProps {
  activeSection: string | null;
  onClose: () => void;
}

// Content for each section based on CV
const sectionContent: Record<
  string,
  {
    title: string;
    icon: string;
    content: React.ReactNode;
  }
> = {
  experience: {
    title: "Experience",
    icon: "💼",
    content: (
      <div className="space-y-6">
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-date">Aug 2025 – Present</div>
          <div className="timeline-title">
            Tech Lead / Senior Software Engineer
          </div>
          <div className="timeline-role">Noumena Digital AG</div>
          <p className="timeline-description">
            Tech Lead for Noumena&apos;s language, runtime, cloud platform, and
            developer tooling. Setting technical direction and overseeing
            product delivery. Also serving as AI Tech Lead, defining company AI
            strategy and integrating generative AI with products.
          </p>
          <div className="mt-2 flex flex-wrap">
            <span className="tag">Tech Leadership</span>
            <span className="tag">Language Design</span>
            <span className="tag tag">Generative AI</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-date">Feb 2021 – Present</div>
          <div className="timeline-title">Software Engineer</div>
          <div className="timeline-role">Noumena Digital AG</div>
          <p className="timeline-description">
            Progressed from Junior to Software Engineer. Developed compiler and
            runtime components, designed new language features, and led
            development of the Language Server + VS Code extension, and the NPL
            CLI. Overhauled documentation systems.
          </p>
          <div className="mt-2 flex flex-wrap">
            <span className="tag">Kotlin</span>
            <span className="tag">Compilers</span>
            <span className="tag tag">LSP</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-date">Feb 2023 – Jun 2024</div>
          <div className="timeline-title">Software Lead (part-time)</div>
          <div className="timeline-role">CABANNER</div>
          <p className="timeline-description">
            Designed and developed a system for synchronous video playback and
            control of a Raspberry Pi Zero cluster over WiFi with MQTT. Built an
            Android app for cluster control.
          </p>
          <div className="mt-2 flex flex-wrap">
            <span className="tag">Go</span>
            <span className="tag">MQTT</span>
            <span className="tag tag">Android</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-date">Jan 2020 – Jun 2020</div>
          <div className="timeline-title">Thesis Student</div>
          <div className="timeline-role">Volvo Cars</div>
          <p className="timeline-description">
            Using the parallel functional programming language Futhark to write a
            physically correct ray tracer for both camera and LIDAR.
          </p>
          <div className="mt-2 flex flex-wrap">
            <span className="tag">Futhark</span>
            <span className="tag">Ray Tracing</span>
            <span className="tag">GPU Computing</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-date">Jun 2019 – Aug 2019</div>
          <div className="timeline-title">Software Engineer (internship)</div>
          <div className="timeline-role">Volvo Cars</div>
          <p className="timeline-description">
            Integrated additional hardware units for simulation with the Virtual Car
            testing & verification framework.
          </p>
          <div className="mt-2 flex flex-wrap">
            <span className="tag">Testing</span>
            <span className="tag">Verification</span>
            <span className="tag">Simulation</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-date">Jun 2018 – Aug 2018</div>
          <div className="timeline-title">Backend Developer</div>
          <div className="timeline-role">RISE</div>
          <p className="timeline-description">
            Developed a configurable event notification system for the PortCDM
            maritime information sharing platform.
          </p>
          <div className="mt-2 flex flex-wrap">
            <span className="tag">Backend Development</span>
            <span className="tag">Maritime Software</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-date">Jun 2017 – Jun 2018</div>
          <div className="timeline-title">Project Manager</div>
          <div className="timeline-role">Intize</div>
          <p className="timeline-description">
            Organized a mentorship program for specially talented children (~5
            mentors across ~20 kids).
          </p>
          <div className="mt-2 flex flex-wrap">
            <span className="tag">Project Management</span>
            <span className="tag">Education</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-date">Aug 2016 – Oct 2016</div>
          <div className="timeline-title">Student Coach</div>
          <div className="timeline-role">Chalmers University of Technology</div>
          <p className="timeline-description">
            Supported and helped a student with special needs manage their studies.
          </p>
          <div className="mt-2 flex flex-wrap">
            <span className="tag">Mentoring</span>
            <span className="tag">Education</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-date">Aug 2016 – Oct 2016</div>
          <div className="timeline-title">Supplemental Instruction Leader</div>
          <div className="timeline-role">Chalmers University of Technology</div>
          <p className="timeline-description">
            Led Supplemental Instruction sessions for Discrete Mathematics for ~30
            students.
          </p>
          <div className="mt-2 flex flex-wrap">
            <span className="tag">Mentoring</span>
            <span className="tag">Education</span>
          </div>
        </div>
      </div>
    ),
  },
  skills: {
    title: "Skills & Tech",
    icon: "⚙️",
    content: (
      <div className="skills-container">
        <div className="skills-section skills-section-highlight">
          <div className="skills-section-header">
            <span className="skills-section-icon">🎯</span>
            <h3>Core Expertise</h3>
          </div>
          <div className="skills-pills">
            <span className="skill-pill skill-pill">Language Design</span>
            <span className="skill-pill skill-pill">Compilers</span>
            <span className="skill-pill skill-pill">Language Servers</span>
            <span className="skill-pill skill-pill">Dev Tools</span>
          </div>
        </div>

        <div className="skills-row">
          <div className="skills-section">
            <div className="skills-section-header">
              <span className="skills-section-icon">💻</span>
              <h3>Languages</h3>
            </div>
            <div className="skills-pills">
              <span className="skill-pill">Kotlin</span>
              <span className="skill-pill">Python</span>
              <span className="skill-pill">Go</span>
              <span className="skill-pill">Bash</span>
              <span className="skill-pill">Haskell</span>
            </div>
          </div>

          <div className="skills-section">
            <div className="skills-section-header">
              <span className="skills-section-icon">🤖</span>
              <h3>GenAI</h3>
            </div>
            <div className="skills-pills">
              <span className="skill-pill">Azure AI</span>
              <span className="skill-pill">Bedrock</span>
              <span className="skill-pill">LangChain</span>
              <span className="skill-pill">Ollama</span>
              <span className="skill-pill">Prompt Engineering</span>
              <span className="skill-pill skill-pill">LLM fine-tuning</span>
              <span className="skill-pill">MCP</span>
            </div>
          </div>
        </div>

        <div className="skills-section">
          <div className="skills-section-header">
            <span className="skills-section-icon">🛠️</span>
            <h3>Tools & Infrastructure</h3>
          </div>
          <div className="skills-pills">
            <span className="skill-pill">Docker</span>
            <span className="skill-pill">Linux</span>
            <span className="skill-pill">CI/CD</span>
            <span className="skill-pill">Git</span>
            <span className="skill-pill skill-pill">Terraform</span>
            <span className="skill-pill skill-pill">Burp Suite</span>
          </div>
        </div>
      </div>
    ),
  },
  education: {
    title: "Education",
    icon: "🎓",
    content: (
      <div className="space-y-6">
        <div className="timeline-item">
          <div
            className="timeline-dot"
            style={{ background: "#fbbf24", boxShadow: "0 0 10px #fbbf24" }}
          />
          <div className="timeline-date">2018 – 2020</div>
          <div className="timeline-title">M.Sc. Computer Science</div>
          <div className="timeline-role">Chalmers University of Technology</div>
          <p className="timeline-description">Gothenburg, Sweden</p>
          <div className="mt-3 p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium mb-1">Thesis</p>
                <a 
                  href="https://odr.chalmers.se/items/e6169832-f4d6-4d1d-a4db-54b91a99525d" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                >
                  Ray Tracing for Sensor Simulation using Parallel Functional Programming ↗
                </a>
                <p className="text-xs text-[var(--muted)] mt-1 opacity-70">
                  Supervised by John Hughes & Mary Sheeran
                </p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap">
              <span className="tag">Ray Tracing</span>
              <span className="tag">Futhark</span>
              <span className="tag">GPU</span>
            </div>
          </div>
        </div>

        <div className="timeline-item">
          <div
            className="timeline-dot"
            style={{ background: "#fbbf24", boxShadow: "0 0 10px #fbbf24" }}
          />
          <div className="timeline-date">2015 – 2018</div>
          <div className="timeline-title">B.Sc. Computer Engineering</div>
          <div className="timeline-role">Chalmers University of Technology</div>
          <p className="timeline-description">Gothenburg, Sweden</p>
          <div className="mt-3 p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium mb-1">Thesis</p>
                <a 
                  href="https://odr.chalmers.se/items/0f455ac9-f8fa-47a3-a7aa-fa946ed10e9a" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                >
                  Port Call Synchronization – automating vessel arrival time recommendations ↗
                </a>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap">
              <span className="tag">Maritime Software</span>
              <span className="tag">Optimization</span>
            </div>
          </div>
        </div>

        <div className="timeline-item">
          <div
            className="timeline-dot"
            style={{ background: "#fbbf24", boxShadow: "0 0 10px #fbbf24" }}
          />
          <div className="timeline-date">2014 – 2015</div>
          <div className="timeline-title">Foundation Year</div>
          <div className="timeline-role">Chalmers University of Technology</div>
          <p className="timeline-description">Gothenburg, Sweden</p>
          <div className="mt-2 flex flex-wrap">
            <span className="tag">Mathematics</span>
            <span className="tag">Physics</span>
            <span className="tag">Chemistry</span>
          </div>
        </div>
      </div>
    ),
  },
  volunteering: {
    title: "Volunteering",
    icon: "🤝",
    content: (
      <div className="space-y-6">
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-date">Sep 2017 – Jun 2018</div>
          <div className="timeline-title">Mentor for Specially Talented Children</div>
          <div className="timeline-role">Intize</div>
          <p className="timeline-description">
            Made maths more fun and challenging for a group of three specially
            talented kids.
          </p>
          <div className="mt-2 flex flex-wrap">
            <span className="tag">Education</span>
            <span className="tag">Mentoring</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-date">Sep 2016 – Jun 2017</div>
          <div className="timeline-title">Mentor for High School Students</div>
          <div className="timeline-role">Intize</div>
          <p className="timeline-description">
            Helped a group of five high school students with their math homework
            for two hours every week.
          </p>
          <div className="mt-2 flex flex-wrap">
            <span className="tag">Education</span>
            <span className="tag">Mentoring</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-date">Jun 2015 – Jul 2015</div>
          <div className="timeline-title">Volunteer</div>
          <div className="timeline-role">WWOOF France</div>
          <p className="timeline-description">
            Helped out at an organic farm.
          </p>
          <div className="mt-2 flex flex-wrap">
            <span className="tag">Environment</span>
            <span className="tag">Agriculture</span>
          </div>
        </div>
      </div>
    ),
  },
  projects: {
    title: "Projects & Highlights",
    icon: "🚀",
    content: (
      <div className="space-y-6">
        <div className="project-card">
          <div className="project-header">
            <h3 className="project-title">NPL Language & Compiler</h3>
            <a href="https://documentation.noumenadigital.com/language/" target="_blank" rel="noopener noreferrer" className="project-github-link" title="Documentation">
              <svg className="project-github-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/>
                <path d="M8 12h8v2H8zm0 4h8v2H8z"/>
              </svg>
            </a>
          </div>
          <p className="project-description">
            Core contributor to the Noumena Protocol Language – a
            domain-specific language for modeling business protocols. Contributed to language design and compiler development.
          </p>
          <div className="flex flex-wrap">
            <span className="tag">Language Design</span>
            <span className="tag">Compilers</span>
            <span className="tag">Kotlin</span>
          </div>
        </div>

        <div className="project-card">
          <div className="project-header">
            <h3 className="project-title">NPL Language Server</h3>
            <a href="https://github.com/NoumenaDigital/npl-language-server" target="_blank" rel="noopener noreferrer" className="project-github-link">
              <svg className="project-github-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
          <p className="project-description">
            Led development of the NPL Language Server, providing real-time diagnostics and language features for NPL development.
          </p>
          <div className="flex flex-wrap">
            <span className="tag">LSP</span>
            <span className="tag tag">Kotlin</span>
          </div>
        </div>

        <div className="project-card">
          <div className="project-header">
            <h3 className="project-title">NPL VS Code Extension</h3>
            <a href="https://github.com/NoumenaDigital/npl-vscode-extension" target="_blank" rel="noopener noreferrer" className="project-github-link">
              <svg className="project-github-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
          <p className="project-description">
            Led development of the VS Code extension for NPL, integrating the language server with VS Code and providing syntax highlighting, diagnostics, and NOUMENA Cloud integration.
          </p>
          <div className="flex flex-wrap">
            <span className="tag">TypeScript</span>
            <span className="tag tag">LSP Client</span>
          </div>
        </div>

        <div className="project-card">
          <div className="project-header">
            <h3 className="project-title">NPL CLI</h3>
            <a href="https://github.com/NoumenaDigital/npl-cli" target="_blank" rel="noopener noreferrer" className="project-github-link">
              <svg className="project-github-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
          <p className="project-description">
            Led development of the NPL CLI tooling for source validation, testing, OpenAPI generation, and deployment workflows.
          </p>
          <div className="flex flex-wrap">
            <span className="tag">Developer Tools</span>
            <span className="tag tag">Kotlin</span>
          </div>
        </div>

      </div>
    ),
  },
  personal: {
    title: "About Me",
    icon: "🏠",
    content: (
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <h3 className="font-semibold mb-3">🌍 Based in Zürich</h3>
          <div className="flex flex-wrap gap-2">
            <span className="tag">Swedish citizen</span>
            <span className="tag">Swiss B Permit</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <h3 className="font-semibold mb-3">👨‍👩‍👧‍👧 Family</h3>
          <div className="flex flex-wrap gap-2">
            <span className="tag">Married</span>
            <span className="tag">Two daughters</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <h3 className="font-semibold mb-3">📚 Interests</h3>
          <div className="flex flex-wrap gap-2">
            <span className="tag">Specialty Coffee</span>
            <span className="tag">Literature</span>
            <span className="tag">Films</span>
            <span className="tag">Running</span>
            <span className="tag">Hiking</span>
            <span className="tag">Languages</span>
            <span className="tag">Video Games</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <h3 className="font-semibold mb-3">🗣️ Languages</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Swedish</span>
              <span className="text-xs text-[var(--primary)]">Native</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div
                className="bg-[var(--primary)] h-1.5 rounded-full"
                style={{ width: "100%" }}
              />
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-sm">English</span>
              <span className="text-xs text-[var(--primary)]">Academic</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div
                className="bg-[var(--primary)] h-1.5 rounded-full"
                style={{ width: "95%" }}
              />
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-sm">German</span>
              <span className="text-xs text-[var(--secondary)]">Advanced</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div
                className="bg-[var(--secondary)] h-1.5 rounded-full"
                style={{ width: "75%" }}
              />
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-sm">French</span>
              <span className="text-xs text-[var(--accent)]">Intermediate</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div
                className="bg-[var(--accent)] h-1.5 rounded-full"
                style={{ width: "50%" }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  contact: {
    title: "Get in Touch",
    icon: "✉️",
    content: (
      <div className="space-y-6">
        <div className="space-y-3">
          <a
            href="mailto:ari@vnord.net"
            className="contact-link w-full justify-center"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            ari@vnord.net
          </a>

          <a
            href="https://github.com/vnord"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link w-full justify-center"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            github.com/vnord
          </a>

          <a
            href="https://linkedin.com/in/vnord"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link w-full justify-center"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-sm text-[var(--muted)]">
            📍 Based in Zürich, Switzerland
          </p>
        </div>
      </div>
    ),
  },
};

export function InfoPanel({ activeSection, onClose }: InfoPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Close on click outside - only when panel is actually shown
  useEffect(() => {
    if (!activeSection) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Delay adding the listener to prevent the same click that opened the panel from closing it
    const timer = setTimeout(() => {
      window.addEventListener("click", handleClickOutside);
    }, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [activeSection, onClose]);

  if (!activeSection || !sectionContent[activeSection]) {
    return null;
  }

  const section = sectionContent[activeSection];

  return (
    <div
      className="info-panel"
      ref={panelRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button className="close-button" onClick={onClose}>
        ×
      </button>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{section.icon}</span>
        <h2 className="text-2xl font-bold text-gradient">{section.title}</h2>
      </div>

      <div className="panel-content">{section.content}</div>
    </div>
  );
}
