# 📝 How to Add External Resume Templates

This guide explains how to add new resume templates to your ResumeAI application.

## 🎯 Quick Start

### Step 1: Create Your Template Component

Create a new file in `src/components/resume/templates/YourTemplate.tsx`:

```typescript
import { TemplateProps } from "@/types/resume";

const YourTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="bg-white text-black p-8 max-w-[8.5in] mx-auto shadow-lg">
      {/* Header */}
      <h1 className="text-4xl font-bold">
        {data.personalInfo.fullName || "Your Name"}
      </h1>
      
      {/* Contact Info */}
      <div className="text-sm">
        <p>{data.personalInfo.email}</p>
        <p>{data.personalInfo.phone}</p>
        <p>{data.personalInfo.location}</p>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2>Summary</h2>
          <p>{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.map((exp) => (
        <div key={exp.id}>
          <h3>{exp.position}</h3>
          <p>{exp.company}</p>
          <ul>
            {exp.description.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Education, Skills, Projects... */}
    </div>
  );
};

export default YourTemplate;
```

### Step 2: Add Template Type

In `src/types/resume.ts`, add your template to the TemplateType:

```typescript
export type TemplateType = 
  | "modern" 
  | "classic" 
  | "minimal" 
  | "creative"
  | "executive"
  | "tech"
  | "yourtemplate"  // Add this
  | "academic";
```

### Step 3: Register Template

In `src/data/templates.ts`, add your template:

```typescript
{
  id: "yourtemplate",
  name: "Your Template Name",
  description: "Brief description of your template",
  preview: "/templates/yourtemplate.png",
  isPremium: true, // or false for free
  category: "professional", // or "creative", "academic", "tech"
}
```

### Step 4: Import and Add to Builder

In `src/pages/ResumeBuilder.tsx`:

1. Import your template:
```typescript
import YourTemplate from "@/components/resume/templates/YourTemplate";
```

2. Add to renderTemplate function:
```typescript
const renderTemplate = () => {
  switch (selectedTemplate) {
    case "yourtemplate":
      return <YourTemplate data={resumeData} />;
    // ... other cases
  }
};
```

## 📊 Available Data Structure

Your template receives a `data` prop with this structure:

```typescript
{
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
    summary: string;
  },
  experience: [{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string[];
  }],
  education: [{
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }],
  skills: [{
    id: string;
    category: string;
    items: string[];
  }],
  projects: [{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }]
}
```

## 🎨 Design Tips

1. **Use Tailwind CSS** for styling
2. **Keep it print-friendly** - use `max-w-[8.5in]` for A4 size
3. **Use semantic HTML** for better ATS compatibility
4. **Test with empty data** - handle cases where fields might be empty
5. **Make it responsive** - consider how it looks at different scales

## 📦 Example Templates Included

- **Modern** - Clean professional design (Free)
- **Classic** - Traditional ATS-friendly (Free)
- **Executive** - Premium leadership template (Premium)
- **Tech** - Terminal-style for developers (Premium)
- **Minimal** - Elegant minimalist (Premium)
- **Creative** - Bold two-column layout (Premium)

## 🚀 Testing Your Template

1. Run the dev server: `npm run dev`
2. Navigate to `/builder`
3. Select your template from the selector
4. Fill in some data and see the live preview
5. Test PDF download

## 💡 Pro Tips

- Look at existing templates for inspiration
- Use consistent spacing and typography
- Consider color schemes that print well
- Test with long text to ensure it doesn't break layout
- Make sure all sections are optional (check if data exists)

## 🔧 Troubleshooting

**Template not showing?**
- Check if it's added to `templates.ts`
- Verify the import in `ResumeBuilder.tsx`
- Check console for errors

**Layout issues?**
- Ensure you're using `max-w-[8.5in]` for proper sizing
- Test with different amounts of content
- Check padding and margins

**PDF export problems?**
- Avoid using external images
- Keep complex CSS to a minimum
- Test the download functionality

## 📝 Need Help?

Check the existing templates in `src/components/resume/templates/` for complete examples!
