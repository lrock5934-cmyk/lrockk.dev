import { useState } from 'react';
import { Search, Palette, Code, Rocket, X, CheckCircle2, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: Search,
    title: 'Discovery',
    description: 'We align on your project goals, target audience, technical requirements, and scope to establish a precise roadmap.',
    details: 'During the Discovery phase, we conduct deep-dive interviews, analyze competitor benchmarks, define user personas, and establish technical stack requirements (React, Next.js, Flutter, Supabase/Firebase) to ensure zero guesswork.',
    activities: ['Requirements Gathering Session', 'Technical Stack Selection', 'Project Scope & Milestone Definition', 'Cost & Timeline Estimation']
  },
  {
    step: '02',
    icon: Palette,
    title: 'Design',
    description: 'Creating intuitive wireframes, UI/UX designs, and interactive prototypes for your approval before writing code.',
    details: 'We build high-fidelity wireframes and interactive Figma prototypes. You get to interact with the screens, test user flows, and approve typography, color palettes, and component layouts before development begins.',
    activities: ['User Journey Wireframing', 'UI Design System & Color Palette', 'Interactive Figma Prototype', 'Design Review & Client Sign-off']
  },
  {
    step: '03',
    icon: Code,
    title: 'Development',
    description: 'Building clean, scalable, high-performance code with rigorous testing across devices and browsers.',
    details: 'Our engineers write modular, strongly-typed TypeScript code adhering to industry best practices. We integrate APIs, database schemas in Supabase, and ensure sub-second page loads and fluid 60fps mobile responsiveness.',
    activities: ['Frontend & Backend Implementation', 'Supabase Database & Auth Integration', 'Cross-Browser & Device Testing', 'Code Quality & Security Audits']
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Launch & Support',
    description: 'Deploying your solution to production, setting up domains and analytics, with ongoing maintenance.',
    details: 'We handle production deployment on robust cloud infrastructure, configure custom domains, set up SSL certificates, integrate Google Analytics, and provide ongoing support to keep your app scaling smoothly.',
    activities: ['Production Cloud Deployment', 'Custom Domain & SSL Configuration', 'Analytics & Monitoring Setup', 'Post-Launch Support & Retainers']
  }
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<typeof STEPS[0] | null>(null);

  return (
    <section id="how-it-works" className="py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 bg-[#14B8A6]/10 border border-[#14B8A6]/30 rounded-full text-[#0d9488] font-semibold text-xs tracking-wider uppercase mb-3">
            Our Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
            How It Works
          </h2>
          <p className="text-black mt-3 text-base sm:text-lg">
            A transparent, streamlined 4-step workflow designed to take your idea from concept to successful launch. Click any step to inspect deliverables.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={() => setActiveStep(item)}
                className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-lg shadow-slate-100 flex flex-col justify-between relative group hover:border-[#14B8A6] transition duration-300 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#0A192F] text-[#14B8A6] flex items-center justify-center shadow-md group-hover:scale-110 transition">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-300 group-hover:text-[#0d9488] transition">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-black mb-3 group-hover:text-[#0d9488] transition">
                    {item.title}
                  </h3>
                  <p className="text-black text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-black uppercase">
                  <span className="group-hover:text-[#0d9488] transition">View Phase Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition text-[#0d9488]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Detail Modal */}
      {activeStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/80 backdrop-blur-md p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl text-black relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveStep(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-black rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#0A192F] text-[#14B8A6] flex items-center justify-center shadow-lg font-black text-xl">
                {activeStep.step}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0d9488]">Phase Specification</span>
                <h3 className="text-2xl font-black text-black">{activeStep.title}</h3>
              </div>
            </div>

            <p className="text-black text-sm sm:text-base leading-relaxed mb-6">
              {activeStep.details}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
              <h4 className="font-extrabold text-black text-sm mb-3 uppercase tracking-wider">Phase Activities & Milestones</h4>
              <div className="space-y-2.5">
                {activeStep.activities.map((act, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-xs sm:text-sm text-black font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#0d9488] shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                onClick={() => setActiveStep(null)}
                className="px-6 py-3 bg-[#0A192F] text-[#14B8A6] font-bold rounded-xl text-xs hover:bg-slate-900 transition cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
