export const education = {
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
};

