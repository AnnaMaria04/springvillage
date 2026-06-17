import type { MetadataRoute } from "next";

const BASE_URL = "https://springvillage.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/dom", priority: 0.9, freq: "monthly" },
    { path: "/tseny", priority: 0.9, freq: "weekly" },
    { path: "/aktivnosti", priority: 0.8, freq: "monthly" },
    { path: "/galereya", priority: 0.7, freq: "monthly" },
    { path: "/doroga", priority: 0.7, freq: "yearly" },
    { path: "/faq", priority: 0.6, freq: "yearly" },
    { path: "/kontakty", priority: 0.6, freq: "yearly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
    { path: "/rules", priority: 0.3, freq: "yearly" },
  ];
  return pages.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));
}
