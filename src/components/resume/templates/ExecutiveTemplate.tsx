import { TemplateProps } from "@/types/resume";

const ExecutiveTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="bg-white text-black p-8 max-w-[8.5in] mx-auto shadow-lg">
      {/* Header with Photo Placeholder */}
      <div className="flex gap-6 mb-8 pb-6 border-b-4 border-neutral-800">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2 text-neutral-900">
            {data.personalInfo.fullName || "EXECUTIVE NAME"}
          </h1>
          <p className="text-lg text-neutral-600 mb-4">
            {data.experience[0]?.position || "Executive Position"}
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm text-neutral-600">
            <div>📧 {data.personalInfo.email}</div>
            <div>📱 {data.personalInfo.phone}</div>
            <div>📍 {data.personalInfo.location}</div>
            {data.personalInfo.linkedin && (
              <div>🔗 {data.personalInfo.linkedin}</div>
            )}
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-3 uppercase tracking-wide">
            Executive Summary
          </h2>
          <p className="text-sm leading-relaxed text-neutral-700 italic border-l-4 border-neutral-800 pl-4">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Professional Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4 uppercase tracking-wide">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-neutral-300 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">
                      {exp.position}
                    </h3>
                    <p className="text-base font-semibold text-neutral-700">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right text-sm text-neutral-600">
                    <p>{exp.location}</p>
                    <p>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 mt-3">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="text-sm text-neutral-700 flex gap-2">
                      <span className="text-neutral-900 font-bold">▪</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Skills Side by Side */}
      <div className="grid grid-cols-2 gap-8">
        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-3 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-sm">{edu.degree}</h3>
                  <p className="text-sm text-neutral-700">{edu.field}</p>
                  <p className="text-sm text-neutral-600">{edu.institution}</p>
                  <p className="text-xs text-neutral-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-3 uppercase tracking-wide">
              Core Competencies
            </h2>
            <div className="space-y-2">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-sm font-bold text-neutral-900">
                    {skill.category}
                  </p>
                  <p className="text-sm text-neutral-700">
                    {skill.items.join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
