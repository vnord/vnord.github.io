export const projects = {
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
          <span className="tag tag">GraalVM</span>
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
          <span className="tag tag">GraalVM</span>
        </div>
      </div>

    </div>
  ),
};

