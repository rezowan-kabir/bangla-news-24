import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ArticleBlock {
  type: "text" | "subheading" | "image";
  text?: string;
  url?: string;
  width?: number;
  height?: number;
  caption?: string;
  altText?: string;
}

interface Article {
  title: string;
  description?: {
    blocks?: {
      model?: {
        blocks?: { model?: { text?: string } }[];
      };
    }[];
  };
  link?: string;
  firstPublished?: string;
  byline?: { name: string; role?: string }[];
  imageUrl?: string;
  body?: ArticleBlock[];
}

interface ArticleResponse {
  success: boolean;
  data: Article;
}

function getDescription(article: Article): string | undefined {
  return article.description?.blocks
    ?.flatMap((block) => block.model?.blocks ?? [])
    .map((block) => block.model?.text)
    .find((text): text is string => Boolean(text));
}

export default async function NewsDetails({
  params,
}: {
  params: Promise<{ newsid: string }>;
}) {
  const { newsid } = await params;
  const response = await fetch(
    `https://news-api-v2.vercel.app/api/article/${encodeURIComponent(newsid)}`,
    { next: { revalidate: 60 } },
  );

  const result: ArticleResponse = await response.json();
  if (!result.success || !result.data?.title) {
    notFound();
  }

  const article = result.data;
  const description = getDescription(article);
  const bodyLeadImage = article.body?.find(
    (block): block is ArticleBlock & { url: string } =>
      block.type === "image" && typeof block.url === "string",
  );
  const leadImage = article.imageUrl
    ? {
        url: article.imageUrl,
        altText: article.title,
        width: 1200,
        height: 675,
        caption: undefined,
      }
    : bodyLeadImage;

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-bold leading-tight md:text-4xl">
            {article.title}
          </h1>

          {description ? (
            <p className="mt-4 text-lg leading-relaxed text-base-content/70">
              {description}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-base-300 pb-4 text-sm text-base-content/60">
            {article.byline?.map((author) => (
              <span key={`${author.name}-${author.role ?? ""}`}>
                {author.name}
                {author.role ? ` · ${author.role}` : ""}
              </span>
            ))}
            {article.firstPublished ? (
              <time dateTime={article.firstPublished}>
                {new Date(article.firstPublished).toLocaleDateString("bn-BD", {
                  dateStyle: "long",
                })}
              </time>
            ) : null}
          </div>
        </header>

        {leadImage ? (
          <figure className="mb-8">
            <Image
              src={leadImage.url}
              alt={leadImage.altText ?? article.title}
              width={leadImage.width ?? 1200}
              height={leadImage.height ?? 675}
              priority
              className="h-auto w-full rounded-lg object-cover"
            />
            {leadImage.caption ? (
              <figcaption className="mt-2 text-sm text-base-content/60">
                {leadImage.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}

        <div className="space-y-6 text-lg leading-8">
          {article.body?.map((block, index) => {
            if (block.type === "text" && block.text) {
              return <p key={index}>{block.text}</p>;
            }

            if (block.type === "subheading" && block.text) {
              return (
                <h2
                  key={index}
                  className="pt-2 text-2xl font-bold leading-tight"
                >
                  {block.text}
                </h2>
              );
            }

            if (
              block.type === "image" &&
              typeof block.url === "string" &&
              block.url !== leadImage?.url
            ) {
              return (
                <figure key={index} className="py-2">
                  <Image
                    src={block.url}
                    alt={block.altText ?? block.caption ?? article.title}
                    width={block.width ?? 1200}
                    height={block.height ?? 675}
                    className="h-auto w-full rounded-lg object-cover"
                  />
                  {block.caption ? (
                    <figcaption className="mt-2 text-sm leading-6 text-base-content/60">
                      {block.caption}
                    </figcaption>
                  ) : null}
                </figure>
              );
            }

            return null;
          })}
        </div>

        {article.link ? (
          <p className="mt-8 border-t border-base-300 pt-4 text-sm text-base-content/60">
            সূত্র:{" "}
            <Link
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              BBC News বাংলা
            </Link>
          </p>
        ) : null}
      </article>
    </main>
  );
}
