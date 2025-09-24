import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import BlogCard from '@/components/BlogCard';
import { client, queries, type BlogPost } from '@/lib/sanity';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

  useEffect(() => {
    client
      .fetch(queries.allPosts)
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
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
          <div className="text-center mb-16">
            <h1 className="hero-title mb-6">Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Thoughts, insights, and stories about Marketing, and AI.
            </p>
          </div>

          {/* Blog Posts */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card-minimal animate-pulse">
                  <div className="aspect-[16/9] bg-muted rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">No Posts Yet</h3>
              <p className="text-muted-foreground">
                Posts coming soon.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;