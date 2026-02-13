import { ResumeData } from "@/types/resume";

interface ClassicTemplateProps {
  data: ResumeData;
}

const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  return (
    <div className="bg-white text-black p-8 max-w-[8.5in] mx-auto shadow-lg font-serif">
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {data.personalInfo.fullName || "YOUR NAME"}
        </h1>
        <div className="text-sm space-x-2">
          <span>{data.personalInfo.email}</span>
          <span>|</span>
          <span>{data.personalInfo.phone}</span>
          <span>|</span>
          <span>{data.personalInfo.location}</span>
        </div>
        {(data.personalInfo.linkedin || data.personalInfo.portfolio) && (
          <div className="text-sm mt-1 space-x-2">
            {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
            {data.personalInfo.linkedin && data.personalInfo.portfolio && <span>|</span>}
            {data.personalInfo.portfolio && <span>{data.personalInfo.portfolio}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-black mb-2">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-black mb-3">
            WORK EXPERIENCE
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{exp.position}</h3>
                  <span className="text-sm">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="text-sm italic mb-1">
                  {exp.company}, {exp.location}
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="text-sm">
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
          <h2 className="text-lg font-bold border-b border-black mb-3">EDUCATION</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-sm">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="text-sm">{edu.institution}</div>
                {edu.gpa && <div className="text-sm">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-black mb-3">SKILLS</h2>
          <div className="space-y-1">
            {data.skills.map((skill) => (
              <div key={skill.id} className="text-sm">
                <span className="font-bold">{skill.category}:</span>{" "}
                {skill.items.join(", ")}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div>
          <h2 className="text-lg font-bold border-b border-black mb-3">PROJECTS</h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold">{project.name}</h3>
                <p className="text-sm mt-1">{project.description}</p>
                <p className="text-sm mt-1">
                  <span className="font-bold">Technologies:</span>{" "}
                  {project.technologies.join(", ")}
                </p>
                {project.link && (
                  <p className="text-sm mt-1 underline">{project.link}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;
