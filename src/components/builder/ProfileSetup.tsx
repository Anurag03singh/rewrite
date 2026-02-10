import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";

interface Props {
  userId: string;
}

const ProfileSetup = ({ userId }: Props) => {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    linkedin_url: "",
    portfolio_url: "",
    summary: "",
    skills: [] as string[],
  });
  const [newSkill, setNewSkill] = useState("");
  const [experiences, setExperiences] = useState<any[]>([]);
  const [educations, setEducations] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    const [profileRes, expRes, eduRes, projRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("work_experiences").select("*").eq("user_id", userId).order("created_at"),
      supabase.from("education").select("*").eq("user_id", userId).order("created_at"),
      supabase.from("projects").select("*").eq("user_id", userId).order("created_at"),
    ]);

    if (profileRes.data) {
      setProfile({
        full_name: profileRes.data.full_name || "",
        email: profileRes.data.email || "",
        phone: profileRes.data.phone || "",
        location: profileRes.data.location || "",
        linkedin_url: profileRes.data.linkedin_url || "",
        portfolio_url: profileRes.data.portfolio_url || "",
        summary: profileRes.data.summary || "",
        skills: profileRes.data.skills || [],
      });
    }
    if (expRes.data) setExperiences(expRes.data);
    if (eduRes.data) setEducations(eduRes.data);
    if (projRes.data) setProjects(projRes.data);
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          location: profile.location,
          linkedin_url: profile.linkedin_url,
          portfolio_url: profile.portfolio_url,
          summary: profile.summary,
          skills: profile.skills,
        })
        .eq("user_id", userId);
      if (error) throw error;
      toast.success("Profile saved!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({ ...profile, skills: profile.skills.filter((s) => s !== skill) });
  };

  const addExperience = async () => {
    const { data, error } = await supabase
      .from("work_experiences")
      .insert({ user_id: userId, company: "", role: "", description: "" })
      .select()
      .single();
    if (data) setExperiences([...experiences, data]);
    if (error) toast.error(error.message);
  };

  const updateExperience = async (id: string, field: string, value: any) => {
    setExperiences(experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
    await supabase.from("work_experiences").update({ [field]: value }).eq("id", id);
  };

  const deleteExperience = async (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id));
    await supabase.from("work_experiences").delete().eq("id", id);
  };

  const addEducation = async () => {
    const { data, error } = await supabase
      .from("education")
      .insert({ user_id: userId, institution: "", degree: "" })
      .select()
      .single();
    if (data) setEducations([...educations, data]);
    if (error) toast.error(error.message);
  };

  const updateEducation = async (id: string, field: string, value: any) => {
    setEducations(educations.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
    await supabase.from("education").update({ [field]: value }).eq("id", id);
  };

  const deleteEducation = async (id: string) => {
    setEducations(educations.filter((e) => e.id !== id));
    await supabase.from("education").delete().eq("id", id);
  };

  const addProject = async () => {
    const { data, error } = await supabase
      .from("projects")
      .insert({ user_id: userId, title: "", description: "" })
      .select()
      .single();
    if (data) setProjects([...projects, data]);
    if (error) toast.error(error.message);
  };

  const updateProject = async (id: string, field: string, value: any) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    await supabase.from("projects").update({ [field]: value }).eq("id", id);
  };

  const deleteProject = async (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    await supabase.from("projects").delete().eq("id", id);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-display">Your Profile</h2>
        <Button onClick={saveProfile} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>

      {/* Personal Info */}
      <section className="p-6 rounded-xl bg-gradient-card border border-border/50 space-y-4">
        <h3 className="font-display font-semibold text-lg">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} className="bg-muted border-border" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={profile.email} disabled className="bg-muted border-border opacity-60" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="bg-muted border-border" />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} className="bg-muted border-border" />
          </div>
          <div className="space-y-2">
            <Label>LinkedIn URL</Label>
            <Input value={profile.linkedin_url} onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })} className="bg-muted border-border" />
          </div>
          <div className="space-y-2">
            <Label>Portfolio URL</Label>
            <Input value={profile.portfolio_url} onChange={(e) => setProfile({ ...profile, portfolio_url: e.target.value })} className="bg-muted border-border" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Professional Summary</Label>
          <Textarea value={profile.summary} onChange={(e) => setProfile({ ...profile, summary: e.target.value })} className="bg-muted border-border min-h-[100px]" />
        </div>
      </section>

      {/* Skills */}
      <section className="p-6 rounded-xl bg-gradient-card border border-border/50 space-y-4">
        <h3 className="font-display font-semibold text-lg">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {profile.skills.map((skill) => (
            <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              {skill}
              <button onClick={() => removeSkill(skill)} className="hover:text-destructive">
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a skill..." className="bg-muted border-border" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} />
          <Button variant="outline" onClick={addSkill}>Add</Button>
        </div>
      </section>

      {/* Work Experience */}
      <section className="p-6 rounded-xl bg-gradient-card border border-border/50 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-lg">Work Experience</h3>
          <Button variant="outline" size="sm" onClick={addExperience}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        {experiences.map((exp) => (
          <div key={exp.id} className="p-4 rounded-lg bg-muted/50 border border-border/30 space-y-3">
            <div className="flex justify-between">
              <div className="grid md:grid-cols-2 gap-3 flex-1">
                <Input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} placeholder="Company" className="bg-muted border-border" />
                <Input value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} placeholder="Role" className="bg-muted border-border" />
              </div>
              <Button variant="ghost" size="sm" onClick={() => deleteExperience(exp.id)} className="text-destructive ml-2">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <Input value={exp.start_date || ""} onChange={(e) => updateExperience(exp.id, "start_date", e.target.value)} placeholder="Start (e.g. Jan 2022)" className="bg-muted border-border" />
              <Input value={exp.end_date || ""} onChange={(e) => updateExperience(exp.id, "end_date", e.target.value)} placeholder="End (or Present)" className="bg-muted border-border" />
            </div>
            <Textarea value={exp.description || ""} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} placeholder="Describe your responsibilities and achievements..." className="bg-muted border-border" />
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="p-6 rounded-xl bg-gradient-card border border-border/50 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-lg">Education</h3>
          <Button variant="outline" size="sm" onClick={addEducation}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        {educations.map((edu) => (
          <div key={edu.id} className="p-4 rounded-lg bg-muted/50 border border-border/30 space-y-3">
            <div className="flex justify-between">
              <div className="grid md:grid-cols-2 gap-3 flex-1">
                <Input value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} placeholder="Institution" className="bg-muted border-border" />
                <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} placeholder="Degree" className="bg-muted border-border" />
              </div>
              <Button variant="ghost" size="sm" onClick={() => deleteEducation(edu.id)} className="text-destructive ml-2">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <Input value={edu.field || ""} onChange={(e) => updateEducation(edu.id, "field", e.target.value)} placeholder="Field of Study" className="bg-muted border-border" />
              <Input value={edu.gpa || ""} onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)} placeholder="GPA (optional)" className="bg-muted border-border" />
            </div>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="p-6 rounded-xl bg-gradient-card border border-border/50 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-lg">Projects</h3>
          <Button variant="outline" size="sm" onClick={addProject}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        {projects.map((proj) => (
          <div key={proj.id} className="p-4 rounded-lg bg-muted/50 border border-border/30 space-y-3">
            <div className="flex justify-between">
              <Input value={proj.title} onChange={(e) => updateProject(proj.id, "title", e.target.value)} placeholder="Project Title" className="bg-muted border-border flex-1" />
              <Button variant="ghost" size="sm" onClick={() => deleteProject(proj.id)} className="text-destructive ml-2">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Textarea value={proj.description || ""} onChange={(e) => updateProject(proj.id, "description", e.target.value)} placeholder="Project description..." className="bg-muted border-border" />
            <Input value={proj.url || ""} onChange={(e) => updateProject(proj.id, "url", e.target.value)} placeholder="Project URL (optional)" className="bg-muted border-border" />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProfileSetup;
