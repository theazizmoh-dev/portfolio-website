import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import ProjectCard from '@/components/ProjectCard';
import { client, queries, type Project } from '@/lib/sanity';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(queries.allProjects)
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="section-padding pt-32">
        <div className="container-width">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="hero-title mb-6">Projects</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A collection of my recent work showcasing various technologies and design approaches.
            </p>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card-minimal animate-pulse">
                  <div className="aspect-[16/10] bg-muted rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-muted rounded"></div>
                      <div className="h-6 w-12 bg-muted rounded"></div>
                      <div className="h-6 w-20 bg-muted rounded"></div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <div className="h-8 w-24 bg-muted rounded"></div>
                      <div className="h-8 w-16 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">No Projects Yet</h3>
              <p className="text-muted-foreground">
                Projects will appear here once they're added to Sanity CMS.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Projects;