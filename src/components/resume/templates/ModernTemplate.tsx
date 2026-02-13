import { ResumeData } from "@/types/resume";

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate = ({ data }: ModernTemplateProps) => {
  return (
    <div className="bg-white text-black p-8 max-w-[8.5in] mx-auto shadow-lg">
      {/* Header */}
      <div className="border-b-4 border-primary pb-4 mb-6">
        <h1 className="text-4xl font-bold text-primary mb-2">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
          {data.personalInfo.linkedin && (
            <>
              <span>•</span>
              <span>{data.personalInfo.linkedin}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-2 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-neutral-700">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-base">{exp.position}</h3>
                    <p className="text-sm text-neutral-600">
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <span className="text-sm text-neutral-600 whitespace-nowrap">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <ul className="list-none space-y-1 mt-2">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="text-sm text-neutral-700 pl-4 relative">
                      <span className="absolute left-0">•</span>
                      {desc}
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
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base">{edu.degree} in {edu.field}</h3>
                    <p className="text-sm text-neutral-600">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-neutral-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                {edu.gpa && (
                  <p className="text-sm text-neutral-600 mt-1">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">
            Skills
          </h2>
          <div className="space-y-2">
            {data.skills.map((skill) => (
              <div key={skill.id}>
                <span className="font-semibold text-sm">{skill.category}: </span>
                <span className="text-sm text-neutral-700">
                  {skill.items.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-primary mb-3 uppercase tracking-wide">
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-base">{project.name}</h3>
                <p className="text-sm text-neutral-700 mt-1">{project.description}</p>
                <p className="text-sm text-neutral-600 mt-1">
                  <span className="font-semibold">Technologies:</span>{" "}
                  {project.technologies.join(", ")}
                </p>
                {project.link && (
                  <p className="text-sm text-primary mt-1">{project.link}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
