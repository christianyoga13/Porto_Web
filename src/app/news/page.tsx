"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Calendar, ExternalLink, Loader2, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface NewsArticle {
  title: string
  description: string
  link: string
  image_url?: string
  pubDate: string
  source_id: string
  content?: string
  category: string[]
}

interface NewsResponse {
  success: boolean
  articles: NewsArticle[]
  nextPage?: string
  totalResults: number
  error?: string
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [totalResults, setTotalResults] = useState(0)
  const [nextPage, setNextPage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => new Set(prev).add(imageUrl))
  }

  const isImageBroken = (imageUrl: string) => {
    return imageErrors.has(imageUrl)
  }

  const fetchNews = async (isLoadMore: boolean = false, query: string = '', nextPageToken?: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      if (query.trim()) params.append('query', query.trim())
      if (nextPageToken) params.append('nextPage', nextPageToken)
      
      console.log('Fetching news with params:', params.toString())
      
      const response = await fetch(`/api/news?${params.toString()}`)
      const data: NewsResponse = await response.json()
      
      console.log('News API response:', data)
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch news')
      }
      
      if (!isLoadMore) {
        setArticles(data.articles)
      } else {
        setArticles(prev => [...prev, ...data.articles])
      }
      
      setTotalResults(data.totalResults)
      setNextPage(data.nextPage || null)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching news:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews(false, '')
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchNews(false, searchQuery)
  }

  const handleLoadMore = () => {
    if (nextPage && !loading) {
      fetchNews(true, searchQuery, nextPage)
    }
  }

  const handleRefresh = () => {
    fetchNews(false, searchQuery)
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'Unknown date'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      {/* Header */}
      <div className="w-full bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Page Title */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Tech News
          </motion.h1>
          <motion.p
            className="text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stay updated with the latest technology news, trends, and innovations from around the world
          </motion.p>
        </div>

        {/* Search and Actions */}
        <motion.div
          className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Search technology news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed rounded-lg transition-all duration-300 flex items-center gap-2 font-medium"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Search
            </button>
          </form>
          
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800 disabled:cursor-not-allowed rounded-lg transition-colors font-medium"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </motion.div>

        {/* Results Info */}
        {totalResults > 0 && (
          <div className="mb-6 text-slate-300 font-medium">
            Found {totalResults} articles {searchQuery && `for "${searchQuery}"`}
          </div>
        )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-red-400 font-semibold mb-2">Error Loading News</h3>
                <p className="text-red-300 mb-4">{error}</p>
                <button
                  onClick={handleRefresh}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

        {/* Articles Grid */}
        {!error && articles.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {articles.map((article, index) => (
              <motion.article
                key={`${article.link}-${index}`}
                variants={itemVariants}
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative h-48 overflow-hidden">
                  {article.image_url && !isImageBroken(article.image_url) ? (
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized={true}
                      onError={() => handleImageError(article.image_url!)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20 flex items-center justify-center">
                      <div className="text-slate-500">
                        <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-slate-800/90 text-slate-300 text-xs font-medium rounded-full">
                      {article.source_id}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {article.description && (
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                      {article.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.pubDate)}</span>
                  </div>

                  <motion.a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-white font-medium hover:text-cyan-400 transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    <ExternalLink className="w-4 h-4" /> Read Article
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

          {/* Load More Button */}
          {!error && nextPage && articles.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More Articles'
                )}
              </button>
            </div>
          )}

        {/* Empty State */}
        {!loading && !error && articles.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl mb-4">📰</div>
            <h3 className="text-2xl font-bold mb-2">No articles found</h3>
            <p className="text-slate-300 mb-6">
              {searchQuery 
                ? `No technology news found for "${searchQuery}". Try a different search term.`
                : "No technology news available at the moment. Please try again later."
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  fetchNews(false, '')
                }}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Clear search
              </button>
            )}
          </motion.div>
        )}
      </div>
    </main>
  )
}
