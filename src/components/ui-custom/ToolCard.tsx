
import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Tool } from "@/data/mockTools";
import { cn } from "@/lib/utils";
import CategoryPill from "./CategoryPill";

interface ToolCardProps {
  tool: Tool;
  className?: string;
  index?: number;
}

const ToolCard = ({ tool, className, index = 0 }: ToolCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-5",
        "transition-all duration-300 ease-out hover:shadow-md",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold leading-tight tracking-tight">
              {tool.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{tool.developer}</p>
          </div>
          <div className="flex flex-shrink-0 items-center">
            <CategoryPill category={tool.category} size="sm" />
          </div>
        </div>
        
        <p className="line-clamp-3 text-sm text-muted-foreground mb-4 flex-grow">
          {tool.description}
        </p>

        {tool.tags && tool.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="mr-1.5 h-3.5 w-3.5 fill-amber-400 stroke-amber-500" />
            <span>{tool.rating || "N/A"}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Website</span>
            </a>
            <Link
              to={`/tool/${tool.id}`}
              className="text-xs font-medium text-primary hover:underline"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ToolCard;
