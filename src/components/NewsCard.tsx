import Image from "next/image";
import Link from "next/link";
import React from "react";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  firstPublished: string;
}
const NewsCard = ({ news }:{news:News}) => {

  return (
    <Link href={`/news/${news.id}`} >
      <div>
        <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden rounded-xl h-full">
          <figure className=" bg-base-200 overflow-hidden">
            <Image
              src={news.imageUrl}
              alt={news.imageAlt}
              width={600}
              height={500}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="p-5 flex flex-col gap-2">
            <p className="text-red-600 text-sm font-medium">{news.category}</p>

            <h2 className="text-xl font-bold leading-snug line-clamp-3">
              {news.title}
            </h2>

            <p className="text-base-content/70 text-base leading-relaxed line-clamp-2">
              {news.description}
            </p>

            <p className="text-sm text-base-content/50 mt-1">
              {new Date(news.firstPublished).toLocaleDateString("bn-BD", {
                dateStyle: "long",
              })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
