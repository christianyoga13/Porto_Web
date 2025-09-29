export default function NewsLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="h-12 bg-slate-700/30 rounded-lg max-w-md mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-slate-700/20 rounded-lg max-w-2xl mx-auto animate-pulse"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="h-10 bg-slate-700/30 rounded-lg w-full max-w-md animate-pulse"></div>
            <div className="h-10 bg-slate-700/30 rounded-lg w-32 animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-slate-900/50 rounded-xl p-6 animate-pulse">
                <div className="h-48 bg-slate-700/30 rounded-lg mb-4"></div>
                <div className="h-6 bg-slate-700/40 rounded-lg mb-2"></div>
                <div className="h-4 bg-slate-700/30 rounded-lg mb-2"></div>
                <div className="h-4 bg-slate-700/20 rounded-lg w-3/4 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-slate-700/20 rounded-lg w-20"></div>
                  <div className="h-4 bg-slate-700/20 rounded-lg w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
