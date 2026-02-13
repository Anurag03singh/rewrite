import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LogOut, FileText, Plus, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { useResumes, useDeleteResume } from "@/hooks/useResumes";
import { useUserProfile } from "@/hooks/useUserProfile";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const { data: resumes, isLoading } = useResumes();
  const { data: userProfile } = useUserProfile();
  const deleteResume = useDeleteResume();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/auth");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate("/");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this resume?")) {
      await deleteResume.mutateAsync(id);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border/50 glass sticky top-0 z-50">
        <div className="container px-6 h-16 flex items-center justify-between">
          <div className="font-display font-bold text-xl">
            <span className="text-gradient">ResumeAI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            {userProfile?.is_premium && (
              <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                Premium
              </span>
            )}
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-display mb-2">
                My Resumes
              </h1>
              <p className="text-muted-foreground">
                Create and manage your professional resumes
              </p>
            </div>
            <Button onClick={() => navigate("/builder")}>
              <Plus className="w-4 h-4 mr-2" />
              New Resume
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-64 rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : resumes && resumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="group relative p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/builder?id=${resume.id}`)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(resume.id)}
                        disabled={deleteResume.isPending}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                    {resume.title}
                  </h3>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Template: {resume.template_type}</p>
                    <p>
                      Updated:{" "}
                      {new Date(resume.updated_at).toLocaleDateString()}
                    </p>
                  </div>

                  <Button
                    className="w-full mt-4"
                    variant="outline"
                    onClick={() => navigate(`/builder?id=${resume.id}`)}
                  >
                    Edit Resume
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first resume to get started
              </p>
              <Button onClick={() => navigate("/builder")}>
                <Plus className="w-4 h-4 mr-2" />
                Create Resume
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
