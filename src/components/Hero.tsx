import { ArrowRight, Code2, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#0A192F] text-white py-20 lg:py-32">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#14B8A6]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Location Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#1E293B] border border-[#14B8A6]/30 px-3.5 py-1.5 rounded-full shadow-lg shadow-black/20">
              <MapPin className="w-4 h-4 text-[#14B8A6]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-200">
                Accra, Ghana 🇬🇭 · Remote & Global Delivery
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-teal-200">High-Performance</span> Websites & Mobile Apps
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Empowering startups and enterprises with lightning-fast web applications, cross-platform mobile apps, and robust cloud architectures built with precision in Accra.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto px-8 py-4 bg-[#14B8A6] hover:bg-[#0d9488] text-[#0A192F] font-extrabold rounded-2xl transition shadow-xl shadow-[#14B8A6]/25 flex items-center justify-center space-x-3 cursor-pointer text-base"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => scrollTo('services')}
                className="w-full sm:w-auto px-8 py-4 bg-[#1E293B] hover:bg-slate-800 text-white font-bold rounded-2xl transition border border-slate-700 flex items-center justify-center space-x-2 cursor-pointer text-base"
              >
                <span>Explore Services</span>
              </button>
            </div>

            {/* Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800 text-left">
              <div>
                <p className="text-2xl font-black text-[#14B8A6]">50+</p>
                <p className="text-xs text-slate-300 mt-0.5">Projects Delivered</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#14B8A6]">99.9%</p>
                <p className="text-xs text-slate-300 mt-0.5">Uptime & Performance</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#14B8A6]">100%</p>
                <p className="text-xs text-slate-300 mt-0.5">Client Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Hero Card / Neon Developer Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-br from-[#1E293B] to-[#0A192F] border border-[#14B8A6]/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#14B8A6]/10">
              <div className="absolute -top-3 -right-3 bg-[#14B8A6] text-[#0A192F] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Available for Q1 2026
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#14B8A6] text-[#0A192F] font-black text-2xl flex items-center justify-center shadow-lg">
                  LR
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">LRock.dev Engineering</h3>
                  <p className="text-xs text-[#14B8A6] font-medium">Full-Stack Architect & Developer</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>React, Next.js, Flutter & Node.js Expert</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Scalable Cloud Infrastructure & APIs</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>UI/UX & High-Converting Web Design</span>
                </div>
              </div>

              <div className="bg-[#0A192F] rounded-2xl p-4 border border-slate-700/80 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-300">
                  <span>stack.config.ts</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-[#14B8A6]">$ lrock --deploy --accra</p>
                <p className="text-slate-300 mt-1">&gt; Building robust solutions...</p>
                <p className="text-slate-300">&gt; Status: Ready to build your vision 🚀</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
