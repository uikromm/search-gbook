import Link from "next/link"
import Image from "next/image"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
    const book = await res.json()

    const clearDescription = book.volumeInfo.description ? book.volumeInfo.description.toString().replace(/<[^>]*>?/gm, '') : null

    return (
        <div className="max-w-[992px] container mx-auto px-4 py-8 gap-y-8">
            <div className="flex">
                <Link href="/" className="bg-[#3f3f46] p-2 px-4 rounded-lg">Go to all books</Link>
            </div>

            <div className="w-full flex gap-8 items-center mb-8">
                <div className="mt-20">
                    {book.volumeInfo.imageLinks ?
                        <Image
                            priority
                            src={book.volumeInfo.imageLinks.thumbnail}
                            width={140}
                            height={220}
                            alt={book.volumeInfo.title}
                            className="rounded-lg border border-[#ffffff55] w-[140px]"
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
                </div>


                <ul className="mt-14 leading-10">
                    <li>
                        Book title: <span className="font-thin text-[#a3a3aa]">{book.volumeInfo.title}</span>
                    </li>
                    {book.volumeInfo.subtitle ?
                        <li>
                            Book subtitle: <span className="font-thin text-[#a3a3aa]">{book.volumeInfo.subtitle}</span>
                        </li> : null
                    }
                    <li>
                        Authors: <span className="font-thin text-[#a3a3aa]">{book.volumeInfo.authors.join(",")}</span>
                    </li>
                    <li>
                        Published date: <span className="font-thin text-[#a3a3aa]">{book.volumeInfo.publishedDate}</span>
                    </li>
                    <li>
                        Page count: <span className="font-thin text-[#a3a3aa]">{book.volumeInfo.pageCount}</span>
                    </li>
                </ul>
            </div>
            <hr />
            <div className="mt-8 leading-8">
                {book.volumeInfo.description ? <>Description: <span className="font-thin text-[#a3a3aa]">{clearDescription}</span></> : null}

            </div>

            {
                book.accessInfo.pdf.acsTokenLink ?
                    <div className="mt-10">
                        Access token link: <span className="font-thin text-[#a3a3aa]"><a href={book.accessInfo.pdf.acsTokenLink}>Link</a></span>
                    </div>
                    : null
            }
        </div>
    )
}