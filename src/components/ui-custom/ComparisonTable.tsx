
import React from "react";
import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Tool } from "@/data/mockTools";
import CategoryPill from "./CategoryPill";

interface ComparisonTableProps {
  tools: Tool[];
  className?: string;
}

const ComparisonTable = ({ tools, className }: ComparisonTableProps) => {
  if (!tools.length) return null;

  return (
    <div className={cn("overflow-auto", className)}>
      <Table className="min-w-full border-collapse">
        <TableHeader>
          <TableRow className="border-b">
            <TableHead className="w-[200px] py-3 text-left">Features</TableHead>
            {tools.map((tool) => (
              <TableHead key={tool.id} className="p-3 text-center min-w-[200px]">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="font-medium">{tool.name}</span>
                  <CategoryPill category={tool.category} size="sm" />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium py-3">Developer</TableCell>
            {tools.map((tool) => (
              <TableCell key={tool.id} className="p-3 text-center">
                {tool.developer}
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium py-3">Rating</TableCell>
            {tools.map((tool) => (
              <TableCell key={tool.id} className="p-3 text-center">
                <div className="flex items-center justify-center">
                  <span>{tool.rating || "N/A"}</span>
                </div>
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium py-3">Tags</TableCell>
            {tools.map((tool) => (
              <TableCell key={tool.id} className="p-3 text-center">
                <div className="flex flex-wrap justify-center gap-1">
                  {tool.tags && tool.tags.length > 0 ? (
                    tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">No tags</span>
                  )}
                </div>
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium py-3">API Access</TableCell>
            {tools.map((tool) => (
              <TableCell key={tool.id} className="p-3 text-center">
                {tool.apiAccess ? (
                  <Check className="h-5 w-5 mx-auto text-green-500" />
                ) : (
                  <X className="h-5 w-5 mx-auto text-muted-foreground" />
                )}
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium py-3">Pricing</TableCell>
            {tools.map((tool) => (
              <TableCell key={tool.id} className="p-3 text-center">
                {tool.pricing || "Not specified"}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparisonTable;
