import MarqueeText from 'react-marquee-text';
import 'react-marquee-text/dist/styles.css';

interface Headlines {
  id: string;
  title: string;
}

async function getHeadlines(): Promise<Headlines[]> {
  try {
    const res = await fetch('https://news-api-v2.vercel.app/api/news/?limit=20', {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    const headlines = Array.isArray(data?.data) ? data.data : [];

    return headlines.filter((item: Partial<Headlines>) => item?.id && item?.title);
  } catch {
    return [];
  }
}

const Marquee = async () => {
  const headlines = await getHeadlines();

  if (!headlines.length) {
    return null;
  }

  return (
    <div className="bg-red-700 text-white">
      <div className="flex container mx-auto">
        <div className="bg-red-800 py-1 px-5 font-bold">সর্বশেষ</div>
        <MarqueeText className="py-1" direction="right" duration={10}>
          {headlines.map((h) => (
            <span key={h.id}>
              <span>{h.title} </span> <span className="mx-4">•</span>{" "}
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;