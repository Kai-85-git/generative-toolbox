
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
import { useTools } from "@/context/ToolsContext";

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

const AddToolForm = () => {
  const { addTool } = useTools();
  const { toast } = useToast();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      developer: "",
      category: "",
      pricing: "",
      apiAccess: false,
    },
  });

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
    // Fix: Ensure all required properties for the Tool type are present and non-optional
    const newTool = {
      ...data,
      id: Date.now().toString(),
      tags,
      rating: 0,
      createdAt: new Date().toISOString(),
      // Ensure all required properties are defined
      name: data.name,
      description: data.description,
      url: data.url,
      developer: data.developer,
      category: data.category as "text" | "image" | "audio" | "video" | "multimodal" | "code" | "analytics" | "other",
      pricing: data.pricing || "",
      apiAccess: data.apiAccess || false,
    };

    addTool(newTool);

    toast({
      title: "ツールが追加されました",
      description: `${data.name}がコレクションに追加されました。`,
    });

    form.reset();
    setTags([]);
  };

  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold mb-6">新しいAIツールを追加</h2>

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

          <div className="pt-2 flex justify-end">
            <Button type="submit">ツールを追加</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddToolForm;
