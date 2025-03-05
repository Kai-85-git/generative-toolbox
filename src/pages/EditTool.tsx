
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import { useTools } from "@/context/ToolsContext";
import { Tool } from "@/data/mockTools";

const categories = [
  { label: "テキスト", value: "text" },
  { label: "画像", value: "image" },
  { label: "音声", value: "audio" },
  { label: "動画", value: "video" },
  { label: "マルチモーダル", value: "multimodal" },
  { label: "コード", value: "code" },
  { label: "分析", value: "analytics" },
  { label: "その他", value: "other" },
];

const formSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  description: z.string().min(1, "説明は必須です"),
  url: z.string().url("有効なURLを入力してください"),
  developer: z.string().min(1, "開発者は必須です"),
  category: z.string().min(1, "カテゴリーは必須です"),
  pricing: z.string().optional(),
  apiAccess: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const EditTool = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getToolById, updateTool } = useTools();
  const { toast } = useToast();
  const [tool, setTool] = useState<Tool | undefined>(
    id ? getToolById(id) : undefined
  );
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Initialize the form with existing tool data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tool?.name || "",
      description: tool?.description || "",
      url: tool?.url || "",
      developer: tool?.developer || "",
      category: tool?.category || "",
      pricing: tool?.pricing || "",
      apiAccess: tool?.apiAccess || false,
    },
  });

  // Update form values and tags when tool is loaded
  useEffect(() => {
    if (id) {
      const foundTool = getToolById(id);
      setTool(foundTool);

      if (foundTool) {
        form.reset({
          name: foundTool.name,
          description: foundTool.description,
          url: foundTool.url,
          developer: foundTool.developer,
          category: foundTool.category,
          pricing: foundTool.pricing || "",
          apiAccess: foundTool.apiAccess || false,
        });

        setTags(foundTool.tags || []);
      } else {
        toast({
          title: "ツールが見つかりません",
          description: "リクエストされたツールが見つかりませんでした。",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [id, getToolById, navigate, toast, form]);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit = (data: FormValues) => {
    if (!id || !tool) return;

    // Create updated tool object
    const updatedTool = {
      ...data,
      id: tool.id,
      tags,
      rating: tool.rating,
      createdAt: tool.createdAt,
      category: data.category as "text" | "image" | "audio" | "video" | "multimodal" | "code" | "analytics" | "other",
    };

    updateTool(id, updatedTool);

    toast({
      title: "ツールが更新されました",
      description: `${data.name}が正常に更新されました。`,
    });

    navigate(`/tool/${id}`);
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
              戻る
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="page-transition"
            >
              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">
                  {tool.name}を編集
                </h1>
                <p className="mt-1 text-muted-foreground">
                  ツールの詳細情報を更新します
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ツール名</FormLabel>
                            <FormControl>
                              <Input placeholder="ツール名を入力" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="developer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>開発者</FormLabel>
                            <FormControl>
                              <Input placeholder="開発者または会社名" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>説明</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="ツールの簡単な説明"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ウェブサイトURL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>カテゴリー</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="カテゴリーを選択" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem
                                    key={category.value}
                                    value={category.value}
                                  >
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="pricing"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>料金プラン</FormLabel>
                            <FormControl>
                              <Input placeholder="無料 / $10-$50 など" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="apiAccess"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>APIアクセス</FormLabel>
                              <p className="text-xs text-muted-foreground">
                                このツールはAPIアクセスを提供していますか？
                              </p>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <FormLabel>タグ</FormLabel>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {tags.map((tag) => (
                          <div
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs font-medium"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          placeholder="タグを追加"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag();
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={addTag}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => navigate(`/tool/${id}`)}
                      >
                        キャンセル
                      </Button>
                      <Button type="submit">保存</Button>
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default EditTool;
