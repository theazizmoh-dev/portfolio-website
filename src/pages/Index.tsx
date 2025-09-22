import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Index = () => {
  const skills = [
    { name: "Web Design & Development", level: 95 },
    { name: "Visual Design & Branding", level: 85 },
    { name: "Video Ad Production", level: 70 },
    { name: "META Ads", level: 85 },
    { name: "Content Creation", level: 90 },
    { name: "Social Media Management", level: 80 },
    { name: "Email Marketing", level: 75 },
    { name: "SEO", level: 80 },
  ];

  return (
    <div className="min-h-screen bg-background">

      
      {/* Main Content */}
      <section className="section-padding pt-32">
        <div className="max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Abdul Aziz Muhammad</h1>
            <p className="text-xl text-muted-foreground mb-6">Digital Marketer</p>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">I turn Your Ecommerce Traffic Into Sales With High-Converting Ad Creatives + Landing Pages Built for Results, stop wasting money on ads that don't work</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
              Most ecommerce brands waste thousands on ads that look pretty but don't actually sell anything. I fix that problem. I create ad creatives and landing pages that actually turn your website visitors into paying customers. I use proven psychology and smart AI tools to build campaigns that connect with real buyers.
              </p>
            </div>
            <a 
              href="mailto:theazizmoh@gmail.com" 
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors mb-8"
            >
              Fix My Ads
              <ArrowRight size={18} className="ml-2" />
            </a>
            
            {/* Skills Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4 mb-12">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-lg">📷</span>
                </div>
                <div>
                  <h3 className="font-semibold">Instagram</h3>
                  <p className="text-sm text-muted-foreground">Visual content and behind the scenes</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-lg">💼</span>
                </div>
                <div>
                  <h3 className="font-semibold">LinkedIn</h3>
                  <p className="text-sm text-muted-foreground">Professional insights and networking</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Services & Projects Links */}
          <div className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold">What I Offer</h2>
            
            <Link
              to="/services"
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-lg">🚀</span>
                </div>
                <div>
                  <h3 className="font-semibold">Services</h3>
                  <p className="text-sm text-muted-foreground">Digital marketing solutions for growth</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/projects"
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-lg">💼</span>
                </div>
                <div>
                  <h3 className="font-semibold">Projects</h3>
                  <p className="text-sm text-muted-foreground">Case studies and portfolio work</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/blog"
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-lg">📝</span>
                </div>
                <div>
                  <h3 className="font-semibold">Blog</h3>
                  <p className="text-sm text-muted-foreground">Marketing insights and strategies</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
