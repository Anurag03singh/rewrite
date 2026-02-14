import { useTemplateLibrary, useCloneTemplate } from "@/hooks/useTemplateLibrary";
import { Button } from "@/components/ui/button";
import { Download, Lock, Loader2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface TemplateLibraryProps {
  isPremiumUser: boolean;
}

const TemplateLibrary = ({ isPremiumUser }: TemplateLibraryProps) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  
  const { data: templates, isLoading } = useTemplateLibrary(selectedCategory);
  const cloneTemplate = useCloneTemplate();

  const categories = [
    { id: undefined, label: "All Templates" },
    { id: "tech", label: "Tech & Engineering" },
    { id: "professional", label: "Professional" },
    { id: "creative", label: "Creative" },
    { id: "academic", label: "Academic" },
  ];

  const handleUseTemplate = async (templateId: string, isPremium: boolean) => {
    if (isPremium && !isPremiumUser) {
      toast.error("This is a premium template. Please upgrade to use it.");
      return;
    }

    const result = await cloneTemplate.mutateAsync(templateId);
    if (result) {
      navigate(`/builder?id=${result.id}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display mb-2">Template Library</h2>
        <p className="text-muted-foreground">
          Choose from pre-filled templates and customize them to your needs
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id || "all"}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat.id
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates?.map((template) => {
            const isLocked = template.is_premium && !isPremiumUser;

            return (
              <div
                key={template.id}
                className="group relative border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all bg-card"
              >
                {/* Preview */}
                <div className="aspect-[8.5/11] bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center relative overflow-hidden">
                  <span className="text-6xl font-display text-neutral-300 dark:text-neutral-600">
                    {template.name.charAt(0)}
                  </span>
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center">
                        <Lock className="w-12 h-12 text-white mx-auto mb-2" />
                        <p className="text-white text-sm font-semibold">Premium</p>
                      </div>
                    </div>
                  )}
                  {template.downloads_count > 10 && (
                    <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Popular
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">{template.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Download className="w-3 h-3" />
                      <span>{template.downloads_count} uses</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleUseTemplate(template.id, template.is_premium)}
                      disabled={cloneTemplate.isPending || isLocked}
                      className="text-xs"
                    >
                      {cloneTemplate.isPending ? (
                        <>
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          Cloning...
                        </>
                      ) : (
                        "Use Template"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {templates && templates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No templates found in this category</p>
        </div>
      )}
    </div>
  );
};

export default TemplateLibrary;
