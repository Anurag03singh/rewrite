import { useState, useEffect } from "react";
import { ResumeData, TemplateType } from "@/types/resume";
import TemplateSelector from "@/components/resume/TemplateSelector";
import ResumeForm from "@/components/resume/ResumeForm";
import ModernTemplate from "@/components/resume/templates/ModernTemplate";
import ClassicTemplate from "@/components/resume/templates/ClassicTemplate";
import MinimalTemplate from "@/components/resume/templates/MinimalTemplate";
import CreativeTemplate from "@/components/resume/templates/CreativeTemplate";
import { Button } from "@/components/ui/button";
import { Download, Eye, Loader2, Save } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import { useResume, useCreateResume, useUpdateResume } from "@/hooks/useResumes";
import { useUserProfile } from "@/hooks/useUserProfile";

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("id");

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("modern");
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Fetch user profile for premium status
  const { data: userProfile } = useUserProfile();
  const isPremiumUser = userProfile?.is_premium || false;

  // Fetch existing resume if editing
  const { data: existingResume, isLoading: isLoadingResume } = useResume(resumeId || undefined);

  // Mutations
  const createResume = useCreateResume();
  const updateResume = useUpdateResume();

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });

  // Load existing resume data
  useEffect(() => {
    if (existingResume) {
      setResumeData({
        personalInfo: existingResume.personal_info,
        experience: existingResume.experience,
        education: existingResume.education,
        skills: existingResume.skills,
        projects: existingResume.projects,
      });
      setSelectedTemplate(existingResume.template_type);
    }
  }, [existingResume]);

  // Track unsaved changes
  useEffect(() => {
    if (existingResume) {
      setHasUnsavedChanges(true);
    }
  }, [resumeData, selectedTemplate]);

  const handleSave = async () => {
    try {
      const resumePayload = {
        title: resumeData.personalInfo.fullName
          ? `${resumeData.personalInfo.fullName}'s Resume`
          : "Untitled Resume",
        template_type: selectedTemplate,
        personal_info: resumeData.personalInfo,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
        projects: resumeData.projects,
      };

      if (resumeId && existingResume) {
        // Update existing resume
        await updateResume.mutateAsync({
          id: resumeId,
          ...resumePayload,
        });
      } else {
        // Create new resume
        const newResume = await createResume.mutateAsync(resumePayload);
        // Update URL with new resume ID
        navigate(`/builder?id=${newResume.id}`, { replace: true });
      }

      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "classic":
        return <ClassicTemplate data={resumeData} />;
      case "minimal":
        return <MinimalTemplate data={resumeData} />;
      case "creative":
        return <CreativeTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-preview");
      if (!element) {
        throw new Error("Resume preview not found");
      }

      // Capture the resume as canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // Convert to PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      // Download the PDF
      const fileName = `${resumeData.personalInfo.fullName || "Resume"}_${selectedTemplate}.pdf`;
      pdf.save(fileName);

      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoadingResume) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="font-display font-bold text-xl"
          >
            <span className="text-gradient">ResumeAI</span>
          </button>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? "Edit" : "Preview"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleSave}
              disabled={createResume.isPending || updateResume.isPending || !hasUnsavedChanges}
            >
              {createResume.isPending || updateResume.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </Button>
            <Button size="sm" onClick={handleDownload} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Form/Template Selector */}
          <div className="space-y-8">
            {!showPreview && (
              <>
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={setSelectedTemplate}
                  isPremiumUser={isPremiumUser}
                />
                <ResumeForm data={resumeData} onChange={setResumeData} />
              </>
            )}
          </div>

          {/* Right Side - Live Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-xl">
              <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                <div id="resume-preview" className="transform scale-75 origin-top">
                  {renderTemplate()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
