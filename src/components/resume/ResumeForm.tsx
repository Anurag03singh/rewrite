import { useState } from "react";
import { ResumeData } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ResumeForm = ({ data, onChange }: ResumeFormProps) => {
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: [""],
        },
      ],
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          id: Date.now().toString(),
          institution: "",
          degree: "",
          field: "",
          location: "",
          startDate: "",
          endDate: "",
          gpa: "",
        },
      ],
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const addSkill = () => {
    onChange({
      ...data,
      skills: [
        ...data.skills,
        {
          id: Date.now().toString(),
          category: "",
          items: [],
        },
      ],
    });
  };

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((skill) => skill.id !== id),
    });
  };

  const addProject = () => {
    onChange({
      ...data,
      projects: [
        ...data.projects,
        {
          id: Date.now().toString(),
          name: "",
          description: "",
          technologies: [],
          link: "",
        },
      ],
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((proj) => proj.id !== id),
    });
  };

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-display">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={data.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
          
          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={data.personalInfo.location}
              onChange={(e) => updatePersonalInfo("location", e.target.value)}
              placeholder="Mumbai, India"
            />
          </div>
          
          <div>
            <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
            <Input
              id="linkedin"
              value={data.personalInfo.linkedin || ""}
              onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          
          <div>
            <Label htmlFor="portfolio">Portfolio (Optional)</Label>
            <Input
              id="portfolio"
              value={data.personalInfo.portfolio || ""}
              onChange={(e) => updatePersonalInfo("portfolio", e.target.value)}
              placeholder="johndoe.com"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="summary">Professional Summary *</Label>
          <Textarea
            id="summary"
            value={data.personalInfo.summary}
            onChange={(e) => updatePersonalInfo("summary", e.target.value)}
            placeholder="Brief overview of your professional background and key achievements..."
            rows={4}
          />
        </div>
      </div>

      {/* Experience Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold font-display">Work Experience</h3>
          <Button onClick={addExperience} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </div>

        {data.experience.map((exp, index) => (
          <div
            key={exp.id}
            className="p-4 border border-border rounded-lg space-y-4 relative"
          >
            <Button
              onClick={() => removeExperience(exp.id)}
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Company *</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].company = e.target.value;
                    onChange({ ...data, experience: newExp });
                  }}
                  placeholder="Company Name"
                />
              </div>

              <div>
                <Label>Position *</Label>
                <Input
                  value={exp.position}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].position = e.target.value;
                    onChange({ ...data, experience: newExp });
                  }}
                  placeholder="Job Title"
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].location = e.target.value;
                    onChange({ ...data, experience: newExp });
                  }}
                  placeholder="City, Country"
                />
              </div>

              <div>
                <Label>Start Date *</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].startDate = e.target.value;
                    onChange({ ...data, experience: newExp });
                  }}
                />
              </div>

              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].endDate = e.target.value;
                    onChange({ ...data, experience: newExp });
                  }}
                  disabled={exp.current}
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].current = e.target.checked;
                    if (e.target.checked) {
                      newExp[index].endDate = "";
                    }
                    onChange({ ...data, experience: newExp });
                  }}
                  className="w-4 h-4"
                />
                <Label htmlFor={`current-${exp.id}`} className="cursor-pointer">
                  Currently working here
                </Label>
              </div>
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={exp.description.join("\n")}
                onChange={(e) => {
                  const newExp = [...data.experience];
                  newExp[index].description = e.target.value.split("\n");
                  onChange({ ...data, experience: newExp });
                }}
                placeholder="• Achieved X by doing Y&#10;• Led team of Z people&#10;• Improved metrics by N%"
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use bullet points (•) for better formatting
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold font-display">Education</h3>
          <Button onClick={addEducation} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>

        {data.education.map((edu, index) => (
          <div
            key={edu.id}
            className="p-4 border border-border rounded-lg space-y-4 relative"
          >
            <Button
              onClick={() => removeEducation(edu.id)}
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Institution *</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].institution = e.target.value;
                    onChange({ ...data, education: newEdu });
                  }}
                  placeholder="University Name"
                />
              </div>

              <div>
                <Label>Degree *</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].degree = e.target.value;
                    onChange({ ...data, education: newEdu });
                  }}
                  placeholder="Bachelor's, Master's, etc."
                />
              </div>

              <div>
                <Label>Field of Study *</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].field = e.target.value;
                    onChange({ ...data, education: newEdu });
                  }}
                  placeholder="Computer Science"
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={edu.location}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].location = e.target.value;
                    onChange({ ...data, education: newEdu });
                  }}
                  placeholder="City, Country"
                />
              </div>

              <div>
                <Label>Start Date *</Label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].startDate = e.target.value;
                    onChange({ ...data, education: newEdu });
                  }}
                />
              </div>

              <div>
                <Label>End Date *</Label>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].endDate = e.target.value;
                    onChange({ ...data, education: newEdu });
                  }}
                />
              </div>

              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  value={edu.gpa || ""}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].gpa = e.target.value;
                    onChange({ ...data, education: newEdu });
                  }}
                  placeholder="3.8/4.0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold font-display">Skills</h3>
          <Button onClick={addSkill} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Skill Category
          </Button>
        </div>

        {data.skills.map((skill, index) => (
          <div
            key={skill.id}
            className="p-4 border border-border rounded-lg space-y-4 relative"
          >
            <Button
              onClick={() => removeSkill(skill.id)}
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Category *</Label>
                <Input
                  value={skill.category}
                  onChange={(e) => {
                    const newSkills = [...data.skills];
                    newSkills[index].category = e.target.value;
                    onChange({ ...data, skills: newSkills });
                  }}
                  placeholder="Programming Languages, Tools, etc."
                />
              </div>

              <div>
                <Label>Skills (comma-separated) *</Label>
                <Input
                  value={skill.items.join(", ")}
                  onChange={(e) => {
                    const newSkills = [...data.skills];
                    newSkills[index].items = e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter((s) => s);
                    onChange({ ...data, skills: newSkills });
                  }}
                  placeholder="JavaScript, React, Node.js"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold font-display">Projects</h3>
          <Button onClick={addProject} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>

        {data.projects.map((project, index) => (
          <div
            key={project.id}
            className="p-4 border border-border rounded-lg space-y-4 relative"
          >
            <Button
              onClick={() => removeProject(project.id)}
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Project Name *</Label>
                <Input
                  value={project.name}
                  onChange={(e) => {
                    const newProjects = [...data.projects];
                    newProjects[index].name = e.target.value;
                    onChange({ ...data, projects: newProjects });
                  }}
                  placeholder="E-commerce Platform"
                />
              </div>

              <div>
                <Label>Description *</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...data.projects];
                    newProjects[index].description = e.target.value;
                    onChange({ ...data, projects: newProjects });
                  }}
                  placeholder="Brief description of the project and your role..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Technologies (comma-separated) *</Label>
                <Input
                  value={project.technologies.join(", ")}
                  onChange={(e) => {
                    const newProjects = [...data.projects];
                    newProjects[index].technologies = e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter((s) => s);
                    onChange({ ...data, projects: newProjects });
                  }}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div>
                <Label>Project Link (Optional)</Label>
                <Input
                  value={project.link || ""}
                  onChange={(e) => {
                    const newProjects = [...data.projects];
                    newProjects[index].link = e.target.value;
                    onChange({ ...data, projects: newProjects });
                  }}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeForm;
