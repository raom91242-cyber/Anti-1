export default function PhotoCard({ photo, isFav, toggleFav }) {
    // We use picsum specific URL formatting to get a reasonable sized image
    // photo.download_url is often very large, causing slow loads, so we can use a smaller version for the gallery
    const imgUrl = `https://picsum.photos/id/${photo.id}/600/400`;

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 flex flex-col h-full cursor-pointer">
            <div className="relative overflow-hidden aspect-[4/3] w-full">
                <img
                    src={imgUrl}
                    alt={`Taken by ${photo.author}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                />
                
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFav(photo);
                    }}
                    className="absolute top-4 right-4 p-2.5 bg-white backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transform active:scale-95 group/btn z-10"
                    aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill={isFav ? "currentColor" : "none"}
                        stroke="currentColor" 
                        className={`w-6 h-6 ${isFav ? 'text-rose-500' : 'text-slate-400 group-hover/btn:text-rose-500'} transition-colors duration-300`}
                        strokeWidth={isFav ? "0" : "2"}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>
            </div>

            <div className="p-5 flex-grow flex flex-col justify-between bg-white relative">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-md ring-2 ring-white">
                        {photo.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">Captured by</p>
                        <p className="font-bold text-slate-800 leading-tight truncate text-lg group-hover:text-purple-600 transition-colors duration-300">{photo.author}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}