import Link from "next/link";
export function Intro() {
  return (
  <div>
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-red-500">
        Kyle's Japan Life
      </h1>
      <div className="flex flex-col md:items-end">
      <h4 className="text-center md:text-right text-lg mt-5 md:pl-8 text-red-500">
        Blog of my life in Japan
      </h4>
      <Link 
      href="/about/" 
      className="inline-block text-lg text-white font-bold hover:text-red-500">
        About me 
      </Link>
      </div>
    </section>
    <div className="mt-90 mb-32 md:mb-32 text-center">
      </div>
    </div>
  );
}
