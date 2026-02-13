import { ResumeData } from "@/types/resume";

interface CreativeTemplateProps {
  data: ResumeData;
}

const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  return (
    <div className="bg-white text-black max-w-[8.5in] mx-auto shadow-lg flex">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-primary/90 to-primary text-white p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 break-words">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-white/30 pb-2">
            Contact
          </h2>
          <div className="space-y-2 text-xs">
            <p className="break-words">{data.personalInfo.email}</p>
            <p>{data.personalInfo.phone}</p>
            <p>{data.personalInfo.location}</p>
            {data.personalInfo.linkedin && (
              <p className="break-words">{data.personalInfo.linkedin}</p>
            )}
            {data.personalInfo.portfolio && (
              <p className="break-words">{data.personalInfo.portfolio}</p>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-white/30 pb-2">
              Skills
            </h2>
            <div className="space-y-3">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-xs font-bold mb-1">{skill.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {skill.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white/20 px-2 py-0.5 rounded"
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

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-white/30 pb-2">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <p className="font-bold">{edu.degree}</p>
                  <p>{edu.field}</p>
                  <p className="text-white/80">{edu.institution}</p>
                  <p className="text-white/60 text-[10px]">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.gpa && <p className="text-white/80">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary"></span>
              Profile
            </h2>
            <p className="text-sm leading-relaxed text-neutral-700">
              {data.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary"></span>
              Experience
            </h2>
            <div className="space-y-5">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-primary/30">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-primary"></div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-base">{exp.position}</h3>
                    <span className="text-xs text-neutral-500 whitespace-nowrap ml-2">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-primary font-semibold mb-2">
                    {exp.company} · {exp.location}
                  </p>
                  <ul className="space-y-1">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="text-sm text-neutral-700 flex gap-2">
                        <span className="text-primary">▸</span>
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
          <div>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary"></span>
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-base text-primary">
                    {project.name}
                  </h3>
                  <p className="text-sm text-neutral-700 mt-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <p className="text-xs text-primary mt-1 underline">
                      {project.link}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
