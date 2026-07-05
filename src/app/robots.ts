import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "Yandex", allow: "/", disallow: ["/api/"] },
      { userAgent: "YandexImages", allow: "/images/" },
    ],
    sitemap: "https://www.springvillage.ru/sitemap.xml",
    host: "https://www.springvillage.ru",
  };
}
