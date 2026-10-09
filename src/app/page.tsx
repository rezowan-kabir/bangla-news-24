import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee"

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections")
  const data = await res.json()
  const sections = data.data
  const mainNews = sections[0].articles;
  return (
    <div>
      <Marquee/>
      <div className="container mx-auto grid grid-cols-3 ">
        {/* news section */}
        <div className="col-span-2 ">
          <MainNews news ={mainNews}/>
        </div>

        {/* most read section */}
        <div className="col-span-1 ">

        </div>
      </div>
    </div>
  );
}
