import { NextRequest, NextResponse } from "next/server"

// News API article interface
interface NewsAPIArticle {
  title: string
  description: string
  url: string
  urlToImage: string | null
  publishedAt: string
  source: {
    name: string
  }
  content: string
}

export async function GET(request: NextRequest) {
  console.log('=== NEWS API ROUTE CALLED ===') 
  console.log('Request URL:', request.url)
  
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') || ''
    const page = parseInt(searchParams.get('page') || '1')
    
    console.log('Search params:', { query, page })
    
    // Get API key from environment
    const API_KEY = process.env.NEWS_API_KEY
    
    if (!API_KEY) {
      console.error('API key not found')
      throw new Error('News API key not configured')
    }

    console.log('API Key exists:', !!API_KEY)
    console.log('Query:', query)
    console.log('Page:', page)
    
    // Use News API everything endpoint for technology news
    let apiUrl = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`
    
    // Add technology-focused query
    if (query && query.trim()) {
      apiUrl += `&q=${encodeURIComponent(query + ' AND technology')}`
    } else {
      // Default technology topics when no search query
      apiUrl += `&q=technology OR AI OR "artificial intelligence" OR startup OR programming OR cybersecurity OR mobile OR cloud`
    }
    
    // Add other parameters
    apiUrl += `&language=en`
    apiUrl += `&sortBy=publishedAt`
    apiUrl += `&pageSize=12`
    apiUrl += `&page=${page}`
    
    // Filter to recent articles (last month)
    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)
    apiUrl += `&from=${lastMonth.toISOString().split('T')[0]}`

    console.log('Fetching news from:', apiUrl.replace(API_KEY, 'API_KEY_HIDDEN'))

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Portfolio-Website/1.0'
      },
      cache: 'no-store'
    })

    console.log('API Response Status:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('News API error response:', errorText)
      
      if (response.status === 401) {
        throw new Error('API key is invalid or expired.')
      } else if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.')
      } else if (response.status === 400) {
        throw new Error('Invalid request parameters.')
      } else {
        throw new Error(`News API error: ${response.status} ${response.statusText}`)
      }
    }

    const data = await response.json()
    
    console.log('News API response:', {
      status: data.status,
      totalResults: data.totalResults,
      articlesLength: data.articles?.length
    })
    
    // Transform News API response to match our interface
    const transformedArticles = (data.articles || []).map((article: NewsAPIArticle) => ({
      title: article.title,
      description: article.description,
      link: article.url,
      image_url: article.urlToImage,
      pubDate: article.publishedAt,
      source_id: article.source.name,
      content: article.content,
      category: ['technology'] // News API doesn't return categories, so we set it
    }))
    
    return NextResponse.json({
      success: true,
      articles: transformedArticles,
      nextPage: page < Math.ceil(data.totalResults / 12) ? (page + 1).toString() : null,
      totalResults: data.totalResults || 0
    })

  } catch (error) {
    console.error('Error fetching news:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch news'
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        articles: [],
        nextPage: null,
        totalResults: 0
      },
      { status: 500 }
    )
  }
}