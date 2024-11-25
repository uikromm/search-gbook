import BookSearch from "./components/BookSearch"

export default function Home() {
  return (
    <main className="max-w-[992px] container mx-auto px-4 py-8 flex flex-col items-center gap-y-8">
      <h1 className="text-4xl mt-20 m-auto max-w-[750px] font-black text-center">Search for books and read them! You can also sort them by the latest editions.</h1>

      <BookSearch />
    </main>
  );
}
