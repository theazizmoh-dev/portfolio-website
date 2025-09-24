import { Link } from 'react-router-dom';
import { ArrowRight, Mail, ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Index = () => {
  const skills = [
    { name: "Web Design & Development", level: 95 },
    { name: "Visual Design & Branding", level: 85 },
    { name: "Video Ad Production", level: 70 },
    { name: "AI Automation", level: 85 },
    { name: "META Ads", level: 85 },
    { name: "Content Creation", level: 90 },
    { name: "Social Media Management", level: 80 },
    { name: "Email Marketing", level: 75 },
    { name: "SEO", level: 80 },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full mb-8 animate-fadeIn">
              <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Available for new projects</span>
            </div>

            {/* Main Heading */}
            <div className="mb-12">
              <h1 className="text-7xl md:text-8xl font-extralight mb-4 tracking-tighter bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent animate-slideUp">
                Abdul Aziz
              </h1>
              <h1 className="text-7xl md:text-8xl font-extralight mb-6 tracking-tighter bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent animate-slideUp" style={{ animationDelay: '0.1s' }}>
                Muhammad
              </h1>
              <div className="flex items-center justify-center space-x-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary"></div>
                <p className="text-xl text-muted-foreground font-light tracking-wider uppercase">
                Technical Marketer
                </p>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary"></div>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="max-w-3xl mx-auto mb-16 animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-3xl md:text-4xl font-light mb-8 leading-relaxed bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent">
                I turn your ecommerce traffic into sales with
                <span className="text-primary font-medium"> high-converting AI-driven </span>
                ad creatives and landing pages.
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
                Stop wasting money on ads that look pretty but don't sell. 
                I create campaigns that connect with real buyers using proven psychology.
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="animate-slideUp" style={{ animationDelay: '0.4s' }}>
              <a 
                href="mailto:theazizmoh@gmail.com" 
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-5 rounded-none font-medium text-lg hover:bg-primary/90 transition-all duration-500 group relative overflow-hidden shadow-2xl shadow-primary/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Mail size={20} className="mr-3 relative z-10" />
                <span className="relative z-10">Start Converting Better</span>
                <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              </a>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-32 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h3 className="text-4xl font-light mb-4 tracking-tight">Expertise</h3>
              <div className="w-24 h-px bg-primary mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {skills.map((skill, index) => (
                <div key={skill.name} className="group animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative p-8 border border-border/30 hover:border-primary/30 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/5">
                    {/* Skill Progress Circle */}
                    <div className="relative w-20 h-20 mx-auto mb-6">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          className="text-muted/20"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 45}`}
                          strokeDashoffset={`${2 * Math.PI * 45 * (1 - skill.level / 100)}`}
                          className="text-primary transition-all duration-1000 ease-out"
                          style={{ transitionDelay: `${index * 0.1}s` }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-mono text-primary">{skill.level}%</span>
                      </div>
                    </div>
                    
                    <h4 className="text-center font-medium mb-2 group-hover:text-primary transition-colors">
                      {skill.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connect & Services Section */}
        <section className="py-32 px-8 bg-muted/20">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Connect */}
              <div>
                <h3 className="text-3xl font-light mb-8 tracking-tight">Connect</h3>
                <div className="space-y-2">
                  <a
                    href="https://www.linkedin.com/in/theazizmoh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-6 border-b border-border/30 hover:border-primary/50 transition-all duration-300 group hover:bg-primary/5"
                  >
                    <div>
                      <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">LinkedIn</h4>
                      <p className="text-sm text-muted-foreground font-light">Professional insights</p>
                    </div>
                    <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>

                  <a
                    href="https://www.instagram.com/itsazizmo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-6 border-b border-border/30 hover:border-primary/50 transition-all duration-300 group hover:bg-primary/5"
                  >
                    <div>
                      <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">Instagram</h4>
                      <p className="text-sm text-muted-foreground font-light">Behind the scenes</p>
                    </div>
                    <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-3xl font-light mb-8 tracking-tight">What I Offer</h3>
                <div className="space-y-2">
                  <Link
                    to="/services"
                    className="flex items-center justify-between p-6 border-b border-border/30 hover:border-primary/50 transition-all duration-300 group hover:bg-primary/5"
                  >
                    <div>
                      <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">Services</h4>
                      <p className="text-sm text-muted-foreground font-light">Marketing solutions</p>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    to="/projects"
                    className="flex items-center justify-between p-6 border-b border-border/30 hover:border-primary/50 transition-all duration-300 group hover:bg-primary/5"
                  >
                    <div>
                      <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">Projects</h4>
                      <p className="text-sm text-muted-foreground font-light">Case studies</p>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    to="/blog"
                    className="flex items-center justify-between p-6 border-b border-border/30 hover:border-primary/50 transition-all duration-300 group hover:bg-primary/5"
                  >
                    <div>
                      <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">Blog</h4>
                      <p className="text-sm text-muted-foreground font-light">Marketing insights</p>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default Index;