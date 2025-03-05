import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, GridIcon, List, BarChart3, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTools } from "@/context/ToolsContext";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import ToolCard from "@/components/ui-custom/ToolCard";

const categories = [
  { label: "すべてのカテゴリー", value: "" },
  { label: "テキスト", value: "text" },
  { label: "画像", value: "image" },
  { label: "音声", value: "audio" },
  { label: "動画", value: "video" },
  { label: "マルチモーダル", value: "multimodal" },
  { label: "コード", value: "code" },
  { label: "分析", value: "analytics" },
  { label: "その他", value: "other" },
];

type ViewMode = "grid" | "list";
type SortOption = "nameAsc" | "nameDesc" | "dateDesc" | "dateAsc" | "ratingDesc";

const sortOptions = [
  { label: "名前 (A-Z)", value: "nameAsc" },
  { label: "名前 (Z-A)", value: "nameDesc" },
  { label: "新しい順", value: "dateDesc" },
  { label: "古い順", value: "dateAsc" },
  { label: "評価 (高い順)", value: "ratingDesc" },
];

const Index = () => {
  const { tools, filterTools, selectedTools } = useTools();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredTools, setFilteredTools] = useState(tools);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("nameAsc");

  useEffect(() => {
    const filtered = filterTools(searchQuery, selectedCategory);

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        case "dateDesc":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "dateAsc":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "ratingDesc":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    setFilteredTools(sorted);
  }, [tools, searchQuery, selectedCategory, sortBy, filterTools]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="page-transition"
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  AIツールコレクション
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  AIツールを整理、発見、比較する
                </p>
              </div>

              {selectedTools.length > 0 && (
                <Link to="/compare">
                  <Button className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    比較する ({selectedTools.length})
                  </Button>
                </Link>
              )}
            </div>

            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      カテゴリー
                      {selectedCategory && (
                        <Badge variant="secondary" className="ml-1 font-normal">
                          {selectedCategory}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>カテゴリーで絞り込む</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {categories.map((category) => (
                        <DropdownMenuItem
                          key={category.value}
                          onClick={() => handleCategorySelect(category.value)}
                          className={
                            selectedCategory === category.value
                              ? "bg-secondary font-medium"
                              : ""
                          }
                        >
                          {category.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      並び替え
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>並び替え</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {sortOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => setSortBy(option.value as SortOption)}
                          className={
                            sortBy === option.value
                              ? "bg-secondary font-medium"
                              : ""
                          }
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                {(searchQuery || selectedCategory) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    フィルターをクリア
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">
                  {filteredTools.length} ツール
                </div>

                <div className="flex items-center border rounded-md overflow-hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-none px-2.5 ${
                      viewMode === "grid" ? "bg-secondary" : ""
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <GridIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-none px-2.5 ${
                      viewMode === "list" ? "bg-secondary" : ""
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {filteredTools.length === 0 ? (
              <div className="rounded-lg border bg-card p-12 text-center">
                <Search className="mx-auto h-8 w-8 text-muted-foreground" />
                <h2 className="mt-4 text-xl font-semibold">ツールが見つかりません</h2>
                <p className="mt-2 text-muted-foreground">
                  {searchQuery || selectedCategory ? (
                    <>
                      現在のフィルター条件に合うツールはありません。検索条件を調整してみてください。
                    </>
                  ) : (
                    <>
                      まだAIツールコレクションにツールがありません。ツールを追加してみましょう。
                    </>
                  )}
                </p>
                <Button className="mt-6" onClick={clearFilters}>
                  フィルターをリセット
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "flex flex-col gap-4"
                }
              >
                {filteredTools.map((tool, index) => (
                  <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    index={index}
                    className={viewMode === "list" ? "flex-row" : ""}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </Container>
      </main>
    </div>
  );
};

export default Index;
