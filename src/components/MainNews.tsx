import Image from "next/image";
import React from "react";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  firstPublished: string
}
const MainNews = ({ news }: { news: News []}) => {
  const [firstNews, ...otherNews] = news;

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Featured News */}
      <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
        <figure className="h-64 md:h-80 bg-base-200">
          <Image
            src={firstNews.imageUrl}
            alt={firstNews.imageAlt}
            width={600}
            height={500}
            className="w-full h-full object-cover"
          />
        </figure>

        <div className=" ">
          <p className="text-red-600 text-sm font-medium">
            {firstNews.category}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">{firstNews.title}</h2>

          <p className="text-base-content/70 ">{firstNews.description}</p>

          <p className="text-sm text-base-content/50">
            {new Date(firstNews.firstPublished).toLocaleDateString("bn-BD", {
              dateStyle: "long",
            })}
          </p>
        </div>
      </div>

      {/* Other News */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="divide-y divide-base-300">
          {otherNews.slice(0, 4).map((item) => (
            <div key={item.id} className="p-3">
              <p className="text-red-600 text-sm font-medium mb-2">
                {item.category}
              </p>
              <h3 className="  font-bold ">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainNews;
