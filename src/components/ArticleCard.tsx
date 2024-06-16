import type { Article } from "@/types/articles";
import Image from "next/image";
import Link from "next/link";

export default function ArticleCard(article: Article) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:cursor-pointer hover:shadow-xl">
      <Link className="absolute inset-0 z-10" href={`/articles/${article.id}`}>
        <span className="sr-only">View article</span>
      </Link>
      <Image
        alt={article.title}
        className="h-60 w-full object-cover"
        height={300}
        src={article.imageUrl}
        style={{
          aspectRatio: "450/300",
          objectFit: "cover",
        }}
        width={450}
      />
      <div className="bg-white p-4 dark:bg-gray-950">
        <h3 className="text-lg font-semibold md:text-xl">{article.title}</h3>
        <p
          className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400"
          dangerouslySetInnerHTML={{ __html: article.description }}
        ></p>
      </div>
    </div>
  );
}
