export function ArchiveNavigation() {
  return (
    <div className="md:mb-16 -mt-24 md:-mt-8"> 
    <h1 className ="text-center mb-8 text-white font-bold text-4xl"> Looking for past blogs? 
      </h1>
    <nav className="flex justify-center space-x-4 mb-8 text-xl">
      <a
        href="http://myjapantrip2019.wordpress.com/#"
        className="text-red-600 hover:text-red-700 font-semibold"
      >
        2019 Blog (First time in Japan)
      </a>
      <div>
        |
      </div>
      <a
        href="https://kylesjapanlife.wordpress.com/"
        className="text-red-600 hover:text-red-700 font-semibold"
      >
        2022 Blog (Covers my life in Japan from July 2022- January 2024)
      </a>
        </nav>
    </div>
  );
}