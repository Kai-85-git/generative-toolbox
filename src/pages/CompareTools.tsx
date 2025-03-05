
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTools } from "@/context/ToolsContext";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import ComparisonTable from "@/components/ui-custom/ComparisonTable";

const CompareTools = () => {
  const navigate = useNavigate();
  const { getSelectedTools, clearSelectedTools, toggleToolSelection } = useTools();
  const { toast } = useToast();
  const selectedTools = getSelectedTools();

  const handleRemoveTool = (id: string) => {
    toggleToolSelection(id);
    toast({
      title: "Tool removed from comparison",
      description: "The tool has been removed from the comparison view.",
    });
  };

  const handleClearAll = () => {
    clearSelectedTools();
    toast({
      title: "Comparison cleared",
      description: "All tools have been removed from the comparison view.",
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container maxWidth="2xl">
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="page-transition"
            >
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Compare Tools
                  </h1>
                  <p className="mt-2 text-lg text-muted-foreground">
                    Compare the features and capabilities of different AI tools.
                  </p>
                </div>

                {selectedTools.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearAll}
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {selectedTools.length === 0 ? (
                <div className="rounded-lg border bg-card p-12 text-center">
                  <h2 className="text-xl font-semibold mb-3">No tools selected for comparison</h2>
                  <p className="text-muted-foreground mb-6">
                    Select tools to compare by clicking "Add to Compare" on the tool details page.
                  </p>
                  <Button onClick={() => navigate("/")}>Browse Tools</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedTools.map((tool) => (
                      <div
                        key={tool.id}
                        className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium"
                      >
                        {tool.name}
                        <button
                          onClick={() => handleRemoveTool(tool.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border bg-card p-6">
                    <ComparisonTable tools={selectedTools} />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default CompareTools;
