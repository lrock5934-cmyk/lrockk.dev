export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A192F] text-white border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <div className="text-sm text-slate-400">
          © 2026 LRock.dev · Accra, Ghana
        </div>

        {/* Exactly 4 text links with smooth scroll jumps */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300 font-medium">
          <button
            onClick={() => scrollTo('services')}
            className="hover:text-[#14B8A6] transition cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="hover:text-[#14B8A6] transition cursor-pointer"
          >
            How it works
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="hover:text-[#14B8A6] transition cursor-pointer"
          >
            Contact
          </button>
          <button
            onClick={() => scrollTo('estimator')}
            className="hover:text-[#14B8A6] transition cursor-pointer"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </footer>
  );
}
