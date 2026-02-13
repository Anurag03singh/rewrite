import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ResumeData, TemplateType } from "@/types/resume";
import { toast } from "sonner";

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  template_type: TemplateType;
  personal_info: ResumeData["personalInfo"];
  experience: ResumeData["experience"];
  education: ResumeData["education"];
  skills: ResumeData["skills"];
  projects: ResumeData["projects"];
  created_at: string;
  updated_at: string;
}

export const useResumes = () => {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data as Resume[];
    },
  });
};

export const useResume = (id: string | undefined) => {
  return useQuery({
    queryKey: ["resume", id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Resume;
    },
    enabled: !!id,
  });
};

export const useCreateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resume: Omit<Resume, "id" | "user_id" | "created_at" | "updated_at">) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("resumes")
        .insert({
          user_id: user.id,
          ...resume,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Resume;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("Resume created successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create resume: ${error.message}`);
    },
  });
};

export const useUpdateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<Resume> & { id: string }) => {
      const { data, error } = await supabase
        .from("resumes")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Resume;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      queryClient.invalidateQueries({ queryKey: ["resume", data.id] });
      toast.success("Resume saved successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to save resume: ${error.message}`);
    },
  });
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("resumes").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("Resume deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete resume: ${error.message}`);
    },
  });
};
