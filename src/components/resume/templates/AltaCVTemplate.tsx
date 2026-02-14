import React from "react";
import { ResumeData } from "@/types/resume";
import "./AltaCVTemplate.css";

interface AltaCVTemplateProps {
  data: ResumeData;
}

const AltaCVTemplate: React.FC<AltaCVTemplateProps> = ({ data }) => {
  return (
    <div className="altacv-container">
      {/* Header */}
      <div className="altacv-header">
        <h1 className="altacv-name">{data.personalInfo.fullName}</h1>
        <p className="altacv-tagline">{data.personalInfo.summary}</p>
        
        <div className="altacv-contact">
          <div className="contact-item">
            <span className="icon">✉</span> {data.personalInfo.email}
          </div>
          <div className="contact-item">
            <span className="icon">☎</span> {data.personalInfo.phone}
          </div>
          {data.personalInfo.location && (
            <div className="contact-item">
              <span className="icon">📍</span> {data.personalInfo.location}
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="contact-item">
              <span className="icon">💼</span> {data.personalInfo.linkedin}
            </div>
          )}
          {data.personalInfo.github && (
            <div className="contact-item">
              <span className="icon">🔗</span> {data.personalInfo.github}
            </div>
          )}
        </div>
      </div>

      <div className="altacv-body">
        {/* Left Column */}
        <div className="altacv-left">
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section className="altacv-section">
              <h2 className="altacv-section-title">Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="altacv-event">
                  <div className="event-header">
                    <h3 className="event-title">{exp.position}</h3>
                    <div className="event-company">{exp.company}</div>
                    <div className="event-meta">
                      <span className="event-date">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                      {exp.location && (
                        <span className="event-location">{exp.location}</span>
                      )}
                    </div>
                  </div>
                  <ul className="event-details">
                    {exp.description
                      .filter((point) => point.trim())
                      .map((point, i) => (
                        <li key={i}>{point.trim()}</li>
                      ))}
                  </ul>
                  {index < data.experience.length - 1 && <div className="divider"></div>}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section className="altacv-section">
              <h2 className="altacv-section-title">Projects</h2>
              {data.projects.map((project, index) => (
                <div key={index} className="altacv-event">
                  <div className="event-header">
                    <h3 className="event-title">{project.name}</h3>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="event-company">
                        {project.technologies.join(", ")}
                      </div>
                    )}
                  </div>
                  <ul className="event-details">
                    {project.description
                      .split("\n")
                      .filter((point) => point.trim())
                      .map((point, i) => (
                        <li key={i}>{point.trim()}</li>
                      ))}
                  </ul>
                  {index < data.projects.length - 1 && <div className="divider"></div>}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="altacv-right">
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section className="altacv-section">
              <h2 className="altacv-section-title">Skills</h2>
              {data.skills.map((skillGroup, index) => (
                <div key={index} className="skill-group">
                  <h4 className="skill-category">{skillGroup.category}</h4>
                  <div className="skill-tags">
                    {skillGroup.items.map((skill, i) => (
                      <span key={i} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section className="altacv-section">
              <h2 className="altacv-section-title">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="altacv-event">
                  <div className="event-header">
                    <h3 className="event-title">
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </h3>
                    <div className="event-company">{edu.institution}</div>
                    <div className="event-meta">
                      <span className="event-date">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                  </div>
                  {edu.gpa && (
                    <p className="edu-detail">GPA: {edu.gpa}</p>
                  )}
                  {index < data.education.length - 1 && <div className="divider"></div>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default AltaCVTemplate;
