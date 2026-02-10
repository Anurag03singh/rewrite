import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";

interface Props {
  userId: string;
  onGenerated: (resume: any) => void;
}

const JDInput = ({ userId, onGenerated }: Props) => {
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please paste a job description");
      return;
    }

    setLoading(true);
    try {
      // Fetch user profile data
      const [profileRes, expRes, eduRes, projRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle(),
        supabase.from("work_experiences").select("*").eq("user_id", userId),
        supabase.from("education").select("*").eq("user_id", userId),
        supabase.from("projects").select("*").eq("user_id", userId),
      ]);

      const { data, error } = await supabase.functions.invoke("generate-resume", {
        body: {
          profile: profileRes.data,
          experiences: expRes.data || [],
          education: eduRes.data || [],
          projects: projRes.data || [],
          jobDescription,
          jobTitle,
          company,
        },
      });

      if (error) throw error;

      // Save to database
      await supabase.from("generated_resumes").insert({
        user_id: userId,
        job_title: jobTitle,
        company,
        job_description: jobDescription,
        resume_content: data.resume,
        ats_score: data.atsScore,
        matched_keywords: data.matchedKeywords,
        missing_keywords: data.missingKeywords,
      });

      onGenerated(data);
      toast.success("Resume generated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to generate resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display mb-2">Generate Tailored Resume</h2>
        <p className="text-muted-foreground">Paste a job description and we'll create an ATS-optimized resume for you.</p>
      </div>

      <div className="p-6 rounded-xl bg-gradient-card border border-border/50 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Job Title (optional)</Label>
            <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g. Senior Software Engineer" className="bg-muted border-border" />
          </div>
          <div className="space-y-2">
            <Label>Company (optional)</Label>
            <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Google" className="bg-muted border-border" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Job Description *</Label>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            className="bg-muted border-border min-h-[300px] font-mono text-sm"
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading || !jobDescription.trim()}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display text-lg py-6"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing & Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Resume
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default JDInput;
