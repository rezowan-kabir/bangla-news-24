import Link from 'next/link';

interface Navs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

async function getNavs(): Promise<Navs[]> {
  try {
    const res = await fetch('https://news-api-v2.vercel.app/api/categories', {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    const navs = Array.isArray(data?.data) ? data.data : [];

    return navs.filter((n: Partial<Navs>) => Boolean(n.scrapable));
  } catch {
    return [];
  }
}

const NavLink = async () => {
  const filteredNavs = await getNavs();

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm font-serif text-gray-800">
      <Link href="/" className="hover:text-red-700 transition-colors">
        হোম
      </Link>
      {filteredNavs.map((n, i) => (
        <Link
          className="hover:text-red-700 transition-colors"
          key={`${n.slug}-${i}`}
          href={`/category/${n.slug}`}
        >
          {n.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLink;