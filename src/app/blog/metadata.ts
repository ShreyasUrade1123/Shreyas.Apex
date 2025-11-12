import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Dive into Shreyas's thoughts, ideas, and stories on technology, design, and creativity.",
  openGraph: {
    title: "Blog",
    description: "Dive into Shreyas's thoughts, ideas, and stories on technology, design, and creativity.",
    url: "https://shreyas-apex.vercel.app/blog",
    images: [
      {
        url: "https://shreyas-apex.vercel.app/og/home?title=blog",
      },
    ],
  },
  twitter: {
    title: "Blog",
    description: "Dive into Shreyas's thoughts, ideas, and stories on technology, design, and creativity.",
    card: "summary_large_image",
    creator: "@shreyasurade",
    images: ["https://shreyas-apex.vercel.app/og/home?title=blog"],
  },
};
