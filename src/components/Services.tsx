import { useState } from 'react';
import { Globe, Smartphone, Layout, LifeBuoy, ArrowRight, X, CheckCircle2, Sparkles } from 'lucide-react';

const SERVICES = [
  {
    id: 'web',
    icon: Globe,
    title: 'Custom Websites',
    description: 'High-performance, responsive websites built with modern frameworks (React, Next.js, Vite) optimized for speed, SEO, and conversions.',
    details: 'Custom websites are crafted from scratch or using state-of-the-art component architectures. Every website includes responsive mobile design, fast page load speeds, SEO metadata optimization, and secure contact forms connected to Supabase.',
    deliverables: ['Responsive Web App / Landing Page', 'SEO Optimization & Meta Tags', 'Supabase Database Integration', 'Analytics & Speed Tuning'],
    startingPrice: 'GH₵ 15,000'
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Cross-platform mobile applications built with Flutter or React Native delivering native fluid performance on iOS and Android.',
    details: 'Get your app into the Apple App Store and Google Play Store with a single high-performance codebase. Built with Flutter or React Native, ensuring 60fps animations, offline capabilities, and push notifications.',
    deliverables: ['iOS & Android Apps (Cross-Platform)', 'App Store & Play Store Deployment Prep', 'Firebase Authentication & Push Notifications', 'Smooth 60fps Native UI Animations'],
    startingPrice: 'GH₵ 35,000'
  },
  {
    id: 'uiux',
    icon: Layout,
    title: 'UI/UX Design',
    description: 'User-centric interface design, wireframing, and interactive prototypes tailored to engage your audience and elevate your brand.',
    details: 'Transform your vision into intuitive, gorgeous user interfaces. We conduct user journey mapping, wireframing, design systems creation, and interactive Figma prototypes.',
    deliverables: ['Wireframes & User Flow Diagrams', 'Figma Interactive Prototype', 'Custom Design System & Brand Kit', 'Developer Handoff Specs'],
    startingPrice: 'GH₵ 8,000'
  },
  {
    id: 'support',
    icon: LifeBuoy,
    title: 'Ongoing Support',
    description: 'Reliable maintenance, security updates, feature scaling, and performance monitoring to ensure your digital products thrive.',
    details: 'Keep your digital products secure and up-to-date. We provide regular security patches, performance audits, new feature additions, and 24/7 uptime monitoring.',
    deliverables: ['Monthly Security & Dependency Updates', 'Performance & Speed Audits', 'Bug Fixes & Technical Support', 'Feature Scaling & API Enhancements'],
    startingPrice: 'GH₵ 3,500/mo'
  }
];

export function Services() {
  const [activeService, setActiveService] = useState<typeof SERVICES[0] | null>(null);

  const handleSelectService = (service: typeof SERVICES[0]) => {
    setActiveService(service);
  };

  const jumpToEstimator = () => {
    setActiveService(null);
    const el = document.getElementById('estimator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const jumpToContact = () => {
    setActiveService(null);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 bg-slate-50 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 bg-[#14B8A6]/10 border border-[#14B8A6]/30 rounded-full text-[#0d9488] font-semibold text-xs tracking-wider uppercase mb-3">
            What I Offer
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
            Services
          </h2>
          <p className="text-black mt-3 text-base sm:text-lg">
            End-to-end digital engineering expertise designed to scale your business and deliver exceptional user experiences. Click any service to explore detailed specs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                onClick={() => handleSelectService(service)}
                className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-[#14B8A6] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#0A192F] text-[#14B8A6] flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 shadow-md">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-black mb-3 group-hover:text-[#0d9488] transition">
                    {service.title}
                  </h3>
                  <p className="text-black text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-black uppercase tracking-wider group-hover:text-[#0d9488] transition">
                    Click to View Specs
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#14B8A6] group-hover:text-[#0A192F] transition flex items-center justify-center text-black">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/80 backdrop-blur-md p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl text-black relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveService(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-black rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#0A192F] text-[#14B8A6] flex items-center justify-center shadow-lg">
                <activeService.icon className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0d9488]">Service Specification</span>
                <h3 className="text-2xl font-black text-black">{activeService.title}</h3>
              </div>
            </div>

            <p className="text-black text-sm sm:text-base leading-relaxed mb-6">
              {activeService.details}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
              <h4 className="font-extrabold text-black text-sm mb-3 uppercase tracking-wider">Key Deliverables</h4>
              <div className="space-y-2.5">
                {activeService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-xs sm:text-sm text-black font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#0d9488] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <div>
                <span className="text-xs text-black font-semibold block uppercase">Investment Starting At</span>
                <span className="text-2xl font-black text-[#0d9488]">{activeService.startingPrice}</span>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={jumpToEstimator}
                  className="flex-1 sm:flex-none px-5 py-3 bg-slate-100 hover:bg-slate-200 text-black font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Estimate in Calculator
                </button>
                <button
                  onClick={jumpToContact}
                  className="flex-1 sm:flex-none px-6 py-3 bg-[#0A192F] hover:bg-slate-900 text-[#14B8A6] font-bold rounded-xl text-xs transition shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request This Service</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
