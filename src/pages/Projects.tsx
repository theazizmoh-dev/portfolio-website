import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { client, queries, type Project } from '@/lib/sanity';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Code2, FolderOpen, Sparkles, ExternalLink, Github, Filter, Grid3X3, List, Calendar, Tag, Eye, Heart, ArrowUpRight, Globe, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ProjectCategory = 'all' | 'landing' | 'ads' | 'before-after';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const navigate = useNavigate();

  // Filter projects based on active category
  useEffect(() => {
    console.log('Active category changed:', activeCategory);
    console.log('All projects:', projects);
    
    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => {
        const matches = project.category && 
          project.category.toLowerCase() === activeCategory.toLowerCase();
        console.log(`Project ${project.title} (${project.category}):`, matches ? 'MATCHES' : 'does not match', activeCategory);
        return matches;
      });
      console.log('Filtered projects:', filtered);
      setFilteredProjects(filtered);
    }
  }, [activeCategory, projects]);

  useEffect(() => {
    client
      .fetch(queries.allProjects)
      .then((data: Project[]) => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Category tabs
  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'landing', label: 'Landing Pages' },
    { id: 'ads', label: 'Creative Ads' },
    { id: 'before-after', label: 'Before & After' },
  ];

  // ProjectCard component integrated
  const ProjectCard = ({ project, viewMode = 'grid' }: { project: Project; viewMode?: 'grid' | 'list' }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    const handleImageError = () => {
      setImageError(true);
      setImageLoaded(true);
    };

    return (
      <div className={`group relative overflow-hidden ${
        viewMode === 'list' ? 'flex gap-6' : 'flex flex-col'
      }`}>
        {/* Card Container */}
        <div className={`relative h-full bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-xl border border-border/30 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:-translate-y-2 hover:border-primary/40 group-hover:bg-gradient-to-br group-hover:from-card group-hover:to-primary/5 ${
          viewMode === 'list' ? 'flex-1' : 'flex flex-col'
        }`}>
          
          {/* Animated Background Effects */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-xl transform -translate-x-12 translate-y-12"></div>
          </div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
          </div>

          <div className={`relative z-10 h-full ${
            viewMode === 'list' ? 'flex gap-6 p-6' : 'flex flex-col'
          }`}>
            {/* Image Section */}
            <div className={`relative overflow-hidden ${
              viewMode === 'list' 
                ? 'w-64 h-40 shrink-0 rounded-2xl' 
                : 'h-full rounded-t-3xl'
            }`}>
              {/* Image Container with proper aspect ratio */}
              <div className="relative w-full h-full bg-gradient-to-br from-muted/20 to-muted/10">
                {project.image && !imageError ? (
                  <>
                    {/* Loading state */}
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/20 animate-pulse"></div>
                    )}
                    
                    {/* Actual image with proper object-fit */}
                    <img
                      src={typeof project.image === 'string' ? project.image : project.image.asset?.url || ''}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      loading="lazy"
                    />
                    
                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </>
                ) : (
                  /* Fallback for missing/error images */
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <div className="text-center">
                      <Eye className="h-8 w-8 text-primary/40 mx-auto mb-2" />
                      <span className="text-sm text-muted-foreground/60">Preview</span>
                    </div>
                  </div>
                )}

                {/* Floating action buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {project.projectUrl && (
                    <Button
                      size="sm"
                      className="w-8 h-8 p-0 rounded-full bg-background/90 hover:bg-background text-foreground shadow-lg backdrop-blur-sm"
                      asChild
                    >
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  
                  {project.githubUrl && (
                    <Button
                      size="sm"
                      className="w-8 h-8 p-0 rounded-full bg-background/90 hover:bg-background text-foreground shadow-lg backdrop-blur-sm"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>

                {/* Status badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      Featured
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className={`${viewMode === 'list' ? 'flex-1 py-2' : 'p-6 flex-1'}`}>
              <div className="h-full flex flex-col space-y-4">
                {/* Title and Date */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-all duration-300 line-clamp-2">
                      {project.title}
                    </h3>
                    
                    {project.date && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground/70 shrink-0">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(project.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-12 h-0.5 bg-gradient-to-r from-primary/60 to-transparent rounded-full group-hover:w-20 transition-all duration-500"></div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed text-sm flex-1 line-clamp-3 group-hover:text-muted-foreground/90 transition-colors duration-300">
                  {project.description}
                </p>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground/70">
                      <Tag className="h-3 w-3" />
                      <span>Technologies</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, viewMode === 'list' ? 4 : 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium rounded-full border border-primary/20 transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > (viewMode === 'list' ? 4 : 3) && (
                        <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                          +{project.technologies.length - (viewMode === 'list' ? 4 : 3)}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  {project.projectUrl && (
                    <Button
                      size="sm"
                      className="group/btn bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                      asChild
                    >
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <span className="font-medium">View Live</span>
                        <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                      </a>
                    </Button>
                  )}
                  
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        <span className="font-medium">Code</span>
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced outer glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl scale-105 -z-10"></div>
      </div>
    );
  };

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
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <FolderOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Portfolio Showcase</span>
            </div>
            
            <h1 className="hero-title mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              My Projects
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              A collection of my recent work showcasing various technologies, design approaches, 
              and creative solutions to real-world problems.
            </p>
            
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-12"></div>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'bg-card/50 hover:bg-card/80 text-muted-foreground hover:text-foreground border border-border/50'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            {/* View Mode Toggle & Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto mb-12">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Code2 className="h-4 w-4" />
                <span>{loading ? '...' : filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}</span>
              </div>
              
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Projects Display */}
          {loading ? (
            <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'} mb-16`}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div 
                  key={i} 
                  className="group relative bg-card/30 backdrop-blur-sm border border-border/30 rounded-3xl p-6 animate-pulse overflow-hidden"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`${viewMode === 'list' ? 'flex gap-6' : 'space-y-4'}`}>
                    <div className={`bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl ${
                      viewMode === 'list' ? 'w-48 h-32 shrink-0' : 'aspect-[16/10]'
                    }`}></div>
                    
                    <div className="space-y-3 flex-1">
                      <div className="space-y-2">
                        <div className="h-6 bg-gradient-to-r from-muted/60 to-muted/30 rounded-lg"></div>
                        <div className="h-4 bg-gradient-to-r from-muted/40 to-muted/20 rounded w-5/6"></div>
                        <div className="h-4 bg-gradient-to-r from-muted/40 to-muted/20 rounded w-4/6"></div>
                      </div>
                      
                      <div className="flex gap-2">
                        {[1, 2, 3].map((j) => (
                          <div key={j} className={`h-6 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full ${
                            j === 1 ? 'w-16' : j === 2 ? 'w-12' : 'w-20'
                          }`}></div>
                        ))}
                      </div>
                      
                      <div className="flex gap-3 pt-2">
                        <div className="h-10 w-28 bg-gradient-to-r from-primary/30 to-primary/20 rounded-xl"></div>
                        <div className="h-10 w-20 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'} mb-16`}>
              {filteredProjects.map((project, index) => (
                <div 
                  key={project._id}
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <ProjectCard project={project} viewMode={viewMode} />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative mb-16">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl blur-3xl"></div>
              <div className="relative bg-card/20 backdrop-blur-sm border border-border/30 rounded-3xl p-16 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FolderOpen className="h-10 w-10 text-primary/60" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    No Projects Found
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {activeCategory === 'all' 
                      ? "There are no projects to display at the moment."
                      : `There are no projects in the ${categories.find(c => c.id === activeCategory)?.label} category.`}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/60">
                    <Sparkles className="h-4 w-4" />
                    <span>Check back soon!</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
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
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;