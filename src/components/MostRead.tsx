import Link from "next/link";

interface MostRead {
  id: string;
  title: string;
}

const MostRead = async() => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
    const data = await res.json()
const news: MostRead[] = data.data;
    
    return (
      <div className="card bg-base-100 border border-base-300  rounded-xl p-5 md:p-6">
        <h1 className="text-2xl font-bold mb-6">সর্বাধিক পঠিত</h1>

        <div className="space-y-5">
          {news.map((n, index) => (
            <Link
              key={n.id}
              href={`/news/${n.id}`}
              className="flex items-start gap-2"
            >
              <span className="text-xl font-bold text-red-700  ">
                {index + 1}
              </span>

              <div className="font-bold">
                <p>{n.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
};

export default MostRead;