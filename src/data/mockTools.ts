
export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  developer: string;
  category: "text" | "image" | "audio" | "video" | "multimodal" | "code" | "analytics" | "other";
  tags?: string[];
  rating?: number;
  pricing?: string;
  apiAccess?: boolean;
  createdAt: string;
}

export const mockTools: Tool[] = [
  {
    id: "1",
    name: "ChatGPT",
    description: "AI-powered chatbot developed by OpenAI, capable of generating human-like text based on context and past conversations.",
    url: "https://chat.openai.com",
    developer: "OpenAI",
    category: "text",
    tags: ["chatbot", "language model", "GPT-4"],
    rating: 4.9,
    pricing: "Free / $20 per month",
    apiAccess: true,
    createdAt: "2022-11-30T12:00:00Z",
  },
  {
    id: "2",
    name: "DALL-E 3",
    description: "AI system that creates realistic images and art from natural language descriptions.",
    url: "https://openai.com/dall-e-3",
    developer: "OpenAI",
    category: "image",
    tags: ["image generation", "art", "creative"],
    rating: 4.7,
    pricing: "Paid with credits",
    apiAccess: true,
    createdAt: "2023-03-15T09:30:00Z",
  },
  {
    id: "3",
    name: "Midjourney",
    description: "AI art generator that creates images from textual descriptions using a proprietary diffusion model.",
    url: "https://www.midjourney.com",
    developer: "Midjourney, Inc.",
    category: "image",
    tags: ["image generation", "art", "discord"],
    rating: 4.8,
    pricing: "$10-$60 per month",
    apiAccess: false,
    createdAt: "2022-07-12T15:45:00Z",
  },
  {
    id: "4",
    name: "Synthesia",
    description: "AI video generation platform that can create videos with virtual presenters speaking your script in different languages.",
    url: "https://www.synthesia.io",
    developer: "Synthesia",
    category: "video",
    tags: ["video generation", "virtual presenters", "business"],
    rating: 4.5,
    pricing: "$30+ per month",
    apiAccess: true,
    createdAt: "2022-02-10T11:20:00Z",
  },
  {
    id: "5",
    name: "GitHub Copilot",
    description: "AI pair programmer that suggests code completions based on context in your editor.",
    url: "https://github.com/features/copilot",
    developer: "GitHub (Microsoft)",
    category: "code",
    tags: ["coding", "development", "autocomplete"],
    rating: 4.6,
    pricing: "$10 per month",
    apiAccess: false,
    createdAt: "2022-06-21T08:15:00Z",
  },
  {
    id: "6",
    name: "Claude",
    description: "A family of AI assistants created by Anthropic that are designed to be helpful, harmless, and honest.",
    url: "https://www.anthropic.com/claude",
    developer: "Anthropic",
    category: "text",
    tags: ["chatbot", "language model", "assistant"],
    rating: 4.7,
    pricing: "Free / $20+ per month",
    apiAccess: true,
    createdAt: "2023-03-14T10:00:00Z",
  },
  {
    id: "7",
    name: "ElevenLabs",
    description: "AI voice technology for creating realistic speech synthesis with emotional and tonal control.",
    url: "https://elevenlabs.io",
    developer: "ElevenLabs",
    category: "audio",
    tags: ["text-to-speech", "voice", "narration"],
    rating: 4.6,
    pricing: "Free tier / $5-$330 per month",
    apiAccess: true,
    createdAt: "2023-01-23T14:30:00Z",
  },
  {
    id: "8",
    name: "Runway Gen-2",
    description: "Video generation model that can create new videos from text, images, or other videos.",
    url: "https://runwayml.com",
    developer: "Runway",
    category: "video",
    tags: ["video generation", "AI video", "creative"],
    rating: 4.5,
    pricing: "$15-$95 per month",
    apiAccess: true,
    createdAt: "2023-05-10T16:45:00Z",
  }
];
