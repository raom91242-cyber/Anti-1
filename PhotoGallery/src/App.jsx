import Gallery from './components/Gallery'

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 font-sans text-slate-900 selection:bg-purple-200 selection:text-purple-900">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 -left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute top-0 -right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[pulse_6s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[pulse_6s_ease-in-out_infinite]" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <header className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-purple-100 shadow-sm">
            <span className="text-sm font-semibold tracking-wider text-purple-600 uppercase">Frontend Assignment</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 mb-6 tracking-tight drop-shadow-sm">
            Discover Moments
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Explore a beautiful collection of high-quality photographs from talented creators around the world.
          </p>
        </header>

        <main className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-xl border border-white p-6 md:p-10">
          <Gallery />
        </main>
        
        <footer className="mt-20 text-center text-slate-500 text-sm">
          <p>Built with React, Vite & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}

export default App
