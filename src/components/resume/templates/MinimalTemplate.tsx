import { ResumeData } from "@/types/resume";

interface MinimalTemplateProps {
  data: ResumeData;
}

const MinimalTemplate = ({ data }: MinimalTemplateProps) => {
  return (
    <div className="bg-white text-black p-8 max-w-[8.5in] mx-auto shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-light mb-3">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-3 text-sm text-neutral-600">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
          {data.personalInfo.portfolio && <span>{data.personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <p className="text-sm leading-relaxed text-neutral-700">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-base">{exp.position}</h3>
                  <span className="text-xs text-neutral-500">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mb-2">
                  {exp.company} · {exp.location}
                </p>
                <ul className="space-y-1">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="text-sm text-neutral-700 flex gap-2">
                      <span className="text-neutral-400">—</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-base">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-xs text-neutral-500">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className="text-sm text-neutral-600">{edu.institution}</p>
                {edu.gpa && (
                  <p className="text-sm text-neutral-600">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {data.skills.map((skill) => (
              <div key={skill.id}>
                <p className="text-sm font-semibold text-neutral-700 mb-1">
                  {skill.category}
                </p>
                <p className="text-sm text-neutral-600">{skill.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-base">{project.name}</h3>
                <p className="text-sm text-neutral-700 mt-1">{project.description}</p>
                <p className="text-sm text-neutral-600 mt-1">
                  {project.technologies.join(" · ")}
                </p>
                {project.link && (
                  <p className="text-sm text-neutral-500 mt-1">{project.link}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
