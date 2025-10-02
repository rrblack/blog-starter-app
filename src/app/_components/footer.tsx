import Container from "@/app/_components/container";
import { EXAMPLE_PATH } from "@/lib/constants";

export function Footer() {
  return (
<form className="rounded px-8 pt-6 pb-8 mb-4 max-w-2xl center mx-auto">
    <h2 className="text-center text-2xl text-red-500">Stay up to date on my latest Japan blogs!</h2> 
      <div className="mt-4 flex">
        <input
          className="grow mr-1 transition ease-out delay-75 focus-within:border-2 focus-within:border-red-600 items-center h-14 pr-0.5 border border-red-600 rounded caret-red-700 outline-none px-4 disabled:border-slate-00"
          type="email"
          placeholder="What is your email address?"
        />
        <button
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-slate-400"
          type="submit"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
};

export default Footer;
