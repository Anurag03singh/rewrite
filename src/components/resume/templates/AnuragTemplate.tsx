import React from "react";
import { ResumeData } from "@/types/resume";
import "./AnuragTemplate.css";

interface AnuragTemplateProps {
  data: ResumeData;
}

const AnuragTemplate: React.FC<AnuragTemplateProps> = ({ data }) => {
  return (
    <div className="resume-container">
      {/* Header */}
      <h1>{data.personalInfo.fullName}</h1>
      <div className="contact">
        {data.personalInfo.email} | {data.personalInfo.phone}
        {data.personalInfo.github && (
          <>
            {" | "}
            <a href={data.personalInfo.github}>Github</a>
          </>
        )}
        {data.personalInfo.portfolio && (
          <>
            {" | "}
            <a href={data.personalInfo.portfolio}>Portfolio</a>
          </>
        )}
        {data.personalInfo.linkedin && (
          <>
            {" | "}
            <a href={data.personalInfo.linkedin}>LinkedIn</a>
          </>
        )}
      </div>

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <>
          <h2>Education</h2>
          <div className="section">
            {data.education.map((edu, index) => (
              <React.Fragment key={index}>
                <div className="sub-heading">
                  {edu.institution}
                  <span className="date">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div>
                  {edu.degree}
                  {edu.field && ` in ${edu.field}`}
                </div>
                <div className="clear"></div>
                {index < data.education.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      {/* Work Experience */}
      {data.experience && data.experience.length > 0 && (
        <>
          <h2>Work Experience</h2>
          <div className="section">
            {data.experience.map((exp, index) => (
              <React.Fragment key={index}>
                <div className="sub-heading">
                  {exp.company} | {exp.position}
                  <span className="date">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <ul>
                  {exp.description
                    .filter((point) => point.trim())
                    .map((point, i) => (
                      <li key={i}>{point.trim()}</li>
                    ))}
                </ul>
                <div className="clear"></div>
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <>
          <h2>Projects</h2>
          <div className="section">
            {data.projects.map((project, index) => (
              <React.Fragment key={index}>
                <div className="sub-heading">
                  {project.name}
                  {project.link && (
                    <>
                      {" - "}
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Live
                      </a>
                    </>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <> | {project.technologies.join(", ")}</>
                  )}
                </div>
                <ul>
                  {project.description
                    .split("\n")
                    .filter((point) => point.trim())
                    .map((point, i) => (
                      <li key={i}>{point.trim()}</li>
                    ))}
                </ul>
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <>
          <h2>Skills</h2>
          <div className="section">
            {data.skills.map((skillGroup, index) => (
              <p key={index}>
                <strong>{skillGroup.category}:</strong> {skillGroup.items.join(" | ")}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AnuragTemplate;
