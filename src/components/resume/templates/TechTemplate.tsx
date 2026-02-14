import { TemplateProps } from "@/types/resume";

const TechTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="bg-neutral-900 text-white p-8 max-w-[8.5in] mx-auto shadow-lg font-mono">
      {/* Terminal-style Header */}
      <div className="bg-black rounded-lg p-4 mb-6 border border-green-500">
        <div className="flex gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-green-400">
          <p className="text-sm mb-1">$ whoami</p>
          <h1 className="text-2xl font-bold mb-2">
            {data.personalInfo.fullName || "developer@localhost"}
          </h1>
          <div className="text-xs space-y-1">
            <p>📧 {data.personalInfo.email}</p>
            <p>📱 {data.personalInfo.phone}</p>
            <p>📍 {data.personalInfo.location}</p>
            {data.personalInfo.linkedin && <p>🔗 {data.personalInfo.linkedin}</p>}
            {data.personalInfo.portfolio && <p>🌐 {data.personalInfo.portfolio}</p>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-green-400 mb-2">
            $ cat about.txt
          </h2>
          <p className="text-sm leading-relaxed text-neutral-300 bg-black/50 p-3 rounded border-l-4 border-green-500">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-green-400 mb-3">
            $ ls skills/
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {data.skills.map((skill) => (
              <div key={skill.id} className="bg-black/50 p-3 rounded border border-neutral-700">
                <p className="text-sm font-bold text-cyan-400 mb-1">
                  {skill.category}/
                </p>
                <div className="flex flex-wrap gap-1">
                  {skill.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-green-400 mb-3">
            $ cat experience.log
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="bg-black/50 p-4 rounded border border-neutral-700">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-cyan-400">{exp.position}</h3>
                    <p className="text-sm text-neutral-400">{exp.company}</p>
                  </div>
                  <span className="text-xs text-green-400">
                    {exp.startDate} → {exp.current ? "present" : exp.endDate}
                  </span>
                </div>
                <ul className="space-y-1 mt-2">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="text-xs text-neutral-300 flex gap-2">
                      <span className="text-green-400">›</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-green-400 mb-3">
            $ git log --projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id} className="bg-black/50 p-3 rounded border border-neutral-700">
                <h3 className="font-bold text-cyan-400 text-sm">{project.name}</h3>
                <p className="text-xs text-neutral-300 mt-1">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <p className="text-xs text-green-400 mt-1">🔗 {project.link}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-green-400 mb-3">
            $ cat education.md
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-black/50 p-3 rounded border border-neutral-700">
                <h3 className="font-bold text-cyan-400 text-sm">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-xs text-neutral-400">{edu.institution}</p>
                <p className="text-xs text-green-400">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TechTemplate;
