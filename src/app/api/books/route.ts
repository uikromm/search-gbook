import { NextResponse } from 'next/server'

const API_KEY = process.env.NEXT_PUBLIC_GOOGlE_API_KEY

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || 'subject:programming'
    const startIndex = searchParams.get('startIndex') || '0'
    const orderBy = searchParams.get('orderBy') || 'relevance'

    const response = await fetch(
        `${BASE_URL}?q=${encodeURIComponent(query)}&startIndex=${startIndex}&orderBy=${orderBy}&maxResults=20&key=${API_KEY}`
    )

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json(data)
}

