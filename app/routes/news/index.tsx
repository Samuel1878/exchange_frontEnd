import FooterSection from "~/components/footer";
import type { Route } from "./+types";
import { useState, useEffect } from "react";
import { Skeleton } from "~/components/ui/skeleton"

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
            message: "Failed to load cryptocurrency news"
        } as NewsApiResponse;
    }
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

export default function EarnIndex({ loaderData }: { loaderData: NewsApiResponse }) {
    const [articles, setArticles] = useState<NewsArticle[]>(loaderData.results || []);
    const [nextPage, setNextPage] = useState(loaderData.nextPage);
    const [loading, setLoading] = useState(false);
    const [imageLoadingStates, setImageLoadingStates] = useState<{ [key: string]: boolean }>({});
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
                setArticles(prev => [...prev, ...data.results]);
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
                    <article id="hero1" className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl w-full">
                        <div className="w-full">
                            <div className="text-gray-300 p-6 md:p-5 space-y-10">
                                <div className="text-center space-y-4">
                                    <Skeleton className="h-12 w-64 mx-auto bg-gray-700" />
                                </div>

                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {[...Array(6)].map((_, index) => (
                                        <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
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
                <article id="hero1" className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl w-full">
                    <div className="w-full">
                        <div className="text-gray-300 p-6 md:p-5 space-y-10">

                            <div className="text-center space-y-4">
                                <h1 className="text-4xl font-bold text-white">Cryptocurrency News</h1>

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
                                                            By {article.creator.join(', ')}
                                                        </p>
                                                    )}

                                                    <a
                                                        href={article.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                                    >
                                                        Read full article
                                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </article>
                                        ))}

                                        {/* Loading more skeletons */}
                                        {loading && [...Array(3)].map((_, index) => (
                                            <div key={`loading-${index}`} className="bg-gray-800 rounded-lg overflow-hidden">
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
                                                className="bg-amber-300 hover:bg-amber-400 disabled:bg-amber-200 text-gray-950 font-medium py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
                                            >
                                                {loading ? (
                                                    <span className="flex items-center justify-center">
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
                                // Empty or Error State
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-lg">
                                        {loaderData.status === "error"
                                            ? "Unable to load news at the moment. Please try again later."
                                            : "No news articles available at the moment."
                                        }
                                    </div>
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