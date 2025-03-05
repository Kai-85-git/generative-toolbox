
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Edit, Trash2, Star, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useTools } from "@/context/ToolsContext";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import CategoryPill from "@/components/ui-custom/CategoryPill";

const ToolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getToolById, deleteTool, toggleToolSelection, selectedTools } = useTools();
  const { toast } = useToast();
  const [tool, setTool] = useState(id ? getToolById(id) : undefined);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isSelected = selectedTools.includes(id || "");

  useEffect(() => {
    if (id) {
      const foundTool = getToolById(id);
      setTool(foundTool);

      if (!foundTool) {
        toast({
          title: "Tool not found",
          description: "The requested tool could not be found.",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [id, getToolById, navigate, toast]);

  const handleDelete = () => {
    if (id) {
      deleteTool(id);
      toast({
        title: "Tool deleted",
        description: "The tool has been successfully deleted.",
      });
      navigate("/");
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (!tool) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container maxWidth="xl">
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
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CategoryPill category={tool.category} />
                    <div className="text-sm text-muted-foreground">
                      Added on {formatDate(tool.createdAt)}
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {tool.name}
                  </h1>
                  
                  <p className="mt-1 text-lg text-muted-foreground">
                    by {tool.developer}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "gap-1.5",
                      isSelected && "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                    onClick={() => toggleToolSelection(tool.id)}
                  >
                    {isSelected ? (
                      "Selected for Comparison"
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5" />
                        Add to Compare
                      </>
                    )}
                  </Button>
                  
                  <Button variant="outline" size="icon" asChild>
                    <Link to={`/tool/${tool.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                  <div className="rounded-lg border bg-card p-6">
                    <h2 className="text-xl font-semibold mb-3">Description</h2>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </div>

                  {tool.tags && tool.tags.length > 0 && (
                    <div className="rounded-lg border bg-card p-6">
                      <h2 className="text-xl font-semibold mb-3">Tags</h2>
                      <div className="flex flex-wrap gap-2">
                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="rounded-lg border bg-card p-6 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Rating</h3>
                      <div className="mt-1 flex items-center">
                        <Star className="mr-1.5 h-5 w-5 fill-amber-400 stroke-amber-500" />
                        <span className="text-lg font-medium">
                          {tool.rating || "N/A"}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Pricing</h3>
                      <p className="mt-1 text-lg font-medium">
                        {tool.pricing || "Not specified"}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">API Access</h3>
                      <p className="mt-1 text-lg font-medium">
                        {tool.apiAccess ? "Available" : "Not available"}
                      </p>
                    </div>

                    <Separator />

                    <div className="pt-2">
                      <Button className="w-full gap-2" asChild>
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Website
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </main>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {tool.name} from your collection.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ToolDetail;
