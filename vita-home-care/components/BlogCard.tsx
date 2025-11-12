import type { FC } from "react";

interface BlogPost {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
  attribution: string;
  photographerUrl: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_12px_40px_-8px_rgba(109,85,217,0.25)] hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={post.image}
          alt={`${post.title} - ${post.attribution}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Category Badge */}
        <div className="absolute left-6 top-6">
          <span className="inline-block rounded-full border-2 border-[#6d55d9] bg-white/95 px-5 py-2 text-sm font-semibold text-[#6d55d9] backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-8">
        {/* Title */}
        <h3 className="mb-4 text-xl font-semibold leading-tight text-[#2c254c] transition-colors group-hover:text-[#6d55d9]">
          {post.title}
        </h3>

        {/* Footer with Date and Read More */}
        <div className="mt-auto flex items-center justify-between border-t border-neutral-200 pt-4">
          <time className="text-sm text-[#9ca3af]">{post.date}</time>
          <a
            href={`/blog/${post.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d55d9] hover:text-[#FFB3A3] transition-all duration-300 group"
            aria-label={`Read more about ${post.title}`}
          >
            Read more
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;