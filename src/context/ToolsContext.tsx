
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { mockTools, Tool } from "@/data/mockTools";

interface ToolsContextType {
  tools: Tool[];
  addTool: (tool: Tool) => void;
  updateTool: (id: string, updatedTool: Partial<Tool>) => void;
  deleteTool: (id: string) => void;
  getToolById: (id: string) => Tool | undefined;
  filterTools: (query: string, category?: string) => Tool[];
  selectedTools: string[];
  toggleToolSelection: (id: string) => void;
  clearSelectedTools: () => void;
  getSelectedTools: () => Tool[];
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export const useTools = () => {
  const context = useContext(ToolsContext);
  if (!context) {
    throw new Error("useTools must be used within a ToolsProvider");
  }
  return context;
};

export const ToolsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tools, setTools] = useState<Tool[]>(() => {
    const savedTools = localStorage.getItem("ai-tools");
    return savedTools ? JSON.parse(savedTools) : mockTools;
  });
  
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("ai-tools", JSON.stringify(tools));
  }, [tools]);

  const addTool = (tool: Tool) => {
    setTools([...tools, tool]);
  };

  const updateTool = (id: string, updatedTool: Partial<Tool>) => {
    setTools(
      tools.map((tool) => (tool.id === id ? { ...tool, ...updatedTool } : tool))
    );
  };

  const deleteTool = (id: string) => {
    setTools(tools.filter((tool) => tool.id !== id));
    // Also remove from selection if it's there
    if (selectedTools.includes(id)) {
      setSelectedTools(selectedTools.filter((toolId) => toolId !== id));
    }
  };

  const getToolById = (id: string) => {
    return tools.find((tool) => tool.id === id);
  };

  const filterTools = (query: string, category?: string) => {
    return tools.filter((tool) => {
      const matchesQuery =
        !query ||
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase()) ||
        tool.developer.toLowerCase().includes(query.toLowerCase()) ||
        (tool.tags &&
          tool.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          ));

      const matchesCategory = !category || tool.category === category;

      return matchesQuery && matchesCategory;
    });
  };

  const toggleToolSelection = (id: string) => {
    setSelectedTools((prev) =>
      prev.includes(id)
        ? prev.filter((toolId) => toolId !== id)
        : [...prev, id]
    );
  };

  const clearSelectedTools = () => {
    setSelectedTools([]);
  };

  const getSelectedTools = () => {
    return tools.filter((tool) => selectedTools.includes(tool.id));
  };

  const value = {
    tools,
    addTool,
    updateTool,
    deleteTool,
    getToolById,
    filterTools,
    selectedTools,
    toggleToolSelection,
    clearSelectedTools,
    getSelectedTools,
  };

  return <ToolsContext.Provider value={value}>{children}</ToolsContext.Provider>;
};
