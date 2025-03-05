
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar = ({ onSearch, className, ...props }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div
      className={cn(
        "relative flex items-center transition-all",
        isFocused && "ring-1 ring-primary/20",
        className
      )}
    >
      <Search
        className={cn(
          "absolute left-3 h-4 w-4 transition-colors",
          isFocused || query ? "text-primary" : "text-muted-foreground"
        )}
      />
      <Input
        type="text"
        placeholder="Search AI tools..."
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "pl-9 pr-9 py-2 h-9 transition-all",
          "bg-secondary/50 hover:bg-secondary focus:bg-background",
          "border-0 focus-visible:ring-1 focus-visible:ring-primary/20",
          "w-full rounded-full text-sm"
        )}
        {...props}
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 rounded-full p-0.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
