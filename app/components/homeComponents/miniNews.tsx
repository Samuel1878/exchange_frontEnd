import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router";
import { newsList } from "~/consts/news";
import { ver_1, ver_2 } from "~/utils";

export default function () {
  const article_one = newsList[0];
  const article_two = newsList[1];
  const article_three = newsList[2];
  return (
    <section className="flex flex-col items-center justify-center ">
      <div className="my-13">
        <p className="text-2xl lg:text-3xl font-extrabold text-gray-50">
          Breaking News
        </p>
      </div>
      <div className="flex gap-10 lg:gap-12  pb-6 md:w-full md:justify-center">
        <div
          className=" min-w-75 max-w-78 h-150 rounded-2xl p-4 overflow-hidden justify-between flex flex-col"
          style={{
            backgroundImage: `url(${ver_1})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <div className="">
            <img
              src={article_one.image_url}
              className="rounded-xl max-h-40 mb-2 w-full"
            />
            <p className="text-md font-bold text-gray-50">
              {article_one.title}
            </p>
            <p className="text-amber-400 font-serif">{article_one.content}</p>
            <p className="font-thin text-gray-400">{article_one.description}</p>
            <a
              className="underline mt-2 text-amber-300"
              href={article_one.source_url}
            >
              {article_one.source_url}
            </a>
          </div>
          <div>
            <img src={article_one.source_icon} className="w-20 h-15" />
          </div>
        </div>

        <div
          className="min-w-75 max-w-78 h-150 rounded-2xl justify-between hidden md:flex flex-col p-4"
          style={{
            backgroundImage: `url(${ver_2})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <div className="">
            <img
              src={article_two?.image_url}
              className="rounded-xl  max-h-40 mb-2 w-full"
            />
            <p className="text-md font-bold my-2 text-gray-50">
              {article_two.title}
            </p>
            <p className="text-amber-400 font-serif">{article_two.content}</p>
            <p className="font-thin text-gray-400">{article_two.description}</p>
            <a
              className="underline mt-2 text-amber-300"
              href={article_two.source_url}
            >
              {article_two.source_url}
            </a>
          </div>
          <div>
            <img src={article_two.source_icon} className="w-20 h-15" />
          </div>
        </div>

        <div
          className="min-w-75 h-150 max-w-78 rounded-2xl justify-between md:hidden lg:flex hidden flex-col p-4"
          style={{
            backgroundImage: `url(${ver_1})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <div className="">
            <img
              src={article_three?.image_url}
              className="rounded-xl  max-h-40 mb-2 w-full"
            />
            <p className="text-md font-bold text-gray-50">
              {article_three.title}
            </p>
            <p className="text-amber-400 font-serif my-2">
              {article_three.content}
            </p>
            <p className="font-thin text-gray-400">
              {article_three.description}
            </p>
            <a
              className="underline mt-2 text-amber-300"
              href={article_three.source_url}
            >
              {article_three.source_url}
            </a>
          </div>
          <div>
            <img src={article_three.source_icon} className="w-20 h-15" />
          </div>
        </div>
      </div>
      <Link
        to={"/trends"}
        className="font-light text-sm text-gray-500 cursor-pointer flex gap-2 items-center"
      >
        Discover more news <FaChevronRight size={12} color="#777" />
      </Link>
    </section>
  );
}
