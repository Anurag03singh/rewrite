import { resumeTemplates } from "@/data/templates";
import { TemplateType } from "@/types/resume";
import { Check, Lock } from "lucide-react";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import TechTemplate from "./templates/TechTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import AnuragTemplate from "./templates/AnuragTemplate";

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onSelectTemplate: (template: TemplateType) => void;
  isPremiumUser: boolean;
}

const TemplateSelector = ({
  selectedTemplate,
  onSelectTemplate,
  isPremiumUser,
}: TemplateSelectorProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold font-display mb-2">
          Choose Your Template
        </h3>
        <p className="text-sm text-muted-foreground">
          Select a template that best fits your style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resumeTemplates.map((template) => {
          const isLocked = template.isPremium && !isPremiumUser;
          const isSelected = selectedTemplate === template.id;

          return (
            <button
              key={template.id}
              onClick={() => !isLocked && onSelectTemplate(template.id)}
              disabled={isLocked}
              className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              } ${isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {/* Preview Image Placeholder */}
              <div className="aspect-[8.5/11] bg-neutral-100 dark:bg-neutral-800 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                <span className="text-4xl font-display text-neutral-300 dark:text-neutral-600">
                  {template.name.charAt(0)}
                </span>
                {isLocked && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{template.name}</h4>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {template.description}
                </p>
                {template.isPremium && (
                  <span className="inline-block text-xs font-semibold text-primary">
                    Premium
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;
