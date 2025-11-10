import { newsList } from "~/consts/news";

export default function () {
  const article_one = newsList[0];
  const article_two = newsList[1];
  const article_three = newsList[2];
  return (
    <section className="flex flex-col items-center justify-center ">
      <div className="my-13">
        <p className="text-3xl font-extrabold">Breaking News</p>
      </div>
      <div className="flex gap-10 w-100 overflow-x-auto overflow-y-clip pb-6 md:w-full md:justify-center">
        <div
          className="min-w-75 max-w-78 h-150 rounded-2xl p-4 overflow-hidden justify-between flex flex-col"
          style={{
            backgroundImage: `url(${"assets/images/ver_1.svg"})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <div className="">
            <img
              src={article_one.image_url}
              className="rounded-xl max-h-40 mb-2 w-full"
            />
            <p className="text-md font-bold">{article_one.title}</p>
            <p className="text-amber-400 font-serif">{article_one.content}</p>
            <p className="font-thin">{article_one.description}</p>
            <a className="underline mt-2 text-amber-300" href={article_one.source_url}>{article_one.source_url}</a>
          </div>
          <div>
            <img src={article_one.source_icon} className="w-20 h-15" />
          </div>
        </div>

        <div
          className="min-w-75 max-w-78 h-150 rounded-2xl justify-between flex flex-col p-4"
          style={{
            backgroundImage: `url(${"assets/images/ver_1.svg"})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <div className="">
            <img
              src={article_two?.image_url}
              className="rounded-xl  max-h-40 mb-2 w-full"
            />
            <p className="text-md font-bold my-2">{article_two.title}</p>
            <p className="text-amber-400 font-serif">{article_two.content}</p>
            <p className="font-thin">{article_two.description}</p>
             <a className="underline mt-2 text-amber-300" href={article_two.source_url}>{article_two.source_url}</a>
          </div>
          <div>
            <img src={article_two.source_icon} className="w-20 h-15" />
          </div>
        </div>

        <div
          className="min-w-75 h-150 max-w-78 rounded-2xl justify-between md:hidden lg:flex flex flex-col p-4"
          style={{
            backgroundImage: `url(${"assets/images/ver_1.svg"})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <div className="">
            <img
              src={article_three?.image_url}
              className="rounded-xl  max-h-40 mb-2 w-full"
            />
            <p className="text-md font-bold">{article_three.title}</p>
            <p className="text-amber-400 font-serif my-2">
              {article_three.content}
            </p>
            <p className="font-thin">{article_three.description}</p>
             <a className="underline mt-2 text-amber-300" href={article_three.source_url}>{article_three.source_url}</a>
          </div>
          <div>
            <img src={article_three.source_icon} className="w-20 h-15" />
          </div>
        </div>
      </div>
     
    </section>
  );
}
