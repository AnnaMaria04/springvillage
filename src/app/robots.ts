import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.springvillage.ru";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "Yandex", allow: "/", disallow: ["/api/"] },
      { userAgent: "YandexImages", allow: "/images/" },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
