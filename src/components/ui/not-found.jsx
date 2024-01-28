export default function NotFound() {
  return (
    <div className="flex items-center flex-col justify-center bg-[rgba(252, 231, 187, 0.6)] h-screen lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
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
      <div className="w-full lg:w-1/2 text-lg m-5">
        <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
          Looks like you&apos;ve found the doorway to the great nothing!
        </h1>
        <p className="py-4 text-gray-800">
          The content you’re looking for doesn’t exist. It was removed, or you
          mistyped the link.
        </p>
        <p className="py-2 text-gray-800">
          Sorry about that! Please visit our hompage to get where you need to
          go.
        </p>
        <a
          className="flex w-fit h-18 p-4 mt-8 text-black bg-amber-300 hover:bg-orange-400 transition rounded-full font-serif"
          href="/">
          Go back to Homepage
        </a>
      </div>
    </div>
  );
}
