import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') || ''
    const nextPageToken = searchParams.get('nextPage') || ''
    
    // Get API key from environment
    const API_KEY = process.env.NEWSDATA_API_KEY
    
    if (!API_KEY) {
      throw new Error('NewsData API key not configured')
    }
    
    let apiUrl = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&category=technology&language=en&size=10`
    
    // Use nextPage token for pagination if available
    if (nextPageToken) {
      apiUrl += `&page=${nextPageToken}`
    }
    
    if (query) {
      apiUrl += `&q=${encodeURIComponent(query)}`
    }

    console.log('Fetching news from:', apiUrl.replace(API_KEY, 'API_KEY_HIDDEN'))

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Portfolio-Website/1.0'
      },
      // Don't cache for real-time news
      cache: 'no-store'
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('NewsData API error response:', errorText)
      throw new Error(`NewsData API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    console.log('NewsData API response:', {
      status: data.status,
      totalResults: data.totalResults,
      resultsLength: data.results?.length,
      nextPage: data.nextPage
    })
    
    return NextResponse.json({
      success: true,
      articles: data.results || [],
      nextPage: data.nextPage || null,
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