# ResumeAI - AI-Powered Resume Builder

A modern, AI-powered resume builder with beautiful templates and real-time preview.

## 🚀 Features

- **4 Professional Templates**: Modern, Classic, Minimal, and Creative designs
- **Live Preview**: See changes in real-time as you type
- **PDF Export**: Download your resume as a high-quality PDF
- **Supabase Integration**: Save and manage multiple resumes
- **Premium Features**: Unlock advanced templates and features
- **ATS Optimized**: All templates are optimized for Applicant Tracking Systems
- **Responsive Design**: Works perfectly on desktop and mobile

## 💰 Pricing

- **Free**: 1 resume generation with basic templates
- **One-Time (₹15)**: Single premium resume with all features
- **Lifetime (₹199)**: Unlimited resumes + AI cover letters + LinkedIn optimization

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Auth + Database)
- **PDF Generation**: jsPDF + html2canvas
- **3D Graphics**: Three.js
- **State Management**: TanStack Query

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Anurag03singh/rewritepush.git

# Navigate to project directory
cd rewritepush

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase credentials to .env

# Run development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file with the following:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

## 📝 Database Setup

Run the Supabase migration to create necessary tables:

```sql
-- Run the SQL in supabase/migrations/20240213000000_create_resumes_table.sql
-- in your Supabase SQL Editor
```

## 🎨 Available Templates

1. **Modern Professional** - Clean design with accent colors (Free)
2. **Classic ATS** - Traditional format optimized for ATS (Free)
3. **Minimal Elegance** - Minimalist design (Premium)
4. **Creative Bold** - Unique two-column layout (Premium)

## 📱 Pages

- `/` - Landing page with features and pricing
- `/auth` - Sign in / Sign up
- `/dashboard` - Manage your resumes
- `/builder` - Create/edit resume with live preview

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Built with ❤️ by Anurag Singh

## 🙏 Acknowledgments

- Design inspired by modern SaaS applications
- UI components from shadcn/ui
- Icons from Lucide React
