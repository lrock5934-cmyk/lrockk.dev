import { useState } from 'react';
import { Calculator, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

const SERVICE_OPTIONS = [
  { id: 'web', name: 'Custom Website', basePrice: 15000, unit: 'Project' },
  { id: 'mobile', name: 'Mobile App (iOS & Android)', basePrice: 35000, unit: 'App' },
  { id: 'uiux', name: 'UI/UX Design & Wireframing', basePrice: 8000, unit: 'Package' },
  { id: 'fullstack', name: 'Full-Stack Web & Mobile Suite', basePrice: 55000, unit: 'Suite' }
];

export function ProjectEstimator() {
  const [selectedService, setSelectedService] = useState(SERVICE_OPTIONS[0]);
  const [weeks, setWeeks] = useState(4);
  const [includeCloud, setIncludeCloud] = useState(true);
  const [includeMaintenance, setIncludeMaintenance] = useState(false);

  // Calculation logic in GH₵
  const calculateTotal = () => {
    let total = selectedService.basePrice;
    // Timeline factor
    if (weeks < 3) total *= 1.25; // Rush delivery fee
    if (includeCloud) total += 5000;
    if (includeMaintenance) total += 3500;
    return Math.round(total).toLocaleString();
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="estimator" className="py-24 bg-slate-50 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 bg-[#14B8A6]/10 border border-[#14B8A6]/30 rounded-full text-[#0d9488] font-semibold text-xs tracking-wider uppercase mb-3">
            Budget & Scope Calculator (GH₵)
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
            Interactive Project Estimator
          </h2>
          <p className="text-black mt-3 text-base sm:text-lg">
            Customize your project requirements below to instantly calculate estimated investment in Ghana Cedis (GH₵) and delivery timeline.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Controls */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
            {/* Service Selector */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-black mb-3">
                1. Select Service Type
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      selectedService.id === srv.id
                        ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-black shadow-md'
                        : 'border-slate-200 hover:border-slate-300 text-black bg-white'
                    }`}
                  >
                    <span className="font-bold text-sm text-black">{srv.name}</span>
                    <span className="text-xs text-black font-semibold mt-2">From GH₵ {srv.basePrice.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-black">
                  2. Target Delivery Timeline
                </label>
                <span className="text-sm font-black text-black bg-slate-100 px-3 py-1 rounded-xl">
                  {weeks} {weeks === 1 ? 'Week' : 'Weeks'}
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={12}
                value={weeks}
                onChange={(e) => setWeeks(Number(e.target.value))}
                className="w-full accent-[#14B8A6] cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-black font-medium mt-1">
                <span>2 Weeks (Fast/Rush)</span>
                <span>12 Weeks (Comprehensive)</span>
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black mb-3">
                3. Additional Modules
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 cursor-pointer bg-slate-50">
                  <input
                    type="checkbox"
                    checked={includeCloud}
                    onChange={(e) => setIncludeCloud(e.target.checked)}
                    className="w-4 h-4 accent-[#14B8A6]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-black block">Cloud Infrastructure & Database Setup (+GH₵ 5,000)</span>
                    <span className="text-black">Firebase / Supabase, Authentication, Hosting, and secure rules.</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 cursor-pointer bg-slate-50">
                  <input
                    type="checkbox"
                    checked={includeMaintenance}
                    onChange={(e) => setIncludeMaintenance(e.target.checked)}
                    className="w-4 h-4 accent-[#14B8A6]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-black block">3-Month Priority Maintenance Retainer (+GH₵ 3,500)</span>
                    <span className="text-black">Regular updates, bug fixes, and performance tuning.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Scope & Cost Summary Card */}
          <div className="lg:col-span-5 bg-[#0A192F] text-white border border-[#14B8A6]/40 rounded-3xl p-6 sm:p-8 shadow-2xl sticky top-28">
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-[#14B8A6] text-[#0A192F] flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Project Scope & Quote</h3>
                <p className="text-xs text-slate-300">Instant Estimate Summary (Ghana Cedis)</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Selected Service:</span>
                <span className="font-bold text-white text-right">{selectedService.name}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Timeline:</span>
                <span className="font-bold text-[#14B8A6]">{weeks} Weeks</span>
              </div>
              {includeCloud && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Cloud & DB Setup:</span>
                  <span className="font-bold text-white">Included (+GH₵ 5,000)</span>
                </div>
              )}
              {includeMaintenance && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Maintenance Retainer:</span>
                  <span className="font-bold text-white">Included (+GH₵ 3,500)</span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-200">Estimated Total:</span>
                <span className="text-2xl sm:text-3xl font-black text-[#14B8A6]">GH₵ {calculateTotal()}</span>
              </div>
            </div>

            <button
              onClick={scrollToContact}
              className="w-full py-4 bg-[#14B8A6] hover:bg-[#0d9488] text-[#0A192F] font-extrabold rounded-2xl transition shadow-xl shadow-[#14B8A6]/20 flex items-center justify-center space-x-2 text-sm cursor-pointer"
            >
              <span>Lock In This Estimate & Contact</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
