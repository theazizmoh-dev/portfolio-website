import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Palette, Globe, Smartphone, Database, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import ServiceCard from '@/components/ServiceCard';
import { client, queries, type Service } from '@/lib/sanity';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(queries.allServices)
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Default services if none are loaded from Sanity
  const defaultServices = [
    {
      _id: '1',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies like React, TypeScript, and Node.js.',
      icon: '',
      features: [
        'Responsive design',
        'Performance optimization',
        'SEO optimization',
        'Modern frameworks',
        'Custom functionality'
      ]
    },
    {
      _id: '2',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed with user experience at the forefront.',
      icon: '',
      features: [
        'User research',
        'Wireframing & prototyping',
        'Visual design',
        'Usability testing',
        'Design systems'
      ]
    },
    {
      _id: '3',
      title: 'E-commerce Solutions',
      description: 'Complete online stores with payment processing, inventory management, and analytics.',
      icon: '',
      features: [
        'Custom shopping carts',
        'Payment integration',
        'Inventory management',
        'Order tracking',
        'Analytics dashboard'
      ]
    },
    {
      _id: '4',
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications that work seamlessly on iOS and Android.',
      icon: '',
      features: [
        'React Native development',
        'Cross-platform compatibility',
        'Native performance',
        'App store deployment',
        'Push notifications'
      ]
    },
    {
      _id: '5',
      title: 'API Development',
      description: 'Robust backend APIs and microservices for scalable applications.',
      icon: '',
      features: [
        'RESTful APIs',
        'GraphQL endpoints',
        'Database design',
        'Authentication systems',
        'Performance optimization'
      ]
    },
    {
      _id: '6',
      title: 'Performance Optimization',
      description: 'Speed up your existing applications and improve user experience.',
      icon: '',
      features: [
        'Performance audits',
        'Code optimization',
        'Bundle size reduction',
        'Lazy loading',
        'CDN configuration'
      ]
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;
  const icons = [Code, Palette, Globe, Smartphone, Database, Zap];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="section-padding pt-32">
        <div className="container-width">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="hero-title mb-6">Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Comprehensive digital solutions tailored to bring your ideas to life with modern technology and thoughtful design.
            </p>
          </div>

          {/* Services Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card-minimal animate-pulse">
                  <div className="w-12 h-12 bg-muted rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                    </div>
                    <div className="space-y-2">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="h-4 bg-muted rounded w-3/4"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {displayServices.map((service, index) => {
                const IconComponent = icons[index % icons.length];
                const serviceWithIcon = {
                  ...service,
                  icon: service.icon || ''
                };

                return (
                  <div key={service._id} className="card-minimal">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="text-primary-foreground" size={24} />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold leading-tight">
                        {service.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>

                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2 text-sm">
                              <div className="w-1 h-1 bg-primary rounded-full shrink-0 mt-2"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center py-16 border-t border-border">
            <h2 className="section-title">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Let's discuss your project and create something amazing together.
            </p>
            <Button asChild size="lg" className="font-medium">
              <Link to="/blog">
                View My Work
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;