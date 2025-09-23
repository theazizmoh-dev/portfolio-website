import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Code, Palette, Globe, Smartphone, Database, Zap, ArrowRight, CheckCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import { client, queries, type Service, urlFor } from '@/lib/sanity';

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(queries.allServices);
        console.log(data)
        // If no services are found in Sanity, use the default services
        setServices(data && data.length > 0 ? data : defaultServices);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback to default services if there's an error
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Default services if none are loaded from Sanity
  const defaultServices: Service[] = [
    {
      _id: '1',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies like React, TypeScript, and Node.js.',
      icon: {
        asset: {
          _ref: 'image-web-development'
        }
      },
      features: [
        'Responsive design',
        'Performance optimization',
        'SEO optimization',
        'Modern frameworks',
        'Custom functionality'
      ],
      order: 1
    },
    {
      _id: '2',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed with user experience at the forefront.',
      icon: {
        asset: {
          _ref: 'image-ui-ux'
        }
      },
      features: [
        'User research',
        'Wireframing & prototyping',
        'Visual design',
        'Usability testing',
        'Design systems'
      ],
      order: 2
    },
    {
      _id: '3',
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications built with React Native for iOS and Android.',
      icon: {
        asset: {
          _ref: 'image-mobile-dev'
        }
      },
      features: [
        'iOS and Android apps',
        'Cross-platform development',
        'Native performance',
        'Offline support',
        'App store deployment'
      ],
      order: 3
    }
  ];

  const displayServices = services.length > 0 ? services.sort((a, b) => (a.order || 0) - (b.order || 0)) : defaultServices;
  const icons = [Code, Palette, Globe, Smartphone, Database, Zap];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background/95">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary absolute top-0 left-0"></div>
          </div>
          <p className="text-muted-foreground animate-pulse">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background/95">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowLeft className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 rounded-full w-12 h-12 p-0 flex items-center justify-center hover:bg-primary/10 transition-all duration-300 hover:scale-110 bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Go back</span>
      </Button>
      
      <main className="section-padding pt-32">
        <div className="container-width">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Professional Services</span>
            </div>
            
            <h1 className="hero-title mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              Services
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {displayServices.map((service, index) => {
              const IconComponent = icons[index % icons.length];

              return (
                <div 
                  key={service._id} 
                  className="group relative overflow-hidden"
                  style={{ 
                    animationDelay: `${index * 200}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Card Container with Multiple Layers */}
                  <div className="relative h-full bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-xl border border-border/30 rounded-3xl p-8 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:-translate-y-3 hover:border-primary/40 group-hover:bg-gradient-to-br group-hover:from-card group-hover:to-primary/5">
                    
                    {/* Animated Background Patterns */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-xl transform -translate-x-12 translate-y-12"></div>
                    </div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                    </div>
                    
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Icon Section with Enhanced Styling */}
                      <div className="relative mb-8">
                        {/* Outer glow ring */}
                        <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"></div>
                        
               
                        
                        {/* Floating particles */}
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-ping"></div>
                        <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-pulse"></div>
                      </div>
                      
                      <div className="flex-1 space-y-6">
                        {/* Title with enhanced styling */}
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-all duration-300 group-hover:translate-x-1">
                            {service.title}
                          </h3>
                          <div className="w-12 h-0.5 bg-gradient-to-r from-primary/60 to-transparent rounded-full group-hover:w-20 transition-all duration-500"></div>
                        </div>

                        {/* Description with better typography */}
                        <p className="text-muted-foreground leading-relaxed text-base group-hover:text-muted-foreground/90 transition-colors duration-300">
                          {service.description}
                        </p>

                        {/* Enhanced Features List */}
                        {service.features && service.features.length > 0 && (
                          <div className="space-y-4 flex-1">
                            <div className="relative">
                              <div className="h-px bg-gradient-to-r from-primary/20 via-border to-transparent"></div>
                              <div className="absolute left-0 top-0 w-8 h-px bg-gradient-to-r from-primary to-primary/50"></div>
                            </div>
                            
                            <ul className="space-y-3">
                              {service.features.map((feature, featureIndex) => (
                                <li 
                                  key={featureIndex} 
                                  className="flex items-start gap-3 text-sm group/item hover:text-foreground transition-all duration-300 hover:translate-x-1"
                                  style={{ animationDelay: `${(index * 200) + (featureIndex * 100)}ms` }}
                                >
                                  <div className="relative">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover/item:scale-125 transition-all duration-300" />
                                    <div className="absolute inset-0 bg-primary/20 rounded-full scale-0 group-hover/item:scale-150 transition-transform duration-300 blur-sm"></div>
                                  </div>
                                  <span className="leading-relaxed font-medium text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      {/* Card Footer with Action Hint */}
                      <div className="mt-8 pt-4 border-t border-border/30 group-hover:border-primary/20 transition-colors duration-500">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground/60 group-hover:text-primary/70 transition-colors duration-300 font-medium">
                            Learn more
                          </span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced outer glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl scale-105"></div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl blur-3xl"></div>
            <div className="relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl p-16 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Ready to Start</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Ready to Get Started?
                </h2>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                  Let's discuss your project and create something amazing together. 
                  Every great journey begins with a single step.
                </p>
                
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
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Services;