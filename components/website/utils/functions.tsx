import { fetchSeo } from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { TPages } from "@/utils/data_types";
import { createClient } from "@/utils/supabase/supabase_ client";
import { Provider } from "@supabase/supabase-js";
import { Metadata, ResolvingMetadata } from "next";

export async function pageMetadata(page: TPages): Promise<Metadata> {
  try {
    const seo = await fetchSeo(page);
    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,

      openGraph: {
        title: seo.ogTitle,
        description: seo.ogDescription,

        images: [
          {
            url: imageUrl(seo.ogImage),
            width: 1200,
            height: 630,
            alt: seo.ogTitle,
          },
        ],
      },
    };
  } catch {
    return defaultMetadata();
  }
}

export function defaultMetadata(): Metadata {
  return {
    title: "Qwani",
    description:
      "Qwani champions the artistry of young writers, curating a rich tapestry of narratives that resonate with the soul and spark imagination.",
    keywords: "Qwani, young writers, events, writing, literature",
    openGraph: {
      title: "Qwani",
      description:
        "Qwani champions the artistry of young writers, curating a rich tapestry of narratives that resonate with the soul and spark imagination.",
    },
  };
}

export function formatSanityText(text: string, style: string) {
  return text.split("|").map((item, index) => {
    if (index % 2 === 0) {
      return item;
    } else {
      return (
        <span className={style} key={index}>
          {" "}
          {item}
        </span>
      );
    }
  });
}
export const formatSanityDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export async function socialAuth(provider: Provider) {
  const url = `${window.location.origin}/auth/callback?next=${window.location.pathname}`;
  await createClient()
    .auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: url,
      },
    })
    .then((res) => {
      console.log({ res });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
}
