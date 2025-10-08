import SubscribeForm from "@/app/_components/newsletter";

export function Footer() {
  return (
    <div>
  <SubscribeForm/>
  <div>
  <main className="container mx-auto px-4 py-8 flex-grow"></main>
  <footer className="bg-gray-800 text-white text-center py-4">
    <p>&copy; {new Date().getFullYear()} Kyle's Japan life. All rights reserved.</p>
  </footer>
  </div>
</div>
  );
};

export default Footer;
