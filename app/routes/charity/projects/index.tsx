import { useNavigate } from "react-router";
import { FeaturedProjects } from "data/charity/featured-projects";
export default function AllCharity() {
    const navigate = useNavigate();
    return (
        <main className="bg-gray-900 lg:bg-gray-950 min-h-svh flex flex-col justify-between">
            <section className="bg-gradient-to-b from-gray-800 to-gray-950 rounded-b-full text-center py-20 px-4">
                <h1 className="text-white text-3xl md:text-4xl font-semibold">Discover All Projects</h1>
            </section>

            <section
                id="hero"
                className="flex flex-col lg:items-center flex-1 px-4"
            >
                <article id="hero1" className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl xl:min-w-6xl">

                    <div className="lg:max-w-6xl md:max-w-7xl">
                        <div className=" text-gray-300 p-2 md:p-5 space-y-10">
                            <div className="overflow-x-auto pb-6">
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 px-4 lg:px-0 w-full lg:w-full">
                                    {FeaturedProjects.map((f) => (
                                        <div className=" flex-shrink-0 rounded-lg shadow p-2 hover:border-amber-300 border border-gray-700 transition-colors duration-300 cursor-pointer" key={f.id}
                                            onClick={() => navigate(`${f.id}`)}
                                        >
                                            <div className="relative rounded-lg overflow-hidden mb-4">
                                                <img
                                                    src={f.imageUrl}
                                                    className="w-full h-36 object-cover"
                                                    alt={f.title}
                                                />
                                                <div className="absolute bottom-2 right-2 flex items-center space-x-2 bg-transparent bg-opacity-50 text-white text-xs rounded px-2 py-1 font-semibold select-none">
                                                    <div className="flex items-center space-x-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c3.148 0 6.06 1.175 8.293 3.27"></path>
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 11c-1.657 0-3-1.343-3-3m0 6a3 3 0 006 0m3-3a3 3 0 10-6 0"></path>
                                                        </svg>
                                                        <span>{f.donations}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <svg className="w-4 h-4" fill="currentColor" stroke="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 1C6.486 1 2 5.486 2 11c0 3.347 1.916 6.269 4.81 7.725L4.18 23l5.559-2.022A8.957 8.957 0 0012 20c5.514 0 10-4.486 10-9s-4.486-10-10-10z" />
                                                        </svg>
                                                        <span>{f.beneficiaries}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-green-600 font-semibold text-sm">{f.status}</span>
                                                <span className="text-gray-400 text-sm font-semibold">{f.progress}%</span>
                                            </div>
                                            <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                                            <p className="text-gray-400 text-sm">{f.description}</p>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        </div>

                    </div>

                </article>
            </section>
        </main>
    );
}