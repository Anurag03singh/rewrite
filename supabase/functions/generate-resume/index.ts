import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { profile, experiences, education, projects, jobDescription, jobTitle, company } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("AI key not configured");

    const profileSummary = `
Name: ${profile?.full_name || "N/A"}
Email: ${profile?.email || "N/A"}
Phone: ${profile?.phone || "N/A"}
Location: ${profile?.location || "N/A"}
LinkedIn: ${profile?.linkedin_url || "N/A"}
Portfolio: ${profile?.portfolio_url || "N/A"}
Summary: ${profile?.summary || "N/A"}
Skills: ${profile?.skills?.join(", ") || "N/A"}
`;

    const expSummary = experiences?.map((e: any) =>
      `${e.role} at ${e.company} (${e.start_date || ""} - ${e.end_date || "Present"}): ${e.description || ""}`
    ).join("\n") || "No experience listed";

    const eduSummary = education?.map((e: any) =>
      `${e.degree} in ${e.field || ""} from ${e.institution} (${e.start_date || ""} - ${e.end_date || ""})`
    ).join("\n") || "No education listed";

    const projSummary = projects?.map((p: any) =>
      `${p.title}: ${p.description || ""} (Tech: ${p.tech_stack?.join(", ") || "N/A"})`
    ).join("\n") || "No projects listed";

    const systemPrompt = `You are an expert ATS resume optimizer. Your job is to take a candidate's profile and tailor their resume specifically for a given job description.

Rules:
1. Rewrite bullet points using strong action verbs and quantified achievements
2. Prioritize relevant experience and skills that match the JD
3. Ensure ATS-friendly formatting (no tables, columns, or special characters)
4. Keep it concise - max 1 page worth of content
5. Match keywords from the JD naturally into the resume

You MUST respond with valid JSON only, no markdown, no extra text. Use this exact structure:
{
  "resume": {
    "name": "Full Name",
    "contact": "email | phone | location | linkedin",
    "summary": "2-3 sentence professional summary tailored to this role",
    "experience": [
      {
        "role": "Job Title",
        "company": "Company Name",
        "dates": "Start - End",
        "bullets": ["Achievement-focused bullet 1", "Achievement-focused bullet 2", "Achievement-focused bullet 3"]
      }
    ],
    "education": [
      {
        "degree": "Degree Name",
        "institution": "School Name",
        "details": "GPA, honors, relevant coursework"
      }
    ],
    "skills": "Comma-separated list of relevant skills",
    "projects": [
      {
        "title": "Project Name",
        "description": "Brief description highlighting relevant tech/impact"
      }
    ]
  },
  "atsScore": 85,
  "matchedKeywords": ["keyword1", "keyword2"],
  "missingKeywords": ["keyword3", "keyword4"]
}`;

    const userPrompt = `CANDIDATE PROFILE:
${profileSummary}

WORK EXPERIENCE:
${expSummary}

EDUCATION:
${eduSummary}

PROJECTS:
${projSummary}

JOB DESCRIPTION:
Title: ${jobTitle || "Not specified"}
Company: ${company || "Not specified"}
${jobDescription}

Generate a tailored, ATS-optimized resume for this job. Return ONLY valid JSON.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI error:", status, text);
      throw new Error("AI generation failed");
    }

    const aiData = await response.json();
    let content = aiData.choices?.[0]?.message?.content || "";
    
    // Clean up potential markdown wrapping
    content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    const parsed = JSON.parse(content);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-resume error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
