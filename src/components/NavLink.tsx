import Link from 'next/link';
import React from 'react';

interface Navs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean
}

const NavLink = async() => {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories");
    const data = await res.json()
    const navs:Navs[] = data.data
    const filteredNavs = navs.filter(n=> n.scrapable)
    return (
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm font-serif text-gray-800">
        <Link href="/" className="hover:text-red-700 transition-colors">
          হোম
        </Link>
        {filteredNavs.map((n, i) => (
          <Link
            className="hover:text-red-700 transition-colors"
            key={i}
            href={n.slug}
          >
            {n.title}
          </Link>
        ))}
      </div>
    );
};

export default NavLink;