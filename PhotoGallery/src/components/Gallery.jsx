import { useReducer, useState, useMemo, useCallback, useEffect } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import { favouritesReducer } from "../reducers/favouritesReducer";
import PhotoCard from "./PhotoCard";

export default function Gallery() {
    const { photos, loading, error } = useFetchPhotos();
    const [search, setSearch] = useState("");
    const [favourites, dispatch] = useReducer(favouritesReducer, []);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("favourites")) || [];
        dispatch({ type: "LOAD_FAV", payload: saved });
    }, []);

    const handleSearch = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    const filteredPhotos = useMemo(() => {
        return photos.filter((photo) =>
            photo.author.toLowerCase().includes(search.toLowerCase())
        );
    }, [photos, search]);

    function toggleFav(photo) {
        dispatch({ type: "TOGGLE_FAV", payload: photo });
    }

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[40vh] space-y-6">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
                </div>
                <p className="text-slate-500 font-medium animate-pulse">Fetching amazing photos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[40vh]">
                <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl shadow-sm border border-red-100 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                        <p className="font-bold">Oops, something went wrong</p>
                        <p className="text-sm mt-1">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="max-w-2xl mx-auto mb-10 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-6 w-6 text-slate-400 group-focus-within:text-purple-500 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search inspiring authors like 'Alejandro' or 'Paul'..."
                    value={search}
                    onChange={handleSearch}
                    className="block w-full pl-14 pr-4 py-4 text-slate-700 bg-white/70 border border-white/60 rounded-2xl leading-5 backdrop-blur-md shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg"
                />
            </div>

            {filteredPhotos.length === 0 ? (
                <div className="text-center py-20 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                    <svg className="mx-auto h-16 w-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xl text-slate-600 font-medium">No artists found matching <span className="text-purple-600">"{search}"</span></p>
                    <p className="text-slate-400 mt-2">Try adjusting your search terms</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
                    {filteredPhotos.map((photo) => (
                        <PhotoCard
                            key={photo.id}
                            photo={photo}
                            toggleFav={toggleFav}
                            isFav={favourites.some((fav) => fav.id === photo.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}