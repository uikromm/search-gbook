'use client';
import { useState, useEffect, Suspense } from 'react'
import BookList from "./BookList"
import { Loading, Skeleton } from './Loading';


const BookSearch = () => {
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState([])
    const [orderBy, setOrderBy] = useState('relevance')
    const [startIndex, setStartIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const searchBooks = async (reset = false, initialQuery = '') => {
        setIsLoading(true)
        setError(null)
        const newStartIndex = reset ? 0 : startIndex
        const searchQuery = initialQuery || query
        try {
            const res = await fetch(`/api/books?q=${encodeURIComponent(searchQuery)}&orderBy=${orderBy}&startIndex=${newStartIndex}`)
            if (!res.ok) {
                throw new Error('Failed to fetch books')
            }
            const data = await res.json()
            if (data.items) {
                setBooks(reset ? data.items : [...books, ...data.items])
                setStartIndex(newStartIndex + (data.items.length || 0))
            } else {
                setBooks(reset ? [] : books)
                if (reset) {
                    setError('No books found. Try a different search term.')
                }
            }
        } catch (err) {
            setError('An error occurred while fetching books. Please try again.')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        searchBooks(true, 'subject:fiction')
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            searchBooks(true)
        }
    }

    const handleLoadMore = () => {
        if (query.trim() || books.length > 0) {
            searchBooks()
        }
    }

    const handleSortChange = (value: string) => {
        setOrderBy(value)
        if (query.trim() || books.length > 0) {
            searchBooks(true)
        }
    }

    return (
        <div className="w-full mt-20 flex flex-col items-center justify-start">
            <form className="w-full max-w-[650px] bg-[#3f3f46] flex border border-[#ffffff55] rounded" onSubmit={handleSearch}>
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title, author, publisher, or subject"
                    className="w-full p-3 bg-[#27272a] text-[#d4d4d8] outline-none rounded-tl-md rounded-bl-md"
                />
                <button className="p-2 px-4 bg-[#27272a] rounded-tr-md rounded-br-md" type="submit" disabled={isLoading || !query.trim()}>
                    Search
                </button>
            </form>
            <div className="w-full max-w-[650px] mt-16 flex gap-8">
                <button className="p-2 px-6 bg-white text-black rounded-md w-full"
                    onClick={() => handleSortChange('relevance')}
                >
                    Relevance
                </button>
                <button className="p-2 px-6 bg-gradient-to-r from-orange-600  to-indigo-600 rounded-md text-white w-full"
                    onClick={() => handleSortChange('newest')}
                >
                    Newest
                </button>
            </div>



            <div className="w-full flex justify-between mt-32 mb-2">
                <h1 className="uppercase">{orderBy}</h1>
                <p>Books: <span>{JSON.stringify(books.length)}</span></p>
            </div>
            <div className="line h-[1px] w-full bg-[#fff] "></div>




            <div className="mt-12 w-full">
                {error && <p className="text-slate-400" role="alert">{error}</p>}
                {isLoading && books.length === 0 ? (
                    <Suspense fallback={<p>Loading feed...</p>}>
                        <Skeleton></Skeleton>
                    </Suspense>
                ) : (
                    <BookList books={books} />
                )}
                {books.length > 0 && (
                    <div className="mt-12 text-center w-full">
                        <button className='w-full p-3 bg-[#3f3f46] rounded-md' onClick={handleLoadMore} disabled={isLoading}>
                            {isLoading ? <p className='flex items-center justify-center gap-2'><Loading></Loading> Loading</p> : "Load More"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookSearch