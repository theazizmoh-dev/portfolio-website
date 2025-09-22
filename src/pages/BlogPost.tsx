import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import { client, queries, type BlogPost } from '@/lib/sanity';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    client
      .fetch(queries.postBySlug, { slug })
      .then(setPost)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => (
        <img
          src={value.asset.url}
          alt={value.alt || ''}
          className="w-full rounded-lg my-8"
        />
      ),
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
      ),
      normal: ({ children }: any) => (
        <p className="mb-4 leading-relaxed">{children}</p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-muted-foreground">
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      strong: ({ children }: any) => (
        <strong className="font-bold">{children}</strong>
      ),
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="section-padding pt-32">
          <div className="container-width max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
              <div className="h-12 bg-muted rounded mb-4"></div>
              <div className="h-6 bg-muted rounded w-1/2 mb-8"></div>
              <div className="aspect-[16/9] bg-muted rounded mb-8"></div>
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-4 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="section-padding pt-32">
          <div className="container-width text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft size={18} className="mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="section-padding pt-32">
        <div className="container-width max-w-4xl">
          {/* Back Button */}
          <Button asChild variant="outline" className="mb-8">
            <Link to="/blog">
              <ArrowLeft size={18} className="mr-2" />
              Back to Blog
            </Link>
          </Button>

          {/* Post Header */}
          <header className="mb-8">
            <h1 className="hero-title mb-6">{post.title}</h1>
            
            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {formatDate(post.publishedAt)}
              </div>
              {post.author && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  {post.author}
                </div>
              )}
            </div>

            {post.mainImage && (
              <div className="aspect-[16/9] overflow-hidden rounded-lg mb-8">
                <img
                  src={post.mainImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </header>

          {/* Post Content */}
          <article className="prose prose-lg max-w-none">
            {post.body && (
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            )}
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogPostPage;