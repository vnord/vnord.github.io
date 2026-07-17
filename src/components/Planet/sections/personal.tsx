import { OrbitIcon } from "../OrbitIcon";

export const personal = {
  title: "About Me",
  icon: <OrbitIcon name="personal" />,
  content: (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <h3 className="section-card-title"><OrbitIcon name="location" size={17} />Based in Zürich</h3>
        <div className="flex flex-wrap gap-2">
          <span className="tag">Swedish citizen</span>
          <span className="tag">Swiss C Permit</span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <h3 className="section-card-title"><OrbitIcon name="family" size={17} />Family</h3>
        <div className="flex flex-wrap gap-2">
          <span className="tag">Married</span>
          <span className="tag">Two daughters</span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <h3 className="section-card-title"><OrbitIcon name="interests" size={17} />Interests</h3>
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
        <h3 className="section-card-title"><OrbitIcon name="languages" size={17} />Languages</h3>
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
};
