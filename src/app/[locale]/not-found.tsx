export const runtime = 'edge';

export default function NotFound() {
  return (
    <div className="text-center mt-20 text-white">
      <h1 className="text-4xl font-bold">404 - There's <span className="text-red-500"> Nothing Here </span> Bud </h1>
      <p className="mt-4 text-xl">Sorry chief, I don't know what you were trying to do, but that's not it.</p>
      <br></br>
      <img src="/assets/blog/what-its-like-to-be-unemployed-in-japan/PXL_20250822_210343230.jpg" className="flex mx-auto" width={500} height={500}/>
      <p className="mt-4 text-xl">Take a rest in the flower bed for a while.</p>
      <p className="mt-4 text-xl">After you've rested up, lets get you back to <a href="/" className="underline font-semibold text-red-500">Kyle's Japan Life</a>.</p>
    </div>
  );
}