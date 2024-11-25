import Image from 'next/image'
import Link from 'next/link'

interface Book {
    id: string
    volumeInfo: {
        title: string
        authors?: string[]
        imageLinks?: {
            thumbnail: string
        },
        previewLink: string
    },
    accessInfo: {
        pdf: {
            isAvailable: boolean,
            downloadLink: string
        }
    }
}

interface BookListProps {
    books: Book[]
}

export default function BookList({ books }: BookListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map((book, id) => (
                <div key={id}>
                    <div className='item relative'>
                        {book.volumeInfo.imageLinks ?
                            <Image
                                loading="lazy"
                                src={book.volumeInfo.imageLinks.thumbnail}
                                alt={book.volumeInfo.title}
                                width={200}
                                height={300}
                                className="book-image"
                            /> :
                            <Image
                                loading="lazy"
                                src={"/No-Image.jpg"}
                                alt='No Image'
                                width={200}
                                height={300}
                                className="book-image"
                            />
                        }

                        <div className="w-full info rounded absolute top-0 flex flex-col justify-between">
                            <div>
                                <div>{book.volumeInfo.title.slice(0, 20) ? book.volumeInfo.title.slice(0, 20) : null}</div>

                                <div>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {book.volumeInfo.authors?.join(', ').slice(0, 60)}
                                    </p>
                                </div>
                            </div>

                            <div className='w-full'>
                                <Link href={book.id} className='text-sm bg-emerald-600 w-full p-2 px-3 rounded-md inline-block text-center'>Read More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

