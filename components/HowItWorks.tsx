
import React from 'react';
import { Upload, Cpu, CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: "Report",
      description: "Snap a photo of an environmental hazard. Geo-tagging happens automatically.",
      icon: <Upload size={28} />
    },
    {
      id: 2,
      title: "Analyze",
      description: "Our AI instantly classifies the hazard type and severity level for prioritization.",
      icon: <Cpu size={28} />
    },
    {
      id: 3,
      title: "Respond",
      description: "LGU teams are alerted. Track the cleanup progress in real-time.",
      icon: <CheckCircle size={28} />
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">Workflow</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">How It Works</h2>
        </div>

        <div className="relative">
          {/* Connecting Line Container (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-slate-200 z-0">
             {/* Dotted Line Overlay */}
             <div className="absolute inset-0 border-t-2 border-dashed border-slate-300"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center text-center group">
                
                <div className="w-24 h-24 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6 relative transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:border-primary/20">
                  {/* Badge Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-md ring-4 ring-slate-50 group-hover:bg-primary transition-colors">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className="text-slate-400 group-hover:text-primary transition-colors">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 max-w-xs leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
