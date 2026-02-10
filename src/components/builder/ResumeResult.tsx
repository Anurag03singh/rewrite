import { Button } from "@/components/ui/button";
import { Download, Target, CheckCircle, AlertCircle } from "lucide-react";

interface Props {
  resume: any;
}

const ResumeResult = ({ resume }: Props) => {
  if (!resume) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-muted-foreground text-lg">No resume generated yet. Go to the Generate tab to create one.</p>
      </div>
    );
  }

  const { resume: content, atsScore, matchedKeywords, missingKeywords } = resume;

  const handleDownload = () => {
    // Generate a simple text version for download
    const sections = [];
    sections.push(content.name || "");
    sections.push(content.contact || "");
    sections.push("");
    if (content.summary) {
      sections.push("PROFESSIONAL SUMMARY");
      sections.push(content.summary);
      sections.push("");
    }
    if (content.experience?.length) {
      sections.push("WORK EXPERIENCE");
      content.experience.forEach((exp: any) => {
        sections.push(`${exp.role} | ${exp.company} | ${exp.dates}`);
        exp.bullets?.forEach((b: string) => sections.push(`• ${b}`));
        sections.push("");
      });
    }
    if (content.education?.length) {
      sections.push("EDUCATION");
      content.education.forEach((edu: any) => {
        sections.push(`${edu.degree} - ${edu.institution}`);
        if (edu.details) sections.push(edu.details);
        sections.push("");
      });
    }
    if (content.skills) {
      sections.push("SKILLS");
      sections.push(content.skills);
      sections.push("");
    }
    if (content.projects?.length) {
      sections.push("PROJECTS");
      content.projects.forEach((proj: any) => {
        sections.push(proj.title);
        sections.push(proj.description);
        sections.push("");
      });
    }

    const text = sections.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-display">Your Tailored Resume</h2>
        <Button onClick={handleDownload} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Download className="w-4 h-4 mr-2" /> Download
        </Button>
      </div>

      {/* ATS Score */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-gradient-card border border-border/50 text-center">
          <Target className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-3xl font-bold font-display text-gradient">{atsScore}%</div>
          <div className="text-sm text-muted-foreground">ATS Match Score</div>
        </div>
        <div className="p-5 rounded-xl bg-gradient-card border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">Matched Keywords</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {matchedKeywords?.map((kw: string) => (
              <span key={kw} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{kw}</span>
            ))}
          </div>
        </div>
        <div className="p-5 rounded-xl bg-gradient-card border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <span className="font-semibold text-sm">Missing Keywords</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {missingKeywords?.map((kw: string) => (
              <span key={kw} className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">{kw}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="p-8 rounded-xl bg-foreground/[0.03] border border-border/50 space-y-6 font-body">
        {content.name && <h1 className="text-2xl font-bold font-display text-center">{content.name}</h1>}
        {content.contact && <p className="text-center text-sm text-muted-foreground">{content.contact}</p>}

        {content.summary && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2 border-b border-border/50 pb-1">Professional Summary</h2>
            <p className="text-sm leading-relaxed text-secondary-foreground">{content.summary}</p>
          </div>
        )}

        {content.experience?.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 border-b border-border/50 pb-1">Work Experience</h2>
            {content.experience.map((exp: any, i: number) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm">{exp.role}</h3>
                  <span className="text-xs text-muted-foreground">{exp.dates}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.bullets?.map((b: string, j: number) => (
                    <li key={j} className="text-sm text-secondary-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {content.education?.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 border-b border-border/50 pb-1">Education</h2>
            {content.education.map((edu: any, i: number) => (
              <div key={i} className="mb-2">
                <h3 className="font-semibold text-sm">{edu.degree}</h3>
                <p className="text-xs text-muted-foreground">{edu.institution}</p>
                {edu.details && <p className="text-xs text-muted-foreground">{edu.details}</p>}
              </div>
            ))}
          </div>
        )}

        {content.skills && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2 border-b border-border/50 pb-1">Skills</h2>
            <p className="text-sm text-secondary-foreground">{content.skills}</p>
          </div>
        )}

        {content.projects?.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 border-b border-border/50 pb-1">Projects</h2>
            {content.projects.map((proj: any, i: number) => (
              <div key={i} className="mb-2">
                <h3 className="font-semibold text-sm">{proj.title}</h3>
                <p className="text-sm text-secondary-foreground">{proj.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeResult;
