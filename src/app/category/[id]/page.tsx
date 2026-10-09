import NewsCard from '@/components/NewsCard';

interface CategoryNewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  firstPublished: string;
}

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await fetch(`https://news-api-v2.vercel.app/api/category/${id}`);
  const data: { title: string; data: CategoryNewsItem[] } = await res.json();

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 border-b-2 border-red-700 pb-2 text-2xl font-bold">
        {data.title}
      </h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.data.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </main>
  );
};

export default CategoryNews;
