
import React from "react";
import { cn } from "@/lib/utils";

type CategoryType = 
  | "text" 
  | "image" 
  | "audio" 
  | "video" 
  | "multimodal" 
  | "code" 
  | "analytics" 
  | "other";

interface CategoryPillProps {
  category: CategoryType;
  className?: string;
  size?: "sm" | "md";
}

const categoryStyles: Record<CategoryType, string> = {
  text: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  image: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
  audio: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  video: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  multimodal: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  code: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
  analytics: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
};

const CategoryPill = ({ category, className, size = "md" }: CategoryPillProps) => {
  return (
    <span
      className={cn(
        "inline-block rounded-full font-medium transition-all",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs",
        categoryStyles[category],
        className
      )}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
};

export default CategoryPill;
