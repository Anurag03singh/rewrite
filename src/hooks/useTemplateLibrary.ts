import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ResumeData, TemplateType } from "@/types/resume";
import { toast } from "sonner";

export interface TemplateLibraryItem {
  id: string;
  name: string;
  description: string | null;
  template_type: TemplateType;
  category: string;
  is_premium: boolean;
  thumbnail_url: string | null;
  personal_info: ResumeData["personalInfo"];
  experience: ResumeData["experience"];
  education: ResumeData["education"];
  skills: ResumeData["skills"];
  projects: ResumeData["projects"];
  downloads_count: number;
  created_at: string;
  updated_at: string;
}

export const useTemplateLibrary = (category?: string) => {
  return useQuery({
    queryKey: ["templateLibrary", category],
    queryFn: async () => {
      let query = supabase
        .from("template_library")
        .select("*")
        .order("downloads_count", { ascending: false });

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as TemplateLibraryItem[];
    },
  });
};

export const useTemplateLibraryItem = (id: string | undefined) => {
  return useQuery({
    queryKey: ["templateLibraryItem", id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("template_library")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as TemplateLibraryItem;
    },
    enabled: !!id,
  });
};

export const useCloneTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (templateId: string) => {
      // Get the template
      const { data: template, error: fetchError } = await supabase
        .from("template_library")
        .select("*")
        .eq("id", templateId)
        .single();

      if (fetchError) throw fetchError;

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      // Create a new resume from template
      const { data: newResume, error: createError } = await supabase
        .from("resumes")
        .insert({
          user_id: user.id,
          title: `${template.name} (Copy)`,
          template_type: template.template_type,
          personal_info: template.personal_info,
          experience: template.experience,
          education: template.education,
          skills: template.skills,
          projects: template.projects,
        })
        .select()
        .single();

      if (createError) throw createError;

      // Increment download count
      await supabase.rpc("increment_template_downloads", {
        template_id: templateId,
      });

      return newResume;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("Template cloned successfully! You can now edit it.");
    },
    onError: (error: Error) => {
      toast.error(`Failed to clone template: ${error.message}`);
    },
  });
};
