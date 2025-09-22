import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { BlogPost } from '@/lib/sanity';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="card-minimal group">
      {post.mainImage && (
        <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4">
          <img
            src={post.mainImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(post.publishedAt)}
          </div>
          {post.author && (
            <div className="flex items-center gap-1">
              <User size={14} />
              {post.author}
            </div>
          )}
        </div>

        <Link 
          to={`/blog/${post.slug.current}`}
          className="block group-hover:text-primary transition-colors"
        >
          <h3 className="text-xl font-bold mb-2 leading-tight">
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>

        <Link
          to={`/blog/${post.slug.current}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-4"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;