import FooterSection from "~/components/footer";
import { useState, useEffect } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import BlogImage from "assets/images/smart-arbirage-2.svg";
interface NewsArticle {
  article_id: string;
  title: string;
  description: string;
  link: string;
  image_url: string | null;
  pubDate: string;
  source_id: string;
  creator: string[] | null;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  results: NewsArticle[];
  nextPage?: string;
}

// Use clientLoader for SPA mode
export async function clientLoader() {
  try {
    const res = await fetch(
      `https://newsdata.io/api/1/crypto?apikey=pub_97db49d8bc3248e493103e8ba5d67fac&q=Crypto`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status}`);
    }

    const data: NewsApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching crypto news:", error);
    return {
      status: "error",
      totalResults: 0,
      results: [],
      message: "Failed to load cryptocurrency news",
    } as NewsApiResponse;
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function EarnIndex({
  loaderData,
}: {
  loaderData: NewsApiResponse;
}) {
  const [articles, setArticles] = useState<NewsArticle[]>(
    loaderData.results || []
  );
  const [nextPage, setNextPage] = useState(loaderData.nextPage);
  const [loading, setLoading] = useState(false);
  const [imageLoadingStates, setImageLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [initialLoading, setInitialLoading] = useState(true);

  // Load more articles function
  const loadMoreArticles = async () => {
    if (!nextPage || loading) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://newsdata.io/api/1/crypto?apikey=pub_97db49d8bc3248e493103e8ba5d67fac&q=Crypto&page=${nextPage}`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch more news: ${res.status}`);
      }

      const data: NewsApiResponse = await res.json();

      if (data.status === "success" && data.results.length > 0) {
        setArticles((prev) => [...prev, ...data.results]);
        setNextPage(data.nextPage);
      }
    } catch (error) {
      console.error("Error loading more articles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize image loading states

  // Skeleton loading for initial load
  if (initialLoading) {
    return (
      <main className="bg-gray-900 lg:bg-gray-950 min-h-screen overflow-x-hidden">
        <section id="hero" className="flex flex-col lg:items-center">
          <article
            id="hero1"
            className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl w-full"
          >
            <div className="w-full">
              <div className="text-gray-300 p-6 md:p-5 space-y-10">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 rounded-lg overflow-hidden"
                    >
                      <Skeleton className="h-48 w-full bg-gray-700" />
                      <div className="p-4 space-y-3">
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-20 bg-gray-700" />
                          <Skeleton className="h-4 w-16 bg-gray-700" />
                        </div>
                        <Skeleton className="h-6 w-full bg-gray-700" />
                        <Skeleton className="h-4 w-3/4 bg-gray-700" />
                        <Skeleton className="h-4 w-1/2 bg-gray-700" />
                        <Skeleton className="h-4 w-24 bg-gray-700" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>
        <FooterSection />
      </main>
    );
  }

  return (
    <main className="bg-gray-900 lg:bg-gray-950 min-h-screen overflow-x-hidden">
      <section id="hero" className="flex flex-col lg:items-center">
        <article
          id="hero1"
          className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl w-full"
        >
          <div className="w-full">
            <div className="text-gray-300 p-6 md:p-5 space-y-10">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="text-white text-xl font-bold lg:text-2xl">
                  <h1 className="py-3 lg:py-7">Cryptocurrency News</h1>
                  <p className="text-sm font-thin lg:text-lg lg:font-medium lg:text-gray-500">
                    The Cryptocurrency News website is a responsive web
                    application designed to provide users with the latest
                    cryptocurrency market information and news. The platform
                    helps traders and investors make informed decisions by
                    tracking market trends in the cryptocurrency space.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <img src={BlogImage} alt="" />
                </div>
              </div>

              {loaderData.status === "success" && articles.length > 0 ? (
                <>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                      <article
                        key={article.article_id}
                        className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors duration-300"
                      >
                        {article.image_url && (
                          <div className="h-48 overflow-hidden">
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}

                        <div className="p-4 space-y-3">
                          <div className="flex justify-between items-center text-sm text-gray-400">
                            <span className="font-medium capitalize">
                              {article.source_id || "Unknown Source"}
                            </span>
                            <span>{formatDate(article.pubDate)}</span>
                          </div>

                          <h2 className="text-xl font-semibold text-white line-clamp-2">
                            {article.title}
                          </h2>

                          <p className="text-gray-300 line-clamp-3">
                            {article.description}
                          </p>

                          {article.creator && article.creator.length > 0 && (
                            <p className="text-sm text-gray-400">
                              By {article.creator.join(", ")}
                            </p>
                          )}

                          <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
                          >
                            Read full article
                            <svg
                              className="w-4 h-4 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </div>
                      </article>
                    ))}

                    {/* Loading more skeletons */}
                    {loading &&
                      [...Array(3)].map((_, index) => (
                        <div
                          key={`loading-${index}`}
                          className="bg-gray-800 rounded-lg overflow-hidden"
                        >
                          <Skeleton className="h-48 w-full bg-gray-700" />
                          <div className="p-4 space-y-3">
                            <div className="flex justify-between">
                              <Skeleton className="h-4 w-20 bg-gray-700" />
                              <Skeleton className="h-4 w-16 bg-gray-700" />
                            </div>
                            <Skeleton className="h-6 w-full bg-gray-700" />
                            <Skeleton className="h-4 w-3/4 bg-gray-700" />
                            <Skeleton className="h-4 w-1/2 bg-gray-700" />
                            <Skeleton className="h-4 w-24 bg-gray-700" />
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Load More Button */}
                  {nextPage && (
                    <div className="text-center pt-8">
                      <button
                        onClick={loadMoreArticles}
                        disabled={loading}
                        className=" text-amber-300 font-medium transition-colors disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-amber-300"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Loading...
                          </span>
                        ) : (
                          "Load More Articles"
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center my-8 h-52">
                  <svg
                    width="94"
                    height="70"
                    viewBox="0 0 94 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-class"
                  >
                    <path
                      d="M10.4531 10.9219H66.021V44.3999C66.021 53.3608 66.021 57.8412 64.2771 61.2638C62.7432 64.2744 60.2955 66.7221 57.2849 68.2561C53.8623 70 49.3819 70 40.421 70H16.8531C14.6129 70 13.4928 70 12.6372 69.564C11.8845 69.1805 11.2726 68.5686 10.8891 67.8159C10.4531 66.9603 10.4531 65.8402 10.4531 63.6V10.9219Z"
                      fill="white"
                      fillOpacity="0.04"
                    ></path>
                    <path
                      d="M10.922 69.9994C4.88993 69.9994 0 65.1094 0 59.0774H47.0402C47.0402 69.9994 57.4936 69.9994 57.4936 69.9994H10.922Z"
                      fill="url(#paint0_linear_17615_36895)"
                    ></path>
                    <path
                      d="M21.3751 -4.86374e-05C15.3431 -4.86374e-05 10.4531 4.88989 10.4531 10.9219H66.0211C66.0211 -4.86374e-05 76.4745 -4.86374e-05 76.4745 -4.86374e-05H21.3751Z"
                      fill="url(#paint1_linear_17615_36895)"
                    ></path>
                    <rect
                      x="18.8242"
                      y="18.6667"
                      width="25.2954"
                      height="3.5"
                      rx="1.75"
                      fill="white"
                      fillOpacity="0.06"
                    ></rect>
                    <rect
                      x="18.8242"
                      y="30.9166"
                      width="17.6479"
                      height="3.50001"
                      rx="1.75001"
                      fill="white"
                      fillOpacity="0.06"
                    ></rect>
                    <rect
                      x="18.8242"
                      y="43.1665"
                      width="23.5306"
                      height="3.50001"
                      rx="1.75001"
                      fill="white"
                      fillOpacity="0.06"
                    ></rect>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M84.7764 40.6118C84.7764 48.657 78.2813 55.1788 70.2691 55.1788C62.2569 55.1788 55.7617 48.657 55.7617 40.6118C55.7617 32.5667 62.2569 26.0449 70.2691 26.0449C78.2813 26.0449 84.7764 32.5667 84.7764 40.6118ZM79.5444 40.8507C79.5444 46.1262 75.2852 50.4028 70.0313 50.4028C64.7774 50.4028 60.5183 46.1262 60.5183 40.8507C60.5183 35.5752 64.7774 31.2986 70.0313 31.2986C75.2852 31.2986 79.5444 35.5752 79.5444 40.8507Z"
                      fill="#FCD535"
                    ></path>
                    <path
                      d="M70.0306 50.4028C75.2845 50.4028 79.5436 46.1262 79.5436 40.8507C79.5436 35.5752 75.2845 31.2986 70.0306 31.2986C64.7767 31.2986 60.5176 35.5752 60.5176 40.8507C60.5176 46.1262 64.7767 50.4028 70.0306 50.4028Z"
                      fill="#FCD535"
                      fillOpacity="0.1"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M84.4642 55.6269L80.3984 51.4324L81.544 50.3283L85.6098 54.5229L84.4642 55.6269Z"
                      fill="#FCD535"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M88.0506 54.7156C87.6005 54.2637 87.0105 54.0377 86.4205 54.0377C85.8305 54.0377 85.2406 54.2637 84.7904 54.7156C84.3403 55.1676 84.1152 55.76 84.1152 56.3524C84.1152 56.9448 84.3403 57.5372 84.7904 57.9892L90.0632 63.2836C90.5133 63.7356 91.1033 63.9616 91.6933 63.9616C92.2832 63.9616 92.8732 63.7356 93.3233 63.2836C93.7735 62.8316 93.9985 62.2392 93.9985 61.6468C93.9985 61.0544 93.7735 60.462 93.3233 60.01L88.0506 54.7156Z"
                      fill="#FCD535"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_17615_36895"
                        x1="32.2204"
                        y1="59.0774"
                        x2="32.2204"
                        y2="69.9994"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" stopOpacity="0.08"></stop>
                        <stop
                          offset="1"
                          stopColor="white"
                          stopOpacity="0.04"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_17615_36895"
                        x1="47.4526"
                        y1="10.9219"
                        x2="47.4526"
                        y2="-4.86374e-05"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" stopOpacity="0.04"></stop>
                        <stop
                          offset="1"
                          stopColor="white"
                          stopOpacity="0.08"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="mt-3 text-gray-400">
                    No news articles available at the moment.
                  </span>
                </div>
              )}
            </div>
          </div>
        </article>
      </section>
      <FooterSection />
    </main>
  );
}
