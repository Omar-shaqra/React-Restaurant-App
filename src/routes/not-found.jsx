export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-16 px-6 text-white bg-black bg-opacity-50 lg:flex-row py-28 md:px-24 md:py-20 lg:py-32 lg:gap-28">
      <div className="w-full lg:w-1/2">
        <img
          className="hidden lg:block"
          src="https://i.ibb.co/v30JLYr/Group-192-2.png"
          alt=""
        />
        <img
          className="md:hidden"
          src="https://i.ibb.co/8gTVH2Y/Group-198.png"
          alt=""
        />
      </div>
      <div className="w-full m-5 text-lg lg:w-1/2">
        <h1 className="py-4 text-3xl font-extrabold lg:text-4xl ">
          Looks like you&apos;ve found the doorway to the great nothing!
        </h1>
        <p className="py-4 ">
          The content you’re looking for doesn’t exist. It was removed, or you
          mistyped the link.
        </p>
        <p className="py-2 ">
          Sorry about that! Please visit our hompage to get where you need to
          go.
        </p>
        <a
          className="flex p-4 mt-8 font-serif text-black transition rounded-full w-fit h-18 bg-amber-300 hover:bg-orange-400"
          href="/">
          Go back to Homepage
        </a>
      </div>
    </div>
  );
}
