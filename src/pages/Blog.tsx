import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import BlogCard from '@/components/BlogCard';
import { client, queries, type BlogPost } from '@/lib/sanity';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(queries.allPosts)
      .then(setPosts)
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
            <h1 className="hero-title mb-6">Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Thoughts, insights, and stories about development, design, and technology.
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
                Blog posts will appear here once they're published in Sanity CMS.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;