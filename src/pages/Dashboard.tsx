import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import ProfileSetup from "@/components/builder/ProfileSetup";
import JDInput from "@/components/builder/JDInput";
import ResumeResult from "@/components/builder/ResumeResult";
import { Button } from "@/components/ui/button";
import { LogOut, FileText, User as UserIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";

type Tab = "profile" | "generate" | "results";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [generatedResume, setGeneratedResume] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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

  if (!user) return null;

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "generate", label: "Generate", icon: Sparkles },
    { id: "results", label: "Results", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border/50 glass sticky top-0 z-50">
        <div className="container px-6 h-16 flex items-center justify-between">
          <div className="font-display font-bold text-xl">
            <span className="text-gradient">ResumeAI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <div className="border-b border-border/50">
        <div className="container px-6 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container px-6 py-8">
        {activeTab === "profile" && <ProfileSetup userId={user.id} />}
        {activeTab === "generate" && (
          <JDInput
            userId={user.id}
            onGenerated={(resume) => {
              setGeneratedResume(resume);
              setActiveTab("results");
            }}
          />
        )}
        {activeTab === "results" && <ResumeResult resume={generatedResume} />}
      </div>
    </div>
  );
};

export default Dashboard;
