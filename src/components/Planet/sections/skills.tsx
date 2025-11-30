export const skills = {
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
};

