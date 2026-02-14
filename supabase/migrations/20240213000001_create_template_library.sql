-- Create template_library table for pre-filled resume templates
CREATE TABLE IF NOT EXISTS public.template_library (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    template_type TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'professional',
    is_premium BOOLEAN DEFAULT FALSE,
    thumbnail_url TEXT,
    personal_info JSONB NOT NULL DEFAULT '{}',
    experience JSONB NOT NULL DEFAULT '[]',
    education JSONB NOT NULL DEFAULT '[]',
    skills JSONB NOT NULL DEFAULT '[]',
    projects JSONB NOT NULL DEFAULT '[]',
    downloads_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS template_library_category_idx ON public.template_library(category);
CREATE INDEX IF NOT EXISTS template_library_template_type_idx ON public.template_library(template_type);

-- Enable Row Level Security
ALTER TABLE public.template_library ENABLE ROW LEVEL SECURITY;

-- Everyone can view templates
CREATE POLICY "Anyone can view template library"
    ON public.template_library FOR SELECT
    USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_template_library_updated_at
    BEFORE UPDATE ON public.template_library
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample templates
INSERT INTO public.template_library (name, description, template_type, category, is_premium, personal_info, experience, education, skills, projects) VALUES
(
    'Software Engineer - Tech Giant',
    'Perfect for applying to FAANG companies',
    'modern',
    'tech',
    false,
    '{
        "fullName": "Alex Johnson",
        "email": "alex.johnson@email.com",
        "phone": "+1 (555) 123-4567",
        "location": "San Francisco, CA",
        "linkedin": "linkedin.com/in/alexjohnson",
        "portfolio": "alexjohnson.dev",
        "summary": "Results-driven Software Engineer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture. Proven track record of delivering high-impact features that improved user engagement by 40%."
    }',
    '[
        {
            "id": "1",
            "company": "Tech Corp",
            "position": "Senior Software Engineer",
            "location": "San Francisco, CA",
            "startDate": "2021-06",
            "endDate": "",
            "current": true,
            "description": [
                "Led development of microservices architecture serving 10M+ users, reducing latency by 60%",
                "Mentored team of 5 junior developers, improving code quality and delivery speed by 35%",
                "Implemented CI/CD pipeline using GitHub Actions, reducing deployment time from 2 hours to 15 minutes",
                "Architected real-time notification system using WebSockets and Redis, handling 100K concurrent connections"
            ]
        },
        {
            "id": "2",
            "company": "StartupXYZ",
            "position": "Full Stack Developer",
            "location": "Remote",
            "startDate": "2019-03",
            "endDate": "2021-05",
            "current": false,
            "description": [
                "Built responsive web application using React and Node.js, achieving 98% user satisfaction score",
                "Optimized database queries reducing page load time by 45%",
                "Integrated payment gateway (Stripe) processing $2M+ in transactions",
                "Collaborated with design team to implement pixel-perfect UI components"
            ]
        }
    ]',
    '[
        {
            "id": "1",
            "institution": "University of California, Berkeley",
            "degree": "Bachelor of Science",
            "field": "Computer Science",
            "location": "Berkeley, CA",
            "startDate": "2015-09",
            "endDate": "2019-05",
            "gpa": "3.8/4.0"
        }
    ]',
    '[
        {
            "id": "1",
            "category": "Programming Languages",
            "items": ["JavaScript", "TypeScript", "Python", "Go", "Java"]
        },
        {
            "id": "2",
            "category": "Frontend",
            "items": ["React", "Next.js", "Vue.js", "Tailwind CSS", "Redux"]
        },
        {
            "id": "3",
            "category": "Backend",
            "items": ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis"]
        },
        {
            "id": "4",
            "category": "DevOps & Tools",
            "items": ["AWS", "Docker", "Kubernetes", "Git", "CI/CD"]
        }
    ]',
    '[
        {
            "id": "1",
            "name": "E-commerce Platform",
            "description": "Built full-stack e-commerce platform with payment integration, inventory management, and admin dashboard. Achieved 50K+ monthly active users.",
            "technologies": ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
            "link": "github.com/alexj/ecommerce"
        },
        {
            "id": "2",
            "name": "Real-time Chat Application",
            "description": "Developed scalable chat application with WebSocket support, file sharing, and end-to-end encryption.",
            "technologies": ["React", "Socket.io", "Redis", "MongoDB"],
            "link": "github.com/alexj/chat-app"
        }
    ]'
),
(
    'Marketing Manager - Executive',
    'Professional template for marketing leadership roles',
    'executive',
    'professional',
    true,
    '{
        "fullName": "Sarah Martinez",
        "email": "sarah.martinez@email.com",
        "phone": "+1 (555) 987-6543",
        "location": "New York, NY",
        "linkedin": "linkedin.com/in/sarahmartinez",
        "portfolio": "",
        "summary": "Strategic Marketing Executive with 10+ years driving growth for Fortune 500 companies. Expert in digital marketing, brand strategy, and team leadership. Proven track record of increasing revenue by $50M+ through data-driven campaigns and innovative marketing strategies."
    }',
    '[
        {
            "id": "1",
            "company": "Global Brands Inc.",
            "position": "Director of Marketing",
            "location": "New York, NY",
            "startDate": "2020-01",
            "endDate": "",
            "current": true,
            "description": [
                "Led marketing team of 25 professionals across digital, content, and brand divisions",
                "Increased brand awareness by 150% through integrated marketing campaigns across 15 channels",
                "Managed $10M annual marketing budget, achieving 300% ROI on digital advertising spend",
                "Launched successful product line generating $25M in first-year revenue",
                "Implemented marketing automation platform reducing campaign execution time by 60%"
            ]
        },
        {
            "id": "2",
            "company": "TechStart Solutions",
            "position": "Senior Marketing Manager",
            "location": "San Francisco, CA",
            "startDate": "2016-06",
            "endDate": "2019-12",
            "current": false,
            "description": [
                "Developed and executed go-to-market strategy for 5 product launches",
                "Grew social media following from 10K to 500K+ across all platforms",
                "Increased lead generation by 200% through content marketing and SEO optimization",
                "Managed cross-functional teams including design, content, and analytics"
            ]
        }
    ]',
    '[
        {
            "id": "1",
            "institution": "Columbia Business School",
            "degree": "MBA",
            "field": "Marketing & Strategy",
            "location": "New York, NY",
            "startDate": "2014-09",
            "endDate": "2016-05",
            "gpa": ""
        },
        {
            "id": "2",
            "institution": "University of Texas at Austin",
            "degree": "Bachelor of Business Administration",
            "field": "Marketing",
            "location": "Austin, TX",
            "startDate": "2010-09",
            "endDate": "2014-05",
            "gpa": "3.9/4.0"
        }
    ]',
    '[
        {
            "id": "1",
            "category": "Marketing Strategy",
            "items": ["Brand Development", "Digital Marketing", "Content Strategy", "Market Research", "Campaign Management"]
        },
        {
            "id": "2",
            "category": "Digital Tools",
            "items": ["Google Analytics", "HubSpot", "Salesforce", "Adobe Creative Suite", "SEMrush"]
        },
        {
            "id": "3",
            "category": "Leadership",
            "items": ["Team Management", "Budget Planning", "Stakeholder Communication", "Strategic Planning"]
        }
    ]',
    '[]'
),
(
    'Data Scientist - AI/ML',
    'Ideal for data science and machine learning positions',
    'tech',
    'tech',
    true,
    '{
        "fullName": "Dr. Priya Patel",
        "email": "priya.patel@email.com",
        "phone": "+91 98765 43210",
        "location": "Bangalore, India",
        "linkedin": "linkedin.com/in/priyapatel",
        "portfolio": "priyapatel.ai",
        "summary": "PhD Data Scientist specializing in Machine Learning and AI with 6+ years of experience. Expert in building predictive models, natural language processing, and computer vision. Published 10+ research papers and deployed ML models serving millions of users."
    }',
    '[
        {
            "id": "1",
            "company": "AI Innovations Lab",
            "position": "Lead Data Scientist",
            "location": "Bangalore, India",
            "startDate": "2021-08",
            "endDate": "",
            "current": true,
            "description": [
                "Led team of 8 data scientists building recommendation engine improving user engagement by 45%",
                "Developed NLP model for sentiment analysis with 94% accuracy, processing 1M+ reviews daily",
                "Implemented MLOps pipeline using Kubernetes and MLflow, reducing model deployment time by 70%",
                "Collaborated with product team to define KPIs and measure impact of ML features"
            ]
        },
        {
            "id": "2",
            "company": "Tech Analytics Corp",
            "position": "Data Scientist",
            "location": "Mumbai, India",
            "startDate": "2018-07",
            "endDate": "2021-07",
            "current": false,
            "description": [
                "Built predictive models for customer churn reducing attrition by 30%",
                "Developed computer vision system for quality control achieving 99% accuracy",
                "Created data pipelines processing 10TB+ data daily using Apache Spark",
                "Presented insights to C-level executives influencing strategic decisions"
            ]
        }
    ]',
    '[
        {
            "id": "1",
            "institution": "Indian Institute of Technology, Bombay",
            "degree": "PhD",
            "field": "Computer Science (Machine Learning)",
            "location": "Mumbai, India",
            "startDate": "2014-08",
            "endDate": "2018-06",
            "gpa": ""
        },
        {
            "id": "2",
            "institution": "Indian Institute of Technology, Delhi",
            "degree": "Bachelor of Technology",
            "field": "Computer Science",
            "location": "Delhi, India",
            "startDate": "2010-08",
            "endDate": "2014-05",
            "gpa": "9.2/10.0"
        }
    ]',
    '[
        {
            "id": "1",
            "category": "Machine Learning",
            "items": ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "Deep Learning"]
        },
        {
            "id": "2",
            "category": "Programming",
            "items": ["Python", "R", "SQL", "Scala", "Java"]
        },
        {
            "id": "3",
            "category": "Big Data",
            "items": ["Apache Spark", "Hadoop", "Kafka", "Airflow", "Databricks"]
        },
        {
            "id": "4",
            "category": "Cloud & MLOps",
            "items": ["AWS SageMaker", "Google Cloud AI", "Docker", "Kubernetes", "MLflow"]
        }
    ]',
    '[
        {
            "id": "1",
            "name": "Medical Image Classification",
            "description": "Developed CNN model for detecting diseases from X-ray images with 96% accuracy. Deployed in 5 hospitals.",
            "technologies": ["PyTorch", "OpenCV", "Flask", "Docker"],
            "link": "github.com/priyap/medical-ai"
        }
    ]'
);


-- Create function to increment download count
CREATE OR REPLACE FUNCTION increment_template_downloads(template_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.template_library
    SET downloads_count = downloads_count + 1
    WHERE id = template_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
