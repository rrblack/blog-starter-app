export function ArchiveNavigation() {
  return (
    <div className="md:mb-16 -mt-24 md:-mt-8"> 
    <h1 className ="text-center mb-8 text-white font-bold text-4xl"> Looking for past blogs? 
      </h1>
    <nav className="flex justify-center flex-wrap space-x-11 md:space-x-8 mb-8 text-wrap md:text-2xl rounded-full shadow-md py-5 md:py-5 border border-red-400 shadow-red-700/50 hover:shadow-red-400/90 transition-shadow-900 ">
      <a
        href="http://myjapantrip2019.wordpress.com/#"
        className="text-red-600 hover:text-red-700 font-semibold"
      >
        2019 Blog (First time in Japan)
      </a>
      <div className="hidden md:block">
      </div>
      <div className="mt-5 md:mt-0">
      <a 
        href="https://kylesjapanlife.wordpress.com/"
        className="text-red-600 hover:text-red-700 font-semibold"
      >
        2022 Blog (Covers my life in Japan from July 2022 - January 2024)
      </a>
      </div>
        </nav>
    </div>
  );
}